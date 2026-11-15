// Hangi Kuşaktanım Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = [
      ['Kayıp Kuşak', 1883, 1900],
      ['En Büyük Kuşak', 1901, 1927],
      ['Sessiz Kuşak', 1928, 1945],
      ['Baby Boomer Kuşağı', 1946, 1964],
      ['X Kuşağı', 1965, 1980],
      ['Y Kuşağı (Milenyum)', 1981, 1996],
      ['Z Kuşağı', 1997, 2012],
      ['Alfa Kuşağı', 2013, 2024],
      ['Beta Kuşağı', 2025, 2039],
    ];
    const y = h.int(v.yil, 'Doğum yılı');
    const ref = h.dateOrToday(v.bugun, 'Bugünün tarihi').getUTCFullYear();
    if (y < 1883 || y > 2039) h.err('Doğum yılı 1883 ile 2039 arasında olmalı; dört haneli yazdığınızdan emin olun (örn. 1990).');
    if (y > ref) h.err('Doğum yılı, hesap yapılan yıldan (' + ref + ') sonra olamaz.');
    const i = K.findIndex((k) => y >= k[1] && y <= k[2]);
    const k = K[i];
    const enGenc = Math.max(0, ref - k[2]);
    const enYasli = ref - k[1];
    const rows = [
      ['Kuşak', k[0]],
      ['Doğum yılı aralığı', k[1] + '–' + k[2]],
      ['Bu yıl dolan yaş', String(ref - y)],
      ['Kuşağın bu yılki yaş aralığı', enGenc + '–' + enYasli + ' yaş'],
      ['Kuşak içindeki yeri', (y - k[1] + 1) + '. yıl (toplam ' + (k[2] - k[1] + 1) + ' yıl)'],
      ['Önceki kuşak', i > 0 ? K[i - 1][0] + ' (' + K[i - 1][1] + '–' + K[i - 1][2] + ')' : '—'],
      ['Sonraki kuşak', i < K.length - 1 ? K[i + 1][0] + ' (' + K[i + 1][1] + '–' + K[i + 1][2] + ')' : '—'],
    ];
    let note = 'Kuşak sınırları resmî bir tanım değildir; kaynaklara göre birkaç yıl farklılık gösterebilir.';
    if (y - k[1] <= 2 && i > 0) note = 'Doğum yılınız kuşak sınırına çok yakın; bazı kaynaklar sizi ' + K[i - 1][0] + ' içinde sayabilir. ' + note;
    else if (k[2] - y <= 2 && i < K.length - 1) note = 'Doğum yılınız kuşak sınırına çok yakın; bazı kaynaklar sizi ' + K[i + 1][0] + ' içinde sayabilir. ' + note;
    return { rows, note };
  }
