export default {
  slug: "vergi-gecikme-zammi-nasil-hesaplanir",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "Vergi Gecikme Zammı Nasıl Hesaplanır? Gecikme Faizi ve Ödeme Örneği",
  pageTitle: "Gecikme Zammı Nasıl Hesaplanır? Aylık Oran ve Örnekler",
  description: "Gecikme zammı = borç × aylık oran × gecikilen ay. 13.11.2025'ten beri aylık %3,7. Gün hesabı, oran değişen dönem, MTV örneği ve gecikme faizi farkı.",
  keywords: ["gecikme zammı nasıl hesaplanır", "gecikme zammı oranı 2026", "gecikme faizi hesaplama", "vergi borcu gecikme zammı", "sgk gecikme zammı", "mtv gecikme zammı", "gecikme zammı günlük hesaplama", "6183 gecikme zammı"],
  lead: "Gecikme zammı, vadesinde ödenmeyen vergi ve diğer kamu alacaklarına <strong>vadenin bittiği günden itibaren her ay için aylık oranla, ay kesirleri için de gün hesabıyla</strong> uygulanan ek tutardır: borç × aylık oran × gecikilen ay sayısı. 13 Kasım 2025'ten bu yana aylık oran <strong>%3,7</strong>'dir; bundan önce %4,5 uygulanıyordu. Zam bileşik değil basit hesaplanır, yani her ay yalnızca asıl borç üzerinden işler. Bu yazıda formülü, gün hesabını, oranın değiştiği dönemleri, MTV ve vergi borcu örneklerini, gecikme faizi farkını ve SGK borçlarını anlatıyoruz.",
  kisaCevap: [
    "Gecikme zammı = asıl borç × aylık oran × (tam ay sayısı + kalan gün ÷ 30).",
    "Aylık oran 13.11.2025'ten itibaren %3,7'dir (10556 sayılı Cumhurbaşkanı Kararı); 21.05.2024–12.11.2025 arasında %4,5 idi.",
    "Zam basit hesaplanır: her ay yalnızca asıl borca işler, zamma zam işlemez.",
    "Gecikilen süre birden fazla oran dönemine yayılıyorsa her dönem kendi oranıyla ayrı hesaplanıp toplanır.",
    "Gecikme faizi (VUK md. 112) ve pişmanlık zammı da aynı aylık oranla hesaplanır, ama farklı durumlarda uygulanır.",
    "Örnek: 2.400 TL'lik MTV taksiti 74 gün (2 ay 15 gün) geç ödenirse gecikme zammı 222 TL'dir."
  ],
  figure: {
    alt: "10.000 TL vergi borcunun aylık yüzde 3,7 gecikme zammıyla altı ay içinde nasıl büyüdüğünü gösteren çubuk grafik: her ay 370 TL eklenir ve altıncı ayın sonunda borç 12.220 TL olur.",
    caption: "Gecikme zammı basit hesaplandığı için borç her ay aynı tutarda (10.000 × %3,7 = 370 TL) artar. Altı ay sonunda toplam zam 2.220 TL'ye, borç 12.220 TL'ye ulaşır. Bir yıl ödenmezse zam asıl borcun %44,4'üne çıkar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">10.000 TL borç ödenmezse (aylık %3,7)</text>
  <line x1="70" y1="330" x2="690" y2="330" class="st" fill="none"/>
  <g>
    <rect x="90" y="130" width="64" height="200" class="sf sb"/>
    <rect x="178" y="122.6" width="64" height="7.4" class="p"/><rect x="178" y="130" width="64" height="200" class="sf sb"/>
    <rect x="266" y="115.2" width="64" height="14.8" class="p"/><rect x="266" y="130" width="64" height="200" class="sf sb"/>
    <rect x="354" y="107.8" width="64" height="22.2" class="p"/><rect x="354" y="130" width="64" height="200" class="sf sb"/>
    <rect x="442" y="100.4" width="64" height="29.6" class="p"/><rect x="442" y="130" width="64" height="200" class="sf sb"/>
    <rect x="530" y="93" width="64" height="37" class="p"/><rect x="530" y="130" width="64" height="200" class="sf sb"/>
    <rect x="618" y="85.6" width="64" height="44.4" class="p"/><rect x="618" y="130" width="64" height="200" class="sf sb"/>
  </g>
  <g class="sm mid">
    <text x="122" y="120" class="b">10.000</text>
    <text x="210" y="114" class="b">10.370</text>
    <text x="298" y="107" class="b">10.740</text>
    <text x="386" y="100" class="b">11.110</text>
    <text x="474" y="92" class="b">11.480</text>
    <text x="562" y="85" class="b">11.850</text>
    <text x="650" y="77" class="b">12.220</text>
    <text x="122" y="350">Vade</text><text x="210" y="350">1. ay</text><text x="298" y="350">2. ay</text>
    <text x="386" y="350">3. ay</text><text x="474" y="350">4. ay</text><text x="562" y="350">5. ay</text><text x="650" y="350">6. ay</text>
  </g>
  <g class="sm mid t2"><text x="386" y="240">Asıl borç 10.000 TL (değişmez)</text></g>
  <rect x="90" y="364" width="16" height="14" class="p"/><text x="114" y="376" class="sm">Biriken gecikme zammı: her ay +370 TL</text>
  <rect x="420" y="364" width="16" height="14" class="sf sb"/><text x="444" y="376" class="sm">Asıl borç</text>
</svg>`
  },
  sections: [
    {
      h: "Gecikme zammı nedir?",
      p: [
        "Gecikme zammı, 6183 sayılı Amme Alacaklarının Tahsil Usulü Hakkında Kanun'un 51. maddesine dayanır. Vergi, harç, motorlu taşıtlar vergisi, trafik cezası, idari para cezası gibi kamu alacakları vadesinde ödenmezse, vadenin bitiminden itibaren her ay için belirlenen oranda gecikme zammı uygulanır. Ay kesirlerine düşen zam da gün hesabıyla bulunur.",
        "Oran, Cumhurbaşkanı kararıyla belirlenir ve piyasa faizlerine göre zaman zaman değiştirilir. 13 Kasım 2025 tarihli Resmî Gazete'de yayımlanan 10556 sayılı Cumhurbaşkanı Kararı ile oran aylık %4,5'ten <strong>%3,7</strong>'ye indirilmiştir. Oran ileride yeniden değişebileceği için ödeme yapmadan önce Gelir İdaresi Başkanlığı'nın duyurularını kontrol edin.",
        "Gecikme zammı bir ceza değil, geç ödemenin faiz benzeri karşılığıdır. Vergi ziyaı cezası ya da usulsüzlük cezası gibi cezalarla karıştırılmamalıdır; bir borca hem ceza hem gecikme zammı birlikte uygulanabilir.",
        "Gecikme zammı yalnızca gelir vergisi ya da KDV gibi beyana dayalı vergilerde değil, emlak vergisi, çevre temizlik vergisi, harçlar, idari para cezaları ve vergi dairesince takip edilen diğer kamu alacaklarında da uygulanır. Belediyelere olan emlak vergisi borçları da bu kapsama girer; belediye tahsilat ekranında görünen gecikme tutarı aynı formülle hesaplanır. Bu nedenle küçük tutarlı borçların bile uzun süre bekletilmesi, zamanla asıl borcun yarısına yaklaşan ek yük doğurabilir."
      ]
    },
    {
      h: "Gecikme zammı formülü",
      formula: "Gecikme zammı = asıl borç × aylık oran × gecikilen süre (ay)\nGecikilen süre (ay) = tam ay sayısı + kalan gün ÷ 30\nGünlük yaklaşım: asıl borç × (aylık oran ÷ 30) × gecikilen gün",
      p: [
        "Süre, vade tarihinin bittiği günü izleyen günden ödeme gününe kadar hesaplanır. Tam aylar aylık oranla, ayı tamamlamayan günler ise aylık oranın otuzda biriyle çarpılır. %3,7 aylık oranın günlük karşılığı yaklaşık %0,1233'tür.",
        "Zam <strong>basit</strong> hesaplanır: her ay asıl borç üzerinden işler, önceki ayların zammı yeni zam doğurmaz. Bu yüzden borç zaman içinde doğrusal büyür. Bir yıl boyunca ödenmeyen borca %3,7 × 12 = %44,4 gecikme zammı eklenir. Bileşik faizle karşılaştırma yapmak isterseniz [[bilgi:bilesik-faiz-nedir|bileşik faiz]] yazısına bakabilirsiniz."
      ],
      after: [
        "Gün sayısını iki tarih arasında doğru bulmak için [[arac:tarih-farki|Tarih Farkı Hesaplama]] aracını, günlük oranla hesap yapmak için [[arac:gunluk-faiz-hesapla|Günlük Faiz Hesaplama]] aracını kullanabilirsiniz. Günlük faiz aracına yıllık oran olarak 3,7 × 12 = 44,4 yazıp stopajı sıfır bırakırsanız sonuç basit gecikme zammıyla aynı olur."
      ]
    },
    {
      h: "Örnek 1: MTV'yi geç ödersem ne kadar fazla öderim?",
      p: [
        "Motorlu taşıtlar vergisi yılda iki eşit taksitle, Ocak ve Temmuz aylarının sonuna kadar ödenir. Bir aracın Ocak taksitinin 2.400 TL olduğunu ve 31 Ocak 2026 yerine 15 Nisan 2026'da ödendiğini varsayalım. Tutar örnektir; aracınızın gerçek MTV'sini [[rehber:trafik-cezasi-ve-mtv-hesaplama|MTV rehberinden]] öğrenebilirsiniz."
      ],
      ol: [
        "Gecikilen süreyi bulun: 1 Şubat–15 Nisan arası 28 + 31 + 15 = 74 gün.",
        "Ay cinsine çevirin: 74 gün = 31 Ocak–31 Mart arası 2 tam ay ve Nisan’daki 15 gün, yani 2 + 15 ÷ 30 = 2,5 ay.",
        "Aylık zammı hesaplayın: 2.400 × %3,7 = 88,80 TL.",
        "Süreyle çarpın: 88,80 × 2,5 = 222,00 TL gecikme zammı. Gün yaklaşımıyla (74 × 88,80 ÷ 30) sonuç 219,04 TL çıkar; vergi dairesi tam ay ve gün ayrımını kullanır.",
        "Ödenecek toplam: 2.400 + 222,00 = 2.622,00 TL."
      ],
      after: [
        "Aynı taksit bir yıl gecikseydi zam 2.400 × %44,4 = 1.065,60 TL olurdu. Ayrıca MTV borcu ödenmeden araç satışı ve muayene gibi işlemler yapılamadığı için gecikme yalnızca para değil işlem kaybına da yol açar."
      ]
    },
    {
      h: "Örnek 2: Oranın değiştiği dönemi kapsayan borç",
      p: [
        "Gecikme süresi oran değişikliğinden önce başlayıp sonra bitiyorsa, her dönem kendi oranıyla ayrı hesaplanır. 50.000 TL'lik bir vergi borcunun vadesi 26 Eylül 2025 olsun ve borç 26 Ocak 2026'da ödensin. 12 Kasım 2025'e kadar aylık %4,5, 13 Kasım 2025'ten itibaren %3,7 uygulanır."
      ],
      table: {
        head: ["Dönem", "Gün", "Aylık oran", "Hesap", "Gecikme zammı"],
        rows: [
          ["27.09.2025 – 12.11.2025", "47", "%4,5", "50.000 × 0,045 × 47 ÷ 30", "3.525,00 TL"],
          ["13.11.2025 – 26.01.2026", "75", "%3,7", "50.000 × 0,037 × 75 ÷ 30", "4.625,00 TL"],
          ["Toplam", "122", "–", "–", "8.150,00 TL"]
        ],
        caption: "Gün yaklaşımıyla hesaplanmıştır. Vergi dairesi tam ayları ve kalan günleri ayrı sayar; sonuç birkaç lira farklı çıkabilir."
      },
      after: [
        "Tablodaki yöntem, yıllar boyunca biriken eski borçlar için de geçerlidir. Borç birkaç yıla yayılıyorsa her oran döneminin başlangıç ve bitiş tarihlerini ayrı ayrı belirleyip toplamanız gerekir. Bu nedenle uzun süreli borçlarda en doğru tutarı Gelir İdaresi Başkanlığı'nın internet vergi dairesi ya da e-Devlet üzerindeki borç sorgulama ekranı verir."
      ]
    },
    {
      h: "Gecikme zammı ile gecikme faizi farkı nedir?",
      p: [
        "İki kavram aynı oranla hesaplandığı için sık karıştırılır, ama farklı durumlarda uygulanır. <strong>Gecikme zammı</strong>, tahakkuk etmiş ve vadesi geçmiş bir borcun vadesinden ödeme tarihine kadar işler. <strong>Gecikme faizi</strong> ise 213 sayılı Vergi Usul Kanunu'nun 112. maddesine göre, vergi incelemesi ya da ikmalen tarhiyat sonucu sonradan çıkan bir verginin, normal vadesinden tahakkuk tarihine kadar geçen süre için uygulanır.",
        "Bir de <strong>pişmanlık zammı</strong> vardır: mükellef eksik ya da hiç beyan etmediği bir vergiyi, idare tespit etmeden kendiliğinden beyan ederse, ceza kesilmez ama vadeden itibaren geçen süre için pişmanlık zammı ödenir. 10556 sayılı karardan sonra gecikme faizi ve pişmanlık zammı oranı da aylık %3,7'dir."
      ],
      table: {
        head: ["Kavram", "Dayanak", "Ne zaman işler?", "Oran (13.11.2025 itibarıyla)"],
        rows: [
          ["Gecikme zammı", "6183 s. Kanun md. 51", "Vadeden ödemeye kadar", "Aylık %3,7"],
          ["Gecikme faizi", "213 s. VUK md. 112", "Asıl vadeden tarhiyatın tahakkukuna kadar", "Aylık %3,7"],
          ["Pişmanlık zammı", "213 s. VUK md. 371", "Vadeden kendiliğinden beyan ve ödemeye kadar", "Aylık %3,7"],
          ["Tecil faizi", "6183 s. Kanun md. 48", "Taksitlendirilen borcun taksit süresince", "Ayrıca belirlenir"]
        ]
      }
    },
    {
      h: "SGK prim borcunda gecikme zammı nasıl işler?",
      p: [
        "SGK prim borçları da kamu alacağıdır, ama hesap kendi kanununa göre yapılır. 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu'nun 89. maddesi, süresinde ödenmeyen primlere <strong>gecikme cezası</strong> ve <strong>gecikme zammı</strong> uygulanmasını öngörür ve oranları 6183 sayılı Kanun'daki gecikme zammı oranına bağlar. Bu nedenle SGK borcunun gecikme tutarı vergi borcundaki basit formülden biraz farklı çıkar.",
        "Bağ-Kur primi gibi kendi adına ödenen primlerde gecikme, sağlık hizmetlerinden yararlanmayı ve emeklilik hesabını da etkileyebilir. Güncel borç ve gecikme tutarını SGK'nın e-Devlet üzerindeki borç sorgulama hizmetinden öğrenmek en güvenilir yoldur. Prim tutarlarının nasıl hesaplandığını [[bilgi:bagkur-primi-ne-kadar|Bağ-Kur primi]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Vergi borcu yapılandırılabilir mi, taksitlendirilebilir mi?",
      p: [
        "Gecikme zammının silindiği ya da indirildiği \"yapılandırma\" düzenlemeleri ancak bu amaçla çıkarılan özel kanunlarla mümkündür ve zaman zaman yürürlüğe girer. Böyle bir kanun yoksa gecikme zammı silinemez.",
        "Ödeme güçlüğü çeken mükellefler ise 6183 sayılı Kanun'un 48. maddesine göre borçlarını <strong>tecil ve taksitlendirme</strong> talebiyle vergi dairesine başvurabilir. Tecil kabul edilirse borca gecikme zammı yerine genellikle daha düşük olan tecil faizi uygulanır; taksitler aksatılırsa tecil bozulur ve gecikme zammı yeniden işler."
      ]
    },
    {
      h: "Gecikme zammı vergi iadesinden düşülür mü?",
      p: [
        "Vergi iadesi alacağınız varsa, bu alacak vadesi geçmiş vergi borçlarınıza mahsup edilebilir. Mahsup, borcun ve iade alacağının birbirinden düşülmesidir. Bu durumda gecikme zammı, borcun vadesinden mahsup talebinin yapıldığı ya da mahsubun gerçekleştiği tarihe kadar işler; iade alacağı borçtan önce doğmuşsa ve süresinde talep edildiyse gecikme zammı daha az çıkar.",
        "Mahsup otomatik olmayabilir; çoğu durumda dilekçe ya da internet vergi dairesi üzerinden talep gerekir. İade alacağınızın beklemesi, ödenmemiş borcunuzun gecikme zammını durdurmaz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Bileşik hesaplamak:</strong> Gecikme zammı basittir; 12 ayda %3,7'nin bileşiği değil, düz %44,4'ü eklenir.",
        "<strong>Tek oran kullanmak:</strong> Süre oran değişikliğini kapsıyorsa her dönem kendi oranıyla hesaplanır.",
        "<strong>Vade gününü saymak:</strong> Zam, vadenin bittiği günü izleyen günden itibaren işler.",
        "<strong>Cezayı zamla karıştırmak:</strong> Vergi ziyaı ya da trafik cezası ayrı bir tutardır; gecikme zammı bunlara ek olarak işleyebilir.",
        "<strong>Eski oran tablosuna güvenmek:</strong> İnternette dolaşan eski oranlar güncel olmayabilir; güncel oranı resmî kaynaktan kontrol edin."
      ],
      after: [
        "Yüzde ve oran hesaplarında takılırsanız [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı, faiz ile karşılaştırma yapmak isterseniz [[arac:faiz-hesapla|Faiz Hesaplama]] aracı işinizi görür."
      ]
    }
  ],
  faq: [
    ["Gecikme zammı nasıl hesaplanır?", "Asıl borç aylık gecikme zammı oranıyla ve gecikilen ay sayısıyla çarpılır; ayı tamamlamayan günler için aylık oranın otuzda biri kullanılır. Zam basittir, yalnızca asıl borç üzerinden işler."],
    ["2026'da aylık gecikme zammı oranı kaç?", "13 Kasım 2025'te yürürlüğe giren 10556 sayılı Cumhurbaşkanı Kararı ile aylık oran yüzde 3,7'dir. Oran Cumhurbaşkanı kararıyla değişebileceği için ödeme öncesinde Gelir İdaresi Başkanlığı duyurularını kontrol edin."],
    ["Gecikme zammı ile gecikme faizi farkı nedir?", "Gecikme zammı vadesi geçmiş ve tahakkuk etmiş borca ödeme tarihine kadar işler. Gecikme faizi ise inceleme sonucu sonradan tarh edilen vergiye asıl vadeden tahakkuka kadar uygulanır; ikisinin oranı şu an aynıdır."],
    ["Gecikme zammı gün gün mü işler?", "Tam aylar için aylık oran uygulanır, ayı tamamlamayan günler için ise gün hesabı yapılır. Bu nedenle borç fiilen gün gün büyür; yüzde 3,7 aylık oranın günlük karşılığı yaklaşık yüzde 0,123'tür."],
    ["MTV'yi geç ödersem ne kadar fazla öderim?", "Geciken her ay için taksit tutarının yüzde 3,7'si kadar fazla ödersiniz. Örneğin 2.400 TL'lik taksiti 74 gün geç öderseniz 222 TL gecikme zammıyla toplam 2.622 TL ödersiniz."],
    ["SGK prim borcunda gecikme zammı nasıl işler?", "SGK prim borçlarına 5510 sayılı Kanun'un 89. maddesine göre gecikme cezası ve gecikme zammı birlikte uygulanır ve oranlar 6183 sayılı Kanun'a bağlıdır. Güncel tutarı e-Devlet'teki SGK borç sorgulamasından öğrenebilirsiniz."],
    ["Vergi borcu yapılandırılabilir mi?", "Gecikme zammını silen yapılandırma yalnızca özel kanunla mümkündür. Böyle bir kanun yokken vergi dairesine tecil ve taksitlendirme talebiyle başvurabilirsiniz; kabul edilirse borca gecikme zammı yerine tecil faizi uygulanır."],
    ["Gecikme zammı vergi iadesinden düşülür mü?", "İade alacağınız vadesi geçmiş borcunuza mahsup edilebilir. Gecikme zammı borcun vadesinden mahsup tarihine kadar hesaplanır; iade beklemek borcun zammını durdurmadığı için mahsup talebini erken yapmak avantajlıdır."]
  ],
  tools: ["gunluk-faiz-hesapla", "tarih-farki", "faiz-hesapla", "yuzde-hesapla"],
  related: ["emlak-vergisi-nasil-hesaplanir", "bagkur-primi-ne-kadar", "bilesik-faiz-nedir"],
  sources: [
    ["Resmî Gazete – 10556 sayılı Cumhurbaşkanı Kararı (13.11.2025)", "https://www.resmigazete.gov.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 6183 sayılı Kanun", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "mali müşavirlik hizmeti yerine geçmez; kesin borç tutarı için vergi dairenizin hesabını esas alın"
};
