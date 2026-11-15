// Beygir Gücü Kilovat Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const PS = 735.49875;
    const HP = 745.69987158227022;
    const mekanik = v.tur === 'hp';
    const w = v.yon === 'kw' ? x * 1000 : x * (mekanik ? HP : PS);
    const kwRow = ['Kilovat', h.fmt(w / 1000, 4) + ' kW'];
    const wRow = ['Watt', h.fmt(w, 1) + ' W'];
    const psRow = ['Metrik beygir (PS)', h.fmt(w / PS, 2) + ' PS'];
    const hpRow = ['Mekanik beygir (hp)', h.fmt(w / HP, 2) + ' hp'];
    const rows = v.yon === 'kw'
      ? (mekanik ? [hpRow, psRow, kwRow, wRow] : [psRow, hpRow, kwRow, wRow])
      : [kwRow, wRow, psRow, hpRow];
    return {
      rows,
      note: '1 PS = 735,49875 W; 1 hp = 745,69987 W. Araç kataloglarındaki "HP" ya da "BG" çoğunlukla metrik beygirdir.',
    };
  }
