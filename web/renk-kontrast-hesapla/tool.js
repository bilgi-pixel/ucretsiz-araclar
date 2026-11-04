// Renk Kontrast Hesaplama — WCAG 2.1 formülü; tamamen tarayıcıda çalışır, ağ isteği yok.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- Renk yardımcıları ---------- */
/** "#fff", "fff", "%23ffffff", "#FFFFFF" → {r,g,b}; geçersizse null. */
export function parseHex(input) {
  let h = String(input ?? '').trim();
  try { h = decodeURIComponent(h); } catch { /* % işareti tek başına olabilir; olduğu gibi bırak */ }
  h = h.replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
const toHex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0; const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6; else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}
function hslToRgb({ h, s, l }) {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x]; else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

/* ---------- WCAG 2.1 göreli parlaklık ve kontrast ---------- */
const toLinear = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
export function luminance({ r, g, b }) { return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b); }
export function contrastRatio(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** Oranı "4,48:1" biçiminde yazar. Yuvarlama bir eşiği yanlışlıkla geçirecekse üç ondalık gösterir. */
export function formatRatio(r) {
  let s = r.toFixed(2);
  for (const t of [3, 4.5, 7]) if (r < t && Number(s) >= t) s = (Math.floor(r * 1000) / 1000).toFixed(3);
  return s.replace('.', ',').replace(/,00$/, '') + ':1';
}

/** color'ın açıklığını iki yönde tarar; hedef oranı geçen en yakın tonu döndürür. */
export function nearestPassing(color, other, target) {
  if (contrastRatio(color, other) >= target) return { status: 'ok', rgb: color };
  const hsl = rgbToHsl(color);
  let best = null;
  for (const dir of [-1, 1]) {
    for (let d = 0.1; d <= 200; d += 0.1) {
      const l = clamp(hsl.l + dir * d, 0, 100);
      const rgb = hslToRgb({ h: hsl.h, s: hsl.s, l });
      if (contrastRatio(rgb, other) >= target) {
        const delta = Math.abs(l - hsl.l);
        if (!best || delta < best.delta) best = { status: 'found', rgb, delta, dir };
        break;
      }
      if (l === 0 || l === 100) break; // uca ulaşıldı, bu yönde çözüm yok
    }
  }
  return best || { status: 'none' };
}

/* ---------- Renk körlüğü (Machado ve ark., 2009; şiddet 1,0; doğrusal RGB) ---------- */
const CB = {
  prot: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deut: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  trit: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};
const toSrgb = (c) => { c = clamp(c, 0, 1); return Math.round((c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055) * 255); };
export function simulate(rgb, m) {
  const l = [toLinear(rgb.r), toLinear(rgb.g), toLinear(rgb.b)];
  const o = m.map((row) => row[0] * l[0] + row[1] * l[1] + row[2] * l[2]);
  return { r: toSrgb(o[0]), g: toSrgb(o[1]), b: toSrgb(o[2]) };
}
const CB_KINDS = [
  ['normal', 'Normal görme', null],
  ['prot', 'Protanopi (kırmızı eksik)', CB.prot],
  ['deut', 'Döteranopi (yeşil eksik)', CB.deut],
  ['trit', 'Tritanopi (mavi eksik)', CB.trit],
];

/* ---------- Hazır çiftler: çerçeve/palet varsayılanları ve sık yapılan hatalar ---------- */
const PAIRS = [
  ['Siyah / beyaz', '#000000', '#ffffff'],
  ['Bootstrap gövde metni / beyaz', '#212529', '#ffffff'],
  ['Bootstrap birincil mavi / beyaz', '#0d6efd', '#ffffff'],
  ['Bootstrap uyarı sarısı / beyaz', '#ffc107', '#ffffff'],
  ['Bootstrap uyarı sarısı / siyah', '#ffc107', '#000000'],
  ['Material kırmızı 500 / beyaz', '#f44336', '#ffffff'],
  ['Material mavi 500 / beyaz', '#2196f3', '#ffffff'],
  ['Tailwind gri 400 / beyaz', '#9ca3af', '#ffffff'],
  ['Tailwind gri 500 / beyaz', '#6b7280', '#ffffff'],
  ['Tailwind gri 600 / beyaz', '#4b5563', '#ffffff'],
  ['Açık gri #999 / beyaz (sık hata)', '#999999', '#ffffff'],
  ['AA\'yı geçen en açık gri / beyaz', '#767676', '#ffffff'],
  ['Beyaz / koyu lacivert', '#ffffff', '#1e3a8a'],
  ['Koyu tema: açık gri / koyu zemin', '#e5e7eb', '#111827'],
  ['Bilişim Ajans bordo / beyaz', '#7b2331', '#ffffff'],
];

/* ---------- Durum ---------- */
const DEFAULTS = { fg: '#6b7280', bg: '#ffffff' };
const state = { fg: parseHex(DEFAULTS.fg), bg: parseHex(DEFAULTS.bg) };
const problems = { fg: '', bg: '' };
const SIDE_NAME = { fg: 'Ön plan', bg: 'Arka plan' };

function refreshError(extra) {
  const msg = extra || problems.fg || problems.bg;
  showError($('error'), msg || null);
}

function setStatus(text) {
  const el = $('copy-status');
  el.textContent = text;
  clearTimeout(setStatus.t);
  if (text) setStatus.t = setTimeout(() => { el.textContent = ''; }, 2500);
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* yoksay */ }
    t.remove();
    return ok;
  }
}

