// Sınav Takvimi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    const baslik = (v.baslik || '').trim() || 'Sınav Takvimi';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    const sat = h.lines(v.sinavlar);
    if (!sat.length) h.err('En az bir sınav yazın. Örnek satır: 18.11.2026 10:30 Matematik');
    if (sat.length > 30) h.err('En fazla 30 sınav yazabilirsiniz; listeyi dönemlere bölüp aracı iki kez çalıştırın.');
    const S = sat.map((s, i) => {
      const p = /^(\S+)\s+(?:(\d{1,2}):(\d{2})\s+)?(.+)$/.exec(s);
      if (!p) h.err(`${i + 1}. satır anlaşılamadı. Önce tarihi, sonra ders adını yazın (örn. 18.11.2026 Matematik).`);
      const d = h.date(p[1], `${i + 1}. satırdaki tarih`);
      let saat = '';
      if (p[2] !== undefined) {
        if (+p[2] > 23 || +p[3] > 59) h.err(`${i + 1}. satırdaki saat geçersiz; 00:00 ile 23:59 arasında yazın.`);
        saat = `${p[2].padStart(2, '0')}:${p[3]}`;
      }
      const ad = p[4].trim();
      if (ad.length > 28) h.err(`${i + 1}. satırdaki ders adı 28 karakterden uzun; kısaltın.`);
      return { d, saat, ad, i };
    });
    S.sort((a, b) => a.d - b.d || (a.saat || '99').localeCompare(b.saat || '99') || a.i - b.i);
    const ilk = S[0], son = S[S.length - 1];
    const aySay = (son.d.getUTCFullYear() - ilk.d.getUTCFullYear()) * 12 + son.d.getUTCMonth() - ilk.d.getUTCMonth() + 1;
    const listeVar = v.gorunum !== 'takvim', takvimVar = v.gorunum !== 'liste';
    if (takvimVar && aySay > 12) h.err('Aylık takvim en fazla 12 aylık bir dönemi kapsayabilir. Sınavları dönemlere bölün ya da "Yalnızca sınav listesi" seçin.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12, tw = W - 2 * m;
    const pt = a5 ? 7.5 : 9.5, ust = m + 15, hh = a5 ? 6 : 7;
    const kalan = (d) => { const f = h.gunFarki(bugun, d); return f > 0 ? `${f} gün` : f === 0 ? 'bugün' : 'geçti'; };
    const ustBilgi = (ops, sag) => {
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    };
    const sayfalar = [];
    // 1) Sınav listesi
    if (listeVar) {
      const rh = a5 ? 6.8 : 8, sig = Math.floor((H - m - ust - hh) / rh);
      const ORAN = [0.15, 0.13, 0.09, 0.34, 0.12, 0.17], AD = ['Tarih', 'Gün', 'Saat', 'Ders / sınav', 'Kalan', 'Not'];
      const xs = []; ORAN.reduce((x, o) => { xs.push(x); return x + o * tw; }, m);
      for (let s0 = 0; s0 < S.length; s0 += sig) {
        const ops = [], parca = S.slice(s0, s0 + sig);
        ustBilgi(ops, `Düzenlenme: ${h.fmtDate(bugun)}`);
        ops.push(['kutu', m, ust, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
        AD.forEach((a, j) => ops.push(['yazi', a, xs[j] + 1.5, ust + hh - 2, pt, { kalin: true }]));
        let y = ust + hh;
        parca.forEach((s, r) => {
          const gecti = h.gunFarki(bugun, s.d) < 0, ton = gecti ? 0.5 : 0;
          ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.96, cizgi: 0.55 } : { cizgi: 0.55 }]);
          const yy = y + rh / 2 + pt * 0.12;
          ops.push(['yazi', h.fmtDate(s.d), xs[0] + 1.5, yy, pt, { ton }]);
          ops.push(['yazi', h.gunAdi(s.d), xs[1] + 1.5, yy, pt, { ton }]);
          if (s.saat) ops.push(['yazi', s.saat, xs[2] + 1.5, yy, pt, { ton }]);
          ops.push(['yazi', s.ad, xs[3] + 1.5, yy, pt, { kalin: !gecti, ton }]);
          ops.push(['yazi', kalan(s.d), xs[4] + 1.5, yy, pt, { ton }]);
          y += rh;
        });
        for (let j = 1; j < xs.length; j++) ops.push(['cizgi', xs[j], ust, xs[j], y, { kalinlik: 0.2, ton: 0.7 }]);
        if (H - m - y - 5 >= 18) {
          y += 5;
          ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
          ops.push(['yazi', 'Konular ve çalışma notları', m + 2, y + 5.2, pt, { kalin: true }]);
          for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
        }
        sayfalar.push(ops);
      }
    }
    // 2) Aylık takvim sayfaları
    if (takvimVar) {
      const KISA = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], cw = tw / 7;
      const ept = a5 ? 5.5 : 7, sinir = Math.floor((cw - 2) / (ept * 0.19)), lh = ept * 0.42;
      for (let i = 0; i < aySay; i++) {
        const y0 = ilk.d.getUTCFullYear() + Math.floor((ilk.d.getUTCMonth() + i) / 12), a0 = (ilk.d.getUTCMonth() + i) % 12;
        const bir = new Date(Date.UTC(y0, a0, 1)), kayma = (bir.getUTCDay() + 6) % 7;
        const gunSay = new Date(Date.UTC(y0, a0 + 1, 0)).getUTCDate(), haftaSay = Math.ceil((kayma + gunSay) / 7);
        const ch = Math.min(a5 ? 30 : 42, (H - m - ust - hh) / haftaSay);
        const ops = [];
        ustBilgi(ops, `${h.ayAdi(a0 + 1)} ${y0}`);
        for (let g = 0; g < 7; g++) {
          ops.push(['kutu', m + g * cw, ust, cw, hh, { dolgu: g >= 5 ? 0.8 : 0.86, cizgi: 0.5 }]);
          ops.push(['yazi', KISA[g], m + g * cw + cw / 2, ust + hh - 2, pt, { kalin: true, hiza: 'orta' }]);
        }
        for (let c = 0; c < haftaSay * 7; c++) {
          const x = m + (c % 7) * cw, y = ust + hh + Math.floor(c / 7) * ch, gun = c - kayma + 1;
          if (gun < 1 || gun > gunSay) { ops.push(['kutu', x, y, cw, ch, { dolgu: 0.95, cizgi: 0.6 }]); continue; }
          const t = Date.UTC(y0, a0, gun), o = S.filter((s) => s.d.getTime() === t);
          ops.push(['kutu', x, y, cw, ch, o.length ? { dolgu: 0.88, cizgi: 0.3, kalinlik: 0.5 } : { cizgi: 0.6 }]);
          ops.push(['yazi', String(gun), x + 1.5, y + (a5 ? 4 : 5), a5 ? 8 : 10, { kalin: o.length > 0, ton: o.length ? 0 : 0.35 }]);
          if (t === bugun.getTime()) ops.push(['yazi', 'bugün', x + cw - 1.5, y + (a5 ? 4 : 5), ept, { hiza: 'sag', ton: 0.35 }]);
          const sig = Math.max(1, Math.floor((ch - (a5 ? 6 : 7.5)) / lh));
          o.slice(0, o.length > sig ? sig - 1 : sig).forEach((s, j) => {
            let yazi = (s.saat ? s.saat + ' ' : '') + s.ad;
            if (yazi.length > sinir) yazi = yazi.slice(0, sinir - 1) + '.';
            ops.push(['yazi', yazi, x + 1.2, y + (a5 ? 6 : 7.5) + (j + 0.8) * lh, ept, { kalin: true }]);
          });
          if (o.length > sig) ops.push(['yazi', `+${o.length - sig + 1} sınav daha`, x + 1.2, y + (a5 ? 6 : 7.5) + (sig - 0.2) * lh, ept, { ton: 0.3 }]);
        }
        sayfalar.push(ops);
      }
    }
    const siradaki = S.find((s) => h.gunFarki(bugun, s.d) >= 0);
    const sf = siradaki ? h.gunFarki(bugun, siradaki.d) : 0;
    const tanit = (s) => `${h.fmtDate(s.d)} ${h.gunAdi(s.d)} – ${s.ad}`;
    return {
      rows: [
        ['Sınav sayısı', `${S.length} sınav`],
        ['Sıradaki sınav', siradaki ? `${siradaki.ad} (${sf === 0 ? 'bugün' : sf + ' gün sonra'})` : 'Tüm sınavlar geçmiş'],
        ['İlk sınav', tanit(ilk)],
        ['Son sınav', tanit(son)],
        ['Sınav dönemi', `${h.gunFarki(ilk.d, son.d) + 1} gün`],
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
      ],
      note: `Kalan gün sayıları ${h.fmtDate(bugun)} tarihine göre hesaplanmıştır; sınav günü sayılır, bugün sayılmaz.`,
      pdf: { ad: 'sinav-takvimi-olustur', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
