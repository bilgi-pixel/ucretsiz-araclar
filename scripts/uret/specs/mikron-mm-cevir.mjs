export default {
  slug: 'mikron-mm-cevir',
  title: 'Mikron Milimetre Çevirici',
  h1Tail: 'µm ↔ mm',
  pageTitle: 'Mikron Milimetre Çevirici – Mikronu mm\'ye, mm\'yi Mikrona Çevirme',
  description: 'Mikronu milimetreye, milimetreyi mikrona çevirin. 1 mm = 1.000 mikron eşitliğiyle hesaplar; nanometre, santimetre ve binde inç karşılığını da gösterir.',
  card: 'Mikronu (mikrometre) milimetreye, milimetreyi mikrona çevirin; naylon, boya, kaplama ve filtre ölçüleri için.',
  category: 'birim',
  keywords: ['mikron mm çevirme', '1 mikron kaç mm', 'mikron kaç milimetre', 'mikrometre milimetre', 'mm mikron hesaplama', '100 mikron kaç mm', 'mikron nedir', 'µm mm'],
  lead: 'Mikron (mikrometre, µm) ile milimetre arasında iki yönlü çeviri yapın. Temel eşitlik basittir: <strong>1 milimetre = 1.000 mikron</strong>. Araç bunun yanında nanometre, santimetre ve binde inç (thou) karşılıklarını da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 50' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['um', 'Mikron → Milimetre'], ['mm', 'Milimetre → Mikron']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const um = v.yon === 'mm' ? x * 1000 : x;
    const mm = v.yon === 'mm' ? x : x / 1000;
    return {
      rows: [
        v.yon === 'mm' ? ['Mikron', h.fmt(um, 3) + ' µm'] : ['Milimetre', h.fmt(mm, 6) + ' mm'],
        v.yon === 'mm' ? ['Milimetre', h.fmt(mm, 6) + ' mm'] : ['Mikron', h.fmt(um, 3) + ' µm'],
        ['Santimetre', h.fmt(mm / 10, 7) + ' cm'],
        ['Metre', h.sig(mm / 1000, 6) + ' m'],
        ['Nanometre', h.fmt(um * 1000, 1) + ' nm'],
        ['Binde inç (thou)', h.fmt(um / 25.4, 4) + ' thou'],
      ],
      note: '1 mm = 1.000 µm, 1 µm = 1.000 nm, 1 thou (inçin binde biri) = 25,4 µm.',
    };
  },
  cases: [
    { in: { deger: '50', yon: 'um' }, out: { 'Milimetre': '0,05 mm', 'Nanometre': '50.000 nm', 'Santimetre': '0,005 cm' } },
    { in: { deger: '0,1', yon: 'mm' }, out: { 'Mikron': '100 µm', 'Nanometre': '100.000 nm' } },
    { in: { deger: '1000', yon: 'um' }, out: { 'Milimetre': '1 mm', 'Santimetre': '0,1 cm', 'Metre': '0,001 m' } },
    { in: { deger: '25,4', yon: 'um' }, out: { 'Milimetre': '0,0254 mm', 'Binde inç (thou)': '1 thou' } },
    { in: { deger: '2,5', yon: 'mm' }, out: { 'Mikron': '2.500 µm' } },
    { in: { deger: '1', yon: 'um' }, out: { 'Milimetre': '0,001 mm', 'Nanometre': '1.000 nm' } },
    { in: { deger: '150', yon: 'um' }, out: { 'Milimetre': '0,15 mm', 'Binde inç (thou)': '5,9055 thou' } },
    { in: { deger: 'elli', yon: 'um' }, error: true },
    { in: { deger: '-20', yon: 'mm' }, error: true },
  ],
  howto: [
    '"Değer" alanına mikron ya da milimetre cinsinden ölçüyü yazın; 0,08 gibi küçük değerleri virgülle girebilirsiniz.',
    '"Çeviri yönü" listesinden mikrondan milimetreye ya da milimetreden mikrona seçeneğini belirleyin.',
    '"Çevir" düğmesine basın; ilk satır aradığınız karşılığı gösterir.',
    'Nanometre, santimetre ya da thou karşılığına ihtiyacınız varsa alt satırlara bakın; tüm sonucu tek tıkla kopyalayabilirsiniz.',
  ],
  sections: [
    { h: 'Mikron nedir?', p: [
      'Mikron, metrenin milyonda biri olan uzunluk biriminin yaygın adıdır. Uluslararası Birimler Sistemi\'ndeki resmî adı <strong>mikrometre</strong>, simgesi <strong>µm</strong>\'dir. "Mikron" sözcüğü resmî kullanımdan kalkmış olsa da sanayide, ticarette ve gündelik dilde hâlâ çok yaygındır; Türkiye\'de naylon, ambalaj filmi, boya ve kaplama gibi alanlarda kalınlık neredeyse her zaman "mikron" olarak söylenir.',
      'Bir mikron, milimetrenin binde biridir. Tersinden söylersek bir milimetrenin içine yan yana bin mikron sığar. Çıplak gözün ayırt edebildiği en küçük ayrıntılar onlarca mikron düzeyindedir; daha küçük ölçüler için mikroskop ya da hassas ölçü aletleri gerekir.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Mikrondan milimetreye geçmek için değeri 1.000\'e bölersiniz: <strong>mm = µm ÷ 1.000</strong>. Milimetreden mikrona geçmek için 1.000 ile çarparsınız: <strong>µm = mm × 1.000</strong>. Pratikte bu, ondalık virgülünü üç basamak kaydırmak demektir: 250 mikron 0,25 mm, 0,04 mm ise 40 mikrondur.',
      'Metrik sistemde uzunluk önekleri biner biner ilerler: 1 metre = 1.000 milimetre, 1 milimetre = 1.000 mikrometre, 1 mikrometre = 1.000 nanometre. Bu yüzden mikrondan nanometreye geçerken de yine 1.000 ile çarpılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 50 mikron kalınlığındaki bir naylon kaç milimetredir? 50 ÷ 1.000 = 0,05 mm. Aynı değer 50.000 nanometre ve 0,005 santimetredir.',
      '<strong>Örnek 2:</strong> Kumpasla 0,1 mm ölçtüğünüz bir folyonun kalınlığı kaç mikrondur? 0,1 × 1.000 = 100 mikron.',
      '<strong>Örnek 3:</strong> İnç sistemindeki bir teknik çizimde 1 thou (inçin binde biri) tolerans verilmiş. 1 thou 25,4 mikrona eşittir; araca 25,4 mikron yazdığınızda 0,0254 mm ve 1 thou sonucunu görürsünüz.',
      '<strong>Örnek 4:</strong> 150 mikronluk bir örtü 0,15 mm kalınlığındadır; inç sistemiyle çalışan bir tedarikçi bunu yaklaşık 5,9 thou olarak ifade eder.',
    ] },
    { h: 'Mikron hangi alanlarda kullanılır?', ul: [
      '<strong>Naylon ve ambalaj filmi:</strong> Poşet, streç film, sera örtüsü ve inşaat naylonu kalınlıkları mikron ile belirtilir. Kalınlık arttıkça dayanım ve fiyat artar; teklif karşılaştırırken mikron değerine dikkat edilmelidir.',
      '<strong>Boya ve kaplama:</strong> Araç kaportasındaki boya kalınlığı, galvaniz ve eloksal kaplamalar, toz boya katmanları mikron cinsinden ölçülür. İkinci el araç ekspertizinde kullanılan boya kalınlık ölçüm cihazları sonucu mikron olarak gösterir.',
      '<strong>Filtrasyon:</strong> Su arıtma kartuşları, yakıt ve hava filtreleri tutabildikleri en küçük parçacık boyutuna göre "5 mikron", "20 mikron" gibi sınıflandırılır. Sayı küçüldükçe filtre daha ince parçacıkları tutar.',
      '<strong>Hava kalitesi:</strong> Havadaki parçacık kirliliği, parçacık çapına göre adlandırılır; PM10 çapı 10 mikrometreden, PM2,5 çapı 2,5 mikrometreden küçük parçacıkları anlatır.',
      '<strong>Talaşlı imalat ve kalite kontrol:</strong> Toleranslar, yüzey pürüzlülüğü ve mastar ölçüleri mikron düzeyinde verilir; mikrometre adlı ölçü aleti de adını bu birimden alır.',
      '<strong>Tekstil ve yün:</strong> Elyaf inceliği mikron ile ifade edilir; lif çapı küçüldükçe kumaş daha yumuşak olur.',
      '<strong>Biyoloji ve tıp:</strong> Hücreler ve bakteriler mikrometre ölçeğindedir; mikroskop görüntülerindeki ölçek çubukları µm ile etiketlenir.',
    ] },
    { h: 'Ölçeği kavramak için karşılaştırmalar', p: [
      'Mikron gözle görülemeyecek kadar küçük olduğu için tanıdık nesnelerle kıyaslamak yararlıdır. Aşağıdaki değerler yaklaşık ve örnekleme amaçlıdır; ürüne ve ölçüm yöntemine göre değişir.',
    ], ul: [
      'İnsan saç teli: çoğunlukla onlarca mikron kalınlığındadır; 50–100 mikron aralığı sıkça anılır.',
      'Standart fotokopi kâğıdı: yaklaşık 100 mikron, yani 0,1 mm dolayındadır.',
      'İnsan alyuvarı: yaklaşık 7–8 mikron çapındadır.',
      'Bakterilerin çoğu: birkaç mikron uzunluğundadır.',
      'Görünür ışığın dalga boyu: yaklaşık 0,4–0,7 mikron (400–700 nanometre) aralığındadır.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>1 µm</strong> = 0,001 mm',
      '<strong>10 µm</strong> = 0,01 mm',
      '<strong>25 µm</strong> = 0,025 mm',
      '<strong>50 µm</strong> = 0,05 mm',
      '<strong>100 µm</strong> = 0,1 mm',
      '<strong>250 µm</strong> = 0,25 mm',
      '<strong>500 µm</strong> = 0,5 mm',
      '<strong>1.000 µm</strong> = 1 mm',
      '<strong>0,2 mm</strong> = 200 µm',
      '<strong>1,5 mm</strong> = 1.500 µm',
    ] },
    { h: 'Karıştırılan kavramlar ve sınırlar', p: [
      'Üç ayrı şey sıkça birbirine karışır. <strong>Mikron</strong> bir uzunluk birimidir. <strong>Mikrometre</strong> hem bu birimin resmî adı hem de hassas ölçüm yapan vidalı ölçü aletinin adıdır. ABD\'de kullanılan <strong>"mil"</strong> ise inçin binde biridir (thou) ve 25,4 mikrona eşittir; milimetreyle ya da uzunluk birimi olan mille ilgisi yoktur. Yabancı bir ürün föyünde "2 mil" kalınlık görürseniz bu 2 mm değil, yaklaşık 51 mikrondur.',
      'Simge yazımında da dikkatli olun: µ harfi bulunamadığında "um" yazıldığı olur; "mm" ile karıştırılmamalıdır. Araç negatif değer kabul etmez; milimetre sonucunu altı ondalık basamağa kadar gösterir. Hassas imalat, laboratuvar ya da sağlıkla ilgili kararlarda sonuçları bilgilendirme amaçlı kabul edin ve kalibre edilmiş ölçüm cihazlarının değerlerini esas alın.',
    ] },
  ],
  faq: [
    ['1 mikron kaç milimetredir?', '1 mikron 0,001 milimetredir, yani milimetrenin binde biridir. Metre cinsinden 0,000001 metre, yani metrenin milyonda biri eder.'],
    ['1 milimetre kaç mikrondur?', '1 milimetre 1.000 mikrondur. Yarım milimetre 500 mikron, onda bir milimetre 100 mikron eder.'],
    ['Mikron ile mikrometre aynı şey midir?', 'Evet. Mikrometre birimin resmî adı, mikron ise sanayide ve gündelik dilde süren eski adıdır. İkisi de µm simgesiyle gösterilir ve aynı uzunluğu anlatır.'],
    ['100 mikron kaç mm eder?', '100 mikron 0,1 milimetredir. Bu, standart bir fotokopi kâğıdının yaklaşık kalınlığıdır.'],
    ['Naylon alırken mikron değeri ne anlama gelir?', 'Naylonun ya da filmin kalınlığını gösterir. Örneğin 150 mikron, 0,15 mm kalınlık demektir. Değer büyüdükçe malzeme kalınlaşır; aynı ölçüdeki rulonun ağırlığı ve genellikle fiyatı da artar.'],
    ['Mikron ile nanometre arasındaki ilişki nedir?', '1 mikron 1.000 nanometredir. Tersinden 1 nanometre 0,001 mikron eder. Araç, girdiğiniz değerin nanometre karşılığını da gösterir.'],
    ['Filtrelerde "5 mikron" ne demektir?', 'Filtrenin yaklaşık 5 mikrometre, yani 0,005 mm ve üzeri büyüklükteki parçacıkları tutmak üzere tasarlandığını belirtir. Gerçek tutma verimi üreticinin test yöntemine bağlıdır; ürün bilgilerini kontrol edin.'],
    ['Girdiğim değerler internete gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda hesaplanır; yazdığınız sayı cihazınızda kalır ve hiçbir yerde saklanmaz.'],
  ],
  related: ['mm-inc-cevir', 'nanometre-angstrom-cevir', 'metre-santimetre-cevir', 'cm-inc-cevir', 'bilimsel-gosterim-cevir', 'birim-donustur'],
};
