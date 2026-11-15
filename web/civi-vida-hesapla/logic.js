// Vida ve Dübel Adedi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Bir sıranın uzunluğu') * 100;
    const sira = h.posint(String(v.sira ?? '').trim() === '' ? '1' : v.sira, 'Sıra sayısı');
    const aralik = h.pos(v.aralik, 'En fazla vida aralığı');
    const kenar = h.opt(v.kenar, 5, 'Uçlardan kenar payı');
    if (kenar < 0) h.err('"Uçlardan kenar payı" negatif olamaz.');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const acik = L - 2 * kenar;
    if (!(acik > 1e-9)) h.err('Kenar payları hattın tamamını kaplıyor; uzunluğu metre, kenar payını santimetre olarak kontrol edin.');
    const bolme = Math.max(1, Math.ceil(acik / aralik - 1e-9));
    const siraBasi = bolme + 1;
    const net = siraBasi * sira;
    const fireli = Math.ceil(net * (1 + fire / 100) - 1e-9);
    const rows = [
      ['Alınacak vida (fire dahil)', h.fmt(fireli, 0) + ' adet'],
      ['Net vida adedi', h.fmt(net, 0) + ' adet'],
      ['Sıra başına vida', h.fmt(siraBasi, 0) + ' adet'],
      ['Gerçekleşen vida aralığı', h.fmt(acik / bolme, 2) + ' cm'],
    ];
    if (v.dubel !== 'hayir') rows.push(['Alınacak dübel (fire dahil)', h.fmt(fireli, 0) + ' adet']);
    if (String(v.kutu ?? '').trim() !== '') {
      const k = h.posint(v.kutu, 'Kutudaki adet');
      rows.push(['Vida kutusu sayısı', h.fmt(Math.ceil(fireli / k - 1e-9), 0) + ' kutu']);
    }
    return {
      rows,
      note: 'Vidalar her sırada eşit aralıkla dizilir; gerçekleşen aralık yazdığınız en fazla aralığı aşmaz. Vida çapı, boyu ve dübel tipi seçimi bu hesabın dışındadır.',
    };
  }
