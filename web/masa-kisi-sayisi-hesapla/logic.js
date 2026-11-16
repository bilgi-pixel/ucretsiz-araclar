// Masa Boyutuna Göre Kişi Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const pay = h.pos(v.pay, 'Kişi başı kenar payı');
    if (pay < 45 || pay > 100) h.err('Kişi başı kenar payı 45 ile 100 cm arasında olmalı; rahat düzen için 60 yazın.');
    const sikPay = pay - 10;
    const kat = (x, p) => Math.floor(x / p + 1e-9);
    const m = (cm) => h.fmt(cm / 100, 2);
    if (v.sekil === 'yuvarlak') {
      const cap = h.pos(v.uzunluk, 'Çap');
      if (cap > 1000) h.err('Çap 1000 cm\'den büyük olamaz; değeri santimetre olarak yazın.');
      const cevre = Math.PI * cap;
      const rahat = kat(cevre, pay);
      if (rahat < 1) h.err('Bu çapta bir masaya kişi sığmıyor; çapı santimetre olarak yazdığınızdan emin olun.');
      return {
        rows: [
          ['Rahat oturan kişi sayısı', rahat + ' kişi'],
          ['Sıkışık düzende', `${kat(cevre, sikPay)} kişi (kişi başı ${h.fmt(sikPay, 0)} cm)`],
          ['Dağılım', `Çevre boyunca ${rahat} kişi, kişi başına ${h.fmt(cevre / rahat, 1)} cm`],
          ['Masa çevresi', h.fmt(cevre, 0) + ' cm'],
          ['Masa alanı', h.fmt(Math.PI * cap * cap / 40000, 2) + ' m²'],
          ['Sandalyelerle gereken alan', `${m(cap + 180)} × ${m(cap + 180)} m`],
        ],
        note: 'Yuvarlak masada kişi sayısı çevrenin kişi başı paya bölünmesiyle bulunur. Davet salonlarında masalar daha sıkışık oturumla anılır (örneğin 180 cm masa çoğu yerde "10 kişilik" sayılır); rahat oturum için buradaki sayı esas alınabilir, daha sıkışık düzen için kişi başı payı küçültün. Gereken alan, masanın her yanında sandalye ve geçiş için 90 cm bırakılarak hesaplanmıştır.',
      };
    }
    let L = h.pos(v.uzunluk, 'Uzunluk');
    let W = h.pos(v.genislik, 'Genişlik');
    if (W > L) { const t = L; L = W; W = t; }
    if (L > 1000) h.err('Uzunluk 1000 cm\'den büyük olamaz; değeri santimetre olarak yazın.');
    const basVar = v.bas !== 'hayir';
    const say = (p) => {
      const yan = kat(L, p);
      const b = basVar && W >= p - 1e-9 ? 1 : 0;
      return { yan, b, top: 2 * yan + 2 * b };
    };
    const r = say(pay), s = say(sikPay);
    if (r.top < 1) h.err('Bu ölçüde bir masaya kişi sığmıyor; ölçüleri santimetre olarak yazdığınızdan emin olun.');
    return {
      rows: [
        ['Rahat oturan kişi sayısı', r.top + ' kişi'],
        ['Sıkışık düzende', `${s.top} kişi (kişi başı ${h.fmt(sikPay, 0)} cm)`],
        ['Dağılım', `Uzun kenarlarda ${r.yan}+${r.yan}` + (r.b ? ', başlarda 1+1' : ', başlar boş')],
        ['Masa çevresi', h.fmt(2 * (L + W), 0) + ' cm'],
        ['Masa alanı', h.fmt(L * W / 10000, 2) + ' m²'],
        ['Sandalyelerle gereken alan', `${m(L + 180)} × ${m(W + 180)} m`],
      ],
      note: (basVar && !r.b ? 'Masa genişliği kişi başı paydan dar olduğu için başlara oturma sayılmadı. ' : '') + 'Gereken alan, masanın her yanında sandalye ve geçiş için 90 cm bırakılarak hesaplanmıştır. Masa ayaklarının konumu köşe yerlerini kısıtlayabilir.',
    };
  }
