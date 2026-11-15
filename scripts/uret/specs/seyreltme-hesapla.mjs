export default {
  slug: "seyreltme-hesapla",
  title: "Seyreltme Hesaplama (M1V1 = M2V2)",
  h1Tail: "stok çözeltiden seyreltik çözelti",
  pageTitle: "Seyreltme Hesaplama – M1V1 = M2V2 Formülü ile Çözelti Seyreltme",
  description: "M1V1 = M2V2 bağıntısıyla stok hacmini, son derişimi, son hacmi ya da stok derişimini bulun. Eklenecek su miktarı ve seyreltme katsayısı da gösterilir.",
  card: "M1V1 = M2V2 ile gereken stok hacmini, son derişimi ya da son hacmi hesaplayın; eklenecek çözücü miktarıyla birlikte.",
  category: "bilim",
  keywords: ["seyreltme hesaplama", "M1V1 = M2V2", "çözelti seyreltme", "stok çözelti hesaplama", "seyreltme formülü", "kaç ml su eklenmeli", "seyreltme katsayısı"],
  lead: "Derişik bir stok çözeltiden istediğiniz derişimde çözelti hazırlamak için <strong>M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub></strong> bağıntısındaki bilinmeyeni bulun. Üç değeri yazın, dördüncüsünü ve eklenecek çözücü miktarını araç hesaplasın.",
  button: "Hesapla",
  inputs: [
    { id: "bilinmeyen", label: "Hesaplanacak değer", type: "select", options: [["v1", "Stok hacmi (V1)"], ["m2", "Son derişim (M2)"], ["v2", "Son hacim (V2)"], ["m1", "Stok derişimi (M1)"]] },
    { id: "m1", label: "Stok derişimi (M1)", type: "number", placeholder: "Örn. 12", hint: "Hesaplanacak değerin alanını boş bırakın." },
    { id: "v1", label: "Stok hacmi (V1)", type: "number", placeholder: "Örn. 50" },
    { id: "m2", label: "Son derişim (M2)", type: "number", placeholder: "Örn. 1", hint: "M1 ile aynı birimde olmalı (mol/L, % ya da ppm)." },
    { id: "v2", label: "Son hacim (V2)", type: "number", placeholder: "Örn. 500" },
    { id: "hacimBirim", label: "Hacim birimi", type: "select", options: [["mL", "mililitre (mL)"], ["L", "litre (L)"]] },
  ],
  compute(v, h) {
    const b = v.bilinmeyen;
    const ad = { m1: "Stok derişimi (M1)", v1: "Stok hacmi (V1)", m2: "Son derişim (M2)", v2: "Son hacim (V2)" };
    const d = {};
    for (const k of ["m1", "v1", "m2", "v2"]) if (k !== b) d[k] = h.pos(v[k], ad[k]);
    if (b === "v1") d.v1 = d.m2 * d.v2 / d.m1;
    else if (b === "m2") d.m2 = d.m1 * d.v1 / d.v2;
    else if (b === "v2") d.v2 = d.m1 * d.v1 / d.m2;
    else if (b === "m1") d.m1 = d.m2 * d.v2 / d.v1;
    else h.err("Hesaplanacak değeri listeden seçin.");
    if (d.m2 > d.m1 * (1 + 1e-9)) h.err("Son derişim stok derişiminden büyük olamaz; seyreltme derişimi yalnızca düşürür. Değerleri kontrol edin.");
    if (d.v1 > d.v2 * (1 + 1e-9)) h.err("Stok hacmi son hacimden büyük olamaz. V1 ve V2 değerlerini kontrol edin.");
    const u = v.hacimBirim === "L" ? "L" : "mL";
    const satir = {
      m1: [ad.m1, h.sig(d.m1, 6)],
      v1: [ad.v1, h.sig(d.v1, 6) + " " + u],
      m2: [ad.m2, h.sig(d.m2, 6)],
      v2: [ad.v2, h.sig(d.v2, 6) + " " + u],
    };
    const rows = [satir[b]];
    for (const k of ["m1", "v1", "m2", "v2"]) if (k !== b) rows.push(satir[k]);
    const ek = Math.max(0, d.v2 - d.v1);
    rows.push(["Eklenecek çözücü", h.sig(ek, 6) + " " + u]);
    rows.push(["Seyreltme katsayısı", h.sig(d.v2 / d.v1, 6) + " kat"]);
    return { rows, note: "Derişimler aynı birimde yazılmalıdır; sonuç da o birimdedir. Eklenecek çözücü, hacimlerin toplanabilir olduğu varsayımıyla V2 − V1 olarak verilir." };
  },
  cases: [
    { in: { bilinmeyen: "v1", m1: "12", m2: "1", v2: "500", hacimBirim: "mL" }, out: { "Stok hacmi (V1)": "41,6667 mL", "Eklenecek çözücü": "458,333 mL", "Seyreltme katsayısı": "12 kat" } },
    { in: { bilinmeyen: "m2", m1: "2", v1: "50", v2: "200", hacimBirim: "mL" }, out: { "Son derişim (M2)": "0,5", "Eklenecek çözücü": "150 mL", "Seyreltme katsayısı": "4 kat" } },
    { in: { bilinmeyen: "v2", m1: "1", v1: "100", m2: "0,25", hacimBirim: "mL" }, out: { "Son hacim (V2)": "400 mL", "Eklenecek çözücü": "300 mL" } },
    { in: { bilinmeyen: "m1", v1: "10", m2: "0,1", v2: "1000", hacimBirim: "mL" }, out: { "Stok derişimi (M1)": "10", "Seyreltme katsayısı": "100 kat" } },
    { in: { bilinmeyen: "v1", m1: "5", m2: "0,5", v2: "2", hacimBirim: "L" }, out: { "Stok hacmi (V1)": "0,2 L", "Eklenecek çözücü": "1,8 L", "Seyreltme katsayısı": "10 kat" } },
    { in: { bilinmeyen: "v1", m1: "96", m2: "70", v2: "1000", hacimBirim: "mL" }, out: { "Stok hacmi (V1)": "729,167 mL" } },
    { in: { bilinmeyen: "v1", m1: "1", m2: "2", v2: "500", hacimBirim: "mL" }, error: true },
    { in: { bilinmeyen: "m2", m1: "2", v1: "", v2: "200", hacimBirim: "mL" }, error: true },
  ],
  howto: [
    "\"Hesaplanacak değer\" listesinden neyi bulmak istediğinizi seçin: çoğu zaman bu, pipetle çekilecek stok hacmi olan V1'dir.",
    "Kalan üç alanı doldurun, hesaplanacak değerin alanını boş bırakın. Stok ve son derişimi aynı birimle yazın.",
    "Hacimler için mililitre ya da litreyi seçin; iki hacim de aynı birimde kabul edilir.",
    "\"Hesapla\" düğmesine basın. İlk satırda aranan değer, altında diğer veriler, eklenecek çözücü miktarı ve seyreltme katsayısı görünür.",
  ],
  sections: [
    { h: "Seyreltme nedir ve M1V1 = M2V2 nereden gelir?", p: [
      "Seyreltme, bir çözeltiye çözücü ekleyerek derişimini düşürme işlemidir. Bu sırada çözünen maddenin miktarı değişmez; yalnızca daha büyük bir hacme yayılır. Çözünenin mol sayısı derişim ile hacmin çarpımına eşit olduğundan (n = M × V), seyreltme öncesi ve sonrası için şu eşitlik yazılır: <strong>M<sub>1</sub> × V<sub>1</sub> = M<sub>2</sub> × V<sub>2</sub></strong>.",
      "Burada M<sub>1</sub> stok (derişik) çözeltinin derişimi, V<sub>1</sub> bu stoktan alınan hacim, M<sub>2</sub> hedeflenen derişim ve V<sub>2</sub> seyreltme sonundaki toplam hacimdir. Dört değerden üçü bilindiğinde dördüncüsü tek bir çarpma ve bölmeyle bulunur.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1 – stok hacmi:</strong> 12 M hidroklorik asitten 500 mL 1 M çözelti hazırlanacak. V<sub>1</sub> = M<sub>2</sub> × V<sub>2</sub> / M<sub>1</sub> = 1 × 500 / 12 = 41,6667 mL. Bu miktar stok alınır ve hacim suyla 500 mL'ye tamamlanır; eklenen su yaklaşık 458,333 mL'dir. Çözelti 12 kat seyreltilmiştir.",
      "<strong>Örnek 2 – son derişim:</strong> 2 M çözeltiden 50 mL alınıp 200 mL'ye tamamlanırsa M<sub>2</sub> = 2 × 50 / 200 = 0,5 M olur. Hacim 4 katına çıktığı için derişim dörtte birine inmiştir.",
      "<strong>Örnek 3 – son hacim:</strong> 100 mL 1 M çözeltiyi 0,25 M yapmak için V<sub>2</sub> = 1 × 100 / 0,25 = 400 mL gerekir; yani 300 mL çözücü eklenir.",
    ] },
    { h: "Birimler: yalnızca molarite için değil", p: [
      "Bağıntı, çözünen miktarıyla doğru orantılı olan her derişim birimi için geçerlidir. Molarite yerine hacimce yüzde, g/L, mg/L ya da ppm kullanabilirsiniz; önemli olan iki derişimin aynı birimde, iki hacmin de aynı birimde olmasıdır. Örneğin hacimce %96'lık alkolden 1000 mL %70'lik çözelti için 70 × 1000 / 96 = 729,167 mL stok gerekir.",
      "Kütlece yüzde derişimlerde hacim yerine kütle kullanmak daha doğrudur, çünkü derişik çözeltilerin yoğunluğu sudan farklıdır. Molalite ise çözücü kütlesine dayandığı için bu formüle doğrudan uymaz.",
    ] },
    { h: "Laboratuvarda doğru seyreltme nasıl yapılır?", ol: [
      "Hesaplanan V1 hacmindeki stok çözeltiyi pipet ya da mezürle ölçün.",
      "Stok çözeltiyi, içinde bir miktar çözücü bulunan balon jojeye aktarın.",
      "Çizgiye kadar çözücü ekleyerek toplam hacmi V2'ye tamamlayın ve kabı ters çevirerek karıştırın.",
    ], p: [
      "Araçtaki \"Eklenecek çözücü\" satırı V<sub>2</sub> − V<sub>1</sub> farkıdır ve pratik bir kılavuzdur. Bazı karışımlarda (örneğin alkol-su ya da derişik asit-su) hacimler tam olarak toplanmaz; bu yüzden hassas işlerde çözücüyü ölçüp eklemek yerine hacmi çizgiye tamamlamak esastır.",
      "Derişik asitleri seyreltirken her zaman <strong>asidi suya</strong> yavaşça ekleyin; tersi sıçramaya ve ani ısınmaya yol açabilir. Koruyucu gözlük ve eldiven kullanın.",
    ] },
    { h: "Seyreltme katsayısı ve seri seyreltme", p: [
      "Seyreltme katsayısı V<sub>2</sub> / V<sub>1</sub> oranıdır ve aynı zamanda M<sub>1</sub> / M<sub>2</sub>'ye eşittir. 10 kat seyreltme, 1 hacim stok üzerine 9 hacim çözücü eklemek demektir; bazı kaynaklarda bu 1:10 biçiminde yazılır.",
      "Çok düşük derişimlere tek adımda inmek, ölçülmesi zor küçük hacimler gerektirir. Bunun yerine seri seyreltme yapılır: her adımda örneğin 10 kat seyreltilir ve üç adım sonunda toplam 1000 kat seyreltme elde edilir. Toplam katsayı, adımların katsayılarının çarpımıdır. Mikrobiyolojide koloni sayımı ve analitik kimyada kalibrasyon çözeltileri bu yöntemle hazırlanır.",
    ] },
    { h: "Sık yapılan hatalar", ul: [
      "V2'yi eklenecek su miktarı sanmak: V2 toplam son hacimdir, eklenen su V2 − V1'dir.",
      "Bir hacmi mililitre, diğerini litre olarak yazmak.",
      "Son derişimi stok derişiminden büyük girmek; seyreltmeyle derişim artırılamaz, bunun için çözücü buharlaştırılmalı ya da çözünen eklenmelidir.",
      "İki farklı derişimdeki çözeltinin karıştırılmasını bu formülle çözmeye çalışmak; o durumda karışım derişimi hesabı gerekir.",
    ] },
  ],
  faq: [
    ["M1V1 = M2V2 formülü ne zaman kullanılır?", "Bir çözeltiye yalnızca çözücü eklenerek derişimi düşürüldüğünde kullanılır. Çözünen miktarı sabit kaldığı için ilk derişim ile ilk hacmin çarpımı, son derişim ile son hacmin çarpımına eşittir."],
    ["Kaç mL su eklemem gerektiğini nasıl bulurum?", "Önce V1 ya da V2 hesaplanır, ardından son hacimden stok hacmi çıkarılır. Araç bu farkı \"Eklenecek çözücü\" satırında verir. Hassas çalışmalarda suyu ölçerek eklemek yerine hacmi ölçülü kapta çizgiye tamamlayın."],
    ["Derişimi yüzde olarak yazabilir miyim?", "Evet. İki derişim de aynı türden olduğu sürece yüzde, g/L, ppm ya da mol/L yazabilirsiniz; sonuç aynı birimde çıkar. Araç derişim birimini dönüştürmez."],
    ["Seyreltme katsayısı ne anlama gelir?", "Son hacmin stok hacmine oranıdır. 5 kat seyreltme, derişimin beşte birine indiğini gösterir; örneğin 10 mL stok 50 mL'ye tamamlanmıştır."],
    ["Son derişim stok derişiminden büyük olabilir mi?", "Hayır. Çözücü eklemek derişimi yalnızca azaltır. Böyle bir değer girildiğinde araç hata verir; büyük olasılıkla M1 ve M2 yer değiştirmiştir."],
    ["İki farklı çözeltiyi karıştırırsam bu formül geçerli mi?", "Tek başına geçerli değildir. İki çözeltinin de çözünen içerdiği durumda toplam mol sayısı toplam hacme bölünür: M = (M1V1 + M2V2) / (V1 + V2)."],
    ["Hacimleri litre olarak girebilir miyim?", "Evet, hacim birimi listesinden litreyi seçin. Formül oran temelli olduğundan sayısal sonuç değişmez; yalnızca gösterilen birim değişir."],
    ["Yazdığım veriler bir yere gönderiliyor mu?", "Hayır. Hesaplama tarayıcınızın içinde yapılır; girdiğiniz derişim ve hacim değerleri sunucuya iletilmez, kaydedilmez."],
  ],
  related: ["molarite-hesapla", "karisim-derisimi-hesapla", "kutlece-yuzde-derisim-hesapla", "ppm-hesapla", "titrasyon-hesapla"],
};
