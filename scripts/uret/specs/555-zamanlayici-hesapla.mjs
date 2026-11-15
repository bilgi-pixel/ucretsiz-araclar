export default {
  slug: '555-zamanlayici-hesapla',
  title: '555 Zamanlayıcı Devre Hesaplama',
  h1Tail: 'kararsız ve tek atımlı',
  pageTitle: '555 Zamanlayıcı Hesaplama – Astable Frekans ve Monostable Süre',
  description: 'NE555 entegresiyle kurulan kararsız (astable) devrenin frekansını ve görev döngüsünü, tek atımlı (monostable) devrenin darbe süresini direnç ve kondansatörden hesaplayın.',
  card: '555 entegresinin astable frekansını, görev döngüsünü ve monostable darbe süresini R ve C değerlerinden hesaplayın.',
  category: 'elektrik',
  keywords: ['555 hesaplama', 'ne555 frekans hesaplama', '555 astable hesaplama', '555 monostable süre', '555 zamanlayıcı devre', 'ne555 görev döngüsü', '555 flaşör hesabı'],
  lead: `555 zamanlayıcı entegresiyle kuracağınız devrenin zamanlamasını direnç ve kondansatör değerlerinden hesaplayın. <strong>Kararsız (astable)</strong> modda frekans, periyot ve görev döngüsünü; <strong>tek atımlı (monostable)</strong> modda çıkış darbesinin süresini verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Çalışma modu', type: 'select', options: [['astable', 'Kararsız (astable) – sürekli kare dalga'], ['mono', 'Tek atımlı (monostable) – tek darbe']] },
    { id: 'r1', label: 'R1 direnci (kΩ)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'r2', label: 'R2 direnci (kΩ)', type: 'number', placeholder: 'Örn. 10', hint: 'Yalnızca kararsız modda kullanılır.' },
    { id: 'c', label: 'C kondansatörü', type: 'number', placeholder: 'Örn. 10' },
    { id: 'cb', label: 'Kondansatör birimi', type: 'select', options: [['uF', 'µF (mikrofarad)'], ['nF', 'nF (nanofarad)'], ['pF', 'pF (pikofarad)']] },
  ],
  compute(v, h) {
    const sure = (s) => {
      if (s >= 1 - 1e-9) return h.sig(s, 4) + ' s';
      if (s >= 1e-3 - 1e-12) return h.sig(s * 1e3, 4) + ' ms';
      return h.sig(s * 1e6, 4) + ' µs';
    };
    const frek = (f) => {
      if (f >= 1e6 - 1e-3) return h.sig(f / 1e6, 4) + ' MHz';
      if (f >= 1e3 - 1e-6) return h.sig(f / 1e3, 4) + ' kHz';
      return h.sig(f, 4) + ' Hz';
    };
    const r1 = h.pos(v.r1, 'R1 direnci') * 1e3;
    const carpan = v.cb === 'pF' ? 1e-12 : v.cb === 'nF' ? 1e-9 : 1e-6;
    const c = h.pos(v.c, 'C kondansatörü') * carpan;
    if (v.mod === 'mono') {
      const t = 1.1 * r1 * c;
      return {
        rows: [
          ['Darbe süresi', sure(t)],
          ['Zaman sabiti (R1 × C)', sure(r1 * c)],
        ],
        note: 'T = 1,1 × R1 × C. Tetikleme darbesi bu süreden kısa olmalıdır; gerçek süre eleman toleranslarına göre değişir.',
      };
    }
    const r2 = h.pos(v.r2, 'R2 direnci') * 1e3;
    const ln2 = Math.LN2;
    const th = ln2 * (r1 + r2) * c;
    const tl = ln2 * r2 * c;
    const T = th + tl;
    return {
      rows: [
        ['Frekans', frek(1 / T)],
        ['Periyot', sure(T)],
        ['Yüksek süre', sure(th)],
        ['Düşük süre', sure(tl)],
        ['Görev döngüsü', h.fmt((th / T) * 100, 2) + ' %'],
      ],
      note: 'f = 1,44 ÷ ((R1 + 2 × R2) × C). Standart bağlantıda görev döngüsü her zaman %50\'nin üzerindedir.',
    };
  },
  cases: [
    { in: { mod: 'astable', r1: '1', r2: '10', c: '10', cb: 'uF' }, out: { 'Frekans': '6,87 Hz', 'Periyot': '145,6 ms', 'Yüksek süre': '76,25 ms', 'Düşük süre': '69,31 ms', 'Görev döngüsü': '52,38 %' } },
    { in: { mod: 'mono', r1: '100', c: '10', cb: 'uF' }, out: { 'Darbe süresi': '1,1 s', 'Zaman sabiti (R1 × C)': '1 s' } },
    { in: { mod: 'astable', r1: '10', r2: '100', c: '10', cb: 'nF' }, out: { 'Frekans': '687 Hz', 'Periyot': '1,456 ms', 'Yüksek süre': '762,5 µs', 'Düşük süre': '693,1 µs', 'Görev döngüsü': '52,38 %' } },
    { in: { mod: 'astable', r1: '4,7', r2: '4,7', c: '1', cb: 'uF' }, out: { 'Frekans': '102,3 Hz', 'Periyot': '9,773 ms', 'Yüksek süre': '6,516 ms', 'Düşük süre': '3,258 ms', 'Görev döngüsü': '66,67 %' } },
    { in: { mod: 'mono', r1: '10', c: '100', cb: 'nF' }, out: { 'Darbe süresi': '1,1 ms' } },
    { in: { mod: 'mono', r1: '1000', c: '100', cb: 'uF' }, out: { 'Darbe süresi': '110 s' } },
    { in: { mod: 'astable', r1: '1', r2: '1', c: '480', cb: 'pF' }, out: { 'Frekans': '1,002 MHz', 'Görev döngüsü': '66,67 %' } },
    { in: { mod: 'astable', r1: '1', r2: '', c: '10', cb: 'uF' }, error: true },
    { in: { mod: 'mono', r1: '10', c: '0', cb: 'uF' }, error: true },
    { in: { mod: 'astable', r1: '-1', r2: '10', c: '10', cb: 'uF' }, error: true },
  ],
  howto: [
    `"Çalışma modu" listesinden devrenizin türünü seçin: sürekli kare dalga üreten kararsız mod ya da tetiklenince tek darbe veren tek atımlı mod.`,
    `R1 direncini kiloohm olarak yazın. 4,7 kΩ için 4,7; 470 Ω için 0,47; 1 MΩ için 1000 girin.`,
    `Kararsız modda R2 direncini de kiloohm olarak yazın. Tek atımlı modda bu alan boş bırakılabilir.`,
    `Zamanlama kondansatörünün değerini yazıp birimini (µF, nF ya da pF) seçin.`,
    `"Hesapla" düğmesine basın. Kararsız modda frekans, periyot, yüksek ve düşük süreler ile görev döngüsü; tek atımlı modda darbe süresi gösterilir.`,
  ],
  sections: [
    { h: '555 entegresi ne yapar?', p: [
      `555, 1970'lerin başından beri üretilen ve hâlâ en çok kullanılan zamanlayıcı entegrelerinden biridir. İçinde besleme gerilimini üçe bölen bir direnç zinciri, iki karşılaştırıcı, bir flip-flop ve bir boşaltma transistörü bulunur. Dışarıdan bağlanan kondansatörün gerilimi beslemenin üçte birinin altına indiğinde çıkış yükselir, üçte ikisinin üzerine çıktığında çıkış düşer ve boşaltma transistörü kondansatörü boşaltmaya başlar.`,
      `Eşikler besleme geriliminin sabit oranları olduğu için zamanlama, ideal durumda besleme geriliminden bağımsızdır; yalnızca direnç ve kondansatör değerleri belirleyicidir. Bu sayfadaki hesapların besleme gerilimi sormamasının nedeni budur.`,
    ] },
    { h: 'Kararsız (astable) mod formülleri', p: [
      `Kararsız bağlantıda R1 besleme ile boşaltma ucu (7 numaralı bacak) arasına, R2 boşaltma ucu ile eşik ve tetikleme uçları (6 ve 2) arasına, C ise bu uçlarla şase arasına bağlanır. Kondansatör R1 ve R2 üzerinden dolar, yalnızca R2 üzerinden boşalır. Buna göre:`,
    ], ul: [
      `<strong>Yüksek süre:</strong> t<sub>H</sub> = 0,693 × (R1 + R2) × C`,
      `<strong>Düşük süre:</strong> t<sub>L</sub> = 0,693 × R2 × C`,
      `<strong>Periyot:</strong> T = 0,693 × (R1 + 2 × R2) × C`,
      `<strong>Frekans:</strong> f = 1,44 ÷ ((R1 + 2 × R2) × C)`,
      `<strong>Görev döngüsü:</strong> D = (R1 + R2) ÷ (R1 + 2 × R2)`,
    ] },
    { h: 'Çözümlü örnek: LED flaşör', p: [
      `R1 = 1 kΩ, R2 = 10 kΩ ve C = 10 µF seçelim. Yüksek süre 0,693 × 11 000 Ω × 0,00001 F = 76,25 ms, düşük süre 0,693 × 10 000 × 0,00001 = 69,31 ms çıkar. Periyot bu ikisinin toplamı olan 145,6 ms, frekans 1 ÷ 0,1456 = <strong>6,87 Hz</strong> olur. Görev döngüsü 11 ÷ 21 = %52,38'dir. Çıkışa bağlı bir LED saniyede yaklaşık yedi kez yanıp söner.`,
      `Daha yavaş bir flaşör isterseniz kondansatörü büyütün: aynı dirençlerle C = 100 µF seçildiğinde frekans on kat düşerek 0,687 Hz'e, yani yaklaşık 1,5 saniyede bir yanıp sönmeye iner.`,
    ] },
    { h: 'Tek atımlı (monostable) mod', p: [
      `Tek atımlı bağlantıda tetikleme ucuna kısa bir düşük darbe geldiğinde çıkış yükselir ve kondansatör R1 üzerinden beslemenin üçte ikisine dolana kadar yüksek kalır. Bu süre <strong>T = 1,1 × R1 × C</strong> formülüyle bulunur; 1,1 katsayısı 3'ün doğal logaritmasının yuvarlanmış hâlidir.`,
      `Örnek: R1 = 100 kΩ ve C = 10 µF için zaman sabiti 100 000 × 0,00001 = 1 saniye, darbe süresi 1,1 saniyedir. Bir butona basıldığında röleyi belirli bir süre çekili tutmak, merdiven otomatiği benzeri gecikmeler ya da buton sıçramasını temizlemek bu modun tipik kullanım alanlarıdır.`,
    ] },
    { h: 'Görev döngüsü neden %50 olmuyor?', p: [
      `Standart kararsız bağlantıda kondansatör dolarken R1 + R2, boşalırken yalnızca R2 devrededir. Bu yüzden yüksek süre her zaman düşük süreden uzundur ve görev döngüsü %50'nin altına inemez. R1, R2'ye göre ne kadar küçük seçilirse oran %50'ye o kadar yaklaşır; ancak R1 çok küçültülürse boşaltma transistöründen geçen akım artar.`,
      `Tam %50 ya da daha düşük görev döngüsü gerekiyorsa R2'ye paralel bir diyot bağlanarak dolma yalnızca R1, boşalma yalnızca R2 üzerinden yaptırılır. Bu durumda formüller değişir ve bu sayfadaki hesap geçerli olmaz.`,
    ] },
    { h: 'Eleman seçerken pratik sınırlar', ul: [
      `Dirençleri kabaca 1 kΩ ile 1 MΩ arasında tutun. Çok küçük direnç entegreyi zorlar, çok büyük direnç kaçak akımlar yüzünden zamanlamayı bozar.`,
      `Elektrolitik kondansatörlerin toleransı geniştir ve kaçak akımları yüksektir; uzun sürelerde hesaplanan değerden belirgin sapma beklenir.`,
      `Klasik bipolar 555 birkaç yüz kilohertzin üzerinde güvenilir çalışmaz; CMOS sürümleri daha yüksek frekanslara çıkabilir. Kesin sınır için kullandığınız entegrenin veri sayfasına bakın.`,
      `Kontrol ucu (5 numaralı bacak) kullanılmıyorsa küçük bir kondansatörle şaseye bağlanması gürültü bağışıklığını artırır.`,
      `Çok uzun gecikmeler (dakikalar, saatler) için 555 yerine sayıcılı bir çözüm ya da mikrodenetleyici daha kararlı sonuç verir.`,
    ] },
    { h: 'Hesap ile ölçüm neden tutmayabilir?', p: [
      `Formüller ideal elemanlar içindir. Gerçekte dirençlerin %1–5, seramik ve elektrolitik kondansatörlerin %10–20 ve daha fazla toleransı vardır; sıcaklık da değerleri kaydırır. Ayrıca entegrenin kendi gecikmeleri yüksek frekanslarda periyoda eklenir. Hassas frekans gerekiyorsa R2 yerine bir trimpot kullanıp osiloskop ya da frekansmetreyle ayar yapmak en sağlıklı yoldur. Bu sayfadaki sonuçlar tasarım başlangıcı için bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['555 ile 1 Hz nasıl elde edilir?', `Örneğin R1 = 1 kΩ, R2 = 68 kΩ ve C = 10 µF seçildiğinde frekans 1,44 ÷ (137 000 × 0,00001) ≈ 1,05 Hz olur. Tam 1 Hz için R2 yerine trimpot kullanıp ince ayar yapabilirsiniz.`],
    ['Formüldeki 0,693 ve 1,44 nereden geliyor?', `0,693, 2'nin doğal logaritmasıdır; kondansatör geriliminin beslemenin üçte biri ile üçte ikisi arasında gidip gelme süresinden doğar. 1,44 ise bu sayının tersidir (1 ÷ 0,693).`],
    ['Besleme gerilimi frekansı etkiler mi?', `İdeal durumda hayır, çünkü eşik gerilimleri beslemenin sabit oranlarıdır. Uygulamada küçük bir etki görülebilir; bu yüzden hesapta besleme gerilimi sorulmaz.`],
    ['Direnci ohm olarak nasıl girerim?', `Alanlar kiloohm cinsindendir. 470 Ω için 0,47; 2,2 kΩ için 2,2; 1 MΩ için 1000 yazın.`],
    ['Tek atımlı modda R2 alanını doldurmam gerekir mi?', `Hayır. Tek atımlı devrede yalnızca bir direnç ve bir kondansatör zamanlamayı belirler; R2 alanı dikkate alınmaz.`],
    ['Görev döngüsünü %50 yapabilir miyim?', `Standart bağlantıda tam %50 olmaz, ancak R1'i R2'ye göre çok küçük seçerek yaklaşabilirsiniz. Tam %50 için diyotlu bağlantı ya da çıkışı ikiye bölen bir flip-flop kullanılır.`],
    ['NE555 ile CMOS 555 için formül aynı mı?', `Evet, zamanlama formülleri aynıdır. CMOS sürümler daha az akım çeker, daha düşük gerilimde ve daha yüksek frekansta çalışabilir; ayrıntılar için ilgili veri sayfasına bakın.`],
    ['Girdiğim değerler kaydediliyor mu?', `Hayır. Hesap tarayıcınızda yapılır, değerler hiçbir sunucuya gönderilmez.`],
  ],
  related: ['rc-zaman-sabiti-hesapla', 'pwm-gorev-dongusu-hesapla', 'led-direnc-hesapla', 'kondansator-kodu-coz', 'rc-filtre-kesim-frekansi-hesapla'],
};
