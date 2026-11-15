// Watt Beygir Gücü Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const PS = 735.49875;
    const HP = 745.69987158227022;
    const mekanik = v.tur === 'hp';
    const w = v.yon === 'hp' ? x * (mekanik ? HP : PS) : x;
    const wRow = ['Watt', h.fmt(w, 2) + ' W'];
    const kwRow = ['Kilovat', h.fmt(w / 1000, 4) + ' kW'];
    const psRow = ['Metrik beygir (PS)', h.fmt(w / PS, 4) + ' PS'];
    const hpRow = ['Mekanik beygir (hp)', h.fmt(w / HP, 4) + ' hp'];
    const rows = v.yon === 'hp'
      ? [wRow, kwRow, psRow, hpRow]
      : (mekanik ? [hpRow, psRow, wRow, kwRow] : [psRow, hpRow, wRow, kwRow]);
    return {
      rows,
      note: '1 PS = 735,49875 W; 1 hp = 745,69987 W. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
