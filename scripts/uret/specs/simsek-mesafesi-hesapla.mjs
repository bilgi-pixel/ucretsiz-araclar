export default {
  slug: 'simsek-mesafesi-hesapla',
  title: 'Şimşek Uzaklığı Hesaplama',
  h1Tail: 'şimşek ile gök gürültüsü arası süreden',
  pageTitle: 'Şimşek Uzaklığı Hesaplama – Yıldırım Kaç Kilometre Ötede?',
  description: 'Şimşeği gördükten sonra gök gürültüsünü duyana kadar geçen saniyeyi yazın; yıldırımın kaç kilometre uzakta olduğunu sıcaklığa göre ses hızıyla hesaplayın.',
  card: 'Şimşek ile gök gürültüsü arasındaki saniyeden yıldırımın kaç kilometre uzakta olduğunu hesaplayın.',
  category: 'gunluk',
  keywords: ['şimşek uzaklığı hesaplama', 'yıldırım kaç km uzakta', 'şimşek gök gürültüsü süre', 'yıldırım mesafesi hesaplama', 'gök gürültüsü kaç saniye', '30-30 kuralı', 'fırtına uzaklığı'],
  lead: 'Şimşek çaktığı anda saymaya başlayın, gök gürültüsünü duyduğunuzda durun. Bu araç, saydığınız saniyeyi sesin havadaki hızıyla çarparak <strong>yıldırımın size olan uzaklığını</strong> kilometre ve metre olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sure', label: 'Şimşek ile gök gürültüsü arası süre (sn)', type: 'number', placeholder: 'Örn. 6' },
    { id: 'sicaklik', label: 'Hava sıcaklığı (°C)', type: 'number', value: '20', hint: 'Bilmiyorsanız 20 bırakın; etkisi küçüktür' },
  ],
  compute(v, h) {
    const t = h.pos(v.sure, 'Süre');
    const T = h.opt(v.sicaklik, 20, 'Hava sıcaklığı');
    if (t > 120) h.err('Süre en fazla 120 saniye olabilir; gök gürültüsü bu kadar uzaktan duyulmaz. Saniye cinsinden yazdığınızdan emin olun.');
    if (T < -50 || T > 55) h.err('Hava sıcaklığı −50 °C ile 55 °C arasında olmalı.');
    const ses = 331.3 + 0.606 * T;
    const m = ses * t;
    const durum = t < 30
      ? 'Fırtına 10 km\'den yakın: tehlike bölgesindesiniz, hemen kapalı bir yere girin'
      : 'Fırtına yaklaşık 10 km\'den uzakta; yaklaşıp yaklaşmadığını izlemeyi sürdürün';
    return {
      rows: [
        ['Uzaklık', h.fmt(m / 1000, 2) + ' km'],
        ['Uzaklık (metre)', h.fmt(m, 0) + ' m'],
        ['Kullanılan ses hızı', h.fmt(ses, 2) + ' m/sn'],
        ['Değerlendirme', durum],
      ],
      note: 'Işığın size ulaşma süresi ihmal edilir. Sonuç, şimşeğin size en yakın noktasına olan yaklaşık uzaklıktır; yıldırım, fırtınanın kilometrelerce uzağına da düşebilir.',
    };
  },
  cases: [
    { in: { sure: '3', sicaklik: '20' }, out: { 'Uzaklık': '1,03 km', 'Uzaklık (metre)': '1.030 m', 'Kullanılan ses hızı': '343,42 m/sn' } },
    { in: { sure: '10', sicaklik: '0' }, out: { 'Uzaklık': '3,31 km', 'Uzaklık (metre)': '3.313 m', 'Kullanılan ses hızı': '331,3 m/sn' } },
    { in: { sure: '5' }, out: { 'Uzaklık': '1,72 km', 'Uzaklık (metre)': '1.717 m' } },
    { in: { sure: '30', sicaklik: '20' }, out: { 'Uzaklık': '10,3 km', 'Değerlendirme': 'Fırtına yaklaşık 10 km\'den uzakta; yaklaşıp yaklaşmadığını izlemeyi sürdürün' } },
    { in: { sure: '1', sicaklik: '15' }, out: { 'Uzaklık': '0,34 km', 'Uzaklık (metre)': '340 m' } },
    { in: { sure: '8', sicaklik: '-10' }, out: { 'Uzaklık': '2,6 km', 'Kullanılan ses hızı': '325,24 m/sn' } },
    { in: { sure: '0' }, error: true },
    { in: { sure: '' }, error: true },
    { in: { sure: '500' }, error: true },
  ],
  howto: [
    'Şimşeğin parladığını gördüğünüz anda saniyeleri saymaya başlayın. Telefonunuzun kronometresini kullanmak, içinden saymaktan daha doğru sonuç verir.',
    'Gök gürültüsünün ilk sesini duyduğunuz anda durun ve geçen süreyi "Süre" alanına saniye olarak yazın.',
    'İsterseniz hava sıcaklığını girin. Bilmiyorsanız 20 °C olarak bırakabilirsiniz; sıcaklığın sonuca etkisi yüzde birkaçı geçmez.',
    '"Hesapla" düğmesine basın. Uzaklığı kilometre ve metre olarak, ayrıca güvenlik değerlendirmesini görürsünüz.',
    'Birkaç şimşek için hesabı tekrarlayın: süre kısalıyorsa fırtına size yaklaşıyor, uzuyorsa uzaklaşıyor demektir.',
  ],
  sections: [
    { h: 'Hesabın arkasındaki fizik', p: [
      'Şimşek ve gök gürültüsü aynı anda oluşur: yıldırım kanalındaki hava bir anda on binlerce dereceye ısınır, patlarcasına genleşir ve bu basınç dalgası kulağımıza gök gürültüsü olarak ulaşır. Işık saniyede yaklaşık 300.000 km yol aldığından şimşeği pratikte anında görürüz; 10 km uzaktaki bir şimşeğin ışığı bize saniyenin otuz binde biri kadar sürede ulaşır. Ses ise havada saniyede yalnızca 340 metre kadar ilerler. Aradaki gecikme, sesin kat ettiği yolun doğrudan ölçüsüdür.',
      'Bu yüzden hesap tek bir çarpmadan ibarettir: <strong>uzaklık = ses hızı × süre</strong>. Araç, ses hızını hava sıcaklığına göre <code>v = 331,3 + 0,606 × T</code> (m/sn, T santigrat) bağıntısıyla bulur. 0 °C\'de ses 331,3 m/sn, 20 °C\'de 343,4 m/sn, 35 °C\'de 352,5 m/sn hızla yayılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Ilık bir yaz akşamı (20 °C) şimşekten 3 saniye sonra gök gürültüsünü duydunuz. Ses hızı 331,3 + 0,606 × 20 = 343,42 m/sn\'dir. Uzaklık 343,42 × 3 = 1.030 metre, yani yaklaşık <strong>1,03 km</strong> eder. Yıldırım çok yakındadır.',
      '<strong>Örnek 2:</strong> Kışın 0 °C\'de 10 saniye saydınız. Ses hızı 331,3 m/sn, uzaklık 3.313 metre, yani 3,31 km\'dir.',
      '<strong>Örnek 3:</strong> 20 °C\'de 30 saniye sayarsanız uzaklık 10,3 km çıkar. Bu, aşağıda anlatılan 30 saniye eşiğine karşılık gelen mesafedir.',
    ] },
    { h: 'Akılda kolay kalan kısa yol', p: [
      'Yanınızda hesap makinesi yokken şu yaklaşım yeterlidir: <strong>saydığınız saniyeyi 3\'e bölün, sonuç kabaca kilometredir</strong>. 6 saniye yaklaşık 2 km, 9 saniye yaklaşık 3 km, 15 saniye yaklaşık 5 km eder. Kısa yol, sesin her 3 saniyede yaklaşık 1 km (daha doğrusu 1,03 km) yol almasına dayanır. Bu sayfadaki hesap aynı mantığı sıcaklık düzeltmesiyle ve ondalıklarıyla verir.',
    ] },
    { h: '30 saniye kuralı ve güvenlik', p: [
      'Yıldırım güvenliğinde yaygın olarak öğretilen kural şudur: şimşek ile gök gürültüsü arasındaki süre <strong>30 saniyeden kısaysa</strong> fırtına yaklaşık 10 km\'den yakındır ve yıldırım çarpma tehlikesi vardır; hemen güvenli bir yere girilmelidir. Son gök gürültüsünü duyduktan sonra da dışarı çıkmak için <strong>30 dakika</strong> beklenmesi önerilir, çünkü yıldırım fırtınanın arkasında, yağmur dindikten sonra da düşebilir.',
      'Güvenli yer, kapalı bir bina ya da kapıları ve camları kapalı, metal gövdeli bir araçtır. Açık çardak, çadır, otobüs durağı ve ağaç altı güvenli değildir. Açık arazide kaldıysanız yüksek noktalardan, tek başına duran ağaçlardan, direklerden, tel çitlerden ve sudan uzaklaşın. Dağda sırt ve zirvelerden aşağı inin, denizde ya da gölde hemen kıyıya çıkın.',
      'Gök gürültüsünü duyabiliyorsanız yıldırımın size ulaşabileceği mesafede olabilirsiniz; hesaplanan uzaklık ne olursa olsun bunu bir uyarı sayın.',
    ] },
    { h: 'Ölçüm hataları ve sınırlar', ul: [
      '<strong>Tepki süresi:</strong> İnsan tepkisi sayım başında ve sonunda birkaç onda bir saniye hata katar; bu da 100-200 metrelik belirsizlik demektir.',
      '<strong>Hangi şimşek, hangi gürültü:</strong> Sık çakan şimşeklerde gürültüyü yanlış şimşekle eşleştirmek kolaydır. Emin olamıyorsanız en kısa süreyi esas alın.',
      '<strong>Uzun yıldırım kanalı:</strong> Yıldırım kilometrelerce uzunlukta bir kanaldır. İlk duyduğunuz ses kanalın size en yakın noktasından gelir; gürültünün uzun süre gürlemesi, uzak bölümlerden gelen sesin gecikmesidir.',
      '<strong>Rüzgâr ve arazi:</strong> Rüzgâr, sıcaklık katmanları ve dağlar sesi büker ya da yansıtır. Gök gürültüsü çoğu koşulda yaklaşık 15-20 km\'den uzakta duyulmaz; şimşeği görüp sesini duymuyorsanız fırtına bu mesafeden uzaktadır.',
      '<strong>Sıcaklık:</strong> Hesap, ses yolundaki havanın yer seviyesindeki sıcaklıkta olduğunu varsayar. Gerçekte yukarıda hava daha soğuktur, ancak bunun etkisi küçüktür.',
    ] },
    { h: 'Kimler için yararlı?', p: [
      'Doğa yürüyüşçüleri, kampçılar ve dağcılar fırtınanın yaklaşıp yaklaşmadığını bu yöntemle izler. Açık havada maç yapan amatör takımlar, plajdaki cankurtaranlar, yaz okulu ve izci kampı sorumluları etkinliği durdurma kararını süreye göre verir. Balıkçılar ve küçük tekne sahipleri kıyıya dönüş zamanını buna göre belirler. Tarlada çalışan çiftçiler ve çatı, iskele gibi yüksekte çalışan ekipler için de saymak, işi bırakma zamanını gösteren basit bir alışkanlıktır. Çocuklara fen dersinde ses ve ışık hızı farkını anlatmak için de sevilen bir deneydir.',
    ] },
  ],
  faq: [
    ['Şimşekten 5 saniye sonra gök gürültüsü duyarsam yıldırım kaç km uzaktadır?', '20 °C\'de yaklaşık 1,72 km uzaktadır. Kabaca her 3 saniye 1 kilometreye karşılık gelir; 5 saniye bu yüzden 1,7 km dolayındadır.'],
    ['Şimşek ile yıldırım arasında fark var mı?', 'Günlük dilde çoğu zaman aynı anlamda kullanılır. Genellikle buluttan yere inen elektrik boşalmasına yıldırım, bu boşalma sırasında görülen ışığa şimşek, duyulan sese gök gürültüsü denir.'],
    ['Şimşeği görüyorum ama gök gürültüsünü duymuyorum, neden?', 'Fırtına sesin ulaşamayacağı kadar uzaktadır. Gök gürültüsü çoğunlukla 15-20 km\'den ötede duyulmaz; şimşeğin ışığı ise geceleri çok daha uzaktan görülebilir.'],
    ['Sıcaklık sonucu ne kadar değiştirir?', 'Çok az. Ses hızı 0 °C\'de 331,3 m/sn, 30 °C\'de 349,5 m/sn\'dir; aradaki fark yaklaşık yüzde 5\'tir. 10 saniyelik bir sayımda bu, 180 metre kadar fark eder.'],
    ['Kaç saniyenin altı tehlikelidir?', 'Yaygın güvenlik kuralına göre 30 saniyenin altı, yani yaklaşık 10 km\'den yakın fırtına tehlikeli sayılır. Bununla birlikte gök gürültüsünü duyduğunuz her durumda kapalı bir yere geçmeniz en güvenlisidir.'],
    ['Fırtına geçtikten sonra ne kadar beklemeliyim?', 'Son gök gürültüsünden sonra en az 30 dakika beklemeniz önerilir. Yıldırım, yağmur dindikten ve gökyüzü açılmaya başladıktan sonra da düşebilir.'],
    ['Saymak yerine daha doğru bir yöntem var mı?', 'Telefonun kronometresi tepki hatasını azaltır. Ses ve görüntü kaydı alıp parlamayla ilk ses arasındaki süreyi kayıttan okumak daha da hassastır. Yine de sonuç yaklaşık bir değerdir.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır ve sayfa bir kez açıldıktan sonra çevrimdışı da çalışır; hiçbir veri sunucuya iletilmez.'],
  ],
  related: ['ses-hizi-hesapla', 'ufuk-mesafesi-hesapla', 'beaufort-ruzgar-cevir', 'tirmanis-suresi-hesapla', 'ms-kmh-cevir'],
};
