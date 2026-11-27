/*
  Lagoa · thème Shopify par Masquo (lunettes de soleil). JavaScript sans librairie.
  - hero-lens : le lagon vu à travers les verres (teinte en direct, reflet, inclinaison à la souris, défilement des teintes)
  - collection-tabs : onglets de collection, cartes qui arrivent en cascade
  - product-form : ajout au panier sans recharger (API panier Shopify + rendu des sections), vol du produit
  - cart-drawer : panier en tiroir (quantités, note), cart-page : panier en page
  - variant-picker : choix de la variante, sticky-header : en-tête transparent sur le décor
*/
(() => {
  'use strict';
  const P = window.Prisme || { routes: { cartAdd: '/cart/add', cartChange: '/cart/change', cartUpdate: '/cart/update', cart: '/cart' }, cartType: 'drawer', cartFly: true, strings: {} };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('no-motion');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mobile = () => innerWidth <= 900;
  const SECTIONS = ['cart-drawer', 'cart-icon-bubble'];

  /* ---------- petits outils ---------- */
  let toastTimer = 0;
  function toast(text) {
    const t = $('#PrismeToast'); if (!t) return;
    t.textContent = text; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-on'), 4200);
  }
  function parse(html) { return new DOMParser().parseFromString(html, 'text/html'); }
  function sectionInner(html) {
    const doc = parse(html);
    const s = doc.querySelector('.shopify-section');
    return s ? s.innerHTML : doc.body.innerHTML;
  }
  function renderSections(sections) {
    if (!sections) return;
    if (sections['cart-icon-bubble']) {
      const bubble = $('#cart-icon-bubble');
      if (bubble) bubble.innerHTML = sectionInner(sections['cart-icon-bubble']);
    }
    const drawer = $('cart-drawer');
    if (sections['cart-drawer'] && drawer) drawer.update(sections['cart-drawer']);
  }
  function popBag() {
    const bag = $('#cart-icon-bubble'); if (!bag) return;
    bag.classList.remove('is-pop'); void bag.offsetWidth; bag.classList.add('is-pop');
  }
  async function postCart(url, body) {
    const isForm = body instanceof FormData;
    const res = await fetch(url, {
      method: 'POST',
      headers: isForm ? { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/javascript' } : { 'Content-Type': 'application/json', Accept: 'application/javascript' },
      body: isForm ? body : JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.status) throw new Error(data.description || data.message || P.strings.error || 'Error');
    return data;
  }

  /* ---------- aperçu de la personnalisation (gravure) ---------- */
  class Engraver {
    constructor(svg, maxWidthPercent) {
      this.svg = svg;
      this.rect = $('[data-reveal]', svg);
      this.spark = $('[data-spark]', svg);
      this.names = $$('[data-name]', svg);
      this.sub = $('[data-sub]', svg);
      this.cx = parseFloat(svg.dataset.cx);
      this.cy = parseFloat(svg.dataset.cy);
      this.vbh = parseFloat(svg.dataset.vbh);
      this.caps = svg.classList.contains('is-caps');
      this.fs0 = parseFloat(svg.dataset.fs) / (this.caps ? 0.66 : 1);
      this.maxW = (maxWidthPercent || 50) * 10;
      this.anim = 0;
      this.text = this.names.length ? this.names[0].textContent : '';
    }
    setStyle(style) {
      this.caps = style === 'caps';
      this.svg.classList.toggle('is-caps', this.caps);
      this.write(this.rawText || this.text, false);
    }
    write(text, animate) {
      this.rawText = text;
      const shown = this.caps ? text.toUpperCase() : text;
      const base = this.caps ? this.fs0 * 0.66 : this.fs0;
      this.names.forEach((n) => { n.textContent = shown; n.setAttribute('font-size', base.toFixed(1)); });
      let w = 0;
      try { w = this.names[this.names.length - 1].getComputedTextLength(); } catch (e) { w = 0; }
      let fs = base;
      if (w > this.maxW) {
        fs = base * this.maxW / w;
        this.names.forEach((n) => n.setAttribute('font-size', fs.toFixed(1)));
        w = this.maxW;
      }
      if (this.sub) this.sub.setAttribute('y', (this.cy + fs * (this.caps ? 0.95 : 0.66)).toFixed(1));
      cancelAnimationFrame(this.anim);
      const full = () => { this.rect.setAttribute('x', '0'); this.rect.setAttribute('width', '1000'); this.spark.setAttribute('opacity', '0'); };
      if (!animate || REDUCED || !text) { full(); return; }
      const pad = fs * 0.3, x0 = this.cx - w / 2 - pad, total = w + pad * 2;
      const dur = 380 + text.length * 120, t0 = performance.now();
      this.rect.setAttribute('x', x0.toFixed(1));
      const step = (now) => {
        const k = clamp((now - t0) / dur, 0, 1);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const x = x0 + total * e;
        this.rect.setAttribute('width', (total * e).toFixed(1));
        this.spark.setAttribute('transform', `translate(${x.toFixed(1)} ${(this.cy - fs * 0.25 + Math.sin(now / 38) * fs * 0.1).toFixed(1)})`);
        this.spark.setAttribute('opacity', k < 1 ? String(0.75 + Math.random() * 0.25) : '0');
        if (k < 1) this.anim = requestAnimationFrame(step); else full();
      };
      this.anim = requestAnimationFrame(step);
    }
  }

  /* relie le champ de personnalisation, le choix de l'écriture et l'aperçu */
  function bindPersonalize(root, svg, maxW, sample) {
    const input = $('[data-personalize]', root);
    if (!input || !svg) return null;
    const eng = new Engraver(svg, maxW);
    const fallback = sample || input.placeholder || eng.text;
    let timer = 0;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => eng.write(input.value.trim() || fallback, true), 350);
    });
    const sw = $('[data-style-switch]', root);
    if (sw) {
      const styleInput = $('[data-style-input]', root);
      const pv = $('[data-pv]', root);
      sw.addEventListener('click', (e) => {
        const b = e.target.closest('[data-style]'); if (!b) return;
        $$('[data-style]', sw).forEach((x) => x.setAttribute('aria-checked', String(x === b)));
        const style = b.dataset.style;
        eng.setStyle(style);
        root.classList.toggle('is-caps', style === 'caps');
        if (styleInput) styleInput.value = style === 'caps' ? styleInput.dataset.caps : styleInput.dataset.script;
        if (pv) { const parts = pv.value.split('|'); parts[3] = style; pv.value = parts.join('|'); }
      });
      const checked = $('[aria-checked="true"]', sw);
      if (checked) root.classList.toggle('is-caps', checked.dataset.style === 'caps');
    }
    return { eng, input, fallback };
  }

  /* ---------- vol du produit jusque dans le panier ---------- */
  function fly(sourceEl) {
    const drawer = $('cart-drawer');
    if (!P.cartFly || REDUCED || !sourceEl || !drawer) return;
    const target = $('[data-fly-target]', drawer);
    if (!target) return;
    const src = sourceEl.getBoundingClientRect();
    if (!src.width || !src.height) return;
    drawer.classList.add('is-landing');
    requestAnimationFrame(() => {
      const t = target.getBoundingClientRect();
      const pr = drawer.panel.getBoundingClientRect();
      const shift = pr.left - (innerWidth - pr.width); // le panneau arrive encore de la droite
      const s = t.height / src.height;
      const tx = t.left - shift + (t.width - src.width * s) / 2 - src.left;
      const ty = t.top - src.top;
      const clone = sourceEl.cloneNode(true);
      clone.removeAttribute('id');
      $$('[id]', clone).forEach((n) => n.removeAttribute('id'));
      const f = document.createElement('div');
      f.className = 'flyer';
      f.style.cssText = `left:${src.left}px;top:${src.top}px;width:${src.width}px;height:${src.height}px`;
      f.appendChild(clone);
      document.body.appendChild(f);
      const anim = f.animate([
        { transform: 'translate(0,0) scale(1) rotate(0deg)' },
        { transform: `translate(${tx * 0.45}px, ${ty * 0.45 - 140}px) scale(${(1 + s) / 2 * 1.08}) rotate(-8deg)`, offset: 0.45 },
        { transform: `translate(${tx}px, ${ty}px) scale(${s})` },
      ], { duration: 950, easing: 'cubic-bezier(.45,.05,.2,1)', fill: 'forwards' });
      anim.onfinish = () => {
        f.remove();
        drawer.classList.remove('is-landing');
        const r = target.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2);
      };
    });
  }
  function burst(x, y) {
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('i');
      s.className = 'sparkle';
      s.style.left = `${x}px`; s.style.top = `${y}px`;
      document.body.appendChild(s);
      const a = (i / 18) * Math.PI * 2, r = 60 + (i % 5) * 22;
      s.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px)) scale(.2)`, opacity: 0 },
      ], { duration: 700 + (i % 4) * 120, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => s.remove();
    }
  }

  /* ---------- en-tête ---------- */
  class StickyHeader extends HTMLElement {
    connectedCallback() {
      this.over = this.dataset.transparent === 'true';
      if (this.over) {
        this.onScroll = () => {
          const hero = $('.hero');
          const limit = hero ? hero.offsetTop + hero.offsetHeight - this.offsetHeight - 10 : 80;
          this.classList.toggle('is-over', scrollY < Math.max(40, limit));
        };
        addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
      }
      const menu = $('[data-mnav]', this);
      const close = $('[data-mnav-close]', this);
      if (menu && close) close.addEventListener('click', () => menu.removeAttribute('open'));
      if (menu) menu.addEventListener('toggle', () => document.body.classList.toggle('is-locked', menu.open));
    }
    disconnectedCallback() { if (this.onScroll) removeEventListener('scroll', this.onScroll); }
  }

  /* ---------- LAGOA : le lagon vu à travers les verres ---------- */
  class HeroLens extends HTMLElement {
    connectedCallback() {
      this.chips = $$('[data-tint]', this);
      this.buys = $$('[data-buy]', this);
      this.says = $$('[data-say]', this);
      this.idx = 0;
      this.user = false;
      this.frame = $('.lens__frame', this);
      // l'animation d'arrivée de la paire ne se joue qu'une fois : ensuite, seulement le pivot quand la paire change
      setTimeout(() => this.classList.add('is-live'), 1500);
      this.mbtn = $('[data-mbtn]', this);
      // les montures des autres paires se chargent en avance (la bascule est alors immédiate)
      setTimeout(() => this.chips.forEach((c) => { if (c.dataset.frame) { new Image().src = c.dataset.frame; new Image().src = c.dataset.mask; } }), 1200);
      // léger décalage du décor au défilement (profondeur)
      this.pic = $('.lens__decor picture', this);
      if (!REDUCED && this.pic) {
        let ticking = false;
        this.onScroll = () => {
          if (ticking) return; ticking = true;
          requestAnimationFrame(() => { ticking = false; const y = Math.min(scrollY, innerHeight); this.pic.style.transform = `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0) scale(${(1 + y / innerHeight * 0.06).toFixed(4)})`; });
        };
        addEventListener('scroll', this.onScroll, { passive: true });
      }
      this.syncBtn(0);
      // la hauteur suit ce qui reste de l'écran sous la barre d'annonce
      this.fit = () => this.style.setProperty('--hero-top', `${Math.max(0, Math.round(this.getBoundingClientRect().top + scrollY))}px`);
      this.fit();
      addEventListener('resize', this.fit, { passive: true });
      this.addEventListener('click', (e) => {
        const c = e.target.closest('[data-tint]');
        if (c) { this.user = true; this.pick(parseInt(c.dataset.index, 10)); }
      });
      this.addEventListener('keydown', (e) => {
        if (!e.target.closest('[data-tint]') || !this.chips.length) return;
        const n = this.chips.length;
        let k = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') k = (this.idx + 1) % n;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') k = (this.idx - 1 + n) % n;
        if (k === null) return;
        e.preventDefault(); this.user = true; this.pick(k); this.chips[k].focus();
      });
      this.chips.forEach((c, k) => c.setAttribute('tabindex', k === 0 ? '0' : '-1'));
      if (REDUCED) return;
      // inclinaison de la paire et léger décalage du décor avec la souris (ordinateur seulement)
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let raf = 0, mx = 0, my = 0;
        this.addEventListener('pointermove', (e) => {
          const r = this.getBoundingClientRect();
          mx = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1);
          my = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
          if (!raf) raf = requestAnimationFrame(() => {
            raf = 0;
            this.style.setProperty('--ry', `${(mx * 9).toFixed(2)}deg`);
            this.style.setProperty('--rx', `${(-my * 7).toFixed(2)}deg`);
            this.style.setProperty('--px', `${(-mx * 14).toFixed(1)}px`);
            this.style.setProperty('--py', `${(-my * 10).toFixed(1)}px`);
          });
        });
        this.addEventListener('pointerleave', () => { ['--rx', '--ry', '--px', '--py'].forEach((v) => this.style.removeProperty(v)); });
      }
      // la teinte change toute seule tant que le visiteur n'a rien choisi ; tout se met en pause hors de l'écran
      this.visible = true;
      if ('IntersectionObserver' in window) {
        this.io = new IntersectionObserver(([en]) => { this.visible = en.isIntersecting; this.classList.toggle('is-paused', !en.isIntersecting); });
        this.io.observe(this);
      }
      if (this.dataset.auto === 'true' && this.chips.length > 1) {
        this.timer = setInterval(() => {
          if (this.user || !this.visible || document.hidden) return;
          this.pick((this.idx + 1) % this.chips.length, true);
        }, 4200);
      }
    }
    disconnectedCallback() { clearInterval(this.timer); if (this.io) this.io.disconnect(); removeEventListener('resize', this.fit); if (this.onScroll) removeEventListener('scroll', this.onScroll); }
    // la paire change : monture, verres, teinte ET texte pivotent ensemble ; tout est remplacé au milieu du pivot,
    // quand la paire est vue de profil (invisible), pour que rien n'arrive en avance ou en retard
    swapTo(c, apply) {
      clearTimeout(this.swapT); clearTimeout(this.swapEnd);
      if (REDUCED || !this.frame) { apply(); return; }
      const go = () => {
        this.classList.remove('is-swap'); void this.offsetWidth; this.classList.add('is-swap');
        this.swapT = setTimeout(apply, 340); // milieu exact du pivot (0,68 s), la paire est de profil
        this.swapEnd = setTimeout(() => this.classList.remove('is-swap'), 700);
      };
      const f = c.dataset.frame;
      if (!f || this.frame.getAttribute('src') === f) { go(); return; }
      const im = new Image();
      const token = this.swapToken = (this.swapToken || 0) + 1;
      let done = false;
      const ready = () => { if (done || token !== this.swapToken) return; done = true; go(); };
      im.onload = ready; im.onerror = ready; im.src = f;
      if (im.complete) ready();
    }
    // bouton du téléphone (sous la paire) : il envoie le formulaire de la teinte affichée
    syncBtn(i) {
      if (!this.mbtn) return;
      const buy = this.buys[i];
      const form = buy && $('form', buy);
      const add = buy && $('[data-add]', buy);
      this.mbtn.hidden = !form;
      if (!form) return;
      this.mbtn.setAttribute('form', form.id);
      this.mbtn.disabled = !!(add && add.disabled);
    }
    pick(i, auto) {
      const c = this.chips[i];
      if (!c) return;
      this.idx = i;
      this.chips.forEach((x, k) => { x.setAttribute('aria-checked', String(k === i)); x.setAttribute('tabindex', k === i ? '0' : '-1'); });
      const apply = () => {
        if (this.idx !== i) return;
        this.style.setProperty('--t1', c.dataset.t1);
        this.style.setProperty('--t2', c.dataset.t2);
        const f = c.dataset.frame, m = c.dataset.mask;
        if (f && this.frame && this.frame.getAttribute('src') !== f) this.frame.src = f;
        if (m) this.style.setProperty('--mask', `url("${m}")`);
        this.buys.forEach((b) => { b.hidden = b.dataset.buy !== String(i); });
        this.says.forEach((x) => { x.hidden = x.dataset.say !== String(i); });
        this.syncBtn(i);
      };
      this.swapTo(c, apply);
      if (!REDUCED) { this.classList.remove('is-flash'); void this.offsetWidth; this.classList.add('is-flash'); }
      if (!auto) this.dispatchEvent(new CustomEvent('lagoa:tint', { bubbles: true, detail: i }));
    }
  }

  /* ---------- LAGOA : onglets de collection ---------- */
  class CollectionTabs extends HTMLElement {
    connectedCallback() {
      this.sec = this.closest('.tabsec');
      this.ink = $('.tabsec__ink', this);
      this.tabs = $$('[role="tab"]', this);
      this.addEventListener('click', (e) => { const t = e.target.closest('[role="tab"]'); if (t) this.show(t); });
      this.addEventListener('keydown', (e) => {
        const k = this.tabs.indexOf(document.activeElement);
        if (k < 0) return;
        let n = null;
        if (e.key === 'ArrowRight') n = (k + 1) % this.tabs.length;
        if (e.key === 'ArrowLeft') n = (k - 1 + this.tabs.length) % this.tabs.length;
        if (n === null) return;
        e.preventDefault(); this.tabs[n].focus(); this.show(this.tabs[n]);
      });
      this.tabs.forEach((t) => t.setAttribute('tabindex', t.getAttribute('aria-selected') === 'true' ? '0' : '-1'));
      this.moveInk(false);
      addEventListener('resize', () => this.moveInk(false), { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.moveInk(false));
    }
    moveInk(animate = true) {
      const t = this.tabs.find((x) => x.getAttribute('aria-selected') === 'true');
      if (!t || !this.ink) return;
      if (!animate) this.ink.style.transition = 'none';
      this.ink.style.width = `${t.offsetWidth}px`;
      this.ink.style.transform = `translateX(${t.offsetLeft}px)`;
      if (!animate) { void this.ink.offsetWidth; this.ink.style.transition = ''; }
    }
    show(tab) {
      if (tab.getAttribute('aria-selected') === 'true') return;
      this.tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.setAttribute('tabindex', on ? '0' : '-1'); });
      this.moveInk(true);
      $$('[data-panel]', this.sec).forEach((p) => {
        const on = p.dataset.panel === tab.dataset.tab;
        p.hidden = !on;
        p.classList.toggle('is-active', on);
        if (on) {
          const cards = $$('.pcard.reveal', p);
          cards.forEach((c) => c.classList.remove('is-in'));
          void p.offsetWidth;
          requestAnimationFrame(() => cards.forEach((c) => c.classList.add('is-in')));
        }
      });
    }
  }

  /* ---------- formulaire produit (ajout au panier) ---------- */
  class ProductForm extends HTMLElement {
    connectedCallback() {
      this.form = $('form', this);
      if (!this.form) return;
      this.scope = (this.dataset.scope && this.closest(this.dataset.scope)) || document;
      this.btn = $('[data-add]', this);
      this.err = $('[data-error]', this);
      if (!this.closest('hero-lens, .pcard, .upsell__item')) {
        const svg = $('[data-engrave]', this.scope);
        const pz = bindPersonalize(this, svg, 60);
        if (pz && svg) pz.eng.write(pz.input.value.trim() || pz.fallback, false);
      }
      $$('[data-qty-input]', this).forEach((q) => q.addEventListener('click', (e) => {
        const b = e.target.closest('[data-step]'); if (!b) return;
        const input = $('input', q);
        input.value = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(b.dataset.step, 10));
      }));
      if (P.cartType === 'drawer') this.form.addEventListener('submit', (e) => this.submit(e));
    }
    async submit(e) {
      if (!$('cart-drawer')) return; // pas de tiroir : envoi classique vers la page panier
      e.preventDefault();
      if (!this.form.reportValidity()) return;
      if (this.err) this.err.hidden = true;
      this.btn && this.btn.classList.add('is-busy');
      const fd = new FormData(this.form);
      fd.append('sections', SECTIONS.join(','));
      fd.append('sections_url', location.pathname);
      // offre 1 + 1 : la paire achetée ET la paire offerte choisie partent ensemble dans le panier
      const free = $('[data-duo-free]', this.form);
      const paid = $('[data-variant-id]', this.form);
      let url = P.routes.cartAdd, body = fd;
      if (free && free.value && paid) {
        url = `${P.routes.cartAdd}.js`;
        body = { items: [{ id: Number(paid.value), quantity: 1 }, { id: Number(free.value), quantity: 1, properties: { _offer: '1+1' } }], sections: SECTIONS, sections_url: location.pathname };
      }
      try {
        const data = await postCart(url, body);
        renderSections(data.sections);
        popBag();
        const drawer = $('cart-drawer');
        const sel = this.dataset.flySource;
        const source = sel ? $(sel, this.scope) : null;
        drawer.open();
        fly(source);
      } catch (error) {
        if (this.err) { this.err.textContent = error.message; this.err.hidden = false; } else toast(error.message);
      } finally {
        this.btn && this.btn.classList.remove('is-busy');
      }
    }
  }

  /* ---------- LAGOA : ma paire + ma paire offerte (le client choisit librement la paire offerte) ---------- */
  class DuoOffer extends HTMLElement {
    connectedCallback() {
      this.input = $('[data-duo-free]', this);
      this.list = $('[data-duo-list]', this);
      this.toggle = $('[data-duo-toggle]', this);
      this.addEventListener('click', (e) => {
        if (e.target.closest('[data-duo-toggle]')) { this.open(this.list.hidden); return; }
        const p = e.target.closest('[data-free-id]');
        if (p) this.choose(p);
      });
    }
    open(on) {
      this.list.hidden = !on;
      if (this.toggle) this.toggle.setAttribute('aria-expanded', String(on));
      if (on && !REDUCED) $$('[data-free-id]', this.list).forEach((b, k) => { b.style.animationDelay = `${Math.min(k, 16) * 25}ms`; });
    }
    choose(p) {
      this.input.value = p.dataset.freeId;
      const img = $('[data-free-img]', this), name = $('[data-free-name]', this), card = $('.duo__card--free', this);
      if (img) { img.src = p.dataset.img; img.alt = p.dataset.name; }
      if (name) name.textContent = p.dataset.name;
      $$('[data-free-id]', this.list).forEach((x) => x.setAttribute('aria-pressed', String(x === p)));
      this.open(false);
      if (card && !REDUCED) { card.classList.remove('is-new'); void card.offsetWidth; card.classList.add('is-new'); }
    }
  }

  /* ---------- motion : titres qui montent mot par mot, cartes qui s'inclinent sous la souris ---------- */
  function initSplit(root = document) {
    const heads = $$('.h2:not([data-split]), .title--l:not([data-split]), .bogo__h:not([data-split])', root).filter((h) => !h.closest('hero-lens'));
    if (!heads.length) return;
    heads.forEach((h) => {
      h.dataset.split = '1';
      if (REDUCED) return;
      let k = 0;
      const walk = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      const nodes = []; while (walk.nextNode()) nodes.push(walk.currentNode);
      nodes.forEach((t) => {
        if (!t.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        t.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part; i.style.setProperty('--k', k++);
          w.appendChild(i); frag.appendChild(w);
        });
        t.replaceWith(frag);
      });
      h.classList.add('split');
    });
    if (REDUCED || !('IntersectionObserver' in window)) { heads.forEach((h) => h.classList.add('is-in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    heads.forEach((h) => io.observe(h));
  }
  function initTilt(root = document) {
    if (REDUCED || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('.pcard', root).forEach((card) => {
      if (card.dataset.tilt) return;
      card.dataset.tilt = '1';
      const m = $('.pcard__media', card); if (!m) return;
      let raf = 0, x = 0, y = 0;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        x = (e.clientX - r.left) / r.width - 0.5; y = (e.clientY - r.top) / r.height - 0.5;
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; m.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) scale(1.03)`; });
      });
      card.addEventListener('pointerleave', () => { m.style.transform = ''; });
    });
  }

  /* ---------- choix de la variante ---------- */
  class VariantPicker extends HTMLElement {
    connectedCallback() {
      try { this.variants = JSON.parse($('[data-variants]', this).textContent); } catch (e) { this.variants = []; }
      this.addEventListener('change', () => this.update());
    }
    update() {
      const sel = $$('fieldset', this).map((fs) => { const c = $('input:checked', fs); return c ? c.value : null; });
      const v = this.variants.find((x) => x.options.every((o, i) => o === sel[i]));
      const form = this.closest('form');
      const pf = this.closest('product-form') || document;
      const btn = $('[data-add]', pf);
      const label = btn ? $('[data-add-label]', btn) : null;
      if (!v) {
        if (btn) btn.disabled = true;
        if (label) label.textContent = P.strings.unavailable || '';
        return;
      }
      const idInput = form && $('[data-variant-id]', form);
      if (idInput) idInput.value = v.id;
      const tpl = $(`template[data-price-for="${v.id}"]`, this);
      const wrap = $('[data-price-wrap]', pf);
      if (tpl && wrap) wrap.innerHTML = tpl.innerHTML;
      if (btn) btn.disabled = !v.available;
      if (label) label.textContent = v.available ? label.dataset.label : (P.strings.soldOut || '');
      if (this.closest('.product')) {
        history.replaceState(null, '', `${location.pathname}?variant=${v.id}`);
        if (v.featured_media) document.dispatchEvent(new CustomEvent('prisme:media', { detail: v.featured_media.id }));
      }
    }
  }

  /* ---------- galerie de la fiche produit ---------- */
  function initGalleries(root = document) {
    $$('[data-gallery]', root).forEach((g) => {
      if (g.dataset.ready) return;
      g.dataset.ready = '1';
      const show = (id) => {
        $$('.gallery__slide', g).forEach((s) => s.classList.toggle('is-active', s.dataset.mediaId === String(id)));
        $$('[data-thumb]', g).forEach((t) => t.classList.toggle('is-active', t.dataset.thumb === String(id)));
      };
      g.addEventListener('click', (e) => { const t = e.target.closest('[data-thumb]'); if (t) show(t.dataset.thumb); });
      document.addEventListener('prisme:media', (e) => { if ($(`.gallery__slide[data-media-id="${e.detail}"]`, g)) show(e.detail); });
    });
  }

  /* ---------- panier en tiroir ---------- */
  class CartDrawer extends HTMLElement {
    connectedCallback() {
      this.panel = $('[data-panel]', this);
      this.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) { this.close(); return; }
        const q = e.target.closest('[data-qty]');
        if (q) { const line = q.closest('[data-key]'); if (line) this.change(line, parseInt(q.dataset.qty, 10)); }
      });
      this.addEventListener('change', (e) => { if (e.target.matches('[data-cart-note]')) this.note(e.target.value); });
      this.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { this.close(); return; }
        if (e.key !== 'Tab') return;
        const f = $$('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])', this.panel).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      });
      if (!window.__prismeCartLinks) {
        window.__prismeCartLinks = true;
        document.addEventListener('click', (e) => {
          const a = e.target.closest('[data-cart-open]');
          const d = $('cart-drawer');
          if (a && d && P.cartType === 'drawer') { e.preventDefault(); d.open(); }
        });
      }
    }
    open() {
      this.lastFocus = document.activeElement;
      this.classList.add('is-open');
      this.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      setTimeout(() => this.panel.focus({ preventScroll: true }), 60);
    }
    close() {
      this.classList.remove('is-open', 'is-landing');
      this.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus({ preventScroll: true });
    }
    update(html) {
      const fresh = parse(html).querySelector('#CartDrawerInner');
      const current = $('#CartDrawerInner', this);
      if (fresh && current) current.replaceWith(document.importNode(fresh, true));
    }
    async change(line, quantity) {
      line.classList.add('is-busy');
      try {
        const data = await postCart(P.routes.cartChange, { id: line.dataset.key, quantity, sections: SECTIONS, sections_url: location.pathname });
        renderSections(data.sections);
      } catch (error) {
        line.classList.remove('is-busy');
        const err = $('[data-error]', this);
        if (err) { err.textContent = error.message; err.hidden = false; } else toast(error.message);
      }
    }
    note(value) {
      clearTimeout(this.noteTimer);
      this.noteTimer = setTimeout(() => { postCart(P.routes.cartUpdate, { note: value }).catch(() => {}); }, 300);
    }
  }

  /* ---------- panier en page ---------- */
  class CartPage extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', async (e) => {
        const q = e.target.closest('[data-qty]');
        if (!q) return;
        const line = q.closest('[data-key]');
        line.classList.add('is-busy');
        try {
          await postCart(P.routes.cartChange, { id: line.dataset.key, quantity: parseInt(q.dataset.qty, 10) });
          location.reload();
        } catch (error) {
          line.classList.remove('is-busy');
          const err = $('[data-error]', this);
          if (err) { err.textContent = error.message; err.hidden = false; }
        }
      });
    }
  }

  /* ---------- divers ---------- */
  function initAutosubmit(root = document) {
    $$('[data-autosubmit]', root).forEach((el) => {
      if (el.dataset.ready) return;
      el.dataset.ready = '1';
      el.addEventListener('change', () => { const f = el.form; if (f) (f.requestSubmit ? f.requestSubmit() : f.submit()); });
    });
  }
  function initReveal(root = document) {
    const items = $$('.reveal:not(.is-in)', root);
    if (!items.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach((i, k) => { if (!i.style.getPropertyValue('--i')) i.style.transitionDelay = `${(k % 4) * 0.08}s`; io.observe(i); });
  }

  const define = (name, cls) => { if (!customElements.get(name)) customElements.define(name, cls); };
  define('sticky-header', StickyHeader);
  define('hero-lens', HeroLens);
  define('collection-tabs', CollectionTabs);
  define('duo-offer', DuoOffer);
  define('product-form', ProductForm);
  define('variant-picker', VariantPicker);
  define('cart-drawer', CartDrawer);
  define('cart-page', CartPage);

  function init(root) { initGalleries(root); initAutosubmit(root); initReveal(root); initSplit(root); initTilt(root); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(document)); else init(document);
  // éditeur de thème : une section rechargée est réinitialisée
  document.addEventListener('shopify:section:load', (e) => init(e.target));
})();
