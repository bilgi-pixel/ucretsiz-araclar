export default {
  slug: "gol-averaji-nasil-hesaplanir-lig-fiksturu",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Gol Averajı Nasıl Hesaplanır? Puan Durumu, İkili Averaj ve Lig Fikstürü",
  pageTitle: "Gol Averajı Nasıl Hesaplanır? İkili Averaj ve Puan Durumu",
  description: "Gol averajı = atılan gol − yenilen gol. Türkiye liglerinde puan eşitliğinde önce aralarındaki maçlara (ikili averaj) bakılır. Fikstür, bay haftası ve eleme tablosu.",
  keywords: ["averaj nasıl hesaplanır", "gol averajı nedir", "ikili averaj", "puan durumu nasıl hesaplanır", "puanlar eşitse sıralama", "lig fikstürü oluşturma", "tek sayıda takım fikstür", "eleme tablosu", "turnuva fikstürü"],
  lead: "Gol averajı, bir takımın attığı gol sayısından yediği gol sayısının çıkarılmasıyla bulunur: <strong>averaj = atılan gol − yenilen gol</strong>. 38 gol atıp 17 gol yiyen takımın averajı <strong>+21</strong>'dir. Puan durumunda galibiyet 3, beraberlik 1, mağlubiyet 0 puan getirir. Türkiye Futbol Federasyonu liglerinde puanlar eşitse önce takımların <strong>kendi aralarındaki maçlara</strong> (ikili averaj), sonra genel averaja bakılır. Bu sayfada puan ve averaj hesabını, eşitlik ölçütlerini, üçlü averajı, lig fikstürü hazırlamayı, tek sayıda takımda bay haftasını ve eleme tablosunu bulacaksınız.",
  kisaCevap: [
    "Gol averajı = atılan gol − yenilen gol; artı ya da eksi işaretiyle yazılır (+21, −4).",
    "Puan = galibiyet × 3 + beraberlik × 1; mağlubiyet puan getirmez.",
    "TFF liglerinde iki takımın puanı eşitse önce aralarındaki maçların puanına, sonra bu maçlardaki gol averajına, sonra genel averaja bakılır.",
    "Üç ya da daha fazla takım eşitse yalnızca bu takımlar arasındaki maçlardan bir mini puan tablosu kurulur.",
    "n takımlı tek devreli ligde (n çiftse) n − 1 hafta ve n × (n − 1) ÷ 2 maç oynanır.",
    "Tek sayıda takım varsa her hafta bir takım bay geçer; eleme usulünde n katılımcı için n − 1 maç gerekir."
  ],
  figure: {
    alt: "Örnek puan tablosu: A ve B takımları 50'şer puanla eşit, B'nin genel averajı daha iyi ama aralarındaki maçlarda A 2-0 kazanıp 1-2 kaybettiği için ikili averajda A önde. Altta eşitlik ölçütleri sırası.",
    caption: "Puan eşitliğinde genel averajı daha iyi olan takım öne geçmeyebilir: ikili averajda A, B'ye karşı toplam 3–2 üstündür. Ölçütlerin tam sırası ilgili sezonun TFF statüsünde yer alır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Puanlar eşitse kim önde?</text>
  <rect x="30" y="50" width="420" height="36" rx="6" class="p"/>
  <g class="b sf"><text x="50" y="74">Takım</text><text x="210" y="74" class="mid">Puan</text><text x="290" y="74" class="mid">Atılan–Yenilen</text><text x="410" y="74" class="mid">Averaj</text></g>
  <rect x="30" y="90" width="420" height="40" rx="6" class="oks"/>
  <text x="50" y="116" class="b">1. A</text><text x="210" y="116" class="mid b">50</text><text x="290" y="116" class="mid">48–30</text><text x="410" y="116" class="mid">+18</text>
  <rect x="30" y="134" width="420" height="40" rx="6" class="sf sb"/>
  <text x="50" y="160" class="b">2. B</text><text x="210" y="160" class="mid b">50</text><text x="290" y="160" class="mid">52–26</text><text x="410" y="160" class="mid b dg">+26</text>
  <rect x="470" y="50" width="230" height="124" rx="10" class="sf sb"/>
  <text x="585" y="76" class="b mid">Aralarındaki maçlar</text>
  <text x="585" y="104" class="mid">A 2 – 0 B</text>
  <text x="585" y="128" class="mid">B 2 – 1 A</text>
  <text x="585" y="156" class="sm mid b ok">İkili: puan 3–3 · gol 3–2 → A</text>
  <text x="40" y="214" class="b">TFF statülerinde iki takım eşitse sıra (örnek):</text>
  <g class="sm">
    <rect x="30" y="228" width="210" height="44" rx="8" class="ps"/><text x="135" y="248" class="b mid">1. Aralarındaki</text><text x="135" y="264" class="mid">maçlarda puan</text>
    <rect x="255" y="228" width="210" height="44" rx="8" class="ps"/><text x="360" y="248" class="b mid">2. Aralarındaki</text><text x="360" y="264" class="mid">maçlarda averaj</text>
    <rect x="480" y="228" width="210" height="44" rx="8" class="sf sb"/><text x="585" y="248" class="b mid">3. Genel</text><text x="585" y="264" class="mid">averaj</text>
    <rect x="30" y="284" width="210" height="44" rx="8" class="sf sb"/><text x="135" y="304" class="b mid">4. Çok gol</text><text x="135" y="320" class="mid">atan takım</text>
    <rect x="255" y="284" width="435" height="44" rx="8" class="sf sb"/><text x="472" y="304" class="b mid">5. Sonraki ölçütler statüye göre</text><text x="472" y="320" class="mid">(hükmen yenilgi, kırmızı kart, eleme maçı…)</text>
  </g>
  <text x="360" y="360" class="sm mid t2">Deplasmanda atılan gol bu ölçütlerde ayrıca üstünlük sağlamaz.</text>
  <text x="360" y="382" class="sm mid t2">Kesin sıra için ilgili ligin güncel sezon statüsüne bakın.</text>
</svg>`
  },
  sections: [
    {
      h: "Galibiyet, beraberlik ve mağlubiyet kaç puan? Puan durumu nasıl hesaplanır?",
      p: [
        "Türkiye'deki futbol liglerinde ve dünyadaki liglerin büyük çoğunluğunda galibiyet <strong>3 puan</strong>, beraberlik <strong>1 puan</strong>, mağlubiyet <strong>0 puan</strong> getirir. Puan durumu tablosunda her takım için oynanan maç (O), galibiyet (G), beraberlik (B), mağlubiyet (M), atılan gol (A), yenilen gol (Y), averaj (AV) ve puan (P) sütunları bulunur.",
        "Puan, galibiyet sayısının 3 ile çarpılıp beraberlik sayısının eklenmesiyle bulunur. Oynanan maç sayısı da G + B + M'dir. Tablodaki sayıların tutarlılığını bu iki eşitlikle kontrol edebilirsiniz."
      ],
      formula: "Puan = G × 3 + B × 1\nOynanan maç = G + B + M\nGol averajı = A − Y",
      ol: [
        "Örnek takım: 20 maç, 12 galibiyet, 5 beraberlik, 3 mağlubiyet; 38 gol atmış, 17 gol yemiş.",
        "Puan: 12 × 3 + 5 × 1 = 36 + 5 = 41.",
        "Averaj: 38 − 17 = +21.",
        "Maç başına puan: 41 ÷ 20 = 2,05; alınabilecek 60 puanın %68,3'ü."
      ],
      after: [
        "Okul, şirket ya da mahalle turnuvalarında farklı bir puan sistemi (örneğin galibiyete 2 puan) kullanılabilir; önemli olan bunun turnuva başında herkese duyurulmasıdır. Kendi değerlerinizle puan, averaj, gol oranı ve maç başına ortalamaları görmek için [[arac:gol-averaji-hesapla|Gol Averajı Hesaplama]] aracında galibiyet ve beraberlik puanlarını da değiştirebilirsiniz."
      ]
    },
    {
      h: "Gol averajı nasıl hesaplanır?",
      p: [
        "Gol averajı, sezon boyunca atılan toplam golden yenilen toplam golün çıkarılmasıyla bulunan farktır. Sonuç pozitifse takım yediğinden fazla gol atmıştır ve \"+\" işaretiyle yazılır; negatifse \"−\" işaretiyle yazılır. 25 gol atıp 29 gol yiyen takımın averajı −4'tür.",
        "Eski dönemlerde bazı liglerde \"gol oranı\" (atılan ÷ yenilen) kullanılırdı. Bugün neredeyse her yerde fark yöntemi geçerlidir, çünkü oran yöntemi az gol yiyen savunmacı takımları orantısız biçimde öne çıkarır ve hiç gol yememiş takımda tanımsız kalır. Hesaplama aracı iki değeri birlikte gösterir; resmî sıralamada fark esas alınır.",
        "Averaj tek başına bir sıralama ölçütü değildir; yalnızca puanlar eşit olduğunda devreye girer. Hangi averajın önce uygulanacağı ise ligin kurallarına bağlıdır."
      ]
    },
    {
      h: "İkili averaj nedir? Puanlar eşitse sıralama nasıl belirlenir?",
      p: [
        "İkili averaj, puanları eşit olan iki takımın <strong>yalnızca birbirleriyle oynadıkları maçlardaki</strong> sonuçlarına bakmaktır. Türkiye Futbol Federasyonu'nun lig statülerinde iki takımın puanı eşit olduğunda önce bu maçlarda alınan puanlara, onlar da eşitse bu maçlardaki gol averajına bakılır; ancak bundan sonra genel averaj devreye girer. Örneğin TFF'nin 2026-2027 sezonu Profesyonelliğe Geçiş Ligi statüsünde sıra şöyledir: aralarındaki maçlarda puan, aralarındaki maçlarda averaj, genel averaj, atılan gol sayısı; ardından hükmen yenilgi, kırmızı kart sayısı ve gerekirse eleme maçı gibi ölçütler gelir. Bu statüde aralarındaki maçlarda deplasmanda daha fazla gol atmanın ayrıca üstünlük sağlamadığı da belirtilmiştir.",
        "Yukarıdaki görseldeki örnekte A ve B 50'şer puandadır. B'nin genel averajı (+26) A'nınkinden (+18) iyidir. Ama aralarındaki iki maçta A 2–0 kazanmış, 1–2 kaybetmiştir. İkili puan 3–3 eşittir; ikili gol toplamı A için 3, B için 2'dir. A ikili averajla öndedir ve sıralamada üste çıkar.",
        "Avrupa'daki bazı liglerde ve uluslararası turnuvalarda sıra farklı olabilir: bazılarında önce genel averaja bakılır. Bu yüzden \"averaj\" konuşulurken hangi ligden söz edildiğini belirtmek ve o ligin ilgili sezon statüsünü okumak gerekir."
      ]
    },
    {
      h: "Üç ya da daha fazla takım eşitse ne olur? Üçlü averaj",
      p: [
        "Üç ya da daha fazla takımın puanı eşitse, yalnızca bu takımlar arasında oynanan maçlardan oluşan ayrı bir <strong>mini puan cetveli</strong> kurulur. Bu cetvelde önce puana, sonra cetveldeki gol averajına, sonra atılan gole bakılır. Halk arasında buna \"üçlü averaj\" denir.",
        "Örnek: A, B ve C 60'ar puanla sezonu bitirdi. Aralarındaki altı maçta A 7 puan (+2), B 7 puan (+1), C 3 puan (−3) topladı. Mini cetvelde A ile B 7'şer puanla eşittir; cetveldeki averaj A'yı öne geçirir. Sıralama A, B, C olur. Statülerde, mini cetvelde puanı eşit kalan takımlar için ikili maçlara yeniden bakılmadığı, cetvelin kendi ölçütleriyle devam edildiği belirtilir; ayrıntı yine sezon statüsündedir.",
        "Sezon sonuna doğru \"üçlü averaj\" hesapları sık yapılır; ancak kalan maçların sonucuna göre eşitliğe giren takım sayısı değişebileceği için bu hesaplar ancak son haftada kesinleşir."
      ]
    },
    {
      h: "Lig fikstürü nasıl hazırlanır?",
      p: [
        "Lig usulünde her takım diğer her takımla bir (tek devre) ya da iki kez (çift devre: biri içeride, biri deplasmanda) karşılaşır. Fikstür, bu maçların haftalara dağıtılmış listesidir. Her hafta her takımın bir maç oynaması ve hiçbir eşleşmenin tekrar etmemesi gerekir."
      ],
      formula: "Tek devre maç sayısı = n × (n − 1) ÷ 2\nHafta sayısı (n çift) = n − 1 · (n tek) = n\nÇift devre: maç ve hafta sayısı ikiye katlanır",
      table: {
        head: ["Takım sayısı", "Tek devre maç", "Tek devre hafta", "Çift devre maç", "Çift devre hafta"],
        rows: [
          ["4", "6", "3", "12", "6"],
          ["6", "15", "5", "30", "10"],
          ["7", "21", "7 (her hafta 1 bay)", "42", "14"],
          ["8", "28", "7", "56", "14"],
          ["10", "45", "9", "90", "18"]
        ]
      },
      ol: [
        "<strong>Döner çember yöntemi:</strong> Takımları iki sıra halinde yazın; 8 takım için üstte 1–2–3–4, altta 8–7–6–5. Karşılıklı olanlar ilk haftanın eşleşmeleridir: 1-8, 2-7, 3-6, 4-5.",
        "1 numaralı takımı sabit tutun, diğerlerini saat yönünde bir adım çevirin. Yeni sıralama üstte 1–8–2–3, altta 7–6–5–4 olur; ikinci haftanın eşleşmeleri 1-7, 8-6, 2-5, 3-4'tür.",
        "Bunu n − 1 kez tekrarlayın; her takım diğer herkesle tam bir kez eşleşmiş olur.",
        "Ev sahibi dengesini sağlamak için sabit takımın ev-deplasman sırasını her hafta değiştirin. Çift devrede ikinci yarıda aynı eşleşmeler ev sahibi yer değiştirerek oynanır."
      ],
      after: [
        "Takım adlarını yazıp tek ya da çift devreli fikstürü hafta hafta oluşturmak için [[arac:lig-fiksturu-olustur|Lig Fikstürü Oluştur]] aracını kullanabilirsiniz; isteğe bağlı kura ile takım numaraları rastgele dağıtılır. Eşleşme sayısının mantığı için [[bilgi:permutasyon-ve-kombinasyon-farki|permütasyon ve kombinasyon]] makalesine göz atabilirsiniz."
      ]
    },
    {
      h: "Tek sayıda takım olursa fikstür nasıl yapılır?",
      p: [
        "Takım sayısı tekse, listeye \"BAY\" adlı hayali bir takım eklenir ve fikstür çift sayıymış gibi hazırlanır. Her hafta BAY ile eşleşen takım o hafta maç yapmaz. 7 takımlı bir ligde 8 takımlık fikstür kurulur: 7 hafta boyunca her hafta 3 maç oynanır ve her takım bir kez bay geçer. Toplam maç sayısı 7 × 6 ÷ 2 = 21'dir.",
        "Bay geçen takım puan kazanmaz; yalnızca o hafta maç oynamaz. Puan durumunda bazı takımların bir maç eksik görünmesi bu yüzden normaldir. Okul ve şirket turnuvalarında, bay haftasının sezonun ortasına denk getirilmesi takımların ritmini daha az bozar."
      ]
    },
    {
      h: "Eleme usulü turnuva tablosu nasıl kurulur?",
      p: [
        "Eleme (nakavt) usulünde her maçın kaybeden tarafı turnuvadan çıkar, kazanan bir üst tura geçer. Tablo, katılımcı sayısının 2'nin kuvveti (4, 8, 16, 32…) olduğu durumda kendiliğinden dengelidir. Katılımcı sayısı 2'nin kuvveti değilse, bir üst kuvvete tamamlamak için bazı katılımcılar ilk turu <strong>bay</strong> geçer."
      ],
      ul: [
        "<strong>Toplam maç sayısı</strong> her zaman katılımcı sayısının bir eksiğidir: 12 katılımcı için 11 maç. Her maç bir kişiyi eler ve şampiyon dışındaki herkes bir kez elenir.",
        "<strong>Tur sayısı</strong>, katılımcı sayısına eşit ya da ondan büyük ilk 2'nin kuvvetinin üssüdür: 12 katılımcı için 16 = 2<sup>4</sup>, yani 4 tur.",
        "<strong>Bay sayısı</strong> = bir üst kuvvet − katılımcı sayısı: 16 − 12 = 4 katılımcı ilk turu bay geçer, 8 katılımcı ilk turda 4 maç yapar.",
        "<strong>Seri başı</strong> uygulanırsa güçlü katılımcılar tablonun farklı yarılarına yerleştirilir ve erken turda karşılaşmaz; kura seçeneğinde yerleşim rastgele yapılır."
      ],
      after: [
        "Katılımcıları yazıp tur tur eşleşmeleri, bay geçenleri ve toplam maç sayısını görmek için [[arac:eleme-tablosu-olustur|Eleme Tablosu Oluştur]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Okul turnuvasında takımlar rastgele nasıl oluşturulur?",
      p: [
        "Okul, şirket ya da halı saha turnuvalarında takımları adil kurmak için en basit yol kuradır. Oyuncu adları bir listeye yazılır, liste rastgele karıştırılır ve sırayla takımlara dağıtılır. Takım sayısı ya da takım başına oyuncu sayısı önceden belirlenir; oyuncu sayısı tam bölünmüyorsa bazı takımlar bir kişi fazla olur.",
        "Kura öncesinde kalecileri ya da deneyimli oyuncuları ayrı bir gruba alıp önce onları dağıtmak, takımlar arasındaki güç dengesini korur. Kura sonuçlarını herkesin görebileceği biçimde paylaşmak da itirazları azaltır.",
        "Oyuncu listesini karıştırıp eşit takımlara bölmek için [[arac:rastgele-takim-olustur|Rastgele Takım Oluştur]] aracını kullanabilirsiniz. Kura ve eşit olasılık kavramı için [[bilgi:olasilik-nasil-hesaplanir|olasılık nasıl hesaplanır]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Genel averajı her ligde ilk ölçüt sanmak:</strong> TFF statülerinde ikili maçlar önce gelir; başka liglerde sıra farklı olabilir.",
        "<strong>Ertelenmiş maçı unutmak:</strong> Eksik maçı olan takımın puanı geçici olarak düşük görünür; karşılaştırmayı oynanan maç sayısıyla yapın.",
        "<strong>Averajı işaretsiz yazmak:</strong> −4 ile +4 arasındaki fark tabloda kolayca kaybolur.",
        "<strong>Tek sayıda takımda bay haftasını atlamak:</strong> Fikstür bir takımı aynı hafta iki kez oynatabilir.",
        "<strong>Turnuva kurallarını sonradan belirlemek:</strong> Eşitlik ölçütleri ve puan sistemi turnuva başlamadan yazılı olarak duyurulmalıdır."
      ]
    }
  ],
  faq: [
    ["Gol averajı nasıl hesaplanır?", "Gol averajı, takımın attığı toplam golden yediği toplam golün çıkarılmasıyla bulunur. 38 gol atıp 17 gol yiyen takımın averajı +21, 25 gol atıp 29 gol yiyen takımınki −4 olur."],
    ["İkili averaj nedir?", "İkili averaj, puanı eşit olan iki takımın yalnızca birbirleriyle oynadıkları maçlardaki puan ve gol farkına bakmaktır. Türkiye Futbol Federasyonu statülerinde puan eşitliğinde genel averajdan önce bu ölçüt uygulanır."],
    ["Puanlar eşitse sıralama nasıl belirlenir?", "TFF lig statülerinde iki takım eşitse sırasıyla aralarındaki maçlarda alınan puan, bu maçlardaki gol averajı, genel averaj ve atılan gol sayısına bakılır; ardından statüde yazan diğer ölçütler gelir. Kesin sıra ilgili sezon statüsündedir."],
    ["Galibiyet, beraberlik ve mağlubiyet kaç puan?", "Türkiye'deki futbol liglerinde galibiyet 3 puan, beraberlik 1 puan, mağlubiyet 0 puan getirir. 12 galibiyet ve 5 beraberliği olan takımın puanı 12 × 3 + 5 = 41'dir."],
    ["Lig fikstürü nasıl hazırlanır?", "Takımlar iki sıra halinde yazılır ve karşılıklı olanlar ilk haftayı oluşturur; bir takım sabit tutulup diğerleri her hafta bir adım çevrilir. 8 takımlı tek devreli ligde 7 hafta ve 28 maç oynanır."],
    ["Tek sayıda takım olursa fikstür nasıl yapılır?", "Listeye hayali bir \"BAY\" takımı eklenip fikstür çift sayıymış gibi hazırlanır; her hafta BAY ile eşleşen takım maç yapmaz. 7 takımlı ligde 7 hafta boyunca her takım bir kez bay geçer ve toplam 21 maç oynanır."],
    ["Eleme usulü turnuva tablosu nasıl kurulur?", "Katılımcı sayısı bir üst 2'nin kuvvetine tamamlanır, aradaki fark kadar katılımcı ilk turu bay geçer. 12 katılımcıda 4 bay, 4 tur ve toplam 11 maç olur; seri başı ya da kura ile yerleşim yapılır."],
    ["Okul turnuvasında takımlar rastgele nasıl oluşturulur?", "Oyuncu adları listelenir, liste kurayla karıştırılır ve sırayla takımlara dağıtılır. Kalecileri ya da deneyimli oyuncuları önce ayrı dağıtmak güç dengesini korur; sonuçların herkesle paylaşılması itirazları azaltır."],
    ["Üçlü averaj nasıl hesaplanır?", "Üç ya da daha fazla takımın puanı eşitse, yalnızca bu takımlar arasındaki maçlardan bir mini puan cetveli kurulur. Bu cetvelde önce puana, sonra cetveldeki gol averajına, sonra atılan gole bakılır."]
  ],
  tools: ["gol-averaji-hesapla", "lig-fiksturu-olustur", "eleme-tablosu-olustur", "rastgele-takim-olustur"],
  related: ["permutasyon-ve-kombinasyon-farki", "olasilik-nasil-hesaplanir"],
  sources: [
    ["TFF – 2026-2027 Sezonu Profesyonelliğe Geçiş Ligi Statüsü (Madde 13, puan usulü ve averaj)", "https://www.tff.org/Resources/TFF/Auto/91e02d2920bf4c8ebde9999eafbc6bc2.pdf"],
    ["Türkiye Futbol Federasyonu – Statüler ve talimatlar", "https://www.tff.org/"]
  ]
};
