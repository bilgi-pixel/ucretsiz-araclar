export default {
  slug: 'rgb-hsl-cevir',
  title: 'RGB HSL Renk Çevirici',
  h1Tail: 'rgb() ↔ hsl()',
  pageTitle: 'RGB HSL Renk Çevirici – Ton, Doygunluk ve Açıklık Hesaplama',
  description: 'RGB ya da HEX rengi HSL değerlerine (ton, doygunluk, açıklık), HSL değerlerini RGB ve HEX koduna çevirin. CSS hsl() ve rgb() yazımlarını hazır verir.',
  card: 'RGB rengi ton, doygunluk ve açıklık (HSL) değerlerine ya da HSL\'yi RGB ve HEX koduna çevirin.',
  category: 'gelistirici',
  keywords: ['rgb hsl çevirme', 'hsl rgb çevirme', 'hsl renk kodu', 'ton doygunluk açıklık', 'rgb to hsl', 'hsl to hex', 'css hsl hesaplama', 'renk tonu derecesi'],
  lead: 'Bir rengi <strong>RGB</strong> (kırmızı, yeşil, mavi) gösteriminden <strong>HSL</strong> (ton, doygunluk, açıklık) gösterimine ya da tersine çevirin. Sonuçta CSS\'e doğrudan yapıştırılabilecek <code>hsl()</code>, <code>rgb()</code> ve HEX yazımları birlikte verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'renk', label: 'Renk değeri', type: 'text', placeholder: 'Örn. 30, 144, 255 ya da 210, 50%, 40%', hint: 'RGB yönünde üç sayı (0–255) ya da HEX kodu; HSL yönünde ton (derece), doygunluk ve açıklık (0–100) yazın.', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['rgb', 'RGB / HEX → HSL'], ['hsl', 'HSL → RGB / HEX']] },
  ],
  compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Renk değeri" alanını doldurun.');
    let r, g, b, H, S, L;
    if (v.yon === 'hsl') {
      const ic = t.replace(/^hsla?\s*\(/i, '').replace(/\)\s*;?$/, '').replace(/deg|°|%/gi, ' ');
      let s3 = ic.split(/[\s;\/]+/).filter(Boolean).map((k) => k.replace(/,+$/, '')).filter(Boolean);
      if (s3.length !== 3) s3 = ic.split(/[\s,;\/]+/).filter(Boolean);
      if (s3.length !== 3) h.err('HSL için üç değer yazın: ton, doygunluk, açıklık (örn. 210, 50%, 40%).');
      H = h.num(s3[0], 'Ton'); S = h.num(s3[1], 'Doygunluk'); L = h.num(s3[2], 'Açıklık');
      if (S < 0 || S > 100) h.err('Doygunluk 0 ile 100 arasında olmalı.');
      if (L < 0 || L > 100) h.err('Açıklık 0 ile 100 arasında olmalı.');
      H = ((H % 360) + 360) % 360;
      const s = S / 100, l = L / 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const hp = H / 60;
      const x = c * (1 - Math.abs((hp % 2) - 1));
      let q;
      if (hp < 1) q = [c, x, 0]; else if (hp < 2) q = [x, c, 0]; else if (hp < 3) q = [0, c, x];
      else if (hp < 4) q = [0, x, c]; else if (hp < 5) q = [x, 0, c]; else q = [c, 0, x];
      const mm = l - c / 2;
      [r, g, b] = q.map((k) => Math.min(255, Math.max(0, Math.round((k + mm) * 255 + 1e-9))));
    } else {
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) || (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) && /[a-fA-F]/.test(t))) {
        let x = t.replace(/^#/, '');
        if (x.length === 3) x = x.split('').map((k) => k + k).join('');
        r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
      } else {
        const par = t.replace(/^rgba?\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;\/]+/).filter(Boolean);
        if (par.length !== 3) h.err('RGB için üç sayı (örn. 30, 144, 255) ya da bir HEX kodu (örn. #1E90FF) yazın.');
        [r, g, b] = par.map((p) => {
          if (!/^\d+$/.test(p)) h.err('RGB bileşenleri 0 ile 255 arasında tam sayı olmalı; "' + p + '" geçersiz.');
          const n = Number(p);
          if (n > 255) h.err('RGB bileşenleri 255\'i geçemez; "' + p + '" çok büyük.');
          return n;
        });
      }
      const R = r / 255, G = g / 255, B = b / 255;
      const mx = Math.max(R, G, B), mn = Math.min(R, G, B), d = mx - mn;
      const l = (mx + mn) / 2;
      let hh = 0;
      if (d > 0) {
        if (mx === R) hh = ((G - B) / d) % 6; else if (mx === G) hh = (B - R) / d + 2; else hh = (R - G) / d + 4;
        hh *= 60; if (hh < 0) hh += 360;
      }
      H = hh; S = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)) * 100; L = l * 100;
    }
    const iki = (n) => n.toString(16).toUpperCase().padStart(2, '0');
    const hex = '#' + iki(r) + iki(g) + iki(b);
    let hi = Math.round(H); if (hi === 360) hi = 0;
    const hsl = `hsl(${hi}, ${Math.round(S)}%, ${Math.round(L)}%)`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const aile = S < 1e-9 || L < 1e-9 || L > 100 - 1e-9 ? 'Renksiz (gri tonu)' : H < 15 || H >= 345 ? 'Kırmızı' : H < 45 ? 'Turuncu' : H < 70 ? 'Sarı' : H < 165 ? 'Yeşil' : H < 195 ? 'Camgöbeği' : H < 260 ? 'Mavi' : H < 290 ? 'Mor' : 'Macenta / pembe';
    const ortak = [['Ton (H)', h.fmt(H, 1) + '°'], ['Doygunluk (S)', '%' + h.fmt(S, 1)], ['Açıklık (L)', '%' + h.fmt(L, 1)], ['Renk ailesi', aile]];
    const rows = v.yon === 'hsl' ? [['RGB', rgb], ['HEX', hex], ['HSL', hsl], ...ortak] : [['HSL', hsl], ...ortak, ['RGB', rgb], ['HEX', hex]];
    return { rows, note: 'CSS yazımında ton ve yüzdeler en yakın tam sayıya yuvarlanır; ayrı satırlarda bir ondalık basamakla gösterilir.' };
  },
  cases: [
    { in: { renk: '30, 144, 255', yon: 'rgb' }, out: { 'HSL': 'hsl(210, 100%, 56%)', 'Ton (H)': '209,6°', 'Doygunluk (S)': '%100', 'Açıklık (L)': '%55,9', 'HEX': '#1E90FF', 'Renk ailesi': 'Mavi' } },
    { in: { renk: '210, 50%, 40%', yon: 'hsl' }, out: { 'RGB': 'rgb(51, 102, 153)', 'HEX': '#336699' } },
    { in: { renk: '255, 0, 0', yon: 'rgb' }, out: { 'HSL': 'hsl(0, 100%, 50%)', 'Renk ailesi': 'Kırmızı' } },
    { in: { renk: '#FF5733', yon: 'rgb' }, out: { 'HSL': 'hsl(11, 100%, 60%)', 'Ton (H)': '10,6°', 'RGB': 'rgb(255, 87, 51)' } },
    { in: { renk: 'hsl(120, 100%, 50%)', yon: 'hsl' }, out: { 'RGB': 'rgb(0, 255, 0)', 'HEX': '#00FF00', 'Renk ailesi': 'Yeşil' } },
    { in: { renk: '128, 128, 128', yon: 'rgb' }, out: { 'HSL': 'hsl(0, 0%, 50%)', 'Açıklık (L)': '%50,2', 'Renk ailesi': 'Renksiz (gri tonu)' } },
    { in: { renk: '0 0 100', yon: 'hsl' }, out: { 'RGB': 'rgb(255, 255, 255)', 'HEX': '#FFFFFF' } },
    { in: { renk: '-120, 100, 50', yon: 'hsl' }, out: { 'RGB': 'rgb(0, 0, 255)', 'Ton (H)': '240°' } },
    { in: { renk: '120, 150, 50', yon: 'hsl' }, error: true },
    { in: { renk: '256, 0, 0', yon: 'rgb' }, error: true },
    { in: { renk: 'mavi', yon: 'rgb' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden hangi gösterimden hangisine geçeceğinizi seçin.',
    'RGB\'den çeviriyorsanız üç kanalı <code>30, 144, 255</code> gibi yazın ya da doğrudan HEX kodunu (<code>#1E90FF</code>) girin.',
    'HSL\'den çeviriyorsanız önce tonu derece olarak, ardından doygunluk ve açıklığı yüzde olarak yazın: <code>210, 50%, 40%</code>. Yüzde işareti isteğe bağlıdır.',
    '"Çevir" düğmesine basın; CSS yazımları ile ton, doygunluk ve açıklık değerleri ayrı satırlarda görünür.',
    'İhtiyacınız olan satırı kopyalayıp stil dosyanıza ya da tasarım aracınıza yapıştırın.',
  ],
  sections: [
    { h: 'HSL modeli rengi nasıl tarif eder?', p: [
      'RGB, ekranın rengi nasıl ürettiğini anlatır: üç ışığın her biri ne kadar açık? Bu, makine için doğal ama insan için zor bir dildir; <code>rgb(51, 102, 153)</code> yazısına bakıp rengi hayal etmek kolay değildir. HSL ise rengi insanların konuştuğu gibi üç özellikle tanımlar.',
    ], ul: [
      '<strong>Ton (Hue)</strong>: rengin renk çemberi üzerindeki açısıdır, 0° ile 360° arasında değişir. 0° kırmızı, 60° sarı, 120° yeşil, 180° camgöbeği, 240° mavi, 300° macentadır; 360° yeniden kırmızıya döner.',
      '<strong>Doygunluk (Saturation)</strong>: rengin ne kadar canlı olduğudur. %0 tamamen gri, %100 o tonun en saf hâlidir.',
      '<strong>Açıklık (Lightness)</strong>: rengin siyahla beyaz arasındaki yeridir. %0 siyah, %100 beyaz, %50 ise tonun en dolgun göründüğü orta noktadır.',
    ] },
    { h: 'RGB\'den HSL\'ye çevirme formülü ve örnek', p: [
      'Önce üç kanal 255\'e bölünerek 0–1 aralığına getirilir. En büyük değere <em>max</em>, en küçüğe <em>min</em>, farklarına <em>d</em> denir. <strong>Açıklık</strong> L = (max + min) ÷ 2 ile bulunur. <strong>Doygunluk</strong>, d sıfırsa 0, değilse S = d ÷ (1 − |2L − 1|) formülüyle hesaplanır. <strong>Ton</strong> hangi kanalın en büyük olduğuna bağlıdır: kırmızıysa 60 × ((G − B) ÷ d), yeşilse 60 × ((B − R) ÷ d + 2), maviyse 60 × ((R − G) ÷ d + 4); sonuç negatifse 360 eklenir.',
      'Örnek: <code>rgb(30, 144, 255)</code>. Normalleştirilmiş değerler 0,1176, 0,5647 ve 1\'dir. max = 1, min = 0,1176, d = 0,8824. L = (1 + 0,1176) ÷ 2 = 0,5588, yani %55,9. S = 0,8824 ÷ (1 − |1,1176 − 1|) = 0,8824 ÷ 0,8824 = 1, yani %100. En büyük kanal mavi olduğundan ton = 60 × ((30 − 144) ÷ 225 + 4) = 60 × 3,4933 = 209,6°. Yuvarlanınca <code>hsl(210, 100%, 56%)</code> elde edilir; araç da aynı sonucu verir.',
    ] },
    { h: 'HSL\'den RGB\'ye çevirme', p: [
      'Ters yönde önce renk yoğunluğu (kroma) hesaplanır: C = (1 − |2L − 1|) × S. Ton 60\'a bölünerek çemberin altı diliminden hangisinde olduğu bulunur ve ikinci büyük bileşen X = C × (1 − |(H ÷ 60) mod 2 − 1|) ile elde edilir. Dilime göre (C, X, 0) üçlüsünün sırası belirlenir, sonra her bileşene m = L − C ÷ 2 eklenip 255 ile çarpılır.',
      'Örnek: <code>hsl(210, 50%, 40%)</code>. C = (1 − |0,8 − 1|) × 0,5 = 0,4. H ÷ 60 = 3,5 olduğundan X = 0,4 × (1 − 0,5) = 0,2 ve renk dördüncü dilimdedir: (0, X, C) = (0, 0,2, 0,4). m = 0,4 − 0,2 = 0,2 eklenince (0,2, 0,4, 0,6) bulunur; 255 ile çarpılınca <code>rgb(51, 102, 153)</code>, yani <code>#336699</code> çıkar.',
    ] },
    { h: 'Tasarımda HSL neden kullanışlıdır?', p: [
      'HSL\'nin asıl gücü, bir rengi sistemli biçimde değiştirebilmektir. Bir düğmenin üzerine gelindiğinde biraz koyulaşmasını istiyorsanız yalnızca açıklığı 8–10 puan düşürürsünüz; ton ve doygunluk aynı kalır, renk karakterini korur. Aynı işi RGB ile yapmak üç kanalı birden oranlı değiştirmeyi gerektirir. Bir markanın ana renginden açık arka plan, orta ton çerçeve ve koyu metin rengi türetmek HSL\'de tek bir sayıyı oynatmaktan ibarettir.',
      'Uyumlu paletler de ton üzerinden kurulur: tona 180° eklenirse tamamlayıcı renk, ±30° eklenirse komşu (analog) renkler, 120° aralıklarla üçlü uyum elde edilir. CSS değişkenleriyle tonu tek yerde tutup doygunluk ve açıklığı bileşen bazında ayarlamak, açık ve koyu tema üretmeyi de kolaylaştırır.',
    ] },
    { h: 'Bilinmesi gereken sınırlar', p: [
      'HSL açıklığı, gözün algıladığı parlaklıkla aynı şey değildir. <code>hsl(60, 100%, 50%)</code> sarı ile <code>hsl(240, 100%, 50%)</code> mavinin açıklığı kâğıt üzerinde eşittir, ancak sarı göze çok daha parlak görünür. Bu nedenle metin okunabilirliğini açıklık değerine bakarak değil, kontrast oranını hesaplayarak değerlendirin.',
      'Gri tonlarında (doygunluk %0) ton tanımsızdır; araç bu durumda tonu 0° gösterir ve rengi "renksiz" olarak işaretler. Açıklık %0 ya da %100 olduğunda da ton ve doygunluk ne olursa olsun sonuç siyah ya da beyazdır. Ayrıca RGB kanalları tam sayı olduğu için HSL → RGB → HSL gidiş dönüşünde bir derecelik ya da bir puanlık yuvarlama farkı oluşabilir; bu görünür bir renk farkı yaratmaz.',
    ] },
    { h: 'Hızlı başvuru: ton açıları', ul: [
      '<strong>0°</strong> kırmızı – hsl(0, 100%, 50%) = #FF0000',
      '<strong>30°</strong> turuncu – hsl(30, 100%, 50%) = #FF8000',
      '<strong>60°</strong> sarı – hsl(60, 100%, 50%) = #FFFF00',
      '<strong>120°</strong> yeşil – hsl(120, 100%, 50%) = #00FF00',
      '<strong>180°</strong> camgöbeği – hsl(180, 100%, 50%) = #00FFFF',
      '<strong>240°</strong> mavi – hsl(240, 100%, 50%) = #0000FF',
      '<strong>300°</strong> macenta – hsl(300, 100%, 50%) = #FF00FF',
    ] },
  ],
  faq: [
    ['HSL açılımı nedir?', 'Hue, Saturation, Lightness sözcüklerinin baş harfleridir; Türkçe karşılığı ton, doygunluk ve açıklıktır. Ton derece, diğer ikisi yüzde olarak yazılır.'],
    ['HSL ile HSV (HSB) aynı şey mi?', 'Hayır. İkisinde de ton aynıdır ama üçüncü bileşen farklıdır: HSL\'de %100 açıklık her zaman beyazdır, HSV\'de %100 değer tonun en parlak hâlidir. Bu araç CSS\'in desteklediği HSL modelini kullanır.'],
    ['Gri bir rengin tonu neden 0° çıkıyor?', 'Üç kanal eşit olduğunda renk çemberinde bir yön yoktur, ton tanımsızdır. Yazım gereği 0 kabul edilir; doygunluk %0 olduğu için tonun değeri sonucu etkilemez.'],
    ['Bir rengi HSL ile nasıl koyulaştırırım?', 'Ton ve doygunluğu sabit tutup açıklığı düşürün. Örneğin hsl(210, 50%, 40%) rengini hsl(210, 50%, 30%) yaparsanız aynı mavinin daha koyu bir tonunu elde edersiniz.'],
    ['Ton değeri 360\'tan büyük ya da negatif olabilir mi?', 'Evet, ton bir açı olduğu için çember etrafında döner. 370° ile 10°, −120° ile 240° aynı tonu verir. Araç değeri 0–360 aralığına indirger.'],
    ['Tüm tarayıcılar hsl() yazımını destekler mi?', 'hsl() ve hsla() işlevleri CSS\'in uzun süredir standart parçasıdır ve güncel tarayıcıların tamamında çalışır.'],
    ['HEX kodunu doğrudan HSL\'ye çevirebilir miyim?', 'Evet. "RGB / HEX → HSL" yönünü seçip HEX kodunu # işaretiyle yazmanız yeterlidir; araç önce kanalları ayırır, sonra HSL değerlerini hesaplar.'],
    ['Girdiğim renkler bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['hex-rgb-cevir', 'cmyk-rgb-cevir', 'renk-tonu-olustur', 'renk-paleti-olustur', 'renk-secici', 'renk-kontrast-hesapla'],
};
