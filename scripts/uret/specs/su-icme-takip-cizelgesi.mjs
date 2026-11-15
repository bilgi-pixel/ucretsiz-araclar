export default {
  slug: 'su-icme-takip-cizelgesi',
  title: 'Su İçme Takip Çizelgesi Oluşturma',
  h1Tail: 'aylık yazdırılabilir PDF',
  pageTitle: 'Su İçme Takip Çizelgesi Oluştur – Aylık Su Takip Tablosu PDF',
  description: 'Her gün için boyanacak bardak daireleri içeren aylık su içme takip çizelgesini PDF olarak oluşturun. Bardak sayısını ve hacmini siz belirleyin; günler hazır yazılır.',
  card: 'Günleri hazır yazılmış, her bardak için bir daire boyanan aylık su içme takip çizelgesini A4 ya da A5 PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['su içme takip çizelgesi', 'su takip tablosu', 'günlük su takibi', 'su içme çizelgesi pdf', 'yazdırılabilir su takip çizelgesi', 'bardak takip tablosu', 'aylık su içme takibi'],
  lead: 'Gün içinde kaç bardak su içtiğinizi işaretleyebileceğiniz aylık bir <strong>su içme takip çizelgesi</strong> oluşturun. Ayın her günü bir satırdır; satırda kendi belirlediğiniz sayıda bardak dairesi, günlük toplam için bir kutu ve hedefe ulaşıldığını gösteren bir onay kutusu bulunur.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç ayı (bir gün seçin)', type: 'date', hint: 'Seçtiğiniz günün ayı ilk sayfa olur. Boş bırakırsanız içinde bulunduğunuz ay alınır.' },
    { id: 'ay', label: 'Ay sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Her ay bir sayfadır.' },
    { id: 'bardak', label: 'Günlük bardak sayısı (kendi hedefiniz)', type: 'select', options: [['8', '8 bardak'], ['6', '6 bardak'], ['10', '10 bardak'], ['12', '12 bardak']] },
    { id: 'hacim', label: 'Bardak hacmi (ml)', type: 'number', value: '200', hint: '50 ile 1000 ml arasında. Su bardağı yaklaşık 200 ml, küçük pet şişe 500 ml\'dir.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Su Takibim', hint: 'En fazla 36 karakter.' },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç ayı');
    const n = h.posint(v.ay, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const bardak = ['6', '8', '10', '12'].includes(v.bardak) ? Number(v.bardak) : 8;
    const hacim = h.pos(v.hacim, 'Bardak hacmi');
    if (hacim < 50 || hacim > 1000) h.err('Bardak hacmi 50 ile 1000 ml arasında olmalı. Litre değil mililitre yazın (1 litre = 1000 ml).');
    const baslik = (v.baslik || '').trim() || 'Su İçme Takip Çizelgesi';
    if (baslik.length > 36) h.err('Sayfa başlığı en fazla 36 karakter olabilir.');
    const litre = bardak * hacim / 1000;
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const y0yil = ilk.getUTCFullYear(), ay0 = ilk.getUTCMonth();
    const aylar = [];
    for (let i = 0; i < n; i++) {
      const b = new Date(Date.UTC(y0yil, ay0 + i, 1));
      aylar.push({ b, gun: new Date(Date.UTC(y0yil, ay0 + i + 1, 0)).getUTCDate(), ad: `${h.ayAdi(b.getUTCMonth() + 1)} ${b.getUTCFullYear()}` });
    }
    const sayfalar = aylar.map(({ b, gun, ad }) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(17), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(12), { hiza: 'sag', ton: 0.3, kalin: true }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      ops.push(['yazi', `Bardak: ${h.fmt(hacim, 0)} ml  ·  Günlük hedef: ${bardak} bardak (${h.fmt(litre, 2)} L)`, m, m + 15.5 * k, F(8.5), { ton: 0.3 }]);
      ops.push(['yazi', 'İçtiğiniz her bardak için bir daire boyayın.', W - m, m + 15.5 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const y0 = m + 19 * k, bh = 7 * k, altH = 14 * k, rh = (H - m - altH - y0 - bh) / 31;
      const cG = 26 * k, cT = 22 * k, cH = 14 * k, cB = iw - cG - cT - cH, slot = cB / bardak, r = Math.min(rh * 0.36, slot * 0.4);
      const th = bh + gun * rh;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, y0 + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Bardaklar', m + cG + cB / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Toplam', m + cG + cB + cT / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Hedef', m + iw - cH / 2, y0 + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7;
        if (hg === 0 || hg === 6) ops.push(['kutu', m, ry, iw, rh, { dolgu: 0.94, cizgi: 0.94, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      for (const x of [m + cG, m + cG + cB, m + cG + cB + cT]) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7, cy = ry + rh / 2;
        if (d > 1) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(d), m + 9 * k, cy + 1.1 * k, F(8.5), { kalin: true, hiza: 'sag' }]);
        ops.push(['yazi', KISA[hg], m + 12 * k, cy + 1.1 * k, F(7.5), { ton: 0.4 }]);
        for (let j = 0; j < bardak; j++) ops.push(['daire', m + cG + (j + 0.5) * slot, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
        const s = Math.min(3.8 * k, rh * 0.6);
        ops.push(['kutu', m + iw - cH / 2 - s / 2, cy - s / 2, s, s, { cizgi: 0.4 }]);
      }
      // Ay özeti
      const fy = H - m - 3 * k;
      ops.push(['yazi', `Hedefe ulaşılan gün: ______ / ${gun}`, m, fy, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Ay ortalaması: ______ bardak / gün', W - m, fy, F(8.5), { hiza: 'sag', kalin: true }]);
      return ops;
    });
    const toplam = aylar.reduce((a, x) => a + x.gun, 0), son = aylar[n - 1];
    return {
      rows: [
        ['Günlük hedef', `${bardak} bardak × ${h.fmt(hacim, 0)} ml = ${h.fmt(litre, 2)} L`],
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${aylar[0].ad} (${aylar[0].gun} gün)`],
        ['Son ay', `${son.ad} (${son.gun} gün)`],
        ['Toplam gün', `${toplam} gün`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: (litre > 4 ? 'Seçtiğiniz günlük miktar yüksek; hedefinizi hekiminize danışarak belirlemeniz yerinde olur. ' : '') + 'Bu çizelge kayıt tutmak içindir, tıbbi tavsiye değildir; günlük su ihtiyacı kişiden kişiye değişir.',
      pdf: { ad: 'su-icme-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', ay: '1' }, out: { 'Günlük hedef': '8 bardak × 200 ml = 1,6 L', 'Sayfa sayısı': '1 sayfa', 'İlk ay': 'Kasım 2026 (30 gün)', 'Toplam gün': '30 gün', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', ay: '1', bardak: '8', hacim: '250', boyut: 'a5' }, out: { 'Günlük hedef': '8 bardak × 250 ml = 2 L', 'İlk ay': 'Şubat 2028 (29 gün)', 'Toplam gün': '29 gün', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', ay: '3', bardak: '10', hacim: '330' }, out: { 'Günlük hedef': '10 bardak × 330 ml = 3,3 L', 'Son ay': 'Ocak 2027 (31 gün)', 'Toplam gün': '92 gün' }, pdfSayfa: 3 },
    { in: { baslangic: '2027-01-01', ay: '12', bardak: '6', hacim: '200' }, out: { 'Günlük hedef': '6 bardak × 200 ml = 1,2 L', 'İlk ay': 'Ocak 2027 (31 gün)', 'Son ay': 'Aralık 2027 (31 gün)', 'Toplam gün': '365 gün' }, pdfSayfa: 12 },
    { in: { baslangic: '2027-02-10', ay: '1', bardak: '12', hacim: '150', boyut: 'a5', baslik: 'Su Takibim' }, out: { 'Günlük hedef': '12 bardak × 150 ml = 1,8 L', 'İlk ay': 'Şubat 2027 (28 gün)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', ay: '13' }, error: true },
    { in: { baslangic: '2026-11-18', ay: '1', hacim: '2' }, error: true },
    { in: { baslangic: '2026-11-18', ay: '1', hacim: '' }, error: true },
    { in: { baslangic: '2026-11-18', ay: '0' }, error: true },
  ],
  howto: [
    'Takibe başlamak istediğiniz aydan herhangi bir günü seçin. Çizelge o ayın 1\'inden son gününe kadar bütün günleri içerir; alan boşsa içinde bulunduğunuz ay alınır.',
    'Kaç aylık çizelge istediğinizi yazın. Her ay ayrı bir sayfadır.',
    'Kendi günlük hedefinize göre bardak sayısını seçin ve kullandığınız bardağın ya da şişenin hacmini mililitre olarak yazın. Araç günlük toplamı litre olarak hesaplayıp sayfanın başına yazar.',
    'Kâğıt boyutunu ve isterseniz başlığı belirleyip "Çizelgeyi oluştur" düğmesine basın; önizlemeyi kontrol ettikten sonra "PDF indir" ile kaydedin.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Her sayfa bir takvim ayıdır. Başlığın sağında ay ve yıl, hemen altında seçtiğiniz bardak hacmi ile günlük hedefin litre karşılığı yazar. Tablonun her satırı bir gündür: en solda günün sayısı ve kısaltılmış gün adı (Pzt, Sal, Çar…) hazır basılıdır. Ortadaki geniş sütunda seçtiğiniz sayıda boş daire sıralanır; içtiğiniz her bardak için birini boyarsınız.',
      'Dairelerin sağında iki küçük sütun daha vardır. <strong>Toplam</strong> sütununa gün sonunda boyadığınız daire sayısını ya da litre karşılığını yazarsınız; hedefin üstüne çıktığınız günlerde fazladan içtiklerinizi de buraya not edebilirsiniz. <strong>Hedef</strong> sütunundaki kutu, o gün bütün daireler dolduysa işaretlenir. Cumartesi ve pazar satırları açık gri zeminle basılır; böylece haftalar sayfada kendiliğinden ayrışır. En altta ay sonunda dolduracağınız iki alan bulunur: hedefe ulaşılan gün sayısı ve günlük ortalama bardak.',
    ] },
    { h: 'Günlük toplam nasıl hesaplanır?', p: [
      'Hesap basittir: <strong>günlük toplam = bardak sayısı × bardak hacmi</strong>. Sonuç mililitre çıkar; 1000\'e bölününce litre elde edilir. Örneğin 8 bardak ve 200 ml seçtiğinizde 8 × 200 = 1600 ml, yani 1,6 litre eder. Aynı sekiz daireyi 250 ml\'lik bir bardak için kullanırsanız toplam 2 litre olur. 330 ml\'lik on bardak 3,3 litre, 150 ml\'lik çay bardağıyla on iki bardak ise 1,8 litre eder.',
      'Bu yüzden hacmi doğru yazmak önemlidir. Evdeki bardağınızın hacmini bilmiyorsanız bir ölçü kabıyla ya da mutfak terazisiyle bir kez ölçmeniz yeterlidir; 1 gram su yaklaşık 1 mililitredir. Gün boyu matara ya da şişe kullanıyorsanız bardak hacmi yerine şişenin hacmini yazıp her daireyi bir şişe sayabilirsiniz.',
    ] },
    { h: 'Hızlı başvuru: yaygın kap hacimleri', ul: [
      'Çay bardağı (ince belli): yaklaşık 100–120 ml',
      'Su bardağı: yaklaşık 200 ml',
      'Büyük bardak ya da kupa: yaklaşık 250–330 ml',
      'Küçük pet şişe: çoğunlukla 500 ml',
      'Matara ve spor şişeleri: çoğunlukla 500–1000 ml; üzerindeki ölçüye bakın',
    ], p: [
      'Bu değerler yaklaşıktır; kap üreticisine göre değişir. Kesin olmak istiyorsanız kendi kabınızı ölçün.',
    ] },
    { h: 'Ne kadar su içmeliyim?', p: [
      'Bu araç bir miktar önermez; hedefi siz belirlersiniz. Günlük sıvı ihtiyacı yaşa, vücut ağırlığına, hava sıcaklığına, hareket düzeyine, beslenmeye ve sağlık durumuna göre kişiden kişiye değişir. Yemeklerdeki su, çorba, meyve, çay ve diğer içecekler de toplam sıvı alımına katkıda bulunur; yani ihtiyacın tamamının bardakla içilen sudan gelmesi gerekmez.',
      'Çizelgenin amacı belirli bir sayıya ulaşmak için kendinizi zorlamak değil, gün içinde su içmeyi unutup unutmadığınızı görmektir. Susamadan zorla ve kısa sürede çok fazla su içmek de sağlıklı değildir. Araç, seçtiğiniz günlük miktar 4 litreyi aştığında sonuç altında bir hatırlatma gösterir.',
    ] },
    { h: 'Sağlık uyarısı', p: [
      'Bu çizelge bir kayıt aracıdır; <strong>tıbbi tavsiye değildir</strong> ve herhangi bir sağlık sonucu vaat etmez. Böbrek, kalp ya da karaciğer rahatsızlığı olanlar, sıvı kısıtlaması önerilenler, idrar söktürücü ilaç kullananlar, hamileler ve emzirenler günlük sıvı miktarını hekimlerinin önerisine göre belirlemelidir. Aşırı susama, çok sık idrara çıkma ya da tersine idrarın belirgin biçimde azalması gibi durumlar bir çizelgeyle değil hekim muayenesiyle değerlendirilir.',
    ] },
    { h: 'Kullanım ve yazdırma önerileri', ul: [
      '<strong>Görünür bir yere asın.</strong> Buzdolabı kapağı, su sebilinin yanı ya da çalışma masası; çizelge, kalemle birlikte suyun yakınında durduğunda doldurulur.',
      '<strong>Anında işaretleyin.</strong> Gün sonunda hatırlamaya çalışmak yerine bardağı bitirince daireyi boyayın.',
      '<strong>Çocuklarla kullanın.</strong> Daireleri renkli kalemle boyamak çocuklar için oyuna dönüşebilir; bardak hacmini çocuğun bardağına göre yazın.',
      '<strong>Yazdırma:</strong> kâğıt yönü dikey, ölçek %100 olmalı. A5 sayfada daireler küçülür; 12 bardak seçecekseniz A4 daha rahattır.',
    ] },
    { h: 'Sınırlar', p: [
      'Bir dosyada en fazla 12 ay bulunur. Bardak sayısı 6, 8, 10 ya da 12 olabilir; bardak hacmi 50–1000 ml aralığında kabul edilir. Sayfa her zaman ayın 1\'inden başlar; ay ortasında başlıyorsanız önceki günleri boş bırakmanız yeterlidir. Çizelge elle doldurulur; girdiğiniz değerleri kaydetmez ya da hatırlatma göndermez.',
    ] },
  ],
  faq: [
    ['Su içme takip çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir ve kayıt gerektirmez; PDF dosyasını dilediğiniz kadar yazdırabilirsiniz.'],
    ['Kaç bardak seçmeliyim?', 'Araç bir sayı önermez. Kendi alışkanlığınıza ve varsa hekiminizin önerisine göre bir hedef belirleyin; emin değilseniz birkaç gün ne kadar içtiğinizi sayıp o sayıdan başlayabilirsiniz.'],
    ['Bardak yerine şişe ya da matara kullanıyorum, nasıl ayarlarım?', 'Bardak hacmi alanına şişenizin hacmini yazın (örneğin 500 ml) ve bardak sayısını günde bitirmeyi düşündüğünüz şişe sayısına en yakın seçenekle belirleyin. Her daire bir şişeyi gösterir; kullanmadığınız daireleri boş bırakırsınız.'],
    ['Çay, kahve ya da ayran da sayılır mı?', 'Bu sizin kararınızdır. Yalnızca suyu saymak en sade yöntemdir. Diğer içecekleri de saymak isterseniz farklı renkte kalemle boyayarak ayırt edebilirsiniz.'],
    ['Hedefin üstünde içtiğim bardakları nereye yazarım?', 'Daireler dolduktan sonraki bardakları "Toplam" sütununa sayı olarak yazabilirsiniz; örneğin sekiz daire doluyken "10" yazmak iki bardak fazla içtiğinizi gösterir.'],
    ['Şubat ayı ve artık yıllar doğru hesaplanıyor mu?', 'Evet. Her ayın gün sayısı takvime göre belirlenir; Şubat 2027 için 28, artık yıl olan 2028 için 29 satır basılır. Gün adları da tarihe göre kendiliğinden yazılır.'],
    ['Bu çizelge sağlık önerisi yerine geçer mi?', 'Hayır. Çizelge yalnızca alışkanlığınızı görmenizi sağlar. Sıvı alımınızla ilgili bir sağlık sorununuz ya da kısıtlamanız varsa miktarı hekiminizle belirleyin.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. PDF tarayıcınızda oluşturulur; seçtiğiniz tarih, bardak sayısı ve başlık sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['aliskanlik-takip-cizelgesi', 'egzersiz-takip-cizelgesi', 'uyku-takip-cizelgesi', 'ruh-hali-takip-cizelgesi', 'aylik-planlayici'],
};
