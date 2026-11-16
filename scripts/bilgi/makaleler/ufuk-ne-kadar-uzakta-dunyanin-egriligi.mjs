export default {
  slug: "ufuk-ne-kadar-uzakta-dunyanin-egriligi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Ufuk Çizgisi Ne Kadar Uzakta? Göz Yüksekliğinden Ufuk Mesafesi Hesabı",
  pageTitle: "Ufuk Ne Kadar Uzakta? Ufuk Mesafesi Formülü ve Örnekler",
  description: "Deniz kenarında 1,7 m göz yüksekliğiyle ufuk yaklaşık 4,7 km uzaktadır. d = √(2Rh) formülünün Pisagor ile türetilmesi, uçaktan ufuk, kırılma ve karşı kıyı hesabı.",
  keywords: ["ufuk ne kadar uzakta", "ufuk mesafesi hesaplama", "ufuk çizgisi kaç km", "dünyanın eğriliği", "uçaktan ufuk mesafesi", "atmosferik kırılma", "göz yüksekliği ufuk", "karşı kıyı görünür mü"],
  lead: "Deniz kenarında duran ve gözü yaklaşık 1,7 m yükseklikte olan bir kişi için ufuk çizgisi, Dünya'nın eğriliği nedeniyle yalnızca <strong>yaklaşık 4,7 km</strong> uzaktadır. Mesafe d = √(2Rh + h²) formülüyle bulunur; R Dünya'nın yarıçapı (6.371 km), h göz yüksekliğidir. Pratikte d ≈ 3,57 × √h kısa formülü kullanılır (d km, h metre). Yükseklik arttıkça ufuk uzaklaşır ama doğrusal değil, karekökle: 100 m'den ufuk 35,7 km, 10 km irtifadaki bir uçaktan yaklaşık 357 km'dir. Atmosferdeki ışık kırılması bu değerleri yaklaşık %8 artırır. Bu sayfada formülün Pisagor teoremiyle türetilişini ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Ufuk mesafesi: d = √(2·R·h + h²); h, R'ye göre çok küçükse d ≈ √(2·R·h).",
    "Kısa formül: d (km) ≈ 3,57 × √h (m); standart kırılmayla d ≈ 3,86 × √h.",
    "1,7 m göz yüksekliği → yaklaşık 4,65 km; kırılmayla yaklaşık 5,0 km.",
    "100 m'den yaklaşık 35,7 km, 1.000 m'den yaklaşık 112,9 km, 10.000 m'den yaklaşık 357 km.",
    "Yüksekliği dört katına çıkarmak ufuk mesafesini yalnızca iki katına çıkarır.",
    "İki yüksek nokta birbirini en fazla d₁ + d₂ uzaklıktan görebilir; her biri kendi ufuk mesafesini katar."
  ],
  figure: {
    alt: "Dünya'nın kesiti üzerinde gözlemci, ufuk noktası ve merkez arasında dik üçgen: hipotenüs R artı h, dik kenarlar R ve ufuk mesafesi d. Sağda göz yüksekliğine göre ufuk mesafesi tablosu.",
    caption: "Gözlemciden ufka çizilen görüş çizgisi Dünya yüzeyine teğettir ve yarıçapla dik açı yapar. Bu dik üçgende Pisagor teoremi (R + h)² = R² + d² ilişkisini verir. Çizim ölçekli değildir; gerçek yükseklik Dünya yarıçapına göre çok küçüktür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Ufuk mesafesi: Pisagor üçgeni</text>
  <path d="M30 380 A330 330 0 0 1 400 120" class="sp sw" fill="none"/>
  <circle cx="150" cy="380" r="5" class="p"/>
  <text x="140" y="404" class="sm b">Dünya'nın merkezi</text>
  <circle cx="150" cy="70" r="6" class="p"/>
  <text x="162" y="62" class="sm b">Gözlemci</text>
  <line x1="150" y1="380" x2="150" y2="70" class="st" fill="none"/>
  <line x1="150" y1="95" x2="150" y2="70" class="sa sw" fill="none"/>
  <text x="120" y="88" class="b p">h</text>
  <text x="125" y="250" class="b">R</text>
  <circle cx="330" cy="150" r="5" class="ok"/>
  <text x="338" y="146" class="sm b ok">ufuk noktası</text>
  <line x1="150" y1="70" x2="330" y2="150" class="sok sw" fill="none"/>
  <text x="248" y="96" class="b ok">d</text>
  <line x1="150" y1="380" x2="330" y2="150" class="st dash" fill="none"/>
  <text x="250" y="280" class="b">R</text>
  <rect x="314" y="150" width="12" height="12" class="sf sb"/>
  <text x="40" y="140" class="sm">(R + h)² = R² + d²</text>
  <text x="40" y="162" class="sm b">d = √(2Rh + h²)</text>
  <rect x="440" y="56" width="260" height="292" rx="10" class="sf sb"/>
  <text x="456" y="82" class="b">Göz yüksekliği</text><text x="684" y="82" class="b end">Ufuk</text>
  <line x1="456" y1="92" x2="684" y2="92" class="sb" fill="none"/>
  <g class="sm">
    <text x="456" y="120">1,7 m (ayakta)</text><text x="684" y="120" class="end">4,65 km</text>
    <text x="456" y="150">10 m (3. kat)</text><text x="684" y="150" class="end">11,3 km</text>
    <text x="456" y="180">30 m (gemi köprüsü)</text><text x="684" y="180" class="end">19,6 km</text>
    <text x="456" y="210">100 m (yamaç)</text><text x="684" y="210" class="end">35,7 km</text>
    <text x="456" y="240">1.000 m (dağ)</text><text x="684" y="240" class="end">112,9 km</text>
    <text x="456" y="270">10.000 m (uçak)</text><text x="684" y="270" class="end">357,1 km</text>
  </g>
  <text x="456" y="302" class="sm mu">R = 6.371 km, kırılma yok</text>
  <text x="456" y="326" class="sm p b">Kırılmayla yaklaşık %8 daha uzak</text>
</svg>`
  },
  sections: [
    {
      h: "Ufuk neden sonsuza kadar uzanmaz?",
      p: [
        "Düz bir yüzeyde dursaydık, görüş mesafemizi yalnızca havanın berraklığı ve gözümüzün çözünürlüğü sınırlardı. Dünya ise yaklaşık 6.371 km yarıçaplı bir küredir ve yüzeyi her yönde aşağı doğru kıvrılır. Gözümüzden çıkan düz bir görüş çizgisi, bir noktada yüzeye teğet geçer ve onun ötesindeki deniz ya da kara yüzeyi bu çizginin altında kalır. O teğet noktası, gördüğümüz <strong>ufuk çizgisidir</strong>.",
        "Bu yüzden ufkun ötesindeki uzak bir gemi önce gövdesinden kaybolur, en son direği görünür kalır. Kıyıdan uzaklaşan bir yelkenlinin \"denize batıyormuş\" gibi görünmesi, Dünya'nın eğriliğinin en eski gözlemsel kanıtlarından biridir."
      ]
    },
    {
      h: "Ufuk mesafesi formülü nasıl türetilir? Pisagor teoremi",
      p: [
        "Üç nokta bir dik üçgen oluşturur: Dünya'nın merkezi, gözlemcinin gözü ve ufuk noktası. Görüş çizgisi ufuk noktasında yüzeye teğet olduğu için, merkezden ufuk noktasına çizilen yarıçapla <strong>dik açı</strong> yapar. Üçgenin kenarları şunlardır:"
      ],
      ul: [
        "Merkezden ufuk noktasına: R (Dünya'nın yarıçapı), bir dik kenar.",
        "Gözlemciden ufuk noktasına: d (aradığımız ufuk mesafesi), diğer dik kenar.",
        "Merkezden gözlemcinin gözüne: R + h, hipotenüs."
      ],
      formula: "(R + h)² = R² + d²\nR² + 2Rh + h² = R² + d²\nd = √(2Rh + h²) ≈ √(2Rh)   (h, R'ye göre çok küçükse)",
      after: [
        "Göz yüksekliği birkaç metre ya da birkaç kilometre olduğunda h² terimi 2Rh'nin yanında önemsiz kalır. R = 6.371.000 m alıp sabitleri birleştirirsek d (metre) = √(12.742.000 × h) bulunur. Sonucu kilometreye çevirince d ≈ 3,57 × √h kısa formülü ortaya çıkar. Teoremin kendisi ve başka uygulamaları için [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] yazısına, hesap için [[arac:pisagor-teoremi-hesapla|Pisagor Teoremi Hesaplama aracına]] bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: deniz kenarında ufuk kaç km uzakta?",
      p: [
        "Sahilde ayakta duran bir yetişkinin göz yüksekliği yaklaşık 1,7 m olsun. Dalga ve gelgit etkisini yok sayalım."
      ],
      ol: [
        "2·R·h = 2 × 6.371.000 × 1,7 = 21.661.400 m².",
        "h² = 2,89 m²; toplama etkisi ihmal edilebilir: 21.661.402,89.",
        "Karekök: √21.661.402,89 ≈ 4.654 m.",
        "Sonuç: ufuk yaklaşık <strong>4,65 km</strong> uzaktadır. Kısa formülle: 3,57 × √1,7 ≈ 3,57 × 1,304 ≈ 4,65 km."
      ],
      after: [
        "Kumda oturan bir çocuğun gözü 0,8 m yükseklikteyse ufuk 3,57 × √0,8 ≈ 3,2 km'ye yaklaşır. Aynı sahilde 10. kattaki bir otel odasının balkonundan (yaklaşık 30 m) ise ufuk 19,6 km'ye uzanır. Göz yüksekliğinizi feet olarak biliyorsanız önce [[arac:metre-feet-cevir|Metre Feet Çevirici]] ile metreye çevirin."
      ]
    },
    {
      h: "Yükseklik arttıkça görüş mesafesi nasıl değişir?",
      p: [
        "Ufuk mesafesi yükseklikle doğru orantılı değil, yüksekliğin <strong>kareköküyle</strong> orantılıdır. Bu, yüksekliği iki katına çıkarmanın ufku yalnızca √2 ≈ 1,41 kat uzaklaştırdığı anlamına gelir. Ufku iki katına çıkarmak için yüksekliği dört katına çıkarmanız gerekir."
      ],
      table: {
        head: ["Göz yüksekliği", "Ufuk (kırılma yok)", "Ufuk (standart kırılma)", "Ufuk alçalma açısı"],
        rows: [
          ["1,7 m", "4,65 km", "5,03 km", "≈ 0,04°"],
          ["2 m", "5,05 km", "5,45 km", "≈ 0,05°"],
          ["10 m", "11,29 km", "12,19 km", "≈ 0,10°"],
          ["30 m", "19,55 km", "21,12 km", "≈ 0,18°"],
          ["100 m", "35,70 km", "38,56 km", "≈ 0,32°"],
          ["1.000 m", "112,88 km", "121,93 km", "≈ 1,0°"],
          ["10.000 m", "357,1 km", "385,7 km", "≈ 3,2°"]
        ],
        caption: "Ufuk alçalma açısı, ufkun göz hizasındaki yatay çizginin ne kadar altında göründüğüdür. Değerler R = 6.371 km ile hesaplanmıştır; kırılma için yarıçap 7/6 katına büyütülmüştür."
      }
    },
    {
      h: "Uçaktan ufuk ne kadar uzaktadır?",
      p: [
        "Yolcu uçakları seyir sırasında genellikle 10–12 km irtifada uçar. 10.000 m yükseklik için formül d = √(2 × 6.371.000 × 10.000 + 10.000²) ≈ 357,1 km verir. Bu yükseklikte h² terimi artık sonucu birkaç yüz metre değiştirecek kadar büyüktür, ama yine de küçük bir düzeltmedir.",
        "357 km, kabaca İstanbul ile Ankara arasındaki kuş uçuşu mesafenin üçte ikisine yakındır. Ancak bu teorik değerdir: pratikte pus, bulut ve atmosferin saydamlığı görüşü çoğu zaman çok daha erken sınırlar. Ufkun göz hizasının yaklaşık 3,2° altında görünmesi de uçak penceresinden fark edilebilir bir ayrıntıdır."
      ]
    },
    {
      h: "Atmosferik kırılma ufku nasıl etkiler?",
      p: [
        "Işık, havanın yoğunluğu yükseklikle azaldığı için atmosferde tam düz ilerlemez; yere doğru hafifçe bükülür. Bu bükülme, görüş çizgisinin Dünya'nın eğriliğini biraz \"takip etmesini\" sağlar ve ufku olduğundan uzakta gösterir. Hesaplarda yaygın kullanılan yöntem, Dünya'nın yarıçapını 7/6 katına büyütmektir (k = 1/7 kırılma katsayısı). Bu düzeltme ufuk mesafesini yaklaşık √(7/6) ≈ 1,08 kat, yani %8 artırır.",
        "Kırılma hava koşullarına göre değişir. Soğuk denizin üstünde sıcak hava bulunduğunda (sıcaklık terselmesi) bükülme çok artabilir ve normalde ufkun altında kalan kıyılar, gemiler ya da adalar görünür hâle gelir; buna serap etkisi de eşlik edebilir. Tersine, sıcak yüzey üstünde ışık yukarı bükülür ve ufuk yakınlaşır. Kırılmanın fiziği için [[bilgi:snell-yasasi-isigin-kirilmasi|Snell yasası]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Karşı kıyıdaki bir yapının görünmesi için yükseklik ne olmalı?",
      p: [
        "Bir gözlemci ile uzaktaki bir cisim birbirini, iki ufuk mesafesinin toplamı kadar uzaklıktan görebilir: gözlemcinin ufku d₁, cismin tepesinin \"ufku\" d₂ olmak üzere en uzak görüş mesafesi d₁ + d₂'dir. Bunu tersine çevirerek, belli bir uzaklıktaki cismin görünmesi için gereken en düşük yüksekliği bulabiliriz."
      ],
      formula: "Gizli yükseklik ≈ (D − d₁)² ÷ (2R)\nD: cisme uzaklık, d₁: gözlemcinin ufuk mesafesi",
      ol: [
        "Gözlemci sahilde, göz yüksekliği 1,7 m: d₁ ≈ 4,65 km.",
        "Karşı kıyıdaki bina 40 km uzakta: D − d₁ = 40 − 4,65 = 35,35 km = 35.350 m.",
        "Gizli yükseklik ≈ 35.350² ÷ (2 × 6.371.000) ≈ 98 m.",
        "Sonuç: kırılma olmadan binanın en az yaklaşık 98 m yüksekliğindeki kısmı ufkun altında kalır; standart kırılmayla bu değer yaklaşık 84 m'ye iner."
      ],
      after: [
        "Benzer şekilde gözü 2 m yükseklikteki biri için 30 km uzaktaki bir yapının alt yaklaşık 49 metresi görünmez. Fener, dağ ya da gemi gibi bir hedefin en uzak görünme mesafesini hesaplamak için [[arac:ufuk-mesafesi-hesapla|Ufuk Mesafesi Hesaplama aracına]] hem göz yüksekliğinizi hem hedefin yüksekliğini girebilirsiniz."
      ]
    },
    {
      h: "Denizcilikte fenerin coğrafi görünme mesafesi",
      p: [
        "Denizcilikte aynı hesap fenerlerin \"coğrafi görünme mesafesi\" için kullanılır. Deniz haritalarında mesafe deniz mili ile verildiği için kısa formül de deniz miline uyarlanır: standart kırılmayla d (deniz mili) ≈ 2,08 × √h (metre). Fenerin ışık kaynağının yüksekliği ile gözlemcinin göz yüksekliğinin ufuk mesafeleri toplanır.",
        "Örnek: ışık kaynağı deniz seviyesinden 50 m yüksekte olan bir fener, gözü 5 m yükseklikteki bir gemi köprüsünden kırılma olmadan yaklaşık 3,57 × (√50 + √5) ≈ 33,2 km, standart kırılmayla yaklaşık 35,9 km (19,4 deniz mili) uzaktan görülebilir. Gerçek görünürlük ayrıca ışığın şiddetine ve havanın saydamlığına bağlıdır; bu yüzden haritalarda coğrafi ve ışık menzili ayrı ayrı değerlendirilir. Deniz mili ile kilometre arasındaki dönüşüm için [[bilgi:deniz-mili-kac-km-knot-nedir|deniz mili kaç km]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Dünyanın eğriliği çıplak gözle fark edilir mi?",
      p: [
        "Yerden bakıldığında eğrilik çok küçüktür. Yüzey, düz bir çizgiye göre 1 km'de yaklaşık 7,8 cm, 5 km'de yaklaşık 2 m, 10 km'de yaklaşık 7,8 m aşağıda kalır (düşüş ≈ d² ÷ 2R). Sahilde ufka bakarken bu kıvrımı bir çizgi olarak görmek mümkün değildir; ama uzaktaki gemilerin alt kısmının kaybolması gibi dolaylı etkiler açıkça gözlenebilir.",
        "Ufuk çizgisinin kavisini doğrudan görmek için çok yükseğe çıkmak ve geniş bir görüş açısına sahip olmak gerekir. Yolcu uçağının penceresinden kavis çok hafif seçilir; daha belirgin görüntüler çok daha yüksek irtifalardan elde edilir. Geniş açılı objektiflerin kenarlarda düz çizgileri bükmesi de fotoğraflarda yanıltıcı bir \"eğrilik\" yaratabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yüksekliği kilometre olarak yazmak:</strong> Kısa formülde h metre, sonuç kilometredir; birimleri karıştırmak sonucu 31,6 kat yanlış verir.",
        "<strong>Ufku doğrusal büyütmek:</strong> Yüksekliği iki katına çıkarmak ufku iki katına çıkarmaz; yalnızca yaklaşık 1,41 kat uzaklaştırır.",
        "<strong>Hedefin yüksekliğini unutmak:</strong> Uzaktaki bir dağ ya da fener kendi yüksekliği sayesinde ufkun ötesinden görünebilir; iki ufuk mesafesi toplanır.",
        "<strong>Kırılmayı sabit sanmak:</strong> 7/6 düzeltmesi ortalama bir değerdir; gerçek kırılma havaya göre değişir.",
        "<strong>Görüşü yalnızca geometriyle sınırlamak:</strong> Pus, nem ve toz genellikle geometrik ufuktan çok daha önce görüşü keser."
      ]
    }
  ],
  faq: [
    ["Deniz kenarında duran biri ufku kaç km uzakta görür?", "Gözü yaklaşık 1,7 metre yükseklikte olan biri için ufuk yaklaşık 4,65 kilometre uzaktadır. Atmosferik kırılma hesaba katıldığında bu mesafe yaklaşık 5 kilometreye çıkar."],
    ["Ufuk mesafesi formülü nasıl türetilir?", "Dünya'nın merkezi, gözlemci ve ufuk noktası bir dik üçgen oluşturur; görüş çizgisi yüzeye teğet olduğu için yarıçapla dik açı yapar. Pisagor teoremi (R + h)² = R² + d² verir ve buradan d = √(2Rh + h²) bulunur."],
    ["Yükseklik arttıkça görüş mesafesi nasıl değişir?", "Ufuk mesafesi yüksekliğin kareköküyle artar. Yüksekliği dört katına çıkarmak ufku iki katına çıkarır; 100 metreden ufuk yaklaşık 35,7 km, 400 metreden yaklaşık 71,4 km uzaktadır."],
    ["Uçaktan ufuk ne kadar uzaktadır?", "10.000 metre irtifada uçan bir yolcu uçağından ufuk yaklaşık 357 kilometre uzaktadır; kırılmayla yaklaşık 386 kilometreye çıkar. Pratikte pus ve bulutlar görüşü genellikle daha erken sınırlar."],
    ["Atmosferik kırılma ufku nasıl etkiler?", "Işık atmosferde yere doğru hafifçe bükülür ve ufku olduğundan uzakta gösterir. Standart koşullarda Dünya yarıçapı 7/6 katına büyütülerek hesaplanır; bu ufku yaklaşık yüzde 8 uzaklaştırır, ama hava koşullarıyla değişir."],
    ["Karşı kıyıdaki bir yapının görünmesi için yükseklik ne olmalı?", "Gizli yükseklik yaklaşık (D − d₁)² ÷ 2R formülüyle bulunur. Sahilde 1,7 metre göz yüksekliğiyle 40 km uzaktaki bir binanın alt yaklaşık 98 metresi kırılma olmadan ufkun altında kalır."],
    ["Dünyanın eğriliği çıplak gözle fark edilir mi?", "Yerden doğrudan kavis olarak görülmez; yüzey 5 km'de yalnızca yaklaşık 2 metre aşağıda kalır. Ancak uzaktaki gemilerin gövdesinin önce kaybolması gibi dolaylı etkiler açıkça gözlenebilir."],
    ["Pisagor teoremi bu hesapta nasıl kullanılır?", "Hipotenüs Dünya yarıçapı artı göz yüksekliği, dik kenarlar yarıçap ve ufuk mesafesidir. Hipotenüsün karesi dik kenarların kareleri toplamına eşitlenerek ufuk mesafesi çözülür."],
    ["Ufuk mesafesi için kısa formül nedir?", "Ufuk mesafesi kilometre cinsinden yaklaşık 3,57 çarpı göz yüksekliğinin (metre) kareköküdür. Standart atmosferik kırılmayla katsayı yaklaşık 3,86 olur."]
  ],
  tools: ["ufuk-mesafesi-hesapla", "pisagor-teoremi-hesapla", "metre-feet-cevir"],
  related: ["pisagor-teoremi-nedir", "snell-yasasi-isigin-kirilmasi", "enlem-boylam-derece-dakika-saniye-nasil-okunur"],
  sources: [
    ["MEB – Ortaöğretim Matematik ve Coğrafya öğretim programları", "https://www.meb.gov.tr/"]
  ]
};
