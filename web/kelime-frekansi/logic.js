// Kelime Frekansı Analizi — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Analiz edilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const enaz = h.posint(v.enaz, 'En az harf sayısı');
    const adet = h.posint(v.adet, 'Listelenecek kelime sayısı');
    if (adet > 100) h.err('"Listelenecek kelime sayısı" en fazla 100 olabilir.');
    const DOLGU = new Set(['ve', 'veya', 'ile', 'bir', 'bu', 'şu', 'o', 'de', 'da', 'ki', 'mi', 'mı', 'mu', 'mü', 'için', 'ama', 'fakat', 'ancak', 'gibi', 'daha', 'çok', 'en', 'ya', 'ne', 'her', 'ise', 'diye', 'kadar', 'olarak', 'olan', 'hem', 'yani', 'çünkü']);
    const kucuk = (s) => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
    const bulunan = metin.normalize('NFC').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
    if (!bulunan.length) h.err('Metinde kelime bulunamadı; harf ya da rakam içeren bir metin yazın.');
    const sayac = new Map();
    let toplam = 0;
    for (const ham of bulunan) {
      let k = ham.replace(/’/g, '\'');
      const alt = kucuk(k);
      if (v.harf !== 'ayir') k = alt;
      if (Array.from(k.replace(/'/g, '')).length < enaz) continue;
      if (v.dolgu === 'cikar' && DOLGU.has(alt)) continue;
      sayac.set(k, (sayac.get(k) || 0) + 1);
      toplam++;
    }
    if (!toplam) h.err('Seçtiğiniz ölçütlere uyan kelime kalmadı; en az harf sayısını düşürün ya da dolgu kelimesi filtresini kapatın.');
    const sirali = [...sayac.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'tr'));
    const yuzde = (n) => '%' + h.fmt((n / toplam) * 100, 1);
    const tekil = sirali.filter((x) => x[1] === 1).length;
    const rows = [
      ['Toplam kelime', h.fmt(toplam, 0)],
      ['Farklı kelime', h.fmt(sirali.length, 0)],
      ['En sık kelime', `${sirali[0][0]} (${h.fmt(sirali[0][1], 0)} kez)`],
      ['Bir kez geçen kelime', h.fmt(tekil, 0)],
    ];
    sirali.slice(0, adet).forEach(([k, n], i) => rows.push([`${i + 1}. ${k}`, `${h.fmt(n, 0)} kez (${yuzde(n)})`]));
    const tablo = ['Sıra\tKelime\tAdet\tYüzde'].concat(sirali.slice(0, 5000).map(([k, n], i) => `${i + 1}\t${k}\t${n}\t${yuzde(n)}`));
    return {
      rows,
      text: tablo.join('\n'),
      note: 'Yüzdeler sayıma katılan kelimelerin toplamına göredir. Aşağıdaki sekmeyle ayrılmış tablo hesap tablosuna yapıştırılabilir.',
    };
  }
