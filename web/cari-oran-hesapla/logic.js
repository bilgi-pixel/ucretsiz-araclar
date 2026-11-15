// Cari Oran Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const donen = h.nonneg(v.donen, 'Dönen varlıklar');
    const kvyk = h.pos(v.kvyk, 'Kısa vadeli yabancı kaynaklar');
    const stokVar = String(v.stok ?? '').trim() !== '';
    const nakitVar = String(v.nakit ?? '').trim() !== '';
    const stok = stokVar ? h.nonneg(v.stok, 'Stoklar') : 0;
    const nakit = nakitVar ? h.nonneg(v.nakit, 'Nakit ve benzerleri') : 0;
    if (stok > donen) h.err('Stoklar dönen varlıkların bir parçasıdır; dönen varlıklar toplamından büyük olamaz.');
    if (nakit > donen) h.err('Nakit ve benzerleri dönen varlıkların bir parçasıdır; dönen varlıklar toplamından büyük olamaz.');
    if (stok + nakit > donen + 1e-9) h.err('Stoklar ile nakdin toplamı dönen varlıkları aşıyor; tutarları kontrol edin.');
    const cari = donen / kvyk;
    const nis = donen - kvyk;
    const yorum = cari < 1 - 1e-9 ? 'Dönen varlıklar kısa vadeli borçları karşılamıyor'
      : cari < 1.5 - 1e-9 ? 'Kısa vadeli borçlar karşılanıyor, güvenlik payı dar'
      : cari <= 2 + 1e-9 ? 'Genel kabul gören 1,5–2 aralığında'
      : 'Borç ödeme gücü yüksek; atıl varlık olup olmadığına bakın';
    const rows = [
      ['Cari oran', h.fmt(cari, 2)],
      ['Net işletme sermayesi', (nis < 0 ? '−' : '') + h.para(Math.abs(nis))],
    ];
    if (stokVar) rows.push(['Asit-test oranı', h.fmt((donen - stok) / kvyk, 2)]);
    if (nakitVar) rows.push(['Nakit oranı', h.fmt(nakit / kvyk, 2)]);
    rows.push(['Değerlendirme', yorum]);
    return {
      rows,
      note: 'Değerlendirme genel bir başparmak kuralına dayanır; uygun düzey sektöre, vade yapısına ve stokların niteliğine göre değişir.',
    };
  }
