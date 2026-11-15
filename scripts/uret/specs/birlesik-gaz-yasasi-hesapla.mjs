export default {
  slug: 'birlesik-gaz-yasasi-hesapla',
  title: 'Birleşik Gaz Yasası Hesaplama',
  h1Tail: 'P₁V₁/T₁ = P₂V₂/T₂',
  pageTitle: 'Birleşik Gaz Yasası Hesaplama – P1V1/T1 = P2V2/T2 Çözücü',
  description: 'Birleşik gaz yasasıyla bir gazın ilk ve son durumundaki basınç, hacim ve sıcaklıktan eksik olanı bulun. Sıcaklığı °C ya da Kelvin girebilirsiniz.',
  card: 'P₁V₁/T₁ = P₂V₂/T₂ eşitliğinde altı büyüklükten beşini yazın, eksik basıncı, hacmi ya da sıcaklığı bulun.',
  category: 'bilim',
  keywords: ['birleşik gaz yasası', 'birleşik gaz denklemi hesaplama', 'P1V1/T1 = P2V2/T2', 'gaz yasaları hesaplama', 'boyle charles gay-lussac', 'gazın son hacmi', 'gazın son basıncı'],
  lead: 'Sabit miktardaki bir gazın basıncı, hacmi ve sıcaklığı birlikte değiştiğinde <strong>P₁V₁/T₁ = P₂V₂/T₂</strong> eşitliği geçerlidir. Altı büyüklükten beşini yazıp birini boş bırakın; araç eksik değeri bulsun.',
  button: 'Hesapla',
  inputs: [
    { id: 'p1', label: 'İlk basınç (P₁)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'v1', label: 'İlk hacim (V₁)', type: 'number', placeholder: 'Örn. 10' },
    { id: 't1', label: 'İlk sıcaklık (T₁)', type: 'number', placeholder: 'Örn. 300' },
    { id: 'p2', label: 'Son basınç (P₂)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'v2', label: 'Son hacim (V₂)', type: 'number', placeholder: 'Boş = bulunacak' },
    { id: 't2', label: 'Son sıcaklık (T₂)', type: 'number', placeholder: 'Örn. 400', hint: 'Bulmak istediğiniz tek alanı boş bırakın. Basınç ve hacim için ilk ve son durumda aynı birimi kullanın.' },
    { id: 'tBirim', label: 'Sıcaklık birimi', type: 'select', options: [['k', 'Kelvin (K)'], ['c', 'Celsius (°C)']] },
  ],
  compute(v, h) {
    const AD = { p1: 'İlk basınç (P₁)', v1: 'İlk hacim (V₁)', t1: 'İlk sıcaklık (T₁)', p2: 'Son basınç (P₂)', v2: 'Son hacim (V₂)', t2: 'Son sıcaklık (T₂)' };
    const anahtar = Object.keys(AD);
    const bos = anahtar.filter((k) => String(v[k] ?? '').trim() === '');
    if (bos.length === 0) h.err('Bulunacak değerin alanını boş bırakın; altı alanın tümü dolu.');
    if (bos.length > 1) h.err('Yalnızca bir alan boş kalmalı. Şu an ' + bos.length + ' alan boş; bilinen beş değeri yazın.');
    const b = bos[0];
    const c = v.tBirim === 'c';
    const x = {};
    for (const k of anahtar) {
      if (k === b) continue;
      if (k[0] === 't') {
        const t = h.num(v[k], AD[k]);
        x[k] = c ? t + 273.15 : t;
        if (!(x[k] > 0)) h.err(`"${AD[k]}" mutlak sıfırın (0 K = −273,15 °C) üzerinde olmalı.`);
      } else x[k] = h.pos(v[k], AD[k]);
    }
    if (b === 'p1') x.p1 = x.p2 * x.v2 * x.t1 / (x.t2 * x.v1);
    else if (b === 'v1') x.v1 = x.p2 * x.v2 * x.t1 / (x.t2 * x.p1);
    else if (b === 't1') x.t1 = x.p1 * x.v1 * x.t2 / (x.p2 * x.v2);
    else if (b === 'p2') x.p2 = x.p1 * x.v1 * x.t2 / (x.t1 * x.v2);
    else if (b === 'v2') x.v2 = x.p1 * x.v1 * x.t2 / (x.t1 * x.p2);
    else x.t2 = x.p2 * x.v2 * x.t1 / (x.p1 * x.v1);
    let deger;
    if (b[0] === 't') deger = c ? h.fmt(x[b] - 273.15, 2) + ' °C' : h.fmt(x[b], 2) + ' K';
    else deger = h.fmt(x[b], 4) + (b[0] === 'p' ? ' (girilen basınç birimiyle)' : ' (girilen hacim birimiyle)');
    const oran = (a, s) => h.fmt(a / s, 4) + ' kat';
    return {
      rows: [
        [AD[b], deger],
        ['T₁ (Kelvin)', h.fmt(x.t1, 2) + ' K'],
        ['T₂ (Kelvin)', h.fmt(x.t2, 2) + ' K'],
        ['Basınç değişimi (P₂ ÷ P₁)', oran(x.p2, x.p1)],
        ['Hacim değişimi (V₂ ÷ V₁)', oran(x.v2, x.v1)],
        ['Mutlak sıcaklık değişimi (T₂ ÷ T₁)', oran(x.t2, x.t1)],
        ['P·V ÷ T sabiti', h.sig(x.p1 * x.v1 / x.t1, 6)],
      ],
      note: 'Gaz miktarının (mol sayısının) değişmediği ve gazın ideal davrandığı varsayılır. Sıcaklıklar hesapta Kelvin\'e çevrilir (K = °C + 273,15).',
    };
  },
  cases: [
    { in: { p1: '1', v1: '10', t1: '300', p2: '2', v2: '', t2: '400', tBirim: 'k' }, out: { 'Son hacim (V₂)': '6,6667 (girilen hacim birimiyle)', 'Hacim değişimi (V₂ ÷ V₁)': '0,6667 kat', 'Basınç değişimi (P₂ ÷ P₁)': '2 kat' } },
    { in: { p1: '1', v1: '5', t1: '0', p2: '1', v2: '', t2: '273,15', tBirim: 'c' }, out: { 'Son hacim (V₂)': '10 (girilen hacim birimiyle)', 'T₁ (Kelvin)': '273,15 K', 'T₂ (Kelvin)': '546,3 K', 'Mutlak sıcaklık değişimi (T₂ ÷ T₁)': '2 kat' } },
    { in: { p1: '2', v1: '3', t1: '300', p2: '', v2: '6', t2: '600', tBirim: 'k' }, out: { 'Son basınç (P₂)': '2 (girilen basınç birimiyle)', 'P·V ÷ T sabiti': '0,02' } },
    { in: { p1: '1', v1: '2', t1: '250', p2: '2', v2: '2', t2: '', tBirim: 'k' }, out: { 'Son sıcaklık (T₂)': '500 K', 'T₂ (Kelvin)': '500 K' } },
    { in: { p1: '3', v1: '', t1: '300', p2: '1', v2: '9', t2: '300', tBirim: 'k' }, out: { 'İlk hacim (V₁)': '3 (girilen hacim birimiyle)' } },
    { in: { p1: '1', v1: '1', t1: '', p2: '4', v2: '1', t2: '800', tBirim: 'k' }, out: { 'İlk sıcaklık (T₁)': '200 K' } },
    { in: { p1: '1', v1: '10', t1: '27', p2: '2', v2: '', t2: '127', tBirim: 'c' }, out: { 'Son hacim (V₂)': '6,6658 (girilen hacim birimiyle)', 'T₁ (Kelvin)': '300,15 K' } },
    { in: { p1: '1', v1: '2', t1: '0', p2: '2', v2: '2', t2: '', tBirim: 'c' }, out: { 'Son sıcaklık (T₂)': '273,15 °C' } },
    { in: { p1: '1', v1: '10', t1: '300', p2: '', v2: '', t2: '400', tBirim: 'k' }, error: true },
    { in: { p1: '1', v1: '10', t1: '-300', p2: '2', v2: '', t2: '127', tBirim: 'c' }, error: true },
    { in: { p1: '1', v1: '10', t1: '300', p2: '2', v2: '5', t2: '400', tBirim: 'k' }, error: true },
  ],
  howto: [
    'Gazın ilk durumuna ait basınç, hacim ve sıcaklığı üstteki üç alana yazın.',
    'Son duruma ait bilinen iki değeri girin; bulmak istediğiniz alanı boş bırakın. Boş alan ilk durumdan da olabilir.',
    '"Sıcaklık birimi" listesinden Kelvin ya da Celsius seçin. Celsius seçerseniz çeviriyi araç yapar.',
    '"Hesapla" düğmesine basın. İlk satır aranan değerdir; altındaki satırlar Kelvin cinsinden sıcaklıkları ve her büyüklüğün kaç katına çıktığını gösterir.',
    'Basıncı iki durumda da aynı birimle (ikisi de atm ya da ikisi de kPa), hacmi de aynı birimle yazdığınızdan emin olun; sonuç o birimde çıkar.',
  ],
  sections: [
    { h: 'Birleşik gaz yasası nedir?', p: [
      'Birleşik gaz yasası, kapalı bir kaptaki sabit miktarda gazın basıncı (P), hacmi (V) ve mutlak sıcaklığı (T) arasındaki ilişkiyi tek bir eşitlikte toplar: <strong>P·V ÷ T = sabit</strong>. Gaz bir durumdan diğerine geçtiğinde bu oran değişmediği için iki durum şöyle bağlanır:',
      '<strong>P₁·V₁ ÷ T₁ = P₂·V₂ ÷ T₂</strong>',
      'Eşitlik, üç ayrı gaz yasasının birleşimidir. Sıcaklık sabitken P₁V₁ = P₂V₂ biçimine iner (Boyle yasası); basınç sabitken V₁/T₁ = V₂/T₂ olur (Charles yasası); hacim sabitken P₁/T₁ = P₂/T₂ kalır (Gay-Lussac yasası). Dolayısıyla bu araçla üç özel yasanın sorularını da çözebilirsiniz: sabit kalan büyüklüğü iki durumda aynı yazmanız yeterlidir.',
    ] },
    { h: 'Sıcaklık neden Kelvin olmalı?', p: [
      'Gaz yasalarındaki orantılar mutlak sıcaklık için geçerlidir. 20 °C\'den 40 °C\'ye çıkan bir gazın sıcaklığı "iki katına" çıkmış olmaz; Kelvin ölçeğinde 293,15 K\'den 313,15 K\'ye, yani yalnızca yaklaşık %7 artmıştır. Celsius değerlerini doğrudan formüle koymak, bu konudaki en yaygın hatadır ve 0 °C ya da negatif sıcaklıklarda anlamsız sonuçlar üretir.',
      'Araç, Celsius seçtiğinizde her sıcaklığa 273,15 ekleyerek hesap yapar ve aranan sıcaklığı yine Celsius olarak verir. Ders kitaplarında çoğunlukla 273 kullanıldığından elle bulduğunuz sonuç ile buradaki değer arasında dördüncü anlamlı basamakta küçük bir fark olabilir.',
    ] },
    { h: 'Çözümlü örnek: son hacmi bulma', p: [
      '1 atm basınçta ve 300 K sıcaklıkta 10 litre hacim kaplayan bir gazın basıncı 2 atm\'ye, sıcaklığı 400 K\'ye çıkarılıyor. Son hacim V₂ = P₁·V₁·T₂ ÷ (T₁·P₂) = 1 × 10 × 400 ÷ (300 × 2) = 4000 ÷ 600 = <strong>6,6667 L</strong> olur. Basıncın iki katına çıkması hacmi yarıya indirirken, mutlak sıcaklığın 4/3 katına çıkması hacmi aynı oranda artırır; net etki 2/3 katıdır.',
      'Aynı soru Celsius ile sorulsaydı (27 °C\'den 127 °C\'ye) araç sıcaklıkları 300,15 K ve 400,15 K alır ve 6,6658 L sonucunu verir. 273 ile yapılan elle hesap 6,6667 çıkarır; fark yuvarlama tercihinden kaynaklanır.',
    ] },
    { h: 'Çözümlü örnek: son basınç ve son sıcaklık', p: [
      'Bir gaz 2 atm basınçta, 300 K\'de 3 litre hacimdedir. Hacmi 6 litreye genişletilirken sıcaklığı 600 K\'ye çıkarılırsa son basınç P₂ = P₁·V₁·T₂ ÷ (T₁·V₂) = 2 × 3 × 600 ÷ (300 × 6) = <strong>2 atm</strong> olur; hacmin iki katına çıkmasının düşürdüğü basıncı, sıcaklığın iki katına çıkması tam olarak telafi etmiştir.',
      'Sıcaklık arandığında: 1 atm, 2 L ve 250 K\'deki bir gazın hacmi sabit tutulup basıncı 2 atm\'ye çıkarılıyorsa T₂ = P₂·V₂·T₁ ÷ (P₁·V₁) = 2 × 2 × 250 ÷ (1 × 2) = <strong>500 K</strong> bulunur. Bu, hacim sabit olduğu için aynı zamanda bir Gay-Lussac yasası sorusudur.',
    ] },
    { h: 'Günlük hayattan örnekler', ul: [
      'Sıcak havada uzun yol yapan aracın lastik basıncının artması: hacim neredeyse sabit, sıcaklık yükseliyor.',
      'Yükseldikçe genişleyen meteoroloji balonu: dış basınç azalırken sıcaklık da düşer; hacmi iki etkinin bileşimi belirler.',
      'Dalgıç tüpünden çıkan hava kabarcığının yüzeye yaklaştıkça büyümesi.',
      'Sprey kutularının ateşe atılmaması uyarısı: kapalı kapta sıcaklık artışı basıncı tehlikeli düzeye çıkarabilir.',
      'Buzdolabına konan yarı dolu pet şişenin içe doğru çökmesi: içerideki hava soğuyunca basıncı düşer.',
    ] },
    { h: 'Varsayımlar, sınırlar ve sık yapılan hatalar', p: [
      'Eşitlik yalnızca gaz miktarı değişmiyorsa geçerlidir. Kaptan gaz kaçıyor, kaba gaz ekleniyor ya da kimyasal tepkime mol sayısını değiştiriyorsa birleşik gaz yasası yerine ideal gaz denklemi (PV = nRT) kullanılmalıdır. Ayrıca gazın ideal davrandığı kabul edilir; çok yüksek basınçlarda ve yoğuşma noktasına yakın sıcaklıklarda gerçek gazlar bu bağıntıdan sapar.',
    ], ul: [
      'Basıncı bir durumda atm, diğerinde mmHg ya da kPa yazmak. Birimler iki tarafta aynı olmalıdır; hangi birim olduğu önemli değildir.',
      'Hacmi bir durumda litre, diğerinde mililitre girmek.',
      'Gösterge (manometre) basıncını mutlak basınç yerine kullanmak. Lastik pompasındaki değer atmosfer basıncının üzerindeki farktır; formülde mutlak basınç gerekir.',
      'Celsius sıcaklıklarını Kelvin\'e çevirmeden oranlamak.',
    ] },
  ],
  faq: [
    ['Birleşik gaz yasası formülü nedir?', 'P₁·V₁ ÷ T₁ = P₂·V₂ ÷ T₂ eşitliğidir. P basınç, V hacim, T Kelvin cinsinden mutlak sıcaklıktır; 1 indisi ilk durumu, 2 indisi son durumu gösterir.'],
    ['Hangi birimleri kullanmalıyım?', 'Basınç ve hacim için istediğiniz birimi seçebilirsiniz; önemli olan ilk ve son durumda aynı birimi kullanmaktır. Sıcaklık hesapta her zaman Kelvin olmalıdır; araç Celsius girişini kendisi çevirir.'],
    ['Boyle, Charles ve Gay-Lussac sorularını bu araçla çözebilir miyim?', 'Evet. Sabit kalan büyüklüğü iki durumda da aynı değerle yazın. Örneğin Boyle yasası için T₁ ve T₂ alanlarına aynı sıcaklığı girin.'],
    ['Birleşik gaz yasası ile ideal gaz denklemi arasındaki fark nedir?', 'İdeal gaz denklemi (PV = nRT) tek bir durumdaki dört büyüklüğü bağlar ve mol sayısını içerir. Birleşik gaz yasası ise mol sayısı değişmeyen bir gazın iki farklı durumunu karşılaştırır; gaz sabiti ve mol sayısı sadeleşir.'],
    ['Sonuç negatif ya da sıfır sıcaklık çıkabilir mi?', 'Kelvin ölçeğinde hayır; mutlak sıcaklık her zaman pozitiftir. Celsius gösteriminde ise negatif sonuç olağandır, örneğin 200 K, −73,15 °C\'ye karşılık gelir.'],
    ['Gaz miktarı değişirse ne yapmalıyım?', 'Bu durumda P·V ÷ T oranı sabit kalmaz. Her durum için ideal gaz denklemini ayrı ayrı yazmalı ya da P₁V₁ ÷ (n₁T₁) = P₂V₂ ÷ (n₂T₂) genel biçimini kullanmalısınız.'],
    ['Elle hesabım ile araç arasında küçük fark var, neden?', 'Büyük olasılıkla Celsius-Kelvin çevrimi nedeniyle. Araç 273,15 kullanır; birçok kitap 273 alır. Fark genellikle binde birin altındadır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; girdiğiniz basınç, hacim ve sıcaklık değerleri sunucuya iletilmez.'],
  ],
  related: ['ideal-gaz-denklemi-hesapla', 'gaz-yogunlugu-hesapla', 'basinc-hesapla', 'isil-genlesme-hesapla', 'mol-hesapla'],
};
