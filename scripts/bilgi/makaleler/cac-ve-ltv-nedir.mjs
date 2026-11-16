export default {
  slug: "cac-ve-ltv-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "CAC ve LTV Nedir? Müşteri Edinme Maliyeti ve Yaşam Boyu Değer Hesabı",
  pageTitle: "CAC ve LTV Nedir? Müşteri Edinme Maliyeti ve LTV:CAC Oranı",
  description: "CAC, yeni bir müşteri kazanmanın ortalama maliyetidir; LTV, müşterinin işletmeye bıraktığı toplam brüt kârdır. Formüller, 3:1 kuralı ve örnekler.",
  keywords: ["cac nedir", "ltv nedir", "müşteri edinme maliyeti", "müşteri yaşam boyu değeri", "ltv cac oranı", "cac nasıl hesaplanır", "ltv nasıl hesaplanır", "cac geri dönüş süresi"],
  lead: "<strong>CAC</strong> (müşteri edinme maliyeti), belirli bir dönemdeki <strong>toplam pazarlama ve satış harcamasının o dönemde kazanılan yeni müşteri sayısına bölünmesiyle</strong> bulunur; <strong>LTV</strong> (müşteri yaşam boyu değeri) ise bir müşterinin işletmeyle ilişkisi boyunca bıraktığı toplam brüt kârdır. İkisini birlikte okumak, büyümenin kârlı olup olmadığını gösterir: yaygın kabul gören kurala göre LTV, CAC'nin en az <strong>3 katı</strong> olmalıdır. Bu rehberde iki metriğin formüllerini, e-ticaret ve abonelik için çözümlü örnekleri, geri dönüş süresini, dönüşüm oranının CAC'ye etkisini ve CAC'yi düşürmenin yollarını bulacaksınız.",
  kisaCevap: [
    "CAC = (reklam + diğer satış ve pazarlama giderleri) ÷ aynı dönemde kazanılan yeni müşteri sayısı.",
    "LTV (e-ticaret) = ortalama sipariş tutarı × yıllık sipariş sayısı × müşteri ömrü (yıl) × brüt kâr marjı.",
    "LTV (abonelik) = aylık müşteri başı gelir × brüt kâr marjı ÷ aylık müşteri kaybı oranı (churn).",
    "LTV:CAC oranı 3:1 ve üzeri genellikle sağlıklı kabul edilir; 1:1'in altı her yeni müşteride para kaybı demektir.",
    "CAC geri dönüş süresi = CAC ÷ müşteri başına aylık brüt kâr; 12 ayın altı çoğu işletme için hedeftir.",
    "Yalnızca reklamla gelen müşterilerde CAC ≈ tıklama başı maliyet ÷ dönüşüm oranı; dönüşüm oranı arttıkça CAC düşer."
  ],
  figure: {
    alt: "LTV ile CAC karşılaştırma çubuğu: örnek e-ticaret mağazasında CAC 250 TL, LTV 720 TL, oran 2,9:1; abonelik örneğinde CAC 1.000 TL, LTV 4.000 TL, oran 4:1. Altında 1:1, 3:1 ve 5:1 eşiklerini gösteren ölçek.",
    caption: "İki örnek işletmede bir müşteriyi kazanmanın maliyeti (CAC) ile o müşterinin bıraktığı brüt kâr (LTV) yan yana. E-ticaret örneği 3:1 hedefinin hemen altında kalıyor; abonelik örneği 4:1 ile sağlıklı bölgede. Alt ölçek oranların yaygın yorumunu gösteriyor.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">LTV, CAC'nin kaç katı? (örnek tutarlar)</text>
  <text x="20" y="64" class="b">E-ticaret mağazası</text>
  <text x="20" y="96" class="sm">CAC</text>
  <rect x="70" y="80" width="50" height="24" rx="4" class="dgs"/>
  <text x="128" y="97" class="sm b">250 TL</text>
  <text x="20" y="130" class="sm">LTV</text>
  <rect x="70" y="114" width="144" height="24" rx="4" class="oks"/>
  <text x="222" y="131" class="sm b">720 TL</text>
  <rect x="300" y="84" width="120" height="48" rx="8" class="ps"/>
  <text x="360" y="114" class="lg b mid">2,9 : 1</text>
  <text x="20" y="178" class="b">Abonelik hizmeti</text>
  <text x="20" y="210" class="sm">CAC</text>
  <rect x="70" y="194" width="100" height="24" rx="4" class="dgs"/>
  <text x="178" y="211" class="sm b">1.000 TL</text>
  <text x="20" y="244" class="sm">LTV</text>
  <rect x="70" y="228" width="400" height="24" rx="4" class="ok"/>
  <text x="478" y="245" class="sm b">4.000 TL</text>
  <rect x="560" y="198" width="140" height="48" rx="8" class="p"/>
  <text x="630" y="228" class="lg b mid sf">4 : 1</text>
  <rect x="20" y="290" width="680" height="30" rx="6" class="sf sb"/>
  <rect x="20" y="290" width="136" height="30" rx="6" class="dg"/>
  <rect x="156" y="290" width="136" height="30" class="dgs"/>
  <rect x="292" y="290" width="272" height="30" class="oks"/>
  <rect x="564" y="290" width="136" height="30" rx="6" class="ps"/>
  <g class="sm mid">
    <text x="88" y="310" class="b sf">1:1 altı</text>
    <text x="224" y="310" class="b">1–3</text>
    <text x="428" y="310" class="b">3–5 sağlıklı</text>
    <text x="632" y="310" class="b">5 üstü</text>
    <text x="88" y="342">zarar</text>
    <text x="224" y="342">ince marj</text>
    <text x="428" y="342">büyüme kârlı</text>
    <text x="632" y="342">az yatırım?</text>
  </g>
  <rect x="20" y="362" width="680" height="54" rx="8" class="sf sb"/>
  <text x="360" y="384" class="sm mid b">CAC = toplam satış ve pazarlama gideri ÷ yeni müşteri</text>
  <text x="360" y="404" class="sm mid">LTV = sepet × yıllık sipariş × ömür × brüt marj</text>
</svg>`
  },
  sections: [
    {
      h: "CAC (müşteri edinme maliyeti) nedir?",
      p: [
        "CAC (customer acquisition cost), işletmenin <strong>bir yeni müşteri kazanmak için ortalama ne kadar harcadığını</strong> gösterir. Bir ayda reklamlara, ajans ücretlerine, satış ekibine ve kampanyalara 75.000 TL harcayıp 300 yeni müşteri kazandıysanız, her müşteri size ortalama 250 TL'ye mal olmuştur.",
        "CAC yalnızca reklam harcaması değildir. Doğru bir hesapta pazarlama ve satış ekibinin maaş payı, kullanılan yazılımlar, içerik üretimi, fuar ve etkinlik giderleri, satış komisyonları ve yeni müşteriye özel indirimler de yer alır. Yalnızca reklam tutarını kullanmak CAC'yi olduğundan düşük gösterir ve büyümenin maliyetini gizler.",
        "Dönem uyumu da önemlidir. Bir müşteri reklamı ekim ayında görüp kasımda satın alıyorsa harcama ile kazanım farklı aylara düşer. Bu yüzden satış döngüsü uzun olan işlerde CAC üç aylık ya da yıllık dönemlerle hesaplanır.",
        "CAC'yi ortalama olarak hesaplamak bazen tabloyu bulanıklaştırır. Kendiliğinden, yani reklam görmeden gelen müşteriler ortalamaya katıldığında ücretli kanalların gerçek maliyeti olduğundan düşük görünür. Bu nedenle \"karma CAC\" (tüm müşteriler) ile \"ücretli CAC\" (yalnızca reklamla gelen müşteriler) ayrı izlenir. Reklam bütçesini artırma kararı verirken bakılması gereken değer ücretli CAC'dir; çünkü ek harcamanın getireceği müşteriler organik değil, ücretli kanallardan gelecektir."
      ],
      formula: "CAC = (reklam harcaması + diğer satış ve pazarlama giderleri) ÷ yeni müşteri sayısı\nÖrnek: (60.000 + 15.000) ÷ 300 = 250 TL"
    },
    {
      h: "CAC nasıl hesaplanır? Adım adım örnek",
      ol: [
        "Dönemi belirleyin: örneğin bir ay.",
        "Reklam harcamalarını toplayın: arama ve sosyal medya reklamları 60.000 TL.",
        "Diğer satış ve pazarlama giderlerini ekleyin: ajans, yazılım, içerik ve ekip payı 15.000 TL. Toplam 75.000 TL.",
        "Aynı dönemde ilk kez alışveriş yapan müşteri sayısını bulun: 300. Mevcut müşterilerin tekrar siparişleri bu sayıya dahil edilmez.",
        "Bölün: 75.000 ÷ 300 = <strong>250 TL</strong>. Yalnızca reklamla hesaplanan değer 60.000 ÷ 300 = 200 TL olurdu; aradaki 50 TL gizli maliyettir.",
        "Kanal bazında da hesaplayın: hangi kanalın daha pahalı müşteri getirdiğini görmek bütçeyi doğru dağıtmanızı sağlar."
      ],
      after: [
        "Bu hesabı [[arac:musteri-edinme-maliyeti-hesapla|Müşteri Edinme Maliyeti Hesaplama]] aracında yapabilirsiniz; araç LTV ve müşteri başı aylık kâr da girilirse LTV:CAC oranını ve geri dönüş süresini birlikte gösterir. Reklam getirisini ölçen ROAS ve ROI kavramları için [[bilgi:roas-ve-roi-nedir-nasil-hesaplanir|ROAS ve ROI nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "LTV (müşteri yaşam boyu değeri) nedir?",
      p: [
        "LTV (lifetime value) ya da CLV (customer lifetime value), bir müşterinin işletmeyle ilişkisi sürdüğü müddetçe getirdiği değerdir. CAC ile karşılaştırılacaksa LTV'nin <strong>ciro değil brüt kâr</strong> üzerinden hesaplanması gerekir; çünkü ürün maliyeti, kargo ve ödeme komisyonu gibi giderler müşteri edinmeye harcanabilecek parayı azaltır.",
        "LTV'yi üç şey belirler: müşterinin ne kadar harcadığı (sepet tutarı), ne sıklıkla geri geldiği ve ne kadar süre müşteri kaldığı. Bu üçünü artırmak, aynı CAC ile daha kârlı büyümek demektir. Brüt kâr marjının nasıl hesaplandığını [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "LTV nasıl hesaplanır? E-ticaret ve abonelik formülleri",
      formula: "E-ticaret: LTV = ortalama sipariş tutarı × yıllık sipariş sayısı × müşteri ömrü (yıl) × brüt marj\nAbonelik: LTV = aylık müşteri başı gelir × brüt marj ÷ aylık churn\nOrtalama müşteri ömrü (ay) = 1 ÷ aylık churn",
      p: [
        "<strong>E-ticaret örneği:</strong> Bir mağazanın ortalama sipariş tutarı 400 TL, müşteriler yılda ortalama 3 sipariş veriyor, ortalama 2 yıl müşteri kalıyor ve brüt kâr marjı %30. LTV = 400 × 3 × 2 × 0,30 = <strong>720 TL</strong>. Müşteri bu sürede 2.400 TL ciro bırakır, ancak bunun 720 TL'si brüt kârdır.",
        "<strong>Abonelik örneği:</strong> Aylık 200 TL ücretli bir hizmetin brüt marjı %80, her ay abonelerin %4'ü ayrılıyor. Ortalama ömür 1 ÷ 0,04 = 25 ay. LTV = 200 × 0,80 ÷ 0,04 = <strong>4.000 TL</strong>. Churn %4'ten %3'e düştüğünde ömür 33 aya, LTV yaklaşık 5.333 TL'ye çıkar; küçük bir iyileşme büyük fark yaratır."
      ],
      after: [
        "Yeni bir işletmede müşteri ömrü henüz gözlemlenmemiş olabilir. Bu durumda tahmini muhafazakâr tutun; gerçekleşmemiş uzun bir ömür varsaymak LTV'yi şişirir ve aşırı reklam harcamasına yol açar. Uzun ömürlü ilişkilerde gelecekteki kârları bugüne indirgemek daha doğru sonuç verir; bu yöntemin mantığı [[bilgi:net-bugunku-deger-ve-ic-verim-orani|net bugünkü değer]] yazısında anlatılıyor. Kendi verilerinizle hesap için [[arac:musteri-yasam-boyu-degeri-hesapla|Müşteri Yaşam Boyu Değeri Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "İdeal LTV/CAC oranı kaç olmalı?",
      p: [
        "LTV:CAC oranı, bir müşteriye harcanan her 1 liranın kaç lira brüt kâra dönüştüğünü gösterir. Girişim ve abonelik dünyasında yaygın kabul gören kural <strong>3:1</strong>'dir: müşteri edinme maliyeti, müşterinin bırakacağı brüt kârın üçte biri kadar olmalıdır. Kalan pay; genel giderleri, ürün geliştirmeyi ve kârı karşılar."
      ],
      table: {
        head: ["LTV:CAC oranı", "Yorum", "Ne yapılmalı?"],
        rows: [
          ["1:1'in altı", "Her yeni müşteri zarar ettiriyor", "Kanalları durdurun, fiyat ve marjı gözden geçirin"],
          ["1:1 – 3:1", "Kâr ince, genel giderleri karşılamakta zorlanabilir", "Dönüşüm oranını ve tekrar satışı artırın, pahalı kanalları ayıklayın"],
          ["3:1 – 5:1", "Genellikle sağlıklı ve sürdürülebilir büyüme", "Bütçeyi kontrollü artırın"],
          ["5:1'in üstü", "Çok verimli ama büyüme fırsatı kaçıyor olabilir", "Pazarlama yatırımını artırmayı değerlendirin"]
        ],
        caption: "Eşikler sektöre, nakit durumuna ve büyüme hedefine göre değişebilen genel kabullerdir."
      },
      after: [
        "Yukarıdaki e-ticaret örneğinde oran 720 ÷ 250 = 2,9:1'dir; hedefe yakın ama altında. Sepet tutarını %10 artırmak LTV'yi 792 TL'ye, oranı 3,2:1'e taşır. Abonelik örneğinde CAC 1.000 TL ise oran 4.000 ÷ 1.000 = 4:1'dir."
      ]
    },
    {
      h: "CAC geri dönüş süresi nedir?",
      p: [
        "LTV:CAC oranı uzun vadede kârlılığı gösterir, ama nakit akışını anlatmaz. Bir müşteriye bugün harcadığınız parayı kaç ayda geri kazandığınız da önemlidir; bu süre uzadıkça büyümek için daha fazla sermaye gerekir."
      ],
      formula: "Geri dönüş süresi (ay) = CAC ÷ müşteri başına aylık brüt kâr\nE-ticaret örneği: yıllık brüt kâr = 400 × 3 × 0,30 = 360 TL → aylık 30 TL → 250 ÷ 30 ≈ 8,3 ay\nAbonelik örneği: aylık brüt kâr = 200 × 0,80 = 160 TL → 1.000 ÷ 160 ≈ 6,3 ay",
      after: [
        "Çoğu işletme için 12 ayın altındaki geri dönüş süresi rahat kabul edilir. Nakit sıkıntısı yaşayan küçük işletmelerde bu süreyi kısaltmak, oranı yükseltmekten bile daha acil olabilir. Genel yatırım geri dönüşü mantığı için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Dönüşüm oranı CAC'yi nasıl etkiler?",
      p: [
        "Reklamla gelen müşterilerde CAC, bir ziyaretçiyi getirmenin maliyeti ile ziyaretçinin müşteriye dönüşme oranının birleşimidir. Tıklama başına 5 TL ödüyor ve ziyaretçilerin %2'sini müşteriye çeviriyorsanız, bir müşteri için 50 tıklama gerekir ve reklam CAC'si 50 × 5 = 250 TL olur."
      ],
      formula: "Reklam CAC'si ≈ tıklama başı maliyet ÷ dönüşüm oranı\n5 TL ÷ 0,02 = 250 TL · 5 TL ÷ 0,025 = 200 TL",
      after: [
        "Dönüşüm oranını %2'den %2,5'e çıkarmak, reklam bütçesine dokunmadan CAC'yi %20 düşürür. Bu yüzden ürün sayfası, ödeme adımları, kargo bilgisi ve güven unsurlarındaki iyileştirmeler doğrudan müşteri edinme maliyetine yansır. Kendi oranınızı [[arac:donusum-orani-hesapla|Dönüşüm Oranı Hesaplama]] aracıyla ölçebilirsiniz."
      ]
    },
    {
      h: "E-ticarette CAC nasıl düşürülür, LTV nasıl artırılır?",
      ul: [
        "<strong>Dönüşüm oranını artırın:</strong> Hızlı açılan sayfalar, net fiyat ve kargo bilgisi, kolay ödeme ve gerçek müşteri yorumları.",
        "<strong>Kanal karmasını gözden geçirin:</strong> Kanal bazında CAC hesaplayıp pahalı ve düşük kaliteli müşteri getiren kanalları kısın.",
        "<strong>Organik kanallara yatırım yapın:</strong> Arama motoru görünürlüğü, faydalı içerik ve e-posta listesi zamanla düşük maliyetli müşteri getirir.",
        "<strong>Tavsiye programları:</strong> Memnun müşterilerin getirdiği yeni müşteriler genellikle daha düşük CAC ve daha yüksek sadakatle gelir.",
        "<strong>Tekrar satın almayı teşvik edin:</strong> Sipariş sonrası bilgilendirme, tamamlayıcı ürün önerileri ve sadakat avantajları sipariş sıklığını artırır.",
        "<strong>Sepet tutarını büyütün:</strong> Ücretsiz kargo eşiği, paket ürünler ve ilgili ürün önerileri ortalama siparişi yükseltir.",
        "<strong>Müşteri kaybını azaltın:</strong> Hızlı müşteri hizmeti ve sorunsuz iade süreci, ilk siparişten sonra kaybedilen müşteri oranını düşürür."
      ]
    },
    {
      h: "Abonelik işinde LTV neden önemlidir?",
      p: [
        "Abonelik modelinde ilk ay alınan ücret genellikle müşteri edinme maliyetini karşılamaz; kâr, müşterinin aylarca kalmasıyla oluşur. Bu yüzden abonelik işlerinde LTV ve onu belirleyen <strong>churn</strong> (müşteri kaybı oranı) en kritik metriklerdir. Churn'deki küçük bir artış ortalama ömrü ve dolayısıyla LTV'yi hızla düşürür; aynı reklam bütçesi kârlı bir büyümeden zarara dönebilir.",
        "Yıllık ödeme seçenekleri, kullanımı artıran özellikler ve iptal etmeden önce sunulan alternatifler churn'ü azaltmanın yaygın yollarıdır. Müşteri başına gelirin zamanla artması (üst pakete geçiş, ek hizmetler) da LTV'yi yükseltir."
      ]
    }
  ],
  faq: [
    ["CAC (müşteri edinme maliyeti) nedir?", "CAC, bir işletmenin yeni bir müşteri kazanmak için ortalama ne kadar harcadığını gösteren metriktir. Belirli bir dönemdeki tüm pazarlama ve satış giderlerinin aynı dönemde kazanılan yeni müşteri sayısına bölünmesiyle hesaplanır."],
    ["CAC nasıl hesaplanır?", "Reklam harcaması ile ajans, yazılım, içerik ve satış ekibi gibi diğer satış ve pazarlama giderleri toplanır ve aynı dönemde ilk kez satın alan müşteri sayısına bölünür. 75.000 TL harcama ve 300 yeni müşteride CAC 250 TL'dir."],
    ["LTV (müşteri yaşam boyu değeri) nedir?", "LTV, bir müşterinin işletmeyle ilişkisi boyunca bıraktığı toplam değerdir. CAC ile karşılaştırılacağı zaman ciro yerine brüt kâr üzerinden hesaplanmalıdır; çünkü ürün ve hizmet maliyetleri müşteri edinmeye ayrılabilecek payı azaltır."],
    ["LTV nasıl hesaplanır?", "E-ticarette ortalama sipariş tutarı, yıllık sipariş sayısı, müşteri ömrü ve brüt kâr marjı çarpılır; 400 × 3 × 2 × 0,30 = 720 TL gibi. Abonelikte aylık gelir brüt marjla çarpılıp aylık müşteri kaybı oranına bölünür."],
    ["İdeal LTV/CAC oranı kaç olmalı?", "Yaygın kabul gören kural, LTV'nin CAC'nin en az 3 katı olmasıdır. 1:1'in altı her yeni müşteride zarar, 3:1 ile 5:1 arası sağlıklı büyüme, 5:1'in üstü ise pazarlamaya yeterince yatırım yapılmadığının işareti olabilir."],
    ["Dönüşüm oranı CAC'yi nasıl etkiler?", "Reklamla gelen müşterilerde CAC yaklaşık olarak tıklama başı maliyetin dönüşüm oranına bölümüdür. Dönüşüm oranı yüzde 2'den yüzde 2,5'e çıktığında reklam bütçesi değişmeden müşteri başı maliyet yüzde 20 azalır."],
    ["E-ticarette CAC nasıl düşürülür?", "Dönüşüm oranını artırmak, kanal bazında maliyetleri ölçüp pahalı kanalları kısmak, organik arama ve e-posta gibi düşük maliyetli kanallara yatırım yapmak ve tavsiye programları kurmak CAC'yi düşürmenin başlıca yollarıdır."],
    ["Abonelik işinde LTV neden önemlidir?", "Abonelikte kâr, müşterinin uzun süre kalmasıyla oluşur; ilk aylar çoğu zaman edinme maliyetini karşılamaz. Aylık müşteri kaybı oranındaki küçük bir değişim ortalama ömrü ve LTV'yi büyük ölçüde etkiler."],
    ["CAC geri dönüş süresi nasıl hesaplanır?", "CAC, müşteri başına aylık brüt kâra bölünür. 250 TL CAC ve müşteri başına aylık 30 TL brüt kârda geri dönüş süresi yaklaşık 8,3 aydır; 12 ayın altı çoğu işletme için rahat kabul edilir."]
  ],
  tools: ["musteri-edinme-maliyeti-hesapla", "musteri-yasam-boyu-degeri-hesapla", "donusum-orani-hesapla"],
  related: ["roas-ve-roi-nedir-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir", "net-bugunku-deger-ve-ic-verim-orani"]
};
