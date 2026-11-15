// Paragraf Sayacı — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Paragraflarını saymak için "Metin" alanına bir metin yazın ya da yapıştırın.');
    let mod = v.ayirma;
    if (mod !== 'bos' && mod !== 'satir') mod = /\n[ \t]*\n/.test(s.trim()) ? 'bos' : 'satir';
    const parcalar = (mod === 'bos' ? s.split(/\n(?:[ \t]*\n)+/) : s.split('\n')).map((p) => p.trim()).filter((p) => p !== '');
    const kelimeSay = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    const uz = parcalar.map(kelimeSay);
    const toplam = uz.reduce((a, b) => a + b, 0);
    const karakter = parcalar.reduce((a, p) => a + Array.from(p).length, 0);
    const enUzun = Math.max(...uz), enKisa = Math.min(...uz);
    return {
      rows: [
        ['Paragraf sayısı', h.fmt(parcalar.length, 0)],
        ['Kelime sayısı', h.fmt(toplam, 0)],
        ['Paragraf başına ortalama kelime', h.fmt(toplam / parcalar.length, 2)],
        ['En uzun paragraf', `${h.fmt(enUzun, 0)} kelime (${uz.indexOf(enUzun) + 1}. paragraf)`],
        ['En kısa paragraf', `${h.fmt(enKisa, 0)} kelime (${uz.indexOf(enKisa) + 1}. paragraf)`],
        ['Paragraf başına ortalama karakter', h.fmt(karakter / parcalar.length, 1)],
        ['Kullanılan ayırma', mod === 'bos' ? 'Boş satır' : 'Satır sonu'],
      ],
      note: 'Yalnızca boşluk içeren satırlar boş sayılır; boş paragraflar sayıma girmez. Karakter ortalamasına paragraf içi boşluklar dahildir.',
    };
  }
