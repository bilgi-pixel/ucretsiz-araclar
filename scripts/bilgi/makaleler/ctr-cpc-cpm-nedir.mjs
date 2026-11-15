export default {
  slug: "ctr-cpc-cpm-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "CTR, CPC ve CPM Nedir? Tıklama Oranı ve Reklam Maliyeti Hesaplama",
  pageTitle: "CTR, CPC ve CPM Nedir? Tıklama Oranı ve Reklam Maliyeti",
  description: "CTR = tıklama ÷ gösterim × 100; CPC = harcama ÷ tıklama; CPM = harcama ÷ gösterim × 1.000. Formüller, CPM'den CPC'ye geçiş, bütçe planı ve etkileşim oranı.",
  keywords: ["ctr nedir", "cpc nedir", "cpm nedir", "tıklama oranı hesaplama", "bin gösterim maliyeti", "iyi bir ctr kaç olmalı", "etkileşim oranı", "dönüşüm oranı nedir", "reklam bütçesi hesaplama"],
  lead: "<strong>CTR (tıklama oranı)</strong> reklamı görenlerin yüzde kaçının tıkladığını, <strong>CPC (tıklama başı maliyet)</strong> bir tıklamanın kaça mal olduğunu, <strong>CPM (bin gösterim maliyeti)</strong> ise reklamın 1.000 kez gösterilmesinin maliyetini ifade eder. Formülleri basittir: CTR = tıklama ÷ gösterim × 100, CPC = harcama ÷ tıklama, CPM = harcama ÷ gösterim × 1.000. Örneğin 1.000 TL harcayıp 50.000 gösterim ve 750 tıklama aldıysanız CTR %1,5, CPC 1,33 TL, CPM 20 TL'dir. Bu sayfada üç ölçünün ilişkisini, bütçe planlamayı ve dönüşüm oranını örneklerle bulacaksınız.",
  kisaCevap: [
    "CTR (tıklama oranı) = tıklama ÷ gösterim × 100; Türkçe arayüzlerde TO olarak da geçer.",
    "CPC (tıklama başı maliyet, TBM) = toplam harcama ÷ tıklama sayısı.",
    "CPM (bin gösterim maliyeti, BGBM) = toplam harcama ÷ gösterim × 1.000.",
    "Üçü birbirine bağlıdır: CPM = CPC × CTR × 1.000 (CTR ondalık yazılır); CPC = CPM ÷ (CTR × 1.000).",
    "Dönüşüm oranı = dönüşüm ÷ tıklama × 100; dönüşüm başı maliyet (CPA) = harcama ÷ dönüşüm.",
    "\"İyi\" CTR sektöre, platforma ve reklam türüne göre değişir; en doğru ölçüt kendi geçmiş verinizle karşılaştırmadır."
  ],
  figure: {
    alt: "Reklam hunisi: 50.000 gösterim, yüzde 1,5 tıklama oranıyla 750 tıklama, yüzde 2 dönüşüm oranıyla 15 satış. 1.000 TL harcamada CPM 20 TL, CPC 1,33 TL, satış başı maliyet 66,67 TL.",
    caption: "Aynı 1.000 TL'lik harcama huninin her katında farklı bir birim maliyete bölünür. Hunide bir kattaki iyileşme, altındaki bütün maliyetleri düşürür.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1.000 TL'lik reklamın hunisi</text>
  <polygon points="40,60 440,60 400,150 80,150" class="ps"/>
  <text x="240" y="100" class="lg b mid">50.000 gösterim</text>
  <text x="240" y="126" class="sm mid">reklam ekranda göründü</text>
  <polygon points="80,160 400,160 350,250 130,250" class="p"/>
  <text x="240" y="200" class="lg b mid sf">750 tıklama</text>
  <text x="240" y="226" class="sm mid sf">CTR = 750 ÷ 50.000 = %1,5</text>
  <polygon points="130,260 350,260 300,350 180,350" class="oks"/>
  <text x="240" y="300" class="lg b mid">15 satış</text>
  <text x="240" y="326" class="sm mid">dönüşüm = 15 ÷ 750 = %2</text>
  <rect x="470" y="60" width="230" height="90" rx="10" class="sf sb"/>
  <text x="486" y="88" class="b">CPM (bin gösterim)</text>
  <text x="486" y="112" class="sm">1.000 ÷ 50.000 × 1.000</text>
  <text x="486" y="138" class="b p">= 20,00 TL</text>
  <rect x="470" y="160" width="230" height="90" rx="10" class="sf sb"/>
  <text x="486" y="188" class="b">CPC (tıklama başı)</text>
  <text x="486" y="212" class="sm">1.000 ÷ 750</text>
  <text x="486" y="238" class="b p">= 1,33 TL</text>
  <rect x="470" y="260" width="230" height="90" rx="10" class="sf sb"/>
  <text x="486" y="288" class="b">CPA (satış başı)</text>
  <text x="486" y="312" class="sm">1.000 ÷ 15</text>
  <text x="486" y="338" class="b p">= 66,67 TL</text>
  <text x="360" y="384" class="sm mid t2">Kontrol: CPM = CPC × CTR × 1.000 = 1,333 × 0,015 × 1.000 = 20 TL</text>
</svg>`
  },
  sections: [
    {
      h: "CTR nedir, nasıl hesaplanır?",
      p: [
        "CTR (click-through rate, tıklama oranı), bir reklamın, arama sonucunun ya da e-postadaki bağlantının gösterildiği kişilerin yüzde kaçının tıkladığını gösterir. Reklam panellerinin Türkçe arayüzlerinde <strong>TO</strong> kısaltmasıyla da görülür. CTR, mesajınızın ve görselinizin hedef kitlenin ilgisini ne ölçüde çektiğinin en doğrudan göstergesidir."
      ],
      formula: "CTR (%) = tıklama sayısı ÷ gösterim sayısı × 100\nÖrnek: 750 ÷ 50.000 × 100 = %1,5",
      after: [
        "CTR yalnızca reklamlarda değil, arama motoru sonuçlarında (organik tıklama oranı), e-posta kampanyalarında ve site içi bağlantılarda da kullanılır. Örneğin bir sayfanız arama sonuçlarında 10.000 kez gösterilip 320 kez tıklandıysa organik CTR'ı %3,2'dir. Başlığı ve açıklamayı iyileştirmek sıralama değişmese bile bu oranı artırabilir. CTR'ı ve aynı anda CPC ile CPM'i [[arac:tiklama-orani-hesapla|Tıklama Oranı Hesaplama aracıyla]] görebilirsiniz."
      ]
    },
    {
      h: "CPC ne demek? Tıklama başı maliyet",
      p: [
        "CPC (cost per click), bir tıklama için ödenen ortalama tutardır; Türkçe arayüzlerde <strong>TBM</strong> (tıklama başına maliyet) olarak geçer. Arama ağı reklamlarında reklamveren genellikle yalnızca tıklama gerçekleştiğinde ödeme yapar; teklif verdiğiniz \"en yüksek TBM\" ile gerçekte ödediğiniz ortalama TBM çoğu zaman farklıdır, çünkü açık artırmada ödenen tutar rakiplerin teklifine ve reklam kalitesine göre belirlenir."
      ],
      formula: "CPC = toplam harcama ÷ tıklama sayısı\nÖrnek: 1.000 TL ÷ 750 = 1,33 TL",
      after: [
        "CPC tek başına iyi ya da kötü değildir. 5 TL'lik bir tıklama, satış getiriyorsa 0,50 TL'lik ama hiç satış getirmeyen tıklamadan daha değerli olabilir. Bu yüzden CPC'yi her zaman dönüşüm oranı ve kâr marjıyla birlikte değerlendirmek gerekir. Harcama ve tıklamadan CPC'yi, isterseniz dönüşüm başı maliyeti de [[arac:tiklama-basi-maliyet-hesapla|Tıklama Başı Maliyet Hesaplama aracıyla]] bulabilirsiniz."
      ]
    },
    {
      h: "CPM nedir? Bin gösterim maliyeti",
      p: [
        "CPM (cost per mille, bin gösterim maliyeti), reklamın 1.000 kez gösterilmesinin ortalama maliyetidir. \"Mille\" Latincede bin demektir. Türkçe arayüzlerde <strong>BGBM</strong> olarak da geçer. Marka bilinirliği, video ve görüntülü reklam kampanyaları çoğu zaman gösterim üzerinden ücretlendirilir ve CPM ile karşılaştırılır."
      ],
      formula: "CPM = toplam harcama ÷ gösterim sayısı × 1.000\nGösterim = bütçe ÷ CPM × 1.000\nÖrnek: 1.000 TL ÷ 50.000 × 1.000 = 20 TL",
      after: [
        "Yayıncılar açısından aynı kavramın karşılığı RPM ya da eCPM'dir: bin sayfa görüntülemesi ya da bin reklam gösterimi başına elde edilen tahmini gelir. Örneğin bir sitenin aylık 200.000 sayfa görüntülemesi ve 1.600 TL tahmini reklam geliri varsa sayfa RPM'i 1.600 ÷ 200.000 × 1.000 = 8 TL'dir (örnek tutar). Bütçeden gösterim sayısını ya da CPM'den bütçeyi bulmak için [[arac:bin-gosterim-maliyeti-hesapla|Bin Gösterim Maliyeti Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "CPM'den CPC'ye nasıl geçilir? Üç ölçünün ilişkisi",
      p: [
        "CTR, CPC ve CPM aynı üç sayıdan (harcama, gösterim, tıklama) türetildiği için biri ile diğeri arasında geçiş yapılabilir. Bu, gösterim üzerinden ücretlendirilen bir kampanyayı tıklama üzerinden ücretlendirilen bir kampanyayla karşılaştırırken çok işe yarar."
      ],
      formula: "CPM = CPC × CTR × 1.000 (CTR ondalık: %1,5 = 0,015)\nCPC = CPM ÷ (CTR × 1.000)\nÖrnek: CPM 20 TL, CTR %1,5 → CPC = 20 ÷ 15 = 1,33 TL",
      table: {
        head: ["CPM", "CTR %0,5", "CTR %1", "CTR %2", "CTR %4"],
        rows: [
          ["10 TL", "2,00 TL", "1,00 TL", "0,50 TL", "0,25 TL"],
          ["20 TL", "4,00 TL", "2,00 TL", "1,00 TL", "0,50 TL"],
          ["40 TL", "8,00 TL", "4,00 TL", "2,00 TL", "1,00 TL"]
        ],
        caption: "Tablodaki hücreler aynı CPM'de tıklama oranına göre ortaya çıkan efektif CPC'dir. CPM tutarları örnektir."
      },
      after: [
        "Tablo önemli bir gerçeği gösterir: gösterim üzerinden ödeme yapıyorsanız tıklama oranınızı iki katına çıkarmak, tıklama başı maliyetinizi yarıya indirir. Bu yüzden görsel ve metin üzerinde yapılan testler bütçeyi artırmadan sonucu iyileştirmenin en etkili yollarındandır."
      ]
    },
    {
      h: "İyi bir tıklama oranı yüzde kaç?",
      p: [
        "Tek bir doğru cevap yoktur; CTR, reklamın gösterildiği yere, sektöre, hedeflemeye ve reklam biçimine göre büyük farklılık gösterir. Genel bir çerçeve olarak, kullanıcının zaten bir şey aradığı arama ağı reklamlarında CTR, görüntülü (banner) reklamlara göre belirgin biçimde yüksektir; görüntülü reklamlarda %1'in altındaki oranlar sık görülür. Markanızın adını arayan kişilere gösterilen reklamlarda ise çok yüksek oranlar normaldir."
      ],
      ul: [
        "<strong>Kendi ortalamanızla karşılaştırın:</strong> Aynı kampanyanın son üç aylık ortalaması, sektör genellemelerinden daha anlamlı bir ölçüttür.",
        "<strong>Yüksek CTR her zaman iyi değildir:</strong> Merak uyandıran ama ürünle ilgisi zayıf bir reklam çok tıklanıp hiç satış getirmeyebilir.",
        "<strong>Düşük CTR'ın nedenlerini ayırın:</strong> Yanlış hedefleme, ilgisiz anahtar kelime, zayıf görsel ya da reklamın sayfada görünmeyen bir yerde gösterilmesi.",
        "<strong>Gösterim sayısı az iken yorum yapmayın:</strong> 200 gösterimde 4 tıklama %2 eder, ama bu oran istatistiksel olarak çok oynaktır."
      ]
    },
    {
      h: "Dönüşüm oranı nedir? Reklam bütçesi nasıl planlanır?",
      p: [
        "Dönüşüm, reklamın amacına ulaşan eylemdir: satın alma, form doldurma, telefon araması ya da uygulama indirme. Dönüşüm oranı, tıklayanların yüzde kaçının bu eylemi gerçekleştirdiğini gösterir ve büyük ölçüde açılış sayfasının, fiyatın ve güvenin kalitesine bağlıdır."
      ],
      formula: "Dönüşüm oranı (%) = dönüşüm ÷ tıklama × 100\nDönüşüm başı maliyet (CPA) = harcama ÷ dönüşüm\nCPA = CPC ÷ dönüşüm oranı (ondalık)",
      ol: [
        "<strong>Hedefi belirleyin:</strong> Ayda 30 satış istiyorsunuz.",
        "<strong>Gereken tıklamayı bulun:</strong> Dönüşüm oranınız %2 ise 30 ÷ 0,02 = 1.500 tıklama gerekir.",
        "<strong>Bütçeyi hesaplayın:</strong> Ortalama CPC 1,33 TL ise 1.500 × 1,33 ≈ 2.000 TL bütçe gerekir (örnek tutar).",
        "<strong>Gösterim ihtiyacını görün:</strong> CTR %1,5 ise 1.500 ÷ 0,015 = 100.000 gösterim gerekir.",
        "<strong>Kârlılığı kontrol edin:</strong> Satış başı maliyet 2.000 ÷ 30 ≈ 66,67 TL; ürünün brüt kârı bu tutardan yüksek değilse kampanya zarar ettirir."
      ],
      after: [
        "Son adım, reklam harcamasının getirisini ölçen ROAS ve yatırım getirisi ROI kavramlarına bağlanır; ayrıntılar için [[bilgi:roas-ve-roi-nedir-nasil-hesaplanir|ROAS ve ROI nedir]] yazısına, kâr hesabı için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Instagram etkileşim oranı nasıl hesaplanır?",
      p: [
        "Sosyal medyada tıklamadan önce gelen ölçü etkileşimdir: beğeni, yorum, paylaşım ve kaydetme. Etkileşim oranı, bu etkileşimlerin bir taban sayıya oranıdır. Taban olarak takipçi sayısı, gönderinin erişimi (gören tekil hesap) ya da gösterim kullanılabilir; hangi tabanın kullanıldığı mutlaka belirtilmelidir, çünkü sonuçlar çok farklı çıkar."
      ],
      formula: "Etkileşim oranı (takipçiye göre, %) = (beğeni + yorum + paylaşım + kaydetme) ÷ takipçi × 100\nEtkileşim oranı (erişime göre, %) = toplam etkileşim ÷ erişim × 100",
      after: [
        "Örnek: 12.000 takipçili bir hesabın gönderisi 420 beğeni, 35 yorum, 18 paylaşım ve 47 kaydetme almış, 9.500 hesaba erişmiş olsun. Toplam etkileşim 520'dir. Takipçiye göre oran 520 ÷ 12.000 × 100 = %4,33; erişime göre oran 520 ÷ 9.500 × 100 = %5,47'dir. İş birliği tekliflerinde ve hesapları karşılaştırırken aynı tabanı kullanmak önemlidir. Tek gönderi ya da birden çok gönderinin ortalaması için [[arac:etkilesim-orani-hesapla|Etkileşim Oranı Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Tıklama oranını artırmak için pratik adımlar",
      p: [
        "CTR'ı yükseltmenin yolu, doğru kişiye doğru mesajı göstermekten geçer. Aşağıdaki adımlar hem ücretli reklamlarda hem de arama sonuçlarındaki organik listelemelerde işe yarar:"
      ],
      ul: [
        "<strong>Arama niyetine uygun başlık:</strong> Kullanıcının yazdığı ifadeyi ve sorusunun cevabını başlıkta görmesi tıklama isteğini artırır.",
        "<strong>Somut fayda ve sayı:</strong> \"Ücretsiz kargo\", \"aynı gün teslim\" ya da \"3 adımda\" gibi net ifadeler belirsiz sloganlardan daha çok tıklanır.",
        "<strong>Negatif anahtar kelime ve hedefleme:</strong> Ürününüzü aramayan kişilere gösterimi azaltmak CTR'ı doğrudan yükseltir ve bütçeyi korur.",
        "<strong>Görselde tek mesaj:</strong> Mobil ekranda küçük görünen reklamlarda kalabalık görsel yerine tek ve okunur bir mesaj kullanın.",
        "<strong>A/B testi:</strong> Aynı anda iki başlık ya da görsel deneyin; yeterli gösterim biriktikten sonra kazananı bırakın.",
        "<strong>Meta açıklama ve başlık uzunluğu:</strong> Organik sonuçlarda kesilmeyen başlık ve açıklama yazmak için [[bilgi:sms-kac-karakter|karakter sınırları]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yüzdeyi ondalıkla karıştırmak:</strong> CPM = CPC × CTR × 1.000 formülünde %1,5 yerine 1,5 yazmak sonucu 100 kat büyütür.",
        "<strong>Ortalamaların ortalamasını almak:</strong> Üç kampanyanın CTR'larının basit ortalaması yanıltıcıdır; toplam tıklamayı toplam gösterime bölün.",
        "<strong>KDV ve komisyonu unutmak:</strong> Reklam faturalarında vergiler ve ajans ücretleri birim maliyete eklenmelidir.",
        "<strong>Yalnızca CPC'yi düşürmeye odaklanmak:</strong> Ucuz ama alakasız tıklamalar dönüşüm başı maliyeti yükseltir.",
        "<strong>Kısa süreli veriyle karar vermek:</strong> Reklam sistemlerinin öğrenme dönemi vardır; ilk günlerin verisi oynaktır."
      ]
    }
  ],
  faq: [
    ["CTR nedir, nasıl hesaplanır?", "CTR, reklamı ya da bağlantıyı görenlerin yüzde kaçının tıkladığını gösteren tıklama oranıdır. Tıklama sayısı gösterim sayısına bölünüp 100 ile çarpılarak bulunur; 50.000 gösterimde 750 tıklama yüzde 1,5 eder."],
    ["CPC ne demek?", "CPC, tıklama başı maliyet anlamına gelir ve toplam reklam harcamasının tıklama sayısına bölünmesiyle bulunur. Türkçe reklam arayüzlerinde TBM olarak görünür; 1.000 TL harcama ve 750 tıklamada CPC yaklaşık 1,33 TL'dir."],
    ["CPM nedir?", "CPM, reklamın bin kez gösterilmesinin maliyetidir. Toplam harcama gösterim sayısına bölünüp 1.000 ile çarpılarak hesaplanır; 1.000 TL ile 50.000 gösterim alındıysa CPM 20 TL'dir."],
    ["İyi bir tıklama oranı yüzde kaç?", "Sektöre, platforma ve reklam türüne göre değişir. Arama ağı reklamlarında oranlar genellikle görüntülü reklamlardan yüksektir; görüntülü reklamlarda yüzde birin altı sık görülür. En sağlıklı ölçüt kendi kampanyalarınızın geçmiş ortalamasıdır."],
    ["CPM'den CPC'ye nasıl geçilir?", "CPC, CPM'in tıklama oranının bin katına bölünmesiyle bulunur: CPC = CPM ÷ (CTR × 1.000), CTR ondalık yazılır. CPM 20 TL ve CTR yüzde 1,5 ise CPC 20 ÷ 15 = 1,33 TL olur."],
    ["Reklam bütçesi nasıl planlanır?", "Hedef dönüşüm sayısını dönüşüm oranına bölerek gereken tıklamayı, bunu ortalama CPC ile çarparak bütçeyi bulun. 30 satış, yüzde 2 dönüşüm ve 1,33 TL CPC için yaklaşık 1.500 tıklama ve 2.000 TL bütçe gerekir."],
    ["Instagram etkileşim oranı nasıl hesaplanır?", "Beğeni, yorum, paylaşım ve kaydetme sayılarını toplayıp takipçi sayısına ya da erişime bölün ve 100 ile çarpın. Hangi tabanı kullandığınızı belirtin; erişime göre oran genellikle takipçiye göre orandan yüksek çıkar."],
    ["Dönüşüm oranı nedir?", "Dönüşüm oranı, reklama tıklayanların yüzde kaçının satın alma veya form doldurma gibi hedeflenen eylemi gerçekleştirdiğini gösterir. Dönüşüm sayısının tıklama sayısına bölünüp 100 ile çarpılmasıyla hesaplanır."],
    ["CPM mi CPC mi daha avantajlı?", "Hedefe bağlıdır. Bilinirlik ve görünürlük amaçlı kampanyalarda gösterim üzerinden ödeme mantıklıdır; satış ve form gibi doğrudan eylem hedeflerinde tıklama ya da dönüşüm üzerinden ödeme daha kontrol edilebilir. CTR yüksekse CPM modeli efektif olarak ucuzlar."]
  ],
  tools: ["tiklama-orani-hesapla", "tiklama-basi-maliyet-hesapla", "bin-gosterim-maliyeti-hesapla", "etkilesim-orani-hesapla"],
  related: ["roas-ve-roi-nedir-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "pazaryeri-komisyonu-nasil-hesaplanir"]
};
