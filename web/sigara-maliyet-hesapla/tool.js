// Sigara Maliyeti Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Yalnızca matematiksel hesaptır; tıbbi ya da yatırım tavsiyesi değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Türkçe sayı biçimi ---------- */
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const intFmt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const fmt = (n) => `${money.format(n)} TL`;
const pctFmt = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "3,5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/* ---------- Hesap çekirdeği ---------- */
const PACK_SIZE = 20; // bir paket 20 adet kabul edilir

/** Günlük/haftalık/aylık/yıllık maliyet. perDay: günde adet, packPrice: paket fiyatı (TL). */
export function costs(perDay, packPrice) {
  const daily = (perDay / PACK_SIZE) * packPrice;
  const yearly = daily * 365;
  return { daily, weekly: daily * 7, monthly: yearly / 12, yearly, packsPerYear: (perDay / PACK_SIZE) * 365 };
}

/**
 * Bırakınca biriken para. Getiri yoksa yıllık maliyet × yıl; getiri varsa her ay sonunda
 * yıllık maliyetin on ikide biri eklenir ve aylık oran = yıllık oran / 12 (aylık bileşik).
 */
export function saved(yearly, years, annualRate) {
  const r = annualRate / 12;
  if (!(r > 0)) return yearly * years;
  const months = Math.round(years * 12);
  return (yearly / 12) * (Math.pow(1 + r, months) - 1) / r;
}

/** Hedef tutara kaç günde ulaşılır (yukarı yuvarlanır). */
export function daysToGoal(target, daily) {
  return Math.ceil(target / daily - 1e-9);
}

/** Gün sayısını "1 yıl 8 ay 20 gün" biçimine çevirir (yıl 365, ay 30 gün). */
export function durationText(days) {
  const y = Math.floor(days / 365);
  const rest = days - y * 365;
  const m = Math.floor(rest / 30);
  const d = rest - m * 30;
  const parts = [];
  if (y) parts.push(`${y} yıl`);
  if (m) parts.push(`${m} ay`);
  if (d || !parts.length) parts.push(`${d} gün`);
  return parts.join(' ');
}

/* ---------- Arayüz ---------- */
const el = { form: $('form'), error: $('error'), result: $('result'), status: $('copy-status') };
let lastSummary = '';

/** Boş bırakılabilen sayı alanı: boşsa null, doluysa sayı; geçersizse hata fırlatır. */
function readOptional(id, msg, min, max) {
  const txt = $(id).value.trim();
  if (!txt) return null;
  const v = parseNum(txt);
  if (!(v >= min && v <= max)) throw new Error(msg);
  return v;
}

function readInputs() {
  const perDay = parseNum($('s-adet').value);
  if (!(perDay > 0)) throw new Error('Günlük adet geçersiz ya da boş. 0\'dan büyük bir sayı yazın (örnek: 20; yarım paket için 10).');
  if (perDay > 200) throw new Error('Günlük adet çok yüksek görünüyor. 1 ile 200 arasında bir sayı yazın.');
  const price = parseNum($('s-paket').value);
  if (!(price > 0)) throw new Error('Paket fiyatı geçersiz ya da boş. Bugünkü paket fiyatını TL olarak yazın (örnek: 80).');
  if (price > 10000) throw new Error('Paket fiyatı çok yüksek görünüyor. Bir paketin (20 adet) TL fiyatını yazın.');
  const years = readOptional('s-yil', 'Yıl bilgisi geçersiz. 0 ile 80 arasında bir sayı yazın (örnek: 10 ya da 2,5) ya da alanı boş bırakın.', 0, 80);
  const rate = readOptional('s-getiri', 'Getiri oranı geçersiz. Yıllık oranı yüzde olarak 0 ile 1000 arasında yazın (örnek: 12) ya da alanı boş bırakın.', 0, 1000);
  const goal = readOptional('s-hedef', 'Hedef tutar geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 10.000) ya da alanı boş bırakın.', 0, 1e12);
  if (goal !== null && !(goal > 0)) throw new Error('Hedef tutar geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 10.000) ya da alanı boş bırakın.');
  return { perDay, price, years, rate: rate === null ? null : rate / 100, goal };
}

