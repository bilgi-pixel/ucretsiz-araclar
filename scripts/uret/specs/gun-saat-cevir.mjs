export default {
  slug: 'gun-saat-cevir',
  title: 'Gün Saat Çevirici',
  h1Tail: 'gün ↔ saat',
  pageTitle: 'Gün Saat Çevirici – Günü Saate, Saati Güne Çevirme Hesaplama',
  description: 'Günü saate, saati güne çevirin. 1 gün = 24 saat eşitliğiyle çalışır; "4 gün 4 saat" gösterimini, dakika, saniye ve hafta karşılıklarını da verir.',
  card: 'Günü saate, saati güne çevirin; gün-saat ayrımı, dakika, saniye ve hafta karşılıklarıyla birlikte.',
  category: 'birim',
  keywords: ['gün saat çevirme', '1 gün kaç saat', 'saat kaç gün', '72 saat kaç gün', '48 saat kaç gün', 'günü saate çevirme', 'saati güne çevirme'],
  lead: 'Gün cinsinden bir süreyi saate ya da saat cinsinden bir süreyi güne çevirin. Araç <strong>1 gün = 24 saat</strong> eşitliğini kullanır ve 100 saat gibi bir değeri "4 gün 4 saat" biçiminde de ayırır; kargo, vize, garanti ve teslim sürelerini yorumlarken kolaylık sağlar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Süre', type: 'number', placeholder: 'Örn. 72' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['saat', 'Saat → Gün'], ['gun', 'Gün → Saat']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const saat = v.yon === 'gun' ? x * 24 : x;
    const gun = saat / 24;
    const s = Math.round(saat * 1000) / 1000;
    const tamGun = Math.floor(s / 24);
    const kalan = s - tamGun * 24;
    const rGun = ['Gün', h.fmt(gun, 6) + ' gün'];
    const rSaat = ['Saat', h.fmt(saat, 4) + ' saat'];
    return {
      rows: [
        ...(v.yon === 'gun' ? [rSaat, rGun] : [rGun, rSaat]),
        ['Gün ve saat', `${h.fmt(tamGun, 0)} gün ${h.fmt(kalan, 3)} saat`],
        ['Dakika', h.fmt(saat * 60, 2) + ' dakika'],
        ['Saniye', h.fmt(saat * 3600, 0) + ' saniye'],
        ['Hafta', h.fmt(gun / 7, 6) + ' hafta'],
      ],
      note: '1 gün = 24 saat = 1.440 dakika = 86.400 saniye kabul edilmiştir (takvim günü).',
    };
  },
  cases: [
    { in: { deger: '72', yon: 'saat' }, out: { 'Gün': '3 gün', 'Gün ve saat': '3 gün 0 saat', 'Dakika': '4.320 dakika' } },
    { in: { deger: '7', yon: 'gun' }, out: { 'Saat': '168 saat', 'Hafta': '1 hafta' } },
    { in: { deger: '100', yon: 'saat' }, out: { 'Gün': '4,166667 gün', 'Gün ve saat': '4 gün 4 saat' } },
    { in: { deger: '36', yon: 'saat' }, out: { 'Gün': '1,5 gün', 'Gün ve saat': '1 gün 12 saat' } },
    { in: { deger: '1', yon: 'gun' }, out: { 'Saat': '24 saat', 'Saniye': '86.400 saniye' } },
    { in: { deger: '365', yon: 'gun' }, out: { 'Saat': '8.760 saat', 'Dakika': '525.600 dakika' } },
    { in: { deger: '0,5', yon: 'gun' }, out: { 'Saat': '12 saat' } },
    { in: { deger: '30', yon: 'gun' }, out: { 'Saat': '720 saat' } },
    { in: { deger: 'üç', yon: 'gun' }, error: true },
    { in: { deger: '-24', yon: 'saat' }, error: true },
  ],
  howto: [
    '"Süre" alanına saat ya da gün sayısını yazın; yarım gün için 0,5 gibi ondalıklı değer girebilirsiniz.',
    '"Çeviri yönü" listesinden Saat → Gün ya da Gün → Saat seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır çevirinin sonucudur; "Gün ve saat" satırı tam günleri ve artan saatleri ayrı gösterir.',
    'Daha ince ya da daha kaba bir birime ihtiyacınız varsa dakika, saniye ve hafta satırlarına bakın.',
  ],
  sections: [
    { h: 'Gün ve saat arasındaki formül', p: [
      'Bir takvim günü 24 saattir. Günden saate geçmek için gün sayısını 24 ile çarparsınız: <strong>saat = gün × 24</strong>. Saatten güne geçmek için saat sayısını 24\'e bölersiniz: <strong>gün = saat ÷ 24</strong>.',
      'Çözümlü örnek: 72 saat kaç gündür? 72 ÷ 24 = 3 gün; dakika olarak 72 × 60 = 4.320 dakika. İkinci örnek: 100 saat, 100 ÷ 24 = 4,166667 gün eder. Tam kısım 4 gündür, bu da 96 saat tutar; kalan 100 − 96 = 4 saattir. Yani 100 saat = 4 gün 4 saat. Ters yönde: bir hafta, yani 7 gün, 7 × 24 = 168 saattir.',
    ] },
    { h: 'Ondalık gün ne anlama gelir?', p: [
      'Bölme sonucu çoğu zaman tam çıkmaz. 1,5 gün, 1 gün 5 saat değil, 1 gün 12 saattir; çünkü 0,5 gün yarım gün, yani 12 saattir. Ondalık kısmı saate çevirmek için 24 ile çarpılır: 0,25 gün 6 saat, 0,75 gün 18 saat, 0,1 gün 2,4 saattir. Araç bu ayrımı "Gün ve saat" satırında sizin yerinize yapar.',
      'Proje planlarında ve bilimsel ölçümlerde ondalık gün tercih edilirken, gündelik konuşmada "4 gün 4 saat" gibi ayrık ifade daha anlaşılırdır. İki gösterim aynı süreyi anlatır; hangisinin kullanılacağı bağlama göre değişir.',
    ] },
    { h: 'Sık sorulan saat değerleri', ul: [
      '<strong>12 saat</strong> = 0,5 gün',
      '<strong>24 saat</strong> = 1 gün',
      '<strong>36 saat</strong> = 1,5 gün',
      '<strong>48 saat</strong> = 2 gün',
      '<strong>72 saat</strong> = 3 gün',
      '<strong>96 saat</strong> = 4 gün',
      '<strong>120 saat</strong> = 5 gün',
      '<strong>168 saat</strong> = 7 gün (1 hafta)',
      '<strong>240 saat</strong> = 10 gün',
      '<strong>720 saat</strong> = 30 gün',
      '<strong>8.760 saat</strong> = 365 gün',
    ] },
    { h: 'Gündelik hayatta nerede karşımıza çıkar?', p: [
      'Pek çok süre saat olarak duyurulur ama gün olarak planlanır. Kargo firmalarının "48 saat içinde teslim" ifadesi iki günü, bir kampanyanın "72 saat geçerli" olması üç günü anlatır. Bazı ilaç ve aşı takvimlerinde, test sonuçlarının geçerlilik süresinde ve seyahat belgelerinde "son 72 saat içinde alınmış" gibi koşullar bulunur; bu tür sürelerde sayımın hangi andan başladığı önemlidir ve ilgili kurumun açıklaması esas alınmalıdır.',
      'İş dünyasında servis düzeyi sözleşmeleri yanıt süresini saat olarak tanımlar; 120 saatlik çözüm süresi beş takvim günüdür. Makinelerin bakım aralıkları ve ampullerin ömrü çalışma saati cinsinden verilir: 8.760 saatlik sürekli çalışma tam bir yıla (365 güne) karşılık gelir. Bir cihazı günde ortalama 6 saat kullanıyorsanız 10.000 saatlik ömür yaklaşık 1.667 gün, yani dört buçuk yıl kadar sürer. Eğitimlerde "40 saatlik kurs" ifadesi ise günde 8 saatle 5 iş günü demektir; bu durumda bölen 24 değil günlük ders saatidir.',
    ] },
    { h: 'Takvim günü, iş günü ve çalışma saati', p: [
      'Bu araç bir günü kesintisiz 24 saat sayar. Ancak "gün" sözcüğü her bağlamda aynı anlama gelmez. İş günü hesabında hafta sonları ve resmî tatiller sayılmaz; çalışma saati hesabında ise bir gün çoğunlukla 8 saat gibi bir mesai süresiyle ölçülür. 80 saatlik bir iş yükü takvim olarak 3,33 gün eder, ama günde 8 saat çalışan biri için 10 iş günüdür. Çevirmek istediğiniz sürenin hangi gün tanımına dayandığını baştan belirlemek yanlış planlamayı önler.',
      'Hukuki ve resmî sürelerde günün nasıl sayılacağı, başlangıç gününün dahil edilip edilmeyeceği ve tatile denk gelen son günün durumu ilgili düzenlemelerle belirlenir. Bu tür sürelerde araç yalnızca aritmetik bir fikir verir; kesin süre için güncel mevzuatı kontrol edin ya da bir uzmana danışın.',
    ] },
    { h: 'Sınırlar', p: [
      'Negatif değerler kabul edilmez. Gün değeri en fazla altı ondalık basamakla gösterilir. Yaz saati uygulaması olan ülkelerde saatlerin ileri ya da geri alındığı günler 23 ya da 25 saat sürebilir; ayrıca astronomide kullanılan yıldız günü 24 saatten birkaç dakika kısadır. Araç bu özel durumları hesaba katmaz ve her günü tam 24 saat kabul eder. İki tarih arasındaki gün sayısını bulmak istiyorsanız bunun için tarih farkı aracını kullanmanız daha doğru olur.',
    ] },
  ],
  faq: [
    ['1 gün kaç saattir?', '1 gün 24 saattir. Bu aynı zamanda 1.440 dakika ve 86.400 saniyeye eşittir.'],
    ['72 saat kaç gün eder?', '72 ÷ 24 = 3 gündür. Örneğin pazartesi saat 10.00\'da başlayan 72 saatlik süre perşembe saat 10.00\'da dolar.'],
    ['48 saat kaç gündür?', '48 saat tam 2 gündür.'],
    ['100 saat kaç gün kaç saat eder?', '100 saat 4,166667 gündür; ayrık olarak 4 gün 4 saat diye ifade edilir.'],
    ['1 hafta kaç saattir?', '1 hafta 7 gün olduğundan 7 × 24 = 168 saattir.'],
    ['1 yıl kaç saattir?', '365 günlük bir yıl 8.760 saat, 366 günlük artık yıl 8.784 saattir.'],
    ['1,5 gün kaç saat eder?', '1,5 × 24 = 36 saattir. Bu süre 1 gün 12 saate eşittir; 1 gün 5 saat değildir.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayı sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hafta-gun-cevir', 'saat-dakika-cevir', 'saniye-dakika-cevir', 'yil-gun-cevir', 'tarih-farki', 'kac-gun-kaldi'],
};
