export default {
  slug: 'kitap-okuma-takip-cizelgesi',
  title: 'Kitap Okuma Takip Çizelgesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF okuma listesi ve günlük takip',
  pageTitle: 'Kitap Okuma Takip Çizelgesi Oluştur – Okuma Listesi PDF',
  description: 'Okuduğunuz kitapları ve günlük okuma miktarını yazacağınız kitap okuma takip çizelgesini PDF olarak oluşturun. Kitap listesi ve aylık günlük takip sayfaları.',
  card: 'Kitap listesi ve gün gün okunan sayfa takibi için yazdırılabilir okuma çizelgesini PDF olarak oluşturun; A4 ya da A5.',
  category: 'planlama',
  pdf: true,
  keywords: ['kitap okuma takip çizelgesi', 'okuma çizelgesi', 'kitap okuma listesi pdf', 'günlük kitap okuma takibi', 'okuma günlüğü şablonu', 'kitap takip tablosu', 'yazdırılabilir okuma çizelgesi', 'öğrenci okuma çizelgesi'],
  lead: 'Okuduğunuz kitapları ve her gün kaç sayfa okuduğunuzu kaydedebileceğiniz bir <strong>kitap okuma takip çizelgesi</strong> oluşturun. Dosyada iki tür sayfa bulunabilir: bitirdiğiniz kitapları puanıyla birlikte yazdığınız kitap listesi ve tarihleri hazır basılmış aylık günlük okuma tablosu.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'icerik', label: 'PDF içeriği', type: 'select', options: [['ikisi', 'Kitap listesi ve günlük takip'], ['liste', 'Yalnızca kitap listesi'], ['gunluk', 'Yalnızca günlük takip']] },
    { id: 'ay', label: 'Başlangıç ayı', type: 'date', hint: 'Günlük takip için; o aydan herhangi bir günü seçin. Boş bırakırsanız içinde bulunduğunuz ay kullanılır.' },
    { id: 'aySayisi', label: 'Ay sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Günlük takipte her ay bir sayfadır.' },
    { id: 'hedef', label: 'Günlük sayfa hedefi (isteğe bağlı)', type: 'number', placeholder: 'Örn. 20', hint: 'Yazarsanız günlük takip sayfasının başlığına basılır ve dönem hedefi hesaplanır.' },
    { id: 'kitaplar', label: 'Listeye hazır yazılacak kitaplar (isteğe bağlı)', type: 'textarea', placeholder: 'Birinci kitabın adı\nİkinci kitabın adı\nÜçüncü kitabın adı', hint: 'Her satıra bir kitap; en fazla 20 kitap, en fazla 30 karakter. Kitap listesi sayfasının ilk satırlarına basılır.', wide: true },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Defne\'nin Okuma Çizelgesi', hint: 'En fazla 30 karakter.', wide: true },
  ],
  compute(v, h) {
    const listeVar = v.icerik !== 'gunluk', gunlukVar = v.icerik !== 'liste';
    const ilk = h.dateOrToday(v.ay, 'Başlangıç ayı');
    const n = h.posint(v.aySayisi, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir; daha uzun dönem için aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Kitap Okuma Çizelgesi';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    const hedef = String(v.hedef ?? '').trim() === '' ? 0 : h.posint(v.hedef, 'Günlük sayfa hedefi');
    if (hedef > 1000) h.err('Günlük sayfa hedefi en fazla 1000 olabilir.');
    const kitap = h.lines(v.kitaplar);
    if (kitap.length && !listeVar) h.err('Hazır kitap adları yalnızca kitap listesi sayfasına basılır. İçeriğe kitap listesini ekleyin ya da kitap alanını boşaltın.');
    if (kitap.length > 20) h.err('En fazla 20 kitap adı hazır yazdırılabilir; kalanını listeye elle ekleyin.');
    if (kitap.some((s) => s.length > 30)) h.err('Kitap adları en fazla 30 karakter olabilir; uzun adı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12, tw = W - 2 * m;
    const pt = a5 ? 7.5 : 9.5, ust = m + 15, hh = a5 ? 6 : 7;
    const ustBilgi = (ops, sag) => {
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    };
    // Alt özet şeridi: etiket + yazma çizgisi
    const ozet = (ops, y, etiketler) => {
      const w = tw / etiketler.length;
      etiketler.forEach((e, j) => {
        const x = m + j * w, ew = e.length * pt * 0.2 + 2;
        ops.push(['yazi', e, x, y, pt, { kalin: true }]);
        ops.push(['cizgi', x + ew, y + 0.4, x + w - 4, y + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
      });
    };
    const sayfalar = [];
    let listeSatir = 0;
    // 1) Kitap listesi
    if (listeVar) {
      const ops = [], rh = a5 ? 6.8 : 8.5;
      listeSatir = Math.floor((H - m - ust - hh - 10) / rh);
      ustBilgi(ops, 'Okuma listesi');
      const SUT = [['No', 0.06], ['Kitap adı', 0.36], ['Yazar', 0.2], ['Sayfa', 0.09], ['Bitiş tarihi', 0.13], ['Puan', 0.16]];
      const xs = []; SUT.reduce((x, s) => { xs.push(x); return x + s[1] * tw; }, m);
      ops.push(['kutu', m, ust, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
      SUT.forEach((s, j) => ops.push(['yazi', s[0], xs[j] + 1.5, ust + hh - 2, pt - 0.5, { kalin: true }]));
      const pw = SUT[5][1] * tw, yr = a5 ? 1.3 : 1.6, adim = (pw - 4) / 5;
      for (let r = 0; r < listeSatir; r++) {
        const y = ust + hh + r * rh;
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', String(r + 1), xs[0] + SUT[0][1] * tw / 2, y + rh / 2 + pt * 0.12, pt - 0.5, { hiza: 'orta', ton: 0.4 }]);
        if (kitap[r]) ops.push(['yazi', kitap[r], xs[1] + 1.5, y + rh / 2 + pt * 0.12, pt]);
        for (let j = 0; j < 5; j++) ops.push(['daire', xs[5] + 2 + adim * (j + 0.5), y + rh / 2, yr, { dolgu: 1, cizgi: 0.4 }]);
      }
      for (let j = 1; j < xs.length; j++) ops.push(['cizgi', xs[j], ust, xs[j], ust + hh + listeSatir * rh, { kalinlik: 0.2, ton: 0.7 }]);
      ozet(ops, H - m - 2.5, ['Biten kitap', 'Toplam sayfa']);
      sayfalar.push(ops);
    }
    // 2) Aylık günlük takip
    const y0 = ilk.getUTCFullYear(), m0 = ilk.getUTCMonth();
    const ayBilgi = (i) => {
      const yil = y0 + Math.floor((m0 + i) / 12), ay = (m0 + i) % 12;
      return { yil, ay, gun: new Date(Date.UTC(yil, ay + 1, 0)).getUTCDate(), ad: `${h.ayAdi(ay + 1)} ${yil}` };
    };
    let toplamGun = 0;
    if (gunlukVar) {
      const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
      const SUT = a5 ? [['Gün', 0.3], ['Okunan sayfa', 0.35], ['Süre (dk)', 0.35]] : [['Gün', 0.15], ['Kitap', 0.37], ['Sayfa aralığı', 0.18], ['Okunan sayfa', 0.15], ['Süre (dk)', 0.15]];
      const blok = a5 ? 2 : 1, bw = (tw - (blok - 1) * 4) / blok;
      for (let i = 0; i < n; i++) {
        const A = ayBilgi(i), ops = [];
        toplamGun += A.gun;
        const per = a5 ? 16 : A.gun, rh = Math.min(a5 ? 9.6 : 8, (H - m - ust - hh - 12) / per);
        ustBilgi(ops, hedef ? `${A.ad}  ·  hedef: günde ${hedef} sayfa` : A.ad);
        for (let b = 0; b < blok; b++) {
          const bx = m + b * (bw + 4), xs = [];
          SUT.reduce((x, s) => { xs.push(x); return x + s[1] * bw; }, bx);
          ops.push(['kutu', bx, ust, bw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
          SUT.forEach((s, j) => ops.push(['yazi', s[0], xs[j] + 1.5, ust + hh - 2, pt - 0.5, { kalin: true }]));
          let y = ust + hh;
          for (let g = b * per + 1; g <= Math.min(A.gun, (b + 1) * per); g++) {
            const hg = new Date(Date.UTC(A.yil, A.ay, g)).getUTCDay(), sonu = hg === 0 || hg === 6;
            ops.push(['kutu', bx, y, bw, rh, sonu ? { dolgu: 0.93, cizgi: 0.55 } : { cizgi: 0.55 }]);
            ops.push(['yazi', String(g), bx + 1.5, y + rh / 2 + pt * 0.12, pt, { kalin: true }]);
            ops.push(['yazi', KISA[hg], bx + (a5 ? 7 : 8.5), y + rh / 2 + pt * 0.12, pt - 1, { ton: 0.35 }]);
            y += rh;
          }
          for (let j = 1; j < xs.length; j++) ops.push(['cizgi', xs[j], ust, xs[j], y, { kalinlik: 0.2, ton: 0.7 }]);
        }
        ozet(ops, H - m - 2.5, ['Ay toplamı', 'Okunan gün', 'Biten kitap']);
        sayfalar.push(ops);
      }
    }
    const sonAy = ayBilgi(n - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
        ['Kitap listesi', listeVar ? `${listeSatir} satır` : 'yok'],
        ['Günlük takip', gunlukVar ? (n === 1 ? ayBilgi(0).ad : `${ayBilgi(0).ad} – ${sonAy.ad}`) : 'yok'],
        ['Takip edilen gün', gunlukVar ? `${toplamGun} gün` : '—'],
        ['Günlük hedef', hedef ? `${hedef} sayfa` : 'belirtilmedi'],
        ['Dönem hedefi', hedef && gunlukVar ? `${h.fmt(hedef * toplamGun, 0)} sayfa` : '—'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin. Dönem hedefi, günlük hedefin takip edilen gün sayısıyla çarpımıdır.',
      pdf: { ad: 'kitap-okuma-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { ay: '2026-11-18', aySayisi: '1', hedef: '20' }, out: { 'Sayfa sayısı': '2 sayfa', 'Kitap listesi': '28 satır', 'Günlük takip': 'Kasım 2026', 'Takip edilen gün': '30 gün', 'Günlük hedef': '20 sayfa', 'Dönem hedefi': '600 sayfa' }, pdfSayfa: 2 },
    { in: { ay: '2026-11-18', aySayisi: '3', hedef: '25', boyut: 'a5' }, out: { 'Sayfa sayısı': '4 sayfa', 'Kitap listesi': '23 satır', 'Günlük takip': 'Kasım 2026 – Ocak 2027', 'Takip edilen gün': '92 gün', 'Dönem hedefi': '2.300 sayfa', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 4 },
    { in: { icerik: 'gunluk', ay: '2028-02-29', aySayisi: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'Kitap listesi': 'yok', 'Günlük takip': 'Şubat 2028', 'Takip edilen gün': '29 gün', 'Günlük hedef': 'belirtilmedi', 'Dönem hedefi': '—' }, pdfSayfa: 1 },
    { in: { icerik: 'liste', ay: '2026-11-18', kitaplar: 'Roman A\nÖykü kitabı B\nŞiir kitabı C', baslik: 'Sınıf Kitaplığı' }, out: { 'Sayfa sayısı': '1 sayfa', 'Kitap listesi': '28 satır', 'Günlük takip': 'yok', 'Takip edilen gün': '—' }, pdfSayfa: 1 },
    { in: { ay: '2027-01-01', aySayisi: '12', hedef: '10' }, out: { 'Sayfa sayısı': '13 sayfa', 'Günlük takip': 'Ocak 2027 – Aralık 2027', 'Takip edilen gün': '365 gün', 'Dönem hedefi': '3.650 sayfa' }, pdfSayfa: 13 },
    { in: { icerik: 'gunluk', ay: '2027-02-10', aySayisi: '2', boyut: 'a5' }, out: { 'Günlük takip': 'Şubat 2027 – Mart 2027', 'Takip edilen gün': '59 gün' }, pdfSayfa: 2 },
    { in: { ay: '2026-11-18', aySayisi: '13' }, error: true },
    { in: { ay: '2026-11-18', aySayisi: '1', hedef: '0' }, error: true },
    { in: { icerik: 'gunluk', ay: '2026-11-18', kitaplar: 'Roman A' }, error: true },
    { in: { ay: '2026-11-18', kitaplar: 'Bu kitap adı otuz karakterden çok daha uzun bir addır' }, error: true },
  ],
  howto: [
    '"PDF içeriği" seçeneğinden kitap listesini, günlük takip tablosunu ya da ikisini birlikte seçin.',
    'Günlük takip için "Başlangıç ayı" alanından ilk aydan bir gün seçin ve "Ay sayısı" alanına kaç ay istediğinizi yazın. Her ay ayrı bir sayfa olur.',
    'İsterseniz "Günlük sayfa hedefi" alanına bir sayı yazın. Hedef, günlük takip sayfasının başlığına basılır ve sonuç tablosunda dönem hedefi olarak çarpılır.',
    'Okumayı planladığınız kitapları "Listeye hazır yazılacak kitaplar" alanına satır satır ekleyebilirsiniz; kitap listesinin ilk satırlarına basılır.',
    'Kâğıt boyutunu ve başlığı belirleyip "Çizelgeyi oluştur" düğmesine basın; "PDF indir" ile dosyayı kaydedin ve %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Kitap listesi sayfası', p: [
      'Bu sayfa okuduğunuz ya da okumayı planladığınız kitapların dökümüdür. Numaralı satırlarda kitap adı, yazar, sayfa sayısı ve bitiş tarihi için hücreler, en sağda ise beş küçük daireden oluşan bir puan alanı bulunur. Kitabı bitirdiğinizde beğeninize göre daireleri boyarsınız; üç dolu daire "fena değil", beş dolu daire "herkese öneririm" anlamına gelebilir, ölçeği siz belirlersiniz.',
      'A4 kâğıtta 28, A5 kâğıtta 23 satır vardır. Kitap adlarını önceden yazdırdıysanız bunlar ilk satırlara basılır; yazar, sayfa ve tarih hücreleri yine boş kalır. Sayfanın en altındaki "Biten kitap" ve "Toplam sayfa" çizgilerine dönem sonunda toplamları yazarsınız.',
    ] },
    { h: 'Günlük takip sayfası', p: [
      'Her ay için ayrı bir sayfa hazırlanır ve ayın günleri alt alta sıralanır. Gün numarasının yanında haftanın gününün kısaltması yazar; cumartesi ve pazar satırları açık gri zeminlidir. Ayın gün sayısı takvime göre belirlenir: Şubat 2028 sayfasında 29, Şubat 2027 sayfasında 28 satır bulunur.',
      '<strong>A4 kâğıtta</strong> her günün karşısında dört hücre vardır: o gün okuduğunuz kitabın adı, sayfa aralığı (örneğin 45–72), okunan sayfa sayısı ve dakika olarak süre. <strong>A5 kâğıtta</strong> satırların yazılabilir yükseklikte kalması için ay iki blok hâlinde yan yana basılır (1–16 ve 17–31) ve yalnızca okunan sayfa ile süre sütunları yer alır. Sayfanın altında ay toplamı, okuma yapılan gün sayısı ve o ay biten kitap sayısı için üç çizgi bulunur.',
    ] },
    { h: 'Günlük hedef ve dönem hedefi: çözümlü örnek', p: [
      'Günlük sayfa hedefi yazdığınızda araç bunu takip edilen gün sayısıyla çarparak dönem hedefini gösterir. Kasım 2026 otuz gün çeker; günde 20 sayfa hedefiyle ay sonunda 20 × 30 = 600 sayfa okunmuş olur. Bu, ortalama 300 sayfalık iki kitap demektir.',
      'Üç aylık bir dönemde hesap şöyle ilerler: Kasım 2026 (30 gün), Aralık 2026 (31 gün) ve Ocak 2027 (31 gün) toplam 92 gün eder. Günde 25 sayfalık hedefle dönem hedefi 25 × 92 = 2.300 sayfadır. Bütün bir yıl için, 2027 yılının 365 gününde günde yalnızca 10 sayfa okumak 3.650 sayfa yapar. Küçük ama kesintisiz bir günlük miktarın yıl sonunda ulaştığı toplamı görmek, çizelgenin en ikna edici yanıdır.',
    ] },
    { h: 'Okuma alışkanlığı için öneriler', ul: [
      '<strong>Hedefi küçük seçin.</strong> Her gün tutturulan 10 sayfa, iki gün sonra bırakılan 50 sayfadan daha çok kitap bitirir. Hedefi birkaç hafta sonra artırmak her zaman mümkündür.',
      '<strong>Okumayı sabit bir ana bağlayın.</strong> Yatmadan önce, kahvaltıdan sonra ya da serviste; yeri ve saati belli olan alışkanlık daha kolay yerleşir.',
      '<strong>Aynı gün kaydedin.</strong> Çizelgeyi kitabın arasında ya da başucunda tutun; ertesi güne kalan kayıt çoğu zaman unutulur.',
      '<strong>Boş günü telafi etmeye çalışmayın.</strong> Atlanan günün satırını boş bırakıp ertesi gün normal miktarla devam etmek, birikmiş borç duygusuyla okumayı bırakmaktan iyidir.',
      '<strong>Sayfa yerine süre de yazabilirsiniz.</strong> Sayfa düzeni kitaptan kitaba değişir; yoğun bir metinde 10 sayfa ile resimli bir kitapta 10 sayfa aynı emek değildir. Süre sütunu bu farkı dengeler.',
      '<strong>Ay sonunda toplayın.</strong> Okunan gün sayısını ve toplam sayfayı alttaki çizgilere yazmak, bir sonraki ayın hedefini gerçekçi belirlemenize yardım eder.',
    ] },
    { h: 'Okulda ve evde kullanım', p: [
      'Sınıf öğretmenleri ve Türkçe öğretmenleri çizelgeyi öğrencilere dağıtıp ay sonunda toplayarak sınıfın okuma düzenini izleyebilir; başlık alanına öğrencinin ya da sınıfın adı yazılabilir. Veliler küçük çocuklarla birlikte doldurduğunda her akşam işaretlenen satır, okuma saatini görünür bir rutine dönüştürür. Okuma kulüpleri ortak okunan kitapları liste sayfasına önceden yazdırıp üyelerin puanlarını karşılaştırabilir. Çizelge bir yarış aracı olarak değil, kişinin kendi düzenini görmesi için kullanıldığında daha yararlıdır.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A5 sayfaları A4 yazıcıdan "sayfa başına 2 sayfa" seçeneğiyle alıp ortadan kesebilir, kitabın arasına ayraç gibi koyabilirsiniz. Birkaç aylık çıktıyı zımbalayıp küçük bir okuma defteri yapmak da mümkündür.',
      'Bir seferde en fazla 12 aylık günlük takip üretilir. Kitap listesine en fazla 20 ad hazır yazdırılabilir ve adlar 30 karakteri geçemez; daha uzun adları kısaltarak yazın. Araç okuma hızınızı ölçmez, kitap önermez ve toplamları hesaplamaz; hücreler elle doldurulur. Dosya doldurulabilir form değildir.',
    ] },
  ],
  faq: [
    ['Kitap okuma takip çizelgesi ücretsiz mi?', 'Evet. Çizelgeyi sınırsız sayıda oluşturup indirebilir ve yazdırabilirsiniz; kayıt ya da ücret yoktur. Öğretmenler sınıfları için çoğaltabilir.'],
    ['Kitap listesi ile günlük takip arasındaki fark nedir?', 'Kitap listesi bitirdiğiniz kitapların dökümüdür: ad, yazar, sayfa sayısı, bitiş tarihi ve puan. Günlük takip ise ayın her günü için o gün ne kadar okuduğunuzu yazdığınız tablodur. İkisini birlikte ya da ayrı ayrı alabilirsiniz.'],
    ['Günlük hedef yazmak zorunda mıyım?', 'Hayır. Alanı boş bırakırsanız başlıkta yalnızca ay ve yıl yazar. Hedef yazarsanız başlığa "hedef: günde 20 sayfa" gibi bir hatırlatma eklenir ve sonuç tablosunda dönem hedefi gösterilir.'],
    ['Dönem hedefi nasıl hesaplanıyor?', 'Günlük sayfa hedefi, seçtiğiniz ayların toplam gün sayısıyla çarpılır. Örneğin Kasım 2026 için günde 20 sayfa, 30 günde 600 sayfa eder. Şubat ayının 28 ya da 29 çekmesi hesaba katılır.'],
    ['A5 sayfada neden kitap adı sütunu yok?', 'A5 kâğıtta 31 günü tek sütuna dizmek satırları yazılamayacak kadar daraltır. Bu yüzden ay iki bloğa bölünür ve yalnızca okunan sayfa ile süre sütunları basılır. Kitap adını da yazmak istiyorsanız A4 seçin.'],
    ['Çocuğum için kullanabilir miyim?', 'Evet. Başlığa çocuğunuzun adını yazabilir, hedefi yaşına uygun küçük bir sayı seçebilirsiniz. Okuma yazmayı yeni öğrenen çocuklarda sayfa yerine süre sütununu doldurmak daha anlamlı olabilir.'],
    ['Puan dairelerini nasıl kullanmalıyım?', 'Beş dairelik alan kitabı bitirdiğinizde kişisel değerlendirmeniz içindir; beğeninize göre bir ile beş arasında daire boyarsınız. Ölçeğin anlamını siz belirlersiniz, araç bir puanlama sistemi dayatmaz.'],
    ['Yazdığım kitap adları kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; kitap adları, başlık ve tarihler hiçbir sunucuya gönderilmez. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['kitap-okuma-suresi-hesapla', 'aliskanlik-takip-cizelgesi', 'otuz-gunluk-hedef-cizelgesi', 'ders-calisma-cizelgesi', 'aylik-planlayici'],
};
