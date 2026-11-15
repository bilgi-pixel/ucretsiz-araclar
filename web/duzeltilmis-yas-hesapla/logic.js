// Prematüre Bebek Düzeltilmiş Yaş Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const hafta = h.int(v.hafta, 'Doğumdaki gebelik haftası');
    const ek = String(v.gun ?? '').trim() === '' ? 0 : h.int(v.gun, 'Ek gün');
    if (hafta < 22 || hafta > 40) h.err('"Doğumdaki gebelik haftası" 22 ile 40 arasında olmalı.');
    if (ek < 0 || ek > 6) h.err('"Ek gün" 0 ile 6 arasında olmalı.');
    const gebelikGun = hafta * 7 + ek;
    if (gebelikGun > 280) h.err('Gebelik süresi 40 haftayı geçiyor; bu durumda yaş düzeltmesi gerekmez.');
    const bugun = h.dateOrToday(v.bugun, 'Hesap tarihi');
    const takvimGun = h.gunFarki(dogum, bugun);
    if (takvimGun < 0) h.err('Hesap tarihi doğum tarihinden önce olamaz; tarihleri kontrol edin.');
    const erken = 280 - gebelikGun;
    const beklenen = h.gunEkle(dogum, erken);
    const duzGun = takvimGun - erken;

    const ayEkle = (d, n) => {
      const toplam = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(toplam / 12), m = toplam % 12;
      const son = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), son)));
    };
    const yas = (a, b) => {
      let ay = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
      if (ayEkle(a, ay).getTime() > b.getTime()) ay--;
      const g = h.gunFarki(ayEkle(a, ay), b);
      const p = [];
      if (ay >= 12) p.push(Math.floor(ay / 12) + ' yıl');
      if (ay % 12) p.push((ay % 12) + ' ay');
      if (g || !p.length) p.push(g + ' gün');
      return p.join(' ');
    };
    const hg = (n) => `${Math.floor(n / 7)} hafta ${n % 7} gün`;

    const rows = [];
    if (duzGun >= 0) {
      rows.push(['Düzeltilmiş yaş', yas(beklenen, bugun)]);
      rows.push(['Düzeltilmiş yaş (hafta)', hg(duzGun)]);
    } else {
      rows.push(['Düzeltilmiş yaş', `Beklenen doğum tarihine ${-duzGun} gün var`]);
      rows.push(['Gebelik haftası karşılığı', hg(280 + duzGun)]);
    }
    rows.push(['Takvim (kronolojik) yaşı', yas(dogum, bugun)]);
    rows.push(['Takvim yaşı (hafta)', hg(takvimGun)]);
    rows.push(['Erken doğum süresi', `${hg(erken)} (${erken} gün)`]);
    rows.push(['Beklenen doğum tarihi', h.fmtDate(beklenen)]);
    let note = 'Düzeltilmiş yaş = takvim yaşı − (40 hafta − doğumdaki gebelik haftası). Gelişim basamakları ve büyüme eğrileri genellikle iki yaşına kadar düzeltilmiş yaşa göre izlenir.';
    if (gebelikGun >= 259) note = '37. haftayı tamamlayan doğumlar zamanında doğum sayılır; bu durumda yaş düzeltmesi genellikle uygulanmaz. ' + note;
    return { rows, note };
  }
