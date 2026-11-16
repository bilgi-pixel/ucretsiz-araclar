export default {
  slug: "seri-ve-paralel-direnc-hesaplama",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Seri ve Paralel Direnç Nasıl Hesaplanır? Eşdeğer Direnç ve Gerilim Bölücü",
  pageTitle: "Seri ve Paralel Direnç Hesaplama: Eşdeğer Direnç Formülü",
  description: "Seri dirençler toplanır (R = R1 + R2), paralel dirençlerde terslerin toplamı alınır (1/R = 1/R1 + 1/R2). Karışık devre, gerilim bölücü ve E12 serisi çözümlü örneklerle.",
  keywords: ["seri direnç hesaplama", "paralel direnç hesaplama", "eşdeğer direnç", "gerilim bölücü", "karışık devre direnç", "paralel direnç formülü", "e12 direnç değerleri"],
  lead: "Seri bağlı dirençlerin eşdeğeri <strong>dirençlerin toplamıdır</strong> (R<sub>eş</sub> = R<sub>1</sub> + R<sub>2</sub> + …); paralel bağlı dirençlerde ise <strong>terslerin toplamının tersi</strong> alınır (1/R<sub>eş</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + …). Seri devrede tüm dirençlerden aynı akım geçer, paralel devrede tüm dirençlerin uçlarında aynı gerilim bulunur. Bu sayfada formülleri, iki eşit direncin paralel bağlanmasını, karışık devre çözümünü, gerilim bölücüyü ve standart direnç değerlerini adım adım çözülmüş örneklerle bulacaksınız.",
  kisaCevap: [
    "Seri bağlantıda eşdeğer direnç toplamdır: 100 Ω + 220 Ω + 330 Ω = 650 Ω.",
    "Paralel bağlantıda 1/R<sub>eş</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + …; eşdeğer direnç her zaman en küçük dirençten de küçüktür.",
    "İki direnç için kısa yol: R<sub>eş</sub> = (R<sub>1</sub> × R<sub>2</sub>) ÷ (R<sub>1</sub> + R<sub>2</sub>); 100 Ω ile 220 Ω paralel = 68,75 Ω.",
    "n tane eşit direnç paralel bağlanırsa eşdeğer R ÷ n olur: iki adet 1 kΩ paralel = 500 Ω.",
    "Gerilim bölücü çıkışı V<sub>çıkış</sub> = V<sub>giriş</sub> × R<sub>2</sub> ÷ (R<sub>1</sub> + R<sub>2</sub>) formülüyle bulunur.",
    "Karışık devrede önce en içteki seri ya da paralel grup tek dirence indirgenir, sonra dışa doğru ilerlenir."
  ],
  figure: {
    alt: "Solda 12 V kaynağa seri bağlı 100, 220 ve 330 ohm dirençler; toplam 650 ohm, akım 18,46 mA ve her dirençteki gerilim düşümü 1,85 V, 4,06 V, 6,09 V. Sağda aynı dirençler paralel bağlı; her kolda 12 V, kol akımları 120, 54,5 ve 36,4 mA, eşdeğer direnç 56,9 ohm.",
    caption: "Aynı üç direnç, aynı 12 V kaynak. Seri bağlantıda akım ortak, gerilim paylaşılır; paralel bağlantıda gerilim ortak, akım paylaşılır. Değerler metindeki çözümlü örneklerle aynıdır.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="30" class="lg b mid">Seri bağlantı</text>
  <text x="540" y="30" class="lg b mid">Paralel bağlantı</text>
  <line x1="360" y1="44" x2="360" y2="420" class="sb dash" fill="none"/>
  <rect x="34" y="150" width="36" height="70" rx="4" class="sf sb"/>
  <text x="52" y="176" class="sm mid b">+</text><text x="52" y="210" class="sm mid b">−</text>
  <text x="52" y="244" class="sm mid b">12 V</text>
  <polyline points="52,150 52,70 300,70 300,300 52,300 52,220" class="st sw" fill="none"/>
  <rect x="104" y="58" width="56" height="24" rx="3" class="ps"/><text x="132" y="75" class="sm mid b">100 Ω</text>
  <rect x="272" y="130" width="56" height="24" rx="3" class="ps"/><text x="300" y="147" class="sm mid b">220 Ω</text>
  <rect x="152" y="288" width="56" height="24" rx="3" class="ps"/><text x="180" y="305" class="sm mid b">330 Ω</text>
  <text x="132" y="104" class="sm mid p b">1,85 V</text>
  <text x="246" y="186" class="sm end p b">4,06 V</text>
  <text x="180" y="334" class="sm mid p b">6,09 V</text>
  <polygon points="214,64 226,70 214,76" class="t"/><text x="220" y="56" class="sm mid">I</text>
  <rect x="40" y="352" width="290" height="62" rx="8" class="sf sb"/>
  <text x="54" y="376" class="sm b">R<tspan class="sm">eş</tspan> = 100 + 220 + 330 = 650 Ω</text>
  <text x="54" y="400" class="sm">I = 12 ÷ 650 = 18,46 mA (her yerde aynı)</text>
  <rect x="394" y="150" width="36" height="70" rx="4" class="sf sb"/>
  <text x="412" y="176" class="sm mid b">+</text><text x="412" y="210" class="sm mid b">−</text>
  <text x="412" y="244" class="sm mid b">12 V</text>
  <polyline points="412,150 412,70 680,70" class="st sw" fill="none"/>
  <polyline points="412,220 412,300 680,300" class="st sw" fill="none"/>
  <line x1="490" y1="70" x2="490" y2="300" class="st sw" fill="none"/>
  <line x1="585" y1="70" x2="585" y2="300" class="st sw" fill="none"/>
  <line x1="680" y1="70" x2="680" y2="300" class="st sw" fill="none"/>
  <rect x="462" y="160" width="56" height="24" rx="3" class="ps"/><text x="490" y="177" class="sm mid b">100 Ω</text>
  <rect x="557" y="160" width="56" height="24" rx="3" class="ps"/><text x="585" y="177" class="sm mid b">220 Ω</text>
  <rect x="652" y="160" width="56" height="24" rx="3" class="ps"/><text x="680" y="177" class="sm mid b">330 Ω</text>
  <text x="490" y="226" class="sm mid ok b">120 mA</text>
  <text x="585" y="226" class="sm mid ok b">54,5 mA</text>
  <text x="680" y="226" class="sm mid ok b">36,4 mA</text>
  <text x="585" y="58" class="sm mid">her kolda 12 V</text>
  <rect x="394" y="352" width="306" height="62" rx="8" class="sf sb"/>
  <text x="408" y="376" class="sm b">1/R = 1/100 + 1/220 + 1/330 → 56,9 Ω</text>
  <text x="408" y="400" class="sm">I toplam = 120 + 54,5 + 36,4 = 210,9 mA</text>
</svg>`
  },
  sections: [
    {
      h: "Eşdeğer direnç nedir?",
      p: [
        "Bir devrede birden fazla direnç bulunduğunda, kaynağın \"gördüğü\" toplam etkiyi tek bir dirençle ifade edebiliriz. Bu tek dirence <strong>eşdeğer direnç</strong> denir. Eşdeğer direnci bulduğunuzda kaynaktan çekilen toplam akımı Ohm kanunuyla (I = V ÷ R) tek adımda hesaplayabilir, ardından her dirençteki akım ve gerilimi geriye doğru bulabilirsiniz.",
        "Dirençler iki temel biçimde bağlanır: <strong>seri</strong> (uç uca, akımın tek bir yolu var) ve <strong>paralel</strong> (yan yana, akım kollara ayrılıyor). Gerçek devrelerin çoğu bu ikisinin birleşimidir. Ohm kanununun kendisi ve gerilim–akım–direnç ilişkisi için [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] yazısına göz atabilirsiniz; bu sayfada bağlantı türlerine odaklanıyoruz."
      ]
    },
    {
      h: "Seri bağlı dirençlerin eşdeğeri nasıl bulunur?",
      p: [
        "Seri bağlantıda dirençler tek bir yol üzerinde art arda dizilir. Akımın başka bir yolu olmadığı için her dirençten geçen elektron sayısı aynıdır; bu yüzden <strong>seri devrede akım her yerde aynıdır</strong>. Bir dirençte birikme ya da kayıp olmaz, çünkü yük korunur: bir noktaya ne kadar yük giriyorsa o kadarı çıkar.",
        "Akım aynı olunca her direnç, direnciyle orantılı bir gerilim düşümü yaratır (V = I × R). Bu gerilimlerin toplamı kaynak gerilimine eşittir. Eşdeğer direnç de dirençlerin doğrudan toplamıdır; seri bağlamak her zaman toplam direnci artırır."
      ],
      formula: "R_eş = R1 + R2 + R3 + …\nI = V ÷ R_eş (her dirençte aynı)\nV_n = I × R_n ve V1 + V2 + V3 = V_kaynak",
      ol: [
        "<strong>Eşdeğeri bulun:</strong> 100 Ω, 220 Ω ve 330 Ω seri bağlı. R<sub>eş</sub> = 100 + 220 + 330 = 650 Ω.",
        "<strong>Akımı bulun:</strong> Kaynak 12 V ise I = 12 ÷ 650 = 0,01846 A = 18,46 mA.",
        "<strong>Gerilim düşümlerini bulun:</strong> V<sub>1</sub> = 0,01846 × 100 = 1,846 V; V<sub>2</sub> = 0,01846 × 220 = 4,062 V; V<sub>3</sub> = 0,01846 × 330 = 6,092 V.",
        "<strong>Kontrol edin:</strong> 1,846 + 4,062 + 6,092 = 12,000 V. Toplam kaynak gerilimini veriyorsa hesap doğrudur.",
        "<strong>Gücü bulun:</strong> Toplam güç P = V × I = 12 × 0,01846 = 0,22 W; en büyük pay 330 Ω'luk dirençtedir (6,092 × 0,01846 = 0,112 W)."
      ],
      after: [
        "Bu adımları [[arac:seri-direnc-hesapla|Seri Direnç Hesaplama]] aracı tek seferde yapar: dirençleri ve kaynak gerilimini girdiğinizde toplam direnci, devre akımını ve her dirençteki gerilim düşümünü listeler."
      ]
    },
    {
      h: "Paralel direnç formülü nedir?",
      p: [
        "Paralel bağlantıda dirençlerin birer ucu ortak bir noktaya, diğer uçları başka bir ortak noktaya bağlanır. Her direnç aynı iki nokta arasında durduğu için <strong>paralel devrede gerilim her kolda aynıdır</strong>. Evinizdeki prizler de paraleldir; buzdolabı, televizyon ve çamaşır makinesi aynı şebeke gerilimini görür ve biri kapandığında diğerleri çalışmaya devam eder.",
        "Akım ise kollara bölünür: direnci küçük olan koldan daha fazla akım geçer. Kol akımlarının toplamı kaynaktan çekilen akımı verir (Kirchhoff'un akım yasası). Her yeni kol akım için ek bir yol açtığı için paralel bağlamak toplam direnci her zaman <strong>azaltır</strong>; eşdeğer direnç, koldaki en küçük dirençten bile küçüktür."
      ],
      formula: "1 ÷ R_eş = 1 ÷ R1 + 1 ÷ R2 + 1 ÷ R3 + …\nİki direnç için: R_eş = (R1 × R2) ÷ (R1 + R2)\nn eşit direnç için: R_eş = R ÷ n",
      ol: [
        "<strong>İki direnç:</strong> 100 Ω ile 220 Ω paralel. R<sub>eş</sub> = (100 × 220) ÷ (100 + 220) = 22.000 ÷ 320 = 68,75 Ω.",
        "<strong>Üç direnç:</strong> 100 Ω, 220 Ω ve 330 Ω paralel. 1/R = 0,010000 + 0,004545 + 0,003030 = 0,017576; R<sub>eş</sub> = 1 ÷ 0,017576 = 56,90 Ω.",
        "<strong>Kol akımları (12 V):</strong> 12 ÷ 100 = 120 mA; 12 ÷ 220 = 54,5 mA; 12 ÷ 330 = 36,4 mA.",
        "<strong>Kontrol:</strong> 120 + 54,5 + 36,4 = 210,9 mA; 12 ÷ 56,9 = 210,9 mA. İki yol aynı sonucu veriyor."
      ],
      after: [
        "Üç ve daha fazla direnç için çarpım ÷ toplam kısayolunu doğrudan kullanmayın; ya ters değerleri toplayın ya da önce iki direnci birleştirip sonucu üçüncüyle tekrar eşleyin. [[arac:paralel-direnc-hesapla|Paralel Direnç Hesaplama]] aracı eşdeğeri bulur, gerilim girerseniz kol akımlarını ve toplam gücü de gösterir."
      ]
    },
    {
      h: "İki eşit direnç paralel bağlanırsa ne olur?",
      p: [
        "İki eşit direnç paralel bağlandığında eşdeğer direnç <strong>tam yarıya</strong> iner ve akım iki kola eşit paylaşılır. Formülde R<sub>1</sub> = R<sub>2</sub> = R yazarsanız (R × R) ÷ (2R) = R ÷ 2 elde edersiniz. İki adet 1 kΩ paralel 500 Ω, üç adet 1 kΩ paralel 333,3 Ω, dört adet 470 Ω paralel 117,5 Ω eder.",
        "Bu durumun pratik bir faydası vardır: güç kapasitesi artar. İki adet 0,25 W'lık direnci paralel bağladığınızda, her biri toplam gücün yarısını taşıdığı için grup 0,5 W'a kadar güvenle çalışır. Elinizde istenen değer yoksa da işe yarar: 100 Ω gerekiyorsa ve yalnızca 220 Ω'luklarınız varsa, iki tanesini paralel bağlayarak 110 Ω elde edersiniz; bu, çoğu uygulama için yeterince yakındır."
      ],
      table: {
        head: ["Bağlantı", "Eşdeğer direnç", "Akım ve gerilim", "Güç kapasitesi"],
        rows: [
          ["2 × 1 kΩ seri", "2 kΩ", "Akım aynı, gerilim yarı yarıya", "2 × tek direnç"],
          ["2 × 1 kΩ paralel", "500 Ω", "Gerilim aynı, akım yarı yarıya", "2 × tek direnç"],
          ["3 × 1 kΩ paralel", "333,3 Ω", "Her kola toplam akımın üçte biri", "3 × tek direnç"],
          ["1 kΩ ∥ 10 kΩ", "909 Ω", "Akımın %91'i 1 kΩ'dan geçer", "Küçük direnç zorlanır"]
        ],
        caption: "∥ işareti paralel bağlantıyı gösterir. Çok farklı değerler paralel bağlandığında eşdeğer, küçük direncin hemen altına düşer."
      }
    },
    {
      h: "Karışık devrede eşdeğer direnç nasıl hesaplanır?",
      p: [
        "Karışık (seri-paralel) devrede kural basittir: <strong>içten dışa doğru indirgeyin</strong>. Önce yalnızca paralel ya da yalnızca seri olan en küçük grubu bulun, onu tek bir dirence çevirin, devreyi yeniden çizin ve işlemi tek direnç kalana kadar tekrarlayın. Hangi dirençlerin paralel olduğunu anlamak için şu soruyu sorun: iki direncin her iki ucu da aynı iki düğüme bağlı mı? Evetse paraleldir."
      ],
      ol: [
        "<strong>Devre:</strong> 12 V kaynağa önce R<sub>1</sub> = 100 Ω seri bağlı; ardından R<sub>2</sub> = 220 Ω ile R<sub>3</sub> = 330 Ω birbirine paralel bağlanmış ve bu grup R<sub>1</sub>'e seri.",
        "<strong>Paralel grubu indirgeyin:</strong> R<sub>23</sub> = (220 × 330) ÷ (220 + 330) = 72.600 ÷ 550 = 132 Ω.",
        "<strong>Seri toplamı alın:</strong> R<sub>eş</sub> = 100 + 132 = 232 Ω.",
        "<strong>Toplam akım:</strong> I = 12 ÷ 232 = 51,72 mA. Bu akım R<sub>1</sub>'in tamamından geçer.",
        "<strong>Gerilimleri bulun:</strong> V<sub>1</sub> = 0,05172 × 100 = 5,172 V; paralel grubun gerilimi 12 − 5,172 = 6,828 V.",
        "<strong>Kol akımları:</strong> I<sub>2</sub> = 6,828 ÷ 220 = 31,03 mA; I<sub>3</sub> = 6,828 ÷ 330 = 20,69 mA. Toplamları 51,72 mA eder."
      ],
      after: [
        "Köprü (Wheatstone) devreleri ya da üçgen–yıldız bağlantıları gibi seri veya paralel olarak ayrıştırılamayan devreler bu yöntemle çözülemez; bunlar için Kirchhoff yasalarıyla denklem kurmak ya da üçgen–yıldız dönüşümü uygulamak gerekir. Lise ve meslek lisesi sorularının büyük çoğunluğu ise yukarıdaki adımlarla çözülür."
      ]
    },
    {
      h: "Gerilim bölücü nedir, nasıl hesaplanır?",
      p: [
        "Gerilim bölücü, iki seri direnç kullanarak bir gerilimi daha küçük bir gerilime indiren en basit devredir. Seri devrede gerilim dirençlerle orantılı paylaşıldığı için, iki direncin birleşim noktasından alınan gerilim, R<sub>2</sub>'nin toplam dirençteki payı kadardır. Sensör okuma, potansiyometreyle ses ayarı ve mikrodenetleyicinin giriş seviyesini uyarlama gibi işlerde sık kullanılır."
      ],
      formula: "V_çıkış = V_giriş × R2 ÷ (R1 + R2)\nYük bağlıysa: R2 yerine (R2 ∥ R_yük) kullanılır",
      ol: [
        "<strong>Yüksüz örnek:</strong> V<sub>giriş</sub> = 12 V, R<sub>1</sub> = 10 kΩ, R<sub>2</sub> = 4,7 kΩ. V<sub>çıkış</sub> = 12 × 4,7 ÷ 14,7 = 3,837 V.",
        "<strong>Yük etkisi:</strong> Çıkışa 10 kΩ'luk bir yük bağlanırsa R<sub>2</sub> ∥ R<sub>yük</sub> = (4,7 × 10) ÷ 14,7 = 3,197 kΩ olur.",
        "<strong>Yeni çıkış:</strong> V<sub>çıkış</sub> = 12 × 3,197 ÷ (10 + 3,197) = 2,907 V. Gerilim yaklaşık %24 düştü."
      ],
      after: [
        "Bu örnek gerilim bölücünün en önemli sınırını gösterir: yük direnci bölücü dirençlerinden çok büyük değilse çıkış gerilimi belirgin biçimde düşer. Kural olarak yük direnci R<sub>2</sub>'nin en az 10 katı olmalıdır. Gerilim bölücü bir güç kaynağı değildir; motor, LED şeridi ya da şarj devresi gibi akım çeken yükleri beslemek için regülatör kullanılmalıdır. Hesap için [[arac:gerilim-bolucu-hesapla|Gerilim Bölücü Hesaplama]] aracı yük direncinin etkisini de gösterir. LED'in önüne konacak tek seri direnci hesaplamak istiyorsanız [[bilgi:led-direnci-nasil-hesaplanir|LED direnci]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Standart direnç değerleri (E12) nedir?",
      p: [
        "Dirençler her değerde üretilmez; uluslararası standartla belirlenmiş seriler hâlinde satılır. En yaygın seri olan <strong>E12</strong>, her on kat aralıkta 12 değer içerir ve %10 toleranslı dirençler için tasarlanmıştır. Daha hassas %5 ve %1 toleranslı dirençlerde E24 ve E96 serileri kullanılır. Değerler, bir sonrakiyle tolerans aralıkları birbirine dokunacak biçimde logaritmik olarak dağıtılmıştır."
      ],
      table: {
        head: ["Seri", "Tolerans", "Bir on kat aralıktaki değerler"],
        rows: [
          ["E6", "%20", "10, 15, 22, 33, 47, 68"],
          ["E12", "%10", "10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82"],
          ["E24", "%5", "E12 değerlerine ek olarak 11, 13, 16, 20, 24, 30, 36, 43, 51, 62, 75, 91"]
        ],
        caption: "Değerler 10'un kuvvetleriyle çarpılarak kullanılır: 47 değeri 4,7 Ω, 47 Ω, 470 Ω, 4,7 kΩ, 47 kΩ olarak bulunur."
      },
      after: [
        "Hesapladığınız değer standart seride yoksa en yakın değeri seçin ya da iki standart direnci seri veya paralel bağlayarak hedefe yaklaşın. Örneğin 150 Ω gerekiyorsa E12'de zaten vardır; 160 Ω gerekiyorsa 150 Ω + 10 Ω seri bağlanabilir. Direnç üzerindeki renk halkalarından değeri okumak için [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] rehberi yardımcı olur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Paralelde dirençleri toplamak:</strong> 100 Ω ve 220 Ω paralel 320 Ω değil, 68,75 Ω'dur. Sonuç en küçük dirençten büyük çıkıyorsa hesap yanlıştır.",
        "<strong>Ters değeri almayı unutmak:</strong> 1/R toplamı 0,017576 bulunduktan sonra son adımda 1'i bu sayıya bölmek gerekir; aksi hâlde sonuç ohm değil siemens olur.",
        "<strong>Birimleri karıştırmak:</strong> kΩ ile Ω'yu aynı formülde birlikte kullanmayın; hepsini aynı birime çevirin.",
        "<strong>Gücü kontrol etmemek:</strong> Hesaplanan değerin direnç gücünü (P = I² × R) aşmaması gerekir; aşarsa direnç ısınır ve değeri kayar.",
        "<strong>Yükü göz ardı etmek:</strong> Gerilim bölücüde çıkışa bağlanan devre de paralel bir dirençtir ve çıkış gerilimini düşürür."
      ]
    }
  ],
  faq: [
    ["Seri bağlı dirençlerin eşdeğeri nasıl bulunur?", "Seri bağlı dirençlerin eşdeğeri, dirençlerin değerleri toplanarak bulunur: R eş = R1 + R2 + R3. Örneğin 100, 220 ve 330 ohmluk dirençler seri bağlıysa eşdeğer direnç 650 ohm olur ve seri bağlamak toplam direnci her zaman artırır."],
    ["Paralel direnç formülü nedir?", "Paralel dirençlerde 1/R eş = 1/R1 + 1/R2 + … formülü kullanılır; terslerin toplamı bulunup sonucun tersi alınır. İki direnç için kısa yol R1 × R2 ÷ (R1 + R2) formülüdür. Eşdeğer direnç en küçük dirençten de küçüktür."],
    ["İki eşit direnç paralel bağlanırsa ne olur?", "İki eşit direnç paralel bağlandığında eşdeğer direnç tek bir direncin yarısına iner ve akım iki kola eşit paylaşılır. İki adet 1 kiloohm paralel 500 ohm eder; grubun taşıyabileceği güç de iki katına çıkar."],
    ["Karışık devrede eşdeğer direnç nasıl hesaplanır?", "Önce yalnızca seri ya da yalnızca paralel olan en içteki grup tek dirence indirgenir, devre yeniden çizilir ve işlem tek direnç kalana kadar tekrarlanır. Örneğin 220 ile 330 ohm paralel 132 ohm, buna seri 100 ohm eklenince 232 ohm olur."],
    ["Gerilim bölücü nedir?", "Gerilim bölücü, iki seri direnç kullanarak giriş geriliminin bir kısmını çıkışa veren devredir. Çıkış gerilimi V giriş × R2 ÷ (R1 + R2) formülüyle bulunur. Çıkışa bağlanan yük, çıkış gerilimini düşürdüğü için yükün direnci R2'den çok büyük olmalıdır."],
    ["Seri devrede akım neden aynıdır?", "Seri devrede akımın izleyebileceği tek bir yol vardır ve elektrik yükü bir noktada birikmez ya da kaybolmaz. Bir dirence ne kadar yük giriyorsa o kadarı çıkar; bu nedenle devredeki her noktadan aynı akım geçer, gerilim ise dirençlere paylaşılır."],
    ["Paralel devrede gerilim neden aynıdır?", "Paralel bağlı her direncin iki ucu aynı iki noktaya bağlıdır. İki nokta arasındaki gerilim farkı tek bir değer olduğu için her kol aynı gerilimi görür. Evdeki prizlerin paralel bağlanması da her cihazın aynı şebeke gerilimiyle çalışmasını sağlar."],
    ["Standart direnç değerleri (E12) nedir?", "E12, yüzde 10 toleranslı dirençler için her on kat aralıkta 12 değer tanımlayan standart seridir: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68 ve 82. Bu değerler 10'un kuvvetleriyle çarpılarak ohm, kiloohm ve megaohm aralıklarında kullanılır."],
    ["Paralel bağlı dirençlerin eşdeğeri neden küçülür?", "Paralel bağlanan her direnç akıma yeni bir yol açar. Aynı gerilim altında daha fazla yol daha fazla toplam akım demektir; Ohm kanununa göre akım artarken gerilim sabitse eşdeğer direnç azalır. Bu yüzden sonuç en küçük dirençten de küçüktür."]
  ],
  tools: ["seri-direnc-hesapla", "paralel-direnc-hesapla", "gerilim-bolucu-hesapla"],
  related: ["ohm-kanunu-nedir", "direnc-renk-kodlari-nasil-okunur", "led-direnci-nasil-hesaplanir", "watt-amper-volt-iliskisi"],
  sources: [
    ["MEB – Mesleki ve Teknik Eğitim, elektrik-elektronik modülleri", "https://www.meb.gov.tr/"],
    ["IEC – IEC 60063 tercihli sayı serileri (E serileri)", "https://www.iec.ch/"]
  ]
};
