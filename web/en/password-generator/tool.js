// Password Generator (EN) — all randomness comes from crypto.getRandomValues.
// No function makes a network request; generated passwords only live in this tab's memory.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// English word list: short, common, easy to type, lowercase letters a–z only.
// Duplicates are removed below, and the strength meter uses the real list size.
export const WORDS = `
apple apricot banana berry cherry coconut lemon lime mango melon olive orange peach pear plum grape
carrot onion pepper potato tomato pumpkin radish spinach turnip bean corn rice bread butter cheese honey
sugar salt flour pasta soup salad pizza noodle cookie cake candy toast waffle cream yogurt coffee tea milk juice
river lake ocean stream pond beach shore island harbor bridge valley canyon desert forest meadow garden field hill
mountain cliff cave rock stone sand clay metal iron copper silver gold crystal diamond pearl amber coral marble
cloud rain snow storm wind breeze thunder lightning frost fog mist sunset sunrise dawn dusk moon star planet comet
rocket orbit galaxy cosmos solar lunar aurora rainbow shadow flame spark ember smoke ash
tiger lion eagle falcon rabbit fox wolf bear deer horse zebra camel panda koala otter beaver badger squirrel
dolphin whale shark turtle penguin parrot robin sparrow swan owl raven duck goose chicken donkey monkey gorilla
spider beetle cricket butterfly bee ant moth firefly lizard frog salmon trout
oak pine maple birch cedar willow bamboo cactus fern moss clover daisy tulip lily rose orchid violet jasmine
table chair sofa desk shelf lamp mirror window door floor ceiling stairs roof wall kitchen garage attic cellar
pillow blanket carpet curtain basket bucket bottle glass plate bowl spoon fork knife teapot kettle candle
pencil pen paper notebook book letter envelope stamp map compass ruler eraser marker crayon brush canvas
guitar piano violin drum flute trumpet harp melody rhythm chorus song dance theater movie circus parade
bicycle train truck wagon ship boat sailor captain pilot engine wheel pedal anchor sail paddle ticket suitcase
hammer wrench screw nail ladder rope chain hook magnet battery cable switch button signal laser camera
shirt jacket coat scarf glove mitten sock sneaker boot sandal hat helmet ribbon button zipper pocket
red blue green yellow purple orange pink brown black white gray silver golden scarlet crimson indigo teal
happy brave calm clever cozy eager fancy gentle jolly kind lively lucky merry noble proud quick quiet rapid
sharp shiny silent smooth soft solid steady sturdy sunny swift tidy warm wise witty young bright fresh
north south east west forward upward inside outside across above below around between beyond early late
monday tuesday friday saturday sunday january march april june july august october november december
winter spring summer autumn season morning evening midnight noon hour minute second week month year
doctor teacher farmer baker painter writer singer driver artist builder gardener fisherman explorer
soccer tennis hockey cricket golf rugby boxing skiing surfing hiking camping fishing archery
planet puzzle riddle secret treasure legend castle tower dragon wizard knight pirate ranger voyage journey
anchor beacon compass lantern harbor marina lighthouse horizon meadow orchard pasture prairie tundra glacier
velvet cotton wool silk linen denim leather paper wooden granite copper bronze
thunder whisper echo rumble giggle chuckle shout murmur
`.split(/\s+/).map((w) => w.trim().toLowerCase()).filter((w) => /^[a-z]+$/.test(w) && w.length >= 3);
// Remove duplicates (the list is typed by hand, so keep a safety net).
const WORD_LIST = Array.from(new Set(WORDS));

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digit: '0123456789',
  symbol: '!@#$%^&*()-_=+[]{};:,.?/~',
};
const LOOKALIKE = /[0O1lI|]/g;
const GUESSES_PER_SEC = 1e10; // a strong home computer / single GPU assumption

/** Random integer 0 ≤ n < max without modulo bias. */
export function randomInt(max) {
  if (!(max > 0) || max > 0x100000000) throw new Error('bad range');
  const limit = 0x100000000 - (0x100000000 % max);
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % max;
  }
}

function pick(str) { return str[randomInt(str.length)]; }

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildPool({ upper, lower, digit, symbol, noLookalike }) {
  let pool = '';
  if (lower) pool += SETS.lower;
  if (upper) pool += SETS.upper;
  if (digit) pool += SETS.digit;
  if (symbol) pool += SETS.symbol;
  if (noLookalike) pool = pool.replace(LOOKALIKE, '');
  return pool;
}

