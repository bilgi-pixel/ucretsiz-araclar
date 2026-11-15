export default {
  slug: "birikim-hedefine-kac-ayda-ulasilir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Birikim Hesaplama: Hedef Tutara Kaç Ayda Ulaşılır? Aylık Tasarruf Planı",
  pageTitle: "Birikim Hesaplama: Hedef Tutara Kaç Ayda Ulaşılır?",
  description: "Getirisiz birikimde süre = (hedef − mevcut) ÷ aylık tasarruf. Getiri, enflasyon ve aylık katkı formülleri, ev peşinatı ve acil durum fonu örnekleriyle.",
  keywords: ["birikim hesaplama", "ayda ne kadar biriktirmeliyim", "hedef birikim süresi", "tasarruf oranı ne olmalı", "düzenli birikim getirisi", "ev peşinatı biriktirme", "acil durum fonu ne kadar olmalı", "birikim planı"],
  lead: "Birikim hedefinize kaç ayda ulaşacağınızı bulmanın en basit yolu, <strong>hedef tutardan mevcut birikiminizi çıkarıp kalanı aylık ayırabildiğiniz tutara bölmektir</strong>: 300.000 TL hedef, 30.000 TL birikim ve ayda 10.000 TL tasarrufla süre 27 aydır. Biriktirdiğiniz para faiz ya da getiri kazanıyorsa süre kısalır; aynı örnekte aylık %2,5 net getiriyle hedefe 20. ayda ulaşılır. Enflasyon ise hedefin kendisini büyütür. Bu yazıda süre, aylık tutar, tasarruf oranı ve enflasyon etkisi formüllerini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Getirisiz süre (ay) = (hedef − mevcut birikim) ÷ aylık tasarruf; küsurat bir üst aya yuvarlanır.",
    "Gereken aylık tasarruf (getirisiz) = (hedef − mevcut birikim) ÷ ay sayısı.",
    "Getiriyle süre: n = ln[(hedef × r + aylık) ÷ (mevcut × r + aylık)] ÷ ln(1 + r); r aylık net getiri oranıdır.",
    "Tasarruf oranı = aylık birikim ÷ aylık net gelir × 100.",
    "Acil durum fonu için yaygın öneri, 3 ile 6 aylık zorunlu giderdir.",
    "Hedef gelecekteki bir fiyatsa, bugünkü tutarı beklenen enflasyonla büyüterek planlayın."
  ],
  figure: {
    alt: "30.000 TL birikimle başlayıp ayda 10.000 TL eklenen birikimin 300.000 TL hedefe ulaşma süresi: getirisiz 27 ay, aylık yüzde 2,5 net getiriyle 20 ay.",
    caption: "Düz çizgi getirisiz birikimi, eğri aylık %2,5 net getiriyle büyüyen birikimi gösterir. Getiri her ay biriken tutarın üzerine eklendiği için eğri zamanla dikleşir ve hedefe 7 ay erken ulaşır. Getiri oranı örnektir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">300.000 TL hedefe kaç ayda?</text>
  <line x1="80" y1="330" x2="680" y2="330" class="st" fill="none"/>
  <line x1="80" y1="330" x2="80" y2="60" class="st" fill="none"/>
  <line x1="80" y1="86" x2="680" y2="86" class="sa dash" fill="none"/>
  <text x="676" y="78" class="sm end b">Hedef 300.000 TL</text>
  <g class="sm end">
    <text x="72" y="334">0</text><text x="72" y="253">100 bin</text><text x="72" y="172">200 bin</text><text x="72" y="90">300 bin</text>
  </g>
  <g class="sm mid">
    <text x="80" y="350">0</text><text x="200" y="350">6</text><text x="320" y="350">12</text>
    <text x="440" y="350">18</text><text x="560" y="350">24</text><text x="660" y="350">ay</text>
  </g>
  <line x1="80" y1="305.6" x2="620" y2="86.25" class="st sw" fill="none"/>
  <polyline points="80,305.6 140,278.8 200,249.8 260,218.7 320,185.1 380,149 440,110.1 480,82.5" class="sp sw" fill="none"/>
  <circle cx="480" cy="86" r="7" class="p"/>
  <circle cx="620" cy="86" r="7" class="sf sb"/>
  <line x1="480" y1="92" x2="480" y2="330" class="sp dash" fill="none"/>
  <line x1="620" y1="92" x2="620" y2="330" class="st dash" fill="none"/>
  <text x="480" y="318" class="sm mid b p">20. ay</text>
  <text x="620" y="318" class="sm mid b">27. ay</text>
  <rect x="100" y="364" width="18" height="6" class="p"/><text x="126" y="372" class="sm">Aylık %2,5 net getiriyle</text>
  <rect x="380" y="364" width="18" height="6" class="t2"/><text x="406" y="372" class="sm">Getirisiz (yastık altı)</text>
  <text x="360" y="394" class="sm mid t2">Başlangıç 30.000 TL · aylık katkı 10.000 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Hedef tutara kaç ayda ulaşırım?",
      p: [
        "Birikim planının üç değişkeni vardır: ulaşmak istediğiniz <strong>hedef tutar</strong>, bugün elinizde olan <strong>mevcut birikim</strong> ve her ay ayırabildiğiniz <strong>aylık tasarruf</strong>. Paranız getiri kazanmıyorsa hesap tek bir bölmedir. Getiri varsa bileşik faiz devreye girer ve süre kısalır."
      ],
      formula: "Getirisiz süre (ay) = (hedef − mevcut birikim) ÷ aylık tasarruf\nÖrnek: (300.000 − 30.000) ÷ 10.000 = 27 ay",
      after: [
        "Sonuç küsuratlı çıkarsa bir üst aya yuvarlayın: 26,3 ay sonucunda hedefe 27. ayın sonunda ulaşılır. Bu basit formül, paranızı nakit olarak tuttuğunuz ya da getirinin enflasyonu ancak karşıladığı durumlar için iyi bir alt sınırdır.",
        "Kendi rakamlarınızla denemek için [[arac:hedef-birikim-suresi-hesapla|Hedef Birikim Süresi Hesaplama]] aracına hedef, mevcut birikim ve aylık tasarrufu girmeniz yeterli; isterseniz yıllık getiri oranı da ekleyebilirsiniz."
      ]
    },
    {
      h: "Düzenli birikim faizle ne kadar büyür?",
      p: [
        "Biriktirdiğiniz para mevduat, katılım hesabı ya da başka bir araçta getiri kazanıyorsa, her ay hem yeni katkınız hem de önceki birikimin getirisi eklenir. Bu, bileşik büyümedir ve süre uzadıkça etkisi artar. Mantığını [[bilgi:bilesik-faiz-nedir|bileşik faiz]] yazısında ayrıntılı bulabilirsiniz."
      ],
      formula: "Gelecek değer = mevcut × (1 + r)ⁿ + aylık × [(1 + r)ⁿ − 1] ÷ r\nSüre: n = ln[(hedef × r + aylık) ÷ (mevcut × r + aylık)] ÷ ln(1 + r)\nr: aylık net getiri oranı (ör. %2,5 için 0,025), n: ay sayısı",
      ol: [
        "Değerleri yerleştirin: hedef 300.000, mevcut 30.000, aylık 10.000, r = 0,025.",
        "Pay: 300.000 × 0,025 + 10.000 = 17.500. Payda: 30.000 × 0,025 + 10.000 = 10.750.",
        "Oran: 17.500 ÷ 10.750 = 1,6279; doğal logaritması 0,4873.",
        "ln(1,025) = 0,02469. Süre: 0,4873 ÷ 0,02469 = 19,7 ay, yani hedefe 20. ayın sonunda ulaşılır.",
        "Kontrol: 20 ay sonunda birikim yaklaşık 304.600 TL olur; 19. ayda ise yaklaşık 287.400 TL'de kalır."
      ],
      after: [
        "Burada r, vergi kesildikten sonraki <strong>net</strong> aylık getiridir. Mevduat faizinden stopaj kesildiği için brüt oranı kullanmak süreyi olduğundan kısa gösterir. Yıllık bir oranı aylığa çevirirken basitçe 12'ye bölmek küçük bir sapma yaratır; doğrusu (1 + yıllık)<sup>1/12</sup> − 1'dir. Yıl yıl tabloyu görmek için [[arac:birikim-hesapla|Birikim Hesaplama]] ve [[arac:gelecek-deger-hesapla|Gelecek Değer Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Ayda ne kadar biriktirmeliyim?",
      p: [
        "Süre sabitse ve aylık tutarı arıyorsanız formülü tersine çevirirsiniz. Örneğin 30.000 TL birikimi olan biri 300.000 TL'ye 24 ayda ulaşmak istiyor."
      ],
      formula: "Getirisiz: aylık tasarruf = (hedef − mevcut) ÷ ay sayısı\nGetiriyle: aylık = [hedef − mevcut × (1 + r)ⁿ] × r ÷ [(1 + r)ⁿ − 1]",
      table: {
        head: ["Senaryo", "Hesap", "Gereken aylık tasarruf"],
        rows: [
          ["Getirisiz, 24 ay", "270.000 ÷ 24", "11.250 TL"],
          ["Aylık %2,5 net getiri, 24 ay", "[300.000 − 30.000 × 1,025²⁴] × 0,025 ÷ (1,025²⁴ − 1)", "7.596 TL"],
          ["Getirisiz, 36 ay", "270.000 ÷ 36", "7.500 TL"],
          ["Getirisiz, 12 ay", "270.000 ÷ 12", "22.500 TL"]
        ],
        caption: "Getiri oranı örnektir. Getiri, aynı hedef için gereken aylık tutarı belirgin biçimde azaltır; ancak getiri garantili değilse planı getirisiz senaryoya göre de kontrol edin."
      }
    },
    {
      h: "Gelirin yüzde kaçı biriktirilmeli? Tasarruf oranı",
      p: [
        "Tasarruf oranı, aylık net gelirinizin yüzde kaçını biriktirdiğinizi gösterir. Hedef süresini en çok belirleyen değişken budur, çünkü getiri oranından farklı olarak doğrudan sizin kontrolünüzdedir."
      ],
      formula: "Tasarruf oranı (%) = aylık birikim ÷ aylık net gelir × 100\nÖrnek: 10.000 ÷ 50.000 × 100 = %20",
      after: [
        "Herkes için geçerli tek bir oran yoktur; gelir düzeyi, kira ya da kredi yükü ve hane büyüklüğü belirleyicidir. Yaygın bir başlangıç çerçevesi, gelirin %50'sini ihtiyaçlara, %30'unu isteklere ve %20'sini birikime ayıran [[bilgi:50-30-20-butce-kurali|50/30/20 bütçe kuralıdır]]. Gelir dar olduğunda %5–10 ile başlayıp her gelir artışında oranı yükseltmek, birikimi alışkanlığa çevirmenin pratik yoludur.",
        "Kendi oranınızı ve hedeflediğiniz orana ulaşmak için giderlerinizi ne kadar kısmanız gerektiğini [[arac:tasarruf-orani-hesapla|Tasarruf Oranı Hesaplama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Ev peşinatı için ne kadar süre gerekir?",
      p: [
        "Konut kredisinde bankalar genellikle konut değerinin bir kısmını kredilendirir; kalanını peşinat olarak sizin ödemeniz gerekir. Kredilendirme oranı mevzuata, konutun enerji sınıfına ve değerine göre değişebildiği için güncel oranı bankanızdan öğrenin. Hesap mantığı ise aynıdır."
      ],
      ol: [
        "Hedef konutun bugünkü fiyatını belirleyin: örnek olarak 4.000.000 TL.",
        "Peşinat oranını uygulayın: %25 peşinat varsayımıyla 1.000.000 TL. Buna tapu harcı ve masraflar için ayrıca pay ekleyin.",
        "Enflasyonu hesaba katın: konut fiyatları ayda ortalama %2 artarsa 36 ay sonra aynı peşinat 1.000.000 × 1,02³⁶ ≈ 2.039.900 TL olur.",
        "Aylık tutarı bulun: mevcut 200.000 TL birikimle, getirisiz senaryoda 36 ayda (2.039.900 − 200.000) ÷ 36 ≈ 51.100 TL gerekir.",
        "Plan gerçekçi değilse süreyi uzatın, hedef konutu değiştirin ya da birikimin getirisini artırmanın yollarını değerlendirin."
      ],
      after: [
        "Örnek, hedefi bugünkü fiyatla sabitlemenin ne kadar yanıltıcı olabileceğini gösterir: enflasyon hesaba katılmasaydı ayda yalnızca 22.200 TL yeter gibi görünürdü. Tapu masrafları için [[rehber:tapu-harci-ve-emlak-masraflari|tapu harcı rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Acil durum fonu ne kadar olmalı?",
      p: [
        "Acil durum fonu, iş kaybı, sağlık gideri ya da beklenmedik bir onarım gibi durumlarda borçlanmadan ayakta kalmanızı sağlayan birikimdir. Yaygın öneri, <strong>3 ile 6 aylık zorunlu gideri</strong> karşılayacak bir tutardır. Zorunlu giderler kira ya da kredi taksiti, faturalar, gıda, ulaşım ve sigorta gibi kısılması zor kalemlerdir; eğlence ve isteğe bağlı harcamalar dahil edilmez.",
        "Geliri düzensiz olan serbest çalışanlar ve tek gelirli haneler için 6 ayın üzerine çıkmak daha güvenlidir. Bu fonun hızlı erişilebilir ve değeri dalgalanmayan bir yerde tutulması önerilir. Uzun vadeli hedeflerden önce acil durum fonunu tamamlamak, diğer birikimlerin beklenmedik bir harcama nedeniyle bozulmasını önler."
      ],
      table: {
        head: ["Aylık zorunlu gider", "3 aylık fon", "6 aylık fon"],
        rows: [
          ["25.000 TL", "75.000 TL", "150.000 TL"],
          ["35.000 TL", "105.000 TL", "210.000 TL"],
          ["50.000 TL", "150.000 TL", "300.000 TL"]
        ]
      }
    },
    {
      h: "Enflasyon birikimi nasıl etkiler?",
      p: [
        "Enflasyon birikimi iki yoldan etkiler. Birincisi, getirisiz tutulan paranın alım gücü her ay azalır. İkincisi, hedeflediğiniz şeyin fiyatı artar. Bu yüzden uzun vadeli planlarda nominal getiriye değil <strong>reel getiriye</strong> bakmak gerekir: reel getiri = (1 + nominal getiri) ÷ (1 + enflasyon) − 1.",
        "Aylık %2,5 net getiri ve aylık %2 enflasyonda reel getiri yaklaşık %0,49'dur. Bu, paranızın alım gücünün yavaşça arttığı anlamına gelir. Getiri enflasyonun altındaysa reel getiri eksidir ve birikiminiz büyüse bile satın alabileceğiniz miktar azalır. Paranın zaman içindeki değer kaybını görmek için [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Süreyi kısaltan üç kaldıraç: katkı, başlangıç ve getiri",
      p: [
        "Hedef süresini değiştiren üç değişkenin etkisi eşit değildir. Aynı 300.000 TL hedefi ve 30.000 TL başlangıcı koruyup getirisiz senaryoda aylık katkıyı 10.000 TL'den 12.500 TL'ye çıkarmak süreyi 27 aydan 22 aya indirir. Başlangıç birikimini 30.000 TL'den 80.000 TL'ye çıkarmak ise süreyi 22 aya düşürür; yani tek seferlik bir ikramiye ya da prim, aylık katkıdaki kalıcı bir artış kadar etkili olabilir.",
        "Getirinin etkisi ise süre uzadıkça büyür. Kısa vadeli, örneğin 6–12 aylık hedeflerde süreyi asıl belirleyen aylık katkıdır; birkaç yıllık hedeflerde ise getiri farkı belirleyici hale gelir. Bu yüzden kısa vadeli hedefler için paranın değerinin dalgalanmaması, uzun vadeli hedefler için ise getirinin enflasyonu geçmesi öncelikli olmalıdır."
      ],
      table: {
        head: ["Değişiklik (getirisiz senaryo)", "Yeni hesap", "Süre"],
        rows: [
          ["Başlangıç durumu", "(300.000 − 30.000) ÷ 10.000", "27 ay"],
          ["Aylık katkı 12.500 TL", "270.000 ÷ 12.500", "21,6 → 22 ay"],
          ["Başlangıç 80.000 TL", "220.000 ÷ 10.000", "22 ay"],
          ["Aylık katkı 15.000 TL", "270.000 ÷ 15.000", "18 ay"]
        ]
      },
      after: [
        "Planınızı kurarken önce [[arac:tasarruf-orani-hesapla|Tasarruf Oranı Hesaplama]] ile gerçekçi aylık katkıyı bulun, ardından [[arac:hedef-birikim-suresi-hesapla|Hedef Birikim Süresi Hesaplama]] aracında farklı katkı ve getiri senaryolarını deneyin. Gelir arttıkça katkıyı güncellemeyi bir takvim hatırlatıcısına bağlamak planın kendiliğinden hızlanmasını sağlar."
      ]
    },
    {
      h: "Birikim planında sık yapılan hatalar",
      ul: [
        "<strong>Hedefi bugünkü fiyatla sabitlemek:</strong> Birkaç yıllık hedeflerde fiyat artışını hesaba katın.",
        "<strong>Brüt getiriyi kullanmak:</strong> Stopaj ve masraflar düşülmüş net getiriyle hesap yapın.",
        "<strong>Yıllık oranı 12'ye bölüp bileşik kullanmak:</strong> Bu, gerçek yıllık getiriyi abartır; aylık oranı doğru çevirin.",
        "<strong>Acil durum fonunu atlamak:</strong> Fon olmadan ilk beklenmedik gider uzun vadeli birikimi bozar.",
        "<strong>Gelir arttığında oranı sabit tutmak:</strong> Zamlarla birlikte aylık katkıyı artırmak hedef süresini belirgin biçimde kısaltır."
      ]
    }
  ],
  faq: [
    ["Hedef tutara kaç ayda ulaşırım?", "Getiri yoksa hedef tutardan mevcut birikimi çıkarıp kalanı aylık tasarrufa bölün. 300.000 TL hedef, 30.000 TL birikim ve ayda 10.000 TL ile hedefe 27 ayda ulaşırsınız; getiri varsa süre kısalır."],
    ["Ayda ne kadar biriktirmeliyim?", "Hedef ile mevcut birikim arasındaki farkı istediğiniz ay sayısına bölün. 270.000 TL fark için 24 ayda ayda 11.250 TL gerekir; aylık yüzde 2,5 net getiriyle bu tutar yaklaşık 7.600 TL'ye iner."],
    ["Gelirin yüzde kaçı biriktirilmeli?", "Herkes için tek bir oran yoktur, ancak 50/30/20 kuralı gelirin yüzde 20'sini birikime ayırmayı önerir. Gelir dar olduğunda yüzde 5–10 ile başlayıp her gelir artışında oranı yükseltmek pratik bir yoldur."],
    ["Düzenli birikim faizle ne kadar büyür?", "Her ay eklenen katkı ve önceki birikimin getirisi birlikte büyür. Ayda 10.000 TL ile 30.000 TL'den başlayan birikim, aylık yüzde 2,5 net getiriyle 24 ayda yaklaşık 377.750 TL'ye ulaşır."],
    ["Ev peşinatı için ne kadar süre gerekir?", "Peşinat tutarını, beklenen fiyat artışıyla büyütüp mevcut birikimi çıkarın ve aylık tasarrufa bölün. Konut fiyatları arttığı sürece hedef de büyüyeceği için planı her yıl güncellemek gerekir."],
    ["Acil durum fonu ne kadar olmalı?", "Yaygın öneri üç ile altı aylık zorunlu gider kadardır. Aylık zorunlu gideri 35.000 TL olan bir hane için bu 105.000 ile 210.000 TL arasında bir fon anlamına gelir; düzensiz gelirlilerde daha fazlası önerilir."],
    ["Enflasyon birikimi nasıl etkiler?", "Enflasyon hem getirisiz paranın alım gücünü azaltır hem de hedeflenen ürünün fiyatını artırır. Bu yüzden planlamada bir artı nominal getirinin bir artı enflasyona bölümüyle bulunan reel getiriye bakılmalıdır."],
    ["Birikimimi hangi sırayla planlamalıyım?", "Önce yüksek faizli borçları kapatmak, ardından üç ile altı aylık acil durum fonunu tamamlamak ve sonra ev peşinatı gibi uzun vadeli hedeflere geçmek yaygın ve güvenli bir sıralamadır; her adım bir sonrakini korur."],
    ["Tasarruf oranı nasıl hesaplanır?", "Aylık birikim tutarı aylık net gelire bölünür ve 100 ile çarpılır. Aylık 50.000 TL net gelirin 10.000 TL'sini biriktiren birinin tasarruf oranı yüzde 20'dir."]
  ],
  tools: ["hedef-birikim-suresi-hesapla", "birikim-hesapla", "tasarruf-orani-hesapla", "gelecek-deger-hesapla"],
  related: ["50-30-20-butce-kurali", "bilesik-faiz-nedir", "enflasyona-gore-paranin-degeri", "72-kurali-nedir"],
  sources: [
    ["Türkiye Cumhuriyet Merkez Bankası", "https://www.tcmb.gov.tr/"],
    ["TÜİK – Tüketici Fiyat Endeksi", "https://www.tuik.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; getiri oranları örnektir ve garanti edilmez"
};
