export default {
  slug: 'farad-mikrofarad-cevir',
  title: 'Farad Mikrofarad Nanofarad Çevirici',
  h1Tail: 'F ↔ µF ↔ nF ↔ pF',
  pageTitle: `Farad Mikrofarad Nanofarad Çevirici – µF, nF, pF Çevirme`,
  description: `Kondansatör kapasitesini farad, milifarad, mikrofarad, nanofarad ve pikofarad arasında çevirin; 104, 472 gibi üç haneli gövde kodunu da görün.`,
  card: `Kapasite değerini F, mF, µF, nF ve pF arasında çevirin; kondansatör üzerindeki üç haneli kodu da öğrenin.`,
  category: 'birim',
  keywords: ['mikrofarad nanofarad çevirme', 'nanofarad pikofarad çevirme', '100 nF kaç µF', 'farad mikrofarad', 'kondansatör birim çevirme', 'uF nF pF çevirici', '104 kondansatör kaç nF'],
  lead: `Bir kapasite değerini farad (F), milifarad (mF), mikrofarad (µF), nanofarad (nF) ve pikofarad (pF) arasında çevirin. Araç, hedef birimdeki sonucun yanında tüm karşılıkları ve seramik kondansatörlerin üzerinde yazan <strong>üç haneli kodu</strong> da verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Kapasite değeri', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['nf', 'Nanofarad (nF)'], ['uf', 'Mikrofarad (µF)'], ['pf', 'Pikofarad (pF)'], ['mf', 'Milifarad (mF)'], ['f', 'Farad (F)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['uf', 'Mikrofarad (µF)'], ['nf', 'Nanofarad (nF)'], ['pf', 'Pikofarad (pF)'], ['mf', 'Milifarad (mF)'], ['f', 'Farad (F)']] },
  ],
  compute(v, h) {
    // Taban birim pikofarad: çarpanlar tam sayı kalır.
    const birimler = {
      f: [1e12, 'F', 'Farad'],
      mf: [1e9, 'mF', 'Milifarad'],
      uf: [1e6, 'µF', 'Mikrofarad'],
      nf: [1e3, 'nF', 'Nanofarad'],
      pf: [1, 'pF', 'Pikofarad'],
    };
    const x = h.nonneg(v.deger, 'Kapasite değeri');
    const k = birimler[v.kaynak] || birimler.nf;
    const t = birimler[v.hedef] || birimler.uf;
    const pf = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(pf / b[0], 9) + ' ' + b[1];
    // Üç haneli kod: iki anlamlı basamak + sıfır sayısı (pF cinsinden).
    let kod = 'Yok (değer iki anlamlı basamakla yazılamıyor)';
    if (pf >= 10) {
      let e = Math.floor(Math.log10(pf) + 1e-9) - 1;
      let m = pf / Math.pow(10, e);
      let mr = Math.round(m);
      if (mr === 100) { mr = 10; e += 1; }
      if (Math.abs(m - mr) < 1e-6 && e <= 9) kod = String(mr) + String(e);
    } else if (pf > 0) {
      kod = 'Yok (10 pF altı doğrudan yazılır)';
    }
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Farad', yaz(birimler.f)],
        ['Milifarad', yaz(birimler.mf)],
        ['Mikrofarad', yaz(birimler.uf)],
        ['Nanofarad', yaz(birimler.nf)],
        ['Pikofarad', yaz(birimler.pf)],
        ['Üç haneli kod', kod],
      ],
      note: '1 µF = 1.000 nF = 1.000.000 pF. Üç haneli kodda ilk iki rakam değeri, üçüncü rakam eklenecek sıfır sayısını pF cinsinden gösterir.',
    };
  },
  cases: [
    { in: { deger: '100', kaynak: 'nf', hedef: 'uf' }, out: { 'Sonuç': '0,1 µF', 'Pikofarad': '100.000 pF', 'Üç haneli kod': '104' } },
    { in: { deger: '4,7', kaynak: 'nf', hedef: 'pf' }, out: { 'Sonuç': '4.700 pF', 'Mikrofarad': '0,0047 µF', 'Üç haneli kod': '472' } },
    { in: { deger: '1', kaynak: 'f', hedef: 'uf' }, out: { 'Sonuç': '1.000.000 µF', 'Milifarad': '1.000 mF' } },
    { in: { deger: '2200', kaynak: 'uf', hedef: 'mf' }, out: { 'Sonuç': '2,2 mF', 'Farad': '0,0022 F' } },
    { in: { deger: '22', kaynak: 'pf', hedef: 'nf' }, out: { 'Sonuç': '0,022 nF', 'Üç haneli kod': '220' } },
    { in: { deger: '1', kaynak: 'uf', hedef: 'nf' }, out: { 'Sonuç': '1.000 nF', 'Pikofarad': '1.000.000 pF', 'Üç haneli kod': '105' } },
    { in: { deger: '0,33', kaynak: 'uf', hedef: 'nf' }, out: { 'Sonuç': '330 nF', 'Üç haneli kod': '334' } },
    { in: { deger: 'yüz', kaynak: 'nf', hedef: 'uf' }, error: true },
    { in: { deger: '-10', kaynak: 'nf', hedef: 'uf' }, error: true },
  ],
  howto: [
    `"Kapasite değeri" alanına kondansatörün değerini yazın; ondalık için virgül kullanabilirsiniz (örn. 4,7).`,
    `"Girilen birim" listesinden değerin birimini seçin. Şemalarda uF olarak yazılan birim mikrofaraddır (µF).`,
    `"Çevrilecek birim" listesinden sonucu hangi birimde görmek istediğinizi belirleyin.`,
    `"Çevir" düğmesine basın; ilk satır hedef birimdeki sonucu, diğer satırlar beş birimin tamamındaki karşılıkları gösterir.`,
    `Seramik ya da film kondansatör arıyorsanız "Üç haneli kod" satırındaki sayıyı parça gövdesindeki baskıyla karşılaştırın.`,
  ],
  sections: [
    { h: 'Farad neden bu kadar büyük bir birim?', p: [
      `Farad (F), kapasitenin SI birimidir: uçları arasındaki gerilim 1 volt arttığında 1 coulomb yük depolayan kondansatörün kapasitesi 1 farad'dır. Bu, elektronik devrelerin gündelik ölçeğine göre çok büyük bir değerdir. Bir devre kartındaki kondansatörlerin neredeyse tamamı faradın milyonda biri, milyarda biri ya da trilyonda biri düzeyindedir. Tam farad ve üzeri değerler ancak süper kapasitör denilen özel enerji depolama elemanlarında görülür.`,
      `Bu yüzden pratikte alt katlar kullanılır: <strong>1 F = 1.000 mF = 1.000.000 µF</strong>, <strong>1 µF = 1.000 nF</strong> ve <strong>1 nF = 1.000 pF</strong>. Her basamak bir öncekinin binde biridir. Mikrofaraddan nanofarada geçerken 1.000 ile çarpar, nanofaraddan mikrofarada geçerken 1.000'e bölersiniz; mikrofarad ile pikofarad arasında çarpan bir milyondur.`,
    ] },
    { h: 'Çözümlü örnek: 100 nF kaç mikrofarad?', p: [
      `Entegre devrelerin besleme bacaklarına konan klasik filtre kondansatörü 100 nF'tır. Mikrofarad karşılığı 100 ÷ 1.000 = <strong>0,1 µF</strong>, pikofarad karşılığı 100 × 1.000 = 100.000 pF olur. Aynı parça bir katalogda 0,1 µF, bir başkasında 100 nF, gövdesinde ise 104 olarak yazılabilir; üçü de aynı kondansatördür.`,
      `İkinci örnek: 4,7 nF değerinde bir film kondansatör arıyorsunuz. Pikofarad cinsinden 4,7 × 1.000 = 4.700 pF, mikrofarad cinsinden 0,0047 µF eder; gövde kodu 472'dir. Güç kaynaklarındaki büyük elektrolitik kondansatörlerde ise yön tersine döner: 2.200 µF, 2,2 mF ya da 0,0022 F demektir.`,
    ] },
    { h: 'Üç haneli kondansatör kodu nasıl çözülür?', p: [
      `Küçük seramik ve film kondansatörlerin üzerine birim sığmadığı için değer üç rakamla yazılır. İlk iki rakam değerin anlamlı basamaklarıdır, üçüncü rakam ise bu sayının sonuna eklenecek sıfır adedini bildirir; sonuç her zaman <strong>pikofarad</strong> cinsindendir. 104 kodu 10 ve dört sıfır, yani 100.000 pF = 100 nF eder.`,
    ], ul: [
      `<code>220</code> = 22 pF`,
      `<code>101</code> = 100 pF`,
      `<code>102</code> = 1.000 pF = 1 nF`,
      `<code>472</code> = 4.700 pF = 4,7 nF`,
      `<code>103</code> = 10.000 pF = 10 nF`,
      `<code>104</code> = 100.000 pF = 100 nF = 0,1 µF`,
      `<code>334</code> = 330.000 pF = 330 nF = 0,33 µF`,
      `<code>105</code> = 1.000.000 pF = 1 µF`,
    ] },
    { h: 'Hangi kondansatör türünde hangi birim görülür?', p: [
      `Pikofarad bölgesi, radyo frekansı devrelerinin ve kristal osilatörlerin alanıdır; kristalin iki yanındaki yük kondansatörleri tipik olarak onlarca pikofarad düzeyindedir. Nanofarad bölgesi filtreleme, zamanlama ve sinyal kuplajında kullanılan seramik ve film kondansatörleri kapsar.`,
      `Mikrofarad bölgesinde elektrolitik ve tantal kondansatörler öne çıkar; besleme hattındaki dalgalanmayı yumuşatırlar. Motor kalkış ve daimi devre kondansatörleri de mikrofaradla etiketlenir; klima, pompa ya da çamaşır makinesi motoru için parça ararken etiketteki µF değerini aynen karşılamanız gerekir. Bazı eski ya da yabancı kaynaklı etiketlerde mikrofarad MFD ya da uF biçiminde yazılır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>µ yerine m okumak:</strong> eski şemalarda "mF" kimi zaman mikrofarad anlamında kullanılmıştır. Değer devrenin geri kalanıyla uyuşmuyorsa bu olasılığı düşünün; SI yazımında mF milifaraddır.`,
      `<strong>Kodun üçüncü rakamını değer sanmak:</strong> 104, yüz dört pikofarad değildir; 10 ve dört sıfırdır.`,
      `<strong>Üç basamak yerine altı basamak kaydırmak:</strong> nanofarad ile mikrofarad arasında bin, pikofarad ile mikrofarad arasında bir milyon kat vardır. 1.000 pF değeri 1 µF değil 1 nF'tır.`,
      `<strong>Yalnızca kapasiteye bakmak:</strong> yedek parça seçerken çalışma gerilimi, tolerans ve tür de uymalıdır. Kapasitesi aynı ama gerilim değeri düşük bir kondansatör devrede hasar görebilir.`,
    ] },
    { h: 'Sınırlar ve güvenlik notu', p: [
      `Araç yalnızca birim dönüştürür; kondansatörün gerilimine, toleransına ya da türüne ilişkin bir değerlendirme yapmaz. Üç haneli kod yalnızca değer iki anlamlı basamakla ifade edilebildiğinde üretilir; örneğin 123 pF için standart bir kod yoktur. 10 pF'ın altındaki değerler gövdeye çoğunlukla doğrudan yazıldığı için bu aralıkta da kod verilmez.`,
      `Sonuçlar bilgilendirme amaçlıdır. Büyük kondansatörler, cihazın fişi çekildikten sonra da tehlikeli düzeyde yük tutabilir. Güç kaynağı, motor ya da klima kondansatörü değiştirirken parçayı uygun biçimde boşaltmadan dokunmayın ve emin olmadığınız işlerde yetkili bir teknisyenden destek alın.`,
    ] },
  ],
  faq: [
    ['1 mikrofarad kaç nanofarad eder?', `1 mikrofarad 1.000 nanofarad eder. Mikrofarad değerini 1.000 ile çarparak nanofarada, nanofarad değerini 1.000'e bölerek mikrofarada çevirirsiniz.`],
    ['100 nF kaç µF eder?', `100 nF, 0,1 µF eder; pikofarad cinsinden 100.000 pF'tır. Seramik kondansatörlerde bu değer 104 koduyla gösterilir.`],
    ['104 yazan kondansatör kaç nanofaraddır?', `104 kodu 10 sayısının ardına dört sıfır eklenmesi demektir: 100.000 pF. Bu da 100 nF, yani 0,1 µF eder.`],
    ['uF ile µF aynı şey midir?', `Evet. Klavyede µ harfi kolay yazılamadığı için şemalarda ve parça listelerinde mikrofarad çoğu zaman uF olarak yazılır. İkisi de faradın milyonda biridir.`],
    ['1 nanofarad kaç pikofarad eder?', `1 nanofarad 1.000 pikofarad eder. Örneğin 2,2 nF değeri 2.200 pF'a, 47 pF değeri ise 0,047 nF'a karşılık gelir.`],
    ['Kondansatör üzerindeki MFD ne anlama gelir?', `MFD, özellikle motor ve klima kondansatörlerinde mikrofarad için kullanılan eski bir kısaltmadır. 35 MFD yazan bir parça 35 µF kapasitelidir.`],
    ['Koddan sonra gelen J ya da K harfi nedir?', `Bu harfler toleransı gösterir; yaygın kullanımda J yüzde 5, K yüzde 10, M yüzde 20 tolerans anlamına gelir. Harf kapasite değerini değiştirmez, yalnızca parçanın bu değerden ne kadar sapabileceğini belirtir.`],
    ['Girdiğim değerler sunucuya gönderiliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız kapasite değeri hiçbir yere iletilmez ve saklanmaz. Sayfa bir kez yüklendikten sonra çevrimdışı da çalışır.`],
  ],
  related: ['kondansator-kodu-coz', 'kondansator-seri-paralel-hesapla', 'rc-zaman-sabiti-hesapla', 'kondansator-enerjisi-hesapla', 'ohm-kiloohm-cevir'],
};
