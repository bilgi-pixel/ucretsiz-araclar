// Özel Karakter ve Sembol Kopyala — tamamen istemci tarafı. Arama ve seçimler hiçbir yere gönderilmez.
// Liste karakter-data.js içindedir (ağ isteği gerekmez, çevrimdışı çalışır).
import { showError } from '../assets/js/ba.js';
import CHARS from './karakter-data.js';

const $ = (id) => document.getElementById(id);

const CATEGORIES = [
  { id: 'son', label: 'Son kullanılanlar' },
  { id: 'matematik', label: 'Matematik' },
  { id: 'para', label: 'Para birimleri' },
  { id: 'oklar', label: 'Oklar' },
  { id: 'tik', label: 'Tik ve çarpı' },
  { id: 'yildiz', label: 'Yıldız ve şekiller' },
  { id: 'latin', label: 'Latin ve Türkçe harfler' },
  { id: 'yunan', label: 'Yunan harfleri' },
  { id: 'simge', label: 'Üst ve alt simge' },
  { id: 'kesir', label: 'Kesirler ve sayılar' },
  { id: 'telif', label: 'Telif ve işaretler' },
  { id: 'noktalama', label: 'Noktalama' },
  { id: 'cizgi', label: 'Çizgi ve kutu' },
  { id: 'burc', label: 'Burç ve gezegen' },
  { id: 'oyun', label: 'Oyun ve satranç' },
  { id: 'muzik', label: 'Müzik' },
  { id: 'cesitli', label: 'Çeşitli' },
];
const RECENT_KEY = 'ba-karakter-son';
const RECENT_MAX = 30;

/* ---------- Yardımcılar ---------- */
// Arama için: aksanları at, noktasız ı'yı i yap, küçük harfe çevir (ş→s, ğ→g, İ→i ...).
function norm(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036F]/g, '').replace(/ı/g, 'i').toLowerCase();
}
const codePoints = (s) => Array.from(s).map((c) => c.codePointAt(0));
const hex = (n) => n.toString(16).toUpperCase().padStart(4, '0');

function readStore(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
}
function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* saklanamadı: oturum içinde çalışmaya devam */ }
}

/* ---------- Veri indeksi ---------- */
// Aynı karakter birden çok kategoride olabilir (ör. ♥ hem şekil hem iskambil): aramada tek kayıt, adları birleşik.
const BY_CHAR = new Map();
for (const e of CHARS) {
  const rec = BY_CHAR.get(e.char);
  if (rec) { rec.all += ' ' + norm(e.ad + ' ' + (e.kw || '')); rec.ent = rec.ent || e.ent; }
  else BY_CHAR.set(e.char, { item: e, order: BY_CHAR.size, all: norm(e.ad + ' ' + (e.kw || '')), name: norm(e.ad), ent: e.ent });
}
const BY_CAT = new Map();
for (const e of CHARS) {
  if (!BY_CAT.has(e.cat)) BY_CAT.set(e.cat, []);
  BY_CAT.get(e.cat).push(e);
}
const itemOf = (ch) => (BY_CHAR.get(ch) || {}).item;

// Ada göre arama: her sözcük adın/anahtar sözcüklerin içinde geçmeli; sözcük başı eşleşmesi öne çıkar.
function search(query) {
  const raw = query.trim();
  const m = /^u\+([0-9a-f]{2,6})$/i.exec(raw);
  const hits = [];
  if (m) {
    const ch = String.fromCodePoint(parseInt(m[1], 16));
    if (BY_CHAR.has(ch)) hits.push(BY_CHAR.get(ch).item);
    return hits;
  }
  const tokens = norm(raw).split(/\s+/).filter(Boolean);
  const scored = [];
  for (const rec of BY_CHAR.values()) {
    let score = 0;
    if (raw.includes(rec.item.char)) score = 10; // karakter yapıştırıldıysa
    else {
      let ok = tokens.length > 0;
      for (const t of tokens) {
        if ((' ' + rec.name).includes(' ' + t)) score += 3;
        else if (rec.all.includes(' ' + t) || rec.all.startsWith(t)) score += 2;
        else if (rec.all.includes(t)) score += 1;
        else { ok = false; break; }
      }
      if (!ok) continue;
    }
    scored.push({ item: rec.item, order: rec.order, score });
  }
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.map((h) => h.item);
}

/* ---------- Durum ve kopyalama ---------- */
const savedRecent = readStore(RECENT_KEY, []);
const state = {
  cat: 'matematik',
  query: '',
  recent: Array.isArray(savedRecent) ? savedRecent.filter((s) => typeof s === 'string') : [],
};

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Eski tarayıcı ya da izin yok: geçici metin alanıyla kopyala.
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

/* ---------- Arayüz ---------- */
const tabsEl = $('tabs');
const grid = $('grid');
const input = $('search');
const compose = $('compose');

function buildTabs() {
  tabsEl.innerHTML = '';
  for (const c of CATEGORIES) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'oz-tab';
    b.id = `tab-${c.id}`;
    b.dataset.cat = c.id;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'grid');
    b.textContent = c.label;
    tabsEl.appendChild(b);
  }
}

function currentEntries() {
  if (state.query.trim()) return search(state.query);
  if (state.cat === 'son') return state.recent.map(itemOf).filter(Boolean);
  return BY_CAT.get(state.cat) || [];
}

