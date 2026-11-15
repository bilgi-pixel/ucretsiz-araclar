export default {
  slug: "donma-noktasi-alcalmasi-hesapla",
  title: "Donma Noktası Alçalması Hesaplama",
  h1Tail: "ΔTd = i · Kd · m",
  pageTitle: "Donma Noktası Alçalması Hesaplama – Kriyoskopi (ΔTd = i·Kd·m)",
  description: "Molalite, van't Hoff faktörü ve çözücünün kriyoskopi sabitinden donma noktası alçalmasını ve çözeltinin yeni donma noktasını hesaplayın. Antifriz ve tuzlama örnekli.",
  card: "Molalite ve tanecik sayısından çözeltinin donma noktasının kaç derece düştüğünü ve yeni donma noktasını bulun.",
  category: "bilim",
  keywords: ["donma noktası alçalması", "kriyoskopi hesaplama", "donma noktası hesaplama", "Kd sabiti 1,86", "tuzlu su kaç derecede donar", "antifriz donma noktası", "koligatif özellikler"],
  lead: "Bir sıvıda madde çözündüğünde donma noktası düşer; yollara tuz dökülmesinin ve radyatöre antifriz konmasının nedeni budur. Çözücüyü, molaliteyi ve tanecik sayısını girin; araç <strong>ΔT<sub>d</sub> = i × K<sub>d</sub> × m</strong> ile alçalmayı ve yeni donma noktasını hesaplasın.",
  button: "Hesapla",
  inputs: [
    { id: "cozucu", label: "Çözücü", type: "select", options: [["su", "Su (Kd = 1,86)"], ["benzen", "Benzen (Kd = 5,12)"], ["etanol", "Etanol (Kd = 1,99)"], ["kloroform", "Kloroform (Kd = 4,68)"], ["asetik", "Asetik asit (Kd = 3,90)"], ["ozel", "Diğer (sabiti ben yazacağım)"]] },
    { id: "molalite", label: "Molalite (mol/kg)", type: "number", placeholder: "Örn. 1" },
    { id: "i", label: "Van't Hoff faktörü (i)", type: "number", value: "1", hint: "İyonlaşmayan maddeler için 1; NaCl için ideal değer 2, CaCl2 için 3." },
    { id: "kd", label: "Özel Kd sabiti (°C·kg/mol)", type: "number", placeholder: "Örn. 1,86", hint: "Yalnızca \"Diğer\" seçiliyse kullanılır." },
    { id: "td", label: "Saf çözücünün donma noktası (°C)", type: "number", placeholder: "Örn. 0", hint: "Yalnızca \"Diğer\" için, isteğe bağlı." },
  ],
  compute(v, h) {
    const tablo = { su: [1.86, 0], benzen: [5.12, 5.5], etanol: [1.99, -114.6], kloroform: [4.68, -63.5], asetik: [3.9, 16.6] };
    let kd, t0 = null;
    if (v.cozucu === "ozel") {
      if (String(v.kd ?? "").trim() === "") h.err("\"Diğer\" çözücü için \"Özel Kd sabiti\" alanını doldurun.");
      kd = h.pos(v.kd, "Özel Kd sabiti");
      if (String(v.td ?? "").trim() !== "") t0 = h.num(v.td, "Saf çözücünün donma noktası");
    } else if (tablo[v.cozucu]) { kd = tablo[v.cozucu][0]; t0 = tablo[v.cozucu][1]; }
    else h.err("Çözücüyü listeden seçin.");
    const m = h.pos(v.molalite, "Molalite");
    const i = h.opt(v.i, 1, "Van't Hoff faktörü");
    if (!(i > 0)) h.err("\"Van't Hoff faktörü\" sıfırdan büyük olmalı; iyonlaşmayan maddeler için 1 yazın.");
    const dT = i * kd * m;
    const rows = [["Donma noktası alçalması", h.fmt(dT, 4) + " °C"]];
    if (t0 !== null) {
      rows.push(["Çözeltinin donma noktası", h.fmt(t0 - dT, 4) + " °C"]);
      rows.push(["Saf çözücünün donma noktası", h.fmt(t0, 4) + " °C"]);
    }
    rows.push(["Kullanılan Kd sabiti", h.fmt(kd, 4) + " °C·kg/mol"]);
    rows.push(["Etkin tanecik derişimi", h.fmt(i * m, 4) + " mol/kg"]);
    return { rows, note: "Bağıntı seyreltik çözeltiler için geçerlidir; derişik çözeltilerde (antifriz karışımları, doymuşa yakın tuzlu su) gerçek donma noktası hesaplanandan sapar." };
  },
  cases: [
    { in: { cozucu: "su", molalite: "1", i: "1" }, out: { "Donma noktası alçalması": "1,86 °C", "Çözeltinin donma noktası": "-1,86 °C" } },
    { in: { cozucu: "su", molalite: "2", i: "2" }, out: { "Donma noktası alçalması": "7,44 °C", "Çözeltinin donma noktası": "-7,44 °C", "Etkin tanecik derişimi": "4 mol/kg" } },
    { in: { cozucu: "benzen", molalite: "0,5", i: "1" }, out: { "Donma noktası alçalması": "2,56 °C", "Çözeltinin donma noktası": "2,94 °C" } },
    { in: { cozucu: "su", molalite: "5", i: "1" }, out: { "Donma noktası alçalması": "9,3 °C", "Çözeltinin donma noktası": "-9,3 °C" } },
    { in: { cozucu: "ozel", molalite: "3", i: "1", kd: "1,86", td: "0" }, out: { "Donma noktası alçalması": "5,58 °C", "Çözeltinin donma noktası": "-5,58 °C" } },
    { in: { cozucu: "asetik", molalite: "1", i: "1" }, out: { "Donma noktası alçalması": "3,9 °C", "Çözeltinin donma noktası": "12,7 °C" } },
    { in: { cozucu: "su", molalite: "0,5", i: "3" }, out: { "Donma noktası alçalması": "2,79 °C", "Çözeltinin donma noktası": "-2,79 °C" } },
    { in: { cozucu: "ozel", molalite: "1", i: "1", kd: "" }, error: true },
    { in: { cozucu: "su", molalite: "abc", i: "1" }, error: true },
  ],
  howto: [
    "\"Çözücü\" listesinden çözücüyü seçin; çoğu soru için bu sudur. Listede olmayan bir çözücü ya da farklı bir sabit için \"Diğer\" seçeneğini kullanın.",
    "\"Molalite\" alanına bir kilogram çözücüde çözünmüş maddenin mol sayısını yazın.",
    "\"Van't Hoff faktörü\" alanına çözünenin oluşturduğu tanecik sayısını girin: şeker, glikol gibi moleküler maddelerde 1, sofra tuzunda 2, kalsiyum klorürde 3.",
    "\"Hesapla\" düğmesine basın. İlk satır donma noktasının kaç derece düştüğünü, ikinci satır çözeltinin donmaya başlayacağı sıcaklığı gösterir.",
  ],
  sections: [
    { h: "Donma noktası alçalması nedir?", p: [
      "Saf bir sıvı belirli bir sıcaklıkta donar; su için bu 1 atm basınçta 0 °C'dir. Sıvıda bir madde çözündüğünde çözünen tanecikler, çözücü moleküllerinin düzenli katı örgüsüne yerleşmesini güçleştirir. Katı ile sıvının yeniden dengeye gelmesi için sıcaklığın daha da düşmesi gerekir. Saf çözücünün donma noktası ile çözeltinin donma noktası arasındaki bu farka <strong>donma noktası alçalması</strong> ya da kriyoskopi denir.",
      "Alçalmanın büyüklüğü çözünenin kimliğine değil, çözeltideki tanecik derişimine bağlıdır. Bu yüzden kaynama noktası yükselmesiyle birlikte koligatif özellikler arasında sayılır. Aynı çözücü için donma sabiti kaynama sabitinden büyüktür; suda donma noktası, kaynama noktasına göre aynı derişimde yaklaşık üç buçuk kat fazla değişir.",
    ] },
    { h: "Formül", p: [
      "<strong>ΔT<sub>d</sub> = i × K<sub>d</sub> × m</strong>. Burada ΔT<sub>d</sub> donma noktasındaki düşüş, K<sub>d</sub> çözücünün molal donma noktası alçalması sabiti (kriyoskopi sabiti; bazı kaynaklarda K<sub>f</sub>), m molalite ve i van't Hoff faktörüdür. Çözeltinin donma noktası, saf çözücünün donma noktasından bu değer <em>çıkarılarak</em> bulunur.",
      "Su için K<sub>d</sub> = 1,86 °C·kg/mol'dür: bir kilogram suda bir mol iyonlaşmayan madde çözündüğünde donma noktası 1,86 °C düşer. İyonik bileşiklerde her formül birimi birden fazla tanecik verdiğinden etki i katına çıkar.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> Suda 1 molal şeker çözeltisi: ΔT<sub>d</sub> = 1 × 1,86 × 1 = 1,86 °C. Çözelti −1,86 °C'de donmaya başlar.",
      "<strong>Örnek 2:</strong> Suda 2 molal NaCl çözeltisi, i = 2: ΔT<sub>d</sub> = 2 × 1,86 × 2 = 7,44 °C; donma noktası −7,44 °C olur.",
      "<strong>Örnek 3:</strong> Benzende 0,5 molal çözelti: ΔT<sub>d</sub> = 5,12 × 0,5 = 2,56 °C. Benzen 5,5 °C'de donduğundan çözelti 5,5 − 2,56 = 2,94 °C'de donar.",
      "<strong>Örnek 4 – antifriz:</strong> 1 kilogram suya 310 gram etilen glikol (molar kütle yaklaşık 62 g/mol) eklenirse n = 5 mol ve m = 5 mol/kg olur. İdeal hesapla ΔT<sub>d</sub> = 1,86 × 5 = 9,3 °C, donma noktası −9,3 °C bulunur. Bu kadar derişik bir karışımda gerçek değer ideal hesaptan sapar; sonuç yalnızca mertebeyi gösterir.",
    ] },
    { h: "Araçtaki çözücü sabitleri", ul: [
      "<strong>Su:</strong> K<sub>d</sub> = 1,86 °C·kg/mol, donma noktası 0 °C",
      "<strong>Benzen:</strong> K<sub>d</sub> = 5,12 °C·kg/mol, donma noktası 5,5 °C",
      "<strong>Etanol:</strong> K<sub>d</sub> = 1,99 °C·kg/mol, donma noktası −114,6 °C",
      "<strong>Kloroform:</strong> K<sub>d</sub> = 4,68 °C·kg/mol, donma noktası −63,5 °C",
      "<strong>Asetik asit:</strong> K<sub>d</sub> = 3,90 °C·kg/mol, donma noktası 16,6 °C",
    ], p: [
      "Değerler yaygın ders kitaplarında yer alan yaklaşık sabitlerdir; kaynağa göre son basamakta küçük farklar görülebilir. Sorunuz farklı bir sabit veriyorsa \"Diğer\" seçeneğiyle onu kullanın.",
    ] },
    { h: "Günlük hayatta donma noktası alçalması", p: [
      "<strong>Yolların tuzlanması:</strong> Kışın yollara serpilen tuz, buzun yüzeyindeki ince su tabakasında çözünür ve donma noktasını düşürür; böylece 0 °C'nin birkaç derece altında bile su sıvı kalır. Tuzun etkisi sıcaklık düştükçe azalır ve çok soğuk havalarda tek başına yeterli olmaz. Kalsiyum klorür formül birimi başına üç iyon verdiği için aynı molalitede sofra tuzundan daha güçlü etki eder.",
      "<strong>Antifriz:</strong> Araç radyatörlerinde suya glikol esaslı antifriz karıştırılarak soğutma sıvısının kışın donması önlenir. Aynı çözünen, kaynama noktasını da yükselttiği için yazın da yarar sağlar. Araçlarda kullanılacak karışım oranı için üreticinin ve ürün etiketinin önerisine uyulmalıdır; bu sayfadaki ideal hesap derişik karışımlarda kesin sonuç vermez.",
      "<strong>Deniz suyu ve dondurma:</strong> Deniz suyu içerdiği tuzlar nedeniyle tatlı sudan daha düşük sıcaklıkta donar. Geleneksel dondurma yapımında buzun üzerine tuz serpilmesi de aynı ilkeye dayanır: tuzlu buz karışımı 0 °C'nin altına inerek dondurma karışımını dondurur.",
    ] },
    { h: "Molar kütle tayininde kullanımı", p: [
      "Kriyoskopi, bilinmeyen bir maddenin molar kütlesini bulmak için de kullanılır. Bilinen kütlede madde, bilinen kütlede çözücüde çözülür ve donma noktasındaki düşüş ölçülür. Formülden molalite (m = ΔT<sub>d</sub> ÷ K<sub>d</sub>) hesaplanır, molalite çözücü kütlesiyle çarpılarak mol sayısına geçilir ve kütle mol sayısına bölünür. Örneğin 100 gram suda çözünen 9 gram madde donma noktasını 0,93 °C düşürüyorsa m = 0,5 mol/kg, n = 0,05 mol ve molar kütle 9 ÷ 0,05 = 180 g/mol bulunur.",
    ] },
    { h: "Varsayımlar ve sınırlar", p: [
      "Formül ideal, seyreltik çözeltiler için geçerlidir ve donan katının saf çözücü olduğunu varsayar. İyonik çözeltilerde ölçülen van't Hoff faktörü ideal tam sayıdan küçük çıkabilir. Her çözeltinin inebileceği en düşük bir donma sıcaklığı vardır; çözünen miktarını sınırsız artırarak donma noktası sınırsız düşürülemez.",
      "Sonuçlar eğitim ve bilgilendirme amaçlıdır. Araç bakımı, tesisat koruması ya da gıda üretimi gibi uygulamalarda üretici verilerine ve ölçüme dayalı kaynaklara başvurun.",
    ] },
  ],
  faq: [
    ["Donma noktası alçalması nasıl hesaplanır?", "Molalite, çözücünün kriyoskopi sabiti ve van't Hoff faktörü çarpılır: ΔTd = i × Kd × m. Bulunan değer saf çözücünün donma noktasından çıkarılır."],
    ["Suyun Kd sabiti kaçtır?", "Su için molal donma noktası alçalması sabiti 1,86 °C·kg/mol'dür. Bir kilogram suda bir mol iyonlaşmayan madde donma noktasını 1,86 °C düşürür."],
    ["Tuzlu su kaç derecede donar?", "Derişime bağlıdır. 1 kilogram suda 1 mol sofra tuzu (yaklaşık 58 gram) çözündüğünde ideal hesapla donma noktası yaklaşık −3,7 °C olur."],
    ["Yollara neden tuz dökülür?", "Tuz, buz yüzeyindeki suda çözünerek donma noktasını düşürür. Böylece su 0 °C'nin biraz altındaki sıcaklıklarda sıvı kalır ve buzlanma azalır."],
    ["Şeker de donma noktasını düşürür mü?", "Evet. Koligatif etki çözünenin türüne değil tanecik sayısına bağlıdır. Ancak şeker iyonlaşmadığı için aynı molalitede tuzun yaklaşık yarısı kadar etki eder."],
    ["Sonuçta donma noktası neden eksi işaretli çıkıyor?", "Alçalma değeri pozitif bir farktır; çözeltinin donma noktası ise saf çözücününkinden bu fark kadar düşüktür. Su 0 °C'de donduğundan çözeltinin donma noktası sıfırın altında çıkar."],
    ["Kaynama noktası yükselmesiyle farkı nedir?", "İkisi de aynı biçimdeki formülle hesaplanır, ancak sabitler farklıdır ve yönler terstir: kaynama noktası yükselir, donma noktası düşer. Suda donma sabiti (1,86) kaynama sabitinden belirgin biçimde büyüktür."],
    ["Yazdığım değerler bir yere gönderiliyor mu?", "Hayır. Hesap tarayıcınızda yapılır; girdiğiniz veriler sunucuya iletilmez ve saklanmaz."],
  ],
  related: ["kaynama-noktasi-yukselmesi-hesapla", "molalite-hesapla", "molar-kutle-hesapla", "molarite-hesapla", "kutlece-yuzde-derisim-hesapla"],
};
