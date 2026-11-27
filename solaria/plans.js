/*
  Solaria · architect's floor plans of the three villa types (fictional program, demo website by Masquo).
  Everything is in metres, on a grid of wall centre lines. Walls are the gaps between rooms: 0.15 m inside,
  0.30 m outside. Doors have their leaf and swing, windows their glass lines, the staircase sits at the same place
  on both floors. Areas are computed from the drawing, so the figures shown on the villa card always match it.
*/
const NBSP = ' ';
const D = 10; // depth of every villa (back = street side, y = 0; front = sea side, y = 10)

/* ---------------- the three types ---------------- */
function build(W, beds) {
  const L = beds >= 4 ? 12 : 10; // pool length
  const sej = W === 14 ? 14 : W === 17 ? 12.6 : 13;
  /* ground floor */
  const g = {
    rooms: [
      { k: 'kitchen', r: [0, 0, 4.8, 4.4], lbl: [2.0, 1.55] },
      { k: 'laundry', r: [4.8, 0, 6.6, 2.4], small: true, lbl: [5.7, 1.45] },
      { k: 'wc', r: [4.8, 2.4, 6.6, 4.4], small: true, lbl: [5.95, 3.15] },
      { k: 'entry', r: [6.6, 0, 9.6, 4.4], lbl: [8.4, 2.6] },
      { k: 'stairs', r: [9.6, 0, 11, 4.4], stairs: 1, small: true, noArea: true },
      { k: 'living', r: [0, 4.4, sej, 10], lbl: [6.0, 8.9] },
    ],
    doors: [
      { o: 'h', at: 0, a: 7.6, w: 1.0, s: 1, h: 0, main: 1 },
      { o: 'h', at: 4.4, a: 7.2, w: 1.8, open: 1 },
      { o: 'h', at: 4.4, a: 1.0, w: 2.6, open: 1 },
      { o: 'v', at: 4.8, a: 0.9, w: 0.8, s: 1, h: 0 },
      { o: 'v', at: 6.6, a: 3.25, w: 0.8, s: -1, h: 0 },
      { o: 'v', at: 9.6, a: 0.15, w: 1.15, open: 1 },
    ],
    wins: [
      { s: 'N', a: 1.2, b: 3.6 }, { s: 'N', a: 5.2, b: 6.2 }, { s: 'W', a: 1.4, b: 3.0 }, { s: 'W', a: 6.0, b: 8.6 },
      { s: 'S', a: 0.8, b: sej - 0.8, bay: 1 },
    ],
    furn: [
      ['rect', 0.15, 0.15, 4.65, 0.77], ['rect', 0.15, 0.77, 0.77, 3.4], ['rect', 1.7, 2.3, 3.9, 3.2], ['sink', 2.0, 0.27, 0.9, 0.42],
      ['hob', 2.8, 2.75], ['fridge', 0.15, 3.45, 0.77, 4.25],
      ['washer', 4.95, 0.22], ['washer', 5.62, 0.22], ['toilet', 4.875, 2.75, 'E'], ['rect', 6.675, 0.4, 7.25, 2.9, 'shelf'],
      ['sofa', 1.2, 5.9, 4.6, 6.75, 'N'], ['sofa', 1.2, 6.75, 2.05, 8.2, 'W'], ['rect', 2.45, 7.05, 3.95, 7.85, 'r'],
      ['table', 7.4, 6.7, 10.2, 7.7, 3],
    ],
    out: { terrace: [0, 10.15, W, 13.75], pool: [(W - L) / 2, 13.95, (W + L) / 2, 17.95] },
  };
  /* upper floor */
  const u = {
    rooms: [
      { k: 'mbath', r: [0, 0, 3.2, 3.4], lbl: [1.15, 2.35] },
      { k: 'dressing', r: [3.2, 0, 5.2, 3.4], small: true, lbl: [4.2, 3.0] },
      { k: 'master', r: [0, 3.4, 5.2, 10], lbl: [3.65, 6.3] },
      { k: 'bath', r: [5.2, 0, 7.6, 4.4], lbl: [6.1, 2.55] },
      { k: 'linen', r: [7.6, 0, 9.6, 4.4], small: true, lbl: [8.4, 2.4] },
      { k: 'stairs', r: [9.6, 0, 11, 4.4], stairs: -1, small: true, noArea: true, hab: false },
      { k: 'hall', r: [5.2, 4.4, W, 5.6], small: true, lbl: [W === 14 ? 12.6 : 8.4, 5.12], one: true },
    ],
    doors: [
      { o: 'h', at: 4.4, a: 9.7, w: 1.2, open: 1 },
      { o: 'v', at: 5.2, a: 4.55, w: 0.9, s: -1, h: 0 },
      { o: 'h', at: 3.4, a: 2.2, w: 0.8, s: -1, h: 1 },
      { o: 'h', at: 3.4, a: 3.7, w: 1.0, open: 1 },
      { o: 'h', at: 4.4, a: 5.8, w: 0.8, s: -1, h: 0 },
      { o: 'h', at: 4.4, a: 8.2, w: 0.8, s: -1, h: 0 },
    ],
    wins: [
      { s: 'N', a: 0.8, b: 2.4 }, { s: 'N', a: 5.8, b: 7.0 }, { s: 'N', a: 8.2, b: 9.0 }, { s: 'W', a: 8.0, b: 9.4 },
      { s: 'S', a: 0.6, b: 4.6, bay: 1 },
    ],
    furn: [
      ['bath', 0.15, 0.15, 1.85, 0.9], ['shower', 2.05, 0.15, 3.125, 1.3], ['vanity', 0.15, 1.35, 0.7, 2.95, 2], ['toilet', 3.125, 1.6, 'W'],
      ['rect', 3.275, 0.15, 3.775, 2.9, 'shelf'], ['rect', 4.625, 0.15, 5.125, 2.9, 'shelf'],
      ['bed', 0.15, 5.3, 2.25, 7.1, 'W'], ['chair', 3.4, 8.4], ['chair', 4.25, 8.4],
      ['shower', 6.3, 0.15, 7.525, 1.35], ['vanity', 6.97, 1.7, 7.525, 2.9, 1], ['toilet', 5.275, 0.6, 'E'],
      ['washer', 7.75, 0.25], ['washer', 8.42, 0.25], ['rect', 9.025, 1.2, 9.525, 3.6, 'shelf'],
    ],
    out: { balcony: [0, 10.15, W, 11.5] },
  };
  /* type-specific right-hand part */
  const bedrooms = [];
  if (W === 14) {
    g.rooms.push({ k: 'office', r: [11, 0, 14, 4.4], lbl: [12.0, 2.55] });
    g.doors.push({ o: 'h', at: 4.4, a: 12.0, w: 0.9, s: -1, h: 0 });
    g.wins.push({ s: 'N', a: 11.8, b: 13.2 }, { s: 'E', a: 1.4, b: 3.0 }, { s: 'E', a: 6.0, b: 8.6 });
    g.furn.push(['rect', 11.5, 0.3, 13.5, 1.0, 'r'], ['chair', 12.15, 1.15], ['rect', 13.45, 1.4, 13.85, 4.0, 'shelf'],
      ['chair', 11.7, 6.1], ['chair', 12.9, 6.1], ['round', 12.65, 7.15, 0.35]);
    u.rooms.push({ k: 'bath', r: [11, 0, 14, 4.4], lbl: [12.0, 2.85] });
    u.doors.push({ o: 'h', at: 4.4, a: 11.5, w: 0.8, s: -1, h: 0 });
    u.wins.push({ s: 'N', a: 11.8, b: 13.2 });
    u.furn.push(['bath', 11.075, 0.15, 12.775, 0.9], ['shower', 12.75, 0.15, 13.85, 1.35], ['vanity', 13.3, 1.7, 13.85, 2.9, 1], ['toilet', 11.075, 1.4, 'E']);
    bedrooms.push([5.2, 9.6], [9.6, 14]);
  } else {
    const tv = W === 17 ? 12.6 : 13;
    g.rooms.push({ k: 'guest', r: [11, 0, 14.6, 4.4], lbl: [12.75, 3.45] }, { k: 'guestBath', r: [14.6, 0, 17, 4.4], lbl: [15.5, 2.55] },
      { k: 'tv', r: [tv, 4.4, W, 10], lbl: [W === 20 ? 14.9 : (tv + W) / 2 - 0.4, 9.1] });
    g.doors.push({ o: 'h', at: 4.4, a: 11.3, w: 0.9, s: -1, h: 0 }, { o: 'v', at: 14.6, a: 2.9, w: 0.8, s: 1, h: 1 }, { o: 'v', at: tv, a: 5.0, w: 0.9, s: 1, h: 0 });
    g.wins.push({ s: 'N', a: 11.8, b: 13.8 }, { s: 'N', a: 15.4, b: 16.3 }, { s: 'E', a: 6.0, b: 8.6 }, { s: 'S', a: tv + 0.6, b: W - 0.8, bay: 1 });
    g.furn.push(['bed', 11.075, 1.2, 13.175, 2.8, 'W'], ['rect', 13.9, 0.3, 14.525, 2.6, 'shelf'],
      ['shower', 15.7, 0.15, 16.925, 1.35], ['vanity', 16.37, 1.7, 16.925, 2.9, 1], ['toilet', 16.925, 3.2, 'W'],
      ['rect', W - 0.4, 6.2, W - 0.075, 7.9, 'r'], ['sofa', W - 3.6, 5.9, W - 2.7, 8.2, 'W'], ['rect', W - 2.4, 6.6, W - 1.6, 7.5, 'r']);
    if (W === 17) {
      u.rooms.push({ k: 'bath', r: [11, 0, 13.6, 4.4], lbl: [11.95, 2.6] }, { k: 'office', r: [13.6, 0, 17, 4.4], lbl: [15.3, 2.75] });
      u.doors.push({ o: 'h', at: 4.4, a: 11.5, w: 0.8, s: -1, h: 0 }, { o: 'h', at: 4.4, a: 14.2, w: 0.8, s: -1, h: 0 });
      u.wins.push({ s: 'N', a: 11.6, b: 13.0 }, { s: 'N', a: 14.4, b: 16.2 }, { s: 'E', a: 1.4, b: 3.0 });
      u.furn.push(['shower', 12.4, 0.15, 13.525, 1.35], ['vanity', 12.97, 1.7, 13.525, 2.9, 1], ['toilet', 11.075, 0.6, 'E'],
        ['rect', 14.3, 0.3, 16.3, 1.0, 'r'], ['chair', 14.95, 1.15], ['rect', 16.5, 1.4, 16.85, 4.0, 'shelf']);
      bedrooms.push([5.2, 11], [11, 17]);
    } else {
      g.rooms.push({ k: 'office', r: [17, 0, 20, 4.4], lbl: [18.4, 2.55] });
      g.doors.push({ o: 'h', at: 4.4, a: 18.0, w: 0.9, s: -1, h: 0 });
      g.wins.push({ s: 'N', a: 17.8, b: 19.2 }, { s: 'E', a: 1.4, b: 3.0 });
      g.furn.push(['rect', 17.5, 0.3, 19.5, 1.0, 'r'], ['chair', 18.15, 1.15], ['rect', 19.45, 1.4, 19.85, 4.0, 'shelf'],
        ['sofa', 16.6, 8.5, 19.0, 9.35, 'S']);
      u.rooms.push({ k: 'bath', r: [11, 0, 13.6, 4.4], lbl: [11.95, 2.6] }, { k: 'bath', r: [13.6, 0, 16.2, 4.4], lbl: [14.55, 2.6] },
        { k: 'office', r: [16.2, 0, 20, 4.4], lbl: [18.1, 2.75] });
      u.doors.push({ o: 'h', at: 4.4, a: 11.5, w: 0.8, s: -1, h: 0 }, { o: 'h', at: 4.4, a: 14.1, w: 0.8, s: -1, h: 0 },
        { o: 'h', at: 4.4, a: 16.8, w: 0.8, s: -1, h: 0 });
      u.wins.push({ s: 'N', a: 11.6, b: 13.0 }, { s: 'N', a: 14.2, b: 15.6 }, { s: 'N', a: 17.2, b: 19.2 }, { s: 'E', a: 1.4, b: 3.0 });
      u.furn.push(['shower', 12.4, 0.15, 13.525, 1.35], ['vanity', 12.97, 1.7, 13.525, 2.9, 1], ['toilet', 11.075, 0.6, 'E'],
        ['shower', 15.0, 0.15, 16.125, 1.35], ['vanity', 15.57, 1.7, 16.125, 2.9, 1], ['toilet', 13.675, 0.6, 'E'],
        ['rect', 17.1, 0.3, 19.1, 1.0, 'r'], ['chair', 17.75, 1.15], ['rect', 19.5, 1.4, 19.85, 4.0, 'shelf']);
      bedrooms.push([5.2, 10.2], [10.2, 15.2], [15.2, 20]);
    }
  }
  /* front bedrooms of the upper floor, numbered after the master suite */
  bedrooms.forEach(([x0, x1], j) => {
    const n = j + 2, cx = (x0 + 1.35 + x1 - (x1 === W ? 0.15 : 0.075)) / 2;
    u.rooms.push({ k: 'bed', n, r: [x0, 5.6, x1, 10], lbl: [cx, 8.75] });
    u.doors.push({ o: 'h', at: 5.6, a: x0 + 0.3, w: 0.9, s: 1, h: 0 });
    u.wins.push({ s: 'S', a: x0 + 0.6, b: x1 - 0.6, bay: 1 });
    u.furn.push(['bed', cx - 0.8, 5.675, cx + 0.8, 7.675, 'N'], ['rect', x0 + 0.075, 6.8, x0 + 0.675, 9.2, 'shelf']);
  });
  u.wins.push({ s: 'E', a: 6.6, b: 8.6 });
  return { W, beds, pool: [L, 4], floors: [g, u] };
}
export const TYPES = { 3: build(14, 3), 4: build(17, 4), 5: build(20, 5) };

