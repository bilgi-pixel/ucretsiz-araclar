export default {
  slug: 'kesik-koni-hacmi-hesapla',
  title: 'Kesik Koni Hacmi Hesaplama',
  h1Tail: 'V = πh(R² + Rr + r²)/3',
  pageTitle: 'Kesik Koni Hacmi Hesaplama – Kova, Saksı ve Bardak Hacmi',
  description: 'Kesik koninin hacmini iki yarıçap ve yükseklikten hesaplayın. Kova, saksı, bardak gibi kaplar için litre karşılığı, ana doğru, yanal ve toplam yüzey alanı da verilir.',
  card: 'İki yarıçap ve yükseklikten kesik koni hacmini bulun; kova, saksı ve bardak için litre karşılığı ve yüzey alanıyla.',
  category: 'matematik',
  keywords: ['kesik koni hacmi hesaplama', 'kesik koni formülü', 'kova hacmi hesaplama', 'saksı hacmi kaç litre', 'bardak hacmi hesaplama', 'kesik koni yanal alan', 'konik kap hacmi'],
  lead: `Ağzı tabanından geniş bir kova, saksı ya da bardak aslında bir kesik konidir. İki yarıçapı ve yüksekliği girin; araç hacmi <strong>V = π · h · (R² + R·r + r²) ÷ 3</strong> formülüyle hesaplar, litre karşılığını, ana doğruyu ve yüzey alanlarını da verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'buyuk', label: 'Büyük yarıçap (R)', type: 'number', placeholder: 'Örn. 15' },
    { id: 'kucuk', label: 'Küçük yarıçap (r)', type: 'number', placeholder: 'Örn. 10', hint: '0 yazarsanız tam koni hesaplanır.' },
    { id: 'yukseklik', label: 'Yükseklik (dik)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.buyuk, 'Büyük yarıçap');
    const y = h.nonneg(v.kucuk, 'Küçük yarıçap');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const R = Math.max(x, y);
    const r = Math.min(x, y);
    if (!(R > 0)) h.err('Yarıçaplardan en az biri sıfırdan büyük olmalı.');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = Math.PI * yuk * (R * R + R * r + r * r) / 3;
    const l = Math.sqrt((R - r) * (R - r) + yuk * yuk);
    const yanal = Math.PI * (R + r) * l;
    const tabanlar = Math.PI * (R * R + r * r);
    const tur = r === 0 ? 'Küçük yarıçap sıfır olduğu için cisim tam konidir.' : R === r ? 'İki yarıçap eşit olduğu için cisim silindirdir.' : 'Yükseklik iki taban arasındaki dik uzaklıktır.';
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Ana doğru (yan kenar)', `${h.fmt(l, 4)} ${b}`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Toplam yüzey alanı', `${h.fmt(yanal + tabanlar, 4)} ${b}²`],
      ],
      note: tur + ' Kap kapasitesi için iç ölçüleri kullanın.',
    };
  },
  cases: [
    { in: { buyuk: '5', kucuk: '2', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '163,3628 cm³', 'Ana doğru (yan kenar)': '5 cm', 'Yanal alan': '109,9557 cm²', 'Toplam yüzey alanı': '201,0619 cm²' } },
    { in: { buyuk: '15', kucuk: '10', yukseklik: '30', birim: 'cm' }, out: { 'Hacim': '14.922,5651 cm³', 'Litre karşılığı': '14,9226 L' } },
    { in: { buyuk: '6', kucuk: '3', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '263,8938 cm³', 'Ana doğru (yan kenar)': '5 cm', 'Yanal alan': '141,3717 cm²', 'Toplam yüzey alanı': '282,7433 cm²' } },
    { in: { buyuk: '3', kucuk: '3', yukseklik: '10', birim: 'cm' }, out: { 'Hacim': '282,7433 cm³', 'Ana doğru (yan kenar)': '10 cm', 'Yanal alan': '188,4956 cm²' } },
    { in: { buyuk: '3', kucuk: '0', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '37,6991 cm³', 'Yanal alan': '47,1239 cm²', 'Toplam yüzey alanı': '75,3982 cm²' } },
    { in: { buyuk: '2', kucuk: '5', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '163,3628 cm³' } },
    { in: { buyuk: '1', kucuk: '0,5', yukseklik: '2', birim: 'm' }, out: { 'Hacim': '3,6652 m³', 'Litre karşılığı': '3.665,1914 L' } },
    { in: { buyuk: '5', kucuk: '2', yukseklik: '0', birim: 'cm' }, error: true },
    { in: { buyuk: '0', kucuk: '0', yukseklik: '4', birim: 'cm' }, error: true },
    { in: { buyuk: '5', kucuk: '', yukseklik: '4', birim: 'cm' }, error: true },
  ],
  howto: [
    `Kabın geniş ağzının yarıçapını "Büyük yarıçap", dar tabanının yarıçapını "Küçük yarıçap" alanına yazın. Çap ölçtüyseniz ikiye bölün; sırayı ters girseniz de sonuç değişmez.`,
    `"Yükseklik" alanına iki taban arasındaki dik uzaklığı girin; eğik yan kenar boyunca ölçülen uzunluğu değil.`,
    `Uzunluk birimini seçin ve "Hesapla" düğmesine basın.`,
    `Hacim ve litre karşılığı ilk iki satırda; ana doğru, yanal alan ve iki tabanı da içeren toplam yüzey alanı altında görünür.`,
  ],
  sections: [
    { h: 'Kesik koni nedir?', p: [
      `Bir koni, tabanına paralel bir düzlemle kesilip tepe kısmı atıldığında geriye kalan cisme kesik koni denir. Birbirine paralel, farklı büyüklükte iki dairesel tabanı ve bunları birleştiren eğimli bir yan yüzeyi vardır. Gündelik eşyaların şaşırtıcı bir bölümü bu biçimdedir: kovalar, saksılar, karton ve cam bardaklar, abajurlar, huni gövdeleri, bazı silo ve bunker bölümleri. İç içe geçirilip istiflenebilmeleri için kapların yan yüzleri hafifçe eğimli yapılır ve böylece silindir yerine kesik koni ortaya çıkar.`,
    ] },
    { h: 'Hacim formülü', p: [
      `Büyük yarıçap R, küçük yarıçap r ve dik yükseklik h olmak üzere hacim <strong>V = π · h · (R² + R·r + r²) ÷ 3</strong> ile bulunur. Formül, büyük koninin hacminden kesilip atılan küçük koninin hacmi çıkarılarak elde edilir; benzer üçgenler yardımıyla sadeleştirildiğinde bu derli toplu biçim ortaya çıkar.`,
      `Formülün iki uç durumu onu denetlemenin iyi bir yoludur. Küçük yarıçap sıfır alınırsa ifade π · R² · h ÷ 3 olur; bu tam koninin hacmidir. İki yarıçap eşit alınırsa parantezin içi 3R² olur ve ifade π · R² · h, yani silindirin hacmine dönüşür. Kesik koni bu ikisinin arasında yer alır ve araç her iki uç durumu da doğru hesaplar.`,
    ] },
    { h: 'Çözümlü örnek: kova', p: [
      `Ağız çapı 30 cm, taban çapı 20 cm, yüksekliği 30 cm olan bir kovayı ele alalım. Yarıçaplar R = 15 cm ve r = 10 cm\'dir. Parantezin içi 15² + 15·10 + 10² = 225 + 150 + 100 = 475 eder. Hacim π · 30 · 475 ÷ 3 = 4.750π ≈ <strong>14.922,5651 cm³</strong>, yani yaklaşık <strong>14,92 litre</strong> olur. Kova ağzına kadar doldurulmadığı için kullanılabilir kapasite bunun biraz altındadır.`,
    ] },
    { h: 'Çözümlü örnek: yüzey alanı', p: [
      `Yarıçapları 5 cm ve 2 cm, yüksekliği 4 cm olan kesik konide hacim π · 4 · (25 + 10 + 4) ÷ 3 = 52π ≈ <strong>163,3628 cm³</strong> çıkar. Yan kenar uzunluğu, yani ana doğru, yarıçap farkı ile yüksekliğin oluşturduğu dik üçgenden bulunur: l = √((5 − 2)² + 4²) = 5 cm. Yanal alan <strong>π · (R + r) · l</strong> formülüyle π · 7 · 5 = 35π ≈ 109,9557 cm² olur. İki tabanın alanı 25π + 4π = 29π eklendiğinde toplam yüzey alanı 64π ≈ 201,0619 cm² eder.`,
    ] },
    { h: 'Ortalama yarıçap kestirmesi neden yanıltır?', p: [
      `Kesik koni hacmini bulmak için sık başvurulan kestirme, iki yarıçapın ortalamasını alıp silindir formülü uygulamaktır. Bu yöntem hacmi her zaman biraz <strong>eksik</strong> hesaplar; aradaki fark π · h · (R − r)² ÷ 12 kadardır. Yukarıdaki kovada ortalama yarıçap 12,5 cm alınırsa hacim yaklaşık 14.726 cm³ bulunur; gerçek değerden yaklaşık 196 cm³, yani bir su bardağı kadar eksiktir. Yarıçaplar birbirine yakınsa hata küçük kalır, fark büyüdükçe hızla artar. Doğru sonuç için tam formülü kullanmak gerekir.`,
    ] },
    { h: 'Ölçü alırken dikkat edilecekler', ul: [
      `Kap kapasitesi için <strong>iç ölçüleri</strong> alın; kalın cidarlı saksılarda dış ölçü hacmi belirgin biçimde büyütür.`,
      `Yüksekliği kabın içine dik tutulan bir cetvelle ölçün. Yan yüzeye yaslanan cetvel ana doğruyu verir, o da yükseklikten uzundur.`,
      `Ağız kısmındaki kıvrım ve dudak payını yarıçapa katmayın.`,
      `Tabanı içe bombeli ya da kenarları kavisli kaplarda sonuç yaklaşık olur.`,
      `Yalnızca ana doğru biliniyorsa yüksekliği h = √(l² − (R − r)²) ile hesaplayıp araca girin.`,
    ] },
    { h: 'Kullanım alanları ve sınırlar', p: [
      `Saksıya ne kadar toprak gerektiğini, kovanın ya da bardağın kaç litre aldığını, konik bir tank bölümünün kapasitesini ya da kesik koni biçimli bir beton kaidenin hacmini bu araçla bulabilirsiniz. Yanal alan değeri abajur kumaşı, sac açınımı ve boyanacak yüzey hesaplarında işe yarar; üstü açık kaplarda toplam alandan büyük tabanın alanını (π · R²) çıkarmanız gerekir.`,
      `Araç, tabanları birbirine paralel dairelerden oluşan dik kesik koniyi esas alır. Eğik kesilmiş ya da tabanı oval kaplar için sonuç geçerli değildir. Hesap bilgilendirme amaçlıdır; beton dökümü, tank imalatı gibi maliyet ve güvenlik doğuran işlerde yerinde ölçüm ve uzman hesabı esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Kesik koninin hacmi nasıl hesaplanır?', 'V = π · h · (R² + R·r + r²) ÷ 3 formülü kullanılır. Yarıçapları 5 cm ve 2 cm, yüksekliği 4 cm olan kesik koninin hacmi 52π ≈ 163,3628 cm³ olur.'],
    ['Kovanın kaç litre aldığını nasıl bulurum?', 'Ağız ve taban yarıçaplarını ve iç yüksekliği santimetre olarak girin. Ağız çapı 30 cm, taban çapı 20 cm ve yüksekliği 30 cm olan kova yaklaşık 14,92 litre çıkar; araç litre karşılığını doğrudan gösterir.'],
    ['Çap ölçtüm, yarıçap yerine çapı yazabilir miyim?', 'Hayır, bu araç yarıçap bekler. Ölçtüğünüz çapları ikiye bölüp girin. Çap yazarsanız hacim dört kat büyük çıkar.'],
    ['İki yarıçapın ortalamasıyla silindir gibi hesaplasam olmaz mı?', 'Yaklaşık bir değer verir ama her zaman eksik hesaplar; hata π · h · (R − r)² ÷ 12 kadardır. Yarıçaplar arasındaki fark büyüdükçe sapma artar, bu yüzden tam formül tercih edilmelidir.'],
    ['Kesik koninin yanal alanı nasıl bulunur?', 'Önce ana doğru l = √((R − r)² + h²) ile hesaplanır, sonra yanal alan π · (R + r) · l olur. Toplam yüzey alanı için iki tabanın alanı, π · R² ve π · r², eklenir.'],
    ['Küçük yarıçapı sıfır girersem ne olur?', 'Cisim tam koniye dönüşür ve araç koni hacmini verir. Örneğin R = 3 cm, r = 0 ve h = 4 cm için sonuç 12π ≈ 37,6991 cm³ olur. İki yarıçap eşit girilirse silindir hacmi elde edilir.'],
    ['Yüksekliği bilmiyorum, yalnızca yan kenarı ölçebildim. Ne yapmalıyım?', 'Yan kenar (ana doğru) l ise yükseklik h = √(l² − (R − r)²) olur. Örneğin l = 5 cm, R = 5 cm ve r = 2 cm için yükseklik √(25 − 9) = 4 cm\'dir.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['koni-hacmi-hesapla', 'koni-yuzey-alani-hesapla', 'silindir-hacmi-hesapla', 'piramit-hacmi-hesapla', 'su-deposu-hacmi-hesapla', 'litre-metrekup-cevir'],
};
