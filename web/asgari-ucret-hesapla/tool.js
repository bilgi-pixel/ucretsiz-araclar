// Asgari Ücret Hesaplama (2026) — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Bilgilendirme amaçlıdır; mali/hukuki tavsiye değildir. Parametreler parametreler.json içindedir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// parametreler.json yüklenemezse kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04', yil: 2026,
  asgari_ucret_brut: 33030, sgk_isci_orani: 14, issizlik_isci_orani: 1,
  sgk_isveren_orani: 20.5, sgk_isveren_indirim_puan: 5, issizlik_isveren_orani: 2,
  gelir_vergisi_ilk_dilim_orani: 15, damga_vergisi_orani: 0.759, aylik_gun: 30, aylik_saat: 225,
};
let lastText = '';

/**
 * Asgari ücret hesabı. days: çalışılan gün (1-30); tam ayda 30. Tutarlar gün oranıyla ölçeklenir.
 * Asgari ücret tutarı için gelir vergisi ve damga vergisi istisna edildiğinden ödenecek tutar sıfırdır.
 */
export function calcMinWage(p, days, withDiscount) {
  const ratio = days / p.aylik_gun;
  const brut = round2(p.asgari_ucret_brut * ratio);
  const sgk = round2(brut * p.sgk_isci_orani / 100);
  const issizlik = round2(brut * p.issizlik_isci_orani / 100);
  const matrah = round2(brut - sgk - issizlik);
  const gvHesaplanan = round2(matrah * p.gelir_vergisi_ilk_dilim_orani / 100);
  const damgaHesaplanan = round2(brut * p.damga_vergisi_orani / 100);
  const net = round2(brut - sgk - issizlik); // GV ve damga istisna edildiği için ek kesinti yok
  const isverenOran = (p.sgk_isveren_orani - (withDiscount ? p.sgk_isveren_indirim_puan : 0)) / 100;
  const isverenSgk = round2(brut * isverenOran);
  const isverenIssizlik = round2(brut * p.issizlik_isveren_orani / 100);
  const maliyet = round2(brut + isverenSgk + isverenIssizlik);
  return { brut, sgk, issizlik, matrah, gvHesaplanan, damgaHesaplanan, net, isverenSgk, isverenIssizlik, maliyet };
}

function calc() {
  const raw = $('days').value.trim();
  const days = raw === '' ? params.aylik_gun : Number(raw.replace(',', '.'));
  if (!Number.isInteger(days) || days < 1 || days > params.aylik_gun) {
    throw new Error(`Çalışılan gün sayısı geçersiz. 1 ile ${params.aylik_gun} arasında tam sayı yazın; tam ay için ${params.aylik_gun} yazın ya da alanı boş bırakın.`);
  }
  const r = calcMinWage(params, days, $('discount').checked);
  const full = calcMinWage(params, params.aylik_gun, $('discount').checked);

  $('r-net').textContent = fmt(r.net);
  $('r-brut').textContent = fmt(r.brut);
  $('r-sgk').textContent = `-${fmt(r.sgk)}`;
  $('r-issizlik').textContent = `-${fmt(r.issizlik)}`;
  $('r-matrah').textContent = fmt(r.matrah);
  $('r-gv').textContent = `${fmt(r.gvHesaplanan)} (istisna: ödenecek 0,00 TL)`;
  $('r-damga').textContent = `${fmt(r.damgaHesaplanan)} (istisna: ödenecek 0,00 TL)`;
  $('r-isv-sgk').textContent = fmt(r.isverenSgk);
  $('r-isv-iss').textContent = fmt(r.isverenIssizlik);
  $('r-maliyet').textContent = fmt(r.maliyet);
  $('r-yillik').textContent = fmt(round2(full.net * 12));
  $('r-gun-brut').textContent = fmt(round2(full.brut / params.aylik_gun));
  $('r-gun-net').textContent = fmt(round2(full.net / params.aylik_gun));
  $('r-saat-brut').textContent = fmt(round2(full.brut / params.aylik_saat));
  $('r-saat-net').textContent = fmt(round2(full.net / params.aylik_saat));

  lastText = `${params.yil} asgari ücret (${days} gün): brüt ${fmt(r.brut)}, net ${fmt(r.net)}, işverene maliyet ${fmt(r.maliyet)}. (Bilişim Ajans – bilgilendirme amaçlıdır.)`;
  const res = $('result');
  res.hidden = false;
  res.classList.add('is-active');
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  $('copy-status').textContent = '';
  showError($('error'), '');
  try { calc(); } catch (err) {
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
});
$('clear').addEventListener('click', () => {
  $('form').reset();
  showError($('error'), '');
  $('copy-status').textContent = '';
  try { calc(); } catch { /* varsayılanlar her zaman geçerlidir */ }
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
});

async function init() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar geçerli */ }
  const d = new Date(params.guncelleme);
  $('param-date').textContent = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  calc(); // sayfa açılışında tam ay sonucu hazır olsun
}
init();
