// Salamura Tuz Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const suG = h.pos(v.su, 'Su miktarı') * 1000;
    const p = h.pos(v.oran, 'Tuz oranı');
    if (p > 30) h.err('Tuz oranı %30\'dan büyük olamaz; tuz suda bu kadar çözünmez. Salamuralar çoğunlukla %2 ile %12 arasındadır.');
    let tuz;
    let sebzeG = 0;
    if (v.yontem === 'cozelti') tuz = suG * p / (100 - p);
    else if (v.yontem === 'denge') {
      if (String(v.sebze ?? '').trim() === '') h.err('Denge yöntemi için "Sebze ağırlığı" alanını doldurun.');
      sebzeG = h.pos(v.sebze, 'Sebze ağırlığı') * 1000;
      tuz = (suG + sebzeG) * p / 100;
    } else tuz = suG * p / 100;
    const rows = [
      ['Gereken tuz', h.fmt(tuz, 1) + ' g'],
      ['1 litre suya düşen tuz', h.fmt(tuz / suG * 1000, 1) + ' g'],
      ['Salamura ağırlığı (su + tuz)', h.fmt(suG + tuz, 0) + ' g'],
      ['Salamuranın ağırlıkça tuz oranı', '%' + h.fmt(tuz / (suG + tuz) * 100, 2)],
    ];
    if (v.yontem === 'denge') rows.push(['Kavanozdaki toplam ağırlık', h.fmt(suG + sebzeG + tuz, 0) + ' g']);
    return {
      rows,
      note: '1 litre su 1.000 g kabul edilir. Tuzu kaşıkla değil teraziyle ölçün; tuzun tane iriliğine göre bir kaşığın ağırlığı çok değişir.',
    };
  }
