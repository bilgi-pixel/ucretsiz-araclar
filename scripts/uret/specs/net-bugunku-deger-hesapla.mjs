export default {
  slug: 'net-bugunku-deger-hesapla',
  title: 'Net Bugünkü Değer (NBD) Hesaplama',
  h1Tail: 'yatırım projesi değerlendirme',
  pageTitle: 'Net Bugünkü Değer (NBD) Hesaplama – Yatırım Kârlı mı?',
  description: 'İlk yatırım tutarını, iskonto oranını ve yıllık nakit akışlarını girin; net bugünkü değeri (NBD/NPV), kârlılık endeksini ve indirgenmiş geri dönüş yılını hesaplayın.',
  card: 'Yatırımın yıllık nakit akışlarını bugüne indirgeyin; net bugünkü değeri (NBD) ve kârlılık endeksini görün.',
  category: 'finans',
  keywords: ['net bugünkü değer hesaplama', 'nbd hesaplama', 'npv hesaplama', 'net bugünkü değer formülü', 'yatırım değerlendirme', 'kârlılık endeksi', 'indirgenmiş nakit akışı', 'net şimdiki değer'],
  lead: 'Bir yatırımın getireceği nakit akışları, bugün yapılacak harcamaya değer mi? İlk yatırımı, iskonto oranını ve yıllara göre beklenen net nakit akışlarını yazın; araç her akışı bugüne indirger ve <strong>net bugünkü değeri (NBD)</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'yatirim', label: 'İlk yatırım tutarı (TL)', type: 'number', placeholder: 'Örn. 100000', hint: 'Bugün (0. yılda) yapılan harcama; artı sayı olarak yazın' },
    { id: 'oran', label: 'Yıllık iskonto oranı (%)', type: 'number', placeholder: 'Örn. 30', hint: 'Sermaye maliyeti ya da beklenen asgari getiri' },
    { id: 'akislar', label: 'Yıllık net nakit akışları', type: 'textarea', wide: true, placeholder: '40000 50000 60000 70000', hint: '1. yıldan başlayarak sırayla; boşluk, satır sonu ya da noktalı virgülle ayırın. Binlik ayırıcı kullanmayın; nakit çıkışı olan yıllar için eksi yazın.' },
  ],
  compute(v, h) {
    const I = h.nonneg(v.yatirim, 'İlk yatırım tutarı');
    const oran = h.num(v.oran, 'Yıllık iskonto oranı');
    if (oran <= -100) h.err('İskonto oranı −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('İskonto oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    const cf = h.nums(v.akislar, 'Yıllık net nakit akışları');
    if (cf.length > 100) h.err('En fazla 100 yıllık nakit akışı girebilirsiniz.');
    const r = oran / 100;
    let pv = 0;
    let geri = 0;
    const satirlar = ['0. yıl: ' + h.para(-I) + ' (ilk yatırım)'];
    cf.forEach((c, k) => {
      const t = k + 1;
      const b = c / Math.pow(1 + r, t);
      pv += b;
      if (!geri && pv - I >= -1e-9) geri = t;
      satirlar.push(t + '. yıl: ' + h.para(c) + ' → bugünkü değeri ' + h.para(b) + ' (birikimli NBD ' + h.para(pv - I) + ')');
    });
    const nbd = pv - I;
    if (!Number.isFinite(nbd)) h.err('Sonuç hesaplanamadı; oranı ve tutarları kontrol edin.');
    const sifir = Math.abs(nbd) < 0.005;
    const karar = sifir
      ? 'NBD sıfır: yatırım tam olarak beklenen getiriyi sağlıyor'
      : nbd > 0 ? 'NBD pozitif: yatırım beklenen getirinin üzerinde değer yaratıyor' : 'NBD negatif: yatırım beklenen getiriyi karşılamıyor';
    const rows = [
      ['Net bugünkü değer (NBD)', h.para(sifir ? 0 : nbd)],
      ['Nakit akışlarının bugünkü değeri', h.para(pv)],
      ['İlk yatırım', h.para(I)],
    ];
    if (I > 0) rows.push(['Kârlılık endeksi', h.fmt(pv / I, 4)]);
    rows.push(['İndirgenmiş geri dönüş', geri ? geri + '. yıl içinde' : 'Girilen süre içinde geri dönmüyor']);
    rows.push(['Nakit akışlarının indirgenmemiş toplamı', h.para(cf.reduce((a, c) => a + c, 0))]);
    rows.push(['Değerlendirme', karar]);
    return {
      rows,
      text: satirlar.join('\n'),
      note: 'NBD = −yatırım + Σ nakit akışı ÷ (1 + oran)^yıl. Akışların her yılın sonunda gerçekleştiği varsayılır.',
    };
  },
  cases: [
    { in: { yatirim: '10000', oran: '10', akislar: '5000 5000 5000' }, out: { 'Net bugünkü değer (NBD)': '2.434,26 TL', 'Nakit akışlarının bugünkü değeri': '12.434,26 TL', 'Kârlılık endeksi': '1,2434', 'İndirgenmiş geri dönüş': '3. yıl içinde', 'Değerlendirme': 'NBD pozitif: yatırım beklenen getirinin üzerinde değer yaratıyor' }, textMatch: '1\\. yıl: 5\\.000,00 TL → bugünkü değeri 4\\.545,45 TL' },
    { in: { yatirim: '1000', oran: '10', akislar: '500 500' }, out: { 'Net bugünkü değer (NBD)': '-132,23 TL', 'Nakit akışlarının bugünkü değeri': '867,77 TL', 'İndirgenmiş geri dönüş': 'Girilen süre içinde geri dönmüyor', 'Değerlendirme': 'NBD negatif: yatırım beklenen getiriyi karşılamıyor' } },
    { in: { yatirim: '1000', oran: '10', akislar: '1100' }, out: { 'Net bugünkü değer (NBD)': '0,00 TL', 'Kârlılık endeksi': '1', 'Değerlendirme': 'NBD sıfır: yatırım tam olarak beklenen getiriyi sağlıyor' } },
    { in: { yatirim: '100000', oran: '30', akislar: '40000\n50000\n60000\n70000' }, out: { 'Net bugünkü değer (NBD)': '12.173,94 TL', 'Kârlılık endeksi': '1,1217', 'İndirgenmiş geri dönüş': '4. yıl içinde', 'Nakit akışlarının indirgenmemiş toplamı': '220.000,00 TL' } },
    { in: { yatirim: '100000', oran: '40', akislar: '40000 50000 60000 70000' }, out: { 'Net bugünkü değer (NBD)': '-5.830,90 TL', 'Nakit akışlarının bugünkü değeri': '94.169,10 TL' } },
    { in: { yatirim: '10000', oran: '12', akislar: '3000; 4000; 5000; -1000; 6000' }, out: { 'Net bugünkü değer (NBD)': '2.195,29 TL', 'Nakit akışlarının bugünkü değeri': '12.195,29 TL' } },
    { in: { yatirim: '1000', oran: '0', akislar: '500 500 500' }, out: { 'Net bugünkü değer (NBD)': '500,00 TL', 'İndirgenmiş geri dönüş': '2. yıl içinde' } },
    { in: { yatirim: '100000', oran: '20', akislar: '60000 60000' }, out: { 'Net bugünkü değer (NBD)': '-8.333,33 TL' } },
    { in: { yatirim: '10000', oran: '10', akislar: '' }, error: true },
    { in: { yatirim: '10000', oran: '10', akislar: '5000 beş bin' }, error: true },
    { in: { yatirim: '10000', oran: '-100', akislar: '5000' }, error: true },
  ],
  howto: [
    '"İlk yatırım tutarı" alanına projeye bugün harcanacak parayı artı sayı olarak yazın (makine, tadilat, lisans, kuruluş giderleri gibi).',
    '"Yıllık iskonto oranı" alanına bu yatırımdan beklediğiniz asgari yıllık getiriyi ya da sermayenizin maliyetini girin.',
    'Nakit akışları kutusuna 1. yıldan başlayarak her yılın net nakit girişini sırayla yazın. Aralarına boşluk ya da satır sonu koyun; zarar ya da ek yatırım beklenen yıllar için eksi işaretli değer girin.',
    '"Hesapla" düğmesine basın. İlk satır net bugünkü değeri gösterir; alttaki kutuda her yılın akışı, bugünkü değeri ve birikimli NBD listelenir.',
    'İskonto oranını ya da akışları değiştirerek iyimser ve kötümser senaryoları deneyin; kararın bu değişikliklere ne kadar duyarlı olduğunu görün.',
  ],
  sections: [
    { h: 'Net bugünkü değer (NBD) nedir?', p: [
      'Net bugünkü değer, bir yatırımın gelecekte sağlayacağı nakit akışlarının bugünkü değerleri toplamından ilk yatırım tutarının çıkarılmasıyla bulunur. İngilizce "net present value" ifadesinden NPV olarak da anılır; Türkçe kaynaklarda net şimdiki değer adıyla da geçer. Yatırım kararlarında en yaygın kullanılan ölçütlerden biridir, çünkü paranın zaman değerini hesaba katar: üç yıl sonra gelecek 100.000 TL ile bugünkü 100.000 TL\'yi aynı kefeye koymaz.',
      'Yorumu yalındır. <strong>NBD pozitifse</strong> proje, iskonto oranı olarak belirlediğiniz getiriyi sağladıktan sonra üstüne o kadar liralık bugünkü değer yaratır. <strong>NBD negatifse</strong> proje beklenen getiriyi karşılamaz; para alternatifinde değerlendirilse daha iyi sonuç verir. <strong>NBD sıfırsa</strong> proje tam beklenen getiriyi sağlar.',
    ] },
    { h: 'NBD formülü', p: [
      '<strong>NBD = −I + NA<sub>1</sub> ÷ (1 + r) + NA<sub>2</sub> ÷ (1 + r)<sup>2</sup> + … + NA<sub>n</sub> ÷ (1 + r)<sup>n</sup></strong>. Burada I ilk yatırım, NA<sub>t</sub> t\'inci yılın net nakit akışı, r yıllık iskonto oranıdır. Her akış, kaç yıl sonra gerçekleşecekse o kadar kez (1 + r)\'ye bölünerek bugüne indirgenir; uzak yıllardaki akışlar bu yüzden toplamda daha az ağırlık taşır.',
      'Araç iki yardımcı ölçüt de verir. <strong>Kârlılık endeksi</strong>, akışların bugünkü değerinin ilk yatırıma oranıdır; 1\'in üzerindeyse NBD pozitiftir ve yatırılan her liranın bugünkü değerle kaç lira geri döndüğünü gösterir. <strong>İndirgenmiş geri dönüş</strong> ise birikimli NBD\'nin ilk kez sıfırın üzerine çıktığı yıldır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir atölye 10.000 TL\'lik bir makine almayı düşünüyor. Makinenin üç yıl boyunca yılda 5.000 TL net nakit sağlaması bekleniyor ve işletme en az yıllık %10 getiri istiyor.',
    ], ol: [
      '1. yıl: 5.000 ÷ 1,10 = 4.545,45 TL',
      '2. yıl: 5.000 ÷ 1,21 = 4.132,23 TL',
      '3. yıl: 5.000 ÷ 1,331 = 3.756,57 TL',
      'Bugünkü değerler toplamı: 12.434,26 TL',
      'NBD = 12.434,26 − 10.000 = <strong>2.434,26 TL</strong>; kârlılık endeksi 1,2434',
    ] },
    { h: 'Örneğin yorumu ve iskonto oranının etkisi', p: [
      'Yukarıdaki örnekte indirgenmemiş toplam giriş 15.000 TL\'dir; ancak paranın zaman değeri düşüldüğünde bugünkü karşılığı 12.434,26 TL\'ye iner. Yine de yatırım tutarını aştığı için proje kabul edilebilir görünür ve yatırım ancak üçüncü yıl içinde kendini indirgenmiş olarak geri öder.',
      'NBD, iskonto oranına çok duyarlıdır. 100.000 TL yatırım ve sırasıyla 40.000, 50.000, 60.000, 70.000 TL nakit akışı olan bir projede oran %30 alınırsa NBD 12.173,94 TL çıkar; oran %40\'a yükseltildiğinde ise −5.830,90 TL\'ye düşer ve proje reddedilir. NBD\'yi tam sıfır yapan orana iç verim oranı denir; bu örnekte %30 ile %40 arasındadır.',
    ] },
    { h: 'İskonto oranı ve nakit akışları nasıl belirlenir?', ul: [
      '<strong>İskonto oranı:</strong> Parayı bu projeye değil de benzer riskteki en iyi alternatife yatırsaydınız elde edeceğiniz getiridir. Kredi kullanılıyorsa kredi maliyeti alt sınırdır; öz kaynak için mevduat ya da tahvil getirisinin üzerine risk payı eklenir.',
      '<strong>Enflasyon tutarlılığı:</strong> Nakit akışlarını ileriki yılların fiyatlarıyla (nominal) tahmin ettiyseniz nominal oran, bugünkü fiyatlarla (reel) tahmin ettiyseniz reel oran kullanın. İkisini karıştırmak en sık yapılan hatadır.',
      '<strong>Net nakit akışı:</strong> Muhasebe kârı değil, kasaya giren ve çıkan paradır. Satış tahsilatından işletme giderleri ve vergiler düşülür; amortisman nakit çıkışı olmadığı için düşülmez.',
      '<strong>Hurda değeri:</strong> Proje sonunda satılacak varlığın bedelini son yılın akışına ekleyin.',
      '<strong>Batık maliyetler:</strong> Karardan önce harcanmış ve geri alınamayacak tutarlar hesaba katılmaz.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Makine, araç ya da şube yatırımını değerlendiren esnaf ve KOBİ\'ler; güneş paneli, ısı yalıtımı gibi tasarruf sağlayan yatırımların kendini ödeyip ödemediğini merak eden ev sahipleri; kira getirisi üzerinden gayrimenkul değerlendiren yatırımcılar; hibe ve destek başvurularında fizibilite tablosu hazırlayan girişimciler ve finans yönetimi, mühendislik ekonomisi derslerinde problem çözen öğrenciler bu hesaptan yararlanır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yıllık dönemlerle çalışır ve her akışın yıl sonunda gerçekleştiğini, iskonto oranının tüm yıllarda aynı olduğunu varsayar. Sonucun güvenilirliği nakit akışı tahminlerinizin isabetine bağlıdır; iyimser tahminler kötü bir projeyi kârlı gösterebilir. NBD projelerin büyüklüğünü dikkate almaz; farklı ölçekteki yatırımları karşılaştırırken kârlılık endeksine de bakın. Sonuçlar bilgilendirme amaçlıdır; önemli yatırım kararlarında mali müşavir ya da finans uzmanından görüş alın.',
    ] },
  ],
  faq: [
    ['Net bugünkü değer nasıl hesaplanır?', 'Her yılın net nakit akışı, bir artı iskonto oranının yıl sayısı kadar kuvvetine bölünerek bugüne indirgenir; bulunan değerler toplanır ve ilk yatırım tutarı çıkarılır. Sonuç artıysa yatırım beklenen getirinin üzerinde değer üretir.'],
    ['NBD ile NPV aynı şey mi?', 'Evet. NPV, İngilizce net present value ifadesinin kısaltmasıdır; Türkçede net bugünkü değer (NBD) ya da net şimdiki değer (NŞD) olarak kullanılır.'],
    ['NBD pozitif çıkarsa yatırım kesin kârlı mıdır?', 'Hayır. Pozitif NBD, tahminleriniz gerçekleşirse yatırımın istenen getiriyi aşacağını söyler. Tahminler belirsizlik içerdiği için farklı senaryolarla ve farklı iskonto oranlarıyla denemek, sonucun ne kadar sağlam olduğunu anlamaya yardımcı olur.'],
    ['İskonto oranı olarak neyi yazmalıyım?', 'Benzer riskteki alternatif bir yatırımdan bekleyeceğiniz yıllık getiriyi. Şirketlerde bu genellikle ağırlıklı ortalama sermaye maliyetidir; bireysel kararlarda mevduat ya da tahvil getirisinin üzerine projenin riskine göre bir pay eklenir.'],
    ['Nakit akışları eşit olmak zorunda mı?', 'Hayır. Her yıl için farklı tutar girebilirsiniz; ek yatırım ya da zarar beklenen yıllar için eksi değer de yazabilirsiniz. Örneğin dördüncü yılda bakım gideri nedeniyle net çıkış bekleniyorsa o yıla −1000 gibi bir değer girin.'],
    ['NBD ile iç verim oranı arasındaki fark nedir?', 'NBD, verilen bir iskonto oranında projenin lira cinsinden yarattığı değeri gösterir. İç verim oranı ise NBD\'yi sıfıra eşitleyen orandır, yani projenin kendi yıllık getirisidir. İkisi genellikle aynı kararı verir; çelişki olduğunda NBD esas alınır.'],
    ['Aylık nakit akışlarıyla hesap yapabilir miyim?', 'Evet, ancak oranı da aylık girmeniz gerekir. Akışları ay ay yazıp iskonto oranı alanına aylık oranı girerseniz sonuçtaki "yıl" ifadelerini "ay" olarak okuyabilirsiniz.'],
    ['Girdiğim proje verileri bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yatırım tutarı ve nakit akışları sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['bugunku-deger-hesapla', 'ic-verim-orani-hesapla', 'geri-odeme-suresi-hesapla', 'yatirim-getirisi-hesapla', 'gelecek-deger-hesapla', 'basabas-noktasi-hesapla'],
};
