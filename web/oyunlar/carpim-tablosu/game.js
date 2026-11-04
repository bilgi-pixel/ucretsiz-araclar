// Çarpım Tablosu Alıştırması: çarpma/bölme, şıklı veya yazarak, 60 sn yarış veya süresiz çalışma.
// Tamamen istemci tarafı; en iyi skor yalnızca bu cihazdaki localStorage'a yazılır, dış istek yoktur.

const STORE_KEY = 'ba-oyun-carpim-tablosu';
const RACE_SECONDS = 60;
const OK_DELAY = 350; // doğru cevaptan sonra yeni soruya geçme gecikmesi (ms)
const BAD_DELAY = 1100; // yanlış cevapta doğru cevabı okumak için bekleme (ms)

const $ = (id) => document.getElementById(id);

// ---- Kayıt (bozuk veriye dayanıklı) ----
function loadBest() {
  const empty = { race: 0, practice: 0 };
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return empty;
    const ok = (v) => (Number.isFinite(v) && v > 0 && v < 1e7 ? Math.floor(v) : 0);
    return { race: ok(raw.race), practice: ok(raw.practice) };
  } catch (e) {
    return empty;
  }
}
function saveBest(best) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(best)); } catch (e) { /* özel gezinti: yazılamaz, oyun yine çalışır */ }
}

// ---- Durum ----
const state = {
  running: false,
  locked: false,
  opts: { table: 'mix', op: 'mul', answer: 'choice', time: RACE_SECONDS },
  q: null,
  prevKey: '',
  score: 0,
  streak: 0,
  bestStreak: 0,
  correct: 0,
  wrong: 0,
  wrongList: [], // yanlış yapılan benzersiz sorular
  queue: null, // "yanlışları tekrar çöz" için kalan sorular
  isRetry: false,
  endAt: 0,
  tick: null,
  advance: null,
  best: loadBest(),
};

// ---- Soru üretimi ----
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeQuestion(a, b, op) {
  const product = a * b;
  if (op === 'div') {
    return { a, b, op, text: product + ' ÷ ' + a, answer: b, key: 'd' + a + 'x' + b };
  }
  return { a, b, op, text: a + ' × ' + b, answer: product, key: 'm' + a + 'x' + b };
}

function nextRandomQuestion() {
  const { table, op } = state.opts;
  for (let i = 0; i < 20; i++) {
    let a;
    let b;
    if (table === 'mix') { a = rnd(2, 12); b = rnd(2, 12); } else { a = Number(table); b = rnd(1, 12); }
    const q = makeQuestion(a, b, op);
    if (q.key !== state.prevKey) return q;
  }
  return makeQuestion(rnd(2, 12), rnd(2, 12), op);
}

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/** Doğru cevaba yakın, makul 3 çeldirici üretir (çoğu gerçek hatadan gelir: komşu çarpım). */
function makeChoices(q) {
  const set = new Set([q.answer]);
  const step = q.op === 'div' ? 1 : q.a;
  const pool = q.op === 'div'
    ? [q.answer + 1, q.answer - 1, q.answer + 2, q.answer - 2, q.answer + 10, q.answer * 2, q.a, q.answer + 3]
    : [q.answer + step, q.answer - step, q.answer + q.b, q.answer - q.b, q.answer + 1, q.answer - 1, q.answer + 10, q.answer - 10];
  shuffle(pool);
  for (const v of pool) {
    if (set.size >= 4) break;
    if (v > 0 && !set.has(v)) set.add(v);
  }
  let extra = q.answer + 4;
  while (set.size < 4) { set.add(extra); extra++; }
  return shuffle([...set]);
}

// ---- Arayüz yardımcıları ----
function show(id, on) { $(id).hidden = !on; }

function renderBest() {
  const b = state.best;
  $('ct-best-race').textContent = b.race ? String(b.race) : 'henüz yok';
  $('ct-best-practice').textContent = b.practice ? String(b.practice) : 'henüz yok';
}

function renderStats() {
  $('ct-score').textContent = String(state.score);
  $('ct-streak').textContent = String(state.streak);
  $('ct-correct').textContent = String(state.correct);
  $('ct-wrong').textContent = String(state.wrong);
}

function setFeedback(text, kind) {
  const el = $('ct-fb');
  el.textContent = text;
  el.dataset.kind = kind || '';
}

function remainingSeconds() {
  return Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000));
}

function renderTimer() {
  $('ct-timer').textContent = remainingSeconds() + ' sn';
}

// ---- Oyun akışı ----
function readOptions() {
  const val = (name) => document.querySelector('input[name="' + name + '"]:checked').value;
  state.opts = {
    table: $('ct-table').value,
    op: val('ct-op'),
    answer: val('ct-answer'),
    time: Number(val('ct-time')),
  };
}

