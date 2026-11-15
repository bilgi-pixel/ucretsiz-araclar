export default {
  slug: 'zar-olasiligi-hesapla',
  title: 'Zar Olasılığı Hesaplama',
  h1Tail: 'toplam için tam, en az, en çok',
  pageTitle: 'Zar Olasılığı Hesaplama – Zar Toplamının Gelme Olasılığı',
  description: 'Bir ya da birden çok zarın toplamının belirli bir sayıya eşit, en az ya da en çok o kadar gelme olasılığını kesir ve yüzde olarak hesaplayın; yüz sayısını da seçin.',
  card: 'Zar sayısını ve hedef toplamı yazın; toplamın tam, en az ya da en çok o değer gelme olasılığını kesir ve yüzde olarak görün.',
  category: 'matematik',
  keywords: ['zar olasılığı hesaplama', 'iki zar toplamı olasılık', 'zar toplamı 7 gelme olasılığı', 'üç zar olasılık', 'zar atma olasılığı', 'düşeş gelme olasılığı', 'çok yüzlü zar olasılığı'],
  lead: 'Atılan zarların <strong>toplamının</strong> istediğiniz değere eşit, o değerden büyük-eşit ya da küçük-eşit gelme olasılığını bulun. Araç tüm zar dizilişlerini sayar; uygun durum sayısını, sadeleşmiş kesri, yüzdeyi ve beklenen toplamı birlikte gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'zar', label: 'Zar sayısı', type: 'number', value: '2', hint: '1 ile 20 arasında' },
    { id: 'yuz', label: 'Bir zarın yüz sayısı', type: 'number', value: '6', hint: 'Klasik zar için 6; 2 ile 100 arasında' },
    { id: 'hedef', label: 'Hedef toplam', type: 'number', placeholder: 'Örn. 7' },
    { id: 'kosul', label: 'Koşul', type: 'select', options: [['esit', 'Toplam tam bu değer'], ['enaz', 'Toplam en az bu değer'], ['encok', 'Toplam en çok bu değer']] },
  ],
  compute(v, h) {
    const n = h.posint(v.zar, 'Zar sayısı');
    if (n > 20) h.err('"Zar sayısı" en fazla 20 olabilir.');
    const f = h.posint(v.yuz, 'Bir zarın yüz sayısı');
    if (f < 2 || f > 100) h.err('"Bir zarın yüz sayısı" 2 ile 100 arasında olmalı.');
    const t = h.int(v.hedef, 'Hedef toplam');
    // Toplamların dağılımı: olasılık (kayan nokta) ve mümkünse tam durum sayısı.
    const tum = Math.pow(f, n);
    const tamSayim = tum <= 9e15;
    let ol = [1];
    let say = [1];
    for (let i = 0; i < n; i++) {
      const yeniOl = new Array(ol.length + f - 1).fill(0);
      const yeniSay = new Array(ol.length + f - 1).fill(0);
      for (let s = 0; s < ol.length; s++) {
        for (let k = 0; k < f; k++) {
          yeniOl[s + k] += ol[s] / f;
          if (tamSayim) yeniSay[s + k] += say[s];
        }
      }
      ol = yeniOl; say = yeniSay;
    }
    // ol[i] → toplam = n + i
    const enK = n, enB = n * f;
    let p = 0, adet = 0;
    for (let i = 0; i < ol.length; i++) {
      const s = n + i;
      const uygun = v.kosul === 'enaz' ? s >= t : v.kosul === 'encok' ? s <= t : s === t;
      if (uygun) { p += ol[i]; adet += say[i]; }
    }
    if (tamSayim) p = adet / tum;
    if (p > 1) p = 1;
    const ebob = (x, y) => { while (y) { [x, y] = [y, x % y]; } return x; };
    const rows = [
      ['Olasılık', h.sig(p, 6)],
      ['Yüzde', '%' + h.sig(p * 100, 6)],
    ];
    if (tamSayim) {
      const g = ebob(adet, tum) || 1;
      rows.push(['Uygun durum / tüm durum', `${h.fmt(adet, 0)} / ${h.fmt(tum, 0)}`]);
      rows.push(['Kesir', adet === 0 ? '0' : adet === tum ? '1' : `${h.fmt(adet / g, 0)}/${h.fmt(tum / g, 0)}`]);
    }
    rows.push(['Ortalama kaç atışta bir', p > 0 ? h.sig(1 / p, 6) : '—']);
    rows.push(['Olası toplam aralığı', `${enK} – ${enB}`]);
    rows.push(['Beklenen toplam', h.fmt(n * (f + 1) / 2, 1)]);
    const orta = n * (f + 1);
    rows.push(['En olası toplam', n === 1 ? 'Tüm yüzler eşit olasılıklı' : orta % 2 === 0 ? String(orta / 2) : `${(orta - 1) / 2} ve ${(orta + 1) / 2}`]);
    let note = 'Zarların hilesiz olduğu ve birbirinden bağımsız atıldığı varsayılır.';
    if (t < enK || t > enB) note = `Hedef ${t}, olası toplam aralığının (${enK}–${enB}) dışında. ` + note;
    return { rows, note };
  },
  cases: [
    { in: { zar: '2', yuz: '6', hedef: '7', kosul: 'esit' }, out: { 'Olasılık': '0,166667', 'Yüzde': '%16,6667', 'Uygun durum / tüm durum': '6 / 36', 'Kesir': '1/6', 'Beklenen toplam': '7', 'En olası toplam': '7' } },
    { in: { zar: '3', yuz: '6', hedef: '10', kosul: 'esit' }, out: { 'Olasılık': '0,125', 'Uygun durum / tüm durum': '27 / 216', 'Kesir': '1/8', 'Beklenen toplam': '10,5', 'En olası toplam': '10 ve 11' } },
    { in: { zar: '2', yuz: '6', hedef: '10', kosul: 'enaz' }, out: { 'Uygun durum / tüm durum': '6 / 36', 'Kesir': '1/6' } },
    { in: { zar: '2', yuz: '6', hedef: '4', kosul: 'encok' }, out: { 'Uygun durum / tüm durum': '6 / 36', 'Olasılık': '0,166667' } },
    { in: { zar: '2', yuz: '6', hedef: '2', kosul: 'esit' }, out: { 'Olasılık': '0,0277778', 'Yüzde': '%2,77778', 'Kesir': '1/36', 'Ortalama kaç atışta bir': '36' } },
    { in: { zar: '1', yuz: '6', hedef: '5', kosul: 'enaz' }, out: { 'Kesir': '1/3', 'Olasılık': '0,333333', 'En olası toplam': 'Tüm yüzler eşit olasılıklı' } },
    { in: { zar: '3', yuz: '6', hedef: '9', kosul: 'esit' }, out: { 'Uygun durum / tüm durum': '25 / 216' } },
    { in: { zar: '3', yuz: '6', hedef: '18', kosul: 'esit' }, out: { 'Kesir': '1/216', 'Olasılık': '0,00462963' } },
    { in: { zar: '2', yuz: '20', hedef: '21', kosul: 'esit' }, out: { 'Uygun durum / tüm durum': '20 / 400', 'Kesir': '1/20', 'Olasılık': '0,05' } },
    { in: { zar: '2', yuz: '6', hedef: '13', kosul: 'esit' }, out: { 'Olasılık': '0', 'Kesir': '0', 'Ortalama kaç atışta bir': '—' } },
    { in: { zar: '2', yuz: '6', hedef: '2', kosul: 'enaz' }, out: { 'Olasılık': '1', 'Kesir': '1' } },
    { in: { zar: '0', yuz: '6', hedef: '7', kosul: 'esit' }, error: true },
    { in: { zar: '2', yuz: '6', hedef: '7,5', kosul: 'esit' }, error: true },
    { in: { zar: '25', yuz: '6', hedef: '70', kosul: 'esit' }, error: true },
  ],
  howto: [
    '"Zar sayısı" alanına aynı anda atılan zar adedini yazın (en fazla 20).',
    'Klasik küp zar kullanıyorsanız yüz sayısını 6 bırakın; masaüstü rol yapma oyunlarındaki 4, 8, 10, 12 ya da 20 yüzlü zarlar için değeri değiştirin.',
    '"Hedef toplam" alanına merak ettiğiniz toplamı yazın ve koşulu seçin: tam o değer, en az o değer ya da en çok o değer.',
    '"Hesapla" düğmesine basın. Olasılık ondalık, yüzde ve kesir olarak; uygun diziliş sayısıyla birlikte görünür.',
    'Alt satırlardan beklenen toplamı, en sık gelen toplamı ve bu sonucun ortalama kaç atışta bir görüleceğini okuyun.',
  ],
  sections: [
    { h: 'Zar toplamının olasılığı nasıl bulunur?', p: [
      'Tek bir hilesiz zarda her yüzün gelme olasılığı eşittir: 6 yüzlü zarda 1/6. Birden çok zar atıldığında ise toplamlar eşit olasılıklı değildir, çünkü bazı toplamlara daha çok diziliş karşılık gelir. Doğru yöntem, zarları birbirinden ayırt edilebilir kabul edip bütün sıralı sonuçları saymaktır. Yüz sayısı y, zar sayısı n ise tüm durum sayısı <strong>y<sup>n</sup></strong> olur: iki zarda 36, üç zarda 216, dört zarda 1.296.',
      'Olasılık, hedef toplamı veren dizilişlerin sayısının bu toplam sayıya bölünmesiyle bulunur. Araç, zarları tek tek ekleyerek her toplamın kaç dizilişle elde edildiğini hesaplar; yirmi zara kadar olan durumlarda bile sonuç anında çıkar. "En az" ve "en çok" koşullarında ilgili toplamların diziliş sayıları toplanır.',
    ] },
    { h: 'Çözümlü örnek: iki zarın toplamı 7', p: [
      'İki zar atıldığında 36 sıralı sonuç vardır. Toplamı 7 yapan ikililer (1,6), (2,5), (3,4), (4,3), (5,2) ve (6,1) olmak üzere 6 tanedir. Olasılık 6/36 = 1/6, yani 0,166667 ya da %16,6667\'dir. Bu, iki zarla elde edilebilecek en yüksek olasılıktır; ortalama olarak her altı atıştan birinde 7 gelir.',
      'Aynı zarlarla toplamın en az 10 gelmesi istenirse 10, 11 ve 12 toplamlarının dizilişleri toplanır: 3 + 2 + 1 = 6. Sonuç yine 6/36 = 1/6\'dır. Toplamın 2 gelmesi ise yalnızca (1,1) ile mümkündür: 1/36, yaklaşık %2,78.',
    ] },
    { h: 'İki zar için toplam tablosu', ul: [
      '<strong>2 ve 12:</strong> 1\'er diziliş, olasılık 1/36',
      '<strong>3 ve 11:</strong> 2\'şer diziliş, olasılık 2/36 = 1/18',
      '<strong>4 ve 10:</strong> 3\'er diziliş, olasılık 3/36 = 1/12',
      '<strong>5 ve 9:</strong> 4\'er diziliş, olasılık 4/36 = 1/9',
      '<strong>6 ve 8:</strong> 5\'er diziliş, olasılık 5/36',
      '<strong>7:</strong> 6 diziliş, olasılık 6/36 = 1/6',
    ] },
    { h: 'Üç zar ve ünlü 9 – 10 sorusu', p: [
      'Üç zarda 9 toplamı da 10 toplamı da altı farklı sayı üçlüsüyle yazılabilir; örneğin 9 için 1-2-6, 1-3-5, 1-4-4, 2-2-5, 2-3-4 ve 3-3-3. Buna bakıp iki toplamın eşit sıklıkta gelmesi beklenebilir, oysa 10 daha sık gelir. Nedeni, üçlülerin diziliş sayılarının farklı olmasıdır: üç sayısı da farklı olan bir üçlü 6, iki sayısı aynı olan 3, üçü de aynı olan yalnızca 1 biçimde dizilir.',
      'Sayım yapıldığında 9 için 25, 10 için 27 diziliş bulunur. Yani üç zarda toplamın 10 gelme olasılığı 27/216 = 1/8 = 0,125 iken, 9 gelme olasılığı 25/216, yaklaşık 0,115741\'dir. Araca üç zar ve hedef 10 yazdığınızda tam olarak bu değeri görürsünüz; en olası toplam satırında da 10 ve 11 birlikte listelenir.',
    ] },
    { h: 'Beklenen toplam ve dağılımın biçimi', p: [
      'Bir zarın beklenen değeri yüzlerinin ortalamasıdır: 6 yüzlü zarda (1 + 6) ÷ 2 = 3,5. Zarlar bağımsız olduğundan n zarın beklenen toplamı <strong>n × (y + 1) ÷ 2</strong> olur; iki zar için 7, üç zar için 10,5. Dağılım bu değerin çevresinde simetriktir: iki zarda 6 ile 8, 5 ile 9 aynı olasılığa sahiptir.',
      'Zar sayısı arttıkça toplamlar ortada yığılır ve dağılım çan eğrisine benzemeye başlar. Uç toplamlar hızla seyrekleşir: beş zarın hepsinin 6 gelmesi 7.776 atışta bir görülür.',
    ] },
    { h: 'Oyunlarda kullanım ve sınırlar', p: [
      'Tavlada iki zarın aynı gelmesi (çift) 36 sonucun 6\'sında olur, yani olasılığı 1/6\'dır; belirli bir çiftin, örneğin düşeşin olasılığı ise 1/36\'dır. Bu araç toplamı hesapladığı için düşeş, "toplam 12" olarak sorulabilir; belirli bir sayı çiftinin gelmesi gibi toplam dışı koşullar için genel olasılık aracını kullanın. Kutu oyunlarında ve rol yapma oyunlarında "en az şu kadar atmalıyım" türü sorular "en az" koşuluyla doğrudan yanıtlanır.',
      'Hesap, zarların hilesiz ve atışların bağımsız olduğunu varsayar. Sonuçlar uzun vadeli sıklığı gösterir; tek bir atışın ne geleceğini söylemez. Bu sayfa matematiksel bilgi verir, şans oyunlarında kazanç için dayanak olarak kullanılmamalıdır.',
    ] },
  ],
  faq: [
    ['İki zar atıldığında toplamın 7 gelme olasılığı kaçtır?', '6/36, yani 1/6\'dır; yüzde olarak yaklaşık %16,67. Yedi, iki zarla en çok dizilişe sahip toplamdır.'],
    ['İki zarda en az olası toplam hangisidir?', '2 ve 12 toplamlarıdır. Her biri yalnızca tek dizilişle, (1,1) ve (6,6) ile elde edilir; olasılıkları 1/36\'dır.'],
    ['Düşeş gelme olasılığı nedir?', 'İki zarın ikisinin de 6 gelmesi 36 sonuçtan yalnızca biridir, olasılığı 1/36 ≈ %2,78\'dir. Herhangi bir çift atma olasılığı ise 6/36 = 1/6\'dır.'],
    ['Üç zarda en olası toplam kaçtır?', '10 ve 11 eşit olasılıkla en sık gelen toplamlardır; her birinin olasılığı 27/216 = 1/8\'dir. Beklenen toplam bu ikisinin ortası olan 10,5\'tir.'],
    ['Zarları aynı anda atmakla tek zarı art arda atmak fark eder mi?', 'Hayır. Atışlar bağımsız olduğu sürece iki zarı birlikte atmak ile bir zarı iki kez atıp sonuçları toplamak aynı olasılık dağılımını verir.'],
    ['6 yüzlü olmayan zarlar için de hesap yapabilir miyim?', 'Evet. Yüz sayısı alanına 2 ile 100 arasında bir değer yazabilirsiniz. Örneğin iki adet 20 yüzlü zarda toplamın 21 gelme olasılığı 20/400 = 1/20\'dir.'],
    ['"Ortalama kaç atışta bir" satırı ne anlama gelir?', 'Olasılığın tersidir. 1/36 olasılıklı bir sonuç, çok sayıda atışın ortalamasında 36 atışta bir görülür. Bu, 36. atışta mutlaka geleceği anlamına gelmez; 36 atışta en az bir kez görülme olasılığı yaklaşık %64\'tür.'],
    ['Hesaplama için veri gönderiliyor mu?', 'Hayır. Tüm sayım tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya iletilmez.'],
  ],
  related: ['olasilik-hesapla', 'iki-zar-olasilik-hesapla', 'binom-dagilimi-hesapla', 'kombinasyon-permutasyon', 'rastgele-sayi'],
};
