export default {
  slug: "normalite-nedir-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Normalite Nedir, Nasıl Hesaplanır? Molarite ile Farkı ve Eşdeğer",
  pageTitle: "Normalite Nedir, Nasıl Hesaplanır? Molarite Farkı ve Eşdeğer",
  description: "Normalite, 1 litre çözeltideki eşdeğer gram sayısıdır: N = M × tesir değerliği. Eşdeğer kütle, H₂SO₄ örneği, 1 N HCl hazırlama ve titrasyonda N₁V₁ = N₂V₂.",
  keywords: ["normalite nedir", "normalite hesaplama", "normalite formülü", "eşdeğer gram nedir", "normalite molarite farkı", "1 n hcl nasıl hazırlanır", "titrasyon normalite", "tesir değerliği"],
  lead: "Normalite (N), bir litre çözeltide çözünmüş maddenin <strong>eşdeğer gram sayısıdır</strong> ve molarite ile tesir değerliğinin (eşdeğer sayısı) çarpımına eşittir: <strong>N = M × z</strong>. Bir mol H₂SO₄ iki mol H⁺ verebildiği için 0,1 M sülfürik asit çözeltisi 0,2 N'dir; HCl ise tek proton verdiği için 1 M HCl ile 1 N HCl aynıdır. Bu sayfada eşdeğer kütleyi, tesir değerliğinin asit, baz, tuz ve redoks tepkimelerinde nasıl bulunduğunu, normalite ile molarite farkını, titrasyonda N₁V₁ = N₂V₂ kullanımını ve 1 N HCl hazırlama hesabını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Normalite = eşdeğer gram sayısı / çözelti hacmi (L); birimi eşdeğer/L, kısaca N'dir.",
    "N = M × z; z tesir değerliği, yani bir molün verdiği ya da aldığı H⁺, OH⁻ ya da elektron sayısıdır.",
    "Eşdeğer kütle = mol kütlesi / z; H₂SO₄ için 98,08 / 2 = 49,04 g.",
    "HCl, NaOH, HNO₃ için z = 1 olduğundan normalite molariteye eşittir; H₂SO₄ ve Ca(OH)₂ için iki katıdır.",
    "Titrasyonda eşdeğerlik noktasında N₁ · V₁ = N₂ · V₂ geçerlidir; mol oranlarıyla uğraşmak gerekmez.",
    "Tesir değerliği tepkimeye bağlıdır; aynı madde farklı tepkimelerde farklı normaliteye sahip olabilir."
  ],
  figure: {
    alt: "Normalite hesap şeması: 4,9 gram sülfürik asit 500 mililitre çözeltide; mol kütlesi 98,08 gramdan 0,05 mol ve 0,1 molar, tesir değerliği 2 ile çarpılınca 0,2 normal; yanda HCl ve H₂SO₄ moleküllerinin verdiği H⁺ sayısı.",
    caption: "Aynı molaritede iki asit farklı normaliteye sahip olabilir: 0,1 M HCl tek H⁺ verdiği için 0,1 N, 0,1 M H₂SO₄ iki H⁺ verdiği için 0,2 N'dir. Normalite, tepkimeye giren \"aktif birim\" sayısını sayar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">4,9 g H₂SO₄ + su → 500 mL çözelti</text>
  <rect x="20" y="52" width="150" height="80" rx="10" class="sf sb"/>
  <text x="95" y="82" class="b mid">Kütle</text><text x="95" y="112" class="lg mid">4,9 g</text>
  <rect x="200" y="52" width="150" height="80" rx="10" class="sf sb"/>
  <text x="275" y="82" class="b mid">Mol</text><text x="275" y="104" class="sm mid">4,9 / 98,08</text><text x="275" y="124" class="b mid">0,05 mol</text>
  <rect x="380" y="52" width="150" height="80" rx="10" class="ps"/>
  <text x="455" y="82" class="b mid">Molarite</text><text x="455" y="104" class="sm mid">0,05 / 0,5 L</text><text x="455" y="124" class="b mid">0,1 M</text>
  <rect x="560" y="52" width="140" height="80" rx="10" class="p"/>
  <text x="630" y="82" class="b mid sf">Normalite</text><text x="630" y="104" class="sm mid sf">0,1 × 2</text><text x="630" y="124" class="b lg mid sf">0,2 N</text>
  <text x="185" y="98" class="b mid p">→</text><text x="365" y="98" class="b mid p">→</text><text x="545" y="98" class="b mid p">→</text>
  <text x="20" y="176" class="b">Tesir değerliği (z): bir mol kaç H⁺ verir?</text>
  <rect x="20" y="192" width="330" height="120" rx="10" class="sf sb"/>
  <text x="185" y="218" class="b mid">HCl → H⁺ + Cl⁻</text>
  <circle cx="185" cy="256" r="18" class="oks"/><text x="185" y="261" class="sm mid b">H⁺</text>
  <text x="185" y="298" class="sm mid">z = 1 → 0,1 M = 0,1 N</text>
  <rect x="370" y="192" width="330" height="120" rx="10" class="sf sb"/>
  <text x="535" y="218" class="b mid">H₂SO₄ → 2H⁺ + SO₄²⁻</text>
  <circle cx="510" cy="256" r="18" class="oks"/><text x="510" y="261" class="sm mid b">H⁺</text>
  <circle cx="560" cy="256" r="18" class="oks"/><text x="560" y="261" class="sm mid b">H⁺</text>
  <text x="535" y="298" class="sm mid">z = 2 → 0,1 M = 0,2 N</text>
  <rect x="20" y="332" width="680" height="70" rx="10" class="ps"/>
  <text x="40" y="358" class="b">Eşdeğer kütle = mol kütlesi / z</text>
  <text x="40" y="384" class="sm">H₂SO₄: 98,08 / 2 = 49,04 g · NaOH: 40,00 / 1 = 40,00 g · Ca(OH)₂: 74,09 / 2 = 37,05 g</text>
</svg>`
  },
  sections: [
    {
      h: "Normalite nedir?",
      p: [
        "Normalite, bir çözeltinin derişimini çözünen maddenin mol sayısıyla değil, tepkimede etkin olan <strong>eşdeğer</strong> sayısıyla ifade eden birimdir. Bir litre çözeltide 1 eşdeğer gram madde varsa çözelti 1 normaldir (1 N). Asit-baz tepkimelerinde bir eşdeğer, 1 mol H⁺ verebilen ya da 1 mol H⁺ ile tepkimeye girebilen madde miktarıdır; redoks tepkimelerinde ise 1 mol elektron alan ya da veren madde miktarıdır.",
        "Bu tanımın pratik faydası şudur: aynı normalitedeki asit ve baz çözeltileri eşit hacimlerde birbirini tam nötrleştirir. Bu yüzden normalite özellikle titrasyon hesaplarında, klasik analitik kimya laboratuvarlarında, su analizlerinde ve endüstriyel kalite kontrolde uzun süre yaygın kullanıldı. Bugün uluslararası kimya topluluğu (IUPAC) belirsizlik yaratabildiği için normalite yerine molariteyi ve açıkça yazılmış tepkime eşitliğini önermektedir; ancak birçok standart yöntemde ve hazır reaktif etiketinde normalite hâlâ karşınıza çıkar.",
        "Derişimin temel birimi olan molariteyi [[bilgi:molarite-nasil-hesaplanir|molarite nasıl hesaplanır]] yazısında, mol kavramını [[bilgi:mol-nedir-nasil-hesaplanir|mol nedir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Normalite nasıl hesaplanır? Formüller",
      p: [
        "Normaliteyi iki yoldan hesaplayabilirsiniz: eşdeğer gram sayısını doğrudan bularak ya da önce molariteyi hesaplayıp tesir değerliğiyle çarparak. İkisi de aynı sonucu verir."
      ],
      formula: "Eşdeğer kütle = mol kütlesi (g/mol) / z\nEşdeğer sayısı = kütle (g) / eşdeğer kütle\nN = eşdeğer sayısı / V (L)\nKısa yol: N = M × z = [kütle / (mol kütlesi × V)] × z",
      ol: [
        "<strong>Soru:</strong> 4,9 g H₂SO₄ suda çözülerek 500 mL çözelti hazırlanıyor. Normalite kaçtır?",
        "Mol kütlesi: 2 × 1,008 + 32,06 + 4 × 16,00 ≈ 98,08 g/mol.",
        "Mol sayısı: 4,9 / 98,08 ≈ 0,05 mol; molarite 0,05 / 0,5 L = 0,1 M.",
        "Tesir değerliği: H₂SO₄ tam nötrleşmede 2 H⁺ verir → z = 2.",
        "Normalite: 0,1 × 2 = <strong>0,2 N</strong>. Eşdeğer yolundan kontrol: eşdeğer kütle 49,04 g, eşdeğer sayısı 4,9 / 49,04 ≈ 0,1, N = 0,1 / 0,5 = 0,2."
      ],
      after: [
        "Mol kütlesini hızlı hesaplamak için [[arac:molar-kutle-hesapla|Molar Kütle Hesaplama]] aracını, normaliteyi doğrudan kütle, hacim ve tesir değerliğinden bulmak için [[arac:normalite-hesapla|Normalite Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Tesir değerliği (eşdeğer sayısı) nasıl bulunur?",
      p: [
        "Tesir değerliği (z), maddenin belirli bir tepkimede bir molü başına alıp verdiği \"etkin birim\" sayısıdır. Hangi birimin sayılacağı tepkimenin türüne bağlıdır."
      ],
      table: {
        head: ["Madde türü", "z neyi sayar?", "Örnek", "z"],
        rows: [
          ["Asit", "Verdiği H⁺ sayısı", "HCl, HNO₃", "1"],
          ["Asit", "Verdiği H⁺ sayısı", "H₂SO₄ (tam nötrleşme)", "2"],
          ["Asit", "Tepkimede verdiği H⁺ sayısı", "H₃PO₄", "1, 2 ya da 3"],
          ["Baz", "Verdiği OH⁻ ya da aldığı H⁺ sayısı", "NaOH, KOH", "1"],
          ["Baz", "Verdiği OH⁻ sayısı", "Ca(OH)₂, Ba(OH)₂", "2"],
          ["Baz", "Aldığı H⁺ sayısı (tam nötrleşme)", "Na₂CO₃", "2"],
          ["Tuz", "Katyonun toplam pozitif yükü", "Al₂(SO₄)₃ (2 × 3+)", "6"],
          ["Yükseltgen", "Aldığı elektron sayısı", "KMnO₄ (asidik ortam, Mn⁷⁺ → Mn²⁺)", "5"],
          ["İndirgen", "Verdiği elektron sayısı", "Fe²⁺ → Fe³⁺", "1"]
        ],
        caption: "H₃PO₄ ve Na₂CO₃ gibi maddelerde z, tepkimenin ne kadar ilerlediğine bağlıdır; hesaptan önce tepkime eşitliğini yazın."
      },
      after: [
        "Aynı maddenin birden çok tesir değerliği olabilmesi, normalitenin en büyük zayıflığıdır. Örneğin KMnO₄ asidik ortamda 5, nötr ya da zayıf bazik ortamda Mn⁴⁺'e (MnO₂) indirgenirken 3 elektron alır. Bu yüzden bir şişenin üzerinde \"0,1 N KMnO₄\" yazıyorsa hangi tepkimenin esas alındığını bilmek gerekir. Redoks tepkimelerinde elektron sayısını bulmak için yükseltgenme basamaklarını elektron dizilimi bilgisiyle birlikte değerlendirin."
      ]
    },
    {
      h: "Normalite ile molarite arasındaki fark nedir?",
      p: [
        "Molarite (M), bir litre çözeltideki mol sayısıdır ve tepkimeden bağımsızdır: 1 M H₂SO₄ her durumda litresinde 1 mol H₂SO₄ içerir. Normalite ise tepkimeye bağlıdır ve molün kaç \"iş birimi\" yaptığını hesaba katar. Aralarındaki ilişki her zaman N = M × z'dir; z ≥ 1 olduğundan normalite molariteden küçük olamaz."
      ],
      table: {
        head: ["Özellik", "Molarite (M)", "Normalite (N)"],
        rows: [
          ["Tanım", "mol / L", "eşdeğer / L"],
          ["Tepkimeye bağlı mı?", "Hayır", "Evet"],
          ["HCl için", "1 M", "1 N"],
          ["H₂SO₄ için", "1 M", "2 N"],
          ["Ca(OH)₂ için", "0,01 M", "0,02 N"],
          ["Titrasyon hesabı", "Mol oranı gerekir", "N₁V₁ = N₂V₂ yeterli"],
          ["Günümüzde önerilen", "Evet (IUPAC)", "Geleneksel, hâlâ yaygın"]
        ]
      },
      after: [
        "Molariteyi hesaplamak için [[arac:molarite-hesapla|Molarite Hesaplama]] aracını kullanıp sonucu tesir değerliğiyle çarpabilirsiniz."
      ]
    },
    {
      h: "1 N HCl ile 1 M HCl aynı mı? H₂SO₄ neden iki katı?",
      p: [
        "Evet, aynıdır. HCl suda HCl → H⁺ + Cl⁻ şeklinde iyonlaşır ve her molekül yalnızca bir H⁺ verir; z = 1 olduğu için normalite ile molarite sayıca eşittir. Aynı durum HNO₃, NaOH, KOH ve CH₃COOH için de geçerlidir.",
        "Sülfürik asitte ise her molekül iki H⁺ verebilir: H₂SO₄ → 2H⁺ + SO₄²⁻. Bir mol H₂SO₄, iki mol NaOH'yi nötrleştirir. Bu yüzden 1 M H₂SO₄ çözeltisi, asit-baz tepkimesi açısından 2 M HCl kadar \"güçlüdür\" ve 2 N'dir. Tersinden düşünürseniz 1 N H₂SO₄ hazırlamak için litresinde yalnızca 0,5 mol, yani 49,04 g H₂SO₄ bulunması yeterlidir."
      ]
    },
    {
      h: "1 N HCl nasıl hazırlanır? Derişik asitten seyreltme",
      p: [
        "Laboratuvarda 1 N HCl genellikle derişik ticari hidroklorik asitten seyreltilerek hazırlanır. Ticari derişik HCl'nin kütlece yüzdesi ve yoğunluğu şişe etiketinde yazar; aşağıdaki hesapta yaygın bir örnek olan %37 ve 1,19 g/mL değerleri kullanılmıştır."
      ],
      formula: "Derişik asidin molaritesi = (yoğunluk × 1.000 × kütle yüzdesi) / mol kütlesi\n= (1,19 × 1.000 × 0,37) / 36,46 ≈ 12,08 M = 12,08 N\nGereken hacim: V₁ = N₂ × V₂ / N₁ = 1 × 1.000 mL / 12,08 ≈ 82,8 mL",
      ol: [
        "1 litrelik balon jojeye yaklaşık 700–800 mL saf su koyun.",
        "Yaklaşık 82,8 mL derişik HCl'yi ölçün ve <strong>asidi suya</strong>, yavaşça ve karıştırarak ekleyin; asla suyu asidin üzerine dökmeyin.",
        "Çözelti oda sıcaklığına soğuduktan sonra çizgiye kadar saf su ile tamamlayın ve karıştırın.",
        "Derişik asit etiketindeki değerler yaklaşık olduğundan, kesin normaliteyi bilinen bir standart bazla titre ederek (standardizasyon) belirleyin."
      ],
      after: [
        "Aynı mantıkla %98'lik ve 1,84 g/mL yoğunluklu derişik H₂SO₄ yaklaşık 18,38 M, yani 36,77 N'dir; 1 litre 1 N H₂SO₄ için yaklaşık 27,2 mL gerekir. Seyreltme hesabının ayrıntıları [[bilgi:seyreltme-nasil-yapilir-m1v1-m2v2|seyreltme ve M₁V₁ = M₂V₂]] yazısındadır."
      ],
      note: "Derişik asit ve bazlar ciddi yanıklara ve göz hasarına yol açar. Yalnızca çeker ocakta, koruyucu gözlük, eldiven ve önlükle, laboratuvar sorumlusunun gözetiminde çalışın."
    },
    {
      h: "Titrasyonda normalite nasıl kullanılır?",
      p: [
        "Titrasyon, derişimi bilinmeyen bir çözeltinin, derişimi bilinen bir çözeltiyle (ayarlı çözelti) tepkimeye sokularak derişiminin bulunmasıdır. Eşdeğerlik noktasında iki tarafın eşdeğer sayıları eşittir. Normalite kullanıldığında bu eşitlik doğrudan hacimlerle yazılır."
      ],
      formula: "Eşdeğerlik noktasında: N₁ × V₁ = N₂ × V₂\n(V'ler aynı birimde olduğu sürece mL de kullanılabilir)",
      ol: [
        "<strong>Soru:</strong> 25,0 mL H₂SO₄ çözeltisi, 0,1 N NaOH ile titre ediliyor ve dönüm noktasına 20,0 mL NaOH harcanıyor. Asidin normalitesi ve molaritesi nedir?",
        "Eşitliği yazın: N_asit × 25,0 = 0,1 × 20,0.",
        "N_asit = 2,0 / 25,0 = <strong>0,08 N</strong>.",
        "H₂SO₄ için z = 2 olduğundan molarite 0,08 / 2 = <strong>0,04 M</strong>.",
        "Aynı soruyu molarite ile çözseydiniz tepkime eşitliğindeki 1 : 2 mol oranını ayrıca hesaba katmanız gerekirdi; normalite bu adımı ortadan kaldırır."
      ],
      after: [
        "Titrasyon hesaplarını farklı oranlarla denemek için [[arac:titrasyon-hesapla|Titrasyon Hesaplama]] aracını kullanabilirsiniz. Asit-baz dengesinin pH ile ilişkisi için [[bilgi:ph-nedir-nasil-hesaplanir|pH nedir]] yazısına bakın."
      ]
    },
    {
      h: "Başka çözümlü örnekler",
      ul: [
        "<strong>NaOH:</strong> 2,0 g NaOH ile 250 mL çözelti → 2,0 / 40,00 = 0,05 mol → 0,2 M; z = 1 olduğundan <strong>0,2 N</strong>.",
        "<strong>Na₂CO₃:</strong> 5,3 g Na₂CO₃ ile 500 mL çözelti → 5,3 / 106 = 0,05 mol → 0,1 M; tam nötrleşmede z = 2 → <strong>0,2 N</strong>.",
        "<strong>KMnO₄ (asidik ortam):</strong> 3,1608 g KMnO₄ ile 500 mL çözelti → 3,1608 / 158,03 = 0,02 mol → 0,04 M; z = 5 → <strong>0,2 N</strong>.",
        "<strong>Ters yön:</strong> 250 mL 0,5 N H₂SO₄ için gereken kütle = 0,5 × 0,25 × 49,04 ≈ 6,13 g."
      ]
    },
    {
      h: "Normalite birimi ve sık yapılan hatalar",
      p: [
        "Normalitenin birimi eşdeğer/litre'dir (eq/L) ve kısaca büyük N harfiyle yazılır: 0,1 N. Küçük çözeltilerde miliekivalan (meq) kullanılır; 1 eq = 1.000 meq'dir ve su sertliği ya da klinik elektrolit değerleri gibi alanlarda meq/L sık görülür."
      ],
      ul: [
        "<strong>z'yi tepkimeden bağımsız sanmak:</strong> H₃PO₄ ve KMnO₄ gibi maddelerde z, tepkimeye göre değişir.",
        "<strong>Hacmi mL olarak bölmek:</strong> Normalite hesabında hacim litre olmalıdır; 500 mL = 0,5 L.",
        "<strong>N ile M'yi karıştırmak:</strong> 0,1 N H₂SO₄, 0,1 M değil 0,05 M'dır.",
        "<strong>Seyreltirken suyu asidin üzerine dökmek:</strong> Ani ısınma ve sıçramaya yol açar; her zaman asidi suya ekleyin.",
        "<strong>Etiket değerini kesin sanmak:</strong> Derişik reaktiflerden hazırlanan çözeltiler mutlaka standardize edilmelidir."
      ]
    }
  ],
  faq: [
    ["Normalite nedir?", "Normalite, bir litre çözeltide bulunan çözünen maddenin eşdeğer gram sayısıdır. Asit-baz tepkimelerinde bir eşdeğer bir mol H⁺ verebilen ya da bağlayabilen madde miktarıdır; birimi eşdeğer/litre olup N harfiyle gösterilir."],
    ["Normalite nasıl hesaplanır?", "Önce molarite bulunur, sonra tesir değerliğiyle çarpılır: N = M × z. 4,9 gram H₂SO₄ ile hazırlanan 500 mililitre çözelti 0,1 M'dır; sülfürik asit iki H⁺ verdiği için normalitesi 0,2 N olur."],
    ["Normalite ile molarite arasındaki fark nedir?", "Molarite litre başına mol sayısıdır ve tepkimeden bağımsızdır. Normalite ise litre başına eşdeğer sayısıdır ve maddenin tepkimede kaç H⁺, OH⁻ ya da elektron alıp verdiğine bağlıdır; ikisi N = M × z ile ilişkilidir."],
    ["Tesir değerliği (eşdeğer sayısı) nasıl bulunur?", "Asitlerde verilen H⁺ sayısı, bazlarda verilen OH⁻ ya da alınan H⁺ sayısı, tuzlarda katyonun toplam yükü, redoks tepkimelerinde ise alınan ya da verilen elektron sayısı tesir değerliğidir. Tepkime eşitliğini yazmak en güvenli yoldur."],
    ["1 N HCl ile 1 M HCl aynı mı?", "Evet, aynıdır. HCl her molekül başına yalnızca bir H⁺ verdiği için tesir değerliği 1'dir ve normalite molariteye eşit çıkar. Aynı durum NaOH, KOH ve HNO₃ için de geçerlidir."],
    ["H₂SO₄ için normalite neden molaritenin iki katı?", "Sülfürik asidin her molekülü tam nötrleşmede iki H⁺ verir ve bir mol H₂SO₄ iki mol NaOH ile tepkimeye girer. Tesir değerliği 2 olduğundan 1 M sülfürik asit çözeltisi 2 N'dir."],
    ["Titrasyonda normalite nasıl kullanılır?", "Eşdeğerlik noktasında iki çözeltinin eşdeğer sayıları eşittir ve N₁ × V₁ = N₂ × V₂ yazılır. 25 mL asit 20 mL 0,1 N NaOH ile nötrleşiyorsa asidin normalitesi 0,1 × 20 / 25 = 0,08 N bulunur."],
    ["Normalite birimi nedir?", "Normalitenin birimi eşdeğer bölü litredir ve kısaca N ile yazılır. Küçük miktarlar için miliekivalan kullanılır; 1 eşdeğer 1.000 miliekivalandır ve su analizleriyle klinik değerlerde meq/L sık görülür."],
    ["1 litre 1 N HCl hazırlamak için ne kadar derişik asit gerekir?", "Kütlece yüzde 37 ve yoğunluğu 1,19 g/mL olan derişik HCl yaklaşık 12,08 normaldir. 1 litre 1 N çözelti için yaklaşık 82,8 mL derişik asit, suyun üzerine yavaşça eklenip hacim bire tamamlanır ve çözelti standardize edilir."]
  ],
  tools: ["normalite-hesapla", "molarite-hesapla", "titrasyon-hesapla", "molar-kutle-hesapla"],
  related: ["molarite-nasil-hesaplanir", "mol-nedir-nasil-hesaplanir", "seyreltme-nasil-yapilir-m1v1-m2v2", "ph-nedir-nasil-hesaplanir"],
  uyari: "derişik asit ve bazlarla yalnızca uygun koruyucu ekipmanla ve laboratuvar sorumlusunun gözetiminde çalışın",
  sources: [
    ["IUPAC – Kimyasal terminoloji (Gold Book)", "https://goldbook.iupac.org/"],
    ["MEB – Ortaöğretim kimya öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
