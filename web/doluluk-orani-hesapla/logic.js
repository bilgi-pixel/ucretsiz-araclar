// Doluluk Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dolu = h.nonneg(v.dolu, 'Dolu birim sayısı');
    const kap = h.pos(v.kapasite, 'Kapasite');
    const gun = h.pos(v.gun, 'Dönem sayısı');
    const toplam = kap * gun;
    if (dolu > toplam + 1e-9) h.err(`Dolu birim sayısı toplam kapasiteden (${h.fmt(toplam, 2)}) büyük olamaz. Dönem birden çok günse "Dönem sayısı" alanını doldurun.`);
    const oran = dolu / toplam * 100;
    const rows = [
      ['Doluluk oranı', '%' + h.fmt(oran, 2)],
      ['Boşluk oranı', '%' + h.fmt(100 - oran, 2)],
      ['Toplam kapasite', h.fmt(toplam, 2)],
      ['Boş kalan kapasite', h.fmt(toplam - dolu, 2)],
      ['Dönem başına ortalama dolu birim', h.fmt(dolu / gun, 2)],
    ];
    let note = 'Toplam kapasite, birim sayısı ile dönem sayısının çarpımıdır. Bakım ya da tadilat nedeniyle satışa kapalı birimleri kapasiteden düşerseniz satışa açık kapasiteye göre doluluğu bulursunuz.';
    if (String(v.gelir ?? '').trim() !== '') {
      const gelir = h.nonneg(v.gelir, 'Dönem geliri');
      if (dolu > 0) rows.push(['Dolu birim başına ortalama gelir', h.para(gelir / dolu)]);
      rows.push(['Kapasite birimi başına gelir', h.para(gelir / toplam)]);
      if (dolu > 0 && oran < 100 - 1e-9) rows.push(['Boş kapasitenin gelir karşılığı', h.para(gelir / dolu * (toplam - dolu))]);
      note = 'Kapasite birimi başına gelir, ortalama fiyat ile doluluk oranının çarpımına eşittir. Boş kapasitenin gelir karşılığı, boş birimlerin aynı ortalama fiyatla satıldığı varsayımına dayanan kuramsal bir üst sınırdır.';
    }
    return { rows, note };
  }
