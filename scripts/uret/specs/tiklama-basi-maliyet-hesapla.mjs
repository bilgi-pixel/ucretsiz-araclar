export default {
  slug: 'tiklama-basi-maliyet-hesapla',
  title: 'Tıklama Başı Maliyet (CPC) Hesaplama',
  h1Tail: 'TBM / CPC',
  pageTitle: 'Tıklama Başı Maliyet (CPC) Hesaplama – Reklam TBM Hesabı',
  description: 'Reklam harcamanızı tıklama sayısına bölerek tıklama başı maliyeti (CPC/TBM) hesaplayın; isterseniz tıklama oranı, bin gösterim ve dönüşüm başı maliyeti de görün.',
  card: 'Reklam harcaması ve tıklama sayısından tıklama başı maliyeti; gösterim ve dönüşüm girerseniz TO, BGBM ve dönüşüm maliyetini bulun.',
  category: 'finans',
  keywords: ['tıklama başı maliyet hesaplama', 'cpc hesaplama', 'tbm hesaplama', 'cpc nedir', 'reklam tıklama maliyeti', 'ortalama tbm', 'dönüşüm başı maliyet'],
  lead: `Bir reklam kampanyasında her tıklamanın size kaça mal olduğunu hesaplayın. Araç <strong>tıklama başı maliyet = harcama ÷ tıklama</strong> formülünü kullanır; gösterim ve dönüşüm sayısını da yazarsanız tıklama oranını, bin gösterim maliyetini ve dönüşüm başı maliyeti aynı ekranda verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'harcama', label: 'Reklam harcaması (TL)', type: 'number', placeholder: 'Örn. 1500', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
    { id: 'tiklama', label: 'Tıklama sayısı', type: 'number', placeholder: 'Örn. 600' },
    { id: 'gosterim', label: 'Gösterim sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 40000' },
    { id: 'donusum', label: 'Dönüşüm sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 12', hint: 'Satış, form, arama gibi hedeflediğiniz işlem adedi.' },
  ],
  compute(v, h) {
    const harcama = h.nonneg(v.harcama, 'Reklam harcaması');
    const tiklama = h.posint(v.tiklama, 'Tıklama sayısı');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const tbm = harcama / tiklama;
    const rows = [
      ['Tıklama başı maliyet', h.para(tbm)],
      ['100 tıklamanın maliyeti', h.para(tbm * 100)],
    ];
    if (dolu(v.gosterim)) {
      const gosterim = h.posint(v.gosterim, 'Gösterim sayısı');
      if (tiklama > gosterim) h.err('Tıklama sayısı gösterim sayısından büyük olamaz; iki alanı kontrol edin.');
      rows.push(['Tıklama oranı', '%' + h.fmt(tiklama / gosterim * 100, 2)]);
      rows.push(['Bin gösterim maliyeti', h.para(harcama / gosterim * 1000)]);
    }
    if (dolu(v.donusum)) {
      const donusum = h.int(v.donusum, 'Dönüşüm sayısı');
      if (donusum < 0) h.err('"Dönüşüm sayısı" negatif olamaz.');
      rows.push(['Dönüşüm oranı', '%' + h.fmt(donusum / tiklama * 100, 2)]);
      rows.push(['Dönüşüm başı maliyet', donusum > 0 ? h.para(harcama / donusum) : '—']);
    }
    return {
      rows,
      note: 'Sonuç, girdiğiniz dönemin ortalama tıklama başı maliyetidir; tek tek tıklamaların bedeli bu ortalamanın altında ya da üstünde olabilir.',
    };
  },
  cases: [
    { in: { harcama: '1500', tiklama: '600' }, out: { 'Tıklama başı maliyet': '2,50 TL', '100 tıklamanın maliyeti': '250,00 TL' } },
    { in: { harcama: '2400', tiklama: '800', gosterim: '40000' }, out: { 'Tıklama başı maliyet': '3,00 TL', 'Tıklama oranı': '%2', 'Bin gösterim maliyeti': '60,00 TL' } },
    { in: { harcama: '500', tiklama: '125', donusum: '5' }, out: { 'Tıklama başı maliyet': '4,00 TL', 'Dönüşüm oranı': '%4', 'Dönüşüm başı maliyet': '100,00 TL' } },
    { in: { harcama: '1000', tiklama: '3' }, out: { 'Tıklama başı maliyet': '333,33 TL' } },
    { in: { harcama: '0', tiklama: '100' }, out: { 'Tıklama başı maliyet': '0,00 TL' } },
    { in: { harcama: '900', tiklama: '300', gosterim: '12000', donusum: '0' }, out: { 'Tıklama başı maliyet': '3,00 TL', 'Tıklama oranı': '%2,5', 'Bin gösterim maliyeti': '75,00 TL', 'Dönüşüm oranı': '%0', 'Dönüşüm başı maliyet': '—' } },
    { in: { harcama: '1500', tiklama: '0' }, error: true },
    { in: { harcama: '1500', tiklama: '600', gosterim: '500' }, error: true },
    { in: { harcama: 'abc', tiklama: '600' }, error: true },
  ],
  howto: [
    `Reklam panelinizden incelemek istediğiniz dönemi (gün, hafta, ay ya da tek bir kampanya) seçin ve o döneme ait toplam harcamayı "Reklam harcaması" alanına yazın.`,
    `Aynı dönemin toplam tıklama sayısını "Tıklama sayısı" alanına girin. Harcama ile tıklamanın aynı kampanyaya ve aynı tarih aralığına ait olması şarttır.`,
    `Tıklama oranını ve bin gösterim maliyetini de görmek istiyorsanız gösterim sayısını; dönüşüm başı maliyeti görmek istiyorsanız satış, form ya da arama adedini ekleyin. Bu iki alan boş bırakılabilir.`,
    `"Hesapla" düğmesine basın. İlk satır ortalama tıklama başı maliyeti verir; diğer satırlar girdiğiniz ek verilere göre oluşur.`,
    `Farklı kampanyaları kıyaslamak için değerleri değiştirip yeniden hesaplayın, sonuçları "Sonucu kopyala" ile tablonuza aktarın.`,
  ],
  sections: [
    { h: 'Tıklama başı maliyet nedir?', p: [
      `Tıklama başı maliyet, reklamınıza yapılan her tıklama için ortalama ne kadar ödediğinizi gösteren ölçüdür. İngilizce "cost per click" ifadesinin kısaltması olan <strong>CPC</strong>, Türkçe reklam panellerinde çoğunlukla <strong>TBM</strong> olarak geçer. Arama ağı reklamlarında, sosyal medya trafik kampanyalarında ve pazaryeri sponsorlu ürünlerinde bütçenin ne kadar ziyaretçiye dönüştüğünü anlamanın en kısa yoludur.`,
      `Burada iki kavramı ayırmak gerekir. <em>Azami TBM</em>, bir tıklama için ödemeyi kabul ettiğiniz üst sınırdır ve teklif ayarıdır. <em>Ortalama TBM</em> ise gerçekleşen harcamanın gerçekleşen tıklamaya bölünmesiyle bulunur. Bu sayfadaki araç ikincisini, yani fiilen ödediğiniz ortalamayı hesaplar.`,
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      `Hesap tek bir bölme işlemidir: <strong>TBM = toplam harcama ÷ toplam tıklama</strong>. Bir haftada 1.500 TL harcayıp 600 tıklama aldıysanız 1.500 ÷ 600 = 2,50 TL bulunur; yani siteye gelen her ziyaret size ortalama iki buçuk liraya mal olmuştur. Aynı oranla 100 tıklama 250 TL eder.`,
      `Gösterim sayısını da biliyorsanız tablo genişler. 2.400 TL harcama, 800 tıklama ve 40.000 gösterim için TBM 2.400 ÷ 800 = 3,00 TL, tıklama oranı 800 ÷ 40.000 = %2, bin gösterim maliyeti ise 2.400 ÷ 40.000 × 1.000 = 60,00 TL olur. Bu üç değer birbirine bağlıdır: bin gösterim maliyeti, TBM ile tıklama oranının çarpımının on katına eşittir (3,00 × 2 × 10 = 60).`,
      `Dönüşüm tarafında da mantık aynıdır. 500 TL harcamayla 125 tıklama ve 5 satış geldiyse tıklama başı maliyet 4,00 TL, dönüşüm oranı 5 ÷ 125 = %4, dönüşüm başı maliyet 500 ÷ 5 = 100,00 TL çıkar. Başka bir deyişle dönüşüm başı maliyet, TBM'nin dönüşüm oranına bölünmesidir: 4 ÷ 0,04 = 100.`,
    ] },
    { h: 'TBM\'yi belirleyen etkenler', ul: [
      `<strong>Rekabet:</strong> Aynı anahtar kelimeye ya da aynı hedef kitleye teklif veren reklamveren sayısı arttıkça açık artırmadaki fiyat yükselir. Sigorta, hukuk, emlak gibi alanlarda tıklamalar bu yüzden pahalıdır.`,
      `<strong>Reklamın alaka düzeyi:</strong> Platformlar, kullanıcının aradığı şeyle örtüşen ve çok tıklanan reklamları ödüllendirir. Tıklama oranı yüksek bir reklam, aynı konumu daha düşük bedelle alabilir.`,
      `<strong>Hedefleme genişliği:</strong> Dar ve değerli bir kitle genellikle daha pahalı, geniş bir kitle daha ucuzdur; ancak ucuz tıklama her zaman nitelikli ziyaretçi anlamına gelmez.`,
      `<strong>Dönem:</strong> İndirim kampanyaları, bayram öncesi ve yıl sonu gibi yoğun haftalarda talep arttığı için ortalama bedel yükselme eğilimindedir.`,
      `<strong>Cihaz ve yerleşim:</strong> Mobil ile masaüstü, arama sonucu ile içerik ağı arasında belirgin farklar olabilir. Bu yüzden toplam ortalama yerine kırılımlara ayrı ayrı bakmak öğreticidir.`,
    ] },
    { h: 'Sonuç nasıl yorumlanır?', p: [
      `Tek başına "iyi" ya da "kötü" bir TBM yoktur. 20 TL'lik bir tıklama, sepet ortalaması 5.000 TL olan ve yirmi ziyaretçiden biri satın alan bir işletme için kârlıdır; 1 TL'lik bir tıklama ise hiç satışa dönmüyorsa pahalıdır. Bu yüzden değeri mutlaka dönüşüm oranı ve ürün kârıyla birlikte okuyun.`,
      `Katlanabileceğiniz en yüksek tıklama bedelini kabaca şöyle bulabilirsiniz: bir satıştan kalan brüt kârı dönüşüm oranıyla çarpın. Satış başına 400 TL kâr bırakan ve ziyaretçilerin %2'si alışveriş yapan bir mağazada bu sınır 400 × 0,02 = 8 TL'dir. Ortalama TBM bu rakamın üstündeyse kampanya her satışta zarar yazıyor demektir.`,
      `Sektör ortalaması olarak dolaşan rakamlar ülkeye, döneme ve platforma göre hızla değiştiğinden bu sayfada sabit bir kıyas değeri verilmemiştir. En sağlıklı karşılaştırma, kendi hesabınızın geçmiş dönemleriyle yapılandır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Harcamayı bir aydan, tıklamayı başka bir tarih aralığından almak. İki sayı aynı döneme ait değilse sonuç anlamsızdır.`,
      `Panelde görünen tutarın vergi içerip içermediğini karıştırmak. Faturanızdaki tutarla paneldeki tutar farklıysa hangisini kullandığınızı not edin ve her dönemde aynısını kullanın.`,
      `Toplam tıklama ile bağlantı tıklamasını birbirine karıştırmak. Bazı sosyal medya panelleri beğeni ve profil ziyareti gibi etkileşimleri de "tıklama" sayar; siteye giden trafiği ölçüyorsanız bağlantı tıklamasını kullanın.`,
      `Yalnızca en ucuz tıklamayı kovalamak. Amaç ucuz ziyaret değil, kârlı satıştır; dönüşüm başı maliyet satırı bu yüzden eklenmiştir.`,
      `Ajans hizmet bedeli, tasarım ve video gibi yan giderleri unutmak. Gerçek maliyeti görmek istiyorsanız bunları harcamaya ekleyerek ayrı bir hesap yapın.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç yalnızca yazdığınız sayılarla aritmetik yapar; reklam hesabınıza bağlanmaz, geçersiz tıklamaları ya da iade edilen tutarları bilemez. Dönüşüm sayısı sıfırsa dönüşüm başı maliyet tanımsız olduğu için çizgi (—) gösterilir. Sonuçlar bilgilendirme amaçlıdır; bütçe ve teklif kararlarını kendi kârlılık verilerinizle birlikte değerlendirin.`,
    ] },
  ],
  faq: [
    ['CPC ile TBM aynı şey mi?', `Evet. CPC, İngilizce "cost per click" ifadesinin kısaltmasıdır; TBM ise bunun Türkçe karşılığı olan "tıklama başı maliyet"in kısaltmasıdır. İkisi de harcamanın tıklama sayısına bölünmesiyle bulunur.`],
    ['Tıklama başı maliyet nasıl hesaplanır?', `Toplam reklam harcaması toplam tıklama sayısına bölünür. Örneğin 1.500 TL harcama ve 600 tıklama için sonuç 2,50 TL'dir. Araç bu işlemi ve ek oranları sizin yerinize yapar.`],
    ['TBM ile bin gösterim maliyeti arasındaki fark nedir?', `TBM tıklama başına, bin gösterim maliyeti ise reklamın bin kez görüntülenmesi başına ödenen ortalamadır. İkisini tıklama oranı birbirine bağlar: tıklama oranı yükseldikçe aynı gösterim maliyetiyle daha ucuz tıklama elde edilir.`],
    ['Tıklama başı maliyeti nasıl düşürebilirim?', `Genel olarak reklam metnini ve görselini aramayla daha uyumlu hale getirmek, ilgisiz aramaları dışlamak, açılış sayfasını hızlandırmak ve düşük performanslı hedeflemeleri kapatmak ortalama bedeli aşağı çeker. Kesin etki hesabınıza göre değişir; değişiklikleri tek tek deneyip ölçün.`],
    ['Düşük TBM her zaman iyi midir?', `Hayır. Ucuz tıklama, satın alma niyeti olmayan ziyaretçi getiriyorsa bütçe boşa gider. Asıl bakılması gereken, bir satış ya da başvuru elde etmek için toplam ne kadar harcandığıdır; bu yüzden dönüşüm başı maliyet satırını birlikte değerlendirin.`],
    ['Dönüşüm başı maliyet neden çizgi olarak görünüyor?', `Dönüşüm sayısını sıfır yazdığınızda harcama sıfıra bölünemeyeceği için bir değer hesaplanamaz. Bu durum, girilen dönemde hiç dönüşüm alınmadığı anlamına gelir.`],
    ['Birden fazla kampanyanın ortalamasını nasıl bulurum?', `Kampanyaların TBM değerlerinin ortalamasını almayın; bu yanlış sonuç verir. Bunun yerine tüm kampanyaların harcamalarını ve tıklamalarını ayrı ayrı toplayın, toplam harcamayı toplam tıklamaya bölün.`],
    ['Girdiğim reklam verileri kaydediliyor mu?', `Hayır. Hesaplama tamamen tarayıcınızda yapılır; harcama ve tıklama sayılarınız hiçbir sunucuya gönderilmez, saklanmaz. Sayfayı kapattığınızda değerler silinir.`],
  ],
  related: ['tiklama-orani-hesapla', 'bin-gosterim-maliyeti-hesapla', 'donusum-orani-hesapla', 'reklam-getirisi-hesapla', 'musteri-edinme-maliyeti-hesapla'],
};
