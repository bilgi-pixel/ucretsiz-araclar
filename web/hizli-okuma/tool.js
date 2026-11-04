// Hızlı okuma (RSVP): kelimeler tek tek ortada gösterilir; optimal tanıma noktası (ORP) kırmızıdır.
// Okuma hızı testi: 200 kelimelik metin + 5 anlama sorusu. Hiçbir ağ isteği yok; metin tarayıcıda kalır.
// localStorage yalnızca "ba-hizli-okuma" anahtarında son 5 test sonucunu tutar (metin kaydedilmez).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

const STORE_KEY = 'ba-hizli-okuma';
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_WORDS = 300_000;

/* ---------- Metni kelimelere ayır ---------- */

/** Kelimeler + her kelimenin paragraf sonu olup olmadığı. Çok uzun dizgiler 18 karakterlik parçalara bölünür. */
export function tokenize(text) {
  const words = [];
  const para = [];
  for (const m of text.matchAll(/(\S+)(\s*)/gu)) {
    let w = m[1].replace(/[\u0000-\u001f\u007f]/g, '');
    if (!w) continue;
    const isPara = (m[2].match(/\n/g) || []).length >= 2;
    const parts = [];
    const chars = Array.from(w);
    if (chars.length > 24) for (let i = 0; i < chars.length; i += 18) parts.push(chars.slice(i, i + 18).join(''));
    else parts.push(w);
    parts.forEach((p, k) => { words.push(p); para.push(isPara && k === parts.length - 1); });
    if (words.length >= MAX_WORDS) break;
  }
  return { words, para };
}

