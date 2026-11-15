export default {
  slug: 'guc-hesapla',
  title: 'Güç Hesaplama (Fizik)',
  h1Tail: 'P = W ÷ t',
  pageTitle: 'Güç Hesaplama (Fizik) – P = W/t ve P = F·v ile Watt Bulma',
  description: 'Fizikte gücü iş ve süreden ya da kuvvet ve hızdan hesaplayın. P = W/t ve P = F·v formülleri; sonuç watt, kilowatt ve beygir gücü olarak, çözümlü örneklerle.',
  card: 'P = W/t ya da P = F·v ile gücü watt, kilowatt ve beygir gücü olarak bulun; güçten işi veya süreyi de hesaplayın.',
  category: 'bilim',
  keywords: ['güç hesaplama fizik', 'güç formülü', 'P = W/t', 'watt hesaplama', 'iş güç zaman', 'P = F v', 'beygir gücü watt', 'güç nasıl bulunur'],
  lead: `Yapılan iş ve geçen süreden <strong>gücü</strong> hesaplayın ya da güçten işi, süreyi bulun; isterseniz kuvvet ve hızdan anlık gücü de bulabilirsiniz. Araç <strong>P = W ÷ t</strong> ve <strong>P = F · v</strong> bağıntılarını kullanır, sonucu watt, kilowatt ve beygir gücü olarak verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Hesap türü', type: 'select', options: [['p', 'Güç: iş ve süreden (P = W ÷ t)'], ['w', 'İş: güç ve süreden (W = P · t)'], ['t', 'Süre: iş ve güçten (t = W ÷ P)'], ['fv', 'Güç: kuvvet ve hızdan (P = F · v)']] },
    { id: 'isDegeri', label: 'İş / enerji (J)', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'sure', label: 'Süre (s)', type: 'number', placeholder: 'Örn. 10', hint: 'Saniye cinsinden. 1 dakika = 60 s, 1 saat = 3600 s.' },
    { id: 'guc', label: 'Güç (W)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 200', hint: 'Yalnızca "kuvvet ve hızdan" seçeneğinde kullanılır.' },
    { id: 'hiz', label: 'Hız (m/s)', type: 'number', placeholder: 'Örn. 15', hint: 'Yalnızca "kuvvet ve hızdan" seçeneğinde kullanılır.' },
  ],
  compute(v, h) {
    const BG = 735.49875;
    let p, w = null, t = null, f = null, hiz = null;
    if (v.bul === 'fv') {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      hiz = h.nonneg(v.hiz, 'Hız');
      p = f * hiz;
    } else if (v.bul === 'w') {
      p = h.nonneg(v.guc, 'Güç');
      t = h.nonneg(v.sure, 'Süre');
      w = p * t;
    } else if (v.bul === 't') {
      w = h.nonneg(v.isDegeri, 'İş');
      p = h.pos(v.guc, 'Güç');
      t = w / p;
    } else {
      w = h.nonneg(v.isDegeri, 'İş');
      t = h.pos(v.sure, 'Süre');
      p = w / t;
    }
    const gucSatir = ['Güç', h.fmt(p, 4) + ' W'];
    const rows = [];
    if (v.bul === 'w') rows.push(['İş', h.fmt(w, 4) + ' J'], gucSatir);
    else if (v.bul === 't') rows.push(['Süre', h.fmt(t, 4) + ' s'], gucSatir);
    else rows.push(gucSatir);
    rows.push(['Güç (kW)', h.fmt(p / 1000, 6) + ' kW']);
    rows.push(['Güç (beygir gücü)', h.fmt(p / BG, 4) + ' BG']);
    if (v.bul === 'p' || v.bul === 't') rows.push(['İş', h.fmt(w, 4) + ' J']);
    if (v.bul === 'p' || v.bul === 'w') rows.push(['Süre', h.fmt(t, 4) + ' s']);
    if (w !== null) rows.push(['Enerji (kWh)', h.fmt(w / 3.6e6, 6) + ' kWh']);
    if (v.bul === 'fv') rows.push(['Kuvvet', h.fmt(f, 4) + ' N'], ['Hız', h.fmt(hiz, 4) + ' m/s']);
    return {
      rows,
      note: v.bul === 'fv'
        ? 'Kuvvetin hareketle aynı yönde olduğu varsayılır. 1 BG (metrik beygir gücü) = 735,49875 W.'
        : 'İş ve süreden bulunan değer ortalama güçtür. 1 BG (metrik beygir gücü) = 735,49875 W; 1 kWh = 3.600.000 J.',
    };
  },
  cases: [
    { in: { bul: 'p', isDegeri: '1000', sure: '10' }, out: { 'Güç': '100 W', 'Güç (kW)': '0,1 kW' } },
    { in: { bul: 'fv', kuvvet: '200', hiz: '15' }, out: { 'Güç': '3.000 W', 'Güç (kW)': '3 kW', 'Güç (beygir gücü)': '4,0789 BG' } },
    { in: { bul: 'p', isDegeri: '3600000', sure: '3600' }, out: { 'Güç': '1.000 W', 'Güç (kW)': '1 kW', 'Enerji (kWh)': '1 kWh' } },
    { in: { bul: 'w', guc: '60', sure: '120' }, out: { 'İş': '7.200 J', 'Enerji (kWh)': '0,002 kWh' } },
    { in: { bul: 't', isDegeri: '500', guc: '25' }, out: { 'Süre': '20 s' } },
    { in: { bul: 'p', isDegeri: '5886', sure: '12' }, out: { 'Güç': '490,5 W' } },
    { in: { bul: 'p', isDegeri: '735,49875', sure: '1' }, out: { 'Güç (beygir gücü)': '1 BG' } },
    { in: { bul: 'p', isDegeri: '1000', sure: '0' }, error: true },
    { in: { bul: 't', isDegeri: '500', guc: '0' }, error: true },
    { in: { bul: 'fv', kuvvet: 'abc', hiz: '15' }, error: true },
  ],
  howto: [
    `"Hesap türü" listesinden elinizdeki verilere uyan seçeneği belirleyin: iş ve süreden güç, güç ve süreden iş, iş ve güçten süre ya da kuvvet ve hızdan güç.`,
    `Seçtiğiniz türün gerektirdiği iki kutuyu doldurun; diğer kutular boş kalabilir. İş joule, süre saniye, güç watt, kuvvet newton, hız m/s cinsindendir.`,
    `Süreniz dakika ya da saat olarak verilmişse saniyeye çevirin: dakikayı 60, saati 3600 ile çarpın.`,
    `"Hesapla" düğmesine basın. Sonuçta güç watt, kilowatt ve beygir gücü olarak; iş ise joule ve kilowatt saat olarak gösterilir.`,
  ],
  sections: [
    { h: 'Fizikte güç nedir?', p: [
      `Güç, işin ne kadar hızlı yapıldığını ya da enerjinin ne kadar hızlı aktarıldığını anlatan büyüklüktür. Aynı yükü aynı yüksekliğe çıkaran iki vinç aynı işi yapar; ancak bunu yarı sürede yapanın gücü iki kat fazladır. Dolayısıyla güç, "ne kadar iş" sorusuna değil, "birim zamanda ne kadar iş" sorusuna cevap verir.`,
      `Gücün SI birimi <strong>watt</strong>'tır (W) ve saniyede bir joule iş yapılması anlamına gelir: 1 W = 1 J/s. Pratikte kilowatt (1 kW = 1000 W) ve özellikle motorlarda beygir gücü kullanılır.`,
    ] },
    { h: 'Formüller: P = W ÷ t ve P = F · v', p: [
      `Ortalama güç, yapılan işin geçen süreye bölünmesiyle bulunur: <strong>P = W ÷ t</strong>. Aynı bağıntıdan iş <code>W = P · t</code>, süre <code>t = W ÷ P</code> olarak çekilebilir.`,
      `Sabit bir kuvvet, cismi kendi yönünde sabit hızla hareket ettiriyorsa iş W = F · d ve d = v · t olduğundan güç <strong>P = F · v</strong> biçiminde yazılır. Bu ikinci formül taşıtlarda çok kullanışlıdır: sabit hızla giden bir aracın motoru, direnç kuvvetleri ile hızın çarpımı kadar güç harcar. Hız arttıkça hava direnci de arttığı için gereken güç hızdan çok daha çabuk büyür.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Bir motor 10 saniyede 1000 J iş yapıyor. P = 1000 ÷ 10 = <strong>100 W</strong>, yani 0,1 kW.`,
      `<strong>Örnek 2:</strong> 200 N'luk çekme kuvvetiyle 15 m/s sabit hızla giden bir aracın gücü P = 200 × 15 = <strong>3000 W</strong> = 3 kW olur; bu yaklaşık 4,08 beygir gücüdür.`,
      `<strong>Örnek 3:</strong> 60 W'lık bir ampul 2 dakika (120 s) yanarsa harcadığı enerji W = 60 × 120 = <strong>7200 J</strong> olur; bu 0,002 kWh eder.`,
      `<strong>Örnek 4:</strong> 25 W güçle çalışan bir düzenek 500 J işi t = 500 ÷ 25 = <strong>20 saniyede</strong> yapar.`,
      `<strong>Örnek 5:</strong> 50 kg'lık yük 12 m yükseğe 12 saniyede çıkarılıyor (g = 9,81). Yapılan iş 50 × 9,81 × 12 = 5886 J, güç 5886 ÷ 12 = <strong>490,5 W</strong> bulunur.`,
    ] },
    { h: 'Watt, kilowatt ve beygir gücü', p: [
      `Beygir gücü, buhar makinelerinin atlarla karşılaştırıldığı dönemden kalma bir birimdir ve hâlâ otomobil motorlarında kullanılır. Türkiye'de ve Avrupa'da yaygın olan <em>metrik beygir gücü</em> (BG, PS) 735,49875 watt'a eşittir. Anglosakson ülkelerde kullanılan mekanik beygir gücü (hp) ise yaklaşık 745,7 watt'tır; ikisi arasında yüzde bir buçuk kadar fark vardır. Bu araç metrik beygir gücünü kullanır.`,
      `Hızlı dönüşüm için: 1 kW yaklaşık 1,36 BG, 100 BG ise yaklaşık 73,5 kW eder. Araç ruhsatlarında motor gücü kilowatt olarak yazılır.`,
    ] },
    { h: 'Güç ile enerji karıştırılmamalı: kW ve kWh', p: [
      `Kilowatt (kW) bir güç birimidir; kilowatt saat (kWh) ise bir enerji birimidir. 1 kW gücündeki bir cihaz 1 saat çalıştığında 1 kWh enerji harcar; bu da 1000 W × 3600 s = 3.600.000 J eder. Elektrik faturasında ödenen şey güç değil, tüketilen enerjidir.`,
      `Bu yüzden 2000 W'lık bir su ısıtıcısı kısa süre çalıştığı için, sürekli açık duran 100 W'lık bir cihazdan daha az enerji harcayabilir. Araç, iş değerinin kWh karşılığını da gösterir.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Süreyi dakika ya da saat olarak bırakmak; formül saniye ister.`,
      `Güç ile işi (enerjiyi) aynı şey sanmak; güç birim zamandaki iştir.`,
      `P = F · v formülünde kuvvet ile hızın aynı doğrultuda olması gerektiğini unutmak; aralarında açı varsa kuvvetin hız yönündeki bileşeni kullanılır.`,
      `Hızı km/sa olarak yazmak; 3,6'ya bölerek m/s birimine çevirin.`,
      `İş ve süreden bulunan değer <strong>ortalama</strong> güçtür; anlık güç zaman içinde değişebilir. Gerçek makinelerde verim kayıpları nedeniyle çekilen güç, yararlı çıkış gücünden büyüktür; araç verimi hesaba katmaz.`,
    ] },
  ],
  faq: [
    ['Güç formülü nedir?', `Güç, yapılan işin süreye bölümüdür: P = W ÷ t. İş joule, süre saniye alındığında sonuç watt olur. Sabit hızla hareket için P = F · v biçimi de kullanılır.`],
    ['Gücün birimi nedir?', `SI birimi watt'tır (W). 1 watt, saniyede 1 joule iş demektir. Büyük güçlerde kilowatt (kW) ve megawatt (MW), motorlarda beygir gücü (BG) kullanılır.`],
    ['1 beygir gücü kaç watt eder?', `Metrik beygir gücü 735,49875 watt, yani yaklaşık 0,7355 kW'tır. Mekanik beygir gücü (hp) ise yaklaşık 745,7 watt'tır. Bu sayfadaki sonuç metrik beygir gücüdür.`],
    ['Güç ile enerji arasındaki fark nedir?', `Enerji toplam yapılan işi, güç ise bu işin yapılma hızını gösterir. Enerji joule ya da kWh ile, güç watt ya da kW ile ölçülür. Enerji = güç × süre bağıntısı ikisini birbirine bağlar.`],
    ['P = F · v formülü ne zaman kullanılır?', `Kuvvetin ve hızın bilindiği, hareketin kuvvetle aynı yönde olduğu durumlarda kullanılır. Sabit hızla giden araç, yük çeken vinç ya da bisikletçi örneklerinde anlık gücü doğrudan verir.`],
    ['Süre yarıya inerse güç nasıl değişir?', `Aynı iş yarı sürede yapılırsa güç iki katına çıkar, çünkü güç süreyle ters orantılıdır. Yapılan iş ise değişmez.`],
    ['Elektrik gücü de bu araçla hesaplanır mı?', `P = W ÷ t bağıntısı her tür güç için geçerlidir; elektrik enerjisini joule ve süreyi saniye olarak girerseniz sonuç doğrudur. Gerilim ve akımdan güç hesabı (P = V · I) ise bu sayfanın kapsamında değildir.`],
    ['Girdiğim veriler kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['is-hesapla', 'kinetik-enerji-hesapla', 'potansiyel-enerji-hesapla', 'verim-hesapla', 'kuvvet-hesapla'],
};
