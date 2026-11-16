export default {
  slug: "satis-primi-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Satış Primi Nasıl Hesaplanır? Prim Sistemleri, Komisyon ve Vergi Kesintisi",
  pageTitle: "Satış Primi Nasıl Hesaplanır? Kademeli Prim ve Kesintiler",
  description: "Satış primi hesaplama: tüm satışa, hedef aşımına ve kademeli prim yöntemleri; primden kesilen SGK, gelir ve damga vergisi, net maaşa etkisi ve çözümlü örnekler.",
  keywords: ["satış primi hesaplama", "prim nasıl hesaplanır", "kademeli prim sistemi", "basamaklı prim", "satış komisyonu", "prim vergisi", "primden sgk kesilir mi", "prim maaşa dahil mi", "ekip primi paylaştırma"],
  lead: "Satış primi, en basit hâliyle <strong>prim = satış tutarı × prim oranı</strong> formülüyle hesaplanır; ancak çoğu işyeri primi hedefe bağlar ve yalnızca hedefi aşan kısma, hedefe ulaşınca tüm satışa ya da basamaklı oranlarla öder. Hangi yöntemin geçerli olduğu iş sözleşmesinde veya prim yönetmeliğinde yazar. Bordroya eklenen prim ücret sayılır; SGK primi, gelir vergisi ve damga vergisi kesilir. Bu sayfada dört prim yöntemini aynı örnekle karşılaştırıyor, kesintileri ve ekip primi paylaşımını adım adım gösteriyoruz.",
  kisaCevap: [
    "Düz prim: prim = dönem satışı × prim oranı; 480.000 TL satış ve %2 oranla prim 9.600 TL olur.",
    "Hedef aşım primi yalnızca hedefin üstündeki satışa ödenir: (satış − hedef) × oran.",
    "Kademeli prim, hedefe kadar bir oran, hedefin üstüne daha yüksek bir oran uygular.",
    "Eşikli prim, hedef tutturulmazsa hiç ödenmez; tutturulursa tüm satış üzerinden ödenir.",
    "Bordroya giren prim ücrettir: SGK işçi payı (%14 + %1 işsizlik), gelir vergisi ve damga vergisi (binde 7,59) kesilir.",
    "Prim, kümülatif vergi matrahını büyüttüğü için o ayın veya sonraki ayların vergi dilimini yükseltebilir."
  ],
  figure: {
    alt: "Aynı satış örneğinde dört prim yönteminin karşılaştırması: tüm satışa prim 9.600 TL, hedef aşım primi 1.600 TL, kademeli prim 11.200 TL, eşikli prim 9.600 TL. Satış 480.000 TL, hedef 400.000 TL.",
    caption: "Satış 480.000 TL, hedef 400.000 TL, temel oran %2, hedef üstü oran %4 varsayımıyla dört yöntemin ödediği brüt prim. Aynı performans, seçilen yönteme göre yedi kata varan fark yaratabilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı satış, dört farklı prim</text>
  <text x="360" y="54" class="sm mid t2">Satış 480.000 TL · Hedef 400.000 TL · Gerçekleşme %120</text>
  <g>
    <text x="20" y="102" class="b">Tüm satışa %2</text>
    <text x="20" y="120" class="sm mu">480.000 × 0,02</text>
    <rect x="210" y="86" width="343" height="34" rx="6" class="ps"/>
    <text x="563" y="109" class="b">9.600 TL</text>

    <text x="20" y="172" class="b">Hedef aşımına %2</text>
    <text x="20" y="190" class="sm mu">80.000 × 0,02</text>
    <rect x="210" y="156" width="57" height="34" rx="6" class="dgs"/>
    <text x="277" y="179" class="b">1.600 TL</text>

    <text x="20" y="242" class="b">Kademeli %2 + %4</text>
    <text x="20" y="260" class="sm mu">8.000 + 3.200</text>
    <rect x="210" y="226" width="400" height="34" rx="6" class="p"/>
    <text x="600" y="249" class="b end sf">11.200 TL</text>

    <text x="20" y="312" class="b">Eşikli (hedef şart)</text>
    <text x="20" y="330" class="sm mu">hedef aşıldı → 480.000 × 0,02</text>
    <rect x="210" y="296" width="343" height="34" rx="6" class="oks"/>
    <text x="563" y="319" class="b">9.600 TL</text>
  </g>
  <line x1="210" y1="76" x2="210" y2="340" class="st" fill="none"/>
  <rect x="20" y="356" width="680" height="50" rx="8" class="sf sb"/>
  <rect x="20" y="356" width="8" height="50" class="dg"/>
  <text x="42" y="377" class="b">Satış 380.000 TL olsaydı (hedefin altı)</text>
  <text x="42" y="397" class="sm t2">Tüm satışa 7.600 · Hedef aşımı 0 · Kademeli 7.600 · Eşikli 0 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Satış primi nedir, neden farklı hesaplanır?",
      p: [
        "Satış primi, çalışanın belirli bir dönemde yaptığı satışa bağlı olarak sabit maaşının üzerine ödenen değişken ücrettir. Mağaza satış danışmanları, saha temsilcileri, emlak ve otomotiv satıcıları, çağrı merkezi ekipleri ve bayi yöneticileri en sık prim alan gruplardır. Amaç, satışı artıran kişiyi doğrudan ödüllendirmek ve hedeflere odaklanmayı sağlamaktır.",
        "Primin tek bir resmî formülü yoktur. İş Kanunu primin nasıl hesaplanacağını belirlemez; bunu işveren ile çalışan arasındaki iş sözleşmesi, şirketin prim yönetmeliği ya da toplu iş sözleşmesi belirler. Bu yüzden iki farklı mağazada aynı satışı yapan iki kişinin primi çok farklı çıkabilir. Hesabı doğru yapabilmek için önce yazılı prim kuralınızı edinmeniz gerekir.",
        "Kuralda genellikle dört bilgi bulunur: <strong>dönem</strong> (aylık, üç aylık), <strong>prim matrahı</strong> (KDV hariç ciro mu, tahsil edilen tutar mı, brüt kâr mı), <strong>hedef</strong> ve <strong>oran ya da oranlar</strong>. Bu dört bilgi elinizdeyse hesabın kendisi birkaç çarpma işleminden ibarettir."
      ]
    },
    {
      h: "Dört temel prim yöntemi ve formülleri",
      p: [
        "Türkiye'deki işyerlerinde en sık karşılaşılan prim modelleri aşağıdadır. Formüllerde S dönem satışını, H hedefi, r temel prim oranını, r<sub>2</sub> ise hedef üstü oranı gösterir."
      ],
      formula: "Düz prim (tüm satışa):     P = S × r\nHedef aşım primi:          P = (S − H) × r     (S ≤ H ise P = 0)\nKademeli prim:             P = min(S, H) × r + (S − H) × r₂\nEşikli prim:               P = S × r  (yalnızca S ≥ H ise; aksi hâlde 0)\nHedef gerçekleşme oranı:   G = S ÷ H × 100",
      table: {
        head: ["Yöntem", "Kime uygun", "Avantajı", "Dezavantajı"],
        rows: [
          ["Düz prim", "Yeni ekipler, değişken pazarlar", "Basit ve anlaşılır", "Hedefe odaklanmayı teşvik etmez"],
          ["Hedef aşım primi", "Sabit maaşı yüksek pozisyonlar", "İşverene maliyeti düşük", "Hedef yüksekse prim hiç çıkmayabilir"],
          ["Kademeli prim", "Satış ekipleri, bayiler", "Fazla satışı güçlü ödüllendirir", "Hesabı ve takibi daha karmaşık"],
          ["Eşikli prim", "Kampanya dönemleri", "Hedefi net bir şarta bağlar", "Hedefin biraz altı tamamen boşa gider"]
        ],
        caption: "Tablodaki değerlendirmeler geneldir; hangi yöntemin size uygun olduğu sektöre ve sabit maaşın düzeyine bağlıdır."
      }
    },
    {
      h: "Çözümlü örnek: 480.000 TL satış, 400.000 TL hedef",
      p: [
        "Bir beyaz eşya mağazasında çalışan satış danışmanının ekim ayı satışı KDV hariç 480.000 TL, aylık hedefi 400.000 TL olsun. Temel prim oranı %2, kademeli modelde hedef üstü oranı %4 kabul edelim. Önce gerçekleşme oranını bulalım: 480.000 ÷ 400.000 × 100 = %120."
      ],
      ol: [
        "<strong>Düz prim:</strong> 480.000 × 0,02 = 9.600 TL.",
        "<strong>Hedef aşım primi:</strong> hedefi aşan tutar 480.000 − 400.000 = 80.000 TL; prim 80.000 × 0,02 = 1.600 TL.",
        "<strong>Kademeli prim:</strong> hedefe kadar 400.000 × 0,02 = 8.000 TL, hedef üstü 80.000 × 0,04 = 3.200 TL; toplam 11.200 TL.",
        "<strong>Eşikli prim:</strong> satış hedefin üstünde olduğu için tüm satış üzerinden 480.000 × 0,02 = 9.600 TL.",
        "Aynı danışman 380.000 TL satış yapsaydı (gerçekleşme %95): düz prim 7.600 TL, hedef aşım primi 0, kademeli prim 7.600 TL, eşikli prim 0 TL olurdu."
      ],
      after: [
        "Örnek, yöntem seçiminin ne kadar belirleyici olduğunu gösteriyor: %120 gerçekleşmede en düşük ve en yüksek prim arasında yedi kat fark var. Hedefin hemen altında kalındığında ise eşikli sistemde tüm emek karşılıksız kalıyor. Kendi rakamlarınızla dört yöntemi aynı anda görmek için [[arac:satis-primi-hesapla|Satış Primi Hesaplama]] aracına satış, hedef ve oranları yazmanız yeterli."
      ]
    },
    {
      h: "Basamaklı prim: tüm satışa mı, dilime mi uygulanır?",
      p: [
        "Bazı işyerleri hedef gerçekleşmesine göre birden fazla basamak tanımlar. Burada en çok karıştırılan nokta, ulaşılan basamağın oranının <strong>tüm satışa</strong> mı, yoksa gelir vergisi dilimleri gibi <strong>yalnızca o dilime</strong> mi uygulandığıdır. İki yorum arasında çok büyük fark oluşur; bu yüzden prim yönetmeliğinde açıkça yazmalıdır.",
        "Aşağıdaki örnek tabloda hedef 400.000 TL, satış 480.000 TL'dir ve basamaklar şöyle tanımlanmıştır: %80'in altı prim yok, %80–100 arası %1, %100–120 arası %2, %120 ve üzeri %3."
      ],
      table: {
        head: ["Basamak (gerçekleşme)", "Satış aralığı", "Oran", "Dilimli hesapta prim"],
        rows: [
          ["%0 – %80", "0 – 320.000 TL", "%0", "0 TL"],
          ["%80 – %100", "320.000 – 400.000 TL", "%1", "800 TL"],
          ["%100 – %120", "400.000 – 480.000 TL", "%2", "1.600 TL"],
          ["%120 ve üzeri", "480.000 TL üstü", "%3", "0 TL"],
          ["Toplam", "", "", "2.400 TL"]
        ],
        caption: "Dilimli (marjinal) yorumda her oran yalnızca kendi aralığına uygulanır. Ulaşılan basamak yorumunda ise %120'ye ulaşıldığı için %3 tüm satışa uygulanır: 480.000 × 0,03 = 14.400 TL."
      },
      after: [
        "Aynı tablo, yoruma göre 2.400 TL ya da 14.400 TL prim üretiyor. İşe başlarken ya da yeni prim sistemi duyurulduğunda bu ayrıntıyı yazılı olarak sormanız, ileride yaşanabilecek anlaşmazlıkların önüne geçer."
      ]
    },
    {
      h: "Prim ile komisyon arasındaki fark",
      p: [
        "Günlük dilde ikisi birbirinin yerine kullanılsa da hukuki ve muhasebe açısından farklıdır. <strong>Prim</strong>, bordrolu çalışana maaşına ek olarak ödenen ücret unsurudur; bordroda görünür ve vergi ile SGK kesintisine tabidir. Çoğunlukla hedef, dönem ve performans koşuluna bağlanır.",
        "<strong>Komisyon</strong> ise her satıştan belirli bir yüzde alınması anlamına gelir. Bordrolu çalışana ödenen komisyon da ücret sayılır ve primle aynı kesintilere tabidir. Ancak bağımsız bir aracı, acente ya da serbest çalışan komisyon alıyorsa bu bir hizmet bedelidir: fatura ya da serbest meslek makbuzu düzenlenir, çoğu durumda KDV hesaplanır ve SGK primi bordrodan değil kişinin kendi sigortasından ödenir.",
        "Bağımsız aracılık ilişkisinde komisyon tutarını, komisyonun KDV'sini ve satıcının eline geçen net tutarı görmek için [[arac:komisyon-hesapla|Komisyon Hesaplama]] aracını kullanabilirsiniz. Pazaryeri satıcılarının ödediği komisyon için [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu rehberi]] ayrıca işinize yarar."
      ]
    },
    {
      h: "Primden hangi kesintiler yapılır, net maaşa etkisi",
      p: [
        "Bordroya eklenen prim, ödendiği ayın brüt ücretine eklenir ve maaşla aynı kesintilere tabi olur. Sabit maaşınız zaten asgari ücretin üzerindeyse, asgari ücret gelir ve damga vergisi istisnası maaşınızda kullanılmış olur; primin tamamı vergilendirilir."
      ],
      ul: [
        "<strong>SGK işçi payı:</strong> brüt primin %14'ü; <strong>işsizlik sigortası işçi payı:</strong> %1. Prime esas kazanç üst sınırını (tavanı) aşan kısımdan kesinti yapılmaz.",
        "<strong>Gelir vergisi:</strong> SGK kesintisi düşüldükten sonra kalan tutar üzerinden, yıl başından beri biriken (kümülatif) matrahınızın bulunduğu dilim oranında.",
        "<strong>Damga vergisi:</strong> brüt primin binde 7,59'u."
      ],
      formula: "Örnek: brüt prim 10.000 TL, kümülatif matrah %20 diliminde\nSGK + işsizlik = 10.000 × 0,15 = 1.500 TL\nGelir vergisi = (10.000 − 1.500) × 0,20 = 1.700 TL\nDamga vergisi = 10.000 × 0,00759 = 75,90 TL\nNet prim = 10.000 − 1.500 − 1.700 − 75,90 = 6.724,10 TL",
      after: [
        "Bu hesap örnek niteliğindedir; dilim oranınız yıl içinde değişir ve büyük bir prim matrahınızı bir üst dilime taşıyabilir. Güncel dilimler için [[bilgi:gelir-vergisi-dilimleri-2026|2026 gelir vergisi dilimleri]] sayfasına, maaşınızın tamamını primle birlikte görmek için [[arac:brut-net-maas|Brütten Nete Maaş Hesaplama]] aracına bakabilirsiniz. Prim bazı işyerlerinde netten anlaşılır; bu durumda işveren kesintileri üstlenir ve bordroda brüte tamamlanmış tutar görünür."
      ]
    },
    {
      h: "Prim bordroda nasıl görünür?",
      p: [
        "Bordronun kazançlar bölümünde prim, genellikle \"satış primi\", \"performans primi\" ya da \"prim\" adıyla ayrı bir satırda yer alır. Bu satır brüt ücretle toplanarak SGK matrahını, vergi matrahını ve damga vergisi matrahını oluşturur. Kesintiler ayrı ayrı gösterilmez; maaş ve prim toplamı üzerinden tek satırda hesaplanır.",
        "Primin hangi aya ait olduğu ile hangi ay ödendiği farklı olabilir. Örneğin ekim satışlarının primi kasım bordrosunda ödenebilir. Vergi ve SGK açısından genellikle <strong>ödendiği ay</strong> esas alınır. Bordronuzu satır satır çözmek için [[bilgi:maas-bordrosu-nasil-okunur|maaş bordrosu nasıl okunur]] yazısı yol gösterir."
      ]
    },
    {
      h: "Hedef tutturulamazsa prim ödenir mi?",
      p: [
        "Bu soru tamamen prim kuralına bağlıdır. Prim hedefe bağlı yazılmışsa ve hedef tutturulmamışsa işveren primi ödemek zorunda değildir. Düz prim sisteminde ise hedef olmadığı için her satış prim doğurur. Eşikli sistemde hedefin altında kalmak primi sıfırlarken kademeli sistemde temel oran üzerinden prim almaya devam edersiniz.",
        "Dikkat edilmesi gereken bir nokta, yıllardır düzenli ve koşulsuz ödenen primin işyeri uygulamasına dönüşebilmesidir. Böyle bir durumda primin tek taraflı kaldırılması ya da azaltılması çalışma koşulunda esaslı değişiklik sayılabilir. Ayrıca sürekli ödenen primler kıdem tazminatı hesabındaki giydirilmiş ücrete dahil edilebilir. Bu konularda uyuşmazlık varsa bir iş hukuku uzmanına ya da ilgili kamu kurumuna danışmak en doğrusudur."
      ]
    },
    {
      h: "Ekip primi nasıl paylaştırılır?",
      p: [
        "Mağaza ya da bölge hedefine bağlı ekip primlerinde önce toplam prim havuzu hesaplanır, sonra çalışanlara dağıtılır. Dağıtım yöntemi de prim yönetmeliğinde tanımlanmalıdır. Örneğin 24.000 TL'lik ekip prim havuzu üç kişiye dağıtılacak olsun."
      ],
      table: {
        head: ["Dağıtım yöntemi", "Ayşe", "Mehmet", "Zeynep"],
        rows: [
          ["Eşit pay", "8.000 TL", "8.000 TL", "8.000 TL"],
          ["Bireysel satış payına göre (%50 / %30 / %20)", "12.000 TL", "7.200 TL", "4.800 TL"],
          ["Çalışılan gün oranına göre (26 / 26 / 13 gün)", "9.600 TL", "9.600 TL", "4.800 TL"],
          ["Karma: yarısı eşit, yarısı satış payına göre", "10.000 TL", "7.600 TL", "6.400 TL"]
        ],
        caption: "Gün oranında toplam 65 gün vardır: 26 ÷ 65 = %40, 13 ÷ 65 = %20. Karma yöntemde 12.000 TL eşit (4.000'er), 12.000 TL satış payına göre bölünmüştür."
      },
      after: [
        "Eşit pay ekip ruhunu güçlendirir ama yüksek performanslı çalışanı yeterince ödüllendirmeyebilir. Satış payına göre dağıtım ise rekabeti artırırken müşteriyi ekip arkadaşına yönlendirmeyi azaltabilir. Karma yöntem bu iki etkiyi dengelemek için sık tercih edilir."
      ]
    },
    {
      h: "Prim hesabında sık yapılan hatalar",
      ul: [
        "<strong>KDV dahil ciroyu esas almak:</strong> Çoğu prim kuralı KDV hariç satış ya da tahsil edilen tutar üzerinden çalışır. KDV dahil hesap primi %20'ye kadar şişirir.",
        "<strong>İadeleri düşmemek:</strong> Dönem içinde iade edilen ya da iptal edilen satışlar genellikle prim matrahından çıkarılır.",
        "<strong>Basamak yorumunu varsaymak:</strong> Ulaşılan basamak oranının tüm satışa mı, dilime mi uygulandığı yazılı değilse hesap tartışmalı kalır.",
        "<strong>Brüt primi net sanmak:</strong> 10.000 TL brüt prim, dilime göre elinize 6.500–7.500 TL civarında geçebilir.",
        "<strong>Yuvarlamayı erken yapmak:</strong> Oranları ve ara toplamları yuvarlamadan hesaplayın, yuvarlamayı en sonda yapın.",
        "<strong>Ödeme ayını gözden kaçırmak:</strong> Prim farklı ayda ödenirse vergi dilimi de o aya göre belirlenir."
      ]
    },
    {
      h: "Satış Primi Hesaplama aracını kullanma adımları",
      ol: [
        "[[arac:satis-primi-hesapla|Satış Primi Hesaplama]] sayfasını açın ve prim yönteminizi seçin: tüm satışa, hedef aşımına, kademeli ya da eşikli.",
        "Dönem satış tutarını KDV hariç olarak yazın; iadeleri önceden düşün.",
        "Hedef tutarını ve prim oranını girin; kademeli yöntemde hedef üstü oranını da yazın.",
        "İsterseniz sabit brüt maaşınızı ekleyin; araç maaş ve primin brüt toplamını gösterir.",
        "Sonuçta prim tutarını, hedef gerçekleşme oranını ve hedefe kalan ya da hedefi aşan tutarı görürsünüz. Tutarlar brüttür; neti bulmak için toplamı brütten nete maaş aracına aktarın."
      ],
      after: [
        "Araç tarayıcınızda çalışır, girdiğiniz satış ve maaş bilgileri hiçbir sunucuya gönderilmez. Maaş artışınızın primle birlikte yıllık gelire etkisini görmek isterseniz [[bilgi:maas-zammi-nasil-hesaplanir|maaş zammı hesaplama]] yazısına da göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Satış primi nasıl hesaplanır?", "En basit yöntemde dönem satışı prim oranıyla çarpılır: 480.000 TL satış ve %2 oranla prim 9.600 TL olur. Hedefe bağlı sistemlerde yalnızca hedef üstü satışa, kademeli oranlarla ya da hedef şartıyla tüm satışa prim hesaplanır."],
    ["Kademeli (basamaklı) prim sistemi nedir?", "Hedef gerçekleşmesi arttıkça prim oranının yükseldiği sistemdir. Oran ya yalnızca ilgili dilime ya da ulaşılan basamağa göre tüm satışa uygulanır; iki yorum arasında büyük fark olduğu için prim yönetmeliğinde açıkça yazmalıdır."],
    ["Prim ile komisyon arasındaki fark nedir?", "Prim bordrolu çalışana maaşa ek ödenen, çoğunlukla hedefe bağlı ücret unsurudur. Komisyon her satıştan alınan yüzdedir; bordrolu çalışana ödenirse ücret sayılır, bağımsız aracıya ödenirse faturalı hizmet bedeli olur ve KDV doğabilir."],
    ["Primden gelir vergisi ve SGK kesilir mi?", "Evet. Bordroya eklenen prim ücret sayılır; brüt primden %14 SGK ve %1 işsizlik sigortası işçi payı, kalan tutardan kümülatif dilime göre gelir vergisi ve brüt tutardan binde 7,59 damga vergisi kesilir."],
    ["Prim net maaşı nasıl etkiler?", "Prim, ödendiği ayın brüt ücretine eklenir ve aynı kesintilere tabi olur. Kümülatif vergi matrahını artırdığı için o ay ya da sonraki aylarda bir üst gelir vergisi dilimine geçmenize neden olabilir; bu da net maaşınızı düşürebilir."],
    ["Hedef tutturulamazsa prim ödenir mi?", "Prim kuralı hedefe bağlıysa ve hedef tutturulmadıysa işveren ödemek zorunda değildir. Düz ve kademeli sistemlerde hedefin altında da prim doğabilir. Yıllardır koşulsuz ödenen prim ise işyeri uygulamasına dönüşebilir; uyuşmazlıkta uzmana danışın."],
    ["Prim bordroda nasıl görünür?", "Kazançlar bölümünde satış primi ya da performans primi adıyla ayrı satırda görünür. Brüt maaşla toplanarak SGK, gelir vergisi ve damga vergisi matrahını oluşturur; kesintiler toplam üzerinden tek satırda hesaplanır."],
    ["Ekip primi nasıl paylaştırılır?", "Önce ekibin toplam prim havuzu hesaplanır, sonra eşit pay, bireysel satış payı, çalışılan gün oranı ya da bunların karması bir yöntemle dağıtılır. Hangi yöntemin kullanılacağı prim yönetmeliğinde önceden yazılı olarak belirlenmelidir."],
    ["Prim KDV dahil satış üzerinden mi hesaplanır?", "Çoğu işyeri primi KDV hariç satış ya da tahsil edilen tutar üzerinden hesaplar, çünkü KDV işletmenin geliri değildir. KDV dahil hesaplama primi şişirir; hangi tutarın esas alındığını sözleşmenizden kontrol edin."]
  ],
  tools: ["satis-primi-hesapla", "komisyon-hesapla", "brut-net-maas"],
  related: ["maas-bordrosu-nasil-okunur", "gelir-vergisi-dilimleri-2026", "maas-zammi-nasil-hesaplanir", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Gelir vergisi ve ücret", "https://www.gib.gov.tr/"],
    ["Sosyal Güvenlik Kurumu – Prime esas kazançlar", "https://www.sgk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 4857 sayılı İş Kanunu", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "hukuki ve mali danışmanlık değildir; prim kuralınız için iş sözleşmenizi esas alın"
};
