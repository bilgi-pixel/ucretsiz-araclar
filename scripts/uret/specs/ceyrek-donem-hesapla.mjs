export default {
  slug: 'ceyrek-donem-hesapla',
  title: 'Tarihin Çeyrek Dönemini Bulma',
  h1Tail: 'Ç1, Ç2, Ç3, Ç4',
  pageTitle: 'Tarih Hangi Çeyrekte? Çeyrek Dönem (Ç1–Ç4) Hesaplama Aracı',
  description: 'Bir tarihin yılın hangi çeyreğine (Ç1, Ç2, Ç3, Ç4) düştüğünü bulun. Çeyreğin başlangıç ve bitiş tarihini, gün sayısını ve çeyrek sonuna kalan günü gösterir.',
  card: 'Bir tarihin hangi çeyrek döneme (Ç1–Ç4) düştüğünü, çeyreğin başlangıç-bitiş tarihlerini ve kalan gün sayısını bulun.',
  category: 'zaman',
  keywords: ['çeyrek dönem hesaplama', 'hangi çeyrekteyiz', 'yılın çeyrekleri', '3. çeyrek hangi aylar', 'q1 q2 q3 q4 ayları', 'çeyrek sonu tarihi', 'mali yıl çeyrek'],
  lead: 'Bir tarih seçin; yılın hangi <strong>çeyrek dönemine</strong> denk geldiğini, o çeyreğin hangi gün başlayıp bittiğini, kaç gün sürdüğünü ve çeyrek sonuna kaç gün kaldığını görün. Mali yılı ocak dışında bir ayda başlayan kurumlar için başlangıç ayı da seçilebilir.',
  button: 'Bul',
  inputs: [
    { id: 'tarih', label: 'Tarih', type: 'date' },
    { id: 'malibas', label: 'Yılın (mali yılın) başlangıç ayı', type: 'select', options: [['1', 'Ocak (takvim yılı)'], ['2', 'Şubat'], ['3', 'Mart'], ['4', 'Nisan'], ['5', 'Mayıs'], ['6', 'Haziran'], ['7', 'Temmuz'], ['8', 'Ağustos'], ['9', 'Eylül'], ['10', 'Ekim'], ['11', 'Kasım'], ['12', 'Aralık']], hint: 'Emin değilseniz Ocak olarak bırakın.' },
  ],
  compute(v, h) {
    const d = h.date(v.tarih, 'Tarih');
    const s = Number(v.malibas) || 1;
    if (!(s >= 1 && s <= 12)) h.err('Başlangıç ayını listeden seçin.');
    const y = d.getUTCFullYear(), m = d.getUTCMonth() + 1;
    const sira = (m - s + 12) % 12; // mali yılın kaçıncı ayı (0 tabanlı)
    const q = Math.floor(sira / 3) + 1;
    const bas = new Date(Date.UTC(y, m - 1 - (sira % 3), 1));
    const bit = new Date(Date.UTC(bas.getUTCFullYear(), bas.getUTCMonth() + 3, 0));
    const yilBas = new Date(Date.UTC(y, m - 1 - sira, 1));
    const yilBit = new Date(Date.UTC(yilBas.getUTCFullYear(), yilBas.getUTCMonth() + 12, 0));
    const aylar = [0, 1, 2].map((i) => h.ayAdi(((bas.getUTCMonth() + i) % 12) + 1)).join(', ');
    const rows = [
      ['Çeyrek', q + '. çeyrek (Ç' + q + ')'],
      ['Çeyreğin ayları', aylar],
      ['Çeyrek başlangıcı', h.fmtDate(bas)],
      ['Çeyrek bitişi', h.fmtDate(bit)],
      ['Çeyrekteki gün sayısı', (h.gunFarki(bas, bit) + 1) + ' gün'],
      ['Çeyreğin kaçıncı günü', (h.gunFarki(bas, d) + 1) + '. gün'],
      ['Çeyrek sonuna kalan', h.gunFarki(d, bit) + ' gün'],
      ['Yarıyıl', (q <= 2 ? 1 : 2) + '. yarıyıl'],
    ];
    if (s !== 1) rows.push(['Mali yıl', h.fmtDate(yilBas) + ' – ' + h.fmtDate(yilBit)]);
    return {
      rows,
      note: s === 1 ? 'Çeyrekler takvim yılına göre hesaplandı: Ç1 Ocak–Mart, Ç2 Nisan–Haziran, Ç3 Temmuz–Eylül, Ç4 Ekim–Aralık.' : 'Çeyrekler, ' + h.ayAdi(s) + ' ayında başlayan mali yıla göre hesaplandı.',
    };
  },
  cases: [
    { in: { tarih: '2026-08-15' }, out: { 'Çeyrek': '3. çeyrek (Ç3)', 'Çeyreğin ayları': 'Temmuz, Ağustos, Eylül', 'Çeyrek başlangıcı': '01.07.2026', 'Çeyrek bitişi': '30.09.2026', 'Çeyrekteki gün sayısı': '92 gün', 'Çeyreğin kaçıncı günü': '46. gün', 'Çeyrek sonuna kalan': '46 gün', 'Yarıyıl': '2. yarıyıl' } },
    { in: { tarih: '2024-02-29' }, out: { 'Çeyrek': '1. çeyrek (Ç1)', 'Çeyrek başlangıcı': '01.01.2024', 'Çeyrek bitişi': '31.03.2024', 'Çeyrekteki gün sayısı': '91 gün', 'Çeyreğin kaçıncı günü': '60. gün', 'Çeyrek sonuna kalan': '31 gün', 'Yarıyıl': '1. yarıyıl' } },
    { in: { tarih: '2026-12-31' }, out: { 'Çeyrek': '4. çeyrek (Ç4)', 'Çeyreğin kaçıncı günü': '92. gün', 'Çeyrek sonuna kalan': '0 gün' } },
    { in: { tarih: '2026-04-01' }, out: { 'Çeyrek': '2. çeyrek (Ç2)', 'Çeyreğin ayları': 'Nisan, Mayıs, Haziran', 'Çeyrekteki gün sayısı': '91 gün', 'Çeyreğin kaçıncı günü': '1. gün', 'Çeyrek sonuna kalan': '90 gün' } },
    { in: { tarih: '2026-02-10', malibas: '4' }, out: { 'Çeyrek': '4. çeyrek (Ç4)', 'Çeyrek başlangıcı': '01.01.2026', 'Çeyrek bitişi': '31.03.2026', 'Çeyrekteki gün sayısı': '90 gün', 'Çeyreğin kaçıncı günü': '41. gün', 'Çeyrek sonuna kalan': '49 gün', 'Yarıyıl': '2. yarıyıl', 'Mali yıl': '01.04.2025 – 31.03.2026' } },
    { in: { tarih: '2026-08-15', malibas: '7' }, out: { 'Çeyrek': '1. çeyrek (Ç1)', 'Çeyrek başlangıcı': '01.07.2026', 'Mali yıl': '01.07.2026 – 30.06.2027' } },
    { in: { tarih: '2026-01-20', malibas: '11' }, out: { 'Çeyrek': '1. çeyrek (Ç1)', 'Çeyreğin ayları': 'Kasım, Aralık, Ocak', 'Çeyrek başlangıcı': '01.11.2025', 'Çeyrek bitişi': '31.01.2026', 'Çeyrekteki gün sayısı': '92 gün', 'Çeyreğin kaçıncı günü': '81. gün', 'Çeyrek sonuna kalan': '11 gün' } },
    { in: { tarih: '' }, error: true },
    { in: { tarih: '31.04.2026' }, error: true },
  ],
  howto: [
    '"Tarih" alanına çeyreğini öğrenmek istediğiniz günü girin; bugünün, bir faturanın ya da bir raporun tarihi olabilir.',
    'Takvim yılıyla çalışıyorsanız ikinci alanı "Ocak" olarak bırakın. Kurumunuzun mali yılı başka bir ayda başlıyorsa o ayı seçin.',
    '"Bul" düğmesine basın. İlk satırda çeyreğin numarası, altında o çeyreğe giren üç ay ile başlangıç ve bitiş tarihleri görünür.',
    'Dönem kapanışına ne kadar süre kaldığını görmek için "Çeyrek sonuna kalan" satırına bakın.',
  ],
  sections: [
    { h: 'Çeyrek dönem nedir?', p: [
      'Çeyrek dönem, bir yılın dört eşit parçaya bölünmesiyle elde edilen üçer aylık dilimlerden her biridir. Türkçede "Ç1, Ç2, Ç3, Ç4" kısaltmalarıyla, İngilizce kaynaklarda ise "Q1, Q2, Q3, Q4" biçiminde yazılır. Şirketler satış ve kârlarını, kurumlar istatistiklerini, ekipler hedeflerini çoğunlukla çeyreklik dönemlerle izler; çünkü üç ay, mevsimsel dalgalanmayı görmeye yetecek kadar uzun, yıl bitmeden önlem almaya yetecek kadar kısadır.',
      'Takvim yılı esas alındığında çeyrekler şöyledir:',
    ], ul: [
      '<strong>Ç1 (1. çeyrek):</strong> Ocak, Şubat, Mart — 1 Ocak ile 31 Mart arası; 90 gün, artık yıllarda 91 gün',
      '<strong>Ç2 (2. çeyrek):</strong> Nisan, Mayıs, Haziran — 1 Nisan ile 30 Haziran arası; 91 gün',
      '<strong>Ç3 (3. çeyrek):</strong> Temmuz, Ağustos, Eylül — 1 Temmuz ile 30 Eylül arası; 92 gün',
      '<strong>Ç4 (4. çeyrek):</strong> Ekim, Kasım, Aralık — 1 Ekim ile 31 Aralık arası; 92 gün',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Takvim yılı için çeyrek numarası tek bir işlemle bulunur: ay numarasından 1 çıkarılır, 3\'e bölünür, bölümün tam kısmına 1 eklenir. Yani <strong>çeyrek = ⌊(ay − 1) ÷ 3⌋ + 1</strong>. Ağustos 8. aydır: (8 − 1) ÷ 3 = 2,33; tam kısım 2; 2 + 1 = 3. Ağustos ayındaki her tarih 3. çeyrektedir.',
      '15 Ağustos 2026 için adım adım gidelim. Çeyrek Ç3\'tür; 1 Temmuz 2026\'da başlar ve 30 Eylül 2026\'da biter. Temmuz 31, ağustos 31, eylül 30 gün çektiğinden çeyrek 92 gün sürer. 1 Temmuz birinci gün sayıldığında 15 Ağustos, 31 + 15 = <strong>46. gündür</strong>. Çeyrek sonuna ise ağustosun kalan 16 günü ile eylülün 30 günü, toplam <strong>46 gün</strong> vardır. Yani bu tarih, çeyreğin tam ortasına denk gelir.',
      'Artık yıl örneği: 29 Şubat 2024, birinci çeyreğin 31 + 29 = 60. günüdür. O yıl birinci çeyrek 91 gün sürer ve çeyrek sonuna 31 gün kalır.',
    ] },
    { h: 'Mali yıl ocakta başlamıyorsa', p: [
      'Her kurumun hesap dönemi takvim yılıyla örtüşmez. Bazı şirketler, okullar ve uluslararası kuruluşlar yıllarını nisan, temmuz ya da ekim gibi başka bir ayda başlatır. Böyle bir durumda çeyrek numaraları da kayar: mali yılı nisanda başlayan bir kurum için Nisan–Haziran Ç1, Ocak–Mart ise Ç4 olur.',
      'Araçta başlangıç ayını seçtiğinizde hesap şu şekilde yapılır: tarihin ayı ile başlangıç ayı arasındaki fark bulunur (eksi çıkarsa 12 eklenir), bu fark 3\'e bölünür ve tam kısmına 1 eklenir. Örneğin başlangıç ayı Nisan (4) ve tarih 10 Şubat 2026 olsun. Fark 2 − 4 + 12 = 10; 10 ÷ 3 = 3,33; tam kısım 3; sonuç <strong>Ç4</strong>. Bu çeyrek 1 Ocak 2026 ile 31 Mart 2026 arasındadır, 90 gün sürer; 10 Şubat çeyreğin 41. günüdür ve sona 49 gün kalmıştır. Mali yıl ise 1 Nisan 2025 – 31 Mart 2026 olarak ayrı bir satırda gösterilir.',
    ] },
    { h: 'Çeyrekler nerelerde kullanılır?', ul: [
      '<strong>Şirket raporları:</strong> ciro, kâr ve bütçe gerçekleşmeleri çeyreklik tablolarla karşılaştırılır; "geçen yılın aynı çeyreğine göre" ifadesi buradan gelir.',
      '<strong>Satış hedefleri ve primler:</strong> hedefler çoğu zaman çeyrek bazında konur; çeyrek sonuna kalan gün sayısı ekip için bir geri sayımdır.',
      '<strong>Ekonomi verileri:</strong> büyüme gibi birçok gösterge çeyreklik dönemlerle açıklanır ve haberlerde "üçüncü çeyrek verileri" biçiminde geçer.',
      '<strong>Proje yönetimi:</strong> yol haritaları "Ç2\'de teslim" gibi çeyrek hedefleriyle yazılır.',
      '<strong>Tablo ve muhasebe çalışmaları:</strong> tarih sütunundan çeyrek sütunu üretirken hangi tarihin hangi döneme girdiğini doğrulamak için.',
    ] },
    { h: 'Yarıyıl ve diğer dönemler', p: [
      'İki çeyrek bir yarıyıl eder. Ç1 ve Ç2 birinci yarıyılı, Ç3 ve Ç4 ikinci yarıyılı oluşturur; araç bunu da ayrı bir satırda verir. Takvim yılında birinci yarıyıl 181 gün (artık yıllarda 182), ikinci yarıyıl 184 gün sürer. Çeyreklerin gün sayılarının eşit olmaması, günlük ortalama hesaplarken dikkat edilmesi gereken bir ayrıntıdır: 90 günlük bir çeyrek ile 92 günlük bir çeyreğin toplamlarını doğrudan kıyaslamak yaklaşık yüzde ikilik bir fark yaratır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca takvim hesabı yapar. Vergi beyannamesi, geçici vergi ya da benzeri yükümlülüklerin dönemleri ve son günleri mevzuatla belirlenir ve zaman içinde değişebilir; bu tür işlemler için güncel mevzuatı kontrol edin ya da mali müşavirinize danışın. Bazı şirketlerin kullandığı 4-4-5 haftalık dönem düzeni gibi ay sınırlarına oturmayan özel takvimler de bu aracın kapsamı dışındadır.',
    ] },
  ],
  faq: [
    ['3. çeyrek hangi ayları kapsar?', 'Takvim yılında 3. çeyrek Temmuz, Ağustos ve Eylül aylarını kapsar; 1 Temmuz\'da başlar, 30 Eylül\'de biter ve 92 gün sürer.'],
    ['Q1, Q2, Q3, Q4 ne demek?', 'İngilizce "quarter" (çeyrek) sözcüğünün kısaltmasıdır. Q1 birinci çeyrek, Q4 dördüncü çeyrek anlamına gelir; Türkçe karşılığı olarak Ç1–Ç4 kullanılır.'],
    ['Hangi çeyrek en kısa, hangisi en uzundur?', 'Takvim yılında en kısa çeyrek 90 günle birinci çeyrektir (artık yıllarda 91 gün). Üçüncü ve dördüncü çeyrekler 92 günle en uzun olanlardır.'],
    ['Çeyreğin son günü nasıl bulunur?', 'Çeyreğin üçüncü ayının son günüdür: 31 Mart, 30 Haziran, 30 Eylül ve 31 Aralık. Mali yıl farklı bir ayda başlıyorsa araç bitiş tarihini seçtiğiniz aya göre hesaplar.'],
    ['Mali yıl başlangıç ayını neye göre seçmeliyim?', 'Kurumunuzun hesap dönemi hangi ayın birinde başlıyorsa onu seçin. Çoğu işletme takvim yılını kullanır; bu durumda Ocak seçili kalmalıdır.'],
    ['"Çeyrek sonuna kalan" günü nasıl sayıyor?', 'Seçilen tarih ile çeyreğin son günü arasındaki fark alınır; seçilen gün sayılmaz. Çeyreğin son gününü girerseniz sonuç 0 gün olur.'],
    ['Yarıyıl ile çeyrek arasındaki ilişki nedir?', 'Bir yarıyıl iki çeyrekten oluşur. Birinci ve ikinci çeyrek ilk yarıyılı, üçüncü ve dördüncü çeyrek ikinci yarıyılı meydana getirir.'],
    ['Seçtiğim tarih bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; tarih sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['yilin-kacinci-gunu', 'sure-yuzde-hesapla', 'ay-kac-gun', 'ayin-son-gunu', 'iso-hafta-tarihi-cevir'],
};
