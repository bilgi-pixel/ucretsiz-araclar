// Batarya Şarj Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kap = h.pos(v.kapasite, 'Batarya kapasitesi');
    const akim = h.pos(v.akim, 'Şarj akımı');
    const bas = h.nonneg(v.bas, 'Başlangıç doluluk');
    const hedef = h.pos(v.hedef, 'Hedef doluluk');
    const verim = h.pos(v.verim, 'Şarj verimi');
    if (hedef > 100) h.err('"Hedef doluluk" yüzde 100\'den büyük olamaz.');
    if (bas >= hedef) h.err('"Hedef doluluk", başlangıç doluluğundan büyük olmalı (örn. başlangıç 20, hedef 80).');
    if (verim > 100) h.err('"Şarj verimi" yüzde 100\'den büyük olamaz.');
    const kb = v.birim === 'a' ? 'Ah' : 'mAh';
    const eksik = kap * (hedef - bas) / 100;
    const saat = eksik / (akim * verim / 100);
    const dk = Math.round(saat * 60);
    const c = akim / kap;
    return {
      rows: [
        ['Şarj süresi', `${Math.floor(dk / 60)} saat ${dk % 60} dakika`],
        ['Süre (ondalık)', h.fmt(saat, 2) + ' saat'],
        ['Doldurulacak kapasite', h.fmt(eksik, 2) + ' ' + kb],
        ['Kayıpsız kuramsal süre', h.fmt(eksik / akim, 2) + ' saat'],
        ['Şarj hızı', h.fmt(c, 3) + ' C'],
      ],
      note: 'Hesap sabit şarj akımı varsayar. Lityum bataryalarda son bölümde akım azaldığı için tam dolum hesaplanandan uzun sürebilir. Üreticinin izin verdiği şarj akımını aşmayın.',
    };
  }
