export default {
  slug: 'yilin-kacinci-gunu',
  title: 'Yılın Kaçıncı Günü Hesaplama',
  h1Tail: 'gün sıra numarası',
  pageTitle: 'Yılın Kaçıncı Günü Hesaplama – Tarihin Gün Sıra Numarası',
  description: 'Bir tarihin yılın kaçıncı günü olduğunu bulun. Yıl sonuna kalan günü, yılın yüzde kaçının geçtiğini, haftanın gününü ve artık yıl bilgisini birlikte gösterir.',
  card: 'Seçtiğiniz tarihin yılın kaçıncı günü olduğunu, yıl sonuna kaç gün kaldığını ve yılın yüzde kaçının geçtiğini görün.',
  category: 'zaman',
  keywords: ['yılın kaçıncı günü', 'bugün yılın kaçıncı günü', 'gün sıra numarası', 'yıl sonuna kaç gün kaldı', 'day of year hesaplama', 'yılın günü hesaplama', 'ordinal tarih'],
  lead: 'Bir tarih seçin; o günün 1 Ocak\'tan başlayarak <strong>yılın kaçıncı günü</strong> olduğunu, yıl sonuna kaç gün kaldığını ve yılın yüzde kaçının geride kaldığını hesaplayın. Tarih alanını boş bırakırsanız bugünün tarihi kullanılır.',
  button: 'Hesapla',
  inputs: [
    { id: 'tarih', label: 'Tarih (boş = bugün)', type: 'date', hint: 'GG.AA.YYYY biçiminde de yazabilirsiniz.' },
  ],
  compute(v, h) {
    const d = h.dateOrToday(v.tarih, 'Tarih');
    const y = d.getUTCFullYear();
    if (y < 1583 || y > 9999) h.err('Yıl 1583 ile 9999 arasında olmalı (Miladi takvim).');
    const bas = new Date(Date.UTC(y, 0, 1));
    bas.setUTCFullYear(y);
    const sira = h.gunFarki(bas, d) + 1;
    const artik = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const toplam = artik ? 366 : 365;
    const kalan = toplam - sira;
    return {
      rows: [
        ['Yılın günü', `${sira}. gün`],
        ['Yıl sonuna kalan', `${kalan} gün`],
        ['Yılın uzunluğu', `${toplam} gün (${artik ? 'artık yıl' : 'artık yıl değil'})`],
        ['Yılın geçen kısmı', '%' + h.fmt((sira / toplam) * 100, 2)],
        ['Haftanın günü', h.gunAdi(d)],
        ['Sıralı tarih gösterimi', `${y}-${String(sira).padStart(3, '0')}`],
      ],
      note: `${h.fmtDate(d)} tarihi için hesaplandı. Seçilen gün sayıma dahildir; 1 Ocak yılın 1. günüdür.`,
    };
  },
  cases: [
    { in: { tarih: '15.03.2026' }, out: { 'Yılın günü': '74. gün', 'Yıl sonuna kalan': '291 gün', 'Haftanın günü': 'Pazar', 'Sıralı tarih gösterimi': '2026-074' } },
    { in: { tarih: '2024-02-29' }, out: { 'Yılın günü': '60. gün', 'Yıl sonuna kalan': '306 gün', 'Yılın uzunluğu': '366 gün (artık yıl)' } },
    { in: { tarih: '31.12.2024' }, out: { 'Yılın günü': '366. gün', 'Yıl sonuna kalan': '0 gün', 'Yılın geçen kısmı': '%100' } },
    { in: { tarih: '01.01.2025' }, out: { 'Yılın günü': '1. gün', 'Yıl sonuna kalan': '364 gün', 'Haftanın günü': 'Çarşamba' } },
    { in: { tarih: '01.07.2023' }, out: { 'Yılın günü': '182. gün', 'Yıl sonuna kalan': '183 gün', 'Yılın uzunluğu': '365 gün (artık yıl değil)' } },
    { in: { tarih: '29.10.2023' }, out: { 'Yılın günü': '302. gün', 'Haftanın günü': 'Pazar' } },
    { in: { tarih: '31.02.2025' }, error: true },
    { in: { tarih: 'yarın' }, error: true },
  ],
  howto: [
    '"Tarih" alanından sıra numarasını öğrenmek istediğiniz günü seçin. Bugünü hesaplamak için alanı boş bırakmanız yeterlidir.',
    '"Hesapla" düğmesine basın.',
    'İlk satırda tarihin yılın kaçıncı günü olduğunu, altında yıl sonuna kalan gün sayısını ve yılın yüzde olarak ne kadarının geçtiğini görürsünüz.',
    'Rapor ya da yazışmada kullanacaksanız "Sıralı tarih gösterimi" satırındaki yıl-gün biçimini kopyalayabilirsiniz.',
  ],
  sections: [
    { h: 'Yılın günü nasıl hesaplanır?', p: [
      'Yılın günü, 1 Ocak\'ı 1 kabul ederek o tarihe kadar geçen günlerin sayılmasıyla bulunur. Elle hesaplarken önceki ayların gün sayıları toplanır ve üzerine ayın günü eklenir. Ayların uzunlukları sırasıyla 31, 28 (artık yılda 29), 31, 30, 31, 30, 31, 31, 30, 31, 30 ve 31 gündür.',
      'Örnek olarak 15 Mart 2026\'yı ele alalım. Ocak 31, Şubat 28 gün çeker; ikisinin toplamı 59\'dur. Üzerine Mart\'ın 15 gününü eklediğinizde 59 + 15 = <strong>74</strong> bulunur. 2026 artık yıl olmadığından yıl 365 gündür ve yıl sonuna 365 − 74 = 291 gün kalır. Araç aynı tarihi yazdığınızda bu sonuçları ve o günün Pazar olduğunu gösterir.',
      'Araç hesabı ay tablosuyla değil, 1 Ocak ile seçilen tarih arasındaki gün farkını alarak yapar; sonuç aynıdır ama artık yıl kuralı kendiliğinden doğru uygulanmış olur.',
    ] },
    { h: 'Artık yıllarda neler değişir?', p: [
      'Miladi takvimde 4\'e tam bölünen yıllar artık yıldır; ancak 100\'e bölünüp 400\'e bölünmeyen yıllar bu kuralın dışındadır. Bu yüzden 2024 ve 2000 artık yıl, 2023 ve 1900 ise değildir. Artık yılda Şubat 29 gün çektiği için 1 Mart ve sonrasındaki tüm tarihlerin sıra numarası bir artar.',
      'Bunun pratik sonucu şudur: 1 Mart normal yılda 60. gün, artık yılda 61. gündür. 29 Şubat 2024 yılın 60. günüdür ve yıl sonuna 306 gün vardır. 31 Aralık normal yılda 365., artık yılda 366. gündür. Yıllar arası karşılaştırma yaparken Şubat sonrasındaki bir günlük kaymayı hesaba katmayı unutmayın.',
    ] },
    { h: 'Bu bilgi nerelerde kullanılır?', ul: [
      '<strong>Üretim ve parti kodları:</strong> Gıda, ilaç ve sanayi ürünlerinde üretim tarihi çoğu kez yıl ve gün sıra numarasıyla basılır. Ambalajdaki üç haneli gün kodunu çözmek için aynı hesap tersinden yapılır.',
      '<strong>Tarım ve meteoroloji:</strong> Ekim, çiçeklenme ve hasat zamanları ile sıcaklık toplamları yıllar arasında karşılaştırılırken takvim tarihi yerine yılın günü kullanılır.',
      '<strong>Yazılım ve veri analizi:</strong> Günlük kayıt dosyaları, uydu verileri ve bilimsel veri kümelerinde dosya adları sıklıkla yıl ve gün numarasından oluşur.',
      '<strong>Planlama ve hedef takibi:</strong> Yıllık satış, tasarruf ya da okuma hedefinizde olmanız gereken noktayı, yılın geçen yüzdesine bakarak hızlıca görebilirsiniz.',
      '<strong>Muhasebe ve bütçe:</strong> Gün esaslı kıst hesaplarda dönemin kaç günü geçtiği bilgisi çıkış noktasıdır.',
    ] },
    { h: 'Sıralı tarih gösterimi', p: [
      'Uluslararası tarih standardında takvim tarihinin yanı sıra "sıralı tarih" denilen bir yazım da vardır: dört haneli yıl, bir kısa çizgi ve üç haneli gün numarası. 15 Mart 2026 bu biçimde <code>2026-074</code>, 1 Ocak 2025 ise <code>2025-001</code> olarak yazılır. Gün numarası her zaman üç haneye tamamlanır.',
      'Bu gösterim gündelik dilde bazen "Jülyen tarihi" diye anılır; ancak astronomide kullanılan ve milattan önceki bir başlangıçtan beri kesintisiz sayan Jülyen gün sayısı farklı bir kavramdır. İkisini karıştırmamak gerekir.',
    ] },
    { h: 'Hızlı başvuru: ayların ilk günleri', p: [
      'Artık olmayan bir yılda ayların ilk günlerinin sıra numaraları şöyledir; artık yılda Mart ve sonrasına 1 ekleyin.',
    ], ul: [
      '1 Ocak: 1 · 1 Şubat: 32 · 1 Mart: 60',
      '1 Nisan: 91 · 1 Mayıs: 121 · 1 Haziran: 152',
      '1 Temmuz: 182 · 1 Ağustos: 213 · 1 Eylül: 244',
      '1 Ekim: 274 · 1 Kasım: 305 · 1 Aralık: 335',
    ] },
    { h: 'Yılın yüzdesi ve sık yapılan hatalar', p: [
      'Yılın geçen kısmı, gün numarasının yılın toplam gün sayısına bölünmesiyle bulunur ve seçilen günü tamamlanmış sayar. Bu nedenle 31 Aralık için sonuç %100, 1 Ocak için yaklaşık %0,27\'dir. Yılın tam ortası normal yılda 2 Temmuz öğlenine denk gelir; 1 Temmuz 182. gündür ve geride 183 gün kalır.',
      'En sık yapılan hata, seçilen günü sayıma katmayı unutmak ya da tersine yıl sonuna kalan güne o günü de eklemektir. Bu araçta gün numarası seçilen günü içerir, kalan gün ise içermez; ikisinin toplamı her zaman yılın uzunluğuna eşittir. İkinci yaygın hata, artık yılda Şubat\'ı 28 gün saymaktır.',
      'Araç yalnızca Miladi (Gregoryen) takvimle çalışır ve bu takvimin kullanılmaya başlandığı dönemi kapsayan 1583–9999 yıllarını kabul eder. Daha eski tarihler için o dönemde geçerli olan takvimi ayrıca dikkate almak gerekir.',
    ] },
  ],
  faq: [
    ['Bugün yılın kaçıncı günü?', 'Tarih alanını boş bırakıp "Hesapla" düğmesine bastığınızda araç cihazınızın tarihini kullanır ve bugünün sıra numarasını, yıl sonuna kalan günle birlikte gösterir.'],
    ['Yılın 100. günü hangi tarihe denk gelir?', 'Artık olmayan yıllarda 100. gün 10 Nisan, artık yıllarda 9 Nisan\'dır. Ocak, Şubat ve Mart toplamı normal yılda 90 gün ettiğinden 100. gün Nisan\'ın onuncu günüdür.'],
    ['Yılın 256. günü neden özel sayılır?', '256, bilgisayar dünyasında anlamlı bir sayı olduğu için yılın 256. günü yazılımcılar arasında anılır. Bu gün normal yıllarda 13 Eylül\'e, artık yıllarda 12 Eylül\'e denk gelir.'],
    ['Seçtiğim gün sayıma dahil mi?', 'Evet. 1 Ocak 1. gün kabul edilir ve seçtiğiniz tarih de sayılır. Yıl sonuna kalan gün sayısında ise seçilen gün yer almaz; bu yüzden 31 Aralık için kalan gün sıfırdır.'],
    ['Artık yıl olup olmadığını nasıl anlarım?', 'Sonuçtaki "Yılın uzunluğu" satırı yılın 365 mi 366 gün mü olduğunu ve artık yıl olup olmadığını yazar. Kural: 4\'e bölünen yıllar artıktır, 100\'e bölünüp 400\'e bölünmeyenler hariç.'],
    ['Ambalajdaki üç haneli gün kodunu nasıl tarihe çeviririm?', 'Kodun üretim yılının günü olduğunu varsayarsak, hızlı başvuru tablosundan o sayıdan küçük en büyük ay başlangıcını bulun ve farkı ekleyin. Örneğin 074 kodu, 60 ile başlayan Mart ayının 15. günüdür. Üreticilerin kod düzeni farklı olabileceği için kesin bilgi için üreticiye danışın.'],
    ['Hafta numarası da gösteriliyor mu?', 'Bu araç gün sıra numarasına odaklanır ve haftanın gününü verir. Yılın kaçıncı haftasında olduğunuzu öğrenmek için ilgili araçlar bölümündeki hafta numarası aracını kullanabilirsiniz.'],
    ['Girdiğim tarih kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; seçtiğiniz tarih hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['hafta-numarasi', 'artik-yil-kontrol', 'kac-gun-kaldi', 'tarih-farki', 'hangi-gun-hesapla', 'julyen-gun-hesapla'],
};
