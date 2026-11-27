/*
  Solaria · twelve villas facing the sunset (fictional program, demo website by Masquo).
  Real films for the dream (Pexels, no people), a real aerial view as interactive masterplan, an architect's plan
  drawn live, and the noble materials in realistic real-time 3D (Poly Haven sunset sky, marble, travertine, oak,
  plaster, brass). One wheel notch / swipe / key = one step, each step shown complete.
  Step changes: a soft cross-fade with a slight zoom.
*/
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { TYPES, stats, planSvg, NAMES } from './plans.js?v=2611h';

const Q = new URLSearchParams(location.search);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = matchMedia('(hover: none)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const NB = ' ';
const VER = '2611h'; // change it (and in index.html) when the films or code change

/* ---------------- texts ---------------- */
const T = {
  en: {
    title: 'Solaria · Twelve villas facing the sunset', lang: 'Language',
    'nav.sub': 'Villas · Fictional program', 'nav.book': 'Book a visit',
    'hero.eyebrow': 'New program · Delivery 2028', 'hero.l1': 'Twelve villas', 'hero.l2': '<em>facing the sunset.</em>',
    'hero.f1': '12 villas', 'hero.f3': 'Infinity pool each', 'hero.choose': 'Choose my villa', 'hero.discover': 'Discover the estate',
    from: 'from', 'place.eyebrow': '01 · The site', 'place.l1': 'On a hillside', 'place.l2': '<em>above the sea.</em>',
    'place.lead': 'A private estate of three hectares, built in terraces so that every villa sees the horizon. The beach is a 4-minute walk below.',
    'place.f1': '3 hectares', 'place.f2': '100% sea view', 'place.f3': 'Beach 300 m',
    'arch.eyebrow': '02 · Architecture', 'arch.l1': 'White stone,', 'arch.l2': '<em>glass and water.</em>',
    'arch.lead': 'Two floors, a cantilevered upper level and an infinity pool that ends exactly where the sea begins.',
    'inside.eyebrow': '03 · Interiors', 'inside.l1': 'The tour,', 'inside.l2': '<em>room by room.</em>',
    tour: {
      entry: ['Entrance', 'Solid-wood pivot door, stone façade.'], living: ['Living room', 'Light sofas, sheer curtains, late-afternoon light.'],
      dining: ['Dining room', 'A long table, full-height windows.'], kitchen: ['Kitchen', 'Central island with stools, open to the dining area.'],
      stairs: ['Staircase', 'Stone steps, glass railing, indoor garden.'], suite: ['Bedroom suite', 'Wood headboard, a view over the water.'],
      terrace: ['Terrace', 'Pergola and outdoor lounge, at sunset.'], pool: ['Pool', 'Seen from upstairs, facing the water.'],
    },
    'mat.eyebrow': '04 · Materials', 'mat.l1': 'Only noble', 'mat.l2': '<em>materials.</em>',
    'mat.lead': 'Calacatta marble floors, travertine terraces, solid oak and brushed brass. Every sample can be touched in the show villa.',
    'm.marble': ['Calacatta marble', 'floors'], 'm.trav': ['Travertine', 'terraces'], 'm.oak': ['Solid oak', 'doors & joinery'],
    'm.brass': ['Brushed brass', 'handles & taps'], 'm.plaster': ['Lime plaster', 'walls'], 'm.glass': ['Low-iron glass', '3.2 m sliding doors'],
    'choose.eyebrow': '05 · Availability', 'choose.l1': 'Choose', 'choose.l2': '<em>your villa.</em>',
    'choose.lead': 'Each point is a villa. Hover it for its price, click it to open its plan.',
    'choose.lead.touch': 'Each point is a villa. Tap it to open its plan and its price.', 'club.short': 'Club house',
    'st.free': 'available', 'st.hold': 'reserved', 'st.sold': 'sold',
    'badge.free': 'Available', 'badge.hold': 'Reserved', 'badge.sold': 'Sold', club: 'Club house & shared pool',
    'villa.book': 'Book a visit', 'villa.back': 'Back to the map', villa: 'Villa', beds: 'bedrooms',
    'plan.zoom': 'Enlarge the plan', 'plan.close': 'Close',
    'sp.int': 'Living space', 'sp.plot': 'Plot', 'sp.pool': 'Infinity pool', 'sp.terr': 'Terraces',
    'p.living': 'Living room', 'p.dining': 'Dining', 'p.kitchen': 'Kitchen', 'p.suite': 'Guest suite', 'p.bath': 'Bath',
    'p.entry': 'Entrance', 'p.terrace': 'Terrace', 'p.pool': 'Infinity pool', 'p.floor': 'Ground floor', 'p.upper': 'Upper floor: master suite + {n} bedrooms',
    'eve.eyebrow': '07 · Evenings', 'eve.l1': 'Night falls,', 'eve.l2': '<em>the villa lights up.</em>',
    eve: {
      lights: ['The lights come on', 'Warm lamps behind the tall windows, at nightfall.', 'Lights'],
      dinner: ['Dinner by the pool', 'The table is set, the water right beside it.', 'Dinner'],
      pool: ['The pool, lit at night', 'An underwater light against the stone wall.', 'Pool'],
    },
    'visit.eyebrow': '08 · Visit', 'visit.l1': 'Come and see', 'visit.l2': '<em>the show villa.</em>',
    'visit.lead': 'Private visits every day, by appointment. The brochure has every plan, every view and every price.',
    'visit.book': 'Book a private visit', 'visit.brochure': 'Download the brochure',
    'visit.fine': 'Solaria is a fictional program with sample prices, created as a demo website by <a href="https://masquo.com">Masquo</a>: websites for real-estate developers and architects. Videos: Pexels. Materials in real-time 3D. IP address, approximate location (country, region, city), internet provider, page visited, source, browser and language are kept for 30 days, for security and statistics.',
    'toast.book': '<b>Demo website.</b> Solaria is a fictional program: on a real site, this button books a visit in the sales team’s calendar.',
    'toast.brochure': '<b>Demo website.</b> On a real site, the PDF brochure with every plan downloads here.',
    'next.to': 'Next:', 'next.again': 'Back to the start ↺',
    dots: ['Solaria', 'The site', 'Architecture', 'Interiors', 'Materials', 'Availability', 'Your villa', 'Evenings', 'Visit'],
  },
  fr: {
    title: 'Solaria · Douze villas face au coucher du soleil', lang: 'Langue',
    'nav.sub': 'Villas · Programme fictif', 'nav.book': 'Réserver une visite',
    'hero.eyebrow': 'Programme neuf · Livraison 2028', 'hero.l1': 'Douze villas', 'hero.l2': '<em>face au coucher du soleil.</em>',
    'hero.f1': '12 villas', 'hero.f3': 'Piscine à débordement', 'hero.choose': 'Choisir ma villa', 'hero.discover': 'Découvrir le domaine',
    from: 'dès', 'place.eyebrow': '01 · Le site', 'place.l1': 'À flanc de colline,', 'place.l2': '<em>au-dessus de la mer.</em>',
    'place.lead': 'Un domaine privé de trois hectares, construit en terrasses pour que chaque villa voie l’horizon. La plage est à 4 minutes à pied.',
    'place.f1': '3 hectares', 'place.f2': `100${NB}% vue mer`, 'place.f3': `Plage à 300${NB}m`,
    'arch.eyebrow': '02 · Architecture', 'arch.l1': 'Pierre blanche,', 'arch.l2': '<em>verre et eau.</em>',
    'arch.lead': 'Deux niveaux, un étage en porte-à-faux et une piscine à débordement qui s’arrête exactement là où commence la mer.',
    'inside.eyebrow': '03 · Intérieurs', 'inside.l1': 'La visite,', 'inside.l2': '<em>pièce par pièce.</em>',
    tour: {
      entry: ['Entrée', 'Porte pivotante en bois massif, façade en pierre.'], living: ['Séjour', 'Canapés clairs, voilages, lumière de fin de journée.'],
      dining: ['Salle à manger', 'Une grande table, baies vitrées toute hauteur.'], kitchen: ['Cuisine', 'Îlot central et tabourets, ouverte sur la salle à manger.'],
      stairs: ['Escalier', 'Marches en pierre, garde-corps en verre, jardin intérieur.'], suite: ['Suite', 'Tête de lit en bois, vue sur l’eau.'],
      terrace: ['Terrasse', 'Pergola et salon d’extérieur, au coucher du soleil.'], pool: ['Piscine', 'Vue de l’étage, face à l’eau.'],
    },
    'mat.eyebrow': '04 · Matériaux', 'mat.l1': 'Rien que des', 'mat.l2': '<em>matériaux nobles.</em>',
    'mat.lead': 'Sols en marbre de Calacatta, terrasses en travertin, chêne massif et laiton brossé. Chaque échantillon se touche dans la villa témoin.',
    'm.marble': ['Marbre de Calacatta', 'sols'], 'm.trav': ['Travertin', 'terrasses'], 'm.oak': ['Chêne massif', 'portes et menuiseries'],
    'm.brass': ['Laiton brossé', 'poignées et robinets'], 'm.plaster': ['Enduit à la chaux', 'murs'], 'm.glass': ['Verre extra-clair', `baies de 3,2${NB}m`],
    'choose.eyebrow': '05 · Disponibilités', 'choose.l1': 'Choisissez', 'choose.l2': '<em>votre villa.</em>',
    'choose.lead': 'Chaque point est une villa. Survolez-le pour voir son prix, cliquez pour ouvrir son plan.',
    'choose.lead.touch': 'Chaque point est une villa. Touchez-le pour ouvrir son plan et son prix.', 'club.short': 'Club house',
    'st.free': 'disponibles', 'st.hold': 'réservées', 'st.sold': 'vendues',
    'badge.free': 'Disponible', 'badge.hold': 'Réservée', 'badge.sold': 'Vendue', club: 'Club house et piscine commune',
    'villa.book': 'Réserver une visite', 'villa.back': 'Retour au plan', villa: 'Villa', beds: 'chambres',
    'plan.zoom': 'Agrandir le plan', 'plan.close': 'Fermer',
    'sp.int': 'Surface habitable', 'sp.plot': 'Terrain', 'sp.pool': 'Piscine à débordement', 'sp.terr': 'Terrasses',
    'p.living': 'Salon', 'p.dining': 'Salle à manger', 'p.kitchen': 'Cuisine', 'p.suite': 'Suite invités', 'p.bath': 'Bain',
    'p.entry': 'Entrée', 'p.terrace': 'Terrasse', 'p.pool': 'Piscine à débordement', 'p.floor': 'Rez-de-chaussée', 'p.upper': 'Étage : suite parentale + {n} chambres',
    'eve.eyebrow': '07 · Le soir', 'eve.l1': 'La nuit tombe,', 'eve.l2': '<em>la villa s’allume.</em>',
    eve: {
      lights: ['Les lumières s’allument', 'Lampes chaudes derrière les grandes baies, à la tombée de la nuit.', 'Lumières'],
      dinner: ['Dîner au bord de la piscine', 'La table est dressée, l’eau juste à côté.', 'Dîner'],
      pool: ['La piscine éclairée', 'Un projecteur sous l’eau, contre le mur en pierre.', 'Piscine'],
    },
    'visit.eyebrow': '08 · Visite', 'visit.l1': 'Venez découvrir', 'visit.l2': '<em>la villa témoin.</em>',
    'visit.lead': 'Visites privées tous les jours, sur rendez-vous. La brochure contient chaque plan, chaque vue et chaque prix.',
    'visit.book': 'Réserver une visite privée', 'visit.brochure': 'Télécharger la brochure',
    'visit.fine': `Solaria est un programme fictif aux prix d’exemple, créé comme site de démonstration par <a href="https://masquo.com">Masquo</a>${NB}: des sites pour promoteurs immobiliers et architectes. Vidéos${NB}: Pexels. Matériaux en 3D temps réel. Adresse IP, lieu approximatif (pays, région, ville), opérateur, page visitée, provenance, navigateur et langue enregistrés 30 jours, pour la sécurité et les statistiques.`,
    'toast.book': `<b>Site de démonstration.</b> Solaria est un programme fictif${NB}: sur un vrai site, ce bouton réserve une visite dans l’agenda de l’équipe commerciale.`,
    'toast.brochure': '<b>Site de démonstration.</b> Sur un vrai site, la brochure PDF avec tous les plans se télécharge ici.',
    'next.to': `Suivant${NB}:`, 'next.again': 'Revenir au début ↺',
    dots: ['Solaria', 'Le site', 'Architecture', 'Intérieurs', 'Matériaux', 'Disponibilités', 'Votre villa', 'Le soir', 'Visite'],
  },
};
function pickLang() {
  const q = Q.get('lang');
  if (q === 'fr' || q === 'en') return q;
  try { const s = localStorage.getItem('solaria-lang'); if (s === 'fr' || s === 'en') return s; } catch (e) { /* blocked */ }
  return (navigator.languages || [navigator.language || 'en']).some((l) => /^fr/i.test(l)) ? 'fr' : 'en';
}
let LANG = pickLang();
const money = (v) => (LANG === 'fr' ? `${v.toLocaleString('fr-FR')}${NB}€` : `€${v.toLocaleString('en-US')}`);
const moneyShort = (v) => (LANG === 'fr' ? `${(v / 1e6).toFixed(2).replace('.', ',')}${NB}M€` : `€${(v / 1e6).toFixed(2)}M`);

/* ---------------- the 12 villas (fictional data), placed on the real aerial view (pixels of a 1920 x 1080 frame) ---------------- */
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const R = rng(2028);
const SPOTS = [[868, 590], [890, 652], [935, 730], [962, 862], [1018, 626], [1064, 690], [1104, 752], [1170, 836], [1234, 938], [736, 800], [714, 564], [528, 686]];
const STATUS = ['free', 'sold', 'free', 'hold', 'free', 'free', 'sold', 'hold', 'free', 'sold', 'hold', 'free'];
// three real villa types (3, 4 or 5 bedrooms): living space, terraces and pool come from the architect's plan itself
const VILLAS = STATUS.map((st, i) => {
  const beds = [3, 4, 4, 5][(i * 7) % 4];
  const st8 = stats(TYPES[beds]);
  const interior = st8.hab;
  const plot = 620 + Math.round(R() * 30) * 10;
  const pool = `${st8.pool[0]} × ${st8.pool[1]}`;
  const terr = st8.terr;
  const near = SPOTS[i][1] > 760 ? 1 : 0;                          // the villas closest to the sea cost more
  const price = Math.round((interior * 5600 + plot * 300 + near * 140000) / 10000) * 10000;
  return { i, n: String(i + 1).padStart(2, '0'), st, beds, interior, plot, pool, terr, price, px: SPOTS[i][0], py: SPOTS[i][1] };
});
const CLUB = [772, 688];
let SEL = 5;

/* ---------------- steps & layers ---------------- */
const STEPS = [
  { id: 'hero', film: 'hero' }, { id: 'place', film: 'place' }, { id: 'architecture', film: 'architecture' },
  { id: 'inside', film: 'inside' }, { id: 'materials', layer: 'mats' }, { id: 'choose', layer: 'mp' },
  { id: 'villa', layer: 'plan' }, { id: 'evening', film: 'evening' }, { id: 'visit', film: 'visit' },
];
const LAST = STEPS.length - 1;
const BEATS = STEPS.map((s) => $(`.beat[data-step="${s.id}"]`));
BEATS.forEach((b) => $$('.ln > span', b).forEach((ln, j) => ln.style.setProperty('--i', j)));
const NAV = { cur: -1, lockUntil: 0, needGap: false, lastWheel: 0, acc: 0, capTimer: 0, capAt: 0, busyUntil: 0 };
const films = $$('.film');
// each film sits in a frame (.fw, faded in) and a counter-frame (.fi, slight zoom): opacity and transforms only,
// done by the graphics card
films.forEach((v) => {
  const fw = document.createElement('div'), fi = document.createElement('div');
  fw.className = 'fw'; fi.className = 'fi';
  v.replaceWith(fw); fi.appendChild(v); fw.appendChild(fi);
  v.fw = fw; v.fi = fi;
});
const box = (el) => (el.fw || el);
const LAYERS = { mats: $('#mats'), mp: $('#mp'), plan: $('#plan') };
const portrait = () => innerHeight > innerWidth;
function ensureSrc(v) {
  if (v.dataset.loaded) return;
  const small = innerWidth < 760 || portrait();
  if (portrait() && v.dataset.posterM) v.poster = v.dataset.posterM;
  v.src = `${small && v.dataset.srcM ? v.dataset.srcM : v.dataset.src}?v=${VER}`; // version: never an old cached film
  v.dataset.loaded = '1';
}
function startFilm(v) {
  ensureSrc(v);
  try { v.currentTime = 0; } catch (e) { /* not ready yet */ }
  const p = v.play(); if (p && p.catch) p.catch(() => {});
}

/* ---------------- step change: a soft cross-fade with a slight zoom ----------------
   The next scene fades in over the previous one (opacity + transform only: done by the graphics card, 60 fps).
   When a layer (3D, map, plan) leaves for a film, the layer fades out above the film. */
const LV = { T: 0.95, run: null };
const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const sceneOf = (k) => (k < 0 ? null : STEPS[k].film ? films.find((f) => f.dataset.film === STEPS[k].film) : LAYERS[STEPS[k].layer]);
const isFilm = (el) => !!el && el.classList.contains('film');
function unclip(el) {
  el.style.opacity = '';
  el.style.transform = '';
  box(el).style.zIndex = '';
  if (el.fw) el.fw.style.opacity = el.fi.style.transform = '';
}
function hideScene(el) {
  el.classList.remove('is-on', 'is-drawn');
  unclip(el);
  if (isFilm(el)) el.pause();
}
function setFade(p) {
  const R = LV.run, el = R.fadeEl;
  if (el.fw) {
    el.fw.style.opacity = p.toFixed(3);
    el.fi.style.transform = `scale(${(1.035 - 0.035 * p).toFixed(4)})`;
  } else el.style.opacity = (R.fadeOut ? 1 - p : p).toFixed(3);
}
function switchScene(a, b, now) {
  endSwitch();
  const A = sceneOf(a), B = sceneOf(b);
  [...films, ...Object.values(LAYERS)].forEach((el) => { if (el !== A && el !== B) hideScene(el); });
  $('#matLabels').classList.remove('is-on');
  if (isFilm(B)) startFilm(B);
  if (isFilm(A)) A.pause(); // one film decoding at a time during the fade
  box(B).style.zIndex = isFilm(B) ? '2' : '3';
  if (A) box(A).style.zIndex = isFilm(A) ? '1' : '2';
  const fadeOut = !!A && !isFilm(A) && isFilm(B); // a film always sits under the layers: then the old layer fades out
  LV.run = { A, B, fadeOut, fadeEl: fadeOut ? A : B, t0: now };
  setFade(0);
  B.classList.add('is-on');
  if (REDUCED) endSwitch();
}
function endSwitch() {
  const R = LV.run;
  if (!R) return;
  LV.run = null;
  if (R.A) hideScene(R.A);
  unclip(R.B);
  R.B.classList.add('is-drawn'); // the architect's plan draws itself once the fade is over
  $('#matLabels').classList.toggle('is-on', R.B === LAYERS.mats);
}
function switchFrame(now) {
  const R = LV.run;
  if (!R) return;
  const t = now - R.t0;
  setFade(ease(clamp(t / LV.T)));
  if (t >= LV.T) endSwitch();
}
function preloadNext(i) {
  const s = STEPS[i + 1];
  if (s && s.film) { const v = films.find((f) => f.dataset.film === s.film); ensureSrc(v); v.preload = 'auto'; }
  if (i >= 1) Mats.build(); // the 3D marble is prepared while the visitor reads steps 2-3, never under the loader
}
// every caption must sit between the menu and the Next button: if it would overflow, it is scaled down to fit
function fitCaps() {
  const top = Math.max($('.nav__logo').getBoundingClientRect().bottom, $('.nav__right').getBoundingClientRect().bottom) + 12;
  const bottom = $('#next').getBoundingClientRect().top - 10;
  $$('.cap').forEach((cap) => {
    cap.style.setProperty('--fit', '1');
    // layout box (offsetTop/Height ignore the 18 px rise animation and the scale itself)
    const r = { top: cap.offsetTop, height: cap.offsetHeight, bottom: cap.offsetTop + cap.offsetHeight }, fromTop = getComputedStyle(cap).bottom === 'auto';
    const room = fromTop ? bottom - r.top : r.bottom - top;
    const k = r.height > room ? Math.max(0.62, room / r.height) : 1;
    cap.style.setProperty('--fit', k.toFixed(3));
    cap.style.setProperty('--fit-origin', fromTop ? 'left top' : 'left bottom');
  });
}
function showCaption(i) {
  if (i >= 0) { fitCaps(); NAV.busyUntil = performance.now() + 1900; } // le texte apparaît : rien de lourd pendant ce temps
  BEATS.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-hidden', String(k !== i)); });
}
function go(i, now = performance.now() / 1000) {
  i = clamp(i, 0, LAST);
  if (i === NAV.cur) return;
  const from = NAV.cur;
  NAV.cur = i;
  NAV.lockUntil = now + (REDUCED ? 0.5 : LV.T + 0.05);
  showCaption(-1);
  clearTimeout(NAV.capTimer);
  const s = STEPS[i];
  if (s.layer === 'mats') Mats.build();
  if (s.layer === 'mp') placePins();
  setPlanFull(false);
  if (s.layer === 'plan') { PLAN_FLOOR = 0; drawPlan(); fillVilla(); }
  if (s.layer !== 'mp') $('#tip').classList.remove('is-on');
  switchScene(from, i, now);
  updateDots();
  preloadNext(i);
  NAV.capAt = performance.now() + (REDUCED ? 0 : (LV.T - 0.25) * 1000) + 50;
  NAV.capTimer = setTimeout(() => showCaption(i), REDUCED ? 0 : (LV.T - 0.25) * 1000);
}
/* ---------------- films in chapters: the card follows the shot on screen ----------------
   interior tour (8 rooms of the same villa) and evening (3 night shots of the same villa). Start times match the encoded
   films: change them if a film is re-encoded. */
const CHAPS = {
  inside: { film: 'inside', key: 'tour', end: 42.79, list: [['entry', 0], ['living', 5.67], ['dining', 11.17], ['kitchen', 16.67], ['stairs', 22.33], ['suite', 27.83], ['terrace', 32.5], ['pool', 37.92]],
    ids: ['room', 'roomCount', 'roomName', 'roomLine', 'roomBar', 'roomChips'] },
  evening: { film: 'evening', key: 'eve', end: 18.09, list: [['lights', 0], ['dinner', 5.5], ['pool', 11.36]],
    ids: ['eveNow', 'eveCount', 'eveName', 'eveLine', 'eveBar', 'eveChips'] },
};
Object.values(CHAPS).forEach((c) => {
  c.v = films.find((f) => f.dataset.film === c.film);
  c.el = Object.fromEntries(['box', 'count', 'name', 'line', 'bar', 'chips'].map((k, j) => [k, $(`#${c.ids[j]}`)]));
  c.idx = -1;
});
function buildChap(c) {
  const D = T[LANG][c.key];
  c.el.chips.innerHTML = c.list.map(([k], j) => `<button type="button" data-chap="${j}">${D[k][2] || D[k][0]}</button>`).join('');
  $$('button', c.el.chips).forEach((b) => b.addEventListener('click', () => {
    try { c.v.currentTime = c.list[+b.dataset.chap][1] + 0.3; } catch (e) { /* not loaded yet */ }
    const p = c.v.play(); if (p && p.catch) p.catch(() => {});
    updateChap(c, true);
  }));
  updateChap(c, true);
}
function updateChap(c, force) {
  const t = c.v.currentTime || 0, k = c.list.reduce((a, [, st], j) => (t >= st + 0.25 ? j : a), 0);
  const st = c.list[k][1], end = k + 1 < c.list.length ? c.list[k + 1][1] + 0.25 : c.end;
  c.el.bar.style.transform = `scaleX(${clamp((t - st) / (end - st)).toFixed(3)})`;
  if (k === c.idx && !force) return;
  c.idx = k;
  const D = T[LANG][c.key], key = c.list[k][0], n = c.list.length;
  c.el.name.textContent = D[key][0];
  c.el.line.textContent = D[key][1];
  c.el.count.textContent = `${String(k + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
  $$('button', c.el.chips).forEach((b, j) => b.setAttribute('aria-pressed', String(j === k)));
  c.el.box.classList.remove('is-swap'); void c.el.box.offsetWidth; c.el.box.classList.add('is-swap');
}
const dotsEl = $('#dots'), nextLabel = $('#nextLabel');
function buildDots() {
  dotsEl.innerHTML = '';
  T[LANG].dots.forEach((label, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<span>${label}</span><i></i>`;
    b.addEventListener('click', () => go(k));
    dotsEl.appendChild(b);
  });
  updateDots();
}
function updateDots() {
  $$('button', dotsEl).forEach((b, k) => b.classList.toggle('is-on', k === NAV.cur));
  nextLabel.textContent = NAV.cur >= LAST ? T[LANG]['next.again'] : `${T[LANG]['next.to']} ${T[LANG].dots[Math.max(0, NAV.cur) + 1]}`;
}

