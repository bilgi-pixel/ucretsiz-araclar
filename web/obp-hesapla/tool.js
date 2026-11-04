// OBP Hesaplama — tamamı tarayıcıda çalışır; notunuz sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => nf2.format(n) + ' TL';

/** Türkçe ondalık (virgül) ve binlik (nokta) biçimlerini sayıya çevirir; geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '').replace(/₺|TL|tl/g, '');
  const neg = t.startsWith('-');
  if (neg) t = t.slice(1);
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  const hasC = t.includes(','), hasD = t.includes('.');
  if (hasC && hasD) t = t.replace(/\./g, '').replace(',', '.');
  else if (hasC) t = t.replace(',', '.');
  else if (hasD && /^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  if ((t.match(/\./g) || []).length > 1) return NaN;
  return neg ? -Number(t) : Number(t);
}
/** Boş alan 0 sayılır (isteğe bağlı alanlar); geçersizse NaN. */
export function parseOpt(s) { return String(s ?? '').trim() === '' ? 0 : parseNum(s); }
function showResult(el) { el.hidden = false; el.classList.add('is-active'); }
function hideResult(el) { el.hidden = true; el.classList.remove('is-active'); }
function fail(msg) { hideResult($('result')); showError($('error'), msg); }
async function loadParams(defaults, lineEl) {
  let p = defaults;
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) p = { ...defaults, ...(await res.json()) };
  } catch (e) { /* çevrimdışı önbellekte olmayabilir; varsayılanlar kullanılır */ }
  if (lineEl) {
    const d = new Date(p.guncelleme);
    const txt = Number.isNaN(d.getTime()) ? p.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    lineEl.textContent = 'Parametreler ' + txt + ' tarihinde güncellendi. Kaynak: ' + p.kaynak;
  }
  return p;
}

let P = { obp_carpan: 5, katki_katsayi: 0.12, onceki_yerlesen_katsayi: 0.06, min_not: 50, max_not: 100, guncelleme: '2026-11-04', kaynak: 'ÖSYM YKS kılavuzu' };
loadParams(P, $('params-line')).then((p) => { P = p; });

/** Saf hesap: OBP = not x 5; YKS katkısı = OBP x katsayı. */
export function calcObp(grade, prevPlaced, P0 = P) {
  const obp = grade * P0.obp_carpan;
  const k = prevPlaced ? P0.onceki_yerlesen_katsayi : P0.katki_katsayi;
  return { obp, k, contrib: obp * k, maxContrib: P0.max_not * P0.obp_carpan * k };
}

function run() {
  showError($('error'), '');
  const grade = parseNum($('grade').value);
  if (Number.isNaN(grade)) return fail('Diploma notu okunamadı. Rakam ve virgül kullanın (örnek: 84,37).');
  if (grade < P.min_not || grade > P.max_not) {
    return fail('Diploma notu ' + P.min_not + ' ile ' + P.max_not + ' arasında olmalıdır. 100\'lük sistemdeki mezuniyet notunuzu girin; okulunuz 5\'lik sistemdeyse 100\'lük karşılığını okulunuzdan öğrenin.');
  }
  const r = calcObp(grade, $('prev').checked);
  $('r-obp').textContent = nf.format(Math.round(r.obp * 100) / 100) + ' puan';
  $('r-coef').textContent = nf.format(r.k);
  $('r-contrib').textContent = nf.format(Math.round(r.contrib * 100) / 100) + ' puan';
  $('r-max').textContent = nf.format(r.maxContrib) + ' puan';
  showResult($('result'));
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); hideResult($('result')); showError($('error'), ''); $('grade').focus();
});
