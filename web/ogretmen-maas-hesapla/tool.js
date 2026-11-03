// Öğretmen Maaşı ve Ek Ders Ücreti Hesaplama (tahmini) — tamamı tarayıcıda çalışır; veri ağa gitmez.
// Hesap motoru memur maaşı sayfasıyla ortaktır (eğitim-öğretim hizmetleri sınıfı için parametreler farklıdır).
import { showError } from '../assets/js/ba.js';
import { calcMemur, ekDersUnit, ekDersBrut } from '../memur-maas-hesapla/calc.js';
import { $, money, loadParams, setupGosterge, readCommon, reqNum, setRow, fillTable, fillParamInfo, fillCoefficients, setupDonem } from '../memur-maas-hesapla/ui.js';

// parametreler.json yüklenemezse kullanılacak yerleşik (yaklaşık) değerler.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04', yaklasik: true, asgari_ucret_brut: 33030, asgari_sgk_isci_orani: 14, asgari_issizlik_isci_orani: 1,
  damga_vergisi_orani: 0.759, kaynak: 'Yaklaşık değerler; resmî duyuruyla teyit edin.',
  gelir_vergisi_dilimleri: [{ ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 }, { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 }],
  donemler: { temmuz_aralik: { ad: '1 Temmuz – 31 Aralık 2026', aylik_katsayi: 1.575512, taban_aylik_katsayisi: 25.794915, yan_odeme_katsayisi: 0.499649 } }, varsayilan_donem: 'temmuz_aralik', taban_aylik_gostergesi: 1000,
  emekli_kesenegi_4c: 9, gss_orani: 5, emekli_kesenegi_5434: 16,
  aile_es_gostergesi: 2273, aile_cocuk_gostergesi: 250, aile_cocuk_0_6_carpan: 2,
  ek_ders_gostergesi: 140, ek_ders_gece_artis_orani: 25, aylik_hafta_sayisi: 4,
  unvanlar: { ogretmen: { ad: 'Öğretmen', ek_gosterge: 2200, egitim_ogretim_tazminati_orani: 90, yan_odeme_puani: 1000 } },
  gosterge_tablosu: { 1: [1320, 1380, 1440, 1500], 9: [730, 745, 760, 775, 790, 805, 820, 835, 850] },
};

let params = DEFAULT_PARAMS;

function render() {
  const err = $('error'), result = $('result');
  showError(err, '');
  try {
    const input = readCommon();
    const gunduz = reqNum('f-gunduz', 'Gündüz ek ders saati', { allowZero: true, max: 60 });
    const gece = reqNum('f-gece', 'Gece ek ders saati', { allowZero: true, max: 60 });
    const brutEkDers = ekDersBrut(params, input.aylikKatsayi, gunduz, gece);
    const base = calcMemur({ ...input, ekDersBrut: 0 }, params);
    const total = calcMemur({ ...input, ekDersBrut: brutEkDers }, params);
    result.classList.add('is-active');
    const l = base.lines;
    setRow('r-gosterge', money(l.gostergeAylik));
    setRow('r-ekgosterge', money(l.ekGostergeAylik));
    setRow('r-taban', money(l.taban));
    setRow('r-yan', money(l.yanOdeme));
    setRow('r-oht', money(l.tazminat));
    setRow('r-aile', money(l.aile));
    setRow('r-brut', money(base.rows[0].brut));
    setRow('r-kesenek', money(base.kesenek));
    setRow('r-gss', money(base.gss));
    setRow('r-gv', money(base.rows[0].gelirVergisi));
    setRow('r-damga', money(base.rows[0].damga));
    setRow('r-net', money(base.ocakNet));
    setRow('r-net-avg', money(base.ortalamaNet));
    setRow('r-net-year', money(base.totals.net));
    // Ek ders: birim ücretler, brüt ve net (vergi farkı üzerinden).
    setRow('r-ekders-unit', money(ekDersUnit(params, input.aylikKatsayi, false)));
    setRow('r-ekders-unit-gece', money(ekDersUnit(params, input.aylikKatsayi, true)));
    setRow('r-ekders-saat', String(round1((gunduz + gece) * params.aylik_hafta_sayisi)));
    setRow('r-ekders-brut', money(brutEkDers));
    setRow('r-ekders-net', money(total.ocakNet - base.ocakNet));
    setRow('r-toplam-net', money(total.ocakNet));
    setRow('r-toplam-net-avg', money(total.ortalamaNet));
    fillTable(base);
  } catch (e) {
    result.classList.remove('is-active');
    showError(err, e.message);
  }
}

const round1 = (n) => Math.round(n * 10) / 10;

function applyPreset() {
  const s = params.unvanlar[$('f-unvan').value];
  if (!s) return;
  $('f-ek').value = s.ek_gosterge;
  $('f-oht').value = s.egitim_ogretim_tazminati_orani;
  $('f-yan').value = s.yan_odeme_puani;
}

async function init() {
  params = await loadParams(DEFAULT_PARAMS);
  fillParamInfo(params);
  setupDonem(params, render);
  for (const [k, v] of Object.entries(params.unvanlar)) $('f-unvan').add(new Option(v.ad, k));
  applyPreset();
  setupGosterge(params, render);
  $('f-unvan').addEventListener('change', () => { applyPreset(); render(); });
  ['f-gosterge', 'f-ek', 'f-oht', 'f-yan', 'f-ka', 'f-kt', 'f-ky', 'f-cocuk', 'f-cocuk06', 'f-gunduz', 'f-gece'].forEach((id) => $(id).addEventListener('input', render));
  ['f-es', 'f-eski', 'f-istisna'].forEach((id) => $(id).addEventListener('change', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
