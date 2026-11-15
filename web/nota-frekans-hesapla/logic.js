// Nota Frekansı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const idx = Number(v.nota);
    if (!Number.isInteger(idx) || idx < 0 || idx > 11) h.err('Listeden bir nota seçin.');
    const okt = h.int(v.oktav, 'Oktav');
    if (okt < -1 || okt > 9) h.err('Oktav −1 ile 9 arasında olmalı.');
    const ref = h.pos(v.referans, 'Akort referansı');
    if (ref < 300 || ref > 600) h.err('Akort referansı 300–600 Hz arasında olmalı; standart değer 440\'tır.');
    const adlar = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
    const harf = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    const midi = 12 * (okt + 1) + idx;
    if (midi > 127) h.err('Bu nota MIDI aralığının (0–127) dışında; daha düşük bir oktav seçin.');
    const frek = (m) => ref * Math.pow(2, (m - 69) / 12);
    const ad = (m) => { const i = ((m % 12) + 12) % 12; return adlar[i] + (Math.floor(m / 12) - 1); };
    const f = frek(midi);
    const hz = (x) => h.fmt(x, x < 100 ? 3 : 2) + ' Hz';
    return {
      rows: [
        ['Frekans', hz(f)],
        ['Nota', adlar[idx] + okt + ' (' + harf[idx] + okt + ')'],
        ['MIDI nota numarası', String(midi)],
        ['Periyot', h.fmt(1000 / f, 3) + ' ms'],
        ['Havadaki dalga boyu', h.fmt(343 / f, 3) + ' m'],
        ['Yarım ton altı', ad(midi - 1) + ': ' + hz(frek(midi - 1))],
        ['Yarım ton üstü', ad(midi + 1) + ': ' + hz(frek(midi + 1))],
        ['Bir oktav üstü', hz(f * 2)],
      ],
      note: 'Eşit tamperaman: f = referans × 2^((MIDI − 69) ÷ 12). Dalga boyu 20 °C havada 343 m/s ses hızıyla hesaplanır.',
    };
  }
