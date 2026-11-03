// Kaç Gün Kaldı Sayacı — tamamı tarayıcıda çalışır; tarih ve ad hiçbir sunucuya gitmez.
// Paylaşım bağlantısı yalnızca adres çubuğundaki parametrelerdir (?tarih=…&ad=…); kimse bunları kaydetmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const DAY_MS = 86400000;
const nf = new Intl.NumberFormat('tr-TR');
const pad = (n) => String(n).padStart(2, '0');

const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNum = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / DAY_MS);

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null (30 Şubat dahil). */
function parseDate(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (y < 1900 || y > 2200 || m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
/** "HH:MM" → {h,i}; geçersizse null. */
function parseTime(s) {
  const mt = /^(\d{2}):(\d{2})$/.exec(s || '');
  if (!mt || +mt[1] > 23 || +mt[2] > 59) return null;
  return { h: +mt[1], i: +mt[2] };
}

let DATA = null;
let HOLIDAYS = new Set();
let target = null;   // { date: Date, name: string }
let timerId = 0;

/** Hedefin bugünden sonraki ilk tarihi ("YYYY-MM-DD") ve tahmini olup olmadığı. */
function nextOccurrence(h, now) {
  const todayN = dayNum(now.getFullYear(), now.getMonth() + 1, now.getDate());
  if (h.kural) {
    const [m, d] = h.kural.split('-').map(Number);
    let y = now.getFullYear();
    if (dayNum(y, m, d) < todayN) y++;
    return { tarih: `${y}-${pad(m)}-${pad(d)}`, yaklasik: false };
  }
  const list = (h.tarihler || []).filter((t) => { const p = parseDate(t.tarih); return p && dayNum(p.y, p.m, p.d) >= todayN; });
  return list[0] || null;
}

const longDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${DAYS[d.getDay()]}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** İki yerel tarih arasında iş günü sayısı: başlangıç günü dahil, bitiş günü hariç. */
function workdays(from, to, skipHolidays) {
  const a = dayNum(from.getFullYear(), from.getMonth() + 1, from.getDate());
  const b = dayNum(to.getFullYear(), to.getMonth() + 1, to.getDate());
  let n = 0;
  for (let d = a; d < b; d++) {
    const w = new Date(d * DAY_MS).getUTCDay();
    if (w === 0 || w === 6) continue;
    if (skipHolidays && HOLIDAYS.has(new Date(d * DAY_MS).toISOString().slice(0, 10))) continue;
    n++;
  }
  return n;
}

/** Sayacı bir kez çizer (her saniye çağrılır). */
function tick() {
  if (!target) return;
  const now = new Date();
  let ms = target.date.getTime() - now.getTime();
  const past = ms < 0;
  const abs = Math.abs(ms);
  const days = Math.floor(abs / DAY_MS);
  const hours = Math.floor((abs % DAY_MS) / 3600000);
  const mins = Math.floor((abs % 3600000) / 60000);
  const secs = Math.floor((abs % 60000) / 1000);
  $('c-days').textContent = nf.format(days);
  $('c-hours').textContent = pad(hours);
  $('c-min').textContent = pad(mins);
  $('c-sec').textContent = pad(secs);
  $('r-mode').textContent = past ? 'Ne kadar geçti' : 'Kalan süre';
  $('r-title').textContent = past ? `${target.name} üzerinden geçen süre` : `${target.name} için kalan süre`;
  $('r-target').textContent = longDate(target.date);
  $('r-hours-total').textContent = `${nf.format(Math.floor(abs / 3600000))} saat`;
  $('r-weeks').textContent = `${nf.format(Math.floor(days / 7))} hafta ${days % 7} gün`;
  const skip = $('skip-holidays').checked;
  const wdays = past ? workdays(target.date, now, skip) : workdays(now, target.date, skip);
  $('r-workdays').textContent = `${nf.format(wdays)} iş günü`;
  $('r-workdays-label').textContent = past ? 'Aradaki iş günü (hedef günü dahil, bugün hariç)' : 'İş günü (bugün dahil, hedef günü hariç)';
  const spanYear = Math.max(now.getFullYear(), target.date.getFullYear());
  const hasHolidayData = HOLIDAYS.size > 0 && spanYear <= 2027;
  $('r-note').textContent = skip && !hasHolidayData
    ? 'Not: Resmî tatil listesi yalnızca 2026-2027 yıllarını kapsar; sonraki yıllar için yalnızca hafta sonları çıkarılır.'
    : 'İş günü sayısı Pazartesi-Cuma günlerini sayar; arife yarım günleri ve idari izinler dikkate alınmaz.';
  $('result').hidden = false;
}

function startTimer() {
  clearInterval(timerId);
  tick();
  timerId = setInterval(tick, 1000);
}

/** Paylaşılabilir bağlantıyı oluşturur ve adres çubuğunu günceller. */
function shareUrl(dateStr, timeStr, name) {
  const u = new URL(location.href);
  u.search = '';
  u.searchParams.set('tarih', dateStr + (timeStr && timeStr !== '00:00' ? `T${timeStr}` : ''));
  if (name) u.searchParams.set('ad', name);
  return u.toString();
}

/** Girdi alanlarından hedefi kurar; hata varsa Türkçe mesaj gösterir ve false döner. */
function applyInputs(updateUrl) {
  const dateStr = $('tarih').value;
  const timeStr = $('saat').value || '00:00';
  if (!dateStr) {
    showError($('error'), 'Lütfen bir hedef tarih seçin. Gün, ay ve yılın üçünü de doldurun ya da yukarıdan hazır bir hedef seçin.');
    return false;
  }
  const d = parseDate(dateStr);
  if (!d) {
    showError($('error'), 'Tarih geçersiz. 30 Şubat gibi var olmayan günler ve 1900-2200 dışındaki yıllar kabul edilmez; takvimden yeniden seçin.');
    return false;
  }
  const t = parseTime(timeStr);
  if (!t) {
    showError($('error'), 'Saat geçersiz. Saati 14:30 gibi saat ve dakika olarak girin ya da alanı boş bırakıp 00:00 kullanın.');
    return false;
  }
  showError($('error'), '');
  const name = $('ad').value.trim().slice(0, 60) || 'Hedef tarih';
  target = { date: new Date(d.y, d.m - 1, d.d, t.h, t.i, 0), name };
  if (updateUrl) {
    history.replaceState(null, '', shareUrl(dateStr, timeStr, $('ad').value.trim().slice(0, 60)));
  }
  startTimer();
  return true;
}

function fillPreset(id) {
  const h = DATA.hedefler.find((x) => x.id === id);
  if (!h) return false;
  const occ = nextOccurrence(h, new Date());
  if (!occ) {
    showError($('error'), `${h.ad} için listede ileri bir tarih yok. Özel tarih alanına kesin tarihi yazın; resmî takvimi (ÖSYM, MEB, Diyanet) kontrol edin.`);
    return false;
  }
  $('tarih').value = occ.tarih;
  $('saat').value = '00:00';
  $('ad').value = h.ad.replace(/ \(tahmini\)$/, '');
  $('approx').hidden = !(occ.yaklasik || h.yaklasik);
  return true;
}

/** Sayfadaki sabit bölümlerde ("yılbaşına kaç gün kaldı" vb.) canlı gün sayısını doldurur. */
function fillStaticSections() {
  const now = new Date();
  const todayN = dayNum(now.getFullYear(), now.getMonth() + 1, now.getDate());
  for (const h of DATA.hedefler) {
    const occ = nextOccurrence(h, now);
    for (const span of document.querySelectorAll(`[data-hedef="${h.id}"]`)) {
      if (!occ) { span.textContent = 'tarih henüz listede yok'; continue; }
      const p = parseDate(occ.tarih);
      const diff = dayNum(p.y, p.m, p.d) - todayN;
      const txt = diff === 0 ? 'bugün' : `${nf.format(diff)} gün kaldı (${p.d} ${MONTHS[p.m - 1]} ${p.y})`;
      span.textContent = occ.yaklasik ? `${txt}, tahmini tarih` : txt;
    }
  }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('http');
    DATA = await res.json();
    HOLIDAYS = new Set(DATA.tatil_gunleri || []);
  } catch {
    showError($('error'), 'Hedef listesi yüklenemedi. Sayfayı yenileyin; özel tarih alanı yine de çalışır.');
    DATA = { hedefler: [], tatil_gunleri: [], guncelleme: '' };
  }
  const sel = $('preset');
  for (const h of DATA.hedefler) { const o = document.createElement('option'); o.value = h.id; o.textContent = h.ad; sel.append(o); }
  $('updated').textContent = DATA.guncelleme ? DATA.guncelleme.split('-').reverse().join('.') : '';
  fillStaticSections();

  // Etkileşim
  sel.addEventListener('change', () => { if (sel.value !== 'ozel' && fillPreset(sel.value)) applyInputs(true); });
  for (const id of ['tarih', 'saat', 'ad']) $(id).addEventListener('input', () => { sel.value = 'ozel'; $('approx').hidden = true; });
  $('form').addEventListener('submit', (e) => { e.preventDefault(); applyInputs(true); });
  $('skip-holidays').addEventListener('change', tick);
  $('clear').addEventListener('click', () => {
    clearInterval(timerId); target = null; $('result').hidden = true; $('tarih').value = ''; $('saat').value = '00:00'; $('ad').value = ''; sel.value = 'ozel';
    $('approx').hidden = true; showError($('error'), ''); history.replaceState(null, '', location.pathname);
  });
  $('copy').addEventListener('click', async () => {
    if (!target) return;
    const link = shareUrl($('tarih').value, $('saat').value, $('ad').value.trim().slice(0, 60));
    try { await navigator.clipboard.writeText(link); $('status').textContent = 'Bağlantı kopyalandı. Bu bağlantıyı açan kişi aynı hedefi görür.'; }
    catch { $('status').textContent = `Panoya kopyalanamadı; bağlantıyı elle kopyalayın: ${link}`; }
  });
  $('fs').addEventListener('click', async () => {
    const box = $('counter');
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await box.requestFullscreen();
    } catch {
      showError($('error'), 'Tam ekran açılamadı. Tarayıcınız ya da cihazınız tam ekranı desteklemiyor olabilir; F11 tuşunu deneyin.');
    }
  });

  // Başlangıç: adres parametreleri → hazır hedef → varsayılan (Yılbaşı)
  const q = new URLSearchParams(location.search);
  if (q.has('tarih')) {
    const raw = q.get('tarih') || '';
    const mt = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?$/.exec(raw);
    const date = mt && parseDate(mt[1]);
    const time = mt && (mt[2] ? parseTime(mt[2]) : true);
    if (!date || !time) {
      showError($('error'), 'Bağlantıdaki tarih geçersiz. Tarihi 2026-12-31 ya da 2026-12-31T18:30 biçiminde yazın; ya da yukarıdan hazır bir hedef seçip yeni bağlantı oluşturun.');
      sel.value = 'yilbasi'; fillPreset('yilbasi'); applyInputs(false);
      showError($('error'), 'Bağlantıdaki tarih geçersiz. Tarihi 2026-12-31 ya da 2026-12-31T18:30 biçiminde yazın; ya da yukarıdan hazır bir hedef seçip yeni bağlantı oluşturun.');
    } else {
      sel.value = 'ozel';
      $('tarih').value = mt[1];
      $('saat').value = mt[2] || '00:00';
      $('ad').value = (q.get('ad') || '').slice(0, 60);
      applyInputs(false);
    }
  } else {
    const id = q.get('hedef');
    const pick = DATA.hedefler.some((h) => h.id === id) ? id : 'yilbasi';
    if (DATA.hedefler.length) { sel.value = pick; if (fillPreset(pick)) applyInputs(false); }
  }
  document.documentElement.dataset.ready = '1';
}

init();
