export default {
  slug: "radyan-nedir-derece-radyan-cevirme",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Radyan Nedir? Derece Radyan Çevirme, π Radyan ve Örnek Sorular",
  pageTitle: "Radyan Nedir? Derece Radyan Çevirme Formülü ve Örnekler",
  description: "Radyan, yarıçap uzunluğundaki yayı gören merkez açıdır; π radyan = 180°, 1 radyan ≈ 57,30°. Çevirme formülü, esas ölçü, yay uzunluğu ve çözümlü sorular.",
  keywords: ["radyan nedir", "derece radyan çevirme", "180 derece pi radyan", "1 radyan kaç derece", "radyan formülü", "esas ölçü nasıl bulunur", "yay uzunluğu radyan", "grad nedir"],
  lead: "Radyan, bir çemberde <strong>yarıçap uzunluğundaki yayı gören merkez açının</strong> ölçüsüdür; tam çember 2π radyandır, bu yüzden <strong>π radyan = 180°</strong> ve 1 radyan yaklaşık <strong>57,30°</strong> eder. Dereceyi radyana çevirmek için dereceyi π ile çarpıp 180'e, radyanı dereceye çevirmek için 180 ile çarpıp π'ye bölmeniz yeterlidir. Bu sayfada tanımı, çevirme formüllerini, sık kullanılan açıların tablosunu, esas ölçüyü, yay uzunluğunu, grad birimini ve hesap makinesindeki DEG ve RAD modlarını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Tanım: yay uzunluğu yarıçapa eşit olduğunda merkez açı 1 radyandır; açı (rad) = yay uzunluğu ÷ yarıçap.",
    "Tam çember = 2π rad = 360°, yarım çember = π rad = 180°.",
    "Derece → radyan: α × π ÷ 180; radyan → derece: θ × 180 ÷ π.",
    "1 rad = 180 ÷ π ≈ 57,2958°; 1° = π ÷ 180 ≈ 0,01745 rad.",
    "Yay uzunluğu = yarıçap × açı (radyan); r = 10 cm ve 60° (π/3) için yaklaşık 10,47 cm.",
    "400 grad = 360°, 1 grad = 0,9°; hesap makinesinde DEG, RAD ve GRAD modları bu üç birimi ifade eder."
  ],
  figure: {
    alt: "Birim çember üzerinde radyan: yarıçap uzunluğundaki yay 1 radyanlık açı (yaklaşık 57,3 derece) oluşturur; 90 derece π/2, 180 derece π, 270 derece 3π/2 ve 360 derece 2π radyandır.",
    caption: "Yay uzunluğu yarıçapa eşit olduğunda merkez açı 1 radyandır. Çemberin tamamı 2π ≈ 6,28 yarıçap uzunluğunda olduğu için tam tur 2π radyandır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Radyan: yarıçap kadar yay</text>
  <circle cx="220" cy="215" r="140" class="sb" fill="none"/>
  <line x1="80" y1="215" x2="360" y2="215" class="sb dash" fill="none"/>
  <line x1="220" y1="75" x2="220" y2="355" class="sb dash" fill="none"/>
  <line x1="220" y1="215" x2="360" y2="215" class="sp sw" fill="none"/>
  <line x1="220" y1="215" x2="295.6" y2="97.2" class="sp sw" fill="none"/>
  <path d="M360 215 A140 140 0 0 0 295.6 97.2" class="sa sw" fill="none"/>
  <path d="M260 215 A40 40 0 0 0 241.6 181.3" class="st" fill="none"/>
  <text x="275" y="200" class="sm b">1 rad</text>
  <text x="290" y="232" class="sm">r</text>
  <text x="250" y="150" class="sm">r</text>
  <text x="350" y="150" class="sm b">yay = r</text>
  <text x="372" y="220" class="sm">0</text>
  <text x="220" y="66" class="sm mid">π/2 · 90°</text>
  <text x="70" y="220" class="sm end">π · 180°</text>
  <text x="220" y="374" class="sm mid">3π/2 · 270°</text>
  <rect x="430" y="70" width="270" height="290" rx="10" class="sf sb"/>
  <text x="450" y="100" class="b">Çevirme formülleri</text>
  <rect x="450" y="114" width="230" height="44" rx="6" class="ps"/>
  <text x="565" y="142" class="mid b">rad = derece × π ÷ 180</text>
  <rect x="450" y="168" width="230" height="44" rx="6" class="oks"/>
  <text x="565" y="196" class="mid b">derece = rad × 180 ÷ π</text>
  <text x="450" y="242" class="sm">1 rad ≈ 57,30°</text>
  <text x="450" y="266" class="sm">1° ≈ 0,01745 rad</text>
  <text x="450" y="290" class="sm">60° = π/3 ≈ 1,0472 rad</text>
  <text x="450" y="314" class="sm">2,5 rad ≈ 143,24°</text>
  <text x="450" y="338" class="sm">360° = 2π ≈ 6,2832 rad</text>
</svg>`
  },
  sections: [
    {
      h: "Radyan nedir, nasıl tanımlanır?",
      p: [
        "Bir açıyı ölçmenin en bilinen yolu dereceyi kullanmaktır: tam turu 360 eşit parçaya böleriz. Bu bölme biçimi tarihsel bir tercihtir; 360 sayısı birçok sayıya bölünebildiği için pratiktir ama çemberin geometrisinden doğmaz. <strong>Radyan</strong> ise açıyı doğrudan çemberin kendisiyle tanımlar: merkez açının gördüğü yayın uzunluğu yarıçapa eşitse, bu açının ölçüsü 1 radyandır.",
        "Bu tanımdan genel bir kural çıkar: herhangi bir merkez açının radyan cinsinden ölçüsü, gördüğü yayın uzunluğunun yarıçapa oranıdır. Uzunluk bölü uzunluk olduğu için radyan aslında birimsiz bir sayıdır; Uluslararası Birimler Sistemi'nde (SI) açının türetilmiş birimi olarak kabul edilir ve sembolü <strong>rad</strong>'dır. Lise matematiğinde trigonometrinin ilk konusu olarak öğretilir; çünkü fonksiyonların grafikleri, türev ve integral hesapları radyanla çok daha sade çalışır."
      ],
      formula: "Açı (rad) = yay uzunluğu ÷ yarıçap   (θ = s ÷ r)\nTam çevre = 2πr → tam tur = 2πr ÷ r = 2π rad"
    },
    {
      h: "π radyan neden 180 dereceye eşittir?",
      p: [
        "Yarıçapı r olan bir çemberin çevresi 2πr'dir. Tam turun radyan ölçüsü, çevrenin yarıçapa oranıdır: 2πr ÷ r = 2π. Tam tur aynı zamanda 360° olduğuna göre 2π rad = 360°, her iki tarafı 2'ye bölersek <strong>π rad = 180°</strong> bulunur. Yani π radyan, yarım çemberi gören açıdır; yarım çemberin yayı yarıçapın π katı, yani yaklaşık 3,14 katıdır.",
        "Buradan 1 radyanın derece karşılığı da çıkar: 1 rad = 180° ÷ π ≈ 57,2958°. Ters yönde 1° = π ÷ 180 ≈ 0,01745 rad'dır. Bir radyanın yaklaşık 57 derece olduğunu bilmek, sonuçlarınızın mantıklı olup olmadığını hızla kontrol etmenizi sağlar: 2 rad yaklaşık 115°, 3 rad yaklaşık 172°'dir ve 3,14 rad 180°'ye çok yakındır."
      ]
    },
    {
      h: "Dereceyi radyana çevirme formülü ve sık kullanılan açılar",
      p: [
        "Çevirme işlemi bir orantıdır: α derece ile θ radyan arasındaki ilişki α ÷ 180 = θ ÷ π şeklinde yazılır. Bu orantıdan iki formül elde edilir. Lise sorularında sonucu genellikle π'nin kesirli katı olarak bırakırsınız; sayısal sonuç gerektiğinde π ≈ 3,1416 alınır."
      ],
      formula: "α ÷ 180 = θ ÷ π\nDerece → radyan: θ = α × π ÷ 180\nRadyan → derece: α = θ × 180 ÷ π",
      table: {
        head: ["Derece", "Radyan (π cinsinden)", "Radyan (ondalık)", "Çeyrek bölge"],
        rows: [
          ["30°", "π/6", "0,5236", "I"],
          ["45°", "π/4", "0,7854", "I"],
          ["60°", "π/3", "1,0472", "I"],
          ["90°", "π/2", "1,5708", "I–II sınırı"],
          ["120°", "2π/3", "2,0944", "II"],
          ["135°", "3π/4", "2,3562", "II"],
          ["150°", "5π/6", "2,6180", "II"],
          ["180°", "π", "3,1416", "II–III sınırı"],
          ["210°", "7π/6", "3,6652", "III"],
          ["270°", "3π/2", "4,7124", "III–IV sınırı"],
          ["300°", "5π/3", "5,2360", "IV"],
          ["360°", "2π", "6,2832", "tam tur"]
        ],
        caption: "Ondalık değerler dört basamağa yuvarlanmıştır."
      },
      after: [
        "Bu açıların sinüs, kosinüs ve tanjant değerleri için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] yazımıza bakabilirsiniz. Farklı açıları hızla çevirmek için [[arac:derece-radyan-cevir|Derece Radyan Çevirici]] aracı sonucu hem ondalık hem de π'nin katı olarak gösterir."
      ]
    },
    {
      h: "Çözümlü örnekler: derece ↔ radyan",
      ol: [
        "<strong>135°'yi radyana çevirin.</strong> 135 × π ÷ 180 = 135π ÷ 180. Pay ve paydayı 45'e bölün: 3π ÷ 4. Sonuç 3π/4 rad, yaklaşık 2,3562 rad.",
        "<strong>7π/6 radyanı dereceye çevirin.</strong> (7π ÷ 6) × 180 ÷ π = 7 × 180 ÷ 6 = 210°. π'ler sadeleştiği için hesap kolaylaşır.",
        "<strong>2,5 radyanı dereceye çevirin.</strong> Burada π yoktur; 2,5 × 180 ÷ π = 450 ÷ 3,14159 ≈ 143,24°. Sonucun 90° ile 180° arasında olduğunu, yani ikinci bölgede olduğunu görebilirsiniz.",
        "<strong>1° kaç radyandır?</strong> 1 × π ÷ 180 ≈ 0,01745 rad. Küçük açılarda radyan değeri, açının sinüsüne çok yakındır: sin(0,01745) ≈ 0,01745.",
        "<strong>Bir saatin akrebi 1 saatte kaç radyan döner?</strong> Akrep 12 saatte bir tur, yani 2π rad döner; 1 saatte 2π ÷ 12 = π/6 rad, yani 30° döner."
      ]
    },
    {
      h: "Esas ölçü nasıl bulunur?",
      p: [
        "Bir açının esas ölçüsü, onunla aynı bitim kenarına sahip ve [0°, 360°) ya da [0, 2π) aralığında kalan ölçüdür. Tam turlar açının konumunu değiştirmediği için, açıdan 360°'nin (ya da 2π'nin) katları çıkarılarak ya da eklenerek bulunur."
      ],
      formula: "Derece: esas ölçü = α − 360 × k   (0 ≤ sonuç < 360)\nRadyan: esas ölçü = θ − 2π × k   (0 ≤ sonuç < 2π)\nNegatif açıda: sonuç pozitif olana kadar 360° ya da 2π eklenir",
      ul: [
        "<strong>1.110°:</strong> 1.110 ÷ 360 = 3 tam tur ve kalan 30; esas ölçü 30°.",
        "<strong>−750°:</strong> −750 + 3 × 360 = 330; esas ölçü 330°.",
        "<strong>17π/3 rad:</strong> 2π = 6π/3 olduğu için 17π/3 − 2 × 6π/3 = 5π/3; esas ölçü 5π/3 rad (300°).",
        "<strong>−π/4 rad:</strong> −π/4 + 2π = 7π/4; esas ölçü 7π/4 rad (315°)."
      ],
      after: [
        "Radyan cinsinden π'li ifadelerde pratik bir yol, payı paydanın iki katına bölmektir: 17π/3 için 17'yi 6'ya böldüğünüzde kalan 5'tir; esas ölçü 5π/3 olur. Tam tur sayısını ve kalan açıyı devir cinsinden görmek için [[arac:radyan-devir-cevir|Radyan Devir Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Yay uzunluğu ve daire dilimi radyanla nasıl hesaplanır?",
      p: [
        "Radyanın en büyük avantajı, yay uzunluğu ve daire dilimi alanı formüllerini sadeleştirmesidir. Derece kullanıldığında formülde α ÷ 360 oranı yer alırken, radyanda doğrudan açının kendisi kullanılır."
      ],
      formula: "Yay uzunluğu: s = r × θ   (θ radyan)\nDerece ile: s = 2πr × α ÷ 360\nDaire dilimi alanı: A = r² × θ ÷ 2",
      ol: [
        "Yarıçap 10 cm, merkez açı 60° olsun. 60° = π/3 rad; s = 10 × π ÷ 3 ≈ 10,47 cm.",
        "Aynı dilimin alanı: A = 10² × (π/3) ÷ 2 = 100π ÷ 6 ≈ 52,36 cm².",
        "Yarıçap 5 m, açı 1,2 rad ise yay 5 × 1,2 = 6 m olur; bu durumda derece çevirmeye hiç gerek yoktur.",
        "Tersinden: yarıçap 8 cm ve yay 12 cm ise açı 12 ÷ 8 = 1,5 rad ≈ 85,94°'dir."
      ],
      after: [
        "Yay uzunluğu, kiriş ve daire dilimini birlikte hesaplamak için [[arac:yay-uzunlugu-hesapla|Yay Uzunluğu Hesaplama]] aracı derece ya da radyan girişini kabul eder."
      ]
    },
    {
      h: "Grad nedir? Hesap makinesinde DEG ve RAD modları",
      p: [
        "Grad (gon), dik açıyı 100 eşit parçaya bölen bir açı birimidir: 90° = 100 grad, tam tur = 400 grad, 1 grad = 0,9°. Özellikle harita ve kadastro ölçümlerinde kullanılır. Üç birim arasındaki ilişki şöyledir: 360° = 2π rad = 400 grad. Örneğin 54° = 54 ÷ 0,9 = 60 grad'dır. Derece ile grad arasında çevirme için [[arac:derece-grad-cevir|Derece Grad Çevirici]] aracını kullanabilirsiniz.",
        "Bilimsel hesap makinelerinde açı modu DEG (derece), RAD (radyan) ve GRAD olarak seçilir. Mod yanlış seçilirse sonuç tamamen değişir: sin(30) DEG modunda 0,5 iken RAD modunda sin(30 rad) ≈ −0,988 çıkar, çünkü hesap makinesi 30'u 30 radyan, yani yaklaşık 1.719° olarak yorumlar. Sınavlarda ve ödevlerde işlem yapmadan önce ekranın üst köşesindeki mod göstergesine bakmak, en sık yapılan hatayı önler. Programlama dillerindeki trigonometrik fonksiyonların neredeyse tamamı da radyanla çalışır."
      ]
    },
    {
      h: "Açısal hız radyan/saniye ile nasıl ifade edilir?",
      p: [
        "Dönen cisimlerin hızı fizikte çoğunlukla <strong>açısal hız</strong> (ω) ile, radyan/saniye biriminde ifade edilir. Motorların hızı ise genellikle dakikadaki devir sayısıyla (dev/dk) verilir. Bir devir 2π radyan olduğu için dönüşüm basittir."
      ],
      formula: "ω (rad/s) = devir/dk × 2π ÷ 60\nÇizgisel hız: v = ω × r\nÖrnek: 3.000 dev/dk × 2π ÷ 60 ≈ 314,16 rad/s",
      after: [
        "Örneğin 3.000 dev/dk ile dönen bir motor milinin açısal hızı yaklaşık 314,16 rad/s'dir; yarıçapı 0,05 m olan bir kasnağın çevresindeki bir noktanın çizgisel hızı 314,16 × 0,05 ≈ 15,7 m/s olur. Dünya kendi ekseni etrafında 24 saatte 2π rad döner: ω ≈ 7,27 × 10<sup>−5</sup> rad/s. Konunun fizik tarafı [[bilgi:merkezcil-kuvvet-ve-acisal-hiz|merkezcil kuvvet ve açısal hız]] yazısında ele alınıyor."
      ],
      ul: [
        "<strong>Hata 1:</strong> π'yi 180 sanmak. π bir sayıdır (≈ 3,1416); π radyan 180 dereceye eşittir.",
        "<strong>Hata 2:</strong> Formülü ters kurmak. Radyana çevirirken π ÷ 180 ile çarpılır; sonuç dereceden küçük çıkmalıdır.",
        "<strong>Hata 3:</strong> Yay formülünde dereceyi doğrudan kullanmak. s = r × θ yalnızca radyanla geçerlidir.",
        "<strong>Hata 4:</strong> Negatif açının esas ölçüsünü negatif bırakmak. Esas ölçü her zaman 0 ile 360° arasındadır."
      ]
    }
  ],
  faq: [
    ["Radyan nedir, nasıl tanımlanır?", "Radyan, bir çemberde gördüğü yayın uzunluğu yarıçapa eşit olan merkez açının ölçüsüdür. Genel olarak bir açının radyan değeri, gördüğü yay uzunluğunun yarıçapa oranıdır; bu yüzden radyan birimsiz bir orandır ve sembolü rad'dır."],
    ["1 radyan kaç derecedir?", "1 radyan, 180'in π'ye bölünmesiyle bulunur ve yaklaşık 57,2958 derecedir. Pratik kontrol için 1 radyanı yaklaşık 57 derece düşünebilirsiniz; 2 radyan yaklaşık 115, 3 radyan yaklaşık 172 derece eder."],
    ["Dereceyi radyana çevirme formülü nedir?", "Derece değeri π ile çarpılıp 180'e bölünür: θ = α × π ÷ 180. Örneğin 135 derece 135π ÷ 180 = 3π/4 radyandır. Radyanı dereceye çevirmek için ise radyan değeri 180 ile çarpılıp π'ye bölünür."],
    ["π radyan neden 180 dereceye eşittir?", "Çemberin çevresi 2πr olduğu için tam turun radyan ölçüsü 2πr ÷ r = 2π'dir. Tam tur 360 derece olduğundan 2π radyan 360 dereceye, π radyan da 180 dereceye eşittir; π radyan yarım çemberi gören açıdır."],
    ["Esas ölçü nasıl bulunur?", "Açıdan 360 derecenin ya da 2π'nin katları çıkarılır veya eklenir ve sonuç 0 ile 360 derece arasına getirilir. 1.110 derecenin esas ölçüsü 30, eksi 750 derecenin 330, 17π/3 radyanın ise 5π/3 radyandır."],
    ["Yay uzunluğu radyanla nasıl hesaplanır?", "Yay uzunluğu, yarıçap ile radyan cinsinden açının çarpımıdır: s = r × θ. Yarıçapı 10 cm ve merkez açısı 60 derece, yani π/3 radyan olan yayın uzunluğu yaklaşık 10,47 cm'dir."],
    ["Grad birimi nedir, derece ve radyanla ilişkisi nasıl?", "Grad, dik açıyı 100 eşit parçaya bölen birimdir; tam tur 400 grad, 1 grad 0,9 derecedir. Üç birim arasındaki ilişki 360 derece = 2π radyan = 400 grad şeklindedir; örneğin 54 derece 60 grad eder."],
    ["Hesap makinesinde DEG ve RAD modları neden önemlidir?", "Mod, girdiğiniz sayının hangi açı birimiyle yorumlanacağını belirler. Sinüs 30 DEG modunda 0,5 çıkarken RAD modunda yaklaşık eksi 0,988 çıkar, çünkü 30 radyan olarak işlenir. İşlemden önce ekrandaki mod göstergesini kontrol edin."],
    ["Açısal hız radyan/saniye ile nasıl ifade edilir?", "Açısal hız, dakikadaki devir sayısının 2π ile çarpılıp 60'a bölünmesiyle radyan/saniyeye çevrilir. 3.000 devir/dakika ile dönen bir mil yaklaşık 314,16 rad/s açısal hıza sahiptir; çizgisel hız ise açısal hız ile yarıçapın çarpımıdır."],
    ["Radyan neden derece yerine tercih edilir?", "Radyan çemberin geometrisinden doğduğu için yay uzunluğu ve dilim alanı formüllerini sadeleştirir. Türev ve integral gibi ileri matematik işlemlerinde trigonometrik fonksiyonlar ancak radyanla en basit hâlini alır; bu yüzden bilimde ve programlamada standart birimdir."]
  ],
  tools: ["derece-radyan-cevir", "radyan-devir-cevir", "derece-grad-cevir", "yay-uzunlugu-hesapla"],
  related: ["trigonometri-sin-cos-tan-tablosu", "arcsin-arccos-arctan-ters-trigonometri", "merkezcil-kuvvet-ve-acisal-hiz", "ucgende-acilar"],
  sources: [
    ["BIPM – SI Broşürü: türetilmiş birimler (radyan)", "https://www.bipm.org/en/publications/si-brochure"],
    ["MEB – Ortaöğretim matematik öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
