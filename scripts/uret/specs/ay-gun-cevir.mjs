export default {
  slug: 'ay-gun-cevir',
  title: 'Ay Gün Çevirici',
  h1Tail: 'ay ↔ gün',
  pageTitle: "Ay Gün Çevirici – Ayı Güne, Günü Aya Çevirme",
  description: "Ayı güne, günü aya çevirin. 30 günlük ay, ortalama ay (30,44 gün), 31, 28 ve 29 günlük ay seçenekleriyle hafta, saat ve yıl karşılığını birlikte görün.",
  card: "Ayı güne, günü aya çevirin; 30 günlük, ortalama ya da 28-31 günlük ay seçenekleriyle hafta ve saat karşılığı.",
  category: 'birim',
  keywords: ['ay gün çevirme', '1 ay kaç gün', 'gün ay hesaplama', '90 gün kaç ay', '6 ay kaç gün', 'kaç gün kaç ay eder', '100 gün kaç ay'],
  lead: "Ay olarak verilen bir süreyi güne ya da gün sayısını aya çevirin. Ayların uzunluğu eşit olmadığından hesabın dayanağını siz seçersiniz: <strong>30 günlük ay</strong>, yıllık ortalamaya dayanan 30,436875 günlük ay ya da 31, 28 ve 29 günlük takvim ayları.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 6' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ay', 'Ay → Gün'], ['gun', 'Gün → Ay']] },
    { id: 'ayTipi', label: 'Ay uzunluğu', type: 'select', options: [['otuz', '30 günlük ay'], ['ortalama', 'Ortalama ay (30,436875 gün)'], ['otuzbir', '31 günlük ay'], ['yirmisekiz', '28 günlük ay (Şubat)'], ['yirmidokuz', '29 günlük ay (artık yıl Şubatı)']], hint: 'Vade ve sözleşme hesaplarında çoğunlukla 30 gün, uzun dönem ortalamalarında ortalama ay kullanılır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const tablo = { otuz: 30, ortalama: 365.2425 / 12, otuzbir: 31, yirmisekiz: 28, yirmidokuz: 29 };
    const g = tablo[v.ayTipi] || 30;
    const gun = v.yon === 'gun' ? x : x * g;
    const ay = gun / g;
    const tam = Math.floor(ay + 1e-9);
    const kalan = Math.max(0, gun - tam * g);
    const rows = v.yon === 'gun'
      ? [['Ay', h.fmt(ay, 4) + ' ay'], ['Ay ve gün', `${h.fmt(tam, 0)} ay ${h.fmt(kalan, 2)} gün`], ['Gün', h.fmt(gun, 4) + ' gün']]
      : [['Gün', h.fmt(gun, 4) + ' gün'], ['Ay', h.fmt(ay, 4) + ' ay']];
    rows.push(['Hafta', h.fmt(gun / 7, 2) + ' hafta']);
    rows.push(['Saat', h.fmt(gun * 24, 2) + ' saat']);
    rows.push(['Yıl (12 ay = 1 yıl)', h.fmt(ay / 12, 4) + ' yıl']);
    return { rows, note: `Hesapta 1 ay = ${h.fmt(g, 6)} gün alındı. Takvimde belirli bir tarihe ay eklemek farklı bir işlemdir; sonuç ayların gerçek uzunluğuna göre değişir.` };
  },
  cases: [
    { in: { deger: '6', yon: 'ay', ayTipi: 'otuz' }, out: { 'Gün': '180 gün', 'Hafta': '25,71 hafta', 'Saat': '4.320 saat', 'Yıl (12 ay = 1 yıl)': '0,5 yıl' } },
    { in: { deger: '100', yon: 'gun', ayTipi: 'otuz' }, out: { 'Ay': '3,3333 ay', 'Ay ve gün': '3 ay 10 gün' } },
    { in: { deger: '1', yon: 'ay', ayTipi: 'ortalama' }, out: { 'Gün': '30,4369 gün' } },
    { in: { deger: '12', yon: 'ay', ayTipi: 'ortalama' }, out: { 'Gün': '365,2425 gün', 'Yıl (12 ay = 1 yıl)': '1 yıl' } },
    { in: { deger: '90', yon: 'gun', ayTipi: 'otuz' }, out: { 'Ay': '3 ay', 'Ay ve gün': '3 ay 0 gün' } },
    { in: { deger: '3', yon: 'ay', ayTipi: 'otuzbir' }, out: { 'Gün': '93 gün' } },
    { in: { deger: '1', yon: 'ay', ayTipi: 'yirmisekiz' }, out: { 'Gün': '28 gün', 'Hafta': '4 hafta', 'Saat': '672 saat' } },
    { in: { deger: '45', yon: 'gun', ayTipi: 'otuz' }, out: { 'Ay': '1,5 ay', 'Ay ve gün': '1 ay 15 gün' } },
    { in: { deger: '', yon: 'ay', ayTipi: 'otuz' }, error: true },
    { in: { deger: '-2', yon: 'ay', ayTipi: 'otuz' }, error: true },
  ],
  howto: [
    "'Değer' alanına ay ya da gün sayısını yazın. Bir buçuk ay için 1,5 gibi ondalıklı değer girebilirsiniz.",
    "'Çeviri yönü' listesinden aydan güne ya da günden aya çevirmeyi seçin.",
    "'Ay uzunluğu' listesinden bir ayın kaç gün sayılacağını belirleyin. Kararsızsanız 30 günlük ayla başlayın.",
    "'Çevir' düğmesine basın; gün ya da ay sonucunun yanında hafta, saat ve yıl karşılıkları listelenir.",
    "Günden aya çeviride 'Ay ve gün' satırı, ondalıklı ay yerine tam ay ve artan günü verir.",
  ],
  sections: [
    { h: 'Bir ay kaç gündür?', p: [
      "Miladi takvimde aylar eşit uzunlukta değildir. Yedi ay 31 gün, dört ay 30 gün çeker; Şubat normal yıllarda 28, artık yıllarda 29 gündür. Bu yüzden 'bir ay kaç gün' sorusunun cevabı, hangi aydan söz ettiğinize ve ne amaçla hesap yaptığınıza göre değişir.",
      "Uygulamada iki genel kabul öne çıkar. İlki, her ayı <strong>30 gün</strong> saymaktır; ticari hayatta, vade ve kira hesaplarında kolaylık sağladığı için yaygındır. İkincisi <strong>ortalama ay</strong> değeridir: Gregoryen takviminin ortalama yılı olan 365,2425 gün 12'ye bölünür ve 30,436875 gün bulunur. Uzun dönemlerde gerçeğe en yakın sonucu bu değer verir.",
    ] },
    { h: '31, 30 ve 28 günlük aylar', ul: [
      "<strong>31 gün:</strong> Ocak, Mart, Mayıs, Temmuz, Ağustos, Ekim, Aralık",
      "<strong>30 gün:</strong> Nisan, Haziran, Eylül, Kasım",
      "<strong>28 ya da 29 gün:</strong> Şubat",
    ], p: [
      "Akılda tutmak için yumruk yöntemi kullanılır: elinizi yumruk yapıp parmak kemiklerini ve aralarındaki çukurları Ocak'tan başlayarak sayarsınız. Kemiğe denk gelen aylar 31 gün, çukura denk gelenler 30 gün (Şubat hariç) çeker. Temmuz ve Ağustos arka arkaya iki kemiğe geldiği için ikisi de 31 gündür.",
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      "Aydan güne geçerken ay sayısı, seçtiğiniz ay uzunluğuyla çarpılır: <strong>gün = ay × ay uzunluğu</strong>. Günden aya geçerken bölünür: <strong>ay = gün ÷ ay uzunluğu</strong>.",
      "Örnek 1: 6 ay kaç gündür? 30 günlük ayla 6 × 30 = 180 gün bulunur. Bu 25,71 hafta ve 4.320 saattir. Aynı süre ortalama ayla 182,62 gün eder; yarım yılın gerçek uzunluğuna daha yakın olan değer budur.",
      "Örnek 2: 100 gün kaç ay eder? 100 ÷ 30 = 3,3333 ay. Üç ay 90 gün tuttuğundan geriye 10 gün kalır; sonuç 3 ay 10 gündür.",
      "Örnek 3: 45 günlük bir vade 30 günlük ayla 1,5 ay, yani 1 ay 15 gündür. Burada 1,5 ayın bir ay beş gün olmadığına dikkat edin; ondalık kısım ayın kesridir.",
    ] },
    { h: 'Hangi ay uzunluğunu seçmeliyim?', ul: [
      "<strong>30 günlük ay:</strong> senet ve çek vadeleri, kira, abonelik, taksit planı gibi gündelik ve ticari hesaplar; '90 gün 3 ay eder' türünden yuvarlak sonuçlar.",
      "<strong>Ortalama ay:</strong> yaş, hamilelik haftası, proje takvimi, istatistik gibi aylara yayılan dönemlerin ortalaması. 12 ortalama ay tam 365,2425 gün eder.",
      "<strong>31 günlük ay:</strong> Temmuz-Ağustos gibi arka arkaya gelen uzun ayların gün toplamı ya da en uzun olası süreyi görmek.",
      "<strong>28 ve 29 günlük ay:</strong> Şubat ayına ait hesaplar. 28 gün tam 4 haftadır; bu yüzden artık olmayan yıllarda 1 Şubat ile 1 Mart haftanın aynı gününe denk gelir.",
    ] },
    { h: 'Süre çevirmek ile tarihe ay eklemek aynı şey değildir', p: [
      "Bu araç bir süreyi başka bir birimle ifade eder. 'Bugünden üç ay sonrası hangi tarih' sorusu ise takvim hesabıdır: 15 Ocak'a üç ay eklendiğinde 15 Nisan bulunur ve aradaki gün sayısı o yıl Şubat'ın kaç çektiğine bağlıdır. Çoğu yılda bu süre 90 gün, artık yıllarda 91 gündür. İki yaklaşımın sonucu birkaç gün farklı çıkabilir.",
      "Kanunlarda, sözleşmelerde ve kurum uygulamalarında sürelerin ay olarak mı gün olarak mı sayılacağı, bir ayın kaç gün kabul edileceği ayrıca düzenlenmiş olabilir. Dava, itiraz, ihbar ya da ödeme süresi gibi hak kaybı doğurabilecek konularda bu aracın sonucuna dayanarak karar vermeyin; güncel mevzuatı ve sözleşme metnini kontrol edin.",
    ] },
    { h: 'Hızlı başvuru değerleri (30 günlük ay)', ul: [
      "<strong>1 ay</strong> = 30 gün = 720 saat",
      "<strong>3 ay</strong> = 90 gün",
      "<strong>6 ay</strong> = 180 gün",
      "<strong>9 ay</strong> = 270 gün",
      "<strong>12 ay</strong> = 360 gün (takvim yılından 5 ya da 6 gün kısa)",
      "<strong>45 gün</strong> = 1,5 ay",
      "<strong>60 gün</strong> = 2 ay",
      "<strong>120 gün</strong> = 4 ay",
    ] },
    { h: 'Sınırlar', p: [
      "Negatif değer girilemez. Ay ve gün sonuçları en fazla dört ondalık basamakla gösterilir. 30 günlük ayla hesaplanan 12 ay 360 gün ettiği için, yıl ölçeğindeki işlerde ortalama ay ya da doğrudan yıl-gün çevirisi daha doğru sonuç verir.",
    ] },
  ],
  faq: [
    ['1 ay kaç gündür?', "Takvim ayları 28 ile 31 gün arasında değişir. Hesaplarda genellikle 30 gün kabul edilir; yılın ortalamasına göre ise bir ay 30,436875 gündür."],
    ['90 gün kaç ay eder?', "30 günlük ayla tam 3 aydır. Ortalama ay uzunluğuyla hesaplanırsa 2,957 ay, yani üç aydan bir günden biraz fazla eksik çıkar."],
    ['6 ay kaç gündür?', "30 günlük ayla 180 gün, ortalama ayla yaklaşık 182,6 gündür. Takvimde hangi altı ayı kastettiğinize göre gerçek sayı 181 ile 184 arasında değişir."],
    ['100 gün kaç ay kaç gündür?', "30 günlük ay kabulüyle 3 ay 10 gündür; ondalıklı yazımla 3,3333 ay eder."],
    ['Bir ay kaç haftadır?', "30 günlük ay 4,29 hafta, ortalama ay 4,35 haftadır. Yalnızca 28 günlük Şubat tam 4 haftaya eşittir; bu yüzden bir ayı dört hafta saymak yılda yaklaşık dört haftalık açık verir."],
    ['Ortalama ay değeri nereden geliyor?', "Miladi takvimin 400 yıllık döngüsünde bir yıl ortalama 365,2425 gündür. Bu sayı 12'ye bölündüğünde 30,436875 gün bulunur."],
    ['Hamilelik ya da bebek ayını bununla hesaplayabilir miyim?', "Süreyi gün ve hafta olarak görmek için kullanabilirsiniz. Ancak gebelik haftası ve bebek gelişimi takibi tıbbi bir konudur; kesin değerlendirme için hekiminize danışın."],
    ['Yazdığım değerler saklanıyor mu?', "Hayır. Çeviri tarayıcınızda yapılır, girdiğiniz sayılar hiçbir sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ['yil-gun-cevir', 'hafta-gun-cevir', 'gun-saat-cevir', 'gunluk-faiz-hesapla', 'saat-dakika-cevir'],
};
