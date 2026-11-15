export default {
  slug: 'ters-oranti-hesapla',
  title: 'Ters Orantı Hesaplama',
  h1Tail: 'a₁ × b₁ = a₂ × b₂',
  pageTitle: 'Ters Orantı Hesaplama – İşçi, Hız ve Süre Problemleri İçin',
  description: 'Ters orantılı iki çokluktan bilinmeyeni hesaplayın. İşçi-gün, hız-süre, musluk-saat problemlerinde yeni değeri, sabit çarpımı ve yüzde değişimi gösterir.',
  card: 'Ters orantılı iki büyüklükte bilinmeyen değeri bulun: işçi sayısı artınca süre, hız artınca yolculuk zamanı ne olur?',
  category: 'matematik',
  keywords: ['ters orantı hesaplama', 'ters orantı formülü', 'ters orantı problemleri', 'işçi gün problemi', 'hız zaman ters orantı', 'orantı hesaplama', 'ters orantılı çokluklar', 'doğru orantı ters orantı farkı'],
  lead: 'Biri artarken diğeri aynı oranda azalan iki büyüklükten birinin yeni değerini bulun. Başlangıçtaki iki değeri ve birinci büyüklüğün yeni değerini yazın; araç <strong>a₁ × b₁ = a₂ × b₂</strong> eşitliğinden bilinmeyeni hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'a1', label: 'Birinci büyüklük: ilk değer (a₁)', type: 'number', placeholder: 'Örn. 6 (işçi)' },
    { id: 'b1', label: 'İkinci büyüklük: ilk değer (b₁)', type: 'number', placeholder: 'Örn. 12 (gün)' },
    { id: 'a2', label: 'Birinci büyüklük: yeni değer (a₂)', type: 'number', placeholder: 'Örn. 9 (işçi)', hint: 'İkinci büyüklüğün bu yeni değere karşılık gelen değeri hesaplanır.' },
  ],
  compute(v, h) {
    const a1 = h.pos(v.a1, 'Birinci büyüklük ilk değer');
    const b1 = h.pos(v.b1, 'İkinci büyüklük ilk değer');
    const a2 = h.pos(v.a2, 'Birinci büyüklük yeni değer');
    const k = a1 * b1;
    const b2 = k / a2;
    const degisim = (eski, yeni) => {
      const yuzde = (yeni / eski - 1) * 100;
      const metin = h.fmt(Math.abs(yuzde), 2);
      if (metin === '0') return 'Değişmedi';
      return `%${metin} ${yuzde > 0 ? 'artış' : 'azalış'}`;
    };
    return {
      rows: [
        ['İkinci büyüklüğün yeni değeri (b₂)', h.fmt(b2, 6)],
        ['Sabit çarpım (k = a × b)', h.fmt(k, 6)],
        ['Birinci büyüklükteki değişim', degisim(a1, a2)],
        ['İkinci büyüklükteki değişim', degisim(b1, b2)],
        ['Doğru orantı olsaydı', h.fmt(b1 * a2 / a1, 6)],
      ],
      note: 'b₂ = a₁ × b₁ ÷ a₂. Hesap, iki büyüklüğün çarpımının sabit kaldığını (örneğin her işçinin aynı hızda çalıştığını) varsayar.',
    };
  },
  cases: [
    { in: { a1: '6', b1: '12', a2: '9' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '8', 'Sabit çarpım (k = a × b)': '72', 'Birinci büyüklükteki değişim': '%50 artış', 'İkinci büyüklükteki değişim': '%33,33 azalış', 'Doğru orantı olsaydı': '18' } },
    { in: { a1: '90', b1: '4', a2: '120' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '3', 'Sabit çarpım (k = a × b)': '360', 'İkinci büyüklükteki değişim': '%25 azalış' } },
    { in: { a1: '4', b1: '10', a2: '8' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '5', 'Birinci büyüklükteki değişim': '%100 artış', 'İkinci büyüklükteki değişim': '%50 azalış' } },
    { in: { a1: '3', b1: '8', a2: '4' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '6', 'Sabit çarpım (k = a × b)': '24' } },
    { in: { a1: '5', b1: '12', a2: '8' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '7,5' } },
    { in: { a1: '10', b1: '6', a2: '4' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '15', 'Birinci büyüklükteki değişim': '%60 azalış', 'İkinci büyüklükteki değişim': '%150 artış' } },
    { in: { a1: '6', b1: '12', a2: '6' }, out: { 'İkinci büyüklüğün yeni değeri (b₂)': '12', 'İkinci büyüklükteki değişim': 'Değişmedi' } },
    { in: { a1: '6', b1: '12', a2: '0' }, error: true },
    { in: { a1: '-6', b1: '12', a2: '9' }, error: true },
    { in: { a1: '6', b1: '', a2: '9' }, error: true },
  ],
  howto: [
    'Problemdeki iki büyüklüğü belirleyin ve gerçekten ters orantılı olduklarından emin olun: biri iki katına çıktığında diğeri yarıya inmelidir.',
    'Birinci büyüklüğün başlangıç değerini (örneğin 6 işçi) ve ikinci büyüklüğün buna karşılık gelen değerini (12 gün) ilk iki alana yazın.',
    'Birinci büyüklüğün yeni değerini (9 işçi) üçüncü alana yazın.',
    '"Hesapla" düğmesine basın. İlk satırda ikinci büyüklüğün yeni değeri (8 gün) görünür.',
    'Son satırdaki "Doğru orantı olsaydı" değerini kendi sonucunuzla karşılaştırın; elle çözümde bu değeri bulduysanız orantıyı ters kurmuşsunuz demektir.',
  ],
  sections: [
    { h: 'Ters orantı nedir?', p: [
      'İki büyüklükten biri artarken diğeri <strong>aynı oranda</strong> azalıyorsa bu büyüklükler ters orantılıdır. Aynı işi yapan işçi sayısı iki katına çıkarsa iş yarı sürede biter; hız üç katına çıkarsa aynı yol üçte bir sürede alınır. Buradaki kilit ifade "aynı oranda" sözüdür: biri artarken diğerinin yalnızca azalması yetmez, çarpımlarının sabit kalması gerekir.',
      'Ters orantılı iki büyüklük a ve b ise <strong>a × b = k</strong> eşitliği sağlanır; k sayısına orantı sabiti denir. İşçi problemlerinde k toplam iş miktarını (işçi × gün), yol problemlerinde toplam yolu (hız × süre), havuz problemlerinde havuzun hacmini temsil eder. Grafiği doğru değil, eksenlere yaklaşan ama onlara değmeyen bir eğridir (hiperbol).',
    ] },
    { h: 'Formül', p: [
      'Çarpım sabit kaldığına göre iki durum için <strong>a₁ × b₁ = a₂ × b₂</strong> yazılır. Bilinmeyen b₂ ise: <strong>b₂ = a₁ × b₁ ÷ a₂</strong>.',
      'Doğru orantıda içler dışlar çarpımı yapılırken, ters orantıda aynı satırdaki değerler <strong>yan yana çarpılır</strong>. Okulda "ters orantıda düz çarpım, doğru orantıda çapraz çarpım" diye öğretilen kural budur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>İşçi problemi:</strong> 6 işçi bir işi 12 günde bitiriyor. Aynı işi 9 işçi kaç günde bitirir? Toplam iş 6 × 12 = 72 işçi-gündür. 72 ÷ 9 = <strong>8 gün</strong>. İşçi sayısı %50 artmış, süre %33,33 azalmıştır. Doğru orantı kurulsaydı 18 gün gibi mantıksız bir sonuç çıkardı: daha çok işçi işi daha geç bitiremez.',
      '<strong>Hız problemi:</strong> Saatte 90 kilometre hızla 4 saatte gidilen yol, saatte 120 kilometre hızla kaç saatte gidilir? Yol 90 × 4 = 360 kilometredir. 360 ÷ 120 = <strong>3 saat</strong>.',
      '<strong>Musluk problemi:</strong> Eş debili 3 musluk bir havuzu 8 saatte dolduruyor. 4 musluk kaç saatte doldurur? 3 × 8 = 24 musluk-saat; 24 ÷ 4 = <strong>6 saat</strong>.',
      '<strong>Azalan durumda:</strong> 10 makineyle 6 günde biten üretim, 4 makineyle 10 × 6 ÷ 4 = <strong>15 günde</strong> biter. Makine sayısı %60 azalırken süre %150 artar.',
    ] },
    { h: 'Yüzde değişimler neden eşit değildir?', p: [
      'Ters orantıda sık yapılan bir yanılgı, "biri %50 artarsa diğeri %50 azalır" diye düşünmektir. Yukarıdaki işçi örneğinde işçi sayısı %50 arttığında süre %50 değil, %33,33 azalmıştır. Çünkü birinci büyüklük 1,5 katına çıktığında ikinci büyüklük 1,5\'e bölünür; 1 ÷ 1,5 = 0,6667, yani %33,33\'lük azalış.',
      'Genel kural şudur: biri n katına çıkarsa diğeri n\'de birine iner. İki katına çıkma (%100 artış) yarıya inmeye (%50 azalış), dört katına çıkma dörtte bire inmeye (%75 azalış) karşılık gelir. Araç iki büyüklükteki yüzde değişimi ayrı satırlarda gösterir.',
    ] },
    { h: 'Doğru orantı mı, ters orantı mı?', p: [
      'Problemi çözmeden önce kendinize şu soruyu sorun: "Birinci büyüklük artarsa ikincisi artar mı, azalır mı?"',
    ], ul: [
      '<strong>Ters orantı:</strong> işçi sayısı – işin bitme süresi; hız – aynı yolu alma süresi; musluk sayısı – havuzun dolma süresi; kişi sayısı – erzağın yetme süresi; dişli çarkın diş sayısı – devir sayısı; kişi sayısı – sabit bir tutardan kişi başına düşen pay.',
      '<strong>Doğru orantı:</strong> alınan ürün miktarı – ödenen tutar; çalışılan saat – üretilen parça; hız – aynı sürede alınan yol; tüketim – fatura tutarı.',
      '<strong>İkisi de değil:</strong> yaş – boy, kenar uzunluğu – alan, sıcaklık – ısınma süresi gibi ilişkiler ne doğru ne ters orantılıdır; bunlara orantı kurulmaz.',
    ] },
    { h: 'Varsayımlar ve gerçek hayat', p: [
      'Ters orantı hesabı ideal koşulları varsayar: bütün işçiler aynı hızda çalışır, işçi sayısı artınca verim düşmez, hız yol boyunca sabittir. Gerçekte dar bir alanda işçi sayısını iki katına çıkarmak süreyi tam yarıya indirmeyebilir; bazı işler de sırayla yapılmak zorunda olduğundan bölüştürülemez. Yolculuklarda mola, trafik ve hız sınırları ortalama hızı değiştirir.',
      'Bu nedenle sonuç, okul problemleri için kesin, planlama işleri için ise bir ilk tahmindir. İş programı, teslim tarihi ya da maliyet gibi sonucu olan kararlarda gerçek verimlilik verilerini ve emniyet paylarını ayrıca değerlendirin.',
    ] },
    { h: 'Sınırlar', p: [
      'Üç değer de sıfırdan büyük olmalıdır; sıfır ya da negatif işçi, hız ya da süre anlamlı değildir. Araç iki büyüklük arasındaki basit ters orantıyı çözer. İşçi sayısı, günlük çalışma saati ve gün sayısının birlikte değiştiği bileşik orantı problemlerinde hesabı iki adımda yapabilirsiniz: önce işçi × saat çarpımını tek bir büyüklük olarak alın, sonra gün sayısını bulun. Sonuç altı ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['Ters orantı formülü nedir?', 'a₁ × b₁ = a₂ × b₂. İki büyüklüğün çarpımı her durumda aynı kalır. Bilinmeyen değer, bilinen çarpımın diğer değere bölünmesiyle bulunur: b₂ = a₁ × b₁ ÷ a₂.'],
    ['Ters orantı ile doğru orantı arasındaki fark nedir?', 'Doğru orantıda iki büyüklük birlikte artar ya da azalır ve bölümleri sabittir. Ters orantıda biri artarken diğeri azalır ve çarpımları sabittir. İşçi sayısı ile süre ters, ürün miktarı ile tutar doğru orantılıdır.'],
    ['6 işçi 12 günde bitirirse 9 işçi kaç günde bitirir?', '8 günde. Toplam iş 6 × 12 = 72 işçi-gündür; 9 işçiye bölündüğünde 72 ÷ 9 = 8 gün bulunur.'],
    ['Bir büyüklük %50 artarsa diğeri %50 mi azalır?', 'Hayır. Birinci büyüklük 1,5 katına çıktığında ikincisi 1,5\'e bölünür ve yaklaşık %33,33 azalır. Yüzde değişimler ancak katlar üzerinden hesaplanır; iki katına çıkma yarıya inmeye karşılık gelir.'],
    ['Problemin ters orantı olduğunu nasıl anlarım?', 'Birinci büyüklüğü zihninizde iki katına çıkarın. İkinci büyüklüğün yarıya inmesi gerekiyorsa ters orantıdır. Daha çok işçi, daha yüksek hız, daha çok musluk süreyi kısaltır; bunlar ters orantının tipik örnekleridir.'],
    ['Orantı sabiti (k) ne işe yarar?', 'k, iki büyüklüğün değişmeyen çarpımıdır ve problemin özünü taşır: toplam iş, toplam yol ya da toplam hacim. k bir kez bulunduktan sonra birinci büyüklüğün her değeri için ikinciyi k\'yi bölerek hesaplayabilirsiniz.'],
    ['Ondalıklı değer girebilir miyim?', 'Evet. Bütün alanlar ondalıklı sayıları kabul eder; ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz. Sonuç da gerektiğinde ondalıklı çıkar, örneğin 7,5 gün.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['oran-sadelestir', 'yuzde-degisim-hesapla', 'kesir-sadelestir', 'harmonik-ortalama-hesapla', 'agirlikli-ortalama-hesapla'],
};
