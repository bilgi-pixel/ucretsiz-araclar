export default {
  slug: 'stok-devir-hizi-hesapla',
  title: 'Stok Devir Hızı Hesaplama',
  h1Tail: 've stokta kalma süresi',
  pageTitle: 'Stok Devir Hızı Hesaplama – Stok Devir Süresi ve Ortalama Stok',
  description: 'Satılan malın maliyeti ile dönem başı ve dönem sonu stoktan stok devir hızını, ortalama stoku ve stokların kaç günde bir yenilendiğini hesaplayın.',
  card: 'Satılan malın maliyeti ve stok tutarlarından stok devir hızını ve stokta kalma süresini (gün) hesaplayın.',
  category: 'finans',
  keywords: ['stok devir hızı hesaplama', 'stok devir süresi', 'stok devir hızı formülü', 'ortalama stok hesaplama', 'stokta kalma süresi', 'envanter devir hızı', 'stok devir oranı'],
  lead: `Satılan malın maliyetini ve dönem başı ile dönem sonu stok tutarlarını yazın; araç <strong>stok devir hızını</strong>, yani stoklarınızın dönem içinde kaç kez satılıp yenilendiğini ve bir malın ortalama kaç gün rafta beklediğini hesaplasın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'smm', label: 'Satılan malın maliyeti', type: 'number', placeholder: 'Örn. 1200000', hint: 'Dönemin gelir tablosundaki satışların maliyeti.' },
    { id: 'basStok', label: 'Dönem başı stok', type: 'number', placeholder: 'Örn. 150000' },
    { id: 'sonStok', label: 'Dönem sonu stok', type: 'number', placeholder: 'Örn. 250000' },
    { id: 'gun', label: 'Dönemin gün sayısı', type: 'number', value: '365', hint: 'Yıllık hesap için 365, çeyrek için 90, ay için 30.' },
  ],
  compute(v, h) {
    const smm = h.nonneg(v.smm, 'Satılan malın maliyeti');
    const bas = h.nonneg(v.basStok, 'Dönem başı stok');
    const son = h.nonneg(v.sonStok, 'Dönem sonu stok');
    const gun = h.pos(h.opt(v.gun, 365, 'Dönemin gün sayısı') + '', 'Dönemin gün sayısı');
    const ort = (bas + son) / 2;
    if (!(ort > 0)) h.err('Dönem başı ve dönem sonu stokun ikisi de sıfır olamaz; ortalama stok sıfır çıkar ve oran hesaplanamaz.');
    const devir = smm / ort;
    return {
      rows: [
        ['Stok devir hızı', h.fmt(devir, 2) + ' kez'],
        ['Stokta kalma süresi', devir > 0 ? h.fmt(gun / devir, 1) + ' gün' : 'Satış olmadığı için hesaplanamaz'],
        ['Ortalama stok', h.para(ort)],
        ['Stoktaki değişim', (son - bas >= 0 ? '+' : '−') + h.para(Math.abs(son - bas))],
        ['Yıllığa çevrilmiş devir hızı', h.fmt(devir * 365 / gun, 2) + ' kez'],
      ],
      note: 'Ortalama stok = (dönem başı + dönem sonu) ÷ 2. Stok tutarları mevsimsel dalgalanıyorsa ay sonu stoklarının ortalamasıyla hesap daha gerçekçi olur.',
    };
  },
  cases: [
    { in: { smm: '1200000', basStok: '150000', sonStok: '250000' }, out: { 'Stok devir hızı': '6 kez', 'Stokta kalma süresi': '60,8 gün', 'Ortalama stok': '200.000,00 TL', 'Stoktaki değişim': '+100.000,00 TL' } },
    { in: { smm: '600000', basStok: '100000', sonStok: '100000', gun: '360' }, out: { 'Stok devir hızı': '6 kez', 'Stokta kalma süresi': '60 gün' } },
    { in: { smm: '500000', basStok: '0', sonStok: '200000' }, out: { 'Stok devir hızı': '5 kez', 'Stokta kalma süresi': '73 gün', 'Ortalama stok': '100.000,00 TL' } },
    { in: { smm: '300000', basStok: '220000', sonStok: '180000', gun: '90' }, out: { 'Stok devir hızı': '1,5 kez', 'Stokta kalma süresi': '60 gün', 'Stoktaki değişim': '−40.000,00 TL', 'Yıllığa çevrilmiş devir hızı': '6,08 kez' } },
    { in: { smm: '0', basStok: '50000', sonStok: '50000' }, out: { 'Stok devir hızı': '0 kez', 'Stokta kalma süresi': 'Satış olmadığı için hesaplanamaz' } },
    { in: { smm: '3650000', basStok: '90000', sonStok: '110000' }, out: { 'Stok devir hızı': '36,5 kez', 'Stokta kalma süresi': '10 gün' } },
    { in: { smm: '1200000', basStok: '0', sonStok: '0' }, error: true },
    { in: { smm: '', basStok: '150000', sonStok: '250000' }, error: true },
    { in: { smm: '1200000', basStok: '-5', sonStok: '250000' }, error: true },
  ],
  howto: [
    `"Satılan malın maliyeti" alanına incelediğiniz dönemin gelir tablosundaki satışların maliyeti tutarını yazın.`,
    `"Dönem başı stok" ve "Dönem sonu stok" alanlarına aynı dönemin açılış ve kapanış bilançolarındaki stok tutarlarını girin.`,
    `Dönem bir yıl değilse "Dönemin gün sayısı" alanını değiştirin: çeyrek için 90, ay için 30 gibi.`,
    `"Hesapla" düğmesine basın. Stok devir hızı ilk satırda, stokta kalma süresi ve ortalama stok altında görünür.`,
  ],
  sections: [
    { h: 'Stok devir hızı nedir?', p: [
      `Stok devir hızı, bir işletmenin stoklarını belirli bir dönemde kaç kez satıp yerine yenisini koyduğunu gösteren faaliyet oranıdır. Devir hızı 6 çıkan bir işletme, elindeki ortalama stoku yıl içinde altı kez eritmiş demektir. Oran ne kadar yüksekse mal o kadar hızlı paraya dönüyor, depoda ve rafta o kadar az bekliyor demektir.`,
      `Stok, işletmenin parasının mal olarak bekleyen kısmıdır. Yavaş dönen stok hem nakdi bağlar hem de depolama, sigorta, bozulma, modası geçme ve fiyat düşüşü risklerini beraberinde getirir. Bu nedenle stok devir hızı, bankaların kredi değerlendirmelerinde ve yöneticilerin satın alma kararlarında en çok bakılan göstergelerden biridir.`,
    ] },
    { h: 'Formül', p: [
      `<strong>Stok devir hızı = Satılan malın maliyeti ÷ Ortalama stok</strong>. Ortalama stok, dönem başı ve dönem sonu stok tutarlarının toplamının ikiye bölünmesiyle bulunur. Devir hızından stokta kalma süresine geçmek için dönemin gün sayısı devir hızına bölünür: <strong>Stok devir süresi = Gün sayısı ÷ Stok devir hızı</strong>.`,
      `Payda neden satış geliri değil de satılan malın maliyeti kullanılır? Çünkü stoklar bilançoda maliyet bedeliyle yer alır. Kâr payını içeren satış hasılatını maliyetle değerlenmiş stoka bölmek oranı olduğundan yüksek gösterir. Tekdüzen Hesap Planı'nı kullanan işletmelerde bu tutar gelir tablosundaki satışların maliyeti kaleminden, stok tutarları ise bilançonun stoklar grubundan alınır.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir yapı market işletmesinin yıllık satılan mal maliyeti 1.200.000 lira, yıl başındaki stoku 150.000 lira, yıl sonundaki stoku 250.000 lira olsun.`,
    ], ol: [
      `Ortalama stok: (150.000 + 250.000) ÷ 2 = 200.000 lira.`,
      `Stok devir hızı: 1.200.000 ÷ 200.000 = 6 kez.`,
      `Stokta kalma süresi: 365 ÷ 6 = 60,8 gün.`,
      `Yorum: İşletme stokunu yılda altı kez, yani yaklaşık iki ayda bir yeniliyor. Dönem içinde stok 100.000 lira artmıştır; bu artış satış büyümesinden gelmiyorsa satın almanın satışın önüne geçtiğine işaret edebilir.`,
    ] },
    { h: 'Sonuç nasıl yorumlanır?', p: [
      `Stok devir hızının "iyi" değeri sektörden sektöre çok değişir. Taze gıda, fırın, akaryakıt gibi hızlı tüketilen ürünlerde mal birkaç günde döner ve devir hızı çok yüksek çıkar. Mobilya, kuyumculuk, yedek parça ya da iş makinesi gibi alanlarda ise yılda birkaç devir olağandır. Bu yüzden oranı evrensel bir eşikle değil, <strong>aynı sektördeki işletmelerle ve kendi geçmiş dönemlerinizle</strong> karşılaştırmak gerekir.`,
      `Devir hızının düşmesi satışların yavaşladığını, gereğinden fazla mal alındığını ya da stokta satılamayan ölü ürün biriktiğini gösterebilir. Aşırı yüksek devir hızı da her zaman olumlu değildir: stokun çok düşük tutulduğu, müşterinin aradığı ürünü bulamadığı ve satış kaçırıldığı anlamına gelebilir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Satış hasılatını kullanmak:</strong> Net satışlar yerine satılan malın maliyeti kullanılmalıdır; aksi hâlde oran kâr marjı kadar şişer.`,
      `<strong>Yalnızca dönem sonu stokuna bakmak:</strong> Yıl sonu sayımından önce stok eritilmişse oran yanıltıcı biçimde yüksek çıkar. Ortalama stok bu etkiyi azaltır.`,
      `<strong>Dönemleri karıştırmak:</strong> Üç aylık maliyeti yıllık gün sayısıyla kullanmak süreyi dört kat uzatır. Dönem bir yıldan kısaysa gün sayısını ona göre girin.`,
      `<strong>Mevsimselliği göz ardı etmek:</strong> Klima, kırtasiye ya da kışlık giyim gibi mevsimlik işlerde iki noktalı ortalama yetersiz kalır; ay sonu stoklarının ortalaması daha doğru sonuç verir.`,
      `<strong>Farklı değerleme yöntemlerini karşılaştırmak:</strong> Stok maliyetini farklı yöntemlerle hesaplayan iki işletmenin oranları doğrudan karşılaştırılamaz.`,
    ] },
    { h: 'Devir hızı ile gün sayısı arasında hızlı başvuru', ul: [
      `Devir hızı <strong>2</strong> → yaklaşık 182,5 gün`,
      `Devir hızı <strong>4</strong> → yaklaşık 91 gün`,
      `Devir hızı <strong>6</strong> → yaklaşık 61 gün`,
      `Devir hızı <strong>12</strong> → yaklaşık 30 gün`,
      `Devir hızı <strong>36,5</strong> → 10 gün`,
      `Devir hızı <strong>52</strong> → yaklaşık 7 gün`,
    ] },
    { h: 'Uyarı', p: [
      `Bu araç yalnızca yazdığınız üç tutardan aritmetik oran üretir; stok kalitesi, kalem bazındaki dağılım ya da sektör ortalaması hakkında bilgi vermez. Sonuç bilgilendirme amaçlıdır. Kredi başvurusu, yatırım ya da işletme değerlemesi gibi mali kararlarda oranları bir mali müşavir ya da finans uzmanıyla birlikte değerlendirin.`,
    ] },
  ],
  faq: [
    [`Stok devir hızı nasıl hesaplanır?`, `Dönemin satılan mal maliyeti ortalama stoka bölünür. Maliyet 1.200.000 lira, ortalama stok 200.000 lira ise devir hızı 6'dır; stok yılda altı kez yenilenmiştir.`],
    [`Stok devir süresi nedir?`, `Bir malın stoka girişinden satışına kadar geçen ortalama gün sayısıdır. Dönemin gün sayısı devir hızına bölünerek bulunur; devir hızı 6 ise süre 365 ÷ 6 = 60,8 gündür.`],
    [`Stok devir hızı yüksek mi olmalı, düşük mü?`, `Genel olarak yüksek devir hızı malın hızlı satıldığını ve nakdin stokta az beklediğini gösterir. Ancak çok yüksek değer yetersiz stok ve kaçan satış anlamına da gelebilir. Doğru karşılaştırma sektör ortalaması ve önceki dönemlerle yapılır.`],
    [`Satılan malın maliyeti yerine satış tutarını kullanabilir miyim?`, `Önerilmez. Stok maliyet bedeliyle izlendiği için pay da maliyet olmalıdır. Satış tutarını kullanırsanız oran kâr marjınız kadar yüksek çıkar. Maliyet bilgisine ulaşamıyorsanız sonucu yalnızca kaba bir gösterge olarak değerlendirin.`],
    [`Dönem başı stokum sıfırsa ne olur?`, `Yeni kurulan işletmelerde bu durum olağandır. Araç ortalamayı (0 + dönem sonu stok) ÷ 2 olarak alır. Bu, gerçek ortalamayı olduğundan düşük gösterebileceği için sonucu ihtiyatla yorumlayın.`],
    [`Aylık ya da üç aylık hesap yapabilir miyim?`, `Evet. O döneme ait maliyeti ve stok tutarlarını yazıp gün sayısını 30 ya da 90 olarak değiştirin. Araç ayrıca devir hızını yıllığa çevirerek karşılaştırma yapmanızı kolaylaştırır.`],
    [`Stok devir hızı adet üzerinden hesaplanabilir mi?`, `Tek bir ürün için evet: dönemde satılan adedi ortalama stok adedine bölersiniz. Alanlara tutar yerine adet yazabilirsiniz; sonuçtaki "TL" ibaresini adet olarak okumanız yeterlidir.`],
    [`Girdiğim mali veriler bir yere gönderiliyor mu?`, `Hayır. Hesaplama tamamen tarayıcınızda yapılır; maliyet ve stok tutarlarınız sunucuya iletilmez, kaydedilmez.`],
  ],
  related: ['alacak-devir-hizi-hesapla', 'nakit-donusum-suresi-hesapla', 'cari-oran-hesapla', 'ekonomik-siparis-miktari-hesapla', 'emniyet-stogu-hesapla'],
};
