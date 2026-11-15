export default {
  slug: "kutle-ve-agirlik-farki",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Kütle ile Ağırlık Farkı Nedir? Ay'da ve Diğer Gezegenlerde Ağırlık",
  pageTitle: "Kütle ile Ağırlık Farkı: Formül, Birim ve Ay'da Ağırlık",
  description: "Kütle madde miktarıdır (kg), ağırlık kütleye etki eden çekim kuvvetidir (N): G = m · g. 60 kg kişinin Dünya'da 588,6 N, Ay'da 97,2 N ağırlığı ve gezegen tablosu.",
  keywords: ["kütle ve ağırlık farkı", "ağırlık nasıl hesaplanır", "ay'da ağırlık", "kütle birimi", "ağırlık birimi newton", "yer çekimi ivmesi", "diğer gezegenlerde ağırlık", "dinamometre eşit kollu terazi"],
  lead: "Kütle <strong>bir cisimdeki madde miktarıdır, birimi kilogramdır ve nerede olursanız olun değişmez</strong>; ağırlık ise <strong>o kütleye gezegenin uyguladığı çekim kuvvetidir, birimi newtondur ve G = m · g ile hesaplanır</strong>. 60 kg kütleli bir kişinin ağırlığı Dünya'da 60 × 9,81 = 588,6 N, Ay'da 60 × 1,62 = 97,2 N'dur; kütlesi ise iki yerde de 60 kg'dır. Bu yazıda iki kavramın farkını, ölçüm aletlerini, yer çekimi ivmesini ve diğer gezegenlerde ağırlığınızın ne olacağını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Kütle (m) madde miktarıdır; birimi kg, ölçüm aleti eşit kollu terazidir ve yere göre değişmez.",
    "Ağırlık (G) yer çekimi kuvvetidir; birimi newton (N), ölçüm aleti dinamometredir ve bulunulan yere göre değişir.",
    "Formül: G = m · g. Dünya'da g ≈ 9,81 m/s² (okul problemlerinde çoğu zaman 10 m/s² alınır).",
    "Ay'da g ≈ 1,62 m/s², yani Dünya'nın yaklaşık altıda biridir; 60 kg kişinin Ay'daki ağırlığı 97,2 N'dur.",
    "Kütle skaler, ağırlık vektörel bir büyüklüktür; ağırlığın yönü gezegenin merkezine doğrudur.",
    "Banyo tartısı aslında ağırlığı ölçer ve Dünya'ya göre ayarlanarak kilogram gösterir; Ay'da aynı tartı yaklaşık 9,9 kg gösterir."
  ],
  figure: {
    alt: "60 kg kütleli bir kişinin farklı gök cisimlerindeki ağırlığı: Ay 97,2 N, Mars 222,6 N, Venüs 532,2 N, Dünya 588,6 N, Satürn 626,4 N, Jüpiter 1.487,4 N; kütle her yerde 60 kg.",
    caption: "Kütle değişmez, ağırlık değişir: 60 kg'lık bir kişinin ağırlığı, bulunduğu gök cisminin yüzey çekim ivmesiyle orantılıdır. Değerler G = 60 × g ile yaklaşık hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">60 kg kütlenin ağırlığı (G = m · g)</text>
  <rect x="20" y="46" width="680" height="40" rx="8" class="ps"/>
  <text x="360" y="72" class="b mid">Kütle her yerde 60 kg · ağırlık g'ye göre değişir</text>
  <g>
    <text x="130" y="122" class="end b">Ay</text><text x="130" y="138" class="end sm mu">g = 1,62</text>
    <rect x="140" y="110" width="35" height="26" class="p"/><text x="183" y="129" class="b">97,2 N</text>
    <text x="130" y="170" class="end b">Mars</text><text x="130" y="186" class="end sm mu">g = 3,71</text>
    <rect x="140" y="158" width="82" height="26" class="p"/><text x="230" y="177" class="b">222,6 N</text>
    <text x="130" y="218" class="end b">Venüs</text><text x="130" y="234" class="end sm mu">g = 8,87</text>
    <rect x="140" y="206" width="197" height="26" class="p"/><text x="345" y="225" class="b">532,2 N</text>
    <text x="130" y="266" class="end b">Dünya</text><text x="130" y="282" class="end sm mu">g = 9,81</text>
    <rect x="140" y="254" width="218" height="26" class="ok"/><text x="366" y="273" class="b ok">588,6 N</text>
    <text x="130" y="314" class="end b">Satürn</text><text x="130" y="330" class="end sm mu">g = 10,44</text>
    <rect x="140" y="302" width="232" height="26" class="p"/><text x="380" y="321" class="b">626,4 N</text>
    <text x="130" y="362" class="end b">Jüpiter</text><text x="130" y="378" class="end sm mu">g = 24,79</text>
    <rect x="140" y="350" width="551" height="26" class="p"/><text x="680" y="369" class="b end sf">1.487,4 N</text>
  </g>
  <text x="360" y="414" class="sm mid mu">g değerleri yüzeydeki yaklaşık çekim ivmesidir (m/s²).</text>
</svg>`
  },
  sections: [
    {
      h: "Kütle nedir?",
      p: [
        "Kütle, bir cismin içerdiği madde miktarının ölçüsüdür. Bir elmanın kütlesi, onu oluşturan atomların toplamından gelir ve elmayı Dünya'dan Ay'a, oradan uzay boşluğuna taşısanız da değişmez. Kütle bu yüzden cismin kendisine ait, bulunduğu yerden bağımsız bir özelliktir.",
        "Kütlenin SI birimi <strong>kilogram (kg)</strong>'dır; gram (g), miligram (mg) ve ton (t) da kullanılır. 1 t = 1.000 kg, 1 kg = 1.000 g'dır. Kütle yalnızca büyüklüğü olan, yönü olmayan bir <strong>skaler</strong> büyüklüktür.",
        "Kütle aynı zamanda cismin hareket değişikliğine gösterdiği direncin, yani eylemsizliğin ölçüsüdür. Boş bir alışveriş arabasını itmek dolu arabaya göre kolaydır; dolu arabanın kütlesi daha büyük olduğu için hızlandırmak daha fazla kuvvet ister. Bu özellik uzayda, ağırlığın neredeyse hissedilmediği yerde de geçerlidir."
      ]
    },
    {
      h: "Ağırlık nedir, nasıl hesaplanır?",
      p: [
        "Ağırlık, bir cisme bulunduğu gezegenin ya da gök cisminin uyguladığı çekim kuvvetidir. Kuvvet olduğu için birimi <strong>newton (N)</strong>'dur ve yönü gök cisminin merkezine doğrudur; bu yüzden ağırlık <strong>vektörel</strong> bir büyüklüktür.",
        "Ağırlık, kütle ile yer çekimi ivmesinin çarpımıdır. Yer çekimi ivmesi (g), serbest bırakılan bir cismin her saniye hızının ne kadar arttığını gösterir; Dünya yüzeyinde yaklaşık 9,81 m/s²'dir. Okul problemlerinde hesap kolaylığı için çoğu zaman g = 10 m/s² ya da 10 N/kg alınır."
      ],
      formula: "G = m · g\nG: ağırlık (N),  m: kütle (kg),  g: yer çekimi ivmesi (m/s² = N/kg)\nm = G ÷ g",
      ol: [
        "Kütlesi 5 kg olan bir çantanın Dünya'daki ağırlığı: G = 5 × 9,81 = 49,05 N (g = 10 alınırsa 50 N).",
        "Ağırlığı 735,75 N olan bir kişinin kütlesi: m = 735,75 ÷ 9,81 = 75 kg.",
        "Kütlesi 250 g olan bir kitap: önce kg'a çevirin, 0,25 kg. G = 0,25 × 9,81 ≈ 2,45 N."
      ],
      after: [
        "Kütleyi newton cinsinden ağırlığa ya da ağırlığı kütleye çevirmek ve g değerini değiştirerek denemek için [[arac:kutle-agirlik-hesapla|Kütle Ağırlık Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kütle ile ağırlık arasındaki farklar",
      table: {
        head: ["Özellik", "Kütle", "Ağırlık"],
        rows: [
          ["Tanım", "Madde miktarı", "Kütleye etki eden çekim kuvveti"],
          ["Sembol", "m", "G (bazı kaynaklarda W ya da F<sub>g</sub>)"],
          ["SI birimi", "kilogram (kg)", "newton (N)"],
          ["Büyüklük türü", "Skaler (yalnızca büyüklük)", "Vektörel (büyüklük ve yön)"],
          ["Yere göre değişir mi?", "Hayır", "Evet, g'ye bağlı"],
          ["Uzay boşluğunda", "Aynı kalır", "Sıfıra yaklaşır"],
          ["Ölçüm aleti", "Eşit kollu terazi", "Dinamometre (yaylı kantar)"],
          ["Formül", "m = G ÷ g", "G = m · g"]
        ]
      },
      after: [
        "Günlük dilde \"ağırlığım 70 kilo\" demek yaygındır ama fizik açısından doğrusu \"kütlem 70 kilogram\"dır. Ağırlık 70 × 9,81 ≈ 687 N'dur. Bu kullanım hatası kütle ile ağırlığın Dünya'da birbirine orantılı olmasından kaynaklanır."
      ]
    },
    {
      h: "Kütle ve ağırlık hangi aletle ölçülür?",
      p: [
        "<strong>Eşit kollu terazi</strong> kütleyi ölçer. Bir kefeye ölçülecek cisim, diğerine bilinen kütleler konur ve terazi dengeye gelene kadar eklenir. Her iki kefe aynı çekim alanında olduğu için g etkisi iki taraftan eşit biçimde sadeleşir; bu yüzden eşit kollu terazi Ay'da da aynı kütleyi gösterir.",
        "<strong>Dinamometre</strong> ise ağırlığı ölçer. İçindeki yay, asılan cismin ağırlığıyla orantılı olarak uzar ve ölçek newton cinsinden okunur. Ay'da aynı cisim yayı daha az uzatır ve dinamometre daha küçük değer gösterir.",
        "Banyo ve mutfak tartıları aslında ağırlığa, yani üzerlerine uygulanan kuvvete tepki verir; ama ekranlarında bu kuvveti Dünya'nın g değerine bölünmüş hâliyle kilogram olarak gösterirler. Bu yüzden Ay'a götürülen bir banyo tartısı 60 kg'lık bir kişi için yaklaşık 60 × 1,62 ÷ 9,81 ≈ 9,9 kg gösterir."
      ]
    },
    {
      h: "Yer çekimi ivmesi kaçtır, her yerde aynı mı?",
      p: [
        "Dünya yüzeyinde ortalama yer çekimi ivmesi yaklaşık 9,81 m/s²'dir; uluslararası standart değer 9,80665 m/s² olarak tanımlanmıştır. Ancak g Dünya üzerinde her yerde tam olarak aynı değildir. Dünya'nın kutuplarda basık olması ve kendi ekseni etrafında dönmesi nedeniyle ekvatorda yaklaşık 9,78 m/s², kutuplarda yaklaşık 9,83 m/s²'dir. Yükseklik arttıkça da g azalır.",
        "Bu farklar küçük olduğu için günlük hayatta hissedilmez; ama hassas tartı cihazları kurulacakları yere göre kalibre edilir. Yer çekimi, iki kütle arasındaki evrensel çekim kuvvetinin bir sonucudur. Herhangi iki cisim arasındaki çekim kuvvetini F = G · m₁ · m₂ ÷ r² ile hesaplamak için [[arac:kutle-cekim-kuvveti-hesapla|Kütle Çekim Kuvveti Hesaplama]] aracını kullanabilirsiniz (buradaki G evrensel çekim sabitidir, ağırlık sembolüyle karıştırmayın)."
      ]
    },
    {
      h: "Ay'da ve diğer gezegenlerde kaç kilo gelirim?",
      p: [
        "Kütleniz hiçbir gezegende değişmez; değişen ağırlığınızdır. Ağırlığınızı bulmak için kütlenizi gidilen gök cisminin yüzey çekim ivmesiyle çarparsınız. \"Kaç kilo gelirim\" sorusunun cevabı ise Dünya'ya göre ayarlı bir tartının orada ne göstereceğidir: kütleniz × (oradaki g ÷ 9,81)."
      ],
      table: {
        head: ["Gök cismi", "Yüzey g (m/s²)", "Dünya'ya oranı", "60 kg için ağırlık", "Tartının göstereceği"],
        rows: [
          ["Merkür", "3,70", "0,38", "222,0 N", "≈ 22,6 kg"],
          ["Venüs", "8,87", "0,90", "532,2 N", "≈ 54,3 kg"],
          ["Dünya", "9,81", "1,00", "588,6 N", "60,0 kg"],
          ["Ay", "1,62", "0,17", "97,2 N", "≈ 9,9 kg"],
          ["Mars", "3,71", "0,38", "222,6 N", "≈ 22,7 kg"],
          ["Jüpiter", "24,79", "2,53", "1.487,4 N", "≈ 151,6 kg"],
          ["Satürn", "10,44", "1,06", "626,4 N", "≈ 63,9 kg"]
        ],
        caption: "Yaklaşık değerler. Gaz devlerinde katı bir yüzey olmadığı için g, bulut tepelerinin yaklaşık seviyesi için verilir."
      },
      after: [
        "Kendi kütlenizi girerek tüm gezegenlerdeki ağırlığınızı newton ve tartı karşılığı olarak görmek için [[arac:gezegen-agirligi-hesapla|Gezegen Ağırlığı Hesaplama]] aracını deneyebilirsiniz."
      ]
    },
    {
      h: "Ağırlığın birimi neden newton? Kilogram-kuvvet nedir?",
      p: [
        "Ağırlık bir kuvvettir ve SI sisteminde kuvvet birimi newtondur. 1 N, 1 kg kütleli bir cisme 1 m/s² ivme kazandıran kuvvettir: 1 N = 1 kg · m/s². Bu tanım Newton'un ikinci yasasından (F = m · a) gelir; ağırlık formülü G = m · g de aynı yasanın yer çekimi için yazılmış hâlidir.",
        "Eski ve teknik kullanımda <strong>kilogram-kuvvet (kgf)</strong> birimi de görülür. 1 kgf, 1 kg kütlenin standart yer çekiminde uyguladığı kuvvettir ve 9,80665 N'a eşittir. Vinç kapasiteleri, tork anahtarları ve bazı makine kataloglarında kgf ile karşılaşabilirsiniz. Değerleri birbirine çevirmek için [[arac:newton-kgf-cevir|Newton kgf Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ağırlığı kilogramla yazmak:</strong> Fizik sorularında ağırlık newton cinsinden verilmelidir.",
        "<strong>Gramı kilograma çevirmemek:</strong> G = m · g formülünde kütle kg olmalıdır; 500 g için 0,5 yazılır.",
        "<strong>Kütlenin Ay'da azaldığını sanmak:</strong> Ay'da azalan ağırlıktır; kütle aynı kalır.",
        "<strong>Uzayda ağırlığın tam sıfır olduğunu düşünmek:</strong> Uzay istasyonundaki astronotlar üzerinde çekim kuvveti hâlâ vardır; serbest düşüşte oldukları için ağırlıksızlık hissederler.",
        "<strong>g değerini karıştırmak:</strong> Soruda g = 10 verilmişse 9,81 kullanmayın; sonuçlar farklı çıkar."
      ],
      after: [
        "Ağırlığın bir yüzeye yayılmasıyla oluşan etkiyi merak ediyorsanız [[bilgi:basinc-nedir-nasil-hesaplanir|basınç nedir]] yazımız bu konunun devamıdır."
      ]
    }
  ],
  faq: [
    ["Kütle ile ağırlık arasındaki fark nedir?", "Kütle bir cisimdeki madde miktarıdır, birimi kilogramdır ve bulunulan yere göre değişmez. Ağırlık ise o kütleye gezegenin uyguladığı çekim kuvvetidir, birimi newtondur ve yer çekimi ivmesine göre değişir. Kütle skaler, ağırlık vektörel bir büyüklüktür."],
    ["Ağırlık nasıl hesaplanır?", "Ağırlık, kütlenin yer çekimi ivmesiyle çarpılmasıyla hesaplanır: G eşittir m çarpı g. Dünya'da g yaklaşık 9,81 m/s² olduğundan 60 kg kütleli bir kişinin ağırlığı 588,6 N'dur. Okul problemlerinde g çoğu zaman 10 alınır ve sonuç 600 N bulunur."],
    ["Ay'da ağırlığımız neden azalır?", "Ay'ın kütlesi ve yarıçapı Dünya'dan çok küçük olduğu için yüzeyindeki çekim ivmesi yaklaşık 1,62 m/s²'dir, yani Dünya'nın yaklaşık altıda biri. Kütleniz aynı kalır ama ağırlığınız aynı oranda azalır; 60 kg için Ay'daki ağırlık 97,2 N'dur."],
    ["Kütle değişir mi?", "Hayır, bir cismin kütlesi bulunduğu yere göre değişmez; Dünya'da, Ay'da ya da uzayda aynıdır. Kütle ancak cisme madde eklenip çıkarıldığında değişir. Ağırlık ise yer çekimi ivmesine bağlı olduğu için gök cisminden gök cismine farklıdır."],
    ["Ağırlığın birimi neden Newton'dur?", "Ağırlık bir kuvvettir ve Uluslararası Birim Sistemi'nde kuvvetin birimi newtondur. Bir newton, bir kilogram kütleye bir metre bölü saniye kare ivme kazandıran kuvvettir. Ağırlık formülü, Newton'un ikinci yasasının yer çekimi için yazılmış hâlidir."],
    ["Diğer gezegenlerde kaç kilo gelirim?", "Dünya'ya göre ayarlı bir tartının göstereceği değer, kütlenizin oradaki çekim ivmesinin 9,81'e oranıyla çarpımıdır. 60 kg bir kişi Ay'da yaklaşık 9,9 kg, Mars'ta 22,7 kg, Jüpiter'de yaklaşık 151,6 kg gösterir; gerçek kütlesi her yerde 60 kg'dır."],
    ["Kütle hangi aletle ölçülür?", "Kütle eşit kollu terazi ile ölçülür. Cisim bilinen kütlelerle dengelendiği için iki kefeye etki eden çekim aynı oranda değişir ve terazi Ay'da da doğru sonuç verir. Ağırlık ise yaylı bir alet olan dinamometre ile newton cinsinden ölçülür."],
    ["Yer çekimi ivmesi kaçtır?", "Dünya yüzeyinde yer çekimi ivmesi ortalama 9,81 m/s²'dir; standart değer 9,80665 m/s² olarak tanımlanır. Ekvatorda yaklaşık 9,78, kutuplarda 9,83 m/s²'dir ve yükseklik arttıkça azalır. Okul problemlerinde kolaylık için 10 m/s² alınabilir."],
    ["Banyo tartısı kütleyi mi ağırlığı mı ölçer?", "Banyo tartısı üzerine uygulanan kuvvete yani ağırlığa tepki verir, ancak sonucu Dünya'nın çekim ivmesine göre ayarlanmış biçimde kilogram olarak gösterir. Bu yüzden Dünya'da kütlenizi doğru gösterir, Ay'da ise gerçek kütlenizin yaklaşık altıda birini gösterir."]
  ],
  tools: ["kutle-agirlik-hesapla", "gezegen-agirligi-hesapla", "newton-kgf-cevir", "kutle-cekim-kuvveti-hesapla"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "basinc-nedir-nasil-hesaplanir", "basit-makineler-kaldirac-makara"],
  sources: [
    ["MEB – Fen Bilimleri Dersi Öğretim Programı", "https://www.meb.gov.tr/"],
    ["NASA – Planetary Fact Sheet", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"],
    ["BIPM – SI birimleri", "https://www.bipm.org/en/measurement-units"]
  ]
};
