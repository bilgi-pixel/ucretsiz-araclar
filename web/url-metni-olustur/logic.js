// URL Metni (Slug) Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satirlar = String(v.metin ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!satirlar.length) h.err('URL metnine çevrilecek başlığı yazın.');
    if (satirlar.length > 5000) h.err('Tek seferde en fazla 5.000 başlık işlenebilir.');
    const ayrac = v.ayrac === '_' ? '_' : '-';
    let sinir = 0;
    if (String(v.sinir ?? '').trim() !== '') {
      sinir = h.posint(v.sinir, 'En fazla uzunluk');
      if (sinir < 3) h.err('"En fazla uzunluk" en az 3 olmalı.');
    }
    const TR = { 'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'I': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u', 'ß': 'ss', 'æ': 'ae', 'Æ': 'ae', 'œ': 'oe', 'Œ': 'oe', 'ø': 'o', 'Ø': 'o', 'đ': 'd', 'Đ': 'd', 'ł': 'l', 'Ł': 'l' };
    const DOLGU = new Set(['ve', 'veya', 'ile', 'bir', 'bu', 'de', 'da', 'icin', 'ama', 'gibi', 'ki']);
    const cevir = (ham) => {
      let t = '';
      for (const c of ham.normalize('NFC')) t += TR[c] !== undefined ? TR[c] : c;
      t = t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
      t = t.replace(/&/g, ' ve ').replace(/['’‘`´]/g, '');
      let kelimeler = t.split(/[^a-z0-9]+/).filter(Boolean);
      if (v.dolgu === 'cikar') {
        const sade = kelimeler.filter((k) => !DOLGU.has(k));
        if (sade.length) kelimeler = sade;
      }
      if (sinir && kelimeler.length) {
        const secilen = [];
        let uzunluk = 0;
        for (const k of kelimeler) {
          const yeni = uzunluk + (secilen.length ? 1 : 0) + k.length;
          if (yeni > sinir) break;
          secilen.push(k); uzunluk = yeni;
        }
        kelimeler = secilen.length ? secilen : [kelimeler[0].slice(0, sinir)];
      }
      return kelimeler;
    };
    const sonuclar = satirlar.map(cevir);
    const dolu = sonuclar.filter((k) => k.length);
    if (!dolu.length) h.err('Başlıkta harf ya da rakam bulunamadı; URL metni yalnızca harf ve rakamlardan üretilir.');
    const metinler = sonuclar.map((k) => k.join(ayrac));
    if (satirlar.length === 1) {
      return {
        rows: [
          ['URL metni', metinler[0]],
          ['Uzunluk', h.fmt(metinler[0].length, 0) + ' karakter'],
          ['Kelime sayısı', h.fmt(sonuclar[0].length, 0)],
        ],
        text: metinler[0],
      };
    }
    return {
      rows: [
        ['Oluşturulan URL metni', h.fmt(dolu.length, 0) + ' adet'],
        ['En uzun', h.fmt(Math.max(...metinler.map((m) => m.length)), 0) + ' karakter'],
      ],
      text: metinler.join('\n'),
      note: dolu.length < satirlar.length ? 'Harf ya da rakam içermeyen satırlar boş bırakıldı.' : undefined,
    };
  }