/* ---------------- geometry & figures ---------------- */
// interior (finished) rectangle of a room: half an inside wall (0.075) or half an outside wall (0.15) on each side
function inner(r, W) {
  const [x0, y0, x1, y1] = r;
  return [x0 + (x0 === 0 ? 0.15 : 0.075), y0 + (y0 === 0 ? 0.15 : 0.075), x1 - (x1 === W ? 0.15 : 0.075), y1 - (y1 === D ? 0.15 : 0.075)];
}
const area = (q) => (q[2] - q[0]) * (q[3] - q[1]);
export function stats(t) {
  let hab = 0;
  t.floors.forEach((f) => f.rooms.forEach((rm) => { if (rm.hab !== false) hab += area(inner(rm.r, t.W)); }));
  const ter = t.floors[0].out.terrace, bal = t.floors[1].out.balcony;
  const pool = t.floors[0].out.pool;
  const terr = area(ter) - 0 + area(bal);
  return { hab: Math.round(hab), terr: Math.round(terr), pool: t.pool, beds: t.beds, poolArea: area(pool) };
}

/* ---------------- words ---------------- */
export const NAMES = {
  en: {
    kitchen: 'Kitchen', laundry: 'Utility', wc: 'WC', entry: 'Entrance', stairs: 'Stairs', living: 'Living\n& dining', office: 'Study',
    guest: 'Guest\nbedroom', guestBath: 'Shower\nroom', tv: 'TV lounge', mbath: 'Master\nbathroom', dressing: 'Walk-in', master: 'Master\nbedroom',
    bath: 'Bathroom', linen: 'Linen', hall: 'Landing', bed: 'Bedroom {n}', terrace: 'Terrace', balcony: 'Balcony', pool: 'Infinity pool',
    up: 'up', floors: ['Ground floor', 'Upper floor'], scale: 'scale', front: 'Front door', sea: 'Sea view',
  },
  fr: {
    kitchen: 'Cuisine', laundry: 'Cellier', wc: 'WC', entry: 'Entrée', stairs: 'Escalier', living: 'Séjour\nsalle à manger', office: 'Bureau',
    guest: 'Chambre\nd’amis', guestBath: 'Salle\nd’eau', tv: 'Salle TV', mbath: 'Salle\nde bains', dressing: 'Dressing', master: 'Suite\nparentale',
    bath: 'Salle\nd’eau', linen: 'Lingerie', hall: 'Dégagement', bed: 'Chambre {n}', terrace: 'Terrasse', balcony: 'Balcon', pool: 'Piscine à débordement',
    up: 'monte', floors: ['Rez-de-chaussée', 'Étage'], scale: 'échelle', front: 'Entrée principale', sea: 'Vue mer',
  },
};

