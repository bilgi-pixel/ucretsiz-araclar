// Üslü Sayı, Kök ve Logaritma Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** "-2,5", "1e3" gibi girdiyi sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '').replace(',', '.');
  return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t) ? Number(t) : NaN;
}

/** 12 anlamlı haneye yuvarlayıp okunur yazar (kayan nokta gürültüsünü temizler). */
export function fmt(x) {
  if (!Number.isFinite(x)) return String(x);
  if (x === 0) return '0';
  const a = Math.abs(x);
  const r = Number(x.toPrecision(12));
  if (a >= 1e15 || a < 1e-9) return r.toExponential().replace('e+', ' × 10^').replace('e-', ' × 10^-').replace('.', ',');
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 10 }).format(r);
}

const BAD = (msg) => ({ ok: false, text: msg });
const OK = (v) => ({ ok: true, value: v, text: fmt(v) });

/** a üssü b. */
export function power(a, b) {
  const v = Math.pow(a, b);
  if (Number.isNaN(v)) return BAD('tanımsız (negatif tabanın kesirli kuvveti gerçek sayı değildir)');
  if (!Number.isFinite(v)) return BAD('çok büyük (sonuç taşıyor)');
  return OK(v);
}

/** a sayısının b'inci dereceden kökü. */
export function root(a, b) {
  if (b === 0) return BAD('tanımsız (kök derecesi 0 olamaz)');
  if (a < 0) {
    if (Number.isInteger(b) && Math.abs(b) % 2 === 1) return OK(-Math.pow(-a, 1 / b));
    return BAD('tanımsız (negatif sayının çift dereceden kökü gerçek sayı değildir)');
  }
  return OK(Math.pow(a, 1 / b));
}

/** a sayısının b tabanında logaritması. */
export function logBase(a, b) {
  if (a <= 0) return BAD('tanımsız (logaritma yalnızca pozitif sayılarda tanımlıdır)');
  if (b <= 0 || b === 1) return BAD('tanımsız (taban pozitif olmalı ve 1 olamaz)');
  const v = b === 2 ? Math.log2(a) : b === 10 ? Math.log10(a) : Math.log(a) / Math.log(b);
  return OK(v);
}

/** Tüm sonuçları üretir; geçersiz girdide Türkçe, çözüm öneren Error fırlatır. */
export function compute(aRaw, bRaw) {
  const a = parseNum(aRaw), b = parseNum(bRaw);
  if (Number.isNaN(a)) throw new Error('"Sayı (a)" alanına geçerli bir sayı yazın (örn. 1024, -8 ya da 2,5). Harf ve birim eki kullanmayın.');
  if (Number.isNaN(b)) throw new Error('"Üs / taban / kök derecesi (b)" alanına geçerli bir sayı yazın (örn. 2, 10 ya da 0,5).');
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Girilen sayı çok büyük. Bilimsel gösterimle (örn. 1e12) daha küçük bir değer deneyin.');
  return {
    a, b,
    pow: power(a, b),
    root: root(a, b),
    logb: logBase(a, b),
    log10: logBase(a, 10),
    log2: logBase(a, 2),
    ln: a > 0 ? OK(Math.log(a)) : BAD('tanımsız (logaritma yalnızca pozitif sayılarda tanımlıdır)'),
  };
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('r-big').textContent = r.pow.ok ? `${fmt(r.a)} ^ ${fmt(r.b)} = ${r.pow.text}` : `${fmt(r.a)} ^ ${fmt(r.b)}: ${r.pow.text}`;
  $('r-pow').textContent = r.pow.text;
  $('r-root').textContent = r.root.text;
  $('r-logb').textContent = r.logb.text;
  $('r-log10').textContent = r.log10.text;
  $('r-log2').textContent = r.log2.text;
  $('r-ln').textContent = r.ln.text;
  $('l-pow').textContent = `${fmt(r.a)} üssü ${fmt(r.b)}`;
  $('l-root').textContent = `${fmt(r.a)} sayısının ${fmt(r.b)}. dereceden kökü`;
  $('l-logb').textContent = `log taban ${fmt(r.b)} (${fmt(r.a)})`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('a').value, $('b').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('a').value = ''; $('b').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('a').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `a = ${fmt(last.a)}, b = ${fmt(last.b)}: a^b = ${last.pow.text}; b. kök = ${last.root.text}; log_b(a) = ${last.logb.text}; log10(a) = ${last.log10.text}; ln(a) = ${last.ln.text}.`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
