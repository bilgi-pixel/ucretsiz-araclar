export default {
  slug: "72-kurali-nedir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "72 Kuralı Nedir? Paranın Kaç Yılda İki Katına Çıkacağı Nasıl Hesaplanır",
  pageTitle: "72 Kuralı Nedir? Param Kaç Yılda İki Katına Çıkar?",
  description: "72 kuralı: 72'yi yıllık getiri oranına bölün, paranın kaç yılda ikiye katlanacağını bulun. Kesin formül, yüksek faizde sapma, enflasyon, 114 ve 144 kuralları.",
  keywords: ["72 kuralı nedir", "para kaç yılda ikiye katlanır", "72 kuralı formülü", "paranın iki katına çıkma süresi", "114 kuralı", "144 kuralı", "yatırım ikiye katlanma süresi", "enflasyon parayı kaç yılda yarıya indirir"],
  lead: "72 kuralı, <strong>72 sayısını yıllık bileşik getiri oranına (yüzde olarak) bölerek</strong> paranın yaklaşık kaç yılda iki katına çıkacağını bulan pratik bir kestirmedir: yıllık %8 getiride 72 ÷ 8 = 9 yıl. Kural bileşik faize dayanır ve %6–%10 arası oranlarda neredeyse kesin sonuç verir; oran yükseldikçe süreyi olduğundan kısa gösterir. Bu yazıda kesin formülü, Türkiye'deki yüksek faiz ve enflasyon ortamında kuralın nasıl düzeltileceğini, paranın değerinin kaç yılda yarıya ineceğini ve 114, 144 kurallarını örneklerle anlatıyoruz.",
  kisaCevap: [
    "72 kuralı: ikiye katlanma süresi (yıl) ≈ 72 ÷ yıllık getiri oranı (%).",
    "Kesin formül: n = ln 2 ÷ ln(1 + r); %8 için kesin sonuç 9,01 yıldır, kural 9 yıl verir.",
    "Kural %6–%10 aralığında %1'den az sapar; %40 getiride 1,80 yıl der, kesin süre 2,06 yıldır.",
    "Yüksek oranlarda düzeltme: 8'in üzerindeki her 3 puan için 72'ye 1 ekleyin; %40'ta (72 + 10,7) ÷ 40 ≈ 2,07 yıl.",
    "Enflasyon için de çalışır: yıllık %30 enflasyonda paranın alım gücü yaklaşık 2,4 yılda (kesin 2,64 yıl) yarıya iner.",
    "114 kuralı üç katına, 144 kuralı dört katına çıkma süresini verir: %8'de 14,25 ve 18 yıl."
  ],
  figure: {
    alt: "72 kuralı ile kesin ikiye katlanma süresinin karşılaştırması: yüzde 6'da 12 ve 11,90 yıl, yüzde 10'da 7,20 ve 7,27 yıl, yüzde 20'de 3,60 ve 3,80 yıl, yüzde 40'ta 1,80 ve 2,06 yıl.",
    caption: "Düşük ve orta oranlarda 72 kuralı kesin sonuca çok yakındır. Oran yükseldikçe kural ikiye katlanma süresini olduğundan kısa gösterir; %40'ta sapma yaklaşık %13'tür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">72 kuralı mı, kesin formül mü?</text>
  <rect x="440" y="48" width="18" height="14" class="p"/><text x="466" y="60" class="sm">72 ÷ oran</text>
  <rect x="560" y="48" width="18" height="14" class="oks"/><text x="586" y="60" class="sm">kesin: ln2 ÷ ln(1+r)</text>
  <line x1="60" y1="340" x2="700" y2="340" class="sb" fill="none"/>
  <text x="20" y="100" class="sm mu">yıl</text>
  <g class="sm mid">
    <rect x="90" y="100" width="56" height="240" class="p"/><text x="118" y="92" class="b">12,00</text>
    <rect x="150" y="102" width="56" height="238" class="oks"/><text x="178" y="92" class="b ok">11,90</text>
    <text x="148" y="362" class="b">%6</text>
    <rect x="250" y="196" width="56" height="144" class="p"/><text x="278" y="188" class="b">7,20</text>
    <rect x="310" y="195" width="56" height="145" class="oks"/><text x="338" y="188" class="b ok">7,27</text>
    <text x="308" y="362" class="b">%10</text>
    <rect x="410" y="268" width="56" height="72" class="p"/><text x="438" y="260" class="b">3,60</text>
    <rect x="470" y="264" width="56" height="76" class="oks"/><text x="498" y="256" class="b ok">3,80</text>
    <text x="468" y="362" class="b">%20</text>
    <rect x="570" y="304" width="56" height="36" class="p"/><text x="598" y="296" class="b">1,80</text>
    <rect x="630" y="299" width="56" height="41" class="oks"/><text x="658" y="291" class="b ok">2,06</text>
    <text x="628" y="362" class="b">%40</text>
  </g>
  <rect x="60" y="378" width="640" height="34" rx="8" class="sf sb"/>
  <text x="380" y="400" class="sm mid t2">Sapma: %6'da +%0,9 · %10'da −%1 · %20'de −%5 · %40'ta −%13</text>
</svg>`
  },
  sections: [
    {
      h: "72 kuralı nedir, ne işe yarar?",
      p: [
        "72 kuralı, bileşik getiriyle büyüyen bir paranın ya da herhangi bir büyüklüğün kaç dönemde iki katına çıkacağını hesap makinesi kullanmadan tahmin etmeye yarayan bir zihinden hesap yöntemidir. Yatırımcıların, bankacıların ve finans öğrencilerinin en çok kullandığı kestirmelerden biridir; kökeni 15. yüzyıl İtalyan matematik kitaplarına kadar uzanır.",
        "Kuralın gücü sadeliğindedir. Bir mevduat, fon ya da yatırım teklifi gördüğünüzde yıllık getiriyi 72'ye bölerek paranızın ne kadar sürede ikiye katlanacağını saniyeler içinde görebilirsiniz. Aynı mantıkla bir borcun, enflasyonun ya da nüfusun ne kadar hızlı büyüdüğünü de yorumlayabilirsiniz.",
        "Kural yalnızca <strong>bileşik</strong> büyüme için geçerlidir; yani getirinin her dönem ana paraya eklenip bir sonraki dönem onunla birlikte yeniden getiri ürettiği durumlar için. Basit faizde paranın ikiye katlanma süresi 100 ÷ oran ile bulunur ve daha uzundur."
      ]
    },
    {
      h: "72 kuralı formülü ve kesin hesap",
      p: [
        "Bileşik büyümede P ana paranın n yıl sonra 2P olması için (1 + r)<sup>n</sup> = 2 eşitliği sağlanmalıdır. Her iki tarafın doğal logaritması alınarak kesin süre bulunur. Küçük oranlarda ln(1 + r) yaklaşık r'ye eşit olduğundan sonuç 0,693 ÷ r'ye, yani yüzde cinsinden 69,3 ÷ oran'a yaklaşır."
      ],
      formula: "Kesin süre: n = ln 2 ÷ ln(1 + r)\n72 kuralı: n ≈ 72 ÷ (oran %)\nSürekli bileşik faiz için: n = 69,3 ÷ (oran %)",
      after: [
        "Peki neden 69,3 değil de 72? İki nedeni var. Birincisi, 72'nin 2, 3, 4, 6, 8, 9 ve 12'ye tam bölünmesi zihinden hesabı kolaylaştırır. İkincisi, yıllık bileşik faizde ln(1 + r) değeri r'den biraz küçüktür; bu fark 69,3'ü yukarı çeker ve %8 civarında en iyi sonucu veren pay 72 olur. Kesin sonucu görmek için [[arac:72-kurali-hesapla|72 Kuralı Hesaplama]] aracı kuralı ve kesin formülü yan yana gösterir."
      ]
    },
    {
      h: "72 kuralı ne kadar doğru? Oranlara göre sapma tablosu",
      table: {
        head: ["Yıllık getiri", "72 kuralı (yıl)", "Kesin süre (yıl)", "Sapma"],
        rows: [
          ["%2", "36,00", "35,00", "+%2,8"],
          ["%4", "18,00", "17,67", "+%1,9"],
          ["%6", "12,00", "11,90", "+%0,9"],
          ["%8", "9,00", "9,01", "−%0,1"],
          ["%10", "7,20", "7,27", "−%1,0"],
          ["%12", "6,00", "6,12", "−%1,9"],
          ["%20", "3,60", "3,80", "−%5,3"],
          ["%30", "2,40", "2,64", "−%9,2"],
          ["%40", "1,80", "2,06", "−%12,6"],
          ["%50", "1,44", "1,71", "−%15,8"]
        ],
        caption: "Kesin süre n = ln 2 ÷ ln(1 + r) ile hesaplanmıştır. Artı işareti kuralın süreyi uzun, eksi işareti kısa gösterdiğini belirtir."
      },
      after: [
        "Tablo, kuralın %4–%12 aralığında yatırım kararı için yeterince isabetli olduğunu gösterir. Türkiye'de sık görülen %30 ve üzeri nominal oranlarda ise kural ikiye katlanma süresini belirgin biçimde kısa gösterir; bu durumda aşağıdaki düzeltmeyi kullanın ya da doğrudan kesin formüle başvurun."
      ]
    },
    {
      h: "Yüksek faizde 72 kuralı nasıl düzeltilir?",
      p: [
        "Yüksek oranlarda kullanılan pratik düzeltme şudur: 8'in üzerindeki her 3 puan için paya 1 ekleyin. Bu, kuralı yaklaşık 72 + (oran − 8) ÷ 3 biçimine getirir."
      ],
      formula: "Düzeltilmiş kural: n ≈ [72 + (oran − 8) ÷ 3] ÷ oran",
      ol: [
        "Yıllık %40 getiri için: (40 − 8) ÷ 3 = 10,67.",
        "Düzeltilmiş pay: 72 + 10,67 = 82,67.",
        "Süre: 82,67 ÷ 40 = 2,07 yıl. Kesin süre 2,06 yıldır; düzeltme sapmayı %13'ten %1'in altına indirir.",
        "Aynı yöntem %30 için (72 + 7,33) ÷ 30 = 2,64 yıl, %50 için (72 + 14) ÷ 50 = 1,72 yıl verir; ikisi de kesin sonuca çok yakındır."
      ]
    },
    {
      h: "Çözümlü örnekler: param kaç yılda iki katına çıkar?",
      ul: [
        "<strong>Yıllık %8 getirili fon:</strong> 72 ÷ 8 = 9 yıl. 100.000 TL, 9 yıl sonunda 100.000 × 1,08<sup>9</sup> = 199.900 TL olur; kural neredeyse kusursuzdur.",
        "<strong>Yıllık %12 getiri:</strong> 72 ÷ 12 = 6 yıl; kesin süre 6,12 yıl.",
        "<strong>İkiye katlamak için gereken oran:</strong> Kural ters yönde de çalışır. Paranızı 5 yılda ikiye katlamak istiyorsanız 72 ÷ 5 = %14,4 yıllık bileşik getiri gerekir.",
        "<strong>Aylık getiri:</strong> Dönem aylıksa sonuç da ay cinsindendir. Aylık %3 bileşik getiride para 72 ÷ 3 = 24 ayda, kesin olarak yaklaşık 23,4 ayda ikiye katlanır."
      ],
      after: [
        "Paranın yıl yıl nasıl büyüdüğünü tablo hâlinde görmek için [[arac:bilesik-faiz-hesapla|Bileşik Faiz Hesaplama]] aracını, düzenli katkılarla birlikte bir hedefe ulaşma süresini bulmak için [[arac:hedef-birikim-suresi-hesapla|Hedef Birikim Süresi Hesaplama]] aracını kullanabilirsiniz. Bileşik getirinin mantığı [[bilgi:bilesik-faiz-nedir|bileşik faiz nedir]] yazımızda ayrıntılı anlatılıyor."
      ]
    },
    {
      h: "Enflasyon paranızı kaç yılda yarıya indirir?",
      p: [
        "72 kuralı yalnızca büyümeyi değil, aşınmayı da ölçer. Fiyatlar yıllık %r arttığında paranızın alım gücü, fiyatların ikiye katlandığı sürede yarıya iner. Bu süre de 72 ÷ enflasyon oranı ile tahmin edilir.",
        "Örneğin yıllık %30 enflasyonda fiyatlar 72 ÷ 30 = 2,4 yılda, kesin olarak 2,64 yılda ikiye katlanır. Yani yastık altında tutulan 100.000 TL bu sürenin sonunda bugünkü 50.000 TL'nin alabileceği kadar mal alabilir. Yıllık %10 enflasyonda bu süre yaklaşık 7,3 yıla uzar.",
        "Yatırım getirisini değerlendirirken nominal değil <strong>reel</strong> getiriyi kullanmak daha doğrudur. Reel getiri (1 + nominal) ÷ (1 + enflasyon) − 1 ile bulunur. %45 nominal faiz ve %30 enflasyonda reel getiri 1,45 ÷ 1,30 − 1 = %11,5'tir; paranızın alım gücü 72 ÷ 11,5 ≈ 6,3 yılda ikiye katlanır. Alım gücü hesabının ayrıntısı için [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "114 ve 144 kuralı: üç ve dört katına çıkma süresi",
      p: [
        "Aynı mantık farklı katlar için de kurulabilir. Paranın üç katına çıkması için ln 3 ≈ 1,0986, dört katına çıkması için ln 4 ≈ 1,386 gerekir. Pratikte bu değerlere karşılık gelen paylar 114 ve 144 olarak kullanılır."
      ],
      table: {
        head: ["Kural", "Ne hesaplar?", "%8 getiride", "Kesin süre"],
        rows: [
          ["72 kuralı", "İki katına çıkma", "9,00 yıl", "9,01 yıl"],
          ["114 kuralı", "Üç katına çıkma", "14,25 yıl", "14,27 yıl"],
          ["144 kuralı", "Dört katına çıkma", "18,00 yıl", "18,01 yıl"]
        ]
      },
      after: [
        "144 kuralının sonucu 72 kuralının iki katıdır; bu da mantıklıdır, çünkü iki katına iki kez çıkan para dört katına ulaşır. Uzun vadeli hedefleri görselleştirmek için [[arac:gelecek-deger-hesapla|Gelecek Değer Hesaplama]] aracı birikiminizin belirli bir süre sonraki değerini gösterir."
      ]
    },
    {
      h: "72 kuralını kullanırken dikkat edilecekler",
      ul: [
        "<strong>Vergi ve masraflar:</strong> Stopaj, fon yönetim ücreti ve komisyon getiriyi düşürür; kurala net getiriyi koyun.",
        "<strong>Sabit oran varsayımı:</strong> Kural her yıl aynı getiriyi varsayar. Hisse ve fon gibi dalgalı yatırımlarda sonuç yalnızca ortalama bir fikir verir.",
        "<strong>Basit faiz:</strong> Getiri ana paraya eklenmiyorsa ikiye katlanma süresi 100 ÷ oran'dır.",
        "<strong>Yüksek oranlar:</strong> %20'nin üzerinde düzeltilmiş kuralı ya da kesin formülü kullanın.",
        "<strong>Dönem uyumu:</strong> Aylık oranla hesaplarsanız sonuç ay, yıllık oranla hesaplarsanız yıl çıkar."
      ]
    }
  ],
  faq: [
    ["72 kuralı nedir?", "72 kuralı, 72 sayısını yıllık bileşik getiri oranına bölerek paranın yaklaşık kaç yılda iki katına çıkacağını bulan pratik bir kestirmedir. Örneğin yüzde 9 getiride para 72 bölü 9 eşittir yaklaşık 8 yılda ikiye katlanır."],
    ["Param kaç yılda iki katına çıkar?", "Yıllık net getiri oranınızı 72'ye bölün. Yüzde 6 getiride yaklaşık 12 yıl, yüzde 12 getiride 6 yıl, yüzde 24 getiride 3 yıl sürer. Yüksek oranlarda kesin süre kuralın verdiğinden biraz uzundur."],
    ["72 kuralı nasıl hesaplanır?", "Yıllık getiri oranını yüzde olarak yazıp 72'yi bu sayıya bölersiniz; sonuç yıl cinsinden ikiye katlanma süresidir. Tersine, hedef süreyi 72'ye bölerseniz o sürede ikiye katlanmak için gereken yıllık getiri oranını bulursunuz."],
    ["72 kuralı ne kadar doğru sonuç verir?", "Yüzde 6 ile yüzde 10 arasındaki oranlarda sapma yüzde birin altındadır. Oran yükseldikçe kural süreyi kısa gösterir: yüzde 20'de yaklaşık yüzde 5, yüzde 40'ta yaklaşık yüzde 13 sapar. Kesin sonuç için ln 2 bölü ln(1+r) kullanılır."],
    ["Enflasyon paramı kaç yılda yarıya indirir?", "72'yi yıllık enflasyon oranına bölerek tahmin edebilirsiniz. Yüzde 30 enflasyonda alım gücü yaklaşık 2,4 yılda, kesin hesapla 2,64 yılda yarıya iner. Yüzde 10 enflasyonda bu süre yaklaşık 7,3 yıldır."],
    ["114 ve 144 kuralı nedir?", "114 kuralı paranın üç katına, 144 kuralı dört katına çıkma süresini verir. Yüzde 8 getiride para yaklaşık 114 bölü 8 eşittir 14,25 yılda üç katına, 144 bölü 8 eşittir 18 yılda dört katına ulaşır."],
    ["72 kuralı bileşik faize mi dayanır?", "Evet. Kural, getirinin her dönem ana paraya eklenerek yeniden getiri ürettiği bileşik büyüme için türetilmiştir. Basit faizde para ikiye katlanma süresi 100 bölü yıllık oran formülüyle bulunur ve 72 kuralının verdiğinden uzundur."],
    ["Yüksek faizde 72 kuralı sapar mı?", "Evet, yüzde 20'nin üzerindeki oranlarda kural ikiye katlanma süresini belirgin biçimde kısa gösterir. Sekizin üzerindeki her üç puan için 72'ye bir ekleyerek düzeltebilirsiniz; yüzde 40'ta bu yöntem 2,07 yıl verir, kesin süre 2,06 yıldır."],
    ["Neden 70 ya da 69 kuralı da kullanılıyor?", "Sürekli bileşik faizde kesin pay 69,3'tür; bu yüzden düşük oranlar ve sürekli bileşim için 69 veya 70 daha isabetlidir. 72 ise yıllık bileşimde yüzde 8 civarında en iyi sonucu verir ve daha çok sayıya tam bölündüğü için tercih edilir."]
  ],
  tools: ["72-kurali-hesapla", "bilesik-faiz-hesapla", "gelecek-deger-hesapla", "hedef-birikim-suresi-hesapla"],
  related: ["bilesik-faiz-nedir", "enflasyona-gore-paranin-degeri", "temettu-verimi-nedir"],
  sources: [
    ["TCMB – Enflasyon ve faiz istatistikleri", "https://www.tcmb.gov.tr/"],
    ["TÜİK – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, kararlarınız için lisanslı bir danışmana başvurun"
};
