import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Rastgelelik (WebCrypto) ---------- */
/** 0 ≤ n < max arası tarafsız tam sayı (reddetmeli örnekleme; mod önyargısı yok). */
export function randomInt(max) {
  if (!(max > 0) || max > 0x100000000) throw new Error('max 1 ile 2^32 arasında olmalı');
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
/** Kısmi Fisher–Yates: diziden k tanesini tekrarsız seçer. */
function sampleUnique(arr, k) {
  const a = arr.slice();
  for (let i = 0; i < k; i++) {
    const j = i + randomInt(a.length - i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}

/** Sayı üretimi; hata durumunda Türkçe mesajlı Error fırlatır. */
export function generateNumbers({ min, max, count, unique, order }) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) throw new Error('En küçük ve en büyük sayıyı girin; örnek: 1 ile 100.');
  if (!Number.isInteger(min) || !Number.isInteger(max)) throw new Error('Aralık tam sayı olmalı; ondalık değerleri yuvarlayıp yeniden girin.');
  if (min > max) throw new Error('En küçük sayı en büyük sayıdan büyük olamaz. Değerleri yer değiştirin.');
  const span = max - min + 1;
  if (span > 0xffffffff) throw new Error('Aralık çok geniş. En büyük ile en küçük sayı arasındaki fark en fazla yaklaşık 4,29 milyar olabilir.');
  if (!Number.isInteger(count) || count < 1) throw new Error('Sayı adedi en az 1 olmalı.');
  if (count > 1000) throw new Error('Tek seferde en fazla 1000 sayı üretilebilir. Adedi azaltın.');
  if (unique && count > span) throw new Error(`${min}–${max} aralığında yalnızca ${span} farklı sayı var; ${count} farklı sayı üretilemez. Adedi azaltın, aralığı genişletin ya da "Tekrarsız" kutusunu kapatın.`);
  let out = [];
  if (unique) {
    if (span <= 200000) {
      out = sampleUnique(Array.from({ length: span }, (_, i) => min + i), count);
    } else {
      const seen = new Set();
      while (out.length < count) { const v = min + randomInt(span); if (!seen.has(v)) { seen.add(v); out.push(v); } }
    }
  } else {
    for (let i = 0; i < count; i++) out.push(min + randomInt(span));
  }
  if (order === 'asc') out.sort((a, b) => a - b);
  else if (order === 'desc') out.sort((a, b) => b - a);
  return out;
}

window.rastgeleSayi = { randomInt, shuffle, generateNumbers };

/* ---------- Sekmeler ---------- */
const tabs = ['n', 'd', 'c', 'l'];
function selectTab(name, focus = false) {
  tabs.forEach((t) => {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', String(sel));
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  });
  if (focus) $('tab-' + name).focus();
  showError($('error'), null);
}
tabs.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); selectTab(tabs[(i + 1) % tabs.length], true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectTab(tabs[(i + tabs.length - 1) % tabs.length], true); }
  });
});

/* ---------- Sonuç gösterimi ve geçmiş ---------- */
let lastText = '';
function show({ title, text, faces = [], meta }) {
  showError($('error'), null);
  $('result-title').textContent = title;
  $('out').textContent = text;
  $('out').removeAttribute('data-heads');
  $('out').removeAttribute('data-tails');
  $('faces').innerHTML = '';
  faces.forEach((f) => {
    const s = document.createElement('span');
    s.className = 'rs-face';
    s.textContent = f;
    $('faces').appendChild(s);
  });
  $('meta').textContent = `${meta} · ${new Date().toLocaleTimeString('tr-TR')}`;
  $('copy-status').textContent = '';
  $('result').classList.add('is-active');
  lastText = text;
  const li = document.createElement('li');
  li.textContent = `${title}: ${text.length > 160 ? text.slice(0, 160) + '…' : text}`;
  $('history').prepend(li);
  while ($('history').children.length > 50) $('history').lastChild.remove();
}
function fail(err) {
  $('result').classList.remove('is-active');
  showError($('error'), err.message);
}

