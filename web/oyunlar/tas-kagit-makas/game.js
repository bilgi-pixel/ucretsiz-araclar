// Taş Kağıt Makas — bilgisayara karşı (rastgele / öğrenen) ve iki oyunculu klavye modu.
// Tamamen istemci tarafı: el çizimleri satır içi SVG, dış görsel/istek yok.
// Skor ve istatistikler yalnızca bu cihazdaki localStorage'a yazılır.

const STORE_KEY = 'ba-oyun-tas-kagit-makas';
const SHAKE_MS = 480;          // "taş-kağıt-makas!" sallanma süresi (hareket azaltma açıksa 0)
const EXPLORE_RATE = 0.1;      // öğrenen modda rastgele deneme oranı (tahmin edilemez kalsın)
const MIN_HISTORY = 3;         // bu kadar el görmeden öğrenen mod rastgele oynar

// İşaretler. Sıra sabit: 0 taş, 1 kağıt, 2 makas, 3 kertenkele, 4 uzaylı.
const MOVES = [
  { id: 'tas', name: 'Taş', lower: 'taş' },
  { id: 'kagit', name: 'Kağıt', lower: 'kağıt' },
  { id: 'makas', name: 'Makas', lower: 'makas' },
  { id: 'kertenkele', name: 'Kertenkele', lower: 'kertenkele' },
  { id: 'uzayli', name: 'Uzaylı', lower: 'uzaylı' },
];

// "kazanan-kaybeden" -> cümle. Klasik 3'lü yalnızca ilk üç işareti kullanır.
const RULES = {
  '0-2': 'Taş makası kırar',
  '0-3': 'Taş kertenkeleyi ezer',
  '1-0': 'Kağıt taşı sarar',
  '1-4': 'Kağıt uzaylıyı çürütür',
  '2-1': 'Makas kağıdı keser',
  '2-3': 'Makas kertenkeleyi doğrar',
  '3-1': 'Kertenkele kağıdı kemirir',
  '3-4': 'Kertenkele uzaylıyı zehirler',
  '4-2': 'Uzaylı makası eritir',
  '4-0': 'Uzaylı taşı buharlaştırır',
};

// Tuş haritası (e.code, klavye düzeninden bağımsız). Oyuncu 1: A S D (+ F G), Oyuncu 2: J K L (+ I O).
const KEYS_P1 = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG'];
const KEYS_P2 = ['KeyJ', 'KeyK', 'KeyL', 'KeyI', 'KeyO'];
const KEY_LABEL_P1 = ['A', 'S', 'D', 'F', 'G'];
const KEY_LABEL_P2 = ['J', 'K', 'L', 'I', 'O'];

/** a, b'yi yener mi? */
function beats(a, b) {
  return Object.prototype.hasOwnProperty.call(RULES, a + '-' + b);
}

/** 1: a kazanır, -1: b kazanır, 0: berabere */
function outcome(a, b) {
  if (a === b) return 0;
  return beats(a, b) ? 1 : -1;
}

