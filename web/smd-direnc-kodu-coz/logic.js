// SMD Direnç Kodu Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kod = String(v.kod ?? '').trim().toUpperCase().replace(/[\s_]/g, '');
    if (!kod) h.err('Direncin üzerindeki kodu yazın (örn. 103).');
    const e96 = [100, 102, 105, 107, 110, 113, 115, 118, 121, 124, 127, 130, 133, 137, 140, 143, 147, 150, 154, 158, 162, 165, 169, 174,
      178, 182, 187, 191, 196, 200, 205, 210, 215, 221, 226, 232, 237, 243, 249, 255, 261, 267, 274, 280, 287, 294, 301, 309,
      316, 324, 332, 340, 348, 357, 365, 374, 383, 392, 402, 412, 422, 432, 442, 453, 464, 475, 487, 499, 511, 523, 536, 549,
      562, 576, 590, 604, 619, 634, 649, 665, 681, 698, 715, 732, 750, 768, 787, 806, 825, 845, 866, 887, 909, 931, 953, 976];
    const carpanlar = { Z: 0.001, Y: 0.01, X: 0.1, S: 0.1, A: 1, B: 10, H: 10, C: 100, D: 1000, E: 10000, F: 100000 };
    let ohm, tur, tol, m;
    if (/^0+$/.test(kod)) {
      ohm = 0; tur = 'Sıfır ohm köprü (jumper)'; tol = '—';
    } else if ((m = /^(\d*)([RKM])(\d*)$/.exec(kod)) && (m[1] + m[3]).length >= 1 && kod.length <= 5) {
      const taban = Number((m[1] || '0') + '.' + (m[3] || '0'));
      ohm = taban * (m[2] === 'K' ? 1e3 : m[2] === 'M' ? 1e6 : 1);
      tur = 'Ondalık harfli kod (' + m[2] + ' = ondalık virgül)';
      tol = kod.length >= 4 ? 'Genellikle %1' : 'Genellikle %5';
    } else if ((m = /^(\d{2})([ZYXSABHCDEF])$/.exec(kod))) {
      const sira = Number(m[1]);
      if (sira < 1 || sira > 96) h.err('EIA-96 kodunda ilk iki hane 01 ile 96 arasında olmalı.');
      ohm = e96[sira - 1] * carpanlar[m[2]];
      tur = 'EIA-96 (2 hane + harf)'; tol = 'Genellikle %1';
    } else if (/^\d{3}$/.test(kod)) {
      ohm = Number(kod.slice(0, 2)) * Math.pow(10, Number(kod[2]));
      tur = '3 haneli kod'; tol = 'Genellikle %5';
    } else if (/^\d{4}$/.test(kod)) {
      ohm = Number(kod.slice(0, 3)) * Math.pow(10, Number(kod[3]));
      tur = '4 haneli kod'; tol = 'Genellikle %1';
    } else {
      h.err('Kod tanınamadı. 103, 4702, 4R7, R47, 2K2 ya da 01C biçiminde bir kod yazın.');
    }
    if (ohm === 0 && tur.indexOf('köprü') < 0) { tur = 'Sıfır ohm köprü (jumper)'; tol = '—'; }
    const yaz = (x) => {
      if (x === 0) return '0 Ω';
      if (x >= 1e6 * (1 - 1e-9)) return h.sig(x / 1e6, 6) + ' MΩ';
      if (x >= 1e3 * (1 - 1e-9)) return h.sig(x / 1e3, 6) + ' kΩ';
      if (x >= 0.1 * (1 - 1e-9)) return h.sig(x, 6) + ' Ω';
      return h.sig(x * 1e3, 6) + ' mΩ';
    };
    return {
      rows: [
        ['Direnç', yaz(ohm)],
        ['Ohm cinsinden', h.sig(ohm, 6) + ' Ω'],
        ['Kod türü', tur],
        ['Tipik tolerans', tol],
      ],
      note: 'Tolerans kodun kendisinden kesin okunamaz; yukarıdaki değer yaygın kullanıma göre tahmindir. Şüphede kalırsanız direnci devreden ayırıp ölçün.',
    };
  }