/** At least one character from every selected set is guaranteed; the rest is filled from the whole pool. */
export function generateRandom(opts) {
  const pool = buildPool(opts);
  if (!pool) throw new Error('EMPTY_POOL');
  const required = [];
  for (const key of ['lower', 'upper', 'digit', 'symbol']) {
    if (!opts[key]) continue;
    const set = opts.noLookalike ? SETS[key].replace(LOOKALIKE, '') : SETS[key];
    if (set) required.push(pick(set));
  }
  const chars = required.slice(0, opts.length);
  while (chars.length < opts.length) chars.push(pick(pool));
  return { value: shuffle(chars).join(''), bits: Math.log2(pool.length) * opts.length };
}

export function generatePassphrase({ words, separator, capitalize, addNumber }) {
  const parts = [];
  for (let i = 0; i < words; i++) {
    let w = WORD_LIST[randomInt(WORD_LIST.length)];
    if (capitalize) w = w[0].toUpperCase() + w.slice(1);
    parts.push(w);
  }
  let bits = Math.log2(WORD_LIST.length) * words;
  if (addNumber) { parts.push(String(randomInt(100)).padStart(2, '0')); bits += Math.log2(100); }
  return { value: parts.join(separator), bits };
}

export function generatePin({ length }) {
  let s = '';
  for (let i = 0; i < length; i++) s += pick(SETS.digit);
  return { value: s, bits: Math.log2(10) * length };
}

/** Plain-English estimate of the average time to crack, based on entropy. */
export function crackTimeText(bits) {
  const seconds = Math.pow(2, bits - 1) / GUESSES_PER_SEC;
  const year = 31_557_600;
  const fmt = (n) => (n >= 10 ? Math.round(n) : Math.round(n * 10) / 10).toLocaleString('en-US');
  if (seconds < 1) return 'less than a second';
  if (seconds < 60) return `about ${fmt(seconds)} seconds`;
  if (seconds < 3600) return `about ${fmt(seconds / 60)} minutes`;
  if (seconds < 86_400) return `about ${fmt(seconds / 3600)} hours`;
  if (seconds < year) return `about ${fmt(seconds / 86_400)} days`;
  const years = seconds / year;
  if (years < 1e3) return `about ${fmt(years)} years`;
  if (years < 1e6) return `about ${fmt(years / 1e3)} thousand years`;
  if (years < 1e9) return `about ${fmt(years / 1e6)} million years`;
  if (years < 1e12) return `about ${fmt(years / 1e9)} billion years`;
  return 'far longer than the age of the universe (trillions of years)';
}

export function strengthLevel(bits) {
  if (bits < 36) return { key: 'weak', label: 'Weak', pct: 20 };
  if (bits < 60) return { key: 'fair', label: 'Fair', pct: 45 };
  if (bits < 80) return { key: 'good', label: 'Good', pct: 70 };
  if (bits < 100) return { key: 'strong', label: 'Strong', pct: 88 };
  return { key: 'excellent', label: 'Very strong', pct: 100 };
}

// ---------- UI ----------
const modeInputs = Array.from(document.querySelectorAll('input[name="mode"]'));
const panels = { random: $('panel-random'), phrase: $('panel-phrase'), pin: $('panel-pin') };

function currentMode() { return (modeInputs.find((r) => r.checked) || modeInputs[0]).value; }

function syncPanels() {
  const mode = currentMode();
  for (const [k, el] of Object.entries(panels)) el.hidden = k !== mode;
  previewStrength();
}

function clampNumber(el, min, max) {
  let v = Number(el.value);
  if (!Number.isFinite(v)) v = min;
  v = Math.max(min, Math.min(max, Math.round(v)));
  el.value = String(v);
  return v;
}

