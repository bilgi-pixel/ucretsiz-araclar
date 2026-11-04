// Bebek İsmi Bulucu — isim listesi aynı klasördeki isimler.json dosyasından okunur (dış istek yok).
// Süzme, rastgele öneri ve favori listesi tamamen tarayıcıda çalışır; favoriler yalnızca sayfa belleğinde tutulur,
// hiçbir yere (localStorage dahil) kaydedilmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const PAGE_SIZE = 50;
const CINS_LABEL = { k: 'Kız', e: 'Erkek', u: 'Unisex' };

let names = [];      // tüm kayıtlar (ada göre sıralı)
let filtered = [];   // geçerli süzgece uyanlar
let shown = 0;       // tabloda gösterilen satır sayısı
const favs = [];     // favori adlar (ekleme sırasıyla), yalnızca bellekte

/** Türkçe küçük harf kuralı: I → ı, İ → i. */
const lower = (s) => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLocaleLowerCase('tr-TR');
/** Arama için normalleştirme: küçük harf + şapkalı harfler (â, î, û) sade harfe indirilir. */
const norm = (s) => lower(s).replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
/** Yalnızca harfleri bırakır (rakam, boşluk ve noktalama atılır). */
const lettersOnly = (s) => Array.from(norm(s)).filter((c) => /[a-zçğıöşü]/.test(c)).join('');

/* ---------- Süzme ---------- */

/** Arayüzdeki süzgeç değerlerini okur; geçersizse hata mesajı döndürür. */
function readFilters() {
  const o = {
    cins: $('f-cins').value,
    first: $('f-first').value,
    min: Number($('f-min').value) || 0,
    max: Number($('f-max').value) || 0,
    hece: Number($('f-hece').value) || 0,
    koken: $('f-koken').value,
    contains: Array.from(new Set(lettersOnly($('f-contains').value))),
    anlam: norm($('f-anlam').value).split(/\s+/).filter(Boolean),
  };
  const rawContains = $('f-contains').value;
  $('contains-note').hidden = !(rawContains && lettersOnly(rawContains).length !== norm(rawContains).replace(/\s/g, '').length);
  if (o.min && o.max && o.min > o.max) {
    o.error = 'En az harf sayısı, en çok harf sayısından büyük olamaz. İki değeri düzeltip tekrar deneyin.';
  }
  return o;
}

/** Bir kaydın süzgece uyup uymadığı. Unisex adlar kız ve erkek aramalarına da dahildir. */
export function matches(n, o) {
  if (o.cins === 'k' && n.cins === 'e') return false;
  if (o.cins === 'e' && n.cins === 'k') return false;
  if (o.cins === 'u' && n.cins !== 'u') return false;
  const ad = norm(n.ad);
  if (o.first && !ad.startsWith(o.first)) return false;
  if (o.min && ad.length < o.min) return false;
  if (o.max && ad.length > o.max) return false;
  if (o.hece && n.hece !== o.hece) return false;
  if (o.koken && n.koken !== o.koken) return false;
  if (o.contains.length && !o.contains.every((c) => ad.includes(c))) return false;
  if (o.anlam.length) {
    const a = norm(n.anlam);
    if (!o.anlam.every((t) => a.includes(t))) return false;
  }
  return true;
}

/* ---------- Görünüm ---------- */

function makeFavButton(n) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'ni-fav';
  b.dataset.ad = n.ad;
  b.setAttribute('aria-pressed', 'false');
  b.textContent = '☆';
  b.setAttribute('aria-label', `${n.ad} adını favorilere ekle`);
  return b;
}

function cell(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text !== undefined) el.textContent = text;
  return el;
}

function metaText(n) {
  return `${CINS_LABEL[n.cins]} · ${n.hece} hece · ${Array.from(n.ad).length} harf`;
}

