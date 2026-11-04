// Saat Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz saatler, süreler ve açtığınız CSV dosyası hiçbir sunucuya gönderilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
export const DAY = 86400;
const MINUS = '−';
const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const MAX_SEC = 1e10; // ~2,7 milyon saat; daha büyüğü yazım hatasıdır

const nfDec = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const nfNum = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const nfInt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const nfMoney = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- Metin yardımcıları ---------- */

/** Eksi/tire çeşitlerini, bölünmez boşlukları ve büyük harfleri tek biçime getirir. */
function norm(s) {
  return String(s ?? '')
    .replace(/[−–—]/g, '-')
    .replace(/[  ﻿]/g, ' ')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/\s+/g, ' ')
    .replace(/\s*([:.])\s*/g, '$1')
    .trim();
}
const pad2 = (n) => String(n).padStart(2, '0');
function parts(sec) {
  const a = Math.abs(Math.round(sec));
  return { h: Math.floor(a / 3600), m: Math.floor((a % 3600) / 60), s: a % 60 };
}

/** Türkçe ondalık (virgül) ve binlik (nokta) biçimlerini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL|tl/g, '');
  const neg = t.startsWith('-');
  if (neg) t = t.slice(1);
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(','), hasD = t.includes('.');
  if (hasC && hasD) t = t.replace(/\./g, '').replace(',', '.');
  else if (hasC) t = t.replace(',', '.');
  else if (hasD && /^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if ((t.match(/\./g) || []).length > 1) return NaN;
  return neg ? -Number(t) : Number(t);
}

/* ---------- Ayrıştırma ---------- */

/**
 * Günün saatini okur → gece yarısından itibaren saniye.
 * Kabul: 8:30, 08:30, 8.30, 0830, 8, 08:30:15, 24:00, 8:30 PM, 8:30 ös.
 * Hata durumunda { error: 'empty'|'format'|'minute'|'second'|'hour'|'ampm' } döner.
 */
export function parseClock(input) {
  let s = norm(input);
  if (!s) return { error: 'empty' };
  let mer = '';
  const mm = s.match(/^(.*?)\s*(a\.?m\.?|p\.?m\.?|öö|ös)$/);
  if (mm) { s = mm[1].trim(); mer = /^(p|ös)/.test(mm[2]) ? 'pm' : 'am'; }
  let h, mi = 0, se = 0, m;
  if ((m = s.match(/^(\d{1,2})(?:[:.](\d{2})(?:[:.](\d{2}))?)?$/))) {
    h = +m[1]; mi = m[2] ? +m[2] : 0; se = m[3] ? +m[3] : 0;
  } else if ((m = s.match(/^(\d{1,2})(\d{2})$/))) {
    h = +m[1]; mi = +m[2];
  } else return { error: 'format' };
  if (mi > 59) return { error: 'minute' };
  if (se > 59) return { error: 'second' };
  if (mer) {
    if (h < 1 || h > 12) return { error: 'ampm' };
    h = (h % 12) + (mer === 'pm' ? 12 : 0);
  }
  if (h > 24 || (h === 24 && (mi || se))) return { error: 'hour' };
  return { sec: h * 3600 + mi * 60 + se };
}

const UNITS = {
  saat: 3600, sa: 3600, s: 3600, h: 3600, hr: 3600, hrs: 3600, hour: 3600, hours: 3600,
  dakika: 60, dak: 60, dk: 60, d: 60, min: 60, mins: 60, m: 60, minute: 60, minutes: 60,
  saniye: 1, sn: 1, sec: 1, secs: 1, second: 1, seconds: 1,
};

/**
 * Süre okur → saniye (işaretli).
 * Kabul: 1:45, 01:45:00, 125:30, 7.30 (= 7 sa 30 dk), 1,5 / 1.5 (birimsiz → bare), 90 dk, 2 sa 15 dk, 1h30m45s, 45 sn, -0:50.
 * bare: birimsiz sayının birimi ('h' saat, 'min' dakika, 'sec' saniye).
 * dotHM: true ise "7.30" saat.dakika (7 sa 30 dk) okunur; false ise nokta ondalık ayırıcıdır (7,30 saat).
 */
