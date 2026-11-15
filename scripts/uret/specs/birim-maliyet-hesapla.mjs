export default {
  slug: 'birim-maliyet-hesapla',
  title: 'Birim Maliyet Hesaplama',
  h1Tail: 'ürün başına maliyet',
  pageTitle: 'Birim Maliyet Hesaplama – Ürün Başına Maliyet ve Satış Fiyatı',
  description: 'Hammadde, işçilik ve genel giderleri üretim miktarına bölerek birim maliyeti hesaplayın; fireyi ve istediğiniz kâr oranını ekleyip satış fiyatını görün.',
  card: 'Hammadde, işçilik ve genel giderlerden ürün başına maliyeti bulun; fire ve kâr oranıyla satış fiyatını hesaplayın.',
  category: 'finans',
  keywords: ['birim maliyet hesaplama', 'ürün maliyeti hesaplama', 'birim maliyet formülü', 'adet başı maliyet', 'üretim maliyeti hesaplama', 'maliyet hesabı nasıl yapılır', 'fireli maliyet hesaplama'],
  lead: 'Bir üretim partisinin hammadde, işçilik ve genel giderlerini yazın; araç toplam maliyeti satılabilir miktara bölerek <strong>bir birimin size kaça mal olduğunu</strong> bulur. Kâr oranı girerseniz KDV hariç satış fiyatını da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'hammadde', label: 'Hammadde ve malzeme gideri (TL)', type: 'number', placeholder: 'Örn. 50000' },
    { id: 'iscilik', label: 'Direkt işçilik gideri (TL)', type: 'number', placeholder: 'Örn. 20000', hint: 'Boş bırakılırsa 0 kabul edilir.' },
    { id: 'genel', label: 'Genel üretim giderleri (TL)', type: 'number', placeholder: 'Örn. 30000', hint: 'Kira, enerji, amortisman, ambalaj vb. Boş = 0.' },
    { id: 'miktar', label: 'Üretilen miktar', type: 'number', placeholder: 'Örn. 1000', hint: 'Adet, kilogram, litre ya da metre olabilir.' },
    { id: 'fire', label: 'Fire / satılamayan miktar', type: 'number', placeholder: 'Örn. 50', hint: 'İsteğe bağlı. Boş = 0.' },
    { id: 'kar', label: 'Maliyet üzerine kâr oranı (%)', type: 'number', placeholder: 'Örn. 25', hint: 'İsteğe bağlı; satış fiyatı için.' },
  ],
  compute(v, h) {
    const ham = h.nonneg(v.hammadde, 'Hammadde ve malzeme gideri');
    const isc = h.opt(v.iscilik, 0, 'Direkt işçilik gideri');
    const gen = h.opt(v.genel, 0, 'Genel üretim giderleri');
    if (isc < 0) h.err('"Direkt işçilik gideri" negatif olamaz.');
    if (gen < 0) h.err('"Genel üretim giderleri" negatif olamaz.');
    const miktar = h.pos(v.miktar, 'Üretilen miktar');
    const fire = h.opt(v.fire, 0, 'Fire / satılamayan miktar');
    if (fire < 0) h.err('"Fire / satılamayan miktar" negatif olamaz.');
    if (fire >= miktar) h.err('Fire miktarı üretilen miktardan küçük olmalı; satılabilir en az bir miktar kalmalıdır.');
    const toplam = ham + isc + gen;
    if (!(toplam > 0)) h.err('Toplam maliyet sıfır olamaz; en az bir gider kalemine tutar yazın.');
    const saglam = miktar - fire;
    const birim = toplam / saglam;
    const firesiz = toplam / miktar;
    const rows = [
      ['Birim maliyet', h.para(birim)],
      ['Toplam maliyet', h.para(toplam)],
      ['Satılabilir miktar', h.fmt(saglam, 3)],
      ['Birim hammadde payı', h.para(ham / saglam)],
      ['Birim işçilik payı', h.para(isc / saglam)],
      ['Birim genel gider payı', h.para(gen / saglam)],
    ];
    if (fire > 0) {
      rows.push(['Fire oranı', '%' + h.fmt((fire / miktar) * 100, 2)]);
      rows.push(['Firenin birim maliyete etkisi', h.para(birim - firesiz)]);
    }
    if (String(v.kar ?? '').trim() !== '') {
      const kar = h.nonneg(v.kar, 'Maliyet üzerine kâr oranı');
      const satis = birim * (1 + kar / 100);
      rows.push(['Satış fiyatı (KDV hariç)', h.para(satis)]);
      rows.push(['Birim kâr', h.para(satis - birim)]);
      rows.push(['Satış fiyatı üzerinden kâr marjı', '%' + h.fmt(((satis - birim) / satis) * 100, 2)]);
    }
    return {
      rows,
      note: 'Birim maliyet = toplam maliyet ÷ satılabilir miktar. Tutarlar KDV hariç girilmelidir; sonuç bilgilendirme amaçlıdır.',
    };
  },
  cases: [
    { in: { hammadde: '50000', iscilik: '20000', genel: '30000', miktar: '1000' }, out: { 'Birim maliyet': '100,00 TL', 'Toplam maliyet': '100.000,00 TL', 'Satılabilir miktar': '1.000', 'Birim hammadde payı': '50,00 TL', 'Birim işçilik payı': '20,00 TL', 'Birim genel gider payı': '30,00 TL' } },
    { in: { hammadde: '50000', iscilik: '20000', genel: '30000', miktar: '1000', fire: '50', kar: '25' }, out: { 'Birim maliyet': '105,26 TL', 'Satılabilir miktar': '950', 'Fire oranı': '%5', 'Firenin birim maliyete etkisi': '5,26 TL', 'Satış fiyatı (KDV hariç)': '131,58 TL', 'Birim kâr': '26,32 TL', 'Satış fiyatı üzerinden kâr marjı': '%20' } },
    { in: { hammadde: '7500', iscilik: '2500', genel: '5000', miktar: '600', kar: '40' }, out: { 'Birim maliyet': '25,00 TL', 'Satış fiyatı (KDV hariç)': '35,00 TL', 'Birim kâr': '10,00 TL', 'Satış fiyatı üzerinden kâr marjı': '%28,57' } },
    { in: { hammadde: '1000', miktar: '3' }, out: { 'Birim maliyet': '333,33 TL', 'Toplam maliyet': '1.000,00 TL', 'Birim işçilik payı': '0,00 TL' } },
    { in: { hammadde: '12000', iscilik: '', genel: '', miktar: '400', fire: '0' }, out: { 'Birim maliyet': '30,00 TL' } },
    { in: { hammadde: '1.250,50', iscilik: '749,50', genel: '0', miktar: '80', fire: '0', kar: '100' }, out: { 'Birim maliyet': '25,00 TL', 'Satış fiyatı (KDV hariç)': '50,00 TL', 'Satış fiyatı üzerinden kâr marjı': '%50' } },
    { in: { hammadde: '50000', iscilik: '20000', genel: '30000', miktar: '0' }, error: true },
    { in: { hammadde: '50000', miktar: '100', fire: '100' }, error: true },
    { in: { hammadde: '0', miktar: '100' }, error: true },
  ],
  howto: [
    'Hesaplamak istediğiniz dönem ya da üretim partisi için harcanan hammadde ve malzeme tutarını KDV hariç olarak yazın.',
    'O partide doğrudan üretimde çalışanların ücret giderini ve partiye düşen genel üretim giderlerini (kira, elektrik, amortisman, ambalaj gibi) ilgili alanlara girin; olmayan kalemleri boş bırakabilirsiniz.',
    'Üretilen toplam miktarı ve varsa fire, bozuk ya da satılamayan miktarı yazın.',
    'Satış fiyatını da görmek isterseniz maliyetin üzerine eklemek istediğiniz kâr oranını yüzde olarak girin ve "Hesapla" düğmesine basın.',
    'Sonuçtaki kalem payları, birim maliyetin ne kadarının hammaddeden, ne kadarının işçilik ve genel giderlerden geldiğini gösterir; maliyeti düşürmek için önce en büyük paya odaklanın.',
  ],
  sections: [
    { h: 'Birim maliyet nedir, neden önemlidir?', p: [
      'Birim maliyet, tek bir ürünü ya da bir ölçü birimi mamulü (bir kilogram, bir litre, bir metre) üretmenin işletmeye toplam yüküdür. Fiyatlandırmanın, kârlılık analizinin ve "bu siparişi alayım mı" kararının temelinde bu rakam vardır. Birim maliyetini bilmeden fiyat koyan bir işletme, çok satış yaptığı hâlde zarar ettiğini ancak dönem sonunda fark eder.',
      'Bir atölye, pastane, tekstil imalathanesi ya da evden üretim yapan bir girişimci için mantık aynıdır: o ürün için yapılan tüm harcamalar toplanır ve satılabilir durumdaki ürün sayısına bölünür.',
    ] },
    { h: 'Birim maliyet formülü', p: [
      'Üretim maliyeti üç ana kalemden oluşur: <strong>direkt ilk madde ve malzeme</strong> (ürünün içine giren hammadde), <strong>direkt işçilik</strong> (ürünü fiilen üretenlerin ücreti) ve <strong>genel üretim giderleri</strong> (kira, enerji, makine amortismanı, bakım, yardımcı malzeme gibi ürüne doğrudan yüklenemeyen giderler). Formül şöyledir:',
      '<strong>Birim maliyet = (hammadde + işçilik + genel üretim giderleri) ÷ satılabilir miktar</strong>',
      'Satılabilir miktar, üretilen miktardan fire düşüldükten sonra kalan sağlam ürün miktarıdır. Fire payı, sağlam ürünlerin maliyetine dağıtılır; çünkü bozulan ürünün hammaddesi ve emeği de harcanmıştır ve bu bedeli satılan ürünler karşılamak zorundadır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir mobilya atölyesi bir ayda 1.000 adet sehpa üretmiş olsun. Hammadde gideri 50.000 TL, direkt işçilik 20.000 TL, genel üretim giderleri 30.000 TL\'dir. Toplam maliyet 100.000 TL, birim maliyet 100.000 ÷ 1.000 = <strong>100,00 TL</strong> olur. Bunun 50 TL\'si hammadde, 20 TL\'si işçilik, 30 TL\'si genel gider payıdır.',
      'Şimdi 1.000 sehpanın 50\'sinin kalite kontrolden geçemediğini varsayalım. Satılabilir miktar 950\'ye düşer ve birim maliyet 100.000 ÷ 950 = <strong>105,26 TL</strong> olur. %5\'lik fire, her sehpanın maliyetini 5,26 TL artırmıştır. Atölye maliyetin üzerine %25 kâr koyarsa KDV hariç satış fiyatı 105,26 × 1,25 = <strong>131,58 TL</strong>, birim kâr 26,32 TL olur.',
    ] },
    { h: 'Kâr oranı ile kâr marjı aynı şey değildir', p: [
      'Araçtaki kâr oranı maliyetin üzerine eklenen orandır (İngilizce kaynaklarda "markup"). Kâr marjı ise kârın satış fiyatına oranıdır. Maliyete %25 eklediğinizde satış fiyatı üzerinden marjınız %25 değil %20 olur; maliyete %100 eklemek, yani fiyatı ikiye katlamak, %50 marj demektir. Araç iki değeri de gösterir ki pazarlık sırasında "en fazla yüzde kaç indirim yapabilirim" sorusuna doğru cevap verebilesiniz: indirim, kâr marjını aşarsa maliyetin altına inersiniz.',
    ] },
    { h: 'Sabit ve değişken maliyet ayrımı', p: [
      'Hammadde gibi giderler üretim miktarıyla birlikte artar; bunlara değişken maliyet denir. Kira ya da makine amortismanı gibi giderler ise üretim az da olsa çok da olsa aynı kalır; bunlar sabit maliyettir. Bu ayrımın pratik sonucu şudur: üretim miktarı arttıkça sabit giderler daha fazla ürüne bölünür ve birim maliyet düşer. Aylık 30.000 TL genel gideri olan bir atölye 1.000 adet üretirse ürün başına 30 TL, 1.500 adet üretirse 20 TL genel gider payı düşer.',
      'Bu yüzden birim maliyet sabit bir sayı değildir; üretim hacmine göre yeniden hesaplanmalıdır. Düşük sezonda hesaplanan maliyetle yüksek sezonda fiyat verirseniz gereğinden pahalı, tersini yaparsanız zararına satış yapabilirsiniz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Kendi emeğini saymamak:</strong> Küçük işletme sahipleri kendi çalışma saatlerini maliyete eklemeyi unutur; ürün kârlı görünür ama emeğin karşılığı alınmamıştır.',
      '<strong>KDV dahil tutar girmek:</strong> İndirim konusu yapılabilen KDV maliyet unsuru değildir; KDV mükellefi işletmeler giderleri KDV hariç yazmalıdır.',
      '<strong>Ambalaj, etiket ve nakliyeyi atlamak:</strong> Küçük görünen bu kalemler düşük fiyatlı ürünlerde maliyetin önemli bir bölümünü oluşturabilir.',
      '<strong>Fireyi yok saymak:</strong> Gıda, tekstil ve döküm gibi sektörlerde fire kaçınılmazdır; hesaba katılmazsa gerçek maliyet her zaman hesaplanandan yüksek çıkar.',
      '<strong>Pazarlama ve yönetim giderlerini karıştırmak:</strong> Bunlar üretim maliyeti değil dönem gideridir; fiyatlandırmada dikkate alınmalı, ancak üretim maliyetiyle aynı kefeye konmamalıdır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu araç tek ürünlü bir parti için tam maliyet yöntemiyle basit bir hesap yapar. Aynı tesiste birden çok ürün üretiliyorsa genel giderlerin ürünlere hangi anahtara göre (makine saati, işçilik saati, üretim miktarı) dağıtılacağı ayrı bir çalışma gerektirir. Yarı mamul stokları, ortak ve yan ürünler, standart maliyet sapmaları gibi konular kapsam dışıdır. Sonuç bilgilendirme amaçlıdır; vergi beyanı, stok değerleme ve resmî maliyet muhasebesi için mali müşavirinize danışın.',
    ] },
  ],
  faq: [
    ['Birim maliyet nasıl hesaplanır?', 'Bir dönemde ya da partide yapılan hammadde, işçilik ve genel üretim giderleri toplanır, satılabilir ürün miktarına bölünür. 100.000 TL toplam maliyetle 1.000 adet üretildiyse birim maliyet 100 TL\'dir.'],
    ['Fire birim maliyeti nasıl etkiler?', 'Fire, toplam maliyeti değiştirmez ama maliyetin bölündüğü miktarı azaltır. 1.000 adetlik üretimde 50 adet fire varsa maliyet 950 adede bölünür ve birim maliyet yaklaşık %5,26 artar.'],
    ['Kâr oranını girince satış fiyatı nasıl bulunuyor?', 'Birim maliyet, (1 + kâr oranı ÷ 100) ile çarpılır. 25 TL maliyete %40 kâr eklendiğinde satış fiyatı 35 TL, birim kâr 10 TL olur. Bu fiyat KDV hariçtir; KDV ayrıca eklenir.'],
    ['Genel üretim giderlerine neler yazılır?', 'Üretim yerinin kirası, elektrik, su, doğal gaz, makine bakım ve amortismanı, üretimde kullanılan sarf malzemeleri, ustabaşı ve depo personeli ücretleri gibi ürüne doğrudan bağlanamayan üretim giderleri yazılır.'],
    ['Hizmet işletmeleri bu aracı kullanabilir mi?', 'Evet. "Üretilen miktar" alanına verilen hizmet sayısını (ör. yapılan servis, hazırlanan porsiyon, teslim edilen proje) yazarak hizmet başına maliyeti bulabilirsiniz; hammadde alanına hizmette tüketilen malzemeyi girin.'],
    ['Üretim miktarı artınca birim maliyet neden düşer?', 'Kira ve amortisman gibi sabit giderler üretim miktarından bağımsızdır. Miktar arttıkça bu giderler daha çok ürüne paylaştırılır ve ürün başına düşen sabit gider payı azalır.'],
    ['Miktarı kilogram ya da litre olarak girebilir miyim?', 'Evet. Miktar alanı ondalıklı değer kabul eder; 250,5 kilogram ya da 1.200 litre yazabilirsiniz. Sonuç, yazdığınız ölçü birimi başına maliyet olarak okunur.'],
    ['Maliyet bilgilerim bir yere kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz tutarlar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kar-ekleme-orani-hesapla', 'kar-zarar-hesapla', 'fire-orani-hesapla', 'katki-payi-hesapla', 'amortisman-hesapla'],
};
