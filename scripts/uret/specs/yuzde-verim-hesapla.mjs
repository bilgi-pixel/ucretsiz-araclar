export default {
  slug: "yuzde-verim-hesapla",
  title: "Yüzde Verim Hesaplama (Kimya)",
  h1Tail: "gerçek verim ÷ teorik verim",
  pageTitle: "Yüzde Verim Hesaplama – Kimyasal Tepkime Verimi (Gerçek / Teorik)",
  description: "Gerçek ve teorik verimden kimyasal tepkimenin yüzde verimini hesaplayın; ya da verim yüzdesinden beklenen gerçek ürün ve gereken teorik miktarı bulun.",
  card: "Gerçek ve teorik ürün miktarından tepkimenin yüzde verimini bulun; ya da verimden elde edilecek ürünü hesaplayın.",
  category: "bilim",
  keywords: ["yüzde verim hesaplama", "tepkime verimi", "teorik verim", "gerçek verim", "kimya verim formülü", "verim yüzdesi nasıl bulunur", "reaksiyon verimi"],
  lead: "Bir kimyasal tepkimede elde ettiğiniz ürün miktarını, kâğıt üzerinde hesaplanan en yüksek miktarla karşılaştırın. Araç <strong>yüzde verim = (gerçek verim ÷ teorik verim) × 100</strong> bağıntısını üç yönde de çözer.",
  button: "Hesapla",
  inputs: [
    { id: "mod", label: "Ne hesaplanacak?", type: "select", options: [["verim", "Yüzde verim (gerçek ve teorikten)"], ["gercek", "Gerçek verim (teorik ve yüzdeden)"], ["teorik", "Teorik verim (gerçek ve yüzdeden)"]] },
    { id: "gercek", label: "Gerçek verim (elde edilen ürün)", type: "number", placeholder: "Örn. 8" },
    { id: "teorik", label: "Teorik verim (hesaplanan en yüksek ürün)", type: "number", placeholder: "Örn. 10" },
    { id: "yuzde", label: "Yüzde verim (%)", type: "number", placeholder: "Örn. 80", hint: "Yalnızca gerçek ya da teorik verimi hesaplarken doldurun." },
    { id: "birim", label: "Miktar birimi", type: "select", options: [["g", "gram (g)"], ["kg", "kilogram (kg)"], ["mol", "mol"], ["L", "litre (L)"]] },
  ],
  compute(v, h) {
    let gercek, teorik, yuzde;
    const yuzdeAl = () => {
      const y = h.pos(v.yuzde, "Yüzde verim");
      if (y > 100) h.err("Yüzde verim 100'den büyük girilemez; teorik verim elde edilebilecek en yüksek miktardır.");
      return y;
    };
    if (v.mod === "verim") {
      gercek = h.nonneg(v.gercek, "Gerçek verim");
      teorik = h.pos(v.teorik, "Teorik verim");
      yuzde = gercek / teorik * 100;
    } else if (v.mod === "gercek") {
      teorik = h.pos(v.teorik, "Teorik verim");
      yuzde = yuzdeAl();
      gercek = teorik * yuzde / 100;
    } else if (v.mod === "teorik") {
      gercek = h.pos(v.gercek, "Gerçek verim");
      yuzde = yuzdeAl();
      teorik = gercek * 100 / yuzde;
    } else h.err("Hesap türünü listeden seçin.");
    const u = { g: "g", kg: "kg", mol: "mol", L: "L" }[v.birim] || "g";
    const s = {
      verim: ["Yüzde verim", "%" + h.fmt(yuzde, 4)],
      gercek: ["Gerçek verim", h.fmt(gercek, 4) + " " + u],
      teorik: ["Teorik verim", h.fmt(teorik, 4) + " " + u],
    };
    const rows = [s[v.mod]];
    for (const k of ["verim", "gercek", "teorik"]) if (k !== v.mod) rows.push(s[k]);
    rows.push(["Kayıp (elde edilemeyen ürün)", h.fmt(Math.max(0, teorik - gercek), 4) + " " + u]);
    const fazla = yuzde > 100 + 1e-9;
    return {
      rows,
      note: fazla
        ? "Verim %100'ün üzerinde çıktı. Bu, gerçekte mümkün değildir; ürün yeterince kurutulmamış ya da saf olmayabilir, tartım ya da teorik verim hesabı hatalı olabilir."
        : "Gerçek ve teorik verim aynı birimde olmalıdır. Teorik verim, sınırlayıcı bileşene göre stokiyometriyle hesaplanan en yüksek ürün miktarıdır.",
    };
  },
  cases: [
    { in: { mod: "verim", gercek: "8", teorik: "10", birim: "g" }, out: { "Yüzde verim": "%80", "Kayıp (elde edilemeyen ürün)": "2 g" } },
    { in: { mod: "gercek", teorik: "50", yuzde: "90", birim: "g" }, out: { "Gerçek verim": "45 g", "Kayıp (elde edilemeyen ürün)": "5 g" } },
    { in: { mod: "verim", gercek: "15", teorik: "20", birim: "g" }, out: { "Yüzde verim": "%75" } },
    { in: { mod: "teorik", gercek: "12", yuzde: "60", birim: "g" }, out: { "Teorik verim": "20 g", "Kayıp (elde edilemeyen ürün)": "8 g" } },
    { in: { mod: "verim", gercek: "0,35", teorik: "0,5", birim: "mol" }, out: { "Yüzde verim": "%70", "Kayıp (elde edilemeyen ürün)": "0,15 mol" } },
    { in: { mod: "verim", gercek: "9,2", teorik: "9,2", birim: "g" }, out: { "Yüzde verim": "%100", "Kayıp (elde edilemeyen ürün)": "0 g" } },
    { in: { mod: "verim", gercek: "11", teorik: "10", birim: "g" }, out: { "Yüzde verim": "%110" } },
    { in: { mod: "verim", gercek: "8", teorik: "0", birim: "g" }, error: true },
    { in: { mod: "gercek", teorik: "50", yuzde: "130", birim: "g" }, error: true },
  ],
  howto: [
    "\"Ne hesaplanacak?\" listesinden yüzde verimi mi, gerçek verimi mi, yoksa teorik verimi mi bulacağınızı seçin.",
    "Yüzde verim için deneyde elde ettiğiniz ürün miktarını \"Gerçek verim\", stokiyometriyle hesapladığınız miktarı \"Teorik verim\" alanına yazın.",
    "Gerçek ya da teorik verimi arıyorsanız bilinen miktarı ve \"Yüzde verim\" değerini girin; diğer alanı boş bırakın.",
    "Miktarların birimini seçin; gerçek ve teorik verim aynı birimde olmalıdır.",
    "\"Hesapla\" düğmesine basın. Aranan değer ilk satırda, kaybedilen ürün miktarı son satırda görünür.",
  ],
  sections: [
    { h: "Teorik verim, gerçek verim ve yüzde verim", p: [
      "<strong>Teorik verim</strong>, tepkime denklemi ve başlangıç miktarlarına göre, her şey kusursuz gittiğinde oluşması beklenen en yüksek ürün miktarıdır. Denkleştirilmiş tepkime denkleminden mol oranlarıyla hesaplanır ve hesap her zaman sınırlayıcı bileşen (önce tükenen madde) üzerinden yapılır.",
      "<strong>Gerçek verim</strong>, deney sonunda tartılarak ya da ölçülerek bulunan ürün miktarıdır. <strong>Yüzde verim</strong> ise ikisinin oranıdır: gerçek verim teorik verime bölünür ve 100 ile çarpılır. Değer 100'e ne kadar yakınsa tepkime ve ürün toplama işlemi o kadar başarılıdır.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> Hesaplara göre 10 gram ürün oluşması beklenen bir deneyde 8 gram ürün elde ediliyor. Yüzde verim 8 ÷ 10 × 100 = %80'dir; 2 gram ürün kaybedilmiştir.",
      "<strong>Örnek 2:</strong> Teorik verimi 50 gram olan bir tepkime %90 verimle gerçekleşiyorsa elde edilecek ürün 50 × 90 ÷ 100 = 45 gramdır.",
      "<strong>Örnek 3:</strong> %60 verimle çalışan bir tepkimeden 12 gram ürün almak istiyorsunuz. Teorik verim 12 × 100 ÷ 60 = 20 gram olmalıdır; başlangıç maddelerini 20 gram ürün verecek kadar almanız gerekir.",
      "<strong>Örnek 4 – mol ile:</strong> 0,5 mol ürün beklenirken 0,35 mol elde edilmişse verim 0,35 ÷ 0,5 × 100 = %70 olur.",
    ] },
    { h: "Teorik verim nasıl bulunur?", ol: [
      "Tepkime denklemini yazın ve denkleştirin.",
      "Tepkimeye giren maddelerin kütlelerini molar kütlelerine bölerek mol sayılarına çevirin.",
      "Mol sayılarını denklemdeki katsayılara bölerek sınırlayıcı bileşeni belirleyin; en küçük oranı veren madde sınırlayıcıdır.",
      "Sınırlayıcı bileşenin mol sayısından, katsayı oranıyla ürünün mol sayısına geçin.",
      "Ürünün mol sayısını molar kütlesiyle çarparak teorik verimi gram olarak bulun.",
    ], p: [
      "Örnek: 2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O tepkimesinde 4 gram hidrojen (2 mol) yeterli oksijenle tepkimeye girerse 2 mol, yani 36 gram su oluşması beklenir. Deneyde 27 gram su toplanmışsa yüzde verim 27 ÷ 36 × 100 = %75'tir.",
    ] },
    { h: "Verim neden %100'den düşük çıkar?", ul: [
      "Tepkime tamamlanmadan dengeye ulaşır; girenlerin bir kısmı tepkimeye girmeden kalır.",
      "İstenen ürünün yanında yan tepkimelerle başka maddeler oluşur.",
      "Süzme, aktarma, yıkama ve kristallendirme sırasında ürünün bir bölümü kapta, süzgeç kâğıdında ya da çözeltide kalır.",
      "Başlangıç maddeleri saf değildir; tartılan kütlenin tamamı tepkimeye giren madde olmaz.",
      "Gaz ürünler toplanırken kaçak olur ya da ürün uçucudur.",
    ] },
    { h: "Verim %100'den büyük çıkarsa", p: [
      "Kütlenin korunumu gereği gerçek verim teorik verimi aşamaz. Hesap %100'ün üzerinde sonuç veriyorsa bir yerde hata vardır. En yaygın nedenler ürünün yeterince kurutulmaması (içinde su ya da çözücü kalması), ürünün safsızlık içermesi, tartım hatası ve teorik verimin yanlış bileşen üzerinden hesaplanmasıdır.",
      "Araç, gerçek verimi teorik verimden büyük girdiğinizde sonucu yine gösterir ama altına bir uyarı notu ekler. Böylece deney raporunda bu durumu fark edip nedenini tartışabilirsiniz.",
    ] },
    { h: "Çok basamaklı sentezlerde toplam verim", p: [
      "Bir ürün birkaç ardışık tepkimeyle elde ediliyorsa toplam verim, basamak verimlerinin çarpımıdır. Her biri %80 verimli üç basamağın toplam verimi 0,8 × 0,8 × 0,8 = 0,512, yani %51,2 olur. Bu nedenle endüstride ve ilaç sentezinde basamak sayısını azaltmak ve her basamağın verimini yükseltmek büyük önem taşır.",
    ] },
    { h: "Birimler ve sınırlar", p: [
      "Yüzde verim bir oran olduğundan gram, kilogram ya da mol kullanmanız sonucu değiştirmez; yeter ki gerçek ve teorik verim aynı birimde olsun. Gaz ürünlerde aynı sıcaklık ve basınçta ölçülmüş hacimler de kullanılabilir.",
      "Araç teorik verimi sizin yerinize stokiyometriyle hesaplamaz; bu değeri denkleme göre önceden bulmanız gerekir. Fizikteki makine verimi (çıkan enerji ÷ giren enerji) farklı bir kavramdır ve bu sayfanın konusu değildir. Sonuçlar eğitim ve bilgilendirme amaçlıdır.",
    ] },
  ],
  faq: [
    ["Yüzde verim nasıl hesaplanır?", "Deneyde elde edilen ürün miktarı (gerçek verim), stokiyometriyle hesaplanan en yüksek miktara (teorik verim) bölünür ve 100 ile çarpılır."],
    ["Teorik verim ile gerçek verim arasındaki fark nedir?", "Teorik verim kâğıt üzerinde hesaplanan, kayıpsız ve tam tepkime varsayımıyla bulunan miktardır. Gerçek verim laboratuvarda ölçülen miktardır ve hemen her zaman daha düşüktür."],
    ["Yüzde verim 100'den büyük olabilir mi?", "Gerçekte olamaz. Böyle bir sonuç ürünün nemli ya da saf olmadığını, tartımda ya da teorik verim hesabında hata olduğunu gösterir."],
    ["Verimi mol üzerinden hesaplayabilir miyim?", "Evet. Gerçek ve teorik verim aynı birimde olduğu sürece gram, kilogram ya da mol kullanabilirsiniz; oran aynı kalır."],
    ["İstediğim ürün miktarı için ne kadar madde almalıyım?", "Önce \"Teorik verim\" seçeneğiyle hedef ürün ve beklenen verimden teorik miktarı bulun. Ardından bu miktarı verecek giren madde miktarını tepkime denkleminden hesaplayın."],
    ["Sınırlayıcı bileşen verimi nasıl etkiler?", "Teorik verim sınırlayıcı bileşene göre hesaplanır. Fazla olan madde üzerinden hesap yapılırsa teorik verim olduğundan büyük, yüzde verim ise olduğundan küçük çıkar."],
    ["İyi bir verim yüzde kaçtır?", "Tepkimeye göre değişir. Basit çöktürme tepkimelerinde yüksek verimler beklenirken, çok basamaklı organik sentezlerde daha düşük değerler olağandır; evrensel bir eşik yoktur."],
    ["Girdiğim deney verileri saklanıyor mu?", "Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ["mol-hesapla", "molar-kutle-hesapla", "yuzde-hesapla", "molarite-hesapla", "kutle-yuzdesi-bilesik-hesapla"],
};
