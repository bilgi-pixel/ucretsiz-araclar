// Bir Tekrar Maksimum (1RM) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const w = h.pos(v.agirlik, 'Kaldırılan ağırlık');
    const r = h.posint(v.tekrar, 'Tekrar sayısı');
    if (w > 1000) h.err('Kaldırılan ağırlık 1.000 kg\'dan büyük olamaz.');
    if (r > 12) h.err('Tekrar sayısı en fazla 12 olabilir. Daha yüksek tekrarlarda tahmin güvenilir değildir; daha ağır bir yükle yeniden deneyin.');
    const f = r === 1
      ? { epley: w, brzycki: w, lombardi: w, oconner: w }
      : { epley: w * (1 + r / 30), brzycki: (w * 36) / (37 - r), lombardi: w * Math.pow(r, 0.1), oconner: w * (1 + 0.025 * r) };
    f.ortalama = (f.epley + f.brzycki + f.lombardi + f.oconner) / 4;
    const sec = v.formul || 'epley';
    if (!(sec in f)) h.err('Geçerli bir formül seçin.');
    const rm = f[sec];
    const kg = (x) => h.fmt(x, 1) + ' kg';
    const rows = [
      ['Tahmini 1RM', kg(rm)],
      ['Epley', kg(f.epley)],
      ['Brzycki', kg(f.brzycki)],
      ['Lombardi', kg(f.lombardi)],
      ['O\'Conner', kg(f.oconner)],
      ['Ortalama', kg(f.ortalama)],
    ];
    for (const p of [95, 90, 85, 80, 75, 70, 60, 50]) rows.push([`%${p} yük`, kg((rm * p) / 100)]);
    return { rows, note: r === 1 ? 'Tek tekrar girdiğiniz için kaldırdığınız ağırlık doğrudan 1RM kabul edilmiştir.' : 'Sonuç tahmindir; gerçek 1RM tekniğe, harekete ve o günkü forma göre birkaç kilogram farklı olabilir.' };
  }
