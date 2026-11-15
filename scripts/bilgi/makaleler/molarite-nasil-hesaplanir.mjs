export default {
  slug: "molarite-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Molarite Nasıl Hesaplanır? Derişim, Molalite ve Seyreltme Formülleri",
  pageTitle: "Molarite Nasıl Hesaplanır? Derişim ve Seyreltme Formülleri",
  description: "Molarite = çözünen mol ÷ çözelti hacmi (L). Gramdan mole geçiş, molalite farkı, M1V1 = M2V2 seyreltme, kütlece yüzde, ppm ve 1 M çözelti hazırlama örnekleri.",
  keywords: ["molarite nasıl hesaplanır", "molarite formülü", "molalite nedir", "derişim hesaplama", "seyreltme formülü m1v1", "kütlece yüzde derişim", "ppm nedir", "1 m çözelti nasıl hazırlanır"],
  lead: "Molarite (molar derişim), <strong>çözünen maddenin mol sayısının çözeltinin litre cinsinden hacmine bölünmesiyle</strong> bulunur: M = n ÷ V, birimi mol/L ya da kısaca M'dir. Çözünenin kütlesi verilmişse önce mol sayısına çevrilir: n = kütle ÷ mol kütlesi. 5,85 g NaCl (mol kütlesi 58,5 g/mol) 0,1 mol eder; bu tuz suyla 250 mL'ye tamamlanırsa çözelti 0,1 ÷ 0,25 = 0,4 M olur. Bu yazıda molariteyi, molaliteyi, seyreltme bağıntısını, kütlece yüzde ve ppm hesabını 11. sınıf kimya ve AYT düzeyinde çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Molarite: M = n ÷ V; n çözünenin mol sayısı, V çözeltinin hacmi (litre).",
    "Mol sayısı: n = m ÷ M<sub>A</sub>; m gram cinsinden kütle, M<sub>A</sub> mol kütlesi (g/mol).",
    "Molalite: m = n ÷ çözücü kütlesi (kg); birimi mol/kg, sıcaklıkla değişmez.",
    "Seyreltme: M₁ · V₁ = M₂ · V₂; su eklemek mol sayısını değiştirmez, yalnızca hacmi artırır.",
    "Kütlece yüzde = çözünen kütlesi ÷ çözelti kütlesi × 100; ppm = çözünen (mg) ÷ çözelti (kg).",
    "Yüzdeden molariteye: M = (yüzde × yoğunluk × 10) ÷ mol kütlesi; yoğunluk g/mL cinsinden alınır."
  ],
  figure: {
    alt: "Molarite hesabının üç adımı: 5,85 gram NaCl, 58,5 g/mol mol kütlesine bölünerek 0,1 mol bulunur; 250 mL yani 0,25 L çözelti hacmine bölünerek 0,4 M molarite elde edilir. Altta seyreltme bağıntısı M1V1 eşittir M2V2 örneği.",
    caption: "Gramdan molariteye iki bölme işlemi: önce mol kütlesine, sonra litre cinsinden çözelti hacmine. Seyreltmede mol sayısı korunur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Gramdan molariteye</text>
  <rect x="20" y="56" width="190" height="96" rx="10" class="sf sb"/>
  <text x="115" y="84" class="sm mid t2">Kütle</text>
  <text x="115" y="116" class="xl mid">5,85 g</text>
  <text x="115" y="140" class="sm mid mu">NaCl</text>
  <line x1="210" y1="104" x2="262" y2="104" class="sp sw" fill="none"/>
  <text x="236" y="94" class="sm mid p b">÷ 58,5</text>
  <rect x="265" y="56" width="190" height="96" rx="10" class="ps"/>
  <text x="360" y="84" class="sm mid t2">Mol sayısı</text>
  <text x="360" y="116" class="xl mid">0,1 mol</text>
  <text x="360" y="140" class="sm mid mu">n = m ÷ M<tspan class="sm">A</tspan></text>
  <line x1="455" y1="104" x2="507" y2="104" class="sp sw" fill="none"/>
  <text x="481" y="94" class="sm mid p b">÷ 0,25 L</text>
  <rect x="510" y="56" width="190" height="96" rx="10" class="p"/>
  <text x="605" y="84" class="sm mid sf">Molarite</text>
  <text x="605" y="116" class="xl mid sf">0,4 M</text>
  <text x="605" y="140" class="sm mid sf">M = n ÷ V</text>
  <text x="360" y="194" class="b mid">Seyreltme: mol sayısı sabit</text>
  <rect x="60" y="210" width="220" height="130" rx="10" class="sf sb"/>
  <rect x="120" y="268" width="100" height="62" class="p"/>
  <text x="170" y="236" class="b mid">Stok 2 M</text>
  <text x="170" y="304" class="sm mid sf b">125 mL</text>
  <line x1="290" y1="275" x2="430" y2="275" class="sp sw" fill="none"/>
  <text x="360" y="262" class="sm mid">+ su ≈ 375 mL</text>
  <text x="360" y="296" class="sm mid mu">toplam 500 mL'ye tamamla</text>
  <rect x="440" y="210" width="220" height="130" rx="10" class="sf sb"/>
  <rect x="470" y="234" width="160" height="96" class="ps"/>
  <text x="550" y="270" class="b mid">0,5 M</text>
  <text x="550" y="296" class="sm mid">500 mL</text>
  <rect x="20" y="360" width="680" height="46" rx="8" class="oks"/>
  <text x="360" y="389" class="b mid">M₁V₁ = M₂V₂ → 2 × V₁ = 0,5 × 500 → V₁ = 125 mL</text>
</svg>`
  },
  sections: [
    {
      h: "Derişim ve molarite nedir?",
      p: [
        "Bir çözeltide çözünen maddenin ne kadar \"yoğun\" bulunduğunu gösteren büyüklüğe <strong>derişim</strong> (konsantrasyon) denir. Derişim farklı biçimlerde ifade edilebilir: mol cinsinden (molarite, molalite), kütle cinsinden (kütlece yüzde, ppm) ya da hacim cinsinden (hacimce yüzde).",
        "<strong>Molarite</strong>, 1 litre çözeltide kaç mol çözünen bulunduğunu söyler. 1 M (bir molar) NaCl çözeltisi, her litresinde 1 mol yani 58,5 g NaCl bulunan çözeltidir. Kimyasal tepkimeler mol oranlarıyla gerçekleştiği için laboratuvarda en çok kullanılan derişim birimi molaritedir; titrasyon, tampon hazırlama ve stokiyometri hesapları molarite üzerinden yapılır.",
        "Konu 11. sınıf kimya müfredatında \"Sıvı Çözeltiler ve Çözünürlük\" ünitesinde işlenir ve AYT kimyada düzenli olarak soru çıkar."
      ]
    },
    {
      h: "Molarite formülü ve birimleri",
      formula: "M = n ÷ V\nn = m ÷ M_A\nBirleştirilmiş: M = m ÷ (M_A × V)\nM: molarite (mol/L),  n: mol,  V: çözelti hacmi (L),  m: kütle (g),  M_A: mol kütlesi (g/mol)",
      p: [
        "Formüldeki V, <strong>çözücünün değil çözeltinin</strong> toplam hacmidir. Hacim mililitre verilmişse 1.000'e bölünerek litreye çevrilir: 250 mL = 0,25 L. Mol kütlesi, bileşiği oluşturan atomların atom kütlelerinin toplamıdır: NaCl için 23 + 35,5 = 58,5 g/mol; NaOH için 23 + 16 + 1 = 40 g/mol; glikoz (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) için 6 × 12 + 12 × 1 + 6 × 16 = 180 g/mol."
      ]
    },
    {
      h: "Molarite nasıl hesaplanır? Çözümlü örnekler",
      ol: [
        "<strong>Gram ve hacim verilmiş:</strong> 5,85 g NaCl suda çözülüp çözelti 250 mL'ye tamamlanıyor. n = 5,85 ÷ 58,5 = 0,1 mol; V = 0,25 L; M = 0,1 ÷ 0,25 = <strong>0,4 M</strong>.",
        "<strong>Molariteden kütle:</strong> 500 mL 0,2 M NaOH çözeltisi hazırlamak için kaç gram NaOH gerekir? n = M × V = 0,2 × 0,5 = 0,1 mol; m = 0,1 × 40 = <strong>4 g</strong>.",
        "<strong>Molariteden hacim:</strong> 0,05 mol glikoz içeren 0,25 M bir çözeltinin hacmi V = n ÷ M = 0,05 ÷ 0,25 = 0,2 L = <strong>200 mL</strong>'dir.",
        "<strong>İyon derişimi:</strong> 0,1 M CaCl<sub>2</sub> çözeltisinde her formül birimi bir Ca<sup>2+</sup> ve iki Cl<sup>−</sup> verir. [Ca<sup>2+</sup>] = 0,1 M, [Cl<sup>−</sup>] = 0,2 M, toplam iyon derişimi 0,3 M'dir."
      ],
      after: [
        "Mol sayısından ya da gram ve mol kütlesinden molariteyi mL veya L hacimle hızlıca hesaplamak için [[arac:molarite-hesapla|Molarite Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "1 M çözelti nasıl hazırlanır?",
      ol: [
        "Hazırlanacak hacmi ve derişimi belirleyin: örneğin 1 L 1 M NaCl.",
        "Gereken kütleyi hesaplayın: n = 1 × 1 = 1 mol; m = 1 × 58,5 = 58,5 g.",
        "58,5 g NaCl'yi hassas terazide tartın ve 1 L'lik balon jojeye aktarın.",
        "Önce yaklaşık yarısına kadar saf su ekleyip tuzun tamamen çözünmesini sağlayın.",
        "Ardından çizgisine kadar saf su ekleyerek toplam hacmi tam 1 L'ye tamamlayın ve karıştırın."
      ],
      after: [
        "En sık yapılan hata, 58,5 g tuzu doğrudan 1 L suya eklemektir. Bu durumda çözeltinin hacmi 1 L'den biraz fazla olur ve derişim 1 M'den düşük çıkar. Molarite çözelti hacmine göre tanımlandığı için çözünen önce az suda çözülür, sonra hacim tamamlanır. Laboratuvar çalışmalarında koruyucu gözlük ve eldiven kullanın; asit seyreltirken her zaman asidi suya ekleyin, suyu aside eklemeyin."
      ]
    },
    {
      h: "Molarite ile molalite farkı",
      p: [
        "Molalite (m), çözünenin mol sayısının <strong>çözücünün kilogram cinsinden kütlesine</strong> bölünmesiyle bulunur. Molarite çözeltinin hacmini, molalite ise çözücünün kütlesini kullanır. Sıvıların hacmi sıcaklıkla genleşip büzüldüğü için molarite sıcaklıkla biraz değişir; kütle sıcaklıkla değişmediği için molalite değişmez. Bu nedenle donma noktası alçalması ve kaynama noktası yükselmesi gibi koligatif özellik hesaplarında molalite kullanılır."
      ],
      formula: "Molalite: m = n ÷ çözücü kütlesi (kg)\nÖrnek: 0,1 mol NaCl + 250 g su → m = 0,1 ÷ 0,250 = 0,4 mol/kg",
      table: {
        head: ["Özellik", "Molarite (M)", "Molalite (m)"],
        rows: [
          ["Tanım", "mol çözünen ÷ L çözelti", "mol çözünen ÷ kg çözücü"],
          ["Birim", "mol/L", "mol/kg"],
          ["Sıcaklıkla değişir mi?", "Evet, az da olsa", "Hayır"],
          ["Ölçülen şey", "Çözelti hacmi", "Çözücü kütlesi"],
          ["Kullanım alanı", "Titrasyon, tepkime hesapları", "Koligatif özellikler"]
        ]
      },
      after: [
        "Seyreltik sulu çözeltilerde 1 L çözeltide yaklaşık 1 kg su bulunduğu için molarite ile molalite sayısal olarak birbirine yakındır; derişik çözeltilerde fark büyür. Çözücü kütlesinden molaliteyi hesaplamak için [[arac:molalite-hesapla|Molalite Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "M₁V₁ = M₂V₂ seyreltme formülü ne işe yarar?",
      p: [
        "Derişik bir stok çözeltiye su eklendiğinde çözünenin mol sayısı değişmez; yalnızca hacim artar ve derişim düşer. Mol sayısı n = M × V olduğundan seyreltme öncesi ve sonrası mol sayısını eşitleyerek bilinmeyeni buluruz. Bu bağıntıda iki hacim aynı birimle (ikisi de mL ya da ikisi de L) yazılmalıdır."
      ],
      formula: "M₁ · V₁ = M₂ · V₂\nEklenecek su ≈ V₂ − V₁ (seyreltik sulu çözeltilerde)",
      ol: [
        "Soru: 2 M HCl stok çözeltisinden 500 mL 0,5 M çözelti hazırlanacak. Stoktan kaç mL alınmalı?",
        "2 × V₁ = 0,5 × 500 → V₁ = 250 ÷ 2 = 125 mL.",
        "125 mL stok çözelti ölçülüp yaklaşık 375 mL su içeren kaba eklenir ve hacim 500 mL'ye tamamlanır.",
        "Kontrol: stoktaki mol 2 × 0,125 = 0,25 mol; seyreltik çözeltide 0,5 × 0,5 = 0,25 mol. Mol sayısı korunmuştur."
      ],
      after: [
        "Aynı mantıkla iki farklı derişimdeki aynı çözeltiyi karıştırırsanız son derişim toplam mol ÷ toplam hacimdir: M = (M₁V₁ + M₂V₂) ÷ (V₁ + V₂). Stok hacmini, son derişimi ya da eklenecek su miktarını bulmak için [[arac:seyreltme-hesapla|Seyreltme Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kütlece yüzde derişim, ppm ve normalite",
      ul: [
        "<strong>Kütlece yüzde:</strong> 100 g çözeltide kaç gram çözünen bulunduğunu gösterir. 20 g şeker 80 g suda çözülürse çözelti 100 g olur ve derişim 20 ÷ 100 × 100 = %20'dir. Dikkat: payda çözücü değil çözelti kütlesidir. Hesap için [[arac:kutlece-yuzde-derisim-hesapla|Kütlece Yüzde Derişim Hesaplama]] aracını kullanabilirsiniz.",
        "<strong>ppm (milyonda bir):</strong> Çok seyreltik çözeltiler için kullanılır; 1 ppm, 1 kg çözeltide 1 mg çözünen demektir. Sulu ve seyreltik çözeltilerde 1 kg ≈ 1 L kabul edildiğinden 1 ppm ≈ 1 mg/L'dir. Örnek: 0,5 L suda 0,25 mg florür varsa derişim 0,25 ÷ 0,5 = 0,5 mg/L ≈ 0,5 ppm'dir. İçme suyu ve çevre ölçümlerinde ppm ve ppb sık kullanılır.",
        "<strong>Yüzdeden molariteye:</strong> M = (yüzde × yoğunluk × 10) ÷ mol kütlesi. Kütlece %98'lik, yoğunluğu 1,84 g/mL olan sülfürik asit için M = (98 × 1,84 × 10) ÷ 98 = 18,4 M bulunur. Formüldeki 10 çarpanı, 1 L'nin 1.000 mL olmasından ve yüzdenin 100'e bölünmesinden gelir.",
        "<strong>Normalite:</strong> N = M × tesir değerliği. Asitlerde tesir değerliği verebildiği H<sup>+</sup> sayısıdır; 1 M H<sub>2</sub>SO<sub>4</sub> 2 N'dir. Normalite güncel lise müfredatında ağırlıklı olarak yer almasa da bazı laboratuvar ve analiz yöntemlerinde hâlâ kullanılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>mL'yi litreye çevirmemek:</strong> 250 mL'yi 250 yazmak sonucu 1.000 kat küçültür.",
        "<strong>Çözücü hacmini kullanmak:</strong> Molaritede payda çözeltinin hacmidir; molalitede ise çözücünün kütlesidir.",
        "<strong>Mol kütlesini yanlış hesaplamak:</strong> Formüldeki alt indisleri unutmayın; CaCl<sub>2</sub> için 40 + 2 × 35,5 = 111 g/mol.",
        "<strong>Kütlece yüzdede paydaya çözücüyü yazmak:</strong> Payda çözünen + çözücü kütlesidir.",
        "<strong>Seyreltmede farklı hacim birimleri:</strong> M₁V₁ = M₂V₂ eşitliğinde iki tarafta aynı birim kullanılmalıdır."
      ],
      after: [
        "Çözeltilerin yoğunluğu ve karışım hesapları için [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazımız da yardımcı olabilir."
      ]
    }
  ],
  faq: [
    ["Molarite nedir?", "Molarite, bir litre çözeltide çözünmüş maddenin mol sayısını gösteren derişim birimidir. Birimi mol/L ya da M'dir. Örneğin 1 M NaCl çözeltisinin her litresinde 1 mol yani 58,5 g sodyum klorür bulunur. Kimyasal tepkime hesaplarında en sık kullanılan derişimdir."],
    ["Molarite nasıl hesaplanır?", "Çözünenin mol sayısı çözeltinin litre cinsinden hacmine bölünür. Kütle verilmişse önce mol kütlesine bölünerek mol bulunur. 5,85 g NaCl 0,1 mol eder; çözelti 250 mL yani 0,25 L ise molarite 0,1 bölü 0,25 eşittir 0,4 M olur."],
    ["Molarite ile molalite farkı nedir?", "Molarite mol sayısını çözeltinin litre cinsinden hacmine, molalite ise çözücünün kilogram cinsinden kütlesine böler. Hacim sıcaklıkla değiştiği için molarite biraz değişir, molalite değişmez. Bu yüzden donma ve kaynama noktası hesaplarında molalite kullanılır."],
    ["M1V1=M2V2 formülü ne işe yarar?", "Seyreltme hesaplarında kullanılır. Çözeltiye su eklendiğinde mol sayısı değişmediği için ilk derişim ile hacmin çarpımı son derişim ile hacmin çarpımına eşittir. 2 M stoktan 500 mL 0,5 M çözelti için 125 mL stok alınıp 500 mL'ye tamamlanır."],
    ["Kütlece yüzde derişim nasıl bulunur?", "Çözünenin kütlesi çözeltinin toplam kütlesine bölünüp 100 ile çarpılır. Çözelti kütlesi çözünen ile çözücünün toplamıdır. 20 g şeker ile 80 g sudan oluşan çözeltinin derişimi 20 bölü 100 çarpı 100 eşittir yüzde 20'dir."],
    ["ppm nedir?", "ppm milyonda bir parça anlamına gelir ve bir kilogram çözeltide bulunan çözünenin miligram cinsinden miktarıdır. Seyreltik sulu çözeltilerde 1 litre yaklaşık 1 kilogram kabul edildiğinden 1 ppm yaklaşık 1 mg/L'ye eşittir; su kalitesi ölçümlerinde sık kullanılır."],
    ["Normalite nasıl hesaplanır?", "Normalite, molaritenin tesir değerliğiyle çarpılmasıyla bulunur. Asitlerde tesir değerliği verilebilen hidrojen iyonu sayısı, bazlarda hidroksit iyonu sayısıdır. Örneğin 1 M sülfürik asit iki hidrojen verdiği için 2 N'dir; 1 M HCl ise 1 N'dir."],
    ["1 M çözelti nasıl hazırlanır?", "Bir litre için çözünenin mol kütlesi kadar gram tartılır, balon jojeye aktarılır, az miktar saf suda tamamen çözülür ve ardından çizgisine kadar su eklenerek toplam hacim tam 1 litreye tamamlanır. Çözüneni doğrudan 1 litre suya eklemek derişimi düşürür."],
    ["Yüzde derişim molariteye nasıl çevrilir?", "Molarite, kütlece yüzde ile g/mL cinsinden yoğunluğun ve 10'un çarpımının mol kütlesine bölünmesiyle bulunur. Yüzde 98'lik ve yoğunluğu 1,84 g/mL olan sülfürik asit için sonuç 98 çarpı 1,84 çarpı 10 bölü 98 eşittir 18,4 M olur."]
  ],
  tools: ["molarite-hesapla", "molalite-hesapla", "seyreltme-hesapla", "kutlece-yuzde-derisim-hesapla"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "oran-oranti-nasil-cozulur"],
  sources: [
    ["MEB – Ortaöğretim Kimya Dersi Öğretim Programı", "https://www.meb.gov.tr/"],
    ["IUPAC – Compendium of Chemical Terminology", "https://goldbook.iupac.org/"]
  ]
};
