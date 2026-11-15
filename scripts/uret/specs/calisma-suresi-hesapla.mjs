export default {
  slug: 'calisma-suresi-hesapla',
  title: 'Çalışma Süresi (Giriş Çıkış) Hesaplama',
  h1Tail: 'mola düşülmüş net süre',
  pageTitle: 'Çalışma Süresi Hesaplama – Giriş Çıkış Saatinden Net Mesai',
  description: 'Giriş ve çıkış saatini yazın, molayı düşün; net çalışma süresini saat-dakika ve ondalık saat olarak görün. Gece vardiyası, çok günlük toplam ve saatlik ücret desteklenir.',
  card: 'Giriş ve çıkış saatinden molayı düşerek net çalışma süresini saat-dakika ve ondalık saat olarak hesaplayın.',
  category: 'zaman',
  keywords: ['çalışma süresi hesaplama', 'giriş çıkış saati hesaplama', 'mesai saati hesaplama', 'net çalışma süresi', 'kaç saat çalıştım', 'puantaj saat hesaplama', 'gece vardiyası süre hesaplama'],
  lead: 'İşe giriş ve çıkış saatinizi yazın, mola süresini girin; <strong>net çalışma sürenizi</strong> hem saat ve dakika hem de puantajda kullanılan ondalık saat olarak görün. Çıkış saati girişten küçükse araç vardiyanın ertesi güne sarktığını kabul eder.',
  button: 'Hesapla',
  inputs: [
    { id: 'giris', label: 'Giriş saati', type: 'text', placeholder: 'Örn. 08:30', hint: '24 saat biçiminde yazın: 08:30, 8.30 ya da 0830.' },
    { id: 'cikis', label: 'Çıkış saati', type: 'text', placeholder: 'Örn. 17:30', hint: 'Girişten küçükse ertesi gün sayılır.' },
    { id: 'mola', label: 'Toplam mola (dakika)', type: 'number', value: '0', hint: 'Ücrete ya da süreye sayılmayan aralar.' },
    { id: 'gunSayisi', label: 'Aynı düzende çalışılan gün sayısı', type: 'number', value: '1' },
    { id: 'saatUcret', label: 'Saatlik ücret (isteğe bağlı)', type: 'number', placeholder: 'Örn. 200', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const saatOku = (s, ad) => {
      const t = String(s ?? '').trim();
      if (t === '') h.err(`"${ad}" alanını doldurun (örn. 08:30).`);
      let m = /^(\d{1,2})(?:\s*[:.,]\s*(\d{1,2}))?$/.exec(t);
      let sa;
      let dk;
      if (m) { sa = +m[1]; dk = m[2] === undefined ? 0 : +m[2]; }
      else if ((m = /^(\d{2})(\d{2})$/.exec(t))) { sa = +m[1]; dk = +m[2]; }
      else h.err(`"${ad}" alanına saati SS:DD biçiminde yazın (örn. 17:45).`);
      if (sa === 24 && dk === 0) return 1440;
      if (sa > 23 || dk > 59) h.err(`"${ad}" geçerli bir saat değil. Saat 00–23, dakika 00–59 arasında olmalı.`);
      return sa * 60 + dk;
    };
    const sure = (dk) => {
      const r = Math.round(dk);
      return `${Math.floor(r / 60)} saat ${r % 60} dakika`;
    };
    const g = saatOku(v.giris, 'Giriş saati');
    const c = saatOku(v.cikis, 'Çıkış saati');
    const mola = h.nonneg(String(v.mola ?? '').trim() === '' ? '0' : v.mola, 'Toplam mola');
    const gunSayisi = String(v.gunSayisi ?? '').trim() === '' ? 1 : h.posint(v.gunSayisi, 'Gün sayısı');
    if (g === c) h.err('Giriş ve çıkış saati aynı. Süre hesaplanabilmesi için farklı saatler yazın.');
    const gece = c < g;
    const brut = gece ? c + 1440 - g : c - g;
    if (mola >= brut) h.err('Mola süresi, giriş ile çıkış arasındaki süreden kısa olmalı.');
    const net = brut - mola;
    const rows = [
      ['Net çalışma süresi', sure(net)],
      ['Ondalık saat', `${h.fmt(net / 60, 2)} saat`],
      ['Brüt süre (mola dahil)', sure(brut)],
      ['Mola', `${h.fmt(mola, 0)} dakika`],
      ['Toplam dakika', `${h.fmt(net, 0)} dakika`],
    ];
    if (gunSayisi > 1) rows.push([`${gunSayisi} günlük toplam`, `${sure(net * gunSayisi)} (${h.fmt((net * gunSayisi) / 60, 2)} saat)`]);
    if (String(v.saatUcret ?? '').trim() !== '') {
      const u = h.nonneg(v.saatUcret, 'Saatlik ücret');
      rows.push(['Günlük tutar', h.para((net / 60) * u)]);
      if (gunSayisi > 1) rows.push([`${gunSayisi} günlük tutar`, h.para((net / 60) * u * gunSayisi)]);
    }
    return {
      rows,
      note: gece
        ? 'Çıkış saati girişten küçük olduğu için vardiyanın ertesi gün bittiği kabul edildi.'
        : 'Giriş ve çıkış aynı gün içinde kabul edildi. Tutar, net süre ile saatlik ücretin çarpımıdır; kesinti ve ek ödemeler dahil değildir.',
    };
  },
  cases: [
    { in: { giris: '08:30', cikis: '17:30', mola: '60' }, out: { 'Net çalışma süresi': '8 saat 0 dakika', 'Ondalık saat': '8 saat', 'Brüt süre (mola dahil)': '9 saat 0 dakika' } },
    { in: { giris: '09:00', cikis: '18:15', mola: '45' }, out: { 'Net çalışma süresi': '8 saat 30 dakika', 'Ondalık saat': '8,5 saat', 'Brüt süre (mola dahil)': '9 saat 15 dakika', 'Toplam dakika': '510 dakika' } },
    { in: { giris: '22:00', cikis: '06:00', mola: '30' }, out: { 'Net çalışma süresi': '7 saat 30 dakika', 'Ondalık saat': '7,5 saat', 'Brüt süre (mola dahil)': '8 saat 0 dakika' } },
    { in: { giris: '8', cikis: '17', mola: '60', gunSayisi: '5' }, out: { 'Net çalışma süresi': '8 saat 0 dakika', '5 günlük toplam': '40 saat 0 dakika (40 saat)' } },
    { in: { giris: '0830', cikis: '17.30', mola: '60', saatUcret: '200' }, out: { 'Net çalışma süresi': '8 saat 0 dakika', 'Günlük tutar': '1.600,00 TL' } },
    { in: { giris: '07:45', cikis: '16:20', mola: '0' }, out: { 'Net çalışma süresi': '8 saat 35 dakika', 'Ondalık saat': '8,58 saat', 'Toplam dakika': '515 dakika' } },
    { in: { giris: '09:00', cikis: '18:00', mola: '60', gunSayisi: '22', saatUcret: '150' }, out: { '22 günlük toplam': '176 saat 0 dakika (176 saat)', 'Günlük tutar': '1.200,00 TL', '22 günlük tutar': '26.400,00 TL' } },
    { in: { giris: '25:00', cikis: '17:00', mola: '0' }, error: true },
    { in: { giris: '09:00', cikis: '09:00', mola: '0' }, error: true },
    { in: { giris: '09:00', cikis: '10:00', mola: '90' }, error: true },
    { in: { giris: '', cikis: '17:00' }, error: true },
  ],
  howto: [
    '"Giriş saati" ve "Çıkış saati" alanlarına saatleri 24 saat biçiminde yazın. İki nokta yerine nokta kullanabilir ya da 0830 gibi bitişik yazabilirsiniz.',
    'Öğle arası, çay molası gibi çalışma süresinden düşülecek araların toplamını dakika olarak "Toplam mola" alanına girin.',
    'Aynı saatlerle birden çok gün çalıştıysanız gün sayısını yazın; haftalık ya da aylık toplamı da görürsünüz.',
    'İsterseniz saatlik ücreti girin ve "Hesapla" düğmesine basın. Net süre, ondalık saat karşılığı ve varsa tutar listelenir.',
  ],
  sections: [
    { h: 'Net çalışma süresi nasıl hesaplanır?', p: [
      'Hesap üç adımdan oluşur. Önce giriş ve çıkış saatleri gece yarısından itibaren dakikaya çevrilir: 08:30 için 8 × 60 + 30 = 510, 17:30 için 17 × 60 + 30 = 1.050 dakika. İkisinin farkı brüt süredir: 1.050 − 510 = 540 dakika, yani 9 saat. Son olarak mola düşülür: 60 dakikalık mola ile net süre 480 dakika, yani <strong>8 saat</strong> olur.',
      'Saatleri doğrudan birbirinden çıkarmaya çalışmak dakikalar söz konusu olduğunda hataya açıktır; 18:15 ile 09:00 arasını "9,15 saat" diye yazmak en sık görülen yanlıştır. Doğrusu 9 saat 15 dakikadır ve ondalık karşılığı 9,25 saattir. Bu örnekte 45 dakika mola düşüldüğünde net süre 8 saat 30 dakika, yani 8,5 saat çıkar.',
    ] },
    { h: 'Ondalık saat ne demek, neden gerekli?', p: [
      'Puantaj cetvelleri, bordro programları ve hesap tabloları süreyi çoğunlukla ondalık saat olarak ister, çünkü ücretle çarpılabilen biçim budur. Ondalık saate çevirmek için dakikayı 60\'a bölersiniz: 30 dakika 0,5 saat, 15 dakika 0,25 saat, 45 dakika 0,75 saat, 20 dakika yaklaşık 0,33 saat eder.',
      'Buna göre 7 saat 45 dakika, 7,75 saattir; 7,45 değildir. 8 saat 35 dakikalık bir gün 8,58 saat olarak yazılır. Araç her iki gösterimi de verdiği için puantaja yazarken dönüştürme hatası yapmazsınız.',
    ] },
    { h: 'Gece vardiyası ve gün aşan mesailer', p: [
      'Çıkış saati giriş saatinden küçükse araç vardiyanın gece yarısını geçtiğini varsayar ve çıkışa 24 saat ekler. 22:00\'de başlayıp 06:00\'da biten bir vardiya brüt 8 saattir; 30 dakikalık mola düşüldüğünde net 7 saat 30 dakika kalır. Sonuç kutusunun altındaki not, bu varsayımın uygulandığını ayrıca belirtir.',
      'Araç tek bir vardiyayı 24 saatten kısa kabul eder. Giriş ile çıkış aynı saatse süre belirsiz olacağından hata verir. 24 saati aşan nöbetleri iki parçaya bölerek hesaplayabilir, sonuçları süre toplama aracıyla birleştirebilirsiniz.',
    ] },
    { h: 'Haftalık ve aylık toplam', p: [
      'Her gün aynı saatlerde çalışıyorsanız gün sayısı alanı işinizi kısaltır. 08:00–17:00 arası 1 saat molayla çalışılan bir günün neti 8 saattir; 5 gün için toplam 40 saat eder. Ayda 22 gün 09:00–18:00 arası çalışan ve 1 saat mola kullanan biri için toplam 176 saattir; saatlik 150 TL ile günlük tutar 1.200,00 TL, 22 günlük tutar 26.400,00 TL olarak görünür.',
      'Günleriniz birbirinden farklıysa her günü ayrı hesaplayıp net süreleri toplamak daha doğru olur.',
    ] },
    { h: 'Kimler için kullanışlı?', ul: [
      '<strong>Saat ücretli ve yarı zamanlı çalışanlar:</strong> Hak edilen ücreti kendi kayıtlarıyla karşılaştırmak isteyenler.',
      '<strong>Serbest çalışanlar:</strong> Müşteriye saat üzerinden fatura kesenler için günlük faturalanacak süreyi bulmak.',
      '<strong>Küçük işletmeler:</strong> Giriş çıkış defterinden ya da kart okuyucu dökümünden puantaj hazırlamak.',
      '<strong>Vardiya sorumluları:</strong> Gece vardiyalarının net süresini mola düşerek hızlıca görmek.',
      '<strong>Öğrenciler ve stajyerler:</strong> Staj defterine yazılacak günlük ve toplam çalışma süresini çıkarmak.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Dakikayı ondalık sanmak: 8 saat 30 dakika 8,30 değil 8,5 saattir.',
      'Molayı hem brüt süreden düşmek hem de ayrıca çıkış saatine yansıtmak; mola yalnızca bir kez düşülmelidir.',
      'Öğleden sonraki saatleri 12 saat biçiminde yazmak: 5:30 yazarsanız araç bunu sabah 05:30 kabul eder; akşam için 17:30 yazın.',
      'Gece vardiyasında giriş ve çıkış saatlerini ters girmek; önce başlangıç, sonra bitiş yazılmalıdır.',
    ] },
    { h: 'Yasal süreler ve ücret hakkında uyarı', p: [
      'Bu araç yalnızca aritmetik yapar: iki saat arasındaki farkı bulur, molayı düşer ve isterseniz saatlik ücretle çarpar. Hangi araların çalışma süresinden sayılıp sayılmayacağı, günlük ve haftalık çalışma sınırları, fazla çalışma ve gece çalışması koşulları ile bunların ücretlendirilmesi iş mevzuatı, toplu iş sözleşmesi ve bireysel sözleşmenize göre belirlenir. Hesaplanan tutar brüt-net ayrımı, kesinti, prim ya da zamlı ödeme içermez. Sonuçlar bilgilendirme amaçlıdır; hak ve alacak hesabı için güncel mevzuatı kontrol edin ve gerekirse bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['08:30 ile 17:30 arası kaç saat eder?', 'Brüt süre 9 saattir. 1 saatlik öğle arası düşüldüğünde net çalışma süresi 8 saat olur. Mola alanına 60 yazarak bu sonucu doğrudan görebilirsiniz.'],
    ['Gece yarısını geçen vardiyayı nasıl hesaplarım?', 'Girişe başlangıç saatini, çıkışa bitiş saatini olduğu gibi yazın; örneğin 22:00 ve 06:00. Çıkış saati daha küçük olduğu için araç ertesi günü kabul eder ve 8 saatlik brüt süreyi bulur.'],
    ['7 saat 45 dakika ondalık olarak kaç saattir?', '7,75 saattir. Dakikayı 60\'a bölerek ondalığa çevirirsiniz: 45 ÷ 60 = 0,75. Yaygın karşılıklar: 15 dakika 0,25; 30 dakika 0,5; 45 dakika 0,75 saat.'],
    ['Birden fazla molam var, nasıl gireceğim?', 'Tüm molaları toplayıp tek sayı olarak dakika cinsinden yazın. Örneğin 45 dakikalık öğle arası ve iki adet 15 dakikalık çay molası için 75 girin.'],
    ['Saatleri AM/PM olarak yazabilir miyim?', 'Hayır, araç 24 saat biçimini bekler. Öğleden sonraki saatlere 12 ekleyin: 3:15 PM yerine 15:15 yazın. Dönüştürme için ilgili araçlar bölümündeki 12-24 saat çeviriciyi kullanabilirsiniz.'],
    ['Hesaplanan tutar maaşımı gösterir mi?', 'Hayır. Tutar yalnızca net süre ile yazdığınız saatlik ücretin çarpımıdır. Vergi, sigorta kesintisi, fazla çalışma zammı, prim ve benzeri kalemler hesaba katılmaz.'],
    ['Her gün farklı saatlerde çalışıyorum, toplamı nasıl bulurum?', 'Her günü ayrı ayrı hesaplayıp net süreleri not alın, ardından süre toplama aracıyla hepsini toplayın. Gün sayısı alanı yalnızca aynı saatlerin tekrarlandığı durumlar içindir.'],
    ['Yazdığım saatler ve ücret bilgisi kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz saatler ve ücret hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['saat-hesapla', 'sure-toplama', '12-24-saat-cevir', 'is-gunu-hesapla', 'dakika-sure-cevir', 'sure-bolme-carpma'],
};
