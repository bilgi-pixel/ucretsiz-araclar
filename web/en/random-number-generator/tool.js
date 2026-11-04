// Random Number Generator (EN) — numbers, dice, coin flips and list picks; runs entirely in the browser.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Randomness (WebCrypto) ---------- */
/** Unbiased integer 0 ≤ n < max (rejection sampling; no modulo bias). */
export function randomInt(max) {
  if (!(max > 0) || max > 0x100000000) throw new Error('max must be between 1 and 2^32');
  if (max === 1) return 0;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let x;
  do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= limit);
  return x % max;
}
/** Fisher–Yates shuffle; returns a new array. */
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Partial Fisher–Yates: picks k distinct items from the array. */
function sampleUnique(arr, k) {
  const a = arr.slice();
  for (let i = 0; i < k; i++) {
    const j = i + randomInt(a.length - i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}

/** Number generation; throws an English, solution-oriented Error on bad input. */
export function generateNumbers({ min, max, count, unique, order }) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) throw new Error('Enter both the lowest and the highest number, for example 1 and 100.');
  if (!Number.isInteger(min) || !Number.isInteger(max)) throw new Error('The range must use whole numbers. Round the decimals and try again.');
  if (min > max) throw new Error('The lowest number cannot be greater than the highest. Swap the two values.');
  const span = max - min + 1;
  if (span > 0xffffffff) throw new Error('The range is too wide. The gap between the highest and lowest number can be at most about 4.29 billion.');
  if (!Number.isInteger(count) || count < 1) throw new Error('How many numbers must be at least 1.');
  if (count > 1000) throw new Error('You can generate at most 1,000 numbers at a time. Lower the count.');
  if (unique && count > span) throw new Error(`There are only ${span} different numbers between ${min} and ${max}, so ${count} unique numbers are impossible. Lower the count, widen the range or untick "No repeats".`);
  let out = [];
  if (unique) {
    if (span <= 200000) {
      out = sampleUnique(Array.from({ length: span }, (_, i) => min + i), count);
    } else {
      const seen = new Set();
      while (out.length < count) { const v = min + randomInt(span); if (!seen.has(v)) { seen.add(v); out.push(v); } }
    }
  } else {
    for (let i = 0; i < count; i++) out.push(min + randomInt(span));
  }
  if (order === 'asc') out.sort((a, b) => a - b);
  else if (order === 'desc') out.sort((a, b) => b - a);
  return out;
}

/* ---------- Tabs ---------- */
const tabs = ['n', 'd', 'c', 'l'];
function selectTab(name, focus = false) {
  tabs.forEach((t) => {
    const sel = t === name;
    $('tab-' + t).setAttribute('aria-selected', String(sel));
    $('tab-' + t).tabIndex = sel ? 0 : -1;
    $('panel-' + t).hidden = !sel;
  });
  if (focus) $('tab-' + name).focus();
  showError($('error'), null);
}
tabs.forEach((t, i) => {
  $('tab-' + t).addEventListener('click', () => selectTab(t));
  $('tab-' + t).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); selectTab(tabs[(i + 1) % tabs.length], true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectTab(tabs[(i + tabs.length - 1) % tabs.length], true); }
  });
});

/* ---------- Result display and history ---------- */
let lastText = '';
function show({ title, text, faces = [], meta }) {
  showError($('error'), null);
  $('result-title').textContent = title;
  $('out').textContent = text;
  $('out').removeAttribute('data-heads');
  $('out').removeAttribute('data-tails');
  $('faces').innerHTML = '';
  faces.forEach((f) => {
    const s = document.createElement('span');
    s.className = 'rs-face';
    s.textContent = f;
    $('faces').appendChild(s);
  });
  $('meta').textContent = `${meta} · ${new Date().toLocaleTimeString('en-US')}`;
  $('copy-status').textContent = '';
  $('result').classList.add('is-active');
  lastText = text;
  const li = document.createElement('li');
  li.textContent = `${title}: ${text.length > 160 ? text.slice(0, 160) + '…' : text}`;
  $('history').prepend(li);
  while ($('history').children.length > 50) $('history').lastChild.remove();
}
function fail(err) {
  $('result').classList.remove('is-active');
  showError($('error'), err.message);
}

