export default {
  slug: 'mantik-testi',
  title: 'Mantık Testi',
  h1Tail: 'ücretsiz, açıklamalı',
  pageTitle: 'Mantık Testi: Çıkarım ve Sıralama Soruları (15 Soru, Ücretsiz)',
  description: 'Ücretsiz mantık testi: öncüllerden kesin sonuç çıkarma ve sıralama türünde 15 soru, 15 dakika. Kayıt gerekmez; her sorunun çözümü test sonunda açıklanır.',
  card: 'Öncüllerden kesin sonuç çıkarma ve boy sıralaması sorularından oluşan 15 soruluk, açıklamalı mantık testi.',
  category: 'zeka',
  kind: 'test',
  keywords: ['mantık testi', 'mantık soruları', 'mantıksal akıl yürütme testi', 'çıkarım soruları', 'sıralama soruları', 'sözel mantık testi', 'mantık yürütme soruları', 'akıl yürütme testi'],
  lead: "Bu testte bilgi değil akıl yürütme sınanır: birkaç cümlelik öncül verilir, siz de bu bilgilerden kesin olarak çıkan sonucu bulursunuz. On beş soru iki türden oluşur: uydurma sözcüklerle kurulmuş çıkarım soruları ve kişilerin boy sırasını bulduğunuz sıralama soruları.",
  test: { sure: 15, karisim: [['mantik', 15]] },
  howto: [
    "<strong>Teste başla</strong> düğmesine basın; 15 dakikalık sayaç çalışmaya başlar.",
    "Çerçeveli kutudaki öncülleri dikkatle okuyun. Çıkarım sorularında sözcükler uydurmadır; anlamlarını tahmin etmeye çalışmayın.",
    "Çıkarım sorularında <strong>kesinlikle doğru</strong> olan seçeneği, sıralama sorularında sorulan kişiyi işaretleyin.",
    "Emin olmadığınız soruyu boş geçip sonra dönün; sol ve sağ ok tuşlarıyla sorular arasında gezebilirsiniz.",
    "Son soruda <strong>Testi bitir</strong> düğmesine basın, sonra cevap anahtarındaki açıklamaları kendi çözümünüzle karşılaştırın.",
  ],
  sections: [
    {
      h: 'Çıkarım soruları: tüm, hiçbir, bazı',
      p: [
        "Çıkarım sorularında iki öncül ve beş seçenek bulunur. Sözcükler bilerek uydurulmuştur (zopi, tirma, belon gibi); böylece günlük bilginiz devreye girmez ve yalnızca cümlelerin yapısıyla düşünürsünüz. Üç kalıp kullanılır.",
        "<strong>Tüm – tüm:</strong> 'Tüm zopiler tirmadır. Tüm tirmalar belondur.' Zopilerin hepsi tirmaların içinde, tirmaların hepsi belonların içinde olduğuna göre <strong>tüm zopiler belondur</strong>. Buna karşılık 'tüm belonlar zopidir' sonucu çıkmaz; belon olup zopi olmayan şeyler bulunabilir.",
        "<strong>Tüm – hiçbir:</strong> 'Tüm kuparlar mirettir. Hiçbir miret saven değildir.' Kuparların hepsi miret olduğuna ve miretlerin hiçbiri saven olmadığına göre <strong>hiçbir kupar saven değildir</strong>.",
        "<strong>Bazı – tüm:</strong> 'Bazı dolunlar pirkadır. Tüm pirkalar hesildir.' Pirka olan dolunlar aynı zamanda hesildir; dolayısıyla <strong>bazı dolunlar hesildir</strong>. Burada 'tüm dolunlar hesildir' demek fazla ileri gitmek olur; pirka olmayan dolunlar hakkında hiçbir şey bilmiyoruz.",
      ],
    },
    {
      h: 'Kesinlikle doğru ile doğru olabilir arasındaki fark',
      p: [
        "Bu soruların özü, verilen bilgiden <strong>zorunlu olarak</strong> çıkan sonucu, yalnızca mümkün olan sonuçlardan ayırmaktır. Yanlış seçenekler üç gruba girer: öncüllerle çelişenler, öncüllerin tersine çevrilmiş hâlleri ve doğru olabilecek ama kesinleşmeyen ifadeler.",
        "En sık düşülen tuzak, 'tüm A'lar B'dir' cümlesini 'tüm B'ler A'dır' diye tersine çevirmektir. Günlük bir örnekle düşünürseniz hata hemen görünür: tüm kediler hayvandır, ama tüm hayvanlar kedi değildir. Uydurma sözcüklerde bu sezgi çalışmadığı için kuralı bilinçli uygulamak gerekir.",
        "İkinci tuzak 'bazı' sözcüğüdür. Mantıkta 'bazı A'lar B'dir' cümlesi en az bir A'nın B olduğunu söyler; geri kalan A'ların B olmadığını söylemez. Bu yüzden 'bazı A'lar B değildir' sonucu, yalnızca 'bazı A'lar B'dir' bilgisinden çıkarılamaz.",
      ],
      ul: [
        "Öncülleri kümeler olarak hayal edin: 'tüm A'lar B'dir' iç içe iki daire, 'hiçbir B, C değildir' birbirine değmeyen iki dairedir.",
        "Her seçenek için kendinize şunu sorun: bu ifadenin yanlış olduğu, ama öncüllerin doğru kaldığı bir durum çizebilir miyim? Çizebiliyorsanız o seçenek kesin değildir.",
      ],
    },
    {
      h: 'Sıralama soruları ve çözümlü örnek',
      p: [
        "Sıralama sorularında üç ya da dört kişi hakkında 'şu kişi, bu kişiden uzundur' biçiminde karşılaştırmalar verilir. Cümleler karışık sıradadır. Sizden en uzun, en kısa ya da uzundan kısaya ikinci sıradaki kişi istenir.",
        "Örnek: 'Cem, Ece'den uzundur. Ece, Kaan'dan uzundur. Banu, Cem'den uzundur.' Cümleleri zincir hâline getirelim. Banu Cem'den, Cem Ece'den, Ece de Kaan'dan uzundur; sıra Banu, Cem, Ece, Kaan olur. En uzun kişi Banu, en kısa kişi Kaan, uzundan kısaya ikinci kişi ise <strong>Cem</strong> olur.",
        "Pratik yöntem şudur: hiçbir cümlede 'kimden uzun' tarafında yer almayan, yani kendisinden uzun biri söylenmeyen kişiyi bulun; o en uzundur. Sonra onun kimden uzun olduğuna bakıp zinciri adım adım uzatın. Dört kişilik sorularda adların baş harflerini kâğıda büyükten küçüğe yazmak hatayı neredeyse sıfıra indirir.",
        "Dikkat edilecek nokta soru kökündedir: 'en uzundan sonra gelen ikinci kişi' sorulduğunda en kısayı ya da en uzunu işaretlemek sık yapılan bir okuma hatasıdır.",
      ],
    },
    {
      h: 'Sonuç ekranında neler var?',
      p: [
        "Test bittiğinde 15 üzerinden doğru sayınız, yanlış ve boş sayıları, başarı yüzdeniz ve yalnızca bu soru setine ait bir düzey etiketi gösterilir. Bütün sorular Mantık başlığında olduğundan tür dökümü tek satırdır.",
        "Cevap anahtarında her soru öncülleriyle birlikte yeniden yazılır. Çıkarım sorularında hangi sonucun zorunlu olduğu, sıralama sorularında ise uzundan kısaya tam sıra verilir. Yanlış yaptığınız soruda açıklamadaki sırayı öncüllerden kendiniz yeniden kurmayı deneyin; hatanın okuma mı yoksa akıl yürütme mi kaynaklı olduğunu böylece ayırt edersiniz.",
        "<strong>Yeni sorularla tekrar çöz</strong> düğmesi yeni adlar, yeni uydurma sözcükler ve yeni kalıplarla bir set daha üretir. Sorular her seferinde yeniden kurulduğu için cevapları ezberlemek mümkün değildir; öğrenilen şey çözüm yöntemidir.",
      ],
    },
    {
      h: 'Bu test neyi ölçmez?',
      p: [
        "Mantık testi eğlence ve alıştırma amaçlıdır. Sonuç bir IQ puanı değildir ve site herhangi bir IQ sayısı vermez. IQ ölçümü, norm çalışması yapılmış testlerle ve uzman gözetiminde yapılır; ayrıca tek bir soru türü, zihinsel becerilerin yalnızca küçük bir bölümüne dokunur.",
        "Buradaki sonuç okuma hızınızdan, Türkçe cümle yapısına aşinalığınızdan ve o anki dikkatinizden de etkilenir. Bu nedenle tanı, okul yerleştirme, işe alım ya da bir kişinin yeteneği hakkında hüküm vermek için kullanılmamalıdır. Bir sınava hazırlanıyorsanız bu sorular çıkarım alışkanlığı kazandırabilir, ancak herhangi bir sınavın soru biçimini ya da puanını temsil etmez.",
      ],
    },
    {
      h: 'Süre yönetimi ve pratikle gelişme',
      ul: [
        "On beş soru için 15 dakikanız var: soru başına bir dakika. Üç kişilik sıralama soruları yarım dakikada çözülebilir; artan süreyi 'bazı' ve 'hiçbir' içeren çıkarımlara ayırın.",
        "Öncülleri bir kez yavaş okumak, iki kez hızlı okumaktan daha az zaman alır.",
        "Uydurma sözcükleri A, B ve C harfleriyle değiştirin; cümleler kısalır ve yapı daha net görünür.",
        "Seçenekleri okurken önce öncüllerle açıkça çelişenleri eleyin; geriye kalan iki üç seçenek arasında kesin olanı aramak kolaylaşır.",
        "Bu kalıplar az sayıdadır ve hızla öğrenilir. Birkaç deneme sonra sonucunuzun yükselmesi olağandır; bu alıştırma etkisidir ve kalıpları tanımanızdan kaynaklanır.",
        "Öğrendiğiniz yöntemi gündelik okumalara taşıyın: bir haberde ya da tartışmada 'bu sonuç verilen bilgiden gerçekten çıkıyor mu?' diye sormak aynı becerinin gerçek hayattaki karşılığıdır.",
      ],
    },
  ],
  faq: [
    ['Mantık testi sonucunda IQ puanı verilir mi?', "Hayır. Test yalnızca 15 sorudaki doğru sayınızı ve başarı yüzdenizi gösterir. IQ puanı, norm çalışması yapılmış testlerle ve uzman gözetiminde ölçülür."],
    ['Sorulardaki sözcükler neden anlamsız?', "Sözcükler bilerek uydurulmuştur. Böylece konu hakkındaki bilginiz ya da önyargınız cevabı etkilemez; yalnızca öncüllerin yapısına göre düşünürsünüz."],
    ['Kesinlikle doğru ne demek?', "Öncüller doğru kabul edildiğinde başka türlüsü mümkün olmayan sonuç demektir. Doğru olabilecek ama öncüllerden zorunlu olarak çıkmayan ifadeler yanlış seçenek sayılır."],
    ['Bazı sözcüğü mantıkta nasıl anlaşılır?', "En az bir tane anlamına gelir. 'Bazı A'lar B'dir' cümlesi, geri kalan A'ların B olmadığını söylemez; bu konuda bilgi vermez."],
    ['Sıralama sorularında kaç kişi var?', "Kolay sorularda üç, diğerlerinde üç ya da dört kişi bulunur. En uzun, en kısa ya da uzundan kısaya ikinci sıradaki kişi sorulur."],
    ['Kâğıt kalem kullanabilir miyim?', "Evet, hatta önerilir. Sıralama sorularında adları büyükten küçüğe yazmak, çıkarım sorularında kümeleri daire olarak çizmek hatayı azaltır."],
    ['Sorular her denemede değişiyor mu?', "Evet. Adlar, uydurma sözcükler, kalıplar ve seçeneklerin sırası her seferinde yeniden üretilir. Aynı seti tekrar çözmek isterseniz sonuç ekranındaki 'Aynı soruları yeniden çöz' düğmesini kullanın."],
    ['Yanlış cevap puan götürür mü?', "Hayır. Yalnızca doğru cevaplar sayılır. Süre bitmeden boş kalan sorulara en makul seçeneği işaretlemenizde bir sakınca yoktur."],
    ['Cevaplarım kaydediliyor mu?', "Hayır. Sorular tarayıcınızda üretilir; cevaplar ve sonuç hiçbir yere gönderilmez, kayıt istenmez. Sayfayı kapattığınızda sonuç kaybolur."],
  ],
  related: ['iq-testi', 'hizli-iq-testi', 'sozel-zeka-testi', 'benzetme-testi', 'farkli-olani-bul-testi', 'olasilik-hesapla'],
};
