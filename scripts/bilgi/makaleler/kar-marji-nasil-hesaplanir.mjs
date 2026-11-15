export default {
  slug: "kar-marji-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Kâr Marjı ve Kâr Oranı Nasıl Hesaplanır? Farkları ve Örnekler",
  pageTitle: "Kâr Marjı Hesaplama: Marj ile Kâr Oranı (Markup) Farkı",
  description: "Kâr marjı kârın satış fiyatına, kâr oranı (markup) maliyete oranıdır. 100 TL'ye alınıp 150 TL'ye satılan üründe marj %33,3, kâr oranı %50'dir. Formüller ve örnekler.",
  keywords: ["kar marjı hesaplama", "kar oranı hesaplama", "kar marjı ile kar oranı farkı", "markup nedir", "maliyete kar ekleme", "satış fiyatı hesaplama", "brüt kar marjı", "kdv dahil fiyatta kar"],
  lead: "Kâr marjı, kârın <strong>satış fiyatına</strong> oranıdır; kâr oranı (markup) ise kârın <strong>maliyete</strong> oranıdır. 100 TL'ye aldığınız bir ürünü 150 TL'ye satarsanız 50 TL kâr edersiniz: kâr oranınız %50, kâr marjınız ise %33,3 olur. İki oranın karıştırılması, fiyatlamada en sık yapılan ve kârı sessizce eriten hatadır. Bu sayfada iki formülü, birbirine çevirme yöntemini, hedef marja göre satış fiyatı belirlemeyi, KDV ve indirimin kâra etkisini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Kâr = satış fiyatı − maliyet (KDV hariç tutarlarla).",
    "Kâr marjı (%) = kâr ÷ satış fiyatı × 100.",
    "Kâr oranı / markup (%) = kâr ÷ maliyet × 100.",
    "Hedef marja göre satış fiyatı = maliyet ÷ (1 − marj); %30 marj için 100 TL maliyet → 142,86 TL.",
    "Çevirme: marj = markup ÷ (1 + markup); markup = marj ÷ (1 − marj).",
    "Kâr hesabı KDV hariç fiyatla yapılır; KDV dahil fiyattan önce KDV ayrılmalıdır."
  ],
  figure: {
    alt: "150 TL satış fiyatlı bir ürünün çubuk gösterimi: 100 TL maliyet ve 50 TL kâr. Kâr maliyete bölündüğünde yüzde 50 kâr oranı, satış fiyatına bölündüğünde yüzde 33,3 kâr marjı. Altta marj ile markup karşılık tablosu.",
    caption: "Aynı 50 TL kâr, neye bölündüğüne göre iki farklı yüzde verir. Fiyat listesi hazırlarken hangi oranla çalıştığınızı açıkça yazın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı kâr, iki farklı yüzde</text>
  <rect x="60" y="60" width="400" height="56" rx="6" class="sf sb"/>
  <text x="260" y="94" class="b mid">Maliyet 100 TL</text>
  <rect x="460" y="60" width="200" height="56" rx="6" class="p"/>
  <text x="560" y="94" class="b mid sf">Kâr 50 TL</text>
  <line x1="60" y1="130" x2="660" y2="130" class="st" fill="none"/>
  <line x1="60" y1="124" x2="60" y2="136" class="st" fill="none"/><line x1="660" y1="124" x2="660" y2="136" class="st" fill="none"/>
  <text x="360" y="152" class="sm mid t2">Satış fiyatı 150 TL (KDV hariç)</text>
  <rect x="20" y="172" width="330" height="96" rx="10" class="ps"/>
  <text x="40" y="200" class="b">Kâr oranı (markup)</text>
  <text x="40" y="226" class="sm t2">kâr ÷ maliyet = 50 ÷ 100</text>
  <text x="40" y="256" class="xl p">%50</text>
  <rect x="370" y="172" width="330" height="96" rx="10" class="oks"/>
  <text x="390" y="200" class="b">Kâr marjı</text>
  <text x="390" y="226" class="sm t2">kâr ÷ satış = 50 ÷ 150</text>
  <text x="390" y="256" class="xl ok">%33,3</text>
  <rect x="20" y="286" width="680" height="120" rx="10" class="sf sb"/>
  <text x="40" y="312" class="b">Karşılıklar</text>
  <g class="sm mid">
    <text x="180" y="312" class="b">Markup</text><text x="260" y="312">%25</text><text x="340" y="312">%50</text><text x="420" y="312">%100</text><text x="500" y="312">%150</text><text x="580" y="312">%200</text>
    <text x="180" y="342" class="b ok">Marj</text><text x="260" y="342" class="ok">%20</text><text x="340" y="342" class="ok">%33,3</text><text x="420" y="342" class="ok">%50</text><text x="500" y="342" class="ok">%60</text><text x="580" y="342" class="ok">%66,7</text>
  </g>
  <text x="40" y="376" class="sm t2">Markup ne kadar artarsa artsın marj %100'e ulaşamaz.</text>
  <text x="40" y="396" class="sm t2">Marj = markup ÷ (1 + markup) · markup = marj ÷ (1 − marj)</text>
</svg>`
  },
  sections: [
    {
      h: "Kâr marjı ve kâr oranı (markup) nedir?",
      p: [
        "Her iki ölçü de aynı kârı anlatır ama farklı bir tabana göre yüzdeye çevirir. <strong>Kâr marjı</strong>, her 100 TL'lik satıştan kaç TL'nin kâr olarak kaldığını gösterir; şirketlerin finansal tablolarında ve sektör karşılaştırmalarında kullanılan ölçü budur. <strong>Kâr oranı</strong> (İngilizce markup, Türkçede \"maliyete kâr ekleme oranı\" da denir) ise maliyetin üzerine yüzde kaç eklendiğini gösterir; esnafın günlük fiyatlamada en çok kullandığı ölçüdür.",
        "Sorun, iki oranın da günlük dilde \"kâr yüzdesi\" diye anılmasıdır. Tedarikçiniz \"%30 marjla çalışıyoruz\", muhasebeciniz \"kâr marjınız %20\", çalışanınız \"maliyetin üstüne %30 koydum\" dediğinde üçü de farklı şeyleri kastediyor olabilir. Fiyat listelerinde ve hedeflerde hangi oranın kullanıldığını açıkça yazmak bu yüzden önemlidir."
      ],
      formula: "Kâr = satış fiyatı − maliyet\nKâr marjı (%) = kâr ÷ satış fiyatı × 100\nKâr oranı (%) = kâr ÷ maliyet × 100"
    },
    {
      h: "Çözümlü örnek: aynı ürün, iki oran",
      ol: [
        "Bir ürünün KDV hariç maliyeti 240 TL, KDV hariç satış fiyatı 320 TL olsun.",
        "Kâr: 320 − 240 = 80 TL.",
        "Kâr oranı (markup): 80 ÷ 240 × 100 = %33,3. Yani maliyetin üzerine üçte bir eklenmiş.",
        "Kâr marjı: 80 ÷ 320 × 100 = %25. Yani her 100 TL'lik satışın 25 TL'si kâr.",
        "Kontrol: marj = markup ÷ (1 + markup) = 0,333 ÷ 1,333 = 0,25. İki sonuç tutarlıdır."
      ],
      after: [
        "Maliyet ve satış fiyatını girip iki oranı aynı anda görmek için [[arac:kar-marji-hesapla|Kâr Marjı Hesaplama]] aracını, yalnızca maliyete kâr ekleyerek fiyat bulmak için [[arac:kar-ekleme-orani-hesapla|Kâr Ekleme Oranı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Hedef marja göre satış fiyatı nasıl belirlenir?",
      p: [
        "En sık yapılan hata, %30 marj hedefleyip maliyeti 1,30 ile çarpmaktır. Bu işlem %30 markup verir; marj ise yalnızca %23,1 olur. Doğru yöntem maliyeti (1 − hedef marj) ile bölmektir."
      ],
      formula: "Hedef marja göre satış fiyatı = maliyet ÷ (1 − marj)\nHedef markup'a göre satış fiyatı = maliyet × (1 + markup)",
      table: {
        head: ["Maliyet", "Hedef", "Yanlış: maliyet × (1 + oran)", "Doğru: maliyet ÷ (1 − marj)", "Gerçekleşen marj (yanlış yöntem)"],
        rows: [
          ["100 TL", "%20 marj", "120,00 TL", "125,00 TL", "%16,7"],
          ["100 TL", "%30 marj", "130,00 TL", "142,86 TL", "%23,1"],
          ["100 TL", "%40 marj", "140,00 TL", "166,67 TL", "%28,6"],
          ["100 TL", "%50 marj", "150,00 TL", "200,00 TL", "%33,3"]
        ],
        caption: "Hedef marj yükseldikçe iki yöntem arasındaki fark büyür. %50 marj hedefleyen biri maliyeti 1,5 ile çarparsa marjının yalnızca üçte biri kadar kâr eder."
      }
    },
    {
      h: "KDV dahil fiyatta kâr nasıl hesaplanır?",
      p: [
        "KDV satıcının kârı değildir; müşteriden tahsil edilip devlete aktarılan bir vergidir. Bu yüzden kâr hesabı her zaman <strong>KDV hariç</strong> tutarlarla yapılır. Raftaki KDV dahil fiyattan kâr hesaplamak, kârı olduğundan yüksek gösterir.",
        "Örnek: KDV dahil 180 TL'ye satılan, KDV oranı %20 olan bir ürünün KDV hariç fiyatı 180 ÷ 1,20 = 150 TL'dir. Ürünün KDV hariç maliyeti 100 TL ise kâr 50 TL, marj %33,3'tür. KDV dahil fiyattan hesaplansaydı kâr 80 TL, marj %44 gibi yanıltıcı bir sonuç çıkardı."
      ],
      formula: "KDV hariç fiyat = KDV dahil fiyat ÷ (1 + KDV oranı)\nKDV dahil satış fiyatı = maliyet ÷ (1 − marj) × (1 + KDV oranı)",
      after: [
        "KDV ayırma ve ekleme işlemleri için [[arac:kdv-hesapla|KDV Hesaplama]] aracını, maliyet ve kâr oranından KDV dahil raf fiyatını tek adımda bulmak için [[arac:fiyat-hesapla|Fiyat Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "İndirim yapınca kâr marjı ne kadar düşer?",
      p: [
        "İndirim satış fiyatından düşülür ama maliyet aynı kalır; bu yüzden indirim kârı orantısız biçimde eritir. 100 TL maliyetli, 150 TL'ye satılan bir üründe %20 indirim yapıldığında yeni fiyat 120 TL olur. Kâr 50 TL'den 20 TL'ye, marj %33,3'ten %16,7'ye düşer. Fiyattaki %20'lik indirim kârda %60'lık bir düşüş yaratmıştır."
      ],
      table: {
        head: ["İndirim", "Yeni fiyat", "Birim kâr", "Yeni marj", "Aynı toplam kâr için gereken satış artışı"],
        rows: [
          ["%0", "150 TL", "50 TL", "%33,3", "—"],
          ["%10", "135 TL", "35 TL", "%25,9", "%43"],
          ["%20", "120 TL", "20 TL", "%16,7", "%150"],
          ["%30", "105 TL", "5 TL", "%4,8", "%900"]
        ],
        caption: "Gereken satış artışı = eski birim kâr ÷ yeni birim kâr − 1. %20 indirimde aynı kârı korumak için 2,5 kat ürün satmanız gerekir."
      },
      after: [
        "Kampanya planlarken bu tabloyu kendi ürününüz için çıkarmak, indirimin gerçekten kârlı olup olmadığını önceden gösterir. Ardışık indirimleri birleştirmek ya da indirim yüzdesini bulmak için [[arac:indirim-orani-hesapla|İndirim Oranı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Brüt kâr marjı ve net kâr marjı farkı",
      p: [
        "<strong>Brüt kâr marjı</strong>, yalnızca satılan malın doğrudan maliyetini (alış fiyatı, hammadde, üretim işçiliği) düşer. Ürün bazında fiyatlama yaparken kullanılan marj genellikle budur.",
        "<strong>Net kâr marjı</strong> ise kira, personel maaşları, elektrik, muhasebe, reklam, kargo, pazaryeri komisyonu, finansman giderleri ve vergiler dahil tüm giderler düşüldükten sonra kalan kârın ciroya oranıdır. Brüt marjı yüksek görünen bir işletmenin net marjı genel giderler nedeniyle çok düşük, hatta negatif olabilir."
      ],
      formula: "Brüt kâr marjı = (net satışlar − satılan malın maliyeti) ÷ net satışlar\nNet kâr marjı = net kâr ÷ net satışlar",
      after: [
        "Örnek: Aylık cirosu 200.000 TL, satılan malın maliyeti 130.000 TL olan bir dükkânın brüt kârı 70.000 TL, brüt marjı %35'tir. Kira, personel ve diğer giderler toplamı 55.000 TL ise faaliyet kârı 15.000 TL, vergi öncesi net marj %7,5'e iner. Pazaryerinde satış yapıyorsanız komisyon ve kargo giderlerinin kâra etkisini [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu rehberinde]] ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "İyi bir kâr marjı yüzde kaçtır?",
      p: [
        "Tek bir doğru oran yoktur; uygun marj sektöre, satış hacmine, stok devir hızına ve rekabete göre çok farklıdır. Hızlı dönen ve yüksek hacimle satılan ürünlerde (gıda, temel tüketim) birim marjlar düşük olabilir; buna karşılık az satılan, depolama ve satış sonrası hizmet gerektiren ürünlerde daha yüksek marj gerekir.",
        "Kendi işletmeniz için anlamlı bir alt sınır bulmanın yolu, aylık sabit giderlerinizi beklenen satış hacmine bölmek ve bu tutarı karşılayacak brüt marjı hesaplamaktır. Bu yaklaşımın ayrıntısını [[bilgi:basabas-noktasi-nedir|başabaş noktası rehberinde]] anlatıyoruz. Marjınızı belirlerken iade, fire, kur farkı ve tahsilat gecikmesi gibi riskleri de hesaba katın."
      ]
    },
    {
      h: "Adım adım: marj hedefiyle fiyat listesi hazırlama",
      ol: [
        "Her ürün için KDV hariç alış fiyatını yazın ve ürüne özgü doğrudan giderleri (ambalaj, kargo payı, ödeme komisyonu) ekleyerek gerçek birim maliyeti bulun.",
        "Ürün grubuna göre bir hedef brüt marj belirleyin; çok satan ürünlerde daha düşük, az satan ve destek gerektiren ürünlerde daha yüksek marj seçebilirsiniz.",
        "KDV hariç satış fiyatını maliyet ÷ (1 − marj) formülüyle hesaplayın.",
        "Bulduğunuz fiyatı KDV oranıyla çarparak raf ya da site fiyatına çevirin ve müşterinin göreceği şekilde yuvarlayın; yuvarlamadan sonra marjı yeniden kontrol edin.",
        "Rakip fiyatlarla karşılaştırın. Fiyatınız piyasanın çok üzerindeyse maliyeti düşürmenin ya da marjı kademeli ayarlamanın yollarını değerlendirin.",
        "Alış fiyatları değiştikçe listeyi güncelleyin; maliyet artışını fiyata yansıtmamak marjı fark ettirmeden eritir."
      ],
      p: [
        "Bu adımları çok sayıda ürün için tek tek yapmak yerine, ürün listesini toplu olarak işleyebilen [[arac:fiyat-hesapla|Fiyat Hesaplama]] aracının CSV özelliğinden yararlanabilirsiniz."
      ]
    },
    {
      h: "Fiyatlamada sık yapılan hatalar",
      ul: [
        "<strong>Marj hedefini markup formülüyle uygulamak:</strong> %30 marj için maliyeti 1,30 ile çarpmak yerine 0,70'e bölün.",
        "<strong>KDV dahil tutarla kâr hesaplamak:</strong> Hem maliyeti hem satış fiyatını KDV hariç tutarlarla karşılaştırın.",
        "<strong>Gizli maliyetleri unutmak:</strong> Kargo, ambalaj, ödeme komisyonu, pazaryeri hizmet bedeli ve iade maliyeti birim maliyete eklenmezse marj kâğıt üzerinde kalır.",
        "<strong>Eski maliyetle fiyatlamak:</strong> Stoktaki ürünü yenisini alırken ödeyeceğiniz maliyetle değerlendirin; aksi hâlde sattığınız ürünü aynı fiyata yerine koyamayabilirsiniz.",
        "<strong>İndirimin kâra etkisini hesaplamamak:</strong> Küçük bir fiyat indirimi birim kârı büyük oranda düşürür.",
        "<strong>Tek ürüne bakıp genel tabloyu kaçırmak:</strong> Bazı ürünler müşteri çekmek için düşük marjla satılabilir; önemli olan toplam brüt kârın sabit giderleri karşılamasıdır."
      ]
    }
  ],
  faq: [
    ["Kâr marjı nasıl hesaplanır?", "Kâr marjı, satış fiyatından maliyet çıkarılarak bulunan kârın satış fiyatına bölünüp 100 ile çarpılmasıyla hesaplanır. 150 TL'ye satılan ve 100 TL'ye mal olan bir üründe marj 50 ÷ 150 × 100 = %33,3'tür."],
    ["Kâr marjı ile kâr oranı (markup) arasındaki fark nedir?", "Kâr marjı kârı satış fiyatına, kâr oranı ise maliyete böler. Aynı 50 TL kâr, 100 TL maliyetli ve 150 TL satış fiyatlı bir üründe %50 kâr oranı ama %33,3 kâr marjı anlamına gelir."],
    ["Maliyetin üzerine yüzde kaç kâr eklenmeli?", "Ekleme oranı sektöre, giderlerinize ve rekabete bağlıdır. Hedeflediğiniz marjı biliyorsanız gereken ekleme oranı marj ÷ (1 − marj) formülüyle bulunur; örneğin %30 marj için maliyete yaklaşık %42,9 eklemeniz gerekir."],
    ["Satış fiyatı nasıl belirlenir?", "Önce kargo, ambalaj ve komisyon dahil birim maliyet hesaplanır, ardından hedef marjla maliyet ÷ (1 − marj) formülü uygulanır ve sonuca KDV eklenir. Bulunan fiyat rakip fiyatları ve müşteri beklentisiyle karşılaştırılarak son hâline getirilir."],
    ["KDV dahil fiyatta kâr nasıl hesaplanır?", "Önce KDV dahil fiyat 1 + KDV oranına bölünerek KDV hariç fiyat bulunur. Kâr bu KDV hariç fiyattan KDV hariç maliyet çıkarılarak hesaplanır; KDV dahil tutarla hesaplanan kâr gerçeğinden yüksek görünür."],
    ["Brüt ve net kâr marjı farkı nedir?", "Brüt kâr marjı yalnızca satılan malın doğrudan maliyetini düşer. Net kâr marjı ise kira, personel, reklam, komisyon, finansman ve vergi gibi tüm giderler düşüldükten sonra kalan kârın satışlara oranıdır ve genellikle çok daha düşüktür."],
    ["İndirim yapınca kâr marjı ne kadar düşer?", "İndirim yalnızca satış fiyatını düşürdüğü için kâr orantısız azalır. 100 TL maliyetli, 150 TL'ye satılan üründe %20 indirim birim kârı 50 TL'den 20 TL'ye, marjı %33,3'ten %16,7'ye indirir."],
    ["İyi bir kâr marjı yüzde kaçtır?", "Evrensel bir oran yoktur; hızlı dönen ürünlerde düşük, az satılan ve hizmet gerektiren ürünlerde yüksek marjlar normaldir. Doğru ölçüt, toplam brüt kârın sabit giderleri karşılayıp hedef net kârı bırakıp bırakmadığıdır."],
    ["Kâr marjı yüzde 100'ü geçebilir mi?", "Hayır. Kâr marjı kârın satış fiyatına oranı olduğu için maliyet sıfır olsa bile en fazla yüzde 100 olabilir. Kâr oranı ise maliyete göre hesaplandığından yüzde 100'ün çok üzerine çıkabilir."]
  ],
  tools: ["kar-marji-hesapla", "kar-ekleme-orani-hesapla", "fiyat-hesapla", "indirim-orani-hesapla", "kdv-hesapla"],
  related: ["basabas-noktasi-nedir", "pazaryeri-komisyonu-nasil-hesaplanir"]
};
