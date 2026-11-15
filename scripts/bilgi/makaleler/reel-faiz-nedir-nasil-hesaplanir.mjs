export default {
  slug: "reel-faiz-nedir-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Reel Faiz Nedir, Nasıl Hesaplanır? Mevduatın Enflasyona Göre Getirisi",
  pageTitle: "Reel Faiz Nedir, Nasıl Hesaplanır? Fisher Denklemi ve Örnekler",
  description: "Reel faiz, enflasyondan arındırılmış getiridir: (1 + nominal) ÷ (1 + enflasyon) − 1. Fisher denklemi, stopaj etkisi, negatif reel faiz ve mevduat örnekleri.",
  keywords: ["reel faiz nedir", "reel faiz hesaplama", "fisher denklemi", "nominal faiz reel faiz farkı", "negatif reel faiz", "mevduat reel getiri", "enflasyondan arındırılmış getiri", "reel faiz formülü"],
  lead: "Reel faiz, <strong>paranızın faizle büyüyüp büyümediğini değil, alım gücünün artıp artmadığını gösteren, enflasyondan arındırılmış getiridir</strong>. Doğru formül Fisher denklemidir: reel faiz = (1 + nominal faiz) ÷ (1 + enflasyon) − 1. Yıllık net %34 faiz alan ve enflasyonun %30 olduğu bir yılda reel getiri yaklaşık %3,08'dir; basit çıkarmayla bulunan %4 değeri gerçeği abartır. Enflasyon faizden yüksekse reel faiz negatiftir ve bankadaki paranız artsa bile daha az şey satın alır. Bu yazıda formülü, stopajın etkisini, dönem uyumunu ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Reel faiz = (1 + nominal faiz) ÷ (1 + enflasyon) − 1; oranlar ondalık olarak yazılır (%34 → 0,34).",
    "Nominal faiz, paranızın TL olarak ne kadar arttığını; reel faiz, alım gücünüzün ne kadar arttığını gösterir.",
    "Basit çıkarma (nominal − enflasyon) yalnızca düşük oranlarda yaklaşık doğrudur; yüksek enflasyonda belirgin biçimde yanıltır.",
    "Mevduatta reel getiriyi brüt değil, stopaj düşülmüş net faizle hesaplamak gerekir.",
    "Enflasyon net faizden yüksekse reel faiz negatiftir: nominal kazanç olsa da alım gücü kaybedilir.",
    "Faiz ve enflasyon aynı döneme ait olmalıdır: yıllık faizi yıllık enflasyonla, aylığı aylıkla karşılaştırın."
  ],
  figure: {
    alt: "100.000 TL'lik mevduatın bir yılda net %34 faizle 134.000 TL olması, fiyatların %30 artması ve bugünün parasıyla değerinin 103.077 TL'de kalması; reel getiri %3,08.",
    caption: "Nominal olarak 34.000 TL kazanç görünür, ama aynı dönemde fiyatlar %30 arttığı için bu tutarın bugünkü alım gücü 103.077 TL'dir. Gerçek kazanç 3.077 TL'dir; basit çıkarma ise 4.000 TL gösterirdi.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100.000 TL mevduat, 1 yıl (örnek oranlar)</text>
  <line x1="60" y1="340" x2="680" y2="340" class="st" fill="none"/>
  <rect x="90" y="190" width="120" height="150" class="sf sb"/>
  <text x="150" y="180" class="b mid">100.000 TL</text>
  <text x="150" y="364" class="sm mid">Başlangıç</text>
  <rect x="300" y="139" width="120" height="201" class="ps"/>
  <text x="360" y="129" class="b mid">134.000 TL</text>
  <text x="360" y="364" class="sm mid">Yıl sonu (nominal)</text>
  <text x="360" y="382" class="sm mid t2">net faiz %34</text>
  <rect x="510" y="185" width="120" height="155" class="oks"/>
  <text x="570" y="175" class="b mid ok">103.077 TL</text>
  <text x="570" y="364" class="sm mid">Bugünkü alım gücü</text>
  <text x="570" y="382" class="sm mid t2">134.000 ÷ 1,30</text>
  <line x1="214" y1="265" x2="296" y2="265" class="sp sw" fill="none"/>
  <polygon points="296,258 308,265 296,272" class="p"/>
  <text x="255" y="252" class="sm mid b p">+%34</text>
  <line x1="424" y1="265" x2="506" y2="265" class="sa sw" fill="none"/>
  <polygon points="506,258 518,265 506,272" class="a"/>
  <text x="465" y="252" class="sm mid b">÷ 1,30</text>
  <text x="465" y="288" class="sm mid t2">enflasyon %30</text>
  <rect x="60" y="56" width="620" height="54" rx="8" class="sf sb"/>
  <rect x="60" y="56" width="8" height="54" class="p"/>
  <text x="84" y="80" class="b">Reel faiz = 1,34 ÷ 1,30 − 1 = %3,08</text>
  <text x="84" y="100" class="sm t2">Basit çıkarma 34 − 30 = %4 verir ve gerçek getiriyi abartır.</text>
</svg>`
  },
  sections: [
    {
      h: "Reel faiz nedir?",
      p: [
        "Faiz oranı size paranızın kaç lira artacağını söyler. Ancak paranın değeri, onunla ne satın alabildiğinize bağlıdır. Aynı dönemde fiyatlar da yükseliyorsa paranızın artan kısmının bir bölümü yalnızca fiyat artışını karşılamaya gider. <strong>Nominal faiz</strong> bankanın ya da yatırım aracının ilan ettiği orandır; <strong>reel faiz</strong> ise bu getiriden enflasyonun etkisi çıkarıldıktan sonra kalan, alım gücündeki gerçek değişimdir.",
        "Bir örnekle düşünün: Yıl başında bir ürün 100 TL olsun ve elinizde 100.000 TL bulunsun, yani 1.000 adet alabilirsiniz. Paranız yıl sonunda 134.000 TL'ye ulaşırken ürünün fiyatı 130 TL'ye çıktıysa artık yaklaşık 1.031 adet alabilirsiniz. Alım gücünüz yaklaşık %3,08 artmıştır; reel faiz budur. Ekonomi haberlerinde \"pozitif reel faiz\" ya da \"negatif reel faiz\" ifadeleri bu karşılaştırmayı anlatır."
      ]
    },
    {
      h: "Reel faiz formülü: Fisher denklemi",
      p: [
        "İktisatçı Irving Fisher'ın adıyla anılan denklem, nominal faiz, reel faiz ve enflasyon arasındaki ilişkiyi çarpımsal olarak kurar. Mantığı şudur: paranız (1 + nominal) katına çıkarken fiyatlar (1 + enflasyon) katına çıkar; alım gücünüzdeki değişim bu iki çarpanın oranıdır."
      ],
      formula: "(1 + nominal faiz) = (1 + reel faiz) × (1 + enflasyon)\nReel faiz = (1 + nominal) ÷ (1 + enflasyon) − 1\nYaklaşık formül (düşük oranlarda): reel ≈ nominal − enflasyon",
      after: [
        "Formülde oranlar ondalık olarak yazılır: %34 → 0,34, %30 → 0,30. Sonuç da ondalıktır; 100 ile çarparak yüzdeye çevirirsiniz. Yaklaşık formül, oranlar tek haneliyken (örneğin %5 faiz, %3 enflasyon) gerçeğe çok yakın sonuç verir: kesin değer %1,94, yaklaşık değer %2'dir. Oranlar büyüdükçe aradaki fark açılır.",
        "Denklemi tersinden de kullanabilirsiniz. Belirli bir reel getiriyi hedefliyorsanız gereken nominal faiz = (1 + hedef reel) × (1 + beklenen enflasyon) − 1'dir. Enflasyon beklentisi %30 iken %5 reel getiri isteyen biri en az 1,05 × 1,30 − 1 = %36,5 net nominal getiri aramalıdır."
      ]
    },
    {
      h: "Adım adım çözümlü örnekler",
      ol: [
        "<strong>Pozitif reel faiz:</strong> Net yıllık faiz %34, yıllık enflasyon %30. Reel faiz = 1,34 ÷ 1,30 − 1 = 0,03077 → <strong>%3,08</strong>. 100.000 TL'lik mevduat 134.000 TL olur; bugünün fiyatlarıyla değeri 134.000 ÷ 1,30 = 103.076,92 TL'dir. Gerçek kazanç 3.076,92 TL.",
        "<strong>Negatif reel faiz:</strong> Net faiz %20, enflasyon %45. Reel faiz = 1,20 ÷ 1,45 − 1 = −0,1724 → <strong>−%17,24</strong>. 100.000 TL 120.000 TL'ye çıkar ama alım gücü 120.000 ÷ 1,45 = 82.758,62 TL'dir; kayıp 17.241,38 TL.",
        "<strong>Sıfır reel faiz:</strong> Net faiz ve enflasyon ikisi de %25 ise 1,25 ÷ 1,25 − 1 = 0. Paranız artar ama yalnızca fiyat artışını karşılar; alım gücü korunur.",
        "<strong>Düşük oranlı ortam:</strong> Faiz %5, enflasyon %3. Reel = 1,05 ÷ 1,03 − 1 = %1,94. Basit çıkarma %2 verir; fark yalnızca 0,06 puandır.",
        "<strong>Hedef getiri:</strong> Beklenen enflasyon %30 iken %5 reel getiri için gereken net nominal faiz = 1,05 × 1,30 − 1 = <strong>%36,5</strong>."
      ],
      after: [
        "Bu hesapları [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracıyla tek adımda yapabilirsiniz: nominal faizi, enflasyonu ve isterseniz stopaj oranıyla anaparayı girdiğinizde araç reel faizi, stopaj sonrası net getiriyi ve paranızın bugünkü alım gücündeki karşılığını gösterir. Örneklerdeki oranlar yalnızca hesabı anlatmak içindir."
      ]
    },
    {
      h: "Basit çıkarma yöntemi neden yanıltıcıdır?",
      p: [
        "Nominal faizden enflasyonu çıkarmak pratik görünür, ama bu yöntem enflasyonun yalnızca anaparayı değil, faiz gelirini de erittiğini hesaba katmaz. Faiz geliri de yıl sonunda yeni fiyatlarla harcanır. Oranlar yükseldikçe bu ihmal edilen etki büyür."
      ],
      table: {
        head: ["Net nominal faiz", "Enflasyon", "Basit çıkarma", "Fisher (doğru)", "Fark"],
        rows: [
          ["%5", "%3", "%2,00", "%1,94", "0,06 puan"],
          ["%15", "%10", "%5,00", "%4,55", "0,45 puan"],
          ["%34", "%30", "%4,00", "%3,08", "0,92 puan"],
          ["%50", "%40", "%10,00", "%7,14", "2,86 puan"],
          ["%20", "%45", "−%25,00", "−%17,24", "7,76 puan"],
          ["%60", "%80", "−%20,00", "−%11,11", "8,89 puan"]
        ],
        caption: "Tüm oranlar örnektir. Fark, enflasyon ve faiz yükseldikçe büyür; çift haneli enflasyon dönemlerinde mutlaka Fisher formülünü kullanın."
      },
      after: [
        "Tablonun son iki satırı ilginç bir noktayı gösterir: basit çıkarma negatif reel faizde kaybı da olduğundan büyük gösterir. Yani yöntem yalnızca kazancı abartmaz, sonucu her durumda saptırır. Yüksek enflasyonlu ekonomilerde haber ve yorumlarda geçen \"reel faiz\" rakamlarını okurken hangi yöntemin kullanıldığına dikkat etmek gerekir."
      ]
    },
    {
      h: "Stopaj reel getiriyi nasıl etkiler?",
      p: [
        "Türkiye'de mevduat faizinden gelir vergisi stopajı kesilir ve hesabınıza yatan tutar net faizdir. Reel getiriyi hesaplarken bankanın ilan ettiği brüt oranı değil, stopaj düşülmüş net oranı kullanmanız gerekir. Stopaj oranı vadeye ve döneme göre Cumhurbaşkanı kararlarıyla değişebildiği için güncel oranı Gelir İdaresi Başkanlığı duyurularından ya da bankanızdan öğrenin."
      ],
      formula: "Net nominal faiz = brüt faiz × (1 − stopaj oranı)\nReel faiz = (1 + net nominal) ÷ (1 + enflasyon) − 1",
      ol: [
        "Brüt yıllık faiz %40, stopaj örnek olarak %15 olsun. Net faiz = 0,40 × 0,85 = 0,34 → %34.",
        "Enflasyon %30 ise reel faiz = 1,34 ÷ 1,30 − 1 = %3,08.",
        "Brüt oranla hesaplasaydınız 1,40 ÷ 1,30 − 1 = %7,69 bulurdunuz; stopajı unutmak reel getiriyi iki katından fazla abartır."
      ],
      after: [
        "Vadeli mevduatın net getirisini ve vade sonu tutarını görmek için [[arac:mevduat-faizi-hesapla|Mevduat Faizi Hesaplama]] aracını, mevduat seçerken dikkat edilecek noktalar için [[rehber:mevduat-faizi-nasil-hesaplanir|mevduat faizi rehberini]] inceleyebilirsiniz."
      ]
    },
    {
      h: "Dönem uyumu: aylık faiz, yıllık enflasyon",
      p: [
        "Reel faiz hesabındaki en sık hata, farklı dönemlere ait oranları karşılaştırmaktır. 32 günlük vadeli mevduatın yıllık oranını aylık enflasyonla ya da aylık faizi yıllık enflasyonla karşılaştırmak anlamsız sonuç verir. İki oran da aynı süreyi kapsamalıdır.",
        "Aylık oranı yıllığa çevirmek için bileşik formülü kullanın: yıllık = (1 + aylık)<sup>12</sup> − 1. Aylık net %3 getiri, her ay yeniden değerlendirildiğinde yıllık (1,03)<sup>12</sup> − 1 = %42,58 eder. Aylık enflasyon %2,5 ise yıllık karşılığı (1,025)<sup>12</sup> − 1 = %34,49'dur. Bu durumda yıllık reel faiz 1,4258 ÷ 1,3449 − 1 ≈ %6,0 olur; aynı sonucu aylık bazda 1,03 ÷ 1,025 − 1 = %0,49 bulup yıllığa çevirerek de elde edersiniz.",
        "Nominal ve efektif oran farkını daha ayrıntılı görmek için [[bilgi:nominal-ve-efektif-faiz-farki|nominal ve efektif faiz farkı]] yazısına, bileşik büyümenin mantığı için [[bilgi:bilesik-faiz-nedir|bileşik faiz nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Negatif reel faiz ne anlama gelir?",
      p: [
        "Negatif reel faiz, enflasyonun net nominal getiriden yüksek olduğu durumdur. Bu durumda bankadaki paranızın TL tutarı artsa bile dönem sonunda daha az mal ve hizmet satın alabilirsiniz. Tasarruf sahibi açısından gizli bir kayıp, borçlu açısından ise avantaj anlamına gelir: borcun gerçek yükü zamanla erir.",
        "Merkez bankaları para politikasını değerlendirirken reel faizi önemli bir gösterge olarak izler. Politika faizinin beklenen enflasyonun üzerinde olması \"sıkı\", altında olması \"gevşek\" para politikası olarak yorumlanır. Burada kullanılan enflasyon, geçmiş dönemde gerçekleşen değil, genellikle önümüzdeki 12 ay için beklenen enflasyondur. Geçmiş verilerle yapılan hesaba <strong>gerçekleşen (ex-post)</strong>, beklentiyle yapılana <strong>beklenen (ex-ante)</strong> reel faiz denir.",
        "Bireysel kararlarda da aynı ayrım geçerlidir: Bir yıllık mevduata bugün girerken gelecek yılın enflasyonunu bilemezsiniz; hesabınız bir beklentidir. Yıl sonunda gerçekleşen enflasyonla hesabı tekrar yaparak gerçek sonucu görürsünüz."
      ]
    },
    {
      h: "Hangi enflasyon oranını kullanmalısınız?",
      p: [
        "Türkiye'de resmî tüketici enflasyonu Türkiye İstatistik Kurumu'nun (TÜİK) her ay açıkladığı Tüketici Fiyat Endeksi (TÜFE) ile ölçülür. Yıllık değişim, bu ayın endeksinin geçen yılın aynı ayına göre değişimidir. Bir yılı aşmayan vadeli bir yatırımın gerçekleşen reel getirisini ölçerken yatırımın başladığı ve bittiği ayların endekslerini karşılaştırmak en doğru yöntemdir.",
        "Kişisel harcama sepetiniz resmî sepetten farklıysa (örneğin bütçenizin büyük kısmı kira ya da gıdaysa) hissettiğiniz enflasyon farklı olabilir. Bu durumda hesabı kendi tahmininizle de tekrarlamak yararlıdır. Geçmişteki bir tutarın bugünkü karşılığını ve maaşınızın alım gücü değişimini [[arac:enflasyon-hesapla|Enflasyon ve Alım Gücü Hesaplama]] aracıyla, mantığını da [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısıyla inceleyebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Brüt faizi kullanmak:</strong> Mevduatta stopaj düşülmeden yapılan reel hesap getiriyi olduğundan yüksek gösterir.",
        "<strong>Basit çıkarma:</strong> Çift haneli oranlarda nominal − enflasyon hesabı yüzde birkaç puanlık sapma yaratır.",
        "<strong>Dönem uyumsuzluğu:</strong> Aylık faizi yıllık enflasyonla karşılaştırmak ya da yıllık oranı 12'ye bölerek aylığa çevirmek bileşik etkiyi göz ardı eder.",
        "<strong>Vadeyi yıl saymak:</strong> 92 günlük mevduatın getirisi yıllık değildir; yıllık enflasyonla karşılaştırmadan önce dönem getirisine ya da yıllık bileşiğe çevirin.",
        "<strong>Geçmiş enflasyonu geleceğe taşımak:</strong> Yeni bir yatırım kararında geçen yılın enflasyonu değil, beklenen enflasyon önemlidir; ikisi çok farklı olabilir.",
        "<strong>Kur ve vergi farklarını unutmak:</strong> Döviz veya altın gibi araçlarda reel getiriyi TL enflasyonuyla ölçerken kur değişimi, alış-satış farkı ve varsa vergiler de hesaba girmelidir."
      ]
    }
  ],
  faq: [
    ["Reel faiz nedir?", "Reel faiz, bir yatırımın enflasyondan arındırılmış getirisidir. Nominal faiz paranızın TL olarak ne kadar arttığını gösterirken reel faiz, alım gücünüzün, yani o parayla satın alabileceğiniz mal ve hizmet miktarının ne kadar değiştiğini gösterir."],
    ["Reel faiz nasıl hesaplanır?", "Reel faiz, bir artı nominal faizin bir artı enflasyona bölünüp birin çıkarılmasıyla bulunur. Net %34 faiz ve %30 enflasyonda 1,34 ÷ 1,30 − 1 = 0,0308, yani yaklaşık %3,08 reel getiri elde edilir."],
    ["Fisher denklemi nedir?", "Fisher denklemi, nominal faiz, reel faiz ve enflasyon arasındaki ilişkiyi gösteren formüldür: 1 + nominal = (1 + reel) × (1 + enflasyon). Düşük oranlarda reel faiz yaklaşık olarak nominal faiz eksi enflasyona eşittir."],
    ["Nominal faiz ile reel faiz farkı nedir?", "Nominal faiz bankanın ya da yatırım aracının ilan ettiği orandır ve enflasyonu dikkate almaz. Reel faiz ise aynı getirinin enflasyon etkisi çıkarıldıktan sonraki karşılığıdır ve paranın gerçek değerindeki değişimi ölçer."],
    ["Negatif reel faiz ne anlama gelir?", "Enflasyonun net nominal faizden yüksek olduğu anlamına gelir. Paranızın TL tutarı artsa da dönem sonunda daha az şey satın alabilirsiniz; tasarruf eden kaybeder, borçlunun borcunun gerçek yükü ise azalır."],
    ["Mevduatın enflasyona göre gerçek getirisi nasıl bulunur?", "Önce brüt faizden stopaj düşülerek net faiz bulunur. Ardından net faiz ile aynı döneme ait enflasyon Fisher formülüne konur. Vade sonu tutarını bir artı enflasyona bölerek bugünkü alım gücü karşılığı da hesaplanabilir."],
    ["Stopaj reel getiriyi nasıl etkiler?", "Stopaj, faiz gelirinden kesilen vergidir ve net nominal getiriyi düşürür. Reel hesap brüt oranla yapılırsa getiri olduğundan yüksek çıkar; bu yüzden hesapta her zaman stopaj sonrası net oran kullanılmalıdır."],
    ["Basit çıkarma yöntemi neden yanıltıcıdır?", "Nominal faizden enflasyonu çıkarmak, enflasyonun faiz gelirini de erittiğini hesaba katmaz. Oranlar düşükken fark küçüktür, ama örneğin %50 faiz ve %40 enflasyonda basit yöntem %10, doğru formül ise %7,14 verir."],
    ["Aylık faizle yıllık enflasyon karşılaştırılabilir mi?", "Doğrudan karşılaştırılamaz; iki oranın aynı döneme ait olması gerekir. Aylık faizi bileşik olarak yıllığa çevirip yıllık enflasyonla ya da aylık enflasyonla aylık faizi karşılaştırmak doğru sonuç verir."]
  ],
  tools: ["reel-faiz-hesapla", "enflasyon-hesapla", "mevduat-faizi-hesapla", "bilesik-faiz-hesapla"],
  related: ["nominal-ve-efektif-faiz-farki", "enflasyona-gore-paranin-degeri", "bilesik-faiz-nedir", "72-kurali-nedir"],
  uyari: "yatırım tavsiyesi değildir; örneklerdeki oranlar temsilîdir, güncel oranları bankanızdan ve resmî kaynaklardan öğrenin",
  sources: [
    ["TÜİK – Tüketici Fiyat Endeksi", "https://www.tuik.gov.tr/"],
    ["Türkiye Cumhuriyet Merkez Bankası", "https://www.tcmb.gov.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"]
  ]
};