/* ---------------- drawing ---------------- */
const f2 = (v) => +v.toFixed(3);
const fmt = (v, lang) => (lang === 'fr' ? v.toFixed(1).replace('.', ',') : v.toFixed(1));
const dimTxt = (v, lang) => `${v.toFixed(2).replace('.', lang === 'fr' ? ',' : '.')}${NBSP}m`;
const lineP = (x1, y1, x2, y2) => `M${f2(x1)} ${f2(y1)}L${f2(x2)} ${f2(y2)}`;
const rectP = (q) => `M${f2(q[0])} ${f2(q[1])}H${f2(q[2])}V${f2(q[3])}H${f2(q[0])}Z`;
const R = (x0, y0, x1, y1, rx = 0) => `<rect x="${f2(x0)}" y="${f2(y0)}" width="${f2(x1 - x0)}" height="${f2(y1 - y0)}"${rx ? ` rx="${rx}"` : ''}/>`;

function furniture(it) {
  const [k] = it;
  switch (k) {
    case 'rect': { const [, x0, y0, x1, y1, st] = it; let s = R(x0, y0, x1, y1, st === 'r' ? 0.06 : 0);
      if (st === 'shelf') { const v = x1 - x0 < y1 - y0; for (let t = 0.35; t < (v ? y1 - y0 : x1 - x0) - 0.1; t += 0.35) s += v ? `<path d="${lineP(x0, y0 + t, x1, y0 + t)}"/>` : `<path d="${lineP(x0 + t, y0, x0 + t, y1)}"/>`; }
      return s; }
    case 'sink': { const [, x, y, w, h] = it; return R(x, y, x + w, y + h, 0.08) + `<ellipse cx="${f2(x + w / 2)}" cy="${f2(y + h / 2)}" rx="${f2(w * 0.3)}" ry="${f2(h * 0.3)}"/>`; }
    case 'hob': { const [, cx, cy] = it; return [[-0.18, -0.15], [0.18, -0.15], [-0.18, 0.17], [0.18, 0.17]].map(([dx, dy]) => `<circle cx="${f2(cx + dx)}" cy="${f2(cy + dy)}" r="0.11"/>`).join(''); }
    case 'fridge': { const [, x0, y0, x1, y1] = it; return R(x0, y0, x1, y1) + `<path d="${lineP(x0, y0, x1, y1)}"/>`; }
    case 'washer': { const [, x, y] = it; return R(x, y, x + 0.6, y + 0.6, 0.05) + `<circle cx="${f2(x + 0.3)}" cy="${f2(y + 0.3)}" r="0.2"/>`; }
    case 'toilet': { const [, x, y, d] = it; // d = direction the bowl points to, tank against the opposite wall
      if (d === 'E') return R(x, y, x + 0.2, y + 0.45) + `<ellipse cx="${f2(x + 0.45)}" cy="${f2(y + 0.225)}" rx="0.27" ry="0.19"/>`;
      if (d === 'W') return R(x - 0.2, y, x, y + 0.45) + `<ellipse cx="${f2(x - 0.45)}" cy="${f2(y + 0.225)}" rx="0.27" ry="0.19"/>`;
      return ''; }
    case 'shower': { const [, x0, y0, x1, y1] = it; return R(x0, y0, x1, y1) + `<path d="${lineP(x0, y0, x1, y1)}${lineP(x1, y0, x0, y1)}"/><circle cx="${f2((x0 + x1) / 2)}" cy="${f2((y0 + y1) / 2)}" r="0.06"/>`; }
    case 'bath': { const [, x0, y0, x1, y1] = it; return R(x0, y0, x1, y1) + R(x0 + 0.1, y0 + 0.1, x1 - 0.1, y1 - 0.1, 0.25); }
    case 'vanity': { const [, x0, y0, x1, y1, n] = it; const h = (y1 - y0) / n; let s = R(x0, y0, x1, y1);
      for (let j = 0; j < n; j++) s += `<ellipse cx="${f2((x0 + x1) / 2)}" cy="${f2(y0 + h * (j + 0.5))}" rx="0.17" ry="0.22"/>`; return s; }
    case 'bed': { const [, x0, y0, x1, y1, head] = it; let s = R(x0, y0, x1, y1, 0.05);
      const pil = (a0, b0, a1, b1) => R(a0, b0, a1, b1, 0.08);
      if (head === 'N' || head === 'S') { const w = x1 - x0, py = head === 'N' ? y0 + 0.1 : y1 - 0.45, fy = head === 'N' ? y0 + 0.75 : y1 - 0.75;
        s += pil(x0 + 0.1, py, x0 + w / 2 - 0.05, py + 0.35) + pil(x0 + w / 2 + 0.05, py, x1 - 0.1, py + 0.35) + `<path d="${lineP(x0, fy, x1, fy)}"/>`;
        const ny = head === 'N' ? y0 : y1 - 0.4; s += R(x0 - 0.5, ny, x0 - 0.05, ny + 0.4) + R(x1 + 0.05, ny, x1 + 0.5, ny + 0.4);
      } else { const h = y1 - y0, px = head === 'W' ? x0 + 0.1 : x1 - 0.45, fx = head === 'W' ? x0 + 0.75 : x1 - 0.75;
        s += pil(px, y0 + 0.1, px + 0.35, y0 + h / 2 - 0.05) + pil(px, y0 + h / 2 + 0.05, px + 0.35, y1 - 0.1) + `<path d="${lineP(fx, y0, fx, y1)}"/>`;
        const nx = head === 'W' ? x0 : x1 - 0.45; s += R(nx, y0 - 0.5, nx + 0.45, y0 - 0.05) + R(nx, y1 + 0.05, nx + 0.45, y1 + 0.5); }
      return s; }
    case 'sofa': { const [, x0, y0, x1, y1, back] = it; let s = R(x0, y0, x1, y1, 0.08);
      if (back === 'N') s += R(x0, y0, x1, y0 + 0.22); else if (back === 'S') s += R(x0, y1 - 0.22, x1, y1);
      else if (back === 'W') s += R(x0, y0, x0 + 0.22, y1); else s += R(x1 - 0.22, y0, x1, y1);
      return s; }
    case 'table': { const [, x0, y0, x1, y1, n] = it; let s = R(x0, y0, x1, y1, 0.05); const step = (x1 - x0) / n;
      for (let j = 0; j < n; j++) { const cx = x0 + step * (j + 0.5); s += R(cx - 0.21, y0 - 0.5, cx + 0.21, y0 - 0.08, 0.06) + R(cx - 0.21, y1 + 0.08, cx + 0.21, y1 + 0.5, 0.06); }
      return s; }
    case 'chair': { const [, x, y] = it; return R(x, y, x + 0.6, y + 0.6, 0.12); }
    case 'round': { const [, cx, cy, r] = it; return `<circle cx="${cx}" cy="${cy}" r="${r}"/>`; }
    case 'lounger': { const [, x, y] = it; return R(x, y, x + 0.7, y + 1.9, 0.1) + R(x, y, x + 0.7, y + 0.55, 0.1); }
    default: return '';
  }
}

