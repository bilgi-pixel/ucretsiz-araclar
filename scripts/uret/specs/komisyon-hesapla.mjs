export default {
  slug: 'komisyon-hesapla',
  title: 'Komisyon Hesaplama',
  h1Tail: 'tutar, kesinti ve net kazanç',
  pageTitle: 'Komisyon Hesaplama – Yüzde Komisyon Tutarı ve Net Ele Geçen',
  description: 'Satış tutarı ve komisyon oranından komisyon tutarını, KDV\'sini ve elinize geçecek neti hesaplayın; ya da istediğiniz net için gereken satış fiyatını bulun.',
  card: 'Komisyon tutarını, komisyon KDV\'sini ve net ele geçeni hesaplayın; hedef net için gereken satış fiyatını bulun.',
  category: 'finans',
  keywords: ['komisyon hesaplama', 'yüzde komisyon hesaplama', 'emlak komisyonu hesaplama', 'pazaryeri komisyon hesaplama', 'pos komisyonu hesaplama', 'komisyon dahil fiyat', 'net ele geçen tutar'],
  lead: `Satış tutarını ve komisyon oranını yazın; araç <strong>komisyon tutarını</strong>, varsa komisyonun KDV'sini ve sabit işlem ücretini düşerek elinize geçecek neti hesaplasın. Tersine, "elime şu kadar kalsın" diyorsanız gereken satış tutarını da bulabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap yönü', type: 'select', wide: true, options: [['brut', 'Satış tutarından komisyonu ve neti bul'], ['net', 'İstenen net tutar için satış tutarını bul']] },
    { id: 'tutar', label: 'Tutar', type: 'number', placeholder: 'Örn. 1000', hint: 'İlk seçenekte satış tutarı, ikincide elinize geçmesini istediğiniz net.' },
    { id: 'oran', label: 'Komisyon oranı (%)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'sabit', label: 'Sabit işlem ücreti (isteğe bağlı)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'kdv', label: 'Komisyona eklenen KDV (%) (isteğe bağlı)', type: 'number', placeholder: 'Örn. 20', hint: 'Komisyon faturasına KDV ekleniyorsa oranını yazın.' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Tutar');
    const oran = h.nonneg(v.oran, 'Komisyon oranı');
    if (oran > 100) h.err('Komisyon oranı %100\'den büyük olamaz.');
    const sabit = h.opt(v.sabit, 0, 'Sabit işlem ücreti');
    if (sabit < 0) h.err('"Sabit işlem ücreti" negatif olamaz.');
    const kdv = h.opt(v.kdv, 0, 'Komisyon KDV oranı');
    if (kdv < 0 || kdv > 100) h.err('KDV oranı 0 ile 100 arasında olmalı.');
    const r = oran / 100, k = 1 + kdv / 100;
    let satis;
    if (v.mod === 'net') {
      const payda = 1 - r * k;
      if (payda <= 1e-9) h.err('Bu komisyon ve KDV oranıyla kesinti satışın tamamını aşıyor; net tutara ulaşılamaz. Oranı düşürün.');
      satis = (tutar + sabit * k) / payda;
    } else satis = tutar;
    const kom = satis * r + sabit;
    const kdvTutar = kom * (k - 1);
    const kesinti = kom + kdvTutar;
    const net = satis - kesinti;
    if (net < -0.005) h.err('Komisyon ve ücretlerin toplamı satış tutarını aşıyor; tutarı ya da oranları kontrol edin.');
    const rows = [
      v.mod === 'net' ? ['Gereken satış tutarı', h.para(satis)] : ['Komisyon tutarı', h.para(kom)],
      v.mod === 'net' ? ['Komisyon tutarı', h.para(kom)] : ['Net ele geçen', h.para(net)],
    ];
    if (kdv > 0) rows.push(['Komisyon KDV\'si', h.para(kdvTutar)]);
    rows.push(['Toplam kesinti', h.para(kesinti)]);
    if (v.mod === 'net') rows.push(['Net ele geçen', h.para(net)]);
    else rows.push(['Satış tutarı', h.para(satis)]);
    rows.push(['Gerçek kesinti oranı', '%' + h.fmt((kesinti / satis) * 100, 2)]);
    return {
      rows,
      note: 'Komisyon = satış tutarı × oran + sabit ücret. KDV girildiyse komisyonun üzerine eklenir. Stopaj ve gelir vergisi gibi kesintiler hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { mod: 'brut', tutar: '1000', oran: '10' }, out: { 'Komisyon tutarı': '100,00 TL', 'Net ele geçen': '900,00 TL', 'Gerçek kesinti oranı': '%10' } },
    { in: { mod: 'brut', tutar: '1000', oran: '10', kdv: '20' }, out: { 'Komisyon tutarı': '100,00 TL', 'Komisyon KDV\'si': '20,00 TL', 'Toplam kesinti': '120,00 TL', 'Net ele geçen': '880,00 TL', 'Gerçek kesinti oranı': '%12' } },
    { in: { mod: 'net', tutar: '900', oran: '10' }, out: { 'Gereken satış tutarı': '1.000,00 TL', 'Komisyon tutarı': '100,00 TL', 'Net ele geçen': '900,00 TL' } },
    { in: { mod: 'brut', tutar: '2500', oran: '2,5', sabit: '5' }, out: { 'Komisyon tutarı': '67,50 TL', 'Net ele geçen': '2.432,50 TL', 'Gerçek kesinti oranı': '%2,7' } },
    { in: { mod: 'net', tutar: '880', oran: '10', kdv: '20' }, out: { 'Gereken satış tutarı': '1.000,00 TL', 'Toplam kesinti': '120,00 TL' } },
    { in: { mod: 'brut', tutar: '5000000', oran: '2', kdv: '20' }, out: { 'Komisyon tutarı': '100.000,00 TL', 'Komisyon KDV\'si': '20.000,00 TL', 'Net ele geçen': '4.880.000,00 TL' } },
    { in: { mod: 'net', tutar: '500', oran: '15', sabit: '10' }, out: { 'Gereken satış tutarı': '600,00 TL', 'Komisyon tutarı': '100,00 TL' } },
    { in: { mod: 'brut', tutar: '1000', oran: '150' }, error: true },
    { in: { mod: 'brut', tutar: '', oran: '10' }, error: true },
    { in: { mod: 'net', tutar: '900', oran: '100' }, error: true },
  ],
  howto: [
    `"Hesap yönü" listesinden ne aradığınızı seçin: eldeki satış tutarından komisyonu mu, yoksa hedeflediğiniz net için gereken satış tutarını mı bulacaksınız?`,
    `"Tutar" alanına ilk seçenekte satış bedelini, ikinci seçenekte elinize geçmesini istediğiniz net tutarı yazın.`,
    `"Komisyon oranı" alanına yüzde değerini girin. İşlem başına alınan sabit bir ücret varsa onu da ilgili alana ekleyin.`,
    `Komisyon faturasına KDV ekleniyorsa KDV oranını yazın; eklenmiyorsa ya da oran zaten KDV dahil verildiyse boş bırakın.`,
    `"Hesapla" düğmesine basın ve komisyon, toplam kesinti, net tutar ve gerçek kesinti oranını inceleyin.`,
  ],
  sections: [
    { h: 'Komisyon nedir, nasıl hesaplanır?', p: [
      `Komisyon, bir satışa ya da işleme aracılık edenin bu hizmet karşılığında aldığı paydır ve çoğunlukla işlem tutarının yüzdesi olarak belirlenir. Temel formül tek satırdır: <strong>Komisyon = Satış tutarı × Komisyon oranı ÷ 100</strong>. 1.000 liralık satışta %10 komisyon 100 lira eder ve satıcının elinde 900 lira kalır.`,
      `Uygulamada işin içine iki kalem daha girer. Birincisi, bazı aracılar yüzdeye ek olarak işlem başına <strong>sabit ücret</strong> alır. İkincisi, komisyon bir hizmet bedeli olduğu için aracı çoğunlukla bunun üzerine <strong>KDV</strong> ekler. Araç bu ikisini de hesaba katar: toplam kesinti = (satış × oran + sabit ücret) × (1 + KDV oranı).`,
    ] },
    { h: 'Çözümlü örnek: KDV\'li komisyon', p: [
      `Bir pazaryerinde 1.000 liraya ürün sattığınızı, komisyon oranının %10 olduğunu ve komisyon faturasına %20 KDV eklendiğini düşünelim. Komisyon 1.000 × 0,10 = 100 liradır. Bunun KDV'si 100 × 0,20 = 20 lira eder. Toplam kesinti 120 lira, elinize geçen tutar 880 liradır.`,
      `Görünen oran %10 olsa da satışınızdan fiilen %12 kesilmiştir. Araç bu değeri "Gerçek kesinti oranı" satırında gösterir. KDV mükellefi bir işletme, ödediği bu KDV'yi indirim konusu yapabildiği için onun açısından gerçek yük %10'da kalabilir; KDV mükellefi olmayan bir satıcı içinse 20 lira doğrudan maliyettir.`,
    ] },
    { h: 'Tersine hesap: elime net şu kadar geçsin', p: [
      `Fiyat belirlerken asıl soru çoğu zaman şudur: "Komisyon düştükten sonra elimde 900 lira kalması için kaça satmalıyım?" Burada sık yapılan hata, 900 liranın üzerine %10 ekleyip 990 lira demektir. Oysa 990 liranın %10'u 99 liradır ve elinizde 891 lira kalır.`,
      `Doğru hesap bölmeyle yapılır: <strong>Satış tutarı = Net tutar ÷ (1 − oran)</strong>. 900 ÷ 0,90 = 1.000 lira. KDV ve sabit ücret de varsa formül şu hâli alır: satış = (net + sabit ücret × (1 + KDV)) ÷ (1 − oran × (1 + KDV)). Örneğin %15 komisyon ve 10 lira sabit ücretle elinize 500 lira geçmesi için (500 + 10) ÷ 0,85 = 600 liraya satmanız gerekir. "Hesap yönü" listesindeki ikinci seçenek bu işlemi sizin yerinize yapar.`,
    ] },
    { h: 'Komisyonla nerelerde karşılaşılır?', ul: [
      `<strong>Emlak:</strong> Alım satım ve kiralamada aracılık hizmet bedeli satış ya da kira bedelinin yüzdesi olarak belirlenir. 5.000.000 liralık bir satışta %2 hizmet bedeli 100.000 lira, %20 KDV'siyle birlikte 120.000 lira eder.`,
      `<strong>Pazaryerleri ve e-ticaret:</strong> Kategoriye göre değişen komisyon oranları, çoğunlukla kargo ve hizmet bedelleriyle birlikte satıcının hak edişinden düşülür.`,
      `<strong>Sanal ve fiziksel POS:</strong> Kartla tahsilatta banka ya da ödeme kuruluşu işlem tutarından komisyon keser; taksitli işlemlerde oran yükselir.`,
      `<strong>Satış temsilcileri ve acenteler:</strong> Sigorta, turizm, otomotiv gibi sektörlerde aracıya satış üzerinden komisyon ödenir.`,
      `<strong>Serbest çalışma platformları:</strong> İş bulmaya aracılık eden platformlar hizmet bedelinin bir bölümünü komisyon olarak alır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Komisyonun KDV dahil mi hariç mi bildirildiğini sormamak. Oran KDV dahil verildiyse KDV alanını boş bırakın.`,
      `Komisyonun hangi tutar üzerinden hesaplandığını gözden kaçırmak. Bazı aracılar KDV dahil satış bedelini, bazıları KDV hariç bedeli esas alır.`,
      `Hedef net için komisyonu toplama yoluyla eklemek. Doğru yöntem (1 − oran) değerine bölmektir.`,
      `Sabit işlem ücretini küçük görmek. 5 liralık sabit ücret, 100 liralık bir satışta tek başına %5'lik ek yük demektir.`,
      `Komisyonu kârdan değil cirodan düşüldüğünü unutmak. Kâr marjı %20 olan bir üründe %10 komisyon, kârın yarısını götürür.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Araç komisyonu, yazdığınız tutarın tamamı üzerinden tek bir oranla hesaplar; kademeli oranlar, alt ve üst sınırlar, kargo payı, iade kesintisi, stopaj ya da gelir vergisi gibi kalemler hesaba dahil değildir. Komisyon oranları ve KDV uygulaması sektöre, sözleşmeye ve yürürlükteki mevzuata göre değişir; bu nedenle araç herhangi bir oranı sabit kabul etmez, tümünü sizden alır. Sonuçlar bilgilendirme amaçlıdır; sözleşme ve vergi konularında mali müşavirinize danışın.`,
    ] },
  ],
  faq: [
    [`Yüzde komisyon nasıl hesaplanır?`, `Satış tutarı komisyon oranıyla çarpılıp 100'e bölünür. 2.500 liralık bir satışta %2,5 komisyon 62,50 liradır; 5 lira sabit ücret de varsa toplam komisyon 67,50 lira olur.`],
    [`Komisyona KDV eklenir mi?`, `Komisyon bir hizmet bedeli olduğu için aracı genellikle faturasına KDV ekler. Oranın KDV dahil mi hariç mi verildiğini aracınıza sorun; hariç ise araçtaki KDV alanını doldurun.`],
    [`Komisyon düştükten sonra elime 1.000 lira geçmesi için kaça satmalıyım?`, `Net tutarı (1 − oran) değerine bölersiniz. %8 komisyonda 1.000 ÷ 0,92 = 1.086,96 lira gerekir. Araçta "İstenen net tutar için satış tutarını bul" seçeneğini kullanın.`],
    [`Gerçek kesinti oranı neden komisyon oranından yüksek çıkıyor?`, `Çünkü bu satır komisyonun yanında KDV'yi ve sabit işlem ücretini de içerir. %10 komisyon ve %20 KDV'de satıştan fiilen %12 kesilir.`],
    [`Komisyon ile prim aynı şey mi?`, `Yakın kavramlardır ama aynı değildir. Komisyon çoğunlukla bağımsız bir aracıya işlem başına ödenen paydır; prim ise işletmenin kendi çalışanına hedef ya da performansa bağlı olarak ödediği ek ücrettir.`],
    [`Emlak komisyonunu bu araçla hesaplayabilir miyim?`, `Evet. Satış ya da kira bedelini tutar alanına, anlaştığınız hizmet bedeli oranını oran alanına, KDV oranını ilgili alana yazmanız yeterlidir. Geçerli oran ve sınırlar için güncel mevzuatı ve sözleşmenizi esas alın.`],
    [`Kademeli komisyon hesaplanabiliyor mu?`, `Hayır, araç tek oran uygular. Kademeli yapılarda her dilimi ayrı ayrı hesaplayıp sonuçları toplayabilirsiniz.`],
    [`Yazdığım tutarlar kaydediliyor mu?`, `Hayır. Hesap tarayıcınızda yapılır; satış tutarı, oran ve sonuçlar hiçbir sunucuya gönderilmez.`],
  ],
  related: ['satis-primi-hesapla', 'kdv-hesapla', 'kar-zarar-hesapla', 'kar-marji-hesapla', 'yuzde-hesapla'],
};
