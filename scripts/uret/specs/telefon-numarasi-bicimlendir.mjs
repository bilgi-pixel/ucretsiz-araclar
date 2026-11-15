export default {
  slug: 'telefon-numarasi-bicimlendir',
  title: 'Telefon Numarası Biçimlendirme',
  h1Tail: 'Türkiye numaraları için +90 ve 0 ile yazım',
  pageTitle: 'Telefon Numarası Biçimlendirme – +90 Uluslararası ve Ulusal Yazım',
  description: 'Dağınık yazılmış Türkiye telefon numarasını düzenli biçime çevirin: +90 uluslararası, 0 ile ulusal, E.164 ve tel: bağlantısı. Cep ya da sabit hat olduğunu gösterir.',
  card: 'Türkiye telefon numarasını +90 uluslararası, 0 ile ulusal, E.164 ve tel: bağlantısı biçimlerine çevirin.',
  category: 'metin',
  keywords: ['telefon numarası biçimlendirme', 'telefon numarası nasıl yazılır', '+90 telefon formatı', 'e.164 telefon', 'uluslararası telefon yazımı', 'cep telefonu numarası formatı', 'telefon numarası düzenleme'],
  lead: 'Boşluklu, tireli, parantezli ya da başında 0 veya +90 olan bir Türkiye telefon numarasını yazın; araç numarayı ayıklayıp <strong>uluslararası</strong>, <strong>ulusal</strong>, <strong>E.164</strong> ve <strong>tel: bağlantısı</strong> biçimlerinde düzenli olarak versin.',
  button: 'Biçimlendir',
  inputs: [
    { id: 'numara', label: 'Telefon numarası', type: 'text', placeholder: 'Örn. 0532 123 45 67', hint: 'Başında 0, 90, +90 ya da 0090 olabilir; boşluk, tire, nokta ve parantez yok sayılır.' },
    { id: 'bicim', label: 'Ana sonuç biçimi', type: 'select', options: [['ulus', 'Uluslararası: +90 5XX XXX XX XX'], ['ulusal', 'Ulusal: 0 (5XX) XXX XX XX'], ['bosluk', 'Ulusal sade: 05XX XXX XX XX'], ['e164', 'E.164: +905XXXXXXXXX']] },
  ],
  compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (ham === '') h.err('"Telefon numarası" alanına bir numara yazın (örn. 0532 123 45 67).');
    if (/[^\d\s+().\-/]/.test(ham)) h.err('Numarada yalnızca rakam, boşluk, tire, nokta, parantez ve baştaki + işareti bulunabilir.');
    if (ham.indexOf('+') > 0 || (ham.match(/\+/g) || []).length > 1) h.err('+ işareti yalnızca numaranın en başında bulunabilir.');
    const arti = ham.startsWith('+');
    let d = ham.replace(/\D/g, '');
    if (arti) {
      if (!d.startsWith('90')) h.err('Bu araç yalnızca Türkiye (+90) numaralarını biçimlendirir.');
      d = d.slice(2);
    } else if (d.startsWith('0090')) d = d.slice(4);
    else if (d.length === 12 && d.startsWith('90')) d = d.slice(2);
    else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    if (d.length !== 10) h.err(`Numara, alan kodu dahil 10 haneli olmalı (şu an ${d.length} hane). Alan kodunu ya da operatör kodunu eksiksiz yazın.`);
    if (d[0] === '0' || d[0] === '1') h.err('Alan kodu 0 ya da 1 ile başlayamaz. Numarayı kontrol edin.');
    const a = d.slice(0, 3), b = d.slice(3, 6), c = d.slice(6, 8), e = d.slice(8, 10);
    const tur = d[0] === '5' ? 'Cep telefonu (5XX)' : (d[0] === '2' || d[0] === '3' || d[0] === '4') ? 'Sabit hat (coğrafi alan kodu)' : d[0] === '8' ? 'Özel hizmet numarası (8XX)' : 'Diğer numara grubu';
    const ulus = `+90 ${a} ${b} ${c} ${e}`;
    const ulusal = `0 (${a}) ${b} ${c} ${e}`;
    const bosluk = `0${a} ${b} ${c} ${e}`;
    const e164 = `+90${d}`;
    const ana = v.bicim === 'ulusal' ? ulusal : v.bicim === 'bosluk' ? bosluk : v.bicim === 'e164' ? e164 : ulus;
    return {
      rows: [
        ['Biçimlendirilmiş numara', ana],
        ['Uluslararası', ulus],
        ['Ulusal', ulusal],
        ['Ulusal sade', bosluk],
        ['E.164', e164],
        ['tel: bağlantısı', `tel:${e164}`],
        ['Alan / operatör kodu', a],
        ['Numara türü', tur],
      ],
      note: 'Araç yalnızca yazımı düzenler; numaranın kullanımda olup olmadığını ya da kime ait olduğunu denetlemez.',
    };
  },
  cases: [
    { in: { numara: '0532 123 45 67', bicim: 'ulus' }, out: { 'Biçimlendirilmiş numara': '+90 532 123 45 67', 'E.164': '+905321234567', 'Numara türü': 'Cep telefonu (5XX)' } },
    { in: { numara: '+90 (212) 555-12-34', bicim: 'ulusal' }, out: { 'Biçimlendirilmiş numara': '0 (212) 555 12 34', 'tel: bağlantısı': 'tel:+902125551234', 'Numara türü': 'Sabit hat (coğrafi alan kodu)' } },
    { in: { numara: '5321234567', bicim: 'bosluk' }, out: { 'Biçimlendirilmiş numara': '0532 123 45 67', 'Alan / operatör kodu': '532' } },
    { in: { numara: '00905321234567', bicim: 'e164' }, out: { 'Biçimlendirilmiş numara': '+905321234567', 'Ulusal': '0 (532) 123 45 67' } },
    { in: { numara: '905321234567' }, out: { 'Uluslararası': '+90 532 123 45 67' } },
    { in: { numara: '0850.123.45.67' }, out: { 'Uluslararası': '+90 850 123 45 67', 'Numara türü': 'Özel hizmet numarası (8XX)' } },
    { in: { numara: '532 123 45' }, error: true },
    { in: { numara: '+44 20 7946 0958' }, error: true },
    { in: { numara: 'beş yüz otuz iki' }, error: true },
    { in: { numara: '' }, error: true },
  ],
  howto: [
    'Numarayı elinizde nasıl duruyorsa öyle yazın ya da yapıştırın: "0532-123 45 67", "(0212) 555 12 34" ya da "+905321234567" gibi.',
    '"Ana sonuç biçimi" listesinden en çok ihtiyaç duyduğunuz yazımı seçin; diğer biçimler de alt satırlarda ayrıca gösterilir.',
    '"Biçimlendir" düğmesine basın. Araç rakam dışındaki ayraçları atar, ülke kodunu ve baştaki sıfırı ayıklar, numarayı 3-3-2-2 gruplarına böler.',
    'İhtiyacınız olan satırı kopyalayıp kartvizite, e-posta imzasına, web sayfasına ya da müşteri kaydına yapıştırın.',
  ],
  sections: [
    { h: 'Türkiye telefon numarasının yapısı', p: [
      'Türkiye\'de bir telefon numarası, ülke kodu ve baştaki sıfır hariç <strong>10 haneden</strong> oluşur. İlk üç hane sabit hatlarda coğrafi alan kodunu (örneğin 212, 312, 232, 412), cep telefonlarında ise operatöre ayrılmış 5 ile başlayan kodu gösterir. Kalan yedi hane abone numarasıdır. Yurt içinden ararken numaranın başına şehirlerarası erişim kodu olan 0 eklenir; yurt dışından ararken bu sıfır atılır ve yerine Türkiye\'nin ülke kodu olan 90 yazılır.',
      'Yani aynı hat üç ayrı görünüşte karşınıza çıkabilir: 532 123 45 67, 0532 123 45 67 ve +90 532 123 45 67. Üçü de aynı numaradır; fark yalnızca hangi önekin yazıldığıdır. Bu araç hangisini yazarsanız yazın önce yalın 10 haneyi bulur, sonra istediğiniz biçime sokar.',
    ] },
    { h: 'Hangi biçim nerede kullanılır?', ul: [
      '<strong>Uluslararası (+90 532 123 45 67):</strong> kartvizit, e-posta imzası, web sitesi iletişim sayfası ve yurt dışıyla yazışmalarda en güvenli yazımdır; dünyanın her yerinden olduğu gibi aranabilir.',
      '<strong>Ulusal (0 (532) 123 45 67):</strong> yalnızca Türkiye içinde kullanılacak ilan, tabela, fatura ve broşürlerde alışılmış biçimdir. Parantez, alan kodunu abone numarasından ayırır.',
      '<strong>Ulusal sade (0532 123 45 67):</strong> mesajlaşmada ve formlarda en sık görülen yazımdır.',
      '<strong>E.164 (+905321234567):</strong> boşluksuz, artı işaretiyle başlayan makine biçimidir. SMS servisleri, mesajlaşma uygulamalarının iş arayüzleri, çağrı merkezi yazılımları ve müşteri veritabanları numarayı genellikle böyle ister.',
      '<strong>tel: bağlantısı:</strong> bir web sayfasındaki numaraya dokunulduğunda telefonun arama ekranını açan bağlantı adresidir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir müşteri formuna "0532-123 45 67" yazılmış olsun. Araç önce tire ve boşlukları atar: 05321234567. Bu 11 hanelidir ve 0 ile başlar; baştaki sıfır şehirlerarası erişim kodu olduğu için ayrılır ve geriye 5321234567 kalır. İlk üç hane (532) operatör kodu, sonraki gruplar 123, 45 ve 67\'dir. Sonuç: uluslararası yazım <strong>+90 532 123 45 67</strong>, ulusal yazım 0 (532) 123 45 67, E.164 karşılığı +905321234567 ve bağlantı adresi tel:+905321234567 olur. İlk hane 5 olduğu için numara türü cep telefonu olarak gösterilir.',
      'İkinci örnek: "+90 (212) 555-12-34". Artı işareti numaranın uluslararası yazıldığını bildirir; ardından gelen 90 ülke kodu olarak ayrılır ve 2125551234 kalır. İlk hane 2 olduğundan bu bir sabit hattır; ulusal yazımı 0 (212) 555 12 34 şeklindedir.',
    ] },
    { h: 'Sık yapılan yazım hataları', ul: [
      'Uluslararası yazımda sıfırı bırakmak: "+90 0532 …" yanlıştır. Ülke kodu yazıldığında baştaki 0 atılır.',
      'Artı yerine çift sıfır kullanmak: "0090" Türkiye\'den ve birçok ülkeden çalışır, ancak her ülkenin uluslararası çıkış kodu aynı değildir. Artı işareti her yerde geçerlidir.',
      'Rakamları rastgele gruplamak: "0532 12 34 567" gibi yazımlar okumayı ve doğrulamayı zorlaştırır. Yaygın gruplama 3-3-2-2 düzenidir.',
      'Numarayı tabloya sayı olarak girmek: hesap tablosu programları baştaki sıfırı ve artı işaretini silebilir. Hücreyi metin biçimine alın ya da E.164 biçimini metin olarak yapıştırın.',
      'Alan kodunu eksik yazmak: yedi haneli abone numarası tek başına yeterli değildir; araç bu durumda eksik hane uyarısı verir.',
    ] },
    { h: 'Web sayfasında tıklanabilir numara', p: [
      'Mobil ziyaretçilerin tek dokunuşla arayabilmesi için numara bir bağlantının adresine <code>tel:+905321234567</code> biçiminde, ekranda görünen kısmına ise okunaklı yazımla (örneğin 0532 123 45 67) konur. Bağlantı adresinde boşluk ve parantez kullanılmaması, numaranın artı işareti ve ülke koduyla yazılması önerilir; böylece yurt dışından sitenize giren biri de doğrudan arayabilir. Sonuçtaki "tel: bağlantısı" satırı bu adresi hazır verir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç yalnızca Türkiye numaraları için tasarlanmıştır; başka bir ülke koduyla başlayan numaralarda hata verir. 444 ile başlayan yedi haneli çağrı merkezi numaraları ile üç haneli acil ve kısa numaralar alan kodu taşımadığı için kapsam dışındadır. Numara türü yalnızca ilk haneye bakılarak tahmin edilir: 5 cep telefonunu, 2, 3 ve 4 coğrafi sabit hatları, 8 ise özel hizmet numaralarını gösterir. Numaranın hangi operatörde olduğu numara taşıma nedeniyle koddan anlaşılamaz; araç böyle bir bilgi vermez.',
    ] },
  ],
  faq: [
    ['Telefon numarası uluslararası biçimde nasıl yazılır?', 'Artı işareti, ülke kodu ve baştaki sıfır olmadan numara yazılır: +90 532 123 45 67. Okunabilirlik için gruplar arasında boşluk bırakılır; tire ya da nokta kullanmak gerekmez.'],
    ['+90 yazınca baştaki 0 neden atılıyor?', 'Baştaki 0 numaranın parçası değil, Türkiye içinde şehirlerarası ya da operatörler arası arama yapmak için kullanılan erişim kodudur. Yurt dışından arayan kişi bu kodu çevirmez; ülke kodundan sonra doğrudan alan kodu gelir.'],
    ['E.164 biçimi nedir?', 'Telefon numaralarının uluslararası standart yazımıdır: artı işareti, ülke kodu ve numara, arada hiçbir boşluk ya da işaret olmadan yazılır ve en fazla 15 rakam içerir. Türkiye numaraları bu biçimde +90 ve 10 hane olmak üzere toplam 12 rakamdır.'],
    ['Numaranın cep mi sabit hat mı olduğunu nasıl anlarım?', 'Ülke kodu ve sıfırdan sonraki ilk haneye bakılır. 5 ile başlayan numaralar cep telefonu, 2, 3 ve 4 ile başlayanlar coğrafi alan kodlu sabit hatlardır. Araç bu ayrımı "Numara türü" satırında gösterir.'],
    ['444\'lü numaraları biçimlendirebilir miyim?', 'Hayır. 444 ile başlayan yedi haneli numaralar alan kodu olmadan aranır ve 10 haneli yapıya uymaz; yaygın yazımı 444 0 123 gibi 3-1-3 gruplamasıdır. Araç bu numaralarda eksik hane uyarısı verir.'],
    ['Yabancı ülke numaralarını çevirebilir miyim?', 'Bu sürüm yalnızca +90 ile başlayan Türkiye numaralarını destekler. Başka ülkelerde alan kodu uzunlukları ve gruplama alışkanlıkları farklı olduğu için yanlış biçim üretmemek adına bu numaralar kabul edilmez.'],
    ['Hesap tablosunda baştaki sıfır neden kayboluyor?', 'Program numarayı sayı olarak yorumladığı için baştaki sıfırı anlamsız sayıp siler. Sütunu yapıştırmadan önce metin biçimine getirmek ya da numarayı +90 ile başlayan biçimde saklamak sorunu çözer.'],
    ['Yazdığım numara bir yere kaydediliyor mu?', 'Hayır. Biçimlendirme tamamen tarayıcınızda yapılır; numara sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['tel-link-olustur', 'vcard-olustur', 'sayi-ayikla', 'sayi-bicimlendir', 'mailto-link-olustur'],
};
