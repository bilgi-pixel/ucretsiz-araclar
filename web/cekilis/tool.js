import { createDropzone, downloadBlob, showError, formatBytes } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Rastgelelik (WebCrypto) ---------- */
/** 0 ≤ n < max arası tarafsız tam sayı; aralık dışı değerler reddedilir. */
export function randomInt(max) {
  if (max <= 0) throw new Error('max > 0 olmalı');
  if (max === 1) return 0;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let x;
  do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= limit);
  return x % max;
}

/** Fisher–Yates karıştırma; yeni dizi döndürür. */
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- Liste ayrıştırma ---------- */
const normalize = (s) => s.trim().toLocaleLowerCase('tr').replace(/\s+/g, ' ');

/** Ham metinden katılımcı girişlerini çıkarır. instagram=true ise yalnızca @kullanıcı adları alınır. */
export function parseEntries(text, { instagram = false } = {}) {
  if (instagram) {
    const found = [];
    const re = /(?:^|[^\w.])@([A-Za-z0-9_](?:[A-Za-z0-9_.]{0,28}[A-Za-z0-9_])?)/g;
    let m;
    while ((m = re.exec(text))) found.push('@' + m[1].toLocaleLowerCase('en'));
    return found;
  }
  return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

/** Tekrarları ve hariç tutulanları uygular; sayaçlarla birlikte döndürür. */
export function prepareList(entries, { dedupe = true, exclude = [] } = {}) {
  const excludeSet = new Set(exclude.map(normalize).filter(Boolean));
  const seen = new Set();
  const list = [];
  let dupes = 0, excluded = 0;
  for (const raw of entries) {
    const key = normalize(raw);
    if (!key) continue;
    if (excludeSet.has(key)) { excluded++; continue; }
    if (dedupe) {
      if (seen.has(key)) { dupes++; continue; }
      seen.add(key);
    }
    list.push(raw.trim());
  }
  return { list, dupes, excluded, total: entries.length };
}

/** Kazanan + yedek seçer. unique=true: aynı kişi (normalize edilmiş ad) en fazla bir kez çıkar. */
export function drawWinners(list, { winners = 1, backups = 0, unique = true } = {}) {
  const pool = shuffle(list);
  const picked = [];
  const seen = new Set();
  const need = winners + backups;
  for (const name of pool) {
    if (picked.length >= need) break;
    const key = normalize(name);
    if (unique && seen.has(key)) continue;
    seen.add(key);
    picked.push(name);
  }
  if (picked.length < need) throw new Error('NOT_ENOUGH');
  return { winners: picked.slice(0, winners), backups: picked.slice(winners) };
}

/* Test ve şeffaflık için saf fonksiyonları dışarı aç (ağ erişimi yok, veri saklanmaz). */
window.cekilis = { randomInt, shuffle, parseEntries, prepareList, drawWinners };

/* ---------- Mod seçimi ---------- */
const panels = { names: $('panel-names'), numbers: $('panel-numbers'), coin: $('panel-coin') };
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  Object.entries(panels).forEach(([k, el]) => { el.hidden = k !== mode; });
}));

/* ---------- İsim çekilişi ---------- */
const namesEl = $('names');
const excludeEl = $('exclude');
let lastResult = null;   // { winners, backups, count, when }
let animTimer = null;
let animDone = null;     // animasyonu bitiren fonksiyon

function readOptions() {
  return {
    instagram: $('opt-instagram').checked,
    dedupe: $('opt-dedupe').checked,
    unique: $('opt-unique').checked,
    winners: Math.max(1, Math.floor(Number($('opt-winners').value) || 1)),
    backups: Math.max(0, Math.floor(Number($('opt-backups').value) || 0)),
  };
}

function currentList() {
  const o = readOptions();
  const entries = parseEntries(namesEl.value, { instagram: o.instagram });
  const exclude = parseEntries(excludeEl.value, { instagram: o.instagram });
  return { ...prepareList(entries, { dedupe: o.dedupe, exclude }), opts: o };
}