export function parseDuration(input, { bare = 'h', dotHM = true } = {}) {
  let s = norm(input);
  if (!s) return { error: 'empty' };
  let sign = 1;
  if (s[0] === '+' || s[0] === '-') { if (s[0] === '-') sign = -1; s = s.slice(1).trim(); }
  if (!s) return { error: 'format' };
  let total, m;
  if ((m = s.match(/^(\d+):(\d{2})(?::(\d{2}))?$/))) {
    if (+m[2] > 59) return { error: 'minute' };
    if (m[3] && +m[3] > 59) return { error: 'second' };
    total = +m[1] * 3600 + +m[2] * 60 + (m[3] ? +m[3] : 0);
  } else if (dotHM && (m = s.match(/^(\d+)\.(\d{2})$/))) {
    // Türkçe gündelik yazımda "7.30" = 7 saat 30 dakika
    if (+m[2] > 59) return { error: 'minute' };
    total = +m[1] * 3600 + +m[2] * 60;
  } else if (/^(\d+([.,]\d+)?|[.,]\d+)$/.test(s)) {
    const v = Number(s.replace(',', '.'));
    total = v * (bare === 'min' ? 60 : bare === 'sec' ? 1 : 3600);
  } else {
    // Birimli yazım: "2 sa 15 dk", "90dk", "1,5 saat", "1h30m"
    const re = /(\d+(?:[.,]\d+)?)\s*([a-zçğöşü]+)\.?\s*/y;
    let pos = 0, prev = 0;
    total = 0;
    while (pos < s.length) {
      re.lastIndex = pos;
      const t = re.exec(s);
      if (!t) return { error: 'format' };
      let u = UNITS[t[2]];
      if (!u) return { error: 'unit', unit: t[2] };
      // "s" tek başına saattir (2 s 15 dk); dakikadan sonra gelirse saniyedir (1h30m45s)
      if (t[2] === 's' && prev === 60) u = 1;
      prev = u;
      total += Number(t[1].replace(',', '.')) * u;
      pos = re.lastIndex;
    }
  }
  if (!Number.isFinite(total) || total > MAX_SEC) return { error: 'big' };
  const v = Math.round(total);
  return { sec: v === 0 ? 0 : sign * v };
}

const DATE_RE = /^\d{1,4}[./-]\d{1,2}[./-]\d{1,4}(?:[ T]\d{1,2}[:.]\d{2}(?:[:.]\d{2})?)?$/;
/** Virgül iki rakam arasındaysa ondalık sayılır (1,5); aksi hâlde CSV ayırıcıdır. */
function splitCommas(p) {
  if (p.includes(':')) return p.split(',');
  const raw = p.split(',');
  const out = [raw[0]];
  for (let k = 1; k < raw.length; k++) {
    const prev = out[out.length - 1];
    if (/\d$/.test(prev) && /^\d/.test(raw[k])) out[out.length - 1] = prev + ',' + raw[k];
    else out.push(raw[k]);
  }
  return out;
}

/**
 * Çok satırlı listeyi (yapıştırılmış CSV dahil) okur ve toplar.
 * Boş satırlar, sayı içermeyen başlık hücreleri ve tarih hücreleri atlanır.
 */
export function sumList(text, opts = {}) {
  const items = [];
  let skipped = 0;
  const lines = String(text ?? '').replace(/^﻿/, '').split(/\r\n|\r|\n/);
  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].split(/[\t;]/).flatMap(splitCommas);
    for (let cell of cells) {
      cell = cell.trim().replace(/^"(.*)"$/, '$1').trim();
      if (!cell) continue;
      if (DATE_RE.test(cell) || !/\d/.test(cell)) { skipped++; continue; }
      // "1:45 + 2:30 − 0:50" gibi tek satırlık ifadeleri terimlere ayır
      const terms = cell.replace(/[−–—]/g, '-').split(/(?=[+-])/).map((t) => t.trim()).filter(Boolean);
      for (const term of terms) {
        const r = parseDuration(term, opts);
        if (r.error) return { error: r.error, unit: r.unit, line: i + 1, raw: term };
        items.push({ sec: r.sec, line: i + 1, raw: term });
      }
    }
  }
  let total = 0, plus = 0, minus = 0;
  for (const it of items) { total += it.sec; if (it.sec < 0) minus++; else plus++; }
  return { items, skipped, total, plus, minus };
}

