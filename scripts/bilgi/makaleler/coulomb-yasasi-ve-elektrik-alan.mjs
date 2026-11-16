export default {
  slug: "coulomb-yasasi-ve-elektrik-alan",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Coulomb Yasası Nedir? Elektriksel Kuvvet ve Elektrik Alan Nasıl Hesaplanır",
  pageTitle: "Coulomb Yasası: Elektriksel Kuvvet ve Elektrik Alan Hesabı",
  description: "Coulomb yasası F = k·q₁·q₂/r², k ≈ 8,99 × 10⁹ N·m²/C². Uzaklık iki katına çıkınca kuvvet dörtte bire iner. Elektrik alan E = k·q/r², manyetik kuvvet farkı ve örnekler.",
  keywords: ["coulomb yasası", "elektriksel kuvvet formülü", "coulomb sabiti", "elektrik alan nedir", "elektrik alan hesaplama", "yük birimi coulomb", "aynı ve zıt yükler", "manyetik kuvvet", "11. sınıf elektrik"],
  lead: "Coulomb yasasına göre iki noktasal yük arasındaki elektriksel kuvvet, yüklerin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılıdır: <strong>F = k × q₁ × q₂ ÷ r²</strong>. Coulomb sabiti boşlukta <strong>k ≈ 8,99 × 10⁹ N·m²/C²</strong>'dir. Örneğin 10 cm arayla duran 2 µC ve 3 µC'luk iki yük birbirine yaklaşık 5,39 N kuvvet uygular; uzaklık iki katına çıkarsa kuvvet dörtte bire iner. Bu sayfada kuvvetin yönünü, elektrik alan kavramını, coulomb biriminin büyüklüğünü, manyetik kuvvetle farkını ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Coulomb yasası: F = k × |q₁ × q₂| ÷ r²; F newton, q coulomb, r metre cinsindendir.",
    "Coulomb sabiti k = 1 ÷ (4πε₀) ≈ 8,99 × 10⁹ N·m²/C²'dir; ε₀ ≈ 8,854 × 10⁻¹² F/m.",
    "Aynı işaretli yükler birbirini iter, zıt işaretli yükler birbirini çeker; kuvvetler eşit büyüklükte ve zıt yönlüdür.",
    "Uzaklık iki katına çıkarsa kuvvet 1/4'üne, üç katına çıkarsa 1/9'una iner.",
    "Elektrik alan, birim pozitif yüke etki eden kuvvettir: E = F ÷ q = k × Q ÷ r²; birimi N/C ya da V/m.",
    "1 coulomb yaklaşık 6,24 × 10<sup>18</sup> elektronun yüküdür; bir elektronun yükü 1,602 × 10<sup>−19</sup> C'dir."
  ],
  figure: {
    alt: "Üstte iki yük arasındaki kuvvet: aynı işaretli yükler dışa doğru itiyor, zıt işaretli yükler içe doğru çekiyor. Altta uzaklığa göre kuvvet: r'de 5,39 newton, 2r'de 1,35 newton, 3r'de 0,60 newton.",
    caption: "Örnek: 2 µC ve 3 µC'luk yükler 10 cm arayla 5,39 N kuvvet uygular. Uzaklık 20 cm'ye çıkınca kuvvet 4'e, 30 cm'ye çıkınca 9'a bölünür; bu ters kare bağıntısıdır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="okc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" class="p"/></marker>
  </defs>
  <text x="360" y="30" class="lg b mid">Coulomb kuvveti: yön ve uzaklık</text>
  <circle cx="110" cy="90" r="22" class="ps"/><text x="110" y="97" class="b mid lg">+</text>
  <circle cx="250" cy="90" r="22" class="ps"/><text x="250" y="97" class="b mid lg">+</text>
  <line x1="86" y1="90" x2="36" y2="90" class="sp sw" fill="none" marker-end="url(#okc)"/>
  <line x1="274" y1="90" x2="324" y2="90" class="sp sw" fill="none" marker-end="url(#okc)"/>
  <text x="180" y="140" class="b mid">Aynı işaret: iter</text>
  <circle cx="450" cy="90" r="22" class="ps"/><text x="450" y="97" class="b mid lg">+</text>
  <circle cx="610" cy="90" r="22" class="dgs"/><text x="610" y="97" class="b mid lg">−</text>
  <line x1="474" y1="90" x2="524" y2="90" class="sp sw" fill="none" marker-end="url(#okc)"/>
  <line x1="586" y1="90" x2="536" y2="90" class="sp sw" fill="none" marker-end="url(#okc)"/>
  <text x="530" y="140" class="b mid">Zıt işaret: çeker</text>
  <line x1="40" y1="164" x2="680" y2="164" class="sb dash" fill="none"/>
  <text x="40" y="196" class="b">q₁ = 2 µC, q₂ = 3 µC</text>
  <g class="sm">
    <text x="130" y="236" class="end">r = 10 cm</text>
    <rect x="140" y="218" width="520" height="28" rx="4" class="p"/>
    <text x="650" y="237" class="b end sf">5,39 N</text>
    <text x="130" y="286" class="end">2r = 20 cm</text>
    <rect x="140" y="268" width="130" height="28" rx="4" class="ps"/>
    <text x="280" y="287" class="b">1,35 N (÷4)</text>
    <text x="130" y="336" class="end">3r = 30 cm</text>
    <rect x="140" y="318" width="58" height="28" rx="4" class="ps"/>
    <text x="208" y="337" class="b">0,60 N (÷9)</text>
  </g>
  <text x="360" y="380" class="sm mid t2">F = 8,99 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶ ÷ 0,1²</text>
</svg>`
  },
  sections: [
    {
      h: "Coulomb yasası nedir?",
      p: [
        "Fransız fizikçi Charles-Augustin de Coulomb, 1780'lerde burulma terazisiyle yaptığı deneylerde yüklü küreler arasındaki kuvvetin uzaklığın karesiyle ters orantılı olduğunu gösterdi. Bugün kendi adıyla anılan yasa, durgun noktasal yükler arasındaki elektriksel kuvveti tanımlar ve elektrostatiğin temelidir.",
        "Yasa iki ilişkiyi birlikte söyler: yüklerden biri iki katına çıkarsa kuvvet iki katına çıkar (doğru orantı); aralarındaki uzaklık iki katına çıkarsa kuvvet dörtte bire iner (ters kare orantı). Kütle çekimi yasasıyla aynı matematiksel biçime sahiptir; fark, elektriksel kuvvetin hem çekici hem itici olabilmesi ve çok daha güçlü olmasıdır.",
        "Konu 11. sınıf fizik programında elektrik ve manyetizma ünitesinde işlenir; elektrik alan, potansiyel ve sığa konularının başlangıcıdır."
      ]
    },
    {
      h: "İki yük arasındaki kuvvet nasıl hesaplanır?",
      formula: "F = k × q₁ × q₂ ÷ r²\nk ≈ 8,99 × 10⁹ N·m²/C²\n1 µC = 10⁻⁶ C · 1 nC = 10⁻⁹ C · 1 cm = 0,01 m",
      ol: [
        "Yükleri coulomb'a çevirin: q₁ = 2 µC = 2 × 10<sup>−6</sup> C, q₂ = 3 µC = 3 × 10<sup>−6</sup> C.",
        "Uzaklığı metreye çevirin: r = 10 cm = 0,1 m; r² = 0,01 m².",
        "Yüklerin çarpımını bulun: 2 × 10<sup>−6</sup> × 3 × 10<sup>−6</sup> = 6 × 10<sup>−12</sup> C².",
        "Formülde yerine koyun: F = 8,99 × 10<sup>9</sup> × 6 × 10<sup>−12</sup> ÷ 0,01 ≈ 5,39 N.",
        "Yönü belirleyin: iki yük de pozitif olduğundan kuvvet iticidir. Her yüke aynı büyüklükte, ötekinden uzaklaşan yönde 5,39 N etki eder."
      ],
      after: [
        "Kuvvetin büyüklüğü hesaplanırken yüklerin mutlak değerleri kullanılır; işaret yalnızca itme mi çekme mi olduğunu söyler. Bu iki kuvvet Newton'un üçüncü yasasına uygun etki-tepki çiftidir; bkz. [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]].",
        "Yükleri µC, nC ya da C; uzaklığı m, cm ya da mm girerek hesap yapmak için [[arac:coulomb-kuvveti-hesapla|Coulomb Kuvveti Hesaplama]] aracını kullanabilirsiniz; kuvvetin itme mi çekme mi olduğu da gösterilir."
      ]
    },
    {
      h: "Coulomb sabiti kaçtır?",
      p: [
        "Coulomb sabiti boşlukta k = 8,9875517923 × 10<sup>9</sup> N·m²/C²'dir ve okul hesaplarında çoğunlukla 9 × 10<sup>9</sup> olarak yuvarlanır. Sabit, boşluğun elektrik geçirgenliği ε₀ cinsinden k = 1 ÷ (4πε₀) biçiminde de yazılır; ε₀ ≈ 8,854 × 10<sup>−12</sup> F/m'dir.",
        "Yükler hava yerine su, yağ ya da plastik gibi yalıtkan bir ortamdaysa kuvvet ortamın bağıl dielektrik sabitine (ε<sub>r</sub>) bölünür. Havada ε<sub>r</sub> yaklaşık 1'dir; suda yaklaşık 80'dir. Bu yüzden aynı iki iyon suda havaya göre yaklaşık 80 kat zayıf etkileşir ve tuzun suda kolayca çözünmesinin bir nedeni budur.",
        "Sınavlarda soruda hangi değer verilmişse (9 × 10<sup>9</sup> ya da 8,99 × 10<sup>9</sup>) onu kullanın; sonuçlar arasındaki %0,1'lik fark yuvarlamadan kaynaklanır."
      ]
    },
    {
      h: "Uzaklık iki katına çıkarsa kuvvet ne olur?",
      p: [
        "Uzaklık formülde karesiyle paydada olduğu için, uzaklık iki katına çıkınca kuvvet 2² = 4'e bölünür. Üç katında 9'a, on katında 100'e bölünür. Tersine, uzaklık yarıya inerse kuvvet dört katına çıkar."
      ],
      table: {
        head: ["Uzaklık", "Çarpan", "2 µC ve 3 µC için kuvvet"],
        rows: [
          ["5 cm (r ÷ 2)", "×4", "21,57 N"],
          ["10 cm (r)", "×1", "5,39 N"],
          ["20 cm (2r)", "÷4", "1,35 N"],
          ["30 cm (3r)", "÷9", "0,60 N"],
          ["1 m (10r)", "÷100", "0,054 N"]
        ],
        caption: "Değerler k = 8,99 × 10<sup>9</sup> N·m²/C² ile hesaplanmıştır."
      },
      after: [
        "Ters kare bağıntısı yalnızca noktasal (ya da küresel simetrik) yükler için geçerlidir. Uzun bir yüklü tel ya da geniş bir levha gibi dağılmış yüklerin alanı uzaklıkla farklı biçimde değişir; paralel levhalar arasında alan neredeyse sabittir."
      ]
    },
    {
      h: "Aynı ve zıt yükler arasında ne olur?",
      p: [
        "İki pozitif ya da iki negatif yük birbirini iter; bir pozitif ve bir negatif yük birbirini çeker. Kuvvet, yüklerin ağırlık merkezlerini birleştiren doğru boyuncadır. Formülde işaretli yükler kullanılırsa F'nin pozitif çıkması itmeyi, negatif çıkması çekmeyi gösterir.",
        "Birden fazla yük varsa bir yüke etki eden net kuvvet, her bir yükten gelen kuvvetlerin <strong>vektörel</strong> toplamıdır (üst üste binme ilkesi). Aynı doğru üzerindeki yüklerde kuvvetler işaretleriyle toplanır; farklı doğrultulardaki kuvvetler ise bileşenlerine ayrılarak ya da dik açılıysa Pisagor bağıntısıyla birleştirilir.",
        "Günlük hayatta saçınızı taradıktan sonra tarağın küçük kâğıt parçalarını çekmesi, kuru havada kapı kolundan çarpılmanız ya da balonun duvara yapışması bu kuvvetin örnekleridir. Kâğıt parçası yüksüz olsa bile tarak, içindeki yükleri kutuplaştırır ve yakın taraftaki zıt yük daha güçlü çekildiği için net kuvvet çekici olur."
      ]
    },
    {
      h: "Elektrik alan nedir ve nasıl bulunur?",
      p: [
        "Elektrik alan, bir yükün çevresindeki uzayda oluşturduğu etkidir. Alanın bir noktadaki şiddeti, o noktaya konan küçük pozitif bir deneme yüküne etki eden kuvvetin yüke bölümüdür. Birimi N/C'dir ve bu, V/m ile aynıdır. Alanın yönü pozitif yükten dışarı, negatif yüke doğrudur."
      ],
      formula: "E = F ÷ q   (deneme yükü)\nE = k × Q ÷ r²   (noktasal yük)\nE = V ÷ d   (paralel levhalar)",
      ul: [
        "<strong>Noktasal yük:</strong> 2 µC'luk yükten 10 cm uzakta E = 8,99 × 10<sup>9</sup> × 2 × 10<sup>−6</sup> ÷ 0,01 ≈ 1,80 × 10<sup>6</sup> N/C.",
        "<strong>Bu alana konan yük:</strong> 1 nC'luk deneme yüküne F = E × q = 1,8 × 10<sup>6</sup> × 10<sup>−9</sup> = 0,0018 N etki eder.",
        "<strong>Paralel levhalar:</strong> 12 V gerilim uygulanan ve 2 mm arayla duran levhalar arasında E = 12 ÷ 0,002 = 6.000 V/m. Bu alan levhalar arasında her yerde yaklaşık aynıdır.",
        "Kuru havada yaklaşık 3 × 10<sup>6</sup> V/m civarındaki alan şiddetlerinde hava iyonlaşıp iletken hale gelebilir; kıvılcım ve yıldırım bu eşiğin aşılmasıyla oluşur."
      ],
      after: [
        "Noktasal yük, deneme yükü ve paralel levha yollarıyla alan hesabı için [[arac:elektrik-alan-hesapla|Elektrik Alan Hesaplama]] aracını kullanabilirsiniz. Levhalar arasındaki gerilim ve akım ilişkisi için [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Yükün birimi coulomb ne kadar büyüktür?",
      p: [
        "Coulomb, 1 amper akımın 1 saniyede taşıdığı yüktür: 1 C = 1 A × 1 s. Temel yük, yani bir protonun ya da (eksi işaretle) bir elektronun yükü, SI'da tam olarak 1,602176634 × 10<sup>−19</sup> C olarak tanımlanmıştır. Buradan 1 C'luk yük için yaklaşık 6,24 × 10<sup>18</sup> elektron gerektiği bulunur.",
        "Elektrostatikte 1 C çok büyük bir yüktür. 1 m arayla duran iki adet 1 C'luk yük birbirine yaklaşık 8,99 × 10<sup>9</sup> N kuvvet uygulardı; bu, yaklaşık 900.000 tonluk bir kütlenin ağırlığına denktir. Bu yüzden statik elektrik örneklerinde yükler mikrocoulomb (µC) ve nanocoulomb (nC) mertebesindedir. Bir kondansatördeki ya da pildeki yük ise akım ve süre çarpımıyla çok daha büyük değerlere ulaşabilir, çünkü orada yükler birbirini dengeleyerek hareket eder.",
        "Elektriksel kuvvetin gücünü göstermek için sık verilen bir karşılaştırma: bir elektron ile proton arasındaki elektriksel çekim, aralarındaki kütle çekiminden yaklaşık 2,3 × 10<sup>39</sup> kat büyüktür. Mili, mikro, nano gibi öneklerin değerleri için [[bilgi:si-onekleri-mili-mikro-kilo-mega|SI önekleri]] makalesine göz atabilirsiniz."
      ]
    },
    {
      h: "Elektrik alan ile manyetik kuvvet arasındaki fark nedir?",
      p: [
        "Elektrik alan, yüke hareket edip etmediğinden bağımsız olarak kuvvet uygular. Manyetik alan ise yalnızca <strong>hareket eden</strong> yüklere ve akım taşıyan tellere kuvvet uygular; durgun yüke etkisi yoktur. Manyetik kuvvet hıza diktir, bu yüzden yükün süratini değiştirmez, yalnızca yönünü değiştirir ve yükü çembersel yörüngeye sokabilir."
      ],
      formula: "Hareketli yük: F = q × v × B × sin θ\nAkım taşıyan tel: F = B × I × L × sin θ\nYörünge yarıçapı: r = m × v ÷ (q × B)",
      ul: [
        "Bir proton 10<sup>6</sup> m/s hızla 0,5 T'lık alana dik giriyor: F = 1,602 × 10<sup>−19</sup> × 10<sup>6</sup> × 0,5 ≈ 8,0 × 10<sup>−14</sup> N. Yörünge yarıçapı r = 1,673 × 10<sup>−27</sup> × 10<sup>6</sup> ÷ (1,602 × 10<sup>−19</sup> × 0,5) ≈ 2,1 cm.",
        "0,2 T'lık alanda alana dik duran, 5 A akım taşıyan 0,5 m'lik tele F = 0,2 × 5 × 0,5 = 0,5 N etki eder. Elektrik motorları bu kuvvetle döner.",
        "Yük alana paralel hareket ediyorsa (θ = 0°) manyetik kuvvet sıfırdır; elektrik kuvveti ise yönden bağımsız olarak etkir."
      ],
      after: [
        "Hareketli yüke ve tele etki eden kuvveti, yörünge yarıçapıyla birlikte hesaplamak için [[arac:manyetik-kuvvet-hesapla|Manyetik Kuvvet Hesaplama]] aracını kullanabilirsiniz. Çembersel yörüngedeki kuvvet dengesi için [[bilgi:merkezcil-kuvvet-ve-acisal-hiz|merkezcil kuvvet]] makalesine bakın."
      ],
      note: "Statik elektrik deneyleri balon, tarak ve kâğıtla güvenle yapılabilir. Yüksek gerilim üreten düzenekler (elektrostatik jeneratör, televizyon tüpü, mikrodalga fırın iç devresi, şebeke elektriği) ise öldürücü olabilir; bu tür deneyleri yalnızca öğretmen ya da uzman gözetiminde yapın."
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>µC'yi çevirmemek:</strong> 2 µC'yi 2 olarak yazmak sonucu 10<sup>12</sup> kat büyütür; önce 10<sup>−6</sup> ile çarpın.",
        "<strong>Uzaklığın karesini almayı unutmak:</strong> r = 0,1 m ise payda 0,01'dir, 0,1 değil.",
        "<strong>Kuvveti yüke göre farklı sanmak:</strong> Büyük yük küçük yüke ne kadar kuvvet uyguluyorsa küçük yük de büyüğe o kadar uygular.",
        "<strong>Alanı ve kuvveti karıştırmak:</strong> Alan (N/C) kaynağın özelliğidir; kuvvet (N) ise o alana konan yükle birlikte ortaya çıkar.",
        "<strong>Vektörleri sayı gibi toplamak:</strong> Farklı yönlerden gelen kuvvetler ve alanlar bileşenlerine ayrılarak toplanır."
      ]
    }
  ],
  faq: [
    ["Coulomb yasası nedir?", "Coulomb yasası, iki noktasal yük arasındaki elektriksel kuvvetin yüklerin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılı olduğunu söyler: F = k × q₁ × q₂ ÷ r². Aynı işaretli yükler iter, zıt işaretliler çeker."],
    ["İki yük arasındaki kuvvet nasıl hesaplanır?", "Yükler coulomb'a, uzaklık metreye çevrilir; yüklerin çarpımı Coulomb sabitiyle çarpılıp uzaklığın karesine bölünür. 10 cm arayla duran 2 µC ve 3 µC'luk yükler arasındaki kuvvet yaklaşık 5,39 N çıkar."],
    ["Coulomb sabiti kaçtır?", "Boşlukta Coulomb sabiti yaklaşık 8,99 × 10<sup>9</sup> N·m²/C²'dir ve okul hesaplarında çoğunlukla 9 × 10<sup>9</sup> alınır. Sabit k = 1 ÷ (4πε₀) olarak da yazılır; ε₀ yaklaşık 8,854 × 10<sup>−12</sup> F/m'dir."],
    ["Elektrik alan nedir ve nasıl bulunur?", "Elektrik alan, bir noktaya konan birim pozitif yüke etki eden kuvvettir ve birimi N/C'dir. Noktasal yük için E = k × Q ÷ r², paralel levhalar için E = V ÷ d formülü kullanılır; 2 µC'luk yükten 10 cm uzakta alan yaklaşık 1,8 × 10<sup>6</sup> N/C'dir."],
    ["Uzaklık iki katına çıkarsa kuvvet ne olur?", "Kuvvet uzaklığın karesiyle ters orantılı olduğundan uzaklık iki katına çıkınca kuvvet dörtte bire iner. Örnekte 10 cm'de 5,39 N olan kuvvet 20 cm'de 1,35 N, 30 cm'de ise 0,60 N olur."],
    ["Aynı ve zıt yükler arasında ne olur?", "Aynı işaretli iki yük birbirini iter, zıt işaretli iki yük birbirini çeker. Her iki durumda da yüklere etki eden kuvvetler eşit büyüklükte ve zıt yönlüdür; birden fazla yük varsa net kuvvet vektörel toplamla bulunur."],
    ["Elektrik alan ile manyetik kuvvet arasındaki fark nedir?", "Elektrik alan durgun ya da hareketli her yüke kuvvet uygular. Manyetik alan ise yalnızca hareket eden yüklere ve akım taşıyan tellere etki eder; kuvvet hıza dik olduğu için yükün süratini değil yönünü değiştirir."],
    ["Yükün birimi coulomb ne kadar büyüktür?", "1 coulomb, 1 amper akımın 1 saniyede taşıdığı yüktür ve yaklaşık 6,24 × 10<sup>18</sup> elektrona eşittir. Statik elektrikte çok büyük bir yüktür; 1 m arayla duran iki 1 C'luk yük yaklaşık 9 milyar newton kuvvetle etkileşirdi."],
    ["Coulomb kuvveti ile kütle çekimi arasındaki fark nedir?", "İkisi de uzaklığın karesiyle ters orantılıdır, ancak kütle çekimi yalnızca çekicidir ve çok zayıftır. Elektriksel kuvvet hem itici hem çekici olabilir; elektron ile proton arasında kütle çekiminden yaklaşık 10<sup>39</sup> kat büyüktür."]
  ],
  tools: ["coulomb-kuvveti-hesapla", "elektrik-alan-hesapla", "manyetik-kuvvet-hesapla"],
  related: ["merkezcil-kuvvet-ve-acisal-hiz", "newtonun-hareket-yasalari", "watt-amper-volt-iliskisi"],
  sources: [
    ["BIPM – SI Broşürü, temel yük ve coulomb tanımı", "https://www.bipm.org/en/publications/si-brochure"],
    ["MEB – Ortaöğretim Fizik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ],
  uyari: "yüksek gerilim içeren deneyleri yalnızca öğretmen ya da uzman gözetiminde yapın"
};
