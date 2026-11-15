export default {
  slug: 'tel-link-olustur',
  title: 'Telefon ve SMS Bağlantısı Oluşturma',
  h1Tail: 'tıkla ara, tıkla mesaj at',
  pageTitle: 'Telefon ve SMS Bağlantısı Oluşturma – Tıkla Ara (tel:) Linki',
  description: 'Telefon numaranızı tıklanınca arama ya da SMS başlatan tel: ve sms: bağlantısına çevirin. Numara uluslararası biçime getirilir, HTML kodu hazır verilir.',
  card: 'Numaranızı tıklanınca arama ya da hazır mesajlı SMS açan tel: ve sms: bağlantısına ve HTML koduna çevirin.',
  category: 'gelistirici',
  keywords: ['tel link oluşturma', 'tıkla ara linki', 'sms linki oluşturma', 'html telefon linki', 'href tel', 'click to call', 'telefon numarası link yapma'],
  lead: 'Telefon numaranızı, mobil cihazda dokunulduğunda <strong>doğrudan arama</strong> ya da <strong>hazır metinli SMS</strong> başlatan bağlantıya dönüştürün. Araç numarayı boşluk ve parantezlerden arındırır, ülke koduyla uluslararası biçime getirir ve sayfanıza yapıştıracağınız HTML kodunu üretir.',
  button: 'Oluştur',
  inputs: [
    { id: 'numara', label: 'Telefon numarası', type: 'text', placeholder: 'Örn. 0532 123 45 67', wide: true },
    { id: 'tur', label: 'Bağlantı türü', type: 'select', options: [['tel', 'Arama (tel:)'], ['sms', 'SMS (sms:)']] },
    { id: 'bicim', label: 'Numara biçimi', type: 'select', options: [['ulus', 'Uluslararası (+ülke kodu)'], ['yerel', 'Olduğu gibi (kısa/özel numara)']] },
    { id: 'ulke', label: 'Ülke kodu', type: 'text', value: '90', hint: 'Numara 0 ile başlıyorsa ya da ülke kodu yazılmamışsa eklenir.' },
    { id: 'mesaj', label: 'SMS metni', type: 'text', placeholder: 'Yalnızca SMS bağlantısında kullanılır', wide: true },
    { id: 'metin', label: 'Bağlantı yazısı', type: 'text', placeholder: 'Boşsa numara yazılır' },
  ],
  compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (!ham) h.err('"Telefon numarası" alanını doldurun.');
    if (!/^[+\d\s().\-/]+$/.test(ham)) h.err('Telefon numarası yalnızca rakam, boşluk, parantez, tire ve baştaki + işaretini içerebilir.');
    if (ham.indexOf('+') > 0 || ham.split('+').length > 2) h.err('Artı işareti yalnızca numaranın en başında bulunabilir.');
    let d = ham.replace(/\D/g, '');
    const arti = ham.startsWith('+');
    let numara, gorunen;
    if (v.bicim === 'yerel') {
      if (d.length < 3 || d.length > 15) h.err('Numara 3 ile 15 rakam arasında olmalı.');
      numara = (arti ? '+' : '') + d;
      gorunen = numara;
    } else {
      const ulke = String(v.ulke ?? '').replace(/\D/g, '');
      let tam;
      if (arti) tam = d;
      else if (d.startsWith('00')) tam = d.slice(2);
      else {
        if (!/^[1-9]\d{0,2}$/.test(ulke)) h.err('"Ülke kodu" 1–3 rakam olmalı (Türkiye için 90).');
        tam = ulke + (d.startsWith('0') ? d.slice(1) : d);
      }
      if (tam.length < 8 || tam.length > 15) h.err('Uluslararası numara ülke koduyla birlikte 8–15 rakam olmalı. Kısa numaralar için "Olduğu gibi" biçimini seçin.');
      if (tam.startsWith('0')) h.err('Ülke kodu 0 ile başlayamaz; numarayı kontrol edin.');
      numara = '+' + tam;
      gorunen = /^90\d{10}$/.test(tam) ? `+90 ${tam.slice(2, 5)} ${tam.slice(5, 8)} ${tam.slice(8, 10)} ${tam.slice(10)}` : numara;
    }
    const mesaj = String(v.mesaj ?? '').trim();
    let url = (v.tur === 'sms' ? 'sms:' : 'tel:') + numara;
    if (v.tur === 'sms' && mesaj) url += '?body=' + encodeURIComponent(mesaj).replace(/'/g, '%27');
    const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const yazi = String(v.metin ?? '').trim() || gorunen;
    return {
      rows: [
        ['Bağlantı', url],
        ['Numara', numara],
        ['Okunaklı yazım', gorunen],
      ],
      text: `<a href="${escH(url)}">${escH(yazi)}</a>`,
      note: v.tur === 'tel' && mesaj ? 'SMS metni yalnızca SMS bağlantısında kullanılır; arama bağlantısında yok sayıldı.' : 'Alttaki kutuda sayfanıza yapıştırabileceğiniz HTML kodu yer alır.',
    };
  },
  cases: [
    { in: { numara: '0532 123 45 67' }, out: { 'Bağlantı': 'tel:+905321234567', 'Okunaklı yazım': '+90 532 123 45 67' }, text: '<a href="tel:+905321234567">+90 532 123 45 67</a>' },
    { in: { numara: '(0412) 123 45 67', tur: 'sms', mesaj: 'Merhaba, bilgi almak istiyorum', metin: 'Mesaj atın' }, out: { 'Bağlantı': 'sms:+904121234567?body=Merhaba%2C%20bilgi%20almak%20istiyorum' }, text: '<a href="sms:+904121234567?body=Merhaba%2C%20bilgi%20almak%20istiyorum">Mesaj atın</a>' },
    { in: { numara: '+44 20 7946 0958' }, out: { 'Bağlantı': 'tel:+442079460958', 'Okunaklı yazım': '+442079460958' } },
    { in: { numara: '00905321234567' }, out: { 'Numara': '+905321234567' } },
    { in: { numara: '532-123-45-67' }, out: { 'Bağlantı': 'tel:+905321234567' } },
    { in: { numara: '444 1 234', bicim: 'yerel' }, out: { 'Bağlantı': 'tel:4441234' }, text: '<a href="tel:4441234">4441234</a>' },
    { in: { numara: '030 1234567', ulke: '49', tur: 'sms' }, out: { 'Bağlantı': 'sms:+49301234567' } },
    { in: { numara: 'abc' }, error: true },
    { in: { numara: '123' }, error: true },
  ],
  howto: [
    '"Telefon numarası" alanına numarayı alıştığınız biçimde yazın; boşluk, parantez ve tire kullanabilirsiniz.',
    'Bağlantının arama mı yoksa SMS mi başlatacağını seçin. SMS seçtiyseniz isterseniz hazır gelecek mesaj metnini de yazın.',
    'Numara Türkiye dışındaysa "Ülke kodu" alanını değiştirin. 444\'lü hatlar ve üç haneli servis numaraları için "Olduğu gibi" biçimini seçin.',
    '"Oluştur" düğmesine basın; bağlantıyı ya da HTML kodunu kopyalayıp sitenizin iletişim bölümüne, düğmesine ya da üst bilgisine ekleyin.',
  ],
  sections: [
    { h: 'Tıkla ara bağlantısı nasıl çalışır?', p: [
      'Web sayfasındaki bir bağlantının adresi <code>tel:</code> ile başlıyorsa, cihaz bunu bir internet adresi olarak değil telefon numarası olarak yorumlar. Akıllı telefonda bağlantıya dokunulduğunda arama ekranı numara yazılmış hâlde açılır ve kullanıcı yalnızca arama tuşuna basar. Masaüstünde ise sistemde tanımlı bir arama uygulaması varsa o açılır; yoksa tarayıcı hangi uygulamanın kullanılacağını sorar ya da hiçbir şey yapmaz.',
      '<code>sms:</code> şeması aynı mantıkla mesaj uygulamasını açar. Adresin sonuna <code>?body=</code> ekleyerek mesajın ilk hâlini de hazırlayabilirsiniz; kullanıcı metni görür, isterse değiştirir ve gönderir. Bağlantı hiçbir zaman kendiliğinden arama yapmaz ya da mesaj göndermez, son adım her zaman kullanıcıya aittir.',
    ] },
    { h: 'Numara neden uluslararası biçimde yazılmalı?', p: [
      'Sayfanızı yurt dışından açan ya da yabancı hat kullanan bir ziyaretçi <code>tel:05321234567</code> bağlantısına bastığında, şebekesi bu numarayı kendi ülkesinin numarası sanar ve arama yanlış yere gider ya da hiç bağlanmaz. Numarayı artı işareti ve ülke koduyla, yani <code>tel:+905321234567</code> biçiminde yazdığınızda bağlantı dünyanın her yerinden doğru çalışır. Türkiye içinden arayanlar için de bir sakıncası yoktur.',
      'Araç bu dönüşümü şöyle yapar: boşluk, parantez, nokta ve tireleri siler; numara <code>0</code> ile başlıyorsa bu sıfırı atıp yerine ülke kodunu koyar; <code>00</code> ile başlıyorsa bunu artı işaretine çevirir; zaten artı ile başlıyorsa yalnızca temizler. Uluslararası numaralandırma düzeninde bir numara ülke koduyla birlikte en fazla 15 rakam olabilir; araç bu sınırı da denetler.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Sabit hat numaranız "(0412) 123 45 67" olsun. Parantez ve boşluklar silinir, baştaki sıfır atılır, başa 90 eklenir ve sonuç <code>tel:+904121234567</code> olur. Sayfada görünecek yazı için okunaklı biçim "+90 412 123 45 67" önerilir; bağlantının adresi ile ekranda görünen yazı farklı olabilir.',
      'Aynı numaraya "Merhaba, bilgi almak istiyorum" metniyle SMS bağlantısı isterseniz araç <code>sms:+904121234567?body=Merhaba%2C%20bilgi%20almak%20istiyorum</code> adresini üretir. Virgül <code>%2C</code>, boşluklar <code>%20</code> olarak kodlanmıştır; mesaj uygulaması bunları yeniden normal metne çevirir.',
      'Almanya\'daki bir numara için ülke kodunu 49 yapıp "030 1234567" yazdığınızda sonuç <code>+49301234567</code> olur. Numarayı baştan "+44 20 7946 0958" gibi artı ile yazarsanız ülke kodu alanı dikkate alınmaz.',
    ] },
    { h: 'Kısa numaralar ve 444\'lü hatlar', p: [
      'Üç haneli acil ve servis numaraları ile yedi haneli 444\'lü çağrı merkezi hatları ülke koduyla aranmaz. Bu numaralar için "Olduğu gibi" biçimini seçin; araç yalnızca boşlukları temizler ve <code>tel:4441234</code> gibi bir bağlantı üretir. Bu tür bağlantıların yalnızca ilgili ülkenin şebekesinden çalışacağını unutmayın. Yurt dışından da ulaşılmak istiyorsanız yanında ülke kodlu bir sabit ya da mobil numara verin.',
    ] },
    { h: 'Sitede kullanırken ipuçları', ul: [
      'Bağlantıyı yalnızca bir simgeye değil, numaranın yazısına da verin; kullanıcılar numaranın kendisine dokunmaya alışkındır.',
      'Mobil görünümde düğmeyi başparmağın rahat ulaşacağı bir yere ve yeterince büyük bir dokunma alanıyla yerleştirin.',
      'Bağlantı yazısında numarayı gruplayarak yazın (ör. +90 532 123 45 67); bitişik yazılan uzun rakam dizileri zor okunur.',
      'SMS metnini kısa tutun. Uzun ve Türkçe karakterli metinler birden fazla mesaja bölünebilir.',
      'Masaüstü ziyaretçileri için numara yine düz metin olarak görünür olmalı; herkesin bilgisayarında arama uygulaması bulunmaz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç numaranın gerçekten var olup olmadığını ya da hangi operatöre ait olduğunu denetlemez; yalnızca biçimi ve uzunluğu kontrol eder. SMS bağlantılarındaki hazır metin desteği cihaza ve mesaj uygulamasına bağlıdır; güncel telefonların çoğu metni doldurur, ancak bazı eski cihazlar yalnızca numarayı açıp metni yok sayabilir. Önemli kampanyalarda bağlantıyı yayımlamadan önce birkaç farklı telefonda deneyin.',
    ] },
  ],
  faq: [
    ['HTML\'de telefon numarası nasıl tıklanabilir yapılır?', 'Bağlantı etiketinin href özelliğine <code>tel:+905321234567</code> biçiminde bir adres yazılır. Araç bu adresi ve çevresindeki HTML kodunu hazır verir; kodu sayfanıza yapıştırmanız yeterlidir.'],
    ['Numaranın başına +90 yazmak zorunda mıyım?', 'Zorunlu değildir ama önerilir. Ülke kodsuz bağlantı yalnızca aynı ülkedeki hatlardan doğru çalışır. Artı ve ülke koduyla yazılan numara ise yurt içinden de yurt dışından da sorunsuz aranır.'],
    ['Bağlantıda boşluk ya da parantez kullanılabilir mi?', 'Adres kısmında kullanılmaması en güvenlisidir; bu yüzden araç adresi yalnızca rakamlardan ve baştaki artıdan oluşturur. Ekranda görünen yazıda ise okunaklılık için boşluk kullanabilirsiniz.'],
    ['SMS bağlantısına hazır mesaj nasıl eklenir?', 'Adresin sonuna <code>?body=</code> ve kodlanmış mesaj metni eklenir. Araçta türü SMS seçip "SMS metni" alanını doldurduğunuzda kodlama kendiliğinden yapılır.'],
    ['Tel bağlantısı bilgisayarda neden çalışmıyor?', 'Masaüstü bilgisayarlarda arama yapabilen bir uygulama kurulu ve varsayılan olarak ayarlı değilse bağlantı bir şey yapmaz. Bu beklenen bir durumdur; bağlantı esas olarak telefonlar için tasarlanmıştır.'],
    ['444\'lü numara için bağlantı nasıl oluşturulur?', '"Numara biçimi" listesinden "Olduğu gibi" seçeneğini işaretleyin ve numarayı yazın. Araç ülke kodu eklemeden <code>tel:4441234</code> biçiminde bağlantı üretir.'],
    ['Dahili numara eklenebilir mi?', 'Telefon bağlantısı standardında dahili numara için ek parametreler tanımlıdır, ancak cihazların desteği tutarlı değildir. Bu araç yalnızca ana numarayı üretir; dahiliyi bağlantı yazısında belirtmeniz daha güvenilirdir.'],
    ['Girdiğim telefon numarası kaydediliyor mu?', 'Hayır. Bağlantı tarayıcınızın içinde oluşturulur; numara ve mesaj metni sunucuya gönderilmez, saklanmaz. Araç arama yapmaz ve mesaj göndermez.'],
  ],
  related: ['mailto-link-olustur', 'vcard-olustur', 'qr-kod', 'url-kodla', 'utm-link-olustur'],
};
