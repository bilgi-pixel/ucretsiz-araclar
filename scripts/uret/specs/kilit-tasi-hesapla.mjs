export default {
  slug: 'kilit-tasi-hesapla',
  title: 'Kilit Taşı (Parke Taşı) Hesaplama',
  h1Tail: 'adet, yatak kumu ve bordür',
  pageTitle: 'Kilit Taşı Hesaplama – Kaç Adet Parke Taşı ve Bordür Gerekir?',
  description: 'Döşenecek alanı ve taş ölçüsünü girin; gereken kilit taşı (parke taşı) adedini fire payıyla, yatak kumu hacmini ve bordür sayısını birlikte hesaplayın.',
  card: 'Alan ve taş ölçüsünden gereken kilit parke taşı adedini, yatak kumunu ve bordür sayısını fire payıyla bulun.',
  category: 'insaat',
  keywords: ['kilit taşı hesaplama', 'parke taşı hesaplama', '1 m2 kaç kilit taşı', 'kilit parke adet hesabı', 'bordür hesaplama', 'kilit taşı metrekare', 'parke taşı kaç adet'],
  lead: "Bahçe yolu, otopark ya da kaldırım için gereken <strong>kilit taşı (beton parke taşı) adedini</strong> hesaplayın. Araç metrekareye düşen taş sayısını, fire eklenmiş sipariş adedini, yatak kumu hacmini ve isterseniz bordür adedini de verir.",
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Alanın boyu (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'en', label: 'Alanın eni (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'tasBoy', label: 'Taş boyu (cm)', type: 'number', value: '20' },
    { id: 'tasEn', label: 'Taş eni (cm)', type: 'number', value: '10' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
    { id: 'kum', label: 'Yatak kumu kalınlığı (cm)', type: 'number', value: '4' },
    { id: 'bordur', label: 'Bordür döşenecek uzunluk (m)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Bordür istemiyorsanız boş bırakın.' },
    { id: 'bordurBoy', label: 'Bordür taşı boyu (cm)', type: 'number', value: '50' },
  ],
  compute(v, h) {
    const a = h.pos(v.boy, 'Alanın boyu');
    const b = h.pos(v.en, 'Alanın eni');
    const tb = h.pos(v.tasBoy, 'Taş boyu');
    const te = h.pos(v.tasEn, 'Taş eni');
    const f = h.nonneg(v.fire, 'Fire payı');
    const k = h.nonneg(v.kum, 'Yatak kumu kalınlığı');
    if (tb > 100 || te > 100) h.err('Taş ölçüleri santimetre olarak yazılmalı ve 100 cm\'yi geçmemeli.');
    const alan = a * b;
    const m2Adet = 10000 / (tb * te);
    const net = Math.ceil(alan * m2Adet - 1e-9);
    const siparis = Math.ceil(alan * m2Adet * (1 + f / 100) - 1e-9);
    const rows = [
      ['Gerekli taş (fire dahil)', h.fmt(siparis, 0) + ' adet'],
      ['Firesiz taş adedi', h.fmt(net, 0) + ' adet'],
      ['Alan', h.fmt(alan, 2) + ' m²'],
      ['Metrekareye düşen taş', h.fmt(m2Adet, 1) + ' adet/m²'],
      ['Yatak kumu', h.fmt(alan * k / 100, 2) + ' m³'],
    ];
    if (String(v.bordur ?? '').trim() !== '') {
      const L = h.pos(v.bordur, 'Bordür döşenecek uzunluk');
      const bb = h.pos(v.bordurBoy, 'Bordür taşı boyu');
      rows.push(['Bordür taşı', h.fmt(Math.ceil(L * 100 / bb - 1e-9), 0) + ' adet']);
    }
    return {
      rows,
      note: 'Adet, taşın dikdörtgen kabul edilen kaplama ölçüsüne göre hesaplanır. Dişli (kilitli) formlarda üreticinin verdiği m² adedini esas alın.',
    };
  },
  cases: [
    { in: { boy: '10', en: '5' }, out: { 'Gerekli taş (fire dahil)': '2.625 adet', 'Firesiz taş adedi': '2.500 adet', 'Alan': '50 m²', 'Metrekareye düşen taş': '50 adet/m²', 'Yatak kumu': '2 m³' } },
    { in: { boy: '8', en: '3', tasBoy: '20', tasEn: '20', fire: '10', kum: '5', bordur: '22', bordurBoy: '50' }, out: { 'Gerekli taş (fire dahil)': '660 adet', 'Firesiz taş adedi': '600 adet', 'Metrekareye düşen taş': '25 adet/m²', 'Yatak kumu': '1,2 m³', 'Bordür taşı': '44 adet' } },
    { in: { boy: '6', en: '4', tasBoy: '20', tasEn: '16,5', fire: '5', kum: '4' }, out: { 'Gerekli taş (fire dahil)': '764 adet', 'Firesiz taş adedi': '728 adet', 'Metrekareye düşen taş': '30,3 adet/m²', 'Yatak kumu': '0,96 m³' } },
    { in: { boy: '1', en: '1', tasBoy: '10', tasEn: '10', fire: '0', kum: '0' }, out: { 'Gerekli taş (fire dahil)': '100 adet', 'Firesiz taş adedi': '100 adet', 'Yatak kumu': '0 m³' } },
    { in: { boy: '15', en: '2', tasBoy: '30', tasEn: '30', fire: '8', kum: '3', bordur: '30,2', bordurBoy: '70' }, out: { 'Gerekli taş (fire dahil)': '360 adet', 'Firesiz taş adedi': '334 adet', 'Yatak kumu': '0,9 m³', 'Bordür taşı': '44 adet' } },
    { in: { boy: '25', en: '12', tasBoy: '20', tasEn: '10', fire: '3', kum: '4' }, out: { 'Gerekli taş (fire dahil)': '15.450 adet', 'Alan': '300 m²', 'Yatak kumu': '12 m³' } },
    { in: { boy: '10', en: '5', tasBoy: '0' }, error: true },
    { in: { boy: '', en: '5' }, error: true },
  ],
  howto: [
    "Taş döşenecek alanın boyunu ve enini metre olarak yazın. Bordürlerin kapladığı şeridi alandan düşmeniz sonucu biraz daha hassas yapar.",
    "Taşın üstten görünen boyunu ve enini santimetre olarak girin. En yaygın dikdörtgen parke taşı 20 × 10 cm ölçüsündedir ve bu değerler hazır gelir.",
    "Fire payını ve yatak kumu kalınlığını işinize göre düzenleyin. Bordür de alacaksanız bordür döşenecek toplam uzunluğu ve bordür taşının boyunu yazın.",
    "\"Hesapla\" düğmesine basın. Sipariş edilecek taş adedi, metrekareye düşen adet, kum hacmi ve bordür sayısı görünür.",
  ],
  sections: [
    { h: 'Kilit taşı adedi nasıl hesaplanır?', p: [
      "Hesabın temeli, bir metrekarenin tek bir taşın kapladığı alana bölünmesidir. Bir metrekare 10.000 cm² olduğundan <strong>metrekareye düşen taş = 10.000 ÷ (taş boyu × taş eni)</strong> olur. 20 × 10 cm ölçüsündeki taş 200 cm² yer kaplar; dolayısıyla bir metrekareye 10.000 ÷ 200 = 50 taş gider.",
      "Toplam ihtiyaç, alanın bu sayıyla çarpılmasıyla bulunur ve kesme kayıpları için fire eklenir: <strong>adet = alan × m² adedi × (1 + fire ÷ 100)</strong>. Sonuç her zaman yukarı yuvarlanır, çünkü yarım taş sipariş edilemez. Kilit taşları birbirine neredeyse boşluksuz dizildiği ve aradaki derz ince kumla doldurulduğu için derz genişliği ayrıca hesaba katılmaz.",
    ] },
    { h: 'Çözümlü örnek: 50 m² bahçe girişi', p: [
      "Boyu 10 m, eni 5 m olan bir araç girişi 20 × 10 cm dikdörtgen parke taşıyla kaplanacak olsun. Alan 50 m², metrekareye düşen taş 50 adettir; firesiz ihtiyaç 50 × 50 = 2.500 taştır. Yüzde 5 fireyle sipariş <strong>2.625 adet</strong> olur.",
      "Taşların altına 4 cm yatak kumu serilecekse 50 × 0,04 = <strong>2 m³</strong> kum gerekir. Alanın iki uzun kenarı ve bir kısa kenarı boyunca, toplam 25 m bordür döşenirse 50 cm boyundaki bordür taşlarından 25 ÷ 0,5 = 50 adet alınır.",
    ] },
    { h: 'Yaygın taş ölçüleri ve metrekare adetleri', p: [
      "Üreticiden üreticiye küçük farklar olsa da sık karşılaşılan ölçüler ve bunların dikdörtgen kabulüyle metrekare adetleri şöyledir:",
    ], ul: [
      "<strong>20 × 10 cm</strong> dikdörtgen parke: 50 adet/m²",
      "<strong>10 × 10 cm</strong> küp taş: 100 adet/m²",
      "<strong>20 × 20 cm</strong> kare taş: 25 adet/m²",
      "<strong>30 × 30 cm</strong> karo: yaklaşık 11,1 adet/m²",
      "<strong>40 × 40 cm</strong> karo: 6,25 adet/m²",
      "<strong>20 × 16,5 cm</strong> dış ölçülü dişli (kilitli) form: dikdörtgen kabulle 30,3 adet/m²; dişler iç içe geçtiği için gerçek adet daha yüksektir, üretici kataloğuna bakın",
    ] },
    { h: 'Fire payı ne kadar olmalı?', p: [
      "Fire, kenarlarda ve köşelerde kesilen taşlardan, nakliye ve indirme sırasında kırılanlardan oluşur. Düz dikdörtgen bir alanda ve kenara paralel düz dizimde yüzde 3–5 çoğunlukla yeterlidir. Balıksırtı ya da çapraz dizimde kenar kesimleri arttığından yüzde 8–10 almak daha güvenlidir. Kavisli kenarlar, rögar kapakları ve ağaç dipleri gibi çok sayıda kesim gerektiren ayrıntılar varsa payı daha da artırın.",
      "Aynı renkten sonradan taş bulmak zor olabilir; üretim partileri arasında ton farkı görülebilir. Bu yüzden birkaç yedek taşı tamir için saklamak yaygın bir alışkanlıktır.",
    ] },
    { h: 'Yatak kumu, temel ve bordür', p: [
      "Kilit taşı doğrudan toprağa değil, sıkıştırılmış bir temel tabakası üzerine serilen ince kum yatağına oturtulur. Yatak kumu genellikle 3–5 cm kalınlığındadır; daha kalın serildiğinde taşlar zamanla oturup dalgalanabilir. Araç bu tabakanın hacmini alan × kalınlık olarak verir. Altındaki temel tabakası (stabilize ya da kırma taş) ayrı bir kalemdir ve kum çakıl aracıyla hesaplanabilir.",
      "Bordür, taşların yanlara doğru açılmasını engelleyen kenar tutucudur ve kilit taşı kaplamanın uzun ömürlü olması için gereklidir. Bordür adedi, bordür döşenecek toplam uzunluğun tek bir bordür taşının boyuna bölünüp yukarı yuvarlanmasıyla bulunur. Piyasada 50, 70 ve 100 cm boyunda bordür taşları yaygındır.",
    ] },
    { h: 'Sınırlar ve uyarılar', p: [
      "Araç taşı dikdörtgen kabul eder. Dişli, altıgen, yonca ya da kemik biçimli formlarda metrekare adedi taşın dış ölçülerinden hesaplanamaz; bu ürünlerde üreticinin beyan ettiği adet/m² değerini kullanın ya da siparişi doğrudan metrekare üzerinden verin. Birçok üretici zaten metrekare ile satış yapar; bu durumda \"Alan\" satırına fire payını ekleyerek sipariş verebilirsiniz.",
      "Taş kalınlığı (6, 8 ya da 10 cm) adedi değiştirmez ama taşıyacağı yükü belirler. Araç trafiği olan yerlerde taş kalınlığı ve temel tabakası için bir uzmana danışın; sonuçlar yalnızca malzeme keşfi amaçlıdır.",
    ] },
  ],
  faq: [
    ['1 metrekareye kaç kilit taşı gider?', "Taşın ölçüsüne bağlıdır. 20 × 10 cm dikdörtgen parke taşından metrekareye 50 adet, 10 × 10 cm küp taştan 100 adet, 20 × 20 cm taştan 25 adet gider. Dişli formlarda üreticinin verdiği adet geçerlidir."],
    ['100 metrekare için kaç parke taşı almalıyım?', "20 × 10 cm taş için firesiz 5.000 adet gerekir. Yüzde 5 fireyle 5.250, balıksırtı dizimde yüzde 10 fireyle 5.500 adet sipariş etmek uygun olur."],
    ['Derz boşluğunu hesaba katmak gerekir mi?', "Kilit taşlarında derz yalnızca birkaç milimetredir ve taşların anma ölçüsüne çoğunlukla dahildir. Bu yüzden fayanstaki gibi ayrı bir derz hesabı yapılmaz; küçük farklar fire payının içinde kalır."],
    ['Yatak kumu için ne kadar kum gerekir?', "Alanı kum kalınlığıyla çarpın. 4 cm kalınlıkta her 25 m² için 1 m³ kum gerekir. Derzleri doldurmak için süpürülen ince kum bunun yanında küçük bir miktardır."],
    ['Bordür adedini nasıl bulurum?', "Bordür döşenecek kenarların toplam uzunluğunu bordür taşının boyuna bölün. 30 m kenar için 50 cm'lik bordürden 60 adet, 70 cm'lik bordürden 43 adet gerekir. Araç bu hesabı sizin için yapar ve yukarı yuvarlar."],
    ['Kilit taşı ile parke taşı aynı şey mi?', "Gündelik kullanımda ikisi de zemine kuru olarak dizilen beton kaplama taşlarını anlatır. \"Kilit taşı\" adı, kenarları birbirine geçen dişli formlardan gelir; düz dikdörtgen olanlara daha çok parke taşı denir."],
    ['Alanım dikdörtgen değilse ne yapmalıyım?', "Alanı dikdörtgen parçalara bölüp her birini ayrı hesaplayın ve sonuçları toplayın. Toplam metrekareyi biliyorsanız boy alanına bu değeri, en alanına 1 yazmanız da yeterlidir."],
    ['Girdiğim ölçüler bir yere kaydediliyor mu?', "Hayır. Hesaplama tarayıcınızda yapılır; ölçüleriniz sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['kum-cakil-hesapla', 'asfalt-hesapla', 'hafriyat-hesapla', 'cim-tohumu-hesapla', 'derz-dolgu-hesapla'],
};
