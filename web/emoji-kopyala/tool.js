// Emoji Kopyala — tamamen istemci tarafı. Arama, seçim ve "son kullanılanlar" yalnızca bu tarayıcıda kalır;
// hiçbir şey sunucuya gönderilmez. Liste emoji-data.js içindedir (ağ isteği gerekmez, çevrimdışı çalışır).
import { showError } from '../assets/js/ba.js';
import EMOJIS from './emoji-data.js';

const $ = (id) => document.getElementById(id);

// Sekmeler: "son" özel sekmedir (localStorage), diğerleri veri dosyasındaki cat değeriyle eşleşir.
const CATEGORIES = [
  { id: 'son', label: 'Son kullanılanlar' },
  { id: 'yuzler', label: 'Yüzler' },
  { id: 'eller', label: 'Eller ve insanlar' },
  { id: 'kalpler', label: 'Kalpler' },
  { id: 'hayvanlar', label: 'Hayvanlar ve doğa' },
  { id: 'yiyecek', label: 'Yiyecek ve içecek' },
  { id: 'aktivite', label: 'Aktivite' },
  { id: 'seyahat', label: 'Seyahat ve yerler' },
  { id: 'nesneler', label: 'Nesneler' },
  { id: 'semboller', label: 'Semboller' },
  { id: 'bayraklar', label: 'Bayraklar' },
];
// Fitzpatrick ten rengi değiştiricileri (U+1F3FB–U+1F3FF)
const TONES = [
  { value: '', label: 'Varsayılan' },
  { value: '\u{1F3FB}', label: 'Açık' },
  { value: '\u{1F3FC}', label: 'Orta açık' },
  { value: '\u{1F3FD}', label: 'Orta' },
  { value: '\u{1F3FE}', label: 'Orta koyu' },
  { value: '\u{1F3FF}', label: 'Koyu' },
];
const RECENT_KEY = 'ba-emoji-son';
const TONE_KEY = 'ba-emoji-ten';
const RECENT_MAX = 30;
const VS16 = /\uFE0F/g;
const TONE_MODS = /[\u{1F3FB}-\u{1F3FF}]/gu;

/* ---------- Yardımcılar ---------- */
// Arama için: aksanları at, noktasız ı'yı i yap, küçük harfe çevir (ş→s, ğ→g, İ→i ...).
// Yalnızca adlara uygulanır; emoji karakterlerinin kendisine dokunulmaz.
function norm(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036F]/g, '').replace(/ı/g, 'i').toLowerCase();
}
// Emoji'yi ten rengi ve görünüm seçicisinden bağımsız karşılaştırmak için anahtar
const baseKey = (s) => s.replace(VS16, '').replace(TONE_MODS, '');
const codePoints = (s) => Array.from(s).map((c) => c.codePointAt(0));
const hex = (n) => n.toString(16).toUpperCase().padStart(4, '0');

function applyTone(item, tone) {
  if (!tone || !item.tone) return item.emoji;
  const chars = Array.from(item.emoji.replace(VS16, ''));
  return chars[0] + tone + chars.slice(1).join('');
}

// localStorage kapalı olabilir (gizli mod, kısıtlı tarayıcı): hata sessizce yutulur.
function readStore(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
}
function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* saklanamadı: oturum içinde çalışmaya devam */ }
}

/* ---------- Veri indeksi ---------- */
const INDEX = EMOJIS.map((item, order) => ({ item, order, tr: norm(item.tr), en: norm(item.en), kw: norm(item.kw || '') }));
const BY_KEY = new Map(EMOJIS.map((e) => [baseKey(e.emoji), e]));
const BY_CAT = new Map();
for (const e of EMOJIS) {
  if (!BY_CAT.has(e.cat)) BY_CAT.set(e.cat, []);
  BY_CAT.get(e.cat).push(e);
}

// Türkçe/İngilizce anlık arama: her sözcük adın bir yerinde geçmeli; sözcük başı eşleşmesi öne çıkar.
function search(query) {
  const raw = query.trim();
  const tokens = norm(raw).split(/\s+/).filter(Boolean);
  const rawKey = baseKey(raw);
  const hits = [];
  for (const r of INDEX) {
    let score = 0;
    if (rawKey && rawKey.includes(baseKey(r.item.emoji))) score = 10; // emoji yapıştırıldıysa
    else {
      let ok = tokens.length > 0;
      for (const t of tokens) {
        if ((' ' + r.tr).includes(' ' + t) || (' ' + r.en).includes(' ' + t)) score += 3;
        else if (r.tr.includes(t) || r.en.includes(t)) score += 2;
        else if (r.kw.includes(t)) score += 1;
        else { ok = false; break; }
      }
      if (!ok) continue;
    }
    hits.push({ item: r.item, order: r.order, score });
  }
  hits.sort((a, b) => b.score - a.score || a.order - b.order);
  return hits.map((h) => h.item);
}

/* ---------- Durum ---------- */
const savedRecent = readStore(RECENT_KEY, []);
const state = {
  cat: 'yuzler',
  query: '',
  tone: '',
  recent: Array.isArray(savedRecent) ? savedRecent.filter((s) => typeof s === 'string') : [],
};
{
  const saved = readStore(TONE_KEY, '');
  if (TONES.some((t) => t.value === saved)) state.tone = saved;
}

/* ---------- Kopyalama ---------- */
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
    b.className = 'ek-tab';
    b.id = `tab-${c.id}`;
    b.dataset.cat = c.id;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'grid');
    b.textContent = c.label;
    tabsEl.appendChild(b);
  }
}

