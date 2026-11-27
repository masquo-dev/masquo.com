/* =====================================================================================================
   Masquo v3 « Coucher de soleil, la nuit » : langues FR | EN, entrée du haut de page, projets à faire glisser,
   visionneuse (images en grand, vidéos FR / EN), formulaire « Parlons de votre projet ». Aucune librairie.
   Les textes anglais sont dans le HTML, les textes français ici (dictionnaire FR).
   Tout ce que tape un visiteur est écrit avec textContent, jamais avec innerHTML.
   ===================================================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nb = ' ';      // espace insécable (typographie française)

  /* ------------------------------------------------------------------ textes français */
  const FR = {
    'skip': 'Aller au contenu',
    'nav.work': 'Réalisations',
    'nav.services': 'Services',
    'nav.process': 'Méthode',
    'nav.support': 'Accompagnement',
    'nav.faq': 'Questions',
    'cta.talk': 'Parlons de votre projet',
    'h.tag': 'Disponible pour de nouveaux projets',
    'h.title': '<span>Votre commerce</span><span>en ligne, créé</span><span>et <em>automatisé.</em></span>',
    'h.lead': 'Sites et boutiques en ligne, automatisations, tableaux de bord Excel et applis Android. Je les construis et je vous accompagne sur tout le projet, du premier échange jusqu’après la mise en ligne.',
    'h.b2': 'Voir les réalisations',
    'h.f1': `<b>24${nb}h</b> pour vous répondre`,
    'h.f2': '<b>Prix fixe</b> avant de commencer',
    'h.f3': '<b>Accompagnement</b> de A à Z',
    'd.c1': 'Solaria · site web',
    'd.c2': 'Order Autopilot · automatisation',
    'd.c3': 'LAGOA · boutique Shopify',
    'tools': 'Les outils que j’utilise',
    'w.title': 'Réalisations',
    'w.lead': 'Des projets qui marchent, à ouvrir et à essayer.',
    'w.drag': 'Faites glisser',
    't.all': 'Tout',
    't.shopify': 'Boutiques Shopify',
    't.web': 'Sites web',
    't.auto': 'Automatisations',
    't.excel': 'Excel',
    't.android': 'Applis Android',
    'c.shopify': 'Boutique Shopify',
    'c.auto': 'Automatisation',
    'c.web': 'Site web',
    'c.android': 'Appli Android',
    'p1.t': 'LAGOA, 24 paires de lunettes',
    'p1.d': `Un thème Shopify${nb}: le lagon vu à travers les verres, chaque paire change en direct, et la paire offerte se choisit librement.`,
    'p2.t': 'Order Autopilot, la boutique qui tourne seule',
    'p2.d': `Paiement, contrôle anti-fraude, stock, facture, étiquette et emails pour chaque commande. Mesuré en test${nb}: environ 2${nb}s de la commande à l’étiquette, 0 commande perdue pendant les pannes provoquées.`,
    'p3.t': 'Solaria, 12 villas de luxe',
    'p3.d': 'Vraies vidéos, matériaux en 3D, carte des villas libres et vrais plans d’architecte, surfaces calculées.',
    'p4.t': 'Prisme, un parfum gravé au prénom',
    'p4.d': 'Le prénom se grave en direct sur le flacon, avec un panier en tiroir et le paiement express.',
    'p5.t': 'MesGigas et Bolide',
    'p5.d': `Deux applis Android complètes, utilisées tous les jours${nb}: un suivi des données mobiles avec alertes, et des cartes de révision avec statistiques.`,
    'p6.t': 'Une année de ventes sur une page',
    'p6.d': `1${nb}830 commandes résumées en 8 chiffres clés, ventes par mois, meilleurs produits et régions.`,
    'p7.t': 'Devis et factures dans Excel',
    'p7.d': 'Listes de clients et de produits, totaux automatiques, et un historique payée, impayée ou en retard.',
    'p8.t': 'Robot de collecte + rapport Excel',
    'p8.d': `Un robot Python lit un catalogue en ligne de 1${nb}000 livres et livre un rapport Excel propre en une minute environ.`,
    'a.store': 'Ouvrir la boutique',
    'a.site': 'Ouvrir le site',
    'a.video': 'Voir la vidéo',
    'a.full': 'Voir en grand',
    'a.same': 'Je veux la même chose →',
    'w.note': 'Les noms et chiffres affichés dans ces exemples sont des données de démonstration.',
    's.title': 'Ce que je peux construire pour vous',
    's1.t': 'Site web ou boutique en ligne',
    's1.p': 'Un site ou une boutique sur mesure, beau sur téléphone, avec Shopify ou sans.',
    's1.d': `dès 3${nb}jours`,
    's2.t': 'Automatisation',
    's2.p': 'Commandes, factures, emails et rapports traités tout seuls avec n8n, Make, Zapier ou Python, et une étape IA quand c’est utile.',
    's2.d': `dès 3${nb}jours`,
    's3.t': 'Tableau de bord Excel ou Google Sheets',
    's3.p': 'Vos chiffres sur une page claire, avec des factures et des suivis qui se calculent seuls.',
    's3.d': `dès 2${nb}jours`,
    's4.t': 'Appli Android',
    's4.p': 'Votre idée en appli à installer, avec le code source. Je corrige et mets aussi à jour les applis existantes.',
    's4.d': `dès 5${nb}jours`,
    's.q': 'prix fixe sur devis',
    's.talk': 'En parler',
    's.also': `Aussi${nb}: chatbots IA, collecte de données, landing pages et intégrations d’API.`,
    'sp.title': 'Au-delà de créer, <em>je vous accompagne</em> sur tout le projet',
    'sp.lead': `Vous n’êtes jamais seul${nb}: du premier échange jusqu’après la mise en ligne, je vous accompagne à chaque étape.`,
    'sp.cta': 'Parlez-moi de votre projet',
    'sp1.t': 'Avant',
    'sp1.p': 'On échange sur votre projet, pour que je comprenne exactement ce que vous voulez.',
    'sp2.t': 'Pendant',
    'sp2.p': `Je vous tiens au courant à chaque étape${nb}: vous voyez votre projet prendre forme et vous donnez votre avis.`,
    'sp3.t': 'Après',
    'sp3.p': `14${nb}jours de corrections gratuites, puis je reste disponible pour vos questions et pour faire évoluer votre projet.`,
    'm.title': 'Simple, du premier message à la livraison',
    'm1.t': 'Vous décrivez',
    'm1.p': `Deux minutes avec le formulaire${nb}: votre idée, vos outils, votre budget.`,
    'm2.t': `Je réponds sous 24${nb}h`,
    'm2.p': 'Un plan clair, un délai et un prix fixe. Vous décidez, sans engagement.',
    'm3.t': 'Je construis',
    'm3.p': 'Vous recevez un aperçu à essayer, et vous demandez les changements.',
    'm4.t': 'C’est livré',
    'm4.p': `Fichiers sources inclus, puis 14${nb}jours de corrections gratuites.`,
    'm.pay': 'Paiement sécurisé, seulement quand le prix vous convient. Aucun mot de passe ne vous est demandé.',
    'ab.title': 'Derrière Masquo, <em>un seul interlocuteur</em>',
    'ab.p': `Je construis des boutiques, des automatisations et des applis de A à Z. Pas seulement des images${nb}: chaque projet de cette page marche vraiment, vous pouvez l’ouvrir et l’essayer. Vous parlez toujours à la même personne, du premier échange jusqu’après la mise en ligne.`,
    'ab.f1': 'Français · anglais',
    'ab.f1s': 'des clients partout dans le monde',
    'ab.f2': '8 projets',
    'ab.f2s': 'à ouvrir sur ce site',
    'ab.f3': 'Code source',
    'ab.f3s': 'livré avec chaque projet',
    'q.title': 'Ce qu’on me demande souvent',
    'q1': `Combien ça coûte${nb}?`,
    'q1a': 'Chaque projet est différent. Après votre message, je vous envoie un prix fixe, avant de commencer. Pas de surprise ensuite.',
    'q2': `En combien de temps${nb}?`,
    'q2a': 'Quelques jours pour une boutique ou une automatisation simple, une à trois semaines pour un projet complet. Le délai est écrit dans le devis.',
    'q3': `Comment se passe le paiement${nb}?`,
    'q3a': 'Par un paiement sécurisé, seulement quand le prix et le délai vous conviennent.',
    'q4': `Dois-je vous donner mes mots de passe${nb}?`,
    'q4a': 'Non. Sur Shopify, vous m’invitez comme collaborateur. Pour le reste, des accès limités suffisent.',
    'q5': `Et si je veux des changements${nb}?`,
    'q5a': `Les changements sont inclus pendant la construction, puis 14${nb}jours de corrections gratuites après la livraison.`,
    'q6': `À qui appartient ce qui est livré${nb}?`,
    'q6a': 'À vous. Les fichiers sources sont inclus.',
    'q7': `Vous m’aidez aussi après la livraison${nb}?`,
    'q7a': `Oui. Vous avez 14${nb}jours de corrections gratuites, puis je reste disponible pour faire évoluer votre projet.`,
    'c.title': 'Parlons de votre <em>projet</em>',
    'c.p': `Décrivez votre idée en deux minutes. Je vous réponds par email, en général sous 24${nb}h, avec un plan clair et un prix fixe. Sans engagement.`,
    'c.s1': 'Vous décrivez votre projet ici',
    'c.s2': 'Je vous réponds par email avec un plan et un prix fixe',
    'c.s3': 'Vous validez, et je me mets au travail',
    'c.fine': `Sans engagement${nb}: vous décidez après avoir lu ma proposition.`,
    'f.need': `Que voulez-vous construire${nb}?`,
    'f.n1': 'Boutique Shopify',
    'f.n2': 'Automatisation',
    'f.n3': 'Tableau de bord Excel / Sheets',
    'f.n4': 'Appli Android',
    'f.n5': 'Site web',
    'f.n6': 'Autre chose',
    'f.name': 'Votre nom',
    'f.email': 'Votre email',
    'f.shop': 'Votre boutique ou site actuel',
    'f.opt': '(facultatif)',
    'f.shop.ph': 'maboutique.fr',
    'f.goal': 'Votre objectif',
    'f.goal.ph': `Exemple${nb}: je vends des bougies sur Etsy et je veux ma propre boutique Shopify, avec les factures envoyées toutes seules.`,
    'f.budget': 'Votre budget',
    'f.b1': `Moins de 300${nb}€`,
    'f.b2': `300 à 1${nb}000${nb}€`,
    'f.b3': `1${nb}000 à 3${nb}000${nb}€`,
    'f.b4': `Plus de 3${nb}000${nb}€`,
    'f.b5': 'Je ne sais pas encore',
    'f.when': `Pour quand${nb}?`,
    'f.d1': 'Dès que possible',
    'f.d2': 'Dans le mois',
    'f.d3': 'Dans les 3 mois',
    'f.d4': 'Pas pressé',
    'f.consent': `J’accepte que Masquo utilise ces informations uniquement pour répondre à ma demande. Elles sont gardées 12${nb}mois au maximum, avec l’adresse IP, le pays et le navigateur d’envoi (pour la sécurité), puis effacées. La vérification anti-robot est faite par Cloudflare.`,
    'f.send': 'Envoyer ma demande',
    'f.ok.t': 'Merci',
    'f.ok.p': `Votre demande est bien arrivée. Je vous réponds par email, en général sous 24${nb}h. Pensez à regarder dans vos courriers indésirables.`,
    'ft.p': 'Boutiques Shopify, automatisations, tableaux de bord Excel et applis Android.',
    'ft.also': 'Aussi sur',
    'f.priv': 'Adresse IP, lieu approximatif (pays, région, ville), opérateur, page visitée, provenance, navigateur et langue enregistrés 30 jours, pour la sécurité et les statistiques.',
    'lb.hint': 'Cliquez sur l’image pour zoomer · faites défiler pour tout voir',
  };
  const ARIA = {
    en: { deck: 'Three of my projects', prev: 'Previous', next: 'Next', cats: 'Categories', close: 'Close' },
    fr: { deck: 'Trois de mes réalisations', prev: 'Précédent', next: 'Suivant', cats: 'Catégories', close: 'Fermer' },
  };
  const META = {
    en: {
      title: 'Masquo · Websites, online stores, automations, Excel & Android apps',
      desc: 'Your online business, built and automated, with support throughout the project: websites and online stores, automations with n8n, Make, Zapier and Python, Excel and Google Sheets dashboards, and Android apps.',
    },
    fr: {
      title: 'Masquo · Sites, boutiques en ligne, automatisations, Excel et applis Android',
      desc: `Votre commerce en ligne, créé et automatisé, avec un accompagnement sur tout le projet${nb}: sites et boutiques en ligne, automatisations avec n8n, Make, Zapier et Python, tableaux de bord Excel et Google Sheets, et applis Android.`,
    },
  };

  function pickLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'fr' || q === 'en') return q;
    try {
      const s = localStorage.getItem('lang');
      if (s === 'fr' || s === 'en') return s;
    } catch (e) { /* stockage bloqué : on continue */ }
    return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i]').forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const fr = FR[el.dataset.i];
      el.innerHTML = lang === 'fr' && fr ? fr : el.dataset.en;
    });
    document.querySelectorAll('[data-i-ph]').forEach((el) => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute('placeholder') || '';
      const fr = FR[el.dataset.iPh];
      el.setAttribute('placeholder', lang === 'fr' && fr ? fr : el.dataset.enPh);
    });
    // images et liens en français quand on choisit FR (la version anglaise est dans le HTML)
    document.querySelectorAll('[data-src-fr]').forEach((el) => {
      if (el.dataset.srcEn === undefined) el.dataset.srcEn = el.getAttribute('src');
      el.setAttribute('src', lang === 'fr' ? el.dataset.srcFr : el.dataset.srcEn);
    });
    document.querySelectorAll('[data-href-fr]').forEach((el) => {
      if (el.dataset.hrefEn === undefined) el.dataset.hrefEn = el.getAttribute('href');
      el.setAttribute('href', lang === 'fr' ? el.dataset.hrefFr : el.dataset.hrefEn);
    });
    const A = ARIA[lang];
    const setAria = (sel, v) => document.querySelectorAll(sel).forEach((el) => el.setAttribute('aria-label', v));
    setAria('.deck', A.deck); setAria('.arrow[data-dir="-1"]', A.prev); setAria('.arrow[data-dir="1"]', A.next);
    setAria('.tabs', A.cats); setAria('.lightbox__close', A.close);
    root.lang = lang;
    document.title = META[lang].title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.content = META[lang].desc;
    document.querySelectorAll('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.dispatchEvent(new CustomEvent('masquo:lang', { detail: lang }));
  }

  applyLang(pickLang());
  document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
    applyLang(b.dataset.lang);
    try { localStorage.setItem('lang', b.dataset.lang); } catch (e) { /* rien */ }
  }));

  /* ------------------------------------------------------------------ menu plein au défilement */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------ entrée du haut de page */
  const hero = document.querySelector('.hero');
  const start = () => {
    if (!hero || hero.classList.contains('is-in')) return;
    hero.classList.add('is-in');
    nav.classList.add('is-in');
    setTimeout(() => hero.classList.add('is-done'), 1900);
    // les grandes images des projets sont décodées à l’avance, pour un premier défilement sans à-coup
    setTimeout(() => document.querySelectorAll('.track img').forEach((im) => { if (im.decode) im.decode().catch(() => {}); }), 2200);
  };
  requestAnimationFrame(() => requestAnimationFrame(start));

  /* ------------------------------------------------------------------ apparition au défilement */
  document.querySelectorAll('.svc, .steps, .aspects').forEach((list) => {
    list.querySelectorAll('[data-reveal]').forEach((el, k) => el.style.setProperty('--d', `${k * 90}ms`));
  });
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ------------------------------------------------------------------ bandeau d'outils : boucle sans saut */
  const tools = document.querySelector('.tools__track');
  if (tools) [...tools.children].forEach((li) => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); tools.appendChild(c); });

  /* ------------------------------------------------------------------ réalisations : onglets, flèches, glisser */
  const track = document.getElementById('track');
  const panels = () => [...track.querySelectorAll('.panel:not([hidden])')];
  const tabs = document.querySelectorAll('.tabs [data-f]');
  const filter = (f) => {
    tabs.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.f === f)));
    track.querySelectorAll('.panel').forEach((p) => { p.hidden = f !== 'all' && p.dataset.cat !== f; });
    track.scrollTo({ left: 0, behavior: reduced ? 'auto' : 'smooth' });
  };
  tabs.forEach((t) => t.addEventListener('click', () => filter(t.dataset.f)));
  const padStart = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const goTo = (panel) => track.scrollTo({ left: panel.offsetLeft - padStart(), behavior: reduced ? 'auto' : 'smooth' });
  document.querySelectorAll('.arrow').forEach((b) => b.addEventListener('click', () => {
    const list = panels();
    const x = track.scrollLeft + padStart();
    let i = list.findIndex((p) => p.offsetLeft >= x - 4);
    if (i < 0) i = list.length - 1;
    const next = list[Math.min(list.length - 1, Math.max(0, i + Number(b.dataset.dir)))];
    if (next) goTo(next);
  }));
  // glisser à la souris (au doigt, le défilement natif suffit)
  let down = false; let sx = 0; let sl = 0; let moved = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a, button')) return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-drag'); }
    if (moved) track.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    if (moved) {
      track.classList.remove('is-drag');
      // on s'arrête proprement sur le panneau le plus proche
      const x = track.scrollLeft + padStart();
      const list = panels();
      let best = list[0];
      list.forEach((p) => { if (Math.abs(p.offsetLeft - x) < Math.abs(best.offsetLeft - x)) best = p; });
      if (best) goTo(best);
    }
  });
  // les 3 projets du haut de page mènent à leur panneau
  document.querySelectorAll('[data-go]').forEach((a) => a.addEventListener('click', (e) => {
    const panel = document.getElementById(a.dataset.go);
    if (!panel) return;
    e.preventDefault();
    filter('all');
    document.getElementById('work').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => goTo(panel), reduced ? 0 : 450);
  }));

  /* ------------------------------------------------------------------ « Je veux la même chose » / « En parler » */
  document.querySelectorAll('[data-need]').forEach((a) => a.addEventListener('click', () => {
    document.querySelectorAll('#pform input[name="need"]').forEach((i) => { i.checked = i.value === a.dataset.need; });
  }));

  /* ------------------------------------------------------------------ motion design */
  // (uniquement transform et opacity ; tout s'arrête si le visiteur a demandé moins d'animations)
  const fine = window.matchMedia('(pointer: fine)').matches;
  const small = window.matchMedia('(max-width: 600px)').matches;

  // titre du haut : chaque ligne monte derrière un masque
  const wrapLines = () => document.querySelectorAll('.hero h1 > span').forEach((line) => {
    if (line.querySelector('.ln')) return;
    const ln = document.createElement('span');
    ln.className = 'ln';
    while (line.firstChild) ln.appendChild(line.firstChild);
    line.appendChild(ln);
  });
  // titres de section : découpés en mots qui montent un par un
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = part;
            inner.style.setProperty('--i', i);
            i += 1;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && !ch.classList.contains('w')) {
          if (ch.tagName === 'EM') ch.classList.add('is-split');
          walk(ch);
        }
      });
    };
    walk(el);
  }
  const splitTitles = () => document.querySelectorAll('.sec-head h2, .about h2, .contact__intro h2').forEach(splitWords);
  wrapLines();
  splitTitles();
  document.addEventListener('masquo:lang', () => { wrapLines(); splitTitles(); });

  // groupes qui s'animent en entrant dans l'écran
  const groups = document.querySelectorAll('.sec-head, .about, .contact__intro, .steps, .aspects');
  if ('IntersectionObserver' in window && !reduced) {
    const gio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); gio.unobserve(en.target); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    groups.forEach((g) => gio.observe(g));
  } else {
    groups.forEach((g) => g.classList.add('is-in'));
  }

  if (!reduced) {
    // étoiles dans les deux ciels de nuit
    const rnd = (a, b) => a + Math.random() * (b - a);
    document.querySelectorAll('.sky').forEach((sky, k) => {
      const n = (k === 0 ? 46 : 30) * (small ? 0.5 : 1);
      for (let j = 0; j < n; j += 1) {
        const st = document.createElement('i');
        st.className = 'star';
        st.style.left = `${rnd(1, 99).toFixed(2)}%`;
        st.style.top = `${rnd(2, 66).toFixed(2)}%`;
        st.style.setProperty('--s', `${rnd(1, 2.6).toFixed(1)}px`);
        st.style.setProperty('--d', `${rnd(2.6, 6.5).toFixed(2)}s`);
        st.style.setProperty('--delay', `${(-rnd(0, 6)).toFixed(2)}s`);
        sky.appendChild(st);
      }
    });

    // barre de lecture, profondeur du haut de page, lumière et projets en 3D qui suivent la souris
    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
    const deck = document.querySelector('.deck');
    const spot = document.createElement('span');
    spot.className = 'spot';
    spot.setAttribute('aria-hidden', 'true');
    if (hero && fine) hero.appendChild(spot);
    let tp = 0; let cp = -1;
    let tx = 0; let ty = 0; let cx = 0; let cy = 0;
    let sx = 0; let sy = 0; let csx = 0; let csy = 0;
    let raf = 0;
    const frame = () => {
      raf = 0;
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      csx += (sx - csx) * 0.12; csy += (sy - csy) * 0.12;
      const p = Math.abs(tp - cp) < 0.001 ? cp : cp + (tp - cp) * (cp < 0 ? 1 : 0.25);
      if (p !== cp) { cp = p; if (hero) hero.style.setProperty('--p', p.toFixed(3)); }
      if (deck) deck.style.transform = `translate3d(0, ${(-cp * 120).toFixed(1)}px, 0) rotateX(${(-cy * 7).toFixed(2)}deg) rotateY(${(cx * 10).toFixed(2)}deg)`;
      if (fine) { spot.style.setProperty('--sx', `${csx.toFixed(1)}px`); spot.style.setProperty('--sy', `${csy.toFixed(1)}px`); }
      const moving = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 || Math.abs(sx - csx) + Math.abs(sy - csy) > 0.5 || Math.abs(tp - cp) > 0.001;
      if (moving) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onScrollMotion = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${(window.scrollY / max).toFixed(4)})`;
      tp = hero ? Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight))) : 0;
      kick();
    };
    window.addEventListener('scroll', onScrollMotion, { passive: true });
    window.addEventListener('resize', onScrollMotion);
    onScrollMotion();
    if (hero && fine) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        sx = e.clientX - r.left; sy = e.clientY - r.top;
        kick();
      });
      hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    }

    // réalisations : le panneau en cours est grand, les autres reculent un peu
    let praf = 0;
    const updatePanels = () => {
      praf = 0;
      const x = track.scrollLeft + padStart();
      panels().forEach((pn) => {
        const d = (pn.offsetLeft - x) / (pn.offsetWidth + 22);
        const a = Math.min(1, Math.abs(d));
        pn.style.transformOrigin = d < 0 ? '100% 50%' : '0 50%';
        pn.style.transform = `scale(${(1 - 0.07 * a).toFixed(3)})`;
        pn.style.opacity = (1 - (d < 0 ? 0.55 : 0.35) * a).toFixed(3);
      });
    };
    const kickPanels = () => { if (!praf) praf = requestAnimationFrame(updatePanels); };
    track.addEventListener('scroll', kickPanels, { passive: true });
    window.addEventListener('resize', kickPanels);
    tabs.forEach((t) => t.addEventListener('click', () => setTimeout(kickPanels, 30)));
    kickPanels();

    // boutons principaux aimantés
    if (fine) {
      document.querySelectorAll('.nav .pill, .btns .pill, .pf-send, .support__cta').forEach((b) => {
        b.classList.add('magnetic');
        b.addEventListener('pointermove', (e) => {
          const r = b.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
          b.style.transform = `translate(${(dx * 10).toFixed(1)}px, ${(dy * 8).toFixed(1)}px)`;
        });
        b.addEventListener('pointerleave', () => { b.style.transform = ''; });
      });
    }
  }

  /* ------------------------------------------------------------------ visionneuse : images en grand et vidéos */
  const box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function') {
    const img = box.querySelector('.lightbox__img');
    const vid = box.querySelector('.lightbox__video');
    const hint = box.querySelector('.lightbox__hint');
    const scroller = box.querySelector('.lightbox__scroll');
    const fr = () => root.lang === 'fr';
    const phone = window.matchMedia('(max-width: 640px)');
    const fit = () => {
      const r = img.naturalWidth / Math.max(1, img.naturalHeight);
      img.classList.toggle('is-wide', r > scroller.clientWidth / Math.max(1, scroller.clientHeight));
    };
    img.addEventListener('load', () => { fit(); box.classList.remove('is-loading'); });
    img.addEventListener('error', () => box.classList.remove('is-loading'));
    document.querySelectorAll('[data-lightbox]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      box.classList.remove('is-zoom', 'is-video', 'is-tall');
      img.hidden = false; hint.hidden = false; vid.hidden = true;
      box.classList.add('is-loading');
      img.src = a.getAttribute('href');
      box.showModal();
      scroller.scrollTo(0, 0);
    }));
    img.addEventListener('click', (e) => {
      const r = img.getBoundingClientRect();
      const fx = (e.clientX - r.left) / r.width;
      const fy = (e.clientY - r.top) / r.height;
      box.classList.toggle('is-zoom');
      requestAnimationFrame(() => {
        scroller.scrollLeft = fx * scroller.scrollWidth - scroller.clientWidth / 2;
        scroller.scrollTop = fy * scroller.scrollHeight - scroller.clientHeight / 2;
      });
    });
    document.querySelectorAll('[data-video]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const d = a.dataset;
      const tall = phone.matches && d.videoTall;
      box.classList.remove('is-zoom', 'is-loading');
      box.classList.add('is-video');
      box.classList.toggle('is-tall', !!tall);
      img.hidden = true; hint.hidden = true; vid.hidden = false;
      vid.src = tall ? ((fr() && d.videoTallFr) || d.videoTall) : ((fr() && d.videoFr) || a.getAttribute('href'));
      box.showModal();
      vid.play().catch(() => { /* le navigateur attend un clic sur le lecteur */ });
    }));
    box.querySelector('.lightbox__close').addEventListener('click', () => box.close());
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
    box.addEventListener('close', () => {
      img.src = 'data:,'; box.classList.remove('is-zoom', 'is-video', 'is-tall', 'is-loading');
      vid.pause(); vid.removeAttribute('src'); vid.load();
      img.hidden = false; hint.hidden = false; vid.hidden = true;
    });
  }

  /* ------------------------------------------------------------------ formulaire « Parlons de votre projet » */
  const form = document.getElementById('pform');
  if (form && window.fetch) {
    const MSG = {
      en: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address, so I can reply to you.',
        goal: 'Please describe your goal in a few words.',
        consent: 'Please tick the agreement box to send your request.',
        net: 'Sending didn’t work. Check your connection and try again, or write to me on',
        limit: 'You have already sent several requests today: I have received them and will reply soon. Anything to add? Write to me on',
        busy: 'The form is not available right now. You can write to me on',
        sending: 'Sending…',
        human: 'Please complete the “I’m human” check just above, then send again.',
      },
      fr: {
        name: 'Indiquez votre nom.',
        email: 'Indiquez une adresse email valide, pour que je puisse vous répondre.',
        goal: 'Décrivez votre objectif en quelques mots.',
        consent: 'Cochez la case d’accord pour envoyer votre demande.',
        net: 'L’envoi n’a pas marché. Vérifiez votre connexion et réessayez, ou écrivez-moi sur',
        limit: 'Vous avez déjà envoyé plusieurs demandes aujourd’hui : je les ai bien reçues et je vous réponds vite. Un ajout ? Écrivez-moi sur',
        busy: 'Le formulaire n’est pas disponible pour le moment. Vous pouvez m’écrire sur',
        sending: 'Envoi…',
        human: 'Validez la vérification « je suis humain » juste au-dessus, puis renvoyez.',
      },
    };
    const EMAIL = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
    const L = () => (root.lang === 'fr' ? 'fr' : 'en');
    const field = (n) => form.elements[n];
    const err = form.querySelector('.pf-err');
    const send = form.querySelector('.pf-send');
    const sendLabel = send.querySelector('[data-i]');
    const body = form.querySelector('.pform__body');
    const done = form.querySelector('.pform__done');
    const who = form.querySelector('.pform__who');
    const goal = field('goal');
    const count = form.querySelector('.pf__count');
    let errKey = '';
    let t0 = 0;
    let busy = false;
    let sentName = '';

    // si le formulaire ne peut pas recevoir la demande, le visiteur garde un autre moyen de me joindre : Fiverr
    const FALLBACK = ['net', 'limit', 'busy'];
    const showErr = (k) => {
      errKey = k; err.hidden = !k; err.textContent = k ? MSG[L()][k] : '';
      if (k && FALLBACK.includes(k)) {
        const a = document.createElement('a');
        a.href = 'https://www.fiverr.com/devappmob'; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Fiverr';
        err.append(' ', a, '.');
      }
    };
    const mark = (input, bad) => { if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); };
    const setWho = () => { who.textContent = sentName ? (L() === 'fr' ? `, ${sentName}${nb}!` : `, ${sentName}!`) : (L() === 'fr' ? `${nb}!` : '!'); };
    const updCount = () => { count.textContent = `${goal.value.length} / 2000`; };

    form.addEventListener('focusin', () => { if (!t0) t0 = Date.now(); });
    form.addEventListener('input', (e) => {
      if (!t0) t0 = Date.now();
      if (e.target.getAttribute('aria-invalid')) mark(e.target, false);
      if (e.target === goal) updCount();
    });
    form.addEventListener('change', (e) => { if (e.target.name === 'consent' && e.target.checked) { mark(e.target, false); if (errKey === 'consent') showErr(''); } });
    updCount();

    // vérification « je suis humain » de Cloudflare : son script n'est chargé que quand le formulaire approche
    const human = form.querySelector('.pf-human');
    // sur le PC (localhost), la clé d'essai publique de Cloudflare ; en ligne, la vraie clé publique du formulaire
    const SITEKEY = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? '1x00000000000000000000AA' : (form.dataset.sitekey || '');
    let tsId = null;
    let tsLoading = false;
    const renderTs = () => {
      if (!SITEKEY || !window.turnstile || !human) return;
      if (tsId !== null) { try { window.turnstile.remove(tsId); } catch (x) { /* rien */ } tsId = null; }
      tsId = window.turnstile.render(human, {
        sitekey: SITEKEY, theme: 'dark', language: L(), size: 'flexible', action: 'brief',
        callback: () => { if (errKey === 'human') showErr(''); },
      });
    };
    const loadTs = () => {
      if (!SITEKEY || tsLoading) return;
      tsLoading = true;
      const sc = document.createElement('script');
      sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      sc.async = true;
      sc.addEventListener('load', renderTs);
      sc.addEventListener('error', () => { tsLoading = false; });
      document.head.appendChild(sc);
    };
    if (SITEKEY && human) {
      human.classList.add('is-on');
      form.addEventListener('focusin', loadTs);
      if ('IntersectionObserver' in window) {
        const tio = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { tio.disconnect(); loadTs(); } }, { rootMargin: '600px 0px' });
        tio.observe(form);
      } else {
        loadTs();
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (busy) return;
      const name = field('name').value.trim();
      const email = field('email').value.trim();
      const text = goal.value.trim();
      const checks = [
        ['name', field('name'), name.length >= 2],
        ['email', field('email'), EMAIL.test(email) && email.length <= 120],
        ['goal', goal, text.length >= 10],
        ['consent', field('consent'), field('consent').checked],
      ];
      checks.forEach(([, input, good]) => mark(input, !good));
      const bad = checks.find((c) => !c[2]);
      if (bad) { showErr(bad[0]); bad[1].focus(); return; }
      let ts = '';
      if (SITEKEY) {
        ts = (window.turnstile && tsId !== null && window.turnstile.getResponse(tsId)) || '';
        if (!ts) { loadTs(); showErr('human'); return; }
      }
      showErr('');
      busy = true;
      send.disabled = true;
      sendLabel.textContent = MSG[L()].sending;
      const payload = {
        lang: L(), name, email, shop: field('shop').value.trim(), goal: text,
        need: [...form.querySelectorAll('input[name="need"]:checked')].map((x) => x.value),
        budget: (form.querySelector('input[name="budget"]:checked') || {}).value || '',
        deadline: (form.querySelector('input[name="deadline"]:checked') || {}).value || '',
        consent: true, hp: field('mq_hp').value, t: t0 ? Date.now() - t0 : 0, page: location.pathname, ts,
      };
      let res = 'net';
      try {
        const r = await fetch(form.dataset.endpoint, {
          method: 'POST', mode: 'cors', credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(payload),
        });
        let d = {};
        try { d = await r.json(); } catch (x) { /* réponse vide */ }
        if (r.ok && d.ok) res = 'ok';
        else if (d.error === 'limit') res = 'limit';
        else if (d.error === 'consent') res = 'consent';
        else if (d.error === 'captcha') res = 'human';
        else if (d.error === 'invalid') res = 'email';
        else res = 'busy';   // service plein ou en panne : on propose Fiverr
      } catch (x) { res = 'net'; }
      busy = false;
      send.disabled = false;
      if (SITEKEY && window.turnstile && tsId !== null) { try { window.turnstile.reset(tsId); } catch (x) { /* rien */ } }
      sendLabel.innerHTML = L() === 'fr' ? FR['f.send'] : sendLabel.dataset.en;
      if (res !== 'ok') { showErr(res); if (res === 'email') { mark(field('email'), true); field('email').focus(); } return; }
      sentName = name.split(/\s+/)[0].slice(0, 40);
      setWho();
      body.hidden = true;
      done.hidden = false;
      done.focus({ preventScroll: true });
      form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    });
    document.addEventListener('masquo:lang', () => { if (errKey) showErr(errKey); setWho(); if (tsId !== null) renderTs(); });
  }
})();
