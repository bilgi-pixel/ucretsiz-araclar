// Satır Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Satırlarını saymak için "Metin" alanına bir metin ya da liste yapıştırın.');
    const satirlar = s.split('\n');
    // Metin satır sonuyla bitiyorsa sondaki boş parça ayrı satır sayılmaz
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const uz = satirlar.map((x) => Array.from(x).length);
    const dolu = satirlar.map((x, i) => ({ x, i })).filter((o) => o.x.trim() !== '');
    const doluUz = dolu.map((o) => uz[o.i]);
    const enUzun = Math.max(...uz);
    const enKisa = doluUz.length ? Math.min(...doluUz) : 0;
    const benzersiz = new Set(dolu.map((o) => o.x.trim())).size;
    const karakter = uz.reduce((a, b) => a + b, 0);
    return {
      rows: [
        ['Toplam satır', h.fmt(satirlar.length, 0)],
        ['Dolu satır', h.fmt(dolu.length, 0)],
        ['Boş satır', h.fmt(satirlar.length - dolu.length, 0)],
        ['Benzersiz dolu satır', h.fmt(benzersiz, 0)],
        ['En uzun satır', `${h.fmt(enUzun, 0)} karakter (${uz.indexOf(enUzun) + 1}. satır)`],
        ['En kısa dolu satır', dolu.length ? `${h.fmt(enKisa, 0)} karakter (${dolu[doluUz.indexOf(enKisa)].i + 1}. satır)` : 'Dolu satır yok'],
        ['Ortalama dolu satır uzunluğu', h.fmt(dolu.length ? doluUz.reduce((a, b) => a + b, 0) / dolu.length : 0, 2) + ' karakter'],
        ['Toplam karakter', h.fmt(karakter, 0)],
      ],
      note: 'Yalnızca boşluk ya da sekme içeren satırlar boş sayılır. Toplam karaktere satır sonu karakterleri dahil değildir. Benzersiz satırlar baştaki ve sondaki boşluklar yok sayılarak karşılaştırılır.',
    };
  }
