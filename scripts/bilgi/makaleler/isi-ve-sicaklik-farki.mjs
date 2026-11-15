export default {
  slug: "isi-ve-sicaklik-farki",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Isı ile Sıcaklık Arasındaki Fark Nedir? Q=m·c·ΔT Formülü ve Birimler",
  pageTitle: "Isı ve Sıcaklık Farkı: Q = m·c·ΔT Formülü ve Birimleri",
  description: "Isı aktarılan enerjidir (joule, kalori); sıcaklık taneciklerin ortalama hareket enerjisinin ölçüsüdür (°C, K). Q = m·c·ΔT, öz ısı, hal değişimi ve çözümlü örnekler.",
  keywords: ["ısı ve sıcaklık farkı", "ısı formülü", "öz ısı nedir", "q=mcΔt", "kalori joule çevirme", "sıcaklık birimleri kelvin", "hal değişiminde sıcaklık", "ısıl denge"],
  lead: "Isı, sıcaklık farkı nedeniyle bir maddeden diğerine <strong>aktarılan enerjidir</strong> ve joule ya da kalori ile ölçülür; sıcaklık ise bir maddedeki taneciklerin <strong>ortalama hareket enerjisinin ölçüsüdür</strong> ve °C ya da kelvin ile ifade edilir. Isı kalorimetreyle hesaplanır, sıcaklık termometreyle ölçülür. Bir maddeye verilen ısı Q = m · c · ΔT formülüyle bulunur: 2 kg suyu 20 °C'den 100 °C'ye ısıtmak yaklaşık 669 kJ ister. Bu sayfada iki kavramın farkını, öz ısıyı, hal değişimini ve birim dönüşümlerini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Isı bir enerji aktarımıdır; birimi joule (J), günlük kullanımda kalori (cal) ve kilokalori (kcal).",
    "Sıcaklık taneciklerin ortalama kinetik enerjisinin göstergesidir; birimi °C, K ya da °F'dir.",
    "Q = m · c · ΔT; m kütle, c öz ısı, ΔT sıcaklık değişimidir. Suyun öz ısısı 4,18 J/(g·°C) = 1 cal/(g·°C).",
    "Isı her zaman sıcak maddeden soğuk maddeye akar; sıcaklıklar eşitlenince ısıl denge kurulur.",
    "Hal değişimi sırasında verilen ısı bağları koparmaya harcanır, sıcaklık sabit kalır: Q = m · L.",
    "1 kalori = 4,184 J; K = °C + 273,15."
  ],
  figure: {
    alt: "Bir fincan 90 derece çay ile bir küvet 40 derece su karşılaştırması: fincanın sıcaklığı yüksek ama içerdiği ısıl enerji yaklaşık 75 kilojoule; küvetin sıcaklığı düşük ama ısıl enerjisi yaklaşık 25 bin kilojoule.",
    caption: "Sıcaklık maddenin miktarına bağlı değildir, ısıl enerji bağlıdır. 0 °C'ye göre hesaplanan enerji: 0,2 kg su × 4,18 × 90 ≈ 75 kJ; 150 kg su × 4,18 × 40 ≈ 25.080 kJ. Fincan daha sıcak, küvet ise yaklaşık 330 kat daha fazla ısı verebilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sıcaklık yüksek, ısı az · Sıcaklık düşük, ısı çok</text>
  <rect x="70" y="140" width="90" height="100" rx="10" class="dgs sdg"/>
  <path d="M160 160 Q200 170 160 210" class="sdg sw" fill="none"/>
  <text x="115" y="196" class="b mid">0,2 kg</text>
  <rect x="380" y="150" width="300" height="90" rx="30" class="ps sp"/>
  <text x="530" y="200" class="b mid">150 kg su</text>
  <text x="115" y="120" class="xl mid dg">90 °C</text>
  <text x="530" y="120" class="xl mid p">40 °C</text>
  <rect x="30" y="268" width="290" height="96" rx="10" class="sf sb"/>
  <text x="175" y="294" class="sm mid t2">Fincan çay: Q = m · c · ΔT</text>
  <text x="175" y="320" class="sm mid">0,2 × 4.180 × 90</text>
  <text x="175" y="350" class="lg b mid dg">≈ 75 kJ</text>
  <rect x="380" y="268" width="300" height="96" rx="10" class="sf sb"/>
  <text x="530" y="294" class="sm mid t2">Küvet: Q = m · c · ΔT</text>
  <text x="530" y="320" class="sm mid">150 × 4.180 × 40</text>
  <text x="530" y="350" class="lg b mid p">≈ 25.080 kJ</text>
  <rect x="30" y="378" width="650" height="34" rx="8" class="p"/>
  <text x="355" y="401" class="mid b sf">Termometre sıcaklığı ölçer · Kalorimetre ısıyı ölçer</text>
  <text x="115" y="80" class="sm mid t2">Sıcaklık: termometre</text>
  <text x="530" y="80" class="sm mid t2">Sıcaklık: termometre</text>
</svg>`
  },
  sections: [
    {
      h: "Isı ile sıcaklık arasındaki fark nedir?",
      p: [
        "Günlük dilde \"bugün ısı yüksek\" denir, ama fizikte bu cümle yanlıştır; doğrusu \"sıcaklık yüksek\"tir. İki kavram birbiriyle ilişkili olsa da farklı şeyleri anlatır.",
        "<strong>Sıcaklık</strong>, bir maddeyi oluşturan atom ve moleküllerin ortalama hareket (kinetik) enerjisinin göstergesidir. Tanecikler ne kadar hızlı titreşir ya da hareket ederse sıcaklık o kadar yüksektir. Sıcaklık maddenin miktarına bağlı değildir: bir damla kaynar su ile bir tencere kaynar su aynı sıcaklıktadır.",
        "<strong>Isı</strong> ise sıcaklık farkı nedeniyle bir sistemden diğerine aktarılan enerjidir. Isı bir maddenin \"sahip olduğu\" bir şey değil, sınırdan geçen enerji akışıdır; bir maddenin içindeki toplam enerjiye iç enerji ya da ısıl enerji denir. Aktarılabilecek ısı miktarı, maddenin kütlesine ve türüne bağlıdır."
      ],
      table: {
        head: ["Özellik", "Isı", "Sıcaklık"],
        rows: [
          ["Tanımı", "Sıcaklık farkıyla aktarılan enerji", "Taneciklerin ortalama kinetik enerjisinin ölçüsü"],
          ["Birimi", "Joule (J), kalori (cal)", "Kelvin (K), santigrat (°C), fahrenhayt (°F)"],
          ["Ölçüm aracı", "Kalorimetre (hesapla bulunur)", "Termometre"],
          ["Madde miktarına bağlı mı?", "Evet", "Hayır"],
          ["Türü", "Enerji (aktarım)", "Durum büyüklüğü"],
          ["Örnek", "Suyu ısıtmak için 669 kJ gerekir", "Su 100 °C'de kaynar"]
        ]
      }
    },
    {
      h: "Isı enerjisi nasıl hesaplanır? Q = m · c · ΔT",
      p: [
        "Hal değiştirmeyen bir maddenin sıcaklığını değiştirmek için gereken ısı; maddenin kütlesi, öz ısısı ve sıcaklık değişimiyle doğru orantılıdır."
      ],
      formula: "Q = m · c · ΔT\nQ: ısı (J ya da cal) · m: kütle (g ya da kg) · c: öz ısı · ΔT = T<sub>son</sub> − T<sub>ilk</sub>",
      ol: [
        "<strong>Su ısıtma:</strong> 2 kg (2.000 g) su 20 °C'den 100 °C'ye ısıtılıyor. ΔT = 80 °C. Q = 2.000 × 4,18 × 80 = 668.800 J ≈ 669 kJ. Kalori cinsinden Q = 2.000 × 1 × 80 = 160.000 cal = 160 kcal.",
        "<strong>Aynı ısı demire verilirse:</strong> Demirin öz ısısı yaklaşık 0,45 J/(g·°C). 2 kg demire 668.800 J verilirse ΔT = 668.800 ÷ (2.000 × 0,45) ≈ 743 °C olur. Aynı enerji, demirin sıcaklığını sudan yaklaşık 9 kat daha fazla yükseltir.",
        "<strong>Soğuma:</strong> 500 g su 60 °C'den 25 °C'ye soğuyor. ΔT = −35 °C; Q = 500 × 4,18 × (−35) = −73.150 J. Eksi işareti, suyun çevresine 73,15 kJ ısı verdiğini gösterir.",
        "<strong>Isıl denge:</strong> 80 °C'deki 200 g su ile 20 °C'deki 300 g su karıştırılıyor. Sıcak suyun verdiği ısı soğuk suyun aldığına eşittir: 200 · (80 − T) = 300 · (T − 20). Buradan T = (200 · 80 + 300 · 20) ÷ 500 = 44 °C bulunur."
      ],
      after: [
        "Kütle, öz ısı ve sıcaklık farkından ısıyı ya da ısıdan bilinmeyen diğer büyüklüğü bulmak için [[arac:isi-enerjisi-hesapla|Isı Enerjisi Hesaplama (Q = m·c·ΔT)]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Öz ısı nedir?",
      p: [
        "<strong>Öz ısı</strong> (c), bir maddenin 1 gramının sıcaklığını 1 °C artırmak için gereken ısı miktarıdır. Maddeyi ayırt eden bir özelliktir: aynı kütledeki farklı maddeler aynı ısıyı aldığında farklı miktarda ısınır. Öz ısısı büyük olan madde geç ısınır, geç soğur.",
        "Suyun öz ısısı yaygın maddeler arasında en yükseklerden biridir. Bu yüzden denizler karalara göre geç ısınıp geç soğur ve kıyı bölgelerinin iklimi daha ılımandır. Kalorifer peteklerinde ve araç radyatörlerinde su kullanılmasının nedeni de suyun çok miktarda ısı taşıyabilmesidir."
      ],
      table: {
        head: ["Madde", "Öz ısı J/(g·°C)", "Öz ısı cal/(g·°C)"],
        rows: [
          ["Su (sıvı)", "4,18", "1,00"],
          ["Buz", "yaklaşık 2,1", "yaklaşık 0,5"],
          ["Alüminyum", "yaklaşık 0,90", "yaklaşık 0,22"],
          ["Demir", "yaklaşık 0,45", "yaklaşık 0,11"],
          ["Bakır", "yaklaşık 0,39", "yaklaşık 0,09"],
          ["Kum (kuru)", "yaklaşık 0,8", "yaklaşık 0,19"]
        ],
        caption: "Değerler oda sıcaklığı civarındaki yaklaşık değerlerdir ve kaynağa göre küçük farklılıklar gösterebilir. Isı sığası ise bir cismin tamamının sıcaklığını 1 °C artırmak için gereken ısıdır: m · c."
      }
    },
    {
      h: "Isının ve sıcaklığın birimleri",
      p: [
        "SI'da ısının birimi <strong>joule</strong>dür. Günlük hayatta ve beslenme etiketlerinde kalori de kullanılır. 1 kalori, 1 gram suyun sıcaklığını yaklaşık 1 °C artırmak için gereken ısıdır. Besin etiketlerinde \"kalori\" diye yazılan değer aslında kilokaloridir (kcal)."
      ],
      formula: "1 cal = 4,184 J  (termokimyasal tanım; uluslararası tablo kalorisi 4,1868 J)\n1 kcal = 1.000 cal = 4,184 kJ\nK = °C + 273,15  ·  °C = K − 273,15\n°F = °C × 1,8 + 32",
      after: [
        "Sıcaklığın SI birimi <strong>kelvin</strong>dir. Kelvin ölçeği mutlak sıfırdan (−273,15 °C) başlar; bu nedenle negatif değer almaz ve derece işareti kullanılmaz. Kelvin ile santigrat arasındaki aralıklar aynı büyüklüktedir: sıcaklık farkı 10 °C ise 10 K'dir. Bu yüzden Q = m · c · ΔT formülünde ΔT için °C ya da K kullanmak aynı sonucu verir.",
        "Kalori ile joule arasında çevirmek için [[arac:kalori-joule-cevir|Kalori Joule Çevirici]], santigrat ile kelvin arasında çevirmek için [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] aracını kullanabilirsiniz. Fahrenhayt dönüşümü için [[bilgi:celsius-fahrenheit-cevirme|Celsius Fahrenheit çevirme]] yazısına bakın."
      ]
    },
    {
      h: "Hal değişiminde sıcaklık neden sabit kalır?",
      p: [
        "Buz eriyene kadar sıcaklığı 0 °C'de, su kaynarken (deniz seviyesinde) sıcaklığı 100 °C'de sabit kalır. Bu sürede verilen ısı kaybolmaz; tanecikler arasındaki çekim kuvvetlerini yenmeye, yani maddenin hâlini değiştirmeye harcanır. Taneciklerin ortalama kinetik enerjisi değişmediği için sıcaklık da değişmez.",
        "Hal değişimi için gereken ısı, maddenin kütlesi ile <strong>hal değişim ısısının</strong> çarpımıdır. Suyun erime ısısı yaklaşık 334 J/g (80 cal/g), buharlaşma ısısı yaklaşık 2.260 J/g (540 cal/g)'dır."
      ],
      formula: "Q = m · L\nL<sub>erime</sub> (buz) ≈ 334 J/g · L<sub>buharlaşma</sub> (su) ≈ 2.260 J/g",
      ol: [
        "<strong>Buz eritme:</strong> 0 °C'deki 100 g buzu 0 °C suya dönüştürmek için Q = 100 × 334 = 33.400 J gerekir.",
        "<strong>Isıtma:</strong> 0 °C'deki 100 g suyu 100 °C'ye çıkarmak için Q = 100 × 4,18 × 100 = 41.800 J gerekir.",
        "<strong>Kaynatıp buharlaştırma:</strong> 100 °C'deki 100 g suyu tamamen buhara dönüştürmek için Q = 100 × 2.260 = 226.000 J gerekir.",
        "<strong>Toplam:</strong> 0 °C buzdan 100 °C buhara 33.400 + 41.800 + 226.000 = 301.200 J ≈ 301 kJ. Enerjinin dörtte üçünden fazlası buharlaşmaya gider."
      ],
      after: [
        "Bu yüzden su buharı yanığı, aynı sıcaklıktaki kaynar su yanığından daha tehlikelidir: buhar deriye temas edip yoğunlaşırken büyük miktarda ısı bırakır. Kaynama sıcaklığının rakıma göre nasıl değiştiğini [[bilgi:su-kac-derecede-kaynar-rakim|su kaç derecede kaynar]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Sıcaklık hangi aletle ölçülür? Isı nasıl aktarılır?",
      p: [
        "Sıcaklık <strong>termometre</strong> ile ölçülür. Termometreler, sıcaklıkla düzenli biçimde değişen bir özelliği kullanır: sıvılı termometrelerde sıvının genleşmesi, dijital termometrelerde elektriksel direncin değişimi, kızılötesi termometrelerde yüzeyin yaydığı ışınım. Isı ise doğrudan ölçülmez; kütle, öz ısı ve sıcaklık değişimi ölçülerek <strong>kalorimetre</strong> kabında hesaplanır.",
        "Isı üç yolla aktarılır: <strong>iletim</strong> (temas eden tanecikler arasında, örneğin tencerenin sapı ısınır), <strong>konveksiyon</strong> (akışkanın hareketiyle, örneğin odadaki sıcak havanın yükselmesi) ve <strong>ışıma</strong> (elektromanyetik dalgalarla, örneğin Güneş'in Dünya'yı ısıtması). Isınan cisimler genleşir; köprülerdeki genleşme derzleri bu yüzden bırakılır. Genleşme miktarını hesaplamak için [[arac:isil-genlesme-hesapla|Isıl Genleşme Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Günlük hayattan ısı ve sıcaklık örnekleri",
      ul: [
        "<strong>Kışın metal korkuluk tahta banktan daha soğuk hissedilir:</strong> İkisi de aynı sıcaklıktadır; metal ısıyı elinizden çok daha hızlı ilettiği için soğuk algılanır. Dokunma hissi sıcaklığı değil, ısı akış hızını ölçer.",
        "<strong>Fırındaki tepsi ile hava:</strong> 200 °C'lik fırının içindeki havaya elinizi kısa süre uzatabilirsiniz ama aynı sıcaklıktaki tepsiye dokunamazsınız; havanın kütlesi ve iletkenliği düşüktür, aktaracağı ısı azdır.",
        "<strong>Su ısıtıcısının harcadığı enerji:</strong> 1,5 litre suyu 20 °C'den kaynatmak yaklaşık 1.500 × 4,18 × 80 ≈ 502 kJ, yani yaklaşık 0,14 kWh enerji ister; kayıplar nedeniyle gerçek tüketim biraz daha fazladır.",
        "<strong>Ateşli bir hastanın serinletilmesi:</strong> Ilık suyla silinen deriden buharlaşan su, buharlaşma ısısını vücuttan alarak serinlik sağlar; terlemenin işlevi de aynıdır. Bu bilgi genel fizik açıklamasıdır, ateş durumunda hekim önerisine uyun."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>\"Isı yüksek\" demek:</strong> Hava durumunda ölçülen sıcaklıktır; ısı bir enerji aktarımıdır.",
        "<strong>Birimleri karıştırmak:</strong> Öz ısı J/(g·°C) ise kütle gram, J/(kg·°C) ise kilogram olmalıdır.",
        "<strong>Hal değişiminde Q = m · c · ΔT kullanmak:</strong> Erime ve kaynama sırasında ΔT sıfırdır; Q = m · L kullanılır.",
        "<strong>Kelvinde derece işareti kullanmak:</strong> 300 °K değil, 300 K yazılır.",
        "<strong>Besin kalorisini kalori sanmak:</strong> Etiketteki 250 \"kalori\" aslında 250 kcal, yaklaşık 1.046 kJ'dür."
      ]
    }
  ],
  faq: [
    ["Isı ile sıcaklık arasındaki fark nedir?", "Isı, sıcaklık farkı nedeniyle bir maddeden diğerine aktarılan enerjidir ve joule ya da kaloriyle ölçülür. Sıcaklık ise taneciklerin ortalama hareket enerjisinin göstergesidir, termometreyle ölçülür ve madde miktarına bağlı değildir."],
    ["Isı enerjisi nasıl hesaplanır?", "Hal değiştirmeyen bir madde için Q = m · c · ΔT formülü kullanılır: kütle, öz ısı ve sıcaklık değişimi çarpılır. Örneğin 2 kg suyu 20 °C'den 100 °C'ye ısıtmak için yaklaşık 668.800 joule, yani 160 kilokalori gerekir."],
    ["Öz ısı nedir?", "Öz ısı, bir maddenin 1 gramının sıcaklığını 1 °C artırmak için gereken ısı miktarıdır ve maddeyi ayırt eden bir özelliktir. Suyun öz ısısı 4,18 J/(g·°C) ile çok yüksektir; bu yüzden su geç ısınır ve geç soğur."],
    ["Isının birimi nedir?", "Isının SI birimi joule'dür. Günlük hayatta kalori ve kilokalori de kullanılır; 1 kalori yaklaşık 4,184 joule eder. Besin etiketlerinde kalori olarak yazılan değer aslında kilokaloridir."],
    ["Sıcaklık hangi aletle ölçülür?", "Sıcaklık termometreyle ölçülür. Sıvılı termometreler sıvının genleşmesini, dijital termometreler elektriksel direnç değişimini, kızılötesi termometreler ise yüzeyin yaydığı ışınımı kullanır. Isı ise kalorimetre deneyleriyle hesaplanır."],
    ["Kelvin ile Celsius ilişkisi nedir?", "Kelvin değeri, santigrat değerine 273,15 eklenerek bulunur: K = °C + 273,15. İki ölçekte birim aralıkları aynıdır; bu yüzden 10 °C'lik bir sıcaklık farkı 10 K'lik farka eşittir ve ısı hesabında ikisi de kullanılabilir."],
    ["Hal değişiminde sıcaklık neden sabit kalır?", "Hal değişimi sırasında verilen ısı, tanecikler arasındaki çekim kuvvetlerini yenmeye harcanır; taneciklerin ortalama kinetik enerjisi değişmediği için sıcaklık sabit kalır. Bu sürede gereken ısı Q = m · L formülüyle hesaplanır."],
    ["1 kalori kaç joule?", "1 kalori yaklaşık 4,184 joule eder; bu termokimyasal kalori tanımıdır. Bazı mühendislik tablolarında kullanılan uluslararası tablo kalorisi ise 4,1868 joule'dür. 1 kilokalori yaklaşık 4,184 kilojoule'e karşılık gelir."]
  ],
  tools: ["isi-enerjisi-hesapla", "celsius-kelvin-cevir", "kalori-joule-cevir", "isil-genlesme-hesapla"],
  related: ["celsius-fahrenheit-cevirme", "su-kac-derecede-kaynar-rakim", "kinetik-ve-potansiyel-enerji"],
  sources: [
    ["BIPM – SI birimleri (joule, kelvin)", "https://www.bipm.org/"],
    ["NIST – Birim dönüşümleri (kalori ve joule)", "https://www.nist.gov/"],
    ["MEB – Fen bilimleri ve fizik dersi öğretim programları", "https://www.meb.gov.tr/"]
  ]
};
