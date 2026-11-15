export default {
  slug: 'avize-boyutu-hesapla',
  title: 'Avize Boyutu Hesaplama',
  h1Tail: 'odaya göre çap ve yükseklik',
  pageTitle: 'Avize Boyutu Hesaplama – Odaya Göre Avize Çapı ve Yüksekliği',
  description: 'Oda eni, boyu ve tavan yüksekliğine göre uygun avize çapını, avize yüksekliğini ve en fazla sarkma payını hesaplayın; yemek masası üstü avize ölçüsünü de görün.',
  card: 'Oda ölçülerine ve tavan yüksekliğine göre avizenin çapını, boyunu ve ne kadar sarkabileceğini hesaplayın.',
  category: 'gunluk',
  keywords: ['avize boyutu hesaplama', 'odaya göre avize çapı', 'avize kaç cm olmalı', 'salon avizesi ölçüsü', 'yemek masası avize yüksekliği', 'avize sarkma boyu', 'tavan yüksekliğine göre avize'],
  lead: 'Odanın enini, boyunu ve tavan yüksekliğini metre olarak yazın. Araç, iç mimaride yaygın kullanılan oranlarla <strong>avize çapını</strong>, gövde yüksekliğini ve başın çarpmaması için avizenin tavandan en fazla ne kadar sarkabileceğini verir. Masa genişliğini eklerseniz masa üstü avize ölçüsünü de hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'tavan', label: 'Tavan yüksekliği (m)', type: 'number', value: '2,7' },
    { id: 'masa', label: 'Yemek masası genişliği (cm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 90', hint: 'Avize masa üstüne asılacaksa masanın dar kenarını (yuvarlakta çapını) yazın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const tavan = h.pos(v.tavan, 'Tavan yüksekliği');
    if (en > 30 || boy > 30) h.err('Oda ölçüleri metre olarak yazılmalı ve 30 metreyi aşmamalı (450 cm için 4,5 yazın).');
    if (tavan < 1.8 || tavan > 10) h.err('Tavan yüksekliği 1,8 ile 10 metre arasında olmalı; değeri metre olarak yazın (270 cm için 2,7).');
    const yuv = (x) => Math.round(x + 1e-9);
    // Çap (inç) = en (ft) + boy (ft)  →  cm = (en + boy) m × 25/3
    const cap = (en + boy) * 25 / 3;
    // Yükseklik: tavanın her feet'i için 2,5–3 inç  →  metre başına 20,83–25 cm
    const yMin = tavan * 2.5 * 2.54 / 0.3048;
    const yMax = tavan * 25;
    const sarkma = tavan * 100 - 210;
    const rows = [
      ['Önerilen avize çapı', yuv(cap) + ' cm'],
      ['Önerilen avize yüksekliği', `${yuv(yMin)}–${yuv(yMax)} cm`],
      ['En fazla sarkma (altında 210 cm kalacak biçimde)', sarkma > 1e-9 ? h.fmt(sarkma, 0) + ' cm' : 'Sarkıt uygun değil; tavana yakın (plafonyer) model seçin'],
      ['Oda alanı', h.fmt(en * boy, 2) + ' m²'],
    ];
    if (String(v.masa ?? '').trim() !== '') {
      const masa = h.pos(v.masa, 'Masa genişliği');
      if (masa < 40 || masa > 400) h.err('Masa genişliği 40 ile 400 cm arasında olmalı; değeri santimetre olarak yazın.');
      rows.push(['Masa üstü avize çapı', `${yuv(masa / 2)}–${yuv(masa * 2 / 3)} cm`]);
      rows.push(['Avize altının masa yüzeyinden yüksekliği', '75–90 cm']);
    }
    return {
      rows,
      note: 'Çap için "en + boy" kuralı, yükseklik için tavan yüksekliğiyle orantı kullanılmıştır. Bunlar tasarım için başlangıç değerleridir; avizenin görsel ağırlığına ve odanın düzenine göre ayarlanabilir.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', tavan: '2,7' }, out: { 'Önerilen avize çapı': '75 cm', 'Önerilen avize yüksekliği': '56–68 cm', 'En fazla sarkma (altında 210 cm kalacak biçimde)': '60 cm', 'Oda alanı': '20 m²' } },
    { in: { en: '3', boy: '3', tavan: '2,4', masa: '90' }, out: { 'Önerilen avize çapı': '50 cm', 'Önerilen avize yüksekliği': '50–60 cm', 'En fazla sarkma (altında 210 cm kalacak biçimde)': '30 cm', 'Masa üstü avize çapı': '45–60 cm', 'Avize altının masa yüzeyinden yüksekliği': '75–90 cm' } },
    { in: { en: '3', boy: '4', tavan: '2,6' }, out: { 'Önerilen avize çapı': '58 cm', 'Önerilen avize yüksekliği': '54–65 cm', 'En fazla sarkma (altında 210 cm kalacak biçimde)': '50 cm' } },
    { in: { en: '6', boy: '6', tavan: '3' }, out: { 'Önerilen avize çapı': '100 cm', 'Önerilen avize yüksekliği': '63–75 cm', 'En fazla sarkma (altında 210 cm kalacak biçimde)': '90 cm' } },
    { in: { en: '2', boy: '2', tavan: '2,1' }, out: { 'Önerilen avize çapı': '33 cm', 'En fazla sarkma (altında 210 cm kalacak biçimde)': 'Sarkıt uygun değil; tavana yakın (plafonyer) model seçin' } },
    { in: { en: '4', boy: '5', tavan: '2,7', masa: '100' }, out: { 'Masa üstü avize çapı': '50–67 cm' } },
    { in: { en: '4', boy: '5', tavan: '27' }, error: true },
    { in: { en: 'abc', boy: '5', tavan: '2,7' }, error: true },
    { in: { en: '4', boy: '5', tavan: '2,7', masa: '5' }, error: true },
  ],
  howto: [
    'Avizenin asılacağı odanın enini ve boyunu metre olarak yazın. Salon-yemek odası gibi birleşik mekânlarda avizenin ait olduğu bölümün ölçülerini girin.',
    'Zeminden tavana yüksekliği metre olarak yazın; asma tavan varsa asma tavanın alt yüzeyini esas alın.',
    'Avize yemek masasının üstüne asılacaksa masanın genişliğini santimetre olarak ekleyin; değilse alanı boş bırakın.',
    '"Hesapla" düğmesine basın ve önerilen çapı, yükseklik aralığını ve en fazla sarkma payını okuyun.',
    'Beğendiğiniz modelin ürün ölçülerini bu değerlerle karşılaştırın; zincirli ve ayarlanabilir modellerde toplam boyu sarkma payına göre kısalttırın.',
  ],
  sections: [
    { h: 'Avize çapı: en + boy kuralı', p: [
      'İç mimaride en yaygın başparmak kuralı Anglosakson ölçüleriyle söylenir: odanın eni ile boyu feet olarak toplanır, çıkan sayı avizenin inç olarak çapıdır. Metrik karşılığı basittir: <strong>çap (cm) ≈ (en + boy) × 8,33</strong>; burada en ve boy metredir. Katsayı, 1 metrenin 3,28 feet ve 1 inçin 2,54 cm olmasından gelir (3,28 × 2,54 ≈ 8,33).',
      '<strong>Örnek:</strong> 4 × 5 metrelik bir salonda 4 + 5 = 9 ve 9 × 8,33 ≈ 75 cm bulunur. 3 × 4 metrelik bir odada (3 + 4) × 8,33 ≈ 58 cm, 6 × 6 metrelik geniş bir salonda 100 cm çıkar. Sonuç kesin bir sınır değil, orantının merkezidir; hafif ve şeffaf görünümlü (ince telli, cam) avizeler bu değerin biraz üstünde, dolu ve koyu gövdeli avizeler biraz altında seçilebilir.',
    ] },
    { h: 'Avize yüksekliği ve sarkma payı', p: [
      'Avizenin kendi gövde yüksekliği tavan yüksekliğiyle orantılı düşünülür: tavanın her metresi için yaklaşık <strong>21–25 cm</strong> avize boyu. 2,7 metre tavanda bu 56–68 cm arasına denk gelir. Alçak tavanda uzun avize odayı basık, yüksek tavanda kısa avize ise kaybolmuş gösterir.',
      'İkinci ve daha bağlayıcı sınır baş mesafesidir. Altından yürünen yerlerde avizenin en alt noktası ile zemin arasında yaklaşık <strong>210 cm</strong> boşluk bırakılması önerilir. Araç bu yüzden tavan yüksekliğinden 210 cm düşerek zincir, kablo ve gövde dahil toplam sarkmanın üst sınırını verir. 2,7 metre tavanda 60 cm, 2,6 metre tavanda 50 cm, 2,4 metre tavanda yalnızca 30 cm kalır. Orantı kuralının önerdiği yükseklik bu sınırı aşıyorsa sınır önceliklidir; daha basık bir model ya da tavana yakın oturan bir armatür seçmek gerekir.',
      'Türkiye\'deki konutların çoğunda tavan 2,6–2,8 metre arasındadır; bu nedenle uzun zincirli klasik avizeler çoğu zaman kısaltılarak asılır. Altından geçilmeyen yerlerde, örneğin orta sehpanın ya da yemek masasının tam üstünde, bu sınır esnetilebilir.',
    ] },
    { h: 'Yemek masası üstü avize', p: [
      'Masa üstüne asılan avizede ölçüt oda değil masadır. Çap, masanın genişliğinin <strong>yarısı ile üçte ikisi</strong> arasında tutulur; böylece ışık masayı kaplar ama kalkıp oturan kişi başını avizeye çarpmaz. 90 cm genişliğindeki masa için 45–60 cm, 100 cm genişliğindeki masa için 50–67 cm uygundur.',
      'Yükseklikte ise avizenin alt noktası masa yüzeyinden yaklaşık <strong>75–90 cm</strong> yukarıda olmalıdır. Bu aralıkta karşılıklı oturanlar birbirini rahatça görür, ampul göz hizasında parlamaz ve ışık tabaklara düşer. Uzun dikdörtgen masalarda tek büyük avize yerine iki ya da üç küçük sarkıt ya da çizgisel bir armatür daha dengeli aydınlatır; bu durumda armatürlerin toplam uzunluğu masa boyunun yaklaşık yarısı ile üçte ikisi arasında düşünülür.',
    ] },
    { h: 'Hızlı başvuru', ul: [
      '<strong>3 × 3 m oda:</strong> çap yaklaşık 50 cm',
      '<strong>3 × 4 m oda:</strong> çap yaklaşık 58 cm',
      '<strong>4 × 4 m oda:</strong> çap yaklaşık 67 cm',
      '<strong>4 × 5 m salon:</strong> çap yaklaşık 75 cm',
      '<strong>5 × 6 m salon:</strong> çap yaklaşık 92 cm',
      '<strong>6 × 6 m salon:</strong> çap yaklaşık 100 cm',
    ] },
    { h: 'Seçerken dikkat edilecekler', ul: [
      'Boyut görünümü belirler, aydınlatma gücünü değil. Odanın ihtiyaç duyduğu ışık miktarı lümenle hesaplanır; büyük bir avize az ışık, küçük bir avize çok ışık verebilir.',
      'L biçimli salonlarda oturma ve yemek bölümlerini ayrı odalar gibi hesaplayıp iki ayrı armatür kullanmak tek dev avizeden iyi sonuç verir.',
      'Ağır avizelerde tavan buatı ve dübel taşıma kapasitesi önemlidir; asma tavana doğrudan asılmaz, betona ya da taşıyıcı profile bağlanır.',
      'Kapı kanadı, dolap kapağı ve tavan vantilatörü gibi hareketli parçalarla çakışma olup olmadığını kontrol edin.',
      'Elektrik bağlantısı sigorta kapatılarak ve tercihen ehliyetli bir elektrikçi tarafından yapılmalıdır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu hesap estetik orantıya dayanan bir başlangıç önerisidir; bir standart ya da yönetmelik değeri değildir. Çok yüksek tavanlı galeri boşlukları, eğimli tavanlar ve merdiven boşlukları ayrı değerlendirilmelidir. Montaj, taşıyıcılık ve elektrik güvenliği konularında uzman desteği alın.',
    ] },
  ],
  faq: [
    ['Odaya göre avize çapı nasıl hesaplanır?', 'Odanın enini ve boyunu metre olarak toplayıp 8,33 ile çarpın; sonuç santimetre olarak önerilen çaptır. 4 × 5 metrelik salon için (4 + 5) × 8,33 ≈ 75 cm bulunur.'],
    ['Avize yerden kaç santimetre yüksekte olmalı?', 'Altından yürünen alanlarda avizenin en alt noktası zeminden yaklaşık 210 cm yukarıda kalmalıdır. 2,7 metre tavanda bu, avizenin zinciri dahil en fazla 60 cm sarkabileceği anlamına gelir.'],
    ['Yemek masası üstündeki avize masadan ne kadar yüksekte durmalı?', 'Avizenin alt noktası ile masa yüzeyi arasında 75–90 cm bırakılır. Daha alçak asılırsa karşınızdaki kişiyi görmeyi engeller, daha yüksek asılırsa ampuller göz alır ve masayla bağı kopar.'],
    ['Tavanım 2,4 metre, sarkıt avize kullanabilir miyim?', 'Yürüme alanında toplam sarkma 30 cm ile sınırlı kalır; bu da basık modeller ya da tavana yakın oturan armatürler demektir. Masa ya da sehpa üstü gibi altından geçilmeyen noktalarda daha uzun sarkıtlar kullanılabilir.'],
    ['Hesaplanan çaptan büyük avize alırsam ne olur?', 'Oda olduğundan küçük ve tavan alçak algılanır, avize mekâna baskın gelir. İnce telli, cam ya da açık renkli hafif görünümlü modellerde yüzde on beşe kadar büyük seçim göze batmaz; dolu gövdeli ve koyu renkli modellerde önerilen çapın altında kalmak daha güvenlidir.'],
    ['Büyük salonda tek avize yeter mi?', 'Orantı açısından tek büyük avize yeterli olabilir, ancak uzun dikdörtgen salonlarda ışık uçlara ulaşmaz. Böyle mekânları iki bölüme ayırıp her bölümü kendi ölçüleriyle hesaplamak ve iki avize ya da avize ile yardımcı aydınlatma kullanmak daha iyi sonuç verir.'],
    ['Avize boyutu ışık miktarını belirler mi?', 'Hayır. Işık miktarı ampullerin toplam lümen değerine bağlıdır. Bu araç yalnızca fiziksel ölçüleri önerir; odanın kaç lümen ışığa ihtiyaç duyduğunu aydınlatma hesabıyla ayrıca belirleyin.'],
    ['Yazdığım ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; oda ölçüleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['aydinlatma-lumen-hesapla', 'lux-lumen-cevir', 'hali-boyutu-hesapla', 'masa-kisi-sayisi-hesapla', 'oda-hacmi-hesapla'],
};
