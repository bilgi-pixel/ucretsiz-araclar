// Noktalama İşaretlerini Temizleme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Noktalama işaretleri temizlenecek metni yazın.');
    const desen = v.simge === 'sil' ? /[\p{P}\p{S}]/gu : /\p{P}/gu;
    const harfMi = (c) => c !== undefined && /[\p{L}\p{N}]/u.test(c);
    const yerine = v.yerine === 'bosluk' ? ' ' : '';
    let silinen = 0;
    let cikti = metin.replace(desen, (es, konum, tum) => {
      if (v.kesme !== 'sil' && (es === '\'' || es === '’') && harfMi(tum[konum - 1]) && harfMi(tum[konum + 1])) return es;
      silinen++;
      return yerine;
    });
    if (v.bosluk !== 'dokunma') cikti = cikti.split('\n').map((s) => s.replace(/[ \t ]+/g, ' ').trim()).join('\n');
    return {
      rows: [
        ['Silinen işaret', h.fmt(silinen, 0)],
        ['Kalan karakter', h.fmt(Array.from(cikti).length, 0)],
      ],
      text: cikti,
      note: silinen ? 'Harfler, rakamlar ve satır sonları korunur. Ondalık sayılardaki virgül ve nokta da noktalama sayılır.' : 'Metinde silinecek noktalama işareti bulunamadı.',
    };
  }
