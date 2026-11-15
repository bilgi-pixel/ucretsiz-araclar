// İç Verim Oranı (IRR) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.pos(v.yatirim, 'İlk yatırım tutarı');
    const cf = h.nums(v.akislar, 'Dönemlik nakit akışları');
    if (cf.length > 120) h.err('En fazla 120 dönem girebilirsiniz; akışları daha uzun dönemlerde toplayın.');
    if (!cf.some((x) => x > 0)) h.err('En az bir dönemde pozitif nakit girişi olmalı; aksi halde iç verim oranı tanımlanamaz.');
    const isk = String(v.iskonto ?? '').trim() === '' ? null : h.num(v.iskonto, 'İskonto oranı');
    if (isk !== null && isk <= -100) h.err('"İskonto oranı" %-100\'den büyük olmalı.');
    const nbd = (r) => {
      let s = -y;
      for (let i = 0; i < cf.length; i++) s += cf[i] / Math.pow(1 + r, i + 1);
      return s;
    };
    const izgara = [];
    for (let i = 0; i <= 398; i++) izgara.push(-0.99 + i * 0.005);
    for (let r = 1.05; r <= 1000; r *= 1.05) izgara.push(r);
    const kokler = [];
    for (let i = 0; i < izgara.length - 1; i++) {
      let a = izgara[i], b = izgara[i + 1];
      let fa = nbd(a), fb = nbd(b);
      if (!Number.isFinite(fa) || !Number.isFinite(fb) || fa === 0) continue;
      if (fb === 0) { kokler.push(b); continue; }
      if (fa * fb > 0) continue;
      for (let k = 0; k < 100; k++) {
        const m = (a + b) / 2, fm = nbd(m);
        if (fm === 0) { a = b = m; break; }
        if (fa * fm < 0) { b = m; fb = fm; } else { a = m; fa = fm; }
      }
      kokler.push((a + b) / 2);
    }
    if (!kokler.length) h.err('Bu nakit akışları için %-99 ile %100.000 arasında bir iç verim oranı bulunamadı. Tutarları ve işaretleri kontrol edin.');
    kokler.sort((p, q) => Math.abs(p) - Math.abs(q));
    const irr = kokler[0];
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const toplam = cf.reduce((s, x) => s + x, 0);
    const ad = v.donem === 'ay' ? 'aylık' : 'yıllık';
    const rows = [
      ['İç verim oranı (IRR)', yuzde(irr * 100) + ' (' + ad + ')'],
    ];
    if (v.donem === 'ay') rows.push(['Yıllık bileşik karşılığı', yuzde((Math.pow(1 + irr, 12) - 1) * 100)]);
    rows.push(['Toplam nakit akışı', h.para(toplam)]);
    rows.push(['Net nakit fazlası', h.para(toplam - y)]);
    rows.push(['Dönem sayısı', String(cf.length)]);
    if (isk !== null) {
      const n = nbd(isk / 100);
      rows.push(['Net bugünkü değer', h.para(n)]);
      rows.push(['Değerlendirme', Math.abs(irr * 100 - isk) < 0.005 ? 'IRR iskonto oranına eşit: proje başabaş' : irr * 100 > isk ? 'IRR iskonto oranının üzerinde' : 'IRR iskonto oranının altında']);
    }
    let isaret = 0, onceki = -1;
    for (const x of cf) { if (x === 0) continue; const s = x > 0 ? 1 : -1; if (s !== onceki) isaret++; onceki = s; }
    let note = 'Akışların her dönemin sonunda gerçekleştiği varsayılır. Oran, yazdığınız dönem uzunluğu içindir.';
    if (isaret > 1) note = 'Nakit akışları birden fazla kez işaret değiştiriyor; bu durumda birden çok iç verim oranı olabilir' + (kokler.length > 1 ? ' (bulunan kök sayısı: ' + kokler.length + ')' : '') + '. Sıfıra en yakın oran gösterilmiştir; kararı NBD ile doğrulayın.';
    return { rows, note };
  }
