// CMYK RGB Renk Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Renk değeri" alanını doldurun.');
    let r, g, b, C, M, Y, K;
    if (v.yon === 'rgb') {
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) || (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) && /[a-fA-F]/.test(t))) {
        let x = t.replace(/^#/, '');
        if (x.length === 3) x = x.split('').map((k) => k + k).join('');
        r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
      } else {
        const par = t.replace(/^rgba?\s*\(/i, '').replace(/\)\s*;?$/, '').split(/[\s,;\/]+/).filter(Boolean);
        if (par.length !== 3) h.err('RGB için üç sayı (örn. 51, 102, 153) ya da bir HEX kodu (örn. #336699) yazın.');
        [r, g, b] = par.map((p) => {
          if (!/^\d+$/.test(p)) h.err('RGB bileşenleri 0 ile 255 arasında tam sayı olmalı; "' + p + '" geçersiz.');
          const n = Number(p);
          if (n > 255) h.err('RGB bileşenleri 255\'i geçemez; "' + p + '" çok büyük.');
          return n;
        });
      }
      const R = r / 255, G = g / 255, B = b / 255;
      const k = 1 - Math.max(R, G, B);
      if (k >= 1 - 1e-12) { C = 0; M = 0; Y = 0; K = 100; }
      else { C = (1 - R - k) / (1 - k) * 100; M = (1 - G - k) / (1 - k) * 100; Y = (1 - B - k) / (1 - k) * 100; K = k * 100; }
    } else {
      const ic = t.replace(/^(device-)?cmyk\s*\(/i, '').replace(/\)\s*;?$/, '').replace(/%/g, ' ');
      let s4 = ic.split(/[\s;\/]+/).filter(Boolean).map((k) => k.replace(/,+$/, '')).filter(Boolean);
      if (s4.length !== 4) s4 = ic.split(/[\s,;\/]+/).filter(Boolean);
      if (s4.length !== 4) h.err('CMYK için dört yüzde değeri yazın: C, M, Y, K (örn. 20, 40, 60, 10).');
      const ad = ['Camgöbeği (C)', 'Macenta (M)', 'Sarı (Y)', 'Siyah (K)'];
      [C, M, Y, K] = s4.map((p, i) => {
        const n = h.num(p, ad[i]);
        if (n < 0 || n > 100) h.err('"' + ad[i] + '" 0 ile 100 arasında olmalı.');
        return n;
      });
      const kk = 1 - K / 100;
      [r, g, b] = [C, M, Y].map((q) => Math.min(255, Math.max(0, Math.round(255 * (1 - q / 100) * kk + 1e-9))));
    }
    const iki = (n) => n.toString(16).toUpperCase().padStart(2, '0');
    const hex = '#' + iki(r) + iki(g) + iki(b);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const cmyk = `cmyk(${Math.round(C)}%, ${Math.round(M)}%, ${Math.round(Y)}%, ${Math.round(K)}%)`;
    const kanal = [['Camgöbeği (C)', '%' + h.fmt(C, 2)], ['Macenta (M)', '%' + h.fmt(M, 2)], ['Sarı (Y)', '%' + h.fmt(Y, 2)], ['Siyah (K)', '%' + h.fmt(K, 2)]];
    const toplam = ['Toplam mürekkep', '%' + h.fmt(C + M + Y + K, 1)];
    const rows = v.yon === 'rgb' ? [['CMYK', cmyk], ...kanal, toplam, ['RGB', rgb], ['HEX', hex]] : [['RGB', rgb], ['HEX', hex], ['CMYK', cmyk], ...kanal, toplam];
    return { rows, note: 'Renk profili kullanılmayan matematiksel dönüşümdür. Baskıdaki gerçek renk kâğıda, mürekkebe ve makinenin renk profiline göre değişir.' };
  }
