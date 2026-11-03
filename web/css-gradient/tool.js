// CSS gradient, box-shadow ve border-radius oluşturucu + PNG indirme — saf JS. Hiçbir veri tarayıcıdan çıkmaz.
import { downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const TABS = ['grad', 'shadow', 'radius'];
const MAX_STOPS = 8;
const MAX_LAYERS = 5;

// Hazır gradient paleti (20 adet): ad, tür, açı, duraklar.
const PRESETS = [
  { n: 'Bordo gün batımı', a: 135, c: ['#7b2331', '#e8a04c'] },
  { n: 'Okyanus', a: 90, c: ['#2193b0', '#6dd5ed'] },
  { n: 'Orman', a: 160, c: ['#134e5e', '#71b280'] },
  { n: 'Şafak', a: 45, c: ['#ff9a9e', '#fad0c4'] },
  { n: 'Gece mavisi', a: 180, c: ['#0f2027', '#203a43', '#2c5364'] },
  { n: 'Lavanta', a: 120, c: ['#a18cd1', '#fbc2eb'] },
  { n: 'Mercan', a: 90, c: ['#ff5e62', '#ff9966'] },
  { n: 'Nane', a: 135, c: ['#11998e', '#38ef7d'] },
  { n: 'Kuş üzümü', a: 60, c: ['#4568dc', '#b06ab3'] },
  { n: 'Kehribar', a: 90, c: ['#f7971e', '#ffd200'] },
  { n: 'Gül kurusu', a: 135, c: ['#bc4e9c', '#f80759'] },
  { n: 'Buz', a: 180, c: ['#e0eafc', '#cfdef3'] },
  { n: 'Kömür', a: 135, c: ['#232526', '#414345'] },
  { n: 'Turkuaz', a: 45, c: ['#00c9ff', '#92fe9d'] },
  { n: 'Şeftali', a: 90, c: ['#ffecd2', '#fcb69f'] },
  { n: 'Mor sis', a: 160, c: ['#667eea', '#764ba2'] },
  { n: 'Akdeniz', a: 90, c: ['#1d976c', '#93f9b9', '#ffffff'] },
  { n: 'Kızıl', a: 135, c: ['#cb2d3e', '#ef473a'] },
  { n: 'Çelik', a: 180, c: ['#bdc3c7', '#2c3e50'] },
  { n: 'Gökkuşağı', a: 90, c: ['#ff4d4d', '#f9cb28', '#4dff88', '#4d79ff', '#b84dff'] },
];

function setError(msg) {
  const el = $('error');
  el.textContent = msg || '';
  el.classList.toggle('is-active', !!msg);
}

/* ---------- Sekmeler ---------- */
function selectTab(name, focus) {
  for (const t of TABS) {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', sel ? 'true' : 'false');
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  }
  if (focus) $('tab-' + name).focus();
}
TABS.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(TABS[(i + 1) % TABS.length], true);
    else if (e.key === 'ArrowLeft') selectTab(TABS[(i + TABS.length - 1) % TABS.length], true);
  });
});

/* ---------- Durum ---------- */
const state = {
  stops: [{ color: '#7b2331', pos: 0 }, { color: '#ffffff', pos: 100 }],
  layers: [],
};
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const num = (v, d = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };

