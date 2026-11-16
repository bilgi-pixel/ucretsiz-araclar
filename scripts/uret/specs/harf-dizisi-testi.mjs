export default {
  slug: "harf-dizisi-testi",
  title: "Harf Dizisi Testi",
  h1Tail: "ücretsiz, açıklamalı",
  pageTitle: "Harf Dizisi Testi – Türk Alfabesiyle 15 Çözümlü Soru",
  description: "Ücretsiz harf dizisi testi: 29 harfli Türk alfabesinde dizinin kuralını bulun, sıradaki harfi seçin. 15 soru, 10 dakika, açıklamalı cevap anahtarı.",
  card: "29 harfli Türk alfabesiyle harf dizisi soruları: 15 soru, 10 dakika, her dizinin kuralı açıklamalı.",
  category: "zeka",
  kind: "test",
  keywords: [
    "harf dizisi testi",
    "harf dizisi soruları",
    "sıradaki harfi bul",
    "alfabe örüntü testi",
    "harf örüntüsü soruları",
    "sözel mantık testi",
    "harf dizisi çözümlü örnekler",
    "türk alfabesi harf sırası",
  ],
  lead: "Harf Dizisi Testi, alfabedeki sıraya göre kurulmuş bir harf dizisinin devamını bulmanızı ister. 15 soruluk test 10 dakika sürer ve tamamı 29 harfli Türk alfabesine göre hazırlanır; test bitince her dizinin kuralı açıklanır.",
  test: { sure: 10, karisim: [["harfDizisi", 15]] },
  howto: [
    "<strong>Testi başlat</strong> düğmesine basın; 10 dakikalık süre işlemeye başlar.",
    "Verilen harfleri okuyun ve her harften bir sonrakine alfabede kaç adım ileri ya da geri gidildiğini belirleyin.",
    "Kuralı bulduktan sonra soru işaretinin yerine gelecek harfi beş seçenek arasından işaretleyin.",
    "Zorlandığınız soruyu boş geçip ilerleyin; süre bitmeden geri dönebilirsiniz.",
    "Testi bitirdiğinizde doğru, yanlış ve boş sayınızı, başarı yüzdenizi ve dizilerin açıklamalarını inceleyin.",
  ],
  sections: [
    {
      h: "Önce alfabe: 29 harf ve sıra numaraları",
      p: [
        "Bu testteki bütün diziler Türk alfabesine göre sayılır. Harflerin sırası şöyledir: <strong>A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z</strong>. Alfabede Q, W ve X yoktur; buna karşılık Ç, Ğ, I, İ, Ö, Ş ve Ü ayrı birer harftir ve her biri bir adım sayılır.",
        "Hızlı çözmek için birkaç dayanak noktasını ezberlemek çok işe yarar: A 1, D 5, H 10, L 15, P 20, U 25 ve Z 29. Aradaki harfleri bu noktalardan sayarak bulursunuz. Örneğin K, L'den bir önce geldiği için 14. harftir; R ise P'den hemen sonra geldiği için 21. harftir.",
      ],
    },
    {
      h: "Testte çıkan dizi türleri",
      ul: [
        "<strong>Sabit adımla ileri:</strong> Her adımda alfabede aynı sayıda harf ileri gidilir. Adım bir ise harfler art arda gelir; iki, üç ya da dört de olabilir.",
        "<strong>Sabit adımla geri:</strong> Dizi alfabenin sonlarından başlar ve her adımda bir, iki ya da üç harf geri gider.",
        "<strong>Büyüyen adım:</strong> İlk geçişte bir, sonrakinde iki, sonra üç harf ileri gidilir; atlama her adımda bir artar.",
        "<strong>İç içe iki dizi:</strong> Tek sıradaki harfler alfabenin başından ileri, çift sıradakiler alfabenin sonundan geri gider.",
      ],
      p: [
        "İlk beş soru yalnızca bir ya da iki harflik sabit adımlarla kurulur. Sonraki sorularda dört türden herhangi biri gelebilir.",
      ],
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1 (ikişer ileri):</strong> B, Ç, E, G, H, ? dizisinde harflerin sıra numaraları 2, 4, 6, 8 ve 10'dur. Her adımda iki harf ileri gidiliyor; sıradaki harf 12. harf, yani <strong>İ</strong> olur. Dikkat: H'den sonra I, ondan sonra İ gelir. İkisini tek harf sayan kişi J cevabına ulaşır ve yanılır.",
        "<strong>Örnek 2 (üçer geri):</strong> Z, Ü, Ş, P, N, ? dizisinde numaralar 29, 26, 23, 20 ve 17'dir. Her adımda üç harf geri gidiliyor; 14. harf <strong>K</strong>'dir. Sayarken geriye doğru N, M, L, K diye gidildiğini, yani arada iki harf atlandığını da görebilirsiniz.",
        "<strong>Örnek 3 (büyüyen adım):</strong> A, B, Ç, F, I, ? dizisinde numaralar 1, 2, 4, 7 ve 11'dir. Farklar 1, 2, 3, 4 diye artıyor; sıradaki fark 5 olmalı. 11 + 5 = 16 ve 16. harf <strong>M</strong>'dir.",
        "<strong>Örnek 4 (iç içe iki dizi):</strong> C, V, Ç, Ü, D, U, ? dizisinde harfler bir baştan bir sondan geliyor. Birer atlayarak okuyun: C, Ç, D alfabede art arda ilerliyor; V, Ü, U ise birer geri gidiyor. Soru işareti ilk dizinin sırasındadır ve D'den sonra <strong>E</strong> gelir.",
      ],
    },
    {
      h: "Adım adım çözüm yöntemi",
      ol: [
        "İlk iki harf arasındaki uzaklığı alfabede parmak hesabıyla ya da sıra numarasıyla bulun.",
        "Aynı uzaklığın ikinci ve üçüncü harf arasında da geçerli olup olmadığına bakın. Geçerliyse kural sabit adımdır.",
        "Uzaklık her seferinde bir artıyorsa büyüyen adım kuralı vardır; son uzaklığa bir ekleyip ilerleyin.",
        "Harfler alfabenin başı ile sonu arasında gidip geliyorsa diziyi birer atlayarak iki ayrı dizi olarak çözün ve soru işaretinin hangisine ait olduğunu sayın.",
        "Bulduğunuz harfi seçeneklerde arayın; yoksa büyük olasılıkla Türkçeye özgü bir harfi atlamışsınızdır, sayımı yeniden yapın.",
      ],
    },
    {
      h: "Sık yapılan hatalar ve süre yönetimi",
      p: [
        "15 soru için 10 dakika, soru başına 40 saniye eder. Sabit adımlı ilk sorular on beş saniyede çözülebilir; iç içe diziler ve büyüyen adımlar daha uzun sürer. Zamanı son sorulara saklayın ve takıldığınız yerde boş geçin.",
      ],
      ul: [
        "<strong>İngiliz alfabesiyle saymak.</strong> Ç, Ğ, İ, Ö, Ş ve Ü harflerini atlamak ya da araya Q, W, X eklemek sonucu bir iki harf kaydırır; yanlış seçenekler de tam bu komşu harflerden oluşur.",
        "I ile İ'yi ya da O ile Ö'yü tek harf saymak.",
        "Ğ harfini unutmak: G ile H arasında bir harf daha vardır.",
        "Geri giden dizide yönü karıştırıp ileri doğru saymak.",
        "İç içe dizide soru işaretinin hangi alt diziye düştüğünü saymadan cevap vermek.",
      ],
    },
    {
      h: "Sonuç ekranı ve dürüst bir not",
      p: [
        "Test bitince doğru, yanlış ve boş soru sayınız ile başarı yüzdeniz gösterilir. Cevap anahtarında her dizi, doğru harf, sizin seçtiğiniz harf ve kuralı anlatan kısa açıklamayla birlikte listelenir. <strong>Yeni sorularla tekrar çöz</strong> dediğinizde diziler baştan üretilir; başlangıç harfi, adım sayısı ve kural türü değişir.",
        "<strong>Bu sonuç bir IQ puanı değildir</strong> ve site size IQ sayısı vermez. Zekâ ölçümü, norm çalışması yapılmış testlerle ve bir uzmanın gözetiminde yapılır. Buradaki yüzde yalnızca bu 15 sorudaki başarınızı gösterir; tanı, okul yerleştirme ya da işe alım gibi kararlar için kullanılamaz. Test eğlence ve alıştırma amaçlıdır.",
        "Harf dizilerinde başarı büyük ölçüde alfabeye hâkimiyete bağlıdır. Dayanak harfleri öğrendikçe ve birkaç test çözdükçe hızlanırsınız; bu alıştırma etkisi, soru tipine aşinalığın arttığını gösterir. Genel yetenek sorularına hazırlananlar için kısa ve sık tekrar, uzun aralıklı çalışmadan daha verimlidir.",
      ],
    },
  ],
  faq: [
    ["Harf dizisi testinde hangi alfabe kullanılıyor?", "29 harfli Türk alfabesi kullanılır. Ç, Ğ, I, İ, Ö, Ş ve Ü ayrı harf sayılır; Q, W ve X alfabede yer almaz. Sorunun başında da bu hatırlatılır."],
    ["Test kaç soru ve kaç dakika sürüyor?", "15 soru ve 10 dakika. Süre dolduğunda test kendiliğinden biter, işaretlediğiniz cevaplar değerlendirilir."],
    ["Alfabeyi bir kâğıda yazıp bakabilir miyim?", "Evet. Bu bir sınav değil, alıştırmadır. Başlangıçta alfabeyi numaralarıyla önünüzde tutmak kuralları görmenizi kolaylaştırır; zamanla dayanak harfleri ezberleyip kâğıda bakmadan çözmeyi deneyin."],
    ["Bu test IQ'mu ölçer mi?", "Hayır. Sonuç yalnızca bu soru setindeki doğru oranınızdır, bir IQ puanı değildir. Gerçek IQ ölçümü norm çalışması yapılmış testlerle ve uzman gözetiminde yapılır."],
    ["Bulduğum harf seçeneklerde yoksa ne yapmalıyım?", "Çoğunlukla Türkçeye özgü bir harf atlanmış ya da iki ayrı harf tek sayılmıştır. Sayımı alfabeyi baştan söyleyerek tekrarlayın; ayrıca dizinin iç içe iki diziden oluşup oluşmadığını denetleyin."],
    ["Sorular her seferinde değişiyor mu?", "Evet. Diziler her başlatışta kurallara göre yeniden üretilir. Aynı diziyle tekrar karşılaşmanız seyrek bir durumdur."],
    ["Çocuklar için uygun mu?", "Alfabeyi sırasıyla bilen öğrenciler ilk soruları rahat çözer. Yetişkin eşliğinde, oyun gibi ve sonucu çocuğu etiketlemek için kullanmadan uygulanması önerilir."],
    ["Cevaplarım kaydediliyor mu?", "Hayır. Sorular tarayıcınızda üretilir; cevaplarınız ve sonucunuz hiçbir sunucuya gönderilmez. Kayıt ya da üyelik gerekmez."],
  ],
  related: ["sozel-zeka-testi", "sayi-dizisi-testi", "benzetme-testi", "iq-testi", "anagram-kontrol", "kelime-bulucu"],
};
