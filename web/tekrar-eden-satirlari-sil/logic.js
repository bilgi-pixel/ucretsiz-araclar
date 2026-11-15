// Tekrar Eden Satırları Silme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Tekrarları silmek için "Liste" alanına her satıra bir kayıt gelecek biçimde metin yapıştırın.');
    let satirlar = s.split('\n');
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const girdi = satirlar.length;
    const kirp = v.kenar !== 'aynen', duyarsiz = v.harf === 'duyarsiz', son = v.korunan === 'son';
    const anahtar = (x) => { const k = kirp ? x.trim() : x; return duyarsiz ? k.toLocaleLowerCase('tr') : k; };
    // Sayım: en çok tekrar eden satırı bulmak için
    const adet = new Map(), ilkHal = new Map();
    for (const x of satirlar) {
      if (x.trim() === '') continue;
      const k = anahtar(x);
      adet.set(k, (adet.get(k) || 0) + 1);
      if (!ilkHal.has(k)) ilkHal.set(k, x.trim());
    }
    let enCok = null;
    for (const [k, n] of adet) if (n > 1 && (!enCok || n > enCok[1])) enCok = [k, n];
    if (son) satirlar = satirlar.slice().reverse();
    const gorulen = new Set(), cikti = [];
    let silinenTekrar = 0, silinenBos = 0, kalanDolu = 0;
    for (const x of satirlar) {
      if (x.trim() === '') {
        if (v.bosSatir === 'koru') cikti.push(kirp ? '' : x); else silinenBos++;
        continue;
      }
      const k = anahtar(x);
      if (gorulen.has(k)) { silinenTekrar++; continue; }
      gorulen.add(k);
      cikti.push(kirp ? x.trim() : x);
      kalanDolu++;
    }
    if (son) cikti.reverse();
    return {
      rows: [
        ['Silinen tekrar', h.fmt(silinenTekrar, 0) + ' satır'],
        ['Kalan benzersiz satır', h.fmt(kalanDolu, 0)],
        ['Girdideki satır', h.fmt(girdi, 0)],
        ['Silinen boş satır', h.fmt(silinenBos, 0)],
        ['En çok tekrar eden', enCok ? `"${ilkHal.get(enCok[0])}" (${enCok[1]} kez)` : 'Tekrar yok'],
      ],
      text: cikti.join('\n'),
      note: silinenTekrar ? 'Satır sırası korunmuştur; yalnızca fazlalık satırlar çıkarılmıştır.' : 'Listede tekrar eden satır bulunamadı.',
    };
  }