/* ---------- Çizim ---------- */
function mark(li, pass) {
  li.dataset.pass = pass ? '1' : '0';
  li.querySelector('.kc-state').textContent = pass ? '✓ Geçti' : '✗ Kaldı';
}

function verdictFor(ratio) {
  if (ratio >= 7) return 'Çok iyi: normal metinde bile AAA düzeyini geçiyor.';
  if (ratio >= 4.5) return 'İyi: normal metin için AA düzeyini geçiyor. AAA için en az 7:1 gerekir.';
  if (ratio >= 3) return 'Sınırlı: yalnızca büyük metin ve arayüz bileşenleri için AA düzeyini geçiyor. Normal metinde rengi düzeltin.';
  return 'Yetersiz: bu çift hiçbir WCAG metin düzeyini geçmiyor; okunması zor olur.';
}

function renderFix() {
  const which = $('fix-target').value === 'bg' ? 'bg' : 'fg';
  const other = which === 'fg' ? 'bg' : 'fg';
  for (const [key, target, label] of [['aa', 4.5, 'AA'], ['aaa', 7, 'AAA']]) {
    const res = nearestPassing(state[which], state[other], target);
    const text = $(`fix-${key}-text`), sw = $(`fix-${key}-sw`), btn = $(`fix-${key}-apply`);
    btn.hidden = res.status !== 'found';
    delete btn.dataset.hex;
    if (res.status === 'ok') {
      sw.style.background = toHex(res.rgb);
      text.textContent = `Mevcut renk zaten ${label} düzeyini geçiyor (${formatRatio(contrastRatio(state.fg, state.bg))}).`;
    } else if (res.status === 'found') {
      const hex = toHex(res.rgb);
      const nr = which === 'fg' ? contrastRatio(res.rgb, state.bg) : contrastRatio(state.fg, res.rgb);
      sw.style.background = hex;
      btn.dataset.hex = hex;
      btn.setAttribute('aria-label', `${SIDE_NAME[which]} rengini ${hex.toUpperCase()} yap (${label})`);
      text.textContent = `${hex.toUpperCase()} · ${formatRatio(nr)} · ${res.dir > 0 ? 'daha açık' : 'daha koyu'} ton`;
    } else {
      sw.style.background = 'transparent';
      text.textContent = `${SIDE_NAME[which]} rengini değiştirerek ${label} düzeyine ulaşılamıyor; ${which === 'fg' ? 'arka planı' : 'ön planı'} da açın ya da koyulaştırın.`;
    }
  }
}

