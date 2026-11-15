// Satırları Karıştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n');
    if (v.bos !== 'tut') satirlar = satirlar.filter((s) => s.trim() !== '');
    else while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (!satirlar.length) h.err('Karıştırılacak satırları yazın; her satıra bir öğe gelmeli.');
    if (satirlar.length > 100000) h.err('En fazla 100.000 satır karıştırılabilir; listeyi parçalara bölün.');
    const tohum = String(v.tohum ?? '').trim();
    let rastgele; // [0, n) aralığında yansız tam sayı üretir
    if (tohum !== '') {
      // Tohumdan 32 bit özet (FNV-1a), ardından mulberry32 üreteci
      let a = 2166136261;
      for (let i = 0; i < tohum.length; i++) { a ^= tohum.charCodeAt(i); a = Math.imul(a, 16777619); }
      a >>>= 0;
      const sonraki = () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return (t ^ (t >>> 14)) >>> 0;
      };
      rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { x = sonraki(); } while (x >= sinir); return x % n; };
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const kutu = new Uint32Array(1);
      rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { crypto.getRandomValues(kutu); x = kutu[0]; } while (x >= sinir); return x % n; };
    } else {
      rastgele = (n) => Math.floor(Math.random() * n);
    }
    const dizi = satirlar.slice();
    for (let i = dizi.length - 1; i > 0; i--) {
      const j = rastgele(i + 1);
      const gecici = dizi[i]; dizi[i] = dizi[j]; dizi[j] = gecici;
    }
    let yerinde = 0;
    for (let i = 0; i < dizi.length; i++) if (dizi[i] === satirlar[i]) yerinde++;
    return {
      rows: [
        ['Karıştırılan satır', h.fmt(dizi.length, 0)],
        ['Yeri değişmeyen satır', h.fmt(yerinde, 0)],
        ['Karışım türü', tohum !== '' ? 'Tohumlu (tekrarlanabilir)' : 'Rastgele'],
      ],
      text: dizi.join('\n'),
      note: tohum !== '' ? 'Aynı liste ve aynı tohumla her zaman bu sıra elde edilir.' : 'Düğmeye her basışta yeni bir sıra üretilir.',
    };
  }
