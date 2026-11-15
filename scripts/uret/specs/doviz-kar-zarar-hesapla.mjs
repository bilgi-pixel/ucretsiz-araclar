export default {
  slug: 'doviz-kar-zarar-hesapla',
  title: 'Döviz Alım Satım Kâr Zarar Hesaplama',
  h1Tail: 'kur farkı ve başabaş kuru',
  pageTitle: 'Döviz Alım Satım Kâr Zarar Hesaplama – Kur Farkı Kazancı',
  description: 'Döviz miktarını, alış ve satış kurunu yazın; kur farkından doğan kâr ya da zararı, getiri oranını, masraf dahil başabaş satış kurunu anında hesaplayın.',
  card: 'Aldığınız ve sattığınız kur ile miktardan döviz kâr/zararını, getiri oranını ve başabaş kurunu hesaplayın.',
  category: 'finans',
  keywords: ['döviz kâr zarar hesaplama', 'dolar kâr hesaplama', 'kur farkı hesaplama', 'döviz alım satım kazancı', 'euro kâr zarar', 'başabaş kuru', 'makas aralığı hesaplama'],
  lead: 'Dolar, euro, sterlin ya da başka bir dövizi hangi kurdan alıp hangi kurdan sattığınızı (ya da satmayı düşündüğünüzü) yazın. Araç, <strong>kur farkından doğan kâr ya da zararı</strong> Türk lirası olarak, yüzde getirisiyle birlikte verir; işlem masrafı girerseniz zarar etmemek için gereken başabaş kurunu da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'miktar', label: 'Döviz miktarı', type: 'number', placeholder: 'Örn. 1000', hint: 'Aldığınız dövizin tutarı (dolar, euro vb.).' },
    { id: 'alis', label: 'Aldığınız kur (TL)', type: 'number', placeholder: 'Örn. 30', hint: 'Dövizi satın alırken ödediğiniz kur (bankanın satış kuru).' },
    { id: 'satis', label: 'Sattığınız kur (TL)', type: 'number', placeholder: 'Örn. 33', hint: 'Dövizi bozdururken aldığınız kur (bankanın alış kuru).' },
    { id: 'masraf', label: 'Toplam işlem masrafı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 100', hint: 'Komisyon, vergi, havale ücreti gibi alım ve satımda ödenen toplam tutar.' },
  ],
  compute(v, h) {
    const m = h.pos(v.miktar, 'Döviz miktarı');
    const a = h.pos(v.alis, 'Aldığınız kur');
    const s = h.nonneg(v.satis, 'Sattığınız kur');
    const masraf = String(v.masraf ?? '').trim() === '' ? 0 : h.nonneg(v.masraf, 'Toplam işlem masrafı');
    const maliyet = m * a + masraf;
    const gelir = m * s;
    const kz = gelir - maliyet;
    const oran = (kz / maliyet) * 100;
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const rows = [
      [kz < 0 ? 'Zarar' : 'Kâr', h.para(Math.abs(kz))],
      ['Getiri oranı', yuzde(oran)],
      ['Toplam maliyet', h.para(maliyet)],
      ['Satış geliri', h.para(gelir)],
      ['Kur farkı (birim başına)', h.fmt(s - a, 4) + ' TL'],
      ['Kur değişimi', yuzde(((s - a) / a) * 100)],
      ['Başabaş satış kuru', h.fmt(maliyet / m, 4) + ' TL'],
    ];
    return { rows, note: 'Kâr/zarar = miktar × (satış kuru − alış kuru) − masraf. Getiri oranı toplam maliyete göre hesaplanır; enflasyon ve alternatif getiri dikkate alınmaz.' };
  },
  cases: [
    { in: { miktar: '1000', alis: '30', satis: '33' }, out: { 'Kâr': '3.000,00 TL', 'Getiri oranı': '%10', 'Toplam maliyet': '30.000,00 TL', 'Satış geliri': '33.000,00 TL' } },
    { in: { miktar: '500', alis: '40', satis: '38' }, out: { 'Zarar': '1.000,00 TL', 'Getiri oranı': '-%5', 'Kur farkı (birim başına)': '-2 TL' } },
    { in: { miktar: '1000', alis: '32', satis: '32', masraf: '100' }, out: { 'Zarar': '100,00 TL', 'Başabaş satış kuru': '32,1 TL', 'Kur değişimi': '%0' } },
    { in: { miktar: '2500', alis: '35,2', satis: '36,08' }, out: { 'Kâr': '2.200,00 TL', 'Getiri oranı': '%2,5', 'Kur farkı (birim başına)': '0,88 TL' } },
    { in: { miktar: '100', alis: '10', satis: '10' }, out: { 'Kâr': '0,00 TL', 'Getiri oranı': '%0', 'Başabaş satış kuru': '10 TL' } },
    { in: { miktar: '2000', alis: '25', satis: '30', masraf: '500' }, out: { 'Kâr': '9.500,00 TL', 'Getiri oranı': '%18,81', 'Kur değişimi': '%20', 'Başabaş satış kuru': '25,25 TL' } },
    { in: { miktar: '0', alis: '30', satis: '33' }, error: true },
    { in: { miktar: '1000', alis: '', satis: '33' }, error: true },
  ],
  howto: [
    '"Döviz miktarı" alanına aldığınız döviz tutarını yazın; örneğin 1.000 dolar için 1000.',
    '"Aldığınız kur" alanına dövizi satın alırken birim başına ödediğiniz lira tutarını girin. Bu, banka ya da döviz bürosunun size uyguladığı satış kurudur.',
    '"Sattığınız kur" alanına dövizi bozdurduğunuz ya da bozdurmayı düşündüğünüz kuru yazın. Bu, kurumun alış kurudur ve aynı andaki satış kurundan düşüktür.',
    'Alım ve satımda komisyon, vergi ya da havale ücreti ödediyseniz toplamını "Toplam işlem masrafı" alanına lira olarak ekleyin.',
    '"Hesapla" düğmesine basın. Kâr ya da zarar, getiri oranı, toplam maliyet, satış geliri ve başabaş kuru listelenir.',
  ],
  sections: [
    { h: 'Döviz kâr zararı nasıl oluşur?', p: [
      'Döviz alıp bir süre sonra satan kişi, iki işlem arasındaki kur farkı kadar kazanır ya da kaybeder. Kazancın kaynağı faiz ya da temettü değil, yalnızca kurun hareketidir. Kur yükseldiyse elinizdeki döviz daha fazla lira eder ve kâr oluşur; düştüyse zarar oluşur.',
      'Hesap basit görünse de gözden kaçan iki ayrıntı vardır. Birincisi, alırken ve satarken farklı kurlar uygulanır. İkincisi, işlem sırasında ödenen masraflar kârdan düşer. Bu sayfa her ikisini de hesaba katacak biçimde tasarlanmıştır.',
    ] },
    { h: 'Formül', p: [
      'Temel bağıntı şudur: <strong>Kâr/zarar = Miktar × (Satış kuru − Alış kuru) − Masraf</strong>. Aynı sonuç, satış gelirinden toplam maliyetin çıkarılmasıyla da bulunur: satış geliri miktar ile satış kurunun çarpımı, toplam maliyet ise miktar ile alış kurunun çarpımına masrafın eklenmesidir.',
      '<strong>Getiri oranı = Kâr/zarar ÷ Toplam maliyet × 100</strong> şeklinde hesaplanır. Masraf yoksa bu oran kurun yüzde değişimine eşittir. <strong>Başabaş satış kuru = Toplam maliyet ÷ Miktar</strong> ise ne kâr ne zarar ettiğiniz kurdur; bu kurun altında satarsanız zarar edersiniz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 30 TL kurdan 1.000 dolar aldınız, kur 33 TL olduğunda sattınız. Maliyetiniz 1.000 × 30 = 30.000 TL, satış geliriniz 1.000 × 33 = 33.000 TL\'dir. Kâr <strong>3.000 TL</strong>, getiri oranı 3.000 ÷ 30.000 = %10 olur.',
      '<strong>Örnek 2:</strong> 40 TL kurdan 500 euro aldınız, nakde ihtiyaç duyup 38 TL\'den bozdurdunuz. Birim başına kur farkı -2 TL\'dir; zarar 500 × 2 = <strong>1.000 TL</strong>, getiri -%5\'tir.',
      '<strong>Örnek 3:</strong> 25 TL kurdan 2.000 dolar alıp 30 TL\'den sattınız ve iki işlemde toplam 500 TL masraf ödediniz. Toplam maliyet 50.000 + 500 = 50.500 TL, satış geliri 60.000 TL, kâr 9.500 TL\'dir. Kur %20 yükselmiş olmasına rağmen getiriniz 9.500 ÷ 50.500 = %18,81\'dir; aradaki fark masraftan kaynaklanır. Başabaş kurunuz 50.500 ÷ 2.000 = 25,25 TL\'dir.',
    ] },
    { h: 'Alış kuru, satış kuru ve makas', p: [
      'Bankalar ve döviz büroları her döviz için iki fiyat ilan eder. <strong>Satış kuru</strong>, kurumun size döviz satarken uyguladığı, yani sizin döviz alırken ödediğiniz fiyattır. <strong>Alış kuru</strong> ise kurumun sizden döviz alırken ödediği fiyattır. Satış kuru her zaman alış kurundan yüksektir; aradaki farka makas denir.',
      'Makas, kur hiç değişmese bile dövizi alıp hemen satan kişinin zarar etmesine yol açar. Örneğin kurum 32,40 TL\'den satıp 32,00 TL\'den alıyorsa makas 0,40 TL\'dir ve kurun kâra geçmeniz için önce bu fark kadar yükselmesi gerekir. Makas; hafta sonları, akşam saatlerinde ve piyasanın dalgalı olduğu günlerde genişleyebilir. Hesap yaparken ekranda gördüğünüz orta kuru değil, işleminize fiilen uygulanan kurları yazın.',
    ] },
    { h: 'Hangi masraflar eklenmeli?', ul: [
      'Döviz alımında işlem tutarı üzerinden kesilen vergi: oranı zaman içinde değiştiği için güncel tutarı dekontunuzdan alın.',
      'Bankanın ya da aracı kurumun aldığı işlem komisyonu.',
      'Dövizi başka bir hesaba ya da kuruma taşırken ödenen havale, EFT ve muhabir banka ücretleri.',
      'Efektif (nakit) döviz çekerken ya da yatırırken uygulanan komisyon.',
      'Fiziki dövizde saklama için kiralanan kasa bedeli gibi dolaylı giderler.',
    ] },
    { h: 'Nominal kâr ile gerçek kazanç arasındaki fark', p: [
      'Bu araç lira cinsinden nominal kâr ya da zararı hesaplar. Gerçek kazancınızı değerlendirmek için iki karşılaştırma daha yapmanız gerekir. Birincisi enflasyondur: dövizi tuttuğunuz sürede fiyatlar kur artışından daha hızlı yükseldiyse lira olarak kâr etseniz bile satın alma gücünüz azalmıştır. İkincisi alternatif getiridir: aynı parayı mevduatta ya da başka bir araçta tutsaydınız ne kazanırdınız?',
      'Ayrıca henüz satmadığınız dövizin kârı gerçekleşmemiş kârdır; "Sattığınız kur" alanına bugünkü alış kurunu yazarak yalnızca o günkü durumu görürsünüz, kur yarın farklı olabilir.',
    ] },
    { h: 'Uyarı', p: [
      'Hesaplama yalnızca yazdığınız değerler üzerinden yapılır; araç güncel kur bilgisi çekmez ve kurun yönü hakkında tahminde bulunmaz. Sonuçlar bilgilendirme amaçlıdır, yatırım tavsiyesi değildir. Döviz işlemlerinden doğan vergi ve beyan yükümlülükleri kişisel ya da ticari durumunuza göre değişebilir; bu konularda mali müşavirinize danışın.',
    ] },
  ],
  faq: [
    ['Döviz kârı nasıl hesaplanır?', 'Satış kurundan alış kurunu çıkarıp döviz miktarıyla çarpın, varsa masrafları düşün. 30 TL\'den alınan 1.000 dolar 33 TL\'den satıldığında kâr 1.000 × (33 − 30) = 3.000 TL olur.'],
    ['Hangi kuru "aldığım kur" olarak yazmalıyım?', 'Dövizi satın aldığınız anda size uygulanan kuru, yani kurumun satış kurunu yazın. Kesin değer işlem dekontunuzda yer alır; ekranlarda gösterilen ortalama kur işleminize uygulanan kurdan farklı olabilir.'],
    ['Kur aynı kaldığı halde neden zarar ediyorum?', 'Alış ve satış kuru arasındaki makas ile ödediğiniz komisyon ve vergiler nedeniyle. Dövizi bozdururken kurumun alış kuru uygulanır ve bu kur, aynı andaki satış kurundan düşüktür.'],
    ['Başabaş satış kuru ne işe yarar?', 'Zarar etmeden çıkabileceğiniz en düşük kuru gösterir. Toplam maliyetinizin döviz miktarına bölünmesiyle bulunur; masraf girdiyseniz alış kurunuzdan bir miktar yüksek çıkar.'],
    ['Farklı kurlardan birkaç alım yaptıysam ne yazmalıyım?', 'Önce ağırlıklı ortalama alış kurunuzu bulun: her alımın lira tutarını toplayıp toplam döviz miktarına bölün. Bu ortalamayı "Aldığınız kur" alanına, toplam miktarı da miktar alanına yazın.'],
    ['Altın ya da kripto para için kullanılabilir mi?', 'Evet. Miktar alanına gram ya da adet, kur alanlarına birim alış ve satış fiyatını yazarsanız hesap aynı mantıkla çalışır.'],
    ['Getiri oranı yıllık mı?', 'Hayır. Oran, alım ile satım arasındaki sürenin tamamı için toplam getiridir; süreyi dikkate almaz. Farklı sürelerdeki işlemleri karşılaştırmak için sonucu yıllık bileşik orana çevirmeniz gerekir.'],
    ['Yazdığım tutarlar saklanıyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; miktar ve kur bilgileriniz sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['kar-zarar-hesapla', 'hisse-ortalama-maliyet-hesapla', 'yatirim-getirisi-hesapla', 'yillik-bilesik-buyume-hesapla', 'satin-alma-gucu-hesapla'],
};
