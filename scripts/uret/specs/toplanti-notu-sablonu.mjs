export default {
  slug: 'toplanti-notu-sablonu',
  title: 'Toplantı Notu Şablonu Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Toplantı Notu Şablonu Oluştur – Yazdırılabilir Toplantı Tutanağı PDF',
  description: 'Katılımcı listesi, gündem, görüşme notları ve sorumlu ile son tarih sütunlu karar tablosu içeren toplantı notu şablonunu A4 ya da A5 PDF olarak oluşturun.',
  card: 'Katılımcılar, gündem, notlar ve sorumlusu belli karar tablosu içeren toplantı notu sayfasını PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['toplantı notu şablonu', 'toplantı tutanağı örneği', 'toplantı notu pdf', 'yazdırılabilir toplantı formu', 'toplantı gündemi şablonu', 'toplantı karar tablosu', 'boş toplantı tutanağı'],
  lead: 'Toplantıda konuşulanların kaybolmaması için tek sayfalık bir <strong>toplantı notu şablonu</strong> oluşturun. Sayfada toplantı bilgileri, işaretlenebilir katılımcı listesi, numaralı gündem, serbest not alanı ve her kararın sorumlusu ile son tarihinin yazıldığı bir tablo bulunur.',
  button: 'Şablonu oluştur',
  inputs: [
    { id: 'ad', label: 'Toplantı adı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Haftalık Ekip Toplantısı', hint: 'En fazla 40 karakter. Boş bırakırsanız "Toplantı Notu" yazılır.' },
    { id: 'tarih', label: 'Toplantı tarihi (isteğe bağlı)', type: 'date', hint: 'Boş bırakırsanız tarih alanı elle yazmak için boş basılır.' },
    { id: 'adet', label: 'Sayfa (kopya) sayısı', type: 'number', value: '1', hint: '1 ile 20 arasında; aynı sayfadan çoğaltılır.' },
    { id: 'gundem', label: 'Gündem satırı', type: 'select', options: [['6', '6 madde'], ['4', '4 madde'], ['8', '8 madde']] },
    { id: 'karar', label: 'Karar satırı', type: 'select', options: [['8', '8 satır'], ['5', '5 satır'], ['10', '10 satır']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'kisiler', label: 'Katılımcılar (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir ad\nÖrn. Ayşe Yılmaz', hint: 'En fazla 12 kişi, her ad en fazla 26 karakter. Boş bırakırsanız 12 boş satır basılır.', wide: true },
  ],
  compute(v, h) {
    const ad = (v.ad || '').trim() || 'Toplantı Notu';
    if (ad.length > 40) h.err('Toplantı adı en fazla 40 karakter olabilir.');
    const tarih = String(v.tarih || '').trim() ? h.date(v.tarih, 'Toplantı tarihi') : null;
    const n = h.posint(v.adet, 'Sayfa sayısı');
    if (n > 20) h.err('Sayfa sayısı en fazla 20 olabilir; daha fazlası için dosyayı birden çok kez yazdırın.');
    const kisi = h.lines(v.kisiler);
    if (kisi.length > 12) h.err('En fazla 12 katılımcı yazabilirsiniz; kalabalık toplantılarda listeyi boş bırakıp elle doldurun.');
    for (const p of kisi) if (p.length > 26) h.err(`"${p.slice(0, 18)}…" adı 26 karakterden uzun; kısaltın.`);
    const g = ['4', '6', '8'].includes(v.gundem) ? Number(v.gundem) : 6;
    const kr = ['5', '8', '10'].includes(v.karar) ? Number(v.karar) : 8;
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const tarihYazi = tarih ? `${h.fmtDate(tarih)} ${h.gunAdi(tarih)}` : '';
    const sayfa = () => {
      const ops = [];
      const hat = (x1, y1, x2) => ops.push(['cizgi', x1, y1, x2, y1, { kalinlik: 0.2, ton: 0.6 }]);
      // Etiket + doldurma çizgisi (ya da hazır değer)
      const alan = (x1, x2, y, etiket, deger) => {
        ops.push(['yazi', etiket, x1, y, F(8), { kalin: true }]);
        const lw = etiket.length * F(8) * 0.21 + 1.5 * k;
        if (deger) ops.push(['yazi', deger, x1 + lw, y, F(8)]);
        else hat(x1 + lw, y + 0.8 * k, x2);
      };
      ops.push(['yazi', ad, m, m + 7 * k, F(16), { kalin: true }]);
      ops.push(['yazi', 'Toplantı no: ________', W - m, m + 7 * k, F(9), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      let y = m + 14 * k;
      // Toplantı bilgileri
      ops.push(['kutu', m, y, iw, 16 * k, { cizgi: 0.55, dolgu: 0.96 }]);
      alan(m + 2 * k, m + iw * 0.36, y + 6 * k, 'Tarih:', tarihYazi);
      alan(m + iw * 0.39, m + iw * 0.62, y + 6 * k, 'Saat:', '');
      alan(m + iw * 0.65, m + iw - 2 * k, y + 6 * k, 'Yer:', '');
      alan(m + 2 * k, m + iw * 0.5 - 1.5 * k, y + 13 * k, 'Yöneten:', '');
      alan(m + iw * 0.5 + 1.5 * k, m + iw - 2 * k, y + 13 * k, 'Notu tutan:', '');
      y += 19 * k;
      // Katılımcılar: 3 sütun × 4 satır
      ops.push(['kutu', m, y, iw, 31 * k, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Katılımcılar', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      ops.push(['yazi', 'Gelenleri işaretleyin', m + iw - 2 * k, y + 5.2 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const cw = (iw - 4 * k) / 3;
      for (let j = 0; j < 12; j++) {
        const cx = m + 2 * k + (j % 3) * cw, cy = y + 12 * k + Math.floor(j / 3) * 5.6 * k;
        ops.push(['kutu', cx, cy - 3 * k, 3.4 * k, 3.4 * k, { cizgi: 0.4 }]);
        if (kisi[j]) ops.push(['yazi', kisi[j], cx + 5.2 * k, cy, F(8)]);
        else if (!kisi.length || j >= kisi.length) hat(cx + 5.2 * k, cy + 0.5 * k, cx + cw - 3 * k);
      }
      y += 34 * k;
      // Gündem
      const gh = 7 * k + g * 6.5 * k;
      ops.push(['kutu', m, y, iw, gh, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Gündem', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      for (let j = 0; j < g; j++) {
        const ly = y + 7 * k + (j + 1) * 6.5 * k - 1.6 * k;
        ops.push(['yazi', `${j + 1}.`, m + 2 * k, ly - 0.4 * k, F(8), { ton: 0.4 }]);
        hat(m + 8 * k, ly, m + iw - 2 * k);
      }
      y += gh + 3 * k;
      // Alt bölümlerin yüksekliği: karar tablosu + sonraki toplantı satırı
      const kh = 7 * k + kr * 7 * k, sonH = 9 * k;
      const notH = H - m - sonH - 3 * k - kh - 3 * k - y;
      // Görüşme notları (esnek)
      ops.push(['kutu', m, y, iw, notH, { cizgi: 0.55 }]);
      ops.push(['yazi', 'Görüşme notları', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      const ns = Math.max(2, Math.floor((notH - 8 * k) / (7 * k))), na = (notH - 8 * k) / ns;
      for (let j = 1; j <= ns; j++) hat(m + 2 * k, y + 7 * k + j * na - 1 * k, m + iw - 2 * k);
      y += notH + 3 * k;
      // Kararlar tablosu
      const cNo = 8 * k, cS = 34 * k, cT = 26 * k, cI = iw - cNo - cS - cT;
      ops.push(['kutu', m, y, iw, 7 * k, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['kutu', m, y + 7 * k, iw, kh - 7 * k, { cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Karar / yapılacak iş', m + cNo + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + cNo + cI + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Son tarih', m + cNo + cI + cS + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      for (const x of [m + cNo, m + cNo + cI, m + cNo + cI + cS]) ops.push(['cizgi', x, y, x, y + kh, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < kr; j++) {
        const ry = y + 7 * k + j * 7 * k;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + 4.8 * k, F(8), { hiza: 'orta', ton: 0.4 }]);
      }
      y += kh + 3 * k;
      // Sonraki toplantı
      ops.push(['kutu', m, y, iw, sonH, { cizgi: 0.55, dolgu: 0.96 }]);
      alan(m + 2 * k, m + iw * 0.55, y + 5.9 * k, 'Sonraki toplantı:', '');
      alan(m + iw * 0.58, m + iw - 2 * k, y + 5.9 * k, 'Saat / yer:', '');
      return ops;
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) sayfalar.push(sayfa());
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Tarih alanı', tarihYazi || 'Elle yazılacak'],
        ['Katılımcı listesi', kisi.length ? `${kisi.length} kişi yazıldı` : 'Elle yazılacak'],
        ['Gündem', `${g} madde`],
        ['Karar tablosu', `${kr} satır`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'toplanti-notu-sablonu', baslik: ad, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { adet: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'Tarih alanı': 'Elle yazılacak', 'Katılımcı listesi': 'Elle yazılacak', 'Gündem': '6 madde', 'Karar tablosu': '8 satır', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { adet: '4', tarih: '2026-11-18', ad: 'Haftalık Ekip Toplantısı', kisiler: 'Ayşe Yılmaz\nMehmet Kaya\nZeynep Demir' }, out: { 'Sayfa sayısı': '4 sayfa', 'Tarih alanı': '18.11.2026 Çarşamba', 'Katılımcı listesi': '3 kişi yazıldı' }, pdfSayfa: 4 },
    { in: { adet: '1', tarih: '2027-01-01', boyut: 'a5', gundem: '8', karar: '10' }, out: { 'Tarih alanı': '01.01.2027 Cuma', 'Gündem': '8 madde', 'Karar tablosu': '10 satır', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { adet: '20', tarih: '29.02.2028', gundem: '4', karar: '5' }, out: { 'Sayfa sayısı': '20 sayfa', 'Tarih alanı': '29.02.2028 Salı', 'Gündem': '4 madde', 'Karar tablosu': '5 satır' }, pdfSayfa: 20 },
    { in: { adet: '2', tarih: '2026-11-16', boyut: 'a5', kisiler: 'A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL' }, out: { 'Tarih alanı': '16.11.2026 Pazartesi', 'Katılımcı listesi': '12 kişi yazıldı' }, pdfSayfa: 2 },
    { in: { adet: '21' }, error: true },
    { in: { adet: '1', tarih: '2027-02-30' }, error: true },
    { in: { adet: '1', kisiler: 'A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM' }, error: true },
    { in: { adet: '1', ad: 'Bu toplantı adı kırk karakter sınırını fazlasıyla aşan bir addır' }, error: true },
  ],
  howto: [
    'İsterseniz toplantının adını ve tarihini yazın. İkisi de isteğe bağlıdır; boş bıraktığınız alanlar sayfada elle doldurulacak çizgiler olarak basılır.',
    'Düzenli katılanları biliyorsanız adlarını satır satır yazın. Her ad, yanında işaret kutusuyla basılır; toplantıda yalnızca gelenleri işaretlersiniz.',
    'Gündem ve karar tablosu için satır sayısını seçin. Bu iki bölüm küçüldükçe ortadaki görüşme notları alanı büyür.',
    'Kâğıt boyutunu ve kaç kopya istediğinizi belirleyip "Şablonu oluştur" düğmesine basın.',
    'Önizlemeyi kontrol edin, "PDF indir" ile kaydedin ve dikey yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfanın bölümleri', p: [
      'Sayfa, bir toplantının akışını yukarıdan aşağıya izleyecek biçimde düzenlenmiştir. Başlığın altındaki açık gri şeritte <strong>toplantı bilgileri</strong> yer alır: tarih, saat, yer, toplantıyı yöneten kişi ve notu tutan kişi. Tarihi araca yazdıysanız gün adıyla birlikte hazır basılır. Sağ üstteki "Toplantı no" alanı, düzenli toplantıları sıraya koymak isteyenler içindir.',
      'İkinci bölüm üç sütuna dizilmiş on iki satırlık <strong>katılımcı listesidir</strong>. Her satırın başında küçük bir kutu vardır; adlar hazır basıldıysa toplantı başında gelenleri işaretlemek birkaç saniye sürer. Ardından numaralı <strong>gündem</strong> satırları gelir. Sayfanın ortasındaki çizgili <strong>görüşme notları</strong> alanı, seçtiğiniz gündem ve karar satırı sayısına göre kendiliğinden genişler ya da daralır.',
      'Sayfanın en önemli kısmı alttaki <strong>karar tablosudur</strong>. Dört sütunu vardır: sıra numarası, karar ya da yapılacak iş, sorumlu kişi ve son tarih. En altta, bir sonraki toplantının tarihini, saatini ve yerini yazacağınız ince bir şerit bulunur.',
    ] },
    { h: 'İyi bir toplantı notu neyi kaydeder?', p: [
      'Toplantı notu, konuşulan her cümlenin dökümü değildir. Amacı, toplantıya katılmamış birinin sayfayı okuyup üç soruya yanıt bulabilmesidir: Ne konuşuldu, neye karar verildi, kim neyi ne zamana kadar yapacak? Bu yüzden görüşme notları alanına tartışmanın tamamını değil, varılan sonucu ve sonucun gerekçesini yazmak yeterlidir.',
      'Karar tablosundaki "Sorumlu" ve "Son tarih" sütunları bilerek ayrı tutulmuştur. Sorumlusu yazılmamış bir iş genellikle kimsenin işi olmaz; tarihi yazılmamış bir iş ise bir sonraki toplantıda yeniden konuşulur. Bir satıra birden fazla kişi yazmak yerine tek bir sorumlu belirleyip diğerlerini iş açıklamasında anmak takibi kolaylaştırır.',
    ] },
    { h: 'Doldurma örneği', p: [
      'Bir mahalle derneğinin yönetim toplantısını düşünelim. Tarihe 18 Kasım 2026 yazdığınızda sayfada "18.11.2026 Çarşamba" basılı gelir. Katılımcı kutusuna beş yönetim kurulu üyesinin adı önceden yazılmıştır; toplantıya dördü gelir ve dört kutu işaretlenir. Gündemde üç madde vardır: kış kermesi, aidat borçları ve salonun boyanması.',
      'Görüşme notlarına her madde için bir iki cümle düşülür: "Kermes 12 Aralık cumartesi yapılacak, yer okul bahçesi" gibi. Karar tablosuna ise üç satır yazılır: "Okul müdürlüğünden izin almak" – Zeynep Hanım – 25 Kasım; "Aidat hatırlatma yazısını hazırlamak" – Mehmet Bey – 30 Kasım; "Boya için iki teklif almak" – Ayşe Hanım – 5 Aralık. Sonraki toplantı satırına 9 Aralık yazılır. Bir sonraki toplantının ilk işi, bu sayfayı açıp üç satırın akıbetini sormaktır.',
    ] },
    { h: 'Kullanım önerileri', ul: [
      '<strong>Gündemi önceden yazın.</strong> Sayfayı toplantıdan önce yazdırıp gündem satırlarını doldurmak, toplantının dağılmasını önler.',
      '<strong>Not tutanı baştan belirleyin.</strong> Herkesin not aldığı toplantıda çoğu zaman ortak bir kayıt oluşmaz; sayfada bu yüzden ayrı bir alan vardır.',
      '<strong>Kararları toplantı bitmeden okuyun.</strong> Son iki dakikada tabloyu yüksek sesle okumak, yanlış anlaşılan sorumlulukları anında ortaya çıkarır.',
      '<strong>Sayfayı paylaşın.</strong> Doldurulan sayfanın fotoğrafını çekip katılımcılara göndermek, ayrıca temize çekme zahmetini azaltır.',
      '<strong>Dosyalayın.</strong> Toplantı numarası sırasıyla bir klasörde biriken sayfalar, aylar sonra "bunu ne zaman kararlaştırmıştık?" sorusunun yanıtıdır.',
    ] },
    { h: 'Yazdırma ve çoğaltma', p: [
      'Kopya sayısı alanına birden büyük bir sayı yazarsanız aynı sayfa PDF içinde o kadar kez yinelenir; düzenli toplantılar için bir aylık ya da bir dönemlik seti tek seferde yazdırabilirsiniz. Tarihi her toplantıda farklı olacak sayfalar için tarih alanını boş bırakmak daha kullanışlıdır.',
      'Yazdırma penceresinde ölçeği %100 ya da "gerçek boyut" seçin. A5 boyutu not defterine ya da ajandaya sığar; A4 kâğıda "sayfa başına 2 sayfa" seçeneğiyle iki A5 şablon bastırıp ortadan kesebilirsiniz. A5 sayfada yazı alanı daraldığı için gündem ve karar satırlarını az tutmak rahat eder.',
    ] },
    { h: 'Sınırlar', p: [
      'Şablon en fazla 12 katılımcı adını basar; daha kalabalık toplantılar için ayrı bir imza föyü kullanmak gerekir. Toplantı adı 40, katılımcı adları 26 karakterle sınırlıdır. Sayfa genel amaçlı bir not ve karar kaydıdır; şirket genel kurulu, yönetim kurulu kararı gibi resmî geçerlilik aranan tutanakların biçim ve imza koşulları ilgili mevzuata göre ayrıca belirlenir, bu şablon onların yerini tutmaz. Dosya doldurulabilir form değildir; yazdırılıp elle doldurulur.',
    ] },
  ],
  faq: [
    ['Toplantı notu şablonu ücretsiz mi?', 'Evet. Araç ücretsizdir ve kayıt gerektirmez; oluşturduğunuz PDF dosyasını iş yerinde, okulda ya da dernekte dilediğiniz kadar çoğaltabilirsiniz.'],
    ['Tarihi boş bırakırsam ne olur?', 'Tarih alanı, saat ve yer alanları gibi elle doldurulacak bir çizgi olarak basılır. Aynı sayfayı farklı günlerdeki toplantılar için çoğaltacaksanız tarihi boş bırakmanız daha uygundur.'],
    ['Katılımcı adlarını yazmak zorunda mıyım?', 'Hayır. Kutuyu boş bırakırsanız on iki boş satır basılır ve adları toplantıda elle yazarsınız. Ad yazarsanız, yazdığınız kişiler basılı gelir; kalan satırlar konuklar için boş bırakılır.'],
    ['Gündem ve karar satırlarını neden seçiyorum?', 'Sayfanın yüksekliği sabittir. Gündem ve karar tablosuna ayrılan satırlar azaldıkça ortadaki görüşme notları alanı büyür. Kısa, karar odaklı toplantılarda karar satırını artırın; tartışma ağırlıklı toplantılarda azaltın.'],
    ['Bu şablon resmî tutanak yerine geçer mi?', 'Hayır. Şablon gündelik toplantıların not ve karar takibi içindir. Resmî geçerlilik gerektiren tutanaklar için kurumunuzun ve ilgili mevzuatın öngördüğü biçimi kullanmalısınız.'],
    ['Birden fazla sayfa süren toplantılarda ne yapmalıyım?', 'Kopya sayısını artırıp ikinci sayfayı devam sayfası olarak kullanabilirsiniz. Sağ üstteki toplantı numarasına aynı numarayı yazıp yanına "2" eklemek sayfaların karışmasını önler.'],
    ['Şablonu bilgisayarda doldurabilir miyim?', 'Dosya form alanı içermeyen düz bir PDF\'tir. Tablet kalemiyle üzerine yazabilirsiniz, ancak klavyeyle doldurmak için tasarlanmamıştır.'],
    ['Yazdığım toplantı adı ve katılımcı adları saklanıyor mu?', 'Hayır. PDF tarayıcınızda üretilir; toplantı adı, tarih ve katılımcı adları hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['proje-planlayici', 'yapilacaklar-listesi-olustur', 'haftalik-planlayici', 'hedef-planlayici', 'gunluk-planlayici'],
};