function clearTimers() {
  if (state.tick) { clearInterval(state.tick); state.tick = null; }
  if (state.advance) { clearTimeout(state.advance); state.advance = null; }
}

function startGame(queue) {
  clearTimers();
  if (!queue) readOptions();
  Object.assign(state, {
    running: true, locked: false, q: null, prevKey: '', score: 0, streak: 0, bestStreak: 0,
    correct: 0, wrong: 0, wrongList: [], queue: queue || null, isRetry: Boolean(queue),
  });
  const timed = !state.isRetry && state.opts.time > 0;
  show('ct-setup', false);
  show('ct-result', false);
  show('ct-game', true);
  show('ct-timer-box', timed);
  $('ct-choices').hidden = state.opts.answer !== 'choice';
  $('ct-typeform').hidden = state.opts.answer !== 'type';
  $('ct-mode-note').textContent = state.isRetry
    ? 'Yanlışlarını tekrar çözüyorsun: ' + queue.length + ' soru.'
    : timed ? RACE_SECONDS + ' saniyelik yarış: süre bitene kadar çöz.' : 'Süresiz çalışma: bitirmek için "Bitir" düğmesine bas.';
  setFeedback('', '');
  renderStats();
  if (timed) {
    state.endAt = Date.now() + state.opts.time * 1000;
    renderTimer();
    state.tick = setInterval(onTick, 200);
  }
  nextQuestion();
}

function onTick() {
  if (!state.running) return;
  renderTimer();
  if (remainingSeconds() <= 0) finishGame();
}

function nextQuestion() {
  state.advance = null;
  if (!state.running) return;
  let q;
  if (state.queue) {
    if (!state.queue.length) { finishGame(); return; }
    q = state.queue.shift();
  } else {
    q = nextRandomQuestion();
  }
  state.q = q;
  state.prevKey = q.key;
  state.locked = false;
  setFeedback('', '');
  $('ct-q').textContent = q.text + ' = ?';
  if (state.opts.answer === 'choice') {
    const box = $('ct-choices');
    box.innerHTML = '';
    makeChoices(q).forEach((value, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ba-btn ct-choice';
      btn.dataset.value = String(value);
      btn.innerHTML = '<kbd>' + (i + 1) + '</kbd> <span>' + value + '</span>';
      btn.setAttribute('aria-label', (i + 1) + '. şık: ' + value);
      box.appendChild(btn);
    });
  } else {
    const input = $('ct-input');
    input.value = '';
    input.readOnly = false;
    input.focus();
  }
}

function submitAnswer(value) {
  if (!state.running || state.locked || !state.q) return;
  state.locked = true;
  const q = state.q;
  const isRight = value === q.answer;
  if (isRight) {
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correct += 1;
    state.score += 10 + 2 * Math.min(state.streak - 1, 5);
    setFeedback('Doğru! ' + q.text + ' = ' + q.answer, 'ok');
  } else {
    state.streak = 0;
    state.wrong += 1;
    if (!state.wrongList.some((w) => w.key === q.key)) state.wrongList.push(q);
    setFeedback('Yanlış. Doğrusu: ' + q.text + ' = ' + q.answer, 'bad');
  }
  if (state.opts.answer === 'choice') {
    document.querySelectorAll('.ct-choice').forEach((btn) => {
      const v = Number(btn.dataset.value);
      if (v === q.answer) btn.classList.add('is-right');
      else if (v === value) btn.classList.add('is-wrong');
      btn.disabled = true;
    });
  } else {
    $('ct-input').readOnly = true;
  }
  renderStats();
  state.advance = setTimeout(nextQuestion, isRight ? OK_DELAY : BAD_DELAY);
}

function finishGame() {
  if (!state.running) return;
  state.running = false;
  clearTimers();
  const timed = !state.isRetry && state.opts.time > 0;
  let newBest = false;
  if (!state.isRetry && state.score > 0) {
    const key = timed ? 'race' : 'practice';
    if (state.score > state.best[key]) { state.best[key] = state.score; newBest = true; saveBest(state.best); }
  }
  show('ct-game', false);
  show('ct-result', true);
  const total = state.correct + state.wrong;
  const pct = total ? Math.round((state.correct / total) * 100) : 0;
  $('ct-res-score').textContent = String(state.score);
  $('ct-res-summary').textContent = total
    ? total + ' sorudan ' + state.correct + ' doğru (%' + pct + '). En uzun seri: ' + state.bestStreak + '.'
    : 'Henüz soru cevaplamadın.';
  $('ct-res-best').textContent = newBest ? 'Yeni en iyi skor!' : state.isRetry ? 'Tekrar turu en iyi skora yazılmaz.' : '';
  const list = $('ct-wrong-list');
  list.innerHTML = '';
  state.wrongList.forEach((q) => {
    const li = document.createElement('li');
    li.textContent = q.text + ' = ' + q.answer;
    list.appendChild(li);
  });
  show('ct-wrong-block', state.wrongList.length > 0);
  show('ct-perfect', state.wrongList.length === 0 && total > 0);
  renderBest();
}

