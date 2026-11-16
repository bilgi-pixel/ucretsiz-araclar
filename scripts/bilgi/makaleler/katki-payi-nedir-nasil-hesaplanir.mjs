export default {
  slug: "katki-payi-nedir-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Katkı Payı Nedir? Birim Katkı Payı ve Katkı Payı Oranı Hesaplama",
  pageTitle: "Katkı Payı Nedir? Birim Katkı Payı ve Oranı Nasıl Hesaplanır",
  description: "Katkı payı = satış fiyatı − birim değişken maliyet. Katkı payı oranı, başabaş noktasında kullanımı, kâr marjıyla farkı ve çok ürünlü işletmede ağırlıklı hesap.",
  keywords: ["katkı payı nedir", "katkı payı hesaplama", "birim katkı payı", "katkı payı oranı", "katkı payı formülü", "değişken maliyet nedir", "katkı marjı", "ağırlıklı katkı payı"],
  lead: "Katkı payı, bir ürünün <strong>satış fiyatından birim değişken maliyetin çıkarılmasıyla</strong> kalan tutardır ve o ürünün sabit giderleri karşılamaya, sonra kâra ne kadar katkı yaptığını gösterir. 250 TL'ye satılan ve tanesi 150 TL değişken maliyetle üretilen bir ürünün birim katkı payı 100 TL, katkı payı oranı %40'tır. Bu sayfada formülleri, sabit ve değişken maliyet ayrımını, başabaş noktasında kullanımı, kâr marjıyla farkı ve çok ürünlü işletmeler için ağırlıklı katkı payını örneklerle bulacaksınız.",
  kisaCevap: [
    "Birim katkı payı = birim satış fiyatı − birim değişken maliyet.",
    "Katkı payı oranı = birim katkı payı ÷ birim satış fiyatı × 100.",
    "Toplam katkı payı = birim katkı payı × satış adedi; toplam katkı − sabit giderler = faaliyet kârı.",
    "Başabaş adedi = sabit giderler ÷ birim katkı payı; başabaş cirosu = sabit giderler ÷ katkı payı oranı.",
    "Negatif katkı payı, her satışın zararı büyüttüğü anlamına gelir.",
    "Çok ürünlü işletmede satış karmasına göre ağırlıklı ortalama katkı payı kullanılır."
  ],
  figure: {
    alt: "250 TL satış fiyatının 150 TL değişken maliyet ve 100 TL katkı payına ayrılması; altta 60.000 TL sabit giderin 600 adette karşılandığı başabaş noktası ve 1.000 adette 40.000 TL kâr.",
    caption: "Üst çubuk tek bir ürünün fiyatını ikiye böler. Alt kısım, her satılan ürünün 100 TL'lik katkısının önce 60.000 TL sabit gideri doldurduğunu, 600. üründen sonra kâra dönüştüğünü gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Birim katkı payı: 250 TL'lik ürün</text>
  <rect x="40" y="52" width="384" height="58" rx="6" class="sf sb"/>
  <text x="232" y="78" class="b mid">Değişken maliyet 150 TL</text>
  <text x="232" y="98" class="sm mid t2">hammadde, ambalaj, komisyon, kargo</text>
  <rect x="424" y="52" width="256" height="58" rx="6" class="oks"/>
  <text x="552" y="78" class="b mid ok">Katkı payı 100 TL</text>
  <text x="552" y="98" class="sm mid">oran %40</text>
  <text x="40" y="148" class="b">Sabit gider 60.000 TL / ay · birim katkı 100 TL</text>
  <line x1="60" y1="330" x2="680" y2="330" class="st" fill="none"/>
  <line x1="60" y1="190" x2="60" y2="330" class="st" fill="none"/>
  <line x1="60" y1="250" x2="680" y2="250" class="sdg dash" fill="none"/>
  <text x="66" y="244" class="sm dg">sabit gider çizgisi 60.000 TL</text>
  <polyline points="60,330 432,250 680,197" class="sp sw" fill="none"/>
  <circle cx="432" cy="250" r="7" class="p"/>
  <text x="432" y="280" class="sm b mid">Başabaş: 600 adet</text>
  <text x="600" y="190" class="sm b ok end">1.000 adet: katkı 100.000 TL</text>
  <text x="60" y="350" class="sm mid">0</text>
  <text x="432" y="350" class="sm mid">600</text>
  <text x="680" y="350" class="sm mid">1.000 adet</text>
  <rect x="40" y="364" width="640" height="42" rx="8" class="sf sb"/>
  <rect x="40" y="364" width="8" height="42" class="p"/>
  <text x="60" y="390" class="sm">Kâr = toplam katkı − sabit gider = 100.000 − 60.000 = 40.000 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Katkı payı nedir?",
      p: [
        "Bir işletmenin giderleri iki türlüdür. Bir kısmı satılan her ürünle birlikte artar: hammadde, ambalaj, pazaryeri komisyonu, kargo. Diğer kısmı satış olsa da olmasa da her ay ödenir: kira, sabit maaşlar, muhasebe ücreti, yazılım abonelikleri. Katkı payı, bir ürünün fiyatından o ürüne özgü değişken maliyetler düşüldükten sonra kalan tutardır.",
        "Bu kalan tutar henüz kâr değildir; önce sabit giderleri karşılamak için kullanılır. Sabit giderler tamamen karşılandıktan sonra her yeni satışın katkı payı doğrudan kâra eklenir. Katkı payı bu yüzden \"bu ürün, işletmenin giderlerine ve kârına ne kadar katkı yapıyor?\" sorusunun cevabıdır. Maliyet muhasebesinde \"katkı marjı\" adıyla da geçer."
      ]
    },
    {
      h: "Birim katkı payı ve katkı payı oranı formülleri",
      formula: "Birim katkı payı = birim satış fiyatı − birim değişken maliyet\nKatkı payı oranı (%) = birim katkı payı ÷ birim satış fiyatı × 100\nToplam katkı payı = birim katkı payı × satış adedi\nFaaliyet kârı = toplam katkı payı − toplam sabit giderler",
      p: [
        "Fiyat ve maliyetler KDV hariç alınmalıdır. KDV, satıcının kazancı değil devlet adına tahsil ettiği bir vergi olduğu için hesaba KDV dahil fiyatla girmek katkı payını olduğundan yüksek gösterir. Aynı şekilde indirimli satışlarda gerçek satış fiyatı kullanılmalıdır."
      ],
      after: [
        "Katkı payı oranı, ciroya bakarak kârlılığı tahmin etmeyi kolaylaştırır. %40 oranlı bir ürün grubunda 100.000 TL'lik ek satış, sabit giderler değişmiyorsa 40.000 TL ek katkı yaratır. Hesabı farklı fiyat ve maliyetlerle denemek için [[arac:katki-payi-hesapla|Katkı Payı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 250 TL'lik ürün",
      ol: [
        "Ürünün KDV hariç satış fiyatı 250 TL olsun.",
        "Değişken maliyetler: hammadde 95 TL, ambalaj 10 TL, pazaryeri komisyonu 25 TL, kargo 20 TL; toplam 150 TL.",
        "Birim katkı payı: 250 − 150 = 100 TL.",
        "Katkı payı oranı: 100 ÷ 250 × 100 = %40.",
        "Ayda 1.000 adet satılırsa toplam katkı 1.000 × 100 = 100.000 TL olur.",
        "Aylık sabit giderler 60.000 TL ise faaliyet kârı 100.000 − 60.000 = 40.000 TL'dir."
      ],
      after: [
        "Aynı ürün için fiyat 230 TL'ye düşürülürse katkı payı 80 TL'ye iner. Bu durumda aynı 40.000 TL kârı korumak için ayda 1.250 adet satmak gerekir: (60.000 + 40.000) ÷ 80 = 1.250. İndirimin satış adedini yüzde 25 artırması gerekir; aksi halde kâr azalır. Bu, fiyat kararlarında katkı payına bakmanın neden önemli olduğunu gösterir."
      ]
    },
    {
      h: "Sabit ve değişken maliyet nasıl ayrılır?",
      p: [
        "Bir gider kalemini sınıflandırmanın en basit yolu şu soruyu sormaktır: \"Bu ay hiç satış yapmasam bu gider yine olur mu?\" Cevap evetse sabit, hayırsa değişken maliyettir. Bazı giderler ise karmadır: elektrik faturasının bir kısmı üretimle artar, bir kısmı sabit kalır. Bu tür kalemleri iki parçaya ayırmak hesabı daha doğru yapar."
      ],
      table: {
        head: ["Gider", "Tür", "Açıklama"],
        rows: [
          ["Hammadde ve malzeme", "Değişken", "Her üründe tüketilir"],
          ["Ambalaj ve etiket", "Değişken", "Ürün başına kullanılır"],
          ["Pazaryeri komisyonu", "Değişken", "Satış tutarının yüzdesi"],
          ["Kargo (alıcıya ücretsizse)", "Değişken", "Gönderi başına"],
          ["Ödeme sistemi kesintisi", "Değişken", "İşlem başına"],
          ["Kira", "Sabit", "Satıştan bağımsız"],
          ["Sabit maaşlar", "Sabit", "Üretim miktarından bağımsız"],
          ["Muhasebe, yazılım abonelikleri", "Sabit", "Aylık sabit ücret"],
          ["Elektrik, doğalgaz", "Karma", "Bir kısmı üretime bağlı"],
          ["Satış primi", "Değişken", "Satışla orantılı"]
        ]
      },
      after: [
        "Birim başına değişken maliyeti bulmak için [[arac:birim-maliyet-hesapla|Birim Maliyet Hesaplama]] aracından yararlanabilirsiniz. Pazaryeri komisyonu gibi yüzdesel kesintiler fiyat değiştikçe değiştiği için her fiyat senaryosunda yeniden hesaplanmalıdır; ayrıntı için [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu nasıl hesaplanır]] yazısına bakın."
      ]
    },
    {
      h: "Katkı payı başabaş noktasında nasıl kullanılır?",
      p: [
        "Başabaş noktası, toplam katkı payının sabit giderlere tam eşit olduğu, yani ne kâr ne zarar edilen satış düzeyidir. Katkı payı bilindiğinde başabaş noktası tek bölmeyle bulunur. Bu hesap, yeni bir ürünün ya da yeni bir dükkânın en az ne kadar satması gerektiğini görmenin en hızlı yoludur."
      ],
      formula: "Başabaş adedi = sabit giderler ÷ birim katkı payı\nBaşabaş cirosu = sabit giderler ÷ katkı payı oranı\nHedef kâr için adet = (sabit giderler + hedef kâr) ÷ birim katkı payı",
      after: [
        "Örnekte 60.000 ÷ 100 = 600 adet ya da 60.000 ÷ 0,40 = 150.000 TL ciro başabaş noktasıdır. Ayda 600 adetten az satış zarar, fazlası kâr demektir. Başabaş analizinin ayrıntısı için [[bilgi:basabas-noktasi-nedir|başabaş noktası nedir]] yazısına, hesap için [[arac:basabas-noktasi-hesapla|Başabaş Noktası Hesaplama]] aracına bakabilirsiniz."
      ]
    },
    {
      h: "Katkı payı ile kâr marjı arasındaki fark",
      p: [
        "İki kavram da \"fiyatın ne kadarı bize kalıyor\" sorusuna cevap verir, ama farklı giderleri hesaba katar. Katkı payı yalnızca değişken maliyetleri düşer. Kâr marjı ise türüne göre ürün maliyetini (brüt kâr marjı) ya da tüm giderleri (net kâr marjı) düşer. Bu yüzden katkı payı oranı genellikle net kâr marjından yüksektir."
      ],
      table: {
        head: ["Ölçü", "Neyi düşer?", "Örnekteki değer", "Ne için kullanılır?"],
        rows: [
          ["Katkı payı oranı", "Değişken maliyetler", "%40", "Fiyat, kampanya ve ürün kararları"],
          ["Brüt kâr marjı", "Satılan malın maliyeti", "Ürün maliyet yapısına bağlı", "Ürün kârlılığını kıyaslama"],
          ["Net kâr marjı", "Tüm giderler", "40.000 ÷ 250.000 = %16", "İşletmenin genel kârlılığı"]
        ]
      },
      after: [
        "Kâr marjı ve kâr payı (markup) farkı için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısını, hesap için [[arac:kar-marji-hesapla|Kâr Marjı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Negatif katkı payı ne anlama gelir?",
      p: [
        "Satış fiyatı birim değişken maliyetin altındaysa katkı payı negatiftir. Bu durumda her satış, sabit giderlere katkı yapmak bir yana, zararı doğrudan büyütür: 100 TL'ye mal olan bir ürünü 90 TL'ye satan işletme, sattığı her üründe sabit giderlerden önce 10 TL kaybeder. Satış arttıkça zarar da artar.",
        "Negatif katkı payı genellikle gözden kaçan değişken maliyetlerden kaynaklanır: ücretsiz kargo, iade oranı, kampanya indirimleri ve komisyonlar birlikte hesaplanınca kârlı görünen ürün zarar ettirebilir. Stok eritme ya da müşteri kazanma amaçlı kısa süreli bilinçli kampanyalar dışında negatif katkı payıyla satış sürdürülebilir değildir."
      ]
    },
    {
      h: "Çok ürünlü işletmede ağırlıklı katkı payı",
      p: [
        "Birden çok ürün satan bir işletmede tek bir başabaş adedi hesaplamak için ürünlerin satış karmasındaki paylarına göre ağırlıklı ortalama katkı payı kullanılır. Karma değişirse ortalama da değişir; bu yüzden hesap mevcut satış dağılımına göre yapılmalıdır."
      ],
      table: {
        head: ["Ürün", "Fiyat", "Değişken maliyet", "Birim katkı", "Satış payı", "Ağırlıklı katkı"],
        rows: [
          ["A", "250 TL", "150 TL", "100 TL", "%60", "60 TL"],
          ["B", "400 TL", "320 TL", "80 TL", "%40", "32 TL"],
          ["Toplam", "-", "-", "-", "%100", "92 TL"]
        ],
        caption: "Ağırlıklı katkı payı, her ürünün birim katkısının satış adedindeki payıyla çarpılıp toplanmasıyla bulunur."
      },
      after: [
        "Sabit giderler 60.000 TL ise başabaş noktası 60.000 ÷ 92 ≈ 652,2, yani yaklaşık 653 birimdir; bunun %60'ı (yaklaşık 392 adet) A, %40'ı (yaklaşık 261 adet) B ürününden oluşur. B ürününün fiyatı yüksek olsa da birim katkısı A'dan düşüktür; satışlar B'ye kaydıkça başabaş noktası yükselir. Ürün bazında katkı payı oranlarını karşılaştırmak, hangi ürünün öne çıkarılması gerektiğini gösterir."
      ]
    },
    {
      h: "Katkı payıyla hangi kararlar verilir?",
      p: [
        "Katkı payı en çok kısa vadeli kararlarda işe yarar, çünkü bu kararlarda sabit giderler değişmez. Bir toptancı 500 adetlik ek sipariş için 200 TL birim fiyat teklif ediyorsa ve atıl kapasiteniz varsa, bakmanız gereken şey birim değişken maliyetin bu fiyatın altında olup olmadığıdır. 150 TL değişken maliyetle her ürün 50 TL katkı, toplamda 25.000 TL ek kâr getirir; kira ve maaşlar zaten ödenmektedir.",
        "Aynı mantık ürün gamı kararlarında da kullanılır. Bir ürünü listeden çıkarmadan önce yalnızca net kârına değil katkı payına bakın: sabit gider payı yüklendiği için zarar ediyor görünen bir ürün, pozitif katkı payı varsa sabit giderlerin bir kısmını karşılıyordur. Ürünü çıkarırsanız o katkı da kaybolur ve sabit giderler kalan ürünlere biner."
      ],
      ul: [
        "Ek sipariş kabulü: teklif fiyatı birim değişken maliyetin üzerindeyse ve kapasite varsa genellikle kârlıdır.",
        "Kampanya tasarımı: indirimden sonra katkı payının ne kadar kaldığını önceden hesaplayın.",
        "Reklam bütçesi: bir satışın getirdiği katkı payı, o satışı kazanmak için harcanabilecek en yüksek tutardır.",
        "Ürün önceliği: kısıtlı raf, depo ya da üretim kapasitesinde katkı payı oranı yüksek ürünlere öncelik verin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>KDV dahil fiyatla hesaplamak:</strong> Katkı payı olduğundan yüksek görünür.",
        "<strong>Gizli değişken maliyetleri unutmak:</strong> Komisyon, ödeme kesintisi, kargo ve iadeler de değişkendir.",
        "<strong>Sabit giderleri ürünlere dağıtıp katkı payı sanmak:</strong> Katkı payı sabit gider payı içermez.",
        "<strong>Tek ürünün oranını tüm işletmeye uygulamak:</strong> Karma değiştikçe ortalama değişir.",
        "<strong>İndirimin etkisini adetle telafi edilebilir sanmak:</strong> Küçük fiyat indirimi bile gereken satış adedini büyük ölçüde artırabilir."
      ]
    }
  ],
  faq: [
    ["Katkı payı nedir?", "Katkı payı, bir ürünün satış fiyatından birim değişken maliyetinin çıkarılmasıyla kalan tutardır. Bu tutar önce sabit giderleri karşılar, sabit giderler karşılandıktan sonra ise doğrudan kâra eklenir."],
    ["Birim katkı payı nasıl hesaplanır?", "KDV hariç birim satış fiyatından ürün başına değişken maliyetler toplamı çıkarılır. 250 TL'ye satılan ve 150 TL değişken maliyetli bir ürünün birim katkı payı 100 TL'dir."],
    ["Katkı payı oranı nasıl bulunur?", "Birim katkı payı birim satış fiyatına bölünüp 100 ile çarpılır. 100 TL katkı payı ve 250 TL fiyatla oran %40'tır; yani her 100 TL'lik satış 40 TL katkı yaratır."],
    ["Katkı payı ile kâr marjı arasındaki fark nedir?", "Katkı payı yalnızca değişken maliyetleri düşer; net kâr marjı ise sabit giderler dahil tüm giderleri düşer. Bu yüzden katkı payı oranı genellikle net kâr marjından yüksek çıkar."],
    ["Sabit ve değişken maliyet nasıl ayrılır?", "Hiç satış yapılmasa da ödenecek giderler sabit, satışla birlikte artan giderler değişkendir. Kira ve sabit maaş sabit; hammadde, ambalaj, komisyon ve kargo değişkendir. Elektrik gibi kalemler karma olabilir."],
    ["Katkı payı başabaş noktasında nasıl kullanılır?", "Başabaş adedi sabit giderlerin birim katkı payına bölünmesiyle bulunur. 60.000 TL sabit gider ve 100 TL birim katkıyla başabaş noktası 600 adettir; ciro olarak 150.000 TL eder."],
    ["Negatif katkı payı ne anlama gelir?", "Satış fiyatı değişken maliyetin altında demektir. Bu durumda her satış zararı büyütür ve satış arttıkça kayıp da artar; kısa süreli bilinçli kampanyalar dışında sürdürülebilir değildir."],
    ["Ek sipariş kabul ederken katkı payına neden bakılır?", "Atıl kapasite varken kira ve maaş gibi sabit giderler değişmez. Teklif edilen fiyat birim değişken maliyetin üzerindeyse her ürün pozitif katkı yaratır ve ek sipariş toplam kârı artırır."],
    ["Çok ürünlü işletmede ağırlıklı katkı payı nasıl hesaplanır?", "Her ürünün birim katkı payı satış adedindeki payıyla çarpılır ve sonuçlar toplanır. Bu ağırlıklı ortalama, sabit giderlere bölünerek işletmenin toplam başabaş birim sayısı bulunur."]
  ],
  tools: ["katki-payi-hesapla", "basabas-noktasi-hesapla", "kar-marji-hesapla", "birim-maliyet-hesapla"],
  related: ["basabas-noktasi-nedir", "kar-marji-nasil-hesaplanir", "pazaryeri-komisyonu-nasil-hesaplanir", "favok-nedir-nasil-hesaplanir"]
};