// ---------- El çizimleri (kendi çizimimiz; 64x64) ----------
// Her şekil iki kez çizilir: önce kalın dış hat grubu, sonra dolgu grubu; böylece parmaklar birleşik bir silüet olur.
const HAND_SHAPES = [
  // taş: yumruk
  '<rect x="14" y="24" width="36" height="30" rx="12"/>',
  // kağıt: açık el
  '<rect x="18" y="32" width="28" height="22" rx="8"/><rect x="18" y="11" width="7" height="28" rx="3.5"/><rect x="25" y="6" width="7" height="33" rx="3.5"/><rect x="32" y="9" width="7" height="30" rx="3.5"/><rect x="39" y="15" width="7" height="24" rx="3.5"/><rect x="7" y="34" width="7" height="19" rx="3.5" transform="rotate(-28 10.5 43)"/>',
  // makas: iki parmak V
  '<rect x="18" y="34" width="28" height="20" rx="8"/><rect x="20" y="5" width="8" height="36" rx="4" transform="rotate(-15 24 40)"/><rect x="34" y="5" width="8" height="36" rx="4" transform="rotate(15 38 40)"/><rect x="40" y="33" width="9" height="12" rx="4.5"/><ellipse cx="23" cy="47" rx="7" ry="5"/>',
  // kertenkele: üstten görünüm
  '<ellipse cx="32" cy="12" rx="7" ry="8"/><ellipse cx="32" cy="29" rx="9" ry="15"/><path class="leg" d="M32 42C32 52 40 54 44 61"/><path class="leg" d="M25 21L15 19L11 25"/><path class="leg" d="M39 21L49 19L53 25"/><path class="leg" d="M25 36L15 39L12 46"/><path class="leg" d="M39 36L49 39L52 46"/>',
  // uzaylı: parmaklar ikili ayrık (V), baş parmak yanda
  '<rect x="19" y="34" width="26" height="20" rx="8"/><rect x="18" y="11" width="7" height="30" rx="3.5" transform="rotate(-10 21.5 40)"/><rect x="25" y="7" width="7" height="34" rx="3.5" transform="rotate(-10 28.5 40)"/><rect x="32" y="9" width="7" height="32" rx="3.5" transform="rotate(10 35.5 40)"/><rect x="39" y="14" width="7" height="27" rx="3.5" transform="rotate(10 42.5 40)"/><rect x="8" y="35" width="7" height="18" rx="3.5" transform="rotate(-32 11.5 44)"/>',
];
const HAND_DETAILS = [
  '<path d="M23 26v10M32 26v10M41 26v10"/><path d="M17 45c5-5 17-5 22 0"/>',
  '',
  '<path d="M43 36v6"/>',
  '<circle class="dot" cx="29" cy="10" r="1.3"/><circle class="dot" cx="35" cy="10" r="1.3"/><path d="M32 19v20" stroke-dasharray="2 3"/>',
  '<path d="M32 36v8" opacity=".55"/>',
];

function handSvg(i) {
  const s = HAND_SHAPES[i];
  return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">'
    + '<g class="tkm-o">' + s + '</g><g class="tkm-f">' + s + '</g><g class="tkm-d">' + HAND_DETAILS[i] + '</g></svg>';
}

// ---------- Kalıcı veri ----------
function emptyModel() {
  return { t: Array.from({ length: 5 }, () => [0, 0, 0, 0, 0]), f: [0, 0, 0, 0, 0], total: 0, hit: 0, tries: 0, last: null };
}

function defaultData() {
  return {
    v: 1,
    rounds: { random: { w: 0, l: 0, d: 0 }, learning: { w: 0, l: 0, d: 0 } },
    matches: { w: 0, l: 0, d: 0 },
    bestStreak: 0,
    model: { 3: emptyModel(), 5: emptyModel() },
    settings: { opp: 'random', variant: '3', len: '0' },
  };
}

function loadData() {
  const base = defaultData();
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!raw || raw.v !== 1) return base;
    return {
      ...base,
      ...raw,
      rounds: { ...base.rounds, ...(raw.rounds || {}) },
      matches: { ...base.matches, ...(raw.matches || {}) },
      model: {
        3: { ...emptyModel(), ...((raw.model && raw.model[3]) || {}) },
        5: { ...emptyModel(), ...((raw.model && raw.model[5]) || {}) },
      },
      settings: { ...base.settings, ...(raw.settings || {}) },
    };
  } catch (e) {
    return base; // bozuk kayıt veya depolama kapalı: sıfırdan başla
  }
}

let data = loadData();

function saveData() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* özel gezinti: yazılamaz, oyun yine çalışır */ }
}

// ---------- Durum ----------
const $ = (id) => document.getElementById(id);
const el = {
  arena: $('tkm-arena'), handYou: $('hand-you'), handCpu: $('hand-cpu'),
  nameYou: $('pick-you-name'), nameCpu: $('pick-cpu-name'),
  sideYou: $('side-you'), sideCpu: $('side-cpu'),
  labYou: $('tkm-name-you'), labCpu: $('tkm-name-cpu'),
  scoreYou: $('score-you'), scoreCpu: $('score-cpu'), scoreDraw: $('score-draw'),
  round: $('tkm-round'), streak: $('tkm-streak'),
  result: $('tkm-result'), predict: $('tkm-predict'), match: $('tkm-match'),
  pad1: $('tkm-pad-1'), pad2: $('tkm-pad-2'), pad2wrap: $('tkm-pad-2-wrap'), pad1label: $('tkm-pad-1-label'),
  info: $('tkm-info'), newBtn: $('tkm-new'), clearBtn: $('tkm-clear'),
};

