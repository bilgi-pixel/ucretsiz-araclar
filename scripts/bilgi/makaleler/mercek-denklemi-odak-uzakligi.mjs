export default {
  slug: "mercek-denklemi-odak-uzakligi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Mercek Denklemi Nedir? İnce Kenarlı Mercekte Odak Uzaklığı ve Görüntü",
  pageTitle: "Mercek Denklemi: 1/f = 1/d₀ + 1/dᵢ, Odak ve Büyütme",
  description: "Mercek denklemi 1/f = 1/d₀ + 1/dᵢ; büyütme m = −dᵢ/d₀. İnce ve kalın kenarlı mercek farkı, gerçek-sanal görüntü, diyoptri ve gözlük camları çözümlü.",
  keywords: ["mercek denklemi", "ince kenarlı mercek", "kalın kenarlı mercek", "odak uzaklığı", "görüntü uzaklığı", "büyütme formülü", "diyoptri nedir", "gerçek ve sanal görüntü"],
  lead: "Mercek denklemi, cismin merceğe uzaklığı (d<sub>0</sub>), görüntünün merceğe uzaklığı (d<sub>i</sub>) ve odak uzaklığı (f) arasındaki ilişkidir: <strong>1/f = 1/d<sub>0</sub> + 1/d<sub>i</sub></strong>. Büyütme ise <strong>m = −d<sub>i</sub>/d<sub>0</sub></strong> ile bulunur. Odak uzaklığı 10 cm olan ince kenarlı bir merceğin 30 cm önündeki cismin görüntüsü merceğin arkasında 15 cm'de, ters ve yarı boyda oluşur. Bu sayfada işaret kuralını, ince ve kalın kenarlı mercek farkını, gerçek ve sanal görüntüyü, diyoptriyi ve gözlük camlarını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "İnce mercek denklemi: 1/f = 1/d<sub>0</sub> + 1/d<sub>i</sub>.",
    "Büyütme: m = −d<sub>i</sub> ÷ d<sub>0</sub> = görüntü boyu ÷ cisim boyu; m negatifse görüntü terstir.",
    "İnce kenarlı (yakınsak) mercekte f pozitif, kalın kenarlı (ıraksak) mercekte f negatiftir.",
    "d<sub>i</sub> pozitifse görüntü gerçektir (perdeye düşer), negatifse sanaldır (cisimle aynı tarafta, perdeye düşmez).",
    "Diyoptri = 1 ÷ f (metre); f = 0,5 m olan merceğin gücü +2 D'dir.",
    "Miyop gözlüğü kalın kenarlı (eksi), hipermetrop ve okuma gözlüğü ince kenarlı (artı) mercektir."
  ],
  figure: {
    alt: "İnce kenarlı mercekte ışın çizimi: f = 10 cm, 4 cm boyundaki cisim 30 cm uzaklıkta; üç özel ışın merceğin arkasında 15 cm'de birleşerek 2 cm boyunda ters ve gerçek görüntü oluşturuyor.",
    caption: "Asal eksene paralel gelen ışın kırılınca odaktan geçer, merkezden geçen ışın sapmaz, odaktan geçerek gelen ışın paralel çıkar. Üç ışının kesiştiği yerde görüntü oluşur: d<sub>i</sub> = 15 cm, m = −0,5.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">İnce kenarlı mercek: f = 10 cm, d₀ = 30 cm</text>
  <line x1="40" y1="190" x2="690" y2="190" class="st" fill="none"/>
  <ellipse cx="400" cy="190" rx="12" ry="110" class="ps"/>
  <line x1="400" y1="80" x2="400" y2="300" class="sp" fill="none"/>
  <circle cx="300" cy="190" r="5" class="p"/><text x="300" y="214" class="sm mid b">F</text>
  <circle cx="500" cy="190" r="5" class="p"/><text x="500" y="176" class="sm mid b">F'</text>
  <circle cx="200" cy="190" r="4" class="t2"/><text x="200" y="214" class="sm mid">2F</text>
  <circle cx="600" cy="190" r="4" class="t2"/><text x="600" y="214" class="sm mid">2F'</text>
  <line x1="100" y1="190" x2="100" y2="130" class="sp sw" fill="none"/>
  <polygon points="92,138 100,124 108,138" class="p"/>
  <text x="100" y="116" class="sm mid b">cisim 4 cm</text>
  <polyline points="100,130 400,130 550,220" class="sa" fill="none"/>
  <line x1="100" y1="130" x2="550" y2="220" class="sok" fill="none"/>
  <polyline points="100,130 400,220 550,220" class="st dash" fill="none"/>
  <line x1="550" y1="190" x2="550" y2="220" class="sp sw" fill="none"/>
  <polygon points="542,212 550,226 558,212" class="p"/>
  <text x="550" y="246" class="sm mid b">görüntü 2 cm, ters</text>
  <g class="sm mid t2">
    <line x1="100" y1="268" x2="400" y2="268" class="st" fill="none"/><text x="250" y="286">d₀ = 30 cm</text>
    <line x1="400" y1="268" x2="550" y2="268" class="st" fill="none"/><text x="475" y="286">dᵢ = 15 cm</text>
  </g>
  <rect x="40" y="306" width="640" height="78" rx="8" class="sf sb"/><rect x="40" y="306" width="8" height="78" class="p"/>
  <text x="62" y="332" class="b">1/f = 1/d₀ + 1/dᵢ → 1/10 = 1/30 + 1/dᵢ → dᵢ = 15 cm</text>
  <text x="62" y="358" class="sm">m = −dᵢ ÷ d₀ = −15 ÷ 30 = −0,5 → gerçek, ters, yarı boyda (4 cm → 2 cm)</text>
</svg>`
  },
  sections: [
    {
      h: "Mercek nedir? İnce ve kalın kenarlı mercek farkı",
      p: [
        "Mercek, ışığı kırarak yönünü değiştiren, en az bir yüzeyi eğri olan saydam bir cisimdir. Işık camdan, plastikten ya da sudan geçerken hızı değiştiği için kırılır; merceğin eğri yüzeyi bu kırılmayı her noktada farklı açıyla yaparak ışınları bir noktada toplar ya da dağıtır. Işığın kırılmasının temel kuralı olan Snell yasasını [[bilgi:snell-yasasi-isigin-kirilmasi|Snell yasası yazısında]] bulabilirsiniz.",
        "<strong>İnce kenarlı mercek</strong> ortası kalın, kenarları ince olan merceklerdir ve paralel gelen ışınları bir noktada toplar; bu yüzden <strong>yakınsak</strong> ya da toplayıcı mercek de denir. Büyüteç, fotoğraf makinesi objektifi ve gözümüzdeki göz merceği bu türdendir. <strong>Kalın kenarlı mercek</strong> ise ortası ince, kenarları kalındır ve paralel ışınları dağıtır; buna <strong>ıraksak</strong> ya da dağıtıcı mercek denir. Dağılan ışınların uzantıları merceğin önünde bir noktada birleşir ve bu nokta sanal odak olarak kabul edilir.",
        "Odak uzaklığı (f), merceğin merkezi ile odak noktası arasındaki uzaklıktır. İnce kenarlı mercekte f pozitif, kalın kenarlı mercekte negatif alınır. Merceğin iki tarafında simetrik olarak birer odak (F ve F') ve odak uzaklığının iki katında birer merkez noktası (2F) bulunur."
      ]
    },
    {
      h: "Mercek denklemi ve işaret kuralı",
      formula: "1/f = 1/d₀ + 1/dᵢ\ndᵢ = (f × d₀) ÷ (d₀ − f)\nm = −dᵢ ÷ d₀ = hᵢ ÷ h₀\nDiyoptri: D = 1 ÷ f (f metre cinsinden)",
      p: [
        "Bu sayfada okul kitaplarında yaygın olan \"gerçek pozitif\" işaret kuralı kullanılır. Cisim merceğin önündeyse d<sub>0</sub> pozitiftir. Görüntü merceğin arkasında (ışığın çıktığı tarafta) oluşuyorsa d<sub>i</sub> pozitiftir ve görüntü <strong>gerçektir</strong>; merceğin önünde, cisimle aynı tarafta oluşuyorsa d<sub>i</sub> negatiftir ve görüntü <strong>sanaldır</strong>.",
        "Büyütme m, görüntü boyunun cisim boyuna oranıdır. m negatifse görüntü ters, pozitifse düzdür; mutlak değeri 1'den büyükse görüntü cisimden büyük, küçükse küçüktür. Bazı üniversite fizik kitapları farklı bir işaret kuralı (Kartezyen) kullanır ve denklemi 1/f = 1/d<sub>i</sub> − 1/d<sub>0</sub> biçiminde yazar; hangi kural kullanılırsa kullanılsın, aynı kurala tutarlı biçimde uymak gerekir."
      ]
    },
    {
      h: "Görüntünün yeri ve boyu nasıl hesaplanır? Çözümlü örnekler",
      ol: [
        "<strong>Örnek 1 (2F'nin dışında):</strong> f = 10 cm, d<sub>0</sub> = 30 cm, cisim boyu 4 cm. 1/d<sub>i</sub> = 1/10 − 1/30 = 2/30 → d<sub>i</sub> = <strong>15 cm</strong>. m = −15/30 = −0,5. Görüntü merceğin arkasında, gerçek, ters ve 2 cm boyundadır.",
        "<strong>Örnek 2 (tam 2F'de):</strong> f = 10 cm, d<sub>0</sub> = 20 cm. 1/d<sub>i</sub> = 1/10 − 1/20 = 1/20 → d<sub>i</sub> = 20 cm, m = −1. Görüntü gerçek, ters ve cisimle aynı boydadır.",
        "<strong>Örnek 3 (F ile 2F arasında):</strong> f = 10 cm, d<sub>0</sub> = 15 cm. d<sub>i</sub> = 10 × 15 ÷ 5 = 30 cm, m = −2. Görüntü gerçek, ters ve iki kat büyüktür; projeksiyon cihazları bu düzenle çalışır.",
        "<strong>Örnek 4 (odak içinde, büyüteç):</strong> f = 10 cm, d<sub>0</sub> = 5 cm. d<sub>i</sub> = 10 × 5 ÷ (5 − 10) = −10 cm, m = +2. Görüntü sanal, düz ve iki kat büyüktür; cisimle aynı tarafta oluşur.",
        "<strong>Örnek 5 (kalın kenarlı mercek):</strong> f = −10 cm, d<sub>0</sub> = 20 cm. 1/d<sub>i</sub> = −1/10 − 1/20 = −3/20 → d<sub>i</sub> ≈ −6,67 cm, m ≈ +0,33. Görüntü sanal, düz ve küçüktür."
      ],
      after: [
        "Bu hesapları [[arac:mercek-denklemi-hesapla|Mercek Denklemi Hesaplama]] aracıyla yapabilirsiniz; cisim uzaklığı, görüntü uzaklığı ya da odak uzaklığından herhangi ikisini girdiğinizde üçüncüsünü, büyütmeyi, görüntünün gerçek-sanal ve düz-ters niteliğini ve diyoptriyi gösterir. Orantılı büyütme mantığı için [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Cismin yerine göre görüntü tablosu",
      table: {
        head: ["Cismin yeri (ince kenarlı)", "Görüntünün yeri", "Niteliği", "Kullanım örneği"],
        rows: [
          ["Sonsuzda", "F' noktasında", "Gerçek, ters, nokta", "Güneş ışınlarını toplama"],
          ["2F'nin dışında", "F' ile 2F' arasında", "Gerçek, ters, küçük", "Fotoğraf makinesi, göz"],
          ["2F'de", "2F'de", "Gerçek, ters, eşit boy", "Fotokopi (1:1)"],
          ["F ile 2F arasında", "2F'nin dışında", "Gerçek, ters, büyük", "Projeksiyon cihazı"],
          ["F'de", "Sonsuzda", "Görüntü oluşmaz", "Işıldak, fener"],
          ["F ile mercek arasında", "Cisimle aynı tarafta", "Sanal, düz, büyük", "Büyüteç"]
        ],
        caption: "Kalın kenarlı mercekte cisim nerede olursa olsun görüntü sanal, düz, cisimden küçük ve merceğe cisimden daha yakındır."
      }
    },
    {
      h: "Gerçek ve sanal görüntü farkı",
      p: [
        "<strong>Gerçek görüntü</strong>, ışınların kırıldıktan sonra gerçekten bir noktada birleşmesiyle oluşur. Bu yüzden bir perdeye, beyaz bir kâğıda ya da kamera sensörüne düşürülebilir. İnce kenarlı mercekte cisim odak noktasının dışındaysa görüntü gerçektir ve her zaman terstir. Gözümüzün ağ tabakasında oluşan görüntü de gerçek ve terstir; beyin bu görüntüyü düz olarak yorumlar.",
        "<strong>Sanal görüntü</strong> ise ışınların kendisinin değil, geriye doğru uzantılarının kesiştiği yerde oluşur. Işık oraya gerçekten gitmediği için perdeye düşürülemez, ancak merceğe bakan göz tarafından görülür. Büyüteçle baktığınızda gördüğünüz büyük yazı ve aynadaki yansımanız sanal görüntüdür."
      ]
    },
    {
      h: "Diyoptri ne anlama gelir?",
      p: [
        "<strong>Diyoptri (D)</strong> merceğin kırma gücünü gösteren birimdir ve odak uzaklığının metre cinsinden tersine eşittir: D = 1/f. Odak uzaklığı 50 cm (0,5 m) olan ince kenarlı mercek +2 D, odak uzaklığı −25 cm olan kalın kenarlı mercek −4 D güce sahiptir. Odak uzaklığı kısaldıkça mercek ışığı daha güçlü kırar ve diyoptri değeri büyür.",
        "Birbirine bitişik ince merceklerin toplam gücü, güçlerinin toplamına eşittir. +3 D ve −1 D'lik iki mercek bir arada +2 D'lik tek bir mercek gibi davranır. Göz doktorlarının reçetelerinde ve gözlük camlarında değerler bu yüzden diyoptri ile yazılır; işlem kolaylığı sağlar."
      ],
      table: {
        head: ["Odak uzaklığı", "Diyoptri", "Mercek türü"],
        rows: [
          ["+1 m", "+1 D", "İnce kenarlı, zayıf"],
          ["+0,5 m", "+2 D", "İnce kenarlı (okuma gözlüğü örneği)"],
          ["+0,25 m", "+4 D", "İnce kenarlı, güçlü"],
          ["−0,5 m", "−2 D", "Kalın kenarlı (miyop gözlüğü örneği)"],
          ["−0,25 m", "−4 D", "Kalın kenarlı, güçlü"]
        ]
      }
    },
    {
      h: "Gözlük camları hangi mercek türündendir?",
      p: [
        "<strong>Miyopide</strong> göz, uzaktaki cisimlerin görüntüsünü ağ tabakanın önünde oluşturur; uzağı bulanık, yakını net görür. Bu kusur, ışınları biraz dağıtarak görüntüyü geriye kaydıran <strong>kalın kenarlı (eksi diyoptrili)</strong> merceklerle düzeltilir. <strong>Hipermetropide</strong> ise görüntü ağ tabakanın arkasına düşer; yakını görmek zorlaşır. Bu durumda ışınları toplayan <strong>ince kenarlı (artı diyoptrili)</strong> mercekler kullanılır.",
        "Yaşla birlikte göz merceğinin esnekliği azalır ve yakına odaklanmak güçleşir; buna presbiyopi denir ve okuma gözlüğü de artı diyoptrili ince kenarlı mercektir. Astigmatizmde ise korneanın eğriliği farklı yönlerde farklıdır ve silindirik mercekler kullanılır.",
        "Gözlük ve lens numarası yalnızca göz muayenesiyle belirlenir. Bu yazıdaki örnekler fizik kavramlarını anlatmak içindir; görme sorunu yaşıyorsanız bir göz hekimine başvurun, hazır gözlükleri muayene olmadan uzun süre kullanmayın."
      ]
    },
    {
      h: "Fotoğraf makinesi ve mercekler",
      p: [
        "Fotoğraf makinesinin objektifi, birden çok mercekten oluşan ama toplamda ince kenarlı mercek gibi davranan bir sistemdir. Uzaktaki bir manzara çekilirken cisim neredeyse sonsuzdadır ve görüntü odak düzlemine düşer; yakındaki bir nesneye odaklanırken görüntü uzaklığı büyüdüğü için mercek grubu sensörden biraz uzaklaşır. Odak uzaklığı uzun objektifler daha dar açıyla bakar ve uzaktaki cisimleri büyük gösterir.",
        "Net görünen bölgenin derinliği, odak uzaklığı, diyafram ve konu mesafesine bağlıdır. Bu hesabı [[arac:alan-derinligi-hesapla|Alan Derinliği Hesaplama]] aracıyla yapabilir, kavramları [[bilgi:diyafram-enstantane-iso-nedir|diyafram, enstantane ve ISO yazısında]] okuyabilirsiniz. Işığın iki ortam arasındaki kırılma açısını hesaplamak için ise [[arac:kirilma-acisi-hesapla|Kırılma Açısı Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>İşaretleri karıştırmak:</strong> Kalın kenarlı mercekte f negatif yazılmalıdır; pozitif yazılırsa sonuç tamamen yanlış çıkar.",
        "<strong>Birimleri karıştırmak:</strong> Denklemde tüm uzunluklar aynı birimde olmalıdır; diyoptri için f mutlaka metreye çevrilir.",
        "<strong>Sanal görüntüyü perdeye düşürmeye çalışmak:</strong> d<sub>i</sub> negatifse görüntü perdeye düşmez.",
        "<strong>Büyütmenin işaretini atlamak:</strong> m'nin eksi işareti görüntünün ters olduğunu söyler; sorularda bu bilgi sık istenir.",
        "<strong>Odaktaki cismi unutmak:</strong> d<sub>0</sub> = f ise denklem 1/d<sub>i</sub> = 0 verir; görüntü sonsuzda oluşur, yani oluşmaz."
      ]
    }
  ],
  faq: [
    ["Mercek denklemi nedir?", "Mercek denklemi, odak uzaklığının tersinin cisim uzaklığının tersi ile görüntü uzaklığının tersinin toplamına eşit olduğunu söyler: 1/f eşittir 1/d0 artı 1/di. Görüntünün yeri bu denklemle, boyu ise büyütme formülüyle bulunur."],
    ["İnce ve kalın kenarlı mercek farkı nedir?", "İnce kenarlı mercek ortası kalın olan yakınsak mercektir ve paralel ışınları bir noktada toplar; odak uzaklığı pozitiftir. Kalın kenarlı mercek ortası ince olan ıraksak mercektir, ışınları dağıtır ve odak uzaklığı negatif alınır."],
    ["Odak uzaklığı nasıl bulunur?", "Cisim ve görüntü uzaklıkları biliniyorsa f eşittir d0 çarpı di bölü d0 artı di formülüyle hesaplanır. Pratikte uzaktaki bir ışık kaynağının görüntüsü bir kâğıda düşürülür; mercek ile kâğıt arasındaki uzaklık yaklaşık odak uzaklığıdır."],
    ["Görüntünün yeri ve boyu nasıl hesaplanır?", "Görüntü uzaklığı mercek denkleminden, boyu ise büyütme ile bulunur. Odak uzaklığı 10 cm olan mercekte 30 cm uzaklıktaki 4 cm'lik cismin görüntüsü 15 cm'de oluşur ve büyütme eksi 0,5 olduğu için 2 cm boyunda ve terstir."],
    ["Büyütme oranı nasıl bulunur?", "Büyütme, görüntü uzaklığının cisim uzaklığına oranının eksi işaretlisidir ve görüntü boyunun cisim boyuna oranına eşittir. Negatif büyütme ters, pozitif büyütme düz görüntü; mutlak değeri birden büyükse büyük görüntü demektir."],
    ["Diyoptri ne anlama gelir?", "Diyoptri merceğin kırma gücüdür ve metre cinsinden odak uzaklığının tersine eşittir. Odak uzaklığı 0,5 metre olan ince kenarlı mercek artı 2 diyoptri, eksi 0,5 metre olan kalın kenarlı mercek eksi 2 diyoptridir."],
    ["Gerçek ve sanal görüntü farkı nedir?", "Gerçek görüntü ışınların gerçekten kesiştiği yerde oluşur ve perdeye düşürülebilir; ince kenarlı mercekte cisim odağın dışındayken oluşur. Sanal görüntü ışınların uzantılarının kesiştiği yerde oluşur ve perdeye düşmez, büyüteçteki görüntü böyledir."],
    ["Gözlük camları hangi mercek türündendir?", "Miyop gözlüklerinde ışınları dağıtan eksi diyoptrili kalın kenarlı mercekler, hipermetrop ve okuma gözlüklerinde ışınları toplayan artı diyoptrili ince kenarlı mercekler kullanılır. Gözlük numarası yalnızca göz muayenesiyle belirlenir."],
    ["Cisim odak noktasına konursa görüntü nerede oluşur?", "Cisim tam odak noktasındaysa kırılan ışınlar birbirine paralel çıkar ve hiçbir yerde kesişmez. Bu durumda görüntü sonsuzda oluşur, yani görüntü oluşmaz; fenerler ve ışıldaklar bu ilkeyle paralel ışık demeti üretir."]
  ],
  tools: ["mercek-denklemi-hesapla", "kirilma-acisi-hesapla", "alan-derinligi-hesapla"],
  related: ["snell-yasasi-isigin-kirilmasi", "diyafram-enstantane-iso-nedir", "oran-oranti-nasil-cozulur"],
  uyari: "gözlük ve lens numarası için mutlaka göz hekimine muayene olun",
  sources: [
    ["MEB – Fizik Dersi Öğretim Programı (Optik)", "https://mufredat.meb.gov.tr/"]
  ]
};
