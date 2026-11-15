export default {
  slug: "oran-oranti-nasil-cozulur",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Oran Orantı Nasıl Çözülür? Doğru ve Ters Orantı Formülleri, Örnekler",
  pageTitle: "Oran Orantı Nasıl Çözülür? Doğru, Ters ve Bileşik Orantı",
  description: "Oran orantı nasıl çözülür? İçler dışlar çarpımı, doğru orantı (y/x sabit), ters orantı (x·y sabit), bileşik orantı, işçi-havuz, harita ölçeği ve tarif örnekleri.",
  keywords: ["oran orantı", "doğru orantı", "ters orantı", "içler dışlar çarpımı", "oran orantı problemleri", "işçi havuz problemleri", "bileşik orantı", "orantılı paylaştırma"],
  lead: "Oran orantı problemleri <strong>önce iki çokluğun birlikte nasıl değiştiğine bakarak</strong> çözülür: biri artarken diğeri aynı katta artıyorsa doğru orantı vardır ve oran sabittir (y ÷ x = k), biri artarken diğeri aynı katta azalıyorsa ters orantı vardır ve çarpım sabittir (x · y = k). Sonra eşitlik kurulur ve içler dışlar çarpımıyla bilinmeyen bulunur. 3 kg elma 90 TL ise 5 kg 150 TL'dir (doğru orantı); 6 işçinin 12 günde bitirdiği işi 8 işçi 9 günde bitirir (ters orantı). Aşağıda tüm türleri çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Oran, iki çokluğun bölümüdür (a ÷ b ya da a : b); orantı, iki oranın eşitliğidir (a ÷ b = c ÷ d).",
    "İçler dışlar çarpımı: a ÷ b = c ÷ d ise a · d = b · c.",
    "Doğru orantıda y ÷ x sabittir; grafik başlangıç noktasından geçen bir doğrudur.",
    "Ters orantıda x · y sabittir; biri 2 katına çıkınca diğeri yarıya iner.",
    "İşçi-gün, hız-süre, musluk sayısı-dolma süresi ters orantılı; miktar-fiyat, harita-gerçek uzunluk doğru orantılıdır.",
    "Bileşik orantıda her etken ayrı ayrı doğru ya da ters orantı olarak çarpana eklenir."
  ],
  figure: {
    alt: "Solda doğru orantı grafiği: kilogram arttıkça fiyat doğrusal artıyor, 3 kg 90 TL, 5 kg 150 TL, y bölü x eşittir 30. Sağda ters orantı grafiği: işçi sayısı arttıkça gün azalıyor, 6 işçi 12 gün, 8 işçi 9 gün, x çarpı y eşittir 72.",
    caption: "Doğru orantıda iki çokluğun bölümü, ters orantıda çarpımı sabittir. Doğru orantı grafiği doğru, ters orantı grafiği eğri (hiperbol) biçimindedir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="185" y="30" class="lg b mid">Doğru orantı</text>
  <text x="535" y="30" class="lg b mid">Ters orantı</text>
  <line x1="50" y1="320" x2="330" y2="320" class="st" fill="none"/>
  <line x1="50" y1="320" x2="50" y2="60" class="st" fill="none"/>
  <line x1="50" y1="320" x2="310" y2="80" class="sp sw" fill="none"/>
  <circle cx="134" cy="242" r="7" class="p"/>
  <circle cx="190" cy="190" r="7" class="p"/>
  <text x="144" y="266" class="sm">3 kg → 90 TL</text>
  <text x="200" y="212" class="sm">5 kg → 150 TL</text>
  <text x="190" y="344" class="sm mid mu">miktar (kg)</text>
  <text x="40" y="70" class="sm end mu">TL</text>
  <rect x="70" y="72" width="140" height="40" rx="8" class="ps"/>
  <text x="140" y="98" class="b mid">y ÷ x = 30</text>
  <line x1="400" y1="320" x2="690" y2="320" class="st" fill="none"/>
  <line x1="400" y1="320" x2="400" y2="60" class="st" fill="none"/>
  <path d="M 430 70 Q 470 230 560 260 T 690 300" class="sok sw" fill="none"/>
  <circle cx="532" cy="252" r="7" class="ok"/>
  <circle cx="576" cy="267" r="7" class="ok"/>
  <text x="520" y="236" class="sm end">6 işçi → 12 gün</text>
  <text x="590" y="292" class="sm">8 işçi → 9 gün</text>
  <text x="545" y="344" class="sm mid mu">işçi sayısı</text>
  <text x="390" y="70" class="sm end mu">gün</text>
  <rect x="540" y="72" width="140" height="40" rx="8" class="oks"/>
  <text x="610" y="98" class="b mid">x · y = 72</text>
  <rect x="20" y="364" width="680" height="44" rx="8" class="sf sb"/>
  <text x="360" y="392" class="b mid">İçler dışlar: 3 ÷ 90 = 5 ÷ x → 3x = 450 → x = 150</text>
</svg>`
  },
  sections: [
    {
      h: "Oran ile orantı arasındaki fark",
      p: [
        "<strong>Oran</strong>, aynı birimden ya da anlamlı biçimde karşılaştırılabilen iki çokluğun bölümüdür. Bir sınıfta 12 kız ve 18 erkek varsa kızların erkeklere oranı 12 : 18'dir; sadeleştirildiğinde 2 : 3 olur. Oranın birimi yoktur, ancak farklı birimli çoklukların bölümü (km/saat, TL/kg) de günlük dilde oran olarak kullanılır ve bunlara birim oran denir.",
        "<strong>Orantı</strong> ise iki oranın birbirine eşit olduğunu söyleyen ifadedir: 2 ÷ 3 = 12 ÷ 18. Orantı problemlerinin özü, bilinen üç değerden dördüncüsünü bulmaktır. Oranları en sade hâline getirmek için [[arac:oran-sadelestir|Oran Sadeleştirme]] aracını kullanabilirsiniz.",
        "Oran ve orantı konusu 7. sınıfta başlar, LGS ve TYT'de en çok soru çıkan problem türlerinden birini oluşturur. Kesir, yüzde ve ölçek hesaplarının da temelidir."
      ]
    },
    {
      h: "İçler dışlar çarpımı nasıl yapılır?",
      p: [
        "a ÷ b = c ÷ d orantısında b ve c <strong>içler</strong>, a ve d <strong>dışlar</strong> olarak adlandırılır (a : b = c : d yazıldığında ortadaki ikisi içler, uçtakiler dışlardır). İçlerin çarpımı dışların çarpımına eşittir. Bilinmeyeni bulmak için bu eşitliği kurup bilinmeyeni yalnız bırakırsınız."
      ],
      formula: "a ÷ b = c ÷ d  ⟹  a · d = b · c\nÖrnek: 4 ÷ 7 = x ÷ 35  ⟹  7x = 140  ⟹  x = 20",
      after: [
        "İçler dışlar çarpımı yalnızca iki kesrin eşit olduğu durumda kullanılır. Kesirler toplanıyor ya da çıkarılıyorsa bu yöntem geçersizdir; önce paydalar eşitlenmelidir."
      ]
    },
    {
      h: "Doğru orantı nasıl çözülür?",
      p: [
        "İki çokluktan biri belirli bir katsayıyla artarken diğeri de aynı katsayıyla artıyorsa (ya da biri azalırken diğeri de aynı oranda azalıyorsa) bu çokluklar doğru orantılıdır. Doğru orantıda bölüm sabittir: y ÷ x = k. Grafiği başlangıç noktasından geçen bir doğrudur."
      ],
      ol: [
        "<strong>Alışveriş:</strong> 3 kg elma 90 TL ise 5 kg kaç TL? 3 ÷ 90 = 5 ÷ x → 3x = 450 → x = 150 TL. Birim oran yöntemiyle: 1 kg = 30 TL, 5 kg = 150 TL.",
        "<strong>Yakıt:</strong> Bir araç 100 km'de 6 litre yakıyorsa 350 km'de 6 × 3,5 = 21 litre yakar.",
        "<strong>Harita ölçeği:</strong> 1 : 250.000 ölçekli haritada 4 cm, gerçekte 4 × 250.000 = 1.000.000 cm = 10 km'dir. Ölçek her zaman harita uzunluğu ÷ gerçek uzunluk oranıdır.",
        "<strong>Tarif ölçekleme:</strong> 4 kişilik kek için 200 g un gerekiyorsa 6 kişilik için 200 × 6 ÷ 4 = 300 g un gerekir."
      ],
      after: [
        "Bu tür hesapları adım adım çözüm ve formül gösterimiyle yapmak için [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] aracını kullanabilirsiniz; araç harita ölçeği ve tarif ölçekleme seçeneklerini de içerir."
      ]
    },
    {
      h: "Ters orantı nedir, nasıl çözülür?",
      p: [
        "İki çokluktan biri belirli bir katsayıyla artarken diğeri aynı katsayıyla azalıyorsa bu çokluklar ters orantılıdır. Ters orantıda çarpım sabittir: x · y = k. Grafiği başlangıç noktasından geçmeyen, eksenlere yaklaşan bir eğridir (hiperbol)."
      ],
      formula: "x₁ · y₁ = x₂ · y₂\nÖrnek: 6 işçi · 12 gün = 8 işçi · y  ⟹  72 = 8y  ⟹  y = 9 gün",
      ol: [
        "<strong>İşçi problemi:</strong> 6 işçi bir işi 12 günde bitiriyorsa 8 işçi aynı işi kaç günde bitirir? İşçi arttıkça gün azalır: 6 × 12 = 8 × y → y = 9 gün. (İşçilerin aynı hızda çalıştığı varsayılır.)",
        "<strong>Hız ve süre:</strong> Bir yolu saatte 60 km hızla 4 saatte alan araç, saatte 80 km hızla 60 × 4 ÷ 80 = 3 saatte alır.",
        "<strong>Paylaşım:</strong> Bir torbadaki şekerler 12 çocuğa paylaştırıldığında her birine 10 tane düşüyorsa 15 çocuğa 12 × 10 ÷ 15 = 8 tane düşer.",
        "<strong>Çark ve dişli:</strong> 20 dişli çark dakikada 60 tur atarken ona bağlı 30 dişli çark 20 × 60 ÷ 30 = 40 tur atar."
      ],
      after: [
        "Ters orantılı iki çokluktan bilinmeyeni ve sabit çarpımı hızlıca görmek için [[arac:ters-oranti-hesapla|Ters Orantı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "İşçi ve havuz problemleri: ters orantı mı?",
      p: [
        "İşçi sayısı ile bitirme süresi ters orantılıdır, ancak işçilerin farklı hızlarla çalıştığı ya da birlikte çalıştığı sorularda iş birimi yöntemi daha güvenlidir. Bu yöntemde işin tamamı 1 kabul edilir ve her işçinin ya da musluğun birim zamanda yaptığı iş hesaplanır."
      ],
      formula: "Birlikte çalışma: 1 ÷ t = 1 ÷ t₁ + 1 ÷ t₂\nBoşaltan musluk varsa onun payı çıkarılır: 1 ÷ t = 1 ÷ t₁ − 1 ÷ t₃",
      ul: [
        "<strong>İki musluk:</strong> A musluğu havuzu 6 saatte, B musluğu 3 saatte dolduruyor. Birlikte: 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2; havuz 2 saatte dolar.",
        "<strong>Dolduran ve boşaltan:</strong> Dolduran musluk 4 saatte, boşaltan musluk 12 saatte iş yapıyorsa birlikte açıldığında 1/4 − 1/12 = 2/12 = 1/6; havuz 6 saatte dolar.",
        "<strong>Farklı hızda işçiler:</strong> Ali bir işi 10 günde, Veli 15 günde bitiriyor. Birlikte 1/10 + 1/15 = 5/30 = 1/6; iş 6 günde biter."
      ]
    },
    {
      h: "Bileşik orantı ve orantılı paylaştırma",
      p: [
        "Bileşik orantıda sonuç birden fazla etkene bağlıdır. Her etkeni ayrı ayrı değerlendirip doğru orantılıysa yeni/eski, ters orantılıysa eski/yeni oranıyla çarparsınız."
      ],
      ol: [
        "Soru: 4 işçi günde 8 saat çalışarak 5 günde 200 parça üretiyor. 6 işçi günde 10 saat çalışarak 4 günde kaç parça üretir?",
        "Parça sayısı işçi sayısıyla, günlük saatle ve gün sayısıyla doğru orantılıdır.",
        "Yeni üretim = 200 × (6 ÷ 4) × (10 ÷ 8) × (4 ÷ 5) = 200 × 1,5 × 1,25 × 0,8 = 300 parça."
      ],
      after: [
        "<strong>Orantılı paylaştırma:</strong> 1.500 TL iki kardeş arasında 2 ve 3 sayılarıyla doğru orantılı paylaştırılırsa toplam 5 parça olur; bir parça 300 TL'dir ve paylar 600 TL ile 900 TL olur. Aynı tutar 2 ve 3 ile <strong>ters orantılı</strong> paylaştırılırsa oranlar 1/2 : 1/3 = 3 : 2 olur ve paylar 900 TL ile 600 TL'ye döner. Yüzde ile ilişkili soruların çözüm mantığı için [[rehber:yuzde-hesaplama-nasil-yapilir|yüzde hesaplama rehberine]] göz atabilirsiniz."
      ]
    },
    {
      h: "Doğru mu ters mi? Hızlı ayırt etme tablosu",
      table: {
        head: ["Çokluklar", "Orantı türü", "Sabit olan"],
        rows: [
          ["Ürün miktarı – toplam fiyat", "Doğru", "Birim fiyat"],
          ["Harita uzunluğu – gerçek uzunluk", "Doğru", "Ölçek"],
          ["Kişi sayısı – tarif malzemesi", "Doğru", "Kişi başı miktar"],
          ["Yol – yakıt (sabit tüketimde)", "Doğru", "100 km'de tüketim"],
          ["İşçi sayısı – bitirme süresi", "Ters", "Toplam iş (işçi × gün)"],
          ["Hız – süre (aynı yol)", "Ters", "Yol"],
          ["Musluk sayısı – dolma süresi", "Ters", "Havuz hacmi"],
          ["Kişi sayısı – kişi başı pay", "Ters", "Toplam miktar"]
        ]
      },
      after: [
        "Bazı çokluklar ne doğru ne ters orantılıdır. Örneğin bir insanın yaşı ile boyu birlikte artar ama sabit bir oranla artmaz; bir taksi ücretinde açılış ücreti varsa mesafe ile ücret doğrusal ilişkilidir ama doğru orantılı değildir, çünkü grafik başlangıç noktasından geçmez."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Türü belirlemeden içler dışlar yapmak:</strong> Ters orantıda oranları doğru orantı gibi eşitlemek yanlış sonuç verir; önce \"biri artınca diğeri artıyor mu, azalıyor mu\" sorusunu sorun.",
        "<strong>Birimleri eşitlememek:</strong> Harita sorularında cm ile km, tarif sorularında gram ile kilogram karıştırılmamalıdır.",
        "<strong>Ölçeği ters yazmak:</strong> 1 : 250.000 ölçeğinde 1 harita birimi 250.000 gerçek birimdir, tersi değil.",
        "<strong>Bileşik orantıda bir etkeni unutmak:</strong> Her etkeni tek tek listeleyin ve yönünü işaretleyin.",
        "<strong>Doğrusal ilişkiyi doğru orantı sanmak:</strong> Sabit bir başlangıç tutarı varsa (açılış ücreti, abonelik bedeli) oran sabit değildir."
      ]
    }
  ],
  faq: [
    ["Oran ile orantı arasındaki fark nedir?", "Oran iki çokluğun bölümüdür, örneğin 12 kızın 18 erkeğe oranı 12 : 18 yani 2 : 3'tür. Orantı ise iki oranın birbirine eşit olduğunu gösteren ifadedir; 2 bölü 3 eşittir 12 bölü 18 bir orantıdır."],
    ["Doğru orantı nasıl çözülür?", "Önce iki çokluğun aynı yönde ve aynı katla değiştiğini kontrol edin. Sonra bilinen değerlerle bilinmeyeni aynı sırada yazarak oranları eşitleyin ve içler dışlar çarpımı yapın. 3 kg 90 TL ise 3 bölü 90 eşittir 5 bölü x, buradan x eşittir 150 bulunur."],
    ["Ters orantı nedir?", "İki çokluktan biri belirli bir katla artarken diğeri aynı katla azalıyorsa ters orantı vardır. Bu durumda iki çokluğun çarpımı sabittir. İşçi sayısı ile işin bitme süresi, hız ile aynı yolu alma süresi ters orantılıdır."],
    ["İçler dışlar çarpımı nasıl yapılır?", "a bölü b eşittir c bölü d biçimindeki bir orantıda içler b ve c, dışlar a ve d'dir. İçlerin çarpımı dışların çarpımına eşittir: a çarpı d eşittir b çarpı c. Bu eşitlikte bilinmeyen yalnız bırakılarak bulunur."],
    ["İşçi problemleri ters orantı mıdır?", "Aynı hızla çalışan işçilerde işçi sayısı ile bitirme süresi ters orantılıdır: 6 işçi 12 günde bitiriyorsa 8 işçi 9 günde bitirir. İşçiler farklı hızdaysa her birinin birim zamanda yaptığı işi toplayan iş birimi yöntemi kullanılır."],
    ["Bileşik orantı nedir?", "Sonucun birden fazla etkene bağlı olduğu orantıdır. Her etken ayrı ayrı doğru ya da ters orantı olarak değerlendirilir ve oranlar çarpılır. Örneğin üretim işçi sayısı, günlük çalışma saati ve gün sayısıyla doğru orantılı olarak değişir."],
    ["Harita ölçeği oran mıdır?", "Evet, harita ölçeği harita üzerindeki uzunluğun gerçek uzunluğa oranıdır. 1 : 250.000 ölçekli haritada 1 cm gerçekte 250.000 cm yani 2,5 km'dir. Harita uzunluğu ile gerçek uzunluk doğru orantılıdır."],
    ["Tarif ölçeklendirmede orantı nasıl kullanılır?", "Malzeme miktarları kişi sayısıyla doğru orantılıdır. Her malzemeyi yeni kişi sayısının eski kişi sayısına oranıyla çarparsınız. 4 kişilik tarifte 200 g un varsa 6 kişilik tarifte 200 çarpı 6 bölü 4 eşittir 300 g un kullanılır."],
    ["Doğru orantının grafiği nasıldır?", "Doğru orantının grafiği başlangıç noktasından geçen bir doğrudur ve eğimi sabit orana eşittir. Ters orantının grafiği ise eksenlere yaklaşan ama onları kesmeyen bir eğridir. Bu fark, grafik sorularında orantı türünü hızlıca tanımaya yardım eder."]
  ],
  tools: ["oran-oranti-hesapla", "ters-oranti-hesapla", "oran-sadelestir", "yuzde-hesapla"],
  related: ["ebob-ekok-nasil-bulunur", "permutasyon-ve-kombinasyon-farki"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS konu kapsamı", "https://www.osym.gov.tr/"]
  ]
};
