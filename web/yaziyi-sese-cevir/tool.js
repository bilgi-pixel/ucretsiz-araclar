// Yazıyı sese çevir: tarayıcının konuşma sentezi (Web Speech API) ile metin okuma.
// GİZLİLİK: yalnızca voice.localService === true (cihaz içinde çalışan) sesler listelenir ve
// kullanılır. Çevrimiçi sesler metni üretici sunucusuna gönderebileceği için bu araçta kapalıdır.
// Bu dosya hiçbir ağ isteği yapmaz, metni hiçbir yere kaydetmez (localStorage/çerez yok).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;

const MAX_CHARS = 200_000;          // tek seferde okunabilecek en uzun metin
const MAX_FILE_BYTES = 2 * 1024 * 1024; // .txt için üst sınır (2 MB)
const CHUNK_MAX = 200;              // bir konuşma parçasının en uzun karakter sayısı
const WORDS_PER_MINUTE = 150;       // süre tahmini için ortalama konuşma hızı

/* ---------- Metni cümlelere böl ---------- */

/** Metni cümle (ve çok uzunsa virgül/boşluk) sınırlarında parçalar; her parça özgün metindeki yerini taşır. */
export function splitIntoChunks(text, maxLen = CHUNK_MAX) {
  const out = [];
  const n = text.length;

  // [a, b) aralığını kırpıp ekler; çok uzunsa güvenli yerlerden böler.
  const push = (a, b) => {
    while (a < b && /\s/.test(text[a])) a++;
    while (b > a && /\s/.test(text[b - 1])) b--;
    if (a >= b) return;
    if (!/[\p{L}\p{N}]/u.test(text.slice(a, b))) return; // yalnızca noktalama: okunacak şey yok
    while (b - a > maxLen) {
      const win = text.slice(a, a + maxLen);
      let cut = Math.max(win.lastIndexOf(','), win.lastIndexOf(';'), win.lastIndexOf(':'), win.lastIndexOf('–'), win.lastIndexOf('—'));
      if (cut < maxLen * 0.4) cut = win.search(/\s\S*$/); // son boşluk
      if (cut < maxLen * 0.4) cut = maxLen - 1;           // boşluksuz uzun dizgi: sert kes
      const end = a + cut + 1;
      push2(a, end);
      a = end;
      while (a < b && /\s/.test(text[a])) a++;
    }
    push2(a, b);
  };
  const push2 = (a, b) => {
    while (b > a && /\s/.test(text[b - 1])) b--;
    if (a < b && /[\p{L}\p{N}]/u.test(text.slice(a, b))) out.push({ start: a, end: b });
  };

  let start = 0;
  for (let i = 0; i < n; i++) {
    const c = text[i];
    if (c === '\n') { push(start, i); start = i + 1; continue; }
    if (c === '.' || c === '!' || c === '?' || c === '…') {
      let j = i + 1;
      while (j < n && '.!?…"\'”’)]»'.includes(text[j])) j++;
      // "3.5" ya da "site.com" gibi boşluksuz noktalar cümle sonu sayılmaz
      if (j >= n || /\s/.test(text[j])) { push(start, j); start = j; }
      i = j - 1;
    }
  }
  push(start, n);
  return out;
}

/* ---------- Sesler (yalnızca cihaz içi) ---------- */

let voices = [];          // yalnızca localService === true olanlar, sıralı
let voicesDone = false;   // bekleme süresi bitti mi?
const NO_VOICE_MSG = 'Tarayıcınızda cihaz içi ses yok; çevrimiçi sesler metninizi sunucuya gönderdiği için bu araçta kapalıdır.';

function sortVoices(list) {
  const isTr = (v) => /^tr\b/i.test(v.lang || '');
  return list.slice().sort((a, b) => {
    if (isTr(a) !== isTr(b)) return isTr(a) ? -1 : 1;
    return (a.lang || '').localeCompare(b.lang || '') || (a.name || '').localeCompare(b.name || '');
  });
}

function voiceKey(v) { return `${v.voiceURI || ''}|${v.name || ''}|${v.lang || ''}`; }

