export default {
  slug: 'silindir-yuzey-alani-hesapla',
  title: 'Silindir Yüzey Alanı Hesaplama',
  h1Tail: 'A = 2πr(r + h)',
  pageTitle: 'Silindir Yüzey Alanı Hesaplama – Yanal Alan ve Toplam Alan',
  description: 'Silindirin yanal ve toplam yüzey alanını yarıçap ya da çap ile yükseklikten hesaplayın. Kapalı, üstü açık ve yalnız yan yüzey seçenekleri, metrekare karşılığıyla.',
  card: 'Silindirin yanal ve toplam yüzey alanını bulun; kapalı, üstü açık kap ya da boru yüzeyi için ayrı seçenekler.',
  category: 'matematik',
  keywords: ['silindir yüzey alanı hesaplama', 'silindir yanal alan', 'silindirin alanı formülü', '2 pi r h', 'boru yüzey alanı hesaplama', 'tank yüzey alanı', 'silindir açınımı'],
  lead: `Silindirin yüzey alanını yarıçap (ya da çap) ve yükseklikten hesaplayın. İki tabanı kapalı silindirde toplam alan <strong>A = 2 · π · r · (r + h)</strong> olur; üstü açık kaplar ve boru gibi yalnız yan yüzeyi olan parçalar için de ayrı seçenek vardır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Girilen ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap']] },
    { id: 'deger', label: 'Yarıçap ya da çap', type: 'number', placeholder: 'Örn. 3' },
    { id: 'yukseklik', label: 'Yükseklik (ya da boy)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'tur', label: 'Hangi yüzeyler sayılsın?', type: 'select', options: [['kapali', 'İki tabanı kapalı silindir'], ['acik', 'Üstü açık kap (tek taban)'], ['yanal', 'Yalnız yan yüzey (boru, etiket)']] },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const cevre = 2 * Math.PI * r;
    const yanal = cevre * yuk;
    const tabanSayisi = v.tur === 'yanal' ? 0 : v.tur === 'acik' ? 1 : 2;
    const alan = yanal + tabanSayisi * taban;
    return {
      rows: [
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Metrekare karşılığı', `${h.fmt(alan * m2Kat, 4)} m²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Bir taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Taban çevresi', `${h.fmt(cevre, 4)} ${b}`],
        ['Hacim', `${h.fmt(taban * yuk, 4)} ${b}³`],
      ],
      note: tabanSayisi === 2 ? 'Yüzey alanı yan yüzey ile iki tabanın toplamıdır.' : tabanSayisi === 1 ? 'Yüzey alanı yan yüzey ile tek tabanın toplamıdır (üstü açık kap).' : 'Yüzey alanı yalnız yan yüzeydir; tabanlar sayılmamıştır.',
    };
  },
  cases: [
    { in: { olcu: 'r', deger: '3', yukseklik: '5', tur: 'kapali', birim: 'cm' }, out: { 'Yüzey alanı': '150,7964 cm²', 'Yanal alan': '94,2478 cm²', 'Bir taban alanı': '28,2743 cm²', 'Taban çevresi': '18,8496 cm', 'Metrekare karşılığı': '0,0151 m²' } },
    { in: { olcu: 'r', deger: '3', yukseklik: '5', tur: 'acik', birim: 'cm' }, out: { 'Yüzey alanı': '122,5221 cm²', 'Yanal alan': '94,2478 cm²' } },
    { in: { olcu: 'r', deger: '5', yukseklik: '10', tur: 'kapali', birim: 'cm' }, out: { 'Yüzey alanı': '471,2389 cm²', 'Yanal alan': '314,1593 cm²', 'Hacim': '785,3982 cm³' } },
    { in: { olcu: 'r', deger: '2', yukseklik: '7', tur: 'yanal', birim: 'cm' }, out: { 'Yüzey alanı': '87,9646 cm²' } },
    { in: { olcu: 'd', deger: '1', yukseklik: '2', tur: 'kapali', birim: 'm' }, out: { 'Yüzey alanı': '7,854 m²', 'Metrekare karşılığı': '7,854 m²', 'Yanal alan': '6,2832 m²' } },
    { in: { olcu: 'r', deger: '1', yukseklik: '1', tur: 'kapali', birim: 'm' }, out: { 'Yüzey alanı': '12,5664 m²' } },
    { in: { olcu: 'r', deger: '50', yukseklik: '200', tur: 'yanal', birim: 'mm' }, out: { 'Yüzey alanı': '62.831,8531 mm²', 'Metrekare karşılığı': '0,0628 m²' } },
    { in: { olcu: 'r', deger: '3', yukseklik: '-5', tur: 'kapali', birim: 'cm' }, error: true },
    { in: { olcu: 'd', deger: '', yukseklik: '5', tur: 'kapali', birim: 'cm' }, error: true },
  ],
  howto: [
    `Yarıçapı mı çapı mı gireceğinizi seçin ve değeri yazın.`,
    `Silindirin yüksekliğini (yatık duran boru ya da tankta boyunu) aynı birimle girin.`,
    `"Hangi yüzeyler sayılsın?" listesinden işinize uyanı seçin: kapalı kutu için iki taban, tencere ya da kova için tek taban, boru ya da etiket için yalnız yan yüzey.`,
    `Birimi seçip "Hesapla" düğmesine basın. Seçtiğiniz kapsama göre yüzey alanı, ayrıca yanal alan, bir taban alanı, taban çevresi ve hacim listelenir.`,
  ],
  sections: [
    { h: 'Silindirin açınımı ve formüller', p: [
      `Silindirin yüzey alanını anlamanın en kolay yolu onu açmaktır. Bir konserve kutusunun etiketini keserek düzleştirdiğinizde elinize bir <strong>dikdörtgen</strong> geçer. Bu dikdörtgenin bir kenarı kutunun yüksekliği (h), diğer kenarı tabanın çevresidir (2 · π · r). Dolayısıyla yan yüzeyin alanı <strong>2 · π · r · h</strong> olur. Geriye iki daire kalır; her birinin alanı π · r²\'dir.`,
    ], ul: [
      `<strong>Yanal alan:</strong> 2 · π · r · h`,
      `<strong>Bir taban alanı:</strong> π · r²`,
      `<strong>Kapalı silindirin toplam alanı:</strong> 2 · π · r · h + 2 · π · r² = 2 · π · r · (r + h)`,
      `<strong>Üstü açık kabın alanı:</strong> 2 · π · r · h + π · r²`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Yarıçapı 3 cm, yüksekliği 5 cm olan kapalı bir silindir alalım. Taban çevresi 2 · π · 3 = 6π ≈ 18,8496 cm\'dir. Yanal alan çevre çarpı yükseklik: 6π · 5 = 30π ≈ <strong>94,2478 cm²</strong>. Bir tabanın alanı 9π ≈ 28,2743 cm², iki taban birlikte 18π eder. Toplam yüzey alanı 30π + 18π = 48π ≈ <strong>150,7964 cm²</strong> bulunur.`,
      `Aynı ölçülerde üstü açık bir kap söz konusuysa yalnızca bir taban eklenir: 30π + 9π = 39π ≈ <strong>122,5221 cm²</strong>. Kabın yalnız yan yüzüne etiket yapıştırılacaksa gereken alan yanal alan kadardır, yani 94,2478 cm².`,
    ] },
    { h: 'Çözümlü örnek: depo boyama', p: [
      `Çapı 1 metre, yüksekliği 2 metre olan kapalı bir depoyu dıştan boyayacağınızı düşünelim. Yarıçap 0,5 m olduğundan yanal alan 2 · π · 0,5 · 2 = 2π ≈ 6,2832 m², iki tabanın toplamı 2 · π · 0,25 ≈ 1,5708 m², toplam yüzey <strong>7,854 m²</strong> olur. Deponun alt yüzü zemine oturuyorsa ve boyanmayacaksa "Üstü açık kap (tek taban)" seçeneğiyle tek tabanı sayabilirsiniz; bu durumda alan 7,0686 m²\'ye iner. Boya miktarı için bu alanı ürünün ambalajında yazan metrekare başına tüketim değeriyle ve kat sayısıyla çarpın.`,
    ] },
    { h: 'Hangi seçenek hangi iş için?', ul: [
      `<strong>İki tabanı kapalı:</strong> Konserve kutusu, kapalı tank, varil, dolu silindirik parça ve geometri sorularındaki "tüm alan".`,
      `<strong>Üstü açık (tek taban):</strong> Tencere, kova, bardak, saksı, kuyu bileziğinin tabanıyla birlikte iç yüzeyi.`,
      `<strong>Yalnız yan yüzey:</strong> Boru yalıtımı, kolon kaplaması, şişe etiketi, rulo sac açınımı, direk boyama.`,
    ] },
    { h: 'Sac, yalıtım ve kaplama hesaplarında ipuçları', p: [
      `Yan yüzey düz bir levhadan kıvrılarak yapılacaksa kesilecek dikdörtgenin ölçüleri bellidir: bir kenarı yükseklik, diğer kenarı taban çevresi kadar olmalıdır. Araç taban çevresini bu yüzden ayrı bir satırda verir. Birleşim payı, bindirme ve fire için bu ölçüye ekleme yapmak gerekir. Boru yalıtımında yüzey alanı borunun dış çapıyla hesaplanır; yalıtım malzemesinin dış yüzeyini kaplamak içinse yalıtım kalınlığının iki katı çapa eklenmelidir. İç yüzeyi boyanacak bir tankta dış çap yerine iç çap kullanılır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Yanal alan formülündeki 2πr ifadesini πr² ile karıştırmak, tabanları saymayı unutmak ya da açık kapta iki taban birden eklemek en sık görülen hatalardır. Çapı yarıçap yerine yazmak yanal alanı iki, taban alanlarını dört kat büyütür. Yarıçap ile yüksekliğin aynı birimde olmasına dikkat edin.`,
      `Araç dik dairesel silindiri esas alır. Bombeli tank kapakları, konik dipler, flanşlar ve bağlantı parçaları hesaba katılmaz. Sonuçlar bilgilendirme amaçlıdır; malzeme siparişi ve mühendislik gerektiren imalat işlerinde üretici verileri ve uzman hesabı esas alınmalı, fire payı ayrıca eklenmelidir.`,
    ] },
  ],
  faq: [
    ['Silindirin yüzey alanı nasıl hesaplanır?', 'Yan yüzey alanına iki tabanın alanı eklenir: A = 2 · π · r · h + 2 · π · r², kısaca 2 · π · r · (r + h). Yarıçapı 3 cm, yüksekliği 5 cm olan silindirde sonuç 48π ≈ 150,7964 cm² olur.'],
    ['Yanal alan nedir?', 'Silindirin tabanları dışındaki eğri yüzeyinin alanıdır. Açıldığında bir dikdörtgen olur ve alanı taban çevresi çarpı yüksekliktir: 2 · π · r · h.'],
    ['Üstü açık silindirin alanı nasıl bulunur?', 'Yanal alana yalnızca bir taban alanı eklenir: 2 · π · r · h + π · r². Araçta "Üstü açık kap (tek taban)" seçeneğini kullanabilirsiniz.'],
    ['Borunun yüzey alanını nasıl hesaplarım?', '"Yalnız yan yüzey" seçeneğini işaretleyin, borunun dış çapını ve boyunu girin. Yarıçapı 50 mm, boyu 200 mm olan bir boru parçasının dış yüzeyi yaklaşık 62.831,85 mm², yani 0,0628 m² eder.'],
    ['Çapı biliyorsam formül nasıl olur?', 'Yanal alan π · d · h, bir taban alanı π · d² ÷ 4 olur. Araçta "Çap" seçeneğini işaretlerseniz dönüşüm kendiliğinden yapılır.'],
    ['Yükseklik iki katına çıkarsa yüzey alanı da iki katına çıkar mı?', 'Yalnızca yanal alan iki katına çıkar; taban alanları değişmez. Bu yüzden kapalı silindirin toplam alanı iki kattan daha az artar.'],
    ['Aynı hacimde en az yüzey alanına sahip kapalı silindir hangisidir?', 'Yüksekliği çapına eşit olan silindirdir (h = 2r). Aynı hacim için daha uzun ya da daha basık bir silindir daha fazla malzeme gerektirir.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['silindir-hacmi-hesapla', 'koni-yuzey-alani-hesapla', 'kure-yuzey-alani-hesapla', 'daire-alani-hesapla', 'daire-cevresi-hesapla', 'boru-hacmi-hesapla'],
};