/* ---------- Hesaplar ---------- */

/** İki saat arası: bitiş başlangıçtan küçükse (ya da forceNext) ertesi gün sayılır. */
export function calcSpan(start, end, breakSec = 0, forceNext = false) {
  let e = end, nextDay = false;
  if (e < start || forceNext) { e += DAY; nextDay = true; }
  const gross = e - start;
  return { gross, net: gross - breakSec, nextDay };
}

/** Saate süre ekler/çıkarır → yeni saat ve gün kayması. */
export function addToClock(clockSec, deltaSec) {
  const total = clockSec + deltaSec;
  const dayShift = Math.floor(total / DAY);
  return { time: total - dayShift * DAY, dayShift };
}

/** Haftalık toplam; yasal sınırı aşan kısım fazla çalışma. */
export function splitWeek(totalSec, limitHours = 45) {
  const over = Math.max(0, totalSec - limitHours * 3600);
  return { total: totalSec, normal: totalSec - over, over };
}

/* ---------- Biçimlendirme ---------- */

/** Süre → "8:45", "125:30", "−1:15", "0:00:30" */
export function fmtHM(sec) {
  const p = parts(sec);
  return (sec < 0 ? MINUS : '') + p.h + ':' + pad2(p.m) + (p.s ? ':' + pad2(p.s) : '');
}
/** Günün saati → "08:30" ya da "08:30:15" */
export function fmtClock(sec) {
  const a = ((Math.round(sec) % DAY) + DAY) % DAY;
  const p = parts(a);
  return pad2(p.h) + ':' + pad2(p.m) + (p.s ? ':' + pad2(p.s) : '');
}
/** Süre → "8 sa 45 dk" */
export function fmtText(sec) {
  const p = parts(sec);
  const out = [];
  if (p.h) out.push(p.h + ' sa');
  if (p.m) out.push(p.m + ' dk');
  if (p.s) out.push(p.s + ' sn');
  return (sec < 0 ? MINUS : '') + (out.length ? out.join(' ') : '0 dk');
}
/** Süre → "5 gün 5 sa 30 dk" */
export function fmtDays(sec) {
  const a = Math.abs(Math.round(sec));
  const d = Math.floor(a / DAY), rest = a - d * DAY;
  return (sec < 0 ? MINUS : '') + d + ' gün' + (rest ? ' ' + fmtText(rest) : '');
}
const sgn = (sec) => (sec < 0 ? MINUS : '');
export const fmtDec = (sec) => sgn(sec) + nfDec.format(Math.abs(sec) / 3600);
export const fmtMin = (sec) => sgn(sec) + nfNum.format(Math.abs(sec) / 60);
export const fmtSec = (sec) => sgn(sec) + nfInt.format(Math.abs(Math.round(sec)));
const money = (n) => nfMoney.format(n) + ' TL';
export function dayShiftText(n) {
  if (n === 0) return 'Aynı gün';
  if (n === 1) return '+1 gün (ertesi gün)';
  if (n === -1) return MINUS + '1 gün (önceki gün)';
  return (n > 0 ? '+' : MINUS) + Math.abs(n) + ' gün';
}

/* ---------- Hata metinleri (Türkçe, çözüm öneren) ---------- */

