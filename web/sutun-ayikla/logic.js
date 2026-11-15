// Metinden Sütun Ayıklama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('"Satırlar" alanına sütunlara ayrılacak metni yapıştırın.');
    const sabit = { sekme: '\t', virgul: ',', noktalivirgul: ';', dikey: '|', bosluk: ' ' };
    let ayr;
    if (v.ayrac === 'ozel') {
      ayr = String(v.ozelAyrac ?? '');
      if (ayr === '') h.err('"Özel ayraç" alanına sütunları ayıran ifadeyi yazın ya da listeden hazır bir ayraç seçin.');
    } else ayr = sabit[v.ayrac] ?? '\t';
    const spec = String(v.sutun ?? '').trim();
    if (spec === '') h.err('"Alınacak sütunlar" alanına en az bir sütun numarası yazın (örn. 2).');
    const secim = [];
    for (const p of spec.split(/[,;\s]+/).filter(Boolean)) {
      let m;
      if (/^\d+$/.test(p)) secim.push(Number(p));
      else if ((m = /^(\d+)[-–](\d+)$/.exec(p))) {
        const a = Number(m[1]), b = Number(m[2]);
        if (Math.abs(b - a) > 999) h.err('Sütun aralığı çok geniş. En fazla 1000 sütunluk aralık yazın.');
        const adim = a <= b ? 1 : -1;
        for (let i = a; i !== b + adim; i += adim) secim.push(i);
      } else h.err(`"${p}" geçerli bir sütun tanımı değil. 2, 1,3 ya da 2-4 biçiminde yazın.`);
    }
    if (secim.some((n) => n < 1)) h.err('Sütun numaraları 1\'den başlar; 0 yazılamaz.');
    const satirlar = ham.split('\n').filter((s) => s.trim() !== '');
    const bol = (s) => v.ayrac === 'bosluk' ? s.trim().split(/\s+/) : s.split(ayr).map((x) => x.trim());
    const tablo = satirlar.map(bol);
    const enCok = Math.max(...tablo.map((r) => r.length));
    const enBuyuk = Math.max(...secim);
    if (enBuyuk > enCok) h.err(`${enBuyuk}. sütun istendi ama satırlarda en fazla ${enCok} sütun var. Ayracı ve sütun numarasını kontrol edin.`);
    const cikisAyr = v.cikis === 'ayni' || !sabit[v.cikis] ? ayr : sabit[v.cikis];
    let eksik = 0;
    const sonuc = tablo.map((r) => {
      if (secim.some((n) => n > r.length)) eksik++;
      return secim.map((n) => r[n - 1] ?? '').join(cikisAyr);
    }).join('\n');
    return {
      rows: [
        ['İşlenen satır', String(tablo.length)],
        ['Alınan sütunlar', secim.join(', ')],
        ['Satırlardaki en fazla sütun', String(enCok)],
        ['Eksik sütunlu satır', String(eksik)],
      ],
      text: sonuc,
      note: eksik ? 'Bazı satırlarda istenen sütun bulunmadığı için o hücreler boş bırakıldı.'
        : 'Boş satırlar atlanır; hücrelerin başındaki ve sonundaki boşluklar temizlenir. Tırnak içindeki ayraçlar ayrıca tanınmaz.',
    };
  }
