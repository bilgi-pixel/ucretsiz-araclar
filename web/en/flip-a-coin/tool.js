// Flip a Coin (EN) — fair random flips from the browser's crypto API; nothing leaves the device.
const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const history = [];
let heads = 0;
let tails = 0;
let streakSide = null;
let streak = 0;
let busy = false;

/** Fair coin: returns true for heads, false for tails. */
export function flipOnce() {
  const buf = new Uint8Array(1);
  crypto.getRandomValues(buf);
  return (buf[0] & 1) === 1;
}

function coinEl(isHeads) {
  const c = document.createElement('div');
  c.className = 'fc-coin ' + (isHeads ? 'is-heads' : 'is-tails');
  c.setAttribute('role', 'img');
  c.setAttribute('aria-label', isHeads ? 'Heads' : 'Tails');
  const s = document.createElement('span');
  s.textContent = isHeads ? 'H' : 'T';
  c.append(s);
  return c;
}

function flip() {
  if (busy) return;
  busy = true;
  const count = Number($('coin-count').value);
  const results = Array.from({ length: count }, () => flipOnce());
  const area = $('coin-area');
  area.textContent = '';
  const coins = results.map((r) => { const c = coinEl(r); area.append(c); return c; });
  if (!reduceMotion) coins.forEach((c) => c.classList.add('fc-spin'));
  const finish = () => {
    const h = results.filter(Boolean).length;
    const t = count - h;
    heads += h; tails += t;
    results.forEach((r) => {
      const side = r ? 'Heads' : 'Tails';
      if (side === streakSide) streak += 1; else { streakSide = side; streak = 1; }
    });
    const word = count === 1 ? (results[0] ? 'Heads' : 'Tails') : `${h} heads, ${t} tails`;
    $('result-text').textContent = word;
    $('announce').textContent = count === 1 ? `The coin landed on ${word.toLowerCase()}.` : `${count} coins landed: ${word}.`;
    $('count-heads').textContent = String(heads);
    $('count-tails').textContent = String(tails);
    $('count-total').textContent = String(heads + tails);
    $('count-streak').textContent = streak > 1 ? `${streak} ${streakSide.toLowerCase()} in a row` : '–';
    history.unshift(count === 1 ? word : `${count} coins: ${h}H ${t}T`);
    history.length = Math.min(history.length, 20);
    const ul = $('history');
    ul.textContent = '';
    history.forEach((x) => { const li = document.createElement('li'); li.textContent = x; ul.append(li); });
    $('history-wrap').hidden = false;
    busy = false;
  };
  if (reduceMotion) finish(); else setTimeout(finish, 700);
}

$('flip').addEventListener('click', flip);
$('reset').addEventListener('click', () => {
  history.length = 0; heads = 0; tails = 0; streak = 0; streakSide = null;
  $('history').textContent = ''; $('history-wrap').hidden = true; $('coin-area').textContent = '';
  $('result-text').textContent = 'Ready'; $('count-heads').textContent = '0'; $('count-tails').textContent = '0';
  $('count-total').textContent = '0'; $('count-streak').textContent = '–'; $('announce').textContent = 'Counts cleared.';
});
