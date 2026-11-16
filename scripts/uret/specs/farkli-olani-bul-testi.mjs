export default {
  slug: "farkli-olani-bul-testi",
  title: "Farklı Olanı Bul Testi",
  h1Tail: "sayılar ve sözcükler",
  pageTitle: "Farklı Olanı Bul Testi – Sayı ve Kelime Soruları (15 Soru)",
  description: "Ücretsiz farklı olanı bul testi: beş sayı ya da sözcükten gruba uymayanı seçin. 15 soru, 10 dakika, her sorunun ortak özelliği açıklamalı. Kayıt gerekmez.",
  card: "Beş sayı ya da sözcükten gruba uymayanı bulun: 15 soru, 10 dakika, açıklamalı cevap anahtarı.",
  category: "zeka",
  kind: "test",
  keywords: [
    "farklı olanı bul testi",
    "farklı olanı bul soruları",
    "gruba uymayanı bul",
    "hangisi farklı testi",
    "farklı sayıyı bul",
    "farklı kelimeyi bul",
    "sınıflandırma testi",
    "uymayan hangisi soruları",
  ],
  lead: "Farklı Olanı Bul Testi, beş seçenekten dördünü birleştiren ortak özelliği bulup gruba uymayan seçeneği işaretlemenizi ister. 15 soruluk test 10 dakika sürer; sekiz soru sayılarla, yedi soru sözcüklerle kurulur.",
  test: { sure: 10, karisim: [["farkliSayi", 8], ["farkliKelime", 7]] },
  howto: [
    "<strong>Testi başlat</strong> düğmesine basın; 10 dakikalık süre başlar.",
    "Verilen beş sayıyı ya da sözcüğü okuyun ve bunlardan dördünü bir araya getiren ortak özelliği arayın.",
    "Bu özelliği taşımayan tek seçeneği işaretleyin.",
    "Ortak özelliği bulamadığınız soruyu boş geçin; sorular arasında dolaşıp sonra dönebilirsiniz.",
    "Testi bitirince doğru, yanlış ve boş sayınızı, başarı yüzdenizi, sayısal ve sözel sorulardaki dökümünüzü ve açıklamaları inceleyin.",
  ],
  sections: [
    {
      h: "Testte iki soru türü vardır",
      p: [
        "Sayı sorularında beş sayı görürsünüz; dördü aynı matematiksel özelliği paylaşır. Bu sorular her açılışta kurala göre yeniden üretilir ve sayıların bölünebilme, asallık, tam kare olma ve tek ya da çift olma gibi temel özelliklerini tanımanıza dayanır.",
        "Sözcük sorularında beş sözcükten dördü aynı kümeye girer: aynı türden varlıklar, aynı işe yarayan nesneler ya da aynı alana ait kavramlar olabilir. Bu sorular hazır bir soru bankasından rastgele seçilir ve aynı test içinde tekrar etmez. Sayı soruları daha çok sayısal akıl yürütmeyi, sözcük soruları ise kavramları sınıflandırma ve genel kültürü çalıştırır.",
      ],
    },
    {
      h: "Sayı sorularında aranan dört özellik",
      ul: [
        "<strong>Ortak bölen:</strong> Dört sayı 3, 4, 5, 6, 7 ya da 9'dan birine tam bölünür, beşincisi bölünmez.",
        "<strong>Asal sayılar:</strong> Dört sayı asaldır, yani yalnızca 1'e ve kendisine bölünür; beşincisi asal görünen ama aslında çarpanlarına ayrılan bir tek sayıdır.",
        "<strong>Tam kareler:</strong> Dört sayı bir tam sayının karesidir (4, 9, 16, 25, 36, 49, 64, 81, 100, 121 gibi); beşincisi değildir.",
        "<strong>Tek ve çift:</strong> Dört sayı çifttir, biri tektir.",
      ],
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1 (ortak bölen):</strong> 12, 27, 20, 18, 33. İlk akla gelen tek-çift ayrımıdır, ama üç çift ve iki tek sayı olduğu için bu ayrım tek bir farklı vermez. Bölünebilmeyi deneyelim: 12, 27, 18 ve 33 sayılarının rakamları toplamı 3'ün katıdır, hepsi 3'e bölünür. 20 bölünmez. Farklı olan <strong>20</strong>'dir.",
        "<strong>Örnek 2 (asal sayılar):</strong> 7, 13, 21, 19, 31. Beşi de tek sayıdır, öyleyse tek-çift ayrımı işe yaramaz. 7, 13, 19 ve 31 asaldır; 21 ise 3 ile 7'nin çarpımıdır. Farklı olan <strong>21</strong>'dir.",
        "<strong>Örnek 3 (tam kareler):</strong> 16, 49, 50, 81, 25. Sırasıyla 4, 7, 9 ve 5'in kareleri olan dört sayı vardır; 50 hiçbir tam sayının karesi değildir (7'nin karesi 49, 8'inki 64). Farklı olan <strong>50</strong>'dir.",
        "<strong>Örnek 4 (sözcük):</strong> elma, armut, kiraz, havuç, şeftali. Dördü meyvedir, havuç ise sebzedir; farklı olan <strong>havuç</strong> olur. Burada beş sözcüğün de yiyecek olması bir ayrım getirmez; aranan, tam olarak dört seçeneği kapsayan en dar ortak kümedir.",
      ],
    },
    {
      h: "Çözüm yöntemi: özelliği dörtlüde arayın",
      ol: [
        "Farklı olanı doğrudan aramak yerine, önce dört seçeneği birleştiren özelliği bulmaya çalışın.",
        "Sayı sorularında sırayla şunu sorun: Hepsi çift mi? Rakamları toplamı 3'ün ya da 9'un katı mı? Son rakamları 0 ya da 5 mi? Çarpım tablosundan tanıdık geliyorlar mı? Tam kare ya da asal olabilirler mi?",
        "Sözcük sorularında her sözcüğün ait olduğu kümeyi içinizden adlandırın: canlı mı, nesne mi; nerede bulunur; ne işe yarar; hangi alana aittir?",
        "Bulduğunuz özelliğin <strong>tam dört</strong> seçenekte geçerli olduğunu doğrulayın. Üçünde ya da beşinde geçerliyse yanlış özelliğe bakıyorsunuz demektir.",
        "Geriye kalan tek seçeneği işaretleyin.",
      ],
    },
    {
      h: "Sık yapılan hatalar ve süre yönetimi",
      p: [
        "15 soru için 10 dakika, soru başına 40 saniye eder. Sayı sorularında bölünebilme kurallarını bilen biri yirmi saniyede sonuca ulaşır; sözcük sorularında ise ortak küme ya hemen görünür ya da hiç görünmez. Bir soruda yarım dakikadan fazla bocalıyorsanız boş geçip sonra dönmek daha verimlidir.",
      ],
      ul: [
        "Yüzeysel farklara takılmak: en büyük sayı, tek iki basamaklı sayı ya da en uzun sözcük çoğunlukla farklı olan değildir.",
        "Dördü kapsamayan bir özelliği yeterli saymak. Üç seçeneği birleştiren bir özellik iki farklı bırakır ve soruyu çözmez.",
        "Asal sandığınız sayıyı denetlememek: 21, 27, 33, 39 ve 49 gibi tek sayılar asal gibi görünür ama değildir.",
        "Sözcüklerde yazılışa, harf sayısına ya da baş harfe bakmak. Sözcük sorularında ayrım anlama dayanır.",
        "Kişisel çağrışımlarla karar vermek. Aranan, herkesin kabul edeceği açık ve nesnel bir sınıflandırmadır.",
      ],
    },
    {
      h: "Sonuç ekranı ve sonucun anlamı",
      p: [
        "Test bitince doğru, yanlış ve boş soru sayınız ile başarı yüzdeniz gösterilir; sayısal ve sözel sorulardaki başarınız ayrıca dökülür. Cevap anahtarında her soru için doğru seçenek, sizin seçiminiz ve dört seçeneği birleştiren özelliği anlatan bir açıklama bulunur. <strong>Yeni sorularla tekrar çöz</strong> dediğinizde sayı soruları baştan üretilir, sözcük soruları bankadan yeniden çekilir.",
        "<strong>Bu sonuç bir IQ puanı değildir</strong> ve site IQ sayısı vermez. Gerçek zekâ ölçümü, norm çalışması yapılmış testlerle ve bir uzmanın gözetiminde yapılır. Buradaki yüzde yalnızca bu 15 sorudaki başarınızı gösterir; sözcük sorularında kelime dağarcığı ve genel kültür de sonucu etkiler. Tanı, okul yerleştirme ya da işe alım gibi kararlarda kullanılamaz; test eğlence ve alıştırma amaçlıdır.",
        "Tekrar ettikçe bölünebilme kurallarını ve tam kareleri daha çabuk tanırsınız; yükselen sonuç bu alıştırma etkisinin, yani soru tipine aşinalığın göstergesidir. Sayı sorularında emin olamadığınız bir sayının asal olup olmadığını sitedeki asal sayı sorgulama aracıyla sonradan denetleyebilirsiniz.",
      ],
    },
  ],
  faq: [
    ["Farklı Olanı Bul Testi kaç sorudan oluşuyor?", "Test 15 sorudan oluşur: sekizi sayılarla, yedisi sözcüklerle ilgilidir. Süre 10 dakikadır ve her soruda beş seçenek bulunur."],
    ["Bir soruda birden fazla seçenek farklı olabilir mi?", "Sorular, dört seçeneği birleştiren açık bir özellik olacak biçimde kurulur. Başka bir bakış açısıyla ikinci bir fark bulunabilir; ancak aranan, tam dört seçeneği kapsayan en belirgin özelliktir. Açıklamalar bu özelliği belirtir."],
    ["Bu test IQ puanı verir mi?", "Hayır. Sonuç yalnızca bu soru setindeki doğru oranınızdır. Site IQ sayısı vermez; gerçek IQ ölçümü norm çalışması yapılmış testlerle, uzman gözetiminde yapılır."],
    ["Sayı sorularında hangi bilgileri bilmem gerekir?", "Çarpım tablosu, 3, 5 ve 9 ile bölünebilme kuralları, 50'ye kadar asal sayılar ve 121'e kadar tam kareler yeterlidir. Hepsi ilköğretim düzeyinde bilgilerdir."],
    ["Sorular her seferinde değişiyor mu?", "Sayı soruları her başlatışta yeniden üretilir. Sözcük soruları bir bankadan rastgele seçildiği için birkaç denemeden sonra tanıdık sorulara rastlayabilirsiniz; aynı test içinde ise tekrar etmez."],
    ["Yanlış cevap puan götürür mü?", "Hayır. Yanlış ve boş sorular aynı biçimde değerlendirilir; doğrularınızdan düşülmez. Kararsız kaldığınızda tahminde bulunmanız sonucu kötüleştirmez."],
    ["Çocuklarla birlikte çözülebilir mi?", "Evet, özellikle sözcük soruları birlikte konuşarak çözmeye uygundur. Yetişkin eşliğinde, oyun havasında uygulayın ve sonucu çocuğu etiketlemek için kullanmayın."],
    ["Cevaplarım bir yere gönderiliyor mu?", "Hayır. Sorular tarayıcınızda hazırlanır; cevaplarınız ve sonucunuz hiçbir sunucuya gönderilmez. Kayıt ya da kişisel bilgi gerekmez."],
  ],
  related: ["sayisal-zeka-testi", "sozel-zeka-testi", "benzetme-testi", "mantik-testi", "iq-testi", "asal-sayi-sorgula"],
};