function renderBlindness() {
  const grid = $('cb-grid');
  grid.replaceChildren(...CB_KINDS.map(([kind, name, m]) => {
    const fg = m ? simulate(state.fg, m) : state.fg, bg = m ? simulate(state.bg, m) : state.bg;
    const ratio = contrastRatio(fg, bg);
    const fig = document.createElement('figure');
    fig.dataset.kind = kind;
    const sample = document.createElement('div');
    sample.className = 'kc-cb-sample';
    sample.style.color = toHex(fg); sample.style.background = toHex(bg);
    sample.textContent = 'Aa Örnek metin';
    const cap = document.createElement('figcaption');
    const strong = document.createElement('strong'); strong.textContent = name;
    const span = document.createElement('span');
    span.dataset.ratio = ratio.toFixed(3);
    span.textContent = ` · ${formatRatio(ratio)} · AA normal: ${ratio >= 4.5 ? 'geçti' : 'kaldı'}`;
    cap.append(strong, span);
    fig.append(sample, cap);
    return fig;
  }));
}

function syncUrl() {
  const q = `?fg=${toHex(state.fg).slice(1)}&bg=${toHex(state.bg).slice(1)}`;
  try { history.replaceState(null, '', location.pathname + q); } catch { /* bazı ortamlarda kapalı olabilir */ }
  $('share-url').value = `${location.origin === 'null' ? '' : location.origin}${location.pathname}${q}`;
}

/** Tüm arayüzü state'e göre günceller. source: kullanıcının yazmakta olduğu alan (üzerine yazılmaz). */
function render(source) {
  const fgHex = toHex(state.fg), bgHex = toHex(state.bg);
  if (source !== 'fg-hex') $('fg-hex').value = fgHex.toUpperCase();
  if (source !== 'bg-hex') $('bg-hex').value = bgHex.toUpperCase();
  $('fg-color').value = fgHex; $('bg-color').value = bgHex;

  const ratio = contrastRatio(state.fg, state.bg);
  const out = $('cr-ratio');
  out.textContent = formatRatio(ratio);
  out.dataset.ratio = ratio.toFixed(4);
  $('cr-verdict').textContent = verdictFor(ratio);
  mark($('b-aa-n'), ratio >= 4.5); mark($('b-aa-l'), ratio >= 3);
  mark($('b-aaa-n'), ratio >= 7); mark($('b-aaa-l'), ratio >= 4.5);
  mark($('b-ui'), ratio >= 3);

  const pv = $('preview');
  pv.style.color = fgHex; pv.style.background = bgHex;
  pv.style.borderColor = fgHex;

  renderFix();
  renderBlindness();
  syncUrl();
}

