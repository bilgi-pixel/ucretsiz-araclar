export default {
  slug: "molarite-hesapla",
  title: "Molarite Hesaplama",
  h1Tail: "M = n / V",
  pageTitle: "Molarite Hesaplama – Molar Derişim (mol/L) Hesaplayıcı",
  description: "Çözünen maddenin mol sayısından ya da gram ve molar kütlesinden çözeltinin molaritesini (mol/L) hesaplayın. Litre ve mililitre hacim desteklenir.",
  card: "Mol ya da gram cinsinden çözünen ile çözelti hacminden molar derişimi (M) bulun; mmol/L ve g/L karşılığıyla.",
  category: "bilim",
  keywords: ["molarite hesaplama", "molar derişim hesaplama", "molarite formülü", "mol/L hesaplama", "çözelti derişimi", "molarite nasıl bulunur", "M = n/V"],
  lead: "Çözünen maddenin miktarını ve çözeltinin hacmini yazın; araç <strong>M = n / V</strong> bağıntısıyla molariteyi mol/L olarak hesaplasın. Çözüneni gram olarak verirseniz molar kütleyi de yazmanız yeterlidir.",
  button: "Hesapla",
  inputs: [
    { id: "miktar", label: "Çözünen miktarı", type: "number", placeholder: "Örn. 20" },
    { id: "birim", label: "Çözünen birimi", type: "select", options: [["mol", "mol"], ["g", "gram (molar kütle gerekir)"]] },
    { id: "molKutle", label: "Molar kütle (g/mol)", type: "number", placeholder: "Örn. 40", hint: "Yalnızca çözüneni gram olarak yazdıysanız doldurun." },
    { id: "hacim", label: "Çözelti hacmi", type: "number", placeholder: "Örn. 500" },
    { id: "hacimBirim", label: "Hacim birimi", type: "select", options: [["L", "litre (L)"], ["mL", "mililitre (mL)"]] },
  ],
  compute(v, h) {
    const miktar = h.pos(v.miktar, "Çözünen miktarı");
    let mol = miktar;
    let mk = null;
    if (v.birim === "g") {
      if (String(v.molKutle ?? "").trim() === "") h.err("Çözüneni gram olarak yazdınız; mol sayısına geçebilmek için \"Molar kütle\" alanını da doldurun.");
      mk = h.pos(v.molKutle, "Molar kütle");
      mol = miktar / mk;
    }
    const hacim = h.pos(v.hacim, "Çözelti hacmi");
    const litre = v.hacimBirim === "mL" ? hacim / 1000 : hacim;
    const M = mol / litre;
    const rows = [
      ["Molarite", h.sig(M, 6) + " mol/L"],
      ["Çözünen madde", h.sig(mol, 6) + " mol"],
      ["Çözelti hacmi", h.sig(litre, 6) + " L"],
      ["Milimolar karşılığı", h.sig(M * 1000, 6) + " mmol/L"],
    ];
    if (mk !== null) rows.push(["Litre başına kütle", h.sig(miktar / litre, 6) + " g/L"]);
    return { rows, note: "Hacim, çözücünün değil hazırlanan çözeltinin toplam hacmidir. Molarite sıcaklıkla az da olsa değişir." };
  },
  cases: [
    { in: { miktar: "20", birim: "g", molKutle: "40", hacim: "500", hacimBirim: "mL" }, out: { "Molarite": "1 mol/L", "Çözünen madde": "0,5 mol", "Litre başına kütle": "40 g/L" } },
    { in: { miktar: "0,5", birim: "mol", hacim: "2", hacimBirim: "L" }, out: { "Molarite": "0,25 mol/L", "Milimolar karşılığı": "250 mmol/L" } },
    { in: { miktar: "58,44", birim: "g", molKutle: "58,44", hacim: "1", hacimBirim: "L" }, out: { "Molarite": "1 mol/L" } },
    { in: { miktar: "4", birim: "g", molKutle: "40", hacim: "250", hacimBirim: "mL" }, out: { "Molarite": "0,4 mol/L", "Çözelti hacmi": "0,25 L" } },
    { in: { miktar: "0,1", birim: "mol", hacim: "250", hacimBirim: "mL" }, out: { "Molarite": "0,4 mol/L" } },
    { in: { miktar: "9,8", birim: "g", molKutle: "98", hacim: "100", hacimBirim: "mL" }, out: { "Molarite": "1 mol/L", "Çözünen madde": "0,1 mol" } },
    { in: { miktar: "3", birim: "mol", hacim: "1,5", hacimBirim: "L" }, out: { "Molarite": "2 mol/L" } },
    { in: { miktar: "20", birim: "g", molKutle: "", hacim: "500", hacimBirim: "mL" }, error: true },
    { in: { miktar: "1", birim: "mol", hacim: "0", hacimBirim: "L" }, error: true },
  ],
  howto: [
    "\"Çözünen miktarı\" alanına çözdüğünüz maddenin miktarını yazın ve yanındaki listeden bunun mol mü yoksa gram mı olduğunu seçin.",
    "Gram seçtiyseniz maddenin molar kütlesini g/mol olarak girin; örneğin sodyum hidroksit için 40, sofra tuzu için 58,44.",
    "\"Çözelti hacmi\" alanına hazırlanan çözeltinin son hacmini yazın ve birimini litre ya da mililitre olarak belirleyin.",
    "\"Hesapla\" düğmesine basın. Molarite ilk satırda görünür; altında mol sayısı, litre cinsinden hacim ve mmol/L karşılığı yer alır.",
    "Sonuçları deney raporuna ya da ödevinize aktarmak için kopyalama düğmesini kullanabilirsiniz.",
  ],
  sections: [
    { h: "Molarite nedir?", p: [
      "Molarite, bir litre çözeltide çözünmüş maddenin mol sayısıdır. Molar derişim ya da kısaca molar olarak da anılır ve büyük <strong>M</strong> harfiyle gösterilir; birimi mol/L'dir. 2 M hidroklorik asit dendiğinde, çözeltinin her litresinde 2 mol HCl bulunduğu anlaşılır.",
      "Kimya laboratuvarında en sık kullanılan derişim birimi molaritedir, çünkü tepkimeler mol oranlarıyla yürür ve hacmi ölçmek kütleyi tartmaktan çoğu zaman daha pratiktir. Bir büretten akıtılan hacmi molariteyle çarptığınızda kaba kaç mol madde aktardığınızı doğrudan bulursunuz.",
    ] },
    { h: "Molarite formülü ve hesap adımları", p: [
      "Temel bağıntı <strong>M = n / V</strong> biçimindedir. Burada n çözünenin mol sayısı, V ise çözeltinin litre cinsinden hacmidir. Çözünen gram olarak tartılmışsa önce mol sayısına geçilir: <strong>n = m / M<sub>A</sub></strong>; m tartılan kütle, M<sub>A</sub> maddenin molar kütlesidir.",
      "Hacim mililitre olarak verildiğinde 1000'e bölünerek litreye çevrilir. Hesapta en çok yapılan hata bu dönüşümü unutmaktır; 250 mL yerine 250 yazılırsa sonuç bin kat küçük çıkar. Araç birimi sizden ayrıca aldığı için bu dönüşümü kendisi yapar.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> 20 gram NaOH suda çözülüp hacim 500 mL'ye tamamlanıyor. NaOH'nin molar kütlesi 40 g/mol olduğundan n = 20 / 40 = 0,5 mol bulunur. Hacim 0,5 L'dir; M = 0,5 / 0,5 = 1 mol/L. Aynı çözeltinin litresinde 40 gram NaOH vardır.",
      "<strong>Örnek 2:</strong> 0,5 mol şeker 2 litre çözeltide çözünmüştür. M = 0,5 / 2 = 0,25 mol/L, yani 250 mmol/L eder.",
      "<strong>Örnek 3:</strong> 9,8 gram sülfürik asit (molar kütle 98 g/mol) ile 100 mL çözelti hazırlanırsa n = 0,1 mol, V = 0,1 L ve M = 1 mol/L olur.",
    ] },
    { h: "Çözelti hacmi ile çözücü hacmi aynı şey değildir", p: [
      "Molarite tanımındaki hacim, eklediğiniz suyun hacmi değil, karışımın son hacmidir. 1 litre suya 58,44 gram tuz atarsanız toplam hacim 1 litreden biraz farklı olur ve çözelti tam 1 M çıkmaz. Doğru yöntem, tartılan maddeyi bir miktar suda çözmek, ardından balon jojede çizgiye kadar su ekleyerek hacmi tamamlamaktır.",
      "Bu nedenle derişim sorularında \"1 litre suda\" ile \"1 litre çözeltide\" ifadeleri arasındaki farka dikkat edin. İlki molalite hesabına daha yakındır; ikincisi molaritedir.",
    ] },
    { h: "Sık kullanılan molar kütleler", ul: [
      "Su (H<sub>2</sub>O): yaklaşık 18 g/mol",
      "Sodyum klorür (NaCl): yaklaşık 58,44 g/mol",
      "Sodyum hidroksit (NaOH): yaklaşık 40 g/mol",
      "Hidroklorik asit (HCl): yaklaşık 36,46 g/mol",
      "Sülfürik asit (H<sub>2</sub>SO<sub>4</sub>): yaklaşık 98 g/mol",
      "Glikoz (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>): yaklaşık 180 g/mol",
      "Kalsiyum karbonat (CaCO<sub>3</sub>): yaklaşık 100 g/mol",
    ], p: [
      "Lise sorularında atom kütleleri genellikle yuvarlanmış verilir (Na: 23, Cl: 35,5 gibi). Sınavda sorunun verdiği değerleri, laboratuvarda ise kullandığınız kimyasalın etiketindeki molar kütleyi esas alın.",
    ] },
    { h: "Molariteden kütleye geri dönmek", p: [
      "Belirli bir derişimde çözelti hazırlamak istediğinizde formül tersine çevrilir: n = M × V ve m = n × M<sub>A</sub>. Örneğin 250 mL 0,4 M NaOH için n = 0,4 × 0,25 = 0,1 mol, m = 0,1 × 40 = 4 gram tartmanız gerekir. Bu değerleri araca yazdığınızda 0,4 mol/L sonucunu görerek hesabınızı sağlayabilirsiniz.",
    ] },
    { h: "Sınırlar ve uyarılar", p: [
      "Araç yalnızca aritmetik hesabı yapar; maddenin o miktarda gerçekten çözünüp çözünmeyeceğini, yani çözünürlük sınırını denetlemez. Sıvıların hacmi sıcaklıkla değiştiği için molarite de sıcaklığa bağlıdır; hassas çalışmalarda çözeltinin hazırlandığı sıcaklık not edilir.",
      "Asit, baz ve diğer kimyasallarla çalışırken derişim hesabı kadar güvenlik kuralları da önemlidir. Derişik asitleri seyreltirken asidi suya yavaşça ekleyin, koruyucu gözlük ve eldiven kullanın; sonuçlar eğitim ve bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ["Molarite nasıl hesaplanır?", "Çözünen maddenin mol sayısı çözeltinin litre cinsinden hacmine bölünür: M = n / V. Çözünen gram olarak verilmişse önce kütle molar kütleye bölünerek mol sayısı bulunur."],
    ["Molarite ile molalite arasındaki fark nedir?", "Molarite bir litre çözeltideki mol sayısıdır; molalite ise bir kilogram çözücüdeki mol sayısıdır. Molarite hacme bağlı olduğu için sıcaklıktan etkilenir, molalite kütleye dayandığı için etkilenmez."],
    ["Hacmi mililitre olarak yazabilir miyim?", "Evet. Hacim birimi listesinden mililitreyi seçmeniz yeterlidir; araç değeri 1000'e bölerek litreye çevirir ve sonucu yine mol/L olarak verir."],
    ["1 M çözelti ne demektir?", "Çözeltinin her litresinde 1 mol çözünen madde bulunduğu anlamına gelir. Örneğin 1 M NaCl çözeltisinin litresinde yaklaşık 58,44 gram sofra tuzu vardır."],
    ["Molar kütleyi nereden bulurum?", "Bileşiğin formülündeki atomların atom kütleleri toplanır. NaOH için 23 + 16 + 1 = 40 g/mol bulunur. Kimyasalın ambalaj etiketinde de bu değer yazılıdır."],
    ["mmol/L ne işe yarar?", "Milimolar, molaritenin binde biridir ve seyreltik çözeltilerde küçük ondalık sayılar yerine okunaklı değerler verir. 0,005 mol/L yerine 5 mmol/L yazmak daha pratiktir."],
    ["Sonuç neden beklediğimden bin kat farklı çıktı?", "Büyük olasılıkla hacim birimi yanlış seçilmiştir. 500 mL'lik bir çözelti için birimi litre bırakırsanız araç 500 litre olarak hesaplar. Birim listesini kontrol edin."],
    ["Girdiğim değerler kaydediliyor mu?", "Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız sayılar herhangi bir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ["mol-hesapla", "molar-kutle-hesapla", "seyreltme-hesapla", "molalite-hesapla", "normalite-hesapla", "titrasyon-hesapla"],
};
