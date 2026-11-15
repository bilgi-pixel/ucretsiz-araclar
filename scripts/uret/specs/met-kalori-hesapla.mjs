export default {
  slug: 'met-kalori-hesapla',
  title: 'MET Değeriyle Kalori Hesaplama',
  h1Tail: 'her aktivite için',
  pageTitle: 'MET Değeriyle Kalori Hesaplama – Aktiviteye Göre Yakılan Kalori',
  description: 'Bir aktivitenin MET değerini, kilonuzu ve süreyi girin; yakılan toplam ve net kaloriyi, yoğunluk sınıfını ve MET-dakika değerini anında hesaplayın.',
  card: 'MET değeri, kilo ve süreden yakılan kaloriyi, yoğunluk sınıfını ve MET-dakika karşılığını hesaplayın.',
  category: 'saglik',
  keywords: ['MET kalori hesaplama', 'MET değeri nedir', 'metabolik eşdeğer hesaplama', 'MET formülü', 'aktivite kalori hesaplama', 'MET dakika hesaplama', 'egzersiz kalori hesaplama'],
  lead: `Yaptığınız aktivitenin <strong>MET değerini</strong>, vücut ağırlığınızı ve süreyi girin; araç harcadığınız enerjiyi kilokalori olarak verir. Listede hazır aracı bulunmayan dans, ev işi, bahçe işi, halı saha ya da pilates gibi her etkinlik için bu genel hesaplayıcıyı kullanabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'met', label: 'MET değeri', type: 'number', placeholder: 'Örn. 8', hint: 'Aşağıdaki tablodan aktivitenize uygun değeri seçebilirsiniz.' },
    { id: 'kilo', label: 'Vücut ağırlığı (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 60' },
  ],
  compute(v, h) {
    const met = h.pos(v.met, 'MET değeri');
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const dk = h.pos(v.sure, 'Süre');
    if (met < 0.9 || met > 25) h.err('MET değeri 0,9 ile 25 arasında olmalı. Uyku yaklaşık 0,95, en yoğun sporlar 20 civarındadır.');
    if (kg < 20 || kg > 250) h.err('Vücut ağırlığı 20 ile 250 kg arasında olmalı.');
    if (dk > 1440) h.err('Süre 1.440 dakikadan (24 saat) uzun olamaz.');
    const saat = dk / 60;
    const kcal = met * kg * saat;
    const net = Math.max(0, (met - 1) * kg * saat);
    let sinif;
    if (met < 1.5 - 1e-9) sinif = 'Sedanter (hareketsiz)';
    else if (met < 3 - 1e-9) sinif = 'Hafif şiddetli';
    else if (met < 6 - 1e-9) sinif = 'Orta şiddetli';
    else sinif = 'Yüksek şiddetli';
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / dk, 2) + ' kcal'],
        ['Saat başına', h.fmt(met * kg, 0) + ' kcal'],
        ['Yoğunluk sınıfı', sinif],
        ['MET-dakika', h.fmt(met * dk, 0)],
        ['Kilojul karşılığı', h.fmt(kcal * 4.184, 0) + ' kJ'],
      ],
      note: '1 MET = kilogram başına saatte 1 kcal kabul edilmiştir. Kişisel dinlenme metabolizması bu ortalamadan farklı olabilir.',
    };
  },
  cases: [
    { in: { met: '8', kilo: '70', sure: '60' }, out: { 'Yakılan kalori': '560 kcal', 'Net kalori (dinlenme hariç)': '490 kcal', 'Yoğunluk sınıfı': 'Yüksek şiddetli', 'MET-dakika': '480', 'Kilojul karşılığı': '2.343 kJ' } },
    { in: { met: '3,5', kilo: '80', sure: '30' }, out: { 'Yakılan kalori': '140 kcal', 'Net kalori (dinlenme hariç)': '100 kcal', 'Yoğunluk sınıfı': 'Orta şiddetli', 'MET-dakika': '105' } },
    { in: { met: '1', kilo: '70', sure: '60' }, out: { 'Yakılan kalori': '70 kcal', 'Net kalori (dinlenme hariç)': '0 kcal', 'Yoğunluk sınıfı': 'Sedanter (hareketsiz)' } },
    { in: { met: '2,5', kilo: '60', sure: '40' }, out: { 'Yakılan kalori': '100 kcal', 'Yoğunluk sınıfı': 'Hafif şiddetli', 'Dakika başına': '2,5 kcal' } },
    { in: { met: '10', kilo: '75', sure: '20' }, out: { 'Yakılan kalori': '250 kcal', 'Saat başına': '750 kcal' } },
    { in: { met: '6', kilo: '65', sure: '90' }, out: { 'Yakılan kalori': '585 kcal', 'MET-dakika': '540', 'Yoğunluk sınıfı': 'Yüksek şiddetli' } },
    { in: { met: '0', kilo: '70', sure: '60' }, error: true },
    { in: { met: '40', kilo: '70', sure: '60' }, error: true },
    { in: { met: '8', kilo: 'yetmiş', sure: '60' }, error: true },
  ],
  howto: [
    `Aktivitenizin MET değerini bulun. Bu sayfadaki başvuru tablosu yaygın etkinlikleri içerir; spor salonu makineleri ve akıllı saatler de çoğu zaman MET değerini gösterir.`,
    `"MET değeri" alanına bu sayıyı, "Vücut ağırlığı" alanına kilonuzu yazın.`,
    `"Süre" alanına aktiviteyi fiilen yaptığınız dakikayı girin; ısınma, mola ve bekleme sürelerini ayrı düşünün.`,
    `"Hesapla" düğmesine basın. Toplam kalori ilk satırda, net kalori, yoğunluk sınıfı ve MET-dakika değeri altındaki satırlarda görünür.`,
  ],
  sections: [
    { h: 'MET nedir?', p: [
      `MET, "metabolik eşdeğer" anlamına gelen bir yoğunluk birimidir. 1 MET, sessizce otururken harcanan enerjiye karşılık gelir ve kilogram başına dakikada 3,5 mililitre oksijen tüketimi, pratikte ise <strong>kilogram başına saatte yaklaşık 1 kcal</strong> olarak kabul edilir. Bir aktivitenin 4 MET olması, onun dinlenmeye göre dört kat enerji gerektirdiğini söyler.`,
      `Bu birimin gücü, farklı kilolardaki insanları ve birbirinden çok farklı etkinlikleri aynı ölçekte karşılaştırabilmesidir. Araştırmacılar yüzlerce aktivitenin oksijen tüketimini ölçüp MET değerlerini derlemiştir; bu derlemeler sayesinde ev süpürmekten kürek çekmeye kadar hemen her şeyin enerji maliyeti tahmin edilebilir.`,
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      `Hesap tek satırdır: <strong>kalori = MET × kilo (kg) × süre (saat)</strong>. Dakika ile çalışmak isterseniz süreyi 60'a bölmeniz yeterlidir.`,
      `Örnek: 70 kg ağırlığında biri 60 dakika boyunca 8 MET'lik bir aktivite (örneğin orta tempolu bisiklet) yapsın. Harcama 8 × 70 × 1 = <strong>560 kcal</strong> olur. Aynı kişi o bir saati oturarak geçirseydi yine 70 kcal harcayacaktı; dolayısıyla aktivitenin net katkısı (8 − 1) × 70 × 1 = 490 kcal'dir. Enerji birimi olarak kilojul kullananlar için 560 kcal, 4,184 ile çarpılarak 2.343 kJ eder.`,
      `İkinci örnek: 80 kg biri 30 dakika 3,5 MET'lik tempolu yürüyüş yaparsa 3,5 × 80 × 0,5 = 140 kcal harcar; net değer 100 kcal'dir.`,
    ] },
    { h: 'Yaygın aktivitelerin yaklaşık MET değerleri', ul: [
      `<strong>Uyku</strong>: 0,95 – <strong>oturarak televizyon izleme</strong>: 1,0 – <strong>masa başı çalışma</strong>: 1,3–1,5`,
      `<strong>Yavaş yürüyüş</strong> (4 km/sa): 3,0 – <strong>tempolu yürüyüş</strong> (5,5 km/sa): 4,3`,
      `<strong>Ev temizliği, süpürme</strong>: 3,3 – <strong>bahçe işleri</strong>: 3,8–5,0`,
      `<strong>Yoga (hatha)</strong>: 2,5 – <strong>pilates</strong>: 3,0`,
      `<strong>Ağırlık antrenmanı</strong>: orta tempoda 3,5 – yoğun tempoda 6,0`,
      `<strong>Dans (genel)</strong>: 5,0–7,8`,
      `<strong>Tenis (tekler)</strong>: 8,0 – <strong>basketbol maçı</strong>: 8,0`,
      `<strong>Futbol</strong>: gündelik oyunda 7,0 – müsabakada 10,0`,
      `<strong>Koşu</strong>: 8 km/sa için 8,3 – 10 km/sa için 9,8 – 12 km/sa için 11,5`,
      `<strong>İp atlama</strong> (orta tempo): 11,8`,
    ] },
    { h: 'Yoğunluk sınıfları ve MET-dakika', p: [
      `Sağlık kuruluşlarının fiziksel aktivite önerilerinde etkinlikler MET değerine göre gruplanır: 1,5'in altı sedanter davranış, 1,5–3 arası hafif, 3–6 arası <strong>orta şiddetli</strong>, 6 ve üzeri <strong>yüksek şiddetli</strong> aktivite sayılır. Araç, girdiğiniz değerin hangi sınıfa düştüğünü sonuçta gösterir.`,
      `MET-dakika, yoğunluk ile sürenin çarpımıdır ve haftalık hareket miktarını tek sayıyla özetlemeye yarar. 4 MET'lik tempolu yürüyüşü 30 dakika yapmak 120 MET-dakika eder; haftada beş gün tekrarlandığında 600 MET-dakikaya ulaşılır. Yetişkinler için yaygın olarak önerilen haftalık 150 dakikalık orta şiddetli aktivite kabaca bu düzeye karşılık gelir. Farklı etkinlikleri toplarken her birinin MET-dakikasını ayrı ayrı hesaplayıp toplayabilirsiniz.`,
    ] },
    { h: 'Toplam mı, net mi?', p: [
      `MET değerleri dinlenme harcamasını da içerir. Günlük enerji ihtiyacınızı bazal metabolizma üzerinden ayrıca hesaplıyorsanız aktiviteden gelen ek harcamayı bulmak için <strong>net kaloriyi</strong> kullanmalısınız; yoksa dinlenme enerjisini iki kez sayarsınız. Fark, düşük yoğunluklu ve uzun süreli etkinliklerde büyür: 2 MET'lik bir işte toplam değerin yarısı zaten dinlenme payıdır.`,
    ] },
    { h: 'Yöntemin sınırları', p: [
      `1 MET'in kilogram başına saatte 1 kcal olması bir ortalamadır. Gerçek dinlenme metabolizması yaşa, cinsiyete ve özellikle vücut bileşimine göre değişir; yağ oranı yüksek kişilerde ve ileri yaşlarda kilogram başına harcama daha düşüktür. Bu nedenle yöntem fazla kilolu bireylerde harcamayı bir miktar yüksek tahmin edebilir.`,
      `Tablolardaki MET değerleri de ortalama bir uygulama biçimini yansıtır. "Futbol" derken sahada durmadan koşan orta saha oyuncusu ile kaleci aynı enerjiyi harcamaz. Kendi eforunuza göre değeri biraz aşağı ya da yukarı çekmek mantıklıdır. Aletli antrenman gibi kesintili etkinliklerde setler arasındaki dinlenmeler de ortalamaya dahildir.`,
      `Buradaki sonuçlar bilgilendirme amaçlıdır; tıbbi tanı, tedavi ya da kişiye özel beslenme planı yerine geçmez. Sağlık sorununuz varsa egzersiz yoğunluğunu hekiminizle birlikte belirleyin.`,
    ] },
  ],
  faq: [
    ['MET değeri nasıl hesaplanır?', `Bir aktivitede ölçülen oksijen tüketimi (ml/kg/dk) 3,5'e bölünerek bulunur. Günlük kullanımda ölçüm yapmak gerekmez; aktiviteler için hazırlanmış tablolardaki değerler kullanılır.`],
    ['MET ile kalori arasındaki ilişki nedir?', `1 MET, kilogram başına saatte yaklaşık 1 kcal'dir. Bu yüzden kalori, MET değeri ile kilonun ve saat cinsinden sürenin çarpımıdır. 70 kg biri 5 MET'lik bir işi 1 saat yaparsa 350 kcal harcar.`],
    ['Bazı kaynaklarda formül neden MET × 3,5 × kilo ÷ 200 olarak veriliyor?', `Bu sürüm dakikalık kaloriyi oksijen tüketiminden hesaplar ve litre oksijen başına 5 kcal varsayar. Sonuç, bu sayfadaki formülden yaklaşık yüzde 5 daha yüksek çıkar. İkisi de kabul gören yaklaşık yöntemlerdir.`],
    ['Kaç MET orta şiddetli sayılır?', `3 ile 6 MET arası orta şiddetli, 6 MET ve üzeri yüksek şiddetli kabul edilir. Tempolu yürüyüş orta, koşu ve ip atlama yüksek şiddetli etkinliklere örnektir.`],
    ['Koşu bandında gördüğüm MET değerini buraya yazabilir miyim?', `Evet. Bant ya da kondisyon bisikleti ortalama MET gösteriyorsa bu değeri, kilonuzu ve süreyi girerek kendi kilonuza göre harcamayı hesaplayabilirsiniz.`],
    ['Aynı MET değerinde kilolu biri neden daha çok kalori yakıyor?', `Çünkü MET kilogram başına bir orandır; daha ağır bir vücudu hareket ettirmek ve beslemek daha çok enerji ister. Kilo iki katına çıkarsa hesaplanan kalori de iki katına çıkar.`],
    ['MET değeri 1\'den küçük olabilir mi?', `Evet, uyku sırasında harcama oturarak dinlenmenin biraz altına iner ve yaklaşık 0,95 MET kabul edilir. Araç 0,9'dan küçük değerleri kabul etmez.`],
    ['Girdiğim veriler kaydediliyor mu?', `Hayır. Hesap tamamen tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez ya da saklanmaz.`],
  ],
  related: ['kosu-kalori-hesapla', 'bisiklet-kalori-hesapla', 'yuzme-kalori-hesapla', 'yuruyus-kalori-hesapla', 'ip-atlama-kalori-hesapla', 'kalori-acigi-hesapla'],
};
