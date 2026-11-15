// Listeyi Virgüllü Metne Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('"Liste ya da virgüllü metin" alanını doldurun.');
    const ayraclar = { virgulbosluk: [', ', ','], virgul: [',', ','], noktalivirgul: ['; ', ';'], dikey: ['|', '|'] };
    const [yaz, bol] = ayraclar[v.ayrac] || ayraclar.virgulbosluk;
    let ogeler;
    if (v.yon === 'ayir') {
      let t = ham.trim();
      if ((t.startsWith('(') && t.endsWith(')')) || (t.startsWith('[') && t.endsWith(']'))) t = t.slice(1, -1);
      ogeler = t.split('\n').flatMap((s) => s.split(bol)).map((s) => {
        let o = s.trim();
        if (o.length >= 2 && ((o[0] === "'" && o.at(-1) === "'") || (o[0] === '"' && o.at(-1) === '"'))) o = o.slice(1, -1).trim();
        return o;
      });
    } else {
      ogeler = ham.split('\n').map((s) => s.trim());
    }
    const hepsi = ogeler.length;
    ogeler = ogeler.filter((o) => o !== '');
    const bos = hepsi - ogeler.length;
    if (!ogeler.length) h.err('Metinde öğe bulunamadı. Her satıra bir öğe yazın ya da ayracı kontrol edin.');
    let tekrarSayisi = 0;
    if (v.tekrar === 'sil') {
      const gor = new Set(), yeni = [];
      for (const o of ogeler) { if (gor.has(o)) tekrarSayisi++; else { gor.add(o); yeni.push(o); } }
      ogeler = yeni;
    }
    let sonuc;
    if (v.yon === 'ayir') sonuc = ogeler.join('\n');
    else {
      const sar = (o) => v.tirnak === 'tek' ? `'${o.replace(/'/g, "''")}'` : v.tirnak === 'cift' ? `"${o.replace(/"/g, '\\"')}"` : o;
      sonuc = ogeler.map(sar).join(yaz);
      if (v.sarmal === 'parantez') sonuc = `(${sonuc})`;
      else if (v.sarmal === 'koseli') sonuc = `[${sonuc}]`;
    }
    return {
      rows: [
        ['Öğe sayısı', String(ogeler.length)],
        ['Çıkarılan tekrar', String(tekrarSayisi)],
        ['Atlanan boş öğe', String(bos)],
        ['Sonuç uzunluğu', `${Array.from(sonuc).length} karakter`],
      ],
      text: sonuc,
      note: v.yon === 'ayir' ? 'Öğelerin çevresindeki boşluklar, tırnaklar ve metni saran parantez temizlendi. Tırnak içindeki ayraçlar da bölme noktası sayılır.'
        : 'Her satır bir öğe sayılır; satır başı ve sonundaki boşluklar ile boş satırlar atılır.',
    };
  }