function quote(raw) {
  const t = String(raw ?? '').trim();
  return t ? ' ("' + (t.length > 40 ? t.slice(0, 40) + '…' : t) + '")' : '';
}
function clockMsg(label, raw, code) {
  const q = quote(raw);
  switch (code) {
    case 'empty': return label + ' boş. Saati 08:30 biçiminde yazın.';
    case 'minute': return label + q + ': dakika 00–59 arasında olmalı. Örneğin 08:75 yerine 09:15 yazın.';
    case 'second': return label + q + ': saniye 00–59 arasında olmalı. Saniye kullanmıyorsanız 08:30 biçiminde yazın.';
    case 'hour': return label + q + ': saat 00–23 arasında olmalı; günün sonu için 24:00 yazabilirsiniz.';
    case 'ampm': return label + q + ': AM/PM ile saat 1–12 arasında olmalı. 24 saatlik yazım için AM/PM ekini silin (örneğin 20:30).';
    default: return label + q + ' okunamadı. Saati 08:30, 8.30 ya da 08:30:15 biçiminde yazın; 12 saatlik yazımda sonuna AM veya PM ekleyin.';
  }
}
function durMsg(label, raw, code, unit) {
  const q = quote(raw);
  switch (code) {
    case 'empty': return label + ' boş. Süreyi 1:45 ya da 90 dk biçiminde yazın.';
    case 'minute': return label + q + ': dakika 00–59 arasında olmalı. 1:75 yerine 2:15 yazın.';
    case 'second': return label + q + ': saniye 00–59 arasında olmalı. 0:01:75 yerine 0:02:15 yazın.';
    case 'unit': return label + q + ': "' + unit + '" birimi tanınmadı. saat (sa), dakika (dk) ya da saniye (sn) kullanın.';
    case 'big': return label + q + ' çok büyük. Değeri kontrol edin; fazladan rakam yazılmış olabilir.';
    default: return label + q + ' okunamadı. Süreyi 1:45, 90 dk, 2 sa 15 dk ya da ondalık olarak 1,5 biçiminde yazın.';
  }
}

/* ---------- Parametreler ---------- */

let P = {
  haftalik_sure_saat: 45, fazla_calisma_carpani: 1.5, gunluk_azami_saat: 11,
  guncelleme: '2026-11-04', kaynak: '4857 sayılı İş Kanunu md. 41, 63 ve 68',
};
async function loadParams(defaults, lineEl) {
  let p = defaults;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) p = { ...defaults, ...(await res.json()) };
  } catch (e) { /* çevrimdışı önbellekte olmayabilir; varsayılanlar kullanılır */ }
  if (lineEl) {
    const d = new Date(p.guncelleme);
    const txt = Number.isNaN(d.getTime()) ? p.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    lineEl.textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + p.kaynak;
  }
  return p;
}

/* ---------- Arayüz ---------- */

const errEl = $('error');
function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(resultEl, msg) { if (resultEl) hideResult(resultEl); showError(errEl, msg); }
function clearErr() { showError(errEl, ''); }
function setText(id, txt) { $(id).textContent = txt; }

// Sekmeler (ok tuşları, Home/End ile gezilebilir)
const tabs = Array.from(document.querySelectorAll('.sh-tabs [role="tab"]'));
function activateTab(name, focus = false) {
  tabs.forEach((t) => {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
    const panel = $(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !on;
    if (on && focus) t.focus();
  });
  clearErr();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => activateTab(t.dataset.tab));
  t.addEventListener('keydown', (e) => {
    let j = -1;
    if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') j = (i + tabs.length - 1) % tabs.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tabs.length - 1;
    if (j < 0) return;
    e.preventDefault();
    activateTab(tabs[j].dataset.tab, true);
  });
});

