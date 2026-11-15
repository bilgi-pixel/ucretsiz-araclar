export default {
  slug: 'wilks-puani-hesapla',
  title: 'Wilks Puanı Hesaplama',
  h1Tail: 'powerlifting kuvvet karşılaştırması',
  pageTitle: 'Wilks Puanı Hesaplama – Powerlifting Wilks Katsayısı ve Skoru',
  description: 'Cinsiyet, vücut ağırlığı ve kaldırdığınız toplam ağırlığı girin; Wilks katsayınızı ve puanınızı hesaplayın. Farklı sıkletlerdeki sporcuları adil karşılaştırın.',
  card: 'Vücut ağırlığınıza ve kaldırdığınız toplama göre Wilks katsayınızı ve puanınızı hesaplayın.',
  category: 'saglik',
  keywords: ['wilks puanı hesaplama', 'wilks katsayısı', 'wilks skoru', 'powerlifting puan hesaplama', 'wilks formülü', 'kuvvet karşılaştırma', 'squat bench deadlift toplam puan'],
  lead: 'Wilks puanı, farklı vücut ağırlığındaki sporcuların kaldırdığı ağırlıkları ortak bir ölçeğe taşır. Cinsiyetinizi, vücut ağırlığınızı ve kaldırdığınız ağırlığı yazın; araç <strong>Wilks katsayınızı</strong> ve <strong>Wilks puanınızı</strong> hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: [['erkek', 'Erkek'], ['kadin', 'Kadın']] },
    { id: 'vucut', label: 'Vücut ağırlığı', type: 'number', placeholder: 'Örn. 82,5' },
    { id: 'toplam', label: 'Kaldırılan ağırlık (toplam ya da tek hareket)', type: 'number', placeholder: 'Örn. 500', hint: 'Squat + bench press + deadlift toplamı ya da tek bir hareketin en iyi derecesi.' },
    { id: 'birim', label: 'Birim', type: 'select', options: [['kg', 'Kilogram (kg)'], ['lb', 'Libre (lb)']] },
  ],
  compute(v, h) {
    const carpan = v.birim === 'lb' ? 0.45359237 : 1;
    const vucut = h.pos(v.vucut, 'Vücut ağırlığı') * carpan;
    const toplam = h.pos(v.toplam, 'Kaldırılan ağırlık') * carpan;
    if (vucut < 40 || vucut > 200) h.err('Vücut ağırlığı 40 ile 200 kg arasında olmalı; Wilks formülü bu aralığın dışında güvenilir değildir.');
    if (toplam > 1500) h.err('Kaldırılan ağırlık 1.500 kg\'dan büyük olamaz; değeri ve birimi kontrol edin.');
    const E = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8];
    const K = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-5, -9.054e-8];
    const k = v.cinsiyet === 'kadin' ? K : E;
    let payda = 0;
    for (let i = 0; i < 6; i++) payda += k[i] * Math.pow(vucut, i);
    const katsayi = 500 / payda;
    const puan = katsayi * toplam;
    const rows = [
      ['Wilks puanı', h.fix(puan, 2)],
      ['Wilks katsayısı', h.fix(katsayi, 4)],
      ['Vücut ağırlığının katı', h.fmt(toplam / vucut, 2) + ' kat'],
      ['Vücut ağırlığı', h.fmt(vucut, 2) + ' kg'],
      ['Kaldırılan ağırlık', h.fmt(toplam, 2) + ' kg'],
    ];
    for (const hedef of [300, 400]) {
      rows.push([`${hedef} Wilks puanı için gereken`, h.fmt(hedef / katsayi, 1) + ' kg']);
    }
    return {
      rows,
      note: 'Hesap, özgün Wilks formülünün erkek ve kadın katsayılarıyla yapılır. Puan birimsizdir; yalnızca aynı formülle hesaplanmış puanlarla karşılaştırın.',
    };
  },
  cases: [
    { in: { cinsiyet: 'erkek', vucut: '100', toplam: '500', birim: 'kg' }, out: { 'Wilks puanı': '304,29', 'Wilks katsayısı': '0,6086', 'Vücut ağırlığının katı': '5 kat' } },
    { in: { cinsiyet: 'kadin', vucut: '60', toplam: '300', birim: 'kg' }, out: { 'Wilks puanı': '334,47', 'Wilks katsayısı': '1,1149', 'Vücut ağırlığının katı': '5 kat' } },
    { in: { cinsiyet: 'erkek', vucut: '75', toplam: '450', birim: 'kg' }, out: { 'Wilks puanı': '320,65', 'Wilks katsayısı': '0,7126' } },
    { in: { cinsiyet: 'erkek', vucut: '90', toplam: '600', birim: 'kg' }, out: { 'Wilks puanı': '383,04', 'Wilks katsayısı': '0,6384' } },
    { in: { cinsiyet: 'kadin', vucut: '52', toplam: '250', birim: 'kg' }, out: { 'Wilks puanı': '311,66', 'Wilks katsayısı': '1,2466' } },
    { in: { cinsiyet: 'erkek', vucut: '82,5', toplam: '227,5', birim: 'kg' }, out: { 'Wilks puanı': '152,40', 'Wilks katsayısı': '0,6699' } },
    { in: { cinsiyet: 'kadin', vucut: '70', toplam: '400', birim: 'kg' }, out: { 'Wilks puanı': '397,94', 'Wilks katsayısı': '0,9948' } },
    { in: { cinsiyet: 'erkek', vucut: '30', toplam: '200', birim: 'kg' }, error: true },
    { in: { cinsiyet: 'erkek', vucut: '100', toplam: '', birim: 'kg' }, error: true },
    { in: { cinsiyet: 'kadin', vucut: '60', toplam: '0', birim: 'kg' }, error: true },
  ],
  howto: [
    'Cinsiyetinizi seçin; erkekler ve kadınlar için formülün katsayıları farklıdır.',
    '"Vücut ağırlığı" alanına tartı değerinizi yazın. Yarışma hesabı yapıyorsanız resmî tartıdaki ağırlığınızı kullanın.',
    '"Kaldırılan ağırlık" alanına squat, bench press ve deadlift en iyi derecelerinizin toplamını ya da tek bir hareketin derecesini girin.',
    'Değerleri libre olarak yazdıysanız birimi "Libre (lb)" seçin; araç kilograma çevirip hesaplar.',
    '"Hesapla" düğmesine basın. Wilks puanınız, katsayınız ve 300 ile 400 puan için gereken ağırlıklar görünür.',
  ],
  sections: [
    { h: 'Wilks puanı nedir?', p: [
      'Kuvvet sporlarında ağır sporcular mutlak olarak daha fazla kaldırır, hafif sporcular ise vücut ağırlıklarına oranla daha fazla. Yalnızca kaldırılan kiloya bakmak ağır sıkletleri, yalnızca "vücut ağırlığının kaç katı" oranına bakmak hafif sıkletleri kayırır. Wilks puanı, bu iki ucu dengelemek için geliştirilmiş bir düzeltme yöntemidir: her vücut ağırlığına bir katsayı atar ve kaldırılan ağırlık bu katsayıyla çarpılır.',
      'Yöntem uzun yıllar powerlifting yarışmalarında sıkletler arası "en iyi sporcu" sıralamasında kullanılmıştır. Günümüzde bazı federasyonlar farklı puanlama formüllerine geçmiş olsa da Wilks, antrenman topluluklarında ve salonlarda hâlâ en bilinen karşılaştırma ölçütlerinden biridir.',
    ] },
    { h: 'Wilks formülü', p: [
      'Katsayı, vücut ağırlığının (x, kilogram) beşinci dereceden bir polinomuna dayanır: <strong>katsayı = 500 ÷ (a + b·x + c·x<sup>2</sup> + d·x<sup>3</sup> + e·x<sup>4</sup> + f·x<sup>5</sup>)</strong>. Puan ise <strong>Wilks puanı = kaldırılan ağırlık (kg) × katsayı</strong> ile bulunur.',
      'Erkekler için sabitler: a = −216,0475144; b = 16,2606339; c = −0,002388645; d = −0,00113732; e = 7,01863 × 10<sup>−6</sup>; f = −1,291 × 10<sup>−8</sup>. Kadınlar için: a = 594,31747775582; b = −27,23842536447; c = 0,82112226871; d = −0,00930733913; e = 4,731582 × 10<sup>−5</sup>; f = −9,054 × 10<sup>−8</sup>. Elle hesaplamak zahmetli olduğundan pratikte hazır tablo ya da bu tür bir araç kullanılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '100 kg vücut ağırlığındaki bir erkek sporcunun toplamı 500 kg olsun. Polinom 100 kg için yaklaşık 821,6 değerini verir; katsayı 500 ÷ 821,6 = <strong>0,6086</strong> olur. Wilks puanı 500 × 0,6086 = <strong>304,29</strong> çıkar.',
      '60 kg vücut ağırlığındaki bir kadın sporcu toplamda 300 kg kaldırmış olsun. Kadın katsayısı 60 kg için <strong>1,1149</strong>\'dur ve puan 300 × 1,1149 = <strong>334,47</strong> eder. İki sporcu da vücut ağırlığının tam beş katını kaldırmıştır, ancak Wilks ölçeğinde ikinci sporcunun performansı daha yüksek puanlanır. Formülün amacı tam da bu tür karşılaştırmaları mümkün kılmaktır.',
    ] },
    { h: 'Vücut ağırlığına göre katsayılar', ul: [
      '<strong>Erkek 60 kg</strong>: 0,8529',
      '<strong>Erkek 75 kg</strong>: 0,7126',
      '<strong>Erkek 82,5 kg</strong>: 0,6699',
      '<strong>Erkek 90 kg</strong>: 0,6384',
      '<strong>Erkek 100 kg</strong>: 0,6086',
      '<strong>Kadın 52 kg</strong>: 1,2466',
      '<strong>Kadın 60 kg</strong>: 1,1149',
      '<strong>Kadın 70 kg</strong>: 0,9948',
    ] },
    { h: 'Puan nasıl yorumlanır?', p: [
      'Wilks puanı birimsiz bir sayıdır ve tek başına "iyi" ya da "kötü" anlamı taşımaz; anlamı karşılaştırmadan gelir. Aynı sporcunun zaman içindeki puanları, kilo alıp verse bile kuvvetinin göreli olarak artıp artmadığını gösterir. Farklı sıkletlerdeki iki sporcunun puanları ise kimin vücut ağırlığına göre daha güçlü olduğunu söyler.',
      'Araç, bulunduğunuz vücut ağırlığında 300 ve 400 puana ulaşmak için gereken toplamı da gösterir. Bu değerler resmî bir sınıflama değildir; yalnızca yuvarlak hedefler için kaç kilo kaldırmanız gerektiğini görmenizi sağlar. Tek bir hareketin derecesini yazarsanız puan doğal olarak üç hareket toplamına göre çok daha düşük çıkar; tek hareket puanlarını yalnızca kendi aralarında karşılaştırın.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Wilks katsayıları yarışma verilerine uydurulmuş istatistiksel bir eğridir ve en uç sıkletlerde tartışmalıdır; çok hafif ve çok ağır sporcularda formülün bir miktar yanlı olduğu yönünde eleştiriler vardır. Araç bu nedenle 40–200 kg aralığının dışındaki vücut ağırlıklarını kabul etmez. Formülün yıllar içinde güncellenmiş bir sürümü ve başka puanlama sistemleri de bulunur; farklı formüllerle hesaplanmış puanlar birbiriyle karşılaştırılamaz.',
      'Ekipmanlı ve ekipmansız dereceler, farklı federasyon kuralları ve hakem ölçütleri de puanı etkiler. Bu sayfa bilgilendirme amaçlıdır. En yüksek ağırlık denemeleri sakatlanma riski taşır; maksimum denemelerini gözetmenle, uygun ısınmayla ve doğru teknikle yapın.',
    ] },
  ],
  faq: [
    ['Wilks puanı nasıl hesaplanır?', 'Önce vücut ağırlığına göre Wilks katsayısı bulunur: 500, vücut ağırlığının beşinci dereceden polinomuna bölünür. Ardından kaldırılan ağırlık bu katsayıyla çarpılır. Erkek ve kadın sporcular için polinomun sabitleri farklıdır.'],
    ['İyi bir Wilks puanı kaçtır?', 'Resmî bir sınır yoktur ve değerlendirme deneyime, yaşa ve yarışma düzeyine göre değişir. Puanı mutlak bir not gibi değil, kendi geçmiş puanlarınızla ya da aynı formülle hesaplanmış başka puanlarla karşılaştırma aracı olarak kullanın.'],
    ['Tek bir hareket için Wilks hesaplanabilir mi?', 'Evet. Alana yalnızca bench press ya da deadlift derecenizi yazabilirsiniz. Çıkan puan o hareket için geçerlidir ve üç hareket toplamının puanıyla karşılaştırılmamalıdır.'],
    ['Kadın ve erkek puanları karşılaştırılabilir mi?', 'Formül, kadın ve erkek sporcular için ayrı katsayılar kullanarak puanları ortak bir ölçeğe taşımayı amaçlar. Bu nedenle karma karşılaştırmalarda kullanılır; yine de bunun istatistiksel bir yaklaşım olduğunu unutmamak gerekir.'],
    ['Kilo verirsem Wilks puanım artar mı?', 'Kaldırdığınız ağırlık aynı kalırsa evet; daha düşük vücut ağırlığında katsayı büyür. Ancak kilo verirken kuvvet de düşebilir. Puanınızı kilo değişiminden önce ve sonra hesaplayarak net etkiyi görebilirsiniz.'],
    ['Libre ile giriş yapabilir miyim?', 'Evet. Birim alanından libreyi seçtiğinizde hem vücut ağırlığı hem kaldırılan ağırlık 0,45359237 ile çarpılarak kilograma çevrilir ve hesap kilogram üzerinden yapılır.'],
    ['Wilks ile vücut ağırlığı katı arasındaki fark nedir?', 'Vücut ağırlığı katı, kaldırılan ağırlığın vücut ağırlığına basit oranıdır ve hafif sporcuları kayırır. Wilks ise bu oranın sıkletlere göre nasıl değiştiğini hesaba katan eğrisel bir düzeltmedir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; vücut ağırlığı ve derece bilgileriniz hiçbir sunucuya gönderilmez.'],
  ],
  related: ['bir-tekrar-maksimum-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'protein-ihtiyaci-hesapla', 'kreatin-dozu-hesapla', 'makro-besin-hesapla'],
};