function render(inp) {
  const c = costs(inp.perDay, inp.price);
  $('r-head').textContent = `Yıllık sigara maliyetiniz: ${fmt(c.yearly)}`;
  $('r-daily').textContent = fmt(c.daily);
  $('r-weekly').textContent = fmt(c.weekly);
  $('r-monthly').textContent = fmt(c.monthly);
  $('r-yearly').textContent = fmt(c.yearly);
  $('r-packs').textContent = `${intFmt.format(Math.round(c.packsPerYear))} paket`;

  const hasYears = inp.years !== null && inp.years > 0;
  $('row-spent').hidden = !hasYears;
  if (hasYears) {
    $('r-spent').textContent = fmt(c.yearly * inp.years);
    $('dt-spent').textContent = `Bugüne kadar harcanan (${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(inp.years)} yıl)`;
  }

  // 1 / 5 / 10 / 20 yılda biriken para
  const hasRate = inp.rate !== null && inp.rate > 0;
  $('th-ret').hidden = !hasRate;
  $('sv-note').textContent = hasRate
    ? `Tutarlar TL cinsindendir. "Biriken" sütunu getirisiz birikimdir; "Getiriyle" sütunu her ay sonunda yıllık maliyetin on ikide birinin eklendiği ve yıllık ${pctFmt(inp.rate * 100)} oranın aylık bileşik işlediği varsayımdır. Getiri garanti değildir.`
    : 'Tutarlar TL cinsindendir. Her gün içmeyeceğiniz sigaranın parasını kenara ayırdığınızı varsayar; getiri ve enflasyon hesaba katılmaz.';
  $('sv-body').innerHTML = [1, 5, 10, 20].map((y) => {
    const plain = saved(c.yearly, y, 0);
    const withRet = hasRate ? `<td>${money.format(saved(c.yearly, y, inp.rate))}</td>` : '';
    return `<tr data-years="${y}"><th scope="row">${y} yıl</th><td>${money.format(plain)}</td>${withRet}</tr>`;
  }).join('');

  // Hedefe ulaşma süresi
  const hasGoal = inp.goal !== null;
  $('goal-block').hidden = !hasGoal;
  let goalText = '';
  if (hasGoal) {
    const days = daysToGoal(inp.goal, c.daily);
    goalText = days >= 30 ? `${intFmt.format(days)} gün (yaklaşık ${durationText(days)})` : `${intFmt.format(days)} gün`;
    $('r-goal').textContent = `${fmt(inp.goal)} için ${goalText}`;
  }

  const lines = [
    `Sigara maliyeti: günde ${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(inp.perDay)} adet, paket ${fmt(inp.price)}`,
    `Günlük: ${fmt(c.daily)} · Haftalık: ${fmt(c.weekly)} · Aylık: ${fmt(c.monthly)} · Yıllık: ${fmt(c.yearly)}`,
  ];
  if (hasYears) lines.push(`Bugüne kadar harcanan (${inp.years} yıl): ${fmt(c.yearly * inp.years)}`);
  lines.push(`Bırakırsanız biriken: 1 yıl ${fmt(saved(c.yearly, 1, 0))}, 5 yıl ${fmt(saved(c.yearly, 5, 0))}, 10 yıl ${fmt(saved(c.yearly, 10, 0))}, 20 yıl ${fmt(saved(c.yearly, 20, 0))}`);
  if (hasGoal) lines.push(`Hedef ${fmt(inp.goal)}: ${goalText}`);
  lines.push('(Matematiksel hesaptır; tıbbi ya da yatırım tavsiyesi değildir.)');
  lastSummary = lines.join('\n');
  el.result.classList.add('is-active');
}

el.form.addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  el.status.textContent = '';
  try {
    render(readInputs());
  } catch (err) {
    el.result.classList.remove('is-active');
    showError(el.error, err.message);
  }
});

$('clear').addEventListener('click', () => {
  el.form.reset();
  el.result.classList.remove('is-active');
  showError(el.error, '');
  el.status.textContent = '';
});

$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastSummary); el.status.textContent = 'Özet panoya kopyalandı.'; }
  catch { el.status.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
});
