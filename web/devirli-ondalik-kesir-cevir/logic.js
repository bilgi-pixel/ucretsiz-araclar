// Devirli Ondalık Sayıyı Kesre Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const temiz = (s) => String(s ?? '').replace(/\s/g, '');
    const T = temiz(v.tamKisim) === '' ? '0' : temiz(v.tamKisim);
    const N = temiz(v.devretmeyen);
    const R = temiz(v.devreden);
    if (!/^\d+$/.test(T)) h.err('"Tam kısım" yalnızca rakamlardan oluşmalı (örn. 0 ya da 12). Negatif sayı için sonucu eksi işaretiyle yazın.');
    if (N !== '' && !/^\d+$/.test(N)) h.err('"Devretmeyen basamaklar" yalnızca rakamlardan oluşmalı; devretmeyen kısım yoksa alanı boş bırakın.');
    if (R === '') h.err('"Devreden basamaklar" alanını doldurun; örneğin 0,333… için 3 yazın.');
    if (!/^\d+$/.test(R)) h.err('"Devreden basamaklar" yalnızca rakamlardan oluşmalı (örn. 3 ya da 142857).');
    if (/^0+$/.test(R)) h.err('Devreden kısım yalnızca sıfırlardan oluşamaz; bu durumda sayı devirli değildir. Sıfırdan farklı en az bir rakam yazın.');
    if (T.length > 15 || N.length > 15 || R.length > 15) h.err('Her alan en fazla 15 basamak olabilir.');
    const hepsi = BigInt(T + N + R);
    const on = BigInt(T + N);
    const hamPay = hepsi - on;
    const hamPayda = BigInt('9'.repeat(R.length) + '0'.repeat(N.length));
    let x = hamPay, y = hamPayda;
    while (y) { const t = x % y; x = y; y = t; }
    const p = hamPay / x, q = hamPayda / x;
    const tamYaz = String(BigInt(T));
    let acilim = N + R;
    while (acilim.length < 12) acilim += R;
    const rows = [
      ['Kesir (sade)', q === 1n ? String(p) : `${p}/${q}`],
      ['Sadeleşmemiş kesir', `${hamPay}/${hamPayda}`],
    ];
    if (q !== 1n && p > q) rows.push(['Tam sayılı kesir', `${p / q} tam ${p % q}/${q}`]);
    rows.push(['Devirli gösterim', `${tamYaz},${N}(${R})`]);
    rows.push(['Açılım', `${tamYaz},${acilim.slice(0, 12)}…`]);
    return {
      rows,
      note: `Kural: (${BigInt(T + N + R)} − ${on}) / ${hamPayda}. Paydada devreden basamak sayısı kadar 9, devretmeyen basamak sayısı kadar 0 bulunur.`,
    };
  }
