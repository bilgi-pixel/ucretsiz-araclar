// Satır Numarası Ekleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Numaralandırılacak metni yazın.');
    const bas = h.int(v.baslangic, 'Başlangıç numarası');
    const artis = h.int(v.artis, 'Artış');
    if (artis === 0) h.err('"Artış" sıfır olamaz; 1 ya da başka bir tam sayı yazın.');
    if (Math.abs(bas) > 1e9 || Math.abs(artis) > 1e6) h.err('Başlangıç en çok 1.000.000.000, artış en çok 1.000.000 olabilir.');
    let satirlar = ham.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (v.bos === 'sil') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır numaralandırılabilir.');
    const numaraAlir = (s) => v.bos === 'numarala' || s.trim() !== '';
    const adet = satirlar.filter(numaraAlir).length;
    const son = bas + (adet - 1) * artis;
    const yaz = (n) => (n < 0 ? '-' : '') + String(Math.abs(n));
    const genislik = Math.max(yaz(bas).length, yaz(son).length);
    const numaraMetni = (n) => {
      const t = yaz(n);
      if (v.hiza === 'bosluk') return t.padStart(genislik, ' ');
      if (v.hiza === 'sifir') {
        const rakam = String(Math.abs(n));
        const hedef = genislik - (n < 0 ? 1 : 0);
        return (n < 0 ? '-' : '') + rakam.padStart(Math.max(hedef, rakam.length), '0');
      }
      return t;
    };
    const SARMA = {
      nokta: (t) => t + '. ', parantez: (t) => t + ') ', ikinokta: (t) => t + ': ', tire: (t) => t + ' - ',
      koseli: (t) => '[' + t + '] ', sekme: (t) => t + '\t', bosluk: (t) => t + ' ',
    };
    const sar = SARMA[v.bicim] || SARMA.nokta;
    let n = bas;
    const cikti = satirlar.map((s) => {
      if (!numaraAlir(s)) return s;
      const satir = sar(numaraMetni(n)) + s;
      n += artis;
      return satir;
    });
    return {
      rows: [
        ['Numaralanan satır', h.fmt(adet, 0)],
        ['İlk numara', yaz(bas)],
        ['Son numara', yaz(son)],
        ['Toplam satır', h.fmt(satirlar.length, 0)],
      ],
      text: cikti.join('\n'),
    };
  }