function renderVoices() {
  const sel = $('voice');
  const prev = voices[Number(sel.value)];
  const prevKey = prev ? voiceKey(prev) : '';
  sel.textContent = '';
  if (!voices.length) {
    const o = document.createElement('option');
    o.textContent = voicesDone ? 'Cihaz içi ses bulunamadı' : 'Sesler yükleniyor…';
    o.value = '';
    sel.appendChild(o);
    sel.disabled = true;
    return;
  }
  sel.disabled = false;
  const groupTr = document.createElement('optgroup');
  groupTr.label = 'Türkçe sesler';
  const groupOther = document.createElement('optgroup');
  groupOther.label = 'Diğer diller';
  voices.forEach((v, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = `${v.name} (${v.lang})`;
    (/^tr\b/i.test(v.lang || '') ? groupTr : groupOther).appendChild(o);
  });
  if (groupTr.children.length) sel.appendChild(groupTr);
  if (groupOther.children.length) sel.appendChild(groupOther);
  // Önceki seçimi koru; yoksa ilk Türkçe ses, o da yoksa tarayıcının varsayılanı, o da yoksa ilki.
  let idx = prevKey ? voices.findIndex((v) => voiceKey(v) === prevKey) : -1;
  if (idx < 0) idx = voices.findIndex((v) => /^tr\b/i.test(v.lang || ''));
  if (idx < 0) idx = voices.findIndex((v) => v.default);
  if (idx < 0) idx = 0;
  sel.value = String(idx);
}

function currentVoice() {
  const v = voices[Number($('voice').value)];
  return v && v.localService === true ? v : null;
}

/** Ses listesini okur, yerel olmayanları ayıklar, uyarı kutularını günceller. */
function loadVoices() {
  if (!synth) return;
  let all = [];
  try { all = Array.from(synth.getVoices() || []); } catch { all = []; }
  voices = sortVoices(all.filter((v) => v && v.localService === true));
  renderVoices();
  // Sesler henüz gelmediyse kısa süre bekle (Chrome listeyi geç doldurur); sonra uyar.
  const waiting = !all.length && !voicesDone;
  $('novoice').hidden = voices.length > 0 || waiting;
  if (!voices.length && !waiting) setStatus('Cihaz içi ses yok');
  else if (voices.length && state.status === 'idle') setStatus('Hazır');
  syncButtons();
}

/* ---------- Durum ---------- */

const state = {
  status: 'idle',   // idle | speaking | paused
  runId: 0,         // yeni oturumda artar; eski oturumun olayları yok sayılır
  text: '',
  chunks: [],
  index: 0,         // okunan parça
  offset: 0,        // parça içinde yeniden başlama noktası
  wordStart: -1,    // metindeki mutlak konum: şu an okunan kelimenin başı
  utter: null,      // Chrome, referans tutulmayan konuşmayı çöpe atabiliyor
};

function setStatus(msg) { $('status').textContent = msg; }

function syncButtons() {
  const hasVoice = !!currentVoice();
  const idle = state.status === 'idle';
  $('play').disabled = !idle || !hasVoice;
  $('pause').disabled = idle;
  $('pause').textContent = state.status === 'paused' ? 'Devam et' : 'Duraklat';
  $('stop').disabled = idle;
}

/* ---------- Okunan kelimeyi vurgula ---------- */

function renderReader(from, to) {
  const t = state.text;
  $('r-before').textContent = t.slice(0, from);
  $('r-cur').textContent = t.slice(from, to);
  $('r-after').textContent = t.slice(to);
  const box = $('reader');
  const mark = $('r-cur');
  if (box.scrollHeight > box.clientHeight) {
    box.scrollTop = Math.max(0, mark.offsetTop - box.clientHeight / 2);
  }
}

