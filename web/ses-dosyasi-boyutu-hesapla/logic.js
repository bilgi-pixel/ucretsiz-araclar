// Ses Dosyası Boyutu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dk = h.opt(v.dakika, 0, 'Süre – dakika');
    const sn = h.opt(v.saniye, 0, 'Süre – saniye');
    if (dk < 0 || sn < 0) h.err('Süre negatif olamaz.');
    const t = dk * 60 + sn;
    if (!(t > 0)) h.err('Kayıt süresini dakika ve/veya saniye olarak yazın.');
    let bps;
    const rows = [];
    if (v.tur === 'bit') {
      bps = h.pos(v.bithizi, 'Bit hızı') * 1000;
    } else {
      const fs = h.pos(v.ornekleme, 'Örnekleme hızı');
      const b = h.posint(v.derinlik, 'Bit derinliği');
      const k = h.posint(v.kanal, 'Kanal sayısı');
      bps = fs * b * k;
    }
    const bayt = bps * t / 8;
    const topSn = Math.round(t * 100) / 100;
    const sa = Math.floor(topSn / 3600 + 1e-9);
    const d2 = Math.floor((topSn - sa * 3600) / 60 + 1e-9);
    const s2 = topSn - sa * 3600 - d2 * 60;
    rows.push(['Dosya boyutu', h.fmt(bayt / 1e6, 3) + ' MB']);
    rows.push(['İkili birimle', h.fmt(bayt / 1048576, 2) + ' MiB']);
    rows.push(['Bayt olarak', h.fmt(bayt, 0) + ' bayt']);
    rows.push(['Bit hızı', h.fmt(bps / 1000, 2) + ' kbps']);
    rows.push(['Dakika başına', h.fmt(bps * 60 / 8 / 1e6, 3) + ' MB']);
    rows.push(['Süre', (sa ? sa + ' sa ' : '') + d2 + ' dk ' + h.fmt(s2, 2) + ' sn']);
    return {
      rows,
      note: v.tur === 'bit'
        ? '1 MB = 1.000.000 bayt, 1 kbps = 1.000 bit/sn alınmıştır. Değişken bit hızlı (VBR) dosyalarda gerçek boyut ortalama bit hızına göre oynar; etiket ve kapak görseli ayrıca yer tutar.'
        : '1 MB = 1.000.000 bayt alınmıştır. WAV dosyasının küçük başlık bölümü (genellikle 44 bayt) hesaba katılmamıştır.',
    };
  }
