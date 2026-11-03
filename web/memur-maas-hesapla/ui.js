// Memur ve öğretmen maaşı sayfalarının ortak arayüz yardımcıları. Hiçbir veri ağa gitmez.
import { round2, lookupGosterge } from './calc.js';

export const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const money = (n) => `${fmt.format(round2(n))} ₺`;
export const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

/** Türkçe sayı girdisini (8,5 / 8.5 / 1.500,25) sayıya çevirir; boşsa null, bozuksa hata fırlatır. */
export function parseNum(raw, label) {
  const s0 = String(raw ?? '').trim().replace(/\s/g, '');
  if (!s0) return null;
  if (s0.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir değer girin.`);
  if (/[^0-9.,]/.test(s0)) throw new Error(`${label} yalnızca rakam içermeli (örn. 8,5). Harf ve sembolleri silip tekrar deneyin.`);
  let s = s0;
  const lc = s.lastIndexOf(','), ld = s.lastIndexOf('.');
  if (lc >= 0 && ld >= 0) s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lc >= 0) s = s.replace(',', '.');
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 8,5`);
  return n;
}

/** Zorunlu sayı alanı okur; boş, negatif ve aşırı büyük değerlerde Türkçe hata verir. */
export function reqNum(id, label, { allowZero = false, max = 1e7 } = {}) {
  const n = parseNum($(id).value, label);
  if (n === null) throw new Error(`${label} boş bırakılamaz. Güncel değeri girin.`);
  if (n === 0 && !allowZero) throw new Error(`${label} sıfırdan büyük olmalı. Güncel değeri girin.`);
  if (n > max) throw new Error(`${label} çok büyük görünüyor. Değeri kontrol edin.`);
  return n;
}

export async function loadParams(fallback) {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) return await res.json();
  } catch { /* çevrimdışı: yerleşik değerler */ }
  return fallback;
}

/** Derece seçeneklerini doldurur, kademe listesini derece değişince yeniler ve göstergeyi yazar. */
export function setupGosterge(params, onChange) {
  const dSel = $('f-derece'), kSel = $('f-kademe'), g = $('f-gosterge');
  for (let d = 1; d <= 15; d++) dSel.add(new Option(`${d}. derece`, String(d)));
  const fillKademe = (keep) => {
    const row = params.gosterge_tablosu[dSel.value] || [];
    const prev = keep ? Number(kSel.value) : 1;
    kSel.textContent = '';
    row.forEach((_, i) => kSel.add(new Option(`${i + 1}. kademe`, String(i + 1))));
    kSel.value = String(Math.min(Math.max(prev, 1), row.length));
  };
  const syncGosterge = () => { g.value = String(lookupGosterge(params.gosterge_tablosu, Number(dSel.value), Number(kSel.value)) ?? ''); };
  dSel.addEventListener('change', () => { fillKademe(true); syncGosterge(); onChange(); });
  kSel.addEventListener('change', () => { syncGosterge(); onChange(); });
  dSel.value = '9';
  fillKademe(false);
  syncGosterge();
}

/** Ortak girdileri okur (katsayılar, gösterge, aile, rejim). */
export function readCommon() {
  const gosterge = reqNum('f-gosterge', 'Gösterge', { max: 20000 });
  const aylikKatsayi = reqNum('f-ka', 'Aylık katsayı', { max: 1000 });
  const tabanKatsayi = reqNum('f-kt', 'Taban aylık katsayısı', { max: 1000 });
  const yanOdemeKatsayi = reqNum('f-ky', 'Yan ödeme katsayısı', { allowZero: true, max: 1000 });
  const ekGosterge = reqNum('f-ek', 'Ek gösterge', { allowZero: true, max: 20000 });
  const yanOdemePuani = reqNum('f-yan', 'Yan ödeme puanı', { allowZero: true, max: 100000 });
  const ozelHizmetOrani = reqNum('f-oht', 'Tazminat oranı', { allowZero: true, max: 500 });
  const cocuk = Math.floor(reqNum('f-cocuk', 'Çocuk sayısı', { allowZero: true, max: 20 }));
  const cocuk06 = Math.floor(reqNum('f-cocuk06', '0-6 yaş çocuk sayısı', { allowZero: true, max: 20 }));
  return {
    gosterge, ekGosterge, aylikKatsayi, tabanKatsayi, yanOdemeKatsayi, yanOdemePuani, ozelHizmetOrani,
    es: $('f-es').checked, cocuk, cocuk06, eski5434: $('f-eski').checked, istisna: $('f-istisna').checked,
  };
}

export function setRow(id, v) { $(id).textContent = v; }

/** 12 aylık tabloyu doldurur. */
export function fillTable(calc) {
  const tbody = $('tbl').querySelector('tbody');
  tbody.textContent = '';
  const add = (parent, cells, head) => {
    const tr = document.createElement('tr');
    cells.forEach((c, i) => {
      const td = document.createElement(i === 0 ? 'th' : 'td');
      if (i === 0 && head) td.scope = 'row';
      td.textContent = c;
      tr.appendChild(td);
    });
    parent.appendChild(tr);
  };
  for (const r of calc.rows) add(tbody, [MONTHS[r.ay - 1], money(r.brut), money(r.kesenek + r.gss), money(r.gelirVergisi), money(r.damga), money(r.net)], true);
  const foot = $('tbl').querySelector('tfoot');
  foot.textContent = '';
  const t = calc.totals;
  add(foot, ['Yıllık toplam', money(t.brut), money(t.kesenek + t.gss), money(t.gelirVergisi), money(t.damga), money(t.net)], false);
}

/** Parametre bilgi satırını doldurur. */
export function fillParamInfo(params) {
  $('p-updated').textContent = new Date(params.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('p-source').textContent = params.kaynak;
}

/** Katsayı alanlarını parametrelerle doldurur. */
export function fillCoefficients(params) {
  const d = params.donemler[$('f-donem').value];
  if (!d) return;
  $('f-ka').value = String(d.aylik_katsayi).replace('.', ',');
  $('f-kt').value = String(d.taban_aylik_katsayisi).replace('.', ',');
  $('f-ky').value = String(d.yan_odeme_katsayisi).replace('.', ',');
}

/** Dönem listesini doldurur (varsayılan: parametredeki güncel dönem) ve değişince katsayıları yeniler. */
export function setupDonem(params, onChange) {
  const sel = $('f-donem');
  for (const [k, v] of Object.entries(params.donemler)) sel.add(new Option(v.ad, k));
  sel.value = params.varsayilan_donem;
  fillCoefficients(params);
  sel.addEventListener('change', () => { fillCoefficients(params); onChange(); });
}
