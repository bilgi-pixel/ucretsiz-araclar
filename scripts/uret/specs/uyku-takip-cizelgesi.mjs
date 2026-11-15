export default {
  slug: 'uyku-takip-cizelgesi',
  title: 'Uyku Takip Çizelgesi Oluşturma',
  h1Tail: 'yazdırılabilir uyku günlüğü',
  pageTitle: 'Uyku Takip Çizelgesi Oluştur – Yazdırılabilir Uyku Günlüğü PDF',
  description: 'Yatış, kalkış ve uyku süresini gece gece kaydedeceğiniz uyku takip çizelgesini PDF olarak oluşturun. Boyamalı saat ızgarası ya da saat yazmalı tablo; tarihler hazır.',
  card: 'Tarihleri hazır, boyamalı saat ızgaralı ya da saat yazmalı uyku takip çizelgesini A4 ya da A5 PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['uyku takip çizelgesi', 'uyku günlüğü şablonu', 'uyku çizelgesi pdf', 'yazdırılabilir uyku takibi', 'uyku düzeni tablosu', 'uyku saatleri çizelgesi', 'iki haftalık uyku günlüğü'],
  lead: 'Uyku düzeninizi kâğıt üzerinde görmek için bir <strong>uyku takip çizelgesi</strong> oluşturun. Her sayfa on dört geceyi alt alta gösterir; uyuduğunuz saatleri boyadığınız bir ızgarayı ya da saatleri yazdığınız bir tabloyu seçebilirsiniz. Tarihler ve gün adları hazır basılır.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'İlk gece', type: 'date', hint: 'Takibin başlayacağı akşamın tarihi. Boş bırakırsanız bugün alınır.' },
    { id: 'hafta', label: 'Takip süresi (hafta)', type: 'number', value: '2', hint: '1 ile 12 arasında. Her sayfada iki hafta (14 gece) bulunur.' },
    { id: 'duzen', label: 'Düzen', type: 'select', options: [['izgara', 'Saat ızgarası (boyamalı)'], ['tablo', 'Tablo (saat yazmalı)']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Uyku Günlüğüm', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'İlk gece');
    const n = h.posint(v.hafta, 'Takip süresi');
    if (n > 12) h.err('Takip süresi en fazla 12 hafta olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Uyku Takip Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const izgara = v.duzen !== 'tablo';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const gece = n * 7, sayfaSay = Math.ceil(gece / 14);
    const sayfalar = [];
    for (let s = 0; s < sayfaSay; s++) {
      const adet = Math.min(14, gece - s * 14), b = h.gunEkle(ilk, s * 14), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, adet - 1))}  ·  sayfa ${s + 1} / ${sayfaSay}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 10 * k, altH = 22 * k, rh = (H - m - altH - 4 * k - y0 - bh) / 14, th = bh + adet * rh;
      const cG = 30 * k, cK = 30 * k, xK = m + iw - cK;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gece', m + 2 * k, y0 + 6.3 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Kalite', xK + cK / 2, y0 + 4.2 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      for (let j = 0; j < 5; j++) ops.push(['yazi', String(j + 1), xK + (j + 0.5) * cK / 5, y0 + 8.6 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      // Hafta sonu geceleri hafif gri
      for (let j = 0; j < adet; j++) {
        const hg = h.gunEkle(b, j).getUTCDay();
        if (hg === 0 || hg === 6) ops.push(['kutu', m, y0 + bh + j * rh, iw, rh, { dolgu: 0.95, cizgi: 0.95, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      ops.push(['cizgi', m + cG, y0, m + cG, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
      ops.push(['cizgi', xK, y0, xK, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
      if (izgara) {
        // 20:00 → 12:00, 16 saat, 32 yarım saatlik kutu
        const cS = 16 * k, xS = xK - cS, gw = (xS - m - cG) / 32;
        ops.push(['cizgi', xS, y0, xS, y0 + th, { kalinlik: 0.25, ton: 0.5 }]);
        ops.push(['yazi', 'Süre', xS + cS / 2, y0 + 4.2 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', '(saat)', xS + cS / 2, y0 + 8.6 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
        for (let c = 0; c < 32; c++) {
          const x = m + cG + c * gw, saat = (20 + c / 2) % 24;
          if (c % 2 === 0) {
            ops.push(['yazi', String(saat).padStart(2, '0'), x + gw, y0 + 6.3 * k, F(7), { hiza: 'orta', kalin: saat === 0 }]);
            if (c) ops.push(['cizgi', x, y0 + bh, x, y0 + th, { kalinlik: saat === 0 ? 0.5 : 0.25, ton: saat === 0 ? 0.25 : 0.55 }]);
          } else ops.push(['cizgi', x, y0 + bh, x, y0 + th, { kalinlik: 0.15, ton: 0.82 }]);
        }
      } else {
        const AD = ['Yatağa girdim', 'Uyudum', 'Uyandım', 'Kalktım', 'Toplam uyku', 'Gece uyanma'], cw = 24 * k;
        for (let c = 0; c < 6; c++) {
          const x = m + cG + c * cw;
          if (c) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
          ops.push(['yazi', AD[c], x + cw / 2, y0 + 6.3 * k, F(7), { kalin: true, hiza: 'orta' }]);
          if (c < 4) for (let j = 0; j < adet; j++) ops.push(['yazi', ':', x + cw / 2, y0 + bh + j * rh + rh / 2 + 1 * k, F(8), { hiza: 'orta', ton: 0.6 }]);
        }
        const xN = m + cG + 6 * cw;
        ops.push(['cizgi', xN, y0, xN, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
        ops.push(['yazi', 'Not', xN + 2 * k, y0 + 6.3 * k, F(7), { kalin: true }]);
      }
      for (let j = 0; j < adet; j++) {
        const ry = y0 + bh + j * rh, d = h.gunEkle(b, j), cy = ry + rh / 2;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: j === 7 ? 0.45 : 0.2, ton: j === 7 ? 0.4 : 0.7 }]);
        ops.push(['yazi', gg(d), m + 2 * k, cy + 1.1 * k, F(8.5), { kalin: true }]);
        ops.push(['yazi', KISA[d.getUTCDay()], m + cG - 2 * k, cy + 1.1 * k, F(7.5), { hiza: 'sag', ton: 0.4 }]);
        const r = Math.min(2 * k, rh * 0.3);
        for (let q = 0; q < 5; q++) ops.push(['daire', xK + (q + 0.5) * cK / 5, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
      }
      // Alt bölüm: açıklama + özet kutusu
      const ay = H - m - altH, ow = iw * 0.34, ox = m + iw - ow;
      const AC = [
        izgara ? 'Uyuduğunuz yarım saatlik kutuları boyayın; yatağa girdiğiniz anı Y, kalktığınız anı K ile işaretleyin.' : 'Saatleri sabah kalkınca yazın; yaklaşık değerler yeterlidir. "Gece uyanma" sütununa kaç kez uyandığınızı yazın.',
        'Satırdaki tarih, gecenin başladığı akşamı gösterir. Kalite: 1 çok kötü – 5 çok iyi.',
        'Bu çizelge kayıt tutmak içindir; tıbbi tavsiye ya da tanı aracı değildir.',
      ];
      AC.forEach((t, j) => ops.push(['yazi', t, m, ay + (5 + j * 6) * k, F(7.5), { ton: j === 2 ? 0.45 : 0.3 }]));
      ops.push(['kutu', ox, ay, ow, altH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Bu sayfanın özeti', ox + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Ortalama uyku süresi: ________ saat', ox + 2 * k, ay + 12.5 * k, F(8)]);
      ops.push(['yazi', 'Ortalama kalite: ________ / 5', ox + 2 * k, ay + 19 * k, F(8)]);
      sayfalar.push(ops);
    }
    const son = h.gunEkle(ilk, gece - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${sayfaSay} sayfa`],
        ['Takip süresi', `${n} hafta (${gece} gece)`],
        ['İlk gece', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`],
        ['Son gece', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Düzen', izgara ? 'Saat ızgarası (20.00–12.00)' : 'Saat yazmalı tablo'],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge kayıt tutmak içindir, tıbbi tavsiye değildir. Yazdırırken yatay yön ve %100 ölçek seçin.',
      pdf: { ad: 'uyku-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '4' }, out: { 'Sayfa sayısı': '2 sayfa', 'Takip süresi': '4 hafta (28 gece)', 'İlk gece': '18.11.2026 Çarşamba', 'Son gece': '15.12.2026 Salı', 'Düzen': 'Saat ızgarası (20.00–12.00)' }, pdfSayfa: 2 },
    { in: { baslangic: '2027-01-01', hafta: '1', duzen: 'tablo', boyut: 'a5' }, out: { 'Sayfa sayısı': '1 sayfa', 'İlk gece': '01.01.2027 Cuma', 'Son gece': '07.01.2027 Perşembe', 'Düzen': 'Saat yazmalı tablo', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', hafta: '2' }, out: { 'İlk gece': '29.02.2028 Salı', 'Son gece': '13.03.2028 Pazartesi', 'Sayfa sayısı': '1 sayfa' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-16', hafta: '12', duzen: 'tablo' }, out: { 'Sayfa sayısı': '6 sayfa', 'Takip süresi': '12 hafta (84 gece)', 'Son gece': '07.02.2027 Pazar' }, pdfSayfa: 6 },
    { in: { baslangic: '2026-11-16', hafta: '3', boyut: 'a5', baslik: 'Uyku Günlüğüm' }, out: { 'Sayfa sayısı': '2 sayfa', 'Son gece': '06.12.2026 Pazar' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-18', hafta: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '0' }, error: true },
    { in: { baslangic: '2026-13-01', hafta: '2' }, error: true },
  ],
  howto: [
    'Takibe başlayacağınız akşamın tarihini seçin; boş bırakırsanız bugün alınır. Çizelge tam o günden başlar, haftanın başına yuvarlanmaz.',
    'Takip süresini hafta olarak yazın. Her sayfaya iki hafta sığar; tek sayıda hafta seçerseniz son sayfada yedi satır bulunur.',
    'Düzeni seçin: "Saat ızgarası" uyuduğunuz saatleri boyayarak, "Tablo" ise yatış ve kalkış saatlerini yazarak kayıt tutmak içindir.',
    'Kâğıt boyutunu ve isterseniz başlığı belirleyip "Çizelgeyi oluştur" düğmesine basın.',
    'Önizlemeyi kontrol edin, "PDF indir" ile kaydedin; yatay yönde ve %100 ölçekle yazdırıp başucunuza koyun.',
  ],
  sections: [
    { h: 'İki düzen arasındaki fark', p: [
      '<strong>Saat ızgarası</strong> düzeninde her gece için akşam 20.00\'den ertesi gün öğlen 12.00\'ye uzanan on altı saatlik bir şerit bulunur. Şerit yarım saatlik otuz iki kutuya bölünmüştür; saat başları koyu, buçuklar açık çizgiyle ayrılır ve gece yarısı (00) daha kalın bir çizgiyle belirtilir. Uyuduğunuz kutuları boyarsınız. Birkaç gece sonra boyalı bölümler alt alta dizilir ve uyku saatlerinizin ne kadar düzenli olduğu, hafta sonu ne kadar kaydığı ya da gece ortasındaki boşluklar bir resim gibi görünür.',
      '<strong>Tablo</strong> düzeninde ızgara yerine altı dar sütun vardır: yatağa girdiğiniz saat, yaklaşık uykuya daldığınız saat, uyandığınız saat, yataktan kalktığınız saat, toplam uyku süresi ve gece kaç kez uyandığınız. Sağda serbest bir not sütunu bulunur. Sayılarla çalışmayı seven ya da hekimine saatleri net aktarmak isteyenler için bu düzen daha uygundur.',
      'Her iki düzende de en solda tarih ile kısaltılmış gün adı, en sağda 1\'den 5\'e beş daireli kalite sütunu yer alır. Cumartesi ve pazar geceleri açık gri zeminle basılır; yedinci satırdan sonraki kalın çizgi iki haftayı ayırır.',
    ] },
    { h: 'Izgara nasıl doldurulur?', ol: [
      'Sabah kalktığınızda çizelgeyi açın. Kayıt, <em>gecenin başladığı akşamın</em> satırına yazılır: salıyı çarşambaya bağlayan gece, salı satırındadır.',
      'Yatağa girdiğiniz saatin kutusuna küçük bir Y harfi koyun.',
      'Uykuya daldığınızı tahmin ettiğiniz andan uyandığınız ana kadar olan kutuları boyayın. Gece uyanıp uzun süre uyanık kaldıysanız o kutuları boş bırakın.',
      'Yataktan çıktığınız saatin kutusuna K harfi koyun.',
      'Boyalı kutuları sayıp ikiye bölün; sonuç saat olarak uyku sürenizdir. Bunu "Süre" sütununa yazın ve kalite dairelerinden birini işaretleyin.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İlk gece olarak 18 Kasım 2026\'yı seçip dört hafta istediğinizde iki sayfa oluşur: ilk sayfa 18 Kasım çarşamba ile 1 Aralık salı arasını, ikinci sayfa 2 Aralık çarşamba ile 15 Aralık salı arasını kapsar.',
      'Çarşamba gecesi 23.30\'da yatağa girdiğinizi, gece yarısına doğru uyuduğunuzu ve sabah 07.00\'de uyanıp 07.15\'te kalktığınızı düşünelim. "18.11 Çar" satırında 23 başlıklı saatin ikinci kutusuna Y yazılır. 00 başlıklı kutudan 06 başlıklı saatin ikinci kutusuna kadar on dört kutu boyanır; 07 başlıklı ilk kutuya K konur. On dört kutu ikiye bölününce 7 eder; "Süre" sütununa 7 yazılır. Tablo düzeninde aynı gece 23:30, 00:00, 07:00, 07:15 ve toplam 7 saat olarak kaydedilir.',
    ] },
    { h: 'Kayıttan ne öğrenilir?', p: [
      'Tek bir gecenin kaydı pek bir şey söylemez; anlamlı olan iki üç haftanın yan yana görünmesidir. Sık karşılaşılan örüntüler şunlardır: hafta içi ile hafta sonu arasında yatış saatinin birkaç saat kayması, geç saatte içilen çay ya da kahveden sonra uykuya dalma süresinin uzaması, gündüz uzun şekerlemelerin ardından gecenin bölünmesi. Not sütununu ya da sayfanın kenarını bu tür etkenleri yazmak için kullanabilirsiniz.',
      'Kalite puanı özneldir ve yalnızca kendi gecelerinizi birbiriyle karşılaştırmanız içindir. Süresi uzun ama kalitesi düşük geceler ile kısa ama dinlendirici geceler arasındaki fark, yalnızca saate bakıldığında görünmez.',
    ] },
    { h: 'Sağlık uyarısı', p: [
      'Bu çizelge bir kayıt aracıdır; <strong>tıbbi tavsiye, tanı ya da tedavi yöntemi değildir</strong>. Uyku ihtiyacı yaşa ve kişiye göre değişir; araç bir süre önermez ve doldurduğunuz değerleri yorumlamaz. Haftalarca süren uykusuzluk, gündüz aşırı uyuklama, yüksek sesli horlama ve uykuda nefes durması, bacaklarda huzursuzluk gibi yakınmalarınız varsa bir hekime başvurun. Böyle bir durumda doldurulmuş çizelgeyi yanınızda götürmek, yakınmanızı anlatmanızı kolaylaştırabilir; ancak değerlendirmeyi hekim yapar.',
      'Saatleri dakikası dakikasına tutturmaya çalışmayın. Gece boyunca saate bakmak uykuyu zorlaştırabilir; sabah yapılan yaklaşık bir tahmin bu kayıt için yeterlidir.',
    ] },
    { h: 'Yazdırma önerileri ve sınırlar', p: [
      'Kâğıt yönünü yatay, ölçeği %100 seçin. Izgara düzeninde kutular A5 sayfada yaklaşık dört milimetreye iner; kurşun kalemle boyamak için yeterlidir, ancak rahat kullanım için A4 önerilir. Sayfayı kalemle birlikte komodinin üstünde tutmak, doldurmayı unutmamanın en kolay yoludur.',
      'Bir dosyada en fazla 12 hafta (altı sayfa) bulunur. Izgara 20.00–12.00 aralığını gösterir; bu aralığın dışında kalan gündüz uykularını satırın kenarına not edebilirsiniz. Gece vardiyasında çalışıp gündüz uyuyanlar için tablo düzeni daha kullanışlıdır. Çizelge elle doldurulur; süreyi sizin yerinize hesaplamaz ve verilerinizi kaydetmez.',
    ] },
  ],
  faq: [
    ['Uyku takip çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez; PDF dosyasını dilediğiniz kadar indirip yazdırabilirsiniz.'],
    ['Saat ızgarası mı, tablo mu seçmeliyim?', 'Uyku düzeninizi bir bakışta görmek istiyorsanız ızgarayı, saatleri sayı olarak kaydetmek ve gece uyanma sayısını not etmek istiyorsanız tabloyu seçin. Kararsızsanız ikisinden birer hafta yazdırıp deneyebilirsiniz.'],
    ['Kaydı hangi günün satırına yazacağım?', 'Gecenin başladığı akşamın satırına. Cuma akşamı yatıp cumartesi sabahı kalktıysanız kayıt cuma satırına yazılır. Gece yarısından sonra yatsanız bile aynı kural geçerlidir.'],
    ['Izgara neden 20.00\'de başlayıp 12.00\'de bitiyor?', 'Bu aralık hem erken yatanları hem geç kalkanları kapsayacak biçimde seçilmiştir ve yarım saatlik kutuların sayfada boyanabilir genişlikte kalmasını sağlar. Bu saatlerin dışındaki uykuları satır kenarına not edebilirsiniz.'],
    ['Gündüz şekerlemelerini nasıl kaydederim?', 'Tablo düzeninde not sütununa "14.00–14.30 şekerleme" gibi yazabilirsiniz. Izgara düzeninde öğlene kadar olan kısım kutularda görünür; daha geç saatler için satırın sağındaki boşluğu kullanın.'],
    ['Kaç hafta takip etmeliyim?', 'Araç bir süre dayatmaz. Bir düzen görmek için genellikle en az iki hafta, hafta içi ve hafta sonu farkını görmek için üç dört hafta kayıt tutmak yeterli olur. Hekiminiz belirli bir süre istediyse onu esas alın.'],
    ['Bu çizelge uyku bozukluğunu teşhis eder mi?', 'Hayır. Çizelge yalnızca sizin tuttuğunuz bir kayıttır; yorum yapmaz ve tanı koymaz. Uykuyla ilgili süren bir sorununuz varsa hekime başvurun.'],
    ['Seçtiğim tarihler ya da başlık bir yere gönderiliyor mu?', 'Hayır. PDF tarayıcınızda üretilir; girdiğiniz bilgiler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ruh-hali-takip-cizelgesi', 'aliskanlik-takip-cizelgesi', 'egzersiz-takip-cizelgesi', 'su-icme-takip-cizelgesi', 'gunluk-planlayici'],
};
