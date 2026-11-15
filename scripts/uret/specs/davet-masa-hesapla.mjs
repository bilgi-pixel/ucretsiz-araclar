export default {
  slug: 'davet-masa-hesapla',
  title: 'Davetli Sayısına Göre Salon ve Masa Hesaplama',
  h1Tail: 'masa sayısı ve salon alanı',
  pageTitle: 'Davetli Sayısına Göre Masa Sayısı ve Salon Alanı Hesaplama',
  description: 'Davetli sayınızı yazın; kaç masa gerektiğini, boş kalacak sandalyeyi ve oturma düzenine göre yaklaşık kaç metrekare salon gerektiğini hesaplayın.',
  card: 'Düğün, nişan ve davetler için davetli sayısından masa adedini ve gereken salon metrekaresini bulun.',
  category: 'gunluk',
  keywords: ['davetli sayısına göre masa hesaplama', 'düğün salonu kaç metrekare olmalı', 'kaç masa gerekir', 'düğün masa sayısı', 'salon kapasitesi hesaplama', 'kişi başı metrekare düğün', 'nişan masa düzeni'],
  lead: 'Düğün, nişan, kına, mezuniyet yemeği ya da şirket daveti planlarken ilk iki soru hep aynıdır: <strong>kaç masa kurulacak</strong> ve <strong>salon kaç metrekare olmalı</strong>? Davetli sayısını, masa başına oturacak kişi sayısını ve oturma düzenini girin; araç masa adedini, boş sandalyeyi ve yaklaşık alan ihtiyacını versin.',
  button: 'Hesapla',
  inputs: [
    { id: 'davetli', label: 'Davetli sayısı', type: 'number', placeholder: 'Örn. 250' },
    { id: 'kisiMasa', label: 'Masa başına kişi', type: 'number', value: '10', hint: 'Yuvarlak masalarda genellikle 8, 10 ya da 12' },
    { id: 'duzen', label: 'Oturma düzeni', type: 'select', options: [
      ['yemek', 'Yemekli, yuvarlak masa (1,2 m²/kişi)'],
      ['pist', 'Yemekli + dans pisti ve sahne (1,5 m²/kişi)'],
      ['kokteyl', 'Ayakta kokteyl (0,7 m²/kişi)'],
      ['tiyatro', 'Sıra sandalye, tiyatro düzeni (0,8 m²/kişi)'],
    ] },
    { id: 'yedek', label: 'Yedek sandalye payı (%)', type: 'number', value: '0', hint: 'Habersiz gelen misafirler için; istemiyorsanız 0 bırakın' },
    { id: 'kisiAlan', label: 'Kişi başı alan (m², isteğe bağlı)', type: 'number', placeholder: 'Boş = düzenin varsayılanı', hint: 'Salonun size verdiği değeri biliyorsanız yazın' },
  ],
  compute(v, h) {
    const davetli = h.posint(v.davetli, 'Davetli sayısı');
    const kisiMasa = h.posint(v.kisiMasa, 'Masa başına kişi');
    if (kisiMasa > 30) h.err('"Masa başına kişi" en fazla 30 olabilir; uzun masaları parçalara bölerek girin.');
    const yedek = h.nonneg(v.yedek === '' ? '0' : v.yedek, 'Yedek sandalye payı');
    if (yedek > 100) h.err('"Yedek sandalye payı" 0 ile 100 arasında olmalı.');
    const TABLO = { yemek: 1.2, pist: 1.5, kokteyl: 0.7, tiyatro: 0.8 };
    const varsayilan = TABLO[v.duzen] || 1.2;
    const alanKisi = String(v.kisiAlan || '').trim() === '' ? varsayilan : h.pos(v.kisiAlan, 'Kişi başı alan');
    const koltuk = Math.ceil(davetli * (1 + yedek / 100) - 1e-9);
    const masa = Math.ceil(koltuk / kisiMasa - 1e-9);
    const kapasite = masa * kisiMasa;
    const alan = koltuk * alanKisi;
    const sonMasa = koltuk - (masa - 1) * kisiMasa;
    const masasiz = v.duzen === 'kokteyl' || v.duzen === 'tiyatro';
    return {
      rows: [
        ['Gereken masa sayısı', `${h.fmt(masa, 0)} masa`],
        ['Planlanan sandalye', `${h.fmt(koltuk, 0)} sandalye`],
        ['Masaların toplam kapasitesi', `${h.fmt(kapasite, 0)} kişi`],
        ['Boş kalan sandalye', `${h.fmt(kapasite - davetli, 0)} sandalye`],
        ['Son masadaki kişi sayısı', `${h.fmt(sonMasa, 0)} kişi`],
        ['Yaklaşık salon alanı', `${h.fmt(alan, 1)} m²`],
        ['Kişi başı alan', `${h.fmt(alanKisi, 2)} m²`],
      ],
      note: (masasiz ? 'Bu düzende masa sayısı, aynı kişi sayısını oturtmak isteseydiniz gerekecek adedi gösterir. ' : '') + 'Alan değeri pratik bir tahmindir; kolon, servis koridoru, büfe ve acil çıkış payları salona göre değişir. Kesin kapasite için salon işletmesinin onaylı yerleşim planını esas alın.',
    };
  },
  cases: [
    { in: { davetli: '250', kisiMasa: '10', duzen: 'yemek', yedek: '0' }, out: { 'Gereken masa sayısı': '25 masa', 'Boş kalan sandalye': '0 sandalye', 'Yaklaşık salon alanı': '300 m²' } },
    { in: { davetli: '250', kisiMasa: '10', duzen: 'yemek', yedek: '5' }, out: { 'Gereken masa sayısı': '27 masa', 'Planlanan sandalye': '263 sandalye', 'Masaların toplam kapasitesi': '270 kişi', 'Boş kalan sandalye': '20 sandalye', 'Yaklaşık salon alanı': '315,6 m²' } },
    { in: { davetli: '400', kisiMasa: '12', duzen: 'pist', yedek: '0' }, out: { 'Gereken masa sayısı': '34 masa', 'Masaların toplam kapasitesi': '408 kişi', 'Son masadaki kişi sayısı': '4 kişi', 'Yaklaşık salon alanı': '600 m²' } },
    { in: { davetli: '120', kisiMasa: '8', duzen: 'kokteyl', yedek: '0' }, out: { 'Gereken masa sayısı': '15 masa', 'Yaklaşık salon alanı': '84 m²' } },
    { in: { davetli: '85', kisiMasa: '10', duzen: 'tiyatro', yedek: '0' }, out: { 'Gereken masa sayısı': '9 masa', 'Boş kalan sandalye': '5 sandalye', 'Yaklaşık salon alanı': '68 m²' } },
    { in: { davetli: '60', kisiMasa: '6', duzen: 'yemek', yedek: '0', kisiAlan: '2' }, out: { 'Gereken masa sayısı': '10 masa', 'Yaklaşık salon alanı': '120 m²', 'Kişi başı alan': '2 m²' } },
    { in: { davetli: '0', kisiMasa: '10' }, error: true },
    { in: { davetli: '250', kisiMasa: 'on' }, error: true },
  ],
  howto: [
    '"Davetli sayısı" alanına gelmesini beklediğiniz kişi sayısını yazın. Davetiye sayısını değil, çocuklar dahil oturacak kişi sayısını esas alın.',
    '"Masa başına kişi" alanına salonun kullandığı masa tipine göre 8, 10 ya da 12 gibi bir değer girin.',
    'Oturma düzenini seçin. Salon size kişi başı metrekare bilgisi verdiyse bunu isteğe bağlı alana yazarak varsayılanın yerine kullanabilirsiniz.',
    'Habersiz gelen misafirlere karşı tedbir almak istiyorsanız yedek sandalye payını yüzde olarak girin.',
    '"Hesapla" düğmesine basın; masa adedi, boş sandalye ve yaklaşık salon alanı sonuç kutusunda listelenir.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Masa sayısı basit bir yukarı yuvarlama işlemidir: <strong>masa = planlanan sandalye ÷ masa başına kişi</strong>, sonuç tam çıkmazsa bir üst tam sayıya tamamlanır. Çünkü 4 kişi için de bir masa kurmak gerekir. Planlanan sandalye, davetli sayısının yedek payı kadar artırılmış hâlidir: <strong>sandalye = davetli × (1 + yedek ÷ 100)</strong>.',
      'Salon alanı ise planlanan sandalye sayısının kişi başı alanla çarpımıdır: <strong>alan = sandalye × kişi başı m²</strong>. Kişi başı alan yalnızca sandalyenin kapladığı yer değildir; masanın kendisi, masalar arasındaki servis koridoru ve genel dolaşım alanı bu değerin içindedir.',
    ] },
    { h: 'Çözümlü örnek: 250 kişilik düğün', p: [
      '250 davetli, 10 kişilik yuvarlak masalar ve yemekli düzen için hesap şöyledir: 250 ÷ 10 = 25 masa. Hiç boş sandalye kalmaz. Alan 250 × 1,2 = <strong>300 m²</strong> çıkar.',
      'Aynı düğünde yüzde 5 yedek payı bırakırsanız 250 × 1,05 = 262,5, yani 263 sandalye planlanır. 263 ÷ 10 = 26,3 olduğundan <strong>27 masa</strong> gerekir; bu masaların kapasitesi 270 kişidir ve davetli sayısına göre 20 sandalye boşta kalır. Alan da 263 × 1,2 = 315,6 m²ye çıkar. Görüldüğü gibi küçük bir yedek payı iki masa ve yaklaşık 16 m² ek yer anlamına gelir.',
    ] },
    { h: 'Oturma düzenlerine göre kişi başı alan', p: [
      'Araçtaki varsayılanlar, etkinlik planlamasında yaygın kullanılan yaklaşık değerlerdir ve bir standart ya da yönetmelik hükmü değildir:',
    ], ul: [
      '<strong>Yemekli, yuvarlak masa – 1,2 m²/kişi:</strong> Masalar, sandalyeler ve garsonun geçebileceği aralıklar dahil rahat bir yerleşim.',
      '<strong>Yemekli + dans pisti ve sahne – 1,5 m²/kişi:</strong> Türkiye\'deki düğünlerin çoğunda pist, orkestra ya da DJ kabini ve gelin masası bulunur; bunlar için ek pay gerekir.',
      '<strong>Ayakta kokteyl – 0,7 m²/kişi:</strong> Bistro masaları ve ikram tezgâhlarıyla, misafirlerin çoğunun ayakta olduğu davetler.',
      '<strong>Tiyatro düzeni – 0,8 m²/kişi:</strong> Nikâh töreni, konferans ya da mevlit gibi sıra sandalyeli oturumlar.',
    ] },
    { h: 'Masa tipi seçimi sonucu nasıl değiştirir?', p: [
      'Aynı davetli sayısı için masa kapasitesini büyütmek masa adedini azaltır ama her zaman daha konforlu değildir. 180 cm çaplı bir yuvarlak masaya 12 kişi sığdırılabilir, fakat kişi başına düşen kenar uzunluğu azalır ve karşılıklı sohbet zorlaşır. 150–160 cm çaplı masalarda 8–10 kişi daha rahattır. Dikdörtgen ziyafet masalarında ise uzun kenara oturan kişi sayısı belirleyicidir.',
      'Bir başka ayrıntı son masadır. 400 davetliyi 12 kişilik masalara yerleştirdiğinizde 34 masa gerekir ve son masada yalnızca 4 kişi kalır. Bu durumda birkaç masayı 11 kişilik kurmak ya da son masayı aile masasına eklemek daha dengeli bir görüntü verir. Araç "Son masadaki kişi sayısı" satırıyla bu durumu önceden görmenizi sağlar.',
    ] },
    { h: 'Planlarken sık yapılan hatalar', ul: [
      'Davetiye sayısını davetli sayısı sanmak. Bir davetiye çoğu zaman iki ila dört kişilik bir aileyi temsil eder.',
      'Çocukları hesaba katmamak. Mama sandalyesinde oturan bebek dışında her çocuk bir sandalye kaplar.',
      'Salonun brüt metrekaresini kullanmak. Mutfak, fuaye, tuvalet ve depo alanları oturma alanına dahil değildir.',
      'Gelin masası, pasta sehpası, fotoğraf köşesi ve hediye masası gibi sabit alanları unutmak.',
      'Orkestra, ses sistemi ve servis ekibinin kendi masa ve alan ihtiyacını planın dışında bırakmak.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bu araç bir ön planlama hesaplayıcısıdır. Bir salonun yasal kişi kapasitesi; çıkış kapılarının sayısı ve genişliği, yangın güvenliği kuralları ve işletmenin ruhsatı ile belirlenir. Hesaplanan metrekare, salonun o sayıda insanı güvenle ağırlayabileceği anlamına gelmez. Sözleşme imzalamadan önce işletmeden davetli sayınıza göre çizilmiş yerleşim planını isteyin ve kapasite konusunda işletmenin resmî beyanını esas alın.',
    ] },
  ],
  faq: [
    ['200 kişilik düğün için kaç masa gerekir?', '10 kişilik masalarla 20, 8 kişilik masalarla 25, 12 kişilik masalarla 17 masa gerekir. 12 kişilik düzende 17 masanın kapasitesi 204 kişidir ve 4 sandalye boş kalır.'],
    ['300 kişilik düğün salonu kaç metrekare olmalı?', 'Yalnızca yemekli oturma düzeni için yaklaşık 360 m², dans pisti ve sahne payıyla birlikte yaklaşık 450 m² oturma alanı öngörülür. Bu değerlere mutfak, fuaye ve tuvaletler dahil değildir.'],
    ['Yedek sandalye payını yüzde kaç almalıyım?', 'Kesin bir kural yoktur. LCV (katılım teyidi) aldıysanız 0–5 arası yeterli olur; teyit almadan yapılan kalabalık düğünlerde 5–10 arası bir pay kullanılır. Bazı davetlerde katılım beklenenden az da olabilir; bu yüzden salonla "garanti kişi sayısı" maddesini ayrıca konuşun.'],
    ['Yuvarlak masaya kaç kişi oturur?', 'Yaygın uygulamada 150 cm çaplı masaya 8, 160–170 cm çaplı masaya 10, 180 cm çaplı masaya 12 kişi oturtulur. Kişi başına yaklaşık 50–60 cm masa kenarı düşmesi rahat bir yemek için yeterlidir.'],
    ['Kokteyl düzeninde neden masa sayısı da görünüyor?', 'Araç tek bir formül kullandığı için masa satırı her düzende hesaplanır. Kokteyl ve tiyatro düzeninde bu değer, aynı kişi sayısını masalara oturtsaydınız gerekecek adedi gösterir; alan satırı ise seçtiğiniz düzene göredir.'],
    ['Salonun verdiği kapasite ile hesap tutmuyorsa hangisine güvenmeliyim?', 'Salonun resmî kapasitesine. İşletmeler kapasiteyi kendi masa ölçülerine, kolon yerlerine ve güvenlik kurallarına göre belirler. Aracı, farklı salonları aynı ölçütle karşılaştırmak ve teklifin makul olup olmadığını görmek için kullanın.'],
    ['Dans pisti için ne kadar yer ayırmalıyım?', 'Pratik bir yaklaşım, aynı anda dans edeceğini düşündüğünüz kişi başına 0,4–0,5 m² ayırmaktır. Davetlilerin üçte birinin aynı anda pistte olacağını varsayarsanız 300 kişilik bir düğünde 40–50 m²lik bir pist yeterli olur. Araçtaki pistli düzen bu payı kişi başı alana eklenmiş olarak içerir.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; davetli sayısı ya da başka hiçbir bilgi sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['masa-kisi-sayisi-hesapla', 'parti-ikram-hesapla', 'mangal-et-miktari-hesapla', 'alan-cevre-hesapla', 'yuzde-hesapla'],
};
