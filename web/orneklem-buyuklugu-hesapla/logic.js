// Örneklem Büyüklüğü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const z = zTablo[duzey];
    const e = h.pos(v.hata, 'Hata payı (%)');
    if (e >= 50) h.err('"Hata payı (%)" 50\'den küçük olmalı; yaygın değerler 1 ile 10 arasındadır.');
    const pY = h.num(v.oran, 'Tahmini oran (%)');
    if (!(pY > 0 && pY < 100)) h.err('"Tahmini oran (%)" 0 ile 100 arasında olmalı (uçlar hariç). Bilmiyorsanız 50 yazın.');
    const evrenVar = String(v.evren ?? '').trim() !== '';
    const N = evrenVar ? h.posint(v.evren, 'Evren büyüklüğü') : null;
    const yanitVar = String(v.yanit ?? '').trim() !== '';
    const r = yanitVar ? h.pos(v.yanit, 'Beklenen yanıt oranı (%)') : null;
    if (r !== null && r > 100) h.err('"Beklenen yanıt oranı (%)" 100\'den büyük olamaz.');
    const p = pY / 100, d = e / 100;
    const n0 = z * z * p * (1 - p) / (d * d);
    const yukari = (x) => Math.ceil(x - 1e-9);
    const ham = N === null ? n0 : n0 / (1 + (n0 - 1) / N);
    let n = Math.max(1, yukari(ham));
    if (N !== null && n > N) n = N;
    const rows = [
      ['Gerekli örneklem büyüklüğü', h.fmt(n, 0)],
      ['Yuvarlanmamış değer', h.fmt(ham, 2)],
    ];
    if (N !== null) {
      rows.push(['Sonsuz evren için değer', h.fmt(yukari(n0), 0)]);
      rows.push(['Evrenin yüzdesi', '%' + h.fmt(n / N * 100, 2)]);
    }
    rows.push(['z değeri', h.fmt(z, 4)]);
    let note = 'Sonuç, basit rastgele örnekleme ve bir oranın (yüzdenin) tahmini için geçerlidir; kesirli değer her zaman yukarı yuvarlanır.';
    if (r !== null) {
      const davet = yukari(n / (r / 100));
      rows.push(['Davet edilecek kişi sayısı', h.fmt(davet, 0)]);
      if (N !== null && davet > N) note = 'Bu yanıt oranıyla gereken davet sayısı evren büyüklüğünü aşıyor; hedefe ulaşmak için yanıt oranını artırmanız ya da hata payını genişletmeniz gerekir. ' + note;
    }
    return { rows, note };
  }
