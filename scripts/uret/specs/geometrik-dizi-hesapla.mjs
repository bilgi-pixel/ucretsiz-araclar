export default {
  slug: 'geometrik-dizi-hesapla',
  title: 'Geometrik Dizi Hesaplama',
  h1Tail: 'n. terim, toplam ve sonsuz toplam',
  pageTitle: 'Geometrik Dizi Hesaplama – n. Terim, Toplam ve Sonsuz Toplam',
  description: 'İlk terimi ve ortak çarpanı verilen geometrik dizinin n. terimini, ilk n terim toplamını ve varsa sonsuz toplamını hesaplayın; ilk terimleri listeleyin.',
  card: 'İlk terim ve ortak çarpandan geometrik dizinin n. terimini, ilk n terim toplamını ve sonsuz toplamını bulun.',
  category: 'matematik',
  keywords: ['geometrik dizi hesaplama', 'geometrik dizi n. terim', 'geometrik dizi toplam formülü', 'ortak çarpan bulma', 'sonsuz geometrik dizi toplamı', 'geometrik dizi genel terim', 'geometrik seri toplamı'],
  lead: `Geometrik dizinin ilk terimini (a<sub>1</sub>), ortak çarpanını (r) ve terim numarasını (n) girin. Araç <strong>n. terimi</strong>, <strong>ilk n terimin toplamını</strong> ve ortak çarpanın mutlak değeri 1'den küçükse <strong>sonsuz toplamı</strong> hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'ilk', label: 'İlk terim (a₁)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'carpan', label: 'Ortak çarpan (r)', type: 'number', placeholder: 'Örn. 2', hint: 'Yarıya inen dizi için 0,5; işaret değiştiren dizi için negatif yazın.' },
    { id: 'adet', label: 'Terim numarası (n)', type: 'number', placeholder: 'Örn. 5' },
  ],
  compute(v, h) {
    const a = h.num(v.ilk, 'İlk terim');
    const r = h.num(v.carpan, 'Ortak çarpan');
    const n = h.posint(v.adet, 'Terim numarası');
    if (a === 0) h.err('İlk terim sıfır olamaz; sıfırla başlayan dizinin bütün terimleri sıfırdır.');
    if (r === 0) h.err('Ortak çarpan sıfır olamaz; sıfırdan farklı bir çarpan yazın.');
    if (n > 1000) h.err('Terim numarası en fazla 1.000 olabilir.');
    let terim = a, toplam = 0;
    const liste = [];
    for (let i = 1; i <= n; i++) {
      if (i > 1) terim *= r;
      toplam += terim;
      if (i <= 8) liste.push(terim);
    }
    if (!Number.isFinite(terim) || !Number.isFinite(toplam)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük bir terim numarası ya da çarpan deneyin.');
    const f = (x) => h.sig(x, 10);
    const rYazi = r < 0 ? `(${f(r)})` : f(r);
    const sonsuz = Math.abs(r) < 1 ? f(a / (1 - r)) : 'Yok (|r| ≥ 1 olduğundan toplam sınırsız büyür ya da salınır)';
    return {
      rows: [
        ['n. terim', f(terim)],
        ['İlk n terimin toplamı', f(toplam)],
        ['Sonsuz toplam', sonsuz],
        ['Genel terim', `aₙ = ${f(a)} × ${rYazi}^(n − 1)`],
        ['İlk terimler', liste.map(f).join('; ') + (n > 8 ? '; …' : '')],
      ],
      note: 'aₙ = a₁ × r^(n − 1) ve Sₙ = a₁ × (1 − rⁿ) ÷ (1 − r) formülleri kullanılır. Sonuçlar 10 anlamlı basamağa yuvarlanır; listede en fazla ilk 8 terim gösterilir.',
    };
  },
  cases: [
    { in: { ilk: '3', carpan: '2', adet: '5' }, out: { 'n. terim': '48', 'İlk n terimin toplamı': '93', 'İlk terimler': '3; 6; 12; 24; 48' } },
    { in: { ilk: '100', carpan: '0,5', adet: '4' }, out: { 'n. terim': '12,5', 'İlk n terimin toplamı': '187,5', 'Sonsuz toplam': '200' } },
    { in: { ilk: '1', carpan: '2', adet: '10' }, out: { 'n. terim': '512', 'İlk n terimin toplamı': '1.023' } },
    { in: { ilk: '2', carpan: '-3', adet: '4' }, out: { 'n. terim': '-54', 'İlk n terimin toplamı': '-40', 'Genel terim': 'aₙ = 2 × (-3)^(n − 1)' } },
    { in: { ilk: '5', carpan: '1', adet: '4' }, out: { 'n. terim': '5', 'İlk n terimin toplamı': '20' } },
    { in: { ilk: '1', carpan: '10', adet: '7' }, out: { 'n. terim': '1.000.000', 'İlk n terimin toplamı': '1.111.111' } },
    { in: { ilk: '1', carpan: '2', adet: '64' }, match: { 'İlk n terimin toplamı': '^1,844674407 × 10\\^19$' } },
    { in: { ilk: '3', carpan: '0', adet: '5' }, error: true },
    { in: { ilk: '3', carpan: '2', adet: '-1' }, error: true },
    { in: { ilk: '3', carpan: 'x', adet: '5' }, error: true },
  ],
  howto: [
    `"İlk terim" alanına dizinin birinci elemanını yazın; sıfırdan farklı herhangi bir sayı olabilir.`,
    `"Ortak çarpan" alanına her terimin bir öncekine oranını girin. İkiye katlanan dizide 2, yarılanan dizide 0,5 yazılır.`,
    `"Terim numarası" alanına kaçıncı terimi ve kaç terimin toplamını istediğinizi 1 ile 1.000 arasında tam sayı olarak yazın.`,
    `"Hesapla" düğmesine basın. n. terim, kısmi toplam, sonsuz toplam, genel terim ve dizinin ilk terimleri listelenir.`,
  ],
  sections: [
    { h: 'Geometrik dizi nedir?', p: [
      `Her terimi, bir önceki terimin sabit bir sayıyla çarpılmasıyla elde edilen diziye geometrik dizi denir. Bu sabit sayı <strong>ortak çarpan</strong> (ortak oran) olarak adlandırılır ve r ile gösterilir. 3, 6, 12, 24, 48… dizisinde her terim bir öncekinin iki katıdır; ortak çarpan 2'dir. Ortak çarpanı bulmak için herhangi bir terimi kendinden önceki terime bölmek yeterlidir.`,
      `Ortak çarpanın değeri dizinin davranışını belirler. Çarpan 1'den büyükse terimler hızla büyür; 0 ile 1 arasındaysa terimler küçülerek sıfıra yaklaşır; negatifse terimlerin işareti sırayla değişir; tam 1 ise bütün terimler eşittir. Aritmetik dizideki düzenli toplama yerine burada düzenli çarpma vardır, bu yüzden geometrik diziler üstel büyüme ve azalmanın matematiksel modelidir.`,
    ] },
    { h: 'Formüller', ul: [
      `<strong>Genel terim:</strong> a<sub>n</sub> = a<sub>1</sub> × r<sup>n−1</sup>`,
      `<strong>İlk n terimin toplamı (r ≠ 1):</strong> S<sub>n</sub> = a<sub>1</sub> × (1 − r<sup>n</sup>) ÷ (1 − r)`,
      `<strong>r = 1 ise:</strong> S<sub>n</sub> = n × a<sub>1</sub>`,
      `<strong>Sonsuz toplam (|r| < 1):</strong> S = a<sub>1</sub> ÷ (1 − r)`,
      `<strong>Geometrik orta:</strong> Ardışık üç terimde ortadakinin karesi, iki yanındaki terimlerin çarpımına eşittir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Büyüyen dizi:</strong> İlk terim 3, ortak çarpan 2 olsun. Beşinci terim a<sub>5</sub> = 3 × 2<sup>4</sup> = 3 × 16 = <strong>48</strong> olur. İlk beş terimin toplamı S<sub>5</sub> = 3 × (1 − 2<sup>5</sup>) ÷ (1 − 2) = 3 × (−31) ÷ (−1) = <strong>93</strong> eder. Terimleri elle toplarsak 3 + 6 + 12 + 24 + 48 = 93 sonucunu doğrularız.`,
      `<strong>Küçülen dizi:</strong> İlk terim 100, ortak çarpan 0,5 ise terimler 100, 50, 25, 12,5 biçiminde ilerler. Dördüncü terim <strong>12,5</strong>, ilk dört terimin toplamı <strong>187,5</strong>'tir. Çarpanın mutlak değeri 1'den küçük olduğu için sonsuz toplam da vardır: 100 ÷ (1 − 0,5) = <strong>200</strong>. Ne kadar terim eklerseniz ekleyin toplam 200'ü geçmez, yalnızca ona yaklaşır.`,
      `<strong>İşaret değiştiren dizi:</strong> İlk terim 2, ortak çarpan −3 ise terimler 2, −6, 18, −54 olur. Dördüncü terim <strong>−54</strong>, ilk dört terimin toplamı 2 − 6 + 18 − 54 = <strong>−40</strong> çıkar.`,
    ] },
    { h: 'Sonsuz toplam ne zaman vardır?', p: [
      `Sonsuz sayıda terimin toplamının sonlu bir sayı etmesi ilk bakışta şaşırtıcıdır. Ancak ortak çarpanın mutlak değeri 1'den küçükse her yeni terim bir öncekinden küçük kalır ve eklenen miktar giderek önemsizleşir. Klasik örnek 1/2 + 1/4 + 1/8 + 1/16 + … toplamıdır; sonuç tam olarak 1'dir. Bir pastanın önce yarısını, sonra kalanın yarısını, sonra yine kalanın yarısını yemeye devam ettiğinizi düşünürseniz toplamda pastanın tamamına yaklaşır ama onu aşamazsınız.`,
      `Çarpanın mutlak değeri 1 ya da daha büyükse terimler küçülmez; toplam ya sınırsız büyür ya da artı ve eksi değerler arasında salınır. Bu durumda araç sonsuz toplam satırında bir değer yerine toplamın bulunmadığını belirtir. Devirli ondalık sayıların kesre çevrilmesi de sonsuz geometrik toplamın bir uygulamasıdır: 0,333… sayısı ilk terimi 0,3 ve çarpanı 0,1 olan bir toplamdır ve 0,3 ÷ 0,9 = 1/3 eder.`,
    ] },
    { h: 'Gerçek hayatta geometrik diziler', p: [
      `Bileşik faiz en bilinen örnektir. Yıllık yüzde 10 getiriyle değerlenen bir tutar her yıl 1,1 ile çarpılır; ilk terimi 1.000, çarpanı 1,1 olan dizinin beşinci terimi 1.464,1'dir. Bu, 1.000 liranın dört yıl sonunda ulaşacağı tutarı verir. Tersine, her yıl değerinin sabit bir yüzdesini kaybeden araç ya da cihazların değeri de çarpanı 1'den küçük bir geometrik dizi izler.`,
      `Satranç tahtası efsanesi geometrik büyümenin gücünü gösterir: ilk kareye 1, sonraki her kareye bir öncekinin iki katı buğday tanesi konulursa 64 karedeki toplam 2<sup>64</sup> − 1, yani yaklaşık 1,84 × 10<sup>19</sup> tane eder. Araca ilk terim 1, çarpan 2 ve n = 64 yazarak bu sonucu görebilirsiniz. Bakterilerin bölünerek çoğalması, radyoaktif maddelerin yarılanması, yere her çarpışında yüksekliğinin belirli bir oranına sıçrayan top ve her katlamada kalınlığı ikiye katlanan kâğıt da aynı kalıba uyar.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Genel terimde üs n değil <strong>n − 1</strong>'dir; birinci terimde henüz hiç çarpma yapılmamıştır. Toplam formülünde ise üs n'dir. Bu iki üssün karıştırılması en sık rastlanan hatadır. Negatif çarpanlı dizilerde parantez kullanmayı unutmak da işaret hatasına yol açar: (−3)<sup>2</sup> = 9 iken −3<sup>2</sup> ifadesi −9 olarak okunur.`,
      `Araç terim numarasını 1.000 ile sınırlar ve sonuçları 10 anlamlı basamağa yuvarlar; çok büyük değerler bilimsel gösterimle yazılır. Faiz ve yatırım örnekleri yalnızca dizinin mantığını göstermek içindir; gerçek bir mali karar için vergi, kesinti ve dönem ayrıntılarını ayrıca hesaba katmanız, gerekirse bir uzmana danışmanız gerekir.`,
    ] },
  ],
  faq: [
    ['Geometrik dizinin genel terimi nedir?', 'aₙ = a₁ × r^(n − 1) biçimindedir. İlk terim, ortak çarpanın (n − 1). kuvvetiyle çarpılır. İlk terimi 3 ve çarpanı 2 olan dizide beşinci terim 3 × 2⁴ = 48\'dir.'],
    ['Ortak çarpan nasıl bulunur?', 'Herhangi bir terim kendinden önceki terime bölünür. 5, 15, 45 dizisinde 15 ÷ 5 = 3 olduğundan ortak çarpan 3\'tür. Ardışık olmayan iki terim biliniyorsa terimlerin oranının uygun dereceden kökü alınır.'],
    ['Geometrik dizinin toplam formülü nedir?', 'Çarpan 1\'den farklıysa Sₙ = a₁ × (1 − rⁿ) ÷ (1 − r) kullanılır. Çarpan 1 ise bütün terimler eşit olduğundan toplam n × a₁ olur.'],
    ['Sonsuz geometrik dizinin toplamı her zaman var mıdır?', 'Hayır. Yalnızca ortak çarpanın mutlak değeri 1\'den küçükse vardır ve a₁ ÷ (1 − r) ile bulunur. Aksi durumda toplam sonlu bir değere yaklaşmaz.'],
    ['Ortak çarpan negatif olabilir mi?', 'Evet. Negatif çarpanda terimler sırayla artı ve eksi değer alır. Araç bu durumu destekler; örneğin ilk terim 2 ve çarpan −3 için dördüncü terim −54 çıkar.'],
    ['Ortak çarpan neden sıfır olamaz?', 'Çarpan sıfır olursa ikinci terimden itibaren bütün terimler sıfır olur ve ardışık terimlerin oranı tanımsız kalır; böyle bir dizi geometrik dizi sayılmaz. Araç bu durumda uyarı verir.'],
    ['Sonuç neden bazen "× 10^" ile yazılıyor?', 'Geometrik diziler çok hızlı büyüdüğü için sonuç on beş basamağı aştığında bilimsel gösterime geçilir. Örneğin 1,844674407 × 10^19, virgülün 19 basamak sağa kaydırılacağı anlamına gelir.'],
    ['Yazdığım sayılar saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['aritmetik-dizi-hesapla', 'ardisik-sayi-toplami', 'bilesik-faiz-hesapla', 'fibonacci-hesapla', 'geometrik-ortalama-hesapla'],
};
