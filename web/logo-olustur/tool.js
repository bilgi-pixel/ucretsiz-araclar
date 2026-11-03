// Logo Oluşturucu — metin + Lucide ikonu; canlı Canvas önizleme, elle üretilen SVG, PNG ve zip paketi.
// Tek bir "sahne" (scene) hem Canvas'a hem SVG'ye çizilir; böylece PNG ve SVG aynı görünür.
// Dosya hiçbir zaman sunucuya gitmez. Kütüphane: fflate (MIT); ikonlar: Lucide (ISC), yazı tipleri: OFL.
import { setProgress, downloadBlob, formatBytes, showError, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Yazı tipleri ---------- */
// files: vendor/fonts altındaki latin + latin-ext woff2 dosyaları; system: yalnızca CSS yığını (SVG'ye gömülmez)
const FONT_BASE = new URL('../vendor/fonts/', import.meta.url).href;
const UR_LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const UR_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
const FONTS = {
  plex: { label: 'IBM Plex Sans (modern)', family: 'BA-Plex', fallback: 'sans-serif', weights: '400 700', variable: true, files: ['ibm-plex/IBM-Plex-Sans-latin.woff2', 'ibm-plex/IBM-Plex-Sans-latin-ext.woff2'] },
  caveat: { label: 'Caveat (el yazısı)', family: 'BA-Caveat', fallback: 'cursive', weights: '400 700', variable: true, files: ['caveat/caveat-latin.woff2', 'caveat/caveat-latin-ext.woff2'] },
  pacifico: { label: 'Pacifico (eğlenceli)', family: 'BA-Pacifico', fallback: 'cursive', weights: '400', files: ['pacifico/pacifico-latin.woff2', 'pacifico/pacifico-latin-ext.woff2'] },
  dancing: { label: 'Dancing Script (zarif)', family: 'BA-Dancing', fallback: 'cursive', weights: '400 700', variable: true, files: ['dancing-script/dancing-script-latin.woff2', 'dancing-script/dancing-script-latin-ext.woff2'] },
  vibes: { label: 'Great Vibes (davetiye)', family: 'BA-GreatVibes', fallback: 'cursive', weights: '400', files: ['great-vibes/great-vibes-latin.woff2', 'great-vibes/great-vibes-latin-ext.woff2'] },
  arial: { label: 'Arial (sistem)', family: 'Arial, Helvetica', fallback: 'sans-serif', system: true, variable: true },
  georgia: { label: 'Georgia (sistem, serif)', family: 'Georgia, "Times New Roman"', fallback: 'serif', system: true, variable: true },
  trebuchet: { label: 'Trebuchet MS (sistem)', family: '"Trebuchet MS", Verdana', fallback: 'sans-serif', system: true, variable: true },
  courier: { label: 'Courier New (sistem, daktilo)', family: '"Courier New", Courier', fallback: 'monospace', system: true, variable: true },
  impact: { label: 'Impact (sistem, kalın)', family: 'Impact, "Arial Black"', fallback: 'sans-serif', system: true },
};
const fontLoads = {};
const fontData = {}; // anahtar → [{ b64, range }] SVG'ye gömmek için

async function loadFont(key) {
  const f = FONTS[key];
  if (f.system) return;
  if (!fontLoads[key]) {
    fontLoads[key] = Promise.all(f.files.map(async (file, i) => {
      const face = new FontFace(f.family, `url("${FONT_BASE + file}") format("woff2")`, { weight: f.weights, unicodeRange: i === 0 ? UR_LATIN : UR_EXT });
      await face.load();
      document.fonts.add(face);
    }));
  }
  await fontLoads[key];
}

/** Yazı tipi dosyalarını base64'e çevirir (SVG'ye gömmek için); yalnızca ilk kullanımda okunur. */
async function getFontData(key) {
  const f = FONTS[key];
  if (f.system) return null;
  if (!fontData[key]) {
    fontData[key] = await Promise.all(f.files.map(async (file, i) => {
      const buf = new Uint8Array(await (await fetch(FONT_BASE + file)).arrayBuffer());
      let bin = '';
      for (let p = 0; p < buf.length; p += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(p, p + 0x8000));
      return { b64: btoa(bin), range: i === 0 ? UR_LATIN : UR_EXT };
    }));
  }
  return fontData[key];
}

function fontCss(key, bold, size) {
  const f = FONTS[key];
  const w = f.variable ? (bold ? 700 : 400) : 400;
  return { weight: w, css: `${w} ${size}px ${f.family}, ${f.fallback}` };
}

/* ---------- İkonlar (Lucide, ISC) ---------- */
const ICONS = [
  ['star', 'Yıldız'],
  ['heart', 'Kalp'],
  ['zap', 'Şimşek'],
  ['flame', 'Alev'],
  ['sun', 'Güneş'],
  ['moon', 'Ay'],
  ['cloud', 'Bulut'],
  ['leaf', 'Yaprak'],
  ['sprout', 'Filiz'],
  ['tree-pine', 'Çam'],
  ['flower-2', 'Çiçek'],
  ['mountain', 'Dağ'],
  ['waves', 'Dalga'],
  ['droplet', 'Damla'],
  ['snowflake', 'Kar tanesi'],
  ['rocket', 'Roket'],
  ['globe', 'Dünya'],
  ['compass', 'Pusula'],
  ['map-pin', 'Konum'],
  ['anchor', 'Çapa'],
  ['building-2', 'Bina'],
  ['store', 'Dükkan'],
  ['shopping-bag', 'Alışveriş'],
  ['shopping-cart', 'Sepet'],
  ['gift', 'Hediye'],
  ['crown', 'Taç'],
  ['gem', 'Elmas'],
  ['trophy', 'Kupa'],
  ['award', 'Ödül'],
  ['medal', 'Madalya'],
  ['target', 'Hedef'],
  ['flag', 'Bayrak'],
  ['shield', 'Kalkan'],
  ['shield-check', 'Güvenli'],
  ['lock', 'Kilit'],
  ['key', 'Anahtar'],
  ['eye', 'Göz'],
  ['lightbulb', 'Ampul'],
  ['puzzle', 'Yapboz'],
  ['wrench', 'Anahtar takımı'],
  ['hammer', 'Çekiç'],
  ['settings', 'Ayarlar'],
  ['cog', 'Çark'],
  ['code', 'Kod'],
  ['terminal', 'Terminal'],
  ['cpu', 'İşlemci'],
  ['laptop', 'Dizüstü'],
  ['smartphone', 'Telefon'],
  ['monitor', 'Monitör'],
  ['wifi', 'Kablosuz'],
  ['database', 'Veritabanı'],
  ['server', 'Sunucu'],
  ['mail', 'Posta'],
  ['message-circle', 'Mesaj'],
  ['phone', 'Ahize'],
  ['send', 'Gönder'],
  ['megaphone', 'Megafon'],
  ['bell', 'Zil'],
  ['camera', 'Kamera'],
  ['image', 'Resim'],
  ['film', 'Film'],
  ['video', 'Video'],
  ['music', 'Müzik'],
  ['headphones', 'Kulaklık'],
  ['mic', 'Mikrofon'],
  ['palette', 'Palet'],
  ['brush', 'Fırça'],
  ['pen-tool', 'Kalem aracı'],
  ['pencil', 'Kalem'],
  ['book-open', 'Kitap'],
  ['graduation-cap', 'Mezuniyet'],
  ['library', 'Kütüphane'],
  ['newspaper', 'Gazete'],
  ['file-text', 'Belge'],
  ['folder', 'Klasör'],
  ['clipboard-check', 'Liste'],
  ['calendar', 'Takvim'],
  ['clock', 'Saat'],
  ['hourglass', 'Kum saati'],
  ['trending-up', 'Yükseliş'],
  ['wallet', 'Cüzdan'],
  ['credit-card', 'Kart'],
  ['coins', 'Madeni para'],
  ['banknote', 'Banknot'],
  ['handshake', 'El sıkışma'],
  ['users', 'Topluluk'],
  ['user', 'Kişi'],
  ['smile', 'Gülen yüz'],
  ['thumbs-up', 'Beğeni'],
  ['sparkles', 'Parıltı'],
  ['coffee', 'Kahve'],
  ['utensils', 'Yemek'],
  ['cake', 'Pasta'],
  ['apple', 'Elma'],
  ['dumbbell', 'Halter'],
  ['bike', 'Bisiklet'],
  ['car', 'Araba'],
  ['plane', 'Uçak'],
  ['ship', 'Gemi'],
  ['truck', 'Kamyon'],
  ['paw-print', 'Pati'],
  ['bird', 'Kuş'],
  ['fish', 'Balık'],
  ['stethoscope', 'Steteskop'],
  ['pill', 'Hap'],
  ['scale', 'Terazi'],
  ['infinity', 'Sonsuz'],
  ['circle-dot', 'Daire'],
  ['diamond', 'Eşkenar'],
  ['layers', 'Katmanlar'],
  ['box', 'Kutu'],
  ['package', 'Paket'],
  ['link', 'Bağlantı'],
  ['bookmark', 'Yer imi'],
  ['tag', 'Etiket'],
  ['search', 'Arama'],
  ['house', 'Ev'],
  ['chart-column', 'Sütun grafik'],
  ['chart-pie', 'Pasta grafik'],
  ['wand-sparkles', 'Sihirli değnek'],
];
const iconData = {}; // ad → birleşik path "d" dizgesi

const num = (v, d = 0) => (v === null || v === undefined || v === '' ? d : parseFloat(v));
const f2 = (n) => String(Math.round(n * 100) / 100);

/** Lucide öğelerini (circle, rect, line…) tek path "d" dizgesine çevirir; Path2D ve SVG aynı veriyi kullanır. */
function shapeToPath(el) {
  const g = (a) => el.getAttribute(a);
  switch (el.tagName.toLowerCase()) {
    case 'path': return g('d') || '';
    case 'circle': { const cx = num(g('cx')), cy = num(g('cy')), r = num(g('r')); return `M${f2(cx - r)} ${f2(cy)}a${f2(r)} ${f2(r)} 0 1 0 ${f2(2 * r)} 0a${f2(r)} ${f2(r)} 0 1 0 ${f2(-2 * r)} 0`; }
    case 'ellipse': { const cx = num(g('cx')), cy = num(g('cy')), rx = num(g('rx')), ry = num(g('ry')); return `M${f2(cx - rx)} ${f2(cy)}a${f2(rx)} ${f2(ry)} 0 1 0 ${f2(2 * rx)} 0a${f2(rx)} ${f2(ry)} 0 1 0 ${f2(-2 * rx)} 0`; }
    case 'line': return `M${g('x1')} ${g('y1')}L${g('x2')} ${g('y2')}`;
    case 'polyline': return `M${g('points').trim().replace(/\s+/g, ' L')}`;
    case 'polygon': return `M${g('points').trim().replace(/\s+/g, ' L')}Z`;
    case 'rect': {
      const x = num(g('x')), y = num(g('y')), w = num(g('width')), h = num(g('height'));
      const rx = Math.min(num(g('rx'), num(g('ry'))), w / 2), ry = Math.min(num(g('ry'), rx), h / 2);
      if (!rx && !ry) return `M${x} ${y}h${w}v${h}h${-w}Z`;
      return `M${x + rx} ${y}h${w - 2 * rx}a${rx} ${ry} 0 0 1 ${rx} ${ry}v${h - 2 * ry}a${rx} ${ry} 0 0 1 ${-rx} ${ry}h${-(w - 2 * rx)}a${rx} ${ry} 0 0 1 ${-rx} ${-ry}v${-(h - 2 * ry)}a${rx} ${ry} 0 0 1 ${rx} ${-ry}Z`;
    }
    default: return '';
  }
}

async function loadIcons() {
  const base = new URL('../vendor/lucide@0.468.0/icons/', import.meta.url).href;
  await Promise.all(ICONS.map(async ([name]) => {
    const text = await (await fetch(`${base}${name}.svg`)).text();
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    iconData[name] = Array.from(doc.documentElement.children).map(shapeToPath).join('');
  }));
}

/* ---------- Renk paletleri: [ad, vurgu, metin, zemin] ---------- */
const PALETTES = [
  ['Bordo', '#7b2331', '#2b2b2b', '#ffffff'],
  ['Gece mavisi', '#1d4ed8', '#0f172a', '#f8fafc'],
  ['Orman', '#15803d', '#14532d', '#f0fdf4'],
  ['Gün batımı', '#ea580c', '#431407', '#fff7ed'],
  ['Mor', '#7c3aed', '#2e1065', '#faf5ff'],
  ['Pembe', '#db2777', '#500724', '#fff1f2'],
  ['Turkuaz', '#0d9488', '#134e4a', '#f0fdfa'],
  ['Altın', '#b45309', '#1c1917', '#fffbeb'],
  ['Siyah-beyaz', '#111827', '#111827', '#ffffff'],
  ['Koyu zemin', '#fbbf24', '#f9fafb', '#111827'],
];

/* ---------- Durum ---------- */
const state = { icon: 'sparkles', layout: 'top' };
const measureCtx = document.createElement('canvas').getContext('2d');

function options() {
  return {
    name: $('brand').value.trim(),
    slogan: $('slogan').value.trim(),
    font: $('font').value,
    bold: $('bold').checked,
    layout: state.layout,
    icon: state.icon,
    iconSw: parseFloat($('stroke').value),
    accent: $('c-accent').value,
    text: $('c-text').value,
    bg: $('c-bg').value,
    transparent: $('transparent').checked,
  };
}

/* ---------- Sahne: yerleşim hesabı ---------- */
// Yerel birimde yazı boyutu N = 100; sahne sonunda tuval boyutuna sığacak şekilde ölçeklenir.
function measure(text, fontKey, bold, size) {
  measureCtx.font = fontCss(fontKey, bold, size).css;
  const m = measureCtx.measureText(text);
  return { w: m.width, asc: m.actualBoundingBoxAscent || size * 0.75, desc: m.actualBoundingBoxDescent || size * 0.2 };
}

function initialOf(name) { return (name.trim()[0] || 'M').toLocaleUpperCase('tr-TR'); }

function buildScene(o, W, H, kind) {
  const name = o.name || 'Marka Adınız';
  const els = [];
  if (kind === 'favicon') {
    els.push({ t: 'rrect', x: 0, y: 0, w: W, h: H, r: W * 0.22, color: o.accent });
    if (o.icon && iconData[o.icon]) {
      const s = W * 0.58;
      els.push({ t: 'icon', d: iconData[o.icon], x: (W - s) / 2, y: (H - s) / 2, size: s, color: '#ffffff', sw: o.iconSw });
    } else {
      const size = W * 0.55, m = measure(initialOf(name), o.font, true, size);
      els.push({ t: 'text', text: initialOf(name), x: W / 2, y: H / 2 + (m.asc - m.desc) / 2, size, anchor: 'middle', color: '#ffffff', font: o.font, bold: true });
    }
    return { W, H, els, bg: null };
  }

  let layout = o.layout;
  if (kind === 'wide' && (layout === 'top' || layout === 'badge')) layout = 'left';
  const hasIcon = !!(o.icon && iconData[o.icon]);
  const N = 100;
  const mn = measure(name, o.font, o.bold, N);
  let S = N * 0.3, ms = null;
  if (o.slogan) {
    ms = measure(o.slogan, o.font, false, S);
    // Slogan addan belirgin geniş olmasın: gerekirse küçült.
    if (ms.w > mn.w * 1.05) { S = Math.max(N * 0.14, S * (mn.w * 1.05) / ms.w); ms = measure(o.slogan, o.font, false, S); }
  }
  const nameBase = mn.asc;
  const sloganBase = ms ? mn.asc + mn.desc + N * 0.2 + ms.asc : 0;
  const th = ms ? sloganBase + ms.desc : mn.asc + mn.desc;
  const tw = Math.max(mn.w, ms ? ms.w : 0);

  const local = [];
  let bw, bh;
  const pushText = (cx, top, anchor) => {
    local.push({ t: 'text', text: name, x: cx, y: top + nameBase, size: N, anchor, color: o.text, font: o.font, bold: o.bold });
    if (ms) local.push({ t: 'text', text: o.slogan, x: cx, y: top + sloganBase, size: S, anchor, color: o.text, font: o.font, bold: false, opacity: 0.78 });
  };
  if (layout === 'text') {
    bw = tw; bh = th;
    pushText(bw / 2, 0, 'middle');
  } else if (layout === 'left') {
    const ic = N * 1.15, gap = N * 0.3;
    bh = Math.max(hasIcon ? ic : 0, th);
    bw = hasIcon ? ic + gap + tw : tw;
    if (hasIcon) local.push({ t: 'icon', d: iconData[o.icon], x: 0, y: (bh - ic) / 2, size: ic, color: o.accent, sw: o.iconSw });
    pushText(hasIcon ? ic + gap : 0, (bh - th) / 2, 'start');
  } else if (layout === 'top') {
    const ic = N * 1.5, gap = N * 0.28;
    bw = Math.max(hasIcon ? ic : 0, tw); bh = (hasIcon ? ic + gap : 0) + th;
    if (hasIcon) local.push({ t: 'icon', d: iconData[o.icon], x: (bw - ic) / 2, y: 0, size: ic, color: o.accent, sw: o.iconSw });
    pushText(bw / 2, hasIcon ? ic + gap : 0, 'middle');
  } else { // badge: renkli daire içinde ikon (ya da baş harf), altında metin
    const D = N * 1.9, gap = N * 0.3;
    bw = Math.max(D, tw); bh = D + gap + th;
    local.push({ t: 'circle', x: bw / 2, y: D / 2, r: D / 2, color: o.accent });
    if (hasIcon) local.push({ t: 'icon', d: iconData[o.icon], x: bw / 2 - D * 0.27, y: D / 2 - D * 0.27, size: D * 0.54, color: '#ffffff', sw: o.iconSw });
    else {
      const size = D * 0.55, m = measure(initialOf(name), o.font, true, size);
      local.push({ t: 'text', text: initialOf(name), x: bw / 2, y: D / 2 + (m.asc - m.desc) / 2, size, anchor: 'middle', color: '#ffffff', font: o.font, bold: true });
    }
    pushText(bw / 2, D + gap, 'middle');
  }

  const pad = Math.min(W, H) * 0.1;
  const s = Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh);
  const tx = (W - bw * s) / 2, ty = (H - bh * s) / 2;
  for (const e of local) {
    const c = { ...e, x: tx + e.x * s, y: ty + e.y * s };
    if (e.size) c.size = e.size * s;
    if (e.r) c.r = e.r * s;
    els.push(c);
  }
  return { W, H, els, bg: o.transparent ? null : o.bg };
}

