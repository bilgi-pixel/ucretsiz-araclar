export default {
  slug: 'koni-hacmi-hesapla',
  title: 'Koni Hacmi Hesaplama',
  h1Tail: 'V = 1/3 · πr²h',
  pageTitle: 'Koni Hacmi Hesaplama – Yarıçap ve Yükseklikten Hacim ve Litre',
  description: 'Taban yarıçapını ya da çapını ve yüksekliği girerek koninin hacmini hesaplayın. Litre karşılığı, taban alanı ve ana doğru uzunluğu da gösterilir.',
  card: 'Taban yarıçapı ve yükseklikten koni hacmini hesaplayın; litre karşılığı, taban alanı ve ana doğru uzunluğuyla.',
  category: 'matematik',
  keywords: ['koni hacmi hesaplama', 'koni hacim formülü', 'koninin hacmi nasıl bulunur', '1/3 pi r kare h', 'huni hacmi hesaplama', 'kum yığını hacmi', 'dik koni hacmi'],
  lead: `Dik dairesel koninin hacmini <strong>V = 1/3 · π · r² · h</strong> formülüyle hesaplayın. Taban yarıçapını ya da çapını ve dik yüksekliği yazmanız yeterlidir; araç ayrıca litre karşılığını, taban alanını ve ana doğru uzunluğunu verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Taban ölçüsü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap']] },
    { id: 'deger', label: 'Taban yarıçapı ya da çapı', type: 'number', placeholder: 'Örn. 3' },
    { id: 'yukseklik', label: 'Yükseklik (dik)', type: 'number', placeholder: 'Örn. 4', hint: 'Tepeden tabana inen dik uzaklık; yan kenar uzunluğu değil.' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const ad = v.olcu === 'd' ? 'Taban çapı' : 'Taban yarıçapı';
    const x = h.pos(v.deger, ad);
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : x;
    const taban = Math.PI * r * r;
    const hacim = taban * yuk / 3;
    const anaDogru = Math.sqrt(r * r + yuk * yuk);
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Ana doğru uzunluğu', `${h.fmt(anaDogru, 4)} ${b}`],
        ['Aynı ölçülerdeki silindirin hacmi', `${h.fmt(taban * yuk, 4)} ${b}³`],
      ],
      note: 'Yükseklik, tepe noktasından taban düzlemine inen dik uzaklıktır. Koni hacmi aynı taban ve yükseklikteki silindirin üçte biridir.',
    };
  },
  cases: [
    { in: { olcu: 'r', deger: '3', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '37,6991 cm³', 'Taban alanı': '28,2743 cm²', 'Ana doğru uzunluğu': '5 cm' } },
    { in: { olcu: 'r', deger: '5', yukseklik: '12', birim: 'cm' }, out: { 'Hacim': '314,1593 cm³', 'Litre karşılığı': '0,3142 L', 'Ana doğru uzunluğu': '13 cm' } },
    { in: { olcu: 'r', deger: '1', yukseklik: '3', birim: 'm' }, out: { 'Hacim': '3,1416 m³', 'Litre karşılığı': '3.141,5927 L', 'Aynı ölçülerdeki silindirin hacmi': '9,4248 m³' } },
    { in: { olcu: 'd', deger: '12', yukseklik: '8', birim: 'cm' }, out: { 'Hacim': '301,5929 cm³', 'Ana doğru uzunluğu': '10 cm' } },
    { in: { olcu: 'd', deger: '4', yukseklik: '1,5', birim: 'm' }, out: { 'Hacim': '6,2832 m³', 'Litre karşılığı': '6.283,1853 L', 'Ana doğru uzunluğu': '2,5 m' } },
    { in: { olcu: 'r', deger: '30', yukseklik: '40', birim: 'mm' }, out: { 'Hacim': '37.699,1118 mm³', 'Litre karşılığı': '0,0377 L' } },
    { in: { olcu: 'r', deger: '3', yukseklik: '0', birim: 'cm' }, error: true },
    { in: { olcu: 'r', deger: '', yukseklik: '4', birim: 'cm' }, error: true },
  ],
  howto: [
    `"Taban ölçüsü" listesinden tabanın yarıçapını mı çapını mı gireceğinizi seçin.`,
    `Taban ölçüsünü ve koninin dik yüksekliğini aynı birimle yazın. Elinizde yalnızca yan kenar (ana doğru) uzunluğu varsa önce Pisagor bağıntısıyla yüksekliği bulun.`,
    `Uzunluk birimini seçin: santimetre, metre ya da milimetre.`,
    `"Hesapla" düğmesine basın; hacim, litre karşılığı, taban alanı, ana doğru uzunluğu ve karşılaştırma için aynı ölçülerdeki silindirin hacmi görünür.`,
  ],
  sections: [
    { h: 'Koni hacmi formülü ve üçte bir kuralı', p: [
      `Koni, dairesel bir tabanın bütün noktalarının taban dışındaki tek bir tepe noktasıyla birleştirilmesiyle oluşur. Hacmi <strong>V = 1/3 · π · r² · h</strong> formülüyle bulunur; burada r taban yarıçapı, h ise tepeden taban düzlemine inen dik yüksekliktir. Formüldeki π · r² taban alanıdır, dolayısıyla koni hacmi "taban alanı çarpı yükseklik bölü üç" diye de okunabilir.`,
      `Üçte bir çarpanı ezberlenecek bir ayrıntı değil, somut bir gerçektir: tabanı ve yüksekliği aynı olan bir silindiri doldurmak için koni biçimli kabı tam üç kez doldurup boşaltmanız gerekir. Okullarda kum ya da suyla yapılan bu deney, koninin silindirin üçte biri olduğunu gözle gösterir. Araç bu karşılaştırmayı kolaylaştırmak için aynı ölçülerdeki silindirin hacmini de ayrı bir satırda verir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Taban yarıçapı 3 cm, yüksekliği 4 cm olan bir koni düşünelim. Taban alanı π · 3² = 9π ≈ 28,2743 cm² olur. Bunu yükseklikle çarpıp üçe böleriz: 28,2743 · 4 ÷ 3 = 12π ≈ <strong>37,6991 cm³</strong>. Yan kenar uzunluğu, yani ana doğru, yarıçap ve yüksekliğin oluşturduğu dik üçgenin hipotenüsüdür: √(3² + 4²) = 5 cm.`,
      `Daha büyük bir örnek: taban çapı 4 metre, yüksekliği 1,5 metre olan konik bir kum yığınında yarıçap 2 m\'dir. Hacim 1/3 · π · 4 · 1,5 = 2π ≈ <strong>6,2832 m³</strong> eder. Yığının yan yüzeyi boyunca tepeden tabana uzaklık √(2² + 1,5²) = 2,5 metredir.`,
    ] },
    { h: 'Yükseklik ile ana doğruyu karıştırmayın', p: [
      `Koni sorularındaki en yaygın hata, yan yüzey boyunca ölçülen uzunluğu yükseklik sanmaktır. Bir külahın kenarına cetvel dayayarak ölçtüğünüz değer ana doğrudur (l); formülde kullanılan yükseklik (h) ise tepeden tabanın merkezine inen dik doğrudur ve her zaman ana doğrudan kısadır. İkisi arasındaki bağıntı <strong>l² = r² + h²</strong> biçimindedir. Yalnızca ana doğruyu biliyorsanız yüksekliği h = √(l² − r²) ile hesaplayıp araca öyle girin. Örneğin ana doğrusu 13 cm, yarıçapı 5 cm olan koninin yüksekliği √(169 − 25) = 12 cm\'dir ve hacmi 100π ≈ 314,1593 cm³ çıkar.`,
    ] },
    { h: 'Günlük hayatta koni hacmi', ul: [
      `<strong>Yığınlar:</strong> Serbestçe dökülen kum, çakıl, tahıl ve kömür yaklaşık koni biçiminde birikir; yığının taban çapı ve yüksekliği ölçülerek miktar tahmin edilebilir.`,
      `<strong>Huniler ve siloların konik dip kısımları:</strong> Silindirik gövdenin altındaki konik bölümün hacmi ayrı hesaplanıp gövde hacmine eklenir.`,
      `<strong>Külah ve kâğıt bardak:</strong> Dondurma külahı ya da konik su bardağının ne kadar aldığı bu formülle bulunur.`,
      `<strong>Çatı ve kule:</strong> Konik bir çatının altında kalan hava hacmi havalandırma hesaplarında kullanılır.`,
    ] },
    { h: 'Ölçü değişince hacim nasıl değişir?', p: [
      `Hacim yarıçapın karesiyle, yüksekliğin ise kendisiyle orantılıdır. Yüksekliği iki katına çıkarmak hacmi iki kat, yarıçapı iki katına çıkarmak dört kat büyütür. Her iki ölçü birden iki katına çıkarsa hacim sekiz katına ulaşır. Bunun pratik bir sonucu vardır: koni biçimli bir bardağı yüksekliğinin yarısına kadar doldurduğunuzda bardağın yarısını değil, yalnızca <strong>sekizde birini</strong> doldurmuş olursunuz; çünkü sıvının oluşturduğu küçük koninin hem yarıçapı hem yüksekliği yarıya inmiştir.`,
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      `Hesap, tabanı tam daire olan koniler içindir. Tepe noktası tabanın merkezinin tam üstünde olmasa bile (eğik koni) hacim formülü değişmez; yeter ki yükseklik dik olarak ölçülsün. Ancak "Ana doğru uzunluğu" satırı yalnızca dik koni için anlamlıdır. Tepesi kesilmiş koniler için kesik koni hesabı kullanılmalıdır. Gerçek malzeme yığınları kusursuz koni olmadığından bulunan miktar yaklaşık kabul edilmeli; sipariş, hak ediş ya da mühendislik kararları için yerinde ölçüm ve uzman değerlendirmesi esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Koninin hacmi nasıl hesaplanır?', 'Taban alanı yükseklikle çarpılıp üçe bölünür: V = 1/3 · π · r² · h. Yarıçapı 3 cm, yüksekliği 4 cm olan koninin hacmi 12π, yani yaklaşık 37,6991 cm³ olur.'],
    ['Koni hacmi neden silindirin üçte biridir?', 'Aynı taban ve yükseklikteki bir silindir tam üç koni hacmi alır. Bu sonuç integral hesabıyla kanıtlanır; aynı oran piramit ile prizma arasında da geçerlidir.'],
    ['Yüksekliği bilmiyorum, yalnızca yan kenar uzunluğu var. Ne yapmalıyım?', 'Yan kenar (ana doğru) l ve yarıçap r ise yükseklik h = √(l² − r²) olur. Örneğin l = 10 cm ve r = 6 cm için yükseklik 8 cm\'dir; bu değeri yükseklik alanına yazın.'],
    ['Koninin hacmini litre olarak nasıl bulurum?', 'Ölçüleri santimetre girdiyseniz çıkan cm³ değeri 1000\'e bölünür; metre girdiyseniz m³ değeri 1000 ile çarpılır. Araç sonucu "Litre karşılığı" satırında doğrudan gösterir.'],
    ['Eğik koni için de aynı formül geçerli mi?', 'Evet. Tepe noktası yana kaymış olsa da hacim taban alanı çarpı dik yükseklik bölü üçtür. Yüksekliği tepe ile taban düzlemi arasındaki dik uzaklık olarak ölçmeniz gerekir.'],
    ['Kum yığınının hacmini bu araçla hesaplayabilir miyim?', 'Yaklaşık olarak evet. Yığının taban çapını ve tepe yüksekliğini ölçüp girin. Yığının tepesi yuvarlak ya da tabanı düzensizse gerçek miktar hesaplanandan bir miktar farklı olacaktır.'],
    ['Koni ile piramit hacmi arasındaki fark nedir?', 'İkisinde de hacim taban alanı çarpı yükseklik bölü üçtür. Fark tabanın biçimindedir: konide taban dairedir (π · r²), piramitte ise kare, dikdörtgen ya da başka bir çokgendir.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Tüm işlem tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['koni-yuzey-alani-hesapla', 'kesik-koni-hacmi-hesapla', 'silindir-hacmi-hesapla', 'piramit-hacmi-hesapla', 'kure-hacmi-hesapla', 'dik-ucgen-hesapla'],
};