const state = {
  opp: data.settings.opp,          // random | learning | two
  variant: data.settings.variant,  // '3' | '5'
  len: Number(data.settings.len),  // 0 = serbest
  you: 0, cpu: 0, draw: 0, round: 0, streak: 0,
  over: false, busy: false, timer: null,
  p1: null, p2: null,              // iki oyunculu mod: bekleyen seçimler
};

const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const moveCount = () => (state.variant === '5' ? 5 : 3);
const isTwo = () => state.opp === 'two';

// ---------- Bilgisayar zekâsı ----------
function randomMove(n) {
  return Math.floor(Math.random() * n);
}

/** En büyük ağırlıklı indeks; eşitlikte rastgele. */
function argmaxRandom(weights) {
  const max = Math.max(...weights);
  const best = [];
  weights.forEach((w, i) => { if (w === max) best.push(i); });
  return best[Math.floor(Math.random() * best.length)];
}

/** Birinci derece Markov: oyuncunun son işaretinden sonra en sık seçtiği işareti tahmin eder. */
function predictPlayer(model, n) {
  if (model.total < MIN_HISTORY) return null;
  const last = model.last;
  const row = last == null ? null : model.t[last].slice(0, n);
  const rowSum = row ? row.reduce((a, b) => a + b, 0) : 0;
  // Geçiş satırında yeterli veri yoksa genel sıklığa düş.
  const weights = rowSum >= 2 ? row : model.f.slice(0, n);
  if (Math.max(...weights) === 0) return null;
  return argmaxRandom(weights);
}

/** Tahmin edilen işareti yenen bir işaret seç (5'li modda iki seçenekten biri). */
function counterMove(predicted, n) {
  const options = [];
  for (let m = 0; m < n; m++) if (beats(m, predicted)) options.push(m);
  return options[Math.floor(Math.random() * options.length)];
}

function chooseCpu(n) {
  if (state.opp !== 'learning') return { move: randomMove(n), predicted: null };
  const model = data.model[state.variant];
  const predicted = predictPlayer(model, n);
  if (predicted == null || Math.random() < EXPLORE_RATE) return { move: randomMove(n), predicted };
  return { move: counterMove(predicted, n), predicted };
}

function learn(pickedMove) {
  const model = data.model[state.variant];
  if (model.last != null) model.t[model.last][pickedMove] += 1;
  model.f[pickedMove] += 1;
  model.total += 1;
  model.last = pickedMove;
}

/** Yeni maçta "son hamle" bilgisini sıfırla; önceki maçın son eli ile bağlantı kurulmasın. */
function resetLastMove() {
  data.model[3].last = null;
  data.model[5].last = null;
}

// ---------- Ekran ----------
function pct(part, sum) {
  return sum ? Math.round((part / sum) * 100) + '%' : '—';
}

function renderPads() {
  const n = moveCount();
  const build = (labels, player) => {
    let html = '';
    for (let i = 0; i < n; i++) {
      const key = labels[i];
      html += '<button type="button" class="tkm-btn" data-move="' + i + '" data-player="' + player + '" aria-label="'
        + MOVES[i].name + ' (' + key + ' tuşu)">' + handSvg(i) + '<span class="tkm-btn-name">' + MOVES[i].name
        + '</span><kbd aria-hidden="true">' + key + '</kbd></button>';
    }
    return html;
  };
  el.pad1.innerHTML = build(KEY_LABEL_P1, 1);
  el.pad2.innerHTML = build(KEY_LABEL_P2, 2);
}

function setPadsDisabled(pad, disabled) {
  // disabled yerine aria-disabled: odak düğmede kalsın (klavye kullanıcısı Tab sırasını kaybetmesin).
  pad.querySelectorAll('button').forEach((b) => { b.setAttribute('aria-disabled', disabled ? 'true' : 'false'); });
}

