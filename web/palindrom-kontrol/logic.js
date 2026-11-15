// Palindrom Kelime Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = String(v.metin ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!satirlar.length) h.err('Denetlenecek kelimeyi, cümleyi ya da sayıyı yazın.');
    if (satirlar.length > 200) h.err('Tek seferde en fazla 200 satır denetlenebilir.');
    const birebir = v.kip === 'birebir';
    const hazirla = (s) => {
      const t = s.normalize('NFC');
      if (birebir) return Array.from(t);
      const kucuk = t.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
      return Array.from(kucuk).filter((c) => /[\p{L}\p{N}]/u.test(c));
    };
    const incele = (s) => {
      const d = hazirla(s);
      let fark = -1;
      for (let i = 0, j = d.length - 1; i < j; i++, j--) if (d[i] !== d[j]) { fark = i; break; }
      return { d, fark, pal: d.length > 0 && fark === -1 };
    };
    const sonuclar = satirlar.map(incele);
    if (sonuclar.every((r) => r.d.length === 0)) h.err('Karşılaştırılacak harf ya da rakam bulunamadı; yalnızca noktalama işareti yazmış olabilirsiniz.');
    if (satirlar.length === 1) {
      const r = sonuclar[0], n = r.d.length;
      const rows = [
        ['Sonuç', r.pal ? 'Palindrom' : 'Palindrom değil'],
        ['Karşılaştırılan dizi', r.d.join('')],
        ['Tersten yazılışı', r.d.slice().reverse().join('')],
        ['Uzunluk', h.fmt(n, 0) + ' karakter'],
      ];
      if (!r.pal) rows.push(['İlk uyuşmazlık', `baştan ${r.fark + 1}. karakter "${r.d[r.fark]}", sondan ${r.fark + 1}. karakter "${r.d[n - 1 - r.fark]}"`]);
      else rows.push(['Orta nokta', n % 2 === 1 ? `"${r.d[(n - 1) / 2]}" harfi (tek uzunluk)` : 'İki yarı arasında (çift uzunluk)']);
      return { rows, note: n === 1 ? 'Tek karakterlik ifadeler tanım gereği palindromdur.' : undefined };
    }
    const adet = sonuclar.filter((r) => r.pal).length;
    const rows = [['Palindrom sayısı', `${h.fmt(adet, 0)} / ${h.fmt(satirlar.length, 0)}`]];
    satirlar.forEach((s, i) => {
      const kisa = Array.from(s).length > 60 ? Array.from(s).slice(0, 60).join('') + '…' : s;
      rows.push([`${i + 1}. ${kisa}`, sonuclar[i].d.length === 0 ? 'Harf ya da rakam yok' : sonuclar[i].pal ? 'Palindrom' : 'Palindrom değil']);
    });
    return { rows };
  }
