export default {
  slug: 'kure-yuzey-alani-hesapla',
  title: 'Küre Yüzey Alanı Hesaplama',
  h1Tail: 'A = 4πr²',
  pageTitle: 'Küre Yüzey Alanı Hesaplama – Yarıçap, Çap ya da Çevreden 4πr²',
  description: 'Kürenin yüzey alanını yarıçap, çap ya da çevreden hesaplayın. A = 4·π·r² formülüyle alan, metrekare karşılığı, yarım küre yüzeyi ve hacim birlikte gösterilir.',
  card: 'Yarıçap, çap ya da çevreden kürenin yüzey alanını bulun; yarım küre yüzeyi ve metrekare karşılığıyla birlikte.',
  category: 'matematik',
  keywords: ['küre yüzey alanı hesaplama', 'kürenin alanı formülü', '4 pi r kare', 'top yüzey alanı', 'yarım küre yüzey alanı', 'kubbe alanı hesaplama', 'kürenin alanı nasıl bulunur'],
  lead: `Kürenin yüzey alanını <strong>A = 4 · π · r²</strong> formülüyle hesaplayın. Yarıçap, çap ya da en geniş yerinden ölçülen çevre değerlerinden birini girmeniz yeterlidir; araç yarım küre yüzeylerini, metrekare karşılığını ve hacmi de verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Girilen ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap'], ['c', 'Çevre (en geniş yerinden)']] },
    { id: 'deger', label: 'Ölçü değeri', type: 'number', placeholder: 'Örn. 5' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : v.olcu === 'c' ? 'Çevre' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    const r = v.olcu === 'd' ? x / 2 : v.olcu === 'c' ? x / (2 * Math.PI) : x;
    const daire = Math.PI * r * r;
    const alan = 4 * daire;
    return {
      rows: [
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Metrekare karşılığı', `${h.fmt(alan * m2Kat, 4)} m²`],
        ['Büyük daire alanı', `${h.fmt(daire, 4)} ${b}²`],
        ['Yarım küre eğri yüzeyi', `${h.fmt(2 * daire, 4)} ${b}²`],
        ['Yarım küre toplam yüzeyi (tabanıyla)', `${h.fmt(3 * daire, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
        ['Hacim', `${h.fmt(alan * r / 3, 4)} ${b}³`],
      ],
      note: 'Cisim tam küre kabul edilir. Kürenin yüzey alanı, merkezinden geçen büyük dairenin alanının tam dört katıdır.',
    };
  },
  cases: [
    { in: { olcu: 'r', deger: '5', birim: 'cm' }, out: { 'Yüzey alanı': '314,1593 cm²', 'Büyük daire alanı': '78,5398 cm²', 'Yarım küre eğri yüzeyi': '157,0796 cm²', 'Yarım küre toplam yüzeyi (tabanıyla)': '235,6194 cm²' } },
    { in: { olcu: 'd', deger: '22', birim: 'cm' }, out: { 'Yüzey alanı': '1.520,5308 cm²', 'Metrekare karşılığı': '0,1521 m²', 'Yarıçap': '11 cm' } },
    { in: { olcu: 'r', deger: '1', birim: 'cm' }, out: { 'Yüzey alanı': '12,5664 cm²', 'Büyük daire alanı': '3,1416 cm²', 'Hacim': '4,1888 cm³' } },
    { in: { olcu: 'r', deger: '3', birim: 'cm' }, out: { 'Yüzey alanı': '113,0973 cm²', 'Hacim': '113,0973 cm³' } },
    { in: { olcu: 'r', deger: '2', birim: 'm' }, out: { 'Yüzey alanı': '50,2655 m²', 'Metrekare karşılığı': '50,2655 m²', 'Yarım küre eğri yüzeyi': '25,1327 m²' } },
    { in: { olcu: 'c', deger: '40', birim: 'cm' }, out: { 'Yüzey alanı': '509,2958 cm²', 'Yarıçap': '6,3662 cm' } },
    { in: { olcu: 'r', deger: '10', birim: 'mm' }, out: { 'Yüzey alanı': '1.256,6371 mm²' } },
    { in: { olcu: 'r', deger: '-5', birim: 'cm' }, error: true },
    { in: { olcu: 'c', deger: '', birim: 'cm' }, error: true },
  ],
  howto: [
    `"Girilen ölçü" listesinden yarıçap, çap ya da çevre seçeneklerinden elinizdekini işaretleyin.`,
    `Değeri yazın. Top gibi bir cismi ölçüyorsanız mezurayı en geniş yerinden dolayıp çevreyi girmek pratik olur.`,
    `Uzunluk birimini seçin; alan bu birimin karesi olarak verilir ve ayrıca metrekareye çevrilir.`,
    `"Hesapla" düğmesine basın. Yüzey alanı ilk satırda, büyük daire alanı, yarım küre yüzeyleri ve hacim altında görünür.`,
  ],
  sections: [
    { h: 'Küre yüzey alanı formülü', p: [
      `Kürenin dış yüzünün toplam alanı yalnızca yarıçapına bağlıdır: <strong>A = 4 · π · r²</strong>. Çap cinsinden yazıldığında formül daha da sadeleşir: <strong>A = π · d²</strong>. Mezurayla ölçülen çevre (Ç) biliniyorsa yarıçapı hesaplamaya bile gerek kalmaz: <strong>A = Ç² ÷ π</strong>.`,
      `Formüldeki π · r², kürenin tam ortasından geçen düzlemin oluşturduğu dairenin, yani büyük dairenin alanıdır. Buna göre kürenin yüzeyi, kendi büyük dairesinin tam dört katıdır. Bir portakalın kabuğunu soyup aynı portakalın ortadan kesitiyle çizilmiş dairelerin içine yaydığınızda kabuğun yaklaşık dört daireyi doldurması bu ilişkinin sınıflarda sık yapılan gösterimidir.`,
    ] },
    { h: 'Arşimet\'in silindir bağıntısı', p: [
      `Küreyi tam saran bir silindir düşünün: taban yarıçapı r, yüksekliği 2r. Bu silindirin yan yüzey alanı 2 · π · r · 2r = 4 · π · r² olur; yani kürenin yüzey alanına tam olarak eşittir. Arşimet\'in kanıtladığı bu sonuç, haritacılıkta eş alanlı silindirik izdüşümün de temelidir: küre üzerindeki her kuşak, silindire yatay olarak aktarıldığında alanını korur.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Yarıçapı 5 cm olan kürenin yüzey alanı 4 · π · 25 = 100π ≈ <strong>314,1593 cm²</strong> olur. Büyük daire alanı 25π ≈ 78,5398 cm²\'dir ve gerçekten de bunun dört katı 314,1593 eder.`,
      `<strong>Örnek 2:</strong> Çapı 22 cm olan bir topun yarıçapı 11 cm\'dir. Yüzey alanı π · 22² = 484π ≈ <strong>1.520,5308 cm²</strong>, metrekare olarak yaklaşık 0,1521 m² eder.`,
      `<strong>Örnek 3:</strong> Çevresi 40 cm ölçülen bir kürenin alanı 40² ÷ π = 1600 ÷ π ≈ <strong>509,2958 cm²</strong> çıkar; yarıçapı 40 ÷ (2π) ≈ 6,3662 cm\'dir.`,
    ] },
    { h: 'Yarım küre: kubbe, kâse ve kazan', p: [
      `Yarım kürede iki farklı alan sorulabilir ve hangisinin istendiğine dikkat etmek gerekir. Yalnızca eğri yüzey (örneğin bir kubbenin dış kaplaması ya da bir kâsenin iç yüzü) kürenin yarısıdır: <strong>2 · π · r²</strong>. Düz taban da dahil edilirse (dolu bir yarım küre cismin tüm yüzeyi) bir büyük daire alanı eklenir ve toplam <strong>3 · π · r²</strong> olur. Yarıçapı 2 metre olan yarım küre bir kubbenin kaplanacak eğri yüzeyi 2 · π · 4 ≈ 25,1327 m²\'dir. Araç iki değeri de ayrı satırlarda verir.`,
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      `Küresel tank, kubbe ya da küre biçimli bir objenin boyanacak ya da kaplanacak yüzeyini bulmak`,
      `Top, balon ve küresel ambalajlar için gereken malzeme miktarını tahmin etmek`,
      `Fizikte ısı kaybı, ışınım ve basınç kuvveti gibi yüzey alanına bağlı büyüklükleri hesaplamak`,
      `Coğrafya ve astronomide gezegen yüzey alanlarını karşılaştırmak; örneğin ortalama yarıçapı yaklaşık 6.371 km alınan Dünya\'nın yüzey alanı yaklaşık 510 milyon km² eder`,
      `Geometri sorularında yüzey alanı ile hacim arasındaki geçişi denetlemek`,
    ] },
    { h: 'Alan, hacim ve ölçek', p: [
      `Yüzey alanı yarıçapın karesiyle, hacim küpüyle büyür. Yarıçap iki katına çıktığında alan dört, hacim sekiz katına çıkar. İkisi arasındaki bağıntı V = A · r ÷ 3 biçimindedir; araç hacmi bu ilişkiyle birlikte gösterir. Yarıçap 3 birim olduğunda alan ile hacmin sayısal değeri eşit çıkar (ikisi de 36π ≈ 113,0973), ancak birimleri farklı olduğu için bu yalnızca bir sayı rastlantısıdır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En sık görülen hata, 4πr² ile daire alanı πr²\'yi ya da hacim formülü 4/3·πr³\'ü karıştırmaktır. Bir diğeri çapı yarıçap yerine kullanmaktır; bu durumda alan dört kat büyük çıkar. Çevre ölçerken mezuranın en geniş kesitten geçmesi gerekir, aksi halde alan olduğundan küçük hesaplanır. Gerçek cisimler tam küre olmadığından sonuç yaklaşık kabul edilmeli; boya ve kaplama alımlarında fire payı ayrıca eklenmelidir. Sonuçlar bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Kürenin yüzey alanı nasıl hesaplanır?', 'Yarıçapın karesi 4π ile çarpılır: A = 4 · π · r². Yarıçapı 5 cm olan kürenin yüzey alanı 100π, yani yaklaşık 314,1593 cm² olur.'],
    ['Çapı bilinen kürenin alanı nasıl bulunur?', 'A = π · d² formülü doğrudan kullanılabilir. Çapı 22 cm olan topun yüzey alanı 484π ≈ 1.520,5308 cm² eder.'],
    ['Yarım kürenin yüzey alanı nedir?', 'Yalnızca eğri yüzey isteniyorsa 2 · π · r², düz taban da sayılıyorsa 3 · π · r² olur. Araç her iki değeri ayrı satırlarda gösterir.'],
    ['Kürenin yüzey alanı neden büyük daire alanının dört katıdır?', 'Bu sonuç Arşimet tarafından kanıtlanmıştır: kürenin yüzeyi, onu tam saran silindirin yan yüzeyine eşittir ve bu da 2πr · 2r = 4πr² eder. Büyük daire alanı πr² olduğundan oran tam dörttür.'],
    ['Yüzey alanından yarıçap nasıl bulunur?', 'Alan 4π\'ye bölünür ve karekökü alınır: r = √(A ÷ (4π)). Örneğin yüzey alanı 314,1593 cm² olan kürenin yarıçapı 5 cm\'dir.'],
    ['Sonucu metrekareye nasıl çeviririm?', 'Santimetrekare değeri 10.000\'e, milimetrekare değeri 1.000.000\'a bölünür. Araç bu dönüşümü "Metrekare karşılığı" satırında yapar; boya ve kaplama hesaplarında bu satırı kullanabilirsiniz.'],
    ['Yarıçap iki katına çıkarsa yüzey alanı ne olur?', 'Dört katına çıkar, çünkü alan yarıçapın karesiyle orantılıdır. Hacim ise aynı durumda sekiz katına çıkar.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız ölçüler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kure-hacmi-hesapla', 'silindir-yuzey-alani-hesapla', 'koni-yuzey-alani-hesapla', 'daire-alani-hesapla', 'daire-cevresi-hesapla'],
};
