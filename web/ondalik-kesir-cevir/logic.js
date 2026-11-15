// Ondalık Sayıyı Kesre Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.sayi ?? '').trim().replace(/\s+/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Ondalık sayı" alanını doldurun (örn. 0,75).');
    if (t.includes('/')) h.err('Bu araç ondalık sayıyı kesre çevirir; kesir değil, 0,75 gibi virgüllü bir sayı yazın.');
    const m = /^([-+]?)(\d*)(?:[.,](\d*))?$/.exec(t);
    if (!m || (m[2] === '' && (m[3] ?? '') === '')) h.err('Geçerli bir ondalık sayı yazın (örn. 0,75 ya da 2,5). Binlik ayraç kullanmayın.');
    const tamKisim = m[2] === '' ? '0' : m[2];
    const kesirKisim = m[3] ?? '';
    if (kesirKisim.length > 15) h.err('En fazla 15 ondalık basamak yazabilirsiniz.');
    if (tamKisim.replace(/^0+/, '').length > 15) h.err('Tam kısım en fazla 15 basamak olabilir.');
    const negatif = m[1] === '-';
    let pay = BigInt(tamKisim + kesirKisim);
    let payda = 10n ** BigInt(kesirKisim.length);
    const ebob = (a, b) => { while (b) { [a, b] = [b, a % b]; } return a; };
    const g = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const isaret = negatif && pay !== 0n ? '-' : '';
    const bolen = pay === 0n ? payda : ebob(pay, payda);
    const sPay = pay / bolen, sPayda = payda / bolen;
    const rows = [
      ['Kesir (en sade hâli)', `${isaret}${g(sPay)}/${g(sPayda)}`],
      ['Sadeleşmemiş kesir', `${isaret}${g(pay)}/${g(payda)}`],
      ['Sadeleştirmede bölünen sayı (EBOB)', g(bolen)],
    ];
    const tam = sPay / sPayda, kalan = sPay % sPayda;
    if (sPayda !== 1n && tam > 0n) rows.push(['Tam sayılı kesir', `${isaret}${g(tam)} tam ${g(kalan)}/${g(sPayda)}`]);
    rows.push(['Kesir türü', sPayda === 1n ? 'Tam sayı' : tam > 0n ? 'Bileşik kesir' : 'Basit kesir']);
    const deger = Number(tamKisim + '.' + (kesirKisim || '0')) * (negatif ? -1 : 1);
    rows.push(['Yüzde karşılığı', '%' + h.fmt(deger * 100, 10)]);
    let note;
    if (sPayda === 1n) note = 'Sayının ondalık kısmı olmadığı için paydası 1 olan bir kesir olarak yazılır.';
    else if (bolen === 1n) note = `Pay ile payda aralarında asal olduğundan ${g(pay)}/${g(payda)} kesri daha fazla sadeleşmez.`;
    else note = `Virgülden sonra ${kesirKisim.length} basamak olduğu için payda ${g(payda)} alındı; pay ve payda ${g(bolen)} ile bölünerek sadeleştirildi.`;
    return { rows, note };
  }
