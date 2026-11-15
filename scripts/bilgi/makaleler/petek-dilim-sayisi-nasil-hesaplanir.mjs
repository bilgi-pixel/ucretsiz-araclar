export default {
  slug: "petek-dilim-sayisi-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Petek Dilim Sayısı Nasıl Hesaplanır? Oda m²'sine Göre Radyatör Boyu",
  pageTitle: "Petek Dilim Sayısı Hesaplama: Oda İçin Kaç Metre Radyatör?",
  description: "Petek hesabı: oda hacmi × W/m³ katsayısı = ısı ihtiyacı; bunu peteğin metre ya da dilim gücüne bölün. 37,8 m³ oda için 1.890 W, PKKP 600'de 1,2 m petek.",
  keywords: ["petek dilim hesaplama", "kaç dilim petek gerekir", "panel radyatör hesaplama", "oda için kaç watt petek", "petek boyu nasıl seçilir", "radyatör kapasitesi", "pkkp petek metre kaç watt", "yoğuşmalı kombi petek boyu"],
  lead: "Bir oda için gereken petek, önce odanın <strong>ısı ihtiyacı watt olarak bulunup peteğin metre ya da dilim başına verdiği güce bölünerek</strong> hesaplanır. Pratik keşifte ısı ihtiyacı, oda hacmi yalıtıma göre 40–70 W/m³ ile çarpılarak tahmin edilir. Örneğin 4 × 3,5 metrelik, 2,7 metre tavanlı ve orta yalıtımlı bir oda yaklaşık 1.890 W ister; metresi 1.700 W veren 600 mm'lik PKKP panel radyatörde bu, 1,2 metrelik petek demektir. Aşağıda dilimli petek hesabını, yoğuşmalı kombinin etkisini ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Isı ihtiyacı (W) = oda hacmi (m³) × katsayı; katsayı iyi yalıtımda ~40, orta yalıtımda ~50, zayıf yalıtımda 60–70 W/m³ alınır.",
    "Panel radyatör boyu (m) = ısı ihtiyacı ÷ peteğin metre başına gücü; sonuç bir üst standart boya yuvarlanır.",
    "Dilimli petekte dilim sayısı = ısı ihtiyacı ÷ bir dilimin gücü; yukarı yuvarlanır.",
    "Katalog güçleri genellikle 75/65/20 °C koşulu içindir; yoğuşmalı kombiyle düşük suyla çalışırken peteğin verdiği güç belirgin biçimde düşer.",
    "1 kcal/h = 1,163 W; 1 W = 0,86 kcal/h.",
    "Kuzey cepheli, köşe, çatı ya da zemin kat odalarda katsayı yükseltilir; kesin hesap ısı kaybı projesiyle yapılır."
  ],
  figure: {
    alt: "1.890 watt ısı ihtiyacı olan oda için petek tipine göre gereken boy: tip 11 yaklaşık 1,8 metre, tip 21 yaklaşık 1,4 metre, tip 22 1,2 metre, tip 33 0,8 metre; yoğuşmalı kombide 55/45 suyla tip 22 için 2,2 metre.",
    caption: "Aynı oda için gereken petek boyu, peteğin tipine ve kazandan gelen suyun sıcaklığına göre iki katından fazla değişebilir. Metre başına güçler 600 mm yükseklik için örnek katalog değerleridir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1.890 W için kaç metre petek?</text>
  <text x="360" y="54" class="sm mid mu">Oda 4 × 3,5 × 2,7 m = 37,8 m³ × 50 W/m³</text>
  <g class="sm">
    <text x="20" y="98" class="b">Tip 11 (PK)</text><text x="20" y="116" class="mu">~1.050 W/m</text>
    <text x="20" y="158" class="b">Tip 21 (PKP)</text><text x="20" y="176" class="mu">~1.350 W/m</text>
    <text x="20" y="218" class="b">Tip 22 (PKKP)</text><text x="20" y="236" class="mu">~1.700 W/m</text>
    <text x="20" y="278" class="b">Tip 33 (PKKPKP)</text><text x="20" y="296" class="mu">~2.450 W/m</text>
  </g>
  <rect x="160" y="84" width="432" height="34" rx="4" class="ps"/>
  <text x="602" y="107" class="b">1,8 m</text>
  <rect x="160" y="144" width="336" height="34" rx="4" class="ps"/>
  <text x="506" y="167" class="b">1,4 m</text>
  <rect x="160" y="204" width="288" height="34" rx="4" class="p"/>
  <text x="458" y="227" class="b p">1,2 m</text>
  <rect x="160" y="264" width="192" height="34" rx="4" class="ps"/>
  <text x="362" y="287" class="b">0,8 m</text>
  <line x1="160" y1="74" x2="160" y2="310" class="st" fill="none"/>
  <line x1="40" y1="332" x2="680" y2="332" class="sb dash" fill="none"/>
  <text x="20" y="366" class="b">Tip 22, yoğuşmalı</text><text x="20" y="384" class="sm mu">55/45 °C su: ~875 W/m</text>
  <rect x="160" y="352" width="528" height="34" rx="4" class="dgs"/>
  <text x="676" y="375" class="b end">2,2 m</text>
  <text x="360" y="424" class="sm mid t2">Çubuk uzunluğu gereken petek boyuyla orantılıdır (10 cm adımla yukarı yuvarlanmıştır).</text>
</svg>`
  },
  sections: [
    {
      h: "Petek hesabı neden yapılır?",
      p: [
        "Petek (radyatör), kombiden ya da kazandan gelen sıcak suyun ısısını odaya aktarır. Bir odanın sıcak kalabilmesi için peteğin verdiği ısının, odanın dışarıya kaybettiği ısıyı karşılaması gerekir. Küçük seçilen petek odayı istenen sıcaklığa getiremez; aşırı büyük seçilen petek ise maliyeti artırır ve kombinin verimli çalışma aralığından çıkmasına yol açabilir.",
        "Doğalgaz dönüşümünde ya da tadilatta tesisatçı her oda için ısı kaybı hesabı yapar. Bu sayfadaki pratik yöntem, ustayla konuşmadan önce ihtiyacınızı kabaca bilmenizi ve tekliflerdeki petek boylarını karşılaştırabilmenizi sağlar. Bina projesi için ayrıntılı hesap TS 2164 (kalorifer tesisatı projelendirme kuralları) ve ilgili yönetmeliklere göre yetkili mühendislerce yapılır."
      ]
    },
    {
      h: "Petek kapasitesi watt olarak nasıl hesaplanır?",
      p: [
        "Pratik keşif yönteminde odanın hacmi, binanın yalıtım durumuna ve odanın konumuna göre seçilen bir katsayıyla çarpılır. Bu katsayı, her metreküp hava için gereken yaklaşık ısıtma gücünü ifade eder."
      ],
      formula: "Oda hacmi (m³) = en × boy × tavan yüksekliği\nIsı ihtiyacı (W) = oda hacmi × katsayı (W/m³)\nPetek boyu (m) = ısı ihtiyacı ÷ peteğin metre başına gücü (W/m)\nDilim sayısı = ısı ihtiyacı ÷ bir dilimin gücü (W)",
      table: {
        head: ["Bina ve oda durumu", "Katsayı (W/m³)", "Açıklama"],
        rows: [
          ["İyi: mantolamalı, ısıcamlı", "~40", "Yeni ya da yalıtımı yenilenmiş bina, ara kat"],
          ["Orta: kısmen yalıtımlı, ara kat", "~50", "Pek çok apartman dairesi için başlangıç değeri"],
          ["Zayıf: yalıtımsız, köşe ya da çatı katı", "~60", "Çok dış duvarı ya da üstü açık olan odalar"],
          ["Çok zayıf: soğuk iklim, çok cepheli", "~70", "Doğu Anadolu gibi sert iklim, eski yapı"]
        ],
        caption: "Katsayılar pratik keşif değerleridir, proje hesabının yerine geçmez. Bilişim Ajans Petek Hesaplama aracı da bu seçenekleri kullanır."
      },
      after: [
        "Isı ihtiyacını kcal/h cinsinden görmek isterseniz watt değerini 0,86 ile çarpın: 1.890 W yaklaşık 1.625 kcal/h eder. Eski kataloglarda ve kombi etiketlerinde kcal/h birimine hâlâ rastlanır."
      ]
    },
    {
      h: "Çözümlü örnek: bir oda için kaç dilim petek gerekir?",
      ol: [
        "<strong>Hacim:</strong> Oda 4 × 3,5 metre, tavan 2,7 metre: 4 × 3,5 × 2,7 = 37,8 m³.",
        "<strong>Isı ihtiyacı:</strong> Ara katta, kısmen yalıtımlı daire için 50 W/m³: 37,8 × 50 = 1.890 W.",
        "<strong>Panel radyatör:</strong> 600 mm yüksekliğinde tip 22 (PKKP) petek, katalogda örnek olarak metre başına 1.700 W veriyorsa 1.890 ÷ 1.700 = 1,11 m; bir üst standart boy olan 1,2 metrelik petek seçilir.",
        "<strong>Dilimli petek:</strong> Bir dilimi örnek olarak 150 W veren alüminyum petekte 1.890 ÷ 150 = 12,6, yani 13 dilim gerekir.",
        "<strong>Köşe oda:</strong> Aynı oda kuzey cephede ve köşedeyse katsayı 60 alınır: 37,8 × 60 = 2.268 W; tip 22 için 2.268 ÷ 1.700 = 1,33 → 1,4 m, dilimli için 2.268 ÷ 150 = 15,1 → 16 dilim."
      ],
      after: [
        "Bu hesabı [[arac:petek-hesapla|Petek Hesaplama aracı]] oda ölçüsü, yalıtım durumu ve peteğin metre gücüyle saniyeler içinde yapar; sonuç 10 cm'lik adıma yukarı yuvarlanır. Odanın hacmini ve havalandırma ihtiyacını ayrıca görmek için [[arac:oda-hacmi-hesapla|Oda Hacmi Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Panel radyatör boyu nasıl seçilir? Tipler ve kapasiteler",
      p: [
        "Panel radyatörler, içinden su geçen panel (P) sayısı ve aralarındaki dalgalı ısıtma kanadı, yani konvektör (K) sayısıyla adlandırılır. PKKP, iki panel ve iki konvektörden oluşan tip 22 radyatördür. Panel ve konvektör sayısı arttıkça aynı boydaki peteğin verdiği ısı artar, ama peteğin derinliği de büyür."
      ],
      table: {
        head: ["Tip", "Yapı", "600 mm'de örnek güç (W/m)", "1.890 W için boy"],
        rows: [
          ["11", "PK: tek panel, tek konvektör", "~1.050", "1,8 m"],
          ["21", "PKP: iki panel, tek konvektör", "~1.350", "1,4 m"],
          ["22", "PKKP: iki panel, iki konvektör", "~1.700", "1,2 m"],
          ["33", "PKKPKP: üç panel, üç konvektör", "~2.450", "0,8 m"]
        ],
        caption: "Güçler 75/65/20 °C koşulu için yaklaşık değerlerdir ve üreticiye göre değişir. Kesin değeri seçtiğiniz modelin kataloğundan alın."
      },
      after: [
        "Yükseklik de gücü etkiler: 500 mm yüksekliğindeki petek, aynı tipteki 600 mm'lik petekten daha az ısı verir; 900 mm'lik petek daha fazla verir. Pencere altı yüksekliği kısıtlıysa daha alçak ama daha uzun bir petek ya da daha yüksek tipli (33) bir petek seçilebilir.",
        "Dilimli (döküm ya da alüminyum) peteklerde güç dilim başına verilir. Dilim gücü yüksekliğe ve modele göre büyük farklılık gösterdiği için hesabı kataloğa göre yapın; aynı odada farklı modeller arasında birkaç dilimlik fark olması normaldir."
      ]
    },
    {
      h: "Yoğuşmalı kombi petek boyunu nasıl etkiler?",
      p: [
        "Radyatör katalog değerleri genellikle EN 442 standardındaki 75/65/20 °C koşuluna göre verilir: gidiş suyu 75 °C, dönüş suyu 65 °C, oda 20 °C. Yoğuşmalı kombiler ise en yüksek verime, dönüş suyu düşük sıcaklıkta olduğunda ulaşır ve birçok tesisatta daha düşük sıcaklıkla çalıştırılır. Su soğudukça peteğin verdiği ısı da azalır."
      ],
      formula: "Ortalama sıcaklık farkı ΔT = (gidiş + dönüş) ÷ 2 − oda sıcaklığı\nDüzeltilmiş güç ≈ katalog gücü × (ΔT ÷ 50)^1,3\nÖrnek 55/45/20: ΔT = 30 → (30 ÷ 50)^1,3 ≈ 0,52",
      after: [
        "Bu örnekte metresi 1.700 W olan tip 22 petek, 55/45 °C suyla yaklaşık 875 W verir. Aynı 1.890 W'lık oda için gereken boy 1,2 metreden yaklaşık 2,2 metreye çıkar. Bu yüzden yoğuşmalı kombiye geçerken mevcut peteklerin düşük sıcaklıkta yeterli olup olmadığına bakılır; yetersiz kalan odalarda petek büyütülür ya da kombi daha yüksek gidiş sıcaklığıyla çalıştırılır. Üs 1,3 tipik bir değerdir; üreticiler her model için kendi üssünü verir."
      ]
    },
    {
      h: "Isı kaybı petek seçimini nasıl etkiler? Kuzey cephe ve pencere altı",
      p: [
        "Bir odanın ısı kaybı, dış duvar ve pencere alanına, bu yüzeylerin yalıtım kalitesine (U değeri) ve iç-dış sıcaklık farkına bağlıdır. Duvar ve pencereden kaybedilen ısı şu temel bağıntıyla bulunur: Q = U × A × ΔT. Örneğin 10 m²'lik yalıtımsız bir duvar (U ≈ 1,5 W/m²K) 25 °C sıcaklık farkında yaklaşık 375 W kaybettirirken, mantolamalı aynı duvar (U ≈ 0,5) yaklaşık 125 W kaybettirir.",
        "Kuzey cephedeki odalar güneş kazancı almadığı için, köşe odalar ise iki dış duvara sahip olduğu için daha fazla ısı kaybeder; bu odalarda katsayıyı bir kademe yükseltmek yerinde olur. Duvarın yalıtım etkisini sayısal olarak görmek için [[arac:isi-kaybi-hesapla|Isı Kaybı Hesaplama aracını]], yalıtım kalınlığının mantığı için [[bilgi:mantolama-nedir-kac-cm-olmali|mantolama nedir]] yazısını inceleyebilirsiniz.",
        "Petekler geleneksel olarak pencere altına konur. Pencere camı odadaki en soğuk yüzeydir; önünde soğuyan hava aşağı çöker ve yerde soğuk hava akımı oluşturur. Pencere altındaki petek bu havayı ısıtarak yükseltir, cam önünde sıcak bir perde oluşturur ve terlemeyi azaltır. Bu yüzden petek boyunun mümkünse pencere genişliğine yakın olması tercih edilir."
      ]
    },
    {
      h: "Kombi kapasitesi petek sayısıyla ilişkili mi?",
      p: [
        "Kombi kapasitesi, evdeki bütün odaların ısı ihtiyacının toplamına ve sıcak kullanım suyu ihtiyacına göre seçilir. Petek sayısı tek başına belirleyici değildir; önemli olan peteklerin toplam ısı gücüdür. Tüm odaların hesaplanan ihtiyaçları toplanır, tesisat kayıpları için küçük bir pay eklenir ve bu değer kombinin ısıtma kapasitesiyle karşılaştırılır.",
        "Örneğin beş odanın ihtiyacı sırasıyla 1.890, 1.500, 1.200, 2.268 ve 900 W ise toplam 7.758 W, yani yaklaşık 7,8 kW eder. Bu daire için ısıtma yükü kombilerin ısıtma kapasitesinin oldukça altındadır; çoğu evde kombi gücünü belirleyen asıl etken anlık sıcak su ihtiyacıdır. Ayrıntılı tahmin için [[arac:kombi-kapasite-hesapla|Kombi Kapasite Hesaplama aracına]] ve [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası ve kombi kapasitesi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Petek havası nasıl alınır? Bakım ipuçları",
      p: [
        "Peteğin üst kısmı soğuk, alt kısmı sıcaksa ya da petekten fokurdama sesi geliyorsa içinde hava birikmiş olabilir. Hava, su dolaşımını engeller ve peteğin verdiği ısıyı belirgin biçimde düşürür."
      ],
      ol: [
        "Kombiyi kapatın ve peteklerin biraz soğumasını bekleyin; pompa çalışırken hava almak daha zordur.",
        "Peteğin üst köşesindeki hava alma tapasının altına bir bez ya da kap yerleştirin.",
        "Tapayı anahtarla ya da düz uçlu tornavidayla yavaşça çeyrek tur açın; tıslama sesiyle hava çıkar.",
        "Hava bitip kesintisiz su gelmeye başladığında tapayı kapatın.",
        "Kombinin basınç göstergesini kontrol edin; basınç düştüyse kombi kılavuzundaki değere (çoğu modelde 1–2 bar arası) kadar doldurun."
      ],
      note: "Kombi ve doğalgaz tesisatına ilişkin işlemleri (gaz hattı, baca, kombi iç aksamı) yalnızca yetkili servis ve gaz dağıtım şirketinin yetki verdiği firmalar yapabilir. Hava alma dışındaki müdahaleler için yetkili servisi arayın."
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Alanla hesaplayıp tavanı unutmak:</strong> 3,2 metre tavanlı eski bir dairede ısı ihtiyacı 2,5 metrelik tavana göre yaklaşık %28 fazladır.",
        "<strong>Katalog gücünü sorgusuz kullanmak:</strong> Gücün hangi sıcaklık koşulunda verildiğini kontrol edin; düşük sıcaklıkta çalışan kombilerde düzeltme yapın.",
        "<strong>Petek önünü kapatmak:</strong> Kalın perde, mobilya ya da petek örtüsü ısının odaya yayılmasını belirgin biçimde azaltır.",
        "<strong>Bütün odalara aynı boyu koymak:</strong> Banyo, salon ve kuzey odanın ihtiyaçları farklıdır; her oda ayrı hesaplanmalıdır.",
        "<strong>Termostatik vanayı yanlış yerleştirmek:</strong> Vananın perde arkasında kalması yanlış sıcaklık algılamasına neden olur."
      ]
    }
  ],
  faq: [
    ["Bir oda için kaç dilim petek gerekir?", "Oda hacmini yalıtıma göre 40–70 W/m³ ile çarpıp ısı ihtiyacını bulun, sonra bir dilimin gücüne bölün. 37,8 m³ ve 50 W/m³ ile 1.890 W eder; dilimi 150 W olan petekte 13 dilim gerekir."],
    ["Panel radyatör boyu nasıl seçilir?", "Odanın ısı ihtiyacını, seçtiğiniz peteğin metre başına gücüne bölün ve sonucu bir üst standart boya yuvarlayın. Tip 22, 600 mm ve metresi 1.700 W olan bir petekte 1.890 W için 1,2 metre seçilir."],
    ["Petek kapasitesi watt olarak nasıl hesaplanır?", "Pratikte oda hacmi bina yalıtımına göre seçilen W/m³ katsayısıyla çarpılır. Daha kesin hesapta duvar, pencere, tavan ve döşemenin ısı kayıpları U × A × ΔT bağıntısıyla tek tek bulunur ve toplanır."],
    ["Isı kaybı petek seçimini nasıl etkiler?", "Isı kaybı arttıkça peteğin karşılaması gereken güç büyür. Yalıtımsız duvar, geniş tek camlı pencere ve çok sayıda dış cephe, aynı büyüklükteki odada çok daha uzun petek gerektirebilir."],
    ["Kuzey cephe oda için daha büyük petek mi gerekir?", "Genellikle evet. Kuzey cephedeki odalar güneş kazancı almadığı ve daha soğuk kaldığı için katsayıyı bir kademe yüksek almak, örneğin 50 yerine 60 W/m³ kullanmak uygun olur."],
    ["Petek pencere altına neden konur?", "Pencere odadaki en soğuk yüzeydir ve önünde soğuyan hava yere çökerek soğuk akım oluşturur. Pencere altındaki petek bu havayı ısıtıp yükseltir, konforu artırır ve camdaki terlemeyi azaltır."],
    ["Petek havası nasıl alınır?", "Kombiyi kapatıp petekler biraz soğuyunca üst köşedeki hava alma tapasını yavaşça açın, su gelince kapatın. Ardından kombinin basıncını kontrol edip kılavuzdaki değere kadar tamamlayın."],
    ["Kombi kapasitesi petek sayısıyla ilişkili mi?", "Doğrudan değil. Kombi, tüm odaların toplam ısı ihtiyacı ve sıcak su ihtiyacına göre seçilir. Petek sayısı yerine peteklerin toplam watt gücüne ve evin sıcak su kullanımına bakmak gerekir."],
    ["Yoğuşmalı kombiye geçince petekleri değiştirmek gerekir mi?", "Her zaman gerekmez. Ancak düşük su sıcaklığında peteklerin verdiği güç azaldığı için bazı odalarda petek yetersiz kalabilir. Tesisatçının oda bazında kontrol yapması ve gerekirse belirli petekleri büyütmesi önerilir."]
  ],
  tools: ["petek-hesapla", "isi-kaybi-hesapla", "kombi-kapasite-hesapla", "oda-hacmi-hesapla"],
  related: ["dogalgaz-faturasi-ve-kombi-kapasitesi", "mantolama-nedir-kac-cm-olmali", "klima-kac-btu-olmali"]
};
