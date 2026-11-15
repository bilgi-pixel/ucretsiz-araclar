export default {
  slug: 'ekonomik-siparis-miktari-hesapla',
  title: 'Ekonomik Sipariş Miktarı (EOQ) Hesaplama',
  h1Tail: 'en düşük stok maliyeti',
  pageTitle: 'Ekonomik Sipariş Miktarı (EOQ) Hesaplama – Formül ve Örnek',
  description: 'Yıllık talep, sipariş maliyeti ve elde bulundurma maliyetinden ekonomik sipariş miktarını (EOQ), yıllık sipariş sayısını ve toplam stok maliyetini hesaplayın.',
  card: 'Yıllık talep, sipariş ve stok tutma maliyetinden en ekonomik sipariş miktarını, sipariş sıklığını ve toplam maliyeti bulun.',
  category: 'finans',
  keywords: ['ekonomik sipariş miktarı', 'EOQ hesaplama', 'ESM hesaplama', 'ekonomik sipariş miktarı formülü', 'optimum sipariş miktarı', 'stok maliyeti hesaplama', 'sipariş sıklığı hesaplama', 'Wilson formülü'],
  lead: 'Bir stok kaleminin yıllık talebini, sipariş başına maliyetini ve birim başına yıllık elde bulundurma maliyetini yazın; araç sipariş ve stok tutma giderlerinin toplamını <strong>en aza indiren sipariş miktarını</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'talep', label: 'Yıllık talep (birim)', type: 'number', placeholder: 'Örn. 10000' },
    { id: 'siparis', label: 'Sipariş başına maliyet (TL)', type: 'number', placeholder: 'Örn. 200', hint: 'Nakliye, evrak, kabul ve kontrol gibi her siparişte tekrarlanan giderler.' },
    { id: 'elde', label: 'Birim başına yıllık elde bulundurma maliyeti (TL)', type: 'number', placeholder: 'Örn. 4', hint: 'Depolama, sigorta, finansman ve bozulma gideri.' },
    { id: 'gun', label: 'Yıllık çalışma günü', type: 'number', value: '365', hint: 'Sipariş aralığını gün olarak bulmak için.' },
  ],
  compute(v, h) {
    const D = h.pos(v.talep, 'Yıllık talep');
    const S = h.pos(v.siparis, 'Sipariş başına maliyet');
    const H = h.pos(v.elde, 'Birim başına yıllık elde bulundurma maliyeti');
    const gun = h.opt(v.gun, 365, 'Yıllık çalışma günü');
    if (!(gun > 0) || gun > 366) h.err('"Yıllık çalışma günü" 1 ile 366 arasında olmalı.');
    const Q = Math.sqrt((2 * D * S) / H);
    const n = D / Q;
    const sipMal = n * S;
    const eldeMal = (Q / 2) * H;
    return {
      rows: [
        ['Ekonomik sipariş miktarı', h.fmt(Q, 2) + ' birim'],
        ['Yıllık sipariş sayısı', h.fmt(n, 2)],
        ['Sipariş aralığı', h.fmt(gun / n, 1) + ' gün'],
        ['Yıllık sipariş maliyeti', h.para(sipMal)],
        ['Yıllık elde bulundurma maliyeti', h.para(eldeMal)],
        ['Yıllık toplam stok maliyeti', h.para(sipMal + eldeMal)],
        ['Ortalama stok', h.fmt(Q / 2, 2) + ' birim'],
      ],
      note: 'EOQ = √(2 × yıllık talep × sipariş maliyeti ÷ elde bulundurma maliyeti). Model sabit talep ve sabit maliyet varsayar; emniyet stoğu ve satın alma bedeli toplam maliyete dahil değildir.',
    };
  },
  cases: [
    { in: { talep: '10000', siparis: '200', elde: '4' }, out: { 'Ekonomik sipariş miktarı': '1.000 birim', 'Yıllık sipariş sayısı': '10', 'Sipariş aralığı': '36,5 gün', 'Yıllık sipariş maliyeti': '2.000,00 TL', 'Yıllık elde bulundurma maliyeti': '2.000,00 TL', 'Yıllık toplam stok maliyeti': '4.000,00 TL', 'Ortalama stok': '500 birim' } },
    { in: { talep: '1200', siparis: '150', elde: '10' }, out: { 'Ekonomik sipariş miktarı': '189,74 birim', 'Yıllık sipariş sayısı': '6,32', 'Yıllık sipariş maliyeti': '948,68 TL', 'Yıllık elde bulundurma maliyeti': '948,68 TL', 'Yıllık toplam stok maliyeti': '1.897,37 TL' } },
    { in: { talep: '3600', siparis: '100', elde: '2' }, out: { 'Ekonomik sipariş miktarı': '600 birim', 'Yıllık sipariş sayısı': '6', 'Sipariş aralığı': '60,8 gün', 'Yıllık toplam stok maliyeti': '1.200,00 TL' } },
    { in: { talep: '10000', siparis: '200', elde: '4', gun: '250' }, out: { 'Ekonomik sipariş miktarı': '1.000 birim', 'Sipariş aralığı': '25 gün' } },
    { in: { talep: '20000', siparis: '50', elde: '0,5' }, out: { 'Ekonomik sipariş miktarı': '2.000 birim', 'Yıllık sipariş sayısı': '10', 'Yıllık toplam stok maliyeti': '1.000,00 TL' } },
    { in: { talep: '500', siparis: '80', elde: '5' }, out: { 'Ekonomik sipariş miktarı': '126,49 birim', 'Yıllık toplam stok maliyeti': '632,46 TL' } },
    { in: { talep: '10000', siparis: '200', elde: '0' }, error: true },
    { in: { talep: '', siparis: '200', elde: '4' }, error: true },
    { in: { talep: '10000', siparis: '200', elde: '4', gun: '400' }, error: true },
  ],
  howto: [
    'Stok kaleminin bir yıllık toplam talebini (satış ya da tüketim miktarını) birim olarak yazın.',
    'Bir sipariş vermenin miktardan bağımsız maliyetini girin: nakliye bedeli, sipariş ve ödeme işlemleri için harcanan emek, mal kabul ve kalite kontrol gibi.',
    'Bir birim ürünü bir yıl boyunca depoda tutmanın maliyetini yazın. Bunu bilmiyorsanız birim alış fiyatını yıllık stok tutma oranınızla çarparak bulabilirsiniz.',
    'Sipariş aralığını takvim günü yerine iş günü olarak görmek istiyorsanız yıllık çalışma günü sayısını değiştirin ve "Hesapla" düğmesine basın.',
    'Çıkan miktarı tedarikçinizin koli, palet ya da asgari sipariş adedine en yakın değere yuvarlayın.',
  ],
  sections: [
    { h: 'Ekonomik sipariş miktarı nedir?', p: [
      'Ekonomik sipariş miktarı (ESM, İngilizce kısaltmasıyla EOQ), bir stok kaleminden her seferinde kaç birim sipariş verilirse yıllık sipariş verme ve stok tutma maliyetleri toplamının en düşük olacağını gösteren miktardır. Model yirminci yüzyılın başında geliştirilmiştir ve Wilson formülü adıyla da bilinir; stok yönetiminin en temel araçlarından biridir.',
      'Arkasındaki düşünce bir dengedir. Az miktarda ve sık sipariş verirseniz depoda az mal tutarsınız ama her siparişin nakliye ve işlem giderini defalarca ödersiniz. Büyük partilerle seyrek sipariş verirseniz sipariş gideri düşer, ancak depo dolar, paranız stoka bağlanır ve bozulma, eskime riski artar. EOQ bu iki zıt maliyetin birbirine eşitlendiği noktadır.',
    ] },
    { h: 'EOQ formülü', p: [
      '<strong>EOQ = √(2 × D × S ÷ H)</strong>',
      'Burada <strong>D</strong> yıllık talep (birim), <strong>S</strong> bir sipariş vermenin sabit maliyeti (TL), <strong>H</strong> ise bir birimi bir yıl stokta tutmanın maliyetidir (TL). Formülden türeyen diğer büyüklükler şunlardır: yıllık sipariş sayısı D ÷ EOQ, yıllık sipariş maliyeti (D ÷ EOQ) × S, ortalama stok EOQ ÷ 2 ve yıllık elde bulundurma maliyeti (EOQ ÷ 2) × H. Ortalama stokun sipariş miktarının yarısı olması, stokun sipariş geldiğinde en yüksek düzeye çıkıp düzgün biçimde sıfıra kadar tüketildiği varsayımından gelir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir yedek parça toptancısı bir filtreden yılda 10.000 adet satıyor. Her sipariş için nakliye ve işlem gideri 200 TL, bir filtreyi bir yıl depoda tutmanın maliyeti 4 TL olsun. EOQ = √(2 × 10.000 × 200 ÷ 4) = √1.000.000 = <strong>1.000 adet</strong> bulunur.',
      'Bu miktarla yılda 10.000 ÷ 1.000 = 10 sipariş verilir; yani yaklaşık 36,5 günde bir sipariş. Yıllık sipariş maliyeti 10 × 200 = 2.000 TL, ortalama stok 500 adet ve elde bulundurma maliyeti 500 × 4 = 2.000 TL\'dir. Toplam 4.000 TL eder. İki maliyet kaleminin birbirine eşit çıkması tesadüf değildir; en düşük toplam maliyet her zaman bu eşitlik noktasında oluşur.',
      'Karşılaştırma için toptancının her seferinde 500 adet sipariş verdiğini düşünelim: 20 sipariş × 200 = 4.000 TL sipariş maliyeti, 250 × 4 = 1.000 TL stok maliyeti, toplam 5.000 TL. 2.000 adetlik siparişlerde ise 1.000 + 4.000 = 5.000 TL. Her iki durumda da maliyet, EOQ\'ya göre 1.000 TL daha yüksektir.',
    ] },
    { h: 'Elde bulundurma maliyeti nasıl tahmin edilir?', p: [
      'Formülün en zor belirlenen girdisi H değeridir. Elde bulundurma maliyeti şu kalemlerin toplamıdır: stoka bağlanan paranın finansman maliyeti ya da alternatif getirisi, depo kirası ve işletme giderleri, sigorta, sayım ve elleçleme emeği, bozulma, kırılma, çalınma ve modası geçme kayıpları. Uygulamada çoğu işletme bunu birim alış fiyatının yıllık bir yüzdesi olarak ifade eder ve <strong>H = birim maliyet × yıllık stok tutma oranı</strong> biçiminde hesaplar. Örneğin birim maliyeti 20 TL olan bir üründe oran %20 alınırsa H = 4 TL olur. Oran, finansman maliyetinin yüksek olduğu dönemlerde belirgin biçimde artar; bu yüzden değeri kendi koşullarınıza göre belirleyin.',
    ] },
    { h: 'Modelin varsayımları ve sınırları', ul: [
      '<strong>Talep sabit ve bilinir:</strong> Mevsimsel ya da dalgalı talepte tek bir EOQ yerine dönemlere göre ayrı hesap yapmak gerekir.',
      '<strong>Birim fiyat miktara bağlı değildir:</strong> Tedarikçi büyük alımlarda iskonto veriyorsa, indirimli fiyat kademelerinin toplam maliyeti ayrıca karşılaştırılmalıdır.',
      '<strong>Sipariş tek seferde ve tam teslim edilir:</strong> Parça parça teslimat ya da üretim yaparak stok oluşturma durumunda farklı bir model kullanılır.',
      '<strong>Stoksuz kalma yoktur:</strong> Tedarik süresi ve talep belirsizliği için ayrıca emniyet stoğu ve yeniden sipariş noktası hesaplanmalıdır.',
      '<strong>Depo ve nakit sınırı yoktur:</strong> Hesaplanan miktar deponuza sığmıyor ya da nakit akışınızı zorluyorsa kısıtı esas almanız gerekir.',
    ] },
    { h: 'Sonucu uygularken', p: [
      'EOQ eğrisi dip noktası çevresinde oldukça yayvandır; yani sipariş miktarını ideal değerden biraz saptırmak toplam maliyeti çok az artırır. 189,74 gibi küsuratlı bir sonucu 190\'a, hatta koli içi adede uyacak biçimde 200\'e yuvarlamak rahatlıkla kabul edilebilir. Aynı nedenle girdilerinizdeki küçük tahmin hataları da sonucu dramatik biçimde bozmaz: sipariş maliyetini iki katına çıkarmak bile EOQ\'yu yalnızca yaklaşık %41 artırır, çünkü formülde karekök vardır.',
      'Raf ömrü kısa gıda ürünlerinde hesaplanan miktar, ürünün bozulmadan satılabileceği miktarı aşmamalıdır. Bu hesaplama bilgilendirme amaçlıdır; satın alma politikanızı belirlerken tedarik süreleri, asgari sipariş koşulları ve nakit durumunuzla birlikte değerlendirin.',
    ] },
  ],
  faq: [
    ['Ekonomik sipariş miktarı formülü nedir?', 'EOQ = √(2 × yıllık talep × sipariş başına maliyet ÷ birim başına yıllık elde bulundurma maliyeti). Yıllık talep 10.000 birim, sipariş maliyeti 200 TL ve elde bulundurma maliyeti 4 TL ise sonuç 1.000 birimdir.'],
    ['Sipariş maliyetine ürünün alış fiyatı dahil mi?', 'Hayır. Sipariş maliyeti yalnızca sipariş başına tekrarlanan sabit giderleri kapsar: nakliye, sipariş hazırlama, mal kabul, kontrol ve ödeme işlemleri. Ürün bedeli miktarla doğru orantılı olduğu için temel modelde sipariş büyüklüğü kararını etkilemez.'],
    ['Sipariş ve elde bulundurma maliyetleri neden eşit çıkıyor?', 'Toplam maliyet eğrisinin en düşük noktası, azalan sipariş maliyeti eğrisi ile artan stok maliyeti doğrusunun kesiştiği yerdedir. EOQ tam bu noktayı verdiği için iki kalem birbirine eşit olur.'],
    ['Talep aylık olarak belliyse ne yapmalıyım?', 'Aylık talebi 12 ile çarparak yıllık talebi bulun ve elde bulundurma maliyetini de yıllık olarak girin. Tüm girdilerin aynı zaman dilimine ait olması yeterlidir.'],
    ['EOQ ile yeniden sipariş noktası aynı şey mi?', 'Hayır. EOQ "kaç birim sipariş vermeliyim" sorusunu, yeniden sipariş noktası ise "stok hangi düzeye indiğinde sipariş vermeliyim" sorusunu yanıtlar. İkincisi tedarik süresine ve emniyet stoğuna bağlıdır.'],
    ['Tedarikçim miktar indirimi veriyorsa EOQ geçerli mi?', 'Temel model sabit birim fiyat varsayar. İndirim kademeleri varsa her kademe için satın alma bedeli dahil yıllık toplam maliyeti hesaplayıp en düşük olanı seçmek gerekir; EOQ bu karşılaştırmada başlangıç noktasıdır.'],
    ['Sonuç küsuratlı çıkarsa nasıl sipariş veririm?', 'En yakın tam sayıya ya da tedarikçinin koli ve palet adedine yuvarlayın. Toplam maliyet eğrisi dip noktası çevresinde yayvan olduğu için küçük yuvarlamalar maliyeti kayda değer biçimde değiştirmez.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; talep ve maliyet bilgileriniz sunucuya gönderilmez.'],
  ],
  related: ['emniyet-stogu-hesapla', 'stok-devir-hizi-hesapla', 'birim-maliyet-hesapla', 'nakit-donusum-suresi-hesapla'],
};
