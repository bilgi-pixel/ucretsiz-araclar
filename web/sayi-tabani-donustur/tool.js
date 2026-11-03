// Sayı Tabanı Dönüştürücü — tamamı tarayıcıda çalışır; büyük sayılar için BigInt kullanılır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';
const FRAC_DIGITS = 20; // kesir için en fazla basamak sayısı
const MAX_INT_LEN = 5000;
const MAX_FRAC_LEN = 200;

/** Kullanıcıya gösterilecek Türkçe hata. */
class InputError extends Error {}

const baseName = (b) => ({ 2: 'ikili', 8: 'sekizli', 10: 'onlu', 16: 'onaltılı' }[b] ? ({ 2: 'ikili', 8: 'sekizli', 10: 'onlu', 16: 'onaltılı' })[b] + ' tabanda' : b + ' tabanında');
const allowedDigits = (b) => (b <= 10 ? '0-' + (b - 1) : '0-9 ve A-' + DIGITS[b - 1].toUpperCase());

/* ---------- Ayrıştırma ve dönüştürme ---------- */
/** Metni verilen tabanda okur: işaret, tam kısım (BigInt) ve kesir (pay/payda BigInt). */
export function parseInBase(raw, base) {
  let s = String(raw).trim().replace(/[\s_]/g, '').replace(',', '.');
  if (!s) throw new InputError('Bir sayı girin. Örnek: 255 ya da FF.');
  let neg = false;
  if (s[0] === '-' || s[0] === '−') { neg = true; s = s.slice(1); } else if (s[0] === '+') s = s.slice(1);
  // 0x / 0b / 0o önekleri yalnızca ilgili tabanda kabul edilir.
  const prefix = { 16: /^0x/i, 2: /^0b/i, 8: /^0o/i }[base];
  if (prefix) s = s.replace(prefix, '');
  const parts = s.split('.');
  if (parts.length > 2) throw new InputError('Sayıda birden fazla ondalık ayırıcı var. Yalnızca bir virgül ya da nokta kullanın.');
  const [ip, fp = ''] = parts;
  if (!ip && !fp) throw new InputError('Bir sayı girin. Örnek: 255 ya da FF.');
  if (ip.length > MAX_INT_LEN || fp.length > MAX_FRAC_LEN) throw new InputError('Sayı çok uzun. Tam kısım en fazla ' + MAX_INT_LEN + ', kesir en fazla ' + MAX_FRAC_LEN + ' basamak olabilir.');
  for (const ch of ip + fp) {
    const d = DIGITS.indexOf(ch.toLowerCase());
    if (d < 0 || d >= base) {
      throw new InputError('"' + ch + '" karakteri ' + baseName(base) + ' geçerli değil. Bu tabanda yalnızca ' + allowedDigits(base) + ' kullanılabilir; tabanı ya da sayıyı düzeltin.');
    }
  }
  const B = BigInt(base);
  let int = 0n;
  for (const ch of ip) int = int * B + BigInt(DIGITS.indexOf(ch.toLowerCase()));
  let num = 0n, den = 1n;
  for (const ch of fp) { num = num * B + BigInt(DIGITS.indexOf(ch.toLowerCase())); den *= B; }
  return { neg, int, num, den };
}

/** Ayrıştırılmış sayıyı hedef tabana çevirir; kesir 20 basamakta kesilir. */
export function formatInBase(p, base) {
  const B = BigInt(base);
  let intStr = p.int.toString(base).toUpperCase();
  let frac = '', truncated = false;
  let num = p.num;
  while (num > 0n && frac.length < FRAC_DIGITS) {
    num *= B;
    frac += DIGITS[Number(num / p.den)].toUpperCase();
    num %= p.den;
  }
  if (num > 0n) truncated = true;
  const isZero = p.int === 0n && p.num === 0n;
  return { text: (p.neg && !isZero ? '-' : '') + intStr + (frac ? '.' + frac : ''), truncated, intStr };
}

const groupBy = (s, n) => s.replace(new RegExp('(?=(?:.{' + n + '})+$)', 'g'), ' ').trim();

/* ---------- Sekmeler ---------- */
function initTabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    showError($('error'), '');
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (ev) => {
      const d = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      ev.preventDefault();
      const n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus(); select(n);
    });
  });
}

/* ---------- Pano ---------- */
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* yedeğe geç */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.append(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}
const say = (msg) => { $('status').textContent = msg; };

