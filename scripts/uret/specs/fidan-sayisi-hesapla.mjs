export default {
  slug: 'fidan-sayisi-hesapla',
  title: 'Fidan Sayısı (Dikim Aralığı) Hesaplama',
  h1Tail: 'dekara kaç fidan?',
  pageTitle: 'Fidan Sayısı Hesaplama – Dikim Aralığına Göre Dekara Kaç Fidan?',
  description: 'Arazi büyüklüğü ile sıra arası ve sıra üzeri mesafeyi yazın; kare, dikdörtgen ya da üçgen dikimde gereken fidan sayısını ve dekara düşen ağaç adedini hesaplayın.',
  card: 'Sıra arası ve sıra üzeri mesafeye göre gereken fidan sayısını, dekara ağaç adedini ve yedek payını bulun.',
  category: 'gunluk',
  keywords: ['fidan sayısı hesaplama', 'dekara kaç fidan', 'dikim aralığı hesaplama', 'dönüme kaç ağaç', 'ceviz dikim aralığı', 'üçgen dikim hesabı', 'bahçe tesisi fidan hesabı'],
  lead: 'Bahçe kurmadan önce kaç fidan sipariş edeceğinizi bilmeniz gerekir. Bu araç, arazinizin büyüklüğünü ve <strong>sıra arası × sıra üzeri</strong> dikim mesafesini kullanarak gereken fidan sayısını, dekara düşen ağaç adedini ve her ağaca kalan alanı hesaplar; kare, dikdörtgen ve üçgen dikim sistemlerini destekler.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Dikim alanı (dekar)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'siraArasi', label: 'Sıra arası mesafe (metre)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'siraUzeri', label: 'Sıra üzeri mesafe (metre)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'sistem', label: 'Dikim sistemi', type: 'select', options: [['dik', 'Kare / dikdörtgen dikim'], ['ucgen', 'Üçgen (şaşırtmalı) dikim']] },
    { id: 'yedek', label: 'Yedek fidan payı (%)', type: 'number', value: '0', hint: 'Tutmayan fidanlar için; istemiyorsanız 0 bırakın' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Dikim alanı');
    const sa = h.pos(v.siraArasi, 'Sıra arası mesafe');
    const su = h.pos(v.siraUzeri, 'Sıra üzeri mesafe');
    const yedek = h.nonneg(v.yedek, 'Yedek fidan payı');
    const ucgen = v.sistem === 'ucgen';
    if (ucgen && Math.abs(sa - su) > 1e-9) h.err('Üçgen dikimde ağaçlar arası mesafe her yönde eşittir; sıra arası ve sıra üzeri alanlarına aynı değeri yazın.');
    const m2 = alan * 1000;
    const agacAlan = ucgen ? su * su * Math.sqrt(3) / 2 : sa * su;
    const ham = m2 / agacAlan;
    const adet = Math.floor(ham + 1e-9);
    const rows = [
      ['Gereken fidan sayısı', h.fmt(adet, 0) + ' adet'],
      ['Dekara fidan sayısı', h.fmt(1000 / agacAlan, 2) + ' adet/da'],
      ['Bir ağaca düşen alan', h.fmt(agacAlan, 2) + ' m²'],
      ['Dikim alanı', h.fmt(m2, 1) + ' m²'],
    ];
    if (ucgen) rows.push(['Sıralar arası dik mesafe', h.fmt(su * Math.sqrt(3) / 2, 2) + ' m']);
    if (yedek > 0) {
      const ek = Math.ceil(adet * yedek / 100 - 1e-9);
      rows.push(['Yedek fidan', h.fmt(ek, 0) + ' adet']);
      rows.push(['Yedekle birlikte sipariş', h.fmt(adet + ek, 0) + ' adet']);
    }
    return {
      rows,
      note: 'Hesap alanın tamamının dikildiğini varsayar; yol, sınır boşluğu ve parselin şekli nedeniyle gerçek sayı biraz daha düşük çıkabilir.',
    };
  },
  cases: [
    { in: { alan: '10', siraArasi: '5', siraUzeri: '5', sistem: 'dik', yedek: '0' }, out: { 'Gereken fidan sayısı': '400 adet', 'Dekara fidan sayısı': '40 adet/da', 'Bir ağaca düşen alan': '25 m²' } },
    { in: { alan: '1', siraArasi: '4', siraUzeri: '2', sistem: 'dik', yedek: '0' }, out: { 'Gereken fidan sayısı': '125 adet', 'Dekara fidan sayısı': '125 adet/da', 'Bir ağaca düşen alan': '8 m²' } },
    { in: { alan: '10', siraArasi: '5', siraUzeri: '5', sistem: 'ucgen', yedek: '0' }, out: { 'Gereken fidan sayısı': '461 adet', 'Dekara fidan sayısı': '46,19 adet/da', 'Bir ağaca düşen alan': '21,65 m²', 'Sıralar arası dik mesafe': '4,33 m' } },
    { in: { alan: '20', siraArasi: '7', siraUzeri: '7', sistem: 'dik', yedek: '0' }, out: { 'Gereken fidan sayısı': '408 adet', 'Dekara fidan sayısı': '20,41 adet/da', 'Bir ağaca düşen alan': '49 m²' } },
    { in: { alan: '5', siraArasi: '3,5', siraUzeri: '1,5', sistem: 'dik', yedek: '0' }, out: { 'Gereken fidan sayısı': '952 adet', 'Dekara fidan sayısı': '190,48 adet/da', 'Bir ağaca düşen alan': '5,25 m²' } },
    { in: { alan: '10', siraArasi: '5', siraUzeri: '5', sistem: 'dik', yedek: '5' }, out: { 'Gereken fidan sayısı': '400 adet', 'Yedek fidan': '20 adet', 'Yedekle birlikte sipariş': '420 adet' } },
    { in: { alan: '10', siraArasi: '6', siraUzeri: '5', sistem: 'ucgen', yedek: '0' }, error: true },
    { in: { alan: '10', siraArasi: '0', siraUzeri: '5', sistem: 'dik', yedek: '0' }, error: true },
    { in: { alan: '', siraArasi: '5', siraUzeri: '5', sistem: 'dik', yedek: '0' }, error: true },
  ],
  howto: [
    'Fidan dikeceğiniz alanı dekar olarak yazın; yol ve bina gibi dikilmeyecek kısımları çıkarmanız sonucu gerçeğe yaklaştırır.',
    'Sıra arası mesafeyi (iki sıra arasındaki uzaklık) ve sıra üzeri mesafeyi (aynı sıradaki iki fidan arası) metre olarak girin.',
    'Dikim sistemini seçin. Üçgen dikimde ağaçlar arası mesafe her yönde eşit olduğundan iki alana aynı değeri yazın.',
    'Tutmayan fidanlar için yedek almak istiyorsanız yüzde olarak pay girin.',
    '"Hesapla" düğmesine basın; fidan sayısını, dekara ağaç adedini ve varsa yedekli sipariş miktarını görün.',
  ],
  sections: [
    { h: 'Hesaplama mantığı', p: [
      'Her fidan, sıra arası ile sıra üzeri mesafenin çarpımı kadar bir alanı kaplar. Bu yüzden kare ve dikdörtgen dikimde formül şudur: <strong>fidan sayısı = alan (m²) ÷ (sıra arası × sıra üzeri)</strong>. 1 dekar 1.000 metrekare olduğundan dekara fidan sayısı doğrudan 1.000 ÷ (sıra arası × sıra üzeri) ile bulunur.',
      'Sonuç küsuratlı çıktığında aşağı yuvarlanır, çünkü yarım ağaç dikilemez ve alana sığan tam ağaç sayısı esas alınır. "Dekara fidan sayısı" satırı ise planlama ve kıyaslama için ondalıklı olarak gösterilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: 10 dekarlık araziye 5 × 5 metre aralıkla kare dikim yapılacak. Bir ağaca 5 × 5 = 25 metrekare düşer. Alan 10.000 metrekaredir; 10.000 ÷ 25 = 400 fidan gerekir, dekara 40 ağaç eder. Yüzde 5 yedek payıyla 20 fidan daha eklenir ve 420 fidan sipariş edilir.',
      'Örnek 2: 1 dekarlık alana 4 × 2 metre aralıkla dikdörtgen dikim yapılırsa her ağaca 8 metrekare düşer ve 1.000 ÷ 8 = 125 fidan gerekir.',
      'Örnek 3: 5 dekarlık yarı bodur bahçede sıra arası 3,5 metre, sıra üzeri 1,5 metre alınırsa bir ağaca 5,25 metrekare düşer. 5.000 ÷ 5,25 = 952,38 çıkar; 952 fidan dikilir ve dekara yaklaşık 190 ağaç gelir.',
      'Örnek 4: 20 dekar araziye 7 × 7 metre aralıkla dikimde ağaç başına 49 metrekare, toplamda 20.000 ÷ 49 = 408 fidan hesaplanır.',
    ] },
    { h: 'Kare, dikdörtgen ve üçgen dikim sistemleri', p: [
      '<strong>Kare dikimde</strong> sıra arası ve sıra üzeri mesafe eşittir; ağaçlar bir karenin köşelerine gelir. İşaretlemesi kolaydır ve iki yönde de toprak işlemeye izin verir. <strong>Dikdörtgen dikimde</strong> sıra arası daha geniş tutulur; traktör ve ilaçlama makinesi sıra arasında rahat çalışır, sıra üzerinde ağaçlar sıklaşır. Günümüzdeki sık dikim bahçelerinin çoğu bu sistemdedir.',
      '<strong>Üçgen (şaşırtmalı) dikimde</strong> ağaçlar eşkenar üçgenin köşelerine yerleştirilir; her ağaç komşu altı ağaca eşit uzaklıktadır. İkinci sıradaki ağaçlar birinci sıradakilerin tam ortasına denk gelir ve sıralar arasındaki dik mesafe, ağaçlar arası mesafenin yaklaşık 0,866 katına iner. Bu nedenle aynı mesafeyle kare dikime göre yaklaşık yüzde 15 daha fazla ağaç sığar. Formül: <strong>fidan sayısı = alan ÷ (mesafe² × 0,866)</strong>. 10 dekara 5 metre aralıkla üçgen dikimde 10.000 ÷ 21,65 = 461 fidan gerekir; aynı mesafeyle kare dikimde bu sayı 400\'dür. Araç ayrıca sıraların hangi dik aralıkla (bu örnekte 4,33 metre) çekileceğini gösterir.',
    ] },
    { h: 'Dikim aralığını neler belirler?', ul: [
      '<strong>Tür ve çeşit:</strong> Ağacın yetişkinlikte ulaşacağı taç genişliği temel ölçüdür; geniş taçlı türler daha seyrek dikilir.',
      '<strong>Anaç:</strong> Bodur ve yarı bodur anaçlar üzerindeki fidanlar çok daha sık dikilebilir; çöğür anaçlı ağaçlar geniş aralık ister.',
      '<strong>Toprak ve sulama:</strong> Verimli ve sulanan toprakta ağaç daha çok gelişir, aralık geniş tutulur; kıraç ve susuz arazide gelişme sınırlıdır.',
      '<strong>Terbiye sistemi:</strong> Telli terbiye ve duvar sistemlerinde sıra üzeri mesafe belirgin biçimde daralır.',
      '<strong>Makine kullanımı:</strong> Sıra arası, kullanılacak traktör ve ekipmanın genişliğine dönüş payı eklenerek belirlenir.',
      '<strong>Eğim:</strong> Eğimli arazide sıralar eş yükselti eğrilerine paralel çekilir ve teraslama dikim düzenini değiştirebilir.',
    ], p: [
      'Bu sayfa belirli bir tür için aralık önermez; aynı tür için bile anaca ve yetiştirme sistemine göre uygun mesafe çok değişir. Fidan aldığınız üreticinin ve bölgenizdeki tarım kuruluşlarının önerisini esas alın.',
    ] },
    { h: 'Gerçek sayı neden biraz farklı çıkabilir?', p: [
      'Formül, arazinin tamamının düzgün bir ızgara gibi dikildiğini kabul eder. Uygulamada tarla sınırından içeri bir pay bırakılır, makinelerin dönmesi için baş ve sonlarda boşluk gerekir, sulama hattı, yol, depo ya da kuyu yer kaplar. Parselin şekli yamuk ya da üçgense kenarlarda yarım kalan sıralar oluşur. Bu yüzden özellikle küçük ve düzensiz parsellerde sahada dikilen ağaç sayısı hesaplanandan birkaç yüzde az olabilir. Kesin sayı için araziyi ölçüp sıraları kâğıt üzerinde ya da sahada kazıkla işaretlemek en doğru yoldur.',
      'Buna karşılık sökümde zarar gören, nakliyede kuruyan ya da ilk yıl tutmayan fidanlar için bir miktar yedek almak yaygın bir uygulamadır. Yedek payını kendi koşullarınıza ve fidancının garantisine göre belirleyin.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Araç yalnızca meyve bahçesi için değil; bağ tesisi, kavaklık, ağaçlandırma sahası, zeytinlik, fındıklık, süs bitkisi parseli ve sebze fidesi dikimi için de kullanılabilir. Fide dikiminde mesafeleri metre cinsinden yazmanız yeterlidir: 70 santimetre sıra arası ve 40 santimetre sıra üzeri için 0,7 ve 0,4 girersiniz; 1 dekar için 1.000 ÷ 0,28 = 3.571 fide çıkar. Destek başvurusu, fidan siparişi, damla sulama borusu ve damlatıcı sayısı planlaması gibi işlerde dekara ağaç adedi temel girdidir.',
    ] },
  ],
  faq: [
    ['Dekara kaç fidan dikilir?', 'Dikim aralığına bağlıdır: 1.000\'i sıra arası ile sıra üzeri mesafenin çarpımına bölersiniz. 5 × 5 metrede dekara 40, 4 × 2 metrede 125, 7 × 7 metrede yaklaşık 20 fidan düşer.'],
    ['Sıra arası ve sıra üzeri ne demek?', 'Sıra arası, yan yana iki ağaç sırası arasındaki mesafedir. Sıra üzeri ise aynı sıra üzerindeki ardışık iki ağaç arasındaki mesafedir. "4 × 2" yazımında ilk sayı sıra arasını, ikinci sayı sıra üzerini gösterir.'],
    ['Üçgen dikim neden daha fazla ağaç alır?', 'Sıralar şaşırtmalı yerleştiği için sıralar arasındaki dik mesafe ağaçlar arası mesafenin 0,866 katına iner. Ağaçlar birbirine yine aynı uzaklıkta kalır ama alan daha verimli kullanılır ve yaklaşık yüzde 15 fazla ağaç sığar.'],
    ['Santimetre ile ölçü girebilir miyim?', 'Mesafeleri metre olarak girmeniz gerekir; santimetreyi 100\'e bölün. 80 santimetre için 0,8 yazın.'],
    ['Arazim dönüm değil metrekare olarak belli, ne yapmalıyım?', 'Metrekare değerini 1.000\'e bölerek dekara çevirin. 3.500 metrekarelik bir arazi 3,5 dekardır.'],
    ['Yedek fidan almalı mıyım?', 'Dikimden sonra bir kısım fidanın tutmaması olağandır; boşlukları aynı çeşit ve yaşta fidanla doldurabilmek için bir miktar yedek almak işinizi kolaylaştırır. Oranı fidan kalitesine, dikim zamanına ve sulama imkânınıza göre siz belirlersiniz.'],
    ['Sonuç neden aşağı yuvarlanıyor?', 'Alana sığan tam ağaç sayısı esas alındığı için küsurat atılır. 952,38 sonucu 952 fidan olarak gösterilir; kenar boşlukları nedeniyle sahada sayı zaten bir miktar daha düşebilir.'],
    ['Girdiğim arazi bilgileri kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['dekar-verim-hesapla', 'sulama-suyu-hesapla', 'gubre-miktari-hesapla', 'donum-metrekare-cevir', 'hektar-donum-cevir'],
};
