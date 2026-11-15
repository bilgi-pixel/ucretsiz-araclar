export default {
  slug: 'dogum-gunu-geri-sayim',
  title: 'Doğum Gününe Kaç Gün Kaldı Hesaplama',
  h1Tail: 'geri sayım',
  pageTitle: 'Doğum Gününe Kaç Gün Kaldı? Doğum Günü Geri Sayım Hesaplama',
  description: 'Doğum tarihinizi girin; bir sonraki doğum gününüze kaç gün kaldığını, hangi güne denk geldiğini ve kaç yaşına gireceğinizi öğrenin. 29 Şubat doğumluları da destekler.',
  card: 'Bir sonraki doğum gününe kaç gün kaldığını, haftanın hangi gününe geldiğini ve kaç yaşına girileceğini hesaplayın.',
  category: 'zaman',
  keywords: ['doğum günüme kaç gün kaldı', 'doğum günü geri sayım', 'doğum günü hesaplama', 'doğum günüm hangi gün', 'kaç yaşına giriyorum', '29 şubat doğum günü', 'doğum gününe kalan gün'],
  lead: 'Doğum tarihini yazın; <strong>bir sonraki doğum gününe kaç gün kaldığını</strong>, o günün haftanın hangi gününe denk geldiğini ve kaç yaşına girileceğini hesaplayın. Kendi doğum gününüz kadar sevdiklerinizinki için de kullanabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'dogum', label: 'Doğum tarihi', type: 'date', hint: 'GG.AA.YYYY biçiminde de yazabilirsiniz.' },
    { id: 'bugun', label: 'Bugünün tarihi (boş = bugün)', type: 'date' },
    { id: 'subat', label: '29 Şubat doğumlular için artık olmayan yıllarda', type: 'select', options: [['28', '28 Şubat\'ta kutla'], ['1', '1 Mart\'ta kutla']], hint: 'Yalnızca 29 Şubat doğumluları etkiler.' },
  ],
  compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden ileri bir tarih olamaz. Tarihleri kontrol edin.');
    const ay = dogum.getUTCMonth();
    const gun = dogum.getUTCDate();
    const artik = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const kutlama = (y) => {
      let a = ay;
      let g = gun;
      if (ay === 1 && gun === 29 && !artik(y)) {
        if (v.subat === '1') { a = 2; g = 1; } else { g = 28; }
      }
      const d = new Date(Date.UTC(y, a, g));
      d.setUTCFullYear(y);
      return d;
    };
    let yil = bugun.getUTCFullYear();
    let hedef = kutlama(yil);
    if (hedef.getTime() < bugun.getTime()) { yil++; hedef = kutlama(yil); }
    const kalan = h.gunFarki(bugun, hedef);
    const yeniYas = yil - dogum.getUTCFullYear();
    const simdiki = kalan === 0 ? yeniYas : yeniYas - 1;
    const yilGun = h.gunFarki(kutlama(yil - 1), hedef);
    const hafta = Math.floor(kalan / 7);
    const rows = [
      ['Kalan süre', kalan === 0 ? '0 gün (doğum günü bugün)' : `${kalan} gün`],
      ['Sıradaki doğum günü', `${h.fmtDate(hedef)} ${h.gunAdi(hedef)}`],
      ['Girilecek yaş', `${yeniYas}`],
      ['Şu anki yaş', `${simdiki}`],
      ['Hafta olarak', `${hafta} hafta ${kalan % 7} gün`],
      ['Saat olarak', `${h.fmt(kalan * 24, 0)} saat`],
      ['Yaş yılının geçen kısmı', '%' + h.fmt(kalan === 0 ? 0 : ((yilGun - kalan) / yilGun) * 100, 1)],
    ];
    return {
      rows,
      note: `${h.fmtDate(bugun)} tarihine göre hesaplandı. Kalan gün, bugün ile doğum günü arasındaki takvim günü farkıdır; doğum saati dikkate alınmaz.`,
    };
  },
  cases: [
    { in: { dogum: '20.05.1990', bugun: '15.11.2026' }, out: { 'Kalan süre': '186 gün', 'Sıradaki doğum günü': '20.05.2027 Perşembe', 'Girilecek yaş': '37', 'Şu anki yaş': '36', 'Hafta olarak': '26 hafta 4 gün' } },
    { in: { dogum: '15.11.2000', bugun: '15.11.2026' }, out: { 'Kalan süre': '0 gün (doğum günü bugün)', 'Sıradaki doğum günü': '15.11.2026 Pazar', 'Girilecek yaş': '26', 'Şu anki yaş': '26' } },
    { in: { dogum: '01.01.2000', bugun: '31.12.2025' }, out: { 'Kalan süre': '1 gün', 'Sıradaki doğum günü': '01.01.2026 Perşembe', 'Girilecek yaş': '26', 'Şu anki yaş': '25', 'Saat olarak': '24 saat' } },
    { in: { dogum: '29.02.2000', bugun: '01.01.2025', subat: '28' }, out: { 'Kalan süre': '58 gün', 'Sıradaki doğum günü': '28.02.2025 Cuma', 'Girilecek yaş': '25' } },
    { in: { dogum: '29.02.2000', bugun: '01.01.2025', subat: '1' }, out: { 'Kalan süre': '59 gün', 'Sıradaki doğum günü': '01.03.2025 Cumartesi' } },
    { in: { dogum: '2000-02-29', bugun: '2024-01-01' }, out: { 'Kalan süre': '59 gün', 'Sıradaki doğum günü': '29.02.2024 Perşembe', 'Girilecek yaş': '24' } },
    { in: { dogum: '14.11.1985', bugun: '15.11.2026' }, out: { 'Kalan süre': '364 gün', 'Sıradaki doğum günü': '14.11.2027 Pazar', 'Girilecek yaş': '42', 'Şu anki yaş': '41' } },
    { in: { dogum: '20.05.2030', bugun: '15.11.2026' }, error: true },
    { in: { dogum: '', bugun: '15.11.2026' }, error: true },
  ],
  howto: [
    '"Doğum tarihi" alanına gün, ay ve yılı girin. Yılı yazmak, kaç yaşına girileceğinin hesaplanması için gereklidir.',
    '"Bugünün tarihi" alanını boş bırakın; araç cihazınızın tarihini kullanır. Başka bir günden itibaren saymak isterseniz o tarihi yazın.',
    'Doğum tarihi 29 Şubat ise, artık olmayan yıllarda kutlamanın 28 Şubat\'ta mı 1 Mart\'ta mı sayılacağını seçin.',
    '"Hesapla" düğmesine basın; kalan gün, doğum gününün haftanın hangi gününe geldiği ve girilecek yaş listelenir.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Araç önce doğum tarihinizin gün ve ayını içinde bulunulan yıla taşır. Bu tarih bugünden önceyse, yani bu yılki doğum gününüz geçmişse, bir sonraki yıla geçer. Ardından bugün ile bulunan tarih arasındaki takvim günlerini sayar. Bugünün kendisi sayılmaz, doğum günü sayılır; dolayısıyla doğum gününüz yarınsa sonuç 1, bugünse 0\'dır.',
      'Girilecek yaş, doğum gününün kutlanacağı yıldan doğum yılının çıkarılmasıyla bulunur. Şu anki yaş ise bundan bir eksiktir; doğum günü bugünse iki değer eşitlenir, çünkü yeni yaşa o gün girilmiş olur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '20 Mayıs 1990 doğumlu biri için 15 Kasım 2026 tarihinde hesap yapalım. 2026\'daki doğum günü (20 Mayıs) geçmiş olduğundan sıradaki doğum günü 20 Mayıs 2027\'dir. 15 Kasım\'dan ay sonuna 15 gün, Aralık 31, Ocak 31, Şubat 28, Mart 31, Nisan 30 gün ve Mayıs\'ın ilk 20 günü toplanır: 15 + 31 + 31 + 28 + 31 + 30 + 20 = <strong>186 gün</strong>. Bu süre 26 hafta 4 gün eder.',
      '20 Mayıs 2027 bir Perşembe gününe denk gelir. Girilecek yaş 2027 − 1990 = 37, o günkü yaş ise 36\'dır. Aracı aynı tarihlerle çalıştırdığınızda bu değerleri görürsünüz.',
    ] },
    { h: '29 Şubat doğumlular', p: [
      '29 Şubat yalnızca artık yıllarda takvimde yer alır; bu yüzden o gün doğanların "gerçek" doğum günü dört yılda bir gelir. Aradaki yıllarda kutlamayı 28 Şubat\'ta yapanlar da 1 Mart\'ta yapanlar da vardır; bu kişisel bir tercihtir. Araç iki seçeneği de sunar ve artık yıllarda doğrudan 29 Şubat\'ı kullanır.',
      'Örneğin 29 Şubat 2000 doğumlu biri için 1 Ocak 2025\'te hesap yapıldığında, 28 Şubat seçeneğiyle 58 gün, 1 Mart seçeneğiyle 59 gün kaldığı görülür. Aynı kişi için 1 Ocak 2024\'te hesap yapılırsa 2024 artık yıl olduğundan doğum günü 29 Şubat 2024 Perşembe\'dir ve 59 gün kalmıştır. Yaşın resmî işlemlerde hangi gün dolmuş sayılacağı hukuki bir konudur; böyle bir ihtiyaçta güncel mevzuata ve ilgili kuruma başvurun.',
    ] },
    { h: 'Doğum günü haftanın hangi gününe gelir?', p: [
      'Normal bir yıl 52 hafta 1 gün sürdüğü için doğum gününüz her yıl haftanın bir sonraki gününe kayar; arada 29 Şubat varsa kayma iki gün olur. Bu yıl Cuma gününe gelen bir doğum günü, araya artık gün girmezse gelecek yıl Cumartesi\'ye denk gelir. Kutlamayı hafta sonuna denk getirmek, mekân ayırtmak ya da izin planlamak için "Sıradaki doğum günü" satırındaki gün adına bakmanız yeterlidir.',
      'Takvim 28 yıllık bir döngüyle büyük ölçüde kendini tekrar ettiğinden, doğduğunuz haftanın günü ile doğum gününüz çoğunlukla 28, 56 ve 84. yaşlarınızda yeniden aynı güne gelir.',
    ] },
    { h: 'Geri sayımı nasıl değerlendirirsiniz?', ul: [
      '<strong>Hediye ve sürpriz planı:</strong> Kalan gün sayısı, sipariş ve kargo süresini hesaba katarak ne zaman harekete geçmeniz gerektiğini gösterir.',
      '<strong>Davet ve organizasyon:</strong> Doğum gününün hafta içine mi hafta sonuna mı geldiğini önceden bilmek mekân ve davetli planını kolaylaştırır.',
      '<strong>Çocuklar için geri sayım:</strong> "Kaç uyku kaldı?" sorusunun cevabı kalan gün sayısıdır; hafta olarak gösterim de küçükler için anlaşılırdır.',
      '<strong>Hatırlatma kurma:</strong> Aile üyeleri ve yakın arkadaşların doğum günlerini sırayla hesaplayıp takviminize not düşebilirsiniz.',
      '<strong>Yaşa bağlı planlar:</strong> Belirli bir yaşa girmeden önce tamamlamak istediğiniz hedefler için elinizdeki süreyi net görürsünüz.',
    ] },
    { h: 'Yaş yılının geçen kısmı ne demek?', p: [
      'Son doğum gününüzden bir sonrakine kadar geçen süreyi bir bütün sayarsak, bugün bu sürenin neresinde olduğunuzu yüzde olarak gösteren değerdir. Doğum gününüzde %0\'dan başlar ve bir sonraki doğum gününüzden bir gün önce %100\'e yaklaşır. Değer %50 dolayındaysa "yarım yaş" gününüze yakınsınız demektir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecek noktalar', p: [
      'Hesap takvim günü üzerinden yapılır; doğum saati ve saat dilimi farkları dikkate alınmaz. Gece yarısına yakın saatlerde ya da farklı bir ülkedeyken cihazınızın tarihi beklediğinizden farklı olabilir; böyle durumlarda bugünün tarihini elle yazın. Doğum tarihi olarak gelecekte bir gün girilirse araç uyarı verir. Sonuçlar bilgilendirme amaçlıdır; resmî yaş hesabı gerektiren işlemlerde ilgili kurumun kuralları geçerlidir.',
    ] },
  ],
  faq: [
    ['Doğum günüm bugünse araç ne gösterir?', 'Kalan süre 0 gün olarak görünür ve yanında doğum gününün bugün olduğu belirtilir. Girilecek yaş ile şu anki yaş aynı değeri gösterir, çünkü yeni yaşınıza bugün girmiş olursunuz.'],
    ['Doğum yılımı bilmeden de hesap yapabilir miyim?', 'Kalan gün için yalnızca gün ve ay yeterlidir, ancak alan tam tarih ister. Yılı bilmiyorsanız herhangi bir geçmiş yıl yazabilirsiniz; bu durumda kalan gün ve haftanın günü doğru çıkar, yaş satırlarını dikkate almayın.'],
    ['29 Şubat doğumluyum, hangi seçeneği işaretlemeliyim?', 'Kutlamayı hangi gün yapıyorsanız onu seçin. Kimileri ayın son günü olduğu için 28 Şubat\'ı, kimileri doğumdan sonraki gün olduğu için 1 Mart\'ı tercih eder. Artık yıllarda seçenek fark etmez; doğum gününüz 29 Şubat olarak hesaplanır.'],
    ['Kalan gün sayısına bugün dahil mi?', 'Hayır. Bugün sayılmaz, doğum günü sayılır. Doğum gününüz yarınsa sonuç 1 gündür. Bu, "kaç gece sonra" sorusunun cevabıyla aynıdır.'],
    ['Başka bir tarihten itibaren geri sayım yapabilir miyim?', 'Evet. "Bugünün tarihi" alanına istediğiniz günü yazarsanız hesap o günden itibaren yapılır. Örneğin tatil dönüşü tarihinizi yazarak döndüğünüzde doğum gününe kaç gün kalacağını görebilirsiniz.'],
    ['Doğum günüm her yıl aynı güne mi gelir?', 'Hayır. Her yıl haftanın bir sonraki gününe, araya 29 Şubat girdiğinde iki gün sonrasına kayar. Bu yüzden haftanın gününü öğrenmek için her yıl yeniden hesaplamak gerekir.'],
    ['Saat olarak gösterilen değer tam mı?', 'Saat değeri kalan gün sayısının 24 ile çarpımıdır; günün o anki saatini hesaba katmaz. Günün ilerleyen saatlerinde gerçek kalan saat bu değerden biraz daha azdır.'],
    ['Doğum tarihim kaydediliyor ya da paylaşılıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; doğum tarihi sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.'],
  ],
  related: ['yas-hesapla', 'kac-gun-kaldi', 'kac-gundur-yasiyorum', 'tarih-farki', 'hangi-gun-hesapla', 'yari-yas-hesapla'],
};
