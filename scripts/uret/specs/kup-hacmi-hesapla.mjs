export default {
  slug: 'kup-hacmi-hesapla',
  title: 'Küp Hacmi ve Yüzey Alanı Hesaplama',
  h1Tail: 'V = a³, A = 6a²',
  pageTitle: 'Küp Hacmi ve Yüzey Alanı Hesaplama – Kenardan a³ ve 6a²',
  description: 'Küpün kenar uzunluğunu girerek hacmini, toplam ve yanal yüzey alanını, yüzey ve cisim köşegenini hesaplayın. Litre karşılığı da birlikte gösterilir.',
  card: 'Kenar uzunluğundan küpün hacmini, yüzey alanını, köşegenlerini ve litre karşılığını tek adımda bulun.',
  category: 'matematik',
  keywords: ['küp hacmi hesaplama', 'küp yüzey alanı hesaplama', 'küpün hacmi formülü', 'a küp hesaplama', 'küp köşegeni hesaplama', 'küpün alanı', 'kenarı verilen küpün hacmi'],
  lead: `Küpün tek bir ölçüsü vardır: kenar uzunluğu. Bu değeri girin; araç hacmi <strong>a³</strong>, toplam yüzey alanını <strong>6a²</strong> olarak hesaplar, ayrıca yanal alanı, yüzey köşegenini, cisim köşegenini ve litre karşılığını verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kenar', label: 'Kenar uzunluğu (a)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const a = h.pos(v.kenar, 'Kenar uzunluğu');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = a * a * a;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Toplam yüzey alanı', `${h.fmt(6 * a * a, 4)} ${b}²`],
        ['Yanal alan (4 yüz)', `${h.fmt(4 * a * a, 4)} ${b}²`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Yüzey köşegeni', `${h.fmt(a * Math.SQRT2, 4)} ${b}`],
        ['Cisim köşegeni', `${h.fmt(a * Math.sqrt(3), 4)} ${b}`],
        ['Toplam kenar uzunluğu', `${h.fmt(12 * a, 4)} ${b}`],
      ],
      note: 'Küpün 6 yüzü, 12 kenarı ve 8 köşesi vardır; bütün kenarlar eşit kabul edilir.',
    };
  },
  cases: [
    { in: { kenar: '3', birim: 'cm' }, out: { 'Hacim': '27 cm³', 'Toplam yüzey alanı': '54 cm²', 'Yüzey köşegeni': '4,2426 cm', 'Cisim köşegeni': '5,1962 cm' } },
    { in: { kenar: '10', birim: 'cm' }, out: { 'Hacim': '1.000 cm³', 'Toplam yüzey alanı': '600 cm²', 'Litre karşılığı': '1 L' } },
    { in: { kenar: '1', birim: 'm' }, out: { 'Hacim': '1 m³', 'Toplam yüzey alanı': '6 m²', 'Litre karşılığı': '1.000 L', 'Yüzey köşegeni': '1,4142 m', 'Cisim köşegeni': '1,7321 m' } },
    { in: { kenar: '2,5', birim: 'cm' }, out: { 'Hacim': '15,625 cm³', 'Toplam yüzey alanı': '37,5 cm²', 'Yanal alan (4 yüz)': '25 cm²' } },
    { in: { kenar: '2', birim: 'm' }, out: { 'Hacim': '8 m³', 'Toplam yüzey alanı': '24 m²', 'Litre karşılığı': '8.000 L', 'Toplam kenar uzunluğu': '24 m' } },
    { in: { kenar: '100', birim: 'mm' }, out: { 'Hacim': '1.000.000 mm³', 'Litre karşılığı': '1 L' } },
    { in: { kenar: '0', birim: 'cm' }, error: true },
    { in: { kenar: '-3', birim: 'cm' }, error: true },
    { in: { kenar: '', birim: 'm' }, error: true },
  ],
  howto: [
    `"Kenar uzunluğu" alanına küpün bir kenarını yazın. Küpte bütün kenarlar eşit olduğu için tek ölçü yeterlidir.`,
    `Ölçünün birimini seçin: santimetre, metre ya da milimetre.`,
    `"Hesapla" düğmesine basın. Hacim ilk satırda, yüzey alanları, litre karşılığı ve köşegen uzunlukları altında görünür.`,
    `Sonuçları ödevinize ya da hesap tablonuza aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Küp nedir, hangi formüller kullanılır?', p: [
      `Küp, altı yüzü de eş kareler olan üç boyutlu cisimdir; dikdörtgenler prizmasının eni, boyu ve yüksekliği birbirine eşit olan özel hâlidir. Altı yüzü, on iki kenarı ve sekiz köşesi vardır. Kenar uzunluğu a ile gösterildiğinde temel formüller şunlardır:`,
    ], ul: [
      `<strong>Hacim:</strong> V = a · a · a = a³`,
      `<strong>Toplam yüzey alanı:</strong> A = 6 · a² (altı kare yüz)`,
      `<strong>Yanal alan:</strong> 4 · a² (alt ve üst yüz hariç dört yan yüz)`,
      `<strong>Yüzey köşegeni:</strong> a · √2 (bir kare yüzün köşegeni)`,
      `<strong>Cisim köşegeni:</strong> a · √3 (karşılıklı iki köşeyi küpün içinden birleştiren doğru)`,
      `<strong>Toplam kenar uzunluğu:</strong> 12 · a`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Kenarı 3 cm olan bir küp alalım. Hacim 3³ = <strong>27 cm³</strong> olur. Bir yüzün alanı 3² = 9 cm², altı yüzün toplamı 6 · 9 = <strong>54 cm²</strong> eder. Yüzey köşegeni 3 · √2 ≈ 4,2426 cm, cisim köşegeni 3 · √3 ≈ 5,1962 cm\'dir. Cisim köşegeni, küpün içine sığabilecek en uzun düz çubuğun boyunu verir.`,
      `İkinci örnek litre ile ilgilidir: kenarı 10 cm olan küpün hacmi 10³ = 1000 cm³, yani tam <strong>1 litredir</strong>. Litrenin tanımı zaten budur; bir desimetreküp bir litreye eşittir. Kenarı 1 metre olan küp ise 1 m³, yani 1000 litre hacme sahiptir ve suyla dolu olduğunda yaklaşık bir ton gelir.`,
    ] },
    { h: 'Köşegenler nasıl bulunur?', p: [
      `Yüzey köşegeni, bir kare yüzün iki kenarıyla dik üçgen oluşturur; Pisagor bağıntısından d² = a² + a², dolayısıyla d = a√2 çıkar. Cisim köşegeni için bir adım daha atılır: yüzey köşegeni ile ona dik duran kenar yeni bir dik üçgen oluşturur ve D² = (a√2)² + a² = 3a², yani D = a√3 bulunur. √2 yaklaşık 1,4142, √3 yaklaşık 1,7321 olduğundan kenarı 1 metre olan küpün yüzey köşegeni 1,4142 m, cisim köşegeni 1,7321 m\'dir.`,
    ] },
    { h: 'Kenar büyüdükçe alan ve hacim', p: [
      `Kenar iki katına çıkarıldığında yüzey alanı dört katına, hacim ise sekiz katına çıkar. Kenarı 1 m olan küpün hacmi 1 m³ iken kenarı 2 m olan küpün hacmi 8 m³ olur; yüzey alanı ise 6 m²\'den 24 m²\'ye yükselir. Hacmin alandan daha hızlı büyümesi, büyük depoların birim hacim başına daha az malzeme gerektirmesinin ve küçük küplere bölünen buzun daha çabuk erimesinin nedenidir: toplam hacim aynı kalırken yüzey alanı artar.`,
    ] },
    { h: 'Kullanım örnekleri', ul: [
      `Küp biçimli bir koli, kutu ya da saklama kabının ne kadar aldığını bulmak`,
      `Küp biçimli bir su deposunun ya da havuzun litre kapasitesini hesaplamak`,
      `Bir kutuyu kaplamak için gereken kâğıt, karton ya da boya yüzeyini belirlemek (toplam yüzey alanı)`,
      `Beton küp numunesi ya da taş blok gibi cisimlerin hacminden, yoğunluk yardımıyla ağırlığını tahmin etmek`,
      `Üstü açık küp biçimli bir kabın iç yüzeyini hesaplamak: toplam alandan bir yüz (a²) çıkarılır, yani 5a² kullanılır`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Hacim ile yüzey alanının birimleri farklıdır: hacim küp birimle (cm³, m³), alan kare birimle (cm², m²) yazılır; ikisini aynı satırda toplamak ya da karşılaştırmak anlamsızdır. a³ ifadesini 3 · a ile karıştırmak da sık görülür; kenarı 4 cm olan küpün hacmi 12 değil 64 cm³\'tür. Araç yalnızca bütün kenarları eşit olan gerçek küp için doğru sonuç verir; eni, boyu ve yüksekliği farklı kutular için dikdörtgenler prizması hesabını kullanın. Kap hacmi hesaplarken dış ölçü yerine iç ölçüyü girmeyi unutmayın; cidar kalınlığı kapasiteyi azaltır.`,
    ] },
  ],
  faq: [
    ['Küpün hacmi nasıl hesaplanır?', 'Kenar uzunluğu kendisiyle üç kez çarpılır: V = a³. Kenarı 3 cm olan küpün hacmi 3 · 3 · 3 = 27 cm³ olur.'],
    ['Küpün yüzey alanı nasıl bulunur?', 'Bir yüzün alanı a² olduğundan ve küpte altı eş yüz bulunduğundan toplam yüzey alanı 6 · a² olur. Kenarı 3 cm olan küp için sonuç 54 cm² çıkar.'],
    ['Hacmi bilinen küpün kenarı nasıl bulunur?', 'Hacmin küp kökü alınır: a = ∛V. Örneğin hacmi 64 cm³ olan küpün kenarı 4 cm\'dir, çünkü 4 · 4 · 4 = 64 eder.'],
    ['Yüzey alanı bilinen küpün hacmi nasıl bulunur?', 'Önce alan altıya bölünür ve karekökü alınarak kenar bulunur: a = √(A ÷ 6). Sonra kenarın küpü alınır. Yüzey alanı 150 cm² ise kenar 5 cm, hacim 125 cm³ olur.'],
    ['Kenarı 1 metre olan küp kaç litredir?', 'Hacmi 1 m³, yani 1000 litredir. Kenarı 10 cm olan küp ise tam 1 litre eder.'],
    ['Yüzey köşegeni ile cisim köşegeni arasındaki fark nedir?', 'Yüzey köşegeni bir kare yüzün karşılıklı iki köşesini birleştirir ve a√2 uzunluğundadır. Cisim köşegeni küpün içinden geçerek en uzak iki köşeyi birleştirir ve a√3 uzunluğundadır.'],
    ['Küp ile kare arasındaki fark nedir?', 'Kare iki boyutlu bir şekildir; yalnızca alanı ve çevresi vardır. Küp, altı kareden oluşan üç boyutlu bir cisimdir ve hacmi vardır.'],
    ['Yazdığım değerler sunucuya gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz ölçüler kaydedilmez ve hiçbir yere iletilmez.'],
  ],
  related: ['prizma-hacmi-hesapla', 'piramit-hacmi-hesapla', 'silindir-hacmi-hesapla', 'kure-hacmi-hesapla', 'litre-metrekup-cevir', 'yogunluk-hesapla'],
};
