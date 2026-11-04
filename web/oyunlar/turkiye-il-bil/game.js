// Türkiye İl Bil: plaka kodundan il, ilden plaka kodu, ilin coğrafi bölgesi ve sınır komşusu bilmeceleri.
// 81 il, 4 şık, süreli mod, localStorage skoru. Harita yoktur; il verisi iller.js içindedir.
import { PROVINCES, REGIONS } from './iller.js';

const $ = (id) => document.getElementById(id);
const KEY = 'ba-oyun-turkiye-il-bil';
const SECONDS = 15;

const MODES = {
  plaka: { label: 'Plakadan il' },
  ilplaka: { label: 'İlden plaka' },
  bolge: { label: 'İlin bölgesi' },
  komsu: { label: 'Komşu il' },
  karisik: { label: 'Karışık' },
};
const TYPES = ['plaka', 'ilplaka', 'bolge', 'komsu'];

const screens = { ayar: $('ekran-ayar'), oyun: $('ekran-oyun'), sonuc: $('ekran-sonuc') };
const optBtns = [...document.querySelectorAll('#siklar .bg-opt')];
const qEl = $('soru-metin');
const feedbackEl = $('geri-bildirim');
const infoEl = $('bilgi');
const nextBtn = $('sonraki');
const timeBox = $('sure-kutu');
const timeBar = $('sure-bar');
const timeTxt = $('sure-yazi');
const fsBtn = $('tam-ekran');
const boxEl = $('oyun');

/* ---------- Veri ---------- */
const ILLER = PROVINCES.map((p) => ({ code: p[0], name: p[1], region: p[2], nb: p[3] ? p[3].split(',') : [] }));
const BY_NAME = new Map(ILLER.map((p) => [p.name, p]));
const BY_CODE = new Map(ILLER.map((p) => [p.code, p]));
// Komşuluk grafı üzerinde uzaklıklar (BFS): yanlış komşu şıkları sınırdaş olmayan illerden seçilir
const DIST = new Map();
ILLER.forEach((src) => {
  const d = new Map([[src.name, 0]]);
  const queue = [src.name];
  for (let h = 0; h < queue.length; h++) {
    const cur = queue[h];
    (BY_NAME.get(cur).nb).forEach((n) => { if (!d.has(n) && BY_NAME.has(n)) { d.set(n, d.get(cur) + 1); queue.push(n); } });
  }
  DIST.set(src.name, d);
});
const pad2 = (n) => String(n).padStart(2, '0');

/* ---------- Kayıt (bozuk veriye karşı korumalı) ---------- */
const clampInt = (v, lo, hi) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, Math.round(v))) : 0);
function defaultStore() { return { rounds: 0, answered: 0, correct: 0, bestStreak: 0, best: {}, last: [] }; }
function loadStore() {
  const s = defaultStore();
  try {
    const o = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!o || typeof o !== 'object' || Array.isArray(o)) return s;
    s.rounds = clampInt(o.rounds, 0, 1e7);
    s.answered = clampInt(o.answered, 0, 1e7);
    s.correct = Math.min(s.answered, clampInt(o.correct, 0, 1e7));
    s.bestStreak = clampInt(o.bestStreak, 0, 1e5);
    if (o.best && typeof o.best === 'object' && !Array.isArray(o.best)) {
      Object.keys(o.best).slice(0, 40).forEach((k) => { if (/^[a-z]+-\d+$/.test(k)) s.best[k] = clampInt(o.best[k], 0, 1e6); });
    }
    if (Array.isArray(o.last)) s.last = o.last.filter((x) => typeof x === 'number' && Number.isFinite(x)).slice(-5).map((x) => clampInt(x, 0, 1e6));
  } catch (e) { /* bozuk kayıt: varsayılana dön */ }
  return s;
}
let store = loadStore();
function saveStore() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* depolama kapalı */ } }

/* ---------- Yardımcılar ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function show(name) {
  Object.keys(screens).forEach((k) => { screens[k].hidden = k !== name; });
  boxEl.dataset.phase = name;
}

/* ---------- Soru üretimi ---------- */
// Aynı bölgeden iki, kalanı başka bölgelerden olmak üzere üç yanlış il seçer
function pickProvinceDistractors(p, filter) {
  const used = new Set([p.name]);
  const picks = [];
  const take = (list, max) => { for (const c of list) { if (picks.length >= max) break; if (used.has(c.name) || !filter(c)) continue; used.add(c.name); picks.push(c); } };
  take(shuffle(ILLER.filter((c) => c.region === p.region)), 2);
  take(shuffle(ILLER), 3);
  return picks;
}

