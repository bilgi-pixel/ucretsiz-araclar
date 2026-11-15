export default {
  slug: 'gol-averaji-hesapla',
  title: 'Gol Averajı ve Puan Hesaplama',
  h1Tail: 'puan, averaj ve maç başı ortalamalar',
  pageTitle: 'Gol Averajı ve Puan Hesaplama – Lig Puanı ve Averaj Hesabı',
  description: 'Galibiyet, beraberlik, mağlubiyet ile atılan ve yenilen golleri girin; takımın puanını, gol averajını (farkını), gol oranını ve maç başına ortalamalarını hesaplayın.',
  card: 'Galibiyet, beraberlik ve gol sayılarından takımın puanını, averajını ve maç başı ortalamalarını hesaplayın.',
  category: 'saglik',
  keywords: ['gol averajı hesaplama', 'averaj nasıl hesaplanır', 'puan hesaplama futbol', 'gol farkı hesaplama', 'lig puan hesaplama', 'maç başına puan', 'ikili averaj genel averaj', 'halı saha ligi puan'],
  lead: 'Bir takımın galibiyet, beraberlik ve mağlubiyet sayılarını, attığı ve yediği golleri yazın. Araç toplam <strong>puanı</strong>, <strong>gol averajını</strong> (atılan eksi yenilen), gol oranını, maç başına puan ve gol ortalamalarını çıkarır. Galibiyete ve beraberliğe verilen puanı kendi liginizin kuralına göre değiştirebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'galibiyet', label: 'Galibiyet', type: 'number', placeholder: 'Örn. 20' },
    { id: 'beraberlik', label: 'Beraberlik', type: 'number', placeholder: 'Örn. 8' },
    { id: 'maglubiyet', label: 'Mağlubiyet', type: 'number', placeholder: 'Örn. 6' },
    { id: 'atilan', label: 'Atılan gol', type: 'number', placeholder: 'Örn. 60' },
    { id: 'yenilen', label: 'Yenilen gol', type: 'number', placeholder: 'Örn. 30' },
    { id: 'gPuan', label: 'Galibiyet puanı', type: 'number', value: '3' },
    { id: 'bPuan', label: 'Beraberlik puanı', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const tam = (s, ad) => { const n = h.int(s, ad); if (n < 0) h.err(`"${ad}" negatif olamaz.`); return n; };
    const g = tam(v.galibiyet, 'Galibiyet');
    const b = tam(v.beraberlik, 'Beraberlik');
    const m = tam(v.maglubiyet, 'Mağlubiyet');
    const a = tam(v.atilan, 'Atılan gol');
    const y = tam(v.yenilen, 'Yenilen gol');
    const gp = h.nonneg(String(v.gPuan ?? '').trim() === '' ? '3' : v.gPuan, 'Galibiyet puanı');
    const bp = h.nonneg(String(v.bPuan ?? '').trim() === '' ? '1' : v.bPuan, 'Beraberlik puanı');
    const mac = g + b + m;
    if (mac === 0) h.err('En az bir maç girin; galibiyet, beraberlik ve mağlubiyet toplamı sıfır olamaz.');
    if (g > 0 && a === 0) h.err('Galibiyeti olan bir takımın attığı gol sıfır olamaz; gol sayılarını kontrol edin.');
    if (m > 0 && y === 0) h.err('Mağlubiyeti olan bir takımın yediği gol sıfır olamaz; gol sayılarını kontrol edin.');
    const puan = g * gp + b * bp;
    const fark = a - y;
    const isaretli = fark > 0 ? '+' + h.fmt(fark, 0) : h.fmt(fark, 0);
    const enCok = mac * gp;
    return {
      rows: [
        ['Puan', h.fmt(puan, 2)],
        ['Gol averajı (fark)', isaretli],
        ['Oynanan maç', String(mac)],
        ['Gol oranı (atılan ÷ yenilen)', y === 0 ? 'Tanımsız (gol yenmedi)' : h.fmt(a / y, 3)],
        ['Maç başına puan', h.fmt(puan / mac, 2)],
        ['Maç başına atılan gol', h.fmt(a / mac, 2)],
        ['Maç başına yenilen gol', h.fmt(y / mac, 2)],
        ['Galibiyet yüzdesi', '%' + h.fmt(g / mac * 100, 1)],
        ['Alınabilecek puanın yüzdesi', enCok > 0 ? '%' + h.fmt(puan / enCok * 100, 1) : '—'],
      ],
      note: `Hesap galibiyete ${h.fmt(gp, 2)}, beraberliğe ${h.fmt(bp, 2)}, mağlubiyete 0 puan verir. Puan eşitliğinde hangi ölçütün önce uygulanacağı ligin kendi talimatına bağlıdır.`,
    };
  },
  cases: [
    { in: { galibiyet: '20', beraberlik: '8', maglubiyet: '6', atilan: '60', yenilen: '30' }, out: { 'Puan': '68', 'Gol averajı (fark)': '+30', 'Oynanan maç': '34', 'Gol oranı (atılan ÷ yenilen)': '2', 'Maç başına puan': '2', 'Alınabilecek puanın yüzdesi': '%66,7' } },
    { in: { galibiyet: '10', beraberlik: '5', maglubiyet: '15', atilan: '35', yenilen: '48' }, out: { 'Puan': '35', 'Gol averajı (fark)': '-13', 'Oynanan maç': '30', 'Gol oranı (atılan ÷ yenilen)': '0,729', 'Maç başına puan': '1,17', 'Galibiyet yüzdesi': '%33,3' } },
    { in: { galibiyet: '3', beraberlik: '0', maglubiyet: '0', atilan: '7', yenilen: '0' }, out: { 'Puan': '9', 'Gol averajı (fark)': '+7', 'Gol oranı (atılan ÷ yenilen)': 'Tanımsız (gol yenmedi)', 'Galibiyet yüzdesi': '%100' } },
    { in: { galibiyet: '12', beraberlik: '6', maglubiyet: '4', atilan: '40', yenilen: '40', gPuan: '2', bPuan: '1' }, out: { 'Puan': '30', 'Gol averajı (fark)': '0', 'Gol oranı (atılan ÷ yenilen)': '1', 'Alınabilecek puanın yüzdesi': '%68,2' } },
    { in: { galibiyet: '1', beraberlik: '1', maglubiyet: '1', atilan: '3', yenilen: '3' }, out: { 'Puan': '4', 'Maç başına puan': '1,33', 'Maç başına atılan gol': '1' } },
    { in: { galibiyet: '0', beraberlik: '4', maglubiyet: '0', atilan: '2', yenilen: '2' }, out: { 'Puan': '4', 'Gol averajı (fark)': '0', 'Maç başına atılan gol': '0,5', 'Galibiyet yüzdesi': '%0' } },
    { in: { galibiyet: '-1', beraberlik: '2', maglubiyet: '3', atilan: '4', yenilen: '5' }, error: true },
    { in: { galibiyet: '0', beraberlik: '0', maglubiyet: '0', atilan: '0', yenilen: '0' }, error: true },
    { in: { galibiyet: '2,5', beraberlik: '2', maglubiyet: '3', atilan: '4', yenilen: '5' }, error: true },
    { in: { galibiyet: '2', beraberlik: '0', maglubiyet: '0', atilan: '0', yenilen: '1' }, error: true },
  ],
  howto: [
    'Takımın galibiyet, beraberlik ve mağlubiyet sayılarını ilgili alanlara yazın; hiç yoksa 0 girin.',
    'Sezon ya da turnuva boyunca atılan ve yenilen toplam gol sayılarını yazın.',
    'Liginiz farklı bir puan sistemi kullanıyorsa galibiyet ve beraberlik puanını değiştirin; varsayılan 3 ve 1\'dir.',
    '"Hesapla" düğmesine basın. Puan ilk satırda, averaj ve ortalamalar altında listelenir.',
    'Birden fazla takımı karşılaştırmak için her takımın sonucunu kopyalayıp bir tabloya yapıştırın.',
  ],
  sections: [
    { h: 'Puan nasıl hesaplanır?', p: [
      'Lig usulü oynanan futbolda bugün yaygın olan sistemde galibiyete 3, beraberliğe 1, mağlubiyete 0 puan verilir. Formül: <strong>Puan = galibiyet × 3 + beraberlik × 1</strong>. Çözümlü örnek: 34 maçta 20 galibiyet, 8 beraberlik ve 6 mağlubiyet alan bir takımın puanı 20 × 3 + 8 × 1 = 68\'dir. Bu takım maç başına tam 2 puan toplamış ve alabileceği 102 puanın %66,7\'sini almıştır.',
      'Üç puanlı sistem, hücum futbolunu ödüllendirmek amacıyla 1981\'de İngiltere\'de uygulanmaya başlamış, 1994 Dünya Kupası\'ndan sonra dünya genelinde standart hâline gelmiştir. Öncesinde galibiyet 2 puandı. Hentbol gibi bazı branşlarda ve kimi amatör organizasyonlarda 2 puanlı düzen hâlâ kullanılır; araçtaki puan alanları bu yüzden değiştirilebilir bırakılmıştır.',
    ] },
    { h: 'Gol averajı nedir?', p: [
      'Türkçede "averaj" dendiğinde bugün kastedilen şey <strong>gol farkıdır</strong>: atılan gol eksi yenilen gol. 60 gol atıp 30 gol yiyen takımın averajı +30, 35 gol atıp 48 gol yiyen takımın averajı -13\'tür. Puan cetvellerinde "AV" sütununda bu değer yer alır.',
      'Terimin kökeni ise bölme işlemine dayanır. İngilizce "goal average" eskiden atılan golün yenilen gole <em>bölümü</em> anlamına geliyordu ve puan eşitliğinde bu oran kullanılıyordu. Oran yöntemi az gol yiyen savunmacı takımları aşırı ödüllendirdiği ve hiç gol yemeyen takımda tanımsız kaldığı için zamanla bırakıldı, yerini fark aldı. Araç her ikisini de gösterir: "Gol averajı (fark)" güncel anlamı, "Gol oranı" ise tarihsel anlamıdır.',
    ] },
    { h: 'Genel averaj ve ikili averaj', p: [
      'İki takımın puanı eşit olduğunda sıralamayı belirlemek için kullanılan ölçütler ligden lige değişir. <strong>Genel averaj</strong>, takımın tüm maçlarındaki gol farkıdır; bu sayfanın hesapladığı değer budur. <strong>İkili averaj</strong> ise yalnızca puanı eşit olan takımların kendi aralarında oynadıkları maçların sonucuna bakar: önce bu maçlarda alınan puan, sonra bu maçlardaki gol farkı karşılaştırılır.',
      'Bazı liglerde önce ikili averaja, bazılarında önce genel averaja bakılır; ardından atılan gol sayısı, deplasmanda atılan gol, fair-play puanı ya da kura gibi ek ölçütler gelebilir. İkili averajın sezon ortasında mı yoksa yalnızca iki maç da oynandıktan sonra mı devreye girdiği de kurala bağlıdır. Kesin sıralama için ilgili federasyonun ya da organizasyonun güncel talimatını kontrol edin.',
      'İkili averajı bu araçla hesaplamak için yalnızca o iki takımın birbirleriyle oynadığı maçları girmeniz yeterlidir. Örneğin A takımı B\'yi evinde 2-0 yenmiş, deplasmanda 1-3 kaybetmişse A için 1 galibiyet, 1 mağlubiyet, 3 atılan ve 3 yenilen gol girilir: puan 3, averaj 0 çıkar; eşitlik bozulmadığından sıradaki ölçüte geçilir.',
    ] },
    { h: 'Maç başına ortalamalar ne anlatır?', p: [
      'Sezon devam ederken takımların oynadığı maç sayısı farklı olabilir; erteleme maçı olan bir takımı yalnızca puanına bakarak değerlendirmek yanıltır. <strong>Maç başına puan</strong> bu farkı ortadan kaldırır. 3 puanlı sistemde maç başına 2 puan ve üzeri genellikle üst sıralarla, 1 puan dolayları alt sıralarla ilişkilendirilir; ancak bu eşikler ligin dengesine göre değişir.',
      'Maç başına atılan ve yenilen gol, takımın hücum ve savunma karakterini özetler. Gol oranı 1\'in üzerindeyse takım yediğinden fazla atıyordur. İkinci örnekteki takım 30 maçta 35 gol atıp 48 gol yemiştir: oran 35 ÷ 48 = 0,729, maç başına puan 35 ÷ 30 = 1,17\'dir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      'Halı saha, okul ve şirket turnuvalarında puan cetveli tutmak',
      'Sezon sonu senaryolarında "kalan maçları kazanırsak kaç puan olur" hesabı yapmak',
      'Grup aşamalarında averaj durumunu kontrol etmek',
      'Futbol dışındaki lig usulü branşlarda (hentbol, futsal, su topu, e-spor ligleri) farklı puan değerleriyle hesap yapmak',
      'Spor yazıları ve istatistik tabloları için maç başı ortalamaları hızlıca çıkarmak',
    ] },
    { h: 'Sınırlar ve tutarlılık denetimleri', p: [
      'Araç tek bir takımın toplam değerleriyle çalışır; maç maç skor girişi ve çok takımlı puan cetveli sıralaması yapmaz. Hükmen galibiyet, puan silme cezası gibi istisnaları hesaba katmaz; böyle bir durum varsa sonucu elle düzeltmeniz gerekir.',
      'Girdiler arasında basit tutarlılık denetimi yapılır: galibiyeti olan bir takımın en az bir gol atmış, mağlubiyeti olan bir takımın en az bir gol yemiş olması gerekir. Bu koşullar sağlanmıyorsa araç hata verir; büyük olasılıkla atılan ve yenilen gol alanları boş ya da yer değiştirmiş demektir. Basketbol ve voleybol gibi beraberliğin olmadığı branşlarda beraberlik alanına 0 yazın; bu branşlarda "averaj" çoğu zaman sayı ya da set oranıyla hesaplandığı için gol oranı satırı daha anlamlı olabilir.',
    ] },
  ],
  faq: [
    ['Averaj nasıl hesaplanır?', 'Atılan gol sayısından yenilen gol sayısı çıkarılır. 60 gol atıp 30 gol yiyen takımın averajı +30\'dur. Sonuç negatifse takım attığından fazla gol yemiştir.'],
    ['Gol averajı ile gol farkı aynı şey mi?', 'Günümüz Türkçesinde evet, ikisi de atılan eksi yenilen gol anlamında kullanılır. Tarihsel olarak "gol averajı" atılan golün yenilen gole bölümüydü; araç bu değeri "Gol oranı" satırında ayrıca gösterir.'],
    ['20 galibiyet 8 beraberlik kaç puan eder?', '3 puanlı sistemde 20 × 3 + 8 × 1 = 68 puan eder. Galibiyetin 2 puan olduğu bir sistemde ise 20 × 2 + 8 = 48 puan olur.'],
    ['Puanlar eşitse hangi takım üstte yer alır?', 'Bu, ligin kurallarına bağlıdır. Kimi organizasyonlar önce takımların kendi aralarındaki maçlara (ikili averaj), kimileri önce genel gol farkına bakar. Kesin bilgi için organizasyonun güncel talimatına başvurun.'],
    ['Hiç gol yemeyen takımın gol oranı neden tanımsız?', 'Çünkü oran atılan golün yenilen gole bölümüdür ve sıfıra bölme tanımsızdır. Oran yönteminin terk edilip fark yöntemine geçilmesinin nedenlerinden biri de budur.'],
    ['Halı saha turnuvamızda galibiyete 2 puan veriyoruz, hesaplayabilir miyim?', 'Evet. "Galibiyet puanı" alanına 2 yazmanız yeterlidir. Beraberlik puanını da kendi kuralınıza göre değiştirebilirsiniz; örneğin penaltı atışlarıyla sonuçlanan turnuvalarda farklı değerler kullanılabilir.'],
    ['Maç başına puan neden önemli?', 'Takımların oynadığı maç sayısı eşit değilken adil karşılaştırma yapmayı sağlar. Ayrıca sezon sonu için kaba bir tahmin verir: maç başına puanı kalan maç sayısıyla çarparak mevcut gidişatın kaç puanla biteceğini görebilirsiniz.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['lig-fiksturu-olustur', 'eleme-tablosu-olustur', 'rastgele-takim-olustur', 'oyun-puan-tablosu', 'yuzde-hesapla', 'ortalama-hesapla'],
};
