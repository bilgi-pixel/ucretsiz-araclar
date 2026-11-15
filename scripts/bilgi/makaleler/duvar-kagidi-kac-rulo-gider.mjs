export default {
  slug: "duvar-kagidi-kac-rulo-gider",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Duvar Kağıdı Kaç Rulo Gider? Oda Ölçüsüne Göre Rulo Hesaplama",
  pageTitle: "Duvar Kağıdı Kaç Rulo Gider? Şerit Yöntemiyle Rulo Hesabı",
  description: "Duvar kağıdı rulosu metrekareyle değil şeritle hesaplanır: duvar genişliği ÷ rulo eni = şerit, rulo boyu ÷ şerit boyu = rulodan çıkan şerit. Desen payı ve örnek oda.",
  keywords: ["duvar kağıdı kaç rulo", "duvar kağıdı hesaplama", "bir rulo duvar kağıdı kaç m2", "desen eşleme payı", "duvar kağıdı nasıl yapıştırılır", "duvar kağıdı tutkalı", "duvar kağıdı mı boya mı", "tek duvar duvar kağıdı"],
  lead: "Bir oda için gereken duvar kağıdı, alanı rulo metrekaresine bölerek değil, <strong>kaç şerit gerektiği ve bir rulodan kaç şerit çıktığı</strong> hesaplanarak bulunur. Standart 53 cm × 10,05 m rulo kâğıt üzerinde 5,3 m² kaplar, ama tavan yüksekliği ve desen tekrarı yüzünden pratikte bunun bir kısmı artık olarak kalır. 4 × 3,5 m ölçülü, 2,80 m tavanlı bir oda düz kâğıtla 8, 53 cm desen tekrarlı kâğıtla 12 rulo ister. Bu sayfada şerit yöntemini, desen payını, kapı-pencere düşümünü ve uygulama ipuçlarını bulacaksınız.",
  kisaCevap: [
    "Standart rulo 53 cm eninde ve 10,05 m boyundadır; kâğıt üzerinde yaklaşık 5,3 m² kaplar.",
    "Şerit sayısı = kaplanacak duvar genişliği ÷ rulo eni (yukarı yuvarlanır).",
    "Şerit boyu = duvar yüksekliği + 10 cm kesim payı + desenli kâğıtta bir desen tekrarı.",
    "Bir rulodan çıkan şerit = rulo boyu ÷ şerit boyu (aşağı yuvarlanır); rulo sayısı = şerit sayısı ÷ rulodan çıkan şerit (yukarı yuvarlanır).",
    "Alanı 5,3'e bölen hesap, artık parçaları görmediği için genellikle 1–5 rulo eksik çıkarır.",
    "Tüm ruloların aynı parti (lot) numarasından alınması ve en az bir rulo yedek bırakılması renk farkını önler."
  ],
  figure: {
    alt: "10,05 metrelik bir rulonun kesim şeması: düz kâğıtta 2,90 m'lik 3 şerit çıkar ve 1,35 m artar; 53 cm desen tekrarlı kâğıtta 3,43 m'lik yalnızca 2 şerit çıkar ve 3,19 m artar.",
    caption: "Aynı rulo, aynı 2,80 m tavan: desen tekrarı şerit boyunu uzattığı için rulodan çıkan şerit sayısı 3'ten 2'ye düşer. Bu fark örnek odada ihtiyacı 8 rulodan 12 ruloya çıkarır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir rulodan kaç şerit çıkar? (rulo 10,05 m)</text>
  <text x="20" y="72" class="b">Düz kâğıt · şerit 2,80 + 0,10 = 2,90 m</text>
  <rect x="20" y="86" width="194" height="50" rx="4" class="oks"/>
  <rect x="216" y="86" width="194" height="50" rx="4" class="oks"/>
  <rect x="412" y="86" width="194" height="50" rx="4" class="oks"/>
  <rect x="608" y="86" width="92" height="50" rx="4" class="sf sb dash"/>
  <text x="117" y="117" class="b mid">1. şerit</text><text x="313" y="117" class="b mid">2. şerit</text><text x="509" y="117" class="b mid">3. şerit</text>
  <text x="654" y="110" class="sm mid mu">artık</text><text x="654" y="126" class="sm mid mu">1,35 m</text>
  <text x="20" y="160" class="sm t2">10,05 ÷ 2,90 = 3,47 → 3 şerit</text>
  <text x="20" y="206" class="b">Desenli kâğıt · şerit 2,90 + 0,53 = 3,43 m</text>
  <rect x="20" y="220" width="230" height="50" rx="4" class="ps"/>
  <rect x="252" y="220" width="230" height="50" rx="4" class="ps"/>
  <rect x="484" y="220" width="216" height="50" rx="4" class="sf sb dash"/>
  <text x="135" y="251" class="b mid">1. şerit</text><text x="367" y="251" class="b mid">2. şerit</text>
  <text x="592" y="244" class="sm mid mu">artık 3,19 m</text><text x="592" y="260" class="sm mid mu">(tam şerit çıkmaz)</text>
  <text x="20" y="294" class="sm t2">10,05 ÷ 3,43 = 2,93 → 2 şerit</text>
  <rect x="20" y="314" width="680" height="72" rx="8" class="sf sb"/>
  <rect x="20" y="314" width="8" height="72" class="p"/>
  <text x="42" y="338" class="b">Örnek oda: net duvar 12,6 m → 12,6 ÷ 0,53 = 24 şerit</text>
  <text x="42" y="362" class="sm">Düz: 24 ÷ 3 = 8 rulo   ·   Desenli: 24 ÷ 2 = 12 rulo</text>
  <text x="42" y="378" class="sm mu">Alan yöntemi (35,3 m² ÷ 5,3) yanıltıcı biçimde 7 rulo der.</text>
</svg>`
  },
  sections: [
    {
      h: "Bir rulo duvar kağıdı kaç m² kaplar?",
      p: [
        "Türkiye'de satılan duvar kağıtlarının büyük çoğunluğu Avrupa standardı olan <strong>53 cm × 10,05 m</strong> ölçüsündedir. Bu rulonun kâğıt alanı 0,53 × 10,05 = 5,33 m²'dir. Son yıllarda yaygınlaşan geniş rulolar ise genellikle 106 cm × 10,05 m ölçüsündedir ve yaklaşık 10,65 m² kâğıt içerir. Rulo ölçüsünü her zaman ambalajdaki etiketten kontrol edin; bazı ithal ürünlerde en ve boy farklı olabilir.",
        "Ancak 5,33 m² rakamı, duvarda kaplayacağınız alan değildir. Duvar kağıdı tek parça hâlinde, tavandan süpürgeliğe uzanan dikey şeritler hâlinde uygulanır. Rulodan şeritler kesildikçe her rulonun sonunda bir şerit boyuna yetmeyen artık bir parça kalır. Desenli kâğıtlarda yan yana gelen şeritlerin desenini hizalamak için ayrıca pay kesilir. Bu yüzden hesabın birimi metrekare değil, <strong>şerit</strong> olmalıdır."
      ]
    },
    {
      h: "Şerit yöntemiyle rulo hesabı: formül",
      formula: "Net duvar genişliği = oda çevresi − düşülecek kapı/pencere genişlikleri\nŞerit sayısı = net genişlik ÷ rulo eni → yukarı yuvarla\nŞerit boyu = duvar yüksekliği + 0,10 m + desen tekrarı\nRulodan çıkan şerit = rulo boyu ÷ şerit boyu → aşağı yuvarla\nRulo sayısı = şerit sayısı ÷ rulodan çıkan şerit → yukarı yuvarla",
      p: [
        "Oda çevresi, kaplanacak duvarların genişliklerinin toplamıdır; dikdörtgen bir odada 2 × (en + boy) olarak bulunur. 10 cm'lik pay, tavanda ve süpürgelikte kesilecek fazlalık içindir: şeridi duvara biraz uzun yapıştırıp maket bıçağıyla düzeltirsiniz.",
        "Yuvarlama yönleri önemlidir. Yarım şerit duvarda boşluk bırakacağı için şerit sayısı her zaman yukarı yuvarlanır. Rulodan 3,47 şerit çıkıyorsa üç tam şerit kesilebilir, kalan parça tam şerit olamaz; bu yüzden aşağı yuvarlanır. Rulo sayısı da tamamlanmak zorunda olduğundan yine yukarı yuvarlanır."
      ]
    },
    {
      h: "Çözümlü örnek: 4 × 3,5 m oda",
      p: [
        "Tavan yüksekliği 2,80 m olan, 4 m × 3,5 m ölçülü bir yatak odasını düşünelim. Odada 90 cm genişliğinde bir kapı ve 150 cm genişliğinde bir pencere var."
      ],
      ol: [
        "Oda çevresi: 2 × (4 + 3,5) = 15 m.",
        "Düşülecek genişlik: 0,90 + 1,50 = 2,40 m → net genişlik 12,6 m.",
        "Şerit sayısı: 12,6 ÷ 0,53 = 23,8 → 24 şerit.",
        "Düz kâğıtta şerit boyu: 2,80 + 0,10 = 2,90 m → 10,05 ÷ 2,90 = 3,47 → rulodan 3 şerit çıkar.",
        "Düz kâğıt için rulo: 24 ÷ 3 = <strong>8 rulo</strong>.",
        "53 cm desen tekrarlı kâğıtta şerit boyu: 2,90 + 0,53 = 3,43 m → 10,05 ÷ 3,43 = 2,93 → rulodan 2 şerit çıkar.",
        "Desenli kâğıt için rulo: 24 ÷ 2 = <strong>12 rulo</strong>."
      ],
      after: [
        "Aynı oda için alan yöntemiyle hesap yapsaydık 12,6 × 2,80 = 35,28 m² duvar alanını 5,33'e bölüp 6,6, yani 7 rulo bulurduk. Bu, düz kâğıtta bir, desenli kâğıtta beş rulo eksik demektir. Düz kâğıtta bile hesap tam 24 şerite denk geldiği için yedek kalmıyor; bu durumda bir rulo fazla almak akıllıca olur.",
        "Kendi odanızın değerlerini [[arac:duvar-kagidi-hesapla|Duvar Kağıdı Hesaplama aracı]]na girerseniz şerit sayısını, rulodan çıkan şerit sayısını ve kaç şeridin yedek kalacağını tek ekranda görürsünüz."
      ]
    },
    {
      h: "Desen eşleme payı nasıl hesaplanır?",
      p: [
        "Desen tekrarı (İngilizce kaynaklarda \"repeat\"), desenin dikey yönde kendini kaç santimetrede bir tekrarladığıdır ve ambalajda santimetre olarak yazar. Düz ya da rastgele dokulu kâğıtlarda tekrar yoktur ya da önemsizdir; 0 alınır. Çiçek, geometrik ya da çizgili desenlerde genellikle 26, 53 ya da 64 cm gibi değerler görülür.",
        "Ambalajda desen eşleme türü de simgeyle belirtilir. <strong>Düz eşlemede</strong> desen yan şeritte aynı yükseklikte devam eder. <strong>Kaydırmalı (yarım düşmeli) eşlemede</strong> her ikinci şerit desen tekrarının yarısı kadar aşağı kaydırılarak yapıştırılır; bu tür kâğıtlarda fire daha fazladır. Her iki durumda da güvenli hesap, şerit boyuna bir tam desen tekrarı eklemektir."
      ],
      table: {
        head: ["Desen tekrarı", "Şerit boyu (2,80 m tavan)", "Rulodan çıkan şerit", "24 şerit için rulo"],
        rows: [
          ["Yok (düz)", "2,90 m", "3", "8"],
          ["26 cm", "3,16 m", "3", "8"],
          ["53 cm", "3,43 m", "2", "12"],
          ["64 cm", "3,54 m", "2", "12"]
        ],
        caption: "Rulo 53 cm × 10,05 m kabul edilmiştir. Desen tekrarı, şerit boyunu rulo boyunun üçte birinin üzerine çıkardığı anda ihtiyaç sıçrar."
      },
      after: [
        "Tablo önemli bir ayrıntıyı gösterir: rulo sayısı desen tekrarıyla doğrusal artmaz, eşik aşılınca sıçrar. Yüksek tavanlı evlerde (3 m ve üstü) düz kâğıtta bile rulodan 3 şerit çıkmayabilir; bu durumda geniş rulo ya da daha kısa desen tekrarlı bir model ekonomik olabilir."
      ]
    },
    {
      h: "Kapı ve pencere alanı düşülür mü?",
      p: [
        "Kapı boşluğu tavana kadar uzanan bir açıklık değildir ama üstünde kalan 50–60 cm'lik bant genellikle artık parçalardan kaplanabilir. Bu yüzden kapı genişliğini tam düşmek çoğu odada güvenlidir. Pencerelerde ise hem altta hem üstte kâğıt kaplanacak bant kalır; bu kısa parçalar da büyük ölçüde rulo artıklarından çıkar.",
        "Pratik kural şudur: Kapı ve pencere genişliklerini düşerek hesap yapın, ardından aracın gösterdiği \"yedek kalan şerit\" sayısına bakın. Yedek şerit kalmıyorsa ya da odada çok sayıda pencere varsa bir rulo ekleyin. Gömme dolap, şömine ya da tavana kadar uzanan geniş açıklıklar varsa genişliklerini doğrudan düşebilirsiniz. Duvarın net metrekaresini ayrıca görmek isterseniz [[arac:duvar-alani-hesapla|Duvar Alanı Hesaplama]] aracı boşlukları düşerek hesaplar."
      ]
    },
    {
      h: "Tek duvar, banyo ve mutfak gibi özel durumlar",
      p: [
        "<strong>Tek duvara uygulama</strong> son yıllarda en yaygın kullanım biçimidir: odanın bir duvarı desenli kâğıtla vurgulanır, diğerleri boyanır. Hesap aynıdır; yalnızca çevre yerine o duvarın genişliğini kullanırsınız. Örneğin 3,5 m genişliğinde ve 2,80 m yüksekliğinde bir duvar için 3,5 ÷ 0,53 = 6,6 → 7 şerit gerekir. Düz kâğıtta 3 rulo yeter, 53 cm desen tekrarlı kâğıtta 4 rulo gerekir.",
        "<strong>Banyo ve mutfakta</strong> nem ve buhar sorun çıkarır. Bu alanlar için ambalajında silinebilir ya da yıkanabilir simgesi bulunan vinil yüzeyli kâğıtlar ve kalıp önleyici özel yapıştırıcı tercih edilmelidir. Duş alanı, küvet çevresi ve tezgâh arkası gibi doğrudan su sıçrayan yerlerde duvar kağıdı yerine seramik ya da suya dayanıklı boya kullanmak daha uzun ömürlüdür. Odanın iyi havalandırılması da kâğıdın kenarlarından kalkmasını önler."
      ]
    },
    {
      h: "Ne kadar tutkal gerekir, nasıl yapıştırılır?",
      p: [
        "Tutkal ihtiyacı kâğıdın türüne göre değişir. Toz tutkal paketlerinin üzerinde, hazırlanan karışımın kaç rulo ya da kaç metrekareye yettiği yazar; bu değer kâğıt türüne göre (ince kâğıt, vinil, tela tabanlı) farklılaşır. Rulo sayınızı bu etikete bölerek paket sayısını bulun ve emici, sıvası yeni duvarlar için yaklaşık %10–20 fazladan pay bırakın. Ağır vinil kâğıtlar için yalnızca üreticinin önerdiği güçlü tutkalı kullanın."
      ],
      ol: [
        "Duvarı temizleyin, çatlakları macunlayıp zımparalayın; parlak boyalı ya da çok emici yüzeye astar uygulayın.",
        "Pencerenin yanından ya da odanın en az göze çarpan köşesinden başlayın ve ilk şerit için çekül ya da lazerle düşey bir çizgi çizin.",
        "Kâğıt tabanlı modellerde tutkalı kâğıdın arkasına sürüp etikette yazan süre kadar bekletin; tela (non-woven) tabanlı modellerde tutkalı doğrudan duvara sürün.",
        "Şeridi tavana 5 cm taşacak şekilde yerleştirin, ortadan kenarlara doğru fırça ya da plastik spatulayla hava kabarcıklarını çıkarın.",
        "Desen eşlemesini kontrol ederek sonraki şeritleri yan yana, üst üste bindirmeden yapıştırın; taşan tutkalı nemli süngerle hemen silin.",
        "Tavan ve süpürgelik fazlalıklarını keskin bir maket bıçağıyla kesin; prizlerin kapağını önceden sökün ve elektriği kesin."
      ]
    },
    {
      h: "Duvar kağıdı mı boya mı daha ekonomik?",
      p: [
        "Malzeme maliyeti karşılaştırmasında doğru ölçüt, metrekare başına maliyettir. Duvar kağıdında bu, toplam rulo bedeli ve tutkalın duvar alanına bölünmesiyle bulunur. Örnek tutarlarla 8 rulo × 600 TL = 4.800 TL ve 300 TL tutkal, 35,3 m² duvar için yaklaşık 145 TL/m² eder. Aynı alan için iki kat boya, yaklaşık 10–12 m²/L kaplama veren bir ürünle 6–7 litre ister; toplam boya ve astar bedelini 35,3'e bölerek kendi karşılaştırmanızı yapabilirsiniz.",
        "Fiyat dışında başka etkenler de vardır. Boya kendiniz uygulanması kolay, sonradan rötuşu basit bir yüzey sunar; duvar kağıdı ise desen ve doku seçeneği, küçük duvar kusurlarını gizlemesi ve tek duvar vurgularında daha çarpıcı sonuç verir. Kiracıysanız sökülebilir tela tabanlı kâğıtlar avantaj sağlar. Boya miktarını ayrıntılı hesaplamak için [[bilgi:kac-litre-boya-kac-m2-fayans|kaç litre boya gider]] yazısına göz atın; yerden tavana tüm yüzeylerin metrekaresi için [[arac:metrekare-hesapla|Metrekare Hesaplama]] aracı kullanılabilir."
      ],
      note: "Tutarlar yalnızca hesap yöntemini göstermek için verilmiş örnek değerlerdir; güncel rulo ve boya fiyatlarını satıcınızdan alın."
    },
    {
      h: "Rulo hesabında sık yapılan hatalar",
      ul: [
        "<strong>Alanı rulo metrekaresine bölmek:</strong> Artık parçaları ve desen payını görmez; özellikle desenli kâğıtta ciddi eksik çıkarır.",
        "<strong>Farklı parti numarası almak:</strong> Aynı model, farklı üretim partilerinde ton farkı taşıyabilir. Tüm ruloları aynı parti numarasıyla ve tek seferde alın.",
        "<strong>Yedek rulo bırakmamak:</strong> Yanlış kesilen bir şerit ya da ileride yapılacak onarım için en az bir rulo saklayın.",
        "<strong>Tavan yüksekliğini tek noktadan ölçmek:</strong> Eski binalarda tavan eğimli olabilir; birkaç noktadan ölçüp en yüksek değeri kullanın.",
        "<strong>Desen tekrarını görmezden gelmek:</strong> Etikette yazan tekrar değeri şerit boyuna eklenmezse desenler hizalanmaz ya da rulo erken biter."
      ]
    }
  ],
  faq: [
    ["Bir oda için kaç rulo duvar kağıdı gerekir?", "Oda çevresinden kapı ve pencere genişliklerini düşüp rulo enine bölerek şerit sayısını bulun, sonra bunu bir rulodan çıkan şerit sayısına bölün. 4 × 3,5 m ölçülü, 2,80 m tavanlı oda düz kâğıtla 8 rulo ister."],
    ["Bir rulo duvar kağıdı kaç m² kaplar?", "Standart 53 cm × 10,05 m rulo kâğıt üzerinde 5,33 m² eder. Ancak şerit kesiminde artık kaldığı için duvarda kapladığı alan bunun altındadır; geniş 106 cm rulolar yaklaşık 10,65 m² kâğıt içerir."],
    ["Desen eşleme payı nasıl hesaplanır?", "Ambalajda santimetre olarak yazan desen tekrarı her şeridin boyuna eklenir. 2,80 m tavanda şerit boyu 2,90 m'den 53 cm tekrarla 3,43 m'ye çıkar ve bir rulodan çıkan şerit sayısı 3'ten 2'ye düşer."],
    ["Kapı ve pencere alanı düşülür mü?", "Kapı ve pencere genişlikleri düşülerek hesap yapılabilir; üst ve alt bantlar genellikle rulo artıklarından kaplanır. Hesap sonunda yedek şerit kalmıyorsa ya da odada çok pencere varsa bir rulo eklemek güvenlidir."],
    ["Duvar kağıdı tek duvara uygulanabilir mi?", "Evet, tek duvar uygulaması çok yaygındır. Hesapta oda çevresi yerine yalnızca o duvarın genişliği kullanılır; 3,5 m genişliğinde ve 2,80 m yüksekliğinde bir duvar düz kâğıtla 3 rulo ister."],
    ["Ne kadar tutkal gerekir?", "Toz tutkal paketinin üzerinde hazırlanan karışımın kaç rulo ya da metrekareye yettiği yazar ve bu değer kâğıt türüne göre değişir. Rulo sayınızı bu değere bölün, emici duvarlar için yüzde 10–20 pay ekleyin."],
    ["Duvar kağıdı mı boya mı daha ekonomik?", "Doğru karşılaştırma için her iki seçeneğin toplam malzeme bedelini duvar alanına bölüp metrekare maliyetini bulun. Boya genellikle daha ucuz ve kolay rötuşlanır; duvar kağıdı desen sunar ve küçük duvar kusurlarını gizler."],
    ["Banyoya duvar kağıdı uygulanır mı?", "Silinebilir ya da yıkanabilir vinil yüzeyli kâğıt ve kalıp önleyici tutkal kullanılarak banyonun su sıçramayan duvarlarına uygulanabilir. Duş ve küvet çevresinde seramik ya da suya dayanıklı boya daha uzun ömürlüdür."]
  ],
  tools: ["duvar-kagidi-hesapla", "duvar-alani-hesapla", "metrekare-hesapla"],
  related: ["kac-litre-boya-kac-m2-fayans", "alan-ve-hacim-formulleri"]
};