function renderLabels() {
  const two = isTwo();
  const five = state.variant === '5';
  el.labYou.textContent = two ? 'Oyuncu 1' : 'Sen';
  el.labCpu.textContent = two ? 'Oyuncu 2' : 'Bilgisayar';
  el.pad1label.textContent = two ? 'Oyuncu 1 (' + KEY_LABEL_P1.slice(0, moveCount()).join(' ') + ')' : 'İşaretini seç';
  el.pad2wrap.hidden = !two;
  $('tkm-pad-2-label').textContent = 'Oyuncu 2 (' + KEY_LABEL_P2.slice(0, moveCount()).join(' ') + ')';
  el.streak.hidden = two;
  el.predict.hidden = state.opp !== 'learning';
  const names = five ? 'taş, kağıt, makas, kertenkele, uzaylı' : 'taş, kağıt, makas';
  if (two) {
    el.info.textContent = 'Oyuncu 1 tuşları: ' + KEY_LABEL_P1.slice(0, moveCount()).join(' ') + '. Oyuncu 2 tuşları: '
      + KEY_LABEL_P2.slice(0, moveCount()).join(' ') + ' (sırayla ' + names + '). İlk oyuncunun seçimi, ikinci oyuncu seçene kadar gizli kalır.';
  } else if (state.opp === 'learning') {
    el.info.textContent = 'Bilgisayar, önceki seçimlerinden bir sonraki hamleni tahmin edip onu yenecek işareti oynar. İlk elleri rastgele oynar, sonra kalıbını öğrenir. Klavye: '
      + KEY_LABEL_P1.slice(0, moveCount()).join(' ') + ' veya 1-' + moveCount() + '.';
  } else {
    el.info.textContent = 'Bilgisayar her elde rastgele seçer; uzun vadede kimse kalıcı avantaj sağlayamaz. Klavye: '
      + KEY_LABEL_P1.slice(0, moveCount()).join(' ') + ' veya 1-' + moveCount() + '.';
  }
}

function showQuestion() {
  el.handYou.innerHTML = '<span class="tkm-q" aria-hidden="true">?</span>';
  el.handCpu.innerHTML = '<span class="tkm-q" aria-hidden="true">?</span>';
  el.nameYou.textContent = '—';
  el.nameCpu.textContent = '—';
  el.sideYou.className = 'tkm-side';
  el.sideCpu.className = 'tkm-side';
}

function renderScore() {
  el.scoreYou.textContent = String(state.you);
  el.scoreCpu.textContent = String(state.cpu);
  el.scoreDraw.textContent = String(state.draw);
  el.round.textContent = 'El: ' + state.round + (state.len ? '/' + state.len : '');
  el.streak.textContent = 'Seri: ' + state.streak + ' · En uzun seri: ' + data.bestStreak;
}

function renderStats() {
  const r = data.rounds;
  const sumOf = (x) => x.w + x.l + x.d;
  const rate = (x) => (sumOf(x) ? pct(x.w, sumOf(x)) + ' (' + x.w + '/' + sumOf(x) + ')' : '—');
  $('stat-rounds').textContent = String(sumOf(r.random) + sumOf(r.learning));
  $('stat-random').textContent = rate(r.random);
  $('stat-learning').textContent = rate(r.learning);
  $('stat-best').textContent = String(data.bestStreak);
  $('stat-matches').textContent = data.matches.w + ' galibiyet · ' + data.matches.l + ' yenilgi · ' + data.matches.d + ' beraberlik';
  const m = data.model[state.variant];
  $('stat-predict').textContent = m.tries ? pct(m.hit, m.tries) + ' (' + m.hit + '/' + m.tries + ')' : '—';
}

function setResult(text, tone) {
  el.result.textContent = text;
  el.result.dataset.tone = tone || '';
}

// ---------- Oyun akışı ----------
function clearTimer() {
  if (state.timer) { clearTimeout(state.timer); state.timer = null; }
}

function resetMatch(announce) {
  clearTimer();
  state.you = 0; state.cpu = 0; state.draw = 0; state.round = 0; state.streak = 0;
  state.over = false; state.busy = false; state.p1 = null; state.p2 = null;
  el.arena.classList.remove('is-shaking');
  el.match.hidden = true;
  el.match.textContent = '';
  el.predict.textContent = '';
  setPadsDisabled(el.pad1, false);
  setPadsDisabled(el.pad2, false);
  showQuestion();
  renderScore();
  renderStats();
  setResult(announce || (isTwo() ? 'Oyuncu 1 ve Oyuncu 2 sırayla işaret seçsin.' : 'Bir işaret seçerek başlayın.'));
  resetLastMove();
}

