// Kitaplık Kapasitesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gen = h.pos(v.rafGenislik, 'Raf iç genişliği');
    const raf = h.posint(v.rafSayisi, 'Raf sayısı');
    const kal = h.pos(v.kalinlik, 'Ortalama kitap kalınlığı');
    const dol = h.pos(v.doluluk === '' ? '100' : v.doluluk, 'Rafın doldurulacak kısmı');
    if (dol > 100) h.err('"Rafın doldurulacak kısmı" 1 ile 100 arasında olmalı.');
    const kullan = gen * dol / 100;
    const rafBasi = Math.floor(kullan / kal + 1e-9);
    if (rafBasi < 1) h.err('Bu genişlikte bir rafa tek bir kitap bile sığmıyor; raf genişliğini ve kitap kalınlığını santimetre olarak yazdığınızdan emin olun.');
    const toplam = rafBasi * raf;
    const rows = [
      ['Toplam kitap kapasitesi', `${h.fmt(toplam, 0)} kitap`],
      ['Raf başına kitap', `${h.fmt(rafBasi, 0)} kitap`],
      ['Toplam raf uzunluğu', `${h.fmt(gen * raf / 100, 2)} m`],
      ['Kitap dizilecek uzunluk', `${h.fmt(kullan * raf / 100, 2)} m`],
    ];
    if (String(v.kitapAdet || '').trim() !== '') {
      const adet = h.posint(v.kitapAdet, 'Elinizdeki kitap sayısı');
      rows.push(['Kitaplarınız için gereken raf', `${h.fmt(Math.ceil(adet / rafBasi - 1e-9), 0)} raf`]);
      let durum;
      if (adet < toplam) durum = `Sığıyor; ${h.fmt(toplam - adet, 0)} kitaplık yer kalıyor`;
      else if (adet === toplam) durum = 'Tam sığıyor; boş yer kalmıyor';
      else durum = `Sığmıyor; ${h.fmt(adet - toplam, 0)} kitap açıkta kalıyor`;
      rows.push(['Durum', durum]);
    }
    return {
      rows,
      note: 'Kitapların dik ve tek sıra dizildiği varsayılır. Gerçek kapasite kitaplarınızın kalınlık dağılımına göre değişir; raf yüksekliği ve derinliği ile rafın taşıyabileceği ağırlık bu hesapta kontrol edilmez.',
    };
  }
