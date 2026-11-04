// Uyku Saati Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz saatler hiçbir yere gönderilmez.
// Mantık: ortalama 90 dakikalık uyku döngüsü + uykuya dalma süresi. Tıbbi tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

export const CYCLE_MIN = 90; // ortalama uyku döngüsü (kişiye göre ~80-110 dk)
export const CYCLE_RANGE = [4, 5, 6, 7]; // gösterilen döngü sayıları
export const NAP_MINUTES = [20, 90];
export const DAY = 1440;

// Genel kılavuzlardaki yaklaşık aralıklar (saat). Yalnızca 6 yaş ve üzeri için döngü hesabı yapılır.
export const AGE_GROUPS = {
  school: { label: '6-13 yaş', min: 9, max: 11 },
  teen: { label: '14-17 yaş', min: 8, max: 10 },
  adult: { label: '18-64 yaş', min: 7, max: 9 },
  senior: { label: '65 yaş ve üzeri', min: 7, max: 8 },
};

const mod = (n) => ((n % DAY) + DAY) % DAY;

/** "HH:MM" → gün içi dakika; geçersizse null. */
export function parseTime(s) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || '').trim());
  if (!m) return null;
  const h = +m[1], mi = +m[2];
  return h > 23 || mi > 59 ? null : h * 60 + mi;
}