/* ---------------- masterplan on the real aerial view ---------------- */
const mpImg = $('#mpImg'), pinsEl = $('#pins'), tipEl = $('#tip');
const IMG_W = 1920, IMG_H = 1080;
let MP = { s: 1, ox: 0, oy: 0 };
/* Automatic framing: the photo is zoomed and moved so that EVERY pin (with its label) sits in a free area of the
   screen: beside, above or below the text card, never under the menu, the step dots, the Next button or off-screen.
   The largest zoom that fits wins. If the photo then no longer covers the screen, a blurred copy fills the rest. */
function layoutMasterplan() {
  fitCaps();
  const W = innerWidth, H = innerHeight, m = 16;
  const P = $$('.mp-pin', pinsEl).map((el) => ({ el, x: +el.dataset.x, y: +el.dataset.y, w: el.offsetWidth, h: el.offsetHeight }));
  if (!P.length) return;
  const card = $('.beat[data-step="choose"] .card').getBoundingClientRect();
  const top = $('.nav').getBoundingClientRect().bottom + 4;
  const dots = $('#dots').getBoundingClientRect();
  const right = dots.width ? W - dots.left + 10 : 0;
  const bottom = H - $('#next').getBoundingClientRect().top + 6;
  const zones = [
    [card.right + m, top + m, W - right - m, H - bottom - m], // beside the card
    [m, top + m, W - right - m, card.top - m], // above it
    [m, card.bottom + m, W - right - m, H - bottom - m], // below it
  ];
  const sCover = Math.max(W / IMG_W, H / IMG_H);
  const fit = (z, s) => {
    let lx = -1e9, hx = 1e9, ly = -1e9, hy = 1e9;
    for (const q of P) {
      lx = Math.max(lx, z[0] + q.w / 2 - q.x * s); hx = Math.min(hx, z[2] - q.w / 2 - q.x * s);
      ly = Math.max(ly, z[1] + q.h * 1.3 - q.y * s); hy = Math.min(hy, z[3] - 6 - q.y * s);
    }
    return lx <= hx && ly <= hy ? [lx, hx, ly, hy] : null;
  };
  let best = null;
  for (const z of zones) {
    if (z[2] - z[0] < 140 || z[3] - z[1] < 120) continue;
    let lo = 0.08, hi = sCover * 1.3;
    if (!fit(z, lo)) continue;
    if (fit(z, hi)) lo = hi;
    else for (let k = 0; k < 22; k++) { const mid = (lo + hi) / 2; if (fit(z, mid)) lo = mid; else hi = mid; }
    if (!best || lo > best.s) best = { s: lo, f: fit(z, lo) };
  }
  if (!best) best = { s: sCover, f: [W / 2 - 1300 * sCover, W / 2 - 1300 * sCover, H / 2 - 750 * sCover, H / 2 - 750 * sCover] };
  const s = best.s, w = IMG_W * s, h = IMG_H * s;
  // inside the allowed range, prefer the position where the photo covers the most of the screen
  const pick = (lo, hi, clo, chi) => { const a = Math.max(lo, clo), b = Math.min(hi, chi); return a <= b ? clamp((lo + hi) / 2, a, b) : chi < lo ? lo : hi; };
  const ox = pick(best.f[0], best.f[1], W - w, 0), oy = pick(best.f[2], best.f[3], H - h, 0);
  MP = { s, ox, oy };
  Object.assign(mpImg.style, { width: `${w}px`, height: `${h}px`, left: `${ox}px`, top: `${oy}px` });
  $('#mp').classList.toggle('is-framed', ox > 0.5 || oy > 0.5 || ox + w < W - 0.5 || oy + h < H - 0.5);
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  P.forEach((q) => {
    const x = ox + q.x * s, y = oy + q.y * s;
    q.el.style.left = `${x}px`;
    q.el.style.top = `${y}px`;
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  });
  // the slow zoom grows around the villas, so they barely move
  $('#mpIn').style.transformOrigin = `${(x0 + x1) / 2}px ${(y0 + y1) / 2}px`;
}
function buildPins() {
  const D = T[LANG];
  pinsEl.innerHTML = VILLAS.map((v, k) => `<button type="button" class="mp-pin ${v.st}" style="--k:${k}" data-i="${v.i}" data-x="${v.px}" data-y="${v.py}" aria-label="${D.villa} ${v.n}"><i></i>${v.n}</button>`).join('')
    + `<span class="mp-pin club" style="--k:12" data-x="${CLUB[0]}" data-y="${CLUB[1]}"><i></i>${innerWidth < 600 ? D['club.short'] : D.club}</span>`;
  $$('.mp-pin[data-i]', pinsEl).forEach((el) => {
    const v = VILLAS[+el.dataset.i];
    el.addEventListener('mouseenter', () => showTip(v, el));
    el.addEventListener('focus', () => showTip(v, el));
    el.addEventListener('mouseleave', () => tipEl.classList.remove('is-on'));
    el.addEventListener('blur', () => tipEl.classList.remove('is-on'));
    el.addEventListener('click', () => { SEL = v.i; go(6); });
  });
  layoutMasterplan();
}
function placePins() { layoutMasterplan(); }
function showTip(v, el) {
  const D = T[LANG];
  tipEl.innerHTML = `<h3>${D.villa} ${v.n}</h3><p>${v.beds} ${D.beds} · ${v.interior}${NB}m² · ${D[`badge.${v.st}`]}</p><strong>${v.st === 'sold' ? D['badge.sold'] : money(v.price)}</strong>`;
  const r = el.getBoundingClientRect();
  const left = r.right + 260 > innerWidth ? r.left - 250 : r.right;
  tipEl.style.left = `${Math.max(8, left)}px`;
  tipEl.style.top = `${r.top + r.height / 2}px`;
  tipEl.classList.add('is-on');
}

