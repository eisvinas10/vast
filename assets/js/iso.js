/* ==========================================================================
   ISO — a tiny isometric "massing model" renderer.
   Scenes are lists of boxes / trees drawn back-to-front (author order).
   Units are abstract (1 ≈ one storey). Output is an SVG string.
   ========================================================================== */
(function (global) {
  'use strict';

  const C = Math.cos(Math.PI / 6);
  const S = 0.5;
  const P = (x, y, z) => [(x - y) * C, (x + y) * S - z];
  const fmt = (n) => Math.round(n * 100) / 100;
  const pts = (arr) => arr.map((p) => P(p[0], p[1], p[2]).map(fmt).join(',')).join(' ');

  // Deterministic pseudo-random, so lit windows stay put between frames.
  function rand(seed) {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  const PALETTES = {
    light: {
      top: '#fbfbf9', left: '#e2e1dd', right: '#c9c8c2',
      edge: 'rgba(12,13,14,.16)', win: '#2d3238', lit: '#2d3238',
      ground: { top: '#3a3d42', left: '#2a2c30', right: '#222428' },
      tree: '#8f9c7e', treeDark: '#6f7c60', trunk: '#5b544a',
      accent: { top: '#ff7a4a', left: '#f4511e', right: '#c93f12' },
      litRatio: 0
    },
    dark: {
      top: '#343942', left: '#1b1e23', right: '#252930',
      edge: 'rgba(255,255,255,.16)', win: 'rgba(255,255,255,.07)', lit: '#ffb27a',
      ground: { top: 'rgba(255,255,255,.035)', left: 'rgba(255,255,255,.02)', right: 'rgba(255,255,255,.015)' },
      tree: '#2f3a33', treeDark: '#26302a', trunk: '#3a3a3a',
      accent: { top: '#ff7a4a', left: '#f4511e', right: '#c93f12' },
      litRatio: 0.28
    },
    wire: {
      top: 'rgba(255,91,31,.05)', left: 'rgba(255,255,255,.015)', right: 'rgba(255,255,255,.03)',
      edge: 'rgba(255,255,255,.55)', win: 'rgba(255,255,255,.14)', lit: '#ff5b1f',
      ground: { top: 'rgba(255,255,255,.02)', left: 'rgba(255,255,255,.02)', right: 'rgba(255,255,255,.02)' },
      tree: 'rgba(255,255,255,.08)', treeDark: 'rgba(255,255,255,.04)', trunk: 'rgba(255,255,255,.3)',
      accent: { top: 'rgba(255,91,31,.35)', left: 'rgba(255,91,31,.2)', right: 'rgba(255,91,31,.28)' },
      litRatio: 0.06
    }
  };
  PALETTES.paper = Object.assign({}, PALETTES.light, {
    ground: { top: '#d6d4ce', left: '#c3c0b9', right: '#b2afa7' }
  });

  function poly(points, fill, pal, extra) {
    return `<polygon points="${pts(points)}" fill="${fill}" stroke="${pal.edge}" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"${extra || ''}/>`;
  }
  function flat(points, fill, extra) {
    return `<polygon points="${pts(points)}" fill="${fill}"${extra || ''}/>`;
  }
  function line(a, b, stroke, w, extra) {
    const p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]);
    return `<line x1="${fmt(p[0])}" y1="${fmt(p[1])}" x2="${fmt(q[0])}" y2="${fmt(q[1])}" stroke="${stroke}" stroke-width="${w || 1}" vector-effect="non-scaling-stroke" stroke-linecap="round"${extra || ''}/>`;
  }

  /* ---- windows on the two visible walls ---------------------------------- */
  function windows(b, h, pal, seedBase) {
    const style = b.win || 'grid';
    if (style === 'none') return '';
    const f = b.floor || 1;
    const floors = Math.floor((h + 0.001) / f);
    const { x, y, w, d } = b;
    const z = b.z || 0;
    const lift = b.base || 0;
    let s = '';
    const colFor = (seed) => (pal.litRatio && rand(seed) < pal.litRatio ? pal.lit : pal.win);
    const glow = (c) => (c === pal.lit && pal.litRatio ? ' class="lit"' : '');

    for (let k = 0; k < floors; k++) {
      const z0 = z + lift + k * f;
      if (z0 + f * 0.75 > z + h + 0.001) break;
      if (style === 'ribbon') {
        const za = z0 + f * 0.28, zb = z0 + f * 0.78, m = 0.35;
        let c = colFor(seedBase + k * 7.1);
        s += flat([[x + m, y + d, za], [x + w - m, y + d, za], [x + w - m, y + d, zb], [x + m, y + d, zb]], c, glow(c));
        c = colFor(seedBase + k * 3.3 + 50);
        s += flat([[x + w, y + m, za], [x + w, y + d - m, za], [x + w, y + d - m, zb], [x + w, y + m, zb]], c, glow(c));
      } else if (style === 'stripes') {
        const zz = z0 + f;
        if (zz < z + h - 0.01) {
          s += line([x, y + d, zz], [x + w, y + d, zz], pal.edge, 1);
          s += line([x + w, y, zz], [x + w, y + d, zz], pal.edge, 1);
        }
        const za = z0 + f * 0.3, zb = z0 + f * 0.8;
        const n1 = Math.max(1, Math.round(w / 1.6)), n2 = Math.max(1, Math.round(d / 1.6));
        for (let i = 0; i < n1; i++) {
          const a = x + (i + 0.2) * (w / n1), bb = x + (i + 0.8) * (w / n1);
          const c = colFor(seedBase + k * 13 + i);
          s += flat([[a, y + d, za], [bb, y + d, za], [bb, y + d, zb], [a, y + d, zb]], c, glow(c));
        }
        for (let i = 0; i < n2; i++) {
          const a = y + (i + 0.2) * (d / n2), bb = y + (i + 0.8) * (d / n2);
          const c = colFor(seedBase + k * 17 + i + 99);
          s += flat([[x + w, a, za], [x + w, bb, za], [x + w, bb, zb], [x + w, a, zb]], c, glow(c));
        }
      } else { // grid
        const za = z0 + f * 0.3, zb = z0 + f * 0.75;
        const step = b.step || 1;
        const n1 = Math.max(1, Math.floor(w / step)), n2 = Math.max(1, Math.floor(d / step));
        const ww = b.ww || 0.42;
        for (let i = 0; i < n1; i++) {
          const cx = x + (i + 0.5) * (w / n1);
          const c = colFor(seedBase + k * 11 + i);
          s += flat([[cx - ww / 2, y + d, za], [cx + ww / 2, y + d, za], [cx + ww / 2, y + d, zb], [cx - ww / 2, y + d, zb]], c, glow(c));
        }
        for (let i = 0; i < n2; i++) {
          const cy = y + (i + 0.5) * (d / n2);
          const c = colFor(seedBase + k * 19 + i + 77);
          s += flat([[x + w, cy - ww / 2, za], [x + w, cy + ww / 2, za], [x + w, cy + ww / 2, zb], [x + w, cy - ww / 2, zb]], c, glow(c));
        }
      }
    }
    if (style === 'fins') {
      const n1 = Math.max(2, Math.round(w / 0.8)), n2 = Math.max(2, Math.round(d / 0.8));
      for (let i = 1; i < n1; i++) s += line([x + i * w / n1, y + d, z + 0.3], [x + i * w / n1, y + d, z + h - 0.3], pal.edge, 1);
      for (let i = 1; i < n2; i++) s += line([x + w, y + i * d / n2, z + 0.3], [x + w, y + i * d / n2, z + h - 0.3], pal.edge, 1);
    }
    return s;
  }

  /* ---- a single box (+ optional gable roof) ------------------------------ */
  function box(b, pal, t, idx) {
    const h = b.h * (t === undefined ? 1 : t);
    if (h <= 0.001) return '';
    const { x, y, w, d } = b;
    const z = b.z || 0;
    const zt = z + h;
    const col = b.ground ? pal.ground : b.accent ? pal.accent : pal;
    let s = '';
    s += poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, zt], [x, y + d, zt]], col.left, pal);
    s += poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, zt], [x + w, y, zt]], col.right, pal);
    if (!b.ground && !b.accent) s += windows(b, h, pal, (idx + 1) * 101);
    else if (b.accent && b.win && b.win !== 'none') s += windows(b, h, Object.assign({}, pal, { win: 'rgba(0,0,0,.28)', litRatio: 0 }), (idx + 1) * 101);

    const rh = (b.rh || 0) * (t === undefined ? 1 : Math.max(0, (t - 0.85) / 0.15));
    if (b.roof === 'gable' && rh > 0.01) {
      if ((b.axis || 'x') === 'x') {
        const ym = y + d / 2;
        s += poly([[x, y, zt], [x + w, y, zt], [x + w, ym, zt + rh], [x, ym, zt + rh]], b.roofA || col.top, pal);
        s += poly([[x + w, y, zt], [x + w, y + d, zt], [x + w, ym, zt + rh]], col.right, pal);
        s += poly([[x, y + d, zt], [x + w, y + d, zt], [x + w, ym, zt + rh], [x, ym, zt + rh]], b.roofB || col.top, pal);
      } else {
        const xm = x + w / 2;
        s += poly([[x, y, zt], [x, y + d, zt], [xm, y + d, zt + rh], [xm, y, zt + rh]], b.roofA || col.top, pal);
        s += poly([[x, y + d, zt], [x + w, y + d, zt], [xm, y + d, zt + rh]], col.left, pal);
        s += poly([[xm, y, zt + rh], [xm, y + d, zt + rh], [x + w, y + d, zt], [x + w, y, zt]], b.roofB || col.top, pal);
      }
    } else {
      s += poly([[x, y, zt], [x + w, y, zt], [x + w, y + d, zt], [x, y + d, zt]], col.top, pal);
      if (b.parapet && !b.ground) {
        const m = 0.25;
        s += flat([[x + m, y + m, zt], [x + w - m, y + m, zt], [x + w - m, y + d - m, zt], [x + m, y + d - m, zt]], 'rgba(0,0,0,.05)');
      }
    }
    return s;
  }

  function tree(tr, pal, t) {
    const [x, y, r] = tr;
    const k = t === undefined ? 1 : Math.max(0, Math.min(1, t));
    if (k <= 0) return '';
    const base = P(x, y, 0), top = P(x, y, (r * 1.6) * k);
    const c = P(x, y, (r * 1.6 + r * 0.6) * k);
    return `<line x1="${fmt(base[0])}" y1="${fmt(base[1])}" x2="${fmt(top[0])}" y2="${fmt(top[1])}" stroke="${pal.trunk}" stroke-width="1.5" vector-effect="non-scaling-stroke"/>` +
      `<ellipse cx="${fmt(c[0])}" cy="${fmt(c[1])}" rx="${fmt(r * k)}" ry="${fmt(r * 1.08 * k)}" fill="${pal.tree}"/>` +
      `<ellipse cx="${fmt(c[0] + r * 0.28 * k)}" cy="${fmt(c[1] + r * 0.2 * k)}" rx="${fmt(r * 0.62 * k)}" ry="${fmt(r * 0.7 * k)}" fill="${pal.treeDark}" opacity=".55"/>`;
  }

  /* ---- tower crane (line art) -------------------------------------------- */
  function crane(c, time) {
    const col = c.color || '#ff5b1f';
    const { x, y, h } = c;
    const L = c.L || 10, Lc = c.Lc || 3.5, sq = 0.3;
    const th = (c.theta || 0) + (c.swing || 0) * Math.sin((time || 0) * 0.00025);
    const r = (c.r || 0.6) + (c.trolley || 0) * Math.sin((time || 0) * 0.00017 + 1);
    const hz = c.hookZ === undefined ? h * 0.6 : c.hookZ;
    const dx = Math.cos(th), dy = Math.sin(th);
    const px = -dy, py = dx; // perpendicular
    let s = '';
    const L1 = (a, b, w) => { s += line(a, b, col, w || 1); };
    // mast
    [[-sq, -sq], [sq, -sq], [sq, sq], [-sq, sq]].forEach(([ox, oy]) => L1([x + ox, y + oy, 0], [x + ox, y + oy, h], 1.2));
    for (let k = 0; k < h - 0.1; k += 0.9) {
      const k2 = Math.min(h, k + 0.9);
      L1([x + sq, y - sq, k], [x + sq, y + sq, k2]);
      L1([x - sq, y + sq, k], [x + sq, y + sq, k2]);
    }
    // cab + slewing unit
    s += box({ x: x - 0.55, y: y - 0.55, z: h - 0.1, w: 1.1, d: 1.1, h: 0.7, accent: true }, PALETTES.dark, 1, 0);
    const zt = h + 0.6;
    // jib (two chords + lacing)
    const tip = [x + dx * L, y + dy * L];
    const n = Math.max(6, Math.round(L / 0.8));
    L1([x, y, zt], [tip[0], tip[1], zt], 1.2);
    L1([x + px * 0.25, y + py * 0.25, zt - 0.45], [tip[0] + px * 0.25, tip[1] + py * 0.25, zt - 0.45], 1);
    for (let i = 0; i < n; i++) {
      const a = i / n, b = (i + 1) / n;
      L1([x + dx * L * a, y + dy * L * a, zt], [x + dx * L * b + px * 0.25, y + dy * L * b + py * 0.25, zt - 0.45], 0.8);
    }
    // counter-jib + counterweight
    const back = [x - dx * Lc, y - dy * Lc];
    L1([x, y, zt], [back[0], back[1], zt], 1.2);
    s += box({ x: back[0] - 0.45, y: back[1] - 0.45, z: zt - 0.9, w: 0.9, d: 0.9, h: 0.9, accent: true }, PALETTES.dark, 1, 0);
    // apex + ties
    const apex = [x, y, zt + 2.6];
    L1([x - sq, y - sq, zt], apex, 1); L1([x + sq, y + sq, zt], apex, 1);
    L1(apex, [x + dx * L * 0.62, y + dy * L * 0.62, zt], 0.9);
    L1(apex, [back[0], back[1], zt], 0.9);
    // trolley + hook
    const tx = x + dx * L * r, ty = y + dy * L * r;
    L1([tx, ty, zt - 0.45], [tx, ty, hz + 0.3], 0.8);
    s += box({ x: tx - 0.18, y: ty - 0.18, z: hz, w: 0.36, d: 0.36, h: 0.3, accent: true }, PALETTES.dark, 1, 0);
    if (c.load) {
      const lw = c.load.w || 2, ld = c.load.d || 0.6;
      L1([tx, ty, hz], [tx - lw / 2 + 0.1, ty, hz - 0.8], 0.7);
      L1([tx, ty, hz], [tx + lw / 2 - 0.1, ty, hz - 0.8], 0.7);
      s += box({ x: tx - lw / 2, y: ty - ld / 2, z: hz - 1.05, w: lw, d: ld, h: 0.25, accent: true }, PALETTES.dark, 1, 0);
    }
    return s;
  }

  /* ---- bounds for the viewBox --------------------------------------------- */
  function bounds(items, extraPts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const add = (x, y, z) => {
      const p = P(x, y, z);
      minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]);
      minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
    };
    items.forEach((it) => {
      if (it.tree) { const [x, y, r] = it.tree; add(x - r, y + r, 0); add(x + r, y - r, r * 3.4); return; }
      const z = it.z || 0, zt = z + it.h + (it.rh || 0);
      [[it.x, it.y], [it.x + it.w, it.y], [it.x, it.y + it.d], [it.x + it.w, it.y + it.d]].forEach(([a, b]) => { add(a, b, z); add(a, b, zt); });
    });
    (extraPts || []).forEach((p) => add(p[0], p[1], p[2]));
    return { minX, minY, maxX, maxY };
  }
  function sceneBounds(scene) {
    const extra = (scene.extra || []).slice();
    const c = scene.crane;
    if (c) {
      const th = c.theta || 0, L = c.L || 10, Lc = c.Lc || 3.5;
      extra.push([c.x, c.y, 0], [c.x, c.y, c.h + 3.4],
        [c.x + Math.cos(th) * L, c.y + Math.sin(th) * L, c.h + 0.6],
        [c.x - Math.cos(th) * Lc, c.y - Math.sin(th) * Lc, c.h + 0.6]);
    }
    return bounds(scene.items, extra);
  }
  /* ---- render a scene to SVG markup -------------------------------------- */
  function render(scene, opts) {
    opts = opts || {};
    const pal = typeof scene.palette === 'object' ? scene.palette : PALETTES[opts.palette || scene.palette || 'light'];
    const progress = opts.progress; // optional fn(item, index) -> 0..1
    const pad = opts.pad === undefined ? 1.2 : opts.pad;
    const bb = opts.bounds || sceneBounds(scene);
    const vb = [bb.minX - pad, bb.minY - pad, bb.maxX - bb.minX + pad * 2, bb.maxY - bb.minY + pad * 2].map(fmt).join(' ');
    // The crane is slotted into the draw order at `crane.at` so that
    // buildings in front of the mast can hide it.
    const craneAt = scene.crane ? (scene.crane.at === undefined ? scene.items.length : scene.crane.at) : -1;
    const craneSvg = scene.crane ? `</g><g class="iso-crane">${crane(scene.crane, opts.time || 0)}</g><g class="iso-scene">` : '';
    let body = '';
    scene.items.forEach((it, i) => {
      if (i === craneAt) body += craneSvg;
      const t = progress ? progress(it, i) : undefined;
      body += it.tree ? tree(it.tree, pal, t) : box(it, pal, t, i);
    });
    if (craneAt === scene.items.length) body += craneSvg;
    const cls = opts.className ? ` class="${opts.className}"` : '';
    return `<svg${cls} viewBox="${vb}" preserveAspectRatio="${opts.aspect || 'xMidYMid meet'}" xmlns="http://www.w3.org/2000/svg" role="presentation">${opts.before || ''}<g class="iso-scene">${body}</g>${opts.after || ''}</svg>`;
  }

  global.ISO = { P, C, S, render, bounds, sceneBounds, crane, box, tree, line, poly, flat, PALETTES, pts, fmt, rand };
})(window);
