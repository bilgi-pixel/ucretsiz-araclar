// Satır Sırasını Ters Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    if (v.bos === 'at') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (!satirlar.length) h.err('Sırası ters çevrilecek satırları yazın.');
    if (satirlar.length > 500000) h.err('En fazla 500.000 satır işlenebilir; metni parçalara bölün.');
    const n = satirlar.length;
    const ters = [];
    for (let i = n - 1; i >= 0; i--) ters.push(v.numara === 'var' ? `${i + 1}. ${satirlar[i]}` : satirlar[i]);
    const kisalt = (s) => {
      if (s.trim() === '') return '(boş satır)';
      const d = Array.from(s);
      return d.length > 60 ? d.slice(0, 60).join('') + '…' : s;
    };
    return {
      rows: [
        ['Satır sayısı', h.fmt(n, 0)],
        ['Yeni ilk satır', kisalt(ters[0])],
        ['Yeni son satır', kisalt(ters[n - 1])],
      ],
      text: ters.join('\n'),
      note: 'Yalnızca satırların sırası değişir; satır içindeki harf ve kelime sırası aynı kalır. Metnin başındaki ve sonundaki boş satırlar atılır.',
    };
  }
