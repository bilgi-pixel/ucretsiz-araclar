// Yaş Hesaplama — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Tüm hesap "takvim gün numarası" üzerinden yapılır (saat/saat dilimi kullanılmaz), böylece UTC kayması olmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; // m: 1-12
/** Gün numarası: UTC gece yarısı / 86400000 — saat dilimi ve yaz saatinden etkilenmez. */
const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null (30 Şubat gibi tarihler dahil). */
export function parseISO(s) {
  const mt = /^(\d{4,6})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

/** Yerel (cihaz) bugünün tarihi. */
export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** Başlangıçtan bitişe yıl/ay/gün; a <= b olmalı. Ay sonu taşmalarında yıldönümü ayın son gününe sabitlenir. */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => {
    const total = a.m - 1 + n;
    const y = a.y + Math.floor(total / 12), m = (total % 12 + 12) % 12 + 1;
    return { y, m, d: Math.min(a.d, daysInMonth(y, m)) };
  };
  let an = anniv(months);
  if (dayNumber(an.y, an.m, an.d) > dayNumber(b.y, b.m, b.d)) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, totalMonths: months, days: dayNumber(b.y, b.m, b.d) - dayNumber(an.y, an.m, an.d) };
}

/** Sonraki doğum günü (bugün dahil); 29 Şubat artık olmayan yılda 28 Şubat sayılır. */
export function nextBirthday(birth, ref) {
  const at = (y) => ({ y, m: birth.m, d: Math.min(birth.d, daysInMonth(y, birth.m)) });
  let n = at(ref.y);
  if (dayNumber(n.y, n.m, n.d) < dayNumber(ref.y, ref.m, ref.d)) n = at(ref.y + 1);
  return { date: n, days: dayNumber(n.y, n.m, n.d) - dayNumber(ref.y, ref.m, ref.d) };
}

// Ay -> [geçiş günü, geçiş öncesi burç, geçiş sonrası burç]
const ZODIAC = {
  1: [20, 'Oğlak', 'Kova'], 2: [19, 'Kova', 'Balık'], 3: [21, 'Balık', 'Koç'], 4: [20, 'Koç', 'Boğa'],
  5: [21, 'Boğa', 'İkizler'], 6: [21, 'İkizler', 'Yengeç'], 7: [23, 'Yengeç', 'Aslan'], 8: [23, 'Aslan', 'Başak'],
  9: [23, 'Başak', 'Terazi'], 10: [23, 'Terazi', 'Akrep'], 11: [22, 'Akrep', 'Yay'], 12: [22, 'Yay', 'Oğlak'],
};
/** Güneş burcu (eğlence amaçlı, geleneksel tarih aralıkları). */
export function zodiac(m, d) {
  const [cut, before, after] = ZODIAC[m];
  return d < cut ? before : after;
}

const weekdayName = (y, m, d) => new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('tr-TR', { weekday: 'long', timeZone: 'UTC' });
const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır. */
export function computeAge(birthStr, refStr) {
  const birth = parseISO(birthStr);
  if (!birth) throw new Error('Doğum tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 15.03.1990).');
  if (birth.y < 1900) throw new Error('Doğum tarihi 1900 yılından önce olamaz. Yılı kontrol edip tekrar seçin.');
  const ref = refStr ? parseISO(refStr) : todayLocal();
  if (!ref) throw new Error('Hesaplanacak tarih geçersiz. Tarihi takvimden yeniden seçin ya da alanı boş bırakıp bugünü kullanın.');
  if (ref.y > 9999 || birth.y > 9999) throw new Error('Yıl 4 haneli olmalıdır (örn. 1990). Tarihi yeniden seçin.');
  const bn = dayNumber(birth.y, birth.m, birth.d), rn = dayNumber(ref.y, ref.m, ref.d);
  if (bn > rn) throw new Error('Doğum tarihi hesaplanacak tarihten sonra olamaz. Doğum tarihini ya da hesaplanacak tarihi düzeltin.');
  const age = diffYMD(birth, ref);
  const totalDays = rn - bn;
  const next = nextBirthday(birth, ref);
  return {
    birth, ref, age, totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    next,
    weekday: weekdayName(birth.y, birth.m, birth.d),
    zodiac: zodiac(birth.m, birth.d),
    usedToday: !refStr,
  };
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('r-age').textContent = `${r.age.years} yıl, ${r.age.months} ay, ${r.age.days} gün`;
  $('r-years').textContent = `${r.age.years} yaş`;
  $('r-months').textContent = `${nf.format(r.age.totalMonths)} ay`;
  $('r-weeks').textContent = `${nf.format(r.totalWeeks)} hafta`;
  $('r-days').textContent = `${nf.format(r.totalDays)} gün`;
  $('r-hours').textContent = `${nf.format(r.totalHours)} saat`;
  $('r-next').textContent = r.next.days === 0
    ? 'Bugün doğum günü!'
    : `${nf.format(r.next.days)} gün kaldı (${dateTR(r.next.date)}, ${weekdayName(r.next.date.y, r.next.date.m, r.next.date.d)})`;
  $('r-weekday').textContent = r.weekday;
  $('r-zodiac').textContent = r.zodiac;
  const leapNote = r.birth.m === 2 && r.birth.d === 29 ? ' 29 Şubat doğumlu olduğunuz için artık olmayan yıllarda yıldönümü 28 Şubat kabul edilir.' : '';
  $('r-note').textContent = `Hesaplanan tarih: ${dateTR(r.ref)}${r.usedToday ? ' (bugün)' : ''}. Burç yalnızca eğlence amaçlıdır.${leapNote}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  return `Yaş: ${r.age.years} yıl, ${r.age.months} ay, ${r.age.days} gün (${nf.format(r.totalDays)} gün). Sonraki doğum gününe: ${r.next.days} gün. Doğduğu gün: ${r.weekday}.`;
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeAge($('birth').value, $('ref').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('birth').value = ''; $('ref').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('birth').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
