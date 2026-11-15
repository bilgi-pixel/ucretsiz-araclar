export default {
  slug: 'evlilik-yildonumu-hesapla',
  title: 'Evlilik Yıl Dönümü Hesaplama',
  h1Tail: 'kaç yıldır evliyiz?',
  pageTitle: 'Evlilik Yıl Dönümü Hesaplama – Kaç Yıldır Evliyiz, Kaç Gün Kaldı?',
  description: 'Evlilik tarihinizi girin; kaç yıl, ay ve gündür evli olduğunuzu, sıradaki yıl dönümünün tarihini, haftanın gününü, kalan günü ve geleneksel adını görün.',
  card: 'Kaç yıl, ay ve gündür evli olduğunuzu, sıradaki yıl dönümüne kaç gün kaldığını ve geleneksel adını öğrenin.',
  category: 'zaman',
  keywords: ['evlilik yıl dönümü hesaplama', 'kaç yıldır evliyiz', 'yıl dönümüne kaç gün kaldı', 'evlilik yıl dönümü isimleri', 'gümüş yıl dönümü kaç yıl', 'altın yıl dönümü', 'evlilik süresi hesaplama'],
  lead: 'Nikâh ya da düğün tarihinizi yazın; bugüne kadar geçen evlilik sürenizi yıl, ay ve gün olarak, sıradaki yıl dönümünün hangi güne denk geldiğini ve o güne kaç gün kaldığını hesaplayın. Araç, yıl dönümünün yaygın geleneksel adını da (kâğıt, gümüş, altın gibi) gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'evlilik', label: 'Evlilik tarihi', type: 'date' },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date', hint: 'İleri bir tarihe göre hesaplamak için doldurun.' },
  ],
  compute(v, h) {
    const AD = { 1: 'Kâğıt', 2: 'Pamuk', 3: 'Deri', 4: 'Çiçek', 5: 'Ahşap', 6: 'Demir', 7: 'Yün', 8: 'Bronz', 9: 'Çömlek', 10: 'Kalay', 11: 'Çelik', 12: 'İpek', 13: 'Dantel', 14: 'Fildişi', 15: 'Kristal', 20: 'Porselen', 25: 'Gümüş', 30: 'İnci', 35: 'Mercan', 40: 'Yakut', 45: 'Safir', 50: 'Altın', 55: 'Zümrüt', 60: 'Elmas', 70: 'Platin' };
    const a = h.date(v.evlilik, 'Evlilik tarihi');
    const b = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (b.getTime() < a.getTime()) h.err('Evlilik tarihi, hesap yapılan tarihten sonra olamaz. Tarihleri kontrol edin.');
    const ay = a.getUTCFullYear(), am = a.getUTCMonth(), ad = a.getUTCDate();
    const aydakiGun = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    // Geçen süre: yıl, ay, gün
    const ekle = (n) => {
      const t = ay * 12 + am + n, y = Math.floor(t / 12), m = t % 12;
      return new Date(Date.UTC(y, m, Math.min(ad, aydakiGun(y, m))));
    };
    let n = (b.getUTCFullYear() - ay) * 12 + (b.getUTCMonth() - am);
    if (ekle(n).getTime() > b.getTime()) n--;
    const yil = Math.floor(n / 12), ayF = n % 12, gun = h.gunFarki(ekle(n), b);
    const parca = [];
    if (yil) parca.push(yil + ' yıl');
    if (ayF) parca.push(ayF + ' ay');
    if (gun) parca.push(gun + ' gün');
    // Y yılındaki yıl dönümü (29 Şubat için artık olmayan yıllarda 28 Şubat)
    const donum = (y) => new Date(Date.UTC(y, am, Math.min(ad, aydakiGun(y, am))));
    let y = Math.max(ay + 1, b.getUTCFullYear());
    if (donum(y).getTime() < b.getTime()) y++;
    const d = donum(y);
    const kac = y - ay;
    const kalan = h.gunFarki(b, d);
    return {
      rows: [
        ['Evlilik süresi', parca.length ? parca.join(' ') : '0 gün'],
        ['Toplam gün', h.fmt(h.gunFarki(a, b), 0) + ' gün'],
        ['Sıradaki yıl dönümü', kac + '. yıl dönümü'],
        ['Yıl dönümü tarihi', h.fmtDate(d) + ' ' + h.gunAdi(d)],
        ['Kalan süre', kalan === 0 ? 'Bugün' : h.fmt(kalan, 0) + ' gün'],
        ['Geleneksel adı', AD[kac] ? AD[kac] + ' yıl dönümü' : 'Bu yıl için yaygın bir ad yok'],
        ['Evlendiğiniz gün', h.fmtDate(a) + ' ' + h.gunAdi(a)],
      ],
      note: ad === 29 && am === 1 ? '29 Şubat\'ta evlenenler için artık olmayan yıllarda yıl dönümü 28 Şubat kabul edilmiştir.' : 'Geleneksel adlar ülkeden ülkeye değişir; burada yaygın listelerden biri kullanılmıştır.',
    };
  },
  cases: [
    { in: { evlilik: '2015-06-20', bugun: '2026-11-15' }, out: { 'Evlilik süresi': '11 yıl 4 ay 26 gün', 'Toplam gün': '4.166 gün', 'Sıradaki yıl dönümü': '12. yıl dönümü', 'Yıl dönümü tarihi': '20.06.2027 Pazar', 'Kalan süre': '217 gün', 'Geleneksel adı': 'İpek yıl dönümü' } },
    { in: { evlilik: '2001-05-10', bugun: '2026-05-10' }, out: { 'Evlilik süresi': '25 yıl', 'Toplam gün': '9.131 gün', 'Sıradaki yıl dönümü': '25. yıl dönümü', 'Yıl dönümü tarihi': '10.05.2026 Pazar', 'Kalan süre': 'Bugün', 'Geleneksel adı': 'Gümüş yıl dönümü' } },
    { in: { evlilik: '2020-02-29', bugun: '2026-11-15' }, out: { 'Evlilik süresi': '6 yıl 8 ay 17 gün', 'Toplam gün': '2.451 gün', 'Yıl dönümü tarihi': '28.02.2027 Pazar', 'Kalan süre': '105 gün', 'Geleneksel adı': 'Yün yıl dönümü' } },
    { in: { evlilik: '2026-08-22', bugun: '2026-09-01' }, out: { 'Evlilik süresi': '10 gün', 'Sıradaki yıl dönümü': '1. yıl dönümü', 'Yıl dönümü tarihi': '22.08.2027 Pazar', 'Kalan süre': '355 gün', 'Geleneksel adı': 'Kâğıt yıl dönümü' } },
    { in: { evlilik: '1976-12-31', bugun: '2026-11-15' }, out: { 'Evlilik süresi': '49 yıl 10 ay 15 gün', 'Toplam gün': '18.216 gün', 'Sıradaki yıl dönümü': '50. yıl dönümü', 'Yıl dönümü tarihi': '31.12.2026 Perşembe', 'Kalan süre': '46 gün', 'Geleneksel adı': 'Altın yıl dönümü' } },
    { in: { evlilik: '2026-11-15', bugun: '2026-11-15' }, out: { 'Evlilik süresi': '0 gün', 'Sıradaki yıl dönümü': '1. yıl dönümü', 'Kalan süre': '365 gün' } },
    { in: { evlilik: '2027-01-01', bugun: '2026-11-15' }, error: true },
    { in: { evlilik: '', bugun: '2026-11-15' }, error: true },
  ],
  howto: [
    '"Evlilik tarihi" alanına nikâh ya da düğün gününüzü seçin; hangisini yıl dönümü olarak kutluyorsanız onu yazın.',
    'İkinci alanı boş bırakırsanız hesap bugüne göre yapılır. Gelecekteki bir güne göre (örneğin planladığınız tatil tarihine) hesaplamak için o tarihi girin.',
    '"Hesapla" düğmesine basın. İlk satırda evlilik süreniz yıl, ay ve gün olarak; altında toplam gün sayısı görünür.',
    'Sıradaki yıl dönümünün kaçıncı olduğunu, tarihini, haftanın hangi gününe geldiğini ve kalan gün sayısını alt satırlardan okuyun.',
    'Sonucu eşinize göndermek ya da ajandanıza not almak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Evlilik süresi nasıl hesaplanır?', p: [
      'Evlilik süresi, evlilik tarihinden bugüne kadar geçen takvim süresidir ve yaş hesabıyla aynı mantıkla bulunur. Önce tam yıllar sayılır, sonra kalan tam aylar, en sonda artan günler. Aylar eşit uzunlukta olmadığı için önce evlilik tarihine eklenebilecek en fazla tam ay bulunur, ardından kalan günler tek tek sayılır.',
      'Çözümlü örnek: 20 Haziran 2015\'te evlenen bir çift için 15 Kasım 2026 tarihinde hesap yapalım. 20 Haziran 2015\'ten 20 Haziran 2026\'ya tam 11 yıl geçmiştir. 20 Haziran\'dan 20 Ekim\'e 4 ay, 20 Ekim\'den 15 Kasım\'a 26 gün vardır. Sonuç <strong>11 yıl 4 ay 26 gün</strong> olur. Aynı aralık gün olarak sayıldığında, aradaki üç artık yıl (2016, 2020, 2024) ile birlikte 4.166 gün eder.',
      'Sıradaki yıl dönümü 12. yıl dönümüdür ve 20 Haziran 2027 Pazar gününe denk gelir. 15 Kasım 2026\'dan o güne 217 gün vardır.',
    ] },
    { h: 'Sıradaki yıl dönümü nasıl bulunur?', p: [
      'Araç, evlilik tarihinin ay ve gününü içinde bulunulan yıla taşır. Bu tarih henüz geçmediyse sıradaki yıl dönümü odur; geçtiyse bir sonraki yıla bakılır. Yıl dönümü tam hesap yapılan güne denk geliyorsa "Kalan süre" satırında <strong>Bugün</strong> yazar ve o gün dolan yıl sayısı gösterilir.',
      'Haftanın günü de ayrıca verilir, çünkü kutlama planı çoğu zaman buna göre yapılır: yıl dönümü hafta içine geliyorsa yemeği ya da kısa tatili en yakın hafta sonuna kaydırmak isteyebilirsiniz. Restoran ve otel rezervasyonlarını kalan gün sayısına bakarak önceden ayarlamak işinizi kolaylaştırır.',
    ] },
    { h: '29 Şubat\'ta evlenenler', p: [
      '29 Şubat yalnızca artık yıllarda takvimde yer alır; bu yüzden o gün evlenenlerin "gerçek" yıl dönümü dört yılda bir gelir. Araç, artık olmayan yıllarda yıl dönümünü <strong>28 Şubat</strong> olarak kabul eder. Örneğin 29 Şubat 2020\'de evlenen bir çiftin 7. yıl dönümü 28 Şubat 2027 Pazar günü olarak hesaplanır. Kimi çiftler bunun yerine 1 Mart\'ı tercih eder; bu tamamen kişisel bir seçimdir ve hesaplanan tarihe bir gün eklemeniz yeterlidir.',
    ] },
    { h: 'Yıl dönümlerinin geleneksel adları', p: [
      'Evlilik yıl dönümlerine malzeme adı verme geleneği Avrupa kökenlidir ve zamanla dünyaya yayılmıştır. Düşünce şudur: ilk yıllar kâğıt ya da pamuk gibi narin malzemelerle, ilerleyen yıllar gümüş, altın ve elmas gibi dayanıklı ve değerli malzemelerle simgelenir. Listeler ülkeden ülkeye farklılık gösterir; aşağıdaki adlar yaygın kullanılan sürümlerden biridir ve araç da bunu kullanır.',
    ], ul: [
      '<strong>1. yıl</strong>: Kâğıt · <strong>2. yıl</strong>: Pamuk · <strong>3. yıl</strong>: Deri · <strong>4. yıl</strong>: Çiçek · <strong>5. yıl</strong>: Ahşap',
      '<strong>6. yıl</strong>: Demir · <strong>7. yıl</strong>: Yün · <strong>8. yıl</strong>: Bronz · <strong>9. yıl</strong>: Çömlek · <strong>10. yıl</strong>: Kalay',
      '<strong>11. yıl</strong>: Çelik · <strong>12. yıl</strong>: İpek · <strong>13. yıl</strong>: Dantel · <strong>14. yıl</strong>: Fildişi · <strong>15. yıl</strong>: Kristal',
      '<strong>20. yıl</strong>: Porselen · <strong>25. yıl</strong>: Gümüş · <strong>30. yıl</strong>: İnci · <strong>35. yıl</strong>: Mercan',
      '<strong>40. yıl</strong>: Yakut · <strong>45. yıl</strong>: Safir · <strong>50. yıl</strong>: Altın · <strong>55. yıl</strong>: Zümrüt',
      '<strong>60. yıl</strong>: Elmas · <strong>70. yıl</strong>: Platin',
    ] },
    { h: 'Hediye ve kutlama fikri olarak adları kullanmak', p: [
      'Geleneksel adlar hediye seçerken yol gösterir. Kâğıt yıl dönümünde el yazısı bir mektup, basılı bir fotoğraf albümü ya da bir konser bileti; ahşap yıl dönümünde oyma bir çerçeve; gümüş yıl dönümünde gümüş bir takı ya da üzerine tarih işlenmiş bir tepsi konuya uygun düşer. Ad vermek zorunlu bir kural değildir; önemli olan günü hatırlamak ve birlikte geçirmektir.',
      'Türkiye\'de en çok bilinen iki ad <strong>gümüş</strong> (25. yıl) ve <strong>altın</strong> (50. yıl) yıl dönümleridir. Bu iki tarih çoğu ailede çocukların ve torunların da katıldığı daha geniş bir kutlamayla anılır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık karışıklık, yıl dönümü sayısı ile "evliliğin kaçıncı yılında olunduğu" arasındadır. Evlendikten bir yıl sonra kutlanan gün 1. yıl dönümüdür; o gün aynı zamanda evliliğin 2. yılı başlar. Araç her zaman dolan yıl sayısını, yani yıl dönümü numarasını verir.',
      'Nikâh ve düğün farklı günlerde yapıldıysa hangisini esas alacağınıza siz karar verirsiniz; resmî işlemlerde geçerli olan nikâh tarihidir. Araç saat bilgisini dikkate almaz, günleri tam gün olarak sayar. Evlilik tarihi hesap tarihinden sonraysa hata verir; düğüne kalan günü saymak için geri sayım türü bir araç kullanmak daha uygundur.',
    ] },
  ],
  faq: [
    ['Gümüş yıl dönümü kaçıncı yıldır?', 'Gümüş yıl dönümü evliliğin 25. yılının dolduğu gündür. Altın yıl dönümü 50., elmas yıl dönümü ise yaygın listelerde 60. yıla karşılık gelir.'],
    ['İlk evlilik yıl dönümünün adı nedir?', 'Yaygın listelerde 1. yıl dönümü kâğıt yıl dönümü olarak bilinir. İkinci yıl pamuk, üçüncü yıl deri ile simgelenir.'],
    ['Yıl dönümümüz bugünse araç ne gösterir?', '"Kalan süre" satırında "Bugün" yazar ve bugün dolan yıl sayısını sıradaki yıl dönümü olarak gösterir. Evlilik süresi satırında da yalnızca tam yıl görünür.'],
    ['29 Şubat\'ta evlendik, yıl dönümümüz hangi gün?', 'Artık yıllarda 29 Şubat\'tır. Diğer yıllarda araç 28 Şubat\'ı esas alır; 1 Mart\'ta kutlamayı tercih ediyorsanız sonuca bir gün ekleyin.'],
    ['Toplam gün sayısı nasıl hesaplanıyor?', 'Evlilik tarihi ile hesap tarihi arasındaki takvim günleri, aradaki artık yılların 29 Şubat günleri de dahil edilerek sayılır. Evlilik günü sıfırıncı gün kabul edilir.'],
    ['Her yılın geleneksel bir adı var mı?', 'Hayır. İlk on beş yılın her biri için bir ad bulunur; sonrasında adlar genellikle beş yılda bir verilir. Arada kalan yıllar için araç yaygın bir ad olmadığını belirtir.'],
    ['Nişan ya da tanışma yıl dönümü için de kullanabilir miyim?', 'Evet. Araç yalnızca iki tarih arasındaki süreyi ve bir sonraki yıl dönümünü hesaplar; tarih alanına nişan, tanışma ya da başka bir özel günü yazabilirsiniz. Geleneksel adlar ise evlilik yıl dönümlerine özgüdür.'],
    ['Girdiğim tarihler bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; evlilik tarihiniz sunucuya gönderilmez, saklanmaz ve başkasıyla paylaşılmaz.'],
  ],
  related: ['dogum-gunu-geri-sayim', 'yas-farki-hesapla', 'hangi-gun-hesapla', 'ay-farki-hesapla', 'kac-gundur-yasiyorum'],
};
