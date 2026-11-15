export default {
  slug: 'kredi-erken-kapama-hesapla',
  title: 'Kredi Erken Kapama Hesaplama',
  h1Tail: 'kapama tutarı ve kazanç',
  pageTitle: 'Kredi Erken Kapama Hesaplama – Kapama Tutarı ve Faiz Kazancı',
  description: 'Kalan anapara, faiz oranı ve kalan taksit sayısını girin; krediyi bugün kapatırsanız ödeyeceğiniz tutarı ve kurtulacağınız faiz yükünü hesaplayın.',
  card: 'Krediyi erken kapatırsanız ne ödersiniz, ne kadar faizden kurtulursunuz? Kapama tutarını ve kazancı görün.',
  category: 'finans',
  keywords: ['kredi erken kapama hesaplama', 'erken kapama tutarı', 'kredi kapatma hesaplama', 'erken ödeme tazminatı', 'kalan anapara', 'kredi erken ödeme', 'erken kapama faiz indirimi'],
  lead: 'Krediyi vadesinden önce kapatmayı düşünüyorsanız kalan anaparanızı, faiz oranınızı ve kalan taksit sayınızı yazın. Araç, bugün ödemeniz gereken <strong>erken kapama tutarını</strong> ve taksitlere devam etmeye kıyasla ne kadar faiz ve vergiden kurtulacağınızı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'anapara', label: 'Kalan anapara (TL)', type: 'number', placeholder: 'Örn. 100000', hint: 'Ödeme planınızdaki son taksitten sonraki kalan anapara' },
    { id: 'faiz', label: 'Aylık faiz oranı (%)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'kalan', label: 'Kalan taksit sayısı', type: 'number', placeholder: 'Örn. 12' },
    { id: 'gun', label: 'Son taksitten bu yana geçen gün', type: 'number', value: '0', hint: 'Taksit gününde kapatıyorsanız 0' },
    { id: 'vergi', label: 'Faiz üzerindeki vergi ve fon toplamı (%)', type: 'number', value: '0', hint: 'KKDF + BSMV toplamı; sözleşmenizdeki oranları yazın, yoksa 0' },
    { id: 'tazminat', label: 'Erken ödeme tazminatı oranı (%)', type: 'number', value: '0', hint: 'Yalnızca sözleşmenizde varsa (genellikle konut kredilerinde)' },
  ],
  compute(v, h) {
    const P = h.pos(v.anapara, 'Kalan anapara');
    const r = h.nonneg(v.faiz, 'Aylık faiz oranı') / 100;
    const n = h.posint(v.kalan, 'Kalan taksit sayısı');
    const gun = h.nonneg(h.opt(v.gun, 0, 'Geçen gün'), 'Geçen gün');
    const vergi = h.nonneg(h.opt(v.vergi, 0, 'Vergi ve fon toplamı'), 'Vergi ve fon toplamı') / 100;
    const taz = h.nonneg(h.opt(v.tazminat, 0, 'Erken ödeme tazminatı oranı'), 'Erken ödeme tazminatı oranı') / 100;
    if (n > 600) h.err('Kalan taksit sayısı en fazla 600 olabilir.');
    if (gun > 31) h.err('Geçen gün sayısı 0 ile 31 arasında olmalı; taksit gecikmişse bankanızdan güncel tutarı isteyin.');
    if (r > 1) h.err('Aylık faiz oranı %100\'den büyük olamaz; oranı yüzde olarak yazın (örn. 3).');
    const rb = r * (1 + vergi);
    const taksit = rb === 0 ? P / n : (P * rb) / (1 - Math.pow(1 + rb, -n));
    const toplam = taksit * n;
    const islemis = (P * r * gun) / 30;
    const islemisVergi = islemis * vergi;
    const tazminat = P * taz;
    const kapama = P + islemis + islemisVergi + tazminat;
    const kazanc = toplam - kapama;
    return {
      rows: [
        ['Erken kapama tutarı', h.para(kapama)],
        ['Kalan anapara', h.para(P)],
        ['İşlemiş faiz', h.para(islemis)],
        ['İşlemiş faizin vergi ve fonu', h.para(islemisVergi)],
        ['Erken ödeme tazminatı', h.para(tazminat)],
        ['Mevcut aylık taksit (yaklaşık)', h.para(taksit)],
        ['Kalan taksitlerin toplamı', h.para(toplam)],
        ['Erken kapamanın kazancı', h.para(kazanc)],
      ],
      note: 'Eşit taksitli, sabit faizli kredi varsayılmıştır; ay 30 gün alınır. Kesin kapama tutarını bankanız bildirir.',
    };
  },
  cases: [
    { in: { anapara: '100000', faiz: '3', kalan: '12' }, out: { 'Erken kapama tutarı': '100.000,00 TL', 'Mevcut aylık taksit (yaklaşık)': '10.046,21 TL', 'Kalan taksitlerin toplamı': '120.554,50 TL', 'Erken kapamanın kazancı': '20.554,50 TL' } },
    { in: { anapara: '100000', faiz: '3', kalan: '12', gun: '15', vergi: '30' }, out: { 'Erken kapama tutarı': '101.950,00 TL', 'İşlemiş faiz': '1.500,00 TL', 'İşlemiş faizin vergi ve fonu': '450,00 TL', 'Mevcut aylık taksit (yaklaşık)': '10.593,48 TL', 'Erken kapamanın kazancı': '25.171,82 TL' } },
    { in: { anapara: '500000', faiz: '2,5', kalan: '60', gun: '0', vergi: '0', tazminat: '2' }, out: { 'Erken kapama tutarı': '510.000,00 TL', 'Erken ödeme tazminatı': '10.000,00 TL', 'Mevcut aylık taksit (yaklaşık)': '16.176,70 TL', 'Erken kapamanın kazancı': '460.601,88 TL' } },
    { in: { anapara: '50000', faiz: '4', kalan: '6', gun: '10', vergi: '30' }, out: { 'Erken kapama tutarı': '50.866,67 TL', 'İşlemiş faiz': '666,67 TL', 'Kalan taksitlerin toplamı': '59.483,81 TL' } },
    { in: { anapara: '200000', faiz: '0', kalan: '10' }, out: { 'Erken kapama tutarı': '200.000,00 TL', 'Mevcut aylık taksit (yaklaşık)': '20.000,00 TL', 'Erken kapamanın kazancı': '0,00 TL' } },
    { in: { anapara: '0', faiz: '3', kalan: '12' }, error: true },
    { in: { anapara: '100000', faiz: '3', kalan: '4,5' }, error: true },
    { in: { anapara: '100000', faiz: '3', kalan: '12', gun: '45' }, error: true },
  ],
  howto: [
    'Bankanızın ödeme planından ya da mobil uygulamadaki kredi detayından <strong>kalan anaparayı</strong> bulun ve ilk alana yazın. Bu tutar, kalan taksitlerin toplamı değildir; son ödediğiniz taksitten sonra geriye kalan borç ana parasıdır.',
    'Sözleşmenizdeki aylık akdi faiz oranını ve önünüzde kaç taksit kaldığını girin.',
    'Taksit gününde kapatmıyorsanız son taksit tarihinden bugüne kaç gün geçtiğini yazın; araç bu günlerin faizini kapama tutarına ekler.',
    'Kredinizde faiz üzerinden vergi ve fon kesiliyorsa toplam oranı, sözleşmenizde erken ödeme tazminatı varsa oranını ilgili alanlara yazın; yoksa 0 bırakın.',
    '"Hesapla" düğmesine basın. İlk satır bugün ödemeniz gereken tutarı, son satır taksitlere devam etmeye göre cebinizde kalacak parayı gösterir.',
  ],
  sections: [
    { h: 'Erken kapama tutarı nasıl oluşur?', p: [
      'Eşit taksitli bir kredide her taksit iki parçadan oluşur: o ayın faizi (ve varsa faizin vergisi) ile anapara payı. Henüz vadesi gelmemiş taksitlerin içindeki faiz, parayı kullanmaya devam edeceğiniz ayların bedelidir. Krediyi bugün kapatırsanız o ayları kullanmayacağınız için gelecek ayların faizini ödemezsiniz. Bu nedenle erken kapamada ödenen tutar, kalan taksitlerin toplamından belirgin biçimde düşüktür.',
      'Kapama tutarı dört kalemin toplamıdır: <strong>kalan anapara</strong>, son taksit tarihinden kapama gününe kadar <strong>işlemiş faiz</strong>, bu faizin <strong>vergi ve fonu</strong> ve sözleşmede varsa <strong>erken ödeme tazminatı</strong>. Taksit gününde kapatırsanız işlemiş faiz sıfırdır ve yalnızca kalan anaparayı (ve varsa tazminatı) ödersiniz.',
    ] },
    { h: 'Hesaplamada kullanılan formüller', p: [
      'İşlemiş faiz basit faizle ve 30 günlük ay üzerinden bulunur: <strong>işlemiş faiz = kalan anapara × aylık faiz × geçen gün ÷ 30</strong>. Vergi ve fon, bu faiz tutarının girdiğiniz yüzdesi kadardır. Tazminat ise kalan anaparanın sözleşmedeki yüzdesidir.',
      'Karşılaştırma için mevcut taksitiniz anüite formülüyle tahmin edilir: <strong>taksit = A × i ÷ (1 − (1 + i)<sup>−n</sup>)</strong>. Burada A kalan anapara, n kalan taksit sayısı, i ise vergiler dahil aylık maliyet oranıdır (aylık faiz × (1 + vergi oranı)). Taksit × n kalan taksitlerin toplamını verir; bundan kapama tutarı çıkarılınca erken kapamanın kazancı bulunur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Kalan anaparanız 100.000 TL, aylık faiz %3, kalan taksit 12 olsun; faiz üzerindeki vergi ve fon toplamı %30 kabul edilsin ve son taksiti 15 gün önce ödemiş olun. Vergiler dahil aylık maliyet oranı 0,03 × 1,30 = 0,039 olur. Bu oranla 12 taksitlik anüite taksiti yaklaşık 10.593,48 TL, on iki taksitin toplamı 127.121,82 TL\'dir.',
      'İşlemiş faiz 100.000 × 0,03 × 15 ÷ 30 = 1.500 TL, bunun vergi ve fonu 1.500 × 0,30 = 450 TL eder. Tazminat yoksa kapama tutarı 100.000 + 1.500 + 450 = <strong>101.950 TL</strong> olur. Taksitlere devam etseydiniz 127.121,82 TL ödeyecektiniz; aradaki 25.171,82 TL erken kapamayla ödemekten kurtulduğunuz faiz ve vergidir.',
      'Aynı krediyi taksit gününde, vergisiz bir hesapla düşünürsek tablo sadeleşir: taksit 10.046,21 TL, kalan toplam 120.554,50 TL, kapama tutarı tam 100.000 TL ve kazanç 20.554,50 TL\'dir.',
    ] },
    { h: 'Erken ödeme tazminatı ne zaman istenir?', p: [
      'Tüketici kredilerinde borcun tamamını ya da bir kısmını erken ödeme hakkı yasal bir haktır ve banka, ödenen tutara göre faiz ve masraf indirimi yapmak zorundadır. İhtiyaç ve taşıt gibi tüketici kredilerinde genel uygulamada erken kapama için ayrıca ceza alınmaz.',
      'Sabit faizli konut kredilerinde ise sözleşmede yazıyorsa erken ödeme tazminatı istenebilir. Tüketici mevzuatında bu tazminat, erken ödenen anapara üzerinden hesaplanır ve kalan vadeye göre üst sınıra bağlıdır: kalan vadesi 36 ayı aşmayan kredilerde yüzde biri, aşanlarda yüzde ikiyi geçemez. Değişken faizli konut kredilerinde tazminat istenmez. Ticari kredilerde koşulları tümüyle sözleşme belirler ve oranlar farklı olabilir. Kendi durumunuz için sözleşmenize ve bankanızın yazılı bildirimine bakın.',
    ] },
    { h: 'Erken kapatmak her zaman kârlı mı?', p: [
      'Araçtaki "kazanç" satırı, ödemeyeceğiniz faiz ve vergiyi gösterir; bu, elinizdeki paranın alternatif getirisini hesaba katmaz. Karar verirken şu noktaları tartın:',
    ], ul: [
      '<strong>Faiz karşılaştırması:</strong> Kredinizin aylık maliyeti, aynı parayı mevduatta ya da başka bir güvenli araçta tutarak elde edeceğiniz net aylık getiriden yüksekse kapatmak avantajlıdır; düşükse parayı değerlendirip taksit ödemeye devam etmek daha iyi sonuç verebilir.',
      '<strong>Kredinin hangi aşamasındasınız:</strong> Eşit taksitli kredilerde faizin büyük bölümü ilk taksitlerde ödenir. Vadenin sonuna yaklaştıkça taksitin çoğu anaparadır ve erken kapamanın kazancı küçülür.',
      '<strong>Acil durum payı:</strong> Birikiminizin tamamını borç kapatmaya ayırmak, beklenmedik bir harcamada daha pahalı bir borca girmenize yol açabilir.',
      '<strong>Sigorta ve masraflar:</strong> Krediye bağlı hayat sigortası gibi ürünlerde kalan süreye ait prim iadesi isteyebilirsiniz; bu araç iadeyi hesaba katmaz.',
    ] },
    { h: 'Ara ödeme ile erken kapama farkı', p: [
      'Borcun tamamını değil bir kısmını ödemek de mümkündür; buna ara ödeme denir. Ara ödemede yatırdığınız tutar anaparadan düşülür ve banka ya taksit tutarını azaltır ya da vadeyi kısaltır. Bu sayfa borcun tamamının kapatılmasını hesaplar. Ara ödeme sonrası yeni taksiti görmek için kalan anaparadan ödeyeceğiniz tutarı çıkarıp kredi taksit hesaplayıcısını kullanabilirsiniz.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap; sabit faizli, eşit taksitli ve taksitleri düzenli ödenmiş bir kredi içindir. Gecikmiş taksit, gecikme faizi, dosya masrafı iadesi, sigorta primi ve bankanın gün sayma yöntemi (30/360 ya da gerçek gün) sonuçta küçük farklar doğurabilir. Sonuçlar bilgilendirme amaçlıdır; bağlayıcı tutar bankanızın kapama günü için vereceği borç dökümüdür. Önemli mali kararlarda bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Kalan anaparayı nereden öğrenirim?', 'Kredi kullanırken verilen ödeme planında her taksit satırının sonunda "kalan anapara" sütunu bulunur. Son ödediğiniz taksitin satırındaki değer aradığınız tutardır. Bankanızın mobil uygulaması, internet şubesi ya da çağrı merkezi de güncel kalan anaparayı verir.'],
    ['Erken kapamada kalan taksitlerin toplamını mı öderim?', 'Hayır. Kalan taksitlerin içindeki, henüz işlemeyen aylara ait faiz ve vergiler düşülür. Ödeyeceğiniz tutar kalan anapara, kapama gününe kadar işlemiş faiz ile bunun vergisi ve varsa tazminattır.'],
    ['İhtiyaç kredisini erken kapatırsam ceza öder miyim?', 'Tüketici kredilerinde erken ödeme yasal bir haktır ve genel uygulamada ihtiyaç kredisi için erken kapama cezası alınmaz. Sabit faizli konut kredilerinde sözleşmede yer alıyorsa sınırlı oranda tazminat istenebilir. Kesin bilgi için sözleşmenizi kontrol edin.'],
    ['Vergi ve fon alanına ne yazmalıyım?', 'Tüketici kredilerinde faiz tutarı üzerinden KKDF ve BSMV hesaplanır; oranlar zaman içinde değişebildiği ve kredi türüne göre farklılaştığı için araç bunları sabitlemez. Ödeme planınızda yazan iki oranı toplayıp girin. Konut kredisi gibi bu kesintilerin uygulanmadığı kredilerde 0 bırakın.'],
    ['Taksit gününde kapatmak daha mı avantajlı?', 'Taksit gününde işlemiş faiz sıfırlandığı için kapama tutarı yalnızca kalan anaparadır. Ancak beklemek avantaj sağlamaz: aradaki her gün için faiz işler. Parayı hazır ettiğiniz gün kapatmak, bir sonraki taksit gününü beklemekten her zaman daha az faiz ödetir.'],
    ['Araçtaki taksit neden bankamdaki taksitten biraz farklı?', 'Araç taksiti, girdiğiniz kalan anapara, oran ve taksit sayısından yeniden hesaplar. Bankanın kuruş yuvarlaması, ilk taksit dönemindeki gün farkı, taksite eklenen sigorta ya da masraflar küçük sapmalara yol açar. Fark büyükse faiz oranını ve vergi toplamını kontrol edin.'],
    ['Kredinin son aylarında erken kapatmak işe yarar mı?', 'Yarar ama kazanç azdır. Eşit taksitli kredide son taksitlerin çok büyük bölümü anaparadır; içlerinde az faiz kalmıştır. Örneğin %3 aylık faizle son 3 taksiti kalan bir kredide kurtulacağınız faiz, kalan borcun yalnızca birkaç yüzdesi kadardır.'],
    ['Girdiğim kredi bilgileri kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız tutarlar ve oranlar hiçbir sunucuya gönderilmez, saklanmaz. Sayfayı kapattığınızda bilgiler silinir.'],
  ],
  related: ['kredi-hesapla', 'ihtiyac-kredisi-hesapla', 'konut-kredisi-hesapla', 'tasit-kredisi-hesapla', 'taksit-hesapla', 'borc-odeme-plani-hesapla'],
};
