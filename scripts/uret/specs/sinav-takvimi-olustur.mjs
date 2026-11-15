export default {
  slug: 'sinav-takvimi-olustur',
  title: 'Sınav Takvimi Oluşturma',
  h1Tail: 'yazdırılabilir PDF sınav listesi ve aylık takvim',
  pageTitle: 'Sınav Takvimi Oluştur – Yazdırılabilir Sınav Programı PDF',
  description: 'Sınav tarihlerinizi yazın; tarihe göre sıralanmış, günü ve kalan gün sayısı yazılı sınav listesini ve aylık sınav takvimini PDF olarak oluşturun.',
  card: 'Sınavlarınızı yazın; tarihe göre sıralı liste, haftanın günü, kalan gün sayısı ve işaretli aylık takvim PDF olarak hazırlansın.',
  category: 'planlama',
  pdf: true,
  keywords: ['sınav takvimi oluştur', 'sınav programı şablonu', 'sınav takvimi pdf', 'yazılı takvimi hazırlama', 'vize final takvimi', 'sınav çizelgesi', 'yazdırılabilir sınav takvimi', 'sınava kaç gün kaldı'],
  lead: 'Sınavlarınızı tarihleriyle birlikte alt alta yazın; araç bunları tarihe göre sıralayıp haftanın gününü ve kalan gün sayısını ekleyerek bir <strong>sınav takvimi</strong> hazırlasın. İsterseniz sınav günlerinin işaretlendiği aylık takvim sayfaları da aynı PDF dosyasına eklenir.',
  button: 'Sınav takvimini oluştur',
  inputs: [
    { id: 'sinavlar', label: 'Sınavlar', type: 'textarea', placeholder: '18.11.2026 10:30 Matematik\n20.11.2026 Türkçe\n24.11.2026 09:00 Fen Bilimleri', hint: 'Her satıra bir sınav: önce tarih (GG.AA.YYYY), isterseniz saat (SS:DD), sonra ders adı. En fazla 30 sınav; ders adı en fazla 28 karakter.', wide: true },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date', hint: 'Kalan gün sayısı bu tarihe göre hesaplanır.' },
    { id: 'gorunum', label: 'PDF içeriği', type: 'select', options: [['ikisi', 'Sınav listesi ve aylık takvim'], ['liste', 'Yalnızca sınav listesi'], ['takvim', 'Yalnızca aylık takvim']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. 1. Dönem 2. Yazılılar', hint: 'En fazla 30 karakter.', wide: true },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { sinavlar: '18.11.2026 10:30 Matematik\n16.11.2026 Türkçe\n20.11.2026 09:00 Fen Bilimleri', bugun: '2026-11-15' }, out: { 'Sınav sayısı': '3 sınav', 'Sıradaki sınav': 'Türkçe (1 gün sonra)', 'İlk sınav': '16.11.2026 Pazartesi – Türkçe', 'Son sınav': '20.11.2026 Cuma – Fen Bilimleri', 'Sınav dönemi': '5 gün', 'Sayfa sayısı': '2 sayfa' }, pdfSayfa: 2 },
    { in: { sinavlar: '2027-01-01 Fizik\n29.02.2028 Kimya', bugun: '2026-11-15', gorunum: 'liste' }, out: { 'Sıradaki sınav': 'Fizik (47 gün sonra)', 'İlk sınav': '01.01.2027 Cuma – Fizik', 'Son sınav': '29.02.2028 Salı – Kimya', 'Sınav dönemi': '425 gün', 'Sayfa sayısı': '1 sayfa' }, pdfSayfa: 1 },
    { in: { sinavlar: '30.11.2026 Tarih\n02.12.2026 Coğrafya\n11.01.2027 14:00 Felsefe', bugun: '2026-11-15', boyut: 'a5' }, out: { 'İlk sınav': '30.11.2026 Pazartesi – Tarih', 'Son sınav': '11.01.2027 Pazartesi – Felsefe', 'Sınav dönemi': '43 gün', 'Sayfa sayısı': '4 sayfa' }, pdfSayfa: 4 },
    { in: { sinavlar: '18.11.2026 10:30 Matematik\n16.11.2026 Türkçe\n20.11.2026 09:00 Fen Bilimleri', bugun: '2026-11-19', gorunum: 'takvim' }, out: { 'Sıradaki sınav': 'Fen Bilimleri (1 gün sonra)', 'Sayfa sayısı': '1 sayfa' }, pdfSayfa: 1 },
    { in: { sinavlar: '18.11.2026 Matematik', bugun: '2026-11-18', baslik: 'Bursluluk Sınavı' }, out: { 'Sınav sayısı': '1 sınav', 'Sıradaki sınav': 'Matematik (bugün)', 'Sınav dönemi': '1 gün' }, pdfSayfa: 2 },
    { in: { sinavlar: '18.11.2026 Matematik', bugun: '2026-12-01', gorunum: 'liste' }, out: { 'Sıradaki sınav': 'Tüm sınavlar geçmiş' }, pdfSayfa: 1 },
    { in: { sinavlar: Array.from({ length: 30 }, (_, i) => `${i + 1}.12.2026 09:00 Deneme ${i + 1}`).join('\n'), bugun: '2026-11-15', gorunum: 'liste', boyut: 'a5' }, out: { 'Sınav sayısı': '30 sınav', 'İlk sınav': '01.12.2026 Salı – Deneme 1', 'Son sınav': '30.12.2026 Çarşamba – Deneme 30', 'Sayfa sayısı': '2 sayfa' }, pdfSayfa: 2 },
    { in: { sinavlar: '', bugun: '2026-11-15' }, error: true },
    { in: { sinavlar: 'Matematik', bugun: '2026-11-15' }, error: true },
    { in: { sinavlar: '31.02.2027 Matematik', bugun: '2026-11-15' }, error: true },
    { in: { sinavlar: '18.11.2026 25:00 Matematik', bugun: '2026-11-15' }, error: true },
    { in: { sinavlar: '2027-01-01 Fizik\n29.02.2028 Kimya', bugun: '2026-11-15' }, error: true },
  ],
  howto: [
    '"Sınavlar" alanına her satıra bir sınav yazın. Satır tarihle başlar (18.11.2026 gibi), isterseniz ardından saat (10:30 gibi) ve en sonda ders adı gelir. Sıra önemli değildir; araç tarihe göre dizer.',
    '"Bugünün tarihi" alanını boş bırakırsanız kalan gün sayıları bugüne göre hesaplanır. Çıktıyı başka bir gün dağıtacaksanız o günün tarihini seçebilirsiniz.',
    '"PDF içeriği" seçeneğinden sınav listesini, aylık takvimi ya da ikisini birlikte seçin.',
    'Kâğıt boyutunu belirleyin ve isterseniz "2. Dönem Yazılıları" gibi bir başlık yazın.',
    '"Sınav takvimini oluştur" düğmesine basın. Sonuç tablosunda sıradaki sınavı ve dönem uzunluğunu kontrol edin, "PDF indir" ile dosyayı kaydedip %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'PDF dosyasında neler var?', p: [
      'Dosya iki tür sayfadan oluşabilir. <strong>Sınav listesi</strong> sayfasında sınavlarınız en yakın tarihten en uzağa doğru bir tabloda sıralanır. Her satırda tarih, haftanın günü, yazdıysanız saat, ders adı ve "Kalan" sütununda sınava kaç gün kaldığı yazar; en sağdaki "Not" sütunu derslik, sınav türü ya da sorumlu olunan üniteler gibi kısa bilgiler için boş bırakılmıştır. Tarihi geçmiş sınavlar gri tonda ve "geçti" notuyla basılır. Tablonun altında yer kalırsa "Konular ve çalışma notları" başlıklı çizgili bir alan eklenir.',
      '<strong>Aylık takvim</strong> sayfaları, ilk sınavın bulunduğu aydan son sınavın bulunduğu aya kadar her ay için bir sayfadır. Pazartesiyle başlayan klasik ay görünümünde sınav olan günler gri zeminli ve kalın çerçevelidir; hücrenin içinde saat ve ders adı yazar. Hücreye sığmayan uzun ders adları kısaltılır, aynı güne sığmayacak kadar çok sınav düşerse fazlası "+2 sınav daha" biçiminde belirtilir. Boş günlerin hücreleri çalışma planınızı elle yazmanız için açık bırakılmıştır.',
    ] },
    { h: 'Satırlar nasıl yazılır?', p: [
      'Her satır şu kalıba uyar: <code>tarih [saat] ders adı</code>. Tarih gün.ay.yıl biçiminde (18.11.2026) ya da yıl-ay-gün biçiminde (2026-11-18) yazılabilir. Saat isteğe bağlıdır ve iki nokta ile yazılır (09:00). Tarihten sonra gelen her şey ders adı sayılır; "Matematik 2. Yazılı" ya da "Fizik (Ünite 3–4)" gibi açıklamalar ekleyebilirsiniz, yeter ki 28 karakteri geçmesin.',
      'Araç her satırdaki tarihin takvimde gerçekten var olup olmadığını denetler. 31 Şubat gibi olmayan bir gün ya da 25:00 gibi geçersiz bir saat yazıldığında hangi satırda sorun olduğunu söyleyen bir uyarı görürsünüz. Aynı güne birden çok sınav yazabilirsiniz; saatli olanlar saat sırasına göre, saatsiz olanlar onlardan sonra dizilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bugünün 15 Kasım 2026 pazar olduğunu ve şu üç satırı yazdığınızı düşünelim: 18.11.2026 10:30 Matematik, 16.11.2026 Türkçe, 20.11.2026 09:00 Fen Bilimleri. Araç satırları tarihe göre sıralar: 16 Kasım pazartesi Türkçe, 18 Kasım çarşamba Matematik, 20 Kasım cuma Fen Bilimleri. Kalan gün sayıları sırasıyla 1, 3 ve 5 olur; hesapta bugün sayılmaz, sınav günü sayılır.',
      'Sonuç tablosunda sıradaki sınav "Türkçe (1 gün sonra)", sınav dönemi ise ilk ve son gün dâhil 16–20 Kasım arası 5 gün olarak gösterilir. Tüm sınavlar aynı ayda olduğu için takvim tek sayfadır; liste sayfasıyla birlikte PDF iki sayfa eder. Sınavlar 30 Kasım, 2 Aralık ve 11 Ocak\'a yayılsaydı Kasım, Aralık ve Ocak için üç takvim sayfası oluşurdu.',
    ] },
    { h: 'Sınav takvimiyle çalışma planı kurmak', ul: [
      '<strong>Geriye doğru planlayın.</strong> Her sınavın önündeki boş hücrelere, sınavdan geriye sayarak tekrar ve konu çalışması günlerini yazın. Son gün yalnızca genel tekrar için kalsın.',
      '<strong>Üst üste gelen sınavlara erken başlayın.</strong> Aynı güne ya da art arda günlere düşen sınavlar takvimde gri hücrelerin yan yana gelmesiyle hemen görülür; bu derslere bir hafta önceden yer açın.',
      '<strong>"Kalan" sütununu abartmayın.</strong> Kalan gün sayısı takvim günüdür; okul, kurs ve dinlenme çıkarıldığında gerçek çalışma günü daha azdır.',
      '<strong>Not sütununu doldurun.</strong> Sınavın kapsadığı üniteleri, sınav salonunu ya da yanınızda götürmeniz gerekenleri (hesap makinesi, kimlik) yazmak son dakika telaşını azaltır.',
      '<strong>Çıktıyı güncel tutun.</strong> Sınav tarihi değişirse listeyi düzeltip yeniden yazdırmak birkaç saniye sürer; üstü karalanmış bir takvim güven vermez.',
    ] },
    { h: 'Kimler kullanabilir?', p: [
      'Ortaokul ve lise öğrencileri dönem içi yazılılarını, üniversite öğrencileri vize ve final haftalarını bu araçla tek sayfaya dökebilir. Veliler çocuklarının sınav haftasını buzdolabına asmak, öğretmenler sınıfın ortak sınav programını panoya koymak için kullanabilir. Merkezi sınavlara hazırlananlar deneme sınavı tarihlerini aynı listeye ekleyerek deneme takvimi çıkarabilir. Ehliyet, yabancı dil ya da sertifika sınavı gibi tek bir tarih için de liste ve takvim üretilebilir.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A4 kâğıtta bir liste sayfasına 31, A5 kâğıtta 25 sınav sığar; daha fazlası kendiliğinden ikinci sayfaya geçer. A5 takvim hücreleri dar olduğu için ders adları daha erken kısaltılır; uzun adlar kullanıyorsanız A4 seçin.',
      'Bir seferde en fazla 30 sınav yazılabilir ve aylık takvim en fazla 12 aylık bir dönemi kapsar. Araç resmî sınav tarihlerini bilmez ve denetlemez; tarihleri okulunuzun ya da sınavı yapan kurumun duyurusundan alıp siz yazarsınız. Kesin tarih ve saat için her zaman resmî duyuru esas alınmalıdır. Resmî tatiller takvime işlenmez.',
    ] },
  ],
  faq: [
    ['Sınav takvimi oluşturmak ücretli mi?', 'Hayır. Araç tamamen ücretsizdir; kayıt istemez ve oluşturduğunuz PDF dosyasını dilediğiniz kadar yazdırabilir, sınıf arkadaşlarınızla paylaşabilirsiniz.'],
    ['Sınavları tarih sırasına göre yazmam gerekiyor mu?', 'Hayır. Satırları aklınıza geldiği sırayla yazabilirsiniz; araç önce tarihe, aynı gündeki sınavları da saate göre sıralar.'],
    ['Kalan gün sayısı nasıl hesaplanıyor?', 'Sınav tarihi ile "Bugünün tarihi" alanındaki gün arasındaki takvim günü farkı alınır. Bugün 15 Kasım, sınav 18 Kasım ise kalan süre 3 gündür. Sınav bugünse "bugün", tarihi geçmişse "geçti" yazar.'],
    ['Saat yazmak zorunlu mu?', 'Hayır. Saat yazmadığınız sınavlarda saat hücresi boş kalır ve dilerseniz elle doldurabilirsiniz. Saat yazacaksanız iki nokta ile, 09:00 biçiminde yazın.'],
    ['Aynı gün iki sınavım var, ikisi de görünür mü?', 'Evet. Listede ayrı satırlarda, takvimde aynı hücrede alt alta yazılır. Hücreye sığmayacak kadar çok sınav aynı güne düşerse sığmayanlar "+1 sınav daha" gibi bir notla belirtilir; tamamı liste sayfasında görünür.'],
    ['Vize ve final takvimini ayrı ayrı çıkarabilir miyim?', 'Evet. Her dönem için aracı ayrı çalıştırıp başlık alanına "Vize Takvimi" ya da "Final Takvimi" yazabilirsiniz. İkisini tek dosyada istiyorsanız tüm sınavları aynı listeye yazmanız yeterlidir.'],
    ['Neden "en fazla 12 aylık dönem" uyarısı alıyorum?', 'İlk ve son sınav arasındaki her ay için bir takvim sayfası üretilir. Aralarında bir yıldan uzun süre varsa çoğu sayfa boş kalacağından araç durur. Sınavları dönemlere ayırın ya da yalnızca liste görünümünü seçin.'],
    ['Yazdığım sınav bilgileri bir yere gönderiliyor mu?', 'Hayır. Liste ve takvim tarayıcınızın içinde hazırlanır; ders adları ve tarihler hiçbir sunucuya iletilmez, saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['ders-calisma-cizelgesi', 'ders-programi-olustur', 'takvim-olustur', 'aylik-planlayici', 'ders-calisma-plani-hesapla'],
};
