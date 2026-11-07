// Asal Sayı ve Asal Çarpan Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz sayılar sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseInteger, analyze, factorString, primesInRange } from './core.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const show = (el) => { el.hidden = false; el.classList.add('is-active'); };
const hide = (el) => { el.hidden = true; el.classList.remove('is-active'); };

let last = null;

function render(a) {
  $('r-big').textContent = a.n === 1 ? '1 asal sayı değildir (asal da bileşik de sayılmaz).' : a.prime ? `${nf.format(a.n)} bir asal sayıdır.` : `${nf.format(a.n)} asal sayı değildir (bileşik sayı).`;
  $('r-factors').textContent = a.n === 1 ? '1 (asal çarpanı yok)' : a.prime ? `${nf.format(a.n)} (kendisi)` : factorString(a.factors.map(([p, e]) => [nf.format(p), e]));
  $('r-count').textContent = nf.format(a.divisorCount);
  $('r-sum').textContent = nf.format(BigInt(a.divisorSum));
  $('r-phi').textContent = nf.format(a.phi);
  $('r-prev').textContent = a.prev === null ? 'yok' : nf.format(a.prev);
  $('r-next').textContent = nf.format(a.next);
  if (a.divisors) {
    $('r-divs').textContent = a.divisors.map((d) => nf.format(d)).join(', ');
  } else {
    $('r-divs').textContent = `Bölen sayısı çok fazla (${nf.format(a.divisorCount)}); liste gösterilmiyor. Asal çarpan biçimi yukarıdadır.`;
  }
  show($('result'));
}

function summary(a) {
  return `${nf.format(a.n)}: ${a.prime ? 'asal sayı' : 'asal değil'}; asal çarpanlar: ${$('r-factors').textContent}; bölen sayısı: ${nf.format(a.divisorCount)}.`;
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
    if (b > 1000000) throw new Error('Üst sınır en fazla 1.000.000 olabilir. Daha geniş aralıklar için aralığı parçalara bölün.');
    if (a > b) throw new Error('Başlangıç, bitişten büyük olamaz. İki değeri yer değiştirip tekrar deneyin.');
    const list = primesInRange(Math.max(a, 2), b);
    $('range-count').textContent = `${nf.format(a)} – ${nf.format(b)} aralığında ${nf.format(list.length)} asal sayı var.`;
    const LIMIT = 2000;
    $('range-list').textContent = list.length === 0 ? 'Bu aralıkta asal sayı yok.' : list.slice(0, LIMIT).join(', ') + (list.length > LIMIT ? ` … (ilk ${nf.format(LIMIT)} asal gösterildi)` : '');
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
  try { await navigator.clipboard.writeText(summary(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
