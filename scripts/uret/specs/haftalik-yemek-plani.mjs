export default {
  slug: 'haftalik-yemek-plani',
  title: 'Haftalık Yemek Planı Oluşturma',
  h1Tail: 'yazdırılabilir PDF menü çizelgesi',
  pageTitle: 'Haftalık Yemek Planı Oluştur – Yazdırılabilir Menü Çizelgesi PDF',
  description: 'Tarihleri yazılı haftalık yemek planı çizelgesini PDF olarak oluşturun. Öğün sütunlarını seçin, alışveriş notu alanı ekleyin; A4 ya da A5, 1–8 hafta.',
  card: 'Günleri ve öğünleri hazır yazılmış haftalık yemek planı çizelgesini, alışveriş notu alanıyla birlikte PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['haftalık yemek planı', 'yemek planı şablonu', 'haftalık menü çizelgesi', 'yemek listesi pdf', 'haftalık menü planlama', 'yazdırılabilir yemek planı', 'boş yemek çizelgesi', 'akşam yemeği planı'],
  lead: 'Pazartesiden pazara her günün öğünlerini tek sayfada gösteren bir <strong>haftalık yemek planı</strong> çizelgesi oluşturun. Hangi öğünleri planlayacağınızı seçin; tarihler satır başlarına kendiliğinden yazılır, isterseniz sayfanın sağına alışveriş notları için ayrı bir alan eklenir.',
  button: 'Yemek planını oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bu hafta kullanılır. Plan, seçtiğiniz günün haftasının pazartesisinden başlar.' },
    { id: 'hafta', label: 'Hafta sayısı', type: 'number', value: '1', hint: '1 ile 8 arasında. Her hafta bir sayfadır.' },
    { id: 'ogun', label: 'Öğün sütunları', type: 'select', options: [['3', 'Kahvaltı, öğle, akşam'], ['4', 'Kahvaltı, öğle, akşam, ara öğün'], ['2', 'Öğle ve akşam'], ['1', 'Yalnızca akşam yemeği']] },
    { id: 'alisveris', label: 'Alışveriş notları alanı', type: 'select', options: [['var', 'Sayfanın sağında olsun'], ['yok', 'Olmasın']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Bizim Evin Menüsü', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 8) h.err('Hafta sayısı en fazla 8 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Haftalık Yemek Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const OGUN = { 1: ['Akşam yemeği'], 2: ['Öğle', 'Akşam'], 3: ['Kahvaltı', 'Öğle', 'Akşam'], 4: ['Kahvaltı', 'Öğle', 'Akşam', 'Ara öğün'] }[v.ogun] || ['Kahvaltı', 'Öğle', 'Akşam'];
    const liste = v.alisveris !== 'yok';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), s = h.gunEkle(b, 6), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(s)}`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, alt = H - m, bh = 8 * k;
      const lw = liste ? 58 * k : 0, bosluk = liste ? 4 * k : 0;
      const tw = W - 2 * m - lw - bosluk, gw = 30 * k, ow = (tw - gw) / OGUN.length, rh = (alt - ust - bh) / 7;
      // Sütun başlıkları
      ops.push(['kutu', m, ust, gw, bh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, ust + 5.6 * k, 9 * k, { kalin: true }]);
      OGUN.forEach((ad, j) => {
        const x = m + gw + j * ow;
        ops.push(['kutu', x, ust, ow, bh, { dolgu: 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + ow / 2, ust + 5.6 * k, 9 * k, { kalin: true, hiza: 'orta' }]);
      });
      // Gün satırları
      for (let g = 0; g < 7; g++) {
        const y = ust + bh + g * rh, d = h.gunEkle(b, g);
        ops.push(['kutu', m, y, gw, rh, { dolgu: g >= 5 ? 0.9 : 0.96, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], m + 2 * k, y + 6.5 * k, 9.5 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)}`, m + 2 * k, y + 11.5 * k, 7.5 * k, { ton: 0.35 }]);
        for (let j = 0; j < OGUN.length; j++) {
          const x = m + gw + j * ow;
          ops.push(['kutu', x, y, ow, rh, { cizgi: 0.5 }]);
          ops.push(['cizgi', x + 2 * k, y + rh / 2, x + ow - 2 * k, y + rh / 2, { kalinlik: 0.2, ton: 0.82, kesik: true }]);
        }
      }
      // Alışveriş notları
      if (liste) {
        const x = W - m - lw;
        ops.push(['kutu', x, ust, lw, bh, { dolgu: 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', 'Alışveriş notları', x + 2 * k, ust + 5.6 * k, 9 * k, { kalin: true }]);
        ops.push(['kutu', x, ust + bh, lw, alt - ust - bh, { cizgi: 0.5 }]);
        const adim = a5 ? 6.2 : 7.5, kare = a5 ? 2.8 : 3.4;
        for (let y = ust + bh + adim; y < alt - 1.5; y += adim) {
          ops.push(['kutu', x + 2, y - kare - 0.3, kare, kare, { cizgi: 0.45 }]);
          ops.push(['cizgi', x + 3.5 + kare, y, x + lw - 2, y, { kalinlik: 0.2, ton: 0.78 }]);
        }
      }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Öğün sütunları', OGUN.join(', ')],
        ['Planlanacak öğün', `${n * 7 * OGUN.length} öğün`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'haftalik-yemek-plani', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '22.11.2026 Pazar', 'Öğün sütunları': 'Kahvaltı, Öğle, Akşam', 'Planlanacak öğün': '21 öğün' }, pdfSayfa: 1 },
    { in: { baslangic: '2027-01-01', hafta: '4', ogun: '4', boyut: 'a5' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Son gün': '24.01.2027 Pazar', 'Planlanacak öğün': '112 öğün', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 4 },
    { in: { baslangic: '2028-02-29', hafta: '2', ogun: '1', alisveris: 'yok' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028', 'Son gün': '12.03.2028 Pazar', 'Öğün sütunları': 'Akşam yemeği', 'Planlanacak öğün': '14 öğün' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-16', hafta: '8', ogun: '2' }, out: { 'Sayfa sayısı': '8 sayfa', 'Son gün': '10.01.2027 Pazar', 'Planlanacak öğün': '112 öğün' }, pdfSayfa: 8 },
    { in: { baslangic: '2026-11-22', hafta: '1', baslik: 'Bizim Evin Menüsü', boyut: 'a5', alisveris: 'yok' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', hafta: '9' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1,5' }, error: true },
    { in: { baslangic: '31.02.2027', hafta: '1' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından planlamak istediğiniz haftanın herhangi bir gününü seçin. Alanı boş bırakırsanız içinde bulunduğunuz hafta alınır; çizelge her zaman pazartesi ile başlar.',
    '"Hafta sayısı" alanına kaç haftalık çizelge istediğinizi yazın. Aylık alışveriş yapanlar 4 yazıp bir ayın menüsünü tek dosyada alabilir.',
    '"Öğün sütunları" seçeneğiyle hangi öğünleri planlayacağınıza karar verin. Yalnızca akşam yemeğini planlıyorsanız tek sütunlu düzen her güne geniş bir yazma alanı bırakır.',
    'Alışveriş notları alanını ve kâğıt boyutunu seçin, isterseniz sayfaya kendi başlığınızı yazın.',
    '"Yemek planını oluştur" düğmesine basın; önizlemeyi kontrol edip "PDF indir" ile dosyayı kaydedin ve yatay yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Çizelgede neler var?', p: [
      'Her sayfa bir haftaya aittir. Üst şeritte sayfa başlığı ile haftanın ilk ve son günü yazar. Altındaki tabloda yedi satır bulunur; her satırın başında gün adı ve "18 Kasım" biçiminde tarih hazır basılıdır. Cumartesi ve pazar satırlarının gün hücresi biraz daha koyu tondadır, böylece misafir ağırlanan ya da dışarıda yenen hafta sonu günleri hemen ayırt edilir.',
      'Satırların karşısında seçtiğiniz öğünler için sütunlar yer alır: kahvaltı, öğle, akşam ve isterseniz ara öğün. Her hücrenin ortasında ince, kesikli bir kılavuz çizgi vardır. Üst yarıya ana yemeği, alt yarıya yanına yapılacak çorba, salata ya da tatlıyı yazabilirsiniz; tek satır yazmak isterseniz çizgiyi yok sayın.',
      'Alışveriş notları alanını açık bıraktığınızda sayfanın sağında onay kutulu satırlardan oluşan dar bir sütun oluşur. Menüyü yazarken evde eksik olduğunu fark ettiğiniz malzemeleri buraya not edersiniz; markete giderken sayfayı katlayıp yanınıza almanız ya da telefonla fotoğrafını çekmeniz yeterlidir.',
    ] },
    { h: 'Yemek planı yapmanın yararları', p: [
      'Evde en sık sorulan sorulardan biri "Bu akşam ne pişireceğiz?" sorusudur ve çoğu zaman en yorgun olunan saatte sorulur. Haftanın menüsünü bir kez oturup yazmak, bu kararı yedi kez vermek yerine bir kez vermek demektir. Akşam eve geldiğinizde ne pişeceği bellidir; gerekiyorsa et bir gece önceden buzluktan çıkarılmış, bakliyat ıslatılmıştır.',
      'Planın ikinci yararı alışveriştedir. Ne pişireceğini bilen kişi markete listeyle gider, ihtiyacı olanı alır ve dolapta unutulup bozulan sebze miktarı azalır. Kıymanın yarısıyla pazartesi köfte, kalanıyla çarşamba dolma yapmak gibi eşleştirmeler de ancak hafta bir arada görülünce akla gelir. Ayrıca aynı yemeğin üst üste gelmesi ya da bir haftada hiç baklagil pişmemesi gibi dengesizlikler kâğıt üzerinde kolayca fark edilir.',
    ] },
    { h: 'Çözümlü örnek: 18 Kasım 2026 haftası', p: [
      'Başlangıç tarihi olarak 18 Kasım 2026 çarşamba gününü seçtiğinizi, hafta sayısını 1, öğün sütunlarını "Kahvaltı, öğle, akşam" bıraktığınızı düşünelim. Araç o haftanın pazartesisini, yani 16 Kasım 2026 tarihini bulur ve çizelgeyi 16.11.2026 – 22.11.2026 aralığı için hazırlar. Yedi gün ve üç öğünle sayfada toplam 21 öğün hücresi oluşur; sonuç tablosundaki "Planlanacak öğün" satırı bu sayıyı gösterir.',
      'Dört haftalık, dört öğünlü bir plan isterseniz hücre sayısı 4 × 7 × 4 = 112 olur ve dosya dört sayfadan oluşur. Yıl geçişlerinde de hesap aynıdır: 1 Ocak 2027 cuma gününü seçerseniz ilk sayfa 28 Aralık 2026 pazartesi ile başlar.',
    ] },
    { h: 'Doldururken işinize yarayacak öneriler', ul: [
      '<strong>Önce takvime bakın.</strong> Misafir gelecek, geç çıkılacak ya da dışarıda yenecek günleri işaretleyin; o günlere uzun süren yemek yazmayın.',
      '<strong>Dolaptakilerden başlayın.</strong> Elinizde bekleyen sebzeyi, açılmış salçayı ya da buzluktaki eti haftanın ilk günlerine yerleştirin.',
      '<strong>Bir günü artan yemeklere ayırın.</strong> Haftada bir "dolapta ne varsa" akşamı hem israfı azaltır hem de planın esnemesine yer açar.',
      '<strong>Zahmetli ve hızlı yemekleri dengeli dağıtın.</strong> Sarma, mantı gibi emek isteyen yemekleri hafta sonuna, makarna ve menemen gibi hızlı seçenekleri yoğun günlere koyun.',
      '<strong>Kurşun kalem kullanın.</strong> Plan bir sözleşme değildir; iki günün yemeğini yer değiştirmek çoğu zaman en pratik çözümdür.',
      '<strong>Eski sayfaları saklayın.</strong> Birkaç ay sonra elinizde ailenizin sevdiği yemeklerden oluşan hazır menüler birikir; fikir bulamadığınız hafta eskilerden birini yeniden kullanabilirsiniz.',
    ] },
    { h: 'Yazdırma, asma ve saklama', p: [
      'PDF vektörel çizgilerden oluştuğu için hem A4 hem A5 boyutta net basılır. Yazdırma penceresinde yönü <strong>yatay</strong>, ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A5 çıktıyı A4 yazıcıda almak için "sayfa başına 2 sayfa" seçeneğini kullanıp kâğıdı ortadan kesebilirsiniz.',
      'Çizelge en çok göz önünde durduğunda işe yarar. Mıknatısla buzdolabı kapağına tutturmak ya da mutfak panosuna asmak, evdeki herkesin akşam yemeğini sormadan öğrenmesini sağlar. Sayfayı şeffaf dosyaya koyup üzerine silinebilir kalemle yazarsanız aynı çıktıyı haftalarca kullanabilirsiniz; bu durumda tarihsiz bir görünüm isteyenler tarih satırını dikkate almayabilir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç boş bir planlama çizelgesi üretir; yemek önermez, kalori ya da besin değeri hesaplamaz. Bir seferde en fazla 8 hafta oluşturulur ve hafta her zaman pazartesi başlar. Özel bir beslenme düzeni, alerji ya da sağlık sorunu söz konusuysa menünün içeriği için diyetisyen ya da hekim görüşü alınmalıdır; bu sayfa yalnızca planı yazacağınız kâğıdı hazırlar.',
    ] },
  ],
  faq: [
    ['Haftalık yemek planı çizelgesi ücretsiz mi?', 'Evet. Çizelgeyi dilediğiniz kadar oluşturup indirebilirsiniz; kayıt, ücret ya da indirme sınırı yoktur. Çıktıyı evde, yurtta, kreşte ya da iş yeri mutfağında serbestçe kullanabilirsiniz.'],
    ['Yalnızca akşam yemeklerini planlayabilir miyim?', 'Evet. "Öğün sütunları" seçeneğinden "Yalnızca akşam yemeği"ni seçtiğinizde tablo tek sütuna iner ve her gün için geniş bir yazma alanı kalır. Öğle ve akşam için iki sütunlu düzen de vardır.'],
    ['Tarihler doğru güne denk geliyor mu?', 'Tarihler takvime göre hesaplanır ve çizelge seçtiğiniz günün haftasının pazartesisinden başlar. Örneğin 18 Kasım 2026 çarşambayı seçtiğinizde ilk satır 16 Kasım pazartesi, son satır 22 Kasım pazar olur.'],
    ['Alışveriş notları alanını kaldırırsam ne değişir?', 'Sağdaki sütun kalkar ve öğün hücreleri sayfanın tüm genişliğine yayılır. Alışveriş listesini ayrı bir kâğıda yazıyorsanız ya da dört öğün sütunu kullanıyorsanız bu düzen daha ferah olur.'],
    ['Aylık yemek planı çıkarabilir miyim?', 'Hafta sayısına 4 ya da 5 yazarsanız bir ayı kapsayan çizelgeleri tek PDF dosyasında alırsınız. Her hafta ayrı sayfada olduğu için buzdolabına yalnızca o haftanın sayfasını asabilirsiniz.'],
    ['Çizelgeye yemek adlarını bilgisayarda yazabilir miyim?', 'Hayır, dosya doldurulabilir form değildir; yazdırıp kalemle doldurmak üzere tasarlanmıştır. Bilgisayarda yazmak isterseniz PDF dosyasını metin eklemeye izin veren bir düzenleyicide açabilirsiniz.'],
    ['A5 boyutta yazı alanı yeterli olur mu?', 'A5 sayfada hücreler A4\'e göre yaklaşık üçte bir oranında küçülür. Üç öğüne kadar rahat yazılır; dört öğün ve alışveriş alanı birlikte seçildiğinde hücreler daralır, bu durumda A4 önerilir.'],
    ['Seçtiğim tarih ya da başlık kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde üretilir; yazdığınız başlık ve seçtiğiniz tarihler hiçbir sunucuya gönderilmez, saklanmaz. Sayfa bir kez açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['alisveris-listesi-olustur', 'haftalik-planlayici', 'butce-planlayici', 'ev-temizlik-cizelgesi', 'yapilacaklar-listesi-olustur'],
};
