// İkiye Tümleyen Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const w = [8, 16, 32, 64].includes(Number(v.genislik)) ? Number(v.genislik) : 8;
    const W = BigInt(w);
    const mod = 1n << W;
    const yari = mod >> 1n;
    const maske = mod - 1n;
    const iki = (x) => x.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const on6 = (x) => '0x' + x.toString(16).toUpperCase().padStart(w / 4, '0');
    const bin = (x) => (x < 0n ? '-' : '') + (x < 0n ? -x : x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Sayı ya da bit dizisi" alanını doldurun.');
    let bits; // işaretsiz gösterim
    if (v.yon === 'ikili') {
      const t = ham.replace(/[\s_]/g, '');
      if (/^0[xX][0-9a-fA-F]+$/.test(t)) {
        if (t.length - 2 > w / 4) h.err(`Onaltılık dizi ${w} bit için en fazla ${w / 4} hane olabilir.`);
        bits = BigInt(t);
      } else {
        const b = t.replace(/^0[bB]/, '');
        if (!/^[01]+$/.test(b)) h.err('İkili dizi yalnızca 0 ve 1 içerebilir. Onaltılık yazacaksanız başına 0x ekleyin.');
        if (b.length !== w) h.err(`${w} bit genişlik için tam ${w} hane yazın (${b.length} hane yazdınız). Kısa diziyi işaret bitiyle soldan tamamlayın ya da uygun genişliği seçin.`);
        bits = BigInt('0b' + b);
      }
    } else {
      const t = ham.replace(/\s/g, '').replace(/−/g, '-');
      if (!/^[-+]?\d+$/.test(t)) h.err('Ondalık yönde yalnızca tam sayı yazın (örn. -42). Kesirli sayıların ikiye tümleyen gösterimi yoktur.');
      if (t.length > 40) h.err('Sayı çok uzun.');
      const x = BigInt(t);
      if (x < -yari || x > yari - 1n) h.err(`${bin(x)} sayısı ${w} bit işaretli aralığa sığmıyor (${bin(-yari)} ile ${bin(yari - 1n)} arası). Daha büyük bir bit genişliği seçin.`);
      bits = x & maske;
    }
    const negatif = bits >= yari;
    const deger = negatif ? bits - mod : bits;
    const tersIsaret = (mod - bits) & maske;
    const tersMetin = deger === -yari ? `${iki(tersIsaret)} (taşma: ${bin(yari)} bu genişliğe sığmaz)` : `${iki(tersIsaret)} (${bin(-deger)})`;
    const rows = [];
    if (v.yon === 'ikili') {
      rows.push(['İşaretli ondalık değer', bin(deger)]);
      rows.push(['İkili gösterim', iki(bits)]);
    } else {
      rows.push(['İkiye tümleyen (ikili)', iki(bits)]);
      rows.push(['İşaretli ondalık değer', bin(deger)]);
    }
    rows.push(['Onaltılık', on6(bits)]);
    rows.push(['İşaretsiz yorum', bin(bits)]);
    rows.push(['İşaret biti', negatif ? '1 (negatif)' : '0 (sıfır ya da pozitif)']);
    if (negatif) {
      const mutlak = -deger;
      rows.push(['Adım 1: mutlak değer (ikili)', iki(mutlak)]);
      rows.push(['Adım 2: bitleri ters çevir', iki(~mutlak & maske)]);
      rows.push(['Adım 3: 1 ekle', iki(bits)]);
    }
    rows.push(['Bire tümleyeni', iki(~bits & maske)]);
    rows.push(['Ters işaretlisi', tersMetin]);
    rows.push(['Gösterilebilen aralık', `${bin(-yari)} … ${bin(yari - 1n)}`]);
    return {
      rows,
      note: `${w} bit ikiye tümleyende en soldaki bit −2^${w - 1} ağırlığındadır; diğer bitler olağan pozitif ağırlıklarını taşır.`,
    };
  }
