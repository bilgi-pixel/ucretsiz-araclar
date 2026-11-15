export default {
  slug: 'asfalt-hesapla',
  title: 'Asfalt Miktarı Hesaplama',
  h1Tail: 'ton, m³ ve kamyon',
  pageTitle: 'Asfalt Hesaplama – Kaç Ton Asfalt Gerekir? (Alan ve Kalınlık)',
  description: 'Yol, otopark ya da bahçe girişinin boyunu, enini ve asfalt kalınlığını girin; gereken sıcak asfalt miktarını ton olarak, kamyon sayısıyla birlikte hesaplayın.',
  card: 'Alan ve kalınlıktan gereken sıcak asfalt miktarını ton olarak, m² başına tüketim ve kamyon sayısıyla bulun.',
  category: 'insaat',
  keywords: ['asfalt hesaplama', 'kaç ton asfalt gerekir', 'asfalt tonaj hesabı', '1 m2 asfalt kaç kg', 'asfalt metrekare hesaplama', 'sıcak asfalt miktarı', 'asfalt yoğunluğu'],
  lead: "Kaplanacak alanın ölçülerini ve sıkıştırılmış asfalt kalınlığını girerek gereken <strong>sıcak karışım asfalt miktarını ton olarak</strong> hesaplayın. Araç metrekareye düşen tüketimi ve kamyon sayısını da gösterir.",
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Uzunluk (m)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'en', label: 'Genişlik (m)', type: 'number', placeholder: 'Örn. 6' },
    { id: 'kalinlik', label: 'Sıkıştırılmış kalınlık (cm)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yogunluk', label: 'Asfalt yoğunluğu (kg/m³)', type: 'number', value: '2400', hint: 'Sıkıştırılmış sıcak karışım için yaklaşık 2300–2450 kg/m³.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
    { id: 'kamyon', label: 'Kamyon kapasitesi (ton)', type: 'number', value: '25' },
  ],
  compute(v, h) {
    const a = h.pos(v.boy, 'Uzunluk');
    const b = h.pos(v.en, 'Genişlik');
    const k = h.pos(v.kalinlik, 'Sıkıştırılmış kalınlık');
    const ro = h.pos(v.yogunluk, 'Asfalt yoğunluğu');
    const f = h.nonneg(v.fire, 'Fire payı');
    const kap = h.pos(v.kamyon, 'Kamyon kapasitesi');
    if (k > 50) h.err('Kalınlık santimetre olarak yazılmalı; 50 cm üzeri asfalt tabakası olağan değildir, ölçüyü kontrol edin.');
    if (ro < 1000 || ro > 3000) h.err('Asfalt yoğunluğu 1000–3000 kg/m³ arasında olmalı; sıkıştırılmış sıcak karışım için 2400 civarı bir değer yazın.');
    const alan = a * b;
    const hacim = alan * k / 100;
    const net = hacim * ro / 1000;
    const ton = net * (1 + f / 100);
    return {
      rows: [
        ['Gerekli asfalt', h.fmt(ton, 2) + ' ton'],
        ['Firesiz miktar', h.fmt(net, 2) + ' ton'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
        ['Sıkıştırılmış hacim', h.fmt(hacim, 2) + ' m³'],
        ['Metrekareye düşen asfalt', h.fmt(k / 100 * ro, 1) + ' kg/m²'],
        ['Kamyon sayısı', Math.ceil(ton / kap - 1e-9) + ' sefer'],
      ],
      note: 'Yoğunluk karışım tipine ve agregaya göre değişir; kesin değer için plentin karışım raporunu esas alın.',
    };
  },
  cases: [
    { in: { boy: '100', en: '6', kalinlik: '5' }, out: { 'Gerekli asfalt': '75,6 ton', 'Firesiz miktar': '72 ton', 'Alan': '600 m²', 'Sıkıştırılmış hacim': '30 m³', 'Metrekareye düşen asfalt': '120 kg/m²', 'Kamyon sayısı': '4 sefer' } },
    { in: { boy: '20', en: '5', kalinlik: '6', yogunluk: '2350', fire: '0', kamyon: '15' }, out: { 'Gerekli asfalt': '14,1 ton', 'Firesiz miktar': '14,1 ton', 'Metrekareye düşen asfalt': '141 kg/m²', 'Kamyon sayısı': '1 sefer' } },
    { in: { boy: '1000', en: '7', kalinlik: '4', yogunluk: '2400', fire: '3', kamyon: '25' }, out: { 'Gerekli asfalt': '692,16 ton', 'Firesiz miktar': '672 ton', 'Sıkıştırılmış hacim': '280 m³', 'Kamyon sayısı': '28 sefer' } },
    { in: { boy: '50', en: '10', kalinlik: '10', yogunluk: '2400', fire: '0', kamyon: '25' }, out: { 'Gerekli asfalt': '120 ton', 'Kamyon sayısı': '5 sefer' } },
    { in: { boy: '12', en: '3,5', kalinlik: '5', yogunluk: '2300', fire: '10', kamyon: '10' }, out: { 'Gerekli asfalt': '5,31 ton', 'Firesiz miktar': '4,83 ton', 'Alan': '42 m²' } },
    { in: { boy: '1', en: '1', kalinlik: '1', yogunluk: '2400', fire: '0', kamyon: '25' }, out: { 'Gerekli asfalt': '0,02 ton', 'Metrekareye düşen asfalt': '24 kg/m²' } },
    { in: { boy: '100', en: '6', kalinlik: '0' }, error: true },
    { in: { boy: '100', en: '6', kalinlik: '5', yogunluk: '24' }, error: true },
  ],
  howto: [
    "Asfaltlanacak alanın uzunluğunu ve genişliğini metre olarak yazın. Yol için şerit genişliklerinin toplamını, otopark için alanın kısa ve uzun kenarını kullanın.",
    "Silindirleme sonrası elde edilecek <strong>sıkıştırılmış kalınlığı</strong> santimetre olarak girin.",
    "Yoğunluğu varsayılan 2400 kg/m³ değerinde bırakabilir ya da asfalt plentinin bildirdiği değeri yazabilirsiniz.",
    "Fire payını ve kamyon kapasitesini düzenleyip \"Hesapla\" düğmesine basın. Sipariş edilecek tonaj, metrekare başına tüketim ve sefer sayısı listelenir.",
  ],
  sections: [
    { h: 'Asfalt tonajı nasıl hesaplanır?', p: [
      "Sıcak karışım asfalt plentten tonla satılır; sahada ise metrekare ve kalınlıkla düşünülür. İkisini birbirine bağlayan değer sıkıştırılmış karışımın yoğunluğudur. Hesap üç çarpmadan oluşur: <strong>ton = uzunluk × genişlik × kalınlık × yoğunluk</strong>. Uzunluk ve genişlik metre, kalınlık metre (santimetre ÷ 100), yoğunluk ton/m³ alınır.",
      "Pratikte akılda tutması kolay bir kısayol vardır: 2400 kg/m³ yoğunlukta her 1 cm kalınlık, metrekare başına 24 kg asfalt demektir. 5 cm kalınlık için 120 kg/m², 6 cm için 144 kg/m², 8 cm için 192 kg/m² gerekir. Araçtaki \"Metrekareye düşen asfalt\" satırı bu değeri girdiğiniz yoğunluğa göre verir.",
    ] },
    { h: 'Çözümlü örnek: 100 metrelik site yolu', p: [
      "100 m uzunluğunda, 6 m genişliğinde bir site içi yola 5 cm aşınma tabakası serilecek olsun. Alan 100 × 6 = 600 m², sıkıştırılmış hacim 600 × 0,05 = 30 m³'tür. Yoğunluk 2400 kg/m³ alındığında firesiz ihtiyaç 30 × 2,4 = <strong>72 ton</strong> eder.",
      "Kenar düzeltmeleri, serici haznesinde kalan malzeme ve zemindeki küçük bozukluklar için yüzde 5 fire eklenirse sipariş 72 × 1,05 = <strong>75,6 ton</strong> olur. 25 tonluk damperli kamyonlarla bu miktar 75,6 ÷ 25 = 3,02, yani 4 sefer demektir; son kamyon neredeyse boş geleceğinden uygulamada fire payını gözden geçirip 3 dolu kamyonla işi bitirmek de değerlendirilebilir.",
    ] },
    { h: 'Yoğunluk değeri neden önemli?', p: [
      "Asfalt betonu; kırma taş, kum, taş unu ve bitümün sıcak karışımıdır. Sıkıştırıldıktan sonraki yoğunluğu agreganın cinsine, karışımdaki boşluk oranına ve tabakanın tipine göre değişir. Yaygın karışımlar için 2300–2450 kg/m³ aralığı kullanılır; bazalt gibi ağır agregalarla değer yükselir, gözenekli karışımlarda düşer.",
      "Yoğunluktaki yüzde 4'lük bir fark, 500 tonluk bir işte 20 ton demektir. Büyük işlerde plentin karışım dizayn raporundaki pratik yoğunluğu kullanmak, küçük işlerde ise varsayılan değere birkaç puan fire eklemek güvenli bir yoldur.",
    ] },
    { h: 'Tabaka kalınlıkları hakkında genel bilgi', p: [
      "Asfalt kaplama çoğunlukla tek tabaka değildir. Altta daha iri agregalı taşıyıcı tabakalar (bitümlü temel, binder), üstte ince agregalı aşınma tabakası bulunur. Bahçe girişi ve yaya yolu gibi hafif yüklü yerlerde tek tabaka 4–6 cm yaygındır; araç trafiği olan yollarda toplam kalınlık artar ve tabakalar ayrı ayrı serilir. Her tabakayı kendi kalınlığı ve yoğunluğuyla ayrı hesaplayıp toplamak en doğru sonucu verir.",
      "Kalınlık seçimi trafik yüküne, zemin taşıma gücüne ve iklime bağlı bir üstyapı tasarım konusudur. Buradaki aralıklar yalnızca fikir vermek içindir; kamu yollarında ilgili idarenin şartnamesi, özel işlerde ise bir yol mühendisinin önerisi esas alınmalıdır.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "<strong>Gevşek kalınlığı girmek:</strong> serici arkasındaki sıkışmamış tabaka, silindirlemeden sonra belirgin biçimde incelir. Araca bitmiş kalınlığı yazın.",
      "<strong>Hacmi ton sanmak:</strong> 30 m³ asfalt 30 ton değildir; yoğunlukla çarpıldığında yaklaşık 72 ton eder.",
      "<strong>Alt zemini düz varsaymak:</strong> eski kaplamadaki çukurlar ve tekerlek izleri de asfaltla dolar. Bozuk zeminde fire payını artırın ya da ön düzeltme tabakasını ayrıca hesaplayın.",
      "<strong>Yapıştırma ve astar malzemesini unutmak:</strong> tabakalar arasına püskürtülen bitümlü malzeme ayrı bir kalemdir ve bu hesapta yer almaz.",
      "<strong>Kavşak ve cepleri atlamak:</strong> genişleyen bölgeleri ayrı dikdörtgenler olarak hesaplayıp sonuca ekleyin.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Araç eşit kalınlıkta serilen dikdörtgen alanlar için tonaj kestirimi yapar; fiyat hesaplamaz, çünkü asfalt birim fiyatı bitüm maliyetine, mesafeye ve iş büyüklüğüne göre sürekli değişir. Soğuk asfalt, yama malzemesi ve sathi kaplama gibi farklı uygulamaların tüketim değerleri farklıdır. Sonuçlar bilgilendirme amaçlıdır; ihale metrajı, üstyapı tasarımı ve hakediş gibi bağlayıcı işlerde proje değerleri ve yetkili mühendisin hesabı kullanılmalıdır.",
    ] },
  ],
  faq: [
    ['1 metrekare asfalt kaç kilo gelir?', "Kalınlığa bağlıdır. 2400 kg/m³ yoğunlukla her santimetre için 24 kg hesaplanır: 4 cm kalınlıkta 96 kg, 5 cm kalınlıkta 120 kg, 7 cm kalınlıkta 168 kg asfalt gerekir."],
    ['1 ton asfalt kaç metrekare alan kaplar?', "5 cm sıkıştırılmış kalınlıkta 1 ton asfalt yaklaşık 8,3 m² alan kaplar (1000 ÷ 120). 4 cm kalınlıkta bu değer yaklaşık 10,4 m², 6 cm kalınlıkta yaklaşık 6,9 m² olur."],
    ['1 metreküp asfalt kaç ton eder?', "Sıkıştırılmış sıcak karışım asfaltın metreküpü yaklaşık 2,3–2,45 ton gelir. Araç varsayılan olarak 2,4 ton kullanır; plentin verdiği değeri yazarak değiştirebilirsiniz."],
    ['Fire payını yüzde kaç almalıyım?', "Düzgün hazırlanmış bir temel üzerinde yüzde 3–5 çoğunlukla yeterlidir. Eski kaplama üzerine serimde, çok girintili alanlarda ya da el ile serilen küçük işlerde yüzde 10'a kadar çıkmak gerekebilir."],
    ['Bir kamyon kaç ton asfalt taşır?', "Aracın tipine ve yasal yük sınırına göre değişir. Asfalt işlerinde yaygın damperli kamyonlar yaklaşık 15–27 ton arasında yük taşır. Kullanacağınız aracın kapasitesini ilgili alana yazın."],
    ['Dikdörtgen olmayan bir alanı nasıl hesaplarım?', "Alanı dikdörtgen ve üçgen parçalara ayırıp toplam metrekareyi bulun. Sonra uzunluk alanına toplam alanı, genişlik alanına 1 yazın; hesap aynı tonajı verir."],
    ['Bu araç asfalt fiyatını da hesaplıyor mu?', "Hayır. Asfalt fiyatı bitüm maliyetine, nakliye mesafesine ve işin büyüklüğüne göre değişir. Bulduğunuz tonajı aldığınız güncel ton fiyatıyla çarparak malzeme tutarını kendiniz hesaplayabilirsiniz."],
    ['Yazdığım ölçüler kaydediliyor mu?', "Hayır. Hesap tarayıcınızda çalışır; girdiğiniz ölçü ve değerler sunucuya gönderilmez, saklanmaz."],
  ],
  related: ['kum-cakil-hesapla', 'kilit-tasi-hesapla', 'hafriyat-hesapla', 'egim-yuzdesi-hesapla', 'rampa-egimi-hesapla'],
};