function appendRows(from, to) {
  const body = $('t-body');
  for (const n of filtered.slice(from, to)) {
    const tr = document.createElement('tr');
    const tdAd = cell('td', 'ni-ad');
    tdAd.appendChild(cell('strong', '', n.ad));
    tdAd.appendChild(cell('small', '', metaText(n)));
    tr.appendChild(tdAd);
    tr.appendChild(cell('td', 'ni-anlam', n.anlam));
    tr.appendChild(cell('td', 'ni-koken', n.koken));
    const tdFav = cell('td', 'ni-favtd');
    tdFav.appendChild(makeFavButton(n));
    tr.appendChild(tdFav);
    body.appendChild(tr);
  }
  syncFavButtons();
}

function renderTable() {
  $('t-body').textContent = '';
  shown = Math.min(PAGE_SIZE, filtered.length);
  appendRows(0, shown);
  updateMore();
  $('empty').hidden = filtered.length > 0;
  $('table-wrap').hidden = filtered.length === 0;
}

function updateMore() {
  const left = filtered.length - shown;
  $('more').hidden = left <= 0;
  if (left > 0) $('more').textContent = `Daha fazla göster (${left} isim daha)`;
}

function update() {
  if (!names.length) return;
  const o = readFilters();
  if (o.error) {
    showError($('error'), o.error);
    filtered = [];
    $('count').textContent = 'Harf sayısı aralığı geçersiz';
    $('t-body').textContent = '';
    $('empty').hidden = true; $('table-wrap').hidden = true; $('more').hidden = true;
    return;
  }
  showError($('error'), '');
  filtered = names.filter((n) => matches(n, o));
  $('count').textContent = `${filtered.length} isim bulundu`;
  renderTable();
}

/* ---------- Rastgele öneri ---------- */

function pickRandom(pool, count) {
  const arr = pool.slice();
  const out = [];
  while (out.length < count && arr.length) {
    out.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
  }
  return out;
}

function suggest() {
  const o = readFilters();
  if (o.error) { showError($('error'), o.error); return; }
  const pool = names.filter((n) => matches(n, o));
  if (!pool.length) {
    showError($('error'), 'Seçtiğiniz süzgeçlere uyan isim yok, bu yüzden öneri üretilemedi. Köken, harf sayısı ya da anlam kutusunu gevşetin; "Filtreleri temizle" ile baştan başlayabilirsiniz.');
    $('random-box').hidden = true;
    return;
  }
  showError($('error'), '');
  const picks = pickRandom(pool, 5);
  const ul = $('random-list');
  ul.textContent = '';
  for (const n of picks) {
    const li = document.createElement('li');
    li.className = 'ni-card';
    const top = cell('div', 'ni-card-top');
    top.appendChild(cell('strong', 'ni-card-ad', n.ad));
    top.appendChild(makeFavButton(n));
    li.appendChild(top);
    li.appendChild(cell('p', 'ni-card-anlam', n.anlam));
    li.appendChild(cell('small', '', `${n.koken} · ${metaText(n)}`));
    ul.appendChild(li);
  }
  $('random-title').textContent = pool.length < 5 ? `Önerilen isimler (${picks.length})` : 'Size önerilen 5 isim';
  $('random-box').hidden = false;
  syncFavButtons();
}

/* ---------- Favoriler ---------- */

const findByAd = (ad) => names.find((n) => n.ad === ad);

function toggleFav(ad) {
  const i = favs.indexOf(ad);
  if (i >= 0) favs.splice(i, 1); else favs.push(ad);
  $('fav-status').textContent = '';
  syncFavButtons();
}

function syncFavButtons() {
  document.querySelectorAll('.ni-fav').forEach((b) => {
    const on = favs.includes(b.dataset.ad);
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? '★' : '☆';
    b.setAttribute('aria-label', on ? `${b.dataset.ad} adını favorilerden çıkar` : `${b.dataset.ad} adını favorilere ekle`);
  });
  renderFavList();
}

