// Elektrikli Araç Şarj Maliyeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kap = h.pos(v.kapasite, 'Batarya kapasitesi');
    const bas = h.nonneg(v.baslangic, 'Başlangıç şarj düzeyi');
    const hedef = h.pos(v.hedef, 'Hedef şarj düzeyi');
    if (hedef > 100) h.err('"Hedef şarj düzeyi" en fazla 100 olabilir.');
    if (bas >= hedef) h.err('Hedef şarj düzeyi, başlangıç düzeyinden büyük olmalı.');
    const fiyat = h.nonneg(v.fiyat, 'Birim fiyat');
    const kayip = h.opt(v.kayip, 10, 'Şarj kaybı');
    if (kayip < 0 || kayip >= 100) h.err('"Şarj kaybı" 0 ile 100 arasında olmalı (100 hariç).');
    const tuk = h.opt(v.tuketim, 17, 'Ortalama tüketim');
    if (!(tuk > 0)) h.err('"Ortalama tüketim" sıfırdan büyük olmalı.');
    const batarya = kap * (hedef - bas) / 100;
    const sebeke = batarya / (1 - kayip / 100);
    const maliyet = sebeke * fiyat;
    const menzil = batarya / tuk * 100;
    return {
      rows: [
        ['Şarj maliyeti', h.para(maliyet)],
        ['Bataryaya eklenen enerji', h.fmt(batarya, 2) + ' kWh'],
        ['Şebekeden çekilen enerji', h.fmt(sebeke, 2) + ' kWh'],
        ['Kazanılan menzil', h.fmt(menzil, 0) + ' km'],
        ['100 km maliyeti', h.para(maliyet / menzil * 100)],
        ['Kilometre başına maliyet', h.para(maliyet / menzil)],
      ],
      note: 'Menzil, girdiğiniz ortalama tüketime göre tahmindir; hız, sıcaklık, klima kullanımı ve yol eğimi gerçek değeri değiştirir.',
    };
  }
