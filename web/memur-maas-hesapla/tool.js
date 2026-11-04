// Memur Maaşı Hesaplama (tahmini) — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcMemur } from './calc.js';
import { $, money, loadParams, setupGosterge, readCommon, setRow, fillTable, fillParamInfo, setupDonem } from './ui.js';

// parametreler.json yüklenemezse kullanılacak yerleşik değerler (dosyayla aynı tutulur).
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-05', yaklasik: true, yil: 2026, asgari_ucret_brut: 33030, asgari_sgk_isci_orani: 14, asgari_issizlik_isci_orani: 1,
  damga_vergisi_orani: 0.759,
  kaynak: 'Yerleşik değerler: 4/c kesenek %9 + GSS %5 kişi payı, kurum payı MYÖ %12 + GSS %7,5 (5510 md. 81; 7566 md. 23); 5434 rejiminde kesenek %16, GSS kurumca ödenir; prime esas kazanç üst sınırı aylık 297.270 TL; 2026 brüt asgari ücret 33.030 TL. Katsayıları resmî duyuruyla teyit edin.',
  gelir_vergisi_dilimleri: [{ ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 }, { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 }],
  taban_aylik_gostergesi: 1000, emekli_kesenegi_4c: 9, gss_orani: 5, emekli_kesenegi_5434: 16, gss_orani_5434: 0,
  kurum_myo_orani_4c: 12, kurum_gss_orani_4c: 7.5, kurum_gss_orani_5434: 12,
  prim_alt_sinir_gunluk: 1101, prim_alt_sinir_aylik: 33030, prim_ust_sinir_katsayi: 9, prim_ust_sinir_gunluk: 9909, prim_ust_sinir_aylik: 297270,
  hizmet_siniflari: {
    gih_lisans: { ad: 'Genel idare – lisans (4 yıllık)', ek_gosterge: 2200, ozel_hizmet_orani: 90, yan_odeme_puani: 1000 },
    gih_onlisans: { ad: 'Genel idare – ön lisans (2 yıllık)', ek_gosterge: 1500, ozel_hizmet_orani: 80, yan_odeme_puani: 800 },
    gih_lise: { ad: 'Genel idare – lise ve dengi', ek_gosterge: 0, ozel_hizmet_orani: 70, yan_odeme_puani: 600 },
    sef_uzman: { ad: 'Şef / uzman düzeyi (örnek)', ek_gosterge: 3000, ozel_hizmet_orani: 100, yan_odeme_puani: 1200 },
    elle: { ad: 'Diğer (değerleri kendim gireceğim)', ek_gosterge: 0, ozel_hizmet_orani: 0, yan_odeme_puani: 0 },
  },
  // 657 sayılı Kanun md. 43 gösterge tablosu (derece → kademe göstergeleri).
  gosterge_tablosu: {
    1: [1320, 1380, 1440, 1500], 2: [1155, 1210, 1265, 1320, 1380, 1440], 3: [1020, 1065, 1110, 1155, 1210, 1265, 1320, 1380],
    4: [915, 950, 985, 1020, 1065, 1110, 1155, 1210, 1265], 5: [835, 860, 885, 915, 950, 985, 1020, 1065, 1110],
    6: [760, 785, 810, 835, 860, 885, 915, 950, 985], 7: [705, 720, 740, 760, 785, 810, 835, 860, 885],
    8: [660, 675, 690, 705, 720, 740, 760, 785, 810], 9: [620, 630, 645, 660, 675, 690, 705, 720, 740],
    10: [590, 600, 610, 620, 630, 645, 660, 675, 690], 11: [560, 570, 580, 590, 600, 610, 620, 630, 645],
    12: [545, 550, 555, 560, 570, 580, 590, 600, 610], 13: [530, 535, 540, 545, 550, 555, 560, 570, 580],
    14: [515, 520, 525, 530, 535, 540, 545, 550, 555], 15: [500, 505, 510, 515, 520, 525, 530, 535, 540],
  },
  donemler: {
    temmuz_aralik: { ad: '1 Temmuz – 31 Aralık 2026', aylik_katsayi: 1.575512, taban_aylik_katsayisi: 25.794915, yan_odeme_katsayisi: 0.499649, yaklasik: false },
    ocak_haziran: { ad: '1 Ocak – 30 Haziran 2026', aylik_katsayi: 1.387871, taban_aylik_katsayisi: 22.722793, yan_odeme_katsayisi: 0.440141, yaklasik: true },
  },
  varsayilan_donem: 'temmuz_aralik',
  aile_es_gostergesi: 2273, aile_cocuk_gostergesi: 250, aile_cocuk_0_6_carpan: 2,
};

let params = DEFAULT_PARAMS;

/** Seçili katsayı dönemi yaklaşık (doğrulanmamış) değerlere dayanıyorsa görünür not gösterir. */
function syncDonemNote() {
  const d = params.donemler[$('f-donem').value];
  $('donem-not').hidden = !(d && d.yaklasik);
}

function render() {
  const err = $('error'), result = $('result');
  showError(err, '');
  syncDonemNote();
  try {
    const input = readCommon();
    const calc = calcMemur(input, params);
    result.classList.add('is-active');
    const l = calc.lines;
    setRow('r-gosterge', money(l.gostergeAylik));
    setRow('r-ekgosterge', money(l.ekGostergeAylik));
    setRow('r-taban', money(l.taban));
    setRow('r-yan', money(l.yanOdeme));
    setRow('r-oht', money(l.tazminat));
    setRow('r-aile', money(l.aile));
    setRow('r-brut', money(calc.rows[0].brut));
    setRow('r-kesenek', money(calc.kesenek));
    setRow('r-gss', money(calc.gss));
    setRow('r-gv', money(calc.rows[0].gelirVergisi));
    setRow('r-damga', money(calc.rows[0].damga));
    setRow('r-net', money(calc.ocakNet));
    setRow('r-net-avg', money(calc.ortalamaNet));
    setRow('r-net-year', money(calc.totals.net));
    // Kurum payı yalnızca 4/c için gösterilir; 5434 rejiminde satır gizlenir.
    const kurumRow = $('r-kurum').closest('.bn-row');
    kurumRow.hidden = calc.kurumPayi === null;
    setRow('r-kurum', calc.kurumPayi === null ? '' : money(calc.kurumPayi));
    $('tavan-not').hidden = !calc.tavanaTakildi;
    fillTable(calc);
  } catch (e) {
    result.classList.remove('is-active');
    showError(err, e.message);
  }
}

function applyPreset() {
  const s = params.hizmet_siniflari[$('f-sinif').value];
  if (!s) return;
  $('f-ek').value = s.ek_gosterge;
  $('f-oht').value = s.ozel_hizmet_orani;
  $('f-yan').value = s.yan_odeme_puani;
}

async function init() {
  params = await loadParams(DEFAULT_PARAMS);
  fillParamInfo(params);
  setupDonem(params, render);
  for (const [k, v] of Object.entries(params.hizmet_siniflari)) $('f-sinif').add(new Option(v.ad, k));
  applyPreset();
  setupGosterge(params, render);
  $('f-sinif').addEventListener('change', () => { applyPreset(); render(); });
  ['f-gosterge', 'f-ek', 'f-oht', 'f-yan', 'f-ka', 'f-kt', 'f-ky', 'f-cocuk', 'f-cocuk06'].forEach((id) => $(id).addEventListener('input', render));
  ['f-es', 'f-eski', 'f-istisna'].forEach((id) => $(id).addEventListener('change', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
