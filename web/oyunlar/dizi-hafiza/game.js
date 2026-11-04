// Dizi Hafıza Oyunu — Bilişim Ajans
// İki mod: renk dizisi (4 pad, her turda bir adım uzayan dizi) ve sayı dizisi (ekranda beliren sayıyı yaz).
// Ses isteğe bağlıdır (WebAudio, varsayılan kapalı); en yüksek tur yalnızca bu tarayıcının localStorage alanında tutulur.
// Ağ isteği yok, çerez/izleme yok.

const STORE_KEY = 'ba-oyun-dizi-hafiza';

// Hız seviyeleri: on = pad yanma süresi, gap = adımlar arası boşluk, num = sayı gösterme süresi çarpanı (ms).
const SPEEDS = {
  yavas: { on: 800, gap: 350, num: 1.6 },
  normal: { on: 560, gap: 250, num: 1 },
  hizli: { on: 380, gap: 160, num: 0.7 },
  'cok-hizli': { on: 240, gap: 100, num: 0.5 },
};
// Her pad için farklı bir ton (Hz): do, mi, sol, tiz do.
const TONES = [262, 330, 392, 523];
const PAD_NAMES = ['Kırmızı', 'Yeşil', 'Mavi', 'Sarı'];
const PRE_ROUND_MS = 650; // tur başında kısa hazırlık
const BETWEEN_ROUNDS_MS = 900; // tur tamamlanınca bekleme
const NUMBER_START_LENGTH = 3; // sayı modunda ilk turdaki hane sayısı

const $ = (id) => document.getElementById(id);
const root = $('oyun');
const pads = [...document.querySelectorAll('#pads .dh-pad')];

/* ---------- Depolama ---------- */

function loadStore() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    const best = raw && raw.best ? raw.best : {};
    return { best: { renk: Number(best.renk) || 0, sayi: Number(best.sayi) || 0 } };
  } catch {
    return { best: { renk: 0, sayi: 0 } };
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* depo kapalıysa oyun yine çalışır */
  }
}

const store = loadStore();

/* ---------- Durum ---------- */

const game = { mode: 'renk', phase: 'idle', round: 0, seq: [], pos: 0, token: 0, digits: '', sound: false };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randInt = (n) => Math.floor(Math.random() * n);
const isStale = (token) => token !== game.token;

function setPhase(phase) {
  game.phase = phase;
  root.dataset.phase = phase;
  const active = phase === 'input' && game.mode === 'renk';
  pads.forEach((p) => p.setAttribute('aria-disabled', String(!active)));
  $('pads').classList.toggle('is-active', active);
}

const say = (text) => { $('durum').textContent = text; };

function speedFor(round) {
  const choice = $('hiz').value;
  if (choice === 'kademeli') return round <= 4 ? SPEEDS.normal : round <= 8 ? SPEEDS.hizli : SPEEDS['cok-hizli'];
  return SPEEDS[choice] || SPEEDS.normal;
}

function paintBest() {
  $('en-yuksek').textContent = String(store.best[game.mode]);
}

function paintProgress() {
  const total = game.mode === 'renk' ? game.seq.length : game.digits.length;
  $('ilerleme').textContent = game.phase === 'input' && game.mode === 'renk' ? `${game.pos} / ${total}` : '';
}

/* ---------- Ses (WebAudio, isteğe bağlı) ---------- */

let audioCtx = null;

function ensureAudio() {
  if (!game.sound) return null;
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}

function tone(freq, ms, type = 'sine', volume = 0.16, delayMs = 0) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const start = ctx.currentTime + delayMs / 1000;
  const end = start + ms / 1000;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(end + 0.03);
}

const beepPad = (i, ms) => tone(TONES[i], Math.max(120, ms));
const beepWin = () => { tone(523, 120, 'triangle', 0.14); tone(659, 160, 'triangle', 0.14, 120); };
const beepFail = () => tone(110, 420, 'sawtooth', 0.12);

/* ---------- Pad görselleri ---------- */

const light = (i, on) => pads[i].classList.toggle('is-lit', on);

function flashDown(i) {
  const pad = pads[i];
  pad.classList.add('is-down');
  setTimeout(() => pad.classList.remove('is-down'), 170);
}

