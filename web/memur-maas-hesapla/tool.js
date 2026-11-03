// Memur Maaşı Hesaplama (tahmini) — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcMemur } from './calc.js';
import { $, money, loadParams, setupGosterge, readCommon, setRow, fillTable, fillParamInfo, fillCoefficients, setupDonem } from './ui.js';

// parametreler.json yüklenemezse kullanılacak yerleşik (yaklaşık) değerler.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04', yaklasik: true, asgari_ucret_brut: 33030, asgari_sgk_isci_orani: 14, asgari_issizlik_isci_orani: 1,
  damga_vergisi_orani: 0.759, kaynak: 'Yaklaşık değerler; resmî duyuruyla teyit edin.',
  gelir_vergisi_dilimleri: [{ ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 }, { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 }],
  donemler: { temmuz_aralik: { ad: '1 Temmuz – 31 Aralık 2026', aylik_katsayi: 1.575512, taban_aylik_katsayisi: 25.794915, yan_odeme_katsayisi: 0.499649 } }, varsayilan_donem: 'temmuz_aralik', taban_aylik_gostergesi: 1000,
  emekli_kesenegi_4c: 9, gss_orani: 5, emekli_kesenegi_5434: 16,
  aile_es_gostergesi: 2273, aile_cocuk_gostergesi: 250, aile_cocuk_0_6_carpan: 2,
  hizmet_siniflari: { gih_lisans: { ad: 'Genel idare – lisans', ek_gosterge: 2200, ozel_hizmet_orani: 90, yan_odeme_puani: 1000 } },
  gosterge_tablosu: { 1: [1320, 1380, 1440, 1500], 9: [730, 745, 760, 775, 790, 805, 820, 835, 850] },
};

let params = DEFAULT_PARAMS;

function render() {
  const err = $('error'), result = $('result');
  showError(err, '');
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
