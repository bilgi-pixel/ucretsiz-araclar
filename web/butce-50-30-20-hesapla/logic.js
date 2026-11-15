// 50/30/20 Bütçe Kuralı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const dolu = (s) => String(s ?? '').trim() !== '';
    const hIhtiyac = gelir * 0.5, hIstek = gelir * 0.3, hBirikim = gelir * 0.2;
    const rows = [
      ['İhtiyaçlar (%50)', h.para(hIhtiyac)],
      ['İstekler (%30)', h.para(hIstek)],
      ['Birikim ve borç ödemesi (%20)', h.para(hBirikim)],
      ['Yıllık birikim hedefi', h.para(hBirikim * 12)],
    ];
    let note = 'Paylar net gelir üzerinden hesaplanır. Oranlar bir başlangıç noktasıdır; yaşam koşullarınıza göre uyarlayabilirsiniz.';
    if (dolu(v.ihtiyac) || dolu(v.istek)) {
      if (!dolu(v.ihtiyac) || !dolu(v.istek)) h.err('Karşılaştırma için hem ihtiyaç hem istek harcamanızı yazın; harcama yoksa 0 girin.');
      const ihtiyac = h.nonneg(v.ihtiyac, 'Mevcut ihtiyaç harcamanız');
      const istek = h.nonneg(v.istek, 'Mevcut istek harcamanız');
      const durum = (gercek, hedef) => {
        const fark = gercek - hedef;
        if (Math.abs(fark) < 0.005) return 'Hedefte';
        return fark > 0 ? `Hedefin ${h.para(fark)} üzerinde` : `Hedefin ${h.para(-fark)} altında`;
      };
      const birikim = gelir - ihtiyac - istek;
      rows.push(['Mevcut ihtiyaç payı', '%' + h.fmt(ihtiyac / gelir * 100, 1)]);
      rows.push(['İhtiyaç durumu', durum(ihtiyac, hIhtiyac)]);
      rows.push(['Mevcut istek payı', '%' + h.fmt(istek / gelir * 100, 1)]);
      rows.push(['İstek durumu', durum(istek, hIstek)]);
      rows.push(['Mevcut birikim', h.para(birikim)]);
      rows.push(['Mevcut birikim oranı', '%' + h.fmt(birikim / gelir * 100, 1)]);
      note = birikim < 0
        ? 'Harcamalarınız gelirinizi aşıyor; aradaki fark borçla ya da birikimden karşılanıyor demektir.'
        : 'Mevcut birikim, gelirden ihtiyaç ve istek harcamalarının çıkarılmasıyla bulunur.';
    }
    return { rows, note };
  }
