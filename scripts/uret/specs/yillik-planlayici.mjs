export default {
  slug: 'yillik-planlayici',
  title: 'Yıllık Planlayıcı Oluşturma',
  h1Tail: 'tek sayfada bütün yıl',
  pageTitle: 'Yıllık Planlayıcı Oluştur – Tek Sayfa Yıllık Plan PDF',
  description: 'Bütün yılı tek sayfada gösteren yıllık planlayıcıyı PDF olarak oluşturun. Gün gün yazılabilen çizelge ya da on iki küçük takvim düzeni; A4 ve A5.',
  card: 'Bütün yılı tek sayfada görün: gün gün yazılabilen yıllık çizelge ya da on iki küçük takvimli genel bakış sayfası, PDF olarak.',
  category: 'planlama',
  pdf: true,
  keywords: ['yıllık planlayıcı', 'yıllık plan şablonu', 'yıllık planlayıcı pdf', 'tek sayfa yıllık takvim', 'yıllık çizelge', 'yıllık duvar planlayıcı', 'yıllık izin planı çizelgesi'],
  lead: 'On iki ayı tek sayfada gösteren bir <strong>yıllık planlayıcı</strong> oluşturun. İster her güne kısa not yazabileceğiniz satırlı yıl çizelgesini, ister on iki küçük takvimden oluşan genel bakış sayfasını seçin; günler doğru haftanın gününe göre yerleştirilir ve hafta sonları gölgelenir.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 2027', hint: 'Boş bırakırsanız içinde bulunduğunuz yıl kullanılır. 1900 ile 2200 arasında.' },
    { id: 'yilSayisi', label: 'Yıl sayısı', type: 'number', value: '1', hint: '1 ile 10 arasında. Her yıl bir sayfadır.' },
    { id: 'duzen', label: 'Düzen', type: 'select', options: [['cizelge', 'Yıl çizelgesi (her güne yazı alanı, yatay)'], ['takvim', 'On iki küçük takvim ve notlar (dikey)']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4'], ['a5', 'A5']] },
    { id: 'baslik', label: 'Ek başlık (isteğe bağlı)', type: 'text', placeholder: 'Örn. İzin Planı', hint: 'Yılın karşısına yazılır. En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const yil = String(v.yil ?? '').trim() === '' ? h.dateOrToday('').getUTCFullYear() : h.int(v.yil, 'Yıl');
    if (yil < 1900 || yil > 2200) h.err('Yıl 1900 ile 2200 arasında olmalı (örn. 2027).');
    const n = h.posint(v.yilSayisi, 'Yıl sayısı');
    if (n > 10) h.err('Yıl sayısı en fazla 10 olabilir.');
    if (yil + n - 1 > 2200) h.err('Son yıl 2200 yılını geçemez; yıl sayısını azaltın.');
    const ek = (v.baslik || '').trim();
    if (ek.length > 40) h.err('Ek başlık en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5', takvim = v.duzen === 'takvim';
    const k = a5 ? 0.7 : 1;
    const [kisa, uzun] = a5 ? [148, 210] : [210, 297];
    const W = takvim ? kisa : uzun, H = takvim ? uzun : kisa;
    const m = takvim ? (a5 ? 9 : 12) : (a5 ? 7 : 10);
    const f = (p) => Math.max(5, p * k);
    const gunSay = (y, mo) => new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
    const KISA = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']; // getUTCDay sırası
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const y = yil + i, ops = [];
      ops.push(['yazi', String(y), m, m + 7 * k, f(20), { kalin: true }]);
      ops.push(['yazi', ek || 'Yıllık Plan', W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 13 * k;
      if (!takvim) {
        // 12 ay sütunu × 31 gün satırı
        const bh = 6 * k, cw = (W - 2 * m) / 12, rh = (H - m - ust - bh) / 31;
        for (let mo = 0; mo < 12; mo++) {
          const x = m + mo * cw, gs = gunSay(y, mo);
          ops.push(['kutu', x, ust, cw, bh, { dolgu: 0.88, cizgi: 0.45 }]);
          ops.push(['yazi', h.ayAdi(mo + 1), x + cw / 2, ust + 4.3 * k, f(8), { kalin: true, hiza: 'orta' }]);
          for (let d = 1; d <= 31; d++) {
            const yy = ust + bh + (d - 1) * rh;
            if (d > gs) { ops.push(['kutu', x, yy, cw, rh, { dolgu: 0.8, cizgi: 0.45 }]); continue; }
            const g = new Date(Date.UTC(y, mo, d)).getUTCDay(), hs = g === 0 || g === 6;
            ops.push(['kutu', x, yy, cw, rh, hs ? { dolgu: 0.92, cizgi: 0.45 } : { cizgi: 0.45 }]);
            ops.push(['yazi', String(d), x + 3.6 * k, yy + rh * 0.7, f(6.5), { kalin: true, hiza: 'sag' }]);
            ops.push(['yazi', KISA[g], x + 4.3 * k, yy + rh * 0.7, f(5.5), { ton: 0.45 }]);
          }
        }
      } else {
        // 3 × 4 küçük takvim, altta not alanı
        const bosluk = 5 * k, notYuk = 32 * k, alanYuk = H - m - notYuk - bosluk - ust;
        const bw = (W - 2 * m - 2 * bosluk) / 3, byuk = (alanYuk - 3 * bosluk) / 4, cw = bw / 7, rh = (byuk - 13 * k) / 6;
        const HARF = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
        for (let mo = 0; mo < 12; mo++) {
          const x = m + (mo % 3) * (bw + bosluk), yy = ust + Math.floor(mo / 3) * (byuk + bosluk);
          ops.push(['yazi', h.ayAdi(mo + 1), x + 1 * k, yy + 4.6 * k, f(10), { kalin: true }]);
          ops.push(['cizgi', x, yy + 6.2 * k, x + bw, yy + 6.2 * k, { kalinlik: 0.4, ton: 0.3 }]);
          for (let g = 0; g < 7; g++) ops.push(['yazi', HARF[g], x + (g + 0.5) * cw, yy + 10.8 * k, f(6.5), { hiza: 'orta', ton: g >= 5 ? 0.55 : 0.4 }]);
          const kayma = (new Date(Date.UTC(y, mo, 1)).getUTCDay() + 6) % 7, gs = gunSay(y, mo);
          for (let d = 1; d <= gs; d++) {
            const p = kayma + d - 1, c = p % 7, r = Math.floor(p / 7);
            ops.push(['yazi', String(d), x + (c + 0.5) * cw, yy + 13 * k + (r + 0.72) * rh, f(8), { hiza: 'orta', ton: c >= 5 ? 0.5 : 0.05 }]);
          }
        }
        const ny = H - m - notYuk;
        ops.push(['kutu', m, ny, W - 2 * m, notYuk, { cizgi: 0.5 }]);
        ops.push(['yazi', 'Yılın önemli tarihleri ve notlar', m + 2 * k, ny + 5.2 * k, f(8.5), { kalin: true }]);
        for (let yq = ny + 12 * k; yq < ny + notYuk - 2 * k; yq += 7 * k) ops.push(['cizgi', m + 2.5 * k, yq, W - m - 2.5 * k, yq, { kalinlik: 0.2, ton: 0.75 }]);
      }
      sayfalar.push(ops);
    }
    const artik = (yil % 4 === 0 && yil % 100 !== 0) || yil % 400 === 0;
    const boyutAd = a5 ? (takvim ? 'A5 dikey (148 × 210 mm)' : 'A5 yatay (210 × 148 mm)') : (takvim ? 'A4 dikey (210 × 297 mm)' : 'A4 yatay (297 × 210 mm)');
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Yıl', n === 1 ? String(yil) : `${yil} – ${yil + n - 1}`],
        ['İlk yılın gün sayısı', artik ? '366 gün (artık yıl)' : '365 gün'],
        ['1 Ocak', h.gunAdi(new Date(Date.UTC(yil, 0, 1)))],
        ['31 Aralık', h.gunAdi(new Date(Date.UTC(yil, 11, 31)))],
        ['Düzen', takvim ? 'On iki küçük takvim' : 'Yıl çizelgesi'],
        ['Kâğıt', boyutAd],
      ],
      note: `Yazdırırken kâğıt yönünü ${takvim ? 'dikey' : 'yatay'}, ölçeği "gerçek boyut" (%100) seçin.`,
      pdf: { ad: 'yillik-planlayici', baslik: ek || 'Yıllık Plan', boyut: a5 ? 'a5' : 'a4', yatay: !takvim, sayfalar },
    };
  },
  cases: [
    { in: { yil: '2027' }, out: { 'Sayfa sayısı': '1 sayfa', 'Yıl': '2027', 'İlk yılın gün sayısı': '365 gün', '1 Ocak': 'Cuma', '31 Aralık': 'Cuma', 'Kâğıt': 'A4 yatay (297 × 210 mm)' }, pdfSayfa: 1 },
    { in: { yil: '2028', duzen: 'takvim' }, out: { 'İlk yılın gün sayısı': '366 gün (artık yıl)', '1 Ocak': 'Cumartesi', '31 Aralık': 'Pazar', 'Düzen': 'On iki küçük takvim', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { yil: '2026', yilSayisi: '3', boyut: 'a5' }, out: { 'Sayfa sayısı': '3 sayfa', 'Yıl': '2026 – 2028', '1 Ocak': 'Perşembe', '31 Aralık': 'Perşembe', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 3 },
    { in: { yil: '2100', duzen: 'takvim', boyut: 'a5', baslik: 'İzin Planı' }, out: { 'İlk yılın gün sayısı': '365 gün', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { yil: '2000', yilSayisi: '10' }, out: { 'İlk yılın gün sayısı': '366 gün (artık yıl)', '1 Ocak': 'Cumartesi', 'Yıl': '2000 – 2009' }, pdfSayfa: 10 },
    { in: { yil: '2027', duzen: 'takvim', yilSayisi: '2' }, out: { 'Yıl': '2027 – 2028', 'Sayfa sayısı': '2 sayfa' }, pdfSayfa: 2 },
    { in: { yil: '1850' }, error: true },
    { in: { yil: '2027', yilSayisi: '11' }, error: true },
    { in: { yil: '2027,5' }, error: true },
  ],
  howto: [
    '"Yıl" alanına planlayıcının ait olacağı yılı yazın. Boş bırakırsanız içinde bulunduğunuz yıl alınır.',
    'Birden çok yıl için art arda sayfa istiyorsanız "Yıl sayısı" alanını artırın; her yıl ayrı bir sayfa olur.',
    'Düzeni seçin: her güne kısa not yazmak istiyorsanız yatay "Yıl çizelgesi", yalnızca tarihleri görmek ve altına not almak istiyorsanız dikey "On iki küçük takvim".',
    'Kâğıt boyutunu seçin, isterseniz "İzin Planı" ya da "Bakım Takvimi" gibi bir ek başlık yazın.',
    '"Planlayıcıyı oluştur" düğmesine basın, önizlemeyi kontrol edin ve "PDF indir" ile dosyayı kaydedin.',
  ],
  sections: [
    { h: 'İki düzen arasındaki fark', p: [
      '<strong>Yıl çizelgesi</strong> yatay bir sayfadır. Aylar soldan sağa on iki sütun, günler yukarıdan aşağıya otuz bir satır halinde dizilir. Her hücrenin solunda gün numarası ile gün adının iki harfli kısaltması (Pt, Sa, Ça, Pe, Cu, Ct, Pz) yazar, sağında kısa bir not için boşluk kalır. Cumartesi ve pazar hücreleri açık gri, takvimde olmayan günler (örneğin 30 Şubat ya da 31 Nisan) koyu gri basılır. Bu düzende aynı satırdaki hücreler ayın aynı gününe denk gelir; bu yüzden "her ayın on beşi" gibi tekrarlayan tarihleri tek bir yatay bakışla izleyebilirsiniz.',
      '<strong>On iki küçük takvim</strong> dikey bir sayfadır. Aylar üçerli dört sıra halinde, alışık olduğunuz haftalık tablo biçiminde çizilir; haftalar pazartesi ile başlar, hafta sonu günleri gri tonla yazılır. Sayfanın altında "Yılın önemli tarihleri ve notlar" başlıklı çizgili bir kutu bulunur. Bu düzende günlere yazı yazılmaz; tarihleri daire içine alır, açıklamasını alttaki kutuya not edersiniz.',
    ] },
    { h: 'Yıllık planlayıcı ne işe yarar?', ul: [
      '<strong>İzin ve tatil planı:</strong> yıllık izinleri, okul tatillerini ve uzun hafta sonlarını renkli kalemle boyayıp çakışmaları görmek.',
      '<strong>Ekip ve nöbet takibi:</strong> küçük bir işyerinde kimin hangi günlerde izinli ya da nöbetçi olduğunu tek sayfada tutmak.',
      '<strong>Tekrarlayan ödemeler ve bakımlar:</strong> sigorta yenileme, araç muayenesi, kombi bakımı, alan adı ve abonelik yenilemeleri gibi yılda bir gelen işleri unutmamak.',
      '<strong>Proje ve hedef dönemleri:</strong> bir işin hangi aylara yayıldığını yatay ya da dikey çizgilerle işaretlemek.',
      '<strong>Sınav ve dönem takvimi:</strong> öğrencilerin sınav haftalarını, ödev teslimlerini ve dönem başlangıçlarını bir arada görmesi.',
      '<strong>Zincir takibi:</strong> her gün yapılan bir işi, yapılan günün hücresini işaretleyerek bütün yıl boyunca izlemek.',
    ] },
    { h: 'Gün yerleşimi nasıl hesaplanır?', p: [
      'Araç, seçtiğiniz yılın her günü için haftanın gününü takvim kurallarına göre hesaplar. Dört ile bölünebilen yıllar artık yıldır ve şubat 29 gün çeker; yüz ile bölünebilen yıllar bunun dışındadır, dört yüz ile bölünebilenler ise yine artık yıldır. Bu yüzden 2028 yılı 366 gün, 2100 yılı 365 gün, 2000 yılı 366 gün olarak çizilir.',
      'Örnek: 2027 yılı cuma günü başlar ve 365 gün sürdüğü için yine cuma günü biter. 2028 yılı cumartesi başlar; artık yıl olduğu için 31 Aralık 2028 pazar gününe denk gelir. Sonuç tablosunda yılın ilk ve son gününün hangi güne geldiğini görür, elinizdeki bir takvimle karşılaştırabilirsiniz.',
    ] },
    { h: 'Doldurma önerileri', p: [
      'Yıl çizelgesinde hücreler dardır; her güne iki üç kelimeden fazlası sığmaz. Bu sayfayı ayrıntı için değil, yılın iskeletini görmek için kullanın: işin adını kısaltın, uzun dönemleri hücreleri boyayarak gösterin ve sayfanın bir köşesine küçük bir renk anahtarı yazın. İş, aile ve kişisel planlar için üç ayrı renk çoğu zaman yeterlidir.',
      'Küçük takvimli düzende önemli günleri daire içine alıp yanına küçük bir numara koyabilir, aynı numarayı alttaki not kutusuna açıklamasıyla yazabilirsiniz. Böylece takvim temiz kalır, açıklamalar da kaybolmaz.',
      'Yıl içinde planlar değişir. Kesin olmayan tarihleri kurşun kalemle yazmak ya da küçük yapışkan şeritler kullanmak sayfayı yıl sonuna kadar okunur tutar.',
    ] },
    { h: 'Yazdırma ve büyütme', p: [
      'Yıl çizelgesini <strong>yatay</strong>, küçük takvimli düzeni <strong>dikey</strong> yönde ve %100 ölçekle yazdırın. Çizimler vektörel olduğu için dosyayı yazdırma penceresinden A3 kâğıda büyütüp duvar planlayıcısı olarak da kullanabilirsiniz; satırlar o ölçüde genişler ve elle yazmak kolaylaşır.',
      'A4 yıl çizelgesinde her gün hücresi yaklaşık 23 mm genişliğinde ve 5,5 mm yüksekliğindedir. A5 çizelgede hücreler yaklaşık 16 mm genişliğinde ve 4 mm yüksekliğinde kalır; bu boyut yazmaktan çok işaretlemek ve boyamak için uygundur. Günlere not yazacaksanız A4 ya da A3 tercih edin.',
    ] },
    { h: 'Sınırlar', p: [
      'Yıl 1900 ile 2200 arasında olmalıdır ve bir seferde en fazla 10 yıl üretilir. Resmî ve dinî tatiller sayfaya işlenmez; tarihleri yıldan yıla değişebildiği için bunları güncel bir kaynaktan bakarak elle işaretlemeniz gerekir. Küçük takvimli düzende hafta her zaman pazartesi başlar. Dosya yazdırılıp kalemle doldurulmak içindir, doldurulabilir form alanı içermez.',
    ] },
  ],
  faq: [
    ['Yıllık planlayıcı ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez ve istediğiniz yıl için sınırsız sayıda dosya oluşturabilirsiniz.'],
    ['Hangi yıllar için planlayıcı oluşturabilirim?', '1900 ile 2200 arasındaki her yıl için. Geçmiş yılların sayfasını arşiv ya da kayıt amacıyla, gelecek yıllarınkini önceden plan yapmak için kullanabilirsiniz.'],
    ['Artık yıllar doğru gösteriliyor mu?', 'Evet. Artık yıllarda şubat sütununda 29. gün açılır ve sonraki ayların gün adları buna göre kayar. Sonuç tablosunda yılın 365 mi 366 mı gün çektiği ayrıca yazılır.'],
    ['Yıl çizelgesinde koyu gri hücreler ne anlama geliyor?', 'O ayda bulunmayan günleri gösterir. Tablo her ay için 31 satır içerdiğinden, 30 ya da daha az gün çeken aylarda kalan satırlar koyu gri basılır ve yazı yazılmaz.'],
    ['Günlerin yanındaki iki harf nedir?', 'Gün adının kısaltmasıdır: Pt pazartesi, Sa salı, Ça çarşamba, Pe perşembe, Cu cuma, Ct cumartesi, Pz pazar. Hafta sonu hücreleri ayrıca açık gri dolguyla ayrılır.'],
    ['Duvara asmak için daha büyük basabilir miyim?', 'Evet. PDF vektörel olduğu için yazdırma penceresinde A3 ya da daha büyük kâğıda ölçekleyebilirsiniz. Kırtasiye ve fotokopi merkezleri dosyayı büyük boy olarak da basabilir.'],
    ['Her aya ayrı sayfa isteyenler ne yapmalı?', 'Bu araç bütün yılı tek sayfaya sığdırır. Her güne bol yazı alanı olan, ay başına bir sayfalık düzen için aylık planlayıcı aracını kullanabilirsiniz.'],
    ['Yazdığım yıl ya da başlık bir yere gönderiliyor mu?', 'Hayır. PDF dosyası tarayıcınızın içinde üretilir; girdiğiniz bilgiler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['aylik-planlayici', 'haftalik-planlayici', 'takvim-olustur', 'ozel-gunler-takvimi', 'hafta-numarasi'],
};