/* ---------- Canvas çizimi ---------- */
function drawScene(ctx, scene) {
  ctx.clearRect(0, 0, scene.W, scene.H);
  if (scene.bg) { ctx.fillStyle = scene.bg; ctx.fillRect(0, 0, scene.W, scene.H); }
  for (const e of scene.els) {
    ctx.save();
    if (e.t === 'circle') { ctx.fillStyle = e.color; ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill(); }
    else if (e.t === 'rrect') { ctx.fillStyle = e.color; ctx.beginPath(); ctx.roundRect(e.x, e.y, e.w, e.h, e.r); ctx.fill(); }
    else if (e.t === 'icon') {
      ctx.translate(e.x, e.y); ctx.scale(e.size / 24, e.size / 24);
      ctx.strokeStyle = e.color; ctx.lineWidth = e.sw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.stroke(new Path2D(e.d));
    } else if (e.t === 'text') {
      ctx.font = fontCss(e.font, e.bold, e.size).css;
      ctx.fillStyle = e.color; ctx.textAlign = e.anchor === 'middle' ? 'center' : 'left'; ctx.textBaseline = 'alphabetic';
      ctx.globalAlpha = e.opacity ?? 1;
      ctx.fillText(e.text, e.x, e.y);
    }
    ctx.restore();
  }
}

