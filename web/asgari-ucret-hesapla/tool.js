// Asgari Ücret Hesaplama (2026) — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Bilgilendirme amaçlıdır; mali/hukuki tavsiye değildir. Parametreler parametreler.json içindedir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const rateFmt = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const fmtRate = (n) => `%${rateFmt.format(n)}`;
// Kayan nokta artığını (ör. 652342.4999999) toFixed ile temizleyip kuruşa yuvarlar; yarım kuruş yukarı.
const round2 = (n) => Math.round(Number((n * 100).toFixed(6))) / 100;
// Tutarın yüzde oranı, kuruşa yuvarlanmış: base (TL) × rate (%) = kuruş.
const pct = (base, rate) => Math.round(Number((base * rate).toFixed(6))) / 100;

// parametreler.json yüklenemezse kullanılacak varsayılanlar (2026, resmî kaynaklarla doğrulanmış).
const DEFAULTS = {
  guncelleme: '2026-11-05', yil: 2026,
  asgari_ucret_brut: 33030, sgk_isci_orani: 14, issizlik_isci_orani: 1,
  sgk_isveren_orani: 21.75, issizlik_isveren_orani: 2,
  sgk_isveren_tesvik_puanlari: { yok: 0, diger: 2, imalat: 5 }, sgk_isveren_tesvik_varsayilan: 'diger',
  asgari_ucret_destegi_gunluk: 42.33,
  gelir_vergisi_ilk_dilim_orani: 15, damga_vergisi_orani: 0.759, aylik_gun: 30, aylik_saat: 225,
};
let params = DEFAULTS;
let lastText = '';

const TESVIK_ADI = { yok: 'teşviksiz', diger: 'imalat dışı, 2 puan', imalat: 'imalat, 5 puan' };

/**
 * Asgari ücret hesabı. days: çalışılan gün (1-30); tam ayda 30. Tutarlar gün oranıyla ölçeklenir.
 * Asgari ücret tutarı için gelir vergisi ve damga vergisi istisna edildiğinden ödenecek tutar sıfırdır.
 * opts.tesvik: 'yok' | 'diger' | 'imalat' — işveren SGK payından düşülecek Hazine desteği puanı.
 * opts.destek: true ise günlük asgari ücret desteği × gün, işveren maliyetinden ayrıca düşülür.
 */
export function calcMinWage(p, days, opts = {}) {
  const tesvik = opts.tesvik ?? p.sgk_isveren_tesvik_varsayilan;
  const tesvikPuani = p.sgk_isveren_tesvik_puanlari[tesvik];
  if (tesvikPuani === undefined) throw new Error('SGK teşvik seçimi geçersiz. Listeden bir seçenek seçin.');
  const ratio = days / p.aylik_gun;
  const brut = round2(p.asgari_ucret_brut * ratio);
  const sgk = pct(brut, p.sgk_isci_orani);
  const issizlik = pct(brut, p.issizlik_isci_orani);
  const matrah = round2(brut - sgk - issizlik);
  const gvHesaplanan = pct(matrah, p.gelir_vergisi_ilk_dilim_orani);
  const damgaHesaplanan = pct(brut, p.damga_vergisi_orani);
  const net = matrah; // GV ve damga istisna edildiği için ek kesinti yok
  const isverenOrani = round2(p.sgk_isveren_orani - tesvikPuani);
  const isverenSgk = pct(brut, isverenOrani);
  const isverenIssizlik = pct(brut, p.issizlik_isveren_orani);
  const maliyet = round2(brut + isverenSgk + isverenIssizlik);
  const destek = opts.destek ? round2(p.asgari_ucret_destegi_gunluk * days) : 0;
  const maliyetDestekli = round2(maliyet - destek);
  return {
    brut, sgk, issizlik, matrah, gvHesaplanan, damgaHesaplanan, net,
    tesvik, tesvikPuani, isverenOrani, isverenSgk, isverenIssizlik, maliyet, destek, maliyetDestekli,
  };
}

function calc() {
  const raw = $('days').value.trim();
  const days = raw === '' ? params.aylik_gun : Number(raw.replace(',', '.'));
  if (!Number.isInteger(days) || days < 1 || days > params.aylik_gun) {
    throw new Error(`Çalışılan gün sayısı geçersiz. 1 ile ${params.aylik_gun} arasında tam sayı yazın; tam ay için ${params.aylik_gun} yazın ya da alanı boş bırakın.`);
  }
  const opts = { tesvik: $('tesvik').value, destek: $('destek').checked };
  const r = calcMinWage(params, days, opts);
  const full = calcMinWage(params, params.aylik_gun, opts);

  $('r-net').textContent = fmt(r.net);
  $('r-brut').textContent = fmt(r.brut);
  $('r-sgk').textContent = `-${fmt(r.sgk)}`;
  $('r-issizlik').textContent = `-${fmt(r.issizlik)}`;
  $('r-matrah').textContent = fmt(r.matrah);
  $('r-gv').textContent = `${fmt(r.gvHesaplanan)} (istisna: ödenecek 0,00 TL)`;
  $('r-damga').textContent = `${fmt(r.damgaHesaplanan)} (istisna: ödenecek 0,00 TL)`;
  $('r-isv-oran').textContent = r.tesvikPuani
    ? `${fmtRate(r.isverenOrani)}: ${fmtRate(params.sgk_isveren_orani)} − ${rateFmt.format(r.tesvikPuani)} puan`
    : fmtRate(r.isverenOrani);
  $('r-isv-sgk').textContent = fmt(r.isverenSgk);
  $('r-isv-iss').textContent = fmt(r.isverenIssizlik);
  $('r-maliyet').textContent = fmt(r.maliyet);
  $('destek-rows').hidden = !opts.destek;
  $('r-destek-gun').textContent = `${days} gün × ${money.format(params.asgari_ucret_destegi_gunluk)} TL`;
  $('r-destek').textContent = `-${fmt(r.destek)}`;
  $('r-maliyet-destek').textContent = fmt(r.maliyetDestekli);
  $('r-yillik').textContent = fmt(round2(full.net * 12));
  $('r-gun-brut').textContent = fmt(round2(full.brut / params.aylik_gun));
  $('r-gun-net').textContent = fmt(round2(full.net / params.aylik_gun));
  $('r-saat-brut').textContent = fmt(round2(full.brut / params.aylik_saat));
  $('r-saat-net').textContent = fmt(round2(full.net / params.aylik_saat));

  const maliyetMetni = opts.destek
    ? `işverene maliyet ${fmt(r.maliyet)}, asgari ücret desteğiyle ${fmt(r.maliyetDestekli)}`
    : `işverene maliyet ${fmt(r.maliyet)}`;
  lastText = `${params.yil} asgari ücret (${days} gün): brüt ${fmt(r.brut)}, net ${fmt(r.net)}, ${maliyetMetni} (SGK işveren payı ${fmtRate(r.isverenOrani)}, ${TESVIK_ADI[r.tesvik] || r.tesvik}). (Bilişim Ajans – bilgilendirme amaçlıdır.)`;
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
    if (res.ok) params = { ...DEFAULTS, ...(await res.json()) };
  } catch { /* varsayılanlar geçerli */ }
  const d = new Date(params.guncelleme);
  $('param-date').textContent = Number.isNaN(d.getTime()) ? params.guncelleme : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  calc(); // sayfa açılışında tam ay sonucu hazır olsun
}
init();
