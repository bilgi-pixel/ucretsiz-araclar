export default {
  slug: 'fiyat-kazanc-orani-hesapla',
  title: 'Fiyat/Kazanç (F/K) Oranı Hesaplama',
  h1Tail: 'kazanç verimi ve PEG ile',
  pageTitle: 'Fiyat/Kazanç (F/K) Oranı Hesaplama – Kazanç Verimi ve PEG',
  description: 'Hisse fiyatını ve hisse başına kârı yazın; F/K oranını, kazanç verimini ve kâr büyüme beklentisi girerseniz PEG oranını hesaplayın. Piyasa değeri ve net kârla da çalışır.',
  card: 'Hisse fiyatı ve hisse başına kârdan F/K oranını, kazanç verimini ve isteğe bağlı PEG oranını hesaplayın.',
  category: 'finans',
  keywords: ['f/k oranı hesaplama', 'fiyat kazanç oranı', 'fk oranı nedir', 'hisse başına kâr', 'kazanç verimi', 'peg oranı hesaplama', 'f/k formülü', 'piyasa değeri net kâr'],
  lead: 'Bir hissenin fiyatını ve hisse başına kârını yazın; araç, yatırımcıların şirketin 1 liralık kârı için kaç lira ödediğini gösteren <strong>fiyat/kazanç (F/K) oranını</strong> hesaplar. Aynı hesabı şirketin piyasa değeri ve yıllık net kârıyla da yapabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'fiyat', label: 'Hisse fiyatı (ya da piyasa değeri)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'kar', label: 'Hisse başına kâr (ya da yıllık net kâr)', type: 'number', placeholder: 'Örn. 8', hint: 'Son dört çeyreğin toplamı. Zarar için eksi işaretli yazın. Fiyat alanıyla aynı ölçekte olmalı.' },
    { id: 'buyume', label: 'Beklenen yıllık kâr büyümesi (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 15', hint: 'Yazarsanız PEG oranı da hesaplanır.' },
  ],
  compute(v, h) {
    const f = h.pos(v.fiyat, 'Hisse fiyatı');
    const k = h.num(v.kar, 'Hisse başına kâr');
    if (k === 0) h.err('Kâr sıfır olduğunda F/K oranı tanımsızdır; sıfırdan farklı bir kâr ya da zarar değeri yazın.');
    const g = String(v.buyume ?? '').trim() === '' ? null : h.num(v.buyume, 'Beklenen yıllık kâr büyümesi');
    const verim = (k / f) * 100;
    const verimYazi = (verim < 0 && h.fmt(Math.abs(verim), 2) !== '0' ? '-%' : '%') + h.fmt(Math.abs(verim), 2);
    if (k < 0) {
      return {
        rows: [
          ['F/K oranı', 'Anlamsız (şirket zararda)'],
          ['Kazanç verimi', verimYazi],
        ],
        note: 'Zarar eden şirketlerde F/K oranı yorumlanmaz. Bu durumda piyasa değeri/defter değeri ya da fiyat/satış gibi başka çarpanlara bakılır.',
      };
    }
    const fk = f / k;
    const rows = [
      ['F/K oranı', h.fmt(fk, 2)],
      ['Kazanç verimi', verimYazi],
      ['Kâr sabit kalırsa fiyatı karşılama süresi', h.fmt(fk, 1) + ' yıl'],
    ];
    if (g !== null) rows.push(['PEG oranı', g > 0 ? h.fmt(fk / g, 2) : 'Hesaplanamaz (büyüme sıfır ya da negatif)']);
    return { rows, note: 'F/K = fiyat ÷ hisse başına kâr. Oran tek başına ucuzluk ya da pahalılık göstergesi değildir; sektör ortalaması ve şirketin kendi geçmişiyle karşılaştırılmalıdır.' };
  },
  cases: [
    { in: { fiyat: '100', kar: '10' }, out: { 'F/K oranı': '10', 'Kazanç verimi': '%10' } },
    { in: { fiyat: '120', kar: '8', buyume: '15' }, out: { 'F/K oranı': '15', 'Kazanç verimi': '%6,67', 'PEG oranı': '1' } },
    { in: { fiyat: '50', kar: '2,5' }, out: { 'F/K oranı': '20', 'Kazanç verimi': '%5', 'Kâr sabit kalırsa fiyatı karşılama süresi': '20 yıl' } },
    { in: { fiyat: '30', kar: '4' }, out: { 'F/K oranı': '7,5', 'Kazanç verimi': '%13,33' } },
    { in: { fiyat: '80', kar: '-4' }, out: { 'F/K oranı': 'Anlamsız (şirket zararda)', 'Kazanç verimi': '-%5' } },
    { in: { fiyat: '6000000000', kar: '500000000', buyume: '24' }, out: { 'F/K oranı': '12', 'PEG oranı': '0,5' } },
    { in: { fiyat: '45', kar: '3', buyume: '-5' }, out: { 'F/K oranı': '15', 'PEG oranı': 'Hesaplanamaz (büyüme sıfır ya da negatif)' } },
    { in: { fiyat: '100', kar: '0' }, error: true },
    { in: { fiyat: '0', kar: '10' }, error: true },
  ],
  howto: [
    '"Hisse fiyatı" alanına hissenin güncel borsa fiyatını yazın. Şirket geneli üzerinden hesap yapacaksanız buraya toplam piyasa değerini girin.',
    '"Hisse başına kâr" alanına son on iki ayın (son dört çeyreğin) hisse başına net kârını yazın. Piyasa değeriyle çalışıyorsanız aynı dönemin toplam net kârını girin; iki alan aynı ölçekte olmalıdır.',
    'Büyümeyi de hesaba katmak isterseniz "Beklenen yıllık kâr büyümesi" alanına yüzde olarak beklentinizi yazın.',
    '"Hesapla" düğmesine basın. F/K oranı, kazanç verimi, fiyatı karşılama süresi ve varsa PEG oranı listelenir.',
  ],
  sections: [
    { h: 'F/K oranı nedir?', p: [
      'Fiyat/kazanç oranı, bir hissenin borsa fiyatının o hisseye düşen yıllık net kâra bölünmesiyle bulunan değerleme çarpanıdır. Sözlü olarak "şirket kârının kaç katına fiyatlanıyor" diye ifade edilir. F/K\'sı 10 olan bir hisse için yatırımcılar şirketin her 1 liralık yıllık kârına 10 lira ödemektedir.',
      'Oran, farklı büyüklükteki şirketleri ortak bir ölçeğe getirdiği için hisse analizinde en sık bakılan göstergedir. Tek bir sayı olması onu pratik kılar; ama aynı sebeple çok şeyi dışarıda bırakır. Doğru kullanım, oranı benzer şirketlerle ve şirketin kendi geçmiş ortalamasıyla yan yana koymaktır.',
    ] },
    { h: 'Formül: iki yol, aynı sonuç', p: [
      'Birinci yol hisse bazındadır: <strong>F/K = Hisse fiyatı ÷ Hisse başına kâr</strong>. Hisse başına kâr, şirketin son on iki aylık net kârının toplam pay sayısına bölünmesiyle bulunur.',
      'İkinci yol şirket bazındadır: <strong>F/K = Piyasa değeri ÷ Yıllık net kâr</strong>. Piyasa değeri, hisse fiyatı ile pay sayısının çarpımıdır. Pay ve paydayı aynı pay sayısıyla çarptığınız için iki yol aynı sonucu verir. Araçta hangisini kullanırsanız kullanın, iki alanın aynı ölçekte olması yeterlidir.',
      'Oranın tersi <strong>kazanç verimidir</strong>: Kâr ÷ Fiyat × 100. F/K 20 ise kazanç verimi %5\'tir. Bu yüzde, hissenin kârlılığını tahvil ya da mevduat getirisiyle kabaca karşılaştırmaya yarar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir hisse 120 TL\'den işlem görüyor ve son dört çeyrekte hisse başına toplam 8 TL net kâr açıklamış olsun. F/K = 120 ÷ 8 = <strong>15</strong> bulunur. Kazanç verimi 8 ÷ 120 × 100 = %6,67\'dir. Kâr hiç değişmeseydi, şirketin kârları toplamının bugünkü fiyata ulaşması 15 yıl sürerdi.',
      'Kârın önümüzdeki yıllarda yılda %15 büyümesi bekleniyorsa PEG oranı 15 ÷ 15 = <strong>1</strong> olur. Şirket geneli üzerinden bir örnek: piyasa değeri 6 milyar TL, yıllık net kârı 500 milyon TL olan şirketin F/K\'sı 12\'dir; beklenen büyüme %24 ise PEG 0,5 eder.',
    ] },
    { h: 'PEG oranı ne anlatır?', p: [
      'F/K oranı büyümeyi görmez: kârını her yıl ikiye katlayan bir şirketle kârı yerinde sayan bir şirket aynı çarpanı hak etmez. PEG oranı bu eksikliği gidermek için F/K\'yı beklenen yıllık kâr büyüme yüzdesine böler: <strong>PEG = F/K ÷ Büyüme oranı (%)</strong>.',
      'Yaygın yorum, 1 civarındaki değerin fiyat ile büyümenin dengede olduğu, 1\'in belirgin altının büyümeye göre düşük fiyatlamaya, üstünün ise yüksek fiyatlamaya işaret edebileceğidir. Ancak büyüme oranı bir tahmindir; tahmin yanlışsa PEG de yanlıştır. Büyüme sıfır ya da negatifken oran hesaplanamaz.',
    ] },
    { h: 'Yüksek ve düşük F/K nasıl yorumlanır?', ul: [
      '<strong>Düşük F/K</strong>, hissenin kârına göre ucuz olduğunu gösterebileceği gibi, piyasanın kârların düşmesini beklediğini ya da kârın tek seferlik bir gelirle şiştiğini de gösterebilir.',
      '<strong>Yüksek F/K</strong>, güçlü büyüme beklentisinin fiyata yansıdığını ya da kârın geçici olarak düştüğünü gösterebilir; her zaman "pahalı" anlamına gelmez.',
      '<strong>Sektör farkı</strong> büyüktür: bankalar, sanayi şirketleri ve teknoloji şirketleri tarihsel olarak farklı çarpan aralıklarında işlem görür. Kıyas yalnızca benzer işler arasında anlamlıdır.',
      '<strong>Negatif F/K</strong> yorumlanmaz. Zarar eden şirkette araç oranı "anlamsız" olarak bildirir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, tek bir çeyreğin kârını yıllık kâr yerine kullanmaktır; bu durumda oran dört kat yüksek çıkar. Her zaman son dört çeyreğin toplamını alın. İkinci hata, sermaye artırımı ya da bölünme sonrası eski pay sayısıyla hesaplanmış hisse başına kârı güncel fiyatla eşleştirmektir.',
      'Yüksek enflasyon ortamında kâr rakamları da dikkat ister: bir önceki yılın kârı bugünkü fiyatlarla aynı satın alma gücünü taşımaz ve enflasyon muhasebesi uygulanıp uygulanmadığı oranı belirgin biçimde değiştirebilir. Ayrıca kârın içinde gayrimenkul satışı, kur farkı geliri gibi tekrarlanmayacak kalemler olup olmadığına bakmak gerekir.',
    ] },
    { h: 'Uyarı', p: [
      'Bu araç yalnızca yazdığınız iki rakamı birbirine böler; herhangi bir hissenin ucuz ya da pahalı olduğuna dair bir görüş bildirmez ve yatırım tavsiyesi vermez. Değerleme, borçluluk, nakit akışı, yönetim kalitesi ve sektör koşulları gibi pek çok etkeni birlikte değerlendirmeyi gerektirir. Yatırım kararlarınız için yetkili bir yatırım danışmanından destek alın.',
    ] },
  ],
  faq: [
    ['F/K oranı nasıl hesaplanır?', 'Hisse fiyatı, hisse başına yıllık net kâra bölünür. 50 TL\'lik bir hissenin hisse başına kârı 2,5 TL ise F/K 50 ÷ 2,5 = 20 olur. Piyasa değerini yıllık net kâra bölmek de aynı sonucu verir.'],
    ['F/K oranı kaç olmalı?', 'Herkes için geçerli bir "doğru" değer yoktur. Oran sektöre, faiz düzeyine ve büyüme beklentisine göre değişir. Anlamlı bir yorum için hisseyi aynı sektördeki şirketlerle ve kendi geçmiş ortalamasıyla karşılaştırın.'],
    ['F/K oranı düşük olan hisse ucuz mudur?', 'Her zaman değil. Düşük oran, piyasanın kârların gerilemesini beklediğini ya da açıklanan kârın tek seferlik gelirlerle büyüdüğünü de gösterebilir. Kârın kalitesi ve sürdürülebilirliği incelenmelidir.'],
    ['Şirket zarar ediyorsa F/K nasıl hesaplanır?', 'Zarar durumunda oran negatif çıkar ve yorumlanmaz. Araç bu durumda sonucu "anlamsız" olarak gösterir. Zarar eden şirketlerde piyasa değeri/defter değeri gibi başka çarpanlar kullanılır.'],
    ['Hisse başına kâr nereden bulunur?', 'Şirketlerin dönemsel finansal tablolarında, gelir tablosunun sonunda pay başına kazanç satırı yer alır. Yıllık değer için son dört çeyreği toplayın ya da yıllık net kârı güncel pay sayısına bölün.'],
    ['Kazanç verimi ne işe yarar?', 'F/K oranının tersidir ve kârı fiyatın yüzdesi olarak gösterir. F/K\'sı 12,5 olan bir hissenin kazanç verimi %8\'dir. Bu yüzde, hisseyi faiz getirisi gibi diğer seçeneklerle kaba bir karşılaştırmaya olanak tanır.'],
    ['İleriye dönük F/K nedir?', 'Geçmiş kâr yerine, gelecek on iki ay için tahmin edilen hisse başına kârın kullanıldığı orandır. Araçta kâr alanına tahmini değeri yazarak hesaplayabilirsiniz; sonucun tahminin doğruluğuna bağlı olduğunu unutmayın.'],
    ['Yazdığım veriler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz fiyat ve kâr bilgileri sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['temettu-verimi-hesapla', 'hisse-ortalama-maliyet-hesapla', 'ozkaynak-karliligi-hesapla', 'yillik-bilesik-buyume-hesapla', 'yatirim-getirisi-hesapla'],
};