function clearPadMarks() {
  pads.forEach((p) => p.classList.remove('is-lit', 'is-down', 'is-wrong', 'is-expected'));
}

/* ---------- Oyun akışı ---------- */

function applyMode(mode) {
  game.mode = mode;
  root.dataset.mode = mode;
  $('renk-alani').hidden = mode !== 'renk';
  $('sayi-alani').hidden = mode !== 'sayi';
  $('mod-etiket').textContent = mode === 'renk' ? 'Renk dizisi' : 'Sayı dizisi';
  $('ipucu-renk').hidden = mode !== 'renk';
  $('ipucu-sayi').hidden = mode !== 'sayi';
}

function resetToIdle() {
  game.token += 1;
  game.round = 0;
  game.seq = [];
  game.pos = 0;
  game.digits = '';
  clearPadMarks();
  $('sonuc').hidden = true;
  $('sayi-form').hidden = true;
  $('sayi-giris').value = '';
  $('sayi-ekran').textContent = '• • •';
  $('tur').textContent = '0';
  $('baslat').textContent = 'Başlat';
  say('Hazır olduğunuzda Başlat düğmesine basın.');
  paintBest();
  setPhase('idle');
  paintProgress();
}

function startGame() {
  game.token += 1;
  const token = game.token;
  game.round = 1;
  game.seq = [];
  game.pos = 0;
  game.digits = '';
  clearPadMarks();
  $('sonuc').hidden = true;
  $('sayi-form').hidden = true;
  $('sayi-giris').value = '';
  $('tur').textContent = '1';
  $('baslat').textContent = 'Yeniden başlat';
  paintBest();
  ensureAudio();
  runRound(token);
}

function runRound(token) {
  return game.mode === 'renk' ? playColorRound(token) : playNumberRound(token);
}

async function playColorRound(token) {
  game.seq.push(randInt(4));
  game.pos = 0;
  setPhase('showing');
  paintProgress();
  say(`${game.round}. tur: diziyi izleyin (${game.seq.length} adım).`);
  await wait(PRE_ROUND_MS);
  if (isStale(token)) return;
  const speed = speedFor(game.round);
  for (const step of game.seq) {
    light(step, true);
    beepPad(step, speed.on);
    await wait(speed.on);
    if (isStale(token)) return;
    light(step, false);
    await wait(speed.gap);
    if (isStale(token)) return;
  }
  setPhase('input');
  paintProgress();
  say('Sıra sizde: diziyi aynı sırayla tekrar edin.');
}

function nextDigits(length) {
  let out;
  do {
    out = '';
    for (let i = 0; i < length; i++) out += String(randInt(10));
  } while (out === game.digits);
  return out;
}

async function playNumberRound(token) {
  const length = NUMBER_START_LENGTH + game.round - 1;
  game.digits = nextDigits(length);
  setPhase('showing');
  $('sayi-form').hidden = true;
  $('sayi-giris').value = '';
  $('sayi-ekran').textContent = 'Hazır…';
  say(`${game.round}. tur: ${length} haneli sayıyı aklınızda tutun.`);
  await wait(PRE_ROUND_MS);
  if (isStale(token)) return;
  const speed = speedFor(game.round);
  $('sayi-ekran').textContent = game.digits;
  await wait(Math.round((500 + 350 * length) * speed.num));
  if (isStale(token)) return;
  $('sayi-ekran').textContent = '•'.repeat(length);
  setPhase('input');
  $('sayi-form').hidden = false;
  $('sayi-giris').maxLength = length + 4;
  say('Gördüğünüz sayıyı yazıp Gönder düğmesine (ya da Enter tuşuna) basın.');
  $('sayi-giris').focus();
}

async function roundDone() {
  const token = game.token;
  const done = game.round;
  setPhase('between');
  $('sayi-form').hidden = true;
  if (done > store.best[game.mode]) {
    store.best[game.mode] = done;
    saveStore();
    paintBest();
  }
  say(`${done}. tur tamam!`);
  beepWin();
  await wait(BETWEEN_ROUNDS_MS);
  if (isStale(token)) return;
  game.round += 1;
  $('tur').textContent = String(game.round);
  await runRound(token);
}

