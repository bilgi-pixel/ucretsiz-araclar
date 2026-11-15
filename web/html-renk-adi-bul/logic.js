// HTML Renk Adı Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