function onWord(abs, len) {
  const t = state.text;
  if (abs < 0 || abs >= t.length) return;
  let end = len > 0 ? abs + len : abs;
  if (!(len > 0)) while (end < t.length && !/\s/.test(t[end])) end++;
  // sondaki noktalama vurguya girmesin
  while (end > abs + 1 && /[.,;:!?…"'”’)\]»]/.test(t[end - 1])) end--;
  state.wordStart = abs;
  renderReader(abs, end);
}

/* ---------- Konuşma ---------- */

function readSettings() {
  return { rate: Number($('rate').value) || 1, pitch: Number($('pitch').value), volume: Number($('volume').value) };
}

function speakChunk(i, offset = 0) {
  const chunk = state.chunks[i];
  const voice = currentVoice();
  if (!chunk || !voice) { finish('Okuma durdu'); return; }
  const id = state.runId;
  const set = readSettings();
  const u = new SpeechSynthesisUtterance(state.text.slice(chunk.start + offset, chunk.end));
  u.voice = voice;      // açıkça yerel ses atanır; tarayıcının varsayılanına (çevrimiçi olabilir) düşülmez
  u.lang = voice.lang;
  u.rate = set.rate;
  u.pitch = Number.isFinite(set.pitch) ? set.pitch : 1;
  u.volume = Number.isFinite(set.volume) ? set.volume : 1;
  u.onstart = () => { if (id === state.runId) setStatus(`Okunuyor · cümle ${i + 1} / ${state.chunks.length}`); };
  u.onboundary = (e) => {
    if (id !== state.runId) return;
    if (e.name && e.name !== 'word') return;
    onWord(chunk.start + offset + (e.charIndex || 0), e.charLength);
  };
  u.onend = () => {
    if (id !== state.runId) return;
    if (i + 1 < state.chunks.length) { state.offset = 0; speakChunk(i + 1, 0); }
    else finish('Okuma bitti');
  };
  u.onerror = (e) => {
    if (id !== state.runId) return;
    const code = e && e.error;
    if (code === 'canceled' || code === 'interrupted') return;
    finish('Okuma durdu');
    showError($('error'), code === 'not-allowed'
      ? 'Tarayıcı sesi başlatmaya izin vermedi. Sayfaya bir kez tıklayıp "Oku" düğmesine yeniden basın.'
      : 'Ses motoru bir hata verdi' + (code ? ` (${code})` : '') + '. Listeden başka bir ses seçin ya da sayfayı yenileyip tekrar deneyin.');
  };
  state.utter = u;
  state.index = i;
  state.offset = offset;
  try { synth.speak(u); } catch {
    finish('Okuma durdu');
    showError($('error'), 'Ses başlatılamadı. Sayfayı yenileyip tekrar deneyin.');
  }
}

function finish(msg) {
  state.runId++;
  state.status = 'idle';
  state.utter = null;
  state.wordStart = -1;
  $('reader').hidden = true;
  setStatus(msg);
  syncButtons();
}

function start() {
  showError($('error'), null);
  if (!synth) return;
  if (!currentVoice()) {
    showError($('error'), NO_VOICE_MSG + ' Aşağıdaki yönergelerle cihazınıza Türkçe ses yükleyin.');
    return;
  }
  const text = $('text').value;
  if (!/[\p{L}\p{N}]/u.test(text)) {
    showError($('error'), 'Okunacak metin yok. Kutuya bir metin yazın, yapıştırın ya da bir .txt dosyası açın.');
    return;
  }
  state.runId++;
  try { synth.cancel(); } catch { /* yoksay */ }
  state.text = text;
  state.chunks = splitIntoChunks(text);
  state.wordStart = -1;
  state.status = 'speaking';
  $('reader').hidden = false;
  renderReader(0, 0);
  setStatus('Okunuyor…');
  syncButtons();
  speakChunk(0, 0);
}

function pause() {
  if (state.status !== 'speaking') return;
  try { synth.pause(); } catch { /* yoksay */ }
  state.status = 'paused';
  setStatus('Duraklatıldı');
  syncButtons();
}

function resume() {
  if (state.status !== 'paused') return;
  try { synth.resume(); } catch { /* yoksay */ }
  state.status = 'speaking';
  setStatus(`Okunuyor · cümle ${state.index + 1} / ${state.chunks.length}`);
  syncButtons();
}

function stop() {
  if (state.status === 'idle') return;
  const wasPaused = state.status === 'paused';
  state.runId++;
  try {
    synth.cancel();
    if (wasPaused) synth.resume(); // Chrome: duraklatılmışken iptal edilirse sonraki konuşma sessiz kalır
  } catch { /* yoksay */ }
  finish('Durduruldu');
}

function toggle() {
  if (state.status === 'idle') start();
  else if (state.status === 'speaking') pause();
  else resume();
}

/** Hız/perde/ses ya da ses seçimi okuma sürerken değişirse, o kelimeden yeni ayarla devam eder. */
let liveTimer = 0;
function applyLive() {
  if (state.status !== 'speaking') return;
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => {
    if (state.status !== 'speaking') return;
    const chunk = state.chunks[state.index];
    if (!chunk || !currentVoice()) return;
    const rel = state.wordStart >= chunk.start && state.wordStart < chunk.end ? state.wordStart - chunk.start : state.offset;
    state.runId++;
    try { synth.cancel(); } catch { /* yoksay */ }
    speakChunk(state.index, rel);
  }, 250);
}

/* ---------- Metin kutusu, sayaç, dosya ---------- */

const fmtTr = new Intl.NumberFormat('tr-TR');

function updateCount() {
  const t = $('text').value;
  const words = (t.match(/[\p{L}\p{N}]+/gu) || []).length;
  const rate = Number($('rate').value) || 1;
  const seconds = Math.round((words / (WORDS_PER_MINUTE * rate)) * 60);
  let est = '';
  if (words) est = seconds < 60 ? ` · tahmini süre ${Math.max(1, seconds)} sn` : ` · tahmini süre ${Math.round(seconds / 60)} dk`;
  $('count').textContent = `${fmtTr.format(Array.from(t).length)} karakter · ${fmtTr.format(words)} kelime${est}`;
}

function setRateOut() {
  const fmt = (n, d = 1) => Number(n).toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d });
  $('rate-out').textContent = `${fmt($('rate').value)}×`;
  $('pitch-out').textContent = fmt($('pitch').value);
  $('volume-out').textContent = `%${Math.round(Number($('volume').value) * 100)}`;
}

