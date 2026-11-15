// Bahşiş Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Hesap tutarı');
    const oran = h.nonneg(h.opt(v.oran, 10, 'Bahşiş oranı'), 'Bahşiş oranı');
    const kisi = String(v.kisi ?? '').trim() === '' ? 1 : h.posint(v.kisi, 'Kişi sayısı');
    const adim = { 10: 10, 50: 50, 100: 100 }[v.yuvarla] || 0;
    let bahsis = tutar * oran / 100;
    let toplam = tutar + bahsis;
    if (adim) {
      toplam = Math.ceil(toplam / adim - 1e-9) * adim;
      bahsis = toplam - tutar;
    }
    const rows = [
      ['Bahşiş tutarı', h.para(bahsis)],
      ['Toplam ödeme', h.para(toplam)],
      ['Kişi başı ödeme', h.para(toplam / kisi)],
      ['Kişi başı bahşiş', h.para(bahsis / kisi)],
      ['Gerçekleşen bahşiş oranı', '%' + h.fmt(bahsis / tutar * 100, 2)],
    ];
    return {
      rows,
      note: adim
        ? `Toplam ödeme ${adim} TL'nin katına yukarı yuvarlandı; aradaki fark bahşişe eklendi.`
        : 'Bahşiş, yazdığınız hesap tutarı üzerinden hesaplanır. Bahşiş bırakmak ve oranı tamamen sizin takdirinizdedir.',
    };
  }
