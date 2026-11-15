export default {
  slug: "molalite-hesapla",
  title: "Molalite Hesaplama",
  h1Tail: "m = n / kg çözücü",
  pageTitle: "Molalite Hesaplama – Molal Derişim (mol/kg) Hesaplayıcı",
  description: "Çözünenin mol sayısından ya da gram ve molar kütlesinden, çözücü kütlesine göre molaliteyi (mol/kg) hesaplayın. Molarite farkı ve çözümlü örneklerle.",
  card: "Çözünen miktarı ve çözücü kütlesinden molal derişimi (mol/kg) bulun; koligatif özellik sorularına hazırlık için.",
  category: "bilim",
  keywords: ["molalite hesaplama", "molal derişim", "molalite formülü", "mol/kg hesaplama", "molalite nasıl bulunur", "molarite molalite farkı", "molal çözelti"],
  lead: "Çözünen maddenin miktarını ve <strong>çözücünün kütlesini</strong> yazın; araç bir kilogram çözücü başına düşen mol sayısını, yani molaliteyi hesaplasın. Çözünen gram olarak verilirse molar kütleyi de eklemeniz yeterlidir.",
  button: "Hesapla",
  inputs: [
    { id: "miktar", label: "Çözünen miktarı", type: "number", placeholder: "Örn. 58,44" },
    { id: "birim", label: "Çözünen birimi", type: "select", options: [["g", "gram (molar kütle gerekir)"], ["mol", "mol"]] },
    { id: "molKutle", label: "Molar kütle (g/mol)", type: "number", placeholder: "Örn. 58,44", hint: "Yalnızca çözüneni gram olarak yazdıysanız doldurun." },
    { id: "cozucu", label: "Çözücü kütlesi", type: "number", placeholder: "Örn. 500" },
    { id: "cozucuBirim", label: "Çözücü birimi", type: "select", options: [["g", "gram (g)"], ["kg", "kilogram (kg)"]] },
  ],
  compute(v, h) {
    const miktar = h.pos(v.miktar, "Çözünen miktarı");
    let mol = miktar;
    let gram = null;
    if (v.birim !== "mol") {
      if (String(v.molKutle ?? "").trim() === "") h.err("Çözüneni gram olarak yazdınız; mol sayısını bulmak için \"Molar kütle\" alanını da doldurun.");
      const mk = h.pos(v.molKutle, "Molar kütle");
      gram = miktar;
      mol = miktar / mk;
    }
    const c = h.pos(v.cozucu, "Çözücü kütlesi");
    const kg = v.cozucuBirim === "kg" ? c : c / 1000;
    const m = mol / kg;
    const rows = [
      ["Molalite", h.sig(m, 6) + " mol/kg"],
      ["Çözünen madde", h.sig(mol, 6) + " mol"],
      ["Çözücü kütlesi", h.sig(kg, 6) + " kg"],
    ];
    if (gram !== null) {
      rows.push(["Çözelti kütlesi", h.sig(gram + kg * 1000, 6) + " g"]);
      rows.push(["Kütlece yüzde", "%" + h.fmt(gram / (gram + kg * 1000) * 100, 4)]);
    }
    return { rows, note: "Paydada çözeltinin değil yalnızca çözücünün kütlesi kullanılır. Molalite sıcaklık değişiminden etkilenmez." };
  },
  cases: [
    { in: { miktar: "58,44", birim: "g", molKutle: "58,44", cozucu: "500", cozucuBirim: "g" }, out: { "Molalite": "2 mol/kg", "Çözünen madde": "1 mol", "Çözücü kütlesi": "0,5 kg" } },
    { in: { miktar: "0,5", birim: "mol", cozucu: "2", cozucuBirim: "kg" }, out: { "Molalite": "0,25 mol/kg" } },
    { in: { miktar: "18", birim: "g", molKutle: "180", cozucu: "250", cozucuBirim: "g" }, out: { "Molalite": "0,4 mol/kg", "Çözünen madde": "0,1 mol", "Çözelti kütlesi": "268 g" } },
    { in: { miktar: "20", birim: "g", molKutle: "40", cozucu: "180", cozucuBirim: "g" }, out: { "Molalite": "2,77778 mol/kg", "Kütlece yüzde": "%10" } },
    { in: { miktar: "34,2", birim: "g", molKutle: "342", cozucu: "100", cozucuBirim: "g" }, out: { "Molalite": "1 mol/kg" } },
    { in: { miktar: "1", birim: "mol", cozucu: "1", cozucuBirim: "kg" }, out: { "Molalite": "1 mol/kg" } },
    { in: { miktar: "4", birim: "g", molKutle: "40", cozucu: "200", cozucuBirim: "g" }, out: { "Molalite": "0,5 mol/kg" } },
    { in: { miktar: "10", birim: "g", molKutle: "", cozucu: "200", cozucuBirim: "g" }, error: true },
    { in: { miktar: "1", birim: "mol", cozucu: "-3", cozucuBirim: "kg" }, error: true },
  ],
  howto: [
    "\"Çözünen miktarı\" alanına çözdüğünüz maddenin miktarını yazın; birim listesinden gram ya da mol seçin.",
    "Gram seçtiyseniz \"Molar kütle\" alanına maddenin mol kütlesini g/mol olarak girin. Mol seçtiyseniz bu alanı boş bırakabilirsiniz.",
    "\"Çözücü kütlesi\" alanına yalnızca çözücünün (çoğu soruda suyun) kütlesini yazın ve gram mı kilogram mı olduğunu belirtin.",
    "\"Hesapla\" düğmesine basın. Molalite mol/kg olarak ilk satırda görünür; çözüneni gram verdiyseniz çözeltinin toplam kütlesi ve kütlece yüzdesi de eklenir.",
  ],
  sections: [
    { h: "Molalite nedir?", p: [
      "Molalite, bir kilogram çözücüde çözünmüş maddenin mol sayısıdır. Küçük <strong>m</strong> harfiyle gösterilir, birimi mol/kg'dır ve \"molal\" diye okunur. Formülü <strong>m = n ÷ çözücü kütlesi (kg)</strong> biçimindedir; n çözünenin mol sayısıdır.",
      "Tanımdaki kritik nokta paydadır: molalitede çözeltinin toplam kütlesi ya da hacmi değil, yalnızca çözücünün kütlesi kullanılır. 500 gram suda 1 mol tuz çözündüğünde çözelti 500 gramdan ağırdır, ama molalite hesabında payda yine 0,5 kg alınır.",
    ] },
    { h: "Molarite ile molalite arasındaki fark", p: [
      "İki kavramın adları benzediği için sık karıştırılır. Molarite (M) bir litre <em>çözeltideki</em> mol sayısıdır; molalite (m) bir kilogram <em>çözücüdeki</em> mol sayısıdır. Molarite hacme dayandığından sıvı ısındıkça genleşir ve derişim biraz düşer. Molalite ise kütleye dayanır; kütle sıcaklıkla değişmediği için aynı çözeltinin molalitesi her sıcaklıkta aynıdır.",
      "Bu özellik molaliteyi, sıcaklığın değiştiği olayların incelenmesinde tercih edilen birim yapar. Kaynama noktası yükselmesi ve donma noktası alçalması formüllerinde (ΔT = K × m × i) derişim molalite olarak yer alır.",
      "Seyreltik sulu çözeltilerde 1 litre çözelti yaklaşık 1 kilogram su içerdiğinden molarite ile molalite sayısal olarak birbirine yakındır. Derişim arttıkça ya da çözücü su olmadığında aradaki fark büyür.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> 58,44 gram NaCl 500 gram suda çözülüyor. NaCl'nin molar kütlesi 58,44 g/mol olduğundan n = 1 mol'dür. Çözücü 0,5 kg'dır; m = 1 ÷ 0,5 = 2 mol/kg.",
      "<strong>Örnek 2:</strong> 18 gram glikoz (180 g/mol) 250 gram suda çözünmüştür. n = 18 ÷ 180 = 0,1 mol, çözücü 0,25 kg; m = 0,1 ÷ 0,25 = 0,4 mol/kg. Çözeltinin toplam kütlesi 268 gramdır.",
      "<strong>Örnek 3:</strong> 20 gram NaOH (40 g/mol) 180 gram suda çözülürse n = 0,5 mol ve m = 0,5 ÷ 0,18 = 2,77778 mol/kg olur. Aynı çözelti kütlece %10'luktur; bu örnek yüzde derişim ile molalite arasındaki ilişkiyi de gösterir.",
    ] },
    { h: "Kütlece yüzdeden molaliteye geçiş", p: [
      "Soruda çözücü kütlesi doğrudan verilmeyip kütlece yüzde verilebilir. Bu durumda 100 gram çözelti varsayılır: yüzde değeri çözünenin gramını, 100'den farkı çözücünün gramını verir. Örneğin kütlece %10'luk NaOH çözeltisinde 10 gram NaOH ve 90 gram su vardır; n = 10 ÷ 40 = 0,25 mol ve m = 0,25 ÷ 0,09 = 2,77778 mol/kg bulunur. Sonucun Örnek 3 ile aynı çıkması, molalitenin çözeltinin miktarından bağımsız olduğunu gösterir.",
      "Molariteden molaliteye geçmek içinse çözeltinin yoğunluğu gerekir: önce 1 litre çözeltinin kütlesi bulunur, çözünenin kütlesi çıkarılarak çözücü kütlesine ulaşılır.",
    ] },
    { h: "Sık yapılan hatalar", ul: [
      "Paydaya çözücü yerine çözeltinin toplam kütlesini yazmak.",
      "Çözücü kütlesini gramdan kilograma çevirmeyi unutmak; 500 gram 0,5 kilogramdır.",
      "Çözücünün hacmini kütle gibi kullanmak. Su için 1 mL yaklaşık 1 gramdır, ancak alkol, benzen gibi çözücülerde hacim yoğunlukla çarpılmalıdır.",
      "Molalite simgesi küçük m ile kütle simgesi m'yi ya da molarite simgesi büyük M'yi karıştırmak.",
    ] },
    { h: "Molalite nerede kullanılır?", p: [
      "Lise ve üniversite kimyasında koligatif özellikler konusunun temel derişim birimidir: antifrizli suyun donma noktası, tuzlu suyun kaynama noktası ve ozmotik olaylar molalite üzerinden incelenir. Fizikokimyada ve termodinamik tablolarında da sıcaklıktan bağımsız olduğu için molal derişim tercih edilir.",
      "İyonik bileşiklerde koligatif etki, çözeltideki toplam tanecik sayısına bağlıdır. NaCl suda iki iyona ayrıştığından 1 molal NaCl çözeltisi, ideal durumda 2 molal tanecik derişimi gibi davranır. Bu çarpan van't Hoff faktörü olarak adlandırılır ve molalite hesabından sonra ayrıca uygulanır.",
    ] },
    { h: "Sınırlar", p: [
      "Araç, girdiğiniz miktarın seçtiğiniz çözücüde çözünüp çözünmeyeceğini denetlemez; yalnızca tanıma göre aritmetik hesap yapar. Molar kütleyi sorunun verdiği atom kütlelerine göre girin; yuvarlanmış değerlerle (örneğin NaCl için 58,5) sonuç küçük farklar gösterebilir. Sonuçlar eğitim ve bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ["Molalite nasıl hesaplanır?", "Çözünenin mol sayısı, çözücünün kilogram cinsinden kütlesine bölünür. Çözünen gram olarak verilmişse önce molar kütleye bölünerek mol sayısı bulunur."],
    ["Molalitenin birimi nedir?", "Birimi mol/kg'dır ve küçük m harfiyle gösterilir; 2 mol/kg derişim \"2 molal\" olarak okunur."],
    ["Molalite sıcaklıkla değişir mi?", "Hayır. Tanımı yalnızca kütle ve mol sayısına dayandığı için ısınma ya da soğuma molaliteyi değiştirmez. Molarite ise hacme bağlı olduğundan sıcaklıkla az da olsa değişir."],
    ["Çözücü kütlesine çözüneni de eklemeli miyim?", "Hayır. Paydada yalnızca çözücü bulunur. Çözünenle çözücünün toplamı çözelti kütlesidir ve kütlece yüzde hesabında kullanılır."],
    ["Suyun hacmini kütle olarak alabilir miyim?", "Su için yaklaşık olarak evet: 1 mL su yaklaşık 1 gram, 1 litre su yaklaşık 1 kilogramdır. Diğer çözücülerde hacmi yoğunlukla çarparak kütleye çevirin."],
    ["1 molal ile 1 molar çözelti aynı mıdır?", "Hayır. 1 molal çözelti 1 kg çözücüde 1 mol madde içerir; 1 molar çözelti ise 1 litre çözeltide 1 mol madde içerir. Seyreltik sulu çözeltilerde değerler yakındır ama eşit değildir."],
    ["Molalite hangi konularda sorulur?", "En çok kaynama noktası yükselmesi, donma noktası alçalması ve buhar basıncı düşmesi gibi koligatif özellik sorularında kullanılır."],
    ["Yazdığım değerler kaydediliyor mu?", "Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ["molarite-hesapla", "kaynama-noktasi-yukselmesi-hesapla", "donma-noktasi-alcalmasi-hesapla", "kutlece-yuzde-derisim-hesapla", "mol-hesapla", "molar-kutle-hesapla"],
};
