export default {
  slug: 'havuz-hacmi-hesapla',
  title: 'Havuz Hacmi Hesaplama',
  h1Tail: 'm³, litre ve dolum süresi',
  pageTitle: 'Havuz Hacmi Hesaplama – Kaç Ton Su Alır, Kaç Saatte Dolar?',
  description: 'Dikdörtgen, yuvarlak ya da oval havuzun ölçülerini ve derinliğini girin; kaç metreküp ve kaç litre su aldığını, yüzey alanını ve dolum süresini hesaplayın.',
  card: 'Dikdörtgen, yuvarlak ya da oval havuzun kaç m³ su aldığını, yüzey alanını ve hortumla kaç saatte dolacağını bulun.',
  category: 'insaat',
  keywords: ['havuz hacmi hesaplama', 'havuz kaç ton su alır', 'havuz m3 hesaplama', 'havuz litre hesabı', 'yuvarlak havuz hacmi', 'havuz dolum süresi', 'şişme havuz kaç litre'],
  lead: "Yüzme havuzunuzun ya da süs havuzunuzun <strong>kaç metreküp su aldığını</strong> şekline ve derinliğine göre hesaplayın. Sığ ve derin uç farklıysa ortalama derinlik otomatik bulunur; doldurma debisini yazarsanız dolum süresi de görünür.",
  button: 'Hesapla',
  inputs: [
    { id: 'sekil', label: 'Havuz şekli', type: 'select', options: [['dikdortgen', 'Dikdörtgen'], ['yuvarlak', 'Yuvarlak (daire)'], ['oval', 'Oval (elips)']] },
    { id: 'boy', label: 'Boy ya da çap (m)', type: 'number', placeholder: 'Örn. 10', hint: 'Yuvarlak havuzda çapı yazın.' },
    { id: 'en', label: 'En (m)', type: 'number', placeholder: 'Yuvarlak havuzda boş bırakın' },
    { id: 'sig', label: 'Su derinliği / sığ uç (m)', type: 'number', placeholder: 'Örn. 1,2' },
    { id: 'derin', label: 'Derin uç su derinliği (m)', type: 'number', placeholder: 'Boş = sabit derinlik' },
    { id: 'debi', label: 'Doldurma debisi (litre/dakika)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Bahçe hortumu için kovayla ölçebilirsiniz.' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const a = h.pos(v.boy, 'Boy ya da çap');
    let alan;
    if (v.sekil === 'yuvarlak') alan = Math.PI * a * a / 4;
    else {
      const b = h.pos(v.en, 'En');
      alan = v.sekil === 'oval' ? Math.PI * a * b / 4 : a * b;
    }
    const d1 = h.pos(v.sig, 'Su derinliği');
    const d2 = bos(v.derin) ? d1 : h.pos(v.derin, 'Derin uç su derinliği');
    if (Math.max(d1, d2) > 20) h.err('Derinlik metre olarak yazılmalı; 20 m üzeri değerler için ölçüyü kontrol edin (120 cm için 1,2 yazın).');
    const ort = (d1 + d2) / 2;
    const m3 = alan * ort;
    const rows = [
      ['Havuz hacmi', h.fmt(m3, 2) + ' m³'],
      ['Litre', h.fmt(m3 * 1000, 0) + ' litre'],
      ['Su yüzey alanı', h.fmt(alan, 2) + ' m²'],
      ['Ortalama derinlik', h.fmt(ort, 2) + ' m'],
      ['Suyun ağırlığı', h.fmt(m3, 2) + ' ton'],
    ];
    if (!bos(v.debi)) {
      const q = h.pos(v.debi, 'Doldurma debisi');
      rows.push(['Dolum süresi', h.fmt(m3 * 1000 / q / 60, 1) + ' saat']);
    }
    return {
      rows,
      note: 'Derinlik olarak havuz duvarının değil suyun derinliğini yazın. Eğimli tabanda iki ucun ortalaması alınır; 1 m³ su yaklaşık 1 ton kabul edilmiştir.',
    };
  },
  cases: [
    { in: { sekil: 'dikdortgen', boy: '10', en: '5', sig: '1,2', derin: '1,8', debi: '50' }, out: { 'Havuz hacmi': '75 m³', 'Litre': '75.000 litre', 'Su yüzey alanı': '50 m²', 'Ortalama derinlik': '1,5 m', 'Suyun ağırlığı': '75 ton', 'Dolum süresi': '25 saat' } },
    { in: { sekil: 'yuvarlak', boy: '4', sig: '1,2' }, out: { 'Havuz hacmi': '15,08 m³', 'Litre': '15.080 litre', 'Su yüzey alanı': '12,57 m²', 'Ortalama derinlik': '1,2 m' } },
    { in: { sekil: 'oval', boy: '8', en: '4', sig: '1,5' }, out: { 'Havuz hacmi': '37,7 m³', 'Su yüzey alanı': '25,13 m²' } },
    { in: { sekil: 'dikdortgen', boy: '25', en: '12,5', sig: '2' }, out: { 'Havuz hacmi': '625 m³', 'Litre': '625.000 litre', 'Su yüzey alanı': '312,5 m²' } },
    { in: { sekil: 'yuvarlak', boy: '3,05', sig: '0,76', debi: '20' }, out: { 'Havuz hacmi': '5,55 m³', 'Litre': '5.553 litre', 'Dolum süresi': '4,6 saat' } },
    { in: { sekil: 'dikdortgen', boy: '8', en: '4', sig: '1', derin: '2', debi: '100' }, out: { 'Havuz hacmi': '48 m³', 'Ortalama derinlik': '1,5 m', 'Dolum süresi': '8 saat' } },
    { in: { sekil: 'dikdortgen', boy: '10', en: '', sig: '1,5' }, error: true },
    { in: { sekil: 'yuvarlak', boy: '4', sig: '0' }, error: true },
  ],
  howto: [
    "Havuzunuzun şeklini seçin. Köşeleri hafif yuvarlatılmış dikdörtgen havuzlar için \"Dikdörtgen\" seçeneği yeterli doğruluktadır.",
    "Boyu ve eni metre olarak yazın. Yuvarlak havuzda yalnızca çapı \"Boy ya da çap\" alanına girin; oval havuzda en uzun ve en kısa ekseni yazın.",
    "Suyun derinliğini girin. Tabanı eğimli havuzlarda sığ ucun derinliğini ilk alana, derin ucun derinliğini ikinci alana yazın; düz tabanlı havuzda ikinci alanı boş bırakın.",
    "Dolum süresini de görmek isterseniz doldurma debisini litre/dakika olarak yazıp \"Hesapla\" düğmesine basın.",
  ],
  sections: [
    { h: 'Havuz hacmi formülleri', p: [
      "Her havuzun hacmi, su yüzeyinin alanı ile ortalama su derinliğinin çarpımıdır. Fark yalnızca yüzey alanının nasıl bulunduğundadır:",
    ], ul: [
      "<strong>Dikdörtgen havuz:</strong> alan = boy × en. Hacim = boy × en × ortalama derinlik.",
      "<strong>Yuvarlak havuz:</strong> alan = π × çap² ÷ 4. Hacim = π × çap² ÷ 4 × derinlik.",
      "<strong>Oval (elips) havuz:</strong> alan = π × boy × en ÷ 4. Hacim = π × boy × en ÷ 4 × ortalama derinlik.",
      "<strong>Ortalama derinlik:</strong> taban sığ uçtan derin uca düzgün bir eğimle iniyorsa (sığ derinlik + derin derinlik) ÷ 2.",
    ] },
    { h: 'Çözümlü örnek: 10 × 5 metrelik havuz', p: [
      "Boyu 10 m, eni 5 m olan bir villa havuzunda su derinliği sığ uçta 1,2 m, derin uçta 1,8 m olsun. Yüzey alanı 10 × 5 = 50 m², ortalama derinlik (1,2 + 1,8) ÷ 2 = 1,5 m'dir. Hacim 50 × 1,5 = <strong>75 m³</strong> eder. 1 m³ 1.000 litre olduğundan bu 75.000 litre, ağırlık olarak da yaklaşık 75 ton sudur.",
      "Havuz dakikada 50 litre veren bir hatla doldurulacaksa süre 75.000 ÷ 50 = 1.500 dakika, yani <strong>25 saat</strong> olur. Bahçe hortumlarının debisi şebeke basıncına ve hortum çapına göre çok değişir; kendi debinizi ölçmek için 10 litrelik bir kovanın kaç saniyede dolduğuna bakın. Kova 30 saniyede doluyorsa debiniz dakikada 20 litredir.",
    ] },
    { h: 'Yuvarlak ve oval havuz örnekleri', p: [
      "Çapı 4 m, su derinliği 1,2 m olan yuvarlak bir havuzun yüzey alanı π × 4² ÷ 4 = 12,57 m²'dir. Hacim 12,57 × 1,2 = <strong>15,08 m³</strong>, yani yaklaşık 15.080 litredir. Hazır çelik çerçeveli ve şişme havuzlar çoğunlukla bu biçimdedir.",
      "Uzun ekseni 8 m, kısa ekseni 4 m olan oval bir havuzda alan π × 8 × 4 ÷ 4 = 25,13 m² olur. 1,5 m sabit derinlikle hacim <strong>37,7 m³</strong> çıkar. Aynı dış ölçülerdeki dikdörtgen havuz 48 m³ alırdı; oval biçim köşeleri kestiği için hacim yaklaşık yüzde 21 daha azdır.",
    ] },
    { h: 'Hacmi bilmek neden gerekli?', ul: [
      "<strong>Kimyasal dozajı:</strong> klor, pH düzenleyici ve yosun önleyici gibi ürünlerin miktarı havuzdaki suyun metreküpüne göre belirlenir. Hacim yanlış bilinirse doz eksik ya da fazla olur. Dozaj için ürün etiketindeki talimatları izleyin.",
      "<strong>Pompa ve filtre seçimi:</strong> filtrasyon sistemi, havuz suyunun tamamını belirli bir sürede devrettirecek kapasitede seçilir.",
      "<strong>Su maliyeti:</strong> hacmi su faturanızdaki metreküp birim fiyatıyla çarparak ilk dolum maliyetini kestirebilirsiniz.",
      "<strong>Isıtma:</strong> ısı pompası ya da güneş kolektörü kapasitesi su hacmine ve yüzey alanına bağlıdır.",
      "<strong>Örtü ve liner:</strong> yüzey alanı, havuz örtüsü ve kaplama malzemesi siparişinde kullanılır.",
    ] },
    { h: 'Sık yapılan ölçü hataları', p: [
      "En yaygın hata, havuz duvarının yüksekliğini su derinliği sanmaktır. Su hiçbir zaman en üst kenara kadar doldurulmaz; skimmerli havuzlarda su yüzeyi kenardan 10–15 cm aşağıdadır. Hazır havuzlarda da üretici, duvar yüksekliğinin yaklaşık yüzde 90'ına kadar doldurulmasını önerir. Hesapta gerçek su derinliğini kullanın.",
      "İkinci hata santimetre ile metreyi karıştırmaktır: 120 cm derinlik için 1,2 yazılmalıdır. Üçüncüsü, tabanı düz bir bölümden sonra aniden derinleşen havuzlarda basit ortalamanın yanıltıcı olmasıdır; böyle havuzları sığ bölüm ve derin bölüm olarak iki ayrı parça halinde hesaplayıp toplamak daha doğrudur.",
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      "Araç düzgün geometrili havuzlar için hacim kestirimi yapar. Böbrek, serbest form ya da basamaklı havuzlarda, içeri girintili merdiven ve oturma bölümlerinde gerçek hacim birkaç yüzde farklı olabilir. Suyun ağırlığı çok büyük bir yüktür; teras, çatı ya da balkon gibi bir döşemenin üzerine havuz kurmadan önce taşıyıcı sistemin uygunluğu mutlaka bir inşaat mühendisine onaylatılmalıdır. Sonuçlar bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ['Havuzum kaç ton su alır?', "Hacmi metreküp olarak bulun; her metreküp yaklaşık 1 ton sudur. 8 × 4 m ölçüsünde, ortalama 1,5 m derinliğinde bir havuz 48 m³, yani yaklaşık 48 ton su alır."],
    ['1 metreküp su kaç litredir?', "1 metreküp tam olarak 1.000 litredir. 75 m³'lük bir havuz 75.000 litre su alır."],
    ['Yuvarlak havuzun hacmini nasıl hesaplarım?', "Çapın karesini π ile çarpıp 4'e bölerek yüzey alanını bulun, sonra su derinliğiyle çarpın. Çapı 3,05 m, su derinliği 0,76 m olan bir havuz yaklaşık 5,55 m³, yani 5.553 litre su alır."],
    ['Eğimli tabanlı havuzda derinliği nasıl girmeliyim?', "Sığ uçtaki su derinliğini ilk alana, derin uçtakini ikinci alana yazın. Araç ikisinin ortalamasını alır. Taban düzgün bir eğimle iniyorsa bu yöntem tam sonuç verir."],
    ['Havuz kaç saatte dolar?', "Litre cinsinden hacmi doldurma debisine bölün. 48.000 litrelik bir havuz dakikada 100 litre veren hatla 480 dakikada, yani 8 saatte dolar. Hortumla doldurmada debi çok daha düşük olduğundan süre günleri bulabilir."],
    ['Oval havuz ile dikdörtgen havuz arasındaki hacim farkı nedir?', "Aynı boy, en ve derinlikte oval havuz, dikdörtgen havuzun π ÷ 4 katı, yani yaklaşık yüzde 78,5'i kadar su alır. Köşelerin yuvarlanması hacmi yaklaşık beşte bir azaltır."],
    ['Kimyasal dozunu bu araç hesaplıyor mu?', "Hayır. Araç yalnızca su hacmini verir. Klor ve diğer kimyasalların miktarı ürünün derişimine göre değişir; bulduğunuz metreküp değerini ürün etiketindeki dozaj tablosuyla birlikte kullanın."],
    ['Girdiğim ölçüler kaydediliyor mu?', "Hayır. Hesap tarayıcınızda yapılır; havuz ölçüleriniz sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['su-deposu-hacmi-hesapla', 'tank-doluluk-hesapla', 'hafriyat-hesapla', 'boru-hacmi-hesapla', 'yagmur-suyu-hasadi-hesapla'],
};
