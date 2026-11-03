// Zam Oranı Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
// Enflasyon verisi gömülü değildir: TÜFE oranını kullanıcı girer.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;
const pct = (n) => (n < 0 ? '-' : '') + '%' + fmt.format(Math.abs(round2(n)));

/** Türkçe girdiyi (25.000,50 / 25000,5 / 25000.5) sayıya çevirir. */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$|%/gi, '');
  if (!s) throw new Error(`${label} boş bırakılamaz. Bir sayı yazın (örn. 25.000).`);
  const neg = s.startsWith('-');
  if (neg) s = s.slice(1);
  if (/[^0-9.,]/.test(s) || !s) throw new Error(`${label} yalnızca rakam içermeli (örn. 25.000,50). Harf ve sembolleri silip tekrar deneyin.`);
  const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0 && ((s.match(/\./g) || []).length > 1 || /^\d{1,3}\.\d{3}$/.test(s))) s = s.replace(/\./g, '');
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 25.000,50`);
  return neg ? -n : n;
}

function positive(raw, label) {
  const n = parseNumber(raw, label);
  if (n <= 0) throw new Error(`${label} sıfırdan büyük olmalı. Pozitif bir tutar girin.`);
  return n;
}

function percent(raw, label) {
  const n = parseNumber(raw, label);
  if (n <= -100) throw new Error(`${label} -%100'den büyük olmalı. Örnek: 25 ya da -10.`);
  return n;
}

function signed(n) { return (n > 0 ? '+' : '') + pct(n); }

function compute(mode) {
  if (mode === 'yuzde') {
    const oldV = positive($('f-old').value, 'Eski maaş');
    const newV = positive($('f-new').value, 'Yeni maaş');
    const z = (newV / oldV - 1) * 100;
    return { rows: [['Zam oranı', pct(z), true], ['Artış tutarı', money(newV - oldV)], ['Eski maaş', money(oldV)], ['Yeni maaş', money(newV)]], key: pct(z) };
  }
  if (mode === 'yeni') {
    const oldV = positive($('f-old').value, 'Maaş');
    const z = percent($('f-pct').value, 'Zam yüzdesi');
    const newV = oldV * (1 + z / 100);
    return { rows: [['Yeni maaş', money(newV), true], ['Artış tutarı', money(newV - oldV)], ['Zam oranı', pct(z)], ['Eski maaş', money(oldV)]], key: money(newV) };
  }
  // Enflasyon farkı: reel değişim = (1 + zam) / (1 + enflasyon) - 1
  const oldV = positive($('f-old').value, 'Eski maaş');
  const newV = positive($('f-new').value, 'Yeni maaş');
  const e = percent($('f-cpi').value, 'Enflasyon oranı');
  const z = (newV / oldV - 1) * 100;
  const real = ((1 + z / 100) / (1 + e / 100) - 1) * 100;
  const needed = oldV * (1 + e / 100);
  const gap = newV - needed;
  return {
    rows: [
      ['Reel değişim (alım gücü)', signed(real), true],
      ['Nominal zam oranı', pct(z)],
      ['Girdiğiniz enflasyon', pct(e)],
      ['Alım gücünü korumak için gereken maaş', money(needed)],
      [gap >= 0 ? 'Enflasyonun üstünde kalan tutar' : 'Enflasyon farkı (eksik tutar)', money(Math.abs(gap))],
    ],
    key: signed(real),
    note: real < 0
      ? 'Zam, girdiğiniz enflasyonun altında kaldı; aynı sepeti alma gücünüz azaldı.'
      : (real > 0 ? 'Zam, girdiğiniz enflasyonun üzerinde; alım gücünüz arttı.' : 'Zam enflasyonla aynı; alım gücünüz değişmedi.'),
  };
}

function render() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  document.querySelectorAll('[data-for]').forEach((el) => { el.hidden = !el.dataset.for.split(' ').includes(mode); });
  $('lbl-old').textContent = mode === 'yeni' ? 'Mevcut maaş (₺)' : 'Eski maaş (₺)';
  const result = $('result');
  const err = $('error');
  showError(err, '');
  const need = { yuzde: ['f-old', 'f-new'], yeni: ['f-old', 'f-pct'], enflasyon: ['f-old', 'f-new', 'f-cpi'] }[mode];
  if (need.every((id) => !$(id).value.trim())) { result.classList.remove('is-active'); return; }
  try {
    // Alanların biri henüz boşsa kullanıcıyı hataya boğmadan bekle.
    if (need.some((id) => !$(id).value.trim())) { result.classList.remove('is-active'); return; }
    const r = compute(mode);
    const dl = $('r-rows');
    dl.textContent = '';
    for (const [label, value, strong] of r.rows) {
      const row = document.createElement('div');
      row.className = 'zm-row' + (strong ? ' is-strong' : '');
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = value;
      if (strong) dd.id = 'r-main';
      row.append(dt, dd);
      dl.appendChild(row);
    }
    $('r-note').textContent = r.note || '';
    result.classList.add('is-active');
  } catch (e) {
    result.classList.remove('is-active');
    showError(err, e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', render));
['f-old', 'f-new', 'f-pct', 'f-cpi'].forEach((id) => $(id).addEventListener('input', render));
$('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
render();
