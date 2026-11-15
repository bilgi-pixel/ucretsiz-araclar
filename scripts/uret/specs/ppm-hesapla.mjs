export default {
  slug: "ppm-hesapla",
  title: "PPM Derişim Hesaplama",
  h1Tail: "milyonda bir kısım",
  pageTitle: "PPM Hesaplama – Milyonda Bir Derişim (mg/kg, mg/L) Hesaplayıcı",
  description: "Çözünen ve çözelti miktarından ppm derişimini hesaplayın. Sonuç ppb, kütlece yüzde ve mg/kg olarak da gösterilir; sulu çözeltilerde mg/L karşılığı açıklanır.",
  card: "Çözünen ve çözelti miktarından ppm değerini bulun; ppb ve yüzde karşılığıyla birlikte, su analizleri ve gübre karışımları için.",
  category: "bilim",
  keywords: ["ppm hesaplama", "ppm nedir", "ppm formülü", "mg/L ppm", "ppb hesaplama", "milyonda bir derişim", "ppm yüzde çevirme"],
  lead: "Çok seyreltik çözeltilerin derişimini <strong>ppm</strong> (milyonda bir kısım) olarak hesaplayın. Çözünen ve çözelti miktarını birimleriyle birlikte yazın; araç ppm, ppb ve kütlece yüzde karşılıklarını versin.",
  button: "Hesapla",
  inputs: [
    { id: "cozunen", label: "Çözünen miktarı", type: "number", placeholder: "Örn. 5" },
    { id: "cozunenBirim", label: "Çözünen birimi", type: "select", options: [["mg", "miligram (mg)"], ["g", "gram (g)"], ["ug", "mikrogram (µg)"], ["kg", "kilogram (kg)"]] },
    { id: "cozelti", label: "Çözelti miktarı", type: "number", placeholder: "Örn. 1" },
    { id: "cozeltiBirim", label: "Çözelti birimi", type: "select", options: [["kg", "kilogram (kg)"], ["g", "gram (g)"], ["L", "litre (seyreltik sulu çözelti)"], ["mL", "mililitre (seyreltik sulu çözelti)"]], hint: "Litre ve mililitre seçeneklerinde çözelti yoğunluğu 1 kg/L kabul edilir." },
  ],
  compute(v, h) {
    const a = h.pos(v.cozunen, "Çözünen miktarı");
    const b = h.pos(v.cozelti, "Çözelti miktarı");
    const mgKat = { mg: 1, g: 1000, ug: 0.001, kg: 1e6 }[v.cozunenBirim];
    const kgKat = { kg: 1, g: 0.001, L: 1, mL: 0.001 }[v.cozeltiBirim];
    if (!mgKat || !kgKat) h.err("Birimleri listeden seçin.");
    const mg = a * mgKat;
    const kg = b * kgKat;
    const ppm = mg / kg;
    if (ppm > 1e6 * (1 + 1e-9)) h.err("Çözünen miktarı çözeltinin tamamından büyük olamaz. Miktarları ve birimleri kontrol edin.");
    const hacim = v.cozeltiBirim === "L" || v.cozeltiBirim === "mL";
    return {
      rows: [
        ["Derişim", h.sig(ppm, 6) + " ppm"],
        ["ppb karşılığı", h.sig(ppm * 1000, 6) + " ppb"],
        ["Kütlece yüzde", "%" + h.sig(ppm / 10000, 6)],
        [hacim ? "Litre başına" : "Kilogram başına", h.sig(ppm, 6) + (hacim ? " mg/L" : " mg/kg")],
      ],
      note: hacim
        ? "Hacim girdisinde çözeltinin yoğunluğu 1 kg/L kabul edilmiştir; bu varsayım seyreltik sulu çözeltiler için uygundur."
        : "Kütle temelli ppm: 1 ppm = 1 kilogram çözeltide 1 miligram çözünen.",
    };
  },
  cases: [
    { in: { cozunen: "5", cozunenBirim: "mg", cozelti: "1", cozeltiBirim: "kg" }, out: { "Derişim": "5 ppm", "ppb karşılığı": "5.000 ppb", "Kütlece yüzde": "%0,0005", "Kilogram başına": "5 mg/kg" } },
    { in: { cozunen: "250", cozunenBirim: "mg", cozelti: "2", cozeltiBirim: "L" }, out: { "Derişim": "125 ppm", "Litre başına": "125 mg/L" } },
    { in: { cozunen: "0,002", cozunenBirim: "g", cozelti: "500", cozeltiBirim: "g" }, out: { "Derişim": "4 ppm" } },
    { in: { cozunen: "1", cozunenBirim: "g", cozelti: "1", cozeltiBirim: "kg" }, out: { "Derişim": "1.000 ppm", "Kütlece yüzde": "%0,1" } },
    { in: { cozunen: "50", cozunenBirim: "ug", cozelti: "1", cozeltiBirim: "L" }, out: { "Derişim": "0,05 ppm", "ppb karşılığı": "50 ppb" } },
    { in: { cozunen: "10", cozunenBirim: "mg", cozelti: "250", cozeltiBirim: "g" }, out: { "Derişim": "40 ppm" } },
    { in: { cozunen: "3", cozunenBirim: "mg", cozelti: "500", cozeltiBirim: "mL" }, out: { "Derişim": "6 ppm", "Litre başına": "6 mg/L" } },
    { in: { cozunen: "2", cozunenBirim: "kg", cozelti: "1", cozeltiBirim: "kg" }, error: true },
    { in: { cozunen: "", cozunenBirim: "mg", cozelti: "1", cozeltiBirim: "kg" }, error: true },
  ],
  howto: [
    "\"Çözünen miktarı\" alanına çözeltideki maddenin miktarını yazın ve birimini miligram, gram, mikrogram ya da kilogram olarak seçin.",
    "\"Çözelti miktarı\" alanına toplam çözelti miktarını yazın. Kütle biliyorsanız kilogram ya da gramı, seyreltik bir sulu çözeltinin hacmini biliyorsanız litre ya da mililitreyi seçin.",
    "\"Hesapla\" düğmesine basın. İlk satırda ppm değeri, ardından ppb ve kütlece yüzde karşılıkları görünür.",
    "Sonucu bir analiz raporundaki ya da etiketteki değerle karşılaştırın; gerekirse kopyalayıp notlarınıza ekleyin.",
  ],
  sections: [
    { h: "PPM nedir?", p: [
      "PPM, İngilizce \"parts per million\" ifadesinin kısaltmasıdır ve <strong>milyonda bir kısım</strong> anlamına gelir. Bir karışımın bir milyon biriminde ilgilenilen maddeden kaç birim bulunduğunu söyler. Yüzde, yüzde bir kısmı ifade ederken ppm milyonda bir kısmı ifade eder; dolayısıyla çok küçük derişimleri uzun ondalık sayılar yazmadan anlatmaya yarar.",
      "Kütle temelli tanımda formül şöyledir: <strong>ppm = (çözünen kütlesi ÷ çözelti kütlesi) × 1.000.000</strong>. Birimler sadeleştirildiğinde bu, kilogram çözelti başına miligram çözünen demektir: 1 ppm = 1 mg/kg.",
    ] },
    { h: "Neden mg/L ile ppm aynı kabul edilir?", p: [
      "Seyreltik sulu çözeltilerin yoğunluğu yaklaşık 1 kg/L'dir; yani 1 litre çözelti yaklaşık 1 kilogram gelir. Bu durumda litre başına miligram ile kilogram başına miligram sayısal olarak eşit olur ve su analizlerinde 1 mg/L değeri 1 ppm olarak okunur. Araçta çözelti birimi olarak litre ya da mililitre seçtiğinizde bu varsayım kullanılır ve sonucun altında belirtilir.",
      "Yoğunluğu sudan belirgin biçimde farklı sıvılarda (derişik tuzlu su, yağ, çözücüler) bu eşitlik bozulur. Böyle durumlarda çözeltiyi tartıp kütle birimiyle hesap yapmak doğru olur.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> 1 kilogram çözeltide 5 miligram madde varsa derişim 5 ÷ 1 = 5 ppm'dir. Bu aynı zamanda 5.000 ppb ve kütlece %0,0005 eder.",
      "<strong>Örnek 2:</strong> 2 litre suda 250 miligram madde çözünmüştür. 250 ÷ 2 = 125 mg/L, yani 125 ppm bulunur.",
      "<strong>Örnek 3:</strong> 500 gram çözeltide 0,002 gram madde vardır. Çözünen 2 mg, çözelti 0,5 kg'dır; 2 ÷ 0,5 = 4 ppm.",
      "<strong>Örnek 4:</strong> 1 litre suda 50 mikrogram madde 0,05 ppm, yani 50 ppb eder. Bu kadar küçük değerlerde ppb kullanmak daha okunaklıdır.",
    ] },
    { h: "PPM, ppb ve yüzde arasındaki dönüşümler", ul: [
      "<strong>%1</strong> = 10.000 ppm",
      "<strong>%0,1</strong> = 1.000 ppm",
      "<strong>1 ppm</strong> = 1.000 ppb = %0,0001",
      "<strong>1 ppb</strong> = 0,001 ppm (milyarda bir kısım)",
      "Yüzdeden ppm'e geçmek için 10.000 ile çarpın; ppm'den yüzdeye geçmek için 10.000'e bölün.",
    ] },
    { h: "PPM nerelerde kullanılır?", p: [
      "İçme suyu ve atık su analizlerinde mineral, klor, nitrat gibi maddelerin miktarı mg/L ya da ppm olarak raporlanır. Havuz bakımında serbest klor, akvaryumda amonyak ve nitrat, topraksız tarımda besin çözeltisinin derişimi ppm ile izlenir. Tarımda gübre ve ilaç etiketlerinde, gıda analizlerinde kalıntı miktarlarında da aynı birim görülür.",
      "Pratik bir örnek: 100 litrelik bir besin çözeltisinde 150 ppm azot isteniyorsa gereken saf azot miktarı 150 mg/L × 100 L = 15.000 mg, yani 15 gramdır. Gübrenin kendisinden ne kadar tartılacağı ise gübredeki azot oranına bağlıdır; bu oran ürün etiketinden alınmalıdır.",
    ] },
    { h: "Gazlarda ppm farklıdır", p: [
      "Hava kalitesi ölçümlerinde ve karbondioksit gibi gazlar için kullanılan ppm çoğunlukla hacim temellidir (ppmv): bir milyon hacim havadaki gaz hacmini anlatır. Bu değer kütle temelli ppm'e doğrudan eşit değildir ve mg/m<sup>3</sup> birimine çevrilmesi için gazın molar kütlesi ile sıcaklık ve basınç gerekir. Bu araç yalnızca kütle temelli (katı ve sıvı karışımlar) ppm hesabı yapar.",
    ] },
    { h: "Sık yapılan hatalar", ul: [
      "Miligram ile mikrogramı karıştırmak; aradaki fark bin kattır ve sonucu ppm yerine ppb düzeyine taşır.",
      "Çözelti miktarını gram yazıp birimi kilogram bırakmak ya da tersini yapmak.",
      "Etikette ürün miktarı verilmişken etken madde oranını hesaba katmamak; ppm, etken maddenin kendisi için hesaplanır.",
      "Yoğun bir sıvının hacmini litre olarak girip sonucu kütle temelli ppm saymak.",
    ] },
    { h: "Uyarı ve sınırlar", p: [
      "İçme suyu, gıda, havuz ve tarım uygulamalarında izin verilen sınır değerler ilgili mevzuatla belirlenir ve zamanla güncellenebilir; bu sayfa herhangi bir sınır değer vermez. Sağlığı ilgilendiren kararlarda akredite laboratuvar analizlerine ve güncel resmî kaynaklara başvurun. Hesap sonucu bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ["PPM nasıl hesaplanır?", "Çözünenin kütlesi çözeltinin kütlesine bölünüp bir milyonla çarpılır. Pratikte miligram cinsinden çözünen, kilogram cinsinden çözeltiye bölünür; sonuç doğrudan ppm'dir."],
    ["1 ppm kaç mg/L'dir?", "Seyreltik sulu çözeltilerde 1 ppm yaklaşık 1 mg/L'dir, çünkü 1 litre suyun kütlesi yaklaşık 1 kilogramdır. Yoğunluğu farklı sıvılarda bu eşitlik geçerli olmaz."],
    ["PPM yüzdeye nasıl çevrilir?", "ppm değeri 10.000'e bölünür. Örneğin 500 ppm, %0,05'e eşittir. Tersine, yüzdeyi 10.000 ile çarparak ppm bulunur."],
    ["PPM ile ppb arasındaki fark nedir?", "ppm milyonda bir, ppb milyarda bir kısımdır. 1 ppm 1.000 ppb eder. Çok düşük derişimlerde, örneğin eser element analizlerinde ppb tercih edilir."],
    ["Çözelti miktarı yerine çözücü miktarını yazsam olur mu?", "Çok seyreltik çözeltilerde fark ihmal edilecek kadar küçüktür, çünkü çözünen kütlesi toplamın çok küçük bir bölümüdür. Derişim arttıkça toplam çözelti kütlesini kullanmak gerekir."],
    ["Havadaki karbondioksit ppm değerini bu araçla hesaplayabilir miyim?", "Hayır. Gazlarda ppm genellikle hacim oranıdır ve farklı bir hesap gerektirir. Bu araç kütle temelli ppm için tasarlanmıştır."],
    ["Sonuç neden bilimsel gösterimle çıktı?", "Değer çok büyük ya da çok küçük olduğunda okunabilirlik için 10'un kuvveti biçiminde gösterilir. Birimleri kontrol edin; mikrogram ile miligramın karıştırılması bin katlık fark yaratır."],
    ["Girdiğim veriler paylaşılıyor mu?", "Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ["kutlece-yuzde-derisim-hesapla", "seyreltme-hesapla", "molarite-hesapla", "karisim-derisimi-hesapla", "yuzde-hesapla"],
};
