// Üçgenin Üçüncü Açısını Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const k = v.birim === 'radyan' ? 180 / Math.PI : 1;
    const a = h.pos(v.aciA, 'Birinci açı') * k;
    const b = h.pos(v.aciB, 'İkinci açı') * k;
    if (a + b >= 180 - 1e-9) h.err(`İki açının toplamı 180°\'den küçük olmalı (şu an ${h.fmt(a + b, 4)}°). Bir üçgenin üç iç açısının toplamı 180° olduğundan üçüncü açıya yer kalmıyor.`);
    const c = 180 - a - b;
    const es = (x, y) => Math.abs(x - y) < 1e-7;
    const maks = Math.max(a, b, c);
    const aciTur = es(maks, 90) ? 'Dik üçgen' : maks > 90 ? 'Geniş açılı üçgen' : 'Dar açılı üçgen';
    const kenarTur = es(a, b) && es(b, c) ? 'Eşkenar üçgen' : es(a, b) || es(b, c) || es(a, c) ? 'İkizkenar üçgen' : 'Çeşitkenar üçgen';
    const d = (x) => h.fmt(x, 4) + '°';
    return {
      rows: [
        ['Üçüncü açı', d(c)],
        ['Üçüncü açı (radyan)', h.fmt(c * Math.PI / 180, 6) + ' rad'],
        ['Açılarına göre', aciTur],
        ['Kenarlarına göre', kenarTur],
        ['İç açılar', `${d(a)}, ${d(b)}, ${d(c)}`],
        ['Dış açılar', `${d(180 - a)}, ${d(180 - b)}, ${d(180 - c)}`],
      ],
      note: 'Hesap düzlem (Öklid) geometrisindeki üçgenler içindir: iç açılar toplamı 180°, dış açılar toplamı 360°.',
    };
  }
