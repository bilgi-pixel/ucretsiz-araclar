export default {
  slug: 'saatlik-ucret-hesapla',
  title: 'Serbest Çalışan Saatlik Ücret Hesaplama',
  h1Tail: 'freelance saatlik ücret',
  pageTitle: 'Serbest Çalışan Saatlik Ücret Hesaplama – Freelance Ücret',
  description: 'Hedef net gelir, iş giderleri, vergi payı ve faturalanabilir saatlerinizden serbest çalışan olarak istemeniz gereken en düşük saatlik ve günlük ücreti hesaplayın.',
  card: 'Hedef gelir, gider, vergi payı ve faturalanabilir saatten freelance saatlik ücretinizi, günlük ücretinizi ve ciro hedefinizi bulun.',
  category: 'finans',
  keywords: ['serbest çalışan saatlik ücret hesaplama', 'freelance saatlik ücret', 'freelancer ücret hesaplama', 'saatlik ücret nasıl belirlenir', 'freelance fiyatlandırma', 'günlük ücret hesaplama', 'faturalanabilir saat'],
  lead: `Serbest çalışırken elinize geçmesini istediğiniz aylık geliri, müşteriye söyleyeceğiniz saatlik ücrete çevirin. Araç iş giderlerinizi, vergi ve prim için ayırdığınız payı, izin haftalarınızı ve gerçekten faturalayabildiğiniz saatleri hesaba katarak <strong>istemeniz gereken en düşük saatlik ücreti</strong> bulur.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hedef', label: 'Hedef aylık net gelir (TL)', type: 'number', placeholder: 'Örn. 60000', hint: 'Vergi ve giderlerden sonra cebinize kalmasını istediğiniz tutar. Binlik ayraç kullanmayın ya da 60.000,00 biçiminde yazın.' },
    { id: 'gider', label: 'Aylık iş giderleri (TL)', type: 'number', value: '0', hint: 'Yazılım, ekipman, ofis, muhasebe, internet vb. Binlik ayraç kullanmayın.' },
    { id: 'vergi', label: 'Vergi ve prim payı (%)', type: 'number', value: '0', hint: 'Kazancınızın yüzde kaçını vergi ve sigorta primine ayırıyorsunuz? Kendi durumunuza göre girin.' },
    { id: 'saat', label: 'Haftalık faturalanabilir saat', type: 'number', placeholder: 'Örn. 25', hint: 'Müşteriye fatura edebildiğiniz saatler; teklif, toplantı, idari işler hariç.' },
    { id: 'tatil', label: 'Yılda çalışılmayan hafta', type: 'number', value: '4', hint: 'İzin, bayram, hastalık ve iş bulunamayan haftalar.' },
    { id: 'pay', label: 'Güvenlik / kâr payı (%)', type: 'number', value: '0', hint: 'Boş geçen dönemler ve birikim için eklemek istediğiniz pay.' },
  ],
  compute(v, h) {
    const hedef = h.pos(v.hedef, 'Hedef aylık net gelir');
    const gider = h.nonneg(h.opt(v.gider, 0, 'Aylık iş giderleri'), 'Aylık iş giderleri');
    const vergi = h.nonneg(h.opt(v.vergi, 0, 'Vergi ve prim payı'), 'Vergi ve prim payı');
    if (vergi >= 100) h.err('"Vergi ve prim payı" %100\'den küçük olmalı.');
    const saat = h.pos(v.saat, 'Haftalık faturalanabilir saat');
    if (saat > 168) h.err('Bir haftada en fazla 168 saat vardır; "Haftalık faturalanabilir saat" alanını kontrol edin.');
    const tatil = h.nonneg(h.opt(v.tatil, 0, 'Yılda çalışılmayan hafta'), 'Yılda çalışılmayan hafta');
    if (tatil >= 52) h.err('"Yılda çalışılmayan hafta" 52\'den küçük olmalı.');
    const pay = h.nonneg(h.opt(v.pay, 0, 'Güvenlik / kâr payı'), 'Güvenlik / kâr payı');
    const yillikSaat = saat * (52 - tatil);
    const yillikCiro = (hedef * 12 / (1 - vergi / 100) + gider * 12) * (1 + pay / 100);
    const saatlik = yillikCiro / yillikSaat;
    return {
      rows: [
        ['Saatlik ücret', h.para(saatlik)],
        ['Günlük ücret (8 saat)', h.para(saatlik * 8)],
        ['Yıllık faturalanabilir saat', h.fmt(yillikSaat, 1) + ' saat'],
        ['Aylık ciro hedefi', h.para(yillikCiro / 12)],
        ['Yıllık ciro hedefi', h.para(yillikCiro)],
      ],
      note: 'Tutarlar KDV hariçtir; KDV uygulanıyorsa müşteriye ayrıca eklenir. Vergi ve prim payı sizin girdiğiniz orandır; güncel mevzuatı ve kendi durumunuzu mali müşavirinizle kontrol edin.',
    };
  },
  cases: [
    { in: { hedef: '60000', gider: '10000', vergi: '20', saat: '25', tatil: '4', pay: '0' }, out: { 'Saatlik ücret': '850,00 TL', 'Günlük ücret (8 saat)': '6.800,00 TL', 'Yıllık faturalanabilir saat': '1.200 saat', 'Aylık ciro hedefi': '85.000,00 TL' } },
    { in: { hedef: '40000', gider: '0', vergi: '0', saat: '40', tatil: '0', pay: '0' }, out: { 'Saatlik ücret': '230,77 TL', 'Yıllık faturalanabilir saat': '2.080 saat', 'Yıllık ciro hedefi': '480.000,00 TL' } },
    { in: { hedef: '50000', gider: '5000', vergi: '25', saat: '30', tatil: '6', pay: '10' }, out: { 'Saatlik ücret': '685,51 TL', 'Yıllık faturalanabilir saat': '1.380 saat', 'Yıllık ciro hedefi': '946.000,00 TL' } },
    { in: { hedef: '30000', gider: '2000', vergi: '0', saat: '20', tatil: '2', pay: '0' }, out: { 'Saatlik ücret': '384,00 TL', 'Aylık ciro hedefi': '32.000,00 TL' } },
    { in: { hedef: '100000', gider: '0', vergi: '50', saat: '20', tatil: '12', pay: '0' }, out: { 'Saatlik ücret': '3.000,00 TL', 'Günlük ücret (8 saat)': '24.000,00 TL' } },
    { in: { hedef: '60000', saat: '25' }, out: { 'Saatlik ücret': '600,00 TL', 'Yıllık faturalanabilir saat': '1.200 saat' } },
    { in: { hedef: '60000', gider: '10000', vergi: '20', saat: '0', tatil: '4' }, error: true },
    { in: { hedef: '60000', vergi: '100', saat: '25' }, error: true },
    { in: { hedef: '60000', saat: '25', tatil: '52' }, error: true },
  ],
  howto: [
    `"Hedef aylık net gelir" alanına, tüm vergi ve iş giderleri çıktıktan sonra elinizde kalmasını istediğiniz tutarı yazın. Maaşlı bir işteki net ücretinizi ölçü alabilirsiniz.`,
    `İşi yürütmek için her ay yaptığınız harcamaların toplamını "Aylık iş giderleri" alanına girin. Yıllık ödenen kalemleri 12'ye bölerek ekleyin.`,
    `Kazancınızdan vergi ve sigorta primi için ayırdığınız yaklaşık yüzdeyi yazın. Bu oran çalışma biçiminize göre değişir; emin değilseniz muhasebecinize sorun.`,
    `Bir haftada müşteriye gerçekten faturalayabildiğiniz saat sayısını ve yılda çalışmadığınız hafta sayısını girin.`,
    `İsterseniz boş dönemlere karşı bir güvenlik payı ekleyip "Hesapla" düğmesine basın. İlk satır saatlik ücreti, diğerleri günlük ücreti ve ciro hedeflerini gösterir.`,
  ],
  sections: [
    { h: 'Maaşı saate bölmek neden yanıltır?', p: [
      `Serbest çalışmaya yeni başlayanların en sık yaptığı hata, eski maaşını ayda 160 ya da 180 saate bölüp çıkan rakamı saatlik ücret olarak söylemektir. Bu hesap üç şeyi görmezden gelir. Birincisi, maaşlı çalışanın işvereni tarafından karşılanan sigorta primi, yıllık izin, resmî tatil ve hastalık günleri serbest çalışanda kendi cebinden çıkar. İkincisi, bilgisayar, yazılım lisansı, muhasebe ve ofis gibi giderler artık size aittir. Üçüncüsü ve en önemlisi, çalışılan her saat faturalanamaz.`,
      `Teklif hazırlamak, müşteri aramak, toplantıya gitmek, fatura kesmek, kendini geliştirmek ve revizyon beklemek zaman alır ama karşılığında kimse ödeme yapmaz. Haftada 40 saat çalışan pek çok serbest çalışan bunun ancak yarısı ile üçte ikisi arasında bir kısmını faturalayabilir. Saatlik ücret, işte bu faturalanabilir saatlerin tüm yılın yükünü taşıyacağı biçimde belirlenmelidir.`,
    ] },
    { h: 'Hesap yöntemi', p: [
      `Araç tersten gider: önce bir yılda ne kadar ciro yapmanız gerektiğini bulur, sonra bunu faturalayabileceğiniz saatlere böler.`,
    ], ol: [
      `<strong>Vergi öncesi kazanç:</strong> hedef aylık net gelir × 12 ÷ (1 − vergi payı). Vergi payı %20 ise net tutar 0,80'e bölünür.`,
      `<strong>Yıllık ciro hedefi:</strong> vergi öncesi kazanca yıllık iş giderleri eklenir, varsa güvenlik payı kadar artırılır.`,
      `<strong>Yıllık faturalanabilir saat:</strong> haftalık faturalanabilir saat × (52 − çalışılmayan hafta).`,
      `<strong>Saatlik ücret:</strong> yıllık ciro hedefi ÷ yıllık faturalanabilir saat.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir grafik tasarımcı ayda net 60.000 TL kazanmak istiyor. Yazılım abonelikleri, muhasebe ve ortak ofis için ayda 10.000 TL harcıyor, kazancının %20'sini vergi ve prime ayırıyor. Haftada 25 saat faturalayabiliyor ve yılda 4 hafta çalışmıyor.`,
      `Yıllık net hedef 60.000 × 12 = 720.000 TL'dir. Vergi öncesi kazanç 720.000 ÷ 0,80 = 900.000 TL olmalıdır. Yıllık giderler 10.000 × 12 = 120.000 TL eklenince ciro hedefi 1.020.000 TL'ye, aylık ortalama 85.000 TL'ye çıkar. Faturalanabilir saat 25 × 48 = 1.200'dür. Saatlik ücret 1.020.000 ÷ 1.200 = <strong>850,00 TL</strong>, sekiz saatlik günlük ücret 6.800,00 TL bulunur.`,
      `Aynı kişi maaş mantığıyla 60.000 TL'yi 160 saate bölseydi 375 TL'ye ulaşırdı; yani gerçekte ihtiyacı olan ücretin yarısından azını isterdi. Aradaki fark, faturalanamayan saatlerin, giderlerin ve vergi payının toplam ağırlığıdır.`,
    ] },
    { h: 'Faturalanabilir saati gerçekçi belirlemek', p: [
      `Hesabın en hassas girdisi haftalık faturalanabilir saattir; küçük bir iyimserlik ücreti ciddi biçimde düşürür. Yukarıdaki örnekte saat 25 yerine 35 yazılsaydı sonuç 607 TL'ye inerdi, fakat o 35 saat gerçekte doldurulamadığında yıl sonu hedefi tutmazdı. En sağlıklı yol, birkaç hafta boyunca zamanınızı not edip müşteriye fatura ettiğiniz saatleri ayrıca toplamaktır.`,
      `Çalışılmayan haftaları da cömert tutun. Yıllık izin, dinî ve resmî bayramlar, hastalık ve iki proje arasındaki boşluklar birlikte düşünüldüğünde çoğu kişi için 4 ile 8 hafta arası bir değer gerçekçidir.`,
    ] },
    { h: 'Saatlik ücretten proje fiyatına', p: [
      `Bulduğunuz rakam bir taban değerdir; altına inmeniz hedefinizi tutturamayacağınız anlamına gelir. Proje bazlı teklif verirken işi kaç saatte bitireceğinizi tahmin edip saatlik ücretle çarpın, revizyon ve iletişim için bir pay ekleyin. 30 saat sürecek bir kurumsal kimlik işi 850 TL'den 25.500 TL eder; iki tur revizyon için %20 pay eklenirse 30.600 TL'lik bir teklif ortaya çıkar.`,
      `Piyasada geçerli ücretler deneyime, uzmanlık alanına ve müşterinin bulunduğu ülkeye göre geniş bir aralıkta değişir. Hesabınız piyasanın üstünde kalıyorsa giderleri azaltmak, faturalanabilir saati artırmak ya da daha yüksek değerli işlere yönelmek gerekir; hesabın altında fiyat vermek ise sorunu yalnızca erteler.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Araç vergi hesaplamaz; yalnızca sizin yazdığınız oranı kazançtan ayırır. Gelir vergisi dilimleri, sigorta primleri, istisnalar ve gider yazılabilen kalemler çalışma biçiminize (şahıs işletmesi, şirket, serbest meslek) göre değişir ve mevzuat her yıl güncellenir. Bu yüzden güncel mevzuatı kontrol edin ve oranı mali müşavirinizle belirleyin. Sonuç bilgilendirme amaçlıdır, KDV hariçtir ve bir gelir garantisi değildir.`,
    ] },
  ],
  faq: [
    ['Serbest çalışan saatlik ücreti nasıl hesaplanır?', `Yıllık net gelir hedefi vergi payına göre brütleştirilir, yıllık iş giderleri eklenir ve sonuç yıl içinde faturalanabilecek toplam saate bölünür. Araç bu dört adımı sizin girdilerinizle otomatik yapar.`],
    ['Faturalanabilir saat ne demek?', `Doğrudan bir müşteri işi için harcadığınız ve karşılığında ücret aldığınız saatlerdir. Teklif yazma, pazarlama, muhasebe, eğitim ve bekleme süreleri çalışma saatidir ama faturalanabilir değildir.`],
    ['Vergi ve prim payına ne yazmalıyım?', `Bu oran gelir düzeyinize ve nasıl çalıştığınıza göre değişir; araç sabit bir oran dayatmaz. Geçen yılki toplam vergi ve prim ödemenizi kazancınıza bölerek kendi oranınızı bulabilir ya da mali müşavirinizden tahmin isteyebilirsiniz.`],
    ['KDV hesaba dahil mi?', `Hayır. Hesaplanan ücret KDV hariçtir. KDV müşteriden tahsil edilip devlete aktarılan bir tutar olduğu için gelirinizin parçası sayılmaz; teklifinizde ayrıca belirtilir.`],
    ['Güvenlik payı neden eklenir?', `Geç ödenen faturalar, iptal olan projeler ve iş bulunamayan aylar serbest çalışmanın doğal parçasıdır. %10 ile %20 arasında bir pay, bu dalgalanmaları karşılayacak bir yastık ve ekipman yenileme için birikim oluşturur.`],
    ['Günlük ücret neden 8 saat üzerinden gösteriliyor?', `Müşteriler çoğu zaman tam gün için fiyat sorar. Araç saatlik ücreti 8 ile çarparak pratik bir günlük rakam verir; siz yarım gün ya da farklı süreler için saatlik ücreti istediğiniz saatle çarpabilirsiniz.`],
    ['Çıkan ücret piyasaya göre yüksekse ne yapmalıyım?', `Önce girdileri gözden geçirin: giderler azaltılabilir mi, faturalanabilir saat artırılabilir mi? Bunlar gerçekçiyse sonuç, hedef gelirinize ulaşmak için gereken tabandır. Ücreti düşürmek yerine uzmanlaşmak ya da daha yüksek bütçeli müşterilere yönelmek genellikle daha sürdürülebilir bir çözümdür.`],
    ['Gelir bilgilerim kaydediliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız gelir ve gider rakamları sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.`],
  ],
  related: ['saatlik-aylik-ucret-cevir', 'yillik-maas-hesapla', 'birim-maliyet-hesapla', 'kar-ekleme-orani-hesapla', 'tasarruf-orani-hesapla'],
};
