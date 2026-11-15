// Ters Trigonometri (Arcsin, Arccos, Arctan) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const f = ['arcsin', 'arccos', 'arctan'].includes(v.fonksiyon) ? v.fonksiyon : 'arcsin';
    if (f !== 'arctan' && Math.abs(x) > 1) h.err(`${f} yalnızca -1 ile 1 arasındaki değerler için tanımlıdır; sinüs ve kosinüs bu aralığın dışına çıkamaz. Değeri kontrol edin ya da arctan seçin.`);
    const rad = f === 'arcsin' ? Math.asin(x) : f === 'arccos' ? Math.acos(x) : Math.atan(x);
    let deg = rad * 180 / Math.PI;
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const norm = (a) => { const r = Number(((a % 360 + 360) % 360).toFixed(6)); return r === 360 ? 0 : r; };
    const aday = f === 'arcsin' ? [norm(deg), norm(180 - deg)] : f === 'arccos' ? [norm(deg), norm(360 - deg)] : [norm(deg), norm(deg + 180)];
    const cozum = [...new Set(aday)].sort((a, b) => a - b).map((a) => h.fmt(a, 6) + '°').join(' ve ');
    const ts = Math.round(Math.abs(deg) * 360000) / 100;
    const D = Math.floor(ts / 3600 + 1e-9), M = Math.floor((ts - D * 3600) / 60 + 1e-9), S = ts - D * 3600 - M * 60;
    const dms = `${deg < 0 ? '-' : ''}${D}° ${M}′ ${h.fmt(Math.abs(S), 2)}″`;
    const aralik = { arcsin: '-90° ile 90° arası', arccos: '0° ile 180° arası', arctan: '-90° ile 90° arası (uçlar hariç)' }[f];
    return {
      rows: [
        ['Açı (derece)', h.fmt(deg, 6) + '°'],
        ['Açı (radyan)', h.fmt(rad, 6) + ' rad'],
        ['π cinsinden', h.fmt(rad / Math.PI, 6) + 'π rad'],
        ['Derece dakika saniye', dms],
        ['0°–360° arasındaki çözümler', cozum],
        ['Esas değer aralığı', aralik],
      ],
      note: 'İlk satır fonksiyonun esas değeridir. Aynı oranı veren diğer açılar, listelenen çözümlere 360°\'nin tam katları eklenerek bulunur.',
    };
  }
