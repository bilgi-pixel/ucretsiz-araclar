// Ölçü Sayısından Şarkı Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const olcu = h.pos(v.olcu, 'Ölçü sayısı');
    const bpm = h.pos(v.bpm, 'Tempo');
    if (bpm < 10 || bpm > 1000) h.err('Tempo 10 ile 1000 BPM arasında olmalı; değeri kontrol edin.');
    const vurus = h.pos(v.vurus, 'Ölçüdeki vuruş sayısı');
    if (vurus > 64) h.err('Ölçüdeki vuruş sayısı 64\'ten büyük olamaz.');
    const toplamVurus = olcu * vurus;
    const sn = toplamVurus * 60 / bpm;
    const t = Math.round(sn);
    const saat = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
    const iki = (n) => String(n).padStart(2, '0');
    const sure = saat ? saat + ':' + iki(dk) + ':' + iki(s) : dk + ':' + iki(s);
    return {
      rows: [
        ['Süre', sure],
        ['Toplam saniye', h.fmt(sn, 2) + ' sn'],
        ['Toplam vuruş', h.fmt(toplamVurus, 2) + ' vuruş'],
        ['Bir ölçünün süresi', h.fmt(vurus * 60 / bpm, 3) + ' sn'],
        ['Dakikadaki ölçü sayısı', h.fmt(bpm / vurus, 2) + ' ölçü'],
      ],
      note: 'Süre = ölçü sayısı × ölçüdeki vuruş × 60 ÷ BPM. Tempo değişimleri, puandorglar ve ritardando hesaba katılmaz.',
    };
  }
