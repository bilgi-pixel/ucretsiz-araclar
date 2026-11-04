// Okula Başlama Yaşı Hesaplama — tamamı tarayıcıda çalışır; doğum tarihi sunucuya gitmez.
// MEB bilgilendirme tablosundaki ay eşikleri parametreler.json içindedir; MEB'in güncel duyurusu esastır.
import { showError } from '../assets/js/ba.js';
import { DEFAULTS, computeSchoolAge, parseISO, todayLocal } from './hesap.js';

const $ = (id) => document.getElementById(id);
let params = DEFAULTS;
let last = null;

const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url), { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar */ }
  $('params-info').textContent = `Parametreler ${dateTR(parseISO(params.guncelleme))} tarihinde güncellendi. Kaynak: ${params.kaynak}`;
}

const BADGE = { zorunlu: 'ok', ertelenebilir: 'warn', istege: 'warn', anaokulu5: 'info', anaokulu4: 'info', anaokulu3: 'info', kucuk: 'muted', dogmamis: 'muted' };

function render(r) {
  const cards = $('years');
  cards.innerHTML = '';
  for (const row of r.rows) {
    const art = document.createElement('article');
    art.className = `ob-card ob-${BADGE[row.kod] || 'info'}`;
    const h = document.createElement('h4');
    h.textContent = `${row.year.ad} eğitim öğretim yılı`;
    const sub = document.createElement('p');
    sub.className = 'ob-sub';
    sub.textContent = row.months === null
      ? `Referans: ${dateTR(row.ref)}`
      : `${dateTR(row.ref)} itibarıyla ${row.months} ay (${row.exact.years} yıl ${row.exact.months} ay ${row.exact.days} gün)`;
    sub.dataset.months = row.months === null ? '' : String(row.months);
    const st = document.createElement('p');
    st.className = 'ob-status';
    st.textContent = row.baslik;
    const tx = document.createElement('p');
    tx.textContent = row.metin + (row.year.kesin === false && row.months !== null ? ' (Bu yıl için MEB duyurusu henüz yayımlanmadıysa eşikler bir önceki yıla göre varsayılmıştır.)' : '');
    art.append(h, sub, st, tx);
    cards.append(art);
  }
  $('r-head').textContent = r.firstSchool
    ? `İlkokul 1. sınıf için ilk uygun yıl: ${r.firstSchool.year.ad} (${r.firstSchool.baslik.toLowerCase()})`
    : 'Gösterilen yıllarda ilkokul kaydı yok; anaokulu durumuna bakın';
  $('r-now').textContent = r.nowAge ? `${r.nowAge.years} yıl ${r.nowAge.months} ay ${r.nowAge.days} gün (${r.nowAge.totalMonths} ay)` : 'Henüz doğmadı';
  $('result').hidden = false;
  $('result').classList.add('is-active');
  last = r.rows.map((x) => `${x.year.ad}: ${x.months === null ? 'henüz yaşta değil' : `${x.months} ay`} - ${x.baslik}`).join('\n') + '\n(MEB duyurusu esastır.)';
}

function run() {
  showError($('error'), '');
  $('copy-status').textContent = '';
  try {
    const birth = parseISO($('birth').value);
    render(computeSchoolAge(birth, todayLocal(), params));
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset();
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); $('copy-status').textContent = ''; last = null; $('birth').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  try { await navigator.clipboard.writeText(last); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
loadParams();
