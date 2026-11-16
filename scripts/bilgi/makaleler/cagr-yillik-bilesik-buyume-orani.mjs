export default {
  slug: "cagr-yillik-bilesik-buyume-orani",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "CAGR Nedir? Yıllık Bileşik Büyüme Oranı Nasıl Hesaplanır, Örneklerle",
  pageTitle: "CAGR Nedir? Yıllık Bileşik Büyüme Oranı Hesaplama",
  description: "CAGR (yıllık bileşik büyüme oranı) formülü, Excel'de hesaplama, ortalama büyüme ile farkı, dalgalanmayı nasıl gizlediği ve satış ile yatırım için çözümlü örnekler.",
  keywords: ["cagr nedir", "yıllık bileşik büyüme oranı", "cagr hesaplama", "cagr formülü", "excel cagr formülü", "ortalama yıllık getiri", "yüzde değişim ve cagr farkı", "bileşik büyüme"],
  lead: "CAGR (yıllık bileşik büyüme oranı), bir değerin başlangıçtan bitişe her yıl aynı oranda büyüseydi yıllık kaç yüzde büyümesi gerektiğini gösterir ve <strong>CAGR = (bitiş ÷ başlangıç)<sup>1/n</sup> − 1</strong> formülüyle hesaplanır. Örneğin satışları 4 yılda 2 milyon TL'den 3,5 milyon TL'ye çıkan bir şirketin CAGR'ı yaklaşık %15'tir. Bu sayfada formülün mantığını, Excel'de yazılışını, basit ortalamadan neden farklı çıktığını ve CAGR'ın gizlediği riskleri örneklerle anlatıyoruz.",
  kisaCevap: [
    "Formül: CAGR = (bitiş değeri ÷ başlangıç değeri)<sup>1 ÷ yıl sayısı</sup> − 1.",
    "n, ara yıl sayısıdır: 2021'den 2025'e 5 değer vardır ama süre 4 yıldır.",
    "CAGR, yıllık yüzde değişimlerin aritmetik ortalamasından genellikle daha düşük çıkar ve daha gerçekçidir.",
    "Excel'de: =(B2/A2)^(1/C2)-1 ya da Türkçe Excel'de =KUVVET(B2/A2;1/C2)-1.",
    "CAGR yalnızca iki uç değeri bağlar; aradaki düşüşleri ve dalgalanmayı göstermez.",
    "Bileşik faizle aynı matematiği kullanır: bitiş = başlangıç × (1 + CAGR)<sup>n</sup>."
  ],
  figure: {
    alt: "2021–2025 satış grafiği: gerçek satışlar 2,0; 2,3; 2,9; 2,7; 3,5 milyon TL olarak iniş çıkışlı ilerlerken yüzde 15,02 CAGR eğrisi aynı başlangıç ve bitiş noktalarını düzgün bir eğriyle bağlıyor.",
    caption: "Gerçek satışlar (koyu çizgi) 2024'te düşmesine rağmen CAGR eğrisi (kesikli) her yıl sabit %15,02 büyüme varsayar. İki çizgi yalnızca başta ve sonda kesişir; CAGR'ın dalgalanmayı göstermemesinin nedeni budur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Gerçek büyüme ve CAGR eğrisi</text>
  <g class="sm mu">
    <text x="70" y="99" class="end">3,5 mn</text>
    <text x="70" y="189" class="end">2,9 mn</text>
    <text x="70" y="279" class="end">2,3 mn</text>
    <text x="70" y="324" class="end">2,0 mn</text>
  </g>
  <line x1="80" y1="340" x2="640" y2="340" class="st" fill="none"/>
  <line x1="80" y1="70" x2="80" y2="340" class="st" fill="none"/>
  <g class="sm mid">
    <text x="120" y="362">2021</text><text x="240" y="362">2022</text><text x="360" y="362">2023</text><text x="480" y="362">2024</text><text x="600" y="362">2025</text>
  </g>
  <polyline points="120,320 240,275 360,223 480,164 600,95" class="sa sw dash" fill="none"/>
  <polyline points="120,320 240,275 360,185 480,215 600,95" class="sp sw" fill="none"/>
  <g>
    <circle cx="120" cy="320" r="6" class="p"/><circle cx="240" cy="275" r="6" class="p"/>
    <circle cx="360" cy="185" r="6" class="p"/><circle cx="480" cy="215" r="6" class="p"/><circle cx="600" cy="95" r="6" class="p"/>
  </g>
  <g class="sm b">
    <text x="300" y="232" class="ok mid">+%26,1</text>
    <text x="420" y="188" class="dg mid">−%6,9</text>
    <text x="545" y="142" class="ok mid">+%29,6</text>
    <text x="180" y="285" class="ok mid">+%15,0</text>
  </g>
  <rect x="96" y="384" width="16" height="4" class="p"/><text x="120" y="392" class="sm">Gerçek satış</text>
  <rect x="236" y="384" width="16" height="4" class="a"/><text x="260" y="392" class="sm">CAGR %15,02 ile düzgün büyüme</text>
  <rect x="520" y="60" width="180" height="78" rx="8" class="ps"/>
  <text x="610" y="84" class="sm mid">Aritmetik ortalama</text>
  <text x="610" y="104" class="b mid">%15,95</text>
  <text x="610" y="126" class="sm mid p b">CAGR %15,02</text>
</svg>`
  },
  sections: [
    {
      h: "CAGR nedir, ne işe yarar?",
      p: [
        "CAGR, İngilizce <em>compound annual growth rate</em> ifadesinin kısaltmasıdır ve Türkçede yıllık bileşik büyüme oranı olarak kullanılır. Bir şirketin cirosu, bir fonun değeri, bir sektörün pazar büyüklüğü ya da bir şehrin nüfusu gibi zaman içinde değişen bir büyüklüğün ortalama yıllık büyüme hızını tek bir yüzdeyle özetler.",
        "Bileşik kelimesi, her yılın büyümesinin bir önceki yılın büyümüş değeri üzerine eklendiğini anlatır. Yani %15 büyüme ilk yıl 2 milyon TL'nin, ikinci yıl 2,3 milyon TL'nin %15'idir. Bu yaklaşım, faizin faiz kazandığı bileşik faiz mantığıyla aynıdır.",
        "CAGR en çok farklı süreleri ve farklı büyüklükleri karşılaştırmak için kullanılır. 3 yılda %60 büyüyen bir işle 5 yılda %90 büyüyen bir işi doğrudan karşılaştırmak zordur; ikisini yıllık bileşik orana çevirdiğinizde hangisinin daha hızlı büyüdüğü açıkça görünür.",
        "Bu örneği hesaplayalım: 3 yılda %60 büyüme için CAGR = 1,60<sup>1/3</sup> − 1 ≈ %16,96, 5 yılda %90 büyüme için CAGR = 1,90<sup>1/5</sup> − 1 ≈ %13,70 çıkar. Toplam artışı daha büyük olan ikinci iş, aslında yıllık bazda daha yavaş büyümüştür. Toplam yüzdeye bakarak verilen kararlar bu yüzden sık sık yanıltır; süre farklıysa her zaman yıllık bileşik orana çevirerek karşılaştırın."
      ]
    },
    {
      h: "CAGR formülü ve terimlerin anlamı",
      formula: "CAGR = (BD ÷ BşD)^(1 ÷ n) − 1\nBD: bitiş değeri · BşD: başlangıç değeri · n: yıl sayısı\nTers formül: BD = BşD × (1 + CAGR)^n",
      p: [
        "Formülün mantığı basittir. Önce bitiş değerini başlangıç değerine bölerek toplam büyüme katsayısını bulursunuz. Ardından bu katsayının n'inci kökünü alırsınız; çünkü n yıl boyunca aynı oranla çarpıldığında bu katsayıya ulaşan yıllık çarpanı arıyorsunuz. Son olarak 1 çıkarıp yüzdeye çevirirsiniz.",
        "En sık yapılan hata n'yi yanlış saymaktır. 2021 sonundan 2025 sonuna kadar beş yıllık veri vardır ama aradaki süre dört yıldır. Formüldeki n, değer sayısı değil, iki uç arasındaki dönem sayısıdır. Aylık verilerle çalışıyorsanız süreyi yıl cinsinden yazın: 30 ay için n = 2,5."
      ]
    },
    {
      h: "Adım adım çözümlü örnek: şirket satışları",
      p: [
        "Bir şirketin yıllık satışları şöyle olsun: 2021'de 2.000.000 TL, 2022'de 2.300.000 TL, 2023'te 2.900.000 TL, 2024'te 2.700.000 TL ve 2025'te 3.500.000 TL. Dört yıllık CAGR'ı hesaplayalım."
      ],
      ol: [
        "Büyüme katsayısı: 3.500.000 ÷ 2.000.000 = 1,75. Yani satışlar dört yılda 1,75 katına, toplamda %75 artmış.",
        "Yıl sayısı: 2025 − 2021 = 4, dolayısıyla üs 1 ÷ 4 = 0,25.",
        "Kök alma: 1,75<sup>0,25</sup> = 1,1502. Bunu iki kez karekök alarak da bulabilirsiniz: √1,75 = 1,3229 ve √1,3229 = 1,1502.",
        "Sonuç: 1,1502 − 1 = 0,1502, yani <strong>CAGR ≈ %15,02</strong>.",
        "Kontrol: 2.000.000 × 1,1502<sup>4</sup> ≈ 3.500.000 TL. Ters formül başlangıç noktasından bitişe ulaştığına göre hesap doğrudur."
      ],
      after: [
        "Aynı şirketin yıllık yüzde değişimleri sırasıyla +%15,0, +%26,1, −%6,9 ve +%29,6'dır. Bunların aritmetik ortalaması %15,95 eder ve CAGR'dan yaklaşık bir puan yüksektir. Yıllık değişimleri tek tek görmek için [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracını, CAGR'ı doğrudan bulmak için [[arac:yillik-bilesik-buyume-hesapla|Yıllık Bileşik Büyüme Oranı (CAGR) Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "CAGR ile ortalama büyüme oranı ve yüzde değişim farkı",
      p: [
        "Üç kavram sık karıştırılır. <strong>Yüzde değişim</strong> iki nokta arasındaki toplam farkı verir: 2 milyondan 3,5 milyona çıkış %75'tir. <strong>Basit (aritmetik) ortalama</strong> ya toplam değişimi yıl sayısına böler (%75 ÷ 4 = %18,75) ya da yıllık oranların ortalamasını alır (%15,95). <strong>CAGR</strong> ise bileşik etkiyi hesaba katan tek ortalamadır.",
        "Aritmetik ortalama neden yanıltır? Bir yatırım bir yıl %50 kazanıp ertesi yıl %50 kaybetsin. Ortalama getiri (50 − 50) ÷ 2 = %0 görünür, ama 100 TL önce 150 TL'ye çıkıp sonra 75 TL'ye düşmüştür. Gerçekte %25 zarar vardır ve iki yıllık CAGR (75 ÷ 100)<sup>1/2</sup> − 1 = −%13,4'tür."
      ],
      table: {
        head: ["Ölçü", "Nasıl hesaplanır", "Örnek sonuç", "Ne zaman kullanılır"],
        rows: [
          ["Toplam yüzde değişim", "(BD − BşD) ÷ BşD", "%75", "Dönemin tamamındaki artışı söylerken"],
          ["Basit yıllık ortalama", "Toplam değişim ÷ n", "%18,75", "Kaba tahmin; bileşik etkiyi yok sayar"],
          ["Yıllık oranların ortalaması", "Yıllık yüzdelerin toplamı ÷ n", "%15,95", "Tipik bir yılı anlatmak için"],
          ["CAGR", "(BD ÷ BşD)^(1/n) − 1", "%15,02", "Farklı süreleri ve yatırımları karşılaştırmak için"]
        ],
        caption: "Tablodaki sonuçlar yukarıdaki şirket örneğine (2.000.000 TL → 3.500.000 TL, 4 yıl) aittir."
      }
    },
    {
      h: "Excel ve Google E-Tablolar'da CAGR formülü",
      p: [
        "Başlangıç değeri A2 hücresinde, bitiş değeri B2 hücresinde, yıl sayısı C2 hücresinde olsun. Türkçe Excel ve Türkçe E-Tablolar'da bağımsız değişken ayırıcısı noktalı virgüldür."
      ],
      formula: "Üs işleciyle:      =(B2/A2)^(1/C2)-1\nTürkçe işlevle:    =KUVVET(B2/A2;1/C2)-1\nYıllar hücredeyse: =(B2/A2)^(1/(D2-C2))-1   (C2: başlangıç yılı, D2: bitiş yılı)",
      after: [
        "Sonucu yüzde biçimine çevirmek için hücreyi seçip yüzde biçimini uygulayın; 0,1502 değeri %15,02 olarak görünür. Satırlarınızda yıl yerine ay varsa üssü 12 ÷ ay sayısı olarak yazın. Başlangıç değeri sıfır ya da negatifse CAGR tanımsızdır; formül hata verir, bu bir yazım hatası değil, matematiksel bir sınırdır."
      ]
    },
    {
      h: "Satış büyümesi CAGR ile nasıl raporlanır?",
      p: [
        "Şirket sunumlarında ve sektör raporlarında CAGR genellikle \"2021–2025 döneminde satışlar yıllık ortalama %15 bileşik büyüdü\" şeklinde yazılır. Dönemin başlangıç ve bitiş yılını mutlaka belirtin; aynı şirketin 2020–2025 CAGR'ı ile 2021–2025 CAGR'ı başlangıç yılının güçlü ya da zayıf olmasına göre çok farklı çıkabilir.",
        "Türkiye gibi enflasyonun yüksek olduğu ekonomilerde nominal CAGR tek başına yanıltıcıdır. Satışlarınız yıllık %40 büyürken fiyatlar %30 artıyorsa reel büyüme (1,40 ÷ 1,30) − 1 = yaklaşık %7,7'dir. Raporlarda nominal ve reel CAGR'ı birlikte vermek daha dürüst bir tablo çizer. Reel getiri mantığı için [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz nedir]] ve [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazılarına bakabilirsiniz."
      ]
    },
    {
      h: "CAGR neden dalgalanmaları gizler?",
      p: [
        "CAGR yalnızca iki uç noktayı kullanır. Aradaki yıllarda değerin ne kadar inip çıktığı formüle hiç girmez. Yukarıdaki örnekte 2024'teki %6,9'luk düşüş CAGR'da görünmez. Daha uç bir örnekte bir fon ilk yıl %60 düşüp sonraki yıllarda toparlanabilir; başlangıç ve bitiş aynı kaldığı sürece CAGR değişmez.",
        "Bu nedenle CAGR'ı tek başına bir risk göstergesi olarak kullanmayın. Yatırım karşılaştırmalarında en kötü yıl, en büyük düşüş ve yıllık getirilerin standart sapması gibi ölçüler CAGR'ın yanında verilmelidir. Dağılımı ölçmek için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma nasıl hesaplanır]] yazısı faydalı olur.",
        "Başlangıç yılının seçimi de sonucu manipüle edebilir. Bir kriz yılını başlangıç almak CAGR'ı şişirir, zirve yılını başlangıç almak ise düşürür. Raporlarda birden çok dönem için CAGR vermek bu etkiyi dengeler."
      ]
    },
    {
      h: "Bileşik faiz ile CAGR ilişkisi ve ikiye katlanma süresi",
      p: [
        "CAGR ile bileşik faiz aynı denklemin iki yönüdür. Bileşik faizde oranı bilir, bitiş değerini ararsınız: 100.000 TL yıllık %15 bileşik faizle 4 yılda 100.000 × 1,15<sup>4</sup> ≈ 174.901 TL olur. CAGR'da ise başlangıç ve bitişi bilir, oranı ararsınız. Bileşik faizin ayrıntıları için [[bilgi:bilesik-faiz-nedir|bileşik faiz nedir]] yazısına, ileriye dönük hesaplar için [[arac:bilesik-faiz-hesapla|Bileşik Faiz Hesaplama]] aracına bakabilirsiniz.",
        "CAGR'dan bir değerin kaç yılda ikiye katlanacağını da bulabilirsiniz: süre = ln 2 ÷ ln(1 + CAGR). %15,02 CAGR için bu yaklaşık 4,95 yıldır. Hızlı bir zihinden hesap için 72 kuralı kullanılır: 72 ÷ 15 = 4,8 yıl. Ayrıntısı [[bilgi:72-kurali-nedir|72 kuralı nedir]] yazısında."
      ]
    },
    {
      h: "CAGR hesabında sık yapılan hatalar",
      ul: [
        "<strong>Yıl sayısını yanlış almak:</strong> Beş değerlik seride süre dört yıldır.",
        "<strong>Toplam değişimi yıla bölmek:</strong> %75 ÷ 4 = %18,75 bileşik etkiyi yok sayar ve büyümeyi abartır.",
        "<strong>Negatif ya da sıfır başlangıç kullanmak:</strong> Zarardan kâra geçen şirketin kâr CAGR'ı hesaplanamaz.",
        "<strong>Ara nakit akışlarını görmezden gelmek:</strong> Yatırım hesabına dönem içinde para eklediyseniz CAGR getiriyi olduğundan yüksek gösterir; böyle durumlarda iç verim oranı daha uygundur.",
        "<strong>Nominal ile reeli karıştırmak:</strong> Yüksek enflasyonda nominal CAGR gerçek büyümeyi göstermez.",
        "<strong>Geçmiş CAGR'ı geleceğe taşımak:</strong> Geçmiş büyüme hızı gelecekte süreceğinin garantisi değildir."
      ]
    },
    {
      h: "CAGR hesaplama aracını kullanma adımları",
      ol: [
        "[[arac:yillik-bilesik-buyume-hesapla|CAGR Hesaplama]] sayfasında başlangıç değerini yazın; sıfırdan büyük olmalıdır.",
        "Bitiş değerini ve aradaki süreyi yıl cinsinden girin; 18 ay için 1,5 yazabilirsiniz.",
        "Sonuçta CAGR'ı, toplam büyümeyi, büyüme katsayısını, mutlak değişimi ve basit yıllık ortalamayı birlikte görürsünüz.",
        "CAGR pozitifse araç bu hızla değerin kaç yılda ikiye katlanacağını da gösterir."
      ],
      after: [
        "Hesap tamamen tarayıcınızda yapılır; girdiğiniz şirket ya da portföy verileri hiçbir sunucuya gönderilmez."
      ]
    }
  ],
  faq: [
    ["CAGR nedir?", "CAGR, yıllık bileşik büyüme oranıdır. Bir değerin başlangıçtan bitişe her yıl aynı oranda büyüdüğü varsayılırsa yıllık kaç yüzde büyümesi gerektiğini gösterir ve farklı süreleri karşılaştırmayı kolaylaştırır."],
    ["CAGR nasıl hesaplanır?", "Bitiş değerini başlangıç değerine bölün, sonucun yıl sayısı kadar kökünü alın ve 1 çıkarın. 2 milyondan 3,5 milyona 4 yılda çıkan satış için 1,75 üzeri 0,25 eksi 1, yani yaklaşık %15,02 bulunur."],
    ["CAGR ile ortalama büyüme oranı farkı nedir?", "Aritmetik ortalama yıllık oranları toplayıp böler ve bileşik etkiyi yok sayar; bu yüzden genellikle daha yüksek çıkar. CAGR ise başlangıçtan bitişe gerçekten ulaşan tek sabit yıllık oranı verir."],
    ["Excel'de CAGR formülü nasıl yazılır?", "Başlangıç A2, bitiş B2, yıl sayısı C2 hücresindeyse =(B2/A2)^(1/C2)-1 yazın. Türkçe Excel'de aynı hesabı =KUVVET(B2/A2;1/C2)-1 ile de yapabilir, hücreyi yüzde biçimine çevirebilirsiniz."],
    ["Satış büyümesi CAGR ile nasıl raporlanır?", "Dönemin başlangıç ve bitiş yılı belirtilerek yıllık ortalama bileşik büyüme olarak yazılır. Enflasyon yüksekse nominal CAGR'ın yanında enflasyondan arındırılmış reel CAGR'ı da vermek daha doğru bir tablo sunar."],
    ["CAGR neden dalgalanmaları gizler?", "Formül yalnızca başlangıç ve bitiş değerini kullanır, aradaki yılları hesaba katmaz. Değer arada çok düşüp toparlansa bile uç noktalar aynıysa CAGR değişmez; bu yüzden risk ölçüleriyle birlikte okunmalıdır."],
    ["Yüzde değişim ve CAGR farkı nedir?", "Yüzde değişim tüm dönemdeki toplam artıştır, örneğin %75. CAGR bu toplam artışı yıllara bileşik olarak dağıtır ve aynı örnekte yaklaşık %15,02 verir. Biri toplam, diğeri yıllık ortalama hızdır."],
    ["Bileşik faiz ile CAGR ilişkisi nedir?", "İkisi aynı formülün iki yönüdür. Bileşik faizde oran bilinir, bitiş değeri hesaplanır; CAGR'da başlangıç ve bitiş bilinir, oran hesaplanır. Bitiş = başlangıç × (1 + CAGR) üzeri yıl sayısıdır."],
    ["Negatif CAGR ne anlama gelir?", "Bitiş değerinin başlangıçtan düşük olduğunu, yani dönem boyunca ortalama yıllık küçülme yaşandığını gösterir. Örneğin 100'den 3 yılda 90'a inen bir değer için CAGR yaklaşık eksi %3,45'tir."]
  ],
  tools: ["yillik-bilesik-buyume-hesapla", "yuzde-degisim-hesapla", "bilesik-faiz-hesapla"],
  related: ["bilesik-faiz-nedir", "72-kurali-nedir", "reel-faiz-nedir-nasil-hesaplanir", "net-bugunku-deger-ve-ic-verim-orani"],
  sources: [
    ["Türkiye Cumhuriyet Merkez Bankası – Enflasyon verileri", "https://www.tcmb.gov.tr/"],
    ["Türkiye İstatistik Kurumu – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; geçmiş büyüme gelecekteki sonuçların garantisi değildir"
};
