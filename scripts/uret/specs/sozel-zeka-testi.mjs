export default {
  slug: 'sozel-zeka-testi',
  title: 'Sözel Zekâ Testi',
  h1Tail: 'ücretsiz, açıklamalı',
  pageTitle: 'Sözel Zekâ Testi: 20 Soru, Açıklamalı Cevap Anahtarı',
  description: 'Sözel zekâ testi: benzetme, farklı kelimeyi bulma ve harf dizisi türünde 20 soruyu 12 dakikada çözün. Ücretsiz, kayıt yok, açıklamalı cevaplar, her testte yeni sorular.',
  card: '20 soruluk sözel test: benzetme, farklı kelimeyi bulma ve harf dizisi. Açıklamalı cevap anahtarıyla.',
  category: 'zeka',
  kind: 'test',
  keywords: ['sözel zeka testi', 'sözel yetenek testi', 'sözel akıl yürütme soruları', 'kelime zeka testi', 'farklı kelimeyi bul', 'harf dizisi soruları', 'benzetme soruları', 'sözel mantık testi ücretsiz'],
  lead: 'Bu testte kelimelerle ve harflerle akıl yürütmeyi deneyen 20 soru çözersiniz: 10 benzetme, 6 farklı kelimeyi bulma ve 4 harf dizisi. Süre 12 dakikadır; sonunda her sorunun doğru cevabını ve açıklamasını görürsünüz.',
  test: { sure: 12, karisim: [['benzetme', 10], ['farkliKelime', 6], ['harfDizisi', 4]] },
  howto: [
    '<strong>Testi başlat</strong> düğmesine basın; 12 dakikalık süre işlemeye başlar.',
    'Her soruyu okuyun ve seçeneklerden birini işaretleyin. Benzetmede ilişkiyi, farklı kelimede ortak özelliği, harf dizisinde kuralı arayın.',
    'Takıldığınız soruyu boş bırakıp sonrakine geçin; süre bitmeden geri dönebilirsiniz.',
    'Bütün soruları gözden geçirdikten sonra testi bitirin ya da sürenin dolmasını bekleyin.',
    'Sonuç ekranında doğru, yanlış ve boş sayınızı, başarı yüzdenizi, türlere göre dökümü ve açıklamalı cevap anahtarını inceleyin.',
  ],
  sections: [
    {
      h: 'Testte hangi soru türleri var?',
      p: [
        'Sözel akıl yürütme, kelimelerin anlamını bilmenin ötesinde kavramlar arasında ilişki kurmayı, sınıflandırmayı ve bir kuralı fark edip sürdürmeyi içerir. Bu test bu üç beceriyi üç ayrı soru türüyle dener. Sorular kolaydan zora doğru karışık gelir ve her testte yeniden seçilir.',
      ],
      ul: [
        '<strong>Benzetme (10 soru):</strong> "A : B = C : ?" biçimindedir. İlk çiftteki ilişkiyi bulup aynısını ikinci çiftte kurarsınız. Kavramlar arası ilişki kurma ve kelime bilgisini çalıştırır.',
        '<strong>Farklı kelimeyi bulma (6 soru):</strong> Beş sözcükten dördü ortak bir özelliği paylaşır, biri gruba uymaz. Sınıflandırma ve ortak özelliği soyutlama becerisini çalıştırır.',
        '<strong>Harf dizisi (4 soru):</strong> Belirli bir kurala göre ilerleyen harflerin sıradakini bulursunuz. Anlam bilgisi gerektirmez; düzen fark etme ve alfabe sırasını zihinde tutma becerisini çalıştırır.',
      ],
    },
    {
      h: 'Benzetme soruları: çözümlü örnek',
      p: [
        'Örnek: "Anahtar : Kilit = Kumanda : ?" Seçenekler: Televizyon, Pil, Düğme, Koltuk, Kanal. İlk çifti cümleye dökelim: "Anahtar, kilidi çalıştırmak için kullanılır." Aynı cümleyi kumanda için kurarsak "Kumanda, <strong>televizyonu</strong> çalıştırmak için kullanılır" olur. Pil kumandanın içindedir, düğme parçasıdır, kanal ise kumandayla değiştirilen şeydir; bunlar kumandayla ilgilidir ama kurduğumuz cümleyi tamamlamaz.',
        'Benzetmede en güvenilir yöntem ilişkiyi kısa ve kesin bir cümleyle söylemektir. Cümle ne kadar netse çeldiriciler o kadar kolay elenir. Yöne de dikkat edin: ilk çiftte parça önce, bütün sonra geliyorsa ikinci çiftte de aynı sıra korunmalıdır.',
      ],
    },
    {
      h: 'Farklı kelimeyi bulma: çözümlü örnek',
      p: [
        'Örnek: "Çarşamba, Temmuz, Cumartesi, Pazartesi, Perşembe" sözcüklerinden hangisi gruba uymaz? Dört sözcük haftanın günlerinin adıdır; <strong>Temmuz</strong> ise bir ay adıdır. Cevap Temmuz olur.',
        'Daha zor sorularda ortak özellik ilk bakışta görünmez. Örneğin "Kaplumbağa, Salyangoz, Midye, Yengeç, Kirpi" beşlisinde dört canlının sert bir kabuğu vardır; kirpi ise dikenlerle kaplıdır. Böyle sorularda sözcükleri ikişer ikişer karşılaştırıp "bu ikisinin ortak yanı ne" diye sormak işe yarar. Bulduğunuz özellik tam dört sözcükte varsa doğru yoldasınız demektir. Yalnızca iki ya da üç sözcüğü kapsıyorsa başka bir özellik aramanız gerekir.',
        'Sık yapılan bir hata, sözcüklerin yazılışına ya da uzunluğuna takılmaktır. Bu testteki sorularda ortak özellik her zaman anlamla ilgilidir: tür, kullanım yeri, ait olduğu grup gibi.',
      ],
    },
    {
      h: 'Harf dizisi soruları: kurallar ve çözümlü örnekler',
      p: [
        'Harf dizilerinde 29 harfli Türk alfabesi kullanılır: A B C Ç D E F G Ğ H I İ J K L M N O Ö P R S Ş T U Ü V Y Z. Ç, Ğ, I, İ, Ö, Ş ve Ü harflerini atlamamak gerekir; Q, W ve X ise alfabede yoktur. En pratik yöntem alfabeyi bir kâğıda yazıp harflerin arasını saymaktır.',
        '<strong>Sabit adım.</strong> "A C D F Ğ ?" dizisinde A ile C arasında B, C ile D arasında Ç, D ile F arasında E, F ile Ğ arasında G atlanmıştır. Her adımda iki harf ileri gidilmektedir. Ğ harfinden iki harf ileri gidince H atlanır ve <strong>I</strong> bulunur.',
        '<strong>Geriye doğru.</strong> "Z V U Ş R ?" dizisinde harfler alfabede sondan başa doğru ikişer ikişer ilerler: Z ile V arasında Y, V ile U arasında Ü, U ile Ş arasında T, Ş ile R arasında S atlanmıştır. R harfinden iki geri gidince P atlanır ve <strong>Ö</strong> bulunur.',
        '<strong>Artan atlama.</strong> "B C D G İ ?" dizisinde adımlar sabit değildir: B harfinden C harfine bir, C harfinden D harfine iki (Ç atlanır), D harfinden G harfine üç, G harfinden İ harfine dört harf ileri gidilmiştir. Sıradaki adım beş harftir; İ harfinden beş ileri sayınca J, K, L, M geçilir ve <strong>N</strong> bulunur.',
        '<strong>İç içe iki dizi.</strong> "A Z B Y C V ?" dizisinde tek sıradaki harfler (A, B, C) alfabede ileri, çift sıradaki harfler (Z, Y, V) geri gitmektedir. Soru işareti tek sırada olduğu için ileri giden dizinin devamıdır: C harfinden sonra <strong>Ç</strong> gelir. Bir dizide harfler bir ileri bir geri zıplıyorsa birer atlayarak okumayı deneyin.',
      ],
    },
    {
      h: 'Süre yönetimi ve çözüm ipuçları',
      ul: [
        '20 soruya 12 dakika, soru başına ortalama 36 saniye demektir. Benzetme ve farklı kelime soruları çoğunlukla daha kısa sürer; kazandığınız zamanı harf dizilerine ayırın.',
        'Bir soruda bir dakikadan fazla kaldıysanız boş bırakıp ilerleyin. Sona kalan sürede geri dönmek, baştaki bir soruda takılıp sondaki kolay soruları kaçırmaktan iyidir.',
        'Benzetmede cevabı seçeneklere bakmadan tahmin etmeye çalışın; tahmininiz seçeneklerde varsa güvenle işaretleyin.',
        'Farklı kelime sorusunda "neden farklı" sorusunu bir cümleyle cevaplayamıyorsanız seçiminizi yeniden düşünün.',
        'Harf dizisinde önce ardışık harfler arasındaki uzaklığı sayın. Uzaklıklar eşitse sabit adım, birer birer artıyorsa artan atlama, düzensiz görünüyorsa iç içe iki dizi olabilir.',
        'Yanlış cevaplar doğrularınızdan düşülmez; yine de rastgele işaretlemek neyi bilip neyi bilmediğinizi görmenizi zorlaştırır.',
      ],
    },
    {
      h: 'Sonuç ekranında neler var?',
      p: [
        'Test bittiğinde doğru, yanlış ve boş bıraktığınız soru sayısı ile başarı yüzdeniz gösterilir. Tür bazındaki döküm, benzetme, farklı kelime ve harf dizisi sorularında ayrı ayrı nasıl olduğunuzu görmenizi sağlar; böylece hangi türde daha çok alıştırma yapmanız gerektiğini anlarsınız.',
        'Cevap anahtarında her soru için işaretlediğiniz seçenek, doğru seçenek ve kısa bir açıklama yer alır. Benzetmelerde ilişki, farklı kelime sorularında ortak özellik, harf dizilerinde ise kural yazılıdır. <strong>Yeni sorularla tekrar çöz</strong> seçeneği yeni bir soru seti hazırlar: kelime soruları havuzdan yeniden seçilir, harf dizileri ise her seferinde baştan üretilir.',
      ],
    },
    {
      h: 'Sonucu nasıl yorumlamalı?',
      p: [
        'Bu test eğlence ve alıştırma amaçlıdır. Sonuç bir IQ puanı değildir ve site size IQ sayısı vermez. Gerçek zekâ ölçümü, norm çalışması yapılmış testlerle, uzman gözetiminde ve standart koşullarda yapılır; 20 soruluk bir çevrim içi alıştırma bunun yerini tutmaz.',
        'Sözel sorulardaki başarı büyük ölçüde kelime dağarcığına, okuma alışkanlığına, Türkçeye hâkimiyete ve o andaki dikkat ile yorgunluk düzeyine bağlıdır. Bu yüzden sonuç tanı koyma, okul yerleştirme, işe alım ya da bir kişiyi başkalarıyla kıyaslama amacıyla kullanılmamalıdır. Bir çocuğun gelişimiyle ilgili kaygınız varsa doğru adres bir uzmandır.',
        'Testi tekrar çözdükçe sonucunuzun yükselmesi olağandır; soru biçimlerine alışırsınız ve daha hızlı karar verirsiniz. Buna alıştırma etkisi denir. Sözel becerileri kalıcı biçimde geliştiren şey ise düzenli okumak, yeni sözcüklerin anlamını öğrenmek ve kavramlar arasındaki ilişkiler üzerine düşünmektir.',
      ],
    },
  ],
  faq: [
    ['Sözel zekâ testi kaç sorudan oluşuyor?', 'Test 20 sorudur: 10 benzetme, 6 farklı kelimeyi bulma ve 4 harf dizisi sorusu. Süre 12 dakikadır ve süre dolduğunda test kendiliğinden biter.'],
    ['Bu test IQ puanı veriyor mu?', 'Hayır. Sonuç ekranı yalnızca doğru, yanlış ve boş sayınızı, başarı yüzdenizi ve türlere göre dökümü gösterir. Bu bir IQ puanı değildir. Zekâ ölçümü norm çalışması yapılmış testlerle ve uzman gözetiminde yapılır.'],
    ['Sorular her seferinde değişiyor mu?', 'Evet. Benzetme ve farklı kelime soruları geniş bir havuzdan rastgele seçilir, harf dizileri ise her testte yeniden üretilir. Seçeneklerin sırası da karıştırılır. Çok sayıda test çözerseniz kelime sorularından bazılarını yeniden görebilirsiniz.'],
    ['Harf dizilerinde hangi alfabe kullanılıyor?', '29 harfli Türk alfabesi kullanılır. Ç, Ğ, I, İ, Ö, Ş ve Ü harfleri sıraya dahildir; Q, W ve X harfleri yoktur. İngiliz alfabesine göre sayarsanız yanlış sonuca ulaşırsınız.'],
    ['Farklı kelime sorusunda birden fazla cevap olabilir mi?', 'Sorular, dört sözcüğün açık bir ortak özelliği paylaşacağı ve yalnızca birinin dışarıda kalacağı biçimde hazırlanmıştır. Ortak özellik her zaman anlamla ilgilidir; harf sayısı ya da yazılış gibi özelliklere göre cevap aramayın. Her sorunun açıklaması sonuç ekranında yer alır.'],
    ['Yanlış cevaplar puanımı düşürüyor mu?', 'Hayır. Yanlışlar doğru sayınızdan düşülmez; doğru, yanlış ve boş sayıları ayrı ayrı gösterilir. Başarı yüzdesi doğru sayınızın toplam soru sayısına oranıdır.'],
    ['Çocuklar bu testi çözebilir mi?', 'Dil temiz ve anlaşılırdır; ilkokulun son sınıflarından itibaren çocuklar soruların çoğunu çözebilir. Bazı sorular genel kültür ya da geniş kelime bilgisi gerektirdiği için küçük yaşlara zor gelebilir. Çocukla birlikte çözmeniz ve sonucu etiketleme için kullanmamanız önerilir.'],
    ['Sözel akıl yürütmemi nasıl geliştirebilirim?', 'Düzenli kitap okumak, bilmediğiniz sözcüklerin anlamına bakmak ve eş anlamlı ile zıt anlamlı sözcükler üzerine düşünmek en etkili yollardır. Bu testteki açıklamaları okumak da soru türlerine alışmanızı sağlar.'],
    ['Cevaplarım ve sonucum kaydediliyor mu?', 'Hayır. Sorular tarayıcınızda hazırlanır; cevaplarınız ve sonucunuz hiçbir yere gönderilmez. Kayıt, ad ya da e-posta gerekmez. Sayfayı kapattığınızda sonuç da silinir.'],
  ],
  related: ['benzetme-testi', 'farkli-olani-bul-testi', 'harf-dizisi-testi', 'iq-testi', 'sayisal-zeka-testi', 'anagram-kontrol'],
};