/* ---------- Sekme 1: taban dönüştürme ---------- */
function fillBaseSelect(sel, def) {
  for (let b = 2; b <= 36; b++) {
    const o = document.createElement('option');
    o.value = String(b);
    o.textContent = b + (({ 2: ' – ikili', 8: ' – sekizli', 10: ' – onlu', 16: ' – onaltılı', 36: ' – 0-9 ve A-Z' })[b] || '');
    if (b === def) o.selected = true;
    sel.append(o);
  }
}

function convert(showErr) {
  const err = $('error');
  try {
    const from = +$('from').value, to = +$('to').value;
    const p = parseInBase($('value').value, from);
    const out = {};
    let truncated = false;
    for (const b of [2, 8, 10, 16, to]) {
      const r = formatInBase(p, b);
      out[b] = r;
      if (r.truncated) truncated = true;
    }
    $('r-2').textContent = out[2].text;
    $('r-8').textContent = out[8].text;
    $('r-10').textContent = out[10].text;
    $('r-16').textContent = out[16].text;
    $('r-custom').textContent = out[to].text;
    $('r-custom-label').textContent = 'Taban ' + to;
    $('r-bits').textContent = groupBy(out[2].intStr, 4) + ' (' + (out[2].intStr === '0' ? 1 : out[2].intStr.length) + ' bit)';
    $('conv-note').textContent = truncated ? 'Kesirli kısım ' + FRAC_DIGITS + ' basamakta kesildi; bu sayının bazı tabanlardaki gösterimi sonsuza kadar sürer.' : '';
    $('conv-result').hidden = false;
    showError(err, '');
    return true;
  } catch (e) {
    if (!(e instanceof InputError)) throw e;
    $('conv-result').hidden = true;
    if (showErr) showError(err, e.message); else showError(err, '');
    return false;
  }
}

/* ---------- Sekme 2: bit işlemleri ---------- */
const BIT_OPS_B = new Set(['and', 'or', 'xor']);
const BIT_OPS_N = new Set(['shl', 'shr', 'ushr']);

function parseBitValue(raw, base, w, label) {
  const p = parseInBase(raw, base);
  if (p.num !== 0n) throw new InputError(label + ' için yalnızca tam sayı girin. Bit işlemlerinde ondalık kesir kullanılamaz.');
  const v = p.neg ? -p.int : p.int;
  const min = -(1n << BigInt(w - 1)), max = (1n << BigInt(w)) - 1n;
  if (v < min || v > max) throw new InputError(label + ' değeri ' + w + ' bitlik aralığa (' + min + ' ile ' + max + ') sığmıyor. Bit genişliğini artırın ya da daha küçük bir sayı girin.');
  return BigInt.asUintN(w, v);
}

function bitCalc(showErr) {
  const err = $('error');
  try {
    const w = +$('bit-width').value, base = +$('bit-base').value, op = $('bit-op').value;
    const W = BigInt(w);
    const a = parseBitValue($('bit-a').value, base, w, 'A');
    let b = 0n;
    if (BIT_OPS_B.has(op)) b = parseBitValue($('bit-b').value, base, w, 'B');
    let n = 0;
    if (BIT_OPS_N.has(op)) {
      const raw = $('bit-n').value.trim();
      n = /^\d+$/.test(raw) ? Number(raw) : -1;
      if (n < 0 || n > w) throw new InputError('Kaydırma miktarı 0 ile ' + w + ' arasında bir tam sayı olmalı.');
    }
    let r;
    switch (op) {
      case 'show': r = a; break;
      case 'and': r = a & b; break;
      case 'or': r = a | b; break;
      case 'xor': r = a ^ b; break;
      case 'not': r = BigInt.asUintN(w, ~a); break;
      case 'shl': r = BigInt.asUintN(w, a << BigInt(n)); break;
      case 'shr': r = BigInt.asUintN(w, BigInt.asIntN(w, a) >> BigInt(n)); break; // işaret korunur
      case 'ushr': r = a >> BigInt(n); break; // sıfır dolar
    }
    const bin = (v) => v.toString(2).padStart(w, '0');
    $('b-a-bin').textContent = groupBy(bin(a), 4);
    $('b-b-row').hidden = !BIT_OPS_B.has(op);
    $('b-b-bin').textContent = BIT_OPS_B.has(op) ? groupBy(bin(b), 4) : '';
    $('b-bin').textContent = bin(r);
    $('b-bin4').textContent = groupBy(bin(r), 4);
    $('b-hex').textContent = '0x' + r.toString(16).toUpperCase().padStart(w / 4, '0');
    $('b-udec').textContent = r.toString(10);
    $('b-sdec').textContent = BigInt.asIntN(w, r).toString(10);
    $('b-width-note').textContent = w + ' bit işaretli (two\'s complement) aralığı: ' + (-(1n << (W - 1n))) + ' ile ' + ((1n << (W - 1n)) - 1n) + '; işaretsiz: 0 ile ' + ((1n << W) - 1n) + '.';
    $('bit-result').hidden = false;
    showError(err, '');
  } catch (e) {
    if (!(e instanceof InputError)) throw e;
    $('bit-result').hidden = true;
    showError(err, showErr ? e.message : '');
  }
}

