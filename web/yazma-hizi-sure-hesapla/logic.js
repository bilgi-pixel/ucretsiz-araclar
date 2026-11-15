// Yazma Hızına Göre Süre Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const u = h.pos(v.uzunluk, 'Metin uzunluğu');
    const hiz = h.pos(v.hiz, 'Yazma hızı');
    const pay = h.nonneg(String(h.opt(v.pay, 0, 'Düzeltme payı')), 'Düzeltme payı');
    if (hiz > 400) h.err('Yazma hızı dakikada 400 kelimeden büyük olamaz; değeri kontrol edin.');
    if (pay > 500) h.err('Düzeltme payı en fazla %500 olabilir.');
    if (u > 1e9) h.err('Metin uzunluğu çok büyük.');
    const kelime = v.birim === 'karakter' ? u / 5 : u;
    const dk = (kelime / hiz) * (1 + pay / 100);
    const sn = Math.round(dk * 60);
    const sa = Math.floor(sn / 3600), d = Math.floor((sn % 3600) / 60), s = sn % 60;
    const parca = [];
    if (sa > 0) parca.push(`${h.fmt(sa, 0)} sa`);
    if (d > 0 || (sa > 0 && s > 0)) parca.push(`${d} dk`);
    if (s > 0 || parca.length === 0) parca.push(`${s} sn`);
    return {
      rows: [
        ['Tahmini süre', parca.join(' ')],
        ['Toplam dakika', h.fmt(dk, 2) + ' dk'],
        ['Kelime karşılığı', h.fmt(kelime, 1) + ' kelime'],
        ['Vuruş karşılığı', h.fmt(kelime * 5, 0) + ' vuruş'],
        ['Dakikadaki vuruş', h.fmt(hiz * 5, 0) + ' vuruş/dk'],
        ['Pay dahil saatlik üretim', h.fmt((hiz * 60) / (1 + pay / 100), 0) + ' kelime/saat'],
      ],
      note: 'Hız testlerindeki standart kabulle 1 kelime = 5 vuruş (boşluk dahil) alınmıştır. Süre yalnızca yazmayı kapsar; metni tasarlama ve gözden geçirme süresi için pay ekleyin.',
    };
  }
