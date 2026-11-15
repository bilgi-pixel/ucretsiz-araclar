export default {
  slug: "kaynama-noktasi-yukselmesi-hesapla",
  title: "Kaynama Noktası Yükselmesi Hesaplama",
  h1Tail: "ΔTk = i · Kk · m",
  pageTitle: "Kaynama Noktası Yükselmesi Hesaplama – Ebülyoskopi (ΔTk = i·Kk·m)",
  description: "Molalite, van't Hoff faktörü ve çözücünün ebülyoskopi sabitinden kaynama noktası yükselmesini ve çözeltinin yeni kaynama noktasını hesaplayın.",
  card: "Molalite ve tanecik sayısından çözeltinin kaynama noktasının kaç derece yükseldiğini ve yeni kaynama noktasını bulun.",
  category: "bilim",
  keywords: ["kaynama noktası yükselmesi", "ebülyoskopi hesaplama", "kaynama noktası hesaplama", "koligatif özellikler", "Kk sabiti", "tuzlu su kaç derecede kaynar", "van't Hoff faktörü"],
  lead: "Uçucu olmayan bir madde çözündüğünde çözücünün kaynama noktası yükselir. Çözücüyü, molaliteyi ve çözünenin verdiği tanecik sayısını girin; araç <strong>ΔT<sub>k</sub> = i × K<sub>k</sub> × m</strong> bağıntısıyla yükselmeyi ve yeni kaynama noktasını hesaplasın.",
  button: "Hesapla",
  inputs: [
    { id: "cozucu", label: "Çözücü", type: "select", options: [["su", "Su (Kk = 0,512)"], ["benzen", "Benzen (Kk = 2,53)"], ["etanol", "Etanol (Kk = 1,22)"], ["kloroform", "Kloroform (Kk = 3,63)"], ["asetik", "Asetik asit (Kk = 3,07)"], ["ozel", "Diğer (sabiti ben yazacağım)"]] },
    { id: "molalite", label: "Molalite (mol/kg)", type: "number", placeholder: "Örn. 1" },
    { id: "i", label: "Van't Hoff faktörü (i)", type: "number", value: "1", hint: "Suda iyonlaşmayan maddeler için 1; NaCl için ideal değer 2, CaCl2 için 3." },
    { id: "kk", label: "Özel Kk sabiti (°C·kg/mol)", type: "number", placeholder: "Örn. 0,52", hint: "Yalnızca \"Diğer\" seçiliyse kullanılır." },
    { id: "tk", label: "Saf çözücünün kaynama noktası (°C)", type: "number", placeholder: "Örn. 100", hint: "Yalnızca \"Diğer\" için, isteğe bağlı." },
  ],
  compute(v, h) {
    const tablo = { su: [0.512, 100], benzen: [2.53, 80.1], etanol: [1.22, 78.4], kloroform: [3.63, 61.2], asetik: [3.07, 118.1] };
    let kk, t0 = null;
    if (v.cozucu === "ozel") {
      if (String(v.kk ?? "").trim() === "") h.err("\"Diğer\" çözücü için \"Özel Kk sabiti\" alanını doldurun.");
      kk = h.pos(v.kk, "Özel Kk sabiti");
      if (String(v.tk ?? "").trim() !== "") t0 = h.num(v.tk, "Saf çözücünün kaynama noktası");
    } else if (tablo[v.cozucu]) { kk = tablo[v.cozucu][0]; t0 = tablo[v.cozucu][1]; }
    else h.err("Çözücüyü listeden seçin.");
    const m = h.pos(v.molalite, "Molalite");
    const i = h.opt(v.i, 1, "Van't Hoff faktörü");
    if (!(i > 0)) h.err("\"Van't Hoff faktörü\" sıfırdan büyük olmalı; iyonlaşmayan maddeler için 1 yazın.");
    const dT = i * kk * m;
    const rows = [["Kaynama noktası yükselmesi", h.fmt(dT, 4) + " °C"]];
    if (t0 !== null) {
      rows.push(["Çözeltinin kaynama noktası", h.fmt(t0 + dT, 4) + " °C"]);
      rows.push(["Saf çözücünün kaynama noktası", h.fmt(t0, 4) + " °C"]);
    }
    rows.push(["Kullanılan Kk sabiti", h.fmt(kk, 4) + " °C·kg/mol"]);
    rows.push(["Etkin tanecik derişimi", h.fmt(i * m, 4) + " mol/kg"]);
    return { rows, note: "Kaynama noktaları 1 atm dış basınç içindir. Bağıntı seyreltik çözeltiler ve uçucu olmayan çözünenler için geçerlidir; derişik çözeltilerde gerçek değer sapar." };
  },
  cases: [
    { in: { cozucu: "su", molalite: "1", i: "1" }, out: { "Kaynama noktası yükselmesi": "0,512 °C", "Çözeltinin kaynama noktası": "100,512 °C" } },
    { in: { cozucu: "su", molalite: "2", i: "2" }, out: { "Kaynama noktası yükselmesi": "2,048 °C", "Çözeltinin kaynama noktası": "102,048 °C", "Etkin tanecik derişimi": "4 mol/kg" } },
    { in: { cozucu: "benzen", molalite: "0,5", i: "1" }, out: { "Kaynama noktası yükselmesi": "1,265 °C", "Çözeltinin kaynama noktası": "81,365 °C" } },
    { in: { cozucu: "ozel", molalite: "1", i: "2", kk: "0,52", tk: "100" }, out: { "Kaynama noktası yükselmesi": "1,04 °C", "Çözeltinin kaynama noktası": "101,04 °C" } },
    { in: { cozucu: "su", molalite: "0,1", i: "3" }, out: { "Kaynama noktası yükselmesi": "0,1536 °C", "Çözeltinin kaynama noktası": "100,1536 °C" } },
    { in: { cozucu: "etanol", molalite: "1", i: "1" }, out: { "Kaynama noktası yükselmesi": "1,22 °C", "Çözeltinin kaynama noktası": "79,62 °C" } },
    { in: { cozucu: "kloroform", molalite: "2", i: "1" }, out: { "Kaynama noktası yükselmesi": "7,26 °C", "Çözeltinin kaynama noktası": "68,46 °C" } },
    { in: { cozucu: "ozel", molalite: "1", i: "1", kk: "" }, error: true },
    { in: { cozucu: "su", molalite: "-1", i: "1" }, error: true },
  ],
  howto: [
    "\"Çözücü\" listesinden çözücüyü seçin. Listede yoksa ya da ders kitabınız farklı bir sabit veriyorsa \"Diğer\" seçeneğini kullanıp sabiti kendiniz yazın.",
    "\"Molalite\" alanına çözeltinin molal derişimini (bir kilogram çözücüdeki mol sayısı) girin.",
    "\"Van't Hoff faktörü\" alanına çözünenin suda oluşturduğu tanecik sayısını yazın: şeker gibi moleküler maddeler için 1, NaCl için 2, CaCl2 için 3.",
    "\"Hesapla\" düğmesine basın. İlk satırda kaynama noktasındaki artış, ikinci satırda çözeltinin yeni kaynama noktası görünür.",
  ],
  sections: [
    { h: "Kaynama noktası neden yükselir?", p: [
      "Bir sıvı, buhar basıncı dış basınca eşitlendiğinde kaynar. Sıvıda uçucu olmayan bir madde çözündüğünde yüzeydeki çözücü moleküllerinin bir bölümünün yerini çözünen tanecikler alır ve sıvının buhar basıncı düşer. Buhar basıncının yeniden dış basınca ulaşması için çözeltiyi saf çözücüden daha yüksek bir sıcaklığa ısıtmak gerekir. Bu fark <strong>kaynama noktası yükselmesi</strong> ya da ebülyoskopi olarak adlandırılır.",
      "Bu etki, çözünen maddenin türüne değil çözeltideki tanecik sayısına bağlıdır. Tanecik sayısına bağlı bu tür özelliklere <strong>koligatif özellikler</strong> denir; donma noktası alçalması, buhar basıncı düşmesi ve ozmotik basınç aynı ailedendir.",
    ] },
    { h: "Formül ve terimler", p: [
      "Bağıntı şöyledir: <strong>ΔT<sub>k</sub> = i × K<sub>k</sub> × m</strong>. ΔT<sub>k</sub> kaynama noktasındaki artış, K<sub>k</sub> çözücüye özgü molal kaynama noktası yükselmesi sabiti (ebülyoskopi sabiti; bazı kaynaklarda K<sub>b</sub>), m çözeltinin molalitesi, i ise van't Hoff faktörüdür. Çözeltinin kaynama noktası, saf çözücünün kaynama noktasına bu artış eklenerek bulunur.",
      "Van't Hoff faktörü, bir formül biriminin çözeltide kaç taneciğe ayrıldığını gösterir. Şeker, üre, glikoz gibi iyonlaşmayan maddeler için 1'dir. NaCl bir Na<sup>+</sup> ve bir Cl<sup>−</sup> iyonu verdiğinden ideal değeri 2, CaCl<sub>2</sub> için 3, AlCl<sub>3</sub> için 4'tür. Gerçek çözeltilerde iyonlar arası etkileşim nedeniyle ölçülen değer bu ideal sayılardan biraz küçük çıkar.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> Suda 1 molal şeker çözeltisi. i = 1, K<sub>k</sub> = 0,512; ΔT<sub>k</sub> = 1 × 0,512 × 1 = 0,512 °C. Çözelti 1 atm'de 100,512 °C'de kaynar.",
      "<strong>Örnek 2:</strong> Suda 2 molal NaCl çözeltisi. i = 2 alınırsa etkin tanecik derişimi 4 mol/kg olur; ΔT<sub>k</sub> = 2 × 0,512 × 2 = 2,048 °C ve kaynama noktası 102,048 °C bulunur.",
      "<strong>Örnek 3:</strong> Benzende 0,5 molal iyonlaşmayan bir madde. ΔT<sub>k</sub> = 1 × 2,53 × 0,5 = 1,265 °C; benzenin 80,1 °C olan kaynama noktası 81,365 °C'ye çıkar.",
      "<strong>Örnek 4 – ders kitabı sabitiyle:</strong> Su için K<sub>k</sub> = 0,52 verilen bir soruda 1 molal NaCl çözeltisi için \"Diğer\" seçilip sabit 0,52, i = 2 yazılırsa ΔT<sub>k</sub> = 1,04 °C, kaynama noktası 101,04 °C olur.",
    ] },
    { h: "Araçtaki çözücü sabitleri", ul: [
      "<strong>Su:</strong> K<sub>k</sub> = 0,512 °C·kg/mol, kaynama noktası 100 °C",
      "<strong>Benzen:</strong> K<sub>k</sub> = 2,53 °C·kg/mol, kaynama noktası 80,1 °C",
      "<strong>Etanol:</strong> K<sub>k</sub> = 1,22 °C·kg/mol, kaynama noktası 78,4 °C",
      "<strong>Kloroform:</strong> K<sub>k</sub> = 3,63 °C·kg/mol, kaynama noktası 61,2 °C",
      "<strong>Asetik asit:</strong> K<sub>k</sub> = 3,07 °C·kg/mol, kaynama noktası 118,1 °C",
    ], p: [
      "Bu değerler yaygın kimya ders kitaplarında verilen yaklaşık sabitlerdir ve kaynaktan kaynağa son basamakta farklılık gösterebilir; örneğin su için 0,51, 0,512 ya da 0,52 değerlerinin hepsine rastlanır. Sınav sorularında her zaman sorunun verdiği sabiti kullanın; bunun için \"Diğer\" seçeneği hazırdır.",
    ] },
    { h: "Makarna suyuna tuz atınca ne olur?", p: [
      "Mutfakta sık duyulan bir soru, tuzun suyu daha geç kaynatıp kaynatmadığıdır. Hesap yapalım: 1 litre (yaklaşık 1 kg) suya 10 gram sofra tuzu atıldığında molalite 10 ÷ 58,44, yani yaklaşık 0,171 mol/kg'dır. i = 2 ile ΔT<sub>k</sub> = 2 × 0,512 × 0,171, yaklaşık 0,18 °C eder. Yani yemek için kullanılan tuz miktarı kaynama noktasını derecenin beşte biri kadar bile yükseltmez; tuzun asıl etkisi lezzet üzerindedir.",
      "Kaynama noktasını belirgin biçimde değiştiren asıl etken dış basınçtır. Yüksek rakımlı yerlerde hava basıncı düşük olduğundan su 100 °C'nin altında kaynar; düdüklü tencerede ise basınç arttığı için kaynama noktası yükselir. Bu araçtaki değerler deniz seviyesindeki 1 atm basınç için verilmiştir.",
    ] },
    { h: "Molaliteyi bilmiyorsanız", p: [
      "Soruda kütleler verilmişse önce molaliteyi hesaplayın: çözünenin kütlesini molar kütlesine bölerek mol sayısını bulun, sonra bunu çözücünün kilogram cinsinden kütlesine bölün. Örneğin 500 gram suda 90 gram glikoz (180 g/mol) çözünmüşse n = 0,5 mol ve m = 0,5 ÷ 0,5 = 1 mol/kg olur. Bu değer Örnek 1'deki çözeltiyle aynı yükselmeyi verir.",
    ] },
    { h: "Varsayımlar ve sınırlar", p: [
      "Bağıntı ideal ve seyreltik çözeltiler için türetilmiştir. Derişim arttıkça tanecikler arası etkileşimler güçlenir ve gerçek yükselme hesaplanandan sapar. Çözünenin uçucu olmadığı kabul edilir; alkol gibi uçucu bir madde suya eklendiğinde kaynama noktası yükselmek yerine düşebilir ve bu formül uygulanamaz.",
      "Sonuçlar eğitim ve bilgilendirme amaçlıdır. Laboratuvar ya da endüstriyel süreç tasarımında ölçülmüş verilere ve ilgili mühendislik kaynaklarına başvurulmalıdır.",
    ] },
  ],
  faq: [
    ["Kaynama noktası yükselmesi nasıl hesaplanır?", "Çözeltinin molalitesi, çözücünün ebülyoskopi sabiti ve van't Hoff faktörü çarpılır: ΔTk = i × Kk × m. Bulunan değer saf çözücünün kaynama noktasına eklenir."],
    ["Suyun Kk sabiti kaçtır?", "Kaynaklarda yaklaşık 0,51–0,52 °C·kg/mol olarak verilir. Araç 0,512 kullanır; kitabınız 0,52 veriyorsa \"Diğer\" seçeneğiyle bu değeri yazabilirsiniz."],
    ["Van't Hoff faktörü ne demektir?", "Bir formül biriminin çözeltide oluşturduğu tanecik sayısıdır. İyonlaşmayan maddelerde 1, NaCl'de ideal olarak 2, CaCl2'de 3 alınır."],
    ["Neden molarite değil molalite kullanılıyor?", "Kaynama sırasında sıcaklık değişir ve hacim genleşir; molarite bundan etkilenir. Molalite kütleye dayandığı için sıcaklıktan bağımsızdır."],
    ["Tuzlu su kaç derecede kaynar?", "Tuz miktarına bağlıdır. 1 kilogram suda 1 mol (yaklaşık 58 gram) tuz çözündüğünde ideal hesapla kaynama noktası yaklaşık 1 °C yükselir. Yemeklik miktarlarda etki derecenin onda birleri düzeyindedir."],
    ["Şeker ve tuz aynı molalitede aynı etkiyi yapar mı?", "Hayır. Tuz iki iyona ayrıştığı için aynı molalitede yaklaşık iki kat tanecik verir ve kaynama noktasını yaklaşık iki kat fazla yükseltir."],
    ["Bu hesap her derişimde doğru mudur?", "Hayır. Formül seyreltik çözeltiler için iyi sonuç verir. Derişik çözeltilerde ve iyonların kuvvetle etkileştiği durumlarda ölçülen değer hesaplanandan farklı olur."],
    ["Girdiğim değerler saklanıyor mu?", "Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız veriler sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ["donma-noktasi-alcalmasi-hesapla", "molalite-hesapla", "molarite-hesapla", "molar-kutle-hesapla", "isi-enerjisi-hesapla"],
};
