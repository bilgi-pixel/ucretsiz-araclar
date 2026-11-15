// İsim Numerolojisi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const DEGER = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8 };
    const TR = { 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U', 'Â': 'A', 'Î': 'I', 'Û': 'U' };
    const UNLU = 'AEIOU';
    const ANLAM = {
      1: 'öncülük, bağımsızlık, girişkenlik', 2: 'uyum, iş birliği, duyarlılık', 3: 'yaratıcılık, ifade, neşe',
      4: 'düzen, emek, güvenilirlik', 5: 'özgürlük, değişim, merak', 6: 'sorumluluk, şefkat, aile',
      7: 'araştırma, iç gözlem, bilgelik', 8: 'güç, yönetim, maddi başarı', 9: 'yardımseverlik, idealizm, tamamlanma',
      11: 'sezgi, ilham (usta sayı)', 22: 'büyük hedefler, kuruculuk (usta sayı)', 33: 'öğreticilik, özveri (usta sayı)',
    };
    const indir = (n) => {
      while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = String(n).split('').reduce((a, c) => a + Number(c), 0);
      return n;
    };
    const ham = String(v.isim || '').trim();
    if (ham === '') h.err('Bir ad yazın (örn. Ayşe Demir).');
    if (ham.length > 100) h.err('Ad en fazla 100 karakter olabilir.');
    let top = 0, unlu = 0, unsuz = 0, adet = 0;
    const dokum = [];
    for (const ch of ham) {
      if (/[\s.\-']/.test(ch)) { if (/\s/.test(ch) && dokum.length && dokum[dokum.length - 1] !== '|') dokum.push('|'); continue; }
      let b = ch.toUpperCase();
      if (TR[b]) b = TR[b];
      const d = DEGER[b];
      if (!d) h.err('Ad yalnızca harflerden oluşmalı; "' + ch + '" karakteri hesaplanamaz.');
      top += d; adet++;
      if (UNLU.includes(b)) unlu += d; else unsuz += d;
      dokum.push(ch.toLocaleUpperCase('tr-TR') + '=' + d);
    }
    if (!adet) h.err('Ad en az bir harf içermeli.');
    const ifade = indir(top);
    const yaz = (ham2, son) => (ham2 === son ? String(son) : ham2 + ' → ' + son);
    return {
      rows: [
        ['İfade (kader) sayısı', String(ifade)],
        ['Ruh güdüsü sayısı (ünlüler)', yaz(unlu, indir(unlu))],
        ['Kişilik sayısı (ünsüzler)', yaz(unsuz, indir(unsuz))],
        ['Harf toplamı', String(top)],
        ['Harf sayısı', String(adet)],
        ['Anahtar kelimeler', ANLAM[ifade]],
      ],
      text: dokum.join(' ').replace(/ \| /g, '  |  ').replace(/ \|$/, ''),
      note: 'Pisagor (Batı) numerolojisi kullanılır; Ç, Ğ, İ, Ö, Ş, Ü harfleri C, G, I, O, S, U ile aynı değeri alır. 11, 22 ve 33 usta sayı sayılır ve indirgenmez. Eğlence amaçlıdır; bilimsel bir dayanağı yoktur.',
    };
  }
