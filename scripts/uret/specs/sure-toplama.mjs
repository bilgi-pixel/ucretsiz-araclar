export default {
  slug: 'sure-toplama',
  title: 'Süre Toplama (Saat Dakika Saniye)',
  h1Tail: 'süreleri alt alta toplayın',
  pageTitle: 'Süre Toplama – Saat, Dakika ve Saniyeleri Toplama Hesaplama',
  description: 'Saat, dakika ve saniye cinsinden süreleri alt alta yazıp toplayın. Eksi işaretiyle çıkarma yapar; toplamı saat:dakika:saniye, ondalık saat ve ortalama olarak verir.',
  card: 'Alt alta yazdığınız saat:dakika:saniye sürelerini toplayın ya da çıkarın; toplamı, ondalık karşılığını ve ortalamayı görün.',
  category: 'zaman',
  keywords: ['süre toplama', 'saat dakika toplama', 'dakika saniye toplama', 'saat toplama hesaplama', 'video süresi toplama', 'mesai saatlerini toplama', 'süre çıkarma'],
  lead: 'Süreleri her satıra bir tane gelecek şekilde yazın; araç hepsini <strong>60\'lık sisteme göre</strong> toplar ve sonucu saat:dakika:saniye olarak verir. Bir satırın başına eksi işareti koyarsanız o süre toplamdan çıkarılır.',
  button: 'Topla',
  inputs: [
    { id: 'sureler', label: 'Süreler (her satıra bir tane)', type: 'textarea', placeholder: '1:30:00\n2:45:30\n0:50:45', hint: 'Üç parçalı yazım saat:dakika:saniye kabul edilir. Çıkarmak için satırın başına - koyun.', wide: true },
    { id: 'ikili', label: 'İki parçalı yazımlar (örn. 3:45)', type: 'select', options: [['ds', 'Dakika:Saniye'], ['sd', 'Saat:Dakika']], hint: 'Tek sayı yazılan satırlar bu seçimdeki küçük birim sayılır.' },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.sureler);
    if (!satirlar.length) h.err('En az bir süre yazın (örn. 1:30:00). Her satıra bir süre gelmeli.');
    const sd = v.ikili === 'sd';
    let toplam = 0;
    let eklenen = 0;
    let cikan = 0;
    satirlar.forEach((ham, i) => {
      let t = ham.replace(/−/g, '-').replace(/\s+/g, '');
      let isaret = 1;
      if (t.startsWith('-')) { isaret = -1; t = t.slice(1); } else if (t.startsWith('+')) t = t.slice(1);
      if (!/^\d+(:\d+){0,2}$/.test(t)) h.err(`${i + 1}. satır anlaşılamadı: "${ham}". Süreyi 1:30:00 ya da 3:45 biçiminde, yalnızca rakam ve iki nokta ile yazın.`);
      const p = t.split(':').map(Number);
      let sn;
      if (p.length === 3) sn = p[0] * 3600 + p[1] * 60 + p[2];
      else if (p.length === 2) sn = sd ? p[0] * 3600 + p[1] * 60 : p[0] * 60 + p[1];
      else sn = sd ? p[0] * 60 : p[0];
      if (!Number.isSafeInteger(sn)) h.err(`${i + 1}. satırdaki süre çok büyük.`);
      toplam += isaret * sn;
      if (isaret > 0) eklenen++; else cikan++;
    });
    const iki = (n) => String(n).padStart(2, '0');
    const bicim = (sn) => {
      const a = Math.abs(sn);
      return `${sn < 0 ? '-' : ''}${Math.floor(a / 3600)}:${iki(Math.floor((a % 3600) / 60))}:${iki(a % 60)}`;
    };
    const a = Math.abs(toplam);
    const gun = Math.floor(a / 86400);
    const sozle = `${toplam < 0 ? 'eksi ' : ''}${gun ? gun + ' gün ' : ''}${Math.floor((a % 86400) / 3600)} saat ${Math.floor((a % 3600) / 60)} dakika ${a % 60} saniye`;
    const adet = satirlar.length;
    return {
      rows: [
        ['Toplam süre', bicim(toplam)],
        ['Sözle', sozle],
        ['Toplam saniye', `${h.fmt(toplam, 0)} saniye`],
        ['Toplam dakika', `${h.fmt(toplam / 60, 2)} dakika`],
        ['Ondalık saat', `${h.fmt(toplam / 3600, 4)} saat`],
        ['Satır sayısı', cikan ? `${adet} (${eklenen} eklenen, ${cikan} çıkarılan)` : `${adet}`],
        ['Satır başına ortalama', bicim(Math.round(toplam / adet))],
      ],
      note: `İki parçalı yazımlar ${sd ? 'saat:dakika' : 'dakika:saniye'} olarak yorumlandı. Toplam gösterimi saat:dakika:saniye biçimindedir; saat kısmı 24'ü aşabilir.`,
    };
  },
  cases: [
    { in: { sureler: '1:30:00\n2:45:30\n0:50:45' }, out: { 'Toplam süre': '5:06:15', 'Toplam saniye': '18.375 saniye', 'Sözle': '5 saat 6 dakika 15 saniye', 'Satır başına ortalama': '1:42:05' } },
    { in: { sureler: '3:45\n4:20\n2:58', ikili: 'ds' }, out: { 'Toplam süre': '0:11:03', 'Toplam saniye': '663 saniye', 'Toplam dakika': '11,05 dakika', 'Satır başına ortalama': '0:03:41' } },
    { in: { sureler: '8:30\n7:45\n9:15', ikili: 'sd' }, out: { 'Toplam süre': '25:30:00', 'Ondalık saat': '25,5 saat', 'Sözle': '1 gün 1 saat 30 dakika 0 saniye', 'Satır başına ortalama': '8:30:00' } },
    { in: { sureler: '2:00:00\n-0:30:00' }, out: { 'Toplam süre': '1:30:00', 'Satır sayısı': '2 (1 eklenen, 1 çıkarılan)', 'Ondalık saat': '1,5 saat' } },
    { in: { sureler: '59:59\n0:01', ikili: 'ds' }, out: { 'Toplam süre': '1:00:00', 'Toplam saniye': '3.600 saniye' } },
    { in: { sureler: '90\n45', ikili: 'ds' }, out: { 'Toplam süre': '0:02:15', 'Toplam saniye': '135 saniye' } },
    { in: { sureler: '0:45:00\n-1:15:00' }, out: { 'Toplam süre': '-0:30:00', 'Sözle': 'eksi 0 saat 30 dakika 0 saniye' } },
    { in: { sureler: '1:30:00\nabc' }, error: true },
    { in: { sureler: '' }, error: true },
    { in: { sureler: '1:2:3:4' }, error: true },
  ],
  howto: [
    'Toplamak istediğiniz süreleri kutuya her satıra bir tane gelecek şekilde yazın ya da bir tablodan kopyalayıp yapıştırın.',
    'Saat, dakika ve saniyeyi iki nokta ile ayırın: 1:30:00 bir buçuk saat demektir.',
    'İki parçalı yazdığınız değerlerin (örneğin 3:45) dakika:saniye mi yoksa saat:dakika mı olduğunu listeden seçin.',
    'Bir süreyi toplamdan düşmek için satırın başına eksi işareti koyun, ardından "Topla" düğmesine basın.',
  ],
  sections: [
    { h: 'Süreler neden normal sayılar gibi toplanmaz?', p: [
      'Gündelik sayılarımız onluk sistemdedir; süre ise altmışlık düzende işler: 60 saniye 1 dakika, 60 dakika 1 saat eder. Bu yüzden 45 dakika ile 30 dakikayı topladığınızda sonuç 75 dakika, yani 1 saat 15 dakikadır; hesap makinesine 0,45 + 0,30 yazıp 0,75 bulmak yanlış bir sonuca götürür.',
      'Elle toplarken en sağdaki birimden başlanır. Saniyeler toplanır, 60\'ı aşan kısım dakikaya elde olarak aktarılır; ardından dakikalar toplanır ve 60\'ı aşan kısım saate aktarılır. Araç bunun yerine daha güvenli bir yol izler: her süreyi saniyeye çevirir, saniyeleri toplar ve sonucu yeniden saat, dakika ve saniyeye böler.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu üç süreyi toplayalım: 1:30:00, 2:45:30 ve 0:50:45. Saniyeler: 0 + 30 + 45 = 75; bu 1 dakika 15 saniyedir, 15 yazılır ve 1 dakika elde tutulur. Dakikalar: 30 + 45 + 50 + elde 1 = 126; bu 2 saat 6 dakikadır, 6 yazılır ve 2 saat elde tutulur. Saatler: 1 + 2 + 0 + elde 2 = 5. Sonuç <strong>5:06:15</strong>\'tir.',
      'Saniyeye çevirerek sağlaması: 5.400 + 9.930 + 3.045 = 18.375 saniye. 18.375 ÷ 3.600 = 5 tam, kalan 375 saniye; 375 ÷ 60 = 6 tam, kalan 15. Yine 5 saat 6 dakika 15 saniye bulunur. Üç sürenin ortalaması 6.125 saniye, yani 1:42:05\'tir.',
    ] },
    { h: 'Yazım biçimleri ve iki parçalı girdiler', p: [
      'Üç parçalı yazım her zaman saat:dakika:saniye olarak okunur. İki parçalı yazım ise belirsizdir: 3:45 bir şarkı için 3 dakika 45 saniye, bir mesai kaydı için 3 saat 45 dakika anlamına gelebilir. Bu nedenle araç sizden bir tercih ister. Tek sayı yazılan satırlar seçilen düzenin küçük birimi sayılır: dakika:saniye düzeninde 90 yazarsanız 90 saniye, saat:dakika düzeninde 90 dakika olarak işlenir.',
      'Dakika ve saniye değerlerinin 59\'u aşması hata sayılmaz. 90:00 yazarsanız dakika:saniye düzeninde 1 saat 30 dakika olarak toplanır; bu, toplamları dakika olarak tutulan listeleri yapıştırırken kolaylık sağlar. Ondalıklı saniye desteklenmez; değerler tam sayı olmalıdır.',
    ] },
    { h: 'Çıkarma ve negatif sonuç', p: [
      'Satır başındaki eksi işareti o süreyi toplamdan düşer. 2:00:00 ile -0:30:00 yazıldığında sonuç 1:30:00 olur. Bu özellik, toplam süreden molaları düşmek ya da hedeflenen süre ile gerçekleşen arasındaki farkı bulmak için kullanışlıdır. Çıkarılanlar eklenenlerden büyükse sonuç eksi işaretiyle gösterilir; örneğin 0:45:00 ile -1:15:00 toplamı -0:30:00\'dır.',
    ] },
    { h: 'Kullanım örnekleri', ul: [
      '<strong>Video ve ses kurgusu:</strong> Klip ya da bölüm sürelerini toplayarak toplam yapım süresini bulmak.',
      '<strong>Müzik listeleri:</strong> Parça sürelerinden albümün ya da çalma listesinin uzunluğunu çıkarmak.',
      '<strong>Puantaj:</strong> Günlük çalışma sürelerini saat:dakika düzeninde toplayıp haftalık toplamı ve ondalık saat karşılığını almak.',
      '<strong>Spor:</strong> Tur ya da etap sürelerini toplamak, tur başına ortalamayı görmek.',
      '<strong>Ders ve sınav hazırlığı:</strong> Günlük çalışma sürelerinin haftalık toplamını ve günlük ortalamasını izlemek.',
      '<strong>Yolculuk planı:</strong> Sürüş etapları ile mola sürelerini toplayarak toplam yol süresini hesaplamak.',
    ] },
    { h: 'Sonuç satırları nasıl okunur?', p: [
      '"Toplam süre" satırındaki saat kısmı 24 ile sınırlanmaz; 25:30:00 bir gün bir buçuk saat anlamına gelir ve "Sözle" satırında gün olarak da açılır. "Ondalık saat" satırı ücretle çarpma ya da tabloya aktarma içindir: 25:30:00, 25,5 saattir. "Toplam dakika" ve "Toplam saniye" satırları başka birimlerle çalışan yazılımlara veri girerken işe yarar.',
      'Ortalama, toplamın satır sayısına bölünüp en yakın saniyeye yuvarlanmasıyla bulunur. Eksi işaretli satırlar da satır sayısına dahildir; yalnızca toplananların ortalamasını istiyorsanız çıkarılacak satırları silip yeniden hesaplayın.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Dakikayı ondalık kesir sanmak: 1 saat 30 dakika 1,30 değil 1,5 saattir.',
      'Mesai kayıtlarını dakika:saniye düzeninde toplamak; iki parçalı yazım seçimini veriye göre ayarlayın.',
      'Aynı listede iki farklı düzeni karıştırmak; emin değilseniz tüm satırları üç parçalı yazın.',
      'Ayraç olarak nokta ya da virgül kullanmak; araç yalnızca iki noktayı ayraç kabul eder.',
    ] },
  ],
  faq: [
    ['1 saat 45 dakika ile 2 saat 30 dakikanın toplamı kaçtır?', '4 saat 15 dakikadır. Dakikalar toplamı 75 eder; bunun 60 dakikası 1 saat olarak saat hanesine aktarılır ve geriye 15 dakika kalır. Araçta saat:dakika düzenini seçip 1:45 ve 2:30 yazarak 4:15:00 sonucunu görürsünüz.'],
    ['Kaç satır süre girebilirim?', 'Belirli bir sınır yoktur; yüzlerce satırı tek seferde yapıştırabilirsiniz. Boş satırlar yok sayılır.'],
    ['Toplam neden 24 saati geçince güne çevrilmiyor?', 'Mesai ve yapım süresi gibi işlerde toplamın saat olarak görülmesi tercih edildiği için ana sonuç saat:dakika:saniye biçimindedir. Gün karşılığı "Sözle" satırında ayrıca verilir.'],
    ['3:45 yazınca araç bunu nasıl yorumluyor?', 'Listeden yaptığınız seçime göre. "Dakika:Saniye" seçiliyse 3 dakika 45 saniye, "Saat:Dakika" seçiliyse 3 saat 45 dakika olarak işlenir. Sonuç kutusunun altındaki not hangi yorumun uygulandığını belirtir.'],
    ['Süre çıkarma nasıl yapılır?', 'Çıkarmak istediğiniz sürenin başına eksi işareti koyun. Örneğin 8:00:00 ve -0:45:00 satırları 7:15:00 sonucunu verir.'],
    ['Salise ya da milisaniye girebilir miyim?', 'Hayır. Araç tam saniyelerle çalışır. Daha hassas süreler için değerleri en yakın saniyeye yuvarlayarak girebilirsiniz; satır sayısı arttıkça yuvarlama farkının büyüyebileceğini unutmayın.'],
    ['Tablodan kopyaladığım süreler çalışır mı?', 'Hesap tablosundaki bir sütunu kopyalayıp yapıştırdığınızda her hücre ayrı satıra düşer ve doğrudan toplanır. Hücrelerde yalnızca rakam ve iki nokta olduğundan emin olun.'],
    ['Yazdığım süreler bir yere gönderiliyor mu?', 'Hayır. Toplama işlemi tarayıcınızda yapılır; girdiğiniz veriler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['saat-hesapla', 'calisma-suresi-hesapla', 'saniye-sure-cevir', 'dakika-sure-cevir', 'sure-bolme-carpma'],
};
