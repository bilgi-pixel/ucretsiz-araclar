// Geometrik Dizi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.num(v.ilk, 'İlk terim');
    const r = h.num(v.carpan, 'Ortak çarpan');
    const n = h.posint(v.adet, 'Terim numarası');
    if (a === 0) h.err('İlk terim sıfır olamaz; sıfırla başlayan dizinin bütün terimleri sıfırdır.');
    if (r === 0) h.err('Ortak çarpan sıfır olamaz; sıfırdan farklı bir çarpan yazın.');
    if (n > 1000) h.err('Terim numarası en fazla 1.000 olabilir.');
    let terim = a, toplam = 0;
    const liste = [];
    for (let i = 1; i <= n; i++) {
      if (i > 1) terim *= r;
      toplam += terim;
      if (i <= 8) liste.push(terim);
    }
    if (!Number.isFinite(terim) || !Number.isFinite(toplam)) h.err('Sonuç gösterilemeyecek kadar büyük; daha küçük bir terim numarası ya da çarpan deneyin.');
    const f = (x) => h.sig(x, 10);
    const rYazi = r < 0 ? `(${f(r)})` : f(r);
    const sonsuz = Math.abs(r) < 1 ? f(a / (1 - r)) : 'Yok (|r| ≥ 1 olduğundan toplam sınırsız büyür ya da salınır)';
    return {
      rows: [
        ['n. terim', f(terim)],
        ['İlk n terimin toplamı', f(toplam)],
        ['Sonsuz toplam', sonsuz],
        ['Genel terim', `aₙ = ${f(a)} × ${rYazi}^(n − 1)`],
        ['İlk terimler', liste.map(f).join('; ') + (n > 8 ? '; …' : '')],
      ],
      note: 'aₙ = a₁ × r^(n − 1) ve Sₙ = a₁ × (1 − rⁿ) ÷ (1 − r) formülleri kullanılır. Sonuçlar 10 anlamlı basamağa yuvarlanır; listede en fazla ilk 8 terim gösterilir.',
    };
  }
