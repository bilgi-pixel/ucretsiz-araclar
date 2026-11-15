export default {
  slug: 'daire-alani-hesapla',
  title: 'Daire Alanı Hesaplama',
  h1Tail: 'yarıçap, çap ya da çevreden',
  pageTitle: 'Daire Alanı Hesaplama – Yarıçap, Çap veya Çevreden πr²',
  description: 'Dairenin alanını yarıçap, çap ya da çevre uzunluğundan hesaplayın. A = πr² formülüyle çalışır; yarıçap, çap ve çevre değerlerini de birlikte gösterir.',
  card: 'Yarıçap, çap ya da çevreyi yazın; dairenin alanını πr² formülüyle, diğer ölçüleriyle birlikte görün.',
  category: 'matematik',
  keywords: ['daire alanı hesaplama', 'dairenin alanı formülü', 'pi r kare', 'çaptan alan hesaplama', 'çevresi bilinen dairenin alanı', 'yuvarlak alan hesaplama', 'daire metrekare'],
  lead: `Dairenin alanını bildiğiniz tek ölçüden bulun: <strong>yarıçap</strong>, <strong>çap</strong> ya da <strong>çevre</strong>. Araç <strong>A = π · r²</strong> formülünü kullanır ve eksik kalan diğer ölçüleri de hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Ölçü', type: 'number', placeholder: 'Örn. 5' },
    { id: 'tur', label: 'Yazdığınız ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap'], ['c', 'Çevre']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    let r;
    if (v.tur === 'd') r = x / 2;
    else if (v.tur === 'c') r = x / (2 * Math.PI);
    else r = x;
    const alan = Math.PI * r * r;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Yarıçap', h.fmt(r, 4) + ' birim'],
        ['Çap', h.fmt(2 * r, 4) + ' birim'],
        ['Çevre', h.fmt(2 * Math.PI * r, 4) + ' birim'],
      ],
      note: 'A = π·r², π ≈ 3,14159265. Sonuç, ölçüyü yazdığınız birimin karesidir (cm için cm², m için m²).',
    };
  },
  cases: [
    { in: { deger: '5', tur: 'r' }, out: { 'Alan': '78,5398 birim²', 'Çap': '10 birim', 'Çevre': '31,4159 birim' } },
    { in: { deger: '10', tur: 'd' }, out: { 'Alan': '78,5398 birim²', 'Yarıçap': '5 birim' } },
    { in: { deger: '1', tur: 'r' }, out: { 'Alan': '3,1416 birim²', 'Çevre': '6,2832 birim' } },
    { in: { deger: '10', tur: 'r' }, out: { 'Alan': '314,1593 birim²' } },
    { in: { deger: '0,5', tur: 'r' }, out: { 'Alan': '0,7854 birim²', 'Çap': '1 birim' } },
    { in: { deger: '44', tur: 'c' }, out: { 'Alan': '154,062 birim²', 'Yarıçap': '7,0028 birim' } },
    { in: { deger: '30', tur: 'd' }, out: { 'Alan': '706,8583 birim²' } },
    { in: { deger: '0', tur: 'r' }, error: true },
    { in: { deger: 'on', tur: 'd' }, error: true },
  ],
  howto: [
    `"Ölçü" kutusuna dairenin bildiğiniz uzunluğunu yazın. Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz.`,
    `"Yazdığınız ölçü" listesinden bu sayının yarıçap mı, çap mı, yoksa çevre mi olduğunu seçin.`,
    `"Hesapla" düğmesine basın. İlk satırda alan, altında yarıçap, çap ve çevre görünür.`,
    `Alanı başka bir birime çevirmeniz gerekiyorsa sonucu kopyalayıp ilgili birim çeviricide kullanın.`,
  ],
  sections: [
    { h: 'Dairenin alan formülü: πr²', p: [
      `Daire, bir merkez noktasına eşit uzaklıktaki noktaların çevrelediği düzlem bölgesidir. Bu uzaklığa <strong>yarıçap</strong> (r) denir. Dairenin alanı, yarıçapın karesinin pi sayısıyla çarpımına eşittir: <strong>A = π · r²</strong>. Pi (π), her dairede çevrenin çapa oranı olan sabit sayıdır ve yaklaşık 3,14159'dur; ondalık açılımı sonsuza kadar tekrarsız sürer.`,
      `Formülün neden böyle olduğunu sezmek için daireyi pizza gibi çok sayıda ince dilime ayırdığınızı düşünün. Dilimleri bir yukarı bir aşağı bakacak şekilde yan yana dizerseniz, dilim sayısı arttıkça şekil bir dikdörtgene yaklaşır. Bu dikdörtgenin yüksekliği r, uzunluğu ise çevrenin yarısı, yani π · r olur. Alan da r × π · r = π · r² çıkar.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Yarıçaptan:</strong> yarıçapı 5 cm olan dairenin alanı π × 5² = π × 25 ≈ <strong>78,5398 cm²</strong>'dir. Aynı dairenin çapı 10 cm, çevresi 31,4159 cm olur.`,
      `<strong>Çaptan:</strong> çap biliniyorsa önce ikiye bölünür. 30 cm çaplı bir pizzanın yarıçapı 15 cm, alanı π × 225 ≈ <strong>706,8583 cm²</strong> eder. Çap cinsinden doğrudan formül A = π · d² ÷ 4 şeklindedir.`,
      `<strong>Çevreden:</strong> bir ağaç gövdesi ya da kolon gibi çapını doğrudan ölçemediğiniz nesnelerde mezurayla çevreyi ölçersiniz. Çevre 44 cm ise yarıçap 44 ÷ (2π) ≈ 7,0028 cm, alan yaklaşık <strong>154,062 cm²</strong>'dir. Kısa yol olarak A = Ç² ÷ (4π) formülü de aynı sonucu verir.`,
    ] },
    { h: 'Yarıçap iki katına çıkınca alan dört katına çıkar', p: [
      `Alan, yarıçapın karesiyle orantılıdır. Bu, gündelik hayatta sık sık yanılgıya yol açar. Yarıçapı 5 olan dairenin alanı 78,54 iken yarıçapı 10 olan dairenin alanı 314,16'dır; yani tam dört katı. Bu yüzden 40 cm'lik bir pizza, 20 cm'lik iki pizzadan değil dört pizzadan söz edilecek kadar büyüktür. Aynı mantıkla çapı yüzde 10 artırılan bir borunun kesit alanı yüzde 21 artar. Fiyat ya da kapasite karşılaştırırken çapı değil alanı kıyaslamak doğru sonuç verir.`,
    ] },
    { h: 'Türkiye\'den kullanım örnekleri', ul: [
      `<strong>Yuvarlak halı ve masa örtüsü:</strong> 160 cm çaplı halı yaklaşık 2,01 m² yer kaplar; odanızın metrekaresiyle kıyaslayabilirsiniz.`,
      `<strong>Bahçe ve peyzaj:</strong> yuvarlak çiçek tarhı, süs havuzu ya da kamelya zemini için gereken çim tohumu, çakıl ve beton miktarı alandan hesaplanır.`,
      `<strong>Tava ve kek kalıbı:</strong> tarifte 24 cm'lik kalıp isteniyor, sizde 28 cm'lik varsa alanların oranı (yaklaşık 1,36) malzemeyi ne kadar artırmanız gerektiğini söyler.`,
      `<strong>Boru ve kablo kesiti:</strong> iç çaptan kesit alanını bulmak, debi ve akım taşıma hesaplarının ilk adımıdır.`,
      `<strong>Tarım:</strong> merkezî eksenli (pivot) sulama sistemlerinin suladığı alan bir dairedir; kol uzunluğu yarıçaptır.`,
      `<strong>Okul:</strong> ortaokul matematik dersindeki daire ve çember konusunda sonuçları kontrol etmek.`,
    ] },
    { h: 'Daire ile çember aynı şey değildir', p: [
      `Türkçede bu iki sözcük sık sık karıştırılır. <strong>Çember</strong> yalnızca kenar çizgisidir; uzunluğu vardır ama alanı yoktur. <strong>Daire</strong> ise çemberin içindeki bölgeyle birlikte tamamıdır. "Çemberin alanı" diye sorulduğunda kastedilen aslında o çemberin sınırladığı dairenin alanıdır. Çevre uzunluğu 2 · π · r, alan π · r² ile bulunur; ilki uzunluk birimiyle (cm), ikincisi alan birimiyle (cm²) ifade edilir.`,
    ] },
    { h: 'Pi için hangi değeri kullanmalı?', p: [
      `Okul sorularında çoğunlukla "π = 3 alınız" ya da "π = 3,14 alınız" denir; böyle bir yönerge varsa sonucu o değerle elle hesaplamanız gerekir. Örneğin r = 5 için π = 3 alındığında alan 75, π = 3,14 alındığında 78,5 çıkar. Bu araç pi sayısını bilgisayarın sağladığı tam duyarlılıkla (3,141592653589793) kullanır ve sonucu dört ondalık basamağa yuvarlar. 22/7 kesri de yaygın bir yaklaşık değerdir ama gerçek pi değerinden biraz büyüktür.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Çapı yarıçap sanıp doğrudan karesini almak; sonuç dört kat büyük çıkar. Listeden doğru ölçü türünü seçtiğinizden emin olun.`,
      `Yarıçapın karesini almak yerine ikiyle çarpmak (π · 2r çevre formülüdür, alan değil).`,
      `Santimetreyle hesaplanan alanı metrekareye çevirirken 100'e bölmek. 1 m² = 10.000 cm² olduğundan 10.000'e bölünmelidir.`,
      `Oval ya da basık bir şekli daire kabul etmek. İki ekseni farklı olan şekiller için elips hesabı gerekir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Ölçü sıfırdan büyük olmalıdır. Araç birim dönüşümü yapmaz; sonuç, girdiğiniz uzunluk biriminin karesi olarak okunur. Gerçek nesneler kusursuz daire olmadığından, malzeme siparişi verirken fire payını ayrıca eklemeyi unutmayın.`,
    ] },
  ],
  faq: [
    ['Dairenin alanı nasıl hesaplanır?', 'Yarıçapın karesi alınır ve pi sayısıyla çarpılır: A = π · r². Yarıçapı 5 olan dairenin alanı 25 × 3,14159 ≈ 78,54 birim karedir.'],
    ['Çapı bilinen dairenin alanı nasıl bulunur?', 'Çapı ikiye bölerek yarıçapı bulun, sonra πr² formülünü uygulayın. Doğrudan formül A = π · d² ÷ 4 şeklindedir. 10 birim çaplı dairenin alanı yaklaşık 78,54 birim karedir.'],
    ['Çevresi bilinen dairenin alanı nasıl hesaplanır?', 'Çevreyi 2π\'ye bölerek yarıçapı bulursunuz; ardından alan formülünü uygularsınız. Kısaca A = Ç² ÷ (4π). Çevresi 44 cm olan dairenin alanı yaklaşık 154,06 cm² eder.'],
    ['Pi sayısı kaçtır?', 'Pi yaklaşık 3,14159265 değerindedir ve ondalık kısmı sonsuza kadar tekrar etmeden devam eder. Okul sorularında çoğu zaman 3 ya da 3,14 alınır; bu araç tam duyarlıklı değeri kullanır.'],
    ['Yarım dairenin alanı nasıl bulunur?', 'Tam dairenin alanını hesaplayıp ikiye bölün. Yarıçapı 10 olan dairenin alanı 314,1593 olduğundan yarım dairenin alanı yaklaşık 157,08 birim karedir.'],
    ['Alanı bilinen dairenin yarıçapı nasıl bulunur?', 'Alan pi sayısına bölünür ve sonucun karekökü alınır: r = √(A ÷ π). Alanı 78,54 birim kare olan dairenin yarıçapı 5 birimdir.'],
    ['Sonucu metrekareye nasıl çeviririm?', 'Ölçüyü metre olarak yazarsanız sonuç doğrudan metrekaredir. Santimetreyle hesapladıysanız çıkan santimetrekare değerini 10.000\'e bölün; 706,86 cm² yaklaşık 0,0707 m² eder.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız sayılar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['daire-cevresi-hesapla', 'daire-dilimi-hesapla', 'elips-alani-hesapla', 'alan-cevre-hesapla', 'metrekare-hesapla'],
};