/* ---------------- architect's plan (drawn live) ---------------- */
// the plan takes the largest free area of the screen: beside the villa card (computer) or above it (phone)
function layoutPlan() {
  fitCaps();
  const svg = $('#planSvg svg');
  if (!svg) return;
  const vb = svg.viewBox.baseVal, ratio = vb.width / vb.height;
  const W = innerWidth, H = innerHeight, m = 14;
  const card = $('.beat[data-step="villa"] .card').getBoundingClientRect();
  const top = Math.max($('.nav__logo').getBoundingClientRect().bottom, $('.nav__right').getBoundingClientRect().bottom) + 8;
  const dots = $('#dots').getBoundingClientRect();
  const right = dots.width ? W - dots.left + 10 : 0;
  const bottom = $('#next').getBoundingClientRect().top - 8;
  const zones = PLAN_FULL ? [[m, top, W - m, bottom - 46]]
    : [[card.right + 28, top, W - right - m, bottom], [m, top, W - m, card.top - 10]];
  let best = null;
  zones.forEach((z) => {
    const w = z[2] - z[0], h = z[3] - z[1];
    if (w < 120 || h < 100) return;
    const k = Math.min(w / ratio, h); // drawing height that fits
    if (!best || k > best.k) best = { k, z };
  });
  if (!best) return;
  const h = best.k, w = h * ratio, z = best.z;
  Object.assign($('#planBox').style, { left: `${z[0] + (z[2] - z[0] - w) / 2}px`, top: `${z[1] + (z[3] - z[1] - h) / 2}px`, width: `${w}px`, height: `${h}px` });
}
// full-screen plan (button 'Enlarge the plan'): the villa card steps aside, floor switch + close in the bar
let PLAN_FULL = false;
function setPlanFull(on) {
  if (on === PLAN_FULL) return;
  PLAN_FULL = on;
  document.body.classList.toggle('plan-full', on);
  $('#planZoom').textContent = T[LANG][on ? 'plan.close' : 'plan.zoom'];
  $('#planZoom').setAttribute('aria-expanded', String(on));
  if ($('#planSvg svg')) layoutPlan();
}
// architect's plan of the selected villa: ground floor or upper floor (tabs), drawn by plans.js
let PLAN_FLOOR = 0;
function drawPlan() {
  const v = VILLAS[SEL], N = NAMES[LANG];
  const plan = $('#plan');
  $$('#planTabs button, #planBar [data-floor]').forEach((b) => { const k = +b.dataset.floor; b.textContent = N.floors[k]; b.setAttribute('aria-pressed', String(k === PLAN_FLOOR)); });
  $('#planZoom').textContent = T[LANG][PLAN_FULL ? 'plan.close' : 'plan.zoom'];
  plan.classList.remove('is-drawn');
  $('#planSvg').innerHTML = planSvg(TYPES[v.beds], PLAN_FLOOR, LANG);
  layoutPlan();
  void plan.offsetWidth; // restart the drawing animation
  if (plan.classList.contains('is-on') && !(LV.run && LV.run.B === plan)) requestAnimationFrame(() => plan.classList.add('is-drawn'));
}
function fillVilla() {
  const v = VILLAS[SEL], D = T[LANG];
  $('#vEyebrow').textContent = `06 · ${D.villa} ${v.n}`;
  $('#vTitle').textContent = `${D.villa} ${v.n}`;
  $('#vSub').textContent = `${v.beds} ${D.beds}`;
  const m2 = (x) => `${x}${NB}m²`;
  $('#vSpecs').innerHTML = [[D['sp.int'], m2(v.interior)], [D['sp.plot'], m2(v.plot)], [D['sp.pool'], `${v.pool}${NB}m`], [D['sp.terr'], m2(v.terr)]]
    .map(([a, b]) => `<li class="sp"><small>${a}</small><b>${b}</b></li>`).join('');
  $('#vPrice').textContent = money(v.price);
  const badge = $('#vStatus');
  badge.textContent = D[`badge.${v.st}`];
  badge.className = `badge ${v.st}`;
}

