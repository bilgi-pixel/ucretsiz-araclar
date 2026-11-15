export default {
  slug: 'haftalik-planlayici',
  title: 'Haftalık Planlayıcı Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Haftalık Planlayıcı Oluştur – Yazdırılabilir Haftalık Plan PDF',
  description: 'Tarihleri yazılı, yedi günlük yazdırılabilir haftalık planlayıcıyı PDF olarak oluşturun. A4 ya da A5, bir ile on iki hafta arası; öncelik ve not alanlarıyla.',
  card: 'Tarihleri hazır yazılmış haftalık planlayıcıyı A4 ya da A5 PDF olarak oluşturun; öncelikler ve notlar için ayrı alanlar.',
  category: 'planlama',
  pdf: true,
  keywords: ['haftalık planlayıcı', 'haftalık plan şablonu', 'haftalık planlayıcı pdf', 'yazdırılabilir haftalık plan', 'haftalık ajanda', 'haftalık program çizelgesi', 'boş haftalık plan'],
  lead: 'Pazartesiden pazara yedi günü yan yana gösteren, tarihleri sizin yerinize yazılmış bir <strong>haftalık planlayıcı</strong> oluşturun. Başlangıç haftasını ve kaç hafta istediğinizi seçin; her hafta ayrı bir sayfa olarak tek PDF dosyasında hazırlanır.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız içinde bulunduğunuz hafta kullanılır. Hangi günü seçerseniz seçin plan o haftanın pazartesisinden başlar.' },
    { id: 'hafta', label: 'Hafta sayısı', type: 'number', value: '4', hint: '1 ile 12 arasında. Her hafta bir sayfadır.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'satir', label: 'Gün sütunlarında', type: 'select', options: [['cizgi', 'Yazı çizgileri olsun'], ['bos', 'Boş bırak']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Haftalık Plan', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Haftalık Plan';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1;
    const m = a5 ? 8 : 12;
    // Seçilen günün haftasının pazartesisi (getUTCDay: 0 pazar … 6 cumartesi)
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const haftaNo = (d) => { // ISO 8601 hafta numarası
      const t = new Date(d.getTime()); t.setUTCDate(t.getUTCDate() + 3 - ((t.getUTCDay() + 6) % 7));
      const y1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
      return 1 + Math.round(((t - y1) / 86400000 - 3 + ((y1.getUTCDay() + 6) % 7)) / 7);
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), s = h.gunEkle(b, 6), ops = [];
      // Başlık şeridi
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(s)}  ·  ${haftaNo(b)}. hafta`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Yedi gün sütunu
      const ust = m + 14 * k, altYuk = 38 * k, alt = H - m - altYuk - 4 * k, gw = (W - 2 * m) / 7, bh = 9 * k;
      for (let g = 0; g < 7; g++) {
        const x = m + g * gw, d = h.gunEkle(b, g);
        ops.push(['kutu', x, ust, gw, bh, { dolgu: g >= 5 ? 0.86 : 0.93, cizgi: 0.55 }]);
        ops.push(['yazi', GUN[g], x + 2 * k, ust + 6.2 * k, 9 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)}`, x + gw - 2 * k, ust + 6.2 * k, 7.5 * k, { hiza: 'sag', ton: 0.35 }]);
        ops.push(['kutu', x, ust + bh, gw, alt - ust - bh, { cizgi: 0.55 }]);
        if (v.satir !== 'bos') for (let y = ust + bh + 8 * k; y < alt - 2; y += 8 * k) ops.push(['cizgi', x + 1.5 * k, y, x + gw - 1.5 * k, y, { kalinlik: 0.2, ton: 0.8 }]);
      }
      // Alt bölüm: öncelikler ve notlar
      const ay = alt + 4 * k, ow = (W - 2 * m) * 0.4, nw = (W - 2 * m) - ow - 4 * k;
      ops.push(['kutu', m, ay, ow, altYuk, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Bu haftanın öncelikleri', m + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
      for (let j = 0; j < 4; j++) {
        const y = ay + (12 + j * 7) * k;
        ops.push(['kutu', m + 2.5 * k, y - 3.2 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', m + 8 * k, y + 0.4 * k, m + ow - 2.5 * k, y + 0.4 * k, { kalinlik: 0.2, ton: 0.75 }]);
      }
      const nx = m + ow + 4 * k;
      ops.push(['kutu', nx, ay, nw, altYuk, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Notlar', nx + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
      for (let j = 0; j < 4; j++) { const y = ay + (12.4 + j * 7) * k; ops.push(['cizgi', nx + 2.5 * k, y, nx + nw - 2.5 * k, y, { kalinlik: 0.2, ton: 0.75 }]); }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'haftalik-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '4' }, out: { 'Sayfa sayısı': '4 sayfa', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '13.12.2026 Pazar' }, pdfSayfa: 4 },
    { in: { baslangic: '2027-01-01', hafta: '1', boyut: 'a5' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-16', hafta: '12', satir: 'bos' }, out: { 'Sayfa sayısı': '12 sayfa', 'Son gün': '07.02.2027 Pazar' }, pdfSayfa: 12 },
    { in: { baslangic: '2026-11-22', hafta: '2', baslik: 'Ders Haftam' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '29.11.2026 Pazar' }, pdfSayfa: 2 },
    { in: { baslangic: '2028-02-29', hafta: '1' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', hafta: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '0' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '2', baslik: 'Bu başlık kırk karakterden çok daha uzun bir başlıktır' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından planın başlayacağı haftadaki herhangi bir günü seçin; boş bırakırsanız bu hafta alınır. Plan her zaman o haftanın pazartesisinden başlar.',
    '"Hafta sayısı" alanına kaç haftalık plan istediğinizi yazın. Bir aylık dönem için 4 ya da 5, bir okul dönemi için 12 yazıp aracı birkaç kez çalıştırabilirsiniz.',
    'Kâğıt boyutunu seçin. A4 masa başında yazmak için rahattır; A5 ajandaya ya da çantaya sığar. İsterseniz gün sütunlarındaki yazı çizgilerini kapatın ve sayfaya kendi başlığınızı verin.',
    '"Planlayıcıyı oluştur" düğmesine basın. İlk sayfanın önizlemesi görünür; "PDF indir" ile dosyayı kaydedip yazıcıdan yatay yönde, %100 ölçekle çıkarın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Her sayfa tek bir haftayı gösterir. Üstte sayfa başlığı, haftanın ilk ve son günü ile yılın kaçıncı haftası olduğu yazar. Altında pazartesiden pazara yedi eşit sütun bulunur; her sütunun başında gün adı ve "17 Kasım" biçiminde tarih hazır yazılıdır, yani tarihleri elle doldurmanız gerekmez. Cumartesi ve pazar sütunlarının başlığı biraz daha koyu tonda basılır, böylece hafta sonu bir bakışta ayrılır.',
      'Sayfanın alt kısmında iki kutu vardır. Soldaki "Bu haftanın öncelikleri" kutusunda dört onay kutulu satır yer alır; haftayı bitirdiğinizde mutlaka yapılmış olmasını istediğiniz işleri buraya yazarsınız. Sağdaki "Notlar" kutusu ise hiçbir güne ait olmayan hatırlatmalar, telefon numaraları ya da gelecek haftaya devreden işler içindir.',
    ] },
    { h: 'Haftalık plan neden işe yarar?', p: [
      'Günlük yapılacaklar listesi yalnızca bugünü gösterir; aylık takvim ise ayrıntı yazmaya yer bırakmaz. Hafta, ikisinin arasındaki doğal ölçektir: işlerin çoğu bir günden uzun, bir aydan kısa sürer ve toplantılar, dersler, vardiyalar haftalık düzenle tekrar eder. Yedi günü aynı anda görmek, salı gününe üç ağır iş yığıldığını ve perşembenin boş kaldığını fark etmenizi sağlar; işi yapmaya başlamadan önce dengeleyebilirsiniz.',
      'Kâğıt üzerinde plan yapmanın ayrı bir yararı da ekrana bakmadan çalışabilmektir. Masanın üstünde ya da buzdolabının kapağında duran bir sayfa, telefonu elinize alıp bildirimlere dalmadan haftaya göz atmanıza izin verir. Aile bireylerinin ya da küçük bir ekibin ortak görebileceği bir yere asıldığında herkes aynı planı görür.',
    ] },
    { h: 'Etkili doldurma önerileri', ul: [
      '<strong>Önce sabit işleri yazın.</strong> Ders, mesai, randevu gibi saati değişmeyen işleri sütunlara yerleştirin; geriye kalan boşluk gerçek serbest zamanınızı gösterir.',
      '<strong>Öncelik kutusunu dörtle sınırlayın.</strong> Sayfada bilerek yalnızca dört satır vardır. Haftanın gerçekten önemli işleri bundan fazlaysa hiçbiri öncelik değildir.',
      '<strong>Her güne en fazla üç büyük iş koyun.</strong> Küçük işler aralara kendiliğinden sığar; büyük işler sığmaz.',
      '<strong>Pazar akşamı ya da pazartesi sabahı on dakika ayırın.</strong> Geçen haftanın sayfasında bitmeyenleri yeni sayfaya taşıyın, bitenlerin üstünü çizin.',
      '<strong>Renk kullanın.</strong> İş, okul ve özel hayat için ayrı renkte kalem kullanmak, tek sayfada üç ayrı planı okunur kılar.',
    ] },
    { h: 'Hafta numarası ve yıl geçişleri', p: [
      'Başlıkta görünen hafta numarası, Türkiye\'de ve Avrupa\'da kullanılan ISO 8601 kuralına göre hesaplanır: hafta pazartesi başlar ve yılın ilk haftası, o yılın ilk perşembesini içeren haftadır. Bu yüzden yılın ilk günleri bazen önceki yılın son haftasına düşer. Örneğin 1 Ocak 2027 cuma günüdür; bu tarihi seçtiğinizde plan 28 Aralık 2026 pazartesi ile başlar ve hafta numarası 53 olarak yazılır. Kurumların "42. hafta teslimi" gibi ifadeleri bu numaralamayı kullanır.',
      'Ay ortasında başlayan haftalarda sütun başlıklarındaki ay adı kendiliğinden değişir; 30 Kasım pazartesi ile başlayan haftanın salı sütununda "1 Aralık" yazar.',
    ] },
    { h: 'Yazdırma ve ciltleme', p: [
      'Dosya vektörel çizgilerden oluşur; bu yüzden hem küçük hem de keskin basılır. Yazdırma penceresinde kâğıt yönünü <strong>yatay</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin; "sayfaya sığdır" seçeneği kenar boşluklarını büyütüp sütunları daraltır. A5 seçtiyseniz yazıcınıza A5 kâğıt koyabilir ya da A4 kâğıda iki sayfayı yan yana bastırıp ortadan kesebilirsiniz.',
      'Birkaç haftalık çıktıyı sol kenarından delgeçle delip klasöre takabilir ya da üstten iki telle zımbalayıp masa bloknotu gibi kullanabilirsiniz. Çift taraflı baskıda "kısa kenardan çevir" seçeneği, sayfayı çevirdiğinizde yazıların baş aşağı gelmesini önler.',
    ] },
    { h: 'Sınırlar', p: [
      'Bir seferde en fazla 12 haftalık plan üretilir; daha uzun dönemler için başlangıç tarihini ilerletip aracı yeniden çalıştırmanız yeterlidir. Hafta her zaman pazartesi başlar. Resmî tatiller sayfaya işlenmez; bunları elle işaretleyebilirsiniz. Planlayıcı doldurulabilir bir PDF formu değildir, yazdırıp kalemle doldurmak için tasarlanmıştır.',
    ] },
  ],
  faq: [
    ['Haftalık planlayıcıyı ücretsiz indirebilir miyim?', 'Evet. Araç tamamen ücretsizdir, kayıt istemez ve indirme sayısında sınır yoktur. Oluşturduğunuz PDF dosyasını kişisel, okul ya da iş amacıyla dilediğiniz kadar yazdırabilirsiniz.'],
    ['Tarihleri kendim mi yazacağım?', 'Hayır. Seçtiğiniz başlangıç haftasına göre her gün sütununun başına gün adı ve tarih, sayfa başlığına da haftanın ilk ve son günü ile hafta numarası kendiliğinden yazılır.'],
    ['Plan neden seçtiğim günden değil pazartesiden başlıyor?', 'Haftalık görünümün sütunları pazartesiden pazara sabit olduğu için araç, seçtiğiniz günün içinde bulunduğu haftanın pazartesisini başlangıç alır. Çarşamba seçseniz bile o haftanın tamamını görürsünüz.'],
    ['A5 çıktıyı A4 yazıcıda nasıl alırım?', 'A5 kâğıt, A4\'ün tam yarısıdır. Yazıcınızın "sayfa başına 2 sayfa" seçeneğiyle iki haftayı tek A4 kâğıda bastırıp ortadan kesebilir ya da doğrudan A5 kâğıt kullanabilirsiniz.'],
    ['Bir yıllık haftalık plan oluşturabilir miyim?', 'Bir seferde en fazla 12 hafta üretilir. Bir yıl için aracı beş kez çalıştırın ve her seferinde başlangıç tarihini önceki dosyanın bittiği haftanın ertesine alın; ortaya 52 ya da 53 sayfalık bir set çıkar.'],
    ['Sayfa başlığını değiştirebilir miyim?', 'Evet. "Sayfa başlığı" alanına en fazla 40 karakterlik bir metin yazabilirsiniz; örneğin adınızı, sınıfınızı ya da ekibinizin adını. Boş bırakırsanız "Haftalık Plan" yazılır.'],
    ['Gün sütunlarındaki çizgileri kaldırabilir miyim?', 'Evet. "Gün sütunlarında" seçeneğini "Boş bırak" yaparsanız sütunlar çizgisiz basılır; çizim yapmak, yapışkan not kullanmak ya da büyük harflerle yazmak isteyenler için uygundur.'],
    ['Seçtiğim tarihler ya da başlık bir yere gönderiliyor mu?', 'Hayır. PDF dosyası tarayıcınızın içinde oluşturulur; girdiğiniz hiçbir bilgi sunucuya iletilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['takvim-olustur', 'ders-programi-olustur', 'hafta-numarasi', 'gunluk-planlayici', 'aylik-planlayici'],
};