/* ---------- SVG üretimi (elle) ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function sceneToSvg(scene, o, embed) {
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${scene.W} ${scene.H}" width="${scene.W}" height="${scene.H}">`];
  const f = FONTS[o.font];
  if (embed && !f.system && scene.els.some((e) => e.t === 'text')) {
    const data = await getFontData(o.font);
    const rules = data.map((d) => `@font-face{font-family:${f.family};font-weight:${f.weights};src:url(data:font/woff2;base64,${d.b64}) format("woff2");unicode-range:${d.range}}`).join('');
    parts.push(`<defs><style>${rules}</style></defs>`);
  }
  if (scene.bg) parts.push(`<rect width="${scene.W}" height="${scene.H}" fill="${scene.bg}"/>`);
  for (const e of scene.els) {
    if (e.t === 'circle') parts.push(`<circle cx="${f2(e.x)}" cy="${f2(e.y)}" r="${f2(e.r)}" fill="${e.color}"/>`);
    else if (e.t === 'rrect') parts.push(`<rect width="${f2(e.w)}" height="${f2(e.h)}" rx="${f2(e.r)}" fill="${e.color}"/>`);
    else if (e.t === 'icon') parts.push(`<g transform="translate(${f2(e.x)} ${f2(e.y)}) scale(${f2(e.size / 24)})"><path d="${e.d}" fill="none" stroke="${e.color}" stroke-width="${e.sw}" stroke-linecap="round" stroke-linejoin="round"/></g>`);
    else if (e.t === 'text') {
      const fc = fontCss(e.font, e.bold, e.size);
      const fam = f.family.replace(/"/g, "'") + ', ' + f.fallback;
      parts.push(`<text x="${f2(e.x)}" y="${f2(e.y)}" font-family="${esc(fam)}" font-size="${f2(e.size)}" font-weight="${fc.weight}" text-anchor="${e.anchor}" fill="${e.color}"${e.opacity ? ` fill-opacity="${e.opacity}"` : ''}>${esc(e.text)}</text>`);
    }
  }
  parts.push('</svg>');
  return parts.join('\n');
}

/* ---------- Çıktı boyutları ---------- */
const SIZES = {
  square: { w: 1024, h: 1024, kind: 'square', label: '1024×1024 kare' },
  wide: { w: 1600, h: 400, kind: 'wide', label: '1600×400 yatay' },
  favicon: { w: 512, h: 512, kind: 'favicon', label: '512×512 favicon' },
};