/** Bir kelimenin gösterim süresi çarpanı: 1 + uzun kelime payı + noktalama duraklaması. */
export function wordFactor(word, isPara = false) {
  const core = word.replace(/[\s"'“”‘’()[\]«»]+$/u, '');
  const letters = Array.from(core.replace(/[^\p{L}\p{N}]/gu, '')).length;
  let f = 1;
  if (letters > 7) f += Math.min(0.8, (letters - 7) * 0.1);
  if (/[.!?…]$/u.test(core)) f += 1;
  else if (/[,;:–—]$/u.test(core)) f += 0.5;
  if (isPara) f += 0.8;
  return f;
}

/** Optimal tanıma noktası: uzunluğa göre vurgulanacak harfin sırası. */
export function orpIndex(len) {
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  if (len <= 13) return 3;
  return 4;
}

/* ---------- Okuma metinleri ---------- */

const SAMPLE = 'Hızlı okuma yönteminde gözleriniz satır boyunca kayıp durmaz; kelimeler sizin için aynı noktada belirir. Bu sayede göz hareketlerine harcanan zaman azalır. Başlangıçta dakikada üç yüz kelime rahat bir hızdır. Alıştıkça hızı yavaş yavaş artırın, ancak anlamadığınızı fark ettiğiniz anda geri dönün. Amaç yalnızca hızlı değil, anlayarak okumaktır.';

const PASSAGE = `Mardin'in yukarı mahallesinde yaşayan Selma Hanım, otuz yıldır aynı fırında ekmek pişirirdi. Fırının kapısı her sabah dörtte açılır, ilk somunlar altıdan önce tezgâha dizilirdi. Mahalleliler ekmeğin kokusuyla uyanır, çoğu zaman kapıda sıraya girerdi. Bir kış sabahı fırının odun deposu bomboş çıktı. Selma Hanım ne yapacağını düşünürken küçük yeğeni Kerem koşarak geldi ve komşuların kapıda beklediğini söyledi. Hepsi birer kucak odunla gelmişti. Berber Hasan iki, bakkal Rıza üç kucak getirmişti; öğretmen Ayşe ise okuldan arta kalan kasaları vermişti. Selma Hanım gözlerine inanamadı. Odunların hepsi birleşince depo ağzına kadar doldu. O gün fırın her zamankinden fazla ekmek pişirdi ve ilk yirmi somunu parasız dağıttı. Akşam olunca Kerem, teyzesine neden bu kadar sevildiğini sordu. Selma Hanım gülümsedi ve şöyle dedi: Ben yalnızca ekmek pişirdim, onlar da kışın soğuğunu bana yük etmediler. Aradan yıllar geçti, Kerem büyüdü ve fırını devraldı. Kapının üstüne tahta bir levha astı. Levhada şu cümle yazılıydı: Bu fırının odunu mahalleden gelir. Her kış ilk kar yağdığında komşular yine kapıya odun bırakır, Kerem de karşılığında sıcak ekmek ikram eder. Yıllar sonra bile fırının önünden geçen yabancılar levhayı okuyup durur, birçoğu içeri girip bir somun alır ve mahalleye teşekkür ederek yoluna devam eder. Selma Hanım emekli olsa da her sabah dörtte uyanır.`;

const QUESTIONS = [
  { q: 'Selma Hanım kaç yıldır aynı fırında ekmek pişiriyor?', o: ['On yıldır', 'Yirmi yıldır', 'Otuz yıldır', 'Kırk yıldır'] },
  { q: 'Fırının kapısı her sabah saat kaçta açılıyor?', o: ['Dörtte', 'Altıda', 'Sekizde', 'Onda'] },
  { q: 'Fırına üç kucak odun getiren kişi kimdir?', o: ['Berber Hasan', 'Öğretmen Ayşe', 'Kerem', 'Bakkal Rıza'] },
  { q: 'Öğretmen Ayşe fırına ne vermiştir?', o: ['Bir kucak odun', 'Okuldan arta kalan kasalar', 'Sıcak çorba', 'Para'] },
  { q: 'Kerem fırını devraldıktan sonra levhaya ne yazmıştır?', o: ['Fırın her sabah dörtte açılır', 'İlk yirmi somun parasızdır', 'Bu fırının odunu mahalleden gelir', 'Selma Hanım’ın fırını'] },
];
const ANSWERS = [2, 0, 3, 1, 2];

/* ---------- Durum ---------- */

const rd = {
  words: [], para: [], cum: new Float64Array(1), source: '',
  pos: 0,            // gösterilen parçanın ilk kelimesi
  playing: false, finished: false,
  wpm: 300, chunk: 1,
  timer: 0, slot: 0,
};
let activeTab = 'reader';

/* ---------- Gösterim ---------- */

const measureCtx = document.createElement('canvas').getContext('2d');
let baseSize = 32;

function setBaseSize() {
  baseSize = window.innerWidth < 480 ? 32 : 52;
  $('rs-stage').style.setProperty('--rs-base', `${baseSize}px`);
}

/** Gösterilecek metni ORP harfi sabit ortada kalacak biçimde üç parçaya böler. */
function splitForDisplay(text, multi) {
  const chars = Array.from(text);
  let idx;
  if (multi) {
    idx = Math.floor(chars.length / 2);
    while (idx > 0 && /\s/.test(chars[idx])) idx--;
  } else {
    let lead = 0;
    while (lead < chars.length - 1 && /[^\p{L}\p{N}]/u.test(chars[lead])) lead++;
    const core = chars.slice(lead).join('').replace(/[^\p{L}\p{N}]+$/u, '');
    idx = lead + orpIndex(Array.from(core).length);
    if (idx >= chars.length) idx = chars.length - 1;
  }
  return [chars.slice(0, idx).join(''), chars[idx] || '', chars.slice(idx + 1).join('')];
}

function renderWord(text, multi) {
  const [l, o, r] = splitForDisplay(text, multi);
  $('rs-l').textContent = l;
  $('rs-o').textContent = o;
  $('rs-r').textContent = r;
  // Uzun kelimeler 360 px'te taşmasın: iki yarının geniş olanı sığana dek küçült.
  const stage = $('rs-stage');
  let scale = 1;
  try {
    const cs = getComputedStyle(stage);
    measureCtx.font = `500 ${baseSize}px ${cs.fontFamily}`;
    const wl = measureCtx.measureText(l).width;
    const wr = measureCtx.measureText(r).width;
    const wo = measureCtx.measureText(o).width;
    const half = (stage.clientWidth - 24) / 2 - wo / 2;
    const need = Math.max(wl, wr);
    if (need > 0 && half > 0 && need > half) scale = Math.max(0.3, half / need);
  } catch { /* ölçülemezse tam boyut */ }
  stage.style.setProperty('--rs-scale', String(scale));
}

function fmtDuration(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 60) return `${s} sn`;
  const m = Math.floor(s / 60);
  return `${m} dk ${String(s % 60).padStart(2, '0')} sn`;
}

function updateInfo() {
  const n = rd.words.length;
  if (!n) { $('rs-info').textContent = 'Metin yok'; return; }
  const base = 60000 / rd.wpm;
  const remaining = (rd.cum[n] - rd.cum[rd.pos]) * base;
  const shown = Math.min(n, rd.pos + 1);
  $('rs-info').textContent = `Kelime ${shown.toLocaleString('tr-TR')} / ${n.toLocaleString('tr-TR')} · %${Math.round((shown / n) * 100)} · kalan ≈ ${fmtDuration(remaining)}`;
  const pos = $('rs-pos');
  pos.max = String(Math.max(0, n - 1));
  pos.value = String(rd.pos);
  pos.setAttribute('aria-valuetext', `Kelime ${shown} / ${n}`);
}

function showCurrent() {
  const n = rd.words.length;
  if (!n) return;
  const k = rd.chunk;
  const text = rd.words.slice(rd.pos, rd.pos + k).join(' ');
  renderWord(text, k > 1);
  updateInfo();
}

/* ---------- Zamanlama ---------- */

function chunkDelay(pos) {
  const k = rd.chunk;
  const end = Math.min(rd.words.length, pos + k);
  return (rd.cum[end] - rd.cum[pos]) * (60000 / rd.wpm);
}

function advance() {
  const now = performance.now();
  if (rd.slot === 0 || rd.slot < now - 250) rd.slot = now; // sekme yavaşladıysa birikmiş gecikmeyi at
  showCurrent();
  const delay = chunkDelay(rd.pos);
  rd.slot += delay;
  rd.timer = setTimeout(afterWord, Math.max(0, rd.slot - now));
}

function afterWord() {
  rd.pos += rd.chunk;
  if (rd.pos >= rd.words.length) {
    rd.pos = Math.max(0, rd.words.length - rd.chunk);
    rd.playing = false;
    rd.finished = true;
    updateInfo();
    setReadStatus('Bitti');
    syncPlay();
    return;
  }
  advance();
}

function setReadStatus(msg) { $('rs-status').textContent = msg; }

function syncPlay() {
  $('rs-play').textContent = rd.playing ? 'Duraklat' : (rd.finished ? 'Baştan oku' : 'Oynat');
  $('rs-play').setAttribute('aria-pressed', String(rd.playing));
}

/* ---------- Metin yükleme ---------- */

function loadSource() {
  const text = $('rs-text').value;
  if (text === rd.source && rd.words.length) return true;
  const { words, para } = tokenize(text);
  rd.source = text;
  rd.words = words;
  rd.para = para;
  rd.cum = new Float64Array(words.length + 1);
  for (let i = 0; i < words.length; i++) rd.cum[i + 1] = rd.cum[i] + wordFactor(words[i], para[i]);
  rd.pos = 0;
  rd.finished = false;
  return words.length > 0;
}

function pausePlayback(msg = 'Duraklatıldı') {
  clearTimeout(rd.timer);
  if (rd.playing) setReadStatus(msg);
  rd.playing = false;
  syncPlay();
}

function play() {
  showError($('error'), null);
  if (!loadSource()) {
    showError($('error'), 'Okunacak metin yok. Kutuya bir metin yapıştırın, bir .txt dosyası açın ya da "Örnek metin" düğmesine basın.');
    return;
  }
  if (rd.finished || rd.pos >= rd.words.length) { rd.pos = 0; rd.finished = false; }
  rd.playing = true;
  rd.slot = 0;
  setReadStatus('Okunuyor');
  syncPlay();
  clearTimeout(rd.timer);
  advance();
}

function togglePlay() {
  if (rd.playing) pausePlayback(); else play();
}

function seek(delta) {
  if (!rd.words.length && !loadSource()) return;
  const n = rd.words.length;
  rd.pos = Math.max(0, Math.min(n - 1, rd.pos + delta));
  rd.finished = false;
  if (rd.playing) { clearTimeout(rd.timer); rd.slot = 0; advance(); }
  else showCurrent();
}

function setWpm(v) {
  rd.wpm = Math.max(100, Math.min(1000, Math.round(v / 5) * 5));
  $('rs-wpm').value = String(rd.wpm);
  $('rs-wpm-out').textContent = `${rd.wpm} kelime/dk`;
  if (rd.words.length) updateInfo();
}

function onTextChanged() {
  pausePlayback('Metin değişti');
  rd.source = '';
  rd.words = [];
  rd.finished = false;
  if (loadSource()) { showCurrent(); setReadStatus('Hazır'); }
  else {
    $('rs-l').textContent = '';
    $('rs-o').textContent = '';
    $('rs-r').textContent = '';
    updateInfo();
    setReadStatus('Metin bekleniyor');
  }
  syncPlay();
}

async function loadFile(file) {
  showError($('error'), null);
  if (file.size > MAX_FILE_BYTES) {
    showError($('error'), 'Dosya çok büyük (2 MB üstü). Daha kısa bir .txt dosyası seçin ya da metni bölümlere ayırın.');
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
    catch { text = new TextDecoder('windows-1254').decode(buf); }
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
  $('rs-text').value = text;
  onTextChanged();
}

/* ---------- Okuma hızı testi ---------- */

/** Kayıtlı sonuçları güvenle okur; bozuk veride boş liste döner. */
export function readResults() {
  try {
    let data = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (data && !Array.isArray(data) && Array.isArray(data.results)) data = data.results;
    if (!Array.isArray(data)) return [];
    return data
      .filter((r) => r && typeof r === 'object' && Number.isFinite(r.kpm) && Number.isFinite(r.acc))
      .map((r) => ({ date: typeof r.date === 'string' ? r.date : '', kpm: Math.round(r.kpm), acc: Math.round(r.acc), eff: Number.isFinite(r.eff) ? Math.round(r.eff) : Math.round((r.kpm * r.acc) / 100) }))
      .slice(-5);
  } catch {
    return [];
  }
}

function saveResult(entry) {
  const list = readResults();
  list.push(entry);
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(-5))); } catch { /* özel gezinme: kaydedilemez */ }
}

