export default {
  slug: 'metrekare-santimetrekare-cevir',
  title: 'Metrekare Santimetrekare Çevirici',
  h1Tail: 'm² ↔ cm²',
  pageTitle: 'Metrekare Santimetrekare Çevirici – m²\'yi cm²\'ye Çevirme',
  description: 'Metrekareyi santimetrekareye, santimetrekareyi metrekareye çevirin. 1 m² = 10.000 cm² eşitliği, desimetrekare ve milimetrekare karşılığı, çözümlü örneklerle.',
  card: 'Metrekareyi santimetrekareye, santimetrekareyi metrekareye çevirin; dm² ve mm² karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['metrekare santimetrekare çevirme', '1 metrekare kaç santimetrekare', 'cm2 m2 çevirme', 'santimetrekare metrekare', 'm2 cm2', 'alan birimleri çevirme', 'cm2 kaç m2'],
  lead: 'Bir alanı metrekareden (m²) santimetrekareye (cm²) ya da santimetrekareden metrekareye çevirin. Araç <strong>1 m² = 10.000 cm²</strong> eşitliğini kullanır; sonucu desimetrekare ve milimetrekare olarak da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 2,5', hint: 'Binlik ayraç kullanmayın; 25000 gibi düz yazın, ondalık için virgül kullanın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['m', 'Metrekare (m²) → Santimetrekare (cm²)'], ['c', 'Santimetrekare (cm²) → Metrekare (m²)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'c' ? x / 10000 : x;
    const cm2 = v.yon === 'c' ? x : x * 10000;
    const rows = v.yon === 'c'
      ? [['Metrekare', h.fmt(m2, 8) + ' m²'], ['Santimetrekare', h.fmt(cm2, 4) + ' cm²']]
      : [['Santimetrekare', h.fmt(cm2, 4) + ' cm²'], ['Metrekare', h.fmt(m2, 8) + ' m²']];
    rows.push(['Desimetrekare', h.fmt(cm2 / 100, 6) + ' dm²']);
    rows.push(['Milimetrekare', h.fmt(cm2 * 100, 2) + ' mm²']);
    return { rows, note: '1 m² = 100 dm² = 10.000 cm² = 1.000.000 mm². Alan birimlerinde her basamak 100 kattır.' };
  },
  cases: [
    { in: { deger: '1', yon: 'm' }, out: { 'Santimetrekare': '10.000 cm²', 'Desimetrekare': '100 dm²', 'Milimetrekare': '1.000.000 mm²' } },
    { in: { deger: '2500', yon: 'c' }, out: { 'Metrekare': '0,25 m²', 'Desimetrekare': '25 dm²' } },
    { in: { deger: '2,5', yon: 'm' }, out: { 'Santimetrekare': '25.000 cm²' } },
    { in: { deger: '1', yon: 'c' }, out: { 'Metrekare': '0,0001 m²', 'Milimetrekare': '100 mm²' } },
    { in: { deger: '0,36', yon: 'm' }, out: { 'Santimetrekare': '3.600 cm²' } },
    { in: { deger: '623,7', yon: 'c' }, out: { 'Metrekare': '0,06237 m²', 'Milimetrekare': '62.370 mm²' } },
    { in: { deger: '12', yon: 'm' }, out: { 'Santimetrekare': '120.000 cm²', 'Desimetrekare': '1.200 dm²' } },
    { in: { deger: '-1', yon: 'm' }, error: true },
    { in: { deger: 'm2', yon: 'c' }, error: true },
  ],
  howto: [
    '"Alan" alanına metrekare ya da santimetrekare cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden m² → cm² ya da cm² → m² seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında desimetrekare ve milimetrekare değerleri görünür.',
    'Sonucu ödevinize, teklif formuna ya da sipariş notuna aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Neden 100 değil de 10.000?', p: [
      'Bu çevirideki en yaygın yanlış, "1 metre 100 santimetredir, öyleyse 1 metrekare de 100 santimetrekaredir" diye düşünmektir. Oysa alan iki boyutludur. Kenarı 1 metre olan bir kareyi düşünün: bir kenarına 100 santimetre, öteki kenarına da 100 santimetre sığar. Bu kareyi 1 santimetrelik karelere böldüğünüzde 100 sıra ve her sırada 100 kare, toplam 100 × 100 = <strong>10.000</strong> küçük kare elde edersiniz.',
      'Kural geneldir: uzunluk birimleri arasındaki katsayı ne ise, alan birimleri arasındaki katsayı onun karesidir. Metre ile santimetre arasında 100, metrekare ile santimetrekare arasında 100² = 10.000 kat vardır. Hacimde bu sayı küpe çıkar ve 1.000.000 olur.',
    ] },
    { h: 'Formüller', p: [
      'Metrekareden santimetrekareye: <strong>cm² = m² × 10.000</strong>. Santimetrekareden metrekareye: <strong>m² = cm² ÷ 10.000</strong>.',
      'Uygulamada bu, virgülü dört basamak kaydırmaktır. Metrekareden santimetrekareye giderken virgül dört basamak sağa, dönerken dört basamak sola kayar: 2,5 m² → 25.000 cm²; 2.500 cm² → 0,25 m². Okullarda öğretilen "merdiven" yönteminde alan birimlerinde her basamak için iki sıfır eklenir ya da silinir; m²\'den cm²\'ye iki basamak inildiği için dört sıfır eklenir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 60 cm × 60 cm ölçülerindeki bir seramik karonun alanı 60 × 60 = 3.600 cm²\'dir. Metrekare olarak 3.600 ÷ 10.000 = 0,36 m² eder. Tersinden, 0,36 m² yazıp çevirdiğinizde 3.600 cm² bulursunuz. 12 m²\'lik bir odaya bu karodan 12 ÷ 0,36 ≈ 33,3, yani fire hariç en az 34 adet gerekir.',
      '<strong>Örnek 2:</strong> 50 cm × 50 cm\'lik bir karo 2.500 cm², yani 0,25 m²\'dir; dört tanesi tam bir metrekare kaplar.',
      '<strong>Örnek 3:</strong> A4 kâğıdı 21 cm × 29,7 cm ölçülerindedir; alanı 623,7 cm²\'dir. Bu, 0,06237 m² eder. Kâğıt gramajı metrekare başına gram olarak verildiğinden, 80 gramajlı bir A4 yaprağın ağırlığı 0,06237 × 80 ≈ 4,99 gram olarak bulunur.',
      '<strong>Örnek 4:</strong> 12 m²\'lik bir yüzey 12 × 10.000 = 120.000 cm²\'dir.',
      '<strong>Örnek 5:</strong> 1 cm² yalnızca 0,0001 m²\'dir; aynı zamanda 100 mm² eder.',
    ] },
    { h: 'Metrik alan birimleri arasındaki ilişkiler', ul: [
      '<strong>1 m²</strong> = 100 dm² = 10.000 cm² = 1.000.000 mm²',
      '<strong>1 dm²</strong> = 100 cm² = 0,01 m²',
      '<strong>1 cm²</strong> = 100 mm² = 0,0001 m²',
      '<strong>0,5 m²</strong> = 5.000 cm²',
      '<strong>0,1 m²</strong> = 1.000 cm²',
      '<strong>0,01 m²</strong> = 100 cm² (10 cm × 10 cm\'lik kare)',
      '<strong>10 m²</strong> = 100.000 cm²',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Santimetrekare küçük yüzeylerin birimidir: fayans ve karo ölçüleri, etiket ve ambalaj alanları, kumaş parçaları, baskı işleri, cam ve ayna kesimleri, elektronik kart yüzeyleri santimetre ile ölçülür ve alanı santimetrekare çıkar. Buna karşılık malzeme fiyatları ve sarfiyat değerleri çoğunlukla metrekare başına verilir. Boya kutusundaki "bir litre şu kadar metrekare kaplar" bilgisi, döşemelik kumaşın metrekare fiyatı, branda ve folyo baskının metrekare ücreti buna örnektir. Ölçtüğünüz yüzey santimetre cinsindeyse fiyatı ya da miktarı bulmak için önce metrekareye çevirmeniz gerekir.',
      'Bir örnek: 80 cm × 120 cm\'lik bir afiş 9.600 cm², yani 0,96 m²\'dir. Metrekare fiyatı üzerinden ücretlendirilen bir baskıda bu alan esas alınır. Okul matematiğinde ise birim çevirme soruları ve alan problemleri bu dönüşümü sıkça ister.',
    ] },
    { h: 'Pratik ipucu: önce çevir, sonra çarp', p: [
      'Kenar ölçüleri santimetreyse iki yoldan gidebilirsiniz. Birincisi kenarları çarpıp santimetrekareyi bulmak ve 10.000\'e bölmektir. İkincisi kenarları önce metreye çevirip sonra çarpmaktır: 80 cm = 0,8 m, 120 cm = 1,2 m; 0,8 × 1,2 = 0,96 m². İki yol da aynı sonucu verir. Hata çoğu zaman, bir kenarın metre ötekinin santimetre bırakılmasından ya da çarpımdan sonra 10.000 yerine 100\'e bölünmesinden kaynaklanır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez. Metrekare sekiz ondalık basamağa kadar gösterilir; böylece bir santimetrekarenin küçük kesirleri bile metrekare satırında kaybolmaz. Gerçek bir yüzeyi ölçerken ölçüm aletinin duyarlılığı sonucun doğruluğunu belirler; malzeme siparişlerinde fire payı ayrıca eklenmelidir.',
    ] },
  ],
  faq: [
    ['1 metrekare kaç santimetrekaredir?', '1 m² 10.000 cm²\'dir. Kenarı 100 cm olan karenin alanı 100 × 100 = 10.000 cm² olduğu için.'],
    ['1 santimetrekare kaç metrekaredir?', '1 cm² 0,0001 m²\'dir; yani bir metrekarenin on binde biri.'],
    ['Neden 100 ile değil de 10.000 ile çarpılıyor?', 'Alan iki boyutlu olduğu için uzunluk katsayısının karesi kullanılır. Metre ile santimetre arasındaki 100 katlık oran, alanda 100 × 100 = 10.000 olur.'],
    ['5.000 santimetrekare kaç metrekare eder?', '5.000 ÷ 10.000 = 0,5 m² eder; yani yarım metrekare.'],
    ['Desimetrekare nedir?', 'Kenarı 10 cm (1 dm) olan karenin alanıdır. 1 dm² = 100 cm² ve 1 m² = 100 dm²\'dir. Günlük hayatta az kullanılır, daha çok okul sorularında geçer.'],
    ['Karo alanını metrekareye nasıl çeviririm?', 'Karonun iki kenarını santimetre olarak çarpın, sonucu 10.000\'e bölün. 30 cm × 60 cm\'lik bir karo 1.800 cm², yani 0,18 m²\'dir.'],
    ['Metrekareyi milimetrekareye de çevirebilir miyim?', 'Evet. Sonuç kutusundaki "Milimetrekare" satırı bu değeri verir. 1 m² = 1.000.000 mm²\'dir.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['metrekare-feetkare-cevir', 'alan-cevre-hesapla', 'cm-inc-cevir', 'donum-metrekare-cevir', 'birim-donustur'],
};
