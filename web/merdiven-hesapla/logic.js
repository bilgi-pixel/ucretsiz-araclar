// Merdiven Basamak Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const H = h.pos(v.yukseklik, 'Toplam yükseklik');
    const hedef = h.pos(v.riht, 'Hedef rıht yüksekliği');
    if (hedef > H) h.err('Hedef rıht yüksekliği toplam yükseklikten büyük olamaz.');
    const n = Math.max(1, Math.round(H / hedef));
    const r = H / n;
    const bos = String(v.basis ?? '').trim() === '';
    const b = bos ? 63 - 2 * r : h.pos(v.basis, 'Basış genişliği');
    if (!(b > 0)) h.err('Bu rıht yüksekliğiyle 63 − 2 × rıht kuralı geçerli bir basış vermiyor. Hedef rıhtı küçültün ya da basış genişliğini kendiniz yazın.');
    const basisSay = n - 1;
    const L = basisSay * b;
    const aci = Math.atan(r / b) * 180 / Math.PI;
    const limon = Math.sqrt(H * H + L * L);
    const konfor = 2 * r + b;
    let durum = 'Adım kuralı 60–64 cm aralığında; yürüyüş rahat kabul edilir.';
    if (konfor < 60 - 1e-9) durum = 'Adım kuralı 60 cm altında; basamaklar kısa adım gerektirir.';
    else if (konfor > 64 + 1e-9) durum = 'Adım kuralı 64 cm üzerinde; basamaklar uzun adım gerektirir.';
    return {
      rows: [
        ['Rıht sayısı', h.fmt(n, 0) + ' adet'],
        ['Rıht yüksekliği', h.fmt(r, 2) + ' cm'],
        ['Basış genişliği', h.fmt(b, 2) + ' cm'],
        ['Basış (basamak) sayısı', h.fmt(basisSay, 0) + ' adet'],
        ['Merdivenin yatay uzunluğu', h.fmt(L, 2) + ' cm'],
        ['Eğim açısı', h.fmt(aci, 2) + '°'],
        ['Limon (eğik) uzunluk', h.fmt(limon, 2) + ' cm'],
        ['2h + b değeri', h.fmt(konfor, 2) + ' cm'],
      ],
      note: durum + ' Son basış üst kat döşemesi sayıldığından basış sayısı rıht sayısından bir eksiktir. Rıht yüksekliği ve basış genişliği için yürürlükteki imar yönetmeliğinin sınırlarını ayrıca kontrol edin.',
    };
  }