function renderFavList() {
  const ul = $('fav-list');
  ul.textContent = '';
  $('fav-empty').hidden = favs.length > 0;
  $('fav-count').textContent = `Favori listem (${favs.length})`;
  for (const ad of favs) {
    const n = findByAd(ad);
    const li = document.createElement('li');
    li.className = 'ni-favitem';
    const txt = cell('span', 'ni-favtext');
    txt.appendChild(cell('strong', '', ad));
    if (n) txt.appendChild(cell('small', '', ` — ${n.anlam}`));
    li.appendChild(txt);
    const rm = cell('button', 'ni-remove', 'Kaldır');
    rm.type = 'button';
    rm.dataset.ad = ad;
    rm.setAttribute('aria-label', `${ad} adını favori listesinden kaldır`);
    li.appendChild(rm);
    ul.appendChild(li);
  }
  $('fav-copy').disabled = favs.length === 0;
  $('fav-clear').disabled = favs.length === 0;
}

async function copyFavs() {
  const st = $('fav-status');
  if (!favs.length) {
    showError($('error'), 'Favori listeniz boş. Tablodaki ☆ düğmesiyle isim ekleyin, sonra kopyalayın.');
    return;
  }
  showError($('error'), '');
  const text = favs.join(', ');
  try {
    await navigator.clipboard.writeText(text);
    st.textContent = `Favori listesi panoya kopyalandı (${favs.length} isim).`;
  } catch {
    st.textContent = 'Kopyalanamadı; listeyi elle seçip kopyalayın.';
  }
}

/* ---------- Başlatma ---------- */

function buildFirstLetters() {
  const set = new Set(names.map((n) => norm(n.ad)[0]));
  const sel = $('f-first');
  Array.from(set).sort((a, b) => a.localeCompare(b, 'tr')).forEach((c) => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c.toLocaleUpperCase('tr-TR');
    sel.appendChild(o);
  });
}

function clearFilters() {
  ['f-cins', 'f-first', 'f-hece', 'f-koken'].forEach((id) => { $(id).value = ''; });
  ['f-min', 'f-max', 'f-contains', 'f-anlam'].forEach((id) => { $(id).value = ''; });
  $('random-box').hidden = true;
  update();
  $('f-cins').focus();
}

async function init() {
  try {
    const res = await fetch('isimler.json');
    if (!res.ok) throw new Error('http');
    names = await res.json();
    if (!Array.isArray(names) || !names.length) throw new Error('bos');
    names.sort((a, b) => a.ad.localeCompare(b.ad, 'tr'));
  } catch {
    showError($('error'), 'İsim listesi yüklenemedi. Sayfayı yenileyin; sorun sürerse tarayıcı önbelleğini temizleyip tekrar deneyin.');
    $('count').textContent = 'Liste yüklenemedi';
    return;
  }
  buildFirstLetters();
  document.querySelectorAll('.ni-live').forEach((el) => el.addEventListener('input', update));
  document.querySelectorAll('.ni-live-change').forEach((el) => el.addEventListener('change', update));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('random').addEventListener('click', suggest);
  $('clear').addEventListener('click', clearFilters);
  $('more').addEventListener('click', () => {
    const from = shown;
    shown = Math.min(filtered.length, shown + PAGE_SIZE);
    appendRows(from, shown);
    updateMore();
  });
  // Favori düğmeleri tablo, öneri kartları ve favori listesinde ortak: olay delegasyonu
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.ni-fav');
    if (fav) { toggleFav(fav.dataset.ad); return; }
    const rm = e.target.closest('.ni-remove');
    if (rm) { toggleFav(rm.dataset.ad); }
  });
  $('fav-copy').addEventListener('click', copyFavs);
  $('fav-clear').addEventListener('click', () => { favs.length = 0; $('fav-status').textContent = ''; syncFavButtons(); });
  renderFavList();
  document.body.dataset.ready = '1';
  update();
}

init();
