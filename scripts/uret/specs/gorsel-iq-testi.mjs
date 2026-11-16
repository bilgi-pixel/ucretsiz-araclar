export default {
  slug: 'gorsel-iq-testi',
  title: 'Görsel IQ Testi (Şekil ve Matris)',
  h1Tail: 'sözsüz, 18 soru',
  pageTitle: 'Görsel IQ Testi: Şekil Matrisi ve Döndürme Soruları (18 Soru)',
  description: 'Sözsüz görsel IQ testi tarzı alıştırma: 12 şekil matrisi ve 6 şekil döndürme sorusu, 20 dakika. Ücretsiz, kayıtsız; her cevabın kuralı açıklanır.',
  card: 'Yalnızca şekillerle çözülen 18 soruluk test: üçe üç matrislerde eksik hücre ve döndürülmüş şekli bulma.',
  category: 'zeka',
  kind: 'test',
  keywords: ['görsel iq testi', 'şekil iq testi', 'matris testi', 'şekilli zeka testi', 'sözsüz zeka testi', 'görsel zeka testi', 'şekil yeteneği testi', 'şekil döndürme soruları'],
  lead: "Bu testte okunacak metin yok denecek kadar azdır: 12 soruda üçe üç şekil tablosunun eksik hücresini, 6 soruda bir şeklin döndürülmüş hâlini bulursunuz. Süre 20 dakikadır ve test sonunda her sorunun kuralı tek tek açıklanır.",
  test: { sure: 20, karisim: [['matris', 12], ['donus', 6]] },
  howto: [
    "Ekran parlaklığını yeterli düzeye getirin; boş, gri ve koyu dolgu tonlarını rahat ayırt edebilmelisiniz. Hazır olunca <strong>Teste başla</strong> düğmesine basın.",
    "Matris sorularında sağ alt hücredeki soru işaretinin yerine gelecek şekli altı seçenek arasından seçin.",
    "Döndürme sorularında üstteki örnek şeklin kâğıt üzerinde çevrilmiş hâlini dört seçenek arasından bulun.",
    "Seçeneğe tıklayın ya da numarasına basın; kararsız kaldığınız soruyu boş geçip daha sonra geri dönün.",
    "Son soruda <strong>Testi bitir</strong> düğmesine basın ve cevap anahtarındaki kural açıklamalarını şekillerle karşılaştırarak okuyun.",
  ],
  sections: [
    {
      h: 'Şekil matrisi soruları nasıl kurulur?',
      p: [
        "Her matris dokuz hücreden oluşur ve her hücrede üç nitelik vardır: <strong>şeklin türü</strong> (daire, kare, üçgen ya da eşkenar dörtgen), <strong>şekil sayısı</strong> (bir, iki ya da üç) ve <strong>dolgu tonu</strong> (boş, gri ya da koyu). Soruyu çözmek, bu üç niteliğin her birinin tabloda hangi kurala uyduğunu bulmak demektir.",
        "Bir nitelik dört farklı biçimde davranabilir: tabloda hiç değişmeyebilir; her satırda aynı kalıp satırdan satıra değişebilir; her sütunda aynı kalıp sütundan sütuna değişebilir; ya da her satırda bir hücre kayarak tekrar edebilir. Sonuncusunda her satır ve her sütunda üç değerin her biri tam bir kez görünür.",
      ],
      ul: [
        "<strong>Kolay sorular:</strong> Yalnızca bir nitelik satırdan satıra değişir, diğer ikisi sabittir.",
        "<strong>Orta sorular:</strong> Bir nitelik satıra, bir nitelik sütuna bağlıdır; üçüncüsü sabit kalır.",
        "<strong>Zor sorular:</strong> Üç nitelik de değişir ve en az biri kayarak tekrar eder; her niteliği ayrı ayrı izlemeden çözmek güçtür.",
      ],
    },
    {
      h: 'Çözümlü matris örneği',
      p: [
        "Şöyle bir tablo düşünün. Birinci satır: bir boş daire, bir gri daire, bir koyu daire. İkinci satır: iki boş kare, iki gri kare, iki koyu kare. Üçüncü satır: üç boş üçgen, üç gri üçgen ve soru işareti.",
        "Nitelikleri sırayla inceleyelim. Şekil türü her satırda aynıdır (daire, kare, üçgen); üçüncü satırda olduğumuza göre cevap üçgendir. Şekil sayısı da satıra bağlıdır (bir, iki, üç); cevapta üç şekil olmalıdır. Dolgu tonu ise sütuna bağlıdır (birinci sütun boş, ikinci gri, üçüncü koyu); üçüncü sütunda olduğumuza göre ton koyudur. Sonuç: <strong>üç adet koyu üçgen</strong>.",
        "Seçenekler arasında üç gri üçgen, iki koyu üçgen ya da üç koyu kare gibi yalnızca tek niteliği farklı olan çeldiriciler bulunur. Bu yüzden iki niteliği doğru bulup üçüncüsünü tahmin etmek çoğu zaman yanlışa götürür.",
        "Kayan kural için kısa bir örnek: ilk satırda tonlar boş, gri, koyu; ikinci satırda gri, koyu, boş ise üçüncü satır koyu, boş, gri olur. Köşegen boyunca bakıldığında aynı tonun tekrar ettiğini görmek bu kuralı tanımanın en hızlı yoludur.",
      ],
    },
    {
      h: 'Şekil döndürme soruları: döndürme ile ayna görüntüsü farkı',
      p: [
        "Döndürme sorularında dörde dört kareli bir zeminde beş ya da altı kareden oluşan bir şekil verilir. Bu şekil kâğıt üzerinde çeyrek tur, yarım tur ya da üç çeyrek tur döndürülür; kâğıt ters yüz edilmez. Dört seçenekten yalnızca biri bu döndürmelerden biridir. Diğer üçü şeklin <strong>ayna görüntüsünün</strong> çeşitli döndürmeleridir.",
        "Aradaki farkı anlamak için sol elinizle sağ elinizi düşünün: ikisi de aynı parmaklara sahiptir, ama birini ne kadar çevirirseniz çevirin diğeriyle üst üste getiremezsiniz. Kareli şekillerde de durum aynıdır. Örneğin üç karelik dikey bir çubuğun alt ucuna sağa doğru bir kare eklenmiş L biçimini ele alın. Bu şekli çeyrek tur döndürdüğünüzde çubuk yatay olur ve çıkıntı aşağıya bakar. Çıkıntının sola baktığı dikey çubuk ise ayna görüntüsüdür; hiçbir döndürmeyle ilk şekle dönüşmez.",
        "Pratik yöntem: şeklin uzun kolunu bulun ve o kolun ucundan bakarken çıkıntının sağınızda mı solunuzda mı kaldığına karar verin. Doğru seçenekte çıkıntı aynı tarafta kalır; ayna görüntülerinde karşı tarafa geçer.",
      ],
    },
    {
      h: 'Sonuç ekranı ve tekrar çözme',
      p: [
        "Test bittiğinde 18 üzerinden doğru sayınız, yanlış ve boş sayıları ile başarı yüzdeniz gösterilir. Bu testteki bütün sorular Görsel başlığı altında toplandığından tür dökümünde tek satır görürsünüz; matris ve döndürme sorularındaki durumunuzu ayrı ayrı görmek için cevap anahtarına bakın.",
        "Cevap anahtarında her soru şekilleriyle birlikte yeniden çizilir. Matris sorularının açıklaması üç niteliğin kuralını sırayla yazar; örneğin şeklin her satırda aynı kaldığını, sayının sütundan sütuna değiştiğini ve tonun kayarak tekrar ettiğini söyler. Açıklamayı okurken tabloya bakıp kuralı kendiniz doğrulamak, bir sonraki denemede aynı düzeni çok daha hızlı fark etmenizi sağlar.",
        "<strong>Yeni sorularla tekrar çöz</strong> düğmesi yeni tablolar ve yeni şekiller üretir. Şekiller, sayılar, tonlar ve kurallar her seferinde yeniden seçildiği için ezberlenecek bir cevap anahtarı yoktur.",
      ],
    },
    {
      h: 'Bu test neyi gösterir, neyi göstermez?',
      p: [
        "Şekil matrisleri soyut düzen bulmayı, döndürme soruları ise bir şekli zihinde çevirmeyi gerektirir. Bu tür sorular dil bilgisine ve okul bilgisine çok az dayandığı için farklı yaş ve eğitim düzeyinden kişilerce çözülebilir. Yine de bu sayfadaki test eğlence ve alıştırma amaçlıdır.",
        "Sonuç bir IQ puanı değildir ve site bir IQ sayısı vermez. Böyle bir sayı ancak geniş bir grupta denenmiş, norm çalışması yapılmış testlerle ve uzman gözetiminde elde edilir. Buradaki yüzde; tanı, okul yerleştirme, işe alım ya da bir kişinin yeteneği hakkında karar vermek için kullanılmamalıdır. Renk ve ton ayrımında güçlük çeken ya da küçük ekranda çözen kişilerde sonuç, yetenekle ilgisi olmayan nedenlerle düşebilir.",
      ],
    },
    {
      h: 'İpuçları, sık yapılan hatalar ve süre',
      ul: [
        "On sekiz soru için 20 dakika, soru başına bir dakikadan biraz fazla süre demektir. Kolay matrisleri yarım dakikada geçip zamanı sondaki üç kurallı sorulara ayırın.",
        "Matriste önce üçüncü satırın ilk iki hücresine ve üçüncü sütunun ilk iki hücresine bakın; cevabın büyük bölümü çoğu zaman bu dört hücrede saklıdır.",
        "Seçenekleri eleyerek ilerleyin: şekil türü yanlış olanları atın, sonra sayısı yanlış olanları, sonra tonu yanlış olanları.",
        "Gri ile koyu tonu karıştırmak sık görülür. Emin olamadığınızda aynı satırdaki diğer hücrelerle yan yana karşılaştırın.",
        "Döndürme sorularında telefonu ya da başınızı çevirmek yerine zihninizde çevirmeye çalışın; alıştırmanın amacı budur.",
        "Tekrar çözdükçe sonuçların yükselmesi olağandır. Bu alıştırma etkisi, kuralları daha hızlı tanımanızdan kaynaklanır ve zekânın değiştiği anlamına gelmez.",
      ],
    },
  ],
  faq: [
    ['Görsel IQ testi sonucunda IQ puanı verilir mi?', "Hayır. Yalnızca 18 sorudaki doğru sayınız ve başarı yüzdeniz gösterilir. IQ puanı, norm çalışması yapılmış testlerle ve uzman gözetiminde ölçülür; bu sayfa öyle bir ölçüm yapmaz."],
    ['Testte okuma ya da hesap gerekiyor mu?', "Hayır. Soru cümlesi dışında okunacak metin ve yapılacak hesap yoktur; bütün sorular şekillerle çözülür."],
    ['Matris sorularında kaç seçenek var?', "Matris sorularında altı, döndürme sorularında dört seçenek bulunur. Her soruda tek bir doğru cevap vardır."],
    ['Ayna görüntüsü ile döndürme arasındaki fark nedir?', "Döndürmede şekil kâğıt üzerinde çevrilir; ayna görüntüsünde ise kâğıt ters yüz edilmiş gibi sağ ile sol yer değiştirir. Ayna görüntüsü hiçbir döndürmeyle asıl şekille üst üste gelmez."],
    ['Sorular her seferinde değişiyor mu?', "Evet. Şekiller, sayıları, tonları ve kurallar her denemede yeniden üretilir. Aynı seti tekrar görmek isterseniz sonuç ekranındaki 'Aynı soruları yeniden çöz' düğmesini kullanabilirsiniz."],
    ['Telefonda şekiller yeterince büyük görünür mü?', "Sayfa dar ekranlara uyar ve şekiller ekran genişliğine göre ölçeklenir. Üç şekilli hücrelerde tonları ayırt etmek zorlaşırsa parlaklığı artırmanız yeterli olur."],
    ['Renk körlüğü sonucu etkiler mi?', "Sorularda renk yerine boş, gri ve koyu dolgu tonları kullanılır; bu yüzden renk ayrımı gerekmez. Ancak düşük parlaklıkta gri ile koyu ton birbirine yaklaşabilir."],
    ['Çocuklar bu testi çözebilir mi?', "İlk sorular kolaydır, ama son sorular üç kuralı birlikte izlemeyi gerektirir ve küçük çocuklar için zor olabilir. 7–12 yaş için yalnızca kolay düzey sorulardan oluşan ayrı bir test vardır."],
    ['Cevaplarım ve sonucum saklanıyor mu?', "Hayır. Sorular tarayıcınızda üretilir; cevaplar ve sonuç hiçbir yere gönderilmez, kayıt istenmez. Sayfayı kapattığınızda sonuç silinir."],
  ],
  related: ['sekil-matris-testi', 'uzamsal-zeka-testi', 'iq-testi', 'hizli-iq-testi', 'dikkat-testi'],
};
