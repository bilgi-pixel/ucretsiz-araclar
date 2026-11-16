export default {
  slug: "surtunme-kuvveti-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Sürtünme Kuvveti Nasıl Hesaplanır? Statik ve Kinetik Sürtünme",
  pageTitle: "Sürtünme Kuvveti Formülü: Statik, Kinetik ve Eğik Düzlem",
  description: "Sürtünme kuvveti F = μ·N formülüyle hesaplanır. Statik ve kinetik sürtünme farkı, normal kuvvet, eğik düzlemde sürtünme, katsayı tablosu ve çözümlü örnekler.",
  keywords: ["sürtünme kuvveti formülü", "sürtünme katsayısı", "statik sürtünme", "kinetik sürtünme", "sürtünme kuvveti hesaplama", "eğik düzlemde sürtünme", "normal kuvvet nedir", "sürtünme kuvveti 9. sınıf"],
  lead: "Sürtünme kuvveti, sürtünme katsayısı ile yüzeyin cisme uyguladığı dik tepki kuvvetinin, yani normal kuvvetin çarpımıdır: <strong>F<sub>s</sub> = μ · N</strong>. Yatay zemindeki 20 kg'lık bir kutu için normal kuvvet 20 × 9,81 = 196,2 N'dir; kinetik sürtünme katsayısı 0,3 ise kutu kayarken 58,86 N'luk sürtünme kuvveti oluşur. Bu sayfada statik ve kinetik sürtünme farkını, normal kuvvetin nasıl bulunduğunu, eğik düzlemde sürtünmeyi, sürtünmenin yüzey alanına bağlı olup olmadığını ve tipik katsayıları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Kinetik sürtünme kuvveti F<sub>k</sub> = μ<sub>k</sub> · N; cisim kayarken hareket yönüne zıt etki eder.",
    "Statik sürtünme cisim durgunken oluşur, uygulanan kuvvete eşit büyür ve en fazla μ<sub>s</sub> · N değerine ulaşır.",
    "Yatay zeminde ve dikey kuvvet yokken N = m · g; eğik düzlemde N = m · g · cos θ olur.",
    "Aynı yüzey çifti için statik katsayı genellikle kinetik katsayıdan büyüktür; cismi harekete geçirmek, hareket ettirmekten zordur.",
    "Sürtünme katsayısı birimsizdir; sürtünme kuvvetinin birimi newton (N)'dur.",
    "Basit modelde sürtünme kuvveti temas alanına ve hıza bağlı değildir; yalnızca μ ve N'ye bağlıdır."
  ],
  figure: {
    alt: "Sürtünme kuvveti diyagramı: solda yatay zeminde 20 kg kutu, ağırlık 196,2 N aşağı, normal kuvvet yukarı, 120 N itme sağa, 58,86 N sürtünme sola; sağda 30 derecelik eğik düzlemde 10 kg kutu ve kuvvet bileşenleri.",
    caption: "Soldaki kutu 120 N ile itildiğinde 58,86 N kinetik sürtünme kalır ve net 61,14 N kuvvetle 3,06 m/s² hızlanır. Sağdaki 30°'lik eğik düzlemde normal kuvvet 84,96 N, sürtünme 16,99 N, aşağı yönlü bileşen 49,05 N'dur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="t"/></marker></defs>
  <text x="180" y="30" class="b mid">Yatay zemin: m = 20 kg, μₖ = 0,3</text>
  <line x1="20" y1="250" x2="340" y2="250" class="st sw" fill="none"/>
  <rect x="130" y="170" width="100" height="80" rx="4" class="ps sb"/>
  <text x="180" y="216" class="b mid">20 kg</text>
  <line x1="180" y1="170" x2="180" y2="80" class="sok sw" fill="none" marker-end="url(#ok)"/>
  <text x="188" y="96" class="sm ok b">N = 196,2 N</text>
  <line x1="180" y1="250" x2="180" y2="330" class="sdg sw" fill="none" marker-end="url(#ok)"/>
  <text x="188" y="324" class="sm dg b">G = m·g = 196,2 N</text>
  <line x1="232" y1="210" x2="320" y2="210" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <text x="276" y="200" class="sm mid p b">F = 120 N</text>
  <line x1="128" y1="240" x2="40" y2="240" class="sa sw" fill="none" marker-end="url(#ok)"/>
  <text x="84" y="232" class="sm mid b">fₖ = 58,86 N</text>
  <rect x="20" y="350" width="320" height="56" rx="8" class="sf sb"/>
  <text x="34" y="372" class="sm">Net = 120 − 58,86 = 61,14 N</text>
  <text x="34" y="394" class="sm b">a = 61,14 / 20 ≈ 3,06 m/s²</text>
  <text x="540" y="30" class="b mid">Eğik düzlem: 10 kg, 30°, μₖ = 0,2</text>
  <polygon points="380,320 700,320 380,135" class="sf sb"/>
  <path d="M640 320 A60 60 0 0 0 648 290" class="st" fill="none"/>
  <text x="626" y="308" class="sm">30°</text>
  <g>
    <polygon points="476,190.5 532,222.9 552,188.3 496,155.9" class="ps sb"/>
    <line x1="514" y1="189" x2="554" y2="120" class="sok sw" fill="none" marker-end="url(#ok)"/>
    <text x="560" y="124" class="sm ok b">N = 84,96 N</text>
    <line x1="514" y1="189" x2="584" y2="229" class="sdg sw" fill="none" marker-end="url(#ok)"/>
    <text x="590" y="236" class="sm dg b">49,05 N</text>
    <line x1="474" y1="186" x2="440" y2="166" class="sa sw" fill="none" marker-end="url(#ok)"/>
    <text x="392" y="158" class="sm b">fₖ = 16,99 N</text>
  </g>
  <rect x="380" y="350" width="320" height="56" rx="8" class="sf sb"/>
  <text x="394" y="372" class="sm">Net = 49,05 − 16,99 = 32,06 N (aşağı)</text>
  <text x="394" y="394" class="sm b">a = 32,06 / 10 ≈ 3,21 m/s²</text>
</svg>`
  },
  sections: [
    {
      h: "Sürtünme kuvveti nedir?",
      p: [
        "Sürtünme kuvveti, birbirine temas eden iki yüzey arasında, yüzeylerin birbirine göre kaymasına ya da kaymaya çalışmasına karşı koyan kuvvettir. Her zaman yüzeye paralel ve hareketin (ya da hareket eğiliminin) tersi yönündedir. Gözle düz görünen yüzeyler mikroskop altında pürüzlüdür; bu pürüzlerin birbirine takılması ve temas noktalarındaki moleküller arası çekim sürtünmeyi oluşturur.",
        "Lise fiziğinde, özellikle 9. ve 10. sınıfın kuvvet ve hareket ünitelerinde, sürtünme basit ama çok kullanışlı bir modelle anlatılır: sürtünme kuvveti normal kuvvetle orantılıdır ve orantı sabiti <strong>sürtünme katsayısıdır</strong>. Bu model gerçek dünyayı tam olarak tarif etmez ama günlük problemlerin çoğunda yeterince iyi sonuç verir. Kuvvetin hareketi nasıl değiştirdiğini anlamak için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] yazısı temel oluşturur."
      ]
    },
    {
      h: "Sürtünme kuvveti nasıl hesaplanır? Formül",
      p: [
        "Formül iki büyüklükten oluşur. <strong>μ</strong> (mü), iki yüzeyin cinsine ve durumuna bağlı birimsiz katsayıdır. <strong>N</strong> ise yüzeyin cisme dik olarak uyguladığı tepki kuvvetidir. İkisinin çarpımı sürtünme kuvvetini newton cinsinden verir."
      ],
      formula: "Kinetik sürtünme: fₖ = μₖ · N\nEn büyük statik sürtünme: fₛ,maks = μₛ · N\nYatay zeminde: N = m · g   (g ≈ 9,81 m/s²; okul problemlerinde çoğu zaman 10 alınır)",
      ol: [
        "<strong>Soru:</strong> 20 kg'lık bir kutu yatay zeminde kaymaktadır. Kinetik sürtünme katsayısı 0,3'tür. Sürtünme kuvveti kaç N'dur?",
        "Normal kuvveti bulun: N = m · g = 20 × 9,81 = 196,2 N.",
        "Katsayıyla çarpın: fₖ = 0,3 × 196,2 = <strong>58,86 N</strong>.",
        "g = 10 m/s² kabul edilirse N = 200 N ve fₖ = 60 N bulunur. Sınav sorusunda hangi g değerinin verildiğine dikkat edin."
      ],
      after: [
        "Kütleden ağırlığa geçişi [[arac:kutle-agirlik-hesapla|Kütle Ağırlık Hesaplama]] aracıyla, sürtünme kuvvetini ise [[arac:surtunme-kuvveti-hesapla|Sürtünme Kuvveti Hesaplama]] aracıyla doğrudan bulabilirsiniz. Kütle ile ağırlık arasındaki farkı [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] yazısında ayrıntılı anlattık."
      ]
    },
    {
      h: "Normal kuvvet nedir, her zaman m·g mi?",
      p: [
        "Normal kuvvet, yüzeyin üzerindeki cisme <strong>dik</strong> doğrultuda uyguladığı tepki kuvvetidir. \"Normal\" kelimesi burada \"dik\" anlamındadır. Yatay bir masada duran kitabın ağırlığı masayı aşağı iter, masa da kitabı eşit büyüklükte yukarı iter; bu itme normal kuvvettir.",
        "Normal kuvvet yalnızca en basit durumda ağırlığa eşittir. Cisme eğik bir kuvvet uygulandığında ya da cisim eğik düzlemdeyse farklı olur:"
      ],
      ul: [
        "<strong>Yatay zemin, ek dikey kuvvet yok:</strong> N = m · g.",
        "<strong>Cisim yukarı doğru açılı çekiliyorsa:</strong> Çekme kuvvetinin dikey bileşeni cismi kaldırmaya çalışır; N = m · g − F · sin α. Normal kuvvet azaldığı için sürtünme de azalır. Bavulu yukarı açılı çekmenin itmekten kolay olmasının nedeni budur.",
        "<strong>Cisim aşağı doğru açılı itiliyorsa:</strong> N = m · g + F · sin α; sürtünme artar.",
        "<strong>Üstüne ek yük konursa:</strong> N, toplam ağırlık kadar artar.",
        "<strong>Eğik düzlemde:</strong> N = m · g · cos θ; eğim arttıkça normal kuvvet ve sürtünme azalır."
      ]
    },
    {
      h: "Statik ve kinetik sürtünme farkı nedir?",
      p: [
        "<strong>Statik sürtünme</strong>, cisim henüz hareket etmiyorken oluşur. Ağır bir dolabı itmeye başladığınızda dolap kıpırdamıyorsa, uyguladığınız kuvvete eşit ve zıt bir statik sürtünme kuvveti vardır. Kuvveti artırdıkça statik sürtünme de artar; ancak bir üst sınırı vardır: μₛ · N. Uyguladığınız kuvvet bu sınırı geçtiği anda cisim kaymaya başlar.",
        "<strong>Kinetik sürtünme</strong> ise cisim kayarken etki eder ve basit modelde sabit büyüklüktedir: μₖ · N. Aynı yüzeyler için kinetik katsayı genellikle statik katsayıdan küçüktür. Bu yüzden bir dolabı harekete geçirmek için gereken kuvvet, onu kaydırmaya devam ettirmek için gerekenden büyüktür; dolap bir kez kaymaya başlayınca birden \"hafiflemiş\" gibi gelir."
      ],
      ol: [
        "<strong>Soru:</strong> Aynı 20 kg'lık kutu için μₛ = 0,5 ve μₖ = 0,3'tür. Kutu 80 N ile ve 120 N ile itilirse ne olur?",
        "En büyük statik sürtünme: 0,5 × 196,2 = 98,1 N.",
        "80 N'luk itme 98,1 N'dan küçüktür; kutu hareket etmez ve statik sürtünme tam 80 N olur (98,1 N değil).",
        "120 N'luk itme sınırı aşar; kutu kaymaya başlar ve sürtünme kinetik değere düşer: 58,86 N.",
        "Net kuvvet 120 − 58,86 = 61,14 N, ivme a = F / m = 61,14 / 20 ≈ <strong>3,06 m/s²</strong>."
      ],
      after: [
        "Statik sürtünmenin \"gerektiği kadar\" olduğunu unutmamak önemlidir: kutu durgunken sürtünmeyi μₛ · N ile hesaplamak en sık yapılan hatadır. Net kuvvetten ivme bulmak için [[arac:kuvvet-hesapla|Kuvvet Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sürtünme katsayısı nedir? Tipik değerler",
      p: [
        "Sürtünme katsayısı, yüzeylerin malzemesine, pürüzlülüğüne, temizliğine, nem ve yağlanma durumuna bağlıdır. Sabit bir doğa sabiti değildir; aynı malzeme çifti için kaynaktan kaynağa farklı değerler görülebilir. Aşağıdaki değerler ders kitaplarında ve mühendislik tablolarında yaygın kullanılan <strong>yaklaşık</strong> değerlerdir."
      ],
      table: {
        head: ["Yüzey çifti", "Statik μₛ (yaklaşık)", "Kinetik μₖ (yaklaşık)"],
        rows: [
          ["Lastik – kuru beton", "1,0", "0,8"],
          ["Lastik – ıslak beton", "0,3 – 0,7", "0,25 – 0,5"],
          ["Ahşap – ahşap", "0,25 – 0,5", "0,2"],
          ["Çelik – çelik (kuru)", "0,7", "0,6"],
          ["Çelik – çelik (yağlı)", "0,1", "0,05"],
          ["Cam – cam", "0,9", "0,4"],
          ["Buz – buz", "0,1", "0,03"],
          ["Teflon – teflon", "0,04", "0,04"]
        ],
        caption: "Değerler yüzey durumuna göre geniş aralıkta değişir; gerçek tasarım hesaplarında ölçülmüş değer kullanılmalıdır."
      },
      after: [
        "Katsayının 1'den büyük olması mümkündür: bu, sürtünme kuvvetinin normal kuvvetten büyük olabileceği anlamına gelir ve özellikle yumuşak lastik ile pürüzlü yüzeyler arasında görülür."
      ]
    },
    {
      h: "Eğik düzlemde sürtünme nasıl bulunur?",
      p: [
        "Eğik düzlemde ağırlık iki bileşene ayrılır: yüzeye dik olan m · g · cos θ bileşeni normal kuvveti belirler, yüzeye paralel olan m · g · sin θ bileşeni ise cismi aşağı kaydırmaya çalışır. Sürtünme, hareket yönünün tersine, yani cisim aşağı kayıyorsa yukarı doğru etki eder."
      ],
      formula: "N = m · g · cos θ\nfₖ = μₖ · m · g · cos θ\nAşağı kayan cismin ivmesi: a = g · (sin θ − μₖ · cos θ)\nCisim kendiliğinden kaymaya başlar: tan θ > μₛ",
      ol: [
        "<strong>Soru:</strong> 10 kg'lık bir kutu 30°'lik eğik düzlemden kayıyor, μₖ = 0,2. İvmesi nedir?",
        "Normal kuvvet: N = 10 × 9,81 × cos 30° = 98,1 × 0,866 ≈ 84,96 N.",
        "Sürtünme: fₖ = 0,2 × 84,96 ≈ 16,99 N (yukarı yönde).",
        "Aşağı yönlü bileşen: 10 × 9,81 × sin 30° = 98,1 × 0,5 = 49,05 N.",
        "Net kuvvet: 49,05 − 16,99 = 32,06 N; ivme a = 32,06 / 10 ≈ <strong>3,21 m/s²</strong>. Kısa formülle de g · (0,5 − 0,2 × 0,866) ≈ 3,21 m/s² bulunur."
      ],
      after: [
        "Cismin kendi kendine kaymaya başladığı açıya <strong>sürtünme açısı</strong> denir ve tan θ = μₛ ile bulunur. μₛ = 0,5 ise bu açı yaklaşık 26,6°'dir; daha dik eğimlerde cisim duramaz. Kuvvet bileşenlerini [[arac:egik-duzlem-hesapla|Eğik Düzlem Hesaplama]] aracıyla görebilirsiniz. Sinüs ve kosinüs değerlerini tazelemek için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosuna]] göz atın."
      ]
    },
    {
      h: "Sürtünme kuvveti yüzey alanına bağlı mı?",
      p: [
        "Basit sürtünme modelinde hayır. Bir tuğlayı geniş yüzeyi ya da dar yüzeyi üzerinde kaydırdığınızda sürtünme kuvveti yaklaşık aynıdır. Bunun nedeni, gerçek temasın görünen yüzeyin tamamında değil, pürüzlerin uçlarındaki küçük noktalarda olmasıdır. Geniş yüzeyde temas noktası çok ama her biri az bastırılır; dar yüzeyde temas noktası az ama her biri daha çok bastırılır. Toplam gerçek temas alanı ve sürtünme yaklaşık aynı kalır.",
        "Bu kural sert ve kuru yüzeyler için iyi çalışır. Yumuşak lastik, yapışkan yüzeyler, akışkan sürtünmesi (hava ve su direnci) ya da çok yüksek hızlar söz konusu olduğunda alan ve hız etkili olabilir. Araç lastiklerinin genişliği bu yüzden yalnızca sürtünme katsayısıyla değil, ısınma, aşınma ve su tahliyesi gibi başka etkenlerle de ilgilidir."
      ]
    },
    {
      h: "Sürtünme hangi durumlarda faydalı, hangilerinde zararlıdır?",
      ul: [
        "<strong>Yürümek:</strong> Ayağınız zemini geriye iter, statik sürtünme sizi ileri iter. Buzda yürümenin zorluğu sürtünmenin azlığındandır.",
        "<strong>Fren ve yol tutuşu:</strong> Aracın en fazla yavaşlama ivmesi yaklaşık μ · g'dir; μ = 0,7 için yaklaşık 6,87 m/s². Islak ve buzlu yolda μ düştüğü için fren mesafesi uzar; ayrıntılar [[bilgi:fren-mesafesi-nasil-hesaplanir|fren mesafesi]] yazısındadır.",
        "<strong>Vida, çivi ve düğümler:</strong> Bağlantıları yerinde tutan şey sürtünmedir.",
        "<strong>Zararlı yönü:</strong> Makine parçalarında enerji kaybına, ısınmaya ve aşınmaya yol açar. Yağlama, rulman ve düzgün yüzeyler bu yüzden kullanılır.",
        "<strong>Isı üretimi:</strong> Ellerinizi ovuşturduğunuzda ısınmanız, sürtünme işinin ısıya dönüşmesidir."
      ]
    },
    {
      h: "Sürtünme kuvvetinin birimi ve sık yapılan hatalar",
      p: [
        "Sürtünme bir kuvvet olduğu için SI birimi <strong>newton (N)</strong>'dur: 1 N = 1 kg · m/s². Sürtünme katsayısı ise iki kuvvetin oranı olduğu için birimsizdir."
      ],
      ul: [
        "<strong>Kütleyi kuvvet yerine kullanmak:</strong> μ · m değil μ · m · g yazılmalıdır; 0,3 × 20 = 6 \"newton\" değildir.",
        "<strong>Durgun cisimde sürtünmeyi μₛ · N almak:</strong> Statik sürtünme uygulanan kuvvete eşittir; μₛ · N yalnızca üst sınırdır.",
        "<strong>Eğik düzlemde N = m · g yazmak:</strong> Doğrusu m · g · cos θ'dır.",
        "<strong>Sürtünmenin yönünü yanlış almak:</strong> Sürtünme her zaman göreli hareketin ya da hareket eğiliminin tersinedir.",
        "<strong>Açılı çekmede normal kuvveti değiştirmemek:</strong> Kuvvetin dikey bileşeni normal kuvveti azaltır ya da artırır."
      ]
    }
  ],
  faq: [
    ["Sürtünme kuvveti nasıl hesaplanır?", "Sürtünme kuvveti, sürtünme katsayısı ile normal kuvvetin çarpılmasıyla bulunur: F = μ·N. Yatay zemindeki 20 kg'lık kutu için normal kuvvet 196,2 N, katsayı 0,3 ise kinetik sürtünme kuvveti 58,86 newton olur."],
    ["Sürtünme katsayısı nedir?", "Sürtünme katsayısı, sürtünme kuvvetinin normal kuvvete oranıdır ve birimsizdir. Yüzeylerin malzemesine, pürüzlülüğüne, nemine ve yağlanmasına bağlıdır; lastik ile kuru beton arasında yaklaşık 0,8, buz ile buz arasında yaklaşık 0,03 gibi değerler alır."],
    ["Statik ve kinetik sürtünme farkı nedir?", "Statik sürtünme cisim durgunken oluşur ve uygulanan kuvvete eşit büyür, en fazla μs·N olur. Kinetik sürtünme cisim kayarken etki eder ve μk·N'ye eşittir; aynı yüzeylerde kinetik katsayı genellikle statik katsayıdan küçüktür."],
    ["Sürtünme kuvveti yüzey alanına bağlı mı?", "Kuru ve sert yüzeyler için kullanılan basit modelde sürtünme kuvveti temas alanına bağlı değildir, yalnızca katsayıya ve normal kuvvete bağlıdır. Yumuşak lastik, yapışkan yüzeyler ve akışkan direncinde alanın etkisi ortaya çıkabilir."],
    ["Eğik düzlemde sürtünme nasıl bulunur?", "Eğik düzlemde normal kuvvet m·g·cos θ olduğundan sürtünme μ·m·g·cos θ ile hesaplanır. 30 derecelik eğimde 10 kg'lık kutu ve 0,2 katsayı için sürtünme yaklaşık 16,99 N, kayma ivmesi yaklaşık 3,21 m/s² bulunur."],
    ["Normal kuvvet nedir?", "Normal kuvvet, yüzeyin üzerindeki cisme dik doğrultuda uyguladığı tepki kuvvetidir. Yatay zeminde ve ek dikey kuvvet yokken ağırlığa eşittir; eğik düzlemde, açılı çekmede ya da ek yük konduğunda ağırlıktan farklı olur."],
    ["Sürtünme hangi durumlarda faydalıdır?", "Yürümemizi, araçların fren yapıp yolu tutmasını, vidaların ve düğümlerin yerinde kalmasını sağlar. Sürtünme olmasaydı buzda olduğu gibi ilerlemek ve durmak çok zorlaşırdı; makinelerde ise ısınma ve aşınmaya yol açtığı için azaltılmaya çalışılır."],
    ["Sürtünme kuvvetinin birimi nedir?", "Sürtünme kuvveti bir kuvvet olduğu için SI birimi newtondur ve 1 N, 1 kg·m/s²'ye eşittir. Sürtünme katsayısı ise iki kuvvetin oranı olduğundan herhangi bir birime sahip değildir."],
    ["Bir cisim eğik düzlemde hangi açıda kaymaya başlar?", "Cisim, eğim açısının tanjantı statik sürtünme katsayısını aştığında kendiliğinden kaymaya başlar. Statik katsayı 0,5 olan bir yüzeyde bu sınır açı yaklaşık 26,6 derecedir; daha dik eğimlerde cisim yerinde duramaz."]
  ],
  tools: ["surtunme-kuvveti-hesapla", "kuvvet-hesapla", "egik-duzlem-hesapla", "kutle-agirlik-hesapla"],
  related: ["newtonun-hareket-yasalari", "kutle-ve-agirlik-farki", "fren-mesafesi-nasil-hesaplanir", "basit-makineler-kaldirac-makara"],
  sources: [
    ["MEB – Ortaöğretim fizik öğretim programı", "https://tymm.meb.gov.tr/"],
    ["NIST – Standart yerçekimi ivmesi (g = 9,80665 m/s²)", "https://physics.nist.gov/cuu/Constants/"]
  ]
};
