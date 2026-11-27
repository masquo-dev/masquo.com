/* LAGOA · copie de présentation (masquo.com/lagoa/).
   Le thème Shopify parle à Shopify par fetch('/cart/add.js' …). Ici il n'y a pas de Shopify : ce fichier répond à
   sa place, avec un panier gardé dans le navigateur (localStorage), et fabrique le même HTML que les sections
   Liquid « cart-drawer » et « cart-icon-bubble ». Rien n'est envoyé nulle part, aucun paiement n'est possible. */
(() => {
  'use strict';
  const D = window.LAGOA_DEMO;
  if (!D) return;
  const KEY = 'lagoa-demo-cart';
  const T = D.t;
  const byId = new Map(D.cat.map((v) => [String(v.id), v]));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (c) => `€${(c / 100).toFixed(2).replace('.', ',')}`;
  const plural = (o, n) => (typeof o === 'string' ? o : (D.lang === 'fr' ? (n <= 1 ? o.one : o.other) : (n === 1 ? o.one : o.other)));
  const fill = (s, vars) => String(s).replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => (k in vars ? vars[k] : m));
  const icon = {
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    plus: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    minus: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    bag: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 8h12l-1 12H7L6 8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  };

  /* ---------- le panier ---------- */
  // le panier relu dans le navigateur n'est jamais cru tel quel : articles connus seulement, quantités entières de 1 à 99
  const qtyOk = (q) => Math.min(99, Math.max(1, parseInt(q, 10) || 1));
  function load() {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || '{}');
      const items = (Array.isArray(c.items) ? c.items : []).map((i) => {
        if (!i || typeof i !== 'object' || !byId.has(String(i.id))) return null;
        const id = String(i.id);
        const props = i.props && typeof i.props === 'object' && i.props._offer ? { _offer: String(i.props._offer).slice(0, 60) } : {};
        return { key: keyOf(id, props), id, qty: qtyOk(i.qty), props };
      }).filter(Boolean);
      return { items, note: typeof c.note === 'string' ? c.note.slice(0, 400) : '' };
    } catch (e) { return { items: [], note: '' }; }
  }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* navigation privée : le panier vit le temps de la page */ } }
  let cart = load();
  const keyOf = (id, props) => `${id}:${props && props._offer ? 'offer' : ''}`;
  function add(id, qty, props) {
    const v = byId.get(String(id));
    if (!v) throw new Error(T.error);
    const key = keyOf(id, props);
    const found = cart.items.find((i) => i.key === key);
    if (found) { found.qty = qtyOk(found.qty + qty); cart.items = [found, ...cart.items.filter((i) => i !== found)]; }
    else cart.items.unshift({ key, id: String(id), qty: qtyOk(qty), props: props || {} });
  }
  function change(key, qty) {
    const it = cart.items.find((i) => i.key === key);
    if (!it) return;
    if (!(qty > 0)) cart.items = cart.items.filter((i) => i !== it); else it.qty = qtyOk(qty);
  }
  const count = () => cart.items.reduce((n, i) => n + i.qty, 0);
  const total = () => cart.items.reduce((n, i) => n + byId.get(i.id).price * i.qty, 0);

  /* ---------- le HTML des sections (mêmes balises que les fichiers Liquid du thème) ---------- */
  function lineHTML(it) {
    const v = byId.get(it.id);
    const free = v.free;
    const img = `<img src="${esc(v.img)}" alt="" loading="lazy" width="450" height="450">`;
    const media = free ? `<span class="line__img" aria-hidden="true">${img}</span>` : `<a class="line__img" href="${esc(v.url)}" tabindex="-1" aria-hidden="true">${img}</a>`;
    const title = free
      ? `<p class="line__t">${esc(v.title)} <span class="line__free">${esc(T.free_badge)}</span></p>`
      : `<a class="line__t" href="${esc(v.url)}">${esc(v.title)}</a>`;
    const qty = free ? '' : `<div class="qty">
        <button type="button" data-qty="${it.qty - 1}" aria-label="${esc(fill(T.decrease, { product: v.title }))}">${icon.minus}</button>
        <span aria-label="${esc(T.quantity)}">${it.qty}</span>
        <button type="button" data-qty="${it.qty + 1}" aria-label="${esc(fill(T.increase, { product: v.title }))}">${icon.plus}</button>
      </div>`;
    const was = v.compare && v.compare > v.price ? '' : '';
    return `<li class="line${free ? ' line--free' : ''}" data-key="${esc(it.key)}">
  ${media}
  <div class="line__info">
    ${title}
    <div class="line__q">
      ${qty}
      <button type="button" class="line__rm" data-qty="0">${esc(T.remove)}</button>
    </div>
  </div>
  <div class="line__p">${was}<span>${money(v.price * it.qty)}</span></div>
</li>`;
  }
  function counts() {
    let free = 0, paid = 0;
    cart.items.forEach((i) => { if (byId.get(i.id).free) free += i.qty; else paid += i.qty; });
    return { free, paid };
  }
  function upsellHTML(over) {
    const items = D.pool.map((h) => {
      const p = D.cat.find((v) => !v.free && v.handle === h);
      if (!p) return '';
      const freeV = over ? null : D.cat.find((v) => v.free && v.title === p.title);
      const addId = freeV ? freeV.id : p.id;
      return `<li class="upsell__item">
  <a href="${esc(p.url)}" class="upsell__img" data-card-img><img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" width="450" height="450"></a>
  <p class="upsell__t">${esc(p.title)}</p>
  <product-form data-scope=".upsell__item" data-fly-source="[data-card-img]">
    <form action="/cart/add" method="post" class="upsell__form" novalidate>
      <input type="hidden" name="id" value="${addId}">${freeV ? '<input type="hidden" name="properties[_offer]" value="1+1">' : ''}
      <button type="submit" name="add" class="upsell__add" data-add aria-label="${esc(fill(T.quick_add_label, { product: p.title }))}"><span data-add-label data-label="+">+</span></button>
    </form>
  </product-form>
</li>`;
    }).join('');
    return `<div class="upsell-wrap">
  <p class="upsell__h">${esc(over ? T.bogo_pick_paid : T.bogo_pick)}</p>
  <ul class="upsell" role="list">${items}</ul>
  <a class="link-arrow upsell__all" href="${esc(D.allUrl)}">${esc(T.view_all)}</a>
</div>`;
  }
  function drawerInner() {
    const n = count();
    const head = `<header class="drawer__head">
  <h2 id="CartDrawerTitle" class="drawer__title">${esc(n > 0 ? T.drawer_title : T.empty)}</h2>
  <button type="button" class="drawer__x" data-close aria-label="${esc(T.close)}">${icon.close}</button>
</header>`;
    if (!n) {
      return `<div class="drawer__inner" id="CartDrawerInner">${head}<div class="drawer__empty">
  <p>${esc(T.empty_text)}</p>
  <a class="btn-dream" href="${esc(D.allUrl)}"><span>${esc(T.continue)}</span><i class="btn-dream__shine" aria-hidden="true"></i></a>
</div></div>`;
    }
    const { free, paid } = counts();
    const over = free > paid;
    const rest = free < paid ? 1 : 0;
    const first = byId.get(cart.items[0].id);
    const show = `<div class="show" aria-hidden="true"><img class="show__bg" src="${esc(D.decor)}" alt="" loading="lazy"><div class="show__obj is-photo" data-fly-target><img src="${esc(first.img)}" alt="" loading="lazy" width="450" height="450"></div></div>`;
    const msg = over ? esc(T.bogo_wait) : (rest === 0 ? `<b>✓</b> ${esc(T.bogo_done)}` : esc(T.bogo_add));
    const bar = `<div class="bogo-bar${rest === 0 && !over ? ' is-done' : ''}" style="--pct: ${rest === 0 && !over ? 100 : 50}%">
  <p class="bogo-bar__msg">${msg}</p>
  <div class="bogo-bar__track"><i></i></div>
  <p class="bogo-bar__count">${esc(fill(plural(T.bogo_progress, n), { count: n }))}</p>
</div>`;
    const lines = `<ul class="lines" aria-label="${esc(T.items)}">${cart.items.map(lineHTML).join('')}</ul>`;
    const note = `<label class="field field--note"><span class="field__label">${esc(T.note_label)}</span><textarea class="field__input" name="note" form="CartDrawerForm" maxlength="400" rows="2" data-cart-note>${esc(cart.note)}</textarea></label>`;
    const warn = over ? `<p class="sum__warn" role="alert">${esc(T.bogo_over)}</p>` : '';
    const express = over ? '' : `<p class="pay__h">${esc(T.express)}</p>
<div class="pay__express demo-pay"><button type="button" class="demo-pay__btn" data-demo-pay>Google Pay</button><button type="button" class="demo-pay__btn" data-demo-pay>Apple Pay</button></div>`;
    const foot = `<footer class="drawer__foot">
  <form action="/cart" method="post" id="CartDrawerForm" novalidate></form>
  <div class="sum"><span>${esc(T.total)}</span><b>${money(total())} EUR</b></div>
  <p class="sum__tax">${esc(T.taxes)}</p>
  ${warn}${express}
  <button type="submit" name="checkout" form="CartDrawerForm" class="btn-dream btn-dream--checkout"${over ? ' disabled' : ''}><span>${esc(T.checkout)}</span><i class="btn-dream__shine" aria-hidden="true"></i></button>
  <p class="demo-note">${esc(T.demo_note)}</p>
</footer>`;
    return `<div class="drawer__inner" id="CartDrawerInner">${head}<div class="drawer__body">${show}${bar}${lines}${rest === 1 || over ? upsellHTML(over) : ''}${note}<p class="drawer__error" data-error hidden></p></div>${foot}</div>`;
  }
  function bubbleHTML() {
    const n = count();
    return `${icon.bag}${n > 0 ? `<span class="bag__n" aria-hidden="true">${n}</span>` : ''}<span class="visually-hidden">${esc(fill(plural(T.cart_count, n), { count: n }))}</span>`;
  }
  const sections = () => ({
    'cart-drawer': `<div class="shopify-section" id="shopify-section-cart-drawer">${drawerInner()}</div>`,
    'cart-icon-bubble': `<div class="shopify-section" id="shopify-section-cart-icon-bubble">${bubbleHTML()}</div>`,
  });
  function paint() {
    const inner = document.getElementById('CartDrawerInner');
    if (inner) { const t = document.createElement('div'); t.innerHTML = drawerInner(); inner.replaceWith(t.firstElementChild); }
    const b = document.getElementById('cart-icon-bubble');
    if (b) b.innerHTML = bubbleHTML();
  }

  /* ---------- à la place de Shopify : les appels du thème au panier ---------- */
  const realFetch = window.fetch.bind(window);
  const reply = (obj) => Promise.resolve(new Response(JSON.stringify(obj), { status: 200, headers: { 'Content-Type': 'application/json' } }));
  window.fetch = (input, opts = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, location.href);
    const m = url.pathname.match(/\/cart(?:\/(add|change|update))?(?:\.js)?$/);
    if (!m) return realFetch(input, opts);
    try {
      const body = opts.body;
      const isForm = body instanceof FormData;
      const data = isForm ? null : (body ? JSON.parse(body) : {});
      if (m[1] === 'add') {
        if (isForm) {
          const props = {};
          for (const [k, val] of body.entries()) { const pm = k.match(/^properties\[(.+)\]$/); if (pm) props[pm[1]] = val; }
          add(body.get('id'), parseInt(body.get('quantity') || '1', 10) || 1, props);
        } else if (data.items) data.items.forEach((i) => add(i.id, i.quantity || 1, i.properties));
        else add(data.id, data.quantity || 1, data.properties);
      } else if (m[1] === 'change') change(String(data.id), parseInt(data.quantity, 10));
      else if (m[1] === 'update') { if (typeof data.note === 'string') cart.note = data.note.slice(0, 400); }
      save(cart);
      return reply({ item_count: count(), total_price: total(), sections: sections() });
    } catch (e) {
      return Promise.resolve(new Response(JSON.stringify({ status: 422, description: e.message || T.error }), { status: 422, headers: { 'Content-Type': 'application/json' } }));
    }
  };

  /* ---------- fin de commande : message de démonstration ---------- */
  function done() {
    let box = document.getElementById('DemoDone');
    if (!box) {
      box = document.createElement('div');
      box.id = 'DemoDone'; box.className = 'demo-done'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
      box.innerHTML = `<div class="demo-done__card"><p class="demo-done__k">${esc(T.done_k)}</p><h2>${esc(T.done_t)}</h2><p>${esc(T.done_p)}</p><button type="button" class="btn-dream" data-demo-close><span>${esc(T.done_b)}</span><i class="btn-dream__shine" aria-hidden="true"></i></button></div>`;
      document.body.appendChild(box);
      box.addEventListener('click', (e) => { if (e.target === box || e.target.closest('[data-demo-close]')) box.classList.remove('is-on'); });
    }
    box.classList.add('is-on');
    const b = box.querySelector('button'); if (b) setTimeout(() => b.focus(), 50);
  }
  document.addEventListener('submit', (e) => {
    if (e.target && e.target.id === 'CartDrawerForm') { e.preventDefault(); done(); }
    else if (e.target && e.target.hasAttribute('data-demo-form')) {
      e.preventDefault();
      const t = document.getElementById('PrismeToast');
      if (t) { t.textContent = T.form_done; t.classList.add('is-on'); setTimeout(() => t.classList.remove('is-on'), 4200); }
    }
  }, true);
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-demo-pay]') || e.target.closest('button[name="checkout"]')) { e.preventDefault(); done(); }
  }, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const b = document.getElementById('DemoDone'); if (b) b.classList.remove('is-on'); } });

  /* ---------- les montures du haut de page : adresses complètes (une variable CSS se lit depuis theme.css) ---------- */
  document.querySelectorAll('[data-mask]').forEach((el) => { el.dataset.mask = new URL(el.dataset.mask, location.href).href; });
  document.querySelectorAll('[data-frame]').forEach((el) => { el.dataset.frame = new URL(el.dataset.frame, location.href).href; });

  /* ---------- le panier gardé s'affiche dès l'ouverture de la page ---------- */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', paint); else paint();
})();
