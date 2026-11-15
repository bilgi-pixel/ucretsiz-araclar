export default {
  slug: 'luhn-kontrol',
  title: 'Luhn Algoritması Kontrolü',
  h1Tail: 'mod 10 sağlama denetimi',
  pageTitle: 'Luhn Algoritması Kontrolü – Mod 10 Numara Doğrulama',
  description: 'Bir numaranın Luhn (mod 10) sağlama denetiminden geçip geçmediğini kontrol edin. Katlanan haneleri, toplamı ve kalanı adım adım görün; veri tarayıcıda kalır.',
  card: 'Bir numaranın Luhn (mod 10) denetiminden geçip geçmediğini adım adım görün; yazım hatalarını yakalayın.',
  category: 'gelistirici',
  keywords: ['luhn algoritması', 'luhn kontrol', 'mod 10 kontrolü', 'luhn doğrulama', 'imei doğrulama luhn', 'kart numarası sağlama hanesi', 'luhn algoritması nasıl çalışır', 'kontrol hanesi denetimi'],
  lead: 'Numarayı yazın; araç <strong>Luhn algoritmasını</strong> (mod 10 denetimi) uygular ve numaranın sağlama hanesinin tutup tutmadığını söyler. Hangi hanelerin ikiye katlandığını, toplamı ve 10\'a bölümünden kalanı da göstererek hesabı elle doğrulamanıza olanak verir.',
  button: 'Kontrol et',
  inputs: [
    { id: 'numara', label: 'Numara', type: 'text', placeholder: 'Örn. 79927398713', hint: 'Boşluk ve tire kullanabilirsiniz; yalnızca rakamlar hesaba katılır. Numara tarayıcınızdan çıkmaz.', wide: true },
  ],
  compute(v, h) {
    const ham = String(v.numara ?? '').trim();
    if (ham === '') h.err('"Numara" alanını doldurun.');
    if (!/^[\d\s-]+$/.test(ham)) h.err('Numara yalnızca rakam, boşluk ve tire içerebilir. Harf ve diğer işaretleri silin.');
    const d = ham.replace(/[\s-]/g, '');
    if (d.length < 2) h.err('Luhn denetimi için en az 2 haneli bir numara gerekir (son hane kontrol hanesidir).');
    if (d.length > 64) h.err('Numara en fazla 64 haneli olabilir.');
    const don = [];
    let toplam = 0;
    let katlanan = 0;
    for (let i = d.length - 1, sira = 1; i >= 0; i--, sira++) {
      let x = d.charCodeAt(i) - 48;
      if (sira % 2 === 0) {
        x *= 2;
        if (x > 9) x -= 9;
        katlanan++;
      }
      toplam += x;
      don.unshift(x);
    }
    const kalan = toplam % 10;
    return {
      rows: [
        ['Sonuç', kalan === 0 ? 'Geçerli – Luhn denetiminden geçti' : 'Geçersiz – Luhn denetiminden geçmedi'],
        ['Hane sayısı', String(d.length)],
        ['Luhn toplamı', String(toplam)],
        ['Toplamın 10\'a bölümünden kalan', String(kalan)],
        ['Kontrol hanesi (son hane)', d[d.length - 1]],
        ['İkiye katlanan hane sayısı', String(katlanan)],
        ['Dönüştürülmüş haneler', don.join(' ')],
      ],
      note: kalan === 0
        ? 'Denetimden geçmek yalnızca hanelerin kendi içinde tutarlı olduğunu gösterir; numaranın gerçekten var olduğu ya da kullanılabilir olduğu anlamına gelmez.'
        : 'Bir hane yanlış yazılmış ya da iki komşu hane yer değiştirmiş olabilir. Numarayı kaynağından yeniden kontrol edin.',
    };
  },
  cases: [
    { in: { numara: '79927398713' }, out: { 'Sonuç': 'Geçerli – Luhn denetiminden geçti', 'Luhn toplamı': '70', 'Toplamın 10\'a bölümünden kalan': '0', 'Dönüştürülmüş haneler': '7 9 9 4 7 6 9 7 7 2 3' } },
    { in: { numara: '79927398710' }, out: { 'Sonuç': 'Geçersiz – Luhn denetiminden geçmedi', 'Luhn toplamı': '67', 'Toplamın 10\'a bölümünden kalan': '7' } },
    { in: { numara: '4111 1111 1111 1111' }, out: { 'Sonuç': 'Geçerli – Luhn denetiminden geçti', 'Luhn toplamı': '30', 'Hane sayısı': '16', 'İkiye katlanan hane sayısı': '8' } },
    { in: { numara: '49-015420-323751-8' }, out: { 'Sonuç': 'Geçerli – Luhn denetiminden geçti', 'Hane sayısı': '15', 'Kontrol hanesi (son hane)': '8' } },
    { in: { numara: '1234567812345678' }, out: { 'Sonuç': 'Geçersiz – Luhn denetiminden geçmedi', 'Luhn toplamı': '68', 'Toplamın 10\'a bölümünden kalan': '8' } },
    { in: { numara: '1234567812345670' }, out: { 'Sonuç': 'Geçerli – Luhn denetiminden geçti', 'Luhn toplamı': '60' } },
    { in: { numara: '18' }, out: { 'Sonuç': 'Geçerli – Luhn denetiminden geçti', 'Luhn toplamı': '10' } },
    { in: { numara: '' }, error: true },
    { in: { numara: '4111-ABCD' }, error: true },
    { in: { numara: '5' }, error: true },
  ],
  howto: [
    'Denetlemek istediğiniz numarayı "Numara" alanına yazın ya da yapıştırın. Dörtlü gruplar arasındaki boşluklar ve tireler sorun olmaz.',
    '"Kontrol et" düğmesine basın. İlk satır numaranın Luhn denetiminden geçip geçmediğini söyler.',
    'Hesabı elle doğrulamak isterseniz "Dönüştürülmüş haneler" satırına bakın: sağdan ikinci haneden başlayarak birer atlayan haneler ikiye katlanmış hâlleriyle yer alır.',
    'Sonuç geçersizse numarayı kaynağıyla karşılaştırın; çoğu zaman tek bir hane yanlış yazılmış ya da iki komşu hane yer değiştirmiştir.',
  ],
  sections: [
    { h: 'Luhn algoritması nedir?', p: [
      'Luhn algoritması, bir numaranın sonuna eklenen tek bir <strong>kontrol hanesi</strong> sayesinde yazım hatalarını yakalamaya yarayan basit bir sağlama yöntemidir. Adını, yöntemi 1950\'lerde geliştiren bilgisayar bilimci Hans Peter Luhn\'dan alır. "Mod 10 algoritması" olarak da bilinir, çünkü denetimin son adımı toplamın 10\'a tam bölünüp bölünmediğine bakmaktır.',
      'Yöntem bir şifreleme ya da güvenlik önlemi değildir; amacı kötü niyetli kişileri durdurmak değil, numarayı elle yazarken, telefonda söylerken ya da kâğıttan aktarırken yapılan dikkatsizlik hatalarını anında fark etmektir. Bir form, numarayı sunucuya göndermeden önce Luhn denetimini yaparak "bir hane yanlış olabilir" uyarısını hemen verebilir.',
    ] },
    { h: 'Adım adım nasıl çalışır?', ol: [
      'Numaranın <strong>en sağındaki</strong> haneden (kontrol hanesi) başlayın ve sola doğru ilerleyin.',
      'Sağdan ikinci, dördüncü, altıncı... sıradaki haneleri <strong>ikiye katlayın</strong>. Diğer haneler olduğu gibi kalır.',
      'İkiye katlama sonucu 9\'dan büyükse rakamlarını toplayın ya da aynı anlama gelmek üzere <strong>9 çıkarın</strong> (örneğin 8 × 2 = 16 → 1 + 6 = 7).',
      'Elde edilen bütün haneleri toplayın.',
      'Toplam 10\'a tam bölünüyorsa numara denetimden geçer; kalan sıfırdan farklıysa geçmez.',
    ] },
    { h: 'Çözümlü örnek: 79927398713', p: [
      'Bu numara, algoritmanın anlatımında en sık kullanılan örnektir. Haneleri sağdan sola sıralayalım: 3, 1, 7, 8, 9, 3, 7, 2, 9, 9, 7. Sağdan ikinci, dördüncü, altıncı, sekizinci ve onuncu haneler, yani 1, 8, 3, 2 ve 9 ikiye katlanır: 2, 16, 6, 4 ve 18. İki basamaklı olanlardan 9 çıkarılır: 16 → 7, 18 → 9.',
      'Numaranın soldan sağa dönüştürülmüş hâli <code>7 9 9 4 7 6 9 7 7 2 3</code> olur. Toplam 7 + 9 + 9 + 4 + 7 + 6 + 9 + 7 + 7 + 2 + 3 = <strong>70</strong>. 70, 10\'a tam bölündüğü için numara geçerlidir. Son haneyi 0 yapıp 79927398710 yazarsanız toplam 67\'ye düşer, kalan 7 olur ve denetim başarısız olur.',
    ] },
    { h: 'Hangi hataları yakalar, hangilerini kaçırır?', p: [
      'Luhn denetimi <strong>tek bir hanenin yanlış yazıldığı</strong> bütün durumları yakalar: herhangi bir haneyi başka bir rakamla değiştirirseniz toplamın 10\'a bölümünden kalan mutlaka değişir. <strong>Yan yana iki hanenin yer değiştirmesi</strong> hatalarının da neredeyse tamamını yakalar; örneğin 12 yerine 21 yazmak fark edilir.',
      'Bunun bir istisnası vardır: 09 ile 90\'ın yer değiştirmesi yakalanamaz, çünkü iki durumda da bu çiftin toplama katkısı aynıdır. Ayrıca 22 ↔ 55, 33 ↔ 66 ve 44 ↔ 77 gibi bazı çift hane hataları ile birbirini götüren birden fazla hata da gözden kaçabilir. Tek kontrol haneli her yöntem gibi Luhn da kusursuz değildir, ancak gündelik yazım hatalarının büyük bölümünü yakalamak için yeterlidir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Ödeme kartı numaraları:</strong> kart numarasının son hanesi Luhn kontrol hanesidir; ödeme formları numarayı göndermeden önce bu denetimi yapar.',
      '<strong>IMEI numaraları:</strong> cep telefonlarının 15 haneli kimlik numarasının son hanesi Luhn ile hesaplanır.',
      '<strong>Abone, müşteri ve üyelik numaraları:</strong> birçok kurum kendi numaralandırma sisteminde aynı yöntemi kullanır.',
      '<strong>Yazılım geliştirme ve test:</strong> form doğrulama kodu yazarken kendi uygulamanızın sonucunu bağımsız bir araçla karşılaştırmak için.',
    ], p: [
      'Her numara Luhn kullanmaz. IBAN mod 97 tabanlı ayrı bir denetimle, ISBN ve EAN barkodları kendi ağırlıklı toplam yöntemleriyle, T.C. kimlik numarası ise kendine özgü bir kuralla doğrulanır. Bu tür numaraları Luhn\'la denetlemek anlamsız sonuç verir; ilgili araçlar bölümündeki özel doğrulayıcıları kullanın.',
    ] },
    { h: 'Geçerli çıkması ne anlama gelir?', p: [
      'Denetimden geçen bir numara yalnızca <em>biçimsel olarak tutarlıdır</em>. Rastgele yazılmış her on numaradan biri tesadüfen denetimden geçer. Dolayısıyla "geçerli" sonucu, numaranın bir kuruma kayıtlı olduğunu, etkin olduğunu ya da size ait olduğunu göstermez; bunu yalnızca numarayı veren kurum doğrulayabilir. Tersine, "geçersiz" sonucu güçlü bir işarettir: numarada büyük olasılıkla bir yazım hatası vardır.',
      'Bu araç yalnızca denetim yapar; numara üretmez, eksik haneyi tamamlamaz ve herhangi bir kuruma sorgu göndermez.',
    ] },
    { h: 'Gizlilik ve güvenli kullanım', p: [
      'Hesap tümüyle tarayıcınızda çalışır; yazdığınız numara hiçbir sunucuya iletilmez ve saklanmaz. Yine de genel bir alışkanlık olarak gerçek kart numaranızı gerekmedikçe hiçbir web sayfasına yazmamanızı öneririz. Algoritmayı öğrenmek ya da kendi kodunuzu sınamak için bu sayfadaki örnek numaralar ve ödeme sağlayıcılarının belgelerinde yayımlanan test numaraları yeterlidir.',
    ] },
    { h: 'Geliştiriciler için notlar', p: [
      'Uygulamada en sık yapılan hata, katlama sırasını soldan saymaktır. Sıra her zaman sağdan belirlenir; bu yüzden hane sayısı tek olan numaralarda (11 ya da 15 hane gibi) en soldaki hane katlanmaz, çift olanlarda (16 hane gibi) katlanır. İkinci yaygın hata, numarayı sayı türüne çevirmektir: 16 ve üzeri haneli değerler kayan noktalı sayılarda duyarlık kaybına uğrar ve baştaki sıfırlar düşer. Numarayı her zaman metin olarak tutun ve hane hane işleyin; boşluk ve tireleri denetimden önce ayıklayın.',
    ] },
  ],
  faq: [
    ['Luhn algoritması ne işe yarar?', 'Bir numaranın son hanesini diğer hanelerden türeterek yazım hatalarını yakalamaya yarar. Tek hanelik yanlışları ve komşu hanelerin yer değiştirmesini büyük oranda fark eder; bir güvenlik ya da şifreleme yöntemi değildir.'],
    ['Luhn denetimi nasıl yapılır?', 'Sağdan başlayarak her ikinci hane ikiye katlanır, 9\'dan büyük sonuçlardan 9 çıkarılır ve bütün haneler toplanır. Toplam 10\'a tam bölünüyorsa numara denetimden geçer.'],
    ['Denetimden geçen numara gerçek midir?', 'Hayır. Denetim yalnızca hanelerin kendi içinde tutarlı olduğunu gösterir. Numaranın bir kuruma kayıtlı, etkin ya da kullanılabilir olup olmadığını yalnızca numarayı veren kurum bilebilir.'],
    ['IMEI numarası Luhn ile doğrulanır mı?', 'Evet. 15 haneli IMEI numarasının son hanesi Luhn algoritmasıyla hesaplanan kontrol hanesidir. Telefonunuzun IMEI numarasını yazarak hanelerin tutarlı olup olmadığını denetleyebilirsiniz.'],
    ['T.C. kimlik numarası ya da IBAN bu araçla kontrol edilir mi?', 'Hayır. T.C. kimlik numarası kendine özgü bir kuralla, IBAN ise mod 97 yöntemiyle doğrulanır. Bu numaralarda Luhn sonucu anlam taşımaz.'],
    ['Luhn hangi hataları yakalayamaz?', '09 ile 90\'ın yer değiştirmesini ve 22-55, 33-66, 44-77 gibi bazı çift hane değişimlerini yakalayamaz. Birbirini dengeleyen birden fazla hata da gözden kaçabilir.'],
    ['Neden sağdan başlanıyor?', 'Kontrol hanesi numaranın sonundadır ve numaraların uzunluğu değişebilir. Sağdan saymak, uzunluk ne olursa olsun kontrol hanesinin her zaman katlanmayan konumda kalmasını sağlar.'],
    ['Yazdığım numara bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; numara sunucuya iletilmez, kaydedilmez ve hiçbir kuruma sorgu gönderilmez.'],
  ],
  related: ['isbn-dogrula', 'ean-barkod-dogrula', 'crc32-hesapla', 'metin-sha256-hesapla', 'bit-islem-hesapla'],
};
