export default {
  slug: 'faaliyet-kar-marji-hesapla',
  title: 'Faaliyet Kâr Marjı Hesaplama',
  h1Tail: 'esas faaliyet kârlılığı',
  pageTitle: 'Faaliyet Kâr Marjı Hesaplama – Esas Faaliyet Kârı ve Brüt Marj',
  description: 'Net satışlar, satışların maliyeti ve faaliyet giderlerinden faaliyet kârını ve faaliyet kâr marjını hesaplayın; brüt kâr marjını ve gider oranını da görün.',
  card: 'Net satış, satış maliyeti ve faaliyet giderlerinden faaliyet kârını, faaliyet kâr marjını ve brüt marjı hesaplayın.',
  category: 'finans',
  keywords: ['faaliyet kâr marjı hesaplama', 'faaliyet kârı hesaplama', 'esas faaliyet kârı', 'faaliyet kâr marjı formülü', 'brüt kâr marjı hesaplama', 'faaliyet giderleri oranı', 'operasyonel kâr marjı'],
  lead: `Gelir tablonuzdaki net satışları, satışların maliyetini ve faaliyet giderlerini yazın; araç <strong>faaliyet kârını</strong> ve bunun satışlara oranı olan <strong>faaliyet kâr marjını</strong> hesaplasın. Brüt kâr marjı ve faaliyet giderlerinin satışlardaki payı da aynı tabloda yer alır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'satis', label: 'Net satışlar', type: 'number', placeholder: 'Örn. 1000000', hint: 'İade ve iskontolar düşülmüş, KDV hariç hasılat.' },
    { id: 'smm', label: 'Satışların maliyeti', type: 'number', placeholder: 'Örn. 600000' },
    { id: 'gider', label: 'Faaliyet giderleri', type: 'number', placeholder: 'Örn. 250000', hint: 'Pazarlama-satış-dağıtım, genel yönetim ve Ar-Ge giderlerinin toplamı.' },
  ],
  compute(v, h) {
    const satis = h.pos(v.satis, 'Net satışlar');
    const smm = h.nonneg(v.smm, 'Satışların maliyeti');
    const gider = h.nonneg(v.gider, 'Faaliyet giderleri');
    const brut = satis - smm;
    const fk = brut - gider;
    const yuzde = (x) => (x < -5e-7 ? '−' : '') + '%' + h.fmt(Math.abs(x), 2);
    const tl = (x) => (x < -0.005 ? '−' : '') + h.para(Math.abs(x));
    return {
      rows: [
        ['Faaliyet kâr marjı', yuzde((fk / satis) * 100)],
        [fk < -0.005 ? 'Faaliyet zararı' : 'Faaliyet kârı', h.para(Math.abs(fk))],
        ['Brüt satış kârı', tl(brut)],
        ['Brüt kâr marjı', yuzde((brut / satis) * 100)],
        ['Faaliyet giderlerinin satışlara oranı', '%' + h.fmt((gider / satis) * 100, 2)],
        ['Satışların maliyetinin satışlara oranı', '%' + h.fmt((smm / satis) * 100, 2)],
      ],
      note: 'Faaliyet kârı; faiz, kur farkı, olağan dışı gelir-giderler ve vergiden önceki, yalnızca ana faaliyetten doğan kârdır.',
    };
  },
  cases: [
    { in: { satis: '1000000', smm: '600000', gider: '250000' }, out: { 'Faaliyet kâr marjı': '%15', 'Faaliyet kârı': '150.000,00 TL', 'Brüt satış kârı': '400.000,00 TL', 'Brüt kâr marjı': '%40', 'Faaliyet giderlerinin satışlara oranı': '%25' } },
    { in: { satis: '500000', smm: '300000', gider: '250000' }, out: { 'Faaliyet kâr marjı': '−%10', 'Faaliyet zararı': '50.000,00 TL', 'Brüt kâr marjı': '%40' } },
    { in: { satis: '240000', smm: '150000', gider: '42000' }, out: { 'Faaliyet kâr marjı': '%20', 'Faaliyet kârı': '48.000,00 TL', 'Brüt kâr marjı': '%37,5' } },
    { in: { satis: '3500000', smm: '2800000', gider: '525000' }, out: { 'Faaliyet kâr marjı': '%5', 'Faaliyet kârı': '175.000,00 TL', 'Brüt kâr marjı': '%20', 'Satışların maliyetinin satışlara oranı': '%80' } },
    { in: { satis: '80000', smm: '0', gider: '52000' }, out: { 'Faaliyet kâr marjı': '%35', 'Brüt kâr marjı': '%100' } },
    { in: { satis: '900000', smm: '540000', gider: '360000' }, out: { 'Faaliyet kâr marjı': '%0', 'Faaliyet kârı': '0,00 TL' } },
    { in: { satis: '0', smm: '600000', gider: '250000' }, error: true },
    { in: { satis: '1000000', smm: '', gider: '250000' }, error: true },
    { in: { satis: '1000000', smm: '600000', gider: '-1' }, error: true },
  ],
  howto: [
    `"Net satışlar" alanına dönemin gelir tablosundaki net satış hasılatını yazın.`,
    `"Satışların maliyeti" alanına aynı döneme ait satılan mal, mamul ya da hizmet maliyetini girin. Maliyeti ayrı izlemeyen bir hizmet işletmesiyseniz 0 yazabilirsiniz.`,
    `"Faaliyet giderleri" alanına pazarlama, satış ve dağıtım giderleri ile genel yönetim ve varsa araştırma geliştirme giderlerinin toplamını yazın.`,
    `"Hesapla" düğmesine basın. Faaliyet kâr marjı ilk satırda, faaliyet kârı ve brüt marj bilgileri altında görünür.`,
  ],
  sections: [
    { h: 'Faaliyet kâr marjı nedir?', p: [
      `Faaliyet kâr marjı, bir işletmenin asıl işinden, yani mal ya da hizmet satışından elde ettiği kârın net satışlarına oranıdır. Her 100 liralık satıştan, ürünün maliyeti ve işletmeyi döndürmek için yapılan giderler düşüldükten sonra kaç lira kaldığını gösterir. Esas faaliyet kâr marjı ya da operasyonel kâr marjı adlarıyla da anılır.`,
      `Bu oranı değerli kılan şey, finansman kararlarının ve olağan dışı kalemlerin etkisinden arınmış olmasıdır. Faiz giderleri, kur farkları, sabit kıymet satış kârları ve vergi hesaba girmez. Böylece borçluluk düzeyi farklı olan iki işletmenin ana faaliyetlerindeki verimlilik doğrudan karşılaştırılabilir.`,
    ] },
    { h: 'Formül ve gelir tablosundaki yeri', p: [
      `Hesap gelir tablosunun üst bölümünü izler:`,
    ], ol: [
      `<strong>Brüt satış kârı</strong> = Net satışlar − Satışların maliyeti`,
      `<strong>Faaliyet kârı</strong> = Brüt satış kârı − Faaliyet giderleri`,
      `<strong>Faaliyet kâr marjı</strong> = Faaliyet kârı ÷ Net satışlar × 100`,
    ] },
    { h: 'Hangi kalem nereye yazılır?', p: [
      `Net satışlar; yurt içi ve yurt dışı satışların toplamından satış iadeleri ve satış iskontolarının düşülmesiyle bulunur ve KDV içermez. Satışların maliyeti, ticaret işletmelerinde satılan ticari malların, üretim işletmelerinde satılan mamullerin, hizmet işletmelerinde ise satılan hizmetin maliyetidir.`,
      `Faaliyet giderleri üç gruptan oluşur: araştırma ve geliştirme giderleri, pazarlama satış ve dağıtım giderleri ile genel yönetim giderleri. Mağaza kirası, satış personeli ücretleri, reklam, nakliye, yönetim kadrosunun maaşları, muhasebe ve danışmanlık bedelleri, büro giderleri bu gruplara girer. Kredi faizleri ve kur farkları ise finansman gideridir ve bu hesaba dahil edilmez.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir mobilya mağazasının yıllık net satışları 1.000.000 lira, sattığı ürünlerin maliyeti 600.000 lira, kira, personel, reklam ve yönetim giderlerinin toplamı 250.000 lira olsun.`,
    ], ol: [
      `Brüt satış kârı: 1.000.000 − 600.000 = 400.000 lira. Brüt kâr marjı %40'tır.`,
      `Faaliyet kârı: 400.000 − 250.000 = 150.000 lira.`,
      `Faaliyet kâr marjı: 150.000 ÷ 1.000.000 × 100 = %15.`,
      `Faaliyet giderlerinin satışlara oranı: 250.000 ÷ 1.000.000 = %25.`,
      `Yorum: Brüt marjın %40'ından 25 puanı işletme giderlerine gidiyor, 15 puanı faaliyet kârı olarak kalıyor. Satışlar yarıya, 500.000 liraya düşer ve giderler aynı kalırsa brüt kâr 200.000 lira olur, 250.000 liralık gider karşılanamaz ve işletme 50.000 lira faaliyet zararı yazar; marj −%10'a iner.`,
    ] },
    { h: 'Brüt, faaliyet ve net kâr marjı arasındaki fark', ul: [
      `<strong>Brüt kâr marjı:</strong> Yalnızca ürünün maliyeti düşülür. Fiyatlama gücünü ve satın alma ya da üretim verimliliğini gösterir.`,
      `<strong>Faaliyet kâr marjı:</strong> Brüt kârdan işletme giderleri de düşülür. İşin günlük yönetiminin ne kadar verimli olduğunu ölçer.`,
      `<strong>Net kâr marjı:</strong> Faaliyet kârına diğer gelir ve giderler, finansman giderleri eklenip vergi düşüldükten sonra kalan kârın satışlara oranıdır. Ortaklara kalan sonucu gösterir.`,
    ], p: [
      `Brüt marjı yüksek ama faaliyet marjı düşük bir işletmede sorun maliyette değil, gider yapısındadır. Faaliyet marjı iyi olup net marjı zayıf olan işletmede ise sorun çoğunlukla borç yüküdür.`,
    ] },
    { h: 'Yorumlarken dikkat edilecekler', p: [
      `Faaliyet kâr marjının tek bir "doğru" düzeyi yoktur. Market, akaryakıt ve toptan ticaret gibi yüksek cirolu, düşük marjlı işlerde birkaç puanlık marj olağandır; yazılım, danışmanlık ve markalı tüketim ürünlerinde çok daha yüksek marjlar görülür. Bu nedenle oranı aynı sektördeki işletmelerle ve kendi önceki dönemlerinizle karşılaştırın.`,
      `Yüksek enflasyon dönemlerinde stok maliyetinin eski fiyatlarla, satışın yeni fiyatlarla kaydedilmesi marjı olduğundan yüksek gösterebilir. Ayrıca amortismanın satış maliyetinde mi yoksa faaliyet giderlerinde mi yer aldığı, işletmeler arası karşılaştırmayı etkiler. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; mali tablo analizi, kredi ya da yatırım kararları için mali müşavir ya da finans uzmanına danışın.`,
    ] },
  ],
  faq: [
    [`Faaliyet kâr marjı nasıl hesaplanır?`, `Net satışlardan satışların maliyeti ve faaliyet giderleri çıkarılarak faaliyet kârı bulunur; bu tutar net satışlara bölünüp 100 ile çarpılır. 240.000 liralık satış, 150.000 liralık maliyet ve 42.000 liralık giderle faaliyet kârı 48.000 lira, marj %20'dir.`],
    [`Faaliyet giderlerine neler dahildir?`, `Pazarlama, satış ve dağıtım giderleri, genel yönetim giderleri ve araştırma geliştirme giderleri. Kira, personel, reklam, nakliye, büro ve danışmanlık harcamaları bu kapsamdadır. Faiz ve kur farkı gibi finansman giderleri dahil değildir.`],
    [`Faaliyet kârı ile net kâr arasındaki fark nedir?`, `Faaliyet kârı yalnızca ana faaliyetin sonucudur. Net kâra ulaşmak için buna diğer faaliyetlerden gelir ve giderler ile olağan dışı kalemler eklenir, finansman giderleri ve vergi düşülür.`],
    [`Faaliyet kâr marjı negatif çıkarsa ne anlama gelir?`, `İşletmenin ana faaliyetinden zarar ettiğini gösterir: brüt kâr, işletme giderlerini karşılamaya yetmiyordur. Çözüm fiyatları ya da satış hacmini artırmak, maliyeti düşürmek ya da gider yapısını küçültmektir.`],
    [`Faaliyet kârı FAVÖK ile aynı mı?`, `Hayır. FAVÖK, faaliyet kârına amortisman ve itfa giderlerinin geri eklenmesiyle bulunur. Bu nedenle FAVÖK marjı faaliyet kâr marjından yüksek ya da ona eşit olur.`],
    [`Hizmet işletmesinde satışların maliyeti ne yazılır?`, `Verilen hizmetin doğrudan maliyeti: hizmeti üreten personelin ücreti, taşeron bedelleri, doğrudan kullanılan malzeme gibi. Maliyetlerinizi bu şekilde ayırmıyorsanız alana 0 yazıp tüm giderleri faaliyet giderleri alanına girebilirsiniz; faaliyet kâr marjı değişmez, yalnızca brüt marj %100 görünür.`],
    [`Aylık veriyle hesap yapabilir miyim?`, `Evet. Üç tutar da aynı döneme ait olduğu sürece ay, çeyrek ya da yıl fark etmez. Mevsimsellik olan işlerde tek aya bakmak yanıltıcı olabileceğinden yıllık ya da son on iki aylık veriyi tercih edin.`],
    [`Gelir tablosu verilerim bir yere gönderiliyor mu?`, `Hayır. Hesaplama tarayıcınızda yapılır; satış, maliyet ve gider tutarlarınız sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['kar-marji-hesapla', 'favok-hesapla', 'ozkaynak-karliligi-hesapla', 'aktif-karlilik-hesapla', 'katki-payi-hesapla', 'kar-zarar-hesapla'],
};
