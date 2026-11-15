export default {
  slug: 'duzeltilmis-yas-hesapla',
  title: 'Prematüre Bebek Düzeltilmiş Yaş Hesaplama',
  h1Tail: 'erken doğan bebekler için',
  pageTitle: 'Prematüre Bebek Düzeltilmiş Yaş Hesaplama – Erken Doğum Yaşı',
  description: 'Erken doğan bebeğinizin düzeltilmiş yaşını hesaplayın. Doğum tarihi ve doğum haftasını girin; takvim yaşı, düzeltilmiş yaş ve beklenen doğum tarihi çıksın.',
  card: 'Prematüre bebeğinizin doğum tarihini ve doğum haftasını girin; düzeltilmiş yaşını ay, hafta ve gün olarak görün.',
  category: 'saglik',
  keywords: ['düzeltilmiş yaş hesaplama', 'prematüre bebek yaşı', 'erken doğan bebek yaş hesaplama', 'düzeltilmiş ay hesaplama', 'prematüre gelişim yaşı', 'düzeltilmiş yaş nedir', 'kronolojik yaş düzeltilmiş yaş'],
  lead: 'Erken doğan bir bebeğin gelişimi, doğduğu günden değil <strong>doğması beklenen günden</strong> itibaren sayılan düzeltilmiş yaşla değerlendirilir. Doğum tarihini ve doğumdaki gebelik haftasını yazın; takvim yaşını, düzeltilmiş yaşı ve aradaki farkı görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'dogum', label: 'Doğum tarihi', type: 'date' },
    { id: 'hafta', label: 'Doğumdaki gebelik haftası', type: 'number', placeholder: 'Örn. 32', hint: '22 ile 40 arasında tamamlanmış hafta.' },
    { id: 'gun', label: 'Ek gün (0–6)', type: 'number', value: '0', hint: 'Örn. 32 hafta 4 günlük doğum için 4.' },
    { id: 'bugun', label: 'Hesap tarihi (boş = bugün)', type: 'date' },
  ],
  compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const hafta = h.int(v.hafta, 'Doğumdaki gebelik haftası');
    const ek = String(v.gun ?? '').trim() === '' ? 0 : h.int(v.gun, 'Ek gün');
    if (hafta < 22 || hafta > 40) h.err('"Doğumdaki gebelik haftası" 22 ile 40 arasında olmalı.');
    if (ek < 0 || ek > 6) h.err('"Ek gün" 0 ile 6 arasında olmalı.');
    const gebelikGun = hafta * 7 + ek;
    if (gebelikGun > 280) h.err('Gebelik süresi 40 haftayı geçiyor; bu durumda yaş düzeltmesi gerekmez.');
    const bugun = h.dateOrToday(v.bugun, 'Hesap tarihi');
    const takvimGun = h.gunFarki(dogum, bugun);
    if (takvimGun < 0) h.err('Hesap tarihi doğum tarihinden önce olamaz; tarihleri kontrol edin.');
    const erken = 280 - gebelikGun;
    const beklenen = h.gunEkle(dogum, erken);
    const duzGun = takvimGun - erken;

    const ayEkle = (d, n) => {
      const toplam = d.getUTCFullYear() * 12 + d.getUTCMonth() + n;
      const y = Math.floor(toplam / 12), m = toplam % 12;
      const son = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), son)));
    };
    const yas = (a, b) => {
      let ay = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth());
      if (ayEkle(a, ay).getTime() > b.getTime()) ay--;
      const g = h.gunFarki(ayEkle(a, ay), b);
      const p = [];
      if (ay >= 12) p.push(Math.floor(ay / 12) + ' yıl');
      if (ay % 12) p.push((ay % 12) + ' ay');
      if (g || !p.length) p.push(g + ' gün');
      return p.join(' ');
    };
    const hg = (n) => `${Math.floor(n / 7)} hafta ${n % 7} gün`;

    const rows = [];
    if (duzGun >= 0) {
      rows.push(['Düzeltilmiş yaş', yas(beklenen, bugun)]);
      rows.push(['Düzeltilmiş yaş (hafta)', hg(duzGun)]);
    } else {
      rows.push(['Düzeltilmiş yaş', `Beklenen doğum tarihine ${-duzGun} gün var`]);
      rows.push(['Gebelik haftası karşılığı', hg(280 + duzGun)]);
    }
    rows.push(['Takvim (kronolojik) yaşı', yas(dogum, bugun)]);
    rows.push(['Takvim yaşı (hafta)', hg(takvimGun)]);
    rows.push(['Erken doğum süresi', `${hg(erken)} (${erken} gün)`]);
    rows.push(['Beklenen doğum tarihi', h.fmtDate(beklenen)]);
    let note = 'Düzeltilmiş yaş = takvim yaşı − (40 hafta − doğumdaki gebelik haftası). Gelişim basamakları ve büyüme eğrileri genellikle iki yaşına kadar düzeltilmiş yaşa göre izlenir.';
    if (gebelikGun >= 259) note = '37. haftayı tamamlayan doğumlar zamanında doğum sayılır; bu durumda yaş düzeltmesi genellikle uygulanmaz. ' + note;
    return { rows, note };
  },
  cases: [
    { in: { dogum: '2026-01-01', hafta: '32', gun: '0', bugun: '2026-07-01' }, out: { 'Düzeltilmiş yaş': '4 ay 5 gün', 'Düzeltilmiş yaş (hafta)': '17 hafta 6 gün', 'Takvim (kronolojik) yaşı': '6 ay', 'Takvim yaşı (hafta)': '25 hafta 6 gün', 'Erken doğum süresi': '8 hafta 0 gün (56 gün)', 'Beklenen doğum tarihi': '26.02.2026' } },
    { in: { dogum: '2026-03-15', hafta: '28', gun: '3', bugun: '2026-09-15' }, out: { 'Düzeltilmiş yaş': '3 ay 11 gün', 'Düzeltilmiş yaş (hafta)': '14 hafta 5 gün', 'Takvim (kronolojik) yaşı': '6 ay', 'Erken doğum süresi': '11 hafta 4 gün (81 gün)', 'Beklenen doğum tarihi': '04.06.2026' } },
    { in: { dogum: '2026-06-01', hafta: '30', gun: '0', bugun: '2026-06-15' }, out: { 'Düzeltilmiş yaş': 'Beklenen doğum tarihine 56 gün var', 'Gebelik haftası karşılığı': '32 hafta 0 gün', 'Takvim (kronolojik) yaşı': '14 gün', 'Beklenen doğum tarihi': '10.08.2026' } },
    { in: { dogum: '2026-01-10', hafta: '37', gun: '0', bugun: '2026-04-10' }, out: { 'Düzeltilmiş yaş': '2 ay 10 gün', 'Düzeltilmiş yaş (hafta)': '9 hafta 6 gün', 'Takvim (kronolojik) yaşı': '3 ay', 'Beklenen doğum tarihi': '31.01.2026' } },
    { in: { dogum: '2025-11-20', hafta: '34', gun: '2', bugun: '2027-11-20' }, out: { 'Düzeltilmiş yaş': '1 yıl 10 ay 21 gün', 'Düzeltilmiş yaş (hafta)': '98 hafta 4 gün', 'Takvim (kronolojik) yaşı': '2 yıl', 'Beklenen doğum tarihi': '30.12.2025' } },
    { in: { dogum: '2026-05-05', hafta: '40', gun: '0', bugun: '2026-05-05' }, out: { 'Düzeltilmiş yaş': '0 gün', 'Erken doğum süresi': '0 hafta 0 gün (0 gün)', 'Beklenen doğum tarihi': '05.05.2026' } },
    { in: { dogum: '2026-01-01', hafta: '45', gun: '0', bugun: '2026-07-01' }, error: true },
    { in: { dogum: '2026-07-01', hafta: '32', gun: '0', bugun: '2026-01-01' }, error: true },
    { in: { dogum: '', hafta: '32', gun: '0', bugun: '2026-07-01' }, error: true },
  ],
  howto: [
    '"Doğum tarihi" alanına bebeğinizin doğduğu günü girin.',
    '"Doğumdaki gebelik haftası" alanına bebeğin kaç haftalıkken doğduğunu yazın; epikrizde ya da taburcu belgesinde "32+4" gibi geçiyorsa haftaya 32, ek güne 4 yazın.',
    'Bugünden farklı bir gün için hesap yapacaksanız (örneğin kontrol randevusu günü) "Hesap tarihi" alanını doldurun; boş bırakırsanız bugünün tarihi kullanılır.',
    '"Hesapla" düğmesine basın. Düzeltilmiş yaş, takvim yaşı, erken doğum süresi ve beklenen doğum tarihi listelenir.',
  ],
  sections: [
    { h: 'Düzeltilmiş yaş nedir?', p: [
      'Gebelik ortalama 40 hafta sürer. 37. hafta tamamlanmadan doğan bebeklere prematüre (erken doğmuş) bebek denir. Bu bebekler, anne karnında geçirmeleri gereken sürenin bir bölümünü dışarıda tamamlar. Bu yüzden iki ay erken doğmuş dört aylık bir bebeğin, zamanında doğmuş dört aylık bir bebekle aynı becerileri göstermesi beklenmez; gelişim açısından iki aylık bir bebeğe daha yakındır.',
      '<strong>Takvim yaşı</strong> (kronolojik yaş) bebeğin doğduğu günden bugüne geçen süredir. <strong>Düzeltilmiş yaş</strong> ise bebek tam 40. haftada doğmuş olsaydı kaç aylık olacağını gösterir. Aradaki fark, bebeğin ne kadar erken doğduğuna eşittir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Önce erken doğum süresi bulunur: <strong>erken doğum süresi = 40 hafta − doğumdaki gebelik haftası</strong>. Ardından bu süre takvim yaşından çıkarılır: <strong>düzeltilmiş yaş = takvim yaşı − erken doğum süresi</strong>. Aynı sonuca, beklenen doğum tarihinden bugüne kadar geçen süre sayılarak da ulaşılır; araç ay ve gün gösterimini bu yolla, hafta gösterimini gün farkından hesaplar.',
      'Hesap gün duyarlılığında yapılır: 40 hafta 280 gün kabul edilir, doğumdaki gebelik süresi hafta × 7 + ek gün olarak güne çevrilir. Beklenen doğum tarihi, doğum tarihine erken doğum süresinin eklenmesiyle bulunur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '1 Ocak 2026\'da, 32. gebelik haftasında doğan bir bebeği düşünelim. Erken doğum süresi 40 − 32 = 8 hafta, yani 56 gündür. Beklenen doğum tarihi 1 Ocak\'a 56 gün eklenerek <strong>26 Şubat 2026</strong> bulunur.',
      '1 Temmuz 2026\'da bebeğin takvim yaşı tam 6 aydır (181 gün, 25 hafta 6 gün). Düzeltilmiş yaş 181 − 56 = 125 gün, yani 17 hafta 6 gündür; takvim üzerinden sayıldığında 26 Şubat\'tan 1 Temmuz\'a <strong>4 ay 5 gün</strong> eder. Bu bebek için kontrolde 6 aylık değil, yaklaşık 4 aylık bir bebeğin gelişim basamakları esas alınır.',
    ] },
    { h: 'Düzeltilmiş yaş nerede kullanılır?', ul: [
      '<strong>Gelişim basamakları:</strong> baş tutma, dönme, oturma, emekleme, yürüme ve ilk sözcükler gibi becerilerin beklenen zamanı düzeltilmiş yaşa göre değerlendirilir.',
      '<strong>Büyüme takibi:</strong> boy, kilo ve baş çevresi ölçümleri büyüme eğrilerine çoğunlukla düzeltilmiş yaşla işlenir.',
      '<strong>Ek gıdaya geçiş ve uyku düzeni:</strong> zamanlama konusunda hekimler düzeltilmiş yaşı ve bebeğin hazır olma belirtilerini birlikte dikkate alır.',
      '<strong>Aşılar:</strong> aşı takvimi genel kural olarak düzeltilmiş yaşa göre değil, takvim yaşına göre uygulanır. Bebeğinize özel durumlar için aşı takvimini izleyen sağlık kuruluşuna danışın.',
    ] },
    { h: 'Düzeltme ne zamana kadar yapılır?', p: [
      'Yaygın uygulama, düzeltmenin bebek iki yaşına gelene kadar sürdürülmesidir. Bu yaştan sonra birkaç haftalık ya da aylık fark, çocuklar arasındaki doğal gelişim farklılıklarının içinde kaybolur. Çok erken doğmuş bebeklerde hekimler düzeltmeyi daha uzun süre kullanmayı tercih edebilir.',
      'Bebek beklenen doğum tarihine henüz ulaşmadıysa düzeltilmiş yaş sıfırın altındadır. Araç bu durumda negatif bir yaş yazmak yerine beklenen doğum tarihine kaç gün kaldığını ve bebeğin anne karnında olsaydı hangi gebelik haftasında bulunacağını gösterir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Doğum haftası yerine bebeğin doğumdaki kilosuna göre tahmin yürütmek. Düzeltme yalnızca gebelik haftasına dayanır; düşük doğum ağırlığı tek başına ölçüt değildir.',
      'Erken doğum süresini ay olarak yuvarlayıp çıkarmak. "İki ay erken" denilen bebek 7 hafta da 9 hafta da erken doğmuş olabilir; gün üzerinden hesap bu belirsizliği ortadan kaldırır.',
      'Düzeltilmiş yaşı resmî işlemlerde kullanmak. Nüfus kaydı, okul çağı ve aşı takvimi gibi konularda geçerli olan her zaman gerçek doğum tarihidir.',
    ] },
    { h: 'Uyarı', p: [
      'Bu hesap bilgilendirme amaçlıdır. Her prematüre bebek kendi hızında gelişir; düzeltilmiş yaşa göre de gecikme olduğunu düşünüyorsanız ya da bebeğinizin beslenmesi, kilo alımı ve hareketleriyle ilgili kaygınız varsa çocuk sağlığı uzmanınıza ya da yenidoğan izlem polikliniğine başvurun.',
    ] },
  ],
  faq: [
    ['Düzeltilmiş yaş nasıl hesaplanır?', 'Bebeğin takvim yaşından erken doğduğu süre çıkarılır. Erken doğum süresi 40 haftadan doğumdaki gebelik haftası çıkarılarak bulunur. Örneğin 30 haftalık doğan 5 aylık bir bebeğin düzeltilmiş yaşı, 10 haftalık erken doğum süresi düşüldüğünde yaklaşık 2 ay 3 haftadır.'],
    ['Kaç haftalık doğan bebek prematüre sayılır?', '37. gebelik haftasını tamamlamadan doğan bebekler prematüre kabul edilir. 37. hafta ve sonrasındaki doğumlar zamanında doğum sayıldığı için yaş düzeltmesi genellikle yapılmaz.'],
    ['Düzeltilmiş yaş kaç yaşına kadar kullanılır?', 'Çoğunlukla iki yaşına kadar kullanılır. Çok erken doğan bebeklerde hekim bu süreyi uzatabilir. İki yaşından sonra değerlendirmeler genellikle takvim yaşına göre yapılır.'],
    ['Aşılar düzeltilmiş yaşa göre mi yapılır?', 'Genel kural olarak hayır; aşılar bebeğin doğum tarihinden sayılan takvim yaşına göre uygulanır. Kilo ya da sağlık durumuna bağlı özel kararları bebeğinizi izleyen hekim verir.'],
    ['Doğum haftasını tam bilmiyorum, ne yapmalıyım?', 'Doğum haftası hastane çıkış özetinde (epikriz) ya da bebek izlem kartında yazar. Ek gün bilgisini bilmiyorsanız 0 bırakabilirsiniz; sonuç en fazla altı gün farklı çıkar.'],
    ['Sonuçta "beklenen doğum tarihine gün var" yazıyor, bu ne demek?', 'Bebeğiniz henüz doğması beklenen güne ulaşmamış demektir. Bu dönemde düzeltilmiş yaş sıfırın altındadır; araç bunun yerine kalan günü ve karşılık gelen gebelik haftasını gösterir.'],
    ['İkiz bebekler için ayrı ayrı mı hesaplamalıyım?', 'İkizler aynı gün ve aynı gebelik haftasında doğduğu için düzeltilmiş yaşları aynıdır; tek hesap yeterlidir. Gelişimleri ise birbirinden farklı ilerleyebilir.'],
    ['Bebeğimin doğum tarihi bir yere kaydediliyor mu?', 'Hayır. Tarihler yalnızca tarayıcınızda işlenir; sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.'],
  ],
  related: ['yas-hesapla', 'gebelik-hesapla', 'tarih-farki', 'cocuk-boy-tahmini-hesapla', 'tarih-ekle-cikar'],
};
