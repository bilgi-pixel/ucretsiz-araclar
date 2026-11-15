export default {
  slug: '12-24-saat-cevir',
  title: '12 Saat 24 Saat Biçimi Çevirici',
  h1Tail: 'AM/PM ↔ 24 saat',
  pageTitle: '12 Saat 24 Saat Çevirici – AM PM Saati 24 Saat Biçimine Çevirme',
  description: 'AM/PM ile yazılmış saati 24 saat biçimine, 24 saatlik saati AM/PM biçimine çevirin. 12 AM ve 12 PM karışıklığını giderir; ÖÖ/ÖS yazımını da tanır.',
  card: 'AM/PM saatini 24 saat biçimine ya da tersine çevirin; 12 AM ve 12 PM\'nin hangi saate karşılık geldiğini net görün.',
  category: 'zaman',
  keywords: ['12 saat 24 saat çevirme', 'am pm çevirme', 'pm saat kaç', 'am pm ne demek', '12 am saat kaç', '24 saat biçimi', 'öö ös saat'],
  lead: 'Saati yazın; sonunda AM, PM, ÖÖ ya da ÖS varsa araç onu <strong>24 saat biçimine</strong>, yoksa <strong>12 saat (AM/PM) biçimine</strong> çevirir. Her iki gösterim de sonuçta birlikte verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'saat', label: 'Saat', type: 'text', placeholder: 'Örn. 3:30 PM ya da 15:30', hint: 'AM/PM eklerseniz 12 saat biçimi sayılır. Saniye isteğe bağlıdır: 15:30:45.' },
  ],
  compute(v, h) {
    const ham = String(v.saat ?? '').trim();
    if (ham === '') h.err('"Saat" alanını doldurun (örn. 3:30 PM ya da 15:30).');
    let t = ham.toLocaleUpperCase('tr-TR').replace(/\s+/g, '').replace(/\.(?=[AP]\.?M|M)/g, '');
    let ek = null;
    const m1 = /(A\.?M\.?|P\.?M\.?|ÖÖ|ÖS)$/.exec(t);
    if (m1) {
      const e = m1[1].replace(/\./g, '');
      ek = e === 'AM' || e === 'ÖÖ' ? 'AM' : 'PM';
      t = t.slice(0, m1.index);
    }
    let m = /^(\d{1,2})(?:[:.](\d{2}))?(?:[:.](\d{2}))?$/.exec(t);
    if (!m && (m = /^(\d{2})(\d{2})$/.exec(t))) m = [m[0], m[1], m[2], undefined];
    if (!m) h.err('Saat anlaşılamadı. 15:30, 3:30 PM, 7 ÖS ya da 15:30:45 gibi yazın.');
    let sa = +m[1];
    const dk = m[2] === undefined ? 0 : +m[2];
    const sn = m[3] === undefined ? null : +m[3];
    if (dk > 59 || (sn !== null && sn > 59)) h.err('Dakika ve saniye 00 ile 59 arasında olmalı.');
    if (ek) {
      if (sa < 1 || sa > 12) h.err('AM/PM ile yazılan saatte saat kısmı 1 ile 12 arasında olmalı. 24 saat biçimi için AM/PM eklemeyin.');
      if (ek === 'AM') sa = sa === 12 ? 0 : sa; else sa = sa === 12 ? 12 : sa + 12;
    } else if (sa > 23) {
      if (sa === 24 && dk === 0 && !sn) sa = 0;
      else h.err('24 saat biçiminde saat kısmı 00 ile 23 arasında olmalı.');
    }
    const iki = (n) => String(n).padStart(2, '0');
    const snEk = sn === null ? '' : ':' + iki(sn);
    const s12 = sa % 12 === 0 ? 12 : sa % 12;
    const pm = sa >= 12;
    const yirmiDort = `${iki(sa)}:${iki(dk)}${snEk}`;
    const onIki = `${s12}:${iki(dk)}${snEk} ${pm ? 'PM' : 'AM'}`;
    const turkce = `${pm ? 'ÖS' : 'ÖÖ'} ${s12}:${iki(dk)}${snEk}`;
    let bolum;
    if (sa === 0 && dk === 0 && !sn) bolum = 'gece yarısı (günün başlangıcı)';
    else if (sa === 12 && dk === 0 && !sn) bolum = 'öğle (tam 12:00)';
    else bolum = pm ? 'öğleden sonra (PM / ÖS)' : 'öğleden önce (AM / ÖÖ)';
    const gecen = sa * 60 + dk;
    const r24 = ['24 saat biçimi', yirmiDort];
    const r12 = ['12 saat biçimi', onIki];
    return {
      rows: [
        ...(ek ? [r24, r12] : [r12, r24]),
        ['Türkçe kısaltmayla', turkce],
        ['Günün yarısı', bolum],
        ['Gece yarısından beri', `${h.fmt(gecen, 0)} dakika`],
        ['Gece yarısına kalan', `${h.fmt(1440 - gecen, 0)} dakika`],
      ],
      note: ek
        ? 'Girdi 12 saat biçiminde (AM/PM) kabul edildi. 12 AM gece yarısı (00:00), 12 PM öğle (12:00) olarak çevrilir.'
        : 'Girdi 24 saat biçiminde kabul edildi. 00:00 gece yarısı 12:00 AM, 12:00 öğle 12:00 PM olarak gösterilir.',
    };
  },
  cases: [
    { in: { saat: '15:30' }, out: { '12 saat biçimi': '3:30 PM', '24 saat biçimi': '15:30', 'Türkçe kısaltmayla': 'ÖS 3:30', 'Gece yarısından beri': '930 dakika' } },
    { in: { saat: '12:00 AM' }, out: { '24 saat biçimi': '00:00', 'Günün yarısı': 'gece yarısı (günün başlangıcı)', 'Gece yarısından beri': '0 dakika' } },
    { in: { saat: '12:00 PM' }, out: { '24 saat biçimi': '12:00', 'Günün yarısı': 'öğle (tam 12:00)' } },
    { in: { saat: '00:15' }, out: { '12 saat biçimi': '12:15 AM', 'Türkçe kısaltmayla': 'ÖÖ 12:15' } },
    { in: { saat: '11:59 pm' }, out: { '24 saat biçimi': '23:59', 'Gece yarısına kalan': '1 dakika' } },
    { in: { saat: '7 ös' }, out: { '24 saat biçimi': '19:00', '12 saat biçimi': '7:00 PM' } },
    { in: { saat: '9:05:30 a.m.' }, out: { '24 saat biçimi': '09:05:30', '12 saat biçimi': '9:05:30 AM' } },
    { in: { saat: '12:45' }, out: { '12 saat biçimi': '12:45 PM', 'Günün yarısı': 'öğleden sonra (PM / ÖS)' } },
    { in: { saat: '2359' }, out: { '12 saat biçimi': '11:59 PM' } },
    { in: { saat: '13:00 PM' }, error: true },
    { in: { saat: '25:00' }, error: true },
    { in: { saat: '10:75' }, error: true },
    { in: { saat: '' }, error: true },
  ],
  howto: [
    'Çevirmek istediğiniz saati "Saat" alanına yazın.',
    '12 saat biçiminden çeviriyorsanız sonuna AM ya da PM (ya da ÖÖ, ÖS) ekleyin: 3:30 PM. 24 saat biçiminden çeviriyorsanız yalnızca saati yazın: 15:30.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında diğer gösterimler yer alır.',
    'Sonucu kopyalayıp davetiyeye, toplantı notuna ya da rezervasyon formuna yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'AM ve PM ne demek?', p: [
      '12 saat biçiminde gün iki yarıya bölünür ve her yarıda saatler 12, 1, 2 … 11 diye sayılır. Hangi yarıda olunduğunu göstermek için saate bir kısaltma eklenir. <strong>AM</strong>, Latince "ante meridiem" yani "öğleden önce"; <strong>PM</strong> ise "post meridiem" yani "öğleden sonra" demektir. Türkçede bunların karşılığı ÖÖ (öğleden önce) ve ÖS (öğleden sonra) kısaltmalarıdır.',
      'Türkiye\'de yazılı dilde, resmî yazışmalarda, ulaşım tarifelerinde ve televizyon yayın akışlarında 24 saat biçimi kullanılır. Konuşurken ise "akşam yedi", "sabah dokuz buçuk" gibi 12 saatlik anlatım yaygındır. AM/PM yazımıyla en çok yabancı kaynaklı uçuş ve otel rezervasyonlarında, uluslararası toplantı davetlerinde, yurt dışı yayın saatlerinde ve dili İngilizce ayarlanmış cihazlarda karşılaşılır.',
    ] },
    { h: 'Çevirme kuralları', p: [
      '12 saat biçiminden 24 saat biçimine geçerken dört kural yeterlidir:',
    ], ul: [
      '<strong>12 AM</strong> ile başlayan saatlerde 12 yerine 00 yazılır: 12:15 AM = 00:15.',
      '<strong>1 AM – 11 AM</strong> arası saatler aynen kalır: 9:05 AM = 09:05.',
      '<strong>12 PM</strong> ile başlayan saatler aynen kalır: 12:45 PM = 12:45.',
      '<strong>1 PM – 11 PM</strong> arası saatlere 12 eklenir: 3:30 PM = 15:30, 11:59 PM = 23:59.',
    ] },
    { h: 'Ters yönde çeviri ve çözümlü örnek', p: [
      '24 saat biçiminden 12 saat biçimine geçerken saat 00 ise 12 AM, 01–11 arasındaysa aynı saat AM, 12 ise 12 PM, 13–23 arasındaysa saatten 12 çıkarılıp PM yazılır. Dakika ve saniye hiçbir zaman değişmez.',
      'Örnek: 15:30 saatini çevirelim. Saat 13 ile 23 arasında olduğundan 15 − 12 = 3 bulunur ve PM eklenir; sonuç <strong>3:30 PM</strong>, Türkçe kısaltmayla ÖS 3:30\'dur. Gece yarısından itibaren 15 × 60 + 30 = 930 dakika geçmiştir. Tersine, 7 ÖS yazıldığında 7 + 12 = 19 bulunur ve sonuç 19:00 olur.',
    ] },
    { h: '12 AM ve 12 PM karışıklığı', p: [
      '12 saat biçiminin en çok hata yaptıran yeri 12 ile başlayan saatlerdir. Yaygın kullanımda <strong>12:00 AM gece yarısını</strong>, yani günün başladığı anı; <strong>12:00 PM ise öğleyi</strong> gösterir. Akılda tutmanın kolay yolu şudur: 12:01 PM öğleden bir dakika sonradır ve öğleden sonraki yarıya aittir; 12:00 PM de onunla aynı yarıda sayılır. Aynı şekilde 12:01 AM gece yarısından bir dakika sonradır.',
      'Bu belirsizlik yüzünden bilet, sözleşme ve son başvuru saatlerinde "12 AM" yerine çoğu zaman "11:59 PM" ya da "12:01 AM" yazılır. Bir son tarihin "Cuma 12:00 AM" olarak verilmesi, Perşembe\'yi Cuma\'ya bağlayan gece yarısı anlamına gelir; Cuma gecesi değil. Önemli bir randevu ya da uçuş saatinde tereddüt varsa karşı taraftan 24 saat biçimiyle teyit almak en güvenli yoldur.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '12:00 AM = 00:00 · 1:00 AM = 01:00 · 6:00 AM = 06:00',
      '9:00 AM = 09:00 · 11:00 AM = 11:00 · 12:00 PM = 12:00',
      '1:00 PM = 13:00 · 2:00 PM = 14:00 · 3:00 PM = 15:00',
      '4:00 PM = 16:00 · 5:00 PM = 17:00 · 6:00 PM = 18:00',
      '7:00 PM = 19:00 · 8:00 PM = 20:00 · 9:00 PM = 21:00',
      '10:00 PM = 22:00 · 11:00 PM = 23:00 · 11:59 PM = 23:59',
    ] },
    { h: 'Aracın kabul ettiği yazımlar', p: [
      'Saat ile dakika arasında iki nokta ya da nokta kullanabilirsiniz: 15:30 ve 15.30 aynıdır. Dakika yazmazsanız tam saat kabul edilir; "7 PM" 19:00 olarak çevrilir. Dört haneli bitişik yazım da tanınır: 2359, 23:59 demektir. Saniye eklemek isterseniz üçüncü bir parça yazın: 9:05:30 AM. Kısaltmalar büyük ya da küçük harfle, noktalı ya da noktasız yazılabilir: am, AM, a.m., pm, PM, p.m., öö, ös.',
      'Kısaltma ekli bir saatte saat kısmı 1 ile 12 arasında olmalıdır; "13:00 PM" gibi karışık yazımlar hata verir. Kısaltmasız yazımda 00–23 arası kabul edilir; 24:00 yazılırsa gün sonu anlamında 00:00 sayılır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca gösterim biçimini çevirir; saat dilimi ya da yaz saati dönüşümü yapmaz. Yurt dışındaki bir etkinliğin Türkiye saatiyle karşılığını bulmak için önce saat farkını hesaba katmanız, ardından biçimi çevirmeniz gerekir. Gece yarısından beri geçen ve gece yarısına kalan dakika değerleri saniye hanesini dikkate almaz.',
    ] },
  ],
  faq: [
    ['12 AM gece mi, öğle mi?', 'Yaygın kullanımda 12 AM gece yarısıdır ve 24 saat biçiminde 00:00 olarak yazılır. Öğle saati ise 12 PM, yani 12:00\'dir.'],
    ['PM saatini 24 saate nasıl çeviririm?', '1 PM ile 11 PM arasındaki saatlere 12 ekleyin: 5 PM, 5 + 12 = 17:00 eder. 12 PM istisnadır ve 12:00 olarak kalır.'],
    ['Saat 00:30 AM/PM biçiminde nasıl yazılır?', '12:30 AM olarak yazılır. 24 saat biçiminde 00 ile başlayan saatler, 12 saat biçiminde 12 AM ile başlar.'],
    ['ÖÖ ve ÖS ne anlama gelir?', 'ÖÖ "öğleden önce", ÖS "öğleden sonra" demektir ve AM ile PM\'nin Türkçe karşılıklarıdır. Türkçe ayarlı bazı cihazlar saati bu kısaltmalarla ve kısaltma başta olacak biçimde gösterir: ÖS 3:30.'],
    ['Bir gün 12 saat biçiminde hangi saatte başlar ve biter?', 'Gün 12:00 AM (00:00) ile başlar ve 11:59 PM (23:59) ile biter. 12:00 AM yeni günün ilk anıdır, önceki günün son anı değil.'],
    ['Askerî saat ile 24 saat biçimi aynı mı?', 'Temelde aynı sayma düzenidir. Askerî yazımda saat ile dakika arasına iki nokta konmaz ve dört hane bitişik yazılır: 15:30 yerine 1530. Araç bu bitişik yazımı da kabul eder.'],
    ['Cihazımın saatini 24 saat biçimine nasıl alırım?', 'Telefon ve bilgisayarlarda bu seçenek genellikle tarih ve saat ayarlarında "24 saat biçimini kullan" adıyla bulunur. Menü adı cihaza ve sürüme göre değişebilir.'],
    ['Yazdığım saat bir yere kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız saat sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['saat-hesapla', 'calisma-suresi-hesapla', 'sure-toplama', 'saat-acisi-hesapla', 'saniye-sure-cevir'],
};
