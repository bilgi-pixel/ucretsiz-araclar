export default {
  slug: "donma-noktasi-alcalmasi-koligatif",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Donma Noktası Alçalması Nedir? Kışın Yollara Neden Tuz Dökülür",
  pageTitle: "Donma Noktası Alçalması Nedir? ΔT = i·Kd·m ve Yola Tuz",
  description: "Donma noktası alçalması ΔT = i × Kd × m ile hesaplanır; suda Kd = 1,86 °C·kg/mol. Yollara tuz, tuzlu suyun donması, antifriz ve kaynama noktası yükselmesi.",
  keywords: ["donma noktası alçalması", "kaynama noktası yükselmesi", "koligatif özellikler", "yollara neden tuz dökülür", "molalite nedir", "antifriz nasıl çalışır", "tuzlu su kaç derecede donar", "van't hoff faktörü"],
  lead: "Donma noktası alçalması, bir çözücüye madde çözündüğünde çözeltinin saf çözücüden daha düşük sıcaklıkta donmasıdır ve <strong>ΔT<sub>d</sub> = i × K<sub>d</sub> × m</strong> formülüyle hesaplanır. Su için K<sub>d</sub> = 1,86 °C·kg/mol'dür; 1 kg suda 58,5 g sofra tuzu (1 mol NaCl) çözülürse, tuz iki iyona ayrıştığı için donma noktası yaklaşık 3,72 °C düşer. Kışın yollara tuz dökülmesi, antifrizin motoru koruması ve dondurma yapımında buza tuz katılması bu ilkeye dayanır. Bu sayfada formülü, molaliteyi, çözümlü örnekleri ve sınırları anlatıyoruz.",
  kisaCevap: [
    "Donma noktası alçalması: ΔT<sub>d</sub> = i × K<sub>d</sub> × m; su için K<sub>d</sub> = 1,86 °C·kg/mol.",
    "Kaynama noktası yükselmesi: ΔT<sub>k</sub> = i × K<sub>k</sub> × m; su için K<sub>k</sub> ≈ 0,512 °C·kg/mol.",
    "m molalitedir: çözünen mol sayısı ÷ çözücü kütlesi (kg).",
    "i, van't Hoff faktörüdür: şeker için 1, NaCl için yaklaşık 2, CaCl<sub>2</sub> için yaklaşık 3.",
    "Koligatif özellikler çözünenin türüne değil, çözeltideki tanecik sayısına bağlıdır.",
    "Deniz suyu yaklaşık −1,9 °C'de donar; sofra tuzu çok düşük sıcaklıklarda (yaklaşık −10 °C'nin altında) buzu çözmede etkisini büyük ölçüde yitirir."
  ],
  figure: {
    alt: "Sıcaklık ekseni üzerinde saf su ve tuzlu suyun donma ve kaynama noktaları: saf su 0 °C'de donar, 100 °C'de kaynar; 1 molal NaCl çözeltisi yaklaşık −3,72 °C'de donar, 101,02 °C'de kaynar. Altta formül ve tanecik sayısı karşılaştırması.",
    caption: "Çözünen tanecikler sıvı hâlin aralığını iki yönde genişletir: donma noktası aşağı, kaynama noktası yukarı kayar. Değişimin büyüklüğü tanecik derişimiyle orantılıdır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Saf su ve 1 molal NaCl çözeltisi</text>
  <text x="40" y="76" class="b">Saf su</text>
  <rect x="160" y="58" width="480" height="30" rx="6" class="ps"/>
  <text x="160" y="110" class="sm mid">0 °C</text><text x="640" y="110" class="sm mid">100 °C</text>
  <text x="400" y="78" class="sm mid b">sıvı aralığı</text>
  <text x="40" y="154" class="b">NaCl (1 mol/kg)</text>
  <rect x="142" y="136" width="503" height="30" rx="6" class="oks"/>
  <text x="142" y="188" class="sm mid b dg">−3,72 °C</text><text x="652" y="188" class="sm mid b dg">101,02 °C</text>
  <line x1="160" y1="96" x2="160" y2="170" class="st dash" fill="none"/>
  <line x1="640" y1="96" x2="640" y2="170" class="st dash" fill="none"/>
  <text x="400" y="156" class="sm mid b">sıvı aralığı genişler</text>
  <rect x="30" y="210" width="330" height="96" rx="10" class="sf sb"/><rect x="30" y="210" width="8" height="96" class="p"/>
  <text x="52" y="236" class="b">Donma: ΔT = i × Kd × m</text>
  <text x="52" y="262" class="sm">2 × 1,86 × 1 = 3,72 °C düşüş</text>
  <text x="52" y="288" class="sm t2">NaCl → Na⁺ + Cl⁻ (i ≈ 2)</text>
  <rect x="380" y="210" width="310" height="96" rx="10" class="sf sb"/><rect x="380" y="210" width="8" height="96" class="a"/>
  <text x="402" y="236" class="b">Kaynama: ΔT = i × Kk × m</text>
  <text x="402" y="262" class="sm">2 × 0,512 × 1 ≈ 1,02 °C artış</text>
  <text x="402" y="288" class="sm t2">aynı tanecik, daha küçük sabit</text>
  <text x="30" y="338" class="b">Aynı 1 mol çözünen, farklı tanecik sayısı</text>
  <g class="sm mid">
    <rect x="30" y="350" width="200" height="34" rx="6" class="sf sb"/><text x="130" y="372">şeker: 1 mol tanecik</text>
    <rect x="250" y="350" width="200" height="34" rx="6" class="ps"/><text x="350" y="372">NaCl: ≈ 2 mol iyon</text>
    <rect x="470" y="350" width="220" height="34" rx="6" class="p"/><text x="580" y="372" class="sf">CaCl₂: ≈ 3 mol iyon</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Donma noktası alçalması nedir?",
      p: [
        "Saf su normal basınçta 0 °C'de donar. Suya şeker, tuz ya da başka bir madde çözüldüğünde ise çözelti 0 °C'de donmaz; donması için sıcaklığın biraz daha düşmesi gerekir. Bu farka <strong>donma noktası alçalması</strong> denir. Aynı olay kaynamada ters yönde görülür: çözelti saf sudan biraz daha yüksek sıcaklıkta kaynar.",
        "Bunun nedeni, çözünen taneciklerin çözücü moleküllerinin düzenli bir kristal (buz) oluşturmasını zorlaştırması ve çözücünün buhar basıncını düşürmesidir. Donabilmek için su moleküllerinin daha fazla yavaşlaması, yani sıcaklığın daha da düşmesi gerekir. Kaynayabilmek içinse buhar basıncının dış basınca ulaşması için daha fazla ısı gerekir.",
        "Isı ve sıcaklık arasındaki farkı ve hâl değişimi sırasında sıcaklığın neden sabit kaldığını [[bilgi:isi-ve-sicaklik-farki|ısı ve sıcaklık yazısında]] bulabilirsiniz. Suyun kaynama noktasının yüksekliğe göre nasıl değiştiği ise [[bilgi:su-kac-derecede-kaynar-rakim|su kaç derecede kaynar yazısında]] anlatılır."
      ]
    },
    {
      h: "Koligatif özellikler nelerdir?",
      p: [
        "Çözünenin kimliğine değil, yalnızca çözeltideki <strong>tanecik sayısına</strong> bağlı olan özelliklere koligatif özellikler denir. Bir litre suya 1 mol şeker de koysanız 1 mol üre de koysanız donma noktası hemen hemen aynı miktarda düşer, çünkü ikisi de suda 1 mol tanecik oluşturur. Ancak 1 mol tuz yaklaşık 2 mol iyon verdiği için etkisi neredeyse iki katıdır."
      ],
      ul: [
        "<strong>Buhar basıncı düşmesi:</strong> Çözeltinin buhar basıncı saf çözücüden düşüktür (Raoult yasası).",
        "<strong>Kaynama noktası yükselmesi:</strong> Çözelti saf çözücüden daha yüksek sıcaklıkta kaynar.",
        "<strong>Donma noktası alçalması:</strong> Çözelti saf çözücüden daha düşük sıcaklıkta donar.",
        "<strong>Osmotik basınç:</strong> Yarı geçirgen bir zarla ayrılmış çözeltiler arasında çözücü, derişik tarafa geçer; bunu durdurmak için gereken basınca osmotik basınç denir."
      ]
    },
    {
      h: "Formül: ΔT = i × K × m",
      formula: "ΔT_donma = i × K_d × m\nΔT_kaynama = i × K_k × m\nm (molalite) = çözünen mol ÷ çözücü kütlesi (kg)\nSu: K_d = 1,86 °C·kg/mol · K_k ≈ 0,512 °C·kg/mol",
      p: [
        "Formüldeki <strong>K</strong> değerleri çözücüye özgü sabitlerdir: K<sub>d</sub> kriyoskopi, K<sub>k</sub> ebülyoskopi sabiti olarak adlandırılır. <strong>i</strong> ise van't Hoff faktörüdür ve bir formül biriminin çözeltide kaç tanecik verdiğini gösterir. İyonlaşmayan maddelerde (şeker, üre, etilen glikol) i = 1'dir. Tuzlar için ideal değer iyon sayısıdır, ancak derişik çözeltilerde iyonlar birbirini etkilediği için gerçek i biraz daha küçük çıkar."
      ],
      table: {
        head: ["Çözücü", "Normal donma noktası", "K<sub>d</sub> (°C·kg/mol)", "Normal kaynama noktası", "K<sub>k</sub> (°C·kg/mol)"],
        rows: [
          ["Su", "0 °C", "1,86", "100 °C", "0,512"],
          ["Benzen", "5,5 °C", "5,12", "80,1 °C", "2,53"],
          ["Etanol", "−114,6 °C", "1,99", "78,4 °C", "1,22"],
          ["Kafur", "178,8 °C", "37,7", "–", "–"]
        ],
        caption: "Değerler ders kitaplarında yaygın kullanılan yaklaşık sabitlerdir; kaynaklar arasında küçük farklar olabilir."
      }
    },
    {
      h: "Molalite nedir, molariteden farkı ne?",
      p: [
        "<strong>Molalite (m)</strong>, 1 kilogram çözücüde çözünmüş maddenin mol sayısıdır ve birimi mol/kg'dır. <strong>Molarite (M)</strong> ise 1 litre çözeltideki mol sayısıdır ve birimi mol/L'dir. Aradaki temel fark, molalitenin kütleye, molaritenin hacme dayanmasıdır.",
        "Hacim sıcaklıkla değiştiği için molarite de sıcaklıkla biraz değişir; kütle ise değişmez. Donma ve kaynama gibi sıcaklığın değiştiği hesaplarda bu yüzden molalite kullanılır. Seyreltik sulu çözeltilerde 1 litre çözelti yaklaşık 1 kg su içerdiğinden iki değer birbirine yakındır, ancak derişik çözeltilerde fark büyür. Molalite hesabı için [[arac:molalite-hesapla|Molalite Hesaplama]], molarite için [[bilgi:molarite-nasil-hesaplanir|molarite yazısını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Tuzlu su:</strong> 1 kg suda 58,5 g NaCl (1 mol) çözülüyor. m = 1 mol/kg, i ≈ 2. ΔT<sub>d</sub> = 2 × 1,86 × 1 = 3,72 °C. Çözelti yaklaşık <strong>−3,72 °C</strong>'de donar.",
        "<strong>Aynı çözeltinin kaynaması:</strong> ΔT<sub>k</sub> = 2 × 0,512 × 1 ≈ 1,02 °C. Çözelti yaklaşık <strong>101,02 °C</strong>'de kaynar.",
        "<strong>Antifriz:</strong> 500 g suya 100 g etilen glikol (C<sub>2</sub>H<sub>6</sub>O<sub>2</sub>, 62,07 g/mol) ekleniyor. Mol sayısı 100 ÷ 62,07 ≈ 1,61 mol; m = 1,61 ÷ 0,5 ≈ 3,22 mol/kg. i = 1 olduğundan ΔT<sub>d</sub> = 1,86 × 3,22 ≈ 6,0 °C. Karışım yaklaşık <strong>−6 °C</strong>'de donar.",
        "<strong>Makarna suyu:</strong> 1 litre suya 10 g tuz atılıyor. 10 ÷ 58,44 ≈ 0,171 mol; ΔT<sub>k</sub> = 2 × 0,512 × 0,171 ≈ <strong>0,18 °C</strong>. Kaynama noktası yalnızca beşte bir derece yükselir."
      ],
      after: [
        "Bu örnekleri [[arac:donma-noktasi-alcalmasi-hesapla|Donma Noktası Alçalması Hesaplama]] ve [[arac:kaynama-noktasi-yukselmesi-hesapla|Kaynama Noktası Yükselmesi Hesaplama]] araçlarıyla kontrol edebilirsiniz; her ikisi de molalite, van't Hoff faktörü ve çözücü sabitini girmenize izin verir."
      ]
    },
    {
      h: "Kışın yollara neden tuz dökülür?",
      p: [
        "Yol yüzeyinde ince bir su tabakası her zaman bulunur. Tuz bu suda çözünerek tuzlu su (salamura) oluşturur; tuzlu suyun donma noktası 0 °C'nin altında olduğu için buz erir ve yeni buz oluşumu geciktirilir. Erimeyle oluşan su daha fazla tuz çözer ve süreç buz tabakasının altına doğru ilerler.",
        "Ancak tuzun bir sınırı vardır. Sofra tuzu (NaCl) ile su karışımının ulaşabileceği en düşük donma noktası yaklaşık −21 °C'dir ve bu yalnızca belirli bir derişimde (kütlece yaklaşık %23) elde edilir. Pratikte yol koşullarında tuzun etkisi sıcaklık yaklaşık −10 °C'nin altına indiğinde belirgin biçimde azalır. Bu yüzden çok soğuk bölgelerde kalsiyum klorür (CaCl<sub>2</sub>) gibi daha fazla iyon veren ve çözünürken ısı açığa çıkaran tuzlar ya da kum ve mıcır gibi kaydırmayı önleyen malzemeler kullanılır.",
        "Tuzun bir bedeli de vardır: araç gövdelerinde ve köprülerdeki çelikte korozyonu hızlandırır, yol kenarındaki bitkilere ve toprağa zarar verebilir. Belediyeler bu nedenle tuzu dozajlayarak, gerektiğinde önceden salamura püskürterek kullanır."
      ]
    },
    {
      h: "Tuzlu su kaç derecede donar? Deniz suyu ve dondurma",
      p: [
        "Deniz suyu kilogramda ortalama 35 g çözünmüş tuz içerir ve yaklaşık <strong>−1,9 °C</strong>'de donmaya başlar. İdeal formül bu derişim için −2,3 °C civarında bir değer verir; aradaki fark, gerçek çözeltilerde iyonların birbirini etkilemesi ve deniz tuzunun yalnızca NaCl'den oluşmamasıdır. Deniz suyu donarken oluşan buz büyük ölçüde tuzsuzdur; tuz geride kalan sıvıda yoğunlaşır.",
        "Ev yapımı dondurmada buz ve tuz karışımı kullanılmasının nedeni de aynıdır. Tuz buzun erimesini sağlar; eriyen buz çevreden, yani dondurma kabından ısı çeker ve karışımın sıcaklığı 0 °C'nin çok altına iner. Bu sayede krema karışımı hızla donar."
      ],
      table: {
        head: ["Çözelti (yaklaşık)", "Donma noktası"],
        rows: [
          ["Saf su", "0 °C"],
          ["Deniz suyu (%3,5 tuz)", "≈ −1,9 °C"],
          ["1 molal NaCl (ideal)", "≈ −3,72 °C"],
          ["Kütlece %23 NaCl (ötektik)", "≈ −21 °C"],
          ["%50 etilen glikol – su", "≈ −35 ile −37 °C"]
        ],
        caption: "Derişik çözeltilerde basit formül yaklaşık sonuç verir; antifriz gibi ürünlerde üreticinin karışım tablosu esas alınır."
      }
    },
    {
      h: "Antifriz motoru nasıl korur?",
      p: [
        "Motor soğutma suyuna eklenen antifriz genellikle etilen glikol ya da propilen glikol bazlıdır. Bu maddeler suyun donma noktasını düşürür ve kaynama noktasını yükseltir; yani soğutma sıvısını hem kışın donmaya hem de yazın kaynamaya karşı korur. Su donarken genleştiği için donmuş soğutma sıvısı motor bloğunu ve radyatörü çatlatabilir; antifriz bunu önler.",
        "Karışım oranı önemlidir. Antifriz oranı arttıkça donma noktası bir noktaya kadar düşer, ancak saf antifriz suyla karıştırılmış hâlinden daha iyi koruma sağlamaz ve ısı taşıma kapasitesi düşüktür. Bu nedenle araç üreticisinin önerdiği oran (çoğunlukla yarı yarıya) kullanılmalı ve donma koruması mevsim öncesinde serviste ölçtürülmelidir. Etilen glikol yutulduğunda zehirlidir; tatlı tadı nedeniyle çocuklar ve evcil hayvanlar için ayrıca tehlikelidir, kapalı ve ulaşılamaz yerde saklanmalıdır."
      ]
    },
    {
      h: "Makarna suyuna tuz atmak kaynamayı geciktirir mi?",
      p: [
        "Teorik olarak evet, ama fark edilemeyecek kadar az. Örnekte gördüğümüz gibi 1 litre suya 10 g tuz kaynama noktasını yalnızca yaklaşık 0,18 °C yükseltir. Tencerenin kaynama süresine etkisi saniyelerle ölçülür. Tuz atıldığında suyun aniden köpürmesi ise kaynama noktasının değişmesinden değil, tuz kristallerinin buhar kabarcıkları için çekirdek oluşturmasındandır.",
        "Mutfakta tuzun asıl amacı lezzettir. Yemek pişirmede kaynama noktasını anlamlı ölçüde değiştiren etken tuz değil yüksekliktir; deniz seviyesinden yükseldikçe su daha düşük sıcaklıkta kaynar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Molarite ile molalite karıştırmak:</strong> Formülde çözücü kütlesine (kg) göre molalite kullanılır.",
        "<strong>Van't Hoff faktörünü unutmak:</strong> Tuzlarda i çözünen iyon sayısıdır; NaCl için 2, CaCl<sub>2</sub> için 3, Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> için 5 alınır.",
        "<strong>Çözelti kütlesini çözücü kütlesi sanmak:</strong> Paydada yalnızca çözücü (su) kütlesi yer alır.",
        "<strong>ΔT'yi yeni donma noktası sanmak:</strong> ΔT düşüş miktarıdır; yeni donma noktası saf çözücünün donma noktasından ΔT çıkarılarak bulunur.",
        "<strong>Formülü derişik çözeltilere uygulamak:</strong> Formül seyreltik çözeltilerde doğrudur; derişik çözeltilerde yalnızca yaklaşık değer verir."
      ]
    }
  ],
  faq: [
    ["Donma noktası alçalması nedir?", "Bir çözücüye madde çözündüğünde çözeltinin saf çözücüden daha düşük sıcaklıkta donmasına donma noktası alçalması denir. Düşüş miktarı i çarpı Kd çarpı molalite formülüyle hesaplanır ve çözeltideki tanecik sayısına bağlıdır."],
    ["Kışın yollara neden tuz dökülür?", "Tuz yol yüzeyindeki suda çözünerek donma noktası 0 derecenin altında olan tuzlu su oluşturur, böylece buz erir ve yeniden donması gecikir. Sofra tuzunun etkisi yaklaşık eksi 10 derecenin altında belirgin biçimde azalır."],
    ["Tuzlu su kaç derecede donar?", "Donma noktası tuz derişimine bağlıdır. Deniz suyu yaklaşık eksi 1,9 derecede donar, 1 molal sofra tuzu çözeltisi ideal hesapla yaklaşık eksi 3,7 derecede donar; tuz-su karışımında en düşük değer yaklaşık eksi 21 derecedir."],
    ["Kaynama noktası yükselmesi nasıl hesaplanır?", "Kaynama noktası yükselmesi i çarpı Kk çarpı molalite formülüyle hesaplanır; su için Kk yaklaşık 0,512 °C·kg/mol'dür. 1 molal sofra tuzu çözeltisi saf sudan yaklaşık 1,02 derece daha yüksekte kaynar."],
    ["Koligatif özellikler nelerdir?", "Koligatif özellikler çözünenin türüne değil tanecik sayısına bağlı olan özelliklerdir: buhar basıncı düşmesi, kaynama noktası yükselmesi, donma noktası alçalması ve osmotik basınç bu gruptadır."],
    ["Molalite nedir, molariteden farkı ne?", "Molalite 1 kilogram çözücüdeki çözünen mol sayısıdır, molarite ise 1 litre çözeltideki mol sayısıdır. Molalite kütleye dayandığı için sıcaklıkla değişmez; bu yüzden donma ve kaynama hesaplarında molalite kullanılır."],
    ["Antifriz motoru nasıl korur?", "Antifrizdeki glikol soğutma suyunun donma noktasını düşürür ve kaynama noktasını yükseltir. Böylece su kışın donup genleşerek motor bloğunu çatlatmaz, yazın da kolay kaynamaz; oran araç üreticisinin önerisine göre ayarlanmalıdır."],
    ["Makarna suyuna tuz atmak kaynamayı geciktirir mi?", "Çok az geciktirir. Bir litre suya 10 gram tuz kaynama noktasını yalnızca yaklaşık 0,18 derece yükseltir ve süre farkı fark edilmez. Tuz atınca görülen ani köpürme kabarcık oluşumundan kaynaklanır."],
    ["Van't Hoff faktörü nedir?", "Van't Hoff faktörü bir formül biriminin çözeltide kaç tanecik verdiğini gösterir. Şeker ve üre gibi iyonlaşmayan maddeler için 1, sofra tuzu için yaklaşık 2, kalsiyum klorür için yaklaşık 3 alınır."]
  ],
  tools: ["donma-noktasi-alcalmasi-hesapla", "kaynama-noktasi-yukselmesi-hesapla", "molalite-hesapla"],
  related: ["molarite-nasil-hesaplanir", "su-kac-derecede-kaynar-rakim", "isi-ve-sicaklik-farki", "mol-nedir-nasil-hesaplanir"],
  uyari: "antifriz ve diğer kimyasallar yutulduğunda zehirlidir; çocuklardan ve evcil hayvanlardan uzak saklayın",
  sources: [
    ["IUPAC – Compendium of Chemical Terminology (Gold Book)", "https://goldbook.iupac.org/"],
    ["MEB – Kimya Dersi Öğretim Programı (Çözeltiler)", "https://mufredat.meb.gov.tr/"]
  ]
};
