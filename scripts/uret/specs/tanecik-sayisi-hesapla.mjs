export default {
  slug: "tanecik-sayisi-hesapla",
  title: "Avogadro ile Tanecik Sayısı Hesaplama",
  h1Tail: "mol ↔ atom, molekül, iyon",
  pageTitle: "Tanecik Sayısı Hesaplama – Avogadro Sayısı ile Mol, Atom ve Molekül",
  description: "Mol sayısından ya da gramdan atom, molekül, iyon sayısını Avogadro sayısıyla hesaplayın; tanecik sayısından mole geri dönün. Toplam atom sayısı da bulunur.",
  card: "Mol ya da gramdan tanecik (atom, molekül, iyon) sayısını Avogadro sayısıyla bulun; tanecik sayısından mole dönün.",
  category: "bilim",
  keywords: ["tanecik sayısı hesaplama", "avogadro sayısı", "mol tanecik çevirme", "molekül sayısı hesaplama", "atom sayısı hesaplama", "6,02 × 10^23", "kaç tane molekül var"],
  lead: "Bir maddenin mol sayısını ya da kütlesini yazın; araç <strong>N = n × N<sub>A</sub></strong> bağıntısıyla içindeki tanecik sayısını bulsun. Tersine, bilinen tanecik sayısından mol sayısına da geçebilirsiniz.",
  button: "Hesapla",
  inputs: [
    { id: "tur", label: "Bilinen büyüklük", type: "select", options: [["mol", "Mol sayısı"], ["gram", "Kütle (gram) ve molar kütle"], ["tanecik", "Tanecik sayısı"]] },
    { id: "miktar", label: "Değer", type: "text", placeholder: "Örn. 2 ya da 3,01e23", hint: "Büyük sayıları 3,01e23 biçiminde yazabilirsiniz (3,01 × 10^23)." },
    { id: "molKutle", label: "Molar kütle (g/mol)", type: "number", placeholder: "Örn. 18", hint: "Kütleden hesapta zorunlu; diğerlerinde yazarsanız kütle de gösterilir." },
    { id: "atom", label: "Bir tanecikteki atom sayısı (isteğe bağlı)", type: "number", placeholder: "Örn. H2O için 3", hint: "Yazarsanız toplam atom sayısı da hesaplanır." },
  ],
  compute(v, h) {
    const NA = 6.02214076e23;
    const x = h.pos(v.miktar, "Değer");
    const mkVar = String(v.molKutle ?? "").trim() !== "";
    const mk = mkVar ? h.pos(v.molKutle, "Molar kütle") : null;
    let mol;
    if (v.tur === "mol") mol = x;
    else if (v.tur === "gram") {
      if (mk === null) h.err("Kütleden tanecik sayısına geçmek için \"Molar kütle\" alanını doldurun.");
      mol = x / mk;
    } else if (v.tur === "tanecik") mol = x / NA;
    else h.err("Bilinen büyüklüğü listeden seçin.");
    const N = v.tur === "tanecik" ? x : mol * NA;
    const sTanecik = ["Tanecik sayısı", h.sig(N, 6) + " tanecik"];
    const sMol = ["Mol sayısı", h.sig(mol, 6) + " mol"];
    const rows = v.tur === "tanecik" ? [sMol, sTanecik] : [sTanecik, sMol];
    if (String(v.atom ?? "").trim() !== "") {
      const a = h.posint(v.atom, "Bir tanecikteki atom sayısı");
      rows.push(["Toplam atom sayısı", h.sig(N * a, 6) + " atom"]);
      rows.push(["Atomların mol sayısı", h.sig(mol * a, 6) + " mol atom"]);
    }
    if (mk !== null) rows.push(["Kütle", h.sig(mol * mk, 6) + " g"]);
    return { rows, note: "Avogadro sayısı 6,02214076 × 10^23 mol^-1 alınmıştır. Sonuçlar altı anlamlı basamakla gösterilir." };
  },
  cases: [
    { in: { tur: "mol", miktar: "1" }, out: { "Tanecik sayısı": "6,02214 × 10^23 tanecik", "Mol sayısı": "1 mol" } },
    { in: { tur: "gram", miktar: "18", molKutle: "18", atom: "3" }, out: { "Tanecik sayısı": "6,02214 × 10^23 tanecik", "Mol sayısı": "1 mol", "Toplam atom sayısı": "1,80664 × 10^24 atom", "Atomların mol sayısı": "3 mol atom" } },
    { in: { tur: "mol", miktar: "2" }, out: { "Tanecik sayısı": "1,20443 × 10^24 tanecik" } },
    { in: { tur: "mol", miktar: "0,5" }, out: { "Tanecik sayısı": "3,01107 × 10^23 tanecik" } },
    { in: { tur: "tanecik", miktar: "6,02214076e23" }, out: { "Mol sayısı": "1 mol" } },
    { in: { tur: "tanecik", miktar: "1,204428152e24", molKutle: "44" }, out: { "Mol sayısı": "2 mol", "Kütle": "88 g" } },
    { in: { tur: "mol", miktar: "0,25" }, out: { "Tanecik sayısı": "1,50554 × 10^23 tanecik" } },
    { in: { tur: "gram", miktar: "88", molKutle: "44", atom: "3" }, out: { "Mol sayısı": "2 mol", "Toplam atom sayısı": "3,61328 × 10^24 atom" } },
    { in: { tur: "gram", miktar: "18", molKutle: "" }, error: true },
    { in: { tur: "mol", miktar: "1", atom: "2,5" }, error: true },
    { in: { tur: "mol", miktar: "-1" }, error: true },
  ],
  howto: [
    "\"Bilinen büyüklük\" listesinden elinizdeki veriyi seçin: mol sayısı, gram cinsinden kütle ya da doğrudan tanecik sayısı.",
    "\"Değer\" alanına sayıyı yazın. Tanecik sayısı gibi çok büyük değerler için 3,01e23 yazımını kullanın.",
    "Kütleden hesap yapıyorsanız maddenin molar kütlesini girin. Mol ya da tanecik sayısından hesapta bu alan isteğe bağlıdır; doldurursanız kütle de gösterilir.",
    "Molekülün içindeki toplam atom sayısını da öğrenmek istiyorsanız \"Bir tanecikteki atom sayısı\" alanına formüldeki atom adedini yazın (su için 3, karbondioksit için 3, glikoz için 24).",
    "\"Hesapla\" düğmesine basın ve tanecik sayısını, mol sayısını ve varsa toplam atom sayısını okuyun.",
  ],
  sections: [
    { h: "Avogadro sayısı ve mol kavramı", p: [
      "Atomlar ve moleküller tek tek sayılamayacak kadar küçüktür; bu yüzden kimyada tanecikler \"mol\" adı verilen büyük bir paketle sayılır. Bir mol, tam olarak 6,02214076 × 10<sup>23</sup> tanecik içeren madde miktarıdır. Bu sayıya <strong>Avogadro sayısı</strong> denir ve N<sub>A</sub> ile gösterilir. Düzine nasıl 12 tane demekse, mol de yaklaşık 6,02 × 10<sup>23</sup> tane demektir.",
      "Tanecik sözcüğü maddeye göre atom, molekül, iyon ya da formül birimi anlamına gelir. 1 mol demir 6,02 × 10<sup>23</sup> demir atomu, 1 mol su 6,02 × 10<sup>23</sup> su molekülü, 1 mol sofra tuzu ise 6,02 × 10<sup>23</sup> NaCl formül birimi içerir.",
    ] },
    { h: "Formüller", p: [
      "Mol sayısından tanecik sayısına geçmek için Avogadro sayısıyla çarpılır: <strong>N = n × N<sub>A</sub></strong>. Tersine, tanecik sayısından mole geçmek için bölünür: <strong>n = N ÷ N<sub>A</sub></strong>. Madde gram olarak verilmişse önce mol sayısı bulunur: <strong>n = m ÷ M<sub>A</sub></strong>; m kütle, M<sub>A</sub> molar kütledir.",
      "Bir molekülün içindeki atomların toplam sayısı sorulduğunda molekül sayısı, formüldeki atom adediyle çarpılır. Su molekülünde 2 hidrojen ve 1 oksijen olmak üzere 3 atom vardır; dolayısıyla 1 mol suda 3 mol atom bulunur.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> 2 mol karbondioksit kaç molekül içerir? N = 2 × 6,02214 × 10<sup>23</sup> = 1,20443 × 10<sup>24</sup> molekül.",
      "<strong>Örnek 2:</strong> 18 gram suda kaç molekül ve kaç atom vardır? Suyun molar kütlesi 18 g/mol alınırsa n = 18 ÷ 18 = 1 mol, yani 6,02214 × 10<sup>23</sup> molekül bulunur. Her molekülde 3 atom olduğundan toplam atom sayısı 1,80664 × 10<sup>24</sup>, atomların mol sayısı 3'tür.",
      "<strong>Örnek 3:</strong> 0,25 mol gazda 0,25 × 6,02214 × 10<sup>23</sup> = 1,50554 × 10<sup>23</sup> tanecik vardır.",
      "<strong>Örnek 4 – tersine:</strong> 1,204428152 × 10<sup>24</sup> tane CO<sub>2</sub> molekülü 2 mol eder; molar kütle 44 g/mol olduğundan kütlesi 88 gramdır.",
    ] },
    { h: "Okul sorularında 6,02 mi, 6 mı?", p: [
      "Avogadro sayısının tam değeri 6,02214076 × 10<sup>23</sup>'tür ve 2019'dan itibaren ölçülen değil, tanımlanmış bir sabittir. Ders kitaplarında ve sınavlarda işlem kolaylığı için çoğunlukla 6,02 × 10<sup>23</sup>, bazı sorularda ise 6 × 10<sup>23</sup> kullanılır. Araç tam değeri kullanır ve sonucu altı anlamlı basamağa yuvarlar; elde ettiğiniz sonucu sorudaki yuvarlamaya göre yorumlayın. Örneğin 0,5 mol için araç 3,01107 × 10<sup>23</sup> verir; soruda 6,02 kullanılmışsa beklenen yanıt 3,01 × 10<sup>23</sup>'tür.",
    ] },
    { h: "Bilimsel gösterimi okuma ve yazma", p: [
      "Tanecik sayıları 24 basamağa varan büyüklükte olduğundan 10'un kuvvetleriyle yazılır. 1,20443 × 10<sup>24</sup>, virgülün 24 basamak sağa kaydırılacağı anlamına gelir. Araca böyle bir sayıyı girerken \"e\" harfini kullanın: 1,20443e24. Sonuç satırlarında da aynı sayı \"× 10^24\" biçiminde gösterilir.",
      "Çarpma yaparken katsayılar kendi arasında çarpılır, üsler toplanır: (2 × 10<sup>3</sup>) × (3 × 10<sup>20</sup>) = 6 × 10<sup>23</sup>. Bölmede ise üsler çıkarılır. Elle hesapta en sık hata, katsayı 10'u geçtiğinde üssü bir artırmayı unutmaktır.",
    ] },
    { h: "Sık yapılan hatalar", ul: [
      "Molekül sayısı ile atom sayısını karıştırmak: 1 mol O<sub>2</sub>, 6,02 × 10<sup>23</sup> molekül ama 1,204 × 10<sup>24</sup> oksijen atomu içerir.",
      "Kütleyi doğrudan Avogadro sayısıyla çarpmak; önce molar kütleye bölerek mole çevirmek gerekir.",
      "İyonik bileşiklerde iyon sayısını unutmak: 1 mol CaCl<sub>2</sub> çözündüğünde 1 mol Ca<sup>2+</sup> ve 2 mol Cl<sup>−</sup>, toplam 3 mol iyon oluşur.",
      "Bileşiğin molar kütlesi yerine tek bir atomun kütlesini kullanmak.",
    ] },
    { h: "Sayının büyüklüğünü kavramak", p: [
      "Avogadro sayısı gündelik sezgiyle kavranması güç bir büyüklüktür. Bir yemek kaşığı su yaklaşık 15 gramdır ve içinde yaklaşık 5 × 10<sup>23</sup> su molekülü bulunur. Bu, evrendeki yıldız sayısına ilişkin yaygın tahminlerle aynı mertebededir. Mol kavramı, bu kadar büyük sayıları terazide tartılabilir miktarlara bağladığı için kimyanın temel hesap aracıdır.",
    ] },
  ],
  faq: [
    ["Avogadro sayısı kaçtır?", "Tam değeri 6,02214076 × 10^23'tür. Okul sorularında genellikle 6,02 × 10^23 olarak yuvarlanır; bazı sorularda 6 × 10^23 alınması istenir."],
    ["Mol sayısından tanecik sayısı nasıl bulunur?", "Mol sayısı Avogadro sayısıyla çarpılır. Örneğin 3 mol madde 3 × 6,02 × 10^23 = 1,806 × 10^24 tanecik içerir."],
    ["Gramdan molekül sayısına nasıl geçilir?", "Önce kütle molar kütleye bölünerek mol sayısı bulunur, sonra Avogadro sayısıyla çarpılır. 36 gram su 2 mol eder ve yaklaşık 1,204 × 10^24 molekül içerir."],
    ["Tanecik sayısını araca nasıl yazarım?", "Bilimsel gösterimdeki sayıyı e harfiyle yazın: 3,01 × 10^23 için 3,01e23. Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz."],
    ["Toplam atom sayısı nasıl hesaplanır?", "Molekül sayısı, bir moleküldeki atom adediyle çarpılır. Formüldeki alt indisleri toplayın: H2SO4 için 2 + 1 + 4 = 7 atom. Bu sayıyı ilgili alana yazarsanız araç toplamı verir."],
    ["Tanecik ne demektir; atom mu, molekül mü?", "Maddenin yapı taşına göre değişir. Elementlerde atom, kovalent bileşiklerde molekül, iyonik bileşiklerde formül birimi ya da iyon kastedilir."],
    ["Sonucum kitaptakinden neden biraz farklı?", "Araç Avogadro sayısının tam değerini, kitaplar ise çoğunlukla 6,02 ya da 6 yuvarlamasını kullanır. Fark yalnızca son basamaklardadır."],
    ["Girdiğim veriler bir yere gönderiliyor mu?", "Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz."],
  ],
  related: ["mol-hesapla", "molar-kutle-hesapla", "bilimsel-gosterim-cevir", "molarite-hesapla", "ideal-gaz-denklemi-hesapla"],
};
