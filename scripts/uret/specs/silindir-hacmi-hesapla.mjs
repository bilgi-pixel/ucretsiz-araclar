export default {
  slug: 'silindir-hacmi-hesapla',
  title: 'Silindir Hacmi Hesaplama',
  h1Tail: 'V = πr²h',
  pageTitle: 'Silindir Hacmi Hesaplama – Yarıçap ya da Çap ile Litre Karşılığı',
  description: 'Yarıçapı ya da çapı ve yüksekliği girerek silindirin hacmini hesaplayın. Sonuç cm³, m³ ya da mm³ olarak, litre karşılığı ve taban alanıyla birlikte gösterilir.',
  card: 'Yarıçap ya da çap ve yükseklikten silindir hacmini bulun; litre karşılığı ve taban alanı da hesaplanır.',
  category: 'matematik',
  keywords: ['silindir hacmi hesaplama', 'silindir hacim formülü', 'silindir kaç litre', 'πr²h hesaplama', 'varil hacmi hesaplama', 'silindir tank hacmi', 'çaptan silindir hacmi'],
  lead: `Dik dairesel silindirin hacmini <strong>V = π · r² · h</strong> formülüyle hesaplayın. Yarıçap yerine çapı da girebilirsiniz; araç hacmi seçtiğiniz birimin kübü cinsinden verir, yanında litre karşılığını ve taban alanını gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Girilen ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap']] },
    { id: 'deger', label: 'Yarıçap ya da çap', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Yükseklik', type: 'number', placeholder: 'Örn. 10' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const hacim = taban * yuk;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
      ],
      note: 'Hesap dik dairesel silindir içindir; π değeri tam duyarlıkla alınır ve sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { olcu: 'r', deger: '5', yukseklik: '10', birim: 'cm' }, out: { 'Hacim': '785,3982 cm³', 'Litre karşılığı': '0,7854 L', 'Taban alanı': '78,5398 cm²' } },
    { in: { olcu: 'd', deger: '1', yukseklik: '2', birim: 'm' }, out: { 'Hacim': '1,5708 m³', 'Litre karşılığı': '1.570,7963 L', 'Yarıçap': '0,5 m' } },
    { in: { olcu: 'r', deger: '1', yukseklik: '1', birim: 'm' }, out: { 'Hacim': '3,1416 m³', 'Litre karşılığı': '3.141,5927 L' } },
    { in: { olcu: 'd', deger: '10', yukseklik: '10', birim: 'cm' }, out: { 'Hacim': '785,3982 cm³' } },
    { in: { olcu: 'r', deger: '10', yukseklik: '100', birim: 'mm' }, out: { 'Hacim': '31.415,9265 mm³', 'Litre karşılığı': '0,0314 L' } },
    { in: { olcu: 'r', deger: '2,5', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '78,5398 cm³', 'Taban alanı': '19,635 cm²' } },
    { in: { olcu: 'r', deger: '0', yukseklik: '10', birim: 'cm' }, error: true },
    { in: { olcu: 'r', deger: '5', yukseklik: '', birim: 'cm' }, error: true },
    { in: { olcu: 'd', deger: '-4', yukseklik: '3', birim: 'm' }, error: true },
  ],
  howto: [
    `"Girilen ölçü" listesinden elinizdeki değerin yarıçap mı yoksa çap mı olduğunu seçin. Cetvelle ya da kumpasla ölçüm yaptıysanız büyük olasılıkla çapı ölçmüşsünüzdür.`,
    `Yarıçapı ya da çapı ve silindirin yüksekliğini aynı uzunluk birimiyle yazın; ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz.`,
    `"Uzunluk birimi" listesinden santimetre, metre ya da milimetreyi seçin. Hacim bu birimin kübü olarak verilir.`,
    `"Hesapla" düğmesine basın; hacim, litre karşılığı, taban alanı ve kullanılan yarıçap sonuç kutusunda listelenir.`,
  ],
  sections: [
    { h: 'Silindir hacmi formülü nereden gelir?', p: [
      `Silindir, birbirine paralel ve eş iki dairenin bir yüzeyle birleştirilmesiyle oluşan cisimdir. Hacmi, tabandaki dairenin alanının yükseklik boyunca "yığılması" olarak düşünülebilir: taban alanı <strong>π · r²</strong>, yükseklik <strong>h</strong> olduğuna göre hacim <strong>V = π · r² · h</strong> olur. Aynı mantık bütün dik prizmalarda geçerlidir; hacim her zaman taban alanı çarpı yüksekliktir, silindirde yalnızca taban bir dairedir.`,
      `Elinizde çap varsa yarıçap çapın yarısıdır: r = d ÷ 2. Formül çap cinsinden <strong>V = π · d² · h ÷ 4</strong> biçiminde de yazılabilir. Araç "Çap" seçeneğinde bu dönüşümü kendisi yapar ve hangi yarıçapı kullandığını sonuçta gösterir.`,
    ] },
    { h: 'Çözümlü örnek: konserve kutusu', p: [
      `Yarıçapı 5 cm, yüksekliği 10 cm olan bir kutuyu ele alalım. Önce taban alanı bulunur: π · 5² = 25π ≈ 78,5398 cm². Bu alan yükseklikle çarpılır: 78,5398 · 10 = <strong>785,3982 cm³</strong>. Bir litre 1000 cm³ olduğundan kutu yaklaşık 0,7854 litre alır. Aynı kutunun çapını 10 cm olarak girip "Çap" seçeneğini işaretlerseniz sonuç değişmez.`,
    ] },
    { h: 'Çözümlü örnek: dik su deposu', p: [
      `Çapı 1 metre, yüksekliği 2 metre olan silindirik bir su deposunun kapasitesini bulalım. Yarıçap 0,5 m, taban alanı π · 0,25 ≈ 0,7854 m², hacim 0,7854 · 2 = <strong>1,5708 m³</strong> eder. Bir metreküp 1000 litre olduğundan depo yaklaşık 1.570,8 litre su alır. Su için 1 litre yaklaşık 1 kilogram geldiğinden bu depo doluyken içinde bir buçuk tonu aşan su bulunur; gerçek kapasite et kalınlığına ve kapak biçimine göre biraz farklı çıkabilir.`,
    ] },
    { h: 'Birimler ve litreye çevirme', p: [
      `Yarıçap ve yükseklik aynı birimde olmalıdır. Biri santimetre, diğeri metre ise önce ikisini de aynı birime getirin; aksi halde sonuç yüz ya da on bin kat hatalı çıkar. Hacim birimleri arasındaki oranlar uzunluktaki oranın kübüdür, bu yüzden küçük bir birim yanlışı büyük hataya dönüşür.`,
    ], ul: [
      `<strong>1 litre</strong> = 1000 cm³ = 1 dm³`,
      `<strong>1 m³</strong> = 1000 litre = 1.000.000 cm³`,
      `<strong>1 cm³</strong> = 1 mililitre = 1000 mm³`,
      `Suyla dolu bir kapta 1 litre yaklaşık 1 kilogram gelir; bu yüzden litre değeri su için kabaca kilogram olarak da okunabilir.`,
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      `Silindirik su deposu, yakıt tankı, varil ve bidon kapasitesini tahmin etmek`,
      `Kuyu bileziği, kolon kalıbı ya da fore kazık için gereken beton miktarını kabaca bulmak`,
      `Bardak, kavanoz, tencere ve ölçü kabı hacmini kontrol etmek`,
      `Boru ya da hortum içindeki sıvı miktarını hesaplamak (iç çap ve uzunluk girilerek)`,
      `Geometri ödevlerinde ve sınav sorularında sonucu doğrulamak`,
    ] },
    { h: 'Sık yapılan hatalar', p: [
      `En yaygın hata çapı yarıçap yerine yazmaktır. Yarıçap formülde karesiyle yer aldığı için bu durumda hacim iki değil <strong>dört kat</strong> büyük çıkar. İkinci hata, kabın dış ölçülerini kullanmaktır: kalın cidarlı bir depoda içine sığan sıvı miktarı için iç çap ve iç yükseklik alınmalıdır. Üçüncüsü, yatık duran bir tankta kısmi doluluğu bu formülle hesaplamaya çalışmaktır; formül yalnızca tamamen dolu silindir ya da dik duran tankta sıvı yüksekliği kadar olan kısım için geçerlidir.`,
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      `Araç dik dairesel silindiri esas alır: tabanlar tam daire, yan yüzey tabana diktir. Eğik silindirde de hacim taban alanı çarpı dik yüksekliktir, yani yüksekliği iki taban arasındaki dik uzaklık olarak girerseniz sonuç geçerliliğini korur. Tabanı bombeli depolar, konik dipli silolar ve ağzı daralan şişeler bu formüle tam uymaz. Sonuçlar bilgilendirme amaçlıdır; beton dökümü, basınçlı kap ya da yakıt tankı gibi mühendislik gerektiren işlerde üretici verileri ve ilgili uzman esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Silindirin hacmi nasıl hesaplanır?', 'Taban dairesinin alanı yükseklikle çarpılır: V = π · r² · h. Yarıçapın karesini alın, π (yaklaşık 3,1416) ile çarpın, sonra yükseklikle çarpın. Örneğin r = 5 cm ve h = 10 cm için hacim 785,3982 cm³ çıkar.'],
    ['Çapı biliyorsam ne yapmalıyım?', 'Çapı ikiye bölerek yarıçapı bulabilir ya da doğrudan "Çap" seçeneğini kullanabilirsiniz. Çap cinsinden formül V = π · d² · h ÷ 4 biçimindedir ve aynı sonucu verir.'],
    ['Silindir hacmini litreye nasıl çeviririm?', 'Santimetreküp cinsinden hacmi 1000\'e bölerseniz litre elde edersiniz; metreküp cinsinden hacmi ise 1000 ile çarparsınız. Araç bu dönüşümü "Litre karşılığı" satırında kendiliğinden yapar.'],
    ['Yarıçap iki katına çıkarsa hacim nasıl değişir?', 'Yarıçap formülde karesiyle bulunduğu için hacim dört katına çıkar. Yükseklik iki katına çıkarsa hacim yalnızca iki kat artar. Bu yüzden geniş ve kısa bir kap, dar ve uzun bir kaptan beklenenden çok daha fazla sıvı alabilir.'],
    ['π için hangi değer kullanılıyor?', 'Araç π sayısını bilgisayarın sağladığı tam duyarlıkla (3,14159265…) kullanır. Okul sorularında π = 3 ya da 3,14 alınması istenmişse sonucunuz burada görünenle küçük bir farkla ayrışır; bu bir hata değildir.'],
    ['Yatay duran silindirik tankın hacmini de hesaplayabilir miyim?', 'Tank tamamen doluysa evet; silindirin yatık ya da dik durması toplam hacmi değiştirmez, uzunluğu yükseklik olarak girmeniz yeterlidir. Yarı dolu yatay tankta sıvı miktarı ise farklı bir formül gerektirir.'],
    ['İçi boş bir borunun malzeme hacmini nasıl bulurum?', 'Dış çapla bir kez, iç çapla bir kez hesap yapın ve iki hacmi birbirinden çıkarın. Kalan değer boru cidarının hacmidir; malzemenin yoğunluğuyla çarparak ağırlığı da tahmin edebilirsiniz.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['silindir-yuzey-alani-hesapla', 'koni-hacmi-hesapla', 'kure-hacmi-hesapla', 'daire-alani-hesapla', 'su-deposu-hacmi-hesapla', 'boru-hacmi-hesapla'],
};
