export default {
  slug: 'pesin-vadeli-karsilastir',
  title: 'Peşin mi Vadeli mi Karşılaştırma',
  h1Tail: 'hangisi daha avantajlı?',
  pageTitle: 'Peşin mi Vadeli mi? Peşin ve Taksitli Fiyat Karşılaştırma',
  description: "Peşin fiyatı taksitli ödeme planıyla karşılaştırın: vade farkını, taksitlerin bugünkü değerini ve aylık örtük faizi hesaplayıp hangisinin avantajlı olduğunu görün.",
  card: "Peşin fiyat ile taksitli teklifi paranın zaman değerine göre karşılaştırın; vade farkını ve örtük faizi görün.",
  category: 'finans',
  keywords: ['peşin mi vadeli mi', 'peşin taksit karşılaştırma', 'vade farkı hesaplama', 'taksitli mi peşin mi', 'peşin fiyatına taksit', 'örtük faiz hesaplama', 'bugünkü değer taksit'],
  lead: "Bir ürünü peşin almakla taksitle almak arasında kaldıysanız iki teklifi yazın. Araç <strong>vade farkını</strong>, taksitlerin paranızın getirisine göre <strong>bugünkü değerini</strong> ve satıcının size fiilen uyguladığı <strong>aylık örtük faizi</strong> hesaplayarak hangi seçeneğin daha avantajlı olduğunu söyler.",
  button: 'Karşılaştır',
  inputs: [
    { id: 'pesin', label: 'Peşin fiyat (TL)', type: 'number', placeholder: 'Örn. 10000', hint: 'Binlik ayraç kullanmayın ya da 10.000,00 biçiminde yazın.' },
    { id: 'pesinat', label: 'Vadeli seçenekte peşinat (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 0', hint: 'Binlik ayraç kullanmayın.' },
    { id: 'taksit', label: 'Aylık taksit tutarı (TL)', type: 'number', placeholder: 'Örn. 1000', hint: 'Binlik ayraç kullanmayın.' },
    { id: 'adet', label: 'Taksit sayısı (ay)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'getiri', label: 'Paranızın aylık getirisi (%)', type: 'number', value: '0', hint: 'Parayı peşin vermeyip değerlendirseniz elde edeceğiniz aylık net oran; bilmiyorsanız 0 bırakın.' },
  ],
  compute(v, h) {
    const pesin = h.pos(v.pesin, 'Peşin fiyat');
    const pesinat = h.opt(v.pesinat, 0, 'Peşinat');
    const taksit = h.pos(v.taksit, 'Aylık taksit tutarı');
    const n = h.posint(v.adet, 'Taksit sayısı');
    const g = h.opt(v.getiri, 0, 'Paranızın aylık getirisi');
    if (pesinat < 0) h.err('"Peşinat" negatif olamaz.');
    if (pesinat >= pesin) h.err('"Peşinat" peşin fiyattan küçük olmalı; peşinat fiyatı karşılıyorsa taksite gerek kalmaz.');
    if (n > 600) h.err('"Taksit sayısı" en fazla 600 olabilir.');
    if (g < 0 || g > 100) h.err('"Paranızın aylık getirisi" 0 ile 100 arasında bir yüzde olmalı.');
    const i = g / 100;
    const anuite = (j) => j < 1e-12 ? n : (1 - Math.pow(1 + j, -n)) / j;
    const toplam = pesinat + taksit * n;
    const bd = pesinat + taksit * anuite(i);
    const fark = toplam - pesin;
    const finans = pesin - pesinat;
    let ortuk;
    if (taksit * n < finans - 0.005) ortuk = 'Hesaplanamaz (vadeli toplam peşin fiyattan düşük)';
    else if (taksit * n < finans + 0.005) ortuk = '%0';
    else {
      let lo = 0, hi = 0.01;
      while (taksit * anuite(hi) > finans && hi < 1e6) hi *= 2;
      for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (taksit * anuite(m) > finans) lo = m; else hi = m; }
      ortuk = '%' + h.fmt((lo + hi) / 2 * 100, 2);
    }
    const d = pesin - bd;
    const sonuc = Math.abs(d) < 0.005 ? 'İkisi eşdeğer' : d > 0 ? 'Vadeli daha avantajlı' : 'Peşin daha avantajlı';
    const dMetin = Math.abs(d) < 0.005 ? h.para(0) : `${h.para(Math.abs(d))} ${d > 0 ? 'vadeli lehine' : 'peşin lehine'}`;
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Vadeli toplam ödeme', h.para(toplam)],
        ['Vade farkı', `${h.para(fark)} (${fark < 0 ? '-' : ''}%${h.fmt(Math.abs(fark) / pesin * 100, 2)})`],
        ['Vadeli ödemenin bugünkü değeri', h.para(bd)],
        ['Bugünkü değer farkı', dMetin],
        ['Vadenin aylık örtük faizi', ortuk],
      ],
      note: 'İlk taksitin bir ay sonra, diğerlerinin birer ay arayla ödendiği varsayılır. Örtük faiz paranızın aylık getirisinden düşükse vadeli, yüksekse peşin ödeme avantajlıdır.',
    };
  },
  cases: [
    { in: { pesin: '10000', taksit: '1000', adet: '12', getiri: '0' }, out: { 'Sonuç': 'Peşin daha avantajlı', 'Vadeli toplam ödeme': '12.000,00 TL', 'Vade farkı': '2.000,00 TL (%20)', 'Vadeli ödemenin bugünkü değeri': '12.000,00 TL', 'Bugünkü değer farkı': '2.000,00 TL peşin lehine', 'Vadenin aylık örtük faizi': '%2,92' } },
    { in: { pesin: '12000', taksit: '1000', adet: '12', getiri: '3' }, out: { 'Sonuç': 'Vadeli daha avantajlı', 'Vade farkı': '0,00 TL (%0)', 'Vadeli ödemenin bugünkü değeri': '9.954,00 TL', 'Bugünkü değer farkı': '2.046,00 TL vadeli lehine', 'Vadenin aylık örtük faizi': '%0' } },
    { in: { pesin: '1000', taksit: '1100', adet: '1', getiri: '5' }, out: { 'Sonuç': 'Peşin daha avantajlı', 'Vadeli ödemenin bugünkü değeri': '1.047,62 TL', 'Bugünkü değer farkı': '47,62 TL peşin lehine', 'Vadenin aylık örtük faizi': '%10' } },
    { in: { pesin: '1000', taksit: '1100', adet: '1', getiri: '10' }, out: { 'Sonuç': 'İkisi eşdeğer', 'Vadeli ödemenin bugünkü değeri': '1.000,00 TL', 'Bugünkü değer farkı': '0,00 TL' } },
    { in: { pesin: '20000', pesinat: '5000', taksit: '3000', adet: '5', getiri: '0' }, out: { 'Sonuç': 'İkisi eşdeğer', 'Vadeli toplam ödeme': '20.000,00 TL', 'Vade farkı': '0,00 TL (%0)', 'Vadenin aylık örtük faizi': '%0' } },
    { in: { pesin: '10000', taksit: '900', adet: '10', getiri: '0' }, out: { 'Sonuç': 'Vadeli daha avantajlı', 'Vade farkı': '-1.000,00 TL (-%10)', 'Vadenin aylık örtük faizi': 'Hesaplanamaz (vadeli toplam peşin fiyattan düşük)' } },
    { in: { pesin: '10000', taksit: '1000', adet: '0' }, error: true },
    { in: { pesin: '10000', pesinat: '10000', taksit: '1000', adet: '3' }, error: true },
  ],
  howto: [
    '"Peşin fiyat" alanına ürünün tek seferde ödendiğinde geçerli olan, varsa peşin indirimi uygulanmış fiyatını yazın.',
    'Vadeli seçenekte baştan ödenen bir peşinat varsa ilgili alana girin; yoksa boş bırakın.',
    'Aylık taksit tutarını ve taksit sayısını yazın.',
    '"Paranızın aylık getirisi" alanına, peşin ödemeyip elinizde tutacağınız paranın aylık net getirisini yüzde olarak girin. Parayı değerlendirmeyecekseniz 0 bırakın.',
    '"Karşılaştır" düğmesine basın. Sonuç satırı hangi seçeneğin avantajlı olduğunu, alt satırlar ise nedenini rakamlarla gösterir.',
  ],
  sections: [
    { h: 'Peşin ve vadeli fiyat neden doğrudan karşılaştırılamaz?', p: [
      "Bugün ödenen 1.000 lira ile bir yıl sonra ödenen 1.000 lira aynı değerde değildir. Parayı bugün ödemezseniz o süre boyunca mevduatta, fonda ya da işinizde değerlendirebilirsiniz; ayrıca enflasyon nedeniyle ileride ödeyeceğiniz liranın satın alma gücü bugünkünden düşük olur. Bu yüzden taksitlerin toplamını peşin fiyatla yan yana koymak tek başına doğru bir karşılaştırma değildir. Doğru yöntem, gelecekte yapılacak her ödemeyi bugüne indirgemek, yani <strong>bugünkü değerini</strong> bulmaktır.",
      "Araç iki soruyu birlikte yanıtlar. Birincisi: taksitlerin bugünkü değeri peşin fiyattan düşük mü? Düşükse vadeli ödeme, yüksekse peşin ödeme avantajlıdır. İkincisi: satıcı vade için size aylık yüzde kaç faiz uyguluyor? Bu <strong>örtük faiz</strong>, paranızdan elde edebileceğiniz getiriyle kıyaslandığında aynı sonucu başka bir açıdan verir.",
    ] },
    { h: 'Hesaplama yöntemi', p: [
      "Aylık getiri oranı <em>i</em>, taksit tutarı <em>T</em>, taksit sayısı <em>n</em> olmak üzere eşit taksitlerin bugünkü değeri şu formülle bulunur: <strong>BD = peşinat + T × (1 − (1 + i)<sup>−n</sup>) ÷ i</strong>. Getiri sıfır girilirse bugünkü değer taksitlerin düz toplamına eşit olur.",
      "Örtük faiz ise şu eşitliği sağlayan aylık orandır: <strong>peşin fiyat − peşinat = T × (1 − (1 + j)<sup>−n</sup>) ÷ j</strong>. Bu denklemin kapalı bir çözümü olmadığından araç oranı sayısal yaklaşımla bulur. Vade farkı satırı ise yalnızca taksit toplamı ile peşin fiyat arasındaki farkı ve bunun peşin fiyata oranını gösterir; zaman değerini içermez.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Vade farklı satış:</strong> Peşin fiyatı 10.000 TL olan bir ürün 12 ay boyunca aylık 1.000 TL taksitle satılıyor. Vadeli toplam 12.000 TL, vade farkı 2.000 TL, yani yüzde 20'dir. Bu planın örtük faizi aylık yaklaşık yüzde 2,92'dir. Paranızdan aylık net yüzde 2,92'den fazla getiri elde edemiyorsanız peşin ödemek daha avantajlıdır.",
      "<strong>Peşin fiyatına taksit:</strong> Aynı ürün 12.000 TL peşin ya da 12 × 1.000 TL taksitle sunuluyorsa vade farkı sıfırdır. Paranız aylık yüzde 3 getiri sağlıyorsa taksitlerin bugünkü değeri 1.000 × (1 − 1,03<sup>−12</sup>) ÷ 0,03 = 9.954 TL olur. Bu, peşin fiyattan 2.046 TL düşüktür; vadeli ödeme açıkça avantajlıdır. Peşin fiyatına taksit, getiri oranı sıfırdan büyük olan herkes için kârlıdır.",
      "<strong>Tek ödemeli vade:</strong> 1.000 TL'lik ürün bir ay sonra 1.100 TL ödenerek alınabiliyorsa örtük faiz aylık yüzde 10'dur. Paranızın getirisi yüzde 5 ise bugünkü değer 1.100 ÷ 1,05 = 1.047,62 TL eder ve peşin ödeme 47,62 TL avantajlıdır; getiriniz tam yüzde 10 ise iki seçenek eşdeğerdir.",
    ] },
    { h: 'Getiri oranına ne yazmalıyım?', ul: [
      "Paranız vadeli mevduatta ya da benzeri bir araçta duruyorsa kesintiler sonrası aylık net getiri oranını yazın.",
      "Peşin ödemek için borçlanmanız gerekiyorsa (örneğin kredi ya da ek hesap) o borcun aylık faiz oranını yazın; bu durumda soru 'hangi borç daha ucuz' sorusuna dönüşür.",
      "Parayı değerlendirmeyecekseniz ve yalnızca fiyat farkını görmek istiyorsanız 0 bırakın.",
      "Yalnızca enflasyon etkisini görmek istiyorsanız beklediğiniz aylık enflasyon oranını girebilirsiniz; sonuç, taksitlerin bugünkü satın alma gücüyle karşılığını verir.",
    ] },
    { h: 'Rakamların söylemediği şeyler', p: [
      "Hesap, taksitleri aksatmadan ödeyeceğinizi ve aradaki parayı gerçekten değerlendireceğinizi varsayar. Vadeli alışverişte para elde kaldığı için harcama eğilimi artabilir; taksitler birikince aylık bütçe daralır. Gecikme hâlinde uygulanan faiz ve ücretler hesaba dâhil değildir. Kredi kartı taksitlerinde kart limitinizin bir bölümü vade boyunca bloke kalır.",
      "Öte yandan nakit sıkıntısı olan bir işletme için vade, rakamsal olarak biraz pahalı olsa bile işletme sermayesini koruduğu için tercih edilebilir. Ticari alımlarda peşin iskonto oranı ile vade süresini bu araçla sınayıp tedarikçiyle pazarlıkta kullanabilirsiniz.",
      "Sonuçlar bilgilendirme amaçlıdır ve finansal tavsiye niteliği taşımaz. Gelecekteki getiri oranı kesin bilinemeyeceği için sonucu birkaç farklı oranla deneyerek değerlendirmeniz yararlı olur.",
    ] },
  ],
  faq: [
    ['Peşin mi almak daha mantıklı, taksitle mi?', "Vadenin örtük faizi paranızdan elde edebileceğiniz getiriden düşükse taksit, yüksekse peşin daha avantajlıdır. Araç bu karşılaştırmayı sizin için yapar ve sonucu ilk satırda yazar."],
    ['Peşin fiyatına taksit her zaman avantajlı mı?', "Rakamsal olarak evet: vade farkı yoksa ödemeyi ertelemek, paranızı o süre boyunca kullanabilmeniz demektir. Yine de taksitlerin bütçenizi zorlamayacağından ve peşin ödemede ek bir indirim önerilmediğinden emin olun."],
    ['Vade farkı nedir?', "Taksitli ödemelerin toplamı ile peşin fiyat arasındaki farktır. 10.000 TL'lik ürün için toplam 12.000 TL ödeniyorsa vade farkı 2.000 TL, oran olarak yüzde 20'dir."],
    ['Örtük faiz ne demektir?', "Satıcının vade karşılığında fiyata eklediği farkın aylık faiz oranı olarak ifadesidir. Peşin fiyatı bir kredi tutarı, taksitleri de o kredinin geri ödemesi gibi düşünürseniz bu kredinin aylık faizi örtük faizdir."],
    ['Vade farkı yüzdesi ile örtük faiz neden farklı?', "Vade farkı yüzdesi toplam farkı peşin fiyata böler ve süreyi dikkate almaz. Örtük faiz ise borcun her ay taksitlerle azaldığını hesaba katan aylık orandır. 12 ayda yüzde 20 vade farkı, aylık yaklaşık yüzde 2,92 örtük faize karşılık gelir."],
    ['Taksitler eşit değilse ne yapmalıyım?', "Araç eşit aylık taksitlere göre çalışır. Taksitler birbirine yakınsa ortalama taksiti yazarak yaklaşık bir sonuç alabilirsiniz; çok farklıysa her ödemenin bugünkü değerini ayrı ayrı hesaplamak gerekir."],
    ['İlk taksit hemen ödeniyorsa nasıl girerim?', "İlk taksiti peşinat alanına yazın ve taksit sayısını bir azaltın. Örneğin 6 taksitin ilki alışveriş anında ödeniyorsa peşinat olarak bir taksit tutarını, taksit sayısı olarak 5 girin."],
    ['Girdiğim fiyatlar kaydediliyor mu?', "Hayır. Karşılaştırma tarayıcınızda yapılır; yazdığınız tutarlar sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['taksit-hesapla', 'bugunku-deger-hesapla', 'efektif-faiz-hesapla', 'iskonto-hesapla', 'aylik-yillik-faiz-cevir', 'satin-alma-gucu-hesapla'],
};
