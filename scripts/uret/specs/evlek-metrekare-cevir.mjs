export default {
  slug: 'evlek-metrekare-cevir',
  title: 'Evlek Metrekare Çevirici',
  h1Tail: 'evlek ↔ m²',
  pageTitle: 'Evlek Metrekare Çevirici – 1 Evlek Kaç Metrekare Hesaplama',
  description: 'Evleği metrekareye, metrekareyi evleğe çevirin. 1 evlek dönümün dörtte biridir: yeni dönümle 250 m², eski dönümle yaklaşık 229,8 m². Dönüm karşılığı da gösterilir.',
  card: 'Evleği metrekareye, metrekareyi evleğe çevirin; yeni ve eski dönüm seçeneği ve dönüm karşılığıyla.',
  category: 'birim',
  keywords: ['evlek metrekare çevirme', '1 evlek kaç metrekare', 'evlek nedir', 'evlek hesaplama', 'evlek kaç dönüm', 'bir evlek yer', 'çeyrek dönüm kaç metrekare'],
  lead: 'Eski bir arazi ölçüsü olan evleği metrekareye ya da metrekareyi evleğe çevirin. Evlek <strong>dönümün dörtte biridir</strong>; bugünkü 1.000 m²\'lik dönümle 250 m², eski dönümle yaklaşık 229,8 m² eder.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 3', hint: 'Binlik ayraç kullanmayın; ondalık için virgül yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['e', 'Evlek → Metrekare'], ['m', 'Metrekare → Evlek']] },
    { id: 'tur', label: 'Esas alınan dönüm', type: 'select', options: [['yeni', 'Yeni dönüm (1.000 m²) – evlek 250 m²'], ['eski', 'Eski dönüm (yaklaşık 919,3 m²) – evlek yaklaşık 229,8 m²']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const donumM2 = v.tur === 'eski' ? 919.3 : 1000;
    const evlekM2 = donumM2 / 4;
    const m2 = v.yon === 'm' ? x : x * evlekM2;
    const evlek = v.yon === 'm' ? x / evlekM2 : x;
    const rows = v.yon === 'm'
      ? [['Evlek', h.fmt(evlek, 4) + ' evlek'], ['Metrekare', h.fmt(m2, 3) + ' m²']]
      : [['Metrekare', h.fmt(m2, 3) + ' m²'], ['Evlek', h.fmt(evlek, 4) + ' evlek']];
    rows.push(['Dönüm', h.fmt(evlek / 4, 4) + (v.tur === 'eski' ? ' eski dönüm' : ' dönüm')]);
    rows.push(['Dekar', h.fmt(m2 / 1000, 4) + ' daa']);
    return {
      rows,
      note: v.tur === 'eski'
        ? 'Eski dönüm yaklaşık 919,3 m², evlek bunun dörtte biri (yaklaşık 229,825 m²) alınmıştır. Yöresel kullanımlar farklı olabilir.'
        : 'Evlek, 1.000 m²\'lik dönümün dörtte biri, yani 250 m² alınmıştır.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'e', tur: 'yeni' }, out: { 'Metrekare': '250 m²', 'Dönüm': '0,25 dönüm' } },
    { in: { deger: '1000', yon: 'm', tur: 'yeni' }, out: { 'Evlek': '4 evlek', 'Dönüm': '1 dönüm', 'Dekar': '1 daa' } },
    { in: { deger: '3', yon: 'e', tur: 'yeni' }, out: { 'Metrekare': '750 m²', 'Dönüm': '0,75 dönüm' } },
    { in: { deger: '1', yon: 'e', tur: 'eski' }, out: { 'Metrekare': '229,825 m²', 'Dönüm': '0,25 eski dönüm' } },
    { in: { deger: '600', yon: 'm', tur: 'yeni' }, out: { 'Evlek': '2,4 evlek' } },
    { in: { deger: '10', yon: 'e', tur: 'yeni' }, out: { 'Metrekare': '2.500 m²', 'Dönüm': '2,5 dönüm' } },
    { in: { deger: '919,3', yon: 'm', tur: 'eski' }, out: { 'Evlek': '4 evlek', 'Dönüm': '1 eski dönüm' } },
    { in: { deger: '6', yon: 'e', tur: 'eski' }, out: { 'Metrekare': '1.378,95 m²', 'Evlek': '6 evlek' } },
    { in: { deger: '-1', yon: 'e', tur: 'yeni' }, error: true },
    { in: { deger: 'bir evlek', yon: 'e', tur: 'yeni' }, error: true },
  ],
  howto: [
    '"Alan" alanına evlek ya da metrekare cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden Evlek → Metrekare ya da Metrekare → Evlek seçeneğini belirleyin.',
    '"Esas alınan dönüm" listesinde, evleğin hangi dönüme göre söylendiğini seçin. Emin değilseniz yeni dönümü bırakın ve aşağıdaki açıklamayı okuyun.',
    '"Çevir" düğmesine basın; sonuçta karşılık gelen alan, dönüm ve dekar değerleri görünür.',
    'İsterseniz "Sonucu kopyala" düğmesiyle sonucu panoya alın.',
  ],
  sections: [
    { h: 'Evlek nedir?', p: [
      'Evlek, Anadolu\'da tarla, bağ ve bahçe büyüklüğünü anlatmak için kullanılmış eski bir alan ölçüsüdür ve <strong>dönümün dörtte biri</strong> olarak tanımlanır. Sözcüğün ikinci bir anlamı daha vardır: tarlanın, tohum ekmek ya da sulamak için saban iziyle ya da küçük setlerle ayrılmış bölümlerinden her birine de evlek denir. Sebze bahçelerinde "bir evlek soğan, iki evlek maydanoz" gibi ifadeler çoğu zaman bu ikinci anlamda, yani belirli bir metrekareyi değil bir ekim bölmesini anlatmak için kullanılır.',
      'Bu sayfa evleği ölçü birimi anlamıyla, yani çeyrek dönüm olarak ele alır. Resmî kayıtlarda evlek kullanılmaz; tapu ve kadastro belgelerinde alan metrekareyle yazılır. Evlek bugün daha çok köylerde, yaşlıların anlatımında, eski senetlerde ve edebî metinlerde karşımıza çıkar.',
    ] },
    { h: 'Bir evlek kaç metrekaredir?', p: [
      'Yanıt, hangi dönümün esas alındığına bağlıdır. Bugün kullanılan dönüm 1.000 metrekaredir; bunun dörtte biri <strong>250 m²</strong> eder. Osmanlı döneminden kalan eski dönüm ise yaklaşık 919,3 metrekare kabul edilir; bu ölçüye göre bir evlek 919,3 ÷ 4 = <strong>229,825 m²</strong>, yuvarlak söyleyişle yaklaşık 230 metrekaredir.',
      'Güncel konuşmada "bir evlek yer" denildiğinde çoğunlukla 250 metrekare anlaşılır. Eski bir senet, mahkeme kaydı ya da kuşaklar önce yapılmış bir paylaşımdan söz ediliyorsa eski dönüm daha olası bir karşılıktır. Yörelere göre dönümün büyüklüğü de değişebildiğinden, sözlü aktarılan ölçülerde kesinlik aranmamalı; önemli işlerde arazi ölçtürülmeli ya da tapu kaydına bakılmalıdır.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Evlekten metrekareye: <strong>m² = evlek × 250</strong> (eski dönümle × 229,825). Metrekareden evleğe: <strong>evlek = m² ÷ 250</strong>. Evlekten dönüme: <strong>dönüm = evlek ÷ 4</strong>.',
      '<strong>Örnek 1:</strong> 3 evlek bahçe kaç metrekaredir? 3 × 250 = 750 m². Bu, 0,75 dönümdür.',
      '<strong>Örnek 2:</strong> 600 m²\'lik bir arsa kaç evlektir? 600 ÷ 250 = 2,4 evlek.',
      '<strong>Örnek 3:</strong> 10 evlek = 10 × 250 = 2.500 m² = 2,5 dönüm.',
      '<strong>Örnek 4:</strong> Eski bir kayıtta 6 evlek yazıyor ve eski dönüm kastediliyor: 6 × 229,825 = 1.378,95 m². Aynı kaydı yeni dönüme göre yorumlasaydık 1.500 m² bulurduk; aradaki 121 metrekarelik fark, hangi dönümün kastedildiğini sormanın neden önemli olduğunu gösterir.',
    ] },
    { h: 'Evlek ve akraba ölçüler', ul: [
      '<strong>1 evlek</strong> = 1/4 dönüm = 250 m² (yeni dönümle)',
      '<strong>2 evlek</strong> = yarım dönüm = 500 m²',
      '<strong>3 evlek</strong> = 750 m²',
      '<strong>4 evlek</strong> = 1 dönüm = 1 dekar = 1.000 m²',
      '<strong>40 evlek</strong> = 10 dönüm = 1 hektar = 10.000 m²',
      '<strong>1 evlek</strong> ≈ 229,825 m² (eski dönümle)',
      '<strong>1 ar</strong> = 100 m²; bir evlek 2,5 ardır',
    ] },
    { h: 'Bir evlek yer ne kadardır?', p: [
      'Alanı 250 metrekare olan her şekil bir evlektir. Kenarı yaklaşık 15,8 metre olan bir kare, 10 × 25 metrelik ya da 12,5 × 20 metrelik bir dikdörtgen bir evlek eder. Büyükçe bir müstakil ev arsası ya da küçük bir sebze bahçesi bu büyüklüktedir. Bahçenizi adımlayarak ölçtüyseniz en ile boyu çarpıp metrekareyi bulabilir, sonra bu araçla kaç evlek ettiğini görebilirsiniz; ancak adımla ölçüm yalnızca kaba bir fikir verir.',
    ] },
    { h: 'Hangi durumlarda işe yarar?', p: [
      'Köydeki bir bahçenin ya da hisseli bir tarlanın büyüklüğü size evlekle söylendiyse ve bunu ilan vermek, fiyat biçmek ya da fidan, tohum, gübre hesabı yapmak için metrekareye çevirmeniz gerekiyorsa bu araç işinizi görür. Eski senetleri, miras paylaşımına ilişkin yazıları ya da yerel tarih metinlerini okurken de evlek karşınıza çıkabilir. Türk edebiyatında köy yaşamını anlatan öykü ve romanlarda geçen "üç evlek bağ" gibi ifadeleri gözünüzde canlandırmak için de çeviri yararlıdır.',
      'Dikim ve ekim planlarında üretici önerileri metrekare ya da dekar başına verilir. Örneğin bir evlek (250 m²) yere, sıra arası ve sıra üzeri aralıkları belli olan bir fide dikilecekse, önce alan metrekareye çevrilir, sonra bitki başına düşen alana bölünür. Sonuç satırındaki dekar değeri, dekar başına verilen önerilerle doğrudan çarpılabilir: bir evlek 0,25 dekardır.',
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      'Evlek resmî bir ölçü birimi değildir ve yöreden yöreye farklı anlaşılabilir. Bu araç bilgilendirme amaçlı bir çeviri sunar; alım satım, miras, ifraz ve benzeri işlemlerde tapu ve kadastro kayıtlarındaki metrekare değeri esas alınmalı, gerektiğinde uzmana danışılmalıdır. Araç negatif değer kabul etmez; metrekare üç, evlek dört ondalık basamağa kadar gösterilir.',
    ] },
  ],
  faq: [
    ['1 evlek kaç metrekaredir?', 'Bugünkü 1.000 m²\'lik dönüme göre 1 evlek 250 m²\'dir. Eski dönüme göre yaklaşık 229,8 m² eder.'],
    ['1 evlek kaç dönümdür?', '1 evlek çeyrek dönümdür, yani 0,25 dönüm. Dört evlek bir dönüm eder.'],
    ['1 dönüm kaç evlek eder?', '1 dönüm 4 evlektir. Yarım dönüm 2 evlek, 10 dönüm (1 hektar) 40 evlek eder.'],
    ['500 metrekare kaç evlektir?', 'Yeni dönüme göre 500 ÷ 250 = 2 evlek, yani yarım dönümdür.'],
    ['Evlek resmî bir ölçü birimi mi?', 'Hayır. Evlek geleneksel bir ölçüdür; tapu ve kadastro kayıtlarında alan metrekare olarak yazılır. Resmî işlemlerde bu kayıtlar esas alınır.'],
    ['"Bir evlek maydanoz ektim" derken de 250 metrekare mi kastedilir?', 'Çoğunlukla hayır. Sözcük, bahçenin ekim için ayrılmış bölmesi anlamında da kullanılır ve bu durumda belirli bir alan ifade etmez; birkaç metrekarelik bir tava bile evlek diye anılabilir.'],
    ['Eski ve yeni dönüm arasında hangisini seçmeliyim?', 'Güncel konuşma ve ilanlar için yeni dönümü seçin. Eski belgeler ya da kuşaklar önceki paylaşımlar söz konusuysa eski dönüm daha olasıdır; emin olamıyorsanız iki sonucu da not edin ve tapu kaydıyla karşılaştırın.'],
    ['Yazdığım değerler bir yere kaydediliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['donum-metrekare-cevir', 'hektar-donum-cevir', 'akre-metrekare-cevir', 'metrekare-fiyati-hesapla', 'alan-cevre-hesapla'],
};
