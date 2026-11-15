// Derece Grad Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    const derece = v.yon === 'grad' ? x * 0.9 : x;
    const grad = v.yon === 'grad' ? x : x / 0.9;
    const ss = Math.round(Math.abs(derece) * 360000);
    const d = Math.floor(ss / 360000);
    const m = Math.floor((ss % 360000) / 6000);
    const s = (ss % 6000) / 100;
    const isaret = derece < 0 && ss > 0 ? '-' : '';
    const dereceSatir = ['Derece', h.fmt(derece, 6) + '°'];
    const gradSatir = ['Grad', h.fmt(grad, 6) + ' grad'];
    const rows = v.yon === 'grad' ? [dereceSatir, gradSatir] : [gradSatir, dereceSatir];
    rows.push(['Derece dakika saniye', `${isaret}${d}° ${m}′ ${h.fmt(s, 2)}″`]);
    rows.push(['Radyan', h.fmt(derece * Math.PI / 180, 6) + ' rad']);
    rows.push(['Devir', h.fmt(derece / 360, 6) + ' devir']);
    return { rows, note: '1 grad = 0,9° ve 1° = 10/9 grad (tam oran). Tam tur 360° = 400 grad = 2π radyandır.' };
  }
