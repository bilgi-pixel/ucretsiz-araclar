export default {
  slug: "ekonomik-siparis-miktari-eoq-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Ekonomik Sipariş Miktarı (EOQ) Nedir? Emniyet Stoğu ve Sipariş Noktası",
  pageTitle: "Ekonomik Sipariş Miktarı (EOQ) Nedir? Formül ve Örnek",
  description: "EOQ, sipariş ve stok tutma maliyetlerinin toplamını en aza indiren miktardır: Q = √(2DS ÷ H). Emniyet stoğu, yeniden sipariş noktası ve çözümlü örnek burada.",
  keywords: ["ekonomik sipariş miktarı", "eoq formülü", "emniyet stoğu nedir", "yeniden sipariş noktası", "stok maliyeti", "stok yönetimi", "eoq hesaplama örneği"],
  lead: "Ekonomik sipariş miktarı (EOQ, Economic Order Quantity), <strong>sipariş verme maliyeti ile stok tutma maliyetinin toplamını en düşük yapan</strong> sipariş büyüklüğüdür ve <strong>Q* = √(2 × D × S ÷ H)</strong> formülüyle bulunur: D yıllık talep, S sipariş başına sabit maliyet, H bir birimi bir yıl stokta tutmanın maliyetidir. Yıllık 12.000 adet satılan, sipariş başı maliyeti 400 TL ve birim stok tutma maliyeti yılda 12 TL olan bir ürün için EOQ yaklaşık 894 adettir. Bu sayfada formülün mantığını, emniyet stoğunu, yeniden sipariş noktasını ve modelin küçük işletmelerde nasıl uyarlanacağını örneklerle bulacaksınız.",
  kisaCevap: [
    "EOQ = √(2 × yıllık talep × sipariş başına maliyet ÷ birim başına yıllık stok tutma maliyeti).",
    "EOQ noktasında yıllık sipariş maliyeti ile yıllık stok tutma maliyeti birbirine eşittir.",
    "Stok tutma maliyeti genellikle birim maliyetin yıllık yüzdesi olarak hesaplanır; sermaye, depo, sigorta, fire ve eskime maliyetlerini içerir.",
    "Emniyet stoğu (istatistiksel yöntem) = Z × günlük talebin standart sapması × √tedarik süresi; %95 hizmet düzeyi için Z ≈ 1,645.",
    "Yeniden sipariş noktası = günlük ortalama talep × tedarik süresi + emniyet stoğu.",
    "Model sabit talep ve fiyat varsayar; mevsimsellik, toplu alım indirimi ve hızlı fiyat artışlarında sonuç bir başlangıç noktası olarak kullanılmalıdır."
  ],
  figure: {
    alt: "Sipariş miktarına göre yıllık maliyet eğrileri: stok tutma maliyeti miktarla doğrusal artıyor, sipariş maliyeti miktar arttıkça azalıyor, toplam maliyet eğrisi 894 adette en düşük değere, yaklaşık 10.733 TL'ye iniyor. Bu noktada iki maliyet de 5.367 TL.",
    caption: "Yıllık talep 12.000 adet, sipariş başı maliyet 400 TL, birim stok tutma maliyeti yılda 12 TL için çizilmiştir. Toplam maliyet eğrisi en altta yayvandır: EOQ'dan yüzde 30 sapmak toplam maliyeti yalnızca birkaç yüzde artırır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">EOQ: iki maliyetin dengelendiği nokta</text>
  <line x1="80" y1="60" x2="80" y2="340" class="st" fill="none"/>
  <line x1="80" y1="340" x2="690" y2="340" class="st" fill="none"/>
  <g class="sb dash"><line x1="80" y1="275" x2="680" y2="275" fill="none"/><line x1="80" y1="210" x2="680" y2="210" fill="none"/><line x1="80" y1="145" x2="680" y2="145" fill="none"/><line x1="80" y1="80" x2="680" y2="80" fill="none"/></g>
  <g class="sm end t2"><text x="72" y="344">0</text><text x="72" y="279">4.000</text><text x="72" y="214">8.000</text><text x="72" y="149">12.000</text><text x="72" y="84">16.000</text></g>
  <g class="sm mid t2"><text x="80" y="358">0</text><text x="230" y="358">500</text><text x="380" y="358">1.000</text><text x="530" y="358">1.500</text><text x="680" y="358">2.000</text></g>
  <text x="385" y="380" class="sm mid">Sipariş miktarı Q (adet)</text>
  <text x="20" y="54" class="sm b">TL/yıl</text>
  <line x1="80" y1="340" x2="680" y2="145" class="sok sw" fill="none"/>
  <polyline points="170,80 200,145 230,184 290,228.6 320,242.5 348.3,252.8 380,262 440,275 530,288 680,301" class="sa sw" fill="none"/>
  <polyline points="200,106 230,135.3 290,160.3 320,164.5 348.3,165.6 380,164.5 440,158 530,141.8 680,106" class="sp sw" fill="none"/>
  <line x1="348.3" y1="165.6" x2="348.3" y2="340" class="st dash" fill="none"/>
  <circle cx="348.3" cy="165.6" r="6" class="p"/><circle cx="348.3" cy="252.8" r="6" class="ok"/>
  <text x="598" y="138" class="sm b ok">stok tutma = H × Q ÷ 2</text>
  <text x="520" y="312" class="sm b">sipariş = S × D ÷ Q</text>
  <text x="580" y="98" class="sm b p">toplam maliyet</text>
  <rect x="356" y="64" width="190" height="62" rx="8" class="sf sb"/>
  <text x="368" y="86" class="sm b">Q* = √(2 × 12.000 × 400 ÷ 12)</text>
  <text x="368" y="110" class="sm">= 894 adet · toplam 10.733 TL</text>
  <text x="356" y="400" class="sm mid b p">EOQ ≈ 894</text>
</svg>`
  },
  sections: [
    {
      h: "Ekonomik sipariş miktarı (EOQ) nedir?",
      p: [
        "Bir ürünü stokta tutan her işletme aynı ikilemle karşılaşır: az ve sık sipariş verirseniz her siparişin sabit maliyetini (satın alma personelinin zamanı, nakliye, kabul ve kontrol, fatura işlemleri) tekrar tekrar ödersiniz; çok ve seyrek sipariş verirseniz depoda büyük stok birikir, paranız rafta bağlanır, depolama ve sigorta maliyeti artar, ürün eskime ya da bozulma riski taşır.",
        "Ekonomik sipariş miktarı modeli bu iki zıt maliyeti dengeler. 1913'te geliştirilen ve bugün hâlâ üretim, lojistik ve tedarik zinciri derslerinin temel konusu olan bu model, bir siparişte kaç birim alınması gerektiğini tek bir formülle verir. Basitliği nedeniyle gerçek hayatın tüm karmaşasını yansıtmaz; ama sipariş politikasını sezgiden çıkarıp hesaba dayandırmak için çok güçlü bir başlangıç noktasıdır."
      ]
    },
    {
      h: "EOQ formülü ve terimleri",
      formula: "Q* = √(2 × D × S ÷ H)\nD: yıllık talep (adet) · S: sipariş başına sabit maliyet (TL) · H: birim başına yıllık stok tutma maliyeti (TL)\nYıllık sipariş sayısı = D ÷ Q* · Sipariş aralığı = çalışma günü ÷ sipariş sayısı\nYıllık toplam stok maliyeti = (D ÷ Q) × S + (Q ÷ 2) × H",
      p: [
        "Formülün arkasındaki mantık şöyledir: talep yıl boyunca düzenli ise stok, sipariş geldiğinde Q'ya çıkar ve sıfıra kadar doğrusal azalır; ortalama stok Q ÷ 2 olur. Yıllık stok tutma maliyeti (Q ÷ 2) × H, yıllık sipariş maliyeti (D ÷ Q) × S'dir. Birincisi Q ile artar, ikincisi Q ile azalır; toplamın en düşük olduğu nokta, ikisinin eşitlendiği yerdir. Bu eşitlikten Q çekildiğinde EOQ formülü elde edilir."
      ],
      table: {
        head: ["Terim", "İçerdiği kalemler", "Dikkat edilecek nokta"],
        rows: [
          ["D – yıllık talep", "Satış ya da üretim tüketimi (adet)", "Geçmiş satışlar ve beklenen büyüme birlikte düşünülmeli"],
          ["S – sipariş maliyeti", "Nakliye sabit kısmı, satın alma ve kabul işçiliği, kontrol, evrak", "Ürün bedeli dahil değildir; yalnızca sipariş başına sabit kısım"],
          ["H – stok tutma maliyeti", "Sermaye maliyeti, depo kirası ve enerji, sigorta, fire, eskime", "Genellikle birim maliyetin yıllık yüzdesi olarak hesaplanır"]
        ]
      }
    },
    {
      h: "EOQ formülü nasıl uygulanır? Çözümlü örnek",
      p: [
        "Bir toptancının yıllık 12.000 adet sattığı bir ürünü düşünelim. Her siparişte nakliye, satın alma ve kabul için ortalama 400 TL sabit maliyet oluşuyor. Ürünün birim maliyeti 60 TL ve işletme stok tutma maliyetini yıllık %20 olarak hesaplıyor; buna göre H = 60 × 0,20 = 12 TL. İşletme yılda 300 gün çalışıyor. Tüm tutarlar örnektir."
      ],
      ol: [
        "<strong>EOQ:</strong> Q* = √(2 × 12.000 × 400 ÷ 12) = √800.000 = 894,4 adet. Pratikte 900 adet ya da koli katına yuvarlanabilir.",
        "<strong>Yıllık sipariş sayısı:</strong> 12.000 ÷ 894,4 = 13,4 sipariş.",
        "<strong>Sipariş aralığı:</strong> 300 ÷ 13,4 = 22,4 çalışma günü; yaklaşık her dört haftada bir sipariş.",
        "<strong>Yıllık sipariş maliyeti:</strong> 13,42 × 400 = 5.367 TL.",
        "<strong>Yıllık stok tutma maliyeti:</strong> (894,4 ÷ 2) × 12 = 5.367 TL. İki maliyetin eşit olduğuna dikkat edin.",
        "<strong>Toplam:</strong> 5.367 + 5.367 = 10.733 TL. Ürün bedeli (12.000 × 60 = 720.000 TL) her senaryoda aynı olduğu için bu karşılaştırmaya girmez."
      ],
      table: {
        head: ["Sipariş miktarı", "Sipariş sayısı/yıl", "Sipariş maliyeti", "Stok tutma maliyeti", "Toplam"],
        rows: [
          ["500", "24", "9.600 TL", "3.000 TL", "12.600 TL"],
          ["894 (EOQ)", "13,4", "5.367 TL", "5.367 TL", "10.733 TL"],
          ["1.200", "10", "4.000 TL", "7.200 TL", "11.200 TL"],
          ["1.500", "8", "3.200 TL", "9.000 TL", "12.200 TL"],
          ["2.000", "6", "2.400 TL", "12.000 TL", "14.400 TL"]
        ],
        caption: "EOQ'dan %34 fazla (1.200 adet) sipariş vermek toplam maliyeti yalnızca %4,3 artırıyor. Bu duyarsızlık, koli ya da palet katına yuvarlamanın güvenle yapılabileceğini gösterir."
      },
      after: [
        "Bu hesabı [[arac:ekonomik-siparis-miktari-hesapla|Ekonomik Sipariş Miktarı (EOQ) Hesaplama]] aracı yapar: yıllık talep, sipariş maliyeti, stok tutma maliyeti ve çalışma günü girildiğinde EOQ'yu, sipariş sıklığını, iki maliyet kalemini ve ortalama stoğu verir."
      ]
    },
    {
      h: "Stok tutma maliyeti neleri içerir?",
      p: [
        "Stok tutma maliyeti, çoğu işletmenin hafife aldığı kalemdir. Yalnızca depo kirasından ibaret değildir; rafta duran malın her gün işletmeye bir maliyeti vardır. Bu maliyeti birim başına TL olarak hesaplamak zorsa, birim maliyetin yıllık yüzdesi olarak tahmin etmek pratik bir yoldur."
      ],
      ul: [
        "<strong>Sermaye maliyeti:</strong> Stoğa bağlanan paranın alternatif getirisi ya da kredi faizi. Yüksek enflasyon ve faiz dönemlerinde en büyük kalem budur.",
        "<strong>Depolama:</strong> Kira ya da amortisman, enerji, raf ve forklift giderleri, depo personeli.",
        "<strong>Sigorta ve vergiler:</strong> Stok değerine bağlı sigorta primleri.",
        "<strong>Fire ve kayıp:</strong> Kırılma, bozulma, hırsızlık, sayım farkları.",
        "<strong>Eskime:</strong> Modası geçen, son kullanma tarihi yaklaşan ya da yeni modeli çıkan ürünlerde değer kaybı."
      ],
      after: [
        "Bu kalemlerin toplamı sektöre göre çok değişir; birçok kaynakta birim maliyetin yıllık %15–30'u gibi aralıklar örnek olarak verilir. Kendi işletmeniz için bir yılın gerçek giderlerini ortalama stok değerine bölerek daha isabetli bir oran bulabilirsiniz. Faiz ve enflasyonun paranın değerine etkisini [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz]] yazısı açıklıyor."
      ]
    },
    {
      h: "Emniyet stoğu nasıl hesaplanır?",
      p: [
        "EOQ \"ne kadar\" sorusunu cevaplar; \"ne zaman\" sorusu için emniyet stoğu ve yeniden sipariş noktası gerekir. Talep ve tedarik süresi hiçbir zaman tam sabit olmadığı için, sipariş verdikten sonra mal gelene kadar geçen sürede stok bitebilir. Emniyet stoğu bu belirsizliğe karşı tutulan tampondur. İki yaygın yöntem vardır."
      ],
      formula: "İstatistiksel yöntem: SS = Z × σ_günlük × √L\nEn kötü durum yöntemi: SS = (en yüksek günlük satış × en uzun tedarik süresi) − (ortalama günlük satış × ortalama tedarik süresi)\nZ: %90 → 1,28 · %95 → 1,645 · %97,5 → 1,96 · %99 → 2,33",
      ol: [
        "<strong>Veriler:</strong> Günlük ortalama satış 40 adet (12.000 ÷ 300), günlük satışın standart sapması 8 adet, tedarik süresi 9 gün, hedef hizmet düzeyi %95.",
        "<strong>İstatistiksel emniyet stoğu:</strong> SS = 1,645 × 8 × √9 = 1,645 × 8 × 3 = 39,5 → 40 adet.",
        "<strong>En kötü durum yöntemi:</strong> En yüksek günlük satış 55, en uzun tedarik süresi 12 gün olsun. SS = 55 × 12 − 40 × 9 = 660 − 360 = 300 adet.",
        "<strong>Karşılaştırma:</strong> İkinci yöntem çok daha temkinlidir ve yedi kat fazla stok önerir. Bu, her iki olumsuzluğun aynı anda yaşanacağını varsayar; stok bitmesinin maliyeti çok yüksek olan kritik ürünler için anlamlı, sıradan ürünler için pahalı bir güvencedir."
      ],
      after: [
        "Tedarik süresi de değişkense (örneğin ithal ürünlerde) istatistiksel formül hem talep hem süre belirsizliğini içerecek şekilde genişletilir. [[arac:emniyet-stogu-hesapla|Emniyet Stoğu Hesaplama]] aracı iki yöntemi de sunar ve yeniden sipariş noktasını birlikte verir. Standart sapmanın nasıl hesaplandığını [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Yeniden sipariş noktası nedir?",
      p: [
        "Yeniden sipariş noktası (ROP), stok seviyesi bu değere indiğinde yeni siparişin verilmesi gereken eşiktir. Tedarik süresi boyunca beklenen talep ile emniyet stoğunun toplamıdır. Stok bu noktaya düştüğünde sipariş verilirse, mal geldiğinde ortalama olarak geriye emniyet stoğu kadar ürün kalır."
      ],
      formula: "ROP = günlük ortalama talep × tedarik süresi (gün) + emniyet stoğu\nÖrnek: 40 × 9 + 39,5 = 399,5 → 400 adet",
      after: [
        "Örnekteki işletme için politika artık nettir: stok 400 adede indiğinde 894 (ya da 900) adetlik sipariş verilir. Ortalama stok yaklaşık Q ÷ 2 + SS = 447 + 40 = 487 adet olur. Bu politika, muhasebe ya da stok programınızda \"minimum stok\" ve \"sipariş miktarı\" alanlarına girilerek otomatik uyarıya dönüştürülebilir. Çoklu kanalda (kendi siteniz ve pazaryerleri) satış yapıyorsanız tüm kanalların toplam talebini tek stokta izlemek, ROP hesabının doğru çalışması için şarttır."
      ]
    },
    {
      h: "Stok devir hızı ile EOQ ilişkisi nedir?",
      p: [
        "Stok devir hızı, bir dönemde satılan malın maliyetinin ortalama stoğa bölünmesiyle bulunur ve stoğun yılda kaç kez yenilendiğini gösterir. EOQ ve emniyet stoğu ortalama stoğu belirlediği için devir hızını doğrudan etkiler. Örneğimizde ortalama stok 487 adet, yıllık satış 12.000 adettir; adet bazında devir hızı 12.000 ÷ 487 = 24,6, yani stok yılda yaklaşık 25 kez yenilenir ve ortalama 300 ÷ 24,6 = 12 çalışma günü stokta kalır."
      ],
      after: [
        "Sipariş miktarını EOQ'nun üzerine çıkarmak devir hızını düşürür, stokta kalma süresini uzatır. Daha küçük ve sık siparişler devir hızını artırır ama sipariş maliyetini yükseltir. Devir hızının yorumlanması ve sektör karşılaştırmaları için [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı nasıl hesaplanır]] yazısına, hesap için [[arac:stok-devir-hizi-hesapla|Stok Devir Hızı Hesaplama]] aracına bakabilirsiniz."
      ]
    },
    {
      h: "Küçük işletmeler EOQ kullanabilir mi?",
      p: [
        "Kullanabilir ve çoğu zaman en çok fayda sağlayanlar küçük işletmelerdir, çünkü sınırlı nakitleri rafta bağlandığında işletmenin nefes alanı daralır. Tüm ürünler için ayrıntılı hesap yapmak gerekmez; satış hacmi ve tutar olarak en büyük paya sahip ürünlerle (ABC analizindeki A grubu) başlamak en verimli yoldur. Bu ürünler genellikle stok değerinin büyük kısmını oluşturur."
      ],
      ul: [
        "<strong>Tahmini verilerle başlayın:</strong> S ve H için kaba tahminler bile sezgiyle verilen sipariş miktarından genellikle daha iyi sonuç verir; model bu girdilerdeki hatalara karşı duyarsızdır.",
        "<strong>Tedarikçi kısıtlarını ekleyin:</strong> Minimum sipariş miktarı, koli ve palet katları EOQ'nun üstünde ya da altında olabilir; en yakın uygulanabilir miktarı seçin.",
        "<strong>Toplu alım indirimlerini karşılaştırın:</strong> İndirimli miktardaki toplam maliyeti (ürün bedeli dahil) EOQ'daki toplam maliyetle karşılaştırın.",
        "<strong>Fiyat artışı dönemlerini ayrı değerlendirin:</strong> Hızlı fiyat artışı beklenen dönemlerde erken ve fazla alım cazip görünebilir; bu bir EOQ kararı değil, nakit ve risk kararıdır.",
        "<strong>Mevsimsel ürünlerde dönem bazlı hesap yapın:</strong> Yıllık ortalama yerine sezon içindeki talebi kullanın."
      ]
    },
    {
      h: "Tedarik süresi belirsizse ne yapılmalı?",
      p: [
        "İthal ürünler, yoğun dönemlerde kargo gecikmeleri ya da tek tedarikçiye bağımlılık tedarik süresini belirsiz hâle getirir. Bu durumda geçmiş siparişlerin gerçekleşen teslim sürelerini kaydedip ortalama ve en uzun değerleri çıkarmak ilk adımdır. Ardından emniyet stoğu hesabında hem talep hem süre belirsizliğini içeren yöntemi ya da en kötü durum yöntemini kullanabilirsiniz.",
        "Pratik önlemler de en az formüller kadar etkilidir: kritik ürünler için ikinci bir tedarikçi belirlemek, tedarikçiyle sabit teslim günleri üzerinde anlaşmak, sipariş durumunu düzenli takip etmek ve stok seviyelerini her gün güncel tutmak. Belirsizlik azaldıkça gereken emniyet stoğu da azalır ve rafta bağlanan para serbest kalır."
      ]
    }
  ],
  faq: [
    ["Ekonomik sipariş miktarı (EOQ) nedir?", "Ekonomik sipariş miktarı, yıllık sipariş verme maliyeti ile stok tutma maliyetinin toplamını en aza indiren sipariş büyüklüğüdür. Q = √(2 × yıllık talep × sipariş maliyeti ÷ birim stok tutma maliyeti) formülüyle hesaplanır ve bu noktada iki maliyet birbirine eşittir."],
    ["EOQ formülü nasıl uygulanır?", "Yıllık talep, sipariş başına sabit maliyet ve birim başına yıllık stok tutma maliyeti belirlenir ve formüle konur. Örneğin 12.000 adet talep, 400 TL sipariş maliyeti ve 12 TL stok tutma maliyetiyle EOQ yaklaşık 894 adet çıkar; yılda yaklaşık 13 sipariş verilir."],
    ["Emniyet stoğu nasıl hesaplanır?", "İstatistiksel yöntemde emniyet stoğu, hizmet düzeyine karşılık gelen Z katsayısı ile günlük talebin standart sapmasının ve tedarik süresinin karekökünün çarpımıdır. Yüzde 95 hizmet düzeyi için Z yaklaşık 1,645'tir. Daha temkinli bir yol en kötü durum yöntemidir."],
    ["Yeniden sipariş noktası nedir?", "Yeniden sipariş noktası, stok bu seviyeye indiğinde yeni sipariş verilmesi gereken eşiktir. Günlük ortalama talep ile tedarik süresinin çarpımına emniyet stoğu eklenerek bulunur. Günde 40 adet satış, 9 gün tedarik ve 40 adet emniyet stoğuyla nokta 400 adettir."],
    ["Stok tutma maliyeti neleri içerir?", "Stok tutma maliyeti; stoğa bağlanan paranın sermaye maliyetini, depo kirası ve enerjisini, depo personelini, sigortayı, fire ve kayıpları ve eskime nedeniyle oluşan değer kaybını içerir. Genellikle birim maliyetin yıllık yüzdesi olarak tahmin edilir."],
    ["Küçük işletmeler EOQ kullanabilir mi?", "Evet. Küçük işletmeler en çok satan ve en yüksek stok değerine sahip ürünlerden başlayarak EOQ'yu kullanabilir. Model girdilerdeki küçük hatalara duyarsız olduğu için tahmini maliyetlerle bile sezgisel kararlardan daha iyi sonuç verir; tedarikçinin koli ve minimum sipariş kısıtları ayrıca dikkate alınmalıdır."],
    ["Stok devir hızı ile EOQ ilişkisi nedir?", "EOQ ve emniyet stoğu ortalama stok seviyesini belirler; ortalama stok da stok devir hızının paydasıdır. Sipariş miktarı büyüdükçe ortalama stok artar ve devir hızı düşer. EOQ'ya yakın sipariş vermek, maliyet ile devir hızı arasında dengeli bir sonuç sağlar."],
    ["Tedarik süresi belirsizse ne yapılmalı?", "Geçmiş siparişlerin gerçekleşen teslim süreleri kaydedilerek ortalama ve en uzun süre bulunmalı, emniyet stoğu hem talep hem süre belirsizliğini içeren bir yöntemle hesaplanmalıdır. İkinci tedarikçi bulmak ve sabit teslim günleri üzerinde anlaşmak belirsizliği azaltır."],
    ["EOQ'dan biraz sapmak maliyeti çok artırır mı?", "Hayır. Toplam maliyet eğrisi EOQ çevresinde yayvandır. Örnekte EOQ'dan yüzde 34 fazla sipariş vermek toplam stok maliyetini yalnızca yüzde 4,3 artırıyor. Bu nedenle sipariş miktarını koli, palet ya da tedarikçinin minimum miktarına yuvarlamak güvenlidir."]
  ],
  tools: ["ekonomik-siparis-miktari-hesapla", "emniyet-stogu-hesapla", "stok-devir-hizi-hesapla"],
  related: ["stok-devir-hizi-nasil-hesaplanir", "standart-sapma-nasil-hesaplanir", "basabas-noktasi-nedir", "kar-marji-nasil-hesaplanir"],
  sources: [
    ["KOSGEB – işletme yönetimi ve girişimcilik destekleri", "https://www.kosgeb.gov.tr/"],
    ["Ticaret Bakanlığı – işletmeler için bilgi", "https://ticaret.gov.tr/"]
  ]
};
