// Okuma Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const metin = String(v.metin ?? '');
    let kelime;
    if (metin.trim() !== '') {
      kelime = metin.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
      if (kelime === 0) h.err('Metinde sayılabilecek kelime bulunamadı. Harf ya da rakam içeren bir metin yapıştırın.');
    } else if (String(v.kelime ?? '').trim() !== '') {
      kelime = h.posint(v.kelime, 'Kelime sayısı');
    } else h.err('Bir metin yapıştırın ya da "Kelime sayısı" alanını doldurun.');
    const hiz = String(v.ozelHiz ?? '').trim() !== '' ? h.pos(v.ozelHiz, 'Kendi hızınız') : Number(v.hiz) || 200;
    if (hiz > 2000) h.err('"Kendi hızınız" en fazla 2000 kelime/dk olabilir.');
    const gorsel = String(v.gorsel ?? '').trim() === '' ? 0 : h.int(v.gorsel, 'Görsel sayısı');
    if (gorsel < 0) h.err('"Görsel sayısı" negatif olamaz.');
    const ek = gorsel * 10;
    const sure = (sn) => {
      const t = Math.round(sn);
      if (t < 60) return `${t} sn`;
      const sa = Math.floor(t / 3600), dk = Math.floor((t % 3600) / 60), s = t % 60;
      return [sa ? `${sa} sa` : '', dk ? `${dk} dk` : '', s ? `${s} sn` : ''].filter(Boolean).join(' ');
    };
    const sn = (kelime / hiz) * 60 + ek;
    const dkYukari = Math.max(1, Math.ceil(sn / 60 - 1e-9));
    const etiket = dkYukari < 60 ? `${dkYukari} dk okuma` : `${Math.floor(dkYukari / 60)} sa${dkYukari % 60 ? ` ${dkYukari % 60} dk` : ''} okuma`;
    return {
      rows: [
        ['Okuma süresi', sure(sn)],
        ['Yuvarlanmış süre', etiket],
        ['Kelime sayısı', h.fmt(kelime, 0)],
        ['Okuma hızı', h.fmt(hiz, 1) + ' kelime/dk'],
        ['Yavaş okuyucu (150 kelime/dk)', sure((kelime / 150) * 60 + ek)],
        ['Hızlı okuyucu (250 kelime/dk)', sure((kelime / 250) * 60 + ek)],
      ],
      note: 'Süre bir tahmindir; metnin zorluğuna, okuyucunun konuya aşinalığına ve dikkatine göre değişir.' + (gorsel ? ` ${gorsel} görsel için ${ek} saniye eklendi.` : ''),
    };
  }
