export default {
  slug: "dalista-tup-kac-dakika-gider-hava-tuketimi",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Dalışta Tüp Kaç Dakika Gider? SAC Hava Tüketimi ve Derinlik Etkisi",
  pageTitle: "Dalışta Tüp Kaç Dakika Gider? SAC ve Hava Tüketimi",
  description: "Tüp süresi; tüpteki hava, yüzey hava tüketiminiz (SAC) ve derinlikteki basınçla bulunur. 12 L 200 bar tüp, 20 m örneği, rezerv kuralı, bar-psi ve güvenlik notları.",
  keywords: ["dalış tüpü kaç dakika", "sac hesaplama", "dalış hava tüketimi", "12 litre tüp kaç bar", "derinlikte basınç", "dalış planlama", "rmv nedir", "rezerv hava kuralı"],
  lead: "Bir dalış tüpünün kaç dakika yeteceği <strong>tüpteki kullanılabilir hava ÷ (yüzey hava tüketimi × derinlikteki mutlak basınç)</strong> ile tahmin edilir; tek bir sabit cevabı yoktur. Örneğin 12 litrelik, 200 bar dolu bir tüp yaklaşık 2.400 litre hava taşır; dakikada 20 litre tüketen bir dalgıç 20 metrede (3 bar) dakikada 60 litre harcar ve 50 bar rezerv bırakırsa yaklaşık 30 dakikalık havası olur. Bu sayfadaki hesaplar örnektir; dalış yalnızca sertifikalı eğitmen eşliğinde alınan eğitimle, dalış liderinin planına ve dalış bilgisayarına göre yapılmalıdır.",
  kisaCevap: [
    "Tüpteki toplam hava (yüzey litresi) = tüp su hacmi (L) × basınç (bar); 12 L × 200 bar = 2.400 L.",
    "Deniz suyunda her 10 metre yaklaşık 1 bar ekler: mutlak basınç = derinlik ÷ 10 + 1; 20 m'de 3 bar.",
    "Derinlikteki tüketim = SAC (L/dk) × mutlak basınç; 20 L/dk tüketen dalgıç 20 m'de 60 L/dk harcar.",
    "SAC (yüzey hava tüketimi) = tüketilen hava ÷ süre ÷ ortalama mutlak basınç; kişiden kişiye ve dalıştan dalışa değişir.",
    "Rezerv hava için yaygın uygulama tüpün belirli bir basınçla (ör. 50 bar) yüzeye dönmektir; üçte bir kuralı ise özel ortamlarda kullanılır.",
    "1 bar ≈ 14,5 psi; 200 bar ≈ 2.900 psi. Hesaplar örnektir, gerçek dalış planı eğitim ve dalış liderinin kurallarıyla yapılır."
  ],
  figure: {
    alt: "Derinliğe göre mutlak basınç ve hava tüketimi: yüzeyde 1 bar ve dakikada 20 litre, 10 metrede 2 bar ve 40 litre, 20 metrede 3 bar ve 60 litre, 30 metrede 4 bar ve 80 litre. Yanında 12 litre 200 bar tüpün 50 bar rezervle 1800 litre kullanılabilir hava verdiği ve sürelerin 90, 45, 30 ve 22 dakika olduğu.",
    caption: "Aynı dalgıç, aynı tüple derine indikçe her nefeste daha fazla hava çeker; çünkü regülatör havayı ortam basıncında verir. Süreler örnek bir SAC değeriyle hesaplanmıştır, iniş-çıkış ve güvenlik durağı dahil değildir; gerçek planlama yerine geçmez.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Derinlik arttıkça tüp daha hızlı biter</text>
  <text x="40" y="60" class="sm b">Derinlik</text><text x="170" y="60" class="sm b">Mutlak basınç</text><text x="330" y="60" class="sm b">Tüketim (SAC 20 L/dk)</text><text x="590" y="60" class="sm b">Süre (1.800 L)</text>
  <g>
    <rect x="20" y="72" width="680" height="62" rx="6" class="sf sb"/>
    <text x="40" y="110" class="lg b">0 m</text><text x="200" y="110" class="lg mid">1 bar</text>
    <rect x="330" y="88" width="50" height="30" class="ps"/><text x="390" y="110" class="sm">20 L/dk</text>
    <text x="630" y="110" class="lg b mid ok">90 dk</text>
    <rect x="20" y="142" width="680" height="62" rx="6" class="sf sb"/>
    <text x="40" y="180" class="lg b">10 m</text><text x="200" y="180" class="lg mid">2 bar</text>
    <rect x="330" y="158" width="100" height="30" class="ps"/><text x="440" y="180" class="sm">40 L/dk</text>
    <text x="630" y="180" class="lg b mid">45 dk</text>
    <rect x="20" y="212" width="680" height="62" rx="6" class="ps"/>
    <text x="40" y="250" class="lg b">20 m</text><text x="200" y="250" class="lg mid">3 bar</text>
    <rect x="330" y="228" width="150" height="30" class="p"/><text x="490" y="250" class="sm b">60 L/dk</text>
    <text x="630" y="250" class="lg b mid p">30 dk</text>
    <rect x="20" y="282" width="680" height="62" rx="6" class="sf sb"/>
    <text x="40" y="320" class="lg b">30 m</text><text x="200" y="320" class="lg mid">4 bar</text>
    <rect x="330" y="298" width="200" height="30" class="dgs"/><text x="540" y="320" class="sm">80 L/dk</text>
    <text x="630" y="320" class="lg b mid dg">22 dk</text>
  </g>
  <rect x="20" y="356" width="680" height="50" rx="8" class="dgs"/>
  <text x="36" y="377" class="b dg">Örnek hesap · 12 L × (200 − 50) bar = 1.800 L kullanılabilir hava</text>
  <text x="36" y="396" class="sm">İniş, çıkış, güvenlik durağı ve dipsiz sınırlar dahil değildir. Eğitimsiz dalış yapmayın.</text>
</svg>`
  },
  sections: [
    {
      h: "Önce güvenlik: bu hesaplar neyin yerini tutmaz?",
      p: [
        "Tüplü dalış, eğitim almadan yapıldığında ciddi yaralanma ve ölüm riski taşıyan bir etkinliktir. Bu sayfadaki hesaplar, eğitimde öğrenilen hava planlamasının mantığını anlamanıza yardımcı olmak için hazırlanmış <strong>örneklerdir</strong>. Gerçek bir dalışın planı; tanınmış bir kuruluştan alınmış sertifika, sertifikalı eğitmen ya da dalış liderinin brifingi, dalış bilgisayarı veya dalış tabloları ve eşinizle (buddy) yaptığınız ortak planla yapılır.",
        "Hava tüketimi yalnızca planlamanın bir parçasıdır. Derinlik ve dip süresi sınırları (dekompresyonsuz sınırlar), çıkış hızı, güvenlik durağı, su sıcaklığı, akıntı, görüş ve sağlık durumunuz da en az hava kadar belirleyicidir. Dalış öncesinde sağlık uygunluğunuzu bir hekime değerlendirtmeniz de önerilir."
      ]
    },
    {
      h: "Tüp hacmi ve bar değerinden toplam hava nasıl bulunur?",
      p: [
        "Dalış tüplerinin üzerinde iki değer bulunur: <strong>su hacmi</strong> (tüpün içine sığan su miktarı, litre) ve <strong>dolum basıncı</strong> (bar). Tüpteki havanın yüzey basıncındaki karşılığı, Boyle yasasına göre bu iki değerin çarpımıyla yaklaşık olarak bulunur. Gerçek gazlar yüksek basınçta ideal davranıştan biraz saptığı için sonuç kabaca doğrudur ve planlama için yeterlidir."
      ],
      formula: "Toplam hava (yüzey litresi) = su hacmi (L) × basınç (bar)\n12 L × 200 bar = 2.400 L\n15 L × 200 bar = 3.000 L\n10 L × 232 bar = 2.320 L",
      after: [
        "Bu nedenle \"12 litrelik tüp\" ifadesi tüpte 12 litre hava olduğu anlamına gelmez; tüpün iç hacminin 12 litre olduğunu anlatır. Tam dolu 12 litrelik bir tüp, yüzeyde yaklaşık 2.400 litre havaya denk gelir. Basınç ve hacim ilişkisinin fizik temeli [[bilgi:ideal-gaz-denklemi-pv-nrt|ideal gaz denklemi]] yazısında anlatılmıştır."
      ]
    },
    {
      h: "Derinlik arttıkça hava tüketimi neden artar? 10 metrede basınç kaç bar?",
      p: [
        "Yüzeyde üzerimizde yaklaşık 1 bar atmosfer basıncı vardır. Suya indikçe su sütununun ağırlığı da eklenir. Sıvı basıncı P = ρ · g · h formülüyle hesaplanır: deniz suyu için (yoğunluk yaklaşık 1.025 kg/m³) 10 metrede 1.025 × 9,81 × 10 ≈ 100.600 Pa, yani yaklaşık 1 bar eder. Tatlı suda aynı basınç yaklaşık 10,3 metrede oluşur."
      ],
      table: {
        head: ["Derinlik (deniz)", "Su basıncı", "Mutlak basınç", "Aynı nefesin hacmine göre tüketim"],
        rows: [
          ["0 m (yüzey)", "0 bar", "1 bar", "1 kat"],
          ["10 m", "≈ 1 bar", "≈ 2 bar", "2 kat"],
          ["20 m", "≈ 2 bar", "≈ 3 bar", "3 kat"],
          ["30 m", "≈ 3 bar", "≈ 4 bar", "4 kat"],
          ["40 m", "≈ 4 bar", "≈ 5 bar", "5 kat"]
        ],
        caption: "Planlamada deniz suyu için \"her 10 m'de 1 bar\" yaklaşımı kullanılır. Kesin değer için hidrostatik basınç hesaplama aracına bakabilirsiniz."
      },
      after: [
        "Ciğerlerinizin hacmi derinlikte değişmez; her nefeste yine yaklaşık aynı hacimde gaz çekersiniz. Ancak regülatör bu gazı ortam basıncında verir. 20 metrede ortam basıncı 3 bar olduğu için, aynı hacimdeki her nefes yüzeydekinin 3 katı kadar gaz molekülü içerir; tüpten de 3 kat hızlı tükenir. Derinliğe göre basıncı [[arac:hidrostatik-basinc-hesapla|Hidrostatik Basınç Hesaplama aracıyla]] hesaplayabilir, kavramın temelini [[bilgi:basinc-nedir-nasil-hesaplanir|basınç nedir]] yazısında okuyabilirsiniz."
      ]
    },
    {
      h: "SAC (yüzey hava tüketimi) nedir, nasıl hesaplanır?",
      p: [
        "<strong>SAC</strong> (surface air consumption), bir dalgıcın yüzey basıncına göre dakikada ne kadar hava tükettiğini gösterir. Derinlikten bağımsız bir ölçü olduğu için farklı dalışları karşılaştırmayı ve yeni dalışları planlamayı sağlar. Değeri kişiye, kondisyona, su sıcaklığına, efora, stres düzeyine ve deneyime göre değişir; yeni başlayanlarda genellikle daha yüksektir ve deneyimle düşer."
      ],
      formula: "Tüketilen hava (L) = tüp hacmi × (başlangıç basıncı − bitiş basıncı)\nOrtalama mutlak basınç = ortalama derinlik ÷ 10 + 1\nSAC (L/dk) = tüketilen hava ÷ süre ÷ ortalama mutlak basınç",
      ol: [
        "Örnek dalış: 12 L tüp, başlangıç 200 bar, bitiş 80 bar, ortalama derinlik 15 m, süre 40 dakika.",
        "Tüketilen hava: 12 × (200 − 80) = 12 × 120 = 1.440 L.",
        "Ortalama mutlak basınç: 15 ÷ 10 + 1 = 2,5 bar.",
        "SAC: 1.440 ÷ 40 ÷ 2,5 = 14,4 L/dk.",
        "Bu dalgıç 15 metrede dakikada 14,4 × 2,5 = 36 L hava harcamıştır."
      ],
      after: [
        "Bu hesap için dalış bilgisayarınızın kaydettiği ortalama derinliği kullanmanız en doğru sonucu verir. [[arac:dalis-hava-tuketimi-hesapla|Dalış Hava Tüketimi Hesaplama aracı]] tüp hacmi, basınç düşüşü, ortalama derinlik ve süreden SAC değerinizi litre/dakika ve bar/dakika olarak hesaplar; tatlı su seçeneği de vardır."
      ]
    },
    {
      h: "SAC ve RMV farkı nedir?",
      p: [
        "İki kavram eğitim kaynaklarında bazen birbirinin yerine kullanılır, bazen de ayrı tutulur. Ayrı tutulduğunda fark birimdedir."
      ],
      table: {
        head: ["Kavram", "Birim", "Tüpe bağlı mı?", "Örnek"],
        rows: [
          ["SAC (basınç cinsinden)", "bar/dakika", "Evet, yalnızca o tüp hacmi için geçerli", "1,2 bar/dk (12 L tüp)"],
          ["RMV (dakika solunum hacmi)", "litre/dakika", "Hayır, her tüpte kullanılabilir", "14,4 L/dk"]
        ]
      },
      after: [
        "Örnekteki dalgıcın basınç cinsinden tüketimi 120 bar ÷ 40 dk ÷ 2,5 = 1,2 bar/dk'dır. Bu değer 12 litrelik tüp için anlamlıdır; aynı dalgıç 15 litrelik tüple dalarsa dakikada daha az bar düşer. Litre/dakika değeri ise tüpten bağımsız olduğu için planlamada daha kullanışlıdır: RMV × mutlak basınç × süre hesabı her tüp için geçerlidir."
      ]
    },
    {
      h: "Bir dalış tüpü kaç dakika yeter? Çözümlü örnek",
      ol: [
        "Tüp: 12 L, 200 bar dolu. Toplam hava = 2.400 L.",
        "Rezerv: dalış liderinin kuralı tüpte 50 bar ile yüzeyde olmak olsun. Kullanılabilir hava = 12 × (200 − 50) = 1.800 L.",
        "Dalgıcın SAC değeri: 20 L/dk (yeni başlayan biri için örnek değer).",
        "Planlanan derinlik 20 m: mutlak basınç 3 bar, tüketim 20 × 3 = 60 L/dk.",
        "Kabaca süre: 1.800 ÷ 60 = 30 dakika. 10 metrede 1.800 ÷ 40 = 45 dakika, 30 metrede 1.800 ÷ 80 ≈ 22 dakika olur."
      ],
      after: [
        "Bu süreler dip süresinin üst sınırı için kaba bir fikir verir; iniş, çıkış ve güvenlik durağında harcanan havayı ayrıca hesaba katmanız gerekir. Ayrıca bu süre, o derinlikteki dekompresyonsuz dalış sınırından uzun olabilir; böyle bir durumda sınırı hava miktarı değil, dalış bilgisayarı ya da tablosu belirler. Soğuk su, akıntı ve stres tüketimi artırdığı için gerçek dalışta SAC değerinizi cömert seçin."
      ]
    },
    {
      h: "Rezerv hava ve üçte bir kuralı nedir?",
      p: [
        "Rezerv hava, beklenmedik durumlar (eşinizin havasının bitmesi, akıntı, ekipman sorunu, yönünü kaybetme) için tüpte bırakılan güvenlik payıdır. Rekreasyonel dalışlarda yaygın uygulama, tüpte belirli bir basınçla, örneğin 50 bar ile yüzeye çıkmak ve belirli bir basınca (örneğin 100 bar) düştüğünde dönüşe başlamaktır. Kesin değerleri eğitiminiz ve dalış lideriniz belirler.",
        "<strong>Üçte bir kuralı</strong>, havanın üçte birinin gidiş, üçte birinin dönüş ve üçte birinin rezerv için ayrılmasıdır. 200 barlık tüpte dalgıç yaklaşık 133 bara düştüğünde dönüşe başlar. Bu daha temkinli kural genellikle mağara, batık içi gibi doğrudan yüzeye çıkılamayan ortamlarda kullanılır ve bu ortamlar ayrı, ileri düzey eğitim gerektirir."
      ]
    },
    {
      h: "bar ve psi arasında nasıl dönüşüm yapılır?",
      p: [
        "Tüp basınçları ülkeye ve ekipmana göre bar ya da psi ile gösterilir. 1 bar = 14,5038 psi, 1 psi ≈ 0,0689 bar'dır. 200 bar yaklaşık 2.900 psi, 3.000 psi ise yaklaşık 206,8 bar eder. 50 barlık rezerv yaklaşık 725 psi'ye karşılık gelir."
      ],
      table: {
        head: ["bar", "psi (yaklaşık)", "Kullanım"],
        rows: [
          ["50", "725", "Örnek yüzeye çıkış rezervi"],
          ["100", "1.450", "Örnek dönüş başlangıcı"],
          ["200", "2.901", "Yaygın tam dolum"],
          ["232", "3.365", "Yüksek basınç dolum"]
        ]
      },
      after: [
        "Hızlı dönüşüm için [[arac:bar-psi-cevir|Bar PSI Çevirici]], kPa ve diğer birimler için [[arac:bar-kpa-cevir|Bar kPa Çevirici]] kullanılabilir. Basınç birimlerinin tamamı [[bilgi:basinc-birimleri-bar-kpa-atm-psi|basınç birimleri tablosunda]] karşılaştırılmıştır."
      ]
    },
    {
      h: "Hava tüketimini etkileyen etkenler ve sık yapılan hatalar",
      ul: [
        "<strong>Efor ve stres:</strong> Hızlı yüzmek, akıntıya karşı çalışmak ve kaygı tüketimi belirgin biçimde artırır.",
        "<strong>Soğuk su:</strong> Vücut ısıyı korumak için daha çok enerji harcar, nefes sıklaşır.",
        "<strong>Yüzerlik kontrolü:</strong> Sürekli şişirip söndürmek ve dengesiz pozisyon havayı boşa harcar; bu beceri eğitimle gelişir.",
        "<strong>Ekipman:</strong> Küçük kaçaklar ve uygun olmayan ekipman tüketimi artırır; ekipmanınızı düzenli bakımdan geçirin.",
        "<strong>Hata – yüzey hacmini derinlikte kullanmak:</strong> 2.400 litreyi 20 L/dk'ya bölüp 120 dakika bulmak derinlik etkisini yok sayar.",
        "<strong>Hata – rezervi hesaba katmamak:</strong> Tüpün tamamını kullanılabilir sanmak, acil durumda hava bırakmaz.",
        "<strong>Hata – bir dalışın SAC değerini kesin kabul etmek:</strong> Farklı koşullarda tüketiminiz değişir; birkaç dalışın ortalamasını alın ve pay bırakın."
      ]
    }
  ],
  faq: [
    ["Bir dalış tüpü kaç dakika yeter?", "Sabit bir cevap yoktur; süre tüpteki kullanılabilir havaya, kişinin yüzey hava tüketimine ve derinliğe bağlıdır. Örneğin 12 litre 200 bar tüpte 50 bar rezerv bırakan ve dakikada 20 litre tüketen bir dalgıç 20 metrede yaklaşık 30 dakikalık havaya sahiptir; bu yalnızca örnek bir hesaptır."],
    ["SAC (yüzey hava tüketimi) nedir, nasıl hesaplanır?", "SAC, dalgıcın yüzey basıncına göre dakikada tükettiği hava miktarıdır. Tüketilen hava (tüp hacmi çarpı basınç düşüşü) dalış süresine ve ortalama mutlak basınca bölünerek bulunur; 1.440 litre, 40 dakika ve 2,5 bar için sonuç 14,4 L/dk olur."],
    ["Derinlik arttıkça hava tüketimi neden artar?", "Regülatör havayı ortam basıncında verir ve derinlik arttıkça ortam basıncı yükselir. Her nefes aynı hacimde olsa da daha fazla gaz molekülü içerir; 20 metrede mutlak basınç 3 bar olduğu için tüp yüzeydekinin yaklaşık üç katı hızla tükenir."],
    ["10 metrede basınç kaç bardır?", "Deniz suyunda 10 metrede su basıncı yaklaşık 1 bardır; atmosfer basıncı da eklendiğinde mutlak basınç yaklaşık 2 bar olur. Tatlı su daha az yoğun olduğu için aynı basınç yaklaşık 10,3 metrede oluşur."],
    ["Tüp hacmi ve bar değerinden toplam hava nasıl bulunur?", "Tüpün su hacmi litre olarak dolum basıncıyla çarpılır. 12 litrelik tüp 200 bar doluysa yüzeyde yaklaşık 2.400 litre havaya karşılık gelir; yüksek basınçta gerçek gaz davranışı nedeniyle sonuç kabaca doğrudur."],
    ["Rezerv hava (yüzde üçte bir kuralı) nedir?", "Üçte bir kuralında havanın üçte biri gidiş, üçte biri dönüş, üçte biri ise acil durum rezervi için ayrılır ve genellikle doğrudan yüzeye çıkılamayan özel ortamlarda uygulanır. Rekreasyonel dalışlarda ise çoğunlukla belirli bir basınçla, örneğin 50 bar ile yüzeye çıkma kuralı kullanılır."],
    ["SAC ve RMV farkı nedir?", "Basınç cinsinden SAC bar/dakika olarak ifade edilir ve yalnızca ölçüldüğü tüp hacmi için geçerlidir. RMV ise litre/dakika cinsindendir ve tüpten bağımsızdır; bu nedenle farklı tüplerle yapılacak dalışların planlamasında daha kullanışlıdır."],
    ["bar ve psi arasında nasıl dönüşüm yapılır?", "1 bar yaklaşık 14,5038 psi'dir; bar değerini bu sayıyla çarparak psi, psi değerini aynı sayıya bölerek bar bulunur. 200 bar yaklaşık 2.900 psi, 3.000 psi ise yaklaşık 206,8 bar eder."],
    ["Eğitim almadan tüplü dalış yapılabilir mi?", "Yapılmamalıdır. Tüplü dalış basınç, gaz fizyolojisi ve acil durum becerileri gerektiren riskli bir etkinliktir. Tanınmış bir kuruluştan sertifika alınana kadar dalışlar yalnızca sertifikalı eğitmen eşliğinde ve onun planına göre yapılmalıdır."]
  ],
  tools: ["dalis-hava-tuketimi-hesapla", "hidrostatik-basinc-hesapla", "bar-psi-cevir", "bar-kpa-cevir"],
  related: ["basinc-nedir-nasil-hesaplanir", "ideal-gaz-denklemi-pv-nrt", "basinc-birimleri-bar-kpa-atm-psi"],
  uyari: "dalış eğitimi yerine geçmez; tüplü dalışı yalnızca sertifikalı eğitmen eşliğinde, sağlık uygunluğunuzu hekiminize değerlendirttikten sonra ve dalış liderinin planına uyarak yapın"
};
