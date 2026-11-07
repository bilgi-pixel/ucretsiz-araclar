// Roll Dice (EN) — random numbers come from the browser's crypto API; nothing leaves the device.
const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
const history = [];
let rolls = 0;
let sumAll = 0;
let busy = false;

/** Unbiased random integer in [1, sides] (rejection sampling on 32-bit values). */
export function randomInt(sides) {
  const max = Math.floor(0x100000000 / sides) * sides;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= max);
  return (buf[0] % sides) + 1;
}

function dieEl(value, sides) {
  const d = document.createElement('div');
  d.className = 'rd-die';
  d.setAttribute('role', 'img');
  d.setAttribute('aria-label', `Die showing ${value}`);
  if (sides === 6) {
    d.classList.add('rd-d6');
    for (let i = 0; i < 9; i++) {
      const c = document.createElement('i');
      if (PIPS[value].includes(i)) c.className = 'pip';
      d.append(c);
    }
  } else {
    d.classList.add('rd-num');
    d.textContent = String(value);
  }
  return d;
}

function render(values, sides) {
  const area = $('dice-area');
  area.textContent = '';
  values.forEach((v) => area.append(dieEl(v, sides)));
  if (!reduceMotion) {
    area.classList.remove('rd-shake'); void area.offsetWidth; area.classList.add('rd-shake');
  }
}

function roll() {
  if (busy) return;
  const count = Number($('dice-count').value);
  const sides = Number($('dice-sides').value);
  const modRaw = $('dice-mod').value.trim();
  let mod = 0;
  const err = $('error');
  err.classList.remove('is-active'); err.textContent = '';
  if (modRaw !== '') {
    mod = Number(modRaw.replace(/^\+/, ''));
    if (!/^[+-]?\d{1,4}$/.test(modRaw) || !Number.isInteger(mod)) {
      err.textContent = 'The modifier must be a whole number such as 2 or -1. Clear the box to roll without one.';
      err.classList.add('is-active'); $('dice-mod').focus(); return;
    }
  }
  busy = true;
  const values = Array.from({ length: count }, () => randomInt(sides));
  const sum = values.reduce((a, b) => a + b, 0);
  const total = sum + mod;
  render(values, sides);
  const modTxt = mod === 0 ? '' : ` ${mod > 0 ? '+' : '-'} ${Math.abs(mod)}`;
  $('total').textContent = String(total);
  $('breakdown').textContent = `${values.join(' + ')}${modTxt} = ${total}`;
  $('announce').textContent = `You rolled ${values.join(', ')}${mod ? ` with a modifier of ${mod}` : ''}. Total ${total}.`;
  rolls += 1; sumAll += total;
  history.unshift(`${count}d${sides}${mod ? (mod > 0 ? '+' : '') + mod : ''}: ${values.join(', ')} = ${total}`);
  history.length = Math.min(history.length, 20);
  const ul = $('history');
  ul.textContent = '';
  history.forEach((h) => { const li = document.createElement('li'); li.textContent = h; ul.append(li); });
  $('stat').textContent = `${rolls} roll${rolls === 1 ? '' : 's'} so far, average total ${(sumAll / rolls).toFixed(2)}`;
  $('history-wrap').hidden = false;
  setTimeout(() => { busy = false; }, reduceMotion ? 0 : 250);
}

$('roll').addEventListener('click', roll);
$('reset').addEventListener('click', () => {
  history.length = 0; rolls = 0; sumAll = 0;
  $('history').textContent = ''; $('history-wrap').hidden = true;
  $('dice-area').textContent = ''; $('total').textContent = '–'; $('breakdown').textContent = 'Press Roll to throw the dice.';
  $('stat').textContent = ''; $('announce').textContent = 'History cleared.';
});
