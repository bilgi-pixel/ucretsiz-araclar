export default {
  slug: 'zincirleme-indirim-hesapla',
  title: 'Zincirleme İndirim Hesaplama',
  h1Tail: 'art arda iskontolar',
  pageTitle: 'Zincirleme İndirim Hesaplama – Art Arda İskontoların Toplamı',
  description: 'Art arda uygulanan indirimleri (örneğin %20 + %10 + %5) hesaplayın: son fiyatı, toplam indirim tutarını ve tek indirime eşdeğer oranı adım adım görün.',
  card: '%20 + %10 gibi art arda indirimlerin son fiyatını ve tek indirime eşdeğer gerçek oranını adım adım hesaplayın.',
  category: 'finans',
  keywords: ['zincirleme indirim hesaplama', 'art arda indirim hesaplama', 'kademeli iskonto hesaplama', '20+10 indirim kaç eder', 'çift indirim hesaplama', 'eşdeğer indirim oranı', 'indirim üstüne indirim'],
  lead: `"%20 + %10 indirim" toplamda %30 etmez. Fiyatı ve art arda uygulanacak indirim oranlarını yazın; araç her adımı sırayla uygulayıp <strong>son fiyatı</strong> ve tek seferde yapılsa aynı sonucu verecek <strong>eşdeğer indirim oranını</strong> hesaplasın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Başlangıç fiyatı', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'oranlar', label: 'İndirim oranları (%)', type: 'text', placeholder: 'Örn. 20+10+5', hint: 'Oranları artı işareti ya da boşlukla ayırın; en fazla 10 oran.', wide: true },
  ],
  compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Başlangıç fiyatı');
    const ham = String(v.oranlar ?? '').replace(/[%+]/g, ' ');
    const oranlar = h.nums(ham, 'İndirim oranları');
    if (oranlar.length > 10) h.err('En fazla 10 indirim oranı girebilirsiniz.');
    for (const o of oranlar) if (o < 0 || o > 100) h.err('Her indirim oranı 0 ile 100 arasında olmalı.');
    let f = fiyat;
    const satirlar = [`Başlangıç fiyatı: ${h.para(fiyat)}`];
    oranlar.forEach((o, i) => {
      const ind = f * o / 100;
      f -= ind;
      satirlar.push(`${i + 1}. indirim (%${h.fmt(o, 2)}): −${h.para(ind)} → ${h.para(f)}`);
    });
    const carpan = f / fiyat;
    const toplam = oranlar.reduce((a, b) => a + b, 0);
    const esdeger = (1 - carpan) * 100;
    return {
      rows: [
        ['Son fiyat', h.para(f)],
        ['Toplam indirim tutarı', h.para(fiyat - f)],
        ['Tek indirime eşdeğer oran', '%' + h.fmt(esdeger, 2)],
        ['Oranların düz toplamı', '%' + h.fmt(toplam, 2)],
        ['Aradaki fark', h.fmt(toplam - esdeger, 2) + ' puan'],
        ['Fiyat çarpanı', h.fmt(carpan, 4)],
      ],
      text: satirlar.join('\n'),
      note: 'Her indirim, bir önceki indirimden sonra kalan fiyata uygulanır. Oranların sırası son fiyatı değiştirmez.',
    };
  },
  cases: [
    { in: { fiyat: '1000', oranlar: '20+10' }, out: { 'Son fiyat': '720,00 TL', 'Toplam indirim tutarı': '280,00 TL', 'Tek indirime eşdeğer oran': '%28', 'Oranların düz toplamı': '%30', 'Aradaki fark': '2 puan' } },
    { in: { fiyat: '1000', oranlar: '20 10 5' }, out: { 'Son fiyat': '684,00 TL', 'Tek indirime eşdeğer oran': '%31,6', 'Fiyat çarpanı': '0,684' } },
    { in: { fiyat: '200', oranlar: '%50 + %50' }, out: { 'Son fiyat': '50,00 TL', 'Tek indirime eşdeğer oran': '%75' } },
    { in: { fiyat: '100', oranlar: '10' }, out: { 'Son fiyat': '90,00 TL', 'Aradaki fark': '0 puan' }, text: 'Başlangıç fiyatı: 100,00 TL\n1. indirim (%10): −10,00 TL → 90,00 TL' },
    { in: { fiyat: '2500', oranlar: '15; 5' }, out: { 'Son fiyat': '2.018,75 TL', 'Toplam indirim tutarı': '481,25 TL', 'Tek indirime eşdeğer oran': '%19,25' } },
    { in: { fiyat: '800', oranlar: '12,5+12,5' }, out: { 'Son fiyat': '612,50 TL', 'Tek indirime eşdeğer oran': '%23,44' } },
    { in: { fiyat: '1000', oranlar: '120' }, error: true },
    { in: { fiyat: '1000', oranlar: '' }, error: true },
    { in: { fiyat: '0', oranlar: '20+10' }, error: true },
  ],
  howto: [
    `"Başlangıç fiyatı" alanına ürünün indirim öncesi liste ya da etiket fiyatını yazın.`,
    `"İndirim oranları" alanına oranları uygulanma sırasıyla girin. <code>20+10+5</code>, <code>20 10 5</code> ya da <code>%20 + %10</code> yazımlarının hepsi kabul edilir; ondalık için virgül kullanın.`,
    `"Hesapla" düğmesine basın. Son fiyat, toplam indirim tutarı ve tek indirime eşdeğer oran sonuç satırlarında görünür.`,
    `Alttaki kutuda her indirimin kaç lira düşürdüğünü ve ara fiyatları adım adım inceleyin.`,
  ],
  sections: [
    { h: 'Zincirleme indirim nedir?', p: [
      `Zincirleme indirim, aynı fiyata birden fazla indirim oranının sırayla uygulanmasıdır. Kademeli iskonto ya da art arda indirim olarak da anılır. Belirleyici özelliği, her yeni indirimin ilk fiyata değil, <strong>bir önceki indirimden sonra kalan fiyata</strong> uygulanmasıdır. Bu yüzden oranlar toplanmaz, çarpılarak birleşir.`,
      `Türkiye'de bu yapıyla en çok toptan ticarette karşılaşılır: üretici fiyat listesini sabit tutar, bayiye "20+10" ya da "25+5+3" biçiminde iskonto tanımlar. İlk oran çoğunlukla bayi iskontosu, ikincisi miktar ya da kampanya iskontosu, sonuncusu peşin ödeme iskontosudur. Mağazalardaki "sepette ek %10 indirim" ve "indirimli ürünlerde kasada ayrıca %20" kampanyaları da aynı mantıkla çalışır.`,
    ] },
    { h: 'Formül', p: [
      `Oranlar o<sub>1</sub>, o<sub>2</sub>, o<sub>3</sub>… ise son fiyat şu çarpımla bulunur: <strong>Son fiyat = Fiyat × (1 − o<sub>1</sub>/100) × (1 − o<sub>2</sub>/100) × (1 − o<sub>3</sub>/100)…</strong>`,
      `Parantezlerin çarpımına fiyat çarpanı denir. Tek seferde yapılsa aynı sonucu verecek indirim oranı ise <strong>Eşdeğer oran = (1 − fiyat çarpanı) × 100</strong> eşitliğinden çıkar. İki oran için kısa yol şöyledir: eşdeğer oran = a + b − a × b ÷ 100. %20 ve %10 için 20 + 10 − 2 = %28 bulunur.`,
    ] },
    { h: 'Çözümlü örnek: 1.000 liraya 20 + 10 + 5', p: [
      `Liste fiyatı 1.000 lira olan bir ürüne sırasıyla %20, %10 ve %5 iskonto uygulanıyor.`,
    ], ol: [
      `Birinci indirim: 1.000 × 0,20 = 200 lira düşer, fiyat 800 lira olur.`,
      `İkinci indirim: 800 × 0,10 = 80 lira düşer, fiyat 720 lira olur.`,
      `Üçüncü indirim: 720 × 0,05 = 36 lira düşer, son fiyat 684 lira olur.`,
      `Toplam indirim 316 liradır; eşdeğer oran 316 ÷ 1.000 = %31,6'dır. Oranların düz toplamı %35 olduğu için aradaki fark 3,4 puandır.`,
    ] },
    { h: 'Neden oranlar toplanmaz?', p: [
      `İkinci indirimin matrahı küçülmüştür. İlk örnekte %10'luk ikinci indirim 1.000 liranın değil 800 liranın yüzde onudur; bu yüzden 100 değil 80 lira düşürür. Oran sayısı ve büyüklüğü arttıkça düz toplamla gerçek indirim arasındaki fark açılır. En çarpıcı örnek %50 + %50'dir: toplamı %100 gibi görünür, ama ürün bedavaya gelmez; fiyat önce yarıya, sonra yarının yarısına iner ve gerçek indirim %75 olur.`,
      `Bu nedenle bir teklifteki "20+10+5" ifadesini "yüzde 35 iskonto" diye okumak alıcıyı yanıltır. İki tedarikçinin tekliflerini karşılaştırırken her ikisini de eşdeğer orana çevirmek gerekir: "25+5" (%28,75) teklifi, "20+10" (%28) teklifinden biraz daha avantajlıdır; oysa ikisinin de düz toplamı 30'dur.`,
    ] },
    { h: 'Sıra sonucu değiştirir mi?', p: [
      `Hayır. Çarpma işleminde sıranın önemi olmadığı için %20 + %10 ile %10 + %20 aynı son fiyatı verir. Değişen tek şey, her adımda lira olarak düşen tutardır; adım adım dökümde bunu görebilirsiniz. Sıranın önem kazandığı tek durum, araya sabit tutarlı bir indirim (örneğin 100 lira kupon) girmesidir; bu araç yalnızca yüzde indirimleri hesaplar.`,
    ] },
    { h: 'Sık kullanılan zincirlerin eşdeğer oranları', ul: [
      `<strong>10 + 10</strong> → %19`,
      `<strong>20 + 10</strong> → %28`,
      `<strong>20 + 20</strong> → %36`,
      `<strong>25 + 5</strong> → %28,75`,
      `<strong>30 + 10</strong> → %37`,
      `<strong>30 + 20</strong> → %44`,
      `<strong>50 + 20</strong> → %60`,
      `<strong>20 + 10 + 5</strong> → %31,6`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç en fazla on oran kabul eder ve her oranın 0 ile 100 arasında olmasını ister. Kuruş yuvarlaması yalnızca gösterimde yapılır; ara adımlar tam değerle hesaplanır. Faturada her satır ayrı ayrı kuruşa yuvarlandığında toplamda birkaç kuruşluk fark oluşabilir. KDV hesaba dahil değildir; KDV'yi son fiyat üzerinden ayrıca hesaplamanız gerekir. Sonuçlar bilgilendirme amaçlıdır; sözleşme ve fatura tutarlarında satıcının resmî belgesi esas alınır.`,
    ] },
  ],
  faq: [
    [`%20 + %10 indirim toplamda yüzde kaç eder?`, `%28 eder. Fiyat önce 0,80 ile, sonra 0,90 ile çarpılır; 0,80 × 0,90 = 0,72 olduğundan fiyatın %72'si ödenir ve gerçek indirim %28'dir.`],
    [`Zincirleme indirim ile normal indirim arasındaki fark nedir?`, `Normal indirimde tek bir oran liste fiyatına uygulanır. Zincirleme indirimde birden fazla oran vardır ve her biri bir öncekinden kalan fiyata uygulanır; bu yüzden toplam etki oranların toplamından küçük olur.`],
    [`İndirimlerin sırasını değiştirirsem fiyat değişir mi?`, `Değişmez. %30 + %10 ile %10 + %30 aynı son fiyatı verir, çünkü hesap çarpmaya dayanır. Yalnızca ara adımlarda düşen lira tutarları farklı görünür.`],
    [`%50 + %50 indirim ürünü bedava yapar mı?`, `Hayır. İlk indirim fiyatı yarıya, ikincisi yarının yarısına indirir. 200 liralık ürün 50 liraya düşer; gerçek indirim %75'tir.`],
    [`Oranları nasıl yazmalıyım?`, `Aralarına artı işareti, boşluk ya da noktalı virgül koyabilirsiniz; yüzde işareti yazmanız gerekmez. Ondalıklı oranlarda virgül kullanın: 12,5+7,5 gibi.`],
    [`Eşdeğer indirim oranı ne işe yarar?`, `Farklı yapıdaki teklifleri tek bir sayıyla karşılaştırmanızı sağlar. "25+5" teklifinin eşdeğeri %28,75, "20+10" teklifinin eşdeğeri %28'dir; düz toplamları aynı olsa da ilki daha ucuzdur.`],
    [`Zincirleme indirimde KDV nasıl hesaplanır?`, `KDV, bütün iskontolar düşüldükten sonra kalan son fiyat üzerinden hesaplanır. Bu araç KDV eklemez; son fiyatı KDV hesaplama aracına aktararak KDV dahil tutarı bulabilirsiniz.`],
    [`Girdiğim fiyat ve oranlar saklanıyor mu?`, `Hayır. Hesaplama yalnızca tarayıcınızda çalışır; yazdıklarınız sunucuya gönderilmez ve sayfayı kapattığınızda silinir.`],
  ],
  related: ['iskonto-hesapla', 'indirim-orani-hesapla', 'kdv-hesapla', 'yuzde-degisim-hesapla', 'kar-zarar-hesapla'],
};
