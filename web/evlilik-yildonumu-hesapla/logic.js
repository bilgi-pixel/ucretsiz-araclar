// Evlilik Yıl Dönümü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AD = { 1: 'Kâğıt', 2: 'Pamuk', 3: 'Deri', 4: 'Çiçek', 5: 'Ahşap', 6: 'Demir', 7: 'Yün', 8: 'Bronz', 9: 'Çömlek', 10: 'Kalay', 11: 'Çelik', 12: 'İpek', 13: 'Dantel', 14: 'Fildişi', 15: 'Kristal', 20: 'Porselen', 25: 'Gümüş', 30: 'İnci', 35: 'Mercan', 40: 'Yakut', 45: 'Safir', 50: 'Altın', 55: 'Zümrüt', 60: 'Elmas', 70: 'Platin' };
    const a = h.date(v.evlilik, 'Evlilik tarihi');
    const b = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (b.getTime() < a.getTime()) h.err('Evlilik tarihi, hesap yapılan tarihten sonra olamaz. Tarihleri kontrol edin.');
    const ay = a.getUTCFullYear(), am = a.getUTCMonth(), ad = a.getUTCDate();
    const aydakiGun = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    // Geçen süre: yıl, ay, gün
    const ekle = (n) => {
      const t = ay * 12 + am + n, y = Math.floor(t / 12), m = t % 12;
      return new Date(Date.UTC(y, m, Math.min(ad, aydakiGun(y, m))));
    };
    let n = (b.getUTCFullYear() - ay) * 12 + (b.getUTCMonth() - am);
    if (ekle(n).getTime() > b.getTime()) n--;
    const yil = Math.floor(n / 12), ayF = n % 12, gun = h.gunFarki(ekle(n), b);
    const parca = [];
    if (yil) parca.push(yil + ' yıl');
    if (ayF) parca.push(ayF + ' ay');
    if (gun) parca.push(gun + ' gün');
    // Y yılındaki yıl dönümü (29 Şubat için artık olmayan yıllarda 28 Şubat)
    const donum = (y) => new Date(Date.UTC(y, am, Math.min(ad, aydakiGun(y, am))));
    let y = Math.max(ay + 1, b.getUTCFullYear());
    if (donum(y).getTime() < b.getTime()) y++;
    const d = donum(y);
    const kac = y - ay;
    const kalan = h.gunFarki(b, d);
    return {
      rows: [
        ['Evlilik süresi', parca.length ? parca.join(' ') : '0 gün'],
        ['Toplam gün', h.fmt(h.gunFarki(a, b), 0) + ' gün'],
        ['Sıradaki yıl dönümü', kac + '. yıl dönümü'],
        ['Yıl dönümü tarihi', h.fmtDate(d) + ' ' + h.gunAdi(d)],
        ['Kalan süre', kalan === 0 ? 'Bugün' : h.fmt(kalan, 0) + ' gün'],
        ['Geleneksel adı', AD[kac] ? AD[kac] + ' yıl dönümü' : 'Bu yıl için yaygın bir ad yok'],
        ['Evlendiğiniz gün', h.fmtDate(a) + ' ' + h.gunAdi(a)],
      ],
      note: ad === 29 && am === 1 ? '29 Şubat\'ta evlenenler için artık olmayan yıllarda yıl dönümü 28 Şubat kabul edilmiştir.' : 'Geleneksel adlar ülkeden ülkeye değişir; burada yaygın listelerden biri kullanılmıştır.',
    };
  }
