export default {
  slug: "sekil-matris-testi",
  title: "Şekil Matris Testi",
  h1Tail: "ücretsiz, açıklamalı",
  pageTitle: "Şekil Matris Testi – 15 Soruluk Görsel Örüntü Testi (3×3)",
  description: "Ücretsiz şekil matris testi: 3×3 tablodaki düzeni bulun, boş hücreye gelecek şekli seçin. 15 soru, 15 dakika, açıklamalı cevap anahtarı. Kayıt gerekmez.",
  card: "3×3 şekil tablolarında eksik hücreyi bulun: 15 soru, 15 dakika, her sorunun kuralı açıklamalı.",
  category: "zeka",
  kind: "test",
  keywords: [
    "şekil matris testi",
    "matris soruları",
    "şekil örüntüsü testi",
    "görsel zekâ testi",
    "eksik şekli bul",
    "3x3 şekil testi",
    "soyut akıl yürütme testi",
    "şekil yeteneği soruları",
  ],
  lead: "Şekil Matris Testi, üçe üç bir tabloda sağ alt hücresi boş bırakılmış şekil düzenlerini tamamlamanızı ister. 15 soruluk test 15 dakika sürer; sözcük ya da sayı bilgisi gerektirmez, yalnızca şekiller arasındaki düzeni görmenize dayanır.",
  test: { sure: 15, karisim: [["matris", 15]] },
  howto: [
    "<strong>Testi başlat</strong> düğmesine basın; 15 dakikalık süre işlemeye başlar.",
    "Dokuz hücreli tabloyu inceleyin. Sekiz hücre doludur, sağ alttaki hücrede soru işareti vardır.",
    "Satırlar ve sütunlar boyunca şeklin türünün, sayısının ve dolgu tonunun nasıl değiştiğini belirleyin.",
    "Altı seçenek arasından boş hücreye uyan şekli işaretleyin; kararsız kaldığınız soruyu boş geçip sonra dönebilirsiniz.",
    "Testi bitirdiğinizde doğru, yanlış ve boş sayınızı, başarı yüzdenizi ve her tablonun kural açıklamasını inceleyin.",
  ],
  sections: [
    {
      h: "Bir matris sorusu nasıl kurulur?",
      p: [
        "Bu testteki her hücre üç özellikle tanımlanır ve soruyu çözmek, bu üç özelliği birbirinden bağımsız izlemekten ibarettir:",
      ],
      ul: [
        "<strong>Şeklin türü:</strong> daire, kare, üçgen ya da eşkenar dörtgen.",
        "<strong>Şekil sayısı:</strong> hücrede bir, iki ya da üç şekil yan yana durur.",
        "<strong>Dolgu tonu:</strong> şeklin içi boş (beyaz), gri ya da koyu olabilir.",
      ],
    },
    {
      h: "Özellikler hangi kurallara göre değişir?",
      p: [
        "Her özellik aşağıdaki dört davranıştan birini gösterir. Kolay sorularda tek bir özellik değişir, orta sorularda iki özellik farklı yönlerde değişir, zor sorularda üç özellik birden hareket eder.",
      ],
      ul: [
        "<strong>Tabloda sabit:</strong> Özellik dokuz hücrede de aynıdır. Örneğin bütün şekiller gridir.",
        "<strong>Satırda sabit:</strong> Aynı satırdaki üç hücrede özellik aynıdır, satırdan satıra değişir. Örneğin birinci satır hep daire, ikinci satır hep kare, üçüncü satır hep üçgendir.",
        "<strong>Sütunda sabit:</strong> Aynı sütundaki üç hücrede özellik aynıdır, soldan sağa değişir. Örneğin sol sütunda bir, orta sütunda iki, sağ sütunda üç şekil bulunur.",
        "<strong>Kayarak tekrar:</strong> Üç değer her satırda bir adım kayarak dizilir. Sonuçta her değer her satırda ve her sütunda tam bir kez görünür; köşegen boyunca aynı değerler sıralanır.",
      ],
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1 (satır ve sütun kuralı):</strong> Birinci satırda sırasıyla bir, iki ve üç gri daire; ikinci satırda bir, iki ve üç gri kare; üçüncü satırda bir gri üçgen, iki gri üçgen ve soru işareti var. Şekil türü satır boyunca aynı kalıyor, öyleyse aranan şekil üçgendir. Şekil sayısı sütun boyunca aynı kalıyor ve sağ sütunda hep üç şekil var. Ton hiç değişmiyor. Cevap: <strong>üç gri üçgen</strong>. Seçenekler arasındaki üç gri kare ya da iki gri üçgen, yalnızca bir özelliği gözden kaçıranları yakalamak için oradadır.",
        "<strong>Örnek 2 (kayan ton):</strong> Bütün hücrelerde tek bir daire olsun. Birinci satırın tonları boş, gri, koyu; ikinci satırınki gri, koyu, boş; üçüncü satır koyu, boş ve soru işareti. Satıra bakarak tek bir sabit değer bulamazsınız, sütuna bakarak da. Ama her satırda üç tonun da birer kez geçtiğini fark edince iş kolaylaşır: üçüncü satırda koyu ve boş kullanılmış, eksik olan gridir. Sağ sütunu denetleyin: koyu ve boş var, eksik yine gri. Cevap: <strong>bir gri daire</strong>.",
        "<strong>Örnek 3 (üç kural birden):</strong> Şekil türü satırda sabit, sayı sütunda sabit, ton kayarak tekrar ediyor olsun. Üçüncü satır eşkenar dörtgen satırı, sağ sütun iki şekilli sütun ve üçüncü satırda boş ile koyu tonlar kullanılmışsa cevap <strong>iki gri eşkenar dörtgen</strong> olur. Üç özelliği ayrı ayrı çözüp sonda birleştirmek, tabloya bütün olarak bakmaktan çok daha güvenlidir.",
      ],
    },
    {
      h: "Adım adım çözüm yöntemi",
      ol: [
        "Tek bir özelliği seçin, örneğin şekil türünü, ve diğer ikisini o an için görmezden gelin.",
        "Birinci satırı soldan sağa okuyun: özellik aynı mı kalıyor, değişiyor mu? Ardından birinci sütunu yukarıdan aşağıya okuyun.",
        "Satırda da sütunda da değişiyorsa kayan düzen vardır; üçüncü satırda ve üçüncü sütunda eksik kalan değeri bulun.",
        "Aynı işlemi sayı ve ton için tekrarlayın; üç sonucu birleştirerek aradığınız hücreyi zihninizde kurun.",
        "Seçeneklere en son bakın ve üç özelliğin üçünü de taşıyan tek seçeneği işaretleyin.",
      ],
    },
    {
      h: "Sık yapılan hatalar ve süre yönetimi",
      p: [
        "Soru başına ortalama bir dakikanız vardır. İlk beş soruda tek özellik değiştiği için çoğu kişi bunları yirmi otuz saniyede geçer; kazandığınız süre, üç kuralın birlikte çalıştığı son sorular için gereklidir.",
      ],
      ul: [
        "Önce seçeneklere bakmak. Altı seçenek birbirine çok benzer; çoğu doğru cevaptan yalnızca tek bir özellikle ayrılır ve göz kolayca aldanır.",
        "İki özelliği doğru bulup üçüncüyü denetlememek. En sık atlanan özellik dolgu tonudur.",
        "Yalnızca son satıra bakarak karar vermek. Kural çoğu zaman ilk iki satır okunmadan anlaşılmaz.",
        "Bitişik hücreyi kopyalamak: soru işaretinin solundaki ya da üstündeki hücre seçeneklerde yer alabilir ve tanıdık geldiği için işaretlenir.",
        "Kayan düzeni satır kuralı sanmak. Bir özellik hem satırda hem sütunda değişiyorsa her değerin birer kez geçtiğini sınayın.",
      ],
    },
    {
      h: "Sonuç ekranı ve dürüst bir not",
      p: [
        "Test bitince doğru, yanlış ve boş soru sayınız, başarı yüzdeniz ve cevap anahtarı görünür. Anahtarda her tablo yeniden çizilir, doğru seçenek ile sizin seçiminiz yan yana gösterilir ve üç özelliğin hangi kurala uyduğu yazılı olarak açıklanır. <strong>Yeni sorularla tekrar çöz</strong> dediğinizde tablolar baştan üretilir; aynı soruyla yeniden karşılaşmanız beklenmez.",
        "Şekil matrisleri soyut akıl yürütme alıştırması olarak yaygın biçimde kullanılır; ancak <strong>bu sayfadaki sonuç bir IQ puanı değildir</strong> ve size bir IQ sayısı verilmez. Zekâ ölçümü, norm çalışması yapılmış testlerle ve bir uzmanın gözetiminde gerçekleştirilir. Buradaki yüzde yalnızca o gün, o 15 soruda gösterdiğiniz başarıyı yansıtır; yorgunluk, dikkat dağınıklığı ve ekran boyutu bile sonucu etkiler. Tanı, okul yerleştirme ya da işe alım gibi kararlarda kullanılamaz.",
        "Aynı tür soruları çözdükçe kuralları daha hızlı tanırsınız; bu alıştırma etkisi doğaldır ve yükselen yüzde, soru tipine alıştığınızı gösterir. Görsel dikkatinizi ve sistemli düşünme alışkanlığınızı çalıştırmak için düzenli, kısa tekrarlar yeterlidir.",
      ],
    },
  ],
  faq: [
    ["Şekil matris testinde kaç soru var?", "Test 15 sorudan oluşur ve 15 dakika sürer. Sorular kolaydan zora sıralanır; her soruda altı seçenek ve tek bir doğru cevap vardır."],
    ["Bu testi çözmek için matematik ya da dil bilgisi gerekir mi?", "Hayır. Sorular yalnızca şekil, sayı ve tona dayanır. Şekilleri sayabilmek ve satır ile sütunları karşılaştırabilmek yeterlidir."],
    ["Test sonucum IQ puanım mı?", "Hayır. Sonuç yalnızca bu soru setindeki doğru oranınızdır. Site IQ sayısı vermez; gerçek IQ ölçümü norm çalışması yapılmış testlerle, uzman gözetiminde yapılır. Bu test eğlence ve alıştırma amaçlıdır."],
    ["Sorular tekrar eder mi?", "Tablolar her başlatışta yeniden üretilir; şekil türleri, sayılar, tonlar ve kurallar rastgele seçilir. Aynı tabloya yeniden rastlamak olasıdır ama seyrektir, cevap ezberlemek işe yaramaz."],
    ["Kayarak tekrar eden düzeni nasıl anlarım?", "Bir özellik hem aynı satırda hem aynı sütunda değişiyorsa ve her satırda üç değerin üçü de bulunuyorsa düzen kayandır. Bu durumda son satırda ve son sütunda eksik kalan değeri bulmanız yeterlidir."],
    ["Telefonda çözebilir miyim?", "Evet, sayfa dar ekranlara uyum sağlar. Yine de tonları rahat ayırt edebilmek için ekran parlaklığını yükseltmeniz ve mümkünse telefonu yatay tutmanız kolaylık sağlar."],
    ["Yanlış cevaplar puanımı düşürür mü?", "Hayır. Yanlış ve boş sorular aynı şekilde değerlendirilir, doğrularınızdan düşülmez. Süre biterken kalan sorularda tahmin yürütmenizin bir sakıncası yoktur."],
    ["Cevaplarım kaydediliyor mu?", "Hayır. Sorular ve şekiller tarayıcınızda üretilir; cevaplarınız ve sonucunuz hiçbir yere gönderilmez, kayıt ya da üyelik gerekmez."],
  ],
  related: ["gorsel-iq-testi", "uzamsal-zeka-testi", "iq-testi", "sayi-dizisi-testi", "mantik-testi", "dikkat-testi"],
};
