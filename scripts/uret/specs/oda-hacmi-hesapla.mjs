export default {
  slug: 'oda-hacmi-hesapla',
  title: 'Oda Hacmi ve Havalandırma Hesaplama',
  h1Tail: 'm³ ve fan debisi',
  pageTitle: 'Oda Hacmi Hesaplama – Metreküp ve Havalandırma Debisi (m³/h)',
  description: 'Odanın en, boy ve yüksekliğinden hacmini metreküp olarak bulun; saatlik hava değişim sayısına göre gereken havalandırma debisini m³/h, L/s ve CFM olarak hesaplayın.',
  card: 'Oda hacmini metreküp olarak bulun; hava değişim sayısına göre gereken fan debisini m³/h, L/s ve CFM olarak görün.',
  category: 'insaat',
  keywords: ['oda hacmi hesaplama', 'metreküp hesaplama oda', 'havalandırma debisi hesaplama', 'fan debisi hesaplama', 'hava değişim sayısı', 'aspiratör kaç m3/h olmalı', 'm3/h cfm çevirme'],
  lead: `Odanızın ölçülerini girerek <strong>hacmini metreküp</strong> olarak bulun. Saatte kaç kez hava değişimi istediğinizi de yazarsanız araç, bu odayı havalandırmak için gereken <strong>fan debisini</strong> m³/h, litre/saniye ve CFM cinsinden hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'En (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Boy (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Tavan yüksekliği (m)', type: 'number', value: '2,7' },
    { id: 'degisim', label: 'Saatlik hava değişim sayısı', type: 'number', value: '6', hint: 'Odadaki havanın saatte kaç kez yenileneceği. Kullanım amacına göre değişir; aşağıdaki açıklamalara bakın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const ach = h.pos(v.degisim, 'Saatlik hava değişim sayısı');
    const alan = en * boy;
    const hacim = alan * yuk;
    const debi = hacim * ach;
    return {
      rows: [
        ['Oda hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Gereken hava debisi', h.fmt(debi, 1) + ' m³/h'],
        ['Debi (litre/saniye)', h.fmt(debi / 3.6, 2) + ' L/s'],
        ['Debi (CFM)', h.fmt(debi * 0.5885778, 1) + ' CFM'],
        ['Taban alanı', h.fmt(alan, 2) + ' m²'],
        ['Hacim (litre)', h.fmt(hacim * 1000, 0) + ' L'],
        ['Bir hava değişimi süresi', h.fmt(60 / ach, 1) + ' dakika'],
      ],
      note: 'Debi = oda hacmi × saatlik hava değişim sayısı. Kanal, menfez ve filtre dirençleri hesaba katılmaz; fan seçerken bu kayıplar için pay bırakın.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', yukseklik: '2,7', degisim: '6' }, out: { 'Oda hacmi': '54 m³', 'Gereken hava debisi': '324 m³/h', 'Debi (litre/saniye)': '90 L/s', 'Debi (CFM)': '190,7 CFM', 'Taban alanı': '20 m²' } },
    { in: { en: '3', boy: '3', yukseklik: '2,5', degisim: '10' }, out: { 'Oda hacmi': '22,5 m³', 'Gereken hava debisi': '225 m³/h', 'Debi (litre/saniye)': '62,5 L/s', 'Bir hava değişimi süresi': '6 dakika' } },
    { in: { en: '2', boy: '1,5', yukseklik: '2,4', degisim: '8' }, out: { 'Oda hacmi': '7,2 m³', 'Gereken hava debisi': '57,6 m³/h', 'Debi (litre/saniye)': '16 L/s' } },
    { in: { en: '10', boy: '8', yukseklik: '3', degisim: '4' }, out: { 'Oda hacmi': '240 m³', 'Gereken hava debisi': '960 m³/h', 'Debi (litre/saniye)': '266,67 L/s', 'Hacim (litre)': '240.000 L' } },
    { in: { en: '5', boy: '4', yukseklik: '3', degisim: '1' }, out: { 'Oda hacmi': '60 m³', 'Gereken hava debisi': '60 m³/h', 'Bir hava değişimi süresi': '60 dakika' } },
    { in: { en: '4', boy: '5', yukseklik: '0', degisim: '6' }, error: true },
    { in: { en: 'x', boy: '5', yukseklik: '2,7', degisim: '6' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu duvardan duvara metre olarak ölçüp yazın.',
    'Tavan yüksekliğini girin. Asma tavan varsa asma tavanın altına kadar olan yüksekliği kullanın.',
    'Saatlik hava değişim sayısını yazın. Yalnızca hacim gerekiyorsa varsayılan değeri değiştirmeden bırakabilirsiniz.',
    '"Hesapla" düğmesine basın; oda hacmi ve gereken debi üç farklı birimle listelenir.',
    'Fan ya da aspiratör seçerken etiketteki debi değerini "Gereken hava debisi" satırıyla karşılaştırın.',
  ],
  sections: [
    { h: 'Oda hacmi nasıl hesaplanır?', p: [
      `Dikdörtgen planlı bir odanın hacmi üç ölçünün çarpımıdır: <strong>hacim (m³) = en × boy × yükseklik</strong>. 4 m eninde, 5 m boyunda ve tavanı 2,7 m olan bir oda 4 × 5 × 2,7 = 54 m³ eder. Taban alanı 20 m²'dir; hacim, alanın tavan yüksekliğiyle çarpılmış halidir. 1 m³ 1.000 litre olduğundan bu oda 54.000 litre hava barındırır.`,
      `L biçimli odalarda planı iki dikdörtgene ayırıp hacimleri toplayın. Eğimli tavanlı çatı katlarında ortalama yüksekliği (en alçak ve en yüksek noktanın ortalaması) kullanmak yeterli bir yaklaşımdır. Büyük gömme dolaplar ve kolonlar hacmi biraz azaltır, ancak havalandırma hesabında genellikle ihmal edilir.`,
    ] },
    { h: 'Hava değişim sayısı ve debi', p: [
      `Havalandırmada temel soru, odadaki havanın saatte kaç kez yenileneceğidir. Bu değere <strong>saatlik hava değişim sayısı</strong> denir. Gereken debi basitçe <strong>debi (m³/h) = oda hacmi × hava değişim sayısı</strong> formülüyle bulunur. 54 m³'lük odada saatte 6 değişim isteniyorsa 54 × 6 = 324 m³/h debi gerekir; bu, odadaki havanın 10 dakikada bir tümüyle yenilenmesi anlamına gelir.`,
      `Aynı debi başka birimlerle de ifade edilir. Litre/saniyeye çevirmek için 3,6'ya bölünür: 324 m³/h = 90 L/s. İthal fan ve davlumbaz etiketlerinde görülen CFM (dakikada fit küp) için yaklaşık 0,5886 ile çarpılır: 324 m³/h yaklaşık 190,7 CFM eder.`,
    ] },
    { h: 'Hangi mekân için kaç hava değişimi?', p: [
      `Uygun değer mekânın kullanımına, içindeki kişi sayısına, nem ve koku kaynaklarına göre değişir. Aşağıdaki aralıklar havalandırma kılavuzlarında sıkça anılan pratik büyüklüklerdir ve fikir vermek içindir; bağlayıcı değerler projenin tabi olduğu standart ve yönetmeliklerde tanımlanır.`,
    ], ul: [
      '<strong>Yatak odası, oturma odası:</strong> düşük değerler, saatte yaklaşık 1–3 değişim.',
      '<strong>Ofis ve derslik:</strong> kişi yoğunluğuna bağlı olarak saatte yaklaşık 4–8 değişim.',
      '<strong>Banyo ve tuvalet:</strong> nem ve koku nedeniyle saatte yaklaşık 6–10 değişim.',
      '<strong>Ev mutfağı:</strong> pişirme sırasında saatte yaklaşık 10–15 değişim.',
      '<strong>Atölye, çamaşırhane, kapalı otopark gibi alanlar:</strong> kirletici türüne göre daha yüksek değerler; bu tür mekânlarda mutlaka proje yapılmalıdır.',
    ] },
    { h: 'Çözümlü örnek: banyo aspiratörü seçimi', p: [
      `2 m × 1,5 m ölçülerinde, tavanı 2,4 m olan penceresiz bir banyo düşünelim. Hacim 2 × 1,5 × 2,4 = 7,2 m³ eder. Saatte 8 hava değişimi hedeflenirse gereken debi 7,2 × 8 = 57,6 m³/h, yani 16 L/s olur. Piyasadaki küçük banyo aspiratörlerinin etiket debisi çoğunlukla bu değerin üzerindedir; ancak etiketteki rakam fanın serbest üfleme, yani hiçbir dirençle karşılaşmadığı durumdaki debisidir.`,
      `Fan uzun bir kanala, dirseklere ya da panjurlu bir çıkışa bağlandığında gerçek debi belirgin biçimde düşer. Bu nedenle hesaplanan değerin üzerine pay bırakılır ve kanal uzunsa basınç kapasitesi yüksek bir model seçilir. Ayrıca çekilen havanın yerine yenisinin girebilmesi için kapı altında boşluk ya da menfez bulunmalıdır; hava girişi olmayan odada en güçlü fan bile havayı değiştiremez.`,
    ] },
    { h: 'Hacim bilgisinin diğer kullanım alanları', ul: [
      '<strong>Isıtma ve soğutma:</strong> Klima ve petek ön keşiflerinde hacim, ısı yükünün ilk tahmininde kullanılır.',
      '<strong>Nem alma cihazı:</strong> Cihaz kapasiteleri çoğunlukla belirli bir oda hacmi ya da alanı için belirtilir.',
      '<strong>Hava temizleyici:</strong> Cihazın temiz hava debisi, odanın hacmine bölünerek saatte kaç kez süzdüğü bulunur.',
      '<strong>Depolama ve nakliye:</strong> Bir odanın ya da deponun kaç metreküp eşya alacağını kabaca görmek için.',
      '<strong>Akustik:</strong> Yankılanma süresi tahminleri oda hacmine dayanır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu araç genel havalandırma için basit bir ön hesap sunar. Kişi başına taze hava ihtiyacı, ısı geri kazanımı, kanal basınç kayıpları, gürültü düzeyi ve yangın güvenliği gibi konular kapsam dışıdır. Gaz yakan cihazların (kombi, şofben, ocak) bulunduğu mahallerde yanma havası ve baca çekişi can güvenliği meselesidir; bu mekânlarda havalandırmayı yalnızca yetkili firmalar ve ilgili gaz dağıtım kuruluşunun kuralları belirler. İşyeri, mutfak davlumbazı ve endüstriyel uygulamalar için bir makine mühendisinden proje alın.`,
    ] },
  ],
  faq: [
    ['Oda hacmi nasıl hesaplanır?', 'En, boy ve tavan yüksekliği metre cinsinden çarpılır. 3 m × 4 m × 2,6 m ölçüsündeki bir oda 31,2 m³ eder. Sonucu litreye çevirmek için 1.000 ile çarpın.'],
    ['20 metrekare oda kaç metreküptür?', 'Tavan yüksekliğine bağlıdır. 2,5 m yükseklikte 50 m³, 2,7 m yükseklikte 54 m³, 3 m yükseklikte 60 m³ eder.'],
    ['m³/h değerini CFM\'e nasıl çeviririm?', 'm³/h değerini yaklaşık 0,5886 ile çarpın. Tersine CFM değerini yaklaşık 1,699 ile çarparak m³/h bulursunuz. 300 m³/h yaklaşık 176,6 CFM eder.'],
    ['Hava değişim sayısı ne demektir?', 'Odadaki hava hacmine eşit miktarda havanın bir saat içinde kaç kez dışarı atılıp yenisiyle değiştirildiğini gösterir. 6 değişim, havanın ortalama 10 dakikada bir yenilenmesi anlamına gelir.'],
    ['Fan etiketindeki debi neden gerçekte daha düşük çıkar?', 'Etiket değeri çoğunlukla kanalsız, serbest üfleme koşulunda ölçülür. Kanal uzunluğu, dirsekler, menfez ve filtreler direnç oluşturur ve debiyi düşürür. Fan seçerken üreticinin basınç-debi eğrisine bakmak gerekir.'],
    ['Eğimli tavanlı odada yüksekliği nasıl girerim?', 'En alçak ve en yüksek tavan noktasının ortalamasını yazın. Örneğin bir yanda 1,2 m, diğer yanda 3 m olan çatı katı odası için ortalama 2,1 m kullanılır.'],
    ['Yalnızca hacmi öğrenmek istiyorum, değişim sayısını boş bırakabilir miyim?', 'Alan varsayılan olarak doludur; değiştirmeden hesaplayabilirsiniz. Hacim satırı hava değişim sayısından etkilenmez.'],
    ['Girdiğim ölçüler saklanıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; oda ölçüleriniz sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['petek-hesapla', 'isi-kaybi-hesapla', 'duvar-alani-hesapla', 'su-deposu-hacmi-hesapla'],
};