function setInfo(msg) {
  const el = $('info');
  el.textContent = msg || '';
  el.hidden = !msg;
}

async function loadFile(file) {
  showError($('error'), null);
  setInfo('');
  if (file.size > MAX_FILE_BYTES) {
    showError($('error'), `Dosya çok büyük (${(file.size / 1048576).toFixed(1).replace('.', ',')} MB). 2 MB'a kadar düz metin dosyası seçin ya da metni bölümlere ayırın.`);
    return;
  }
  if (!/\.txt$/i.test(file.name) && !(file.type || '').startsWith('text/')) {
    showError($('error'), 'Yalnızca düz metin (.txt) dosyaları açılır. Word veya PDF belgesindeki metni kopyalayıp kutuya yapıştırabilirsiniz.');
    return;
  }
  let text;
  try {
    const buf = await file.arrayBuffer();
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(buf); }
    catch { text = new TextDecoder('windows-1254').decode(buf); } // eski Türkçe .txt dosyaları
  } catch {
    showError($('error'), 'Dosya okunamadı. Dosyayı yeniden seçin ya da metni kutuya yapıştırın.');
    return;
  }
  if (text.includes('\u0000')) {
    showError($('error'), 'Bu dosya düz metin gibi görünmüyor. Metni bir .txt dosyası olarak kaydedip yeniden seçin.');
    return;
  }
  if (!text.trim()) {
    showError($('error'), 'Dosya boş görünüyor. Metin içeren bir .txt dosyası seçin.');
    return;
  }
  stop();
  if (text.length > MAX_CHARS) {
    let cut = text.lastIndexOf(' ', MAX_CHARS);
    if (cut < MAX_CHARS * 0.9) cut = MAX_CHARS;
    text = text.slice(0, cut);
    setInfo(`Metin çok uzun olduğu için ilk ${fmtTr.format(MAX_CHARS)} karakter alındı. Kalan bölümü ayrı bir dosya olarak okutabilirsiniz.`);
  }
  $('text').value = text;
  updateCount();
  setStatus(`“${file.name}” açıldı`);
}

/* ---------- Olaylar ---------- */

function init() {
  setRateOut();
  updateCount();

  if (!synth) {
    $('nosynth').hidden = false;
    $('voice').disabled = true;
    ['play', 'pause', 'stop'].forEach((id) => { $(id).disabled = true; });
    setStatus('Tarayıcı desteklemiyor');
    return;
  }

  // Önceki sayfadan kalan konuşma varsa sustur (Chrome yenilemede konuşmayı sürdürebilir).
  try { synth.cancel(); } catch { /* yoksay */ }

  loadVoices();
  if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', loadVoices);
  // Bazı tarayıcılar voiceschanged göndermez: kısa aralıklarla yokla, ~2 sn sonra bırak.
  let polls = 0;
  const poll = setInterval(() => {
    polls++;
    if (voices.length || polls >= 8) {
      clearInterval(poll);
      if (!voices.length) { voicesDone = true; loadVoices(); }
      return;
    }
    loadVoices();
  }, 250);

  $('play').addEventListener('click', start);
  $('pause').addEventListener('click', () => (state.status === 'paused' ? resume() : pause()));
  $('stop').addEventListener('click', stop);
  $('clear').addEventListener('click', () => {
    stop();
    $('text').value = '';
    showError($('error'), null);
    setInfo('');
    updateCount();
    $('text').focus();
  });
  $('text').addEventListener('input', updateCount);
  $('voice').addEventListener('change', () => { syncButtons(); applyLive(); });
  ['rate', 'pitch', 'volume'].forEach((id) => $(id).addEventListener('input', () => { setRateOut(); updateCount(); applyLive(); }));

  $('file-btn').addEventListener('click', () => $('file').click());
  $('file').addEventListener('change', () => {
    const f = $('file').files && $('file').files[0];
    $('file').value = '';
    if (f) loadFile(f);
  });

  // Sayfadan ayrılırken konuşma dursun
  window.addEventListener('pagehide', () => { try { synth.cancel(); } catch { /* yoksay */ } });

  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter: metin kutusundayken bile başlat / duraklat / devam
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); toggle(); return; }
    if (e.key === 'Escape' && state.status !== 'idle') { e.preventDefault(); stop(); return; }
    const t = e.target;
    const tag = t && t.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === ' ' && tag !== 'BUTTON' && tag !== 'A' && tag !== 'SUMMARY') {
      e.preventDefault();
      toggle();
    } else if (e.key === '+' || e.key === '=' || e.key === '-') {
      const r = $('rate');
      const next = Math.min(2, Math.max(0.5, Math.round((Number(r.value) + (e.key === '-' ? -0.1 : 0.1)) * 10) / 10));
      r.value = String(next);
      r.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
}

init();
