export default {
  slug: "ph-hesapla",
  title: "pH ve pOH Hesaplama",
  h1Tail: "derişimden pH, pH'den derişim",
  pageTitle: "pH ve pOH Hesaplama – Hidrojen ve Hidroksit Derişiminden pH Bulma",
  description: "H+ ya da OH− derişiminden pH ve pOH değerini, pH'den iyon derişimlerini hesaplayın. 25 °C için pH + pOH = 14 bağıntısı kullanılır; ortam türü de gösterilir.",
  card: "H+ veya OH− derişiminden pH ve pOH'yi, pH'den iyon derişimlerini bulun; çözelti asidik mi bazik mi görün.",
  category: "bilim",
  keywords: ["pH hesaplama", "pOH hesaplama", "pH formülü", "hidrojen iyonu derişimi", "pH nasıl bulunur", "pH pOH 14", "asit baz pH"],
  lead: "Hidrojen ya da hidroksit iyonu derişimini yazarak çözeltinin <strong>pH</strong> ve <strong>pOH</strong> değerini bulun; ya da pH'yi vererek iyon derişimlerine geri dönün. Hesap 25 °C'deki sulu çözeltiler için geçerli olan pH + pOH = 14 bağıntısına dayanır.",
  button: "Hesapla",
  inputs: [
    { id: "tur", label: "Bilinen değer", type: "select", options: [["h", "[H+] derişimi (mol/L)"], ["oh", "[OH−] derişimi (mol/L)"], ["ph", "pH"], ["poh", "pOH"]] },
    { id: "deger", label: "Değer", type: "text", placeholder: "Örn. 0,001 ya da 1e-3", hint: "Çok küçük derişimleri 2,5e-4 biçiminde yazabilirsiniz." },
  ],
  compute(v, h) {
    const x = h.num(v.deger, "Değer");
    let ph;
    if (v.tur === "h" || v.tur === "oh") {
      if (!(x > 0)) h.err("Derişim sıfırdan büyük olmalı; logaritma sıfır ve negatif sayılar için tanımsızdır.");
      const p = -Math.log10(x);
      ph = v.tur === "h" ? p : 14 - p;
    } else if (v.tur === "ph") ph = x;
    else if (v.tur === "poh") ph = 14 - x;
    else h.err("Bilinen değerin türünü listeden seçin.");
    if (ph < -2 || ph > 16) h.err("Sonuç gerçekçi pH aralığının (yaklaşık −2 ile 16) dışında kalıyor. Yazdığınız değeri ve türünü kontrol edin.");
    const poh = 14 - ph;
    const hc = Math.pow(10, -ph);
    const ohc = Math.pow(10, -poh);
    const ortam = Math.abs(ph - 7) < 1e-9 ? "Nötr" : ph < 7 ? "Asidik" : "Bazik";
    return {
      rows: [
        ["pH", h.fmt(ph, 4)],
        ["pOH", h.fmt(poh, 4)],
        ["[H+] derişimi", h.sig(hc, 4) + " mol/L"],
        ["[OH−] derişimi", h.sig(ohc, 4) + " mol/L"],
        ["Ortam", ortam],
      ],
      note: "25 °C'de suyun iyonlaşma sabiti 1 × 10^-14 alınmıştır (pH + pOH = 14). Derişim yerine aktiflik gerektiren çok derişik çözeltilerde sonuç yaklaşık kalır.",
    };
  },
  cases: [
    { in: { tur: "h", deger: "0,001" }, out: { "pH": "3", "pOH": "11", "Ortam": "Asidik" } },
    { in: { tur: "oh", deger: "0,01" }, out: { "pH": "12", "pOH": "2", "Ortam": "Bazik" } },
    { in: { tur: "ph", deger: "7" }, out: { "[H+] derişimi": "1 × 10^-7 mol/L", "[OH−] derişimi": "1 × 10^-7 mol/L", "Ortam": "Nötr" } },
    { in: { tur: "ph", deger: "4,5" }, out: { "pOH": "9,5", "[H+] derişimi": "0,00003162 mol/L" } },
    { in: { tur: "h", deger: "2,5e-4" }, out: { "pH": "3,6021", "pOH": "10,3979" } },
    { in: { tur: "poh", deger: "3" }, out: { "pH": "11", "[OH−] derişimi": "0,001 mol/L", "Ortam": "Bazik" } },
    { in: { tur: "h", deger: "1" }, out: { "pH": "0", "pOH": "14" } },
    { in: { tur: "h", deger: "0" }, error: true },
    { in: { tur: "ph", deger: "20" }, error: true },
  ],
  howto: [
    "\"Bilinen değer\" listesinden elinizdeki verinin türünü seçin: hidrojen iyonu derişimi, hidroksit iyonu derişimi, pH ya da pOH.",
    "\"Değer\" alanına sayıyı yazın. Derişimler mol/L cinsindendir; 0,00025 yerine 2,5e-4 yazımı da kabul edilir.",
    "\"Hesapla\" düğmesine basın. pH, pOH, iki iyonun derişimi ve çözeltinin asidik, bazik ya da nötr olduğu satır satır görünür.",
    "Farklı bir değer denemek için alanı değiştirip yeniden hesaplayın; sonuçları kopyalayıp ödevinize ya da raporunuza ekleyebilirsiniz.",
  ],
  sections: [
    { h: "pH ve pOH nedir?", p: [
      "pH, bir sulu çözeltideki hidrojen iyonu derişiminin eksi işaretli onluk logaritmasıdır: <strong>pH = −log[H<sup>+</sup>]</strong>. Benzer biçimde <strong>pOH = −log[OH<sup>−</sup>]</strong> hidroksit iyonu derişimini ifade eder. Logaritma kullanılmasının nedeni, derişimlerin 1 mol/L ile 0,00000000000001 mol/L arasında çok geniş bir aralıkta değişmesidir; pH ölçeği bu aralığı kabaca 0 ile 14 arasındaki okunaklı sayılara sıkıştırır.",
      "Saf su çok az da olsa iyonlaşır ve 25 °C'de hidrojen ile hidroksit derişimlerinin çarpımı 1 × 10<sup>−14</sup> değerine eşittir. Bu eşitliğin logaritması alındığında <strong>pH + pOH = 14</strong> elde edilir. Dolayısıyla dört büyüklükten birini bilmek diğer üçünü bulmaya yeter.",
    ] },
    { h: "Asidik, bazik ve nötr ortam", p: [
      "25 °C'de pH değeri 7 olan çözelti nötrdür; hidrojen ve hidroksit derişimleri birbirine eşittir. pH 7'den küçükse ortam asidik, büyükse baziktir. Ölçek logaritmik olduğundan pH'deki 1 birimlik fark, hidrojen iyonu derişiminde 10 katlık fark demektir: pH 3 olan bir çözelti, pH 5 olana göre 100 kat daha fazla hidrojen iyonu içerir.",
    ] },
    { h: "Çözümlü örnekler", p: [
      "<strong>Örnek 1:</strong> Hidrojen iyonu derişimi 0,001 mol/L olan çözeltide pH = −log(0,001) = 3'tür. pOH = 14 − 3 = 11 ve ortam asidiktir.",
      "<strong>Örnek 2:</strong> Hidroksit derişimi 0,01 mol/L ise pOH = 2, pH = 14 − 2 = 12 bulunur; çözelti baziktir.",
      "<strong>Örnek 3:</strong> [H<sup>+</sup>] = 2,5 × 10<sup>−4</sup> mol/L için pH = −log(2,5 × 10<sup>−4</sup>) = 4 − log 2,5 = 4 − 0,3979 = 3,6021 olur.",
      "<strong>Örnek 4 – tersine hesap:</strong> pH'si 4,5 olan çözeltide [H<sup>+</sup>] = 10<sup>−4,5</sup>, yani yaklaşık 0,00003162 mol/L'dir.",
    ] },
    { h: "Kuvvetli ve zayıf asitlerde derişimden pH'ye geçiş", p: [
      "HCl ve HNO<sub>3</sub> gibi kuvvetli asitler suda tamamen iyonlaştığı için tek değerlikli bir kuvvetli asidin hidrojen iyonu derişimi asit derişimine eşit alınır: 0,01 M HCl için [H<sup>+</sup>] = 0,01 mol/L ve pH = 2'dir. NaOH gibi kuvvetli bazlarda aynı mantıkla hidroksit derişimi baz derişimine eşittir. Ca(OH)<sub>2</sub> gibi iki hidroksit veren bazlarda derişim ikiyle çarpılır.",
      "Asetik asit ve amonyak gibi zayıf asit ve bazlar ise kısmen iyonlaşır. Bu durumda hidrojen iyonu derişimi asit derişimine eşit değildir; önce asitlik sabiti (K<sub>a</sub>) ile denge hesabı yapılıp [H<sup>+</sup>] bulunur, sonra bu değer araca yazılabilir. Araç denge hesabını yapmaz, yalnızca iyon derişimi ile pH arasındaki dönüşümü gerçekleştirir.",
    ] },
    { h: "Günlük hayattan yaklaşık pH değerleri", ul: [
      "Mide öz suyu: yaklaşık 1–2",
      "Limon suyu: yaklaşık 2",
      "Sirke: yaklaşık 2,5–3",
      "Kahve: yaklaşık 5",
      "Saf su (25 °C): 7",
      "Deniz suyu: yaklaşık 8",
      "Sabunlu su: yaklaşık 9–10",
      "Çamaşır suyu: yaklaşık 12–13",
    ], p: [
      "Bu değerler ürüne ve ölçüm koşuluna göre değişen yaklaşık aralıklardır; karşılaştırma yapmak ve ölçeği sezgisel olarak kavramak için verilmiştir.",
    ] },
    { h: "Varsayımlar ve sınırlar", p: [
      "pH + pOH = 14 eşitliği yalnızca 25 °C için geçerlidir. Sıcaklık yükseldikçe suyun iyonlaşması artar ve nötr nokta 7'nin altına kayar; bu, suyun asidikleştiği anlamına gelmez, çünkü iki iyonun derişimi yine eşittir. Farklı sıcaklıklarda çalışıyorsanız sonuçları yaklaşık kabul edin.",
      "Çok derişik çözeltilerde pH negatif, çok derişik bazlarda 14'ten büyük çıkabilir; araç bu yüzden yaklaşık −2 ile 16 arasını kabul eder. Bu uç bölgelerde ve çok seyreltik çözeltilerde (derişim 10<sup>−7</sup> mol/L dolayında) suyun kendi iyonlaşması ve aktiflik etkileri basit formülü bozar. Havuz, akvaryum, toprak ya da sağlıkla ilgili kararlar için hesap yerine kalibre edilmiş bir pH ölçer kullanılmalıdır.",
    ] },
  ],
  faq: [
    ["pH nasıl hesaplanır?", "Hidrojen iyonu derişiminin (mol/L) onluk logaritması alınır ve işareti değiştirilir: pH = −log[H+]. Derişim 0,0001 mol/L ise pH 4'tür."],
    ["pOH'den pH nasıl bulunur?", "25 °C'de pH + pOH = 14 olduğundan pH = 14 − pOH biçiminde hesaplanır. pOH değeri 3 olan çözeltinin pH'si 11'dir."],
    ["pH'den hidrojen iyonu derişimine nasıl geçilir?", "Ters logaritma alınır: [H+] = 10^(−pH). pH 5 için derişim 0,00001 mol/L, pH 2 için 0,01 mol/L olur."],
    ["pH negatif olabilir mi?", "Evet. Hidrojen iyonu derişimi 1 mol/L'den büyük olan çok derişik kuvvetli asit çözeltilerinde pH sıfırın altına iner. Ancak bu bölgede basit formül yalnızca yaklaşık sonuç verir."],
    ["pH 7 her zaman nötr müdür?", "Yalnızca 25 °C'de. Sıcaklık değiştikçe suyun iyonlaşma sabiti değişir ve nötr pH kayar; örneğin daha sıcak suda nötr nokta 7'nin biraz altındadır."],
    ["Derişimi bilimsel gösterimle nasıl yazarım?", "1,8 × 10^-5 gibi bir değeri 1,8e-5 biçiminde yazın. Araç ondalık virgül ve noktayı da kabul eder."],
    ["Zayıf asidin pH'sini bu araçla bulabilir miyim?", "Doğrudan değil. Zayıf asitte önce asitlik sabitiyle denge derişimi hesaplanmalıdır. Bulduğunuz [H+] değerini araca yazarak pH ve pOH'ye geçebilirsiniz."],
    ["Girdiğim değerler saklanıyor mu?", "Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez ve kaydedilmez."],
  ],
  related: ["molarite-hesapla", "titrasyon-hesapla", "us-logaritma-hesapla", "bilimsel-gosterim-cevir", "seyreltme-hesapla"],
};