/* ---------- Numbers ---------- */
$('n-go').addEventListener('click', () => {
  try {
    if ($('n-min').value === '' || $('n-max').value === '') throw new Error('Enter both the lowest and the highest number, for example 1 and 100.');
    const min = Number($('n-min').value), max = Number($('n-max').value);
    const count = Number($('n-count').value || 1);
    const unique = $('n-unique').checked;
    const nums = generateNumbers({ min, max, count, unique, order: $('n-order').value });
    show({ title: 'Random number', text: nums.join(', '), meta: `Range ${min}–${max} · ${count} number${count > 1 ? 's' : ''}${unique ? ' · no repeats' : ''}` });
  } catch (e) { fail(e); }
});

/* ---------- Dice ---------- */
$('d-go').addEventListener('click', () => {
  try {
    const sides = Number($('d-type').value);
    const n = Number($('d-count').value);
    if (!Number.isInteger(n) || n < 1 || n > 6) throw new Error('The number of dice must be between 1 and 6. Type a number from 1 to 6.');
    const rolls = Array.from({ length: n }, () => 1 + randomInt(sides));
    const total = rolls.reduce((a, b) => a + b, 0);
    show({
      title: n > 1 ? `${n} × d${sides}` : `d${sides}`,
      text: n > 1 ? `${rolls.join(' + ')} = ${total}` : String(rolls[0]),
      faces: rolls,
      meta: `d${sides} · ${n} di${n > 1 ? 'ce' : 'e'}${n > 1 ? ` · total ${total}` : ''}`,
    });
  } catch (e) { fail(e); }
});

/* ---------- Coin flip ---------- */
$('c-go').addEventListener('click', () => {
  try {
    const n = Number($('c-count').value);
    if (!Number.isInteger(n) || n < 1) throw new Error('The number of flips must be at least 1. Type a whole number.');
    if (n > 10000) throw new Error('You can flip at most 10,000 times at once. Lower the number.');
    let heads = 0;
    const seq = [];
    for (let i = 0; i < n; i++) {
      const h = randomInt(2) === 0;
      if (h) heads++;
      if (i < 20) seq.push(h ? 'H' : 'T');
    }
    const tails = n - heads;
    const pct = (v) => (v * 100 / n).toFixed(1);
    if (n === 1) {
      show({ title: 'Coin flip', text: heads ? 'Heads' : 'Tails', meta: '1 flip' });
    } else {
      show({
        title: `${n} flips`,
        text: `Heads: ${heads} · Tails: ${tails}`,
        meta: `${n} flips in total · Heads ${pct(heads)}% · Tails ${pct(tails)}%${n <= 20 ? ' · sequence: ' + seq.join(' ') : ''}`,
      });
    }
    $('out').dataset.heads = String(heads);
    $('out').dataset.tails = String(tails);
  } catch (e) { fail(e); }
});

/* ---------- Pick from a list ---------- */
$('l-go').addEventListener('click', () => {
  try {
    const items = $('l-text').value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!items.length) throw new Error('The list is empty. Put one option on each line, for example Pizza, Tacos and Sushi on separate lines.');
    const count = Number($('l-count').value || 1);
    if (!Number.isInteger(count) || count < 1) throw new Error('The number of picks must be at least 1.');
    if (count > 1000) throw new Error('You can make at most 1,000 picks at a time.');
    const unique = $('l-unique').checked;
    if (unique && count > items.length) throw new Error(`Your list has ${items.length} line${items.length > 1 ? 's' : ''}, so ${count} different options cannot be picked. Lower the count, add lines or untick "No repeats".`);
    const picked = unique ? sampleUnique(items, count) : Array.from({ length: count }, () => items[randomInt(items.length)]);
    show({ title: 'Pick from list', text: picked.join(', '), meta: `${items.length} option${items.length > 1 ? 's' : ''} · ${count} pick${count > 1 ? 's' : ''}` });
  } catch (e) { fail(e); }
});

/* ---------- Copy / history ---------- */
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(lastText); st.textContent = ' Copied.'; }
  catch { st.textContent = ' The browser could not access the clipboard; select the result and copy it manually.'; }
  setTimeout(() => { st.textContent = ''; }, 4000);
});
$('hist-clear').addEventListener('click', () => { $('history').innerHTML = ''; });
