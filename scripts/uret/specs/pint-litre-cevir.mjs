export default {
  slug: 'pint-litre-cevir',
  title: 'Pint Litre Çevirici',
  h1Tail: 'pt ↔ L',
  pageTitle: 'Pint Litre Çevirici – 1 Pint Kaç Litre, Kaç mL Hesaplama',
  description: 'Pinti litreye, litreyi pinte çevirin. ABD sıvı pinti (473 mL) ve İngiliz pinti (568 mL) ayrı ayrı hesaplanır; mililitre karşılığı da gösterilir.',
  card: 'Pinti litreye, litreyi pinte çevirin; ABD (473 mL) ve İngiliz (568 mL) pintini mililitre karşılığıyla karşılaştırın.',
  category: 'birim',
  keywords: ['pint litre çevirme', '1 pint kaç litre', '1 pint kaç ml', 'pint nedir', 'ingiliz pinti kaç ml', 'abd pinti kaç ml', 'litre kaç pint'],
  lead: 'Bir hacmi pintten litreye ya da litreden pinte çevirin. Araç <strong>ABD sıvı pintini (0,473176473 L)</strong> ve <strong>İngiliz pintini (0,56826125 L)</strong> ayrı ayrı hesaplar; iki türün karşılığını ve mililitre değerini birlikte gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 1' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['pl', 'Pint → Litre'], ['lp', 'Litre → Pint']] },
    { id: 'tur', label: 'Pint türü', type: 'select', options: [['abd', 'ABD sıvı pinti'], ['ing', 'İngiliz (imperial) pinti']], hint: 'Pintten litreye çevirirken yazdığınız değerin hangi pint olduğunu belirtir.' },
  ],
  compute(v, h) {
    const ABD = 0.473176473;
    const ING = 0.56826125;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const litre = v.yon === 'lp' ? x : x * (ing ? ING : ABD);
    const abdSatir = ['ABD pinti', h.fmt(litre / ABD, 4) + ' pt'];
    const ingSatir = ['İngiliz pinti', h.fmt(litre / ING, 4) + ' pt'];
    const lSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const rows = v.yon === 'lp'
      ? [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, lSatir]
      : [lSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir];
    rows.push(['Mililitre', h.fmt(litre * 1000, 2) + ' mL']);
    return {
      rows,
      note: '1 ABD sıvı pinti = 0,473176473 L (galonun sekizde biri), 1 İngiliz pinti = 0,56826125 L. ABD kuru pinti bu araçta yer almaz.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'pl', tur: 'abd' }, out: { 'Litre': '0,4732 L', 'Mililitre': '473,18 mL' } },
    { in: { deger: '1', yon: 'lp', tur: 'abd' }, out: { 'ABD pinti': '2,1134 pt', 'İngiliz pinti': '1,7598 pt' } },
    { in: { deger: '1', yon: 'pl', tur: 'ing' }, out: { 'Litre': '0,5683 L', 'ABD pinti': '1,2009 pt', 'Mililitre': '568,26 mL' } },
    { in: { deger: '2', yon: 'pl', tur: 'ing' }, out: { 'Litre': '1,1365 L' } },
    { in: { deger: '0,5', yon: 'lp', tur: 'ing' }, out: { 'İngiliz pinti': '0,8799 pt', 'ABD pinti': '1,0567 pt' } },
    { in: { deger: '8', yon: 'pl', tur: 'abd' }, out: { 'Litre': '3,7854 L' } },
    { in: { deger: '3', yon: 'pl', tur: 'abd' }, out: { 'Litre': '1,4195 L', 'Mililitre': '1.419,53 mL' } },
    { in: { deger: '', yon: 'pl', tur: 'abd' }, error: true },
    { in: { deger: '-1', yon: 'lp', tur: 'ing' }, error: true },
  ],
  howto: [
    '"Değer" alanına pint ya da litre miktarını yazın.',
    '"Çeviri yönü" listesinden pintten litreye ya da litreden pinte seçeneğini belirleyin.',
    '"Pint türü" listesinden ABD sıvı pintini ya da İngiliz pintini seçin. Birleşik Krallık ve İrlanda kaynakları için İngiliz, ABD kaynakları için ABD seçeneği uygundur.',
    '"Çevir" düğmesine basın. İlk satır asıl sonuçtur; diğer pint türü ve mililitre karşılığı altında görünür.',
  ],
  sections: [
    { h: 'Pint nedir?', p: [
      'Pint, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir hacim birimidir ve "pt" olarak kısaltılır. Her iki sistemde de bir galonun sekizde biri olarak tanımlanır. Ancak iki ülkenin galonu farklı büyüklükte olduğundan pintleri de farklıdır.',
      '<strong>ABD sıvı pinti</strong> 16 ABD sıvı onsudur ve tam 0,473176473 litre, yani yaklaşık 473 mL eder. <strong>İngiliz (imperial) pinti</strong> 20 İngiliz sıvı onsudur ve tam 0,56826125 litre, yani yaklaşık 568 mL eder. İngiliz pinti, ABD pintinden yaklaşık yüzde 20 daha büyüktür. Yarım litreyle karşılaştırıldığında ABD pinti biraz az, İngiliz pinti biraz fazladır.',
    ] },
    { h: 'Çevirme formülleri', p: [
      'Pintten litreye geçerken ABD pinti için <strong>L = pt × 0,473176473</strong>, İngiliz pinti için <strong>L = pt × 0,56826125</strong> işlemi yapılır. Litreden pinte geçerken aynı sayılara bölünür.',
      'Kabaca hesap için şu yaklaşımlar yeterlidir: bir litre yaklaşık 2,1 ABD pinti ya da 1,76 İngiliz pintidir. İki ABD pinti bir litreden biraz az, iki İngiliz pinti bir litreden biraz fazla tutar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir Amerikan tarifinde 1 pint krema isteniyor. 1 × 0,473176473 = 0,4732 litre, yani 473,18 mL eder. Türkiye\'de satılan 500 mL\'lik bir kutudan yaklaşık 27 mL eksik kullanmak yeterlidir.',
      '<strong>Örnek 2:</strong> Bir İngiliz tarifinde 2 pint süt yazıyor. 2 × 0,56826125 = 1,1365 litre eder. Aynı tarifi ABD pintiyle okusaydınız 0,9464 litre kullanır ve yaklaşık 190 mL eksik sıvı koymuş olurdunuz.',
      '<strong>Örnek 3:</strong> 1 litre kaç pinttir? 1 ÷ 0,473176473 = 2,1134 ABD pinti; 1 ÷ 0,56826125 = 1,7598 İngiliz pinti.',
      '<strong>Örnek 4:</strong> 8 ABD pinti 8 × 0,473176473 = 3,7854 litre eder; bu tam olarak bir ABD galonudur.',
    ] },
    { h: 'Pint nerelerde karşımıza çıkar?', ul: [
      '<strong>Yemek tarifleri:</strong> ABD ve Birleşik Krallık kökenli tariflerde süt, krema, et suyu gibi sıvılar pint ile verilir. Tarifin hangi ülkeden geldiğini bilmek doğru ölçü için şarttır.',
      '<strong>İçecek servisi:</strong> Birleşik Krallık ve İrlanda\'da fıçı içecekler geleneksel olarak pint ve yarım pint bardaklarda servis edilir.',
      '<strong>Süt ve dondurma ambalajları:</strong> Birleşik Krallık\'ta süt şişeleri pint katlarıyla, ABD\'de dondurma kutuları pint boyuyla satılır.',
      '<strong>Kan bağışı:</strong> İngilizce kaynaklarda bağışlanan kan miktarı çoğunlukla "bir pint" ya da "bir ünite" olarak anılır; bu yaklaşık yarım litreye yakın bir hacmi anlatan gündelik bir ifadedir.',
      '<strong>Edebiyat ve filmler:</strong> Çevirilerde geçen "bir pint" ifadesini somutlaştırmak için yaklaşık yarım litre düşünmek yeterlidir.',
    ] },
    { h: 'ABD ve İngiliz hacim birimleri yan yana', ul: [
      '<strong>1 ABD pinti</strong> = 16 ABD fl oz = 473,18 mL',
      '<strong>1 İngiliz pinti</strong> = 20 İngiliz fl oz = 568,26 mL',
      '<strong>1 İngiliz pinti</strong> = 1,2009 ABD pinti',
      '<strong>2 pint</strong> = 1 quart (her iki sistemde)',
      '<strong>8 pint</strong> = 1 galon (her iki sistemde)',
      '<strong>1 litre</strong> = 2,1134 ABD pinti = 1,7598 İngiliz pinti',
      '<strong>Yarım litre</strong> = 1,0567 ABD pinti = 0,8799 İngiliz pinti',
    ] },
    { h: 'Kuru pint ve diğer ayrıntılar', p: [
      'ABD\'de sıvı pintin yanında, çilek ve yaban mersini gibi küçük meyvelerin satışında kullanılan bir "kuru pint" de vardır. Kuru pint yaklaşık 551 mL\'dir ve sıvı pintten büyüktür. Bu araç yalnızca sıvı pinti hesaplar; ABD pazarındaki bir meyve kutusunun üzerinde "dry pint" görürseniz farklı bir birimden söz edildiğini bilmelisiniz.',
      'Bazı ülkelerde gündelik dilde "pint" sözcüğü yarım litrelik ya da başka boydaki bardakları anlatmak için gevşek biçimde kullanılır. Resmî ölçü olarak geçerli olan değerler yukarıdaki iki tanımdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık hata, pintin tek bir birim olduğunu varsaymaktır. İnternetteki bir tarifin kaynağını kontrol etmeden ABD değerini kullanmak, İngiliz tarifinde sıvıyı yaklaşık beşte bir oranında eksik bırakır. Hamur işi ve tatlı gibi oranların önemli olduğu tariflerde bu fark sonucu etkiler.',
      'Hesap tam tanım değerleriyle yapılır; litre ve pint sonuçları dört, mililitre sonucu iki ondalık basamağa yuvarlanarak gösterilir. Araç negatif değer kabul etmez.',
    ] },
  ],
  faq: [
    ['1 pint kaç litredir?', 'ABD sıvı pinti 0,4732 litre, İngiliz pinti 0,5683 litredir. Hangisinin geçerli olduğu kaynağın ülkesine bağlıdır.'],
    ['1 pint kaç mL eder?', 'ABD sıvı pinti yaklaşık 473 mL, İngiliz pinti yaklaşık 568 mL eder.'],
    ['1 litre kaç pint eder?', '1 litre 2,1134 ABD pinti ya da 1,7598 İngiliz pinti eder.'],
    ['ABD pinti ile İngiliz pinti neden farklı?', 'Her ikisi de galonun sekizde biridir, ancak ABD galonu 3,785 litre, İngiliz galonu 4,546 litredir. Ayrıca ABD pinti 16, İngiliz pinti 20 sıvı onsa bölünür.'],
    ['Yarım litre bir pint eder mi?', 'Tam olarak değil. Yarım litre 1,0567 ABD pinti ve 0,8799 İngiliz pintidir; yani ABD pintinden biraz fazla, İngiliz pintinden biraz azdır.'],
    ['Bir pint kaç bardak (cup) eder?', 'ABD sisteminde 1 pint 2 bardaktır (cup); bir bardak 8 ABD sıvı onsu, yaklaşık 237 mL\'dir.'],
    ['Quart ile pint arasındaki ilişki nedir?', '1 quart 2 pinttir ve galonun dörtte biridir. ABD sıvı quartı yaklaşık 946 mL, İngiliz quartı yaklaşık 1.137 mL eder.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['litre-galon-cevir', 'ml-sivi-ons-cevir', 'galon-ingiliz-abd-cevir', 'litre-mililitre-cevir', 'santilitre-mililitre-cevir', 'birim-donustur'],
};
