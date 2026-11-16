export default {
  slug: 'hizli-iq-testi',
  title: 'Hızlı IQ Testi (10 Soru)',
  h1Tail: '6 dakikada kısa deneme',
  pageTitle: 'Hızlı IQ Testi: 10 Soruluk Kısa Zekâ Testi (6 Dakika)',
  description: 'On soruluk hızlı IQ testi tarzı alıştırma: şekil matrisi, sayı dizisi, benzetme, mantık ve döndürme. 6 dakika sürer, kayıt istemez, cevaplar açıklamalıdır.',
  card: 'Altı dakikada biten 10 soruluk kısa zekâ testi: şekil, sayı, sözel ve mantık sorularından birer tadımlık.',
  category: 'zeka',
  kind: 'test',
  keywords: ['hızlı iq testi', 'kısa iq testi', '10 soruluk iq testi', 'kısa zeka testi', '5 dakikada iq testi', 'hızlı zeka testi', 'mini iq testi'],
  lead: "Vaktiniz azsa bu kısa deneme tam size göre: on soru, altı dakika. Şekil matrisi, sayı dizisi, sözel benzetme, mantık ve şekil döndürme türlerinin her birinden birkaç soru çözer, sonunda doğru cevapları açıklamalarıyla görürsünüz.",
  test: { sure: 6, karisim: [['matris', 3], ['sayiDizisi', 2], ['benzetme', 2], ['mantik', 2], ['donus', 1]] },
  howto: [
    "Birkaç dakika boyunca bölünmeyeceğiniz bir an seçin ve <strong>Teste başla</strong> düğmesine basın; altı dakikalık sayaç hemen çalışır.",
    "Soruyu okuyup seçeneğe tıklayın ya da klavyeden numarasına basın. Sağ ok tuşu sonraki soruya, sol ok tuşu önceki soruya götürür.",
    "Yarım dakikada çözemediğiniz soruyu <strong>Boş geç</strong> ile atlayın; süre kalırsa geri dönersiniz.",
    "Onuncu soruda <strong>Testi bitir</strong> düğmesine basın ya da sürenin dolmasını bekleyin.",
    "Sonuç ekranındaki dökümü ve açıklamalı cevap anahtarını okuyun; isterseniz yeni sorularla bir tur daha atın.",
  ],
  sections: [
    {
      h: 'On soruda neler soruluyor?',
      p: ["Kısa testte beş soru türü yer alır. Soruların sırası her denemede değişir; yine de kolay sorular başa, zorlar sona düşer."],
      ul: [
        "<strong>Şekil matrisi (3 soru):</strong> Üçe üç tabloda eksik hücreyi bulursunuz. Biri kolay, biri orta, biri zor düzeydedir. Kolay olanda yalnızca tek bir nitelik (örneğin şeklin türü) satırdan satıra değişir; zor olanda şekil, sayı ve dolgu tonu aynı anda farklı kurallarla değişir.",
        "<strong>Sayı dizisi (2 soru):</strong> İlki sabit artan, sabit azalan ya da katlanan basit bir dizidir; ikincisi orta düzeydedir ve farkı büyüyen, önceki iki terimi toplayan ya da iç içe iki diziden oluşan bir kural içerebilir.",
        "<strong>Sözel benzetme (2 soru):</strong> 'Birinci kelime ikinciye neyse üçüncü de dördüncüye odur' kalıbındaki sorulardır.",
        "<strong>Mantık (2 soru):</strong> Kısa öncüllerden kesin çıkan sonucu ya da birkaç kişinin boy sırasını bulursunuz.",
        "<strong>Şekil döndürme (1 soru):</strong> Kareli zemindeki şeklin döndürülmüş hâlini üç ayna görüntüsünden ayırırsınız.",
      ],
    },
    {
      h: 'Birer çözümlü örnek',
      p: [
        "<strong>Sayı dizisi:</strong> 2, 3, 5, 8, 13, ? dizisinde her terim kendinden önceki iki terimin toplamıdır: 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13. Sıradaki terim 8 + 13 = <strong>21</strong> olur. Son farkı (5) tekrar ekleyip 18 demek bu sorunun tipik tuzağıdır.",
        "<strong>Mantık:</strong> 'Cem, Ece'den uzundur. Banu, Cem'den uzundur.' bilgilerini birleştirince sıra Banu, Cem, Ece olur. En kısa boylu kişi sorulursa cevap <strong>Ece</strong>, en uzun sorulursa <strong>Banu</strong> olur. Cümleler karışık sırada verilir; önce ortak adı (burada Cem) bulmak işi hızlandırır.",
        "<strong>Sözel benzetme:</strong> 'Kalem : yazmak = makas : ?' sorusunda ilk çift bir araç ile onunla yapılan işi eşleştirir. Aynı ilişkiyle cevap <strong>kesmek</strong> olur. İlişkiyi önce bir cümleyle söylemek ('kalemle yazılır') doğru seçeneği kolayca buldurur.",
        "<strong>Şekil matrisi:</strong> Tablonun her satırında şekil türü aynı kalıyorsa (ilk satır daire, ikinci satır kare, üçüncü satır üçgen) ve sayı ile ton hiç değişmiyorsa, boş hücreye de üçüncü satırın şekli, yani üçgen gelir.",
      ],
    },
    {
      h: 'Sonuç ekranında neler görürsünüz?',
      p: [
        "Test bitince 10 üzerinden doğru sayınız, yanlış ve boş sayılarınız, başarı yüzdeniz ve bu soru setine özgü bir düzey etiketi görünür. Hemen altında tür bazında döküm vardır: Görsel (matris ve döndürme) 4, Sayısal 2, Sözel 2 ve Mantık 2 soru üzerinden değerlendirilir.",
        "Cevap anahtarında her soru, doğru seçenek ve kuralın açıklamasıyla birlikte yeniden listelenir. Yanlış işaretlediğiniz sorularda kendi cevabınız da gösterilir. <strong>Yeni sorularla tekrar çöz</strong> düğmesine bastığınızda sorular baştan üretilir; aynı diziyi ya da aynı tabloyu tekrar görme olasılığınız çok düşüktür.",
      ],
    },
    {
      h: 'Kısa testin sınırları: bu bir IQ ölçümü değildir',
      p: [
        "Bu sayfa bir IQ sayısı vermez ve vermesi de mümkün değildir. On soruluk bir denemede tek bir sorunun değeri on puanlık yüzdeye karşılık gelir; yani bir dikkatsizlik ya da şanslı bir tahmin sonucu belirgin biçimde oynatır. Yediden sekize çıkmak ya da altıya inmek çoğu zaman rastlantıdan ibarettir.",
        "Gerçek IQ ölçümü çok daha uzun, norm çalışması yapılmış testlerle ve bir uzmanın gözetiminde yapılır. Buradaki sonuç eğlence ve alıştırma içindir; tanı, okul yerleştirme, işe alım ya da bir kişi hakkında hüküm vermek için kullanılmamalıdır. Sonuç ekranındaki düzey etiketi de yalnızca o on sorudaki doğru oranınızı sözle ifade eder.",
        "Daha dengeli bir alıştırma isterseniz 30 soruluk karma testi ya da tek bir soru türüne odaklanan testleri deneyebilirsiniz; soru sayısı arttıkça rastlantının payı azalır.",
      ],
    },
    {
      h: 'Altı dakikayı iyi kullanmak',
      ul: [
        "Soru başına ortalama 36 saniyeniz var. Kolay matris ve dizi sorularını 15–20 saniyede bitirirseniz zor sorulara bir dakikaya yakın süre kalır.",
        "Sayaç son bir dakikaya girdiğinde renk değiştirir. O ana kadar boş bıraktığınız sorulara dönüp en makul seçeneği işaretleyin; yanlış cevap puan götürmez.",
        "Okuması en uzun sorular mantık sorularıdır. Uydurma sözcükleri A, B, C gibi harflerle düşünmek cümleleri kısaltır.",
        "Döndürme sorusunda dört seçeneği tek tek çevirmek yerine şeklin belirgin bir köşesini izleyin; ayna görüntülerinde o köşe ters tarafta kalır.",
        "Emin olduğunuz cevabı tekrar tekrar kontrol etmeyin; kısa testte en pahalı şey kararsızlıktır.",
      ],
    },
    {
      h: 'Kimler için uygun, ne zaman çözülür?',
      p: [
        "Kısa test; soru türlerini tanımak isteyenler, uzun teste başlamadan önce ısınmak isteyenler ve mola arasında zihnini çalıştırmak isteyenler için uygundur. Sınıf içinde ya da arkadaş arasında aynı anda başlayıp sonuçları konuşmak için de pratik bir uzunluktadır; ancak herkesin farklı sorular gördüğünü unutmayın, bu yüzden sonuçları yarış gibi karşılaştırmak anlamlı değildir.",
        "Aynı gün içinde birkaç kez çözerseniz sonucunuzun yükseldiğini fark edebilirsiniz. Bu, alıştırma etkisidir: kalıpları tanır, süreyi daha iyi dağıtırsınız. Bu yükseliş hoş bir ilerlemedir ama zekâ düzeyinizin değiştiğini göstermez.",
      ],
    },
  ],
  faq: [
    ['Hızlı IQ testi gerçek IQ puanımı gösterir mi?', "Hayır. Test bir IQ sayısı üretmez; yalnızca on sorudaki doğru sayınızı ve yüzdenizi gösterir. Gerçek IQ, norm çalışması yapılmış testlerle ve uzman gözetiminde ölçülür."],
    ['On soru bir fikir vermeye yeter mi?', "Soru türlerini tanımaya ve hangisinde zorlandığınızı görmeye yeter; güvenilir bir ölçüm için yetmez. Tek bir soru sonucu on puanlık yüzde kadar değiştirir, bu yüzden sonucu kesin bir gösterge saymayın."],
    ['Süre dolarsa ne olur?', "Altı dakika bittiğinde test kendiliğinden kapanır ve o ana kadar işaretlediğiniz cevaplar değerlendirilir. İşaretlemediğiniz sorular boş sayılır."],
    ['Her denemede farklı sorular mı geliyor?', "Evet. Dizi, matris, mantık ve döndürme soruları her seferinde kurala göre yeniden üretilir; benzetme soruları ise bir havuzdan seçilir. Aynı seti tekrar çözmek isterseniz sonuç ekranındaki ilgili düğmeyi kullanabilirsiniz."],
    ['Zor sorular hangi sırada geliyor?', "Sorular kolaydan zora doğru sıralanır. İlk sorular genellikle tek kurallı matris ve basit dizilerden, son sorular ise üç kurallı matristen oluşur."],
    ['Kısa testle uzun test arasındaki fark nedir?', "Uzun karma test 30 soru ve 25 dakikadır; harf dizisi, sayı benzetmesi ve farklı kelime gibi ek türler içerir. Kısa testte yalnızca beş tür ve on soru vardır; bu nedenle sonuçta rastlantının payı daha büyüktür."],
    ['Çocuklar bu testi çözebilir mi?', "Sorular yetişkinler ve gençler düşünülerek sıralanmıştır; son sorular küçük çocuklar için zor olabilir. 7–12 yaş için yalnızca kolay düzey sorulardan oluşan ayrı bir test bulunur."],
    ['Cevaplarım kaydediliyor mu?', "Hayır. Sorular tarayıcınızda üretilir; cevaplarınız ve sonucunuz hiçbir yere gönderilmez. Kayıt ya da e-posta istenmez, sayfa kapanınca sonuç kaybolur."],
  ],
  related: ['iq-testi', 'gorsel-iq-testi', 'mantik-testi', 'sayi-dizisi-testi', 'dikkat-testi'],
};
