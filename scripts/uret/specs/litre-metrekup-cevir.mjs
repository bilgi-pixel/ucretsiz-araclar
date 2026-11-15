export default {
  slug: 'litre-metrekup-cevir',
  title: 'Litre Metreküp Çevirici',
  h1Tail: 'L ↔ m³',
  pageTitle: 'Litre Metreküp Çevirici – Litreden m³\'e, m³\'ten Litreye',
  description: 'Litreyi metreküpe, metreküpü litreye çevirin. 1 m³ = 1000 litre eşitliğiyle çalışır; su faturası, depo, havuz ve beton hacmi hesaplarında kullanılır.',
  card: 'Litreyi metreküpe, metreküpü litreye çevirin; su faturası, depo ve havuz hacimlerini kolayca karşılaştırın.',
  category: 'birim',
  keywords: ['litre metreküp çevirme', '1 metreküp kaç litre', 'm3 litre hesaplama', 'litre kaç m3', '1 ton su kaç litre', 'metreküp litre dönüştürme', 'm3 to litre'],
  lead: 'Bir hacmi litreden metreküpe ya da metreküpten litreye çevirin. Hesap, metrik sistemin tam eşitliği olan <strong>1 m³ = 1000 L</strong> üzerinden yapılır; sonuç desimetreküp ve santimetreküp olarak da gösterilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2,5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['lm', 'Litre → Metreküp'], ['ml', 'Metreküp → Litre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const litre = v.yon === 'ml' ? x * 1000 : x;
    const m3 = litre / 1000;
    const m3Satir = ['Metreküp', h.fmt(m3, 6) + ' m³'];
    const lSatir = ['Litre', h.fmt(litre, 3) + ' L'];
    return {
      rows: [
        v.yon === 'ml' ? lSatir : m3Satir,
        v.yon === 'ml' ? m3Satir : lSatir,
        ['Desimetreküp', h.fmt(litre, 3) + ' dm³'],
        ['Santimetreküp', h.fmt(litre * 1000, 0) + ' cm³'],
        ['Suyun yaklaşık kütlesi', h.fmt(litre, 1) + ' kg'],
      ],
      note: '1 m³ = 1000 L (tam). Kütle satırı yalnızca su içindir ve 1 litre suyun yaklaşık 1 kg geldiği varsayımına dayanır.',
    };
  },
  cases: [
    { in: { deger: '1000', yon: 'lm' }, out: { 'Metreküp': '1 m³', 'Desimetreküp': '1.000 dm³' } },
    { in: { deger: '2,5', yon: 'ml' }, out: { 'Litre': '2.500 L', 'Suyun yaklaşık kütlesi': '2.500 kg' } },
    { in: { deger: '250', yon: 'lm' }, out: { 'Metreküp': '0,25 m³' } },
    { in: { deger: '15', yon: 'ml' }, out: { 'Litre': '15.000 L' } },
    { in: { deger: '19', yon: 'lm' }, out: { 'Metreküp': '0,019 m³', 'Santimetreküp': '19.000 cm³' } },
    { in: { deger: '1', yon: 'lm' }, out: { 'Metreküp': '0,001 m³', 'Santimetreküp': '1.000 cm³' } },
    { in: { deger: '0,75', yon: 'ml' }, out: { 'Litre': '750 L' } },
    { in: { deger: 'm3', yon: 'lm' }, error: true },
    { in: { deger: '-1', yon: 'ml' }, error: true },
  ],
  howto: [
    '"Değer" alanına hacmi yazın. Faturadaki tüketimi, deponun kapasitesini ya da hesapladığınız hacmi girebilirsiniz.',
    '"Çeviri yönü" listesinden litreden metreküpe ya da metreküpten litreye seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında diğer hacim birimleri ve su için yaklaşık kütle görünür.',
    'Sonuçları "Sonucu kopyala" ile panoya alabilirsiniz.',
  ],
  sections: [
    { h: 'Litre ile metreküp arasındaki ilişki', p: [
      'Metreküp, kenarları birer metre olan bir küpün hacmidir ve Uluslararası Birim Sistemi\'nde hacmin temel türetilmiş birimidir. Litre ise kenarları 10 santimetre olan bir küpün, yani bir desimetreküpün hacmidir. Bir metre 10 desimetre olduğundan, bir metreküpün içine 10 × 10 × 10 = 1000 desimetreküp sığar. Bu yüzden <strong>1 m³ tam olarak 1000 litredir</strong>.',
      'Uzunlukta birimler onar onar büyürken hacimde biner biner büyür; karışıklığın kaynağı çoğunlukla budur. 1 metre 100 santimetredir, ama 1 metreküp 100 değil 1.000.000 santimetreküptür. Hacim çevirirken çarpanın küpünün alındığını unutmamak gerekir.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Litreden metreküpe geçerken 1000\'e bölünür: <strong>m³ = L ÷ 1000</strong>. Metreküpten litreye geçerken 1000 ile çarpılır: <strong>L = m³ × 1000</strong>. Pratikte bu, virgülü üç basamak sola ya da sağa kaydırmak demektir.',
      '<strong>Örnek 1:</strong> 250 litrelik bir şofben deposu kaç metreküptür? 250 ÷ 1000 = 0,25 m³.',
      '<strong>Örnek 2:</strong> 2,5 metreküplük bir su deposu kaç litre alır? 2,5 × 1000 = 2.500 litre. Depo suyla doluyken içindeki suyun kütlesi yaklaşık 2.500 kg, yani 2,5 tondur; deponun konulacağı zeminin bu yükü taşıyabilmesi gerekir.',
      '<strong>Örnek 3:</strong> 19 litrelik bir damacana 0,019 m³ eder. Bir metreküp su, yaklaşık 52 damacanaya karşılık gelir (1000 ÷ 19 = 52,6).',
    ] },
    { h: 'Su faturasında metreküp', p: [
      'Türkiye\'de su sayaçları tüketimi metreküp olarak ölçer ve faturalar bu birim üzerinden düzenlenir. Sayaçtaki siyah rakamlar metreküpü, kırmızı rakamlar ya da küçük kadranlar metreküpün kesirlerini, yani litreleri gösterir. Faturanızda 12 m³ yazıyorsa o dönemde 12.000 litre su kullanmışsınız demektir.',
      'Bu çeviri gündelik tüketimi somutlaştırmak için yararlıdır. Dakikada 10 litre su akıtan bir duş başlığıyla 10 dakikalık duş 100 litre, yani 0,1 m³ tüketir. Su birim fiyatları idareden idareye ve tüketim kademesine göre değiştiği için tutarı hesaplarken kendi faturanızdaki güncel birim fiyatı kullanın.',
    ] },
    { h: 'Diğer kullanım alanları', ul: [
      '<strong>Su depoları ve tanklar:</strong> Depo kapasiteleri küçük boylarda litre, büyük boylarda ton ya da metreküp olarak anılır. Su için 1 ton, 1 m³ ve 1000 litre pratikte aynı miktarı ifade eder.',
      '<strong>Havuzlar:</strong> Havuz hacmi en × boy × ortalama derinlik çarpımıyla metreküp olarak bulunur; kimyasal dozajı ise çoğunlukla litre üzerinden verilir.',
      '<strong>Hazır beton ve hafriyat:</strong> Beton, kum, çakıl ve toprak metreküp ile satılır ve taşınır.',
      '<strong>Doğal gaz:</strong> Sayaç tüketimi metreküp olarak okur; faturalandırma enerji birimine çevrilerek yapılır.',
      '<strong>Nakliye:</strong> Kargo ve konteyner hacimleri metreküp, bavul ve sırt çantası hacimleri litre olarak verilir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 L</strong> = 0,001 m³ = 1 dm³ = 1.000 cm³',
      '<strong>100 L</strong> = 0,1 m³',
      '<strong>500 L</strong> = 0,5 m³',
      '<strong>1.000 L</strong> = 1 m³',
      '<strong>5 m³</strong> = 5.000 L',
      '<strong>15 m³</strong> = 15.000 L',
      '<strong>100 m³</strong> = 100.000 L',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En sık rastlanan yanlış, uzunluktaki çarpanı hacme taşımaktır: "1 metre 100 santimetre olduğuna göre 1 metreküp 100 litredir" düşüncesi sonucu on kat küçültür. İkinci yaygın hata, santimetre cinsinden alınan ölçüleri çarpıp çıkan sayıyı doğrudan litre sanmaktır. Santimetre ölçülerinin çarpımı santimetreküp verir; litreye geçmek için 1000\'e, metreküpe geçmek için bir milyona bölmek gerekir. Örneğin 50 × 40 × 30 cm ölçülerindeki bir akvaryum 60.000 cm³, yani 60 litre ve 0,06 m³ hacmindedir.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hacim çevirisi tam eşitliğe dayandığı için yuvarlama hatası içermez. Sonuçtaki "Suyun yaklaşık kütlesi" satırı ise yalnızca temiz su için geçerli bir yaklaşımdır; suyun yoğunluğu sıcaklıkla çok az değişir. Mazot, süt, yağ ya da beton gibi başka maddelerde kütleyi bulmak için hacmi o maddenin yoğunluğuyla çarpmanız gerekir.',
      'Depo, havuz ya da yapı elemanı gibi yük taşıyan sistemlerde boyutlandırma kararını yalnızca bu çeviriye dayandırmayın; taşıyıcı sistem ve zemin hesabı için ilgili mühendise danışın. Araç negatif değer kabul etmez.',
    ] },
  ],
  faq: [
    ['1 metreküp kaç litredir?', '1 metreküp tam olarak 1000 litredir. Çünkü bir metreküp 1000 desimetreküpten oluşur ve bir desimetreküp bir litreye eşittir.'],
    ['1 litre kaç metreküptür?', '1 litre 0,001 metreküptür. Litre değerini 1000\'e bölerek metreküp karşılığını bulursunuz.'],
    ['1 ton su kaç litredir?', 'Yaklaşık 1000 litredir. Bir litre su yaklaşık bir kilogram geldiğinden 1 ton su, 1000 litre ve 1 metreküp gündelik kullanımda aynı miktarı anlatır.'],
    ['Su faturasındaki 10 m³ kaç litre eder?', '10 metreküp 10.000 litredir. Bunu 19 litrelik damacana cinsinden düşünürseniz yaklaşık 526 damacana eder.'],
    ['Bir deponun kaç litre aldığını nasıl hesaplarım?', 'Dikdörtgen bir deponun iç ölçülerini metre cinsinden çarpın: en × boy × yükseklik. Çıkan metreküp değerini bu araçla litreye çevirin. Örneğin 1 m × 1,5 m × 1 m ölçülerinde bir depo 1,5 m³, yani 1.500 litredir.'],
    ['Metreküp ile metrekare arasındaki fark nedir?', 'Metrekare alan, metreküp hacim birimidir. Metrekare iki boyutun, metreküp üç boyutun çarpımıdır; birbirine doğrudan çevrilemezler, arada bir yükseklik ya da kalınlık bilgisi gerekir.'],
    ['Santimetreküp (cm³) ile litre nasıl ilişkilidir?', '1 litre 1.000 santimetreküptür ve 1 santimetreküp 1 mililitreye eşittir. Dolayısıyla 1 metreküp bir milyon santimetreküp eder.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda gerçekleşir; girdiğiniz sayılar sunucuya gönderilmez.'],
  ],
  related: ['su-deposu-hacmi-hesapla', 'hacim-hesapla', 'desimetrekup-litre-cevir', 'metrekup-feetkup-cevir', 'su-tuketimi-hesapla', 'litre-mililitre-cevir'],
};
