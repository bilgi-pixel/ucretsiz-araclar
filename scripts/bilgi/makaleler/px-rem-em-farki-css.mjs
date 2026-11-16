export default {
  slug: "px-rem-em-farki-css",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "CSS'te px, rem ve em Farkı Nedir? Piksel–Rem Çevirisi ve Kullanım Yeri",
  pageTitle: "CSS px, rem ve em Farkı: 16px Kaç rem, Hangisi Ne Zaman?",
  description: "px sabit piksel, rem kök yazı boyutuna, em üst öğenin yazı boyutuna göre ölçeklenir. 16px kaç rem, em neden iç içe büyür, pt–px çevirisi ve birim seçimi.",
  keywords: ["px rem em farkı", "rem nedir css", "16px kaç rem", "em nedir css", "css birimleri", "pt px çevirme", "rem px çevirme", "duyarlı tasarım birim"],
  lead: "CSS'te <strong>px</strong> sabit bir uzunluk birimidir, <strong>rem</strong> sayfanın kök (html) yazı boyutuna, <strong>em</strong> ise öğenin üst öğesinden aldığı yazı boyutuna göre ölçeklenir. Tarayıcıların varsayılan kök yazı boyutu 16 px olduğu için 1 rem = 16 px, 24 px = 1,5 rem eder. En önemli fark erişilebilirliktedir: kullanıcı tarayıcı ayarından yazıyı büyüttüğünde rem ve em ile verilen boyutlar büyür, px ile sabitlenen yazı tipi boyutları büyümez. Aşağıda çeviri formüllerini, em'in iç içe büyüme davranışını ve hangi birimin nerede kullanılacağını örneklerle bulacaksınız.",
  kisaCevap: [
    "rem = px ÷ kök yazı boyutu; varsayılan 16 px'te 16 px = 1 rem, 24 px = 1,5 rem, 12 px = 0,75 rem.",
    "em, font-size için üst öğenin yazı boyutuna; padding ve margin gibi diğer özellikler için öğenin kendi yazı boyutuna göre hesaplanır.",
    "İç içe em çarpılarak büyür: 1,2em içinde 1,2em = 1,44 × 16 = 23,04 px.",
    "CSS'te 1 px = 1/96 inç, 1 pt = 1/72 inç kabul edilir; bu yüzden 1 pt = 1,333 px ve 12 pt = 16 px'tir.",
    "Yazı boyutları için rem, bileşen içi boşluklar için em, ince kenarlıklar için px pratik bir başlangıç kuralıdır.",
    "Kök boyutu html { font-size: 62.5% } ile 10 px'e çekmek, kullanıcının tarayıcı ayarını korurken hesabı kolaylaştırır."
  ],
  figure: {
    alt: "İç içe üç kutuda em ve rem karşılaştırması: kök 16 piksel; 1,25em verilen kutular 20, 25 ve 31,25 piksele büyürken 1,25rem verilen kutular her düzeyde 20 pikselde kalıyor.",
    caption: "Aynı değer iki farklı birimle yazıldığında: em her iç içe düzeyde bir öncekinin üzerine çarpılır, rem ise her zaman köke (16 px) bakar. Bu yüzden rem öngörülebilir, em ise bileşen içinde orantılı ölçek için kullanışlıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı değer, iki birim: 1,25em ve 1,25rem</text>
  <text x="180" y="60" class="b mid p">em: üst öğeye göre</text>
  <text x="540" y="60" class="b mid ok">rem: köke göre</text>
  <rect x="30" y="74" width="300" height="230" rx="10" class="sf sb"/>
  <text x="46" y="98" class="sm mu">html: 16 px</text>
  <rect x="50" y="110" width="260" height="180" rx="8" class="ps"/>
  <text x="66" y="134" class="sm">1. düzey: 16 × 1,25 = 20 px</text>
  <rect x="70" y="148" width="220" height="128" rx="8" class="sf sb"/>
  <text x="86" y="172" class="sm">2. düzey: 20 × 1,25 = 25 px</text>
  <rect x="90" y="186" width="180" height="76" rx="8" class="p"/>
  <text x="180" y="216" class="sm mid sf">3. düzey</text>
  <text x="180" y="240" class="b mid sf">25 × 1,25 = 31,25 px</text>
  <rect x="390" y="74" width="300" height="230" rx="10" class="sf sb"/>
  <text x="406" y="98" class="sm mu">html: 16 px</text>
  <rect x="410" y="110" width="260" height="180" rx="8" class="oks"/>
  <text x="426" y="134" class="sm">1. düzey: 16 × 1,25 = 20 px</text>
  <rect x="430" y="148" width="220" height="128" rx="8" class="sf sb"/>
  <text x="446" y="172" class="sm">2. düzey: 16 × 1,25 = 20 px</text>
  <rect x="450" y="186" width="180" height="76" rx="8" class="ok"/>
  <text x="540" y="216" class="sm mid sf">3. düzey</text>
  <text x="540" y="240" class="b mid sf">16 × 1,25 = 20 px</text>
  <rect x="30" y="324" width="660" height="80" rx="8" class="sf sb"/>
  <text x="50" y="350" class="b">Hızlı çeviri (kök 16 px)</text>
  <text x="50" y="376" class="sm">12 px = 0,75 rem · 14 px = 0,875 rem · 16 px = 1 rem · 18 px = 1,125 rem</text>
  <text x="50" y="394" class="sm">20 px = 1,25 rem · 24 px = 1,5 rem · 32 px = 2 rem · 48 px = 3 rem</text>
</svg>`
  },
  sections: [
    {
      h: "px, rem ve em nedir?",
      p: [
        "<strong>px (piksel)</strong>, CSS'teki temel mutlak uzunluk birimidir. Adı ekrandaki fiziksel noktadan gelse de CSS pikseli bir <em>referans pikseldir</em>: inçin 1/96'sı kabul edilir. Yüksek yoğunluklu ekranlarda bir CSS pikseli birden fazla fiziksel noktayla çizilir; bu yüzden 16 px'lik yazı telefonda da masaüstünde de yaklaşık aynı büyüklükte görünür.",
        "<strong>rem (root em)</strong>, sayfanın kök öğesi olan <code>html</code> etiketinin yazı boyutuna göre ölçeklenen göreli bir birimdir. Kök boyut değişmediği sürece sayfanın her yerinde 1 rem aynı değerdir. Tarayıcılar kök yazı boyutunu varsayılan olarak 16 px alır; kullanıcı tarayıcı ayarlarından \"büyük yazı\" seçtiğinde bu değer artar ve rem ile verilmiş tüm ölçüler birlikte büyür.",
        "<strong>em</strong> ise matbaacılıktan gelen ve o anki yazı boyutunu anlatan bir birimdir. CSS'te font-size özelliğinde kullanıldığında <em>üst öğenin</em> yazı boyutunu, padding, margin, width gibi diğer özelliklerde kullanıldığında ise <em>öğenin kendi</em> yazı boyutunu temel alır. Bu çift davranış hem güçlü hem de kafa karıştırıcıdır."
      ]
    },
    {
      h: "1 rem kaç piksel? 16px kaç rem? Çeviri formülü",
      p: [
        "rem ile piksel arasındaki çeviri, kök yazı boyutuna bölme ve çarpmadan ibarettir. Kök boyutu değiştirmediyseniz bölen 16'dır. em için aynı formül geçerlidir; yalnızca bölen olarak kökün değil, üst öğenin yazı boyutu kullanılır."
      ],
      formula: "rem = px ÷ kök yazı boyutu · px = rem × kök yazı boyutu\nem = px ÷ üst öğenin yazı boyutu\nÖrnek: 24 px ÷ 16 = 1,5 rem · 0,875 rem × 16 = 14 px",
      table: {
        head: ["Piksel", "rem (kök 16 px)", "rem (kök 10 px)", "Punto karşılığı", "Tipik kullanım"],
        rows: [
          ["12 px", "0,75 rem", "1,2 rem", "9 pt", "Dipnot, etiket"],
          ["14 px", "0,875 rem", "1,4 rem", "10,5 pt", "Yardımcı metin"],
          ["16 px", "1 rem", "1,6 rem", "12 pt", "Gövde metni"],
          ["18 px", "1,125 rem", "1,8 rem", "13,5 pt", "Büyük gövde metni"],
          ["20 px", "1,25 rem", "2 rem", "15 pt", "Alt başlık"],
          ["24 px", "1,5 rem", "2,4 rem", "18 pt", "H3 başlık"],
          ["32 px", "2 rem", "3,2 rem", "24 pt", "H2 başlık"],
          ["48 px", "3 rem", "4,8 rem", "36 pt", "Ana başlık"]
        ],
        caption: "Punto karşılığı CSS'in 1 pt = 4/3 px tanımıyla hesaplanmıştır."
      },
      after: [
        "Çeviriyi elle yapmak yerine [[arac:px-rem-cevir|px rem çevirici]] ile kök boyutu değiştirip hazır CSS değerini kopyalayabilirsiniz. Üst öğe boyutuna göre em hesaplamak için [[arac:px-em-cevir|px em çevirici]] aynı işi em için yapar."
      ]
    },
    {
      h: "em neden iç içe büyür? Çözümlü örnek",
      p: [
        "em'in font-size'da üst öğeye bakması, iç içe öğelerde değerlerin <strong>çarpılarak</strong> birikmesine yol açar. Aşağıdaki örnekte her liste öğesine 1,2em yazı boyutu verilmiş ve listeler iç içe yerleştirilmiştir."
      ],
      ol: [
        "Kök yazı boyutu 16 px. Birinci düzey liste öğesi: 16 × 1,2 = 19,2 px.",
        "İkinci düzeydeki öğe, üst öğesi olan birinci düzeyin 19,2 px'ini temel alır: 19,2 × 1,2 = 23,04 px.",
        "Üçüncü düzey: 23,04 × 1,2 = 27,65 px. Üç düzeyde yazı, niyet edilenin neredeyse 1,73 katına çıkmıştır.",
        "Aynı kuralı <code>1.2rem</code> ile yazsaydınız her düzey köke bakacağı için hepsi 19,2 px olurdu.",
        "Tersine, küçültme amaçlı <code>0.8em</code> iç içe kullanıldığında yazı 12,8 px, 10,24 px, 8,19 px diye okunmaz boyutlara iner."
      ],
      after: [
        "Bu davranış bazen istenir. Örneğin bir düğmenin padding değerini em ile verirseniz düğmenin yazı boyutunu büyüttüğünüzde iç boşluk da orantılı büyür; büyük, orta ve küçük düğme varyantları tek bir font-size değişikliğiyle elde edilir. Sorun, em'in yazı boyutu için gelişigüzel kullanılmasıdır."
      ]
    },
    {
      h: "Hangi birim nerede kullanılmalı?",
      p: [
        "Tek bir \"doğru birim\" yoktur; her birimin güçlü olduğu yer farklıdır. Aşağıdaki tablo, çoğu projede iyi işleyen bir başlangıç düzenini özetler. Ekip içinde bir kural belirleyip tutarlı uygulamak, hangi kuralı seçtiğinizden daha önemlidir."
      ],
      table: {
        head: ["Kullanım", "Önerilen birim", "Neden"],
        rows: [
          ["Yazı boyutları (gövde, başlık)", "rem", "Kullanıcının tarayıcı yazı ayarına uyar, iç içe birikmez"],
          ["Bileşen içi padding ve margin", "em", "Bileşenin yazı boyutuyla orantılı büyür"],
          ["Sayfa düzeni boşlukları", "rem", "Sayfa genelinde tutarlı ritim sağlar"],
          ["Kenarlık kalınlığı, gölge", "px", "1 px'lik çizginin keskin kalması istenir"],
          ["Satır yüksekliği", "Birimsiz sayı (1,5)", "Her öğenin kendi yazı boyutuyla çarpılır"],
          ["Medya sorgusu kırılma noktaları", "em ya da rem", "Yakınlaştırmada tutarlı davranır"],
          ["Tam ekran bölümler", "vh, vw, %", "Pencere boyutuna bağlı ölçüler"],
          ["Simge boyutu (metin yanında)", "em", "Yanındaki yazıyla birlikte büyür"]
        ]
      },
      after: [
        "Satır yüksekliğinde birimsiz sayı kullanmanın nedeni, em ya da px ile verilen değerin alt öğelere hesaplanmış piksel olarak aktarılmasıdır; birimsiz değer ise her öğede yeniden çarpılır. Bu küçük ayrıntı, başlıklarda satırların üst üste binmesi gibi hataları önler."
      ]
    },
    {
      h: "Tarayıcı varsayılan yazı boyutu neden 16px?",
      p: [
        "16 px değeri, erken dönem tarayıcıların masaüstü monitörlerde rahat okunan gövde metni boyutu olarak seçtiği ve sonra fiilî standart hâline gelen bir değerdir. CSS'in 96 DPI referans kabulüyle 16 px tam olarak 12 punto eder; bu da basılı belgelerde en yaygın gövde boyutuyla örtüşür.",
        "Önemli olan, bu değerin <strong>kullanıcı tarafından değiştirilebilir</strong> olmasıdır. Görme güçlüğü olan pek çok kullanıcı tarayıcı ayarından varsayılan yazıyı 20 ya da 24 px'e çıkarır. Siteniz yazı boyutlarını px ile sabitlemişse bu ayar etkisiz kalır; sayfayı yalnızca tüm sayfa yakınlaştırmasıyla büyütebilirler, bu da yatay kaydırma ve taşmalara yol açar. rem kullanan sitelerde ise metin doğal biçimde büyür.",
        "Bu nedenle kökte <code>html { font-size: 16px }</code> yazmak önerilmez; tarayıcı ayarını ezer. Hesabı kolaylaştırmak istiyorsanız yüzde kullanın: <code>html { font-size: 62.5% }</code> varsayılan 16 px'i 10 px'e indirir ama kullanıcı 20 px seçtiyse kök 12,5 px olur ve oran korunur. Bu durumda gövde metnine 1,6 rem vermeyi unutmamalısınız."
      ]
    },
    {
      h: "pt ve px arasındaki fark nedir?",
      p: [
        "CSS'te punto (pt) da mutlak bir birimdir ve 1 pt = 1/72 inç tanımlanır. Piksel 1/96 inç olduğundan 1 pt = 96 ÷ 72 = 1,333 px, 1 px = 0,75 pt eder. Kelime işlemcide 12 punto olarak tasarlanmış bir metni web sayfasında aynı boyutta göstermek için 16 px ya da 1 rem kullanırsınız.",
        "Ekran için pt kullanmanın bir avantajı yoktur; px ile aynı biçimde sabittir ve kullanıcı ayarına uymaz. pt'nin asıl yeri yazdırma stil sayfalarıdır: <code>@media print</code> içinde gövde metnine 11 pt vermek, kâğıtta beklediğiniz boyutu verir. Punto ve milimetre ilişkisinin ayrıntıları [[bilgi:punto-kac-mm-yazi-boyutu|punto kaç mm]] yazısında, punto–piksel çevirisi ise [[arac:punto-piksel-cevir|punto piksel çevirici]]de bulunur."
      ]
    },
    {
      h: "Duyarlı tasarımda birim seçimi ve sık yapılan hatalar",
      ul: [
        "<strong>Kökü px ile sabitlemek:</strong> <code>html { font-size: 16px }</code> kullanıcının tarayıcı yazı ayarını devre dışı bırakır. Kökü hiç tanımlamayın ya da yüzde kullanın.",
        "<strong>Yazı boyutunda iç içe em:</strong> Liste, menü ve yorum dizilerinde em birikerek beklenmedik boyutlar üretir. Yazı boyutu için rem tercih edin.",
        "<strong>Her şeyi rem yapmak:</strong> 1 px'lik kenarlıkları 0,0625 rem yazmak hiçbir şey kazandırmaz ve bazı ekranlarda çizgiyi bulanıklaştırabilir.",
        "<strong>Medya sorgusunda px ile yakınlaştırmayı unutmak:</strong> Kullanıcı yazıyı büyüttüğünde em tabanlı kırılma noktaları düzeni de doğru anda değiştirir.",
        "<strong>Kontrastı ihmal etmek:</strong> Doğru birimle büyüyen yazı, düşük kontrastlıysa yine okunmaz. Renk seçimini [[bilgi:renk-kontrasti-wcag-nedir|WCAG renk kontrastı]] ölçütüne göre denetleyin.",
        "<strong>vw ile yazı boyutu vermek:</strong> Yalnızca vw kullanan başlıklar yakınlaştırmaya tepki vermez; <code>clamp(1.5rem, 4vw, 3rem)</code> gibi rem ile sınırlanmış bir formül daha güvenlidir."
      ],
      after: [
        "Birimleri düzenledikten sonra stil dosyanızı yayına almadan küçültmek, sayfanın daha hızlı açılmasına yardım eder. [[arac:css-kucult|CSS küçültücü]] yorumları ve gereksiz boşlukları tarayıcınızda siler; kodunuz hiçbir sunucuya gönderilmez."
      ]
    }
  ],
  faq: [
    ["CSS'te px, rem ve em arasındaki fark nedir?", "px sabit bir uzunluktur ve kullanıcının tarayıcı yazı ayarından etkilenmez. rem her zaman kök html öğesinin yazı boyutuna göre hesaplanır. em ise yazı boyutu için üst öğeye, diğer özellikler için öğenin kendi yazı boyutuna göre ölçeklenir."],
    ["1 rem kaç pikseldir?", "1 rem, kök öğenin yazı boyutuna eşittir. Tarayıcıların varsayılanı 16 piksel olduğu için kökü değiştirmediyseniz 1 rem 16 pikseldir. Kullanıcı tarayıcı ayarından yazıyı büyütürse 1 rem de buna göre 20 ya da 24 piksel olabilir."],
    ["16px kaç rem eder?", "Varsayılan 16 piksellik kök boyutunda 16px tam 1 rem eder. Genel formül piksel değerini kök yazı boyutuna bölmektir; örneğin 24px 1,5 rem, 12px 0,75 rem, 32px ise 2 rem olarak yazılır."],
    ["em neden iç içe büyür?", "Yazı boyutunda em, üst öğenin hesaplanmış yazı boyutunu temel alır. İç içe her öğe bir öncekinin sonucuyla çarpıldığı için 1,2em üç düzeyde 19,2, 23,04 ve 27,65 piksele çıkar. rem köke baktığı için bu birikme yaşanmaz."],
    ["Duyarlı tasarımda hangi birim kullanılmalı?", "Yazı boyutları ve sayfa boşlukları için rem, bileşen içi padding ve simgeler için em, ince kenarlıklar için px pratik bir başlangıçtır. Satır yüksekliğini birimsiz sayıyla, tam ekran bölümleri ise vh, vw ya da yüzdeyle vermek uygundur."],
    ["pt ve px arasındaki fark nedir?", "İkisi de CSS'te mutlak birimdir; punto inçin 1/72'si, piksel ise 1/96'sı kabul edilir. Bu yüzden 1 pt 1,333 px eder ve 12 pt 16 px'e eşittir. Ekran için px ya da rem, yazdırma stil sayfaları için pt daha uygundur."],
    ["Tarayıcı varsayılan yazı boyutu neden 16px?", "16 piksel, erken dönem tarayıcıların rahat okunan gövde metni boyutu olarak seçtiği ve fiilî standart hâline gelen değerdir. 96 DPI kabulüyle tam 12 puntoya denk gelir. Kullanıcılar bu değeri tarayıcı ayarlarından büyütebilir."],
    ["CSS dosyası nasıl küçültülür?", "CSS küçültme, yorumları, satır sonlarını ve gereksiz boşlukları silerek dosya boyutunu düşürür. Tarayıcıda çalışan bir CSS küçültücüye kodunuzu yapıştırıp sonucu kopyalayabilirsiniz; işlev değişmez, yalnızca sayfa daha hızlı yüklenir."],
    ["html font-size 62.5% neden kullanılır?", "Bu değer varsayılan 16 piksellik kökü 10 piksele indirir ve rem hesabını kolaylaştırır; 1,6 rem 16 piksel olur. Yüzde kullanıldığı için kullanıcının tarayıcıdaki büyük yazı tercihi korunur, piksel ile sabitlemenin erişilebilirlik sorunu yaşanmaz."]
  ],
  tools: ["px-rem-cevir", "px-em-cevir", "punto-piksel-cevir", "css-kucult"],
  related: ["punto-kac-mm-yazi-boyutu", "renk-kontrasti-wcag-nedir", "hex-rgb-renk-kodlari-nedir", "dpi-ve-cozunurluk-nedir"],
  sources: [
    ["W3C – CSS Values and Units Module Level 4", "https://www.w3.org/TR/css-values-4/"],
    ["W3C – Web İçeriği Erişilebilirlik Yönergeleri (WCAG 2.2)", "https://www.w3.org/TR/WCAG22/"]
  ]
};
