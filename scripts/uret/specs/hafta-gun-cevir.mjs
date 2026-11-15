export default {
  slug: 'hafta-gun-cevir',
  title: 'Hafta Gün Çevirici',
  h1Tail: 'hafta ↔ gün',
  pageTitle: 'Hafta Gün Çevirici – Haftayı Güne, Günü Haftaya Çevirme Hesaplama',
  description: 'Haftayı güne, günü haftaya çevirin. 1 hafta = 7 gün eşitliğiyle çalışır; "14 hafta 2 gün" gösterimini, saat ve yaklaşık ay karşılığını da hesaplar.',
  card: 'Haftayı güne, günü haftaya çevirin; hafta-gün ayrımı, saat ve yaklaşık ay karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['hafta gün çevirme', '1 hafta kaç gün', 'gün kaç hafta', '40 hafta kaç gün', '100 gün kaç hafta', 'haftayı güne çevirme', 'kaç hafta kaç gün'],
  lead: 'Hafta cinsinden bir süreyi güne ya da gün sayısını haftaya çevirin. Araç <strong>1 hafta = 7 gün</strong> eşitliğini kullanır ve 100 gün gibi bir değeri "14 hafta 2 gün" olarak da ayırır. Gebelik haftası, kurs süresi, proje takvimi ve teslim tarihleri gibi hafta ile sayılan sürelerde işinizi kolaylaştırır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Süre', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['gun', 'Gün → Hafta'], ['hafta', 'Hafta → Gün']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const gun = v.yon === 'hafta' ? x * 7 : x;
    const hafta = gun / 7;
    const g = Math.round(gun * 1000) / 1000;
    const tamHafta = Math.floor(g / 7);
    const kalan = g - tamHafta * 7;
    const rHafta = ['Hafta', h.fmt(hafta, 6) + ' hafta'];
    const rGun = ['Gün', h.fmt(gun, 4) + ' gün'];
    return {
      rows: [
        ...(v.yon === 'hafta' ? [rGun, rHafta] : [rHafta, rGun]),
        ['Hafta ve gün', `${h.fmt(tamHafta, 0)} hafta ${h.fmt(kalan, 3)} gün`],
        ['Saat', h.fmt(gun * 24, 2) + ' saat'],
        ['Ay (ortalama 30,4375 gün)', h.fmt(gun / 30.4375, 2) + ' ay'],
      ],
      note: '1 hafta = 7 gün = 168 saat. Ay karşılığı, 365,25 günlük ortalama yılın on ikide biri üzerinden yaklaşık olarak verilir.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'gun' }, out: { 'Hafta': '14,285714 hafta', 'Hafta ve gün': '14 hafta 2 gün', 'Saat': '2.400 saat' } },
    { in: { deger: '40', yon: 'hafta' }, out: { 'Gün': '280 gün', 'Saat': '6.720 saat', 'Ay (ortalama 30,4375 gün)': '9,2 ay' } },
    { in: { deger: '365', yon: 'gun' }, out: { 'Hafta': '52,142857 hafta', 'Hafta ve gün': '52 hafta 1 gün' } },
    { in: { deger: '52', yon: 'hafta' }, out: { 'Gün': '364 gün' } },
    { in: { deger: '1', yon: 'hafta' }, out: { 'Gün': '7 gün', 'Saat': '168 saat' } },
    { in: { deger: '10', yon: 'gun' }, out: { 'Hafta': '1,428571 hafta', 'Hafta ve gün': '1 hafta 3 gün' } },
    { in: { deger: '2,5', yon: 'hafta' }, out: { 'Gün': '17,5 gün', 'Hafta ve gün': '2 hafta 3,5 gün' } },
    { in: { deger: '14', yon: 'gun' }, out: { 'Hafta': '2 hafta', 'Hafta ve gün': '2 hafta 0 gün' } },
    { in: { deger: 'iki hafta', yon: 'hafta' }, error: true },
    { in: { deger: '-7', yon: 'gun' }, error: true },
  ],
  howto: [
    '"Süre" alanına gün ya da hafta sayısını yazın. Yarım hafta gibi değerler için 2,5 biçiminde ondalık kullanabilirsiniz.',
    '"Çeviri yönü" listesinden Gün → Hafta ya da Hafta → Gün seçin.',
    '"Çevir" düğmesine basın. İlk satır çevirinin sonucudur; "Hafta ve gün" satırı tam haftaları ve artan günleri ayrı ayrı gösterir.',
    'Süreyi daha geniş bir ölçekte görmek için "Ay" satırına, daha ince görmek için "Saat" satırına bakın.',
  ],
  sections: [
    { h: 'Hafta ve gün çevirme formülü', p: [
      'Bir hafta yedi gündür. Haftadan güne geçmek için hafta sayısını 7 ile çarparsınız: <strong>gün = hafta × 7</strong>. Günden haftaya geçmek için gün sayısını 7\'ye bölersiniz: <strong>hafta = gün ÷ 7</strong>. Bölümün tam kısmı hafta sayısını, kalan ise artan günleri verir.',
      'Çözümlü örnek: 100 gün kaç haftadır? 100 ÷ 7 = 14,285714 hafta. Tam kısım 14 haftadır ve 14 × 7 = 98 gün tutar; kalan 100 − 98 = 2 gündür. Sonuç 14 hafta 2 gündür ve saat olarak 100 × 24 = 2.400 saate eşittir. Ters yönde: 40 hafta, 40 × 7 = 280 gündür; bu da 6.720 saat ve ortalama ay uzunluğuyla yaklaşık 9,2 aydır.',
    ] },
    { h: 'Ondalık hafta nasıl okunur?', p: [
      'Yediye bölme çoğu zaman devirli ondalık verir, bu yüzden sonuçları yorumlarken dikkat gerekir. 1,5 hafta 1 hafta 5 gün değil, 1 hafta 3,5 gündür; çünkü yarım hafta üç buçuk gündür. Ondalık kısmı güne çevirmek için 7 ile çarpılır: 0,142857 hafta 1 gün, 0,285714 hafta 2 gün, 0,428571 hafta 3 gün, 0,571429 hafta 4 gün, 0,714286 hafta 5 gün, 0,857143 hafta 6 gündür.',
      'Günlük konuşmada "14 hafta 2 gün" gibi ayrık ifade tercih edilir; hesap tablolarında ve planlama yazılımlarında ise ondalık hafta daha kullanışlıdır. Araç her iki gösterimi birlikte sunar.',
    ] },
    { h: 'Sık kullanılan karşılıklar', ul: [
      '<strong>1 hafta</strong> = 7 gün',
      '<strong>2 hafta</strong> = 14 gün',
      '<strong>4 hafta</strong> = 28 gün',
      '<strong>6 hafta</strong> = 42 gün',
      '<strong>8 hafta</strong> = 56 gün',
      '<strong>12 hafta</strong> = 84 gün',
      '<strong>26 hafta</strong> = 182 gün',
      '<strong>40 hafta</strong> = 280 gün',
      '<strong>52 hafta</strong> = 364 gün',
      '<strong>30 gün</strong> = 4 hafta 2 gün',
      '<strong>90 gün</strong> = 12 hafta 6 gün',
      '<strong>180 gün</strong> = 25 hafta 5 gün',
    ] },
    { h: 'Bir ay dört hafta mıdır? Bir yıl 52 hafta mıdır?', p: [
      'Gündelik dilde "bir ay dört hafta" denir, ancak dört hafta yalnızca 28 gündür. Şubat dışındaki aylar 30 ya da 31 gün çektiği için bir ay ortalama 4 hafta ve iki üç gün kadardır. Ortalama ay uzunluğu 30,4375 gün alındığında bir ay yaklaşık 4,35 haftaya karşılık gelir. Bu yüzden "12 haftalık program" üç tam ay değil, üç aydan yaklaşık bir hafta kısa bir süredir.',
      'Benzer biçimde 52 hafta 364 gündür; bir yıl ise 365, artık yıllarda 366 gün sürer. Yani bir yıl 52 hafta ve 1 ya da 2 gündür. Bu artan gün, aynı tarihin her yıl haftanın bir sonraki gününe kaymasının nedenidir. Haftalık ödeme, haftalık kira ya da haftalık üretim hedefi gibi hesapları yıllığa çevirirken bu küçük farkı göz önünde bulundurun.',
    ] },
    { h: 'Kullanım örnekleri', p: [
      'Gebelik takibi haftalarla yapılır ve süre genellikle son âdet tarihinden itibaren yaklaşık 40 hafta, yani 280 gün olarak anılır. "23 hafta 4 gün" gibi ifadeleri toplam güne çevirmek için haftayı 7 ile çarpıp günleri eklemek yeterlidir: 23 × 7 + 4 = 165 gün. Bu bilgi genel bir aritmetik bilgidir; gebelik haftası ve tahmini doğum tarihi için hekiminizin değerlendirmesi esastır.',
      'Eğitimde dönemler ve kurslar haftayla planlanır: 14 haftalık bir dönem 98 gündür. Yazılım ekiplerinde iki haftalık çalışma döngüleri 14 takvim günü, hafta sonları çıkarıldığında 10 iş günü eder. Spor programları 6, 8 ya da 12 haftalık bloklarla hazırlanır. Siparişlerde "teslim süresi 3 ila 5 hafta" denildiğinde 21 ila 35 gün beklemeniz gerektiğini anlarsınız. İhbar süresi gibi iş hayatındaki bazı süreler de hafta olarak ifade edilir; bu sürelerin uzunluğu ve nasıl sayılacağı için güncel mevzuatı kontrol edin.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç haftayı yedi takvim günü olarak sayar; beş günlük iş haftasını ya da tatilleri hesaba katmaz. Negatif değer kabul edilmez. Hafta değeri en fazla altı ondalık basamakla gösterilir. Ay karşılığı kesin bir takvim hesabı değil, ortalama ay uzunluğuna dayanan yaklaşık bir değerdir; belirli bir tarihe hafta ya da gün eklemek istiyorsanız tarih ekleme aracını, bir tarihin yılın kaçıncı haftasına denk geldiğini öğrenmek istiyorsanız hafta numarası aracını kullanın.',
    ] },
  ],
  faq: [
    ['1 hafta kaç gündür?', '1 hafta 7 gündür; saat olarak 168 saate eşittir.'],
    ['40 hafta kaç gün eder?', '40 × 7 = 280 gündür. Bu süre yaklaşık 9,2 ortalama aya karşılık gelir.'],
    ['100 gün kaç hafta eder?', '100 gün 14,285714 haftadır; ayrık olarak 14 hafta 2 gün diye söylenir.'],
    ['1 yıl kaç haftadır?', '365 günlük bir yıl 52 hafta 1 gün, 366 günlük artık yıl 52 hafta 2 gündür. Ondalık olarak sırasıyla 52,142857 ve 52,285714 hafta eder.'],
    ['1 ay kaç haftadır?', 'Aylar 28 ile 31 gün arasında değiştiği için kesin tek bir yanıt yoktur. 30 günlük ay 4 hafta 2 gün, 31 günlük ay 4 hafta 3 gündür; ortalama olarak bir ay yaklaşık 4,35 haftadır.'],
    ['Hafta ve günü birlikte güne nasıl çeviririm?', 'Hafta sayısını 7 ile çarpıp artan günleri ekleyin. Örneğin 12 hafta 3 gün, 12 × 7 + 3 = 87 gündür. Sonucu denetlemek için 87 günü araca yazıp Gün → Hafta yönünü seçebilirsiniz.'],
    ['İş günü olarak hafta kaç gündür?', 'Hafta sonu çalışılmayan düzende bir hafta 5 iş günüdür; cumartesi çalışılan işyerlerinde 6 gün sayılır. Bu araç takvim haftasını, yani 7 günü esas alır.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değer sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['gun-saat-cevir', 'ay-gun-cevir', 'yil-gun-cevir', 'hafta-numarasi', 'tarih-ekle-cikar', 'gebelik-hesapla'],
};
