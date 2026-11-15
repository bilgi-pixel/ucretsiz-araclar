export default {
  slug: 'kure-hacmi-hesapla',
  title: 'Küre Hacmi Hesaplama',
  h1Tail: 'V = 4/3 · πr³',
  pageTitle: 'Küre Hacmi Hesaplama – Yarıçap, Çap ya da Çevreden Hacim',
  description: 'Kürenin hacmini yarıçap, çap ya da çevre ölçüsünden hesaplayın. V = 4/3·π·r³ formülüyle hacim, litre karşılığı ve yüzey alanı birlikte gösterilir.',
  card: 'Yarıçap, çap ya da çevre ölçüsünden kürenin hacmini, litre karşılığını ve yüzey alanını hesaplayın.',
  category: 'matematik',
  keywords: ['küre hacmi hesaplama', 'küre hacim formülü', '4/3 pi r küp', 'top hacmi hesaplama', 'kürenin hacmi nasıl bulunur', 'çaptan küre hacmi', 'yarım küre hacmi'],
  lead: `Kürenin hacmini <strong>V = 4/3 · π · r³</strong> formülüyle bulun. Yarıçapı bilmiyorsanız çapı ya da mezurayla ölçtüğünüz çevreyi girin; araç yarıçapı kendisi çıkarır ve hacmin yanında litre karşılığını, yüzey alanını da verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Girilen ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap'], ['c', 'Çevre (en geniş yerinden)']] },
    { id: 'deger', label: 'Ölçü değeri', type: 'number', placeholder: 'Örn. 3' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : v.olcu === 'c' ? 'Çevre' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : v.olcu === 'c' ? x / (2 * Math.PI) : x;
    const hacim = (4 / 3) * Math.PI * r * r * r;
    const alan = 4 * Math.PI * r * r;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
        ['Yarım küre hacmi', `${h.fmt(hacim / 2, 4)} ${b}³`],
      ],
      note: 'Cisim tam küre kabul edilir. Çevre seçeneğinde ölçünün kürenin en geniş yerinden (büyük daire) alındığı varsayılır.',
    };
  },
  cases: [
    { in: { olcu: 'r', deger: '3', birim: 'cm' }, out: { 'Hacim': '113,0973 cm³', 'Litre karşılığı': '0,1131 L', 'Yüzey alanı': '113,0973 cm²' } },
    { in: { olcu: 'd', deger: '10', birim: 'cm' }, out: { 'Hacim': '523,5988 cm³', 'Yarıçap': '5 cm', 'Yüzey alanı': '314,1593 cm²' } },
    { in: { olcu: 'r', deger: '1', birim: 'm' }, out: { 'Hacim': '4,1888 m³', 'Litre karşılığı': '4.188,7902 L', 'Yarım küre hacmi': '2,0944 m³' } },
    { in: { olcu: 'r', deger: '10', birim: 'cm' }, out: { 'Hacim': '4.188,7902 cm³', 'Litre karşılığı': '4,1888 L' } },
    { in: { olcu: 'c', deger: '62,8318530718', birim: 'cm' }, out: { 'Yarıçap': '10 cm', 'Hacim': '4.188,7902 cm³' } },
    { in: { olcu: 'd', deger: '1', birim: 'm' }, out: { 'Hacim': '0,5236 m³', 'Litre karşılığı': '523,5988 L' } },
    { in: { olcu: 'r', deger: '0', birim: 'cm' }, error: true },
    { in: { olcu: 'd', deger: 'on', birim: 'cm' }, error: true },
  ],
  howto: [
    `"Girilen ölçü" listesinden elinizdeki değerin türünü seçin: yarıçap, çap ya da en geniş yerinden ölçülmüş çevre.`,
    `"Ölçü değeri" alanına sayıyı yazın. Bir topu ölçüyorsanız mezurayı tam ortasından dolayıp çevreyi girmek en kolay yoldur.`,
    `Uzunluk birimini seçin; hacim bu birimin kübü, yüzey alanı karesi cinsinden verilir.`,
    `"Hesapla" düğmesine basın. Hacim, litre karşılığı, yüzey alanı, hesapta kullanılan yarıçap ve yarım küre hacmi listelenir.`,
  ],
  sections: [
    { h: 'Küre hacmi formülü', p: [
      `Küre, uzayda bir merkez noktasına eşit uzaklıktaki noktaların oluşturduğu yüzeyle sınırlanan cisimdir; bu uzaklığa yarıçap denir. Hacmi yalnızca yarıçapa bağlıdır: <strong>V = 4/3 · π · r³</strong>. Çap cinsinden yazılırsa <strong>V = π · d³ ÷ 6</strong> olur. Mezurayla ölçülen çevreden yarıçapa geçmek için çevre 2π\'ye bölünür: r = Ç ÷ (2π).`,
      `Formülün en dikkat çekici yanı yarıçapın <strong>küpünün</strong> alınmasıdır. Yarıçap iki katına çıktığında hacim sekiz katına, üç katına çıktığında yirmi yedi katına çıkar. Bu nedenle çapı biraz daha büyük görünen bir top ya da meyve, sanıldığından çok daha hacimlidir.`,
    ] },
    { h: 'Arşimet\'in bulduğu oran', p: [
      `Küre hacmi formülünü ilk kez kanıtlayan kişi Arşimet\'tir. Onun gösterdiği sonuç bugün de akılda tutmanın en kolay yoludur: bir küre, kendisini tam saran silindirin (yarıçapı r, yüksekliği 2r) hacminin <strong>üçte ikisi</strong> kadardır. Silindirin hacmi π · r² · 2r = 2πr³ olduğundan bunun üçte ikisi 4/3 · π · r³ eder. Aynı silindirin içine oturtulan koni ise silindirin üçte birini doldurur; yani koni, küre ve silindirin hacimleri 1 : 2 : 3 oranındadır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Yarıçapı 3 cm olan bir bilyenin hacmi 4/3 · π · 27 = 36π ≈ <strong>113,0973 cm³</strong> eder. İlginç bir rastlantı olarak yarıçap 3 olduğunda yüzey alanı da 4 · π · 9 = 36π çıkar; sayılar aynıdır ama birimler farklıdır (cm³ ve cm²).`,
      `<strong>Örnek 2:</strong> Çapı 10 cm olan bir kürede yarıçap 5 cm\'dir. Hacim 4/3 · π · 125 ≈ <strong>523,5988 cm³</strong>, yani yarım litreden biraz fazladır.`,
      `<strong>Örnek 3:</strong> Yarıçapı 1 metre olan küresel bir tank 4/3 · π ≈ 4,1888 m³, başka bir deyişle yaklaşık 4.188,8 litre hacme sahiptir. Yarım küre biçimli bir kubbe ya da kazan için bu değerin yarısı, 2,0944 m³ alınır.`,
    ] },
    { h: 'Çevreden hacim bulma', p: [
      `Topun ya da karpuzun yarıçapını doğrudan ölçmek zordur; çevresini ölçmek ise kolaydır. Mezurayı cismin en geniş yerinden dolayın, okuduğunuz değeri "Çevre" seçeneğiyle girin. Örneğin çevresi 62,83 cm ölçülen bir kürenin yarıçapı 62,83 ÷ (2π) ≈ 10 cm, hacmi yaklaşık 4.188,8 cm³, yani 4,19 litredir. Ölçüm sırasında mezuranın eğik durması çevreyi olduğundan büyük gösterir; hacim çevrenin küpüyle orantılı olduğu için yüzde birlik ölçüm hatası hacimde yaklaşık yüzde üçlük sapmaya yol açar.`,
    ] },
    { h: 'Kullanım alanları', ul: [
      `Küresel tank, balon, top ve bilye gibi cisimlerin hacmini bulmak`,
      `Yarım küre biçimli kubbe, kâse ya da kazan kapasitesini tahmin etmek`,
      `Hacmi ve yoğunluğu bilinen bir malzemeden yapılmış kürenin kütlesini hesaplamak (kütle = hacim × yoğunluk)`,
      `Fizik ve kimya derslerinde damla, kabarcık, gezegen modeli gibi problemleri çözmek`,
      `Geometri sorularında elle yapılan hesabı doğrulamak`,
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      `Gerçek cisimler nadiren kusursuz küredir. Yumurta, karpuz ya da hafifçe basık bir top için bulunan değer yaklaşık kabul edilmelidir. İçi boş bir kürenin (örneğin bir topun) içine sığan hava miktarı için iç yarıçap, malzeme miktarı için dış ve iç hacim farkı kullanılır. Ayrıca çap ile yarıçapı karıştırmak bu formülde özellikle pahalıdır: çapı yarıçap sanmak hacmi sekiz kat büyütür. Sonuçlar bilgilendirme amaçlıdır; basınçlı tank gibi mühendislik gerektiren tasarımlarda uzman hesabı esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Kürenin hacmi nasıl hesaplanır?', 'Yarıçapın küpü alınır, π ile ve 4/3 ile çarpılır: V = 4/3 · π · r³. Örneğin yarıçap 3 cm ise hacim 36π, yani yaklaşık 113,0973 cm³ olur.'],
    ['Çapı bilinen kürenin hacmi nasıl bulunur?', 'Çapı ikiye bölüp yarıçapı elde edebilir ya da V = π · d³ ÷ 6 formülünü kullanabilirsiniz. Araçta "Çap" seçeneğini işaretlemeniz yeterlidir; 10 cm çaplı küre için sonuç 523,5988 cm³ çıkar.'],
    ['Yarım kürenin hacmi nedir?', 'Tam küre hacminin yarısıdır: V = 2/3 · π · r³. Araç bu değeri "Yarım küre hacmi" satırında ayrıca gösterir.'],
    ['Küre hacmi ile yüzey alanı arasında nasıl bir ilişki var?', 'Yüzey alanı 4 · π · r², hacim 4/3 · π · r³ olduğundan hacim, yüzey alanının yarıçapın üçte biriyle çarpımına eşittir: V = A · r ÷ 3. Yarıçap büyüdükçe hacim alandan daha hızlı artar.'],
    ['Bir kürenin kaç litre olduğunu nasıl öğrenirim?', 'Hacmi santimetreküp olarak bulup 1000\'e bölün ya da metreküp olarak bulup 1000 ile çarpın. Araç bu çevirmeyi "Litre karşılığı" satırında yapar; 10 cm yarıçaplı küre yaklaşık 4,19 litredir.'],
    ['Yarıçap iki katına çıkınca hacim kaç kat artar?', 'Sekiz kat artar, çünkü hacim yarıçapın küpüyle orantılıdır (2³ = 8). Yüzey alanı ise aynı durumda dört kat artar.'],
    ['Küre aynı hacimdeki diğer cisimlerden neden farklıdır?', 'Belirli bir hacmi en az yüzey alanıyla çevreleyen biçim küredir. Sabun köpüğünün ve su damlasının küreye yaklaşmasının nedeni budur; yüzey gerilimi yüzeyi olabildiğince küçültür.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz ölçüler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['kure-yuzey-alani-hesapla', 'silindir-hacmi-hesapla', 'koni-hacmi-hesapla', 'daire-alani-hesapla', 'yogunluk-hesapla', 'litre-metrekup-cevir'],
};