function render() {
  const searching = state.query.trim() !== '';
  for (const b of tabsEl.children) {
    const on = b.dataset.cat === state.cat;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
    b.classList.toggle('is-muted', searching);
  }
  if (searching) { grid.removeAttribute('aria-labelledby'); grid.setAttribute('aria-label', 'Arama sonuçları'); }
  else { grid.removeAttribute('aria-label'); grid.setAttribute('aria-labelledby', `tab-${state.cat}`); }

  const entries = currentEntries();
  grid.textContent = '';
  const frag = document.createDocumentFragment();
  for (const item of entries) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'oz-cell';
    b.dataset.char = item.char;
    b.setAttribute('aria-label', item.ad);
    b.title = `${item.ad} · ${codePoints(item.char).map((n) => 'U+' + hex(n)).join(' ')}`;
    b.textContent = item.char;
    frag.appendChild(b);
  }
  grid.appendChild(frag);

  const empty = $('empty');
  const count = $('count');
  empty.hidden = entries.length > 0;
  if (searching) {
    const q = state.query.trim();
    count.textContent = entries.length ? `“${q}” için ${entries.length} sonuç` : '';
    empty.textContent = `“${q}” ile eşleşen karakter bulunamadı. Başka bir sözcük (tik, euro, ok, kalp) deneyin ya da ilgili kategori sekmesine bakın.`;
  } else if (state.cat === 'son') {
    count.textContent = entries.length ? `Son kullanılanlar: ${entries.length} karakter` : '';
    empty.textContent = 'Henüz karakter kopyalamadınız. Bir karaktere tıkladığınızda burada listelenir; liste yalnızca bu tarayıcıda saklanır.';
  } else {
    const c = CATEGORIES.find((x) => x.id === state.cat);
    count.textContent = `${c.label}: ${entries.length} karakter`;
  }
  grid.hidden = entries.length === 0;
  $('recent-clear').hidden = !(state.cat === 'son' && !searching && state.recent.length);
}

function selectCategory(id, focus = false) {
  state.cat = id;
  state.query = '';
  input.value = '';
  render();
  if (focus) $(`tab-${id}`).focus();
}

// Seçili karakterin Unicode, HTML, CSS ve JavaScript gösterimleri
function showDetail(item) {
  const cps = codePoints(item.char);
  $('d-char').textContent = item.char;
  $('d-ad').textContent = item.ad;
  $('d-cp').textContent = cps.map((n) => 'U+' + hex(n)).join(' ');
  const rec = BY_CHAR.get(item.char);
  const numeric = cps.map((n) => `&#${n};`).join('');
  $('d-html').textContent = rec && rec.ent ? `${numeric} veya &${rec.ent};` : numeric;
  const BS = String.fromCharCode(92); // ters bölü
  $('d-css').textContent = cps.map((n) => BS + n.toString(16).toUpperCase()).join('');
  $('d-js').textContent = cps.map((n) => (n > 0xffff ? `${BS}u{${n.toString(16).toUpperCase()}}` : `${BS}u${hex(n)}`)).join('');
}

function pushRecent(ch) {
  state.recent = [ch, ...state.recent.filter((s) => s !== ch)].slice(0, RECENT_MAX);
  writeStore(RECENT_KEY, state.recent);
}

async function choose(item) {
  showError($('error'), null);
  showDetail(item);
  compose.value += item.char;
  pushRecent(item.char);
  const ok = await copyText(item.char);
  const status = $('status');
  if (ok) {
    status.textContent = `Kopyalandı: ${item.char} ${item.ad}`;
  } else {
    status.textContent = '';
    showError($('error'), "Panoya kopyalanamadı. Karakter aşağıdaki birleştirme alanına eklendi; oradan seçip Ctrl+C (Mac'te Cmd+C) ile kopyalayabilirsiniz.");
  }
}

/* ---------- Olaylar ---------- */
buildTabs();

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.oz-cell');
  if (!btn) return;
  const item = itemOf(btn.dataset.char);
  if (item) choose(item);
});
tabsEl.addEventListener('click', (e) => {
  const b = e.target.closest('.oz-tab');
  if (b) selectCategory(b.dataset.cat);
});
tabsEl.addEventListener('keydown', (e) => {
  const tabs = Array.from(tabsEl.children);
  const i = tabs.findIndex((t) => t === document.activeElement);
  if (i < 0) return;
  let n = -1;
  if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') n = 0;
  else if (e.key === 'End') n = tabs.length - 1;
  if (n >= 0) { e.preventDefault(); selectCategory(tabs[n].dataset.cat, true); }
});
input.addEventListener('input', () => { state.query = input.value; render(); });

$('recent-clear').addEventListener('click', () => {
  state.recent = [];
  writeStore(RECENT_KEY, state.recent);
  $('status').textContent = 'Son kullanılanlar temizlendi.';
  render();
});
$('compose-copy').addEventListener('click', async () => {
  if (!compose.value) { showError($('error'), 'Birleştirme alanı boş. Önce yukarıdan bir ya da birkaç karaktere tıklayın.'); return; }
  showError($('error'), null);
  const ok = await copyText(compose.value);
  if (ok) $('status').textContent = `Birleştirilen metin kopyalandı: ${compose.value}`;
  else showError($('error'), "Kopyalanamadı. Metni fareyle ya da parmakla seçip Ctrl+C (Mac'te Cmd+C) ile kopyalayabilirsiniz.");
});
$('compose-undo').addEventListener('click', () => {
  const v = compose.value;
  if (!v) return;
  compose.value = Array.from(v).slice(0, -1).join('');
});
$('compose-clear').addEventListener('click', () => { compose.value = ''; compose.focus(); });

render();
