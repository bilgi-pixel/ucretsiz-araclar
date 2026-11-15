export default {
  slug: 'proje-planlayici',
  title: 'Proje Planlayıcı Oluşturma',
  h1Tail: 'haftalık zaman çizelgeli PDF',
  pageTitle: 'Proje Planlayıcı Oluştur – Haftalık Zaman Çizelgeli Proje Planı PDF',
  description: 'Görev, sorumlu ve hafta sütunlarından oluşan yazdırılabilir proje planlayıcıyı PDF olarak oluşturun. Hafta tarihleri hazır yazılır; isterseniz özet sayfası eklenir.',
  card: 'Görevleri hafta sütunlarına yayan zaman çizelgesini ve proje özeti sayfasını A4 ya da A5 PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['proje planlayıcı', 'proje planı şablonu', 'proje zaman çizelgesi', 'yazdırılabilir proje planı', 'iş programı çizelgesi', 'proje takip çizelgesi pdf', 'görev zaman planı'],
  lead: 'Bir projenin görevlerini hafta hafta gösteren, yazdırılabilir bir <strong>proje planlayıcı</strong> oluşturun. Solda görev ve sorumlu sütunları, sağda tarihleri hazır yazılmış hafta sütunları bulunur; isterseniz amaç, ekip, kilometre taşları ve riskler için ikinci bir özet sayfası eklenir.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'baslangic', label: 'Proje başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bugün alınır. Çizelge, seçtiğiniz günün haftasının pazartesisinden başlar.' },
    { id: 'hafta', label: 'Süre (hafta)', type: 'number', value: '8', hint: '4 ile 16 arasında. Her hafta bir sütundur.' },
    { id: 'satir', label: 'Görev satırı', type: 'select', options: [['12', '12 satır'], ['8', '8 satır (geniş)'], ['16', '16 satır'], ['20', '20 satır (sık)']] },
    { id: 'ozet', label: 'Proje özeti sayfası', type: 'select', options: [['evet', 'Eklensin'], ['hayir', 'Eklenmesin']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'ad', label: 'Proje adı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Mağaza Yenileme', hint: 'En fazla 40 karakter.' },
    { id: 'gorevler', label: 'Görevler (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir görev\nÖrn. Teklif toplama', hint: 'En fazla 20 satır, her biri en fazla 32 karakter. Boş bırakırsanız görev sütunu elle yazmak için boş basılır.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Proje başlangıç tarihi');
    const n = h.posint(v.hafta, 'Süre');
    if (n < 4 || n > 16) h.err('Süre 4 ile 16 hafta arasında olmalı; daha uzun projeleri aşamalara bölüp her aşama için ayrı çizelge oluşturun.');
    const gorev = h.lines(v.gorevler);
    if (gorev.length > 20) h.err('En fazla 20 görev yazabilirsiniz; fazlası için ikinci bir çizelge oluşturun.');
    for (const g of gorev) if (g.length > 32) h.err(`"${g.slice(0, 20)}…" görevi 32 karakterden uzun; kısaltın.`);
    const ad = (v.ad || '').trim() || 'Proje Planı';
    if (ad.length > 40) h.err('Proje adı en fazla 40 karakter olabilir.');
    const secili = ['8', '12', '16', '20'].includes(v.satir) ? Number(v.satir) : 12;
    const satir = Math.max(secili, gorev.length);
    const ozet = v.ozet !== 'hayir';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const son = h.gunEkle(pzt, n * 7 - 1);
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const sayfalar = [];
    // 1. sayfa: zaman çizelgesi
    {
      const ops = [];
      ops.push(['yazi', ad, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(pzt)} – ${h.fmtDate(son)}  ·  ${n} hafta`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 10 * k, alt = H - m - 9 * k, rh = (alt - y0 - bh) / satir;
      const cNo = 8 * k, cG = 62 * k, cS = 26 * k, x0 = m + cNo + cG + cS, ww = (iw - cNo - cG - cS) / n;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      for (let j = 1; j < n; j += 2) ops.push(['kutu', x0 + j * ww, y0 + bh, ww, alt - y0 - bh, { dolgu: 0.96, cizgi: 0.96, kalinlik: 0.1 }]);
      ops.push(['kutu', m, y0 + bh, iw, alt - y0 - bh, { cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y0 + 6.3 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Görev', m + cNo + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + cNo + cG + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      for (const x of [m + cNo, m + cNo + cG]) ops.push(['cizgi', x, y0, x, alt, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < n; j++) {
        const x = x0 + j * ww;
        ops.push(['cizgi', x, y0, x, alt, { kalinlik: 0.25, ton: 0.55 }]);
        ops.push(['yazi', `${j + 1}. hf`, x + ww / 2, y0 + 4.2 * k, F(6.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', gg(h.gunEkle(pzt, j * 7)), x + ww / 2, y0 + 8.3 * k, F(6), { hiza: 'orta', ton: 0.35 }]);
      }
      for (let j = 0; j < satir; j++) {
        const ry = y0 + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + rh / 2 + 1.1 * k, F(7.5), { hiza: 'orta', ton: 0.4 }]);
        if (gorev[j]) ops.push(['yazi', gorev[j], m + cNo + 2 * k, ry + rh / 2 + 1.1 * k, F(8)]);
      }
      ops.push(['yazi', 'Planlanan haftaları çizgiyle, tamamlanan haftaları boyayarak işaretleyin.', m, H - m - 2 * k, F(7.5), { ton: 0.4 }]);
      ops.push(['yazi', 'Güncelleme tarihi: ____ / ____ / ________', W - m, H - m - 2 * k, F(7.5), { hiza: 'sag', ton: 0.4 }]);
      sayfalar.push(ops);
    }
    // 2. sayfa: proje özeti
    if (ozet) {
      const ops = [];
      ops.push(['yazi', 'Proje Özeti', m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, av = H - m - y0, lw = iw * 0.52, rx = m + lw + 4 * k, rw = iw - lw - 4 * k;
      const alan = (x, y, w, hh, etiket, sat) => {
        ops.push(['kutu', x, y, w, hh, { cizgi: 0.55 }]);
        ops.push(['yazi', etiket, x + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
        const ara = (hh - 7 * k) / sat;
        for (let j = 1; j <= sat; j++) ops.push(['cizgi', x + 2 * k, y + 7 * k + j * ara - 1.2 * k, x + w - 2 * k, y + 7 * k + j * ara - 1.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
      };
      const a = av - 6 * k;
      alan(m, y0, lw, a * 0.3, 'Projenin amacı ve beklenen sonuç', 3);
      alan(m, y0 + a * 0.3 + 3 * k, lw, a * 0.3, 'Kapsam: neler dahil, neler değil?', 3);
      alan(m, y0 + a * 0.6 + 6 * k, lw, a * 0.4, 'Riskler ve alınacak önlemler', 4);
      const tablo = (y, hh, bas, sutun, sat, kutulu) => {
        const th = 6.5 * k, bb = 6.5 * k, rr = (hh - th - bb) / sat;
        ops.push(['kutu', rx, y, rw, hh, { cizgi: 0.55 }]);
        ops.push(['yazi', bas, rx + 2 * k, y + 4.7 * k, F(8.5), { kalin: true }]);
        ops.push(['kutu', rx, y + th, rw, bb, { dolgu: 0.9, cizgi: 0.55 }]);
        let x = rx;
        sutun.forEach(([etiket, oran], i) => {
          if (i) ops.push(['cizgi', x, y + th, x, y + hh, { kalinlik: 0.25, ton: 0.55 }]);
          ops.push(['yazi', etiket, x + 2 * k, y + th + 4.6 * k, F(7.5), { kalin: true }]);
          x += rw * oran;
        });
        for (let j = 0; j < sat; j++) {
          const ry = y + th + bb + j * rr;
          if (j) ops.push(['cizgi', rx, ry, rx + rw, ry, { kalinlik: 0.2, ton: 0.7 }]);
          if (kutulu) { const s = Math.min(3.8 * k, rr * 0.55); ops.push(['kutu', rx + rw * 0.925 - s / 2, ry + rr / 2 - s / 2, s, s, { cizgi: 0.4 }]); }
        }
      };
      const th2 = (av - 3 * k) / 2;
      tablo(y0, th2, 'Ekip ve görev dağılımı', [['Ad soyad', 0.45], ['Projedeki görevi', 0.55]], 6, false);
      tablo(y0 + th2 + 3 * k, th2, 'Kilometre taşları', [['Ulaşılacak nokta', 0.6], ['Tarih', 0.25], ['Tamam', 0.15]], 6, true);
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Zaman çizelgesi', `${n} hafta`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Görev satırı', `${satir} satır`],
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'proje-planlayici', baslik: ad, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '8' }, out: { 'Zaman çizelgesi': '8 hafta', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '10.01.2027 Pazar', 'Görev satırı': '12 satır', 'Sayfa sayısı': '2 sayfa' }, pdfSayfa: 2 },
    { in: { baslangic: '2027-01-01', hafta: '4', ozet: 'hayir', boyut: 'a5' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Son gün': '24.01.2027 Pazar', 'Sayfa sayısı': '1 sayfa', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', hafta: '16', satir: '20' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028', 'Son gün': '18.06.2028 Pazar', 'Görev satırı': '20 satır' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-16', hafta: '12', satir: '8', ad: 'Mağaza Yenileme', gorevler: 'Keşif ve ölçü alma\nTeklif toplama\nMalzeme siparişi\nBoya ve zemin\nRaf montajı\nAçılış hazırlığı' }, out: { 'Son gün': '07.02.2027 Pazar', 'Görev satırı': '8 satır' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-22', hafta: '16', satir: '8', boyut: 'a5', gorevler: 'G1\nG2\nG3\nG4\nG5\nG6\nG7\nG8\nG9\nG10' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026', 'Görev satırı': '10 satır', 'Son gün': '07.03.2027 Pazar' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-18', hafta: '3' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '17' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '8', gorevler: 'Bu görev adı otuz iki karakterlik sınırı açıkça aşıyor' }, error: true },
    { in: { baslangic: '31.02.2027', hafta: '8' }, error: true },
  ],
  howto: [
    'Projenin başlayacağı günü seçin. Çizelgenin ilk sütunu o günün içinde bulunduğu haftanın pazartesisidir; alanı boş bırakırsanız bu hafta alınır.',
    'Süreyi hafta olarak yazın (4–16). Her hafta, başında pazartesi tarihi yazan bir sütun olarak basılır.',
    'Görev satırı sayısını seçin. Görevleri biliyorsanız alttaki kutuya satır satır yazın; görev sütununa basılı gelirler. Yazdığınız görev sayısı seçtiğiniz satırdan fazlaysa tablo kendiliğinden uzar.',
    'Proje özeti sayfasını isteyip istemediğinizi ve kâğıt boyutunu belirleyin, isterseniz proje adını yazın.',
    '"Planlayıcıyı oluştur" düğmesine basıp önizlemeyi kontrol edin; "PDF indir" ile kaydedin ve yatay yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Zaman çizelgesi sayfası nasıl okunur?', p: [
      'İlk sayfa, proje yönetiminde çubuk çizelge olarak bilinen düzenin kâğıt karşılığıdır. Sol tarafta üç sabit sütun bulunur: sıra numarası, görevin adı ve o görevden sorumlu kişi. Sağ taraf hafta sütunlarına ayrılmıştır; her sütunun başında "1. hf", "2. hf" biçiminde hafta sırası ve o haftanın pazartesi tarihi gün.ay olarak yazar. Böylece "malzeme siparişi üçüncü haftada" dediğinizde herkes bunun hangi tarihe denk geldiğini sütun başından okur.',
      'Sütunlar birer atlayarak çok açık gri zeminle basılır; uzun bir satırı gözle izlerken yan sütuna kaymanızı önler. Sayfanın sağ üst köşesinde çizelgenin kapsadığı ilk ve son gün ile toplam hafta sayısı, sol altta işaretleme kuralı, sağ altta ise çizelgeyi en son ne zaman güncellediğinizi yazacağınız bir tarih alanı yer alır.',
    ] },
    { h: 'Çizelgeyi doldurma yöntemi', ol: [
      'Görevleri yapılış sırasına göre yukarıdan aşağıya yazın. Birbirine bağlı işleri alt alta getirmek, gecikmenin neyi etkileyeceğini görmeyi kolaylaştırır.',
      'Her görev için başlayacağı haftadan biteceği haftaya kadar olan kutuların ortasından kurşun kalemle yatay bir çizgi çekin. Bu, planınızdır.',
      'Hafta bittiğinde o haftada gerçekten çalışılan görevlerin kutusunu tükenmez kalemle ya da fosforlu kalemle boyayın. Çizgi ile boya arasındaki fark, planla gerçeğin farkıdır.',
      'Teslim, onay, açılış gibi tek günlük önemli noktaları ilgili kutuya küçük bir üçgen ya da yıldız çizerek gösterin ve özet sayfasındaki kilometre taşları tablosuna tarihiyle yazın.',
      'Plan değiştiğinde eski çizgiyi silmek yerine üstünü ince bir çizgiyle çizip yenisini altına çekin; sağ alttaki güncelleme tarihini yenileyin.',
    ] },
    { h: 'Çözümlü örnek: sekiz haftalık bir plan', p: [
      'Başlangıç tarihine 18 Kasım 2026 çarşamba yazıp süreyi 8 hafta seçtiğinizde çizelge 16 Kasım 2026 pazartesi ile başlar ve 10 Ocak 2027 pazar günü biter. Sütun başlarında sırasıyla 16.11, 23.11, 30.11, 07.12, 14.12, 21.12, 28.12 ve 04.01 yazar; yıl geçişi kendiliğinden hesaplanır.',
      'Küçük bir dükkânın yenilenmesini planladığınızı düşünelim. "Keşif ve ölçü alma" yalnızca birinci haftayı, "Teklif toplama" birinci ve ikinci haftayı, "Malzeme siparişi" üçüncü haftayı kaplar. "Boya ve zemin" dördüncü haftadan altıncı haftaya uzanır, "Raf montajı" altıncı ve yedinci haftadadır, "Açılış hazırlığı" ise sekizinci haftada kalır. Çizgileri çektiğinizde altıncı haftada iki işin çakıştığını ve aynı ustanın ikisine birden yetişemeyeceğini kâğıt üzerinde görürsünüz; planı iş başlamadan düzeltmek en ucuz düzeltmedir.',
    ] },
    { h: 'Proje özeti sayfası', p: [
      'İkinci sayfa, çizelgenin yanıtlamadığı soruları toplar. Sol yarıda üç alan vardır: projenin amacı ve beklenen sonuç, kapsam (nelerin dahil olduğu ve özellikle nelerin dahil <em>olmadığı</em>) ve riskler ile alınacak önlemler. Kapsam dışını yazmak çoğu zaman atlanır; oysa "bu işe elektrik tesisatı dahil değil" gibi tek bir cümle, sonradan çıkacak tartışmaların büyük bölümünü önler.',
      'Sağ yarıda iki tablo bulunur. "Ekip ve görev dağılımı" tablosuna altı kişiye kadar ad ve projedeki rol yazılır. "Kilometre taşları" tablosunda ulaşılacak nokta, tarihi ve tamamlandığında işaretlenecek bir kutu yer alır. Özet sayfasına ihtiyacınız yoksa ilgili seçeneği kapatıp yalnızca çizelgeyi alabilirsiniz.',
    ] },
    { h: 'Kimler için uygun?', ul: [
      '<strong>Küçük işletmeler:</strong> tadilat, taşınma, yeni ürün hazırlığı, fuar katılımı gibi birkaç haftaya yayılan işler.',
      '<strong>Öğrenciler:</strong> bitirme projesi, tez yazımı ya da grup ödevi için görev paylaşımı.',
      '<strong>Dernek ve topluluklar:</strong> etkinlik, kermes ya da gezi organizasyonu.',
      '<strong>Evde:</strong> düğün hazırlığı, ev tadilatı, bahçe düzenlemesi gibi çok adımlı kişisel işler.',
    ] },
    { h: 'Yazdırma önerileri ve sınırlar', p: [
      'Yazdırma penceresinde kâğıt yönünü yatay, ölçeği %100 seçin. Ekibin ortak göreceği bir duvara asacaksanız A4, klasörde ya da ajandada taşıyacaksanız A5 uygundur. On altı haftalık çizelgede sütunlar daralır; A5 kâğıtta sekiz ile on iki hafta arasını seçmek kutulara işaret koymayı kolaylaştırır.',
      'Çizelge en fazla 16 haftayı ve 20 görevi tek sayfada gösterir. Daha uzun projeleri aşamalara bölüp her aşama için ayrı bir çizelge üretmek, tek sayfaya sıkıştırmaktan daha okunaklı sonuç verir. Haftalar her zaman pazartesi başlar; resmî tatiller işlenmez. Araç görevler arasındaki bağımlılıkları, kritik yolu ya da kaynak yükünü hesaplamaz; bunlar için özel yazılımlar gerekir. Bu sayfa, planı sade biçimde görünür kılmak içindir.',
    ] },
  ],
  faq: [
    ['Proje planlayıcıyı kullanmak ücretli mi?', 'Hayır. Araç ücretsizdir, kayıt istemez; oluşturduğunuz PDF dosyasını dilediğiniz kadar yazdırıp çoğaltabilirsiniz.'],
    ['Çizelge neden seçtiğim günden değil pazartesiden başlıyor?', 'Sütunlar tam haftaları gösterdiği için araç, seçtiğiniz günün haftasının pazartesisini ilk sütun yapar. Perşembe günü başlayan bir projede ilk sütun yine o haftadır; yalnızca ilk üç günü boş kalır.'],
    ['Görevleri yazmadan boş çizelge alabilir miyim?', 'Evet. Görevler kutusunu boş bırakırsanız görev sütunu yalnızca numaralı boş satırlardan oluşur ve elle doldurursunuz.'],
    ['Yazdığım görev sayısı satır sayısından fazla olursa ne olur?', 'Tablo, yazdığınız görev sayısı kadar satıra uzatılır. Örneğin 8 satır seçip 10 görev yazarsanız çizelge 10 satırla basılır. Üst sınır 20 görevdir.'],
    ['16 haftadan uzun projeler için ne yapmalıyım?', 'Projeyi aşamalara bölün ve her aşama için aracı ayrı çalıştırın; ikinci çizelgenin başlangıç tarihini ilkinin bittiği haftanın ertesi pazartesisi seçin. Sayfaları yan yana astığınızda kesintisiz bir zaman çizgisi elde edersiniz.'],
    ['Hafta sütunlarındaki tarih neyi gösteriyor?', 'Her sütunun başındaki gün.ay bilgisi, o haftanın pazartesi gününün tarihidir. Sütun, o pazartesiden takip eden pazara kadar olan yedi günü kapsar.'],
    ['Özet sayfasını sonradan ayrı yazdırabilir miyim?', 'Evet. PDF iki sayfadan oluşur; yazdırma penceresinde yalnızca 2. sayfayı seçerek özet sayfasını, yalnızca 1. sayfayı seçerek çizelgeyi tek başına yazdırabilirsiniz.'],
    ['Proje adı ve görevlerim bir sunucuya gönderiliyor mu?', 'Hayır. Dosya tümüyle tarayıcınızda üretilir; yazdığınız proje adı, görevler ve tarihler hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['hedef-planlayici', 'toplanti-notu-sablonu', 'haftalik-planlayici', 'yapilacaklar-listesi-olustur', 'hafta-numarasi', 'aylik-planlayici'],
};