function buildQuestion(p, type) {
  let prompt;
  let options;
  let answer;
  let info;
  if (type === 'plaka') {
    prompt = `${p.code} plaka kodu hangi ile aittir?`;
    options = [p, ...pickProvinceDistractors(p, () => true)].map((c) => ({ id: String(c.code), label: c.name }));
    answer = String(p.code);
    info = `${pad2(p.code)} plaka kodu ${p.name} iline aittir; ${p.name}, ${p.region} Bölgesi'ndedir.`;
  } else if (type === 'ilplaka') {
    prompt = `${p.name} ilinin plaka kodu nedir?`;
    options = [p, ...pickProvinceDistractors(p, () => true)].map((c) => ({ id: String(c.code), label: String(c.code) }));
    answer = String(p.code);
    info = `${p.name} ilinin plaka kodu ${pad2(p.code)}'dir.`;
  } else if (type === 'bolge') {
    prompt = `${p.name} hangi coğrafi bölgededir?`;
    options = [p.region, ...shuffle(REGIONS.filter((r) => r !== p.region)).slice(0, 3)].map((r) => ({ id: r, label: r }));
    answer = p.region;
    info = `${p.name}, ${p.region} Bölgesi'ndedir.`;
  } else {
    const right = BY_NAME.get(p.nb[Math.floor(Math.random() * p.nb.length)]);
    const d = DIST.get(p.name);
    const far = shuffle(ILLER.filter((c) => c.name !== p.name && (d.get(c.name) || 99) >= 2));
    const near = far.filter((c) => d.get(c.name) === 2);
    const picks = [];
    const used = new Set();
    [near, far].forEach((list) => list.forEach((c) => { if (picks.length < 3 && !used.has(c.name)) { used.add(c.name); picks.push(c); } }));
    options = [right, ...picks].map((c) => ({ id: String(c.code), label: c.name }));
    prompt = `${p.name} ile sınır komşusu olan il hangisidir?`;
    answer = String(right.code);
    info = `${p.name} ilinin kara sınırı komşuları: ${p.nb.join(', ')}.`;
  }
  return { type, p, prompt, options: shuffle(options), answer, info };
}

/* ---------- Oyun durumu ---------- */
let round = null; // { mode, scope, n, want, items[], i, score, streak, bestStreak, correct, wrong[], timed, answered, cur, remaining, deadline, tick }

function startRound() {
  const mode = MODES[$('mod').value] ? $('mod').value : 'plaka';
  const scope = $('kapsam').value;
  const want = Number($('soru-sayisi').value) === 20 ? 20 : 10;
  const timed = $('sure').value === 'sureli';
  const warn = $('ayar-uyari');
  warn.textContent = '';
  const pool = ILLER.filter((c) => scope === 'hepsi' || c.region === scope);
  if (pool.length < 4) { warn.textContent = 'Bu bölgede yeterli il yok; başka bir bölge seçin.'; return; }
  const items = shuffle(pool).slice(0, Math.min(want, pool.length));
  if (items.length < want) warn.textContent = `Bu seçimde yalnızca ${items.length} il var; tur ${items.length} soru olacak.`;
  round = { mode, scope, n: items.length, want, items, i: 0, score: 0, streak: 0, bestStreak: 0, correct: 0, wrong: [], timed, answered: false, answeredCount: 0, cur: null, tick: 0, remaining: SECONDS, deadline: 0 };
  show('oyun');
  nextQuestion();
}

function nextQuestion() {
  stopTimer();
  const r = round;
  const type = r.mode === 'karisik' ? TYPES[Math.floor(Math.random() * TYPES.length)] : r.mode;
  r.cur = buildQuestion(r.items[r.i], type);
  r.answered = false;
  $('sira').textContent = String(r.i + 1);
  $('toplam').textContent = String(r.n);
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  $('mod-etiket').textContent = MODES[type].label;
  qEl.textContent = r.cur.prompt;
  optBtns.forEach((b, k) => {
    const o = r.cur.options[k];
    b.disabled = false;
    b.className = 'bg-opt';
    b.dataset.code = o ? o.id : '';
    b.querySelector('.bg-t').textContent = o ? o.label : '';
    b.hidden = !o;
  });
  feedbackEl.textContent = '';
  feedbackEl.className = 'bg-feedback';
  infoEl.hidden = true;
  nextBtn.hidden = true;
  timeBox.hidden = !r.timed;
  if (r.timed) startTimer(SECONDS);
  qEl.focus({ preventScroll: true });
}

