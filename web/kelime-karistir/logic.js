// Kelime Harflerini Karıştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Harfleri karıştırılacak kelimeyi ya da metni yazın.');
    if (metin.length > 200000) h.err('Metin çok uzun; en fazla 200.000 karakter işlenebilir.');
    const tohum = String(v.tohum ?? '').trim();
    let ham; // 32 bit rastgele tam sayı üretir
    if (tohum !== '') {
      let a = 2166136261;
      for (let i = 0; i < tohum.length; i++) { a ^= tohum.charCodeAt(i); a = Math.imul(a, 16777619); }
      a >>>= 0;
      ham = () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return (t ^ (t >>> 14)) >>> 0;
      };
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const kutu = new Uint32Array(1);
      ham = () => { crypto.getRandomValues(kutu); return kutu[0]; };
    } else {
      ham = () => Math.floor(Math.random() * 4294967296);
    }
    const rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { x = ham(); } while (x >= sinir); return x % n; };
    const karistir = (dizi) => {
      const d = dizi.slice();
      for (let i = d.length - 1; i > 0; i--) { const j = rastgele(i + 1); const g = d[i]; d[i] = d[j]; d[j] = g; }
      return d;
    };
    const orta = v.mod === 'orta';
    let toplam = 0, karisan = 0;
    const cikti = metin.replace(/\p{L}+/gu, (kelime) => {
      toplam++;
      const harfler = Array.from(kelime);
      const bas = orta ? 1 : 0, son = orta ? harfler.length - 1 : harfler.length;
      const parca = harfler.slice(bas, son);
      if (parca.length < 2 || new Set(parca).size < 2) return kelime;
      let yeni = parca;
      for (let deneme = 0; deneme < 50; deneme++) {
        yeni = karistir(parca);
        if (yeni.join('') !== parca.join('')) break;
      }
      const sonuc = harfler.slice(0, bas).concat(yeni, harfler.slice(son)).join('');
      if (sonuc !== kelime) karisan++;
      return sonuc;
    });
    if (!toplam) h.err('Metinde harf bulunamadı. En az bir kelime yazın.');
    return {
      rows: [
        ['Toplam kelime', h.fmt(toplam, 0)],
        ['Harfleri karışan kelime', h.fmt(karisan, 0)],
        ['Karıştırma biçimi', orta ? 'İlk ve son harf sabit' : 'Bütün harfler'],
      ],
      text: cikti,
      note: tohum !== '' ? 'Aynı metin, aynı biçim ve aynı tohumla her zaman bu sonuç elde edilir.' : 'Düğmeye her basışta yeni bir karışım üretilir. Çok kısa ya da tek tür harften oluşan kelimeler değişmez.',
    };
  }
