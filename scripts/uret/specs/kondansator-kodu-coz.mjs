export default {
  slug: 'kondansator-kodu-coz',
  title: 'Kondansatör Kodu Çözme',
  h1Tail: '104, 472J, 4R7 gibi kodların değeri',
  pageTitle: 'Kondansatör Kodu Çözme – 104, 103, 472 Kaç Farad?',
  description: 'Seramik ve film kondansatörlerin üzerindeki 104, 472J, 4R7 gibi kodları çözün. Değeri pF, nF ve µF olarak, tolerans harfini ve değer aralığını gösterir.',
  card: 'Kondansatör üzerindeki 3 haneli kodu (104, 472J, 4R7) pF, nF ve µF değerine ve toleransına çevirin.',
  category: 'elektrik',
  keywords: ['kondansatör kodu çözme', '104 kondansatör kaç nF', 'kondansatör okuma', 'seramik kondansatör kodu', '103 kondansatör değeri', 'kondansatör tolerans harfi', 'mercimek kondansatör okuma'],
  lead: 'Seramik (mercimek), polyester ve SMD kondansatörlerin üzerinde yazan <strong>üç haneli kodu</strong> gerçek kapasite değerine çevirin. Kodu, varsa sonundaki tolerans harfiyle birlikte yazın; araç değeri pikofarad, nanofarad ve mikrofarad olarak verir.',
  button: 'Çöz',
  inputs: [
    { id: 'kod', label: 'Kondansatör kodu', type: 'text', placeholder: 'Örn. 104K', hint: 'Üç haneli kod (104), harfli kod (472J), R\'li kod (4R7) ya da doğrudan pF değeri (47) yazın.' },
  ],
  compute(v, h) {
    const kod = String(v.kod ?? '').trim().toUpperCase().replace(/\s+/g, '');
    if (kod === '') h.err('"Kondansatör kodu" alanını doldurun (örn. 104).');
    const toleranslar = {
      B: ['±0,1 pF', 'pf', 0.1, 0.1], C: ['±0,25 pF', 'pf', 0.25, 0.25], D: ['±0,5 pF', 'pf', 0.5, 0.5],
      F: ['±%1', 'yuzde', 1, 1], G: ['±%2', 'yuzde', 2, 2], J: ['±%5', 'yuzde', 5, 5], K: ['±%10', 'yuzde', 10, 10],
      M: ['±%20', 'yuzde', 20, 20], Z: ['+%80 / −%20', 'yuzde', 20, 80],
    };
    let pf, harf = '', tur;
    let m;
    if ((m = /^(\d{2})(\d)([A-Z])?$/.exec(kod))) {
      const taban = Number(m[1]);
      const us = Number(m[2]);
      if (taban === 0) h.err('Kodun ilk iki hanesi 00 olamaz. Kondansatörün üzerindeki yazıyı kontrol edin.');
      if (us === 7) h.err('Üçüncü hane 7 olan kod standart değildir. Kodu doğru okuduğunuzdan emin olun.');
      pf = us === 8 ? taban * 0.01 : us === 9 ? taban * 0.1 : taban * Math.pow(10, us);
      harf = m[3] || '';
      tur = 'Üç haneli kod (iki rakam + çarpan)';
    } else if ((m = /^(\d{1,2})([A-Z])?$/.exec(kod))) {
      pf = Number(m[1]);
      if (pf === 0) h.err('Kapasite sıfır olamaz. Kodu kontrol edin.');
      harf = m[2] || '';
      tur = 'Doğrudan pikofarad değeri';
    } else if ((m = /^(\d*)R(\d+)([A-Z])?$/.exec(kod)) && (m[1] !== '' || m[2] !== '')) {
      pf = Number((m[1] || '0') + '.' + m[2]);
      if (!(pf > 0)) h.err('Kapasite sıfır olamaz. Kodu kontrol edin.');
      harf = m[3] || '';
      tur = 'R\'li kod (R ondalık virgül yerindedir)';
    } else {
      h.err('Kod tanınmadı. 104, 472J, 4R7 ya da 47 biçiminde yazın; gerilim kodu ya da başka yazıları eklemeyin.');
    }
    if (harf === 'R') h.err('Kod tanınmadı. R harfi ondalık ayraç olarak kullanılır (örn. 4R7 = 4,7 pF).');
    if (harf && !toleranslar[harf]) h.err(`"${harf}" bilinen bir tolerans harfi değil. Desteklenen harfler: B, C, D, F, G, J, K, M, Z.`);
    const uygun = pf < 1000 ? h.sig(pf, 6) + ' pF' : pf < 1e6 ? h.sig(pf / 1000, 6) + ' nF' : h.sig(pf / 1e6, 6) + ' µF';
    const rows = [
      ['Kapasite', uygun],
      ['Pikofarad', h.fmt(pf, 2) + ' pF'],
      ['Nanofarad', h.fmt(pf / 1000, 5) + ' nF'],
      ['Mikrofarad', h.fmt(pf / 1e6, 8) + ' µF'],
      ['Kod türü', tur],
      ['Tolerans', harf ? `${toleranslar[harf][0]} (${harf})` : 'Belirtilmemiş'],
    ];
    if (harf) {
      const t = toleranslar[harf];
      const alt = t[1] === 'pf' ? pf - t[2] : pf * (1 - t[2] / 100);
      const ust = t[1] === 'pf' ? pf + t[3] : pf * (1 + t[3] / 100);
      rows.push(['Değer aralığı', `${h.fmt(Math.max(alt, 0), 3)} – ${h.fmt(ust, 3)} pF`]);
    }
    return { rows, note: 'Üç haneli kodda ilk iki rakam değeri, üçüncü rakam eklenecek sıfır sayısını verir; sonuç pikofarad cinsindendir.' };
  },
  cases: [
    { in: { kod: '104' }, out: { 'Kapasite': '100 nF', 'Pikofarad': '100.000 pF', 'Nanofarad': '100 nF', 'Mikrofarad': '0,1 µF', 'Tolerans': 'Belirtilmemiş' } },
    { in: { kod: '472J' }, out: { 'Kapasite': '4,7 nF', 'Pikofarad': '4.700 pF', 'Mikrofarad': '0,0047 µF', 'Tolerans': '±%5 (J)', 'Değer aralığı': '4.465 – 4.935 pF' } },
    { in: { kod: '220' }, out: { 'Kapasite': '22 pF', 'Nanofarad': '0,022 nF', 'Mikrofarad': '0,000022 µF' } },
    { in: { kod: '221' }, out: { 'Kapasite': '220 pF' } },
    { in: { kod: '4R7' }, out: { 'Kapasite': '4,7 pF', 'Pikofarad': '4,7 pF' } },
    { in: { kod: '47' }, out: { 'Kapasite': '47 pF', 'Kod türü': 'Doğrudan pikofarad değeri' } },
    { in: { kod: '105k' }, out: { 'Kapasite': '1 µF', 'Pikofarad': '1.000.000 pF', 'Tolerans': '±%10 (K)', 'Değer aralığı': '900.000 – 1.100.000 pF' } },
    { in: { kod: '103M' }, out: { 'Kapasite': '10 nF', 'Mikrofarad': '0,01 µF', 'Değer aralığı': '8.000 – 12.000 pF' } },
    { in: { kod: '229' }, out: { 'Kapasite': '2,2 pF' } },
    { in: { kod: '100D' }, out: { 'Kapasite': '10 pF', 'Tolerans': '±0,5 pF (D)', 'Değer aralığı': '9,5 – 10,5 pF' } },
    { in: { kod: '104Z' }, out: { 'Değer aralığı': '80.000 – 180.000 pF' } },
    { in: { kod: 'abc' }, error: true },
    { in: { kod: '' }, error: true },
    { in: { kod: '104X' }, error: true },
    { in: { kod: '1047' }, error: true },
  ],
  howto: [
    'Kondansatörün gövdesindeki kodu bulun. Küçük seramik ve polyester kondansatörlerde genellikle üç rakam, bazen ardından bir harf bulunur.',
    'Kodu "Kondansatör kodu" alanına yazın. Büyük ya da küçük harf fark etmez; "104k" ile "104K" aynı sonucu verir.',
    'Gövdede gerilim değeri (50V, 100V gibi) ya da üretici işareti varsa bunları yazmayın; yalnızca kapasite kodunu ve tolerans harfini girin.',
    '"Çöz" düğmesine basın. İlk satır değeri en okunaklı birimde, sonraki satırlar pikofarad, nanofarad ve mikrofarad karşılıklarını verir.',
    'Tolerans harfi yazdıysanız kondansatörün gerçek değerinin bulunabileceği alt ve üst sınır da gösterilir.',
  ],
  sections: [
    { h: 'Üç haneli kondansatör kodu nasıl okunur?', p: [
      'Küçük kondansatörlerin üzerine değeri açıkça yazacak yer yoktur; bu yüzden dirençlerdeki renk koduna benzeyen sayısal bir kısaltma kullanılır. Kodun <strong>ilk iki rakamı</strong> değerin anlamlı basamaklarıdır, <strong>üçüncü rakam</strong> ise bu sayının yanına kaç sıfır ekleneceğini söyler. Ortaya çıkan sayı her zaman <strong>pikofarad</strong> cinsindendir.',
      'Örnek: 104 kodunda ilk iki rakam 10, üçüncü rakam 4\'tür. 10\'un yanına dört sıfır eklenir: 100.000 pF. Bu da 100 nF, yani 0,1 µF demektir. Aynı mantıkla 472 kodu 47\'nin yanına iki sıfır, yani 4.700 pF (4,7 nF) eder; 220 kodu 22\'nin yanına sıfır tane sıfır, yani 22 pF\'tır. 220 ile 221\'i karıştırmak sık yapılan bir hatadır: ilki 22 pF, ikincisi 220 pF\'tır.',
    ] },
    { h: 'Özel durumlar: iki haneli kodlar, R harfi, 8 ve 9 çarpanı', p: [
      'Üzerinde yalnızca bir ya da iki rakam bulunan kondansatörlerde değer doğrudan pikofarad olarak yazılmıştır: "47" yazan mercimek kondansatör 47 pF\'tır.',
      '10 pF\'tan küçük değerlerde ondalık ayraç yerine <strong>R</strong> harfi kullanılır. 4R7, 4,7 pF anlamına gelir; R47 ise 0,47 pF\'tır.',
      'Üçüncü rakam 9 ise ilk iki rakam 0,1 ile, 8 ise 0,01 ile çarpılır. Buna göre 229 kodu 22 × 0,1 = 2,2 pF eder. Bu gösterim nadirdir ama küçük değerli SMD kondansatörlerin belgelerinde karşınıza çıkabilir. Üçüncü hanesi 7 olan kodlar bu sistemde kullanılmaz; böyle bir kod görüyorsanız yazıyı yanlış okumuş olabilirsiniz.',
    ] },
    { h: 'Tolerans harfleri', p: [
      'Kodun sonundaki harf, gerçek kapasitenin yazılı değerden ne kadar sapabileceğini gösterir. Küçük değerli kondansatörlerde sapma pikofarad olarak, diğerlerinde yüzde olarak verilir:',
    ], ul: [
      '<strong>B</strong>: ±0,1 pF · <strong>C</strong>: ±0,25 pF · <strong>D</strong>: ±0,5 pF',
      '<strong>F</strong>: ±%1 · <strong>G</strong>: ±%2',
      '<strong>J</strong>: ±%5 (film kondansatörlerde yaygın)',
      '<strong>K</strong>: ±%10 (seramiklerde en sık görülen)',
      '<strong>M</strong>: ±%20',
      '<strong>Z</strong>: +%80 / −%20 (değer yazılandan çok daha büyük çıkabilir)',
    ] },
    { h: 'Çözümlü örnek: 472J', p: [
      'Kod 472J olsun. İlk iki rakam 47, çarpan rakamı 2: 47 × 100 = 4.700 pF. Bu değer 4,7 nF ya da 0,0047 µF olarak da yazılır. J harfi yüzde 5 tolerans demektir; 4.700 pF\'ın yüzde 5\'i 235 pF eder. Dolayısıyla kondansatörün gerçek değeri 4.465 pF ile 4.935 pF arasında herhangi bir yerde olabilir. Kapasite ölçer bu aralıkta bir değer gösteriyorsa kondansatör sağlamdır.',
      'Bir örnek daha: 105K. 10\'un yanına beş sıfır 1.000.000 pF, yani 1 µF eder. K toleransıyla değer 0,9 µF ile 1,1 µF arasında olabilir.',
    ] },
    { h: 'Sık karşılaşılan kodlar', ul: [
      '<strong>100</strong> = 10 pF · <strong>220</strong> = 22 pF · <strong>470</strong> = 47 pF',
      '<strong>101</strong> = 100 pF · <strong>221</strong> = 220 pF · <strong>471</strong> = 470 pF',
      '<strong>102</strong> = 1 nF · <strong>222</strong> = 2,2 nF · <strong>472</strong> = 4,7 nF',
      '<strong>103</strong> = 10 nF · <strong>223</strong> = 22 nF · <strong>473</strong> = 47 nF',
      '<strong>104</strong> = 100 nF (0,1 µF) · <strong>224</strong> = 220 nF · <strong>474</strong> = 470 nF',
      '<strong>105</strong> = 1 µF · <strong>225</strong> = 2,2 µF · <strong>106</strong> = 10 µF',
    ] },
    { h: 'Kodun yanındaki diğer işaretler', p: [
      'Kondansatör gövdesinde kapasite kodundan başka bilgiler de bulunabilir. Çalışma gerilimi çoğu zaman açıkça (50V, 100V, 630V) yazılır; bazı film kondansatörlerde ise kapasite kodunun önünde bir rakam ve bir harften oluşan gerilim kodu yer alır, örneğin 1H 50 V, 2A 100 V anlamına gelir. Bu araç yalnızca kapasite kodunu ve tolerans harfini çözer; gerilim kodunu girmeyin.',
      'Elektrolitik kondansatörlerde kod kullanılmaz; değer ve gerilim "470µF 25V" biçiminde açıkça yazılıdır. Çok küçük SMD seramik kondansatörlerin üzerinde ise çoğunlukla hiçbir yazı bulunmaz; değerleri ancak ölçülerek ya da devre şemasından öğrenilir.',
    ] },
    { h: 'Uyarı', p: [
      'Kod, kondansatörün anma değerini verir; yaşlanma, sıcaklık ve uygulanan gerilim gerçek kapasiteyi değiştirebilir. Arızalı bir kondansatörü değiştirirken yalnızca kapasiteye değil, çalışma gerilimine ve tipine de dikkat edin; yenisinin anma gerilimi eskisinden düşük olmamalıdır. Bu sayfa bilgilendirme amaçlıdır. Şebeke gerilimine bağlı devrelerdeki kondansatörler (güvenlik sınıfı X ve Y tipleri dahil) yalnızca aynı sınıftan parçalarla ve işin uzmanı tarafından değiştirilmelidir.',
    ] },
  ],
  faq: [
    ['104 kondansatör kaç nF eder?', '104 kodu 10\'un yanına dört sıfır, yani 100.000 pF demektir. Bu da 100 nF ya da 0,1 µF\'a eşittir.'],
    ['103 kondansatörün değeri nedir?', '103 kodu 10.000 pF eder; yani 10 nF ya da 0,01 µF.'],
    ['Kodun sonundaki K ya da J harfi ne anlama gelir?', 'Tolerans harfidir. J yüzde 5, K yüzde 10, M yüzde 20 sapmaya izin verildiğini gösterir.'],
    ['220 ile 221 arasındaki fark nedir?', '220 kodu 22 pF, 221 kodu 220 pF\'tır. Üçüncü rakam eklenecek sıfır sayısıdır; 0 ise sıfır eklenmez.'],
    ['4R7 yazan kondansatör kaç pF?', 'R harfi ondalık virgül yerindedir; 4R7 kodu 4,7 pF anlamına gelir.'],
    ['Kondansatörün üzerinde sadece iki rakam varsa nasıl okunur?', 'Değer doğrudan pikofarad olarak yazılmıştır. Üzerinde 33 yazan seramik kondansatör 33 pF\'tır.'],
    ['Nanofaradı mikrofarada nasıl çeviririm?', 'Nanofarad değerini 1.000\'e bölün: 100 nF = 0,1 µF. Pikofaraddan nanofarada geçmek için de 1.000\'e bölünür: 4.700 pF = 4,7 nF.'],
    ['Yazdığım kod bir yere gönderiliyor mu?', 'Hayır. Kod yalnızca tarayıcınızda çözülür; sunucuya hiçbir veri iletilmez.'],
  ],
  related: ['kondansator-seri-paralel-hesapla', 'kondansator-enerjisi-hesapla', 'direnc-renk-kodu-hesapla', 'smd-direnc-kodu-coz', 'rc-zaman-sabiti-hesapla'],
};
