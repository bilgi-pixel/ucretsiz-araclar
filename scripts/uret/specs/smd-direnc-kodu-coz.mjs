export default {
  slug: 'smd-direnc-kodu-coz',
  title: 'SMD Direnç Kodu Çözme',
  h1Tail: '3 hane, 4 hane, EIA-96',
  pageTitle: 'SMD Direnç Kodu Çözme – 3 ve 4 Haneli Kod, EIA-96 Okuma',
  description: 'SMD direncin üzerindeki kodu yazın, ohm değerini öğrenin. 3 haneli (103), 4 haneli (1002), R\'li (4R7) ve EIA-96 (01C) kodlarını çözer.',
  card: 'SMD direncin üzerindeki 103, 4R7, 1002 ya da 01C gibi kodu yazın; direnç değerini ohm olarak görün.',
  category: 'elektrik',
  keywords: ['smd direnç kodu', 'smd direnç okuma', '103 direnç kaç ohm', 'smd direnç hesaplama', 'eia-96 kod tablosu', '4r7 direnç', 'smd direnç değeri bulma'],
  lead: `Yüzey montaj (SMD) direncin üzerinde yazan kodu girin; araç kodun türünü tanıyıp <strong>direnç değerini</strong> ohm, kiloohm ya da megaohm olarak göstersin. Üç haneli, dört haneli, ondalık harfli (R, K, M) ve EIA-96 kodları desteklenir.`,
  button: 'Çöz',
  inputs: [
    { id: 'kod', label: 'Direnç üzerindeki kod', type: 'text', placeholder: 'Örn. 103, 4R7, 1002, 01C' },
  ],
  compute(v, h) {
    const kod = String(v.kod ?? '').trim().toUpperCase().replace(/[\s_]/g, '');
    if (!kod) h.err('Direncin üzerindeki kodu yazın (örn. 103).');
    const e96 = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174,
      178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309,
      316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549,
      562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
    const carpanlar = { Z: 0.001, Y: 0.01, X: 0.1, S: 0.1, A: 1, B: 10, H: 10, C: 100, D: 1000, E: 10000, F: 100000 };
    let ohm, tur, tol, m;
    if (/^0+$/.test(kod)) {
      ohm = 0; tur = 'Sıfır ohm köprü (jumper)'; tol = '—';
    } else if ((m = /^(\d*)([RKM])(\d*)$/.exec(kod)) && (m[1] + m[3]).length >= 1 && kod.length <= 5) {
      const taban = Number((m[1] || '0') + '.' + (m[3] || '0'));
      ohm = taban * (m[2] === 'K' ? 1e3 : m[2] === 'M' ? 1e6 : 1);
      tur = 'Ondalık harfli kod (' + m[2] + ' = ondalık virgül)';
      tol = kod.length >= 4 ? 'Genellikle %1' : 'Genellikle %5';
    } else if ((m = /^(\d{2})([ZYXSABHCDEF])$/.exec(kod))) {
      const sira = Number(m[1]);
      if (sira < 1 || sira > 96) h.err('EIA-96 kodunda ilk iki hane 01 ile 96 arasında olmalı.');
      ohm = e96[sira - 1] * carpanlar[m[2]];
      tur = 'EIA-96 (2 hane + harf)'; tol = 'Genellikle %1';
    } else if (/^\d{3}$/.test(kod)) {
      ohm = Number(kod.slice(0, 2)) * Math.pow(10, Number(kod[2]));
      tur = '3 haneli kod'; tol = 'Genellikle %5';
    } else if (/^\d{4}$/.test(kod)) {
      ohm = Number(kod.slice(0, 3)) * Math.pow(10, Number(kod[3]));
      tur = '4 haneli kod'; tol = 'Genellikle %1';
    } else {
      h.err('Kod tanınamadı. 103, 4702, 4R7, R47, 2K2 ya da 01C biçiminde bir kod yazın.');
    }
    if (ohm === 0 && tur.indexOf('köprü') < 0) { tur = 'Sıfır ohm köprü (jumper)'; tol = '—'; }
    const yaz = (x) => {
      if (x === 0) return '0 Ω';
      if (x >= 1e6 * (1 - 1e-9)) return h.sig(x / 1e6, 6) + ' MΩ';
      if (x >= 1e3 * (1 - 1e-9)) return h.sig(x / 1e3, 6) + ' kΩ';
      if (x >= 0.1 * (1 - 1e-9)) return h.sig(x, 6) + ' Ω';
      return h.sig(x * 1e3, 6) + ' mΩ';
    };
    return {
      rows: [
        ['Direnç', yaz(ohm)],
        ['Ohm cinsinden', h.sig(ohm, 6) + ' Ω'],
        ['Kod türü', tur],
        ['Tipik tolerans', tol],
      ],
      note: 'Tolerans kodun kendisinden kesin okunamaz; yukarıdaki değer yaygın kullanıma göre tahmindir. Şüphede kalırsanız direnci devreden ayırıp ölçün.',
    };
  },
  cases: [
    { in: { kod: '103' }, out: { 'Direnç': '10 kΩ', 'Ohm cinsinden': '10.000 Ω', 'Kod türü': '3 haneli kod' } },
    { in: { kod: '4R7' }, out: { 'Direnç': '4,7 Ω', 'Kod türü': 'Ondalık harfli kod (R = ondalık virgül)' } },
    { in: { kod: '472' }, out: { 'Direnç': '4,7 kΩ', 'Ohm cinsinden': '4.700 Ω' } },
    { in: { kod: '1002' }, out: { 'Direnç': '10 kΩ', 'Kod türü': '4 haneli kod', 'Tipik tolerans': 'Genellikle %1' } },
    { in: { kod: '4702' }, out: { 'Direnç': '47 kΩ' } },
    { in: { kod: '000' }, out: { 'Direnç': '0 Ω', 'Kod türü': 'Sıfır ohm köprü (jumper)' } },
    { in: { kod: 'R47' }, out: { 'Direnç': '0,47 Ω' } },
    { in: { kod: '01C' }, out: { 'Direnç': '10 kΩ', 'Kod türü': 'EIA-96 (2 hane + harf)' } },
    { in: { kod: '68X' }, out: { 'Direnç': '49,9 Ω' } },
    { in: { kod: '30c' }, out: { 'Direnç': '20 kΩ' } },
    { in: { kod: '100' }, out: { 'Direnç': '10 Ω' } },
    { in: { kod: '105' }, out: { 'Direnç': '1 MΩ' } },
    { in: { kod: '2k2' }, out: { 'Direnç': '2,2 kΩ' } },
    { in: { kod: 'R005' }, out: { 'Direnç': '5 mΩ', 'Ohm cinsinden': '0,005 Ω' } },
    { in: { kod: '220' }, out: { 'Direnç': '22 Ω' } },
    { in: { kod: '01Y' }, out: { 'Direnç': '1 Ω' } },
    { in: { kod: 'XYZ' }, error: true },
    { in: { kod: '' }, error: true },
    { in: { kod: '12' }, error: true },
    { in: { kod: '97A' }, error: true },
  ],
  howto: [
    `Direncin üst yüzeyindeki yazıyı büyüteç ya da telefon kamerasının yakınlaştırmasıyla okuyun. Kodu doğru yönde okuduğunuzdan emin olun; altı çizili haneler yön ipucu verir.`,
    `Okuduğunuz kodu "Direnç üzerindeki kod" alanına yazın. Büyük-küçük harf fark etmez.`,
    `"Çöz" düğmesine basın. Direnç değeri, ohm karşılığı, kodun türü ve bu kod türünde yaygın olan tolerans gösterilir.`,
    `Sonuç devrenin geri kalanıyla tutarsız görünüyorsa kodu ters okumuş olabilirsiniz; hanelerin sırasını çevirip yeniden deneyin ya da direnci ölçü aletiyle kontrol edin.`,
  ],
  sections: [
    { h: 'SMD dirençlerde neden kod kullanılır?', p: [
      `Bacaklı dirençlerde değer renk bantlarıyla gösterilir; ancak yüzey montaj dirençlerin gövdesi birkaç milimetre, hatta bir milimetrenin altında olduğundan renk bandı basmak mümkün değildir. Bunun yerine gövdeye üç ya da dört karakterlik bir kod yazılır. Kod, direncin değerini bilimsel gösterime benzer bir biçimde sıkıştırır: baştaki haneler anlamlı rakamları, son hane ise çarpanı, yani arkaya eklenecek sıfır sayısını verir.`,
      `Çok küçük kılıflarda (0402 ve daha küçükleri) çoğunlukla hiç yazı bulunmaz; bu dirençlerin değeri yalnızca ölçülerek ya da devre şemasından öğrenilebilir.`,
    ] },
    { h: 'Üç haneli kod', p: [
      `En yaygın biçimdir ve genellikle %5 toleranslı dirençlerde görülür. İlk iki hane anlamlı rakamlar, üçüncü hane on üzeri çarpandır. <strong>103</strong> kodu 10 × 10³ = 10 000 Ω, yani 10 kΩ'dur. <strong>472</strong> kodu 47 × 10² = 4700 Ω, yani 4,7 kΩ eder. <strong>220</strong> kodu 22 × 10⁰ = 22 Ω'dur; 220 Ω değildir. 220 ohm'luk direncin kodu 221'dir. Bu, en sık yapılan okuma hatasıdır.`,
    ] },
    { h: 'Dört haneli kod', p: [
      `%1 toleranslı dirençlerde üç anlamlı rakam gerektiğinden kod dört haneye çıkar. İlk üç hane rakamları, dördüncü hane çarpanı verir. <strong>1002</strong> kodu 100 × 10² = 10 000 Ω (10 kΩ), <strong>4702</strong> kodu 470 × 10² = 47 kΩ, <strong>1000</strong> kodu ise 100 × 10⁰ = 100 Ω'dur. Aynı 10 kΩ değerinin üç haneli kodda 103, dört haneli kodda 1002 olarak yazıldığına dikkat edin.`,
    ] },
    { h: 'R, K ve M harfli kodlar', p: [
      `10 ohm'un altındaki değerlerde çarpan hanesi işe yaramaz; bunun yerine ondalık virgülün yerine <strong>R</strong> harfi konur. <strong>4R7</strong> 4,7 Ω, <strong>R47</strong> 0,47 Ω, <strong>0R1</strong> 0,1 Ω demektir. Akım ölçme (şönt) dirençlerinde <strong>R005</strong> gibi kodlar görülür; bu 0,005 Ω, yani 5 miliohm'dur.`,
      `Bazı üreticiler aynı yöntemi kiloohm ve megaohm için K ve M harfleriyle uygular: <strong>2K2</strong> 2,2 kΩ, <strong>1M5</strong> 1,5 MΩ anlamına gelir. Araç bu yazımları da çözer.`,
    ] },
    { h: 'EIA-96 kodu', p: [
      `Küçük kılıflı %1 dirençlerde dört hane sığmadığı için EIA-96 sistemi kullanılır: iki rakam ve bir harf. İki rakam, E96 serisindeki 96 standart değerden birinin sıra numarasıdır (01 → 100, 02 → 102, … 96 → 976). Harf ise çarpanı verir.`,
    ], ul: [
      `<strong>Z</strong> = × 0,001`,
      `<strong>Y</strong> = × 0,01`,
      `<strong>X</strong> ya da <strong>S</strong> = × 0,1`,
      `<strong>A</strong> = × 1`,
      `<strong>B</strong> ya da <strong>H</strong> = × 10`,
      `<strong>C</strong> = × 100`,
      `<strong>D</strong> = × 1000`,
      `<strong>E</strong> = × 10 000`,
      `<strong>F</strong> = × 100 000`,
    ] },
    { h: 'Çözümlü EIA-96 örnekleri', p: [
      `<strong>01C:</strong> 01 numaralı değer 100'dür; C harfi 100 ile çarpar. 100 × 100 = 10 000 Ω, yani 10 kΩ. <strong>68X:</strong> 68 numaralı değer 499'dur; X harfi 0,1 ile çarpar. 499 × 0,1 = 49,9 Ω. <strong>30C:</strong> 30 numaralı değer 200'dür; 200 × 100 = 20 kΩ.`,
      `Bazı kaynaklarda Y harfinin yerine R kullanıldığı görülür. Ancak "10R" gibi bir yazım çok daha sık olarak düz 10 Ω anlamında kullanıldığı için bu araç sonda R bulunan kodları ondalık harfli kod olarak yorumlar. EIA-96 kodu çözdürmek istiyorsanız 0,01 çarpanı için Y yazın.`,
    ] },
    { h: 'Sıfır ohm dirençler ve özel durumlar', p: [
      `Üzerinde <strong>0</strong>, <strong>000</strong> ya da <strong>0000</strong> yazan parçalar sıfır ohm dirençtir. Bunlar gerçekte birer köprüdür; tek katlı kartlarda bir yolun üzerinden atlamak ya da üretimde seçenekli bağlantılar kurmak için kullanılır. Ölçtüğünüzde kısa devreye yakın bir değer görmeniz normaldir.`,
      `Bir hanenin altındaki çizgi bazı üreticilerde farklı anlamlar taşır; örneğin tüm kodun altı çiziliyse değerin ohm'un kesri olduğunu belirtebilir. Bu tür üreticiye özgü işaretlemeler standart değildir ve bu araç tarafından yorumlanmaz. Ayrıca SMD kondansatörlerin çoğunda yazı bulunmaz, SMD bobinlerde ise benzer görünen kodlar mikrohenri cinsinden okunur; parçanın direnç olduğundan emin olun.`,
    ] },
    { h: 'Onarımda pratik öneriler', p: [
      `Yanmış bir direncin kodu okunmuyorsa aynı karttaki simetrik devrelere ya da aynı cihazın sağlam bir örneğine bakmak işe yarar. Devre üzerinde ölçüm yaparken paralel elemanlar değeri düşük gösterebilir; kesin sonuç için direncin en az bir ucunu kaldırmak gerekir. Değiştirirken yalnızca ohm değerine değil kılıf boyutuna ve güç değerine de dikkat edin; daha küçük kılıflı bir direnç aynı gücü taşıyamayabilir. Enerjili kartta ölçüm yapmayın; bu sayfa bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['103 yazan SMD direnç kaç ohm?', `10 kΩ. İlk iki hane 10, üçüncü hane çarpandır: 10 × 10³ = 10 000 Ω.`],
    ['220 yazan direnç 220 ohm mu?', `Hayır, 22 Ω'dur. Son hane sıfır sayısını gösterir; 22 × 10⁰ = 22. 220 Ω'luk direncin üç haneli kodu 221'dir.`],
    ['4R7 ne demek?', `R harfi ondalık virgülün yerini tutar; 4R7, 4,7 Ω demektir. Aynı şekilde R47 0,47 Ω, 47R ise 47 Ω'dur.`],
    ['01C kodu neye karşılık gelir?', `EIA-96 kodudur. 01, E96 serisinin ilk değeri olan 100'ü; C harfi 100 çarpanını gösterir. Sonuç 10 kΩ'dur.`],
    ['Üç haneli ve dört haneli kod arasındaki fark nedir?', `Üç haneli kodda iki, dört haneli kodda üç anlamlı rakam vardır. Dört haneli kod genellikle %1 toleranslı hassas dirençlerde kullanılır. 10 kΩ üç hanede 103, dört hanede 1002 olarak yazılır.`],
    ['Üzerinde yalnızca 0 yazan parça nedir?', `Sıfır ohm dirençtir; devrede köprü görevi görür. Arızalı sanılıp değiştirilmesi gerekmez, ölçümde kısa devre göstermesi normaldir.`],
    ['Kodsuz SMD direncin değerini nasıl bulurum?', `Küçük kılıflarda yazı olmaz. Direnci devreden ayırıp ölçü aletiyle ölçmek ya da cihazın şemasına bakmak gerekir.`],
    ['Tolerans koddan anlaşılır mı?', `Kesin olarak anlaşılmaz. Üç haneli kodlar çoğunlukla %5, dört haneli ve EIA-96 kodları çoğunlukla %1 dirençlerde kullanılır; araç bu yaygın eşleşmeyi tahmin olarak gösterir.`],
    ['Yazdığım kod bir yere gönderiliyor mu?', `Hayır. Kod tarayıcınızda çözülür; hiçbir veri sunucuya iletilmez.`],
  ],
  related: ['kondansator-kodu-coz', 'ohm-kanunu-hesapla', 'seri-direnc-hesapla', 'paralel-direnc-hesapla', 'isi-kaybi-direnc-hesapla', 'led-direnc-hesapla'],
};
