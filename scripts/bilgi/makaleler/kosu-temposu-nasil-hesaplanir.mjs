export default {
  slug: "kosu-temposu-nasil-hesaplanir",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "Koşu Temposu Nasıl Hesaplanır? Dakika/km, Hız ve Maraton Süresi Tahmini",
  pageTitle: "Koşu Temposu (Pace) Nasıl Hesaplanır? dk/km ve Maraton Süresi",
  description: "Koşu temposu süreyi mesafeye bölerek bulunur: 30 dakikada 5 km, 6:00 dk/km eder. Tempo-hız çevirme, 5K süreleri ve Riegel formülüyle maraton tahmini.",
  keywords: ["koşu temposu hesaplama", "pace nedir", "dakika kilometre tempo", "5 km kaç dakikada koşulur", "maraton süresi tahmini", "tempo hız çevirme", "riegel formülü", "kolay koşu temposu"],
  lead: "Koşu temposu (pace), bir kilometreyi kaç dakikada koştuğunuzdur ve <strong>toplam süre ÷ mesafe</strong> ile bulunur: 5 km'yi 30 dakikada bitiren biri 6:00 dk/km tempoda koşmuştur. Hızı bulmak için 60'ı tempoya bölersiniz; 6:00 dk/km saatte 10 km eder. Bu sayfada tempo ile hız arasındaki dönüşümü, saniyeli sürelerle çözümlü hesapları, 5K'dan maratona süre tablosunu, Riegel formülüyle yarış süresi tahminini ve antrenman temposunu nasıl seçeceğinizi bulacaksınız.",
  kisaCevap: [
    "Tempo (dk/km) = toplam süre (dakika) ÷ mesafe (km); 50 dakikada 10 km = 5:00 dk/km.",
    "Hız (km/sa) = 60 ÷ tempo (dakika); 5:00 dk/km = 12 km/sa, 6:00 dk/km = 10 km/sa.",
    "Tempo (dk/km) = 60 ÷ hız (km/sa); koşu bandında 9 km/sa = 6:40 dk/km.",
    "Bitiş süresi = tempo × mesafe; maraton 42,195 km, yarı maraton 21,0975 km'dir.",
    "Riegel formülü: T₂ = T₁ × (D₂ ÷ D₁)<sup>1,06</sup>; 10 km'yi 50 dakikada koşan biri için maraton tahmini yaklaşık 3:50'dir.",
    "Kolay koşu temposu, rahatça cümle kurarak konuşabildiğiniz tempodur ve yarış temposundan belirgin biçimde yavaştır."
  ],
  figure: {
    alt: "Koşu temposu ile hız arasındaki ters ilişkiyi gösteren çift cetvel: 4:00 ile 8:00 dk/km arası tempoların km/sa karşılıkları ve 10 km 50 dakikalık sonuçtan Riegel formülüyle maraton tahmini.",
    caption: "Üst cetvel temponun (dk/km), alt cetvel aynı noktadaki hızın (km/sa) karşılığıdır. Tempo büyüdükçe hız küçülür ve ilişki doğrusal değildir. Sağdaki kart, 10 km'lik bir sonuçtan diğer mesafelerin nasıl tahmin edildiğini gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Tempo ve hız aynı şeyin iki yüzü</text>
  <text x="30" y="70" class="b">Tempo (dk/km)</text>
  <line x1="40" y1="96" x2="680" y2="96" class="sp sw" fill="none"/>
  <g class="mid">
    <text x="60" y="88" class="b">4:00</text><text x="160" y="88" class="b">4:30</text><text x="260" y="88" class="b">5:00</text>
    <text x="360" y="88" class="b">5:30</text><text x="460" y="88" class="b">6:00</text><text x="560" y="88" class="b">7:00</text><text x="660" y="88" class="b">8:00</text>
  </g>
  <g>
    <line x1="60" y1="100" x2="60" y2="132" class="sb dash" fill="none"/><line x1="160" y1="100" x2="160" y2="132" class="sb dash" fill="none"/>
    <line x1="260" y1="100" x2="260" y2="132" class="sb dash" fill="none"/><line x1="360" y1="100" x2="360" y2="132" class="sb dash" fill="none"/>
    <line x1="460" y1="100" x2="460" y2="132" class="sb dash" fill="none"/><line x1="560" y1="100" x2="560" y2="132" class="sb dash" fill="none"/>
    <line x1="660" y1="100" x2="660" y2="132" class="sb dash" fill="none"/>
  </g>
  <line x1="40" y1="136" x2="680" y2="136" class="sok sw" fill="none"/>
  <g class="mid">
    <text x="60" y="158" class="ok b">15,0</text><text x="160" y="158" class="ok b">13,3</text><text x="260" y="158" class="ok b">12,0</text>
    <text x="360" y="158" class="ok b">10,9</text><text x="460" y="158" class="ok b">10,0</text><text x="560" y="158" class="ok b">8,6</text><text x="660" y="158" class="ok b">7,5</text>
  </g>
  <text x="30" y="182" class="b">Hız (km/sa) = 60 ÷ tempo</text>
  <rect x="30" y="206" width="310" height="196" rx="10" class="sf sb"/>
  <text x="50" y="234" class="b">Tempo hesabı</text>
  <text x="50" y="262" class="sm">Süre: 27 dk 30 sn = 27,5 dk</text>
  <text x="50" y="286" class="sm">Mesafe: 5 km</text>
  <text x="50" y="310" class="sm">27,5 ÷ 5 = 5,5 dk</text>
  <rect x="50" y="326" width="270" height="56" rx="8" class="ps"/>
  <text x="185" y="352" class="b mid">Tempo 5:30 dk/km</text>
  <text x="185" y="372" class="sm mid">Hız 60 ÷ 5,5 = 10,9 km/sa</text>
  <rect x="370" y="206" width="320" height="196" rx="10" class="p"/>
  <text x="390" y="234" class="b sf">Riegel tahmini</text>
  <text x="390" y="260" class="sm sf">Bilinen: 10 km = 50:00</text>
  <text x="390" y="284" class="sm sf">T₂ = T₁ × (D₂ ÷ D₁)^1,06</text>
  <text x="390" y="318" class="sf">5 km ≈ 23:59</text>
  <text x="390" y="346" class="sf">Yarı maraton ≈ 1:50:19</text>
  <text x="390" y="374" class="sf b">Maraton ≈ 3:50:01</text>
</svg>`
  },
  sections: [
    {
      h: "Koşu temposu (pace) nedir?",
      p: [
        "Tempo, koşucuların hızı ifade etmek için kullandığı ölçüdür ve birim mesafeyi ne kadar sürede koştuğunuzu söyler. Türkiye'de ve metrik sistemi kullanan ülkelerde birim <strong>dakika/kilometre</strong> (dk/km), ABD ve İngiltere'de çoğunlukla <strong>dakika/mil</strong>'dir. \"5:30 tempo\" dendiğinde her kilometrenin 5 dakika 30 saniyede koşulduğu anlaşılır.",
        "Araçta alışık olduğumuz km/sa hız göstergesi, koşuda pratik değildir. Koşucu için asıl soru \"bu kilometreyi kaç dakikada bitireceğim?\" ve \"bu tempoyla 10 km kaç dakika sürer?\" sorularıdır. Tempo doğrudan süreyle bağlantılı olduğu için hedef belirlemek, yarış planı yapmak ve antrenmanı ayarlamak tempoyla çok daha kolaydır.",
        "Tempo ile hız ters orantılıdır: tempo sayısı küçüldükçe daha hızlı koşuyorsunuz demektir. 4:00 dk/km, 6:00 dk/km'den hızlıdır. Bu ters ilişki başta kafa karıştırsa da kısa sürede alışılır."
      ]
    },
    {
      h: "Tempo nasıl hesaplanır? Formüller",
      p: [
        "Hesabın tek zor yanı, dakika ve saniyelerin 60'lık sistemde olmasıdır. Toplam süreyi önce ondalık dakikaya ya da tamamen saniyeye çevirirseniz hata yapma olasılığınız azalır."
      ],
      formula: "Tempo (dk/km) = toplam süre (dk) ÷ mesafe (km)\nHız (km/sa) = mesafe (km) ÷ süre (saat) = 60 ÷ tempo (dk)\nTempo (dk/km) = 60 ÷ hız (km/sa)\nBitiş süresi = tempo × mesafe\nTempo (dk/mil) = tempo (dk/km) × 1,609344",
      after: [
        "Saniyeyi dakikaya çevirmek için 60'a bölün: 27 dakika 30 saniye 27,5 dakikadır; 42 saniye 0,7 dakikadır. Sonuçtaki ondalık kısmı yeniden saniyeye çevirmek için 60 ile çarpın: 5,35 dakika, 5 dakika ve 0,35 × 60 = 21 saniye, yani 5:21'dir. Bu son adım sık atlanır; 5,35 dakika \"5:35\" değildir."
      ]
    },
    {
      h: "Adım adım çözümlü örnekler",
      ol: [
        "<strong>10 km'yi 58 dakika 12 saniyede koştunuz.</strong> Süreyi dakikaya çevirin: 58 + 12 ÷ 60 = 58,2 dakika. Mesafeye bölün: 58,2 ÷ 10 = 5,82 dakika. Ondalığı saniyeye çevirin: 0,82 × 60 ≈ 49. Temponuz 5:49 dk/km'dir. Hızınız 60 ÷ 5,82 ≈ 10,3 km/sa olur.",
        "<strong>Koşu bandı 9,5 km/sa gösteriyor, tempo nedir?</strong> 60 ÷ 9,5 = 6,316 dakika. 0,316 × 60 ≈ 19 saniye. Tempo yaklaşık 6:19 dk/km'dir.",
        "<strong>5:45 tempoyla yarı maraton ne kadar sürer?</strong> 5:45 = 5,75 dakika. 5,75 × 21,0975 = 121,31 dakika. Bu 2 saat 1 dakika ve 0,31 × 60 ≈ 19 saniye, yani yaklaşık 2:01:19 eder.",
        "<strong>Saat 1:45:00 hedefli yarı maraton için tempo kaç olmalı?</strong> 105 dakika ÷ 21,0975 km = 4,977 dakika. 0,977 × 60 ≈ 59 saniye. Hedef tempo 4:59 dk/km'dir. Yarış günü kalabalık ve viraj kaybı için birkaç saniye daha hızlı bir tempo planlamak yaygın bir yaklaşımdır."
      ],
      after: [
        "Bu hesapları elle yapmak yerine [[arac:kosu-temposu-hesapla|koşu temposu hesaplama aracı]]na mesafe ve süreyi yazdığınızda tempo, hız ve standart yarış mesafelerindeki bitiş süreleri birlikte çıkar."
      ]
    },
    {
      h: "Tempo, hız ve yarış süreleri tablosu",
      p: [
        "Aşağıdaki tablo, sabit tempoyla koşulduğunda standart mesafelerin ne kadar süreceğini gösterir. Gerçek yarışta tempo kilometreden kilometreye değiştiği için sonuç birkaç dakika sapabilir."
      ],
      table: {
        head: ["Tempo (dk/km)", "Hız (km/sa)", "5 km", "10 km", "Yarı maraton", "Maraton"],
        rows: [
          ["4:00", "15,0", "20:00", "40:00", "1:24:23", "2:48:47"],
          ["4:30", "13,3", "22:30", "45:00", "1:34:56", "3:09:53"],
          ["5:00", "12,0", "25:00", "50:00", "1:45:29", "3:30:59"],
          ["5:30", "10,9", "27:30", "55:00", "1:56:02", "3:52:04"],
          ["6:00", "10,0", "30:00", "1:00:00", "2:06:35", "4:13:10"],
          ["6:30", "9,2", "32:30", "1:05:00", "2:17:08", "4:34:16"],
          ["7:00", "8,6", "35:00", "1:10:00", "2:27:41", "4:55:22"],
          ["8:00", "7,5", "40:00", "1:20:00", "2:48:47", "5:37:34"]
        ],
        caption: "Maraton 42,195 km, yarı maraton 21,0975 km alınmıştır. Süreler saat:dakika:saniye biçimindedir."
      },
      after: [
        "<strong>5 km için ortalama süre nedir?</strong> Tek bir \"normal\" süre yoktur; yaş, cinsiyet, deneyim ve parkur sonucu çok değiştirir. Düzenli koşmaya yeni başlayan biri için 5 km'yi 30–40 dakika arasında, bir süredir antrenman yapan amatörler için 25–30 dakika arasında bitirmek yaygın görülen sonuçlardır. Kendi gelişiminizi başkalarının süresiyle değil, kendi önceki sonuçlarınızla karşılaştırmak daha anlamlıdır.",
        "Mil ile verilen tempoları çevirmek ya da yabancı bir antrenman planındaki tempoları anlamak için [[arac:dakika-kilometre-tempo-cevir|dakika/km tempo çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Maraton bitirme süresi nasıl tahmin edilir? Riegel formülü",
      p: [
        "Kısa bir mesafedeki gerçek sonucunuzdan daha uzun bir mesafenin süresini tahmin etmek için en yaygın yöntem, mühendis Peter Riegel'in yayımladığı formüldür. Formül, mesafe uzadıkça temponun bir miktar yavaşladığını varsayar. Üs olarak kullanılan 1,06 \"yorgunluk katsayısı\"dır; mesafe iki katına çıktığında süre iki kattan biraz fazla artar."
      ],
      formula: "T₂ = T₁ × (D₂ ÷ D₁)^1,06\nT₁: bilinen süre · D₁: bilinen mesafe · D₂: hedef mesafe",
      ol: [
        "Bilinen sonucu seçin: 10 km = 50 dakika.",
        "Mesafe oranını bulun: 42,195 ÷ 10 = 4,2195.",
        "Oranın 1,06'ncı kuvvetini alın: 4,2195<sup>1,06</sup> ≈ 4,600.",
        "Bilinen süreyle çarpın: 50 × 4,600 ≈ 230 dakika, yani yaklaşık 3:50:01.",
        "Aynı yöntemle yarı maraton tahmini 1:50:19, 5 km tahmini 23:59 çıkar."
      ],
      after: [
        "Formül, hedef mesafeye uygun antrenman yapılmış olduğunu varsayar. Haftada iki kez 5 km koşan birinin 5 km süresinden çıkan maraton tahmini genellikle iyimserdir; uzun koşu deneyimi az olan koşucularda gerçek süre tahminden belirgin biçimde uzun olabilir. Tahmin için kullandığınız yarış ne kadar uzunsa (örneğin yarı maraton), maraton tahmini o kadar gerçekçi olur.",
        "[[arac:maraton-sure-tahmini|Maraton süre tahmini aracı]] bu formülü uygular ve yorgunluk katsayısını değiştirmenize izin verir; dayanıklılığı daha düşük koşucular katsayıyı biraz yükselterek daha temkinli bir tahmin alabilir."
      ]
    },
    {
      h: "Kolay koşu temposu ve antrenman bölgeleri",
      p: [
        "Koşu antrenmanının büyük kısmı yarış temposunda değil, rahat bir tempoda yapılır. <strong>Kolay koşu temposu</strong>, nefesiniz düzenliyken tam cümlelerle konuşabildiğiniz tempodur. Pratikte bu tempo, aynı kişinin 5 km yarış temposundan belirgin biçimde yavaştır ve ilk kez ölçenler çoğu zaman \"bu kadar yavaş mı?\" diye şaşırır.",
        "Daha yapılandırılmış antrenman için tempolar bölgelere ayrılır: toparlanma, aerobik (kolay), tempo, eşik ve interval. Bu bölgeler genellikle bir test koşusundan ya da yakın tarihli bir yarış sonucundan türetilir. [[arac:kosu-hiz-bolgeleri-hesapla|Koşu hız bölgeleri hesaplama aracı]] test koşunuzun mesafe ve süresinden eşik temponuzu ve bölge aralıklarını dk/km olarak verir."
      ],
      table: {
        head: ["Bölge", "Nasıl hissettirir?", "Ne için kullanılır?"],
        rows: [
          ["Toparlanma", "Çok rahat, rahatça sohbet edilir", "Zor antrenman sonrası dinlenme koşusu"],
          ["Aerobik (kolay)", "Rahat, tam cümlelerle konuşulur", "Haftalık koşunun büyük kısmı, dayanıklılık"],
          ["Tempo", "Kontrollü zorlanma, kısa cümleler", "Uzun süre hızlı tempoyu taşıma"],
          ["Eşik", "Zor ama sürdürülebilir, birkaç kelime", "Laktat eşiğini geliştirme"],
          ["Interval", "Çok zor, konuşmak güç", "Kısa tekrarlarla hız ve kapasite"]
        ]
      },
      after: [
        "<strong>Nabız bölgeleri tempoyla ilişkili mi?</strong> Evet, ama birebir değil. Aynı tempoda sıcak havada, yokuşta, yorgunken ya da uykusuzken nabız daha yüksek çıkar. Bu yüzden birçok koşucu kolay günlerde nabzı ya da konuşma testini, hızlı antrenmanlarda ise tempoyu esas alır. Nabız aralıkları kişiden kişiye değiştiği için genel formüller yalnızca kaba bir başlangıç noktasıdır; [[bilgi:normal-nabiz-kac-olmali|nabız değerleri yazımız]] bu konuda genel bilgi verir."
      ]
    },
    {
      h: "Yeni başlayan biri hangi tempoda koşmalı?",
      p: [
        "Yeni başlayanlar için tempo değil süre ve süreklilik önemlidir. Pek çok başlangıç programı yürüyüş ile hafif koşuyu dönüşümlü yapan aralıklarla başlar ve haftalar içinde koşu bölümlerini uzatır. Bu aşamada hedef, konuşabileceğiniz kadar yavaş bir tempoda kesintisiz koşu süresini artırmaktır.",
        "Tempo hedefi koymak isterseniz önce rahat bir tempoyla 2–3 km koşup ortalama temponuzu ölçün ve birkaç hafta bu tempoyu koruyun. Hızlanma, düzenli koşunun doğal sonucu olarak gelir. Bir sağlık sorununuz varsa ya da uzun süredir hareketsizseniz koşuya başlamadan önce hekiminize danışmanız önerilir."
      ]
    },
    {
      h: "Tempo hesaplarken sık yapılan hatalar",
      ul: [
        "<strong>Ondalığı saniye sanmak:</strong> 5,5 dakika 5:50 değil 5:30'dur. Ondalık kısım 60 ile çarpılarak saniyeye çevrilir.",
        "<strong>Saat verisine körü körüne güvenmek:</strong> GPS saatler ağaçlık alanlarda, yüksek binalar arasında ve tünellerde mesafeyi kaçırabilir. Resmî parkur ölçümüyle saat arasında yüzde birkaçlık fark sık görülür.",
        "<strong>Maraton mesafesini 42 km almak:</strong> Fazladan 195 metre, 6:00 tempoda yaklaşık 1 dakika 10 saniye demektir. Yarış planında gerçek mesafeyi kullanın.",
        "<strong>Bant hızını yol temposuyla eşitlemek:</strong> Koşu bandında hava direnci ve zemin farkı olmadığından aynı tempo yolda biraz daha zor gelebilir. Birçok koşucu bunu dengelemek için bandı hafif eğime alır.",
        "<strong>Riegel tahminini garanti sanmak:</strong> Formül antrenmanı, hava koşullarını ve parkur profilini bilmez; yalnızca makul bir başlangıç noktası verir."
      ]
    },
    {
      h: "Tempo araçlarını kullanma adımları",
      ol: [
        "Son koşunuzun mesafesini ve toplam süresini saatinizden ya da uygulamanızdan alın.",
        "[[arac:kosu-temposu-hesapla|Koşu temposu hesaplama]] aracına mesafe ve süreyi yazın; dk/km, dk/mil, km/sa ve 400 metrelik tur süresi görünür.",
        "Hedef yarışınız için [[arac:maraton-sure-tahmini|maraton süre tahmini]] aracına bilinen en iyi sonucunuzu girip diğer mesafelerdeki tahmini süreyi görün.",
        "Antrenmanlarınızı planlamak için [[arac:kosu-hiz-bolgeleri-hesapla|hız bölgeleri aracı]]ndan bölge tempolarınızı alın ve bir kenara not edin."
      ],
      after: [
        "Günlük adım hedefiyle koşuyu birlikte düşünüyorsanız [[bilgi:gunde-kac-adim-atmali|günde kaç adım atılmalı]] yazımız yürüyüş ile koşunun günlük harekete katkısını anlatır."
      ]
    }
  ],
  faq: [
    ["Koşu temposu (pace) nedir?", "Koşu temposu, bir kilometreyi kaç dakika ve saniyede koştuğunuzu gösteren ölçüdür. Örneğin 5:30 dk/km, her kilometrenin 5 dakika 30 saniyede koşulduğu anlamına gelir ve küçük sayı daha hızlı koşu demektir."],
    ["Tempo nasıl hesaplanır?", "Toplam süreyi dakikaya çevirip mesafeye bölersiniz. 27 dakika 30 saniyede 5 km koştuysanız 27,5 ÷ 5 = 5,5 dakika bulunur; ondalık kısım 60 ile çarpılınca tempo 5:30 dk/km olur."],
    ["Dakika/km hızı km/saate nasıl çevrilir?", "60 sayısını ondalık dakika cinsinden tempoya bölersiniz. 5:00 dk/km için 60 ÷ 5 = 12 km/sa, 6:30 dk/km için 60 ÷ 6,5 ≈ 9,2 km/sa bulunur. Tersine çevirmek için 60'ı hıza bölersiniz."],
    ["5 km için ortalama süre nedir?", "Herkes için geçerli bir ortalama yoktur. Yeni başlayanlarda 30–40 dakika, düzenli koşan amatörlerde 25–30 dakika sık görülen sürelerdir. Kendi önceki sonuçlarınızla karşılaştırmak, gelişiminizi izlemenin en doğru yoludur."],
    ["Maraton bitirme süresi nasıl tahmin edilir?", "En yaygın yöntem Riegel formülüdür: T₂ = T₁ × (D₂ ÷ D₁)^1,06. 10 km'yi 50 dakikada koşan birinin maraton tahmini yaklaşık 3 saat 50 dakikadır. Yeterli uzun koşu antrenmanı yoksa gerçek süre daha uzun olur."],
    ["Kolay koşu temposu nasıl belirlenir?", "Kolay tempo, koşarken tam cümlelerle konuşabildiğiniz tempodur. Yarış temponuzdan belirgin biçimde yavaştır. Bir test koşusundan türetilen hız bölgeleri de aerobik bölgenin tempo aralığını sayısal olarak verir."],
    ["Nabız bölgeleri tempoyla ilişkili mi?", "İlişkilidir ama birebir değildir. Sıcak hava, yokuş, yorgunluk ve uykusuzluk aynı tempoda nabzı yükseltir. Bu nedenle kolay günlerde nabız ya da konuşma testi, hızlı antrenmanlarda tempo daha kullanışlı bir rehberdir."],
    ["Yeni başlayan biri hangi tempoda koşmalı?", "Yeni başlayanlar tempodan çok kesintisiz koşu süresine odaklanmalıdır. Konuşabileceğiniz kadar yavaş bir tempo seçip yürüyüşle dönüşümlü başlamak yaygın bir yöntemdir. Sağlık sorununuz varsa önce hekiminize danışın."],
    ["Mil cinsinden tempo kilometreye nasıl çevrilir?", "1 mil 1,609344 km olduğu için dk/mil değerini 1,609344'e bölersiniz. 9:00 dk/mil, 9 ÷ 1,609344 ≈ 5,59 dakika, yani yaklaşık 5:36 dk/km eder."]
  ],
  tools: ["kosu-temposu-hesapla", "dakika-kilometre-tempo-cevir", "maraton-sure-tahmini", "kosu-hiz-bolgeleri-hesapla"],
  related: ["gunde-kac-adim-atmali", "normal-nabiz-kac-olmali"],
  sources: [
    ["Dünya Sağlık Örgütü – Fiziksel aktivite bilgi sayfası", "https://www.who.int/news-room/fact-sheets/detail/physical-activity"]
  ],
  uyari: "genel bilgidir; sağlık sorununuz varsa egzersize başlamadan önce hekiminize danışın"
};
