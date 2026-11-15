// Gelecek Değer (FV) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const PV = h.nonneg(v.bugun, 'Bugünkü tutar');
    const oran = h.num(v.oran, 'Yıllık oran');
    const yil = h.pos(v.sure, 'Süre');
    const pmt = h.nonneg(h.opt(v.katki, 0, 'Dönemlik katkı'), 'Dönemlik katkı');
    const m = Number(v.siklik);
    if (![1, 2, 4, 12, 365].includes(m)) h.err('Listeden geçerli bir bileşiklenme dönemi seçin.');
    if (PV === 0 && pmt === 0) h.err('Bugünkü tutar ya da dönemlik katkıdan en az biri sıfırdan büyük olmalı.');
    if (oran <= -100) h.err('Yıllık oran −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('Yıllık oran %10.000\'den büyük olamaz; değeri kontrol edin.');
    if (yil > 200) h.err('Süre en fazla 200 yıl olabilir.');
    const i = oran / 100 / m;
    if (i <= -1) h.err('Dönem oranı −%100 ya da altına düşüyor; oranı kontrol edin.');
    const N = yil * m;
    const Nt = Math.round(N);
    if (pmt > 0 && Math.abs(N - Nt) > 1e-9) h.err('Düzenli katkı varken süre tam dönem sayısına denk gelmeli (örn. aylık dönemde 2,5 yıl = 30 ay olur; 2,3 yıl olmaz).');
    const carpan = Math.pow(1 + i, N);
    const fvPV = PV * carpan;
    const fvPmt = pmt === 0 ? 0 : (Math.abs(i) < 1e-12 ? pmt * Nt : pmt * (carpan - 1) / i);
    const FV = fvPV + fvPmt;
    if (!Number.isFinite(FV)) h.err('Sonuç gösterilemeyecek kadar büyük; oranı ya da süreyi küçültün.');
    const yatirilan = PV + pmt * (pmt > 0 ? Nt : 0);
    const rows = [
      ['Gelecek değer (FV)', h.para(FV)],
      ['Yatırılan toplam tutar', h.para(yatirilan)],
      ['Elde edilen getiri', h.para(FV - yatirilan)],
      ['Büyüme çarpanı (1 + i)^n', h.fmt(carpan, 6)],
      ['Dönem sayısı', h.fmt(N, 2)],
      ['Dönem oranı', '%' + h.fmt(i * 100, 5)],
    ];
    if (pmt > 0) {
      rows.push(['Bugünkü tutarın gelecek değeri', h.para(fvPV)]);
      rows.push(['Düzenli katkıların gelecek değeri', h.para(fvPmt)]);
    }
    return {
      rows,
      note: 'FV = PV × (1 + i)^n + katkı × ((1 + i)^n − 1) ÷ i. Katkılar dönem sonunda yapılır; vergi, masraf ve enflasyon dikkate alınmaz.',
    };
  }
