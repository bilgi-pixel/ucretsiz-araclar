export default {
  slug: 'nm-lbft-cevir',
  title: 'Newton Metre lb-ft Tork Çevirici',
  h1Tail: 'N·m ↔ lb-ft ↔ kgf·m',
  pageTitle: "Newton Metre lb-ft Tork Çevirici – Nm, lb-ft, kgf·m, lb-in",
  description: "Tork değerini Newton metre, lb-ft, kgf·m ve lb-in arasında çevirin. Motor torku, bijon ve cıvata sıkma değerleri için 1 lb-ft = 1,3558 N·m eşitliğiyle hesaplar.",
  card: "Torku N·m, lb-ft, kgf·m ve lb-in arasında çevirin; motor verileri ve cıvata sıkma değerleri için.",
  category: 'birim',
  keywords: ['nm lb-ft çevirme', 'newton metre lb ft', 'tork çevirme', 'lb-ft kaç nm', 'kgm nm çevirme', 'tork birimi çevirici', 'ft-lb nm hesaplama'],
  lead: "Bir tork değerini <strong>Newton metre (N·m)</strong>, <strong>pound-foot (lb-ft)</strong>, kilogram-kuvvet metre (kgf·m) ve pound-inch (lb-in) arasında çevirin. Yabancı servis kılavuzlarındaki sıkma değerlerini tork anahtarınızın ölçeğine uydurmak ya da araç kataloglarındaki motor torkunu karşılaştırmak için kullanılır.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Tork değeri', type: 'number', placeholder: 'Örn. 120' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['nm', 'Newton metre (N·m)'], ['lbft', 'Pound-foot (lb-ft)'], ['kgfm', 'Kilogram-kuvvet metre (kgf·m)'], ['lbin', 'Pound-inch (lb-in)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Tork değeri');
    const LBFT = 1.3558179483314004;
    const KGFM = 9.80665;
    let nm;
    if (v.birim === 'lbft') nm = x * LBFT;
    else if (v.birim === 'kgfm') nm = x * KGFM;
    else if (v.birim === 'lbin') nm = x * LBFT / 12;
    else nm = x;
    const satirlar = {
      nm: ['Newton metre', h.fmt(nm, 3) + ' N·m'],
      lbft: ['Pound-foot', h.fmt(nm / LBFT, 3) + ' lb-ft'],
      kgfm: ['Kilogram-kuvvet metre', h.fmt(nm / KGFM, 3) + ' kgf·m'],
      lbin: ['Pound-inch', h.fmt(nm / LBFT * 12, 3) + ' lb-in'],
    };
    const sira = v.birim === 'nm' || !satirlar[v.birim] ? ['lbft', 'kgfm', 'lbin', 'nm'] : ['nm', 'lbft', 'kgfm', 'lbin'];
    return {
      rows: sira.map((k) => satirlar[k]),
      note: '1 lb-ft = 1,3558179483 N·m, 1 kgf·m = 9,80665 N·m, 1 lb-ft = 12 lb-in alınır. Sonuçlar üç ondalık basamağa yuvarlanır.',
    };
  },
  cases: [
    { in: { deger: '100', birim: 'nm' }, out: { 'Pound-foot': '73,756 lb-ft', 'Kilogram-kuvvet metre': '10,197 kgf·m', 'Pound-inch': '885,075 lb-in' } },
    { in: { deger: '300', birim: 'lbft' }, out: { 'Newton metre': '406,745 N·m' } },
    { in: { deger: '1', birim: 'lbft' }, out: { 'Newton metre': '1,356 N·m', 'Pound-inch': '12 lb-in' } },
    { in: { deger: '250', birim: 'nm' }, out: { 'Pound-foot': '184,391 lb-ft' } },
    { in: { deger: '2', birim: 'kgfm' }, out: { 'Newton metre': '19,613 N·m' } },
    { in: { deger: '120', birim: 'lbin' }, out: { 'Newton metre': '13,558 N·m', 'Pound-foot': '10 lb-ft' } },
    { in: { deger: '0', birim: 'nm' }, out: { 'Pound-foot': '0 lb-ft' } },
    { in: { deger: 'yüz', birim: 'nm' }, error: true },
    { in: { deger: '-50', birim: 'lbft' }, error: true },
  ],
  howto: [
    "'Tork değeri' alanına elinizdeki sayıyı yazın; ondalık için virgül ya da nokta kullanabilirsiniz.",
    "'Girilen değerin birimi' listesinden bu sayının N·m, lb-ft, kgf·m ya da lb-in olduğunu seçin.",
    "'Çevir' düğmesine basın. Değerin dört birimdeki karşılığı alt alta listelenir; ilk satır en sık aranan karşılıktır.",
    "Tork anahtarınızın kadranında hangi birim varsa o satırı okuyun. Gerekiyorsa 'Sonucu kopyala' ile değerleri not edin.",
  ],
  sections: [
    { h: 'Tork nedir?', p: [
      "Tork, bir kuvvetin bir eksen çevresinde yarattığı döndürme etkisidir. Büyüklüğü, uygulanan kuvvet ile kuvvetin dönme eksenine dik uzaklığının çarpımına eşittir. Bir metre uzunluğundaki anahtarın ucuna dik yönde 1 newton kuvvet uygularsanız cıvataya 1 Newton metre tork vermiş olursunuz. Kol uzadıkça aynı torku daha az kuvvetle elde edersiniz; uzun kollu bijon anahtarının işi kolaylaştırmasının nedeni budur.",
      "Uluslararası birim sisteminde tork <strong>N·m</strong> ile ölçülür. ABD kaynaklı belgelerde <strong>lb-ft</strong> (pound-foot; ft-lb ya da lbf·ft olarak da yazılır), küçük bağlantı elemanlarında <strong>lb-in</strong> kullanılır. Türkiye'de ustalar arasında hâlâ yaygın olan 'kilo' ya da 'kilogram-metre' ifadesi ise <strong>kgf·m</strong> birimine karşılık gelir.",
    ] },
    { h: 'Çeviri katsayıları', ul: [
      "<strong>1 lb-ft</strong> = 1,3558 N·m",
      "<strong>1 N·m</strong> = 0,7376 lb-ft",
      "<strong>1 kgf·m</strong> = 9,80665 N·m",
      "<strong>1 N·m</strong> = 0,10197 kgf·m",
      "<strong>1 lb-ft</strong> = 12 lb-in",
      "<strong>1 N·m</strong> = 8,8507 lb-in",
    ], p: [
      "lb-ft katsayısı, pound-kuvvetin newton karşılığı (4,4482216 N) ile bir foot'un metre karşılığının (0,3048 m) çarpımından gelir. kgf·m katsayısı ise standart yerçekimi ivmesidir. Akılda tutmak için kaba bir kural: N·m değerinin dörtte üçü yaklaşık lb-ft, onda biri yaklaşık kgf·m eder.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Örnek 1: Bijon sıkma değeri 100 N·m olarak verilmiş. 100 ÷ 1,3558 = 73,756 lb-ft. Kilogram-kuvvet metre olarak 100 ÷ 9,80665 = 10,197 kgf·m; yani ustaların deyişiyle yaklaşık '10 kilo'. Pound-inch karşılığı 73,756 × 12 = 885,075 lb-in'dir.",
      "Örnek 2: Bir Amerikan pikabının kataloğunda 300 lb-ft motor torku yazıyor. 300 × 1,3558 = 406,745 N·m.",
      "Örnek 3: Dizel bir otomobilin torku 250 N·m ise 250 ÷ 1,3558 = 184,391 lb-ft eder.",
      "Örnek 4: Küçük bir kapak cıvatası için 120 lb-in değeri verilmiş. 120 ÷ 12 = 10 lb-ft, o da 13,558 N·m demektir. lb-in ile lb-ft'i karıştırmak on iki katlık hataya yol açar.",
    ] },
    { h: 'Nerelerde gerekir?', p: [
      "Yabancı servis kılavuzları, parça kutularındaki montaj talimatları ve video anlatımlar çoğunlukla lb-ft ya da lb-in kullanır; atölyedeki tork anahtarı ise genellikle N·m ya da kgf·m ölçeklidir. Silindir kapağı, bijon, buji, karter tapası, bisiklet gidon ve sele kelepçesi gibi parçalarda doğru sıkma torku hem güvenlik hem de parça ömrü açısından önemlidir.",
      "Otomobil ve motosiklet kataloglarında motorun azami torku da ülkeye göre farklı birimle verilir. İki aracın çekişini kıyaslarken değerleri aynı birime getirmek gerekir. Sanayide redüktör, servo motor ve pnömatik sıkma aletlerinin etiketlerinde de aynı çeşitlilikle karşılaşılır.",
    ] },
    { h: 'Tork ve güç ilişkisi', p: [
      "Tork tek başına motorun ne kadar iş yaptığını söylemez; devirle birlikte gücü belirler. Yaygın kullanılan bağıntı şöyledir: <strong>güç (kW) = tork (N·m) × devir (d/dk) ÷ 9549</strong>. Örneğin 250 N·m torku 3000 devirde üreten bir motorun o andaki gücü 250 × 3000 ÷ 9549 ≈ 78,5 kW'tır. Aynı torku iki kat devirde verebilen motor iki kat güç üretir.",
      "Bu ilişki, yüksek torklu dizel motorların düşük devirde neden güçlü çekiş hissi verdiğini, yüksek devirli benzinli motorların ise daha düşük torkla nasıl yüksek güce ulaştığını açıklar.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "<strong>kgf·m ile N·m'yi karıştırmak:</strong> 10 kgf·m yerine 10 N·m sıkılan bir bijon yaklaşık on kat gevşek kalır; tersi durumda cıvata kopabilir.",
      "<strong>lb-in ile lb-ft'i karıştırmak:</strong> küçük cıvatalarda verilen lb-in değerini lb-ft sanmak on iki kat fazla sıkmaya neden olur.",
      "<strong>kgf·cm birimini gözden kaçırmak:</strong> küçük elektrikli tornavidalarda tork kgf·cm ile verilebilir; 100 kgf·cm, 1 kgf·m'ye eşittir.",
      "<strong>Tork ile enerjiyi karıştırmak:</strong> N·m boyut olarak joule ile aynıdır, ancak tork bir enerji değildir; ft-lb yazımı ABD'de enerji için de kullanıldığından bağlama dikkat edin.",
      "<strong>Uzatma kullanırken ayarı değiştirmemek:</strong> tork anahtarının boyunu değiştiren adaptörler uygulanan torku etkiler.",
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      "Bu araç yalnızca birim çevirir; hangi cıvatanın kaç torkla sıkılacağını söylemez. Sıkma değerleri araca, cıvata kalitesine, dişin yağlı ya da kuru olmasına ve üreticinin talimatına göre değişir. Fren, direksiyon, tekerlek ve motor gibi güvenlikle ilgili bağlantılarda her zaman üreticinin güncel servis bilgisini esas alın ve kalibrasyonu yapılmış bir tork anahtarı kullanın; emin değilseniz yetkili bir servise danışın. Negatif değer kabul edilmez.",
    ] },
  ],
  faq: [
    ['1 lb-ft kaç Newton metredir?', "1 lb-ft yaklaşık 1,3558 N·m'dir. Tersine 1 N·m yaklaşık 0,7376 lb-ft eder."],
    ['100 Nm kaç lb-ft eder?', "100 N·m yaklaşık 73,76 lb-ft'tir. Aynı değer 10,2 kgf·m ve 885 lb-in'e karşılık gelir."],
    ['lb-ft ile ft-lb aynı şey mi?', "Tork söz konusu olduğunda evet; iki yazım da aynı büyüklüğü gösterir. Ancak ft-lb ABD'de enerji birimi olarak da kullanılır, bu yüzden tork için lb-ft yazımı tercih edilir."],
    ['Ustaların söylediği 10 kilo tork kaç Nm eder?', "Burada kastedilen kgf·m birimidir. 10 kgf·m, 98,07 N·m'ye ve yaklaşık 72,3 lb-ft'e eşittir."],
    ['kgf·m ile N·m arasındaki katsayı neden 9,80665?', "Bir kilogram-kuvvet, bir kilogramlık kütleye standart yerçekimi ivmesinin uyguladığı kuvvettir ve tam olarak 9,80665 newton kabul edilir. Tork birimine de aynı katsayı taşınır."],
    ['lb-in değerini lb-ft değerine nasıl çeviririm?', "12'ye bölersiniz, çünkü bir foot 12 inçtir. 120 lb-in, 10 lb-ft eder. Araçta birim olarak pound-inch seçerek diğer karşılıkları da görebilirsiniz."],
    ['Torku beygir gücüne çevirebilir miyim?', "Doğrudan çevrilemez; ikisi farklı büyüklüklerdir. Güç, torkun devirle çarpımına bağlıdır. Belirli bir devirdeki güç için tork × devir ÷ 9549 formülüyle kilovat bulunur."],
    ['Yazdığım değerler bir yere gönderiliyor mu?', "Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar sunucuya iletilmez ve kaydedilmez."],
  ],
  related: ['newton-kgf-cevir', 'beygir-kw-cevir', 'kg-pound-cevir', 'hz-rpm-cevir', 'metre-feet-cevir'],
};
