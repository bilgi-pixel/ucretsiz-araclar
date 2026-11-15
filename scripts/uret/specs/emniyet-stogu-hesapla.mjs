export default {
  slug: 'emniyet-stogu-hesapla',
  title: 'Emniyet Stoğu Hesaplama',
  h1Tail: 've yeniden sipariş noktası',
  pageTitle: 'Emniyet Stoğu Hesaplama – Güvenlik Stoku ve Yeniden Sipariş Noktası',
  description: 'Günlük satış ve tedarik süresi verilerinden emniyet stoğunu ve yeniden sipariş noktasını hesaplayın; en yüksek–ortalama ya da servis düzeyi yöntemini seçin.',
  card: 'Günlük satış ve tedarik süresinden emniyet stoğunu ve yeniden sipariş noktasını iki farklı yöntemle hesaplayın.',
  category: 'finans',
  keywords: ['emniyet stoğu hesaplama', 'güvenlik stoku hesaplama', 'emniyet stoku formülü', 'yeniden sipariş noktası', 'asgari stok hesaplama', 'servis düzeyi stok', 'safety stock hesaplama', 'kritik stok seviyesi'],
  lead: 'Talep beklenenden yüksek geldiğinde ya da tedarikçi geciktiğinde rafın boş kalmaması için tutulması gereken <strong>emniyet stoğunu</strong> ve siparişin verilmesi gereken stok düzeyini (yeniden sipariş noktası) hesaplayın.',
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Hesaplama yöntemi', type: 'select', options: [['maks', 'En yüksek – ortalama yöntemi'], ['servis', 'Servis düzeyi (istatistiksel) yöntemi']] },
    { id: 'ortSatis', label: 'Ortalama günlük satış (birim)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'ortSure', label: 'Ortalama tedarik süresi (gün)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'maksSatis', label: 'En yüksek günlük satış (birim)', type: 'number', placeholder: 'Örn. 70', hint: 'Yalnızca en yüksek – ortalama yönteminde kullanılır.' },
    { id: 'maksSure', label: 'En uzun tedarik süresi (gün)', type: 'number', placeholder: 'Örn. 15', hint: 'Yalnızca en yüksek – ortalama yönteminde kullanılır.' },
    { id: 'sapma', label: 'Günlük satışın standart sapması (birim)', type: 'number', placeholder: 'Örn. 10', hint: 'Yalnızca servis düzeyi yönteminde kullanılır.' },
    { id: 'duzey', label: 'Hedef servis düzeyi', type: 'select', value: '95', options: [['90', '%90'], ['95', '%95'], ['97.5', '%97,5'], ['99', '%99'], ['99.9', '%99,9']], hint: 'Yalnızca servis düzeyi yönteminde kullanılır.' },
  ],
  compute(v, h) {
    const Z = { '90': 1.281552, '95': 1.644854, '97.5': 1.959964, '99': 2.326348, '99.9': 3.090232 };
    const ort = h.pos(v.ortSatis, 'Ortalama günlük satış');
    const sure = h.pos(v.ortSure, 'Ortalama tedarik süresi');
    const beklenen = ort * sure;
    let ss;
    const rows = [];
    let note;
    if (v.yontem === 'servis') {
      const sapma = h.nonneg(v.sapma, 'Günlük satışın standart sapması');
      const z = Z[v.duzey] || Z['95'];
      ss = z * sapma * Math.sqrt(sure);
      rows.push(['Emniyet stoğu', h.fmt(ss, 2) + ' birim']);
      rows.push(['Yukarı yuvarlanmış emniyet stoğu', h.fmt(Math.ceil(ss - 1e-9), 0) + ' birim']);
      rows.push(['Yeniden sipariş noktası', h.fmt(beklenen + ss, 2) + ' birim']);
      rows.push(['Tedarik süresindeki beklenen talep', h.fmt(beklenen, 2) + ' birim']);
      rows.push(['Z katsayısı', h.fmt(z, 4)]);
      rows.push(['Tedarik süresi talebinin standart sapması', h.fmt(sapma * Math.sqrt(sure), 2) + ' birim']);
      note = 'Emniyet stoğu = Z × günlük standart sapma × √tedarik süresi. Talebin normal dağıldığı ve tedarik süresinin sabit olduğu varsayılır.';
    } else {
      const mSatis = h.pos(v.maksSatis, 'En yüksek günlük satış');
      const mSure = h.pos(v.maksSure, 'En uzun tedarik süresi');
      if (mSatis < ort) h.err('En yüksek günlük satış, ortalama günlük satıştan küçük olamaz.');
      if (mSure < sure) h.err('En uzun tedarik süresi, ortalama tedarik süresinden kısa olamaz.');
      ss = mSatis * mSure - beklenen;
      rows.push(['Emniyet stoğu', h.fmt(ss, 2) + ' birim']);
      rows.push(['Yukarı yuvarlanmış emniyet stoğu', h.fmt(Math.ceil(ss - 1e-9), 0) + ' birim']);
      rows.push(['Yeniden sipariş noktası', h.fmt(beklenen + ss, 2) + ' birim']);
      rows.push(['Tedarik süresindeki beklenen talep', h.fmt(beklenen, 2) + ' birim']);
      rows.push(['En kötü durumdaki talep', h.fmt(mSatis * mSure, 2) + ' birim']);
      note = 'Emniyet stoğu = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi).';
    }
    rows.push(['Emniyet stoğunun karşıladığı süre', h.fmt(ss / ort, 1) + ' gün']);
    return { rows, note };
  },
  cases: [
    { in: { yontem: 'maks', ortSatis: '50', ortSure: '10', maksSatis: '70', maksSure: '15' }, out: { 'Emniyet stoğu': '550 birim', 'Yeniden sipariş noktası': '1.050 birim', 'Tedarik süresindeki beklenen talep': '500 birim', 'En kötü durumdaki talep': '1.050 birim', 'Emniyet stoğunun karşıladığı süre': '11 gün' } },
    { in: { yontem: 'servis', ortSatis: '50', ortSure: '9', sapma: '10', duzey: '95' }, out: { 'Emniyet stoğu': '49,35 birim', 'Yukarı yuvarlanmış emniyet stoğu': '50 birim', 'Yeniden sipariş noktası': '499,35 birim', 'Z katsayısı': '1,6449', 'Tedarik süresi talebinin standart sapması': '30 birim' } },
    { in: { yontem: 'servis', ortSatis: '100', ortSure: '4', sapma: '20', duzey: '99' }, out: { 'Emniyet stoğu': '93,05 birim', 'Yukarı yuvarlanmış emniyet stoğu': '94 birim', 'Yeniden sipariş noktası': '493,05 birim' } },
    { in: { yontem: 'maks', ortSatis: '20', ortSure: '7', maksSatis: '30', maksSure: '10' }, out: { 'Emniyet stoğu': '160 birim', 'Yeniden sipariş noktası': '300 birim', 'Emniyet stoğunun karşıladığı süre': '8 gün' } },
    { in: { yontem: 'servis', ortSatis: '40', ortSure: '16', sapma: '5', duzey: '90' }, out: { 'Emniyet stoğu': '25,63 birim', 'Yeniden sipariş noktası': '665,63 birim' } },
    { in: { yontem: 'maks', ortSatis: '12,5', ortSure: '4', maksSatis: '12,5', maksSure: '4' }, out: { 'Emniyet stoğu': '0 birim', 'Yeniden sipariş noktası': '50 birim' } },
    { in: { yontem: 'servis', ortSatis: '50', ortSure: '9', sapma: '10', duzey: '97.5' }, out: { 'Emniyet stoğu': '58,8 birim', 'Z katsayısı': '1,96' } },
    { in: { yontem: 'maks', ortSatis: '50', ortSure: '10', maksSatis: '40', maksSure: '15' }, error: true },
    { in: { yontem: 'servis', ortSatis: '50', ortSure: '9', sapma: '', duzey: '95' }, error: true },
    { in: { yontem: 'maks', ortSatis: '0', ortSure: '10', maksSatis: '70', maksSure: '15' }, error: true },
  ],
  howto: [
    'Yöntemi seçin. Elinizde yalnızca en yüksek ve ortalama değerler varsa ilk yöntemi, satış verilerinizin standart sapmasını biliyorsanız servis düzeyi yöntemini kullanın.',
    'Ortalama günlük satış miktarını ve tedarikçinin siparişi teslim etmesi için geçen ortalama gün sayısını yazın.',
    'İlk yöntemde geçmiş dönemde görülen en yüksek günlük satışı ve en uzun teslim süresini; ikinci yöntemde günlük satışın standart sapmasını ve hedeflediğiniz servis düzeyini girin.',
    '"Hesapla" düğmesine basın. İlk satır tutmanız gereken emniyet stoğunu, "Yeniden sipariş noktası" satırı ise stok hangi düzeye indiğinde yeni sipariş vermeniz gerektiğini gösterir.',
  ],
  sections: [
    { h: 'Emniyet stoğu nedir?', p: [
      'Emniyet stoğu (güvenlik stoku ya da tampon stok), normal koşullarda dokunulmaması planlanan, yalnızca işler beklendiği gibi gitmediğinde devreye giren yedek stoktur. Talep bir hafta boyunca ortalamanın üstünde seyredebilir, tedarikçinin aracı gümrükte bekleyebilir, üretim hattı arızalanabilir. Emniyet stoğu, bu belirsizliklerin müşteriye "ürün kalmadı" olarak yansımasını engelleyen sigortadır.',
      'Sigortanın bir primi vardır: emniyet stoğu depoda yer kaplar ve sermaye bağlar. Bu yüzden amaç stoku olabildiğince yüksek tutmak değil, stoksuz kalma riski ile stok tutma maliyeti arasında bilinçli bir denge kurmaktır.',
    ] },
    { h: 'En yüksek – ortalama yöntemi', p: [
      'En yaygın ve en kolay yöntemdir; istatistik bilgisi gerektirmez. Formül: <strong>emniyet stoğu = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi)</strong>. İlk çarpım olabilecek en kötü senaryodaki talebi, ikinci çarpım ise olağan durumdaki talebi verir; aradaki fark tampon olarak tutulur.',
      'Örnek: Bir kırtasiye toptancısı bir defterden günde ortalama 50, en yoğun günde 70 adet satıyor. Tedarikçi normalde 10 günde, en geç 15 günde teslim ediyor. Emniyet stoğu = (70 × 15) − (50 × 10) = 1.050 − 500 = <strong>550 adet</strong>. Bu stok, ortalama satış hızıyla 11 günlük ihtiyacı karşılar.',
      'Yöntemin zayıf yanı, aynı anda hem en yüksek satışın hem de en uzun gecikmenin yaşanacağını varsaymasıdır. Geçmişteki tek bir olağanüstü gün ya da bir kereye mahsus yaşanan uzun gecikme, emniyet stoğunu gereğinden fazla şişirebilir. Bu tür uç değerleri ayıklamak ya da ikinci yöntemi kullanmak daha dengeli sonuç verir.',
    ] },
    { h: 'Servis düzeyi (istatistiksel) yöntemi', p: [
      'Bu yöntem, "sipariş döngülerinin yüzde kaçında stoksuz kalmamayı hedefliyorum" sorusundan yola çıkar. Formül: <strong>emniyet stoğu = Z × σ × √L</strong>. Burada σ günlük satışın standart sapması, L gün olarak tedarik süresi, Z ise hedeflenen servis düzeyine karşılık gelen normal dağılım katsayısıdır.',
      'Örnek: Günlük ortalama satış 50 adet, standart sapma 10 adet, tedarik süresi 9 gün ve hedef servis düzeyi %95 olsun. Z = 1,6449 alınır. Emniyet stoğu = 1,6449 × 10 × √9 = 1,6449 × 10 × 3 = <strong>49,35 adet</strong>, yukarı yuvarlandığında 50 adet. Tedarik süresi boyunca beklenen talep 50 × 9 = 450 adet olduğundan yeniden sipariş noktası 499,35 adettir.',
    ], ul: [
      '%90 servis düzeyi → Z = 1,2816',
      '%95 servis düzeyi → Z = 1,6449',
      '%97,5 servis düzeyi → Z = 1,9600',
      '%99 servis düzeyi → Z = 2,3263',
      '%99,9 servis düzeyi → Z = 3,0902',
    ] },
    { h: 'Yeniden sipariş noktası', p: [
      'Emniyet stoğu tek başına bir eylem tetiklemez; asıl kullanılan değer yeniden sipariş noktasıdır: <strong>yeniden sipariş noktası = (ortalama günlük satış × ortalama tedarik süresi) + emniyet stoğu</strong>. Eldeki ve yoldaki stokun toplamı bu düzeye indiğinde sipariş verilir. Kırtasiye örneğinde bu değer 500 + 550 = 1.050 adettir. Sipariş verildikten sonra işler normal giderse mal geldiği anda depoda yaklaşık emniyet stoğu kadar ürün kalmış olur.',
    ] },
    { h: 'Servis düzeyi nasıl seçilir?', p: [
      'Servis düzeyi yükseldikçe emniyet stoğu doğrusal değil, hızlanarak artar. %95\'ten %99\'a çıkmak Z katsayısını 1,6449\'dan 2,3263\'e, yani emniyet stoğunu yaklaşık %41 yukarı taşır; %99,9 için ise %95\'e göre neredeyse iki katı stok gerekir. Bu nedenle bütün ürünlere aynı düzeyi uygulamak pahalıdır.',
      'Yaygın uygulama, ürünleri önem derecesine göre sınıflandırmaktır: cironun büyük kısmını getiren ya da yokluğu müşteri kaybına yol açan ürünlerde yüksek, yavaş dönen ve kolay ikame edilen ürünlerde daha düşük servis düzeyi hedeflenir. Hangi oranın uygun olduğu sektöre, kâr marjına ve stoksuz kalmanın maliyetine bağlıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      '<strong>Birim tutarsızlığı:</strong> Satış günlük, tedarik süresi hafta olarak girilirse sonuç anlamsız olur. Bütün değerler aynı zaman biriminde olmalıdır.',
      '<strong>Stoksuz günleri satış verisine dahil etmek:</strong> Rafın boş olduğu günlerde satış sıfır görünür ve ortalamayı aşağı çeker; gerçek talep daha yüksektir.',
      '<strong>Kampanya dönemlerini ayırmamak:</strong> İndirim haftasındaki satış olağan talebi temsil etmez; hem en yüksek değeri hem de standart sapmayı bozar.',
      '<strong>Değeri bir kez hesaplayıp unutmak:</strong> Talep ve tedarik süreleri değiştikçe emniyet stoğu da güncellenmelidir; mevsimsel ürünlerde dönemlik hesap yapın.',
      '<strong>Model varsayımı:</strong> Servis düzeyi yöntemi talebin normal dağıldığını ve tedarik süresinin sabit olduğunu varsayar. Çok seyrek satılan ürünlerde ya da tedarik süresi çok oynak olduğunda sonuç gerçeği tam yansıtmayabilir.',
    ], p: [
      'Sonuçlar bilgilendirme amaçlıdır; stok politikası belirlerken raf ömrü, depo kapasitesi, asgari sipariş miktarı ve nakit durumunu da hesaba katın.',
    ] },
  ],
  faq: [
    ['Emniyet stoğu formülü nedir?', 'En yaygın formül şudur: (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi). İstatistiksel yöntemde ise Z katsayısı × günlük satışın standart sapması × tedarik süresinin karekökü kullanılır.'],
    ['Yeniden sipariş noktası ile emniyet stoğu arasındaki fark nedir?', 'Emniyet stoğu yedekte tutulan tampon miktardır. Yeniden sipariş noktası ise siparişin verileceği stok düzeyidir ve tedarik süresi boyunca beklenen talebe emniyet stoğunun eklenmesiyle bulunur.'],
    ['Standart sapmayı nasıl bulurum?', 'Geçmiş günlük satış miktarlarınızı bir hesap tablosuna yazıp standart sapma işlevini uygulayabilirsiniz. En az birkaç haftalık, tercihen birkaç aylık ve kampanya dönemlerinden arındırılmış veri kullanmak daha güvenilir sonuç verir.'],
    ['Hangi yöntemi seçmeliyim?', 'Düzenli satış kaydınız yoksa ya da hızlı bir tahmin istiyorsanız en yüksek – ortalama yöntemi yeterlidir. Günlük satış verisi tutuyorsanız ve stok maliyetini hedeflenen hizmet kalitesine göre ayarlamak istiyorsanız servis düzeyi yöntemi daha isabetlidir.'],
    ['%95 servis düzeyi ne anlama gelir?', 'Sipariş döngülerinin yaklaşık yüzde doksan beşinde, yeni mal gelene kadar stokun tükenmeyeceği anlamına gelir. Kalan yüzde beşlik bölümde talep emniyet stoğunu da aşabilir.'],
    ['Emniyet stoğu sıfır çıkabilir mi?', 'Evet. En yüksek ve ortalama değerler birbirine eşitse ya da standart sapma sıfırsa talep ve tedarik tamamen öngörülebilir demektir ve tampona gerek kalmaz. Gerçek hayatta bu durum nadirdir.'],
    ['Haftalık verilerle hesap yapabilir miyim?', 'Evet. Satışı haftalık, tedarik süresini de hafta olarak girerseniz sonuç yine doğru çıkar; yalnızca "gün" yazan satırları hafta olarak okumanız gerekir. Önemli olan bütün girdilerin aynı zaman biriminde olmasıdır.'],
    ['Satış verilerim bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ekonomik-siparis-miktari-hesapla', 'stok-devir-hizi-hesapla', 'nakit-donusum-suresi-hesapla', 'fire-orani-hesapla'],
};
