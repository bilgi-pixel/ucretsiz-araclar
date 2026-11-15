export default {
  slug: 'kalori-acigi-hesapla',
  title: 'Kalori Açığı ve Kilo Verme Süresi Hesaplama',
  pageTitle: 'Kalori Açığı Hesaplama – Kilo Verme Süresi Kaç Hafta?',
  description: 'Günlük kalori ihtiyacınız ile aldığınız kalori arasındaki açığı hesaplayın; hedef kilonuza kaç günde ulaşacağınızı ve haftalık tahmini kaybı görün.',
  card: 'Kalori açığınızı, haftalık tahmini kilo kaybını ve hedef kiloya ulaşma süresini 7700 kcal kuralıyla hesaplayın.',
  category: 'saglik',
  keywords: ['kalori açığı hesaplama', 'kilo verme süresi hesaplama', 'kaç günde kilo veririm', '1 kilo kaç kalori', 'haftada kaç kilo verilir', 'kalori açığı nedir', '7700 kalori kuralı'],
  lead: 'Günlük harcadığınız ve aldığınız kaloriyi yazın; araç aradaki <strong>kalori açığını</strong>, bu açıkla haftada yaklaşık kaç kilo vereceğinizi ve hedef kilonuza <strong>kaç günde</strong> ulaşabileceğinizi hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'mevcut', label: 'Mevcut kilo (kg)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'hedef', label: 'Hedef kilo (kg)', type: 'number', placeholder: 'Örn. 75' },
    { id: 'ihtiyac', label: 'Günlük kalori ihtiyacı (kcal)', type: 'number', placeholder: 'Örn. 2500', hint: 'Kilonuzu koruduğunuz kalori. Binlik ayraç kullanmayın (2500 yazın).' },
    { id: 'alinan', label: 'Günlük alınan kalori (kcal)', type: 'number', placeholder: 'Örn. 2000', hint: 'Diyette almayı planladığınız günlük kalori.' },
  ],
  compute(v, h) {
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    const ihtiyac = h.pos(v.ihtiyac, 'Günlük kalori ihtiyacı');
    const alinan = h.pos(v.alinan, 'Günlük alınan kalori');
    if (mevcut < 30 || mevcut > 400) h.err('Mevcut kilo 30 ile 400 kg arasında olmalı.');
    if (hedef < 30) h.err('Hedef kilo 30 kg\'dan küçük olamaz.');
    if (hedef >= mevcut) h.err('Hedef kilo mevcut kilodan küçük olmalı. Kilo almak için "Kilo Alma İçin Kalori Hesaplama" aracını kullanın.');
    if (ihtiyac < 800 || ihtiyac > 10000) h.err('Günlük kalori ihtiyacı 800 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2500).');
    if (alinan < 500 || alinan > 10000) h.err('Günlük alınan kalori 500 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2000).');
    if (alinan >= ihtiyac) h.err('Kalori açığı oluşması için alınan kalori ihtiyaçtan düşük olmalı.');
    const KG = 7700;
    const acik = ihtiyac - alinan;
    const kilo = mevcut - hedef;
    const toplam = kilo * KG;
    const gun = Math.max(1, Math.ceil(toplam / acik - 1e-9));
    const haftalik = acik * 7 / KG;
    const uyari = [];
    if (acik > 1000 + 1e-9) uyari.push('Günlük açık 1000 kcal\'nin üzerinde; bu kadar büyük açık genellikle sürdürülemez ve kas kaybını artırabilir.');
    if (alinan < 1200) uyari.push('Günlük 1200 kcal\'nin altındaki planlar yalnızca sağlık uzmanı gözetiminde uygulanmalıdır.');
    return {
      rows: [
        ['Günlük kalori açığı', h.fmt(acik, 0) + ' kcal'],
        ['Tahmini haftalık kilo kaybı', h.fmt(haftalik, 2) + ' kg'],
        ['Verilecek kilo', h.fmt(kilo, 1) + ' kg'],
        ['Tahmini süre', `${h.fmt(gun, 0)} gün (yaklaşık ${h.fmt(gun / 7, 1)} hafta)`],
        ['Toplam kalori açığı', h.fmt(toplam, 0) + ' kcal'],
        ['Açığın ihtiyaca oranı', '%' + h.fmt(acik / ihtiyac * 100, 1)],
      ],
      note: (uyari.length ? uyari.join(' ') + ' ' : '') + '1 kg vücut yağı yaklaşık 7700 kcal kabul edildi; gerçek kilo kaybı doğrusal ilerlemez, süre tahmindir.',
    };
  },
  cases: [
    { in: { mevcut: '80', hedef: '75', ihtiyac: '2500', alinan: '2000' }, out: { 'Günlük kalori açığı': '500 kcal', 'Tahmini haftalık kilo kaybı': '0,45 kg', 'Verilecek kilo': '5 kg', 'Tahmini süre': '77 gün (yaklaşık 11 hafta)', 'Toplam kalori açığı': '38.500 kcal', 'Açığın ihtiyaca oranı': '%20' } },
    { in: { mevcut: '90', hedef: '80', ihtiyac: '2800', alinan: '2030' }, out: { 'Günlük kalori açığı': '770 kcal', 'Tahmini haftalık kilo kaybı': '0,7 kg', 'Verilecek kilo': '10 kg', 'Tahmini süre': '100 gün (yaklaşık 14,3 hafta)', 'Toplam kalori açığı': '77.000 kcal' } },
    { in: { mevcut: '70', hedef: '68', ihtiyac: '2000', alinan: '1700' }, out: { 'Günlük kalori açığı': '300 kcal', 'Tahmini haftalık kilo kaybı': '0,27 kg', 'Tahmini süre': '52 gün (yaklaşık 7,4 hafta)', 'Açığın ihtiyaca oranı': '%15' } },
    { in: { mevcut: '100', hedef: '85', ihtiyac: '3000', alinan: '1900' }, out: { 'Günlük kalori açığı': '1.100 kcal', 'Tahmini haftalık kilo kaybı': '1 kg', 'Verilecek kilo': '15 kg', 'Tahmini süre': '105 gün (yaklaşık 15 hafta)' } },
    { in: { mevcut: '65', hedef: '60', ihtiyac: '2200', alinan: '1650' }, out: { 'Günlük kalori açığı': '550 kcal', 'Tahmini haftalık kilo kaybı': '0,5 kg', 'Tahmini süre': '70 gün (yaklaşık 10 hafta)', 'Açığın ihtiyaca oranı': '%25' } },
    { in: { mevcut: '85,5', hedef: '80', ihtiyac: '2400', alinan: '1900' }, out: { 'Verilecek kilo': '5,5 kg', 'Tahmini süre': '85 gün (yaklaşık 12,1 hafta)', 'Toplam kalori açığı': '42.350 kcal' } },
    { in: { mevcut: '80', hedef: '75', ihtiyac: '2000', alinan: '2300' }, error: true },
    { in: { mevcut: '75', hedef: '80', ihtiyac: '2500', alinan: '2000' }, error: true },
    { in: { mevcut: '80', hedef: '75', ihtiyac: '', alinan: '2000' }, error: true },
  ],
  howto: [
    'Mevcut kilonuzu ve ulaşmak istediğiniz hedef kiloyu kilogram olarak yazın.',
    'Günlük kalori ihtiyacınızı, yani kilonuzu koruduğunuz kalori miktarını girin. Bilmiyorsanız önce günlük kalori ihtiyacı hesaplayıcısını kullanın.',
    'Diyette günde almayı planladığınız kaloriyi yazın.',
    '"Hesapla" düğmesine basın. Günlük açık, haftalık tahmini kayıp ve hedefe ulaşma süresi gün ve hafta olarak görünür.',
    'Süre size uzun ya da kısa geldiyse alınan kaloriyi değiştirip yeniden hesaplayarak farklı senaryoları karşılaştırın.',
  ],
  sections: [
    { h: 'Kalori açığı nedir?', p: [
      'Kalori açığı, bir günde harcadığınız enerji ile yiyecek ve içeceklerle aldığınız enerji arasındaki farktır: <strong>açık = günlük kalori ihtiyacı − alınan kalori</strong>. Vücut harcadığından az enerji aldığında aradaki farkı depolarından, ağırlıklı olarak yağ dokusundan karşılar ve zamanla kilo kaybı ortaya çıkar. Hangi beslenme biçimi seçilirse seçilsin kilo vermenin ortak paydası bu açıktır.',
      'Günlük kalori ihtiyacı; bazal metabolizma, gündelik hareket, egzersiz ve besinlerin sindirimi için harcanan enerjinin toplamıdır. Bu değer kişiden kişiye ve günden güne değişir; hesaplayıcılarla bulunan sayı bir tahmindir. Bu yüzden aşağıdaki süre hesabı da kesin bir takvim değil, makul bir öngörüdür.',
    ] },
    { h: 'Hesabın mantığı: 7700 kcal kuralı', p: [
      'Bir kilogram vücut yağının yaklaşık 7700 kilokalori enerjiye karşılık geldiği kabul edilir. Buna göre hesap üç adımdır:',
    ], ol: [
      'Toplam açık = verilecek kilo × 7700 kcal',
      'Süre (gün) = toplam açık ÷ günlük açık',
      'Haftalık kayıp (kg) = günlük açık × 7 ÷ 7700',
    ] },
    { h: 'Çözümlü örnek', p: [
      '80 kg ağırlığında, hedefi 75 kg olan bir kişi düşünelim. Günlük ihtiyacı 2500 kcal, diyette aldığı kalori 2000 kcal olsun. Günlük açık 2500 − 2000 = <strong>500 kcal</strong>\'dir. Verilecek kilo 5 kg olduğundan toplam açık 5 × 7700 = 38.500 kcal eder. Süre 38.500 ÷ 500 = <strong>77 gün</strong>, yani yaklaşık 11 haftadır. Haftalık tahmini kayıp 500 × 7 ÷ 7700 = 0,45 kg olur. Açık, ihtiyacın %20\'sine denk gelir.',
      'Aynı kişi günlük 1700 kcal alsaydı açık 800 kcal, süre 38.500 ÷ 800 = 48,1, yani 49 gün olurdu. Açığı büyütmek süreyi kısaltır, ancak açlık, yorgunluk ve kas kaybı riskini de artırır.',
    ] },
    { h: 'Ne kadar açık makul?', p: [
      'Sağlık kuruluşlarının genel önerisi, kilonun yavaş ve istikrarlı verilmesidir; haftada yaklaşık yarım ile bir kilogram arası kayıp çoğu yetişkin için makul kabul edilir. Bu, günde kabaca 500 ile 1000 kcal arasında bir açığa karşılık gelir. Açığı kalori ihtiyacının oranı olarak düşünmek de yararlıdır: ihtiyacın %15–25\'i kadar bir açık çoğu kişi için sürdürülebilir bir aralıktır.',
      'Araç, günlük açık 1000 kcal\'yi aştığında ya da alınan kalori 1200 kcal\'nin altına indiğinde sonuç notunda uyarı gösterir. Çok düşük kalorili planlar vitamin, mineral ve protein yetersizliğine yol açabilir ve yalnızca sağlık uzmanı gözetiminde uygulanmalıdır.',
    ], ul: [
      '<strong>250 kcal açık:</strong> haftada yaklaşık 0,23 kg',
      '<strong>500 kcal açık:</strong> haftada yaklaşık 0,45 kg',
      '<strong>750 kcal açık:</strong> haftada yaklaşık 0,68 kg',
      '<strong>1000 kcal açık:</strong> haftada yaklaşık 0,91 kg',
    ] },
    { h: 'Gerçek hayatta süre neden uzar?', p: [
      '7700 kcal kuralı kullanışlı bir yaklaşımdır ama kilo kaybının düz bir çizgide ilerlediğini varsayar. Uygulamada birkaç etken bu çizgiyi büker. İlk haftalarda glikojen ve onunla birlikte tutulan suyun azalması nedeniyle tartı hızlı düşer; bu kayıp yağ değildir. Kilo verdikçe vücut küçülür ve günlük kalori ihtiyacı azalır; aynı kaloriyi almaya devam ederseniz açığınız kendiliğinden daralır. Ayrıca uzun süren kısıtlamada vücut enerji harcamasını bir miktar kısabilir, kişi fark etmeden daha az hareket edebilir.',
      'Bu yüzden birkaç kilo verdikten sonra kalori ihtiyacınızı yeniden hesaplayıp aracı güncel değerlerle tekrar çalıştırmak daha gerçekçi bir süre verir. Tartıdaki günlük oynamalara değil, iki üç haftalık eğilime bakın.',
    ] },
    { h: 'Açığı oluşturmanın yolları ve uyarı', p: [
      'Açık yalnızca az yiyerek değil, daha çok hareket ederek de oluşturulabilir; çoğu kişi için ikisinin birleşimi en kolay sürdürülen yoldur. Örneğin 500 kcal\'lik açığın 300\'ünü porsiyonları küçülterek ve şekerli içecekleri bırakarak, 200\'ünü günlük yürüyüşle sağlamak mümkündür. Yeterli protein almak ve direnç egzersizi yapmak, kaybın yağdan gelmesine yardımcı olur.',
      'Bu araç genel bilgilendirme amaçlıdır; tıbbi öneri değildir. Kronik hastalığı olanlar, ilaç kullananlar, gebeler, emzirenler, 18 yaş altındakiler ve yeme bozukluğu öyküsü bulunanlar kalori kısıtlamasına hekim ve diyetisyen önerisi olmadan başlamamalıdır.',
    ] },
  ],
  faq: [
    ['1 kilo vermek için kaç kalori açığı gerekir?', 'Yaygın kabule göre 1 kg vücut yağı yaklaşık 7700 kcal\'dir. Günde 500 kcal açıkla bu miktara yaklaşık 15–16 günde, 1000 kcal açıkla yaklaşık 8 günde ulaşılır.'],
    ['Kalori açığı nasıl hesaplanır?', 'Günlük kalori ihtiyacınızdan aldığınız kalori çıkarılır. İhtiyacınız 2500 kcal, aldığınız 2000 kcal ise açığınız 500 kcal\'dir.'],
    ['Günde 500 kalori açıkla ayda kaç kilo verilir?', '30 günde toplam açık 15.000 kcal olur; bu da yaklaşık 1,9 kg yağa karşılık gelir. İlk haftalarda su kaybı nedeniyle tartıda daha fazla düşüş görülebilir.'],
    ['Açığı büyütürsem daha hızlı kilo verir miyim?', 'Kısa vadede evet, ancak çok büyük açıklar açlığı, yorgunluğu ve kas kaybını artırır, sürdürülmesi zorlaşır. Haftada yarım ile bir kilogram arası kayıp çoğu kişi için daha güvenli ve kalıcıdır.'],
    ['Açıkta olduğum hâlde neden kilo vermiyorum?', 'En sık nedenler alınan kalorinin eksik hesaplanması, kalori ihtiyacının olduğundan yüksek tahmin edilmesi ve su tutulmasının tartıyı maskelemesidir. İki üç hafta boyunca yediklerinizi tartarak kaydetmek ve haftalık ortalamaya bakmak durumu netleştirir.'],
    ['Kilo verdikçe hesabı yenilemeli miyim?', 'Evet. Vücut ağırlığı azaldıkça günlük kalori ihtiyacı da düşer. Her 3–5 kilogramda bir ihtiyacınızı yeniden hesaplayıp güncel değerlerle süreyi tekrar bulmanız önerilir.'],
    ['Egzersizle yaktığım kaloriyi açığa ekleyebilir miyim?', 'Günlük kalori ihtiyacınızı hesaplarken hareket düzeyinizi zaten dahil ettiyseniz egzersizi ikinci kez eklemeyin. Dahil etmediyseniz egzersizde harcanan kalori açığı büyütür; ancak cihazların gösterdiği değerler çoğu zaman olduğundan yüksektir.'],
    ['Girdiğim kilo ve kalori bilgileri saklanıyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; bilgileriniz sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kalori-hesapla', 'bazal-metabolizma-hesapla', 'hedef-kilo-tarihi-hesapla', 'kilo-alma-kalori-hesapla', 'ideal-kilo-hesapla', 'makro-besin-hesapla'],
};
