export default {
  slug: 'ml-sivi-ons-cevir',
  title: 'Mililitre Sıvı Ons (fl oz) Çevirici',
  h1Tail: 'mL ↔ fl oz',
  pageTitle: 'Mililitre Sıvı Ons Çevirici – mL\'den fl oz\'a, fl oz\'dan mL\'ye',
  description: 'Mililitreyi sıvı onsa (fl oz), sıvı onsu mililitreye çevirin. ABD (29,57 mL) ve İngiliz (28,41 mL) sıvı onsunu ayrı ayrı hesaplar, litre karşılığını da verir.',
  card: 'Mililitreyi ABD ve İngiliz sıvı onsuna (fl oz), sıvı onsu mililitreye çevirin; şişe, parfüm ve tarif ölçüleri için.',
  category: 'birim',
  keywords: ['ml fl oz çevirme', '1 fl oz kaç ml', 'sıvı ons kaç ml', 'ml ons hesaplama', 'fl oz nedir', '100 ml kaç oz', 'oz ml dönüştürme'],
  lead: 'Bir sıvı hacmini mililitreden sıvı onsa (fl oz) ya da sıvı onstan mililitreye çevirin. Araç <strong>ABD sıvı onsunu (29,5735 mL)</strong> ve <strong>İngiliz sıvı onsunu (28,4131 mL)</strong> ayrı ayrı hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mo', 'Mililitre → Sıvı ons'], ['om', 'Sıvı ons → Mililitre']] },
    { id: 'tur', label: 'Sıvı ons türü', type: 'select', options: [['abd', 'ABD sıvı onsu (US fl oz)'], ['ing', 'İngiliz sıvı onsu (imp fl oz)']], hint: 'Sıvı onstan mililitreye çevirirken yazdığınız değerin türünü belirtir.' },
  ],
  compute(v, h) {
    const ABD = 29.5735295625;
    const ING = 28.4130625;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const ml = v.yon === 'om' ? x * (ing ? ING : ABD) : x;
    const abdSatir = ['ABD sıvı onsu', h.fmt(ml / ABD, 4) + ' fl oz'];
    const ingSatir = ['İngiliz sıvı onsu', h.fmt(ml / ING, 4) + ' fl oz'];
    const mlSatir = ['Mililitre', h.fmt(ml, 3) + ' mL'];
    const rows = v.yon === 'om'
      ? [mlSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir]
      : [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, mlSatir];
    rows.push(['Litre', h.fmt(ml / 1000, 5) + ' L']);
    return {
      rows,
      note: '1 ABD sıvı onsu = 29,5735295625 mL, 1 İngiliz sıvı onsu = 28,4130625 mL. Sıvı ons hacim birimidir; ağırlık onsu (28,35 g) ile karıştırılmamalıdır.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'mo', tur: 'abd' }, out: { 'ABD sıvı onsu': '3,3814 fl oz', 'İngiliz sıvı onsu': '3,5195 fl oz' } },
    { in: { deger: '8', yon: 'om', tur: 'abd' }, out: { 'Mililitre': '236,588 mL', 'Litre': '0,23659 L' } },
    { in: { deger: '12', yon: 'om', tur: 'abd' }, out: { 'Mililitre': '354,882 mL' } },
    { in: { deger: '330', yon: 'mo', tur: 'ing' }, out: { 'İngiliz sıvı onsu': '11,6144 fl oz', 'ABD sıvı onsu': '11,1586 fl oz' } },
    { in: { deger: '20', yon: 'om', tur: 'ing' }, out: { 'Mililitre': '568,261 mL' } },
    { in: { deger: '3,4', yon: 'om', tur: 'abd' }, out: { 'Mililitre': '100,55 mL' } },
    { in: { deger: '0', yon: 'mo', tur: 'abd' }, out: { 'ABD sıvı onsu': '0 fl oz' } },
    { in: { deger: '', yon: 'mo', tur: 'abd' }, error: true },
    { in: { deger: '-30', yon: 'om', tur: 'abd' }, error: true },
  ],
  howto: [
    '"Değer" alanına şişenin, tarifin ya da ambalajın üzerindeki miktarı yazın.',
    '"Çeviri yönü" listesinden mililitreden sıvı onsa mı, sıvı onstan mililitreye mi çevireceğinizi seçin.',
    '"Sıvı ons türü" listesinden ABD ya da İngiliz sıvı onsunu seçin. Amerikan ürünleri ve tarifleri için ABD seçeneği uygundur.',
    '"Çevir" düğmesine basın; asıl sonuç ilk satırda, diğer tür ile mililitre ve litre karşılıkları altında görünür.',
  ],
  sections: [
    { h: 'Sıvı ons (fl oz) nedir?', p: [
      'Sıvı ons, İngilizce "fluid ounce" teriminin karşılığıdır ve "fl oz" olarak kısaltılır. Bir <strong>hacim</strong> birimidir; sıvıların kapladığı yeri ölçer. Adındaki "ons" sözcüğü yüzünden ağırlık onsuyla sık sık karıştırılır. Ağırlık onsu (oz) yaklaşık 28,35 gramdır ve kütleyi ölçer. Suyun bir sıvı onsu yaklaşık bir ons gelir, ancak bal, yağ ya da süt gibi yoğunluğu farklı sıvılarda bu eşitlik tutmaz.',
      'İki ayrı sıvı ons tanımı vardır. <strong>ABD sıvı onsu</strong>, ABD galonunun 128\'de biridir ve 29,5735295625 mL eder. <strong>İngiliz sıvı onsu</strong>, İngiliz galonunun 160\'ta biridir ve 28,4130625 mL eder. Galonlarda İngiliz birimi daha büyükken sıvı onsta durum tersine döner: ABD sıvı onsu, İngiliz sıvı onsundan yaklaşık yüzde 4 daha büyüktür.',
    ] },
    { h: 'Çevirme formülü', p: [
      'Mililitreden ABD sıvı onsuna geçmek için <strong>fl oz = mL ÷ 29,5735</strong>, İngiliz sıvı onsu için <strong>fl oz = mL ÷ 28,4131</strong> işlemi yapılır. Ters yönde aynı sayılarla çarpılır: <strong>mL = fl oz × 29,5735</strong> (ABD) ya da <strong>mL = fl oz × 28,4131</strong> (İngiliz).',
      'Pratikte bir sıvı ons yaklaşık 30 mL kabul edilerek hızlı tahmin yapılabilir. ABD\'de besin etiketlerinde de sıvı ons 30 mL\'ye yuvarlanarak gösterilir. Bu yüzden bir ambalajda yazan mililitre değeri ile kendi hesabınız arasında küçük farklar görmeniz olağandır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 100 mL\'lik bir parfüm şişesi kaç sıvı onstur? 100 ÷ 29,5735 = 3,3814 ABD sıvı onsu. İngiliz birimiyle 100 ÷ 28,4131 = 3,5195 sıvı ons eder. Parfüm kutularında gördüğünüz "3.4 fl oz" ifadesi bu değerin yuvarlanmış hâlidir; tersinden hesaplandığında 3,4 × 29,5735 = 100,55 mL bulunur.',
      '<strong>Örnek 2:</strong> Amerikan tariflerindeki 1 bardak (cup) 8 ABD sıvı onsudur. 8 × 29,5735 = 236,588 mL eder; yani yaklaşık 237 mL.',
      '<strong>Örnek 3:</strong> 330 mL\'lik bir kutu içecek 11,1586 ABD sıvı onsu ya da 11,6144 İngiliz sıvı onsudur. ABD\'deki standart 12 fl oz\'luk kutu ise 354,882 mL\'dir; Türkiye\'deki 330 mL\'lik kutudan biraz büyüktür.',
    ] },
    { h: 'Sıvı onsun kullanıldığı yerler', ul: [
      '<strong>Parfüm ve kozmetik:</strong> Şişe hacimleri 1 fl oz (yaklaşık 30 mL), 1,7 fl oz (50 mL) ve 3,4 fl oz (100 mL) olarak etiketlenir.',
      '<strong>Bebek biberonları:</strong> Birçok biberonun üzerinde mililitre ölçeğinin yanında sıvı ons ölçeği de bulunur; yabancı kaynaklı beslenme çizelgeleri ons üzerinden yazılır.',
      '<strong>Kahve ve içecek boyutları:</strong> Kahve zincirlerinin bardak boyutları 8, 12, 16 ve 20 sıvı ons gibi değerlerle tanımlanır.',
      '<strong>Yemek tarifleri:</strong> ABD kökenli tariflerde süt, su, krema gibi sıvılar bardak ve sıvı ons ile verilir.',
      '<strong>Uçak yolculuğu:</strong> Kabin bagajındaki sıvı sınırı yabancı havalimanlarında 3,4 fl oz olarak duyurulur; bu 100 mL\'ye karşılık gelir.',
    ] },
    { h: 'Sık kullanılan değerler (ABD sıvı onsu)', ul: [
      '<strong>1 fl oz</strong> = 29,574 mL',
      '<strong>2 fl oz</strong> = 59,147 mL',
      '<strong>4 fl oz</strong> = 118,294 mL',
      '<strong>8 fl oz</strong> = 236,588 mL (1 ABD bardağı)',
      '<strong>12 fl oz</strong> = 354,882 mL',
      '<strong>16 fl oz</strong> = 473,176 mL (1 ABD pinti)',
      '<strong>20 İngiliz fl oz</strong> = 568,261 mL (1 İngiliz pinti)',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'Sıvı ons ile ağırlık onsunu birbirinin yerine kullanmayın. Bir tarifte "8 oz un" yazıyorsa bu ağırlıktır ve teraziyle ölçülür; "8 fl oz süt" yazıyorsa hacimdir ve ölçü kabıyla ölçülür. Yalnızca "oz" yazılmış sıvı malzemelerde genellikle sıvı ons kastedilir, ancak bağlama bakmak gerekir.',
      'İlaç ve bebek maması gibi dozun önemli olduğu durumlarda yuvarlanmış değerlerle hesap yapmayın; ürünün kendi ölçeğini ve kullanma talimatını esas alın. Bu araç yalnızca birim çevirir ve bilgilendirme amaçlıdır; sağlıkla ilgili dozlar için hekim ya da eczacı yönlendirmesine uyulmalıdır.',
    ] },
  ],
  faq: [
    ['1 fl oz kaç mL eder?', '1 ABD sıvı onsu 29,5735 mL, 1 İngiliz sıvı onsu 28,4131 mL eder. Gündelik hesaplarda ikisi de yaklaşık 30 mL kabul edilir.'],
    ['100 mL kaç fl oz eder?', '100 mL, 3,3814 ABD sıvı onsuna ya da 3,5195 İngiliz sıvı onsuna eşittir. Parfüm ve kozmetik ambalajlarında bu değer 3,4 fl oz olarak yazılır.'],
    ['Sıvı ons ile ons aynı şey midir?', 'Hayır. Sıvı ons hacim, ons ağırlık birimidir. Su için değerler birbirine yakındır; yoğunluğu farklı sıvılarda ise aynı hacim farklı ağırlık gelir.'],
    ['ABD ve İngiliz sıvı onsu neden farklı?', 'İki ülkenin galon tanımı farklıdır ve galonu farklı sayıda sıvı onsa bölerler: ABD galonu 128, İngiliz galonu 160 sıvı onstur. Sonuçta ABD sıvı onsu yaklaşık yüzde 4 daha büyük çıkar.'],
    ['1 bardak (cup) kaç mL eder?', 'ABD ölçü bardağı 8 ABD sıvı onsudur ve 236,588 mL eder. Tariflerde çoğunlukla 240 mL olarak yuvarlanır.'],
    ['Biberondaki 4 oz kaç mL eder?', '4 ABD sıvı onsu 118,294 mL\'dir; biberon ölçeklerinde yaklaşık 120 mL çizgisine denk gelir. Bebek beslenmesinde miktarı ürünün kendi ölçeğinden okumak en güvenlisidir.'],
    ['Litreyi sıvı onsa nasıl çeviririm?', 'Litre değerini 1000 ile çarparak mililitreye çevirin ve araca yazın. Örneğin 1 litre 1000 mL\'dir ve 33,814 ABD sıvı onsu eder.'],
    ['Yazdığım veriler bir yere gönderiliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['litre-galon-cevir', 'pint-litre-cevir', 'litre-mililitre-cevir', 'gram-ons-cevir', 'tatli-kasigi-ml-cevir', 'birim-donustur'],
};
