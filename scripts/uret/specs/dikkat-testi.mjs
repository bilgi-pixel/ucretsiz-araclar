export default {
  slug: "dikkat-testi",
  title: "Dikkat Testi",
  h1Tail: "ücretsiz, 6 dakika",
  pageTitle: "Dikkat Testi – Benzer Harf ve Rakamları Sayma (12 Soru)",
  description: "Ücretsiz dikkat testi: birbirine benzeyen harf ve rakamlar arasında hedef karakteri sayın. 12 soru, 6 dakika, açıklamalı sonuç. Kayıt gerekmez, veri gönderilmez.",
  card: "Benzer harf ve rakamlar arasında hedefi sayın: 12 soruluk, 6 dakikalık görsel dikkat alıştırması.",
  category: "zeka",
  kind: "test",
  keywords: [
    "dikkat testi",
    "görsel dikkat testi",
    "dikkat ve konsantrasyon testi",
    "harf sayma testi",
    "b d p q testi",
    "dikkat geliştirme alıştırması",
    "odaklanma testi",
    "seçici dikkat testi",
  ],
  lead: "Dikkat Testi, birbirine çok benzeyen karakterlerden oluşan bir tabloda hedef karakterin kaç kez geçtiğini saymanızı ister. 12 soruluk test 6 dakika sürer ve hem hızınızı hem de titizliğinizi aynı anda zorlar.",
  test: { sure: 6, karisim: [["dikkat", 12]] },
  howto: [
    "Sessiz bir ortam seçin, bildirimleri kapatın ve <strong>Testi başlat</strong> düğmesine basın; 6 dakikalık süre başlar.",
    "Sorunun başında vurgulanan hedef karakteri okuyun; her soruda hedef değişir.",
    "Tablodaki satırları sırayla tarayın ve hedef karakterin toplam kaç kez geçtiğini sayın.",
    "Bulduğunuz sayıyı beş seçenek arasından işaretleyip sonraki soruya geçin.",
    "Test bitince doğru, yanlış ve boş sayınızı, başarı yüzdenizi ve her sorunun doğru sayısını cevap anahtarından inceleyin.",
  ],
  sections: [
    {
      h: "Sorular nasıl kurulur?",
      p: [
        "Her soruda dört karakterlik bir takımdan rastgele dizilmiş bir tablo görürsünüz. Takımlar özellikle birbirine karışan karakterlerden seçilmiştir:",
      ],
      ul: [
        "<strong>b, d, p, q:</strong> Aynı gövdenin dört ayrı duruşu; birbirinin ayna ya da ters çevrilmiş hâlleri.",
        "<strong>6, 9, 8, 0:</strong> Yuvarlak hatlı, hızlı taramada birbirine karışan rakamlar.",
        "<strong>m, n, u, w:</strong> Kemer sayısı ve yönü dışında neredeyse aynı görünen küçük harfler.",
        "<strong>E, F, L, T:</strong> Aynı dik çizgiye farklı sayıda yatay çizgi eklenmiş büyük harfler.",
      ],
    },
    {
      h: "Tablo boyutu ve zorluk",
      p: [
        "İlk dört soruda tablo dört satır ve onar karakterden, yani 40 karakterden oluşur. Sonraki sekiz soruda beş satır ve on dörder karakterle 70 karaktere çıkar. Hedef karakter tablonun kabaca üçte birini oluşturur; kesin sayı her soruda değişir. Seçenekler birbirine çok yakındır: doğru sayının bir ya da iki eksiği ve fazlası çoğunlukla listede yer alır. Bu yüzden yaklaşık saymak yetmez, tek bir karakterin atlanması soruyu kaybettirir.",
      ],
    },
    {
      h: "Çözümlü örnek",
      p: [
        "Hedef karakter <strong>b</strong> olsun ve tablonun ilk satırı şöyle dizilsin: <code>b d p b q d b p d q</code>. Soldan sağa giderken yalnızca gövdesi solda, karnı sağ altta olan harfi sayarız: birinci, dördüncü ve yedinci karakter. Bu satırda 3 tane b vardır.",
        "İkinci satır <code>d b b q p d p b q d</code> ise ikinci, üçüncü ve sekizinci karakterler b'dir; bu satırda da 3 tane çıkar. İki satırın ara toplamı 6 olur. Kalan satırlar da aynı biçimde sayılıp eklenir. Satır toplamlarını ayrı ayrı tutmak önemlidir: sayım bir yerde bölünürse baştan değil, yalnızca o satırdan devam edersiniz.",
        "Bu örnekte en kolay karışan harf d'dir, çünkü b'nin ayna görüntüsüdür. Gözünüz yoruldukça p ve q da araya girmeye başlar; hata genellikle satırın ortasında, taramanın hızlandığı yerde yapılır.",
      ],
    },
    {
      h: "Daha doğru saymak için ipuçları",
      ul: [
        "Tabloyu bir bütün olarak süzmek yerine <strong>satır satır</strong> ve hep aynı yönde tarayın.",
        "Her satırın sonucunu aklınızda ayrı tutup en sonda toplayın; istiyorsanız parmağınızla ya da fare imleciyle satırı izleyin.",
        "Hedefin ayırt edici tek özelliğine odaklanın: b için karnın sağ altta olması, 6 için halkanın altta olması, F için alt çizginin bulunmaması gibi.",
        "Karakterleri içinizden seslendirmeyin; biçime bakıp yalnızca hedefi gördüğünüzde sayıyı bir artırın.",
        "Seçenekleri görmeden önce kendi sayınızı kesinleştirin. Yakın seçenekler arasında kalırsanız yalnızca emin olmadığınız satırı yeniden sayın.",
        "Ekranı göz hizasına getirin ve yazıları rahat seçebileceğiniz bir parlaklık kullanın; küçük ekranda telefonu yatay tutmak satırların bölünmesini önler.",
      ],
    },
    {
      h: "Hız mı, doğruluk mu?",
      p: [
        "6 dakikada 12 soru, soru başına 30 saniye demektir. Küçük tablolarda bu süre rahattır; 70 karakterli tablolarda ise her satıra beş altı saniye düşer ve ikinci kez sayma şansınız çoğunlukla olmaz. İlk dört soruyu hızlı ama dikkatli geçerek sonraki sorulara birkaç saniye biriktirmek iyi bir plandır.",
        "Yanlış cevap doğrularınızı götürmez, ancak yarım yamalak sayılmış on iki soru yerine titizlikle sayılmış dokuz soru daha yüksek bir başarı yüzdesi verir. Sayımı bitiremediğiniz bir soruda en yakın tahmininizi işaretleyip ilerlemek, o soruda takılıp kalmaktan iyidir.",
      ],
    },
    {
      h: "Sonuç ekranı ve sonucun sınırları",
      p: [
        "Test bitince doğru, yanlış ve boş soru sayınız ile başarı yüzdeniz görünür. Cevap anahtarında her tablo yeniden gösterilir; doğru sayı ile sizin işaretlediğiniz sayı yan yana yazılır. Yanlışlarınızın doğru cevaptan bir eksik mi, bir fazla mı çıktığına bakın: sürekli eksik sayıyorsanız karakter atlıyorsunuz, fazla sayıyorsanız benzer karakteri hedef sanıyorsunuz demektir. <strong>Yeni sorularla tekrar çöz</strong> seçeneği tabloları baştan üretir.",
        "<strong>Bu test bir tanı aracı değildir.</strong> Sonuç, dikkat eksikliği ya da başka bir durum hakkında hiçbir şey söylemez; bir IQ puanı da değildir ve site IQ sayısı vermez. Dikkatin değerlendirilmesi, norm çalışması yapılmış araçlarla ve bir uzman tarafından yapılır. Uykusuzluk, yorgunluk, gürültü, ekran boyutu ve günün saati bile bu testteki başarınızı değiştirir. Dikkatinizle ilgili günlük yaşamınızı etkileyen bir kaygınız varsa bir sağlık uzmanına başvurun; bu sayfadaki sonuç okul, iş ya da sağlık kararlarına dayanak olamaz.",
        "Tekrar çözdükçe daha hızlı ve hatasız saymanız beklenir; buna alıştırma etkisi denir ve bu soru tipine alıştığınızı gösterir. Testi, çalışmaya başlamadan önce kısa bir ısınma ya da eğlenceli bir odaklanma oyunu olarak kullanabilirsiniz.",
      ],
    },
  ],
  faq: [
    ["Dikkat testi ne kadar sürüyor?", "Test 12 sorudan oluşur ve 6 dakika sürer. Süre dolduğunda test kendiliğinden biter ve o ana kadar verdiğiniz cevaplar değerlendirilir."],
    ["Bu test dikkat eksikliğini tespit eder mi?", "Hayır. Bu sayfa eğlence ve alıştırma amaçlı bir sayma oyunudur, tanı koymaz. Düşük ya da yüksek sonuç herhangi bir durumu göstermez. Dikkatinizle ilgili bir endişeniz varsa bir uzmana danışın."],
    ["Sonuç IQ puanı mıdır?", "Hayır. Sonuç yalnızca bu 12 sorudaki doğru oranınızdır. Site IQ sayısı vermez; gerçek ölçümler norm çalışması yapılmış testlerle, uzman gözetiminde yapılır."],
    ["Neden b, d, p ve q gibi harfler kullanılıyor?", "Bu harfler aynı biçimin farklı yönlere çevrilmiş hâlleridir ve hızlı taramada kolayca karışır. Benzer karakterler arasında ayrım yapmak, rastgele harfler arasında aramaktan çok daha fazla özen ister."],
    ["Ekrana dokunarak ya da parmakla sayabilir miyim?", "Evet. Parmağınızla ya da imleçle satırı izlemek karakter atlamayı azaltır. Bu bir sınav olmadığı için size uygun yöntemi kullanabilirsiniz."],
    ["Sorular her seferinde aynı mı?", "Hayır. Tablolar, hedef karakter ve doğru sayı her başlatışta yeniden üretilir. Ezberlenebilecek sabit bir cevap yoktur."],
    ["Çocuklar bu testi çözebilir mi?", "Harfleri ve rakamları tanıyan çocuklar çözebilir. Bir yetişkin eşliğinde, oyun havasında ve çocuğu sonuca göre etiketlemeden uygulanması en doğrusudur. Gelişimle ilgili bir endişe varsa uzmana danışılmalıdır."],
    ["Cevaplarım bir yere gönderiliyor mu?", "Hayır. Tablolar tarayıcınızda üretilir; cevaplarınız ve sonucunuz hiçbir sunucuya gönderilmez, kayıt ya da üyelik gerekmez."],
  ],
  related: ["uzamsal-zeka-testi", "sekil-matris-testi", "farkli-olani-bul-testi", "hizli-iq-testi", "hizli-okuma"],
};