function fail(wrong) {
  game.token += 1; // sürmekte olan bekleyen adımları iptal et
  const completed = game.round - 1;
  setPhase('over');
  beepFail();
  $('sayi-form').hidden = true;
  paintProgress();

  const dizi = $('sonuc-dizi');
  dizi.replaceChildren();
  if (game.mode === 'renk') {
    const expected = game.seq[game.pos];
    pads[wrong].classList.add('is-wrong');
    pads[expected].classList.add('is-expected');
    game.seq.forEach((p, idx) => {
      const chip = document.createElement('span');
      chip.className = `dh-chip dh-c${p}`;
      chip.textContent = `${idx + 1}. ${PAD_NAMES[p]}`;
      dizi.appendChild(chip);
    });
    $('sonuc-etiket').textContent = 'Doğru dizi:';
  } else {
    $('sayi-ekran').textContent = game.digits;
    const t = document.createElement('span');
    t.className = 'dh-typed';
    t.textContent = `${game.digits} (siz: ${wrong})`;
    dizi.appendChild(t);
    $('sonuc-etiket').textContent = 'Doğru sayı:';
  }
  $('sonuc-ozet').textContent = completed > 0
    ? `Tamamladığınız tur: ${completed}. En yüksek turunuz: ${store.best[game.mode]}.`
    : `İlk turu tamamlayamadınız. En yüksek turunuz: ${store.best[game.mode]}. Bir kez daha deneyin!`;
  $('sonuc-rekor').hidden = !(completed > (game.prevBest ?? 0));
  $('sonuc').hidden = false;
  $('baslat').textContent = 'Tekrar oyna';
  say(`Oyun bitti. ${completed} tur tamamladınız.`);
  $('baslat').focus();
}

/* ---------- Girdi ---------- */

function pressPad(i) {
  if (game.mode !== 'renk' || game.phase !== 'input') return;
  flashDown(i);
  beepPad(i, 160);
  if (i !== game.seq[game.pos]) {
    fail(i);
    return;
  }
  game.pos += 1;
  paintProgress();
  if (game.pos === game.seq.length) roundDone();
}

pads.forEach((pad, i) => pad.addEventListener('click', () => pressPad(i)));

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || game.mode !== 'renk') return;
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
  const i = ['1', '2', '3', '4'].indexOf(e.key);
  if (i >= 0) {
    e.preventDefault();
    pressPad(i);
  }
});

$('sayi-giris').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D+/g, '');
});

$('sayi-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (game.mode !== 'sayi' || game.phase !== 'input') return;
  const typed = $('sayi-giris').value.trim();
  if (!typed) {
    say('Önce gördüğünüz sayıyı yazın; baştaki sıfırlar da önemlidir.');
    return;
  }
  if (typed === game.digits) roundDone();
  else fail(typed);
});

$('baslat').addEventListener('click', () => {
  game.prevBest = store.best[game.mode];
  startGame();
});
$('mod').addEventListener('change', (e) => {
  applyMode(e.target.value);
  resetToIdle();
});
$('hiz').addEventListener('change', () => {
  // Hız bir sonraki dizi gösteriminden itibaren geçerlidir; oyunu sıfırlamaz.
  say(`Hız: ${$('hiz').selectedOptions[0].textContent}. Bir sonraki turdan itibaren geçerli.`);
});

$('ses').addEventListener('click', () => {
  game.sound = !game.sound;
  const btn = $('ses');
  btn.setAttribute('aria-pressed', String(game.sound));
  $('ses-durum').textContent = game.sound ? 'açık' : 'kapalı';
  if (game.sound) {
    ensureAudio();
    tone(392, 140);
  }
});

// Tam ekran (destekleyen tarayıcılarda): yalnızca oyun kutusu görünür, reklam alanları dışarıda kalır.
const fsBtn = $('tam-ekran');
if (document.fullscreenEnabled) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else root.requestFullscreen?.().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === root;
    fsBtn.setAttribute('aria-pressed', String(on));
    fsBtn.textContent = on ? 'Tam ekrandan çık' : 'Tam ekran';
  });
}

/* ---------- Başlangıç ---------- */

applyMode($('mod').value);
resetToIdle();
