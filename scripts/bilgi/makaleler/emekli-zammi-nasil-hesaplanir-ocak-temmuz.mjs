export default {
  slug: "emekli-zammi-nasil-hesaplanir-ocak-temmuz",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Emekli Zammı Nasıl Hesaplanır? 6 Aylık Enflasyon Farkı ve Refah Payı",
  pageTitle: "Emekli Zammı Nasıl Hesaplanır? Ocak ve Temmuz 6 Aylık Enflasyon",
  description: "SSK ve Bağ-Kur emeklisinin zammı 6 aylık TÜFE değişimine, memur emeklisininki toplu sözleşme ve enflasyon farkına göre belirlenir. Ocak 2026 örneği ve adım adım hesap.",
  keywords: ["emekli zammı nasıl hesaplanır", "ssk bağkur emekli zammı", "memur emeklisi zammı", "6 aylık enflasyon farkı", "emekli zammı ocak", "emekli zammı temmuz", "en düşük emekli aylığı", "kümülatif enflasyon", "emekli zammı hesaplama"],
  lead: "SSK ve Bağ-Kur emeklilerinin aylıkları her yıl ocak ve temmuz aylarında, önceki altı ayın <strong>TÜFE değişim oranı</strong> kadar artırılır; yeni aylık, eski aylığın (1 + 6 aylık enflasyon) ile çarpılmasıyla bulunur. Örneğin 2025'in ikinci yarısındaki %12,19'luk enflasyon nedeniyle Ocak 2026'da 18.000 TL alan bir SSK emeklisinin aylığı 20.194,20 TL'ye çıktı. Memur emeklilerinde ise toplu sözleşmedeki zam oranına enflasyon farkı eklenir. Bu sayfada iki hesabı, kümülatif enflasyon mantığını ve en düşük emekli aylığının zamdan nasıl etkilendiğini örneklerle anlatıyoruz.",
  kisaCevap: [
    "SSK (4/a) ve Bağ-Kur (4/b) emeklilerinin zammı, 5510 sayılı Kanun md. 55'e göre önceki 6 ayın TÜFE değişim oranıdır.",
    "Yeni aylık = eski aylık × (1 + 6 aylık enflasyon); Ocak 2026 oranı %12,19'dur.",
    "6 aylık enflasyon aylık oranların toplamı değil, birbirine çarpılmasıyla (kümülatif) bulunur.",
    "Memur emeklilerinde (4/c) zam, toplu sözleşme zammı ile önceki dönemin enflasyon farkının çarpımla birleşimidir.",
    "En düşük emekli aylığı kanunla belirlenen bir tabandır; Ocak 2026'da 16.881 TL'den 20.000 TL'ye çıkarıldı.",
    "Zamlı aylık ocak ve temmuz aylarının ödeme günlerinden itibaren yansır; refah payı ancak ayrı bir yasal düzenlemeyle verilir."
  ],
  figure: {
    alt: "İki zam hesabı yan yana: solda SSK emeklisinin 18.000 TL aylığının yüzde 12,19 ile 20.194,20 TL'ye çıkması; sağda memur emeklisinde yüzde 11 toplu sözleşme zammı ile yüzde 6,85 enflasyon farkının çarpılarak yüzde 18,6 etmesi.",
    caption: "Soldaki hesap Ocak 2026'da açıklanan gerçek oranla yapılmıştır. Sağdaki memur emeklisi örneğinde %5 önceki dönem zammı ve %11 yeni dönem zammı örnek oranlardır; amaç enflasyon farkının nasıl hesaplandığını göstermektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="30" class="lg b mid">SSK ve Bağ-Kur emeklisi</text>
  <rect x="20" y="50" width="320" height="70" rx="10" class="sf sb"/>
  <text x="40" y="78" class="sm mu">Aralık 2025 aylığı</text>
  <text x="40" y="106" class="xl">18.000 TL</text>
  <text x="180" y="146" class="b mid p">× (1 + 0,1219)</text>
  <text x="180" y="166" class="sm mid t2">2025 2. yarı TÜFE: %12,19</text>
  <rect x="20" y="180" width="320" height="70" rx="10" class="p"/>
  <text x="40" y="208" class="sm sf">Ocak 2026 aylığı</text>
  <text x="40" y="236" class="xl sf">20.194,20 TL</text>
  <rect x="20" y="268" width="320" height="64" rx="8" class="ps"/>
  <text x="36" y="294" class="sm b">Taban aylık: 16.881 → 20.000 TL</text>
  <text x="36" y="316" class="sm t2">kök aylığı düşük olana fark tamamlanır</text>
  <line x1="360" y1="44" x2="360" y2="400" class="sb dash" fill="none"/>
  <text x="540" y="30" class="lg b mid">Memur emeklisi (örnek)</text>
  <rect x="380" y="50" width="320" height="56" rx="8" class="sf sb"/>
  <text x="396" y="74" class="sm b">1) Enflasyon farkı</text>
  <text x="396" y="96" class="sm t2">1,1219 ÷ 1,05 − 1 = %6,85</text>
  <rect x="380" y="116" width="320" height="56" rx="8" class="sf sb"/>
  <text x="396" y="140" class="sm b">2) Yeni dönem toplu sözleşme zammı</text>
  <text x="396" y="162" class="sm t2">%11 (örnek)</text>
  <rect x="380" y="182" width="320" height="68" rx="10" class="oks"/>
  <text x="396" y="208" class="sm b">3) Toplam: 1,11 × 1,0685 − 1</text>
  <text x="396" y="238" class="xl">≈ %18,6</text>
  <rect x="380" y="268" width="320" height="64" rx="8" class="sf sb"/>
  <text x="396" y="294" class="sm b">25.000 TL aylık → ≈ 29.650 TL</text>
  <text x="396" y="316" class="sm t2">toplama değil çarpma: %11 + %6,85 ≠ %18,6</text>
  <rect x="20" y="350" width="680" height="50" rx="8" class="dgs"/>
  <text x="360" y="381" class="b mid">6 aylık oran = aylık oranların çarpımı, toplamı değil</text>
