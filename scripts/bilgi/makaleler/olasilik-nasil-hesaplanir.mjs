export default {
  slug: "olasilik-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Olasılık Nasıl Hesaplanır? Formül, Zar ve Para Örnekleri ile Konu Anlatımı",
  pageTitle: "Olasılık Nasıl Hesaplanır? Formül, Zar ve Para Örnekleri",
  description: "Olasılık = istenen durum sayısı ÷ tüm durum sayısı. İki zarda toplam 7, iki parada iki yazı, tümleyen, bağımsız olaylar ve koşullu olasılık çözümlü örneklerle.",
  keywords: ["olasılık nasıl hesaplanır", "olasılık formülü", "zar olasılığı", "iki zar toplamı olasılık", "bağımsız olaylar olasılığı", "koşullu olasılık", "tümleyen olay", "örnek uzay nedir"],
  lead: "Bir olayın olasılığı, <strong>istenen durumların sayısının tüm olası durumların sayısına bölünmesiyle</strong> bulunur: P(A) = s(A) ÷ s(E). Bu formül, tüm sonuçların eşit şansa sahip olduğu deneylerde geçerlidir. Bir zar atıldığında 4 gelme olasılığı 1/6, iki zar atıldığında toplamın 7 gelme olasılığı 6/36 = 1/6'dır. Olasılık her zaman 0 ile 1 arasındadır. Bu yazıda örnek uzayı, tümleyen olayı, bağımsız olaylarda çarpma kuralını, birleşim formülünü ve koşullu olasılığı 8. sınıf, TYT ve AYT düzeyinde çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Olasılık formülü: P(A) = istenen durum sayısı ÷ tüm durum sayısı = s(A) ÷ s(E).",
    "Olasılık 0 ile 1 arasındadır: imkânsız olayın olasılığı 0, kesin olayın olasılığı 1'dir.",
    "Tümleyen kuralı: bir olayın olmama olasılığı 1 − P(A)'dır.",
    "Bağımsız olaylarda olasılıklar çarpılır: P(A ve B) = P(A) × P(B).",
    "Birleşim: P(A veya B) = P(A) + P(B) − P(A ve B).",
    "Koşullu olasılık: P(A | B) = P(A ve B) ÷ P(B)."
  ],
  figure: {
    alt: "İki zarın 36 sonucunu gösteren 6'ya 6 tablo; toplamı 7 olan 6 kare vurgulanmış. Yanında toplamların 2'den 12'ye kaç farklı yolla oluştuğunu gösteren çubuk grafik; en sık toplam 7.",
    caption: "Soldaki tabloda satır birinci zarı, sütun ikinci zarı gösterir; her hücre iki zarın toplamıdır. 36 eşit olası sonucun 6'sında toplam 7 olduğu için olasılık 6/36 = 1/6'dır. Sağdaki grafik her toplamın kaç yolla oluştuğunu gösterir.",
    svg: `<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">İki zar: toplam 7 gelme olasılığı</text>
  <g class="sm mid b mu">
    <text x="81" y="72">1</text><text x="123" y="72">2</text><text x="165" y="72">3</text><text x="207" y="72">4</text><text x="249" y="72">5</text><text x="291" y="72">6</text>
    <text x="46" y="103">1</text><text x="46" y="139">2</text><text x="46" y="175">3</text><text x="46" y="211">4</text><text x="46" y="247">5</text><text x="46" y="283">6</text>
  </g>
<rect x="60" y="80" width="42" height="36" class="sf sb"/><text x="81" y="103" class="sm mid">2</text><rect x="102" y="80" width="42" height="36" class="sf sb"/><text x="123" y="103" class="sm mid">3</text><rect x="144" y="80" width="42" height="36" class="sf sb"/><text x="165" y="103" class="sm mid">4</text><rect x="186" y="80" width="42" height="36" class="sf sb"/><text x="207" y="103" class="sm mid">5</text><rect x="228" y="80" width="42" height="36" class="sf sb"/><text x="249" y="103" class="sm mid">6</text><rect x="270" y="80" width="42" height="36" class="p"/><text x="291" y="103" class="sm mid sf b">7</text>
<rect x="60" y="116" width="42" height="36" class="sf sb"/><text x="81" y="139" class="sm mid">3</text><rect x="102" y="116" width="42" height="36" class="sf sb"/><text x="123" y="139" class="sm mid">4</text><rect x="144" y="116" width="42" height="36" class="sf sb"/><text x="165" y="139" class="sm mid">5</text><rect x="186" y="116" width="42" height="36" class="sf sb"/><text x="207" y="139" class="sm mid">6</text><rect x="228" y="116" width="42" height="36" class="p"/><text x="249" y="139" class="sm mid sf b">7</text><rect x="270" y="116" width="42" height="36" class="sf sb"/><text x="291" y="139" class="sm mid">8</text>
<rect x="60" y="152" width="42" height="36" class="sf sb"/><text x="81" y="175" class="sm mid">4</text><rect x="102" y="152" width="42" height="36" class="sf sb"/><text x="123" y="175" class="sm mid">5</text><rect x="144" y="152" width="42" height="36" class="sf sb"/><text x="165" y="175" class="sm mid">6</text><rect x="186" y="152" width="42" height="36" class="p"/><text x="207" y="175" class="sm mid sf b">7</text><rect x="228" y="152" width="42" height="36" class="sf sb"/><text x="249" y="175" class="sm mid">8</text><rect x="270" y="152" width="42" height="36" class="sf sb"/><text x="291" y="175" class="sm mid">9</text>
<rect x="60" y="188" width="42" height="36" class="sf sb"/><text x="81" y="211" class="sm mid">5</text><rect x="102" y="188" width="42" height="36" class="sf sb"/><text x="123" y="211" class="sm mid">6</text><rect x="144" y="188" width="42" height="36" class="p"/><text x="165" y="211" class="sm mid sf b">7</text><rect x="186" y="188" width="42" height="36" class="sf sb"/><text x="207" y="211" class="sm mid">8</text><rect x="228" y="188" width="42" height="36" class="sf sb"/><text x="249" y="211" class="sm mid">9</text><rect x="270" y="188" width="42" height="36" class="sf sb"/><text x="291" y="211" class="sm mid">10</text>
<rect x="60" y="224" width="42" height="36" class="sf sb"/><text x="81" y="247" class="sm mid">6</text><rect x="102" y="224" width="42" height="36" class="p"/><text x="123" y="247" class="sm mid sf b">7</text><rect x="144" y="224" width="42" height="36" class="sf sb"/><text x="165" y="247" class="sm mid">8</text><rect x="186" y="224" width="42" height="36" class="sf sb"/><text x="207" y="247" class="sm mid">9</text><rect x="228" y="224" width="42" height="36" class="sf sb"/><text x="249" y="247" class="sm mid">10</text><rect x="270" y="224" width="42" height="36" class="sf sb"/><text x="291" y="247" class="sm mid">11</text>
<rect x="60" y="260" width="42" height="36" class="p"/><text x="81" y="283" class="sm mid sf b">7</text><rect x="102" y="260" width="42" height="36" class="sf sb"/><text x="123" y="283" class="sm mid">8</text><rect x="144" y="260" width="42" height="36" class="sf sb"/><text x="165" y="283" class="sm mid">9</text><rect x="186" y="260" width="42" height="36" class="sf sb"/><text x="207" y="283" class="sm mid">10</text><rect x="228" y="260" width="42" height="36" class="sf sb"/><text x="249" y="283" class="sm mid">11</text><rect x="270" y="260" width="42" height="36" class="sf sb"/><text x="291" y="283" class="sm mid">12</text>
  <text x="186" y="322" class="sm mid t2">Satır: 1. zar · Sütun: 2. zar</text>
  <text x="531" y="62" class="sm mid b">Toplamı oluşturan yol sayısı</text>
  <line x1="374" y1="300" x2="688" y2="300" class="st" fill="none"/>
<rect x="380" y="264" width="22" height="36" class="ps"/><text x="391" y="318" class="sm mid">2</text><rect x="408" y="228" width="22" height="72" class="ps"/><text x="419" y="318" class="sm mid">3</text><rect x="436" y="192" width="22" height="108" class="ps"/><text x="447" y="318" class="sm mid">4</text><rect x="464" y="156" width="22" height="144" class="ps"/><text x="475" y="318" class="sm mid">5</text><rect x="492" y="120" width="22" height="180" class="ps"/><text x="503" y="318" class="sm mid">6</text><rect x="520" y="84" width="22" height="216" class="p"/><text x="531" y="318" class="sm mid">7</text><rect x="548" y="120" width="22" height="180" class="ps"/><text x="559" y="318" class="sm mid">8</text><rect x="576" y="156" width="22" height="144" class="ps"/><text x="587" y="318" class="sm mid">9</text><rect x="604" y="192" width="22" height="108" class="ps"/><text x="615" y="318" class="sm mid">10</text><rect x="632" y="228" width="22" height="72" class="ps"/><text x="643" y="318" class="sm mid">11</text><rect x="660" y="264" width="22" height="36" class="ps"/><text x="671" y="318" class="sm mid">12</text>
  <text x="531" y="78" class="sm mid b p">6 yol</text>
  <rect x="40" y="338" width="640" height="40" rx="8" class="oks"/>
  <text x="360" y="363" class="b mid">P(toplam 7) = 6 ÷ 36 = 1/6 ≈ %16,7</text>
</svg>`
  },
  sections: [
    {
      h: "Olasılık nedir? Temel kavramlar",
      p: [
        "Olasılık, bir olayın gerçekleşme şansının 0 ile 1 arasında bir sayıyla ifade edilmesidir. Konuyu anlamak için dört kavramı bilmek yeterlidir:"
      ],
      ul: [
        "<strong>Deney:</strong> Sonucu önceden kesin bilinmeyen işlem; zar atmak, para atmak, torbadan bilye çekmek.",
        "<strong>Çıktı:</strong> Deneyin olası her bir sonucu; zar için 1, 2, 3, 4, 5 ya da 6.",
        "<strong>Örnek uzay (E):</strong> Tüm çıktıların kümesi. Tek zar için E = {1, 2, 3, 4, 5, 6}, s(E) = 6.",
        "<strong>Olay (A):</strong> Örnek uzayın bir alt kümesi. \"Çift sayı gelmesi\" olayı A = {2, 4, 6}, s(A) = 3."
      ],
      after: [
        "Olasılığın yorumu basittir: P(A) = 1/2 ise deney çok kez tekrarlandığında olayın yaklaşık her iki denemeden birinde gerçekleşmesi beklenir. Bu, tek bir denemenin sonucunu garanti etmez; olasılık uzun dönemli sıklığı anlatır."
      ]
    },
    {
      h: "Olasılık formülü ve neden 0 ile 1 arasında olduğu",
      formula: "P(A) = s(A) ÷ s(E) = istenen durum sayısı ÷ tüm durum sayısı\n0 ≤ P(A) ≤ 1\nP(imkânsız olay) = 0 · P(kesin olay) = 1",
      p: [
        "İstenen durumlar tüm durumların bir parçası olduğu için pay hiçbir zaman paydadan büyük olamaz; bu yüzden olasılık 1'i geçmez. Pay en az 0 olabileceği için olasılık eksi de olamaz. Tek zarda 7 gelme olasılığı 0/6 = 0'dır (imkânsız olay), 7'den küçük bir sayı gelme olasılığı 6/6 = 1'dir (kesin olay).",
        "Formülün geçerli olması için örnek uzaydaki her çıktının <strong>eşit olasılıklı</strong> olması gerekir. Hileli bir zarda ya da \"yarın yağmur yağar mı\" gibi eşit olasılıklı olmayan durumlarda bu basit oran kullanılamaz. Sonucu kesir, ondalık ya da yüzde olarak yazabilirsiniz: 1/4 = 0,25 = %25. [[arac:olasilik-hesapla|Olasılık Hesaplama]] aracı üç biçimi birlikte gösterir."
      ]
    },
    {
      h: "Zar ve para örnekleri",
      ol: [
        "<strong>Tek zar, asal sayı:</strong> Asal sayılar {2, 3, 5}. P = 3/6 = <strong>1/2</strong>.",
        "<strong>Tek zar, 4'ten büyük:</strong> {5, 6}. P = 2/6 = <strong>1/3</strong>.",
        "<strong>İki para, iki yazı:</strong> Örnek uzay {YY, YT, TY, TT}, s(E) = 4. İstenen {YY}. P = <strong>1/4</strong>.",
        "<strong>İki para, bir yazı bir tura:</strong> {YT, TY}. P = 2/4 = <strong>1/2</strong>. YT ile TY farklı çıktılardır; bu yüzden olasılık 1/3 değildir.",
        "<strong>İki zar, toplam 7:</strong> s(E) = 6 × 6 = 36. Toplamı 7 olanlar (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). P = 6/36 = <strong>1/6</strong>.",
        "<strong>İki zar, çift zar (aynı sayı):</strong> (1,1)'den (6,6)'ya 6 durum. P = 6/36 = <strong>1/6</strong>.",
        "<strong>İki zar, toplam en az 10:</strong> Toplam 10 (3 yol), 11 (2 yol), 12 (1 yol). P = 6/36 = <strong>1/6</strong>."
      ],
      after: [
        "İki zarlı sorularda en güvenli yöntem, şekildeki 6 × 6 tabloyu zihninizde canlandırmaktır. Toplamı s olan durum sayısı s ≤ 7 için s − 1, s ≥ 7 için 13 − s'dir. Farklı toplamları denemek için [[arac:iki-zar-olasilik-hesapla|İki Zar Olasılık Hesaplama]], üç ve daha fazla zar için [[arac:zar-olasiligi-hesapla|Zar Olasılığı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Tümleyen olay: olmama olasılığı",
      p: [
        "Bir A olayının gerçekleşmemesine A'nın tümleyeni denir ve A' ile gösterilir. A ve A' birlikte örnek uzayın tamamını oluşturduğu için olasılıklarının toplamı 1'dir: P(A') = 1 − P(A).",
        "Tümleyen kuralı özellikle \"en az bir\" içeren sorularda büyük kolaylık sağlar. \"En az bir\" olayının tümleyeni \"hiç\" olayıdır ve hiç olmama olasılığını hesaplamak çoğu zaman çok daha kolaydır."
      ],
      formula: "P(en az bir kez) = 1 − P(hiç)\nÖrnek: bir zar 4 kez atılıyor, en az bir 6 gelme olasılığı\n= 1 − (5/6)⁴ = 1 − 625/1296 = 671/1296 ≈ 0,518",
      after: [
        "Aynı mantıkla iki zar atıldığında en az birinin 6 gelme olasılığı 1 − (5/6)² = 1 − 25/36 = 11/36'dır. Bu sonuç, toplama ile bulunabilecek 1/6 + 1/6 = 12/36'dan farklıdır; çünkü (6,6) durumu iki kez sayılmış olurdu."
      ]
    },
    {
      h: "Bağımsız olaylar ve çarpma kuralı",
      p: [
        "Bir olayın gerçekleşmesi diğerinin olasılığını değiştirmiyorsa bu olaylara <strong>bağımsız olaylar</strong> denir. Paranın ilk atışta yazı gelmesi ikinci atışı etkilemez; iki zar birbirini etkilemez. Bağımsız olayların birlikte gerçekleşme olasılığı, olasılıkların çarpımıdır."
      ],
      formula: "Bağımsız A ve B için: P(A ∩ B) = P(A) × P(B)\nÖrnek: para yazı ve zar 6 → 1/2 × 1/6 = 1/12",
      after: [
        "Torbadan çekilişlerde dikkat edilmesi gereken nokta, çekilen topun geri konup konmadığıdır. Geri konursa çekilişler bağımsızdır; konmazsa ikinci çekilişin olasılığı birincinin sonucuna bağlıdır. Örneğin 3 kırmızı ve 5 mavi bilye bulunan torbadan geri koymadan iki bilye çekildiğinde ikisinin de kırmızı olma olasılığı 3/8 × 2/7 = 6/56 = <strong>3/28</strong>'dir. Geri koyarak çekilseydi 3/8 × 3/8 = 9/64 olurdu.",
        "Bir deney n kez tekrarlanıp tam k kez başarı olasılığı soruluyorsa [[arac:binom-dagilimi-hesapla|Binom Dağılımı Hesaplama]] aracını kullanabilirsiniz; bu hesap kombinasyon bilgisi gerektirir ve [[bilgi:permutasyon-ve-kombinasyon-farki|permütasyon ve kombinasyon]] yazısında anlatılır."
      ]
    },
    {
      h: "Birleşim kuralı: A veya B olasılığı",
      p: [
        "İki olaydan en az birinin gerçekleşme olasılığı, olasılıkların toplamından ortak kısmın çıkarılmasıyla bulunur. Ortak kısım çıkarılmazsa iki olayın birlikte gerçekleştiği durumlar iki kez sayılır."
      ],
      formula: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)\nAyrık olaylarda (ortak eleman yoksa): P(A ∪ B) = P(A) + P(B)",
      after: [
        "Örnek: Bir zar atılıyor. A = çift sayı {2, 4, 6}, B = 3'ten büyük {4, 5, 6}. Ortak kısım {4, 6}. P(A ∪ B) = 3/6 + 3/6 − 2/6 = 4/6 = <strong>2/3</strong>. Kontrol: A ∪ B = {2, 4, 5, 6}, yani 4 eleman."
      ]
    },
    {
      h: "Koşullu olasılık nedir?",
      p: [
        "Koşullu olasılık, bir olayın gerçekleştiği bilindiğinde başka bir olayın olasılığıdır ve P(A | B) ile gösterilir, \"B bilindiğine göre A'nın olasılığı\" diye okunur. Bilinen bilgi örnek uzayı daraltır: artık yalnızca B'nin içindeki durumlara bakılır."
      ],
      formula: "P(A | B) = P(A ∩ B) ÷ P(B) = s(A ∩ B) ÷ s(B)",
      ol: [
        "Bir zar atılıyor ve sonucun çift olduğu biliniyor. Sonucun 4'ten büyük olma olasılığı nedir?",
        "Yeni örnek uzay B = {2, 4, 6}, s(B) = 3.",
        "Bu kümede 4'ten büyük olan yalnızca 6 vardır: s(A ∩ B) = 1.",
        "P(A | B) = 1/3. Koşul verilmeseydi P(4'ten büyük) = 2/6 = 1/3 olurdu; bu örnekte sonuç tesadüfen aynıdır.",
        "İkinci örnek: iki zarın toplamı 8 olduğu biliniyor; zarlardan birinin 6 olma olasılığı. Toplamı 8 olanlar (2,6), (3,5), (4,4), (5,3), (6,2); 6 içerenler 2 tane. P = 2/5."
      ]
    },
    {
      h: "Deneysel ve teorik olasılık farkı",
      p: [
        "Buraya kadar anlattığımız hesaplar <strong>teorik olasılıktır</strong>: deneyi hiç yapmadan, örnek uzayı sayarak bulunur. <strong>Deneysel olasılık</strong> ise deney gerçekten yapıldığında olayın gözlenme sıklığıdır: olayın gerçekleştiği deneme sayısı ÷ toplam deneme sayısı. 8. sınıf müfredatında iki kavram birlikte işlenir.",
        "Bir parayı 20 kez attığınızda 12 yazı gelirse deneysel olasılık 12/20 = 0,6 olur; teorik olasılık ise 0,5'tir. Deneme sayısı arttıkça deneysel olasılık teorik değere yaklaşır. Bu ilke büyük sayılar yasası olarak bilinir. 1.000 atışta yazı sayısının 500'e yakın, ama büyük olasılıkla tam 500 olmayan bir değer çıkması beklenir."
      ],
      table: {
        head: ["Atış sayısı", "Gözlenen yazı (örnek)", "Deneysel olasılık", "Teorik olasılık"],
        rows: [
          ["10", "7", "0,70", "0,50"],
          ["100", "54", "0,54", "0,50"],
          ["1.000", "509", "0,509", "0,50"]
        ],
        caption: "Gözlenen değerler örnektir; her deneyde farklı çıkar, ama deneme arttıkça 0,50'ye yaklaşma eğilimi görülür."
      },
      after: [
        "Sınav sorusu \"deneyde\" ya da \"gözlemde\" diyorsa deneysel olasılık, \"olasılığı kaçtır\" diyorsa teorik olasılık istenir. Sonuçları kesir olarak sadeleştirmek için [[arac:kesir-hesapla|Kesir Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Sıralı çıktıları tek saymak:</strong> İki parada YT ve TY ayrı çıktılardır; örnek uzay 3 değil 4 elemanlıdır.",
        "<strong>\"En az bir\" sorusunda toplamak:</strong> Tümleyen kuralını kullanın: 1 − P(hiç).",
        "<strong>Bağımlı olayları çarpmak:</strong> Geri koymadan çekilişte ikinci olasılığın paydası bir azalır.",
        "<strong>Birleşimde ortak kısmı unutmak:</strong> Ortak elemanlar iki kez sayılır; P(A ∩ B)'yi çıkarın.",
        "<strong>Kumarbaz yanılgısı:</strong> Para art arda 5 kez yazı geldiyse altıncı atışta tura gelme olasılığı yine 1/2'dir; geçmiş atışlar bağımsız bir sonraki atışı etkilemez.",
        "<strong>Sadeleştirmeyi unutmak:</strong> 6/36 gibi sonuçları 1/6'ya sadeleştirin; şıklarda genellikle sadeleşmiş kesir yer alır ve sadeleştirilmemiş cevap yanlış şıkka benzeyebilir."
      ]
    }
  ],
  faq: [
    ["Olasılık nasıl hesaplanır?", "Eşit olasılıklı çıktılardan oluşan bir deneyde istenen durumların sayısı tüm olası durumların sayısına bölünür. Tek zar atıldığında çift sayı gelme olasılığı 3 bölü 6, yani 1/2'dir."],
    ["Olasılık formülü nedir?", "Olasılık formülü P(A) = s(A) ÷ s(E) şeklindedir. Burada s(A) istenen olayın eleman sayısını, s(E) örnek uzayın, yani tüm olası çıktıların sayısını gösterir; sonuç 0 ile 1 arasındadır."],
    ["İki zar atıldığında toplamın 7 gelme olasılığı kaçtır?", "İki zarın 36 eşit olası sonucu vardır ve bunlardan 6'sında toplam 7'dir: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Bu yüzden olasılık 6/36 = 1/6, yaklaşık yüzde 16,7'dir."],
    ["Para iki kez atılırsa iki yazı gelme olasılığı nedir?", "İki para atışının örnek uzayı YY, YT, TY ve TT olmak üzere dört elemanlıdır. Bunlardan yalnızca biri iki yazıdır; bu nedenle olasılık 1/4, yani yüzde 25'tir."],
    ["Bağımsız olaylarda olasılık nasıl çarpılır?", "Bir olayın sonucu diğerini etkilemiyorsa ikisinin birlikte gerçekleşme olasılığı tek tek olasılıkların çarpımıdır. Paranın yazı ve zarın 6 gelme olasılığı 1/2 çarpı 1/6, yani 1/12'dir."],
    ["Koşullu olasılık nedir?", "Koşullu olasılık, bir B olayının gerçekleştiği bilindiğinde A olayının olasılığıdır. P(A ∩ B) bölü P(B) ile hesaplanır; bilinen bilgi örnek uzayı yalnızca B'nin elemanlarına daraltır."],
    ["Olasılık neden 0 ile 1 arasındadır?", "İstenen durumlar tüm durumların bir alt kümesi olduğu için pay paydadan büyük olamaz ve eksi de olamaz. Bu yüzden imkânsız olayın olasılığı 0, kesin olayın olasılığı 1'dir."],
    ["Geri koymadan çekilişte olasılık nasıl hesaplanır?", "Her çekilişten sonra torbadaki toplam ve ilgili renkteki bilye sayısı bir azalır, olasılıklar bu güncel sayılarla çarpılır. 3 kırmızı ve 5 mavi bilyeden iki kırmızı çekme olasılığı 3/8 çarpı 2/7, yani 3/28'dir."],
    ["Deneysel olasılık ile teorik olasılık farkı nedir?", "Teorik olasılık örnek uzay sayılarak deney yapılmadan bulunur. Deneysel olasılık ise deney yapıldığında olayın gözlenme sıklığıdır; deneme sayısı arttıkça deneysel değer teorik değere yaklaşır."],
    ["Tümleyen olay nedir?", "Bir olayın gerçekleşmemesi o olayın tümleyenidir. Bir olay ile tümleyeninin olasılıkları toplamı 1 olduğundan olmama olasılığı 1 eksi P(A) ile bulunur; en az bir içeren sorularda çok kullanışlıdır."]
  ],
  tools: ["olasilik-hesapla", "iki-zar-olasilik-hesapla", "zar-olasiligi-hesapla", "binom-dagilimi-hesapla"],
  related: ["permutasyon-ve-kombinasyon-farki", "ortalama-medyan-mod-nedir", "oran-oranti-nasil-cozulur"],
  sources: [
    ["Millî Eğitim Bakanlığı – Matematik öğretim programları", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kılavuzları", "https://www.osym.gov.tr/"]
  ]
};
