export default {
  slug: 'degisim-katsayisi-hesapla',
  title: 'Değişim Katsayısı Hesaplama',
  h1Tail: 'bağıl standart sapma (%)',
  pageTitle: 'Değişim Katsayısı Hesaplama – Varyasyon Katsayısı (CV) Yüzdesi',
  description: 'Veri setinizin değişim (varyasyon) katsayısını yüzde olarak hesaplayın. Standart sapmayı ortalamaya oranlar; ortalama, varyans ve standart sapmayı da gösterir.',
  card: 'Sayılarınızı yapıştırın; standart sapmanın ortalamaya oranını (değişim katsayısı) yüzde olarak ve temel istatistiklerle birlikte görün.',
  category: 'matematik',
  keywords: ['değişim katsayısı hesaplama', 'varyasyon katsayısı hesaplama', 'değişkenlik katsayısı', 'bağıl standart sapma', 'CV hesaplama', 'değişim katsayısı formülü', 'standart sapma ortalama oranı'],
  lead: 'Bir veri setindeki yayılımın ortalamaya göre ne kadar büyük olduğunu gösteren <strong>değişim katsayısını</strong> hesaplayın. Araç standart sapmayı ortalamaya böler ve sonucu yüzde olarak verir; böylece birimleri ya da büyüklükleri farklı veri setlerinin değişkenliğini karşılaştırabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Veriler', type: 'textarea', placeholder: 'Örn. 12 15 11 14 13', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın; ondalık için virgül kullanabilirsiniz.', wide: true },
    { id: 'tur', label: 'Veri türü', type: 'select', options: [['orneklem', 'Örneklem (n − 1\'e bölünür)'], ['anakutle', 'Anakütle – verinin tamamı (n\'ye bölünür)']] },
  ],
  compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler');
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem standart sapması için en az 2 veri girin.');
    let top = 0;
    for (const a of x) top += a;
    const ort = top / n;
    let kareTop = 0;
    for (const a of x) kareTop += (a - ort) * (a - ort);
    const varyans = kareTop / (orneklem ? n - 1 : n);
    const ss = Math.sqrt(varyans);
    if (Math.abs(ort) < 1e-12) h.err('Verilerin ortalaması sıfır olduğu için değişim katsayısı tanımsızdır (sıfıra bölme).');
    const cv = ss / Math.abs(ort) * 100;
    let note = 'Değişim katsayısı = standart sapma ÷ ortalama × 100. Yalnızca gerçek sıfır noktası olan (oran ölçeğindeki) pozitif büyüklüklerde anlamlıdır.';
    if (x.some((a) => a < 0)) note = 'Veride negatif değerler var; hesapta ortalamanın mutlak değeri kullanıldı, ancak böyle verilerde değişim katsayısının yorumu güvenilir değildir. ' + note;
    return {
      rows: [
        ['Değişim katsayısı', '%' + h.fmt(cv, 2)],
        ['Ortalama', h.fmt(ort, 4)],
        [orneklem ? 'Standart sapma (örneklem)' : 'Standart sapma (anakütle)', h.fmt(ss, 4)],
        ['Varyans', h.fmt(varyans, 4)],
        ['Oran olarak (ondalık)', h.fmt(cv / 100, 4)],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note,
    };
  },
  cases: [
    { in: { sayilar: '2 4 4 4 5 5 7 9', tur: 'anakutle' }, out: { 'Değişim katsayısı': '%40', 'Ortalama': '5', 'Standart sapma (anakütle)': '2', 'Varyans': '4', 'Oran olarak (ondalık)': '0,4', 'Veri sayısı': '8' } },
    { in: { sayilar: '2 4 4 4 5 5 7 9', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%42,76', 'Standart sapma (örneklem)': '2,1381', 'Varyans': '4,5714' } },
    { in: { sayilar: '10 20 30', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%50', 'Ortalama': '20', 'Standart sapma (örneklem)': '10', 'Varyans': '100' } },
    { in: { sayilar: '10 20 30', tur: 'anakutle' }, out: { 'Değişim katsayısı': '%40,82', 'Standart sapma (anakütle)': '8,165' } },
    { in: { sayilar: '12; 15; 11; 14; 13', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%12,16', 'Ortalama': '13', 'Standart sapma (örneklem)': '1,5811', 'Varyans': '2,5' } },
    { in: { sayilar: '48 50 52', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%4', 'Standart sapma (örneklem)': '2' } },
    { in: { sayilar: '8 10 12', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%20', 'Standart sapma (örneklem)': '2' } },
    { in: { sayilar: '1,5\n2,5\n3,5', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%40', 'Ortalama': '2,5' } },
    { in: { sayilar: '3200 3500 4100 2900 3800', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%13,55', 'Ortalama': '3.500', 'Standart sapma (örneklem)': '474,3416' } },
    { in: { sayilar: '5 5 5 5', tur: 'orneklem' }, out: { 'Değişim katsayısı': '%0' } },
    { in: { sayilar: '-2 2', tur: 'orneklem' }, error: true },
    { in: { sayilar: '7', tur: 'orneklem' }, error: true },
    { in: { sayilar: '', tur: 'orneklem' }, error: true },
    { in: { sayilar: '3 4 beş', tur: 'anakutle' }, error: true },
  ],
  howto: [
    '"Veriler" kutusuna ölçümlerinizi yazın ya da bir tablodan kopyalayıp yapıştırın.',
    'Verileriniz daha büyük bir topluluktan seçilmiş bir örneklemse "Örneklem", ilgilendiğiniz topluluğun tamamıysa "Anakütle" seçeneğini işaretleyin.',
    '"Hesapla" düğmesine basın. İlk satırda değişim katsayısını yüzde olarak görürsünüz.',
    'Karşılaştırma yapacaksanız ikinci veri setini de aynı biçimde girin ve iki yüzdeyi yan yana değerlendirin: yüzdesi küçük olan, ortalamasına göre daha tutarlıdır.',
  ],
  sections: [
    { h: 'Değişim katsayısı nedir?', p: [
      'Değişim katsayısı, bir veri setinin standart sapmasının ortalamasına oranıdır ve çoğunlukla yüzde olarak ifade edilir. Varyasyon katsayısı, değişkenlik katsayısı ya da bağıl standart sapma adlarıyla da anılır; uluslararası kaynaklarda CV kısaltmasıyla geçer.',
      'Standart sapma, verilerin ortalamadan tipik olarak ne kadar uzaklaştığını ölçülen birimle söyler; ancak bu sayının büyük mü küçük mü olduğu ortalamaya bağlıdır. 5 gramlık bir sapma 50 gramlık bir üründe ciddi, 5 kilogramlık bir üründe ise önemsizdir. Değişim katsayısı sapmayı ortalamaya oranlayarak bu ölçek sorununu ortadan kaldırır ve birimsiz bir sayı üretir.',
    ] },
    { h: 'Formül', p: [
      '<strong>Değişim katsayısı (%) = (standart sapma ÷ ortalama) × 100</strong>',
      'Standart sapma, her verinin ortalamadan farkının karesi toplanıp veri sayısına (anakütle) ya da veri sayısının bir eksiğine (örneklem) bölündükten sonra karekök alınarak bulunur. Elinizdeki sayılar daha büyük bir topluluğu temsil eden bir örneklemse n − 1\'e bölmek gerekir; bu, örneklemin yayılımı olduğundan küçük gösterme eğilimini düzeltir. Topluluğun tamamı elinizdeyse n\'ye bölünür.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Veriler 2, 4, 4, 4, 5, 5, 7, 9 olsun. Toplam 40, veri sayısı 8 olduğundan ortalama 5\'tir. Ortalamadan farkların kareleri 9, 1, 1, 1, 0, 0, 4, 16\'dır; toplamları 32 eder.',
      'Veri anakütlenin tamamıysa varyans 32 ÷ 8 = 4, standart sapma 2\'dir. Değişim katsayısı 2 ÷ 5 × 100 = <strong>%40</strong> bulunur.',
      'Aynı veri bir örneklemse varyans 32 ÷ 7 ≈ 4,5714, standart sapma ≈ 2,1381 olur ve değişim katsayısı 2,1381 ÷ 5 × 100 ≈ <strong>%42,76</strong> çıkar. İki sonuç arasındaki fark veri sayısı arttıkça küçülür.',
    ] },
    { h: 'Karşılaştırmada neden kullanılır?', p: [
      'İki dolum makinesi düşünelim. Birincisi ortalama 50 gramlık paketleri 2 gram standart sapmayla, ikincisi ortalama 10 gramlık paketleri yine 2 gram standart sapmayla dolduruyor. Standart sapmalar eşit olduğu hâlde ilk makinenin değişim katsayısı %4, ikincisinin %20\'dir. İkinci makine, hedefine göre beş kat daha tutarsız çalışmaktadır. Bu örnekteki verileri (48, 50, 52 ve 8, 10, 12) araca girerek aynı sonuçları görebilirsiniz.',
      'Değişim katsayısı birimsiz olduğu için farklı birimlerle ölçülmüş büyüklükleri de karşılaştırmaya olanak tanır: bir sınıftaki boy uzunluklarının mı yoksa ağırlıkların mı daha değişken olduğu, santimetre ile kilogram doğrudan kıyaslanamadığı hâlde, yüzdeler üzerinden söylenebilir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Laboratuvar ve kalite kontrol:</strong> Aynı numunenin tekrarlı ölçümlerindeki tutarlılık (tekrarlanabilirlik) değişim katsayısıyla bildirilir.',
      '<strong>Üretim:</strong> Farklı ağırlık ya da boyuttaki ürünleri işleyen hatların kararlılığı aynı ölçekte kıyaslanır.',
      '<strong>Tarım ve biyoloji:</strong> Deneme sonuçlarının güvenilirliği ve bir özelliğin bireyler arasındaki değişkenliği bu ölçüyle özetlenir.',
      '<strong>Eğitim:</strong> Ortalamaları farklı iki sınavda ya da iki sınıfta puanların ne kadar dağınık olduğu karşılaştırılır.',
      '<strong>Satış ve stok planlaması:</strong> Talebi düzenli ürünlerle dalgalı ürünleri ayırt etmek için aylık satışların değişim katsayısına bakılır.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', p: [
      'Değişim katsayısı yalnızca <em>oran ölçeğinde</em>, yani sıfırın gerçekten "hiç yok" anlamına geldiği ve negatif değer almayan büyüklüklerde anlamlıdır: ağırlık, uzunluk, süre, tutar, adet gibi. Santigrat derece cinsinden sıcaklık bunun tipik karşı örneğidir; aynı sıcaklıklar Kelvin ya da Fahrenhayt olarak yazıldığında değişim katsayısı tümüyle farklı çıkar, çünkü sıfır noktası keyfidir.',
      'Ortalama sıfıra yaklaştıkça katsayı aşırı büyür ve küçük değişikliklere karşı çok duyarlı hâle gelir; ortalama tam sıfırsa tanımsızdır ve araç bu durumda hata verir. Kâr-zarar ya da sıcaklık farkı gibi hem pozitif hem negatif değer alabilen verilerde katsayıyı kullanmayın.',
      'Hangi yüzdenin "düşük" ya da "yüksek" sayılacağı alana göre değişir; bir laboratuvar yönteminde kabul edilemez bulunan bir değer, saha verisinde olağan olabilir. Evrensel bir eşik yoktur; kendi alanınızın standartlarına ya da geçmiş verilerinize göre değerlendirin. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['Değişim katsayısı nasıl hesaplanır?', 'Standart sapma ortalamaya bölünür ve 100 ile çarpılır. Ortalaması 20, standart sapması 10 olan bir veri setinin değişim katsayısı %50\'dir.'],
    ['Değişim katsayısı ile standart sapma arasındaki fark nedir?', 'Standart sapma yayılımı verinin kendi birimiyle (gram, TL, puan) verir. Değişim katsayısı bu yayılımı ortalamaya oranlar, birimsizdir ve farklı ölçekteki veri setlerinin karşılaştırılmasını sağlar.'],
    ['Değişim katsayısının küçük olması ne anlama gelir?', 'Verilerin ortalamanın çevresinde, ortalamanın büyüklüğüne kıyasla dar bir aralıkta toplandığını, yani daha homojen ve tutarlı olduğunu gösterir. Tüm değerler eşitse katsayı sıfırdır.'],
    ['Değişim katsayısı %100\'ü geçebilir mi?', 'Evet. Standart sapma ortalamadan büyükse katsayı %100\'ün üzerine çıkar. Bu durum genellikle çok çarpık dağılımlarda ya da ortalaması sıfıra yakın verilerde görülür.'],
    ['Örneklem mi, anakütle mi seçmeliyim?', 'Verileriniz daha geniş bir topluluk hakkında fikir edinmek için alınmış bir parçaysa örneklem; ilgilendiğiniz her birimin ölçümü elinizdeyse anakütle seçin. Emin değilseniz örneklem seçeneği daha yaygın ve temkinli tercihtir.'],
    ['Varyasyon katsayısı ile değişim katsayısı aynı şey mi?', 'Evet. Varyasyon katsayısı, değişkenlik katsayısı ve bağıl standart sapma aynı ölçünün farklı adlarıdır.'],
    ['Negatif sayılar içeren veride neden uyarı çıkıyor?', 'Çünkü katsayı, sıfırın anlamlı bir alt sınır olduğu büyüklükler için tasarlanmıştır. Negatif değerler ortalamayı sıfıra yaklaştırabilir ve katsayıyı yapay biçimde büyütebilir; sonuç matematiksel olarak hesaplanır ama yorumu güvenilir olmaz.'],
    ['Verilerim sunucuya yükleniyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz sayılar hiçbir yere gönderilmez.'],
  ],
  related: ['standart-sapma-hesapla', 'varyans-hesapla', 'ortalama-hesapla', 'aciklik-hesapla', 'ceyreklik-hesapla', 'z-skoru-hesapla'],
};
