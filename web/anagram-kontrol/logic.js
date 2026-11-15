// Anagram Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hazirla = (s) => {
      let t = String(s ?? '').normalize('NFC').toLocaleLowerCase('tr');
      const ch = Array.from(t);
      return v.kural === 'kesin' ? ch : ch.filter((c) => /[\p{L}\p{N}]/u.test(c));
    };
    if (String(v.birinci ?? '').trim() === '') h.err('"Birinci kelime ya da cümle" alanını doldurun.');
    if (String(v.ikinci ?? '').trim() === '') h.err('"İkinci kelime ya da cümle" alanını doldurun.');
    const a = hazirla(v.birinci), b = hazirla(v.ikinci);
    if (!a.length || !b.length) h.err('Karşılaştırılacak harf bulunamadı. En az bir harf ya da rakam içeren metin yazın.');
    const say = (arr) => { const m = new Map(); for (const c of arr) m.set(c, (m.get(c) || 0) + 1); return m; };
    const ma = say(a), mb = say(b);
    const sirala = (arr) => [...arr].sort((x, y) => x.localeCompare(y, 'tr')).join('');
    const fazla = (m1, m2) => {
      const o = [];
      for (const [c, n] of m1) { const d = n - (m2.get(c) || 0); if (d > 0) o.push(c === ' ' ? (d > 1 ? `boşluk ×${d}` : 'boşluk') : (d > 1 ? `${c} ×${d}` : c)); }
      return o.sort((x, y) => x.localeCompare(y, 'tr'));
    };
    const fa = fazla(ma, mb), fb = fazla(mb, ma);
    const anagram = fa.length === 0 && fb.length === 0;
    const ayni = anagram && a.join('') === b.join('');
    let ortak = 0;
    for (const [c, n] of ma) ortak += Math.min(n, mb.get(c) || 0);
    const rows = [
      ['Sonuç', anagram ? (ayni ? 'Aynı metin (harf sırası da aynı)' : 'Anagram') : 'Anagram değil'],
      ['Birinci metnin harf sayısı', String(a.length)],
      ['İkinci metnin harf sayısı', String(b.length)],
      ['Ortak harf sayısı', String(ortak)],
      ['Birincinin sıralı harfleri', sirala(a)],
      ['İkincinin sıralı harfleri', sirala(b)],
    ];
    if (!anagram) {
      rows.push(['Yalnızca birincide olan', fa.length ? fa.join(', ') : 'yok']);
      rows.push(['Yalnızca ikincide olan', fb.length ? fb.join(', ') : 'yok']);
    }
    return {
      rows,
      note: ayni ? 'İki metin harf sırasıyla birlikte aynı; anagram sayılabilmesi için harflerin yeri değişmiş olmalıdır.'
        : 'Büyük-küçük harf farkı yok sayılır; ı ile i, o ile ö gibi harfler ayrı harf kabul edilir.',
    };
  }
