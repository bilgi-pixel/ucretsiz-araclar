// IP Adresini İkili Sayıya Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.adres ?? '').trim();
    if (t === '') h.err('"Adres" alanını doldurun.');
    let okt;
    if (v.yon === 'ip') {
      if (/[^01.\s]/.test(t)) h.err('İkili yazımda yalnızca 0 ve 1 rakamları, nokta ve boşluk kullanılabilir.');
      const gr = t.split(/[.\s]+/).filter(Boolean);
      if (gr.length === 1) {
        if (gr[0].length !== 32) h.err('Bitişik yazımda tam 32 bit gerekir; şu an ' + gr[0].length + ' bit var.');
        okt = [0, 8, 16, 24].map((i) => parseInt(gr[0].slice(i, i + 8), 2));
      } else if (gr.length === 4) {
        if (gr.some((g) => g.length > 8)) h.err('Her grup en fazla 8 bit olabilir.');
        okt = gr.map((g) => parseInt(g, 2));
      } else h.err('İkili adresi tek parça 32 bit ya da dört grup hâlinde yazın (örn. 11000000.10101000.00000001.00000001).');
    } else {
      const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t);
      if (!m) h.err('IPv4 adresini noktayla ayrılmış dört sayı olarak yazın (örn. 192.168.1.1).');
      okt = [m[1], m[2], m[3], m[4]].map(Number);
      if (okt.some((o) => o > 255)) h.err('IPv4 adresindeki her bölüm 0 ile 255 arasında olmalı.');
    }
    const bin = okt.map((o) => o.toString(2).padStart(8, '0'));
    const hex = okt.map((o) => o.toString(16).toUpperCase().padStart(2, '0'));
    const tam = okt[0] * 16777216 + okt[1] * 65536 + okt[2] * 256 + okt[3];
    const birler = bin.join('').split('').filter((c) => c === '1').length;
    const ip = okt.join('.');
    const ikili = bin.join('.');
    const rows = v.yon === 'ip'
      ? [['IP adresi', ip], ['İkili gösterim', ikili]]
      : [['İkili gösterim', ikili], ['IP adresi', ip]];
    rows.push(
      ['Bitişik 32 bit', bin.join('')],
      ['Onaltılık', hex.join('.')],
      ['Tek tam sayı', String(tam)],
      ['1 olan bit sayısı', String(birler)],
    );
    return { rows, note: 'Her oktet 8 bitle yazılır; baştaki sıfırlar korunur. Bit ağırlıkları soldan sağa 128, 64, 32, 16, 8, 4, 2, 1\'dir.' };
  }
