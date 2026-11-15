export default {
  slug: "kutlece-yuzde-derisim-hesapla",
  title: "Kütlece Yüzde Derişim Hesaplama",
  h1Tail: "% (m/m)",
  pageTitle: "Kütlece Yüzde Derişim Hesaplama – Çözelti Yüzdesi (% m/m) Bulma",
  description: "Çözünen ve çözücü kütlesinden kütlece yüzde derişimi hesaplayın ya da istenen yüzde için gereken çözünen ve çözücü miktarını bulun. Formül ve çözümlü örnekler.",
  card: "Çözünen ve çözücü kütlesinden kütlece yüzde derişimi bulun; ya da hedef yüzde için kaç gram madde ve su gerektiğini hesaplayın.",
  category: "bilim",
  keywords: ["kütlece yüzde derişim", "yüzde derişim hesaplama", "kütlece yüzde formülü", "çözelti yüzdesi hesaplama", "% m/m", "yüzde kaçlık çözelti", "tuzlu su yüzdesi"],
  lead: "Bir çözeltinin kütlece yüzde derişimini, yani 100 gram çözeltide kaç gram çözünen bulunduğunu hesaplayın. İsterseniz tersinden gidin: hedef yüzdeyi verin, kaç gram çözünen ve çözücü gerektiğini araç söylesin.",
  button: "Hesapla",
  inputs: [
    { id: "mod", label: "Ne hesaplanacak?", type: "select", options: [["yuzde", "Yüzde derişim (çözünen ve çözücüden)"], ["cozunen", "Gereken çözünen (yüzde ve çözelti kütlesinden)"], ["cozucu", "Gereken çözücü (çözünen ve yüzdeden)"]] },
    { id: "cozunen", label: "Çözünen kütlesi (g)", type: "number", placeholder: "Örn. 20" },
    { id: "cozucu", label: "Çözücü kütlesi (g)", type: "number", placeholder: "Örn. 80", hint: "Yalnızca yüzde derişim hesabında kullanılır." },
    { id: "yuzde", label: "Kütlece yüzde (%)", type: "number", placeholder: "Örn. 5" },
    { id: "cozelti", label: "Çözelti kütlesi (g)", type: "number", placeholder: "Örn. 200", hint: "Çözünen + çözücü toplamı; \"gereken çözünen\" hesabında kullanılır." },
  ],
  compute(v, h) {
    let cozunen, cozucu, cozelti, yuzde;
    const yuzdeAl = () => {
      const y = h.pos(v.yuzde, "Kütlece yüzde");
      if (y >= 100) h.err("Kütlece yüzde 100'den küçük olmalı; %100 çözücü içermeyen saf madde demektir.");
      return y;
    };
    if (v.mod === "yuzde") {
      cozunen = h.pos(v.cozunen, "Çözünen kütlesi");
      cozucu = h.pos(v.cozucu, "Çözücü kütlesi");
      cozelti = cozunen + cozucu;
      yuzde = cozunen / cozelti * 100;
    } else if (v.mod === "cozunen") {
      yuzde = yuzdeAl();
      cozelti = h.pos(v.cozelti, "Çözelti kütlesi");
      cozunen = cozelti * yuzde / 100;
      cozucu = cozelti - cozunen;
    } else if (v.mod === "cozucu") {
      cozunen = h.pos(v.cozunen, "Çözünen kütlesi");
      yuzde = yuzdeAl();
      cozelti = cozunen * 100 / yuzde;
      cozucu = cozelti - cozunen;
    } else h.err("Hesap türünü listeden seçin.");
    const s = {
      yuzde: ["Kütlece yüzde derişim", "%" + h.fmt(yuzde, 4)],
      cozunen: ["Çözünen kütlesi", h.fmt(cozunen, 4) + " g"],
      cozucu: ["Çözücü kütlesi", h.fmt(cozucu, 4) + " g"],
      cozelti: ["Çözelti kütlesi", h.fmt(cozelti, 4) + " g"],
    };
    const sira = v.mod === "yuzde" ? ["yuzde", "cozelti", "cozunen", "cozucu"] : v.mod === "cozunen" ? ["cozunen", "cozucu", "cozelti", "yuzde"] : ["cozucu", "cozelti", "cozunen", "yuzde"];
    const rows = sira.map((k) => s[k]);
    rows.push(["100 g çözücü başına çözünen", h.fmt(cozunen / cozucu * 100, 4) + " g"]);
    return { rows, note: "Tüm kütleler aynı birimde olmalıdır. Gram yerine kilogram yazarsanız sonuçtaki kütleleri de kilogram olarak okuyun; yüzde değişmez." };
  },
  cases: [
    { in: { mod: "yuzde", cozunen: "20", cozucu: "80" }, out: { "Kütlece yüzde derişim": "%20", "Çözelti kütlesi": "100 g", "100 g çözücü başına çözünen": "25 g" } },
    { in: { mod: "cozunen", yuzde: "5", cozelti: "200" }, out: { "Çözünen kütlesi": "10 g", "Çözücü kütlesi": "190 g" } },
    { in: { mod: "yuzde", cozunen: "25", cozucu: "100" }, out: { "Kütlece yüzde derişim": "%20", "Çözelti kütlesi": "125 g" } },
    { in: { mod: "cozucu", cozunen: "30", yuzde: "15" }, out: { "Çözücü kütlesi": "170 g", "Çözelti kütlesi": "200 g" } },
    { in: { mod: "yuzde", cozunen: "15", cozucu: "135" }, out: { "Kütlece yüzde derişim": "%10" } },
    { in: { mod: "cozunen", yuzde: "0,9", cozelti: "1000" }, out: { "Çözünen kütlesi": "9 g", "Çözücü kütlesi": "991 g" } },
    { in: { mod: "yuzde", cozunen: "36", cozucu: "100" }, out: { "Kütlece yüzde derişim": "%26,4706" } },
    { in: { mod: "cozunen", yuzde: "120", cozelti: "200" }, error: true },
    { in: { mod: "yuzde", cozunen: "20", cozucu: "" }, error: true },
  ],
  howto: [
    "\"Ne hesaplanacak?\" listesinden hesabın yönünü seçin: yüzde derişimi mi, gereken çözünen miktarını mı, yoksa gereken çözücü miktarını mı bulacaksınız?",
    "Seçtiğiniz hesap için gerekli iki alanı doldurun. Yüzde hesabında çözünen ve çözücü kütlesi, gereken çözünen hesabında yüzde ve çözelti kütlesi, gereken çözücü hesabında çözünen kütlesi ve yüzde kullanılır.",
    "Kullanılmayan alanları boş bırakabilirsiniz; araç yalnızca seçilen hesap için gerekli olanları okur.",
    "\"Hesapla\" düğmesine basın. Aranan değer ilk satırda, çözeltinin diğer bileşenleri alt satırlarda görünür.",
  ],
  sections: [
    { h: "Kütlece yüzde derişim nedir?", p: [
      "Kütlece yüzde derişim, 100 birim kütledeki çözeltide çözünmüş maddenin kütlesidir. Formülü şöyledir: <strong>% = (çözünen kütlesi ÷ çözelti kütlesi) × 100</strong>. Çözelti kütlesi, çözünen ile çözücünün toplamıdır. Kaynaklarda % (m/m) ya da % (w/w) kısaltmalarıyla da gösterilir.",
      "Bu derişim türü sıcaklıktan etkilenmez, çünkü kütle ısınmayla değişmez. Ayrıca hesaplamak için molar kütle bilmek gerekmez; yalnızca bir terazi yeterlidir. Bu nedenle gıda etiketlerinde, temizlik ürünlerinde, eczacılıkta ve okul deneylerinde çok sık kullanılır.",
    ] },
    { h: "En sık yapılan hata: paydaya çözücüyü yazmak", p: [
      "Yüzde derişimde payda çözücünün değil <strong>çözeltinin</strong> kütlesidir. 100 gram suya 25 gram şeker eklediğinizde çözelti 125 gram olur ve derişim 25 ÷ 125 × 100 = %20 çıkar; %25 değil. Araç, çözünen ile çözücüyü ayrı ayrı aldığı için toplamı kendisi hesaplar ve bu hatayı önler.",
      "Sonuç tablosundaki \"100 g çözücü başına çözünen\" satırı ise farklı bir büyüklüktür: çözünürlük tablolarında kullanılan, 100 gram çözücüde çözünmüş madde miktarını verir. %20'lik çözeltide bu değer 25 gramdır. İki kavramı karıştırmamak için ikisi de ayrı satırlarda gösterilir.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> 20 gram tuz 80 gram suda çözülüyor. Çözelti 20 + 80 = 100 gramdır; derişim 20 ÷ 100 × 100 = %20 olur.",
      "<strong>Örnek 2:</strong> 200 gram %5'lik şekerli su hazırlanacak. Gereken şeker 200 × 5 ÷ 100 = 10 gram, gereken su 200 − 10 = 190 gramdır.",
      "<strong>Örnek 3:</strong> Elinizde 30 gram madde var ve %15'lik çözelti istiyorsunuz. Çözelti kütlesi 30 × 100 ÷ 15 = 200 gram olmalıdır; yani 170 gram çözücü eklenir.",
      "<strong>Örnek 4:</strong> 100 gram suda 36 gram sofra tuzu çözünmüşse derişim 36 ÷ 136 × 100 = %26,4706 bulunur.",
    ] },
    { h: "Kullanım alanları", ul: [
      "Okul deneylerinde belirli yüzdede tuzlu ya da şekerli su hazırlamak.",
      "Turşu ve salamura için tuz oranını ayarlamak; örneğin 1000 gram salamurada %5 tuz için 50 gram tuz ve 950 gram su gerekir.",
      "Temizlik ve bahçe işlerinde etiketinde yüzde verilen ürünlerin karışımını tartarak hazırlamak.",
      "Derişim birimleri arasında dönüşüm yapmadan önce çözeltinin bileşimini netleştirmek.",
    ], p: [
      "Mutfak ve atölye işlerinde çözücüyü hacimle ölçmek yerine tartmak daha tutarlı sonuç verir. Kabın darasını alıp önce çözüneni, sonra hedef toplam kütleye ulaşana kadar çözücüyü eklerseniz ayrıca çıkarma işlemi yapmanız gerekmez; terazide okuduğunuz son değer çözelti kütlesidir.",
    ] },
    { h: "Kütlece yüzde, hacimce yüzde ve kütle/hacim yüzdesi", p: [
      "Yüzde derişimin üç yaygın türü vardır ve aynı sayı farklı anlamlar taşıyabilir. Kütlece yüzde (m/m) bu sayfada hesaplanan türdür. Hacimce yüzde (v/v), 100 mL çözeltideki çözünen sıvının mililitresidir ve kolonya, alkollü içecek gibi sıvı-sıvı karışımlarında kullanılır. Kütle/hacim yüzdesi (m/v) ise 100 mL çözeltideki çözünenin gramıdır; serum ve bazı laboratuvar çözeltilerinde görülür.",
      "Seyreltik sulu çözeltilerde yoğunluk 1 g/mL'ye yakın olduğundan m/m ve m/v değerleri birbirine yakın çıkar; ancak derişik çözeltilerde fark büyür. Bir etikette yalnızca \"%\" yazıyorsa hangi türün kastedildiğini kontrol etmek gerekir.",
    ] },
    { h: "Molariteye geçiş ve sınırlar", p: [
      "Kütlece yüzde derişimi molariteye çevirmek için çözeltinin yoğunluğu ve çözünenin molar kütlesi gerekir: M = (% × yoğunluk × 10) ÷ molar kütle; burada yoğunluk g/mL cinsindendir. Yoğunluk bilinmeden bu dönüşüm yapılamaz.",
      "Araç yalnızca aritmetiği yapar; yazdığınız miktarın çözücüde gerçekten çözünüp çözünmeyeceğini denetlemez. Çözünürlük sınırı aşılırsa fazla madde dipte kalır ve çözeltinin gerçek derişimi hesaplanandan düşük olur. Kimyasal maddelerle çalışırken ürün etiketindeki güvenlik uyarılarına uyun; sonuçlar bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ["Kütlece yüzde derişim nasıl hesaplanır?", "Çözünenin kütlesi çözeltinin toplam kütlesine bölünür ve 100 ile çarpılır. Çözelti kütlesi, çözünen ile çözücünün kütleleri toplamıdır."],
    ["100 gram suya 10 gram tuz eklersem yüzde kaç olur?", "Çözelti 110 gram olur ve derişim 10 ÷ 110 × 100, yani yaklaşık %9,09 çıkar. %10'luk çözelti için 10 gram tuz 90 gram suda çözülmelidir."],
    ["%10'luk 500 gram çözelti için ne kadar madde gerekir?", "500 × 10 ÷ 100 = 50 gram çözünen ve 450 gram çözücü gerekir. Araçta \"Gereken çözünen\" seçeneğiyle bu hesabı yapabilirsiniz."],
    ["Çözücü kütlesi yerine hacim yazabilir miyim?", "Yalnızca su için ve yaklaşık olarak: oda sıcaklığında 1 mL su yaklaşık 1 gramdır. Başka sıvılarda hacmi yoğunlukla çarparak kütleye çevirmeniz gerekir."],
    ["Gram yerine kilogram kullanabilir miyim?", "Evet. Formül oran olduğu için tüm kütleler aynı birimde olduğu sürece yüzde değişmez. Sonuçtaki kütleleri de yazdığınız birimde okuyun."],
    ["Yüzde derişim 100'ü geçebilir mi?", "Hayır. Çözünen, çözeltinin bir parçası olduğundan kütlece yüzde her zaman 0 ile 100 arasındadır. 100 gram çözücüde çözünen miktar ise 100 gramı aşabilir; bu ayrı bir büyüklüktür."],
    ["Kütlece yüzde ile ppm arasındaki ilişki nedir?", "%1, milyonda 10.000 parçaya (10.000 ppm) eşittir. Çok seyreltik çözeltilerde küçük yüzdeler yerine ppm kullanmak daha okunaklıdır."],
    ["Yazdığım değerler bir yere kaydediliyor mu?", "Hayır. Hesap tarayıcınızda çalışır; girdiğiniz kütle ve yüzde değerleri sunucuya gönderilmez, saklanmaz."],
  ],
  related: ["ppm-hesapla", "molarite-hesapla", "molalite-hesapla", "karisim-derisimi-hesapla", "cozunurluk-hesapla", "yuzde-hesapla"],
};