/* ---------------- noble materials in realistic real-time 3D ---------------- */
// waits for a quiet moment (no fade running, browser idle) before each heavy, blocking step
const calm = () => new Promise((res) => {
  const busy = () => LV.run || performance.now() < (NAV.busyUntil || 0) || performance.now() < NAV.capAt; // fondu ou texte en mouvement
  const f = () => (busy() ? setTimeout(f, 150) : window.requestIdleCallback ? requestIdleCallback(() => (busy() ? f() : res()), { timeout: 700 }) : setTimeout(res, 60));
  f();
});
const Mats = {
  started: false, ready: false, labels: [], done: null,
  build() {
    if (this.started) return this.done;
    this.started = true;
    this.done = buildMats().catch((e) => console.error('materials 3D failed', e));
    return this.done;
  },
};
let renderer, scene, camera, composer;
async function buildMats() {
  await calm(); // jamais pendant un fondu : la création du rendu 3D bloque la page un instant
  const canvas = LAYERS.mats;
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, COARSE ? 1.5 : 1.6));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c0907);
  camera = new THREE.PerspectiveCamera(portrait() ? 46 : 30, innerWidth / innerHeight, 0.1, 100);
  await calm();
  const pm = new THREE.PMREMGenerator(renderer);
  const hdrData = await fetch('media/sky_sunset_2k.hdr').then((r) => r.arrayBuffer()); // téléchargement sans bloquer
  await calm(); // le décodage du ciel (~0,3 s) attend un moment calme
  const hdr = new RGBELoader().parse(hdrData);
  const hdrTex = new THREE.DataTexture(hdr.data, hdr.width, hdr.height, THREE.RGBAFormat, hdr.type);
  hdrTex.colorSpace = THREE.LinearSRGBColorSpace;
  hdrTex.minFilter = hdrTex.magFilter = THREE.LinearFilter;
  hdrTex.generateMipmaps = false;
  hdrTex.flipY = true;
  hdrTex.needsUpdate = true;
  hdrTex.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = pm.fromEquirectangular(hdrTex).texture;
  scene.environmentIntensity = 1.1;
  pm.dispose();
  hdrTex.dispose();
  const tl = new THREE.TextureLoader();
  const tex = async (name, rep, srgb) => {
    const t = await tl.loadAsync(`media/tex/${name}.jpg`);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep[0], rep[1]);
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const set = async (n, rep) => ({ map: await tex(`${n}_diff`, rep, true), normalMap: await tex(`${n}_nor`, rep), roughnessMap: await tex(`${n}_rough`, rep) });
  const [mar, sto, woo, pla] = await Promise.all([set('marble', [1.2, 0.8]), set('stone', [0.6, 0.8]), set('wood', [0.25, 1.4]), set('plaster', [0.9, 1.2])]);
  const M = {
    marble: new THREE.MeshPhysicalMaterial({ ...mar, color: 0xffffff, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06 }),
    trav: new THREE.MeshStandardMaterial({ ...sto, color: 0xeadcc4, roughness: 0.8 }),
    oak: new THREE.MeshStandardMaterial({ ...woo, color: 0xd6a170, roughness: 0.6 }),
    plaster: new THREE.MeshStandardMaterial({ ...pla, color: 0xf1e9dd, roughness: 0.95, normalScale: new THREE.Vector2(0.6, 0.6) }),
    brass: new THREE.MeshPhysicalMaterial({ color: 0xd4a85a, metalness: 1, roughness: 0.28, clearcoat: 0.3 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.02, transmission: 1, thickness: 0.6, ior: 1.5, attenuationColor: new THREE.Color(0xd8f5ef), attenuationDistance: 2.5 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x15100c, roughness: 0.85 }),
  };
  const add = (geo, mat, p, r = [0, 0, 0]) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...p);
    m.rotation.set(...r);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    return m;
  };
  add(new THREE.CircleGeometry(80, 96).rotateX(-Math.PI / 2), M.floor, [0, 0, 0]);
  scene.fog = new THREE.Fog(0x0c0907, 9, 22);
  add(new THREE.BoxGeometry(2.6, 0.14, 1.7), M.marble, [0, 0.07, 0.15], [0, 0.22, 0]);
  add(new THREE.BoxGeometry(0.95, 1.35, 0.62), M.trav, [-1.75, 0.675, -0.55], [0, 0.35, 0]);
  add(new THREE.BoxGeometry(1.7, 2.3, 0.07), M.plaster, [0.35, 1.15, -1.25], [0, -0.18, 0]);
  add(new THREE.BoxGeometry(0.36, 2.05, 0.06), M.oak, [1.55, 1.0, -0.92], [0.12, -0.5, -0.1]);
  add(new THREE.CylinderGeometry(0.045, 0.045, 1.5, 32), M.brass, [0.1, 0.2, 0.55], [0, 0.22, Math.PI / 2]);
  add(new THREE.SphereGeometry(0.2, 48, 32), M.brass, [-0.75, 0.34, 0.25]);
  add(new THREE.BoxGeometry(0.5, 0.5, 0.5), M.glass, [1.05, 0.39, 0.35], [0, 0.6, 0]);
  const key = new THREE.DirectionalLight(0xffc89a, 2.6);
  key.position.set(-4, 6, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 6;
  key.shadow.bias = -0.0004;
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff8a5c, 1.4);
  rim.position.set(5, 3, -4);
  scene.add(rim);
  Mats.labels = [['m.marble', [0.4, 0.2, 0.7]], ['m.trav', [-1.75, 1.4, -0.4]], ['m.plaster', [0.2, 2.35, -1.3]], ['m.oak', [1.75, 1.6, -0.9]], ['m.brass', [-0.75, 0.6, 0.3]], ['m.glass', [1.15, 0.75, 0.4]]];
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.22, 0.5, 0.95));
  composer.addPass(new OutputPass());
  // compile every shader and upload every texture now, while the visitor reads another step,
  // so the first frame of the materials step does not freeze the fade
  await calm();
  try { await renderer.compileAsync(scene, camera); } catch (e) { /* older browsers: compiled on first render */ }
  for (const m of Object.values(M)) {
    for (const t of [m.map, m.normalMap, m.roughnessMap]) if (t) { await calm(); renderer.initTexture(t); }
  }
  await calm();
  renderMats(performance.now() / 1000, 1 / 60);
  Mats.ready = true;
  buildMatLabels();
}
function buildMatLabels() {
  const D = T[LANG];
  $('#matLabels').innerHTML = Mats.labels.map(([k]) => `<div class="mat"><b>${D[k][0]}</b>${D[k][1]}</div>`).join('');
}
const pv = new THREE.Vector3();
function renderMats(now, dt) {
  const a = -0.55 + Math.sin(now * 0.12) * 0.28;
  const dist = portrait() ? 9.5 : 7.6;
  camera.position.set(Math.sin(a) * dist + (portrait() ? 0 : -1.2), portrait() ? 4.2 : 3.1, Math.cos(a) * dist);
  camera.lookAt(portrait() ? 0 : -0.9, portrait() ? 1.4 : 0.9, -0.3);
  composer.render(dt);
  $$('.mat', $('#matLabels')).forEach((el, k) => {
    pv.set(...Mats.labels[k][1]).project(camera);
    el.style.transform = `translate(${((pv.x * 0.5 + 0.5) * innerWidth).toFixed(1)}px, ${((-pv.y * 0.5 + 0.5) * innerHeight).toFixed(1)}px) translate(-10%, -50%)`;
  });
}
let lastT = 0;
function loop(ms) {
  requestAnimationFrame(loop);
  const now = ms / 1000, dt = lastT ? Math.min(0.05, now - lastT) : 1 / 60;
  lastT = now;
  // the 3D keeps its last image while it fades out (one heavy renderer at a time)
  if (Mats.ready && LAYERS.mats.classList.contains('is-on') && !(LV.run && LV.run.A === LAYERS.mats)) renderMats(now, dt);
  switchFrame(now);
  const chap = STEPS[NAV.cur] && CHAPS[STEPS[NAV.cur].id];
  if (chap) updateChap(chap);
}