function startRound(p1Move, p2Move, predicted) {
  state.busy = true; // sallanma sırasında yeni seçim yok sayılır
  el.handYou.innerHTML = handSvg(0);
  el.handCpu.innerHTML = handSvg(0);
  el.nameYou.textContent = '…';
  el.nameCpu.textContent = '…';
  el.sideYou.className = 'tkm-side';
  el.sideCpu.className = 'tkm-side';
  setResult('Taş… kağıt… makas!');
  const finish = () => { state.timer = null; reveal(p1Move, p2Move, predicted); };
  if (reducedMotion()) { finish(); return; }
  el.arena.classList.add('is-shaking');
  state.timer = setTimeout(finish, SHAKE_MS);
}

function reveal(a, b, predicted) {
  el.arena.classList.remove('is-shaking');
  const two = isTwo();
  const res = outcome(a, b);
  state.round += 1;

  el.handYou.innerHTML = handSvg(a);
  el.handCpu.innerHTML = handSvg(b);
  el.nameYou.textContent = MOVES[a].name;
  el.nameCpu.textContent = MOVES[b].name;
  el.sideYou.className = 'tkm-side is-reveal ' + (res === 1 ? 'is-win' : res === -1 ? 'is-lose' : 'is-draw');
  el.sideCpu.className = 'tkm-side is-reveal ' + (res === -1 ? 'is-win' : res === 1 ? 'is-lose' : 'is-draw');

  const sentence = res === 1 ? RULES[a + '-' + b] : res === -1 ? RULES[b + '-' + a] : '';
  if (res === 0) {
    state.draw += 1;
    setResult('Berabere. ' + (two ? 'İki oyuncu da ' : 'İkiniz de ') + MOVES[a].lower + ' seçti.', 'draw');
  } else if (res === 1) {
    state.you += 1;
    setResult((two ? 'Oyuncu 1 kazandı! ' : 'Kazandın! ') + sentence + '.', 'win');
  } else {
    state.cpu += 1;
    setResult((two ? 'Oyuncu 2 kazandı! ' : 'Kaybettin. ') + sentence + '.', 'lose');
  }

  if (!two) {
    const bucket = data.rounds[state.opp];
    if (res === 1) { bucket.w += 1; state.streak += 1; if (state.streak > data.bestStreak) data.bestStreak = state.streak; }
    else if (res === -1) { bucket.l += 1; state.streak = 0; }
    else { bucket.d += 1; }
    if (state.opp === 'learning') {
      const model = data.model[state.variant];
      if (predicted != null) {
        model.tries += 1;
        if (predicted === a) model.hit += 1;
        el.predict.textContent = 'Bilgisayarın tahmini: ' + MOVES[predicted].lower + (predicted === a ? ' (doğru bildi).' : ' (yanıldı).');
      } else {
        el.predict.textContent = 'Bilgisayar henüz seni tanımıyor; ilk elleri rastgele oynar.';
      }
    }
    // Öğrenme her iki bilgisayar modunda da işler; modlar arası geçişte veri kaybolmaz.
    learn(a);
  }

  state.busy = false;
  renderScore();
  finishMatchIfNeeded();
  if (!state.over) {
    setPadsDisabled(el.pad1, false);
    setPadsDisabled(el.pad2, false);
  }
  saveData();
  renderStats();
}

function finishMatchIfNeeded() {
  if (!state.len || state.round < state.len) return;
  state.over = true;
  setPadsDisabled(el.pad1, true);
  setPadsDisabled(el.pad2, true);
  const two = isTwo();
  const score = state.you + '–' + state.cpu + (state.draw ? ', ' + state.draw + ' berabere' : '');
  let text;
  if (state.you > state.cpu) text = 'Maç bitti: ' + (two ? 'Oyuncu 1 kazandı' : 'sen kazandın') + ' (' + score + ').';
  else if (state.you < state.cpu) text = 'Maç bitti: ' + (two ? 'Oyuncu 2 kazandı' : 'bilgisayar kazandı') + ' (' + score + ').';
  else text = 'Maç bitti: berabere (' + score + ').';
  if (!two) {
    if (state.you > state.cpu) data.matches.w += 1;
    else if (state.you < state.cpu) data.matches.l += 1;
    else data.matches.d += 1;
  }
  el.match.textContent = text + ' Yeni bir maç için "Yeni maç" düğmesine basın.';
  el.match.hidden = false;
  el.newBtn.focus(); // maç bitti: odak "Yeni maç" düğmesine geçsin
}