function backToSetup() {
  state.running = false;
  clearTimers();
  show('ct-game', false);
  show('ct-result', false);
  show('ct-setup', true);
}

// ---- Tablo görünümü ----
function buildGrid() {
  const size = Number($('ct-size').value) === 10 ? 10 : 12;
  const table = $('ct-grid');
  let html = '<thead><tr><th scope="col">×</th>';
  for (let c = 1; c <= size; c++) html += '<th scope="col">' + c + '</th>';
  html += '</tr></thead><tbody>';
  for (let r = 1; r <= size; r++) {
    html += '<tr data-row="' + r + '"><th scope="row"><button type="button" class="ct-rowbtn" aria-pressed="false" aria-label="' + r + ' satırını vurgula">' + r + '</button></th>';
    for (let c = 1; c <= size; c++) html += '<td>' + r * c + '</td>';
    html += '</tr>';
  }
  html += '</tbody>';
  table.innerHTML = html;
}

function toggleRow(tr) {
  const was = tr.classList.contains('is-hl');
  document.querySelectorAll('#ct-grid tr.is-hl').forEach((row) => {
    row.classList.remove('is-hl');
    const b = row.querySelector('.ct-rowbtn');
    if (b) b.setAttribute('aria-pressed', 'false');
  });
  if (!was) {
    tr.classList.add('is-hl');
    tr.querySelector('.ct-rowbtn').setAttribute('aria-pressed', 'true');
  }
}

function switchTab(name) {
  const play = name === 'play';
  show('ct-play-panel', play);
  show('ct-table-panel', !play);
  $('ct-tab-play').setAttribute('aria-pressed', String(play));
  $('ct-tab-table').setAttribute('aria-pressed', String(!play));
}

// ---- Olaylar ----
function bind() {
  $('ct-start').addEventListener('click', () => startGame(null));
  $('ct-finish').addEventListener('click', finishGame);
  $('ct-again').addEventListener('click', () => startGame(null));
  $('ct-menu').addEventListener('click', backToSetup);
  $('ct-retry').addEventListener('click', () => startGame(state.wrongList.map((q) => ({ ...q }))));

  $('ct-choices').addEventListener('click', (e) => {
    const btn = e.target.closest('.ct-choice');
    if (btn) submitAnswer(Number(btn.dataset.value));
  });
  $('ct-typeform').addEventListener('submit', (e) => {
    e.preventDefault();
    if (state.locked) return;
    const text = $('ct-input').value.trim();
    if (!/^\d{1,4}$/.test(text)) { setFeedback('Cevap için bir sayı yaz, sonra Enter\'a bas.', 'warn'); return; }
    submitAnswer(Number(text));
  });

  document.addEventListener('keydown', (e) => {
    if (!state.running || state.locked || state.opts.answer !== 'choice') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if (e.key >= '1' && e.key <= '4') {
      const btn = document.querySelectorAll('.ct-choice')[Number(e.key) - 1];
      if (btn) { e.preventDefault(); submitAnswer(Number(btn.dataset.value)); }
    }
  });

  $('ct-tab-play').addEventListener('click', () => switchTab('play'));
  $('ct-tab-table').addEventListener('click', () => switchTab('table'));
  $('ct-size').addEventListener('change', buildGrid);
  $('ct-grid').addEventListener('click', (e) => {
    const tr = e.target.closest('tbody tr');
    if (tr) toggleRow(tr);
  });
  $('ct-print').addEventListener('click', () => window.print());
}

buildGrid();
renderBest();
bind();

// Test kancası: mevcut durumu ve soruyu okur (oyun mantığını değiştirmez).
window.__carpimTest = () => ({
  running: state.running,
  locked: state.locked,
  op: state.q ? state.q.op : null,
  a: state.q ? state.q.a : null,
  b: state.q ? state.q.b : null,
  text: state.q ? state.q.text : null,
  answer: state.q ? state.q.answer : null,
  score: state.score,
  streak: state.streak,
  correct: state.correct,
  wrong: state.wrong,
  wrongKeys: state.wrongList.map((q) => q.key),
});
