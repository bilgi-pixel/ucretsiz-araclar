// 30 Günlük Hedef Çizelgesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tarihli = v.tarihli !== 'hayir';
    const ilk = tarihli ? h.dateOrToday(v.baslangic, 'Başlangıç tarihi') : null;
    if (ilk && (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200)) h.err('Başlangıç tarihi 1900 ile 2200 yılları arasında olmalı.');
    const hedef = (v.hedef || '').trim();
    if (hedef.length > 60) h.err('Hedef en fazla 60 karakter olabilir; kısa ve tek cümlelik bir hedef yazın.');
    const n = h.posint(v.donem, 'Dönem (sayfa) sayısı');
    if (n > 12) h.err('Dönem sayısı en fazla 12 olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const AYK = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const GK = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const sayfalar = [];
    for (let s = 0; s < n; s++) {
      const ops = [], b = tarihli ? h.gunEkle(ilk, s * 30) : null;
      ops.push(['yazi', '30 Günlük Hedef', m, m + 7 * k, f(18), { kalin: true }]);
      if (tarihli) ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 29))}`, W - m, m + 7 * k, f(10), { hiza: 'sag', ton: 0.35 }]);
      else ops.push(['yazi', 'Başlangıç: ____ / ____ / ________', W - m, m + 7 * k, f(9), { hiza: 'sag', ton: 0.4 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Hedef kutusu
      const hy = m + 14 * k, hyuk = 15 * k, tw = W - 2 * m;
      ops.push(['kutu', m, hy, tw, hyuk, { dolgu: 0.95, cizgi: 0.5 }]);
      ops.push(['yazi', 'Hedefim', m + 2.5 * k, hy + 5 * k, f(7.5), { kalin: true, ton: 0.4 }]);
      if (hedef) ops.push(['yazi', hedef, m + 2.5 * k, hy + 11.5 * k, f(11.5), { kalin: true }]);
      else ops.push(['cizgi', m + 2.5 * k, hy + 12 * k, W - m - 2.5 * k, hy + 12 * k, { kalinlik: 0.25, ton: 0.55 }]);
      // 5 × 6 gün kutuları
      const bosluk = 4 * k, altYuk = 46 * k, gy = hy + hyuk + bosluk, gAlt = H - m - altYuk - bosluk;
      const cw = tw / 5, ch = (gAlt - gy) / 6;
      for (let d = 0; d < 30; d++) {
        const x = m + (d % 5) * cw, y = gy + Math.floor(d / 5) * ch, durak = (d + 1) % 10 === 0;
        ops.push(['kutu', x, y, cw, ch, durak ? { dolgu: 0.88, cizgi: 0.45 } : { cizgi: 0.45 }]);
        ops.push(['yazi', String(d + 1), x + 2.2 * k, y + 8 * k, f(16), { kalin: true }]);
        if (tarihli) {
          const t = h.gunEkle(b, d);
          ops.push(['yazi', `${t.getUTCDate()} ${AYK[t.getUTCMonth()]}`, x + cw - 2.2 * k, y + 5 * k, f(7.5), { hiza: 'sag', ton: 0.3 }]);
          ops.push(['yazi', GK[t.getUTCDay()], x + cw - 2.2 * k, y + 8.6 * k, f(6.5), { hiza: 'sag', ton: 0.5 }]);
        }
        ops.push(['daire', x + cw - 6 * k, y + ch - 6 * k, 3.4 * k, { cizgi: 0.35, kalinlik: 0.35, dolgu: 1 }]);
        if (durak) ops.push(['yazi', 'Ara durak', x + 2.2 * k, y + ch - 3 * k, f(6.5), { ton: 0.35 }]);
        else ops.push(['cizgi', x + 2.2 * k, y + ch - 3.5 * k, x + cw - 12 * k, y + ch - 3.5 * k, { kalinlik: 0.2, ton: 0.78 }]);
      }
      // Alt yazı alanları
      const ay = H - m - altYuk, aw = (tw - bosluk) / 2;
      const kutu = (x, ad) => {
        ops.push(['kutu', x, ay, aw, altYuk, { cizgi: 0.5 }]);
        ops.push(['yazi', ad, x + 2.5 * k, ay + 5.5 * k, f(8.5), { kalin: true }]);
        for (let yy = ay + 14 * k; yy < ay + altYuk - 2 * k; yy += 8 * k) ops.push(['cizgi', x + 2.5 * k, yy, x + aw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      };
      kutu(m, 'Bunu neden istiyorum?');
      kutu(m + aw + bosluk, 'Aksadığım gün ne yapacağım?');
      sayfalar.push(ops);
    }
    const rows = [['Sayfa sayısı', `${n} sayfa`], ['Toplam gün', `${n * 30} gün`]];
    if (tarihli) {
      const g = (i) => { const t = h.gunEkle(ilk, i - 1); return `${h.fmtDate(t)} ${h.gunAdi(t)}`; };
      rows.push(['1. gün', g(1)], ['10. gün', g(10)], ['20. gün', g(20)], ['30. gün', g(30)]);
      if (n > 1) rows.push(['Son gün', g(n * 30)]);
    } else rows.push(['Tarih', 'Elle yazılacak']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Kişisel takip sayfasıdır; tıbbi tavsiye ya da program değildir. Yazdırırken yönü dikey, ölçeği %100 seçin.',
      pdf: { ad: 'otuz-gunluk-hedef-cizelgesi', baslik: hedef || '30 Günlük Hedef', boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
