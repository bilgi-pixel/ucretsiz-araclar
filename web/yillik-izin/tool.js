// Yıllık İzin Hesaplama — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Hesap "takvim gün numarası" üzerinden yapılır (saat dilimi kayması olmaz).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');

// Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03',
  kademeler: [{ yil_max: 5, gun: 14 }, { yil_max: 15, gun: 20 }, { yil_max: null, gun: 26 }],
  kucuk_yas_max: 18, buyuk_yas_min: 50, yas_asgari_gun: 20, yer_alti_ek_gun: 4,
};
let params = DEFAULT_PARAMS;

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (t) => Math.round(Date.UTC(t.y, t.m - 1, t.d) / 86400000);

export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
const todayLocal = () => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() }; };
/** Yıldönümü; 29 Şubat artık olmayan yılda 28 Şubat sayılır. */
const anniversary = (start, n) => { const y = start.y + n; return { y, m: start.m, d: Math.min(start.d, daysInMonth(y, start.m)) }; };
const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
/** Verilen tarihteki tam yaş. */
function ageAt(birth, t) {
  let a = t.y - birth.y;
  const bd = { y: t.y, m: birth.m, d: Math.min(birth.d, daysInMonth(t.y, birth.m)) };
  if (dayNumber(bd) > dayNumber(t)) a--;
  return a;
}

/** n tam hizmet yılı için temel gün (md. 53): 1-5 yıl (5 dahil) 14, 5'ten fazla 15'ten az 20, 15 yıl (dahil) ve fazlası 26. */
export function baseDays(n, p = params) {
  for (const [i, k] of p.kademeler.entries()) if (k.yil_max === null || (i === 0 ? n <= k.yil_max : n < k.yil_max)) return k.gun;
  return p.kademeler[p.kademeler.length - 1].gun;
}

/** Ana hesap; hatada Türkçe, çözüm öneren Error fırlatır. */
export function computeLeave({ startStr, refStr, birthStr, underground, extra, used }, p = params) {
  const start = parseISO(startStr);
  if (!start) throw new Error('İşe giriş tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 01.03.2019).');
  if (start.y < 1950) throw new Error('İşe giriş tarihi 1950 yılından önce olamaz. Yılı kontrol edip yeniden seçin.');
  const ref = refStr ? parseISO(refStr) : todayLocal();
  if (!ref) throw new Error('Hesaplanacak tarih geçersiz. Tarihi takvimden yeniden seçin ya da alanı boş bırakıp bugünü kullanın.');
  if (dayNumber(start) > dayNumber(ref)) throw new Error('İşe giriş tarihi hesaplanacak tarihten sonra olamaz. İki tarihi kontrol edip düzeltin.');
  let birth = null;
  if (birthStr) {
    birth = parseISO(birthStr);
    if (!birth) throw new Error('Doğum tarihi geçersiz. Tarihi yeniden seçin ya da alanı boş bırakın.');
    if (dayNumber(birth) >= dayNumber(start)) throw new Error('Doğum tarihi işe giriş tarihinden önce olmalıdır. Doğum tarihini kontrol edin.');
  }
  if (!Number.isFinite(extra) || extra < 0 || extra > 60) throw new Error('Ek izin günü 0 ile 60 arasında olmalıdır. Toplu iş sözleşmenizdeki yıllık ek günü girin ya da 0 bırakın.');
  if (!Number.isFinite(used) || used < 0) throw new Error('Kullanılan izin günü 0 ya da daha büyük bir sayı olmalıdır. Alanı düzeltin ya da 0 bırakın.');

  const refNum = dayNumber(ref);
  let completed = 0;
  while (dayNumber(anniversary(start, completed + 1)) <= refNum) completed++;
  const rows = [];
  const build = (n) => {
    const date = anniversary(start, n);
    const base = baseDays(n, p);
    let days = base, note = '';
    if (birth) {
      const age = ageAt(birth, date);
      if ((age <= p.kucuk_yas_max || age >= p.buyuk_yas_min) && days < p.yas_asgari_gun) { days = p.yas_asgari_gun; note = `${age} yaş: en az ${p.yas_asgari_gun} gün kuralı`; }
    }
    if (underground) { days += p.yer_alti_ek_gun; note += (note ? '; ' : '') + `yer altı işi: +${p.yer_alti_ek_gun} gün`; }
    if (extra) { days += extra; note += (note ? '; ' : '') + `sözleşme: +${extra} gün`; }
    return { n, date, days, note };
  };
  for (let n = 1; n <= completed; n++) rows.push(build(n));
  const next = build(completed + 1);
  const total = rows.reduce((s, r) => s + r.days, 0);
  return { start, ref, birth, completed, rows, next, total, used, left: total - used, current: rows.length ? rows[rows.length - 1] : null, usedToday: !refStr };
}

/* ---------- Arayüz ---------- */
const clean = () => { $('result').hidden = true; $('result').classList.remove('is-active'); };

function render(r) {
  $('r-years').textContent = `${r.completed} tam yıl`;
  $('r-current').textContent = r.current ? `${r.current.days} gün (${r.current.n}. yıl)` : 'Henüz hak yok';
  $('r-total').textContent = `${nf.format(r.total)} gün`;
  $('r-used').textContent = `${nf.format(r.used)} gün`;
  $('r-left').textContent = `${nf.format(r.left)} gün`;
  $('r-next').textContent = `${dateTR(r.next.date)} (${r.next.days} gün)`;
  $('r-list').innerHTML = r.rows.length
    ? r.rows.map((x) => `<li><strong>${x.n}. yıl</strong> · ${dateTR(x.date)} · <strong>${x.days} gün</strong>${x.note ? ` <span class="kdv-note-inline">(${x.note})</span>` : ''}</li>`).join('')
    : '<li>Henüz bir yılı doldurmadınız; ilk izin hakkı yukarıdaki tarihte doğar.</li>';
  const warn = r.left < 0 ? ` Kullandığınız izin hak ettiğinizden ${nf.format(-r.left)} gün fazla; avans izin kullanmış olabilirsiniz.` : '';
  $('r-note').textContent = `Hesaplanan tarih: ${dateTR(r.ref)}${r.usedToday ? ' (bugün)' : ''}. Günler iş günüdür; izne rastlayan hafta tatili ve resmî tatiller izinden sayılmaz.${warn}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
async function run() {
  showError($('error'), '');
  await paramsReady;
  try {
    last = computeLeave({
      startStr: $('start').value, refStr: $('ref').value, birthStr: $('birth').value,
      underground: $('underground').checked, extra: Number($('extra').value || 0), used: Number($('used').value || 0),
    });
    render(last);
  } catch (e) { last = null; clean(); showError($('error'), e.message); }
}

function summaryText(r) {
  return `Yıllık izin: ${r.completed} tam yıl hizmet, toplam hak edilen ${r.total} gün, kullanılan ${r.used} gün, kalan ${r.left} gün. Sonraki hak ediş: ${dateTR(r.next.date)}.`;
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  for (const id of ['start', 'ref', 'birth']) $(id).value = '';
  $('extra').value = '0'; $('used').value = '0'; $('underground').checked = false;
  clean(); last = null; showError($('error'), ''); $('start').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const d = new Date(params.guncelleme);
  $('params-updated').textContent = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
const paramsReady = loadParams();
