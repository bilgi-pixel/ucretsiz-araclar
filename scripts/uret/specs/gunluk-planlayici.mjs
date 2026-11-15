export default {
  slug: 'gunluk-planlayici',
  title: 'Günlük Planlayıcı Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Günlük Planlayıcı Oluştur – Yazdırılabilir Günlük Plan PDF',
  description: 'Tarihi hazır yazılmış günlük planlayıcı sayfalarını PDF olarak oluşturun. Öncelikler, yapılacaklar, randevular ve notlar için ayrı alanlar; A4 ya da A5.',
  card: 'Her güne bir sayfa: öncelikler, yapılacaklar, randevular ve notlar. Tarihleri yazılı günlük planlayıcıyı PDF olarak indirin.',
  category: 'planlama',
  pdf: true,
  keywords: ['günlük planlayıcı', 'günlük plan şablonu', 'günlük planlayıcı pdf', 'yazdırılabilir günlük plan', 'günlük ajanda sayfası', 'boş günlük plan', 'günlük program çizelgesi'],
  lead: 'Her güne tek sayfa ayıran, tarihi ve gün adı hazır yazılmış bir <strong>günlük planlayıcı</strong> oluşturun. Başlangıç gününü ve kaç günlük sayfa istediğinizi seçin; öncelikler, yapılacaklar, randevular ve notlar için bölümlenmiş sayfalar tek PDF dosyasında hazırlanır.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bugünden başlar.' },
    { id: 'gun', label: 'Gün sayısı', type: 'number', value: '7', hint: '1 ile 31 arasında. Her gün bir sayfadır.' },
    { id: 'haftasonu', label: 'Hafta sonları', type: 'select', options: [['dahil', 'Cumartesi ve pazar dahil'], ['atla', 'Hafta sonlarını atla']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Günlük Plan', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    if (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200) h.err('Başlangıç tarihi 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.gun, 'Gün sayısı');
    if (n > 31) h.err('Gün sayısı en fazla 31 olabilir; daha uzun dönem için aracı yeni bir başlangıç tarihiyle tekrar çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Günlük Plan';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const atla = v.haftasonu === 'atla';
    // Sayfası basılacak günlerin listesi
    const gunler = [];
    let d = ilk;
    while (gunler.length < n) {
      const g = d.getUTCDay();
      if (!(atla && (g === 0 || g === 6))) gunler.push(d);
      d = h.gunEkle(d, 1);
    }
    // Başlıklı kutu çizer; ilk yazı satırının y değerini döndürür
    const bolum = (ops, x, y, w, yuk, ad) => {
      ops.push(['kutu', x, y, w, yuk, { cizgi: 0.5 }]);
      ops.push(['kutu', x, y, w, 7 * k, { dolgu: 0.92, cizgi: 0.5 }]);
      ops.push(['yazi', ad, x + 2 * k, y + 5 * k, f(8.5), { kalin: true }]);
      return y + 7 * k;
    };
    const sayfalar = gunler.map((t) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', `${t.getUTCDate()} ${h.ayAdi(t.getUTCMonth() + 1)} ${t.getUTCFullYear()}`, W - m, m + 4 * k, f(11), { hiza: 'sag', kalin: true }]);
      ops.push(['yazi', h.gunAdi(t), W - m, m + 9 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 12 * k, W - m, m + 12 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 16 * k, bosluk = 4 * k, altYuk = 44 * k;
      const altY = H - m - altYuk, ustYuk = altY - bosluk - ust;
      const tw = W - 2 * m, lw = tw * 0.56, rw = tw - lw - bosluk, rx = m + lw + bosluk;
      const sat = 8 * k;
      // Sol üst: üç öncelik
      const onYuk = 7 * k + 3 * sat + 3 * k;
      let y = bolum(ops, m, ust, lw, onYuk, 'Günün üç önceliği');
      for (let i = 0; i < 3; i++) {
        const yy = y + (i + 1) * sat;
        ops.push(['yazi', `${i + 1}.`, m + 2.5 * k, yy - 1 * k, f(10), { kalin: true, ton: 0.3 }]);
        ops.push(['cizgi', m + 8 * k, yy, m + lw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      // Sol alt: yapılacaklar
      const yapY = ust + onYuk + bosluk, yapYuk = ustYuk - onYuk - bosluk;
      y = bolum(ops, m, yapY, lw, yapYuk, 'Yapılacaklar');
      for (let yy = y + sat; yy < yapY + yapYuk - 1.5 * k; yy += sat) {
        ops.push(['kutu', m + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', m + 8 * k, yy, m + lw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      // Sağ: randevular (saat sütunu boş, kullanıcı doldurur)
      y = bolum(ops, rx, ust, rw, ustYuk, 'Randevular ve saatli işler');
      ops.push(['cizgi', rx + 13 * k, y, rx + 13 * k, ust + ustYuk, { kalinlik: 0.2, ton: 0.7 }]);
      ops.push(['yazi', 'Saat', rx + 2 * k, y + 4.5 * k, f(6.5), { ton: 0.45 }]);
      for (let yy = y + sat; yy < ust + ustYuk - 3 * k; yy += sat) ops.push(['cizgi', rx, yy, rx + rw, yy, { kalinlik: 0.2, ton: 0.75 }]);
      // Alt: notlar ve yarına devredenler
      const nw = tw * 0.6, dw = tw - nw - bosluk, dx = m + nw + bosluk;
      y = bolum(ops, m, altY, nw, altYuk, 'Notlar');
      for (let yy = y + sat; yy < altY + altYuk - 1.5 * k; yy += sat) ops.push(['cizgi', m + 2.5 * k, yy, m + nw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      y = bolum(ops, dx, altY, dw, altYuk, 'Yarına devreden');
      for (let yy = y + sat; yy < altY + altYuk - 1.5 * k; yy += sat) ops.push(['cizgi', dx + 2.5 * k, yy, dx + dw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      return ops;
    });
    const bas = gunler[0], son = gunler[gunler.length - 1];
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk gün', `${h.fmtDate(bas)} ${h.gunAdi(bas)}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Hafta sonları', atla ? 'Atlandı' : 'Dahil'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'gunluk-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', gun: '7' }, out: { 'Sayfa sayısı': '7 sayfa', 'İlk gün': '18.11.2026 Çarşamba', 'Son gün': '24.11.2026 Salı' }, pdfSayfa: 7 },
    { in: { baslangic: '2026-11-18', gun: '5', haftasonu: 'atla' }, out: { 'Sayfa sayısı': '5 sayfa', 'Son gün': '24.11.2026 Salı', 'Hafta sonları': 'Atlandı' }, pdfSayfa: 5 },
    { in: { baslangic: '2026-11-21', gun: '1', haftasonu: 'atla', boyut: 'a5' }, out: { 'İlk gün': '23.11.2026 Pazartesi', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2027-01-01', gun: '31' }, out: { 'İlk gün': '01.01.2027 Cuma', 'Son gün': '31.01.2027 Pazar' }, pdfSayfa: 31 },
    { in: { baslangic: '2028-02-28', gun: '3', baslik: 'Bugünün Planı' }, out: { 'Son gün': '01.03.2028 Çarşamba' }, pdfSayfa: 3 },
    { in: { baslangic: '2026-11-16', gun: '5', boyut: 'a5' }, out: { 'İlk gün': '16.11.2026 Pazartesi', 'Son gün': '20.11.2026 Cuma' }, pdfSayfa: 5 },
    { in: { baslangic: '2026-11-18', gun: '32' }, error: true },
    { in: { baslangic: '2026-11-18', gun: '0' }, error: true },
    { in: { baslangic: '2026-11-18', gun: '2', baslik: 'Bu başlık kırk karakterden çok daha uzun bir başlıktır' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından ilk sayfanın ait olacağı günü seçin. Alanı boş bırakırsanız bugünün tarihi kullanılır.',
    '"Gün sayısı" alanına kaç günlük sayfa istediğinizi yazın. Bir hafta için 7, yalnızca iş günleri için 5, bir ayın tamamı için 30 ya da 31 yazabilirsiniz.',
    'Cumartesi ve pazar için sayfa istemiyorsanız "Hafta sonlarını atla" seçeneğini işaretleyin. Bu durumda yazdığınız gün sayısı kadar iş günü sayfası üretilir.',
    'Kâğıt boyutunu seçin, isterseniz sayfanın sol üst köşesine yazılacak başlığı değiştirin.',
    '"Planlayıcıyı oluştur" düğmesine basın. İlk sayfanın önizlemesini kontrol edip "PDF indir" ile dosyayı kaydedin ve dikey yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfada hangi bölümler var?', p: [
      'Her sayfa tek bir güne aittir. Sol üst köşede sayfa başlığı, sağ üst köşede "18 Kasım 2026" biçiminde tarih ve hemen altında gün adı hazır yazılıdır. Başlık çizgisinin altında sayfa beş bölüme ayrılır ve her bölümün gri bir başlık şeridi vardır.',
      'Sol üstteki <strong>Günün üç önceliği</strong> kutusunda bir, iki, üç diye numaralanmış üç satır bulunur. Bunun altındaki <strong>Yapılacaklar</strong> kutusu sayfanın en geniş alanıdır; her satırın başında işi bitirince işaretleyeceğiniz küçük bir onay kutusu durur. Sağdaki <strong>Randevular ve saatli işler</strong> sütununda dar bir saat hanesi ile yanında açıklama alanı vardır; saatleri önceden basmadığımız için sabah altıda başlayan da gece çalışan da aynı sayfayı kullanabilir. Sayfanın altında yan yana iki kutu yer alır: <strong>Notlar</strong> ve <strong>Yarına devreden</strong>.',
    ] },
    { h: 'Bölümler nasıl doldurulur?', ol: [
      '<strong>Önce öncelikleri yazın.</strong> Günün sonunda yalnızca üç iş bitmiş olsa hangilerini seçerdiniz? Onları numaralı satırlara yazın. Üçten fazla satır bilerek konmamıştır.',
      '<strong>Saatli işleri sağ sütuna geçirin.</strong> Toplantı, ders, doktor randevusu, servis saati gibi saati belli olan her şeyi saat hanesiyle birlikte yazın. Böylece günün ne kadarının zaten dolu olduğunu görürsünüz.',
      '<strong>Kalan işleri yapılacaklar listesine dökün.</strong> Her satıra tek bir iş yazın ve işi, bir oturuşta bitirilebilecek büyüklükte tutun. "Raporu bitir" yerine "raporun giriş bölümünü yaz" gibi.',
      '<strong>Gün içinde aklınıza gelenleri notlara yazın.</strong> Telefon numarası, bir fikir, birinin sizden istediği küçük bir şey; hepsi buraya gider ve asıl listenizi dağıtmaz.',
      '<strong>Akşam beş dakika ayırın.</strong> Bitenleri işaretleyin, bitmeyenlerden hâlâ geçerli olanları "Yarına devreden" kutusuna taşıyın. Ertesi sabah yeni sayfayı doldururken ilk bakacağınız yer burasıdır.',
    ] },
    { h: 'Günlük sayfa kimler için uygun?', p: [
      'Günlük plan, günleri birbirine benzemeyen ve gün içinde çok sayıda küçük iş yürüten kişiler için haftalık görünümden daha rahattır. Serbest çalışanlar, esnaf, öğretmenler, sınava hazırlanan öğrenciler ve evden çalışanlar bir günü tek sayfada görmeyi tercih eder; çünkü haftalık sayfadaki dar sütunlar ayrıntı yazmaya yetmez.',
      'Sınav haftası, taşınma, bir etkinliğin son hazırlık günleri ya da yoğun bir proje teslimi gibi kısa ve sıkışık dönemlerde yalnızca o günler için birkaç sayfa bastırmak da yaygın bir kullanımdır. Bunun için gün sayısını 3 ya da 5 gibi küçük bir değere ayarlamanız yeterlidir.',
      'Haftanın genel dengesini görmek istiyorsanız günlük sayfaları haftalık bir planla birlikte kullanabilirsiniz: hafta başında büyük işleri haftalık sayfaya dağıtır, her sabah o günün satırını günlük sayfaya açarsınız.',
    ] },
    { h: 'Gün sayısı ve hafta sonu seçeneği nasıl çalışır?', p: [
      'Hafta sonları dahilken sayfalar başlangıç gününden itibaren art arda gelir. Örneğin 18 Kasım 2026 çarşamba gününden başlayan 7 günlük set, 24 Kasım 2026 salı günüyle biter.',
      '"Hafta sonlarını atla" seçildiğinde cumartesi ve pazar günleri için sayfa üretilmez, ama yazdığınız gün sayısı yine tam olarak karşılanır. Aynı başlangıç tarihiyle 5 gün isterseniz çarşamba, perşembe, cuma, ardından pazartesi ve salı sayfaları basılır; son sayfa yine 24 Kasım 2026 salı olur. Başlangıç tarihi hafta sonuna denk gelirse ilk sayfa izleyen pazartesiye kayar: 21 Kasım 2026 cumartesi seçildiğinde ilk sayfa 23 Kasım pazartesidir.',
      'Ay ve yıl geçişleri kendiliğinden hesaplanır; artık yıllarda 29 Şubat sayfası da yerinde çıkar.',
    ] },
    { h: 'Yazdırma, delme ve ciltleme', p: [
      'Dosya çizgi ve yazıdan oluşan vektörel bir PDF olduğu için her yazıcıda net basılır ve mürekkebi az kullanır. Yazdırma penceresinde yönü <strong>dikey</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. "Sayfaya sığdır" seçeneği sayfayı küçültüp satır aralıklarını daraltabilir.',
      'A4 çıktıları sol kenarından iki ya da dört delikle delip klasöre takabilirsiniz; sol kenar boşluğu delgeç için yeterlidir. A5 seçtiyseniz doğrudan A5 kâğıda basabilir ya da yazıcının "sayfa başına 2 sayfa" seçeneğiyle iki günü tek A4 kâğıda bastırıp ortadan kesebilirsiniz. Çift taraflı baskıda "uzun kenardan çevir" seçeneği, sayfaları kitap gibi çevirmenizi sağlar.',
      'Aynı günü birden çok kişi kullanacaksa, örneğin bir ofisteki herkes için, PDF dosyasını yazdırma penceresindeki kopya sayısıyla çoğaltmanız yeterlidir.',
    ] },
    { h: 'Sınırlar', p: [
      'Bir seferde en fazla 31 sayfa üretilir. Daha uzun bir dönem için başlangıç tarihini bir önceki dosyanın bittiği günün ertesine alıp aracı yeniden çalıştırabilirsiniz. Resmî tatiller ve özel günler sayfaya işlenmez. Sayfa başlığı 40 karakterle sınırlıdır. Dosya doldurulabilir bir form değildir; yazdırılıp kalemle doldurulmak üzere tasarlanmıştır, ancak dilerseniz tablet üzerinde PDF not uygulamasıyla da üzerine yazabilirsiniz.',
    ] },
  ],
  faq: [
    ['Günlük planlayıcı ücretsiz mi?', 'Evet. Araç ücretsizdir, üyelik istemez ve oluşturabileceğiniz dosya sayısında bir sınır yoktur. PDF dosyasını kişisel, okul ya da iş amacıyla dilediğiniz kadar yazdırabilirsiniz.'],
    ['Tarihleri elle mi yazmam gerekiyor?', 'Hayır. Seçtiğiniz başlangıç gününe göre her sayfanın sağ üst köşesine tarih ve gün adı kendiliğinden yazılır. Siz yalnızca planınızı doldurursunuz.'],
    ['Randevu sütununda saatler neden hazır yazılı değil?', 'Herkesin günü farklı saatte başlayıp bittiği için saat hanesi boş bırakıldı; kendi saatlerinizi yazarsınız. Saatleri hazır basılmış, yarım saatlik ya da saatlik satırlara bölünmüş bir sayfa isterseniz saatlik gün planı aracını kullanabilirsiniz.'],
    ['Yalnızca iş günleri için sayfa alabilir miyim?', 'Evet. "Hafta sonlarını atla" seçeneği cumartesi ve pazar sayfalarını çıkarır. Gün sayısına 5 yazarsanız beş iş günü, 20 yazarsanız yaklaşık bir aylık iş günü sayfası elde edersiniz.'],
    ['Bir aylık günlük planlayıcı oluşturabilir miyim?', 'Evet. Başlangıç tarihine ayın ilk gününü, gün sayısına o ayın gün sayısını (28, 29, 30 ya da 31) yazın. Tek dosyada bir aylık set oluşur; yılın tamamı için aracı on iki kez çalıştırabilirsiniz.'],
    ['A5 sayfaları A4 yazıcıda nasıl basarım?', 'Yazdırma penceresinde "sayfa başına 2 sayfa" seçeneğini kullanın. İki A5 sayfa yan yana tek A4 kâğıda basılır; kâğıdı ortadan kesince iki ayrı gün sayfası elde edersiniz.'],
    ['Sayfa başlığına adımı yazabilir miyim?', 'Evet. "Sayfa başlığı" alanına adınızı, bölümünüzü ya da projenizin adını en fazla 40 karakter olacak biçimde yazabilirsiniz. Boş bırakırsanız "Günlük Plan" yazılır.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. PDF dosyası tarayıcınızın içinde, kendi cihazınızda oluşturulur. Seçtiğiniz tarih ve yazdığınız başlık sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['haftalik-planlayici', 'saatlik-gun-plani', 'yapilacaklar-listesi-olustur', 'aylik-planlayici', 'takvim-olustur'],
};
