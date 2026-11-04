// Öğretmen Maaşı ve Ek Ders Ücreti Hesaplama (tahmini) — tamamı tarayıcıda çalışır; veri ağa gitmez.
// Maaş hesap motoru memur maaşı sayfasıyla ortaktır (eğitim-öğretim hizmetleri sınıfı için parametreler farklıdır).
// Ek ders bu dosyada hesaplanır: gündüz 140, gece / hafta sonu / tatil 150 gösterge × aylık katsayı (657 s. K. md. 176).
import { showError } from '../assets/js/ba.js';
import { calcMemur, round2 } from '../memur-maas-hesapla/calc.js';
import { $, money, loadParams, setupGosterge, readCommon, reqNum, setRow, fillTable, fillParamInfo, setupDonem } from '../memur-maas-hesapla/ui.js';

// parametreler.json yüklenemezse kullanılacak yerleşik değerler (dosyayla aynı tutulur).
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-05', yaklasik: true, yil: 2026, asgari_ucret_brut: 33030, asgari_sgk_isci_orani: 14, asgari_issizlik_isci_orani: 1,
  damga_vergisi_orani: 0.759, kaynak: 'Yerleşik değerler: ek ders göstergesi gündüz 140, gece / hafta sonu 150 (657 sayılı Kanun md. 176); 2026 brüt asgari ücret 33.030 TL. Katsayıları resmî duyuruyla teyit edin.',
  gelir_vergisi_dilimleri: [{ ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 }, { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 }],
  taban_aylik_gostergesi: 1000, emekli_kesenegi_4c: 9, gss_orani: 5, emekli_kesenegi_5434: 16,
  // 4/c kurum payları (maaştan kesilmez) ve 2026 prime esas kazanç sınırları (tavan = günlük alt sınır × 9).
  gss_orani_5434: 0, kurum_myo_orani_4c: 12, kurum_gss_orani_4c: 7.5, kurum_gss_orani_5434: 12,
  prim_alt_sinir_gunluk: 1101, prim_alt_sinir_aylik: 33030, prim_ust_sinir_katsayi: 9, prim_ust_sinir_gunluk: 9909, prim_ust_sinir_aylik: 297270,
  ek_ders_gostergesi: 140, ek_ders_gostergesi_gece: 150, aylik_hafta_sayisi: 4,
  unvanlar: {
    ogretmen: { ad: 'Öğretmen', ek_gosterge: 3600, egitim_ogretim_tazminati_orani: 90, yan_odeme_puani: 1000 },
    uzman: { ad: 'Uzman öğretmen', ek_gosterge: 4200, egitim_ogretim_tazminati_orani: 95, yan_odeme_puani: 1100 },
    bas: { ad: 'Başöğretmen', ek_gosterge: 4800, egitim_ogretim_tazminati_orani: 100, yan_odeme_puani: 1200 },
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

/** Ek ders birim ücreti: gösterge × aylık katsayı. Gece / hafta sonu / tatil dersinde gösterge 150'dir (yüzde artış değil). */
export function ekDersUnit(p, aylikKatsayi, gece = false) {
  return round2((gece ? p.ek_ders_gostergesi_gece : p.ek_ders_gostergesi) * aylikKatsayi);
}

/** Haftalık gündüz ve gece / hafta sonu saatlerinden aylık brüt ek ders ücreti. */
export function ekDersBrut(p, aylikKatsayi, gunduzHaftalik, geceHaftalik) {
  const hafta = p.aylik_hafta_sayisi;
  return round2(gunduzHaftalik * hafta * ekDersUnit(p, aylikKatsayi, false) + geceHaftalik * hafta * ekDersUnit(p, aylikKatsayi, true));
}

/** Seçili katsayı dönemi yaklaşık değerlere dayanıyorsa görünür not gösterir. */
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
    const gunduz = reqNum('f-gunduz', 'Gündüz ek ders saati', { allowZero: true, max: 60 });
    const gece = reqNum('f-gece', 'Gece / hafta sonu ek ders saati', { allowZero: true, max: 60 });
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