function slug(s) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };
  const t = s.toLocaleLowerCase('tr-TR').replace(/[çğıöşüâîû]/g, (c) => map[c]).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return t || 'logo';
}

async function renderPng(o, size) {
  await loadFont(o.font);
  const canvas = document.createElement('canvas');
  canvas.width = size.w; canvas.height = size.h;
  drawScene(canvas.getContext('2d'), buildScene(o, size.w, size.h, size.kind));
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) throw new Error('png');
  return blob;
}

/* ---------- Canlı önizleme ---------- */
let renderToken = 0;
async function refresh() {
  const token = ++renderToken;
  const o = options();
  try { await loadFont(o.font); } catch { showError($('error'), 'Yazı tipi yüklenemedi; sayfayı yenileyin ya da sistem yazı tiplerinden birini seçin.'); }
  if (token !== renderToken) return;
  const size = SIZES[$('size').value];
  const k = Math.min(1, 720 / Math.max(size.w, size.h));
  const pw = Math.round(size.w * k), ph = Math.round(size.h * k);
  const canvas = $('preview');
  canvas.width = pw; canvas.height = ph;
  drawScene(canvas.getContext('2d'), buildScene(o, pw, ph, size.kind));
  canvas.classList.toggle('is-transparent', o.transparent && size.kind !== 'favicon');
  canvas.setAttribute('aria-label', `Logo önizlemesi: ${o.name || 'marka adı girilmedi'}`);
  $('size-hint').textContent = size.kind === 'wide' && (o.layout === 'top' || o.layout === 'badge')
    ? 'Yatay boyutta ikon, yazının soluna yerleşir.'
    : size.kind === 'favicon' ? 'Favicon: renkli köşeli kare içinde ikon (ikonsuzsa baş harf).' : '';
  canvas.dataset.ready = '1';
}
let timer = null;
function schedule() { clearTimeout(timer); timer = setTimeout(refresh, 60); }

