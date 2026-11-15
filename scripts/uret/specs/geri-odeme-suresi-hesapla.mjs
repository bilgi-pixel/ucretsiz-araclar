export default {
  slug: 'geri-odeme-suresi-hesapla',
  title: 'Yatırımın Geri Ödeme Süresi Hesaplama',
  h1Tail: 'basit ve iskontolu',
  pageTitle: 'Yatırımın Geri Ödeme Süresi Hesaplama – Basit ve İskontolu',
  description: 'Yatırım tutarını ve yıllık nakit girişlerini yazın; yatırımın kendini kaç yılda geri ödediğini basit ve iskontolu yöntemle, yıl ve ay olarak hesaplayın.',
  card: 'Yatırımın kendini kaç yıl ve kaç ayda amorti ettiğini basit ya da iskontolu yöntemle bulun.',
  category: 'finans',
  keywords: ['geri ödeme süresi hesaplama', 'yatırımın geri dönüş süresi', 'amorti süresi hesaplama', 'iskontolu geri ödeme süresi', 'yatırım kaç yılda kendini öder', 'geri ödeme süresi formülü', 'payback süresi'],
  lead: 'Bir makine, güneş paneli, dükkân ya da yazılım yatırımının kendini ne zaman amorti edeceğini öğrenin. Yatırım tutarını ve yıllık net nakit girişini yazın; araç <strong>geri ödeme süresini</strong> yıl ve ay olarak verir. İskonto oranı girerseniz paranın zaman değerini hesaba katan iskontolu süreyi de bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'yatirim', label: 'Yatırım tutarı', type: 'number', placeholder: 'Örn. 100000' },
    { id: 'akislar', label: 'Yıllık net nakit girişi', type: 'textarea', placeholder: 'Örn. 40000  ya da  20000 30000 40000 50000', hint: 'Her yıl aynıysa tek sayı yazın. Yıldan yıla değişiyorsa sırayla, boşluk ya da satır sonuyla ayırarak girin.', wide: true },
    { id: 'iskonto', label: 'Yıllık iskonto oranı (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10', hint: 'Yazarsanız iskontolu geri ödeme süresi de hesaplanır.' },
  ],
  compute(v, h) {
    const y = h.pos(v.yatirim, 'Yatırım tutarı');
    const cf = h.nums(v.akislar, 'Yıllık net nakit girişi');
    if (cf.length > 200) h.err('En fazla 200 yıl girebilirsiniz.');
    const isk = String(v.iskonto ?? '').trim() === '' ? null : h.nonneg(v.iskonto, 'Yıllık iskonto oranı');
    const sabit = cf.length === 1;
    if (sabit && !(cf[0] > 0)) h.err('Yıllık net nakit girişi sıfırdan büyük olmalı; aksi halde yatırım geri dönmez.');
    if (!cf.some((x) => x > 0)) h.err('En az bir yılda pozitif nakit girişi olmalı.');
    const sinir = sabit ? 1000 : cf.length;
    const bul = (oran) => {
      let kum = 0;
      // Sabit girişte sonsuz serinin bugünkü değeri giriş ÷ oran'dır; yatırımı aşmıyorsa hiç geri dönmez.
      if (sabit && oran > 0 && cf[0] / oran <= y * (1 + 1e-9)) return { sure: null, kum: cf[0] / oran };
      for (let t = 1; t <= sinir; t++) {
        const a = (sabit ? cf[0] : cf[t - 1]) / Math.pow(1 + oran, t);
        if (a > 0 && kum + a >= y - 1e-9) return { sure: (t - 1) + Math.max(0, y - kum) / a, kum: kum + a };
        kum += a;
      }
      return { sure: null, kum };
    };
    const yaz = (s) => h.fmt(s, 2) + ' yıl';
    const yilAy = (s) => {
      const ay = Math.round(s * 12 - 1e-9);
      const yy = Math.floor(ay / 12), aa = ay % 12;
      return (yy > 0 ? yy + ' yıl' : '') + (yy > 0 && aa > 0 ? ' ' : '') + (aa > 0 || yy === 0 ? aa + ' ay' : '');
    };
    const yok = sabit ? 'Geri dönmüyor' : 'Verilen ' + cf.length + ' yılda geri dönmüyor';
    const rows = [];
    const basit = sabit ? { sure: y / cf[0] } : bul(0);
    if (basit.sure !== null) {
      rows.push(['Geri ödeme süresi', yaz(basit.sure)]);
      rows.push(['Yıl ve ay karşılığı', yilAy(basit.sure)]);
    } else {
      rows.push(['Geri ödeme süresi', yok]);
      rows.push(['Karşılanmayan tutar', h.para(y - basit.kum)]);
    }
    if (!sabit) rows.push(['Toplam nakit girişi', h.para(cf.reduce((s, x) => s + x, 0))]);
    if (isk !== null) {
      const r = isk / 100;
      const d = bul(r);
      if (d.sure !== null) {
        rows.push(['İskontolu geri ödeme süresi', yaz(d.sure)]);
        rows.push(['İskontolu yıl ve ay karşılığı', yilAy(d.sure)]);
      } else {
        rows.push(['İskontolu geri ödeme süresi', sabit && d.kum < y * (1 - 1e-9) && cf[0] / r > y * (1 + 1e-9) ? '1000 yılda geri dönmüyor' : yok]);
        rows.push(['Bugünkü değerle karşılanmayan tutar', h.para(y - d.kum)]);
      }
    }
    return { rows, note: 'Nakit girişlerinin yıl içine eşit yayıldığı varsayılır; kesirli yıl buna göre bulunur. Geri ödeme süresi, süre dolduktan sonraki kazancı ölçmez.' };
  },
  cases: [
    { in: { yatirim: '100000', akislar: '40000' }, out: { 'Geri ödeme süresi': '2,5 yıl', 'Yıl ve ay karşılığı': '2 yıl 6 ay' } },
    { in: { yatirim: '100000', akislar: '20000 30000 40000 50000' }, out: { 'Geri ödeme süresi': '3,2 yıl', 'Yıl ve ay karşılığı': '3 yıl 2 ay', 'Toplam nakit girişi': '140.000,00 TL' } },
    { in: { yatirim: '1000', akislar: '500', iskonto: '10' }, out: { 'Geri ödeme süresi': '2 yıl', 'Yıl ve ay karşılığı': '2 yıl', 'İskontolu geri ödeme süresi': '2,35 yıl' } },
    { in: { yatirim: '120000', akislar: '36000' }, out: { 'Geri ödeme süresi': '3,33 yıl', 'Yıl ve ay karşılığı': '3 yıl 4 ay' } },
    { in: { yatirim: '1000', akislar: '600\n600', iskonto: '10' }, out: { 'Geri ödeme süresi': '1,67 yıl', 'Yıl ve ay karşılığı': '1 yıl 8 ay', 'İskontolu geri ödeme süresi': '1,92 yıl' } },
    { in: { yatirim: '1000', akislar: '300 300' }, out: { 'Geri ödeme süresi': 'Verilen 2 yılda geri dönmüyor', 'Karşılanmayan tutar': '400,00 TL' } },
    { in: { yatirim: '1000', akislar: '100', iskonto: '10' }, out: { 'Geri ödeme süresi': '10 yıl', 'İskontolu geri ödeme süresi': 'Geri dönmüyor' } },
    { in: { yatirim: '30000', akislar: '60000' }, out: { 'Geri ödeme süresi': '0,5 yıl', 'Yıl ve ay karşılığı': '6 ay' } },
    { in: { yatirim: '100000', akislar: '0' }, error: true },
    { in: { yatirim: '', akislar: '40000' }, error: true },
  ],
  howto: [
    '"Yatırım tutarı" alanına başlangıçta yapacağınız toplam harcamayı yazın: satın alma bedeli, kurulum, nakliye ve devreye alma giderleri dahil.',
    '"Yıllık net nakit girişi" kutusuna yatırımın her yıl sağlayacağı net parayı girin. Her yıl aynı tutar bekleniyorsa tek bir sayı yeterlidir; değişiyorsa birinci yıldan başlayarak sırayla yazın.',
    'Paranın zaman değerini de görmek isterseniz "Yıllık iskonto oranı" alanına beklediğiniz yıllık getiriyi ya da kredi maliyetinizi yüzde olarak yazın.',
    '"Hesapla" düğmesine basın. Geri ödeme süresi ondalıklı yıl ve yıl-ay biçiminde, varsa iskontolu süreyle birlikte görünür.',
  ],
  sections: [
    { h: 'Geri ödeme süresi nedir?', p: [
      'Geri ödeme süresi, bir yatırımın sağladığı net nakit girişlerinin toplamının, başlangıçta harcanan tutara eşitlendiği ana kadar geçen zamandır. Gündelik dilde "yatırım kendini kaç yılda amorti eder" ya da "kaç yılda çıkarır" sorusunun cevabıdır. Küçük işletmelerde ve bireysel yatırımlarda en çok kullanılan değerlendirme ölçütüdür, çünkü anlaşılması kolaydır ve sonucu doğrudan takvimle ifade eder.',
      'Süre ne kadar kısaysa yatırımın bağladığı para o kadar erken serbest kalır ve belirsizliğe maruz kalınan dönem kısalır. Teknolojisi hızlı eskiyen ekipmanlarda, kira sözleşmesi belirli süreli olan dükkânlarda ya da nakit sıkışıklığı yaşayan işletmelerde bu ölçüt özellikle değerlidir.',
    ] },
    { h: 'Formül: eşit ve eşit olmayan nakit girişleri', p: [
      'Her yıl aynı tutar geliyorsa hesap bir bölmedir: <strong>Geri ödeme süresi = Yatırım tutarı ÷ Yıllık net nakit girişi</strong>. 100.000 TL\'lik bir yatırım yılda 40.000 TL getiriyorsa süre 100.000 ÷ 40.000 = 2,5 yıl, yani 2 yıl 6 aydır.',
      'Girişler yıldan yıla değişiyorsa birikimli toplam alınır. Yatırım tutarının aşıldığı yıl bulunur; o yılın başında kalan açık, o yılın girişine bölünerek kesirli kısım elde edilir: <strong>Süre = Tam yıl sayısı + (Kalan açık ÷ O yılın girişi)</strong>.',
    ] },
    { h: 'Çözümlü örnek: değişken girişler', p: [
      'Bir işletme 100.000 TL\'ye bir üretim hattı kuruyor; hattın dört yıl boyunca sırasıyla 20.000, 30.000, 40.000 ve 50.000 TL net nakit sağlaması bekleniyor. Birikimli toplam birinci yıl sonunda 20.000, ikinci yıl sonunda 50.000, üçüncü yıl sonunda 90.000 TL olur. Üçüncü yılın sonunda hâlâ 10.000 TL açık vardır.',
      'Dördüncü yılın girişi 50.000 TL olduğundan açık, yılın 10.000 ÷ 50.000 = 0,2\'lik bölümünde kapanır. Geri ödeme süresi <strong>3,2 yıl</strong>, yani yaklaşık 3 yıl 2 aydır. Araç ay karşılığını en yakın tam aya yuvarlar.',
    ] },
    { h: 'İskontolu geri ödeme süresi', p: [
      'Basit yöntem, üç yıl sonra gelecek 1 lirayı bugünkü 1 lirayla eşit sayar. Oysa para bugün elinizde olsaydı faiz ya da başka bir getiri kazandırırdı. İskontolu yöntem her yılın girişini önce bugünkü değerine indirger: <strong>Bugünkü değer = Giriş ÷ (1 + oran)<sup>yıl</sup></strong>. Sonra aynı birikimli toplama bu indirgenmiş değerlerle yapılır.',
      'Örnek: 1.000 TL\'lik yatırım yılda 500 TL getiriyor, iskonto oranı %10. Basit süre 2 yıldır. İskontolu değerler birinci yıl 454,55 TL, ikinci yıl 413,22 TL, üçüncü yıl 375,66 TL\'dir. İki yılın sonunda birikim 867,77 TL\'dir ve 132,23 TL açık kalır; bu açık üçüncü yılın 132,23 ÷ 375,66 = 0,35\'lik bölümünde kapanır. İskontolu geri ödeme süresi <strong>2,35 yıl</strong> olur.',
      'İskontolu süre her zaman basit süreden uzundur. Oran yeterince yüksekse yatırım hiç geri dönmeyebilir: yılda 100 TL getiren 1.000 TL\'lik bir yatırım basit hesapla 10 yılda döner, ama %10 iskonto oranında sonsuza kadar gelen girişlerin bugünkü değeri ancak 1.000 TL\'ye yaklaşır ve yatırımı aşamaz.',
    ] },
    { h: 'Türkiye\'den kullanım senaryoları', ul: [
      '<strong>Çatı güneş enerjisi sistemi:</strong> kurulum bedelini, yıllık elektrik faturası tasarrufuna bölerek sistemin kendini kaç yılda ödediğini görmek.',
      '<strong>LPG ya da hibrit araç farkı:</strong> dönüşüm ya da fiyat farkını yıllık yakıt tasarrufuna bölmek.',
      '<strong>Kiralık gayrimenkul:</strong> satın alma bedelini yıllık net kira gelirine bölerek amorti süresini bulmak.',
      '<strong>Makine yenileme:</strong> yeni tezgâhın maliyetini, sağlayacağı işçilik, enerji ve fire tasarrufuyla karşılaştırmak.',
      '<strong>Isı yalıtımı ve kombi değişimi:</strong> yatırımı yıllık doğal gaz tasarrufuyla ilişkilendirmek.',
    ] },
    { h: 'Yöntemin zayıf yanları ve uyarı', p: [
      'Geri ödeme süresi, süre dolduktan sonra gelen nakdi tamamen görmezden gelir. Üç yılda kendini ödeyip dördüncü yılda biten bir proje ile üç buçuk yılda ödeyip yirmi yıl gelir getiren bir proje arasında ilkini seçtirir. Bu nedenle tek başına değil, net bugünkü değer ve iç verim oranı gibi ölçütlerle birlikte kullanılmalıdır.',
      'Yüksek enflasyon dönemlerinde gelecek yılların girişlerini bugünkü fiyatlarla sabit tutmak süreyi olduğundan uzun, nominal artışla tahmin edip iskonto uygulamamak ise kısa gösterir; girişler ile iskonto oranını aynı esasla (ikisi de nominal ya da ikisi de reel) belirleyin. Buradaki sonuçlar bilgilendirme amaçlıdır; yatırım kararı için mali danışmanınızın görüşünü alın.',
    ] },
  ],
  faq: [
    ['Geri ödeme süresi nasıl hesaplanır?', 'Yıllık girişler eşitse yatırım tutarını yıllık net nakit girişine bölersiniz. Eşit değilse girişleri yıl yıl toplar, yatırım tutarına ulaşılan yılı bulur ve o yıl içindeki kesri kalan açığı o yılın girişine bölerek hesaplarsınız.'],
    ['Net nakit girişi olarak neyi yazmalıyım?', 'Yatırımın sağladığı ek gelirden ya da tasarruftan, onu elde etmek için katlanılan işletme giderlerini düşerek bulduğunuz tutarı yazın. Muhasebe kârı değil, kasaya giren net para esas alınır; amortisman gideri düşülmez.'],
    ['İyi bir geri ödeme süresi ne kadardır?', 'Sektöre ve yatırımın ömrüne göre değişir. Genel ilke, sürenin yatırımın ekonomik ömründen belirgin biçimde kısa olmasıdır. Ömrü beş yıl olan bir cihazın dört buçuk yılda kendini ödemesi zayıf bir sonuçtur.'],
    ['Basit ve iskontolu süre arasında hangisine bakmalıyım?', 'Faizlerin ve enflasyonun düşük olduğu, sürenin kısa olduğu durumlarda ikisi birbirine yakındır. Oranlar yüksekse ya da süre uzunsa iskontolu süre daha gerçekçidir ve karar için onu esas almak daha temkinlidir.'],
    ['"Geri dönmüyor" sonucu ne anlama geliyor?', 'Yazdığınız yılların toplam girişi yatırım tutarına ulaşmıyor demektir. İskontolu hesapta bu, girişlerin bugünkü değerinin yatırımı karşılamadığını gösterir. Araç ayrıca karşılanmayan tutarı da belirtir.'],
    ['Aylık girişlerle hesap yapabilir miyim?', 'Evet. Girişleri aylık yazarsanız sonuçtaki "yıl" ifadesini "ay" olarak okuyun; ilk satırdaki ondalıklı değer ay sayısıdır. Bu durumda iskonto oranını da aylık olarak girmeniz gerekir, yıl-ay karşılığı satırını ise dikkate almayın.'],
    ['Hurda değeri hesaba katılır mı?', 'Klasik geri ödeme süresi hesabında hurda değeri dikkate alınmaz, çünkü süre içinde ele geçmez. Varlığı belirli bir yılda satmayı planlıyorsanız satış bedelini o yılın girişine ekleyebilirsiniz.'],
    ['Girdiğim rakamlar kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yatırım ve nakit girişi bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ic-verim-orani-hesapla', 'net-bugunku-deger-hesapla', 'yatirim-getirisi-hesapla', 'kira-getirisi-hesapla', 'amortisman-hesapla'],
};
