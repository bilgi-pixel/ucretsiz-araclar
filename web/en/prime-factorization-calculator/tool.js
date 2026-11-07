// Prime Factorization Calculator: runs entirely in your browser; numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { parseInteger, analyze, factorString, primesInRange } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US');
const show = (el) => { el.hidden = false; el.classList.add('is-active'); };
const hide = (el) => { el.hidden = true; el.classList.remove('is-active'); };

let last = null;

function render(a) {
  $('r-big').textContent = a.n === 1 ? '1 is not prime (it is neither prime nor composite).' : a.prime ? `${nf.format(a.n)} is a prime number.` : `${nf.format(a.n)} is not prime (it is a composite number).`;
  $('r-factors').textContent = a.n === 1 ? '1 (no prime factors)' : a.prime ? `${nf.format(a.n)} (itself)` : factorString(a.factors.map(([p, e]) => [nf.format(p), e]));
  $('r-count').textContent = nf.format(a.divisorCount);
  $('r-sum').textContent = nf.format(BigInt(a.divisorSum));
  $('r-phi').textContent = nf.format(a.phi);
  $('r-prev').textContent = a.prev === null ? 'none' : nf.format(a.prev);
  $('r-next').textContent = nf.format(a.next);
  if (a.divisors) {
    $('r-divs').textContent = a.divisors.map((d) => nf.format(d)).join(', ');
  } else {
    $('r-divs').textContent = `Too many divisors to list (${nf.format(a.divisorCount)}). The prime factorization above is still complete.`;
  }
  show($('result'));
}

function summary(a) {
  return `${nf.format(a.n)}: ${a.prime ? 'prime' : 'not prime'}; prime factors: ${$('r-factors').textContent}; number of divisors: ${nf.format(a.divisorCount)}.`;
}

function run() {
  showError($('error'), '');
  try {
    last = analyze(parseInteger($('n').value));
    render(last);
  } catch (e) {
    last = null; hide($('result')); showError($('error'), e.message);
  }
}

function runRange() {
  showError($('range-error'), '');
  try {
    const a = parseInteger($('from').value || '1');
    const b = parseInteger($('to').value);
    if (b > 1000000) throw new Error('The upper limit can be at most 1,000,000. For wider ranges, split the range into smaller parts.');
    if (a > b) throw new Error('The start is larger than the end. Swap the two values and try again.');
    const list = primesInRange(Math.max(a, 2), b);
    $('range-count').textContent = `There ${list.length === 1 ? 'is' : 'are'} ${nf.format(list.length)} prime ${list.length === 1 ? 'number' : 'numbers'} between ${nf.format(a)} and ${nf.format(b)}.`;
    const LIMIT = 2000;
    $('range-list').textContent = list.length === 0 ? 'There are no primes in this range.' : list.slice(0, LIMIT).join(', ') + (list.length > LIMIT ? ` … (showing the first ${nf.format(LIMIT)} primes)` : '');
    show($('range-result'));
  } catch (e) {
    hide($('range-result')); showError($('range-error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('range-form').addEventListener('submit', (e) => { e.preventDefault(); runRange(); });
$('clear').addEventListener('click', () => { $('n').value = ''; hide($('result')); last = null; showError($('error'), ''); $('n').focus(); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summary(last)); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