/* Mod 1: iki saat arası */
function runSpan() {
  clearErr();
  const res = $('fa-result');
  const a = $('fa-start').value, b = $('fa-end').value, c = $('fa-break').value;
  const s = parseClock(a);
  if (s.error) return fail(res, clockMsg('Başlangıç saati', a, s.error));
  const e = parseClock(b);
  if (e.error) return fail(res, clockMsg('Bitiş saati', b, e.error));
  let br = 0;
  if (c.trim()) {
    const d = parseDuration(c, { bare: 'min' });
    if (d.error) return fail(res, durMsg('Mola', c, d.error, d.unit));
    if (d.sec < 0) return fail(res, 'Mola süresi eksi olamaz. Molayı dakika olarak yazın (örneğin 60).');
    br = d.sec;
  }
  const force = $('fa-next').checked;
  const r = calcSpan(s.sec, e.sec, br, force);
  if (r.gross === 0) return fail(res, 'Başlangıç ve bitiş saati aynı. 24 saatlik bir nöbet hesaplıyorsanız "Bitiş ertesi gün" kutusunu işaretleyin.');
  if (r.net < 0) return fail(res, 'Mola (' + fmtText(br) + '), toplam süreden (' + fmtText(r.gross) + ') uzun. Mola dakikasını ya da saatleri kontrol edin.');
  setText('fa-big', fmtText(r.net));
  setText('fa-hm', fmtHM(r.net));
  setText('fa-text', fmtText(r.net));
  setText('fa-dec', fmtDec(r.net) + ' saat');
  setText('fa-min', fmtMin(r.net) + ' dk');
  setText('fa-sec', fmtSec(r.net) + ' sn');
  setText('fa-gross', fmtHM(r.gross));
  $('fa-gross-row').hidden = br === 0;
  const notes = [fmtClock(s.sec) + ' → ' + fmtClock(e.sec) + (r.nextDay ? ' (ertesi gün)' : '')];
  if (r.nextDay && !(force && e.sec >= s.sec)) notes.push('Bitiş saati başlangıçtan önce olduğu için gece yarısı geçildi ve bitiş ertesi gün sayıldı.');
  else if (r.nextDay) notes.push('"Bitiş ertesi gün" seçildiği için 24 saat eklendi.');
  if (br) notes.push('Mola olarak ' + fmtText(br) + ' düşüldü.');
  setText('fa-note', notes.join(' '));
  showResult(res);
}
$('f-fark').addEventListener('submit', (e) => { e.preventDefault(); runSpan(); });
$('fa-clear').addEventListener('click', () => { $('f-fark').reset(); hideResult($('fa-result')); clearErr(); $('fa-start').focus(); });

/* Mod 2: saate süre ekle/çıkar */
function runAdd() {
  clearErr();
  const res = $('ek-result');
  const a = $('ek-base').value, b = $('ek-dur').value;
  const s = parseClock(a);
  if (s.error) return fail(res, clockMsg('Saat', a, s.error));
  const d = parseDuration(b, { bare: 'h' });
  if (d.error) return fail(res, durMsg('Eklenecek/çıkarılacak süre', b, d.error, d.unit));
  const sub = document.querySelector('input[name="ek-op"]:checked')?.value === 'sub';
  const r = addToClock(s.sec, sub ? -d.sec : d.sec);
  setText('ek-time', fmtClock(r.time));
  setText('ek-day', dayShiftText(r.dayShift));
  setText('ek-expr', (s.sec === DAY ? '24:00' : fmtClock(s.sec)) + ' ' + (sub ? MINUS : '+') + ' ' + fmtHM(d.sec) + ' = ' + fmtClock(r.time) + (r.dayShift ? ' (' + dayShiftText(r.dayShift) + ')' : ''));
  showResult(res);
}
$('f-ekle').addEventListener('submit', (e) => { e.preventDefault(); runAdd(); });
$('ek-clear').addEventListener('click', () => { $('f-ekle').reset(); hideResult($('ek-result')); clearErr(); $('ek-base').focus(); });

