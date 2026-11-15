export default {
  slug: 'bant-genisligi-hesapla',
  title: 'Bant Genişliği İhtiyacı Hesaplama',
  h1Tail: 'kaç Mbps internet gerekir?',
  pageTitle: 'Bant Genişliği İhtiyacı Hesaplama – Kaç Mbps İnternet Yeterli?',
  description: 'Kullanıcı sayısı, kişi başı hız ihtiyacı ve eşzamanlı kullanım oranına göre ofis ya da ev için gereken internet bant genişliğini Mbps olarak hesaplayın.',
  card: 'Kullanıcı sayısı ve eşzamanlı kullanım oranından ofis ya da ev için gereken internet hızını Mbps olarak bulun.',
  category: 'gunluk',
  keywords: ['bant genişliği hesaplama', 'kaç mbps internet yeterli', 'ofis internet hızı hesaplama', 'internet hızı ihtiyacı', 'mbps hesaplama', 'kişi başı internet hızı', 'eşzamanlı kullanıcı bant genişliği'],
  lead: 'İnternet aboneliği seçerken ya da bir ofisin hattını planlarken gereken hız; kaç kişinin bağlandığına, her birinin ne yaptığına ve bunların kaçının <strong>aynı anda</strong> hattı kullandığına bağlıdır. Bu araç üç değeri bir araya getirip yedek payla birlikte önerilen bant genişliğini megabit/saniye olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kullanici', label: 'Kullanıcı (ya da cihaz) sayısı', type: 'number', placeholder: 'Örn. 20' },
    { id: 'kisiBasi', label: 'Kişi başı ihtiyaç (Mbps)', type: 'number', placeholder: 'Örn. 5', hint: 'Aktif bir kullanıcının çalışırken gereksindiği hız' },
    { id: 'eszaman', label: 'Eşzamanlı kullanım oranı (%)', type: 'number', value: '50', hint: 'Aynı anda hattı yoğun kullananların oranı' },
    { id: 'pay', label: 'Yedek pay (%)', type: 'number', value: '20', hint: 'Büyüme ve anlık yoğunluk için' },
  ],
  compute(v, h) {
    const n = h.posint(v.kullanici, 'Kullanıcı sayısı');
    const k = h.pos(v.kisiBasi, 'Kişi başı ihtiyaç');
    const e = h.pos(v.eszaman, 'Eşzamanlı kullanım oranı');
    if (e > 100) h.err('Eşzamanlı kullanım oranı %100\'den büyük olamaz; herkes aynı anda kullanıyorsa 100 yazın.');
    const p = h.nonneg(v.pay, 'Yedek pay');
    const talep = n * k * e / 100;
    const onerilen = talep * (1 + p / 100);
    return {
      rows: [
        ['Önerilen bant genişliği', h.fmt(onerilen, 2) + ' Mbps'],
        ['Anlık toplam talep (paysız)', h.fmt(talep, 2) + ' Mbps'],
        ['Eşzamanlı aktif kullanıcı', h.fmt(n * e / 100, 1) + ' kişi'],
        ['Herkes aynı anda kullanırsa', h.fmt(n * k, 2) + ' Mbps'],
        ['Saniyede aktarılan veri', h.fmt(onerilen / 8, 2) + ' MB/sn'],
        ['1 GB dosyanın aktarım süresi', h.fmt(8000 / onerilen, 0) + ' saniye'],
      ],
      note: 'Formül: kullanıcı × kişi başı Mbps × eşzamanlılık × (1 + pay). 8 megabit = 1 megabayt. İndirme ve yükleme yönlerini ayrı ayrı değerlendirin; sonuç planlama amaçlı bir tahmindir.',
    };
  },
  cases: [
    { in: { kullanici: '20', kisiBasi: '5', eszaman: '50', pay: '20' }, out: { 'Önerilen bant genişliği': '60 Mbps', 'Anlık toplam talep (paysız)': '50 Mbps', 'Eşzamanlı aktif kullanıcı': '10 kişi', 'Herkes aynı anda kullanırsa': '100 Mbps', 'Saniyede aktarılan veri': '7,5 MB/sn', '1 GB dosyanın aktarım süresi': '133 saniye' } },
    { in: { kullanici: '4', kisiBasi: '25', eszaman: '100', pay: '0' }, out: { 'Önerilen bant genişliği': '100 Mbps', 'Saniyede aktarılan veri': '12,5 MB/sn', '1 GB dosyanın aktarım süresi': '80 saniye' } },
    { in: { kullanici: '100', kisiBasi: '2', eszaman: '30', pay: '25' }, out: { 'Önerilen bant genişliği': '75 Mbps', 'Anlık toplam talep (paysız)': '60 Mbps', 'Eşzamanlı aktif kullanıcı': '30 kişi' } },
    { in: { kullanici: '50', kisiBasi: '4', eszaman: '40', pay: '20' }, out: { 'Önerilen bant genişliği': '96 Mbps', 'Anlık toplam talep (paysız)': '80 Mbps', 'Saniyede aktarılan veri': '12 MB/sn' } },
    { in: { kullanici: '8', kisiBasi: '1,5', eszaman: '75', pay: '0' }, out: { 'Önerilen bant genişliği': '9 Mbps', 'Eşzamanlı aktif kullanıcı': '6 kişi', 'Herkes aynı anda kullanırsa': '12 Mbps' } },
    { in: { kullanici: '1', kisiBasi: '10', eszaman: '100', pay: '10' }, out: { 'Önerilen bant genişliği': '11 Mbps', 'Anlık toplam talep (paysız)': '10 Mbps' } },
    { in: { kullanici: '20', kisiBasi: '5', eszaman: '150', pay: '20' }, error: true },
    { in: { kullanici: '0', kisiBasi: '5', eszaman: '50', pay: '20' }, error: true },
    { in: { kullanici: '20', kisiBasi: '', eszaman: '50', pay: '20' }, error: true },
  ],
  howto: [
    'Hattı kullanacak kişi ya da cihaz sayısını yazın.',
    'Aktif bir kullanıcının çalışırken gereksindiği ortalama hızı Mbps olarak girin; aşağıdaki bölümde nasıl tahmin edeceğiniz anlatılıyor.',
    'Aynı anda hattı yoğun kullananların oranını yüzde olarak belirleyin. Herkes sürekli bağlıysa 100, karma kullanımda 30–60 arası bir değer uygundur.',
    'Büyüme ve anlık yoğunluklar için bir yedek pay girin ve "Hesapla" düğmesine basın.',
    'Çıkan değeri, servis sağlayıcıların sunduğu paketlerle karşılaştırırken bir üst basamağa yuvarlayın.',
  ],
  sections: [
    { h: 'Bant genişliği nedir?', p: [
      'Bant genişliği, bir internet bağlantısının birim zamanda taşıyabildiği veri miktarıdır ve megabit/saniye (Mbps) ile ölçülür. Günlük dilde "internet hızı" denilen şey budur. Hattı bir su borusuna benzetebilirsiniz: boru ne kadar genişse aynı anda o kadar çok su geçer. Tek bir kullanıcı için bolca yeten bir hat, aynı anda yirmi kişi görüntülü toplantı yaptığında yetersiz kalabilir; çünkü kapasite paylaşılır.',
      'Abonelik hızları megabit ile ifade edilir, dosya boyutları ise megabayt ile. Aradaki oran 8\'dir: <strong>8 megabit = 1 megabayt</strong>. 100 Mbps\'lik bir hat kuramsal olarak saniyede 12,5 megabayt veri indirir; araç bu karşılığı ve 1 gigabaytlık bir dosyanın yaklaşık aktarım süresini de gösterir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Araç şu formülü kullanır: <strong>önerilen bant genişliği = kullanıcı sayısı × kişi başı ihtiyaç × eşzamanlılık oranı × (1 + yedek pay)</strong>. İlk üç çarpan anlık toplam talebi verir; yedek pay bu talebin üzerine bir güvenlik aralığı ekler.',
      'Çözümlü örnek: 20 kişilik bir ofiste aktif kullanıcı başına 5 Mbps öngörülüyor ve çalışanların yarısının aynı anda hattı yoğun kullandığı kabul ediliyor. Anlık talep 20 × 5 × 0,50 = 50 Mbps\'dir. Yüzde 20 yedek payla 50 × 1,20 = 60 Mbps bulunur. Herkes aynı anda tam kapasite kullansaydı 100 Mbps gerekirdi; eşzamanlılık oranı bu farkı açıklar. 60 Mbps\'lik hat saniyede 7,5 megabayt taşır ve 1 gigabaytlık bir dosyayı yaklaşık 133 saniyede aktarır.',
      'İkinci örnek: dört kişilik bir evde herkes aynı anda yüksek çözünürlüklü yayın izliyor ve kişi başı 25 Mbps ayrılıyor. Eşzamanlılık yüzde 100, pay sıfır alınırsa 4 × 25 = 100 Mbps gerekir.',
    ] },
    { h: 'Kişi başı ihtiyacı tahmin etmek', p: [
      'Kişi başı hız, kullanıcının en çok yaptığı işe göre belirlenir. Aşağıdaki değerler kesin ölçüler değil, planlama için yaygın kullanılan kaba aralıklardır; uygulamanın kalitesine ve ayarlarına göre değişir:',
    ], ul: [
      '<strong>E-posta, mesajlaşma, web\'de gezinme:</strong> yaklaşık 1–2 Mbps',
      '<strong>Sesli görüşme (internet üzerinden telefon):</strong> çağrı başına 0,1 Mbps civarı',
      '<strong>Görüntülü toplantı:</strong> katılımcı başına yaklaşık 2–4 Mbps (hem indirme hem yükleme)',
      '<strong>Yüksek çözünürlüklü (HD) video izleme:</strong> yaklaşık 5 Mbps',
      '<strong>4K video izleme:</strong> yaklaşık 15–25 Mbps',
      '<strong>Bulut tabanlı ofis ve muhasebe uygulamaları:</strong> yaklaşık 1–3 Mbps',
      '<strong>Büyük dosya yükleme ve yedekleme:</strong> hattın tamamını kullanabilir; mesai dışına planlamak en doğrusudur',
    ], p: [
      'Bir kullanıcının aynı anda birkaç iş yaptığını (toplantıdayken arka planda dosya eşitlemesi gibi) unutmayın. Emin değilseniz, yönlendiricinizin ya da güvenlik duvarınızın trafik grafiklerinden yoğun saatteki gerçek kullanımı okuyup kullanıcı sayısına bölmek en güvenilir yöntemdir.',
    ] },
    { h: 'Eşzamanlılık oranı neden önemli?', p: [
      'Bütün kullanıcılar her an tam hızda veri çekmez. Bir kişi sayfayı okurken hat boştadır; bir başkası o sırada dosya indirir. Bu yüzden toplam ihtiyaç, kişi başı değerin kullanıcı sayısıyla düz çarpımından düşüktür. Eşzamanlılık oranı bu gerçeği hesaba katar. Çağrı merkezi ya da herkesin gün boyu görüntülü görüşmede olduğu ekiplerde oran yüzde 80–100\'e yaklaşır. Karma işlerin yapıldığı tipik bir ofiste yüzde 30–60 aralığı makuldür. Misafir ağı, otel ya da kafe gibi kullanıcıların gelip geçtiği yerlerde oran daha da düşük alınabilir.',
      'Oranı çok düşük seçmek hattı kâğıt üzerinde ucuzlatır ama yoğun saatlerde donan toplantılar ve yavaş açılan sayfalar olarak geri döner. Kararsız kaldığınızda yüksek değeri seçmek ve yedek payı sıfırlamamak daha güvenlidir.',
    ] },
    { h: 'İndirme ve yükleme hızı ayrı düşünülmeli', p: [
      'Ev tipi aboneliklerin çoğunda yükleme (upload) hızı indirme hızından belirgin biçimde düşüktür. Oysa görüntülü toplantı, bulut yedekleme, uzaktan izlenen güvenlik kameraları, dışarıya hizmet veren sunucular ve büyük dosya gönderimi yükleme yönünü kullanır. Hesabı bir kez indirme, bir kez de yükleme ihtiyacı için yapın ve seçtiğiniz paketin her iki değerine de bakın. Bir ofiste on kişi aynı anda kamerası açık toplantıdaysa ve kişi başı 3 Mbps yükleme gerekiyorsa yalnızca bu iş için 30 Mbps yükleme kapasitesi gerekir.',
    ] },
    { h: 'Sınırlar ve pratik notlar', ul: [
      'Abonelikte yazan hız çoğunlukla "en fazla" değerdir; hattın mesafesi, altyapı türü ve yoğun saatler gerçek hızı düşürebilir.',
      'Kablosuz ağ kapasitesi ayrı bir darboğazdır: hat hızlı olsa bile zayıf sinyal ya da kalabalık kanal kullanıcıya düşük hız olarak yansır.',
      'Gecikme ve paket kaybı bant genişliğinden bağımsızdır; sesli ve görüntülü görüşmenin kalitesini çoğu zaman bunlar belirler.',
      'Kritik uygulamalara öncelik tanıyan trafik yönetimi (QoS), aynı hattan daha dengeli yararlanmayı sağlar.',
      'Kotalı ya da adil kullanım sınırı olan tarifelerde hız kadar aylık veri miktarı da hesaba katılmalıdır.',
    ], p: [
      'Bu araç bir planlama tahmini üretir; sözleşme imzalamadan önce mümkünse mevcut kullanımınızı ölçün ve servis sağlayıcınızdan taahhüt edilen hız değerlerini yazılı olarak isteyin.',
    ] },
  ],
  faq: [
    ['10 kişilik ofis için kaç Mbps internet gerekir?', 'Kişi başı 5 Mbps, yüzde 50 eşzamanlılık ve yüzde 20 payla 10 × 5 × 0,5 × 1,2 = 30 Mbps yeterlidir. Herkes sürekli görüntülü toplantıdaysa oranı yükseltin; aynı ofis için ihtiyaç 60 Mbps\'ye kadar çıkabilir.'],
    ['Mbps ile MB/sn arasındaki fark nedir?', 'Mbps megabit/saniye, MB/sn megabayt/saniyedir. 1 bayt 8 bit olduğundan Mbps değerini 8\'e bölerek MB/sn bulunur: 100 Mbps, saniyede 12,5 megabayt demektir.'],
    ['Eşzamanlılık oranını nasıl belirlerim?', 'Yoğun bir saatte kullanıcıların kaçının aynı anda veri aktardığını düşünün. En sağlıklı yol, ağ cihazınızın trafik istatistiklerinden en yoğun andaki kullanımı okuyup bunu "herkes aynı anda" değerine bölmektir.'],
    ['Yedek pay ne kadar olmalı?', 'Kısa vadeli planlamada yüzde 20–30 yaygın bir tercihtir. Ekibin büyümesi bekleniyorsa ya da yeni bulut uygulamalarına geçilecekse payı daha yüksek tutabilirsiniz.'],
    ['Cihaz sayısını mı, kişi sayısını mı yazmalıyım?', 'Aktif olarak veri kullanan birimi yazın. Ofiste genellikle kişi sayısı yeterlidir; akıllı televizyon, kamera ve sürekli veri gönderen cihazlar çoksa bunları ayrı bir hesapla ekleyin.'],
    ['Hız testim abonelik hızından düşük çıkıyor, neden?', 'Kablosuz bağlantı, eski ağ donanımı, aynı anda hattı kullanan başka cihazlar ve altyapı koşulları ölçümü düşürür. Kablolu bağlı bir bilgisayarla ve başka cihazlar boştayken yapılan test daha doğru sonuç verir.'],
    ['Fiber ve diğer altyapılar arasında hesap değişir mi?', 'Formül aynıdır; değişen, hattın sunabildiği en yüksek hız ve yükleme kapasitesidir. Hesapladığınız indirme ve yükleme ihtiyacını adresinizde sunulan altyapının değerleriyle karşılaştırın.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ip-kamera-bant-genisligi-hesapla', 'ip-alt-ag-hesapla', 'raid-kapasite-hesapla', 'guvenlik-kamerasi-depolama-hesapla', 'poe-guc-butcesi-hesapla'],
};