function syncBitFields() {
  const op = $('bit-op').value;
  $('bit-b-field').hidden = !BIT_OPS_B.has(op);
  $('bit-n-field').hidden = !BIT_OPS_N.has(op);
}

/* ---------- Sekme 3: karakter kodları ---------- */
const CTRL = { 0: 'NUL', 7: 'BEL', 8: 'BS', 9: 'TAB', 10: 'LF (satır sonu)', 13: 'CR', 27: 'ESC', 32: 'boşluk', 127: 'DEL' };
const MAX_CHARS = 500;
let lastCodeLines = '';

function renderCodes() {
  const text = $('text').value;
  const all = Array.from(text);
  const chars = all.slice(0, MAX_CHARS);
  const body = $('cp-body');
  body.textContent = '';
  const enc = new TextEncoder();
  const lines = [];
  chars.forEach((ch) => {
    const cp = ch.codePointAt(0);
    const hex = cp.toString(16).toUpperCase();
    const u = 'U+' + hex.padStart(4, '0');
    const bytes = [...enc.encode(ch)].map((x) => x.toString(16).toUpperCase().padStart(2, '0')).join(' ');
    const shown = CTRL[cp] ?? (cp < 32 ? 'kontrol' : ch);
    const bin = cp.toString(2).padStart(cp < 256 ? 8 : 16, '0');
    const tr = document.createElement('tr');
    [shown, u, String(cp), '0x' + hex, bin, bytes].forEach((val) => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.append(td);
    });
    body.append(tr);
    lines.push([JSON.stringify(ch).slice(1, -1), u, cp, '0x' + hex, bin, bytes].join('\t'));
  });
  lastCodeLines = lines.join('\n');
  const utf8Len = enc.encode(text).length;
  $('cp-summary').textContent = all.length
    ? all.length + ' karakter (kod noktası), UTF-8 olarak ' + utf8Len + ' bayt.' + (all.length > MAX_CHARS ? ' Tabloda ilk ' + MAX_CHARS + ' karakter gösteriliyor.' : '')
    : '';
  $('cp-wrap').hidden = !all.length;
  $('cp-copy').hidden = !all.length;
}

/* ---------- Başlatma ---------- */
function init() {
  if (!$('from')) return;
  fillBaseSelect($('from'), 10);
  fillBaseSelect($('to'), 3);
  initTabs();

  $('conv-form').addEventListener('submit', (ev) => { ev.preventDefault(); convert(true); });
  ['value', 'from', 'to'].forEach((id) => $(id).addEventListener('input', () => { if ($('value').value.trim()) convert(false); else { $('conv-result').hidden = true; showError($('error'), ''); } }));
  $('swap').addEventListener('click', () => {
    // Özel tabandaki sonucu girişe alır, giriş ve hedef tabanlarını yer değiştirir.
    const to = $('to').value, oldFrom = $('from').value;
    if (convert(true)) {
      const r = $('r-custom').textContent;
      $('from').value = to;
      $('to').value = oldFrom;
      $('value').value = r;
      convert(true);
    }
  });
  $('conv-clear').addEventListener('click', () => { $('value').value = ''; $('conv-result').hidden = true; showError($('error'), ''); $('value').focus(); });

  $('bit-form').addEventListener('submit', (ev) => { ev.preventDefault(); bitCalc(true); });
  ['bit-a', 'bit-b', 'bit-base', 'bit-width', 'bit-op', 'bit-n'].forEach((id) => $(id).addEventListener('input', () => {
    syncBitFields();
    if ($('bit-a').value.trim()) bitCalc(false);
  }));
  syncBitFields();

  $('text').addEventListener('input', renderCodes);
  $('cp-copy').addEventListener('click', async () => say((await copyText(lastCodeLines)) ? 'Kod listesi kopyalandı.' : 'Kopyalanamadı; tabloyu elle seçip kopyalayın.'));

  // Kopyala düğmeleri: data-copy hedef elemanın metnini alır.
  document.addEventListener('click', async (ev) => {
    const b = ev.target.closest('[data-copy]');
    if (!b) return;
    const t = $(b.dataset.copy).textContent;
    if (t) say((await copyText(t)) ? 'Kopyalandı: ' + t : 'Kopyalanamadı; değeri elle seçip kopyalayın.');
  });
}

init();
