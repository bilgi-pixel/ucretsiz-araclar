// Burç Hesaplama — tamamı tarayıcıda çalışır; doğum bilgileri sunucuya gitmez. Eğlence amaçlıdır.
import { showError } from '../assets/js/ba.js';
import { SIGNS, ELEMENTS, TRAITS, CITIES_TR, CITIES_WORLD, sunSign, ascendantSign, chineseSign, compat, turkeyOffset } from './hesap.js';

const $ = (id) => document.getElementById(id);

/* ---------- Şehir listesini doldur ---------- */
(function fillCities() {
  const sel = $('place');
  const g1 = document.createElement('optgroup'); g1.label = 'Türkiye (81 il)';
  CITIES_TR.forEach((c, i) => { const o = document.createElement('option'); o.value = 'tr:' + i; o.textContent = c[0]; g1.appendChild(o); });
  const g2 = document.createElement('optgroup'); g2.label = 'Yurt dışı (başkent ve büyük şehirler)';
  CITIES_WORLD.forEach((c, i) => { const o = document.createElement('option'); o.value = 'w:' + i; o.textContent = c[0]; g2.appendChild(o); });
  sel.append(g1, g2);
})();

const dayNames = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const daysIn = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();

/** "7", "+3,5", "-5" gibi UTC farkını sayıya çevirir; geçersizse NaN. */
function parseOffset(s) {
  const t = String(s).trim().replace(',', '.').replace(/^\+/, '');
  if (t === '') return null;
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Tüm girdileri doğrular ve sonucu hesaplar; hata varsa çözüm öneren Türkçe Error fırlatır. */
export function compute(input) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.birth || '');
  if (!mt) throw new Error('Doğum tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 15.08.1990).');
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysIn(y, m)) throw new Error('Bu tarih takvimde yok (örneğin 30 Şubat). Tarihi takvimden yeniden seçin.');
  if (y < 1900 || y > new Date().getFullYear()) throw new Error('Doğum yılı 1900 ile bu yıl arasında olmalıdır. Yılı kontrol edip yeniden girin.');

  const res = { y, m, d, sun: sunSign(m, d), cn: chineseSign(y, m, d), asc: null, ascNote: '' };

  const hasTime = !!input.time, hasPlace = !!input.place;
  if (hasTime && !hasPlace) throw new Error('Yükselen burç için doğum yeri gerekir. Listeden şehri seçin; yalnızca güneş burcunu istiyorsanız saati boş bırakın.');
  if (hasTime && hasPlace) {
    const tm = /^(\d{2}):(\d{2})$/.exec(input.time);
    if (!tm || +tm[1] > 23 || +tm[2] > 59) throw new Error('Doğum saati geçersiz. Saati 24 saatlik biçimde (örn. 14:30) girin.');
    const [kind, idx] = input.place.split(':');
    const city = kind === 'tr' ? CITIES_TR[+idx] : CITIES_WORLD[+idx];
    if (!city) throw new Error('Doğum yeri bulunamadı. Listeden bir şehir seçin.');
    let off = parseOffset(input.offset);
    if (Number.isNaN(off) || (off !== null && (off < -12 || off > 14))) throw new Error('UTC farkı geçersiz. -12 ile +14 arasında bir sayı yazın (Türkiye için +3) ya da alanı boş bırakın.');
    const auto = off === null;
    if (auto) off = kind === 'tr' ? turkeyOffset(y, m, d) : city[3];
    const a = ascendantSign(y, m, d, +tm[1], +tm[2], off, city[1], city[2]);
    res.asc = a;
    res.city = city[0];
    res.offset = off;
    res.ascNote = `${city[0]}, UTC${off >= 0 ? '+' : ''}${String(off).replace('.', ',')}${auto ? ' (otomatik, yaklaşık)' : ''}`;
  }
  return res;
}

/* ---------- Arayüz ---------- */
const dateText = (r) => `${r.d} ${dayNames[r.m]} ${r.y}`;

function render(r) {
  const s = r.sun;
  $('r-sun').textContent = s.sign;
  $('r-sun-note').textContent = s.borderline
    ? `Doğum gününüz iki burç arasındaki geçiş gününe denk geliyor (${s.sign} / ${s.other}). Güneş burcunuzu kesinleştirmek için doğum saati ve yıl bazında geçiş anı gerekir.`
    : `${dateText(r)} tarihi geleneksel aralıklara göre ${s.sign} burcuna denk gelir.`;

  if (r.asc) {
    $('r-asc').textContent = `${r.asc.sign} (yaklaşık ${Math.floor(r.asc.degree)}°)`;
    $('r-asc-note').textContent = `${r.ascNote}. Saat veya yer yaklaşık ise ±1 burç hata payı vardır.` + (r.asc.nearEdge ? ' Derece burç sınırına yakın; komşu burç da olabilir.' : '');
  } else {
    $('r-asc').textContent = 'Hesaplanmadı';
    $('r-asc-note').textContent = 'Yükselen burç için doğum saatini ve doğum yerini girin.';
  }

  const c = r.cn;
  $('r-cn').textContent = `${c.element} ${c.animal}`;
  $('r-cn-note').textContent = `Çin takvimine göre ${c.year} yılı. ` + (c.newYear
    ? `Çin yeni yılı bu yıl yaklaşık ${c.newYear.d} ${dayNames[c.newYear.m]} tarihindedir. ` : '')
    + (c.uncertain ? 'Doğum tarihiniz Çin yeni yılına yakın ya da hesap sınırında olduğundan bir önceki yılın hayvanı da olabilir; kesin tarih için bir Çin takvimi tablosuna bakın.' : '');

  $('r-traits').textContent = `${s.sign}: ${TRAITS[s.sign]}`;
  $('r-traits-asc').textContent = r.asc ? `Yükselen ${r.asc.sign}: ${TRAITS[r.asc.sign]}` : '';
  $('r-traits-asc').hidden = !r.asc;

  const list = $('compat-list');
  list.textContent = '';
  const si = SIGNS.indexOf(s.sign);
  SIGNS.forEach((name, j) => {
    const cp = compat(si, j);
    const li = document.createElement('li');
    const b = document.createElement('strong'); b.textContent = `${name} (${ELEMENTS[j]}): `;
    li.append(b, document.createTextNode(`${cp.level}. ${cp.text}`));
    list.appendChild(li);
  });
  $('compat-title').textContent = `${s.sign} için burç uyumu (eğlence amaçlı)`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summary(r) {
  const parts = [`Güneş burcum: ${r.sun.sign}`];
  if (r.asc) parts.push(`yükselenim: ${r.asc.sign}`);
  parts.push(`Çin burcum: ${r.cn.element} ${r.cn.animal}`);
  return parts.join(', ') + '. (Eğlence amaçlı hesaplama: araclar.bilisimajans.com/burc-hesapla/)';
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute({ birth: $('birth').value, time: $('time').value, place: $('place').value, offset: $('offset').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  ['birth', 'time', 'offset'].forEach((id) => { $(id).value = ''; });
  $('place').value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('birth').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summary(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
// Paylaş düğmesi yalnızca tarayıcı destekliyorsa görünür (kullanıcı tıklayınca sistem paylaşım penceresi açılır).
if (navigator.share) {
  $('share').hidden = false;
  $('share').addEventListener('click', async () => {
    if (!last) return;
    try { await navigator.share({ text: summary(last) }); } catch { /* kullanıcı vazgeçti */ }
  });
}
