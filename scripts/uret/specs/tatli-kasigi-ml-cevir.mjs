export default {
  slug: 'tatli-kasigi-ml-cevir',
  title: 'Tatlı Kaşığı Mililitre Çevirici',
  h1Tail: 'tatlı kaşığı ↔ ml',
  pageTitle: `Tatlı Kaşığı Mililitre Çevirici – 1 Tatlı Kaşığı Kaç ml?`,
  description: `Tatlı kaşığını mililitreye, mililitreyi tatlı kaşığına çevirin. Çay kaşığı, yemek kaşığı ve su bardağı karşılıklarını da verir; kaşık hacmini kendiniz ayarlayabilirsiniz.`,
  card: `Tatlı kaşığı, çay kaşığı ve yemek kaşığını mililitreye çevirin; tariflerde ölçü karşılıklarını hızlıca bulun.`,
  category: 'birim',
  keywords: ['tatlı kaşığı kaç ml', '1 tatlı kaşığı kaç mililitre', 'tatlı kaşığı ml çevirme', 'çay kaşığı kaç ml', 'yemek kaşığı kaç ml', '10 ml kaç tatlı kaşığı', 'mutfak ölçüleri kaşık'],
  lead: `Tariflerdeki kaşık ölçülerini mililitreye, mililitre değerlerini kaşığa çevirin. Araç varsayılan olarak <strong>1 tatlı kaşığı = 5 ml</strong> kabul eder; elinizdeki kaşık ya da izlediğiniz tarif farklı bir hacim kullanıyorsa bu değeri değiştirebilirsiniz.`,
  button: 'Çevir',
  inputs: [
    { id: 'miktar', label: 'Miktar', type: 'number', placeholder: 'Örn. 2' },
    { id: 'birim', label: 'Girilen ölçü', type: 'select', options: [['tatli', 'Tatlı kaşığı'], ['cay', 'Çay kaşığı'], ['yemek', 'Yemek kaşığı'], ['ml', 'Mililitre (ml)']] },
    { id: 'tatliMl', label: 'Tatlı kaşığı hacmi (ml)', type: 'number', value: '5', hint: 'Mutfak ölçü setlerinde 5 ml yaygındır. Tarifiniz tatlı kaşığını 10 ml alıyorsa burayı değiştirin.' },
  ],
  compute(v, h) {
    const CAY_ML = 2.5, YEMEK_ML = 15, BARDAK_ML = 200;
    const x = h.nonneg(v.miktar, 'Miktar');
    const tatliMl = h.pos(v.tatliMl, 'Tatlı kaşığı hacmi');
    if (tatliMl > 30) h.err('"Tatlı kaşığı hacmi" 30 ml\'den büyük olamaz; tipik değerler 5 ile 10 ml arasındadır.');
    const carpan = { tatli: tatliMl, cay: CAY_ML, yemek: YEMEK_ML, ml: 1 };
    const ml = x * (carpan[v.birim] || tatliMl);
    const mlSatir = ['Mililitre', h.fmt(ml, 2) + ' ml'];
    const tatliSatir = ['Tatlı kaşığı', h.fmt(ml / tatliMl, 2) + ' tatlı kaşığı'];
    return {
      rows: [
        v.birim === 'ml' ? tatliSatir : mlSatir,
        v.birim === 'ml' ? mlSatir : tatliSatir,
        ['Çay kaşığı', h.fmt(ml / CAY_ML, 2) + ' çay kaşığı'],
        ['Yemek kaşığı', h.fmt(ml / YEMEK_ML, 2) + ' yemek kaşığı'],
        ['Su bardağı', h.fmt(ml / BARDAK_ML, 3) + ' su bardağı'],
      ],
      note: `Kabul edilen hacimler: tatlı kaşığı ${h.fmt(tatliMl, 2)} ml, çay kaşığı 2,5 ml, yemek kaşığı 15 ml, su bardağı 200 ml. Ölçüler silme (düz) dolu kaşık içindir.`,
    };
  },
  cases: [
    { in: { miktar: '1', birim: 'tatli' }, out: { 'Mililitre': '5 ml', 'Çay kaşığı': '2 çay kaşığı', 'Yemek kaşığı': '0,33 yemek kaşığı' } },
    { in: { miktar: '10', birim: 'ml' }, out: { 'Tatlı kaşığı': '2 tatlı kaşığı', 'Çay kaşığı': '4 çay kaşığı' } },
    { in: { miktar: '3', birim: 'tatli' }, out: { 'Mililitre': '15 ml', 'Yemek kaşığı': '1 yemek kaşığı' } },
    { in: { miktar: '2', birim: 'yemek' }, out: { 'Mililitre': '30 ml', 'Tatlı kaşığı': '6 tatlı kaşığı', 'Su bardağı': '0,15 su bardağı' } },
    { in: { miktar: '1,5', birim: 'tatli' }, out: { 'Mililitre': '7,5 ml', 'Çay kaşığı': '3 çay kaşığı' } },
    { in: { miktar: '1', birim: 'tatli', tatliMl: '10' }, out: { 'Mililitre': '10 ml', 'Çay kaşığı': '4 çay kaşığı' } },
    { in: { miktar: '4', birim: 'cay' }, out: { 'Mililitre': '10 ml', 'Tatlı kaşığı': '2 tatlı kaşığı' } },
    { in: { miktar: 'bir', birim: 'tatli' }, error: true },
    { in: { miktar: '2', birim: 'tatli', tatliMl: '0' }, error: true },
  ],
  howto: [
    `"Miktar" alanına tarifteki sayıyı yazın; yarım kaşık için 0,5, bir buçuk için 1,5 girin.`,
    `"Girilen ölçü" listesinden bu sayının tatlı kaşığı, çay kaşığı, yemek kaşığı ya da mililitre olduğunu seçin.`,
    `Tarifiniz ya da ölçü setiniz tatlı kaşığını 5 ml'den farklı tanımlıyorsa "Tatlı kaşığı hacmi" alanını güncelleyin.`,
    `"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, diğer satırlar aynı hacmin öteki ölçülerdeki değerini gösterir.`,
  ],
  sections: [
    { h: '1 tatlı kaşığı kaç mililitredir?', p: [
      `Bu sorunun tek bir kesin yanıtı yoktur, çünkü çekmecedeki kaşıklar bir ölçü aleti olarak üretilmez; markadan markaya, takımdan takıma hacimleri değişir. Yine de tariflerin ortak bir dile ihtiyacı olduğu için mutfak ölçü kaşığı setlerinde belirli hacimler yerleşmiştir. Türkçe tariflerde ve bu setlerde <strong>tatlı kaşığı çoğunlukla 5 ml</strong>, çay kaşığı 2,5 ml, yemek kaşığı 15 ml olarak kabul edilir. Araç da varsayılan olarak bu değerlerle çalışır.`,
      `Buna karşılık bazı kaynaklar tatlı kaşığını, İngiliz ölçü sistemindeki "dessert spoon" karşılığı olarak <strong>10 ml</strong> alır. Aynı adın iki farklı hacmi göstermesi, özellikle çeviri tariflerde sonucu belirgin biçimde değiştirebilir. Bu yüzden sayfada kaşık hacmi sabitlenmemiş, ayarlanabilir bırakılmıştır: tarifinizin başında ya da kitabın ölçü tablosunda hangi değer veriliyorsa onu girin.`,
    ] },
    { h: 'Çeviri formülü ve çözümlü örnek', p: [
      `Hesap tek bir çarpmadır: <strong>ml = kaşık sayısı × kaşık hacmi</strong>. Mililitreden kaşığa dönmek için aynı hacme bölersiniz.`,
      `Bir kek tarifinde 3 tatlı kaşığı vanilya özütü isteniyor. 5 ml'lik kabulle 3 × 5 = <strong>15 ml</strong> eder; bu aynı zamanda tam 1 yemek kaşığıdır. Ters yönde: şurup kutusunda "10 ml" yazıyorsa 10 ÷ 5 = 2 tatlı kaşığı ya da 10 ÷ 2,5 = 4 çay kaşığı karşılığıdır. Bir buçuk tatlı kaşığı ise 1,5 × 5 = 7,5 ml, yani 3 çay kaşığıdır.`,
      `Aynı tarifi tatlı kaşığını 10 ml sayan bir kaynaktan okuyorsanız 3 tatlı kaşığı 30 ml olur. Aradaki iki kat fark, kabartma tozu ya da tuz gibi az miktarda kullanılan malzemelerde sonucu doğrudan etkiler.`,
    ] },
    { h: 'Mutfak kaşık ölçüleri: hızlı başvuru', p: [
      `Aşağıdaki karşılıklar bu sayfanın varsayılan kabullerine göredir ve silme dolu kaşık içindir.`,
    ], ul: [
      `<strong>1 çay kaşığı</strong> = 2,5 ml`,
      `<strong>1 tatlı kaşığı</strong> = 5 ml = 2 çay kaşığı`,
      `<strong>1 yemek kaşığı</strong> = 15 ml = 3 tatlı kaşığı`,
      `<strong>2 yemek kaşığı</strong> = 30 ml`,
      `<strong>1 çay bardağı</strong> = yaklaşık 100 ml = 20 tatlı kaşığı`,
      `<strong>1 su bardağı</strong> = yaklaşık 200 ml = 40 tatlı kaşığı`,
    ] },
    { h: 'Yabancı tariflerdeki kısaltmalar', p: [
      `İngilizce tariflerde <code>tsp</code> (teaspoon) yaklaşık 5 ml'dir ve hacim olarak bizdeki tatlı kaşığına denk gelir; adının "çay kaşığı" diye çevrilmesi karışıklığın başlıca kaynağıdır. <code>tbsp</code> (tablespoon) yaklaşık 15 ml'dir ve yemek kaşığına karşılık gelir. İngiliz kaynaklarında görülen <code>dsp</code> (dessert spoon) ise yaklaşık 10 ml'dir.`,
      `Yabancı bir tarifi uygularken kaşık adını sözlük anlamıyla çevirmek yerine mililitre değerine bakmak en güvenli yoldur. Tarifte mililitre verilmemişse kısaltmanın hacmini yukarıdaki değerlerle eşleştirip "Mililitre" seçeneğiyle girerek kendi kaşıklarınıza çevirebilirsiniz.`,
    ] },
    { h: 'Doğru ölçüm için ipuçları', ul: [
      `<strong>Silme ve tepeleme farkı:</strong> un, şeker, kakao gibi kuru malzemelerde tepeleme kaşık, silme kaşığın neredeyse iki katı malzeme alabilir. Tarif aksini söylemiyorsa kaşığın üstünü bıçak sırtıyla düzleyin.`,
      `<strong>Hacim ağırlık değildir:</strong> 5 ml su yaklaşık 5 gramdır, ama 5 ml un, tuz ya da bal aynı ağırlıkta değildir. Gram gerektiren tariflerde mutfak terazisi kullanın.`,
      `<strong>Ölçü kaşığı seti edinin:</strong> üzerinde ml yazan ölçü kaşıkları, sofra kaşıklarının belirsizliğini ortadan kaldırır.`,
      `<strong>Sıvılarda göz hizası:</strong> yoğun sıvılar kaşıkta kubbe yapar; taşmadan hemen önceki düzey esas alınır.`,
    ] },
    { h: 'İlaç ölçümü için uyarı', p: [
      `Bu araç mutfak tarifleri için hazırlanmıştır. Şurup ve damla gibi sıvı ilaçlarda doz, ev kaşığıyla ölçülmemelidir; sofra kaşıklarının hacmi birbirinden çok farklı olabildiği için eksik ya da fazla doz verilebilir. İlacın kutusundan çıkan ölçü kaşığını, ölçeği ya da şırıngasını kullanın ve doz konusunda hekiminizin ya da eczacınızın söylediği mililitre değerini esas alın.`,
    ] },
  ],
  faq: [
    ['1 tatlı kaşığı kaç ml eder?', `Mutfak ölçü setlerinde ve Türkçe tariflerin çoğunda 1 tatlı kaşığı 5 ml kabul edilir. Bazı kaynaklar 10 ml alır; tarifinizdeki tanımı kontrol edip araçtaki hacim alanını buna göre ayarlayabilirsiniz.`],
    ['10 ml kaç tatlı kaşığıdır?', `5 ml'lik kabulle 10 ml, 2 tatlı kaşığı eder. Aynı hacim 4 çay kaşığına ya da bir yemek kaşığının üçte ikisine karşılık gelir.`],
    ['1 yemek kaşığı kaç tatlı kaşığıdır?', `1 yemek kaşığı 15 ml, 1 tatlı kaşığı 5 ml kabul edildiğinde 1 yemek kaşığı 3 tatlı kaşığı eder.`],
    ['Çay kaşığı ile tatlı kaşığı arasındaki fark nedir?', `Çay kaşığı daha küçüktür ve 2,5 ml kabul edilir; tatlı kaşığı bunun iki katı, 5 ml'dir. Yani 2 çay kaşığı 1 tatlı kaşığı eder.`],
    ['İngilizce tariflerdeki teaspoon tatlı kaşığı mıdır?', `Hacim olarak evet. Teaspoon yaklaşık 5 ml'dir ve bizdeki tatlı kaşığı ölçüsüne denk gelir. Sözcük "çay kaşığı" diye çevrilse de Türk çay kaşığından büyüktür.`],
    ['1 tatlı kaşığı kaç gramdır?', `Bu, malzemeye bağlıdır. 5 ml su yaklaşık 5 gramdır; aynı hacimdeki tuz daha ağır, un ve kakao daha hafiftir. Kaşık hacim ölçer, ağırlık için terazi gerekir.`],
    ['Evdeki kaşığımın hacmini nasıl ölçerim?', `Üzerinde ml çizgileri olan bir şırınga ya da ölçü kabıyla kaşığı silme dolduracak kadar su koyup miktarı okuyun. Bulduğunuz değeri "Tatlı kaşığı hacmi" alanına yazarak hesabı kendi kaşığınıza göre yapabilirsiniz.`],
    ['Girdiğim bilgiler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez. Sayfa açıldıktan sonra internet olmadan da çalışır.`],
  ],
  related: ['su-bardagi-gram-cevir', 'ml-sivi-ons-cevir', 'litre-mililitre-cevir', 'cc-ml-cevir', 'firin-derece-cevir'],
};
