// Vergi Kimlik Numarası (VKN) algoritma kontrolü — tamamı tarayıcıda çalışır; numaralar hiçbir yere gönderilmez.
// Yalnızca biçimsel kontrol yapar. Mükellef/unvan SORGULAMAZ, üretici YOKTUR, ağ isteği YOKTUR.
import { showError, downloadBlob } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_LINES = 5000;

/** Girdiyi temizler: boşluk, tire, nokta atılır. */
export function normalizeNo(raw) {
  return String(raw ?? '').replace(/[\s\-.]/g, '');
}

/**
 * GİB algoritmasının kontrol basamağını hesaplar (ilk 9 hane için).
 * Her hane için: t = (d + (9 - i)) mod 10; p = (t * 2^(9-i)) mod 9; t != 0 ve p == 0 ise p = 9.
 * Toplam S; kontrol = (10 - S mod 10) mod 10.
 */
export function vknCheckDigit(first9) {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const t = (Number(first9[i]) + (9 - i)) % 10;
    let p = (t * 2 ** (9 - i)) % 9;
    if (t !== 0 && p === 0) p = 9;
    sum += p;
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Tek bir girdiyi sınıflar. Dönüş: { raw, digits, kind, ok, message }
 * kind: 'valid' | 'invalid' | 'tckn' | 'error'
 */
export function checkVkn(raw) {
  const s = normalizeNo(raw);
  if (!s) return null;
  if (/\D/.test(s)) return { raw, digits: s, kind: 'error', ok: false, message: 'Rakam dışı karakter var' };
  if (s.length === 11) return { raw, digits: s, kind: 'tckn', ok: false, message: '11 hane: TC kimlik numarası olabilir' };
  if (s.length !== 10) {
    const diff = s.length - 10;
    return { raw, digits: s, kind: 'error', ok: false, message: `10 hane olmalı (${diff > 0 ? `${diff} fazla` : `${-diff} eksik`})` };
  }
  const ok = vknCheckDigit(s) === Number(s[9]);
  return { raw, digits: s, kind: ok ? 'valid' : 'invalid', ok, message: ok ? 'Algoritmaya uygun' : 'Algoritmaya uygun değil' };
}

/** Çok satırlı metni sınıflar (boş satırlar atlanır). */
export function checkList(text) {
  return String(text ?? '').split(/\r?\n/).map((l) => checkVkn(l)).filter(Boolean);
}

/** CSV hücresi kaçışı. */
function csvCell(v) {
  const s = String(v);
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/* ---------- Arayüz ---------- */
const el = typeof document !== 'undefined' && $('f-list') ? {
  form: $('form-vkn'), input: $('f-list'), error: $('error'), result: $('result'), status: $('r-status'),
  checks: $('r-checks'), note: $('r-note'), clear: $('clear'), tableWrap: $('r-table-wrap'), tbody: $('r-tbody'),
  csv: $('download-csv'), tcHint: $('tc-hint'),
} : null;

let lastRows = [];

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function render() {
  showError(el.error, '');
  el.tcHint.hidden = true;
  const lines = String(el.input.value).split(/\r?\n/).filter((l) => l.trim());
  if (lines.length > MAX_LINES) {
    el.result.classList.remove('is-active');
    showError(el.error, `En fazla ${MAX_LINES} satır kontrol edilir; listeyi parçalara bölüp tekrar deneyin.`);
    return;
  }
  const rows = checkList(el.input.value);
  lastRows = rows;
  if (!rows.length) { el.result.classList.remove('is-active'); return; }

  const valid = rows.filter((r) => r.kind === 'valid').length;
  const invalid = rows.filter((r) => r.kind === 'invalid').length;
  const other = rows.length - valid - invalid;
  const single = rows.length === 1;
  const allGood = valid === rows.length;
  el.result.classList.toggle('is-invalid', !allGood);

  if (single) {
    const r = rows[0];
    el.status.textContent = r.message;
    if (r.kind === 'valid' || r.kind === 'invalid') {
      el.checks.innerHTML = `<li class="is-pass"><span aria-hidden="true">✓</span> 10 hane ve yalnızca rakam: <strong>geçti</strong></li>`
        + `<li class="${r.ok ? 'is-pass' : 'is-fail'}"><span aria-hidden="true">${r.ok ? '✓' : '✕'}</span> 10. hane (kontrol basamağı) kuralı: <strong>${r.ok ? 'geçti' : 'geçmedi'}</strong></li>`;
    } else {
      el.checks.innerHTML = `<li class="is-fail"><span aria-hidden="true">✕</span> ${esc(r.message)}</li>`;
    }
    el.note.textContent = r.kind === 'valid'
      ? 'Numara kontrol basamağı kuralına uyuyor. Bu, numaranın gerçekten bir mükellefe verildiğini göstermez; yalnızca bariz bir yazım hatası yok demektir. Mükellef sorgusu için GİB İnteraktif Vergi Dairesi kullanılır.'
      : r.kind === 'invalid'
        ? 'Kontrol basamağı tutmuyor: büyük olasılıkla bir hane yanlış yazılmış ya da iki hane yer değiştirmiş. Numarayı faturadan ya da vergi levhasından yeniden okuyun; araç doğru numarayı üretmez.'
        : r.kind === 'tckn'
          ? 'Vergi kimlik numarası 10 haneli, TC kimlik numarası 11 haneli olur. Gerçek kişi mükellefler vergi numarası olarak TC kimlik numarasını kullanır; 11 haneli numaralar farklı algoritmayla kontrol edilir.'
          : 'Numarayı belgeden yeniden okuyup yalnızca rakamlarla ve 10 hane olarak yazın.';
  } else {
    el.status.textContent = `${rows.length} satır: ${valid} uygun, ${invalid} uygun değil${other ? `, ${other} biçim hatalı/11 haneli` : ''}`;
    el.checks.innerHTML = '';
    el.note.textContent = 'Toplu sonuç yalnızca algoritma kontrolüdür; numaraların gerçek olup olmadığı ve kime ait olduğu sorgulanmaz.';
  }

  // 11 haneli girdi varsa TC kimlik aracına yönlendir
  if (rows.some((r) => r.kind === 'tckn')) el.tcHint.hidden = false;

  el.tableWrap.hidden = single;
  el.csv.hidden = single;
  el.tbody.innerHTML = rows.map((r, i) => {
    const cls = r.kind === 'valid' ? 'is-pass' : 'is-fail';
    const mark = r.kind === 'valid' ? '✓' : '✕';
    return `<tr class="${cls}"><td>${i + 1}</td><td class="vk-no">${esc(r.digits)}</td><td><span aria-hidden="true">${mark}</span> ${esc(r.message)}</td></tr>`;
  }).join('');
  el.result.classList.add('is-active');
}

if (el) {
  el.input.addEventListener('input', render);
  el.form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
  el.clear.addEventListener('click', () => { el.input.value = ''; render(); el.input.focus(); });
  el.csv.addEventListener('click', () => {
    const lines = ['sira;numara;durum', ...lastRows.map((r, i) => [i + 1, r.digits, r.message].map(csvCell).join(';'))];
    // BOM: Excel Türkçe karakterleri doğru açsın
    downloadBlob(new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' }), 'vergi-no-kontrol.csv');
  });
}
