export default {
  slug: "dogalgaz-faturasi-ve-kombi-kapasitesi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Doğalgaz Faturası Nasıl Hesaplanır? m³–kWh ve Kombi Kaç kW Olmalı",
  pageTitle: "Doğalgaz Faturası Hesaplama: m³–kWh, Kademe ve Kombi Kapasitesi",
  description: "Doğalgaz faturası m³ tüketimin kWh'e çevrilip birim fiyatla çarpılmasıyla bulunur. 1 m³ kaç kWh, kademeli tarife, kombi kW seçimi ve petek dilimi hesabı.",
  keywords: ["doğalgaz faturası hesaplama", "doğalgaz m3 kwh çevirme", "1 m3 doğalgaz kaç kwh", "kombi kaç kw olmalı", "doğalgaz kademe sınırı", "petek dilimi hesaplama", "kombi kaç derecede tasarruf"],
  lead: "Doğalgaz faturası, sayacınızdaki <strong>metreküp (m³)</strong> tüketimin dağıtım şirketinin dönüşüm katsayısıyla <strong>kilovatsaate (kWh)</strong> çevrilmesi ve birim fiyatla çarpılmasıyla hesaplanır; 1 m³ doğalgaz yaklaşık 10,6 kWh enerji verir. Bu sayfada m³–kWh dönüşümünü, faturadaki kalemleri, 2026'da başlayan kademeli fiyat uygulamasının mantığını, evinize kaç kW kombi gerektiğini, petek dilimi hesabını ve faturayı düşüren ayarları örneklerle anlatıyoruz.",
  kisaCevap: [
    "Tüketim (kWh) = sayaç farkı (m³) × dönüşüm katsayısı; katsayı genellikle 10,5–10,7 kWh/m³ arasındadır.",
    "Fatura tutarı yaklaşık olarak kWh × vergiler dahil birim fiyat ile bulunur.",
    "Kombi kapasitesi kaba hesapla ısıtılan alan × 100–150 W/m² ile bulunur; çoğu daire için 20–28 kW kombiler yeterlidir.",
    "1 kW = 860 kcal/saat; 24 kW kombi saatte en fazla yaklaşık 20.640 kcal ısı üretir.",
    "Oda sıcaklığını 1 °C düşürmek ısıtma tüketimini kabaca %5–7 azaltır.",
    "Nisan 2026'dan itibaren konutlarda il bazlı aylık tüketim limitine bağlı iki kademeli fiyat uygulanmaktadır."
  ],
  figure: {
    alt: "Doğalgaz faturasının hesaplanma akışı: 120 m³ sayaç tüketimi 10,64 katsayısıyla 1.276,8 kWh'e çevriliyor, örnek birim fiyatla tutar bulunuyor; altta daire büyüklüğüne göre önerilen kombi kapasiteleri.",
    caption: "Üst sıra fatura hesabının üç adımını, alt sıra ısıtılan alana göre kaba kombi kapasitesi seçimini gösterir. Birim fiyat örnektir; kendi faturanızdaki değeri kullanın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Faturanın üç adımı</text>
  <rect x="20" y="52" width="200" height="96" rx="10" class="sf sb"/>
  <text x="120" y="80" class="sm mid mu">1. Sayaç farkı</text>
  <text x="120" y="114" class="xl mid">120 m³</text>
  <text x="120" y="136" class="sm mid t2">bu ay − geçen ay</text>
  <rect x="260" y="52" width="200" height="96" rx="10" class="ps"/>
  <text x="360" y="80" class="sm mid t2">2. × 10,64 kWh/m³</text>
  <text x="360" y="114" class="xl mid">1.276,8 kWh</text>
  <text x="360" y="136" class="sm mid t2">enerji miktarı</text>
  <rect x="500" y="52" width="200" height="96" rx="10" class="p"/>
  <text x="600" y="80" class="sm mid sf">3. × 1,60 TL/kWh (örnek)</text>
  <text x="600" y="114" class="xl mid sf">2.042,88 TL</text>
  <text x="600" y="136" class="sm mid sf">vergiler dahil tutar</text>
  <line x1="222" y1="100" x2="256" y2="100" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <line x1="462" y1="100" x2="496" y2="100" class="sp sw" fill="none" marker-end="url(#ok1)"/>
  <text x="360" y="196" class="lg b mid">Kaç kW kombi? (alan × 100–150 W/m²)</text>
  <g class="mid">
    <rect x="20" y="214" width="160" height="110" rx="10" class="sf sb"/>
    <text x="100" y="244" class="b">80 m²</text><text x="100" y="276" class="xl p">8–12 kW</text><text x="100" y="304" class="sm mu">ısıtma ihtiyacı</text>
    <rect x="193" y="214" width="160" height="110" rx="10" class="sf sb"/>
    <text x="273" y="244" class="b">120 m²</text><text x="273" y="276" class="xl p">12–18 kW</text><text x="273" y="304" class="sm mu">ısıtma ihtiyacı</text>
    <rect x="366" y="214" width="160" height="110" rx="10" class="sf sb"/>
    <text x="446" y="244" class="b">160 m²</text><text x="446" y="276" class="xl p">16–24 kW</text><text x="446" y="304" class="sm mu">ısıtma ihtiyacı</text>
    <rect x="539" y="214" width="161" height="110" rx="10" class="oks"/>
    <text x="619" y="244" class="b">Sıcak su</text><text x="619" y="276" class="xl ok">≥ 24 kW</text><text x="619" y="304" class="sm t2">anlık su için</text>
  </g>
  <rect x="20" y="344" width="680" height="60" rx="10" class="sf sb"/>
  <text x="40" y="370" class="sm b">Not: Kombi gücü çoğu zaman ısıtmadan değil, anlık sıcak su ihtiyacından belirlenir.</text>
  <text x="40" y="392" class="sm t2">İyi yalıtımlı ev alt değere, yalıtımsız ve çatı katı ev üst değere yakındır.</text>
</svg>`
  },
  sections: [
    {
      h: "Doğalgaz neden m³ ile ölçülüp kWh ile faturalanır?",
      p: [
        "Sayacınız evinizden geçen gazın <strong>hacmini</strong> metreküp olarak ölçer. Ancak aynı hacimdeki gazın verdiği ısı; gazın bileşimine, basıncına ve sıcaklığına göre küçük farklar gösterir. Adil bir faturalama için hacim, gazın gerçek enerji içeriğini gösteren kilovatsaate çevrilir ve ödeme bu enerji üzerinden yapılır.",
        "Dönüşümde iki değer kullanılır: gazın 1 m³'ünün verdiği ısıyı gösteren <strong>üst ısıl değer</strong> (kcal/m³) ve basınç-sıcaklık farkını düzelten <strong>düzeltme katsayısı</strong>. Bu değerler dağıtım bölgesine ve aya göre değişir ve faturanızda yazılıdır. Türkiye'de pratik hesaplarda 1 m³ için yaklaşık 10,64 kWh kullanılır."
      ],
      formula: "Tüketim (kWh) = sayaç farkı (m³) × düzeltme katsayısı × üst ısıl değer (kcal/m³) ÷ 860\nPratik kısayol: kWh ≈ m³ × 10,64\nTutar ≈ kWh × vergiler dahil birim fiyat (TL/kWh)",
      after: [
        "Metreküpü kWh'e ya da kWh'i metreküpe çevirmek için [[arac:dogalgaz-tuketim-hesapla|Doğalgaz Tüketim Hesaplama]] aracını kullanabilirsiniz; katsayıyı faturanızdaki değerle değiştirerek kendi bölgenize göre hesap yaparsınız."
      ]
    },
    {
      h: "Çözümlü örnek: 120 m³ tüketimin faturası",
      p: [
        "Aşağıdaki örnekte birim fiyat olarak vergiler dahil <strong>1,60 TL/kWh</strong> kullanılmıştır. Bu bir <em>örnek tutardır</em>; gerçek fiyat il, dönem ve kademeye göre değişir."
      ],
      ol: [
        "Sayaç okumalarını bulun: geçen ay 4.380 m³, bu ay 4.500 m³. Tüketim 4.500 − 4.380 = 120 m³'tür.",
        "Enerjiye çevirin: 120 × 10,64 = 1.276,8 kWh.",
        "Birim fiyatla çarpın: 1.276,8 × 1,60 = 2.042,88 TL.",
        "Günlük ortalamaya bakın: okuma dönemi 30 gün ise günde 4 m³ yani yaklaşık 42,6 kWh tüketmişsiniz demektir. Önceki aylarla bu günlük ortalamayı karşılaştırmak, okuma günü farklarından kaynaklanan yanılgıyı önler."
      ],
      after: [
        "Tersine hesap da yapılabilir: 1.500 TL'lik bir bütçe 1.500 ÷ 1,60 = 937,5 kWh eder; bu da 937,5 ÷ 10,64 ≈ 88 m³ gaza karşılık gelir."
      ]
    },
    {
      h: "Faturadaki kalemler ve kademeli fiyat uygulaması",
      p: [
        "Doğalgaz faturasında tüketim bedelinin yanında vergiler ve varsa önceki dönem farkları yer alır. Faturanızda m³ tüketim, dönüşüm katsayıları, kWh karşılığı, birim fiyat, vergiler ve toplam tutar ayrı ayrı yazar; hesaplarınızda bu değerleri esas almanız en doğrusudur.",
        "Nisan 2026'dan itibaren konut abonelerinde <strong>iki kademeli fiyat</strong> uygulaması başlamıştır. Enerji Piyasası Düzenleme Kurumu (EPDK) her il için aylık konut tüketim limitleri belirler; limitin altındaki tüketim birinci kademe, limitin aşılması durumunda ise daha yüksek ikinci kademe fiyatı uygulanır. Limitler aylara göre değişir; kış aylarında daha yüksek belirlenir.",
        "Limitin nasıl uygulandığı ve hangi tüketime hangi fiyatın yansıdığı BOTAŞ ve EPDK duyurularında ayrıntılı olarak yer alır. Kendi ilinizin o aya ait limitini dağıtım şirketinizin sitesinden ya da faturanızdaki bilgilendirmeden öğrenin ve aylık tüketiminizi bu sınırla karşılaştırın."
      ],
      ul: [
        "<strong>Limiti takip edin:</strong> Sayacınızı ayın ortasında okuyup günlük ortalamanızı hesaplarsanız ay sonunda limiti aşıp aşmayacağınızı önceden görürsünüz.",
        "<strong>Kış ayları kritik:</strong> Ocak ve şubatta tüketim yaz aylarının 5–10 katına çıkabilir; ayar değişiklikleri en çok bu aylarda fark yaratır."
      ]
    },
    {
      h: "Evim için kaç kW kombi gerekir?",
      p: [
        "Kombi seçiminde iki ihtiyaç vardır: evin <strong>ısıtma yükü</strong> ve <strong>anlık sıcak su</strong>. Isıtma yükü evin metrekaresine, yalıtımına, bulunduğu iklim bölgesine, kat konumuna ve tavan yüksekliğine bağlıdır. Kaba bir hesap için ısıtılan alanı metrekare başına 100–150 W ile çarpabilirsiniz; iyi yalıtımlı ara kat dairelerde alt değer, yalıtımsız, çatı katı ya da soğuk iklimdeki evlerde üst değer kullanılır."
      ],
      formula: "Isıtma yükü (W) ≈ ısıtılan alan (m²) × 100–150 W/m²\nkcal/saat = kW × 860",
      table: {
        head: ["Isıtılan alan", "Isıtma yükü (yaklaşık)", "kcal/saat karşılığı", "Pratikte seçilen kombi"],
        rows: [
          ["60–90 m²", "6–13,5 kW", "5.200–11.600", "20–24 kW"],
          ["90–130 m²", "9–19,5 kW", "7.700–16.800", "24 kW"],
          ["130–180 m²", "13–27 kW", "11.200–23.200", "24–28 kW"],
          ["180–250 m²", "18–37,5 kW", "15.500–32.300", "30–35 kW ya da çift kazan"]
        ],
        caption: "Değerler kaba tahmindir. Kesin seçim için yetkili tesisatçının ısı kaybı hesabı yapması gerekir."
      },
      after: [
        "Tabloda dikkat çeken nokta, küçük dairelerde bile 20–24 kW kombi seçilmesidir. Bunun nedeni sıcak su ihtiyacıdır: duşta konforlu bir akış için suyu anlık olarak 25–30 derece ısıtmak yüksek güç gerektirir. Gereğinden çok büyük kombi ise sık açıp kapanarak verimi düşürebilir; modülasyonlu (gücünü ayarlayabilen) yoğuşmalı modeller bu sorunu azaltır. Evinizin ısıtma yükünü yalıtım ve iklim bilgisiyle hesaplamak için [[arac:kombi-kapasite-hesapla|Kombi Kapasite Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Petek dilimi ve radyatör boyu nasıl hesaplanır?",
      p: [
        "Her odanın ısı ihtiyacı ayrı hesaplanır. Önce odanın hacmi bulunur, sonra metreküp başına gereken ısı ile çarpılır. Çıkan değer, seçilen radyatörün katalogdaki ısı verimine bölünerek dilim sayısı ya da panel radyatör uzunluğu bulunur.",
        "Örnek: 4 m × 4 m ve 2,7 m tavan yüksekliğindeki bir oda 43,2 m³'tür. Orta yalıtımlı bir evde metreküp başına yaklaşık 50 kcal/saat alınırsa ihtiyaç 43,2 × 50 = 2.160 kcal/saat olur. Dilim başına 150 kcal/saat veren bir radyatörle 2.160 ÷ 150 = 14,4, yani 15 dilim gerekir."
      ],
      formula: "Oda ısı ihtiyacı (kcal/saat) = oda hacmi (m³) × hacim başına ısı (kcal/m³·saat)\nDilim sayısı = ısı ihtiyacı ÷ bir dilimin ısı verimi (yukarı yuvarlanır)",
      ul: [
        "Dış cephesi fazla, kuzeye bakan ya da büyük pencereli odalarda hacim başına değeri artırın.",
        "Radyatör verimleri katalogda belirli bir su sıcaklığı için verilir; düşük sıcaklıkta çalışan yoğuşmalı sistemlerde gerçek verim daha düşük olabilir.",
        "Panel radyatörlerde dilim yerine metre başına watt değeri kullanılır; [[arac:petek-hesapla|Petek Hesaplama]] aracı gereken uzunluğu metre olarak verir."
      ]
    },
    {
      h: "Kombi kaç derecede kullanılmalı?",
      p: [
        "Kombide iki ayrı sıcaklık vardır: kalorifer (petek) suyu sıcaklığı ve oda sıcaklığı. Tasarrufta asıl belirleyici oda sıcaklığıdır. Gündüz yaşam alanlarında 20–21 °C, gece ve kullanılmayan odalarda 17–18 °C çoğu kişi için konforlu ve ekonomik bir aralıktır. Oda sıcaklığını 1 derece düşürmenin ısıtma tüketimini kabaca %5–7 azalttığı kabul edilir.",
        "Yoğuşmalı kombiler, dönüş suyu düşük sıcaklıkta olduğunda baca gazındaki su buharının ısısını geri kazanır. Bu yüzden petek suyunu 50–60 °C civarında tutmak, onu 75–80 °C'ye çıkarmaktan daha verimlidir. Çok soğuk günlerde ev ısınmıyorsa kısa süreli artırma yapılabilir. Oda termostatı kullanmak, kombinin yalnızca ihtiyaç olduğunda çalışmasını sağlayarak en kolay tasarruf yöntemidir."
      ]
    },
    {
      h: "Isı yalıtımı ve doğalgaz mı elektrik mi?",
      p: [
        "Isının büyük bölümü dış duvarlardan, pencerelerden ve çatıdan kaybolur. Dış cephe yalıtımı ve çift camlı pencereler, yalıtımsız bir binada ısıtma ihtiyacını belirgin biçimde düşürür; kazanç binanın mevcut durumuna göre değiştiği için kesin bir yüzde vermek doğru değildir. Duvarınızın ısı kaybını malzeme ve kalınlığa göre görmek için [[arac:isi-kaybi-hesapla|Isı Kaybı Hesaplama]] aracı yalıtımın etkisini sayısal olarak gösterir.",
        "Doğalgaz ile elektrikli ısıtıcıyı karşılaştırırken kWh başına ısı maliyetine bakın. Aşağıdaki tabloda <em>örnek</em> fiyatlar kullanılmıştır: doğalgaz için vergiler dahil 1,60 TL/kWh ve %92 kombi verimi, elektrik için 3,00 TL/kWh."
      ],
      table: {
        head: ["Isıtma yöntemi", "Verim", "1 kWh ısının maliyeti (örnek)"],
        rows: [
          ["Yoğuşmalı kombi (doğalgaz)", "%92", "1,60 ÷ 0,92 ≈ 1,74 TL"],
          ["Elektrikli ısıtıcı (yağlı, fanlı, infrared)", "%100", "3,00 TL"],
          ["Isı pompalı klima (ısıtma modunda, COP 3)", "%300", "3,00 ÷ 3 = 1,00 TL"]
        ],
        caption: "Elektrikli ısıtıcıların verimi yüksek görünse de elektriğin birim fiyatı daha yüksek olduğu için ısı maliyeti çoğu zaman doğalgazdan fazladır. Isı pompası ise dışarıdan ısı taşıdığı için en düşük maliyete sahip olabilir."
      }
    },
    {
      h: "Sayacı kendiniz okuyup tüketimi takip etmek",
      p: [
        "Faturanın gelmesini beklemeden tüketiminizi izlemek, hem kademe limitini aşmamak hem de ayar değişikliklerinin etkisini görmek için en pratik yoldur. Mekanik sayaçlarda siyah zemindeki rakamlar tam metreküpü, kırmızı zemindeki rakamlar ise metreküpün ondalık kısmını gösterir. Kartlı sayaçlarda ekranda kalan kredi ve toplam tüketim dönüşümlü olarak görüntülenir.",
        "Haftada bir aynı gün ve saatte sayacı okuyup not edin. İki okuma arasındaki farkı gün sayısına bölerek günlük ortalamayı bulun. Örneğin pazartesi 4.410 m³, ertesi pazartesi 4.438 m³ okuduysanız haftalık tüketim 28 m³, günlük ortalama 4 m³ olur. Bu hızla 30 günde 120 m³ tüketeceğinizi önceden bilirsiniz.",
        "Termostatı 1 derece düşürdüğünüz haftayı önceki haftayla karşılaştırırsanız ayarın gerçek etkisini kendi evinizde ölçmüş olursunuz. Dış hava sıcaklığı da tüketimi etkilediği için karşılaştırmayı benzer hava koşullarındaki haftalar arasında yapmak daha doğru sonuç verir."
      ]
    },
    {
      h: "Faturayı yükselten sık hatalar",
      ul: [
        "<strong>Kombiyi tamamen kapatıp açmak:</strong> Çok soğuyan evi yeniden ısıtmak uzun süre tam güç gerektirir. Kısa süreli yokluklarda kapatmak yerine sıcaklığı düşürmek daha verimlidir.",
        "<strong>Petek önünü kapatmak:</strong> Kanepe, perde ya da kurutmalık peteğin ısıyı odaya yaymasını engeller; kombi daha uzun çalışır.",
        "<strong>Havası alınmamış petek:</strong> Üst kısmı soğuk kalan peteklerde hava vardır; havasını almak ısı verimini artırır.",
        "<strong>Bakımsız kombi:</strong> Yıllık bakımı yapılmayan cihazda yanma ayarı bozulabilir ve tüketim artar.",
        "<strong>Okuma dönemini göz ardı etmek:</strong> 35 günlük bir faturayı 28 günlük önceki faturayla doğrudan karşılaştırmak yanıltıcıdır; günlük ortalamaya bakın."
      ]
    }
  ],
  faq: [
    ["Doğalgaz faturası nasıl hesaplanır?", "Sayaçtaki iki okuma arasındaki m³ farkı, düzeltme katsayısı ve üst ısıl değerle kWh'e çevrilir. Bu enerji miktarı vergiler dahil birim fiyatla çarpılır. Pratikte m³ × 10,64 × birim fiyat yaklaşık sonucu verir."],
    ["1 m³ doğalgaz kaç kWh eder?", "Türkiye'de 1 m³ doğalgaz ortalama 10,64 kWh civarında enerji verir. Gerçek değer dağıtım bölgesine ve aya göre 10,5 ile 10,7 arasında değişir ve faturanızda katsayı olarak gösterilir."],
    ["Doğalgazda kademeli tarife nedir?", "Nisan 2026'dan itibaren konutlarda il bazlı aylık tüketim limitine bağlı iki farklı fiyat uygulanır. Limit içindeki tüketim birinci kademe, limiti aşan durumda ise daha yüksek ikinci kademe fiyatından faturalanır; limitler EPDK tarafından belirlenir."],
    ["Kaç metrekare ev için kaç kW kombi gerekir?", "Kaba hesapla ısıtılan alan metrekare başına 100–150 W ile çarpılır. 100 m²'lik bir daire için ısıtma ihtiyacı 10–15 kW çıkar, ancak sıcak su konforu için genellikle 24 kW kombi tercih edilir."],
    ["Petek dilimi nasıl hesaplanır?", "Odanın hacmi metreküp başına gereken ısıyla çarpılarak kcal/saat cinsinden ihtiyaç bulunur. Bu değer bir dilimin katalogdaki ısı verimine bölünür ve sonuç yukarı yuvarlanarak dilim sayısı elde edilir."],
    ["Kombi kaç derecede kullanılmalı?", "Oda sıcaklığı için gündüz 20–21 °C, gece 17–18 °C çoğu ev için yeterlidir. Yoğuşmalı kombilerde petek suyunu 50–60 °C aralığında tutmak yoğuşmayı artırarak verimi yükseltir."],
    ["Isı yalıtımı faturayı ne kadar düşürür?", "Kazanç binanın mevcut durumuna bağlıdır; yalıtımsız dış cephe, tek cam ve yalıtımsız çatıya sahip binalarda düşüş belirgin olur. Kesin oran için duvarların U değeri ve ısı kaybı hesabı yapılmalıdır."],
    ["Doğalgaz mı elektrikli ısıtıcı mı daha ucuz?", "Genellikle doğalgaz daha ucuzdur, çünkü elektriğin kWh fiyatı doğalgazın birkaç katıdır. Isı pompalı klimalar ise bir birim elektrikle üç birime kadar ısı taşıyabildiği için bazı durumlarda doğalgazla yarışabilir."],
    ["Doğalgaz faturam neden geçen aydan yüksek geldi?", "En sık nedenler hava sıcaklığının düşmesi, okuma döneminin daha uzun olması, kademe limitinin aşılması ve fiyat güncellemesidir. Günlük ortalama m³ tüketimini karşılaştırarak gerçek bir artış olup olmadığını görebilirsiniz."]
  ],
  tools: ["dogalgaz-tuketim-hesapla", "kombi-kapasite-hesapla", "petek-hesapla", "isi-kaybi-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir"],
  sources: [
    ["EPDK – Doğal gaz piyasası", "https://www.epdk.gov.tr/"],
    ["BOTAŞ – Tarifeler ve duyurular", "https://www.botas.gov.tr/"]
  ]
};
