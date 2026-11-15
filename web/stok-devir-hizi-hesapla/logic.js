// Stok Devir Hızı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const smm = h.nonneg(v.smm, 'Satılan malın maliyeti');
    const bas = h.nonneg(v.basStok, 'Dönem başı stok');
    const son = h.nonneg(v.sonStok, 'Dönem sonu stok');
    const gun = h.pos(h.opt(v.gun, 365, 'Dönemin gün sayısı') + '', 'Dönemin gün sayısı');
    const ort = (bas + son) / 2;
    if (!(ort > 0)) h.err('Dönem başı ve dönem sonu stokun ikisi de sıfır olamaz; ortalama stok sıfır çıkar ve oran hesaplanamaz.');
    const devir = smm / ort;
    return {
      rows: [
        ['Stok devir hızı', h.fmt(devir, 2) + ' kez'],
        ['Stokta kalma süresi', devir > 0 ? h.fmt(gun / devir, 1) + ' gün' : 'Satış olmadığı için hesaplanamaz'],
        ['Ortalama stok', h.para(ort)],
        ['Stoktaki değişim', (son - bas >= 0 ? '+' : '−') + h.para(Math.abs(son - bas))],
        ['Yıllığa çevrilmiş devir hızı', h.fmt(devir * 365 / gun, 2) + ' kez'],
      ],
      note: 'Ortalama stok = (dönem başı + dönem sonu) ÷ 2. Stok tutarları mevsimsel dalgalanıyorsa ay sonu stoklarının ortalamasıyla hesap daha gerçekçi olur.',
    };
  }
