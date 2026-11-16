export default {
  slug: "satranc-elo-puani-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Satranç Elo Puanı Nasıl Hesaplanır? K Katsayısı ve Beklenen Skor",
  pageTitle: "Elo Puanı Nasıl Hesaplanır? K Katsayısı, Beklenen Skor, FIDE",
  description: "Elo puanı değişimi K × (gerçek skor − beklenen skor) formülüyle hesaplanır. Beklenen skor formülü, FIDE K katsayıları (40, 20, 10), 400 puan kuralı ve çözümlü örnekler.",
  keywords: ["elo puanı nasıl hesaplanır", "satranç elo hesaplama", "k katsayısı nedir", "beklenen skor", "fide rating", "ukd puanı", "elo sistemi nedir", "satranç puan farkı"],
  lead: "Elo puanındaki değişim, <strong>K × (gerçek skor − beklenen skor)</strong> formülüyle hesaplanır: galibiyet 1, beraberlik 0,5, yenilgi 0 puan sayılır, beklenen skor ise iki oyuncunun puan farkından <strong>E = 1 / (1 + 10<sup>(R<sub>rakip</sub> − R<sub>siz</sub>)/400</sup>)</strong> formülüyle bulunur. 1600 puanlı bir oyuncu 1800 puanlı rakibini yenerse beklenen skoru 0,24 olduğundan K = 20 ile yaklaşık 15,2 puan kazanır. Bu sayfada FIDE'nin K katsayılarını, 400 puan kuralını, ulusal ve çevrim içi puanların neden farklı olduğunu ve turnuva sonucu hesabını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Beklenen skor: E = 1 / (1 + 10^((rakip puanı − sizin puanınız) / 400)); 0 ile 1 arasında bir sayıdır.",
    "Yeni puan = eski puan + K × (S − E); S galibiyette 1, beraberlikte 0,5, yenilgide 0'dır.",
    "FIDE'de K = 40 yeni oyuncular (30 oyun tamamlanana kadar) ve 2300 altındaki 18 yaş gençler, K = 20 puanı 2400'ün altında olanlar, K = 10 bir kez 2400'e ulaşmış oyuncular içindir.",
    "Puan farkı 200 olduğunda düşük puanlı oyuncunun beklenen skoru yaklaşık 0,24, 400 olduğunda yaklaşık 0,09'dur.",
    "FIDE hesabında 400'den büyük puan farkı, 2650 altındaki oyuncular için 400 kabul edilir.",
    "Eşit puanlı iki oyuncuda K = 20 ile kazanan 10 puan alır, kaybeden 10 puan verir."
  ],
  figure: {
    alt: "Elo beklenen skor eğrisi: yatay eksende puan farkı eksi 400'den artı 400'e, dikey eksende beklenen skor 0 ile 1 arasında; örnek olarak 200 puan geride olan oyuncunun beklenen skoru 0,24 ve K 20 ile galibiyette artı 15,2, beraberlikte artı 5,2, yenilgide eksi 4,8 puan.",
    caption: "Beklenen skor, puan farkının S biçimli bir fonksiyonudur. 1600 puanlı oyuncu 1800 puanlı rakibe karşı 0,24 beklenen skora sahiptir; K = 20 ile galibiyet +15,19, beraberlik +5,19, yenilgi −4,81 puan getirir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Beklenen skor ve puan farkı</text>
  <line x1="60" y1="300" x2="460" y2="300" class="st" fill="none"/>
  <line x1="60" y1="60" x2="60" y2="300" class="st" fill="none"/>
  <line x1="60" y1="180" x2="460" y2="180" class="sb dash" fill="none"/>
  <line x1="260" y1="60" x2="260" y2="300" class="sb dash" fill="none"/>
  <polyline points="60,278.2 85,271.8 110,263.8 135,254.0 160,242.3 185,228.8 210,213.6 235,197.2 260,180.0 285,162.8 310,146.4 335,131.2 360,117.7 385,106.0 410,96.2 435,88.2 460,81.8" class="sp sw" fill="none"/>
  <g class="sm">
    <text x="54" y="304" class="end mu">0</text><text x="54" y="184" class="end mu">0,5</text><text x="54" y="64" class="end mu">1</text>
    <text x="60" y="320" class="mid mu">−400</text><text x="160" y="320" class="mid mu">−200</text><text x="260" y="320" class="mid mu">0</text><text x="360" y="320" class="mid mu">+200</text><text x="460" y="320" class="mid mu">+400</text>
  </g>
  <text x="260" y="342" class="sm mid">sizin puanınız − rakibin puanı</text>
  <circle cx="160" cy="242.3" r="7" class="a"/>
  <line x1="160" y1="242.3" x2="160" y2="300" class="sa dash" fill="none"/>
  <text x="170" y="236" class="sm b">−200 → E = 0,24</text>
  <circle cx="360" cy="117.7" r="7" class="ok"/>
  <text x="370" y="112" class="sm b ok">+200 → E = 0,76</text>
  <rect x="490" y="60" width="210" height="240" rx="10" class="sf sb"/>
  <text x="595" y="86" class="b mid">1600, 1800'e karşı</text>
  <text x="595" y="108" class="sm mid">K = 20, E = 0,240</text>
  <rect x="506" y="122" width="178" height="44" rx="6" class="oks"/>
  <text x="518" y="150" class="sm">Galibiyet</text><text x="672" y="150" class="b end ok">+15,19</text>
  <rect x="506" y="174" width="178" height="44" rx="6" class="ps"/>
  <text x="518" y="202" class="sm">Beraberlik</text><text x="672" y="202" class="b end">+5,19</text>
  <rect x="506" y="226" width="178" height="44" rx="6" class="dgs"/>
  <text x="518" y="254" class="sm">Yenilgi</text><text x="672" y="254" class="b end dg">−4,81</text>
  <rect x="20" y="362" width="680" height="44" rx="8" class="ps"/>
  <text x="36" y="390" class="sm">Δ = K × (S − E) · S: galibiyet 1, beraberlik 0,5, yenilgi 0 · iki oyuncunun beklenen skorları toplamı 1'dir</text>
</svg>`
  },
  sections: [
    {
      h: "Elo sistemi nedir?",
      p: [
        "Elo sistemi, oyuncuların göreli gücünü tek bir sayıyla ifade eden ve her maçtan sonra bu sayıyı sonuca göre güncelleyen bir derecelendirme yöntemidir. Adını, yöntemi geliştiren Macar asıllı Amerikalı fizikçi ve satranç ustası Arpad Elo'dan alır. Dünya Satranç Federasyonu (FIDE) sistemi 1970'te benimsedi ve o tarihten beri uluslararası satranç puanları Elo esaslı hesaplanır.",
        "Sistemin temel fikri şudur: iki oyuncu arasındaki puan farkı, maçın beklenen sonucunu belirler. Bir oyuncu beklenenden iyi oynarsa puan kazanır, kötü oynarsa kaybeder. Kazanılan ya da kaybedilen puan, sonucun ne kadar \"sürpriz\" olduğuyla orantılıdır. Güçlü rakibi yenmek çok, zayıf rakibi yenmek az puan kazandırır.",
        "Elo sistemi bir olasılık modeline dayanır; kesin bir tahmin vermez. 200 puan fark, düşük puanlı oyuncunun her maçı kaybedeceği anlamına gelmez; uzun vadede yaklaşık her dört maçtan birinde skor alabileceğini gösterir. Olasılık kavramının temelleri için [[bilgi:olasilik-nasil-hesaplanir|olasılık nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Beklenen skor formülü nedir?",
      p: [
        "Beklenen skor (E), bir oyuncunun belirli bir rakibe karşı bir maçtan ortalama olarak almasının beklendiği puandır. 0 ile 1 arasında değer alır: 0,5 eşit güç, 0,76 belirgin üstünlük demektir. İki oyuncunun beklenen skorlarının toplamı her zaman 1'dir."
      ],
      formula: "E_A = 1 / (1 + 10^((R_B − R_A) / 400))\nE_B = 1 − E_A\nÖrnek: R_A = 1600, R_B = 1800 → E_A = 1 / (1 + 10^0,5) = 1 / 4,162 ≈ 0,240",
      table: {
        head: ["Puan farkı (siz − rakip)", "Beklenen skorunuz", "Yorum"],
        rows: [
          ["0", "0,50", "Eşit güç"],
          ["+100", "0,64", "Hafif favori"],
          ["+200", "0,76", "Belirgin favori"],
          ["+300", "0,85", "Güçlü favori"],
          ["+400", "0,91", "Çok güçlü favori"],
          ["+500", "0,95", "FIDE hesabında 2650 altı için 400 gibi sayılır"],
          ["−200", "0,24", "Rakip belirgin favori"]
        ],
        caption: "Değerler lojistik formülle hesaplanmıştır. FIDE resmî hesaplarda beklenen skoru yönetmelikteki tablodan okur; farklar en fazla birkaç binde birdir."
      },
      after: [
        "Formüldeki 400 sayısı ölçeği belirler: 400 puan fark, güçlü oyuncunun beklenen skorunu zayıf oyuncununkinin 10 katına çıkarır (0,909 / 0,091 ≈ 10). Formüldeki üslü ifadenin mantığını [[bilgi:logaritma-nasil-hesaplanir|logaritma]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Elo puanı nasıl hesaplanır? Adım adım",
      ol: [
        "<strong>Puanları yazın:</strong> Siz 1600, rakibiniz 1800.",
        "<strong>Beklenen skoru bulun:</strong> E = 1 / (1 + 10^((1800 − 1600)/400)) = 1 / (1 + 10^0,5) ≈ 0,240.",
        "<strong>Gerçek skoru belirleyin:</strong> Kazandıysanız S = 1, berabere kaldıysanız S = 0,5, kaybettiyseniz S = 0.",
        "<strong>K katsayısını seçin:</strong> FIDE'de puanı 2400'ün altında olan deneyimli bir oyuncu için K = 20.",
        "<strong>Değişimi hesaplayın:</strong> Galibiyet: 20 × (1 − 0,240) = +15,19. Beraberlik: 20 × (0,5 − 0,240) = +5,19. Yenilgi: 20 × (0 − 0,240) = −4,81.",
        "<strong>Yeni puanı bulun:</strong> Galibiyette 1600 + 15,19 ≈ 1615. Rakibiniz aynı anda 15,19 puan kaybeder (onun K'si de 20 ise)."
      ],
      formula: "Yeni puan = Eski puan + K × (S − E)",
      after: [
        "Bu hesabı kendi puanınız, rakibinizin puanı ve maç sonucuyla anında görmek için [[arac:satranc-elo-hesapla|Elo Puanı Hesaplama]] aracını kullanabilirsiniz; araç galibiyet, beraberlik ve yenilgi senaryolarını birlikte gösterir."
      ]
    },
    {
      h: "K katsayısı nedir, kaç alınır? FIDE kuralları",
      p: [
        "K katsayısı, tek bir maçın puanı ne kadar değiştirebileceğini belirleyen çarpandır. Büyük K, puanın hızlı değişmesini sağlar; yeni ve gelişmekte olan oyuncuların gerçek seviyelerine çabuk ulaşması için uygundur. Küçük K, deneyimli ve istikrarlı oyuncuların puanının tek bir kötü günden fazla etkilenmemesini sağlar.",
        "FIDE'nin 2024'ten bu yana uygulanan derecelendirme yönetmeliğine göre klasik (uzun süreli) oyunlarda K katsayıları şöyledir:"
      ],
      table: {
        head: ["K", "Kimler için (FIDE, klasik satranç)"],
        rows: [
          ["40", "Derecelendirme listesine yeni giren oyuncu, en az 30 oyunluk etkinlikleri tamamlayana kadar"],
          ["40", "18. doğum gününün olduğu yılın sonuna kadar bütün oyuncular, puanları 2300'ün altında kaldığı sürece"],
          ["20", "Puanı 2400'ün altında kalan oyuncular"],
          ["10", "Yayımlanan puanı bir kez 2400'e ulaşmış oyuncular; puan sonradan 2400'ün altına düşse de 10 kalır"]
        ],
        caption: "Ek kural: bir derecelendirme döneminde oynanan oyun sayısı n ise K, K × n çarpımı 700'ü aşmayacak en büyük tam sayıya indirilir. Kurallar değişebilir; güncel metin için FIDE yönetmeliğine bakın."
      },
      after: [
        "Yönetmelik ayrıca iki önemli ayrıntı içerir. Birincisi <strong>400 puan kuralıdır</strong>: 2650'nin altındaki oyuncular için 400'den büyük puan farkları hesapta 400 kabul edilir; böylece çok zayıf bir rakibi yenen oyuncu yine de küçük bir puan kazanır. İkincisi, listeye ilk kez girecek oyuncunun puanının yayımlanması için puanlı rakiplere karşı en az 5 oyun oynamış olması ve ilk puanın en az 1400 olması gerekir. Çevrim içi platformlar ve kulüpler ise farklı K değerleri (ör. 16, 24, 32) kullanabilir; araçtaki seçenekler bunun içindir."
      ]
    },
    {
      h: "Daha güçlü rakibi yenince neden çok puan kazanılır?",
      p: [
        "Çünkü kazanılan puan, gerçek sonuç ile beklenen sonuç arasındaki farkla orantılıdır. Güçlü bir rakibe karşı beklenen skorunuz düşüktür; kazandığınızda S − E farkı büyük çıkar. Zayıf bir rakibe karşı ise zaten kazanmanız beklenir; kazanmak az puan getirir, kaybetmek çok puan götürür."
      ],
      table: {
        head: ["Siz", "Rakip", "Beklenen skor", "Galibiyet (K = 20)", "Yenilgi (K = 20)"],
        rows: [
          ["1600", "1800", "0,240", "+15,19", "−4,81"],
          ["1600", "1700", "0,360", "+12,80", "−7,20"],
          ["1600", "1600", "0,500", "+10,00", "−10,00"],
          ["1700", "1600", "0,640", "+7,20", "−12,80"],
          ["1800", "1600", "0,760", "+4,81", "−15,19"],
          ["2000", "1600", "0,909", "+1,82", "−18,18"]
        ]
      },
      after: [
        "Tablonun simetrisine dikkat edin: 1600'ün 1800'ü yenmesiyle kazandığı puan, 1800'ün 1600'e yenilmesiyle kaybettiği puana eşittir. İki oyuncunun K'si aynıysa Elo sistemi \"sıfır toplamlı\"dır; bir tarafın kazandığı puanı diğeri kaybeder."
      ]
    },
    {
      h: "Turnuva sonucunda puan nasıl hesaplanır?",
      p: [
        "Resmî hesaplamada puanlar genellikle her maçtan sonra değil, bir derecelendirme dönemi (FIDE'de aylık liste) sonunda güncellenir. Dönem içinde oynanan bütün oyunlar için beklenen skorlar toplanır, gerçek skorlarla karşılaştırılır ve fark K ile çarpılır. Bu yüzden dönem içindeki maç sırası sonucu değiştirmez."
      ],
      ol: [
        "<strong>Örnek:</strong> 1500 puanlı bir oyuncu 5 turluk bir turnuvada 1550 (kazandı), 1450 (berabere), 1620 (kaybetti), 1500 (kazandı) ve 1700 (berabere) puanlı rakiplerle oynuyor.",
        "Beklenen skorlar: 0,429 + 0,571 + 0,334 + 0,500 + 0,240 ≈ 2,074.",
        "Gerçek skor: 1 + 0,5 + 0 + 1 + 0,5 = 3.",
        "Fark: 3 − 2,074 = 0,926. K = 20 ile değişim 20 × 0,926 ≈ +18,5 puan.",
        "Rakiplerin puan [[bilgi:ortalama-medyan-mod-nedir|ortalaması]] yaklaşık 1564 olduğu için bu sonuç, oyuncunun turnuvada kendi puanının üzerinde bir performans gösterdiğini anlatır. Yeni puan yaklaşık 1518,5 olur. K × n = 20 × 5 = 100 olduğu için 700 sınırına takılmaz."
      ],
      after: [
        "Turnuva ya da kulüp içi maçlarda oyuncuların toplam puanlarını ve sıralamasını tutmak için [[arac:oyun-puan-tablosu|Oyun Puan Tablosu]] aracını kullanabilirsiniz. Beklenen ve gerçek skoru yüzdeye çevirmek için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı işinize yarar."
      ]
    },
    {
      h: "FIDE puanı ile UKD aynı mı? Çevrim içi puanlar neden farklı?",
      p: [
        "Hayır. <strong>FIDE puanı</strong> uluslararası federasyonun, <strong>UKD (Ulusal Kuvvet Derecesi)</strong> ise Türkiye Satranç Federasyonu'nun ulusal derecelendirmesidir. İkisi de Elo esaslıdır ama farklı oyuncu havuzlarında, farklı turnuvalardan ve kendi yönetmeliklerindeki parametrelerle hesaplanır. Bu yüzden aynı oyuncunun FIDE puanı ile UKD'si birbirinden farklı olabilir. UKD'nin başlangıç değeri, K katsayıları ve hangi turnuvaların hesaba katıldığı federasyonun yayımladığı güncel yönetmelikte yer alır.",
        "Çevrim içi satranç platformlarındaki puanlar ise ayrı sistemlerdir. Bazı büyük platformlar Elo yerine, puanın ne kadar güvenilir olduğunu da hesaba katan Glicko ya da Glicko-2 yöntemlerini kullanır; yeni hesaplarda puan çok hızlı değişir, düzenli oynadıkça yavaşlar. Başlangıç puanları, oyuncu havuzları ve zaman kontrolleri (bullet, blitz, hızlı, klasik) farklı olduğu için bir platformdaki 1800 puan başka bir platformdaki 1800'e ya da FIDE'deki 1800'e eşit değildir."
      ]
    },
    {
      h: "Başlangıç Elo puanı kaçtır? Elo başka nerelerde kullanılır?",
      p: [
        "Elo sisteminde evrensel bir başlangıç puanı yoktur. FIDE'de ilk puan, oyuncunun puanlı rakiplere karşı oynadığı ilk oyunların sonuçlarından hesaplanır ve yönetmelik gereği en az 1400 olmalıdır. Kulüpler ve çevrim içi sistemler çoğu zaman 1000, 1200 ya da 1500 gibi sabit bir başlangıç puanı verir ve ilk oyunlarda yüksek K ile puanın hızla gerçek seviyeye oturmasını sağlar.",
        "Elo mantığı satranç dışında da yaygındır: go ve dama gibi strateji oyunlarında, futbol ve basketbol gibi spor dallarında takımların güç sıralamalarında, video oyunlarında oyuncuları benzer seviyedeki rakiplerle eşleştirmek için ve hatta iki seçenek arasında tercih yapılan sıralama sistemlerinde kullanılır. Futbolda milli takımların dünya sıralaması da Elo tabanlı bir yönteme dayanır. Bu sayfadaki hesaplar yalnızca oyun gücünün ölçülmesiyle ilgilidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Puan farkını ters yazmak:</strong> Üsteki ifade (rakip − siz)'dir; işaret ters olursa beklenen skor 1'den çıkarılmış hâli çıkar.",
        "<strong>K'yi yanlış seçmek:</strong> FIDE'de genç, yeni ya da 2400 üstü oyuncu olmanıza göre K değişir.",
        "<strong>Her maçtan sonra yuvarlamak:</strong> Resmî hesapta dönem sonunda toplu hesap yapılır ve yuvarlama en sonda uygulanır.",
        "<strong>Farklı sistemlerin puanlarını karşılaştırmak:</strong> FIDE, UKD ve çevrim içi puanlar farklı havuzlara aittir.",
        "<strong>400 kuralını unutmak:</strong> Çok büyük farklarda FIDE hesabı farkı 400'de sınırlar (2650 altı oyuncular için)."
      ]
    }
  ],
  faq: [
    ["Elo puanı nasıl hesaplanır?", "Önce iki oyuncunun puan farkından beklenen skor bulunur, sonra puan değişimi K × (gerçek skor − beklenen skor) formülüyle hesaplanır. 1600 puanlı oyuncu 1800'ü yenerse beklenen skor 0,24 olduğundan K = 20 ile yaklaşık 15,2 puan kazanır."],
    ["K katsayısı nedir, kaç alınır?", "K katsayısı bir maçın puanı ne kadar değiştirebileceğini belirler. FIDE'de yeni oyuncular ilk 30 oyunda ve 2300 altındaki 18 yaş gençler için 40, puanı 2400'ün altındakiler için 20, bir kez 2400'e ulaşmış oyuncular için 10'dur."],
    ["Beklenen skor formülü nedir?", "Beklenen skor E = 1 / (1 + 10^((rakip puanı − sizin puanınız) / 400)) formülüyle hesaplanır. Eşit puanlı oyuncularda 0,5, 200 puan önde olan oyuncuda yaklaşık 0,76, 400 puan öndekinde yaklaşık 0,91 çıkar."],
    ["Daha güçlü rakibi yenince neden çok puan kazanılır?", "Kazanılan puan, gerçek sonuç ile beklenen sonuç arasındaki farkla orantılıdır. Güçlü rakibe karşı beklenen skor düşük olduğu için galibiyet büyük bir sürprizdir ve fark büyük çıkar; zayıf rakibi yenmek ise az puan kazandırır."],
    ["FIDE puanı ile UKD aynı mı?", "Hayır. FIDE puanı uluslararası federasyonun, UKD ise Türkiye Satranç Federasyonu'nun ulusal derecelendirmesidir. İkisi de Elo esaslıdır ama farklı turnuvalar ve parametrelerle hesaplandığı için aynı oyuncuda farklı değerler görülebilir."],
    ["Çevrim içi satranç puanları neden farklı?", "Çevrim içi platformlar farklı başlangıç puanları, farklı oyuncu havuzları ve zaman kontrolleri kullanır; bazıları Elo yerine Glicko ya da Glicko-2 yöntemiyle hesaplar. Bu nedenle bir platformdaki puan diğerine ya da FIDE puanına doğrudan eşit değildir."],
    ["Başlangıç Elo puanı kaçtır?", "Evrensel bir başlangıç puanı yoktur. FIDE'de ilk puan ilk oyunların sonuçlarından hesaplanır ve en az 1400 olmalıdır; kulüpler ve çevrim içi sistemler çoğu zaman 1000, 1200 ya da 1500 gibi sabit bir değerle başlatır."],
    ["Elo sistemi başka oyunlarda da kullanılır mı?", "Evet, go ve dama gibi strateji oyunlarında, futbol ve basketbol takımlarının güç sıralamalarında ve video oyunlarında eşleştirme için Elo ya da Elo'dan türetilmiş yöntemler kullanılır. Futbolda milli takımların dünya sıralaması da Elo tabanlıdır."],
    ["Eşit puanlı iki oyuncu karşılaşırsa kaç puan değişir?", "Eşit puanda beklenen skor 0,5'tir. K = 20 ile kazanan 20 × 0,5 = 10 puan alır, kaybeden 10 puan kaybeder; beraberlikte ise iki oyuncunun puanı da değişmez."]
  ],
  tools: ["satranc-elo-hesapla", "yuzde-hesapla", "oyun-puan-tablosu"],
  related: ["olasilik-nasil-hesaplanir", "logaritma-nasil-hesaplanir", "ortalama-medyan-mod-nedir"],
  sources: [
    ["FIDE – Derecelendirme yönetmeliği (FIDE Handbook B.02)", "https://handbook.fide.com/chapter/B022024"],
    ["Türkiye Satranç Federasyonu", "https://www.tsf.org.tr/"]
  ]
};
