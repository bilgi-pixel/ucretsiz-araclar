export default {
  slug: 'sarki-suresi-bpm-hesapla',
  title: 'Ölçü Sayısından Şarkı Süresi Hesaplama',
  h1Tail: 'tempo ve ölçüden süre',
  pageTitle: 'Şarkı Süresi Hesaplama – Ölçü Sayısı ve BPM\'den Dakika Saniye',
  description: 'Ölçü sayısı, tempo (BPM) ve ölçüdeki vuruş sayısından şarkının ya da bölümün kaç dakika süreceğini hesaplayın. Toplam vuruş ve ölçü süresi de gösterilir.',
  card: 'Ölçü sayısı ve tempodan şarkının ya da bir bölümün süresini dakika-saniye olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['şarkı süresi hesaplama', 'ölçü sayısından süre', 'bpm süre hesaplama', 'kaç ölçü kaç saniye', 'beste süresi hesaplama', 'tempo süre hesabı', 'ölçü süresi'],
  lead: 'Notası yazılmış bir parçanın ya da düzenlemesini yaptığınız bir bölümün kaç dakika süreceğini, çalmadan önce hesaplayın. <strong>Ölçü sayısını</strong>, tempoyu ve bir ölçüdeki vuruş sayısını girin; araç toplam süreyi dakika-saniye olarak, toplam vuruş sayısını ve tek ölçünün süresini verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'olcu', label: 'Ölçü sayısı', type: 'number', placeholder: 'Örn. 96' },
    { id: 'bpm', label: 'Tempo (BPM)', type: 'number', placeholder: 'Örn. 120', hint: 'Dakikadaki vuruş sayısı' },
    { id: 'vurus', label: 'Ölçüdeki vuruş sayısı', type: 'number', value: '4', hint: '4/4 için 4, 3/4 için 3; tempo hangi nota değeriyle sayılıyorsa ona göre' },
  ],
  compute(v, h) {
    const olcu = h.pos(v.olcu, 'Ölçü sayısı');
    const bpm = h.pos(v.bpm, 'Tempo');
    if (bpm < 10 || bpm > 1000) h.err('Tempo 10 ile 1000 BPM arasında olmalı; değeri kontrol edin.');
    const vurus = h.pos(v.vurus, 'Ölçüdeki vuruş sayısı');
    if (vurus > 64) h.err('Ölçüdeki vuruş sayısı 64\'ten büyük olamaz.');
    const toplamVurus = olcu * vurus;
    const sn = toplamVurus * 60 / bpm;
    const t = Math.round(sn);
    const saat = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
    const iki = (n) => String(n).padStart(2, '0');
    const sure = saat ? saat + ':' + iki(dk) + ':' + iki(s) : dk + ':' + iki(s);
    return {
      rows: [
        ['Süre', sure],
        ['Toplam saniye', h.fmt(sn, 2) + ' sn'],
        ['Toplam vuruş', h.fmt(toplamVurus, 2) + ' vuruş'],
        ['Bir ölçünün süresi', h.fmt(vurus * 60 / bpm, 3) + ' sn'],
        ['Dakikadaki ölçü sayısı', h.fmt(bpm / vurus, 2) + ' ölçü'],
      ],
      note: 'Süre = ölçü sayısı × ölçüdeki vuruş × 60 ÷ BPM. Tempo değişimleri, puandorglar ve ritardando hesaba katılmaz.',
    };
  },
  cases: [
    { in: { olcu: '96', bpm: '120', vurus: '4' }, out: { 'Süre': '3:12', 'Toplam saniye': '192 sn', 'Toplam vuruş': '384 vuruş', 'Bir ölçünün süresi': '2 sn', 'Dakikadaki ölçü sayısı': '30 ölçü' } },
    { in: { olcu: '32', bpm: '90', vurus: '3' }, out: { 'Süre': '1:04', 'Toplam saniye': '64 sn', 'Toplam vuruş': '96 vuruş', 'Bir ölçünün süresi': '2 sn' } },
    { in: { olcu: '64', bpm: '128', vurus: '4' }, out: { 'Süre': '2:00', 'Toplam saniye': '120 sn', 'Bir ölçünün süresi': '1,875 sn' } },
    { in: { olcu: '120', bpm: '140', vurus: '4' }, out: { 'Süre': '3:26', 'Toplam saniye': '205,71 sn' } },
    { in: { olcu: '16', bpm: '100', vurus: '4' }, out: { 'Süre': '0:38', 'Toplam saniye': '38,4 sn', 'Dakikadaki ölçü sayısı': '25 ölçü' } },
    { in: { olcu: '8', bpm: '180', vurus: '9' }, out: { 'Süre': '0:24', 'Toplam vuruş': '72 vuruş', 'Bir ölçünün süresi': '3 sn' } },
    { in: { olcu: '2400', bpm: '60', vurus: '4' }, out: { 'Süre': '2:40:00' } },
    { in: { olcu: '96', bpm: '0', vurus: '4' }, error: true },
    { in: { olcu: '', bpm: '120', vurus: '4' }, error: true },
  ],
  howto: [
    'Notadaki ya da kayıt programındaki ölçü sayısını "Ölçü sayısı" alanına yazın. Tekrar (röpriz) işaretleri varsa tekrar edilen ölçüleri iki kez sayın.',
    '"Tempo (BPM)" alanına metronom değerini girin. Notanın başında "dörtlük = 120" yazıyorsa 120 girersiniz.',
    '"Ölçüdeki vuruş sayısı" alanına, temponun sayıldığı nota değerinden bir ölçüde kaç tane olduğunu yazın. 4/4 için 4, 3/4 için 3, 2/4 için 2.',
    '"Hesapla" düğmesine basın. İlk satır süreyi dakika:saniye biçiminde, ikinci satır toplam saniyeyi gösterir.',
    'Parça farklı tempolu bölümlerden oluşuyorsa her bölümü ayrı ayrı hesaplayıp sonuçları toplayın.',
  ],
  sections: [
    { h: 'Hesabın mantığı', p: [
      'Tempo, dakikada kaç vuruş çalındığını söyler. Bir parçadaki toplam vuruş sayısını bulursanız süreyi doğrudan hesaplayabilirsiniz. Toplam vuruş, ölçü sayısı ile bir ölçüdeki vuruş sayısının çarpımıdır. Bu sayı tempoya bölündüğünde dakika, 60 ile çarpıldığında saniye elde edilir: <strong>süre (sn) = ölçü sayısı × ölçüdeki vuruş × 60 ÷ BPM</strong>.',
      'Çözümlü örnek: 4/4\'lük, 96 ölçülük bir şarkıyı 120 BPM\'de çalacaksınız. Toplam vuruş 96 × 4 = 384\'tür. Süre 384 × 60 ÷ 120 = 192 saniye, yani 3 dakika 12 saniye eder. Bir ölçü 4 × 60 ÷ 120 = 2 saniye sürer ve dakikada 30 ölçü çalınır. Araç bu örnek için "3:12" sonucunu verir.',
    ] },
    { h: 'Ölçü birimi ve vuruş sayısı nasıl belirlenir?', p: [
      'En sık yapılan hata, ölçü işaretindeki üst sayıyı düşünmeden vuruş sayısı olarak yazmaktır. Doğru değer, temponun <em>hangi nota değeri üzerinden</em> verildiğine bağlıdır. 4/4, 3/4 ve 2/4\'te tempo dörtlük nota üzerinden sayılır ve vuruş sayısı ölçü işaretinin üst sayısına eşittir.',
      '6/8\'lik ölçülerde ise tempo çoğunlukla noktalı dörtlük üzerinden verilir; bir ölçüde iki noktalı dörtlük olduğundan vuruş sayısı olarak 2 yazılır. Tempo sekizlik nota üzerinden verilmişse (örneğin "sekizlik = 180") aynı ölçü için 6 yazmanız gerekir. İki yol da aynı süreyi verir: noktalı dörtlük = 60 ile sekizlik = 180 aynı hızdır.',
      'Türk müziğinde yaygın olan 5/8, 7/8, 9/8 ve 10/8 gibi aksak usullerde tempo genellikle sekizlik üzerinden yazılır. Sekizlik = 180 tempolu, 9/8\'lik sekiz ölçülük bir bölümde toplam vuruş 8 × 9 = 72\'dir ve süre 72 × 60 ÷ 180 = 24 saniyedir.',
    ] },
    { h: 'Kimler kullanır?', ul: [
      '<strong>Besteciler ve aranjörler:</strong> reklam müziği, jenerik ya da film sahnesi gibi süresi önceden belli işlerde kaç ölçü yazılması gerektiğini planlamak için.',
      '<strong>Koro ve orkestra şefleri:</strong> konser programının toplam süresini ve araları planlamak için.',
      '<strong>Müzik öğretmenleri ve öğrenciler:</strong> sınav ya da dinleti parçasının istenen süre sınırına uyup uymadığını görmek için.',
      '<strong>Prodüktörler ve DJ\'ler:</strong> 16 ya da 32 ölçülük geçişlerin kaç saniye tuttuğunu bilmek için.',
      '<strong>Dans eğitmenleri ve koreograflar:</strong> sekiz vuruşluk sayımların müzik süresine nasıl denk geldiğini hesaplamak için.',
    ] },
    { h: 'Hızlı başvuru: 4/4\'lük ölçülerde süre', ul: [
      '<strong>60 BPM:</strong> bir ölçü 4 saniye; 16 ölçü 1:04',
      '<strong>90 BPM:</strong> bir ölçü 2,667 saniye; 16 ölçü yaklaşık 0:43',
      '<strong>100 BPM:</strong> bir ölçü 2,4 saniye; 16 ölçü yaklaşık 0:38',
      '<strong>120 BPM:</strong> bir ölçü 2 saniye; 16 ölçü 0:32',
      '<strong>128 BPM:</strong> bir ölçü 1,875 saniye; 16 ölçü 0:30',
      '<strong>140 BPM:</strong> bir ölçü yaklaşık 1,714 saniye; 16 ölçü yaklaşık 0:27',
    ] },
    { h: 'Tersine hesap: istenen süre için kaç ölçü gerekir?', p: [
      'Süre belliyse ölçü sayısını bulmak için formülü tersine çevirebilirsiniz: <strong>ölçü sayısı = süre (sn) × BPM ÷ (60 × ölçüdeki vuruş)</strong>. 30 saniyelik bir reklam müziğini 120 BPM ve 4/4 ile yazacaksanız 30 × 120 ÷ 240 = 15 ölçü gerekir. "Dakikadaki ölçü sayısı" satırı bu hesabı kolaylaştırır: değeri hedef sürenin dakika karşılığıyla çarpmanız yeterlidir.',
    ] },
    { h: 'Gerçek süre neden farklı çıkabilir?', p: [
      'Hesap, parçanın baştan sona sabit tempoda çalındığını varsayar. Uygulamada süreyi değiştiren pek çok etken vardır: ritardando ve accelerando gibi tempo değişiklikleri, puandorglar (uzatma işaretleri), bölümler arasındaki nefes payları, serbest ritimli girişler ve eksik ölçüyle (auftakt) başlayan parçalar. Canlı performansta yorumcular yazılı tempodan birkaç BPM sapabilir; yüzde beşlik bir tempo farkı dört dakikalık bir parçada yaklaşık on iki saniyelik fark demektir.',
      'Tekrar işaretleri, dolap (birinci-ikinci son), da capo ve coda yönlendirmeleri de çalınan ölçü sayısını yazılı ölçü sayısından farklı kılar. Doğru sonuç için notadaki ölçü numarasına değil, gerçekte çalınacak ölçü sayısına bakın. Kayıtta parçanın sonuna eklenen sönümlenme ve yankı kuyruğu da süreye birkaç saniye ekler.',
    ] },
  ],
  faq: [
    ['120 BPM\'de 32 ölçü kaç saniye sürer?', '4/4\'lük ölçüde 32 ölçü 128 vuruş eder; 128 × 60 ÷ 120 = 64 saniye, yani 1 dakika 4 saniye sürer.'],
    ['3 dakikalık bir şarkı kaç ölçüdür?', 'Tempoya bağlıdır. 4/4\'lük ölçüde 120 BPM için 90 ölçü, 100 BPM için 75 ölçü, 140 BPM için 105 ölçü eder. Formül: süre (sn) × BPM ÷ 240.'],
    ['6/8\'lik bir parçada vuruş sayısına ne yazmalıyım?', 'Tempo noktalı dörtlük üzerinden verilmişse 2, sekizlik üzerinden verilmişse 6 yazın. Metronom işaretinin yanındaki nota değerine bakarak hangisi olduğunu anlayabilirsiniz.'],
    ['Tempo parça içinde değişiyorsa ne yapmalıyım?', 'Parçayı sabit tempolu bölümlere ayırın, her bölümü ayrı hesaplayın ve süreleri toplayın. Kademeli hızlanma ya da yavaşlama olan bölümlerde başlangıç ve bitiş temposunun ortalamasını kullanmak yaklaşık bir sonuç verir.'],
    ['Ölçü sayısını ondalıklı girebilir miyim?', 'Evet. Eksik ölçüyle başlayan ya da yarım ölçüyle biten parçalar için 32,5 gibi değerler yazabilirsiniz.'],
    ['Tekrar işaretlerini nasıl hesaba katarım?', 'Tekrar edilen bölümdeki ölçüleri tekrar sayısı kadar sayın. Sekiz ölçülük bir bölüm iki kez çalınıyorsa bunu 16 ölçü olarak ekleyin; dolaplı sonlarda yalnızca gerçekten çalınan ölçüleri hesaba katın.'],
    ['Sonuç neden saniyeye yuvarlanıyor?', '"Süre" satırı okunaklı olması için en yakın saniyeye yuvarlanır. Kesin değer "Toplam saniye" satırında iki ondalık basamakla verilir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir bilgi sunucuya gönderilmez.'],
  ],
  related: ['bpm-ms-hesapla', 'nota-frekans-hesapla', 'sure-toplama', 'saniye-sure-cevir', 'ses-dosyasi-boyutu-hesapla'],
};
