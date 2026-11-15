// Süre Çarpma ve Bölme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const coz = (s, ad) => {
      const t = String(s ?? '').trim();
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      const p = t.split(':').map((x) => x.trim());
      if (p.length < 2 || p.length > 3) h.err(`"${ad}" alanını saat:dakika:saniye ya da saat:dakika biçiminde yazın (örn. 1:30:00).`);
      const sa = h.nonneg(p[0], ad + ' (saat)');
      if (!Number.isInteger(sa)) h.err(`"${ad}" alanında saat tam sayı olmalı; kesirli kısmı dakika olarak yazın.`);
      const dk = h.nonneg(p[1], ad + ' (dakika)');
      if (!Number.isInteger(dk) || dk >= 60) h.err(`"${ad}" alanında dakika 0–59 arasında tam sayı olmalı.`);
      const sn = p.length === 3 ? h.nonneg(p[2], ad + ' (saniye)') : 0;
      if (sn >= 60) h.err(`"${ad}" alanında saniye 60'tan küçük olmalı.`);
      return sa * 3600 + dk * 60 + sn;
    };
    const bicim = (sn) => {
      const cs = Math.round(sn * 100);
      const sa = Math.floor(cs / 360000);
      const dk = Math.floor((cs % 360000) / 6000);
      const kalan = cs % 6000;
      const tam = Math.floor(kalan / 100), kes = kalan % 100;
      return `${sa}:${String(dk).padStart(2, '0')}:${String(tam).padStart(2, '0')}${kes ? ',' + String(kes).padStart(2, '0').replace(/0$/, '') : ''}`;
    };
    const yaziyla = (sn) => {
      const cs = Math.round(sn * 100);
      const sa = Math.floor(cs / 360000);
      const dk = Math.floor((cs % 360000) / 6000);
      const s = (cs % 6000) / 100;
      const parca = [];
      if (sa) parca.push(`${h.fmt(sa, 0)} saat`);
      if (dk) parca.push(`${dk} dakika`);
      if (s || !parca.length) parca.push(`${h.fmt(s, 2)} saniye`);
      return parca.join(' ');
    };
    const a = coz(v.sure, 'Süre');
    if (v.islem === 'oran') {
      const b = coz(v.deger, 'İkinci süre');
      if (b === 0) h.err('İkinci süre sıfır olamaz; sıfıra bölme tanımsızdır.');
      const kat = a / b;
      const tam = Math.floor(kat + 1e-9);
      const kalan = Math.max(0, a - tam * b);
      return {
        rows: [
          ['Sonuç', h.fmt(kat, 4) + ' kat'],
          ['Tam bölüm', `${h.fmt(tam, 0)} kez`],
          ['Kalan süre', bicim(kalan)],
          ['Yüzde olarak', '%' + h.fmt(kat * 100, 2)],
          ['İşlem', `${bicim(a)} ÷ ${bicim(b)}`],
        ],
        note: 'İki süre birbirine bölündüğünde sonuç birimsiz bir orandır; "tam bölüm" ikinci sürenin birincinin içine kaç kez tam sığdığını gösterir.',
      };
    }
    const k = h.nonneg(v.deger, 'Sayı');
    if (v.islem === 'bol' && k === 0) h.err('Süre sıfıra bölünemez; sıfırdan büyük bir sayı yazın.');
    const sonuc = v.islem === 'bol' ? a / k : a * k;
    if (sonuc > 3.6e9) h.err('Sonuç çok büyük; daha küçük bir süre ya da çarpan deneyin.');
    return {
      rows: [
        ['Sonuç', bicim(sonuc)],
        ['Yazıyla', yaziyla(sonuc)],
        ['Toplam saniye', h.fmt(sonuc, 2) + ' sn'],
        ['Toplam dakika', h.fmt(sonuc / 60, 4) + ' dk'],
        ['Ondalık saat', h.fmt(sonuc / 3600, 4) + ' saat'],
        ['İşlem', `${bicim(a)} ${v.islem === 'bol' ? '÷' : '×'} ${h.fmt(k, 6)}`],
      ],
      note: 'Sonuç saniyenin yüzde birine yuvarlanır. Süre biçimi saat:dakika:saniye şeklindedir; saat kısmı 24\'ü aşabilir.',
    };
  }
