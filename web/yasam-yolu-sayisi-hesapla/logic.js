// Yaşam Yolu Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ANLAM = {
      1: 'liderlik, bağımsızlık, başlangıçlar', 2: 'denge, ortaklık, diplomasi', 3: 'yaratıcılık, iletişim, iyimserlik',
      4: 'istikrar, disiplin, emek', 5: 'özgürlük, macera, uyum yeteneği', 6: 'sorumluluk, bakım, uyum',
      7: 'sorgulama, bilgi arayışı, iç dünya', 8: 'hırs, yönetim, maddi denge', 9: 'şefkat, idealizm, bırakabilme',
      11: 'sezgi, ilham, duyarlılık (usta sayı)', 22: 'büyük ölçekli kuruculuk (usta sayı)', 33: 'özveri, öğreticilik (usta sayı)',
    };
    const rakamTopla = (n) => String(n).split('').reduce((a, c) => a + Number(c), 0);
    const indir = (n, ustalar) => { while (n > 9 && !ustalar.includes(n)) n = rakamTopla(n); return n; };
    const d = h.date(v.tarih, 'Doğum tarihi');
    const gun = d.getUTCDate(), ay = d.getUTCMonth() + 1, yil = d.getUTCFullYear();
    if (yil < 1000 || yil > 9999) h.err('Yıl dört basamaklı olmalı (örn. 1990).');
    const g = indir(gun, [11, 22]), a = indir(ay, [11, 22]), y = indir(yil, [11, 22]);
    const ara = g + a + y;
    const yol = indir(ara, [11, 22, 33]);
    const hepsi = rakamTopla(gun) + rakamTopla(ay) + rakamTopla(yil);
    const hepsiSon = indir(hepsi, [11, 22, 33]);
    return {
      rows: [
        ['Yaşam yolu sayısı', String(yol)],
        ['Gün + ay + yıl indirgemesi', g + ' + ' + a + ' + ' + y + ' = ' + ara + (ara === yol ? '' : ' → ' + yol)],
        ['Tüm rakamların toplamı yöntemi', hepsi === hepsiSon ? String(hepsi) : hepsi + ' → ' + hepsiSon],
        ['Doğum günü sayısı', gun === g ? String(g) : gun + ' → ' + g],
        ['Anahtar kelimeler', ANLAM[yol]],
        ['Doğum tarihi', h.fmtDate(d) + ' ' + h.gunAdi(d)],
      ],
      note: 'Gün, ay ve yıl önce ayrı ayrı indirgenir (11 ve 22 korunur), sonra toplanır; sonuçta 11, 22 ve 33 usta sayı olarak bırakılır. İki yöntem usta sayılarda farklı sonuç verebilir. Eğlence amaçlıdır; bilimsel dayanağı yoktur.',
    };
  }
