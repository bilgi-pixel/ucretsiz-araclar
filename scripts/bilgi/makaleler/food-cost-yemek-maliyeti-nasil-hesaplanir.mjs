export default {
  slug: "food-cost-yemek-maliyeti-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Yemek Maliyeti (Food Cost) Nasıl Hesaplanır? Menü Fiyatı Belirleme Yöntemi",
  pageTitle: "Food Cost Nasıl Hesaplanır? Porsiyon Maliyeti ve Menü Fiyatı",
  description: "Food cost oranı = porsiyon malzeme maliyeti ÷ KDV hariç satış fiyatı. Reçete kartı, fire, %28–35 hedef oran, maliyetten menü fiyatına geçiş ve KDV ekleme örneği.",
  keywords: ["food cost nedir", "yemek maliyeti hesaplama", "menü fiyatı belirleme", "porsiyon maliyeti", "restoran maliyet oranı", "reçete maliyeti", "yüzde 30 food cost", "fire oranı mutfak"],
  lead: "Food cost (yemek maliyeti oranı), bir porsiyonun <strong>malzeme maliyetinin KDV hariç satış fiyatına oranıdır</strong>: 80,63 TL'ye mal olan bir tabak KDV hariç 268,76 TL'ye satılırsa food cost %30'dur. Porsiyon maliyeti, reçetedeki her malzemenin fire dahil brüt miktarı ile birim fiyatının çarpılıp toplanmasıyla bulunur. Menü fiyatı ise bu maliyetin hedef food cost oranına bölünüp KDV eklenmesiyle belirlenir. Bu sayfada reçete kartı hazırlamayı, fireyi hesaba katmayı, sektörde yaygın hedef oranları, KDV'nin menü fiyatına eklenmesini, tarif ölçeklemeyi ve QR menüde fiyat güncellemeyi çözümlü bir örnekle bulacaksınız.",
  kisaCevap: [
    "Food cost oranı = porsiyon malzeme maliyeti ÷ KDV hariç satış fiyatı × 100.",
    "Porsiyon maliyeti = Σ (brüt miktar × birim fiyat); brüt miktar = net miktar ÷ (1 − fire oranı).",
    "Menü fiyatı (KDV hariç) = porsiyon maliyeti ÷ hedef food cost oranı; %30 hedefte maliyet 3,33 ile çarpılır.",
    "Restoran ve kafelerde yeme-içme hizmetleri %10 KDV'ye tabidir; KDV dahil fiyat = KDV hariç fiyat × 1,10.",
    "Hedef oran işletme türüne göre değişir; birçok işletme %28–35 aralığını başlangıç olarak kullanır.",
    "Food cost yalnızca malzemeyi kapsar; personel, kira, enerji ve ambalaj ayrıca hesaba katılmalıdır."
  ],
  figure: {
    alt: "Tavuk sote porsiyonu için reçete maliyet kartı: tavuk göğsü 57,78 TL, sebze 7,20 TL, sıvı yağ 2,25 TL, pirinç 5,40 TL, tereyağı 3,00 TL, baharat 1,00 TL, ekmek ve salata 4,00 TL, toplam 80,63 TL. Yüzde 30 hedefle KDV hariç 268,76 TL, yüzde 10 KDV ile 295,64 TL, menüde 300 TL.",
    caption: "Reçete kartında her malzeme brüt miktarıyla yazılır. Tavuk göğsünde %10 temizleme firesi olduğu için 200 g net et için 222 g alınır. Fiyatlar örnektir; kendi alış fiyatlarınızla güncelleyin.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Reçete kartı: tavuk sote (1 porsiyon)</text>
  <rect x="20" y="46" width="420" height="300" rx="8" class="sf sb"/>
  <g class="sm">
    <text x="36" y="70" class="b">Malzeme</text><text x="250" y="70" class="b end">Brüt</text><text x="420" y="70" class="b end">Maliyet</text>
    <line x1="30" y1="80" x2="430" y2="80" class="sb" fill="none"/>
    <text x="36" y="104">Tavuk göğsü (%10 fire)</text><text x="250" y="104" class="end">222 g</text><text x="420" y="104" class="end b">57,78 TL</text>
    <text x="36" y="134">Biber, domates, soğan</text><text x="250" y="134" class="end">120 g</text><text x="420" y="134" class="end">7,20 TL</text>
    <text x="36" y="164">Sıvı yağ</text><text x="250" y="164" class="end">15 ml</text><text x="420" y="164" class="end">2,25 TL</text>
    <text x="36" y="194">Pirinç (pilav)</text><text x="250" y="194" class="end">60 g</text><text x="420" y="194" class="end">5,40 TL</text>
    <text x="36" y="224">Tereyağı</text><text x="250" y="224" class="end">5 g</text><text x="420" y="224" class="end">3,00 TL</text>
    <text x="36" y="254">Baharat, tuz</text><text x="250" y="254" class="end">—</text><text x="420" y="254" class="end">1,00 TL</text>
    <text x="36" y="284">Ekmek ve yan salata</text><text x="250" y="284" class="end">—</text><text x="420" y="284" class="end">4,00 TL</text>
    <line x1="30" y1="298" x2="430" y2="298" class="sb" fill="none"/>
  </g>
  <text x="36" y="328" class="b">Porsiyon maliyeti</text><text x="420" y="328" class="b end lg p">80,63 TL</text>
  <rect x="460" y="46" width="240" height="80" rx="8" class="ps"/>
  <text x="580" y="72" class="sm mid">÷ hedef food cost %30</text>
  <text x="580" y="104" class="lg b mid">268,76 TL</text><text x="580" y="120" class="sm mid">KDV hariç</text>
  <rect x="460" y="136" width="240" height="80" rx="8" class="ps"/>
  <text x="580" y="162" class="sm mid">× 1,10 (KDV %10)</text>
  <text x="580" y="194" class="lg b mid">295,64 TL</text><text x="580" y="210" class="sm mid">KDV dahil</text>
  <rect x="460" y="226" width="240" height="120" rx="8" class="p"/>
  <text x="580" y="254" class="sm mid sf">Menüde yuvarlanmış fiyat</text>
  <text x="580" y="296" class="xl mid sf">300 TL</text>
  <text x="580" y="326" class="sm mid sf">gerçek food cost ≈ %29,6</text>
  <rect x="20" y="362" width="680" height="64" rx="8" class="dgs"/>
  <text x="36" y="386" class="b dg">Food cost yalnızca malzemedir</text>
  <text x="36" y="410" class="sm">Personel, kira, enerji, ambalaj ve komisyon ayrıca karşılanmalıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Food cost (yemek maliyeti oranı) nedir?",
      p: [
        "<strong>Food cost</strong>, restoran ve kafe işletmeciliğinde bir yemeğin hazırlanmasında kullanılan malzemelerin maliyetini ifade eder. Türkçede \"yemek maliyeti\", \"gıda maliyeti\" ya da \"porsiyon maliyeti\" olarak da anılır. Bu maliyetin satış fiyatına oranına ise <strong>food cost oranı</strong> denir ve menü fiyatlandırmasının temel göstergesidir.",
        "Oran, bir tabağın satış fiyatının ne kadarının yalnızca malzemeye gittiğini gösterir. %30 food cost, her 100 TL'lik satışın 30 TL'sinin malzemeye harcandığı, kalan 70 TL'nin personel, kira, enerji, ambalaj, diğer giderler ve kâr için kaldığı anlamına gelir. Oran yükseldikçe bu pay daralır.",
        "Food cost iki şekilde izlenir. <strong>Teorik food cost</strong>, reçete kartlarındaki miktarlardan hesaplanan, olması gereken maliyettir. <strong>Gerçek food cost</strong> ise dönem başı stok + alımlar − dönem sonu stok formülüyle bulunan, fiilen tüketilen malzemedir. İkisi arasındaki fark, fire, porsiyon kaçağı, bozulma ya da kayıt hatalarını gösterir."
      ]
    },
    {
      h: "Bir porsiyonun maliyeti nasıl hesaplanır?",
      p: [
        "Porsiyon maliyetinin doğru hesaplanması için her yemeğin bir <strong>reçete kartı</strong> olmalıdır. Kartta malzemenin adı, bir porsiyon için gereken net miktarı, fire oranı, alış birimi ve birim fiyatı yazar."
      ],
      formula: "Brüt miktar = net miktar ÷ (1 − fire oranı)\nMalzeme maliyeti = brüt miktar × birim fiyat\nPorsiyon maliyeti = tüm malzeme maliyetlerinin toplamı",
      table: {
        head: ["Malzeme", "Net", "Fire", "Brüt", "Birim fiyat (örnek)", "Maliyet"],
        rows: [
          ["Tavuk göğsü", "200 g", "%10", "222 g", "260 TL/kg", "57,78 TL"],
          ["Biber, domates, soğan", "120 g", "—", "120 g", "60 TL/kg", "7,20 TL"],
          ["Sıvı yağ", "15 ml", "—", "15 ml", "150 TL/L", "2,25 TL"],
          ["Pirinç", "60 g", "—", "60 g", "90 TL/kg", "5,40 TL"],
          ["Tereyağı", "5 g", "—", "5 g", "600 TL/kg", "3,00 TL"],
          ["Baharat, tuz", "—", "—", "—", "sabit pay", "1,00 TL"],
          ["Ekmek ve yan salata", "—", "—", "—", "sabit pay", "4,00 TL"],
          ["Toplam", "", "", "", "", "80,63 TL"]
        ],
        caption: "Birim fiyatlar örnektir. Fire olarak yalnızca temizleme kaybı alınmıştır; pişirme kaybı da varsa net miktarı pişmiş ağırlığa göre ayarlayın."
      },
      after: [
        "Birim fiyatları KDV hariç alış fiyatından almak, satış tarafında da KDV hariç fiyatla karşılaştırma yapmak gerekir; aksi hâlde oran tutarsız çıkar. Hammadde, işçilik ve genel giderleri birlikte dağıtmak isterseniz [[arac:birim-maliyet-hesapla|Birim Maliyet Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Fire ve kayıp reçete maliyetine nasıl yansır?",
      p: [
        "Mutfakta satın alınan her kilogramın tamamı tabağa girmez. Etin yağı ve sinirleri ayıklanır, sebzenin kabuğu ve sapı atılır, et pişerken su kaybederek küçülür. Bu kayıplar maliyet hesabına girmezse reçete gerçekte olduğundan ucuz görünür ve food cost sessizce yükselir.",
        "Fireyi hesaba katmanın yolu, \"net miktar\" yerine \"brüt miktar\" ile hesap yapmaktır. Örnekte tabakta 200 g temizlenmiş tavuk istiyorsanız ve temizlemede %10 kayıp varsa, 200 ÷ 0,90 ≈ 222 g tavuk almanız gerekir. Fire oranlarını kendi mutfağınızda birkaç kez tartarak ölçün; hazır tablolardaki ortalamalar ürün kalitesine ve kesim biçimine göre değişir."
      ],
      table: {
        head: ["Ürün", "Kayıp türü", "Fire örneği", "Net 1 kg için brüt"],
        rows: [
          ["Tavuk göğsü", "Temizleme", "%10", "1,11 kg"],
          ["Kemikli et", "Kemik ve yağ ayıklama", "%25", "1,33 kg"],
          ["Soğan", "Kabuk ve uç", "%10", "1,11 kg"],
          ["Kırmızı et (pişirme)", "Su kaybı", "%30", "1,43 kg"]
        ],
        caption: "Oranlar örnektir; kendi ürünleriniz ve pişirme yönteminizle ölçün."
      },
      after: [
        "Fire oranının mantığı ve farklı sektörlerdeki kullanımı [[bilgi:fire-orani-nedir-nasil-hesaplanir|fire oranı rehberinde]] ayrıntılı anlatılmıştır."
      ]
    },
    {
      h: "Restoranlarda food cost yüzde kaç olmalı?",
      p: [
        "Tüm işletmeler için geçerli tek bir doğru oran yoktur. Hedef oran; işletme türüne, konumuna, kira ve personel giderlerine, servis biçimine ve ürün karmasına göre değişir. Pek çok işletme %28–35 aralığını başlangıç noktası olarak kullanır, ancak bu bir kural değil yol göstericidir."
      ],
      table: {
        head: ["İşletme / ürün türü", "Sık görülen hedef aralık", "Neden?"],
        rows: [
          ["Kahve ve sıcak içecekler", "Düşük", "Malzeme maliyeti fiyatın küçük bir kısmı"],
          ["Pastane, tatlı", "Orta", "Emek yoğun, malzeme görece ucuz"],
          ["Genel restoran", "%28–35 civarı", "Dengeli malzeme ve hizmet maliyeti"],
          ["Et ve deniz ürünü ağırlıklı", "Daha yüksek", "Ana malzeme pahalı"],
          ["Hızlı servis", "Orta", "Düşük personel maliyeti, yüksek adet"]
        ],
        caption: "Aralıklar genel eğilimdir; kendi gider yapınıza göre belirlenmelidir."
      },
      after: [
        "Asıl önemli olan, tüm menünün ağırlıklı ortalama food cost'udur. Bazı ürünler (örneğin et yemekleri) yüksek oranla, bazıları (çorba, makarna, içecekler) düşük oranla satılabilir; satış adetleriyle ağırlıklandırılmış ortalama hedefinizi tutturuyorsa menü dengelidir. Ürün bazında kâr katkısını görmek için [[bilgi:katki-payi-nedir-nasil-hesaplanir|katkı payı rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Maliyetten menü fiyatına nasıl geçilir? KDV nasıl eklenir?",
      formula: "KDV hariç satış fiyatı = porsiyon maliyeti ÷ hedef food cost oranı\nKDV dahil menü fiyatı = KDV hariç fiyat × (1 + KDV oranı)\nKontrol: gerçek food cost = maliyet ÷ (menü fiyatı ÷ 1,10)",
      ol: [
        "Porsiyon maliyeti: 80,63 TL.",
        "Hedef food cost %30: 80,63 ÷ 0,30 ≈ 268,76 TL (KDV hariç).",
        "Restoran yeme-içme hizmeti %10 KDV: 268,76 × 1,10 ≈ 295,64 TL (KDV dahil).",
        "Menüde akılda kalır bir fiyata yuvarlayın: 300 TL.",
        "Kontrol: 300 ÷ 1,10 ≈ 272,73 TL KDV hariç; 80,63 ÷ 272,73 ≈ %29,6 food cost. Hedefin altında kaldığı için fiyat uygundur."
      ],
      after: [
        "%30 food cost hedefi, maliyetin yaklaşık 3,33 katına satmak, yani maliyet üzerine %233 kâr eklemek demektir. Bu dönüşümü [[arac:kar-ekleme-orani-hesapla|Kâr Ekleme Oranı Hesaplama aracıyla]] yapabilirsiniz. KDV dahil ve hariç tutarlar arasındaki geçiş için [[arac:kdv-hesapla|KDV Hesaplama aracını]] kullanın. Menü fiyatlarında KDV dahil tutarı göstermeniz gerektiğini unutmayın; tüketici, menüde gördüğü fiyatı öder."
      ]
    },
    {
      h: "Tarif ölçeklenirken maliyet nasıl değişir?",
      p: [
        "Bir porsiyonluk reçeteyi 40 porsiyonluk bir tencereye çevirdiğinizde ana malzemelerin maliyeti doğrusal olarak artar: 80,63 × 40 ≈ 3.225 TL. Ancak her şey doğrusal değildir. Baharat, tuz ve yağ çoğu zaman tam orantılı artırılmaz; büyük hacimde pişirmede buharlaşma ve tencere dibinde kalan miktar farklıdır.",
        "Toplu üretimde dikkat edilmesi gereken bir diğer konu porsiyon kontrolüdür. 40 porsiyon için hazırlanan yemekten 37 porsiyon çıkıyorsa, gerçek porsiyon maliyeti 3.225 ÷ 37 ≈ 87,2 TL'ye yükselir ve food cost hedefi kaçar. Kepçe, kalıp ve terazi kullanmak bu kaçağı önler. Tarifleri kişi sayısına göre çevirmek için [[arac:tarif-olcekle|Tarif Ölçekleme aracı]], yöntemin ayrıntıları için [[bilgi:tarif-nasil-olceklendirilir|tarif ölçekleme rehberi]] yardımcı olur."
      ]
    },
    {
      h: "QR menüde fiyat güncellemesi nasıl yapılır?",
      p: [
        "Malzeme fiyatlarının sık değiştiği dönemlerde basılı menüleri her ay yenilemek pahalıdır. QR menü, fiyat değişikliğini masadaki kartları değiştirmeden yansıtmayı kolaylaştırır. Ancak fiyatları güncellemeden önce maliyeti yeniden hesaplamak gerekir."
      ],
      ol: [
        "Ana malzemelerin son alış fiyatlarını reçete kartlarına girin; en az ayda bir, fiyatlar hızlı değişiyorsa daha sık.",
        "Her yemeğin yeni porsiyon maliyetini ve mevcut fiyatla food cost oranını hesaplayın.",
        "Hedefi aşan ürünlerde fiyatı, porsiyonu ya da reçeteyi (ör. garnitür değişikliği) gözden geçirin.",
        "Yeni KDV dahil fiyatları yuvarlayıp menü listesini güncelleyin.",
        "Güncel listeyle [[arac:qr-menu-olustur|QR Menü Oluşturma aracından]] A4 fiyat listesi ve QR kodlu masa kartı hazırlayın; işletme içinde görünür bir fiyat listesi bulundurun."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Fireyi hesaba katmamak:</strong> Net miktarla hesap yapmak maliyeti olduğundan düşük gösterir.",
        "<strong>KDV dahil ve hariç fiyatları karıştırmak:</strong> Alış ve satışta aynı esası kullanın.",
        "<strong>Garnitür, ekmek ve sosları unutmak:</strong> Küçük kalemler toplamda belirgin bir pay oluşturur.",
        "<strong>Fiyatları bir kez hesaplayıp bırakmak:</strong> Alış fiyatları değiştikçe reçete kartları güncellenmelidir.",
        "<strong>Food cost'u tek ölçüt sanmak:</strong> Düşük oranlı ama az satan bir ürün, yüksek oranlı ama çok satan bir üründen daha az kâr bırakabilir.",
        "<strong>Porsiyon kontrolünü ihmal etmek:</strong> Göz kararı servis, en iyi hesaplanmış reçeteyi bile boşa çıkarır."
      ]
    }
  ],
  faq: [
    ["Food cost (yemek maliyeti oranı) nedir?", "Food cost, bir porsiyonun malzeme maliyetinin KDV hariç satış fiyatına oranıdır. Örneğin 80 TL'ye mal olan bir yemek KDV hariç 267 TL'ye satılıyorsa food cost yaklaşık yüzde 30'dur; kalan pay personel, kira, diğer giderler ve kâr içindir."],
    ["Bir porsiyonun maliyeti nasıl hesaplanır?", "Reçetedeki her malzemenin fire dahil brüt miktarı birim alış fiyatıyla çarpılır ve sonuçlar toplanır. Brüt miktar, net miktarın bir eksi fire oranına bölünmesiyle bulunur; garnitür, ekmek ve sos gibi küçük kalemler de eklenmelidir."],
    ["Restoranlarda food cost yüzde kaç olmalı?", "Tek bir doğru oran yoktur; işletme türüne, kira ve personel giderlerine göre değişir. Pek çok işletme yüzde 28–35 aralığını başlangıç noktası olarak kullanır ve asıl önemli olan tüm menünün satış adetleriyle ağırlıklandırılmış ortalamasıdır."],
    ["Maliyetten menü fiyatına nasıl geçilir?", "Porsiyon maliyeti hedef food cost oranına bölünerek KDV hariç satış fiyatı bulunur. 80,63 TL maliyet ve yüzde 30 hedef için KDV hariç fiyat 268,76 TL olur; ardından KDV eklenir ve fiyat menüde akılda kalır bir tutara yuvarlanır."],
    ["KDV menü fiyatına nasıl eklenir?", "Restoran ve kafelerde yeme-içme hizmetleri yüzde 10 KDV'ye tabidir; KDV hariç fiyat 1,10 ile çarpılarak KDV dahil menü fiyatı bulunur. 268,76 TL KDV hariç fiyat, KDV dahil yaklaşık 295,64 TL eder."],
    ["Fire ve kayıp reçete maliyetine nasıl yansır?", "Fire, satın alınan miktarın bir kısmının ayıklama ya da pişirme sırasında kaybolmasıdır. Tabakta 200 gram temiz tavuk için yüzde 10 fireyle 222 gram alınması gerekir; fire hesaba katılmazsa porsiyon maliyeti olduğundan düşük görünür."],
    ["Tarif ölçeklenirken maliyet nasıl değişir?", "Ana malzemelerin maliyeti porsiyon sayısıyla doğrusal artar, ancak baharat, yağ ve pişirme kayıpları tam orantılı değişmeyebilir. Toplu üretimde planlanandan az porsiyon çıkarsa gerçek porsiyon maliyeti yükselir; bu yüzden porsiyon kontrolü önemlidir."],
    ["QR menüde fiyat güncellemesi nasıl yapılır?", "Önce reçete kartlarındaki alış fiyatlarını güncelleyip her ürünün yeni food cost oranını hesaplayın. Hedefi aşan ürünlerin fiyatını ya da reçetesini düzenleyin, ardından yeni KDV dahil fiyatlarla menü listesini ve QR kodlu kartları güncelleyin."],
    ["Teorik ve gerçek food cost farkı nedir?", "Teorik food cost reçete kartlarındaki miktarlardan hesaplanan olması gereken maliyettir. Gerçek food cost ise dönem başı stok, alımlar ve dönem sonu stoktan bulunan fiili tüketimdir; aradaki fark fire, porsiyon kaçağı ya da bozulmayı gösterir."]
  ],
  tools: ["birim-maliyet-hesapla", "kar-ekleme-orani-hesapla", "tarif-olcekle", "kdv-hesapla", "qr-menu-olustur"],
  related: ["fire-orani-nedir-nasil-hesaplanir", "katki-payi-nedir-nasil-hesaplanir", "tarif-nasil-olceklendirilir", "kar-marji-nasil-hesaplanir"]
};
