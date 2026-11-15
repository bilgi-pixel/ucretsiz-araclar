// CIDR Aralığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const t = String(v.cidr ?? '').trim().replace(/\s+/g, '');
    if (t === '') h.err('"CIDR bloğu" alanını doldurun (örn. 192.168.1.0/24).');
    const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/.exec(t);
    if (!m) {
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(t)) h.err('Önek uzunluğu eksik. Adresin sonuna eğik çizgiyle öneki ekleyin (örn. ' + t + '/24).');
      h.err('CIDR bloğunu "a.b.c.d/önek" biçiminde yazın (örn. 10.0.0.0/8). Yalnızca IPv4 desteklenir.');
    }
    const okt = [m[1], m[2], m[3], m[4]].map(Number);
    if (okt.some((o) => o > 255)) h.err('IPv4 adresindeki her bölüm 0 ile 255 arasında olmalı.');
    const p = Number(m[5]);
    if (p > 32) h.err('Önek uzunluğu 0 ile 32 arasında olmalı.');
    const ip = ((okt[0] * 16777216) + (okt[1] * 65536) + (okt[2] * 256) + okt[3]) >>> 0;
    const mask = p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0;
    const wild = (~mask) >>> 0;
    const ag = (ip & mask) >>> 0;
    const yayin = (ag | wild) >>> 0;
    const yaz = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
    const toplam = Math.pow(2, 32 - p);
    let ilk, son, kullan, not;
    if (p === 32) { ilk = ag; son = ag; kullan = 1; not = '/32 tek bir adresi (tek cihazı) gösterir; ağ ve yayın adresi ayrımı yoktur.'; }
    else if (p === 31) { ilk = ag; son = yayin; kullan = 2; not = '/31 blokları noktadan noktaya bağlantılarda kullanılır; iki adres de cihaza verilebilir (RFC 3021).'; }
    else { ilk = (ag + 1) >>> 0; son = (yayin - 1) >>> 0; kullan = toplam - 2; not = 'Kullanılabilir adres sayısı, ağ ve yayın adresi düşülerek bulunur (toplam − 2).'; }
    if (ip !== ag) not += ' Yazdığınız adres bloğun başlangıcı değildi; blok ' + yaz(ag) + '/' + p + ' olarak normalleştirildi.';
    return {
      rows: [
        ['Adres aralığı', yaz(ag) + ' – ' + yaz(yayin)],
        ['Toplam adres', h.fmt(toplam, 0)],
        ['Kullanılabilir cihaz adresi', h.fmt(kullan, 0)],
        ['Ağ adresi', yaz(ag)],
        ['Yayın adresi', yaz(yayin)],
        ['İlk kullanılabilir adres', yaz(ilk)],
        ['Son kullanılabilir adres', yaz(son)],
        ['Alt ağ maskesi', yaz(mask)],
        ['Joker maske', yaz(wild)],
        ['Normalleştirilmiş blok', yaz(ag) + '/' + p],
      ],
      note: not,
    };
  }
