export default {
  slug: "otv-nedir-arac-otv-nasil-hesaplanir",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "ÖTV Nedir? Araç ÖTV'si Nasıl Hesaplanır, Matrah Dilimleri ve Örnek",
  pageTitle: "ÖTV Nedir? Araç ÖTV Hesaplama, Matrah ve KDV Örneği",
  description: "ÖTV, belirli mallar için bir kez alınan tüketim vergisidir. Araçta ÖTV = vergisiz fiyat × oran, KDV ise ÖTV dahil tutar üzerinden alınır. Yöntem ve örnek hesap.",
  keywords: ["ötv nedir", "araç ötv hesaplama", "ötv matrahı", "otomobil vergi dilimleri", "ötvsiz araç fiyatı", "ötv ve kdv nasıl hesaplanır", "engelli araç ötv muafiyeti", "elektrikli araç ötv"],
  lead: "ÖTV (Özel Tüketim Vergisi), akaryakıt, motorlu taşıt, alkol-tütün ve bazı dayanıklı tüketim malları için <strong>yalnızca bir kez</strong>, genellikle üretici ya da ithalatçının ilk satışında alınan bir vergidir. Otomobilde ÖTV, aracın vergisiz satış fiyatı (matrah) ile o matrahın düştüğü dilimin oranı çarpılarak bulunur; KDV ise ÖTV eklenmiş tutar üzerinden hesaplanır. Bu nedenle vergiler fiyatı katlanarak büyütür. Dilim sınırları ve oranlar sık değiştiği için bu sayfada yöntemi ve örnek oranlarla hesabı anlatıyoruz.",
  kisaCevap: [
    "ÖTV tek aşamalı bir vergidir: mal ilk kez satıldığında ya da ithal edildiğinde bir kez alınır, ikinci el satışta tekrar alınmaz.",
    "Araç ÖTV'si = ÖTV matrahı (vergisiz satış fiyatı) × matrahın düştüğü dilimin ÖTV oranı.",
    "KDV, ÖTV'nin üzerine eklenir: KDV = (matrah + ÖTV) × %20.",
    "Anahtar teslim fiyat = matrah × (1 + ÖTV oranı) × 1,20.",
    "Vergisiz fiyat = anahtar teslim fiyat ÷ [(1 + ÖTV oranı) × 1,20].",
    "Dilim sınırları ve oranlar Cumhurbaşkanı kararıyla sık değişir; güncel tablo için Gelir İdaresi Başkanlığı'na bakılmalıdır."
  ],
  figure: {
    alt: "Örnek araç fiyatının vergi bileşenleri: 1.000.000 TL vergisiz fiyat, yüzde 70 örnek oranla 700.000 TL ÖTV ve 340.000 TL KDV; anahtar teslim fiyat 2.040.000 TL.",
    caption: "Örnek oranla (%70 ÖTV, %20 KDV) bir otomobilin fiyatı. KDV yalnızca vergisiz fiyata değil, ÖTV dahil tutara uygulandığı için iki vergi birlikte matrahın 1,04 katına ulaşır. Oran yalnızca yöntemi göstermek içindir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Anahtar teslim fiyat nasıl oluşur?</text>
  <text x="360" y="54" class="sm mid t2">Örnek: vergisiz fiyat 1.000.000 TL, örnek ÖTV oranı %70, KDV %20</text>
  <rect x="40" y="80" width="300" height="56" rx="6" class="sf sb"/>
  <rect x="340" y="80" width="210" height="56" class="ps"/>
  <rect x="550" y="80" width="130" height="56" rx="6" class="p"/>
  <text x="190" y="104" class="b mid">Vergisiz fiyat</text><text x="190" y="125" class="sm mid">1.000.000 TL</text>
  <text x="445" y="104" class="b mid">ÖTV</text><text x="445" y="125" class="sm mid">700.000 TL</text>
  <text x="615" y="104" class="b mid sf">KDV</text><text x="615" y="125" class="sm mid sf">340.000 TL</text>
  <line x1="40" y1="150" x2="550" y2="150" class="sp" fill="none"/>
  <text x="295" y="170" class="sm mid p">KDV matrahı = 1.700.000 TL</text>
  <line x1="40" y1="186" x2="680" y2="186" class="st sw" fill="none"/>
  <text x="360" y="208" class="b mid">Anahtar teslim: 2.040.000 TL</text>
  <rect x="40" y="232" width="310" height="148" rx="10" class="sf sb"/>
  <text x="58" y="260" class="b">İleri hesap</text>
  <text x="58" y="290" class="sm">ÖTV = 1.000.000 × 0,70 = 700.000</text>
  <text x="58" y="316" class="sm">KDV = 1.700.000 × 0,20 = 340.000</text>
  <text x="58" y="342" class="sm">Toplam = 1.000.000 × 1,70 × 1,20</text>
  <text x="58" y="366" class="sm b p">= 2.040.000 TL</text>
  <rect x="370" y="232" width="310" height="148" rx="10" class="oks"/>
  <text x="388" y="260" class="b">Geri hesap (ÖTV'siz fiyat)</text>
  <text x="388" y="290" class="sm">Vergisiz = 2.040.000 ÷ (1,70 × 1,20)</text>
  <text x="388" y="316" class="sm">= 2.040.000 ÷ 2,04</text>
  <text x="388" y="342" class="sm b ok">= 1.000.000 TL</text>
  <text x="388" y="366" class="sm t2">Vergi payı fiyatın %51'i</text>
</svg>`
  },
  sections: [
    {
      h: "ÖTV nedir, neden alınır?",
      p: [
        "Özel Tüketim Vergisi, 2002 yılında yürürlüğe giren 4760 sayılı Özel Tüketim Vergisi Kanunu ile getirilmiştir. Daha önce ayrı ayrı alınan pek çok vergi ve fon payının yerine geçmiştir. KDV'den farkı, her mal için değil yalnızca kanuna ekli listelerde sayılan mallar için uygulanmasıdır.",
        "ÖTV <strong>tek aşamalı</strong> bir vergidir: mal üretilip ilk kez satıldığında ya da yurt dışından getirildiğinde bir kez alınır. Bayi, ikinci el satıcı ya da sonraki alıcılar ayrıca ÖTV ödemez. KDV ise her satış aşamasında hesaplanır ve indirim mekanizmasıyla işler.",
        "Verginin amaçları arasında kamu geliri sağlamak, sağlığa zararlı ürünlerin tüketimini sınırlamak, yakıt tüketimini ve dış ticaret açığını etkilemek sayılabilir. Bu nedenle oranlar ekonomik koşullara göre sık değiştirilir; kanun, Cumhurbaşkanı'na belirli sınırlar içinde oranları değiştirme yetkisi verir."
      ]
    },
    {
      h: "ÖTV listeleri: hangi ürünlerde ÖTV var?",
      p: [
        "Kanuna ekli dört liste vardır. Her listenin vergilendirme yöntemi farklıdır; bazılarında yüzde oran, bazılarında birim başına sabit (maktu) tutar uygulanır."
      ],
      table: {
        head: ["Liste", "Kapsam", "Vergileme şekli"],
        rows: [
          ["(I) sayılı liste", "Benzin, motorin, LPG, doğal gaz gibi akaryakıt ve enerji ürünleri", "Litre ya da kilogram başına sabit tutar"],
          ["(II) sayılı liste", "Otomobil, motosiklet, arazi taşıtı, uçak, yat gibi taşıtlar", "Vergisiz fiyat üzerinden yüzde oran"],
          ["(III) sayılı liste", "Alkollü içkiler, tütün ürünleri, kolalı gazozlar", "Yüzde oran ve asgari sabit tutar"],
          ["(IV) sayılı liste", "Cep telefonu, bazı elektronik ve beyaz eşya, kozmetik, lüks tüketim malları", "Yüzde oran"]
        ]
      },
      after: [
        "Akaryakıtta ÖTV fiyatın yüzdesi değil, litre başına sabit bir tutardır; pompa fiyatı düşse de vergi tutarı değişmez. Cep telefonları (IV) sayılı listede yer alır ve ithalatta ayrıca bandrol, harç gibi kalemler de fiyata eklenir. Yurt dışından alışverişteki vergi kalemleri için [[bilgi:yurt-disi-alisveris-gumruk-vergisi|yurt dışı alışveriş gümrük vergisi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Araç ÖTV'si nasıl hesaplanır?",
      p: [
        "Otomobillerde ÖTV'nin dayanağı <strong>ÖTV matrahıdır</strong>; bu, aracın ÖTV ve KDV hariç satış bedelidir. Matrah belirlendikten sonra aracın türüne, motor silindir hacmine (ya da elektrikli araçlarda motor gücüne) ve matrah tutarına göre oran tablosunda hangi dilime düştüğüne bakılır. Bulunan oran tüm matraha uygulanır; gelir vergisindeki gibi kademeli bir hesap yoktur."
      ],
      formula: "ÖTV = Matrah × ÖTV oranı\nKDV = (Matrah + ÖTV) × %20\nAnahtar teslim fiyat = Matrah × (1 + ÖTV oranı) × 1,20",
      after: [
        "Burada en sık gözden kaçan ayrıntı şudur: matrah dilimleri marjinal değildir. Matrah dilim sınırını 1 TL bile geçerse aracın <strong>tamamı</strong> üst dilimin oranıyla vergilendirilir. Üreticilerin ve ithalatçıların fiyatları dilim sınırının hemen altında tutmaya çalışması bu yüzdendir. KDV kısmını ayrıca doğrulamak isterseniz [[arac:kdv-hesapla|KDV Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: ÖTV, KDV ve anahtar teslim fiyat",
      p: [
        "Aşağıdaki hesapta kullanılan oranlar yalnızca yöntemi göstermek için seçilmiş <strong>örnek oranlardır</strong>, güncel tabloyu yansıtmaz. Kendi aracınız için oranı Gelir İdaresi Başkanlığı'nın yayımladığı güncel ÖTV oran tablosundan alın."
      ],
      ol: [
        "<strong>Matrahı belirleyin:</strong> Bayinin vergisiz fiyatı 1.000.000 TL olsun.",
        "<strong>Dilimi bulun:</strong> Aracın motor hacmi ve 1.000.000 TL matrah, tabloda örnek olarak %70 oranlı dilime düşsün.",
        "<strong>ÖTV'yi hesaplayın:</strong> 1.000.000 × 0,70 = 700.000 TL.",
        "<strong>KDV matrahını bulun:</strong> 1.000.000 + 700.000 = 1.700.000 TL.",
        "<strong>KDV'yi hesaplayın:</strong> 1.700.000 × 0,20 = 340.000 TL.",
        "<strong>Anahtar teslim fiyat:</strong> 1.700.000 + 340.000 = 2.040.000 TL. Vergilerin toplamı 1.040.000 TL, yani fiyatın yaklaşık %51'idir."
      ],
      after: [
        "<strong>Dilim sınırı etkisi:</strong> Aynı aracın matrahı bir dilim sınırını aşıp örnek olarak %80 oranlı dilime geçseydi ÖTV 800.000 TL, KDV 360.000 TL, anahtar teslim fiyat 2.160.000 TL olurdu. Matrahtaki küçük bir artış, satış fiyatında 120.000 TL'lik bir sıçramaya yol açabilir. Bir oranın fiyata etkisini hızlıca görmek için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı kullanışlıdır."
      ]
    },
    {
      h: "ÖTV'siz araç fiyatı nasıl bulunur?",
      p: [
        "Elinizde yalnızca anahtar teslim fiyat varsa, hesabı tersine çevirerek vergisiz fiyatı bulabilirsiniz. Bunun için aracın hangi ÖTV oranına tabi olduğunu bilmeniz gerekir. Anahtar teslim fiyat; ÖTV çarpanı (1 + oran) ve KDV çarpanı (1,20) ile bölünür."
      ],
      formula: "Vergisiz fiyat = Anahtar teslim fiyat ÷ [(1 + ÖTV oranı) × 1,20]\nÖrnek: 2.040.000 ÷ (1,70 × 1,20) = 2.040.000 ÷ 2,04 = 1.000.000 TL",
      table: {
        head: ["Örnek ÖTV oranı", "Toplam çarpan (KDV %20 dahil)", "Vergisiz fiyat 1.000.000 TL ise anahtar teslim"],
        rows: [
          ["%25", "1,25 × 1,20 = 1,50", "1.500.000 TL"],
          ["%50", "1,50 × 1,20 = 1,80", "1.800.000 TL"],
          ["%70", "1,70 × 1,20 = 2,04", "2.040.000 TL"],
          ["%80", "1,80 × 1,20 = 2,16", "2.160.000 TL"],
          ["%150", "2,50 × 1,20 = 3,00", "3.000.000 TL"]
        ],
        caption: "Oranlar örnektir. Hangi aracın hangi orana tabi olduğu motor hacmine ya da gücüne ve matraha göre güncel tabloda belirlenir."
      },
      after: [
        "Bayi kampanyalarındaki indirimin vergisiz fiyata mı anahtar teslim fiyata mı uygulandığını anlamak için iki fiyatı [[arac:indirim-orani-hesapla|İndirim Oranı Hesaplama]] aracına girebilirsiniz. Vergisiz fiyattan yapılan indirim, ÖTV ve KDV'yi de düşürdüğü için anahtar teslim fiyata daha büyük yansır."
      ]
    },
    {
      h: "Engelli ÖTV muafiyeti ve elektrikli araçlar",
      p: [
        "<strong>Engelli ÖTV istisnası:</strong> ÖTV Kanunu, belirli engellilik durumlarındaki kişilerin araç alımında ÖTV ödememesine imkân tanır. Ağır engelli olarak tanımlanan (yüzde 90 ve üzeri) kişiler ile ortopedik engeli nedeniyle özel tertibatlı araç kullanması gereken kişiler bu istisnadan yararlanabilir. İstisnanın uygulanabileceği araçlar için her yıl güncellenen bir matrah üst sınırı vardır ve istisnayla alınan araç belirli bir süre içinde satılırsa vergi ödenmesi gerekir. Başvuru öncesinde sağlık kurulu raporu ve güncel şartlar için vergi dairesine danışılmalıdır.",
        "<strong>Elektrikli araçlar:</strong> Yalnızca elektrik motorlu otomobiller içten yanmalı araçlardan ayrı bir oran tablosuna tabidir. Bu araçlarda oran, motor hacmi yerine motor gücü ve matrah tutarına göre belirlenir. Elektrikli araç oranları son yıllarda birkaç kez değiştirildiği için kesin oranı satın alma tarihinde yürürlükte olan karardan kontrol etmek gerekir.",
        "Araç aldıktan sonra her yıl ödenecek vergi ÖTV değil, motorlu taşıtlar vergisidir. Aracınızın yıllık MTV tutarını [[arac:mtv-hesapla|MTV Hesaplama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "ÖTV'yi kim öder, nasıl beyan edilir?",
      p: [
        "Yasal olarak ÖTV'yi vergi dairesine beyan edip ödeyen, malı ilk kez satan üretici ya da ithalatçıdır. Otomobilde bu kişi genellikle bayidir; çünkü (II) sayılı listedeki taşıtlarda vergiyi doğuran olay, aracın ilk iktisabı, yani ilk alıcı adına tescil öncesindeki satıştır. Bayi vergiyi beyan eder, tescil işlemi ancak ÖTV ödendikten sonra yapılabilir. Ekonomik olarak ise verginin tamamı fiyatın içinde son tüketiciye yansır.",
        "Yurt dışından bireysel olarak araç getiren kişi, ÖTV'yi gümrükte ithalat sırasında öder. Bu durumda matrah, gümrük kıymeti ile gümrük vergisi ve diğer ithalat kalemlerinin toplamı üzerinden belirlenir; bu yüzden aynı model için yurt içi fiyatla birebir karşılaştırma yapmak yanıltıcı olabilir.",
        "Ticari araçlar (kamyonet, minibüs, otobüs gibi) otomobillere göre çok daha düşük oranlara tabidir. Bu fark, aynı gövdeye sahip binek ve ticari versiyonların fiyatları arasında büyük uçurum yaratabilir. Ticari olarak tescil edilen aracın sonradan binek araca dönüştürülmesi ise ek vergi doğurur."
      ],
      after: [
        "Fiyat listelerine bakarken \"tavsiye edilen anahtar teslim fiyat\" ifadesinin genellikle ÖTV, KDV ve bayi masraflarını kapsadığını, tescil harcı, trafik sigortası ve plaka gibi kalemleri kapsamadığını unutmayın. Bütçe yaparken bu kalemleri ayrıca ekleyin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>KDV'yi vergisiz fiyata uygulamak:</strong> KDV, ÖTV dahil tutar üzerinden hesaplanır. Vergisiz fiyatın %20'sini almak KDV'yi eksik gösterir.",
        "<strong>Dilimleri kademeli sanmak:</strong> Oran, matrahın yalnızca dilimi aşan kısmına değil tamamına uygulanır.",
        "<strong>Eski tabloyu kullanmak:</strong> Matrah sınırları ve oranlar sık güncellenir; birkaç ay önceki bir tablo bile geçersiz olabilir.",
        "<strong>İkinci el araçta ÖTV aramak:</strong> Daha önce tescil edilmiş araçların el değiştirmesinde ÖTV alınmaz; ikinci el fiyatı piyasa koşullarıyla belirlenir.",
        "<strong>ÖTV'yi MTV ile karıştırmak:</strong> ÖTV alımda bir kez, MTV ise her yıl ocak ve temmuz aylarında iki taksitle ödenir.",
        "<strong>Kampanya indirimini yanlış yere uygulamak:</strong> Vergisiz fiyattan yapılan indirim ÖTV ve KDV'yi de düşürür; anahtar teslim fiyattan yapılan aynı tutardaki indirim ise yalnızca o tutar kadar etki eder."
      ]
    }
  ],
  faq: [
    ["ÖTV nedir, neden alınır?", "Özel Tüketim Vergisi, kanuna ekli listelerdeki akaryakıt, taşıt, alkol-tütün ve bazı lüks tüketim malları için ilk satışta bir kez alınan vergidir. Kamu geliri sağlamak ve belirli ürünlerin tüketimini yönlendirmek amacıyla uygulanır."],
    ["Araç ÖTV'si nasıl hesaplanır?", "Aracın ÖTV ve KDV hariç satış bedeli matrah kabul edilir. Matrahın ve motor hacminin düştüğü dilimin oranı tüm matrahla çarpılarak ÖTV bulunur. Ardından matraha ÖTV eklenir ve bu toplamın %20'si KDV olarak hesaplanır."],
    ["ÖTV matrah dilimleri neye göre belirlenir?", "Otomobillerde dilimler motor silindir hacmine, elektrikli araçlarda motor gücüne ve her iki durumda da aracın vergisiz satış fiyatına göre belirlenir. Sınır tutarlar ve oranlar Cumhurbaşkanı kararıyla değiştirilebildiği için güncel tabloya bakılmalıdır."],
    ["ÖTV'siz araç fiyatı nasıl bulunur?", "Anahtar teslim fiyat, bir artı ÖTV oranı ile 1,20 KDV çarpanının çarpımına bölünür. Örneğin %70 ÖTV'ye tabi 2.040.000 TL'lik aracın vergisiz fiyatı 2.040.000 bölü 2,04 yani 1.000.000 TL'dir."],
    ["ÖTV'nin üzerine KDV eklenir mi?", "Evet. KDV matrahına ÖTV de dahil edilir; yani KDV, vergisiz fiyat ile ÖTV'nin toplamı üzerinden hesaplanır. Bu yüzden iki vergi birbirini büyütür ve toplam vergi yükü oranların basit toplamından fazladır."],
    ["Engelli araç ÖTV muafiyeti nedir?", "Ağır engelli kişiler ile ortopedik engeli nedeniyle özel tertibatlı araç kullanması gerekenler, kanundaki şartları sağladıklarında araç alımında ÖTV ödemez. Muafiyetin matrah üst sınırı her yıl güncellenir ve araç belirli süre içinde satılırsa vergi doğar."],
    ["Elektrikli araçlarda ÖTV oranı kaç?", "Yalnızca elektrik motorlu otomobiller ayrı bir tabloya tabidir ve oran motor gücü ile vergisiz fiyata göre değişir. Bu oranlar son yıllarda birkaç kez güncellendiği için satın alma tarihindeki geçerli karardan kontrol edilmelidir."],
    ["Telefon ve akaryakıtta ÖTV var mı?", "Evet. Akaryakıt (I) sayılı listede yer alır ve litre başına sabit tutarla vergilendirilir. Cep telefonları ise (IV) sayılı listededir ve yüzde oranla ÖTV'ye tabidir; ithal cihazlarda buna ayrıca başka yasal kalemler eklenir."]
  ],
  tools: ["kdv-hesapla", "yuzde-hesapla", "mtv-hesapla", "indirim-orani-hesapla"],
  related: ["yurt-disi-alisveris-gumruk-vergisi", "kdv-tevkifati-nasil-hesaplanir", "damga-vergisi-nasil-hesaplanir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Özel Tüketim Vergisi", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 4760 sayılı Özel Tüketim Vergisi Kanunu", "https://www.mevzuat.gov.tr/"],
    ["Resmî Gazete – Cumhurbaşkanı kararları", "https://www.resmigazete.gov.tr/"]
  ],
  uyari: "örnekteki oranlar temsilîdir; güncel ÖTV oranı ve muafiyet şartları için Gelir İdaresi Başkanlığı'na başvurun"
};
