// Emeklilik Yaşı Hesaplama (EYT dahil) — tamamı tarayıcıda çalışır; tarihler ve prim bilgisi sunucuya gitmez.
// Sonuç tahmindir; "e-Devlet SGK hizmet dökümü esastır".
import { showError } from '../assets/js/ba.js';
import { DEFAULTS, computeRetirement, parseISO, todayLocal } from './hesap.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const spanTR = (s) => [s.years ? `${s.years} yıl` : '', s.months ? `${s.months} ay` : '', s.days ? `${s.days} gün` : ''].filter(Boolean).join(' ') || '0 gün';

let params = DEFAULTS;
let last = null;

const GROUP_LABEL = {
  eyt: 'EYT: 8 Eylül 1999 ve öncesi ilk giriş (yaş şartı yok)',
  ara: '9 Eylül 1999 - 30 Nisan 2008 arası ilk giriş',
  yeni: '1 Mayıs 2008 ve sonrası ilk giriş',
};

/** parametreler.json'u yükler; olmazsa varsayılanlar kullanılır. */
async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url), { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı önbellek: varsayılanlar */ }
  $('params-info').textContent = `Parametreler ${dateTR(parseISO(params.guncelleme))} tarihinde güncellendi. Kaynak: ${params.kaynak}`;
}

function readInput() {
  const primTxt = $('prim').value.trim().replace(/\./g, '').replace(/\s/g, '');
  let primDays = null;
  if (primTxt !== '') primDays = /^\d+$/.test(primTxt) ? Number(primTxt) : NaN;
  const refTxt = $('ref').value;
  const today = refTxt ? parseISO(refTxt) : todayLocal();
  if (refTxt && !today) throw new Error('Hesaplama tarihi geçersiz. Tarihi takvimden yeniden seçin ya da alanı boş bırakıp bugünü kullanın.');
  return {
    status: $('status').value,
    gender: $('gender').value,
    birth: parseISO($('birth').value),
    entry: parseISO($('entry').value),
    primDays: Number.isNaN(primDays) ? -1 : primDays,
    today,
  };
}

function render(r) {
  const st = params.statuler[r.status];
  $('r-head').textContent = r.done
    ? 'Hesaba göre emeklilik şartlarını tamamlamış görünüyorsunuz'
    : `Tahmini emeklilik tarihi: ${dateTR(r.retire)}`;
  $('r-group').textContent = `${st.ad} · ${GROUP_LABEL[r.group]}`;
  $('r-age').textContent = r.ageReq ? `${r.ageReq} yaş` : 'Aranmaz';
  $('r-sig').textContent = r.yearsNeed ? `${r.yearsNeed} yıl (${r.group === 'eyt' ? 'dolacağı tarih: ' : 'en erken: '}${dateTR(r.sigDate)})` : 'Ayrıca aranmaz';
  if (r.primNeed) {
    const rem = r.primRemaining === null ? 'prim günü girilmedi' : r.primRemaining === 0 ? 'tamamlanmış' : `eksik: ${nf.format(r.primRemaining)} gün`;
    $('r-prim').textContent = `${nf.format(r.primNeed)} gün (${rem})`;
  } else {
    $('r-prim').textContent = 'Hizmet yılı esas alınır';
  }
  $('r-agedate').textContent = r.ageDate ? dateTR(r.ageDate) : 'Yaş şartı yok';
  $('r-primdate').textContent = r.primDate ? (r.primDone ? 'Tamamlanmış' : `${dateTR(r.primDate)} (tahmini)`) : 'Hesaplanamadı';
  $('r-retire').textContent = dateTR(r.retire);
  $('r-remaining').textContent = r.done ? 'Şartlar doldu' : spanTR(r.remaining);
  $('r-current').textContent = `${r.currentAge.years} yıl ${r.currentAge.months} ay`;
  const notes = [...r.notes, 'Bu sonuç bilgilendirme amaçlı bir tahmindir. Kesin hak ediş tarihi için e-Devlet SGK hizmet dökümü ve SGK esastır; borçlanma, askerlik, doğum ve yurt dışı süreleri bu hesaba dahil değildir.'];
  $('r-notes').innerHTML = '';
  for (const n of notes) { const li = document.createElement('li'); li.textContent = n; $('r-notes').append(li); }
  $('result').hidden = false;
  $('result').classList.add('is-active');
}

function summaryText(r) {
  return `Emeklilik tahmini (${params.statuler[r.status].ad}): ${r.done ? 'şartlar tamamlanmış görünüyor' : dateTR(r.retire)}. Yaş şartı: ${r.ageReq ? r.ageReq : 'yok'}. SGK hizmet dökümü esastır.`;
}

function run() {
  showError($('error'), '');
  try {
    const inp = readInput();
    if (inp.primDays === -1) throw new Error('Prim gün sayısı geçersiz. Yalnızca rakam yazın (örnek: 4.500) ya da alanı boş bırakın.');
    last = computeRetirement(inp, params);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true;
    $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  $('result').hidden = true; $('result').classList.remove('is-active');
  last = null; showError($('error'), ''); $('status').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
loadParams();
