export default {
  slug: "temettu-verimi-nedir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Temettü Verimi Nedir, Nasıl Hesaplanır? Brüt-Net Temettü ve Stopaj",
  pageTitle: "Temettü Verimi Nedir? Brüt, Net Temettü ve Stopaj Hesabı",
  description: "Temettü verimi = hisse başına brüt temettü ÷ hisse fiyatı. Brüt-net temettü farkı, %15 stopaj, lot başına hesap, hak kullanım tarihi ve fiyat düzeltmesi örnekle.",
  keywords: ["temettü verimi nedir", "temettü verimi hesaplama", "temettü nedir", "net temettü hesaplama", "temettü stopajı", "temettü ne zaman yatar", "hak kullanım tarihi", "lot başına temettü"],
  lead: "Temettü verimi, <strong>hisse başına ödenen brüt temettünün hisse fiyatına bölünüp 100 ile çarpılmasıyla</strong> bulunur: 50 TL'lik bir hisse 2,50 TL brüt temettü dağıtıyorsa verim %5'tir. Bireysel yatırımcıya ödenen tutardan %15 stopaj kesildiği için net temettü 2,125 TL, net verim %4,25 olur. Bu yazıda temettünün ne olduğunu, şirket duyurularındaki yüzdeli ifadelerin nasıl okunacağını, lot sayınıza göre net tutarın hesabını, hak kullanım tarihini ve temettü sonrası fiyatın neden düştüğünü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Temettü verimi (%) = hisse başına brüt temettü ÷ hisse fiyatı × 100.",
    "Tam mükellef gerçek kişilere ödenen kâr paylarında stopaj oranı %15'tir (22.12.2024 tarihinden itibaren).",
    "Net temettü = brüt temettü × (1 − 0,15); 2,50 TL brütün neti 2,125 TL'dir.",
    "Borsa İstanbul'da 1 lot 1 paydır; toplam net temettü = lot sayısı × hisse başına net temettü.",
    "Hak kullanım günü hissenin baz fiyatı brüt temettü kadar düşürülür; 50 TL'lik hisse 2,50 TL temettüden sonra 47,50 TL'den işlem görmeye başlar.",
    "Şirketlerin \"%250 brüt nakit temettü\" ifadesi 1 TL nominal değerli pay başına 2,50 TL demektir."
  ],
  figure: {
    alt: "Temettü zaman çizelgesi: yönetim kurulu önerisi, genel kurul onayı, hak kullanım günü fiyatın 50 TL'den 47,50 TL'ye düzeltilmesi ve 1.000 lot için 2.500 TL brüt, 375 TL stopaj, 2.125 TL net ödeme.",
    caption: "Bir temettünün yolculuğu: 50 TL'lik hissede 2,50 TL brüt temettü, %5 brüt verim ve %4,25 net verim demektir. Ödeme günü hesaba net tutar geçer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Temettünün yolculuğu (1.000 lot örneği)</text>
  <line x1="60" y1="110" x2="660" y2="110" class="sp sw" fill="none"/>
  <g class="mid">
    <circle cx="90" cy="110" r="14" class="ps"/><text x="90" y="115" class="b sm">1</text>
    <text x="90" y="72" class="b sm">YK önerisi</text><text x="90" y="88" class="sm mu">KAP duyurusu</text>
    <circle cx="270" cy="110" r="14" class="ps"/><text x="270" y="115" class="b sm">2</text>
    <text x="270" y="72" class="b sm">Genel kurul</text><text x="270" y="88" class="sm mu">dağıtım onayı</text>
    <circle cx="450" cy="110" r="14" class="p"/><text x="450" y="115" class="b sm sf">3</text>
    <text x="450" y="72" class="b sm">Hak kullanım</text><text x="450" y="88" class="sm mu">fiyat düzeltilir</text>
    <circle cx="630" cy="110" r="14" class="ok"/><text x="630" y="115" class="b sm sf">4</text>
    <text x="630" y="72" class="b sm">Ödeme</text><text x="630" y="88" class="sm mu">net tutar hesapta</text>
  </g>
  <rect x="20" y="150" width="330" height="150" rx="10" class="sf sb"/>
  <text x="185" y="178" class="b mid">Hak kullanım günü fiyat</text>
  <text x="185" y="216" class="xl mid">50,00 → 47,50 TL</text>
  <text x="185" y="246" class="sm mid t2">Baz fiyat = önceki kapanış − brüt temettü</text>
  <text x="185" y="276" class="sm mid t2">Brüt verim: 2,50 ÷ 50 = %5</text>
  <rect x="370" y="150" width="330" height="150" rx="10" class="sf sb"/>
  <text x="390" y="180">Brüt: 1.000 × 2,50</text><text x="680" y="180" class="b end">2.500,00 TL</text>
  <text x="390" y="214" class="dg">Stopaj %15</text><text x="680" y="214" class="b dg end">− 375,00 TL</text>
  <line x1="390" y1="232" x2="680" y2="232" class="sb" fill="none"/>
  <rect x="384" y="244" width="302" height="44" rx="8" class="oks"/>
  <text x="398" y="272" class="b">Net ödenen</text><text x="672" y="272" class="b lg ok end">2.125,00 TL</text>
  <rect x="20" y="322" width="680" height="76" rx="10" class="ps"/>
  <text x="360" y="352" class="b mid">Net verim = 2,125 ÷ 50 = %4,25</text>
  <text x="360" y="380" class="sm mid">Yatırımcının toplam değeri: 47.500 TL hisse + 2.125 TL nakit</text>
</svg>`
  },
  sections: [
    {
      h: "Temettü nedir?",
      p: [
        "Temettü (kâr payı), bir şirketin dönem kârının bir bölümünü ortaklarına nakit ya da pay olarak dağıtmasıdır. Türkiye'de halka açık şirketlerde kâr dağıtımı Türk Ticaret Kanunu ve Sermaye Piyasası Kurulu'nun kâr payı düzenlemelerine göre yapılır: yönetim kurulu bir öneri hazırlar, bu öneri Kamuyu Aydınlatma Platformu'nda (KAP) duyurulur ve genel kurulun onayıyla kesinleşir.",
        "Şirketler kârın tamamını dağıtmak zorunda değildir. Kârın bir kısmı yasal yedek akçeye ayrılır, bir kısmı büyüme yatırımları için şirkette bırakılır. Kârın ne kadarının dağıtıldığını gösteren orana <strong>kâr dağıtım oranı</strong> denir. Olgun ve nakit üreten şirketler genellikle daha yüksek dağıtım yapar; hızlı büyüyen şirketler ise kârı yeniden yatırıma yöneltir.",
        "Nakit temettünün yanında şirketler bazen bedelsiz pay (iç kaynaklardan sermaye artırımı) da dağıtır. Bedelsiz payda yatırımcının hesabına nakit değil, yeni pay girer; toplam değer değişmez, pay sayısı artar ve fiyat oranlı olarak düşer. Bu yazı nakit temettüye odaklanır."
      ]
    },
    {
      h: "Temettü verimi formülü",
      p: [
        "Temettü verimi, hisseye bugünkü fiyattan yatırım yapan birinin yalnızca kâr payından elde edeceği yıllık getiriyi gösterir. Fiyat artışı ya da düşüşü bu orana dahil değildir."
      ],
      formula: "Brüt temettü verimi (%) = Hisse başına brüt temettü ÷ Hisse fiyatı × 100\nNet temettü verimi (%) = Hisse başına net temettü ÷ Hisse fiyatı × 100\nNet temettü = Brüt temettü × (1 − stopaj oranı)",
      after: [
        "Örnek: Fiyatı 50 TL olan bir hisse için şirket pay başına 2,50 TL brüt temettü açıkladı. Brüt verim 2,50 ÷ 50 × 100 = %5'tir. %15 stopaj sonrası net temettü 2,50 × 0,85 = 2,125 TL, net verim 2,125 ÷ 50 × 100 = %4,25 olur. Bu hesabı fiyat ve temettü tutarını girerek [[arac:temettu-verimi-hesapla|Temettü Verimi Hesaplama]] aracında saniyeler içinde yapabilirsiniz."
      ]
    },
    {
      h: "Şirket duyurusundaki yüzde ne anlama gelir?",
      p: [
        "KAP'taki kâr payı dağıtım tablolarında temettü genellikle iki biçimde yazılır: pay başına TL tutarı ve <strong>nominal değere oranı</strong>. Borsa İstanbul'daki payların nominal değeri 1 TL olduğu için \"brüt %250 nakit kâr payı\" ifadesi, 1 TL nominal değerli her pay için 2,50 TL brüt temettü demektir.",
        "Bu yüzde, temettü verimiyle karıştırılmamalıdır. %250 nominal oran kulağa çok yüksek gelse de hisse 50 TL'den işlem görüyorsa verim yalnızca %5'tir. Doğru karşılaştırma için her zaman TL tutarını güncel fiyata bölün."
      ],
      table: {
        head: ["Duyurudaki oran (nominale göre)", "Pay başına brüt", "Hisse fiyatı", "Brüt verim", "Net verim (%15 stopaj)"],
        rows: [
          ["%50", "0,50 TL", "20,00 TL", "%2,50", "%2,13"],
          ["%150", "1,50 TL", "30,00 TL", "%5,00", "%4,25"],
          ["%250", "2,50 TL", "50,00 TL", "%5,00", "%4,25"],
          ["%400", "4,00 TL", "200,00 TL", "%2,00", "%1,70"],
          ["%1.000", "10,00 TL", "125,00 TL", "%8,00", "%6,80"]
        ],
        caption: "Nominal oranı yüksek bir temettü, hisse fiyatı da yüksekse düşük verim anlamına gelebilir. Tutarlar örnektir."
      }
    },
    {
      h: "Lot başına temettü ve stopaj hesabı",
      p: [
        "Borsa İstanbul pay piyasasında 1 lot 1 paya eşittir. Toplam alacağınız temettüyü bulmak için hisse başına tutarı sahip olduğunuz lot sayısıyla çarpmanız yeterlidir."
      ],
      ol: [
        "Lot sayınızı öğrenin: örneğin 1.000 lot.",
        "Brüt tutar: 1.000 × 2,50 = 2.500 TL.",
        "Stopaj: 2.500 × 0,15 = 375 TL. Bu tutarı aracı kurum kesip vergi dairesine yatırır.",
        "Net tutar: 2.500 − 375 = 2.125 TL; ödeme günü yatırım hesabınıza geçer.",
        "Farklı fiyatlardan alım yaptıysanız verimi kendi maliyetinize göre de hesaplayabilirsiniz; ortalama maliyetinizi [[arac:hisse-ortalama-maliyet-hesapla|Hisse Ortalama Maliyet Hesaplama]] aracıyla bulun."
      ],
      after: [
        "Stopaj oranı 9286 sayılı Cumhurbaşkanı Kararıyla 22 Aralık 2024'ten itibaren %10'dan %15'e yükseltilmiştir. Oran, ödemenin yapıldığı tarihteki karara göre uygulanır ve ilerleyen yıllarda yeniden değişebilir; güncel oranı Gelir İdaresi Başkanlığı'ndan kontrol edin. Stopaj kesilmiş kâr payları belirli bir tutarı aşarsa yıllık beyanname gerekebilir; bu durumda kâr payının yarısı istisnadır ve kesilen stopaj hesaplanan vergiden mahsup edilir."
      ]
    },
    {
      h: "Hak kullanım tarihi ve temettü ne zaman yatar?",
      p: [
        "Kâr payı dağıtım tarihi genel kurulda belirlenir ve KAP'ta ilan edilir. Bu tarihe <strong>hak kullanım tarihi</strong> denir. Hak kullanım günü sabahından itibaren hisse \"temettüsüz\" işlem görür; o gün ve sonrasında hisseyi alan kişi o dönemin temettüsünü alamaz.",
        "Temettüye hak kazanmak için hisseyi hak kullanım tarihinden önceki işlem günü kapanışına kadar almış olmanız gerekir. Pay piyasasında takas iki iş günü sürdüğü için nakit ödeme de genellikle hak kullanım tarihinden iki iş günü sonra hesaplara geçer. Hak kullanım günü hisseyi satsanız bile temettü size ödenir.",
        "Türkiye'de temettü ödemelerinin çoğu, genel kurulların toplandığı Nisan–Haziran döneminde yapılır. Bazı şirketler kâr payını taksitle ya da yıl içinde birden fazla kez ödeyebilir; bu durumda her taksit için ayrı hak kullanım tarihi ilan edilir."
      ]
    },
    {
      h: "Temettü sonrası hisse fiyatı neden düşer?",
      p: [
        "Temettü ödendiğinde şirketin kasasından nakit çıkar ve şirketin değeri bu kadar azalır. Borsa İstanbul bunu yansıtmak için hak kullanım günü hissenin baz fiyatını <strong>brüt temettü tutarı kadar</strong> düşürür. 50 TL kapanış yapan hisse 2,50 TL brüt temettüden sonra 47,50 TL baz fiyattan işleme açılır.",
        "Bu yüzden temettü \"bedava para\" değildir: yatırımcının toplam serveti temettü günü değişmez, bir kısmı hisse değerinden nakde geçer. 1.000 lot için hisse değeri 50.000 TL'den 47.500 TL'ye iner, hesaba 2.125 TL net nakit girer. Aradaki 375 TL stopajdır. Fiyatın sonraki günlerde temettü öncesi seviyeye dönmesi (\"temettü boşluğunu kapatması\") şirketin performansına ve piyasa koşullarına bağlıdır."
      ]
    },
    {
      h: "Temettü verimini doğru yorumlamak",
      ul: [
        "<strong>Tek yıl yanıltabilir:</strong> Bir defalık varlık satışı kârından yapılan yüksek dağıtım sonraki yıllarda tekrarlanmayabilir; birkaç yılın ortalamasına bakın.",
        "<strong>Fiyat düşüşüyle şişen verim:</strong> Hisse sert düştüğü için yükselen verim bir uyarı işareti olabilir.",
        "<strong>Kâr dağıtım oranı:</strong> Temettü / net kâr oranı %100'ü aşıyorsa şirket kârından fazlasını dağıtıyor demektir.",
        "<strong>F/K ile ilişkisi:</strong> Kazanç verimi 1 ÷ (F/K)'dır; temettü verimi kabaca kazanç verimi × dağıtım oranına eşittir. F/K'yı [[arac:fiyat-kazanc-orani-hesapla|F/K Oranı Hesaplama]] aracıyla bulabilirsiniz.",
        "<strong>Enflasyon:</strong> Yüksek enflasyon döneminde %4–5'lik nominal verim, reel olarak düşük kalabilir. Paranın büyüme hızını kabaca görmek için [[bilgi:72-kurali-nedir|72 kuralı]] yazımıza bakabilirsiniz."
      ],
      after: [
        "Yüzde hesaplarını farklı senaryolarla denemek için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı da işinize yarar."
      ]
    }
  ],
  faq: [
    ["Temettü nedir?", "Temettü, bir şirketin dönem kârının bir kısmını ortaklarına nakit ya da pay olarak dağıtmasıdır. Halka açık şirketlerde yönetim kurulunun önerisi KAP'ta duyurulur, genel kurul onayıyla kesinleşir ve belirlenen hak kullanım tarihinde dağıtılır."],
    ["Temettü verimi nasıl hesaplanır?", "Hisse başına brüt temettü, güncel hisse fiyatına bölünür ve 100 ile çarpılır. Örneğin 50 TL'lik hisse 2,50 TL brüt temettü veriyorsa verim yüzde 5'tir. Net verim için stopaj sonrası net tutarı fiyata bölersiniz."],
    ["Brüt ve net temettü farkı nedir?", "Brüt temettü şirketin pay başına dağıttığı tutardır. Net temettü ise bu tutardan stopaj kesildikten sonra yatırımcının hesabına geçen miktardır. Yüzde 15 stopajda 2,50 TL brüt temettünün neti 2,125 TL olur."],
    ["Temettüden stopaj kesilir mi?", "Evet. Tam mükellef gerçek kişilere yapılan kâr payı ödemelerinde 22 Aralık 2024'ten itibaren yüzde 15 stopaj uygulanır. Kesintiyi aracı kurum yapar ve vergi dairesine öder; yatırımcının hesabına net tutar geçer."],
    ["Temettü hesaba ne zaman yatar?", "Temettü, hak kullanım tarihinden sonra takas süresinin tamamlanmasıyla, genellikle iki iş günü içinde yatırım hesabınıza geçer. Ödeme tarihi şirketin genel kurul kararıyla belirlenir ve KAP'ta ilan edilir; çoğu ödeme Nisan ile Haziran arasında yapılır."],
    ["Hak kullanım tarihi ne demek?", "Hak kullanım tarihi, hissenin temettüsüz işlem görmeye başladığı gündür. Temettü almak için hisseyi bu tarihten önceki işlem günü kapanışına kadar almış olmanız gerekir; hak kullanım günü ve sonrasında alanlar o temettüyü alamaz."],
    ["Temettü sonrası hisse fiyatı neden düşer?", "Temettüyle şirketten nakit çıktığı için şirketin değeri azalır. Borsa İstanbul hak kullanım günü baz fiyatı brüt temettü tutarı kadar düşürür. Böylece yatırımcının toplam serveti değişmez; değerin bir kısmı hisseden nakde geçer."],
    ["Lot başına temettü nasıl hesaplanır?", "Borsa İstanbul'da bir lot bir paydır. Hisse başına brüt temettüyü lot sayınızla çarparak brüt tutarı, bunu 0,85 ile çarparak yüzde 15 stopaj sonrası net tutarı bulursunuz. Örneğin 1.000 lot ve 2,50 TL için net 2.125 TL eder."],
    ["Yüksek temettü verimi her zaman iyi midir?", "Değildir. Verim, hisse fiyatı sert düştüğü için de yükselmiş olabilir ya da tek seferlik bir kârdan kaynaklanabilir. Birkaç yıllık temettü geçmişine, kâr dağıtım oranına ve şirketin nakit akışına bakmak daha sağlıklı bir değerlendirme sağlar."]
  ],
  tools: ["temettu-verimi-hesapla", "yuzde-hesapla", "fiyat-kazanc-orani-hesapla", "hisse-ortalama-maliyet-hesapla"],
  related: ["72-kurali-nedir", "bilesik-faiz-nedir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – 9286 sayılı Cumhurbaşkanı Kararı duyurusu", "https://www.gib.gov.tr/"],
    ["Kamuyu Aydınlatma Platformu – Kâr payı dağıtım bildirimleri", "https://www.kap.org.tr/"],
    ["Sermaye Piyasası Kurulu – Kâr payı tebliği", "https://www.spk.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, kararlarınız için lisanslı bir yatırım danışmanına başvurun"
};
