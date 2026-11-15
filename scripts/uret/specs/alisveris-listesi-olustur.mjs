export default {
  slug: 'alisveris-listesi-olustur',
  title: 'Alışveriş Listesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF market listesi',
  pageTitle: 'Alışveriş Listesi Oluştur – Yazdırılabilir Market Listesi PDF',
  description: 'Onay kutulu, kategorili ya da düz alışveriş listesini PDF olarak oluşturun. Kendi reyon başlıklarınızı ve sık aldığınız ürünleri ekleyin; A4 ya da A5.',
  card: 'Reyonlara göre bölünmüş ya da düz, onay kutulu alışveriş listesini kendi kalemlerinizle PDF olarak hazırlayın ve yazdırın.',
  category: 'planlama',
  pdf: true,
  keywords: ['alışveriş listesi', 'market listesi şablonu', 'alışveriş listesi pdf', 'yazdırılabilir market listesi', 'boş alışveriş listesi', 'kategorili alışveriş listesi', 'market alışveriş çizelgesi'],
  lead: 'Markete gitmeden önce doldurabileceğiniz, onay kutulu bir <strong>alışveriş listesi</strong> oluşturun. Listeyi reyonlara göre bölümlere ayırabilir ya da iki sütunlu düz bir liste seçebilir, her hafta aldığınız ürünleri sayfaya hazır yazdırabilirsiniz.',
  button: 'Listeyi oluştur',
  inputs: [
    { id: 'duzen', label: 'Liste düzeni', type: 'select', options: [['kategorili', 'Kategorili (reyonlara göre)'], ['duz', 'Düz liste (iki sütun)']] },
    { id: 'kategoriler', label: 'Kategori başlıkları (isteğe bağlı)', type: 'textarea', placeholder: 'Meyve ve sebze\nSüt ve kahvaltılık\nTemizlik', hint: 'Her satıra bir başlık; 2–10 başlık, en fazla 26 karakter. Boş bırakırsanız sekiz hazır başlık kullanılır. Yalnızca kategorili düzende geçerlidir.', wide: true },
    { id: 'kalemler', label: 'Hazır yazılacak ürünler (isteğe bağlı)', type: 'textarea', placeholder: 'Ekmek\nSüt\nYumurta', hint: 'Yalnızca düz listede kullanılır. Her satıra bir ürün; en fazla 40 ürün, en fazla 32 karakter.', wide: true },
    { id: 'kopya', label: 'Sayfa (kopya) sayısı', type: 'number', value: '1', hint: '1 ile 10 arasında; aynı listeden birkaç sayfa basmak için.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Haftalık Market Listesi', hint: 'En fazla 32 karakter.', wide: true },
  ],
  compute(v, h) {
    const kopya = h.posint(v.kopya, 'Sayfa sayısı');
    if (kopya > 10) h.err('Sayfa sayısı en fazla 10 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Alışveriş Listesi';
    if (baslik.length > 32) h.err('Sayfa başlığı en fazla 32 karakter olabilir.');
    const duz = v.duzen === 'duz';
    let kats = h.lines(v.kategoriler);
    const kal = h.lines(v.kalemler);
    if (!duz) {
      if (!kats.length) kats = ['Meyve ve sebze', 'Et, tavuk, balık', 'Süt ve kahvaltılık', 'Bakliyat ve kuru gıda', 'Ekmek ve unlu mamul', 'İçecek ve atıştırmalık', 'Temizlik ve kâğıt', 'Kişisel bakım ve diğer'];
      if (kats.length < 2 || kats.length > 10) h.err('Kategorili düzen için 2 ile 10 arasında başlık yazın ya da alanı boş bırakın.');
      if (kats.some((s) => s.length > 26)) h.err('Kategori başlıkları en fazla 26 karakter olabilir; uzun başlığı kısaltın.');
      if (kal.length) h.err('Hazır ürünler yalnızca düz listede yazdırılır. Düzeni "Düz liste" yapın ya da ürün alanını boşaltın.');
    } else {
      if (kal.length > 40) h.err('En fazla 40 hazır ürün yazabilirsiniz; kalanını listeye elle ekleyin.');
      if (kal.some((s) => s.length > 32)) h.err('Ürün adları en fazla 32 karakter olabilir; uzun satırı kısaltın.');
    }
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const rh = a5 ? 6.8 : 8, kare = a5 ? 3 : 3.6, pt = a5 ? 8.5 : 10, ara = a5 ? 3 : 4;
    const ops = [];
    // Başlık ve tarih alanı
    ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
    ops.push(['yazi', 'Tarih', W - m - (a5 ? 36 : 44), m + 7, pt, { ton: 0.3 }]);
    ops.push(['cizgi', W - m - (a5 ? 26 : 32), m + 7.4, W - m, m + 7.4, { kalinlik: 0.25, ton: 0.5 }]);
    ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    const ust = m + 15, altBant = H - m - 10, alt = altBant - 4;
    // Onay kutulu satır
    const satir = (x, y, w, metin) => {
      ops.push(['kutu', x, y + (rh - kare) / 2, kare, kare, { cizgi: 0.4 }]);
      ops.push(['cizgi', x + kare + 2, y + rh - 1.2, x + w, y + rh - 1.2, { kalinlik: 0.2, ton: 0.75 }]);
      if (metin) ops.push(['yazi', metin, x + kare + 3, y + rh - 2.2, pt]);
    };
    let toplam = 0;
    if (duz) {
      const n = Math.floor((alt - ust) / rh), cw = (W - 2 * m - 6) / 2;
      for (let c = 0; c < 2; c++) for (let r = 0; r < n; r++) satir(m + c * (cw + 6), ust + r * rh, cw, kal[c * n + r]);
      ops.push(['cizgi', W / 2, ust, W / 2, ust + n * rh, { kalinlik: 0.2, ton: 0.85, kesik: true }]);
      toplam = n * 2;
    } else {
      const sira = Math.ceil(kats.length / 2), bh = (alt - ust - (sira - 1) * ara) / sira, hh = a5 ? 6 : 7;
      const bw = (W - 2 * m - ara) / 2, n = Math.floor((bh - hh - 1) / rh);
      kats.forEach((ad, i) => {
        const tek = i === kats.length - 1 && kats.length % 2 === 1; // son tek kutu tüm genişliğe yayılır
        const x = m + (i % 2) * (bw + ara), y = ust + Math.floor(i / 2) * (bh + ara), w = tek ? W - 2 * m : bw;
        ops.push(['kutu', x, y, w, bh, { cizgi: 0.5 }]);
        ops.push(['kutu', x, y, w, hh, { dolgu: 0.88, cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + 2.5, y + hh - 2, pt, { kalin: true }]);
        const sutun = tek ? 2 : 1, sw = (w - 5 - (sutun - 1) * ara) / sutun;
        for (let c = 0; c < sutun; c++) for (let r = 0; r < n; r++) satir(x + 2.5 + c * (sw + ara), y + hh + 0.5 + r * rh, sw, '');
        toplam += n * sutun;
      });
    }
    // Alt bant: bütçe ve toplam
    const yb = altBant + 7, yari = (W - 2 * m) / 2;
    ops.push(['cizgi', m, altBant, W - m, altBant, { kalinlik: 0.4, ton: 0.4 }]);
    ops.push(['yazi', 'Ayrılan bütçe', m, yb, pt, { kalin: true }]);
    ops.push(['cizgi', m + (a5 ? 23 : 28), yb + 0.4, m + yari - 4, yb + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
    ops.push(['yazi', 'Ödenen toplam', m + yari + 2, yb, pt, { kalin: true }]);
    ops.push(['cizgi', m + yari + (a5 ? 27 : 32), yb + 0.4, W - m, yb + 0.4, { kalinlik: 0.25, ton: 0.5 }]);
    const sayfalar = [];
    for (let i = 0; i < kopya; i++) sayfalar.push(ops.slice());
    return {
      rows: [
        ['Sayfa sayısı', `${kopya} sayfa`],
        ['Düzen', duz ? 'Düz liste (iki sütun)' : `Kategorili (${kats.length} bölüm)`],
        ['Yazma satırı', `sayfa başına ${toplam} satır`],
        ['Hazır yazılan ürün', duz && kal.length ? `${kal.length} ürün` : 'yok'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin; onay kutuları ve satır aralıkları tasarlandığı ölçüde basılır.',
      pdf: { ad: 'alisveris-listesi-olustur', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: {}, out: { 'Sayfa sayısı': '1 sayfa', 'Düzen': 'Kategorili (8 bölüm)', 'Yazma satırı': 'sayfa başına 48 satır', 'Hazır yazılan ürün': 'yok', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { duzen: 'duz', kalemler: 'Ekmek\nSüt\nYumurta\nPeynir\nZeytin', kopya: '2' }, out: { 'Sayfa sayısı': '2 sayfa', 'Düzen': 'Düz liste (iki sütun)', 'Yazma satırı': 'sayfa başına 60 satır', 'Hazır yazılan ürün': '5 ürün' }, pdfSayfa: 2 },
    { in: { duzen: 'duz', boyut: 'a5' }, out: { 'Yazma satırı': 'sayfa başına 46 satır', 'Hazır yazılan ürün': 'yok', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { kategoriler: 'Manav\nKasap\nMarket', baslik: 'Pazar Listesi' }, out: { 'Düzen': 'Kategorili (3 bölüm)', 'Yazma satırı': 'sayfa başına 56 satır' }, pdfSayfa: 1 },
    { in: { boyut: 'a5', kopya: '10' }, out: { 'Sayfa sayısı': '10 sayfa', 'Düzen': 'Kategorili (8 bölüm)', 'Yazma satırı': 'sayfa başına 32 satır' }, pdfSayfa: 10 },
    { in: { kategoriler: 'Manav\nKasap\nFırın\nŞarküteri\nKuruyemiş\nBaharat\nTemizlik', kopya: '1' }, out: { 'Düzen': 'Kategorili (7 bölüm)', 'Yazma satırı': 'sayfa başına 48 satır' }, pdfSayfa: 1 },
    { in: { duzen: 'kategorili', kalemler: 'Ekmek\nSüt' }, error: true },
    { in: { kategoriler: 'Yalnızca tek başlık' }, error: true },
    { in: { duzen: 'duz', kopya: '11' }, error: true },
    { in: { duzen: 'duz', kalemler: 'Bu ürün adı otuz iki karakterden epeyce daha uzun yazılmış bir satırdır' }, error: true },
  ],
  howto: [
    '"Liste düzeni" seçeneğinden kategorili ya da düz listeyi seçin. Kategorili düzen sayfayı reyon kutularına böler; düz liste iki sütun hâlinde alt alta onay kutulu satırlar verir.',
    'Kategorili düzende kendi başlıklarınızı kullanmak isterseniz "Kategori başlıkları" alanına her satıra bir başlık yazın. Alanı boş bırakırsanız sekiz hazır başlık basılır.',
    'Düz listede her alışverişte aldığınız ürünleri "Hazır yazılacak ürünler" alanına satır satır ekleyin; bunlar listenin ilk satırlarına basılır, kalan satırlar boş kalır.',
    'Kopya sayısını ve kâğıt boyutunu seçin; isterseniz sayfaya "Bayram Alışverişi" gibi bir başlık verin.',
    '"Listeyi oluştur" düğmesine basıp önizlemeyi kontrol edin, "PDF indir" ile dosyayı kaydedin ve %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Sayfanın üstünde başlık ve alışveriş gününü yazabileceğiniz bir tarih çizgisi bulunur. Gövde, seçtiğiniz düzene göre değişir. <strong>Kategorili düzende</strong> sayfa iki sütun hâlinde kutulara bölünür; her kutunun gri bir başlık şeridi ve altında onay kutulu yazma satırları vardır. Başlık sayısı tekse son kutu sayfanın tüm genişliğine yayılır ve içinde iki sütun satır yer alır, böylece kâğıtta boş bölge kalmaz.',
      '<strong>Düz listede</strong> sayfa ortadan kesikli bir çizgiyle ikiye ayrılır ve her yarıda alt alta onay kutulu satırlar sıralanır. A4 kâğıtta sayfa başına 60, A5 kâğıtta 46 satır bulunur. Hazır ürün yazdıysanız bunlar sol sütunun başından itibaren basılır.',
      'Her iki düzende de sayfanın en altında "Ayrılan bütçe" ve "Ödenen toplam" için iki çizgi vardır. Markete çıkmadan önce harcamak istediğiniz tutarı, kasadan sonra fişteki tutarı yazarsanız haftadan haftaya mutfak harcamanızın nasıl değiştiğini izleyebilirsiniz.',
    ] },
    { h: 'Kategorili liste neden zaman kazandırır?', p: [
      'Aklına geldiği sırayla yazılmış bir listede süt en üstte, yoğurt en altta olabilir; bu da süt ürünleri reyonuna iki kez gitmek demektir. Ürünleri reyonlara göre gruplamak, marketin içinde tek yönlü bir rota izlemenizi sağlar: önce manav bölümü, sonra şarküteri, kuru gıda ve en son temizlik ürünleri. Dondurulmuş ve soğuk ürünleri en sona bırakmak da böylece kolaylaşır.',
      'Hazır başlıklar genel bir market düzenine göre seçilmiştir: meyve ve sebze; et, tavuk, balık; süt ve kahvaltılık; bakliyat ve kuru gıda; ekmek ve unlu mamul; içecek ve atıştırmalık; temizlik ve kâğıt; kişisel bakım ve diğer. Her zaman gittiğiniz marketin koridor sırasını biliyorsanız başlıkları o sıraya göre kendiniz yazmanız daha da verimli olur. Pazar, kasap ve market olarak üç ayrı yerden alışveriş yapanlar başlıkları dükkânlara göre de düzenleyebilir.',
    ] },
    { h: 'Satır sayıları: çözümlü örnekler', p: [
      'Hiçbir ayarı değiştirmeden oluşturulan liste A4 kâğıtta sekiz kategori kutusundan oluşur. Kutular dört sıra hâlinde dizilir ve her kutuda 6 yazma satırı bulunur; toplam 8 × 6 = 48 satır eder. Aynı düzeni A5 kâğıda aldığınızda her kutuda 4 satır, toplamda 32 satır olur.',
      'Üç başlık yazdığınızda (örneğin Manav, Kasap, Market) ilk iki kutu yan yana 14\'er satır alır, üçüncü kutu tüm genişliğe yayılıp iki sütunda 28 satır sunar; toplam 56 satırdır. Yedi başlıkta altı kutu 6\'şar, son geniş kutu 12 satır alır ve toplam yine 48 olur. Sonuç tablosundaki "Yazma satırı" değeri bu hesabı sizin yerinize gösterir; ihtiyacınız daha fazlaysa düz listeye geçebilir ya da kopya sayısını artırabilirsiniz.',
    ] },
    { h: 'Liste hazırlama önerileri', ul: [
      '<strong>Listeyi mutfakta asılı tutun.</strong> Biten ürünü o anda yazmak, alışveriş günü dolapları tek tek açıp bakmaktan çok daha güvenilirdir.',
      '<strong>Miktarı ürünün yanına yazın.</strong> "Domates 2 kg", "yumurta 30\'lu" gibi notlar evdeki başka birinin de alışverişi eksiksiz yapabilmesini sağlar.',
      '<strong>Haftalık menüyle birlikte hazırlayın.</strong> Önce ne pişireceğinize karar verip sonra listeyi yazarsanız hem eksik malzeme kalmaz hem de gereksiz ürün alınmaz.',
      '<strong>Temel ürünleri hazır yazdırın.</strong> Ekmek, süt, yumurta gibi her hafta alınanları ürün alanına ekleyip birkaç kopya basın; her hafta yalnızca değişenleri elle yazarsınız.',
      '<strong>Bütçe satırını boş geçmeyin.</strong> Baştan bir tutar belirlemek, listede olmayan ürünlere uzanırken durup düşünmenize yardımcı olur.',
      '<strong>Aç karnına alışverişe çıkmayın.</strong> Liste ne kadar iyi olursa olsun, açken sepete giren atıştırmalıklar çoğu zaman listede yer almaz.',
    ] },
    { h: 'Yazdırma ve kullanım', p: [
      'Dosya dikey sayfa olarak hazırlanır. Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A5 liste cebe ve çantaya daha rahat sığar; A4 yazıcıda "sayfa başına 2 sayfa" seçeneğiyle iki A5 listeyi tek kâğıda bastırıp ortadan kesebilirsiniz. Kopya sayısını 2 seçip bu şekilde bastırmak, bir A4 kâğıttan iki haftalık liste çıkarır.',
      'Kâğıt israfını azaltmak için çıktıyı şeffaf dosyaya koyup silinebilir kalemle doldurabilir, alışveriş bitince silip yeniden kullanabilirsiniz. Listeyi evdekilerle paylaşmak için doldurduktan sonra telefonla fotoğrafını çekmek de pratik bir yoldur.',
    ] },
    { h: 'Sınırlar', p: [
      'Kategorili düzende 2 ile 10 arasında başlık kullanılabilir ve hazır ürünler yalnızca düz listede basılır; çünkü bir ürünün hangi kutuya ait olduğunu araç bilemez. Düz listeye en fazla 40 ürün hazır yazdırılabilir. Araç fiyat hesaplamaz, ürün önermez; yalnızca dolduracağınız kâğıdı hazırlar. Dosya doldurulabilir form değildir.',
    ] },
  ],
  faq: [
    ['Alışveriş listesini ücretsiz yazdırabilir miyim?', 'Evet. Listeyi istediğiniz kadar oluşturup indirebilir ve yazdırabilirsiniz; kayıt ya da ücret yoktur. Aynı listeden birkaç sayfa almak için kopya sayısını 10\'a kadar artırabilirsiniz.'],
    ['Kategori başlıklarını değiştirebilir miyim?', 'Evet. "Kategori başlıkları" alanına her satıra bir başlık yazın; 2 ile 10 arasında başlık kullanabilirsiniz. Alanı boş bırakırsanız genel market reyonlarına göre seçilmiş sekiz hazır başlık basılır.'],
    ['Her hafta aldığım ürünleri listeye hazır yazdırabilir miyim?', 'Düz liste düzeninde evet. Ürünleri "Hazır yazılacak ürünler" alanına satır satır yazın; en fazla 40 ürün listenin başına basılır ve yanlarında onay kutusu bulunur.'],
    ['Hazır ürünler neden kategorili düzende kullanılamıyor?', 'Araç, yazdığınız ürünün hangi reyona ait olduğunu bilemez; yanlış kutuya yerleştirmek yerine bu birleşimi kabul etmez. Ürünlerinizin basılı gelmesini istiyorsanız düz listeyi seçin.'],
    ['Bir sayfaya kaç ürün yazabilirim?', 'Düz listede A4 kâğıtta 60, A5 kâğıtta 46 satır vardır. Kategorili düzende satır sayısı başlık sayısına göre değişir; sekiz başlıkla A4\'te 48, A5\'te 32 satır bulunur. Kesin sayı sonuç tablosunda gösterilir.'],
    ['Listeyi telefonumda kullanabilir miyim?', 'PDF dosyasını telefonunuza indirip görüntüleyebilirsiniz; ancak dosya onay kutularına dokunarak işaretlenen bir form değildir. En pratik kullanım, yazdırıp kalemle doldurmak ve isterseniz fotoğrafını paylaşmaktır.'],
    ['Alttaki bütçe ve toplam satırları ne işe yarar?', 'Alışverişe çıkmadan önce ayırdığınız tutarı, döndüğünüzde fişte yazan toplamı not etmeniz içindir. Listeleri biriktirirseniz mutfak harcamanızın haftalara göre seyrini görebilirsiniz.'],
    ['Yazdığım ürünler ve başlıklar bir yere kaydediliyor mu?', 'Hayır. Liste tarayıcınızın içinde PDF\'e dönüştürülür; yazdıklarınız hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['haftalik-yemek-plani', 'butce-planlayici', 'yapilacaklar-listesi-olustur', 'seyahat-planlayici', 'ev-temizlik-cizelgesi'],
};
