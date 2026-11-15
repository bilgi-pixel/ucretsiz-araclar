export default {
  slug: 'eleme-tablosu-olustur',
  title: 'Eleme Turnuvası Tablosu Oluşturma',
  h1Tail: 'tek maç eleme eşleşmeleri',
  pageTitle: 'Eleme Turnuvası Tablosu Oluşturma – Eşleşme ve Tur Planı',
  description: 'Katılımcıları yazın; tek maç eleme usulü turnuva tablosunu, tur tur eşleşmeleri, bay geçenleri ve toplam maç sayısını oluşturun. Seri başı ya da kura seçeneği.',
  card: 'Katılımcı listesinden eleme usulü turnuva tablosu çıkarın: turlar, eşleşmeler, bay geçenler ve maç sayısı.',
  category: 'saglik',
  keywords: ['eleme tablosu oluşturma', 'turnuva tablosu hazırlama', 'eleme usulü fikstür', 'turnuva ağacı oluşturma', 'seri başı eşleşme', 'bay geçme hesaplama', 'çeyrek final yarı final tablosu', 'turnuva kura çekimi'],
  lead: 'Takım ya da oyuncu adlarını alt alta yazın; araç kaybedenin elendiği <strong>tek maç eleme tablosunu</strong> tur tur oluştursun. Katılımcı sayısı 2\'nin kuvveti değilse kimin ilk turu bay geçeceği otomatik belirlenir. Listeyi seri başı sırası olarak kullanabilir ya da kurayla karıştırabilirsiniz.',
  button: 'Oluştur',
  inputs: [
    { id: 'katilimcilar', label: 'Katılımcılar (her satıra bir ad)', type: 'textarea', placeholder: 'Ahmet\nZeynep\nMurat\nElif\nCan', wide: true, hint: 'En az 2, en çok 64 katılımcı. Seri başı kullanacaksanız en güçlüden başlayarak sıralayın.' },
    { id: 'yerlesim', label: 'Yerleşim', type: 'select', options: [['seri', 'Seri başı (liste sırası güç sırasıdır)'], ['kura', 'Kurayla karıştır']] },
  ],
  compute(v, h) {
    let adlar = h.lines(v.katilimcilar);
    if (adlar.length < 2) h.err('Eleme tablosu için en az 2 katılımcı gerekir; her satıra bir ad yazın.');
    if (adlar.length > 64) h.err('En çok 64 katılımcı girebilirsiniz.');
    const gorulen = new Set();
    for (const t of adlar) {
      const anahtar = t.toLocaleLowerCase('tr-TR');
      if (gorulen.has(anahtar)) h.err(`"${t}" adı birden fazla kez yazılmış; her katılımcının adı farklı olmalı.`);
      gorulen.add(anahtar);
    }
    if (v.yerlesim === 'kura') {
      adlar = adlar.slice();
      for (let i = adlar.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [adlar[i], adlar[j]] = [adlar[j], adlar[i]];
      }
    }
    const n = adlar.length;
    let boyut = 2;
    while (boyut < n) boyut *= 2;
    let sira = [1, 2];
    while (sira.length < boyut) {
      const yeni = sira.length * 2;
      sira = sira.flatMap((s) => [s, yeni + 1 - s]);
    }
    const turAdi = (yuva) => ({ 2: 'Final', 4: 'Yarı final', 8: 'Çeyrek final', 16: 'Son 16', 32: 'Son 32', 64: 'Son 64' })[yuva];
    let mevcut = sira.map((s) => (s <= n ? adlar[s - 1] : null));
    let macNo = 0, tur = 0, ilkTurMac = 0;
    const bloklar = [];
    while (mevcut.length > 1) {
      tur++;
      const satirlar = [`${tur}. Tur (${turAdi(mevcut.length)})`];
      const sonraki = [];
      const baylar = [];
      for (let i = 0; i < mevcut.length; i += 2) {
        const a = mevcut[i], b = mevcut[i + 1];
        if (a !== null && b !== null) {
          macNo++;
          satirlar.push(`Maç ${macNo}: ${a} - ${b}`);
          sonraki.push(`Maç ${macNo} galibi`);
        } else {
          const gecen = a !== null ? a : b;
          baylar.push(gecen);
          sonraki.push(gecen);
        }
      }
      if (baylar.length) satirlar.push('Bay: ' + baylar.join(', '));
      if (tur === 1) ilkTurMac = macNo;
      bloklar.push(satirlar.join('\n'));
      mevcut = sonraki;
    }
    return {
      rows: [
        ['Toplam maç', String(macNo)],
        ['Tur sayısı', String(tur)],
        ['Katılımcı sayısı', String(n)],
        ['Tablo büyüklüğü', String(boyut)],
        ['İlk turu bay geçen', String(boyut - n)],
        ['İlk tur maç sayısı', String(ilkTurMac)],
      ],
      text: bloklar.join('\n\n'),
      note: boyut === n ? 'Katılımcı sayısı 2\'nin kuvveti olduğu için bay geçen yok.' : `Tablo ${boyut} kişilik olduğundan ${boyut - n} katılımcı ilk turu maç yapmadan geçer; seri başı yerleşiminde bay hakkı listenin en üstündekilere verilir.`,
    };
  },
  cases: [
    { in: { katilimcilar: 'A\nB\nC\nD\nE\nF\nG\nH', yerlesim: 'seri' }, out: { 'Toplam maç': '7', 'Tur sayısı': '3', 'Tablo büyüklüğü': '8', 'İlk turu bay geçen': '0' }, text: '1. Tur (Çeyrek final)\nMaç 1: A - H\nMaç 2: D - E\nMaç 3: B - G\nMaç 4: C - F\n\n2. Tur (Yarı final)\nMaç 5: Maç 1 galibi - Maç 2 galibi\nMaç 6: Maç 3 galibi - Maç 4 galibi\n\n3. Tur (Final)\nMaç 7: Maç 5 galibi - Maç 6 galibi' },
    { in: { katilimcilar: 'A\nB\nC\nD\nE', yerlesim: 'seri' }, out: { 'Toplam maç': '4', 'Tur sayısı': '3', 'Tablo büyüklüğü': '8', 'İlk turu bay geçen': '3', 'İlk tur maç sayısı': '1' }, text: '1. Tur (Çeyrek final)\nMaç 1: D - E\nBay: A, B, C\n\n2. Tur (Yarı final)\nMaç 2: A - Maç 1 galibi\nMaç 3: B - C\n\n3. Tur (Final)\nMaç 4: Maç 2 galibi - Maç 3 galibi' },
    { in: { katilimcilar: 'A\nB', yerlesim: 'seri' }, out: { 'Toplam maç': '1', 'Tur sayısı': '1' }, text: '1. Tur (Final)\nMaç 1: A - B' },
    { in: { katilimcilar: 'A\nB\nC\nD', yerlesim: 'seri' }, out: { 'Toplam maç': '3', 'Tur sayısı': '2' }, text: '1. Tur (Yarı final)\nMaç 1: A - D\nMaç 2: B - C\n\n2. Tur (Final)\nMaç 3: Maç 1 galibi - Maç 2 galibi' },
    { in: { katilimcilar: 'A\nB\nC\nD\nE\nF', yerlesim: 'seri' }, out: { 'Toplam maç': '5', 'İlk turu bay geçen': '2', 'İlk tur maç sayısı': '2' }, textMatch: '^1\\. Tur \\(Çeyrek final\\)\\nMaç 1: D - E\\nMaç 2: C - F\\nBay: A, B\\n' },
    { in: { katilimcilar: 'S1\nS2\nS3\nS4\nS5\nS6\nS7\nS8\nS9\nS10\nS11\nS12\nS13\nS14\nS15\nS16', yerlesim: 'seri' }, out: { 'Toplam maç': '15', 'Tur sayısı': '4', 'İlk tur maç sayısı': '8' }, textMatch: '^1\\. Tur \\(Son 16\\)\\nMaç 1: S1 - S16\\n' },
    { in: { katilimcilar: 'A\nB\nC', yerlesim: 'kura' }, out: { 'Toplam maç': '2', 'Tur sayısı': '2', 'İlk turu bay geçen': '1' }, textMatch: 'Bay: [ABC]\\n\\n2\\. Tur \\(Final\\)\\nMaç 2: [ABC] - Maç 1 galibi$' },
    { in: { katilimcilar: 'Yalnız', yerlesim: 'seri' }, error: true },
    { in: { katilimcilar: '', yerlesim: 'seri' }, error: true },
    { in: { katilimcilar: 'Ali\nVeli\nALİ', yerlesim: 'seri' }, error: true },
  ],
  howto: [
    'Katılımcı adlarını her satıra bir tane gelecek şekilde yazın ya da listenizi yapıştırın.',
    'Güç sıralamasına göre adil bir tablo istiyorsanız adları en güçlüden en zayıfa doğru sıralayıp "Seri başı" seçeneğini kullanın.',
    'Sıralama yoksa ya da tarafsız bir çekiliş istiyorsanız "Kurayla karıştır" seçeneğini işaretleyin.',
    '"Oluştur" düğmesine basın. Toplam maç ve tur sayısı özet satırlarında, eşleşmeler altındaki kutuda listelenir.',
    'Tabloyu kopyalayın; turnuva ilerledikçe "Maç 1 galibi" gibi ifadelerin yerine kazananın adını yazarak güncelleyin.',
  ],
  sections: [
    { h: 'Eleme usulü nedir?', p: [
      'Eleme usulünde (tek maç eleme, "nakavt") her maçın kaybedeni turnuvadan çıkar, kazananı bir üst tura yükselir. Her turda katılımcı sayısı yarıya iner ve sonunda finalde iki katılımcı kalır. Kupa turnuvaları, tenis turnuvaları, okul ve mahalle turnuvaları, e-spor kupaları ve bilgi yarışmaları sıkça bu düzeni kullanır; çünkü az maçla şampiyon belirlenir ve her maç belirleyicidir.',
      'Lig usulünden temel farkı maç sayısındadır. 16 takımlı tek devreli bir lig 120 maç gerektirirken aynı 16 takım eleme usulünde 15 maçta şampiyonunu bulur. Bedeli ise tek bir yenilginin telafisinin olmamasıdır.',
    ] },
    { h: 'Maç ve tur sayısı nasıl bulunur?', p: [
      'Tek maç elemede toplam maç sayısı her zaman <strong>katılımcı sayısı − 1</strong>\'dir. Mantığı basittir: şampiyon dışındaki herkes tam bir kez yenilir ve her maç bir kişiyi eler. 8 katılımcıda 7, 5 katılımcıda 4, 64 katılımcıda 63 maç oynanır.',
      'Tur sayısı, katılımcı sayısına eşit ya da ondan büyük ilk 2 kuvvetinin üssüdür. 8 katılımcı için 2<sup>3</sup> = 8 olduğundan 3 tur (çeyrek final, yarı final, final); 16 katılımcı için 4 tur; 5 katılımcı için de tablo 8\'liğe tamamlandığından yine 3 tur vardır.',
    ], ul: [
      '<strong>2 katılımcı:</strong> 1 tur, 1 maç',
      '<strong>4 katılımcı:</strong> 2 tur, 3 maç',
      '<strong>8 katılımcı:</strong> 3 tur, 7 maç',
      '<strong>16 katılımcı:</strong> 4 tur, 15 maç',
      '<strong>32 katılımcı:</strong> 5 tur, 31 maç',
      '<strong>64 katılımcı:</strong> 6 tur, 63 maç',
    ] },
    { h: 'Bay geçme: katılımcı sayısı 2\'nin kuvveti değilse', p: [
      'Tablonun düzgün ilerleyebilmesi için ikinci turdaki katılımcı sayısının 2\'nin kuvveti olması gerekir. Bunu sağlamak için tablo bir üst kuvvete tamamlanır ve boş kalan yerlerin karşısına düşenler ilk turu maç yapmadan geçer. <strong>Bay sayısı = tablo büyüklüğü − katılımcı sayısı</strong>.',
      'Çözümlü örnek: 5 katılımcı (A, B, C, D, E) için tablo 8\'liktir, bay sayısı 8 − 5 = 3\'tür. Seri başı yerleşiminde bay hakkı ilk üç sıradaki A, B ve C\'ye verilir; ilk turda yalnızca D ile E karşılaşır. Yarı finalde A bu maçın galibiyle, B ise C ile oynar; finalle birlikte toplam 4 maç yapılır. Araç bu örneği tam olarak böyle üretir.',
    ] },
    { h: 'Seri başı yerleşimi nasıl yapılır?', p: [
      'Seri başı uygulamasının amacı, en güçlü katılımcıların turnuvanın başında birbirini elemesini önlemektir. Standart yerleşimde 1 numara ile 2 numara tablonun zıt yarılarına konur ve ancak finalde karşılaşabilir; 3 ve 4 numara da farklı çeyreklere düşer. İlk turda en güçlü, en zayıfla eşleşir.',
      '8 katılımcılı tabloda ilk tur eşleşmeleri sırasıyla 1–8, 4–5, 2–7 ve 3–6\'dır. İlk iki maçın galipleri bir yarı finalde, son iki maçın galipleri diğer yarı finalde buluşur. Sürpriz olmazsa yarı finaller 1–4 ve 2–3, final 1–2 olur. Listenizi güç sırasına göre yazdığınızda araç bu yerleşimi uygular.',
      'Güç sıralaması yoksa kura en adil yoldur. "Kurayla karıştır" seçeneği adları rastgele sıralar ve ardından aynı tablo yapısına yerleştirir; bay hakları da böylece kurayla dağıtılmış olur.',
    ] },
    { h: 'Uygulama önerileri', p: [
      'Tabloyu duyururken maç numaralarını koruyun; "Maç 5: Maç 1 galibi - Maç 2 galibi" satırı, kimin kiminle eşleşeceğini önceden belli eder ve tartışmayı önler. Üçüncülük maçı oynatmak isterseniz yarı finallerin kaybedenlerini ayrıca eşleştirmeniz yeterlidir; bu maç toplam sayıya dahil değildir.',
      'Katılımcı çoksa ve herkesin en az birkaç maç oynamasını istiyorsanız önce gruplarda lig usulü oynatıp grupların ilk sıralarını eleme tablosuna almak yaygın bir çözümdür. Bu durumda grup birincilerini listenin üst sıralarına, ikincilerini alt sıralarına yazarak seri başı yerleşiminden yararlanabilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca tek maç eleme tablosu üretir; çift eleme (kaybedenler tablosu), İsviçre sistemi ya da iki maçlı (rövanşlı) eşleşmeleri kapsamaz. Tarih, saat ve saha ataması yapmaz. En çok 64 katılımcı desteklenir. Kura, tarayıcınızın rastgele sayı üretecine dayanır; resmî organizasyonlarda kuranın tanıklar önünde çekilmesi önerilir.',
    ] },
  ],
  faq: [
    ['10 takımlı eleme turnuvasında kaç maç oynanır?', 'Katılımcı sayısının bir eksiği kadar, yani 9 maç oynanır. Tablo 16\'lığa tamamlanır, 6 takım ilk turu bay geçer, ilk turda 2 maç yapılır ve turnuva 4 turda biter.'],
    ['Bay geçmek ne demektir?', 'Bir katılımcının o turda rakibi olmadığı için maç yapmadan üst tura yükselmesidir. Katılımcı sayısı 2, 4, 8, 16, 32 ya da 64 değilse ilk turda bay geçenler olur.'],
    ['Bay hakkı kime verilir?', 'Seri başı yerleşiminde listenin en üstündeki katılımcılara, yani en güçlü kabul edilenlere verilir. Kurayla karıştırma seçildiğinde bay geçenler rastgele belirlenmiş olur.'],
    ['Seri başı neden kullanılır?', 'En güçlü katılımcıların erken turlarda karşılaşıp birbirini elemesini önlemek ve finalin olabildiğince güçlü iki isim arasında oynanmasını sağlamak için kullanılır. 1 ve 2 numaralı seri başları tablonun farklı yarılarına yerleştirilir.'],
    ['Üçüncülük maçını nasıl eklerim?', 'Araç üçüncülük maçını tabloya eklemez. İsterseniz iki yarı finalin kaybedenlerini finalden önce ayrıca karşılaştırabilirsiniz; bu durumda toplam maç sayısı bir artar.'],
    ['Aynı tabloyu tekrar üretebilir miyim?', '"Seri başı" seçiliyken aynı liste her zaman aynı tabloyu verir. "Kurayla karıştır" seçiliyken her tıklama yeni bir kura demektir; beğendiğiniz sonucu hemen kopyalayın.'],
    ['Eleme usulü mü, lig usulü mü seçmeliyim?', 'Zaman ve saha kısıtlıysa eleme usulü çok daha az maç gerektirir. Herkesin birden fazla maç oynamasını ve sonucun şansa daha az bağlı olmasını istiyorsanız lig usulü ya da grup aşamalı karma düzen daha uygundur.'],
    ['Yazdığım adlar bir yere kaydediliyor mu?', 'Hayır. Tablo tamamen tarayıcınızda oluşturulur; katılımcı adları sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['lig-fiksturu-olustur', 'rastgele-takim-olustur', 'gol-averaji-hesapla', 'satirlari-karistir', 'oyun-puan-tablosu'],
};
