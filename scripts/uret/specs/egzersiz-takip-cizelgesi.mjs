export default {
  slug: 'egzersiz-takip-cizelgesi',
  title: 'Egzersiz Takip Çizelgesi Oluşturma',
  h1Tail: 'haftalık yazdırılabilir PDF',
  pageTitle: 'Egzersiz Takip Çizelgesi Oluştur – Haftalık Antrenman Çizelgesi PDF',
  description: 'Egzersizleri satırlara, günleri sütunlara yerleştiren haftalık egzersiz takip çizelgesini PDF olarak oluşturun. Tarihler hazır yazılır; süre ve zorlanma satırları vardır.',
  card: 'Hareketleri ve günleri tek tabloda gösteren, tarihleri hazır haftalık egzersiz takip çizelgesini A4 ya da A5 PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['egzersiz takip çizelgesi', 'antrenman takip çizelgesi', 'spor programı çizelgesi', 'haftalık egzersiz planı', 'fitness takip tablosu pdf', 'yazdırılabilir antrenman günlüğü', 'egzersiz günlüğü şablonu'],
  lead: 'Yaptığınız hareketleri gün gün yazabileceğiniz haftalık bir <strong>egzersiz takip çizelgesi</strong> oluşturun. Satırlarda egzersizler, sütunlarda tarihleri hazır yazılmış yedi gün bulunur; her günün toplam süresi ve zorlanma düzeyi için ayrı satırlar, altta da haftalık özet alanı vardır.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bu hafta alınır. Çizelge, seçtiğiniz günün haftasının pazartesisinden başlar.' },
    { id: 'hafta', label: 'Hafta sayısı', type: 'number', value: '4', hint: '1 ile 12 arasında. Her hafta bir sayfadır.' },
    { id: 'satir', label: 'Egzersiz satırı', type: 'select', options: [['8', '8 satır'], ['6', '6 satır (geniş)'], ['10', '10 satır']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (yatay)'], ['a5', 'A5 (yatay)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Antrenman Günlüğüm', hint: 'En fazla 40 karakter.' },
    { id: 'hareketler', label: 'Egzersizler (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir egzersiz\nÖrn. Tempolu yürüyüş', hint: 'En fazla 10 satır, her biri en fazla 28 karakter. Boş bırakırsanız egzersiz sütunu elle yazmak için boş basılır.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için aracı ikinci kez çalıştırın.');
    const har = h.lines(v.hareketler);
    if (har.length > 10) h.err('En fazla 10 egzersiz yazabilirsiniz; benzer hareketleri tek satırda birleştirin.');
    for (const e of har) if (e.length > 28) h.err(`"${e.slice(0, 18)}…" 28 karakterden uzun; kısaltın.`);
    const baslik = (v.baslik || '').trim() || 'Egzersiz Takip Çizelgesi';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const satir = Math.max(['6', '8', '10'].includes(v.satir) ? Number(v.satir) : 8, har.length);
    const a5 = v.boyut === 'a5';
    const W = a5 ? 210 : 297, H = a5 ? 148 : 210, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const GUN = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const gg = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}  ·  ${i + 1}. hafta / ${n}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const y0 = m + 14 * k, bh = 9 * k, altH = 26 * k, alt = H - m - altH - 4 * k;
      const cE = 58 * k, gw = (iw - cE) / 7, rh = (alt - y0 - bh) / (satir + 2);
      // Başlık satırı
      ops.push(['kutu', m, y0, cE, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Egzersiz', m + 2 * k, y0 + 6 * k, F(8.5), { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + cE + g * gw;
        ops.push(['kutu', x, y0, gw, bh, { dolgu: g >= 5 ? 0.84 : 0.9, cizgi: 0.55 }]);
        ops.push(['yazi', GUN[g], x + 1.5 * k, y0 + 6 * k, F(8), { kalin: true }]);
        ops.push(['yazi', gg(h.gunEkle(b, g)), x + gw - 1.5 * k, y0 + 6 * k, F(7), { hiza: 'sag', ton: 0.35 }]);
      }
      // Özet satırlarının zemini (son iki satır)
      const oy = y0 + bh + satir * rh;
      ops.push(['kutu', m, oy, iw, 2 * rh, { dolgu: 0.95, cizgi: 0.95, kalinlik: 0.1 }]);
      ops.push(['kutu', m, y0 + bh, iw, alt - y0 - bh, { cizgi: 0.55 }]);
      for (let g = 0; g < 7; g++) { const x = m + cE + g * gw; ops.push(['cizgi', x, y0 + bh, x, alt, { kalinlik: 0.25, ton: 0.55 }]); }
      for (let j = 0; j < satir + 2; j++) {
        const ry = y0 + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: j === satir ? 0.4 : 0.2, ton: j === satir ? 0.45 : 0.7 }]);
        const ty = ry + rh / 2 + 1.1 * k;
        if (j < satir) { if (har[j]) ops.push(['yazi', har[j], m + 2 * k, ty, F(8)]); }
        else ops.push(['yazi', j === satir ? 'Toplam süre (dk)' : 'Zorlanma (1–5)', m + 2 * k, ty, F(8), { kalin: true }]);
      }
      // Alt bölüm
      const ay = alt + 4 * k, w1 = iw * 0.3, w2 = (iw - w1 - 6 * k) / 2;
      ops.push(['kutu', m, ay, w1, altH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Haftalık özet', m + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Egzersiz yapılan gün: ______ / 7', m + 2 * k, ay + 13 * k, F(8)]);
      ops.push(['yazi', 'Toplam süre: __________ dk', m + 2 * k, ay + 21 * k, F(8)]);
      const kutu2 = (x, etiket) => {
        ops.push(['kutu', x, ay, w2, altH, { cizgi: 0.55 }]);
        ops.push(['yazi', etiket, x + 2 * k, ay + 5.2 * k, F(8.5), { kalin: true }]);
        for (let j = 1; j <= 3; j++) ops.push(['cizgi', x + 2 * k, ay + 6 * k + j * 6.2 * k, x + w2 - 2 * k, ay + 6 * k + j * 6.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
      };
      kutu2(m + w1 + 3 * k, 'Bu hafta nasıl geçti?');
      kutu2(m + w1 + w2 + 6 * k, 'Gelecek hafta için not');
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Egzersiz satırı', `${satir} satır`],
        ['Kâğıt', a5 ? 'A5 yatay (210 × 148 mm)' : 'A4 yatay (297 × 210 mm)'],
      ],
      note: 'Bu çizelge yalnızca kayıt tutmak içindir; tıbbi tavsiye ya da antrenman programı değildir. Yazdırırken yatay yön ve %100 ölçek seçin.',
      pdf: { ad: 'egzersiz-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: true, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '4' }, out: { 'Sayfa sayısı': '4 sayfa', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '13.12.2026 Pazar', 'Egzersiz satırı': '8 satır', 'Kâğıt': 'A4 yatay (297 × 210 mm)' }, pdfSayfa: 4 },
    { in: { baslangic: '2027-01-01', hafta: '1', boyut: 'a5', hareketler: 'Tempolu yürüyüş\nŞınav\nMekik\nPlank' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Son gün': '03.01.2027 Pazar', 'Kâğıt': 'A5 yatay (210 × 148 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-16', hafta: '12', satir: '10' }, out: { 'Sayfa sayısı': '12 sayfa', 'Son gün': '07.02.2027 Pazar', 'Egzersiz satırı': '10 satır' }, pdfSayfa: 12 },
    { in: { baslangic: '2028-02-29', hafta: '2', satir: '6' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028', 'Son gün': '12.03.2028 Pazar', 'Egzersiz satırı': '6 satır' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-22', hafta: '1', satir: '6', hareketler: 'A\nB\nC\nD\nE\nF\nG\nH\nI', baslik: 'Antrenman Günlüğüm' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026', 'Egzersiz satırı': '9 satır' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', hafta: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '2,5' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '2', hareketler: 'Bu egzersiz adı yirmi sekiz karakteri epeyce aşıyor' }, error: true },
  ],
  howto: [
    'Çizelgenin başlayacağı haftadan herhangi bir günü seçin; alan boşsa bu hafta alınır. İlk sütun her zaman o haftanın pazartesisidir.',
    'Kaç hafta takip edeceğinizi yazın. Her hafta ayrı bir sayfa olur; dört hafta yaklaşık bir aylık dönemi karşılar.',
    'Düzenli yaptığınız hareketleri alttaki kutuya satır satır yazarsanız egzersiz sütununa basılı gelir. Boş bırakırsanız satırları her hafta elle doldurursunuz.',
    'Satır sayısını, kâğıt boyutunu ve isterseniz sayfa başlığını belirleyip "Çizelgeyi oluştur" düğmesine basın.',
    'Önizlemeyi kontrol edip "PDF indir" ile kaydedin; yatay yönde ve %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Çizelgenin düzeni', p: [
      'Her sayfa bir haftadır. Sağ üstte haftanın ilk ve son günü ile çizelgedeki sırası ("2. hafta / 4" gibi) yazar. Sayfanın büyük bölümünü bir tablo kaplar: en soldaki geniş sütun egzersiz adları içindir, onu pazartesiden pazara yedi gün sütunu izler. Sütun başlarında gün adı ve gün.ay biçiminde tarih hazır basılıdır; cumartesi ve pazar başlıkları bir ton koyudur.',
      'Tablonun son iki satırı açık gri zeminle ayrılmıştır. <strong>Toplam süre (dk)</strong> satırına o gün egzersize ayırdığınız toplam dakikayı, <strong>Zorlanma (1–5)</strong> satırına ise antrenmanın size ne kadar ağır geldiğini yazarsınız. Sayfanın altında üç kutu bulunur: egzersiz yapılan gün sayısı ile toplam süreyi yazacağınız haftalık özet, haftanın nasıl geçtiğine dair kısa değerlendirme ve gelecek hafta için not.',
    ] },
    { h: 'Hücrelere ne yazılır?', p: [
      'Hücreler bilerek boş bırakılmıştır, çünkü her egzersiz türünün kaydı farklıdır. Yaygın yazım biçimleri şunlardır:',
    ], ul: [
      '<strong>Ağırlık ve direnç hareketleri:</strong> set × tekrar ve varsa ağırlık. Örneğin "3×12 / 20 kg".',
      '<strong>Yürüyüş, koşu, bisiklet:</strong> süre ya da mesafe. Örneğin "40 dk" ya da "5 km".',
      '<strong>Esneme, yoga, pilates:</strong> süre ya da yalnızca bir onay işareti.',
      '<strong>Yapılmayan gün:</strong> hücreyi boş bırakın ya da ince bir çizgi çekin; dinlenme günleri de planın parçasıdır.',
    ] },
    { h: 'Zorlanma satırı nasıl doldurulur?', p: [
      'Zorlanma puanı tamamen öznel bir kayıttır ve yalnızca sizin kendi günlerinizi birbiriyle karşılaştırmanıza yarar. Basit bir yorum şöyle olabilir: 1 çok hafif, 2 hafif, 3 orta, 4 zor, 5 çok zor. Aynı antrenman bir hafta 4, sonraki hafta 3 geliyorsa bu, alıştığınızın kâğıt üzerindeki izidir. Tersine, alışık olduğunuz bir antrenman birkaç gün üst üste beklenenden ağır geliyorsa yorgunluk, uykusuzluk ya da hastalık başlangıcı gibi nedenleri düşünüp temponuzu düşürmek yerinde olur.',
    ] },
    { h: 'Örnek bir hafta', p: [
      'Başlangıç tarihine 18 Kasım 2026 yazdığınızda ilk sayfa 16 Kasım pazartesi ile 22 Kasım pazar arasını gösterir; sütun başlarında 16.11\'den 22.11\'e tarihler yazılıdır. Egzersiz kutusuna "Tempolu yürüyüş", "Şınav", "Mekik" ve "Plank" yazdığınızı düşünelim.',
      'Pazartesi sütununda yürüyüş satırına "35 dk", şınav satırına "3×10", plank satırına "3×30 sn" yazılır; toplam süre 50, zorlanma 3 olur. Salı boş kalır. Çarşamba yalnızca yürüyüş yapılmıştır: "45 dk", toplam 45, zorlanma 2. Cuma günü pazartesinin aynısı tekrarlanır, şınav "3×12" olmuştur. Pazar akşamı özet kutusuna "3 / 7" ve "145 dk" yazılır. Dört hafta sonra dört sayfayı yan yana koyduğunuzda şınav satırındaki sayıların nasıl değiştiğini tek bakışta görürsünüz.',
    ] },
    { h: 'Kayıt tutmanın yararı', p: [
      'Egzersizde ilerleme çoğu zaman yavaştır ve günden güne fark edilmez. Yazılı kayıt, dört hafta önce ne yaptığınızı hatırlamaya çalışmak yerine ona bakmanızı sağlar. Ayrıca çizelgeyi görünür bir yere asmak, boş kalan sütunları da görünür kılar; pek çok kişi için bir sonraki antrenmanı hatırlatan şey budur.',
      'Çizelge bir program önermez; hangi hareketi kaç kez yapacağınıza siz ya da birlikte çalıştığınız antrenör karar verir. Kâğıdın işi yalnızca yapılanı kaydetmektir. Bu yüzden hem spor salonu programlarında hem evde yapılan kısa egzersizlerde hem de fizik tedavi sonrası verilen ev egzersizlerinin takibinde kullanılabilir.',
    ] },
    { h: 'Sağlık uyarısı', p: [
      'Bu çizelge bir kayıt aracıdır; <strong>tıbbi tavsiye, tanı ya da kişiye özel antrenman programı değildir</strong>. Kronik bir rahatsızlığınız, kalp ya da eklem sorununuz varsa, hamileyseniz, uzun süredir hareketsizseniz ya da egzersiz sırasında göğüs ağrısı, baş dönmesi, alışılmadık nefes darlığı gibi belirtiler yaşıyorsanız egzersize başlamadan ya da devam etmeden önce hekime danışın. Hareketlerin doğru biçimi için yetkin bir antrenörden ya da fizyoterapistten destek almak sakatlanma riskini azaltır.',
    ] },
    { h: 'Yazdırma önerileri ve sınırlar', p: [
      'Yazdırırken kâğıt yönünü yatay, ölçeği %100 seçin. A4 sayfa spor salonunda klipsli altlıkla kullanmaya, A5 sayfa spor çantasında taşımaya uygundur. Birkaç haftalık çıktıyı üst kenarından zımbalayıp bloknot gibi kullanabilirsiniz.',
      'Bir dosyada en fazla 12 hafta ve 10 egzersiz satırı yer alır. Egzersiz adları 28, başlık 40 karakterle sınırlıdır. Haftalar pazartesi başlar. Çizelge elle doldurulmak üzere tasarlanmıştır; doldurulabilir form alanı içermez ve girdiğiniz değerleri toplamaz.',
    ] },
  ],
  faq: [
    ['Egzersiz takip çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez; PDF dosyasını dilediğiniz kadar indirip yazdırabilirsiniz.'],
    ['Egzersiz adlarını yazmadan çizelge alabilir miyim?', 'Evet. Egzersizler kutusunu boş bırakırsanız sol sütun boş satırlarla basılır. Programı haftadan haftaya değişenler için bu daha kullanışlıdır.'],
    ['Yazdığım egzersiz sayısı satır sayısını aşarsa ne olur?', 'Tablo yazdığınız egzersiz sayısına göre uzatılır. Altı satır seçip dokuz egzersiz yazarsanız çizelge dokuz satırla basılır. En fazla on egzersiz yazabilirsiniz.'],
    ['Her gün farklı hareketler yapıyorsam nasıl kullanırım?', 'Tüm hareketleri alt alta yazın ve yalnızca yaptığınız günlerin hücresini doldurun. Örneğin bacak hareketleri salı ve cuma, kol hareketleri pazartesi ve perşembe sütunlarında dolu olur.'],
    ['Zorlanma puanını neye göre vermeliyim?', 'Kendi hissinize göre. 1 çok hafif, 5 çok zor olacak biçimde antrenman bittiğinde aklınıza gelen ilk sayıyı yazın. Puan başkalarıyla karşılaştırmak için değil, kendi haftalarınızı karşılaştırmak içindir.'],
    ['Bu çizelge bana bir antrenman programı veriyor mu?', 'Hayır. Çizelge yalnızca boş bir kayıt tablosudur; hangi egzersizi ne sıklıkta yapacağınızı önermez. Program için antrenöre, sağlık durumunuzla ilgili sorular için hekime danışın.'],
    ['On iki haftadan uzun takip yapabilir miyim?', 'Aracı yeniden çalıştırıp başlangıç tarihini önceki dosyanın bittiği haftanın ertesi pazartesisi seçin. Hafta sırası yeniden 1\'den başlar, tarihler kesintisiz devam eder.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; egzersiz adlarınız, tarihleriniz ve başlığınız sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['aliskanlik-takip-cizelgesi', 'su-icme-takip-cizelgesi', 'uyku-takip-cizelgesi', 'haftalik-planlayici', 'otuz-gunluk-hedef-cizelgesi'],
};
