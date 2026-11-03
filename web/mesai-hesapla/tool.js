// Fazla Mesai ve Çalışma Süresi Hesaplama — tamamı tarayıcıda çalışır; ücret bilgisi sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const tl = (v) => `${money.format(v)} TL`;
const round2 = (v) => Math.round((v + Number.EPSILON) * 100) / 100;

// Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03', aylik_calisma_saati: 225, aylik_gun_sayisi: 30,
  fazla_calisma_zam_orani: 0.5, fazla_sureli_zam_orani: 0.25,
  hafta_tatili_ek_carpan: 1.5, genel_tatil_ek_carpan: 1, yillik_fazla_calisma_siniri: 270, haftalik_yasal_sure: 45,
};
let params = DEFAULT_PARAMS;

/** Türkçe/İngilizce yazımlı sayıyı çözer: "30.000,50", "30000.5", "30 000". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (t === '') return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/** Ana hesap; hatada Türkçe, çözüm öneren Error fırlatır. */
export function computeOvertime(i, p = params) {
  const hours = i.monthlyHours;
  if (!Number.isFinite(i.wage) || i.wage <= 0) throw new Error(`${i.mode === 'hourly' ? 'Saatlik' : 'Aylık brüt'} ücret eksik ya da geçersiz. Sıfırdan büyük bir tutar yazın (örn. 30.000).`);
  if (!Number.isFinite(hours) || hours < 100 || hours > 300) throw new Error('Aylık çalışma saati 100 ile 300 arasında olmalıdır. Standart 225 saati kullanabilirsiniz.');
  for (const [k, label] of [['ot', 'Fazla çalışma saati'], ['ext', 'Fazla süreli çalışma saati'], ['sunday', 'Hafta tatili gün sayısı'], ['holiday', 'Genel tatil gün sayısı'], ['prior', 'Yıl içindeki önceki fazla çalışma saati']]) {
    if (!Number.isFinite(i[k]) || i[k] < 0) throw new Error(`${label} 0 ya da daha büyük bir sayı olmalıdır. Alanı düzeltin ya da 0 bırakın.`);
  }
  if (i.sunday > 6 || i.holiday > 6) throw new Error('Gün sayıları bir ay için 6\'yı geçemez. Çalıştığınız gün sayısını kontrol edin.');
  const hourly = i.mode === 'hourly' ? i.wage : i.wage / hours;
  const daily = hourly * hours / p.aylik_gun_sayisi;
  const overtime = hourly * (1 + p.fazla_calisma_zam_orani) * i.ot;
  const extended = hourly * (1 + p.fazla_sureli_zam_orani) * i.ext;
  const sunday = daily * p.hafta_tatili_ek_carpan * i.sunday;
  const holiday = daily * p.genel_tatil_ek_carpan * i.holiday;
  const total = round2(overtime) + round2(extended) + round2(sunday) + round2(holiday);
  const yearTotal = i.prior + i.ot;
  return {
    hourly: round2(hourly), daily: round2(daily),
    overtime: round2(overtime), extended: round2(extended), sunday: round2(sunday), holiday: round2(holiday),
    total: round2(total), yearTotal, overLimit: yearTotal > p.yillik_fazla_calisma_siniri, input: i,
  };
}

/* ---------- Arayüz ---------- */
const clean = () => { $('result').hidden = true; $('result').classList.remove('is-active'); };

function render(r) {
  const p = params;
  $('r-hourly').textContent = tl(r.hourly);
  $('r-daily').textContent = tl(r.daily);
  $('r-ot').textContent = tl(r.overtime);
  $('r-ext').textContent = tl(r.extended);
  $('r-sunday').textContent = tl(r.sunday);
  $('r-holiday').textContent = tl(r.holiday);
  $('r-total').textContent = tl(r.total);
  $('r-ot-label').textContent = `Fazla çalışma (%${Math.round(p.fazla_calisma_zam_orani * 100)} zamlı, ${nf.format(r.input.ot)} saat)`;
  $('r-ext-label').textContent = `Fazla süreli çalışma (%${Math.round(p.fazla_sureli_zam_orani * 100)} zamlı, ${nf.format(r.input.ext)} saat)`;
  const w = $('r-limit');
  w.hidden = !r.overLimit;
  w.textContent = r.overLimit ? `Uyarı: Yıl içindeki toplam fazla çalışma ${nf.format(r.yearTotal)} saate ulaşıyor; yasal yıllık sınır ${p.yillik_fazla_calisma_siniri} saattir (md. 41). Sınırı aşan çalışmalar için işyeri uygulamanızı ve sözleşmenizi kontrol edin.` : '';
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
async function run() {
  showError($('error'), '');
  await paramsReady;
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const hoursRaw = $('hours').value.trim();
  const num0 = (id) => ($(id).value.trim() === '' ? 0 : parseNum($(id).value));
  try {
    last = computeOvertime({
      mode, wage: parseNum($('wage').value), monthlyHours: hoursRaw === '' ? params.aylik_calisma_saati : parseNum(hoursRaw),
      ot: num0('ot'), ext: num0('ext'), sunday: num0('sunday'), holiday: num0('holiday'), prior: num0('prior'),
    });
    render(last);
  } catch (e) { last = null; clean(); showError($('error'), e.message); }
}

function updateMode() {
  const hourly = document.querySelector('input[name="mode"]:checked').value === 'hourly';
  $('wage-label').textContent = hourly ? 'Saatlik brüt ücret (TL)' : 'Aylık brüt ücret (TL)';
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', updateMode));
$('clear').addEventListener('click', () => {
  for (const id of ['wage', 'ot', 'ext', 'sunday', 'holiday', 'prior']) $(id).value = '';
  $('hours').value = String(params.aylik_calisma_saati);
  clean(); last = null; showError($('error'), ''); $('wage').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  const t = `Saat ücreti ${tl(last.hourly)}; fazla çalışma ${tl(last.overtime)}; fazla süreli ${tl(last.extended)}; hafta tatili ${tl(last.sunday)}; genel tatil ${tl(last.holiday)}; toplam brüt ek ücret ${tl(last.total)}.`;
  try { await navigator.clipboard.writeText(t); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const d = new Date(params.guncelleme);
  $('params-updated').textContent = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  if (!$('hours').value) $('hours').value = String(params.aylik_calisma_saati);
}
$('hours').value = String(DEFAULT_PARAMS.aylik_calisma_saati);
const paramsReady = loadParams();
updateMode();
