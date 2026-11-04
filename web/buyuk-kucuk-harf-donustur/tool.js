// Büyük/küçük harf dönüştürücü. Türkçe İ/ı kuralı için toLocaleUpperCase('tr') / toLocaleLowerCase('tr') kullanır.
// Metin hiçbir zaman sunucuya gitmez; tüm işlem tarayıcıda yapılır.
import { downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const input = $('input');
const output = $('output');

/** Seçime göre yerel ayar: Türkçe kuralı açıksa 'tr', değilse 'en'. */
const locale = () => ($('opt-tr').checked ? 'tr' : 'en');

/** Her kelimenin ilk harfi büyük, kalanı küçük; kesme işaretinden sonraki ek küçük kalır. */
function titleCase(text, loc) {
  return text.toLocaleLowerCase(loc).replace(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu, (w) => {
    const first = Array.from(w)[0];
    return first.toLocaleUpperCase(loc) + w.slice(first.length);
  });
}

/** Metnin başındaki ve . ! ? … sonrasındaki (ya da yeni satırdaki) ilk harf büyük, kalanı küçük. */
function sentenceCase(text, loc) {
  const lower = text.toLocaleLowerCase(loc);
  let capNext = true;
  let out = '';
  for (const ch of lower) {
    if (capNext && /\p{L}/u.test(ch)) { out += ch.toLocaleUpperCase(loc); capNext = false; continue; }
    out += ch;
    if (/[.!?…\n]/.test(ch)) capNext = true;
    else if (/\p{N}/u.test(ch)) capNext = false; // "3 Mayıs" gibi sayıyla başlayan cümlede sayıdan sonrası küçük kalır
  }
  return out;
}

const OPS = {
  upper: (t, l) => t.toLocaleUpperCase(l),
  lower: (t, l) => t.toLocaleLowerCase(l),
  title: titleCase,
  sentence: sentenceCase,
};
const LABEL = { upper: 'BÜYÜK HARF', lower: 'küçük harf', title: 'Başlık Düzeni', sentence: 'Cümle düzeni' };

function setStatus(msg) { $('status').textContent = msg; }

document.querySelectorAll('[data-op]').forEach((btn) => {
  btn.addEventListener('click', () => {
    showError($('error'), null);
    if (!input.value.trim()) {
      output.value = '';
      showError($('error'), 'Önce dönüştürmek istediğiniz metni üstteki kutuya yazın ya da yapıştırın.');
      input.focus();
      return;
    }
    output.value = OPS[btn.dataset.op](input.value, locale());
    setStatus(`${LABEL[btn.dataset.op]} uygulandı · ${output.value.length.toLocaleString('tr-TR')} karakter`);
  });
});

/** Panoya kopyalar; izin yoksa seçip execCommand ile dener. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    output.focus();
    output.select();
    try { return document.execCommand('copy'); } catch { return false; }
  }
}

$('copy').addEventListener('click', async () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'Kopyalanacak sonuç yok. Önce bir dönüştürme düğmesine basın.'); return; }
  const ok = await copyText(output.value);
  if (ok) setStatus('Sonuç panoya kopyalandı.');
  else showError($('error'), 'Tarayıcı panoya yazmaya izin vermedi. Sonuç kutusundaki metni seçip Ctrl+C (Mac’te Cmd+C) ile kopyalayabilirsiniz.');
});

$('use').addEventListener('click', () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'Girişe alınacak sonuç yok. Önce bir dönüştürme düğmesine basın.'); return; }
  input.value = output.value;
  output.value = '';
  setStatus('Sonuç girişe alındı; yeni bir dönüşüm uygulayabilirsiniz.');
  input.focus();
});

$('download').addEventListener('click', () => {
  showError($('error'), null);
  if (!output.value) { showError($('error'), 'İndirilecek sonuç yok. Önce bir dönüştürme düğmesine basın.'); return; }
  // BOM, Windows Not Defteri'nde Türkçe karakterlerin doğru görünmesini sağlar.
  downloadBlob(new Blob(['﻿', output.value], { type: 'text/plain;charset=utf-8' }), 'donusturulmus-metin.txt');
  setStatus('Metin .txt olarak indirildi.');
});

$('clear').addEventListener('click', () => {
  input.value = ''; output.value = '';
  showError($('error'), null);
  setStatus('');
  input.focus();
});