/* Mod 3: süre toplama/çıkarma */
function runSum() {
  clearErr();
  const res = $('to-result');
  const text = $('to-list').value;
  const bare = $('to-bare').value === 'min' ? 'min' : 'h';
  const r = sumList(text, { bare });
  if (r.error) return fail(res, durMsg(r.line + '. satırdaki değer', r.raw, r.error, r.unit));
  if (!r.items.length) return fail(res, 'Listede okunabilir süre yok. Her satıra bir süre yazın (örneğin 1:45, 90 dk) ya da Excel\'den bir sütun yapıştırın.');
  setText('to-hm', fmtHM(r.total));
  setText('to-text', fmtText(r.total));
  setText('to-dec', fmtDec(r.total) + ' saat');
  setText('to-min', fmtMin(r.total) + ' dk');
  setText('to-days', fmtDays(r.total));
  $('to-days-row').hidden = Math.abs(r.total) < DAY;
  let cnt = r.items.length + ' değer (' + r.plus + ' toplama, ' + r.minus + ' çıkarma)';
  if (r.skipped) cnt += '; ' + r.skipped + ' metin/tarih hücresi atlandı';
  setText('to-count', cnt);
  const shown = r.items.slice(0, 60).map((it, k) => (k === 0 ? (it.sec < 0 ? MINUS : '') : (it.sec < 0 ? ' ' + MINUS + ' ' : ' + ')) + fmtHM(Math.abs(it.sec)));
  let expr = shown.join('') + (r.items.length > 60 ? ' … (' + (r.items.length - 60) + ' değer daha)' : '') + ' = ' + fmtHM(r.total);
  setText('to-expr', expr);
  $('to-neg').hidden = r.total >= 0;
  showResult(res);
}
$('f-topla').addEventListener('submit', (e) => { e.preventDefault(); runSum(); });
$('to-list').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runSum(); }
});
$('to-clear').addEventListener('click', () => { $('f-topla').reset(); setText('to-file-name', ''); hideResult($('to-result')); clearErr(); $('to-list').focus(); });
$('to-open').addEventListener('click', () => $('to-file').click());
$('to-file').addEventListener('change', async (e) => {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) return fail($('to-result'), 'Dosya 5 MB\'tan büyük. Yalnızca süre sütununu kopyalayıp listeye yapıştırın ya da dosyayı bölün.');
  let text = '';
  try { text = await f.text(); } catch (err) { return fail($('to-result'), 'Dosya okunamadı. Dosyayı Excel\'de açıp CSV (noktalı virgülle ayrılmış) olarak yeniden kaydedin.'); }
  if (/\u0000/.test(text.slice(0, 2000)) || /^PK/.test(text)) {
    return fail($('to-result'), 'Bu dosya metin (CSV/TXT) değil; Excel (.xlsx) dosyası olabilir. Excel\'de "Farklı Kaydet → CSV" seçin ya da süre sütununu kopyalayıp yapıştırın.');
  }
  $('to-list').value = text;
  setText('to-file-name', f.name + ' yüklendi (bilgisayarınızda okundu).');
  runSum();
});

/* Mod 4: haftalık çalışma çizelgesi */
function buildWeek() {
  const wrap = $('w-rows');
  DAYS.forEach((name, i) => {
    const row = document.createElement('div');
    row.className = 'sh-wrow is-off';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-labelledby', 'w-name-' + i);
    row.innerHTML =
      '<div class="sh-dayh"><span id="w-name-' + i + '">' + name + '</span><span class="sh-dtot" id="w-day-' + i + '">—</span></div>' +
      '<label><span>Giriş</span><input id="w-in-' + i + '" type="text" autocomplete="off" spellcheck="false" placeholder="SS:DD" aria-label="' + name + ' giriş saati"></label>' +
      '<label><span>Çıkış</span><input id="w-out-' + i + '" type="text" autocomplete="off" spellcheck="false" placeholder="SS:DD" aria-label="' + name + ' çıkış saati"></label>' +
      '<label><span>Mola (dk)</span><input id="w-br-' + i + '" type="text" inputmode="decimal" autocomplete="off" placeholder="0" aria-label="' + name + ' mola dakikası"></label>';
    wrap.appendChild(row);
  });
}
buildWeek();