/** Gün içi dakika → "HH:MM" (kendi biçimleyicimiz; yerel ayara bağlı değil). */
export function fmtClock(min) {
  const t = mod(Math.round(min));
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

/** Dakika → "7 sa 30 dk". */
export function fmtDuration(min) {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  if (h === 0) return `${m} dk`;
  return m === 0 ? `${h} sa` : `${h} sa ${m} dk`;
}

/** Uykuya dalma süresi: 0-120 tam sayı; aksi halde çözüm öneren Türkçe hata. */
export function parseLatency(s) {
  const t = String(s ?? '').trim();
  if (!/^\d{1,3}$/.test(t) || +t > 120) {
    throw new Error('Uykuya dalma süresi 0 ile 120 dakika arasında bir tam sayı olmalı (çoğu kişide 10-20 dakika). Değeri düzeltin; emin değilseniz 15 yazın.');
  }
  return +t;
}

/** Aralık durumu: önerilen saat aralığının altında / içinde / üstünde. */
export function rangeStatus(sleepMin, group) {
  const h = sleepMin / 60;
  if (h < group.min) return 'below';
  if (h > group.max) return 'above';
  return 'in';
}

/** Kalkış saatine göre yatış saatleri. sameDay: yatış, kalkışla aynı takvim gününe (gece yarısından sonra) denk gelir. */
export function bedtimesFor(wakeMin, latency, group, cycles = CYCLE_RANGE) {
  return cycles.map((c) => {
    const sleep = c * CYCLE_MIN;
    const total = sleep + latency;
    return { cycles: c, sleep, bed: mod(wakeMin - total), sameDay: total <= wakeMin, status: rangeStatus(sleep, group) };
  });
}

/** Yatış saatine göre kalkış saatleri. nextDay: kalkış ertesi güne taşar. */
export function wakeTimesFor(bedMin, latency, group, cycles = CYCLE_RANGE) {
  return cycles.map((c) => {
    const sleep = c * CYCLE_MIN;
    const end = bedMin + latency + sleep;
    return { cycles: c, sleep, wake: mod(end), nextDay: end >= DAY, status: rangeStatus(sleep, group) };
  });
}

/** Şekerleme: yatış + dalma + süre. */
export function napTimesFor(startMin, latency) {
  return NAP_MINUTES.map((len) => ({ len, wake: mod(startMin + latency + len) }));
}

/** Şu anki yerel saat (dakika). Tıklama anında okunur. */
export function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

const STATUS_TEXT = { below: 'önerilen aralığın altında', in: 'önerilen aralıkta', above: 'önerilen aralığın üzerinde' };

/** Tüm sonucu hesaplar; geçersiz girişte Türkçe, çözüm öneren Error fırlatır. */
export function compute(input) {
  const latency = parseLatency(input.latency);
  const group = AGE_GROUPS[input.age] || AGE_GROUPS.adult;
  if (input.mode === 'wake') {
    const wake = parseTime(input.wake);
    if (wake === null) throw new Error('Kalkış saati boş ya da geçersiz. Saat alanına kalkmak istediğiniz saati yazın (örn. 07:00).');
    return { mode: 'wake', latency, group, wake, rows: bedtimesFor(wake, latency, group) };
  }
  if (input.mode === 'bed') {
    let bed = parseTime(input.bed), usedNow = false;
    if (String(input.bed || '').trim() !== '' && bed === null) throw new Error('Yatış saati geçersiz. Saati 23:30 gibi yazın ya da alanı boş bırakıp şu anki saati kullanın.');
    if (bed === null) { bed = nowMinutes(); usedNow = true; }
    return { mode: 'bed', latency, group, bed, usedNow, rows: wakeTimesFor(bed, latency, group) };
  }
  let start = parseTime(input.nap), usedNow = false;
  if (String(input.nap || '').trim() !== '' && start === null) throw new Error('Şekerleme başlangıç saati geçersiz. Saati 14:00 gibi yazın ya da alanı boş bırakıp şu anki saati kullanın.');
  if (start === null) { start = nowMinutes(); usedNow = true; }
  return { mode: 'nap', latency, group, start, usedNow, rows: napTimesFor(start, latency) };
}

/* ---------- Arayüz ---------- */
const HEALTH = 'Bu araç genel bilgi verir, tıbbi tavsiye değildir. Uyku sorununuz sürüyorsa hekiminize danışın.';

function rowEl(label, value, strong, sub) {
  const row = document.createElement('div');
  row.className = 'kdv-row' + (strong ? ' is-strong' : '');
  const dt = document.createElement('dt');
  dt.textContent = label;
  if (sub) { const s = document.createElement('small'); s.className = 'sleep-sub'; s.textContent = sub; dt.appendChild(s); }
  const dd = document.createElement('dd');
  dd.textContent = value;
  row.append(dt, dd);
  return row;
}

function describe(r) {
  const lat = `${r.latency} dk uykuya dalma payı dahil`;
  if (r.mode === 'wake') {
    return {
      title: `${fmtClock(r.wake)} saatinde uyanmak için şu saatlerde yatın (${lat}).`,
      rows: r.rows.map((x) => ({
        label: `${x.cycles} döngü · ${fmtDuration(x.sleep)} uyku`, value: fmtClock(x.bed),
        sub: [STATUS_TEXT[x.status], x.sameDay ? 'gece yarısından sonra' : ''].filter(Boolean).join(' · '), strong: x.status === 'in',
      })),
      note: 'Yatış saati, yatağa uzandığınız andır. Uyku, yaklaşık 90 dakikalık döngülerin sonunda uyanmayı hedefler; gerçek döngü kişiye ve geceye göre değişir.',
    };
  }
  if (r.mode === 'bed') {
    return {
      title: `${fmtClock(r.bed)}${r.usedNow ? ' (şu an)' : ''} saatinde yatarsanız şu saatlerde uyanmak en uygunu (${lat}).`,
      rows: r.rows.map((x) => ({
        label: `${x.cycles} döngü · ${fmtDuration(x.sleep)} uyku`, value: fmtClock(x.wake),
        sub: [STATUS_TEXT[x.status], x.nextDay ? 'ertesi gün' : ''].filter(Boolean).join(' · '), strong: x.status === 'in',
      })),
      note: 'Kalkış saatleri, uykuya daldıktan sonraki tam döngülerin bitişine göre hesaplanır. Alarm kurmuyoruz; saati telefonunuzun saatine kendiniz girin.',
    };
  }
  return {
    title: `${fmtClock(r.start)}${r.usedNow ? ' (şu an)' : ''} saatinde şekerlemeye yatarsanız (${lat}).`,
    rows: r.rows.map((x) => ({
      label: x.len === 20 ? '20 dakikalık kısa şekerleme' : '90 dakikalık tam döngü şekerleme', value: fmtClock(x.wake),
      sub: x.len === 20 ? 'derin uykuya geçmeden uyanmak için' : 'bir tam döngüyü tamamlar', strong: false,
    })),
    note: 'Geç saatlerde yapılan şekerleme gece uykusunu geciktirebilir; mümkünse öğleden sonra erken saatleri tercih edin.',
  };
}

function summaryText(d) {
  const lines = d.rows.map((x) => `${x.label}: ${x.value}`);
  return `${d.title}\n${lines.join('\n')}\n${HEALTH}`;
}

let last = null;
function readInput() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  return { mode, wake: $('wake').value, bed: $('bed').value, nap: $('nap').value, latency: $('latency').value, age: $('age').value };
}

function render(r) {
  const d = describe(r);
  $('r-title').textContent = d.title;
  $('r-list').replaceChildren(...d.rows.map((x) => rowEl(x.label, x.value, x.strong, x.sub)));
  $('r-note').textContent = d.note;
  $('r-health').textContent = HEALTH;
  $('result').hidden = false; $('result').classList.add('is-active');
  last = d;
}

function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); last = null; }

function run() {
  showError($('error'), '');
  try { render(compute(readInput())); }
  catch (e) { hideResult(); showError($('error'), e.message); }
}

function syncMode() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  $('f-wake').hidden = mode !== 'wake';
  $('f-bed').hidden = mode !== 'bed';
  $('f-nap').hidden = mode !== 'nap';
  $('f-age').hidden = mode === 'nap';
  hideResult(); showError($('error'), '');
}

document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', syncMode));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('wake').value = '07:00'; $('bed').value = ''; $('nap').value = ''; $('latency').value = '15'; $('age').value = 'adult';
  hideResult(); showError($('error'), ''); $('wake').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncMode();
