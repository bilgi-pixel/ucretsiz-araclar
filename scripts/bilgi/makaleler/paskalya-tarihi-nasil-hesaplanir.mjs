export default {
  slug: "paskalya-tarihi-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Paskalya Tarihi Nasıl Hesaplanır? Batı ve Ortodoks Paskalyası Farkı",
  pageTitle: "Paskalya Tarihi Nasıl Hesaplanır? Gauss Algoritması ve 2026–2028",
  description: "Paskalya, 21 Mart'tan sonraki ilk dolunayı izleyen pazar günüdür. Gauss ve Meeus algoritmasıyla adım adım hesap, Ortodoks farkı ve 2026–2030 Paskalya tarihleri.",
  keywords: ["paskalya ne zaman", "paskalya tarihi hesaplama", "paskalya neden her yıl değişir", "ortodoks paskalya", "gauss paskalya algoritması", "bahar dolunayı", "paskalya 2027", "paskalya 2026"],
  lead: "Paskalya, <strong>21 Mart'tan sonra gelen ilk dolunayın ardından gelen ilk pazar günü</strong> kutlanır; bu yüzden tarihi her yıl değişir ve Batı kiliselerinde 22 Mart ile 25 Nisan arasında herhangi bir pazara denk gelebilir. Ortodoks kiliseler aynı kuralı Jülyen takvimiyle uyguladığı için tarihleri çoğu yıl bir ile beş hafta farklıdır. 2026'da Batı Paskalyası 5 Nisan, Ortodoks Paskalyası 12 Nisan'dır. Bu sayfada kuralın kökenini ve mod alma işlemleriyle yürüyen hesap algoritmasını 2026 için adım adım çözüyoruz.",
  kisaCevap: [
    "Kural: kilise hesabındaki bahar ekinoksundan (21 Mart) sonraki ilk dolunayı izleyen pazar günü Paskalya'dır.",
    "Batı Paskalyası en erken 22 Mart, en geç 25 Nisan olabilir.",
    "Ortodoks kiliseler hesabı Jülyen takvimiyle yapar; 1900–2099 arasında Miladi takvimde 4 Nisan ile 8 Mayıs arasına düşer.",
    "2026: Batı 5 Nisan, Ortodoks 12 Nisan · 2027: Batı 28 Mart, Ortodoks 2 Mayıs · 2028: ikisi de 16 Nisan.",
    "Hesap, 19 yıllık Ay döngüsünü (Meton döngüsü) ve haftanın günlerini mod alma işlemleriyle izler.",
    "Kullanılan dolunay astronomik değil, tablolarla hesaplanan kilise dolunayıdır; bu yüzden gerçek dolunaydan bir iki gün sapabilir."
  ],
  figure: {
    alt: "2026 Paskalya hesabının takvim üzerindeki gösterimi: 21 Mart kilise ekinoksu, 2 Nisan Perşembe kilise dolunayı, 5 Nisan Pazar Batı Paskalyası, 12 Nisan Pazar Ortodoks Paskalyası.",
    caption: "2026'da kilise hesabındaki dolunay 2 Nisan Perşembe'ye düşer; ardından gelen ilk pazar, 5 Nisan, Batı Paskalyası'dır. Jülyen takvimine göre yapılan Ortodoks hesabı 30 Mart (Jülyen) verir; 13 gün eklenince Miladi 12 Nisan Pazar olur.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">2026 Paskalya hesabı</text>
  <line x1="40" y1="150" x2="690" y2="150" class="st sw" fill="none"/>
  <circle cx="70" cy="150" r="10" class="sf sb"/>
  <text x="70" y="120" class="sm mid b">21 Mart</text>
  <text x="70" y="182" class="sm mid">kilise ekinoksu</text>
  <circle cx="330" cy="150" r="16" class="y"/>
  <circle cx="330" cy="150" r="16" class="sb" fill="none"/>
  <text x="330" y="112" class="sm mid b">2 Nisan, Perşembe</text>
  <text x="330" y="190" class="sm mid">kilise dolunayı (21 Mart + 12 gün)</text>
  <circle cx="395" cy="150" r="13" class="p"/>
  <text x="430" y="92" class="b mid p">5 Nisan Pazar</text>
  <text x="430" y="72" class="sm mid">Batı Paskalyası</text>
  <circle cx="535" cy="150" r="13" class="ok"/>
  <text x="570" y="212" class="b mid ok">12 Nisan Pazar</text>
  <text x="570" y="232" class="sm mid">Ortodoks Paskalyası</text>
  <rect x="20" y="258" width="680" height="110" rx="10" class="sf sb"/>
  <text x="40" y="284" class="b">Gauss / Meeus adımları (2026)</text>
  <text x="40" y="308" class="sm">a = 2026 mod 19 = 12 · h = (19·12 + 20 − 5 − 6 + 15) mod 30 = 12</text>
  <text x="40" y="330" class="sm">l = (32 + 2·0 + 2·6 − 12 − 2) mod 7 = 2 · t = 12 + 2 + 114 = 128</text>
  <text x="40" y="354" class="sm b p">ay = 128 ÷ 31 = 4 (Nisan) · gün = 128 mod 31 + 1 = 5</text>
</svg>`
  },
  sections: [
    {
      h: "Paskalya tarihi neden her yıl değişir?",
      p: [
        "Takvimimizdeki bayramların çoğu ya Güneş yılına (her yıl aynı tarih) ya da Ay yılına (her yıl yaklaşık 11 gün kayan tarih) bağlıdır. Paskalya ise ikisine birden bağlıdır: Güneş yılındaki bahar ekinoksuna, Ay'ın evrelerine ve haftanın günlerine. Üç farklı döngünün kesiştiği gün her yıl başka bir tarihe denk geldiği için Paskalya da 35 günlük bir aralıkta oynar.",
        "Bu bağlantının tarihsel kökeni, Hristiyan geleneğinde Paskalya'nın Yahudilerin Pesah (Hamursuz) bayramıyla ilişkili olmasıdır; Pesah da Ay takvimine göre belirlenir. Hristiyan kiliseler Paskalya'nın hem bahar dolunayına bağlı kalmasını hem de bir pazar gününe denk gelmesini istedi. Ay evrelerinin genel mantığı [[bilgi:ay-evresi-bugun-dolunay-ne-zaman|ay evresi ve dolunay]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Paskalya hangi kurala göre belirlenir?",
      p: [
        "325 yılındaki İznik Konsili'nden sonra yerleşen ve sonraki yüzyıllarda hesap tablolarıyla kesinleşen kural şöyledir: Paskalya, bahar ekinoksundan sonra gelen ilk dolunayı izleyen ilk pazar günüdür. Dolunay pazara denk gelirse Paskalya bir sonraki pazara kayar."
      ],
      ul: [
        "<strong>Ekinoks sabit kabul edilir:</strong> Hesapta astronomik ekinoks değil, kilise ekinoksu olarak 21 Mart kullanılır.",
        "<strong>Dolunay tablolardan gelir:</strong> Gerçek dolunay yerine, 19 yıllık döngüye dayanan tablolarla hesaplanan kilise dolunayı (Paskalya dolunayı) kullanılır.",
        "<strong>Pazar şartı:</strong> Paskalya her zaman pazar günüdür; bağlı günler (Kutsal Cuma, Pentekost) buna göre sayılır."
      ],
      after: [
        "Bu iki sadeleştirme, Paskalya tarihinin her yerde aynı ve önceden hesaplanabilir olmasını sağlar. Astronomik ekinoks ve dolunay saat dilimine göre farklı günlere düşebileceği için gerçek gözleme dayalı bir kural, dünyanın farklı yerlerinde farklı Paskalya tarihleri üretirdi. Gerçek ekinoksun ne olduğunu [[bilgi:gundonumu-ve-ekinoks-en-uzun-gun-ne-zaman|gündönümü ve ekinoks]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Bahar ekinoksu ve ilk dolunay hesapta nasıl kullanılır?",
      p: [
        "Ay'ın evreleri yaklaşık 29,53 günde bir tekrarlanır. 19 Güneş yılı (6.939,6 gün) ile 235 Ay ayı (6.939,7 gün) neredeyse eşit olduğu için Ay evreleri 19 yılda bir aynı takvim günlerine geri döner. Bu, Antik Yunan astronomu Meton'un adıyla anılan Meton döngüsüdür. Paskalya hesabındaki \"yıl mod 19\" işlemi, yılın bu döngünün kaçıncı yılı olduğunu, yani altın sayıyı bulur.",
        "Yılın döngüdeki yeri belli olunca, o yılın 21 Mart'tan sonraki kilise dolunayının kaç gün sonra geleceği de belli olur. Gregoryen takvimde yüzyıl yıllarındaki artık yıl düzeltmesi ve Ay tablolarının uzun dönemli küçük sapması için iki ek düzeltme yapılır; algoritmadaki b, d, f ve g değişkenleri bu düzeltmelerdir. Son adımda dolunaydan sonraki ilk pazar, haftanın günlerini 7'ye göre mod alarak izleyen bir hesapla bulunur."
      ]
    },
    {
      h: "Gauss algoritması adım adım nasıl uygulanır? 2026 örneği",
      p: [
        "Paskalya için ilk aritmetik yöntemi 1800'de Carl Friedrich Gauss yayımladı. Bugün en yaygın kullanılan biçim, yüzyıllara özel istisnalar gerektirmeyen ve astronom Jean Meeus'un kitaplarıyla bilinen \"anonim Gregoryen algoritma\"dır. Aşağıdaki adımlarda tüm bölmeler tam sayı bölmesidir (kalan atılır), \"mod\" ise bölümden kalandır."
      ],
      table: {
        head: ["Adım", "Formül", "2026 için"],
        rows: [
          ["a", "Y mod 19", "12"],
          ["b, c", "Y ÷ 100, Y mod 100", "20, 26"],
          ["d, e", "b ÷ 4, b mod 4", "5, 0"],
          ["f", "(b + 8) ÷ 25", "1"],
          ["g", "(b − f + 1) ÷ 3", "6"],
          ["h", "(19a + b − d − g + 15) mod 30", "(228 + 20 − 5 − 6 + 15) mod 30 = 12"],
          ["i, k", "c ÷ 4, c mod 4", "6, 2"],
          ["l", "(32 + 2e + 2i − h − k) mod 7", "(32 + 0 + 12 − 12 − 2) mod 7 = 2"],
          ["m", "(a + 11h + 22l) ÷ 451", "(12 + 132 + 44) ÷ 451 = 0"],
          ["t", "h + l − 7m + 114", "128"],
          ["Ay", "t ÷ 31", "4 → Nisan"],
          ["Gün", "(t mod 31) + 1", "4 + 1 = 5 → 5 Nisan 2026"]
        ],
        caption: "h, 21 Mart'tan kilise dolunayına kadar geçen gün sayısıdır (2026'da 12 gün → 2 Nisan); l, dolunaydan pazara kadar kalan günleri verir."
      },
      after: [
        "Sonucu kontrol etmek kolaydır: 2 Nisan 2026 perşembedir ve ondan sonraki ilk pazar 5 Nisan'dır. Hesabı başka yıllar için tekrarlamak isterseniz [[arac:paskalya-tarihi-hesapla|Paskalya Tarihi Hesaplama]] aracı aynı algoritmayı kullanır ve bağlı günleri de listeler."
      ]
    },
    {
      h: "Mod alma işlemi bu hesapta neden gerekir?",
      p: [
        "Paskalya hesabı tekrarlanan döngüleri izler ve döngüleri izlemenin en doğal yolu bölümden kalanı, yani mod almayı kullanmaktır. 19 yıllık Ay döngüsünde yılın yeri Y mod 19 ile, 30 günlük kilise ayındaki kayma h = (…) mod 30 ile, haftanın günü ise (…) mod 7 ile bulunur. Saat kadranı nasıl 12'den sonra yeniden 1'e dönüyorsa, bu değerler de kendi döngülerinin sonunda yeniden başa döner.",
        "Mod alma işleminin mantığını ve \"100 gün sonra hangi gün\" gibi gündelik örneklerini [[bilgi:moduler-aritmetik-100-gun-sonra-hangi-gun|modüler aritmetik]] yazısında, bölüm ve kalanı birlikte görmek için [[arac:mod-alma-hesapla|Mod Alma Hesaplama]] aracını kullanabilirsiniz. Algoritmada negatif sayı çıkmaması için formüllere 32, 15 ve 114 gibi sabitler eklenmiştir; bunlar sonucu değiştirmez, yalnızca hesabı pozitif tutar."
      ]
    },
    {
      h: "Batı ve Ortodoks Paskalyası neden farklı günlere denk gelir?",
      p: [
        "1582'de Papa XIII. Gregorius'un takvim reformuyla Batı kiliseleri, ekinoksun takvimde geriye kaymasını düzelten Gregoryen (Miladi) takvime geçti. Ortodoks kiliselerin çoğu ise dinî takvimde Jülyen takvimini korudu. Kural aynıdır, ama 21 Mart iki takvimde farklı günlere karşılık gelir: 1900–2099 arasında Jülyen takvimi Gregoryen takvimin 13 gün gerisindedir.",
        "Ortodoks hesabında ayrıca Ay tabloları eski Jülyen tablolarıdır ve Gregoryen düzeltmeleri içermez. Bu iki etki birleşince Ortodoks Paskalyası ya Batı ile aynı gün, ya bir hafta, ya da dört ya da beş hafta sonra gelir; hiçbir zaman önce gelmez."
      ],
      formula: "Ortodoks (Jülyen): a = Y mod 4 · b = Y mod 7 · c = Y mod 19\nd = (19c + 15) mod 30 · e = (2a + 4b − d + 34) mod 7\nay = (d + e + 114) ÷ 31 · gün = ((d + e + 114) mod 31) + 1   → Jülyen tarih\nMiladi tarih = Jülyen tarih + 13 gün (1900–2099)\n2026: d = 3, e = 5 → 30 Mart (Jülyen) + 13 = 12 Nisan (Miladi)"
    },
    {
      h: "Gelecek yılların Paskalya tarihleri: 2026–2030",
      table: {
        head: ["Yıl", "Batı Paskalyası", "Ortodoks Paskalyası", "Fark"],
        rows: [
          ["2026", "5 Nisan", "12 Nisan", "1 hafta"],
          ["2027", "28 Mart", "2 Mayıs", "5 hafta"],
          ["2028", "16 Nisan", "16 Nisan", "Aynı gün"],
          ["2029", "1 Nisan", "8 Nisan", "1 hafta"],
          ["2030", "21 Nisan", "28 Nisan", "1 hafta"]
        ],
        caption: "Tarihler yukarıdaki iki algoritmayla hesaplanmıştır ve Miladi takvime göre verilmiştir. Hepsi pazar günüdür."
      },
      after: [
        "2027'deki beş haftalık fark, iki takvimdeki dolunay hesabının farklı aylara düşmesinden kaynaklanır: Batı hesabında Mart sonundaki dolunay yeterlidir, Jülyen hesabında ise bir sonraki dolunay beklenir. 2028 gibi aynı güne denk gelen yıllar ortalama birkaç yılda bir görülür; 2025'te de iki Paskalya 20 Nisan'da birleşmişti. Paskalya Türkiye'de resmî tatil değildir, ama turizm, yurt dışındaki aile ziyaretleri ve uluslararası iş planlaması açısından bu tarihleri bilmek pratik fayda sağlar; yurt dışı tatil planı için [[arac:ay-evresi-hesapla|Ay Evresi Hesaplama]] aracıyla gerçek dolunayı da karşılaştırabilirsiniz."
      ]
    },
    {
      h: "Paskalya en erken ve en geç hangi tarihlerde olabilir?",
      p: [
        "Batı Paskalyası için en erken tarih 22 Mart'tır: kilise dolunayı 21 Mart cumartesiye denk gelirse ertesi gün Paskalya olur. Bu en son 1818'de yaşandı ve bir sonraki 2285'te yaşanacak. En geç tarih 25 Nisan'dır: dolunay 21 Mart'tan hemen önce düşerse bir sonraki dolunay 18 Nisan'a kadar gecikebilir ve o gün pazarsa Paskalya bir hafta sonraya kayar. 25 Nisan Paskalyası en son 1943'te görüldü, sonraki 2038'de görülecek.",
        "Ortodoks Paskalyası Jülyen takviminde de 22 Mart ile 25 Nisan arasındadır; bu, 1900–2099 döneminde Miladi takvimde 4 Nisan ile 8 Mayıs aralığına karşılık gelir. Jülyen ile Gregoryen arasındaki fark 2100'de 14 güne çıkacağı için bu aralık o tarihten sonra bir gün daha kayacaktır. Takvim sistemlerinin genel karşılaştırması için [[bilgi:artik-yil-nedir-subat-kac-gun|artık yıl]] ve [[bilgi:hicri-takvim-nedir|Hicri takvim]] yazılarına bakabilirsiniz."
      ]
    },
    {
      h: "Paskalya hesabında sık yapılan hatalar",
      ul: [
        "<strong>Astronomik dolunayı kullanmak:</strong> Bazı yıllarda gerçek dolunay ile kilise dolunayı farklı günlere düşer ve sonuç bir hafta sapar.",
        "<strong>Gerçek ekinoksu almak:</strong> Hesap her zaman 21 Mart'ı kullanır; astronomik ekinoksun 20 Mart olması sonucu değiştirmez.",
        "<strong>Tam sayı bölmesi yerine ondalık bölme yapmak:</strong> Algoritmadaki tüm bölmelerde kalan atılmalıdır.",
        "<strong>Jülyen sonucunu çevirmeyi unutmak:</strong> Ortodoks formülü Jülyen tarih verir; Miladi tarih için 13 gün eklenmelidir.",
        "<strong>1583 öncesine uygulamak:</strong> Gregoryen algoritma takvim reformundan önceki yıllar için anlamlı değildir."
      ]
    }
  ],
  faq: [
    ["Paskalya tarihi neden her yıl değişir?", "Paskalya Güneş yılındaki bahar ekinoksuna, Ay'ın evrelerine ve haftanın günlerine birlikte bağlıdır. Bu üç döngünün kesiştiği gün her yıl farklı bir tarihe düştüğü için Paskalya 22 Mart ile 25 Nisan arasında oynar."],
    ["Paskalya hangi kurala göre belirlenir?", "Paskalya, kilise hesabında 21 Mart kabul edilen bahar ekinoksundan sonraki ilk dolunayı izleyen ilk pazar günüdür. Dolunay pazara denk gelirse Paskalya bir sonraki pazara kayar."],
    ["Bahar ekinoksu ve ilk dolunay hesapta nasıl kullanılır?", "Ekinoks sabit olarak 21 Mart alınır; dolunay ise 19 yıllık Meton döngüsüne dayanan tablolarla hesaplanır. Yılın bu döngüdeki yeri yıl mod 19 ile bulunur ve dolunaya kadar geçen gün sayısı buradan çıkarılır."],
    ["Batı ve Ortodoks Paskalyası neden farklı günlere denk gelir?", "Batı kiliseleri hesabı Gregoryen takvimle, Ortodoks kiliseler Jülyen takvimle ve eski Ay tablolarıyla yapar. İki takvim arasındaki 13 günlük fark ve farklı tablolar nedeniyle Ortodoks Paskalyası aynı gün ya da 1, 4 veya 5 hafta sonra gelir."],
    ["Gauss algoritması adım adım nasıl uygulanır?", "Yılın 19'a, 100'e, 4'e, 30'a ve 7'ye göre bölümleri ve kalanları sırayla hesaplanır, en sonda t = h + l − 7m + 114 bulunur. Ay t ÷ 31, gün (t mod 31) + 1 olarak çıkar; 2026 için sonuç 5 Nisan'dır."],
    ["Paskalya en erken ve en geç hangi tarihlerde olabilir?", "Batı Paskalyası en erken 22 Mart, en geç 25 Nisan olabilir. Ortodoks Paskalyası 1900–2099 arasında Miladi takvimde 4 Nisan ile 8 Mayıs arasında bir pazara denk gelir."],
    ["Jülyen ve Gregoryen takvim farkı nedir?", "Jülyen takvim her dört yılda bir artık yıl yapar ve yılı biraz uzun sayar. 1582'deki Gregoryen reform yüzyıl yıllarındaki artık yılları düzenledi; bugün iki takvim arasında 13 gün fark vardır ve bu fark 2100'de 14 güne çıkacaktır."],
    ["Mod alma işlemi bu hesapta neden gerekir?", "Hesap, 19 yıllık Ay döngüsü, 30 günlük kilise ayı ve 7 günlük hafta gibi tekrarlanan döngüleri izler. Bölümden kalanı veren mod işlemi, bir değerin döngünün neresinde olduğunu bulmanın en doğal yoludur."],
    ["Gelecek yılların Paskalya tarihleri nasıl bulunur?", "Gauss ya da Meeus algoritması herhangi bir yıl için uygulanabilir. 2026'da Batı 5 Nisan, Ortodoks 12 Nisan; 2027'de Batı 28 Mart, Ortodoks 2 Mayıs; 2028'de ikisi de 16 Nisan'dır."]
  ],
  tools: ["paskalya-tarihi-hesapla", "mod-alma-hesapla", "ay-evresi-hesapla"],
  related: ["ay-evresi-bugun-dolunay-ne-zaman", "moduler-aritmetik-100-gun-sonra-hangi-gun", "gundonumu-ve-ekinoks-en-uzun-gun-ne-zaman", "hicri-takvim-nedir"]
};
