// Verimlilik Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const cikti = h.nonneg(v.cikti, 'Elde edilen çıktı');
    const girdi = h.pos(v.girdi, 'Kullanılan girdi');
    const ver = cikti / girdi;
    const rows = [['Verimlilik (birim girdi başına çıktı)', h.fmt(ver, 4)]];
    if (cikti > 0) rows.push(['Birim çıktı başına girdi', h.fmt(girdi / cikti, 4)]);
    let note = 'Sonucun birimi, yazdığınız çıktı ve girdinin birimlerine bağlıdır (örneğin adet/saat). Tek başına bir sayı, ancak aynı işin başka bir dönemiyle ya da bir standartla karşılaştırıldığında anlam kazanır.';
    if (String(v.standart ?? '').trim() !== '') {
      const st = h.pos(v.standart, 'Standart verimlilik');
      const beklenen = st * girdi;
      const oran = ver / st * 100;
      const fark = cikti - beklenen;
      rows.push(['Verimlilik oranı (standarda göre)', '%' + h.fmt(oran, 2)]);
      rows.push(['Standarda göre beklenen çıktı', h.fmt(beklenen, 2)]);
      rows.push(['Çıktı farkı', (fark > 0 && Number(fark.toFixed(2)) !== 0 ? '+' : '') + h.fmt(fark, 2)]);
      rows.push(['Bu çıktı için standart girdi', h.fmt(cikti / st, 2)]);
      if (oran > 100 + 1e-9) note = 'Gerçekleşen verimlilik standardın üzerinde. Sürekli yüksek çıkıyorsa standardı güncellemek gerekebilir.';
      else if (oran < 100 - 1e-9) note = 'Gerçekleşen verimlilik standardın altında. Farkın nedeni duruşlar, malzeme beklemeleri, hatalı üretim ya da gerçekçi olmayan bir standart olabilir.';
      else note = 'Gerçekleşen verimlilik standartla aynı.';
    }
    return { rows, note };
  }