/* ---------- Girdi olayları ---------- */
function onHex(which, final) {
  const el = $(`${which}-hex`);
  const rgb = parseHex(el.value);
  if (rgb) {
    el.removeAttribute('aria-invalid');
    problems[which] = '';
    state[which] = rgb;
    refreshError();
    render(final ? null : `${which}-hex`);
    return;
  }
  el.setAttribute('aria-invalid', 'true');
  const raw = el.value.trim().replace(/^#/, '');
  // yazarken kısmi değerlerde (1-2, 4-5 hane) hemen uyarma; açıkça yanlışsa ya da alan bırakılınca uyar
  if (final || /[^0-9a-f]/i.test(raw) || raw.length > 6) {
    problems[which] = `${SIDE_NAME[which]} HEX değeri geçersiz: "${el.value.trim() || 'boş'}". #RRGGBB (6 hane) ya da #RGB (3 hane) yazın; örnek: #1a73e8. Önizleme son geçerli rengi gösteriyor.`;
    refreshError();
  }
}
for (const which of ['fg', 'bg']) {
  $(`${which}-hex`).addEventListener('input', () => onHex(which, false));
  $(`${which}-hex`).addEventListener('change', () => onHex(which, true));
  $(`${which}-color`).addEventListener('input', () => {
    state[which] = parseHex($(`${which}-color`).value);
    $(`${which}-hex`).removeAttribute('aria-invalid');
    problems[which] = '';
    refreshError();
    render(null);
  });
}
$('swap').addEventListener('click', () => {
  [state.fg, state.bg] = [state.bg, state.fg];
  problems.fg = ''; problems.bg = '';
  $('fg-hex').removeAttribute('aria-invalid'); $('bg-hex').removeAttribute('aria-invalid');
  refreshError();
  render(null);
});
$('fix-target').addEventListener('change', renderFix);
for (const key of ['aa', 'aaa']) {
  $(`fix-${key}-apply`).addEventListener('click', () => {
    const hex = $(`fix-${key}-apply`).dataset.hex;
    const rgb = hex && parseHex(hex);
    if (!rgb) return;
    state[$('fix-target').value === 'bg' ? 'bg' : 'fg'] = rgb;
    render(null);
  });
}
$('copy-link').addEventListener('click', async () => {
  const ok = await copyText($('share-url').value);
  setStatus(ok ? 'Bağlantı kopyalandı.' : 'Kopyalanamadı; bağlantıyı alandan elle seçip kopyalayın.');
});

/* ---------- Hazır çiftler tablosu ---------- */
function buildPairs() {
  const body = $('pairs-body');
  body.replaceChildren(...PAIRS.map(([name, fgHex, bgHex]) => {
    const fg = parseHex(fgHex), bg = parseHex(bgHex), ratio = contrastRatio(fg, bg);
    const tr = document.createElement('tr');
    tr.dataset.fg = fgHex; tr.dataset.bg = bgHex;
    const td1 = document.createElement('td');
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'kc-pair-btn';
    btn.setAttribute('aria-label', `Bu çifti kullan: ${name}`);
    const aa = document.createElement('span');
    aa.className = 'kc-pair-aa'; aa.setAttribute('aria-hidden', 'true');
    aa.style.color = fgHex; aa.style.background = bgHex; aa.textContent = 'Aa';
    const nm = document.createElement('span');
    nm.className = 'kc-pair-name'; nm.textContent = name;
    const codes = document.createElement('small'); codes.textContent = `${fgHex.toUpperCase()} / ${bgHex.toUpperCase()}`;
    nm.appendChild(codes);
    btn.append(aa, nm);
    btn.addEventListener('click', () => {
      state.fg = fg; state.bg = bg;
      problems.fg = ''; problems.bg = '';
      $('fg-hex').removeAttribute('aria-invalid'); $('bg-hex').removeAttribute('aria-invalid');
      refreshError();
      render(null);
      $('cr-ratio').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    td1.appendChild(btn);
    const td2 = document.createElement('td');
    td2.textContent = formatRatio(ratio); td2.dataset.ratio = ratio.toFixed(3);
    const td3 = document.createElement('td');
    td3.className = ratio >= 4.5 ? 'kc-ok' : 'kc-bad';
    td3.textContent = ratio >= 4.5 ? '✓ Geçti' : '✗ Kaldı';
    tr.append(td1, td2, td3);
    return tr;
  }));
}

/* ---------- Başlangıç: URL parametreleri ---------- */
function init() {
  buildPairs();
  const params = new URLSearchParams(location.search);
  let bad = '';
  for (const which of ['fg', 'bg']) {
    if (!params.has(which)) continue;
    const rgb = parseHex(params.get(which));
    if (rgb) state[which] = rgb;
    else bad += `${SIDE_NAME[which]} rengi bağlantıda geçersiz ("${params.get(which)}"), varsayılan renk kullanıldı. `;
  }
  render(null);
  if (bad) refreshError(bad.trim() + 'Renk, 3 ya da 6 haneli HEX olmalı; örnek: ?fg=1a73e8&bg=ffffff');
}
init();