/* ---------------- language ---------------- */
function applyLang(lang, save) {
  LANG = lang;
  const D = T[lang];
  document.documentElement.lang = lang;
  document.title = D.title;
  $$('[data-t]').forEach((el) => { const v = D[el.dataset.t]; if (v != null && typeof v === 'string') el.innerHTML = v; });
  $$('[data-ta]').forEach((el) => { const v = D[el.dataset.ta]; if (v != null) el.setAttribute('aria-label', v); });
  if (COARSE) $('[data-t="choose.lead"]').innerHTML = D['choose.lead.touch']; // no hover with a finger
  $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $('#fromPrice').textContent = `${D.from} ${moneyShort(Math.min(...VILLAS.map((v) => v.price)))}`;
  $('#nFree').textContent = VILLAS.filter((v) => v.st === 'free').length;
  $('#nHold').textContent = VILLAS.filter((v) => v.st === 'hold').length;
  $('#nSold').textContent = VILLAS.filter((v) => v.st === 'sold').length;
  buildDots();
  Object.values(CHAPS).forEach(buildChap);
  buildPins();
  fillVilla();
  if (Mats.ready) buildMatLabels();
  if (STEPS[NAV.cur] && STEPS[NAV.cur].layer === 'plan') drawPlan();
  if (save) { try { localStorage.setItem('solaria-lang', lang); } catch (e) { /* blocked */ } }
}
const toast = $('#toast');
let toastT = 0;
function showToast(html) { toast.innerHTML = html; toast.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 5200); }

