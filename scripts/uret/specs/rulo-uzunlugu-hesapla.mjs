export default {
  slug: 'rulo-uzunlugu-hesapla',
  title: 'Rulo Uzunluğu Hesaplama',
  h1Tail: 'çap ve kalınlıktan metre',
  pageTitle: 'Rulo Uzunluğu Hesaplama – Dış Çap, İç Çap ve Kalınlıktan Metre',
  description: 'Rulonun dış çapını, göbek çapını ve malzeme kalınlığını girin; sarılı kâğıt, film, bant, kumaş ya da sacın kaç metre olduğunu ve sarım sayısını hesaplayın.',
  card: 'Dış çap, göbek çapı ve malzeme kalınlığından rulodaki kâğıt, film, bant ya da kumaşın kaç metre olduğunu bulun.',
  category: 'gunluk',
  keywords: ['rulo uzunluğu hesaplama', 'rulo metraj hesaplama', 'rulo kaç metre', 'bobin uzunluğu hesaplama', 'streç film metraj', 'rulo çapından uzunluk', 'etiket rulosu kaç metre'],
  lead: "Açmadan, tartmadan bir rulonun üzerinde <strong>kaç metre malzeme</strong> sarılı olduğunu hesaplayın. Rulonun dış çapını, göbeğin (masuranın) çapını ve malzemenin kalınlığını yazmanız yeterlidir; araç uzunluğu, sarım sayısını ve isterseniz toplam yüzey alanını verir.",
  button: 'Hesapla',
  inputs: [
    { id: 'disCap', label: 'Rulo dış çapı (mm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'icCap', label: 'Göbek (masura) dış çapı (mm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'kalinlik', label: 'Malzeme kalınlığı', type: 'number', placeholder: 'Örn. 0,1' },
    { id: 'kalinlikBirim', label: 'Kalınlık birimi', type: 'select', options: [['mm', 'Milimetre (mm)'], ['mikron', 'Mikron (µm)']] },
    { id: 'en', label: 'Rulo eni (mm)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız toplam yüzey alanı da hesaplanır.' },
  ],
  compute(v, h) {
    const D = h.pos(v.disCap, 'Rulo dış çapı');
    const d = h.nonneg(v.icCap, 'Göbek dış çapı');
    let t = h.pos(v.kalinlik, 'Malzeme kalınlığı');
    if (v.kalinlikBirim === 'mikron') t = t / 1000;
    if (d >= D) h.err('Rulo dış çapı göbek çapından büyük olmalı. İki değeri de aynı birimle (mm) ölçtüğünüzden emin olun.');
    if (t > (D - d) / 2 + 1e-9) h.err('Malzeme kalınlığı, rulonun sarılı kısmından kalın olamaz. Kalınlık birimini (mm ya da mikron) kontrol edin.');
    const L = Math.PI * (D * D - d * d) / (4 * t);
    const sarim = (D - d) / (2 * t);
    const rows = [
      ['Rulo uzunluğu', h.fmt(L / 1000, 2) + ' m'],
      ['Sarım sayısı', h.fmt(sarim, 1) + ' tur'],
      ['Ortalama sarım çevresi', h.fmt(Math.PI * (D + d) / 2, 2) + ' mm'],
      ['Sarılı katman kalınlığı', h.fmt((D - d) / 2, 2) + ' mm'],
    ];
    if (String(v.en ?? '').trim() !== '') {
      const en = h.pos(v.en, 'Rulo eni');
      rows.push(['Toplam yüzey alanı', h.fmt(L / 1000 * en / 1000, 2) + ' m²']);
    }
    return {
      rows,
      note: 'Uzunluk = π × (D² − d²) ÷ (4 × kalınlık). Sarımın sıkı ve boşluksuz olduğu varsayılır; gevşek sarılı rulolarda gerçek uzunluk daha kısadır.',
    };
  },
  cases: [
    { in: { disCap: '100', icCap: '40', kalinlik: '0,1', kalinlikBirim: 'mm' }, out: { 'Rulo uzunluğu': '65,97 m', 'Sarım sayısı': '300 tur', 'Ortalama sarım çevresi': '219,91 mm', 'Sarılı katman kalınlığı': '30 mm' } },
    { in: { disCap: '300', icCap: '76', kalinlik: '25', kalinlikBirim: 'mikron' }, out: { 'Rulo uzunluğu': '2.645,97 m', 'Sarım sayısı': '4.480 tur' } },
    { in: { disCap: '200', icCap: '76', kalinlik: '0,05', kalinlikBirim: 'mm' }, out: { 'Rulo uzunluğu': '537,59 m', 'Sarım sayısı': '1.240 tur' } },
    { in: { disCap: '60', icCap: '20', kalinlik: '1', kalinlikBirim: 'mm' }, out: { 'Rulo uzunluğu': '2,51 m', 'Sarım sayısı': '20 tur' } },
    { in: { disCap: '100', icCap: '40', kalinlik: '0,1', kalinlikBirim: 'mm', en: '50' }, out: { 'Rulo uzunluğu': '65,97 m', 'Toplam yüzey alanı': '3,3 m²' } },
    { in: { disCap: '100', icCap: '40', kalinlik: '100', kalinlikBirim: 'mikron' }, out: { 'Rulo uzunluğu': '65,97 m' } },
    { in: { disCap: '40', icCap: '100', kalinlik: '0,1', kalinlikBirim: 'mm' }, error: true },
    { in: { disCap: '100', icCap: '40', kalinlik: '0', kalinlikBirim: 'mm' }, error: true },
    { in: { disCap: '100', icCap: '40', kalinlik: '50', kalinlikBirim: 'mm' }, error: true },
  ],
  howto: [
    'Rulonun dış çapını cetvel ya da kumpasla, bir kenardan karşı kenara merkezden geçecek şekilde ölçüp milimetre olarak yazın.',
    'Göbeğin, yani malzemenin sarıldığı karton ya da plastik masuranın dış çapını yazın. Göbeksiz, dolu sarılmış rulolar için 0 girin.',
    'Malzemenin kalınlığını yazın ve birimini seçin. İnce filmlerde kalınlık çoğunlukla mikron olarak verilir; 1 mikron milimetrenin binde biridir.',
    'Toplam metrekareyi de görmek isterseniz rulonun enini girin.',
    'Hesapla düğmesine basın; uzunluk metre olarak, sarım sayısıyla birlikte görünür.',
  ],
  sections: [
    { h: 'Formül nereden gelir?', p: [
      'Bir ruloya yandan bakıldığında, sarılı malzeme halka biçiminde bir alan kaplar: dıştaki büyük dairenin alanından göbeğin dairesinin alanı çıkarılır. Rulo açılıp düz serildiğinde ise aynı malzeme, uzunluğu <em>L</em> ve yüksekliği malzeme kalınlığı <em>t</em> olan çok uzun, ince bir dikdörtgen hâlini alır. İki alan birbirine eşit olmak zorundadır: π × (D² − d²) ÷ 4 = L × t.',
      'Buradan uzunluk çekilir: <strong>L = π × (D² − d²) ÷ (4 × t)</strong>. Formülde <em>D</em> rulonun dış çapı, <em>d</em> göbeğin dış çapı, <em>t</em> malzemenin kalınlığıdır ve üçü de aynı birimde olmalıdır. Sarım sayısı ise sarılı katmanın kalınlığının malzeme kalınlığına bölümüdür: <strong>tur = (D − d) ÷ (2 × t)</strong>. Aynı sonuca, sarım sayısı ile ortalama sarım çevresini çarparak da ulaşılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Dış çapı 100 mm, göbek çapı 40 mm olan ve 0,1 mm kalınlığında malzeme sarılı bir rulo düşünelim. Çapların kareleri 10.000 ve 1.600, farkları 8.400\'dür. π × 8.400 = 26.389. Bunu 4 × 0,1 = 0,4\'e böldüğümüzde 65.973 mm, yani <strong>65,97 metre</strong> buluruz. Sarım sayısı (100 − 40) ÷ (2 × 0,1) = 300 turdur. Ortalama çap 70 mm olduğundan ortalama çevre 219,91 mm\'dir ve 300 × 219,91 mm yine 65,97 metre eder; iki yöntem birbirini doğrular.',
      'İkinci örnek ambalaj sektöründen: 76 mm göbekli, 300 mm dış çaplı ve 25 mikron kalınlığında bir film rulosu. Kalınlık 0,025 mm\'dir. π × (90.000 − 5.776) ÷ (4 × 0,025) = 2.645.975 mm, yani yaklaşık 2.646 metre. Bu rulodaki sarım sayısı 4.480\'dir.',
    ] },
    { h: 'Kalınlığı nasıl ölçerim?', p: [
      'Sonucun doğruluğu en çok kalınlık değerine bağlıdır, çünkü kalınlık çok küçük bir sayıdır ve ölçümdeki küçük bir hata uzunluğa aynı oranda yansır. En güvenilir kaynak malzemenin etiketi ya da teknik bilgi föyüdür. Etiket yoksa tek katı ölçmek yerine birden çok katı birlikte ölçün: malzemeyi on ya da yirmi kat üst üste getirip mikrometre ya da kumpasla ölçün ve kat sayısına bölün.',
      'Bir başka pratik yol, rulodan sarım saymaktır: rulonun yan yüzünde sarılı katmanın kalınlığını ölçüp belirli bir aralıktaki sarım sayısına bölerseniz, sarılı hâldeki etkin kalınlığı bulursunuz. Bu yöntem, katlar arasındaki hava boşluğunu ve yapışkan tabakasını da içerdiği için bant ve etiket rulolarında daha gerçekçi sonuç verir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Ambalaj:</strong> streç film, balonlu naylon, koli bandı ve kraft kâğıt rulolarında kalan metrajın tahmini',
      '<strong>Baskı ve etiket:</strong> termal yazarkasa ve POS ruloları, barkod etiketi ruloları, plotter kâğıdı, folyo ve vinil',
      '<strong>Tekstil:</strong> top kumaş, tela, şerit ve kurdele metrajı',
      '<strong>İnşaat ve tesisat:</strong> su yalıtım membranı, şilte, izolasyon bandı, zemin kaplaması, halı ruloları',
      '<strong>Metal:</strong> sac ve şerit bobinlerinde stok sayımı',
      '<strong>Ev:</strong> duvar kâğıdı, hediye paketi kâğıdı ve yapışkanlı folyo rulolarında kalan miktarın bir işe yetip yetmeyeceğinin kontrolü',
    ] },
    { h: 'Kalan miktarı bulmak ve stok sayımı', p: [
      'Yarısı kullanılmış bir ruloda kalan uzunluğu bulmak için yalnızca o anki dış çapı ölçmeniz yeterlidir; göbek çapı ve kalınlık değişmez. Uzunluk çapın karesiyle orantılı olduğundan, çap yarıya indiğinde kalan malzeme yarıdan çok daha azdır. Örneğin yukarıdaki 100 mm\'lik rulo 70 mm çapa indiğinde hesap 25,92 metre verir; yani çap yüzde otuz azalmışken malzemenin yüzde altmışı tükenmiştir. Depoda rulolara bakarak göz kararı tahmin yapanların en sık yanıldığı nokta budur.',
      'Sayım sırasında her ruloyu açıp ölçmek mümkün olmadığından, çap ölçümüyle metraj tahmini depo ve üretim sahalarında yaygın bir yöntemdir. Rulo enini de girerseniz araç toplam yüzey alanını metrekare olarak verir; metrekare fiyatıyla satılan malzemelerde stok değerini hesaplamak kolaylaşır.',
    ] },
    { h: 'Hata kaynakları ve sınırlar', p: [
      'Formül, katların arasında boşluk kalmadan sıkıca sarıldığını varsayar. Gevşek sarılmış, kabartmalı, tüylü ya da sıkıştırılabilir malzemelerde (tuvalet kâğıdı, havlu kâğıt, keçe, köpük) nominal kalınlıkla yapılan hesap gerçek uzunluğu olduğundan fazla gösterir. Bu tür ürünlerde sarım sayma yöntemiyle bulunan etkin kalınlığı kullanın. Çift katmanlı ürünlerde, örneğin taşıyıcı kâğıdıyla birlikte sarılan etiketlerde, kalınlık olarak iki katmanın toplamını yazmalısınız.',
      'Rulo tam yuvarlak değilse çapı birkaç yönden ölçüp ortalamasını alın. Sonuç bir tahmindir; satış, fatura ya da hakediş gibi kesin metraj gereken işlerde sayaçlı sarma makinesi ya da tartım yöntemiyle doğrulama yapılmalıdır.',
    ] },
  ],
  faq: [
    ['Rulo uzunluğu formülü nedir?', 'Uzunluk, pi sayısı ile dış çap ve göbek çapının kareleri farkının çarpımının, kalınlığın dört katına bölünmesiyle bulunur: L = π × (D² − d²) ÷ (4 × t). Tüm ölçüler aynı birimde olmalıdır.'],
    ['Malzeme kalınlığını bilmiyorsam ne yapmalıyım?', 'Ürün etiketine ya da teknik föyüne bakın. Yoksa malzemeyi on yirmi kat üst üste koyup ölçün ve kat sayısına bölün ya da rulonun yanından belirli bir kalınlıktaki sarımları sayarak etkin kalınlığı bulun.'],
    ['Mikron ile milimetre arasındaki ilişki nedir?', '1 milimetre 1.000 mikrondur. 25 mikron 0,025 mm, 100 mikron 0,1 mm eder. Araçta kalınlık birimini seçerek doğrudan mikron girebilirsiniz.'],
    ['Göbeksiz rulolarda iç çapa ne yazmalıyım?', 'Malzeme ortasında boşluk olmadan tamamen dolu sarılmışsa göbek çapına 0 yazın. Ortada boşluk varsa boşluğun çapını girin.'],
    ['Çap yarıya indiğinde malzemenin yarısı mı kalır?', 'Hayır. Uzunluk çapın karesiyle orantılı olduğundan çap yarıya indiğinde, göbek çapına bağlı olarak malzemenin dörtte biri ya da daha azı kalır. Dış sarımlar çok daha uzun olduğu için rulo başta yavaş, sonda hızlı küçülür.'],
    ['Hesap neden gerçek uzunluktan fazla çıkıyor?', 'Büyük olasılıkla sarım gevşektir ya da malzeme sıkıştırılabilir yapıdadır. Katlar arasındaki hava, etkin kalınlığı artırır. Nominal kalınlık yerine rulonun üzerinden ölçülen etkin kalınlığı kullanın.'],
    ['Rulonun ağırlığını da bulabilir miyim?', 'Rulo enini girerek toplam yüzey alanını öğrenebilirsiniz. Malzemenin metrekare ağırlığını (gramajını) biliyorsanız alanı gramajla çarparak ağırlığa ulaşırsınız.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['olta-misina-hesapla', 'kagit-agirligi-hesapla', 'daire-cevresi-hesapla', 'mikron-mm-cevir', 'kumas-metraj-hesapla', 'daire-alani-hesapla'],
};