function requireName() {
  if (!$('brand').value.trim()) {
    showError($('error'), 'Önce marka adını yazın; logo boş bir adla indirilemez.');
    $('brand').focus();
    return false;
  }
  showError($('error'), null);
  return true;
}

/* ---------- Arayüz kurulumu ---------- */
function buildFontSelect() {
  $('font').innerHTML = Object.entries(FONTS).map(([k, f]) => `<option value="${k}">${f.label}</option>`).join('');
}

function buildPalette() {
  const box = $('palette');
  PALETTES.forEach(([name, accent, text, bg], i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'lg-swatch'; b.title = name; b.setAttribute('aria-label', `${name} paleti`);
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.style.background = `linear-gradient(135deg, ${accent} 0 50%, ${text} 50% 100%)`;
    b.addEventListener('click', () => {
      $('c-accent').value = accent; $('c-text').value = text; $('c-bg').value = bg;
      box.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      schedule();
    });
    box.appendChild(b);
  });
}

function buildIconGrid(filter = '') {
  const grid = $('icon-grid');
  const q = filter.trim().toLocaleLowerCase('tr-TR');
  grid.innerHTML = '';
  const none = document.createElement('button');
  none.type = 'button'; none.className = 'lg-icon'; none.dataset.icon = ''; none.title = 'İkonsuz'; none.setAttribute('aria-label', 'İkon kullanma');
  none.setAttribute('aria-pressed', state.icon ? 'false' : 'true'); none.textContent = 'Yok';
  grid.appendChild(none);
  for (const [name, label] of ICONS) {
    if (q && !label.toLocaleLowerCase('tr-TR').includes(q) && !name.includes(q)) continue;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'lg-icon'; b.dataset.icon = name; b.title = label; b.setAttribute('aria-label', `${label} ikonu`);
    b.setAttribute('aria-pressed', state.icon === name ? 'true' : 'false');
    b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconData[name] || ''}"/></svg>`;
    grid.appendChild(b);
  }
  if (grid.children.length === 1) {
    const p = document.createElement('p');
    p.className = 'ba-hint'; p.textContent = 'Eşleşen ikon yok; başka bir sözcük deneyin (ör. kalp, ev, araba).';
    grid.appendChild(p);
  }
}

