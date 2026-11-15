export default {
  slug: 'kar-ekleme-orani-hesapla',
  title: 'Kâr Ekleme Oranı (Markup) Hesaplama',
  h1Tail: 'maliyet üzerine kâr',
  pageTitle: 'Kâr Ekleme Oranı (Markup) Hesaplama – Maliyetten Satış Fiyatı',
  description: 'Maliyet ve satış fiyatından kâr ekleme oranını (markup) bulun; ya da maliyete istediğiniz oranı ekleyerek satış fiyatını ve karşılık gelen kâr marjını hesaplayın.',
  card: 'Maliyet, satış fiyatı ve kâr ekleme oranından ikisini yazın; üçüncüsünü, kâr tutarını ve kâr marjını bulun.',
  category: 'finans',
  keywords: ['kâr ekleme oranı hesaplama', 'markup hesaplama', 'maliyet üzerine kâr ekleme', 'satış fiyatı hesaplama', 'markup marj farkı', 'maliyet artı fiyatlandırma', 'yüzde kâr ekleme'],
  lead: `Kâr ekleme oranı (markup), maliyetin üzerine yüzde kaç kâr konduğunu gösterir. Maliyet, satış fiyatı ve oran üçlüsünden ikisini yazın; araç eksik olanı, <strong>kâr tutarını</strong> ve aynı satışın kâr marjı karşılığını hesaplasın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplanacak?', type: 'select', wide: true, options: [['oran', 'Kâr ekleme oranı (maliyet ve satış fiyatı biliniyor)'], ['satis', 'Satış fiyatı (maliyet ve oran biliniyor)'], ['maliyet', 'Maliyet (satış fiyatı ve oran biliniyor)']] },
    { id: 'maliyet', label: 'Maliyet', type: 'number', placeholder: 'Örn. 100' },
    { id: 'satis', label: 'Satış fiyatı', type: 'number', placeholder: 'Örn. 150' },
    { id: 'oran', label: 'Kâr ekleme oranı (%)', type: 'number', placeholder: 'Örn. 50' },
  ],
  compute(v, h) {
    const mod = v.mod || 'oran';
    let maliyet, satis, oran;
    if (mod === 'satis') {
      maliyet = h.pos(v.maliyet, 'Maliyet');
      oran = h.num(v.oran, 'Kâr ekleme oranı');
      if (oran < -100) h.err('Kâr ekleme oranı −%100\'den küçük olamaz; satış fiyatı sıfırın altına düşer.');
      satis = maliyet * (1 + oran / 100);
    } else if (mod === 'maliyet') {
      satis = h.pos(v.satis, 'Satış fiyatı');
      oran = h.num(v.oran, 'Kâr ekleme oranı');
      if (oran <= -100) h.err('Maliyeti bulmak için kâr ekleme oranı −%100\'den büyük olmalı.');
      maliyet = satis / (1 + oran / 100);
    } else {
      maliyet = h.pos(v.maliyet, 'Maliyet');
      satis = h.nonneg(v.satis, 'Satış fiyatı');
      oran = ((satis - maliyet) / maliyet) * 100;
    }
    const kar = satis - maliyet;
    const yuzde = (x) => (x < -5e-7 ? '−' : '') + '%' + h.fmt(Math.abs(x), 2);
    const sOran = ['Kâr ekleme oranı', yuzde(oran)];
    const sSatis = ['Satış fiyatı', h.para(satis)];
    const sMaliyet = ['Maliyet', h.para(maliyet)];
    const ilk = mod === 'satis' ? [sSatis, sOran, sMaliyet] : mod === 'maliyet' ? [sMaliyet, sOran, sSatis] : [sOran, sMaliyet, sSatis];
    return {
      rows: [
        ...ilk,
        [kar < -0.005 ? 'Zarar tutarı' : 'Kâr tutarı', h.para(Math.abs(kar))],
        ['Kâr marjı (satışa göre)', satis > 0 ? yuzde((kar / satis) * 100) : '—'],
        ['Fiyat çarpanı', maliyet > 0 ? h.fmt(satis / maliyet, 4) : '—'],
      ],
      note: 'Kâr ekleme oranı kârı maliyete, kâr marjı ise satış fiyatına böler. Maliyet ve satış fiyatını aynı esasla (ikisi de KDV hariç) yazın.',
    };
  },
  cases: [
    { in: { mod: 'oran', maliyet: '100', satis: '150' }, out: { 'Kâr ekleme oranı': '%50', 'Kâr tutarı': '50,00 TL', 'Kâr marjı (satışa göre)': '%33,33', 'Fiyat çarpanı': '1,5' } },
    { in: { mod: 'satis', maliyet: '80', oran: '25' }, out: { 'Satış fiyatı': '100,00 TL', 'Kâr tutarı': '20,00 TL', 'Kâr marjı (satışa göre)': '%20' } },
    { in: { mod: 'maliyet', satis: '120', oran: '20' }, out: { 'Maliyet': '100,00 TL', 'Kâr tutarı': '20,00 TL', 'Kâr marjı (satışa göre)': '%16,67' } },
    { in: { mod: 'satis', maliyet: '100', oran: '100' }, out: { 'Satış fiyatı': '200,00 TL', 'Kâr marjı (satışa göre)': '%50', 'Fiyat çarpanı': '2' } },
    { in: { mod: 'oran', maliyet: '40', satis: '100' }, out: { 'Kâr ekleme oranı': '%150', 'Kâr marjı (satışa göre)': '%60' } },
    { in: { mod: 'oran', maliyet: '200', satis: '150' }, out: { 'Kâr ekleme oranı': '−%25', 'Zarar tutarı': '50,00 TL', 'Kâr marjı (satışa göre)': '−%33,33' } },
    { in: { mod: 'satis', maliyet: '37,50', oran: '60' }, out: { 'Satış fiyatı': '60,00 TL', 'Kâr tutarı': '22,50 TL', 'Kâr marjı (satışa göre)': '%37,5' } },
    { in: { mod: 'oran', maliyet: '0', satis: '150' }, error: true },
    { in: { mod: 'satis', maliyet: '80', oran: '' }, error: true },
    { in: { mod: 'maliyet', satis: '120', oran: '-100' }, error: true },
  ],
  howto: [
    `"Ne hesaplanacak?" listesinden bilinmeyeni seçin: kâr ekleme oranı, satış fiyatı ya da maliyet.`,
    `Seçiminize göre bilinen iki alanı doldurun. Hesaplanacak alanı boş bırakabilirsiniz.`,
    `"Hesapla" düğmesine basın. Aradığınız değer ilk satırda; kâr tutarı, kâr marjı karşılığı ve fiyat çarpanı altında görünür.`,
    `Fiyat listenizi hazırlarken fiyat çarpanını not edin; aynı oranı uygulayacağınız diğer ürünlerde maliyeti bu sayıyla çarpmanız yeterlidir.`,
  ],
  sections: [
    { h: 'Kâr ekleme oranı (markup) nedir?', p: [
      `Kâr ekleme oranı, bir ürünün maliyetinin üzerine satış fiyatını oluşturmak için eklenen kârın maliyete oranıdır. İngilizce karşılığı olan markup sözcüğüyle de anılır. Maliyeti 100 lira olan ürünü 150 liraya satan bir esnaf, maliyetin üzerine %50 kâr eklemiştir. Esnafın gündelik dilde "yüzde elli kârla satıyorum" derken kastettiği oran çoğunlukla budur.`,
      `Bu yöntemle fiyat belirlemeye maliyet artı fiyatlandırma denir. Perakendecilik, toptancılık, lokantacılık, imalat ve inşaat taahhüt işlerinde yaygındır, çünkü uygulaması kolaydır: maliyet bilinir, üzerine sektörde alışılmış oran eklenir ve fiyat çıkar.`,
    ] },
    { h: 'Formüller', ul: [
      `<strong>Kâr ekleme oranı</strong> = (Satış fiyatı − Maliyet) ÷ Maliyet × 100`,
      `<strong>Satış fiyatı</strong> = Maliyet × (1 + Kâr ekleme oranı ÷ 100)`,
      `<strong>Maliyet</strong> = Satış fiyatı ÷ (1 + Kâr ekleme oranı ÷ 100)`,
      `<strong>Fiyat çarpanı</strong> = Satış fiyatı ÷ Maliyet = 1 + Kâr ekleme oranı ÷ 100`,
    ] },
    { h: 'Markup ile kâr marjı aynı şey değildir', p: [
      `İki oran aynı kâr tutarını farklı paydalara böler. Kâr ekleme oranında payda <strong>maliyet</strong>, kâr marjında payda <strong>satış fiyatı</strong>dır. Satış fiyatı maliyetten büyük olduğu sürece marj her zaman kâr ekleme oranından küçük çıkar. 100 liralık maliyet ve 150 liralık satışta kâr 50 liradır; kâr ekleme oranı 50 ÷ 100 = %50, kâr marjı 50 ÷ 150 = %33,33'tür.`,
      `İki oran arasındaki dönüşüm şu eşitliklerle yapılır: <strong>Marj = Markup ÷ (1 + Markup)</strong> ve <strong>Markup = Marj ÷ (1 − Marj)</strong>; burada oranlar ondalık olarak yazılır. Örneğin %25 kâr ekleme oranı 0,25 ÷ 1,25 = %20 marja; %40 marj ise 0,40 ÷ 0,60 = %66,67 kâr ekleme oranına denk gelir.`,
      `Bu ayrım yalnızca kuramsal değildir. "%30 marj istiyorum" diyen bir işletme sahibi maliyete %30 eklerse hedefinin altında kalır: 100 liralık maliyete %30 eklenince fiyat 130 lira olur ve marj yalnızca %23,08'dir. %30 marj için maliyetin 0,70'e bölünmesi, yani fiyatın 142,86 lira olması gerekir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Satış fiyatını bulma:</strong> Bir kırtasiyeci tanesi 80 liraya aldığı çantaya %25 kâr eklemek istiyor. Satış fiyatı 80 × 1,25 = 100 liradır. Kâr 20 lira, kâr marjı 20 ÷ 100 = %20'dir.`,
      `<strong>Oranı bulma:</strong> Bir kafe, maliyeti 40 lira olan içeceği 100 liraya satıyor. Kâr 60 liradır; kâr ekleme oranı 60 ÷ 40 = %150, kâr marjı 60 ÷ 100 = %60'tır. Yiyecek içecek sektöründe ürün maliyetinin üzerine yüksek oranlar eklenmesinin nedeni kira, personel ve enerji gibi giderlerin bu farktan karşılanmasıdır.`,
      `<strong>Maliyeti bulma:</strong> Rakibinizin 120 liraya sattığı ürüne %20 kâr eklediğini tahmin ediyorsunuz. Maliyeti 120 ÷ 1,20 = 100 liradır. 120'den %20 düşüp 96 lira bulmak yanlış olur; çünkü oran satış fiyatına değil maliyete uygulanmıştı.`,
    ] },
    { h: 'Markup ile marj karşılıkları', ul: [
      `Kâr ekleme oranı <strong>%10</strong> → kâr marjı %9,09`,
      `Kâr ekleme oranı <strong>%20</strong> → kâr marjı %16,67`,
      `Kâr ekleme oranı <strong>%25</strong> → kâr marjı %20`,
      `Kâr ekleme oranı <strong>%33,33</strong> → kâr marjı %25`,
      `Kâr ekleme oranı <strong>%50</strong> → kâr marjı %33,33`,
      `Kâr ekleme oranı <strong>%100</strong> → kâr marjı %50`,
      `Kâr ekleme oranı <strong>%150</strong> → kâr marjı %60`,
      `Kâr ekleme oranı <strong>%300</strong> → kâr marjı %75`,
    ] },
    { h: 'Fiyat belirlerken dikkat edilecekler', p: [
      `Maliyeti eksik hesaplamak en yaygın hatadır. Yalnızca alış fiyatını değil, nakliye, gümrük, ambalaj, fire ve pazaryeri komisyonu gibi ürüne doğrudan bağlı giderleri de maliyete katın. Kira, personel ve fatura gibi genel giderler ürün maliyetinde yer almıyorsa, eklediğiniz oranın bunları da karşılayacak kadar yüksek olması gerekir; aksi hâlde her üründe kâr ediyor görünürken dönem sonunda zarar edebilirsiniz.`,
      `Kâr ekleme oranı sizin maliyetinize bakar, müşterinin ödemeye razı olduğu fiyata ya da rakiplerin fiyatına bakmaz. Bu nedenle bulduğunuz fiyatı piyasa koşullarıyla da sınayın. Maliyet ve satış fiyatını aynı esasla, tercihen ikisini de KDV hariç yazın. Sonuçlar bilgilendirme amaçlıdır; fiyatlandırma politikası ve vergi konularında mali müşavirinize danışın.`,
    ] },
  ],
  faq: [
    [`Kâr ekleme oranı nasıl hesaplanır?`, `Satış fiyatından maliyet çıkarılır, sonuç maliyete bölünüp 100 ile çarpılır. Maliyeti 100 lira, satış fiyatı 150 lira olan üründe oran (150 − 100) ÷ 100 × 100 = %50'dir.`],
    [`Markup ile kâr marjı arasındaki fark nedir?`, `Markup kârı maliyete, kâr marjı satış fiyatına böler. Aynı satışta markup her zaman marjdan büyüktür: %50 markup %33,33 marja, %100 markup %50 marja karşılık gelir.`],
    [`Maliyete yüzde kâr ekleyerek satış fiyatı nasıl bulunur?`, `Maliyeti (1 + oran ÷ 100) ile çarparsınız. 37,50 liralık maliyete %60 eklemek için 37,50 × 1,60 = 60 lira bulunur.`],
    [`%100 kâr ekleme oranı ne demek?`, `Ürünün maliyetinin iki katına satılması demektir. Kâr tutarı maliyete eşittir; kâr marjı ise %50'dir, çünkü satış fiyatının yarısı kârdır.`],
    [`Kâr ekleme oranı %100'ü geçebilir mi?`, `Evet. Kâr marjı %100'ü aşamaz, ama kâr ekleme oranının üst sınırı yoktur. Maliyeti 40 lira olan ürünü 100 liraya satmak %150, 160 liraya satmak %300 kâr ekleme oranıdır.`],
    [`Hedeflediğim kâr marjı için hangi oranı eklemeliyim?`, `Marjı (1 − marj) değerine bölün. %20 marj için 0,20 ÷ 0,80 = %25, %30 marj için 0,30 ÷ 0,70 = %42,86, %50 marj için %100 kâr ekleme oranı gerekir.`],
    [`Negatif kâr ekleme oranı ne anlama gelir?`, `Ürünün maliyetinin altında satıldığını gösterir. 200 liralık maliyetle 150 liraya satışta oran −%25'tir; araç bu durumda kâr yerine zarar tutarını yazar.`],
    [`Maliyet ve fiyat bilgilerim kaydediliyor mu?`, `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız maliyet, fiyat ve oranlar sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['kar-marji-hesapla', 'kar-zarar-hesapla', 'birim-maliyet-hesapla', 'iskonto-hesapla', 'kdv-hesapla', 'katki-payi-hesapla'],
};
