// Aritmetik Dizi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.num(v.ilk, 'İlk terim');
    const d = h.num(v.fark, 'Ortak fark');
    const n = h.posint(v.adet, 'Terim numarası');
    if (n > 1e9) h.err('Terim numarası en fazla 1.000.000.000 olabilir.');
    const an = a + (n - 1) * d;
    const s = (n * (a + an)) / 2;
    if (!Number.isFinite(an) || !Number.isFinite(s)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük değerler deneyin.');
    const f = (x) => (Math.abs(x) >= 1e15 ? h.sig(x, 10) : h.fmt(x, 6));
    const k = Math.min(n, 10);
    const liste = [];
    for (let i = 0; i < k; i++) liste.push(f(a + i * d));
    const dYazi = d < 0 ? `(${f(d)})` : f(d);
    const tur = d > 0 ? 'Artan dizi' : d < 0 ? 'Azalan dizi' : 'Sabit dizi';
    return {
      rows: [
        ['n. terim', f(an)],
        ['İlk n terimin toplamı', f(s)],
        ['Genel terim', `aₙ = ${f(a)} + (n − 1) × ${dYazi}`],
        ['Dizinin türü', tur],
        ['İlk terimler', liste.join('; ') + (n > k ? '; …' : '')],
      ],
      note: 'aₙ = a₁ + (n − 1) × d ve Sₙ = n × (a₁ + aₙ) ÷ 2 formülleri kullanılır. Listede en fazla ilk 10 terim gösterilir.',
    };
  }
