export default {
  slug: 'isi-kaybi-direnc-hesapla',
  title: 'Dirençte Harcanan Güç Hesaplama',
  h1Tail: 'ısıya dönüşen güç ve watt seçimi',
  pageTitle: 'Dirençte Harcanan Güç Hesaplama – Kaç Watt Direnç Gerekir?',
  description: 'Gerilim, akım ve direnç değerlerinden ikisini yazın; dirençte ısıya dönüşen gücü, eksik büyüklüğü ve güvenlik paylı önerilen direnç watt değerini hesaplayın.',
  card: 'Gerilim, akım ve dirençten ikisini yazın; dirençte harcanan gücü ve seçmeniz gereken direnç watt değerini bulun.',
  category: 'elektrik',
  keywords: ['dirençte harcanan güç', 'direnç güç hesaplama', 'kaç watt direnç kullanmalıyım', 'direnç ısınması hesaplama', 'joule ısısı hesaplama', 'direnç watt seçimi', 'p = i2r hesaplama'],
  lead: 'Bir direncin üzerindeki gerilim, içinden geçen akım ve direnç değerinden bildiğiniz ikisini yazın. Araç <strong>dirençte ısıya dönüşen gücü</strong> ve eksik kalan büyüklüğü hesaplar, güvenlik payını ekleyerek hangi watt değerinde direnç seçmeniz gerektiğini önerir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bilinen', label: 'Bilinen değerler', type: 'select', options: [['vr', 'Gerilim ve direnç'], ['ir', 'Akım ve direnç'], ['vi', 'Gerilim ve akım']] },
    { id: 'gerilim', label: 'Direnç üzerindeki gerilim (V)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'akim', label: 'Akım (A)', type: 'number', placeholder: 'Örn. 0,02', hint: 'Miliamperi ampere çevirin: 20 mA = 0,02 A.' },
    { id: 'direnc', label: 'Direnç (Ω)', type: 'number', placeholder: 'Örn. 220', hint: 'Binlik ayraç kullanmayın: 10 kΩ için 10000 yazın.' },
    { id: 'kat', label: 'Güvenlik katsayısı', type: 'number', value: '2', hint: 'Seçilecek direncin gücü, harcanan gücün en az kaç katı olsun.' },
  ],
  compute(v, h) {
    const mod = v.bilinen === 'ir' ? 'ir' : v.bilinen === 'vi' ? 'vi' : 'vr';
    let u, i, r;
    if (mod === 'vr') { u = h.pos(v.gerilim, 'Gerilim'); r = h.pos(v.direnc, 'Direnç'); i = u / r; }
    else if (mod === 'ir') { i = h.pos(v.akim, 'Akım'); r = h.pos(v.direnc, 'Direnç'); u = i * r; }
    else { u = h.pos(v.gerilim, 'Gerilim'); i = h.pos(v.akim, 'Akım'); r = u / i; }
    const kat = h.opt(v.kat, 2, 'Güvenlik katsayısı');
    if (kat < 1 || kat > 10) h.err('Güvenlik katsayısı 1 ile 10 arasında olmalı.');
    const p = u * i;
    const gucYaz = (x) => (x >= 1000 ? h.sig(x / 1000, 5) + ' kW' : x >= 1 ? h.sig(x, 5) + ' W' : x >= 1e-3 ? h.sig(x * 1e3, 5) + ' mW' : h.sig(x * 1e6, 5) + ' µW');
    const akimYaz = (x) => (x >= 1 ? h.sig(x, 5) + ' A' : x >= 1e-3 ? h.sig(x * 1e3, 5) + ' mA' : h.sig(x * 1e6, 5) + ' µA');
    const direncYaz = (x) => (x >= 1e6 ? h.sig(x / 1e6, 5) + ' MΩ' : x >= 1e3 ? h.sig(x / 1e3, 5) + ' kΩ' : h.sig(x, 5) + ' Ω');
    const siniflar = [0.125, 0.25, 0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    const gerek = p * kat;
    const sec = siniflar.find((s) => s >= gerek - 1e-12);
    const oneri = sec === undefined
      ? 'Standart dirençlerin üzerinde (en az ' + gucYaz(gerek) + ' gerekir)'
      : (sec < 1 ? h.fmt(sec, 3) + ' W' : sec + ' W') + ' ya da üzeri';
    return {
      rows: [
        ['Dirençte harcanan güç', gucYaz(p)],
        ['Önerilen direnç gücü', oneri],
        ['Gerilim', h.sig(u, 5) + ' V'],
        ['Akım', akimYaz(i)],
        ['Direnç', direncYaz(r)],
        ['Bir saatte açığa çıkan ısı', h.sig(p * 3.6, 5) + ' kJ'],
      ],
      note: sec === undefined
        ? 'Bu güç düzeyi sıradan devre dirençleriyle karşılanamaz; soğutuculu güç direnci ya da ısıtıcı eleman gerekir.'
        : 'Öneri, harcanan gücün güvenlik katsayısıyla çarpılıp bir üst standart değere yuvarlanmasıyla bulunur. Sıcak ya da kapalı ortamlarda daha büyük bir katsayı seçin.',
    };
  },
  cases: [
    { in: { bilinen: 'vr', gerilim: '5', direnc: '220', kat: '2' }, out: { 'Dirençte harcanan güç': '113,64 mW', 'Önerilen direnç gücü': '0,25 W ya da üzeri', 'Akım': '22,727 mA', 'Direnç': '220 Ω' } },
    { in: { bilinen: 'vr', gerilim: '12', direnc: '100', kat: '2' }, out: { 'Dirençte harcanan güç': '1,44 W', 'Önerilen direnç gücü': '3 W ya da üzeri', 'Akım': '120 mA', 'Bir saatte açığa çıkan ısı': '5,184 kJ' } },
    { in: { bilinen: 'ir', akim: '0,02', direnc: '1000', kat: '2' }, out: { 'Dirençte harcanan güç': '400 mW', 'Önerilen direnç gücü': '1 W ya da üzeri', 'Gerilim': '20 V', 'Direnç': '1 kΩ' } },
    { in: { bilinen: 'vi', gerilim: '230', akim: '10', kat: '2' }, out: { 'Dirençte harcanan güç': '2,3 kW', 'Direnç': '23 Ω', 'Önerilen direnç gücü': 'Standart dirençlerin üzerinde (en az 4,6 kW gerekir)' } },
    { in: { bilinen: 'vr', gerilim: '5', direnc: '100', kat: '2' }, out: { 'Dirençte harcanan güç': '250 mW', 'Önerilen direnç gücü': '0,5 W ya da üzeri', 'Akım': '50 mA' } },
    { in: { bilinen: 'vr', gerilim: '3,3', direnc: '10000', kat: '2' }, out: { 'Dirençte harcanan güç': '1,089 mW', 'Önerilen direnç gücü': '0,125 W ya da üzeri', 'Akım': '330 µA', 'Direnç': '10 kΩ' } },
    { in: { bilinen: 'ir', akim: '2', direnc: '0,5', kat: '1' }, out: { 'Dirençte harcanan güç': '2 W', 'Önerilen direnç gücü': '2 W ya da üzeri', 'Gerilim': '1 V' } },
    { in: { bilinen: 'vr', gerilim: '5', direnc: '0', kat: '2' }, error: true },
    { in: { bilinen: 'ir', akim: '', direnc: '100', kat: '2' }, error: true },
    { in: { bilinen: 'vi', gerilim: '-5', akim: '1', kat: '2' }, error: true },
  ],
  howto: [
    '"Bilinen değerler" listesinden elinizdeki iki büyüklüğü seçin: gerilim ve direnç, akım ve direnç ya da gerilim ve akım.',
    'Seçtiğiniz iki alanı doldurun. Gerilim, kaynağın değil doğrudan direncin iki ucu arasındaki gerilim olmalıdır. Kullanılmayan üçüncü alan dikkate alınmaz.',
    'Güvenlik katsayısını gerekirse değiştirin; 2 değeri, direncin anma gücünün yarısında çalıştırılması anlamına gelir.',
    '"Hesapla" düğmesine basın. İlk satır dirençte ısıya dönüşen gücü, ikinci satır seçmeniz gereken en düşük standart direnç gücünü gösterir.',
  ],
  sections: [
    { h: 'Direnç neden ısınır?', p: [
      'Bir iletkenden akım geçerken elektronlar malzemenin atomlarıyla çarpışır ve taşıdıkları enerjinin bir bölümünü ısı olarak bırakır. Bu olaya Joule ısınması denir. Direnç, üzerine düşen elektrik gücünün tamamını ısıya çeviren bir elemandır; ışık ya da hareket üretmez. Dolayısıyla "dirençte harcanan güç" ile "dirençte açığa çıkan ısı gücü" aynı şeydir.',
      'Her direncin, gövdesinin zarar görmeden çevreye atabildiği bir ısı gücü sınırı vardır; buna anma gücü denir ve watt ile ifade edilir. Üzerinde harcanan güç bu sınırı aşarsa direnç aşırı ısınır, değeri kayar, gövdesi kararır ve sonunda yanarak açık devre olur. Devre tasarımında direncin ohm değeri kadar watt değeri de doğru seçilmelidir.',
    ] },
    { h: 'Güç formülleri', p: [
      'Temel bağıntı gücün gerilim ile akımın çarpımı olmasıdır. Ohm kanunu (U = I × R) yerine konulduğunda aynı güç üç ayrı biçimde yazılabilir; hangi iki büyüklüğü biliyorsanız ona uygun olanı kullanılır:',
    ], ul: [
      '<strong>P = U × I</strong> (gerilim ve akım biliniyorsa)',
      '<strong>P = U² ÷ R</strong> (gerilim ve direnç biliniyorsa)',
      '<strong>P = I² × R</strong> (akım ve direnç biliniyorsa)',
    ] },
    { h: 'Karesel ilişkinin anlamı', p: [
      'Bu formüllerdeki kare ifadeleri önemli bir sonuç doğurur: sabit bir dirençte gerilimi ya da akımı iki katına çıkarmak gücü dört katına çıkarır. 5 V altında sorunsuz çalışan bir direnç 12 V\'a bağlandığında yaklaşık 5,8 kat fazla ısınır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 220 Ω\'luk bir direncin uçlarında 5 V var. Güç 5² ÷ 220 = 25 ÷ 220 = 0,11364 W, yani 113,64 mW\'tır. Akım 5 ÷ 220 = 22,727 mA olur. Güvenlik katsayısı 2 alınırsa en az 227 mW\'lık bir direnç gerekir; bunun üstündeki ilk standart değer 0,25 W\'tır. Yaygın çeyrek watt\'lık direnç bu iş için uygundur.',
      '<strong>Örnek 2:</strong> 100 Ω\'luk direnç 12 V\'a bağlanıyor. Güç 144 ÷ 100 = 1,44 W, akım 120 mA\'dir. İki katı 2,88 W ettiğinden en az 3 W\'lık bir direnç seçilmelidir. Çeyrek watt\'lık bir direnç burada saniyeler içinde yanar. Bu direnç bir saatte 1,44 × 3600 = 5184 J, yani 5,184 kJ ısı yayar.',
      '<strong>Örnek 3:</strong> 1 kΩ\'luk dirençten 20 mA geçiyor. Güç 0,02² × 1000 = 0,4 W, direnç üzerindeki gerilim 20 V\'tur. Güvenlik payıyla 1 W\'lık direnç önerilir.',
    ] },
    { h: 'Direnç watt değeri nasıl seçilir?', p: [
      'Dirençleri anma güçlerinin tam sınırında çalıştırmak doğru değildir. Anma gücü, belirli bir ortam sıcaklığına kadar ve serbest hava dolaşımı altında geçerlidir; ortam ısındıkça izin verilen güç azalır. Ayrıca sınırda çalışan direncin yüzeyi dokunulamayacak kadar sıcak olur ve yakınındaki elemanları, kartı ve lehimleri de ısıtır. Bu yüzden yaygın uygulama, direncin hesaplanan gücün en az iki katına dayanacak biçimde seçilmesidir.',
      'Araç, harcanan gücü güvenlik katsayısıyla çarpar ve piyasada sık bulunan değerlerden ilk yeterli olanı önerir: 0,125 W, 0,25 W, 0,5 W, 1 W, 2 W, 3 W, 5 W, 10 W, 25 W, 50 W ve 100 W. Yaklaşık 2 W\'a kadar olan değerler çoğunlukla karbon ya da metal film dirençlerdir; daha yüksek güçlerde tel sargılı, seramik (taş) gövdeli ya da alüminyum kasalı, soğutucuya bağlanan dirençler kullanılır.',
      'Yüzeye montaj (SMD) dirençlerde anma gücü kılıf boyutuna bağlıdır ve delikli dirençlere göre belirgin biçimde düşüktür; küçük kılıflar watt\'ın onda biri ya da daha azına dayanır. SMD tasarımlarda kılıfın veri sayfasındaki güç değerini mutlaka denetleyin.',
    ] },
    { h: 'Gücü birden çok dirence paylaştırmak', p: [
      'Elinizde yeterli güçte direnç yoksa aynı toplam değeri birkaç dirençle kurarak gücü paylaştırabilirsiniz. Eşit değerli iki direnci seri bağlamak (her biri istenen değerin yarısı) ya da paralel bağlamak (her biri istenen değerin iki katı) gücü ikisi arasında eşit böler. Örneğin 100 Ω ve 1,44 W gereken yerde iki adet 200 Ω direnci paralel bağlarsanız her biri 0,72 W harcar. Dirençler eşit değilse güç eşit paylaşılmaz; seri bağlantıda büyük direnç, paralel bağlantıda küçük direnç daha çok ısınır.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarılar', ul: [
      'Kaynak gerilimini direnç gerilimi sanmak: LED ön direncinde direncin üzerindeki gerilim, kaynak gerilimi eksi LED gerilimidir.',
      'Miliamperi amper olarak yazmak: 20 mA için 0,02 girilmelidir; 20 yazılırsa güç bir milyon kat büyük çıkar.',
      'Darbeli yüklerde tepe gücü ortalama güçle karıştırmak: kısa darbelerde ortalama güç düşük olsa da direncin darbe dayanımı ayrıca değerlendirilmelidir.',
      'Yüksek güçlü dirençleri karta yapışık monte etmek: gövde ile kart arasında boşluk bırakmak ısının atılmasını kolaylaştırır.',
    ], p: [
      'Bu sayfa bilgilendirme amaçlı bir hesap aracıdır. Şebeke gerilimiyle çalışan ya da yüksek güç harcayan devrelerde yanık ve yangın riski vardır; eleman seçimini üretici veri sayfalarıyla doğrulayın ve gerektiğinde bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Dirençte harcanan güç hangi formülle bulunur?', 'Bildiğiniz büyüklüklere göre P = U × I, P = U² ÷ R ya da P = I² × R kullanılır. Üçü de aynı sonucu verir; araç seçtiğiniz çifte uygun olanı uygular.'],
    ['Çeyrek watt direnç en fazla ne kadar akım taşır?', 'Direnç değerine bağlıdır; sınır akım √(P ÷ R) ile bulunur. 100 Ω için 50 mA, 1 kΩ için yaklaşık 15,8 mA, 10 kΩ için 5 mA anma gücüne karşılık gelir. Uygulamada bu değerlerin altında kalmak gerekir.'],
    ['Direncin watt değeri büyük olursa devre değişir mi?', 'Hayır. Watt değeri yalnızca direncin dayanabildiği ısı gücünü gösterir; devrenin akımını ve gerilimini ohm değeri belirler. Daha büyük watt değerli direnç daha serin çalışır, yalnızca daha çok yer kaplar.'],
    ['Güvenlik katsayısını neden 2 alıyoruz?', 'Direncin anma gücünün yaklaşık yarısında çalışması sıcaklığını ve değer kaymasını azaltır, ömrünü uzatır. Sıcak ortamlarda ya da kapalı kutularda 3 ve üzeri katsayılar tercih edilir.'],
    ['Direnç ısınıyor ama yanmıyor, sorun var mı?', 'Güç dirençlerinin sıcak çalışması olağandır; ancak dokunulamayacak kadar ısınıyorsa anma gücüne yakın çalışıyor demektir. Bir üst güç değerine geçmek ya da havalandırmayı iyileştirmek yerinde olur.'],
    ['Alternatif akımda da bu hesap geçerli mi?', 'Saf dirençli yüklerde evet; gerilim ve akımın etkin (RMS) değerlerini kullanmanız yeterlidir. 230 V şebeke değeri zaten etkin değerdir.'],
    ['Sonuçtaki kJ değeri ne işe yarar?', 'Direncin bir saat boyunca çevresine yaydığı toplam ısı enerjisini gösterir. Kapalı bir kutunun ne kadar ısınacağını kabaca değerlendirmek ya da ısıtıcı elemanları karşılaştırmak için kullanılabilir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdıklarınız sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ohm-kanunu-hesapla', 'elektrik-gucu-hesapla', 'led-direnc-hesapla', 'seri-direnc-hesapla', 'paralel-direnc-hesapla', 'smd-direnc-kodu-coz'],
};