/* ---------- Sayı ---------- */
$('n-go').addEventListener('click', () => {
  try {
    if ($('n-min').value === '' || $('n-max').value === '') throw new Error('En küçük ve en büyük sayıyı girin; örnek: 1 ile 100.');
    const min = Number($('n-min').value), max = Number($('n-max').value);
    const count = Number($('n-count').value || 1);
    const unique = $('n-unique').checked;
    const nums = generateNumbers({ min, max, count, unique, order: $('n-order').value });
    show({ title: 'Rastgele sayı', text: nums.join(', '), meta: `${min}–${max} aralığı · ${count} sayı${unique ? ' · tekrarsız' : ''}` });
  } catch (e) { fail(e); }
});

/* ---------- Zar ---------- */
$('d-go').addEventListener('click', () => {
  try {
    const sides = Number($('d-type').value);
    const n = Number($('d-count').value);
    if (!Number.isInteger(n) || n < 1 || n > 6) throw new Error('Zar adedi 1 ile 6 arasında olmalı. Kutuya 1–6 arası bir sayı yazın.');
    const rolls = Array.from({ length: n }, () => 1 + randomInt(sides));
    const total = rolls.reduce((a, b) => a + b, 0);
    show({
      title: n > 1 ? `${n} × d${sides}` : `d${sides}`,
      text: n > 1 ? `${rolls.join(' + ')} = ${total}` : String(rolls[0]),
      faces: rolls,
      meta: `d${sides} · ${n} zar${n > 1 ? ` · toplam ${total}` : ''}`,
    });
  } catch (e) { fail(e); }
});

/* ---------- Yazı tura ---------- */
$('c-go').addEventListener('click', () => {
  try {
    const n = Number($('c-count').value);
    if (!Number.isInteger(n) || n < 1) throw new Error('Atış sayısı en az 1 olmalı. Kutuya tam sayı yazın.');
    if (n > 10000) throw new Error('Tek seferde en fazla 10.000 atış yapılabilir. Sayıyı azaltın.');
    let heads = 0; // "Yazı" sayısı
    const seq = [];
    for (let i = 0; i < n; i++) {
      const h = randomInt(2) === 0;
      if (h) heads++;
      if (i < 20) seq.push(h ? 'Y' : 'T');
    }
    const tails = n - heads;
    const pct = (v) => (v * 100 / n).toFixed(1).replace('.', ',');
    if (n === 1) {
      show({ title: 'Yazı tura', text: heads ? 'Yazı' : 'Tura', meta: '1 atış' });
    } else {
      show({
        title: `${n} atış`,
        text: `Yazı: ${heads} · Tura: ${tails}`,
        meta: `Toplam ${n} atış · Yazı %${pct(heads)} · Tura %${pct(tails)}${n <= 20 ? ' · sıra: ' + seq.join(' ') : ''}`,
      });
    }
    $('out').dataset.heads = String(heads);
    $('out').dataset.tails = String(tails);
  } catch (e) { fail(e); }
});

/* ---------- Listeden seç ---------- */
$('l-go').addEventListener('click', () => {
  try {
    const items = $('l-text').value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!items.length) throw new Error('Liste boş. Her satıra bir seçenek yazın; örnek: Pizza, Köfte, Lahmacun alt alta.');
    const count = Number($('l-count').value || 1);
    if (!Number.isInteger(count) || count < 1) throw new Error('Seçilecek adet en az 1 olmalı.');
    if (count > 1000) throw new Error('Tek seferde en fazla 1000 seçim yapılabilir.');
    const unique = $('l-unique').checked;
    if (unique && count > items.length) throw new Error(`Listede ${items.length} satır var; ${count} farklı seçenek seçilemez. Adedi azaltın, satır ekleyin ya da "Tekrarsız" kutusunu kapatın.`);
    const picked = unique ? sampleUnique(items, count) : Array.from({ length: count }, () => items[randomInt(items.length)]);
    show({ title: 'Listeden seçim', text: picked.join(', '), meta: `${items.length} seçenek · ${count} seçim` });
  } catch (e) { fail(e); }
});

/* ---------- Kopyala / geçmiş ---------- */
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(lastText); st.textContent = ' Kopyalandı.'; }
  catch { st.textContent = ' Tarayıcı panoya erişemedi; sonucu elle seçip kopyalayın.'; }
  setTimeout(() => { st.textContent = ''; }, 4000);
});
$('hist-clear').addEventListener('click', () => { $('history').innerHTML = ''; });
