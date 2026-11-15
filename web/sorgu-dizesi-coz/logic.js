// Sorgu Dizesi (Query String) Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let t = String(v.sorgu ?? '').trim();
    if (t === '') h.err('Çözülecek sorgu dizesini ya da adresi yazın.');
    const soru = t.indexOf('?');
    if (soru >= 0) t = t.slice(soru + 1);
    else if (t.includes('://') || (!t.includes('=') && t.includes('/'))) h.err('Bu adreste sorgu dizesi yok. Sorgu, adresteki ? işaretinden sonra gelen bölümdür (örn. sayfa?id=5&dil=tr).');
    const diyez = t.indexOf('#');
    if (diyez >= 0) t = t.slice(0, diyez);
    const parcalar = t.split('&').filter((p) => p !== '');
    if (!parcalar.length) h.err('Sorgu dizesi boş görünüyor; ? işaretinden sonra parametre bulunamadı.');
    let bozuk = 0;
    const coz = (s) => {
      const x = v.arti === 'arti' ? s : s.replace(/\+/g, ' ');
      try { return decodeURIComponent(x); } catch { bozuk++; return x; }
    };
    let ciftler = parcalar.map((p) => {
      const i = p.indexOf('=');
      return i < 0 ? [coz(p), ''] : [coz(p.slice(0, i)), coz(p.slice(i + 1))];
    });
    const sayac = new Map();
    for (const [k] of ciftler) sayac.set(k, (sayac.get(k) || 0) + 1);
    const yinelenen = [...sayac].filter(([, n]) => n > 1).map(([k, n]) => `${k} (${n} kez)`);
    const bos = [...new Set(ciftler.filter(([, d]) => d === '').map(([k]) => k))];
    if (v.sira === 'alfabetik') ciftler = ciftler.map((c, i) => [c, i]).sort((a, b) => a[0][0].localeCompare(b[0][0], 'tr') || a[1] - b[1]).map(([c]) => c);
    let text;
    if (v.bicim === 'json') {
      const nesne = Object.create(null);
      for (const [k, d] of ciftler) {
        if (!(k in nesne)) nesne[k] = d;
        else if (Array.isArray(nesne[k])) nesne[k].push(d);
        else nesne[k] = [nesne[k], d];
      }
      text = JSON.stringify(nesne, null, 2);
    } else text = ciftler.map(([k, d]) => `${k} = ${d}`).join('\n');
    const rows = [
      ['Parametre sayısı', String(ciftler.length)],
      ['Benzersiz anahtar sayısı', String(sayac.size)],
      ['Yinelenen anahtarlar', yinelenen.length ? yinelenen.join(', ') : '—'],
      ['Boş değerli anahtarlar', bos.length ? bos.join(', ') : '—'],
    ];
    if (bozuk) rows.push(['Çözülemeyen parça', String(bozuk)]);
    return { rows, text, note: bozuk ? 'Bazı parçalarda geçersiz yüzde kodlaması vardı; bu parçalar olduğu gibi bırakıldı.' : 'Yüzde kodlaması UTF-8 olarak çözüldü.' };
  }
