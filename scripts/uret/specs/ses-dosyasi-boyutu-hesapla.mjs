export default {
  slug: 'ses-dosyasi-boyutu-hesapla',
  title: 'Ses Dosyası Boyutu Hesaplama',
  h1Tail: 'WAV, MP3, AAC',
  pageTitle: 'Ses Dosyası Boyutu Hesaplama – WAV ve MP3 Kaç MB Tutar?',
  description: 'Süre, örnekleme hızı, bit derinliği ve kanal sayısından WAV boyutunu; bit hızından MP3, AAC ve benzeri sıkıştırılmış ses dosyalarının boyutunu hesaplayın.',
  card: 'Kayıt süresine göre WAV ya da MP3 dosyasının kaç MB tutacağını örnekleme hızı, bit derinliği ve bit hızından hesaplayın.',
  category: 'gunluk',
  keywords: ['ses dosyası boyutu hesaplama', 'wav boyutu hesaplama', 'mp3 kaç mb', 'bit hızı dosya boyutu', '1 dakika wav kaç mb', 'ses kaydı boyutu', 'kbps mb hesaplama'],
  lead: "Bir ses kaydının diskte ne kadar yer tutacağını önceden hesaplayın. Sıkıştırılmamış kayıtlar (WAV, AIFF) için <strong>örnekleme hızı × bit derinliği × kanal sayısı</strong>, sıkıştırılmış biçimler (MP3, AAC, OGG) için doğrudan <strong>bit hızı</strong> kullanılır.",
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Dosya türü', type: 'select', options: [['pcm', 'Sıkıştırılmamış (WAV, AIFF)'], ['bit', 'Sıkıştırılmış (MP3, AAC, OGG) – bit hızından']] },
    { id: 'dakika', label: 'Süre – dakika', type: 'number', placeholder: 'Örn. 3' },
    { id: 'saniye', label: 'Süre – saniye', type: 'number', value: '0' },
    { id: 'ornekleme', label: 'Örnekleme hızı (Hz)', type: 'number', value: '44100', hint: 'Sıkıştırılmamış kayıt için. CD: 44100, video: 48000.' },
    { id: 'derinlik', label: 'Bit derinliği', type: 'number', value: '16', hint: 'Sıkıştırılmamış kayıt için. Genellikle 16 ya da 24.' },
    { id: 'kanal', label: 'Kanal sayısı', type: 'number', value: '2', hint: 'Mono 1, stereo 2.' },
    { id: 'bithizi', label: 'Bit hızı (kbps)', type: 'number', value: '128', hint: 'Sıkıştırılmış dosya için. Örn. 128, 192, 320.' },
  ],
  compute(v, h) {
    const dk = h.opt(v.dakika, 0, 'Süre – dakika');
    const sn = h.opt(v.saniye, 0, 'Süre – saniye');
    if (dk < 0 || sn < 0) h.err('Süre negatif olamaz.');
    const t = dk * 60 + sn;
    if (!(t > 0)) h.err('Kayıt süresini dakika ve/veya saniye olarak yazın.');
    let bps;
    const rows = [];
    if (v.tur === 'bit') {
      bps = h.pos(v.bithizi, 'Bit hızı') * 1000;
    } else {
      const fs = h.pos(v.ornekleme, 'Örnekleme hızı');
      const b = h.posint(v.derinlik, 'Bit derinliği');
      const k = h.posint(v.kanal, 'Kanal sayısı');
      bps = fs * b * k;
    }
    const bayt = bps * t / 8;
    const topSn = Math.round(t * 100) / 100;
    const sa = Math.floor(topSn / 3600 + 1e-9);
    const d2 = Math.floor((topSn - sa * 3600) / 60 + 1e-9);
    const s2 = topSn - sa * 3600 - d2 * 60;
    rows.push(['Dosya boyutu', h.fmt(bayt / 1e6, 3) + ' MB']);
    rows.push(['İkili birimle', h.fmt(bayt / 1048576, 2) + ' MiB']);
    rows.push(['Bayt olarak', h.fmt(bayt, 0) + ' bayt']);
    rows.push(['Bit hızı', h.fmt(bps / 1000, 2) + ' kbps']);
    rows.push(['Dakika başına', h.fmt(bps * 60 / 8 / 1e6, 3) + ' MB']);
    rows.push(['Süre', (sa ? sa + ' sa ' : '') + d2 + ' dk ' + h.fmt(s2, 2) + ' sn']);
    return {
      rows,
      note: v.tur === 'bit'
        ? '1 MB = 1.000.000 bayt, 1 kbps = 1.000 bit/sn alınmıştır. Değişken bit hızlı (VBR) dosyalarda gerçek boyut ortalama bit hızına göre oynar; etiket ve kapak görseli ayrıca yer tutar.'
        : '1 MB = 1.000.000 bayt alınmıştır. WAV dosyasının küçük başlık bölümü (genellikle 44 bayt) hesaba katılmamıştır.',
    };
  },
  cases: [
    { in: { tur: 'pcm', dakika: '1', saniye: '0', ornekleme: '44100', derinlik: '16', kanal: '2' }, out: { 'Dosya boyutu': '10,584 MB', 'İkili birimle': '10,09 MiB', 'Bayt olarak': '10.584.000 bayt', 'Bit hızı': '1.411,2 kbps' } },
    { in: { tur: 'bit', dakika: '3', saniye: '30', bithizi: '128' }, out: { 'Dosya boyutu': '3,36 MB', 'İkili birimle': '3,2 MiB', 'Bayt olarak': '3.360.000 bayt', 'Süre': '3 dk 30 sn' } },
    { in: { tur: 'bit', dakika: '4', saniye: '0', bithizi: '320' }, out: { 'Dosya boyutu': '9,6 MB', 'Dakika başına': '2,4 MB' } },
    { in: { tur: 'pcm', dakika: '1', saniye: '0', ornekleme: '48000', derinlik: '24', kanal: '2' }, out: { 'Dosya boyutu': '17,28 MB', 'Bit hızı': '2.304 kbps' } },
    { in: { tur: 'pcm', dakika: '', saniye: '60', ornekleme: '8000', derinlik: '8', kanal: '1' }, out: { 'Dosya boyutu': '0,48 MB', 'Bit hızı': '64 kbps', 'Süre': '1 dk 0 sn' } },
    { in: { tur: 'pcm', dakika: '74', saniye: '0' }, out: { 'Dosya boyutu': '783,216 MB', 'Süre': '1 sa 14 dk 0 sn' } },
    { in: { tur: 'pcm', dakika: '', saniye: '0' }, error: true },
    { in: { tur: 'bit', dakika: '3', bithizi: '0' }, error: true },
    { in: { tur: 'pcm', dakika: '2', kanal: '1,5' }, error: true },
  ],
  howto: [
    'Dosya türünü seçin: WAV gibi sıkıştırılmamış bir kayıt mı, yoksa MP3 ya da AAC gibi bit hızıyla tanımlanan sıkıştırılmış bir dosya mı hesaplayacaksınız?',
    'Kayıt süresini dakika ve saniye olarak yazın. Yalnızca birini doldurmanız yeterlidir; örneğin 90 saniyelik bir kayıt için dakikayı boş bırakıp saniyeye 90 yazabilirsiniz.',
    'Sıkıştırılmamış kayıt için örnekleme hızını, bit derinliğini ve kanal sayısını girin. Varsayılan değerler ses CD\'si kalitesidir.',
    'Sıkıştırılmış dosya için yalnızca bit hızını kbps cinsinden yazın.',
    'Hesapla düğmesine basın; boyutu megabayt, mebibayt ve bayt olarak, ayrıca dakika başına düşen boyutu görürsünüz.',
  ],
  sections: [
    { h: 'Sıkıştırılmamış ses nasıl hesaplanır?', p: [
      'Dijital ses, analog dalganın saniyede binlerce kez ölçülmesiyle elde edilir. Saniyedeki ölçüm sayısına <strong>örnekleme hızı</strong>, her ölçümün kaç bitle saklandığına <strong>bit derinliği</strong> denir. Stereo kayıtta bu işlem sol ve sağ kanal için ayrı ayrı yapılır. Dolayısıyla saniyede üretilen veri miktarı üç değerin çarpımıdır: <strong>bit hızı = örnekleme hızı × bit derinliği × kanal sayısı</strong>.',
      'Dosya boyutu ise bit hızının süreyle çarpılıp sekize bölünmesiyle bulunur: <strong>boyut (bayt) = bit hızı × süre (saniye) ÷ 8</strong>. Ses CD\'si standardı olan 44.100 Hz, 16 bit, stereo için bit hızı 44.100 × 16 × 2 = 1.411.200 bit/sn, yani 1.411,2 kbps eder. Bir dakikalık kayıt 1.411.200 × 60 ÷ 8 = 10.584.000 bayt, yani 10,584 MB yer tutar. Bu yüzden "CD kalitesinde WAV dakikada yaklaşık 10 MB" kuralı yaygındır.',
    ] },
    { h: 'Sıkıştırılmış dosyalarda bit hızı', p: [
      'MP3, AAC, OGG Vorbis ve Opus gibi biçimler, insan kulağının ayırt edemediği ayrıntıları atarak veriyi küçültür. Bu dosyalarda kalite ve boyut doğrudan <strong>bit hızı</strong> ile ifade edilir: 128 kbps, 192 kbps, 320 kbps gibi. Hesap aynı formüldür, yalnızca bit hızı hazır verilir. 3 dakika 30 saniyelik (210 saniye) bir şarkı 128 kbps hızında 128.000 × 210 ÷ 8 = 3.360.000 bayt, yani 3,36 MB eder. Aynı şarkı 320 kbps hızında 8,4 MB olur.',
      'Sabit bit hızlı (CBR) dosyalarda sonuç neredeyse birebir tutar. Değişken bit hızlı (VBR) dosyalarda kodlayıcı, sessiz bölümlerde daha az, yoğun bölümlerde daha çok veri kullanır; bu durumda araca ortalama bit hızını yazmanız gerekir. FLAC gibi kayıpsız sıkıştırılmış biçimlerin boyutu ise müziğin içeriğine bağlıdır ve önceden kesin hesaplanamaz; kabaca WAV boyutunun yarısı ile üçte ikisi arasında bir değer beklenir.',
    ] },
    { h: 'Sık kullanılan ayarlar ve dakika başına boyut', ul: [
      '<strong>Telefon kalitesi</strong> (8.000 Hz, 8 bit, mono): 64 kbps, dakikada 0,48 MB',
      '<strong>Ses CD\'si</strong> (44.100 Hz, 16 bit, stereo): 1.411,2 kbps, dakikada 10,584 MB',
      '<strong>Video ve yayın sesi</strong> (48.000 Hz, 16 bit, stereo): 1.536 kbps, dakikada 11,52 MB',
      '<strong>Stüdyo kaydı</strong> (48.000 Hz, 24 bit, stereo): 2.304 kbps, dakikada 17,28 MB',
      '<strong>Yüksek çözünürlük</strong> (96.000 Hz, 24 bit, stereo): 4.608 kbps, dakikada 34,56 MB',
      '<strong>MP3 128 kbps</strong>: dakikada 0,96 MB',
      '<strong>MP3 192 kbps</strong>: dakikada 1,44 MB',
      '<strong>MP3 320 kbps</strong>: dakikada 2,4 MB',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Podcast ya da sesli kitap kaydeden biri, bir saatlik bölümün kaç megabayt olacağını bilerek barındırma kotasını planlayabilir. Mono, 96 kbps bir konuşma kaydı saatte yaklaşık 43 MB tutar; stereo ve 192 kbps seçilirse bu değer iki katına çıkar. Toplantı ve ders kaydı alanlar, ses kayıt cihazındaki hafıza kartının kaç saat yeteceğini hesaplayabilir. Müzisyenler çok kanallı kayıt öncesi disk ihtiyacını görür: 24 bit, 48 kHz ile kaydedilen 16 kanallı bir saatlik prova, kanal sayısı alanına 16 yazıldığında yaklaşık 8,3 GB çıkar.',
      'Çağrı merkezi ve santral kayıtlarında, radyo arşivlerinde ya da e-posta ekine sığması gereken sesli mesajlarda da aynı hesap geçerlidir. Bir dosyanın eke sığıp sığmayacağını görmek için süreyi ve hedef bit hızını yazmanız yeterlidir.',
    ] },
    { h: 'MB ile MiB farkı', p: [
      'Araç boyutu iki ayrı birimle verir. <strong>MB</strong> (megabayt) ondalık tanımla 1.000.000 bayttır ve depolama üreticileri ile çoğu internet hizmeti bu tanımı kullanır. <strong>MiB</strong> (mebibayt) ise 1.048.576 bayttır; bazı işletim sistemleri dosya boyutunu bu birimle hesaplayıp yine "MB" diye gösterir. Bu yüzden 10,584 MB olarak hesaplanan bir dakikalık WAV dosyası bilgisayarınızda 10,09 MB olarak görünebilir. İkisi de doğrudur; fark yalnızca birim tanımından gelir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata kilobit ile kilobaytı karıştırmaktır: bit hızındaki "kbps" saniyede kilobittir, bayta çevirmek için sekize bölmek gerekir. İkinci hata, sıkıştırılmış dosyada örnekleme hızı ve bit derinliğini hesaba katmaya çalışmaktır; MP3 gibi biçimlerde boyutu yalnızca bit hızı ve süre belirler. Araç, dosya başlıklarını, gömülü kapak görsellerini ve etiket bilgilerini hesaba katmaz; bunlar genellikle birkaç yüz kilobaytı geçmez ama kısa dosyalarda oransal olarak fark edilir.',
    ] },
  ],
  faq: [
    ['1 dakikalık WAV dosyası kaç MB tutar?', 'CD kalitesinde (44.100 Hz, 16 bit, stereo) 10,584 MB tutar. 48.000 Hz ve 24 bit stereo kayıtta bu değer 17,28 MB olur; mono kayıtta yarıya iner.'],
    ['3 dakikalık bir MP3 kaç MB olur?', '128 kbps hızında 2,88 MB, 192 kbps hızında 4,32 MB, 320 kbps hızında 7,2 MB olur. Formül bit hızı çarpı saniye bölü sekizdir.'],
    ['Bit hızı (kbps) nedir?', 'Sesin her saniyesi için kullanılan veri miktarıdır ve saniyede kilobit olarak ölçülür. Bit hızı yükseldikçe ses kalitesi ve dosya boyutu birlikte artar.'],
    ['Mono kayıt dosyayı ne kadar küçültür?', 'Sıkıştırılmamış kayıtta tam olarak yarıya indirir, çünkü tek kanal saklanır. Konuşma kayıtlarında stereo çoğu zaman gereksizdir; mono seçmek yer kazandırır.'],
    ['24 bit kayıt 16 bite göre ne kadar yer kaplar?', 'Bit derinliği boyutla doğru orantılıdır; 24 bit kayıt aynı ayarlarda 16 bit kaydın bir buçuk katı yer tutar.'],
    ['Hesaplanan boyut ile bilgisayardaki boyut neden farklı?', 'Çoğunlukla birim tanımından kaynaklanır: araç ondalık megabaytı esas alır, bazı sistemler ise 1.048.576 baytlık birimi kullanır. Ayrıca dosya başlığı, etiketler ve kapak görseli küçük bir ek yer tutar.'],
    ['FLAC dosyasının boyutunu hesaplayabilir miyim?', 'Kesin olarak hayır. FLAC kayıpsız sıkıştırma kullandığı için boyut müziğin içeriğine göre değişir. Yaklaşık bir fikir için önce WAV boyutunu hesaplayıp bunun yüzde 50 ile 70 arası bir değer bekleyebilirsiniz.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; ses dosyası yüklemeniz gerekmez ve girdiğiniz sayılar sunucuya iletilmez.'],
  ],
  related: ['mb-gb-cevir', 'bit-bayt-cevir', 'indirme-suresi-hesapla', 'gib-gb-cevir', 'bpm-ms-hesapla'],
};
