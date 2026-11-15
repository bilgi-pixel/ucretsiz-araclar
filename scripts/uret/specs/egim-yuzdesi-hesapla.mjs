export default {
  slug: 'egim-yuzdesi-hesapla',
  title: 'Eğim Yüzdesi ve Açı Hesaplama',
  h1Tail: 'yüzde ↔ derece ↔ oran',
  pageTitle: 'Eğim Yüzdesi Hesaplama – Yüzde, Derece ve Oran Çevirici',
  description: 'Yükseklik farkı ve yatay mesafeden eğim yüzdesini bulun ya da yüzde eğimi dereceye, dereceyi yüzdeye çevirin. Oran (1:n), binde değer ve eğik uzunluk da hesaplanır.',
  card: 'Yükseklik ve mesafeden eğim yüzdesini bulun; yüzdeyi dereceye, dereceyi yüzdeye ve 1:n oranına çevirin.',
  category: 'insaat',
  keywords: ['eğim yüzdesi hesaplama', 'eğim hesaplama', 'yüzde eğim kaç derece', 'eğim açısı hesaplama', 'yüzde 10 eğim kaç derece', 'eğim oranı', 'meyil hesaplama'],
  lead: `Bir yolun, zeminin, borunun ya da çatının eğimini <strong>yüzde</strong>, <strong>derece</strong> ve <strong>1:n oranı</strong> olarak hesaplayın. Yükseklik farkı ile yatay mesafeyi girebilir ya da bildiğiniz yüzde veya açı değerini diğer gösterimlere çevirebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Bilinen değer', type: 'select', options: [['olcu', 'Yükseklik farkı ve yatay mesafe'], ['yuzde', 'Eğim yüzdesi (%)'], ['aci', 'Eğim açısı (derece)']] },
    { id: 'deger', label: 'Yükseklik farkı / yüzde / açı', type: 'number', placeholder: 'Örn. 1,5', hint: 'Seçiminize göre yükseklik farkını, yüzde değerini ya da derece cinsinden açıyı yazın.' },
    { id: 'yatay', label: 'Yatay mesafe', type: 'number', placeholder: 'Örn. 20', hint: 'Yükseklik farkıyla aynı birimde yazın. Yüzde ya da açı modunda isteğe bağlıdır; yazarsanız yükseklik ve eğik uzunluk da hesaplanır.' },
  ],
  compute(v, h) {
    const tur = v.tur || 'olcu';
    const yatayVar = String(v.yatay ?? '').trim() !== '';
    let oran; let yatay = null; let dusey = null;
    if (tur === 'olcu') {
      dusey = h.nonneg(v.deger, 'Yükseklik farkı');
      yatay = h.pos(v.yatay, 'Yatay mesafe');
      oran = dusey / yatay;
    } else if (tur === 'yuzde') {
      oran = h.nonneg(v.deger, 'Eğim yüzdesi') / 100;
    } else {
      const a = h.nonneg(v.deger, 'Eğim açısı');
      if (a >= 90) h.err('Eğim açısı 90 dereceden küçük olmalı; 90° dik duvardır ve yüzdesi tanımsızdır.');
      oran = Math.tan(a * Math.PI / 180);
    }
    if (tur !== 'olcu' && yatayVar) { yatay = h.pos(v.yatay, 'Yatay mesafe'); dusey = yatay * oran; }
    const aci = Math.atan(oran) * 180 / Math.PI;
    const rows = [
      ['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)],
      ['Eğim açısı', h.fmt(aci, 2) + '°'],
      ['Oran (düşey:yatay)', oran > 0 ? '1:' + h.fmt(1 / oran, 2) : 'Düz (eğim yok)'],
      ['Binde eğim', '‰' + h.fmt(oran * 1000, 1)],
      ['100 birim yatayda yükselme', h.fmt(oran * 100, 2) + ' birim'],
    ];
    if (yatay !== null) {
      if (tur !== 'olcu') rows.push(['Yükseklik farkı', h.fmt(dusey, 3) + ' birim']);
      rows.push(['Eğik (yüzey) uzunluk', h.fmt(Math.sqrt(yatay * yatay + dusey * dusey), 3) + ' birim']);
    }
    return { rows, note: 'Eğim yüzdesi = yükseklik farkı ÷ yatay mesafe × 100. Yükseklik ve mesafe aynı birimde olmalıdır.' };
  },
  cases: [
    { in: { tur: 'olcu', deger: '3', yatay: '4' }, out: { 'Eğim yüzdesi': '%75', 'Eğim açısı': '36,87°', 'Oran (düşey:yatay)': '1:1,33', 'Eğik (yüzey) uzunluk': '5 birim' } },
    { in: { tur: 'yuzde', deger: '10' }, out: { 'Eğim açısı': '5,71°', 'Oran (düşey:yatay)': '1:10', 'Binde eğim': '‰100' } },
    { in: { tur: 'aci', deger: '45' }, out: { 'Eğim yüzdesi': '%100', 'Oran (düşey:yatay)': '1:1' } },
    { in: { tur: 'aci', deger: '30' }, out: { 'Eğim yüzdesi': '%57,74', 'Oran (düşey:yatay)': '1:1,73' } },
    { in: { tur: 'olcu', deger: '1,5', yatay: '20' }, out: { 'Eğim yüzdesi': '%7,5', 'Eğim açısı': '4,29°', 'Binde eğim': '‰75' } },
    { in: { tur: 'yuzde', deger: '2', yatay: '6' }, out: { 'Eğim açısı': '1,15°', 'Oran (düşey:yatay)': '1:50', 'Yükseklik farkı': '0,12 birim' } },
    { in: { tur: 'olcu', deger: '0', yatay: '10' }, out: { 'Eğim yüzdesi': '%0', 'Oran (düşey:yatay)': 'Düz (eğim yok)' } },
    { in: { tur: 'olcu', deger: '2', yatay: '' }, error: true },
    { in: { tur: 'aci', deger: '90' }, error: true },
  ],
  howto: [
    '"Bilinen değer" listesinden elinizdeki veriyi seçin: iki ölçü (yükseklik farkı ve yatay mesafe), yüzde eğim ya da derece cinsinden açı.',
    'İlk kutuya seçiminize uygun değeri yazın. Ölçü modunda yükseklik farkını, diğer modlarda yüzdeyi ya da açıyı girin.',
    'Ölçü modunda yatay mesafeyi yükseklikle aynı birimde (ikisi de metre ya da ikisi de santimetre) yazın.',
    '"Hesapla" düğmesine basın; eğim yüzdesi, açı, 1:n oranı ve binde değer birlikte listelenir.',
    'Yüzde ya da açı modunda yatay mesafe de yazarsanız, o mesafede oluşacak yükseklik farkını ve eğik uzunluğu da görürsünüz.',
  ],
  sections: [
    { h: 'Eğim yüzdesi nedir?', p: [
      `Eğim, bir yüzeyin yatayda ilerlerken düşeyde ne kadar yükseldiğini ya da alçaldığını anlatır. Yüzde eğim, <strong>yükseklik farkının yatay mesafeye bölünüp 100 ile çarpılmasıyla</strong> bulunur: eğim (%) = (düşey ÷ yatay) × 100. Yatayda 100 metre ilerlerken 8 metre yükselen bir yolun eğimi %8'dir. Trafik levhalarındaki "%10" uyarısı da tam olarak bunu söyler: her 100 metrede 10 metre iniş ya da çıkış.`,
      `Burada dikkat edilecek nokta, paydanın <strong>yatay mesafe</strong> olmasıdır; yüzeyin üzerinde ölçülen eğik uzunluk değildir. Küçük eğimlerde ikisi arasındaki fark ihmal edilebilir, ancak eğim büyüdükçe fark açılır. Elinizde şerit metreyle yüzey boyunca alınmış bir ölçü varsa, yatay mesafeyi Pisagor bağıntısıyla ayrıca bulmanız gerekir.`,
    ] },
    { h: 'Yüzde ile derece arasındaki ilişki', p: [
      `Yüzde eğim ile açı aynı şeyi iki farklı ölçekle anlatır ve aralarındaki bağ tanjant fonksiyonudur: <strong>yüzde = tan(açı) × 100</strong>, tersine <strong>açı = arctan(yüzde ÷ 100)</strong>. İlişki doğrusal değildir; bu yüzden "%100 eğim 90 derecedir" düşüncesi yaygın ama yanlıştır. %100 eğim, yükselmenin yatay mesafeye eşit olduğu durumdur ve 45 dereceye karşılık gelir. 90 dereceye yaklaşıldıkça yüzde değer sonsuza gider; dik bir duvarın yüzde eğimi tanımsızdır.`,
      `Küçük açılarda kabaca "1 derece yaklaşık %1,75" denebilir: 5 derece %8,75, 10 derece %17,63 eder. Açı büyüdükçe bu pratik kural bozulur; 30 derece %57,74, 60 derece ise %173,21'dir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Bir bahçe yolunun başı ile sonu arasında 1,5 m kot farkı var ve yatay mesafe 20 m. Eğim 1,5 ÷ 20 × 100 = %7,5 olur. Açı arctan(0,075) = 4,29 derecedir; binde gösterimle ‰75 eder.`,
      `<strong>Örnek 2:</strong> Düşeyde 3, yatayda 4 birimlik bir üçgende eğim 3 ÷ 4 = %75, açı 36,87 derecedir. Eğik kenar, bilinen 3-4-5 üçgeni gereği 5 birim çıkar; araç bunu "Eğik (yüzey) uzunluk" satırında verir.`,
      `<strong>Örnek 3:</strong> Islak hacim zemininde süzgece doğru %2 eğim isteniyor ve süzgeç duvardan 6 m uzakta. Yüzde modunda 2, yatay mesafeye 6 yazıldığında yükseklik farkı 0,12 birim, yani 12 cm bulunur; oran 1:50'dir.`,
    ] },
    { h: 'Oran (1:n) ve binde gösterimi', p: [
      `İnşaat ve harita çizimlerinde eğim sıklıkla oran olarak yazılır. Bu araçta oran <strong>düşey:yatay</strong> biçimindedir: 1:10, her 10 birim yatayda 1 birim yükselme demektir ve %10'a eşittir. 1:20 %5'e, 1:50 %2'ye karşılık gelir. Şev ve dolgu işlerinde bazen tersi (yatay:düşey) kullanıldığı için bir çizimdeki oranı okurken hangi sıranın kastedildiğine bakmak gerekir.`,
      `Binde (‰) gösterimi, çok küçük eğimlerin konuşulduğu demiryolu, kanal ve atık su borusu işlerinde tercih edilir. ‰5, her 1.000 metrede 5 metre, yani %0,5 eğim anlamına gelir.`,
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>%1</strong> = 0,57° = 1:100',
      '<strong>%2</strong> = 1,15° = 1:50',
      '<strong>%5</strong> = 2,86° = 1:20',
      '<strong>%8</strong> = 4,57° = 1:12,5',
      '<strong>%10</strong> = 5,71° = 1:10',
      '<strong>%15</strong> = 8,53° = 1:6,67',
      '<strong>%25</strong> = 14,04° = 1:4',
      '<strong>%50</strong> = 26,57° = 1:2',
      '<strong>%100</strong> = 45° = 1:1',
    ] },
    { h: 'Nerelerde kullanılır, nelere dikkat edilir?', p: [
      `Eğim hesabı; teras ve balkon şaplarında suyun gidere akması, yağmur oluğu ve pis su borularının döşenmesi, garaj girişleri, bahçe yolları, arazi tesviyesi, çatı kaplaması seçimi ve bisiklet ya da yürüyüş rotalarının zorluk değerlendirmesi gibi pek çok işte gerekir. Her uygulamanın kendine özgü alt ve üst sınırları vardır; bu sınırlar ilgili standart, yönetmelik ve üretici talimatlarında tanımlanır.`,
      `Ölçüm sırasında en sık yapılan hata, iki ölçüyü farklı birimlerde girmektir: yükseklik santimetre, mesafe metre yazılırsa sonuç yüz kat hatalı çıkar. İkinci yaygın hata, eğik yüzey boyunca ölçülen uzunluğu yatay mesafe yerine kullanmaktır. Bu araç bilgilendirme amaçlı bir hesaplayıcıdır; yapısal ya da güvenlikle ilgili kararlarda ilgili mühendisin ve güncel mevzuatın belirlediği değerler esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['%10 eğim kaç derecedir?', '%10 eğim yaklaşık 5,71 derecedir. Hesap arctan(0,10) işlemiyle yapılır. Oran olarak 1:10, binde olarak ‰100 yazılır.'],
    ['45 derece eğim yüzde kaçtır?', '45 derece tam olarak %100 eğimdir; çünkü tan(45°) = 1 olup yükselme yatay mesafeye eşittir. %100 eğim dik duvar anlamına gelmez.'],
    ['Eğim yüzdesi 100\'den büyük olabilir mi?', 'Evet. 45 dereceden dik her yüzeyin eğimi %100\'ün üzerindedir. Örneğin 60 derecelik bir yüzeyin eğimi yaklaşık %173\'tür. 90 dereceye yaklaşıldıkça değer sınırsız büyür.'],
    ['Yükseklik ve mesafeyi hangi birimde girmeliyim?', 'İkisini de aynı birimde girmeniz yeterlidir; metre, santimetre ya da milimetre fark etmez. Eğim bir oran olduğu için birimler birbirini götürür. Sonuçtaki "birim" ifadesi sizin kullandığınız birimi temsil eder.'],
    ['Elimde yalnızca eğik uzunluk varsa ne yapmalıyım?', 'Yatay mesafeyi Pisagor bağıntısıyla bulun: yatay = √(eğik² − yükseklik²). Örneğin eğik uzunluk 5, yükseklik 3 ise yatay mesafe 4 olur ve eğim %75 çıkar.'],
    ['Negatif eğim girebilir miyim?', 'Araç inişi ve çıkışı ayırmaz; eğimin büyüklüğünü hesaplar. Bu yüzden değerleri pozitif yazın. İniş için de aynı yüzde ve açı geçerlidir, yalnızca yön tersinedir.'],
    ['1:n oranı ile yüzde arasında nasıl geçiş yapılır?', 'Yüzde = 100 ÷ n formülünü kullanın. 1:20 oranı 100 ÷ 20 = %5, 1:12 oranı %8,33 eder. Tersine n = 100 ÷ yüzde ile bulunur.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızın içinde yapılır; değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['rampa-egimi-hesapla', 'cati-alani-hesapla', 'merdiven-hesapla', 'hafriyat-hesapla'],
};
