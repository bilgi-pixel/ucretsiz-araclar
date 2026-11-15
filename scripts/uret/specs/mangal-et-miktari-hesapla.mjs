export default {
  slug: 'mangal-et-miktari-hesapla',
  title: 'Mangal Et Miktarı Hesaplama',
  h1Tail: 'kişi başı kaç gram',
  pageTitle: "Mangal Et Miktarı Hesaplama – Kişi Başı Kaç Gram Et Alınır?",
  description: "Mangal için kaç kilo et alacağınızı kişi sayısına, etin kemikli ya da kemiksiz olmasına ve iştaha göre hesaplayın. Kömür miktarı ve isteğe bağlı maliyet tahmini de verir.",
  card: "Yetişkin ve çocuk sayısını girin; mangal için alınacak eti kilo olarak, kömür ve maliyet tahminiyle birlikte görün.",
  category: 'gunluk',
  keywords: ['mangal et miktarı hesaplama', 'kişi başı kaç gram et', 'mangal için kaç kilo et', '10 kişilik mangal kaç kilo et', 'mangal kömür miktarı', 'piknik et hesabı', 'kişi başı kaç gram kanat'],
  lead: "Mangal alışverişinde az almak sofrayı yarım bırakır, çok almak bütçeyi zorlar. Yetişkin ve çocuk sayısını, et türünü ve iştah düzeyini girin; araç <strong>alınacak toplam çiğ eti</strong>, kişi başına düşen miktarı, yaklaşık kömür ihtiyacını ve kilo fiyatı yazarsanız tahmini tutarı hesaplasın.",
  button: 'Hesapla',
  inputs: [
    { id: 'yetiskin', label: 'Yetişkin sayısı', type: 'number', placeholder: 'Örn. 6' },
    { id: 'cocuk', label: 'Çocuk sayısı', type: 'number', value: '0', hint: 'Çocuklar yarım porsiyon sayılır.' },
    { id: 'tur', label: 'Et türü', type: 'select', options: [['karisik', 'Karışık (kemikli + kemiksiz) – 300 g'], ['kemiksiz', 'Kemiksiz (köfte, kuşbaşı, tavuk but/göğüs) – 250 g'], ['kemikli', 'Kemikli (pirzola, kanat, kaburga) – 400 g']] },
    { id: 'istah', label: 'İştah düzeyi', type: 'select', options: [['normal', 'Normal'], ['az', 'Az (bol meze ve yan yemek var)'], ['cok', 'Çok (iştahlı grup, uzun mangal)']] },
    { id: 'fiyat', label: 'Etin kilo fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Boş bırakılabilir' },
  ],
  compute(v, h) {
    const PORSIYON = { karisik: 300, kemiksiz: 250, kemikli: 400 };
    const KATSAYI = { normal: 1, az: 0.8, cok: 1.25 };
    const yet = h.int(v.yetiskin, 'Yetişkin sayısı');
    const coc = h.int(v.cocuk === '' ? '0' : v.cocuk, 'Çocuk sayısı');
    if (yet < 0 || coc < 0) h.err('Kişi sayıları negatif olamaz.');
    if (yet + coc < 1) h.err('En az bir kişi girin.');
    if (yet + coc > 5000) h.err('En fazla 5.000 kişi için hesap yapılır.');
    const por = (PORSIYON[v.tur] || 300) * (KATSAYI[v.istah] || 1);
    const gram = (yet + coc * 0.5) * por;
    const kg = gram / 1000;
    const rows = [
      ['Toplam çiğ et', h.fmt(kg, 2) + ' kg'],
      ['Yetişkin porsiyonu', h.fmt(por, 0) + ' g'],
      ['Çocuk porsiyonu', h.fmt(por / 2, 0) + ' g'],
      ['Mangal kömürü (yaklaşık)', h.fmt(Math.max(2, kg), 1) + ' kg'],
    ];
    if (String(v.fiyat || '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Etin kilo fiyatı');
      rows.push(['Tahmini et tutarı', h.para(kg * f)]);
      rows.push(['Kişi başı tutar', h.para(kg * f / (yet + coc))]);
    }
    return {
      rows,
      note: 'Porsiyonlar çiğ ağırlıktır. Kömür tahmini, 1 kg et için yaklaşık 1 kg kömür ve en az 2 kg alt sınırıyla verilir; mangalın boyutu ve kömürün cinsi bu miktarı değiştirir.',
    };
  },
  cases: [
    { in: { yetiskin: '6', cocuk: '2', tur: 'karisik', istah: 'normal', fiyat: '' }, out: { 'Toplam çiğ et': '2,1 kg', 'Yetişkin porsiyonu': '300 g', 'Çocuk porsiyonu': '150 g', 'Mangal kömürü (yaklaşık)': '2,1 kg' } },
    { in: { yetiskin: '4', cocuk: '0', tur: 'kemiksiz', istah: 'normal', fiyat: '800' }, out: { 'Toplam çiğ et': '1 kg', 'Mangal kömürü (yaklaşık)': '2 kg', 'Tahmini et tutarı': '800,00 TL', 'Kişi başı tutar': '200,00 TL' } },
    { in: { yetiskin: '10', cocuk: '0', tur: 'kemikli', istah: 'cok', fiyat: '' }, out: { 'Toplam çiğ et': '5 kg', 'Yetişkin porsiyonu': '500 g', 'Mangal kömürü (yaklaşık)': '5 kg' } },
    { in: { yetiskin: '3', cocuk: '1', tur: 'kemiksiz', istah: 'az', fiyat: '' }, out: { 'Toplam çiğ et': '0,7 kg', 'Yetişkin porsiyonu': '200 g', 'Çocuk porsiyonu': '100 g' } },
    { in: { yetiskin: '20', cocuk: '10', tur: 'karisik', istah: 'normal', fiyat: '600' }, out: { 'Toplam çiğ et': '7,5 kg', 'Tahmini et tutarı': '4.500,00 TL', 'Kişi başı tutar': '150,00 TL' } },
    { in: { yetiskin: '2', cocuk: '0', tur: 'kemikli', istah: 'normal', fiyat: '' }, out: { 'Toplam çiğ et': '0,8 kg', 'Mangal kömürü (yaklaşık)': '2 kg' } },
    { in: { yetiskin: '0', cocuk: '0', tur: 'karisik', istah: 'normal', fiyat: '' }, error: true },
    { in: { yetiskin: 'altı', cocuk: '0', tur: 'karisik', istah: 'normal', fiyat: '' }, error: true },
    { in: { yetiskin: '4', cocuk: '0', tur: 'karisik', istah: 'normal', fiyat: '-50' }, error: true },
  ],
  howto: [
    'Mangala katılacak yetişkin sayısını yazın; çocuklar için ayrı alanı kullanın.',
    'Alacağınız etin türünü seçin. Kemikli etlerde kemik ağırlığı yenmediği için kişi başı gramaj daha yüksektir.',
    'Sofrada bol meze, salata, pilav gibi yan yemekler olacaksa "Az", uzun süren ve iştahlı bir grupsa "Çok" iştah düzeyini seçin.',
    'Tutarı görmek isterseniz kasabınızdaki kilo fiyatını yazın; istemezseniz alanı boş bırakın.',
    '"Hesapla" düğmesine basın; toplam kilo, porsiyonlar ve kömür tahmini listelenir.',
  ],
  sections: [
    { h: 'Kişi başı et miktarı nasıl hesaplanır?', p: [
      "Mangalda porsiyon çiğ ağırlık üzerinden planlanır. Kemiksiz etlerde (köfte, kuşbaşı, antrikot, tavuk göğsü, kemiksiz but) yetişkin başına <strong>250 gram</strong>, kemikli etlerde (kuzu pirzola, kanat, kaburga, kemikli but) <strong>400 gram</strong> yaygın bir ölçüdür. İki türü birlikte alıyorsanız ortalama <strong>300 gram</strong> iyi bir başlangıçtır.",
      "Bu temel porsiyon iştah düzeyine göre ayarlanır: yan yemeği bol sofralarda yüzde 20 azaltılır, iştahlı gruplarda yüzde 25 artırılır. Çocuklar yarım yetişkin sayılır. Formül: <strong>toplam et = (yetişkin + çocuk × 0,5) × porsiyon × iştah katsayısı</strong>.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "Altı yetişkin ve iki çocukla pikniğe gidiyorsunuz; hem köfte hem kanat alacaksınız, yani et türü karışık, iştah normal. Eşdeğer yetişkin sayısı 6 + 2 × 0,5 = 7'dir. Toplam et 7 × 300 = 2.100 gram, yani <strong>2,1 kilogram</strong> eder. Bunu örneğin 1 kilogram köfte ve 1,1 kilogram kanat olarak bölebilirsiniz.",
      "Aynı grup yalnızca kemikli et (pirzola ve kanat) alsaydı 7 × 400 = 2,8 kilogram, yalnızca kemiksiz et alsaydı 7 × 250 = 1,75 kilogram gerekirdi. Kilo fiyatını 600 TL girdiğinizde 2,1 kilogram karışık et için tahmini tutar 1.260 TL, sekiz kişiye bölündüğünde kişi başı 157,50 TL olur.",
    ] },
    { h: 'Kemikli ve kemiksiz et farkı', p: [
      "Kemikli ette tartıya giren ağırlığın bir kısmı yenmez. Kanatta ve pirzolada kemik ile kıkırdağın payı yüksektir; bu yüzden aynı doygunluğu sağlamak için daha fazla kilo almak gerekir. Ayrıca et ızgarada su ve yağ kaybederek hafifler; yağlı parçalarda kayıp daha belirgindir. Porsiyon değerleri bu kayıpları göz önüne alan pratik ortalamalardır.",
      "Köfte hazır alınacaksa içindeki ekmek ve soğan da ağırlığa dahildir; kıymadan kendiniz yapacaksanız aynı gramajı kıyma olarak hesaplayabilirsiniz. Sucuk gibi yoğun ve yağlı ürünler doyurucudur; mangala sucuk da ekliyorsanız kişi başı 50–80 gram sucuk çoğu zaman yeterlidir ve et miktarından bir miktar düşülebilir.",
    ] },
    { h: 'Kömür ne kadar alınmalı?', p: [
      "Araç, yaklaşık bir kural olarak her kilogram et için bir kilogram kömür öngörür ve küçük mangallar için bile ateşin tutması adına en az iki kilogram gösterir. Gerçek ihtiyaç mangalın boyutuna, kömürün cinsine (meşe kömürü, briket, sıkıştırılmış kömür) ve pişirme süresine bağlıdır. Sebze közleme, çay demleme ya da ikinci tur pişirme planlıyorsanız bir miktar yedek kömür almak iyi olur.",
      "Kömürün üzeri kül bağlayıp alev söndükten sonra pişirmeye başlamak hem lezzet hem de etin dışının yanıp içinin çiğ kalmaması için önemlidir. Mangalı yalnızca açık havada yakın; kapalı ya da yarı kapalı alanlarda kömür yakmak karbonmonoksit zehirlenmesine yol açabilir. Piknik alanlarında ateş yakma kurallarına ve orman yangını uyarılarına uyun.",
    ] },
    { h: 'Yan ürünler için pratik ölçüler', ul: [
      'Ekmek: kişi başı yarım somun ya da bir lavaş genellikle yeterlidir.',
      'Közlemelik sebze (biber, domates, soğan): kişi başı 150–200 gram.',
      'Salata: kişi başı bir avuç yeşillik ve yarım domates, yarım salatalık.',
      'İçecek: sıcak havada kişi başı en az bir litre su ve ayran hesaplamak rahat ettirir.',
    ] },
    { h: 'Sık yapılan hatalar ve gıda güvenliği', ul: [
      'Pişmiş ağırlık üzerinden hesap yapmak. Kasaptan alınan miktar çiğ ağırlıktır; araç da çiğ ağırlık verir.',
      'Çocukları tam porsiyon saymak ya da hiç saymamak. Yarım porsiyon çoğu zaman gerçekçidir; ergenleri yetişkin olarak girin.',
      'Eti yola çıkmadan saatler önce buzdolabından çıkarmak. Çiğ et, özellikle tavuk ve kıyma, soğuk zincirde (buz aküsüyle, termos çantada) taşınmalıdır.',
      'Çiğ ete değen maşa ve tabağı pişmiş et için yeniden kullanmak. Ayrı tabak ve maşa kullanmak çapraz bulaşmayı önler.',
    ] },
    { h: 'Sınırlar', p: [
      "Sonuçlar ortalama tüketime dayalı planlama tahminleridir; kişisel beslenme önerisi değildir. Sofradaki meze ve yan yemeklerin miktarı, mangalın süresi ve grubun alışkanlıkları gerçek tüketimi değiştirir. Maliyet satırı yalnızca girdiğiniz kilo fiyatıyla et tutarını verir; kömür, ekmek, sebze ve içecek dahil değildir. Fiyatlar sık değiştiği için araç herhangi bir fiyat varsaymaz.",
    ] },
  ],
  faq: [
    ['Mangalda kişi başı kaç gram et hesaplanır?', 'Kemiksiz ette yetişkin başına 250 gram, kemikli ette 400 gram, ikisi karışıksa 300 gram çiğ et hesaplanır. Çocuklar için bunun yarısı yeterlidir.'],
    ['10 kişilik mangal için kaç kilo et almalıyım?', 'On yetişkin için karışık ette 3 kilogram, yalnızca kemiksiz ette 2,5 kilogram, yalnızca kemikli ette 4 kilogram çiğ et gerekir. İştahlı bir grupsa bu miktarları dörtte bir artırın.'],
    ['Kişi başı kaç gram kanat alınır?', 'Kanat kemikli olduğu için yetişkin başına yaklaşık 400 gram hesaplanır. Yanında köfte ya da başka et de olacaksa kanat payını 200 grama düşürebilirsiniz.'],
    ['Köfte için kişi başı kaç gram kıyma gerekir?', 'Köfte kemiksiz sayılır; yetişkin başına yaklaşık 250 gram köfte harcı yeterlidir. Harca ekmek içi ve soğan eklendiği için gereken kıyma bundan biraz daha azdır.'],
    ['Kömür miktarı neye göre hesaplanıyor?', 'Yaklaşık olarak her kilogram et için bir kilogram kömür, en az iki kilogram olacak şekilde hesaplanır. Büyük mangal, uzun pişirme ya da sebze közleme için daha fazlası gerekebilir.'],
    ['Et pişince ne kadar fire verir?', 'Izgarada et su ve yağ kaybeder; kayıp parçanın yağ oranına ve pişme derecesine göre değişir, çoğu zaman dörtte bir dolayındadır. Kemikli etlerde kemik ağırlığı da yenmeyen kısma eklenir. Porsiyon değerleri bu kayıplar düşünülerek belirlenmiştir.'],
    ['Fiyat alanını boş bırakabilir miyim?', 'Evet. Fiyat alanı isteğe bağlıdır; boş bıraktığınızda yalnızca miktarlar gösterilir. Doldurduğunuzda toplam et tutarı ve kişi başına düşen pay hesaplanır.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; kişi sayısı ve fiyat bilgisi sunucuya gönderilmez.'],
  ],
  related: ['parti-ikram-hesapla', 'et-pisirme-suresi-hesapla', 'et-cozdurme-suresi-hesapla', 'makarna-porsiyon-hesapla', 'kamp-su-yiyecek-hesapla'],
};
