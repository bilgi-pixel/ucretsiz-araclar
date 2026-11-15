// Alacak Devir Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const satis = h.pos(v.satis, 'Dönem kredili net satışları');
    const son = h.nonneg(v.alacakSon, 'Dönem sonu ticari alacak');
    const basVar = String(v.alacakBas ?? '').trim() !== '';
    const bas = basVar ? h.nonneg(v.alacakBas, 'Dönem başı ticari alacak') : son;
    const donem = h.pos(v.donem, 'Dönem gün sayısı');
    if (donem > 3660) h.err('"Dönem gün sayısı" en fazla 3660 olabilir; yıllık hesap için 365 yazın.');
    const ort = (bas + son) / 2;
    if (!(ort > 0)) h.err('Ortalama ticari alacak sıfır; devir hızı hesaplanamaz. Alacak bakiyesi olmayan (tamamen peşin çalışan) işletmede tahsil süresi 0 gündür.');
    const hiz = satis / ort;
    const sure = donem / hiz;
    return {
      rows: [
        ['Alacak devir hızı', h.fmt(hiz, 2) + ' kez'],
        ['Ortalama tahsil süresi', h.fmt(sure, 1) + ' gün'],
        ['Ortalama ticari alacak', h.para(ort)],
        ['Günlük ortalama kredili satış', h.para(satis / donem)],
        ['Alacakların satışa oranı', '%' + h.fmt(ort / satis * 100, 2)],
      ],
      note: basVar ? 'Ortalama alacak, dönem başı ve dönem sonu bakiyelerinin aritmetik ortalamasıdır.' : 'Dönem başı bakiyesi girilmediği için ortalama yerine dönem sonu bakiyesi kullanıldı; bakiye dönem içinde çok değiştiyse sonuç sapabilir.',
    };
  }
