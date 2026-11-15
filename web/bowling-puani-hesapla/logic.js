// Bowling Puanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.atislar ?? '').toUpperCase().replace(/[\s,;|]+/g, '');
    if (ham === '') h.err('"Atışlar" alanına atışlarınızı yazın (örn. X 7/ 9- 81 ...).');
    const rolls = [];
    const spareIsareti = [];
    for (const c of ham) {
      if (c === 'X') { rolls.push(10); spareIsareti.push(false); }
      else if (c === '-' || c === 'F' || c === '−' || c === '–') { rolls.push(0); spareIsareti.push(false); }
      else if (c >= '0' && c <= '9') { rolls.push(Number(c)); spareIsareti.push(false); }
      else if (c === '/') {
        const n = rolls.length;
        if (n === 0 || rolls[n - 1] === 10 || spareIsareti[n - 1]) h.err('"/" işareti yalnızca bir çerçevenin ikinci atışında, ilk atışın ardından kullanılabilir.');
        rolls.push(10 - rolls[n - 1]); spareIsareti.push(true);
      } else h.err(`Tanınmayan karakter: "${c}". Yalnızca X, /, -, F ve 0–9 rakamlarını kullanın; strike için 10 değil X yazın.`);
    }
    const n = rolls.length;
    const izinli = new Set();
    const cerceveler = [];
    let i = 0, toplam = 0, strike = 0, spare = 0, acik = 0, yarim = false;
    for (let f = 1; f <= 10 && i < n; f++) {
      if (f < 10) {
        if (rolls[i] === 10) {
          if (i + 2 >= n) { yarim = true; i = n; break; }
          toplam += 10 + rolls[i + 1] + rolls[i + 2]; strike++;
          cerceveler.push([f, 'X', toplam]); i += 1;
        } else {
          if (i + 1 >= n) { yarim = true; i = n; break; }
          const a = rolls[i], b = rolls[i + 1];
          if (a + b > 10) h.err(`${f}. çerçevede iki atışın toplamı 10'u geçiyor (${a} + ${b}). Atışları kontrol edin.`);
          izinli.add(i + 1);
          const yazi = (a === 0 ? '-' : String(a)) + (a + b === 10 ? '/' : b === 0 ? '-' : String(b));
          if (a + b === 10) {
            if (i + 2 >= n) { yarim = true; i = n; break; }
            toplam += 10 + rolls[i + 2]; spare++;
          } else { toplam += a + b; acik++; }
          cerceveler.push([f, yazi, toplam]); i += 2;
        }
      } else {
        const a = rolls[i], b = rolls[i + 1], c = rolls[i + 2];
        const g = (x) => (x === 10 ? 'X' : x === 0 ? '-' : String(x));
        if (b === undefined) { yarim = true; i = n; break; }
        if (a === 10) {
          if (c === undefined) { yarim = true; i = n; break; }
          if (b < 10 && b + c > 10) h.err(`10. çerçevede strike sonrası iki atışın toplamı 10'u geçiyor (${b} + ${c}).`);
          izinli.add(i + 2);
          strike++; if (b === 10) { strike++; if (c === 10) strike++; } else if (b + c === 10) spare++;
          toplam += 10 + b + c;
          cerceveler.push([10, 'X' + g(b) + (b < 10 && b + c === 10 ? '/' : g(c)), toplam]); i += 3;
        } else if (a + b === 10) {
          izinli.add(i + 1);
          if (c === undefined) { yarim = true; i = n; break; }
          spare++; if (c === 10) strike++;
          toplam += 10 + c;
          cerceveler.push([10, g(a) + '/' + g(c), toplam]); i += 3;
        } else {
          if (a + b > 10) h.err(`10. çerçevede iki atışın toplamı 10'u geçiyor (${a} + ${b}).`);
          izinli.add(i + 1);
          acik++; toplam += a + b;
          cerceveler.push([10, g(a) + g(b), toplam]); i += 2;
        }
      }
    }
    if (i < n) h.err(`Fazla atış var: oyun 10 çerçevede bitti ama ${n - i} atış daha yazılmış. Açık 10. çerçevede bonus atışı yapılmaz.`);
    for (let j = 0; j < n; j++) if (spareIsareti[j] && !izinli.has(j)) h.err('"/" işareti yanlış yerde: spare yalnızca bir çerçevenin ikinci atışında (10. çerçevede strike sonrası üçüncü atışta) olabilir.');
    const bitti = cerceveler.length === 10;
    const rows = [
      [bitti ? 'Toplam puan' : 'Kesinleşen puan', String(toplam)],
      ['Puanı kesinleşen çerçeve', `${cerceveler.length} / 10`],
      ['Strike sayısı', String(strike)],
      ['Spare sayısı', String(spare)],
      ['Açık çerçeve', String(acik)],
    ];
    const text = cerceveler.length
      ? cerceveler.map(([f, y, t]) => `${f}. çerçeve: ${y} → ${t}`).join('\n')
      : 'Henüz puanı kesinleşen çerçeve yok.';
    return {
      rows, text,
      note: bitti ? 'Oyun tamamlandı. En yüksek olası puan 300\'dür (art arda 12 strike).' : (yarim || !bitti) ? 'Oyun tamamlanmamış: strike ve spare çerçevelerinin puanı, bonus atışları yapılınca kesinleşir. Yalnızca kesinleşen çerçeveler toplandı.' : '',
    };
  }
