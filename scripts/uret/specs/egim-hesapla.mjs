export default {
  slug: 'egim-hesapla',
  title: 'İki Noktadan Eğim Hesaplama',
  h1Tail: 'm = Δy ÷ Δx',
  pageTitle: 'Eğim Hesaplama – İki Noktası Bilinen Doğrunun Eğimi ve Açısı',
  description: 'İki noktası bilinen doğrunun eğimini hesaplayın. Eğim (m), eğim açısı, yüzde eğim, dikey ve yatay değişim; yatay ve düşey doğrular da ayrıca belirtilir.',
  card: 'İki noktanın koordinatlarından doğrunun eğimini, eğim açısını ve yüzde eğimini hesaplayın.',
  category: 'matematik',
  keywords: ['eğim hesaplama', 'iki noktadan eğim bulma', 'doğrunun eğimi', 'eğim formülü', 'eğim açısı hesaplama', 'yüzde eğim hesaplama', 'm eğim bulma', 'rampa eğimi'],
  lead: 'Bir doğrunun üzerindeki iki noktanın koordinatlarını yazın; araç <strong>eğimi (m)</strong>, doğrunun x ekseniyle yaptığı açıyı ve yüzde eğimi hesaplar. Yatay ve düşey doğruları da tanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'x1', label: 'Birinci nokta: x₁', type: 'number', placeholder: 'Örn. 1' },
    { id: 'y1', label: 'Birinci nokta: y₁', type: 'number', placeholder: 'Örn. 2' },
    { id: 'x2', label: 'İkinci nokta: x₂', type: 'number', placeholder: 'Örn. 3' },
    { id: 'y2', label: 'İkinci nokta: y₂', type: 'number', placeholder: 'Örn. 6' },
  ],
  compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) h.err('İki nokta aynı; tek noktadan sonsuz doğru geçtiği için eğim belirlenemez. Farklı iki nokta girin.');
    const degisim = [['Δy (dikey değişim)', h.fmt(dy, 6)], ['Δx (yatay değişim)', h.fmt(dx, 6)]];
    if (dx === 0) {
      return {
        rows: [
          ['Eğim (m)', 'Tanımsız (düşey doğru)'],
          ['Eğim açısı', '90°'],
          ['Yüzde eğim', '—'],
          ...degisim,
          ['Doğrunun yönü', 'Düşey (y eksenine paralel)'],
        ],
        note: 'İki noktanın x değerleri eşit olduğunda Δx = 0 olur ve sıfıra bölme yapılamaz; düşey doğrunun eğimi tanımsızdır.',
      };
    }
    const m = dy / dx;
    const aci = Math.atan(m) * 180 / Math.PI;
    return {
      rows: [
        ['Eğim (m)', h.fmt(m, 6)],
        ['Eğim açısı', h.fmt(aci, 4) + '°'],
        ['Yüzde eğim', '%' + h.fmt(m * 100, 4)],
        ...degisim,
        ['Doğrunun yönü', m > 0 ? 'Artan (sağa doğru yükselir)' : m < 0 ? 'Azalan (sağa doğru alçalır)' : 'Yatay (x eksenine paralel)'],
      ],
      note: 'm = (y₂ − y₁) ÷ (x₂ − x₁). Eğim açısı, doğrunun x ekseninin pozitif yönüyle yaptığı açıdır (−90° ile 90° arasında).',
    };
  },
  cases: [
    { in: { x1: '1', y1: '2', x2: '3', y2: '6' }, out: { 'Eğim (m)': '2', 'Eğim açısı': '63,4349°', 'Yüzde eğim': '%200', 'Δy (dikey değişim)': '4', 'Δx (yatay değişim)': '2', 'Doğrunun yönü': 'Artan (sağa doğru yükselir)' } },
    { in: { x1: '0', y1: '0', x2: '4', y2: '-2' }, out: { 'Eğim (m)': '-0,5', 'Eğim açısı': '-26,5651°', 'Yüzde eğim': '%-50', 'Doğrunun yönü': 'Azalan (sağa doğru alçalır)' } },
    { in: { x1: '0', y1: '0', x2: '1', y2: '1' }, out: { 'Eğim (m)': '1', 'Eğim açısı': '45°', 'Yüzde eğim': '%100' } },
    { in: { x1: '0', y1: '5', x2: '4', y2: '5' }, out: { 'Eğim (m)': '0', 'Eğim açısı': '0°', 'Doğrunun yönü': 'Yatay (x eksenine paralel)' } },
    { in: { x1: '2', y1: '3', x2: '2', y2: '7' }, out: { 'Eğim (m)': 'Tanımsız (düşey doğru)', 'Eğim açısı': '90°', 'Doğrunun yönü': 'Düşey (y eksenine paralel)' } },
    { in: { x1: '0', y1: '0', x2: '100', y2: '8' }, out: { 'Eğim (m)': '0,08', 'Yüzde eğim': '%8', 'Eğim açısı': '4,5739°' } },
    { in: { x1: '0', y1: '0', x2: '4', y2: '3' }, out: { 'Eğim (m)': '0,75', 'Eğim açısı': '36,8699°' } },
    { in: { x1: '2', y1: '3', x2: '2', y2: '3' }, error: true },
    { in: { x1: '2', y1: '', x2: '5', y2: '3' }, error: true },
  ],
  howto: [
    'Doğru üzerinde bildiğiniz iki noktayı belirleyin: A(x₁, y₁) ve B(x₂, y₂).',
    'Birinci noktanın apsisini (x) ve ordinatını (y) ilk iki alana, ikinci noktanınkileri son iki alana yazın. Negatif koordinatları eksi işaretiyle girin.',
    '"Hesapla" düğmesine basın. İlk satırda eğim, altında eğim açısı ve yüzde eğim görünür.',
    'Δy ve Δx satırlarından dikey ve yatay değişimi, son satırdan doğrunun artan mı azalan mı olduğunu okuyun.',
  ],
  sections: [
    { h: 'Eğim nedir?', p: [
      'Eğim, bir doğrunun ne kadar dik olduğunu ve hangi yöne yattığını tek bir sayıyla anlatır. Matematikte genellikle <strong>m</strong> harfiyle gösterilir ve "yatayda bir birim ilerlendiğinde dikeyde kaç birim çıkıldığı" anlamına gelir. Eğimi 2 olan bir doğruda sağa doğru 1 birim gidildiğinde 2 birim yukarı çıkılır; eğimi −0,5 olan doğruda ise 1 birim sağa gidildiğinde yarım birim aşağı inilir.',
      'Eğim büyüdükçe doğru dikleşir, sıfıra yaklaştıkça yataylaşır. İşareti ise yönü belirler: pozitif eğimli doğrular soldan sağa yükselir, negatif eğimli doğrular alçalır.',
    ] },
    { h: 'İki noktadan eğim formülü', p: [
      'A(x₁, y₁) ve B(x₂, y₂) noktalarından geçen doğrunun eğimi <strong>m = (y₂ − y₁) ÷ (x₂ − x₁)</strong> formülüyle bulunur. Paydaki fark dikey değişimdir ve Δy ile, paydadaki fark yatay değişimdir ve Δx ile gösterilir.',
      'Noktaların sırası sonucu değiştirmez; yeter ki pay ve paydada aynı sıra kullanılsın. Payda y₂ − y₁ yazıp paydada x₁ − x₂ yazmak en yaygın işaret hatasıdır ve eğimin ters işaretli çıkmasına yol açar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> A(1, 2) ve B(3, 6). Δy = 6 − 2 = 4, Δx = 3 − 1 = 2. Eğim m = 4 ÷ 2 = 2. Doğru artandır; eğim açısı yaklaşık 63,43°, yüzde eğim %200\'dür.',
      '<strong>Örnek 2:</strong> A(0, 0) ve B(4, −2). Δy = −2, Δx = 4. Eğim m = −2 ÷ 4 = −0,5. Doğru azalandır; eğim açısı yaklaşık −26,57° çıkar, yani doğru x ekseninin altına doğru yatmaktadır.',
      '<strong>Örnek 3:</strong> A(0, 5) ve B(4, 5). Δy = 0 olduğundan eğim 0\'dır. Doğru yataydır ve denklemi y = 5\'tir.',
      '<strong>Örnek 4:</strong> A(2, 3) ve B(2, 7). Δx = 0 olduğundan bölme yapılamaz; eğim tanımsızdır. Doğru düşeydir ve denklemi x = 2\'dir.',
    ] },
    { h: 'Eğim açısı ve yüzde eğim', p: [
      'Eğim, doğrunun x ekseninin pozitif yönüyle yaptığı açının tanjantına eşittir: <strong>m = tan α</strong>. Bu yüzden açı, eğimin ters tanjantı alınarak bulunur. Eğim 1 ise açı 45°, eğim 0 ise açı 0° olur. Düşey doğruda açı 90°\'dir ve tanjant tanımsız olduğu için eğim de tanımsızdır.',
      'Yol, rampa ve çatı gibi uygulamalarda eğim çoğunlukla yüzde olarak söylenir. Yüzde eğim, eğimin 100 ile çarpılmış hâlidir: 100 metre yatay mesafede 8 metre yükselen bir yolun eğimi 8 ÷ 100 = 0,08, yani %8\'dir ve bu yaklaşık 4,57°\'lik bir açıya karşılık gelir. Sık karıştırılan bir nokta: <strong>%100 eğim 90° değil, 45° demektir</strong>; çünkü yatayda gidilen mesafe kadar yükselinmektedir.',
    ] },
    { h: 'Hızlı başvuru: eğim – açı karşılıkları', ul: [
      'm = 0 → 0° (yatay), %0',
      'm = 0,1 → yaklaşık 5,71°, %10',
      'm = 0,5 → yaklaşık 26,57°, %50',
      'm = 1 → 45°, %100',
      'm = 2 → yaklaşık 63,43°, %200',
      'm tanımsız → 90° (düşey)',
    ] },
    { h: 'Paralel ve dik doğrular', p: [
      'Eğim, iki doğrunun birbirine göre konumunu anlamanın en kısa yoludur. Eğimleri eşit olan iki farklı doğru <strong>paraleldir</strong> ve hiç kesişmez. Eğimlerinin çarpımı −1 olan iki doğru birbirine <strong>diktir</strong>; örneğin eğimi 2 olan bir doğruya dik olan doğrunun eğimi −0,5\'tir. Yatay bir doğruya dik olan doğru düşeydir; bu özel durumda çarpım kuralı uygulanamaz, çünkü düşey doğrunun eğimi tanımsızdır.',
      'Üç noktanın aynı doğru üzerinde olup olmadığını sınamak için de eğim kullanılır: ilk iki noktadan ve son iki noktadan hesaplanan eğimler eşitse üç nokta doğrusaldır.',
    ] },
    { h: 'Günlük hayatta eğim', p: [
      'Eğim yalnızca analitik geometri konusu değildir. Bir grafikteki eğim, değişim hızını gösterir: konum-zaman grafiğinde eğim hızı, hız-zaman grafiğinde ivmeyi verir. Maliyet-üretim grafiğinde eğim birim başına maliyettir. Harita üzerinde iki noktanın yükseklik farkı yatay mesafeye bölündüğünde arazinin ortalama eğimi bulunur.',
      'İnşaat ve peyzajda rampa, yol, çatı ve atık su borusu eğimleri de aynı oranla ifade edilir. Bu araç geometrik hesabı yapar; uygulamada kullanılacak en düşük ya da en yüksek eğim değerleri için ilgili yönetmelik ve standartlara bakılmalı, yapısal kararlar için bir mühendise danışılmalıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'İki nokta birbirinin aynısıysa eğim belirlenemez ve araç hata verir. Eğim altı, açı ve yüzde eğim dört ondalık basamağa yuvarlanır. Koordinat eksenlerinin aynı birimde olduğu varsayılır; yatay eksen metre, dikey eksen santimetre ise açı ve yüzde eğim yanlış çıkar, önce birimleri eşitleyin.',
    ] },
  ],
  faq: [
    ['İki noktası bilinen doğrunun eğimi nasıl bulunur?', 'y değerlerinin farkı x değerlerinin farkına bölünür: m = (y₂ − y₁) ÷ (x₂ − x₁). Örneğin (1, 2) ve (3, 6) noktaları için m = 4 ÷ 2 = 2\'dir.'],
    ['Eğim negatif çıkarsa ne anlama gelir?', 'Doğru soldan sağa doğru alçalıyor demektir; x arttıkça y azalır. Eğim açısı da negatif çıkar ve doğrunun x ekseninin altına doğru yattığını gösterir.'],
    ['Eğim neden tanımsız olur?', 'İki noktanın x değerleri eşitse yatay değişim sıfırdır ve sıfıra bölme yapılamaz. Bu durumda doğru düşeydir, y eksenine paraleldir ve eğimi tanımsız kabul edilir.'],
    ['Eğimi sıfır olan doğru nasıldır?', 'İki noktanın y değerleri eşittir ve doğru yataydır, yani x eksenine paraleldir. Denklemi y = sabit biçimindedir.'],
    ['Eğimden açı nasıl bulunur?', 'Eğimin ters tanjantı (arctan) alınır. m = 1 için açı 45°, m = 2 için yaklaşık 63,43° çıkar. Araç bu dönüşümü kendiliğinden yapar ve sonucu derece olarak verir.'],
    ['Yüzde eğim nasıl hesaplanır?', 'Dikey değişim yatay değişime bölünür ve 100 ile çarpılır. 100 metrede 8 metre yükselen bir yolun eğimi %8\'dir. %100 eğim 45 derecelik açıya karşılık gelir.'],
    ['Noktaları ters sırada girersem sonuç değişir mi?', 'Hayır. Noktaların yerini değiştirdiğinizde hem Δy hem Δx işaret değiştirir, bölümleri aynı kalır. Yalnızca Δy ve Δx satırlarındaki işaretler tersine döner.'],
    ['Girdiğim koordinatlar bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['dogru-denklemi-bul', 'iki-nokta-arasi-uzaklik', 'orta-nokta-hesapla', 'dogrusal-interpolasyon-hesapla', 'dogrusal-regresyon-hesapla'],
};
