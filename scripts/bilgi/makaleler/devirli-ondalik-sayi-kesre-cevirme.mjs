export default {
  slug: "devirli-ondalik-sayi-kesre-cevirme",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Devirli Ondalık Sayı Kesre Nasıl Çevrilir? Kural ve Örnekler",
  pageTitle: "Devirli Ondalık Sayı Kesre Çevirme: Kural ve Çözümlü Örnekler",
  description: "Devirli sayı kesre çevrilirken pay sayının tamamı eksi devretmeyen kısım, payda devreden basamak kadar 9 ve devretmeyen kadar 0'dır. 0,3 devirli 1/3, 0,9 devirli 1.",
  keywords: ["devirli ondalık sayı kesre çevirme", "devirli sayı nedir", "0,333 kesir olarak", "ondalık sayıyı kesre çevirme", "yüzdeyi kesre çevirme", "0,9 devirli neden 1", "rasyonel sayılar", "devirli sayı kuralı"],
  lead: "Devirli ondalık sayıyı kesre çevirmek için <strong>pay</strong>a virgülsüz yazılmış sayının tamamından devretmeyen kısmı çıkarırsınız; <strong>payda</strong>ya devreden her basamak için bir 9, virgülden sonra devretmeyen her basamak için bir 0 yazarsınız. Bu kuralla 0,333… = 3/9 = 1/3, 0,1666… = 15/90 = 1/6 olur. Bu sayfada kuralın nereden geldiğini cebirsel yöntemle gösteriyor, 0,999…'un neden tam 1'e eşit olduğunu açıklıyor, sonlu ondalık sayıların ve yüzdelerin kesre çevrilmesini ve sonucun nasıl sadeleştirileceğini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Devirli ondalık sayı, virgülden sonra bir ya da birkaç basamağı sonsuza kadar aynı sırayla tekrar eden sayıdır: 0,333… ya da 0,1212…",
    "Kural: pay = sayının virgülsüz tamamı − devretmeyen kısım; payda = devreden basamak sayısı kadar 9, ardından devretmeyen ondalık basamak sayısı kadar 0.",
    "0,(3) = 3/9 = 1/3 · 0,(12) = 12/99 = 4/33 · 0,1(6) = (16 − 1)/90 = 1/6.",
    "0,(9) = 9/9 = 1'dir; 0,999… ile 1 aynı sayının iki farklı yazılışıdır.",
    "Sonlu ondalık sayı, basamak sayısı kadar sıfırlı paydaya yazılır: 0,75 = 75/100 = 3/4.",
    "Sadeleşmiş bir kesrin paydasında 2 ve 5 dışında asal çarpan varsa ondalık açılımı devirlidir."
  ],
  figure: {
    alt: "Devirli sayıyı kesre çevirme kuralı: 2,35 devirli 5 örneğinde pay 235 eksi 23, payda bir dokuz ve bir sıfırdan oluşan 90; sonuç 212 bölü 90, sadeleşince 106 bölü 45.",
    caption: "2,3(5) sayısında devreden basamak 5 (bir tane), virgülden sonra devretmeyen basamak 3 (bir tane). Pay 235 − 23 = 212, payda 90 olur; 2'ye sadeleşince 106/45 elde edilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kural kartı: 2,3555… kesre nasıl çevrilir?</text>
  <rect x="200" y="50" width="320" height="76" rx="10" class="sf sb"/>
  <text x="300" y="104" class="xl end">2,3</text>
  <text x="303" y="104" class="xl p">5</text>
  <line x1="302" y1="72" x2="322" y2="72" class="sp sw" fill="none"/>
  <text x="340" y="96" class="sm">= 2,35555…</text>
  <text x="30" y="160" class="sm b">tam kısım</text><text x="30" y="178" class="sm">2</text>
  <rect x="20" y="190" width="210" height="44" rx="8" class="ps"/><text x="125" y="218" class="mid">devretmeyen: <tspan class="b">3</tspan> (1 basamak)</text>
  <rect x="255" y="190" width="210" height="44" rx="8" class="p"/><text x="360" y="218" class="mid sf">devreden: <tspan class="b">5</tspan> (1 basamak)</text>
  <rect x="490" y="190" width="210" height="44" rx="8" class="oks"/><text x="595" y="218" class="mid">payda: <tspan class="b">9</tspan> ve <tspan class="b">0</tspan> → 90</text>
  <rect x="20" y="256" width="680" height="64" rx="10" class="sf sb"/>
  <text x="40" y="282" class="b">Pay</text>
  <text x="40" y="306">tüm sayı virgülsüz 235 − devretmeyen kısım 23 = <tspan class="b p">212</tspan></text>
  <text x="140" y="360" class="xl mid">212</text>
  <line x1="95" y1="370" x2="185" y2="370" class="st sw" fill="none"/>
  <text x="140" y="400" class="xl mid">90</text>
  <text x="240" y="384" class="xl mid">=</text>
  <text x="330" y="360" class="xl mid ok">106</text>
  <line x1="285" y1="370" x2="375" y2="370" class="sok sw" fill="none"/>
  <text x="330" y="400" class="xl mid ok">45</text>
  <text x="420" y="366" class="sm">2'ye sadeleşti</text>
  <text x="420" y="390" class="sm t2">kontrol: 106 ÷ 45 = 2,3555…</text>
</svg>`
  },
  sections: [
    {
      h: "Devirli ondalık sayı nedir?",
      p: [
        "Bir kesri bölme işlemiyle ondalık sayıya çevirdiğinizde iki şey olabilir: bölme bir noktada sıfır kalanla biter ya da kalanlar bir süre sonra kendini tekrar etmeye başlar. İlk durumda <strong>sonlu ondalık sayı</strong> (1/4 = 0,25), ikinci durumda <strong>devirli ondalık sayı</strong> elde edilir (1/3 = 0,333…). Tekrar eden basamak grubuna <strong>devreden kısım</strong> ya da devir denir.",
        "Ders kitaplarında devreden kısım, rakamların üzerine çizilen yatay bir çizgiyle gösterilir. Bu yazıda yazım kolaylığı için devreden kısmı parantez içinde yazıyoruz: 0,(3) = 0,333…, 0,1(6) = 0,1666…, 1,(23) = 1,2323… Parantezin önündeki rakamlar devretmeyen kısımdır.",
        "Devirli ondalık sayılar ve sonlu ondalık sayılar <strong>rasyonel sayıdır</strong>, yani iki tam sayının oranı olarak yazılabilir. π = 3,14159… ya da √2 = 1,41421… gibi basamakları hiç tekrar etmeden sonsuza giden sayılar ise irrasyoneldir ve kesre çevrilemez. Bu konu 7. sınıf rasyonel sayılar ünitesinde ve TYT temel matematikte sıkça karşınıza çıkar."
      ]
    },
    {
      h: "Devirli sayı kesre nasıl çevrilir? Kural",
      p: [
        "Bütün devirli sayılar için tek bir kural yeterlidir. Önce sayıyı üç parçaya ayırın: tam kısım, virgülden sonraki devretmeyen basamaklar ve devreden basamaklar. Sonra pay ve paydayı aşağıdaki gibi kurun."
      ],
      formula: "Pay = (sayının virgülsüz tamamı) − (devretmeyen kısmın virgülsüz hâli)\nPayda = devreden basamak sayısı kadar 9, ardından devretmeyen ondalık basamak sayısı kadar 0\nÖrnek: 0,1(6) → pay 16 − 1 = 15, payda 90 → 15/90 = 1/6",
      ol: [
        "Sayıyı virgülsüz ve devreden kısmı bir kez yazarak okuyun: 2,3(5) → 235.",
        "Devretmeyen kısmı virgülsüz yazın (tam kısım dahil): 23.",
        "Payı bulun: 235 − 23 = 212.",
        "Paydayı kurun: devreden basamak 1 tane → bir 9; virgülden sonra devretmeyen basamak 1 tane → bir 0. Payda 90.",
        "Kesri sadeleştirin: 212/90 = 106/45. Kontrol: 106 ÷ 45 = 2,3555… doğru."
      ],
      after: [
        "Tam kısmı ayrı tutmak isterseniz de aynı sonuca ulaşırsınız: 2,3(5) = 2 + 0,3(5) = 2 + (35 − 3)/90 = 2 + 32/90 = 2 + 16/45 = 106/45. Kuralı uygulamadan sonucu görmek için [[arac:devirli-ondalik-kesir-cevir|Devirli Ondalık Kesir Çevirici]]ye sayıyı ve devreden kısmı yazabilirsiniz."
      ]
    },
    {
      h: "Kural nereden geliyor? Cebirsel yöntem",
      p: [
        "Kuralı ezberlemek istemiyorsanız her soruyu basit bir denklemle çözebilirsiniz. Fikir şudur: sayıyı 10'un uygun kuvvetleriyle çarparak devreden kısımları virgülden sonra aynı hizaya getirir, sonra iki ifadeyi çıkararak sonsuz kuyruğu yok edersiniz."
      ],
      ol: [
        "<strong>x = 0,1666…</strong> diyelim.",
        "Devretmeyen 1 basamağı virgülün soluna geçirmek için 10 ile çarpın: 10x = 1,666…",
        "Bir devir daha ilerletmek için 100 ile çarpın: 100x = 16,666…",
        "İkisini çıkarın: 100x − 10x = 16,666… − 1,666… → 90x = 15.",
        "x = 15/90 = 1/6. Burada 16 − 1 payı ve 100 − 10 = 90 paydası, kuralın kendisidir."
      ],
      after: [
        "Aynı yöntem iki basamaklı devirde 100x − x = 99x, üç basamaklı devirde 1.000x − x = 999x verir; paydadaki 9'ların sayısı buradan gelir. Konunun sonsuz geometrik toplamla ilişkisi [[bilgi:aritmetik-ve-geometrik-dizi-formulleri|diziler]] yazısında anlatılır: 0,(3) = 3/10 + 3/100 + … toplamı a₁ / (1 − r) = (3/10)/(9/10) = 1/3 verir."
      ]
    },
    {
      h: "Çözümlü örnekler tablosu",
      table: {
        head: ["Devirli sayı", "Pay", "Payda", "Kesir", "Sade hâli"],
        rows: [
          ["0,(3)", "3 − 0 = 3", "9", "3/9", "1/3"],
          ["0,(1)", "1 − 0 = 1", "9", "1/9", "1/9"],
          ["0,(6)", "6 − 0 = 6", "9", "6/9", "2/3"],
          ["0,(12)", "12 − 0 = 12", "99", "12/99", "4/33"],
          ["0,(45)", "45 − 0 = 45", "99", "45/99", "5/11"],
          ["0,1(6)", "16 − 1 = 15", "90", "15/90", "1/6"],
          ["0,08(3)", "83 − 8 = 75", "900", "75/900", "1/12"],
          ["0,0(13)", "13 − 0 = 13", "990", "13/990", "13/990"],
          ["1,(23)", "123 − 1 = 122", "99", "122/99", "122/99"],
          ["2,3(5)", "235 − 23 = 212", "90", "212/90", "106/45"],
          ["0,(142857)", "142.857", "999.999", "142.857/999.999", "1/7"]
        ],
        caption: "0,08(3) örneğinde virgülden sonra devretmeyen iki basamak (0 ve 8) olduğu için paydada iki sıfır vardır: 900."
      },
      after: [
        "Son satır güzel bir örnektir: 1/7'nin ondalık açılımı 0,142857142857… diye altı basamaklık bir devirle tekrar eder. Paydası 7 olan bütün kesirler (2/7, 3/7 …) aynı altı rakamı farklı bir yerden başlayarak tekrar eder; örneğin 3/7 = 0,(428571)."
      ]
    },
    {
      h: "0,9 devirli neden 1'e eşittir?",
      p: [
        "Kuralı uyguladığınızda 0,(9) = 9/9 = 1 bulunur. Bu ilk bakışta tuhaf gelir, çünkü 0,999… sanki 1'den \"biraz\" küçük görünür. Oysa iki sayı arasında fark olsaydı bu farkın pozitif bir sayı olması gerekirdi; 0,999…'un basamakları sonsuza kadar sürdüğü için 1'den ne kadar küçük bir sayı seçerseniz seçin 0,999… ondan daha büyüktür. Arada hiçbir sayı kalmaz, yani fark sıfırdır.",
        "Üç kısa gerekçe daha verilebilir. Birincisi: 1/3 = 0,333… olduğunu kabul ediyorsak iki tarafı 3 ile çarpınca 1 = 0,999… olur. İkincisi cebirsel yöntemdir: x = 0,999… ise 10x = 9,999…; çıkarınca 9x = 9 ve x = 1. Üçüncüsü sonsuz geometrik toplamdır: 9/10 + 9/100 + … = (9/10)/(1 − 1/10) = 1.",
        "Aynı nedenle her sonlu ondalık sayının iki yazılışı vardır: 0,25 = 0,24999… ve 3 = 2,999… Pratikte sonlu yazılış tercih edilir."
      ]
    },
    {
      h: "Sonlu ondalık sayı kesre nasıl çevrilir?",
      p: [
        "Sonlu ondalık sayıyı kesre çevirmek daha da kolaydır: virgülü kaldırıp sayıyı paya yazın, paydaya da virgülden sonraki basamak sayısı kadar sıfırı olan 10'un kuvvetini yazın. Sonra sadeleştirin."
      ],
      ul: [
        "<strong>0,75</strong> → iki ondalık basamak → 75/100 → 25'e bölünce <strong>3/4</strong>.",
        "<strong>0,4</strong> → bir ondalık basamak → 4/10 → <strong>2/5</strong>.",
        "<strong>2,125</strong> → üç ondalık basamak → 2.125/1.000 → 125'e bölünce <strong>17/8</strong>.",
        "<strong>0,175</strong> → 175/1.000 → 25'e bölünce <strong>7/40</strong>.",
        "<strong>1,05</strong> → 105/100 → 5'e bölünce <strong>21/20</strong>."
      ],
      after: [
        "Sonlu ondalık sayılar için [[arac:ondalik-kesir-cevir|Ondalık Kesir Çevirici]] aracı sonucu doğrudan sade kesir olarak verir."
      ]
    },
    {
      h: "Her kesir devirli ondalık sayı mı olur?",
      p: [
        "Hayır. Kesri önce sadeleştirin, sonra paydanın asal çarpanlarına bakın. Paydada <strong>yalnızca 2 ve 5</strong> çarpanları varsa ondalık açılım sonludur, çünkü payda 10'un bir kuvvetine tamamlanabilir. Paydada 3, 7, 11 gibi başka bir asal çarpan varsa açılım devirlidir. Asal çarpanlara ayırmayı [[bilgi:asal-sayilar-nedir|asal sayılar]] yazısında bulabilirsiniz."
      ],
      table: {
        head: ["Kesir", "Paydanın çarpanları", "Ondalık açılım", "Tür"],
        rows: [
          ["3/8", "2 × 2 × 2", "0,375", "Sonlu"],
          ["7/20", "2 × 2 × 5", "0,35", "Sonlu"],
          ["1/6", "2 × 3", "0,1(6)", "Devirli (3 çarpanı var)"],
          ["5/11", "11", "0,(45)", "Devirli"],
          ["1/12", "2 × 2 × 3", "0,08(3)", "Devirli"],
          ["9/15", "3 × 5, ama 9/15 = 3/5", "0,6", "Sonlu (sadeleşince payda 5)"]
        ]
      },
      after: [
        "Son satır neden önce sadeleştirmek gerektiğini gösterir: 9/15'in paydasında 3 vardır ama kesir 3/5'e sadeleşince 3 kaybolur ve açılım sonlu çıkar. Bölme işleminde kalan, paydadan küçük değerler arasında dolaştığı için devrin uzunluğu en fazla payda − 1 basamaktır."
      ]
    },
    {
      h: "Yüzde kesre ve ondalığa nasıl çevrilir?",
      p: [
        "Yüzde, paydası 100 olan bir kesirdir. %35 demek 35/100 demektir; ondalık olarak 0,35, sade kesir olarak 7/20'dir. Ondalıklı yüzdelerde önce virgülden kurtulmak için pay ve paydayı 10'un kuvvetiyle çarpın."
      ],
      ul: [
        "<strong>%35</strong> = 35/100 = 0,35 = 7/20.",
        "<strong>%12,5</strong> = 12,5/100 = 125/1.000 = 0,125 = 1/8.",
        "<strong>%150</strong> = 150/100 = 1,5 = 3/2.",
        "<strong>%33,(3)</strong> = 0,(3) = 1/3; \"üçte bir\" indirim yaklaşık %33,33'tür.",
        "<strong>Kesirden yüzdeye:</strong> 3/8 = 0,375 → 100 ile çarpın → %37,5."
      ],
      after: [
        "Yüzde, kesir ve ondalık arasında hızlıca geçiş yapmak için [[arac:yuzde-kesir-cevir|Yüzde Kesir Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Çevirdikten sonra kesir nasıl sadeleştirilir?",
      p: [
        "Kuraldan çıkan kesir çoğu zaman sadeleşebilir, çünkü payda 9, 90, 99 gibi çok bölenli sayılardır. Pay ve paydanın en büyük ortak bölenini (EBOB) bulup ikisini de ona bölün. EBOB'u bulmak için [[bilgi:ebob-ekok-nasil-bulunur|EBOB-EKOK]] yöntemlerini, hızlı kontrol için [[bilgi:bolunebilme-kurallari|bölünebilme kurallarını]] kullanabilirsiniz."
      ],
      ol: [
        "212/90: ikisi de çift → 2'ye bölün: 106/45. 106'nın basamak toplamı 7, 3'e bölünmez; 45 = 3² × 5, 106 da 5'e bölünmez. Kesir sade.",
        "75/900: EBOB 75 → 1/12.",
        "45/99: basamak toplamları 9 ve 18, ikisi de 9'a bölünür → 5/11.",
        "Kontrol için sade kesri bölme işlemiyle yeniden ondalığa çevirin; aynı devri görmelisiniz."
      ],
      after: [
        "Büyük sayılarda [[arac:kesir-sadelestir|Kesir Sadeleştirme]] aracı EBOB'u ve sade kesri birlikte gösterir. Kesirlerle toplama, çıkarma ve bölme için [[bilgi:kesirlerle-islemler|kesirlerle işlemler]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Paydaya yalnızca 9 yazmak:</strong> 0,1(6)'da devretmeyen 1 basamağı unutulursa payda 9 sanılır ve yanlış sonuç çıkar; doğru payda 90'dır.",
        "<strong>Paydadaki sıfıra tam kısmı saymak:</strong> Sıfırlar yalnızca virgülden sonraki devretmeyen basamaklar için yazılır; 2,(3)'te payda 9'dur, 90 değil.",
        "<strong>Devri iki kez yazmak:</strong> Pay hesaplanırken devreden grup yalnızca bir kez yazılır: 0,(12) için 1212 değil 12.",
        "<strong>Sadeleştirmeyi unutmak:</strong> 15/90 doğru ama tamamlanmamış bir cevaptır; sınavlarda genellikle 1/6 beklenir.",
        "<strong>Hesap makinesi sonucunu devirli sanmak:</strong> Ekrandaki 0,3333333 yuvarlanmış sonlu bir sayıdır; 1/3'e eşit değil, ona çok yakındır."
      ]
    }
  ],
  faq: [
    ["Devirli ondalık sayı nedir?", "Devirli ondalık sayı, virgülden sonraki bir ya da birkaç basamağın sonsuza kadar aynı sırayla tekrar ettiği sayıdır. 1/3 = 0,333… ve 4/33 = 0,1212… örnek verilebilir; tekrar eden kısma devreden kısım denir ve üstüne çizgi çekilerek gösterilir."],
    ["Devirli sayı kesre nasıl çevrilir?", "Paya sayının virgülsüz tamamından devretmeyen kısım çıkarılarak yazılır. Paydaya her devreden basamak için 9, virgülden sonra devretmeyen her basamak için 0 yazılır. Örneğin 0,1666… için pay 15, payda 90'dır ve sonuç 1/6'dır."],
    ["0,3 devirli hangi kesre eşittir?", "0,333… sayısının devreden kısmı tek basamaklı 3'tür ve devretmeyen ondalık basamak yoktur. Pay 3, payda 9 olur; 3/9 sadeleştirildiğinde sonuç 1/3 çıkar."],
    ["0,9 devirli neden 1'e eşittir?", "Kural uygulandığında 9/9 = 1 bulunur. Ayrıca 1/3 = 0,333… eşitliği üçle çarpılınca 1 = 0,999… elde edilir. İki sayı arasında hiçbir sayı bulunmadığı için aralarındaki fark sıfırdır ve aynı sayıyı gösterirler."],
    ["Sonlu ondalık sayı kesre nasıl çevrilir?", "Virgül kaldırılarak sayı paya yazılır, paydaya virgülden sonraki basamak sayısı kadar sıfırı olan 10, 100, 1.000 gibi bir sayı yazılır. Ardından sadeleştirilir; 0,75 böylece 75/100 ve sonra 3/4 olur."],
    ["Yüzde kesre ve ondalığa nasıl çevrilir?", "Yüzde paydası 100 olan bir kesirdir. %35, 35/100 olarak yazılır, sadeleşince 7/20 olur ve ondalık karşılığı 0,35'tir. Ondalıklı yüzdelerde pay ve payda virgül kalkana kadar 10 ile çarpılır."],
    ["Her kesir devirli ondalık sayı mı olur?", "Hayır. Sadeleştirilmiş kesrin paydasında yalnızca 2 ve 5 asal çarpanları varsa ondalık açılım sonludur; 3/8 = 0,375 gibi. Paydada 3, 7, 11 gibi başka bir asal çarpan varsa açılım devirli olur."],
    ["Çevirdikten sonra kesir nasıl sadeleştirilir?", "Pay ve paydanın en büyük ortak böleni bulunur ve ikisi de bu sayıya bölünür. 212/90 kesrinde ortak bölen 2'dir ve sade hâli 106/45 olur; doğruluğu bölme yapılarak yeniden ondalığa çevirip kontrol edilebilir."],
    ["0,12 devirli 12 kaç eder?", "0,1212… sayısında iki basamaklı devir vardır ve devretmeyen basamak yoktur. Pay 12, payda iki tane 9'dan oluşan 99 olur; 12/99 kesri 3'e sadeleşerek 4/33 sonucunu verir."]
  ],
  tools: ["devirli-ondalik-kesir-cevir", "ondalik-kesir-cevir", "yuzde-kesir-cevir", "kesir-sadelestir"],
  related: ["kesirlerle-islemler", "ebob-ekok-nasil-bulunur", "asal-sayilar-nedir", "bolunebilme-kurallari"],
  sources: [
    ["MEB – Matematik öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
