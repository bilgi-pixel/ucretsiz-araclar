export default {
  slug: 'bpm-ms-hesapla',
  title: 'BPM Milisaniye (Delay Süresi) Hesaplama',
  h1Tail: 'tempoya uyumlu delay',
  pageTitle: 'BPM Milisaniye Hesaplama – Tempoya Uyumlu Delay ve Reverb Süresi',
  description: 'Şarkının BPM değerini girin; dörtlük, sekizlik, onaltılık notaların milisaniye karşılığını, noktalı ve üçleme delay sürelerini ve LFO frekansını anında görün.',
  card: 'BPM değerinden nota sürelerini milisaniye olarak bulun; noktalı ve üçleme delay ayarları ile LFO frekansı dahil.',
  category: 'gunluk',
  keywords: ['bpm ms hesaplama', 'delay süresi hesaplama', 'bpm milisaniye', 'tempo delay hesaplama', 'noktalı sekizlik delay', 'bpm to ms', 'reverb pre delay hesaplama'],
  lead: 'Delay, reverb ve kompresör ayarlarını şarkının temposuna oturtmak için nota sürelerinin milisaniye karşılığını bilmek gerekir. Tempoyu <strong>BPM</strong> olarak yazın; araç birlik notadan otuzikilik notaya kadar tüm sürelerin düz, noktalı ve üçleme değerlerini milisaniye ve hertz olarak listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'bpm', label: 'Tempo (BPM)', type: 'number', placeholder: 'Örn. 120', hint: 'Dakikadaki dörtlük vuruş sayısı' },
  ],
  compute(v, h) {
    const bpm = h.pos(v.bpm, 'Tempo');
    if (bpm < 10 || bpm > 1000) h.err('Tempo 10 ile 1000 BPM arasında olmalı; değeri kontrol edin.');
    const q = 60000 / bpm;
    const notalar = [['1/1 (birlik)', 4], ['1/2 (ikilik)', 2], ['1/4 (dörtlük)', 1], ['1/8 (sekizlik)', 0.5], ['1/16 (onaltılık)', 0.25], ['1/32 (otuzikilik)', 0.125]];
    const ms = (x) => h.fmt(x, 2) + ' ms';
    const satir = notalar.map(([ad, k]) => ad + ':  düz ' + ms(q * k) + '  |  noktalı ' + ms(q * k * 1.5) + '  |  üçleme ' + ms(q * k * 2 / 3) + '  |  ' + h.fmt(1000 / (q * k), 3) + ' Hz');
    return {
      rows: [
        ['Dörtlük nota (1/4)', ms(q)],
        ['Sekizlik nota (1/8)', ms(q / 2)],
        ['Noktalı sekizlik', ms(q * 0.75)],
        ['Sekizlik üçleme', ms(q / 3)],
        ['Onaltılık nota (1/16)', ms(q / 4)],
        ['Bir ölçü (4/4)', ms(q * 4)],
        ['Vuruş frekansı', h.fmt(bpm / 60, 3) + ' Hz'],
      ],
      text: h.fmt(bpm, 2) + ' BPM için nota süreleri\n' + satir.join('\n'),
      note: 'Dörtlük nota süresi = 60.000 ÷ BPM. Noktalı değer 1,5 katı, üçleme değer 2/3 katıdır.',
    };
  },
  cases: [
    { in: { bpm: '120' }, out: { 'Dörtlük nota (1/4)': '500 ms', 'Sekizlik nota (1/8)': '250 ms', 'Noktalı sekizlik': '375 ms', 'Sekizlik üçleme': '166,67 ms', 'Onaltılık nota (1/16)': '125 ms', 'Bir ölçü (4/4)': '2.000 ms', 'Vuruş frekansı': '2 Hz' } },
    { in: { bpm: '100' }, out: { 'Dörtlük nota (1/4)': '600 ms', 'Noktalı sekizlik': '450 ms', 'Sekizlik üçleme': '200 ms', 'Onaltılık nota (1/16)': '150 ms' } },
    { in: { bpm: '60' }, out: { 'Dörtlük nota (1/4)': '1.000 ms', 'Sekizlik nota (1/8)': '500 ms', 'Vuruş frekansı': '1 Hz' } },
    { in: { bpm: '140' }, out: { 'Dörtlük nota (1/4)': '428,57 ms', 'Sekizlik nota (1/8)': '214,29 ms', 'Noktalı sekizlik': '321,43 ms' } },
    { in: { bpm: '87,5' }, out: { 'Dörtlük nota (1/4)': '685,71 ms', 'Bir ölçü (4/4)': '2.742,86 ms' } },
    { in: { bpm: '120' }, textMatch: '1/16 \\(onaltılık\\): {2}düz 125 ms {2}\\| {2}noktalı 187,5 ms {2}\\| {2}üçleme 83,33 ms {2}\\| {2}8 Hz' },
    { in: { bpm: '0' }, error: true },
    { in: { bpm: 'hızlı' }, error: true },
  ],
  howto: [
    'Projenizin temposunu "Tempo (BPM)" alanına yazın. Kayıt programınızın üst çubuğunda ya da metronomda görünen değerdir; 87,5 gibi ondalıklı tempolar da kabul edilir.',
    '"Hesapla" düğmesine basın. Üst satırlarda en sık kullanılan delay süreleri, alttaki kutuda tüm nota değerlerinin düz, noktalı ve üçleme karşılıkları listelenir.',
    'Delay efektinizin süre düğmesini milisaniye moduna alıp seçtiğiniz değeri girin. Efektte tempo eşitleme özelliği yoksa ya da donanım pedalı kullanıyorsanız bu yol tek seçenektir.',
    'Titreşim, tremolo ya da filtre taraması gibi LFO tabanlı efektler için her satırın sonundaki hertz değerini kullanın.',
  ],
  sections: [
    { h: 'BPM\'den milisaniyeye geçiş formülü', p: [
      'BPM, dakikadaki vuruş sayısıdır ve vuruş çoğunlukla dörtlük nota kabul edilir. Bir dakika 60.000 milisaniye olduğundan tek bir dörtlük notanın süresi <strong>60.000 ÷ BPM</strong> milisaniyedir. 120 BPM\'de bu 60.000 ÷ 120 = 500 ms eder. Diğer nota değerleri bunun katlarıdır: ikilik nota iki katı (1.000 ms), sekizlik yarısı (250 ms), onaltılık çeyreği (125 ms).',
      'Noktalı nota, kendi süresinin yarısı kadar uzar; yani düz değerin 1,5 katıdır. Üçleme ise iki notalık süreye üç eşit nota sığdırdığından düz değerin 2/3\'ü kadardır. 120 BPM örneğinde sekizlik nota 250 ms olduğuna göre noktalı sekizlik 250 × 1,5 = 375 ms, sekizlik üçleme 250 × 2 ÷ 3 ≈ 166,67 ms çıkar. Araç bu örnek için tam olarak bu sayıları gösterir.',
    ] },
    { h: 'Hangi delay süresi nerede kullanılır?', ul: [
      '<strong>Dörtlük:</strong> vokal ve gitar sololarında belirgin, vuruşun üstüne düşen yankı.',
      '<strong>Noktalı sekizlik:</strong> ritim gitarında düz sekizlik çalınırken araya giren, hareketli ve dolgun bir doku oluşturan klasik ayar.',
      '<strong>Sekizlik:</strong> ritmi sıkılaştıran kısa tekrar; hızlı parçalarda vokal kalınlaştırma.',
      '<strong>Sekizlik üçleme:</strong> swing ve shuffle hissi taşıyan parçalar, 6/8\'lik ve 12/8\'lik ritimler.',
      '<strong>Onaltılık ve altı:</strong> çok kısa tekrarlar; sesin genişlemesi ve "slapback" etkisine yakın sonuçlar.',
    ] },
    { h: 'Reverb ve kompresör ayarlarında kullanım', p: [
      'Delay dışında da tempoya bağlı milisaniye değerleri işe yarar. Reverb\'ün ön gecikmesini (pre-delay) otuzikilik ya da onaltılık nota süresine yakın tutmak, kuru sesin yankıdan ayrışmasını sağlarken ritmik hissi bozmaz. Reverb kuyruğunun bir sonraki vuruştan ya da ölçü başından önce sönmesi, miksin bulanıklaşmasını önler; bunun için "Bir ölçü" ve dörtlük nota sürelerine bakabilirsiniz.',
      'Kompresörün bırakma (release) süresini nota değerlerinden birine yakın seçmek, kazanç azaltmasının bir sonraki vuruşa kadar toparlanmasına yardımcı olur ve pompalama etkisini müziğin nabzıyla uyumlu kılar. Bunlar katı kural değil, başlangıç noktasıdır; son kararı her zaman kulak verir.',
    ] },
    { h: 'Hertz değeri ne işe yarar?', p: [
      'Tremolo, vibrato, phaser, otomatik pan ve filtre taraması gibi efektler düşük frekanslı bir osilatörle (LFO) çalışır ve hızları çoğu zaman hertz olarak ayarlanır. Bir nota süresinin frekans karşılığı <strong>1.000 ÷ süre (ms)</strong> ile bulunur. 120 BPM\'de dörtlük nota 500 ms sürdüğü için 2 Hz, onaltılık nota 125 ms sürdüğü için 8 Hz\'dir. LFO hızını bu değerlere ayarladığınızda efektin dalgalanması vuruşlarla aynı anda tekrarlanır.',
    ] },
    { h: 'Türk müziği ve aksak ölçülerde kullanım', p: [
      'Türkiye\'de sık kullanılan 5/8, 7/8, 9/8 gibi aksak usullerde tempo çoğunlukla sekizlik nota üzerinden verilir. Notada ya da metronomda "sekizlik = 240" gibi bir ifade görüyorsanız bunun dörtlük karşılığı yarısıdır; araca 120 yazıp "Sekizlik nota" satırını okuyabilirsiniz. 9/8\'lik bir ölçünün toplam süresini bulmak için sekizlik süreyi 9 ile çarpmanız yeterlidir: 120 BPM\'de 250 × 9 = 2.250 ms.',
      '"Bir ölçü" satırı 4/4\'lük ölçüye göre, yani dört dörtlük vuruş olarak hesaplanır. 3/4\'lük bir parçada ölçü süresi dörtlük sürenin üç katıdır.',
    ] },
    { h: 'Tempoyu bilmiyorsanız', p: [
      'Kayıtlı bir şarkının temposunu bulmak için 15 saniye boyunca vuruşları sayıp sonucu dörtle çarpabilirsiniz. Daha hassas bir yol, belirli sayıda ölçünün ne kadar sürdüğünü ölçmektir: 4/4\'lük sekiz ölçü 32 vuruş eder; bu 16 saniye sürüyorsa tempo 32 × 60 ÷ 16 = 120 BPM\'dir. Canlı çalınmış ve metronomsuz kaydedilmiş parçalarda tempo şarkı boyunca oynayabileceğinden tek bir milisaniye değeri her bölüme tam oturmayabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Sonuçlar iki ondalık basamağa yuvarlanır; donanım pedallarının çoğu zaten 1 ms çözünürlükle çalıştığı için bu yeterlidir. Araç 10–1000 BPM aralığını kabul eder. Hesap tümüyle matematikseldir; analog delay devrelerindeki süre sapması ya da efektin kendi iç gecikmesi hesaba katılmaz.',
    ] },
  ],
  faq: [
    ['120 BPM kaç milisaniyedir?', '120 BPM\'de bir dörtlük nota 500 ms sürer. Sekizlik nota 250 ms, onaltılık nota 125 ms, noktalı sekizlik 375 ms ve tam bir 4/4\'lük ölçü 2.000 ms, yani 2 saniyedir.'],
    ['Noktalı sekizlik delay nasıl hesaplanır?', 'Dörtlük nota süresinin dörtte üçüdür. Önce 60.000\'i BPM\'e bölün, sonra 0,75 ile çarpın. 100 BPM için 600 × 0,75 = 450 ms eder.'],
    ['Delay efektimde tempo eşitleme var, yine de bu hesaba ihtiyacım olur mu?', 'Efekt projeyle eşitleniyorsa nota değerini seçmeniz yeterlidir. Milisaniye değeri; eşitleme özelliği olmayan donanım pedallarında, canlı performansta ve reverb ön gecikmesi ile kompresör bırakma süresi gibi yalnızca zaman cinsinden ayarlanan parametrelerde gerekir.'],
    ['Üçleme süresi neden 2/3 ile çarpılıyor?', 'Üçleme, normalde iki notanın kapladığı süreye üç eşit nota yerleştirir. Dolayısıyla her biri düz notanın üçte ikisi kadar sürer. Sekizlik üçleme, bir dörtlük vuruşun üçe bölünmesiyle aynıdır.'],
    ['Ondalıklı BPM girebilir miyim?', 'Evet. 87,5 ya da 128,3 gibi değerleri virgül ya da nokta ile yazabilirsiniz. Eski kayıtların ve canlı performansların temposu çoğu zaman tam sayı değildir.'],
    ['Hertz değeriyle BPM arasındaki ilişki nedir?', 'Dörtlük vuruşun frekansı BPM\'in 60\'a bölümüdür; 120 BPM, saniyede 2 vuruş yani 2 Hz eder. Daha kısa nota değerlerinde frekans orantılı olarak artar.'],
    ['Yarım tempo ya da çift tempo hissinde hangi değeri yazmalıyım?', 'Programınızda görünen tempoyu yazın ve listeden uygun nota değerini seçin. Parçayı yarım tempoda hissediyorsanız ikilik nota satırı, çift tempoda hissediyorsanız sekizlik nota satırı sizin "vuruşunuza" karşılık gelir.'],
    ['Yazdığım tempo bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir veri sunucuya iletilmez ya da saklanmaz.'],
  ],
  related: ['sarki-suresi-bpm-hesapla', 'nota-frekans-hesapla', 'ses-dosyasi-boyutu-hesapla', 'saniye-sure-cevir', 'dalga-boyu-frekans-hesapla'],
};
