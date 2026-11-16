export default {
  slug: "ieee-754-kayan-nokta-0-1-0-2",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "0.1 + 0.2 Neden 0.30000000000000004? IEEE 754 Kayan Nokta",
  pageTitle: "0.1 + 0.2 Neden 0.3 Değil? IEEE 754 Kayan Nokta Sayılar",
  description: "0.1 ve 0.2 ikilik sistemde tam yazılamaz, en yakın değere yuvarlanır; toplam bu yüzden 0.30000000000000004 çıkar. IEEE 754, float-double farkı ve çözümler.",
  keywords: ["0.1 + 0.2 neden 0.3 değil", "ieee 754 nedir", "kayan nokta sayı", "floating point hatası", "javascript ondalık hatası", "double ve float farkı", "ondalık sayı ikilik gösterim", "mantis üs işaret biti"],
  lead: "0.1 + 0.2 işleminin <strong>0.30000000000000004</strong> çıkmasının nedeni, 0.1 ve 0.2'nin ikilik (binary) sistemde sonlu basamakla yazılamaması ve bilgisayarın bu sayıları IEEE 754 standardındaki en yakın değere yuvarlayarak saklamasıdır. İki küçük yuvarlama hatası toplanınca sonuç, 0.3'ün saklanan değerinden bir adım yukarıdaki sayıya düşer. Bu bir yazılım hatası değil, kayan nokta aritmetiğinin doğal sonucudur. Bu yazıda IEEE 754'ün işaret-üs-mantis yapısını, float ile double farkını, NaN ve Infinity'yi ve para hesaplarında hatadan nasıl kaçınılacağını örneklerle anlatıyoruz.",
  kisaCevap: [
    "0.1'in ikilik karşılığı 0.000110011001100… diye sonsuza kadar tekrar eder; bilgisayar bunu 52 bitlik kesirde keserek yuvarlar.",
    "Saklanan 0.1 aslında 0.1000000000000000055511…, saklanan 0.3 ise 0.2999999999999999888977… değeridir.",
    "IEEE 754 çift duyarlıklı (double) sayı 64 bittir: 1 işaret, 11 üs ve 52 kesir (mantis) biti.",
    "Tek duyarlıklı (float) sayı 32 bittir: 1 işaret, 8 üs, 23 kesir biti; yaklaşık 7 anlamlı basamak tutar, double ise 15–17.",
    "Kayan nokta sayıları eşitlikle değil, küçük bir tolerans içinde karşılaştırılmalıdır.",
    "Para hesaplarında tutarı kuruş cinsinden tam sayı olarak ya da ondalık (decimal) türüyle saklamak gerekir."
  ],
  figure: {
    alt: "64 bitlik IEEE 754 çift duyarlıklı sayının yapısı: 1 işaret biti, 11 üs biti ve 52 kesir biti; altında 0.1, 0.2 ve 0.3'ün saklanan gerçek değerleri ve toplamın 0.3'ten bir adım yukarıda kalması.",
    caption: "Çift duyarlıklı sayıda bitlerin dağılımı ve 0.1 + 0.2 örneği. Toplam, 0.3'ün saklanan değerinin değil, ondan bir sonraki temsil edilebilir sayının üzerine düşer; aradaki fark yaklaşık 5,55 × 10⁻¹⁷'dir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">IEEE 754 çift duyarlık: 64 bit</text>
  <rect x="20" y="52" width="40" height="56" rx="6" class="dgs"/>
  <rect x="64" y="52" width="150" height="56" rx="6" class="oks"/>
  <rect x="218" y="52" width="482" height="56" rx="6" class="ps"/>
  <text x="40" y="86" class="b mid">S</text>
  <text x="139" y="80" class="b mid">Üs</text><text x="139" y="98" class="sm mid">11 bit, sapma 1023</text>
  <text x="459" y="80" class="b mid">Kesir (mantis)</text><text x="459" y="98" class="sm mid">52 bit, başta gizli 1</text>
  <text x="40" y="128" class="sm mid">1 bit</text>
  <text x="360" y="150" class="sm mid t2">Değer = (−1)^S × 1,kesir × 2^(üs − 1023)</text>
  <line x1="20" y1="170" x2="700" y2="170" class="sb dash" fill="none"/>
  <text x="20" y="200" class="b">Gerçekte saklanan değerler</text>
  <rect x="20" y="214" width="680" height="34" rx="6" class="sf sb"/>
  <text x="34" y="236" class="b">0.1</text><text x="120" y="236" class="sm">0.1000000000000000055511151…</text><text x="686" y="236" class="sm end mu">3FB999999999999A</text>
  <rect x="20" y="254" width="680" height="34" rx="6" class="sf sb"/>
  <text x="34" y="276" class="b">0.2</text><text x="120" y="276" class="sm">0.2000000000000000111022302…</text><text x="686" y="276" class="sm end mu">3FC999999999999A</text>
  <line x1="60" y1="350" x2="660" y2="350" class="st sw" fill="none"/>
  <line x1="200" y1="336" x2="200" y2="364" class="sp sw" fill="none"/>
  <line x1="520" y1="336" x2="520" y2="364" class="sdg sw" fill="none"/>
  <circle cx="360" cy="350" r="7" class="a"/>
  <text x="200" y="326" class="sm mid b p">saklanan 0.3</text>
  <text x="200" y="386" class="sm mid">0.29999999999999998889…</text>
  <text x="520" y="326" class="sm mid b dg">0.1 + 0.2 sonucu</text>
  <text x="520" y="386" class="sm mid">0.30000000000000004441…</text>
  <text x="360" y="326" class="sm mid">gerçek 0,3</text>
  <text x="360" y="410" class="sm mid t2">Komşu iki double arasındaki adım: 2⁻⁵⁴ ≈ 5,55 × 10⁻¹⁷</text>
</svg>`
  },
  sections: [
    {
      h: "0.1 + 0.2 neden tam 0.3 etmez?",
      p: [
        "Onluk sistemde 1/3'ü sonlu basamakla yazamayız: 0,3333… diye sonsuza gider. Bir yerde keserseniz küçük bir hata oluşur ve üç tane 0,333'ü topladığınızda 1 yerine 0,999 bulursunuz. Bilgisayarda aynı şey 0.1 için yaşanır, çünkü bilgisayar sayıları 2 tabanında saklar ve 2 tabanında yalnızca paydası 2'nin kuvveti olan kesirler (1/2, 1/4, 3/8 gibi) sonlu yazılabilir.",
        "1/10'un paydası 2 × 5'tir; 5 çarpanı yüzünden 0.1 ikilik sistemde <code>0.0001100110011001100…</code> şeklinde sonsuza kadar tekrar eder. Bilgisayar bu diziyi 52 bitte keser ve en yakın değere yuvarlar. Aynı şey 0.2 için de geçerlidir. İki yuvarlanmış sayı toplanınca çıkan sonuç bir kez daha yuvarlanır ve 0.3'ün saklanabilen en yakın temsilinin değil, ondan bir adım büyük olan sayının üzerine düşer. Ekrana yazdırılırken bu sayı 0.30000000000000004 olarak görünür.",
        "Yani hata toplamada değil, sayıların ilk saklanma anındadır. Programlama dillerinin çoğunda kod içinde ondalık ayırıcı olarak nokta kullanıldığı için bu yazıda kod örneklerini noktalı, açıklamaları virgüllü yazıyoruz."
      ]
    },
    {
      h: "IEEE 754 standardı nedir?",
      p: [
        "IEEE 754, Elektrik ve Elektronik Mühendisleri Enstitüsü'nün 1985'te yayımladığı, 2008 ve 2019'da güncellediği kayan nokta aritmetiği standardıdır. Neredeyse bütün işlemciler, programlama dilleri ve veritabanları ondalıklı sayıları bu standarda göre saklar. Bu sayede bir C programında hesaplanan double değer JavaScript'te, Python'da ya da Java'da bit bit aynı çıkar.",
        "\"Kayan nokta\" adı, sayının bilimsel gösterime benzer biçimde saklanmasından gelir: 6.25 sayısı 1,5625 × 2² diye yazılır. Ondalık noktanın yeri üs ile \"kaydırılır\"; böylece aynı bit sayısıyla hem çok küçük (10⁻³⁰⁸ düzeyi) hem çok büyük (10³⁰⁸ düzeyi) sayılar tutulabilir. Bedeli, her sayının yalnızca sınırlı sayıda anlamlı basamakla saklanmasıdır."
      ]
    },
    {
      h: "İşaret, üs ve mantis ne demek?",
      p: [
        "IEEE 754 sayısı üç alandan oluşur. <strong>İşaret biti</strong> 0 ise sayı pozitif, 1 ise negatiftir. <strong>Üs</strong> alanı, sayının 2'nin kaçıncı kuvvetiyle ölçekleneceğini tutar; negatif üsleri ayrı işaretle saklamamak için sabit bir <strong>sapma (bias)</strong> eklenir: tek duyarlıkta 127, çift duyarlıkta 1023. <strong>Kesir (mantis)</strong> alanı ise virgülden sonraki ikilik basamaklardır; normal sayılarda baştaki 1 her zaman var kabul edildiği için yazılmaz ve buna \"gizli bit\" denir."
      ],
      formula: "Değer = (−1)^işaret × 1,kesir × 2^(üs − sapma)\nTek duyarlık: sapma 127 · Çift duyarlık: sapma 1023",
      ol: [
        "<strong>Çözümlü örnek, −6,25 sayısını tek duyarlıkta yazalım.</strong> Sayı negatif olduğu için işaret biti 1'dir.",
        "6,25'i ikiliğe çevirin: 6 = 110, 0,25 = 0,01; yani 6,25 = 110,01₂.",
        "Normalleştirin: 110,01 = 1,1001 × 2². Gerçek üs 2'dir.",
        "Üs alanına sapmayı ekleyin: 2 + 127 = 129 = 10000001₂.",
        "Kesir alanına virgülden sonraki bitleri yazıp 23 bite sıfırla tamamlayın: 1001 0000 0000 0000 0000 000.",
        "Bitleri birleştirin: 1 10000001 10010000000000000000000 → onaltılık C0C80000. −6,25 ikilikte sonlu yazıldığı için hiç hata yoktur."
      ],
      after: [
        "Aynı yöntemi 0,1 için uygularsanız kesir kısmı 1001 1001 1001… diye tekrar eder; 23. bitte kesilip yuvarlanır ve tek duyarlıkta 3DCCCCCD bulunur. Bu bitlerin karşılık geldiği gerçek değer 0,100000001490116…'dır. Bit dökümünü kendiniz görmek için [[arac:ieee754-cevir|IEEE 754 Çevirici]]ye bir sayı yazmanız yeterli."
      ]
    },
    {
      h: "Ondalık sayılar ikilik sistemde nasıl saklanır?",
      p: [
        "Ondalık kesri ikiliğe çevirmenin yolu, kesir kısmını tekrar tekrar 2 ile çarpıp tam kısmı not etmektir. Çıkan tam kısımlar sırayla ikilik basamakları verir. Kesir sıfıra ulaşırsa sayı sonludur; aynı kesir tekrar karşınıza çıkarsa dizi devirlidir. Bu, onluk sistemdeki [[bilgi:devirli-ondalik-sayi-kesre-cevirme|devirli ondalık sayıların]] ikilikteki karşılığıdır."
      ],
      table: {
        head: ["Adım", "İşlem", "Tam kısım (bit)", "Kalan kesir"],
        rows: [
          ["1", "0,1 × 2 = 0,2", "0", "0,2"],
          ["2", "0,2 × 2 = 0,4", "0", "0,4"],
          ["3", "0,4 × 2 = 0,8", "0", "0,8"],
          ["4", "0,8 × 2 = 1,6", "1", "0,6"],
          ["5", "0,6 × 2 = 1,2", "1", "0,2"],
          ["6", "0,2 × 2 = 0,4", "0", "0,4 (tekrar başladı)"]
        ],
        caption: "0,2 kesri 5. adımda yeniden göründüğü için 0011 bloğu sonsuza kadar tekrar eder: 0,1 = 0,0(0011)₂."
      },
      after: [
        "Tam sayılarda böyle bir sorun yoktur: 2⁵³ = 9.007.199.254.740.992'ye kadar bütün tam sayılar double ile hatasız tutulur. Bu sınırın üstünde ardışık tam sayılar arasında boşluklar başlar; JavaScript'te 2⁵³ + 1 yazdığınızda 9.007.199.254.740.992 görmenizin nedeni budur. İkilik çevirmenin genel kurallarını [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Float ile double arasındaki fark nedir?",
      p: [
        "İkisi de IEEE 754 sayısıdır, fark bit sayısındadır. Float (tek duyarlık) 32 bit, double (çift duyarlık) 64 bit kullanır. Double daha geniş üs alanı sayesinde çok daha büyük ve küçük sayıları, daha uzun kesir alanı sayesinde de çok daha fazla anlamlı basamağı tutar. JavaScript'teki tüm Number değerleri, Python'daki float türü ve Excel'in hücre hesapları double'dır."
      ],
      table: {
        head: ["Özellik", "Float (tek, 32 bit)", "Double (çift, 64 bit)"],
        rows: [
          ["İşaret / üs / kesir", "1 / 8 / 23 bit", "1 / 11 / 52 bit"],
          ["Üs sapması", "127", "1023"],
          ["Anlamlı basamak", "yaklaşık 7", "yaklaşık 15–17"],
          ["En büyük değer", "yaklaşık 3,4 × 10³⁸", "yaklaşık 1,8 × 10³⁰⁸"],
          ["Makine epsilonu", "2⁻²³ ≈ 1,19 × 10⁻⁷", "2⁻⁵² ≈ 2,22 × 10⁻¹⁶"],
          ["0,1'in onaltılık kodu", "3DCCCCCD", "3FB999999999999A"],
          ["Tipik kullanım", "Grafik, oyun, sensör verisi", "Bilimsel hesap, genel programlama"]
        ]
      },
      after: [
        "Makine epsilonu, 1'den büyük ilk temsil edilebilir sayı ile 1 arasındaki farktır ve göreli hassasiyetin ölçüsüdür. Float ile yapılan uzun toplamlarda hata hızla birikir; örneğin bir milyon kez 0,1 eklediğinizde float sonucu 100.000'den belirgin biçimde sapar, double ise çok daha yakın kalır."
      ]
    },
    {
      h: "NaN ve Infinity nasıl gösterilir?",
      p: [
        "IEEE 754, hesap sırasında oluşabilecek tanımsız durumlar için özel bit desenleri ayırır. Üs alanının tamamı 1 olduğunda sayı \"normal\" değildir: kesir alanı sıfırsa <strong>Infinity</strong> (sonsuz), sıfır değilse <strong>NaN</strong> (Not a Number, sayı değil) anlamına gelir. İşaret biti sonsuzun yönünü belirler.",
        "Üs alanının tamamı 0 olduğunda ise sayı ya sıfırdır ya da <strong>alt-normal</strong> (subnormal) bir sayıdır. Alt-normal sayılarda gizli bit 0 kabul edilir ve sıfıra çok yakın değerler kademeli olarak temsil edilir. Standartta +0 ve −0 ayrı bit desenleridir ama karşılaştırmada eşit sayılır."
      ],
      table: {
        head: ["Durum", "Örnek işlem", "Sonuç"],
        rows: [
          ["Pozitif sıfıra bölme", "1 / 0", "Infinity"],
          ["Negatif sayıyı sıfıra bölme", "−1 / 0", "−Infinity"],
          ["Sıfırı sıfıra bölme", "0 / 0", "NaN"],
          ["Negatifin karekökü", "√−1", "NaN"],
          ["Taşma", "1e308 × 10", "Infinity"],
          ["NaN karşılaştırması", "NaN == NaN", "false"]
        ]
      },
      after: [
        "NaN'ın kendisine bile eşit olmaması bilinçli bir tasarımdır; bir değerin NaN olup olmadığını anlamak için dillerdeki özel denetim işlevleri kullanılmalıdır."
      ]
    },
    {
      h: "Kayan nokta hatası nasıl önlenir?",
      p: [
        "Hatanın kendisini ortadan kaldıramazsınız ama sonuçlarını yönetebilirsiniz. Doğru yöntem, ne tür bir hesap yaptığınıza bağlıdır."
      ],
      ul: [
        "<strong>Eşitlik yerine tolerans:</strong> <code>a == b</code> yerine iki sayının farkının mutlak değerinin küçük bir eşikten (ör. 1e-9 ya da sayıların büyüklüğüyle orantılı bir değer) küçük olup olmadığına bakın.",
        "<strong>Gösterirken yuvarlayın, hesaplarken değil:</strong> Ara sonuçları tam hassasiyetle tutun, ekrana yazarken istediğiniz basamağa yuvarlayın. 0.30000000000000004 iki basamağa yuvarlanınca 0.30 olur.",
        "<strong>Tam sayı birimine geçin:</strong> Tutarları kuruş, uzunlukları milimetre, süreleri milisaniye cinsinden tam sayı olarak saklayın; tam sayı toplamaları hatasızdır.",
        "<strong>Ondalık tür kullanın:</strong> Birçok dil ve veritabanı onluk tabanda çalışan decimal ya da numeric türü sunar; 0.1 bu türlerde tam olarak saklanır.",
        "<strong>İşlem sırasına dikkat edin:</strong> Çok büyük ve çok küçük sayıları birlikte toplarken küçükleri önce toplamak hatayı azaltır."
      ],
      after: [
        "Yuvarlama kuralının kendisi de önemlidir: 1.005 sayısı double'da 1,00499999999999989… olarak saklandığı için iki basamağa yuvarlandığında 1.01 yerine 1.00 çıkabilir. Hangi yuvarlama yöntemlerinin olduğunu görmek için [[arac:yuvarlama-hesapla|Yuvarlama Hesaplama]] aracını deneyebilirsiniz."
      ]
    },
    {
      h: "Para hesaplarında neden float kullanılmamalı?",
      p: [
        "Para, onluk sistemde tanımlıdır ve kuruşa kadar tam olmalıdır. 0,10 TL'lik bir indirimin ikilik sistemde tam saklanamaması, binlerce satırlık bir faturada ya da faiz hesabında kuruş farklarına yol açar. Muhasebe kayıtları ile banka ekstresi arasında 1 kuruşluk fark bile mutabakat sorununa dönüşür.",
        "Örneğin iki ürünün fiyatı 1,10 TL ve 2,20 TL olsun. Double ile toplandığında 1.1 + 2.2 işlemi 3.3000000000000003 verir; 0.1 + 0.7 ise 0.7999999999999999 çıkar. Bu sonuçlar karşılaştırmaya girerse \"toplam 3,30 TL'ye eşit mi?\" sorusu yanlış cevaplanır. Aynı hesabı kuruş cinsinden yaparsanız 110 + 220 = 330 kuruş, yani tam 3,30 TL bulursunuz. Bu nedenle e-ticaret ve muhasebe yazılımları tutarları ya tam sayı kuruş ya da decimal türüyle tutar; KDV gibi oranlı hesaplarda da yuvarlama, mevzuatın öngördüğü noktada ve açık bir kuralla yapılır."
      ]
    },
    {
      h: "Araçlarla kayan noktayı inceleme",
      ol: [
        "[[arac:ieee754-cevir|IEEE 754 Çevirici]]ye 0.1 yazın; işaret, üs ve kesir bitlerini, onaltılık kodu ve saklanan tam değeri görün.",
        "Tek duyarlık ile çift duyarlık arasında geçiş yaparak hassasiyet farkını karşılaştırın.",
        "Tam sayıların ikilik karşılığını [[arac:ikili-ondalik-cevir|İkili Ondalık Çevirici]] ile, onaltılık ve diğer tabanları [[arac:sayi-tabani-donustur|Sayı Tabanı Dönüştürücü]] ile kontrol edin.",
        "Sonucu belirli bir basamağa yuvarlamanız gerekiyorsa yuvarlama aracında farklı yöntemleri deneyin."
      ],
      after: [
        "Bu araçlar tamamen tarayıcınızda çalışır; yazdığınız sayılar ya da kodlar hiçbir yere gönderilmez. Onaltılık gösterimin mantığını tazelemek için [[bilgi:onaltilik-hex-sayi-sistemi|onaltılık sayı sistemi]] yazısına da göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["0.1 + 0.2 neden tam 0.3 etmez?", "Çünkü 0.1 ve 0.2 ikilik sistemde sonsuza kadar tekrar eden kesirlerdir ve bilgisayar onları 52 bitte keserek yuvarlar. İki yuvarlanmış değerin toplamı, 0.3'ün saklanan değerinden bir adım büyük olan 0.30000000000000004'e düşer."],
    ["IEEE 754 standardı nedir?", "IEEE 754, ondalıklı sayıların bilgisayarda nasıl saklanacağını ve işleneceğini belirleyen uluslararası kayan nokta standardıdır. İşlemcilerin ve programlama dillerinin neredeyse tamamı bu standardı kullandığı için sonuçlar farklı sistemlerde aynı çıkar."],
    ["Float ile double arasındaki fark nedir?", "Float 32 bit kullanır ve yaklaşık 7 anlamlı basamak tutar; double 64 bit kullanır ve 15 ile 17 anlamlı basamak tutar. Double ayrıca çok daha geniş bir sayı aralığını temsil edebilir ve genel programlamada varsayılan türdür."],
    ["Ondalık sayılar ikilik sistemde nasıl saklanır?", "Sayı önce ikilik tabana çevrilir, sonra 1,xxx × 2 üzeri n biçiminde normalleştirilir. İşaret biti, sapma eklenmiş üs ve virgülden sonraki bitler ayrı alanlara yazılır; sığmayan bitler en yakın değere yuvarlanır."],
    ["Kayan nokta hatası nasıl önlenir?", "Sayıları doğrudan eşitlikle karşılaştırmak yerine küçük bir tolerans kullanın, yuvarlamayı yalnızca gösterimde yapın, mümkünse tam sayı birimlerine geçin ya da onluk tabanda çalışan decimal türünü tercih edin."],
    ["Para hesaplarında neden float kullanılmamalı?", "Kuruş gibi onluk kesirler ikilik sistemde tam saklanamadığı için çok sayıda işlemde kuruş farkları birikir. Tutarları tam sayı kuruş ya da decimal türüyle saklamak, toplamların her zaman beklenen değeri vermesini sağlar."],
    ["İşaret, üs ve mantis ne demek?", "İşaret biti sayının pozitif mi negatif mi olduğunu, üs sayının 2'nin kaçıncı kuvvetiyle ölçekleneceğini, mantis ise anlamlı basamakları tutar. Değer, işaret çarpı 1,mantis çarpı 2 üzeri gerçek üs formülüyle bulunur."],
    ["NaN ve Infinity nasıl gösterilir?", "Üs bitlerinin tamamı 1 olduğunda özel değerler oluşur: kesir sıfırsa artı ya da eksi sonsuz, sıfır değilse NaN elde edilir. Sıfıra bölme sonsuzu, sıfırın sıfıra bölünmesi ya da negatif sayının karekökü NaN'ı verir."],
    ["JavaScript'te 0.1 + 0.2 === 0.3 neden false döner?", "JavaScript'teki tüm sayılar IEEE 754 double'dır ve toplam 0.30000000000000004 olarak hesaplanır. Bu değer 0.3'ün saklanan değerinden farklı bit desenine sahip olduğu için katı eşitlik false verir; fark Number.EPSILON düzeyindedir."]
  ],
  tools: ["ieee754-cevir", "ikili-ondalik-cevir", "yuvarlama-hesapla", "sayi-tabani-donustur"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "onaltilik-hex-sayi-sistemi", "devirli-ondalik-sayi-kesre-cevirme"],
  sources: [
    ["IEEE – 754-2019 Kayan Nokta Aritmetiği Standardı", "https://standards.ieee.org/ieee/754/6210/"]
  ]
};