/* ---------- Süre (sekme arka plana alınınca durur) ---------- */
function startTimer(seconds) {
  const r = round;
  r.remaining = seconds;
  r.deadline = Date.now() + seconds * 1000;
  paintTime();
  r.tick = setInterval(() => {
    if (document.hidden) { r.deadline = Date.now() + r.remaining * 1000; return; }
    r.remaining = Math.max(0, (r.deadline - Date.now()) / 1000);
    paintTime();
    if (r.remaining <= 0) { stopTimer(); settle(null); }
  }, 100);
}
function stopTimer() { if (round && round.tick) { clearInterval(round.tick); round.tick = 0; } }
function paintTime() {
  const r = round;
  timeBar.style.width = Math.max(0, (r.remaining / SECONDS) * 100) + '%';
  timeBar.classList.toggle('is-low', r.remaining <= 5);
  timeTxt.textContent = String(Math.ceil(r.remaining));
}

/* ---------- Cevaplama ---------- */
function answer(k) {
  const r = round;
  if (!r || r.answered || screens.oyun.hidden) return;
  const o = r.cur.options[k];
  if (!o) return;
  stopTimer();
  settle(o.id);
}

function settle(chosenId) {
  const r = round;
  r.answered = true;
  const q = r.cur;
  const ok = chosenId === q.answer;
  const leftover = r.remaining;
  r.answeredCount += 1;
  store.answered += 1;
  const right = q.options.find((x) => x.id === q.answer);
  if (ok) {
    store.correct += 1;
    r.correct += 1;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    const gain = 10 + Math.min(25, (r.streak - 1) * 5) + (r.timed ? Math.min(10, Math.floor(leftover)) : 0);
    r.score += gain;
    feedbackEl.textContent = `Doğru! +${gain} puan`;
    feedbackEl.className = 'bg-feedback is-ok';
  } else {
    r.streak = 0;
    const chosen = q.options.find((x) => x.id === chosenId);
    r.wrong.push({ q, chosen: chosen ? chosen.label : null, right: right.label });
    feedbackEl.textContent = chosenId === null ? `Süre doldu. Doğru cevap: ${right.label}` : `Yanlış. Doğru cevap: ${right.label}`;
    feedbackEl.className = 'bg-feedback is-bad';
  }
  infoEl.textContent = q.info;
  infoEl.hidden = false;
  optBtns.forEach((b) => {
    b.disabled = true;
    if (b.dataset.code === q.answer) b.classList.add('is-correct');
    else if (b.dataset.code === chosenId) b.classList.add('is-wrong');
  });
  $('puan').textContent = String(r.score);
  $('seri').textContent = String(r.streak);
  nextBtn.textContent = r.i + 1 >= r.n ? 'Sonucu gör' : 'Sonraki soru';
  nextBtn.hidden = false;
  nextBtn.focus({ preventScroll: true });
}

function advance() {
  const r = round;
  if (!r || !r.answered) return;
  r.i += 1;
  if (r.i >= r.n) finish(false);
  else nextQuestion();
}

