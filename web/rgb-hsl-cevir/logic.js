// RGB HSL Renk Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
