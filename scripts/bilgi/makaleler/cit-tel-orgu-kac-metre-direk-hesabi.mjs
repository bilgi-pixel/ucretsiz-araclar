export default {
  slug: "cit-tel-orgu-kac-metre-direk-hesabi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Çit ve Tel Örgü Hesabı: Kaç Metre Tel, Kaç Direk Gerekir?",
  pageTitle: "Tel Örgü Hesabı: Kaç Metre Tel ve Kaç Direk Gerekir?",
  description: "Tel örgü metrajı = çevre − kapı boşlukları; direk sayısı kapalı alanda çevre ÷ direk aralığı (yukarı yuvarlanır). Rulo, gergi teli, köşe direği hesabı ve örnek.",
  keywords: ["tel örgü hesaplama", "çit hesaplama", "bahçe çiti kaç metre", "tel örgü direk aralığı", "kaç direk gerekir", "panel çit hesabı", "gergi teli kaç sıra", "bir dönüm çevresi kaç metre"],
  lead: "Tel örgü ihtiyacı, çevrilecek alanın <strong>çevre uzunluğundan kapı boşluklarının düşülmesiyle</strong> bulunur; direk sayısı ise kapalı bir alanda çevrenin direk aralığına bölünüp yukarı yuvarlanmasıyla hesaplanır. 30 × 40 m'lik bir bahçenin çevresi 140 m'dir; 2,5 m aralıkla 56 direk, 3 m kapı düşülünce 137 m tel örgü gerekir. Bu sayfada çevre hesabını, direk aralığı seçimini, köşe ve kapı direklerini, rulo ve gergi teli metrajını ve panel çitle farkı örneklerle bulacaksınız.",
  kisaCevap: [
    "Çevre = dikdörtgende 2 × (en + boy); düzensiz arazide tüm kenarlar toplanır.",
    "Tel örgü uzunluğu = çevre − toplam kapı genişliği.",
    "Kapalı alanda direk sayısı = çevre ÷ direk aralığı (yukarı yuvarlanır); açık hatta bu sayıya 1 eklenir.",
    "Tel örgüde direk aralığı genellikle 2–3 m'dir; rüzgâr alan yerlerde ve yüksek çitte aralık kısaltılır.",
    "Rulo sayısı = tel örgü uzunluğu ÷ rulo boyu (yukarı yuvarlanır); gergi teli = tel uzunluğu × sıra sayısı.",
    "Köşe, kapı ve uzun düz hatlardaki gergi direklerine ayrıca payanda konur."
  ],
  figure: {
    alt: "30 metreye 40 metrelik bahçenin üstten görünümü: çevre 140 metre, 2,5 metre aralıkla 56 direk, 3 metrelik kapı boşluğu; 137 metre tel örgü, 25 metrelik rulodan 6 adet ve 3 sıra gergiyle 411 metre gergi teli.",
    caption: "Kapalı bir çitte başlangıç ve bitiş direği aynıdır; bu yüzden direk sayısı bölme sayısına eşittir. Kapının iki yanındaki direkler bu sayının içindedir ama payandalı ve daha güçlü olmalıdır.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">30 × 40 m bahçe: tel örgü ve direk hesabı</text>
  <rect x="60" y="60" width="400" height="300" class="oks"/>
  <polyline points="60,60 460,60 460,360 300,360" class="sp sw" fill="none"/>
  <polyline points="270,360 60,360 60,60" class="sp sw" fill="none"/>
  <line x1="270" y1="360" x2="300" y2="360" class="sdg dash" fill="none"/>
  <text x="285" y="384" class="sm mid b dg">kapı 3 m</text>
  <g class="p">
    <circle cx="60" cy="60" r="6"/><circle cx="460" cy="60" r="6"/><circle cx="460" cy="360" r="6"/><circle cx="60" cy="360" r="6"/>
    <circle cx="270" cy="360" r="6"/><circle cx="300" cy="360" r="6"/>
  </g>
  <g class="ps sp">
    <circle cx="85" cy="60" r="3"/><circle cx="110" cy="60" r="3"/><circle cx="135" cy="60" r="3"/><circle cx="160" cy="60" r="3"/><circle cx="185" cy="60" r="3"/><circle cx="210" cy="60" r="3"/><circle cx="235" cy="60" r="3"/><circle cx="260" cy="60" r="3"/><circle cx="285" cy="60" r="3"/><circle cx="310" cy="60" r="3"/><circle cx="335" cy="60" r="3"/><circle cx="360" cy="60" r="3"/><circle cx="385" cy="60" r="3"/><circle cx="410" cy="60" r="3"/><circle cx="435" cy="60" r="3"/>
  </g>
  <text x="260" y="50" class="sm mid">40 m · 16 bölme</text>
  <text x="474" y="214" class="sm">30 m</text>
  <text x="474" y="232" class="sm">12 bölme</text>
  <text x="260" y="214" class="b mid">Çevre 2 × (30 + 40) = 140 m</text>
  <rect x="500" y="60" width="200" height="300" rx="8" class="sf sb"/>
  <text x="516" y="90" class="sm b">Direk aralığı 2,5 m</text>
  <text x="516" y="116" class="sm">140 ÷ 2,5 = 56 bölme</text>
  <text x="516" y="140" class="sm b">Direk: 56 adet</text>
  <line x1="516" y1="156" x2="684" y2="156" class="sb" fill="none"/>
  <text x="516" y="182" class="sm">Tel: 140 − 3 = 137 m</text>
  <text x="516" y="206" class="sm">Rulo 25 m: 137 ÷ 25</text>
  <text x="516" y="230" class="sm b">= 5,48 → 6 rulo</text>
  <line x1="516" y1="246" x2="684" y2="246" class="sb" fill="none"/>
  <text x="516" y="272" class="sm">Gergi teli 3 sıra</text>
  <text x="516" y="296" class="sm b">137 × 3 = 411 m</text>
  <text x="516" y="330" class="sm t2">Payanda: köşe ve</text>
  <text x="516" y="348" class="sm t2">kapı direklerine</text>
  <text x="360" y="420" class="sm mid mu">Büyük daire: köşe ve kapı direği · küçük daire: ara direk (üst kenar örnek)</text>
</svg>`
  },
  sections: [
    {
      h: "Bahçeye kaç metre tel örgü gerekir?",
      p: [
        "Tel örgü hesabı, çevrilecek hattın uzunluğunu bulmakla başlar. Dikdörtgen ya da kare bir bahçede çevre iki kenarın toplamının iki katıdır. Düzensiz bir arazide ise her kenar ayrı ayrı ölçülüp toplanır. Tapuda ya da imar planında kenar uzunlukları yazıyorsa onları kullanabilirsiniz; yoksa şerit metre ya da ölçüm tekerleğiyle sahada ölçüm yapmak gerekir.",
        "Bulunan çevreden kapı ve geçiş boşlukları düşülür; çünkü bu kısımlara tel örgü değil kapı takılır. Eğimli arazide tel, yatay izdüşüm değil zemin boyunca uzandığı için gerçek uzunluk biraz daha fazladır; dik yamaçlarda %3–5 pay eklemek iyi bir alışkanlıktır. Ölçüm yaparken komşu parsel sınırını tam olarak bilmiyorsanız önce sınırı netleştirin; çiti yanlış hatta kurmak sonradan sökme ve yeniden kurma maliyeti doğurur."
      ],
      formula: "Dikdörtgen çevre = 2 × (en + boy)\nDüzensiz arazi çevresi = kenar1 + kenar2 + … + kenarN\nTel örgü uzunluğu = çevre − toplam kapı genişliği",
      after: [
        "Alanı ve çevreyi aynı anda bulmak için [[arac:alan-cevre-hesapla|Alan Çevre Hesaplama]] aracını kullanabilirsiniz. Ölçüleri metrekareye çevirmek gerekiyorsa [[arac:metrekare-hesapla|Metrekare Hesaplama]] aracı işinizi görür."
      ]
    },
    {
      h: "Tel örgü direkleri kaç metrede bir dikilir?",
      p: [
        "Tel örgü çitlerinde direk aralığı yaygın olarak <strong>2 ile 3 metre</strong> arasındadır. Aralık arttıkça direk sayısı ve maliyet düşer, ama tel arada sarkar ve çit rüzgâra, hayvanlara ve darbelere karşı zayıflar. Çit yüksekliği arttıkça, zemin yumuşadıkça ya da rüzgâr güçlendikçe aralığı kısaltmak gerekir."
      ],
      table: {
        head: ["Durum", "Önerilen direk aralığı", "Not"],
        rows: [
          ["100–150 cm bahçe çiti", "2,5–3 m", "Düz ve sert zeminde"],
          ["150–200 cm çit", "2–2,5 m", "Rüzgâr yükü artar"],
          ["Yumuşak ya da dolgu zemin", "2 m", "Direk temeli de derin olmalı"],
          ["Hayvan çiti (koyun, keçi, köpek)", "2–2,5 m", "Alt telin gergin olması önemli"],
          ["Panel çit", "Panel boyuna eşit (çoğunlukla 2,5 m)", "Aralığı panel belirler"]
        ],
        caption: "Değerler yaygın uygulamayı gösterir; üretici önerisi ve yerel koşullar esas alınmalıdır."
      }
    },
    {
      h: "Direk sayısı nasıl hesaplanır?",
      p: [
        "Direk sayısını bulmak için önce hattı eşit bölmelere ayırırsınız. Bölme sayısı, hat uzunluğunun en fazla kabul ettiğiniz direk aralığına bölünüp <strong>yukarı yuvarlanmasıyla</strong> bulunur. Böylece gerçek aralık seçtiğiniz değeri hiçbir zaman aşmaz. Ardından hattın kapalı mı açık mı olduğuna bakılır."
      ],
      formula: "Bölme sayısı = yukarı yuvarla (hat uzunluğu ÷ en fazla direk aralığı)\nKapalı alan (bahçe çevresi): direk sayısı = bölme sayısı\nAçık hat (tek kenar, duvardan duvara): direk sayısı = bölme sayısı + 1\nGerçek aralık = hat uzunluğu ÷ bölme sayısı",
      ol: [
        "30 × 40 m bahçenin çevresi: 2 × (30 + 40) = 140 m.",
        "En fazla direk aralığı 2,5 m: 140 ÷ 2,5 = 56 bölme (tam bölündüğü için yuvarlama gerekmez).",
        "Çit kapalı bir döngü olduğu için direk sayısı 56 adettir.",
        "Aralık 3 m seçilseydi: 140 ÷ 3 = 46,7 → 47 bölme, 47 direk; gerçek aralık 140 ÷ 47 ≈ 2,98 m olurdu.",
        "Yalnızca 40 m'lik tek bir kenar çevrilseydi: 40 ÷ 2,5 = 16 bölme, 16 + 1 = 17 direk gerekirdi."
      ],
      after: [
        "Hesabı kendi ölçülerinizle yapmak için [[arac:cit-hesapla|Çit ve Tel Örgü Hesaplama]] aracına hat uzunluğunu, direk aralığını, kapı genişliğini, rulo boyunu ve gergi teli sıra sayısını girebilirsiniz; araç kapalı ve açık hat seçeneğine göre direk sayısını ve gerçek aralığı gösterir."
      ]
    },
    {
      h: "Köşe ve kapı direkleri hesaba nasıl katılır?",
      p: [
        "Yukarıdaki hesapta köşeler ve kapı kenarları zaten direk sayısının içindedir, çünkü bölmeleri hattın tamamına dağıttık. Ancak uygulamada köşelerin ve kapı kenarlarının tam bir bölme noktasına denk gelmesi gerekir. Bunu sağlamanın en kolay yolu her kenarı ayrı hesaplamaktır: 40 m'lik kenar 16 bölme, 30 m'lik kenar 12 bölmedir; 2 × 16 + 2 × 12 = 56 bölme yine aynı sonucu verir.",
        "Köşe, kapı ve uzun düz hatların başlangıç-bitiş noktalarındaki direkler <strong>gergi direği</strong> görevi görür; tel bunlara gerdirilir ve üzerlerine çapraz payanda (destek) konur. Bu direkler genellikle ara direklerden daha kalın ve daha derin temellidir. Uzun düz hatlarda her 25–50 m'de bir ara gergi direği kullanmak telin gerginliğini korur. Payandalar direk sayısına dahil değildir; ayrı kalem olarak hesaplanmalıdır."
      ],
      ul: [
        "Her köşe direği için iki yöne birer payanda.",
        "Kapı direkleri için kapı ağırlığını taşıyacak kalın direk ve beton temel.",
        "Uzun hatlarda ara gergi direği ve iki yöne payanda.",
        "Kapı genişliği, kanat sayısına ve geçecek araca göre belirlenir: yaya kapısı yaklaşık 1 m, araç kapısı 3–4 m."
      ]
    },
    {
      h: "Rulo sayısı, gergi teli ve bağ teli hesabı",
      p: [
        "Tel örgü genellikle 10, 15, 20 ya da 25 metrelik rulolar hâlinde satılır. Rulo sayısı tel örgü uzunluğunun rulo boyuna bölünüp yukarı yuvarlanmasıyla bulunur. Rulolar birleştirilirken birkaç göz bindirme yapıldığı için hesabın tam bir rulo sınırına yakın çıktığı durumlarda bir rulo fazla almak güvenlidir."
      ],
      formula: "Rulo sayısı = yukarı yuvarla (tel örgü uzunluğu ÷ rulo boyu)\nGergi teli = tel örgü uzunluğu × gergi teli sıra sayısı\nÖrnek: 137 ÷ 25 = 5,48 → 6 rulo; 137 × 3 = 411 m gergi teli",
      after: [
        "Gergi teli, örgüyü direklere ve birbirine sabitleyen yatay tellerdir. Çit yüksekliğine göre genellikle 2 ya da 3 sıra çekilir: alt, orta ve üst. 150 cm ve üzeri çitlerde 3 sıra yaygındır. Gergi telinin uçlarının gergi direklerine sarılması için her uca yaklaşık 0,5–1 m pay ekleyin. Örgüyü gergi teline bağlamak için kullanılan bağ teli ise genellikle kilogramla satılır ve küçük bir miktar yeterlidir."
      ]
    },
    {
      h: "Tel örgü yüksekliği kaç cm olmalı?",
      p: [
        "Yükseklik, çitin amacına göre seçilir. Bahçe sınırını belirlemek ve küçük hayvanların geçişini önlemek için 100–150 cm genellikle yeterlidir. Köpeklerin atlamasını engellemek ya da mahremiyet ve güvenlik için 150–200 cm tercih edilir. Tarla ve bağ çevresinde yaban hayvanlarına karşı daha yüksek çitler kullanılabilir.",
        "Direk boyu, çit yüksekliğine toprağa gömülecek kısım eklenerek belirlenir. Yaygın uygulamada direğin toplam boyunun yaklaşık üçte biri ya da en az 50–60 cm'si toprağa gömülür ve beton temelle sabitlenir. 150 cm'lik bir çit için yaklaşık 200–220 cm'lik direkler kullanılır. Bulunduğunuz yerdeki imar ve komşuluk kurallarında çit yüksekliğine ilişkin bir sınırlama olup olmadığını belediyenizden öğrenin."
      ]
    },
    {
      h: "Panel çit ile tel örgü arasındaki fark nedir?",
      table: {
        head: ["Özellik", "Tel örgü", "Panel çit"],
        rows: [
          ["Yapı", "Rulo hâlinde esnek örgü", "Kaynaklı, sert hazır paneller"],
          ["Direk aralığı", "Serbest, genellikle 2–3 m", "Panel boyuna bağlı, çoğunlukla 2,5 m"],
          ["Gergi teli", "Gerekir", "Genellikle gerekmez"],
          ["Eğimli arazi", "Kolay uyum sağlar", "Basamaklı montaj gerekebilir"],
          ["Görünüm", "Daha basit", "Daha düzgün ve sağlam"],
          ["Hesap", "Metre ve rulo", "Panel adedi = hat uzunluğu ÷ panel boyu"]
        ]
      },
      after: [
        "Panel çitte hesap, hat uzunluğunun panel boyuna bölünüp yukarı yuvarlanmasıyla yapılır. 137 m için 2,5 m'lik panelle 137 ÷ 2,5 = 54,8 → 55 panel gerekir. Son panelin kesilmesi gerekebilir; bu durumda kesim yerindeki galvaniz kaplamanın korunması için koruyucu boya kullanın."
      ]
    },
    {
      h: "Bir dönüm arazinin çevresi kaç metre olur?",
      p: [
        "Bir dönüm 1.000 m²'dir, ama çevresi arazinin şekline göre değişir. Kare bir dönümün kenarı √1.000 ≈ 31,62 m, çevresi yaklaşık 126,5 m'dir. Aynı alan 20 × 50 m'lik bir dikdörtgen olsaydı çevre 140 m, 10 × 100 m'lik dar uzun bir parsel olsaydı 220 m olurdu. Yani aynı alanı çevirmek için gereken tel, parsel uzadıkça artar; en kısa çevre kareye yakın şekillerde elde edilir."
      ],
      table: {
        head: ["Parsel şekli (1 dönüm)", "Kenarlar", "Çevre", "2,5 m aralıkla direk"],
        rows: [
          ["Kare", "31,62 × 31,62 m", "126,5 m", "51 adet"],
          ["Dikdörtgen", "20 × 50 m", "140 m", "56 adet"],
          ["Dar uzun", "10 × 100 m", "220 m", "88 adet"]
        ]
      },
      after: [
        "Dönüm ve metrekare dönüşümü için [[arac:donum-metrekare-cevir|Dönüm Metrekare Çevirici]] aracını, dönümün tarihçesi ve bölgesel farkları için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazısını okuyabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kapalı alanda bir direk fazla saymak:</strong> Döngüde ilk ve son direk aynıdır.",
        "<strong>Açık hatta bir direk eksik saymak:</strong> Düz bir hatta bölme sayısından bir fazla direk gerekir.",
        "<strong>Kapı boşluğunu tel metrajından düşmemek:</strong> Gereğinden fazla tel alınır.",
        "<strong>Payandaları unutmak:</strong> Köşe ve kapı direkleri payandasız kalırsa tel zamanla gevşer.",
        "<strong>Eğimi hesaba katmamak:</strong> Yamaçta gerçek uzunluk yatay ölçüden fazladır."
      ]
    }
  ],
  faq: [
    ["Bahçeye kaç metre tel örgü gerekir?", "Bahçenin çevresini bulun ve kapı boşluklarını düşün. 30 × 40 m'lik bir bahçenin çevresi 140 m'dir; 3 m'lik kapı düşülünce 137 m tel örgü gerekir. Eğimli arazide birkaç yüzde pay ekleyin."],
    ["Tel örgü direkleri kaç metrede bir dikilir?", "Tel örgüde direk aralığı genellikle 2 ile 3 metre arasındadır. Çit yükseldikçe, zemin yumuşadıkça ve rüzgâr güçlendikçe aralık kısaltılır; 150–200 cm çitlerde 2–2,5 m yaygındır."],
    ["Direk sayısı nasıl hesaplanır?", "Hat uzunluğu en fazla direk aralığına bölünüp yukarı yuvarlanır ve bölme sayısı bulunur. Kapalı bir alanda direk sayısı bölme sayısına eşittir; açık bir hatta bu sayıya bir direk eklenir."],
    ["Köşe ve kapı direkleri hesaba nasıl katılır?", "Her kenarı ayrı ayrı bölmelere ayırırsanız köşeler ve kapı kenarları otomatik olarak direk noktası olur. Bu direkler gergi direği görevi gördüğü için daha kalın seçilir ve üzerlerine payanda eklenir."],
    ["Panel çit ile tel örgü arasındaki fark nedir?", "Tel örgü rulo hâlinde esnek bir örgüdür ve gergi teli gerektirir. Panel çit kaynaklı sert panellerden oluşur, direk aralığını panel boyu belirler ve genellikle daha düzgün, daha sağlam bir görünüm sunar."],
    ["Tel örgü yüksekliği kaç cm olmalı?", "Bahçe sınırı için 100–150 cm genellikle yeterlidir; köpeklerin atlamasını önlemek ve güvenlik için 150–200 cm tercih edilir. Yerel imar kurallarında yükseklik sınırı olup olmadığını belediyenizden öğrenin."],
    ["Gerdirme teli kaç sıra çekilir?", "Çit yüksekliğine göre genellikle 2 ya da 3 sıra gergi teli çekilir. 150 cm ve üzeri çitlerde alt, orta ve üst olmak üzere 3 sıra yaygındır; toplam metraj tel uzunluğunun sıra sayısıyla çarpımıdır."],
    ["Tel örgü rulosu kaç tane alınmalı?", "Tel örgü uzunluğunu rulo boyuna bölün ve sonucu yukarı yuvarlayın. 137 metre için 25 metrelik rulodan 5,48 çıkar, yani 6 rulo gerekir; birleşim yerlerindeki bindirmeler nedeniyle sınıra yakın sonuçlarda bir rulo fazla almak güvenlidir."],
    ["Bir dönüm arazinin çevresi kaç metre olur?", "Çevre şekle bağlıdır. Kare bir dönümün çevresi yaklaşık 126,5 m, 20 × 50 m'lik dikdörtgeninki 140 m, 10 × 100 m'lik dar parselinki 220 m'dir; kareye yakın şekiller en az tel gerektirir."]
  ],
  tools: ["cit-hesapla", "alan-cevre-hesapla", "donum-metrekare-cevir", "metrekare-hesapla"],
  related: ["1-donum-kac-metrekare", "alan-ve-hacim-formulleri", "insaat-demiri-agirligi-tablosu"]
};
