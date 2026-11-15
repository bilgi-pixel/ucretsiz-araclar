export default {
  slug: 'doluluk-orani-hesapla',
  title: 'Doluluk Oranı Hesaplama',
  h1Tail: 'otel, kiralık, masa, araç',
  pageTitle: 'Doluluk Oranı Hesaplama – Otel, Kiralık Daire ve Kapasite Doluluğu',
  description: 'Dolu birim sayısını toplam kapasiteye bölerek doluluk oranını hesaplayın; gelir girerseniz satılan birim başına ortalama fiyatı ve kapasite başına geliri de görün.',
  card: 'Otel odası, kiralık daire, koltuk ya da masa için doluluk oranını, boş kapasiteyi ve birim başına geliri hesaplayın.',
  category: 'finans',
  keywords: ['doluluk oranı hesaplama', 'otel doluluk oranı', 'doluluk oranı formülü', 'doluluk yüzdesi', 'boşluk oranı', 'oda doluluk hesaplama', 'kapasite kullanım oranı', 'kullanılabilir oda başına gelir'],
  lead: 'Elinizdeki kapasitenin yüzde kaçının kullanıldığını bulun. Araç <strong>dolu birim ÷ toplam kapasite</strong> oranını hesaplar; birden çok günlük dönemleri ve geliri de hesaba katarak boş kapasiteyi, satılan birim başına ortalama fiyatı ve kapasite başına geliri gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'dolu', label: 'Dolu (satılan) birim sayısı', type: 'number', placeholder: 'Örn. 2100', hint: 'Dönem birden çok günse toplam oda-gece, koltuk-sefer ya da daire-ay sayısı.' },
    { id: 'kapasite', label: 'Kapasite (birim sayısı)', type: 'number', placeholder: 'Örn. 100', hint: 'Oda, daire, koltuk, masa, yatak ya da park yeri sayısı.' },
    { id: 'gun', label: 'Dönem sayısı (gün, sefer ya da ay)', type: 'number', value: '1', hint: 'Tek gün ya da anlık durum için 1; aylık otel hesabı için 30.' },
    { id: 'gelir', label: 'Dönem geliri (TL)', type: 'number', placeholder: 'İsteğe bağlı, örn. 4200000', hint: 'Binlik ayraç kullanmayın ya da 4.200.000,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const dolu = h.nonneg(v.dolu, 'Dolu birim sayısı');
    const kap = h.pos(v.kapasite, 'Kapasite');
    const gun = h.pos(v.gun, 'Dönem sayısı');
    const toplam = kap * gun;
    if (dolu > toplam + 1e-9) h.err(`Dolu birim sayısı toplam kapasiteden (${h.fmt(toplam, 2)}) büyük olamaz. Dönem birden çok günse "Dönem sayısı" alanını doldurun.`);
    const oran = dolu / toplam * 100;
    const rows = [
      ['Doluluk oranı', '%' + h.fmt(oran, 2)],
      ['Boşluk oranı', '%' + h.fmt(100 - oran, 2)],
      ['Toplam kapasite', h.fmt(toplam, 2)],
      ['Boş kalan kapasite', h.fmt(toplam - dolu, 2)],
      ['Dönem başına ortalama dolu birim', h.fmt(dolu / gun, 2)],
    ];
    let note = 'Toplam kapasite, birim sayısı ile dönem sayısının çarpımıdır. Bakım ya da tadilat nedeniyle satışa kapalı birimleri kapasiteden düşerseniz satışa açık kapasiteye göre doluluğu bulursunuz.';
    if (String(v.gelir ?? '').trim() !== '') {
      const gelir = h.nonneg(v.gelir, 'Dönem geliri');
      if (dolu > 0) rows.push(['Dolu birim başına ortalama gelir', h.para(gelir / dolu)]);
      rows.push(['Kapasite birimi başına gelir', h.para(gelir / toplam)]);
      if (dolu > 0 && oran < 100 - 1e-9) rows.push(['Boş kapasitenin gelir karşılığı', h.para(gelir / dolu * (toplam - dolu))]);
      note = 'Kapasite birimi başına gelir, ortalama fiyat ile doluluk oranının çarpımına eşittir. Boş kapasitenin gelir karşılığı, boş birimlerin aynı ortalama fiyatla satıldığı varsayımına dayanan kuramsal bir üst sınırdır.';
    }
    return { rows, note };
  },
  cases: [
    { in: { dolu: '2100', kapasite: '100', gun: '30', gelir: '4200000' }, out: { 'Doluluk oranı': '%70', 'Boşluk oranı': '%30', 'Toplam kapasite': '3.000', 'Boş kalan kapasite': '900', 'Dönem başına ortalama dolu birim': '70', 'Dolu birim başına ortalama gelir': '2.000,00 TL', 'Kapasite birimi başına gelir': '1.400,00 TL', 'Boş kapasitenin gelir karşılığı': '1.800.000,00 TL' } },
    { in: { dolu: '45', kapasite: '60' }, out: { 'Doluluk oranı': '%75', 'Boşluk oranı': '%25', 'Toplam kapasite': '60', 'Boş kalan kapasite': '15' } },
    { in: { dolu: '22', kapasite: '24', gun: '12' }, out: { 'Doluluk oranı': '%7,64', 'Toplam kapasite': '288' } },
    { in: { dolu: '264', kapasite: '24', gun: '12', gelir: '3960000' }, out: { 'Doluluk oranı': '%91,67', 'Boşluk oranı': '%8,33', 'Boş kalan kapasite': '24', 'Dolu birim başına ortalama gelir': '15.000,00 TL', 'Kapasite birimi başına gelir': '13.750,00 TL' } },
    { in: { dolu: '0', kapasite: '40', gun: '1', gelir: '0' }, out: { 'Doluluk oranı': '%0', 'Boşluk oranı': '%100', 'Kapasite birimi başına gelir': '0,00 TL' } },
    { in: { dolu: '180', kapasite: '180', gun: '1' }, out: { 'Doluluk oranı': '%100', 'Boşluk oranı': '%0', 'Boş kalan kapasite': '0' } },
    { in: { dolu: '1302', kapasite: '50', gun: '31' }, out: { 'Doluluk oranı': '%84', 'Dönem başına ortalama dolu birim': '42' } },
    { in: { dolu: '2100', kapasite: '100', gun: '1' }, error: true },
    { in: { dolu: '45', kapasite: '0' }, error: true },
    { in: { dolu: 'dolu', kapasite: '60' }, error: true },
  ],
  howto: [
    '"Dolu birim sayısı" alanına kullanılan kapasiteyi yazın. Tek bir gün ya da an için o anda dolu olan oda, daire, koltuk ya da masa sayısını; bir dönem için dönem boyunca satılan toplam oda-gece sayısını girin.',
    '"Kapasite" alanına sahip olduğunuz toplam birim sayısını yazın.',
    'Dönem birden çok gün, sefer ya da ay içeriyorsa "Dönem sayısı" alanına bu sayıyı girin. Araç kapasiteyi dönem sayısıyla çarparak toplam kapasiteyi bulur.',
    'İsterseniz dönem gelirini yazın ve "Hesapla" düğmesine basın. Doluluk ve boşluk oranı ile birlikte birim başına gelir göstergeleri listelenir.',
  ],
  sections: [
    { h: 'Doluluk oranı nedir?', p: [
      'Doluluk oranı, satışa ya da kullanıma sunulan kapasitenin ne kadarının fiilen kullanıldığını gösteren yüzdedir. Formülü yalındır: <strong>Doluluk oranı = Dolu birim sayısı ÷ Toplam kapasite × 100</strong>. Tamamlayıcısı boşluk oranıdır ve ikisinin toplamı %100 eder.',
      'Otel odası, apart daire, öğrenci yurdu yatağı, uçak ve otobüs koltuğu, restoran masası, otopark yeri, depo rafı, ortak ofis masası, hastane yatağı gibi sayısı sınırlı ve bugün satılamayan kapasitesi yarına devredilemeyen her işte temel göstergedir. Boş geçen bir oda-gece ya da boş kalkan bir koltuk sonradan telafi edilemez; bu yüzden doluluk, gelirle birlikte en yakından izlenen rakamdır.',
    ] },
    { h: 'Dönemlik hesap: oda-gece mantığı', p: [
      'Tek bir gün için hesap doğrudandır: 60 odalı bir otelde 45 oda doluysa doluluk 45 ÷ 60 = %75\'tir. Bir ay ya da sezon için ise her günün dolu oda sayıları toplanır ve toplam kapasiteye bölünür. Toplam kapasite, birim sayısı ile dönem gün sayısının çarpımıdır.',
      'Örnek: 100 odalı bir otel 30 günlük bir ayda toplam 2.100 oda-gece satmış olsun. Toplam kapasite 100 × 30 = 3.000 oda-gecedir. Doluluk oranı 2.100 ÷ 3.000 = %70, boş geçen kapasite 900 oda-gece, günlük ortalama dolu oda sayısı 2.100 ÷ 30 = 70\'tir. Günlük doluluk oranlarının basit ortalamasını almak yerine bu yöntemi kullanmak, kapasitenin gün içinde değiştiği durumlarda da doğru sonuç verir.',
    ] },
    { h: 'Doluluk tek başına yetmez: fiyat ve gelir', p: [
      'Yüksek doluluk her zaman yüksek gelir demek değildir; fiyatı yarıya indirerek dolan bir tesis, daha az dolu ama iyi fiyatla satan bir tesisten az kazanabilir. Bu nedenle konaklama sektöründe doluluk, iki gelir göstergesiyle birlikte okunur.',
    ], ul: [
      '<strong>Dolu birim başına ortalama gelir</strong> = Gelir ÷ Satılan birim. Otelcilikte ortalama günlük oda fiyatı olarak bilinir.',
      '<strong>Kapasite birimi başına gelir</strong> = Gelir ÷ Toplam kapasite. Otelcilikte kullanılabilir oda başına gelir olarak bilinir ve ortalama fiyat ile doluluk oranının çarpımına eşittir.',
    ] },
    { h: 'Gelirli çözümlü örnek', p: [
      'Yukarıdaki otelin aylık oda geliri 4.200.000 TL olsun. Satılan oda-gece başına ortalama gelir 4.200.000 ÷ 2.100 = 2.000 TL\'dir. Kapasite birimi başına gelir 4.200.000 ÷ 3.000 = 1.400 TL çıkar; bu aynı zamanda 2.000 TL × %70 işlemine eşittir. Boş geçen 900 oda-gece aynı ortalama fiyatla satılabilseydi 900 × 2.000 = 1.800.000 TL ek gelir oluşurdu. Bu rakam gerçekleşmesi beklenen bir hedef değil, boş kapasitenin büyüklüğünü paraya çeviren kuramsal bir göstergedir; çünkü doluluğu artırmak çoğu zaman fiyat indirmeyi gerektirir.',
    ] },
    { h: 'Farklı sektörlerde kullanım', ul: [
      '<strong>Kiralık gayrimenkul:</strong> 24 daireli bir binada yıl boyunca dairelerin dolu geçtiği ayları toplayın; 264 daire-ay doluysa oran 264 ÷ (24 × 12) = %91,67\'dir. Kira getirisi hesaplarında boş geçen ayları hesaba katmak için kullanılır.',
      '<strong>Ulaşım:</strong> Satılan koltuk sayısının toplam koltuk kapasitesine oranı. Dönem sayısına sefer sayısını yazın.',
      '<strong>Restoran ve kafe:</strong> Belirli bir saat aralığında dolu masa ya da sandalye oranı; yoğun saatleri belirlemek ve rezervasyon politikası için.',
      '<strong>Depo ve otopark:</strong> Dolu palet yeri ya da park yeri oranı.',
      '<strong>Eğitim ve etkinlik:</strong> Kayıtlı katılımcının kontenjana oranı.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, pay ile paydanın aynı dönemi kapsamamasıdır: aylık toplam satılan oda-gece sayısını tek günlük kapasiteye bölmek %100\'ün çok üzerinde anlamsız bir sonuç verir; araç bu durumda uyarır. İkinci nokta, kapasitenin tanımıdır. Tadilattaki, arızalı ya da personele ayrılmış birimleri kapasiteye dahil edip etmemek oranı değiştirir; hangi tanımı seçerseniz dönemler arasında koruyun.',
      'Çok yüksek doluluk da her zaman ideal değildir. Sürekli tam dolu çalışan bir tesis fiyatı düşük tutuyor ya da talebi geri çeviriyor olabilir; bakım için zaman kalmaması ve hizmet kalitesinin düşmesi de olasıdır. Ayrıca sezonluk işlerde yıllık ortalama, yoğun ve durgun ayların çok farklı tablolarını gizler; ay ay hesaplamak daha öğreticidir. Sonuçlar bilgilendirme amaçlıdır; yatırım ve fiyatlama kararlarında gelir, maliyet ve pazar koşullarını bir bütün olarak değerlendirin.',
    ] },
  ],
  faq: [
    ['Doluluk oranı nasıl hesaplanır?', 'Dolu birim sayısı toplam kapasiteye bölünür ve 100 ile çarpılır. 60 odalı bir otelde 45 oda doluysa oran 45 ÷ 60 × 100 = %75\'tir.'],
    ['Aylık otel doluluk oranını nasıl bulurum?', 'Ay boyunca satılan toplam oda-gece sayısını, oda sayısı ile ayın gün sayısının çarpımına bölün. 100 odalı bir otelde 30 günde 2.100 oda-gece satıldıysa oran 2.100 ÷ 3.000 = %70 olur. Araçta kapasiteye 100, dönem sayısına 30 yazmanız yeterlidir.'],
    ['Boşluk oranı nedir?', 'Kullanılmayan kapasitenin toplam kapasiteye oranıdır ve 100 eksi doluluk oranına eşittir. Kiralık gayrimenkulde boş geçen sürenin etkisini görmek için sıkça kullanılır.'],
    ['Doluluk oranı %100\'ü geçebilir mi?', 'Tanım gereği geçemez; kapasiteden fazla birim dolu olamaz. Aynı masanın ya da aynı odanın gün içinde birden çok kez satıldığı durumlar ayrı bir göstergeyle, devir sayısıyla ölçülür. Araç %100\'ün üzerinde bir sonuca yol açan girdilerde hata verir.'],
    ['İyi bir doluluk oranı yüzde kaçtır?', 'Sektöre, konuma ve sezona göre değişir; tek bir doğru değer yoktur. Önemli olan, doluluğu fiyatla birlikte değerlendirmek ve başabaş noktanızı karşılayan doluluk düzeyini bilmektir.'],
    ['Kapasite birimi başına gelir neden önemlidir?', 'Doluluk ve fiyatı tek rakamda birleştirir. Fiyatı düşürerek doluluğu artırdığınızda ya da tersini yaptığınızda toplam sonucun iyileşip iyileşmediğini bu gösterge söyler.'],
    ['Kiralık dairelerim için nasıl kullanırım?', 'Kapasiteye daire sayısını, dönem sayısına ay sayısını, dolu birim alanına dairelerin kirada olduğu toplam ay sayısını yazın. Tek bir daire için 12 ayın 11\'i doluysa doluluk %91,67\'dir.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kapasite, doluluk ve gelir bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['verimlilik-orani-hesapla', 'kira-getirisi-hesapla', 'yuzde-hesapla', 'basabas-noktasi-hesapla', 'calisan-basi-ciro-hesapla'],
};