/* ---------- CSS üretimi ---------- */
function gradientCss() {
  const type = $('g-type').value;
  const stops = state.stops.map((s) => `${s.color} ${s.pos}%`).join(', ');
  const px = clamp(num($('g-x').value, 50), 0, 100);
  const py = clamp(num($('g-y').value, 50), 0, 100);
  const angle = num($('g-angle').value, 90);
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stops})`;
  if (type === 'radial') return `radial-gradient(${$('g-shape').value} at ${px}% ${py}%, ${stops})`;
  return `conic-gradient(from ${angle}deg at ${px}% ${py}%, ${stops})`;
}
function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255} / ${a})`;
}
function shadowCss() {
  if (!state.layers.length) return '';
  return state.layers.map((l) => {
    const color = l.alpha >= 1 ? l.color : hexToRgba(l.color, l.alpha);
    return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${color}`;
  }).join(', ');
}
function radiusCss() {
  const v = ['r-tl', 'r-tr', 'r-br', 'r-bl'].map((id) => Math.max(0, num($(id).value, 0)));
  const u = $('r-unit').value;
  if (v.every((x) => x === 0)) return '';
  if (v.every((x) => x === v[0])) return `${v[0]}${u}`;
  return v.map((x) => `${x}${u}`).join(' ');
}
function fullCss() {
  const lines = [`background: ${gradientCss()};`];
  const sh = shadowCss();
  if (sh) lines.push(`box-shadow: ${sh};`);
  const r = radiusCss();
  if (r) lines.push(`border-radius: ${r};`);
  return lines.join('\n');
}

function update() {
  const type = $('g-type').value;
  $('g-angle-wrap').hidden = type === 'radial';
  $('g-shape-wrap').hidden = type !== 'radial';
  $('g-pos-wrap').hidden = type === 'linear';
  $('g-angle-label').textContent = type === 'conic' ? 'Başlangıç açısı (derece)' : 'Açı (derece)';
  const p = $('preview');
  p.style.background = gradientCss();
  p.style.boxShadow = shadowCss();
  p.style.borderRadius = radiusCss();
  $('css-out').value = fullCss();
}

/* ---------- Gradient durakları ---------- */
function renderStops() {
  const host = $('stops');
  host.textContent = '';
  state.stops.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'cg-row';
    const c = document.createElement('input');
    c.type = 'color'; c.value = s.color; c.className = 'g-color';
    c.setAttribute('aria-label', `Durak ${i + 1} rengi`);
    c.addEventListener('input', () => { s.color = c.value; update(); });
    const p = document.createElement('input');
    p.type = 'number'; p.min = '0'; p.max = '100'; p.step = '1'; p.value = String(s.pos); p.className = 'g-pos';
    p.setAttribute('aria-label', `Durak ${i + 1} konumu (yüzde)`);
    p.addEventListener('input', () => { s.pos = clamp(num(p.value, 0), 0, 100); update(); });
    const del = document.createElement('button');
    del.type = 'button'; del.className = 'ba-btn'; del.textContent = 'Sil';
    del.setAttribute('aria-label', `Durak ${i + 1} sil`);
    del.addEventListener('click', () => {
      if (state.stops.length <= 2) { setError('En az iki renk durağı gerekir. Üçüncü bir renk eklemek için "Renk durağı ekle" düğmesini kullanın.'); return; }
      setError('');
      state.stops.splice(i, 1);
      renderStops();
      update();
    });
    row.append(c, p, del);
    host.appendChild(row);
  });
}
$('stop-add').addEventListener('click', () => {
  if (state.stops.length >= MAX_STOPS) { setError(`En fazla ${MAX_STOPS} renk durağı eklenebilir. Gereksiz bir durağı silin.`); return; }
  setError('');
  const last = state.stops[state.stops.length - 1];
  const prev = state.stops[state.stops.length - 2] || last;
  state.stops.push({ color: prev.color, pos: clamp(Math.round((last.pos + 100) / 2), 0, 100) });
  renderStops();
  update();
});
['g-type', 'g-shape', 'g-angle', 'g-x', 'g-y'].forEach((id) => { $(id).addEventListener('input', update); $(id).addEventListener('change', update); });
$('g-angle').addEventListener('input', () => { $('g-angle-range').value = String(clamp(num($('g-angle').value, 0), 0, 360)); });
$('g-angle-range').addEventListener('input', () => { $('g-angle').value = $('g-angle-range').value; update(); });

/* ---------- Palet ve rastgele ---------- */
function applyColors(colors, angle) {
  state.stops = colors.map((c, i) => ({ color: c, pos: colors.length === 1 ? 0 : Math.round((i / (colors.length - 1)) * 100) }));
  $('g-angle').value = String(angle);
  $('g-angle-range').value = String(clamp(angle, 0, 360));
  setError('');
  renderStops();
  update();
}
const palette = $('palette');
PRESETS.forEach((pr) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'cg-swatch';
  b.title = pr.n;
  b.setAttribute('aria-label', `${pr.n} paletini uygula`);
  b.style.background = `linear-gradient(${pr.a}deg, ${pr.c.join(', ')})`;
  b.addEventListener('click', () => applyColors(pr.c, pr.a));
  palette.appendChild(b);
});
const randHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
$('g-random').addEventListener('click', () => {
  const n = 2 + Math.floor(Math.random() * 2);
  applyColors(Array.from({ length: n }, randHex), Math.floor(Math.random() * 360));
});

/* ---------- Gölge katmanları ---------- */
function renderLayers() {
  const host = $('layers');
  host.textContent = '';
  $('layers-empty').hidden = state.layers.length > 0;
  state.layers.forEach((l, i) => {
    const box = document.createElement('fieldset');
    box.className = 'cg-layer';
    const lg = document.createElement('legend');
    lg.textContent = `Gölge katmanı ${i + 1}`;
    box.appendChild(lg);
    const grid = document.createElement('div');
    grid.className = 'cg-grid';
    const mk = (label, key, min, max) => {
      const w = document.createElement('label');
      w.textContent = label;
      const inp = document.createElement('input');
      inp.type = 'number'; inp.min = String(min); inp.max = String(max); inp.value = String(l[key]);
      inp.className = 'l-' + key;
      inp.addEventListener('input', () => { l[key] = clamp(num(inp.value, 0), min, max); update(); });
      w.appendChild(inp);
      grid.appendChild(w);
    };
    mk('X (px)', 'x', -200, 200);
    mk('Y (px)', 'y', -200, 200);
    mk('Bulanıklık (px)', 'blur', 0, 400);
    mk('Yayılma (px)', 'spread', -200, 200);
    const cw = document.createElement('label');
    cw.textContent = 'Renk';
    const col = document.createElement('input');
    col.type = 'color'; col.value = l.color; col.className = 'l-color';
    col.addEventListener('input', () => { l.color = col.value; update(); });
    cw.appendChild(col);
    grid.appendChild(cw);
    const aw = document.createElement('label');
    aw.textContent = 'Saydamlık (0-1)';
    const al = document.createElement('input');
    al.type = 'number'; al.min = '0'; al.max = '1'; al.step = '0.05'; al.value = String(l.alpha); al.className = 'l-alpha';
    al.addEventListener('input', () => { l.alpha = clamp(num(al.value, 1), 0, 1); update(); });
    aw.appendChild(al);
    grid.appendChild(aw);
    box.appendChild(grid);
    const row = document.createElement('div');
    row.className = 'cg-btns';
    const ic = document.createElement('label');
    ic.className = 'cg-check';
    const icb = document.createElement('input');
    icb.type = 'checkbox'; icb.checked = l.inset; icb.className = 'l-inset';
    icb.addEventListener('change', () => { l.inset = icb.checked; update(); });
    ic.append(icb, ' İç gölge (inset)');
    const del = document.createElement('button');
    del.type = 'button'; del.className = 'ba-btn'; del.textContent = 'Katmanı sil';
    del.setAttribute('aria-label', `Gölge katmanı ${i + 1} sil`);
    del.addEventListener('click', () => { state.layers.splice(i, 1); renderLayers(); update(); });
    row.append(ic, del);
    box.appendChild(row);
    host.appendChild(box);
  });
}
$('layer-add').addEventListener('click', () => {
  if (state.layers.length >= MAX_LAYERS) { setError(`En fazla ${MAX_LAYERS} gölge katmanı eklenebilir.`); return; }
  setError('');
  state.layers.push({ x: 0, y: 10, blur: 25, spread: 0, color: '#000000', alpha: 0.25, inset: false });
  renderLayers();
  update();
});

/* ---------- Köşe yuvarlama ---------- */
['r-tl', 'r-tr', 'r-br', 'r-bl', 'r-unit'].forEach((id) => { $(id).addEventListener('input', update); $(id).addEventListener('change', update); });
$('r-all').addEventListener('input', () => {
  const v = $('r-all').value;
  ['r-tl', 'r-tr', 'r-br', 'r-bl'].forEach((id) => { $(id).value = v; });
  update();
});

/* ---------- Kopyala ---------- */
$('copy').addEventListener('click', async () => {
  const value = $('css-out').value;
  try { await navigator.clipboard.writeText(value); } catch {
    $('css-out').select();
    document.execCommand('copy');
  }
  $('copied').textContent = 'Kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2000);
});

/* ---------- PNG olarak indir (canvas) ---------- */
$('png-size').addEventListener('change', () => { $('png-custom').hidden = $('png-size').value !== 'custom'; });

function paintGradient(ctx, w, h) {
  const type = $('g-type').value;
  const angle = num($('g-angle').value, 90);
  const px = (clamp(num($('g-x').value, 50), 0, 100) / 100) * w;
  const py = (clamp(num($('g-y').value, 50), 0, 100) / 100) * h;
  let g;
  if (type === 'linear') {
    const rad = (angle * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    // CSS'teki gradient çizgisi uzunluğu: köşelerden köşeye kapsayan uzunluk.
    const len = Math.abs(w * dx) + Math.abs(h * dy);
    const cx = w / 2;
    const cy = h / 2;
    g = ctx.createLinearGradient(cx - (dx * len) / 2, cy - (dy * len) / 2, cx + (dx * len) / 2, cy + (dy * len) / 2);
  } else if (type === 'conic') {
    if (!ctx.createConicGradient) throw new Error('conic');
    // Canvas 0 derecesi sağ tarafta, CSS'te üst tarafta başlar.
    g = ctx.createConicGradient(((angle - 90) * Math.PI) / 180, px, py);
  } else {
    g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  }
  for (const s of state.stops) g.addColorStop(clamp(s.pos / 100, 0, 1), s.color);
  if (type !== 'radial') { ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); return; }
  // Radyal: farthest-corner. Daire için tek yarıçap, elips için oranlı yarıçap.
  let rx;
  let ry;
  if ($('g-shape').value === 'circle') {
    rx = ry = Math.max(Math.hypot(px, py), Math.hypot(w - px, py), Math.hypot(px, h - py), Math.hypot(w - px, h - py)) || 1;
  } else {
    rx = Math.max(px, w - px) * Math.SQRT2 || 1;
    ry = Math.max(py, h - py) * Math.SQRT2 || 1;
  }
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(rx, ry);
  ctx.fillStyle = g;
  ctx.fillRect(-px / rx, -py / ry, w / rx, h / ry);
  ctx.restore();
}

$('png-btn').addEventListener('click', () => {
  let w;
  let h;
  if ($('png-size').value === 'custom') {
    w = Math.round(num($('png-w').value, 0));
    h = Math.round(num($('png-h').value, 0));
  } else {
    [w, h] = $('png-size').value.split('x').map(Number);
  }
  if (!(w >= 16 && h >= 16 && w <= 4096 && h <= 4096)) {
    setError('Genişlik ve yükseklik 16 ile 4096 piksel arasında olmalı. Örnek: 1920 x 1080.');
    return;
  }
  try {
    const cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;
    paintGradient(cv.getContext('2d'), w, h);
    cv.toBlob((blob) => {
      if (!blob) { setError('PNG oluşturulamadı. Boyutu küçültüp tekrar deneyin.'); return; }
      setError('');
      downloadBlob(blob, `gradient-${w}x${h}.png`);
      $('png-info').textContent = `gradient-${w}x${h}.png indirildi.`;
    }, 'image/png');
  } catch (e) {
    setError(e && e.message === 'conic'
      ? 'Bu tarayıcı konik gradient çizimini PNG için desteklemiyor. Doğrusal ya da radyal gradient seçin ya da tarayıcınızı güncelleyin.'
      : 'PNG oluşturulamadı. Boyutu küçültüp tekrar deneyin.');
  }
});

renderStops();
renderLayers();
update();
selectTab('grad');
