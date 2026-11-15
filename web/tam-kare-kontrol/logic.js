// Tam Kare Sayı Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.int(v.n, 'Sayı');
    if (n < 0) h.err('Negatif sayılar tam kare olamaz, çünkü hiçbir gerçek sayının karesi negatif değildir. Sıfır ya da pozitif bir tam sayı yazın.');
    if (n > 999999999999999) h.err('Sayı çok büyük; en fazla 15 basamaklı bir tam sayı yazın.');
    // Tam sayı karekök (taban): Math.sqrt sonucunu BigInt ile düzelt
    const N = BigInt(n);
    let k = BigInt(Math.floor(Math.sqrt(n)));
    while (k * k > N) k--;
    while ((k + 1n) * (k + 1n) <= N) k++;
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const tam = k * k === N;
    const sonBasamak = Number(N % 10n);
    const rows = [];
    if (tam) {
      rows.push(['Sonuç', `${g(N)} tam karedir`]);
      rows.push(['Karekökü', g(k)]);
      rows.push(['Gösterim', `${g(k)}² = ${g(N)}`]);
      rows.push(['Önceki tam kare', k > 0n ? `${g((k - 1n) * (k - 1n))} (${g(k - 1n)}²)` : 'Yok']);
      rows.push(['Sonraki tam kare', `${g((k + 1n) * (k + 1n))} (${g(k + 1n)}²)`]);
      return { rows, note: 'Sayının karekökü bir tam sayı olduğu için tam karedir.' };
    }
    const alt = k * k, ust = (k + 1n) * (k + 1n);
    rows.push(['Sonuç', `${g(N)} tam kare değildir`]);
    rows.push(['Karekökü (yaklaşık)', h.fmt(Math.sqrt(n), 6)]);
    rows.push(['Önceki tam kare', `${g(alt)} (${g(k)}²)`]);
    rows.push(['Sonraki tam kare', `${g(ust)} (${g(k + 1n)}²)`]);
    rows.push(['Önceki tam kareye uzaklık', g(N - alt)]);
    rows.push(['Sonraki tam kareye uzaklık', g(ust - N)]);
    const yasak = [2, 3, 7, 8].includes(sonBasamak);
    return {
      rows,
      note: yasak
        ? `Son rakamı ${sonBasamak} olan hiçbir sayı tam kare olamaz; tam karelerin son rakamı yalnızca 0, 1, 4, 5, 6 ya da 9 olabilir.`
        : `Sayı, art arda gelen ${g(k)}² ile ${g(k + 1n)}² arasında kaldığı için tam kare değildir.`,
    };
  }