</svg>`
  },
  sections: [
    {
      h: "Emekli zammı hangi kurala göre belirlenir?",
      p: [
        "Türkiye'de emekliler aylıklarını bağlı oldukları statüye göre üç gruptan birinden alır: hizmet akdiyle çalışıp emekli olanlar (4/a, eski SSK), kendi adına çalışıp emekli olanlar (4/b, eski Bağ-Kur) ve kamu görevlisi olarak emekli olanlar (4/c, eski Emekli Sandığı). İlk iki grubun zammı doğrudan enflasyona, üçüncü grubun zammı memur maaş artışlarına bağlıdır.",
        "5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu'nun 55. maddesine göre 4/a ve 4/b emeklilerinin aylıkları her yıl ocak ve temmuz aylarında, bir önceki altı aylık dönemdeki <strong>tüketici fiyat endeksi değişim oranı</strong> kadar artırılır. Yani ocak zammı temmuz–aralık enflasyonuna, temmuz zammı ocak–haziran enflasyonuna göre belirlenir. Oranı TÜİK'in açıkladığı aralık ve haziran enflasyon verileri belirler.",
        "Bu kural maaşların enflasyon karşısında korunmasını amaçlar; tek başına reel artış sağlamaz. Hükümet ve Meclis, ayrı bir kanunla enflasyon oranının üzerine <strong>refah payı</strong> ekleyebilir ya da en düşük aylığı yükseltebilir. Bu ek artışlar otomatik değildir ve her dönem ayrıca karara bağlanır."
      ]
    },
    {
      h: "6 aylık enflasyon farkı nasıl hesaplanır?",
      p: [
        "Altı aylık enflasyon, TÜFE endeksinin altı ay içindeki değişimidir. Doğru hesap, dönem sonu endeksini dönem başı endeksine bölmektir: ocak zammı için aralık endeksi ÷ haziran endeksi − 1. Aynı sonuca aylık enflasyon oranlarını birbirine <strong>çarparak</strong> da ulaşırsınız. Aylık oranları toplamak ise sonucu olduğundan düşük gösterir, çünkü her ayın artışı bir önceki ayın artmış fiyatları üzerine gelir."
      ],
      formula: "6 aylık enflasyon = (1 + a₁) × (1 + a₂) × … × (1 + a₆) − 1\nYa da: dönem sonu TÜFE endeksi ÷ dönem başı TÜFE endeksi − 1\nYeni aylık = eski aylık × (1 + 6 aylık enflasyon)",
      table: {
        head: ["Ay", "Aylık enflasyon (örnek)", "Kümülatif çarpan"],
        rows: [
          ["1. ay", "%2,06", "1,0206"],
          ["2. ay", "%2,04", "1,0414"],
          ["3. ay", "%2,97", "1,0723"],
          ["4. ay", "%2,55", "1,0997"],
          ["5. ay", "%0,87", "1,1093"],
          ["6. ay", "%0,89", "1,1191"],
          ["Sonuç", "Toplam: %11,38", "Kümülatif: %11,91"]
        ],
        caption: "Aylık oranlar örnektir. Toplam ile kümülatif arasındaki 0,53 puanlık fark, aylık oranları toplamanın neden yanlış olduğunu gösterir."
      },
      after: [
        "Kendi hesabınızda aylık oranlarla uğraşmak yerine TÜİK'in açıkladığı endeks değerlerini kullanabilir ya da [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracına iki tarih girerek dönemin değişimini görebilirsiniz. Yüzde ile yüzde puan arasındaki farkı [[bilgi:yuzde-puan-ve-yuzde-degisim-farki|yüzde puan ve yüzde değişim]] yazısı açıklıyor."
      ]
    },
    {
      h: "SSK ve Bağ-Kur emeklisi zammını nasıl hesaplar?",
      p: [
        "Hesap üç adımdan oluşur ve SSK ile Bağ-Kur emeklileri için aynıdır. Ocak 2026 zammı, 2025'in temmuz–aralık dönemindeki <strong>%12,19</strong>'luk TÜFE artışına göre belirlendi. Bu oran kök aylığa, yani taban tamamlaması ve ek ödemeler dışındaki asıl aylığa uygulanır."
      ],
      ol: [
        "Zamdan önceki kök aylığınızı bulun. Bunu e-Devlet'teki SGK aylık bilgileri ya da banka ödeme dökümünden öğrenebilirsiniz. Örnek: 18.000 TL.",
        "Altı aylık enflasyonu ondalık sayıya çevirip 1 ekleyin: %12,19 → 1,1219.",
        "Kök aylığı bu çarpanla çarpın: 18.000 × 1,1219 = 20.194,20 TL. Artış tutarı 2.194,20 TL'dir.",
        "Aylığınız kanunla belirlenen en düşük tutarın altında kalıyorsa fark devlet tarafından ayrıca tamamlanır."
      ],
      after: [
        "Aynı hesabı farklı aylıklar için tek tıkla yapmak isterseniz [[arac:zam-orani-hesapla|Zam Oranı Hesaplama]] aracına eski aylığınızı ve oranı girmeniz yeterlidir. Zam sonrası yeni aylığınızın eskiye göre yüzde kaç değiştiğini [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracıyla kontrol edebilirsiniz. Çalışanların maaş zammındaki mantık için [[bilgi:maas-zammi-nasil-hesaplanir|maaş zammı nasıl hesaplanır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Memur emeklisinin zammı neden farklıdır?",
      p: [
        "4/c kapsamındaki memur emeklilerinin aylıkları, çalışan memurların maaş katsayılarına bağlıdır. Memur maaş artışları kamu görevlileri toplu sözleşmesiyle her altı aylık dönem için önceden belirlenir. Dönem sonunda gerçekleşen enflasyon toplu sözleşmedeki zam oranını aşarsa aradaki fark <strong>enflasyon farkı</strong> olarak bir sonraki döneme eklenir.",
        "Enflasyon farkı, iki oranın farkı alınarak değil oranlanarak bulunur: (1 + gerçekleşen enflasyon) ÷ (1 + önceki dönem zammı) − 1. Yeni dönemin toplam zammı da toplu sözleşme zammı ile enflasyon farkının çarpımla birleştirilmesiyle hesaplanır. Örnek oranlarla: önceki dönem zammı %5, gerçekleşen enflasyon %12,19 ise enflasyon farkı 1,1219 ÷ 1,05 − 1 = %6,85 olur. Yeni dönemin toplu sözleşme zammı %11 ise toplam artış 1,11 × 1,0685 − 1 ≈ <strong>%18,6</strong> çıkar.",
        "Bu nedenle memur emeklisinin zammı bazı dönemlerde SSK ve Bağ-Kur emeklisinin zammından yüksek, bazı dönemlerde düşük olabilir. Enflasyon toplu sözleşme oranının altında kalırsa enflasyon farkı oluşmaz; artış yalnızca toplu sözleşmedeki oran kadar olur. Memur maaşı tarafındaki hesabın ayrıntısı için [[rehber:memur-maasi-nasil-hesaplanir|memur maaşı rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "En düşük emekli aylığına zam nasıl yansır?",
      p: [
        "En düşük emekli aylığı, prim günü ya da kazanç düşük olduğu için kök aylığı belirli bir tutarın altında kalan emeklilere devletin fark ödemesiyle sağlanan tabandır. Bu taban 5510 sayılı Kanun'a değil, ayrı kanunlarla yapılan düzenlemelere dayanır ve yasa değişmedikçe otomatik olarak artmaz. Ocak 2026'da taban, Meclis'in kabul ettiği düzenlemeyle 16.881 TL'den 20.000 TL'ye yükseltildi.",
        "Burada önemli bir ayrıntı vardır: enflasyon zammı kök aylığa uygulanır, tamamlanan farka değil. Örneğin kök aylığı 12.000 TL olan ve 16.881 TL'ye tamamlanan bir emeklinin kök aylığı %12,19 zamla 13.462,80 TL olur. Taban yeniden belirlenmeseydi bu kişinin eline geçen tutar yine 16.881 TL'de kalırdı; aylık yalnızca tabanın kendisi artırıldığında yükselir. Kök aylığı 16.881 TL'nin hemen üzerinde olan emekliler ise zamdan sonra 18.938,79 TL'ye çıkar; bu da yeni 20.000 TL tabanın altında kaldığı için onlar da tabana tamamlanır."
      ]
    },
    {
      h: "Zamlı aylık hangi aydan itibaren ödenir?",
      p: [
        "Ocak zammı ocak ayı aylığından, temmuz zammı temmuz ayı aylığından itibaren uygulanır. SSK ve Bağ-Kur aylıkları tahsis numarasının son hanesine göre ayın belirli günlerinde ödenir; zam oranı ayın başında kesinleşmediyse ilk ödeme eski tutarla yapılıp fark sonradan hesaba yatırılabilir. Ocak 2026'da da benzer şekilde taban artışının yasalaşmasına bağlı farklar sonradan ödendi.",
        "Temmuz 2026 zammı, TÜİK'in haziran 2026 enflasyon verisiyle belirlenen ocak–haziran 2026 dönemi değişim oranına göre yapıldı. Güncel oranı TÜİK'in enflasyon bülteninden ve SGK duyurularından kontrol edin; bu sayfadaki hesap yöntemi her dönem için aynıdır, yalnızca oran değişir."
      ]
    },
    {
      h: "Kümülatif enflasyon ile aylık enflasyon farkı nedir?",
      p: [
        "Aylık enflasyon, bir önceki aya göre fiyat değişimidir. Kümülatif enflasyon ise belirli bir başlangıç noktasından bu yana biriken değişimdir; aylık oranların birbirine çarpılmasıyla oluşur. Yıllık enflasyon ise son on iki ayın, geçen yılın aynı ayına göre değişimidir. Emekli zammında kullanılan oran, altı aylık kümülatif değişimdir.",
        "Haber başlıklarında geçen \"aylık %0,89 enflasyon\" ile \"altı aylık %12,19\" farklı şeyleri anlatır; ikisini karşılaştırmak yanıltıcı olur. Paranızın zaman içinde ne kadar değer kaybettiğini anlamak için [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısı yararlı bir başlangıçtır."
      ],
      table: {
        head: ["Kavram", "Neyi ölçer?", "Emekli zammında kullanılır mı?"],
        rows: [
          ["Aylık enflasyon", "Bir önceki aya göre değişim", "Doğrudan hayır"],
          ["6 aylık kümülatif", "Aralık–haziran ya da haziran–aralık arası değişim", "Evet, 4/a ve 4/b zammı"],
          ["Yıllık enflasyon", "Geçen yılın aynı ayına göre değişim", "Hayır"],
          ["12 aylık ortalama", "Son 12 ayın ortalama endeksinin değişimi", "Hayır (kira gibi başka alanlarda)"]
        ]
      }
    },
    {
      h: "Kendi aylığıma düşen zammı nasıl hesaplarım?",
      ol: [
        "Statünüzü belirleyin: 4/a, 4/b ya da 4/c.",
        "Zamdan önceki kök aylığınızı e-Devlet'ten ya da banka dökümünden bulun; ek ödemeler ve taban tamamlaması varsa ayrı not edin.",
        "4/a ve 4/b iseniz TÜİK'in açıkladığı 6 aylık TÜFE değişimini, 4/c iseniz toplu sözleşme zammı ile enflasyon farkını kullanın.",
        "Kök aylığı (1 + oran) ile çarpın; 4/c'de iki oranı çarpımla birleştirin.",
        "Sonucu yürürlükteki en düşük aylık tutarıyla karşılaştırın; altında kalıyorsa ödenecek tutar tabandır.",
        "Bulduğunuz tutarı ilk zamlı ödemede gelen tutarla karşılaştırın; büyük fark görürseniz SGK'ya başvurun."
      ],
      after: [
        "Aylığınızdan yapılan kesintiler (ör. icra, kredi taksiti) ya da ek ödemeler net tutarı değiştirebilir. Emeklilikte toplu ödenen ikramiyenin hesabı ise farklı bir konudur ve [[bilgi:emekli-ikramiyesi-nasil-hesaplanir|emekli ikramiyesi]] yazısında anlatılır."
      ]
    }
  ],
  faq: [
    ["Emekli zammı nasıl hesaplanır?", "SSK ve Bağ-Kur emeklisinde zamdan önceki kök aylık, (1 + önceki 6 ayın TÜFE değişimi) ile çarpılır. Memur emeklisinde ise toplu sözleşme zammı ile enflasyon farkı çarpımla birleştirilip aylığa uygulanır."],
    ["SSK ve Bağ-Kur emeklisinin zammı hangi veriye göre belirlenir?", "5510 sayılı Kanun md. 55'e göre önceki altı aylık dönemin TÜFE değişim oranına göre belirlenir. Ocak zammı temmuz–aralık, temmuz zammı ocak–haziran enflasyonuna dayanır; Ocak 2026 oranı %12,19 olmuştur."],
    ["Memur emeklisinin zammı neden farklıdır?", "Memur emeklilerinin aylıkları memur maaş katsayılarına bağlıdır. Zam, toplu sözleşmede belirlenen oran ile önceki dönemde bu oranı aşan enflasyonun farkından oluşur; bu yüzden SSK ve Bağ-Kur oranından farklı çıkabilir."],
    ["6 aylık enflasyon farkı nasıl hesaplanır?", "Dönem sonundaki TÜFE endeksi dönem başındaki endekse bölünüp 1 çıkarılır. Aynı sonuç altı aylık oranın her biri 1'e eklenip birbiriyle çarpılarak da bulunur; aylık oranları toplamak sonucu düşük gösterir."],
    ["Zamlı aylık hangi aydan itibaren ödenir?", "Ocak zammı ocak aylığından, temmuz zammı temmuz aylığından itibaren uygulanır. Oranın ya da taban düzenlemesinin geç kesinleştiği dönemlerde ilk ödeme eski tutarla yapılıp fark daha sonra hesaba yatırılabilir."],
    ["En düşük emekli aylığına zam nasıl yansır?", "Enflasyon zammı kök aylığa uygulanır, devletin tamamladığı farka değil. Bu yüzden tabandan aylık alanların eline geçen tutar ancak taban kanunla yükseltildiğinde artar; Ocak 2026'da taban 16.881 TL'den 20.000 TL'ye çıkarıldı."],
    ["Kümülatif enflasyon ile aylık enflasyon farkı nedir?", "Aylık enflasyon bir önceki aya göre değişimi, kümülatif enflasyon ise belirli bir dönem boyunca biriken toplam değişimi gösterir. Emekli zammında altı aylık kümülatif oran kullanılır ve aylık oranların çarpımıyla oluşur."],
    ["Kendi aylığıma düşen zammı nasıl hesaplarım?", "Zamdan önceki kök aylığınızı bulun ve statünüze göre 6 aylık TÜFE oranı ya da memur zammı oranıyla çarpın. Sonucu yürürlükteki en düşük aylıkla karşılaştırın; tabanın altında kalıyorsa size taban tutar ödenir."],
    ["18.000 TL alan SSK emeklisi Ocak 2026'da ne kadar aldı?", "Ocak 2026 zammı %12,19 olduğundan 18.000 × 1,1219 = 20.194,20 TL'ye yükseldi. Artış tutarı 2.194,20 TL'dir; ek ödeme ya da kesintiler varsa hesaba geçen net tutar bundan farklı olabilir."]
  ],
  tools: ["enflasyon-hesapla", "zam-orani-hesapla", "yuzde-hesapla", "yuzde-degisim-hesapla"],
  related: ["maas-zammi-nasil-hesaplanir", "enflasyona-gore-paranin-degeri", "yuzde-puan-ve-yuzde-degisim-farki", "emekli-ikramiyesi-nasil-hesaplanir"],
  sources: [
    ["Mevzuat – 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu (md. 55)", "https://www.mevzuat.gov.tr/"],
    ["TÜİK – Tüketici Fiyat Endeksi bültenleri", "https://data.tuik.gov.tr/"],
    ["SGK – Emekli aylıkları duyuruları", "https://www.sgk.gov.tr/"]
  ],
  uyari: "resmî aylık tutarınızı SGK belirler, kişisel durumunuz için SGK'ya başvurun"
};