function label(x, y, name, sub, size) {
  const lines = name.toUpperCase().split('\n');
  const fs = size, lh = fs * 1.15, total = lines.length * lh + (sub ? fs * 1.1 : 0);
  let yy = y - total / 2 + fs * 0.85;
  let s = '';
  lines.forEach((ln) => { s += `<text x="${f2(x)}" y="${f2(yy)}" class="ln1" font-size="${fs}">${ln}</text>`; yy += lh; });
  if (sub) s += `<text x="${f2(x)}" y="${f2(yy + fs * 0.05)}" class="ln2" font-size="${f2(fs * 0.98)}">${sub}</text>`;
  return s;
}

/* returns the SVG of one floor (0 ground, 1 upper) */
export function planSvg(t, floor, lang) {
  const N = NAMES[lang], W = t.W, F = t.floors[floor];
  const X0 = -1.45, Y0 = -1.3, X1 = W + 0.45, Y1 = 18.25; // same frame for both floors, so the switch does not jump
  let s = `<svg viewBox="${X0} ${Y0} ${f2(X1 - X0)} ${f2(Y1 - Y0)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${N.floors[floor]}">`;
  /* openings cut out of the walls */
  let mask = `<rect x="${X0}" y="${Y0}" width="${f2(X1 - X0)}" height="${f2(Y1 - Y0)}" fill="#fff"/>`;
  const cut = [];
  F.doors.forEach((d) => { const q = d.o === 'h' ? [d.a, d.at - 0.2, d.a + d.w, d.at + 0.2] : [d.at - 0.2, d.a, d.at + 0.2, d.a + d.w]; cut.push(q); });
  F.wins.forEach((w) => { const q = w.s === 'N' ? [w.a, -0.2, w.b, 0.2] : w.s === 'S' ? [w.a, D - 0.2, w.b, D + 0.2] : w.s === 'W' ? [-0.2, w.a, 0.2, w.b] : [W - 0.2, w.a, W + 0.2, w.b]; cut.push(q); });
  cut.forEach((q) => { mask += `<rect x="${f2(q[0])}" y="${f2(q[1])}" width="${f2(q[2] - q[0])}" height="${f2(q[3] - q[1])}" fill="#000"/>`; });
  s += `<defs><mask id="pm" maskUnits="userSpaceOnUse">${mask}</mask></defs>`;
  /* outside: terrace + pool (ground floor) or balcony (upper floor) */
  const o = F.out;
  s += '<g class="f">';
  if (o.terrace) {
    const q = o.terrace; s += `<rect class="deck" x="${q[0]}" y="${q[1]}" width="${f2(q[2] - q[0])}" height="${f2(q[3] - q[1])}"/>`;
    let pl = ''; for (let y = q[1] + 0.3; y < q[3]; y += 0.3) pl += lineP(q[0], y, q[2], y); s += `<path class="plank" d="${pl}"/>`;
    const p = o.pool; s += `<rect class="coping" x="${f2(p[0] - 0.3)}" y="${f2(p[1] - 0.2)}" width="${f2(p[2] - p[0] + 0.6)}" height="${f2(p[3] - p[1] + 0.2)}"/>`
      + `<rect class="water" x="${f2(p[0])}" y="${f2(p[1])}" width="${f2(p[2] - p[0])}" height="${f2(p[3] - p[1])}"/>`
      + `<path class="edge" d="${lineP(p[0], p[3], p[2], p[3])}"/>`;
  }
  if (o.balcony) { const q = o.balcony; s += `<rect class="deck" x="${q[0]}" y="${q[1]}" width="${f2(q[2] - q[0])}" height="${f2(q[3] - q[1])}"/>`; }
  /* room floors */
  F.rooms.forEach((rm) => { const q = inner(rm.r, W); s += `<rect class="floor" x="${f2(q[0])}" y="${f2(q[1])}" width="${f2(q[2] - q[0])}" height="${f2(q[3] - q[1])}"/>`; });
  // the floor continues through inside door openings
  F.doors.forEach((d) => { if (d.at <= 0 || d.at >= (d.o === 'h' ? D : W)) return;
    const q = d.o === 'h' ? [d.a, d.at - 0.1, d.a + d.w, d.at + 0.1] : [d.at - 0.1, d.a, d.at + 0.1, d.a + d.w];
    s += `<rect class="floor" x="${f2(q[0])}" y="${f2(q[1])}" width="${f2(q[2] - q[0])}" height="${f2(q[3] - q[1])}"/>`; });
  s += '</g>';
  /* walls: footprint minus room interiors (even-odd), openings masked out */
  let wp = rectP([-0.15, -0.15, W + 0.15, D + 0.15]);
  F.rooms.forEach((rm) => { wp += rectP(inner(rm.r, W)); });
  s += `<path class="w" d="${wp}" fill-rule="evenodd" mask="url(#pm)" pathLength="1"/>`;
  /* windows and bay windows */
  let g = '';
  F.wins.forEach((w) => {
    const H = w.s === 'N' || w.s === 'S', c = w.s === 'N' ? 0 : w.s === 'S' ? D : w.s === 'W' ? 0 : W;
    const ln = (off, a, b) => (H ? lineP(a, c + off, b, c + off) : lineP(c + off, a, c + off, b));
    g += ln(-0.15, w.a, w.b) + ln(0.15, w.a, w.b);
    if (w.bay) { const m = (w.a + w.b) / 2; g += ln(-0.04, w.a, m + 0.15) + ln(0.04, m - 0.15, w.b); }
    else g += ln(0, w.a, w.b);
    g += H ? lineP(w.a, c - 0.15, w.a, c + 0.15) + lineP(w.b, c - 0.15, w.b, c + 0.15) : lineP(c - 0.15, w.a, c + 0.15, w.a) + lineP(c - 0.15, w.b, c + 0.15, w.b);
  });
  if (o.balcony) g += lineP(o.balcony[0], o.balcony[3], o.balcony[2], o.balcony[3]) + lineP(o.balcony[0], o.balcony[3] - 0.06, o.balcony[2], o.balcony[3] - 0.06);
  s += `<path class="g" d="${g}"/>`;
  /* doors: leaf + swing */
  let dp = '';
  F.doors.forEach((d) => {
    if (d.open) return;
    if (d.o === 'h') {
      const hx = d.h ? d.a + d.w : d.a, ox = d.h ? d.a : d.a + d.w, ey = d.at + d.s * d.w;
      const sweep = -d.s * d.w * (ox - hx) > 0 ? 1 : 0;
      dp += `${lineP(hx, d.at, hx, ey)}M${f2(hx)} ${f2(ey)}A${d.w} ${d.w} 0 0 ${sweep} ${f2(ox)} ${f2(d.at)}`;
    } else {
      const hy = d.h ? d.a + d.w : d.a, oy = d.h ? d.a : d.a + d.w, ex = d.at + d.s * d.w;
      const sweep = d.s * d.w * (oy - hy) > 0 ? 1 : 0;
      dp += `${lineP(d.at, hy, ex, hy)}M${f2(ex)} ${f2(hy)}A${d.w} ${d.w} 0 0 ${sweep} ${f2(d.at)} ${f2(oy)}`;
    }
  });
  s += `<path class="door" d="${dp}"/>`;
  /* staircase: 16 treads, arrow towards the top (ground floor: going up from the entrance) */
  F.rooms.filter((rm) => rm.stairs).forEach((rm) => {
    const q = inner(rm.r, W), n = 16, y0 = q[1] + 0.05, y1 = q[3] - 0.05, step = (y1 - y0) / n;
    let st = '';
    for (let j = 1; j < n; j++) st += lineP(q[0], y0 + step * j, q[2], y0 + step * j);
    const cx = (q[0] + q[2]) / 2;
    if (rm.stairs > 0) st += `${lineP(cx, y0 + 0.25, cx, y1 - 0.35)}M${f2(cx - 0.16)} ${f2(y1 - 0.6)}L${f2(cx)} ${f2(y1 - 0.3)}L${f2(cx + 0.16)} ${f2(y1 - 0.6)}`;
    else st += `${lineP(cx, y1 - 0.25, cx, y0 + 0.35)}M${f2(cx - 0.16)} ${f2(y0 + 0.6)}L${f2(cx)} ${f2(y0 + 0.3)}L${f2(cx + 0.16)} ${f2(y0 + 0.6)}`;
    st += `M${f2(cx)} ${f2(rm.stairs > 0 ? y0 + 0.25 : y1 - 0.25)}m-0.09 0a0.09 0.09 0 1 0 0.18 0a0.09 0.09 0 1 0 -0.18 0`;
    s += `<path class="stair" d="${st}"/>`;
  });
  /* furniture */
  s += `<g class="t">${F.furn.map(furniture).join('')}${o.terrace ? furniture(['table', 1.2, 11.5, 3.6, 12.4, 3]) + furniture(['lounger', W - 2.9, 10.55]) + furniture(['lounger', W - 2.0, 10.55]) : ''}</g>`;
  /* labels: name + area computed from the drawing */
  let lb = '';
  F.rooms.forEach((rm) => {
    const q = inner(rm.r, W), a = area(q);
    const name = rm.k === 'bed' ? N.bed.replace('{n}', rm.n) : N[rm.k];
    const [lx, ly] = rm.lbl || [(q[0] + q[2]) / 2, (q[1] + q[3]) / 2];
    const nm = rm.one ? name.replace('\n', ' ') : name;
    if (rm.stairs) return; // the treads and the arrow say it
    lb += label(lx, ly, nm, rm.noArea ? '' : `${fmt(a, lang)}${NBSP}m²`, rm.small ? 0.31 : 0.46);
  });
  if (o.terrace) {
    const q = o.terrace, p = o.pool;
    lb += label((q[0] + q[2]) / 2 + 1.0, (q[1] + q[3]) / 2, N.terrace, `${fmt(area(q), lang)}${NBSP}m²`, 0.46);
    lb += label((p[0] + p[2]) / 2, (p[1] + p[3]) / 2, N.pool, `${t.pool[0]} × ${t.pool[1]}${NBSP}m`, 0.46);
  }
  if (o.balcony) { const q = o.balcony; lb += `<text x="${f2((q[0] + q[2]) / 2)}" y="${f2((q[1] + q[3]) / 2 + 0.13)}" class="ln1" font-size="0.36">${N.balcony.toUpperCase()} · ${fmt(area(q), lang)}${NBSP}m²</text>`; }
  /* front door mark and sea side */
  const fd = F.doors.find((d) => d.main);
  if (fd) lb += `<path class="arrow" d="M${f2(fd.a + fd.w / 2)} -1.2L${f2(fd.a + fd.w / 2)} -0.3M${f2(fd.a + fd.w / 2 - 0.18)} -0.58L${f2(fd.a + fd.w / 2)} -0.28L${f2(fd.a + fd.w / 2 + 0.18)} -0.58"/>`;
  /* floor name, top right */
  lb += `<text x="${f2(W + 0.15)}" y="-0.95" class="ttl" font-size="0.5" text-anchor="end">${N.floors[floor].toUpperCase()}</text>`;
  /* overall dimensions (outside faces) */
  const ow = W + 0.3, od = D + 0.3;
  lb += `<path class="dim" d="${lineP(-0.15, -0.75, W + 0.15, -0.75)}${lineP(-0.15, -0.95, -0.15, -0.55)}${lineP(W + 0.15, -0.95, W + 0.15, -0.55)}${lineP(-0.25, -0.65, -0.05, -0.85)}${lineP(W + 0.05, -0.65, W + 0.25, -0.85)}"/>`
    + `<text x="${f2(W / 2 - 2)}" y="-0.95" class="dimt" font-size="0.36">${dimTxt(ow, lang)}</text>`;
  lb += `<path class="dim" d="${lineP(-0.75, -0.15, -0.75, D + 0.15)}${lineP(-0.95, -0.15, -0.55, -0.15)}${lineP(-0.95, D + 0.15, -0.55, D + 0.15)}${lineP(-0.65, -0.05, -0.85, -0.25)}${lineP(-0.65, D + 0.25, -0.85, D + 0.05)}"/>`
    + `<text x="-0.95" y="${f2(D / 2)}" class="dimt" font-size="0.36" transform="rotate(-90 -0.95 ${f2(D / 2)})">${dimTxt(od, lang)}</text>`;
  /* north arrow (the villas face the sunset: the sea side, at the bottom, is west, so north points left) + scale bar */
  lb += `<path class="north" d="M-1.25 11.6l0.95 -0.32v0.64z"/><text x="-0.75" y="12.35" class="ln1" font-size="0.34">N</text>`;
  let sb = lineP(-0.75, 13.95, -0.75, 17.95);
  for (let m = 0; m <= 4; m++) sb += lineP(-0.9, 13.95 + m, m % 2 ? -0.75 : -0.6, 13.95 + m);
  lb += `<path class="dim" d="${sb}"/><text x="-0.5" y="14.07" class="dimt" font-size="0.3" text-anchor="start">0</text><text x="-0.5" y="18.07" class="dimt" font-size="0.3" text-anchor="start">4${NBSP}m</text>`;
  s += `<g class="lbl">${lb}</g></svg>`;
  return s;
}
