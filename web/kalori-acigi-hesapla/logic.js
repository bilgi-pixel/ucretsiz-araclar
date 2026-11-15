// Kalori Açığı ve Kilo Verme Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    const ihtiyac = h.pos(v.ihtiyac, 'Günlük kalori ihtiyacı');
    const alinan = h.pos(v.alinan, 'Günlük alınan kalori');
    if (mevcut < 30 || mevcut > 400) h.err('Mevcut kilo 30 ile 400 kg arasında olmalı.');
    if (hedef < 30) h.err('Hedef kilo 30 kg\'dan küçük olamaz.');
    if (hedef >= mevcut) h.err('Hedef kilo mevcut kilodan küçük olmalı. Kilo almak için "Kilo Alma İçin Kalori Hesaplama" aracını kullanın.');
    if (ihtiyac < 800 || ihtiyac > 10000) h.err('Günlük kalori ihtiyacı 800 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2500).');
    if (alinan < 500 || alinan > 10000) h.err('Günlük alınan kalori 500 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2000).');
    if (alinan >= ihtiyac) h.err('Kalori açığı oluşması için alınan kalori ihtiyaçtan düşük olmalı.');
    const KG = 7700;
    const acik = ihtiyac - alinan;
    const kilo = mevcut - hedef;
    const toplam = kilo * KG;
    const gun = Math.max(1, Math.ceil(toplam / acik - 1e-9));
    const haftalik = acik * 7 / KG;
    const uyari = [];
    if (acik > 1000 + 1e-9) uyari.push('Günlük açık 1000 kcal\'nin üzerinde; bu kadar büyük açık genellikle sürdürülemez ve kas kaybını artırabilir.');
    if (alinan < 1200) uyari.push('Günlük 1200 kcal\'nin altındaki planlar yalnızca sağlık uzmanı gözetiminde uygulanmalıdır.');
    return {
      rows: [
        ['Günlük kalori açığı', h.fmt(acik, 0) + ' kcal'],
        ['Tahmini haftalık kilo kaybı', h.fmt(haftalik, 2) + ' kg'],
        ['Verilecek kilo', h.fmt(kilo, 1) + ' kg'],
        ['Tahmini süre', `${h.fmt(gun, 0)} gün (yaklaşık ${h.fmt(gun / 7, 1)} hafta)`],
        ['Toplam kalori açığı', h.fmt(toplam, 0) + ' kcal'],
        ['Açığın ihtiyaca oranı', '%' + h.fmt(acik / ihtiyac * 100, 1)],
      ],
      note: (uyari.length ? uyari.join(' ') + ' ' : '') + '1 kg vücut yağı yaklaşık 7700 kcal kabul edildi; gerçek kilo kaybı doğrusal ilerlemez, süre tahmindir.',
    };
  }