$('icon-grid').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-icon]');
  if (!b) return;
  state.icon = b.dataset.icon || null;
  $('icon-grid').querySelectorAll('button[data-icon]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
  schedule();
});
$('icon-search').addEventListener('input', (e) => buildIconGrid(e.target.value));
document.querySelectorAll('input[name="layout"]').forEach((r) => r.addEventListener('change', () => { state.layout = r.value; schedule(); }));
['brand', 'slogan', 'font', 'bold', 'stroke', 'c-accent', 'c-text', 'c-bg', 'transparent', 'size'].forEach((id) => $(id).addEventListener('input', () => {
  if (id === 'transparent') $('bg-field').hidden = $(id).checked;
  if (id === 'font') $('bold').disabled = !FONTS[$('font').value].variable;
  if (id === 'c-accent' || id === 'c-text' || id === 'c-bg') $('palette').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false'));
  schedule();
}));

async function guarded(fn) {
  if (!requireName()) return;
  const o = options();
  setProgress($('progress'), 10, 'Hazırlanıyor…');
  try { await fn(o); } catch (err) {
    showError($('error'), 'Logo üretilemedi; yazı tipini ya da ikonu değiştirip yeniden deneyin. Sorun sürerse sayfayı yenileyin.');
    console.warn(err);
  } finally { setProgress($('progress'), null); }
}

