export default {
  slug: 'calisan-basi-ciro-hesapla',
  title: 'Çalışan Başına Ciro Hesaplama',
  h1Tail: 'kişi başı gelir ve kâr',
  pageTitle: 'Çalışan Başına Ciro Hesaplama – Kişi Başı Gelir ve Kâr',
  description: 'Dönem cirosunu ortalama çalışan sayısına bölerek çalışan başına ciroyu hesaplayın; aylık karşılığını, kişi başı kârı ve personel giderinin ciroya oranını görün.',
  card: 'Cironuzu çalışan sayısına bölün; kişi başına yıllık ve aylık ciroyu, kârı ve personel gideri oranını görün.',
  category: 'finans',
  keywords: ['çalışan başına ciro', 'kişi başı ciro hesaplama', 'çalışan başına gelir', 'personel başına ciro', 'çalışan başına kâr', 'personel verimliliği', 'personel giderinin ciroya oranı'],
  lead: 'İşletmenizde her çalışanın ortalama ne kadar satış geliri ürettiğini hesaplayın. Araç dönem cirosunu <strong>ortalama çalışan sayısına</strong> böler; net kâr ve personel giderini de yazarsanız kişi başı kârı ve personel maliyetinin ciroya oranını ekler.',
  button: 'Hesapla',
  inputs: [
    { id: 'ciro', label: 'Dönem cirosu (TL)', type: 'number', placeholder: 'Örn. 12000000', hint: 'KDV hariç net satışlar. Binlik ayraç kullanmayın ya da 12.000.000,00 biçiminde yazın.' },
    { id: 'calisan', label: 'Ortalama çalışan sayısı', type: 'number', placeholder: 'Örn. 25', hint: 'Yarı zamanlılar için ondalık yazabilirsiniz (örn. 7,5).' },
    { id: 'ay', label: 'Dönem uzunluğu (ay)', type: 'number', value: '12' },
    { id: 'netKar', label: 'Dönem net kârı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Zarar için eksi işaretiyle yazın.' },
    { id: 'personel', label: 'Dönem toplam personel gideri (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Brüt ücretler, işveren payları ve yan haklar dahil.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const ciro = h.pos(v.ciro, 'Dönem cirosu');
    const n = h.pos(v.calisan, 'Ortalama çalışan sayısı');
    const ay = h.pos(v.ay, 'Dönem uzunluğu');
    if (ay > 120) h.err('"Dönem uzunluğu" en fazla 120 ay olabilir.');
    const kisi = ciro / n;
    const rows = [
      ['Çalışan başına ciro', h.para(kisi)],
      ['Çalışan başına aylık ciro', h.para(kisi / ay)],
    ];
    if (dolu(v.netKar)) {
      const kar = h.num(v.netKar, 'Dönem net kârı');
      rows.push(['Çalışan başına net kâr', h.para(kar / n)]);
    }
    if (dolu(v.personel)) {
      const p = h.pos(v.personel, 'Dönem toplam personel gideri');
      rows.push(['Çalışan başına personel gideri', h.para(p / n)]);
      rows.push(['Personel giderinin ciroya oranı', '%' + h.fmt(p / ciro * 100, 2)]);
      rows.push(['1 TL personel giderine karşılık ciro', h.fix(ciro / p, 2) + ' TL']);
    }
    return {
      rows,
      note: `Çalışan başına ciro, ${h.fmt(ay, 2)} aylık dönemin toplamıdır; aylık değer bu tutarın dönem ay sayısına bölünmüş hâlidir.`,
    };
  },
  cases: [
    { in: { ciro: '12000000', calisan: '25', ay: '12' }, out: { 'Çalışan başına ciro': '480.000,00 TL', 'Çalışan başına aylık ciro': '40.000,00 TL' } },
    { in: { ciro: '3000000', calisan: '7,5', ay: '12', netKar: '450000', personel: '1200000' }, out: { 'Çalışan başına ciro': '400.000,00 TL', 'Çalışan başına aylık ciro': '33.333,33 TL', 'Çalışan başına net kâr': '60.000,00 TL', 'Çalışan başına personel gideri': '160.000,00 TL', 'Personel giderinin ciroya oranı': '%40', '1 TL personel giderine karşılık ciro': '2,50 TL' } },
    { in: { ciro: '900000', calisan: '6', ay: '3' }, out: { 'Çalışan başına ciro': '150.000,00 TL', 'Çalışan başına aylık ciro': '50.000,00 TL' } },
    { in: { ciro: '500000', calisan: '1' }, out: { 'Çalışan başına ciro': '500.000,00 TL', 'Çalışan başına aylık ciro': '41.666,67 TL' } },
    { in: { ciro: '2000000', calisan: '8', ay: '12', netKar: '-160000' }, out: { 'Çalışan başına ciro': '250.000,00 TL', 'Çalışan başına net kâr': '-20.000,00 TL' } },
    { in: { ciro: '100000', calisan: '3', ay: '1', personel: '80000' }, out: { 'Çalışan başına ciro': '33.333,33 TL', 'Çalışan başına aylık ciro': '33.333,33 TL', 'Personel giderinin ciroya oranı': '%80', '1 TL personel giderine karşılık ciro': '1,25 TL' } },
    { in: { ciro: '12000000', calisan: '0', ay: '12' }, error: true },
    { in: { ciro: 'abc', calisan: '25', ay: '12' }, error: true },
    { in: { ciro: '12000000', calisan: '25', ay: '0' }, error: true },
  ],
  howto: [
    '"Dönem cirosu" alanına KDV hariç net satış tutarınızı yazın. Yıllık hesap için on iki ayın toplamını girin.',
    '"Ortalama çalışan sayısı" alanına dönem boyunca ortalama kaç kişi çalıştığını yazın. Yarı zamanlı çalışanları yarım kişi sayarak tam zamanlı eşdeğere çevirebilirsiniz.',
    'Dönem uzunluğunu ay olarak belirtin; yıllık ciro için 12, çeyrek için 3, tek ay için 1 yazın.',
    'İsteğe bağlı olarak net kârı ve toplam personel giderini girin, ardından "Hesapla" düğmesine basın.',
    'Sonuçları önceki dönemlerinizle karşılaştırın; kişi başı ciro artarken personel giderinin ciroya oranı düşüyorsa verimlilik iyileşiyordur.',
  ],
  sections: [
    { h: 'Çalışan başına ciro neyi gösterir?', p: [
      'Çalışan başına ciro, bir işletmenin insan kaynağını satış gelirine ne ölçüde dönüştürdüğünü gösteren basit ama güçlü bir verimlilik göstergesidir. Hesabı tek bir bölme işlemidir: <strong>Çalışan başına ciro = Dönem cirosu ÷ Ortalama çalışan sayısı</strong>. Sonuç, işletmedeki her kişinin ortalama ne kadar gelire karşılık geldiğini söyler.',
      'Gösterge özellikle büyüme dönemlerinde işe yarar. Ekibi büyütürken ciro aynı hızda artmıyorsa kişi başı ciro düşer; bu, yeni alımların henüz verime dönüşmediğinin ya da kadronun gereğinden hızlı genişlediğinin işaretidir. Tersine, ciro artarken çalışan sayısı sabit kalıyorsa işletme aynı ekiple daha çok iş çıkarıyor demektir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Yıllık cirosu 12.000.000 TL olan ve yıl boyunca ortalama 25 kişi çalıştıran bir dağıtım firmasını ele alalım. Çalışan başına ciro 12.000.000 ÷ 25 = 480.000 TL\'dir. Bunu on iki aya böldüğünüzde kişi başına aylık 40.000 TL ciro bulunur.',
      'İkinci bir örnek: yedi tam zamanlı ve bir yarı zamanlı çalışanı olan bir ajansın yıllık cirosu 3.000.000 TL, net kârı 450.000 TL, toplam personel gideri 1.200.000 TL olsun. Ortalama çalışan sayısı 7,5 kabul edilir. Kişi başı ciro 3.000.000 ÷ 7,5 = 400.000 TL, kişi başı net kâr 450.000 ÷ 7,5 = 60.000 TL, kişi başı personel gideri 1.200.000 ÷ 7,5 = 160.000 TL çıkar. Personel giderinin ciroya oranı %40\'tır; yani personele harcanan her 1 liraya karşılık 2,50 lira ciro elde edilmiştir.',
    ] },
    { h: 'Ortalama çalışan sayısı nasıl belirlenir?', p: [
      'Dönem içinde işe giriş ve çıkışlar olduysa dönem sonundaki kişi sayısını kullanmak yanıltıcıdır. En pratik yöntem, her ayın sonundaki çalışan sayılarını toplayıp ay sayısına bölmektir. Yılın ilk yarısında 20, ikinci yarısında 30 kişi çalıştıran bir işletmenin ortalaması 25\'tir.',
      'Yarı zamanlı, mevsimlik ya da kısmi süreli çalışanlar tam zamanlı eşdeğere çevrilmelidir. Haftada 45 saat yerine 22,5 saat çalışan biri 0,5 kişi sayılır. Sezonda dört ay çalışan on kişilik ek kadro, yıllık ortalamaya yaklaşık 3,3 kişi olarak yansır. Taşeron ve serbest çalışanları dahil edip etmemek tercihe bağlıdır; hangi yolu seçerseniz seçin dönemler arasında aynı tanımı koruyun.',
    ] },
    { h: 'Sektörler arasında neden büyük fark olur?', p: [
      'Kişi başı ciro, iş modelinin ne kadar emek yoğun olduğuna doğrudan bağlıdır. Akaryakıt, toptan ticaret ya da emtia alım satımı gibi yüksek cirolu ama düşük kâr marjlı işlerde az sayıda çalışanla çok büyük cirolar yapılır. Restoran, temizlik, çağrı merkezi ya da tekstil atölyesi gibi emek yoğun işlerde ise kişi başı ciro düşük kalır. Bu yüzden bir toptancının rakamını bir kafenin rakamıyla karşılaştırmak anlam taşımaz.',
      'Ciro tek başına kârlılığı da göstermez. Ticari malın maliyeti cironun büyük bölümünü götürüyorsa yüksek kişi başı ciro, yüksek kişi başı kâr anlamına gelmez. Araçtaki isteğe bağlı net kâr alanı bu farkı görmenizi sağlar.',
    ] },
    { h: 'Personel giderinin ciroya oranı', p: [
      'Toplam personel giderini girdiğinizde araç iki ek gösterge hesaplar. <strong>Personel giderinin ciroya oranı</strong>, cironun yüzde kaçının ücret, işveren payı ve yan haklara gittiğini gösterir. <strong>1 TL personel giderine karşılık ciro</strong> ise aynı bilginin tersidir ve çalışanlara yapılan harcamanın kaç katı gelir elde edildiğini söyler.',
      'Hizmet işletmelerinde personel gideri en büyük maliyet kalemi olduğu için bu oran yüksek, ticaret işletmelerinde düşük seyreder. Oranın dönemler içinde yükselmesi, ücret artışlarının satış fiyatlarına ya da verimliliğe yansıtılamadığını düşündürür.',
    ] },
    { h: 'Göstergeyi iyileştirmenin yolları ve sınırlar', ul: [
      'Tekrarlayan işleri yazılım ve otomasyonla hızlandırmak, aynı ekiple daha çok sipariş işlemeyi sağlar.',
      'Kârsız ürün ve müşterileri ayıklamak ciroyu düşürse de kişi başı kârı yükseltebilir; iki göstergeyi birlikte izleyin.',
      'Eğitim ve net iş tanımları, yeni çalışanların verime ulaşma süresini kısaltır.',
      'Yalnızca kadroyu küçülterek elde edilen artış kalıcı olmayabilir; hizmet kalitesi düşerse ciro da arkasından gelir.',
      'Yüksek enflasyon dönemlerinde nominal ciro kendiliğinden büyür; yıllar arası karşılaştırmada fiyat artışının etkisini ayırmaya çalışın.',
    ], p: [
      'Bu hesap genel bir yönetim göstergesidir; ücret, kadro ya da yatırım kararlarını tek bir orana dayandırmayın ve gerekirse mali danışmanınızın görüşünü alın.',
    ] },
  ],
  faq: [
    ['Çalışan başına ciro nasıl hesaplanır?', 'Dönem cirosu aynı dönemdeki ortalama çalışan sayısına bölünür. 12.000.000 TL yıllık ciro ve 25 çalışan için sonuç kişi başına 480.000 TL\'dir.'],
    ['Ciro KDV dahil mi yazılmalı?', 'KDV hariç net satış tutarını yazmanız doğru olur. KDV işletmenin geliri değil, devlet adına tahsil edilen bir tutardır; dahil ederseniz göstergeyi olduğundan yüksek görürsünüz.'],
    ['İşletme sahibi çalışan sayısına dahil edilir mi?', 'İşletmede fiilen çalışıyorsanız dahil etmeniz daha gerçekçi bir sonuç verir. Özellikle birkaç kişilik işletmelerde sahibin emeğini saymamak kişi başı ciroyu belirgin biçimde şişirir.'],
    ['Yarı zamanlı çalışanları nasıl sayarım?', 'Çalıştıkları sürenin tam zamanlı çalışmaya oranı kadar sayın. Yarım gün çalışan bir kişi 0,5, haftada iki gün gelen bir kişi yaklaşık 0,4 çalışan olarak alınabilir. Araç ondalıklı çalışan sayısını kabul eder.'],
    ['Aylık kişi başı ciroyu nasıl bulurum?', 'Dönem uzunluğunu ay olarak yazdığınızda araç dönem toplamını ay sayısına bölerek aylık değeri ayrı satırda gösterir. Yalnızca tek bir ayın cirosunu girecekseniz dönem uzunluğuna 1 yazın.'],
    ['Kişi başı ciro yüksekse işletme kârlı mıdır?', 'Zorunlu olarak değil. Ciro, satılan malın maliyetini ve diğer giderleri içerir. Düşük marjlı ticarette kişi başı ciro çok yüksek olup kâr düşük kalabilir. Net kârı da girerek kişi başı kâra bakın.'],
    ['Personel giderine neler dahildir?', 'Brüt ücretler, işverenin ödediği sigorta payları, ikramiye ve primler, yemek ve yol gibi yan haklar ile kıdem ve izin karşılıkları toplam personel giderini oluşturur. Tutarın kapsamı işletmeden işletmeye değişebilir; dönemler arasında aynı kapsamı kullanın.'],
    ['Yazdığım ciro ve personel bilgileri kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz tutarlar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['verimlilik-orani-hesapla', 'kar-marji-hesapla', 'faaliyet-kar-marji-hesapla', 'birim-maliyet-hesapla', 'satis-primi-hesapla', 'saatlik-ucret-hesapla'],
};