function buildTones() {
  const box = $('tones');
  box.innerHTML = '';
  TONES.forEach((t, i) => {
    const label = document.createElement('label');
    label.className = 'ek-tone-opt';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'tone';
    radio.value = t.value;
    radio.checked = t.value === state.tone;
    radio.id = `tone-${i}`;
    const span = document.createElement('span');
    const sample = document.createElement('b');
    sample.setAttribute('aria-hidden', 'true');
    sample.textContent = '👍' + t.value;
    span.append(sample, ' ' + t.label);
    label.append(radio, span);
    box.appendChild(label);
  });
}

function currentEntries() {
  if (state.query.trim()) return search(state.query).map((item) => ({ item, emoji: applyTone(item, state.tone) }));
  if (state.cat === 'son') {
    return state.recent
      .map((s) => ({ item: BY_KEY.get(baseKey(s)), emoji: s }))
      .filter((x) => x.item);
  }
  return (BY_CAT.get(state.cat) || []).map((item) => ({ item, emoji: applyTone(item, state.tone) }));
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
  for (const { item, emoji } of entries) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ek-cell';
    b.dataset.emoji = emoji;
    const toned = emoji !== item.emoji && item.tone;
    b.setAttribute('aria-label', item.tr + (toned ? ' (ten rengi seçili)' : ''));
    b.title = `${item.tr} · ${codePoints(emoji).map((n) => 'U+' + hex(n)).join(' ')}`;
    b.textContent = emoji;
    frag.appendChild(b);
  }
  grid.appendChild(frag);

  const empty = $('empty');
  const count = $('count');
  empty.hidden = entries.length > 0;
  if (searching) {
    const q = state.query.trim();
    count.textContent = entries.length ? `“${q}” için ${entries.length} sonuç` : '';
    empty.textContent = `“${q}” ile eşleşen emoji bulunamadı. Türkçe bir sözcük (kalp, kedi, bayrak) ya da İngilizce adını (heart, cat) deneyin.`;
  } else if (state.cat === 'son') {
    count.textContent = entries.length ? `Son kullanılanlar: ${entries.length} emoji` : '';
    empty.textContent = 'Henüz emoji kopyalamadınız. Bir emojiye tıkladığınızda burada listelenir; liste yalnızca bu tarayıcıda saklanır.';
  } else {
    const c = CATEGORIES.find((x) => x.id === state.cat);
    count.textContent = `${c.label}: ${entries.length} emoji`;
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

function showDetail(emoji, item) {
  $('d-emoji').textContent = emoji;
  $('d-tr').textContent = item.tr;
  $('d-en').textContent = item.en;
  $('d-cp').textContent = codePoints(emoji).map((n) => 'U+' + hex(n)).join(' ');
  $('d-html').textContent = codePoints(emoji).map((n) => `&#x${n.toString(16).toUpperCase()};`).join('');
}

function pushRecent(emoji) {
  const key = baseKey(emoji);
  state.recent = [emoji, ...state.recent.filter((s) => baseKey(s) !== key)].slice(0, RECENT_MAX);
  writeStore(RECENT_KEY, state.recent);
}

async function choose(emoji, item) {
  showError($('error'), null);
  showDetail(emoji, item);
  compose.value += emoji;
  pushRecent(emoji);
  const ok = await copyText(emoji);
  const status = $('status');
  if (ok) {
    status.textContent = `Kopyalandı: ${emoji} ${item.tr}`;
  } else {
    status.textContent = '';
    showError($('error'), "Panoya kopyalanamadı. Emoji aşağıdaki birleştirme alanına eklendi; oradan seçip Ctrl+C (Mac'te Cmd+C) ile kopyalayabilirsiniz.");
  }
}

/* ---------- Olaylar ---------- */
buildTabs();
buildTones();

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.ek-cell');
  if (!btn) return;
  const emoji = btn.dataset.emoji;
  const item = BY_KEY.get(baseKey(emoji));
  if (item) choose(emoji, item);
});

tabsEl.addEventListener('click', (e) => {
  const b = e.target.closest('.ek-tab');
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

$('tones').addEventListener('change', (e) => {
  if (e.target.name !== 'tone') return;
  state.tone = e.target.value;
  writeStore(TONE_KEY, state.tone);
  render();
});

$('recent-clear').addEventListener('click', () => {
  state.recent = [];
  writeStore(RECENT_KEY, state.recent);
  $('status').textContent = 'Son kullanılanlar temizlendi.';
  render();
});

$('compose-copy').addEventListener('click', async () => {
  if (!compose.value) { showError($('error'), 'Birleştirme alanı boş. Önce yukarıdan bir ya da birkaç emojiye tıklayın.'); return; }
  showError($('error'), null);
  const ok = await copyText(compose.value);
  if (ok) $('status').textContent = `Birleştirilen metin kopyalandı: ${compose.value}`;
  else showError($('error'), "Kopyalanamadı. Metni fareyle ya da parmakla seçip Ctrl+C (Mac'te Cmd+C) ile kopyalayabilirsiniz.");
});
$('compose-undo').addEventListener('click', () => {
  const v = compose.value;
  if (!v) return;
  // Son "karakteri" sil: ZWJ'li ya da ten rengi eklenmiş emoji tek parça sayılır.
  let cut = Array.from(v).slice(-1)[0].length;
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segs = Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(v));
    if (segs.length) cut = segs[segs.length - 1].segment.length;
  }
  compose.value = v.slice(0, v.length - cut);
});
$('compose-clear').addEventListener('click', () => { compose.value = ''; compose.focus(); });

render();
