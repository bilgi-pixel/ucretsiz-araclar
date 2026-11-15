export default {
  slug: 'taksit-hesapla',
  title: 'Taksit Hesaplama',
  h1Tail: 'aylık taksit ve toplam ödeme',
  pageTitle: 'Taksit Hesaplama – Aylık Taksit Tutarı ve Toplam Ödeme',
  description: 'Ürün fiyatı, peşinat, taksit sayısı ve aylık vade farkı oranını girin; aylık taksit tutarını, toplam ödemeyi ve peşin fiyata göre farkı hesaplayın.',
  card: 'Peşinat, taksit sayısı ve vade farkı oranına göre aylık taksiti, toplam ödemeyi ve peşin fiyata farkı hesaplayın.',
  category: 'finans',
  keywords: ['taksit hesaplama', 'aylık taksit hesaplama', 'taksit tutarı hesaplama', 'vade farklı taksit', 'faizsiz taksit hesaplama', 'peşinat taksit hesaplama', 'taksitli satış hesaplama'],
  lead: 'Taksitle alacağınız ya da satacağınız bir ürünün aylık taksitini hesaplayın. Fiyatı, varsa peşinatı, taksit sayısını ve aylık vade farkı oranını yazın; araç <strong>eşit taksit tutarını</strong>, toplam ödemeyi ve peşin fiyata göre ne kadar fazla ödeneceğini gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'tutar', label: 'Peşin fiyat (TL)', type: 'number', placeholder: 'Örn. 30000' },
    { id: 'pesinat', label: 'Peşinat (TL)', type: 'number', value: '0', hint: 'Peşinat yoksa 0' },
    { id: 'taksit', label: 'Taksit sayısı (ay)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'oran', label: 'Aylık vade farkı / faiz oranı (%)', type: 'number', value: '0', hint: 'Vade farksız (faizsiz) taksit için 0' },
  ],
  compute(v, h) {
    const tutar = h.pos(v.tutar, 'Peşin fiyat');
    const pesinat = h.nonneg(h.opt(v.pesinat, 0, 'Peşinat'), 'Peşinat');
    const n = h.posint(v.taksit, 'Taksit sayısı');
    const r = h.nonneg(h.opt(v.oran, 0, 'Aylık oran'), 'Aylık oran') / 100;
    if (pesinat >= tutar) h.err('Peşinat, peşin fiyattan küçük olmalı; aksi halde taksitlendirilecek tutar kalmaz.');
    if (n > 600) h.err('Taksit sayısı en fazla 600 olabilir.');
    if (r > 1) h.err('Aylık oran %100\'den büyük olamaz; oranı yüzde olarak yazın (örn. 2,5).');
    const A = tutar - pesinat;
    const aylik = r === 0 ? A / n : (A * r) / (1 - Math.pow(1 + r, -n));
    const taksitToplam = aylik * n;
    const fark = taksitToplam - A;
    const genel = pesinat + taksitToplam;
    return {
      rows: [
        ['Aylık taksit', h.para(aylik)],
        ['Taksitlendirilen tutar', h.para(A)],
        ['Taksitlerin toplamı', h.para(taksitToplam)],
        ['Toplam vade farkı', h.para(fark)],
        ['Toplam ödeme (peşinat dahil)', h.para(genel)],
        ['Peşin fiyata göre artış', '%' + h.fmt((genel / tutar - 1) * 100, 2)],
      ],
      note: r === 0
        ? 'Vade farksız taksit: tutar taksit sayısına eşit bölünmüştür.'
        : 'Eşit taksit (anüite) yöntemi: vade farkı her ay kalan borç üzerinden işler. Vergi, sigorta ve masraflar dahil değildir.',
    };
  },
  cases: [
    { in: { tutar: '12000', pesinat: '0', taksit: '12', oran: '0' }, out: { 'Aylık taksit': '1.000,00 TL', 'Toplam vade farkı': '0,00 TL', 'Peşin fiyata göre artış': '%0' } },
    { in: { tutar: '30000', pesinat: '0', taksit: '12', oran: '2' }, out: { 'Aylık taksit': '2.836,79 TL', 'Taksitlerin toplamı': '34.041,45 TL', 'Toplam vade farkı': '4.041,45 TL', 'Peşin fiyata göre artış': '%13,47' } },
    { in: { tutar: '50000', pesinat: '10000', taksit: '24', oran: '3,5' }, out: { 'Aylık taksit': '2.490,91 TL', 'Taksitlendirilen tutar': '40.000,00 TL', 'Taksitlerin toplamı': '59.781,92 TL', 'Toplam ödeme (peşinat dahil)': '69.781,92 TL', 'Peşin fiyata göre artış': '%39,56' } },
    { in: { tutar: '10000', taksit: '3', oran: '5' }, out: { 'Aylık taksit': '3.672,09 TL', 'Toplam vade farkı': '1.016,26 TL' } },
    { in: { tutar: '1000', taksit: '1', oran: '1' }, out: { 'Aylık taksit': '1.010,00 TL', 'Toplam vade farkı': '10,00 TL' } },
    { in: { tutar: '4500', pesinat: '1500', taksit: '6' }, out: { 'Aylık taksit': '500,00 TL', 'Toplam ödeme (peşinat dahil)': '4.500,00 TL' } },
    { in: { tutar: '10000', pesinat: '10000', taksit: '6', oran: '2' }, error: true },
    { in: { tutar: '10000', taksit: '0', oran: '2' }, error: true },
  ],
  howto: [
    '"Peşin fiyat" alanına ürünün ya da hizmetin peşin satış fiyatını yazın.',
    'Baştan bir ödeme yapacaksanız "Peşinat" alanına tutarını girin; yapmayacaksanız 0 bırakın.',
    'Kaç ay taksit yapılacağını ve satıcının ya da bankanın uyguladığı aylık vade farkı oranını yazın. Vade farksız kampanyalarda oranı 0 bırakın.',
    '"Hesapla" düğmesine basın. Aylık taksit ilk satırda, peşin fiyata göre toplam artış ise son satırda görünür.',
    'Farklı taksit sayılarını sırayla deneyerek bütçenize uyan taksit ile katlanacağınız vade farkı arasındaki dengeyi bulun.',
  ],
  sections: [
    { h: 'Taksit tutarı nasıl hesaplanır?', p: [
      'Vade farkı uygulanmayan bir satışta hesap basittir: peşinat düşüldükten sonra kalan tutar taksit sayısına bölünür. 12.000 TL\'lik bir ürün 12 taksite bölündüğünde aylık 1.000 TL ödenir ve toplam ödeme peşin fiyata eşittir.',
      'Vade farkı ya da faiz varsa taksitler eşit kalacak biçimde <strong>anüite formülü</strong> kullanılır: <strong>taksit = A × r ÷ (1 − (1 + r)<sup>−n</sup>)</strong>. Burada A taksitlendirilen tutar (peşin fiyat − peşinat), r aylık oran (yüzde değerinin 100\'e bölünmüşü), n ise taksit sayısıdır. Bu yöntemde her ay, o ay kalan borç üzerinden vade farkı işler; taksitin kalanı borcu azaltır. İlk taksitlerde vade farkı payı yüksek, son taksitlerde düşüktür ama ödenen tutar her ay aynıdır.',
    ] },
    { h: 'Çözümlü örnek: 30.000 TL, 12 taksit, aylık %2', p: [
      'Peşinatsız 30.000 TL\'lik bir alışveriş aylık %2 vade farkıyla 12 taksite bölünsün. (1,02)<sup>−12</sup> yaklaşık 0,7885\'tir; payda 1 − 0,7885 = 0,2115 olur. Taksit = 30.000 × 0,02 ÷ 0,2115 ≈ <strong>2.836,79 TL</strong>.',
      'On iki taksitin toplamı 34.041,45 TL, yani toplam vade farkı 4.041,45 TL\'dir. Peşin fiyata göre artış %13,47 çıkar. Dikkat edin: aylık %2, on iki ayda %24 eder ama ödenen fark %13,47\'dir. Çünkü borç her ay azalır ve vade farkı gittikçe küçülen bakiyeye uygulanır; paranın tamamını on iki ay boyunca kullanmış olmazsınız.',
    ] },
    { h: 'Peşinatın etkisi', p: [
      'Peşinat, taksitlendirilen tutarı doğrudan düşürdüğü için hem taksiti hem de toplam vade farkını azaltır. 50.000 TL\'lik bir üründe 10.000 TL peşinat verip kalan 40.000 TL\'yi aylık %3,5 ile 24 aya yayarsanız taksit 2.490,91 TL, taksitlerin toplamı 59.781,92 TL olur. Peşinatla birlikte cebinizden toplam 69.781,92 TL çıkar; bu da peşin fiyatın %39,56 üzerindedir. Aynı hesabı peşinatsız yaptığınızda vade farkı tutarının dörtte bir oranında arttığını görürsünüz; çünkü vade farkı taksitlendirilen tutarla doğru orantılıdır.',
    ] },
    { h: 'Düz hesap ile eşit taksit yöntemi arasındaki fark', p: [
      'Bazı satıcılar vade farkını "düz hesap" ile belirler: peşin fiyata aylık oran × ay sayısı kadar ekleme yapar ve toplamı taksit sayısına böler. Örneğin 30.000 TL için aylık %2 ve 12 ay düz hesapla 30.000 × 1,24 = 37.200 TL toplam ve 3.100 TL taksit demektir. Aynı oran bu sayfadaki azalan bakiye yöntemiyle 2.836,79 TL taksit verir.',
      'İki yöntem aynı "aylık %2" ifadesiyle sunulsa da maliyetleri çok farklıdır. Size söylenen taksit bu aracın sonucundan belirgin yüksekse satıcı büyük olasılıkla düz hesap kullanıyordur. Böyle durumlarda oranı değil, <strong>toplam ödemeyi</strong> karşılaştırmak en sağlıklı yoldur: taksit × taksit sayısı + peşinat tutarını peşin fiyatla yan yana koyun.',
    ] },
    { h: 'Taksit sayısı arttıkça ne olur?', p: [
      'Vade uzadıkça aylık taksit küçülür ama toplam vade farkı büyür. 30.000 TL ve aylık %2 için yaklaşık değerler şöyledir:',
    ], ul: [
      '<strong>3 taksit:</strong> aylık yaklaşık 10.403 TL, toplam fark yaklaşık 1.208 TL',
      '<strong>6 taksit:</strong> aylık yaklaşık 5.356 TL, toplam fark yaklaşık 2.135 TL',
      '<strong>12 taksit:</strong> aylık 2.836,79 TL, toplam fark 4.041,45 TL',
      '<strong>24 taksit:</strong> aylık yaklaşık 1.586 TL, toplam fark yaklaşık 8.067 TL',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Beyaz eşya, mobilya, telefon ve bilgisayar gibi mağaza taksitlerinde; okul, kurs ve dershane ödemelerinde; esnafın veresiye ya da senetli satışlarında; ikinci el araç ve arsa gibi elden taksitli satışlarda ve kredi kartı taksitlendirme tekliflerinin karşılaştırılmasında kullanabilirsiniz. Satıcı tarafındaysanız aynı araç, müşteriye sunacağınız taksit seçeneklerini hazırlamak için de uygundur.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap; taksitlerin aylık ve eşit olduğunu, ilk taksitin bir ay sonra ödendiğini varsayar. Banka kredilerinde faiz üzerinden alınan vergi ve fonlar, dosya masrafı, sigorta ve kredi kartı taksitlendirme ücretleri sonuca dahil değildir; bunlar gerçek maliyeti yükseltir. Yasal taksit sınırları ürün grubuna göre değişebildiği için burada kısıt uygulanmaz. Sonuçlar bilgilendirme amaçlıdır; sözleşme imzalamadan önce satıcının ya da bankanın verdiği ödeme planını esas alın, önemli mali kararlarda uzman görüşü alın.',
    ] },
  ],
  faq: [
    ['Faizsiz taksit nasıl hesaplanır?', 'Peşin fiyattan peşinatı çıkarıp kalan tutarı taksit sayısına bölmek yeterlidir. Araçta oran alanını 0 bırakırsanız bu hesap yapılır; toplam ödeme peşin fiyata eşit çıkar.'],
    ['Aylık %2 vade farkı 12 ayda neden %24 etmiyor?', 'Çünkü her taksitle borcun bir kısmı kapanır ve vade farkı azalan bakiye üzerinden işler. Paranın tamamı yalnızca ilk ay kullanılır. Bu yüzden 12 ay ve aylık %2 için toplam fark peşin fiyatın %13,47\'si kadardır.'],
    ['Satıcının söylediği taksit daha yüksek çıktı, neden?', 'Satıcı vade farkını azalan bakiye yerine düz hesapla ekliyor, taksite sigorta ya da masraf katıyor ya da ilk taksiti peşin alıyor olabilir. Toplam ödemeyi sorup peşin fiyatla karşılaştırın; gerçek maliyeti en açık bu fark gösterir.'],
    ['Peşinat vermek avantajlı mı?', 'Vade farkı varsa evet: peşinat taksitlendirilen tutarı azalttığı için ödenen vade farkı aynı oranda düşer. Vade farksız kampanyalarda ise peşinat toplam ödemeyi değiştirmez, yalnızca aylık taksiti küçültür.'],
    ['Taksit tutarından aylık oranı bulabilir miyim?', 'Bu araç oranı girdi olarak alır. Tersini yapmak için oran alanına farklı değerler deneyip hesaplanan taksiti size söylenen taksite yaklaştırabilirsiniz; taksitler eşitlendiğinde aradığınız aylık orana ulaşmış olursunuz.'],
    ['Kredi kartı taksitleri de böyle mi hesaplanır?', 'Mağazanın sunduğu vade farksız kart taksitlerinde tutar doğrudan taksit sayısına bölünür. Bankanın sonradan taksitlendirme ya da taksitli nakit avans işlemlerinde ise faiz ve üzerindeki vergiler eklenir; yaklaşık sonuç için aylık oranı vergiler dahil olarak girin.'],
    ['Taksit sayısı için üst sınır var mı?', 'Araç 600 aya kadar hesap yapar. Uygulamada bankalar ve mağazalar için ürün grubuna göre yasal taksit sınırları bulunur ve bunlar zaman zaman değişir; güncel sınırı satıcınızdan ya da bankanızdan öğrenin.'],
    ['Yazdığım tutarlar saklanıyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; fiyat, peşinat ve oran bilgileri sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kredi-hesapla', 'vade-farki-hesapla', 'ihtiyac-kredisi-hesapla', 'kredi-erken-kapama-hesapla', 'pesin-vadeli-karsilastir', 'kredi-karti-asgari-odeme-hesapla'],
};
