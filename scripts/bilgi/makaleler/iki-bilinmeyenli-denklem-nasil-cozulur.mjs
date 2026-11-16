export default {
  slug: "iki-bilinmeyenli-denklem-nasil-cozulur",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "İki Bilinmeyenli Denklem Nasıl Çözülür? Yok Etme, Yerine Koyma ve Grafik",
  pageTitle: "İki Bilinmeyenli Denklem Çözme: Yok Etme ve Yerine Koyma",
  description: "İki bilinmeyenli denklem sistemi yok etme, yerine koyma, grafik ya da Cramer kuralıyla çözülür. Çözümsüz ve sonsuz çözüm durumu, üç bilinmeyenli ve matris örneği.",
  keywords: ["iki bilinmeyenli denklem çözme", "denklem sistemi çözümü", "yok etme yöntemi", "yerine koyma yöntemi", "üç bilinmeyenli denklem", "doğrusal denklem sistemi", "matris ile denklem çözme", "cramer kuralı", "8. sınıf denklem sistemleri"],
  lead: "İki bilinmeyenli bir denklem sistemi, denklemlerden biri ya da ikisi uygun sayılarla çarpılıp taraf tarafa toplanarak bir bilinmeyeni yok etmek (<strong>yok etme</strong>) ya da bir denklemden bilinmeyenlerden birini çekip diğerine yazmak (<strong>yerine koyma</strong>) yoluyla çözülür. Örneğin 2x + 3y = 12 ve x − y = 1 sisteminin çözümü <strong>x = 3, y = 2</strong>'dir. Bu sayfada iki yöntemi adım adım, grafikle çözümü, çözümsüz ve sonsuz çözümlü sistemleri, Cramer kuralını, üç bilinmeyenli sistemleri ve matris yöntemini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Doğrusal bir sistemi çözmek için en az bilinmeyen sayısı kadar bağımsız denklem gerekir: iki bilinmeyene iki denklem.",
    "Yok etmede katsayılar eşitlenip denklemler toplanır ya da çıkarılır; bir bilinmeyen düşer.",
    "Yerine koymada bir denklemden x ya da y yalnız bırakılır ve diğer denklemde yerine yazılır.",
    "Grafikte her denklem bir doğrudur; kesişim noktası (3, 2) sistemin çözümüdür.",
    "Doğrular paralelse çözüm yoktur, çakışıksa sonsuz çözüm vardır; bunu katsayı oranları gösterir.",
    "Cramer kuralında x = D<sub>x</sub> ÷ D, y = D<sub>y</sub> ÷ D; D = 0 ise tek çözüm yoktur."
  ],
  figure: {
    alt: "Koordinat düzleminde 2x + 3y = 12 ve x − y = 1 doğruları (3, 2) noktasında kesişiyor. Sağda üç durum kartı: kesişen doğrular tek çözüm, paralel doğrular çözüm yok, çakışık doğrular sonsuz çözüm.",
    caption: "Denklem sisteminin çözümü, iki doğrunun ortak noktasıdır. Doğruların eğimi aynıysa ya kesişmezler (çözüm yok) ya da üst üste düşerler (sonsuz çözüm).",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="210" y="30" class="lg b mid">Grafikle çözüm</text>
  <g class="sb" fill="none">
    <line x1="120" y1="90" x2="120" y2="330"/><line x1="160" y1="90" x2="160" y2="330"/><line x1="200" y1="90" x2="200" y2="330"/>
    <line x1="240" y1="90" x2="240" y2="330"/><line x1="280" y1="90" x2="280" y2="330"/><line x1="320" y1="90" x2="320" y2="330"/>
    <line x1="80" y1="290" x2="360" y2="290"/><line x1="80" y1="250" x2="360" y2="250"/><line x1="80" y1="210" x2="360" y2="210"/>
    <line x1="80" y1="170" x2="360" y2="170"/><line x1="80" y1="130" x2="360" y2="130"/>
  </g>
  <line x1="80" y1="330" x2="370" y2="330" class="st sw" fill="none"/>
  <line x1="80" y1="340" x2="80" y2="70" class="st sw" fill="none"/>
  <text x="372" y="346" class="sm">x</text><text x="88" y="74" class="sm">y</text>
  <g class="sm mid mu"><text x="200" y="350">3</text><text x="320" y="350">6</text><text x="68" y="254">2</text><text x="68" y="174">4</text></g>
  <line x1="80" y1="170" x2="320" y2="330" class="sp sw" fill="none"/>
  <line x1="120" y1="330" x2="320" y2="130" class="sa sw" fill="none"/>
  <text x="250" y="304" class="b p">2x + 3y = 12</text>
  <text x="268" y="126" class="b">x − y = 1</text>
  <circle cx="200" cy="250" r="8" class="ok"/>
  <text x="212" y="240" class="b ok">(3, 2)</text>
  <text x="210" y="384" class="sm mid t2">Kesişim noktası: x = 3, y = 2</text>
  <rect x="410" y="60" width="290" height="88" rx="10" class="oks"/>
  <line x1="430" y1="130" x2="500" y2="76" class="sok sw" fill="none"/>
  <line x1="430" y1="80" x2="500" y2="132" class="sok sw" fill="none"/>
  <text x="520" y="96" class="b">Kesişen doğrular</text>
  <text x="520" y="120" class="sm">Tek çözüm · D ≠ 0</text>
  <rect x="410" y="162" width="290" height="88" rx="10" class="dgs"/>
  <line x1="430" y1="232" x2="500" y2="180" class="sdg sw" fill="none"/>
  <line x1="430" y1="214" x2="482" y2="176" class="sdg sw" fill="none"/>
  <text x="520" y="198" class="b">Paralel doğrular</text>
  <text x="520" y="222" class="sm">x + y = 4 · 2x + 2y = 10</text>
  <text x="520" y="242" class="sm dg">Çözüm yok</text>
  <rect x="410" y="264" width="290" height="88" rx="10" class="sf sb"/>
  <line x1="430" y1="334" x2="500" y2="282" class="sp sw" fill="none"/>
  <line x1="430" y1="334" x2="500" y2="282" class="sa dash" fill="none"/>
  <text x="520" y="300" class="b">Çakışık doğrular</text>
  <text x="520" y="324" class="sm">x + y = 4 · 2x + 2y = 8</text>
  <text x="520" y="344" class="sm p">Sonsuz çözüm</text>
</svg>`
  },
  sections: [
    {
      h: "Denklem sistemi nedir?",
      p: [
        "İçinde iki bilinmeyen bulunan tek bir denklemin, örneğin x + y = 5'in, sonsuz sayıda çözümü vardır: (0, 5), (1, 4), (2,5; 2,5)… Bilinmeyenlerin değerini kesin bulmak için ikinci bir bilgi, yani ikinci bir denklem gerekir. Aynı bilinmeyenleri içeren ve birlikte sağlanması gereken denklemlere <strong>denklem sistemi</strong> denir.",
        "Bilinmeyenlerin yalnızca birinci kuvvetini içeren denklemler <strong>doğrusal</strong> (lineer) denklemlerdir; koordinat düzleminde her biri bir doğru belirtir. 8. sınıf matematik programında doğrusal denklem sistemleri işlenir; LGS ve TYT'deki problemlerin önemli bir kısmı \"verilenleri denklemle yaz, sistemi çöz\" mantığına dayanır.",
        "Genel yazımı a<sub>1</sub>x + b<sub>1</sub>y = c<sub>1</sub> ve a<sub>2</sub>x + b<sub>2</sub>y = c<sub>2</sub> biçimindedir. Bu sayfadaki örneklerin çoğunda aynı sistemi kullanacağız: <strong>2x + 3y = 12</strong> ve <strong>x − y = 1</strong>."
      ]
    },
    {
      h: "Yok etme yöntemi nedir? Adım adım",
      p: [
        "Yok etme (eleme) yönteminde amaç, iki denklemi uygun sayılarla çarparak bir bilinmeyenin katsayılarını eşit ya da zıt yapmak ve denklemleri taraf tarafa toplayarak o bilinmeyeni düşürmektir. Katsayılar zaten zıtsa ya da eşitse doğrudan toplama ya da çıkarma yapılır."
      ],
      ol: [
        "Sistemi alt alta yazın: 2x + 3y = 12 ve x − y = 1.",
        "y'yi yok etmek için ikinci denklemi 3 ile çarpın: 3x − 3y = 3. Artık y katsayıları +3 ve −3'tür.",
        "Denklemleri taraf tarafa toplayın: (2x + 3x) + (3y − 3y) = 12 + 3 ⇒ 5x = 15.",
        "x'i bulun: x = 15 ÷ 5 = 3.",
        "x'i denklemlerden birinde yerine yazın: 3 − y = 1 ⇒ y = 2.",
        "Sağlama yapın: 2 × 3 + 3 × 2 = 12 (doğru) ve 3 − 2 = 1 (doğru)."
      ],
      after: [
        "Yok etme yöntemi, katsayıların tam sayı olduğu ve kolayca eşitlenebildiği sistemlerde en hızlı yoldur. Kesirli katsayılarda önce paydaları eşitleyip denklemi tam sayılı hale getirmek hesabı kolaylaştırır; kesirlerle işlemleri [[bilgi:kesirlerle-islemler|kesirlerle işlemler]] sayfasında tekrar edebilirsiniz."
      ]
    },
    {
      h: "Yerine koyma yöntemi nasıl uygulanır?",
      p: [
        "Yerine koyma yönteminde denklemlerden birinde bilinmeyenlerden biri yalnız bırakılır ve bu ifade diğer denklemde o bilinmeyenin yerine yazılır. Sonuçta tek bilinmeyenli bir denklem kalır. Katsayısı 1 ya da −1 olan bir bilinmeyen varsa bu yöntem çok pratiktir."
      ],
      ol: [
        "Katsayısı 1 olan bilinmeyeni seçin: x − y = 1 denkleminden x = y + 1.",
        "Bu ifadeyi diğer denklemde x'in yerine yazın: 2(y + 1) + 3y = 12.",
        "Parantezi açıp düzenleyin: 2y + 2 + 3y = 12 ⇒ 5y = 10 ⇒ y = 2.",
        "Bulduğunuz değeri ilk ifadede yerine koyun: x = 2 + 1 = 3."
      ],
      after: [
        "İki yöntem aynı sonucu verir; seçim yalnızca hangisinin daha az işlem gerektirdiğine bağlıdır. Sınavda zaman kazanmak için katsayılara bakıp karar verin: zıt ya da eşit katsayı varsa yok etme, yalnız duran bir bilinmeyen varsa yerine koyma."
      ]
    },
    {
      h: "Grafikle çözüm nasıl yapılır?",
      p: [
        "Her doğrusal denklem koordinat düzleminde bir doğrudur. Doğruyu çizmek için iki nokta yeter; en kolayı eksenleri kestiği noktalardır. 2x + 3y = 12 için x = 0 iken y = 4, y = 0 iken x = 6 bulunur; doğru (0, 4) ve (6, 0) noktalarından geçer. x − y = 1 için (1, 0) ve (0, −1) noktaları kullanılabilir.",
        "İki doğrunun kesiştiği nokta iki denklemi de sağlar ve sistemin çözümüdür: (3, 2). Grafik yöntemi kesişim noktasının yaklaşık yerini gösterir; kesirli çözümlerde kesin değer için cebirsel yöntem gerekir. Buna karşın çözümün var olup olmadığını görmenin en anlaşılır yoludur.",
        "Denklemi y = mx + n biçimine getirmek, eğimi (m) ve y eksenini kestiği noktayı (n) doğrudan gösterir. 2x + 3y = 12 denklemi y = −(2/3)x + 4, x − y = 1 denklemi y = x − 1 olur. Eğimlerin farklı olması, doğruların mutlaka bir noktada kesiştiğini gösterir. Eğim kavramı için [[bilgi:dogrunun-egimi-nasil-bulunur|doğrunun eğimi]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Denklem sisteminin çözümü yoksa ya da sonsuz çözüm varsa ne anlama gelir?",
      p: [
        "Doğrusal bir sistemin üç olası sonucu vardır: tek çözüm, hiç çözüm yok ya da sonsuz çözüm. Hangisinin olacağını katsayıların oranlarından önceden anlayabilirsiniz."
      ],
      table: {
        head: ["Durum", "Koşul", "Örnek sistem", "Geometrik anlamı"],
        rows: [
          ["Tek çözüm", "a<sub>1</sub>/a<sub>2</sub> ≠ b<sub>1</sub>/b<sub>2</sub>", "2x + 3y = 12, x − y = 1", "Doğrular bir noktada kesişir"],
          ["Çözüm yok", "a<sub>1</sub>/a<sub>2</sub> = b<sub>1</sub>/b<sub>2</sub> ≠ c<sub>1</sub>/c<sub>2</sub>", "x + y = 4, 2x + 2y = 10", "Doğrular paraleldir"],
          ["Sonsuz çözüm", "a<sub>1</sub>/a<sub>2</sub> = b<sub>1</sub>/b<sub>2</sub> = c<sub>1</sub>/c<sub>2</sub>", "x + y = 4, 2x + 2y = 8", "Doğrular çakışıktır"]
        ]
      },
      after: [
        "Cebirsel olarak da bu durumlar kendini belli eder. x + y = 4 ve 2x + 2y = 10 sisteminde ilk denklemi 2 ile çarpıp çıkarırsanız 0 = 2 gibi yanlış bir eşitlik kalır: çözüm yoktur. x + y = 4 ve 2x + 2y = 8 sisteminde ise 0 = 0 kalır: ikinci denklem yeni bilgi vermemektedir ve x + y = 4'ü sağlayan her sayı çifti çözümdür.",
        "Problem sorularında çözüm yok sonucu genellikle verilerde çelişki, sonsuz çözüm ise eksik bilgi olduğunu gösterir."
      ]
    },
    {
      h: "Cramer kuralı ve determinant",
      p: [
        "Determinant yöntemi, katsayılardan hesaplanan sayılarla çözümü doğrudan verir. Önce katsayılar determinantı D bulunur; ardından x için birinci sütun, y için ikinci sütun sabitlerle değiştirilerek D<sub>x</sub> ve D<sub>y</sub> hesaplanır."
      ],
      formula: "D  = a₁ × b₂ − b₁ × a₂\nDₓ = c₁ × b₂ − b₁ × c₂\nDᵧ = a₁ × c₂ − c₁ × a₂\nx = Dₓ ÷ D   ·   y = Dᵧ ÷ D",
      ul: [
        "2x + 3y = 12, x − y = 1 için D = 2 × (−1) − 3 × 1 = −5.",
        "D<sub>x</sub> = 12 × (−1) − 3 × 1 = −15 ⇒ x = −15 ÷ −5 = 3.",
        "D<sub>y</sub> = 2 × 1 − 12 × 1 = −10 ⇒ y = −10 ÷ −5 = 2.",
        "D = 0 ise sistemin tek çözümü yoktur; D<sub>x</sub> ve D<sub>y</sub> de 0 ise sonsuz çözüm, değilse çözümsüzlük vardır."
      ],
      after: [
        "Katsayıları yazarak x, y, determinantlar ve Cramer adımlarını görmek için [[arac:iki-bilinmeyenli-denklem-coz|İki Bilinmeyenli Denklem Çözücü]]yü kullanabilirsiniz; çözümsüz ve sonsuz çözümlü durumları da ayrıca belirtir."
      ]
    },
    {
      h: "Problem kurma: sözel sorudan denkleme",
      p: [
        "Problem sorularında asıl iş, metni denkleme çevirmektir. Önce bilinmeyenlere harf verin, sonra metindeki her bağımsız bilgiyi bir denkleme dönüştürün."
      ],
      ul: [
        "<strong>Kafa-ayak sorusu:</strong> Bir çiftlikte tavuk ve tavşanların toplam 20 başı, 56 ayağı var. Tavuk x, tavşan y olsun: x + y = 20 ve 2x + 4y = 56. İlk denklemi 2 ile çarpıp çıkarınca 2y = 16, y = 8; x = 12. Yani 12 tavuk, 8 tavşan vardır.",
        "<strong>Bilet sorusu:</strong> Tam bilet 150 TL, öğrenci bileti 90 TL (örnek fiyatlar). 30 bilet satılmış ve 3.660 TL gelir elde edilmiş. x + y = 30 ve 150x + 90y = 3.660. İlk denklemi 90 ile çarpıp çıkarınca 60x = 960, x = 16 tam, y = 14 öğrenci bileti bulunur.",
        "<strong>Yaş sorusu:</strong> Annenin yaşı kızının yaşının 3 katıdır; 10 yıl sonra 2 katı olacaktır. a = 3k ve a + 10 = 2(k + 10). Yerine koyunca 3k + 10 = 2k + 20, k = 10, a = 30."
      ],
      after: [
        "Doğru orantı ve oran içeren problemleri denkleme çevirme mantığı için [[bilgi:oran-oranti-nasil-cozulur|oran-orantı]] makalesine de göz atabilirsiniz."
      ]
    },
    {
      h: "Üç bilinmeyenli denklem nasıl çözülür? Matris yöntemi",
      p: [
        "Üç bilinmeyenli sistemlerde aynı fikir iki kez uygulanır: önce iki farklı denklem çiftinden aynı bilinmeyen yok edilir, böylece iki bilinmeyenli bir sisteme inilir. Örnek: x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2."
      ],
      ol: [
        "Birinci ve üçüncü denklemi toplayın, z düşer: 2x + 3y = 8.",
        "İkinci ve üçüncü denklemi toplayın, z yine düşer: 3x + y = 5.",
        "İkinci sonuçtan y = 5 − 3x yazıp ilkinde yerine koyun: 2x + 15 − 9x = 8 ⇒ x = 1, y = 2.",
        "Birinci denklemden z = 6 − 1 − 2 = 3. Çözüm (1, 2, 3); determinant D = 7'dir."
      ],
      after: [
        "Matris yönteminde sistem A × X = B biçiminde yazılır ve X = A<sup>−1</sup> × B ile çözülür. İlk örnek için A = [[2, 3], [1, −1]], B = [12, 1]; det A = −5 ve A<sup>−1</sup> × B = [3, 2] çıkar. Bu yöntem büyük sistemlerde ve bilgisayar hesaplarında standarttır.",
        "Üç denklemli sistemler için [[arac:uc-bilinmeyenli-denklem-coz|Üç Bilinmeyenli Denklem Çözücü]], ters matris ve determinant işlemleri için [[arac:matris-hesapla|Matris Hesaplama]] aracı kullanılabilir. İkinci dereceden denklemlerin çözümü ise farklı bir yöntem gerektirir; bkz. [[bilgi:diskriminant-ikinci-derece-denklem|diskriminant ve ikinci derece denklem]]."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çarpmayı tek tarafa uygulamak:</strong> Denklemi 3 ile çarparken eşitliğin sağ tarafını da çarpmayı unutmak en sık hatadır.",
        "<strong>İşaret hatası:</strong> Denklemleri çıkarırken her terimin işaretini değiştirin; −(−3y) = +3y'dir.",
        "<strong>Sağlama yapmamak:</strong> Bulunan değerleri iki denklemde de deneyin; biri sağlıyor diğeri sağlamıyorsa hesapta hata vardır.",
        "<strong>Tek değeri bulup durmak:</strong> Soru x + y ya da x ÷ y istiyor olabilir; sonucu sorulan ifadeye göre hesaplayın.",
        "<strong>0 = 2 sonucunu hata sanmak:</strong> Bu, sistemin çözümsüz olduğunu gösterir; yeniden hesaplamak gerekmez."
      ]
    }
  ],
  faq: [
    ["İki bilinmeyenli denklem nasıl çözülür?", "İki denklemden bir bilinmeyen yok edilir ya da bir denklemden çekilen ifade diğerine yazılır; kalan tek bilinmeyenli denklem çözülür ve bulunan değer yerine konur. 2x + 3y = 12 ve x − y = 1 sisteminin çözümü x = 3, y = 2'dir."],
    ["Yok etme yöntemi nedir?", "Yok etme yöntemi, denklemleri uygun sayılarla çarparak bir bilinmeyenin katsayılarını zıt yapıp taraf tarafa toplamaktır. Böylece o bilinmeyen düşer ve tek bilinmeyenli bir denklem kalır."],
    ["Yerine koyma yöntemi nasıl uygulanır?", "Denklemlerden birinde x ya da y yalnız bırakılır, elde edilen ifade diğer denklemde yerine yazılır. x − y = 1 denkleminden x = y + 1 alınıp 2x + 3y = 12'ye konursa 5y = 10 ve y = 2 bulunur."],
    ["Denklem sisteminin çözümü yoksa ne anlama gelir?", "Çözüm yoksa denklemlerin temsil ettiği doğrular paraleldir ve hiçbir noktada kesişmez. Cebirsel çözümde 0 = 2 gibi yanlış bir eşitlik çıkar; problem sorularında bu, verilerin birbiriyle çeliştiğini gösterir."],
    ["Sonsuz çözüm ne zaman olur?", "İki denklem aslında aynı doğruyu anlatıyorsa, yani biri diğerinin katıysa sonsuz çözüm olur. x + y = 4 ve 2x + 2y = 8 sisteminde toplamı 4 olan her sayı çifti çözümdür; çözümde 0 = 0 kalır."],
    ["Üç bilinmeyenli denklem nasıl çözülür?", "İki farklı denklem çiftinden aynı bilinmeyen yok edilerek iki bilinmeyenli bir sisteme inilir, bu sistem çözülür ve sonuçlar ilk denklemlerden birinde yerine konur. Örnek sistemde çözüm x = 1, y = 2, z = 3 çıkar."],
    ["Grafikle çözüm nasıl yapılır?", "Her denklem için iki nokta bulunarak doğrular çizilir; doğruların kesişim noktası sistemin çözümüdür. 2x + 3y = 12 ve x − y = 1 doğruları (3, 2) noktasında kesişir; kesirli çözümlerde grafik yalnızca yaklaşık sonuç verir."],
    ["Matris yöntemiyle denklem sistemi nasıl çözülür?", "Sistem A × X = B biçiminde yazılır; katsayı matrisinin tersi alınıp sabitler vektörüyle çarpılır: X = A<sup>−1</sup> × B. Katsayı matrisinin determinantı sıfırsa ters matris yoktur ve sistemin tek çözümü bulunmaz."],
    ["Cramer kuralı nedir?", "Cramer kuralı, çözümü determinantlarla veren yöntemdir: x = D<sub>x</sub> ÷ D ve y = D<sub>y</sub> ÷ D. Katsayılar determinantı D sıfırdan farklıysa sistemin tek çözümü vardır; örnek sistemde D = −5 bulunur."]
  ],
  tools: ["iki-bilinmeyenli-denklem-coz", "uc-bilinmeyenli-denklem-coz", "denklem-cozucu", "matris-hesapla"],
  related: ["diskriminant-ikinci-derece-denklem", "dogrunun-egimi-nasil-bulunur", "oran-oranti-nasil-cozulur"],
  sources: [
    ["MEB – Ortaokul ve Lise Matematik Dersi Öğretim Programları", "https://mufredat.meb.gov.tr/"]
  ]
};
