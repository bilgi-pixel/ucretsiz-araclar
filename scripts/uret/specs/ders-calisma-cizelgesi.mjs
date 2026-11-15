export default {
  slug: 'ders-calisma-cizelgesi',
  title: 'Ders Çalışma Çizelgesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF haftalık takip',
  pageTitle: 'Ders Çalışma Çizelgesi Oluştur – Haftalık Çalışma Takibi PDF',
  description: 'Derslerinizi satırlara, günleri sütunlara yerleştiren ders çalışma çizelgesini PDF olarak oluşturun. Plan ve yapılan hücreleri; A4 ya da A5, 1–12 hafta.',
  card: 'Her ders ve her gün için "plan" ve "yapılan" hücreleri olan haftalık ders çalışma çizelgesini kendi derslerinizle PDF yapın.',
  category: 'planlama',
  pdf: true,
  keywords: ['ders çalışma çizelgesi', 'ders çalışma programı şablonu', 'haftalık ders çalışma planı', 'çalışma takip çizelgesi pdf', 'soru takip çizelgesi', 'yazdırılabilir ders çalışma programı', 'sınav hazırlık çizelgesi', 'günlük ders çalışma tablosu'],
  lead: 'Derslerinizi satırlara, haftanın günlerini sütunlara yerleştiren bir <strong>ders çalışma çizelgesi</strong> oluşturun. Her hücre ikiye bölünmüştür: sol yarıya o gün için planladığınız miktarı, sağ yarıya gerçekte yaptığınızı yazarsınız. Takip birimini dakika, soru ya da sayfa olarak seçebilirsiniz.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bu hafta kullanılır. Çizelge seçtiğiniz günün haftasının pazartesisinden başlar.' },
    { id: 'hafta', label: 'Hafta sayısı', type: 'number', value: '4', hint: '1 ile 12 arasında. Her hafta bir sayfadır.' },
    { id: 'dersler', label: 'Dersler (isteğe bağlı)', type: 'textarea', placeholder: 'Matematik\nTürkçe\nFizik', hint: 'Her satıra bir ders; en fazla 12 ders, en fazla 22 karakter. Boş bırakırsanız beş hazır ders kullanılır.', wide: true },
    { id: 'bosSatir', label: 'Ek boş satır', type: 'number', value: '2', hint: '0 ile 6 arasında; sonradan elle ders eklemek için. Dersler ve boş satırlar toplamı en fazla 14 olabilir.' },
    { id: 'birim', label: 'Takip birimi', type: 'select', options: [['dk', 'Dakika'], ['soru', 'Soru sayısı'], ['sayfa', 'Sayfa sayısı']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Elif – 8. Sınıf Çalışma Planı', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Ders Çalışma Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    let ders = h.lines(v.dersler);
    if (!ders.length) ders = ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Yabancı Dil'];
    if (ders.length > 12) h.err('En fazla 12 ders yazabilirsiniz; az çalışılan dersleri tek satırda birleştirin.');
    if (ders.some((s) => s.length > 22)) h.err('Ders adları en fazla 22 karakter olabilir; uzun adı kısaltın.');
    const bos = h.int(h.opt(v.bosSatir, 0, 'Ek boş satır'), 'Ek boş satır');
    if (bos < 0 || bos > 6) h.err('Ek boş satır sayısı 0 ile 6 arasında olmalı.');
    const R = ders.length + bos;
    if (R > 14) h.err('Dersler ve boş satırların toplamı en fazla 14 olabilir; boş satır sayısını azaltın.');
    const BIRIM = { dk: 'dakika', soru: 'soru', sayfa: 'sayfa' }[v.birim] || 'dakika';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const kucuk = Math.max(5, 6 * k);
    const ust = m + 14 * k, hh = 13 * k, altYuk = 30 * k, ara = 4 * k;
    const dw = 42 * k, tw = 24 * k, gw = (W - 2 * m - dw - tw) / 7;
    const rh = Math.min(13 * k, (H - m - ust - hh - ara - altYuk) / (R + 1));
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, 18 * k, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}  ·  birim: ${BIRIM}`, W - m, m + 7 * k, 10 * k, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      // Başlık satırı
      ops.push(['kutu', m, ust, dw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Ders', m + 2 * k, ust + 8 * k, 10 * k, { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + dw + g * gw, d = h.gunEkle(b, g);
        ops.push(['kutu', x, ust, gw, hh, { dolgu: g >= 5 ? 0.8 : 0.86, cizgi: 0.5 }]);
        ops.push(['yazi', GUN[g], x + 1.5 * k, ust + 5.2 * k, 8.5 * k, { kalin: true }]);
        ops.push(['yazi', `${d.getUTCDate()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`, x + gw - 1.5 * k, ust + 5.2 * k, Math.max(5.5, 7 * k), { hiza: 'sag', ton: 0.3 }]);
        ops.push(['yazi', 'plan', x + gw / 4, ust + hh - 2 * k, kucuk, { hiza: 'orta', ton: 0.3 }]);
        ops.push(['yazi', 'yapılan', x + gw * 0.75, ust + hh - 2 * k, kucuk, { hiza: 'orta', ton: 0.3 }]);
      }
      const tx = W - m - tw;
      ops.push(['kutu', tx, ust, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Haftalık', tx + tw / 2, ust + 5.2 * k, 8.5 * k, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'toplam', tx + tw / 2, ust + hh - 2 * k, 8.5 * k, { kalin: true, hiza: 'orta' }]);
      // Ders satırları ve en altta günlük toplam satırı
      for (let r = 0; r <= R; r++) {
        const y = ust + hh + r * rh, sonSatir = r === R;
        ops.push(['kutu', m, y, W - 2 * m, rh, sonSatir ? { dolgu: 0.92, cizgi: 0.5 } : { cizgi: 0.55 }]);
        const ad = sonSatir ? 'Günlük toplam' : ders[r];
        if (ad) ops.push(['yazi', ad, m + 2 * k, y + rh / 2 + 1.2 * k, 9.5 * k, { kalin: sonSatir }]);
      }
      const altY = ust + hh + (R + 1) * rh;
      for (let g = 0; g <= 7; g++) {
        const x = m + dw + g * gw;
        ops.push(['cizgi', x, ust + hh, x, altY, { kalinlik: 0.3, ton: 0.4 }]);
        if (g < 7) ops.push(['cizgi', x + gw / 2, ust + hh, x + gw / 2, altY, { kalinlik: 0.2, ton: 0.7, kesik: true }]);
      }
      // Alt bölüm: hedefler ve değerlendirme
      const ay = altY + ara, ah = H - m - ay, ow = (W - 2 * m - ara) * 0.5;
      [['Bu haftanın hedefleri', m], ['Hafta sonu değerlendirmesi', m + ow + ara]].forEach(([ad, x]) => {
        ops.push(['kutu', x, ay, ow, ah, { cizgi: 0.55 }]);
        ops.push(['yazi', ad, x + 2 * k, ay + 5.5 * k, 8.5 * k, { kalin: true }]);
        const adim = a5 ? 6.2 : 7.5;
        for (let y = ay + 5.5 * k + adim; y < ay + ah - 1.5; y += adim) ops.push(['cizgi', x + 2.5 * k, y, x + ow - 2.5 * k, y, { kalinlik: 0.2, ton: 0.78 }]);
      });
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Satır sayısı', `${R} satır (${ders.length} ders, ${bos} boş)`],
        ['Takip birimi', BIRIM],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü yatay, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'ders-calisma-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '4' }, out: { 'Sayfa sayısı': '4 sayfa', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '13.12.2026 Pazar', 'Satır sayısı': '7 satır (5 ders, 2 boş)', 'Takip birimi': 'dakika' }, pdfSayfa: 4 },
    { in: { baslangic: '2027-01-01', hafta: '1', dersler: 'Matematik\nGeometri\nFizik\nKimya\nBiyoloji\nTürkçe\nTarih\nCoğrafya', bosSatir: '0', birim: 'soru', boyut: 'a5' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Satır sayısı': '8 satır (8 ders, 0 boş)', 'Takip birimi': 'soru', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', hafta: '2', birim: 'sayfa' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028', 'Son gün': '12.03.2028 Pazar', 'Takip birimi': 'sayfa' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-16', hafta: '12', dersler: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12', bosSatir: '2', boyut: 'a5' }, out: { 'Sayfa sayısı': '12 sayfa', 'Son gün': '07.02.2027 Pazar', 'Satır sayısı': '14 satır (12 ders, 2 boş)' }, pdfSayfa: 12 },
    { in: { baslangic: '2026-11-22', hafta: '1', dersler: 'Anayasa Hukuku', bosSatir: '', baslik: 'Final Haftası' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026', 'Satır sayısı': '1 satır (1 ders, 0 boş)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', hafta: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1', dersler: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10', bosSatir: '5' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1', bosSatir: '7' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1', dersler: 'Bu ders adı yirmi iki karakterden uzun' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından çalışmaya başlayacağınız haftadan bir gün seçin; boş bırakırsanız bu hafta alınır. "Hafta sayısı" alanına kaç haftalık çizelge istediğinizi yazın.',
    '"Dersler" alanına takip edeceğiniz dersleri her satıra bir tane olacak biçimde yazın. Sonradan elle eklemek istediğiniz dersler için "Ek boş satır" sayısını belirleyin.',
    '"Takip birimi" seçeneğinden çalışmanızı neyle ölçeceğinizi seçin: dakika, çözülen soru ya da okunan sayfa. Seçtiğiniz birim sayfa başlığında hatırlatma olarak yazar.',
    'Kâğıt boyutunu seçin, isterseniz adınızı ya da sınıfınızı içeren bir başlık yazın.',
    '"Çizelgeyi oluştur" düğmesine basın; önizlemeyi kontrol edin, "PDF indir" ile kaydedin ve yatay yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Çizelgenin yapısı', p: [
      'Her sayfa bir haftadır. Tablonun sol sütununda dersleriniz alt alta sıralanır; karşılarında pazartesiden pazara yedi gün sütunu ve en sağda "Haftalık toplam" sütunu yer alır. Gün sütunlarının başlığında gün adı ile "16.11" biçiminde tarih yazar; cumartesi ve pazar başlıkları biraz daha koyu tondadır.',
      'Çizelgeyi sıradan bir ders programından ayıran şey hücrelerin ortasındaki kesikli çizgidir. Her hücre <strong>plan</strong> ve <strong>yapılan</strong> olmak üzere iki yarıya bölünmüştür. Sol yarıya o gün o derse ayırmayı düşündüğünüz miktarı, gün bittiğinde sağ yarıya gerçekleşen miktarı yazarsınız. Tablonun son satırı "Günlük toplam" satırıdır; her günün altına o gün toplam ne kadar çalıştığınızı not edersiniz.',
      'Sayfanın altında iki kutu bulunur. "Bu haftanın hedefleri" kutusuna hafta başında bitirmek istediğiniz konuları, denemeleri ya da ödevleri yazarsınız. "Hafta sonu değerlendirmesi" kutusu pazar akşamı içindir: neyin iyi gittiğini, hangi dersin geride kaldığını ve gelecek hafta neyi değiştireceğinizi birkaç cümleyle not edersiniz.',
    ] },
    { h: 'Plan ile yapılanı yan yana yazmanın yararı', p: [
      'Yalnızca plan yazılan bir program, uygulanıp uygulanmadığı hakkında hiçbir şey söylemez; yalnızca yapılanın yazıldığı bir günlük ise hedefin ne olduğunu göstermez. İkisini aynı hücrede görmek, aradaki farkı günü gününe fark etmenizi sağlar. Matematik için her gün 60 dakika planlayıp hafta boyunca 30–40 dakikada kalıyorsanız sorun irade değil, planın gerçekçi olmaması olabilir; bir sonraki hafta planı 45 dakikaya çekip tutturmak, tutmayan büyük hedefi sürdürmekten daha yararlıdır.',
      'Haftalık toplam sütunu da benzer bir işlev görür. Satır sonundaki toplamlar alt alta okunduğunda hangi derse fazla, hangisine az zaman ayrıldığı ortaya çıkar. Sevilen derse fazla, zorlanılan derse az çalışmak yaygın bir eğilimdir ve çoğu zaman ancak rakamlar yan yana gelince görülür.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Sekizinci sınıfa giden bir öğrencinin birimi "soru" seçtiğini düşünelim. Pazartesi günü matematik hücresinin plan yarısına 40, yapılan yarısına 35 yazıyor; salı 40 plan, 45 yapılan; çarşamba 40 plan, 40 yapılan. Üç günün plan toplamı 120, yapılan toplamı 35 + 45 + 40 = 120 sorudur; yani salı günkü fazlalık pazartesinin eksiğini kapatmıştır. Hafta sonunda matematik satırının "Haftalık toplam" hücresine yedi günün yapılan toplamı yazılır.',
      'Satır hesabı da basittir: hazır beş dersle birlikte iki boş satır bırakıldığında tabloda 5 + 2 = 7 ders satırı ve altında bir günlük toplam satırı bulunur. Tarih tarafında 18 Kasım 2026 çarşamba seçilip 4 hafta istendiğinde ilk sayfa 16–22 Kasım haftasını, son sayfa 13 Aralık 2026 pazar günü biten haftayı gösterir.',
    ] },
    { h: 'Hangi birimi seçmeli?', ul: [
      '<strong>Dakika:</strong> konu çalışması, özet çıkarma ve tekrar gibi çıktısı sayılamayan işler için uygundur. Masada geçen süreyi değil, gerçekten çalışılan süreyi yazmak gerekir.',
      '<strong>Soru sayısı:</strong> test çözerek hazırlanılan sınavlarda en yaygın ölçüdür. Yalnızca çözülen soru sayısını değil, isterseniz yanına küçük harflerle yanlış sayısını da not edebilirsiniz.',
      '<strong>Sayfa sayısı:</strong> okuma ağırlıklı derslerde, kitap ya da ders notu bitirme hedefi olan üniversite öğrencilerinde işe yarar.',
      '<strong>Karışık kullanım:</strong> birim yalnızca başlıkta hatırlatma olarak yazar. Bir derste dakika, diğerinde soru yazmak isterseniz hücreye sayının yanına "dk" ya da "s" eklemeniz yeterlidir.',
    ] },
    { h: 'Doldurma önerileri', ul: [
      '<strong>Planı pazar akşamı yazın.</strong> Haftanın sabit işlerini (okul, kurs, etüt) düşünerek her güne kaldırabileceği kadar yük koyun.',
      '<strong>Her güne her dersi yazmayın.</strong> Boş bırakılan hücre de bir karardır; günde iki üç derse odaklanmak, altı derse onar dakika ayırmaktan verimlidir.',
      '<strong>Yapılan yarısını aynı gün doldurun.</strong> Ertesi güne bırakılan kayıt tahmine dönüşür.',
      '<strong>Bir günü telafi için hafif bırakın.</strong> Hastalık, misafir ya da yorgunluk yüzünden kayan çalışmalar için haftada yarım gün boşluk plana gerçekçilik katar.',
      '<strong>Eski sayfaları saklayın.</strong> Dört haftalık çıktıyı arka arkaya koyduğunuzda çalışma düzeninizin nasıl değiştiğini görürsünüz.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde kâğıt yönünü <strong>yatay</strong>, ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. A4 çıktı masa üstünde ya da çalışma panosunda kullanım için rahattır; A5 çıktı deftere yapıştırmaya uygundur ancak hücreler küçüldüğü için yalnızca rakam yazmaya elverişlidir.',
      'Bir sayfada dersler ve boş satırlar toplamı en fazla 14 olabilir; satır sayısı arttıkça satır yüksekliği azalır. Bir seferde en fazla 12 hafta üretilir ve hafta her zaman pazartesi başlar. Araç çalışma süresi önermez, toplam hesaplamaz; hücreleri siz doldurursunuz. Ne kadar çalışılması gerektiği kişiden kişiye değişir; çizelge yalnızca kendi düzeninizi görünür kılmaya yarar.',
    ] },
  ],
  faq: [
    ['Ders çalışma çizelgesi ücretsiz mi?', 'Evet. Çizelgeyi dilediğiniz kadar oluşturup indirebilir, yazdırabilirsiniz. Kayıt, ücret ya da indirme sınırı yoktur; öğretmenler sınıfları için çoğaltabilir.'],
    ['Bu çizelgenin ders programından farkı ne?', 'Ders programı hangi saatte hangi dersin olduğunu gösterir. Bu çizelge ise okul dışındaki bireysel çalışmayı izler: her ders ve gün için ne kadar çalışmayı planladığınızı ve ne kadarını gerçekleştirdiğinizi yan yana yazarsınız.'],
    ['Kendi derslerimi yazabilir miyim?', 'Evet. "Dersler" alanına en fazla 12 dersi satır satır yazabilirsiniz. Alanı boş bırakırsanız Matematik, Türkçe, Fen Bilimleri, Sosyal Bilgiler ve Yabancı Dil satırları hazır gelir.'],
    ['Boş satırlar ne işe yarar?', 'Hafta içinde ortaya çıkan ödev, proje, deneme sınavı ya da kitap okuma gibi kalemleri elle eklemeniz içindir. Boş satır istemiyorsanız sayıyı 0 yapabilirsiniz.'],
    ['Soru sayısı ile dakikayı aynı sayfada kullanabilir miyim?', 'Evet. Seçtiğiniz birim yalnızca başlıkta hatırlatma olarak yazar; hücreler boş olduğu için her derse dilediğiniz ölçüyü yazabilirsiniz. Karışıklık olmaması için sayının yanına kısa bir işaret koymanız yeterlidir.'],
    ['Üniversite ya da KPSS hazırlığı için uygun mu?', 'Evet. Ders adlarını kendiniz yazdığınız için ilkokuldan üniversiteye, merkezi sınav hazırlığından dil öğrenimine kadar her düzeyde kullanılabilir.'],
    ['A5 boyutta hücrelere yazı sığar mı?', 'A5 sayfada her gün sütunu yaklaşık 21 mm genişliğindedir ve ikiye bölünür; iki ya da üç haneli sayılar rahat yazılır, uzun not yazmaya uygun değildir. Not almak istiyorsanız A4 seçin.'],
    ['Yazdığım dersler ya da adım kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; ders adları, başlık ve tarihler hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['ders-calisma-plani-hesapla', 'ders-programi-olustur', 'sinav-takvimi-olustur', 'haftalik-planlayici', 'kitap-okuma-takip-cizelgesi'],
};
