// Çokgen İç Açı ve Köşegen Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.int(v.kenar, 'Kenar sayısı');
    if (n < 3) h.err('Kenar sayısı en az 3 olmalıdır; en az kenarlı çokgen üçgendir.');
    if (n > 1000000) h.err('Kenar sayısı en fazla 1.000.000 olabilir; daha küçük bir değer yazın.');
    const adlar = { 3: 'Üçgen', 4: 'Dörtgen', 5: 'Beşgen', 6: 'Altıgen', 7: 'Yedigen', 8: 'Sekizgen', 9: 'Dokuzgen', 10: 'Ongen', 11: 'On birgen', 12: 'On ikigen', 15: 'On beşgen', 20: 'Yirmigen' };
    const toplam = (n - 2) * 180;
    return {
      rows: [
        ['İç açılar toplamı', h.fmt(toplam, 0) + '°'],
        ['Bir iç açı (düzgün çokgen)', h.fmt(toplam / n, 4) + '°'],
        ['Bir dış açı (düzgün çokgen)', h.fmt(360 / n, 4) + '°'],
        ['Dış açılar toplamı', '360°'],
        ['Köşegen sayısı', h.fmt(n * (n - 3) / 2, 0)],
        ['Bir köşeden çizilen köşegen sayısı', h.fmt(n - 3, 0)],
        ['Bir köşeden ayrılan üçgen sayısı', h.fmt(n - 2, 0)],
        ['Çokgenin adı', adlar[n] || `${h.fmt(n, 0)}-gen`],
      ],
      note: 'İç açılar toplamı ve köşegen sayısı her dışbükey çokgen için geçerlidir. Tek bir iç ve dış açının ölçüsü yalnızca bütün kenarları ve açıları eşit olan düzgün çokgenler içindir.',
    };
  }