/** Bir oyuncunun işaret seçimi (düğme veya tuş). */
function pick(player, move) {
  if (state.busy || state.over) return;
  if (move >= moveCount()) return;
  if (!isTwo()) {
    if (player !== 1) return;
    const cpu = chooseCpu(moveCount());
    startRound(move, cpu.move, cpu.predicted);
    return;
  }
  // İki oyunculu: ilk seçim gizli tutulur, ikinci seçim gelince açılır.
  if (player === 1 && state.p1 == null) {
    state.p1 = move;
    setPadsDisabled(el.pad1, true);
    setResult(state.p2 == null ? 'Oyuncu 1 seçti. Oyuncu 2, sıra sende.' : 'Seçimler tamam.');
  } else if (player === 2 && state.p2 == null) {
    state.p2 = move;
    setPadsDisabled(el.pad2, true);
    setResult(state.p1 == null ? 'Oyuncu 2 seçti. Oyuncu 1, sıra sende.' : 'Seçimler tamam.');
  } else return;
  if (state.p1 != null && state.p2 != null) {
    const a = state.p1; const b = state.p2;
    state.p1 = null; state.p2 = null;
    startRound(a, b, null);
  }
}

// ---------- Olaylar ----------
[el.pad1, el.pad2].forEach((pad) => {
  pad.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-move]');
    if (!btn || btn.getAttribute('aria-disabled') === 'true') return;
    pick(Number(btn.dataset.player), Number(btn.dataset.move));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
  const t = e.target;
  // Metin alanı, seçim kutusu ve düzenlenebilir alanlarda tuşlar oyuna gitmesin.
  if (t && (t.isContentEditable || /^(TEXTAREA|SELECT)$/.test(t.tagName) || (t.tagName === 'INPUT' && !/^(radio|checkbox|button)$/.test(t.type)))) return;
  const code = e.code;
  let i = KEYS_P1.indexOf(code);
  if (i >= 0) { pick(1, i); return; }
  i = KEYS_P2.indexOf(code);
  if (i >= 0 && isTwo()) { pick(2, i); return; }
  const digit = /^(?:Digit|Numpad)([1-5])$/.exec(code);
  if (digit && !isTwo()) pick(1, Number(digit[1]) - 1);
});

function readSettings() {
  state.opp = document.querySelector('input[name="opp"]:checked').value;
  state.variant = document.querySelector('input[name="variant"]:checked').value;
  state.len = Number(document.querySelector('input[name="len"]:checked').value);
}

function applySettings() {
  readSettings();
  data.settings = { opp: state.opp, variant: state.variant, len: String(state.len) };
  saveData();
  renderPads();
  renderLabels();
  resetMatch();
}

document.querySelectorAll('.tkm-options input[type="radio"]').forEach((r) => r.addEventListener('change', applySettings));

el.newBtn.addEventListener('click', () => resetMatch());

let clearArmed = null;
el.clearBtn.addEventListener('click', () => {
  // Onay penceresi yerine iki adımlı düğme: ilk tıklamada uyarır, 4 sn içinde ikinci tıklama siler.
  if (!clearArmed) {
    el.clearBtn.textContent = 'Emin misin? Tekrar tıkla';
    clearArmed = setTimeout(() => { clearArmed = null; el.clearBtn.textContent = 'İstatistikleri sil'; }, 4000);
    return;
  }
  clearTimeout(clearArmed);
  clearArmed = null;
  el.clearBtn.textContent = 'İstatistikleri sil';
  data = { ...defaultData(), settings: data.settings };
  saveData();
  resetMatch('İstatistikler silindi.');
});

// ---------- Başlangıç ----------
function init() {
  const check = (name, value) => {
    const r = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (r) r.checked = true;
  };
  check('opp', state.opp);
  check('variant', state.variant);
  check('len', String(state.len));
  readSettings();
  renderPads();
  renderLabels();
  resetMatch();
}

init();
