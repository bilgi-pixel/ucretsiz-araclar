export default {
  slug: 'kelime-sayaci',
  title: 'Kelime Sayacı',
  h1Tail: 'kelime, cümle ve okuma süresi',
  pageTitle: 'Kelime Sayacı – Metindeki Kelime Sayısını Anında Bulun',
  description: 'Metninizdeki kelime sayısını anında öğrenin. Benzersiz kelime, cümle, paragraf ve karakter sayısı, ortalama kelime uzunluğu ve tahmini okuma süresi birlikte gösterilir.',
  card: 'Metnin kelime sayısını; benzersiz kelime, cümle, paragraf, karakter sayısı ve tahmini okuma süresiyle birlikte öğrenin.',
  category: 'metin',
  keywords: ['kelime sayacı', 'kelime sayma', 'kelime sayısı hesaplama', 'kaç kelime', 'metin kelime sayısı', 'benzersiz kelime sayısı', 'okuma süresi', 'cümle sayısı'],
  lead: 'Yazınızı kutuya yapıştırın; <strong>kelime sayısını</strong>, kaç farklı kelime kullandığınızı, cümle ve paragraf sayısını, ortalama kelime uzunluğunu ve metnin yaklaşık kaç dakikada okunacağını tek tıkla görün.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Kelimelerini saymak istediğiniz metni buraya yazın ya da yapıştırın' },
    { id: 'hiz', label: 'Okuma hızı (kelime/dakika)', type: 'number', value: '200', hint: 'Tahmini okuma süresi bu hıza göre hesaplanır.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Saymak için "Metin" alanına bir şeyler yazın ya da yapıştırın.');
    const hiz = h.opt(v.hiz, 200, 'Okuma hızı');
    if (!(hiz > 0)) h.err('"Okuma hızı" sıfırdan büyük olmalı (örn. 200).');
    const kelimeler = s.split(/\s+/u)
      .map((w) => w.replace(/^[^\p{L}\p{Nd}]+|[^\p{L}\p{Nd}]+$/gu, ''))
      .filter((w) => w !== '');
    if (!kelimeler.length) h.err('Metinde sayılabilecek bir kelime bulunamadı; harf ya da rakam içeren bir metin yazın.');
    const kucuk = kelimeler.map((w) => w.toLocaleLowerCase('tr-TR'));
    const benzersiz = new Set(kucuk).size;
    let toplamUzunluk = 0, enUzun = '';
    for (const w of kucuk) {
      const u = Array.from(w).length;
      toplamUzunluk += u;
      if (u > Array.from(enUzun).length) enUzun = w;
    }
    const cumle = s.split(/[.!?…]+(?=\s|$)/u).filter((p) => /[\p{L}\p{Nd}]/u.test(p)).length;
    const paragraf = s.split('\n').filter((p) => p.trim() !== '').length;
    const ch = Array.from(s);
    const bosluksuz = ch.filter((c) => !/\s/u.test(c)).length;
    const sn = Math.round(kelimeler.length / hiz * 60);
    const dk = Math.floor(sn / 60), kalan = sn % 60;
    const sure = dk > 0 ? (kalan > 0 ? `${h.fmt(dk, 0)} dk ${kalan} sn` : `${h.fmt(dk, 0)} dk`) : `${kalan} sn`;
    const n = (x) => h.fmt(x, 0);
    return {
      rows: [
        ['Kelime', n(kelimeler.length)],
        ['Benzersiz kelime', n(benzersiz)],
        ['Cümle', n(cumle)],
        ['Paragraf', n(paragraf)],
        ['Karakter (boşluklu)', n(ch.length)],
        ['Karakter (boşluksuz)', n(bosluksuz)],
        ['Ortalama kelime uzunluğu', h.fmt(toplamUzunluk / kelimeler.length, 1) + ' karakter'],
        ['En uzun kelime', enUzun],
        ['Tahmini okuma süresi', sure],
      ],
      note: 'Kelimeler boşluklara göre ayrılır; yalnızca noktalama işaretinden oluşan parçalar sayılmaz. Benzersiz kelime sayımında büyük-küçük harf farkı Türkçe kurallarına göre yok sayılır.',
    };
  },
  cases: [
    { in: { metin: 'Bugün hava çok güzel.' }, out: { 'Kelime': '4', 'Benzersiz kelime': '4', 'Cümle': '1', 'Paragraf': '1', 'Karakter (boşluklu)': '21', 'Karakter (boşluksuz)': '18', 'Tahmini okuma süresi': '1 sn' } },
    { in: { metin: 'Ali geldi. Veli gitti! Sen kaldın mı?' }, out: { 'Kelime': '7', 'Benzersiz kelime': '7', 'Cümle': '3', 'En uzun kelime': 'kaldın' } },
    { in: { metin: 'elma armut elma Elma ELMA' }, out: { 'Kelime': '5', 'Benzersiz kelime': '2', 'Ortalama kelime uzunluğu': '4,2 karakter', 'En uzun kelime': 'armut' } },
    { in: { metin: 'Işık IŞIK ışık' }, out: { 'Kelime': '3', 'Benzersiz kelime': '1', 'En uzun kelime': 'ışık' } },
    { in: { metin: 'Birinci paragraf burada.\n\nİkinci paragraf da burada.' }, out: { 'Kelime': '7', 'Benzersiz kelime': '5', 'Cümle': '2', 'Paragraf': '2' } },
    { in: { metin: 'Fiyat 3.5 TL - yani ucuz' }, out: { 'Kelime': '5', 'Cümle': '1' } },
    { in: { metin: 'kelime '.repeat(400).trim(), hiz: '200' }, out: { 'Kelime': '400', 'Benzersiz kelime': '1', 'Tahmini okuma süresi': '2 dk' } },
    { in: { metin: 'söz '.repeat(375).trim(), hiz: '250' }, out: { 'Kelime': '375', 'Tahmini okuma süresi': '1 dk 30 sn' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '... !!! ---' }, error: true },
    { in: { metin: 'Merhaba dünya', hiz: '0' }, error: true },
  ],
  howto: [
    'Metninizi "Metin" kutusuna yazın ya da bir belgeden, e-postadan, web sayfasından kopyalayıp yapıştırın.',
    'Okuma süresini kendi hızınıza göre görmek isterseniz "Okuma hızı" alanındaki değeri değiştirin; emin değilseniz 200 olarak bırakın.',
    '"Say" düğmesine basın. Kelime sayısı ilk satırda, diğer ölçüler altında listelenir.',
    'Metni düzenledikten sonra yeniden sayarak hedeflediğiniz kelime sayısına ne kadar yaklaştığınızı izleyin.',
  ],
  sections: [
    { h: 'Kelime nasıl sayılır?', p: [
      'Bu araç, yazım dünyasında en yaygın kabul gören yöntemi kullanır: metin boşluklara, sekmelere ve satır sonlarına göre parçalara ayrılır ve içinde en az bir harf ya da rakam bulunan her parça <strong>bir kelime</strong> sayılır. Kelimenin başındaki ve sonundaki noktalama işaretleri sayımı etkilemez; "güzel." ile "güzel" aynı kelimedir.',
      'Bu tanımın birkaç sonucu vardır. Kesme işaretiyle ayrılan ekler kelimeyi bölmez: "Ankara\'ya" tek kelimedir. Tireyle birleştirilmiş ifadeler de tek kelime sayılır. Sayılar birer kelimedir: "3.5" ya da "2026" bir kelime olarak geçer. Buna karşılık iki kelime arasına tek başına konmuş bir tire ya da üç nokta kelime sayılmaz. "Fiyat 3.5 TL - yani ucuz" ifadesinde beş kelime vardır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '"Ali geldi. Veli gitti! Sen kaldın mı?" metnini inceleyelim. Boşluklara göre ayırdığımızda Ali, geldi, Veli, gitti, Sen, kaldın ve mı olmak üzere <strong>7 kelime</strong> buluruz. Yedisi de birbirinden farklı olduğu için benzersiz kelime sayısı da 7\'dir. Metinde nokta, ünlem ve soru işaretiyle biten üç ayrı yargı bulunduğundan cümle sayısı 3, tek satır olduğundan paragraf sayısı 1\'dir.',
      'İkinci bir örnek benzersiz kelime sayımını gösterir: "elma armut elma Elma ELMA" beş kelimeden oluşur, ancak yalnızca iki farklı kelime içerir. Büyük-küçük harf farkı yok sayıldığı için "elma", "Elma" ve "ELMA" aynı kelime kabul edilir. Ortalama kelime uzunluğu (4 + 5 + 4 + 4 + 4) ÷ 5 = 4,2 karakterdir.',
    ] },
    { h: 'Benzersiz kelime sayısı ne işe yarar?', p: [
      'Toplam kelime sayısı metnin uzunluğunu, benzersiz kelime sayısı ise <strong>söz varlığının çeşitliliğini</strong> gösterir. İki değer birbirine ne kadar yakınsa metinde o kadar az tekrar vardır. Kısa metinlerde oranın yüksek çıkması doğaldır; metin uzadıkça bağlaçlar, edatlar ve konunun ana terimleri tekrarlandığı için oran düşer.',
      'Türkçe sondan eklemeli bir dil olduğundan aynı kökten türeyen "ev", "evde", "evlerimiz" gibi biçimler bu sayımda ayrı kelimeler olarak görünür. Bu, Türkçe metinlerde benzersiz kelime oranının birçok dile göre yüksek çıkmasının başlıca nedenidir. Araç, karşılaştırmayı Türkçe harf kurallarına göre yapar: büyük "I" harfinin küçüğü "ı", büyük "İ" harfinin küçüğü "i" kabul edilir; böylece "IŞIK" ile "ışık" doğru biçimde eşleşir.',
    ] },
    { h: 'Cümle ve paragraf sayımı', p: [
      'Cümleler; nokta, ünlem, soru işareti ya da üç nokta ile biten ve ardından boşluk ya da metin sonu gelen bölümler olarak sayılır. Ondalık sayılardaki nokta ("3.5") cümleyi bölmez, çünkü ardından boşluk gelmez. Öte yandan "Dr." ya da "vb." gibi nokta ile biten kısaltmalar cümle sonu gibi algılanabilir; kısaltmanın çok kullanıldığı metinlerde cümle sayısı gerçek değerden bir miktar yüksek çıkabilir.',
      'Paragraf sayısı, boş olmayan satırların sayısıdır. Yani her satır başı yeni bir paragraf kabul edilir; aradaki boş satırlar sayılmaz. Şiir gibi her dizenin ayrı satırda olduğu metinlerde bu değer dize sayısını verir.',
    ] },
    { h: 'Okuma süresi nasıl tahmin edilir?', p: [
      'Tahmini okuma süresi basit bir bölmedir: <strong>süre = kelime sayısı ÷ okuma hızı</strong>. Varsayılan değer dakikada 200 kelimedir; bu, yetişkinlerin sessiz okuma hızı için sıkça kullanılan yuvarlak bir kabuldür. Bu hızla 400 kelimelik bir yazı 2 dakikada, 1000 kelimelik bir yazı 5 dakikada okunur.',
      'Gerçek hız kişiden kişiye, metnin zorluğuna ve okuma amacına göre belirgin biçimde değişir. Teknik bir şartname ya da hukuki bir metin daha yavaş, hafif bir haber yazısı daha hızlı okunur. Sesli okuma ve sunum konuşması sessiz okumadan yavaştır; bir konuşma metninin süresini kestirmek için hız alanına dakikada 120–150 kelime gibi daha düşük bir değer yazabilirsiniz. Blog yazılarının başındaki "okuma süresi" bilgisi de genellikle bu yöntemle hesaplanır.',
    ] },
    { h: 'Kelime sayısı nerelerde istenir?', ul: [
      '<strong>Ödev, makale ve tez:</strong> öğretim elemanları ve dergiler alt ve üst kelime sınırı koyar; özet bölümleri için ayrı bir sınır bulunur.',
      '<strong>Sınav kompozisyonları ve dil sınavları:</strong> yazma bölümlerinde belirli bir kelime aralığı beklenir; çalışma sırasında yazdığınız metni sayarak süre ve uzunluk duygusu kazanırsınız.',
      '<strong>Web içeriği:</strong> içerik yazarları sayfanın konuyu yeterince kapsayıp kapsamadığını kelime sayısıyla izler; çok kısa sayfalar yetersiz içerik olarak değerlendirilebilir.',
      '<strong>Çeviri ve serbest yazarlık:</strong> ücret kelime başına belirlendiğinde iş hacmi ve fatura tutarı kelime sayısından hesaplanır.',
      '<strong>Konuşma ve sunum:</strong> ayrılan süreye sığacak metin uzunluğu kelime sayısıyla planlanır.',
      '<strong>Basın bülteni, ilan ve başvuru metinleri:</strong> yayıncıların ve kurumların belirlediği uzunluk sınırlarına uymak gerekir.',
    ] },
    { h: 'Farklı araçlar neden farklı sonuç verir?', p: [
      'Aynı metni iki ayrı programda saydığınızda birkaç kelimelik fark görmeniz olağandır, çünkü "kelime"nin tek bir evrensel tanımı yoktur. Bazı programlar tireyle birleşik ifadeleri iki kelime sayar, bazıları tek başına duran sayıları ya da simgeleri kelime kabul eder, bazıları dipnot ve üstbilgi metinlerini sayıma katar ya da katmaz. İnternet adresleri ve e-posta adresleri de araçtan araca farklı bölünür.',
      'Bir kuruma teslim edeceğiniz metinde kelime sınırı varsa ve sınıra çok yakınsanız, o kurumun hangi programın sayımını esas aldığını öğrenmek en sağlıklı yoldur. Sınırın birkaç kelime altında kalmak bu tür küçük sayım farklarına karşı güvenli bir pay bırakır. Bu araç yalnızca yapıştırdığınız düz metni sayar; biçimlendirme, tablo yapısı ve görseller sonucu etkilemez.',
    ] },
  ],
  faq: [
    ['Kelime sayısı nasıl hesaplanır?', 'Metin boşluklara ve satır sonlarına göre parçalara ayrılır; içinde en az bir harf ya da rakam bulunan her parça bir kelime sayılır. Noktalama işaretleri kelimeye yapışık olsa da sayımı değiştirmez.'],
    ['Sayılar kelime olarak sayılır mı?', 'Evet. "2026" ya da "3.5" gibi sayılar birer kelime olarak sayılır. Yalnızca noktalama işaretinden oluşan, örneğin tek başına duran bir tire kelime sayılmaz.'],
    ['Kesme işaretli kelimeler kaç kelime sayılır?', 'Tek kelime sayılır. "İstanbul\'da" ya da "TBMM\'nin" gibi yazımlarda kesme işareti kelimeyi bölmez, çünkü arada boşluk yoktur.'],
    ['1 sayfa kaç kelimedir?', 'Yazı tipi, punto, satır aralığı ve kenar boşluklarına göre değişir; kesin bir değer yoktur. Kabaca, tek satır aralıklı ve 12 punto bir A4 sayfası birkaç yüz kelime alır. En doğrusu kendi metninizi yapıştırıp saymaktır.'],
    ['500 kelime kaç dakikada okunur?', 'Dakikada 200 kelime hızıyla 2 dakika 30 saniyede okunur. Sesli okuma ya da sunum için dakikada 130 kelime alınırsa süre yaklaşık 3 dakika 51 saniye olur.'],
    ['Benzersiz kelime sayısı neden toplamdan az?', 'Çünkü tekrar eden kelimeler bir kez sayılır. "ve", "bir", "bu" gibi sık kullanılan sözcükler ve konunun ana terimleri metinde defalarca geçer; benzersiz sayım bunları teke indirir.'],
    ['Başlıklar ve madde işaretleri sayıma dahil mi?', 'Kutuya yapıştırdığınız her şey sayılır. Başlıklar ve liste maddeleri de kelimelerden oluştuğu için toplama girer; yalnızca madde imi gibi harf içermeyen simgeler sayılmaz.'],
    ['Yapıştırdığım metin kaydediliyor mu?', 'Hayır. Sayım tamamen tarayıcınızda yapılır; metniniz hiçbir sunucuya gönderilmez, saklanmaz ve sayfayı kapattığınızda kaybolur.'],
  ],
  related: ['karakter-sayaci', 'cumle-sayaci', 'paragraf-sayaci', 'okuma-suresi-hesapla', 'kelime-frekansi', 'metin-istatistikleri'],
};
