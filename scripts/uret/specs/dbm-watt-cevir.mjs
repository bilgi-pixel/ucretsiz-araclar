export default {
  slug: 'dbm-watt-cevir',
  title: 'dBm Watt Çevirici',
  h1Tail: 'dBm ↔ W, mW',
  pageTitle: 'dBm Watt Çevirici – dBm\'den Watt ve Miliwatta, Watt\'tan dBm\'e',
  description: 'dBm değerini watt ve miliwatta, watt ya da miliwatt değerini dBm\'e çevirin. dBW karşılığını ve 50 ohm yükteki RMS gerilimi de gösterir.',
  card: 'dBm değerini watt ve miliwatta, watt değerini dBm\'e çevirin; dBW ve 50 Ω gerilim karşılığıyla birlikte.',
  category: 'elektrik',
  keywords: ['dbm watt çevirme', 'dbm kaç watt', 'watt dbm hesaplama', 'dbm mw çevirici', '30 dbm kaç watt', 'dbm hesaplama', 'dbw dbm'],
  lead: `Bir RF ya da optik güç seviyesini <strong>dBm</strong> ile <strong>watt</strong> arasında çevirin. Araç 0 dBm = 1 mW tanımını kullanır; sonucu miliwatt, watt ve dBW olarak, ayrıca 50 Ω yükteki RMS gerilimle birlikte verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 20' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['dbm', 'dBm → Watt'], ['w', 'Watt → dBm'], ['mw', 'Miliwatt → dBm']] },
  ],
  compute(v, h) {
    const olcek = (x, birimler) => {
      for (const [k, ad] of birimler) if (x >= k * (1 - 1e-9)) return h.sig(x / k, 6) + ' ' + ad;
      return h.sig(x, 6) + ' ' + birimler[birimler.length - 1][1].replace(/^./, '');
    };
    let dbm, w;
    if (v.yon === 'dbm') {
      dbm = h.num(v.deger, 'Değer');
      if (Math.abs(dbm) > 200) h.err('dBm değeri −200 ile 200 arasında olmalı.');
      w = Math.pow(10, dbm / 10) / 1000;
    } else {
      const x = h.pos(v.deger, 'Değer');
      w = v.yon === 'mw' ? x / 1000 : x;
      dbm = 10 * Math.log10(w * 1000);
    }
    const guc = olcek(w, [[1e9, 'GW'], [1e6, 'MW'], [1e3, 'kW'], [1, 'W'], [1e-3, 'mW'], [1e-6, 'µW'], [1e-9, 'nW'], [1e-12, 'pW'], [1e-15, 'fW']]);
    const volt = Math.sqrt(w * 50);
    const gerilim = olcek(volt, [[1e3, 'kV'], [1, 'V'], [1e-3, 'mV'], [1e-6, 'µV'], [1e-9, 'nV']]);
    const dbmYaz = h.fmt(dbm, 2) + ' dBm';
    const rows = [
      v.yon === 'dbm' ? ['Güç', guc] : ['dBm', dbmYaz],
      v.yon === 'dbm' ? ['dBm', dbmYaz] : ['Güç', guc],
      ['Miliwatt', h.sig(w * 1000, 6) + ' mW'],
      ['Watt', h.sig(w, 6) + ' W'],
      ['dBW', h.fmt(dbm - 30, 2) + ' dBW'],
      ['50 Ω yükte RMS gerilim', gerilim],
    ];
    return { rows, note: 'P(mW) = 10^(dBm ÷ 10), dBm = 10 × log10(P ÷ 1 mW). Gerilim satırı yalnızca 50 Ω sistemler için geçerlidir.' };
  },
  cases: [
    { in: { deger: '30', yon: 'dbm' }, out: { 'Güç': '1 W', 'Miliwatt': '1.000 mW', 'Watt': '1 W', 'dBW': '0 dBW', '50 Ω yükte RMS gerilim': '7,07107 V' } },
    { in: { deger: '1', yon: 'w' }, out: { 'dBm': '30 dBm', 'Miliwatt': '1.000 mW' } },
    { in: { deger: '0', yon: 'dbm' }, out: { 'Güç': '1 mW', 'Watt': '0,001 W', 'dBW': '-30 dBW', '50 Ω yükte RMS gerilim': '223,607 mV' } },
    { in: { deger: '20', yon: 'dbm' }, out: { 'Güç': '100 mW', 'Watt': '0,1 W' } },
    { in: { deger: '-30', yon: 'dbm' }, out: { 'Güç': '1 µW', 'Miliwatt': '0,001 mW', 'dBW': '-60 dBW' } },
    { in: { deger: '100', yon: 'mw' }, out: { 'dBm': '20 dBm', 'Watt': '0,1 W' } },
    { in: { deger: '2', yon: 'w' }, out: { 'dBm': '33,01 dBm', 'dBW': '3,01 dBW' } },
    { in: { deger: '27', yon: 'dbm' }, out: { 'Güç': '501,187 mW' } },
    { in: { deger: '3', yon: 'dbm' }, out: { 'Güç': '1,99526 mW' } },
    { in: { deger: '0', yon: 'w' }, error: true },
    { in: { deger: 'abc', yon: 'dbm' }, error: true },
    { in: { deger: '-5', yon: 'mw' }, error: true },
  ],
  howto: [
    `"Değer" alanına çevirmek istediğiniz sayıyı yazın. dBm değerleri negatif olabilir; eksi işaretini başa koyun.`,
    `"Çeviri yönü" listesinden dBm'den watta mı, watt ya da miliwatttan dBm'e mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. Karşılık gelen güç ya da dBm değeri ilk satırda görünür.`,
    `Alt satırlardaki miliwatt, watt, dBW ve 50 Ω gerilim değerlerini gerekiyorsa "Sonucu kopyala" ile alın.`,
  ],
  sections: [
    { h: 'dBm nedir?', p: [
      `dBm, bir gücün 1 miliwatta göre desibel cinsinden ifadesidir. Sondaki "m" miliwattı gösterir. Desibel tek başına iki büyüklüğün oranını anlatan birimsiz bir ölçüyken, dBm referansı sabitlenmiş olduğu için <strong>mutlak bir güç birimidir</strong>: 0 dBm her zaman 1 mW'tır.`,
      `Kablosuz haberleşmede güçler çok geniş bir aralığa yayılır. Bir baz istasyonu onlarca watt yayarken, bir telefonun aldığı sinyal watt'ın trilyonda biri mertebesinde olabilir. Bu sayıları sıfırlarla yazmak yerine logaritmik ölçek kullanmak hem okumayı kolaylaştırır hem de kazanç ve kayıpların çarpma yerine toplama-çıkarma ile hesaplanmasını sağlar.`,
    ] },
    { h: 'Çeviri formülleri', p: [
      `dBm'den güce geçiş: <strong>P (mW) = 10<sup>dBm ÷ 10</sup></strong>. Watt için sonucu 1000'e bölersiniz. Güçten dBm'e geçiş: <strong>dBm = 10 × log<sub>10</sub>(P ÷ 1 mW)</strong>. Watt cinsinden bir değer için önce 1000 ile çarpıp miliwatta çevirmek gerekir.`,
      `dBW ise aynı mantıkla 1 watta göre tanımlanır ve dBm değerinden tam 30 eksiktir: <strong>dBW = dBm − 30</strong>. 1 W hem 30 dBm hem 0 dBW'dir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>20 dBm kaç watt?</strong> 10<sup>20 ÷ 10</sup> = 10² = 100 mW, yani 0,1 W. Birçok kablosuz ağ cihazının çıkış gücü bu mertebededir.`,
      `<strong>2 W kaç dBm?</strong> 2 W = 2000 mW. log<sub>10</sub>(2000) = 3,301; 10 ile çarpınca <strong>33,01 dBm</strong>. Pratik kural da aynı sonucu verir: 1 W 30 dBm'dir, gücü iki katına çıkarmak yaklaşık 3 dB ekler.`,
      `<strong>−30 dBm ne kadar?</strong> 10<sup>−3</sup> = 0,001 mW, yani 1 mikrowatt. Negatif dBm, gücün negatif olduğu değil 1 mW'tan küçük olduğu anlamına gelir.`,
    ] },
    { h: 'Akılda tutulacak kurallar', ul: [
      `<strong>+3 dB</strong> gücü yaklaşık iki katına çıkarır, <strong>−3 dB</strong> yarıya indirir.`,
      `<strong>+10 dB</strong> gücü tam on katına çıkarır, <strong>−10 dB</strong> onda birine indirir.`,
      `Bu iki kuralla çoğu değer akıldan bulunur: 23 dBm = 20 dBm + 3 dB ≈ 100 mW × 2 = 200 mW.`,
      `27 dBm = 30 dBm − 3 dB ≈ 1 W ÷ 2 = 0,5 W (tam değer 501,2 mW).`,
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      `<strong>−90 dBm</strong> = 1 pW (zayıf ama çoğu alıcının çözebildiği sinyal düzeyi mertebesi)`,
      `<strong>−60 dBm</strong> = 1 nW`,
      `<strong>−30 dBm</strong> = 1 µW`,
      `<strong>0 dBm</strong> = 1 mW`,
      `<strong>10 dBm</strong> = 10 mW`,
      `<strong>20 dBm</strong> = 100 mW`,
      `<strong>30 dBm</strong> = 1 W`,
      `<strong>40 dBm</strong> = 10 W`,
      `<strong>50 dBm</strong> = 100 W`,
      `<strong>60 dBm</strong> = 1 kW`,
    ] },
    { h: '50 Ω gerilim satırı ne anlama gelir?', p: [
      `RF ölçüm cihazlarının ve koaksiyel sistemlerin büyük bölümü 50 Ω karakteristik empedansla çalışır. Bu empedansta bir gücün karşılık geldiği RMS gerilim <strong>V = √(P × 50)</strong> ile bulunur. 0 dBm, yani 1 mW, 50 Ω yükte 223,6 mV RMS gerilime karşılık gelir; 30 dBm (1 W) ise 7,07 V eder.`,
      `Bu satır yalnızca 50 Ω sistemler için doğrudur. Televizyon ve kablo yayın sistemlerinde 75 Ω, eski ses ve telefon sistemlerinde 600 Ω kullanılır; bu durumlarda aynı dBm değeri farklı bir gerilime denk gelir. Osiloskopla ölçtüğünüz tepe-tepe gerilimi karşılaştıracaksanız sinüs için RMS değerini 2,828 ile çarpmanız gerektiğini unutmayın.`,
    ] },
    { h: 'Nerelerde karşınıza çıkar?', p: [
      `Kablosuz modem ve erişim noktası ayarlarında verici gücü, telefonun servis menüsündeki sinyal seviyesi, amatör telsiz ve uydu alıcı ölçümleri, fiber optik güç ölçerler ve spektrum analizörleri dBm kullanır. Bir bağlantı bütçesi hazırlanırken verici gücü dBm olarak alınır, anten kazançları dBi olarak eklenir, kablo ve yol kayıpları dB olarak çıkarılır; sonuç alıcıdaki sinyal seviyesini dBm olarak verir.`,
      `Verici çıkış gücü ve anten kazancıyla birlikte izin verilen yayın gücü, frekans bandına göre düzenleyici kurumlarca sınırlandırılır. Bir cihazın gücünü artırmadan ya da harici anten takmadan önce ilgili güncel mevzuatı kontrol edin. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['0 dBm kaç watt eder?', `0 dBm tam olarak 1 miliwatt, yani 0,001 watt eder. dBm ölçeğinin referans noktası budur.`],
    ['30 dBm kaç watt?', `30 dBm tam 1 watt eder. Her 10 dB'lik artış gücü on katına çıkardığı için 40 dBm 10 W, 50 dBm 100 W'tır.`],
    ['dBm neden negatif çıkıyor?', `Güç 1 mW'tan küçük olduğunda logaritma negatif sonuç verir. −50 dBm, 1 mW'ın yüz binde biri demektir; gücün kendisi negatif değildir.`],
    ['dB ile dBm arasındaki fark nedir?', `dB iki değerin oranını, dBm ise 1 mW'a göre mutlak gücü gösterir. Bir dBm değerine dB eklenip çıkarılabilir (20 dBm + 3 dB = 23 dBm), ancak iki dBm değeri doğrudan toplanmaz.`],
    ['İki dBm değerini nasıl toplarım?', `Önce ikisini de miliwatta çevirip toplayın, sonra toplamı yeniden dBm'e çevirin. Örneğin 20 dBm + 20 dBm, 100 mW + 100 mW = 200 mW, yani yaklaşık 23 dBm eder; 40 dBm etmez.`],
    ['dBm ile dBW arasında nasıl geçiş yapılır?', `dBW = dBm − 30. 43 dBm, 13 dBW'ye; 0 dBW ise 30 dBm'e eşittir.`],
    ['Sıfır watt neden çevrilemiyor?', `Sıfırın logaritması tanımsızdır; sıfır güç dBm ölçeğinde eksi sonsuza karşılık gelir. Bu yüzden watt ve miliwatt girişleri sıfırdan büyük olmalıdır.`],
    ['Yazdığım değer bir yere gönderiliyor mu?', `Hayır. Çeviri tarayıcınızda yapılır; değer sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['desibel-hesapla', 'anten-boyu-hesapla', 'elektrik-gucu-hesapla', 'amper-watt-cevir', 'ohm-kanunu-hesapla'],
};
