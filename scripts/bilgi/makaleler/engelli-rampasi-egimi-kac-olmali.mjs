export default {
  slug: "engelli-rampasi-egimi-kac-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Engelli Rampası Eğimi Kaç Olmalı? Yüzde, Derece ve Rampa Uzunluğu Hesabı",
  pageTitle: "Engelli Rampası Eğimi Kaç Olmalı? Yüzde, Derece ve Uzunluk",
  description: "Rampa eğimi aşılan yüksekliğe göre %10'dan %6'ya iner; 51–100 cm için en fazla %8. Uzunluk hesabı, derece çevirme, 9 metrede sahanlık, genişlik ve küpeşte ölçüleri.",
  keywords: ["engelli rampası eğimi", "rampa eğimi yüzde kaç", "rampa uzunluğu hesaplama", "yüzde 8 eğim", "rampa eğimi derece", "tekerlekli sandalye rampası", "rampa sahanlık", "TS 9111 rampa"],
  lead: "Engelli rampasında izin verilen eğim, aşılan yüksekliğe göre değişir: Aile ve Sosyal Hizmetler Bakanlığı'nın TS 9111'e dayanan erişilebilirlik denetim formuna göre mevcut binalarda <strong>15 cm'ye kadar %10</strong>, <strong>16–50 cm için %9</strong>, <strong>51–100 cm için %8</strong>, <strong>100 cm'yi aşan yüksekliklerde %6</strong> en yüksek eğimdir. Rampa uzunluğu, yüksekliğin eğim oranına bölünmesiyle bulunur: 50 cm'lik bir kot farkı %8 eğimle 6,25 m yatay uzunluk ister. Bu sayfada hesap yöntemini, yüzde-derece çevrimini, sahanlık, genişlik ve küpeşte ölçülerini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Eğim (%) = aşılan yükseklik ÷ yatay uzunluk × 100; gereken yatay uzunluk = yükseklik ÷ (eğim ÷ 100).",
    "Mevcut binalar için denetim formundaki sınırlar: ≤15 cm %10, 16–50 cm %9, 51–100 cm %8, 100 cm üzeri %6.",
    "Ulaşılabilir güzergâhlarda genel hedef %5 (1:20) ve daha az eğimdir; yeni yapılarda TS 9111'deki çizelge esas alınır.",
    "%8 eğim ≈ 4,57°, %6 ≈ 3,43°, %5 ≈ 2,86°; eğim açısı = arctan(yüzde ÷ 100).",
    "Rampa 9 m'den uzunsa her 9 m'de 150 × 150 cm düz dinlenme alanı; başlangıç ve bitişte de 150 × 150 cm alan gerekir.",
    "Temiz genişlik en az 100 cm; iki yanda 90 cm ve 70 cm yükseklikte iki küpeşte, korumasız kenarda en az 5 cm bordür."
  ],
  figure: {
    alt: "Rampa kesiti: 100 cm yükseklik yüzde 8 eğimle 12,5 metre yatay uzunluk gerektiriyor; 9 metreyi aştığı için iki kol halinde 6,25'er metre ve arada 150 santimetrelik sahanlık; altta yüksekliğe göre azami eğim tablosu.",
    caption: "100 cm'lik bir kot farkı %8 eğimle 12,5 m yatay uzunluk ister. Rampa 9 m'yi aştığı için ikiye bölünür ve araya 150 cm'lik düz sahanlık konur; toplam yatay iz yaklaşık 14 m olur. Sınırlar mevcut binalar için denetim formundaki değerlerdir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100 cm kot farkı, %8 eğim</text>
  <line x1="30" y1="220" x2="690" y2="220" class="st" fill="none"/>
  <polygon points="40,220 340,220 340,145" class="ps"/>
  <rect x="340" y="145" width="40" height="75" class="oks"/>
  <polygon points="380,145 680,145 680,70" class="ps"/>
  <line x1="40" y1="220" x2="340" y2="145" class="sp sw" fill="none"/>
  <line x1="380" y1="145" x2="680" y2="70" class="sp sw" fill="none"/>
  <line x1="340" y1="145" x2="380" y2="145" class="sok sw" fill="none"/>
  <text x="190" y="244" class="b mid">1. kol: 6,25 m · 50 cm</text>
  <text x="360" y="244" class="sm mid ok b">1,5 m</text>
  <text x="530" y="168" class="b mid">2. kol: 6,25 m · 50 cm</text>
  <text x="360" y="128" class="sm mid ok">sahanlık</text>
  <text x="696" y="110" class="sm end t2">+100 cm</text>
  <text x="140" y="196" class="sm b p">%8 ≈ 4,57°</text>
  <text x="360" y="268" class="sm mid t2">Toplam yatay iz ≈ 6,25 + 1,5 + 6,25 = 14 m</text>
  <g class="sm">
    <rect x="40" y="290" width="640" height="96" rx="8" class="sf sb"/>
    <text x="60" y="314" class="b">Aşılan yükseklik → azami eğim (mevcut binalar)</text>
    <rect x="60" y="326" width="140" height="44" rx="4" class="oks"/><text x="130" y="344" class="mid b">≤ 15 cm</text><text x="130" y="362" class="mid">%10 (1:10)</text>
    <rect x="215" y="326" width="140" height="44" rx="4" class="oks"/><text x="285" y="344" class="mid b">16 – 50 cm</text><text x="285" y="362" class="mid">%9 (1:11)</text>
    <rect x="370" y="326" width="140" height="44" rx="4" class="ps"/><text x="440" y="344" class="mid b">51 – 100 cm</text><text x="440" y="362" class="mid">%8 (1:12)</text>
    <rect x="525" y="326" width="140" height="44" rx="4" class="p"/><text x="595" y="344" class="mid b sf">100 cm üzeri</text><text x="595" y="362" class="mid sf">%6 (1:16)</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Rampa eğimi neden bu kadar önemli?",
      p: [
        "Tekerlekli sandalye kullanan biri için rampa eğimi, yardım almadan çıkıp çıkamayacağını belirleyen en önemli ölçüdür. Eğim arttıkça çıkışta kol gücü gereksinimi hızla artar, inişte ise hızı kontrol etmek zorlaşır ve sandalyenin öne ya da geriye devrilme riski yükselir. Bebek arabası, yürüteç kullanan yaşlılar, baston kullananlar ve yük taşıyan herkes için de aynı durum geçerlidir.",
        "Bu nedenle erişilebilirlik standartları düşük eğimleri öngörür ve rampa uzadıkça izin verilen eğimi daha da düşürür: kısa bir rampada birkaç saniyelik bir çaba kabul edilebilir, ama uzun bir rampada aynı eğim kullanıcıyı tüketir. Düzenli aralıklarla düz dinlenme alanları bırakılmasının nedeni de budur."
      ]
    },
    {
      h: "Türkiye'de rampa eğimi hangi mevzuata göre belirlenir?",
      p: [
        "Türkiye'de yapıların erişilebilirliğine ilişkin temel çerçeveyi 5378 sayılı Engelliler Hakkında Kanun ve 3194 sayılı İmar Kanunu çizer. Planlı Alanlar İmar Yönetmeliği, yapıların ve bunlara ait açık alanların erişilebilirlik standartlarına uygun yapılmasını şart koşar. Bina ve açık alanlardaki rampa, genişlik ve küpeşte ölçüleri için başvurulan Türk Standardı <strong>TS 9111</strong>'dir (Engelli ve hareket kısıtlılığı olan kişilerin ulaşabilirliği için binaların tasarım kuralları).",
        "Aile ve Sosyal Hizmetler Bakanlığı'nın TS 9111 ve ilgili standartlara dayanarak hazırladığı \"Binalar için Erişilebilirlik İzleme ve Denetleme Formu\", mevcut binaların denetiminde kullanılan ölçütleri listeler. Formda aşılan yüksekliğe göre azami eğimler verilir; aynı form, yeni inşa edilecek rampalar için TS 9111'deki çizelgenin kullanılması gerektiğini belirtir. Proje aşamasındaki bir yapı için bu sayfadaki değerleri ön fikir olarak kullanın, bağlayıcı ölçüleri güncel standarttan ve belediyenizin imar biriminden teyit edin."
      ],
      table: {
        head: ["Aşılan yükseklik (h)", "Azami eğim", "Oran", "Yaklaşık açı"],
        rows: [
          ["15 cm ve altı", "%10", "1:10", "5,71°"],
          ["16 – 50 cm", "%9", "1:11", "5,14°"],
          ["51 – 100 cm", "%8", "1:12", "4,57°"],
          ["100 cm üzeri", "%6", "1:16", "3,43°"],
          ["Bahçe yolu (genel)", "%5", "1:20", "2,86°"]
        ],
        caption: "Kaynak: Aile ve Sosyal Hizmetler Bakanlığı, Binalar için Erişilebilirlik İzleme ve Denetleme Formu (mevcut binalar için). Oranlar formdaki ifadeyle verilmiştir; yüzdeler yuvarlanmıştır. Yeni yapılarda TS 9111 çizelgesi esas alınır."
      }
    },
    {
      h: "Rampa uzunluğu nasıl hesaplanır?",
      p: [
        "Eğim, aşılan yüksekliğin rampanın <strong>yatay izdüşümüne</strong> oranıdır; rampanın yüzey uzunluğuna değil. Gereken yatay uzunluk, yüksekliğin eğim oranına bölünmesiyle bulunur. Hesapta yüksekliği bitmiş zemin kotları arasında, yani kaplamalar yapıldıktan sonraki seviyeler üzerinden almak gerekir."
      ],
      formula: "Eğim (%) = yükseklik ÷ yatay uzunluk × 100\nYatay uzunluk = yükseklik ÷ (eğim ÷ 100)\nYüzey uzunluğu = √(yatay² + yükseklik²)",
      ol: [
        "Kot farkını ölçün: bina girişinde 50 cm.",
        "Yükseklik aralığına göre azami eğimi seçin: 16–50 cm için %9; daha rahat bir rampa için %8 hedefleyin.",
        "Uzunluğu hesaplayın: 0,50 ÷ 0,08 = 6,25 m (%9 ile 0,50 ÷ 0,09 ≈ 5,56 m).",
        "Sahanlık gereğini kontrol edin: 6,25 m < 9 m, ara dinlenme gerekmez; başlangıç ve bitişte 150 × 150 cm alan bırakın.",
        "Toplam yer ihtiyacını bulun: 1,5 m + 6,25 m + 1,5 m ≈ 9,25 m."
      ],
      after: [
        "Kendi ölçülerinizle gereken uzunluğu ya da mevcut bir rampanın eğimini [[arac:rampa-egimi-hesapla|Rampa Eğimi Hesaplama]] aracıyla bulabilirsiniz; araç yüksekliği santimetre, uzunluğu metre cinsinden alır ve sahanlık boylarını ayrıca eklemenizi ister."
      ]
    },
    {
      h: "50 cm ve 100 cm yükseklik için kaç metre rampa gerekir?",
      p: [
        "Aşağıdaki tablo, farklı kot farkları için denetim formundaki azami eğimle ve daha konforlu %5 eğimle gereken yatay uzunlukları gösterir. Sahanlık uzunlukları dahil değildir."
      ],
      table: {
        head: ["Yükseklik", "Azami eğim", "Yatay uzunluk (azami eğimle)", "%5 eğimle", "Ara sahanlık (9 m kuralı)"],
        rows: [
          ["15 cm", "%10", "1,5 m", "3 m", "Gerekmez"],
          ["30 cm", "%9", "≈ 3,33 m", "6 m", "Gerekmez"],
          ["50 cm", "%9 (ya da %8)", "≈ 5,56 m (6,25 m)", "10 m", "%5'te 1 adet"],
          ["100 cm", "%8", "12,5 m", "20 m", "%8'de 1, %5'te 2 adet"],
          ["120 cm", "%6", "20 m", "24 m", "2 adet"]
        ]
      },
      after: [
        "Tablo, düşük eğimin bedelinin uzunluk olduğunu açıkça gösterir: 100 cm'lik bir yükseklik %8 eğimle 12,5 m, %5 eğimle 20 m yatay iz ister. Bina önünde bu kadar düz alan yoksa rampa düz bir çizgi yerine dönüşlü (U ya da L biçiminde) planlanır; kol uzunlukları kısalır ama toplam eğimli uzunluk aynı kalır."
      ]
    },
    {
      h: "Yüzde eğim dereceye nasıl çevrilir?",
      p: [
        "Yapı işlerinde rampa eğimi çoğunlukla yüzde ya da 1:n oranıyla verilir. Dereceye çevirmek için oranın arktanjantı alınır. Yüzde ile derece arasındaki ilişki doğrusal değildir: %100 eğim 90° değil, 45°'dir."
      ],
      formula: "Açı = arctan(yüzde eğim ÷ 100)\n1:n oranı → yüzde = 100 ÷ n   (1:12 = %8,33; 1:20 = %5)",
      after: [
        "%8 eğim yaklaşık 4,57°, %6 yaklaşık 3,43°, %5 yaklaşık 2,86°'dir. Gündelik dilde \"yüzde 8\" ile \"8 derece\" sık karıştırılır; 8 derecelik bir rampa aslında yaklaşık %14 eğimdir ve erişilebilir rampa sınırlarının çok üzerindedir. Çevirileri [[arac:egim-yuzdesi-hesapla|Eğim Yüzdesi Hesaplama]] aracıyla yapabilir, arktanjantın mantığını [[bilgi:arcsin-arccos-arctan-ters-trigonometri|ters trigonometri makalesinde]] okuyabilirsiniz."
      ]
    },
    {
      h: "Rampada sahanlık ne sıklıkla yapılmalı?",
      p: [
        "Sahanlık, rampanın düz bölümüdür ve hem dinlenme hem manevra için gereklidir. Denetim formundaki ölçütlere göre:"
      ],
      ul: [
        "<strong>Başlangıç ve bitiş:</strong> Tekerlekli sandalyenin manevra yapabileceği en az 150 × 150 cm düz alan.",
        "<strong>Yön değiştirme:</strong> Rampa sahanlıkta dönüyorsa sahanlık en az 150 × 150 cm olmalıdır.",
        "<strong>Uzun rampalar:</strong> Bina girişi rampasında 9 m'den uzun rampalarda her 9 m'de 150 × 150 cm düz dinlenme alanı (bahçe yolu rampasında 10 m).",
        "<strong>Çok uzun rampalar:</strong> 30 m'den uzun rampalarda her 30 m'de 250 cm'lik dinlenme alanı ve geçişi engellemeyen bir bank.",
        "<strong>Uyarıcı yüzey:</strong> Rampanın başlangıcından 30 cm önce ve bitişinden 30 cm sonra, genişlik boyunca 60 cm derinliğinde hissedilebilir uyarıcı yüzey."
      ],
      after: [
        "Kapı önündeki sahanlıkta kapının açılma yönü de hesaba katılmalıdır: dışa açılan bir kapı sahanlığın manevra alanını daraltıyorsa sahanlık büyütülmelidir."
      ]
    },
    {
      h: "Rampa genişliği ve korkuluk ölçüleri nedir?",
      table: {
        head: ["Öğe", "Ölçüt", "Not"],
        rows: [
          ["Temiz geçiş genişliği", "En az 100 cm", "Bordür ve tırabzan bu ölçüye dahil değildir"],
          ["Kaldırım rampası genişliği", "En az 90 cm", "Tek yöne, üç yöne ve yola paralel rampalarda"],
          ["Küpeşte yüksekliği", "90 cm", "Rampanın her iki yanında"],
          ["İkinci küpeşte", "70 cm", "Çocuklar ve tekerlekli sandalye kullanıcıları için"],
          ["Küpeşte uzantısı", "Başlangıçtan 30 cm önce, bitişten 30 cm sonra", "Uçlar duvara sabitlenir ya da yuvarlatılır"],
          ["Küpeşte kesiti", "32 – 45 mm", "Kavranabilir, çevreden farklı renkte"],
          ["Kenar bordürü", "En az 5 cm", "Rampa ve sahanlıkların korumasız tarafında"],
          ["Geniş rampalar", "Ortaya ek tırabzan", "300 cm'den geniş rampalarda"]
        ],
        caption: "Kaynak: Aile ve Sosyal Hizmetler Bakanlığı erişilebilirlik denetim formu (TS 9111 ve ilgili standartlara dayalı). Yeni projelerde güncel standart metnini kontrol edin."
      },
      after: [
        "Yüzey malzemesi de en az ölçüler kadar önemlidir: rampa yüzeyi düz, sabit, dayanıklı ve ıslakken de kaymayan bir malzemeyle kaplanmalıdır. Cilalı seramik, mermer ya da ıslakken kayganlaşan metal levhalar rampa için uygun değildir."
      ]
    },
    {
      h: "Kısa rampalarda eğim neden daha dik olabilir? Araç rampasıyla farkı",
      p: [
        "Kısa bir rampada kullanıcının harcadığı toplam çaba ve iniş sırasında kazanacağı hız sınırlıdır; birkaç saniyelik bir yokuş çoğu kullanıcı için yönetilebilir. Bu yüzden 15 cm gibi küçük kot farklarında %10'a kadar eğime izin verilirken, 100 cm'yi aşan yüksekliklerde sınır %6'ya iner. Uzun bir rampada aynı dik eğim kullanıcıyı yorar, inişte ise hız kontrolünü zorlaştırır.",
        "Araç rampaları (otopark girişleri, kamyonet kasası rampaları) tamamen farklı amaçla tasarlanır ve otopark mevzuatı gibi ayrı kurallara tabidir. Bu rampalar yaya ve engelli rampalarından çok daha dik olabilir; örneğin 80 cm yüksekliğindeki bir kasaya 3 m'lik rampayla çıkıldığında eğim yaklaşık %26,7'dir. Araç rampaları erişilebilir yaya güzergâhı yerine geçmez; aynı girişte ayrı bir yaya rampası gerekir."
      ]
    },
    {
      h: "Mevcut merdivene rampa eklerken nelere bakılır?",
      ol: [
        "<strong>Kot farkını doğru ölçün:</strong> Basamak sayısı × rıht yüksekliği yerine bitmiş zemin kotlarını ölçün.",
        "<strong>Yer ihtiyacını hesaplayın:</strong> Rampa uzunluğu + başlangıç ve bitiş sahanlıkları + gerekiyorsa ara sahanlıklar.",
        "<strong>Mülkiyet ve izinleri kontrol edin:</strong> Apartmanlarda ortak alana yapılacak rampa için kat malikleri kurulu kararı, kaldırıma taşan uygulamalar için belediye izni gerekir.",
        "<strong>Merdiveni koruyun:</strong> Rampa merdivenin yerine değil yanına eklenir; merdiveni tercih eden kullanıcılar için basamaklar da güvenli kalmalıdır.",
        "<strong>Drenajı unutmayın:</strong> Açık rampalarda yağmur suyu rampanın üzerinde birikmemeli; enine hafif eğim ve gider planlanmalıdır.",
        "<strong>Uzmana danışın:</strong> Taşıyıcı sistem, malzeme ve mevzuata uygunluk için bir mimar ya da inşaat mühendisinden görüş alın."
      ],
      after: [
        "Rampa koymanın mümkün olmadığı dar girişlerde platform asansörü ya da merdiven asansörü alternatif olabilir. Merdivenin kendisinin ölçüleri için [[bilgi:merdiven-basamak-olculeri|merdiven basamak ölçüleri makalesine]], genel eğim hesapları için [[arac:egim-hesapla|Eğim Hesaplama]] aracına bakabilirsiniz."
      ],
      note: "Bu sayfadaki ölçütler bilgilendirme amaçlıdır. Proje ve uygulama için güncel TS 9111 metnini, Planlı Alanlar İmar Yönetmeliği'ni ve belediyenizin imar birimini esas alın; bir mimar ya da mühendisle çalışın."
    }
  ],
  faq: [
    ["Engelli rampası eğimi en fazla yüzde kaç olmalı?", "Aşılan yüksekliğe bağlıdır. Mevcut binalar için denetim formuna göre 15 cm'ye kadar yüzde 10, 16 ile 50 cm arası yüzde 9, 51 ile 100 cm arası yüzde 8 ve 100 cm'yi aşan yüksekliklerde yüzde 6 en yüksek eğimdir."],
    ["Yüzde eğim dereceye nasıl çevrilir?", "Yüzde eğim 100'e bölünür ve arktanjantı alınır. Yüzde 8 eğim yaklaşık 4,57 derece, yüzde 6 yaklaşık 3,43 derece, yüzde 5 yaklaşık 2,86 derecedir; yüzde 100 eğim 45 dereceye karşılık gelir."],
    ["50 cm yükseklik için kaç metre rampa gerekir?", "Yüzde 8 eğimle 0,50 bölü 0,08 eşittir 6,25 metre yatay uzunluk gerekir; yüzde 9 ile yaklaşık 5,56 metre, yüzde 5 ile 10 metre olur. Başlangıç ve bitişteki 150 santimetrelik sahanlıklar buna eklenir."],
    ["Rampada sahanlık ne sıklıkla yapılmalı?", "Başlangıçta, bitişte ve yön değişen noktalarda en az 150 × 150 cm düz alan gerekir. Bina girişi rampasında 9 metreden uzun rampalarda her 9 metrede bir 150 × 150 cm dinlenme alanı bırakılmalıdır."],
    ["Rampa genişliği ve korkuluk ölçüleri nedir?", "Temiz geçiş genişliği en az 100 cm olmalıdır. Her iki yanda 90 cm ve 70 cm yükseklikte iki küpeşte bulunmalı, küpeşteler başlangıçtan 30 cm önce başlayıp bitişten 30 cm sonra bitmeli, korumasız kenarda en az 5 cm bordür olmalıdır."],
    ["Kısa rampalarda eğim neden daha dik olabilir?", "Kısa rampada kullanıcının harcadığı toplam çaba ve inişte kazanacağı hız sınırlı kalır. Bu yüzden küçük kot farklarında daha dik eğime izin verilirken, rampa uzadıkça kullanıcıyı yormamak için izin verilen eğim düşürülür."],
    ["Araç rampası ile yaya rampası farkı nedir?", "Araç rampaları otopark girişleri gibi motorlu taşıtlar için tasarlanır, ayrı mevzuata tabidir ve çok daha dik olabilir. Bu rampalar tekerlekli sandalye ve yaya kullanımına uygun değildir; erişilebilir bir yaya rampasının yerini tutmaz."],
    ["Mevcut merdivene rampa eklerken nelere bakılır?", "Bitmiş zemin kotları arasındaki fark ölçülür, rampa ve sahanlıklar için gereken alan hesaplanır, apartmanda kat malikleri kurulu kararı ve gerekiyorsa belediye izni alınır. Drenaj, kaymaz yüzey ve uzman görüşü de planlanmalıdır."],
    ["Yeni bina için hangi değerler geçerli?", "Denetim formundaki eğimler mevcut binalar içindir. Yeni inşa edilecek rampalar için TS 9111 standardındaki çizelge esas alınır; proje aşamasında güncel standart metnini ve belediyenin imar birimini kontrol etmek gerekir."]
  ],
  tools: ["rampa-egimi-hesapla", "egim-yuzdesi-hesapla", "egim-hesapla"],
  related: ["merdiven-basamak-olculeri", "arcsin-arccos-arctan-ters-trigonometri", "dogrunun-egimi-nasil-bulunur"],
  sources: [
    ["Aile ve Sosyal Hizmetler Bakanlığı – Binalar için Erişilebilirlik İzleme ve Denetleme Formu", "https://www.aile.gov.tr/"],
    ["Türk Standardları Enstitüsü – TS 9111", "https://www.tse.org.tr/"],
    ["Mevzuat Bilgi Sistemi – Planlı Alanlar İmar Yönetmeliği", "https://www.mevzuat.gov.tr/"]
  ]
};
