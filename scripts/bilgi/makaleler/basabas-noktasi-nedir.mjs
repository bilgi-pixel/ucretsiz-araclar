export default {
  slug: "basabas-noktasi-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Başabaş Noktası Nedir, Nasıl Hesaplanır? Formül ve İşletme Örneği",
  pageTitle: "Başabaş Noktası Nedir? Formül, Katkı Payı ve Kafe Örneği",
  description: "Başabaş noktası, gelirlerin tüm giderleri tam karşıladığı satış miktarıdır: sabit giderler ÷ (birim fiyat − birim değişken maliyet). Katkı payı, grafik ve kafe örneği.",
  keywords: ["başabaş noktası", "başabaş noktası formülü", "başabaş analizi", "sabit gider değişken gider", "katkı payı", "kaç ürün satmalıyım", "güvenlik marjı", "başabaş grafiği"],
  lead: "Başabaş noktası, bir işletmenin ne kâr ne zarar ettiği, yani toplam gelirin toplam gideri tam olarak karşıladığı satış miktarıdır. Hesabı basittir: <strong>sabit giderler ÷ (birim satış fiyatı − birim değişken maliyet)</strong>. Aylık sabit gideri 90.000 TL olan, ürününü 120 TL'ye satıp her satışta 40 TL değişken maliyet üstlenen bir işletme, ayda 1.125 adet satınca başa baş gelir. Bu sayfada formülü, katkı payı kavramını, grafiğin okunuşunu, hedef kâr hesabını ve fiyat değişikliklerinin etkisini bir kafe örneğiyle anlatıyoruz.",
  kisaCevap: [
    "Başabaş adedi = sabit giderler ÷ birim katkı payı.",
    "Birim katkı payı = birim satış fiyatı − birim değişken maliyet.",
    "Başabaş cirosu = sabit giderler ÷ katkı payı oranı (katkı payı ÷ satış fiyatı).",
    "Hedef kâr için gereken adet = (sabit giderler + hedef kâr) ÷ birim katkı payı.",
    "Güvenlik marjı = (beklenen satış − başabaş satışı) ÷ beklenen satış; satışların ne kadar düşebileceğini gösterir.",
    "Fiyat artışı ya da değişken maliyet düşüşü katkı payını büyütür ve başabaş noktasını aşağı çeker."
  ],
  figure: {
    alt: "Başabaş grafiği: yatay eksende aylık satış adedi, dikey eksende TL. Yatay sabit gider çizgisi 90.000 TL, toplam maliyet çizgisi 90.000 TL'den başlayıp yükseliyor, gelir çizgisi sıfırdan başlıyor. İki çizgi 1.125 adet ve 135.000 TL'de kesişiyor; solu zarar, sağı kâr bölgesi.",
    caption: "Gelir çizgisi toplam maliyet çizgisini kestiği noktada işletme başa baş gelir. Bu noktanın solunda her satış zararı azaltır, sağında her satış birim katkı payı kadar kâr ekler. Tutarlar örnektir.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Başabaş grafiği (örnek kafe, aylık)</text>
  <line x1="80" y1="360" x2="660" y2="360" class="st" fill="none"/>
  <line x1="80" y1="360" x2="80" y2="70" class="st" fill="none"/>
  <polygon points="80,360 395,211 80,261" class="dgs"/>
  <polygon points="395,211 640,96 640,173" class="oks"/>
  <line x1="80" y1="261" x2="640" y2="261" class="sb dash" fill="none"/>
  <line x1="80" y1="261" x2="640" y2="173" class="sdg sw" fill="none"/>
  <line x1="80" y1="360" x2="640" y2="96" class="sok sw" fill="none"/>
  <circle cx="395" cy="211" r="8" class="p"/>
  <line x1="395" y1="219" x2="395" y2="360" class="sp dash" fill="none"/>
  <text x="395" y="380" class="sm mid b p">1.125 adet</text>
  <text x="72" y="265" class="sm end">90.000</text>
  <text x="72" y="215" class="sm end p">135.000</text>
  <text x="72" y="100" class="sm end">240.000</text>
  <text x="80" y="380" class="sm mid">0</text><text x="640" y="380" class="sm mid">2.000</text>
  <text x="360" y="404" class="sm mid mu">Aylık satış adedi</text>
  <text x="404" y="200" class="sm b p">Başabaş noktası</text>
  <text x="560" y="88" class="sm b ok end">Gelir (120 TL × adet)</text>
  <text x="636" y="194" class="sm b dg end">Toplam maliyet</text>
  <text x="648" y="266" class="sm mu">Sabit gider</text>
  <text x="180" y="300" class="b dg">Zarar</text>
  <text x="560" y="150" class="b ok">Kâr</text>
</svg>`
  },
  sections: [
    {
      h: "Başabaş noktası nedir, neden önemlidir?",
      p: [
        "Bir işletmenin giderleri iki türlüdür: satış yapsanız da yapmasanız da ödediğiniz <strong>sabit giderler</strong> ve sattığınız her birimle birlikte artan <strong>değişken giderler</strong>. Başabaş noktası, satışlardan elde edilen gelirin bu iki gider türünün toplamına tam olarak eşit olduğu seviyedir. Bu noktanın altında işletme zarar eder, üstünde kâra geçer.",
        "Başabaş analizi yeni bir iş kurmadan önce \"bu iş tutar mı?\" sorusuna, mevcut bir işte ise \"en az ne kadar satmalıyım?\" sorusuna somut bir rakamla cevap verir. KOSGEB başvuruları ve banka kredi dosyaları için hazırlanan iş planlarında da başabaş hesabı temel tablolardan biridir. Fiyat değişikliği, yeni personel ya da kira artışı gibi kararların etkisini önceden görmeyi sağlar."
      ]
    },
    {
      h: "Sabit ve değişken gider nasıl ayrılır?",
      p: [
        "Doğru bir başabaş hesabı, giderlerin doğru sınıflandırılmasıyla başlar. Ölçüt basittir: o ay hiç satış yapmasaydınız bu gideri yine öder miydiniz? Cevap evetse sabit, hayırsa değişkendir."
      ],
      table: {
        head: ["Gider", "Tür", "Not"],
        rows: [
          ["Kira, aidat", "Sabit", "Satış miktarından bağımsız"],
          ["Personel maaşları ve SGK primleri", "Sabit", "Saatlik ya da prim bazlı ödeme varsa bir kısmı değişkendir"],
          ["Muhasebe, yazılım abonelikleri, sigorta", "Sabit", "Aylık sabit tutarlar"],
          ["Kredi taksiti faizi, amortisman", "Sabit", "Yatırımın aylık payı"],
          ["Hammadde, alış maliyeti, ambalaj", "Değişken", "Her birim için harcanır"],
          ["Kargo, pazaryeri ve ödeme komisyonu", "Değişken", "Satışla birlikte oluşur"],
          ["Elektrik, doğalgaz", "Yarı değişken", "Sabit bir taban ve üretimle artan kısım"]
        ],
        caption: "Yarı değişken giderleri ikiye ayırın: üretim olmasa da ödenen kısmı sabit, üretimle artan kısmı birim başına değişken gidere ekleyin."
      },
      after: [
        "Birim değişken maliyeti bulurken hammadde, işçilik ve fireyi birlikte görmek için [[arac:birim-maliyet-hesapla|Birim Maliyet Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Katkı payı nedir?",
      p: [
        "<strong>Katkı payı</strong>, bir birim satıştan değişken maliyet düşüldükten sonra kalan tutardır. Bu tutar önce sabit giderleri karşılamaya, sabit giderler karşılandıktan sonra da kâra \"katkı\" yapar; adı buradan gelir. Katkı payının satış fiyatına oranı <strong>katkı payı oranı</strong>dır ve her 1 TL'lik satışın kaç kuruşunun sabit giderlere ve kâra kaldığını gösterir.",
        "Örnek: 120 TL'ye satılan bir ürünün değişken maliyeti 40 TL ise birim katkı payı 80 TL, katkı payı oranı 80 ÷ 120 = %66,7'dir. Katkı payı negatifse, yani ürün değişken maliyetinin altında satılıyorsa, ne kadar çok satılırsa o kadar çok zarar edilir ve başabaş noktası hiçbir zaman yakalanamaz."
      ],
      formula: "Birim katkı payı = birim satış fiyatı − birim değişken maliyet\nKatkı payı oranı = birim katkı payı ÷ birim satış fiyatı",
      after: [
        "Ürün bazında katkı payını ve oranını hesaplamak için [[arac:katki-payi-hesapla|Katkı Payı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Başabaş noktası formülü",
      formula: "Başabaş adedi = sabit giderler ÷ birim katkı payı\nBaşabaş cirosu = sabit giderler ÷ katkı payı oranı\n   (ya da başabaş adedi × birim satış fiyatı)\nHedef kâr adedi = (sabit giderler + hedef kâr) ÷ birim katkı payı",
      p: [
        "Formül, her satışın katkı payının sabit giderlerden bir parça \"ödediği\" fikrine dayanır. Sabit giderleri katkı payına böldüğünüzde, bu giderlerin tamamını kapatmak için kaç birim satmanız gerektiğini bulursunuz. Sonuç küsuratlı çıkarsa her zaman yukarı yuvarlanır; yarım ürün satılamaz.",
        "Birden fazla ürün satan işletmelerde tek tek adet yerine ciro üzerinden düşünmek daha pratiktir. Ürünlerin satış payına göre ağırlıklı ortalama katkı payı oranı hesaplanır ve sabit giderler bu orana bölünerek başabaş cirosu bulunur."
      ]
    },
    {
      h: "Çözümlü örnek: kafe için başabaş hesabı",
      p: [
        "Aşağıdaki örnekte tüm tutarlar KDV hariç ve <em>örnek tutardır</em>; kendi işletmenizin değerleriyle hesabı tekrarlayın."
      ],
      ol: [
        "<strong>Sabit giderleri toplayın:</strong> Kira 35.000 TL, iki çalışanın maaş ve primleri 45.000 TL, muhasebe, yazılım ve diğer sabitler 10.000 TL. Toplam aylık sabit gider 90.000 TL.",
        "<strong>Ortalama birim fiyat ve değişken maliyeti bulun:</strong> Kafenin ortalama sipariş tutarı 120 TL; kahve çekirdeği, süt, bardak, şeker ve kart komisyonu dahil ortalama değişken maliyet 40 TL.",
        "<strong>Katkı payını hesaplayın:</strong> 120 − 40 = 80 TL; katkı payı oranı %66,7.",
        "<strong>Başabaş adedi:</strong> 90.000 ÷ 80 = 1.125 sipariş/ay. Ayda 30 gün açık bir kafe için günde 37,5, yani en az 38 sipariş.",
        "<strong>Başabaş cirosu:</strong> 1.125 × 120 = 135.000 TL/ay. Kontrol: 90.000 ÷ 0,667 ≈ 135.000 TL.",
        "<strong>Hedef kâr:</strong> Ayda 30.000 TL kâr hedefleniyorsa (90.000 + 30.000) ÷ 80 = 1.500 sipariş, yani günde 50 sipariş gerekir.",
        "<strong>Güvenlik marjı:</strong> Kafe ayda 1.500 sipariş bekliyorsa (1.500 − 1.125) ÷ 1.500 = %25. Satışlar %25'ten fazla düşmedikçe işletme zarara geçmez."
      ],
      after: [
        "Bu hesabı kendi rakamlarınızla yapıp aylık-yıllık görünümü ve grafiği görmek için [[arac:basabas-noktasi-hesapla|Başabaş Noktası Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Başabaş noktası grafiği nasıl çizilir ve okunur?",
      ol: [
        "Yatay eksene satış adedini, dikey eksene TL tutarını yerleştirin.",
        "Sabit giderleri yatay bir çizgi olarak çizin; satış sıfır olsa bile bu tutar ödenir.",
        "Toplam maliyet çizgisini sabit gider seviyesinden başlatın ve her birim için değişken maliyet kadar yükseltin. Eğimi birim değişken maliyettir.",
        "Gelir çizgisini sıfırdan başlatın; eğimi birim satış fiyatıdır.",
        "İki çizginin kesiştiği nokta başabaş noktasıdır. Solundaki alan zarar, sağındaki alan kâr bölgesidir; iki çizgi arasındaki dikey mesafe o satış seviyesindeki kâr ya da zarar tutarını gösterir."
      ],
      p: [
        "Grafik, rakamların tek başına anlatamadığı bir şeyi gösterir: gelir çizgisinin eğimi maliyet çizgisinin eğiminden ne kadar fazlaysa (yani katkı payı ne kadar büyükse), başabaş noktasını geçtikten sonra kâr o kadar hızlı artar."
      ]
    },
    {
      h: "Fiyat ve maliyet değişikliği başabaş noktasını nasıl etkiler?",
      p: [
        "Başabaş analizinin en değerli kullanımı \"ya şöyle olursa?\" sorularını yanıtlamaktır. Aşağıdaki tablo kafe örneğindeki tek bir değişkenin değişmesinin etkisini gösterir."
      ],
      table: {
        head: ["Senaryo", "Birim katkı payı", "Başabaş adedi", "Değişim"],
        rows: [
          ["Mevcut durum", "80 TL", "1.125", "—"],
          ["Fiyat 120 → 130 TL", "90 TL", "1.000", "%11 daha az satış yeter"],
          ["Fiyat 120 → 110 TL", "70 TL", "1.286", "%14 daha fazla satış gerekir"],
          ["Değişken maliyet 40 → 50 TL", "70 TL", "1.286", "%14 daha fazla satış gerekir"],
          ["Kira 5.000 TL artarsa (sabit 95.000 TL)", "80 TL", "1.188", "%6 daha fazla satış gerekir"],
          ["Ek personel (sabit 110.000 TL)", "80 TL", "1.375", "%22 daha fazla satış gerekir"]
        ],
        caption: "Küçük bir fiyat indirimi, büyük bir kira artışından daha fazla ek satış gerektirebilir; çünkü fiyat değişikliği her birimin katkı payını etkiler."
      },
      after: [
        "Ürün bazında kâr ve zararı adet ve ek giderlerle birlikte görmek için [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama]] aracını, fiyat-maliyet ilişkisini marj üzerinden incelemek için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı rehberini]] kullanabilirsiniz."
      ]
    },
    {
      h: "Başabaş analizinin sınırları ve sık yapılan hatalar",
      ul: [
        "<strong>Sabit gideri eksik yazmak:</strong> İşletme sahibinin kendi geçimi için çektiği para, yıllık ödenen sigorta ya da bakım giderlerinin aylık payı sık unutulur.",
        "<strong>Değişken gideri eksik yazmak:</strong> Kart komisyonu, kargo, fire ve iade maliyeti birim maliyete eklenmezse başabaş noktası olduğundan düşük çıkar.",
        "<strong>KDV dahil fiyat kullanmak:</strong> Hesap KDV hariç fiyatla yapılmalıdır; KDV işletmenin geliri değildir.",
        "<strong>Doğrusallık varsayımını unutmak:</strong> Gerçekte büyük alımlarda birim maliyet düşebilir, kapasite dolunca yeni sabit giderler gerekebilir. Analiz belirli bir faaliyet aralığında geçerlidir.",
        "<strong>Nakit akışını kâr sanmak:</strong> Başabaş noktasını geçmek, vadeli satışlarda tahsilat gecikiyorsa kasada para olduğu anlamına gelmez.",
        "<strong>Mevsimselliği göz ardı etmek:</strong> Yaz ve kış satışları çok farklı olan işletmelerde aylık değil, yıllık başabaş hesabı daha anlamlıdır."
      ]
    }
  ],
  faq: [
    ["Başabaş noktası nedir?", "Başabaş noktası, toplam gelirin toplam giderlere tam olarak eşit olduğu, işletmenin ne kâr ne zarar ettiği satış seviyesidir. Bu noktanın altındaki satışlarda zarar, üstündeki satışlarda kâr oluşur."],
    ["Başabaş noktası formülü nedir?", "Başabaş adedi, sabit giderlerin birim katkı payına bölünmesiyle bulunur: sabit giderler ÷ (birim satış fiyatı − birim değişken maliyet). Başabaş cirosu ise sabit giderlerin katkı payı oranına bölünmesiyle hesaplanır."],
    ["Sabit ve değişken gider nasıl ayrılır?", "Satış yapılmasa da ödenen kira, maaş, abonelik ve sigorta gibi giderler sabittir. Satılan her birimle birlikte oluşan hammadde, ambalaj, kargo ve komisyon gibi giderler değişkendir; elektrik gibi kalemler iki kısma ayrılabilir."],
    ["Katkı payı nedir?", "Katkı payı, birim satış fiyatından birim değişken maliyet çıkarıldıktan sonra kalan tutardır. Bu tutar önce sabit giderleri karşılar, sabit giderler karşılandıktan sonra ise doğrudan kâra dönüşür."],
    ["Kâra geçmek için kaç ürün satmalıyım?", "Sabit giderlerinizi birim katkı payına bölün ve sonucu yukarı yuvarlayın; bu sayının bir fazlası kâra geçtiğiniz ilk satıştır. Belirli bir kâr hedefliyorsanız hedef kârı sabit giderlere ekleyip yine katkı payına bölün."],
    ["Başabaş noktası grafiği nasıl çizilir?", "Yatay eksene satış adedi, dikey eksene TL konur. Sabit gider yatay bir çizgi, toplam maliyet sabit giderden başlayan eğimli bir çizgi, gelir ise sıfırdan başlayan daha dik bir çizgi olarak çizilir; kesişim noktası başabaştır."],
    ["Kafe/dükkan için başabaş nasıl hesaplanır?", "Kira, personel ve abonelik gibi aylık sabit giderler toplanır, ortalama sipariş tutarı ile sipariş başına değişken maliyet belirlenir. Sabit giderler aradaki farka bölünerek aylık, ardından açık gün sayısına bölünerek günlük sipariş hedefi bulunur."],
    ["Fiyat artışı başabaş noktasını nasıl değiştirir?", "Fiyat artışı birim katkı payını büyüttüğü için başabaş adedini düşürür. Örnekte fiyatın 120 TL'den 130 TL'ye çıkması katkı payını 80 TL'den 90 TL'ye yükseltir ve gereken satışı 1.125'ten 1.000 adede indirir."],
    ["Güvenlik marjı nedir?", "Güvenlik marjı, beklenen satışların başabaş satışını ne kadar aştığını yüzde olarak gösterir. Beklenen satıştan başabaş satışı çıkarılıp beklenen satışa bölünür; oran ne kadar yüksekse işletme satış düşüşlerine o kadar dayanıklıdır."]
  ],
  tools: ["basabas-noktasi-hesapla", "katki-payi-hesapla", "birim-maliyet-hesapla", "kar-zarar-hesapla"],
  related: ["kar-marji-nasil-hesaplanir", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["KOSGEB – Girişimcilik destekleri ve iş planı", "https://www.kosgeb.gov.tr/"]
  ]
};
