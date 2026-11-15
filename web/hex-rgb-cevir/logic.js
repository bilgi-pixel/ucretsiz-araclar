// HEX RGB Renk Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.renk ?? '').trim();
    if (t === '') h.err('"Renk değeri" alanını doldurun.');
    let r, g, b, a = null;
    if (v.yon === 'rgb') {
      const ic = t.replace(/^rgba?\s*\(/i, '').replace(/\)\s*;?$/, '');
      const par = ic.split(/[\s,;\/]+/).filter(Boolean);
      if (par.length !== 3) h.err('RGB için tam üç sayı yazın (örn. 255, 87, 51).');
      const s = par.map((p) => {
        if (!/^\d+$/.test(p)) h.err('RGB bileşenleri 0 ile 255 arasında tam sayı olmalı; "' + p + '" geçersiz.');
        const n = Number(p);
        if (n > 255) h.err('RGB bileşenleri 255\'i geçemez; "' + p + '" çok büyük.');
        return n;
      });
      [r, g, b] = s;
    } else {
      let x = t.replace(/^#/, '');
      if (!/^[0-9a-fA-F]+$/.test(x)) h.err('HEX kodunda yalnızca 0–9 ve A–F karakterleri bulunabilir (örn. #1E90FF).');
      if (x.length === 3 || x.length === 4) x = x.split('').map((c) => c + c).join('');
      if (x.length !== 6 && x.length !== 8) h.err('HEX kodu 3, 4, 6 ya da 8 haneli olmalı; yazdığınız kod ' + t.replace(/^#/, '').length + ' haneli.');
      r = parseInt(x.slice(0, 2), 16); g = parseInt(x.slice(2, 4), 16); b = parseInt(x.slice(4, 6), 16);
      if (x.length === 8) a = parseInt(x.slice(6, 8), 16);
    }
    const iki = (n) => n.toString(16).toUpperCase().padStart(2, '0');
    const hex6 = iki(r) + iki(g) + iki(b);
    const tam = hex6 + (a === null ? '' : iki(a));
    const kisa = tam.match(/.{2}/g).every((p) => p[0] === p[1]) ? '#' + tam.match(/.{2}/g).map((p) => p[0]).join('') : 'Yok (çift haneler eşit değil)';
    const alfa = a === null ? null : Number((a / 255).toFixed(2));
    const css = a === null ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alfa})`;
    const yuzde = [r, g, b].map((n) => '%' + h.fmt(n / 255 * 100, 2)).join(' · ');
    const rows = v.yon === 'rgb' ? [['HEX', '#' + tam], ['RGB', css]] : [['RGB', css], ['HEX', '#' + tam]];
    rows.push(['Kırmızı (R)', String(r)], ['Yeşil (G)', String(g)], ['Mavi (B)', String(b)]);
    if (a !== null) rows.push(['Opaklık (alfa)', h.fmt(a / 255, 2) + ' (%' + h.fmt(a / 255 * 100, 0) + ')']);
    rows.push(['Yüzde olarak', yuzde], ['Kısa HEX', kisa], ['Ondalık renk değeri', String(r * 65536 + g * 256 + b)]);
    return { rows, note: 'Her kanal 0–255 aralığındadır; HEX kodunda iki onaltılık haneyle (00–FF) yazılır.' };
  }