function readDay(i) {
  const name = DAYS[i];
  const a = $('w-in-' + i).value.trim(), b = $('w-out-' + i).value.trim(), c = $('w-br-' + i).value.trim();
  if (!a && !b) return { empty: true, net: 0 };
  if (!a) return { field: 'in', error: name + ': giriş saati eksik. İki saati de girin ya da satırı tamamen boş bırakın.' };
  if (!b) return { field: 'out', error: name + ': çıkış saati eksik. İki saati de girin ya da satırı tamamen boş bırakın.' };
  const s = parseClock(a);
  if (s.error) return { field: 'in', error: clockMsg(name + ' giriş saati', a, s.error) };
  const e = parseClock(b);
  if (e.error) return { field: 'out', error: clockMsg(name + ' çıkış saati', b, e.error) };
  let br = 0;
  if (c) {
    const d = parseDuration(c, { bare: 'min' });
    if (d.error) return { field: 'br', error: durMsg(name + ' mola', c, d.error, d.unit) };
    if (d.sec < 0) return { field: 'br', error: name + ': mola eksi olamaz. Molayı dakika olarak yazın (örneğin 60).' };
    br = d.sec;
  }
  const r = calcSpan(s.sec, e.sec, br);
  if (r.gross === 0) return { field: 'out', error: name + ': giriş ve çıkış saati aynı. O gün çalışılmadıysa satırı boş bırakın; 24 saatlik nöbet için "İki saat arası" sekmesini kullanın.' };
  if (r.net < 0) return { field: 'br', error: name + ': mola (' + fmtText(br) + '), çalışma süresinden (' + fmtText(r.gross) + ') uzun. Mola dakikasını kontrol edin.' };
  return { net: r.net, nextDay: r.nextDay };
}
function paintDay(i, d) {
  const out = $('w-day-' + i);
  const row = out.closest('.sh-wrow');
  if (d.empty || d.error) { out.textContent = d.error ? '?' : '—'; row.classList.add('is-off'); return; }
  out.textContent = fmtHM(d.net) + (d.nextDay ? ' (gece)' : '');
  row.classList.remove('is-off');
}
$('w-rows').addEventListener('input', (e) => {
  const m = /^w-(?:in|out|br)-(\d)$/.exec(e.target.id || '');
  if (m) paintDay(+m[1], readDay(+m[1]));
});

