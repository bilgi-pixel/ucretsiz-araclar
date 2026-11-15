export default {
  slug: 'html-renk-adi-bul',
  title: 'HTML Renk Adı Bulma',
  h1Tail: 'HEX ↔ renk adı',
  pageTitle: 'HTML Renk Adı Bulma – HEX Kodundan CSS Renk Adı ve Tersi',
  description: 'HEX ya da RGB kodunun karşılık geldiği HTML/CSS renk adını bulun; tam eşleşme yoksa en yakın adı görün. Renk adından HEX ve RGB koduna da çevirir.',
  card: 'HEX ya da RGB kodunun en yakın CSS renk adını bulun; tomato, teal gibi adların kodunu öğrenin.',
  category: 'gelistirici',
  keywords: ['html renk adı', 'css renk adları', 'hex renk adı bulma', 'renk kodu adı', 'en yakın renk adı', 'html renk isimleri', 'named colors', 'renk adından hex'],
  lead: 'CSS\'te <code>tomato</code>, <code>teal</code> ya da <code>rebeccapurple</code> gibi 148 hazır renk adı vardır. Bu araç yazdığınız HEX ya da RGB kodunun hangi ada karşılık geldiğini, tam karşılığı yoksa <strong>en yakın renk adını</strong> bulur; ad yazarsanız kodunu verir.',
  button: 'Bul',
  inputs: [
    { id: 'renk', label: 'Renk', type: 'text', placeholder: 'Örn. #FF6347, rgb(255, 99, 71) ya da tomato', wide: true, hint: 'HEX kodu (3 ya da 6 basamak), RGB değeri ya da İngilizce CSS renk adı yazın.' },
  ],
  compute(v, h) {
    const TABLO = 'aliceblue:f0f8ff antiquewhite:faebd7 aqua:00ffff aquamarine:7fffd4 azure:f0ffff beige:f5f5dc bisque:ffe4c4 black:000000 blanchedalmond:ffebcd blue:0000ff blueviolet:8a2be2 brown:a52a2a burlywood:deb887 cadetblue:5f9ea0 chartreuse:7fff00 chocolate:d2691e coral:ff7f50 cornflowerblue:6495ed cornsilk:fff8dc crimson:dc143c cyan:00ffff darkblue:00008b darkcyan:008b8b darkgoldenrod:b8860b darkgray:a9a9a9 darkgreen:006400 darkgrey:a9a9a9 darkkhaki:bdb76b darkmagenta:8b008b darkolivegreen:556b2f darkorange:ff8c00 darkorchid:9932cc darkred:8b0000 darksalmon:e9967a darkseagreen:8fbc8f darkslateblue:483d8b darkslategray:2f4f4f darkslategrey:2f4f4f darkturquoise:00ced1 darkviolet:9400d3 deeppink:ff1493 deepskyblue:00bfff dimgray:696969 dimgrey:696969 dodgerblue:1e90ff firebrick:b22222 floralwhite:fffaf0 forestgreen:228b22 fuchsia:ff00ff gainsboro:dcdcdc ghostwhite:f8f8ff gold:ffd700 goldenrod:daa520 gray:808080 green:008000 greenyellow:adff2f grey:808080 honeydew:f0fff0 hotpink:ff69b4 indianred:cd5c5c indigo:4b0082 ivory:fffff0 khaki:f0e68c lavender:e6e6fa lavenderblush:fff0f5 lawngreen:7cfc00 lemonchiffon:fffacd lightblue:add8e6 lightcoral:f08080 lightcyan:e0ffff lightgoldenrodyellow:fafad2 lightgray:d3d3d3 lightgreen:90ee90 lightgrey:d3d3d3 lightpink:ffb6c1 lightsalmon:ffa07a lightseagreen:20b2aa lightskyblue:87cefa lightslategray:778899 lightslategrey:778899 lightsteelblue:b0c4de lightyellow:ffffe0 lime:00ff00 limegreen:32cd32 linen:faf0e6 magenta:ff00ff maroon:800000 mediumaquamarine:66cdaa mediumblue:0000cd mediumorchid:ba55d3 mediumpurple:9370db mediumseagreen:3cb371 mediumslateblue:7b68ee mediumspringgreen:00fa9a mediumturquoise:48d1cc mediumvioletred:c71585 midnightblue:191970 mintcream:f5fffa mistyrose:ffe4e1 moccasin:ffe4b5 navajowhite:ffdead navy:000080 oldlace:fdf5e6 olive:808000 olivedrab:6b8e23 orange:ffa500 orangered:ff4500 orchid:da70d6 palegoldenrod:eee8aa palegreen:98fb98 paleturquoise:afeeee palevioletred:db7093 papayawhip:ffefd5 peachpuff:ffdab9 peru:cd853f pink:ffc0cb plum:dda0dd powderblue:b0e0e6 purple:800080 rebeccapurple:663399 red:ff0000 rosybrown:bc8f8f royalblue:4169e1 saddlebrown:8b4513 salmon:fa8072 sandybrown:f4a460 seagreen:2e8b57 seashell:fff5ee sienna:a0522d silver:c0c0c0 skyblue:87ceeb slateblue:6a5acd slategray:708090 slategrey:708090 snow:fffafa springgreen:00ff7f steelblue:4682b4 tan:d2b48c teal:008080 thistle:d8bfd8 tomato:ff6347 turquoise:40e0d0 violet:ee82ee wheat:f5deb3 white:ffffff whitesmoke:f5f5f5 yellow:ffff00 yellowgreen:9acd32';
    const adlar = new Map(); // ad → hex
    const gruplar = new Map(); // hex → [adlar]
    for (const p of TABLO.split(' ')) {
      const [ad, hx] = p.split(':');
      adlar.set(ad, hx);
      if (!gruplar.has(hx)) gruplar.set(hx, []);
      gruplar.get(hx).push(ad);
    }
    const ham = String(v.renk ?? '').trim();
    if (ham === '') h.err('"Renk" alanına bir HEX kodu, RGB değeri ya da renk adı yazın (örn. #FF6347).');
    const kucuk = ham.replace(/İ/g, 'i').replace(/I/g, 'i').toLowerCase();
    const bitisik = kucuk.replace(/[\s_-]+/g, '');
    let rgb = null;
    let adGirdi = null;
    let m;
    if (adlar.has(bitisik)) {
      adGirdi = bitisik;
      const hx = adlar.get(bitisik);
      rgb = [0, 2, 4].map((i) => parseInt(hx.slice(i, i + 2), 16));
    } else if ((m = /^#?([0-9a-f]{6})$/.exec(bitisik))) {
      rgb = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
    } else if ((m = /^#?([0-9a-f]{3})$/.exec(bitisik))) {
      rgb = [0, 1, 2].map((i) => parseInt(m[1][i] + m[1][i], 16));
    } else if ((m = /^(?:rgba?\s*\(\s*)?(\d{1,3})\s*[,;\s]\s*(\d{1,3})\s*[,;\s]\s*(\d{1,3})\s*\)?$/.exec(kucuk))) {
      rgb = [Number(m[1]), Number(m[2]), Number(m[3])];
      if (rgb.some((x) => x > 255)) h.err('RGB bileşenleri 0 ile 255 arasında olmalıdır; değerleri kontrol edin.');
    } else if (/^#?[0-9a-f]+$/.test(bitisik)) {
      h.err('HEX renk kodu 3 ya da 6 onaltılık basamaktan oluşmalıdır (örn. #F60 ya da #FF6600).');
    } else if (/^[a-zçğıöşü]+$/.test(bitisik)) {
      h.err(`"${ham}" tanınan bir CSS renk adı değil. Adlar İngilizcedir (örn. red, navy, tomato); Türkçe ad yerine HEX ya da RGB kodu yazabilirsiniz.`);
    } else {
      h.err('Renk tanınamadı. #FF6347 gibi bir HEX kodu, rgb(255, 99, 71) gibi bir RGB değeri ya da tomato gibi bir renk adı yazın.');
    }
    const HEX = (a) => '#' + a.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    const liste = [];
    for (const [hx, ad] of gruplar) {
      const c = [0, 2, 4].map((i) => parseInt(hx.slice(i, i + 2), 16));
      const d = Math.sqrt((c[0] - rgb[0]) ** 2 + (c[1] - rgb[1]) ** 2 + (c[2] - rgb[2]) ** 2);
      liste.push({ ad: ad.join(' / '), c, d });
    }
    liste.sort((x, y) => x.d - y.d);
    const en = liste[0];
    const tam = en.d === 0;
    const parlaklik = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    const rows = [
      ['Renk adı', en.ad],
      ['Eşleşme', tam ? 'Tam eşleşme' : `En yakın ad (uzaklık ${h.fmt(en.d, 2)})`],
      ['Girilen renk (HEX)', HEX(rgb)],
      ['Girilen renk (RGB)', `rgb(${rgb.join(', ')})`],
    ];
    if (!tam) {
      rows.push(['Adın HEX kodu', HEX(en.c)]);
      rows.push(['Adın RGB değeri', `rgb(${en.c.join(', ')})`]);
    }
    rows.push([tam ? 'En yakın diğer adlar' : 'Sonraki en yakın adlar', liste.slice(1, 4).map((x) => `${x.ad} (${HEX(x.c)})`).join(', ')]);
    rows.push(['Üzerine yazı rengi önerisi', parlaklik > 0.6 ? 'Koyu (siyah) yazı' : 'Açık (beyaz) yazı']);
    return {
      rows,
      note: tam
        ? (adGirdi ? 'Yazdığınız ad CSS\'te tanımlıdır; kodda adı ya da HEX kodunu kullanabilirsiniz.' : 'Bu kodun CSS\'te tam karşılığı olan bir adı var.')
        : 'Bu kodun tam karşılığı olan bir ad yok; gösterilen ad RGB uzayında en yakın olandır ve renk birebir aynı değildir.',
    };
  },
  cases: [
    { in: { renk: '#FF6347' }, out: { 'Renk adı': 'tomato', 'Eşleşme': 'Tam eşleşme', 'Girilen renk (RGB)': 'rgb(255, 99, 71)' } },
    { in: { renk: 'rebeccapurple' }, out: { 'Renk adı': 'rebeccapurple', 'Girilen renk (HEX)': '#663399', 'Girilen renk (RGB)': 'rgb(102, 51, 153)' } },
    { in: { renk: '#FE0000' }, out: { 'Renk adı': 'red', 'Eşleşme': 'En yakın ad (uzaklık 1)', 'Adın HEX kodu': '#FF0000' } },
    { in: { renk: 'rgb(255, 165, 0)' }, out: { 'Renk adı': 'orange', 'Eşleşme': 'Tam eşleşme', 'Girilen renk (HEX)': '#FFA500' } },
    { in: { renk: '0ff' }, out: { 'Renk adı': 'aqua / cyan', 'Girilen renk (HEX)': '#00FFFF', 'Üzerine yazı rengi önerisi': 'Koyu (siyah) yazı' } },
    { in: { renk: '#010101' }, out: { 'Renk adı': 'black', 'Eşleşme': 'En yakın ad (uzaklık 1,73)', 'Adın RGB değeri': 'rgb(0, 0, 0)', 'Üzerine yazı rengi önerisi': 'Açık (beyaz) yazı' } },
    { in: { renk: 'Dark Gray' }, out: { 'Renk adı': 'darkgray / darkgrey', 'Girilen renk (HEX)': '#A9A9A9' } },
    { in: { renk: '0 128 0' }, out: { 'Renk adı': 'green', 'Eşleşme': 'Tam eşleşme' } },
    { in: { renk: 'kırmızı' }, error: true },
    { in: { renk: '#12345' }, error: true },
    { in: { renk: 'rgb(300, 0, 0)' }, error: true },
    { in: { renk: '' }, error: true },
  ],
  howto: [
    '"Renk" kutusuna aradığınız rengi yazın. Üç biçim kabul edilir: <code>#FF6347</code> ya da <code>#F60</code> gibi HEX kodu, <code>rgb(255, 99, 71)</code> gibi RGB değeri ya da <code>tomato</code> gibi İngilizce renk adı.',
    '"Bul" düğmesine basın. İlk satırda rengin CSS adı, ikinci satırda bunun tam eşleşme mi yoksa en yakın ad mı olduğu yazar.',
    'Tam eşleşme yoksa "Adın HEX kodu" satırına bakarak adın gerçekte hangi renge karşılık geldiğini, uzaklık değerinden de farkın büyüklüğünü görün.',
    'Alternatif arıyorsanız yakınlık sırasıyla listelenen diğer üç ada göz atın; beğendiğiniz adı ya da kodu kopyalayıp stil dosyanıza yapıştırın.',
  ],
  sections: [
    { h: 'CSS renk adları nereden geliyor?', p: [
      'İlk HTML sürümleri yalnızca on altı renk adını tanıyordu: black, white, gray, silver, red, maroon, yellow, olive, lime, green, aqua, teal, blue, navy, fuchsia ve purple. Sonradan tarayıcılar, Unix dünyasındaki X11 pencere sisteminin renk listesini de desteklemeye başladı ve bu adlar zamanla CSS standardına girdi. Listeye en son eklenen ad, 2014\'te kabul edilen <code>rebeccapurple</code> (#663399) oldu. Bugün tüm güncel tarayıcılar 148 adı tanır.',
      'Adların X11\'den devralınmış olması bazı tuhaflıkları da açıklar. Liste sistemli bir renk düzenine göre değil, yıllar içinde farklı kişilerce eklenen adlarla oluşmuştur; bu yüzden renk uzayının bazı bölgelerinde çok sayıda ad varken bazı bölgelerinde hiç yoktur.',
    ] },
    { h: 'En yakın ad nasıl bulunuyor?', p: [
      'Olası 16.777.216 HEX kodunun yalnızca 139\'unun bir adı vardır (148 adın bazıları aynı rengi gösterir). Yazdığınız kodun tam karşılığı yoksa araç, kodun kırmızı, yeşil ve mavi bileşenlerini üç boyutlu bir uzayda nokta sayar ve adlandırılmış her renge olan düz çizgi uzaklığını hesaplar: <strong>uzaklık = √((R₁−R₂)² + (G₁−G₂)² + (B₁−B₂)²)</strong>. En küçük uzaklığa sahip ad sonuç olarak gösterilir.',
      'Çözümlü örnek: <code>#010101</code> kodunun bileşenleri (1, 1, 1)\'dir. Siyaha (0, 0, 0) uzaklığı √(1 + 1 + 1) = √3, yani yaklaşık 1,73 eder; bu kadar küçük bir fark gözle ayırt edilemez. <code>#FE0000</code> için kırmızıya uzaklık tam 1\'dir. Uzaklık 0 ise tam eşleşme vardır; kabaca 10\'un altındaki değerlerde iki renk yan yana konmadıkça fark edilmez, 40–50\'nin üzerinde ise ad artık rengi iyi temsil etmiyor demektir. En büyük olası uzaklık siyah ile beyaz arasındadır ve yaklaşık 441,67\'dir.',
      'Bu ölçü basit ve öngörülebilirdir ama insan gözünün algısıyla birebir örtüşmez; göz yeşil tonlardaki farklara maviye göre daha duyarlıdır. Sonucu kesin hüküm değil, iyi bir başlangıç önerisi olarak değerlendirin.',
    ] },
    { h: 'Şaşırtan adlar', ul: [
      '<strong>green</strong> saf yeşil değildir: kodu <code>#008000</code>, yani yarı parlaklıkta yeşildir. Tam parlak yeşilin (<code>#00FF00</code>) adı <strong>lime</strong>\'dır.',
      '<strong>darkgray</strong> (<code>#A9A9A9</code>), adının aksine <strong>gray</strong>\'den (<code>#808080</code>) daha açıktır. Bunun nedeni iki adın farklı kaynaklardan gelmesidir.',
      '<strong>aqua</strong> ile <strong>cyan</strong> aynı renktir (<code>#00FFFF</code>); <strong>fuchsia</strong> ile <strong>magenta</strong> da öyle (<code>#FF00FF</code>).',
      'İçinde "gray" geçen yedi adın tamamı "grey" yazımıyla da geçerlidir: gray/grey, darkgray/darkgrey, lightgray/lightgrey, dimgray/dimgrey, slategray/slategrey, darkslategray/darkslategrey ve lightslategray/lightslategrey.',
      '<strong>orange</strong> (<code>#FFA500</code>) ilk on altı renk arasında yoktu; CSS\'e sonradan tek başına eklendi.',
    ] },
    { h: 'Ad mı kullanmalı, kod mu?', p: [
      'Renk adları okunaklıdır: stil dosyasında <code>color: navy</code> satırını gören herkes neyin kastedildiğini anlar. Prototip hazırlarken, eğitim örneklerinde, hata ayıklama sırasında bir kutuyu hızlıca boyamak için idealdir. Ad ile HEX kodu tarayıcı açısından tamamen eşdeğerdir; hız ya da uyumluluk farkı yoktur.',
      'Öte yandan kurumsal kimlik renkleri neredeyse hiçbir zaman bir ada tam denk gelmez. Marka renginiz <code>#7B2331</code> ise en yakın ad yalnızca kabaca benzeyen bir tondur; kurumsal işlerde her zaman tam kodu kullanın. Adlar bu durumda yalnızca rengi sözle tarif etmek ("bordoya yakın") ya da değişkenlere anlamlı ad vermek için işe yarar.',
      'Araç ayrıca rengin algılanan parlaklığına göre üzerine koyu mu açık mı yazı yazılması gerektiğini önerir. Bu kaba bir yönlendirmedir; erişilebilirlik için kesin sonuç gerektiğinde kontrast oranını ayrıca ölçün.',
    ] },
    { h: 'Sık kullanılan adlar ve kodları', ul: [
      '<strong>white</strong> #FFFFFF · <strong>black</strong> #000000 · <strong>gray</strong> #808080 · <strong>silver</strong> #C0C0C0',
      '<strong>red</strong> #FF0000 · <strong>crimson</strong> #DC143C · <strong>maroon</strong> #800000 · <strong>tomato</strong> #FF6347',
      '<strong>orange</strong> #FFA500 · <strong>gold</strong> #FFD700 · <strong>yellow</strong> #FFFF00 · <strong>khaki</strong> #F0E68C',
      '<strong>green</strong> #008000 · <strong>lime</strong> #00FF00 · <strong>olive</strong> #808000 · <strong>teal</strong> #008080',
      '<strong>blue</strong> #0000FF · <strong>navy</strong> #000080 · <strong>royalblue</strong> #4169E1 · <strong>skyblue</strong> #87CEEB',
      '<strong>purple</strong> #800080 · <strong>indigo</strong> #4B0082 · <strong>violet</strong> #EE82EE · <strong>pink</strong> #FFC0CB',
      '<strong>brown</strong> #A52A2A · <strong>chocolate</strong> #D2691E · <strong>tan</strong> #D2B48C · <strong>beige</strong> #F5F5DC',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca standart 148 CSS adını bilir; <code>transparent</code> ve <code>currentColor</code> gibi özel anahtar sözcükler, sistem renkleri ve boya kartelalarındaki ticari adlar kapsam dışındadır. Saydamlık (alfa) değeri dikkate alınmaz; sekiz basamaklı HEX kodları kabul edilmez. Adlar İngilizcedir ve tarayıcılar yalnızca bu yazımları tanır; "kırmızı" gibi Türkçe adlar CSS\'te geçerli değildir.',
    ] },
  ],
  faq: [
    ['HTML\'de kaç renk adı vardır?', 'Güncel CSS standardında 148 renk adı tanımlıdır. Bunların bir kısmı aynı rengin iki yazımı olduğundan (aqua/cyan, gray/grey gibi) birbirinden farklı renk sayısı 139\'dur.'],
    ['Her HEX kodunun bir adı var mı?', 'Hayır. On altı milyondan fazla HEX kodunun yalnızca 139\'unun adı vardır. Diğer kodlar için araç en yakın adı ve aradaki uzaklığı gösterir; ad, rengi birebir vermez.'],
    ['Renk adları büyük-küçük harfe duyarlı mı?', 'Hayır. CSS\'te Tomato, TOMATO ve tomato aynı rengi verir. Araç da harf büyüklüğünü ve "dark gray" gibi araya konmuş boşlukları dikkate almaz; ancak CSS\'te adlar bitişik yazılmalıdır.'],
    ['Türkçe renk adı yazabilir miyim?', 'Hayır. CSS yalnızca İngilizce adları tanır. Türkçe adını bildiğiniz bir rengin kodunu arıyorsanız HEX ya da RGB değerini yazın; araç karşılık gelen İngilizce adı bulur.'],
    ['gray ile grey arasında fark var mı?', 'Yok. İkisi de #808080 rengini verir; biri Amerikan, diğeri İngiliz yazımıdır. İçinde gray geçen diğer adlar için de iki yazım geçerlidir.'],
    ['Renk adı kullanmak sayfayı yavaşlatır mı?', 'Hayır. Tarayıcı adı doğrudan sayısal değere çevirir; HEX koduyla arasında ölçülebilir bir fark yoktur. Seçim tamamen okunabilirlik ve tutarlılık meselesidir.'],
    ['Uzaklık değeri neyi gösterir?', 'Yazdığınız renk ile bulunan adın rengi arasındaki RGB uzaklığıdır. 0 tam eşleşme demektir; değer büyüdükçe iki renk birbirinden uzaklaşır. Olası en büyük değer siyah ile beyaz arasındaki yaklaşık 441,67\'dir.'],
    ['Yazdığım renk kodları kaydediliyor mu?', 'Hayır. Arama tarayıcınızın içindeki tabloda yapılır; yazdığınız kod ya da ad sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['hex-rgb-cevir', 'renk-secici', 'renk-kontrast-hesapla', 'renk-tonu-olustur', 'renk-paleti-olustur', 'rgb-hsl-cevir'],
};
