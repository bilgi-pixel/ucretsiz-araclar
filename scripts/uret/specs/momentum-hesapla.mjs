export default {
  slug: 'momentum-hesapla',
  title: 'Momentum Hesaplama',
  h1Tail: 'p = m · v',
  pageTitle: 'Momentum Hesaplama – p = m·v ile Momentum, Kütle ve Hız Bulma',
  description: 'Kütle ve hızdan çizgisel momentumu hesaplayın ya da momentumdan kütleyi, hızı bulun. p = m·v formülü, kinetik enerji karşılığı ve çözümlü örneklerle.',
  card: 'p = m·v formülüyle momentumu, kütleyi ya da hızı bulun; aynı cismin kinetik enerjisini de birlikte görün.',
  category: 'bilim',
  keywords: ['momentum hesaplama', 'momentum formülü', 'p = m v', 'çizgisel momentum', 'momentum nasıl bulunur', 'momentum birimi', 'momentumdan hız bulma'],
  lead: `Bir cismin <strong>çizgisel momentumunu</strong> kütlesinden ve hızından hesaplayın; isterseniz momentumu bilinen cismin kütlesini ya da hızını bulun. Araç <strong>p = m · v</strong> bağıntısını kullanır ve aynı cismin kinetik enerjisini de gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['p', 'Momentum (p)'], ['m', 'Kütle (m)'], ['v', 'Hız (v)']] },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 2', hint: 'Kütleyi arıyorsanız boş bırakın.' },
    { id: 'hiz', label: 'Hız (m/s)', type: 'number', placeholder: 'Örn. 3', hint: 'Ters yön için eksi işaretli yazabilirsiniz. Hızı arıyorsanız boş bırakın.' },
    { id: 'momentum', label: 'Momentum (kg·m/s)', type: 'number', placeholder: 'Örn. 6', hint: 'Momentumu arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    let m, hiz, p;
    if (v.bul === 'm') {
      p = h.num(v.momentum, 'Momentum');
      hiz = h.num(v.hiz, 'Hız');
      if (hiz === 0) h.err('Hız sıfırken kütle bulunamaz; sıfırdan farklı bir hız yazın.');
      m = p / hiz;
      if (!(m > 0)) h.err('Momentum ile hız aynı işaretli olmalı; aksi halde kütle negatif çıkar.');
    } else if (v.bul === 'v') {
      p = h.num(v.momentum, 'Momentum');
      m = h.pos(v.kutle, 'Kütle');
      hiz = p / m;
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hiz = h.num(v.hiz, 'Hız');
      p = m * hiz;
    }
    const ek = 0.5 * m * hiz * hiz;
    const satirlar = {
      p: ['Momentum', h.fmt(p, 4) + ' kg·m/s'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      v: ['Hız', h.fmt(hiz, 4) + ' m/s'],
    };
    const sira = v.bul === 'm' ? ['m', 'p', 'v'] : v.bul === 'v' ? ['v', 'p', 'm'] : ['p', 'm', 'v'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Hız (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Kinetik enerji', h.fmt(ek, 4) + ' J'],
      ],
      note: 'Momentum vektörel bir büyüklüktür; eksi işaret, seçtiğiniz pozitif yönün tersini gösterir. 1 kg·m/s = 1 N·s.',
    };
  },
  cases: [
    { in: { bul: 'p', kutle: '2', hiz: '3' }, out: { 'Momentum': '6 kg·m/s', 'Kinetik enerji': '9 J' } },
    { in: { bul: 'v', kutle: '4', momentum: '10' }, out: { 'Hız': '2,5 m/s', 'Hız (km/sa)': '9 km/sa', 'Kinetik enerji': '12,5 J' } },
    { in: { bul: 'm', hiz: '6', momentum: '30' }, out: { 'Kütle': '5 kg', 'Kinetik enerji': '90 J' } },
    { in: { bul: 'p', kutle: '1200', hiz: '20' }, out: { 'Momentum': '24.000 kg·m/s', 'Hız (km/sa)': '72 km/sa', 'Kinetik enerji': '240.000 J' } },
    { in: { bul: 'p', kutle: '0,145', hiz: '40' }, out: { 'Momentum': '5,8 kg·m/s', 'Kinetik enerji': '116 J' } },
    { in: { bul: 'p', kutle: '3', hiz: '-4' }, out: { 'Momentum': '-12 kg·m/s', 'Kinetik enerji': '24 J' } },
    { in: { bul: 'p', kutle: '0', hiz: '5' }, error: true },
    { in: { bul: 'm', hiz: '0', momentum: '10' }, error: true },
    { in: { bul: 'v', kutle: '2', momentum: '' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden neyi aradığınızı seçin: momentum, kütle ya da hız.`,
    `Bildiğiniz iki değeri ilgili kutulara yazın. Kütle kilogram, hız metre bölü saniye, momentum kg·m/s cinsinden olmalıdır; aranan büyüklüğün kutusunu boş bırakabilirsiniz.`,
    `Cisim seçtiğiniz pozitif yönün tersine gidiyorsa hızı eksi işaretli yazın; momentum da eksi çıkar.`,
    `"Hesapla" düğmesine basın. Sonuç kutusunda aranan büyüklük ilk satırda, hızın km/sa karşılığı ve kinetik enerji alt satırlarda görünür.`,
  ],
  sections: [
    { h: 'Momentum nedir?', p: [
      `Momentum, hareket eden bir cismin "durdurulmasının ne kadar zor olduğunu" anlatan büyüklüktür ve kütle ile hızın çarpımına eşittir. Türkçe ders kitaplarında <em>çizgisel momentum</em> ya da eski adıyla <em>hareket miktarı</em> olarak geçer, simgesi <strong>p</strong> harfidir. Aynı hızla giden bir kamyon ile bir bisikleti düşünün: kamyonun kütlesi çok daha büyük olduğu için momentumu da büyüktür ve onu durdurmak için çok daha büyük bir kuvvet ya da çok daha uzun bir süre gerekir.`,
      `Momentum vektörel bir büyüklüktür; yönü hızın yönüyle aynıdır. Tek boyutlu sorularda bir yön pozitif seçilir, ters yöndeki hızlar ve momentumlar eksi işaretle yazılır. Araç da bu yüzden hız kutusunda negatif değer kabul eder.`,
    ] },
    { h: 'Formül ve birimler', p: [
      `Temel bağıntı <strong>p = m · v</strong> biçimindedir. Kütle kilogram, hız metre bölü saniye alındığında momentumun birimi <strong>kg·m/s</strong> olur. Bu birim newton saniyeye (N·s) eşittir; çünkü 1 N = 1 kg·m/s² olduğundan saniyeyle çarpılınca kg·m/s kalır. Formül üç biçimde kullanılabilir: <code>p = m · v</code>, <code>m = p ÷ v</code> ve <code>v = p ÷ m</code>.`,
      `Hız km/sa olarak verilmişse önce 3,6'ya bölerek m/s birimine çevirin: 72 km/sa, 20 m/s eder. Kütle gram olarak verilmişse 1000'e bölün: 145 g, 0,145 kg'dır. Birimleri çevirmeden yapılan çarpma, sınavlarda en sık görülen hatadır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 2 kg kütleli bir cisim 3 m/s hızla hareket ediyor. Momentumu p = 2 × 3 = <strong>6 kg·m/s</strong> olur. Aynı cismin kinetik enerjisi ½ × 2 × 3² = 9 J'dür.`,
      `<strong>Örnek 2:</strong> 1200 kg kütleli bir otomobil 72 km/sa hızla gidiyor. Hız 72 ÷ 3,6 = 20 m/s olduğundan p = 1200 × 20 = <strong>24.000 kg·m/s</strong> bulunur.`,
      `<strong>Örnek 3:</strong> Momentumu 10 kg·m/s olan 4 kg'lık bir arabanın hızı v = 10 ÷ 4 = <strong>2,5 m/s</strong>, yani 9 km/sa'tir.`,
      `<strong>Örnek 4:</strong> 6 m/s hızla giden bir cismin momentumu 30 kg·m/s ise kütlesi m = 30 ÷ 6 = <strong>5 kg</strong> olur.`,
    ] },
    { h: 'Momentum ile kinetik enerji arasındaki fark', p: [
      `İki büyüklük de kütle ve hıza bağlıdır ama aynı şey değildir. Momentum hızla doğru orantılıyken kinetik enerji hızın karesiyle orantılıdır: hız iki katına çıkınca momentum iki, kinetik enerji dört katına çıkar. Momentum yönlüdür, kinetik enerji ise yönsüz (skaler) ve her zaman pozitiftir. İkisi arasında <strong>E<sub>k</sub> = p² ÷ (2m)</strong> bağıntısı vardır; araç bu yüzden sonuçta kinetik enerjiyi de verir.`,
      `Bu fark çarpışma sorularında önem kazanır. Dış kuvvetlerin ihmal edildiği her çarpışmada toplam momentum korunur; kinetik enerji ise yalnızca tam esnek çarpışmalarda korunur. Yapışarak birlikte hareket eden cisimlerde enerjinin bir kısmı ısıya ve şekil değişimine gider, momentum yine de aynı kalır.`,
    ] },
    { h: 'Momentumun korunumu ve itme', p: [
      `Bir sisteme dışarıdan net kuvvet etki etmiyorsa sistemin toplam momentumu değişmez. Durgun bir tüfekten mermi çıktığında tüfeğin geri tepmesi, buz üstünde birbirini iten iki patencinin zıt yönlere kayması ve roketin yakıtı geriye püskürterek ileri gitmesi bu ilkeyle açıklanır.`,
      `Bir cismin momentumunu değiştirmek için ona belirli bir süre kuvvet uygulamak gerekir. Kuvvet ile sürenin çarpımına <em>itme</em> (impuls) denir ve momentumdaki değişime eşittir: F · Δt = Δp. Hava yastığının ve emniyet kemerinin mantığı budur; aynı momentum değişimi daha uzun sürede gerçekleştiği için cisme etki eden ortalama kuvvet küçülür.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Hızı km/sa olarak bırakıp doğrudan kütleyle çarpmak; sonuç 3,6 kat büyük çıkar.`,
      `Ters yönde giden cismin momentumunu pozitif almak; çarpışma sorularında toplam yanlış hesaplanır.`,
      `Momentumu kuvvetle karıştırmak; momentum hareketin ölçüsüdür, kuvvet ise momentumun birim zamandaki değişimidir.`,
      `Kütle yerine ağırlığı (newton) yazmak; formülde kilogram cinsinden kütle kullanılır.`,
      `Bu araç klasik (Newton) mekaniğine göre hesap yapar. Işık hızına yakın hızlarda göreli momentum bağıntısı gerekir ve p = m·v sonucu doğru olmaz.`,
    ] },
  ],
  faq: [
    ['Momentum formülü nedir?', `Çizgisel momentum, kütle ile hızın çarpımıdır: p = m · v. Kütle kilogram, hız m/s alındığında sonuç kg·m/s biriminde çıkar.`],
    ['Momentumun birimi nedir?', `SI birim sisteminde momentumun birimi kilogram metre bölü saniyedir (kg·m/s). Bu birim newton saniyeye (N·s) eşittir ve itme büyüklüğüyle aynı birimi paylaşır.`],
    ['Momentum negatif olabilir mi?', `Evet. Momentum vektörel olduğu için seçilen pozitif yönün tersine hareket eden cismin momentumu eksi işaretle gösterilir. Eksi işaret büyüklüğün küçük olduğunu değil, yönün ters olduğunu anlatır.`],
    ['Duran bir cismin momentumu var mıdır?', `Hayır. Hız sıfır olduğunda p = m · 0 = 0 olur. Cismin kütlesi ne kadar büyük olursa olsun, hareket etmiyorsa çizgisel momentumu sıfırdır.`],
    ['Hız iki katına çıkarsa momentum nasıl değişir?', `Kütle sabitken momentum hızla doğru orantılıdır; hız iki katına çıkınca momentum da iki katına çıkar. Kinetik enerji ise dört katına çıkar, çünkü hızın karesine bağlıdır.`],
    ['Momentumdan kinetik enerji nasıl bulunur?', `Kinetik enerji, momentumun karesinin kütlenin iki katına bölünmesiyle bulunur: E = p² ÷ (2m). Örneğin 6 kg·m/s momentumlu 2 kg'lık cisim için 36 ÷ 4 = 9 J eder.`],
    ['Hızı km/sa olarak yazabilir miyim?', `Hız kutusu m/s bekler. Değeriniz km/sa ise 3,6'ya bölüp yazın; örneğin 90 km/sa 25 m/s'dir. Sonuç kutusunda hızın km/sa karşılığı ayrıca gösterilir.`],
    ['Girdiğim değerler kaydediliyor mu?', `Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['itme-hesapla', 'carpisma-hesapla', 'kinetik-enerji-hesapla', 'kuvvet-hesapla', 'ivme-hesapla'],
};