$('dl-png').addEventListener('click', () => guarded(async (o) => {
  const size = SIZES[$('size').value];
  const blob = await renderPng(o, size);
  downloadBlob(blob, `${slug(o.name)}-logo-${size.w}x${size.h}.png`);
  $('result-info').textContent = `${size.label} PNG hazır (${formatBytes(blob.size)}).`;
}));

$('dl-svg').addEventListener('click', () => guarded(async (o) => {
  await loadFont(o.font);
  const size = SIZES[$('size').value];
  const svg = await sceneToSvg(buildScene(o, size.w, size.h, size.kind), o, $('embed').checked);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  downloadBlob(blob, `${slug(o.name)}-logo.svg`);
  $('result-info').textContent = `SVG hazır (${formatBytes(blob.size)}).` + (FONTS[o.font].system ? ' Sistem yazı tipi SVG\'ye gömülmez; başka bilgisayarda yazı farklı görünebilir, bir tasarım programında yazıyı yola çevirin.' : '');
}));

$('dl-zip').addEventListener('click', () => guarded(async (o) => {
  const { zipSync } = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  const base = slug(o.name);
  const files = {};
  const steps = ['square', 'wide', 'favicon'];
  for (let i = 0; i < steps.length; i++) {
    const size = SIZES[steps[i]];
    setProgress($('progress'), 15 + i * 25, `${size.label} üretiliyor…`);
    files[`${base}-logo-${size.w}x${size.h}.png`] = [new Uint8Array(await (await renderPng(o, size)).arrayBuffer()), { level: 0 }];
    await tick();
  }
  setProgress($('progress'), 90, 'SVG ve zip hazırlanıyor…');
  const sq = SIZES.square;
  const svg = await sceneToSvg(buildScene(o, sq.w, sq.h, sq.kind), o, $('embed').checked);
  files[`${base}-logo.svg`] = [new TextEncoder().encode(svg), { level: 6 }];
  const blob = new Blob([zipSync(files)], { type: 'application/zip' });
  downloadBlob(blob, `${base}-logo-paketi.zip`);
  $('result-info').textContent = `Paket hazır: kare PNG, yatay PNG, favicon PNG ve SVG (${formatBytes(blob.size)}).`;
}));

/* ---------- Başlangıç ---------- */
(async () => {
  buildFontSelect();
  buildPalette();
  $('c-accent').value = PALETTES[0][1]; $('c-text').value = PALETTES[0][2]; $('c-bg').value = PALETTES[0][3];
  try { await loadIcons(); } catch { showError($('error'), 'İkon seti yüklenemedi; sayfayı yenileyin. Yalnızca metin logosu yine de çalışır.'); }
  buildIconGrid();
  $('icon-grid').dataset.ready = '1';
  refresh();
})();