function renderHistory() {
  const list = readResults().reverse();
  const ul = $('rt-history');
  ul.textContent = '';
  list.forEach((r) => {
    const li = document.createElement('li');
    const d = r.date ? new Date(r.date) : null;
    const dateText = d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString('tr-TR') : '—';
    li.textContent = `${dateText} · ${r.kpm} kelime/dk · anlama %${r.acc} · etkin hız ${r.eff}`;
    ul.appendChild(li);
  });
  $('rt-history-box').hidden = list.length === 0;
}

const passageWords = PASSAGE.trim().split(/\s+/).length;
let testStart = 0;
let testElapsed = 0;

function buildQuestions() {
  const form = $('rt-form');
  form.textContent = '';
  QUESTIONS.forEach((item, qi) => {
    const fs = document.createElement('fieldset');
    fs.className = 'rt-q';
    const lg = document.createElement('legend');
    lg.textContent = `${qi + 1}. ${item.q}`;
    fs.appendChild(lg);
    item.o.forEach((opt, oi) => {
      const lab = document.createElement('label');
      const inp = document.createElement('input');
      inp.type = 'radio';
      inp.name = `q${qi}`;
      inp.value = String(oi);
      inp.id = `q${qi}-${oi}`;
      lab.appendChild(inp);
      lab.appendChild(document.createTextNode(' ' + opt));
      fs.appendChild(lab);
    });
    form.appendChild(fs);
  });
}

