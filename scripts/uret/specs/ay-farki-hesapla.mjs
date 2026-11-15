export default {
  slug: 'ay-farki-hesapla',
  title: 'İki Tarih Arası Ay Sayısı Hesaplama',
  h1Tail: 'tam ay, kalan gün',
  pageTitle: 'İki Tarih Arası Ay Sayısı Hesaplama – Kaç Ay Geçti?',
  description: 'İki tarih arasında kaç tam ay ve kaç gün olduğunu hesaplayın. Yıl-ay-gün dökümü, toplam gün, ondalık ay ve takvim ayı farkı birlikte gösterilir.',
  card: 'İki tarih arasındaki tam ay sayısını ve kalan günü bulun; yıl-ay-gün dökümü ve toplam gün sayısıyla birlikte.',
  category: 'zaman',
  keywords: ['iki tarih arası ay hesaplama', 'kaç ay geçti', 'ay farkı hesaplama', 'tarihler arası ay sayısı', 'kaç ay oldu hesaplama', 'ay sayma', 'kaç aylık hesaplama'],
  lead: 'İki tarih arasında <strong>kaç tam ay</strong> geçtiğini ve geriye kaç gün kaldığını hesaplayın. Kira, taksit, abonelik, sözleşme süresi ve kıdem gibi ay üzerinden sayılan işlerde elle saymanın yol açtığı bir aylık kaymaları önler.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'bitis', label: 'Bitiş tarihi', type: 'date' },
  ],
  compute(v, h) {
    let a = h.date(v.baslangic, 'Başlangıç tarihi');
    let b = h.date(v.bitis, 'Bitiş tarihi');
    let ters = false;
    if (b.getTime() < a.getTime()) { const t = a; a = b; b = t; ters = true; }
    const ayGun = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    // Başlangıca n ay ekler; hedef ayda o gün yoksa ayın son gününe çeker.
    const ayEkle = (d, n) => {
      const top = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(top / 12), m = top % 12;
      const dt = new Date(Date.UTC(2000, m, Math.min(d.getUTCDate(), ayGun(y, m))));
      dt.setUTCFullYear(y);
      return dt;
    };
    const takvim = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
    let ay = takvim;
    if (ayEkle(a, ay).getTime() > b.getTime()) ay -= 1;
    const gun = h.gunFarki(ayEkle(a, ay), b);
    const toplam = h.gunFarki(a, b);
    const yil = Math.floor(ay / 12), kalanAy = ay % 12;
    return {
      rows: [
        ['Tam ay sayısı', `${h.fmt(ay, 0)} ay`],
        ['Ay ve gün', `${h.fmt(ay, 0)} ay ${gun} gün`],
        ['Yıl, ay, gün', `${yil} yıl ${kalanAy} ay ${gun} gün`],
        ['Toplam gün', `${h.fmt(toplam, 0)} gün`],
        ['Ondalık ay (ortalama ay uzunluğuyla)', `${h.fmt(toplam / 30.436875, 2)} ay`],
        ['Takvim ayı farkı', `${h.fmt(takvim, 0)} ay`],
      ],
      note: (ters ? 'Bitiş tarihi başlangıçtan önce olduğu için tarihler yer değiştirilerek hesaplandı. ' : '')
        + 'Bitiş günü sayıma dahil değildir. Ayın 29, 30 ya da 31\'inde başlayan sürelerde, hedef ayda o gün yoksa ay dönümü ayın son günü kabul edilir.',
    };
  },
  cases: [
    { in: { baslangic: '15.01.2026', bitis: '10.03.2026' }, out: { 'Tam ay sayısı': '1 ay', 'Ay ve gün': '1 ay 23 gün', 'Toplam gün': '54 gün', 'Takvim ayı farkı': '2 ay' } },
    { in: { baslangic: '01.01.2020', bitis: '01.01.2026' }, out: { 'Tam ay sayısı': '72 ay', 'Yıl, ay, gün': '6 yıl 0 ay 0 gün', 'Toplam gün': '2.192 gün' } },
    { in: { baslangic: '01.01.2026', bitis: '01.04.2026' }, out: { 'Ay ve gün': '3 ay 0 gün', 'Toplam gün': '90 gün' } },
    { in: { baslangic: '31.01.2026', bitis: '28.02.2026' }, out: { 'Ay ve gün': '1 ay 0 gün', 'Toplam gün': '28 gün' } },
    { in: { baslangic: '29.02.2024', bitis: '28.02.2025' }, out: { 'Tam ay sayısı': '12 ay', 'Yıl, ay, gün': '1 yıl 0 ay 0 gün', 'Toplam gün': '365 gün' } },
    { in: { baslangic: '10.03.2026', bitis: '15.01.2026' }, out: { 'Ay ve gün': '1 ay 23 gün' } },
    { in: { baslangic: '05.06.2026', bitis: '05.06.2026' }, out: { 'Ay ve gün': '0 ay 0 gün', 'Toplam gün': '0 gün' } },
    { in: { baslangic: '20.11.2024', bitis: '15.11.2026' }, out: { 'Tam ay sayısı': '23 ay', 'Yıl, ay, gün': '1 yıl 11 ay 26 gün' } },
    { in: { baslangic: '31.02.2026', bitis: '10.03.2026' }, error: true },
    { in: { baslangic: '15.01.2026', bitis: '' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanına sürenin başladığı günü girin (sözleşme, işe giriş, ilk taksit gibi).',
    '"Bitiş tarihi" alanına sürenin sonunu ya da bugünün tarihini girin.',
    '"Hesapla" düğmesine basın; ilk satırda dolmuş tam ay sayısını, ikinci satırda kalan günle birlikte görürsünüz.',
    'Bir yılı aşan sürelerde "Yıl, ay, gün" satırını, gün bazlı işlemlerde "Toplam gün" satırını kullanın.',
    'Tarihleri ters sırada girdiyseniz araç bunları kendisi sıralar ve sonuç altındaki notta belirtir.',
  ],
  sections: [
    { h: 'Ay farkı nasıl sayılır?', p: [
      'Gün saymak kolaydır, çünkü her gün aynı uzunluktadır. Ay ise 28, 29, 30 ya da 31 gün sürebilir; bu yüzden "iki tarih arasında kaç ay var" sorusunun cevabı gün sayısını sabit bir sayıya bölerek bulunmaz. Gündelik hayatta ve sözleşmelerde kullanılan yöntem <strong>ay dönümü</strong> saymaktır: başlangıç tarihinin gün numarası her ay tekrar geldiğinde bir ay dolmuş olur.',
      'Araç da böyle çalışır. Başlangıç tarihine birer ay ekleyerek ilerler ve bitiş tarihini geçmeyen en büyük ay sayısını bulur; bu <strong>tam ay sayısıdır</strong>. Son ay dönümünden bitiş tarihine kadar kalan süre ise gün olarak yazılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Başlangıç 15 Ocak 2026, bitiş 10 Mart 2026 olsun. İlk ay dönümü 15 Şubat 2026\'dır ve bitiş tarihinden öncedir; bir ay dolmuştur. İkinci ay dönümü 15 Mart olurdu, ancak bitiş 10 Mart olduğu için ikinci ay dolmamıştır. 15 Şubat\'tan 10 Mart\'a kadar şubatın kalan 13 günü ve martın 10 günü, toplam 23 gün vardır. Sonuç: <strong>1 ay 23 gün</strong>. Aynı aralığın toplam uzunluğu 54 gündür.',
      'Dikkat ederseniz ocak ile mart arasında ay adına göre iki ay fark vardır. Araç bunu "Takvim ayı farkı" satırında ayrıca gösterir. Bu değer günleri hiç dikkate almaz; yalnızca iki tarihin hangi aylara düştüğüne bakar. "Ocak faturasından mart faturasına kaç dönem geçti" gibi sorularda bu satır, "kaç ay doldu" sorularında ilk satır kullanılır.',
    ] },
    { h: 'Ay sonlarında başlayan süreler', p: [
      '31 Ocak\'ta başlayan bir sürenin bir ay sonrası hangi gündür? Şubatta 31\'i olmadığı için yaygın uygulama, ay dönümünü o ayın son gününe çekmektir. Araç bu kuralı uygular: 31 Ocak 2026 ile 28 Şubat 2026 arası 1 ay 0 gün sayılır. Aynı biçimde 29 Şubat 2024\'te başlayan bir süre 28 Şubat 2025\'te 12 ayını doldurur.',
      'Bu kural hesap tablolarındaki ay ekleme işlevlerinin ve pek çok bankacılık uygulamasının davranışıyla uyumludur; yine de bazı sözleşmeler ya da kurumlar farklı bir sayım yöntemi öngörebilir. Hukuki ya da mali sonucu olan sürelerde ilgili sözleşme metnini ve güncel mevzuatı esas alın.',
    ] },
    { h: 'Ondalık ay ne işe yarar?', p: [
      'Bazı hesaplarda süreyi tek bir sayı olarak ifade etmek gerekir; örneğin aylık ortalama harcama ya da aylık büyüme oranı hesaplarken. Araç bunun için toplam günü, Miladi takvimin ortalama ay uzunluğu olan 30,436875 güne böler. 54 günlük örnekte sonuç 1,77 aydır. Bu değer yaklaşık bir ölçüdür; tam ay ve gün dökümünün yerine geçmez, yalnızca oran hesaplarında kolaylık sağlar.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Kira ve abonelik:</strong> Sözleşmenin başlangıcından bugüne kaç kira dönemi dolduğunu bulmak.',
      '<strong>Taksit ve kredi:</strong> İlk ödeme tarihinden itibaren kaç taksitin vadesinin geldiğini kontrol etmek.',
      '<strong>Çalışma süresi:</strong> İşe giriş tarihinden bugüne geçen süreyi yıl, ay ve gün olarak yazmak.',
      '<strong>Garanti ve bakım:</strong> 24 aylık garanti süresinden kaç ay kaldığını görmek için satın alma tarihini ve bugünü girmek.',
      '<strong>Bebek ve çocuk gelişimi:</strong> Doğum tarihinden bugüne kaç aylık olduğunu hesaplamak.',
      '<strong>Proje planı:</strong> Başlangıç ve teslim tarihleri arasındaki süreyi ay olarak raporlamak.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Toplam günü 30\'a bölmek: 365 günlük bir yıl bu yöntemle 12,17 ay çıkar ve uzun sürelerde bir aylık sapmaya yol açar.',
      'Yalnızca ay numaralarını çıkarmak: 31 Ocak ile 1 Şubat arasında bir gün vardır, ama ay numaraları farkı 1\'dir.',
      'Bitiş gününü sayıma katıp katmamayı karıştırmak: araç bitiş gününü dahil etmez; 1 Ocak ile 1 Nisan arası tam 3 aydır. Son gün de dolacaksa bitiş tarihini bir gün ileri alın.',
      'Artık yılı unutmak: 2020 başından 2026 başına kadar 2.192 gün vardır, çünkü arada iki tane 29 Şubat bulunur.',
    ] },
  ],
  faq: [
    ['İki tarih arasında kaç ay olduğunu nasıl hesaplarım?', 'Başlangıç tarihinin gün numarasının bitiş tarihine kadar kaç kez tekrarlandığını sayarsınız. 15 Ocak\'tan 10 Mart\'a kadar yalnızca 15 Şubat geçtiği için 1 tam ay vardır; kalan süre 23 gündür. Araç bu sayımı otomatik yapar.'],
    ['Tam ay sayısı ile takvim ayı farkı arasındaki fark nedir?', 'Tam ay sayısı dolmuş ay dönümlerini sayar. Takvim ayı farkı ise günlere bakmadan iki tarihin ay numaralarını çıkarır. 31 Ocak ile 1 Şubat arasında tam ay sayısı 0, takvim ayı farkı 1\'dir.'],
    ['Bitiş günü hesaba dahil mi?', 'Hayır. Araç başlangıç gününden bitiş gününe kadar geçen süreyi ölçer; bitiş günü sayılmaz. Bitiş gününün sonuna kadar olan süreyi istiyorsanız bitiş tarihini bir gün sonrasına ayarlayın.'],
    ['31 Ocak ile 28 Şubat arası neden 1 ay sayılıyor?', 'Şubat ayında 31\'i bulunmadığı için ay dönümü ayın son gününe çekilir. Bu, ay sonunda başlayan sürelerde en yaygın kabul edilen yöntemdir. Farklı bir sayım kuralı gereken resmî işlemlerde ilgili düzenlemeye bakın.'],
    ['Tarihleri ters girersem ne olur?', 'Araç küçük tarihi başlangıç, büyük tarihi bitiş kabul ederek hesaplar ve sonuç altındaki notta tarihlerin yer değiştirdiğini belirtir. Sonuç her zaman pozitif bir süredir.'],
    ['Ondalık ay değeri neden tam ay sayısından farklı?', 'Ondalık ay, toplam gün sayısının ortalama ay uzunluğuna (30,436875 gün) bölünmesiyle bulunan yaklaşık bir değerdir. Aylar eşit uzunlukta olmadığı için tam ay ve gün dökümüyle birebir örtüşmez.'],
    ['Kıdem ya da ihbar süresi için bu sonuç geçerli mi?', 'Araç takvim hesabı yapar ve bilgilendirme amaçlıdır. Kıdem, ihbar, zamanaşımı gibi hukuki sürelerin başlangıcı, bitişi ve sayım biçimi mevzuatla belirlenir; kesin sonuç için güncel mevzuatı kontrol edin ya da bir uzmana danışın.'],
    ['Girdiğim tarihler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; tarihler hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hafta-farki-hesapla', 'yas-farki-hesapla', 'is-gunu-hesapla', 'vade-tarihi-hesapla', 'yas-ay-gun-hesapla', 'ay-kac-gun'],
};
