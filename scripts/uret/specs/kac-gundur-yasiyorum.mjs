export default {
  slug: 'kac-gundur-yasiyorum',
  title: 'Kaç Gündür Yaşıyorum Hesaplama',
  h1Tail: 'gün, hafta, saat',
  pageTitle: 'Kaç Gündür Yaşıyorum? Doğduğumdan Beri Geçen Gün Hesaplama',
  description: 'Doğum tarihinizi girin; doğduğunuzdan bu yana kaç gün, hafta, ay, saat ve dakika geçtiğini görün. Bir sonraki yuvarlak gün sayısına ulaşacağınız tarihi de verir.',
  card: 'Doğduğunuzdan bugüne kaç gün, hafta, saat ve dakika geçtiğini; sıradaki yuvarlak gün sayısının tarihini öğrenin.',
  category: 'zaman',
  keywords: ['kaç gündür yaşıyorum', 'doğduğumdan beri kaç gün geçti', 'kaç günlüğüm', 'yaşadığım gün sayısı', 'kaç saattir yaşıyorum', 'kaç haftalığım', 'gün olarak yaş hesaplama'],
  lead: 'Doğum tarihinizi yazın; <strong>doğduğunuzdan bu yana geçen süreyi</strong> gün, hafta, ay, saat, dakika ve saniye olarak görün. Araç ayrıca bir sonraki yuvarlak gün sayısına hangi tarihte ulaşacağınızı da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'dogum', label: 'Doğum tarihi', type: 'date', hint: 'GG.AA.YYYY biçiminde de yazabilirsiniz.' },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date' },
  ],
  compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden ileri bir tarih olamaz. Tarihleri kontrol edin.');
    const gun = h.gunFarki(dogum, bugun);
    // Takvim yaşı: yıl, ay, gün
    let y = bugun.getUTCFullYear() - dogum.getUTCFullYear();
    let a = bugun.getUTCMonth() - dogum.getUTCMonth();
    let g = bugun.getUTCDate() - dogum.getUTCDate();
    if (g < 0) {
      a--;
      const oncekiAySon = new Date(Date.UTC(bugun.getUTCFullYear(), bugun.getUTCMonth(), 0));
      g += oncekiAySon.getUTCDate();
      if (g < 0) g = 0;
    }
    if (a < 0) { y--; a += 12; }
    const toplamAy = y * 12 + a;
    const sonraki = (Math.floor(gun / 1000) + 1) * 1000;
    const sonrakiTarih = h.gunEkle(dogum, sonraki);
    return {
      rows: [
        ['Yaşadığınız gün', `${h.fmt(gun, 0)} gün`],
        ['Hafta olarak', `${h.fmt(Math.floor(gun / 7), 0)} hafta ${gun % 7} gün`],
        ['Tamamlanan ay', `${h.fmt(toplamAy, 0)} ay`],
        ['Takvim yaşı', `${y} yıl ${a} ay ${g} gün`],
        ['Saat olarak', `${h.fmt(gun * 24, 0)} saat`],
        ['Dakika olarak', `${h.fmt(gun * 1440, 0)} dakika`],
        ['Saniye olarak', `${h.fmt(gun * 86400, 0)} saniye`],
        ['Doğduğunuz gün', `${h.fmtDate(dogum)} ${h.gunAdi(dogum)}`],
        ['Sıradaki yuvarlak sayı', `${h.fmt(sonraki, 0)} gün: ${h.fmtDate(sonrakiTarih)} ${h.gunAdi(sonrakiTarih)} (${sonraki - gun} gün sonra)`],
      ],
      note: `${h.fmtDate(bugun)} tarihine göre hesaplandı. Doğum günü sayılmaz, bugün sayılır; saat ve dakika değerleri tam günler üzerinden bulunur.`,
    };
  },
  cases: [
    { in: { dogum: '15.11.1996', bugun: '15.11.2026' }, out: { 'Yaşadığınız gün': '10.957 gün', 'Takvim yaşı': '30 yıl 0 ay 0 gün', 'Tamamlanan ay': '360 ay', 'Sıradaki yuvarlak sayı': '11.000 gün: 28.12.2026 Pazartesi (43 gün sonra)' } },
    { in: { dogum: '20.05.1990', bugun: '15.11.2026' }, out: { 'Yaşadığınız gün': '13.328 gün', 'Hafta olarak': '1.904 hafta 0 gün', 'Takvim yaşı': '36 yıl 5 ay 26 gün', 'Saat olarak': '319.872 saat', 'Doğduğunuz gün': '20.05.1990 Pazar' } },
    { in: { dogum: '01.01.2000', bugun: '01.01.2001' }, out: { 'Yaşadığınız gün': '366 gün', 'Hafta olarak': '52 hafta 2 gün', 'Saat olarak': '8.784 saat', 'Dakika olarak': '527.040 dakika', 'Saniye olarak': '31.622.400 saniye', 'Takvim yaşı': '1 yıl 0 ay 0 gün' } },
    { in: { dogum: '29.10.1923', bugun: '29.10.2023' }, out: { 'Yaşadığınız gün': '36.525 gün', 'Takvim yaşı': '100 yıl 0 ay 0 gün', 'Tamamlanan ay': '1.200 ay' } },
    { in: { dogum: '15.11.2026', bugun: '16.11.2026' }, out: { 'Yaşadığınız gün': '1 gün', 'Saat olarak': '24 saat', 'Takvim yaşı': '0 yıl 0 ay 1 gün' } },
    { in: { dogum: '2026-11-15', bugun: '2026-11-15' }, out: { 'Yaşadığınız gün': '0 gün', 'Sıradaki yuvarlak sayı': '1.000 gün: 11.08.2029 Cumartesi (1000 gün sonra)' } },
    { in: { dogum: '16.11.2026', bugun: '15.11.2026' }, error: true },
    { in: { dogum: '30.02.1990', bugun: '15.11.2026' }, error: true },
  ],
  howto: [
    '"Doğum tarihi" alanına doğduğunuz günü, ayı ve yılı girin.',
    '"Bugünün tarihi" alanını boş bırakırsanız cihazınızın tarihi kullanılır. Geçmişteki ya da gelecekteki bir gün için hesap yapmak isterseniz o tarihi yazın.',
    '"Hesapla" düğmesine basın. İlk satırda yaşadığınız gün sayısı, altında hafta, ay, saat, dakika ve saniye karşılıkları görünür.',
    'Son satırdaki tarihi not alın: bir sonraki yuvarlak gün sayısına o gün ulaşacaksınız.',
  ],
  sections: [
    { h: 'Gün sayısı nasıl bulunuyor?', p: [
      'Araç, doğum tarihiniz ile bugünün tarihi arasındaki takvim günlerini tek tek sayar. Yaşınızı 365 ile çarpmak bu sonucu vermez, çünkü arada geçen her artık yıl takvime bir gün ekler. Doğru yöntem iki tarih arasındaki gerçek gün farkını almaktır ve araç tam olarak bunu yapar.',
      'Sayımda doğum günü sıfırıncı gün kabul edilir: doğduğunuz günün ertesi günü 1 günlük olursunuz. Bu, "aradan kaç gün geçti" sorusunun karşılığıdır. "Kaçıncı günümdeyim" diye sorarsanız cevabı bu sayının bir fazlasıdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '15 Kasım 1996 doğumlu biri 15 Kasım 2026\'da tam 30 yaşına girer. 30 yıl, 30 × 365 = 10.950 gün eder. Bu aralıkta 29 Şubat içeren yedi yıl vardır: 2000, 2004, 2008, 2012, 2016, 2020 ve 2024. Bunlar eklendiğinde 10.950 + 7 = <strong>10.957 gün</strong> bulunur. Aynı kişi 43 gün sonra, 28 Aralık 2026 Pazartesi günü 11.000 günlük olacaktır.',
      'İkinci örnek: 20 Mayıs 1990 doğumlu biri için 15 Kasım 2026\'da takvim yaşı 36 yıl 5 ay 26 gündür. 36 yılda 13.140 gün ve dokuz artık gün, yani 13.149 gün geçmiştir; son doğum gününden bu yana geçen 179 gün eklenince toplam 13.328 gün, yani tam 1.904 hafta eder. Bu da doğduğu gün ile hesap gününün haftanın aynı günü, Pazar olduğunu gösterir.',
    ] },
    { h: 'Hafta, ay, saat ve dakika karşılıkları', p: [
      'Hafta değeri gün sayısının 7\'ye bölünmesiyle elde edilir; kalan günler ayrıca yazılır. Saat, dakika ve saniye değerleri gün sayısının sırasıyla 24, 1.440 ve 86.400 ile çarpımıdır. Doğum saatiniz ve hesap anındaki saat hesaba katılmadığı için bu değerler tam günlere karşılık gelir; gerçek değer, günün saatine bağlı olarak en fazla bir günlük pay kadar farklı olabilir.',
      'Ay sayısı ise sabit bir gün sayısına bölünerek değil, takvim üzerinden bulunur: doğum gününüzün ay içindeki günü her geldiğinde bir ay tamamlanmış sayılır. Bu yüzden "Tamamlanan ay" satırı, takvim yaşınızdaki yıl ve ayların toplam ay karşılığıdır.',
    ] },
    { h: 'Yuvarlak gün sayıları: 10.000. gün ve ötesi', p: [
      'Doğum günleri yılda bir gelir, ama gün olarak sayıldığında da kutlanacak dönüm noktaları vardır. Bunların en bilineni 10.000. gündür ve 27 yaşını bir süre geçtikten sonra gelir. Aşağıdaki liste yaklaşık hangi yaşlara denk geldiklerini gösterir; kesin tarih, arada kaç artık yıl bulunduğuna göre bir iki gün oynar.',
    ], ul: [
      '<strong>1.000 gün:</strong> yaklaşık 2 yıl 9 ay',
      '<strong>5.000 gün:</strong> yaklaşık 13 yıl 8 ay',
      '<strong>10.000 gün:</strong> yaklaşık 27 yıl 4,5 ay',
      '<strong>15.000 gün:</strong> yaklaşık 41 yıl 1 ay',
      '<strong>20.000 gün:</strong> yaklaşık 54 yıl 9 ay',
      '<strong>25.000 gün:</strong> yaklaşık 68 yıl 5 ay',
      '<strong>30.000 gün:</strong> yaklaşık 82 yıl 1,5 ay',
    ] },
    { h: 'Bu hesap ne işe yarar?', ul: [
      '<strong>Farklı bir kutlama:</strong> 10.000 ya da 20.000 günlük olmak, klasik doğum günlerinin dışında anlamlı bir sürpriz bahanesidir.',
      '<strong>Bebek ve çocuk gelişimi:</strong> İlk aylarda yaş çoğunlukla gün ve hafta olarak izlenir; araç bebeğin kaç günlük ve kaç haftalık olduğunu doğrudan verir.',
      '<strong>Evcil hayvanlar ve bitkiler:</strong> Sahiplenme ya da ekim tarihinden itibaren geçen günü aynı yolla hesaplayabilirsiniz.',
      '<strong>İlişki ve kuruluş yıl dönümleri:</strong> Doğum tarihi yerine tanışma, evlilik ya da şirket kuruluş tarihini yazarak "kaç gündür birlikteyiz" sorusunu da cevaplarsınız.',
      '<strong>Merak ve farkındalık:</strong> Ömrü günlerle görmek, zamanın nasıl kullanıldığı üzerine düşünmek için sade bir araçtır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, yaşı 365 ile çarpıp bırakmaktır; 40 yaşındaki biri için bu yöntem yaklaşık 10 günlük eksik sonuç verir. İkinci hata, yılı 365,25 gün kabul edip kesirli sonucu yuvarlamaktır; bu da çoğu zaman bir gün şaşar. Üçüncüsü, hem doğum gününü hem bugünü sayıma katmaktır; aradaki fark hesaplanırken uçlardan yalnızca biri sayılır.',
      'Araç Miladi takvimle çalışır ve saat dilimi ya da doğum saati bilgisi kullanmaz. Gece yarısı civarında ya da farklı bir saat dilimindeyken cihaz tarihi beklenenden farklıysa bugünün tarihini elle girin.',
    ] },
  ],
  faq: [
    ['10.000 günlük olduğum tarihi nasıl öğrenirim?', 'Henüz 10.000 günü doldurmadıysanız ve 9.000 günü geçtiyseniz son satır doğrudan bu tarihi verir. Daha küçük yaşlar için araç bir sonraki bin katını gösterir; 10.000. günün tarihini görmek için "Bugünün tarihi" alanına ileri bir tarih yazarak ilerleyebilirsiniz.'],
    ['Doğduğum gün sayıma dahil mi?', 'Hayır. Doğduğunuz gün 0 kabul edilir, ertesi gün 1 günlük olursunuz. Sonuç, doğumunuzdan bu yana geçen tam gün sayısıdır.'],
    ['Yaşımı 365 ile çarpınca neden farklı çıkıyor?', 'Çünkü artık yıllar hesaba girmiyor. Yaşadığınız her 29 Şubat bir gün ekler; ayrıca son doğum gününüzden bugüne geçen günler de çarpımda yer almaz. Araç gerçek takvim farkını saydığı için bu günleri eksiksiz içerir.'],
    ['Kaç haftalık olduğumu da görebilir miyim?', 'Evet. "Hafta olarak" satırı tam hafta sayısını ve artan günleri verir. Kalan gün 0 ise bugün, doğduğunuz haftanın günüyle aynı gündesiniz demektir.'],
    ['Saat ve dakika değerleri doğum saatime göre mi?', 'Hayır. Doğum saati sorulmadığı için bu değerler tam günlerden hesaplanır. Gerçek değer, doğum saatinize ve şu anki saate göre bir güne kadar farklı olabilir.'],
    ['Doğum tarihim dışında bir tarih yazabilir miyim?', 'Evet. İşe başlama, evlilik, sigarayı bırakma ya da bir projenin başlangıcı gibi herhangi bir geçmiş tarihi yazarak o günden bu yana geçen süreyi aynı ayrıntıda görebilirsiniz.'],
    ['Gelecekteki bir gün için hesap yapılabilir mi?', 'Evet. "Bugünün tarihi" alanına ileri bir tarih yazarsanız, o gün kaç günlük olacağınızı görürsünüz. Doğum tarihinin kendisi ise hesap tarihinden sonra olamaz.'],
    ['Girdiğim doğum tarihi saklanıyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; doğum tarihiniz hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['yas-hesapla', 'tarih-farki', 'dogum-gunu-geri-sayim', '10000-gun-hesapla', 'tarih-ekle-cikar', 'yas-ay-gun-hesapla'],
};
