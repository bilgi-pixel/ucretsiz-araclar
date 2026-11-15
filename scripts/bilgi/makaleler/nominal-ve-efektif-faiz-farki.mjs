export default {
  slug: "nominal-ve-efektif-faiz-farki",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Nominal ve Efektif Faiz Nedir? Aylık Faiz Yıllığa Nasıl Çevrilir",
  pageTitle: "Nominal ve Efektif Faiz Farkı: Aylık Faizi Yıllığa Çevirme",
  description: "Aylık %4 faiz nominal olarak yıllık %48, efektif olarak %60,10 eder. Efektif faiz formülü, dönüşüm tablosu, kredi kartı ve mevduat örnekleri, yıllık maliyet oranı.",
  keywords: ["efektif faiz nedir", "nominal faiz nedir", "aylık faiz yıllık faize çevirme", "yıllık bileşik faiz oranı", "aylık yüzde 4 faiz yıllık kaç", "efektif faiz hesaplama", "yıllık maliyet oranı", "kredi kartı faizi yıllık"],
  lead: "Nominal faiz, dönemsel faiz oranının yıldaki dönem sayısıyla <strong>basitçe çarpılmasıyla</strong> bulunan ilan oranıdır; efektif faiz ise faizin faize eklendiği, yani <strong>bileşik</strong> hesaplanan gerçek yıllık getiri ya da maliyettir. Örneğin aylık %4 faiz nominal olarak yıllık %48 eder, ama her ay faiz anaparaya eklendiğinde bir yılın sonunda gerçek maliyet %60,10'a ulaşır. Kredi, kredi kartı ve mevduat tekliflerini doğru karşılaştırmak için efektif orana bakmanız gerekir. Aşağıda formülü, dönüşüm tablosunu ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Nominal yıllık faiz = dönemsel faiz × yıldaki dönem sayısı; aylık %4 × 12 = %48.",
    "Efektif yıllık faiz = (1 + dönemsel faiz)<sup>dönem sayısı</sup> − 1; aylık %4 için 1,04<sup>12</sup> − 1 = %60,10.",
    "Nominal yıllık orandan efektif orana: (1 + nominal ÷ m)<sup>m</sup> − 1; m yıllık bileşik sayısıdır.",
    "Yıllık efektif orandan aylık orana: (1 + yıllık)<sup>1/12</sup> − 1; yıllık %50 aylık yaklaşık %3,44 eder.",
    "Bileşik sıklığı arttıkça efektif oran yükselir, ancak bir üst sınıra yaklaşır.",
    "Kredilerde gerçek maliyeti faiz, vergi ve masrafları birlikte gösteren yıllık maliyet oranı yansıtır."
  ],
  figure: {
    alt: "100.000 TL'nin aylık yüzde 4 faizle bir yıl içindeki büyümesi: basit faizle 148.000 TL, bileşik faizle 160.103 TL; aradaki fark 12.103 TL faizin faizidir.",
    caption: "Aynı aylık %4 oranla 100.000 TL. Kesikli çizgi basit (nominal) hesabı, kalın çizgi her ay faizin anaparaya eklendiği bileşik (efektif) hesabı gösterir. Fark ilk aylarda küçüktür, zamanla açılır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aylık %4 faiz: nominal %48 mi, efektif %60 mı?</text>
  <line x1="80" y1="350" x2="680" y2="350" class="st" fill="none"/>
  <line x1="80" y1="70" x2="80" y2="350" class="st" fill="none"/>
  <text x="72" y="354" class="sm end mu">100 bin</text>
  <text x="72" y="244" class="sm end mu">130 bin</text>
  <text x="72" y="134" class="sm end mu">160 bin</text>
  <line x1="80" y1="240" x2="680" y2="240" class="sb dash" fill="none"/>
  <line x1="80" y1="130" x2="680" y2="130" class="sb dash" fill="none"/>
  <g class="sm mid mu"><text x="80" y="372">0</text><text x="230" y="372">3. ay</text><text x="380" y="372">6. ay</text><text x="530" y="372">9. ay</text><text x="680" y="372">12. ay</text></g>
  <polyline points="80,350 230,306 380,262 530,218 680,174" class="st sw dash" fill="none"/>
  <polyline points="80,350 130,335 180,320 230,304 280,288 330,271 380,253 430,234 480,215 530,195 580,174 630,152 680,130" class="sp sw" fill="none"/>
  <circle cx="680" cy="130" r="6" class="p"/>
  <circle cx="680" cy="174" r="6" class="t2"/>
  <rect x="440" y="66" width="200" height="44" rx="8" class="ps"/>
  <text x="540" y="86" class="sm mid b">Bileşik: 160.103 TL</text>
  <text x="540" y="102" class="sm mid">Efektif yıllık %60,10</text>
  <rect x="470" y="190" width="200" height="44" rx="8" class="sf sb"/>
  <text x="570" y="210" class="sm mid b">Basit: 148.000 TL</text>
  <text x="570" y="226" class="sm mid">Nominal yıllık %48</text>
  <rect x="80" y="386" width="600" height="28" rx="6" class="p"/>
  <text x="380" y="405" class="sm mid b sf">Fark 12.103 TL = faizin faizi · 1,04¹² − 1 = 0,6010</text>
</svg>`
  },
  sections: [
    {
      h: "Nominal faiz ve efektif faiz nedir?",
      p: [
        "<strong>Nominal faiz</strong>, bir finansal ürünün ilan edilen faiz oranıdır. Bankalar çoğu zaman aylık oran ilan eder; aylık oranın 12 ile çarpılmasıyla bulunan yıllık değer de nominal yıllık faizdir. Bu hesap, faizin her dönem sonunda çekildiği ve anaparaya eklenmediği basit faiz varsayımına dayanır.",
        "<strong>Efektif faiz</strong> ise faizin dönem sonlarında anaparaya eklendiği, sonraki dönemde de bu büyüyen tutara faiz işlediği durumda gerçekleşen yıllık orandır. Krediler aylık taksitle ödendiği, kredi kartı borçları her ay faize faiz eklediği ve mevduatlar vade sonunda yenilendiği için gerçek hayattaki maliyet ya da getiri genellikle efektif orana yakındır.",
        "Bu iki kavram arasındaki fark, [[bilgi:bilesik-faiz-nedir|bileşik faiz]] etkisinden doğar. Dönemsel oran ne kadar yüksekse ve bileşik ne kadar sık yapılıyorsa nominal ile efektif oran arasındaki fark o kadar büyür. Düşük oranlarda fark küçük kalır; Türkiye gibi faizlerin yüksek olduğu ortamlarda ise fark onlarca puana ulaşabilir. Bu yüzden aynı ürün için iki farklı \"yıllık faiz\" rakamı duyduğunuzda, önce hangisinin basit hangisinin bileşik hesap olduğunu sormanız gerekir."
      ]
    },
    {
      h: "Efektif faiz formülü",
      p: [
        "Dönüşüm için tek bir temel formül yeterlidir. Dönemsel oranı ondalık sayıya çevirin (%4 = 0,04), bire ekleyin, yıldaki dönem sayısı kadar kuvvetini alın ve sonuçtan 1 çıkarın."
      ],
      formula: "Efektif yıllık faiz = (1 + i)<sup>m</sup> − 1   (i: dönemsel oran, m: yıldaki dönem sayısı)\nNominal yıllıktan: Efektif = (1 + r ÷ m)<sup>m</sup> − 1   (r: nominal yıllık oran)\nYıllık efektiften aylığa: i = (1 + Efektif)<sup>1/12</sup> − 1\nNominal yıllık = i × m",
      after: [
        "Formülde m; aylık bileşik için 12, üç aylık için 4, günlük için 365'tir. Örneğin nominal yıllık %40'lık bir oran aylık bileşiklenirse (1 + 0,40 ÷ 12)<sup>12</sup> − 1 = %48,21, günlük bileşiklenirse %49,15 efektif orana karşılık gelir. Bileşik sıklığı sonsuza giderken üst sınır e<sup>0,40</sup> − 1 = %49,18'dir; yani günlük bileşik ile sürekli bileşik arasında pratikte fark kalmaz.",
        "Bu hesapları hızlıca yapmak için [[arac:aylik-yillik-faiz-cevir|Aylık Faizi Yıllık Faize Çevirme]] aracı basit ve bileşik karşılıkları yan yana gösterir. Nominal yıllık oranı farklı bileşik sıklıklarıyla karşılaştırmak için [[arac:efektif-faiz-hesapla|Efektif Faiz Oranı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Aylık %4 faiz yıllık kaç yapar? Adım adım çözüm",
      p: [
        "Bu, en sık sorulan dönüşümdür. 100.000 TL borcunuz olduğunu ve her ay %4 faiz işlediğini, yıl boyunca hiç ödeme yapmadığınızı varsayalım."
      ],
      ol: [
        "<strong>Nominal yıllık oran:</strong> 4 × 12 = %48. Basit faizle bir yıl sonra borç 100.000 × 1,48 = 148.000 TL olurdu.",
        "<strong>Birinci ay:</strong> 100.000 × 1,04 = 104.000 TL.",
        "<strong>İkinci ay:</strong> 104.000 × 1,04 = 108.160 TL. Bu ay faiz 4.000 değil 4.160 TL'dir; fazladan 160 TL, ilk ayın faizine işleyen faizdir.",
        "<strong>On ikinci ay:</strong> 100.000 × 1,04<sup>12</sup> = 100.000 × 1,601032 = 160.103,22 TL.",
        "<strong>Efektif yıllık oran:</strong> (160.103,22 − 100.000) ÷ 100.000 = %60,10.",
        "<strong>Fark:</strong> 160.103,22 − 148.000 = 12.103,22 TL. Nominal oranla düşünen biri borcunun maliyetini bu kadar eksik hesaplar."
      ],
      after: [
        "Ters yönde soru da sıkça sorulur: yıllık %50 efektif getiri hedefliyorsanız aylık kaç faiz gerekir? (1,50)<sup>1/12</sup> − 1 = %3,44. Bu oran, 50 ÷ 12 = %4,17 ile bulunan basit sonuçtan belirgin biçimde düşüktür. Mevduatlarda enflasyonun ardından kalan gerçek getiriyi görmek için ise [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz nedir]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Aylık faizden yıllık faize dönüşüm tablosu",
      p: [
        "Aşağıdaki tablo, sık karşılaşılan aylık oranların nominal ve efektif yıllık karşılıklarını gösterir. Oran yükseldikçe iki sütun arasındaki farkın nasıl büyüdüğüne dikkat edin."
      ],
      table: {
        head: ["Aylık faiz", "Nominal yıllık (× 12)", "Efektif yıllık (bileşik)", "Fark (puan)"],
        rows: [
          ["%1", "%12", "%12,68", "0,68"],
          ["%2", "%24", "%26,82", "2,82"],
          ["%3", "%36", "%42,58", "6,58"],
          ["%3,5", "%42", "%51,11", "9,11"],
          ["%4", "%48", "%60,10", "12,10"],
          ["%5", "%60", "%79,59", "19,59"]
        ],
        caption: "Efektif oran (1 + aylık oran)¹² − 1 ile hesaplanmıştır; vergi ve masraflar dahil değildir."
      }
    },
    {
      h: "Kredi kartı ve kredilerde efektif maliyet",
      p: [
        "Kredi kartı borcunda ilan edilen aylık akdi faiz oranının üzerine yasal vergiler de eklenir. Bireysel kredi kartı ve ihtiyaç kredisi faizlerinde faiz tutarı üzerinden Banka ve Sigorta Muameleleri Vergisi (BSMV) ile Kaynak Kullanımını Destekleme Fonu (KKDF) kesintisi alınır; ikisi %15'er olduğunda faizin 1,30 katı ödenir. Konut kredisi gibi bazı ürünler bu kesintilerden muaftır; oranlar değişebileceği için güncel durumu bankanızdan teyit edin.",
        "Örnek: aylık akdi faiz %3,5 olan bir kartta vergilerle birlikte aylık maliyet 3,5 × 1,30 = %4,55 olur. Borç bir yıl boyunca ödenmeden büyürse efektif yıllık maliyet 1,0455<sup>12</sup> − 1 ≈ %70,56'ya ulaşır. Bu rakam, kart ekstresinde görülen aylık oranla kıyaslandığında şaşırtıcı derecede yüksektir. Asgari ödeme yaparak borcu taşımanın neden pahalı olduğunu bu hesap açıkça gösterir."
      ],
      after: [
        "Kredilerde bankalar, sözleşme öncesi bilgi formunda <strong>yıllık maliyet oranını</strong> göstermek zorundadır. Bu oran faizin yanında vergileri, dosya masrafı ve sigorta gibi zorunlu kalemleri de kapsar ve teklifleri karşılaştırırken en doğru ölçüttür. Aynı aylık faizi ilan eden iki bankadan biri yüksek dosya masrafı alıyorsa, yıllık maliyet oranı farkı hemen ortaya çıkarır. Kredi taksitlerinin nasıl hesaplandığını görmek için [[rehber:kredi-faizi-nasil-hesaplanir|kredi faizi nasıl hesaplanır]] rehberine bakabilirsiniz."
      ]
    },
    {
      h: "Mevduatta efektif getiri nasıl bulunur?",
      p: [
        "Mevduat faizleri genellikle yıllık nominal oran olarak ilan edilir ve vadeye göre faiz işler. 32 günlük vadede faiz, yıllık oranın 32/365'i kadardır. Vade sonunda anapara ve faiz yeniden yatırıldığında bileşik etki devreye girer."
      ],
      formula: "Vade başına getiri = Yıllık nominal oran × vade günü ÷ 365\nEfektif yıllık getiri = (1 + vade başına getiri)<sup>365 ÷ vade günü</sup> − 1",
      after: [
        "Örnek: yıllık nominal %40, 32 gün vadeli bir hesapta vade başına getiri 0,40 × 32 ÷ 365 = %3,507'dir. Yılda yaklaşık 11,4 vade dönüşü olduğundan efektif getiri (1,03507)<sup>11,406</sup> − 1 ≈ %48 civarındadır. Mevduat faizinden stopaj kesildiği için net getiri bu hesabı net vade getirisiyle tekrarlayarak bulunur. Stopaj oranları vade ve ürüne göre değiştiği için güncel oranı bankanızdan öğrenin. Birikimin yıllar içindeki büyümesini görmek için [[arac:bilesik-faiz-hesapla|Bileşik Faiz Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Bankalar neden aylık faiz ilan eder?",
      p: [
        "Aylık oran hem kredi taksitlerinin aylık ödenmesiyle uyumludur hem de tüketicinin aklında küçük bir sayı olarak kalır. \"Aylık %3,5\" ifadesi, \"yıllık efektif %51\" ifadesine göre daha az ürkütücüdür. Bu nedenle tüketici mevzuatı, ilan edilen orana ek olarak yıllık maliyet oranının da gösterilmesini şart koşar.",
        "Karşılaştırma yaparken altın kural şudur: farklı sıklıkta ilan edilmiş oranları önce aynı tabana, tercihen yıllık efektif orana çevirin. Aylık oranla ilan edilen bir krediyi yıllık oranla ilan edilen bir yatırım getirisiyle doğrudan kıyaslamak yanıltıcıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Aylık oranı 12 ile çarpıp gerçek maliyet sanmak:</strong> Bu yalnızca nominal orandır; bileşik maliyet her zaman daha yüksektir.",
        "<strong>Yıllık oranı 12'ye bölüp aylık oran bulmak:</strong> Efektif yıllık orandan aylığa geçerken 12. dereceden kök alınmalıdır.",
        "<strong>Vergileri unutmak:</strong> Kredi kartı ve ihtiyaç kredisinde faize eklenen vergiler maliyeti yaklaşık %30 artırır.",
        "<strong>Masrafları hesaba katmamak:</strong> Dosya masrafı ve sigorta, faizi düşük görünen bir krediyi pahalı hâle getirebilir; yıllık maliyet oranına bakın.",
        "<strong>Yüzde ile puanı karıştırmak:</strong> %40'tan %48'e çıkış 8 puanlık, ama %20'lik bir artıştır.",
        "<strong>Erken ödemeyi hesaba katmamak:</strong> Efektif oran, faizin dönem boyunca anaparaya eklendiğini varsayar. Borcu her ay düzenli kapatıyorsanız faize faiz işlemez ve gerçek maliyetiniz daha düşük kalır."
      ],
      after: [
        "Kısacası nominal oran bir ürünün vitrindeki etiketi, efektif oran ise kasada ödenen tutardır. Teklifleri karşılaştırırken hepsini aynı tabana çevirmek, yalnızca birkaç saniyelik bir hesapla yüzlerce hatta binlerce liralık farkı görmenizi sağlar. Enflasyonun bu getiriden ne kadarını götürdüğünü merak ediyorsanız son adım olarak [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracına efektif oranı ve beklenen enflasyonu girin; çıkan sonuç paranızın satın alma gücündeki gerçek değişimdir."
      ]
    }
  ],
  faq: [
    ["Nominal faiz ile efektif faiz arasındaki fark nedir?", "Nominal faiz, dönemsel oranın yıldaki dönem sayısıyla basitçe çarpılmasıyla bulunan ilan oranıdır. Efektif faiz ise faizin her dönem anaparaya eklendiği bileşik hesapla gerçekleşen yıllık orandır ve dönemsel oran pozitifse her zaman nominal orandan yüksektir."],
    ["Aylık faiz yıllık faize nasıl çevrilir?", "Nominal karşılık için aylık oran 12 ile çarpılır. Efektif karşılık için aylık oran ondalığa çevrilip bire eklenir, 12. kuvveti alınır ve 1 çıkarılır. Aylık %3 için nominal %36, efektif %42,58 bulunur."],
    ["Aylık %4 faiz yıllık kaç yapar?", "Aylık %4 faiz nominal olarak yıllık %48 eder. Faiz her ay anaparaya eklenirse 1,04 üzeri 12 eksi 1 formülüyle efektif yıllık oran %60,10 olur. 100.000 TL bir yılda 160.103 TL'ye ulaşır."],
    ["Efektif faiz nasıl hesaplanır?", "Efektif yıllık faiz, bir artı dönemsel oranın dönem sayısı kadar kuvvetinden bir çıkarılarak hesaplanır. Nominal yıllık oran biliniyorsa önce bileşik sayısına bölünür, sonra aynı formül uygulanır."],
    ["Kredi kartı faizi yıllık ne kadar ediyor?", "Aylık akdi faizin üzerine BSMV ve KKDF eklenir; ikisi %15'er olduğunda aylık maliyet faizin 1,30 katıdır. Örneğin aylık %3,5 faiz vergilerle %4,55 olur ve borç bir yıl taşınırsa efektif yıllık maliyet yaklaşık %70,56'ya çıkar."],
    ["Bankalar neden aylık faiz ilan eder?", "Krediler ve kart borçları aylık ödendiği için aylık oran ödeme planıyla uyumludur ve daha kolay anlaşılır. Ancak yıllık maliyeti düşük gösterdiği için mevzuat, kredilerde yıllık maliyet oranının da ayrıca gösterilmesini zorunlu tutar."],
    ["Mevduatta efektif getiri nasıl bulunur?", "Önce yıllık nominal oran vade gününe göre orantılanarak vade başına getiri bulunur. Ardından bir artı bu getirinin, yıldaki vade sayısı kadar kuvveti alınıp 1 çıkarılır. Net getiri için stopaj düşülmüş vade getirisi kullanılır."],
    ["Yıllık maliyet oranı nedir?", "Yıllık maliyet oranı, bir kredinin faizine ek olarak vergileri, dosya masrafını ve zorunlu sigorta gibi kalemleri de içeren toplam yıllık maliyetidir. Farklı bankaların kredi tekliflerini karşılaştırmak için en güvenilir göstergedir."]
  ],
  tools: ["aylik-yillik-faiz-cevir", "efektif-faiz-hesapla", "bilesik-faiz-hesapla", "reel-faiz-hesapla"],
  related: ["bilesik-faiz-nedir", "reel-faiz-nedir-nasil-hesaplanir", "kredi-erken-kapama-nasil-hesaplanir"],
  sources: [
    ["Türkiye Cumhuriyet Merkez Bankası – Kredi kartı azami faiz oranları", "https://www.tcmb.gov.tr/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"]
  ],
  uyari: "örnek oranlar temsilîdir, yatırım tavsiyesi değildir; güncel oran ve masraflar için bankanızın sözleşme öncesi bilgi formuna bakın"
};