function testStep(name) {
  ['rt-intro', 'rt-reading', 'rt-quiz', 'rt-result'].forEach((id) => { $(id).hidden = id !== name; });
}

function startTest() {
  showError($('error'), null);
  $('rt-passage').textContent = PASSAGE;
  testStep('rt-reading');
  testStart = performance.now();
  $('rt-done').focus();
}

function finishReadingTest() {
  testElapsed = performance.now() - testStart;
  $('rt-passage').textContent = '';
  buildQuestions();
  testStep('rt-quiz');
  const first = $('q0-0');
  if (first) first.focus();
}

function showResult() {
  showError($('error'), null);
  let correct = 0;
  for (let i = 0; i < QUESTIONS.length; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (!sel) {
      showError($('error'), 'Lütfen beş soruyu da yanıtlayın; ardından sonucu görün.');
      return;
    }
    if (Number(sel.value) === ANSWERS[i]) correct++;
  }
  const minutes = testElapsed / 60000;
  const kpm = Math.round(passageWords / Math.max(minutes, 1 / 600));
  const acc = Math.round((correct / QUESTIONS.length) * 100);
  const eff = Math.round((kpm * acc) / 100);
  $('rt-kpm').textContent = String(kpm);
  $('rt-acc').textContent = `%${acc}`;
  $('rt-eff').textContent = String(eff);
  $('rt-time').textContent = fmtDuration(testElapsed);
  const tooShort = testElapsed < 10_000;
  let comment;
  if (tooShort) comment = 'Okuma süresi 10 saniyeden kısa; metni baştan sona okumadan bitirmiş olabilirsiniz. Bu sonuç geçmişe kaydedilmedi. Metni dikkatle okuyup testi yeniden deneyin.';
  else if (acc < 60) comment = 'Anlama oranı düşük: hızınız anlama pahasına yükselmiş olabilir. Biraz yavaşlayıp metni anlayarak okumayı deneyin.';
  else if (kpm < 150) comment = 'Sakin bir okuma hızı. Düzenli okuma ve hızlı okuma aracıyla çalışarak zamanla artırabilirsiniz.';
  else if (kpm <= 300) comment = 'Çoğu yetişkinin okuma hızı bu aralıktadır. Anlama oranınız yüksekse hızınızı yavaş yavaş artırmayı deneyebilirsiniz.';
  else comment = 'Yüksek bir okuma hızı. Anlama oranınızı koruyup korumadığınıza bakın; asıl ölçüt etkin hızdır.';
  $('rt-comment').textContent = comment;
  if (!tooShort) saveResult({ date: new Date().toISOString(), kpm, acc, eff });
  renderHistory();
  testStep('rt-result');
  $('rt-result').scrollIntoView({ block: 'nearest' });
}

