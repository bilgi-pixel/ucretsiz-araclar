export default {
  slug: "ph-nedir-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "pH Nedir, Nasıl Hesaplanır? Asit-Baz Ölçeği, pOH ve Örnekler",
  pageTitle: "pH Nedir, Nasıl Hesaplanır? pH = −log[H⁺], pOH ve Örnekler",
  description: "pH, çözeltideki H⁺ derişiminin eksi logaritmasıdır: pH = −log[H⁺]. 25 °C'de pH + pOH = 14, nötr pH 7. Asit-baz örnekleri, içme suyu pH'si ve çözümlü sorular.",
  keywords: ["ph nedir", "ph nasıl hesaplanır", "ph ölçeği", "asit baz", "poh nedir", "nötr ph kaç", "içme suyu ph kaç olmalı", "turnusol kağıdı"],
  lead: "pH, <strong>bir çözeltideki hidrojen iyonu (H⁺) derişiminin eksi logaritmasıdır: pH = −log[H⁺]</strong>. Çözeltinin ne kadar asidik ya da bazik olduğunu gösterir. 25 °C'de pH 7 nötr, 7'nin altı asidik, üstü baziktir; pH ile pOH'nin toplamı 14'tür. Ölçek logaritmik olduğu için pH'deki her 1 birimlik düşüş, H⁺ derişiminin 10 kat arttığı anlamına gelir. 0,01 mol/L HCl çözeltisinin pH'si 2'dir. Bu yazıda formülleri, pOH'yi, günlük maddelerin pH değerlerini, içme suyu sınırlarını ve 7. ile 11. sınıf düzeyinde çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "pH = −log[H⁺]; [H⁺] = 10<sup>−pH</sup> mol/L.",
    "pOH = −log[OH⁻]; 25 °C'de pH + pOH = 14.",
    "25 °C'de pH < 7 asidik, pH = 7 nötr, pH > 7 baziktir.",
    "pH 1 birim azalırsa H⁺ derişimi 10 kat, 2 birim azalırsa 100 kat artar.",
    "Kuvvetli asitlerde [H⁺] asidin derişimine eşit kabul edilir: 0,01 M HCl → pH 2.",
    "Türkiye'de içme suyu için yönetmelikteki pH aralığı 6,5–9,5'tir."
  ],
  figure: {
    alt: "0'dan 14'e pH ölçeği: 0–6 asidik, 7 nötr, 8–14 bazik. Altında hidrojen iyonu derişimleri; üstünde ve altında mide asidi, limon suyu, kahve, saf su, kan, deniz suyu, sabun, amonyak ve çamaşır suyunun yaklaşık pH değerleri.",
    caption: "pH ölçeği logaritmiktir: soldan sağa her kutu H⁺ derişiminin 10 kat azaldığını gösterir. Örnek maddelerin pH değerleri yaklaşıktır ve bileşime göre değişir. Nötr nokta 25 °C için 7'dir.",
    svg: `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">pH ölçeği (25 °C)</text>
  <text x="195" y="62" class="b mid dg">ASİDİK</text>
  <text x="367.5" y="62" class="b mid ok">NÖTR</text>
  <text x="540" y="62" class="b mid">BAZİK</text>
  <g class="sm mid">
    <text x="131" y="106">Mide asidi</text><line x1="131" y1="112" x2="131" y2="150" class="st" fill="none"/>
    <text x="281.5" y="106">Kahve</text><line x1="281.5" y1="112" x2="281.5" y2="150" class="st" fill="none"/>
    <text x="384.7" y="88">Kan 7,4</text><line x1="384.7" y1="94" x2="384.7" y2="150" class="st" fill="none"/>
    <text x="496.5" y="106">Sabun</text><line x1="496.5" y1="112" x2="496.5" y2="150" class="st" fill="none"/>
    <text x="604" y="106">Çamaşır suyu</text><line x1="604" y1="112" x2="604" y2="150" class="st" fill="none"/>
  </g>
<rect x="45" y="150" width="43" height="44" class="dgs sb"/><text x="66.5" y="178" class="mid b">0</text><text x="66.5" y="214" class="sm mid t2">1</text><rect x="88" y="150" width="43" height="44" class="dgs sb"/><text x="109.5" y="178" class="mid b">1</text><rect x="131" y="150" width="43" height="44" class="dgs sb"/><text x="152.5" y="178" class="mid b">2</text><text x="152.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−2</tspan></text><rect x="174" y="150" width="43" height="44" class="dgs sb"/><text x="195.5" y="178" class="mid b">3</text><rect x="217" y="150" width="43" height="44" class="dgs sb"/><text x="238.5" y="178" class="mid b">4</text><text x="238.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−4</tspan></text><rect x="260" y="150" width="43" height="44" class="dgs sb"/><text x="281.5" y="178" class="mid b">5</text><rect x="303" y="150" width="43" height="44" class="dgs sb"/><text x="324.5" y="178" class="mid b">6</text><text x="324.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−6</tspan></text><rect x="346" y="150" width="43" height="44" class="oks sb"/><text x="367.5" y="178" class="mid b">7</text><rect x="389" y="150" width="43" height="44" class="ps sb"/><text x="410.5" y="178" class="mid b">8</text><text x="410.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−8</tspan></text><rect x="432" y="150" width="43" height="44" class="ps sb"/><text x="453.5" y="178" class="mid b">9</text><rect x="475" y="150" width="43" height="44" class="ps sb"/><text x="496.5" y="178" class="mid b">10</text><text x="496.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−10</tspan></text><rect x="518" y="150" width="43" height="44" class="ps sb"/><text x="539.5" y="178" class="mid b">11</text><rect x="561" y="150" width="43" height="44" class="ps sb"/><text x="582.5" y="178" class="mid b">12</text><text x="582.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−12</tspan></text><rect x="604" y="150" width="43" height="44" class="ps sb"/><text x="625.5" y="178" class="mid b">13</text><rect x="647" y="150" width="43" height="44" class="ps sb"/><text x="668.5" y="178" class="mid b">14</text><text x="668.5" y="214" class="sm mid t2">10<tspan dy="-6" class="sm">−14</tspan></text>
  <text x="40" y="236" class="sm t2">[H⁺] (mol/L)</text>
  <g class="sm mid">
    <line x1="152.5" y1="244" x2="152.5" y2="262" class="st" fill="none"/><text x="152.5" y="278">Limon suyu</text>
    <line x1="367.5" y1="244" x2="367.5" y2="262" class="st" fill="none"/><text x="367.5" y="278">Saf su</text>
    <line x1="414.8" y1="244" x2="414.8" y2="290" class="st" fill="none"/><text x="414.8" y="306">Deniz suyu</text>
    <line x1="539.5" y1="244" x2="539.5" y2="262" class="st" fill="none"/><text x="539.5" y="278">Amonyak</text>
  </g>
  <rect x="45" y="316" width="645" height="20" rx="4" class="sf sb"/>
  <text x="367.5" y="331" class="sm mid">pH 1 birim düşerse H⁺ derişimi 10 kat artar</text>
</svg>`
  },
  sections: [
    {
      h: "pH nedir?",
      p: [
        "pH, sulu bir çözeltinin asitlik ya da bazlık derecesini gösteren bir sayıdır. Asitler suda çözündüğünde ortama hidrojen iyonu (H⁺, daha doğru gösterimiyle H₃O⁺) verir; bazlar ise hidroksit iyonu (OH⁻) verir ya da ortamdaki H⁺ iyonlarını azaltır. Bu iyonların derişimleri çoğu zaman 0,001 ya da 0,0000001 mol/L gibi çok küçük sayılardır.",
        "Danimarkalı kimyager Søren Sørensen 1909'da bu küçük sayıları kullanışlı hale getirmek için logaritmik bir ölçek önerdi. pH, H⁺ derişiminin 10 tabanlı logaritmasının eksi işaretlisidir. Böylece 0,0000001 mol/L gibi bir derişim kısaca \"pH 7\" olarak ifade edilir.",
        "pH'nin logaritmik olması önemli bir sonuç doğurur: pH 3 olan bir çözelti, pH 4 olan çözeltiden 10 kat, pH 5 olan çözeltiden 100 kat daha fazla H⁺ içerir. Bu yüzden pH değerleri arasındaki küçük farklar, gerçekte büyük derişim farklarını gösterir."
      ]
    },
    {
      h: "pH nasıl hesaplanır? Formüller",
      formula: "pH = −log[H⁺]\n[H⁺] = 10^(−pH)\npOH = −log[OH⁻]\n25 °C'de: [H⁺] × [OH⁻] = 1 × 10⁻¹⁴ ve pH + pOH = 14",
      p: [
        "Köşeli parantez derişimi gösterir ve birimi mol/L'dir (molarite). H⁺ derişimi 10'un tam kuvveti ise pH doğrudan üssün eksi işaretlisidir: [H⁺] = 10⁻³ mol/L ise pH = 3. Derişim tam kuvvet değilse logaritma hesabı gerekir: [H⁺] = 2 × 10⁻³ ise pH = 3 − log 2 = 3 − 0,30 = 2,70.",
        "Logaritma hesabı için [[arac:us-logaritma-hesapla|Üs ve Logaritma Hesaplama]] aracını, derişimden doğrudan pH ve pOH bulmak için [[arac:ph-hesapla|pH Hesaplama]] aracını kullanabilirsiniz. Molarite kavramını tekrar etmek isterseniz [[bilgi:molarite-nasil-hesaplanir|molarite]] yazısına bakın."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Kuvvetli asit:</strong> 0,01 mol/L HCl çözeltisi. HCl suda tamamen iyonlaştığı için [H⁺] = 0,01 = 10⁻² mol/L. pH = <strong>2</strong>, pOH = 14 − 2 = 12.",
        "<strong>Kuvvetli baz:</strong> 0,001 mol/L NaOH çözeltisi. [OH⁻] = 10⁻³ mol/L, pOH = 3. pH = 14 − 3 = <strong>11</strong>.",
        "<strong>pH'den derişim:</strong> pH'si 4,5 olan bir çözeltide [H⁺] = 10⁻⁴'⁵ ≈ <strong>3,16 × 10⁻⁵ mol/L</strong>.",
        "<strong>Seyreltme:</strong> pH'si 2 olan HCl çözeltisi su eklenerek 10 kat seyreltilirse [H⁺] 10⁻³ olur ve pH <strong>3</strong>'e çıkar. Asit ne kadar seyreltilirse seyreltilsin pH 7'yi geçmez; çok seyreltik çözeltilerde suyun kendi iyonlaşması baskın hale gelir.",
        "<strong>İki değerlikli kuvvetli baz:</strong> 0,005 mol/L Ba(OH)₂ çözeltisinde her formül birimi iki OH⁻ verir: [OH⁻] = 0,01 mol/L, pOH = 2, pH = <strong>12</strong>.",
        "<strong>Zayıf asit (11. sınıf):</strong> 0,1 mol/L asetik asit için Ka ≈ 1,8 × 10⁻⁵. Zayıf asitlerde [H⁺] ≈ √(Ka × C) = √(1,8 × 10⁻⁶) ≈ 1,34 × 10⁻³ mol/L. pH ≈ <strong>2,87</strong>. Aynı derişimdeki HCl'nin pH'si 1 olurdu."
      ]
    },
    {
      h: "pOH nedir, pH ile ilişkisi nedir?",
      p: [
        "pOH, hidroksit iyonu derişiminin eksi logaritmasıdır ve pH'nin baz tarafındaki karşılığıdır. Su molekülleri çok az da olsa kendiliğinden iyonlaşır: H₂O ⇌ H⁺ + OH⁻. 25 °C'de bu iki iyonun derişimlerinin çarpımı sabittir ve suyun iyonlaşma sabiti Kw = 1 × 10⁻¹⁴ olarak bilinir.",
        "Bu eşitliğin iki tarafının eksi logaritması alındığında pH + pOH = 14 bağıntısı elde edilir. Dolayısıyla birini bilen diğerini hemen bulur. Saf suda [H⁺] = [OH⁻] = 10⁻⁷ mol/L olduğu için pH = pOH = 7'dir."
      ],
      table: {
        head: ["pH", "[H⁺] (mol/L)", "[OH⁻] (mol/L)", "pOH", "Ortam"],
        rows: [
          ["1", "10⁻¹", "10⁻¹³", "13", "Kuvvetli asidik"],
          ["4", "10⁻⁴", "10⁻¹⁰", "10", "Asidik"],
          ["7", "10⁻⁷", "10⁻⁷", "7", "Nötr"],
          ["10", "10⁻¹⁰", "10⁻⁴", "4", "Bazik"],
          ["13", "10⁻¹³", "10⁻¹", "1", "Kuvvetli bazik"]
        ]
      }
    },
    {
      h: "pH ölçeği neden 0–14 arasındadır? Nötr pH kaçtır?",
      p: [
        "0–14 aralığı, 25 °C'de suyun iyonlaşma sabitinin 10⁻¹⁴ olmasından gelir. Günlük hayatta ve laboratuvarda karşılaşılan sulu çözeltilerin büyük çoğunluğu bu aralıkta kalır. Ancak ölçeğin kesin bir sınırı yoktur: çok derişik kuvvetli asitlerin pH'si 0'ın altına, çok derişik kuvvetli bazlarınki 14'ün üstüne çıkabilir. Örneğin 2 mol/L HCl'nin hesaplanan pH'si yaklaşık −0,3'tür.",
        "Nötr pH, 25 °C'de 7'dir. Sıcaklık değiştikçe suyun iyonlaşma sabiti değiştiği için nötr nokta da kayar: su ısındıkça daha fazla iyonlaşır ve nötr pH 7'nin altına iner. Bu durumda su yine nötrdür, çünkü H⁺ ve OH⁻ derişimleri hâlâ eşittir. Okul problemlerinde aksi belirtilmedikçe sıcaklık 25 °C ve nötr pH 7 kabul edilir."
      ]
    },
    {
      h: "Asidik ve bazik maddelere örnekler",
      table: {
        head: ["Madde", "Yaklaşık pH", "Ortam"],
        rows: [
          ["Mide asidi", "1,5 – 3,5", "Kuvvetli asidik"],
          ["Limon suyu", "≈ 2", "Asidik"],
          ["Sirke", "≈ 2,5 – 3", "Asidik"],
          ["Gazlı içecekler (kola)", "≈ 2,5", "Asidik"],
          ["Kahve", "≈ 5", "Hafif asidik"],
          ["Yağmur suyu", "≈ 5,6", "Hafif asidik (çözünmüş CO₂)"],
          ["Saf su (25 °C)", "7", "Nötr"],
          ["İnsan kanı", "7,35 – 7,45", "Hafif bazik"],
          ["Deniz suyu", "≈ 8,1", "Hafif bazik"],
          ["Karbonat (sodyum bikarbonat) çözeltisi", "≈ 8,3", "Bazik"],
          ["Sabunlu su", "≈ 9 – 10", "Bazik"],
          ["Ev tipi amonyak", "≈ 11", "Bazik"],
          ["Çamaşır suyu", "≈ 12 – 13", "Kuvvetli bazik"]
        ],
        caption: "Değerler yaklaşıktır; ürünün bileşimine, derişimine ve sıcaklığa göre değişir."
      },
      after: [
        "Asitler genellikle ekşi tatlıdır, mavi turnusolü kırmızıya çevirir ve bazı metallerle tepkimeye girerek hidrojen gazı açığa çıkarır. Bazlar ise acımsı tatlıdır, ele kayganlık hissi verir ve kırmızı turnusolü maviye çevirir. Hiçbir kimyasal maddenin tadına bakılmamalıdır; bu özellikler yalnızca tarihsel tanımlardır. Çamaşır suyu gibi bazik ürünler asidik temizleyicilerle karıştırılmamalıdır, çünkü zehirli gaz açığa çıkabilir."
      ]
    },
    {
      h: "İçme suyunun pH değeri kaç olmalı?",
      p: [
        "Türkiye'de İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik, içme suyunun pH değeri için <strong>6,5 ile 9,5</strong> arasını belirler. Bu aralık doğrudan bir sağlık sınırından çok, suyun borularda korozyona yol açmaması, dezenfeksiyonun etkili olması ve tadın kabul edilebilir kalması için konmuştur.",
        "Dünya Sağlık Örgütü de pH için sağlığa dayalı bir sınır değeri belirlemez; pH'yi su arıtımı ve dağıtım sisteminin işletilmesi açısından önemli bir işletme parametresi olarak ele alır. Şebeke suyunun pH'si ve diğer parametreleri belediyelerin su analiz raporlarında yayımlanır. Ambalajlı su etiketlerinde de pH değeri yazılıdır."
      ]
    },
    {
      h: "Tampon çözeltiler: pH neden kolay değişmez?",
      p: [
        "Bazı çözeltiler, içine az miktarda asit ya da baz eklendiğinde pH'lerini neredeyse hiç değiştirmez. Bunlara <strong>tampon çözelti</strong> denir ve genellikle zayıf bir asit ile onun tuzundan (ya da zayıf bir baz ile tuzundan) oluşur. Eklenen H⁺ iyonlarını tamponun bazik bileşeni, eklenen OH⁻ iyonlarını ise asidik bileşeni tüketir.",
        "İnsan kanı bu sistemin en önemli örneğidir. Kandaki karbonik asit-bikarbonat tamponu pH'yi 7,35–7,45 gibi dar bir aralıkta tutar; bu aralığın dışına çıkılması vücut işlevlerini ciddi biçimde etkiler. Laboratuvarda pH metrelerin kalibrasyonunda kullanılan pH 4, 7 ve 10 çözeltileri de tampondur. Tarımda toprağın pH'si bitkinin besin alımını etkiler; bu nedenle toprak analizinde pH ölçümü ilk bakılan değerlerdendir."
      ]
    },
    {
      h: "Turnusol kâğıdı ve pH nasıl ölçülür?",
      ul: [
        "<strong>Turnusol kâğıdı:</strong> Yalnızca asit mi baz mı olduğunu gösterir. Mavi turnusol asitte kırmızıya, kırmızı turnusol bazda maviye döner. Nötr çözeltide renk değişmez.",
        "<strong>Evrensel indikatör ve pH kâğıdı:</strong> Birkaç boyanın karışımıdır; renk skalasıyla karşılaştırılarak pH yaklaşık bir sayı olarak okunur.",
        "<strong>Doğal indikatörler:</strong> Mor lahana suyu asitte kırmızımsı, nötrde mor, bazda yeşilimsi renk alır; ortaokulda sık yapılan bir deneydir.",
        "<strong>pH metre:</strong> Cam elektrotla çözeltinin gerilimini ölçer ve pH'yi ondalık hassasiyetle verir. Doğru sonuç için tampon çözeltilerle kalibrasyon gerekir.",
        "<strong>Titrasyon:</strong> Bilinmeyen bir asit ya da bazın derişimi, derişimi bilinen bir çözeltiyle nötrleşme noktasına kadar tepkimeye sokularak bulunur. Hesap için [[arac:titrasyon-hesapla|Titrasyon Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Eksi işaretini unutmak:</strong> log(10⁻³) = −3'tür; pH = −log[H⁺] = 3 olur.",
        "<strong>Ölçeği doğrusal sanmak:</strong> pH 3, pH 6'nın iki katı asidik değil, 1.000 kat daha fazla H⁺ içerir.",
        "<strong>Bazda doğrudan pH hesaplamak:</strong> Bazlarda önce [OH⁻]'den pOH bulunur, sonra pH = 14 − pOH.",
        "<strong>Değerliği hesaba katmamak:</strong> Ba(OH)₂ ya da H₂SO₄ gibi maddelerde iyon sayısı formüldeki katsayıya göre artar.",
        "<strong>Zayıf asitte [H⁺] = C almak:</strong> Zayıf asitler tamamen iyonlaşmaz; Ka ile hesap yapılır."
      ]
    }
  ],
  faq: [
    ["pH nedir?", "pH, sulu bir çözeltideki hidrojen iyonu derişiminin eksi logaritmasıdır ve çözeltinin ne kadar asidik ya da bazik olduğunu gösterir. 25 °C'de 7 nötr, 7'nin altı asidik, 7'nin üstü baziktir."],
    ["pH nasıl hesaplanır?", "Hidrojen iyonu derişiminin mol/L cinsinden 10 tabanlı logaritması alınıp eksi ile çarpılır: pH = −log[H⁺]. Örneğin H⁺ derişimi 0,001 mol/L olan bir çözeltinin pH değeri 3'tür."],
    ["pH ölçeği neden 0-14 arasındadır?", "25 °C'de suyun iyonlaşma sabiti 10⁻¹⁴ olduğu için H⁺ ve OH⁻ derişimlerinin çarpımı bu değere eşittir ve pH ile pOH toplamı 14 olur. Çok derişik çözeltilerde pH 0'ın altına ya da 14'ün üstüne çıkabilir."],
    ["Nötr pH kaçtır?", "25 °C'de nötr pH 7'dir; bu değerde H⁺ ve OH⁻ derişimleri eşittir. Sıcaklık arttıkça suyun iyonlaşması artar ve nötr pH 7'nin biraz altına iner, ancak su yine nötr kalır."],
    ["pOH nedir, pH ile ilişkisi nedir?", "pOH, hidroksit iyonu derişiminin eksi logaritmasıdır. 25 °C'de pH ile pOH toplamı 14'e eşittir; bu yüzden pOH'si 3 olan bir bazik çözeltinin pH değeri 11'dir."],
    ["Asidik ve bazik maddelere örnekler nelerdir?", "Limon suyu, sirke, kola ve mide asidi asidik; sabunlu su, karbonat çözeltisi, amonyak ve çamaşır suyu baziktir. Saf su nötrdür, insan kanı ise 7,35 ile 7,45 arasında hafif baziktir."],
    ["İçme suyunun pH değeri kaç olmalı?", "Türkiye'deki İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik içme suyu için 6,5 ile 9,5 arasında bir pH aralığı belirler. Bu sınır daha çok boru korozyonu, dezenfeksiyon ve tat açısından konmuştur."],
    ["Asit seyreltilince pH nasıl değişir?", "Kuvvetli bir asit su eklenerek 10 kat seyreltildiğinde H⁺ derişimi 10 kat azalır ve pH 1 birim artar. Ancak asit ne kadar seyreltilirse seyreltilsin pH 7'yi geçmez, çünkü suyun kendi iyonlaşması baskın hale gelir."],
    ["Turnusol kâğıdı nasıl çalışır?", "Turnusol, rengi ortamın asitliğine göre değişen bir indikatördür. Mavi turnusol asidik çözeltide kırmızıya, kırmızı turnusol bazik çözeltide maviye döner; nötr çözeltide renk değişmez ve tam pH değeri vermez."]
  ],
  tools: ["ph-hesapla", "molarite-hesapla", "us-logaritma-hesapla", "titrasyon-hesapla"],
  related: ["molarite-nasil-hesaplanir", "yogunluk-nedir-nasil-hesaplanir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik", "https://www.mevzuat.gov.tr/"],
    ["Dünya Sağlık Örgütü – İçme suyu kalitesi kılavuzu", "https://www.who.int/"],
    ["Millî Eğitim Bakanlığı – Kimya dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
