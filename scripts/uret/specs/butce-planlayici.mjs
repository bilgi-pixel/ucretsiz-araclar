export default {
  slug: 'butce-planlayici',
  title: 'Aylık Bütçe Planlayıcı Oluşturma',
  h1Tail: 'yazdırılabilir PDF gelir gider çizelgesi',
  pageTitle: 'Aylık Bütçe Planlayıcı Oluştur – Gelir Gider Çizelgesi PDF',
  description: 'Gelir ve gider kalemlerinizle aylık bütçe planlayıcıyı PDF olarak oluşturun. Planlanan, gerçekleşen ve fark sütunları; A4 ya da A5, 1–12 ay.',
  card: 'Kendi gelir ve gider kalemlerinizle, planlanan–gerçekleşen–fark sütunlu aylık bütçe çizelgesini PDF olarak hazırlayın.',
  category: 'planlama',
  pdf: true,
  keywords: ['aylık bütçe planlayıcı', 'bütçe çizelgesi', 'gelir gider tablosu pdf', 'aile bütçesi şablonu', 'yazdırılabilir bütçe planı', 'aylık harcama çizelgesi', 'ev bütçesi tablosu', 'bütçe planlama şablonu'],
  lead: 'Her ay için ayrı bir sayfada gelirlerinizi ve giderlerinizi yazabileceğiniz bir <strong>aylık bütçe planlayıcı</strong> oluşturun. Kalemleri kendiniz belirleyin; her kalemin karşısında planlanan tutar, gerçekleşen tutar ve fark için boş hücreler, sayfanın altında ay sonu özeti bulunur.',
  button: 'Bütçe planlayıcıyı oluştur',
  inputs: [
    { id: 'ay', label: 'Başlangıç ayı', type: 'date', hint: 'O aydan herhangi bir günü seçin. Boş bırakırsanız içinde bulunduğunuz ay kullanılır.' },
    { id: 'aySayisi', label: 'Ay sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Her ay bir sayfadır.' },
    { id: 'gelirler', label: 'Gelir kalemleri (isteğe bağlı)', type: 'textarea', placeholder: 'Maaş\nKira geliri\nEk iş', hint: 'Her satıra bir kalem; 1–6 kalem, en fazla 28 karakter. Boş bırakırsanız üç hazır kalem kullanılır.', wide: true },
    { id: 'giderler', label: 'Gider kalemleri (isteğe bağlı)', type: 'textarea', placeholder: 'Kira\nFaturalar\nMutfak', hint: 'Her satıra bir kalem; 3–20 kalem, en fazla 28 karakter. Boş bırakırsanız on iki hazır kalem kullanılır.', wide: true },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Ev Bütçemiz', hint: 'En fazla 30 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Aylık Bütçe';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    let gelir = h.lines(v.gelirler), gider = h.lines(v.giderler);
    if (!gelir.length) gelir = ['Maaş / ücret', 'Ek gelir', 'Diğer gelir'];
    if (!gider.length) gider = ['Kira / konut', 'Faturalar', 'Mutfak ve market', 'Ulaşım', 'İletişim', 'Eğitim', 'Sağlık', 'Giyim', 'Eğlence ve sosyal', 'Borç ve taksit', 'Birikim', 'Diğer'];
    if (gelir.length > 6) h.err('En fazla 6 gelir kalemi yazabilirsiniz; benzer gelirleri tek satırda birleştirin.');
    if (gider.length < 3 || gider.length > 20) h.err('Gider kalemi sayısı 3 ile 20 arasında olmalı.');
    if ([...gelir, ...gider].some((s) => s.length > 28)) h.err('Kalem adları en fazla 28 karakter olabilir; uzun satırı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const hh = a5 ? 6 : 7, ara = a5 ? 4 : 5, ozet = a5 ? 20 : 24, pt = a5 ? 8 : 9.5;
    const ust = m + 15, tw = W - 2 * m;
    const rh = Math.min(9, (H - m - ust - 2 * hh - 2 * ara - ozet) / (gelir.length + gider.length + 2));
    if (rh < 5.6) h.err('Bu kadar kalem A5 sayfaya okunaklı biçimde sığmıyor. Kâğıt boyutunu A4 yapın ya da kalem sayısını azaltın.');
    const kw = tw * 0.46, sw = (tw - kw) / 3, SUTUN = ['Planlanan', 'Gerçekleşen', 'Fark'];
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    const ayYazi = (i) => `${h.ayAdi(((m0 + i) % 12) + 1)} ${y0 + Math.floor((m0 + i) / 12)}`;
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', ayYazi(i), W - m, m + 7, a5 ? 11 : 13, { hiza: 'sag', ton: 0.25, kalin: true }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
      // Tablo çizici: başlık satırı + kalemler + toplam satırı; bittiği y değerini döndürür
      const tablo = (y, ad, kalemler, toplamAd) => {
        ops.push(['kutu', m, y, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
        ops.push(['yazi', ad, m + 2, y + hh - 2, pt, { kalin: true }]);
        SUTUN.forEach((s, j) => ops.push(['yazi', s, m + kw + j * sw + sw / 2, y + hh - 2, pt - 1, { kalin: true, hiza: 'orta' }]));
        let yy = y + hh;
        kalemler.forEach((k) => {
          ops.push(['kutu', m, yy, tw, rh, { cizgi: 0.55 }]);
          ops.push(['yazi', k, m + 2, yy + rh / 2 + pt * 0.12, pt]);
          yy += rh;
        });
        ops.push(['kutu', m, yy, tw, rh, { dolgu: 0.93, cizgi: 0.5 }]);
        ops.push(['yazi', toplamAd, m + 2, yy + rh / 2 + pt * 0.12, pt, { kalin: true }]);
        yy += rh;
        for (let j = 0; j < 3; j++) ops.push(['cizgi', m + kw + j * sw, y, m + kw + j * sw, yy, { kalinlik: 0.25, ton: 0.5 }]);
        return yy;
      };
      let y = tablo(ust, 'Gelirler', gelir, 'Toplam gelir');
      y = tablo(y + ara, 'Giderler', gider, 'Toplam gider');
      // Ay sonu özeti: üç kutu
      y += ara;
      const ow = (tw - 2 * ara) / 3, OZET = ['Toplam gelir', 'Toplam gider', 'Kalan (gelir – gider)'];
      OZET.forEach((s, j) => {
        const x = m + j * (ow + ara);
        ops.push(['kutu', x, y, ow, ozet, { cizgi: 0.35, kalinlik: j === 2 ? 0.6 : 0.3 }]);
        ops.push(['yazi', s, x + 2, y + (a5 ? 4.6 : 5.4), pt - 1, { kalin: true, ton: 0.25 }]);
        ops.push(['cizgi', x + 3, y + ozet - 4.5, x + ow - 3, y + ozet - 4.5, { kalinlik: 0.2, ton: 0.75, kesik: true }]);
      });
      y += ozet + ara;
      // Kalan yer yeterliyse not alanı
      if (H - m - y >= 16) {
        ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
        ops.push(['yazi', 'Notlar ve gelecek ayın hedefi', m + 2, y + 5.2, pt - 0.5, { kalin: true }]);
        for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
      }
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', ayYazi(0)],
        ['Son ay', ayYazi(n - 1)],
        ['Gelir kalemi', `${gelir.length} satır`],
        ['Gider kalemi', `${gider.length} satır`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Çizelge boş hücrelerle basılır; tutarları siz yazarsınız. Fark sütununa "planlanan − gerçekleşen" değerini not edebilirsiniz.',
      pdf: { ad: 'butce-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { ay: '2026-11-18', aySayisi: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'İlk ay': 'Kasım 2026', 'Son ay': 'Kasım 2026', 'Gelir kalemi': '3 satır', 'Gider kalemi': '12 satır', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { ay: '2026-11-18', aySayisi: '3', boyut: 'a5' }, out: { 'Sayfa sayısı': '3 sayfa', 'İlk ay': 'Kasım 2026', 'Son ay': 'Ocak 2027', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 3 },
    { in: { ay: '2027-01-01', aySayisi: '12' }, out: { 'İlk ay': 'Ocak 2027', 'Son ay': 'Aralık 2027' }, pdfSayfa: 12 },
    { in: { ay: '2028-02-29', aySayisi: '2', gelirler: 'Maaş\nKira geliri', giderler: 'Kira\nAidat\nElektrik\nSu\nDoğal gaz\nİnternet\nMarket\nOkul' }, out: { 'İlk ay': 'Şubat 2028', 'Son ay': 'Mart 2028', 'Gelir kalemi': '2 satır', 'Gider kalemi': '8 satır' }, pdfSayfa: 2 },
    { in: { ay: '2026-12-31', aySayisi: '2', baslik: 'Ev Bütçemiz' }, out: { 'İlk ay': 'Aralık 2026', 'Son ay': 'Ocak 2027' }, pdfSayfa: 2 },
    { in: { ay: '2026-11-18', aySayisi: '1', gelirler: 'A\nB\nC\nD\nE\nF', giderler: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20' }, out: { 'Gelir kalemi': '6 satır', 'Gider kalemi': '20 satır' }, pdfSayfa: 1 },
    { in: { ay: '2026-11-18', aySayisi: '13' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '1', giderler: 'Kira\nMarket' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '1', boyut: 'a5', gelirler: 'A\nB\nC\nD\nE\nF', giderler: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20' }, error: true },
  ],
  howto: [
    '"Başlangıç ayı" alanından bütçesini yapacağınız ilk aydan herhangi bir günü seçin. Alanı boş bırakırsanız içinde bulunduğunuz ay alınır.',
    '"Ay sayısı" alanına kaç aylık çizelge istediğinizi yazın. Yıl boyunca kullanmak için 12 yazıp tüm ayları tek dosyada alabilirsiniz.',
    'Gelir ve gider kalemlerinizi her satıra bir tane olacak biçimde yazın. Alanları boş bırakırsanız genel bir hane bütçesine uygun hazır kalemler kullanılır.',
    'Kâğıt boyutunu seçin ve isterseniz sayfaya bir başlık verin.',
    '"Bütçe planlayıcıyı oluştur" düğmesine basın, önizlemeye bakın ve "PDF indir" ile dosyayı kaydedip %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Her sayfa tek bir aya aittir; sağ üst köşede "Kasım 2026" biçiminde ay ve yıl yazar. Sayfanın gövdesinde iki tablo bulunur. Üstteki <strong>Gelirler</strong> tablosunda yazdığınız gelir kalemleri, alttaki <strong>Giderler</strong> tablosunda gider kalemleri alt alta sıralanır. Her iki tabloda da kalem adının karşısında üç boş hücre vardır: <strong>Planlanan</strong>, <strong>Gerçekleşen</strong> ve <strong>Fark</strong>. Tabloların son satırı açık gri zeminli toplam satırıdır.',
      'Tabloların altında üç kutudan oluşan ay sonu özeti yer alır: toplam gelir, toplam gider ve ikisinin farkı olan kalan tutar. Kalan kutusu daha kalın çerçevelidir; çünkü ayın sonucunu tek sayıyla gösteren hücre odur. Kalem sayınız azsa sayfanın altında boş kalan bölüme "Notlar ve gelecek ayın hedefi" başlıklı çizgili bir alan eklenir.',
    ] },
    { h: 'Planlanan, gerçekleşen ve fark nasıl doldurulur?', p: [
      'Ayın ilk günlerinde yalnızca <strong>Planlanan</strong> sütununu doldurursunuz: o ay elinize geçmesini beklediğiniz gelirleri ve her gider kalemi için harcamayı öngördüğünüz tutarı yazarsınız. Planlanan giderlerin toplamı planlanan gelirin toplamını aşıyorsa bunu ay başlamadan görmüş olursunuz; hangi kalemin kısılacağına o anda karar vermek, ay sonunda açıkla karşılaşmaktan kolaydır.',
      'Ay içinde ya da ay bittiğinde <strong>Gerçekleşen</strong> sütununa gerçek tutarları yazarsınız. <strong>Fark</strong> sütunu ikisinin farkıdır. Giderlerde farkı "planlanan − gerçekleşen" olarak hesaplarsanız artı değer tasarrufu, eksi değer aşımı gösterir.',
      'Küçük bir örnek: mutfak için 12.000 TL planlayıp 13.400 TL harcadıysanız fark −1.400 TL\'dir; ulaşım için 3.000 TL planlayıp 2.600 TL harcadıysanız fark +400 TL\'dir. İki kalemin net etkisi −1.000 TL olur. Toplam geliriniz 60.000 TL, toplam gideriniz 52.500 TL ise özet kutusuna yazacağınız kalan tutar 60.000 − 52.500 = 7.500 TL\'dir. Araç bu hesapları yapmaz; hücreleri sizin doldurmanız için boş bırakır.',
    ] },
    { h: 'Kalemleri belirlerken', ul: [
      '<strong>Sabit giderleri üste yazın.</strong> Kira, aidat, taksit gibi her ay aynı kalan tutarlar üstte durursa değişken harcamalara ne kadar yer kaldığı hemen görülür.',
      '<strong>Faturaları ayırıp ayırmayacağınıza karar verin.</strong> Tek bir "Faturalar" satırı sade olur; elektrik, su, doğal gaz ve interneti ayrı yazmak ise hangi faturanın arttığını gösterir.',
      '<strong>Birikimi gider gibi yazın.</strong> Birikimi "artarsa" diye sona bırakmak yerine ayrı bir satır açıp planlanan tutar yazmak, onu diğer ödemelerle aynı ciddiyete taşır.',
      '<strong>"Diğer" satırını küçük tutun.</strong> Bu satır ay sonunda şişiyorsa içinden yeni bir kalem çıkarmanın zamanı gelmiştir.',
      '<strong>Yıllık ödemeleri aylara bölün.</strong> Sigorta, vergi, okul kaydı gibi yılda bir gelen ödemeler için her ay küçük bir pay ayırmak, ödemenin geldiği ayı rahatlatır.',
      '<strong>Düzensiz geliri temkinli planlayın.</strong> Geliriniz aydan aya değişiyorsa planlanan sütununa son ayların en düşük tutarını yazmak daha güvenli bir başlangıç noktasıdır.',
    ] },
    { h: 'Satır sayısı ve kâğıt seçimi', p: [
      'Hazır kalemlerle sayfada 3 gelir ve 12 gider satırı bulunur; bu düzen hem A4 hem A5 kâğıda rahatça sığar ve A4\'te altta geniş bir not alanı kalır. En fazla 6 gelir ve 20 gider kalemi yazabilirsiniz. Bu üst sınırda A4 sayfada satır yüksekliği yaklaşık 7,5 mm olur ve yazmak için yeterlidir; A5 sayfada ise satırlar okunaksız ölçüde daralacağı için araç hata verir ve A4 seçmenizi ya da kalem sayısını azaltmanızı ister.',
      'Aylar takvime göre ilerler: başlangıç olarak Kasım 2026\'yı seçip ay sayısına 3 yazdığınızda sayfalar Kasım 2026, Aralık 2026 ve Ocak 2027 olarak hazırlanır. 12 aylık çıktıyı delip klasöre takarsanız yıl sonunda bütün ayları yan yana karşılaştırabileceğiniz bir bütçe defteriniz olur.',
    ] },
    { h: 'Yazdırma önerileri', p: [
      'Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. Dosya yalnızca gri tonlardan oluştuğu için siyah beyaz yazıcıda eksiksiz basılır. A5 çıktıyı A4 yazıcıdan almak için "sayfa başına 2 sayfa" seçeneğiyle iki ayı tek kâğıda bastırıp ortadan kesebilirsiniz. Rakamları kurşun kalemle yazmak, ay içinde değişen planı düzeltmeyi kolaylaştırır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu araç bir hesap programı değildir; toplama, çıkarma ya da yüzde hesabı yapmaz, yalnızca dolduracağınız çizelgeyi hazırlar. Para birimi basılmaz; tutarları dilediğiniz birimle yazabilirsiniz. Çizelge kişisel ve hane içi takip içindir, resmî bir muhasebe ya da vergi belgesi yerine geçmez. Borç yapılandırma, yatırım ya da kredi gibi mali kararlar için yalnızca bu tabloya dayanmayın; gerekirse bir mali danışmandan görüş alın.',
    ] },
  ],
  faq: [
    ['Aylık bütçe planlayıcı ücretsiz mi?', 'Evet. Çizelgeyi sınırsız sayıda oluşturup indirebilir ve yazdırabilirsiniz. Kayıt, üyelik ya da ödeme gerekmez.'],
    ['Kendi gelir ve gider kalemlerimi yazabilir miyim?', 'Evet. Gelirler için 1–6, giderler için 3–20 kalemi her satıra bir tane olacak biçimde yazabilirsiniz. Alanları boş bırakırsanız üç gelir ve on iki gider kalemi hazır gelir.'],
    ['Araç toplamları kendisi hesaplıyor mu?', 'Hayır. Tutar hücreleri boş basılır ve elle doldurulur; toplamları siz hesaplayıp yazarsınız. Araç yalnızca çizelgenin kendisini üretir, girdiğiniz bir tutar da yoktur.'],
    ['Bir yıllık bütçe defteri çıkarabilir miyim?', 'Evet. Başlangıç ayını seçip ay sayısına 12 yazarsanız on iki aylık çizelge, her sayfanın köşesinde ay ve yıl yazılı olarak tek PDF dosyasında oluşur.'],
    ['Fark sütununu nasıl hesaplamalıyım?', 'Yaygın yöntem planlanan tutardan gerçekleşeni çıkarmaktır. Giderlerde artı sonuç bütçenin altında kaldığınızı, eksi sonuç aştığınızı gösterir. Gelirlerde tersini, yani gerçekleşen eksi planlananı kullanmak daha anlaşılır olur.'],
    ['Neden A5 seçtiğimde hata alıyorum?', 'Kalem sayınız A5 sayfaya okunaklı satır yüksekliğiyle sığmıyorsa araç çizelgeyi sıkıştırmak yerine uyarı verir. Kâğıdı A4 yapabilir ya da benzer kalemleri birleştirerek satır sayısını azaltabilirsiniz.'],
    ['Çizelgeyi iş yerimin bütçesi için kullanabilir miyim?', 'Küçük bir işletmenin ya da derneğin aylık nakit takibi için kullanılabilir; kalem adlarını ona göre yazmanız yeterlidir. Ancak resmî defter, beyanname ya da muhasebe kaydı yerine geçmez.'],
    ['Yazdığım kalemler ya da tarihler bir sunucuya gidiyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; kalem adlarınız ve seçtiğiniz ay hiçbir yere gönderilmez, saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['butce-50-30-20-hesapla', 'alisveris-listesi-olustur', 'aylik-planlayici', 'haftalik-yemek-plani', 'hedef-planlayici'],
};
