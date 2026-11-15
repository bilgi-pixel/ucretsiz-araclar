export default {
  slug: 'litre-mililitre-cevir',
  title: 'Litre Mililitre Çevirici',
  h1Tail: 'L ↔ mL',
  pageTitle: 'Litre Mililitre Çevirici – Litre Kaç mL, mL Kaç Litre Hesaplama',
  description: 'Litreyi mililitreye, mililitreyi litreye çevirin. 1 litre = 1000 mL eşitliğiyle çalışır; santilitre, desilitre ve su bardağı karşılığını da gösterir.',
  card: 'Litreyi mililitreye, mililitreyi litreye çevirin; santilitre, desilitre ve su bardağı karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['litre mililitre çevirme', '1 litre kaç ml', 'ml kaç litre', 'litre ml hesaplama', '500 ml kaç litre', 'yarım litre kaç ml', 'ml litre dönüştürme'],
  lead: 'Bir sıvı miktarını litreden mililitreye ya da mililitreden litreye çevirin. Hesap <strong>1 L = 1000 mL</strong> tam eşitliğine dayanır; sonuçta santilitre, desilitre ve 200 mL\'lik su bardağı karşılığı da yer alır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 1,5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['lm', 'Litre → Mililitre'], ['ml', 'Mililitre → Litre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const ml = v.yon === 'ml' ? x : x * 1000;
    const mlSatir = ['Mililitre', h.fmt(ml, 3) + ' mL'];
    const lSatir = ['Litre', h.fmt(ml / 1000, 6) + ' L'];
    return {
      rows: [
        v.yon === 'ml' ? lSatir : mlSatir,
        v.yon === 'ml' ? mlSatir : lSatir,
        ['Santilitre', h.fmt(ml / 10, 4) + ' cL'],
        ['Desilitre', h.fmt(ml / 100, 5) + ' dL'],
        ['Su bardağı (200 mL)', h.fmt(ml / 200, 2) + ' bardak'],
      ],
      note: '1 L = 10 dL = 100 cL = 1000 mL. Su bardağı satırı, mutfakta yaygın kabul edilen 200 mL\'lik ölçüye göre yaklaşık bir karşılıktır.',
    };
  },
  cases: [
    { in: { deger: '1,5', yon: 'lm' }, out: { 'Mililitre': '1.500 mL', 'Santilitre': '150 cL' } },
    { in: { deger: '330', yon: 'ml' }, out: { 'Litre': '0,33 L', 'Santilitre': '33 cL' } },
    { in: { deger: '0,25', yon: 'lm' }, out: { 'Mililitre': '250 mL', 'Su bardağı (200 mL)': '1,25 bardak' } },
    { in: { deger: '750', yon: 'ml' }, out: { 'Litre': '0,75 L', 'Desilitre': '7,5 dL' } },
    { in: { deger: '2', yon: 'lm' }, out: { 'Mililitre': '2.000 mL', 'Su bardağı (200 mL)': '10 bardak' } },
    { in: { deger: '5', yon: 'ml' }, out: { 'Litre': '0,005 L' } },
    { in: { deger: '0,5', yon: 'lm' }, out: { 'Mililitre': '500 mL', 'Desilitre': '5 dL' } },
    { in: { deger: 'yarım', yon: 'lm' }, error: true },
    { in: { deger: '-250', yon: 'ml' }, error: true },
  ],
  howto: [
    '"Değer" alanına sıvı miktarını yazın. Yarım litre için 0,5; bir buçuk litre için 1,5 yazabilirsiniz.',
    '"Çeviri yönü" listesinden litreden mililitreye ya da mililitreden litreye seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık görünür; santilitre, desilitre ve su bardağı karşılıkları altında listelenir.',
    'Tarif ya da alışveriş listesi hazırlıyorsanız "Sonucu kopyala" ile değerleri notlarınıza aktarın.',
  ],
  sections: [
    { h: 'Litre ve mililitre nasıl ilişkilidir?', p: [
      'Litre, metrik sistemde sıvı hacimleri için en çok kullanılan birimdir ve kenarları 10 santimetre olan bir küpün hacmine eşittir. "Mili" ön eki binde bir anlamına gelir; dolayısıyla mililitre litrenin binde biridir. Milimetrenin metreye, miligramın grama oranı neyse mililitrenin litreye oranı da odur.',
      'Bu ilişki tam ve değişmezdir: <strong>1 litre = 1000 mililitre</strong>, <strong>1 mililitre = 0,001 litre</strong>. Arada santilitre (litrenin yüzde biri) ve desilitre (litrenin onda biri) birimleri bulunur. Türkiye\'de ambalajlarda en çok litre ve mililitre görülür; santilitre daha çok içecek şişelerinde, desilitre ise tıbbi tahlil sonuçlarında karşımıza çıkar.',
    ] },
    { h: 'Formül: virgülü üç basamak kaydırmak', p: [
      'Litreden mililitreye geçerken 1000 ile çarpılır: <strong>mL = L × 1000</strong>. Mililitreden litreye geçerken 1000\'e bölünür: <strong>L = mL ÷ 1000</strong>. Onluk sistemde bu, virgülü üç basamak sağa ya da sola kaydırmakla aynıdır.',
      '1,5 litreyi mililitreye çevirirken virgülü üç basamak sağa taşırsınız: 1,5 → 1500. 330 mililitreyi litreye çevirirken virgülü üç basamak sola taşırsınız: 330 → 0,330. Basamak yetmediğinde sıfır eklenir: 5 mL, 0,005 litredir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1,5 litrelik bir su şişesi kaç mililitredir? 1,5 × 1000 = 1.500 mL. Aynı miktar 150 santilitre eder.',
      '<strong>Örnek 2:</strong> 330 mL\'lik bir kutu içecek kaç litredir? 330 ÷ 1000 = 0,33 litre. Etiketlerde bu bazen 33 cL olarak da yazılır.',
      '<strong>Örnek 3:</strong> Bir tarif 0,25 litre süt istiyor. 0,25 × 1000 = 250 mL eder; 200 mL\'lik su bardağıyla 1,25 bardak, yani bir bardak ve dörtte bir bardaktır.',
      '<strong>Örnek 4:</strong> Günde 2 litre su içmeyi hedefleyen biri 2.000 mL, yani 200 mL\'lik bardakla 10 bardak su içmelidir.',
    ] },
    { h: 'Günlük hayatta nerede gerekir?', ul: [
      '<strong>Mutfak:</strong> Tarifler sıvıları kimi zaman litre, kimi zaman mililitre ile verir; ölçü kapları ise çoğunlukla mL çizgilidir.',
      '<strong>Alışveriş:</strong> Farklı boydaki ambalajların birim fiyatını karşılaştırmak için hepsini aynı birime çevirmek gerekir. 750 mL\'lik bir şişe ile 1 litrelik şişeyi karşılaştırırken 750 mL\'nin 0,75 litre olduğunu bilmek yeterlidir.',
      '<strong>Okul:</strong> İlkokul ve ortaokul matematik derslerinde sıvı ölçüleri konusunun temel alıştırmasıdır.',
      '<strong>İlaç ve bakım ürünleri:</strong> Şurup, serum, şampuan ve temizlik ürünlerinin hacimleri mL ile belirtilir; seyreltme oranları litre başına mL olarak verilir.',
      '<strong>Araç bakımı:</strong> Motor yağı, antifriz ve cam suyu litreyle satılır; katkı maddelerinin dozu mL olarak tarif edilir.',
    ] },
    { h: 'Sık kullanılan değerler', ul: [
      '<strong>100 mL</strong> = 0,1 L',
      '<strong>200 mL</strong> = 0,2 L (bir su bardağı)',
      '<strong>250 mL</strong> = 0,25 L (çeyrek litre)',
      '<strong>330 mL</strong> = 0,33 L',
      '<strong>500 mL</strong> = 0,5 L (yarım litre)',
      '<strong>750 mL</strong> = 0,75 L',
      '<strong>1 L</strong> = 1.000 mL',
      '<strong>1,5 L</strong> = 1.500 mL',
      '<strong>5 L</strong> = 5.000 mL',
    ] },
    { h: 'Birim fiyat karşılaştırması için ipucu', p: [
      'Market raflarında aynı ürünün farklı boyları arasında seçim yaparken litre fiyatına bakmak en sağlıklı yöntemdir. Bunun için ambalajın fiyatını litre cinsinden hacmine bölersiniz. Hacim mililitre olarak yazıyorsa önce bu araçla litreye çevirin. Örneğin 750 mL\'lik bir ürün 0,75 litredir; fiyatını 0,75\'e böldüğünüzde bir litrenin size kaça geldiğini bulursunuz. Büyük ambalaj her zaman daha hesaplı olmayabilir; karşılaştırmayı sayılarla yapmak sürprizleri önler.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın yanlış, çarpanı 100 sanmaktır; 100, santilitre için geçerlidir. Bir litre 100 santilitre ama 1000 mililitredir. İkinci yaygın yanlış, mililitreyi gramla eş tutmaktır. Su için 1 mL yaklaşık 1 gram gelir, ancak yağ daha hafif, bal ve pekmez daha ağırdır; bu yüzden tarifte gram olarak verilen bir sıvıyı mililitre kabıyla ölçmek hataya yol açabilir.',
      'Su bardağı satırı yaklaşık bir karşılıktır; evlerdeki bardakların hacmi birbirinden farklıdır. Hassas ölçüm gereken durumlarda dereceli ölçü kabı kullanın. Araç negatif değer kabul etmez.',
    ] },
  ],
  faq: [
    ['1 litre kaç mililitredir?', '1 litre tam olarak 1000 mililitredir. "Mili" ön eki binde bir anlamına geldiği için bu oran değişmez.'],
    ['500 mL kaç litre eder?', '500 mL, 0,5 litre yani yarım litredir. Mililitre değerini 1000\'e bölerek litre karşılığını bulursunuz.'],
    ['Yarım litre kaç mL eder?', 'Yarım litre 500 mL\'dir. Çeyrek litre 250 mL, üç çeyrek litre 750 mL eder.'],
    ['1 mL kaç litredir?', '1 mL, 0,001 litredir. Bu aynı zamanda 1 santimetreküp, yani 1 cc\'ye eşittir.'],
    ['1 litre kaç su bardağı eder?', '200 mL\'lik su bardağı ölçüsüyle 1 litre 5 bardak eder. Bardak hacimleri değişebildiğinden bu yaklaşık bir değerdir.'],
    ['cL ile mL arasındaki fark nedir?', 'Santilitre (cL) litrenin yüzde biri, mililitre (mL) binde biridir. 1 cL, 10 mL eder; 33 cL yazan bir şişe 330 mL\'dir.'],
    ['1 litre su 1 kilogram mıdır?', 'Oda sıcaklığındaki temiz su için yaklaşık olarak evet; 1 litre su yaklaşık 1 kilogram gelir. Diğer sıvılarda ağırlık yoğunluğa göre değişir.'],
    ['Yazdığım sayılar kaydediliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['santilitre-mililitre-cevir', 'cc-ml-cevir', 'litre-metrekup-cevir', 'desimetrekup-litre-cevir', 'tatli-kasigi-ml-cevir', 'ml-sivi-ons-cevir'],
};