function runWeek() {
  clearErr();
  const res = $('w-result');
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = readDay(i);
    paintDay(i, d);
    if (d.error) { fail(res, d.error); $('w-' + (d.field || 'in') + '-' + i).focus(); return; }
    days.push(d);
  }
  const worked = days.filter((d) => !d.empty);
  if (!worked.length) return fail(res, 'Çizelge boş. En az bir gün için giriş ve çıkış saatini yazın (örneğin 09:00 ve 18:00).');
  const rateRaw = $('w-rate').value.trim();
  let rate = null;
  if (rateRaw) {
    rate = parseNum(rateRaw);
    if (Number.isNaN(rate) || rate < 0) return fail(res, 'Saat ücreti okunamadı. Yalnızca rakam ve virgül kullanın (örneğin 152,50) ya da alanı boş bırakın.');
  }
  const total = days.reduce((a, d) => a + d.net, 0);
  const w = splitWeek(total, P.haftalik_sure_saat);
  setText('w-total', fmtHM(w.total));
  setText('w-text', fmtText(w.total));
  setText('w-dec', fmtDec(w.total) + ' saat');
  setText('w-days', worked.length + ' gün');
  setText('w-avg', fmtHM(Math.round(w.total / worked.length)));
  setText('w-normal', fmtHM(w.normal));
  setText('w-over', fmtHM(w.over));
  setText('w-limit', P.haftalik_sure_saat + ' saat');
  $('w-over-note').hidden = w.over === 0;
  $('w-ok-note').hidden = w.over > 0;
  if (w.over > 0) setText('w-over-text', 'Haftalık ' + P.haftalik_sure_saat + ' saati ' + fmtText(w.over) + ' aşıyorsunuz. Bu kısım fazla çalışma sayılır ve kanunen %50 zamlı ödenir.');
  else setText('w-ok-note', 'Haftalık toplam ' + P.haftalik_sure_saat + ' saati aşmıyor; ' + fmtText(P.haftalik_sure_saat * 3600 - w.total) + ' daha çalışılabilir.');
  const long = days.map((d, i) => (!d.empty && d.net > P.gunluk_azami_saat * 3600 ? DAYS[i] + ' (' + fmtHM(d.net) + ')' : null)).filter(Boolean);
  $('w-long').hidden = !long.length;
  if (long.length) setText('w-long', 'Günlük ' + P.gunluk_azami_saat + ' saati aşan gün: ' + long.join(', ') + '. İş Kanunu\'na göre fazla çalışma dahil günlük çalışma ' + P.gunluk_azami_saat + ' saati aşamaz; Yargıtay uygulamasında ' + P.gunluk_azami_saat + ' saati aşan kısım, haftalık ' + P.haftalik_sure_saat + ' saat dolmasa da fazla çalışma sayılır. Yukarıdaki tablo yalnızca haftalık sınırı aşan süreyi fazla çalışma olarak gösterir.');
  const payBox = $('w-pay');
  payBox.hidden = rate === null;
  if (rate !== null) {
    const pn = (w.normal / 3600) * rate;
    const po = (w.over / 3600) * rate * P.fazla_calisma_carpani;
    setText('w-pay-normal', money(pn));
    setText('w-pay-over', money(po));
    setText('w-pay-total', money(pn + po));
    setText('w-pay-rate', nfNum.format(P.fazla_calisma_carpani));
  }
  showResult(res);
}
$('f-hafta').addEventListener('submit', (e) => { e.preventDefault(); runWeek(); });
$('w-copy').addEventListener('click', () => {
  const src = ['in', 'out', 'br'].map((k) => $('w-' + k + '-0').value);
  if (!src[0].trim() && !src[1].trim()) {
    showError(errEl, 'Önce Pazartesi satırına giriş ve çıkış saatini yazın; sonra bu düğmeyle Salı–Cuma satırlarına kopyalayın.');
    $('w-in-0').focus();
    return;
  }
  clearErr();
  for (let i = 1; i <= 4; i++) {
    ['in', 'out', 'br'].forEach((k, j) => { $('w-' + k + '-' + i).value = src[j]; });
    paintDay(i, readDay(i));
  }
  paintDay(0, readDay(0));
});
$('w-clear').addEventListener('click', () => {
  $('f-hafta').reset();
  for (let i = 0; i < 7; i++) paintDay(i, { empty: true });
  hideResult($('w-result'));
  clearErr();
  $('w-in-0').focus();
});

/* Mod 5: dönüştürücü */
function convert(showErrors) {
  const res = $('cv-result');
  const raw = $('cv-in').value;
  const unit = $('cv-unit').value;
  if (!raw.trim()) {
    if (showErrors) fail(res, 'Dönüştürülecek değer boş. Örneğin 7,5 (ondalık saat), 2:15 ya da 135 (dakika) yazın.');
    else hideResult(res);
    return;
  }
  const bare = unit === 'min' ? 'min' : unit === 'sec' ? 'sec' : 'h';
  const d = parseDuration(raw, { bare, dotHM: unit === 'hm' });
  if (d.error) { if (showErrors) fail(res, durMsg('Değer', raw, d.error, d.unit)); else hideResult(res); return; }
  if (showErrors) clearErr();
  setText('cv-dec', fmtDec(d.sec) + ' saat');
  setText('cv-hm', fmtHM(d.sec));
  setText('cv-text', fmtText(d.sec));
  setText('cv-min', fmtMin(d.sec) + ' dk');
  setText('cv-sec', fmtSec(d.sec) + ' sn');
  showResult(res);
}
$('f-cevir').addEventListener('submit', (e) => { e.preventDefault(); convert(true); });
$('cv-in').addEventListener('input', () => convert(false));
$('cv-unit').addEventListener('change', () => convert(false));
$('cv-clear').addEventListener('click', () => { $('f-cevir').reset(); hideResult($('cv-result')); clearErr(); $('cv-in').focus(); });

loadParams(P, $('params-line')).then((p) => { P = p; });
