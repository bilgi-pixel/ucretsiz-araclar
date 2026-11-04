// Ek Ders Ücreti Hesaplama — tamamı tarayıcıda çalışır; saat ve tutarlarınız sunucuya gitmez.
// Birim ücret = ek ders göstergesi × memur aylık katsayısı. Gece dersi için artış oranı uygulanır.
// Gösterge: gündüz 140, gece/hafta sonu/18.00 sonrası 150 (657 s. K. md. 176); artış oranı = 150/140 - 1 (parametreler.json); kullanıcı kendi katsayısını/birim ücretini girebilir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const tl = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 });

/** parametreler.json okunamazsa kullanılacak varsayılanlar (dosyayla aynı). */
let params = {
  ek_ders_gostergesi: 140,
  gece_artis_orani: 150 / 140 * 100 - 100,
  damga_vergisi_orani: 0.759,
  donemler: {
    temmuz_aralik: { ad: '1 Temmuz – 31 Aralık 2026', aylik_katsayi: 1.575512 },
    ocak_haziran: { ad: '1 Ocak – 30 Haziran 2026', aylik_katsayi: 1.387871 },
  },
};

/** "1,575512" ve "1.575512" biçimlerini sayıya çevirir; boşsa NaN. */
export function num(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '').replace(',', '.');
  return t === '' ? NaN : Number(t);
}

/** Birim ücretleri döndürür: gündüz ve gece (TL / saat, brüt). */
export function unitPrices({ coef, gosterge, nightPct, override }) {
  const day = Number.isFinite(override) && override > 0 ? override : gosterge * coef;
  return { day, night: day * (1 + nightPct / 100) };
}

export function compute(v, p = params) {
  if (!Number.isFinite(v.coef) || v.coef <= 0 || v.coef > 100) throw new Error('Aylık katsayıyı girin (örn. 1,575512). Güncel değer Hazine ve Maliye Bakanlığı genelgesinde yazar; bilmiyorsanız dönemi listeden seçin.');
  if (v.override !== null && (!Number.isFinite(v.override) || v.override <= 0)) throw new Error('Kendi birim ücretinizi girecekseniz sıfırdan büyük bir TL tutarı yazın ya da alanı boş bırakın.');
  for (const [name, val] of [['Gündüz ek ders saati', v.dayHours], ['Gece ek ders saati', v.nightHours]]) {
    if (!Number.isFinite(val) || val < 0 || val > 60) throw new Error(`${name} 0–60 arasında bir sayı olmalı (haftalık saat). Hiç yoksa 0 yazın.`);
  }
  if (v.dayHours + v.nightHours === 0) throw new Error('En az bir ek ders saati girin. Haftalık gündüz ya da gece saatinizi yazın.');
  if (!Number.isFinite(v.weeks) || v.weeks < 1 || v.weeks > 5) throw new Error('Ay başına hafta sayısını 1 ile 5 arasında girin (genelde 4).');
  const up = unitPrices({ coef: v.coef, gosterge: p.ek_ders_gostergesi, nightPct: p.gece_artis_orani, override: v.override });
  const monthlyDay = v.dayHours * v.weeks;
  const monthlyNight = v.nightHours * v.weeks;
  const gross = monthlyDay * up.day + monthlyNight * up.night;
  const incomeTax = gross * v.taxRate / 100;
  const stamp = gross * p.damga_vergisi_orani / 100;
  const net = gross - incomeTax - stamp;
  const hours = monthlyDay + monthlyNight;
  return { up, monthlyDay, monthlyNight, hours, gross, incomeTax, stamp, net, netPerHour: net / hours, v };
}

function read() {
  const ov = $('override').value.trim();
  return {
    coef: num($('coef').value), override: ov === '' ? null : num(ov),
    dayHours: num($('day').value || '0'), nightHours: num($('night').value || '0'),
    weeks: num($('weeks').value), taxRate: Number($('tax').value),
  };
}

let last = null;
function render(r) {
  $('r-net').textContent = tl.format(r.net);
  $('r-gross').textContent = tl.format(r.gross);
  $('r-tax').textContent = tl.format(r.incomeTax);
  $('r-stamp').textContent = tl.format(r.stamp);
  $('r-hours').textContent = `${r.hours} saat (gündüz ${r.monthlyDay}, gece ${r.monthlyNight})`;
  $('r-dayu').textContent = tl.format(r.up.day);
  $('r-nightu').textContent = tl.format(r.up.night);
  $('r-nph').textContent = tl.format(r.netPerHour);
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try { last = compute(read()); render(last); }
  catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function syncPeriod() {
  const d = params.donemler[$('period').value];
  if (d) $('coef').value = String(d.aylik_katsayi).replace('.', ',');
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json');
    if (!res.ok) return;
    params = { ...params, ...(await res.json()) };
    syncPeriod();
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar kullanılır */ }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('period').addEventListener('change', syncPeriod);
$('clear').addEventListener('click', () => {
  ['day', 'night', 'override'].forEach((id) => { $(id).value = ''; });
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('day').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const t = `Ek ders (aylık ${last.hours} saat): brüt ${tl.format(last.gross)}, gelir vergisi ${tl.format(last.incomeTax)}, damga vergisi ${tl.format(last.stamp)}, net ${tl.format(last.net)}. Tahmindir.`;
  try { await navigator.clipboard.writeText(t); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncPeriod();
loadParams();
