// ISBN Doğrulama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let s = String(v.isbn ?? '').trim().toUpperCase();
    if (s === '') h.err('"ISBN numarası" alanını doldurun.');
    s = s.replace(/^ISBN(-1[03])?:?/, '').replace(/[\s\-–]/g, '');
    if (!/^[0-9X]+$/.test(s)) h.err('ISBN yalnızca rakam, tire ve (ISBN-10\'un son hanesinde) X içerebilir.');
    if (s.length !== 10 && s.length !== 13) h.err(`ISBN 10 ya da 13 haneli olmalı; ${s.length} hane yazdınız. Eksik ya da fazla hane olup olmadığını kontrol edin.`);
    const x = s.indexOf('X');
    if (x !== -1 && (s.length === 13 || x !== 9)) h.err('X yalnızca ISBN-10\'un son hanesinde bulunabilir ve 10 değerini gösterir.');
    const on3Hane = (on2) => {
      let t = 0;
      for (let i = 0; i < 12; i++) t += (on2.charCodeAt(i) - 48) * (i % 2 === 0 ? 1 : 3);
      return String((10 - (t % 10)) % 10);
    };
    const on0Hane = (dokuz) => {
      let t = 0;
      for (let i = 0; i < 9; i++) t += (dokuz.charCodeAt(i) - 48) * (10 - i);
      const k = (11 - (t % 11)) % 11;
      return k === 10 ? 'X' : String(k);
    };
    const rows = [];
    if (s.length === 10) {
      let toplam = 0;
      for (let i = 0; i < 10; i++) toplam += (s[i] === 'X' ? 10 : s.charCodeAt(i) - 48) * (10 - i);
      const beklenen = on0Hane(s.slice(0, 9));
      const gecerli = beklenen === s[9];
      rows.push(['Sonuç', gecerli ? 'Geçerli ISBN-10' : 'Geçersiz ISBN-10 – kontrol hanesi tutmuyor']);
      rows.push(['Biçim', 'ISBN-10 (10 hane)']);
      rows.push(['Yazılan kontrol hanesi', s[9]]);
      rows.push(['Beklenen kontrol hanesi', beklenen]);
      rows.push(['Ağırlıklı toplam', `${toplam} (11'e bölümünden kalan ${toplam % 11})`]);
      if (gecerli) {
        const on2 = '978' + s.slice(0, 9);
        rows.push(['ISBN-13 karşılığı', on2 + on3Hane(on2)]);
      }
    } else {
      if (!/^97[89]/.test(s)) h.err('ISBN-13 numaraları 978 ya da 979 ile başlar. Başka önekli 13 haneli barkodlar için EAN-13 aracını kullanın.');
      let toplam = 0;
      for (let i = 0; i < 13; i++) toplam += (s.charCodeAt(i) - 48) * (i % 2 === 0 ? 1 : 3);
      const beklenen = on3Hane(s);
      const gecerli = beklenen === s[12];
      rows.push(['Sonuç', gecerli ? 'Geçerli ISBN-13' : 'Geçersiz ISBN-13 – kontrol hanesi tutmuyor']);
      rows.push(['Biçim', 'ISBN-13 (13 hane)']);
      rows.push(['Yazılan kontrol hanesi', s[12]]);
      rows.push(['Beklenen kontrol hanesi', beklenen]);
      rows.push(['Ağırlıklı toplam', `${toplam} (10'a bölümünden kalan ${toplam % 10})`]);
      rows.push(['Önek', s.slice(0, 3)]);
      if (gecerli) {
        rows.push(['ISBN-10 karşılığı', s.startsWith('978') ? s.slice(3, 12) + on0Hane(s.slice(3, 12)) : 'Yok (979 önekli numaraların ISBN-10 karşılığı olmaz)']);
      }
    }
    return {
      rows,
      note: 'Denetim yalnızca kontrol hanesinin tutarlılığına bakar; numaranın gerçekten bir kitaba atanmış olup olmadığını sorgulamaz. Karşılıklar tiresiz yazılır.',
    };
  }
