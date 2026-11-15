export default {
  slug: 'kombi-kapasite-hesapla',
  title: 'Kombi Kapasitesi Hesaplama',
  h1Tail: 'kaç kW kombi gerekir?',
  pageTitle: 'Kombi Kapasitesi Hesaplama – Metrekareye Göre Kaç kW Kombi?',
  description: 'Daire alanı, yalıtım durumu, iklim ve tavan yüksekliğine göre yaklaşık ısıtma yükünü kW ve kcal/saat olarak hesaplayın; uygun kombi kapasite sınıfını görün.',
  card: 'Evin metrekaresine, yalıtımına ve iklime göre ısıtma ihtiyacını kW ve kcal/saat olarak tahmin edin, kombi sınıfını görün.',
  category: 'elektrik',
  keywords: ['kombi kapasite hesaplama', 'kaç kw kombi almalıyım', 'metrekareye göre kombi', '24 kw kombi kaç metrekare', 'kombi kcal hesaplama', 'ısı ihtiyacı hesaplama', 'kombi gücü hesaplama'],
  lead: 'Evinizin ısıtma ihtiyacını yaklaşık olarak hesaplayıp hangi kombi kapasitesine bakmanız gerektiğini öğrenin. Araç; alan, yalıtım düzeyi, iklim, tavan yüksekliği ve emniyet payından yola çıkarak sonucu <strong>kW</strong> ve <strong>kcal/saat</strong> olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Isıtılacak alan (m²)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'yalitim', label: 'Yalıtım durumu', type: 'select', options: [
      ['100', 'Orta: kısmi yalıtım, çift cam (100 W/m²)'],
      ['70', 'İyi: mantolama ve ısı camı (70 W/m²)'],
      ['130', 'Zayıf: yalıtımsız, eski doğrama (130 W/m²)'],
    ] },
    { id: 'iklim', label: 'Kış koşulları', type: 'select', options: [
      ['1', 'Orta (× 1,00)'],
      ['0.85', 'Ilıman (× 0,85)'],
      ['1.2', 'Soğuk (× 1,20)'],
    ] },
    { id: 'tavan', label: 'Tavan yüksekliği (m)', type: 'number', value: '2,7' },
    { id: 'pay', label: 'Emniyet payı (%)', type: 'number', value: '15', hint: 'Köşe daire, çatı ya da zemin kat için payı artırabilirsiniz.' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Isıtılacak alan');
    const q = { 70: 70, 100: 100, 130: 130 }[v.yalitim] ?? 100;
    const k = { '0.85': 0.85, 1: 1, '1.2': 1.2 }[v.iklim] ?? 1;
    const tavan = h.opt(v.tavan, 2.7, 'Tavan yüksekliği');
    if (!(tavan > 0)) h.err('"Tavan yüksekliği" sıfırdan büyük olmalı.');
    if (tavan > 10) h.err('"Tavan yüksekliği" metre cinsinden olmalı (örn. 2,7).');
    const pay = h.opt(v.pay, 15, 'Emniyet payı');
    if (pay < 0 || pay > 100) h.err('"Emniyet payı" 0 ile 100 arasında olmalı.');
    const kw = alan * q * (tavan / 2.7) * k * (1 + pay / 100) / 1000;
    const sinif = [24, 28, 35, 42].find((s) => s >= kw - 1e-9);
    return {
      rows: [
        ['Isıtma yükü', h.fmt(kw, 2) + ' kW'],
        ['Isıtma yükü (kcal/saat)', h.fmt(kw * 859.845, 0) + ' kcal/saat'],
        ['Önerilen kombi sınıfı', sinif ? sinif + ' kW' : '42 kW üzeri (kaskad sistem ya da kazan değerlendirin)'],
        ['Metrekare başına yük', h.fmt(kw * 1000 / alan, 1) + ' W/m²'],
      ],
      note: 'Bu bir ön tahmindir; kesin kapasite için bina ısı kaybı hesabı gerekir. Kullanım sıcak suyu ihtiyacı nedeniyle konut kombileri çoğunlukla en az 24 kW sınıfında seçilir.',
    };
  },
  cases: [
    { in: { alan: '100', yalitim: '100', iklim: '1', tavan: '2,7', pay: '0' }, out: { 'Isıtma yükü': '10 kW', 'Isıtma yükü (kcal/saat)': '8.598 kcal/saat', 'Önerilen kombi sınıfı': '24 kW', 'Metrekare başına yük': '100 W/m²' } },
    { in: { alan: '120', yalitim: '70', iklim: '0.85', tavan: '2,7', pay: '15' }, out: { 'Isıtma yükü': '8,21 kW', 'Isıtma yükü (kcal/saat)': '7.060 kcal/saat', 'Önerilen kombi sınıfı': '24 kW' } },
    { in: { alan: '150', yalitim: '130', iklim: '1.2', tavan: '2,7', pay: '15' }, out: { 'Isıtma yükü': '26,91 kW', 'Isıtma yükü (kcal/saat)': '23.138 kcal/saat', 'Önerilen kombi sınıfı': '28 kW' } },
    { in: { alan: '200', yalitim: '100', iklim: '1', tavan: '3', pay: '10' }, out: { 'Isıtma yükü': '24,44 kW', 'Isıtma yükü (kcal/saat)': '21.018 kcal/saat', 'Önerilen kombi sınıfı': '28 kW' } },
    { in: { alan: '80', yalitim: '70', iklim: '1.2', tavan: '2,7', pay: '0' }, out: { 'Isıtma yükü': '6,72 kW', 'Isıtma yükü (kcal/saat)': '5.778 kcal/saat', 'Önerilen kombi sınıfı': '24 kW', 'Metrekare başına yük': '84 W/m²' } },
    { in: { alan: '250', yalitim: '130', iklim: '1.2', tavan: '2,7', pay: '15' }, out: { 'Isıtma yükü': '44,85 kW' }, match: { 'Önerilen kombi sınıfı': '^42 kW üzeri' } },
    { in: { alan: '0', yalitim: '100' }, error: true },
    { in: { alan: '100', yalitim: '100', pay: '-5' }, error: true },
  ],
  howto: [
    'Isıtılacak toplam alanı metrekare olarak yazın. Kullanılmayan ve radyatör bulunmayan bölümleri (kapalı balkon, depo) dâhil etmeyin.',
    'Binanın yalıtım durumuna en yakın seçeneği işaretleyin; her seçeneğin metrekare başına watt değeri yanında gösterilir.',
    'Kış koşullarını seçin: kıyı şeridindeki ılıman yerler, iç bölgeler ya da sert kış geçiren yerler.',
    'Tavan yüksekliğini ve emniyet payını gerekiyorsa değiştirin.',
    '"Hesapla" düğmesine basın; ısıtma yükü kW ve kcal/saat olarak, önerilen kombi sınıfıyla birlikte görünür.',
  ],
  sections: [
    { h: 'Kombi kapasitesi ne anlama gelir?', p: [
      'Kombinin etiketinde yazan kW değeri, cihazın tam güçte çalışırken suya aktarabildiği ısı gücüdür. Türkiye\'de bu değer uzun yıllar <strong>kcal/saat</strong> ile de ifade edilmiştir; 1 kW yaklaşık 860 kcal/saat eder, dolayısıyla 24 kW\'lık bir kombi yaklaşık 20.600 kcal/saat kapasitelidir.',
      'Kombi iki iş yapar: radyatör ya da yerden ısıtma devresini besler ve musluklara anlık sıcak su hazırlar. Çoğu konutta mekân ısıtması için gereken güç, anlık sıcak su için gereken güçten düşüktür. Bu nedenle küçük ve iyi yalıtımlı bir dairede hesap 8–10 kW çıksa bile, duşta yeterli debide sıcak su alabilmek için 24 kW sınıfı cihazlar tercih edilir. Modern kombiler güçlerini kısabildiği (modülasyon) için ısıtmada gerektiği kadar çalışır.',
    ] },
    { h: 'Hesap yöntemi', p: [
      'Araç, metrekare başına özgül ısı yükü yaklaşımını kullanır: <strong>ısıtma yükü (W) = alan × özgül yük × (tavan yüksekliği ÷ 2,7) × iklim çarpanı × (1 + emniyet payı)</strong>. Özgül yük iyi yalıtımlı binalarda 70 W/m², orta düzeyde 100 W/m², yalıtımsız eski binalarda 130 W/m² kabul edilir. İklim çarpanı ılıman yerlerde 0,85, orta koşullarda 1,00, soğuk yerlerde 1,20\'dir.',
      'Bu sayılar yaygın pratik kabullerdir, resmî bir standart değeri değildir. Aynı metrekaredeki iki dairenin gerçek ısı kaybı; kat konumu, dış cephe sayısı, pencere alanı ve hava sızdırmazlığına bağlı olarak birbirinden çok farklı olabilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 100 m², orta yalıtımlı, orta iklimde, 2,7 m tavanlı bir daire için emniyet payı sıfır alınırsa 100 × 100 = 10.000 W, yani 10 kW bulunur. Bu yaklaşık 8.598 kcal/saat eder ve 24 kW sınıfı bir kombi ısıtma için fazlasıyla yeterlidir.',
      '<strong>Örnek 2:</strong> 150 m², yalıtımsız, soğuk iklimdeki bir ev için %15 emniyet payıyla: 150 × 130 = 19.500 W; iklim çarpanıyla 23.400 W; payla birlikte 26.910 W, yani 26,91 kW. Bu değer 24 kW\'ı aştığından araç 28 kW sınıfını önerir.',
      '<strong>Örnek 3:</strong> 200 m², orta yalıtımlı, 3 m tavanlı bir dubleks için %10 payla: 200 × 100 × (3 ÷ 2,7) × 1,10 ≈ 24.444 W, yani 24,44 kW. Yüksek tavan, yükü yaklaşık %11 artırmıştır.',
    ] },
    { h: 'Emniyet payını ne zaman artırmalı?', ul: [
      '<strong>Çatı katı ve zemin kat:</strong> Üstü ya da altı ısıtılmayan hacim olan dairelerde ısı kaybı ara katlara göre belirgin biçimde fazladır.',
      '<strong>Köşe daire ve çok cepheli evler:</strong> Dış duvar alanı arttıkça kayıp artar.',
      '<strong>Geniş cam yüzeyler:</strong> Büyük pencereler ve cam balkonlar duvara göre çok daha fazla ısı kaçırır.',
      '<strong>Müstakil ev:</strong> Dört cephesi, çatısı ve zemini dışarıya açık olduğu için apartman dairesine göre ihtiyaç yüksektir.',
      '<strong>Komşu dairelerin ısıtılmaması:</strong> Yan ve alt dairelerin boş ya da soğuk olması, iç duvarlardan da ısı kaybına yol açar.',
    ] },
    { h: 'Gereğinden büyük kombi almak doğru mu?', p: [
      'İhtiyacın çok üzerinde kapasiteli bir kombi, en düşük gücüne kısıldığında bile evin anlık ihtiyacından fazla ısı üretebilir. Bu durumda cihaz sık sık yanıp söner; bu çalışma biçimi verimi düşürür, parçaların yıpranmasını hızlandırır. Yoğuşmalı kombilerde yüksek verim, cihazın düşük dönüş suyu sıcaklığında uzun süre kesintisiz çalışmasıyla elde edilir. Bu yüzden kapasite seçerken yalnızca en yüksek güce değil, cihazın inebildiği en düşük güce (modülasyon aralığına) de bakmak gerekir.',
      'Kapasitesi yetersiz kombi ise en soğuk günlerde evi istenen sıcaklığa çıkaramaz. Doğru seçim, hesaplanan yükü karşılayan en küçük sınıftır.',
    ] },
    { h: 'Kombi ile birlikte düşünülmesi gerekenler', p: [
      'Kombi kapasitesi tek başına konforu belirlemez. Radyatörlerin toplam gücü odaların ihtiyacını karşılamıyorsa, kombi ne kadar güçlü olursa olsun oda ısınmaz. Aynı şekilde tesisatın dengelenmemiş olması, havası alınmamış radyatörler ve yetersiz yalıtım, kapasite sorunu gibi görünen şikâyetlere yol açar. Isı kaybını azaltan her iyileştirme, hem gereken kapasiteyi hem de yakıt faturasını düşürür.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar bilgilendirme amaçlıdır ve mühendislik hesabı yerine geçmez. Doğal gaz tesisatı projesi, kombi seçimi, baca bağlantısı ve montaj, yetkili mühendis ve sertifikalı firmalar tarafından, gaz dağıtım şirketinin ve yürürlükteki mevzuatın kurallarına göre yapılmalıdır. Satın almadan önce yerinde keşif yaptırın.',
    ] },
  ],
  faq: [
    ['100 metrekare ev için kaç kW kombi gerekir?', 'Orta yalıtımlı bir dairede ısıtma yükü yaklaşık 10 kW, %15 emniyet payıyla 11,5 kW çıkar. Isıtma için bu yeterli olsa da anlık sıcak su ihtiyacı nedeniyle pratikte 24 kW sınıfı kombi seçilir.'],
    ['24 kW kombi kaç metrekareyi ısıtır?', 'Yalıtıma ve iklime göre değişir. Orta yalıtım ve orta iklimde, %15 payla 24.000 ÷ (100 × 1,15) ≈ 209 m²; yalıtımsız ve soğuk iklimde 24.000 ÷ (130 × 1,2 × 1,15) ≈ 134 m² kadar bir alan karşılanır.'],
    ['kW ile kcal/saat arasında nasıl dönüşüm yapılır?', '1 kW yaklaşık 860 kcal/saattir. kW değerini 860 ile çarparak kcal/saat, kcal/saat değerini 860\'a bölerek kW bulursunuz. 28 kW yaklaşık 24.080 kcal/saat eder.'],
    ['Yalıtım durumunu nasıl seçmeliyim?', 'Dış cephesi mantolanmış, ısı yalıtımlı çift ya da üçlü camı olan yeni binalar için "iyi"; çift camlı ama mantolamasız ya da kısmen yalıtılmış binalar için "orta"; tek camlı, eski doğramalı ve yalıtımsız binalar için "zayıf" seçeneği uygundur.'],
    ['Yerden ısıtma için hesap değişir mi?', 'Isı kaybı binanın özelliğidir, ısıtma biçimine göre değişmez; dolayısıyla gereken güç aynıdır. Ancak yerden ısıtma düşük su sıcaklığıyla çalıştığı için yoğuşmalı kombilerle daha verimli sonuç verir.'],
    ['Sıcak su için ayrıca kapasite hesaplamak gerekir mi?', 'Bu araç yalnızca mekân ısıtma yükünü tahmin eder. Aynı anda birden fazla banyoda sıcak su kullanılacaksa kombinin sıcak su debisi (litre/dakika) değerine ayrıca bakılmalı, gerekirse boylerli çözümler değerlendirilmelidir.'],
    ['Araç neden 42 kW üzerini önermiyor?', 'Konut tipi duvar kombileri çoğunlukla 24–42 kW aralığında bulunur. Daha yüksek ihtiyaçlarda birden fazla cihazın birlikte çalıştığı kaskad sistemler ya da kazanlar gündeme gelir; bu seçim mutlaka proje gerektirir.'],
    ['Ev bilgilerim bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız alan ve diğer bilgiler sunucuya gönderilmez.'],
  ],
  related: ['klima-btu-hesapla', 'dogalgaz-tuketim-hesapla', 'isi-kaybi-hesapla', 'oda-hacmi-hesapla', 'kwh-kcal-cevir'],
};
