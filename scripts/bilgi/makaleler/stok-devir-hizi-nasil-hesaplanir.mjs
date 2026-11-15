export default {
  slug: "stok-devir-hizi-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Stok Devir Hızı Nasıl Hesaplanır? Emniyet Stoku ve Sipariş Miktarı",
  pageTitle: "Stok Devir Hızı Nasıl Hesaplanır? Formül, Emniyet Stoku, EOQ",
  description: "Stok devir hızı = satılan malın maliyeti ÷ ortalama stok; stokta kalma süresi = 365 ÷ devir hızı. Emniyet stoku, yeniden sipariş noktası ve EOQ örnekleriyle.",
  keywords: ["stok devir hızı", "stok devir hızı formülü", "emniyet stoku hesaplama", "ekonomik sipariş miktarı", "stokta kalma süresi", "stok yönetimi", "yeniden sipariş noktası", "ölü stok nedir"],
  lead: "Stok devir hızı, <strong>satılan malın maliyetinin (SMM) dönemin ortalama stokuna bölünmesiyle</strong> hesaplanır ve stokların bir yılda kaç kez satılıp yenilendiğini gösterir. Ortalama stok, dönem başı ve dönem sonu stokunun ortalamasıdır; 365 gün devir hızına bölündüğünde stokların ortalama kaç günde eridiği bulunur. Örneğin yıllık SMM'si 1.800.000 TL, ortalama stoku 300.000 TL olan bir işletmenin devir hızı 6, stokta kalma süresi yaklaşık 61 gündür. Bu sayfada emniyet stokunu, yeniden sipariş noktasını, ekonomik sipariş miktarını ve ölü stoku örneklerle bulacaksınız.",
  kisaCevap: [
    "Stok devir hızı = satılan malın maliyeti ÷ ortalama stok; ortalama stok = (dönem başı + dönem sonu stok) ÷ 2.",
    "Stokta kalma süresi (gün) = 365 ÷ stok devir hızı.",
    "Emniyet stoku (basit yöntem) = en yüksek günlük satış × en uzun tedarik süresi − ortalama günlük satış × ortalama tedarik süresi.",
    "Emniyet stoku (servis düzeyi yöntemi) = Z × günlük satışın standart sapması × √tedarik süresi; %95 servis düzeyinde Z ≈ 1,645.",
    "Yeniden sipariş noktası = ortalama günlük satış × tedarik süresi + emniyet stoku.",
    "Ekonomik sipariş miktarı (EOQ) = √(2 × yıllık talep × sipariş maliyeti ÷ birim yıllık elde bulundurma maliyeti)."
  ],
  figure: {
    alt: "Testere dişi stok grafiği: stok 627 birimden günde 20 birim azalıyor, 123 birimlik yeniden sipariş noktasında sipariş veriliyor, 5 günlük tedarik süresi sonunda stok 23 birimlik emniyet stokuna inerken 604 birimlik sipariş geliyor.",
    caption: "Sipariş, stok yeniden sipariş noktasına indiğinde verilir; tedarik süresi boyunca satış devam eder. Talep ya da tedarik beklenenden kötü giderse emniyet stoku devreye girer ve stok sıfıra düşmez.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Stok seviyesi, sipariş noktası ve emniyet stoku</text>
  <rect x="80" y="360" width="600" height="10" class="oks"/>
  <line x1="80" y1="60" x2="80" y2="370" class="sb" fill="none"/>
  <line x1="80" y1="370" x2="690" y2="370" class="sb" fill="none"/>
  <line x1="80" y1="315" x2="690" y2="315" class="sa dash" fill="none"/>
  <polyline points="80,88 307,315 352,360 352,88 579,315 624,360 624,88 680,144" class="sp sw" fill="none"/>
  <g class="sm end">
    <text x="72" y="92">627</text><text x="72" y="319" class="b">123</text><text x="72" y="364">23</text><text x="72" y="384">0</text>
  </g>
  <circle cx="307" cy="315" r="6" class="a"/>
  <circle cx="579" cy="315" r="6" class="a"/>
  <line x1="307" y1="300" x2="352" y2="300" class="st" fill="none"/>
  <text x="330" y="294" class="sm mid">5 gün</text>
  <text x="300" y="250" class="sm b end">Sipariş ver</text>
  <text x="300" y="268" class="sm end mu">stok 123'e indi</text>
  <text x="360" y="110" class="sm b">604 birim gelir</text>
  <text x="200" y="190" class="sm mu">günde 20 birim satış</text>
  <text x="690" y="306" class="sm end">yeniden sipariş noktası</text>
  <text x="690" y="356" class="sm end ok b">emniyet stoku</text>
  <text x="360" y="400" class="sm mid t2">Günler → (bir döngü yaklaşık 30 gün)</text>
</svg>`
  },
  sections: [
    {
      h: "Stok devir hızı nedir?",
      p: [
        "Stok devir hızı (stok devir oranı), bir işletmenin stoklarını belirli bir dönemde, genellikle bir yılda, kaç kez satıp yeniden doldurduğunu gösteren orandır. Devir hızı yüksekse ürünler rafta kısa süre bekliyor, sermaye stokta uzun süre bağlı kalmıyor demektir. Düşükse ürünler yavaş satılıyor, depo ve finansman maliyeti birikiyor demektir.",
        "Oran, finansal tablo analizinde faaliyet (etkinlik) oranlarından biri olarak kullanılır. Bankalar, yatırımcılar ve tedarikçiler işletmenin stok yönetimini bu oranla değerlendirir. E-ticaret ve perakendede ise ürün ya da kategori bazında hesaplanarak hangi ürünün sermayeyi verimli kullandığını gösterir."
      ]
    },
    {
      h: "Stok devir hızı nasıl hesaplanır?",
      p: [
        "Hesapta pay olarak satış hasılatı değil <strong>satılan malın maliyeti (SMM)</strong> kullanılır; çünkü stoklar bilançoda maliyet bedeliyle izlenir. Satış tutarı kullanılırsa kâr marjı orana karışır ve oran olduğundan yüksek görünür. Paydada ise dönemin ortalama stoku kullanılır."
      ],
      formula: "Ortalama stok = (dönem başı stok + dönem sonu stok) ÷ 2\nStok devir hızı = satılan malın maliyeti ÷ ortalama stok\nStokta kalma süresi (gün) = 365 ÷ stok devir hızı",
      ol: [
        "<strong>Veriler (örnek tutarlar):</strong> Yıllık SMM 1.800.000 TL, dönem başı stok 250.000 TL, dönem sonu stok 350.000 TL.",
        "<strong>Ortalama stok:</strong> (250.000 + 350.000) ÷ 2 = 300.000 TL.",
        "<strong>Devir hızı:</strong> 1.800.000 ÷ 300.000 = 6. Stoklar yılda 6 kez yenilenmiştir.",
        "<strong>Stokta kalma süresi:</strong> 365 ÷ 6 = 60,8 gün. Bir ürün ortalama yaklaşık iki ay depoda beklemektedir."
      ],
      after: [
        "Stok seviyesi yıl içinde çok dalgalanıyorsa (örneğin sezonluk ürünlerde) yalnızca dönem başı ve sonu yerine aylık stokların ortalamasını kullanmak daha gerçekçi sonuç verir. Bu hesabı [[arac:stok-devir-hizi-hesapla|Stok Devir Hızı Hesaplama aracı]] dönem gün sayısını da ayarlayarak yapar; aylık ya da çeyreklik verilerle çalışırken sonuç yıllığa da çevrilir."
      ]
    },
    {
      h: "Yüksek stok devir hızı iyi midir?",
      p: [
        "Genel olarak yüksek devir hızı, stoğun verimli kullanıldığını gösterir. Ancak \"ne kadar yüksek o kadar iyi\" demek doğru değildir. Aşırı yüksek devir hızı, stoğun ihtiyacın altında tutulduğunu ve sık sık stoksuz kalındığını, yani satış kaçırıldığını gösterebilir. Ayrıca sık ve küçük siparişler sipariş ve nakliye maliyetini artırır."
      ],
      table: {
        head: ["Durum", "Olası anlam", "Bakılacak gösterge"],
        rows: [
          ["Devir hızı sektöre göre düşük", "Fazla ya da yavaş satan stok, nakit bağlanıyor", "Ölü stok listesi, ürün bazında devir"],
          ["Devir hızı sektöre göre yüksek", "Verimli stok ya da yetersiz stok", "Stoksuz kalma sayısı, kaçırılan siparişler"],
          ["Devir hızı düşüyor", "Talep azalıyor ya da aşırı alım yapılıyor", "Satış trendi, satın alma miktarları"],
          ["Devir hızı yükseliyor", "Satış artışı ya da stok azaltımı", "Brüt kâr marjı, teslimat süreleri"]
        ],
        caption: "Gıda, kozmetik ve hızlı tüketim ürünlerinde devir hızı doğal olarak yüksek; mobilya, makine ve yedek parçada düşüktür. Karşılaştırmayı aynı sektör ve kendi geçmiş verinizle yapın."
      }
    },
    {
      h: "Emniyet stoku nasıl hesaplanır?",
      p: [
        "Emniyet stoku, talebin beklenenden yüksek ya da tedarikin beklenenden geç olduğu durumlarda stoksuz kalmamak için tutulan ek stoktur. İki yaygın yöntem vardır: en yüksek-ortalama farkına dayanan basit yöntem ve istatistiksel servis düzeyi yöntemi."
      ],
      formula: "Basit yöntem: ES = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi)\nServis düzeyi yöntemi: ES = Z × σ(günlük satış) × √(tedarik süresi)\nZ: %90 → 1,282 · %95 → 1,645 · %99 → 2,326",
      ol: [
        "<strong>Veriler:</strong> Ortalama günlük satış 20 adet, en yüksek günlük satış 30 adet; ortalama tedarik süresi 5 gün, en uzun 8 gün; günlük satışın standart sapması 6 adet.",
        "<strong>Basit yöntem:</strong> 30 × 8 − 20 × 5 = 240 − 100 = 140 adet.",
        "<strong>Servis düzeyi yöntemi (%95):</strong> 1,645 × 6 × √5 = 1,645 × 6 × 2,236 ≈ 22,1 → 23 adet.",
        "<strong>Yorum:</strong> Basit yöntem en kötü satış günüyle en kötü tedarik süresinin aynı anda yaşandığını varsaydığı için çok temkinlidir. Servis düzeyi yöntemi, satışların %95 olasılıkla karşılanacağı düzeyi hedefler ve çok daha az stok bağlar; ancak tedarik süresindeki dalgalanmayı ayrıca hesaba katmaz."
      ],
      after: [
        "Hangi yöntemi seçeceğiniz, verinizin kalitesine ve stoksuz kalmanın maliyetine bağlıdır. Elinizde yeterli satış geçmişi yoksa basit yöntemle başlayıp veri biriktikçe servis düzeyine geçebilirsiniz. İki yöntemi de [[arac:emniyet-stogu-hesapla|Emniyet Stoğu Hesaplama aracında]] karşılaştırabilirsiniz."
      ]
    },
    {
      h: "Yeniden sipariş noktası ve ekonomik sipariş miktarı (EOQ) nedir?",
      p: [
        "Emniyet stoku \"ne kadar yedek tutayım\" sorusunu, yeniden sipariş noktası \"ne zaman sipariş vereyim\" sorusunu, ekonomik sipariş miktarı ise \"her seferinde ne kadar sipariş vereyim\" sorusunu cevaplar. Üçü birlikte basit bir stok politikası oluşturur."
      ],
      formula: "Yeniden sipariş noktası = ortalama günlük satış × tedarik süresi + emniyet stoku\nEOQ = √(2 × D × S ÷ H)\nD: yıllık talep · S: sipariş başına maliyet · H: birim başına yıllık elde bulundurma maliyeti",
      after: [
        "<strong>Yeniden sipariş noktası:</strong> 20 × 5 + 23 = 123 adet. Stok 123 adede indiğinde sipariş verilir; 5 günlük tedarik süresinde 100 adet satılır ve sipariş geldiğinde elde yaklaşık 23 adet emniyet stoku kalır.",
        "<strong>Ekonomik sipariş miktarı (örnek tutarlar):</strong> Yıllık talep D = 20 × 365 = 7.300 adet; her siparişin sabit maliyeti (yazışma, nakliye, kabul) S = 250 TL; ürünün birim maliyeti 40 TL ve yıllık elde bulundurma maliyeti bunun %25'i, yani H = 10 TL. EOQ = √(2 × 7.300 × 250 ÷ 10) = √365.000 ≈ 604 adet. Yılda yaklaşık 12 sipariş verilir, yıllık sipariş maliyeti ve elde bulundurma maliyeti yaklaşık 3.020'şer TL'ye eşitlenir.",
        "EOQ'nun mantığı, sık sipariş vermenin maliyeti ile çok stok tutmanın maliyeti arasındaki dengedir; bu iki maliyet eşit olduğunda toplam en düşüktür. Model sabit talep ve sabit fiyat varsayar, miktar indirimlerini hesaba katmaz. Hesap için [[arac:ekonomik-siparis-miktari-hesapla|Ekonomik Sipariş Miktarı Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "E-ticarette ideal stok seviyesi nasıl belirlenir? Ölü stok nedir?",
      p: [
        "E-ticarette stok kararları birden fazla satış kanalı, kampanya dönemleri ve pazaryeri teslim süresi taahhütleri nedeniyle daha da önemlidir. Stoksuz kalan bir ürün yalnızca o satışı değil, pazaryerindeki görünürlüğü ve mağaza puanını da etkileyebilir. Fazla stok ise nakdi bağlar ve depolama maliyeti yaratır."
      ],
      ul: [
        "<strong>ABC analizi:</strong> Ürünleri ciroya katkısına göre sınıflandırın. Cironun büyük kısmını oluşturan A grubu ürünleri yakından izleyin, emniyet stokunu bunlar için daha titiz belirleyin.",
        "<strong>Ürün bazında devir hızı:</strong> Mağaza ortalaması iyi görünse de bazı ürünler hiç dönmüyor olabilir.",
        "<strong>Kampanya ve sezon:</strong> Ortalama günlük satış, kampanya dönemlerinde birkaç katına çıkabilir; emniyet stokunu takvime göre güncelleyin.",
        "<strong>Tedarikçi güvenilirliği:</strong> Tedarik süresi sık sapıyorsa emniyet stoku bu belirsizliği de karşılamalıdır.",
        "<strong>Ölü stok:</strong> Belirli bir süre (örneğin 6–12 ay) hiç satılmayan ya da satılması beklenmeyen stoktur; modası geçmiş, son kullanma tarihi yaklaşan ya da eski model ürünler bu gruba girer."
      ],
      after: [
        "Ölü stok için erken uyarı sistemi kurmak, onu sonradan eritmekten daha ucuzdur. Belirli bir gün sayısı boyunca hareket görmeyen ürünleri listelemek, indirim, paket satış ya da tedarikçiye iade seçeneklerini zamanında değerlendirmenizi sağlar. Pazaryeri komisyonlarıyla birlikte gerçek kârınızı görmek için [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Stok devir hızı ve nakit dönüşüm süresi",
      p: [
        "Stokta kalma süresi, işletmenin nakit döngüsünün bir parçasıdır. Nakit dönüşüm süresi, tedarikçiye ödenen paranın müşteriden tahsil edilene kadar geçen süreyi gösterir ve stok süresi ile alacak tahsil süresinin toplamından, borç ödeme süresinin çıkarılmasıyla bulunur."
      ],
      formula: "Nakit dönüşüm süresi = stokta kalma süresi + alacak tahsil süresi − borç ödeme süresi",
      after: [
        "Örnekteki işletmenin stokta kalma süresi 61 gün, müşteri tahsilatı ortalama 30 gün, tedarikçiye ödeme ortalama 45 gün ise nakit dönüşüm süresi 61 + 30 − 45 = 46 gündür. Stok devir hızını 6'dan 8'e çıkarmak stok süresini yaklaşık 46 güne indirir ve nakit dönüşüm süresini 31 güne düşürür; bu, işletmenin aynı ciroyu daha az işletme sermayesiyle döndürmesi demektir. Bu hesabı [[arac:nakit-donusum-suresi-hesapla|Nakit Dönüşüm Süresi Hesaplama aracıyla]] yapabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Satış hasılatıyla hesaplamak:</strong> Pay olarak satış tutarı kullanılırsa devir hızı kâr marjı kadar şişer; SMM kullanın.",
        "<strong>Yalnızca dönem sonu stokunu kullanmak:</strong> Yıl sonunda bilinçli olarak azaltılan stok, oranı yanıltıcı biçimde yükseltir.",
        "<strong>Tüm ürünler için tek emniyet stoku:</strong> Hızlı ve yavaş satan ürünler aynı kuralla yönetilemez.",
        "<strong>Tedarik süresini iş günü-takvim günü karıştırarak yazmak:</strong> Satış takvim gününe göre, tedarik iş gününe göre verilirse hesap kayar.",
        "<strong>EOQ'yu katı kural sanmak:</strong> Koli içi adet, palet ve minimum sipariş miktarı gibi pratik sınırlara göre yuvarlamak gerekir."
      ]
    }
  ],
  faq: [
    ["Stok devir hızı nedir?", "Stok devir hızı, bir işletmenin stoklarını bir dönemde kaç kez satıp yenilediğini gösteren orandır. Yüksek oran stoğun hızlı döndüğünü, düşük oran ise ürünlerin uzun süre depoda beklediğini ve sermayenin stokta bağlı kaldığını gösterir."],
    ["Stok devir hızı nasıl hesaplanır?", "Satılan malın maliyeti, dönem başı ve dönem sonu stokunun ortalamasına bölünür. Örneğin yıllık SMM 1.800.000 TL ve ortalama stok 300.000 TL ise stok devir hızı 6'dır, yani stoklar yılda 6 kez yenilenmiştir."],
    ["Stokta kalma süresi nasıl bulunur?", "Yıldaki gün sayısı olan 365, stok devir hızına bölünür. Devir hızı 6 olan bir işletmede stokta kalma süresi yaklaşık 61 gündür; bu, ürünlerin ortalama iki ay depoda beklediği anlamına gelir."],
    ["Emniyet stoku nasıl hesaplanır?", "Basit yöntemde en yüksek günlük satış ile en uzun tedarik süresinin çarpımından ortalama satış ile ortalama tedarik süresinin çarpımı çıkarılır. Servis düzeyi yönteminde Z katsayısı, günlük satışın standart sapması ve tedarik süresinin karekökü çarpılır."],
    ["Ekonomik sipariş miktarı (EOQ) nedir?", "EOQ, sipariş verme maliyeti ile stok tutma maliyetinin toplamını en aza indiren sipariş miktarıdır. İki kere yıllık talep ile sipariş maliyetinin çarpımı, birim elde bulundurma maliyetine bölünüp karekökü alınarak bulunur."],
    ["Yüksek stok devir hızı iyi midir?", "Genellikle stoğun verimli kullanıldığını gösterir, ancak aşırı yüksek oran sık sık stoksuz kalındığına ve satış kaçırıldığına işaret edebilir. Oranı sektör ortalaması, stoksuz kalma sayısı ve sipariş maliyetleriyle birlikte değerlendirmek gerekir."],
    ["E-ticarette ideal stok seviyesi nasıl belirlenir?", "Ürün bazında ortalama satış, tedarik süresi ve satış dalgalanması belirlenir; bunlarla emniyet stoku ve yeniden sipariş noktası hesaplanır. Kampanya dönemleri, pazaryeri teslim taahhütleri ve ABC analizine göre bu değerler düzenli güncellenir."],
    ["Ölü stok nedir?", "Ölü stok, uzun süredir hiç satılmayan ve yakın gelecekte satılması beklenmeyen stoktur. Modası geçmiş, eski model ya da son kullanma tarihi yaklaşan ürünler bu gruba girer; nakdi bağladığı ve depo maliyeti yarattığı için erken tespit edilip eritilmelidir."],
    ["Yeniden sipariş noktası nasıl hesaplanır?", "Ortalama günlük satış tedarik süresiyle çarpılır ve üzerine emniyet stoku eklenir. Günde 20 adet satış, 5 günlük tedarik süresi ve 23 adet emniyet stokuyla yeniden sipariş noktası 123 adettir."]
  ],
  tools: ["stok-devir-hizi-hesapla", "emniyet-stogu-hesapla", "ekonomik-siparis-miktari-hesapla", "nakit-donusum-suresi-hesapla"],
  related: ["pazaryeri-komisyonu-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir"]
};
