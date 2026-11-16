export default {
  slug: "sezar-sifreleme-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Sezar Şifrelemesi Nedir? Sezar, Vigenère ve ROT13 Nasıl Çözülür",
  pageTitle: "Sezar Şifrelemesi Nedir? Vigenère, ROT13 ve Atbaş Örnekleri",
  description: "Sezar şifrelemesi her harfi alfabede sabit sayıda kaydıran tarihî bir yöntemdir. Türkçe alfabede örnekler, Vigenère, ROT13, Atbaş ve neden artık güvenli olmadığı.",
  keywords: ["sezar şifreleme nedir", "sezar şifresi çözme", "vigenere şifreleme", "rot13 nedir", "atbaş şifreleme", "klasik şifreleme yöntemleri", "şifreli mesaj yazma", "frekans analizi"],
  lead: "Sezar şifrelemesi, bir metindeki her harfi alfabede <strong>sabit sayıda ileri kaydırarak</strong> başka bir harfle değiştiren, Roma döneminden kalma bir yer değiştirme şifresidir; Jül Sezar'ın 3 harf kaydırma kullandığı aktarılır. Bugün yalnızca tarihî ve eğitsel değeri vardır: Türkçe alfabede yalnızca 28 farklı anahtar olduğu için her şifreli metin birkaç saniyede çözülür. Bu sayfada Sezar, Vigenère, ROT13 ve Atbaş yöntemlerinin nasıl çalıştığını, Türkçe harflerle nasıl uygulandığını, frekans analiziyle nasıl kırıldıklarını ve gerçek gizlilik için neden modern şifreleme gerektiğini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Sezar şifresinde her harf alfabede k adım ileri kaydırılır; çözmek için aynı sayıda geri kaydırılır.",
    "29 harfli Türk alfabesinde 3 kaydırmayla MERHABA, ÖĞTJÇDÇ olur.",
    "Vigenère her harf için anahtar kelimedeki farklı bir kaydırmayı kullanır; bu yüzden Sezar'dan çok daha zor kırılır.",
    "ROT13, 26 harfli İngiliz alfabesinde 13 kaydırmadır; iki kez uygulanınca metin eski hâline döner.",
    "Atbaş alfabeyi ters çevirir: ilk harf son harfle, ikinci harf sondan ikinciyle yer değiştirir.",
    "Bu yöntemlerin hiçbiri bugün güvenli değildir; parola, kişisel veri ve gizli yazışma için modern, standartlaşmış şifreleme kullanılmalıdır."
  ],
  figure: {
    alt: "Türk alfabesinde Sezar şifresi: üst sırada A'dan Z'ye 29 harf, alt sırada 3 adım kaydırılmış harfler; örnek MERHABA kelimesinin ÖĞTJÇDÇ'ye dönüşmesi ve 28 anahtarın tamamının denenebilmesi.",
    caption: "Kaydırma 3 olduğunda A→Ç, M→Ö, Z→C olur; alfabenin sonu başa sarar. Saldırgan için yalnızca 28 olasılık vardır, bu yüzden Sezar şifresi bugün bir bilmece olarak değerlidir, güvenlik aracı olarak değil.",
    svg: `<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
  <text x="370" y="30" class="lg b mid">Sezar şifresi, kaydırma = 3 (Türk alfabesi)</text>
  <g class="sm mid b">
    <text x="30" y="70">A</text><text x="54" y="70">B</text><text x="78" y="70">C</text><text x="102" y="70">Ç</text><text x="126" y="70">D</text><text x="150" y="70">E</text><text x="174" y="70">F</text><text x="198" y="70">G</text><text x="222" y="70">Ğ</text><text x="246" y="70">H</text><text x="270" y="70">I</text><text x="294" y="70">İ</text><text x="318" y="70">J</text><text x="342" y="70">K</text><text x="366" y="70">L</text><text x="390" y="70" class="p">M</text><text x="414" y="70">N</text><text x="438" y="70">O</text><text x="462" y="70">Ö</text><text x="486" y="70">P</text><text x="510" y="70">R</text><text x="534" y="70">S</text><text x="558" y="70">Ş</text><text x="582" y="70">T</text><text x="606" y="70">U</text><text x="630" y="70">Ü</text><text x="654" y="70">V</text><text x="678" y="70">Y</text><text x="702" y="70">Z</text>
  </g>
  <rect x="18" y="84" width="700" height="34" rx="6" class="ps"/>
  <g class="sm mid b">
    <text x="30" y="106">Ç</text><text x="54" y="106">D</text><text x="78" y="106">E</text><text x="102" y="106">F</text><text x="126" y="106">G</text><text x="150" y="106">Ğ</text><text x="174" y="106">H</text><text x="198" y="106">I</text><text x="222" y="106">İ</text><text x="246" y="106">J</text><text x="270" y="106">K</text><text x="294" y="106">L</text><text x="318" y="106">M</text><text x="342" y="106">N</text><text x="366" y="106">O</text><text x="390" y="106" class="p">Ö</text><text x="414" y="106">P</text><text x="438" y="106">R</text><text x="462" y="106">S</text><text x="486" y="106">Ş</text><text x="510" y="106">T</text><text x="534" y="106">U</text><text x="558" y="106">Ü</text><text x="582" y="106">V</text><text x="606" y="106">Y</text><text x="630" y="106">Z</text><text x="654" y="106">A</text><text x="678" y="106">B</text><text x="702" y="106">C</text>
  </g>
  <text x="18" y="140" class="sm mu">üst sıra: açık metin · alt sıra: şifreli metin · Z'den sonra A'ya sarar</text>
  <rect x="18" y="160" width="330" height="96" rx="10" class="sf sb"/>
  <text x="34" y="186" class="sm mu">Açık metin</text>
  <text x="34" y="222" class="xl">MERHABA</text>
  <text x="34" y="244" class="sm t2">M+3 = Ö · E+3 = Ğ · R+3 = T</text>
  <polygon points="362,200 392,208 362,216" class="p"/>
  <line x1="352" y1="208" x2="366" y2="208" class="sp sw" fill="none"/>
  <rect x="404" y="160" width="314" height="96" rx="10" class="p"/>
  <text x="420" y="186" class="sm sf">Şifreli metin</text>
  <text x="420" y="222" class="xl sf">ÖĞTJÇDÇ</text>
  <text x="420" y="244" class="sm sf">çözmek için her harfi 3 geri al</text>
  <text x="18" y="292" class="b">Kaba kuvvet: kaç anahtar denemek gerekir?</text>
  <rect x="18" y="306" width="62" height="28" rx="4" class="dgs"/><text x="88" y="326" class="sm">Sezar (Türkçe): 28 anahtar, saniyeler</text>
  <rect x="18" y="344" width="230" height="28" rx="4" class="oks"/><text x="256" y="364" class="sm">Vigenère, 4 harfli anahtar: 29⁴ = 707.281 olasılık</text>
  <text x="18" y="392" class="sm t2">Modern şifrelemede anahtar uzayı 2¹²⁸ ve üzeridir; bu ölçekte çizilemez.</text>
</svg>`
  },
  sections: [
    {
      h: "Sezar şifrelemesi nedir, nereden gelir?",
      p: [
        "Sezar şifrelemesi, bilinen en eski <strong>yer değiştirme şifrelerinden</strong> biridir. Her harf, alfabede kendisinden belirli sayıda sonra gelen harfle değiştirilir. Romalı tarihçi Suetonius, Jül Sezar'ın askerî yazışmalarında harfleri 3 adım kaydırdığını, Augustus'un ise 1 adım kaydırmayı tercih ettiğini yazar. Yöntemin adı buradan gelir.",
        "O dönemde okuma yazma bilenlerin azlığı ve şifre kavramının yaygın olmaması, bu basit yöntemi bile işe yarar kılıyordu. Bugün ise Sezar şifresi bilişim teknolojileri derslerinde, kriptografiye giriş kitaplarında, kaçış odası bulmacalarında ve çocuklara mantık öğretmede kullanılır. Kriptografinin temel kavramlarını, yani açık metin, şifreli metin, anahtar ve algoritma ayrımını göstermek için mükemmel bir başlangıç örneğidir."
      ]
    },
    {
      h: "Sezar şifresi nasıl çalışır? Formül",
      p: [
        "Alfabedeki harflere sırayla numara verilir. Türk alfabesinde A = 0, B = 1, C = 2, Ç = 3 diye başlar ve Z = 28 ile biter. Şifrelemek için harfin numarasına anahtar (k) eklenir; sonuç alfabe uzunluğunu aşarsa başa sarılır. Bu \"başa sarma\" işlemi matematikte mod alma ile yapılır; konuyu [[bilgi:bolunebilme-kurallari|bölünebilme ve kalan]] yazısında da bulabilirsiniz."
      ],
      formula: "Şifreleme: C = (P + k) mod n\nÇözme: P = (C − k) mod n\nn = alfabedeki harf sayısı (Türkçe 29, İngilizce 26)",
      ol: [
        "Anahtarı belirleyin: k = 3.",
        "\"MERHABA\" kelimesinin ilk harfi M'nin numarası 15'tir; 15 + 3 = 18, 18 numara Ö'dür.",
        "E (5) + 3 = 8 → Ğ; R (20) + 3 = 23 → T; H (9) + 3 = 12 → J; A (0) + 3 = 3 → Ç; B (1) + 3 = 4 → D.",
        "Sonuç: MERHABA → <strong>ÖĞTJÇDÇ</strong>. Boşluk ve noktalama işaretleri genellikle olduğu gibi bırakılır.",
        "Başa sarma örneği: Z (28) + 3 = 31; 31 mod 29 = 2, yani Z → C olur."
      ],
      after: [
        "Çözmek için aynı işlemi tersine yaparsınız: Ö (18) − 3 = 15 → M. Bu işlemi elle yapmak yerine [[arac:sezar-sifreleme|Sezar Şifreleme]] aracında metni yazıp kaydırma değerini seçmeniz yeterlidir; araç hem 29 harfli Türk hem 26 harfli İngiliz alfabesini destekler."
      ]
    },
    {
      h: "Türkçe alfabede kaydırma nasıl yapılır?",
      p: [
        "Türkçe metni İngiliz alfabesiyle şifrelemeye çalışmak en sık yapılan hatadır. İngiliz alfabesinde Ç, Ğ, I (noktasız), Ö, Ş, Ü harfleri yoktur; Q, W, X ise Türk alfabesinde bulunmaz. Bu yüzden aynı anahtarla aynı kelime iki alfabede farklı sonuç verir. \"ÇAY\" kelimesi Türk alfabesinde 3 kaydırmayla <strong>FÇB</strong> olur; İngiliz alfabesinde ise Ç harfi tanınmadığı için şifrelenmeden kalır.",
        "Bir diğer incelik büyük-küçük harf dönüşümüdür. Türkçede küçük i'nin büyüğü İ, küçük ı'nın büyüğü I'dır. Pek çok yazılım bu ayrımı bilmediği için \"ışık\" kelimesini büyütürken yanlış harf üretebilir. Şifreleme yaparken metni önce doğru biçimde büyük harfe çevirmek ve hangi alfabeyi kullandığınızı karşı tarafa söylemek gerekir. Türk alfabesinin harf sırası ve sayısıyla ilgili ayrıntılar [[bilgi:turk-alfabesi-kac-harf|Türk alfabesi kaç harf]] yazısındadır."
      ],
      table: {
        head: ["Açık metin", "Alfabe", "Anahtar", "Şifreli metin"],
        rows: [
          ["MERHABA DÜNYA", "Türkçe (29)", "3", "ÖĞTJÇDÇ GZPBÇ"],
          ["ŞİFRE", "Türkçe (29)", "3", "ÜLHTĞ"],
          ["ÇAY", "Türkçe (29)", "3", "FÇB"],
          ["HELLO WORLD", "İngilizce (26)", "3", "KHOOR ZRUOG"],
          ["HELLO", "İngilizce (26)", "13 (ROT13)", "URYYB"]
        ]
      }
    },
    {
      h: "Sezar şifresi nasıl çözülür? Kaba kuvvet ve frekans analizi",
      p: [
        "Anahtarı bilmeseniz de Sezar şifresini çözmek çok kolaydır, çünkü yalnızca alfabe uzunluğunun bir eksiği kadar olası anahtar vardır: Türkçede 28, İngilizcede 25. Bütün kaydırmaları sırayla deneyip anlamlı metni veren satırı seçmek, yani <strong>kaba kuvvet</strong> saldırısı, kalemle kâğıtla bile birkaç dakika sürer. Sezar aracındaki \"tüm kaydırmaları dene\" seçeneği bunu tek tıkla gösterir.",
        "İkinci yöntem <strong>frekans analizidir</strong>. Her dilde bazı harfler diğerlerinden çok daha sık kullanılır. Türkçede a, e, i, n, r ve l harfleri metinlerde en sık görülenlerdir; İngilizcede ise e, t ve a öne çıkar. Sezar şifresinde her harf aynı miktarda kaydığı için bu sıklık deseni bozulmaz, yalnızca yer değiştirir. Şifreli metinde en sık geçen harf Ç ise, büyük olasılıkla A'nın 3 kaydırılmış hâlidir.",
        "Frekans analizini ilk kez sistemli biçimde anlatan kişi, 9. yüzyılda yaşamış Arap bilgin el-Kindî'dir. Bu yöntem yalnızca Sezar'ı değil, harflerin rastgele karıştırıldığı tek alfabeli yer değiştirme şifrelerini de kırar. Uzun metinlerde sonuç neredeyse kesindir; çok kısa metinlerde ise istatistik yanıltabilir."
      ],
      after: [
        "Bir metindeki harf sıklıklarını görmek için [[arac:harf-frekansi|Harf Frekansı Analizi]] aracına şifreli metni yapıştırın. Araç Türkçedeki I-ı ve İ-i ayrımına uygun sayar ve en sık geçen harfleri yüzdeleriyle listeler."
      ]
    },
    {
      h: "Vigenère şifresi Sezar'dan nasıl farklıdır?",
      p: [
        "Vigenère şifresi, 16. yüzyılda geliştirilen ve uzun süre \"kırılamaz şifre\" olarak anılan <strong>çok alfabeli</strong> bir yöntemdir. Tek bir kaydırma yerine bir anahtar kelime kullanılır; anahtar kelimenin her harfi bir kaydırma miktarını gösterir ve metin boyunca tekrar edilir. Böylece aynı harf metnin farklı yerlerinde farklı harflere dönüşür ve basit frekans analizi işe yaramaz."
      ],
      formula: "Cᵢ = (Pᵢ + Kᵢ) mod n\nKᵢ = anahtar kelimenin (i mod anahtar uzunluğu). harfinin numarası",
      ol: [
        "Açık metin: SALDIRI SABAHTA. Anahtar: KALE (K = 13, A = 0, L = 14, E = 5).",
        "Anahtarı harflerin altına tekrar ederek yazın: KALEKAL EKALEKA (boşluklar atlanır).",
        "İlk harf: S (21) + K (13) = 34; 34 mod 29 = 5 → E.",
        "İkinci harf: A (0) + A (0) = 0 → A. Üçüncü harf: L (14) + L (14) = 28 → Z. Dördüncü harf: D (4) + E (5) = 9 → H.",
        "Tamamı: SALDIRI SABAHTA → <strong>EAZHTRU VKBLLGA</strong>. Açık metindeki üç A harfinin şifrede A, U ve B gibi farklı harflere dönüştüğüne dikkat edin."
      ],
      after: [
        "Vigenère de bugün güvenli değildir. 19. yüzyılda Charles Babbage ve Friedrich Kasiski, şifreli metindeki tekrar eden harf gruplarının arasındaki mesafeden anahtar uzunluğunu bulmanın yolunu gösterdi. Anahtar uzunluğu bilinince metin, her biri ayrı bir Sezar şifresi olan sütunlara bölünür ve her sütun frekans analiziyle çözülür. Denemek için [[arac:vigenere-sifreleme|Vigenère Şifreleme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "ROT13 ne işe yarar?",
      p: [
        "ROT13 (\"13 döndür\"), 26 harfli İngiliz alfabesinde kaydırmanın 13 olduğu Sezar şifresidir. 13, alfabenin tam yarısı olduğu için aynı işlemi iki kez uygulamak metni eski hâline getirir: HELLO → URYYB → HELLO. Ayrı bir çözme işlemine gerek kalmaz.",
        "ROT13'ün amacı hiçbir zaman gizlilik olmamıştır. İnternetin ilk tartışma gruplarında film ve kitap sonlarını, bulmaca cevaplarını ya da rahatsız edici olabilecek şakaları \"göz ucuyla okunmasın\" diye gizlemek için kullanıldı. Okumak isteyen kişi bilerek ROT13'ü uygular. Bugün de bazı forumlarda ve programlama örneklerinde aynı amaçla görülür.",
        "Türkçe metinde ROT13 kullanırsanız Ç, Ğ, İ gibi harfler değişmeden kalır ve metnin bir kısmı okunur durumda kalır. 29 harfli alfabede tam yarı olmadığı için iki kez uygulanınca kendini geri çeviren bir Türkçe ROT karşılığı yoktur. [[arac:rot13-cevir|ROT13 Çevirici]] bu yüzden İngiliz alfabesiyle çalışır."
      ]
    },
    {
      h: "Atbaş şifrelemesi nasıl çalışır?",
      p: [
        "Atbaş (Atbash), alfabeyi ters çevirerek uygulanan bir yer değiştirme şifresidir: ilk harf son harfle, ikinci harf sondan ikinci harfle eşleşir. Adı, İbrani alfabesinin ilk ve son harfleri olan Alef-Tav ile ikinci ve sondan ikinci harfleri Bet-Şin'den gelir. Bazı eski metinlerde kullanıldığı bilinen çok eski bir yöntemdir.",
        "Türk alfabesinde A ↔ Z, B ↔ Y, C ↔ V, Ç ↔ Ü eşleşir; ortadaki harf olan L ise kendisine dönüşür. Bu kuralla MERHABA → <strong>KTĞPZYZ</strong> olur. İngiliz alfabesinde ise A ↔ Z, B ↔ Y eşleşir ve HELLO → SVOOL olur. Atbaş'ın anahtarı yoktur; yöntemi bilen herkes metni anında çözer ve ROT13 gibi iki kez uygulanınca metin eski hâline döner. [[arac:atbash-sifreleme|Atbaş Şifreleme]] aracı iki alfabeyle de çalışır."
      ]
    },
    {
      h: "Klasik şifreler karşılaştırması",
      table: {
        head: ["Yöntem", "Anahtar", "Olası anahtar sayısı", "Nasıl kırılır"],
        rows: [
          ["Sezar", "Tek sayı (kaydırma)", "Türkçe 28, İngilizce 25", "Tüm kaydırmaları denemek, frekans analizi"],
          ["ROT13", "Sabit 13", "1 (anahtar yok)", "Yöntemi bilmek yeterli"],
          ["Atbaş", "Yok", "1 (anahtar yok)", "Yöntemi bilmek yeterli"],
          ["Karışık alfabe", "Harflerin rastgele sırası", "Çok büyük", "Frekans analizi, sık kelimeler"],
          ["Vigenère", "Anahtar kelime", "Anahtar uzunluğuna göre katlanır", "Kasiski yöntemi, sütun sütun frekans analizi"]
        ],
        caption: "Olası anahtar sayısının çok büyük olması tek başına güvenlik sağlamaz: karışık alfabede anahtar sayısı astronomiktir ama dilin istatistiği metni yine ele verir."
      }
    },
    {
      h: "Klasik şifreler bugün güvenli mi?",
      p: [
        "Hayır. Sezar, ROT13, Atbaş ve Vigenère dahil bütün klasik kalem-kâğıt şifreleri bugün <strong>güvenli kabul edilmez</strong>; parola, banka bilgisi, kişisel veri ya da gizli yazışma için asla kullanılmamalıdır. Sıradan bir bilgisayar Sezar'ın bütün anahtarlarını bir saniyeden kısa sürede dener, Vigenère'i de birkaç saniyede çözer.",
        "Günümüzde gizlilik, matematiksel olarak incelenmiş ve uluslararası standart hâline gelmiş algoritmalarla sağlanır. Örneğin yaygın simetrik şifreleme standardı AES, 128 bit ve üzeri anahtar kullanır; 2¹²⁸ olasılığı tek tek denemek bugünkü bütün bilgisayarlarla bile pratikte mümkün değildir. Mesajlaşma uygulamalarında, internet bankacılığında ve HTTPS bağlantılarında bu tür modern yöntemler kullanılır. Kendi şifreleme yönteminizi icat etmek yerine güvenilir, denetlenmiş kütüphanelere ve işletim sisteminin sunduğu araçlara güvenmek gerekir.",
        "Şifreleme ile kodlama ve özetleme de karıştırılmamalıdır. Base64 bir kodlamadır ve anahtar olmadan herkes geri çevirebilir; [[bilgi:base64-nedir-ne-ise-yarar|Base64 nedir]] yazısında farkı görebilirsiniz. Özet (hash) işlevleri ise tek yönlüdür; parolaların saklanmasında kullanılırlar ve ayrıntısı [[bilgi:hash-nedir-sha256-md5|hash nedir]] yazısındadır."
      ],
      note: "Bu sayfadaki yöntemler tarihî ve eğitsel amaçla anlatılmıştır. Gerçek bilgileri korumak için kullanmayın; başkasına ait şifreli verileri izinsiz çözmeye çalışmak da hukuka aykırı olabilir."
    },
    {
      h: "Sık yapılan hatalar ve pratik ipuçları",
      ul: [
        "<strong>Alfabeyi belirtmemek:</strong> Türkçe ve İngilizce alfabelerle aynı anahtar farklı sonuç verir; mesajı alana hangi alfabeyi kullandığınızı söyleyin.",
        "<strong>Büyük-küçük harf dönüşümü:</strong> i ve ı harflerinin büyük hâllerini yanlış çevirmek, çözülen metinde anlamsız harflere yol açar.",
        "<strong>Boşlukları şifrelemek ya da atlamak konusunda anlaşmamak:</strong> Vigenère'de anahtarın boşluklarda ilerleyip ilerlemediği sonucu değiştirir.",
        "<strong>Kısa anahtar seçmek:</strong> Vigenère'de tek harfli anahtar, yöntemi Sezar'a indirger.",
        "<strong>Gizlilik beklemek:</strong> Bu yöntemleri bulmaca, oyun ve eğitim için kullanın; gerçek sırları korumak için değil."
      ]
    }
  ],
  faq: [
    ["Sezar şifrelemesi nedir?", "Sezar şifrelemesi, her harfi alfabede sabit sayıda ileri kaydırarak başka bir harfle değiştiren klasik bir yer değiştirme şifresidir. Adını, yazışmalarında 3 harf kaydırma kullandığı aktarılan Jül Sezar'dan alır ve bugün eğitsel amaçla kullanılır."],
    ["Sezar şifresi nasıl çözülür?", "Anahtar biliniyorsa her harf aynı sayıda geri kaydırılır. Anahtar bilinmiyorsa Türkçede 28 olası kaydırmanın hepsi denenir ya da şifreli metindeki en sık harf bulunarak frekans analiziyle kaydırma miktarı tahmin edilir."],
    ["Türkçe alfabede kaydırma nasıl yapılır?", "Ç, Ğ, I, İ, Ö, Ş ve Ü dahil 29 harf sırayla numaralandırılır ve kaydırma bu sıraya göre yapılır. Z harfinden sonra A'ya dönülür; örneğin 3 kaydırmada Z harfi C olur, MERHABA da ÖĞTJÇDÇ'ye dönüşür."],
    ["Vigenère şifresi Sezar'dan nasıl farklıdır?", "Sezar'da tüm harfler aynı miktarda kayarken Vigenère'de her harf anahtar kelimedeki sıradaki harfe göre farklı miktarda kayar. Bu yüzden aynı harf metinde farklı şekillerde görünür ve basit frekans analizi tek başına yetmez."],
    ["ROT13 ne işe yarar?", "ROT13, İngiliz alfabesinde 13 harf kaydırmadır ve iki kez uygulanınca metni geri getirir. Gizlilik için değil, film sonları ya da bulmaca cevapları gibi metinlerin kazara okunmasını önlemek için kullanılır."],
    ["Atbaş şifrelemesi nasıl çalışır?", "Atbaş alfabeyi ters çevirir; ilk harf son harfle, ikinci harf sondan ikinci harfle eşleşir. Türk alfabesinde A ile Z, B ile Y yer değiştirir; anahtarı olmadığı için yöntemi bilen herkes metni hemen çözer."],
    ["Frekans analizi ile şifre nasıl kırılır?", "Her dilde bazı harfler daha sık geçer; Türkçede a, e, i, n gibi. Şifreli metinde harflerin kaç kez geçtiği sayılır ve en sık harflerin hangi açık harflere karşılık geldiği tahmin edilerek şifrenin anahtarı bulunur."],
    ["Klasik şifreler bugün güvenli mi?", "Hayır, Sezar, ROT13, Atbaş ve Vigenère gibi klasik şifreler bilgisayarla saniyeler içinde çözülür. Parola, kişisel veri ve gizli yazışmalar için yalnızca modern, standartlaşmış ve denetlenmiş şifreleme yöntemleri kullanılmalıdır."],
    ["Sezar şifresinde kaç farklı anahtar vardır?", "Alfabedeki harf sayısının bir eksiği kadar anlamlı anahtar vardır; 29 harfli Türk alfabesinde 28, 26 harfli İngiliz alfabesinde 25. Sıfır kaydırma metni değiştirmediği ve alfabe uzunluğu kadar kaydırma başa döndüğü için sayılmaz."]
  ],
  tools: ["sezar-sifreleme", "vigenere-sifreleme", "rot13-cevir", "atbash-sifreleme", "harf-frekansi"],
  related: ["hash-nedir-sha256-md5", "base64-nedir-ne-ise-yarar", "turk-alfabesi-kac-harf"],
  sources: [
    ["NIST – Kriptografi standartları ve kılavuzları", "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines"],
    ["TDK – Türk alfabesi", "https://tdk.gov.tr/"]
  ]
};
