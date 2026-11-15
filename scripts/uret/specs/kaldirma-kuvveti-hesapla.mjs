export default {
  slug: 'kaldirma-kuvveti-hesapla',
  title: 'Kaldırma Kuvveti Hesaplama',
  h1Tail: 'Arşimet prensibi',
  pageTitle: 'Kaldırma Kuvveti Hesaplama – Arşimet Prensibi ile F = ρ·V·g',
  description: 'Sıvıya batan cisme etki eden kaldırma kuvvetini Arşimet prensibiyle hesaplayın. Su, deniz suyu, cıva ya da özel yoğunluk; yüzer mi batar mı görün.',
  card: 'Batan hacim ve sıvı yoğunluğundan kaldırma kuvvetini bulun; cismin kütlesini yazarsanız yüzme ya da batma durumunu da görün.',
  category: 'bilim',
  keywords: ['kaldırma kuvveti hesaplama', 'arşimet prensibi', 'kaldırma kuvveti formülü', 'sıvıların kaldırma kuvveti', 'yüzme batma koşulu', 'batan hacim', 'görünür ağırlık hesaplama'],
  lead: 'Bir sıvıya ya da gaza daldırılan cisim, yerini aldığı akışkanın ağırlığı kadar bir kuvvetle yukarı itilir. Bu araç <strong>F = ρ · V · g</strong> bağıntısıyla kaldırma kuvvetini hesaplar; cismin kütlesini de yazarsanız net kuvveti ve cismin yukarı mı aşağı mı hareket edeceğini gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sivi', label: 'Akışkan', type: 'select', options: [['su', 'Tatlı su (1000 kg/m³)'], ['deniz', 'Deniz suyu (1025 kg/m³)'], ['civa', 'Cıva (13600 kg/m³)'], ['hava', 'Hava (1,225 kg/m³)'], ['ozel', 'Özel yoğunluk gireceğim']] },
    { id: 'yogunluk', label: 'Özel akışkan yoğunluğu (kg/m³)', type: 'number', placeholder: 'Örn. 920', hint: 'Yalnızca "Özel yoğunluk" seçiliyse kullanılır.' },
    { id: 'hacim', label: 'Cismin batan hacmi', type: 'number', placeholder: 'Örn. 2' },
    { id: 'hBirim', label: 'Hacim birimi', type: 'select', options: [['L', 'Litre (dm³)'], ['m3', 'Metreküp (m³)'], ['cm3', 'Santimetreküp (cm³)']] },
    { id: 'kutle', label: 'Cismin kütlesi (kg, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1', hint: 'Yazarsanız ağırlık ve net kuvvet de hesaplanır.' },
    { id: 'g', label: 'Yer çekimi ivmesi (m/s²)', type: 'number', value: '9,81' },
  ],
  compute(v, h) {
    const tablo = { su: 1000, deniz: 1025, civa: 13600, hava: 1.225 };
    const rho = v.sivi === 'ozel' ? h.pos(v.yogunluk, 'Özel akışkan yoğunluğu') : (tablo[v.sivi] || 1000);
    const carpan = { L: 1e-3, m3: 1, cm3: 1e-6 }[v.hBirim] || 1e-3;
    const V = h.pos(v.hacim, 'Cismin batan hacmi') * carpan;
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const F = rho * V * g;
    const rows = [
      ['Kaldırma kuvveti', h.fmt(F, 4) + ' N'],
      ['Yer değiştiren akışkan kütlesi', h.fmt(rho * V, 6) + ' kg'],
      ['Batan hacim', h.sig(V, 6) + ' m³'],
      ['Akışkan yoğunluğu', h.fmt(rho, 3) + ' kg/m³'],
    ];
    let note = 'Kaldırma kuvveti yalnızca batan hacme ve akışkanın yoğunluğuna bağlıdır; cismin yapıldığı maddeye bağlı değildir.';
    if (String(v.kutle ?? '').trim() !== '') {
      const m = h.pos(v.kutle, 'Cismin kütlesi');
      const W = m * g;
      const net = F - W;
      rows.push(['Cismin ağırlığı', h.fmt(W, 4) + ' N']);
      const yon = Math.abs(net) < 1e-9 ? 'dengede' : net > 0 ? 'yukarı' : 'aşağı';
      rows.push(['Net kuvvet', h.fmt(Math.abs(net), 4) + ' N (' + yon + ')']);
      rows.push(['Dengede yüzmesi için gereken batan hacim', h.sig(m / rho, 6) + ' m³']);
      note = yon === 'yukarı' ? 'Bu batan hacimde kaldırma kuvveti ağırlıktan büyüktür; serbest bırakılan cisim yükselir ve batan hacmi azalarak dengeye gelir.'
        : yon === 'aşağı' ? 'Bu batan hacimde kaldırma kuvveti ağırlığı karşılamıyor. Girilen hacim cismin tüm hacmiyse cisim batar; net kuvvet cismin sıvı içindeki görünür ağırlığıdır.'
          : 'Kaldırma kuvveti ağırlığa eşit; cisim bu batan hacimle dengede kalır.';
    }
    return { rows, note };
  },
  cases: [
    { in: { sivi: 'su', hacim: '1', hBirim: 'L', g: '9,81' }, out: { 'Kaldırma kuvveti': '9,81 N', 'Yer değiştiren akışkan kütlesi': '1 kg', 'Batan hacim': '0,001 m³' } },
    { in: { sivi: 'su', hacim: '2', hBirim: 'L', kutle: '1', g: '9,81' }, out: { 'Kaldırma kuvveti': '19,62 N', 'Cismin ağırlığı': '9,81 N', 'Net kuvvet': '9,81 N (yukarı)', 'Dengede yüzmesi için gereken batan hacim': '0,001 m³' } },
    { in: { sivi: 'civa', hacim: '10', hBirim: 'cm3', g: '9,81' }, out: { 'Kaldırma kuvveti': '1,3342 N' } },
    { in: { sivi: 'deniz', hacim: '0,5', hBirim: 'm3', g: '9,81' }, out: { 'Kaldırma kuvveti': '5.027,625 N', 'Yer değiştiren akışkan kütlesi': '512,5 kg' } },
    { in: { sivi: 'su', hacim: '1', hBirim: 'L', kutle: '3', g: '9,81' }, out: { 'Net kuvvet': '19,62 N (aşağı)' } },
    { in: { sivi: 'hava', hacim: '2', hBirim: 'm3', g: '9,81' }, out: { 'Kaldırma kuvveti': '24,0345 N' } },
    { in: { sivi: 'ozel', yogunluk: '800', hacim: '5', hBirim: 'L', kutle: '4', g: '10' }, out: { 'Kaldırma kuvveti': '40 N', 'Net kuvvet': '0 N (dengede)' } },
    { in: { sivi: 'su', hacim: '0', hBirim: 'L', g: '9,81' }, error: true },
    { in: { sivi: 'ozel', yogunluk: '', hacim: '1', hBirim: 'L', g: '9,81' }, error: true },
  ],
  howto: [
    'Cismin içinde bulunduğu akışkanı seçin. Listede yoksa "Özel yoğunluk" seçip yoğunluğu kg/m³ olarak yazın.',
    'Cismin akışkanın içinde kalan hacmini yazın ve birimini seçin. Tamamen batmış cisimde bu, cismin tüm hacmidir; yüzen cisimde yalnızca su altında kalan kısımdır.',
    'İsterseniz cismin kütlesini kilogram olarak girin; böylece ağırlık, net kuvvet ve dengede yüzmesi için gereken batan hacim de hesaplanır.',
    'Yer çekimi ivmesi 9,81 m/s² olarak hazır gelir. Sınav sorularında 10 alınması isteniyorsa değiştirin.',
    '"Hesapla" düğmesine basın ve sonuç satırlarını inceleyin.',
  ],
  sections: [
    { h: 'Arşimet prensibi', p: [
      'Antik Yunan bilgini Arşimet\'e atfedilen ilke şöyle özetlenir: bir akışkana kısmen ya da tamamen daldırılan cisim, yerini değiştirdiği akışkanın ağırlığına eşit büyüklükte, yukarı yönlü bir kuvvetle itilir. Bu kuvvetin kaynağı basınç farkıdır. Sıvı içinde derinlik arttıkça basınç arttığından cismin alt yüzeyine etkiyen basınç üst yüzeyine etkiyenden büyüktür; aradaki fark net bir yukarı itme doğurur.',
      'Formül <strong>F = ρ · V · g</strong> biçimindedir. ρ akışkanın yoğunluğu (kg/m³), V cismin akışkan içinde kalan hacmi (m³), g yer çekimi ivmesidir (m/s²). Sonuç newton cinsinden çıkar. Dikkat edilmesi gereken nokta, formüldeki yoğunluğun <em>cismin değil akışkanın</em> yoğunluğu olmasıdır. Aynı hacimdeki demir bilye ile tahta bilye suya tamamen batırıldığında ikisine de aynı kaldırma kuvveti etki eder; farklı davranmalarının nedeni ağırlıklarının farklı olmasıdır.',
    ] },
    { h: 'Yüzme, askıda kalma ve batma', p: [
      'Cismin ne yapacağını kaldırma kuvveti ile ağırlığın karşılaştırması belirler. Bunu yoğunluklar üzerinden söylemek daha pratiktir:',
    ], ul: [
      '<strong>Cismin yoğunluğu akışkandan küçükse</strong> cisim yüzer. Dengede batan hacim, cismin kütlesinin akışkan yoğunluğuna bölümüdür; cismin hacminin ancak bir kısmı sıvıya girer.',
      '<strong>Yoğunluklar eşitse</strong> cisim sıvının içinde bırakıldığı yerde askıda kalır.',
      '<strong>Cismin yoğunluğu akışkandan büyükse</strong> cisim batar. Dibe oturduğunda ağırlığın kaldırma kuvvetiyle karşılanmayan kısmını zemin taşır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Hacmi 1 litre olan bir cisim suya tamamen batırılıyor. V = 0,001 m³, ρ = 1000 kg/m³, g = 9,81 m/s² için F = 1000 × 0,001 × 9,81 = 9,81 N. Yer değiştiren su 1 kg\'dır ve kaldırma kuvveti tam olarak bu suyun ağırlığıdır.',
      '<strong>Örnek 2:</strong> Hacmi 2 litre, kütlesi 1 kg olan kapalı bir plastik kap suya tamamen bastırılıyor. Kaldırma kuvveti 1000 × 0,002 × 9,81 = 19,62 N, ağırlık 1 × 9,81 = 9,81 N\'dur. Net kuvvet 9,81 N yukarı yönlüdür; kabı su altında tutmak için bu kadar kuvvetle bastırmak gerekir. Serbest bırakılırsa yükselir ve yalnızca 1 litresi su altında kalacak biçimde yüzer.',
      '<strong>Örnek 3:</strong> 10 cm³ hacimli bir çelik bilye cıvaya batırılıyor. F = 13600 × 0,00001 × 9,81 = 1,334 N. Bilyenin kütlesi yaklaşık 78 gram, ağırlığı yaklaşık 0,77 N olduğundan kaldırma kuvveti ağırlıktan büyüktür; çelik cıvada yüzer.',
      '<strong>Örnek 4:</strong> 0,5 m³ hacmi deniz suyunda kalan bir şamandıraya 1025 × 0,5 × 9,81 = 5027,6 N kaldırma kuvveti etki eder; bu, 512,5 kg kütlenin ağırlığına karşılık gelir.',
    ] },
    { h: 'Görünür ağırlık', p: [
      'Sıvıya batırılmış bir cismi dinamometreyle tartarsanız havadaki değerinden daha küçük bir değer okursunuz. Aradaki fark kaldırma kuvvetidir: <strong>görünür ağırlık = gerçek ağırlık − kaldırma kuvveti</strong>. Havuzda birini kucaklamanın karada kucaklamaktan çok daha kolay olması bundandır. Aynı yöntem, biçimi düzgün olmayan bir cismin hacmini ve yoğunluğunu bulmak için de kullanılır: havadaki ve sudaki tartım farkı kaldırma kuvvetini, o da batan hacmi verir.',
      'Kütle alanını doldurduğunuzda ve girdiğiniz hacim cismin tüm hacmi olduğunda, "Net kuvvet" satırındaki aşağı yönlü değer cismin sıvı içindeki görünür ağırlığıdır.',
    ] },
    { h: 'Gündelik örnekler', p: [
      'Çelikten yapılmış gemilerin yüzmesi ilk bakışta şaşırtıcıdır, çünkü çelik sudan yaklaşık sekiz kat yoğundur. Ancak gemi içi boş bir kabuktur; toplam kütlesinin toplam hacmine oranı, yani ortalama yoğunluğu sudan küçüktür. Yük alındıkça gemi biraz daha batar ve daha çok su yer değiştirerek artan ağırlığı dengeler. Deniz suyu tatlı sudan daha yoğun olduğundan aynı gemi denizde nehre göre biraz daha yüksekte yüzer; insanların tuzlu suda daha kolay su üstünde kalması da aynı nedene dayanır.',
      'Denizaltılar balast tanklarına su alıp boşaltarak ortalama yoğunluklarını değiştirir. Sıcak hava balonlarında akışkan havadır: balonun içindeki ısıtılmış hava dışarıdaki soğuk havadan daha az yoğun olduğundan toplam ağırlık, yer değiştiren havanın ağırlığının altına düşer ve balon yükselir. Buzun yoğunluğu sudan yaklaşık yüzde on küçük olduğu için buzdağlarının büyük kısmı su altında kalır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap, akışkanın yoğunluğunun her yerde aynı olduğunu ve cismin durgun akışkan içinde bulunduğunu varsayar. Listedeki yoğunluklar tipik değerlerdir; suyun yoğunluğu sıcaklıkla, deniz suyununki tuzlulukla, havanınki sıcaklık ve yükseklikle değişir. Daha doğru sonuç için kendi yoğunluk değerinizi yazın. Araç, kabın dibine tam yapışmış cisimler, yüzey gerilimi ve akış kaynaklı kuvvetleri hesaba katmaz. Tekne, duba ya da can kurtarma ekipmanı gibi güvenlikle ilgili tasarımlarda sonuç yalnızca ön fikir verir; yetkili mühendis hesabı gerekir.',
    ] },
  ],
  faq: [
    ['Kaldırma kuvveti formülü nedir?', 'F = ρ · V · g. ρ akışkanın yoğunluğu, V cismin akışkan içindeki hacmi, g yer çekimi ivmesidir. Sonuç newton birimindedir ve yer değiştiren akışkanın ağırlığına eşittir.'],
    ['Kaldırma kuvveti cismin ağırlığına bağlı mıdır?', 'Hayır. Yalnızca batan hacme, akışkanın yoğunluğuna ve yer çekimi ivmesine bağlıdır. Ağırlık, cismin yüzüp batacağını ve yüzüyorsa ne kadarının batacağını belirler.'],
    ['Cisim daha derine indikçe kaldırma kuvveti artar mı?', 'Tamamen batmış ve sıkışmayan bir cisim için hayır. Derinlikle hem alt hem üst yüzeydeki basınç artar, ama aralarındaki fark aynı kalır. Kuvvet ancak batan hacim ya da sıvı yoğunluğu değişirse değişir.'],
    ['Yüzen bir cisme etki eden kaldırma kuvveti ne kadardır?', 'Dengede yüzen cisimde kaldırma kuvveti cismin ağırlığına eşittir. Kütleyi girdiğinizde araç, bu dengeyi sağlayan batan hacmi ayrı bir satırda verir.'],
    ['Batan hacmi bilmiyorsam ne yapmalıyım?', 'Cisim tamamen batmışsa kendi hacmini kullanın. Düzgün biçimli cisimlerde hacmi boyutlardan hesaplayabilir, düzensiz cisimlerde dereceli kaptaki su seviyesinin yükselmesinden okuyabilirsiniz. Yüzen cisimde batan hacim, kütlenin sıvı yoğunluğuna bölümüdür.'],
    ['Havada da kaldırma kuvveti var mıdır?', 'Evet, hava da bir akışkandır. Ancak yoğunluğu çok küçük olduğundan kuvvet de küçüktür: 2 m³ hacimli bir cisme deniz seviyesinde yaklaşık 24 N etki eder. Balon ve zeplinler bu kuvvetle yükselir.'],
    ['Litreyi metreküpe nasıl çeviririm?', '1 litre 0,001 metreküptür; 1 santimetreküp ise 0,000001 metreküptür. Hacim birimini listeden seçtiğinizde dönüşümü araç yapar ve kullandığı metreküp değerini sonuçta gösterir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['hidrostatik-basinc-hesapla', 'yogunluk-hesapla', 'basinc-hesapla', 'kutle-agirlik-hesapla', 'kuvvet-hesapla'],
};