function finish(early) {
  stopTimer();
  const r = round;
  if (!r) return;
  const key = `${r.mode}-${r.want}`;
  const prev = store.best[key] || 0;
  const isRecord = !early && r.score > prev && r.answeredCount > 0;
  if (!early || r.answeredCount > 0) {
    store.rounds += 1;
    store.bestStreak = Math.max(store.bestStreak, r.bestStreak);
    if (isRecord) store.best[key] = r.score;
    store.last = store.last.concat([r.score]).slice(-5);
    saveStore();
  }
  show('sonuc');
  $('sonuc-puan').textContent = String(r.score);
  $('sonuc-rekor').hidden = !isRecord;
  const asked = r.answeredCount;
  $('sonuc-ozet').textContent = `${asked} sorudan ${r.correct} tanesini doğru bildiniz. En uzun seriniz: ${r.bestStreak}.`;
  const pct = asked ? r.correct / asked : 0;
  $('sonuc-yorum').textContent = pct >= 0.9 ? 'Harika, illerimizi çok iyi tanıyorsunuz!' : pct >= 0.7 ? 'Çok iyi, birkaç tekrarla tam puana yaklaşırsınız.' : pct >= 0.4 ? 'Fena değil. Yanlışlarınızı gözden geçirip yeniden deneyin.' : 'Bu bir başlangıç. Aşağıdaki doğru cevapları inceleyip bir tur daha oynayın.';
  $('sonuc-en-yuksek').textContent = `Bu mod için en yüksek puanınız: ${store.best[key] || 0}`;
  const list = $('yanlislar');
  list.textContent = '';
  $('yanlis-yok').hidden = !(r.wrong.length === 0 && asked > 0);
  $('yanlis-baslik').hidden = r.wrong.length === 0;
  list.hidden = r.wrong.length === 0;
  r.wrong.forEach((w) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = w.q.prompt;
    const you = document.createElement('span');
    you.className = 'bg-you';
    you.textContent = w.chosen ? `Cevabınız: ${w.chosen}` : 'Cevap verilmedi (süre doldu)';
    const rightEl = document.createElement('span');
    rightEl.className = 'bg-right';
    rightEl.textContent = `Doğru cevap: ${w.right}`;
    li.append(strong, you, rightEl);
    list.appendChild(li);
  });
  renderStats();
  $('sonuc-baslik').focus({ preventScroll: true });
}

/* ---------- İstatistik ---------- */
function renderStats() {
  const box = $('istatistik');
  box.hidden = store.rounds === 0 && store.answered === 0;
  $('ist-tur').textContent = String(store.rounds);
  $('ist-soru').textContent = String(store.answered);
  $('ist-dogruluk').textContent = store.answered ? `%${Math.round((store.correct / store.answered) * 100)}` : '—';
  const bests = Object.values(store.best);
  $('ist-puan').textContent = String(bests.length ? Math.max(...bests) : 0);
  $('ist-seri').textContent = String(store.bestStreak);
  $('ist-son').textContent = store.last.length ? store.last.join(' · ') : '—';
}

/* ---------- Başlangıç ---------- */
function init() {
  const mod = $('mod');
  Object.keys(MODES).forEach((k) => { const o = document.createElement('option'); o.value = k; o.textContent = MODES[k].label; mod.appendChild(o); });
  const kapsam = $('kapsam');
  REGIONS.forEach((r) => {
    const n = ILLER.filter((x) => x.region === r).length;
    const o = document.createElement('option'); o.value = r; o.textContent = `${r} (${n} il)`; kapsam.appendChild(o);
  });
  kapsam.firstElementChild.textContent = `Tüm Türkiye (${ILLER.length} il)`;
  $('havuz-sayisi').textContent = String(ILLER.length);

  // Çalışma listesi: plaka sırasıyla 81 il (isteğe bağlı, kapalı gelir)
  const ul = $('il-liste');
  ILLER.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `${pad2(p.code)} ${p.name} – ${p.region}`;
    ul.appendChild(li);
  });

  optBtns.forEach((b, k) => b.addEventListener('click', () => answer(k)));
  nextBtn.addEventListener('click', advance);
  $('baslat').addEventListener('click', startRound);
  $('tekrar').addEventListener('click', startRound);
  $('ayara-don').addEventListener('click', () => { show('ayar'); renderStats(); });
  $('birak').addEventListener('click', () => { if (round) finish(true); });
  $('ist-sifirla').addEventListener('click', () => {
    if (!window.confirm('İstatistikleriniz silinsin mi? Bu işlem geri alınamaz.')) return;
    store = defaultStore();
    saveStore();
    renderStats();
  });
  document.addEventListener('keydown', (e) => {
    if (!round || screens.oyun.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'SELECT' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
    if (e.key >= '1' && e.key <= '4') { answer(Number(e.key) - 1); e.preventDefault(); }
  });
  if (document.fullscreenEnabled) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else boxEl.requestFullscreen().catch(() => {});
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.setAttribute('aria-pressed', String(!!document.fullscreenElement));
      fsBtn.textContent = document.fullscreenElement ? 'Tam ekrandan çık' : 'Tam ekran';
    });
  }
  renderStats();
  show('ayar');
}

init();