function updateStats() {
  const { list, dupes, excluded, total, opts } = currentList();
  const el = $('stats');
  if (!total) { el.textContent = ''; return; }
  const parts = [`<strong>${list.length}</strong> katılımcı`];
  if (opts.dedupe) parts.push(`<span id="count-dupes">${dupes}</span> tekrar kaldırıldı`);
  if (excluded) parts.push(`<span id="count-excluded">${excluded}</span> hariç tutuldu`);
  el.innerHTML = parts.join(' · ');
  el.dataset.count = String(list.length);
}
[namesEl, excludeEl, $('opt-instagram'), $('opt-dedupe')].forEach((el) => {
  el.addEventListener('input', updateStats);
  el.addEventListener('change', updateStats);
});

/* Dosya (TXT/CSV) */
createDropzone({
  el: $('drop'), accept: '.txt,.csv,text/plain,text/csv', multiple: false,
  onFiles: ([file]) => {
    showError($('error'), null);
    if (file.size > 5 * 1024 * 1024) {
      showError($('error'), `Dosya ${formatBytes(file.size)}; isim listesi için fazla büyük. Yalnızca isim sütununu kopyalayıp metin kutusuna yapıştırın.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '').replace(/^﻿/, '');
      const isCsv = /\.csv$/i.test(file.name) || /[;,]/.test(text.split(/\r?\n/)[0] || '');
      const lines = text.split(/\r?\n/).map((l) => {
        if (!isCsv) return l.trim();
        const cell = l.split(/[;,\t]/)[0] || '';
        return cell.replace(/^"|"$/g, '').trim();
      }).filter(Boolean);
      if (!lines.length) { showError($('error'), 'Dosyada isim bulunamadı. Her satıra bir isim yazılmış düz metin (TXT) ya da ilk sütunu isim olan CSV seçin.'); return; }
      namesEl.value = (namesEl.value.trim() ? namesEl.value.trimEnd() + '\n' : '') + lines.join('\n');
      updateStats();
    };
    reader.onerror = () => showError($('error'), 'Dosya okunamadı. Dosyanın açık olmadığından emin olup yeniden seçin.');
    reader.readAsText(file, 'utf-8');
  },
});

function setBusy(busy) {
  $('draw').disabled = busy;
  $('skip').hidden = !busy;
  $('clear').disabled = busy;
}

/** 3–5 sn isim akışı; atlanabilir; hareket azaltma tercihinde hiç oynatılmaz. */
function playAnimation(list) {
  return new Promise((resolve) => {
    if (reducedMotion.matches) { resolve(); return; }
    const anim = $('anim');
    const nameEl = $('anim-name');
    anim.hidden = false;
    const duration = 3000 + randomInt(2001);
    const start = performance.now();
    let delay = 40;
    const finish = () => {
      clearTimeout(animTimer); animTimer = null; animDone = null;
      anim.hidden = true;
      resolve();
    };
    animDone = finish;
    const step = () => {
      const t = performance.now() - start;
      if (t >= duration) { finish(); return; }
      nameEl.textContent = list[randomInt(list.length)];
      delay = 40 + Math.floor((t / duration) ** 2 * 260); // sona doğru yavaşla
      animTimer = setTimeout(step, delay);
    };
    step();
  });
}
$('skip').addEventListener('click', () => { if (animDone) animDone(); });

async function runDraw() {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const { list, opts } = currentList();
  if (!list.length) {
    showError($('error'), namesEl.value.trim()
      ? (opts.instagram ? 'Metinde @kullanıcı adı bulunamadı. Yorumları kopyalarken kullanıcı adlarının da seçildiğinden emin olun ya da "@kullanıcı adlarını ayıkla" seçeneğini kapatın.' : 'Tüm katılımcılar hariç tutulmuş görünüyor. "Hariç tut" kutusunu kontrol edin.')
      : 'Katılımcı listesi boş. Her satıra bir isim yazın ya da TXT/CSV dosyası seçin.');
    return;
  }
  const need = opts.winners + opts.backups;
  const distinct = opts.unique ? new Set(list.map(normalize)).size : list.length;
  if (need > distinct) {
    showError($('error'), `${need} kişi (kazanan + yedek) seçilmek isteniyor ama listede ${distinct} uygun katılımcı var. Kazanan ya da yedek sayısını azaltın.`);
    return;
  }
  setBusy(true);
  try {
    // Sonucu animasyondan önce belirle; animasyon yalnızca görsel.
    const res = drawWinners(list, opts);
    await playAnimation(list);
    lastResult = { ...res, count: list.length, when: new Date() };
    renderResult();
  } catch (err) {
    console.error(err);
    showError($('error'), 'Çekiliş yapılamadı. Sayfayı yenileyip tekrar deneyin.');
  } finally {
    setBusy(false);
  }
}
$('draw').addEventListener('click', runDraw);
$('redraw').addEventListener('click', runDraw);

function renderResult() {
  const r = lastResult;
  const fill = (ol, arr) => { ol.innerHTML = ''; arr.forEach((n) => { const li = document.createElement('li'); li.textContent = n; ol.appendChild(li); }); };
  fill($('winners'), r.winners);
  fill($('backups'), r.backups);
  $('backups-title').hidden = $('backups').hidden = !r.backups.length;
  $('result-meta').textContent = `${r.count} katılımcı · ${r.when.toLocaleString('tr-TR')} · Sonuç tamamen rastgeledir; kaydedilmez.`;
  $('copy-status').textContent = '';
  $('result').classList.add('is-active');
  $('result').scrollIntoView({ block: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
}

$('clear').addEventListener('click', () => {
  namesEl.value = ''; excludeEl.value = '';
  lastResult = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  updateStats();
  namesEl.focus();
});

/* Metin kopyala */
function resultText() {
  const r = lastResult;
  const lines = ['Çekiliş sonucu', ''];
  lines.push(r.winners.length > 1 ? 'Kazananlar:' : 'Kazanan:');
  r.winners.forEach((n, i) => lines.push(`${i + 1}. ${n}`));
  if (r.backups.length) { lines.push('', 'Yedekler:'); r.backups.forEach((n, i) => lines.push(`${i + 1}. ${n}`)); }
  lines.push('', `${r.count} katılımcı · ${r.when.toLocaleString('tr-TR')}`, 'araclar.bilisimajans.com/cekilis');
  return lines.join('\n');
}
$('copy-text').addEventListener('click', async () => {
  if (!lastResult) return;
  const status = $('copy-status');
  try {
    await navigator.clipboard.writeText(resultText());
    status.textContent = 'Kopyalandı; duyuru metninize yapıştırabilirsiniz.';
  } catch {
    status.textContent = 'Tarayıcı panoya erişemedi; sonucu elle seçip kopyalayın.';
  }
  setTimeout(() => { status.textContent = ''; }, 5000);
});

/* PNG sonuç kartı (canvas; küçük logo, "resmi" damga yok) */
let logoPromise = null;
function getLogo() {
  if (!logoPromise) {
    logoPromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = new URL('../assets/img/logo.png', import.meta.url).href;
    });
  }
  return logoPromise;
}
function wrapText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
  return t + '…';
}
async function buildCard() {
  const r = lastResult;
  const W = 1080, pad = 64;
  const rowH = 58, rowGap = 12;
  // Yükseklik: üst bant + başlık payı + her bölüm (başlık 46 + satırlar + 18) + alt bilgi
  const sectionH = (len) => (len ? 46 + len * (rowH + rowGap) + 18 : 0);
  const H = 230 + sectionH(r.winners.length) + sectionH(r.backups.length) + 90;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
  // Üst bant
  ctx.fillStyle = '#7b2331'; ctx.fillRect(0, 0, W, 170);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 56px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('Çekiliş Sonucu', pad, 72);
  ctx.font = '400 28px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`${r.count} katılımcı · ${r.when.toLocaleString('tr-TR')}`, pad, 126);
  // Listeler
  let y = 230;
  const section = (title, arr, color) => {
    ctx.fillStyle = '#5b5e66';
    ctx.font = '600 26px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(title.toLocaleUpperCase('tr'), pad, y); y += 46;
    arr.forEach((name, i) => {
      ctx.fillStyle = '#f5f3f1'; roundRect(ctx, pad, y - rowH / 2, W - pad * 2, rowH, 12); ctx.fill();
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(pad + 34, y, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffffff'; ctx.font = '700 22px system-ui, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(String(i + 1), pad + 34, y + 1); ctx.textAlign = 'left';
      ctx.fillStyle = '#1d1f23'; ctx.font = '700 32px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(wrapText(ctx, name, W - pad * 2 - 100), pad + 74, y);
      y += rowH + rowGap;
    });
    y += 18;
  };
  section(r.winners.length > 1 ? 'Kazananlar' : 'Kazanan', r.winners, '#7b2331');
  if (r.backups.length) section('Yedekler', r.backups, '#8a8d94');
  // Alt bilgi
  ctx.fillStyle = '#8a8d94';
  ctx.font = '400 22px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Sonuç rastgele belirlendi · araclar.bilisimajans.com/cekilis', pad, H - 60);
  const logo = await getLogo();
  if (logo) {
    const lw = 160, lh = Math.round(lw * logo.naturalHeight / logo.naturalWidth);
    ctx.drawImage(logo, W - pad - lw, H - 60 - lh / 2, lw, lh);
  }
  return cv;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
$('download-png').addEventListener('click', async () => {
  if (!lastResult) return;
  try {
    const cv = await buildCard();
    const d = lastResult.when;
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    cv.toBlob((blob) => { if (blob) downloadBlob(blob, `cekilis-sonucu-${stamp}.png`); }, 'image/png');
  } catch (err) {
    console.error(err);
    showError($('error'), 'Sonuç kartı oluşturulamadı. "Metin olarak kopyala" ile sonucu alabilirsiniz.');
  }
});

/* ---------- Sayı çek ---------- */
$('num-draw').addEventListener('click', () => {
  const err = $('num-error');
  showError(err, null);
  $('num-result').classList.remove('is-active');
  const min = Math.floor(Number($('num-min').value));
  const max = Math.floor(Number($('num-max').value));
  const count = Math.max(1, Math.floor(Number($('num-count').value) || 1));
  const unique = $('num-unique').checked;
  if (!Number.isFinite(min) || !Number.isFinite(max)) { showError(err, 'En küçük ve en büyük sayıyı girin; örnek: 1 ile 100.'); return; }
  if (min > max) { showError(err, 'En küçük sayı en büyük sayıdan büyük olamaz. Değerleri yer değiştirin.'); return; }
  const span = max - min + 1;
  if (unique && count > span) { showError(err, `${min}–${max} aralığında yalnızca ${span} farklı sayı var; ${count} farklı sayı çekilemez. Sayıyı azaltın ya da "birbirinden farklı" seçeneğini kapatın.`); return; }
  if (count > 1000) { showError(err, 'Tek seferde en fazla 1000 sayı çekilebilir.'); return; }
  let out = [];
  if (unique) {
    if (span <= 100000) {
      const all = Array.from({ length: span }, (_, i) => min + i);
      out = shuffle(all).slice(0, count);
    } else {
      const seen = new Set();
      while (out.length < count) { const v = min + randomInt(span); if (!seen.has(v)) { seen.add(v); out.push(v); } }
    }
  } else {
    for (let i = 0; i < count; i++) out.push(min + randomInt(span));
  }
  $('num-output').textContent = out.join(', ');
  $('num-meta').textContent = `${min}–${max} aralığından ${count} sayı · ${new Date().toLocaleString('tr-TR')}`;
  $('num-result').classList.add('is-active');
});
$('num-copy').addEventListener('click', async () => {
  const status = $('num-status');
  try { await navigator.clipboard.writeText($('num-output').textContent); status.textContent = 'Kopyalandı.'; }
  catch { status.textContent = 'Panoya erişilemedi; sayıları elle seçip kopyalayın.'; }
  setTimeout(() => { status.textContent = ''; }, 4000);
});

/* ---------- Yazı tura / zar ---------- */
$('coin-flip').addEventListener('click', () => {
  const side = randomInt(2) === 0 ? 'Yazı' : 'Tura';
  $('coin-title').textContent = 'Yazı tura';
  $('coin-output').textContent = side;
  $('dice-faces').innerHTML = '';
  $('coin-meta').textContent = new Date().toLocaleString('tr-TR');
  $('coin-result').classList.add('is-active');
});
$('dice-roll').addEventListener('click', () => {
  const n = Number($('dice-count').value) || 1;
  const rolls = Array.from({ length: n }, () => 1 + randomInt(6));
  $('coin-title').textContent = n > 1 ? `${n} zar` : 'Zar';
  $('coin-output').textContent = n > 1 ? `${rolls.join(' + ')} = ${rolls.reduce((a, b) => a + b, 0)}` : String(rolls[0]);
  $('dice-faces').innerHTML = rolls.map((r) => `<span>${r}</span>`).join('');
  $('coin-meta').textContent = new Date().toLocaleString('tr-TR');
  $('coin-result').classList.add('is-active');
});

updateStats();
