export default {
  slug: 'kilometre-maliyeti-hesapla',
  title: 'Kilometre Başına Maliyet Hesaplama',
  h1Tail: 'aracın gerçek km maliyeti',
  pageTitle: 'Kilometre Başına Maliyet Hesaplama – Aracın Gerçek Km Maliyeti',
  description: 'Yakıt, sigorta, vergi, bakım ve değer kaybını birlikte hesaba katarak aracınızın kilometre başına gerçek maliyetini, yıllık ve aylık toplam giderini bulun.',
  card: 'Yakıt, sigorta, vergi, bakım ve değer kaybıyla aracınızın kilometre başına gerçek maliyetini hesaplayın.',
  category: 'gunluk',
  keywords: ['kilometre başına maliyet', 'km maliyeti hesaplama', 'araç maliyeti hesaplama', 'araba yıllık masrafı', 'km başı yakıt maliyeti', 'araç sahip olma maliyeti', 'iş için araç km ücreti'],
  lead: `Yıllık kaç kilometre yaptığınızı, yakıt tüketiminizi ve yıllık giderlerinizi yazın; araç yalnızca yakıtı değil sigorta, vergi, bakım ve değer kaybını da katarak <strong>bir kilometrenin size gerçekte kaça mal olduğunu</strong> hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'km', label: 'Yıllık kilometre', type: 'number', placeholder: 'Örn. 15000', hint: 'Binlik ayraç kullanmayın: 15000 yazın.' },
    { id: 'tuketim', label: 'Ortalama tüketim (L/100 km)', type: 'number', placeholder: 'Örn. 6,5', hint: 'Elektrikli araç için kWh/100 km yazabilirsiniz.' },
    { id: 'fiyat', label: 'Yakıt birim fiyatı (TL)', type: 'number', placeholder: 'Örn. 44', hint: 'Litre (ya da kWh) fiyatı.' },
    { id: 'sabit', label: 'Yıllık sabit giderler (TL)', type: 'number', placeholder: 'Örn. 30000', hint: 'Sigorta, kasko, vergi, muayene toplamı. Binlik ayraç kullanmayın ya da 30.000,00 biçiminde yazın.' },
    { id: 'bakim', label: 'Yıllık bakım ve lastik (TL)', type: 'number', placeholder: 'Örn. 14000', hint: 'Periyodik bakım, onarım, lastik, yıkama, otopark. Boş bırakılırsa 0 alınır.' },
    { id: 'deger', label: 'Yıllık değer kaybı / finansman (TL)', type: 'number', placeholder: 'Örn. 60000', hint: 'İsteğe bağlı; boş bırakılırsa 0 alınır.' },
  ],
  compute(v, h) {
    const km = h.pos(v.km, 'Yıllık kilometre');
    const tuk = h.pos(v.tuketim, 'Ortalama tüketim');
    const fiyat = h.pos(v.fiyat, 'Yakıt birim fiyatı');
    const sabit = h.opt(v.sabit, 0, 'Yıllık sabit giderler');
    const bakim = h.opt(v.bakim, 0, 'Yıllık bakım ve lastik');
    const deger = h.opt(v.deger, 0, 'Yıllık değer kaybı / finansman');
    if (sabit < 0 || bakim < 0 || deger < 0) h.err('Gider tutarları negatif olamaz.');
    if (tuk > 100) h.err('"Ortalama tüketim" 100 km için litre (ya da kWh) olarak girilmeli; değer çok yüksek görünüyor.');
    const yakit = km * tuk / 100 * fiyat;
    const diger = sabit + bakim + deger;
    const toplam = yakit + diger;
    return {
      rows: [
        ['Kilometre başına maliyet', h.para(toplam / km)],
        ['Kilometre başına yakıt', h.para(yakit / km)],
        ['Kilometre başına diğer giderler', h.para(diger / km)],
        ['100 km maliyeti', h.para(toplam / km * 100)],
        ['Yıllık yakıt gideri', h.para(yakit)],
        ['Yıllık toplam maliyet', h.para(toplam)],
        ['Aylık ortalama maliyet', h.para(toplam / 12)],
        ['Yakıtın toplam içindeki payı', '% ' + h.fmt(yakit / toplam * 100, 1)],
      ],
      note: 'Sabit giderler kilometreye bölündüğü için yıllık kilometre azaldıkça kilometre başına maliyet artar. Sonuç, girdiğiniz tahminlere dayanan bilgilendirme amaçlı bir hesaptır.',
    };
  },
  cases: [
    { in: { km: '15000', tuketim: '6,5', fiyat: '44', sabit: '30000', bakim: '14000', deger: '60000' }, out: { 'Kilometre başına maliyet': '9,79 TL', 'Kilometre başına yakıt': '2,86 TL', 'Yıllık yakıt gideri': '42.900,00 TL', 'Yıllık toplam maliyet': '146.900,00 TL', 'Aylık ortalama maliyet': '12.241,67 TL' } },
    { in: { km: '20000', tuketim: '5', fiyat: '40' }, out: { 'Kilometre başına maliyet': '2,00 TL', 'Yıllık toplam maliyet': '40.000,00 TL', 'Aylık ortalama maliyet': '3.333,33 TL', 'Yakıtın toplam içindeki payı': '% 100' } },
    { in: { km: '10000', tuketim: '8', fiyat: '50', sabit: '20000', bakim: '10000', deger: '30000' }, out: { 'Kilometre başına maliyet': '10,00 TL', 'Kilometre başına yakıt': '4,00 TL', 'Kilometre başına diğer giderler': '6,00 TL', 'Yakıtın toplam içindeki payı': '% 40' } },
    { in: { km: '12000', tuketim: '7,2', fiyat: '42,5', sabit: '24000', bakim: '12000' }, out: { 'Kilometre başına maliyet': '6,06 TL', 'Yıllık yakıt gideri': '36.720,00 TL', 'Aylık ortalama maliyet': '6.060,00 TL', '100 km maliyeti': '606,00 TL' } },
    { in: { km: '30000', tuketim: '4,5', fiyat: '48', sabit: '36000', bakim: '24000', deger: '90000' }, out: { 'Kilometre başına maliyet': '7,16 TL', 'Yıllık toplam maliyet': '214.800,00 TL' } },
    { in: { km: '5000', tuketim: '6,5', fiyat: '44', sabit: '30000', bakim: '14000', deger: '60000' }, out: { 'Kilometre başına maliyet': '23,66 TL', 'Kilometre başına diğer giderler': '20,80 TL' } },
    { in: { km: '0', tuketim: '6,5', fiyat: '44' }, error: true },
    { in: { km: '15000', tuketim: '6,5', fiyat: '' }, error: true },
  ],
  howto: [
    `"Yıllık kilometre" alanına bir yılda yaptığınız yaklaşık yolu yazın; bilmiyorsanız son muayene ya da bakım kayıtlarındaki kilometre farkından bulabilirsiniz.`,
    `Aracınızın ortalama tüketimini 100 kilometrede litre olarak ve güncel yakıt litre fiyatını girin.`,
    `Sigorta, kasko, vergi ve muayene gibi kullanımdan bağımsız yıllık giderlerinizi toplayıp "Yıllık sabit giderler" alanına yazın.`,
    `Bakım, onarım, lastik, otopark gibi giderleri ve isterseniz yıllık değer kaybını ya da kredi faizini ilgili alanlara ekleyin.`,
    `"Hesapla" düğmesine basın; ilk satır bir kilometrenin toplam maliyetini, alt satırlar yıllık ve aylık toplamları gösterir.`,
  ],
  sections: [
    { h: 'Kilometre başına maliyet neden yalnızca yakıt değildir?', p: [
      `Çoğu sürücü aracının maliyetini depoya ödediği parayla ölçer. Oysa otomobil, kontak kapalıyken de para harcayan bir varlıktır: sigorta ve kasko primi, yıllık vergi, muayene, periyodik bakım, lastik ve zamanla eriyen araç değeri, hiç yola çıkmasanız bile cebinizden çıkar. Bir kilometrenin gerçek bedelini görmek için bütün bu kalemleri yıllık toplamda bir araya getirip gidilen yola bölmek gerekir.`,
      `Bu bakış, "toplu taşıma mı araç mı", "şirket bana kilometre başına ne ödemeli", "ikinci araca gerek var mı" gibi soruları duygularla değil sayılarla yanıtlamayı sağlar. Yakıt masrafı düşük görünen kısa mesafeli kullanımın, sabit giderler yüzünden kilometre başına ne kadar pahalı olduğunu görmek çoğu zaman şaşırtıcıdır.`,
    ] },
    { h: 'Hesaplama yöntemi', ul: [
      `<strong>Yıllık yakıt gideri</strong> = yıllık km × tüketim ÷ 100 × yakıt fiyatı`,
      `<strong>Yıllık toplam maliyet</strong> = yakıt + sabit giderler + bakım ve lastik + değer kaybı`,
      `<strong>Kilometre başına maliyet</strong> = yıllık toplam maliyet ÷ yıllık km`,
      `<strong>Aylık ortalama</strong> = yıllık toplam maliyet ÷ 12`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Yılda 15.000 km yapan, 100 kilometrede 6,5 litre tüketen bir araç düşünelim; yakıtın litresi 44 TL olsun. Yıllık yakıt tüketimi 15.000 × 6,5 ÷ 100 = 975 litre, yakıt gideri 975 × 44 = <strong>42.900 TL</strong> olur. Yalnızca yakıta bakıldığında kilometre 2,86 TL'ye gelir.`,
      `Şimdi diğer kalemleri ekleyelim: sigorta, kasko, vergi ve muayene toplamı 30.000 TL; bakım ve lastik 14.000 TL; yıllık değer kaybı 60.000 TL. Toplam maliyet 42.900 + 30.000 + 14.000 + 60.000 = <strong>146.900 TL</strong> eder. Bunu 15.000 km'ye böldüğümüzde kilometre başına maliyet <strong>9,79 TL</strong> çıkar; yani yakıt, gerçek maliyetin yalnızca yüzde 29,2'sidir. Aylık ortalama yük ise 12.241,67 TL'dir.`,
      `Aynı araç yılda yalnızca 5.000 km kullanılsaydı yakıt gideri 14.300 TL'ye düşer, ancak diğer giderler değişmediği için kilometre başına maliyet 23,66 TL'ye çıkardı. Örnekteki tutarlar yalnızca hesabı göstermek içindir; kendi fatura ve poliçelerinizdeki gerçek değerleri kullanın.`,
    ] },
    { h: 'Hangi gider hangi alana yazılır?', ul: [
      `<strong>Sabit giderler:</strong> zorunlu trafik sigortası, kasko, yıllık taşıt vergisi, muayene ve egzoz ölçüm ücretleri, varsa aidatlı otopark ya da garaj kirası.`,
      `<strong>Bakım ve lastik:</strong> periyodik bakım, yağ ve filtre değişimi, fren balatası, akü, silecek, lastik (ömrüne bölerek yıllık pay), yıkama, köprü ve otoyol geçişleri, günlük otopark ücretleri.`,
      `<strong>Değer kaybı / finansman:</strong> aracın bir yılda piyasa değerinden kaybettiği tutar ve kredi kullandıysanız yıllık faiz gideri. Değer kaybını kestirmek zordur; emin değilseniz boş bırakıp yalnızca nakit çıkışlarını da hesaplayabilirsiniz.`,
    ] },
    { h: 'Kimler için yararlıdır?', p: [
      `Kendi aracıyla iş yapan serbest çalışanlar, saha satış temsilcileri ve kuryeler müşteriye ya da işverene yansıtacakları kilometre bedelini belirlerken bu hesaba ihtiyaç duyar. Yalnızca yakıtı fatura eden kişi, lastik ve bakım gibi yıpranma giderlerini cebinden karşılamış olur. İşverenler de çalışana ödenecek yol tazminatını ya da şirket aracı ile kiralama seçeneklerini karşılaştırırken aynı rakamı kullanır. Vergisel açıdan hangi giderin ne ölçüde kabul edildiği ayrı bir konudur; bunun için mali müşavirinize danışın ve güncel mevzuatı kontrol edin.`,
      `Bireysel kullanıcılar için hesap, araç değiştirme kararında yol göstericidir. Daha az yakan ama daha pahalı bir aracın yakıt tasarrufu, artan kasko ve değer kaybını karşılıyor mu? İki aracı ayrı ayrı hesaplayıp kilometre maliyetlerini yan yana koymak bu soruyu netleştirir. Aracı az kullanan haneler için taksi, araç paylaşımı ya da kiralama ile karşılaştırma yapmak da mümkündür.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Fabrika tüketim verisini kullanmak: gerçek kullanımda tüketim genellikle katalog değerinden yüksektir. Depo doldurma yöntemiyle kendi ortalamanızı ölçün.`,
      `Birkaç yılda bir yapılan giderleri unutmak: lastik, akü, triger seti gibi kalemleri ömürlerine bölerek yıllık paya çevirin.`,
      `Değer kaybını yok saymak ya da enflasyon dönemlerinde aracın etiket fiyatının artmasını kazanç saymak: önemli olan, aynı aracı yenilemek için gereken paradaki değişimdir.`,
      `Kilometreyi binlik noktayla yazmak: "15.000" girdisi 15 olarak okunur; ayraç kullanmadan 15000 yazın.`,
    ] },
  ],
  faq: [
    ['Kilometre başına maliyet nasıl hesaplanır?', `Yıllık yakıt gideri ile sigorta, vergi, bakım, lastik ve değer kaybı gibi bütün yıllık giderler toplanır ve yıllık kilometreye bölünür. Yalnızca yakıt maliyeti için tüketim ÷ 100 × litre fiyatı işlemi yeterlidir.`],
    ['Yalnızca yakıt maliyetini görmek istersem ne yapmalıyım?', `Gider alanlarını boş bırakın. Araç bu durumda yalnızca yakıtı hesaba katar; "Kilometre başına yakıt" satırı her durumda ayrıca gösterilir.`],
    ['Elektrikli araç için kullanabilir miyim?', `Evet. Tüketim alanına 100 km'de harcanan kWh değerini, fiyat alanına kWh başına ödediğiniz ortalama tutarı yazın. Diğer gider alanları aynı biçimde kullanılır.`],
    ['Değer kaybını nasıl tahmin ederim?', `Aracınızın bir yıl önceki ve bugünkü ikinci el piyasa değerini karşılaştırabilir ya da satın alma bedeli ile tahmini satış bedeli arasındaki farkı elde tutma yılına bölebilirsiniz. Kesin bir yöntem yoktur; iyimser ve kötümser iki ayrı hesap yapmak sağlıklıdır.`],
    ['Az kilometre yapınca maliyet neden artıyor?', `Sigorta, vergi ve değer kaybı gibi giderler kullanımdan bağımsızdır. Bu sabit tutar daha az kilometreye bölündüğünde her kilometrenin payı büyür.`],
    ['İşverenden kilometre başına ne kadar talep etmeliyim?', `Bu, tarafların anlaşmasına bağlıdır. Hesabın "Kilometre başına maliyet" satırı aracın size gerçek yükünü gösterir ve pazarlıkta dayanak olur; vergisel sınırlar için mali müşavirinize danışın.`],
    ['Otoyol ve köprü ücretlerini nereye yazmalıyım?', `Yıllık toplamını "Yıllık bakım ve lastik" alanındaki tutara ekleyin. Bu alan, kullanıma bağlı bütün değişken giderler için kullanılabilir.`],
    ['Girdiğim tutarlar kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız kilometre ve tutarlar sunucuya gönderilmez, saklanmaz.`],
  ],
  related: ['yakit-tuketimi-hesapla', 'yakit-hesapla', 'yol-masrafi-paylasimi', 'lpg-benzin-karsilastir', 'elektrikli-arac-sarj-maliyeti-hesapla', 'amortisman-hesapla'],
};
