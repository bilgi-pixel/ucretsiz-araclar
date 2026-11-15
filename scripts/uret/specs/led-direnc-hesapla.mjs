export default {
  slug: 'led-direnc-hesapla',
  title: 'LED Direnç Hesaplama',
  h1Tail: 'LED için seri direnç değeri',
  pageTitle: 'LED Direnç Hesaplama – LED\'e Kaç Ohm Direnç Bağlanır?',
  description: 'LED için gereken seri direnci hesaplayın. Kaynak gerilimi, LED gerilimi ve akımından direnç değerini, en yakın standart direnci ve direncin gücünü bulun.',
  card: 'Kaynak gerilimi, LED gerilimi ve akımından gereken seri direnci, en yakın standart değeri ve direnç gücünü bulun.',
  category: 'elektrik',
  keywords: ['led direnç hesaplama', 'led kaç ohm direnç', '12v led direnç', '5v led direnç', 'led ön direnç hesabı', 'led akım sınırlama direnci', 'seri led direnç'],
  lead: 'Bir LED\'i ya da seri bağlı birkaç LED\'i güvenle yakmak için gereken <strong>akım sınırlama direncini</strong> hesaplayın. Araç kesin değeri, piyasada bulunan en yakın standart direnci, bu dirençle geçecek gerçek akımı ve direncin kaç watt olması gerektiğini gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kaynak', label: 'Kaynak gerilimi (V)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'ledGerilim', label: 'LED ileri gerilimi (V)', type: 'number', value: '2', hint: 'Kırmızı/sarı yaklaşık 1,8–2,2 V; beyaz/mavi yaklaşık 3,0–3,4 V. Kesin değer için LED\'in teknik belgesine bakın.' },
    { id: 'akim', label: 'LED akımı (mA)', type: 'number', value: '20' },
    { id: 'adet', label: 'Seri bağlı LED sayısı', type: 'number', value: '1' },
  ],
  compute(v, h) {
    const u = h.pos(v.kaynak, 'Kaynak gerilimi');
    const vf = h.pos(v.ledGerilim, 'LED ileri gerilimi');
    const ma = h.pos(v.akim, 'LED akımı');
    const n = h.posint(v.adet, 'Seri bağlı LED sayısı');
    if (n > 100) h.err('Seri LED sayısı en fazla 100 olabilir.');
    const toplamVf = vf * n;
    const fark = u - toplamVf;
    if (!(fark > 1e-9)) h.err(`Kaynak gerilimi (${h.fmt(u, 2)} V), LED'lerin toplam ileri geriliminden (${h.fmt(toplamVf, 2)} V) büyük olmalı. LED sayısını azaltın ya da daha yüksek gerilimli kaynak kullanın.`);
    const i = ma / 1000;
    const r = fark / i;
    const e12 = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10];
    const onluk = Math.pow(10, Math.floor(Math.log10(r) + 1e-12));
    let std = 10 * onluk;
    for (const k of e12) {
      if (k * onluk >= r * (1 - 1e-9)) { std = k * onluk; break; }
    }
    std = Number(std.toPrecision(3));
    const gercek = fark / std;
    const pDirenc = gercek * gercek * std;
    const gucler = [0.25, 0.5, 1, 2, 3, 5, 10, 25, 50];
    const onerilen = gucler.find((g) => g >= pDirenc * 2 - 1e-12);
    const rows = [
      ['Gerekli direnç', h.fmt(r, 2) + ' Ω'],
      ['En yakın standart direnç (E12)', h.fmt(std, 2) + ' Ω'],
      ['Standart dirençle LED akımı', h.fmt(gercek * 1000, 2) + ' mA'],
      ['Dirençte harcanan güç', h.fmt(pDirenc * 1000, 1) + ' mW'],
      ['Önerilen direnç gücü', onerilen ? h.fmt(onerilen, 2) + ' W' : 'Bu güç için direnç yerine LED sürücü kullanın'],
      ['Direnç üzerindeki gerilim', h.fmt(fark, 3) + ' V'],
      ['LED\'lerde harcanan güç', h.fmt(toplamVf * gercek * 1000, 1) + ' mW'],
    ];
    return { rows, note: 'Standart değer, akımın hedefi aşmaması için hesaplanan değere eşit ya da ondan büyük ilk E12 direncidir. Önerilen güç, harcanan gücün en az iki katıdır.' };
  },
  cases: [
    { in: { kaynak: '5', ledGerilim: '2', akim: '20', adet: '1' }, out: { 'Gerekli direnç': '150 Ω', 'En yakın standart direnç (E12)': '150 Ω', 'Standart dirençle LED akımı': '20 mA', 'Dirençte harcanan güç': '60 mW', 'Önerilen direnç gücü': '0,25 W', 'LED\'lerde harcanan güç': '40 mW' } },
    { in: { kaynak: '12', ledGerilim: '3,2', akim: '20', adet: '1' }, out: { 'Gerekli direnç': '440 Ω', 'En yakın standart direnç (E12)': '470 Ω', 'Standart dirençle LED akımı': '18,72 mA', 'Dirençte harcanan güç': '164,8 mW', 'Önerilen direnç gücü': '0,5 W' } },
    { in: { kaynak: '12', ledGerilim: '2', akim: '20', adet: '3' }, out: { 'Gerekli direnç': '300 Ω', 'En yakın standart direnç (E12)': '330 Ω', 'Standart dirençle LED akımı': '18,18 mA', 'Dirençte harcanan güç': '109,1 mW', 'Direnç üzerindeki gerilim': '6 V' } },
    { in: { kaynak: '9', ledGerilim: '2', akim: '10', adet: '1' }, out: { 'Gerekli direnç': '700 Ω', 'En yakın standart direnç (E12)': '820 Ω', 'Standart dirençle LED akımı': '8,54 mA' } },
    { in: { kaynak: '3,3', ledGerilim: '2', akim: '10', adet: '1' }, out: { 'Gerekli direnç': '130 Ω', 'En yakın standart direnç (E12)': '150 Ω', 'Standart dirençle LED akımı': '8,67 mA' } },
    { in: { kaynak: '5', ledGerilim: '3', akim: '20', adet: '1' }, out: { 'Gerekli direnç': '100 Ω', 'En yakın standart direnç (E12)': '100 Ω', 'Dirençte harcanan güç': '40 mW' } },
    { in: { kaynak: '24', ledGerilim: '3', akim: '350', adet: '6' }, out: { 'Gerekli direnç': '17,14 Ω', 'En yakın standart direnç (E12)': '18 Ω', 'Dirençte harcanan güç': '2.000 mW', 'Önerilen direnç gücü': '5 W' } },
    { in: { kaynak: '3', ledGerilim: '3,2', akim: '20', adet: '1' }, error: true },
    { in: { kaynak: '12', ledGerilim: '2', akim: '20', adet: '6' }, error: true },
    { in: { kaynak: '12', ledGerilim: '2', akim: '0', adet: '1' }, error: true },
    { in: { kaynak: '12', ledGerilim: '2', akim: '20', adet: '1,5' }, error: true },
  ],
  howto: [
    'LED\'i besleyeceğiniz kaynağın gerilimini yazın: USB için 5, araç aküsü için 12, pil için pilin gerilimi gibi.',
    'LED\'in ileri gerilimini (V<sub>f</sub>) girin. Teknik belgede yazar; bilmiyorsanız renge göre alan altındaki yaklaşık değerlerden yararlanın.',
    'LED\'den geçmesini istediğiniz akımı miliamper olarak yazın. Standart 5 mm LED\'lerde en fazla akım çoğunlukla 20 mA\'dir; gösterge amaçlı kullanımda 5–10 mA yeterli parlaklık verir.',
    'Birden fazla LED\'i arka arkaya (seri) bağlayacaksanız LED sayısını girin; tek LED için 1 bırakın.',
    '"Hesapla" düğmesine basın ve "En yakın standart direnç" satırındaki değeri ve önerilen direnç gücünü kullanın.',
  ],
  sections: [
    { h: 'LED\'e neden direnç bağlanır?', p: [
      'LED bir ampul gibi davranmaz. Üzerindeki gerilim belirli bir eşiği (ileri gerilimi) geçtiği anda akım çok hızlı artar; gerilimdeki onda birkaç voltluk fark akımı katlayabilir. Doğrudan bir gerilim kaynağına bağlanan LED, akımı sınırlayan bir şey olmadığı için saniyeler içinde aşırı ısınıp bozulur. Seri bağlanan direnç, kaynak gerilimi ile LED gerilimi arasındaki farkı üzerine alır ve akımı öngörülebilir bir değerde tutar.',
      'Bu yüzden hesap aslında basit bir Ohm kanunu uygulamasıdır: direncin üzerinde kalacak gerilimi bulur, istenen akıma böleriz.',
    ] },
    { h: 'LED direnç formülü', p: [
      '<strong>R = (U<sub>kaynak</sub> − n × V<sub>f</sub>) ÷ I</strong>. Burada U<sub>kaynak</sub> besleme gerilimi, V<sub>f</sub> tek bir LED\'in ileri gerilimi, n seri bağlı LED sayısı ve I amper cinsinden LED akımıdır (20 mA = 0,02 A).',
      'Direncin harcadığı güç <strong>P = I² × R</strong> ya da aynı anlama gelen P = (direnç üzerindeki gerilim) × I ile bulunur. Direnç bu gücü ısıya çevirir; anma gücü yetersizse aşırı ısınır. Araç, harcanan gücün en az iki katı anma gücüne sahip bir direnç önerir.',
      'Hesaplanan değer çoğu zaman piyasada bulunan bir değer olmaz. Dirençler standart serilerle üretilir; en yaygını E12 serisidir (10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 ve bunların on katları). Araç, akımın hedefi aşmaması için hesaplanan değere eşit ya da ondan <strong>büyük</strong> ilk standart değeri seçer.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>5 V ile kırmızı LED:</strong> V<sub>f</sub> = 2 V, akım 20 mA. R = (5 − 2) ÷ 0,02 = 150 Ω. Bu değer E12 serisinde vardır. Dirençte harcanan güç 0,02² × 150 = 0,06 W (60 mW); çeyrek watt direnç fazlasıyla yeterlidir.',
      '<strong>12 V ile beyaz LED:</strong> V<sub>f</sub> = 3,2 V, akım 20 mA. R = (12 − 3,2) ÷ 0,02 = 440 Ω. En yakın üst standart değer 470 Ω\'dur. Bu dirençle gerçek akım 8,8 ÷ 470 = 18,72 mA olur; parlaklık farkı gözle ayırt edilemez. Dirençte 8,8² ÷ 470 = 164,8 mW harcanır; bu değer çeyrek watt sınırına yakın olduğundan yarım watt direnç önerilir.',
      '<strong>12 V ile üç kırmızı LED seri:</strong> toplam LED gerilimi 3 × 2 = 6 V. R = (12 − 6) ÷ 0,02 = 300 Ω, standart değer 330 Ω, gerçek akım 18,18 mA. Üç LED ayrı ayrı dirençlerle bağlansaydı toplam 60 mA çekilirdi; seri bağlantıda aynı ışık 18 mA ile elde edilir.',
    ] },
    { h: 'Renge göre yaklaşık ileri gerilimleri', p: [
      'İleri gerilimi LED\'in yapıldığı yarı iletkene, dolayısıyla rengine bağlıdır. Aşağıdaki aralıklar yaygın gösterge LED\'leri için tipik değerlerdir; üreticiye ve akıma göre değişir, kesin değer için ürünün teknik belgesine bakılmalıdır.',
    ], ul: [
      '<strong>Kızılötesi:</strong> yaklaşık 1,2–1,6 V',
      '<strong>Kırmızı:</strong> yaklaşık 1,8–2,2 V',
      '<strong>Sarı, turuncu:</strong> yaklaşık 2,0–2,2 V',
      '<strong>Yeşil (klasik):</strong> yaklaşık 2,0–2,4 V',
      '<strong>Mavi, beyaz, saf yeşil:</strong> yaklaşık 3,0–3,4 V',
    ] },
    { h: 'Seri mi, paralel mi?', p: [
      'Birden fazla LED kullanılacaksa en verimli yol, kaynak geriliminin elverdiği kadarını seri bağlamaktır. Seri kolda tek direnç yeter ve bütün LED\'lerden aynı akım geçer. Dikkat edilecek nokta, LED gerilimlerinin toplamının kaynak geriliminden belirgin biçimde düşük kalmasıdır; direncin üzerinde en az bir iki volt kalmazsa kaynak gerilimindeki küçük oynamalar akımı çok değiştirir.',
      'LED\'leri tek bir dirençle <strong>paralel</strong> bağlamak önerilmez. LED\'lerin ileri gerilimleri birbirinden biraz farklıdır; gerilimi düşük olan akımın çoğunu çeker, ısınır, gerilimi daha da düşer ve sonunda bozulur. Paralel kollarda her kola kendi direnci konmalıdır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Direnç yöntemi küçük akımlı gösterge LED\'leri için uygundur. Yüzlerce miliamper çeken güç LED\'lerinde direnç üzerinde ciddi ısı kaybı olur ve akım sıcaklıkla değişir; bu LED\'ler sabit akım sürücüsüyle beslenmelidir. Araç aküsü gibi gerilimi oynayan kaynaklarda hesabı en yüksek gerilime göre yapmak (araçlarda motor çalışırken gerilim 12 V\'un üzerine çıkar) daha güvenlidir.',
      'Sonuçlar bilgilendirme amaçlıdır ve ideal eleman varsayımına dayanır. Şebeke geriliminden (220–230 V) LED\'i yalnızca dirençle beslemek güvenli bir yöntem değildir; bu tür uygulamalar yalıtımlı sürücüler ve yetkili kişilerce yapılmalıdır.',
    ] },
  ],
  faq: [
    ['12 V ile LED yakmak için kaç ohm direnç gerekir?', 'LED\'in rengine bağlıdır. 2 V\'luk kırmızı LED ve 20 mA için (12 − 2) ÷ 0,02 = 500 Ω gerekir; standart üst değer 560 Ω\'dur. 3,2 V\'luk beyaz LED için 440 Ω hesaplanır, 470 Ω kullanılır.'],
    ['5 V ile LED için hangi direnç kullanılır?', 'Kırmızı LED (2 V, 20 mA) için 150 Ω, beyaz ya da mavi LED (3 V, 20 mA) için 100 Ω uygundur. Daha az parlaklık yeterliyse 220–330 Ω da kullanılabilir.'],
    ['Hesaplanan direnç elimde yoksa ne yapmalıyım?', 'Bir üst standart değeri kullanın. Akım biraz azalır ama LED güvende kalır. Daha küçük değer seçmek akımı artırır ve LED\'in ömrünü kısaltabilir.'],
    ['Direnç LED\'in artı ucuna mı eksi ucuna mı bağlanır?', 'Fark etmez. Seri devrede akım her noktada aynıdır; direnç LED\'in önünde de arkasında da aynı görevi yapar.'],
    ['Direnç kaç watt olmalı?', 'Dirençte harcanan gücün en az iki katı anma gücü seçilir. 20 mA\'lik gösterge LED\'lerinde çoğu zaman çeyrek watt yeterlidir; araç bunu "Önerilen direnç gücü" satırında gösterir.'],
    ['Kaynak gerilimi LED geriliminden düşükse ne olur?', 'LED yanmaz ya da çok sönük yanar; direnç hesabı anlamsızlaşır. Araç bu durumda hata verir. Daha yüksek gerilimli kaynak ya da yükseltici bir sürücü gerekir.'],
    ['LED\'i 20 mA yerine daha düşük akımla sürebilir miyim?', 'Evet. Günümüz LED\'leri 5–10 mA\'de de belirgin ışık verir, daha az ısınır ve pilli devrelerde tüketimi azaltır.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; veriler sunucuya iletilmez.'],
  ],
  related: ['ohm-kanunu-hesapla', 'direnc-renk-kodu-hesapla', 'seri-direnc-hesapla', 'gerilim-bolucu-hesapla', 'serit-led-guc-kaynagi-hesapla'],
};
