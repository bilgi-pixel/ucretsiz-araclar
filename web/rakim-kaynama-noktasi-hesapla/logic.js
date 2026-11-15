// Rakıma Göre Suyun Kaynama Noktası Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.num(v.rakim, 'Rakım');
    if (y < -500 || y > 11000) h.err('Rakım −500 m ile 11.000 m arasında olmalı; değeri metre cinsinden yazın.');
    const basinc = (m) => 101.325 * Math.pow(1 - 2.25577e-5 * m, 5.25588);
    const kaynama = (kPa) => 1730.63 / (8.07131 - Math.log10((kPa * 760) / 101.325)) - 233.426;
    const P = basinc(y);
    const T = kaynama(P);
    const T0 = kaynama(101.325);
    let etki;
    if (y < 300) etki = 'Deniz seviyesine yakın; tariflerdeki süreler geçerlidir';
    else if (y < 1000) etki = 'Hafif: uzun haşlamalarda süre biraz uzar';
    else if (y < 2500) etki = 'Belirgin: bakliyat, makarna ve yumurta daha geç pişer';
    else etki = 'Yüksek: haşlama çok uzar, düdüklü tencere önerilir';
    return {
      rows: [
        ['Suyun kaynama noktası', h.fmt(T, 1) + ' °C'],
        ['Kaynama noktası (Fahrenhayt)', h.fmt(T * 1.8 + 32, 1) + ' °F'],
        ['Deniz seviyesine göre fark', h.fmt(T - T0, 1) + ' °C'],
        ['Standart hava basıncı', `${h.fmt(P * 10, 0)} hPa (${h.fmt(P * 7.50062, 0)} mmHg)`],
        ['Deniz seviyesi basıncına oranı', '%' + h.fmt((P / 101.325) * 100, 1)],
        ['Pişirmeye etkisi', etki],
      ],
      note: 'Basınç, standart atmosfer modeline göre hesaplanır; günlük hava durumu basıncı birkaç yüzde oynatabilir ve kaynama noktasını yaklaşık ±1 °C değiştirebilir. Hesap saf su içindir.',
    };
  }
