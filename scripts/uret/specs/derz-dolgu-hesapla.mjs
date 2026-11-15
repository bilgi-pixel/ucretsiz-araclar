export default {
  slug: 'derz-dolgu-hesapla',
  title: 'Derz Dolgu Hesaplama',
  h1Tail: 'kg ve torba',
  pageTitle: 'Derz Dolgu Hesaplama – Fayans ve Seramik İçin Kaç Kg Gerekir?',
  description: 'Karo ölçüsü, derz genişliği ve derinliğine göre metrekare başına derz dolgu tüketimini, toplam kilogramı ve torba sayısını fire payıyla hesaplayın.',
  card: 'Karo boyutu, derz genişliği ve derinliğine göre gereken derz dolgu miktarını kilogram ve torba olarak bulun.',
  category: 'insaat',
  keywords: ['derz dolgu hesaplama', 'derz dolgu kaç kg gider', 'm2 derz dolgu tüketimi', 'fayans derz hesabı', 'seramik derz dolgu miktarı', 'derz dolgu sarfiyatı', 'derz genişliği'],
  lead: `Döşeyeceğiniz alanı, karo ölçülerini ve derz boyutlarını yazın; araç <strong>metrekare başına derz dolgu tüketimini</strong>, toplam ihtiyacı ve kaç torba almanız gerektiğini fire payıyla birlikte hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Kaplanacak alan (m²)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'karoEn', label: 'Karo eni (cm)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'karoBoy', label: 'Karo boyu (cm)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'derzGen', label: 'Derz genişliği (mm)', type: 'number', value: '3' },
    { id: 'derzDer', label: 'Derz derinliği (mm)', type: 'number', value: '8', hint: 'Genellikle karo kalınlığı kadardır.' },
    { id: 'yogunluk', label: 'Dolgu yoğunluğu (kg/dm³)', type: 'number', value: '1,6', hint: 'Çimento esaslı dolgularda yaklaşık 1,5–1,8.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'torba', label: 'Torba / kova ağırlığı (kg)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Kaplanacak alan');
    const a = h.pos(v.karoEn, 'Karo eni') * 10; // mm
    const b = h.pos(v.karoBoy, 'Karo boyu') * 10;
    const c = h.pos(v.derzGen, 'Derz genişliği');
    const d = h.pos(v.derzDer, 'Derz derinliği');
    const yog = h.pos(v.yogunluk, 'Dolgu yoğunluğu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    if (c >= a || c >= b) h.err('Derz genişliği karo ölçüsünden küçük olmalı. Karo ölçülerini santimetre, derzi milimetre olarak yazdığınızı kontrol edin.');
    if (yog > 5) h.err('Dolgu yoğunluğu kg/dm³ olarak yazılmalı (örn. 1,6).');
    const birim = ((a + b) / (a * b)) * c * d * yog; // kg/m²
    const net = birim * alan;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / torba - 1e-9);
    return {
      rows: [
        ['Gerekli derz dolgu', h.fmt(toplam, 2) + ' kg'],
        ['Torba sayısı', `${h.fmt(adet, 0)} adet (${h.fmt(torba, 1)} kg)`],
        ['m² başına tüketim', h.fmt(birim, 3) + ' kg/m²'],
        ['Fire hariç miktar', h.fmt(net, 2) + ' kg'],
      ],
      note: 'Tüketim, derz kanalının tamamen dolduğu varsayımıyla hesaplanır. Ürünün gerçek yoğunluğu için ambalajdaki teknik bilgiye bakın.',
    };
  },
  cases: [
    { in: { alan: '20', karoEn: '30', karoBoy: '60', derzGen: '3', derzDer: '8' }, out: { 'Gerekli derz dolgu': '4,22 kg', 'Torba sayısı': '1 adet (5 kg)', 'm² başına tüketim': '0,192 kg/m²', 'Fire hariç miktar': '3,84 kg' } },
    { in: { alan: '50', karoEn: '60', karoBoy: '60', derzGen: '2', derzDer: '10' }, out: { 'Gerekli derz dolgu': '5,87 kg', 'Torba sayısı': '2 adet (5 kg)', 'm² başına tüketim': '0,107 kg/m²' } },
    { in: { alan: '10', karoEn: '10', karoBoy: '10', derzGen: '3', derzDer: '6', fire: '0' }, out: { 'Gerekli derz dolgu': '5,76 kg', 'Torba sayısı': '2 adet (5 kg)', 'm² başına tüketim': '0,576 kg/m²' } },
    { in: { alan: '15', karoEn: '20', karoBoy: '20', derzGen: '5', derzDer: '8' }, out: { 'Gerekli derz dolgu': '10,56 kg', 'Torba sayısı': '3 adet (5 kg)', 'm² başına tüketim': '0,64 kg/m²', 'Fire hariç miktar': '9,6 kg' } },
    { in: { alan: '100', karoEn: '20', karoBoy: '20', derzGen: '5', derzDer: '8', fire: '0', torba: '20' }, out: { 'Gerekli derz dolgu': '64 kg', 'Torba sayısı': '4 adet (20 kg)' } },
    { in: { alan: '25', karoEn: '25', karoBoy: '40', derzGen: '2', derzDer: '7', yogunluk: '2', fire: '0' }, out: { 'm² başına tüketim': '0,182 kg/m²', 'Gerekli derz dolgu': '4,55 kg' } },
    { in: { alan: '20', karoEn: '', karoBoy: '60' }, error: true },
    { in: { alan: '20', karoEn: '0,2', karoBoy: '60', derzGen: '3' }, error: true },
    { in: { alan: '-5', karoEn: '30', karoBoy: '60' }, error: true },
  ],
  howto: [
    `"Kaplanacak alan" alanına fayans ya da seramik döşenecek yüzeyin toplam metrekaresini yazın.`,
    `Karonun enini ve boyunu santimetre olarak girin. 30×60 karo için 30 ve 60, 60×60 için iki alana da 60 yazılır.`,
    `Derz genişliğini ve derinliğini milimetre olarak yazın. Derinliği bilmiyorsanız karo kalınlığını kullanın.`,
    `Yoğunluk, fire payı ve ambalaj ağırlığı alanlarını ürününüze göre düzenleyin ya da hazır değerlerle bırakın.`,
    `"Hesapla" düğmesine basın; toplam kilogram, alınacak torba sayısı ve metrekare tüketimi görüntülenir.`,
  ],
  sections: [
    { h: 'Derz dolgu tüketimi nasıl hesaplanır?', p: [
      `Derz, iki karo arasında bırakılan ve sonradan dolgu malzemesiyle kapatılan boşluktur. Ne kadar dolgu gideceği dört şeye bağlıdır: karoların boyutu, derzin genişliği, derzin derinliği ve dolgunun yoğunluğu. Üreticilerin teknik föylerinde de kullanılan genel formül şudur:`,
      `<strong>Tüketim (kg/m²) = (A + B) ÷ (A × B) × C × D × yoğunluk</strong>. Burada A ve B karonun kenarları, C derz genişliği, D derz derinliğidir ve hepsi milimetre cinsindendir; yoğunluk kg/dm³ olarak alınır. Formüldeki (A + B) ÷ (A × B) ifadesi, bir metrekaredeki toplam derz uzunluğunu verir; küçük karoda derz çizgisi çok, büyük karoda azdır.`,
    ] },
    { h: 'Çözümlü örnek: 20 m² banyo, 30×60 karo', p: [
      `Karo ölçüleri milimetreye çevrilir: A = 300, B = 600. Derz 3 mm genişliğinde ve 8 mm derinliğinde, dolgu yoğunluğu 1,6 kg/dm³ olsun. (300 + 600) ÷ (300 × 600) = 0,005 bulunur. Bu değer 3 × 8 × 1,6 = 38,4 ile çarpıldığında metrekare tüketimi <strong>0,192 kg/m²</strong> çıkar.`,
      `20 m² için net ihtiyaç 0,192 × 20 = 3,84 kg'dır. Yüzde 10 fire eklenince 4,22 kg eder; 5 kilogramlık tek ambalaj yeterlidir. Aynı alan 10×10 cm karoyla ve 6 mm derinlikte kaplansaydı metrekare tüketimi 0,576 kg'a, yani üç katına çıkardı.`,
    ] },
    { h: 'Derz genişliği nasıl seçilir?', p: [
      `Derz genişliği hem görünümü hem dolgu miktarını doğrudan etkiler; genişlik iki katına çıkarsa tüketim de iki katına çıkar. Seçimi karo tipi, kenar işlemi ve uygulama yeri belirler. Aşağıdaki aralıklar uygulamada sık görülen genel değerlerdir; karo üreticisinin önerisi her zaman önceliklidir.`,
    ], ul: [
      `<strong>1,5–2 mm:</strong> rektifiyeli (kenarları taşlanmış) porselen ve büyük ebatlı karolar.`,
      `<strong>2–3 mm:</strong> duvar fayansları ve standart seramikler.`,
      `<strong>3–5 mm:</strong> yer karoları, rektifiyesiz ürünler ve dış mekân döşemeleri.`,
      `<strong>5 mm ve üzeri:</strong> rustik karolar, doğal taş ve klinker kaplamalar.`,
    ] },
    { h: 'Derz derinliği ve yoğunluk hakkında', p: [
      `Derz derinliği çoğu zaman karo kalınlığına eşit kabul edilir. Duvar fayanslarında bu 6–8 mm, yer seramiklerinde 8–10 mm, kalın porselen ve dış mekân karolarında 20 mm'ye kadar çıkabilir. Uygulama sırasında yapıştırıcı derz aralarına taşmışsa derz kanalı sığlaşır ve tüketim azalır; bu yüzden derzlerin dolgudan önce temizlenmesi önerilir.`,
      `Çimento esaslı derz dolguların karışmış haldeki yoğunluğu kabaca 1,5–1,8 kg/dm³ arasındadır; araç 1,6 değerini varsayar. Epoksi esaslı dolgular ve hazır macun tipi ürünler farklı yoğunlukta olabilir. Kullanacağınız ürünün teknik bilgi föyündeki değeri yazarsanız sonuç daha isabetli olur.`,
    ] },
    { h: 'Hızlı başvuru: metrekare tüketimleri', p: [
      `Aşağıdaki değerler 1,6 kg/dm³ yoğunluk için bu araçla hesaplanmıştır ve fire içermez.`,
    ], ul: [
      `10×10 cm karo, 3 mm derz, 6 mm derinlik: <strong>0,576 kg/m²</strong>`,
      `20×20 cm karo, 5 mm derz, 8 mm derinlik: <strong>0,64 kg/m²</strong>`,
      `30×60 cm karo, 3 mm derz, 8 mm derinlik: <strong>0,192 kg/m²</strong>`,
      `60×60 cm karo, 2 mm derz, 10 mm derinlik: <strong>0,107 kg/m²</strong>`,
    ] },
    { h: 'Sık yapılan hatalar ve ipuçları', ul: [
      `Karo ölçüsünü milimetre, derzi santimetre yazmak: araçta karo santimetre, derz milimetre girilir. Sonuç beklediğinizden çok farklıysa önce birimleri kontrol edin.`,
      `Fire payını sıfır bırakmak: karıştırma kabında kalan, yüzeyden silinen ve kuruyan malzeme için yüzde 10 civarı pay ayırmak gerçekçidir.`,
      `Renkli derzde eksik almak: sonradan alınan farklı üretim partisinde ton farkı olabilir; ihtiyacı tek seferde ve biraz fazlasıyla almak güvenlidir.`,
      `Mozaik karoları tek parça gibi girmek: fileli mozaiklerde her küçük taşın ölçüsünü yazmalısınız, tabakanın ölçüsünü değil.`,
    ] },
    { h: 'Sınırlar', p: [
      `Hesap, dikdörtgen ya da kare karoların düzgün bir ızgara oluşturduğunu ve derz kanalının tamamen dolduğunu varsayar. Altıgen, balıksırtı ya da karışık ebatlı döşemelerde gerçek tüketim biraz farklı çıkabilir. Sonuç malzeme keşfi için yaklaşık bir değerdir; nihai miktar için ürün ambalajındaki sarfiyat tablosunu ve uygulayıcınızın görüşünü de dikkate alın.`,
    ] },
  ],
  faq: [
    ['1 m² için kaç kilogram derz dolgu gider?', `Karo boyutuna ve derz ölçülerine göre büyük fark eder. 60×60 karo ve 2 mm derzde yaklaşık 0,1 kg/m², 30×60 karo ve 3 mm derzde 0,2 kg/m² civarı, 10×10 karo ve 3 mm derzde ise 0,5 kg/m²'nin üzerinde tüketim olur. Kesin değer için ölçülerinizi araca yazın.`],
    ['Karo küçüldükçe tüketim neden artıyor?', `Çünkü aynı alana daha çok karo sığar ve aralarındaki toplam derz uzunluğu artar. Bir metrekarede 60×60 karodan yaklaşık üç adet, 10×10 karodan yüz adet bulunur; derz çizgisi de buna göre çoğalır.`],
    ['Derz derinliğini nasıl öğrenirim?', `En pratik yol karo kalınlığını kullanmaktır; bu değer kutunun üzerinde yazar ya da bir kumpasla ölçülebilir. Yapıştırıcı derz arasına taşmamışsa derz kanalı yaklaşık karo kalınlığı kadardır.`],
    ['Yüzde kaç fire eklemeliyim?', `Düz ve geniş yüzeylerde yüzde 5–10 çoğunlukla yeterlidir. Çok küçük alanlarda, dokulu yüzeyli karolarda ya da ilk kez uygulama yapıyorsanız yüzde 15'e kadar çıkmak daha rahat olur.`],
    ['Epoksi derz dolgu için de kullanılabilir mi?', `Evet, formül aynıdır; yalnızca yoğunluk alanına kullandığınız epoksi ürünün teknik föyündeki yoğunluk değerini yazmalısınız. Epoksi ürünler genellikle kova ambalajda satıldığı için ambalaj ağırlığını da buna göre değiştirin.`],
    ['Farklı ebatlarda iki karo kullanıyorum, nasıl hesaplarım?', `Her karo tipinin kapladığı alanı ayrı ayrı hesaplayın ve sonuçları toplayın. Örneğin duvarlar ile zemini iki ayrı hesap olarak girip kilogramları toplayabilirsiniz.`],
    ['Torba sayısı neden yukarı yuvarlanıyor?', `Derz dolgu ambalajla satıldığı için 4,22 kg ihtiyaç 5 kilogramlık bir torbayla, 5,87 kg ihtiyaç ise iki torbayla karşılanır. Araç her zaman ihtiyacı karşılayan en küçük tam ambalaj sayısını gösterir.`],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', `Hayır. Tüm hesap tarayıcınızda yapılır; alan ve karo bilgileriniz sunucuya iletilmez, kaydedilmez. Sayfa yüklendikten sonra çevrimdışı da çalışır.`],
  ],
  related: ['fayans-yapistirici-hesapla', 'boya-fayans-hesapla', 'metrekare-hesapla', 'sap-hesapla', 'supurgelik-hesapla'],
};
