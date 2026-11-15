export default {
  slug: 'alcipan-hesapla',
  title: 'Alçıpan Hesaplama',
  h1Tail: 'levha ve profil adedi',
  pageTitle: 'Alçıpan Hesaplama – Kaç Levha ve Kaç Metre Profil Gerekir?',
  description: 'Duvar uzunluğu ve yüksekliğinden gereken alçıpan levha adedini, dikme profili sayısını ve taban-tavan profili metrajını hesaplayın. Fire payı ayarlanabilir.',
  card: 'Bölme duvar ya da duvar kaplaması için alçıpan levha adedini, dikme sayısını ve profil metrajını hesaplayın.',
  category: 'insaat',
  keywords: ['alçıpan hesaplama', 'kaç alçıpan levha gerekir', 'alçıpan bölme duvar hesabı', 'alçıpan profil hesaplama', 'alçıpan metrekare hesabı', 'alçı levha adedi', 'alçıpan dikme aralığı'],
  lead: 'Yapılacak alçıpan duvarın uzunluğunu ve yüksekliğini yazın; araç kaplanacak yüzeye göre <strong>levha adedini</strong>, dikme aralığına göre <strong>dikme profili sayısını</strong> ve taban ile tavan için gereken <strong>profil metrajını</strong> hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Duvar uzunluğu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Duvar yüksekliği (m)', type: 'number', placeholder: 'Örn. 2,8' },
    { id: 'yuz', label: 'Kaplanacak yüz', type: 'select', options: [['2', 'İki yüz (bölme duvar)'], ['1', 'Tek yüz (duvar kaplaması)']] },
    { id: 'kat', label: 'Her yüzde levha katı', type: 'select', options: [['1', 'Tek kat'], ['2', 'Çift kat']] },
    { id: 'levhaEn', label: 'Levha eni (cm)', type: 'number', value: '120' },
    { id: 'levhaBoy', label: 'Levha boyu (cm)', type: 'number', value: '250' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'aralik', label: 'Dikme aralığı (cm)', type: 'number', value: '60', hint: 'Dikmelerin eksenden eksene mesafesi.' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const le = h.pos(v.levhaEn, 'Levha eni');
    const lb = h.pos(v.levhaBoy, 'Levha boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const ar = h.pos(v.aralik, 'Dikme aralığı');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const yuz = v.yuz === '1' ? 1 : 2;
    const kat = v.kat === '2' ? 2 : 1;
    const alan = L * H * yuz * kat;
    const fireli = alan * (1 + fire / 100);
    const levhaAlan = le * lb / 10000;
    const levha = Math.ceil(fireli / levhaAlan - 1e-9);
    const dikme = Math.ceil(L / (ar / 100) - 1e-9) + 1;
    return {
      rows: [
        ['Levha adedi', h.fmt(levha, 0) + ' levha'],
        ['Kaplanacak yüzey alanı', h.fmt(alan, 2) + ' m²'],
        ['Fire dahil alan', h.fmt(fireli, 2) + ' m²'],
        ['Bir levhanın alanı', h.fmt(levhaAlan, 2) + ' m²'],
        ['Dikme profili adedi', h.fmt(dikme, 0) + ' adet'],
        ['Dikme profili toplam uzunluğu', h.fmt(dikme * H, 2) + ' m'],
        ['Taban ve tavan profili', h.fmt(2 * L, 2) + ' m'],
      ],
      note: 'Kapı ve pencere boşlukları düşülmemiştir. Boşluk kenarlarına eklenen ek dikmeler ve lento parçaları hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { uzunluk: '5', yukseklik: '2,8', yuz: '2', kat: '1', levhaEn: '120', levhaBoy: '250', fire: '10', aralik: '60' }, out: { 'Levha adedi': '11 levha', 'Kaplanacak yüzey alanı': '28 m²', 'Fire dahil alan': '30,8 m²', 'Bir levhanın alanı': '3 m²', 'Dikme profili adedi': '10 adet', 'Dikme profili toplam uzunluğu': '28 m', 'Taban ve tavan profili': '10 m' } },
    { in: { uzunluk: '4', yukseklik: '2,5', yuz: '1', kat: '1', levhaEn: '120', levhaBoy: '250', fire: '0', aralik: '60' }, out: { 'Levha adedi': '4 levha', 'Kaplanacak yüzey alanı': '10 m²', 'Dikme profili adedi': '8 adet', 'Dikme profili toplam uzunluğu': '20 m', 'Taban ve tavan profili': '8 m' } },
    { in: { uzunluk: '6', yukseklik: '3', yuz: '2', kat: '2', levhaEn: '120', levhaBoy: '300', fire: '10', aralik: '40' }, out: { 'Levha adedi': '22 levha', 'Kaplanacak yüzey alanı': '72 m²', 'Fire dahil alan': '79,2 m²', 'Dikme profili adedi': '16 adet', 'Dikme profili toplam uzunluğu': '48 m', 'Taban ve tavan profili': '12 m' } },
    { in: { uzunluk: '3,6', yukseklik: '2,4', yuz: '1', kat: '1', levhaEn: '120', levhaBoy: '240', fire: '5', aralik: '60' }, out: { 'Levha adedi': '4 levha', 'Kaplanacak yüzey alanı': '8,64 m²', 'Dikme profili adedi': '7 adet', 'Dikme profili toplam uzunluğu': '16,8 m', 'Taban ve tavan profili': '7,2 m' } },
    { in: { uzunluk: '10', yukseklik: '2,7', yuz: '2', kat: '1', levhaEn: '120', levhaBoy: '250', fire: '10', aralik: '60' }, out: { 'Levha adedi': '20 levha', 'Kaplanacak yüzey alanı': '54 m²', 'Fire dahil alan': '59,4 m²', 'Dikme profili adedi': '18 adet', 'Taban ve tavan profili': '20 m' } },
    { in: { uzunluk: '0', yukseklik: '2,8' }, error: true },
    { in: { uzunluk: '5', yukseklik: '2,8', aralik: '0' }, error: true },
    { in: { uzunluk: 'beş', yukseklik: '2,8' }, error: true },
  ],
  howto: [
    'Alçıpan duvarın uzunluğunu ve yüksekliğini metre olarak yazın.',
    'İki tarafı da levhayla kapanan bir bölme duvar mı, yoksa mevcut duvarın önüne tek yüz kaplama mı yapacağınızı seçin.',
    'Her yüze tek kat mı çift kat mı levha uygulanacağını belirtin.',
    'Kullanacağınız levhanın en ve boyunu, fire payını ve dikme aralığını gerekirse değiştirin.',
    '"Hesapla" düğmesine basın; levha adedi ile profil adet ve metrajları listelenir.',
  ],
  sections: [
    { h: 'Alçıpan duvar hangi parçalardan oluşur?', p: [
      'Alçıpan olarak bilinen alçı levha sistemleri, galvanizli sac profillerden kurulan bir iskelet ile bu iskelete vidalanan levhalardan oluşur. Bölme duvarlarda döşemeye ve tavana yatay <strong>U profiller</strong> (duvar U profili) sabitlenir; bunların içine belirli aralıklarla dikey <strong>C profiller</strong>, yani dikmeler oturtulur. Levhalar dikmelere vidalanır, derzler bant ve derz dolgu alçısıyla kapatılır. İskeletin içine çoğu zaman ses ve ısı yalıtımı için mineral yün yerleştirilir.',
      'Bu araç, sistemin en çok para tutan iki kalemini hesaplar: levhalar ve profiller. Vida, dübel, derz bandı, derz dolgusu ve yalıtım gibi sarf malzemeleri kullanılan sisteme ve üreticinin önerisine göre değiştiğinden hesaba katılmamıştır.',
    ] },
    { h: 'Levha adedi nasıl bulunur?', p: [
      'Önce kaplanacak yüzey bulunur: <strong>alan = uzunluk × yükseklik × yüz sayısı × kat sayısı</strong>. Bölme duvarın iki yüzü de kaplandığından alan ikiyle çarpılır; ses yalıtımı ya da yangın dayanımı için çift kat levha uygulanıyorsa bir kez daha ikiyle çarpılır. Fire payı eklendikten sonra toplam, bir levhanın alanına bölünür ve yukarı yuvarlanır.',
      'Alçı levhalar yaygın olarak 120 cm enindedir; boyları ise farklı seçeneklerle üretilir. Kesim kaybını azaltmak için levha boyunu duvar yüksekliğine en yakın ve ondan uzun olan ölçüden seçmek iyi bir alışkanlıktır. Yükseklik levha boyunu aşıyorsa yatay ek gerekir ve fire artar.',
    ] },
    { h: 'Profil hesabı', p: [
      'Dikme sayısı duvar uzunluğunun dikme aralığına bölünmesiyle bulunur; sonuç yukarı yuvarlanır ve duvarın başlangıcındaki ilk dikme için <strong>bir eklenir</strong>. 120 cm enindeki levhanın iki kenarı ve ortası dikmeye denk gelsin diye en yaygın aralık 60 cm\'dir; daha rijit duvar istenen yerlerde ya da seramik kaplanacak yüzeylerde aralık 40 cm\'ye düşürülür. Dikme boyu duvar yüksekliği kabul edilerek toplam metraj verilir.',
      'Taban ve tavan profili, duvar uzunluğunun iki katıdır: bir sıra döşemeye, bir sıra tavana. Profiller genellikle sabit boylarda satıldığından, metrajı satıcının profil boyuna bölerek adet bulabilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: 5 metrelik bölme duvar', p: [
      'Uzunluğu 5 m, yüksekliği 2,8 m olan, iki yüzü tek kat levhayla kaplanacak bir bölme duvar düşünelim. Yüzey alanı 5 × 2,8 × 2 = <strong>28 m²</strong> eder. Yüzde 10 fire payıyla 30,8 m² olur. 120 × 250 cm levhanın alanı 3 m² olduğundan 30,8 ÷ 3 = 10,3, yani <strong>11 levha</strong> gerekir.',
      'Dikme aralığı 60 cm alınırsa 5 ÷ 0,6 = 8,3, yukarı yuvarlanınca 9 aralık ve bir fazlasıyla <strong>10 dikme</strong> bulunur; toplam dikme uzunluğu 10 × 2,8 = 28 m\'dir. Taban ve tavan profili için 2 × 5 = <strong>10 m</strong> U profil yeterlidir. Aynı duvar çift kat levhayla yapılırsa levha adedi 21\'e çıkar, profil miktarı değişmez.',
    ] },
    { h: 'Dikkat edilecek noktalar', ul: [
      'Kapı ve pencere boşlukları levha alanını azaltır, ancak boşluğun iki yanına ve üstüne ek profil gerekir. Küçük boşluklarda alanı düşmemek, fireyi karşılamanın basit bir yoludur.',
      'Banyo ve mutfak gibi ıslak hacimlerde neme dayanıklı, yangın dayanımı istenen yerlerde yangına dayanıklı levha türleri kullanılır; adet hesabı aynıdır, yalnızca ürün değişir.',
      'Duvara ağır dolap, lavabo ya da televizyon asılacaksa iskelete takviye gerekir; bunu profilleri kapatmadan önce planlayın.',
      'Mevcut duvarın önüne yapılan tek yüz kaplamalarda dikmeler duvara askı elemanlarıyla bağlanabilir ya da serbest durabilir; profil hesabı her iki durumda da benzer kalır.',
      'Asma tavan farklı bir profil düzeni kullanır; bu araç duvarlar içindir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonuçlar malzeme keşfi içindir ve düz, boşluksuz bir duvar varsayar. Duvarın izin verilen en büyük yüksekliği, profil kesiti, levha kalınlığı, yangın ve ses yalıtımı sınıfı gibi konular üreticilerin sistem kataloglarına ve ilgili standartlara göre belirlenir. Yüksek duvarlar, kamuya açık yapılar ve özel dayanım gerektiren uygulamalarda bir mimara ya da mühendise danışın.',
    ] },
  ],
  faq: [
    ['1 alçıpan levha kaç metrekaredir?', '120 × 250 cm ölçüsündeki levha 3 m², 120 × 240 cm levha 2,88 m², 120 × 300 cm levha 3,6 m² alan kaplar. Aracın "Bir levhanın alanı" satırı girdiğiniz ölçüye göre bu değeri gösterir.'],
    ['Bölme duvarda neden alan ikiyle çarpılıyor?', 'Bölme duvarın iki tarafı da levhayla kapatılır. 10 m² duvar için iki yüzde toplam 20 m² levha gerekir. Mevcut bir duvarın önüne yapılan kaplamada ise yalnızca tek yüz hesaplanır.'],
    ['Dikme aralığı kaç santimetre olmalı?', 'En sık kullanılan aralık 60 cm\'dir; daha sağlam bir yüzey istendiğinde 40 cm tercih edilir. Kesin değer, kullanılan sistemin üretici kataloğuna ve duvar yüksekliğine göre belirlenmelidir.'],
    ['Fire payı ne kadar alınmalı?', 'Düz ve boşluksuz duvarlarda yüzde 5–10 genellikle yeterlidir. Çok sayıda kapı, pencere, köşe ve niş varsa ya da levha boyu duvar yüksekliğine uymuyorsa payı artırın.'],
    ['Vida ve derz malzemesi neden hesaplanmıyor?', 'Bu kalemlerin tüketimi vida aralığına, kat sayısına ve seçilen ürünlere göre değişir. Yanıltıcı olmamak için araç yalnızca geometriyle kesin hesaplanabilen levha ve profil miktarını verir; sarf için üreticinin metrekare tüketim değerlerine bakın.'],
    ['Çift kat levha profil miktarını değiştirir mi?', 'Hayır. İskelet aynı kalır, yalnızca levha adedi iki katına çıkar. Vida boyu ve sayısı ise ikinci kat için değişir.'],
    ['Profil metrajını adede nasıl çeviririm?', 'Toplam metrajı satın alacağınız profilin boyuna bölüp yukarı yuvarlayın. Dikmelerde her dikmenin tek parça olması tercih edildiğinden, profil boyunun duvar yüksekliğinden kısa olmamasına dikkat edin.'],
    ['Yazdığım ölçüler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; duvar ölçüleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['duvar-alani-hesapla', 'osb-kontrplak-hesapla', 'civi-vida-hesapla', 'boya-fayans-hesapla', 'tugla-hesapla'],
};
