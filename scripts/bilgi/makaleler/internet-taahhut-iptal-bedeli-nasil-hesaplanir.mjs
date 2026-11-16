export default {
  slug: "internet-taahhut-iptal-bedeli-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "İnternet ve Hat Taahhüdü İptal Bedeli Nasıl Hesaplanır? Cayma Bedeli",
  pageTitle: "Taahhüt İptal (Cayma) Bedeli Nasıl Hesaplanır? İnternet ve Hat",
  description: "İnternet taahhüdü iptal bedeli, kalan aylık ücretler ile alınan indirimlerden düşük olanıyla sınırlıdır. Formül, örnek hesap, taşınma ve bedelsiz iptal.",
  keywords: ["taahhüt iptal bedeli", "cayma bedeli hesaplama", "internet taahhüdü bozma", "taahhüt bitmeden iptal", "hat taahhüt cezası", "abonelik iptali", "taşınınca internet iptal", "btk cayma bedeli"],
  lead: "Taahhütlü internet ya da hat aboneliğini süre dolmadan iptal ettiğinizde ödeyeceğiniz cayma bedeli, iki tutardan düşük olanıyla sınırlıdır: o güne kadar size sağlanan indirimlerin toplamı ile taahhüdün kalan ayları için ödenecek ücretlerin toplamı. Bu kural Elektronik Haberleşme Sektörüne İlişkin Tüketici Hakları Yönetmeliği'nde yer alır. Bu yazıda formülü, ay ay değişen bedeli, cihaz taksitlerini, taşınma ve hız sorunu gibi bedelsiz iptal hâllerini ve iptal başvurusunun nasıl yapılacağını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Cayma bedeli üst sınırı = min(o güne kadar alınan indirimlerin toplamı, kalan ayların ücretleri toplamı).",
    "Taahhüdün başında indirim toplamı küçük olduğu için bedel düşüktür; sona doğru kalan ücretler küçüldüğü için yine düşer.",
    "Örnek: liste fiyatı 750 TL, kampanyalı 500 TL, 24 ay; 9 ay sonra iptalde bedel 2.250 TL, 21 ay sonra 1.500 TL'dir.",
    "Taksitle alınan modem ya da telefonun kalan taksitleri ayrıca istenebilir.",
    "Taşındığınız adreste aynı hizmet sunulamıyorsa sabit internette cayma bedeli alınmaz; belgelemeniz gerekir.",
    "İptal talebinden sonra operatör ücretlendirmeyi 24 saat içinde durdurmak ve hattı en geç 7 gün içinde kapatmak zorundadır."
  ],
  figure: {
    alt: "24 aylık taahhütte cayma bedeli grafiği: ayrılınan aya göre alınan indirim toplamı artan, kalan ücretler azalan iki çizgi; bedel ikisinden düşük olanıdır ve 16. ayda 4.000 TL ile en yüksektir.",
    caption: "Liste fiyatı 750 TL, kampanya fiyatı 500 TL olan 24 aylık taahhüt. Yükselen çizgi o güne kadar alınan indirimi, alçalan çizgi kalan ayların ücretini gösterir. Cayma bedeli her ayda iki çizgiden alttakidir; en yüksek değer 16. ayda 4.000 TL'dir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Ayrıldığınız aya göre cayma bedeli (24 ay)</text>
  <line x1="80" y1="340" x2="680" y2="340" class="st" fill="none"/>
  <line x1="80" y1="60" x2="80" y2="340" class="st" fill="none"/>
  <g class="sm end t2">
    <text x="72" y="344">0</text><text x="72" y="284">2.000</text><text x="72" y="224">4.000</text><text x="72" y="164">6.000</text><text x="72" y="104">8.000</text>
  </g>
  <g class="sm mid t2">
    <text x="80" y="360">0</text><text x="180" y="360">4</text><text x="280" y="360">8</text><text x="380" y="360">12</text><text x="480" y="360">16</text><text x="580" y="360">20</text><text x="680" y="360">24</text>
  </g>
  <text x="380" y="384" class="sm mid">Geçen ay sayısı</text>
  <line x1="80" y1="280" x2="680" y2="280" class="sb dash" fill="none"/>
  <line x1="80" y1="220" x2="680" y2="220" class="sb dash" fill="none"/>
  <line x1="80" y1="160" x2="680" y2="160" class="sb dash" fill="none"/>
  <polyline points="80,340 680,160" class="sa sw" fill="none"/>
  <polyline points="180,40 680,340" class="sb sw" fill="none"/>
  <polyline points="80,340 480,220 680,340" class="sp sw" fill="none"/>
  <circle cx="480" cy="220" r="7" class="p"/>
  <text x="490" y="210" class="sm b p">16. ay: 4.000 TL</text>
  <circle cx="305" cy="272.5" r="6" class="p"/><text x="300" y="300" class="sm mid">9. ay: 2.250 TL</text>
  <circle cx="605" cy="295" r="6" class="p"/><text x="600" y="322" class="sm mid">21. ay: 1.500 TL</text>
  <rect x="420" y="56" width="280" height="84" rx="8" class="sf sb"/>
  <line x1="436" y1="76" x2="466" y2="76" class="sa sw" fill="none"/><text x="474" y="80" class="sm">Alınan indirim (250 TL × ay)</text>
  <line x1="436" y1="100" x2="466" y2="100" class="sb sw" fill="none"/><text x="474" y="104" class="sm">Kalan ücretler (500 TL × kalan ay)</text>
  <line x1="436" y1="124" x2="466" y2="124" class="sp sw" fill="none"/><text x="474" y="128" class="sm b">Cayma bedeli (düşük olan)</text>
</svg>`
  },
  sections: [
    {
      h: "Taahhütlü abonelikte cayma bedeli nedir?",
      p: [
        "İnternet, ev telefonu, mobil hat ve televizyon aboneliklerinde operatörler belirli bir süre (genellikle 12 ya da 24 ay) hizmeti kullanmayı taahhüt eden aboneye indirimli fiyat, ücretsiz modem ya da cihaz gibi avantajlar verir. Abone taahhüt süresi dolmadan aboneliği sona erdirirse, operatör kendisine sağlanan avantajların bir kısmını geri ister. Bu tutara cayma bedeli, taahhüt bozma bedeli ya da halk arasında \"taahhüt cezası\" denir.",
        "Cayma bedeli bir ceza değil, kampanyanın karşılığı olarak tanınan indirimlerin iadesi niteliğindedir. Bu nedenle operatör istediği tutarı isteyemez; tutarın üst sınırı Bilgi Teknolojileri ve İletişim Kurumunun (BTK) Elektronik Haberleşme Sektörüne İlişkin Tüketici Hakları Yönetmeliği ile belirlenmiştir.",
        "Taahhütname, taahhüt süresini, liste fiyatını, kampanyalı fiyatı ve cayma durumunda talep edilecek tutarların nasıl hesaplanacağını göstermek zorundadır. İmzaladığınız taahhütnamenin bir örneğini istemek ve saklamak, iptal sırasında yaşanacak anlaşmazlıklarda en önemli belgedir."
      ]
    },
    {
      h: "Cayma bedeli hangi iki tutardan düşük olanıyla sınırlıdır?",
      p: [
        "Yönetmeliğe göre taahhüt süresi dolmadan abonelik sona erdirildiğinde aboneden talep edilebilecek tutar, iki kalemden düşük olanını geçemez. Birinci kalem, aboneliğin sona erdiği tarihe kadar aboneye sağlanan indirimlerin ve cihaz gibi faydaların toplamıdır. İkinci kalem, taahhüdün kalan süresine ait ve henüz tahakkuk etmemiş ücretlerin toplamıdır."
      ],
      formula: "A = o güne kadar alınan indirim toplamı = (liste fiyatı − kampanyalı fiyat) × geçen ay sayısı\nB = kalan ayların ücretleri = kampanyalı fiyat × kalan ay sayısı\nCayma bedeli üst sınırı = A ile B'den küçük olanı",
      after: [
        "Bu kuralın mantığı şudur: taahhüdün başında az indirim aldığınız için az iade edersiniz; sonuna doğru çok indirim almış olsanız bile, kalan ayların ücretinden fazlasını ödemeniz istenemez. Yani hiçbir durumda aboneliği sürdürseydiniz ödeyeceğiniz tutardan fazlasını ödemezsiniz."
      ]
    },
    {
      h: "Kalan ay sayısı bedeli nasıl etkiler? Çözümlü örnek",
      p: [
        "Liste fiyatı aylık 750 TL olan bir internet paketine 24 aylık taahhütle aylık 500 TL ödediğinizi varsayalım (örnek tutarlar). Her ay 250 TL indirim alıyorsunuz. Farklı aylarda iptal ettiğinizde bedel şöyle değişir:"
      ],
      table: {
        head: ["Geçen ay", "A: alınan indirim", "B: kalan ücretler", "Cayma bedeli (düşük olan)"],
        rows: [
          ["3", "750 TL", "10.500 TL", "750 TL"],
          ["9", "2.250 TL", "7.500 TL", "2.250 TL"],
          ["12", "3.000 TL", "6.000 TL", "3.000 TL"],
          ["16", "4.000 TL", "4.000 TL", "4.000 TL"],
          ["18", "4.500 TL", "3.000 TL", "3.000 TL"],
          ["21", "5.250 TL", "1.500 TL", "1.500 TL"],
          ["23", "5.750 TL", "500 TL", "500 TL"]
        ],
        caption: "Örnekte en yüksek bedel, iki tutarın eşitlendiği 16. ayda ortaya çıkar: 250 × 16 = 500 × 8 = 4.000 TL."
      },
      ol: [
        "Taahhütnameden liste fiyatını, kampanyalı fiyatı ve taahhüt süresini bulun.",
        "Taahhüt başlangıcından iptal tarihine kadar geçen tam ay sayısını hesaplayın; bunun için [[arac:ay-farki-hesapla|Ay Farkı aracı]] işinizi görür.",
        "A tutarını bulun: aylık indirim × geçen ay.",
        "B tutarını bulun: kampanyalı aylık ücret × kalan ay.",
        "İkisinden küçük olanı alın; buna varsa cihazın kalan taksitlerini ekleyin."
      ],
      after: [
        "Kampanyada ilk aylar ücretsiz, sonraki aylar indirimli gibi kademeli fiyatlar varsa A tutarını ay ay toplamanız gerekir. Yüzdelerle verilen indirimlerde tutarı hesaplamak için [[arac:yuzde-hesapla|Yüzde Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Taahhüt sırasında verilen cihaz ve indirimler nasıl geri istenir?",
      p: [
        "Kampanyayla birlikte taksitle bir telefon, modem, uydu alıcısı ya da televizyon aldıysanız, cihazın ödenmemiş taksitleri cayma bedelinden ayrı bir kalemdir. Cihaz sizde kaldığı sürece kalan taksitlerin toplu ya da taksitle ödenmesi istenebilir. Bazı kampanyalarda modem iade edilirse bedel istenmez; taahhütnamede bu ayrıntının yazması gerekir.",
        "Kampanya kapsamında verilen ücretsiz kurulum, ilk ay ücretsiz kullanım ya da ek paket gibi faydalar da \"sağlanan indirim\" toplamına girer; ancak bunların parasal değerinin taahhütnamede gösterilmiş olması gerekir. Faturanızda adı geçmeyen ya da taahhütnamede yazmayan bir faydanın bedeli sonradan istenemez.",
        "İptal sonrasında gelen son faturada her kalemi taahhütnameyle karşılaştırın. Hesapladığınız üst sınırdan fazla bir tutar istendiyse önce operatöre yazılı itiraz edin."
      ]
    },
    {
      h: "Taşınma ve altyapı olmaması durumunda bedel alınır mı?",
      p: [
        "Sabit internet ve ev telefonu gibi mobil olmayan hizmetlerde, abone yeni adresine taşındığında operatör aynı hizmeti yeni adreste sunamıyorsa abonelik cayma bedeli alınmadan sona erdirilir. Bunun için taşındığınızı gösteren bir belge (yerleşim yeri belgesi, kira sözleşmesi gibi) istenebilir. Cihaz sizde kalacaksa cihazın kalan taksitleri yine ödenir.",
        "Operatör yeni adreste hizmet verebiliyorsa nakil işlemi yapılır ve taahhüt devam eder. Bu durumda yeni adreste altyapı daha düşük hız sağlıyorsa ne olacağı taahhütnamede ve kampanya koşullarında yazılıdır; nakil öncesinde operatörden yazılı bilgi almak sizi korur. Mobil hatlarda taşınma tek başına bedelsiz iptal nedeni değildir, çünkü hizmet adrese bağlı değildir."
      ]
    },
    {
      h: "Hizmet kalitesi düşükse bedelsiz iptal mümkün mü?",
      p: [
        "İnternet hızı, BTK'nın belirlediği hizmet kalitesi ölçütlerinin altında kalıyorsa ve operatör bunu belirli bir süre içinde gideremiyorsa abone cayma bedeli ödemeden aboneliği sona erdirebilir. Burada ölçüt, reklamdaki \"100 Mbps'e varan\" ifadesi değil, mevzuattaki asgari hız ve kalite kriterleridir. Cihaz bedeli bu durumda da istenebilir.",
        "Haklı iptal için kayıt tutmak önemlidir. Hız testlerini kablolu bağlantıyla, yoğun olmayan saatlerde ve birkaç gün boyunca yapın; ekran görüntülerini ve tarihlerini saklayın. Arızaları müşteri hizmetlerine bildirip kayıt numarası alın. Operatör sorunu çözmezse önce yazılı başvuru, sonuç alınamazsa BTK'ya şikâyet ya da tüketici hakem heyetine başvuru yolu açıktır. Başvuru adımları için [[bilgi:tuketici-hakem-heyeti-basvuru-siniri-nasil-basvurulur|tüketici hakem heyeti]] yazısına bakın.",
        "Operatörün kampanya koşullarını tek taraflı olarak sizin aleyhinize değiştirmesi (fiyat artışı, paket küçültme) durumunda da abonenin sözleşmeyi bedelsiz feshetme hakkı tartışılabilir. Bu tür durumlarda bildirimin içeriği ve tarihine göre hukuki destek almak yararlı olur."
      ]
    },
    {
      h: "Operatör değiştirirken numara taşıma ve iptal başvurusu",
      p: [
        "Numarayı başka bir operatöre taşımak için yeni operatöre başvurmanız yeterlidir; işlemi yeni operatör başlatır ve numara taşımanın kendisi için aboneden ücret alınmaz. Ancak eski operatördeki taahhüt devam ediyorsa, numara taşındığında abonelik sona ereceği için eski operatör aynı üst sınır kuralına göre cayma bedeli isteyebilir.",
        "İptal başvurusu yazılı olarak, operatörün mağazasından, müşteri hizmetlerinden kayıtlı olarak ya da çevrim içi kanallardan yapılabilir. İptal talebinden sonra operatör ücretlendirmeyi 24 saat içinde durdurmak ve aboneliği en geç 7 gün içinde sonlandırmak zorundadır; bu sürelerden sonra tahakkuk eden ücretler aboneden istenemez. Başvuru tarihini ve kayıt numarasını mutlaka not edin.",
        "Taahhüdün ne zaman biteceğini bilmek iptali en ucuz zamana planlamanızı sağlar. Taahhüt bitiş tarihine kaç gün kaldığını [[arac:tarih-farki|Tarih Farkı aracıyla]] görebilirsiniz. Taahhüt süresi dolduğunda abonelik sizin onayınız olmadan yeni bir taahhütle yenilenemez."
      ]
    },
    {
      h: "Yıllık maliyet: taahhütlü ve taahhütsüz paket karşılaştırması",
      p: [
        "Taahhüt vermeden önce toplam maliyeti karşılaştırmak, ileride cayma bedeliyle karşılaşma riskini değerlendirmenizi sağlar. Örneğin aynı hız için taahhütlü paket aylık 500 TL, taahhütsüz paket aylık 700 TL olsun (örnek tutarlar). 24 ayda taahhütlü paket 12.000 TL, taahhütsüz paket 16.800 TL eder; fark 4.800 TL'dir.",
        "Bir yıl içinde taşınma ihtimaliniz yüksekse, taahhütlü paketin 12. ayda iptali 3.000 TL bedel getirir ve ilk yılın toplamı 6.000 + 3.000 = 9.000 TL olur; taahhütsüz paketin ilk yılı 8.400 TL'dir. Bu örnekte kısa süreli kullanımda taahhütsüz paket daha ucuz kalır. Tüm aboneliklerinizin yıllık toplamını görmek için [[arac:abonelik-maliyeti-hesapla|Abonelik Maliyeti aracını]], dijital servislerin maliyeti için [[bilgi:dijital-abonelikler-yilda-ne-tutar|dijital abonelikler yılda ne tutar]] yazısını inceleyebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Taahhütnameyi saklamamak:</strong> Liste ve kampanya fiyatını kanıtlayamazsanız hesabı denetleyemezsiniz.",
        "<strong>İptali sözlü yapmak:</strong> Kayıt numarası alınmayan telefon görüşmesi sonradan ispat edilemeyebilir.",
        "<strong>Cihaz taksitini cayma bedeli sanmak:</strong> Kalan cihaz taksitleri ayrı kalemdir ve üst sınır kuralına tabi değildir.",
        "<strong>Taşınma belgesi vermemek:</strong> Bedelsiz iptal hakkı için yeni adresi belgelemek gerekir.",
        "<strong>Reklam hızını ölçüt sanmak:</strong> Bedelsiz iptal için mevzuattaki kalite ölçütleri esas alınır.",
        "<strong>Faturayı kontrol etmemek:</strong> İptalden sonraki son faturada üst sınırı aşan tutar varsa yazılı itiraz edin."
      ]
    }
  ],
  faq: [
    ["Taahhütlü abonelikte cayma bedeli nedir?", "Cayma bedeli, taahhüt süresi dolmadan aboneliği sona erdiren aboneden, kampanya kapsamında sağlanan indirimlerin karşılığı olarak istenen tutardır. Üst sınırı BTK'nın tüketici hakları yönetmeliğiyle belirlenmiştir."],
    ["Cayma bedeli hangi iki tutardan düşük olanıyla sınırlandırılır?", "İptal tarihine kadar sağlanan indirim ve faydaların toplamı ile taahhüdün kalan ayları için ödenecek ücretlerin toplamından düşük olanı istenebilir. Böylece abone, aboneliği sürdürseydi ödeyeceğinden fazlasını ödemez."],
    ["Kalan ay sayısı bedeli nasıl etkiler?", "Taahhüdün başında alınan indirim toplamı küçük olduğu için bedel düşüktür; ilerledikçe artar, iki tutarın eşitlendiği ayda en yükseğe çıkar ve sonra kalan ücretler azaldığı için yeniden düşer."],
    ["Taahhüt sırasında verilen indirimler nasıl geri istenir?", "Operatör, taahhütnamede yazan liste ve kampanya fiyatı farkını geçen ay sayısıyla çarparak indirim toplamını bulur ve üst sınırı aşmamak kaydıyla son faturaya yansıtır. Taksitli cihazın kalan taksitleri ayrıca istenebilir."],
    ["Taşınma ve altyapı olmaması durumunda bedel alınır mı?", "Sabit internet ve ev telefonunda yeni adreste aynı hizmet sunulamıyorsa ve taşınma belgelenirse cayma bedeli alınmaz. Cihaz abonede kalıyorsa cihazın kalan taksitleri yine ödenir; mobil hatlarda taşınma bedelsiz iptal nedeni değildir."],
    ["Operatör değiştirirken numara taşıma bedeli var mı?", "Numara taşıma işleminin kendisi için aboneden ücret alınmaz. Ancak eski operatörde taahhüt sürüyorsa numaranın taşınmasıyla abonelik sona erdiği için üst sınır kuralına göre cayma bedeli istenebilir."],
    ["Hizmet kalitesi düşükse bedelsiz iptal mümkün mü?", "İnternet hızı BTK'nın hizmet kalitesi ölçütlerinin altında kalıyor ve operatör sorunu gideremiyorsa cayma bedeli ödemeden iptal mümkündür. Hız testlerini ve arıza kayıt numaralarını belgelemeniz gerekir."],
    ["İptal başvurusu nasıl ve kaç günde sonuçlanır?", "İptal yazılı, kayıtlı müşteri hizmetleri ya da çevrim içi kanallardan yapılabilir. Operatör ücretlendirmeyi 24 saat içinde durdurmak ve aboneliği en geç 7 gün içinde kapatmak zorundadır; sonrasındaki ücretler istenemez."],
    ["Yıllık abonelik maliyeti taahhütsüz pakete göre nasıl karşılaştırılır?", "Her iki paketin aylık ücretini kullanım süresiyle çarpın, taahhütlü pakete erken iptal riskine göre cayma bedelini ekleyin. Kısa süre kalacaksanız taahhütsüz paket, uzun süre kalacaksanız taahhütlü paket genellikle daha ucuzdur."]
  ],
  tools: ["ay-farki-hesapla", "abonelik-maliyeti-hesapla", "tarih-farki", "yuzde-hesapla"],
  related: ["tuketici-hakem-heyeti-basvuru-siniri-nasil-basvurulur", "dijital-abonelikler-yilda-ne-tutar"],
  sources: [
    ["BTK – Tüketici hakları ve şikâyet", "https://tuketici.btk.gov.tr/"],
    ["Bilgi Teknolojileri ve İletişim Kurumu", "https://www.btk.gov.tr/"]
  ],
  uyari: "hukuki danışmanlık değildir, taahhütnamenizdeki koşullar ve güncel BTK düzenlemesi esas alınır"
};