function readOptions() {
  const mode = currentMode();
  if (mode === 'random') {
    return {
      mode,
      length: clampNumber($('opt-length'), 8, 64),
      upper: $('opt-upper').checked,
      lower: $('opt-lower').checked,
      digit: $('opt-digit').checked,
      symbol: $('opt-symbol').checked,
      noLookalike: $('opt-lookalike').checked,
    };
  }
  if (mode === 'phrase') {
    return {
      mode,
      words: clampNumber($('opt-words'), 3, 10),
      separator: $('opt-sep').value,
      capitalize: $('opt-cap').checked,
      addNumber: $('opt-num').checked,
    };
  }
  return { mode, length: clampNumber($('opt-pin-length'), 4, 12) };
}

function generateOne(opts) {
  if (opts.mode === 'random') return generateRandom(opts);
  if (opts.mode === 'phrase') return generatePassphrase(opts);
  return generatePin(opts);
}

function estimateBits(opts) {
  if (opts.mode === 'random') { const p = buildPool(opts); return p ? Math.log2(p.length) * opts.length : 0; }
  if (opts.mode === 'phrase') return Math.log2(WORD_LIST.length) * opts.words + (opts.addNumber ? Math.log2(100) : 0);
  return Math.log2(10) * opts.length;
}

function renderStrength(bits) {
  const lvl = strengthLevel(bits);
  const el = $('strength');
  el.dataset.level = lvl.key;
  el.querySelector('.bar > span').style.width = `${lvl.pct}%`;
  $('strength-label').textContent = lvl.label;
  $('strength-bits').textContent = `${Math.round(bits)} bits of entropy`;
  $('strength-time').textContent = `Estimated time to crack: ${crackTimeText(bits)} (assuming 10 billion guesses per second)`;
  el.setAttribute('aria-valuenow', String(Math.round(bits)));
}

function previewStrength() {
  try { renderStrength(estimateBits(readOptions())); } catch { /* invalid option; a message is shown when generating */ }
}

const outputs = $('outputs');

function renderOutputs(list) {
  outputs.innerHTML = '';
  list.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<code class="pw" tabindex="0"></code><button class="ba-btn" type="button" data-copy aria-label="Copy password">Copy</button>';
    li.querySelector('.pw').textContent = item.value;
    li.querySelector('.pw').setAttribute('aria-label', `Password ${i + 1}`);
    outputs.appendChild(li);
  });
  $('result').classList.toggle('is-active', list.length > 0);
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through to the fallback below */ }
  const ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { ok = false; }
  ta.remove();
  return ok;
}

outputs.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-copy]');
  if (!btn) return;
  const text = btn.closest('li').querySelector('.pw').textContent;
  const ok = await copyText(text);
  const old = btn.textContent;
  btn.textContent = ok ? 'Copied' : 'Copy failed';
  btn.classList.toggle('is-copied', ok);
  if (!ok) showError($('error'), 'Clipboard access was blocked. Select the password and press Ctrl+C (Mac: Cmd+C) to copy it.');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('is-copied'); }, 1800);
});

$('generate').addEventListener('click', () => {
  showError($('error'), null);
  const opts = readOptions();
  const count = Number($('opt-count').value) === 5 ? 5 : 1;
  try {
    if (!window.crypto || !crypto.getRandomValues) throw new Error('NO_CRYPTO');
    const list = [];
    for (let i = 0; i < count; i++) list.push(generateOne(opts));
    renderOutputs(list);
    renderStrength(list[0].bits);
    $('result-info').textContent = count === 1 ? 'Your password is ready; copy it and save it in your password manager.' : 'Five options were generated; pick one and copy it.';
    outputs.querySelector('.pw')?.focus({ preventScroll: true });
  } catch (err) {
    if (String(err.message) === 'EMPTY_POOL') showError($('error'), 'Select at least one character type (lowercase, uppercase, numbers or symbols).');
    else if (String(err.message) === 'NO_CRYPTO') showError($('error'), 'Your browser does not support secure random number generation. Use a current version of Chrome, Firefox, Safari or Edge.');
    else showError($('error'), 'Something unexpected went wrong while generating the password. Reload the page and try again.');
  }
});

$('clear').addEventListener('click', () => {
  renderOutputs([]);
  showError($('error'), null);
  previewStrength();
});

modeInputs.forEach((r) => r.addEventListener('change', syncPanels));
document.querySelectorAll('#options input, #options select').forEach((el) => {
  el.addEventListener('input', previewStrength);
  el.addEventListener('change', previewStrength);
});
$('word-count').textContent = String(WORD_LIST.length);
syncPanels();
