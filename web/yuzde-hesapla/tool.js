// Yüzde Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmtNum = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
const fmtMoney = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = (n) => `%${fmtNum.format(n)}`;

/* ---------- Sayı ayrıştırma (1.250,50 / 1250,5 / 1250.5 / -12,5) ---------- */
export function parseNumber(raw, label) {
  let s = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 1.250,50). Harf ve sembolleri silip tekrar deneyin.`);
  let neg = false;
  if (/^[+-]/.test(s)) { neg = s[0] === '-'; s = s.slice(1); }
  if (/[+-]/.test(s) || !/\d/.test(s)) throw new Error(`${label} okunamadı. Eksi işareti yalnızca başta olabilir; örnek biçim: 1.250,50`);
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', ''); // "1.250" Türkçe binlik kabul edilir
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 1.250,50`);
  return neg ? -n : n;
}

/* ---------- Modlar: etiketler ve hesap çekirdeği ---------- */
export const MODES = {
  yuzdesi: {
    a: 'Sayı (A)', b: 'Yüzde (B, %)', ph: ['örn. 2.500', 'örn. 18'],
    title: (A, B) => `${fmtNum.format(A)} sayısının ${fmtPct(B)}'si`,
    calc: (A, B) => {
      const v = (A * B) / 100;
      return { rows: [['Sonuç', fmtNum.format(v)], ['A + sonuç', fmtNum.format(A + v)], ['A − sonuç', fmtNum.format(A - v)]] };
    },
  },
  kacta: {
    a: 'Parça (A)', b: 'Bütün (B)', ph: ['örn. 50', 'örn. 200'],
    title: (A, B) => `${fmtNum.format(A)}, ${fmtNum.format(B)} sayısının yüzde kaçı`,
    calc: (A, B) => {
      if (B === 0) throw new Error('Bütün (B) sıfır olamaz; sıfırın yüzdesi tanımsızdır. B alanına sıfırdan farklı bir sayı yazın.');
      const v = (A / B) * 100;
      return { rows: [['Sonuç', fmtPct(v)], ['Oran (A / B)', fmtNum.format(A / B)]] };
    },
  },
  degisim: {
    a: 'Başlangıç değeri (A)', b: 'Yeni değer (B)', ph: ['örn. 800', 'örn. 1.000'],
    title: (A, B) => `${fmtNum.format(A)} değerinden ${fmtNum.format(B)} değerine değişim`,
    calc: (A, B) => {
      if (A === 0) throw new Error('Başlangıç değeri (A) sıfır olamaz; sıfırdan yüzde değişim hesaplanamaz. A alanına sıfırdan farklı bir değer yazın.');
      const v = ((B - A) / Math.abs(A)) * 100;
      return { rows: [['Değişim', `${v >= 0 ? 'Artış' : 'Azalış'} ${fmtPct(Math.abs(v))}`], ['Fark (B − A)', fmtNum.format(B - A)]] };
    },
  },
  indirim: {
    a: 'Fiyat (A, ₺)', b: 'İndirim oranı (B, %)', ph: ['örn. 1.200', 'örn. 15'],
    title: (A, B) => `${fmtMoney.format(A)} ₺ fiyatta ${fmtPct(B)} indirim`,
    calc: (A, B) => {
      if (B > 100 || B < 0) throw new Error('İndirim oranı 0 ile 100 arasında olmalı. Oranı yüzde olarak yazın (örn. 15).');
      const disc = (A * B) / 100;
      return { rows: [['İndirimli fiyat', `${fmtMoney.format(A - disc)} ₺`], ['İndirim tutarı', `${fmtMoney.format(disc)} ₺`]] };
    },
  },
  uygula: {
    a: 'Değer (A)', b: 'Oran (B, %)', ph: ['örn. 1.000', 'örn. 18'], dir: true,
    title: (A, B, dir) => `${fmtNum.format(A)} değerine ${fmtPct(B)} ${dir === 'azalis' ? 'azalış' : 'artış'}`,
    calc: (A, B, dir) => {
      const delta = (A * B) / 100;
      const v = dir === 'azalis' ? A - delta : A + delta;
      return { rows: [['Yeni değer', fmtNum.format(v)], [dir === 'azalis' ? 'Azalan miktar' : 'Eklenen miktar', fmtNum.format(delta)]] };
    },
  },
};

/** Saf hesap: girişleri ayrıştırır, sonuç nesnesi döndürür (hata fırlatabilir; boş girişte null). */
export function compute(mode, rawA, rawB, dir = 'artis') {
  const m = MODES[mode];
  const A = parseNumber(rawA, 'A değeri');
  const B = parseNumber(rawB, 'B değeri');
  if (A === null || B === null) return null;
  const r = m.calc(A, B, dir);
  return { ...r, title: m.title(A, B, dir) };
}

/* ---------- Arayüz ---------- */
if (typeof document !== 'undefined' && $('form')) {
  const el = {
    a: $('f-a'), b: $('f-b'), la: $('l-a'), lb: $('l-b'), dir: $('f-dir'), dirWrap: $('dir-wrap'),
    err: $('error'), result: $('result'), rows: $('r-rows'), title: $('r-title'),
    copy: $('copy'), status: $('copy-status'),
  };
  let lastText = '';
  const currentMode = () => document.querySelector('input[name="mode"]:checked').value;

  function applyLabels() {
    const m = MODES[currentMode()];
    el.la.textContent = m.a; el.lb.textContent = m.b;
    el.a.placeholder = m.ph[0]; el.b.placeholder = m.ph[1];
    el.dirWrap.hidden = !m.dir;
  }

  function update() {
    el.status.textContent = '';
    try {
      const r = compute(currentMode(), el.a.value, el.b.value, el.dir.value);
      showError(el.err, '');
      if (!r) { el.result.classList.remove('is-active'); lastText = ''; return; }
      el.title.textContent = r.title;
      el.rows.replaceChildren();
      r.rows.forEach(([k, v], i) => {
        const row = document.createElement('div');
        row.className = 'yz-row' + (i === 0 ? ' is-strong' : '');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = v;
        row.append(dt, dd); el.rows.append(row);
      });
      lastText = `${r.title}: ${r.rows.map(([k, v]) => `${k} ${v}`).join(' · ')}`;
      el.result.classList.add('is-active');
    } catch (e) {
      el.result.classList.remove('is-active'); lastText = '';
      showError(el.err, e.message);
    }
  }

  document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => { applyLabels(); update(); }));
  [el.a, el.b, el.dir].forEach((i) => i.addEventListener('input', update));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  el.copy.addEventListener('click', async () => {
    if (!lastText) { el.status.textContent = 'Kopyalanacak sonuç yok; önce iki değeri girin.'; return; }
    try { await navigator.clipboard.writeText(lastText); el.status.textContent = 'Sonuç kopyalandı.'; }
    catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  applyLabels();
}
