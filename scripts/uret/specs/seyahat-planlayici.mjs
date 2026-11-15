export default {
  slug: 'seyahat-planlayici',
  title: 'Seyahat Planlayıcı ve Bavul Listesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Seyahat Planlayıcı ve Bavul Listesi Oluştur – Yazdırılabilir PDF',
  description: 'Tarihleri yazılı gün gün seyahat planı, bütçe tablosu ve onay kutulu bavul listesini PDF olarak oluşturun. Yaz, kış ya da iş seyahatine göre hazır eşya listesi.',
  card: 'Gün gün gezi planı, seyahat bütçesi ve onay kutulu bavul listesini seyahat türünüze göre tek PDF dosyasında hazırlayın.',
  category: 'planlama',
  pdf: true,
  keywords: ['seyahat planlayıcı', 'bavul listesi', 'tatil hazırlık listesi', 'seyahat planı şablonu', 'valiz listesi pdf', 'gezi planı çizelgesi', 'tatil çantası listesi', 'yazdırılabilir seyahat planı'],
  lead: 'Yola çıkmadan önce her şeyi tek dosyada toplayın: seyahatin özet sayfası, tarihleri hazır yazılmış <strong>gün gün gezi planı</strong> ve seyahat türünüze göre hazırlanmış onay kutulu <strong>bavul listesi</strong>. Gidiş tarihini ve gün sayısını girmeniz yeterlidir.',
  button: 'Seyahat planını oluştur',
  inputs: [
    { id: 'gidis', label: 'Gidiş tarihi', type: 'date', hint: 'Boş bırakırsanız bugünün tarihi kullanılır.' },
    { id: 'gun', label: 'Gün sayısı', type: 'number', value: '5', hint: '1 ile 21 arasında; gidiş ve dönüş günleri dâhil.' },
    { id: 'icerik', label: 'PDF içeriği', type: 'select', options: [['ikisi', 'Seyahat planı ve bavul listesi'], ['plan', 'Yalnızca seyahat planı'], ['bavul', 'Yalnızca bavul listesi']] },
    { id: 'tur', label: 'Seyahat türü (bavul listesi için)', type: 'select', options: [['genel', 'Genel'], ['yaz', 'Yaz ve deniz tatili'], ['kis', 'Kış ve kar tatili'], ['is', 'İş seyahati']] },
    { id: 'yer', label: 'Gidilecek yer (isteğe bağlı)', type: 'text', placeholder: 'Örn. Kapadokya', hint: 'En fazla 30 karakter; özet sayfasına yazılır.' },
    { id: 'ek', label: 'Kendi eşyalarınız (isteğe bağlı)', type: 'textarea', placeholder: 'Fotoğraf makinesi\nKitap\nOyun kartları', hint: 'Her satıra bir eşya; en fazla 15 satır, en fazla 30 karakter. Bavul listesinin son bölümüne eklenir.', wide: true },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { gidis: '2026-11-18', gun: '5' }, out: { 'Sayfa sayısı': '3 sayfa', 'Gidiş': '18.11.2026 Çarşamba', 'Dönüş': '22.11.2026 Pazar', 'Süre': '5 gün 4 gece', 'Bavul listesi': '30 hazır kalem', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 3 },
    { in: { gidis: '2027-01-01', gun: '10', tur: 'kis', boyut: 'a5', yer: 'Palandöken', ek: 'Kayak gözlüğü\nTermos' }, out: { 'Sayfa sayısı': '5 sayfa', 'Gidiş': '01.01.2027 Cuma', 'Dönüş': '10.01.2027 Pazar', 'Süre': '10 gün 9 gece', 'Bavul listesi': '38 hazır kalem' }, pdfSayfa: 5 },
    { in: { gidis: '2028-02-27', gun: '3', tur: 'yaz', icerik: 'bavul' }, out: { 'Sayfa sayısı': '1 sayfa', 'Dönüş': '29.02.2028 Salı', 'Süre': '3 gün 2 gece', 'Bavul listesi': '36 hazır kalem' }, pdfSayfa: 1 },
    { in: { gidis: '2026-11-16', gun: '21', icerik: 'plan' }, out: { 'Sayfa sayısı': '6 sayfa', 'Gidiş': '16.11.2026 Pazartesi', 'Dönüş': '06.12.2026 Pazar', 'Süre': '21 gün 20 gece', 'Bavul listesi': 'yok' }, pdfSayfa: 6 },
    { in: { gidis: '2026-11-21', gun: '1', yer: 'Mardin' }, out: { 'Gidiş': '21.11.2026 Cumartesi', 'Dönüş': '21.11.2026 Cumartesi', 'Süre': '1 gün (günübirlik)' }, pdfSayfa: 3 },
    { in: { gidis: '2026-11-18', gun: '4', tur: 'is', icerik: 'bavul', boyut: 'a5', ek: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15' }, out: { 'Sayfa sayısı': '2 sayfa', 'Dönüş': '21.11.2026 Cumartesi', 'Bavul listesi': '51 hazır kalem' }, pdfSayfa: 2 },
    { in: { gidis: '2026-11-18', gun: '22' }, error: true },
    { in: { gidis: '2026-11-18', gun: '0' }, error: true },
    { in: { gidis: '2026-11-18', gun: '3', icerik: 'plan', ek: 'Fotoğraf makinesi' }, error: true },
    { in: { gidis: '2026-11-18', gun: '3', yer: 'Bu yer adı otuz karakterden çok daha uzun yazılmıştır' }, error: true },
  ],
  howto: [
    '"Gidiş tarihi" alanından yola çıkacağınız günü seçin ve "Gün sayısı" alanına gidiş ile dönüş günleri dâhil seyahatin kaç gün süreceğini yazın. Dönüş tarihi kendiliğinden hesaplanır.',
    '"PDF içeriği" seçeneğinden seyahat planını, bavul listesini ya da ikisini birlikte seçin.',
    '"Seyahat türü" seçeneği bavul listesine eklenecek özel bölümü belirler: yaz ve deniz, kış ve kar ya da iş seyahati. "Genel" seçeneğinde yalnızca temel bölümler basılır.',
    'İsterseniz gidilecek yeri ve listede mutlaka görmek istediğiniz kendi eşyalarınızı yazın; eşyalar "Kendi eşyalarım" bölümüne onay kutusuyla eklenir.',
    '"Seyahat planını oluştur" düğmesine basın, sonuç tablosunda dönüş tarihini kontrol edin ve "PDF indir" ile dosyayı kaydedip %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'PDF dosyasında hangi sayfalar var?', p: [
      '<strong>Özet sayfası</strong> seyahatin kimlik kartıdır. Üstte sekiz alan bulunur: nereye, kimlerle, gidiş, dönüş, ulaşım, bilet ya da rezervasyon numarası, konaklama, adres ve telefon. Gidiş ve dönüş alanlarına tarih ile haftanın günü, yazdıysanız "nereye" alanına gidilecek yer hazır basılır; diğerlerini elle doldurursunuz. Altında altı kalemli bir <strong>seyahat bütçesi</strong> tablosu (ulaşım, konaklama, yeme içme, gezi ve giriş ücretleri, alışveriş ve hediye, diğer) ile toplam satırı yer alır; her kalem için planlanan ve harcanan tutar hücreleri vardır. Sayfanın kalanı önemli bilgiler, adresler ve telefonlar için çizgili bir not alanıdır.',
      '<strong>Gün gün plan sayfalarında</strong> seyahatin her günü için bir kutu bulunur. Kutunun başlığında "3. gün" ifadesi ile "20 Kasım 2026 Cuma" biçiminde tarih yazar. Kutunun sol bölümü sabah, öğle ve akşam olarak üçe ayrılmıştır; sağ bölümde o günün harcamalarını not edeceğiniz çizgiler vardır. A4 kâğıtta bir sayfaya beş, A5 kâğıtta dört gün sığar.',
      '<strong>Bavul listesi</strong> iki sütun hâlinde bölümlere ayrılmış onay kutulu bir listedir: belgeler ve para, giyim, kişisel bakım, elektronik, sağlık, seçtiyseniz seyahat türüne özel bölüm, evden çıkmadan yapılacak son kontroller ve kendi eşyalarınız.',
    ] },
    { h: 'Tarih ve süre hesabı: çözümlü örnek', p: [
      'Gün sayısına gidiş ve dönüş günleri dâhildir; bu yüzden dönüş tarihi, gidiş tarihine gün sayısının bir eksiği eklenerek bulunur. 18 Kasım 2026 çarşamba günü başlayan 5 günlük bir seyahatte günler 18, 19, 20, 21 ve 22 Kasım\'dır; dönüş 22 Kasım 2026 pazar gününe denk gelir. Gece sayısı gün sayısından bir eksiktir, yani bu seyahat "5 gün 4 gece"dir. Otel rezervasyonu yaparken gece sayısını, gün planı yaparken gün sayısını kullanırsınız.',
      'Bu örnekte PDF üç sayfadan oluşur: bir özet sayfası, beş günün tamamını alan bir plan sayfası ve bir bavul listesi. 1 Ocak 2027 cuma günü başlayan 10 günlük bir seyahatte dönüş 10 Ocak 2027 pazar olur; A5 kâğıtta sayfa başına dört gün düştüğü için plan üç sayfa tutar. Tek günlük gezilerde süre "günübirlik" olarak gösterilir ve gidiş ile dönüş aynı gündür.',
    ] },
    { h: 'Seyahat türüne göre bavul listesi', p: [
      'Temel bölümlerde toplam 30 kalem bulunur ve her seyahat türünde basılır. Tür seçtiğinizde listeye altı kalemlik özel bir bölüm eklenir ve hazır kalem sayısı 36\'ya çıkar.',
    ], ul: [
      '<strong>Yaz ve deniz tatili:</strong> mayo, plaj havlusu, güneş kremi, güneş gözlüğü, şapka, terlik ya da sandalet.',
      '<strong>Kış ve kar tatili:</strong> mont ya da kaban, bere ve eldiven, atkı ya da boyunluk, termal içlik, bot, dudak ve el kremi.',
      '<strong>İş seyahati:</strong> resmî kıyafet, dizüstü bilgisayar ve şarjı, kartvizit, not defteri ve kalem, sunum ve belgeler, yaka kartı ya da davetiye.',
      '<strong>Kendi eşyalarım:</strong> yazdığınız eşyalar bu bölüme onay kutusuyla basılır; ardından elle ekleme yapabilmeniz için en az üç boş satır bırakılır. Hiç eşya yazmadıysanız bölümde altı boş satır bulunur.',
    ] },
    { h: 'Planlama önerileri', ul: [
      '<strong>Her güne bir ana durak seçin.</strong> Sabah, öğle ve akşam bölmelerinin üçünü de doldurmak zorunda değilsiniz; yol, kuyruk ve dinlenme her zaman tahmin edilenden uzun sürer.',
      '<strong>İlk ve son günü hafif tutun.</strong> Yolculuk günlerine müze ya da uzun yürüyüş yazmak planın en sık bozulan kısmıdır.',
      '<strong>Rezervasyon numaralarını kâğıda da yazın.</strong> Telefonun şarjı bittiğinde ya da internet çekmediğinde özet sayfası işe yarar.',
      '<strong>Bavulu listeyle iki kez kontrol edin.</strong> Bir kez eşyayı bavula koyarken, bir kez de dönüşte otelden çıkarken; şarj aleti ve diş fırçası en çok unutulan eşyalardır.',
      '<strong>Bütçeyi kalem kalem yazın.</strong> Harcanan sütununu her akşam doldurmak, seyahatin ortasında paranın nereye gittiğini görmenizi sağlar.',
      '<strong>"Evden çıkmadan" bölümünü atlamayın.</strong> Kapıyı kilitledikten sonra akla gelen "ocak kapalı mıydı" sorusunun yanıtı işaretli bir kutudur.',
    ] },
    { h: 'Yazdırma önerileri', p: [
      'Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A5 çıktı el çantasına ve pasaport kılıfına daha rahat sığar; A4 yazıcıda "sayfa başına 2 sayfa" seçeneğiyle bastırıp ortadan kesebilirsiniz. Bavul listesinde satır aralığı, liste tek sayfaya sığacak en ferah değere göre kendiliğinden ayarlanır; çok sayıda eşya eklediğinizde A5 kâğıtta liste ikinci sayfaya taşabilir. Aile ya da arkadaş grubuyla gidiyorsanız bavul listesinden kişi başı bir kopya basmak işleri kolaylaştırır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bir seferde en fazla 21 günlük plan üretilir. Bavul listesi genel bir hatırlatmadır; gideceğiniz ülkenin vize, pasaport, sağlık ve gümrük kurallarını, hava yolu şirketinizin bagaj ağırlığı ve kabin kısıtlamalarını kapsamaz. Bu konularda ilgili resmî kurumun ve taşıyıcı firmanın güncel duyurularını kontrol edin. Düzenli kullandığınız ilaçlar ve sağlık durumunuzla ilgili hazırlıklar için hekiminize danışın. Araç rota, otel ya da fiyat önermez; rezervasyon yapmaz.',
    ] },
  ],
  faq: [
    ['Seyahat planlayıcı ve bavul listesi ücretsiz mi?', 'Evet. Dosyayı dilediğiniz kadar oluşturup indirebilir ve yazdırabilirsiniz; kayıt, üyelik ya da ödeme gerekmez.'],
    ['Dönüş tarihi nasıl hesaplanıyor?', 'Gün sayısına gidiş ve dönüş günleri dâhildir. Dönüş tarihi, gidiş tarihine gün sayısının bir eksiği eklenerek bulunur: 18 Kasım\'da başlayan 5 günlük seyahat 22 Kasım\'da biter ve 4 gece konaklama içerir.'],
    ['Yalnızca bavul listesini alabilir miyim?', 'Evet. "PDF içeriği" seçeneğinden "Yalnızca bavul listesi"ni seçin. Bu durumda özet ve gün planı sayfaları üretilmez; liste çoğu zaman tek sayfadır.'],
    ['Bavul listesindeki eşyaları değiştirebilir miyim?', 'Hazır kalemler sabittir; ancak "Kendi eşyalarınız" alanına 15 satıra kadar ekleme yapabilirsiniz. Gereksiz bulduğunuz kalemlerin üstünü çizmeniz, eksikleri boş satırlara yazmanız yeterlidir.'],
    ['Yurt dışı seyahati için yeterli mi?', 'Liste pasaport, priz dönüştürücü ve seyahat sigortası gibi genel kalemleri içerir; ancak vize, aşı, döviz ve gümrük kuralları ülkeden ülkeye değişir. Bunlar için ilgili resmî kaynakları kontrol edip gerekenleri boş satırlara ekleyin.'],
    ['Çocuklu ya da bebekli seyahat için bölüm var mı?', 'Ayrı bir bölüm yoktur. Bez, mama, yedek kıyafet, oyuncak gibi kalemleri "Kendi eşyalarınız" alanına yazarak listeye basılı olarak ekleyebilirsiniz.'],
    ['21 günden uzun seyahatleri nasıl planlarım?', 'Aracı iki kez çalıştırın: ikinci seferde gidiş tarihi olarak ilk planın bittiği günün ertesini seçin ve içerik olarak yalnızca seyahat planını alın. Böylece gün numaraları yeniden başlasa da tarihler kesintisiz devam eder.'],
    ['Yazdığım yer ve eşya bilgileri bir sunucuya gidiyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; gideceğiniz yer, tarihler ve eşya listeniz hiçbir yere gönderilmez, saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['alisveris-listesi-olustur', 'yapilacaklar-listesi-olustur', 'butce-planlayici', 'gunluk-planlayici', 'takvim-olustur'],
};
