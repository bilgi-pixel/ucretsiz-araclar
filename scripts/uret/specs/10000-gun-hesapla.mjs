export default {
  slug: '10000-gun-hesapla',
  title: '10.000. Gün Hesaplama',
  h1Tail: 'on bininci gününüz hangi tarihte?',
  pageTitle: '10.000. Gün Hesaplama – On Bininci Gününüz Hangi Tarihe Denk Geliyor?',
  description: 'Doğum tarihinizi yazın, hayatınızın 10.000. gününün hangi tarihe ve haftanın hangi gününe denk geldiğini, o gün kaç yaşında olacağınızı ve kalan günü öğrenin.',
  card: 'Doğum tarihinden 10.000. günün (ya da seçtiğiniz gün sayısının) tarihini, o günkü yaşı ve kalan gün sayısını bulun.',
  category: 'zaman',
  keywords: ['10000 gün hesaplama', '10.000. gün ne zaman', 'on bininci gün', 'kaç günlüğüm', 'doğum tarihinden gün hesaplama', '10000 gün kaç yıl', 'gün yaşı hesaplama'],
  lead: 'Doğduğunuz günden tam <strong>10.000 gün</strong> sonrası hangi tarihe denk geliyor? Doğum tarihinizi yazın; araç on bininci gününüzün tarihini, haftanın gününü, o gün kaç yaşında olacağınızı ve bugüne göre kaç gün kaldığını ya da kaç gün önce geçtiğini göstersin. Gün sayısını değiştirerek 5.000., 15.000. ya da 20.000. gününüzü de bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'dogum', label: 'Doğum tarihi', type: 'date' },
    { id: 'gunSayisi', label: 'Gün sayısı', type: 'number', value: '10000', hint: 'Varsayılan 10000; 5000, 20000 gibi başka bir sayı da yazabilirsiniz.' },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date' },
  ],
  compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const n = h.posint(v.gunSayisi, 'Gün sayısı');
    if (n > 60000) h.err('"Gün sayısı" en fazla 60000 olabilir (yaklaşık 164 yıl).');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden sonra olamaz; tarihleri kontrol edin.');
    const hedef = h.gunEkle(dogum, n);
    const yasadigi = h.gunFarki(dogum, bugun);
    const fark = h.gunFarki(bugun, hedef);
    // Hedef gündeki yaş: yıl, ay, gün
    let y = hedef.getUTCFullYear() - dogum.getUTCFullYear();
    let m = hedef.getUTCMonth() - dogum.getUTCMonth();
    let d = hedef.getUTCDate() - dogum.getUTCDate();
    if (d < 0) {
      m -= 1;
      d += new Date(Date.UTC(hedef.getUTCFullYear(), hedef.getUTCMonth(), 0)).getUTCDate();
    }
    if (m < 0) { y -= 1; m += 12; }
    const durum = fark > 0 ? `${h.fmt(fark, 0)} gün kaldı` : fark < 0 ? `${h.fmt(-fark, 0)} gün önce geçti` : 'Tam bugün';
    const siradaki = (Math.floor(yasadigi / 1000) + 1) * 1000;
    return {
      rows: [
        ['Hedef gün tarihi', `${h.fmtDate(hedef)} ${h.gunAdi(hedef)}`],
        ['Durum', durum],
        ['O gün yaşınız', `${y} yıl ${m} ay ${d} gün`],
        ['Bugüne kadar yaşadığınız gün', `${h.fmt(yasadigi, 0)} gün`],
        ['Sıradaki bin günlük dönüm', `${h.fmt(siradaki, 0)}. gün – ${h.fmtDate(h.gunEkle(dogum, siradaki))}`],
      ],
      note: 'Doğum günü 0. gün sayılır; hedef tarih, doğum tarihine gün sayısının eklenmesiyle bulunur. Doğduğunuz günü 1. gün sayıyorsanız sonuç bir gün öncesidir.',
    };
  },
  cases: [
    { in: { dogum: '2000-01-01', gunSayisi: '10000', bugun: '2026-11-15' }, out: { 'Hedef gün tarihi': '19.05.2027 Çarşamba', 'Durum': '185 gün kaldı', 'O gün yaşınız': '27 yıl 4 ay 18 gün', 'Bugüne kadar yaşadığınız gün': '9.815 gün', 'Sıradaki bin günlük dönüm': '10.000. gün – 19.05.2027' } },
    { in: { dogum: '1999-06-15', gunSayisi: '10000', bugun: '2026-11-15' }, out: { 'Hedef gün tarihi': '31.10.2026 Cumartesi', 'Durum': '15 gün önce geçti', 'Bugüne kadar yaşadığınız gün': '10.015 gün' } },
    { in: { dogum: '1990-03-20', gunSayisi: '10000', bugun: '2026-11-15' }, out: { 'Hedef gün tarihi': '05.08.2017 Cumartesi', 'O gün yaşınız': '27 yıl 4 ay 16 gün', 'Bugüne kadar yaşadığınız gün': '13.389 gün' } },
    { in: { dogum: '2010-05-05', gunSayisi: '5000', bugun: '2026-11-15' }, out: { 'Hedef gün tarihi': '12.01.2024 Cuma', 'O gün yaşınız': '13 yıl 8 ay 7 gün' } },
    { in: { dogum: '1980-02-29', gunSayisi: '20000', bugun: '2026-11-15' }, out: { 'Hedef gün tarihi': '02.12.2034 Cumartesi', 'Bugüne kadar yaşadığınız gün': '17.061 gün' } },
    { in: { dogum: '2000-01-01', gunSayisi: '1000', bugun: '2002-09-27' }, out: { 'Hedef gün tarihi': '27.09.2002 Cuma', 'Durum': 'Tam bugün' } },
    { in: { dogum: '', gunSayisi: '10000', bugun: '2026-11-15' }, error: true },
    { in: { dogum: '2030-01-01', gunSayisi: '10000', bugun: '2026-11-15' }, error: true },
    { in: { dogum: '2000-01-01', gunSayisi: '12,5', bugun: '2026-11-15' }, error: true },
  ],
  howto: [
    '"Doğum tarihi" alanından doğduğunuz günü, ayı ve yılı seçin.',
    '"Gün sayısı" alanını 10000 olarak bırakın ya da merak ettiğiniz başka bir sayıyı (örneğin 5000, 15000, 20000) yazın.',
    '"Bugünün tarihi" alanını boş bırakırsanız cihazınızın tarihi kullanılır; geçmişteki ya da gelecekteki bir güne göre kalan süreyi görmek isterseniz o tarihi seçin.',
    '"Hesapla" düğmesine basın. Hedef günün tarihi, haftanın günü, o günkü yaşınız ve kalan ya da geçen gün sayısı sonuç kutusunda listelenir.',
  ],
  sections: [
    { h: '10.000. gün neden kutlanır?', p: [
      'Yaşımızı yıl olarak saymaya alışığız; oysa hayat aslında günlerden oluşur ve gün sayısı da tıpkı yaş günleri gibi yuvarlak dönüm noktalarına ulaşır. Bunların en bilineni on bininci gündür. 10.000 gün, artık yılların dağılımına göre değişmekle birlikte yaklaşık <strong>27 yıl 4,5 aya</strong> karşılık gelir. Yani on bininci gününüz, 27. yaş gününüzden dört beş ay kadar sonra, sessizce gelip geçer.',
      'Sosyal medyada "bugün 10.000 günlüğüm" paylaşımlarıyla yaygınlaşan bu küçük kutlama, takvimde hiçbir özel işareti olmadığı için önceden hesaplanmadıkça fark edilmez. Bu araç tam da bunun için var: tarihi şimdiden öğrenip ajandanıza not edebilir, bir yakınınızın on bininci gününde sürpriz hazırlayabilirsiniz. Çiftler birlikteliklerinin, şirketler kuruluşlarının, ebeveynler çocuklarının 1.000. gününü de aynı yöntemle hesaplar; "Doğum tarihi" alanına başlangıç tarihini yazmanız yeterlidir.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Yöntem basittir: doğum tarihine istenen gün sayısı eklenir. Zorluk, elle sayarken ayların 28, 29, 30 ve 31 gün çekmesi ve araya giren artık yıllardır. Araç her günü tek tek takvim üzerinde ilerlettiği için 29 Şubatlar kendiliğinden hesaba katılır.',
      'Çözümlü bir örnek: 1 Ocak 2000 doğumlu biri için 10.000 gün eklendiğinde sonuç <strong>19 Mayıs 2027 Çarşamba</strong> olur. O gün kişi 27 yıl 4 ay 18 günlüktür. 15 Kasım 2026 tarihinden bakıldığında bu kişi 9.815 gün yaşamıştır ve on bininci gününe 185 gün kalmıştır. Aynı kişinin 1.000. günü ise 27 Eylül 2002 Cuma gününe denk gelmiştir; yani bin günlük olmak üç yaşını doldurmadan hemen önce gerçekleşir.',
      'Aynı gün sayısı herkes için aynı yaşa denk gelmez. 20 Mart 1990 doğumlu birinin on bininci günü 5 Ağustos 2017\'dir ve o gün yaşı 27 yıl 4 ay 16 gündür. Aradaki birkaç günlük fark, kişinin ömrüne kaç tane 29 Şubat düştüğünden ve doğduğu ayı izleyen ayların uzunluğundan kaynaklanır.',
    ] },
    { h: 'Doğum günü 0. gün mü, 1. gün mü?', p: [
      'Bu hesapta iki ayrı sayma alışkanlığı vardır ve sonuç bir gün oynar. Araç, yaş hesabındaki mantığı izler: doğduğunuz gün <strong>0. gün</strong> kabul edilir, ertesi gün "1 günlük" olursunuz ve 10.000 günlük olduğunuz tarih doğum tarihinize 10.000 gün eklenerek bulunur. İki tarih arası gün farkı veren araçlarla aynı sonucu görmenizin nedeni budur.',
      'Bazıları ise doğduğu günü "hayatımın 1. günü" olarak sayar. Bu yaklaşımda on bininci gün, aracın verdiği tarihten bir gün öncedir. Hangi tanımı benimserseniz benimseyin fark yalnızca bir gündür; kutlamayı bir gün önceye almak isterseniz gün sayısına 9999 yazmanız yeterlidir.',
    ] },
    { h: 'Yuvarlak gün sayıları ve yaklaşık yaş karşılıkları', ul: [
      '<strong>1.000. gün:</strong> yaklaşık 2 yıl 9 ay – bebeklikten çocukluğa geçiş dönemi',
      '<strong>5.000. gün:</strong> yaklaşık 13 yıl 8 ay – ortaokul yılları',
      '<strong>10.000. gün:</strong> yaklaşık 27 yıl 4,5 ay',
      '<strong>15.000. gün:</strong> yaklaşık 41 yıl 1 ay',
      '<strong>20.000. gün:</strong> yaklaşık 54 yıl 9 ay',
      '<strong>25.000. gün:</strong> yaklaşık 68 yıl 5 ay',
      '<strong>30.000. gün:</strong> yaklaşık 82 yıl 2 ay',
    ], p: [
      'Bu karşılıklar ortalama yıl uzunluğu olan 365,2425 güne göre yuvarlanmıştır; kesin tarih doğum gününüze bağlıdır. Sonuç kutusundaki "Sıradaki bin günlük dönüm" satırı, seçtiğiniz gün sayısından bağımsız olarak önünüzdeki ilk bin katını ve tarihini de gösterir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Elle hesap yaparken en sık yapılan hata, 10.000\'i 365\'e bölüp 27,4 yıl bulmak ve artık yılları unutmaktır; bu yöntem gerçek tarihten yaklaşık bir hafta sapar. İkinci yaygın hata, doğum saatini hesaba katmaya çalışmaktır. Araç takvim günü üzerinden çalışır; doğum saati ve saat dilimi dikkate alınmaz, çünkü gün sayısı kutlamaları da takvim gününe göre yapılır.',
      'Gün sayısı 1 ile 60.000 arasında bir tam sayı olmalıdır. Doğum tarihi "bugünün tarihi" olarak verilen günden sonra olamaz. Hesap Miladi (Gregoryen) takvime göredir; nüfus kaydında Rumi ya da Hicri takvimden çevrilmiş eski tarihler varsa önce Miladi karşılığını kullanın.',
    ] },
  ],
  faq: [
    ['10.000 gün kaç yıl eder?', '10.000 gün yaklaşık 27 yıl 4,5 aydır. Ortalama yıl uzunluğu 365,2425 gün alındığında 27,38 yıl bulunur. Kesin yıl, ay ve gün karşılığı, aradaki artık yıl sayısına göre kişiden kişiye birkaç gün değişir.'],
    ['On bininci günüm geçmişse ne görürüm?', 'Araç yine tarihi ve haftanın gününü gösterir; "Durum" satırında kaç gün önce geçtiği yazar. Bu durumda gün sayısını 15000 ya da 20000 yaparak sıradaki büyük dönüm noktasını öğrenebilirsiniz.'],
    ['Bugün kaç günlük olduğumu da gösteriyor mu?', 'Evet. "Bugüne kadar yaşadığınız gün" satırı, doğum tarihinizle bugünün (ya da seçtiğiniz tarihin) arasındaki gün farkını verir. Doğum gününüz bu sayıya dahil edilmez, bugün dahil edilir.'],
    ['Artık yıllar hesaba katılıyor mu?', 'Evet. Hesap takvim üzerinde gün gün ilerlediği için aradaki her 29 Şubat otomatik olarak sayılır. 29 Şubat doğumlular için de sonuç doğrudur.'],
    ['Bir ilişkinin ya da şirketin 1.000. gününü hesaplayabilir miyim?', 'Evet. Doğum tarihi alanına başlangıç tarihini (tanışma, evlilik, kuruluş günü gibi), gün sayısına da 1000 yazın. Sonuçtaki "yaş" satırı bu durumda geçen süreyi yıl, ay ve gün olarak ifade eder.'],
    ['Başka sitelerle bir gün fark çıkıyor, neden?', 'Fark sayma tanımından kaynaklanır. Bu araç doğum gününü 0. gün kabul eder; doğum gününü 1. gün sayan hesaplar bir gün erken tarih verir. Sonuç notunda bu varsayım belirtilir.'],
    ['Doğum saatim sonucu etkiler mi?', 'Hayır. Hesap takvim günlerine göre yapılır; saat ve saat dilimi dikkate alınmaz. Gece yarısına yakın doğmuş olsanız bile nüfus kaydınızdaki tarih esas alınır.'],
    ['Doğum tarihim bir yere kaydediliyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; yazdığınız tarih sunucuya gönderilmez, saklanmaz ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['kac-gundur-yasiyorum', 'yas-hesapla', 'tarih-ekle-cikar', 'tarih-farki', 'dogum-gunu-geri-sayim', 'yari-yas-hesapla'],
};
