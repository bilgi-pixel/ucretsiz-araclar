export default {
  slug: 'kira-getirisi-hesapla',
  title: 'Kira Getirisi ve Amortisman Süresi Hesaplama',
  h1Tail: 'brüt ve net',
  pageTitle: 'Kira Getirisi Hesaplama – Amortisman Süresi (Kaç Yılda Öder?)',
  description: "Satın alma fiyatı ve aylık kiradan brüt ve net kira getirisini, evin kaç yılda ve kaç ayda kendini amorti edeceğini giderler ve boş kalma süresiyle hesaplayın.",
  card: "Bir evin ya da dükkânın kira getirisini ve kendini kaç yılda amorti edeceğini brüt ve net olarak hesaplayın.",
  category: 'finans',
  keywords: ['kira getirisi hesaplama', 'amortisman süresi hesaplama', 'ev kaç yılda kendini öder', 'kira çarpanı', 'brüt kira getirisi', 'net kira getirisi', 'kira amortisman', 'gayrimenkul geri dönüş süresi'],
  lead: "Bir gayrimenkulün satın alma fiyatını ve aylık kirasını yazın; araç <strong>yıllık kira getirisini</strong> yüzde olarak, <strong>amortisman süresini</strong> ise yıl ve ay olarak hesaplasın. Yıllık giderleri ve boş kalma süresini de girerseniz brüt sonucun yanında net sonucu görürsünüz.",
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Satın alma fiyatı (TL)', type: 'number', placeholder: 'Örn. 3000000', hint: 'Binlik ayraç kullanmayın ya da 3.000.000,00 biçiminde yazın.' },
    { id: 'kira', label: 'Aylık kira (TL)', type: 'number', placeholder: 'Örn. 15000', hint: 'Binlik ayraç kullanmayın ya da 15.000,00 biçiminde yazın.' },
    { id: 'gider', label: 'Yıllık giderler (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 24000', hint: 'Vergi, sigorta, bakım, aidat gibi mal sahibinin ödediği yıllık toplam.' },
    { id: 'bosAy', label: 'Yılda boş kalan süre (ay, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1' },
  ],
  compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Satın alma fiyatı');
    const kira = h.pos(v.kira, 'Aylık kira');
    const gider = h.opt(v.gider, 0, 'Yıllık giderler');
    const bos = h.opt(v.bosAy, 0, 'Yılda boş kalan süre');
    if (gider < 0) h.err('"Yıllık giderler" negatif olamaz.');
    if (bos < 0 || bos > 12) h.err('"Yılda boş kalan süre" 0 ile 12 ay arasında olmalı.');
    const brut = kira * 12;
    const net = kira * (12 - bos) - gider;
    const brutYil = fiyat / brut;
    const rows = [
      ['Brüt kira getirisi', '%' + h.fmt(brut / fiyat * 100, 2)],
      ['Amortisman süresi (brüt)', `${h.fmt(brutYil, 2)} yıl (${h.fmt(fiyat / kira, 1)} ay)`],
      ['Yıllık brüt kira', h.para(brut)],
      ['Yıllık net kira', h.para(net)],
      ['Net kira getirisi', '%' + h.fmt(net / fiyat * 100, 2)],
      ['Amortisman süresi (net)', net > 1e-9 ? `${h.fmt(fiyat / net, 2)} yıl` : 'Hesaplanamaz (net kira geliri yok)'],
    ];
    return { rows, note: 'Kira ve fiyatın sabit kaldığı varsayılır; kira artışı, değer artışı, enflasyon ve gelir vergisi hesaba katılmaz.' };
  },
  cases: [
    { in: { fiyat: '3000000', kira: '15000' }, out: { 'Brüt kira getirisi': '%6', 'Amortisman süresi (brüt)': '16,67 yıl (200 ay)', 'Yıllık brüt kira': '180.000,00 TL' } },
    { in: { fiyat: '2400000', kira: '20000', gider: '24000', bosAy: '1' }, out: { 'Brüt kira getirisi': '%10', 'Amortisman süresi (brüt)': '10 yıl (120 ay)', 'Yıllık net kira': '196.000,00 TL', 'Net kira getirisi': '%8,17', 'Amortisman süresi (net)': '12,24 yıl' } },
    { in: { fiyat: '5000000', kira: '25000', gider: '60000' }, out: { 'Brüt kira getirisi': '%6', 'Yıllık net kira': '240.000,00 TL', 'Net kira getirisi': '%4,8', 'Amortisman süresi (net)': '20,83 yıl' } },
    { in: { fiyat: '1200000', kira: '10000' }, out: { 'Brüt kira getirisi': '%10', 'Amortisman süresi (brüt)': '10 yıl (120 ay)', 'Amortisman süresi (net)': '10 yıl' } },
    { in: { fiyat: '4000000', kira: '16000', bosAy: '2' }, out: { 'Brüt kira getirisi': '%4,8', 'Amortisman süresi (brüt)': '20,83 yıl (250 ay)', 'Yıllık net kira': '160.000,00 TL', 'Net kira getirisi': '%4', 'Amortisman süresi (net)': '25 yıl' } },
    { in: { fiyat: '1000000', kira: '1000', gider: '20000' }, out: { 'Yıllık net kira': '-8.000,00 TL', 'Amortisman süresi (net)': 'Hesaplanamaz (net kira geliri yok)' } },
    { in: { fiyat: '0', kira: '15000' }, error: true },
    { in: { fiyat: '3000000', kira: '15000', bosAy: '13' }, error: true },
  ],
  howto: [
    '"Satın alma fiyatı" alanına gayrimenkulün bedelini yazın. Tapu harcı, emlakçı komisyonu ve tadilat gibi alım masraflarını da fiyata eklerseniz sonuç daha gerçekçi olur.',
    '"Aylık kira" alanına bugün alınan ya da alınması beklenen aylık kira bedelini girin.',
    'Net sonucu görmek isterseniz mal sahibi olarak bir yılda ödediğiniz giderlerin toplamını ve evin yılda ortalama kaç ay boş kaldığını yazın. Bu iki alan boş bırakılabilir.',
    '"Hesapla" düğmesine basın. Brüt ve net kira getirisi ile amortisman süreleri alt alta listelenir.',
    'Farklı ilanları karşılaştırmak için değerleri değiştirip yeniden hesaplayın; sonuçları "Sonucu kopyala" ile not defterinize aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Kira getirisi ve amortisman süresi ne anlama gelir?', p: [
      "Kira getirisi, bir gayrimenkulün bir yılda getirdiği kiranın o gayrimenkule ödenen bedele oranıdır. Yüzde 5 kira getirisi, yatırdığınız her 100 liranın yılda 5 lirasını kira olarak geri aldığınız anlamına gelir. Amortisman süresi ise aynı bilginin tersten okunuşudur: mevcut kirayla evin fiyatını kaç yılda toplayacağınızı gösterir. Emlak piyasasında buna <em>kira çarpanı</em> ya da geri dönüş süresi de denir ve çoğunlukla ay cinsinden söylenir; \"bu daire 200 ayda kendini ödüyor\" cümlesi, fiyatın aylık kiranın 200 katı olduğunu anlatır.",
      "İki gösterge birbirinin tersidir. Getiri yükseldikçe amortisman süresi kısalır. Yüzde 4 getiri 25 yıla, yüzde 5 getiri 20 yıla, yüzde 8 getiri 12,5 yıla karşılık gelir. Bu yüzden iki ilanı karşılaştırırken hangisini kullandığınızın bir önemi yoktur; önemli olan ikisinde de aynı yöntemi, yani ya brütü ya da neti kullanmaktır.",
    ] },
    { h: 'Hesaplama formülleri', p: [
      "Brüt hesap yalnızca fiyat ve kirayla yapılır: <strong>Brüt getiri (%) = (aylık kira × 12) ÷ satın alma fiyatı × 100</strong>. Amortisman süresi yıl olarak <strong>fiyat ÷ (aylık kira × 12)</strong>, ay olarak <strong>fiyat ÷ aylık kira</strong> işlemiyle bulunur.",
      "Net hesapta kiranın tamamının cebinize kalmadığı kabul edilir: <strong>Yıllık net kira = aylık kira × (12 − boş kalan ay) − yıllık giderler</strong>. Net getiri bu tutarın fiyata oranıdır, net amortisman süresi de fiyatın yıllık net kiraya bölümüdür. Giderler kirayı aşıyorsa net kira eksiye düşer ve süre hesaplanamaz; araç bu durumu açıkça belirtir.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "2.400.000 TL'ye alınan bir dairenin aylık kirası 20.000 TL olsun. Yıllık brüt kira 20.000 × 12 = 240.000 TL eder. Brüt getiri 240.000 ÷ 2.400.000 = yüzde 10, brüt amortisman süresi 2.400.000 ÷ 240.000 = 10 yıl, yani 120 aydır.",
      "Şimdi aynı daire için yılda 24.000 TL gider yapıldığını ve kiracı değişimlerinde yılda ortalama 1 ay boş kaldığını varsayalım. Yıllık net kira 20.000 × 11 − 24.000 = 196.000 TL olur. Net getiri 196.000 ÷ 2.400.000 = yüzde 8,17'ye, net amortisman süresi ise 2.400.000 ÷ 196.000 = 12,24 yıla çıkar. Görüldüğü gibi küçük görünen giderler süreyi iki yıldan fazla uzatabilir.",
    ] },
    { h: 'Net hesaba hangi giderler yazılır?', ul: [
      "Emlak vergisi ve varsa zorunlu ya da isteğe bağlı konut sigortası primleri",
      "Mal sahibinin üstlendiği aidat, site yönetim giderleri ve demirbaş payları",
      "Boya, tesisat, kombi bakımı gibi yıllara yayıldığında ortalama bir tutara denk gelen onarım harcamaları",
      "Kiracı bulmak için ödenen emlakçı hizmet bedeli",
      "Kira gelirinden doğan gelir vergisi; tutarı kişisel durumunuza ve yürürlükteki istisna ve oranlara bağlı olduğundan güncel mevzuatı kontrol ederek ya da mali müşavirinize danışarak kendi rakamınızı ekleyin",
    ] },
    { h: 'Sonucu yorumlarken dikkat edilecekler', p: [
      "Bu hesap bir <strong>anlık fotoğraftır</strong>. Kira ve fiyatın yıllarca sabit kalacağını varsayar; oysa uygulamada kira her yıl güncellenir, gayrimenkulün değeri de değişir. Enflasyonun yüksek olduğu dönemlerde kira arttığı için evin kendini fiilen ödemesi hesaplanan süreden kısa sürebilir; öte yandan paranın zaman değeri hesaba katıldığında bugünkü 1 lira ile on yıl sonraki 1 lira aynı değildir. Bu nedenle sonucu kesin bir vade olarak değil, ilanları birbirine göre sıralamaya yarayan bir oran olarak okumak daha doğrudur.",
      "Kira getirisi tek başına bir yatırım kararı için yeterli değildir. Bölgenin gelişme potansiyeli, binanın yaşı ve deprem dayanımı, kiracı bulma kolaylığı, tapu durumu ve alternatif yatırım araçlarının getirisi de değerlendirilmelidir. Konut kredisiyle alımda faiz maliyeti ayrıca hesaplanmalıdır; kredi taksiti kiradan yüksekse aradaki farkı her ay cebinizden ödersiniz.",
      "Bu sayfadaki sonuçlar bilgilendirme amaçlıdır, yatırım tavsiyesi değildir. Büyük tutarlı bir alım öncesinde değerleme uzmanı ve mali müşavir görüşü almanız yerinde olur.",
    ] },
    { h: 'Hızlı başvuru: getiri ve süre karşılıkları', ul: [
      "<strong>%3</strong> brüt getiri = 33,33 yıl = 400 ay",
      "<strong>%4</strong> brüt getiri = 25 yıl = 300 ay",
      "<strong>%5</strong> brüt getiri = 20 yıl = 240 ay",
      "<strong>%6</strong> brüt getiri = 16,67 yıl = 200 ay",
      "<strong>%8</strong> brüt getiri = 12,5 yıl = 150 ay",
      "<strong>%10</strong> brüt getiri = 10 yıl = 120 ay",
    ] },
  ],
  faq: [
    ['Kira getirisi nasıl hesaplanır?', "Aylık kira 12 ile çarpılıp gayrimenkulün fiyatına bölünür ve 100 ile çarpılır. 3.000.000 TL'lik bir evin aylık kirası 15.000 TL ise yıllık kira 180.000 TL, brüt kira getirisi yüzde 6'dır."],
    ['Amortisman süresi nasıl bulunur?', "Fiyat yıllık kiraya bölünür. Ay cinsinden görmek için fiyatı doğrudan aylık kiraya bölebilirsiniz. 3.000.000 TL fiyat ve 15.000 TL kira için süre 200 ay, yani yaklaşık 16 yıl 8 aydır."],
    ['Brüt ve net kira getirisi arasındaki fark nedir?', "Brüt getiri yalnızca kira ve fiyata bakar. Net getiri ise vergi, sigorta, bakım, aidat gibi giderleri ve evin boş kaldığı ayları kiradan düşer. Yatırımın gerçek verimini net getiri gösterir; ilanları hızlıca elemek için brüt getiri yeterlidir."],
    ['İyi bir amortisman süresi kaç yıldır?', "Bunun tek bir doğru cevabı yoktur; şehre, semte, gayrimenkulün türüne ve dönemin ekonomik koşullarına göre değişir. Süre kısaldıkça kira verimi artar. En sağlıklı yöntem, aynı bölgedeki benzer ilanların sürelerini bu araçla hesaplayıp birbirleriyle karşılaştırmaktır."],
    ['Kira artışı neden hesaba katılmıyor?', "Gelecekteki kira artış oranı ve gayrimenkul değer artışı bilinemediği için araç bugünkü değerlerle sabit bir hesap yapar. Kira zamanla arttıkça fiilî geri dönüş süresi kısalır; sonuç bu nedenle temkinli bir üst sınır gibi düşünülebilir."],
    ['Dükkân, ofis ya da arsa için de kullanılabilir mi?', "Evet. Hesap, kira geliri olan her tür gayrimenkul için aynıdır. İşyerlerinde giderler, stopaj ve boş kalma süreleri konuttan farklı olabileceği için net hesap alanlarını kendi koşullarınıza göre doldurun."],
    ['Alım masraflarını fiyata eklemeli miyim?', "Gerçekçi bir sonuç için evet. Tapu harcı, emlakçı komisyonu, ekspertiz ve tadilat gibi bir kerelik masraflar da yatırdığınız paranın parçasıdır. Bunları satın alma fiyatına eklerseniz getiri bir miktar düşer, süre uzar."],
    ['Girdiğim fiyat ve kira bilgileri kaydediliyor mu?', "Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız tutarlar hiçbir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['metrekare-fiyati-hesapla', 'yatirim-getirisi-hesapla', 'geri-odeme-suresi-hesapla', 'reel-faiz-hesapla', 'amortisman-hesapla'],
};