/* ---------- Sekmeler ---------- */

function selectTab(name, focus = false) {
  if (name !== 'reader') pausePlayback();
  activeTab = name;
  ['reader', 'test'].forEach((t) => {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', String(sel));
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  });
  if (focus) $('tab-' + name).focus();
  showError($('error'), null);
}

/* ---------- Başlatma ---------- */

function init() {
  setBaseSize();
  window.addEventListener('resize', () => { setBaseSize(); if (rd.words.length) showCurrent(); });
  setWpm(300);
  updateInfo();
  syncPlay();
  renderHistory();
  testStep('rt-intro');

  ['reader', 'test'].forEach((t, i) => {
    $('tab-' + t).addEventListener('click', () => selectTab(t));
    $('tab-' + t).addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); selectTab(['reader', 'test'][(i + 1) % 2], true); }
    });
  });

  $('rs-text').addEventListener('input', onTextChanged);
  $('rs-sample').addEventListener('click', () => { $('rs-text').value = SAMPLE; onTextChanged(); });
  $('rs-clear').addEventListener('click', () => { $('rs-text').value = ''; showError($('error'), null); onTextChanged(); $('rs-text').focus(); });
  $('rs-file-btn').addEventListener('click', () => $('rs-file').click());
  $('rs-file').addEventListener('change', () => {
    const f = $('rs-file').files && $('rs-file').files[0];
    $('rs-file').value = '';
    if (f) loadFile(f);
  });

  $('rs-play').addEventListener('click', togglePlay);
  $('rs-stage').addEventListener('click', () => { if (rd.words.length || $('rs-text').value.trim()) togglePlay(); });
  $('rs-back').addEventListener('click', () => seek(-10));
  $('rs-fwd').addEventListener('click', () => seek(10));
  $('rs-wpm').addEventListener('input', () => setWpm(Number($('rs-wpm').value)));
  $('rs-chunk').addEventListener('change', () => {
    rd.chunk = Number($('rs-chunk').value) || 1;
    if (rd.words.length) { if (rd.playing) { clearTimeout(rd.timer); rd.slot = 0; advance(); } else showCurrent(); }
  });
  $('rs-dark').addEventListener('change', () => $('rs-stage').classList.toggle('is-dark', $('rs-dark').checked));
  $('rs-pos').addEventListener('input', () => {
    if (!rd.words.length && !loadSource()) return;
    rd.pos = Math.max(0, Math.min(rd.words.length - 1, Number($('rs-pos').value) || 0));
    rd.finished = false;
    if (rd.playing) { clearTimeout(rd.timer); rd.slot = 0; advance(); } else showCurrent();
  });

  $('rt-start').addEventListener('click', startTest);
  $('rt-done').addEventListener('click', finishReadingTest);
  $('rt-submit').addEventListener('click', showResult);
  $('rt-retry').addEventListener('click', () => { testStep('rt-intro'); showError($('error'), null); $('rt-start').focus(); });
  $('rt-clear-history').addEventListener('click', () => {
    try { localStorage.removeItem(STORE_KEY); } catch { /* yoksay */ }
    renderHistory();
  });

  // Sekme arka plana geçerse okuma durur (zamanlayıcılar yavaşlar, kelimeler kaçırılmasın).
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') pausePlayback(); });

  document.addEventListener('keydown', (e) => {
    if (activeTab !== 'reader') return;
    const t = e.target;
    const tag = t && t.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    if (t && t.getAttribute && t.getAttribute('role') === 'tab') return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === ' ' && tag !== 'BUTTON' && tag !== 'A' && tag !== 'SUMMARY') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); seek(e.shiftKey ? 1 : 10); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); seek(e.shiftKey ? -1 : -10); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setWpm(rd.wpm + 25); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setWpm(rd.wpm - 25); }
  });
}

init();
