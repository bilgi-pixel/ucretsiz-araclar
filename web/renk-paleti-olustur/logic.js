// Uyumlu Renk Paleti Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Ana renk" alanını doldurun (örn. #336699).');
    let rgb;
    if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)) {
      let x = t.replace(/^#/, '');
      if (x.length === 3) x = x.split('').map((k) => k + k).join('');
      rgb = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
    } else {
      const par = t.replace(/^rgb\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;]+/).filter(Boolean);
      if (par.length !== 3 || par.some((p) => !/^\d+$/.test(p) || Number(p) > 255)) h.err('Rengi HEX kodu (örn. #336699) ya da 0–255 arası üç RGB değeri (örn. 51, 102, 153) olarak yazın.');
      rgb = par.map(Number);
    }
    const [R, G, B] = rgb.map((c) => c / 255);
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B), d = mx - mn;
    const L = (mx + mn) / 2;
    let H = 0;
    if (d > 0) {
      if (mx === R) H = ((G - B) / d) % 6; else if (mx === G) H = (B - R) / d + 2; else H = (R - G) / d + 4;
      H *= 60; if (H < 0) H += 360;
    }
    const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));
    const iki = (k) => k.toString(16).toUpperCase().padStart(2, '0');
    const hsl2hex = (hh, s, l) => {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const hp = ((((hh % 360) + 360) % 360) / 60);
      const x = c * (1 - Math.abs((hp % 2) - 1));
      let q;
      if (hp < 1) q = [c, x, 0]; else if (hp < 2) q = [x, c, 0]; else if (hp < 3) q = [0, c, x];
      else if (hp < 4) q = [0, x, c]; else if (hp < 5) q = [x, 0, c]; else q = [c, 0, x];
      const m = l - c / 2;
      return '#' + q.map((k) => iki(Math.min(255, Math.max(0, Math.round((k + m) * 255 + 1e-9))))).join('');
    };
    const tablo = {
      tamamlayici: ['Tamamlayıcı (180°)', [0, 180]],
      analog: ['Analog (±30°)', [0, 30, 330]],
      uclu: ['Üçlü (120° aralıklı)', [0, 120, 240]],
      ayrik: ['Ayrık tamamlayıcı (150° ve 210°)', [0, 150, 210]],
      kare: ['Kare dörtlü (90° aralıklı)', [0, 90, 180, 270]],
      dikdortgen: ['Dikdörtgen dörtlü (60°, 180°, 240°)', [0, 60, 180, 240]],
    };
    const ana = '#' + rgb.map(iki).join('');
    const yuv = (n) => { const r = Math.round(n + 1e-9); return r === 360 ? 0 : r; };
    let ad, renkler, aciklama;
    if (v.uyum === 'tekrenk') {
      ad = 'Tek renkli (açıklık ±15 ve ±30 puan)';
      const ls = [-30, -15, 0, 15, 30].map((k) => Math.min(1, Math.max(0, L + k / 100)));
      renkler = ls.map((l, i) => (i === 2 ? ana : hsl2hex(H, S, l)));
      aciklama = ls.map((l) => 'açıklık %' + h.fmt(l * 100, 0));
    } else {
      const sec = tablo[v.uyum] || tablo.tamamlayici;
      ad = sec[0];
      renkler = sec[1].map((o, i) => (i === 0 ? ana : hsl2hex(H + o, S, L)));
      aciklama = sec[1].map((o) => 'ton ' + yuv((H + o) % 360) + '°');
    }
    const rows = [
      ['Palet', renkler.join(', ')],
      ['Uyum türü', ad],
      ['Ana rengin HSL değeri', `hsl(${yuv(H)}, ${Math.round(S * 100 + 1e-9)}%, ${Math.round(L * 100 + 1e-9)}%)`],
    ];
    renkler.forEach((c, i) => rows.push(['Renk ' + (i + 1), c + ' (' + aciklama[i] + ')']));
    const text = ':root {\n' + renkler.map((c, i) => '  --palet-' + (i + 1) + ': ' + c + ';').join('\n') + '\n}';
    const gri = S < 1e-9;
    return {
      rows, text,
      note: gri && v.uyum !== 'tekrenk'
        ? 'Ana renk gri tonunda (doygunluğu sıfır) olduğu için tonu döndürmek rengi değiştirmez. Renkli bir ana renk seçin ya da "Tek renkli" uyumu kullanın.'
        : 'Renkler, ana rengin doygunluğu ve açıklığı korunarak tonunun renk çemberinde döndürülmesiyle (HSL) hesaplanır.',
    };
  }