/* ---------------- input ---------------- */
function bindUI() {
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang, true)));
  $$('[data-go]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); go(+b.dataset.go); }));
  $$('[data-book]').forEach((b) => b.addEventListener('click', () => showToast(T[LANG]['toast.book'])));
  $$('#planTabs button, #planBar [data-floor]').forEach((b) => b.addEventListener('click', () => { PLAN_FLOOR = +b.dataset.floor; drawPlan(); }));
  $('#planZoom').addEventListener('click', () => setPlanFull(!PLAN_FULL));
  $$('[data-brochure]').forEach((b) => b.addEventListener('click', () => showToast(T[LANG]['toast.brochure'])));
  $('#next').addEventListener('click', () => go(NAV.cur >= LAST ? 0 : NAV.cur + 1));
  addEventListener('wheel', (e) => {
    e.preventDefault();
    const now = performance.now() / 1000, quiet = now - NAV.lastWheel;
    NAV.lastWheel = now;
    if (now < NAV.lockUntil) { NAV.needGap = true; NAV.acc = 0; return; }
    if (NAV.needGap && quiet < 0.2) return;
    NAV.needGap = false;
    NAV.acc += e.deltaY;
    if (Math.abs(NAV.acc) > 24) { go(NAV.cur + (NAV.acc > 0 ? 1 : -1), now); NAV.acc = 0; NAV.needGap = true; }
  }, { passive: false });
  let ty = null, tx = null;
  addEventListener('touchstart', (e) => { ty = e.touches[0].clientY; tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', (e) => {
    if (ty === null) return;
    const dy = ty - e.changedTouches[0].clientY, dx = tx - e.changedTouches[0].clientX;
    ty = null;
    if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx) && !e.target.closest('a, button')) go(NAV.cur + (dy > 0 ? 1 : -1));
  }, { passive: true });
  addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'Escape' && PLAN_FULL) { setPlanFull(false); return; }
    if (['ArrowDown', 'PageDown', ' ', 'ArrowRight'].includes(k)) { e.preventDefault(); go(NAV.cur + 1); }
    else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(k)) { e.preventDefault(); go(NAV.cur - 1); }
  });
  let rt = 0;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      layoutMasterplan();
      layoutPlan();
      if (!Mats.ready) return;
      renderer.setSize(innerWidth, innerHeight, false);
      composer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.fov = portrait() ? 46 : 30;
      camera.updateProjectionMatrix();
    }, 150);
  });
}

/* ---------------- start ---------------- */
async function start() {
  const bar = $('#loadBar');
  applyLang(LANG, false);
  bindUI();
  bar.style.width = '25%';
  const hero = films[0];
  ensureSrc(hero);
  // the site opens as soon as the home film can play (at most 2.5 s); nothing heavy is prepared here
  await Promise.race([new Promise((r) => hero.addEventListener('canplay', r, { once: true })), new Promise((r) => setTimeout(r, 2500))]);
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]); } catch (e) { /* optional */ }
  bar.style.width = '100%';
  await new Promise((r) => setTimeout(r, 150));
  document.body.classList.remove('is-loading');
  go(0);
  requestAnimationFrame(loop);
}
start();
