export default {
  slug: 'sayi-ayikla',
  title: 'Metinden Sayı Ayıklama',
  h1Tail: 'metindeki sayıları listele ve topla',
  pageTitle: 'Metinden Sayı Ayıklama – Metindeki Sayıları Bulma ve Toplama',
  description: 'Metnin içindeki sayıları bulup liste halinde çıkarın; adet, toplam, ortalama, en küçük ve en büyük değeri görün. Türkçe ondalık virgül desteklenir.',
  card: 'Metindeki sayıları ayıklayın; adedini, toplamını, ortalamasını, en küçük ve en büyük değerini görün.',
  category: 'metin',
  keywords: ['metinden sayı ayıklama', 'metindeki sayıları bulma', 'sayıları ayırma', 'metindeki rakamları toplama', 'yazıdan sayı çıkarma', 'sayı ayıklayıcı', 'metindeki sayıların toplamı', 'rakamları ayıklama'],
  lead: `Fatura dökümü, mesaj, rapor ya da herhangi bir yazıyı yapıştırın; araç içindeki <strong>sayıları</strong> bulup alt alta listelesin. Bulunan sayıların adedi, toplamı, ortalaması, en küçüğü ve en büyüğü de birlikte hesaplanır. Ondalık virgül ve binlik nokta kullanan Türkçe yazım varsayılandır.`,
  button: 'Ayıkla',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'İçinde sayılar geçen metni buraya yapıştırın' },
    { id: 'bicim', label: 'Sayı yazım biçimi', type: 'select', options: [['tr', 'Türkçe: ondalık virgül, binlik nokta (1.234,56)'], ['en', 'İngilizce: ondalık nokta, binlik virgül (1,234.56)'], ['tam', 'Yalnızca rakam grupları (her rakam dizisi ayrı sayı)']] },
    { id: 'negatif', label: 'Eksi işareti', type: 'select', options: [['tani', 'Negatif sayı olarak tanı'], ['yoksay', 'Yok say']] },
    { id: 'ayrac', label: 'Çıktı biçimi', type: 'select', options: [['satir', 'Her satıra bir sayı'], ['bosluk', 'Boşlukla ayrılmış'], ['noktalivirgul', 'Noktalı virgülle ayrılmış']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına içinde sayı geçen metni yapıştırın.');
    const re = v.bicim === 'en' ? /(?<!\d)(?:\d{1,3}(?:,\d{3})+(?!\d)|\d+)(?:\.\d+)?(?!\d)/g
      : v.bicim === 'tam' ? /\d+/g
      : /(?<!\d)(?:\d{1,3}(?:\.\d{3})+(?!\d)|\d+)(?:,\d+)?(?!\d)/g;
    const yazilar = [], degerler = [];
    for (const m of ham.matchAll(re)) {
      let yazi = m[0];
      let deger = v.bicim === 'en' ? Number(yazi.replace(/,/g, ''))
        : v.bicim === 'tam' ? Number(yazi)
        : Number(yazi.replace(/\./g, '').replace(',', '.'));
      if (!Number.isFinite(deger)) h.err('Metindeki sayılardan biri hesaplanamayacak kadar uzun. Çok uzun rakam dizilerini çıkarıp yeniden deneyin.');
      if (v.negatif !== 'yoksay' && m.index > 0) {
        const once = ham[m.index - 1];
        const dahaOnce = m.index > 1 ? ham[m.index - 2] : ' ';
        if ((once === '-' || once === '−') && !/[\p{L}\p{N})\]]/u.test(dahaOnce)) { yazi = '-' + yazi; deger = -deger; }
      }
      yazilar.push(yazi); degerler.push(deger);
    }
    if (!yazilar.length) h.err('Metinde sayı bulunamadı. Sayıların rakamla yazıldığından emin olun.');
    const toplam = degerler.reduce((a, b) => a + b, 0);
    const ayr = v.ayrac === 'bosluk' ? ' ' : v.ayrac === 'noktalivirgul' ? '; ' : '\n';
    return {
      rows: [
        ['Bulunan sayı adedi', String(yazilar.length)],
        ['Toplam', h.fmt(toplam, 6)],
        ['Ortalama', h.fmt(toplam / degerler.length, 6)],
        ['En küçük', h.fmt(Math.min(...degerler), 6)],
        ['En büyük', h.fmt(Math.max(...degerler), 6)],
      ],
      text: yazilar.join(ayr),
      note: 'Listede sayılar metinde yazıldıkları biçimde gösterilir; toplam ve ortalama Türkçe biçimde, en fazla altı ondalık basamakla verilir.',
    };
  },
  cases: [
    { in: { metin: 'Sepette 3 ürün var: 2 kalem 12,50 TL, 1 defter 45 TL.' }, out: { 'Bulunan sayı adedi': '5', 'Toplam': '63,5', 'Ortalama': '12,7', 'En küçük': '1', 'En büyük': '45' }, text: '3\n2\n12,50\n1\n45' },
    { in: { metin: 'Toplam 1.234.567,89 TL; indirim 1.500 TL' }, out: { 'Bulunan sayı adedi': '2', 'Toplam': '1.236.067,89', 'En küçük': '1.500' }, text: '1.234.567,89\n1.500' },
    { in: { metin: 'Price 1,299.99 USD, tax 104.5', bicim: 'en' }, out: { 'Bulunan sayı adedi': '2', 'Toplam': '1.404,49', 'En küçük': '104,5', 'En büyük': '1.299,99' }, text: '1,299.99\n104.5' },
    { in: { metin: 'Sıcaklık -5 derece, dün 3 dereceydi; 2020-2024 arası.' }, out: { 'Bulunan sayı adedi': '4', 'Toplam': '4.042', 'En küçük': '-5', 'En büyük': '2.024' }, text: '-5\n3\n2020\n2024' },
    { in: { metin: 'Sıcaklık -5 derece, dün 3 dereceydi.', negatif: 'yoksay' }, out: { 'Toplam': '8', 'En küçük': '3' }, text: '5\n3' },
    { in: { metin: 'Tel: 0412 555 12 34, tarih 15.03.2026', bicim: 'tam', ayrac: 'bosluk' }, out: { 'Bulunan sayı adedi': '7', 'Toplam': '3.057' }, text: '0412 555 12 34 15 03 2026' },
    { in: { metin: '15.03.2026 tarihinde 3,5 kg alındı' }, out: { 'Bulunan sayı adedi': '4', 'Toplam': '2.047,5' }, text: '15\n03\n2026\n3,5' },
    { in: { metin: 'Bu metinde hiç rakam yok.' }, error: true },
    { in: { metin: '   ' }, error: true },
  ],
  howto: [
    `İçinde sayılar geçen metni "Metin" kutusuna yapıştırın.`,
    `Metindeki sayıların yazım biçimini seçin. Türkçe belgelerde ondalık ayracı virgüldür; İngilizce kaynaklı metinlerde noktadır.`,
    `Eksi işaretli sayıların negatif olarak alınmasını isteyip istemediğinizi belirleyin.`,
    `Çıktının alt alta mı, boşlukla mı yoksa noktalı virgülle mi ayrılacağını seçin.`,
    `"Ayıkla" düğmesine basın. Sayılar alttaki kutuda listelenir; adet, toplam, ortalama, en küçük ve en büyük değer üstteki satırlarda görünür.`,
  ],
  sections: [
    { h: 'Metinden sayı ayıklamak ne işe yarar?', p: [
      `Sayılar çoğu zaman yazının içine gömülü gelir: bir mesajda sayılan harcamalar, bir e-postadaki sipariş adetleri, bir rapor paragrafındaki ölçümler ya da kopyalanmış bir hesap dökümündeki tutarlar. Bunları hesap makinesine ya da tabloya aktarmak için önce yazıdan ayırmak gerekir. Araç bu ayırma işini yapar ve çoğu durumda asıl istenen şeyi, yani toplamı ve ortalamayı da aynı anda verir.`,
      `Örneğin arkadaşınızın mesajla gönderdiği alışveriş listesindeki fiyatları toplamak, bir tutanakta geçen ölçüm değerlerinin en büyüğünü bulmak ya da karışık bir metindeki sipariş numaralarını temiz bir sütuna dönüştürmek birkaç saniyelik iştir.`,
    ] },
    { h: 'Sayı yazım biçimi neden önemli?', p: [
      `Aynı rakamlar farklı ülkelerde farklı okunur. Türkiye'de ve Avrupa'nın büyük bölümünde ondalık ayracı virgül, binlik ayracı noktadır: <strong>1.234,56</strong> bin iki yüz otuz dört tam yüzde elli altı demektir. İngilizce konuşulan ülkelerde tam tersidir: aynı sayı <strong>1,234.56</strong> biçiminde yazılır. Bir metni yanlış biçimle okumak, tutarı bin kat büyütebilir ya da küçültebilir.`,
      `Bu yüzden araç tahmin yürütmez, biçimi size sorar. Türkçe biçimde "1.500" bin beş yüz olarak, İngilizce biçimde "1,500" yine bin beş yüz olarak okunur. Nokta ya da virgülden sonra tam üç rakam gelmiyorsa o işaret binlik ayracı sayılmaz; Türkçe biçimde "10.5" yazımı 10 ve 5 olmak üzere iki ayrı sayı olarak alınır. Metninizde ondalık ayracı nokta ise İngilizce biçimi seçmelisiniz.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `"Sepette 3 ürün var: 2 kalem 12,50 TL, 1 defter 45 TL." cümlesini Türkçe biçimle işleyelim. Araç soldan sağa beş sayı bulur: 3, 2, 12,50, 1 ve 45. Virgülden sonra rakam geldiği için 12,50 tek bir ondalıklı sayı olarak okunur; "TL," ifadesindeki virgül ise bir rakamın ardından gelmediğinden hiçbir sayıya katılmaz.`,
      `Toplam 3 + 2 + 12,5 + 1 + 45 = <strong>63,5</strong> eder. Ortalama 63,5 ÷ 5 = <strong>12,7</strong>, en küçük değer 1, en büyük değer 45 çıkar. Bu örnek önemli bir noktayı da gösterir: araç sayıların ne anlama geldiğini bilmez. Ürün adedi olan 3, 2 ve 1 de fiyatlarla birlikte toplanmıştır. Yalnızca fiyatları toplamak istiyorsanız adetleri metinden çıkarmanız ya da listeden ilgili satırları silip toplamı yeniden almanız gerekir.`,
    ] },
    { h: 'Eksi işareti ve tire ayrımı', p: [
      `Kısa çizgi hem eksi işareti hem de tire olarak kullanılır. "-5 derece" ifadesinde eksi işaretidir; "2020-2024 arası" ifadesinde ise iki yılı birbirine bağlayan tiredir. Araç ayrımı şöyle yapar: çizgi bir rakamın hemen önündeyse ve çizgiden önce bir harf, rakam ya da kapanış parantezi yoksa sayı negatif kabul edilir. Böylece "2020-2024" yazımı 2020 ve 2024 olarak, "-5" yazımı eksi beş olarak okunur.`,
      `Madde işareti olarak satır başına konmuş tireler bu kurala göre eksi sayılabilir: "- 5 adet" yazımında çizgi ile rakam arasında boşluk olduğu için sorun çıkmaz, ama "-5 adet" yazımı negatif okunur. Böyle listelerde "Yok say" seçeneğini kullanın.`,
    ] },
    { h: 'Tarihler, telefonlar ve kodlar', p: [
      `Metindeki her rakam dizisi bir ölçüm ya da tutar değildir. Tarihler, telefon numaraları, posta kodları, plaka ve fatura numaraları da rakamlardan oluşur ve araç bunları da sayı olarak toplar. "15.03.2026" tarihi Türkçe biçimde 15, 03 ve 2026 olarak üç ayrı sayıya ayrılır, çünkü noktalardan sonra tam üç rakam gelmemektedir. Telefon numaraları boşluklardan bölünerek birkaç parçaya ayrılır.`,
      `Toplam ve ortalama anlamlı olsun istiyorsanız bu tür bölümleri metinden önceden çıkarın. Amacınız tam tersine kodları ve numaraları toplamaksa "Yalnızca rakam grupları" biçimi daha uygundur: nokta ve virgülü hiç yorumlamaz, kesintisiz her rakam dizisini ayrı bir öğe olarak verir. Baştaki sıfırlar listede korunur; "0412" listede yazıldığı gibi görünür, hesapta ise 412 olarak işlem görür.`,
    ] },
    { h: 'Sınırlar', ul: [
      `Yazıyla yazılmış sayılar ("üç", "yirmi beş") ve Roma rakamları tanınmaz; yalnızca rakamla yazılanlar bulunur.`,
      `Yüzde işareti, para birimi ve ölçü birimi sayıya eklenmez; "%18" yazımından 18, "45 TL" yazımından 45 alınır.`,
      `Kesirler ("3/4") ve üslü ya da bilimsel gösterimler ("2e5") tek sayı olarak değil, içerdikleri rakam grupları olarak okunur.`,
      `Virgülle ayrılmış tam sayı listeleri ("1,2,3") Türkçe biçimde ondalıklı sayı gibi yorumlanabilir; böyle listelerde "Yalnızca rakam grupları" biçimini seçin.`,
      `On beş basamaktan uzun sayılarda toplam, kayan noktalı hesabın doğası gereği son basamaklarda yuvarlanır. Sonuç bilgilendirme amaçlıdır; mali kayıtlar için kendi muhasebe kayıtlarınızı esas alın.`,
    ] },
  ],
  faq: [
    [`Ondalıklı sayıları tanıyor mu?`, `Evet. Türkçe biçimde virgülle (12,5), İngilizce biçimde noktayla (12.5) yazılmış ondalıklı sayılar tek sayı olarak alınır. Doğru sonuç için metne uygun yazım biçimini seçmeniz gerekir.`],
    [`Binlik ayraçlı sayılar nasıl okunur?`, `Ayraçtan sonra tam üç rakam geliyorsa binlik ayracı kabul edilir. Türkçe biçimde 1.234.567,89 tek bir sayıdır; İngilizce biçimde aynı sayı 1,234,567.89 olarak yazılmış olmalıdır.`],
    [`Negatif sayılar ayıklanıyor mu?`, `Evet. Rakamın hemen önünde eksi işareti varsa ve işaretten önce harf ya da rakam yoksa sayı negatif alınır. İki yılı ayıran tire gibi durumlar eksi sayılmaz. İsterseniz eksi işaretini tümüyle yok sayabilirsiniz.`],
    [`Bulunan sayıların toplamını da veriyor mu?`, `Evet. Sonuç satırlarında bulunan sayıların adedi, toplamı, ortalaması, en küçük ve en büyük değeri gösterilir.`],
    [`Tarih ve telefon numaraları da sayı olarak alınıyor mu?`, `Evet, araç rakamların anlamını ayırt edemez. Tarihler gün, ay ve yıl olarak; telefon numaraları boşluklarla ayrılmış parçalar olarak listeye girer. Toplamı etkilememesi için bu bölümleri metinden çıkarabilirsiniz.`],
    [`Yazıyla yazılmış sayıları bulur mu?`, `Hayır. "Beş" ya da "yüz elli" gibi yazıyla ifade edilmiş sayılar tanınmaz; yalnızca rakamlar ayıklanır.`],
    [`Sayıları hesap tablosuna nasıl aktarırım?`, `Çıktı biçimini "Her satıra bir sayı" bırakın, sonucu kopyalayıp bir sütunun ilk hücresine yapıştırın. Her sayı ayrı satıra yerleşir.`],
    [`Metnim sunucuya gönderiliyor mu?`, `Hayır. Ayıklama ve hesaplama tarayıcınızda yapılır; yapıştırdığınız metin hiçbir yere iletilmez ve saklanmaz.`],
  ],
  related: ['rakamlari-sil', 'e-posta-ayikla', 'url-ayikla', 'sayi-bicimlendir', 'sutun-ayikla', 'ortalama-hesapla'],
};
