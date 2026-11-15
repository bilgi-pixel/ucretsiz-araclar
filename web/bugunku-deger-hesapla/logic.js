// Bugünkü Değer (PV) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const FV = h.pos(v.gelecek, 'Gelecekteki tutar');
    const oran = h.num(v.oran, 'Yıllık iskonto oranı');
    const yil = h.nonneg(v.sure, 'Süre');
    const m = Number(v.siklik);
    if (![1, 2, 4, 12, 365].includes(m)) h.err('Listeden geçerli bir bileşiklenme dönemi seçin.');
    if (oran <= -100) h.err('İskonto oranı −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('İskonto oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    if (yil > 200) h.err('Süre en fazla 200 yıl olabilir.');
    const i = oran / 100 / m;
    if (i <= -1) h.err('Dönem oranı −%100 ya da altına düşüyor; oranı kontrol edin.');
    const N = yil * m;
    const faktor = Math.pow(1 + i, -N);
    const PV = FV * faktor;
    if (!Number.isFinite(PV)) h.err('Sonuç gösterilemeyecek kadar büyük; oranı ya da süreyi kontrol edin.');
    return {
      rows: [
        ['Bugünkü değer (PV)', h.para(PV)],
        ['İskonto tutarı (FV − PV)', h.para(FV - PV)],
        ['İskonto faktörü', h.fmt(faktor, 6)],
        ['Bugünkü değerin gelecekteki tutara oranı', '%' + h.fmt(faktor * 100, 2)],
        ['Dönem sayısı', h.fmt(N, 2)],
        ['Dönem oranı', '%' + h.fmt(i * 100, 5)],
      ],
      note: 'PV = FV ÷ (1 + i)^n. Oranın süre boyunca sabit kaldığı varsayılır; vergi ve masraflar dikkate alınmaz.',
    };
  }
