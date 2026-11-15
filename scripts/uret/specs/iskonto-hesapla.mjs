export default {
  slug: 'iskonto-hesapla',
  title: 'İskonto Hesaplama',
  h1Tail: 'tutar, oran ve liste fiyatı',
  pageTitle: 'İskonto Hesaplama – İskonto Tutarı, Oranı ve Net Fiyat Bulma',
  description: 'Liste fiyatı ve iskonto oranından net fiyatı bulun; ya da ödenen tutardan iskonto oranını, iskontolu fiyattan liste fiyatını hesaplayın. KDV eklenebilir.',
  card: 'Liste fiyatı, iskonto oranı ve net fiyattan ikisini yazın, üçüncüsünü bulun; isterseniz KDV dahil tutarı da görün.',
  category: 'finans',
  keywords: ['iskonto hesaplama', 'iskonto oranı hesaplama', 'iskontolu fiyat hesaplama', 'yüzde iskonto hesaplama', 'fatura iskonto hesaplama', 'iskonto tutarı bulma', 'liste fiyatı bulma'],
  lead: `Ticari iskonto hesabının üç bilinmeyeni vardır: liste fiyatı, iskonto oranı ve iskontolu net fiyat. Bunlardan ikisini yazın, araç üçüncüsünü ve <strong>iskonto tutarını</strong> bulsun; KDV oranı girerseniz faturanın KDV dahil toplamını da gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplanacak?', type: 'select', wide: true, options: [['tutar', 'İskontolu net fiyat (liste fiyatı ve oran biliniyor)'], ['oran', 'İskonto oranı (liste ve net fiyat biliniyor)'], ['liste', 'Liste fiyatı (net fiyat ve oran biliniyor)']] },
    { id: 'liste', label: 'Liste fiyatı', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'oran', label: 'İskonto oranı (%)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'net', label: 'İskontolu net fiyat', type: 'number', placeholder: 'Örn. 800' },
    { id: 'kdv', label: 'KDV oranı (%) (isteğe bağlı)', type: 'number', placeholder: 'Örn. 20', hint: 'Boş bırakırsanız KDV satırları gösterilmez.' },
  ],
  compute(v, h) {
    const mod = v.mod || 'tutar';
    let liste, oran, net;
    if (mod === 'oran') {
      liste = h.pos(v.liste, 'Liste fiyatı');
      net = h.nonneg(v.net, 'İskontolu net fiyat');
      if (net > liste) h.err('İskontolu net fiyat liste fiyatından büyük olamaz; iki tutarı kontrol edin.');
      oran = ((liste - net) / liste) * 100;
    } else if (mod === 'liste') {
      net = h.pos(v.net, 'İskontolu net fiyat');
      oran = h.nonneg(v.oran, 'İskonto oranı');
      if (oran >= 100) h.err('Liste fiyatını bulmak için iskonto oranı %100\'den küçük olmalı.');
      liste = net / (1 - oran / 100);
    } else {
      liste = h.pos(v.liste, 'Liste fiyatı');
      oran = h.nonneg(v.oran, 'İskonto oranı');
      if (oran > 100) h.err('İskonto oranı %100\'den büyük olamaz.');
      net = liste * (1 - oran / 100);
    }
    const kdv = h.opt(v.kdv, 0, 'KDV oranı');
    if (kdv < 0 || kdv > 100) h.err('KDV oranı 0 ile 100 arasında olmalı.');
    const isk = liste - net;
    const sNet = ['İskontolu net fiyat', h.para(net)];
    const sOran = ['İskonto oranı', '%' + h.fmt(oran, 2)];
    const sListe = ['Liste fiyatı', h.para(liste)];
    const sIsk = ['İskonto tutarı', h.para(isk)];
    const rows = mod === 'oran' ? [sOran, sIsk, sListe, sNet] : mod === 'liste' ? [sListe, sIsk, sOran, sNet] : [sNet, sIsk, sOran, sListe];
    if (kdv > 0) {
      const kdvTutar = net * kdv / 100;
      rows.push(['KDV tutarı', h.para(kdvTutar)]);
      rows.push(['KDV dahil ödenecek', h.para(net + kdvTutar)]);
    }
    return {
      rows,
      note: kdv > 0 ? 'KDV, iskonto düşüldükten sonra kalan net fiyat üzerinden hesaplanmıştır; liste ve net fiyat KDV hariç kabul edilir.' : 'Tutarlar yazdığınız esasla (KDV dahil ya da hariç) aynen kullanılır.',
    };
  },
  cases: [
    { in: { mod: 'tutar', liste: '1000', oran: '20' }, out: { 'İskontolu net fiyat': '800,00 TL', 'İskonto tutarı': '200,00 TL' } },
    { in: { mod: 'oran', liste: '500', net: '425' }, out: { 'İskonto oranı': '%15', 'İskonto tutarı': '75,00 TL' } },
    { in: { mod: 'liste', net: '720', oran: '10' }, out: { 'Liste fiyatı': '800,00 TL', 'İskonto tutarı': '80,00 TL' } },
    { in: { mod: 'tutar', liste: '1000', oran: '20', kdv: '20' }, out: { 'İskontolu net fiyat': '800,00 TL', 'KDV tutarı': '160,00 TL', 'KDV dahil ödenecek': '960,00 TL' } },
    { in: { mod: 'tutar', liste: '2450', oran: '12,5' }, out: { 'İskontolu net fiyat': '2.143,75 TL', 'İskonto tutarı': '306,25 TL' } },
    { in: { mod: 'oran', liste: '1200', net: '900', kdv: '10' }, out: { 'İskonto oranı': '%25', 'KDV tutarı': '90,00 TL', 'KDV dahil ödenecek': '990,00 TL' } },
    { in: { mod: 'tutar', liste: '300', oran: '100' }, out: { 'İskontolu net fiyat': '0,00 TL' } },
    { in: { mod: 'tutar', liste: '1000', oran: '120' }, error: true },
    { in: { mod: 'oran', liste: '500', net: '600' }, error: true },
    { in: { mod: 'liste', net: '720', oran: '100' }, error: true },
  ],
  howto: [
    `"Ne hesaplanacak?" listesinden bilinmeyeni seçin: net fiyat, iskonto oranı ya da liste fiyatı.`,
    `Seçiminize göre bilinen iki alanı doldurun. Hesaplanacak olan alanı boş bırakabilirsiniz; araç o alanı dikkate almaz.`,
    `Faturanın KDV dahil toplamını da görmek istiyorsanız "KDV oranı" alanına oranı yazın; istemiyorsanız boş bırakın.`,
    `"Hesapla" düğmesine basın. Aradığınız değer ilk satırda, iskonto tutarı ve diğer bilgiler altında listelenir.`,
    `Sonucu teklif ya da faturaya aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'İskonto nedir?', p: [
      `İskonto, satıcının liste fiyatı üzerinden alıcıya tanıdığı fiyat indirimidir. Gündelik dildeki "indirim" sözcüğüyle aynı anlama gelir; ancak ticari yazışmalarda, tekliflerde ve faturalarda daha çok iskonto terimi kullanılır. Toptancının bayisine yaptığı miktar iskontosu, peşin ödeyen müşteriye tanınan nakit iskontosu, sezon sonu ya da kampanya iskontosu en sık karşılaşılan türlerdir.`,
      `Bu araç ticari iskontoyu, yani bir mal ya da hizmetin fiyatından yüzde olarak yapılan indirimi hesaplar. Çek ve senetlerin vadesinden önce paraya çevrilmesinde uygulanan ve faiz hesabına dayanan iskonto ayrı bir konudur; onun için kırdırma hesabı yapan aracımızı kullanmalısınız.`,
    ] },
    { h: 'İskonto formülleri', p: [
      `Üç büyüklük birbirine tek bir eşitlikle bağlıdır: <strong>Net fiyat = Liste fiyatı × (1 − İskonto oranı ÷ 100)</strong>. Bu eşitlikten diğer ikisi de çıkar.`,
    ], ul: [
      `<strong>İskonto tutarı</strong> = Liste fiyatı × İskonto oranı ÷ 100`,
      `<strong>İskonto oranı</strong> = (Liste fiyatı − Net fiyat) ÷ Liste fiyatı × 100`,
      `<strong>Liste fiyatı</strong> = Net fiyat ÷ (1 − İskonto oranı ÷ 100)`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Net fiyatı bulma:</strong> Liste fiyatı 1.000 lira olan bir ürüne %20 iskonto uygulanıyor. İskonto tutarı 1.000 × 20 ÷ 100 = 200 lira, net fiyat 1.000 − 200 = 800 liradır. KDV oranı %20 ise KDV iskontolu tutar üzerinden 800 × 0,20 = 160 lira hesaplanır ve ödenecek toplam 960 lira olur.`,
      `<strong>Oranı bulma:</strong> Etiket fiyatı 500 lira olan ürün için 425 lira ödediniz. İndirim 75 liradır ve oran 75 ÷ 500 × 100 = %15 çıkar. Bir tedarikçinin "özel fiyat" dediği teklifin gerçekte yüzde kaç iskonto olduğunu bu yolla saniyeler içinde görebilirsiniz.`,
      `<strong>Liste fiyatını bulma:</strong> %10 iskontodan sonra 720 lira ödenen bir ürünün iskonto öncesi fiyatı 720 ÷ 0,90 = 800 liradır. Burada en sık yapılan hata 720'ye %10 eklemektir; bu işlem 792 lira verir ve yanlıştır, çünkü iskonto liste fiyatı üzerinden hesaplanmıştı, net fiyat üzerinden değil.`,
    ] },
    { h: 'Faturada iskonto ve KDV', p: [
      `Fatura üzerinde gösterilen iskontolarda KDV, iskonto düşüldükten sonra kalan tutar üzerinden hesaplanır. Bu nedenle araç, KDV oranı girdiğinizde önce net fiyatı bulur, sonra KDV'yi bu tutara uygular. Liste fiyatı üzerinden KDV hesaplayıp sonra iskonto düşmek de aritmetik olarak aynı toplamı verir; ancak faturadaki satır düzeni ilk yöntemi izler.`,
      `Muhasebe kayıtlarında faturada yer alan iskonto genellikle ayrıca izlenmez, satış net tutarıyla kaydedilir. Fatura kesildikten sonra, örneğin erken ödeme ya da dönem sonu ciro hedefi nedeniyle yapılan iskontolar ise ayrı belgeyle ve ayrı hesapta izlenir. Uygulamanın ayrıntıları işletmenin durumuna göre değişebildiği için kayıt düzeni konusunda mali müşavirinizin yönlendirmesini esas alın.`,
    ] },
    { h: 'İskonto türleri', ul: [
      `<strong>Miktar iskontosu:</strong> Belirli adedin ya da tutarın üzerindeki alımlara uygulanır; koli, palet ya da tır bazında kademelenebilir.`,
      `<strong>Nakit (peşin ödeme) iskontosu:</strong> Vadeli fiyat yerine peşin ya da kısa sürede ödeme yapan alıcıya tanınır.`,
      `<strong>Bayi ya da ticari iskonto:</strong> Üreticinin tavsiye ettiği satış fiyatından bayiye bırakılan paydır; bayinin brüt kârını oluşturur.`,
      `<strong>Kampanya ve sezon iskontosu:</strong> Stok eritmek ya da satışı canlandırmak için belirli tarihlerde yapılır.`,
      `<strong>Ciro (yıl sonu) iskontosu:</strong> Dönem içindeki toplam alım belirli bir hedefi aştığında geriye dönük verilir.`,
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      `Birden fazla iskonto art arda uygulanıyorsa oranlar toplanmaz. %20 ve ardından %10 iskonto, toplamda %30 değil %28 eder; çünkü ikinci iskonto zaten düşmüş fiyat üzerinden hesaplanır. Böyle teklifler için zincirleme indirim aracını kullanın.`,
      `İskonto oranı ile satıcının kâr kaybı aynı şey değildir. Kâr marjı %25 olan bir üründe %10 iskonto yapmak, kârın yüzde onunu değil yüzde kırkını götürür. İskonto kararı vermeden önce kâr marjınızı ayrıca hesaplamanızda yarar vardır. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; resmî fatura ve beyan işlemlerinde muhasebecinize danışın.`,
    ] },
  ],
  faq: [
    [`İskonto nasıl hesaplanır?`, `Liste fiyatı iskonto oranıyla çarpılıp 100'e bölünür; çıkan iskonto tutarı liste fiyatından düşülür. 2.450 liralık bir ürüne %12,5 iskonto 306,25 lira eder ve net fiyat 2.143,75 lira olur.`],
    [`İskonto ile indirim arasında fark var mı?`, `Anlam olarak yoktur; ikisi de fiyattan yapılan düşüşü ifade eder. İskonto daha çok ticari belgelerde, toptan satışta ve muhasebe dilinde; indirim ise perakende satışta ve tüketiciye yönelik duyurularda kullanılır.`],
    [`İskontolu fiyattan eski fiyatı nasıl bulurum?`, `İskontolu fiyatı (1 − oran ÷ 100) değerine bölersiniz. %25 iskontoyla 600 liraya alınan ürünün liste fiyatı 600 ÷ 0,75 = 800 liradır. Araçta "Liste fiyatı" seçeneğini kullanabilirsiniz.`],
    [`KDV iskontodan önce mi sonra mı hesaplanır?`, `Faturada gösterilen iskontolarda KDV, iskonto düşüldükten sonraki tutar üzerinden hesaplanır. Araç da KDV oranı yazdığınızda bu sırayı izler.`],
    [`%100 iskonto girilebilir mi?`, `Net fiyat hesabında girilebilir; sonuç sıfır lira çıkar ve bedelsiz teslim anlamına gelir. Liste fiyatını bulma seçeneğinde ise %100 oranla geriye dönük hesap yapılamayacağı için araç hata verir.`],
    [`İki iskonto oranını toplayabilir miyim?`, `Hayır. Art arda uygulanan iskontolar çarpılarak birleşir. %15 ve %5 iskontonun toplam etkisi %20 değil, 1 − 0,85 × 0,95 = %19,25'tir.`],
    [`Liste fiyatını KDV dahil yazarsam sonuç doğru olur mu?`, `İskonto tutarı ve oranı açısından evet; yüzde hesabı esastan bağımsızdır. Ancak bu durumda KDV oranı alanını boş bırakın, yoksa KDV ikinci kez eklenmiş olur.`],
    [`Yazdığım fiyatlar bir yere gönderiliyor mu?`, `Hayır. Tüm hesap tarayıcınızda yapılır; liste fiyatı, oran ve tutarlar sunucuya iletilmez ve kaydedilmez.`],
  ],
  related: ['zincirleme-indirim-hesapla', 'indirim-orani-hesapla', 'kdv-hesapla', 'cek-senet-iskonto-hesapla', 'kar-zarar-hesapla', 'yuzde-hesapla'],
};
