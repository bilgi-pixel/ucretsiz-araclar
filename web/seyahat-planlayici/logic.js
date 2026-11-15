// Seyahat Planlayıcı ve Bavul Listesi Oluşturma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const gidis = h.dateOrToday(v.gidis, 'Gidiş tarihi');
    const gun = h.posint(v.gun, 'Gün sayısı');
    if (gun > 21) h.err('Gün sayısı en fazla 21 olabilir; daha uzun seyahatleri iki bölüm hâlinde planlayın.');
    const yer = (v.yer || '').trim();
    if (yer.length > 30) h.err('Gidilecek yer en fazla 30 karakter olabilir.');
    const ek = h.lines(v.ek);
    if (ek.length > 15) h.err('En fazla 15 eşya ekleyebilirsiniz; kalanını listedeki boş satırlara elle yazın.');
    if (ek.some((s) => s.length > 30)) h.err('Eşya adları en fazla 30 karakter olabilir; uzun satırı kısaltın.');
    const planVar = v.icerik !== 'bavul', bavulVar = v.icerik !== 'plan';
    if (ek.length && !bavulVar) h.err('Kendi eşyalarınız yalnızca bavul listesine basılır. İçeriğe bavul listesini ekleyin ya da eşya alanını boşaltın.');
    const donus = h.gunEkle(gidis, gun - 1);
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12, tw = W - 2 * m;
    const pt = a5 ? 8 : 9.5, ust = m + 15, hh = a5 ? 6 : 7, ara = a5 ? 3 : 4;
    const tarih = (d) => `${h.fmtDate(d)} ${h.gunAdi(d)}`;
    const ustBilgi = (ops, ad, sag) => {
      ops.push(['yazi', ad, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', sag, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
    };
    const aralik = `${h.fmtDate(gidis)} – ${h.fmtDate(donus)}`;
    const sayfalar = [];
    if (planVar) {
      // 1) Özet sayfası
      const ops = [];
      ustBilgi(ops, 'Seyahat Planı', aralik);
      const fw = (tw - 6) / 2, fh = a5 ? 9 : 11;
      const ALAN = [['Nereye', yer], ['Kimlerle', ''], ['Gidiş', tarih(gidis)], ['Dönüş', tarih(donus)], ['Ulaşım (araç, sefer, saat)', ''], ['Bilet / rezervasyon no', ''], ['Konaklama', ''], ['Adres ve telefon', '']];
      ALAN.forEach(([ad, deger], i) => {
        const x = m + (i % 2) * (fw + 6), y = ust + Math.floor(i / 2) * fh;
        ops.push(['yazi', ad, x, y + 3, pt - 2, { ton: 0.35 }]);
        ops.push(['cizgi', x, y + fh - 1.5, x + fw, y + fh - 1.5, { kalinlik: 0.25, ton: 0.5 }]);
        if (deger) ops.push(['yazi', deger, x + 1, y + fh - 2.6, pt + 1, { kalin: true }]);
      });
      let y = ust + 4 * fh + ara + 1;
      const rh = a5 ? 6.5 : 7.5, kw = tw * 0.5, sw = tw * 0.25;
      const KALEM = ['Ulaşım', 'Konaklama', 'Yeme içme', 'Gezi ve giriş ücretleri', 'Alışveriş ve hediye', 'Diğer', 'Toplam'];
      ops.push(['kutu', m, y, tw, hh, { dolgu: 0.85, cizgi: 0.5 }]);
      ops.push(['yazi', 'Seyahat bütçesi', m + 2, y + hh - 2, pt, { kalin: true }]);
      ops.push(['yazi', 'Planlanan', m + kw + sw / 2, y + hh - 2, pt - 1, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Harcanan', m + kw + sw * 1.5, y + hh - 2, pt - 1, { kalin: true, hiza: 'orta' }]);
      const by = y;
      y += hh;
      KALEM.forEach((k, i) => {
        const son = i === KALEM.length - 1;
        ops.push(['kutu', m, y, tw, rh, son ? { dolgu: 0.93, cizgi: 0.5 } : { cizgi: 0.55 }]);
        ops.push(['yazi', k, m + 2, y + rh / 2 + pt * 0.12, pt, { kalin: son }]);
        y += rh;
      });
      for (const x of [m + kw, m + kw + sw]) ops.push(['cizgi', x, by, x, y, { kalinlik: 0.2, ton: 0.6 }]);
      y += ara + 1;
      ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Önemli bilgiler, adresler ve telefonlar', m + 2, y + 5.2, pt - 0.5, { kalin: true }]);
      for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
      sayfalar.push(ops);
      // 2) Gün gün plan sayfaları
      const D = a5 ? 4 : 5, bh = (H - m - ust - (D - 1) * ara) / D, sol = tw * 0.68, DILIM = ['Sabah', 'Öğle', 'Akşam'];
      for (let s0 = 0; s0 < gun; s0 += D) {
        const o = [];
        ustBilgi(o, 'Gün Gün Plan', yer || aralik);
        for (let j = 0; j < D && s0 + j < gun; j++) {
          const d = h.gunEkle(gidis, s0 + j), yb = ust + j * (bh + ara), dh = (bh - hh) / 3;
          o.push(['kutu', m, yb, tw, bh, { cizgi: 0.45 }]);
          o.push(['kutu', m, yb, tw, hh, { dolgu: 0.87, cizgi: 0.45 }]);
          o.push(['yazi', `${s0 + j + 1}. gün`, m + 2, yb + hh - 2, pt, { kalin: true }]);
          o.push(['yazi', `${d.getUTCDate()} ${h.ayAdi(d.getUTCMonth() + 1)} ${d.getUTCFullYear()} ${h.gunAdi(d)}`, W - m - 2, yb + hh - 2, pt - 0.5, { hiza: 'sag', ton: 0.25 }]);
          DILIM.forEach((ad, t) => {
            const yy = yb + hh + t * dh;
            if (t) o.push(['cizgi', m, yy, m + sol, yy, { kalinlik: 0.2, ton: 0.7 }]);
            o.push(['yazi', ad, m + 2, yy + 3.6, pt - 2, { ton: 0.4 }]);
            o.push(['cizgi', m + 2, yy + dh * 0.62, m + sol - 2, yy + dh * 0.62, { kalinlik: 0.2, ton: 0.82, kesik: true }]);
          });
          o.push(['cizgi', m + sol, yb + hh, m + sol, yb + bh, { kalinlik: 0.25, ton: 0.5 }]);
          o.push(['yazi', 'Harcamalar', m + sol + 2, yb + hh + 3.6, pt - 2, { ton: 0.4 }]);
          for (let yy = yb + hh + 10; yy < yb + bh - 1.5; yy += 7) o.push(['cizgi', m + sol + 2, yy, W - m - 2, yy, { kalinlik: 0.2, ton: 0.78 }]);
        }
        sayfalar.push(o);
      }
    }
    // 3) Bavul listesi
    let hazir = 0;
    if (bavulVar) {
      const TUR = {
        yaz: ['Yaz ve deniz', ['Mayo', 'Plaj havlusu', 'Güneş kremi', 'Güneş gözlüğü', 'Şapka', 'Terlik ya da sandalet']],
        kis: ['Kış ve kar', ['Mont ya da kaban', 'Bere ve eldiven', 'Atkı ya da boyunluk', 'Termal içlik', 'Bot', 'Dudak ve el kremi']],
        is: ['İş seyahati', ['Resmî kıyafet', 'Dizüstü bilgisayar ve şarjı', 'Kartvizit', 'Not defteri ve kalem', 'Sunum ve belgeler', 'Yaka kartı ya da davetiye']],
      }[v.tur];
      const B = [
        ['Belgeler ve para', ['Kimlik ya da pasaport', 'Bilet ve rezervasyon çıktıları', 'Banka kartı ve nakit', 'Ehliyet', 'Seyahat sigortası belgesi']],
        ['Giyim', ['İç çamaşırı', 'Çorap', 'Tişört ya da gömlek', 'Pantolon ya da etek', 'Pijama', 'Hırka ya da ceket', 'Yedek ayakkabı']],
        ['Kişisel bakım', ['Diş fırçası ve macun', 'Şampuan ve sabun', 'Deodorant', 'Tarak ya da fırça', 'Tıraş ya da makyaj malzemesi', 'Islak mendil ve peçete']],
        ['Elektronik', ['Telefon ve şarj aleti', 'Taşınabilir şarj cihazı', 'Kulaklık', 'Priz dönüştürücü']],
        ['Sağlık', ['Düzenli kullanılan ilaçlar', 'Yara bandı', 'Gözlük ya da lens malzemesi']],
      ];
      if (TUR) B.push(TUR);
      B.push(['Evden çıkmadan', ['Ocak, ütü ve fişler kontrol edildi', 'Pencereler ve kapılar kilitlendi', 'Çöp atıldı', 'Çiçekler sulandı', 'Anahtarlar yanımda']]);
      hazir = B.reduce((a, b) => a + b[1].length, 0) + ek.length;
      const kendi = ek.slice();
      while (kendi.length < Math.max(6, ek.length + 3)) kendi.push('');
      B.push(['Kendi eşyalarım', kendi]);
      const cw = (tw - 4) / 2, alt = H - m, kare = a5 ? 2.8 : 3.4;
      // Bölümleri iki sütuna akıtır; sığmazsa yeni sayfa açar
      const yerlestir = (ih) => {
        const ps = [];
        let ops, col, y;
        const yeniSayfa = () => { ops = []; ustBilgi(ops, 'Bavul Listesi', yer || aralik); ps.push(ops); col = 0; y = ust; };
        const yeniSutun = () => { if (col === 1) yeniSayfa(); else { col = 1; y = ust; } };
        yeniSayfa();
        for (const [ad, kalemler] of B) {
          if (y + hh + 1 + 2 * ih > alt) yeniSutun();
          ops.push(['kutu', m + col * (cw + 4), y, cw, hh, { dolgu: 0.87, cizgi: 0.5 }]);
          ops.push(['yazi', ad, m + col * (cw + 4) + 2, y + hh - 2, pt, { kalin: true }]);
          y += hh + 1;
          for (const kalem of kalemler) {
            if (y + ih > alt) yeniSutun();
            const x = m + col * (cw + 4);
            ops.push(['kutu', x + 1, y + (ih - kare) / 2, kare, kare, { cizgi: 0.4 }]);
            if (kalem) ops.push(['yazi', kalem, x + kare + 3, y + ih / 2 + pt * 0.12, pt - 0.5]);
            else ops.push(['cizgi', x + kare + 3, y + ih - 1.2, x + cw - 1, y + ih - 1.2, { kalinlik: 0.2, ton: 0.75 }]);
            y += ih;
          }
          y += 3;
        }
        return ps;
      };
      // Tek sayfaya sığan en ferah satır aralığını seç (8,5 mm → 5,8 mm)
      let ps = null;
      for (let i = 0; i < 10; i++) { ps = yerlestir(8.5 - i * 0.3); if (ps.length === 1) break; }
      for (const p of ps) sayfalar.push(p);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${sayfalar.length} sayfa`],
        ['Gidiş', tarih(gidis)],
        ['Dönüş', tarih(donus)],
        ['Süre', gun === 1 ? '1 gün (günübirlik)' : `${gun} gün ${gun - 1} gece`],
        ['Bavul listesi', bavulVar ? `${hazir} hazır kalem` : 'yok'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Bavul listesi genel bir hatırlatma listesidir; gideceğiniz yere, mevsime ve kişisel ihtiyaçlarınıza göre eksiltip çoğaltın.',
      pdf: { ad: 'seyahat-planlayici', baslik: yer ? `Seyahat Planı – ${yer}` : 'Seyahat Planı', boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  }
