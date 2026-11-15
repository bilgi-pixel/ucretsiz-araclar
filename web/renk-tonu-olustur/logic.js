// Renk Tonları Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Ana renk" alanını doldurun (örn. #3366CC).');
    let rgb;
    if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) {
      let x = t.replace(/^#/, '');
      if (x.length === 3) x = x.split('').map((k) => k + k).join('');
      rgb = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
    } else {
      const par = t.replace(/^rgb\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;]+/).filter(Boolean);
      if (par.length !== 3 || par.some((p) => !/^\d+$/.test(p) || Number(p) > 255)) h.err('Rengi HEX kodu (örn. #3366CC) ya da 0–255 arası üç RGB değeri (örn. 51, 102, 204) olarak yazın.');
      rgb = par.map(Number);
    }
    const n = h.posint(v.adim, 'Her yönde ton sayısı');
    if (n > 20) h.err('"Her yönde ton sayısı" en fazla 20 olabilir.');
    const iki = (k) => k.toString(16).toUpperCase().padStart(2, '0');
    const hex = (c) => '#' + c.map(iki).join('');
    const acik = [], koyu = [];
    for (let i = 1; i <= n; i++) {
      const o = i / (n + 1);
      acik.push(hex(rgb.map((c) => Math.round(c + (255 - c) * o + 1e-9))));
      koyu.push(hex(rgb.map((c) => Math.round(c * (1 - o) + 1e-9))));
    }
    const ana = hex(rgb);
    const satir = [':root {'];
    for (let i = n; i >= 1; i--) satir.push('  --renk-acik-' + i + ': ' + acik[i - 1] + ';');
    satir.push('  --renk: ' + ana + ';');
    for (let i = 1; i <= n; i++) satir.push('  --renk-koyu-' + i + ': ' + koyu[i - 1] + ';');
    satir.push('}');
    return {
      rows: [
        ['Ana renk', ana],
        ['Açık tonlar (beyaza doğru)', acik.join(', ')],
        ['Koyu tonlar (siyaha doğru)', koyu.join(', ')],
        ['Adım aralığı', '%' + h.fmt(100 / (n + 1), 2)],
        ['Toplam renk', String(2 * n + 1)],
      ],
      text: satir.join('\n'),
      note: 'Tonlar RGB kanallarında doğrusal karışımla üretilir; liste ana renge en yakın tondan başlar.',
    };
  }
