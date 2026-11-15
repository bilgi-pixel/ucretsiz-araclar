// mAh Wh Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const V = h.pos(v.gerilim, 'Nominal gerilim');
    const mah = v.yon === 'wm' ? x * 1000 / V : x;
    const wh = mah * V / 1000;
    const rows = v.yon === 'wm'
      ? [['Miliamper-saat', h.fmt(mah, 2) + ' mAh'], ['Watt-saat', h.fmt(wh, 3) + ' Wh']]
      : [['Watt-saat', h.fmt(wh, 3) + ' Wh'], ['Miliamper-saat', h.fmt(mah, 2) + ' mAh']];
    rows.push(['Amper-saat', h.fmt(mah / 1000, 4) + ' Ah']);
    rows.push(['Kilowatt-saat', h.fmt(wh / 1000, 5) + ' kWh']);
    rows.push(['Kilojoule', h.fmt(wh * 3.6, 2) + ' kJ']);
    return { rows, note: 'Wh = mAh × V ÷ 1000. Nominal gerilim kullanılır; bataryadan gerçekte alınan enerji kayıplar nedeniyle biraz daha düşüktür.' };
  }
