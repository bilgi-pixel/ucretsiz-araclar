export default {
  slug: "amortisman-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Amortisman Nedir, Nasıl Hesaplanır? Normal ve Azalan Bakiyeler Yöntemi",
  pageTitle: "Amortisman Nasıl Hesaplanır? Normal ve Azalan Bakiyeler",
  description: "Normal amortisman = maliyet × (1 ÷ faydalı ömür). Azalan bakiyelerde oran iki katıdır, %50'yi geçemez. Faydalı ömür tablosu, 2026 gider sınırı, binek araç ve kıst.",
  keywords: ["amortisman nedir", "amortisman nasıl hesaplanır", "amortisman oranları", "azalan bakiyeler yöntemi", "faydalı ömür tablosu", "binek araç amortismanı", "kıst amortisman", "doğrudan gider yazma sınırı"],
  lead: "Amortisman, işletmede birden fazla yıl kullanılan bir varlığın (bilgisayar, araç, makine, mobilya) maliyetinin, <strong>tek seferde değil, faydalı ömrü boyunca yıllara bölünerek gider yazılmasıdır</strong>. Normal yöntemde yıllık amortisman, maliyetin faydalı ömre bölünmesiyle bulunur: 60.000 TL'lik ve faydalı ömrü 4 yıl olan bir bilgisayar için her yıl 15.000 TL. Azalan bakiyeler yönteminde oran iki katına çıkar ve ilk yıllarda daha fazla gider yazılır. Bu sayfada iki yöntemi çözümlü tablolarla, Maliye'nin faydalı ömür listesini, 2026 doğrudan gider sınırını, binek araç kurallarını ve kıst amortismanı bulacaksınız.",
  kisaCevap: [
    "Normal amortisman oranı = 1 ÷ faydalı ömür; yıllık amortisman = maliyet bedeli × oran.",
    "Azalan bakiyeler yönteminde oran normal oranın iki katıdır, %50'yi geçemez ve her yıl kalan net değere uygulanır; son yıl kalanın tamamı gider yazılır.",
    "Faydalı ömürler Hazine ve Maliye Bakanlığının yayımladığı listeden alınır: kişisel bilgisayar 4 yıl, otomobil 5 yıl, büro mobilyası 5 yıl, cep telefonu 3 yıl.",
    "2026 yılında maliyeti 12.000 TL'yi aşmayan demirbaşlar amortismana tabi tutulmadan doğrudan gider yazılabilir.",
    "Binek otomobillerde 2026 yılı için amortismana esas tutar sınırı ÖTV ve KDV hariç 1.380.000 TL, vergiler maliyete eklenmişse 2.600.000 TL'dir.",
    "Binek otomobillerde ilk yıl kıst amortisman uygulanır; ilk yıl ayrılamayan kısım faydalı ömrün son yılında gider yazılır."
  ],
  figure: {
    alt: "60.000 TL'lik, faydalı ömrü 4 yıl olan bilgisayar için yıllık amortisman karşılaştırması: normal yöntemde her yıl 15.000 TL; azalan bakiyelerde 30.000, 15.000, 7.500 ve 7.500 TL.",
    caption: "Toplam amortisman iki yöntemde de 60.000 TL'dir; değişen, giderin yıllara dağılımıdır. Azalan bakiyeler ilk yıl giderini iki katına çıkarır, sonraki yıllarda azaltır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">60.000 TL bilgisayar, 4 yıl faydalı ömür</text>
  <rect x="440" y="48" width="18" height="14" class="sf sb"/><text x="464" y="60" class="sm">Normal (%25)</text>
  <rect x="570" y="48" width="18" height="14" class="p"/><text x="594" y="60" class="sm">Azalan (%50)</text>
  <line x1="70" y1="330" x2="690" y2="330" class="st" fill="none"/>
  <g class="sm end t2">
    <text x="62" y="334">0</text><text x="62" y="234">15.000</text><text x="62" y="134">30.000</text>
  </g>
  <line x1="70" y1="230" x2="690" y2="230" class="sb dash" fill="none"/>
  <line x1="70" y1="130" x2="690" y2="130" class="sb dash" fill="none"/>
  <g>
    <rect x="100" y="230" width="56" height="100" class="sf sb"/><rect x="162" y="130" width="56" height="200" class="p"/>
    <text x="128" y="222" class="sm mid">15.000</text><text x="190" y="122" class="sm mid b p">30.000</text>
    <text x="159" y="352" class="b mid">1. yıl</text>
    <rect x="250" y="230" width="56" height="100" class="sf sb"/><rect x="312" y="230" width="56" height="100" class="p"/>
    <text x="278" y="222" class="sm mid">15.000</text><text x="340" y="222" class="sm mid b p">15.000</text>
    <text x="309" y="352" class="b mid">2. yıl</text>
    <rect x="400" y="230" width="56" height="100" class="sf sb"/><rect x="462" y="280" width="56" height="50" class="p"/>
    <text x="428" y="222" class="sm mid">15.000</text><text x="490" y="272" class="sm mid b p">7.500</text>
    <text x="459" y="352" class="b mid">3. yıl</text>
    <rect x="550" y="230" width="56" height="100" class="sf sb"/><rect x="612" y="280" width="56" height="50" class="p"/>
    <text x="578" y="222" class="sm mid">15.000</text><text x="640" y="272" class="sm mid b p">7.500</text>
    <text x="609" y="352" class="b mid">4. yıl</text>
  </g>
  <text x="360" y="384" class="sm mid">Azalan bakiyeler: 60.000 × %50 = 30.000 → 30.000 × %50 = 15.000 → 15.000 × %50 = 7.500 → kalan 7.500</text>
  <text x="360" y="406" class="sm mid t2">Her iki yöntemde toplam 60.000 TL; son yıl kalan değerin tamamı gider yazılır.</text>
</svg>`
  },
  sections: [
    {
      h: "Amortisman nedir, neden ayrılır?",
      p: [
        "Bir işletme 60.000 TL'ye bilgisayar aldığında bu tutarın tamamını o yılın gideri saymak gerçeği yansıtmaz; çünkü bilgisayar dört-beş yıl boyunca gelir elde etmeye yardım edecektir. Muhasebenin dönemsellik ilkesi, bir varlığın maliyetinin onu kullandığınız yıllara yayılmasını ister. Bu yayma işlemine <strong>amortisman</strong>, her yıl gider yazılan paya da yıllık amortisman payı denir.",
        "Vergi açısından amortisman, varlığın maliyetini yıllar içinde kazançtan indirmenin yasal yoludur. Türkiye'de amortisman kuralları 213 sayılı Vergi Usul Kanunu'nun (VUK) 313 ile 321. maddeleri arasında düzenlenir. İşletmede bir yıldan fazla kullanılan, yıpranmaya, aşınmaya ya da değer kaybına uğrayan gayrimenkuller, demirbaşlar, taşıtlar ve haklar amortismana tabidir. Arsa ve arazi ise yıpranmadığı için amortisman ayrılmaz.",
        "Amortisman bir nakit çıkışı değildir: para varlık alındığında ödenmiştir. Yıllık amortisman yalnızca kâğıt üzerinde gider yazılır ve vergiye esas kazancı azaltır. Bu yüzden FAVÖK gibi nakit odaklı göstergelerde amortisman kâra geri eklenir."
      ]
    },
    {
      h: "Normal amortisman nasıl hesaplanır?",
      p: [
        "Normal amortisman yönteminde (doğrusal yöntem) varlığın maliyet bedeli faydalı ömrü boyunca eşit taksitlerle gider yazılır. Oran faydalı ömürden türetilir ve her yıl aynı maliyet bedeline uygulanır."
      ],
      formula: "Normal amortisman oranı = 1 ÷ faydalı ömür (yıl)\nYıllık amortisman = maliyet bedeli × oran\nÖrnek: 60.000 TL bilgisayar, 4 yıl → oran %25 → yıllık 15.000 TL\nÖrnek: 40.000 TL büro mobilyası, 5 yıl → oran %20 → yıllık 8.000 TL",
      after: [
        "Maliyet bedeline varlığın alış fiyatının yanında, onu kullanılır hâle getirmek için yapılan nakliye, montaj ve kurulum giderleri de dahildir. İndirilebilen KDV ise maliyete eklenmez. Yıl içinde birden fazla varlık alındıysa her biri için ayrı amortisman tablosu tutulur.",
        "Muhasebe kaydında yıllık amortisman, varlığın kullanıldığı yere göre bir gider hesabına (ör. 770 Genel Yönetim Giderleri) borç, 257 Birikmiş Amortismanlar hesabına alacak olarak yazılır. Varlığın maliyeti ile birikmiş amortisman arasındaki farka <strong>net defter değeri</strong> denir."
      ]
    },
    {
      h: "Azalan bakiyeler yöntemi nasıl hesaplanır?",
      p: [
        "Azalan bakiyeler yönteminde ilk yıllarda daha fazla, sonraki yıllarda daha az amortisman ayrılır. Bu yöntem bilgisayar gibi ilk yıllarda hızla değer kaybeden varlıkların gerçek yıpranmasına daha yakındır ve vergiyi erteleme etkisi yaratır. VUK'a göre yalnızca bilanço esasına göre defter tutan mükellefler bu yöntemi seçebilir."
      ],
      formula: "Azalan bakiyeler oranı = normal oran × 2 (en fazla %50)\nYıllık amortisman = önceki yılın net defter değeri × oran\nSon yıl: kalan net değerin tamamı gider yazılır",
      table: {
        head: ["Yıl", "Dönem başı net değer", "Amortisman (%50)", "Birikmiş amortisman", "Dönem sonu net değer"],
        rows: [
          ["1", "60.000", "30.000", "30.000", "30.000"],
          ["2", "30.000", "15.000", "45.000", "15.000"],
          ["3", "15.000", "7.500", "52.500", "7.500"],
          ["4", "7.500", "7.500 (kalanın tamamı)", "60.000", "0"]
        ],
        caption: "60.000 TL'lik, faydalı ömrü 4 yıl olan bilgisayar. Normal oran %25, azalan bakiyeler oranı %50. Tutarlar TL."
      },
      after: [
        "Oran sınırına dikkat edin: faydalı ömrü 3 yıl olan bir varlıkta normal oran %33,33'tür, iki katı %66,67 eder; ancak azalan bakiyeler oranı %50'yi geçemeyeceği için %50 uygulanır. Yöntem seçimi varlık bazında yapılır. Azalan bakiyelerden normal amortismana geçmek mümkündür, ama normal yöntemle başlanan bir varlıkta sonradan azalan bakiyelere geçilemez.",
        "İki yöntemin yıl yıl tablosunu kendi tutarlarınızla görmek için [[arac:amortisman-hesapla|Amortisman Hesaplama aracı]]nı kullanabilirsiniz; araç oranı, net defter değerini ve birikmiş amortismanı her yıl için listeler."
      ]
    },
    {
      h: "Faydalı ömür neye göre belirlenir? Amortisman oranları tablosu",
      p: [
        "Vergi hesabında faydalı ömrü işletme kendisi belirlemez. VUK 315. madde uyarınca Hazine ve Maliye Bakanlığı (Gelir İdaresi) amortismana tabi iktisadi kıymetlerin faydalı ömürlerini ve oranlarını bir listeyle ilan eder; liste 333 sıra numaralı VUK Genel Tebliği ile yayımlanmış, sonraki tebliğlerle güncellenmiştir. Aşağıdaki tablo sık sorulan kalemleri içerir."
      ],
      table: {
        head: ["İktisadi kıymet", "Faydalı ömür", "Normal oran", "Azalan bakiyeler oranı"],
        rows: [
          ["Kişisel bilgisayar, sunucu", "4 yıl", "%25", "%50"],
          ["Bilgisayar yazılımları", "3 yıl", "%33,33", "%50"],
          ["Cep telefonu", "3 yıl", "%33,33", "%50"],
          ["Büro mobilyası ve demirbaşlar", "5 yıl", "%20", "%40"],
          ["Televizyon", "5 yıl", "%20", "%40"],
          ["Fotokopi ve hesap makineleri", "5 yıl", "%20", "%40"],
          ["Otomobil ve taksiler", "5 yıl", "%20", "%40"],
          ["Kamyonet ve hafif kamyon", "4 yıl", "%25", "%50"],
          ["Pencere, duvar ve salon tipi klima", "15 yıl", "%6,66", "%13,32"],
          ["Ticari ve idari bina (betonarme)", "50 yıl", "%2", "%4"]
        ],
        caption: "Kaynak: Gelir İdaresi amortisman listesi (333 sıra no.lu VUK Genel Tebliği ve sonraki değişiklikler). Listede yer almayan ya da tereddüt edilen kalemler için güncel listeye bakın."
      },
      after: [
        "Bu sayfa yazılırken listede kişisel bilgisayarlar için 4 yıl yer almaktadır; bu yüzden \"bilgisayar kaç yılda amorti edilir\" sorusunun vergi açısından cevabı 4 yıldır. Liste zaman zaman güncellendiği için kesin oran için Gelir İdaresi'nin güncel tablosunu ve mali müşavirinizi esas alın."
      ]
    },
    {
      h: "Doğrudan gider yazma sınırı: 2026'da ne kadar?",
      p: [
        "Her küçük demirbaş için yıllarca amortisman tablosu tutmak gereksiz iş yükü yaratacağı için VUK 313. madde, maliyeti belirli bir tutarı aşmayan demirbaşların doğrudan gider yazılmasına izin verir. Bu tutar her yıl yeniden değerleme oranına göre güncellenir.",
        "31 Aralık 2025 tarihli Resmî Gazete'de yayımlanan 588 sıra numaralı VUK Genel Tebliği ile <strong>2026 yılı için bu sınır 12.000 TL</strong> olarak belirlenmiştir. Yani 2026'da 9.500 TL'ye alınan bir yazıcı, amortisman ayrılmadan alındığı yılın gideri olarak yazılabilir; 14.000 TL'lik bir dizüstü bilgisayar ise amortismana tabi tutulur. Doğrudan gider yazmak bir seçimdir, zorunluluk değildir; işletme isterse sınırın altındaki varlık için de amortisman ayırabilir."
      ]
    },
    {
      h: "Binek araçta amortisman ve kıst amortisman",
      p: [
        "Binek otomobiller için Gelir Vergisi ve Kurumlar Vergisi mevzuatında ayrıca sınırlamalar vardır. 332 seri numaralı Gelir Vergisi Genel Tebliği'ne göre 2026 yılında iktisap edilen binek otomobillerde amortismana esas tutar, ÖTV ve KDV hariç <strong>1.380.000 TL</strong>, ÖTV ve KDV maliyete eklenmişse ya da araç ikinci el alınmışsa <strong>2.600.000 TL</strong> ile sınırlıdır. Bu tutarı aşan kısma düşen amortisman kanunen kabul edilmeyen gider sayılır. Araç kiralama işi yapan işletmeler gibi istisnalar vardır.",
        "Akaryakıt, bakım, sigorta ve kredi faizi gibi binek otomobil giderlerinin ise yalnızca %70'i gider yazılabilir; bu %70 kısıtlaması amortismana değil, bu cari giderlere uygulanır. Kiralanan binek otomobillerde 2026 için aylık kira bedelinin 46.000 TL'lik kısmı gider olarak dikkate alınabilir.",
        "Binek otomobillerin bir başka özelliği <strong>kıst amortismandır</strong> (VUK 320). Diğer varlıklarda yılın hangi ayında alındığına bakılmaksızın tam yıl amortisman ayrılırken, binek otomobilde ilk yıl yalnızca aracın aktifte kaldığı ay sayısı kadar amortisman ayrılır; ay kesirleri tam ay sayılır. İlk yıl ayrılamayan kısım faydalı ömrün son yılında gider yazılır."
      ],
      table: {
        head: ["Yıl", "Hesap", "Amortisman"],
        rows: [
          ["2026 (Ekim'de alındı)", "240.000 × 3 ÷ 12", "60.000 TL"],
          ["2027", "1.200.000 × %20", "240.000 TL"],
          ["2028", "1.200.000 × %20", "240.000 TL"],
          ["2029", "1.200.000 × %20", "240.000 TL"],
          ["2030 (son yıl)", "240.000 + ilk yıl ayrılamayan 180.000", "420.000 TL"]
        ],
        caption: "Örnek: ÖTV ve KDV hariç maliyeti 1.200.000 TL olan, normal yöntemle amortismana tabi binek otomobil (5 yıl, %20). Tutar 2026 sınırının altında olduğu için tamamı amortismana esastır."
      }
    },
    {
      h: "Amortisman hesabında sık yapılan hatalar",
      ul: [
        "<strong>KDV'yi maliyete eklemek:</strong> İndirilebilen KDV maliyet bedeline girmez; amortisman KDV hariç tutar üzerinden ayrılır.",
        "<strong>Azalan bakiyeler oranını maliyete uygulamak:</strong> Oran her yıl kalan net değere uygulanır; maliyete uygulanırsa varlık süresinden önce tükenir.",
        "<strong>%50 sınırını unutmak:</strong> Faydalı ömrü 3 yıl ya da daha kısa varlıklarda azalan bakiyeler oranı %50'de kalır.",
        "<strong>Her varlıkta kıst amortisman uygulamak:</strong> Kıst amortisman binek otomobillere özgüdür; diğer varlıklarda alındığı yıl tam yıl amortisman ayrılır.",
        "<strong>Faydalı ömrü kendiniz belirlemek:</strong> Vergi hesabında Maliye'nin listesi bağlayıcıdır; ticari muhasebe standartları için ayrı değerlendirme gerekebilir."
      ],
      after: [
        "Amortismanın şirket kârlılığı göstergelerine etkisini görmek için [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK nedir]] yazısına, bir yatırımın kendini kaç yılda ödediğini hesaplamak için [[arac:geri-odeme-suresi-hesapla|Geri Ödeme Süresi Hesaplama aracı]]na, yüzde ve oran hesaplarını kontrol etmek için [[arac:yuzde-hesapla|Yüzde Hesaplama aracı]]na başvurabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Amortisman nedir?", "Amortisman, işletmede birden fazla yıl kullanılan bilgisayar, taşıt, makine ve mobilya gibi varlıkların maliyetinin faydalı ömürleri boyunca yıllara bölünerek gider yazılmasıdır. Nakit çıkışı değildir, vergiye esas kazancı azaltır."],
    ["Amortisman nasıl hesaplanır?", "Normal yöntemde maliyet bedeli faydalı ömre bölünür ve her yıl bu tutar gider yazılır. 60.000 TL'lik ve faydalı ömrü 4 yıl olan bilgisayar için yıllık amortisman 15.000 TL, oran yüzde 25'tir."],
    ["Normal amortisman ile azalan bakiyeler yöntemi farkı nedir?", "Normal yöntemde her yıl eşit tutar gider yazılır. Azalan bakiyelerde oran iki katına çıkar, yüzde 50'yi geçemez ve her yıl kalan net değere uygulanır; ilk yıllarda daha fazla, sonraki yıllarda daha az gider yazılır."],
    ["Faydalı ömür neye göre belirlenir?", "Vergi hesabında faydalı ömürler Hazine ve Maliye Bakanlığının yayımladığı amortisman listesinden alınır. Örneğin kişisel bilgisayar 4 yıl, otomobil 5 yıl, büro mobilyası 5 yıl, cep telefonu 3 yıl olarak yer alır."],
    ["Bilgisayar kaç yılda amorti edilir?", "Gelir İdaresi'nin amortisman listesinde kişisel bilgisayarların faydalı ömrü 4 yıl, normal amortisman oranı yüzde 25'tir. Azalan bakiyeler yöntemi seçilirse oran yüzde 50 olur; liste güncellemelerini takip etmek gerekir."],
    ["Doğrudan gider yazma sınırı ne kadar?", "588 sıra numaralı VUK Genel Tebliği ile 2026 yılı için doğrudan gider yazılabilecek demirbaş tutarı 12.000 TL olarak belirlenmiştir. Bu tutarı aşmayan demirbaşlar amortismana tabi tutulmadan alındıkları yıl gider yazılabilir."],
    ["Binek araçta amortisman nasıl hesaplanır?", "Binek otomobil 5 yıllık ömürle amortismana tabi tutulur, ancak 2026'da amortismana esas tutar ÖTV ve KDV hariç 1.380.000 TL ile sınırlıdır. İlk yıl kıst amortisman uygulanır, ayrılamayan kısım son yıl gider yazılır."],
    ["Kıst amortisman nedir?", "Kıst amortisman, varlığın alındığı yıl yalnızca aktifte kaldığı ay sayısı kadar amortisman ayrılmasıdır. Vergi Usul Kanunu'nda binek otomobillere özgüdür; ilk yıl ayrılamayan tutar faydalı ömrün son yılında gider yazılır."]
  ],
  tools: ["amortisman-hesapla", "geri-odeme-suresi-hesapla", "yuzde-hesapla", "favok-hesapla"],
  related: ["favok-nedir-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Amortisman oranları listesi", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 213 sayılı Vergi Usul Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.4.213.pdf"],
    ["Resmî Gazete – 31.12.2025 tarihli sayı (VUK Genel Tebliği Sıra No: 588, GVK Genel Tebliği Seri No: 332)", "https://www.resmigazete.gov.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır; vergi uygulaması için mali müşavirinize ve Gelir İdaresi'nin güncel düzenlemelerine başvurun"
};
