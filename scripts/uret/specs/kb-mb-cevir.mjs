export default {
  slug: 'kb-mb-cevir',
  title: 'Kilobayt Megabayt Çevirici',
  h1Tail: 'KB ↔ MB',
  pageTitle: 'Kilobayt Megabayt Çevirici – KB\'den MB\'ye, MB\'den KB\'ye Hesaplama',
  description: 'Kilobaytı megabayta, megabaytı kilobayta çevirin. 1 MB = 1024 KB ya da 1000 KB seçeneğiyle çalışır; bayt ve gigabayt karşılığını da gösterir.',
  card: 'KB değerini MB\'ye, MB değerini KB\'ye çevirin; fotoğraf ve belge yükleme sınırlarını kolayca karşılaştırın.',
  category: 'birim',
  keywords: ['kb mb çevirme', '1 mb kaç kb', 'kilobayt megabayt', 'kb kaç mb eder', 'kb to mb', '500 kb kaç mb', 'dosya boyutu kb mb'],
  lead: 'Kilobayt (KB) cinsinden verilen bir dosya boyutunu megabayta (MB), megabaytı kilobayta çevirin. Başvuru sistemlerindeki "en fazla 500 KB" ya da "en fazla 2 MB" gibi sınırları kendi dosyanızın boyutuyla karşılaştırmak için <strong>1 MB = 1024 KB</strong> ve <strong>1 MB = 1000 KB</strong> kabullerinin ikisi de kullanılabilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 500' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kb', 'Kilobayt → Megabayt'], ['mb', 'Megabayt → Kilobayt']] },
    { id: 'sistem', label: 'Kat sayısı', type: 'select', options: [['1024', 'İkili: 1 MB = 1024 KB'], ['1000', 'Ondalık: 1 MB = 1000 KB']], hint: 'Dosya yöneticilerinin çoğu 1024 tabanını kullanır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const k = v.sistem === '1000' ? 1000 : 1024;
    const kb = v.yon === 'mb' ? x * k : x;
    const mb = kb / k;
    const bayt = kb * k;
    const rMb = ['Megabayt', h.sig(mb, 8) + ' MB'];
    const rKb = ['Kilobayt', h.sig(kb, 8) + ' KB'];
    const diger = k === 1024
      ? ['Ondalık sistemde (1 MB = 1000 KB)', h.sig(bayt / 1e6, 8) + ' MB']
      : ['İkili sistemde (1 MiB = 1024 KiB)', h.sig(bayt / 1048576, 8) + ' MiB'];
    return {
      rows: [
        ...(v.yon === 'mb' ? [rKb, rMb] : [rMb, rKb]),
        ['Bayt', h.sig(bayt, 13) + ' bayt'],
        ['Gigabayt', h.sig(mb / k, 8) + ' GB'],
        diger,
      ],
      note: k === 1024
        ? 'Hesap 1 MB = 1024 KB = 1.048.576 bayt kabulüyle yapıldı.'
        : 'Hesap 1 MB = 1000 KB = 1.000.000 bayt (SI ondalık önekleri) kabulüyle yapıldı.',
    };
  },
  cases: [
    { in: { deger: '2048', yon: 'kb', sistem: '1024' }, out: { 'Megabayt': '2 MB', 'Bayt': '2.097.152 bayt' } },
    { in: { deger: '5', yon: 'mb', sistem: '1024' }, out: { 'Kilobayt': '5.120 KB', 'Bayt': '5.242.880 bayt' } },
    { in: { deger: '500', yon: 'kb', sistem: '1024' }, out: { 'Megabayt': '0,48828125 MB', 'Bayt': '512.000 bayt', 'Ondalık sistemde (1 MB = 1000 KB)': '0,512 MB' } },
    { in: { deger: '500', yon: 'kb', sistem: '1000' }, out: { 'Megabayt': '0,5 MB', 'Bayt': '500.000 bayt' } },
    { in: { deger: '1', yon: 'mb', sistem: '1024' }, out: { 'Kilobayt': '1.024 KB', 'Gigabayt': '0,0009765625 GB' } },
    { in: { deger: '0,25', yon: 'mb', sistem: '1024' }, out: { 'Kilobayt': '256 KB' } },
    { in: { deger: '25', yon: 'mb', sistem: '1000' }, out: { 'Kilobayt': '25.000 KB', 'İkili sistemde (1 MiB = 1024 KiB)': '23,841858 MiB' } },
    { in: { deger: 'on', yon: 'kb' }, error: true },
    { in: { deger: '-100', yon: 'kb' }, error: true },
  ],
  howto: [
    '"Değer" alanına dosya boyutunu yazın. Dosyanın boyutunu, dosyaya sağ tıklayıp özelliklerine bakarak ya da telefonda dosya ayrıntılarından öğrenebilirsiniz.',
    '"Çeviri yönü" listesinden KB → MB ya da MB → KB seçin.',
    '"Kat sayısı" alanını gerekmedikçe 1024\'te bırakın; ondalık hesap isteyen bir belgeyle çalışıyorsanız 1000\'i seçin.',
    '"Çevir" düğmesine basın. Sonuçta megabayt, kilobayt, bayt ve gigabayt değerleri birlikte listelenir.',
  ],
  sections: [
    { h: 'Kilobayt megabayta nasıl çevrilir?', p: [
      'Kilobayt, baytın yaklaşık bin katı; megabayt ise kilobaytın yaklaşık bin katıdır. İkili sayımda tam değerler 1 KB = 1024 bayt ve 1 MB = 1024 KB biçimindedir. Dolayısıyla <strong>MB = KB ÷ 1024</strong> ve <strong>KB = MB × 1024</strong> formülleri kullanılır. Ondalık sayımı tercih ederseniz 1024 yerine 1000 yazmanız yeterlidir.',
      'Çözümlü örnek: 2048 KB\'lik bir belge 2048 ÷ 1024 = 2 MB eder ve 2.097.152 bayt içerir. 5 MB\'lik bir fotoğraf 5 × 1024 = 5.120 KB\'dir. 500 KB ise 500 ÷ 1024 = 0,48828125 MB tutar; yani "yarım megabayttan biraz küçük" denebilir. Aynı 500 KB ondalık sistemde tam 0,5 MB\'dir.',
    ] },
    { h: 'Yükleme sınırlarını doğru okumak', p: [
      'Çevrim içi başvuru formları, sınav kayıt ekranları ve kurumsal portallar yüklenecek fotoğraf ya da belge için bir üst sınır koyar. Sınır bazen kilobayt ("en fazla 300 KB"), bazen megabayt ("en fazla 1 MB") olarak yazılır; elinizdeki dosyanın boyutu ise öteki birimle görünüyor olabilir. Dosyanız 0,8 MB görünüyorsa ve sınır 1024 KB ise, 0,8 × 1024 = 819,2 KB ettiğinden rahatça sığar. Dosyanız 1,2 MB ise 1.228,8 KB eder ve küçültülmesi gerekir.',
      'Sınıra çok yakın dosyalarda temkinli olun. Sistemin sınırı 1000 tabanıyla mı yoksa 1024 tabanıyla mı uyguladığını çoğu zaman bilemezsiniz. 1 MB sınırı olan bir forma tam 1.020 KB\'lik bir dosya yüklerseniz, sınır 1.000.000 bayt olarak tanımlandıysa reddedilirsiniz. Güvenli yol, dosyayı sınırın yüzde beş on kadar altında tutmaktır.',
    ] },
    { h: 'Sık karşılaşılan boyutlar (1024 tabanı)', ul: [
      '<strong>50 KB</strong> = 0,048828125 MB',
      '<strong>100 KB</strong> = 0,09765625 MB',
      '<strong>200 KB</strong> = 0,1953125 MB',
      '<strong>300 KB</strong> = 0,29296875 MB',
      '<strong>512 KB</strong> = 0,5 MB',
      '<strong>1024 KB</strong> = 1 MB',
      '<strong>2 MB</strong> = 2.048 KB',
      '<strong>5 MB</strong> = 5.120 KB',
      '<strong>10 MB</strong> = 10.240 KB',
      '<strong>25 MB</strong> = 25.600 KB',
    ] },
    { h: 'Dosya boyutu ile diskte kapladığı alan', p: [
      'Dosya özelliklerinde iki ayrı değer görebilirsiniz: "boyut" ve "diskteki boyut". İlki dosyanın gerçek içeriğinin bayt sayısıdır; ikincisi ise dosya sisteminin o dosyaya ayırdığı blokların toplamıdır ve genellikle biraz daha büyüktür. Yükleme sınırlarında ve e-posta eklerinde önemli olan birincisidir. Çeviri yaparken bayt cinsinden gerçek boyutu esas alırsanız en doğru sonucu elde edersiniz; aracın "Bayt" satırı bu karşılaştırma için konmuştur.',
      'E-posta ile gönderilen dosyaların aktarım sırasında kodlama nedeniyle bir miktar büyüdüğünü de unutmayın. Ek boyutu sınırının hemen altındaki bir dosya bu yüzden geri dönebilir.',
    ] },
    { h: 'KB, kB, Kb: yazım farkları', p: [
      'Birimin yazılışı anlamı değiştirir. Büyük B bayt, küçük b bit demektir; 1 bayt 8 bittir. Dolayısıyla <code>KB</code> ya da <code>kB</code> kilobayt, <code>Kb</code> ya da <code>kbit</code> kilobittir. SI kuralına göre "kilo" öneki küçük k ile yazılır ve 1000 anlamına gelir; 1024 baytlık birimin resmî adı ise kibibayttır ve <code>KiB</code> olarak gösterilir. Gündelik kullanımda bu ayrımlara pek uyulmaz; bu yüzden bir değerin hangi sistemde verildiğini bağlamdan çıkarmak gerekir.',
    ] },
    { h: 'Sınırlar ve ipuçları', p: [
      'Araç sıfır ve pozitif değerlerle çalışır; negatif boyut anlamlı olmadığı için hata verir. Sonuçlar sekiz anlamlı basamağa kadar gösterilir. Çok büyük dosyalar için megabayt yerine gigabayt satırına bakmak daha okunaklı olur. Dosyanız sınırı aşıyorsa görseller için boyut küçültme, PDF belgeleri için sıkıştırma araçlarını kullanarak boyutu düşürebilir, ardından yeni değeri burada tekrar kontrol edebilirsiniz.',
    ] },
  ],
  faq: [
    ['1 MB kaç KB eder?', 'İkili kabulde 1 MB = 1024 KB, ondalık SI tanımında 1 MB = 1000 KB\'dir. Bilgisayarların dosya boyutu gösterimlerinde çoğunlukla 1024 kullanılır.'],
    ['1 KB kaç MB eder?', '1024 tabanında 1 KB = 0,0009765625 MB, 1000 tabanında 1 KB = 0,001 MB\'dir.'],
    ['500 KB kaç MB eder?', '1024 tabanında 0,48828125 MB, 1000 tabanında 0,5 MB eder. Bayt olarak sırasıyla 512.000 ve 500.000 bayttır.'],
    ['KB mi büyük, MB mi?', 'Megabayt daha büyüktür. Bir megabayt yaklaşık bin kilobayttır; sıralama bayt, kilobayt, megabayt, gigabayt, terabayt biçiminde ilerler.'],
    ['Fotoğrafım 2 MB, sınır 500 KB; ne kadar küçültmeliyim?', '2 MB, 2.048 KB eder. 500 KB sınırına inmek için dosyayı yaklaşık dörtte birine düşürmeniz gerekir. Çözünürlüğü azaltmak ya da sıkıştırma oranını artırmak bu farkı kapatır.'],
    ['1 KB kaç bayttır?', 'İkili sistemde 1024, ondalık sistemde 1000 bayttır. Düz metinde her harf yaklaşık bir bayt tuttuğundan 1 KB kabaca bin karakterlik bir yazıya karşılık gelir; Türkçeye özgü harfler kodlamaya göre iki bayt tutabilir.'],
    ['Sonuç neden uzun ondalıklı çıkıyor?', '1024, onun kuvveti olmadığı için bölme sonuçları çoğu zaman tam çıkmaz. Pratikte iki ya da üç ondalık basamak yeterlidir; araç ise yuvarlama hatası olmasın diye sekiz anlamlı basamağa kadar gösterir.'],
    ['Girdiğim değer bir sunucuya gidiyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız sayı gönderilmez ve kaydedilmez. Sayfa bir kez yüklendikten sonra çevrimdışı da çalışır.'],
  ],
  related: ['mb-gb-cevir', 'bit-bayt-cevir', 'gb-tb-cevir', 'fotograf-50-kb-yap', 'resim-kucult', 'pdf-kucult'],
};
