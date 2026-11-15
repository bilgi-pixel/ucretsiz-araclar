export default {
  slug: 'yasam-yolu-sayisi-hesapla',
  title: 'Yaşam Yolu Sayısı Hesaplama',
  h1Tail: 'doğum tarihinden numeroloji',
  pageTitle: "Yaşam Yolu Sayısı Hesaplama – Doğum Tarihi Numerolojisi",
  description: "Doğum tarihinizi girin; numerolojideki yaşam yolu sayınızı gün, ay ve yıl indirgemesiyle adım adım hesaplayın. Usta sayılar 11, 22 ve 33 korunur; eğlence amaçlıdır.",
  card: "Doğum tarihinizi girin; yaşam yolu sayınızı gün, ay ve yıl indirgemesinin tüm adımlarıyla birlikte görün.",
  category: 'gunluk',
  keywords: ['yaşam yolu sayısı hesaplama', 'doğum tarihi numerolojisi', 'numeroloji hesaplama', 'yaşam sayısı hesaplama', 'kader sayısı doğum tarihi', 'usta sayı 11 22 33', 'doğum günü sayısı'],
  lead: "Yaşam yolu sayısı, numerolojide doğum tarihinin rakamlarından elde edilen ve en çok önem verilen sayıdır. Doğum tarihinizi girin; araç <strong>gün, ay ve yılı ayrı ayrı indirgeyip toplayarak</strong> yaşam yolu sayınızı bulsun ve işlemin her adımını göstersin. Sonuç eğlence ve merak amaçlıdır.",
  button: 'Hesapla',
  inputs: [
    { id: 'tarih', label: 'Doğum tarihi', type: 'date', hint: 'GG.AA.YYYY biçiminde de yazabilirsiniz.' },
  ],
  compute(v, h) {
    const ANLAM = {
      1: 'liderlik, bağımsızlık, başlangıçlar', 2: 'denge, ortaklık, diplomasi', 3: 'yaratıcılık, iletişim, iyimserlik',
      4: 'istikrar, disiplin, emek', 5: 'özgürlük, macera, uyum yeteneği', 6: 'sorumluluk, bakım, uyum',
      7: 'sorgulama, bilgi arayışı, iç dünya', 8: 'hırs, yönetim, maddi denge', 9: 'şefkat, idealizm, bırakabilme',
      11: 'sezgi, ilham, duyarlılık (usta sayı)', 22: 'büyük ölçekli kuruculuk (usta sayı)', 33: 'özveri, öğreticilik (usta sayı)',
    };
    const rakamTopla = (n) => String(n).split('').reduce((a, c) => a + Number(c), 0);
    const indir = (n, ustalar) => { while (n > 9 && !ustalar.includes(n)) n = rakamTopla(n); return n; };
    const d = h.date(v.tarih, 'Doğum tarihi');
    const gun = d.getUTCDate(), ay = d.getUTCMonth() + 1, yil = d.getUTCFullYear();
    if (yil < 1000 || yil > 9999) h.err('Yıl dört basamaklı olmalı (örn. 1990).');
    const g = indir(gun, [11, 22]), a = indir(ay, [11, 22]), y = indir(yil, [11, 22]);
    const ara = g + a + y;
    const yol = indir(ara, [11, 22, 33]);
    const hepsi = rakamTopla(gun) + rakamTopla(ay) + rakamTopla(yil);
    const hepsiSon = indir(hepsi, [11, 22, 33]);
    return {
      rows: [
        ['Yaşam yolu sayısı', String(yol)],
        ['Gün + ay + yıl indirgemesi', g + ' + ' + a + ' + ' + y + ' = ' + ara + (ara === yol ? '' : ' → ' + yol)],
        ['Tüm rakamların toplamı yöntemi', hepsi === hepsiSon ? String(hepsi) : hepsi + ' → ' + hepsiSon],
        ['Doğum günü sayısı', gun === g ? String(g) : gun + ' → ' + g],
        ['Anahtar kelimeler', ANLAM[yol]],
        ['Doğum tarihi', h.fmtDate(d) + ' ' + h.gunAdi(d)],
      ],
      note: 'Gün, ay ve yıl önce ayrı ayrı indirgenir (11 ve 22 korunur), sonra toplanır; sonuçta 11, 22 ve 33 usta sayı olarak bırakılır. İki yöntem usta sayılarda farklı sonuç verebilir. Eğlence amaçlıdır; bilimsel dayanağı yoktur.',
    };
  },
  cases: [
    { in: { tarih: '15.03.1990' }, out: { 'Yaşam yolu sayısı': '1', 'Gün + ay + yıl indirgemesi': '6 + 3 + 1 = 10 → 1', 'Tüm rakamların toplamı yöntemi': '28 → 1', 'Doğum günü sayısı': '15 → 6', 'Doğum tarihi': '15.03.1990 Perşembe' } },
    { in: { tarih: '1985-11-29' }, out: { 'Yaşam yolu sayısı': '9', 'Gün + ay + yıl indirgemesi': '11 + 11 + 5 = 27 → 9', 'Tüm rakamların toplamı yöntemi': '36 → 9', 'Doğum günü sayısı': '29 → 11' } },
    { in: { tarih: '01.01.2000' }, out: { 'Yaşam yolu sayısı': '4', 'Gün + ay + yıl indirgemesi': '1 + 1 + 2 = 4', 'Tüm rakamların toplamı yöntemi': '4', 'Doğum günü sayısı': '1' } },
    { in: { tarih: '23.04.1920' }, out: { 'Yaşam yolu sayısı': '3', 'Gün + ay + yıl indirgemesi': '5 + 4 + 3 = 12 → 3', 'Tüm rakamların toplamı yöntemi': '21 → 3' } },
    { in: { tarih: '01.01.2007' }, out: { 'Yaşam yolu sayısı': '11', 'Gün + ay + yıl indirgemesi': '1 + 1 + 9 = 11', 'Tüm rakamların toplamı yöntemi': '11', 'Anahtar kelimeler': 'sezgi, ilham, duyarlılık (usta sayı)' } },
    { in: { tarih: '11.02.2007' }, out: { 'Yaşam yolu sayısı': '22', 'Gün + ay + yıl indirgemesi': '11 + 2 + 9 = 22', 'Tüm rakamların toplamı yöntemi': '13 → 4', 'Doğum günü sayısı': '11' } },
    { in: { tarih: '' }, error: true },
    { in: { tarih: '31.02.1990' }, error: true },
    { in: { tarih: 'dün' }, error: true },
  ],
  howto: [
    'Doğum tarihinizi takvimden seçin ya da gün.ay.yıl biçiminde (örneğin 15.03.1990) yazın.',
    '"Hesapla" düğmesine basın. İlk satırda yaşam yolu sayınız görünür.',
    'İkinci satırdan günün, ayın ve yılın hangi sayılara indirgendiğini ve bunların nasıl toplandığını izleyin.',
    'Üçüncü satırda, tarihin bütün rakamlarını doğrudan toplayan alternatif yöntemin sonucunu karşılaştırın.',
    'Aile üyeleriniz ya da arkadaşlarınız için tarihi değiştirip yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Yaşam yolu sayısı nasıl hesaplanır?', p: [
      "Yaşam yolu sayısı, doğum tarihindeki rakamların toplanıp tek basamağa indirgenmesiyle bulunur. Bu araç numeroloji kaynaklarında en çok önerilen <strong>üç parçalı yöntemi</strong> kullanır: önce gün, ay ve yıl ayrı ayrı indirgenir, sonra bu üç sayı toplanır ve toplam yeniden indirgenir.",
      "İndirgeme, bir sayının rakamlarını toplamak demektir: 1990 için 1 + 9 + 9 + 0 = 19, sonra 1 + 9 = 10, sonra 1 + 0 = 1. İşlem tek basamaklı bir sayıya ulaşılana kadar sürer. Tek istisna <strong>usta sayılardır</strong>: ara adımlarda 11 ya da 22, son adımda 11, 22 ya da 33 elde edilirse sayı indirgenmeden bırakılır.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "15 Mart 1990 doğumlu biri için hesap şöyledir. Gün: 15 → 1 + 5 = 6. Ay: 3 (zaten tek basamak). Yıl: 1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1. Üç parçanın toplamı 6 + 3 + 1 = 10'dur; 1 + 0 = <strong>1</strong>. Yaşam yolu sayısı 1'dir. Araç bunu '6 + 3 + 1 = 10 → 1' biçiminde gösterir.",
      "Aynı tarihi tüm rakamları tek seferde toplayarak da hesaplayabilirsiniz: 1 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 28, 2 + 8 = 10, 1 + 0 = 1. Bu örnekte iki yöntem aynı sonucu verir; çoğu tarihte de böyledir.",
    ] },
    { h: 'İki yöntem neden bazen farklı sonuç verir?', p: [
      "Tek basamaklı sonuçlarda üç parçalı yöntem ile tüm rakamları toplama yöntemi her zaman aynı sayıya varır, çünkü ikisi de matematiksel olarak sayının 9'a bölümünden kalanla ilgilidir. Fark yalnızca usta sayılarda ortaya çıkar: bir yöntem toplamın 11 ya da 22'den geçmesine yol açarken diğeri bu sayılara uğramadan tek basamağa inebilir.",
      "Örneğin 11 Şubat 2007 tarihinde üç parçalı yöntem 11 + 2 + 9 = 22 verir ve sonuç usta sayı 22 olarak kalır. Tüm rakamlar toplandığında ise 1 + 1 + 0 + 2 + 2 + 0 + 0 + 7 = 13, indirgenince 4 çıkar. 22'nin rakamları toplamı da 4 olduğundan iki sonuç çelişmez; yalnızca birinde usta sayı görünür olur. Araç her iki sonucu da listeler, böylece farklı kaynaklarda gördüğünüz değerlerle karşılaştırabilirsiniz.",
    ] },
    { h: 'Sayıların geleneksel anlamları', ul: [
      '<strong>1:</strong> liderlik, bağımsızlık, yeni başlangıçlar',
      '<strong>2:</strong> denge, ortaklık, diplomasi',
      '<strong>3:</strong> yaratıcılık, iletişim, iyimserlik',
      '<strong>4:</strong> istikrar, disiplin, emek',
      '<strong>5:</strong> özgürlük, macera, uyum yeteneği',
      '<strong>6:</strong> sorumluluk, bakım, uyum',
      '<strong>7:</strong> sorgulama, bilgi arayışı, iç dünya',
      '<strong>8:</strong> hırs, yönetim, maddi denge',
      '<strong>9:</strong> şefkat, idealizm, bırakabilme',
      '<strong>11:</strong> sezgi ve ilham; <strong>22:</strong> büyük ölçekli kuruculuk; <strong>33:</strong> özveri ve öğreticilik',
    ] },
    { h: 'Doğum günü sayısı nedir?', p: [
      "Sonuçlardaki 'Doğum günü sayısı' satırı, yalnızca ayın kaçında doğduğunuzdan elde edilir. Ayın 1'i ile 9'u arasında doğanlar için sayı günün kendisidir; 10 ve sonrası için rakamlar toplanır: 15 → 6, 28 → 10 → 1. Ayın 11'i, 22'si ve 29'u (2 + 9 = 11) usta sayı verir. Numerolojide bu sayının, yaşam yolu sayısını tamamlayan ikincil bir özellik olduğu kabul edilir.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Yılı iki basamakla (90) hesaba katmak. Yılın dört basamağı da toplanmalıdır: 1990, 90 değil.',
      'Usta sayıları farkında olmadan indirgemek. 29 → 11 ara sonucunu 2\'ye indirip indirmemek sonucu değiştirebilir.',
      'Ay adını sayıya çevirirken yanılmak. Ekim 10, Kasım 11, Aralık 12\'dir; Kasım ara adımda usta sayı 11 olarak kalır.',
      'Nüfus kaydındaki tarih ile gerçek doğum tarihini karıştırmak. Gelenek, gerçek doğum gününün kullanılmasını önerir.',
    ] },
    { h: 'Önemli not: eğlence amaçlıdır', p: [
      "Numeroloji köklü bir inanç geleneğidir, ancak doğum tarihinden elde edilen sayıların kişilik, yetenek ya da gelecek üzerinde etkisi olduğuna dair bilimsel bir kanıt yoktur. Bu araç yalnızca aritmetiği doğru ve adım adım izlenebilir biçimde yapar. Kariyer, ilişki, sağlık ya da para ile ilgili kararlarınızı bu sayıya dayandırmayın; sonucu keyifli bir merak konusu olarak görün.",
    ] },
  ],
  faq: [
    ['Yaşam yolu sayısı nedir?', 'Numerolojide doğum tarihinin rakamları toplanarak elde edilen 1–9 arası bir sayı ya da 11, 22, 33 usta sayılarından biridir. Kişinin hayattaki ana temasını simgelediğine inanılır.'],
    ['Yaşam yolu sayım 11, 22 ya da 33 çıktı; ne anlama geliyor?', 'Bunlar usta sayılardır ve tek basamağa indirgenmez. Numeroloji geleneğinde 11 sezgi ve ilhamla, 22 büyük hedefleri gerçeğe dönüştürmeyle, 33 özveri ve öğreticilikle ilişkilendirilir.'],
    ['Hangi hesaplama yöntemi doğru?', 'Numerolojide tek bir resmî yöntem yoktur. Gün, ay ve yılı ayrı indirgeyip toplayan yöntem en yaygın önerilendir ve araç ana sonucu buna göre verir; tüm rakamları doğrudan toplama yönteminin sonucu da ayrıca gösterilir.'],
    ['İki yöntem farklı sonuç verirse hangisini almalıyım?', 'Fark yalnızca usta sayılarda görülür ve iki sonucun rakam toplamı her zaman aynıdır (örneğin 22 ve 4). Usta sayıyı dikkate almak isterseniz ilk satırı, klasik tek basamaklı sonucu isterseniz indirgenmiş değeri kullanabilirsiniz.'],
    ['Yaşam yolu sayısı ile burç aynı şey mi?', 'Hayır. Burç, doğum anında Güneş\'in zodyaktaki konumuna göre belirlenir; yaşam yolu sayısı ise yalnızca tarihin rakamlarının toplamıdır. İkisi farklı geleneklerdir.'],
    ['Hicri ya da Rumi takvimle doğum tarihimi girebilir miyim?', 'Araç Miladi takvime göre çalışır. Farklı bir takvimdeki tarihi önce Miladi karşılığına çevirmeniz gerekir.'],
    ['İsmimden de bir sayı hesaplanabilir mi?', 'Evet. İsimdeki harflerden ifade (kader) sayısı hesaplanır; bunun için isim numerolojisi aracını kullanabilirsiniz. Yaşam yolu sayısı yalnızca doğum tarihine dayanır.'],
    ['Doğum tarihim saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz tarih sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['isim-numerolojisi-hesapla', 'dogum-tasi-bul', 'iki-zar-olasilik-hesapla', 'satranc-elo-hesapla'],
};
