export default {
  slug: 'nota-frekans-hesapla',
  title: 'Nota Frekansı Hesaplama',
  h1Tail: 'hertz ve MIDI numarası',
  pageTitle: 'Nota Frekansı Hesaplama – Notaların Hertz ve MIDI Karşılığı',
  description: 'Seçtiğiniz notanın frekansını hertz olarak hesaplayın. La = 440 Hz ya da kendi akort referansınızla MIDI numarasını, dalga boyunu ve komşu notaları görün.',
  card: 'Nota ve oktav seçin; frekansını hertz olarak, MIDI numarası, dalga boyu ve komşu yarım tonlarla birlikte görün.',
  category: 'gunluk',
  keywords: ['nota frekansı hesaplama', 'la notası kaç hertz', 'nota hertz tablosu', 'do notası frekansı', 'midi nota numarası', '440 hz akort', '432 hz nota frekansları'],
  lead: 'Bir notanın kaç hertz olduğunu bulmak için notayı ve oktavını seçin. Araç, eşit tamperamanlı sistemde ve seçtiğiniz akort referansına göre (varsayılan <strong>La<sub>4</sub> = 440 Hz</strong>) frekansı, MIDI nota numarasını, periyodu, havadaki dalga boyunu ve bir yarım ton altı ile üstündeki notaların frekansını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'nota', label: 'Nota', type: 'select', options: [
      ['9', 'La (A)'], ['10', 'La♯ / Si♭ (A♯)'], ['11', 'Si (B)'], ['0', 'Do (C)'], ['1', 'Do♯ / Re♭ (C♯)'], ['2', 'Re (D)'],
      ['3', 'Re♯ / Mi♭ (D♯)'], ['4', 'Mi (E)'], ['5', 'Fa (F)'], ['6', 'Fa♯ / Sol♭ (F♯)'], ['7', 'Sol (G)'], ['8', 'Sol♯ / La♭ (G♯)'],
    ] },
    { id: 'oktav', label: 'Oktav', type: 'number', value: '4', hint: 'Bilimsel gösterim: orta Do = Do4, akort La\'sı = La4' },
    { id: 'referans', label: 'Akort referansı, La4 (Hz)', type: 'number', value: '440' },
  ],
  compute(v, h) {
    const idx = Number(v.nota);
    if (!Number.isInteger(idx) || idx < 0 || idx > 11) h.err('Listeden bir nota seçin.');
    const okt = h.int(v.oktav, 'Oktav');
    if (okt < -1 || okt > 9) h.err('Oktav −1 ile 9 arasında olmalı.');
    const ref = h.pos(v.referans, 'Akort referansı');
    if (ref < 300 || ref > 600) h.err('Akort referansı 300–600 Hz arasında olmalı; standart değer 440\'tır.');
    const adlar = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
    const harf = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    const midi = 12 * (okt + 1) + idx;
    if (midi > 127) h.err('Bu nota MIDI aralığının (0–127) dışında; daha düşük bir oktav seçin.');
    const frek = (m) => ref * Math.pow(2, (m - 69) / 12);
    const ad = (m) => { const i = ((m % 12) + 12) % 12; return adlar[i] + (Math.floor(m / 12) - 1); };
    const f = frek(midi);
    const hz = (x) => h.fmt(x, x < 100 ? 3 : 2) + ' Hz';
    return {
      rows: [
        ['Frekans', hz(f)],
        ['Nota', adlar[idx] + okt + ' (' + harf[idx] + okt + ')'],
        ['MIDI nota numarası', String(midi)],
        ['Periyot', h.fmt(1000 / f, 3) + ' ms'],
        ['Havadaki dalga boyu', h.fmt(343 / f, 3) + ' m'],
        ['Yarım ton altı', ad(midi - 1) + ': ' + hz(frek(midi - 1))],
        ['Yarım ton üstü', ad(midi + 1) + ': ' + hz(frek(midi + 1))],
        ['Bir oktav üstü', hz(f * 2)],
      ],
      note: 'Eşit tamperaman: f = referans × 2^((MIDI − 69) ÷ 12). Dalga boyu 20 °C havada 343 m/s ses hızıyla hesaplanır.',
    };
  },
  cases: [
    { in: { nota: '9', oktav: '4', referans: '440' }, out: { 'Frekans': '440 Hz', 'Nota': 'La4 (A4)', 'MIDI nota numarası': '69', 'Periyot': '2,273 ms', 'Yarım ton altı': 'Sol♯4: 415,3 Hz', 'Yarım ton üstü': 'La♯4: 466,16 Hz', 'Bir oktav üstü': '880 Hz' } },
    { in: { nota: '0', oktav: '4', referans: '440' }, out: { 'Frekans': '261,63 Hz', 'Nota': 'Do4 (C4)', 'MIDI nota numarası': '60', 'Yarım ton altı': 'Si3: 246,94 Hz' } },
    { in: { nota: '4', oktav: '2', referans: '440' }, out: { 'Frekans': '82,407 Hz', 'MIDI nota numarası': '40' } },
    { in: { nota: '9', oktav: '0', referans: '440' }, out: { 'Frekans': '27,5 Hz', 'MIDI nota numarası': '21' } },
    { in: { nota: '0', oktav: '8', referans: '440' }, out: { 'Frekans': '4.186,01 Hz', 'MIDI nota numarası': '108' } },
    { in: { nota: '0', oktav: '4', referans: '432' }, out: { 'Frekans': '256,87 Hz' } },
    { in: { nota: '7', oktav: '3', referans: '440' }, out: { 'Frekans': '196 Hz', 'Nota': 'Sol3 (G3)', 'Havadaki dalga boyu': '1,75 m' } },
    { in: { nota: '9', oktav: '4,5', referans: '440' }, error: true },
    { in: { nota: '9', oktav: '4', referans: '0' }, error: true },
  ],
  howto: [
    '"Nota" listesinden frekansını öğrenmek istediğiniz sesi seçin. Diyezli sesler bemol karşılıklarıyla birlikte yazılmıştır; La diyez ile Si bemol aynı tuştur.',
    '"Oktav" alanına notanın oktav numarasını girin. Piyanonun ortasındaki Do 4. oktavın başlangıcıdır; akort için kullanılan La da 4. oktavdadır.',
    'Standart akort dışında bir referans kullanıyorsanız "Akort referansı" alanını değiştirin; aksi halde 440 olarak bırakın.',
    '"Hesapla" düğmesine basın. İlk satır frekansı, altındaki satırlar MIDI numarasını, periyodu, dalga boyunu ve komşu notaları gösterir.',
  ],
  sections: [
    { h: 'Notalar ve frekans arasındaki ilişki', p: [
      'Bir müzik sesinin perdesi, saniyedeki titreşim sayısıyla yani frekansıyla belirlenir ve hertz (Hz) birimiyle ölçülür. Frekans iki katına çıktığında ses bir oktav incelir: La<sub>4</sub> 440 Hz ise La<sub>5</sub> 880 Hz, La<sub>3</sub> 220 Hz\'dir. Günümüz Batı müziğinde kullanılan <strong>eşit tamperamanlı</strong> sistemde bir oktav, frekans oranı birbirine eşit on iki yarım tona bölünür. Her yarım ton bir öncekinin 2\'nin on ikinci dereceden kökü, yani yaklaşık 1,05946 katıdır.',
      'Bu yüzden notalar arasındaki fark hertz olarak sabit değildir; kalın seslerde komşu notalar birbirine çok yakınken ince seslerde aralık açılır. Mi<sub>2</sub> ile Fa<sub>2</sub> arasında yaklaşık 5 Hz varken iki oktav yukarıda aynı aralık yaklaşık 20 Hz eder.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Hesap, referans notadan kaç yarım ton uzaklaşıldığına dayanır: <strong>f = referans × 2<sup>(n ÷ 12)</sup></strong>. Burada n, La<sub>4</sub>\'ten olan yarım ton farkıdır; daha ince notalar için pozitif, daha kalın notalar için negatiftir. MIDI numaralarıyla yazıldığında n = MIDI − 69 olur, çünkü La<sub>4</sub>\'ün MIDI numarası 69\'dur.',
      'Örnek olarak orta Do\'yu (Do<sub>4</sub>) ele alalım. Do<sub>4</sub>, La<sub>4</sub>\'ün dokuz yarım ton altındadır, MIDI numarası 60\'tır. f = 440 × 2<sup>(−9 ÷ 12)</sup> = 440 × 0,59460 ≈ 261,63 Hz bulunur. Bir titreşimin süresi olan periyot 1 ÷ 261,63 ≈ 3,822 milisaniyedir. Araçta Do ve 4. oktavı seçtiğinizde aynı sonuçları görürsünüz.',
    ] },
    { h: 'Hızlı başvuru: 4. oktav frekansları (La = 440 Hz)', ul: [
      '<strong>Do<sub>4</sub>:</strong> 261,63 Hz',
      '<strong>Re<sub>4</sub>:</strong> 293,66 Hz',
      '<strong>Mi<sub>4</sub>:</strong> 329,63 Hz',
      '<strong>Fa<sub>4</sub>:</strong> 349,23 Hz',
      '<strong>Sol<sub>4</sub>:</strong> 392 Hz',
      '<strong>La<sub>4</sub>:</strong> 440 Hz',
      '<strong>Si<sub>4</sub>:</strong> 493,88 Hz',
    ], p: [
      'Diğer oktavlar için bu değerleri ikiyle çarpmanız ya da ikiye bölmeniz yeterlidir. Standart akortlu gitarın en kalın teli Mi<sub>2</sub> yaklaşık 82,41 Hz, en ince teli Mi<sub>4</sub> 329,63 Hz\'dir. 88 tuşlu piyanonun en kalın sesi La<sub>0</sub> 27,5 Hz, en ince sesi Do<sub>8</sub> yaklaşık 4.186 Hz\'dir.',
    ] },
    { h: 'Akort referansı: 440, 442 ve 432 Hz', p: [
      'La<sub>4</sub> = 440 Hz, uluslararası standart olarak kabul edilen konser perdesidir ve akort aletlerinin varsayılan ayarıdır. Bazı senfoni orkestraları daha parlak bir ton için 442 ya da 443 Hz\'e akort eder; barok dönem müziği seslendiren topluluklar ise tarihsel çalgılara uygun olarak 415 Hz gibi daha pes referanslar kullanır. 432 Hz akordu da bazı müzisyenlerin tercihidir.',
      'Referans değiştiğinde bütün notalar aynı oranda kayar. La<sub>4</sub> = 432 Hz alındığında Do<sub>4</sub> 261,63 yerine 256,87 Hz olur. Araçtaki referans alanı bu tür akortlar için tüm frekansları yeniden hesaplamanızı sağlar.',
    ] },
    { h: 'Nota adları ve oktav numaraları', p: [
      'Türkiye\'de notalar Do, Re, Mi, Fa, Sol, La, Si heceleriyle adlandırılır; uluslararası kaynaklarda ve çoğu yazılımda ise C, D, E, F, G, A, B harfleri kullanılır. Araç her ikisini birlikte gösterir. Almanca kaynaklarda B harfinin Si bemolü, H harfinin Si\'yi ifade ettiğini bilmek karışıklığı önler.',
      'Oktav numaraları bilimsel perde gösterimine göredir: her oktav Do ile başlar ve Si ile biter. Bu yüzden Si<sub>3</sub>\'ten sonraki nota Do<sub>4</sub>\'tür. MIDI numarası ile ilişki <strong>MIDI = 12 × (oktav + 1) + nota sırası</strong> biçimindedir; Do için sıra 0, La için 9\'dur. Bazı yazılım ve klavyeler orta Do\'yu Do<sub>3</sub> olarak adlandırır; MIDI numarası (60) ise her yerde aynıdır, tereddütte numaraya bakın.',
    ] },
    { h: 'Dalga boyu ve periyot nerede işe yarar?', p: [
      'Periyot, sentezleyici ve örnekleyici programlayanlar ile mikrodenetleyiciyle ses üretenler için gereklidir: bir kare dalgayı doğru perdede üretmek için pini her yarım periyotta değiştirmek gerekir. Dalga boyu ise oda akustiğinde kullanılır; bir odanın boyutlarına yakın dalga boyundaki bas notalar duran dalgalar oluşturup bazı noktalarda gürleşir, bazılarında kaybolur. Sol<sub>3</sub> (196 Hz) havada yaklaşık 1,75 metre dalga boyuna sahiptir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca on iki ton eşit tamperamanı hesaplar. Türk makam müziğindeki koma sesleri, doğal (saf) akort ve piyano akortçularının uyguladığı oktav gerdirmesi bu hesabın dışındadır; gerçek bir piyanonun en ince ve en kalın telleri kuramsal değerlerden birkaç sent sapar. Dalga boyu 20 °C\'deki hava için verilir; sıcaklık değiştikçe ses hızı ve dolayısıyla dalga boyu da değişir.',
    ] },
  ],
  faq: [
    ['La notası kaç hertzdir?', 'Standart akortta 4. oktavdaki La 440 Hz\'dir. Diğer oktavlardaki La sesleri bunun katlarıdır: La3 220 Hz, La2 110 Hz, La5 880 Hz.'],
    ['Orta Do kaç hertzdir?', 'La = 440 Hz akordunda orta Do (Do4) yaklaşık 261,63 Hz\'dir ve MIDI numarası 60\'tır.'],
    ['Do diyez ile Re bemol aynı frekansta mıdır?', 'Eşit tamperamanlı sistemde evet; ikisi aynı tuşa ve aynı frekansa karşılık gelir. Farklı adlandırma, notanın hangi tonalite içinde yazıldığıyla ilgilidir. Türk müziği gibi koma kullanan sistemlerde ise bu sesler birbirinden ayrılır.'],
    ['432 Hz akordunda notaların frekansı nasıl bulunur?', '"Akort referansı" alanına 432 yazmanız yeterlidir. Tüm notalar 440 Hz akorduna göre yaklaşık yüzde 1,8 daha kalın çıkar; örneğin Do4 256,87 Hz olur.'],
    ['MIDI nota numarası nedir?', 'MIDI standardında her notaya 0 ile 127 arasında bir numara verilir. Orta Do 60, akort La\'sı 69\'dur ve her yarım ton numarayı bir artırır. Sentezleyiciler ve müzik yazılımları notaları bu numaralarla iletir.'],
    ['Gitar tellerinin frekansları nedir?', 'Standart akortta kalından inceye Mi2 82,41 Hz, La2 110 Hz, Re3 146,83 Hz, Sol3 196 Hz, Si3 246,94 Hz ve Mi4 329,63 Hz\'dir. Her birini nota ve oktav seçerek araçta doğrulayabilirsiniz.'],
    ['İki nota arasındaki sent farkını nasıl hesaplarım?', 'Bir yarım ton 100 senttir, bir oktav 1.200 sent. İki frekans arasındaki fark 1.200 × log2(f2 ÷ f1) formülüyle bulunur. Akort aletleri sapmayı bu birimle gösterir.'],
    ['Seçimlerim bir yere kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; hiçbir bilgi sunucuya gönderilmez.'],
  ],
  related: ['bpm-ms-hesapla', 'dalga-boyu-frekans-hesapla', 'ses-hizi-hesapla', 'sarki-suresi-bpm-hesapla', 'ses-siddeti-hesapla'],
};
