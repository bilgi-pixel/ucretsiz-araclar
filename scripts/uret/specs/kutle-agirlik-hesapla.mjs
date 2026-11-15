export default {
  slug: 'kutle-agirlik-hesapla',
  title: 'Kütleden Ağırlık Hesaplama',
  h1Tail: 'G = m · g',
  pageTitle: 'Kütleden Ağırlık Hesaplama – G = m·g ile Newton Cinsinden Ağırlık',
  description: 'Kilogram cinsinden kütleyi newton cinsinden ağırlığa ya da ağırlığı kütleye çevirin. Yer çekimi ivmesini değiştirebilir, kgf ve lbf karşılıklarını görebilirsiniz.',
  card: 'Kütleyi newton cinsinden ağırlığa, ağırlığı kütleye çevirin; çekim ivmesi ayarlanabilir, kgf ve lbf karşılığı gösterilir.',
  category: 'bilim',
  keywords: ['kütle ağırlık hesaplama', 'ağırlık formülü', 'kg newton çevirme', 'G = m.g', '1 kg kaç newton', 'newton kaç kg', 'ağırlık hesaplama fizik'],
  lead: `Bir cismin kütlesinden ağırlığını ya da ağırlığından kütlesini <strong>G = m × g</strong> bağıntısıyla hesaplayın. Sonuç newton olarak verilir; kilogram-kuvvet ve pound-kuvvet karşılıkları da gösterilir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yon', label: 'Hesap yönü', type: 'select', options: [['ka', 'Kütle (kg) → Ağırlık (N)'], ['ak', 'Ağırlık (N) → Kütle (kg)']] },
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 10', hint: 'Seçtiğiniz yöne göre kilogram ya da newton.' },
    { id: 'g', label: 'Çekim ivmesi g (m/s²)', type: 'number', value: '9,81', hint: 'Ders sorularında 10, hassas hesapta 9,80665 kullanılabilir.' },
  ],
  compute(v, h) {
    const G0 = 9.80665, LBF = 4.4482216152605, LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Değer');
    const g = h.pos(v.g, 'Çekim ivmesi');
    const ters = v.yon === 'ak';
    const m = ters ? x / g : x;
    const W = ters ? x : x * g;
    const a = ['Ağırlık', h.fmt(W, 5) + ' N'];
    const k = ['Kütle', h.fmt(m, 5) + ' kg'];
    return {
      rows: [
        ters ? k : a,
        ters ? a : k,
        ['Ağırlık (kilogram-kuvvet)', h.fmt(W / G0, 3) + ' kgf'],
        ['Ağırlık (pound-kuvvet)', h.fmt(W / LBF, 3) + ' lbf'],
        ['Ağırlık (kilonewton)', h.fmt(W / 1000, 6) + ' kN'],
        ['Kütle (pound)', h.fmt(m / LB, 3) + ' lb'],
      ],
      note: 'G = m × g. 1 kgf = 9,80665 N ve 1 lbf ≈ 4,44822 N alınmıştır. Kilogram-kuvvet değeri, seçtiğiniz g standart değerden farklıysa kütleyle aynı sayı çıkmaz.',
    };
  },
  cases: [
    { in: { yon: 'ka', deger: '10', g: '9,81' }, out: { 'Ağırlık': '98,1 N', 'Kütle': '10 kg', 'Ağırlık (kilogram-kuvvet)': '10,003 kgf' } },
    { in: { yon: 'ak', deger: '490,5', g: '9,81' }, out: { 'Kütle': '50 kg', 'Ağırlık': '490,5 N' } },
    { in: { yon: 'ka', deger: '50', g: '10' }, out: { 'Ağırlık': '500 N', 'Ağırlık (kilonewton)': '0,5 kN' } },
    { in: { yon: 'ka', deger: '1', g: '9,80665' }, out: { 'Ağırlık': '9,80665 N', 'Ağırlık (kilogram-kuvvet)': '1 kgf', 'Ağırlık (pound-kuvvet)': '2,205 lbf', 'Kütle (pound)': '2,205 lb' } },
    { in: { yon: 'ka', deger: '70', g: '1,62' }, out: { 'Ağırlık': '113,4 N' } },
    { in: { yon: 'ak', deger: '686,7', g: '9,81' }, out: { 'Kütle': '70 kg' } },
    { in: { yon: 'ka', deger: '0', g: '9,81' }, out: { 'Ağırlık': '0 N' } },
    { in: { yon: 'ka', deger: '-5', g: '9,81' }, error: true },
    { in: { yon: 'ka', deger: '10', g: '0' }, error: true },
  ],
  howto: [
    `"Hesap yönü" listesinden kütleden ağırlığa mı yoksa ağırlıktan kütleye mi gideceğinizi seçin.`,
    `"Değer" alanına kütleyi kilogram ya da ağırlığı newton olarak yazın. Gram cinsinden bir kütleniz varsa önce 1000'e bölerek kilograma çevirin.`,
    `Çekim ivmesi varsayılan olarak 9,81 m/s² gelir. Sorunuzda 10 ya da 9,8 verilmişse veya başka bir gök cismi için hesap yapıyorsanız bu alanı değiştirin.`,
    `"Hesapla" düğmesine basın; ağırlık, kütle ve diğer kuvvet birimlerindeki karşılıklar listelenir.`,
  ],
  sections: [
    { h: 'Kütle ve ağırlık arasındaki fark', p: [
      `Kütle, bir cismin sahip olduğu madde miktarıdır; birimi kilogramdır ve eşit kollu teraziyle ölçülür. Cismi Dünya'dan Ay'a, kutuplardan ekvatora taşısanız da kütlesi değişmez. Kütle skaler bir büyüklüktür, yani yönü yoktur.`,
      `Ağırlık ise bir cisme etki eden yer çekimi kuvvetidir. Kuvvet olduğu için birimi newtondur, dinamometreyle ölçülür ve yönü her zaman çekim merkezine, pratikte aşağıya doğrudur. Ağırlık bulunduğunuz yere göre değişir: aynı cisim kutuplarda ekvatora göre biraz daha ağır, yüksek bir dağın tepesinde deniz kıyısına göre biraz daha hafiftir.`,
      `Gündelik hayatta "ağırlığım 70 kilo" dense de bu aslında kütledir. Manavdaki terazi de, banyo tartısı da kilogram gösterecek biçimde ayarlanmıştır. Fizik ve mühendislik hesaplarında ise kuvvet gerektiğinde kütlenin newtona çevrilmesi şarttır.`,
    ] },
    { h: 'Formül', p: [
      `Ağırlık, kütle ile çekim ivmesinin çarpımıdır: <strong>G = m × g</strong>. Bazı kaynaklarda ağırlık W ya da P harfiyle gösterilir. Tersinden kütle, ağırlığın çekim ivmesine bölünmesiyle bulunur: <strong>m = G ÷ g</strong>. Bu bağıntı, Newton'ın ikinci yasası olan F = m × a ifadesinin ivme yerine çekim ivmesi konmuş özel hâlidir.`,
      `Kütle kilogram, ivme metre bölü saniye kare alındığında sonuç newton çıkar. 1 newton, 1 kilogramlık kütleye 1 m/s² ivme kazandıran kuvvettir. Yaklaşık 100 gramlık bir cismin, örneğin küçük bir elmanın ağırlığı Dünya'da 1 newtona yakındır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 10 kg kütleli bir çantanın ağırlığı g = 9,81 m/s² için G = 10 × 9,81 = 98,1 N'dur.`,
      `<strong>Örnek 2:</strong> Dinamometrede 490,5 N okunan bir cismin kütlesi m = 490,5 ÷ 9,81 = 50 kg bulunur.`,
      `<strong>Örnek 3:</strong> Soruda g = 10 m/s² verilmişse 50 kg kütleli bir cismin ağırlığı 50 × 10 = 500 N, yani 0,5 kN olur.`,
      `<strong>Örnek 4:</strong> 70 kg kütleli bir astronotun Ay'daki ağırlığını bulmak için çekim ivmesine 1,62 yazılır: 70 × 1,62 = 113,4 N.`,
    ] },
    { h: 'Hangi g değeri kullanılmalı?', p: [
      `Yer çekimi ivmesi Dünya üzerinde her yerde aynı değildir; enleme ve yüksekliğe göre yaklaşık 9,78 ile 9,83 m/s² arasında değişir. Uluslararası kabul edilen standart değer 9,80665 m/s²'dir. Okul sorularında ve mühendislik ön hesaplarında 9,81 ya da 9,8 kullanılır; işlem kolaylığı istenen sorularda 10 alınır. Hangi değeri kullanacağınız sorunun ya da şartnamenin size verdiği değere bağlıdır.`,
    ], ul: [
      `<strong>g = 9,80665:</strong> 1 kg → 9,80665 N (standart)`,
      `<strong>g = 9,81:</strong> 1 kg → 9,81 N; 75 kg → 735,75 N`,
      `<strong>g = 10:</strong> 1 kg → 10 N; 75 kg → 750 N`,
      `<strong>Ay (1,62):</strong> 75 kg → 121,5 N`,
    ] },
    { h: 'Kilogram-kuvvet ve pound-kuvvet', p: [
      `Kilogram-kuvvet (kgf), 1 kilogramlık kütlenin standart yer çekiminde uyguladığı kuvvettir ve tam olarak 9,80665 newtona eşittir. Eski teknik çizimlerde, basınç göstergelerinde ve bazı yük etiketlerinde hâlâ karşınıza çıkar. Bir halatın "200 kgf" taşıdığı yazıyorsa bu yaklaşık 1.961 newtonluk bir kuvvettir.`,
      `Pound-kuvvet (lbf) ABD kaynaklı belgelerde kullanılır ve yaklaşık 4,448 newtondur. Araç, bulduğu ağırlığı bu birimlere de çevirir; böylece yabancı kaynaklı bir katalogdaki yük değerini kendi hesabınızla karşılaştırabilirsiniz.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Kütleyi gram olarak bırakmak. Formülde kütle kilogram olmalıdır; 250 g için 0,25 yazın.`,
      `Ağırlığın birimini kilogram yazmak. Ağırlık bir kuvvettir ve newtonla ifade edilir.`,
      `Sorudaki g değerini görmezden gelmek. Soruda g = 10 verilmişken 9,81 kullanmak şıklarla uyuşmayan sonuç verir.`,
      `Ağırlık ile görünür ağırlığı karıştırmak. Asansörde ya da sıvı içinde tartının gösterdiği değer değişse de cismin gerçek ağırlığı m × g'dir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç, cismin yüzeyde ve durgun olduğunu, çekim ivmesinin de yazdığınız değerde sabit kaldığını varsayar. Havanın kaldırma kuvveti, Dünya'nın dönmesinin etkisi ve yükseklikle değişim hesaba katılmaz. Yük taşıma, askı, vinç ya da yapı hesabı gibi güvenlikle ilgili işlerde sonuçlar yalnızca ön bilgi olarak kullanılmalı, karar için yetkili bir mühendise danışılmalıdır.`,
    ] },
  ],
  faq: [
    ['1 kilogram kaç newtondur?', `Kilogram kütle, newton kuvvet birimi olduğu için doğrudan çevrilmez; ama 1 kg kütleli bir cismin Dünya'daki ağırlığı yaklaşık 9,81 newtondur. Çekim ivmesi 10 alınırsa 10 newton olarak hesaplanır.`],
    ['Ağırlık formülü nedir?', `Ağırlık, kütle ile çekim ivmesinin çarpımıdır: G = m × g. Kütle kilogram, g metre bölü saniye kare alınır ve sonuç newton çıkar.`],
    ['Newton cinsinden ağırlıktan kütleyi nasıl bulurum?', `Ağırlığı çekim ivmesine bölersiniz. Örneğin 686,7 N ağırlığındaki bir cismin kütlesi 686,7 ÷ 9,81 = 70 kg eder. Araçta hesap yönünü "Ağırlık → Kütle" seçmeniz yeterlidir.`],
    ['Kütle neyle, ağırlık neyle ölçülür?', `Kütle eşit kollu teraziyle, ağırlık dinamometreyle (yaylı el kantarı) ölçülür. Terazi iki kütleyi karşılaştırdığı için her yerde aynı sonucu verir; dinamometre kuvvet ölçtüğü için çekim ivmesine göre değişir.`],
    ['Ağırlık Dünya üzerinde her yerde aynı mıdır?', `Hayır. Dünya tam küre olmadığı ve döndüğü için çekim ivmesi kutuplarda biraz daha büyük, ekvatorda biraz daha küçüktür. Yükseğe çıkıldıkça da azalır. Fark yüzde yarımın altında olduğundan gündelik hayatta hissedilmez.`],
    ['kgf ile kg aynı şey midir?', `Hayır. kg kütle birimidir, kgf ise kuvvet birimidir. 1 kgf, 1 kg kütlenin standart yer çekimindeki ağırlığıdır ve 9,80665 N eder. Sayılar aynı göründüğü için sıkça karıştırılır.`],
    ['Uzayda ağırlık sıfır mıdır?', `Bir cismin ağırlığı ancak çekim alanının olmadığı ya da çok zayıf olduğu yerde sıfıra yaklaşır. Yörüngedeki astronotların ağırlıksız görünmesi, çekimin olmamasından değil sürekli serbest düşme hâlinde olmalarından kaynaklanır.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya iletilmez ve kaydedilmez.`],
  ],
  related: ['gezegen-agirligi-hesapla', 'kuvvet-hesapla', 'kutle-cekim-kuvveti-hesapla', 'yogunluk-hesapla', 'potansiyel-enerji-hesapla'],
};
