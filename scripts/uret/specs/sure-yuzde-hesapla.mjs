export default {
  slug: 'sure-yuzde-hesapla',
  title: 'Yılın Yüzde Kaçı Geçti Hesaplama',
  h1Tail: 'yıl ilerleme yüzdesi',
  pageTitle: 'Yılın Yüzde Kaçı Geçti? Yıl İlerleme Yüzdesi Hesaplama',
  description: 'Seçtiğiniz tarihte yılın yüzde kaçının geçtiğini, kaç gün geride kaldığını ve kaç gün kaldığını hesaplayın. Ayın ilerleme yüzdesi ve ilerleme çubuğu da gösterilir.',
  card: 'Bir tarihte yılın yüzde kaçının geçtiğini, geçen ve kalan gün sayısını, ayın ilerleme yüzdesini bulun.',
  category: 'zaman',
  keywords: ['yılın yüzde kaçı geçti', 'yıl ilerleme yüzdesi', 'yılın kaçta kaçı bitti', 'yılın bitmesine kaç gün kaldı', 'yılın yarısı ne zaman', 'yıl yüzde hesaplama', 'ayın yüzde kaçı geçti'],
  lead: 'Bugün ya da seçtiğiniz herhangi bir tarihte <strong>yılın yüzde kaçının geride kaldığını</strong> öğrenin. Araç geçen ve kalan gün sayısını, yılın kaçıncı gününde olduğunuzu, içinde bulunulan ayın ilerleme yüzdesini ve paylaşmaya hazır bir ilerleme çubuğunu birlikte verir; artık yıllar kendiliğinden hesaba katılır.',
  button: 'Hesapla',
  inputs: [
    { id: 'tarih', label: 'Tarih (boş = bugün)', type: 'date' },
    { id: 'say', label: 'Seçilen gün', type: 'select', options: [['bas', 'Sayılmasın (günün başı)'], ['son', 'Sayılsın (günün sonu)']], hint: 'Sabah bakıyorsanız "sayılmasın", gün bitmişse "sayılsın" seçeneği daha anlamlıdır.' },
  ],
  compute(v, h) {
    const t = h.dateOrToday(v.tarih, 'Tarih');
    const y = t.getUTCFullYear();
    const yilBasi = new Date(Date.UTC(y, 0, 1)); yilBasi.setUTCFullYear(y);
    const sonrakiYil = new Date(Date.UTC(y + 1, 0, 1)); sonrakiYil.setUTCFullYear(y + 1);
    const toplam = h.gunFarki(yilBasi, sonrakiYil);
    const sira = h.gunFarki(yilBasi, t) + 1;
    const gecen = v.say === 'son' ? sira : sira - 1;
    const kalan = toplam - gecen;
    const yuzde = gecen / toplam * 100;
    const ay = t.getUTCMonth();
    const ayGun = new Date(Date.UTC(2000, ay + 1, 0)).getUTCDate() - (ay === 1 && toplam === 365 ? 1 : 0);
    const ayGecen = v.say === 'son' ? t.getUTCDate() : t.getUTCDate() - 1;
    const dolu = Math.round(yuzde / 5);
    const cubuk = '▓'.repeat(dolu) + '░'.repeat(20 - dolu);
    return {
      rows: [
        ['Yılın geçen kısmı', '%' + h.fmt(yuzde, 2)],
        ['Yılın kalan kısmı', '%' + h.fmt(100 - yuzde, 2)],
        ['Geçen gün', `${gecen} gün`],
        ['Kalan gün', `${kalan} gün`],
        ['Yılın kaçıncı günü', `${sira}. gün (${y} yılı ${toplam} gün)`],
        [`${h.ayAdi(ay + 1)} ayının geçen kısmı`, '%' + h.fmt(ayGecen / ayGun * 100, 2)],
        ['İlerleme çubuğu', `${cubuk} %${h.fmt(yuzde, 0)}`],
      ],
      note: v.say === 'son' ? 'Seçilen gün tamamlanmış sayıldı; kalan gün sayısına bugün dahil değildir.' : 'Seçilen gün henüz başlamış sayıldı; kalan gün sayısına bugün dahildir.',
    };
  },
  cases: [
    { in: { tarih: '2025-07-02', say: 'bas' }, out: { 'Yılın geçen kısmı': '%49,86', 'Yılın kalan kısmı': '%50,14', 'Geçen gün': '182 gün', 'Kalan gün': '183 gün', 'Yılın kaçıncı günü': '183. gün (2025 yılı 365 gün)', 'Temmuz ayının geçen kısmı': '%3,23', 'İlerleme çubuğu': '▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ %50' } },
    { in: { tarih: '2024-07-02', say: 'bas' }, out: { 'Yılın geçen kısmı': '%50', 'Geçen gün': '183 gün', 'Kalan gün': '183 gün', 'Yılın kaçıncı günü': '184. gün (2024 yılı 366 gün)' } },
    { in: { tarih: '2026-11-15', say: 'bas' }, out: { 'Yılın geçen kısmı': '%87,12', 'Yılın kalan kısmı': '%12,88', 'Geçen gün': '318 gün', 'Kalan gün': '47 gün', 'Kasım ayının geçen kısmı': '%46,67' } },
    { in: { tarih: '2026-11-15', say: 'son' }, out: { 'Yılın geçen kısmı': '%87,4', 'Geçen gün': '319 gün', 'Kalan gün': '46 gün', 'Kasım ayının geçen kısmı': '%50' } },
    { in: { tarih: '2025-01-01', say: 'bas' }, out: { 'Yılın geçen kısmı': '%0', 'Kalan gün': '365 gün', 'İlerleme çubuğu': '░░░░░░░░░░░░░░░░░░░░ %0' } },
    { in: { tarih: '2025-12-31', say: 'son' }, out: { 'Yılın geçen kısmı': '%100', 'Kalan gün': '0 gün', 'Aralık ayının geçen kısmı': '%100' } },
    { in: { tarih: '2024-02-29', say: 'son' }, out: { 'Yılın geçen kısmı': '%16,39', 'Geçen gün': '60 gün', 'Şubat ayının geçen kısmı': '%100' } },
    { in: { tarih: '2025-02-14', say: 'son' }, out: { 'Şubat ayının geçen kısmı': '%50', 'Geçen gün': '45 gün' } },
    { in: { tarih: '2025-02-30', say: 'bas' }, error: true },
    { in: { tarih: 'yarın', say: 'bas' }, error: true },
  ],
  howto: [
    '"Tarih" alanını boş bırakırsanız cihazınızın bugünkü tarihi kullanılır. Başka bir günü merak ediyorsanız takvimden seçin.',
    '"Seçilen gün" listesinden o günün hesaba katılıp katılmayacağını belirleyin: günün başındaysanız "sayılmasın", gün bittiyse "sayılsın".',
    '"Hesapla" düğmesine basın. Yılın geçen ve kalan yüzdesi, gün sayıları ve ayın ilerlemesi sonuç kutusunda görünür.',
    '"Sonucu kopyala" düğmesiyle ilerleme çubuğunu ve yüzdeyi panoya alıp mesajlaşma uygulamasında ya da sosyal medyada paylaşabilirsiniz.',
  ],
  sections: [
    { h: 'Yıl ilerleme yüzdesi nasıl hesaplanır?', p: [
      'Hesap tek bir bölme işlemidir: <strong>yüzde = geçen gün ÷ yılın toplam günü × 100</strong>. Yılın toplam günü normal yıllarda 365, artık yıllarda 366\'dır. Geçen gün sayısı ise 1 Ocak\'tan seçilen tarihe kadar tamamlanmış günlerin sayısıdır.',
      'Çözümlü örnek: 2 Temmuz 2025 sabahında yılın ne kadarı geçmiştir? Ocak 31, Şubat 28, Mart 31, Nisan 30, Mayıs 31 ve Haziran 30 gün çeker; toplamı 181 eder. Temmuz\'un ilk günü de tamamlandığına göre geçen gün sayısı 182\'dir. 182 ÷ 365 × 100 = <strong>%49,86</strong>. Geriye 183 gün, yani yılın %50,14\'ü kalmıştır. Aynı gün Temmuz ayının yalnızca 1 günü geçtiğinden ayın ilerlemesi 1 ÷ 31 = %3,23\'tür.',
      'Aynı tarih artık bir yılda farklı sonuç verir. 2 Temmuz 2024 sabahında Şubat 29 çektiği için geçen gün 183\'tür ve 183 ÷ 366 tam olarak <strong>%50</strong> eder.',
    ] },
    { h: 'Yılın tam ortası hangi gündür?', p: [
      'Yaygın kanının aksine yılın ortası 30 Haziran ya da 1 Temmuz değildir. 365 günlük bir yılda ortadaki gün 183. gündür, yani <strong>2 Temmuz</strong>; önünde 182, arkasında 182 gün vardır ve yılın tam yarısı 2 Temmuz öğle saatinde dolar. Artık yıllarda gün sayısı çift olduğundan tam orta nokta 1 Temmuz\'u 2 Temmuz\'a bağlayan gece yarısıdır; 2 Temmuz sabahı yılın tam %50\'si geçmiş olur.',
      'İlk altı ay (Ocak–Haziran) 181 ya da 182 gün, son altı ay (Temmuz–Aralık) ise 184 gün sürer. Bu yüzden "yılın ilk yarısı" denen takvim dönemi, gün olarak yılın yarısından biraz kısadır.',
    ] },
    { h: 'Seçilen gün sayılsın mı, sayılmasın mı?', p: [
      'Bir günün ortasında "yılın kaç günü geçti" sorusunun tek bir doğru cevabı yoktur; bugün hem başlamış hem de bitmemiştir. Araç bu yüzden iki seçenek sunar. "Sayılmasın" seçeneğinde 1 Ocak sabahı %0, 31 Aralık sabahı ise %99,73 görürsünüz. "Sayılsın" seçeneğinde 1 Ocak akşamı %0,27, 31 Aralık akşamı tam %100 çıkar.',
      'İki seçenek arasındaki fark her zaman bir gündür; yüzde olarak yaklaşık 0,27 puana karşılık gelir. Günlük takip yapıyorsanız hep aynı seçeneği kullanmanız, sonuçların birbirini tutması için yeterlidir.',
    ] },
    { h: 'Hızlı başvuru: çeyrek ve yüzde eşikleri (365 günlük yıl)', ul: [
      '<strong>%10:</strong> 37. günün içinde dolar – 6 Şubat',
      '<strong>%25:</strong> 92. günün içinde dolar – 2 Nisan',
      '<strong>%50:</strong> 183. günün ortasında dolar – 2 Temmuz',
      '<strong>%75:</strong> 274. günün içinde dolar – 1 Ekim',
      '<strong>%90:</strong> 329. günün içinde dolar – 25 Kasım',
      '<strong>%99:</strong> 362. günün içinde dolar – 28 Aralık',
    ], p: [
      'Artık yıllarda Şubat\'tan sonraki eşikler takvimde bir gün erkene kayabilir. Kesin değer için ilgili tarihi araca yazıp her iki sayma seçeneğiyle sonucu görebilirsiniz.',
    ] },
    { h: 'Bu bilgi nerede işe yarar?', p: [
      'Yıl ilerleme yüzdesi yalnızca merak konusu değildir. Yıllık satış ya da tasarruf hedefi olanlar, hedefin gerçekleşme oranını yılın geçen yüzdesiyle karşılaştırarak önde mi geride mi olduklarını tek bakışta görür: yılın %87\'si geçmişken hedefin %70\'indeyseniz tempoyu artırmanız gerekir. Yıllık izin, bütçe, kitap okuma hedefi, spor salonu üyeliği ve abonelik kullanımı gibi konularda da aynı kıyas yapılabilir.',
      'Öğretmenler ve öğrenciler eğitim yılı planında, serbest çalışanlar yıllık gelir takibinde, içerik üreticileri ise "yılın yüzde şu kadarı bitti" paylaşımlarında bu yüzdeyi kullanır. Sonuçtaki ilerleme çubuğu düz metin karakterlerinden oluştuğu için her uygulamaya yapıştırılabilir; çubuktaki her kutu %5\'lik bir dilimi temsil eder.',
    ] },
    { h: 'Varsayımlar', p: [
      'Hesap Miladi takvime ve takvim yılına (1 Ocak – 31 Aralık) göredir; mali yıl, eğitim yılı ya da Hicri yıl için farklı başlangıç tarihi gerekir. Saat bilgisi kullanılmaz; gün içindeki ilerleme yalnızca "sayılsın / sayılmasın" seçimiyle temsil edilir. Yüzdeler iki ondalık basamağa yuvarlanır, ilerleme çubuğundaki yüzde ise tam sayıya yuvarlanarak gösterilir.',
    ] },
  ],
  faq: [
    ['Yılın yüzde kaçı geçti, nasıl bulurum?', 'Tarih alanını boş bırakıp "Hesapla" düğmesine basmanız yeterlidir; araç bugünün tarihini alır ve geçen gün sayısını yılın toplam gününe bölerek yüzdeyi verir.'],
    ['Yılın yarısı hangi gün doluyor?', '365 günlük yıllarda 2 Temmuz günü öğle saatinde, 366 günlük artık yıllarda ise 1 Temmuz\'u 2 Temmuz\'a bağlayan gece yarısında yılın tam yarısı geçmiş olur.'],
    ['Artık yıl sonucu değiştirir mi?', 'Evet. Artık yıllarda payda 366 olur ve 29 Şubat\'tan sonraki tüm tarihlerde geçen gün sayısı bir artar. Araç yılın artık olup olmadığını kendisi belirler ve sonuçta yılın toplam gün sayısını da yazar.'],
    ['Yılın bitmesine kaç gün kaldığını da görebilir miyim?', 'Evet, "Kalan gün" satırı 31 Aralık dahil yıl sonuna kadar kalan günü verir. Seçilen günü sayıp saymamanıza göre bu değer bir gün değişir; sonuç notunda hangi varsayımın kullanıldığı yazar.'],
    ['Ayın yüzde kaçının geçtiği nasıl hesaplanıyor?', 'Ayın geçen gün sayısı o ayın toplam gününe bölünür. Örneğin 15 Kasım sabahı Kasım\'ın 14 günü geçmiştir; 14 ÷ 30 = %46,67 eder. Şubat için yılın artık olup olmadığına göre 28 ya da 29 gün kullanılır.'],
    ['İki seçenek arasında neden 0,27 puan fark var?', 'Çünkü bir gün, 365 günlük yılın 1 ÷ 365 = %0,27\'sidir. Seçilen günü sayarsanız geçen süre bir gün, yani yaklaşık 0,27 puan artar.'],
    ['Geçmiş ya da gelecek bir yıl için hesap yapabilir miyim?', 'Evet. Tarih alanından istediğiniz yılı ve günü seçebilirsiniz. Örneğin gelecek yılki doğum gününüzde yılın ne kadarının geçmiş olacağını ya da geçmişteki bir olayın yılın hangi diliminde yaşandığını görebilirsiniz.'],
    ['Seçtiğim tarih bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; tarih bilgisi sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['yilin-kacinci-gunu', 'kac-gun-kaldi', 'artik-yil-kontrol', 'hafta-numarasi', 'ceyrek-donem-hesapla', 'yuzde-hesapla'],
};
