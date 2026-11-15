export default {
  slug: 'ondalik-saat-cevir',
  title: 'Ondalık Saat Dakika Çevirici',
  h1Tail: '7,75 saat ↔ 7:45',
  pageTitle: "Ondalık Saat Dakika Çevirici – 7,5 Saat Kaç Saat Kaç Dakika?",
  description: "Ondalık saati saat ve dakikaya, saat:dakika biçimini ondalık saate çevirin. Puantaj, mesai ve ücret hesaplarında 7,75 saat ile 7:45 arasındaki farkı netleştirin.",
  card: "Ondalık saati saat ve dakikaya, 7:45 gibi süreleri ondalık saate çevirin; puantaj ve mesai hesabı için.",
  category: 'birim',
  keywords: ['ondalık saat çevirme', 'ondalık saat dakika', '7,5 saat kaç dakika', 'saat dakika ondalık çevirme', 'puantaj saat hesaplama', '0,75 saat kaç dakika', 'dakikayı ondalık saate çevirme'],
  lead: "Ondalıklı yazılmış bir çalışma süresini saat ve dakikaya ya da <strong>7:45</strong> gibi bir süreyi ondalık saate çevirin. 7,75 saat ile 7 saat 75 dakikanın aynı şey olmadığını; birincisinin 7 saat 45 dakika ettiğini bu araçla anında görürsünüz.",
  button: 'Çevir',
  inputs: [
    { id: 'sure', label: 'Süre', type: 'text', placeholder: 'Örn. 7,75 ya da 7:45', hint: 'Ondalık saat için 7,75; saat biçimi için 7:45 ya da 7:45:30 yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ondalik', 'Ondalık saat → Saat ve dakika'], ['saat', 'Saat:dakika → Ondalık saat']] },
  ],
  compute(v, h) {
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun.');
    const iki = (n) => String(n).padStart(2, '0');
    if (v.yon === 'saat') {
      const m = /^(\d+)\s*:\s*(\d{1,2})(?:\s*:\s*(\d{1,2}))?$/.exec(ham);
      if (!m) h.err('Süreyi saat:dakika biçiminde yazın (örn. 7:45 ya da 7:45:30). Ondalık bir değer çevirecekseniz yönü değiştirin.');
      const sa = Number(m[1]), dk = Number(m[2]), sn = m[3] === undefined ? 0 : Number(m[3]);
      if (dk > 59) h.err('Dakika 0 ile 59 arasında olmalı.');
      if (sn > 59) h.err('Saniye 0 ile 59 arasında olmalı.');
      const toplamSn = sa * 3600 + dk * 60 + sn;
      return {
        rows: [
          ['Ondalık saat', h.fmt(toplamSn / 3600, 4) + ' saat'],
          ['Toplam dakika', h.fmt(toplamSn / 60, 2) + ' dk'],
          ['Toplam saniye', h.fmt(toplamSn, 0) + ' sn'],
          ['Saat biçimi', `${sa}:${iki(dk)}:${iki(sn)}`],
        ],
        note: 'Ondalık saat = saat + dakika ÷ 60 + saniye ÷ 3600. Sonuç en fazla dört ondalık basamakla gösterilir.',
      };
    }
    if (ham.includes(':')) h.err('Ondalık saat alanına 7,75 gibi bir sayı yazın. 7:45 biçimindeki süre için yönü "Saat:dakika → Ondalık saat" seçin.');
    const x = h.nonneg(ham, 'Süre');
    const toplamSn = Math.round(x * 3600);
    const sa = Math.floor(toplamSn / 3600);
    const dk = Math.floor((toplamSn % 3600) / 60);
    const sn = toplamSn % 60;
    return {
      rows: [
        ['Saat ve dakika', `${sa} saat ${dk} dakika` + (sn ? ` ${sn} saniye` : '')],
        ['Saat biçimi', `${sa}:${iki(dk)}:${iki(sn)}`],
        ['Toplam dakika', h.fmt(x * 60, 2) + ' dk'],
        ['Toplam saniye', h.fmt(toplamSn, 0) + ' sn'],
      ],
      note: 'Ondalık kısım 60 ile çarpılarak dakikaya çevrilir; sonuç en yakın saniyeye yuvarlanır.',
    };
  },
  cases: [
    { in: { sure: '7,75', yon: 'ondalik' }, out: { 'Saat ve dakika': '7 saat 45 dakika', 'Saat biçimi': '7:45:00', 'Toplam dakika': '465 dk' } },
    { in: { sure: '7:45', yon: 'saat' }, out: { 'Ondalık saat': '7,75 saat', 'Toplam dakika': '465 dk', 'Toplam saniye': '27.900 sn' } },
    { in: { sure: '1,5', yon: 'ondalik' }, out: { 'Saat ve dakika': '1 saat 30 dakika', 'Toplam saniye': '5.400 sn' } },
    { in: { sure: '8,33', yon: 'ondalik' }, out: { 'Saat ve dakika': '8 saat 19 dakika 48 saniye', 'Saat biçimi': '8:19:48' } },
    { in: { sure: '0,1', yon: 'ondalik' }, out: { 'Saat ve dakika': '0 saat 6 dakika', 'Toplam dakika': '6 dk' } },
    { in: { sure: '8:20', yon: 'saat' }, out: { 'Ondalık saat': '8,3333 saat', 'Toplam dakika': '500 dk' } },
    { in: { sure: '1:30:36', yon: 'saat' }, out: { 'Ondalık saat': '1,51 saat', 'Toplam saniye': '5.436 sn' } },
    { in: { sure: '0:36', yon: 'saat' }, out: { 'Ondalık saat': '0,6 saat' } },
    { in: { sure: '7:75', yon: 'saat' }, error: true },
    { in: { sure: '', yon: 'ondalik' }, error: true },
    { in: { sure: 'yedi buçuk', yon: 'ondalik' }, error: true },
  ],
  howto: [
    "'Çeviri yönü' listesinden ne yapmak istediğinizi seçin: ondalık saati saat ve dakikaya mı, yoksa saat:dakika biçimini ondalık saate mi çevireceksiniz?",
    "'Süre' alanına değeri yazın. Ondalık yön için 7,75 gibi bir sayı, saat biçimi için 7:45 ya da saniyeli olarak 7:45:30 girin.",
    "'Çevir' düğmesine basın. İlk satır aradığınız karşılığı, diğer satırlar toplam dakika ve toplam saniyeyi gösterir.",
    "Puantaj ya da fatura tablosuna aktaracaksanız 'Sonucu kopyala' düğmesiyle satırları panoya alın.",
  ],
  sections: [
    { h: 'Ondalık saat nedir, neden karıştırılır?', p: [
      "Saat altmışlık, sayılarımız ise onluk sistemle çalışır. Bir süreyi 7:45 biçiminde yazdığımızda iki noktadan sonraki kısım dakikadır ve en fazla 59 olabilir. Aynı süreyi tek bir sayı olarak yazmak istediğimizde dakikayı saatin kesrine çeviririz: 45 dakika bir saatin dörtte üçüdür, dolayısıyla süre <strong>7,75 saat</strong> olur. Buna ondalık saat denir.",
      "Karışıklık tam burada başlar. 7,75 saat gören biri bunu 7 saat 75 dakika diye okuyabilir; 7:30 gören biri de tabloya 7,30 yazabilir. Oysa 7:30 ondalık olarak 7,5 saattir ve 7,30 saat yalnızca 7 saat 18 dakika eder. Aradaki 12 dakikalık fark, bir aylık puantajda saatlerce eksik ya da fazla ödemeye dönüşebilir.",
    ] },
    { h: 'Formüller ve çözümlü örnekler', p: [
      "Saat:dakika biçiminden ondalığa geçerken dakika 60'a, saniye 3600'e bölünüp saate eklenir: <strong>ondalık saat = saat + dakika ÷ 60 + saniye ÷ 3600</strong>. Ters yönde sayının tam kısmı saattir; ondalık kısım 60 ile çarpılarak dakika bulunur, dakikanın küsuratı yeniden 60 ile çarpılarak saniyeye çevrilir.",
      "Örnek 1: 7,75 saat kaç saat kaç dakikadır? Tam kısım 7 saattir. 0,75 × 60 = 45 dakika. Sonuç 7 saat 45 dakika, toplam 465 dakikadır.",
      "Örnek 2: 8:20 çalışan birinin süresi ondalık olarak kaçtır? 20 ÷ 60 = 0,3333; toplam 8,3333 saat. Saatlik ücret bu sayı ile çarpılır, 8,20 ile değil.",
      "Örnek 3: 8,33 saat yazılmış bir kayıt tam olarak 8 saat 19 dakika 48 saniyedir. 0,33 × 60 = 19,8 dakika; 0,8 dakika da 48 saniye eder. Görüldüğü gibi 8,33 değeri 8:20'nin yuvarlanmış hâlidir ve 12 saniye eksik kalır.",
    ] },
    { h: 'Dakika – ondalık saat tablosu', p: [
      "Sık kullanılan dakikaların ondalık karşılıkları aşağıdadır. Bu değerleri ezberlemek elle kontrol yaparken işinizi kolaylaştırır.",
    ], ul: [
      "<strong>6 dakika</strong> = 0,1 saat",
      "<strong>10 dakika</strong> = 0,1667 saat",
      "<strong>12 dakika</strong> = 0,2 saat",
      "<strong>15 dakika</strong> = 0,25 saat (çeyrek)",
      "<strong>20 dakika</strong> = 0,3333 saat",
      "<strong>30 dakika</strong> = 0,5 saat (yarım)",
      "<strong>36 dakika</strong> = 0,6 saat",
      "<strong>40 dakika</strong> = 0,6667 saat",
      "<strong>45 dakika</strong> = 0,75 saat",
      "<strong>50 dakika</strong> = 0,8333 saat",
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      "Ondalık saat en çok ücretin süreyle çarpıldığı yerlerde gerekir. Parmak izi ya da kart okuyucu sistemleri giriş ve çıkışı saat:dakika olarak kaydeder; bordro programları ve hesap tabloları ise çarpma yapabilmek için ondalık değer ister. Serbest çalışanlar, avukatlar, danışmanlar ve yazılımcılar müşteriye fatura keserken harcadıkları süreyi ondalık saate çevirip saatlik ücretle çarpar.",
      "Benzer biçimde servis ve bakım formlarında işçilik süresi, araç kiralamada kullanım süresi, makine parkında çalışma saati sayaçları ve uçuş kayıt defterleri ondalık saat kullanır. Hesap tablosunda saat biçimli bir hücreyi doğrudan ücretle çarptığınızda beklenmedik sonuç alıyorsanız, nedeni çoğunlukla sürenin ondalığa çevrilmemiş olmasıdır.",
      "Fazla mesai, dinlenme arası ve ücret hesabının hukuki yönü iş mevzuatına ve sözleşmenize bağlıdır. Bu araç yalnızca süreyi bir gösterimden diğerine çevirir; hak ve alacak hesabı için güncel mevzuatı kontrol edin ya da bir uzmana danışın.",
    ] },
    { h: 'Yuvarlama konusunda dikkat', p: [
      "Dakikaların çoğu ondalık saatte sonsuz basamaklı sayılara dönüşür: 20 dakika 0,3333…, 10 dakika 0,1666… saattir. İki basamağa yuvarlanmış değerlerle çalışmak her kayıtta birkaç saniyelik sapma yaratır. Tek tek önemsiz görünen bu sapmalar yüzlerce satırlık bir puantajda birikir. Mümkünse toplamayı dakika üzerinden yapın, ondalığa çevirme işlemini en sonda ve bir kez uygulayın.",
      "Araç, ondalıktan saat biçimine çevirirken sonucu en yakın saniyeye yuvarlar; ters yönde ise en fazla dört ondalık basamak gösterir. Bu duyarlılık saniyenin altındaki farkları kapsar ve ücret hesapları için fazlasıyla yeterlidir.",
    ] },
    { h: 'Sınırlar', p: [
      "Saat değeri 24 ile sınırlı değildir; 172:30 gibi aylık toplamları da çevirebilirsiniz. Dakika ve saniye 59'u geçemez, negatif süre kabul edilmez. Araç saat dilimi, gece yarısını aşan vardiya ya da iki saat arasındaki fark hesabı yapmaz; yalnızca verilen sürenin gösterimini değiştirir.",
    ] },
  ],
  faq: [
    ['7,5 saat kaç saat kaç dakikadır?', "7,5 saat, 7 saat 30 dakikadır. Ondalık kısım olan 0,5 ile 60 çarpılır ve 30 dakika bulunur. 7,5 saat 7 saat 50 dakika değildir."],
    ['0,75 saat kaç dakikadır?', "0,75 × 60 = 45 dakikadır. Aynı mantıkla 0,25 saat 15 dakika, 0,1 saat 6 dakika eder."],
    ['7:45 ondalık saat olarak nasıl yazılır?', "45 dakika 60'a bölünür ve 0,75 bulunur; süre 7,75 saattir. Aracın 'Saat:dakika → Ondalık saat' yönü bu hesabı sizin yerinize yapar."],
    ['Puantajda 8,20 yazmak neden yanlış?', "Çünkü 8,20 saat 8 saat 12 dakikaya karşılık gelir. 8 saat 20 dakika çalışan birinin süresi ondalık olarak 8,3333 saattir; 8,20 yazmak her gün 8 dakika eksik hesaplamak demektir."],
    ['Saniyeli süre girebilir miyim?', "Evet. Saat biçimi yönünde 1:30:36 gibi üç parçalı bir değer yazabilirsiniz; sonuç 1,51 saat olur. Ondalık yönde ise küsurat saniyeye kadar ayrıştırılır."],
    ['24 saatten uzun süreleri çevirebilir miyim?', "Evet. Haftalık ya da aylık toplam çalışma süresi gibi büyük değerler de geçerlidir. Örneğin 45,5 saat, 45 saat 30 dakika olarak gösterilir."],
    ['Ondalık saat ile ondalık zaman aynı şey mi?', "Hayır. Ondalık saat, bildiğimiz 60 dakikalık saatin kesirli yazımıdır. Günü 10 saate bölen tarihî ondalık zaman sistemi ise farklı bir konudur ve bu aracın kapsamında değildir."],
    ['Girdiğim çalışma saatleri kaydediliyor mu?', "Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız süreler hiçbir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['saat-dakika-cevir', 'saniye-dakika-cevir', 'saatlik-aylik-ucret-cevir', 'saatlik-ucret-hesapla', 'gun-saat-cevir'],
};
