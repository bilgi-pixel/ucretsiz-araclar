export default {
  slug: 'aylik-planlayici',
  title: 'Aylık Planlayıcı Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Aylık Planlayıcı Oluştur – Yazdırılabilir Aylık Plan PDF',
  description: 'Günleri hazır yerleştirilmiş, geniş kutulu aylık planlayıcıyı PDF olarak oluşturun. A4 ya da A5 yatay, bir ile on iki ay; hedefler ve notlar sütunuyla.',
  card: 'Günleri yerine oturmuş, geniş kutulu aylık planlayıcıyı PDF olarak oluşturun; yanında hedefler ve notlar sütunu.',
  category: 'planlama',
  pdf: true,
  keywords: ['aylık planlayıcı', 'aylık plan şablonu', 'aylık planlayıcı pdf', 'yazdırılabilir aylık takvim', 'boş aylık plan', 'aylık ajanda', 'aylık program çizelgesi', 'duvar planlayıcı'],
  lead: 'Bir ayın tüm günlerini geniş kutular halinde tek sayfada gösteren <strong>aylık planlayıcı</strong> oluşturun. Hangi aydan başlayacağını ve kaç ay istediğinizi seçin; gün numaraları doğru haftanın gününe yerleştirilir, her ay ayrı bir sayfa olarak tek PDF dosyasında hazırlanır.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'ay', label: 'Başlangıç ayı', type: 'date', hint: 'O ayın herhangi bir gününü seçin. Boş bırakırsanız içinde bulunduğunuz ay kullanılır.' },
    { id: 'aySayisi', label: 'Ay sayısı', type: 'number', value: '3', hint: '1 ile 12 arasında. Her ay bir sayfadır.' },
    { id: 'haftaBasi', label: 'Hafta başlangıcı', type: 'select', options: [['pazartesi', 'Pazartesi'], ['pazar', 'Pazar']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Ek başlık (isteğe bağlı)', type: 'text', placeholder: 'Örn. Aile Takvimi', hint: 'Ay adının karşısına yazılır. En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    if (y0 < 1900 || y0 > 2200) h.err('Başlangıç ayı 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const ek = (v.baslik || '').trim();
    if (ek.length > 40) h.err('Ek başlık en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const f = (p) => Math.max(5, p * k);
    const pazarBasi = v.haftaBasi === 'pazar';
    const GUN = pazarBasi
      ? ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
      : ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const bilgi = (i) => {
      const t = new Date(Date.UTC(y0, m0 + i, 1));
      const y = t.getUTCFullYear(), mo = t.getUTCMonth();
      const gunSay = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
      const kayma = pazarBasi ? t.getUTCDay() : (t.getUTCDay() + 6) % 7; // 1. günden önceki boş kutu sayısı
      return { t, y, mo, gunSay, kayma, sat: Math.ceil((kayma + gunSay) / 7) };
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = bilgi(i), ops = [];
      ops.push(['yazi', `${h.ayAdi(b.mo + 1)} ${b.y}`, m, m + 7.5 * k, f(20), { kalin: true }]);
      if (ek) ops.push(['yazi', ek, W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, alt = H - m, yanW = 46 * k, bosluk = 4 * k;
      const gw = (W - 2 * m - yanW - bosluk) / 7, bh = 7 * k, ch = (alt - ust - bh) / b.sat;
      // Gün adı şeridi
      for (let g = 0; g < 7; g++) {
        const hs = GUN[g] === 'Cumartesi' || GUN[g] === 'Pazar';
        ops.push(['kutu', m + g * gw, ust, gw, bh, { dolgu: hs ? 0.84 : 0.91, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], m + (g + 0.5) * gw, ust + 5 * k, f(8.5), { kalin: true, hiza: 'orta' }]);
      }
      // Gün kutuları
      for (let r = 0; r < b.sat; r++) for (let g = 0; g < 7; g++) {
        const gunNo = r * 7 + g - b.kayma + 1, x = m + g * gw, y = ust + bh + r * ch;
        const hs = GUN[g] === 'Cumartesi' || GUN[g] === 'Pazar';
        if (gunNo < 1 || gunNo > b.gunSay) { ops.push(['kutu', x, y, gw, ch, { dolgu: 0.95, cizgi: 0.5 }]); continue; }
        ops.push(['kutu', x, y, gw, ch, hs ? { dolgu: 0.97, cizgi: 0.5 } : { cizgi: 0.5 }]);
        ops.push(['yazi', String(gunNo), x + 1.8 * k, y + 5.6 * k, f(11), { kalin: true, ton: hs ? 0.35 : 0.1 }]);
      }
      // Yan sütun: hedefler ve notlar
      const yx = W - m - yanW, hedefYuk = 7 * k + 4 * 8 * k + 3 * k;
      ops.push(['kutu', yx, ust, yanW, hedefYuk, { cizgi: 0.5 }]);
      ops.push(['kutu', yx, ust, yanW, bh, { dolgu: 0.91, cizgi: 0.5 }]);
      ops.push(['yazi', 'Bu ayın hedefleri', yx + 2 * k, ust + 5 * k, f(8.5), { kalin: true }]);
      for (let j = 0; j < 4; j++) {
        const yy = ust + bh + (j + 1) * 8 * k;
        ops.push(['kutu', yx + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', yx + 8 * k, yy, yx + yanW - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      const ny = ust + hedefYuk + bosluk;
      ops.push(['kutu', yx, ny, yanW, alt - ny, { cizgi: 0.5 }]);
      ops.push(['kutu', yx, ny, yanW, bh, { dolgu: 0.91, cizgi: 0.5 }]);
      ops.push(['yazi', 'Notlar', yx + 2 * k, ny + 5 * k, f(8.5), { kalin: true }]);
      for (let yy = ny + bh + 8 * k; yy < alt - 1.5 * k; yy += 8 * k) ops.push(['cizgi', yx + 2.5 * k, yy, yx + yanW - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      sayfalar.push(ops);
    }
    const b0 = bilgi(0), bs = bilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${h.ayAdi(b0.mo + 1)} ${b0.y}`],
        ['Son ay', `${h.ayAdi(bs.mo + 1)} ${bs.y}`],
        ['İlk ayın 1. günü', h.gunAdi(b0.t)],
        ['İlk ayda gün sayısı', `${b0.gunSay} gün`],
        ['İlk ayda hafta satırı', `${b0.sat} satır`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'aylik-planlayici', baslik: ek || 'Aylık Plan', boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { ay: '2026-11-18', aySayisi: '3' }, out: { 'Sayfa sayısı': '3 sayfa', 'İlk ay': 'Kasım 2026', 'Son ay': 'Ocak 2027', 'İlk ayın 1. günü': 'Pazar', 'İlk ayda gün sayısı': '30 gün', 'İlk ayda hafta satırı': '6 satır' }, pdfSayfa: 3 },
    { in: { ay: '2027-01-01', aySayisi: '1', boyut: 'a5' }, out: { 'İlk ay': 'Ocak 2027', 'İlk ayın 1. günü': 'Cuma', 'İlk ayda hafta satırı': '5 satır', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { ay: '2026-11-18', aySayisi: '1', haftaBasi: 'pazar' }, out: { 'İlk ayda hafta satırı': '5 satır' }, pdfSayfa: 1 },
    { in: { ay: '2027-02-10', aySayisi: '1' }, out: { 'İlk ayın 1. günü': 'Pazartesi', 'İlk ayda gün sayısı': '28 gün', 'İlk ayda hafta satırı': '4 satır' }, pdfSayfa: 1 },
    { in: { ay: '2028-02-29', aySayisi: '12', baslik: 'Aile Takvimi' }, out: { 'İlk ayın 1. günü': 'Salı', 'İlk ayda gün sayısı': '29 gün', 'İlk ayda hafta satırı': '5 satır', 'Son ay': 'Ocak 2029' }, pdfSayfa: 12 },
    { in: { ay: '2026-12-31', aySayisi: '2', boyut: 'a5', haftaBasi: 'pazar' }, out: { 'İlk ay': 'Aralık 2026', 'Son ay': 'Ocak 2027', 'İlk ayın 1. günü': 'Salı' }, pdfSayfa: 2 },
    { in: { ay: '2026-11-18', aySayisi: '13' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '0' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '2', baslik: 'Bu ek başlık kırk karakterden çok daha uzun bir başlıktır' }, error: true },
  ],
  howto: [
    '"Başlangıç ayı" alanından ilk sayfanın göstereceği ayın herhangi bir gününü seçin. Ayın kaçıncı gününü seçtiğiniz önemli değildir; sayfa her zaman ayın birinden başlar.',
    '"Ay sayısı" alanına kaç aylık planlayıcı istediğinizi yazın. Bir okul dönemi için 4 ya da 5, tam yıl için 12 yazabilirsiniz.',
    'Haftanın pazartesi mi pazar mı ile başlayacağını ve kâğıt boyutunu seçin. İsterseniz ay adının karşısına yazılacak bir ek başlık girin.',
    '"Planlayıcıyı oluştur" düğmesine basın, önizlemeyi kontrol edin ve "PDF indir" ile dosyayı kaydedip yatay yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfa düzeni', p: [
      'Her sayfanın sol üstünde ay adı ve yıl büyük harflerle yazılır; ek başlık girdiyseniz sağ üstte gri tonla görünür. Sayfanın büyük bölümünü yedi sütunlu gün tablosu kaplar. En üstteki şeritte gün adları tam olarak yazılır, cumartesi ve pazar sütunları biraz daha koyu tonla ayrılır. Altındaki her kutunun sol üst köşesinde gün numarası bulunur, kutunun geri kalanı yazmanız için boş bırakılmıştır.',
      'Ayın birinden önceki ve son gününden sonraki kutular açık gri dolguyla basılır ve numara taşımaz; böylece ayın hangi gün başlayıp bittiği ilk bakışta anlaşılır. Sayfanın sağ kenarında dar bir sütun vardır: üstte dört onay kutulu <strong>Bu ayın hedefleri</strong>, altında çizgili <strong>Notlar</strong> alanı.',
    ] },
    { h: 'Ay kaç satır tutar?', p: [
      'Bir ayın tabloda kaç hafta satırı kaplayacağı, ayın hangi gün başladığına ve kaç gün çektiğine bağlıdır. Araç yalnızca gereken kadar satır çizer ve kutuları sayfa yüksekliğine yayar; dört satırlık bir ayda kutular daha yüksek, altı satırlık bir ayda daha basık olur.',
      'Örnek: Kasım 2026 pazar günü başlar ve 30 gün çeker. Hafta pazartesiden başlatıldığında ayın birinden önce altı boş kutu kalır; 6 + 30 = 36 kutu, yedişerli satırlara bölününce altı satır eder. Aynı ay, hafta pazardan başlatılırsa hiç boş kutu bırakmaz ve beş satıra sığar. Şubat 2027 ise pazartesi başlar ve 28 gün çeker; tam dört satırlık, boş kutusu olmayan nadir aylardan biridir. Ocak 2027 cuma günü başlar; dört boş kutu ile 31 gün toplam 35 kutu, yani beş satır tutar.',
    ] },
    { h: 'Aylık planlayıcıya ne yazılır?', ul: [
      '<strong>Tarihi kesin olan işler:</strong> sınavlar, teslim günleri, fatura ve kira son ödeme günleri, randevular, toplantılar.',
      '<strong>Birden çok güne yayılan dönemler:</strong> izin, seyahat, staj, kampanya haftası. Kutuların üstünden yatay bir çizgi çekip üzerine adını yazmak yeterlidir.',
      '<strong>Tekrarlayan düzenler:</strong> nöbet ve vardiya günleri, spor ya da kurs günleri, çöp toplama ve temizlik sırası gibi ev düzeni.',
      '<strong>Aile ve ekip takvimi:</strong> herkesin görebileceği bir yere asılan sayfaya her kişi kendi renginde kalemle yazarsa, kimin ne zaman nerede olduğu tek bakışta okunur.',
      '<strong>Ay hedefleri:</strong> sağdaki dört satır, o ay sonunda tamamlanmış olmasını istediğiniz az sayıda somut sonuç içindir.',
    ] },
    { h: 'İyi kullanım için öneriler', p: [
      'Aylık görünüm ayrıntı için değil, genel resim içindir. Bir kutuya en fazla üç dört kısa satır sığar; bu yüzden işin ayrıntısını değil adını yazın. Ayrıntılı gün planı gerekiyorsa aynı günü haftalık ya da günlük sayfada açabilirsiniz.',
      'Ayın ilk günü on dakika ayırıp önce sabit tarihleri, sonra hedefleri yazmak işe yarar. Kesinleşmemiş işleri kurşun kalemle yazarsanız tarih değiştiğinde sayfa karalanmaz. Ay bittiğinde sayfayı atmayın; geçmiş ayların sayfaları, bir işin ne zaman yapıldığını ararken küçük bir arşiv görevi görür.',
      'Birkaç aylık dosyayı duvar takvimi gibi kullanmak isterseniz sayfaları üst kenarından delip bir ipe ya da iki halkaya geçirebilirsiniz; her ay sonunda sayfayı arkaya çevirirsiniz.',
    ] },
    { h: 'Yazdırma ayarları', p: [
      'Yazdırma penceresinde kâğıt yönünü <strong>yatay</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. A4 çıktıda gün kutuları yaklaşık üç santimetre genişliğindedir ve elle rahatça yazılır. A5 boyutu ajanda arasına ya da çantaya koymak için uygundur; kutular küçüldüğünden ince uçlu kalem önerilir.',
      'Yazıcınız A3 destekliyorsa A4 dosyayı yazdırma penceresinden A3 kâğıda büyüterek duvara asılacak büyüklükte bir planlayıcı da elde edebilirsiniz; çizimler vektörel olduğu için büyütmede bozulma olmaz.',
    ] },
    { h: 'Sınırlar', p: [
      'Bir seferde en fazla 12 ay üretilir. Resmî tatiller, dinî günler ve okul tatilleri sayfaya işlenmez; bu tarihler yıldan yıla ve duyurulara göre değişebildiği için elle işaretlemeniz daha güvenlidir. Ek başlık 40 karakterle sınırlıdır. Dosya, bilgisayarda doldurulan bir form değil, yazdırıp kalemle doldurulacak bir sayfadır.',
    ] },
  ],
  faq: [
    ['Aylık planlayıcıyı ücretsiz indirebilir miyim?', 'Evet. Araç ücretsizdir ve kayıt gerektirmez. Dilediğiniz ay ve yıl için, dilediğiniz kadar dosya oluşturup yazdırabilirsiniz.'],
    ['Günler doğru haftanın gününe mi yerleşiyor?', 'Evet. Araç seçtiğiniz ayın birinin haftanın hangi gününe denk geldiğini hesaplar ve numaraları buna göre yerleştirir. Artık yıllarda şubat ayı 29 gün olarak çizilir.'],
    ['Haftayı pazardan başlatabilir miyim?', 'Evet. "Hafta başlangıcı" seçeneğini "Pazar" yaparsanız ilk sütun pazar olur. Varsayılan seçenek, ülkemizde yaygın kullanılan pazartesi başlangıcıdır.'],
    ['Bir yıllık aylık planlayıcı oluşturabilir miyim?', 'Evet. Başlangıç ayı olarak ocak ayından bir gün seçip ay sayısına 12 yazın. On iki sayfalık tek bir PDF dosyası oluşur.'],
    ['Bu araç ile yıllık planlayıcı arasındaki fark nedir?', 'Aylık planlayıcı her aya tam bir sayfa ayırır ve her güne yazı yazacak kadar yer bırakır. Yıllık planlayıcı ise on iki ayı tek sayfada gösterir; genel bakış için uygundur ama günlere ayrıntı yazmaya elverişli değildir.'],
    ['Resmî tatiller neden gösterilmiyor?', 'Bazı tatillerin tarihi her yıl değişir, bazıları ise idari kararla uzatılabilir. Yanlış bilgi basmamak için sayfada tatil işareti yoktur; kendi takviminizden bakarak ilgili kutuları işaretleyebilirsiniz.'],
    ['Kutular yazmak için yeterince büyük mü?', 'A4 yatay sayfada her gün kutusu yaklaşık 32 mm genişliğindedir; yüksekliği ayın kaç satır tuttuğuna göre yaklaşık 28 ile 42 mm arasında değişir. Üç dört kısa satır rahatça sığar. A5 sayfada ölçüler bunun yaklaşık yüzde yetmişidir.'],
    ['Seçtiğim tarih ya da başlık kaydediliyor mu?', 'Hayır. Dosya tarayıcınızda, kendi cihazınızda üretilir. Girdiğiniz hiçbir bilgi sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['haftalik-planlayici', 'yillik-planlayici', 'gunluk-planlayici', 'takvim-olustur', 'ozel-gunler-takvimi'],
};
