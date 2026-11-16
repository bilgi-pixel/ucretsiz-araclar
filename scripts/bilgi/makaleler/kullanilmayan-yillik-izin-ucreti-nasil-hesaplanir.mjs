export default {
  slug: "kullanilmayan-yillik-izin-ucreti-nasil-hesaplanir",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Kullanılmayan Yıllık İzin Ücreti Nasıl Hesaplanır? İşten Ayrılırken",
  pageTitle: "Kullanılmayan Yıllık İzin Ücreti Hesaplama: İşten Ayrılırken",
  description: "Kullanılmayan izin ücreti = kalan izin günü × (son brüt ücret ÷ 30). İstifada da ödenir, SGK ve vergiye tabidir, zamanaşımı 5 yıldır. Çözümlü örnek ve sık hatalar.",
  keywords: ["kullanılmayan yıllık izin ücreti", "yıllık izin ücreti hesaplama", "izin parası nasıl hesaplanır", "istifa edince izin ücreti alınır mı", "yıllık izin ücreti vergi kesintisi", "yıllık izin ücreti zamanaşımı", "izin ücreti brüt mü net mi", "iş sözleşmesi sona erince izin ücreti"],
  lead: "Kullanılmayan yıllık izin ücreti, <strong>kalan izin günü sayısının son brüt günlük ücretle çarpılmasıyla</strong> bulunur; günlük ücret aylık brüt ücretin 30'a bölünmesidir. 4857 sayılı İş Kanunu'nun 59. maddesine göre iş sözleşmesi hangi nedenle sona ererse ersin, işçinin hak edip kullanmadığı izinlerin ücreti sözleşmenin bittiği tarihteki ücret üzerinden ödenir. Bu yazıda hak edilen günün nasıl bulunduğunu, çözümlü örneği, vergi ve SGK kesintisini, istifa ve deneme süresi durumlarını ve 5 yıllık zamanaşımını bulacaksınız.",
  kisaCevap: [
    "Formül: izin ücreti (brüt) = kullanılmayan izin günü × (son aylık brüt ücret ÷ 30).",
    "İş sözleşmesi istifa, fesih, emeklilik ya da başka bir nedenle sona erdiğinde ücret ödenir (İş Kanunu md. 59).",
    "İzin hakkı her tam hizmet yılında doğar: 1–5 yıl için 14, 5–15 yıl için 20, 15 yıl ve üstü için 26 gün (md. 53).",
    "Ödeme gelir vergisi, damga vergisi ve SGK primine tabidir; kıdem tazminatı gibi vergi istisnası yoktur.",
    "Çalışma devam ederken izin paraya çevrilemez; yıllık izin hakkından vazgeçilemez.",
    "Yıllık izin ücreti alacağında zamanaşımı, sözleşmenin sona erdiği tarihten itibaren 5 yıldır."
  ],
  figure: {
    alt: "Kullanılmayan yıllık izin ücreti hesap akışı: 4 yıl 3 ay kıdem, 56 gün hak edilen izin, 40 gün kullanılan, 16 gün kalan; 45.000 TL brüt ücrette günlük 1.500 TL ve toplam 24.000 TL brüt izin ücreti.",
    caption: "Örnek işçi 4 tam yıl için 4 × 14 = 56 gün izin hak etmiş, 40 gününü kullanmıştır. Kalan 16 gün, son brüt ücretin günlük karşılığıyla çarpılır. Son 3 aylık kısmi yıl için izin hakkı doğmaz.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Kullanılmayan izin ücreti: 4 adımda hesap</text>
  <g class="mid">
    <rect x="20" y="60" width="160" height="110" rx="10" class="sf sb"/>
    <text x="100" y="88" class="sm mu">1. Kıdem</text>
    <text x="100" y="122" class="xl">4 yıl</text>
    <text x="100" y="150" class="sm t2">+ 3 ay (izin doğmaz)</text>
    <rect x="200" y="60" width="160" height="110" rx="10" class="sf sb"/>
    <text x="280" y="88" class="sm mu">2. Hak edilen</text>
    <text x="280" y="122" class="xl">56 gün</text>
    <text x="280" y="150" class="sm t2">4 × 14 gün</text>
    <rect x="380" y="60" width="160" height="110" rx="10" class="sf sb"/>
    <text x="460" y="88" class="sm mu">3. Kullanılan</text>
    <text x="460" y="122" class="xl">40 gün</text>
    <text x="460" y="150" class="sm t2">izin belgeleriyle</text>
    <rect x="560" y="60" width="140" height="110" rx="10" class="ps"/>
    <text x="630" y="88" class="sm mu">4. Kalan</text>
    <text x="630" y="122" class="xl p">16 gün</text>
    <text x="630" y="150" class="sm t2">ücrete çevrilir</text>
  </g>
  <text x="20" y="206" class="b">Kullanım oranı (56 gün)</text>
  <rect x="20" y="218" width="680" height="30" rx="6" class="sf sb"/>
  <rect x="20" y="218" width="486" height="30" rx="6" class="oks"/>
  <rect x="506" y="218" width="194" height="30" class="p"/>
  <text x="263" y="238" class="sm mid b">40 gün kullanıldı</text>
  <text x="603" y="238" class="sm mid b sf">16 gün kaldı</text>
  <rect x="20" y="274" width="680" height="104" rx="10" class="sf sb"/>
  <rect x="20" y="274" width="8" height="104" class="p"/>
  <text x="44" y="302" class="b">Son brüt ücret 45.000 TL → günlük 45.000 ÷ 30 = 1.500 TL</text>
  <text x="44" y="332" class="lg b p">16 gün × 1.500 TL = 24.000 TL brüt</text>
  <text x="44" y="360" class="sm t2">SGK, işsizlik, gelir ve damga vergisi kesilir; net tutar son bordroda görünür.</text>
</svg>`
  },
  sections: [
    {
      h: "Kullanılmayan yıllık izin ücreti nedir?",
      p: [
        "Yıllık ücretli izin, İş Kanunu kapsamındaki her işçinin dinlenme hakkıdır ve kural olarak çalışırken kullanılır. Ancak iş sözleşmesi sona erdiğinde işçinin hak edip de kullanamadığı izin günleri kalmışsa, bu günler artık izin olarak kullanılamayacağı için paraya çevrilir. Bu ödemeye <strong>kullanılmayan yıllık izin ücreti</strong> ya da kısaca izin ücreti denir.",
        "Dayanak 4857 sayılı İş Kanunu'nun 59. maddesidir. Madde, iş sözleşmesinin <em>herhangi bir nedenle</em> sona ermesi hâlinde, işçinin kullanmadığı izin sürelerine ait ücretin sözleşmenin sona erdiği tarihteki ücret üzerinden işçiye veya hak sahiplerine ödeneceğini söyler. Yani istifa eden, işten çıkarılan, emekli olan ya da vefat eden işçinin mirasçıları da bu alacağı talep edebilir.",
        "İzin ücreti kıdem tazminatından bağımsızdır. Kıdem tazminatına hak kazanmayan, örneğin haklı bir neden olmadan istifa eden işçi de kullanmadığı izinlerin parasını alır. Bu nedenle işten ayrılırken iki alacağı ayrı ayrı kontrol etmek gerekir."
      ]
    },
    {
      h: "Hak edilen izin günü nasıl bulunur?",
      p: [
        "Hesabın ilk adımı, işçinin toplam kaç gün izin hak ettiğini bulmaktır. İş Kanunu'nun 53. maddesine göre yıllık izin hakkı, deneme süresi dahil en az bir yıl çalışmış olmakla doğar ve her tam hizmet yılı için ayrı ayrı hesaplanır. Süreler kıdeme göre kademelidir; iş sözleşmesi ya da toplu iş sözleşmesiyle artırılabilir ama azaltılamaz."
      ],
      table: {
        head: ["Kıdem (hizmet süresi)", "Yıllık izin süresi (kanuni en az)", "Not"],
        rows: [
          ["1 yıldan 5 yıla kadar (5 dahil)", "14 gün", "1. ile 5. hizmet yılları"],
          ["5 yıldan fazla, 15 yıldan az", "20 gün", "6. ile 14. hizmet yılları"],
          ["15 yıl (dahil) ve fazlası", "26 gün", "15. hizmet yılından itibaren"],
          ["18 yaş ve altı ile 50 yaş ve üstü", "En az 20 gün", "Yaş kuralı kıdemden bağımsız"],
          ["Yer altı işlerinde çalışanlar", "Kademeye 4 gün eklenir", "Kanunun özel hükmü"]
        ],
        caption: "Tabloda kanunun öngördüğü en az süreler yer alır. Sözleşmenizde daha uzun izin yazıyorsa o süre esas alınır."
      },
      after: [
        "Toplam hak, her hizmet yılı için ilgili kademedeki günlerin toplanmasıyla bulunur. Örneğin 7 yıl çalışan bir işçi ilk 5 yıl için 5 × 14 = 70 gün, 6. ve 7. yıllar için 2 × 20 = 40 gün olmak üzere toplam 110 gün izin hak etmiştir. Bu toplamdan, belgeyle kullandığı izinler düşülür. Hangi tarihte kaç gün hak ettiğinizi [[arac:yillik-izin|Yıllık İzin Hesaplama]] aracıyla yıl yıl görebilirsiniz.",
        "Son tam yıldan sonra kalan kısmi süre için izin hakkı doğmaz. 4 yıl 11 ay çalışıp ayrılan işçi 4 yıllık izin hak etmiştir; 11 aylık süre için orantılı izin kanunda yoktur. Bazı toplu sözleşmeler bunu farklı düzenleyebilir."
      ]
    },
    {
      h: "Formül: günlük ücret ve izin ücreti",
      p: [
        "Kalan gün sayısı bulunduktan sonra hesap tek çarpmadır. Aylık ücretli işçide günlük brüt ücret, aylık brüt ücretin 30'a bölünmesiyle bulunur. Kanun ödemenin sözleşmenin sona erdiği tarihteki ücretle yapılmasını istediği için, yıllar önce hak edilen izinler de son ücretle değerlenir; bu kural işçiyi enflasyona karşı korur."
      ],
      formula: "Günlük brüt ücret = son aylık brüt ücret ÷ 30\nİzin ücreti (brüt) = kullanılmayan izin günü × günlük brüt ücret\nKullanılmayan gün = toplam hak edilen gün − kullanılan gün",
      after: [
        "Yargıtay uygulamasında izin ücreti genellikle işçinin <strong>çıplak brüt ücreti</strong> üzerinden hesaplanır; yol ve yemek yardımı gibi süreklilik arz eden ödemelerin katılması kıdem tazminatına özgü \"giydirilmiş ücret\" kuralıdır. Saatlik ya da günlük ücretle çalışanlarda ise son günlük ücret doğrudan kullanılır. Sözleşmede farklı bir hüküm varsa ona bakmak gerekir."
      ]
    },
    {
      h: "Adım adım çözümlü örnek",
      p: [
        "Bir işçinin 4 yıl 3 ay çalıştıktan sonra istifa ettiğini, son aylık brüt ücretinin 45.000 TL olduğunu ve şimdiye kadar imzalı izin formlarıyla toplam 40 gün izin kullandığını varsayalım. Rakamlar örnek tutardır; kendi bordronuzdaki değerle aynı adımları uygulayabilirsiniz."
      ],
      ol: [
        "Tam hizmet yılını bulun: 4 yıl. Kalan 3 ay için izin hakkı doğmaz.",
        "Hak edilen izni hesaplayın: 4 yıl × 14 gün = 56 gün.",
        "Kullanılan izni düşün: 56 − 40 = 16 gün kullanılmamış izin.",
        "Günlük brüt ücreti bulun: 45.000 ÷ 30 = 1.500 TL.",
        "Brüt izin ücretini hesaplayın: 16 × 1.500 = 24.000 TL.",
        "Kesintileri uygulayın: bu tutar son ayın ücretiyle birlikte bordroya girer; SGK işçi payı (%14), işsizlik sigortası işçi payı (%1), gelir vergisi ve damga vergisi kesildikten sonra net tutar ortaya çıkar."
      ],
      after: [
        "Net tutar, o ay ulaşılan kümülatif vergi matrahına bağlıdır. Yıl sonuna yakın ayrılan bir çalışanın izin ücreti daha yüksek vergi diliminde kalabilir ve aynı brüt tutardan daha az net elde edebilir. Bu etkiyi görmek için brüt tutarı ve ayı [[arac:brut-net-maas|Brüt Net Maaş Hesaplama]] aracına girebilirsiniz."
      ]
    },
    {
      h: "Vergi ve SGK: izin ücretinden neler kesilir?",
      p: [
        "Kullanılmayan yıllık izin ücreti, Gelir Vergisi Kanunu açısından bir ücret ödemesidir. Bu nedenle gelir vergisine ve damga vergisine tabidir; kıdem tazminatında olduğu gibi bir vergi istisnası yoktur. Gelir vergisi kümülatif matraha göre dilim dilim hesaplanır, damga vergisi ise ücret ödemelerindeki binde 7,59 oranıyla kesilir.",
        "Sosyal güvenlik açısından da izin ücreti prime esas kazanca dahildir. Uygulamada iş sözleşmesinin sona erdiği ayın bildirgesinde, o ayın ücretiyle birlikte bildirilir. Prime esas kazancın aylık üst sınırı aşılırsa aşan kısım için prim kesilmez. Kesintilerin mantığını adım adım görmek isterseniz [[bilgi:maas-bordrosu-nasil-okunur|maaş bordrosu nasıl okunur]] yazısına bakabilirsiniz."
      ],
      table: {
        head: ["Kalem", "İzin ücretine uygulanır mı?", "Açıklama"],
        rows: [
          ["SGK işçi payı (%14)", "Evet", "Prime esas kazanç üst sınırına kadar"],
          ["İşsizlik sigortası işçi payı (%1)", "Evet", "Aynı matrah üzerinden"],
          ["Gelir vergisi", "Evet", "Kümülatif matraha göre %15'ten başlayan dilimler"],
          ["Damga vergisi (binde 7,59)", "Evet", "Asgari ücret istisnası aynı ay içinde dikkate alınır"],
          ["Kıdem tazminatındaki vergi istisnası", "Hayır", "İzin ücreti ücret niteliğindedir"]
        ]
      },
      after: [
        "Asgari ücrete isabet eden kısım için gelir vergisi ve damga vergisi istisnası her ay bir kez uygulanır. İzin ücreti son ayın ücretiyle aynı bordroda ödendiğinde istisna o ayın toplamına uygulanır; ayrıca ikinci kez kullanılmaz. Yıllık vergi dilimlerinin nasıl işlediği [[bilgi:gelir-vergisi-dilimleri-2026|gelir vergisi dilimleri]] yazısında ayrıntılı anlatılır."
      ]
    },
    {
      h: "İstifa, fesih, deneme süresi: kim alır, kim alamaz?",
      ul: [
        "<strong>İstifa eden işçi:</strong> Alır. Kanun \"herhangi bir nedenle\" sona ermeden söz ettiği için istifanın haklı ya da haksız olması izin ücretini etkilemez.",
        "<strong>İşveren tarafından çıkarılan işçi:</strong> Alır. Ahlak ve iyi niyet kurallarına aykırılık nedeniyle tazminatsız çıkarılan işçi de hak ettiği izin ücretini talep edebilir.",
        "<strong>Emekli olarak ayrılan ya da vefat eden işçi:</strong> Ücret işçiye ya da mirasçılarına ödenir.",
        "<strong>Deneme süresinde ayrılan işçi:</strong> İzin hakkı bir yıllık çalışmayla doğduğu için, bir yılı doldurmadan ayrılan işçinin henüz hak edilmiş izni yoktur; dolayısıyla ödenecek izin ücreti de çıkmaz.",
        "<strong>Bir yılı dolduran ama izni hiç kullanmamış işçi:</strong> Hak edilen tüm günlerin ücretini alır; işveren \"izin istemedi\" gerekçesiyle ödemeden kaçınamaz.",
        "<strong>Çalışmaya devam eden işçi:</strong> İzin paraya çevrilemez. İş Kanunu md. 53, yıllık ücretli izin hakkından vazgeçilemeyeceğini söyler; çalışırken izin yerine para ödenmesi, ileride izin kullanılmamış sayılma riskini doğurur."
      ],
      after: [
        "İhbar süresi içinde izin kullandırılması da sık yaşanan bir durumdur. Kanun, yıllık iznin ihbar süresiyle iç içe kullandırılamayacağını belirtir (md. 59/2). İşveren ihbar süresine denk gelen günleri yıllık izinden düşemez."
      ]
    },
    {
      h: "Zamanaşımı ve ispat",
      p: [
        "Kullanılmayan yıllık izin ücreti alacağı için zamanaşımı süresi <strong>5 yıldır</strong> (7036 sayılı İş Mahkemeleri Kanunu md. 15). Süre, işçi çalışırken değil, iş sözleşmesinin sona erdiği tarihte başlar. Bu nedenle 20 yıl çalışan bir işçi, ayrıldığında yıllar önce hak ettiği ama kullanmadığı izinlerin ücretini de talep edebilir.",
        "İznin kullandırıldığını ispat yükü işverendedir. İşveren bunu genellikle işçinin imzasını taşıyan izin defteri ya da izin talep formlarıyla kanıtlar. Bordroda \"izin\" yazması tek başına yeterli kabul edilmeyebilir. Uyuşmazlıkta işe iade ve alacak davalarından önce arabuluculuğa başvurmak zorunludur.",
        "Sizin açınızdan pratik öneri şudur: kullandığınız her iznin imzalı bir kopyasını ya da en azından tarihini not edin. Ayrılırken işverenin hesapladığı gün sayısını kendi kaydınızla karşılaştırın. Sözleşmenin bittiği tarihi ve iş günlerini [[arac:gun-sayisi-ekle-is-gunu|İş Günü Hesaplama]] aracıyla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Eski ücretle hesaplamak:</strong> İzin hangi yıl hak edilmiş olursa olsun, son ücret esas alınır.",
        "<strong>Kısmi yıl için izin eklemek:</strong> Son tam yıldan sonra kalan aylar için kanuni izin hakkı doğmaz.",
        "<strong>İzni takvim günüyle saymak:</strong> İzin günleri iş günü olarak kullanılır; izin süresine denk gelen hafta tatili ve genel tatiller izinden sayılmaz (md. 56).",
        "<strong>Net tutarı brüt sanmak:</strong> Formül brüt tutar verir; elinize geçecek tutar vergi ve primler düşüldükten sonra belli olur.",
        "<strong>Kıdem tazminatıyla karıştırmak:</strong> Kıdem tazminatı alamayan işçi de izin ücretini alabilir; iki alacak ayrı hesaplanır."
      ],
      after: [
        "Kıdem, ihbar ve diğer çıkış alacaklarını birlikte görmek için [[rehber:maas-ve-tazminat-hesaplari-2026|maaş ve tazminat hesapları rehberi]] ile [[rehber:kidem-tazminati-nasil-hesaplanir|kıdem tazminatı rehberi]] iyi bir başlangıçtır. Gelir vergisinin dilimlere göre nasıl hesaplandığını [[arac:gelir-vergisi-hesapla|Gelir Vergisi Hesaplama]], damga vergisini [[arac:damga-vergisi-hesapla|Damga Vergisi Hesaplama]] aracıyla kontrol edebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Kullanılmayan yıllık izin ücreti nasıl hesaplanır?", "Önce hak edilen toplam izin gününden kullanılan günler düşülür. Kalan gün sayısı, son aylık brüt ücretin 30'a bölünmesiyle bulunan günlük brüt ücretle çarpılır. Sonuç brüt izin ücretidir; vergi ve primler bundan kesilir."],
    ["İstifa eden işçi kullanmadığı izinlerin parasını alabilir mi?", "Evet. İş Kanunu'nun 59. maddesi iş sözleşmesinin herhangi bir nedenle sona ermesinde izin ücretinin ödeneceğini söyler. İstifa, kıdem tazminatını etkileyebilir ama kullanılmamış izinlerin ücretini ortadan kaldırmaz."],
    ["Yıllık izin ücreti son brüt maaş üzerinden mi hesaplanır?", "Evet. Kanun, ödemenin iş sözleşmesinin sona erdiği tarihteki ücret üzerinden yapılmasını öngörür. Yıllar önce hak edilmiş izinler de son brüt ücretle değerlenir; yol ve yemek gibi yan haklar genellikle hesaba katılmaz."],
    ["Bir günlük izin ücreti nasıl bulunur?", "Aylık ücretli çalışanlarda bir günlük brüt izin ücreti, son aylık brüt ücretin 30'a bölünmesiyle bulunur. Örneğin 45.000 TL brüt ücrette bir günlük izin ücreti 1.500 TL brüttür."],
    ["Yıllık izin ücretinden hangi vergiler kesilir?", "Gelir vergisi ve damga vergisi kesilir. İzin ücreti ücret niteliğinde olduğu için kıdem tazminatındaki vergi istisnasından yararlanmaz; gelir vergisi o ayki kümülatif matraha göre ilgili dilimden hesaplanır."],
    ["Yıllık izin ücreti SGK primine tabi mi?", "Evet. Kullanılmayan izin ücreti prime esas kazanca dahildir ve genellikle sözleşmenin sona erdiği ayın bildirgesinde ücretle birlikte bildirilir. SGK işçi payı ile işsizlik sigortası işçi payı kesilir, üst sınırı aşan kısım primden muaftır."],
    ["Kullanılmayan izin ücreti zamanaşımı kaç yıl?", "Zamanaşımı süresi 5 yıldır ve iş sözleşmesinin sona erdiği tarihten itibaren başlar. Çalışma süresince süre işlemediği için uzun yıllar önce hak edilmiş izinler de ayrılırken talep edilebilir."],
    ["Çalışırken kullanılmayan izin paraya çevrilebilir mi?", "Hayır. Yıllık ücretli izin hakkından vazgeçilemez ve çalışma devam ederken para ödenerek izin hakkı sona erdirilemez. Bu yönde yapılan ödemeler, ileride izinlerin kullanılmamış sayılmasına yol açabilir."],
    ["Deneme süresinde ayrılan işçi izin ücreti alır mı?", "Genellikle almaz. Yıllık izin hakkı deneme süresi dahil bir yıllık çalışmayla doğar; bir yılı doldurmadan ayrılan işçinin henüz hak edilmiş izni bulunmadığından izin ücreti alacağı da oluşmaz."]
  ],
  tools: ["yillik-izin", "brut-net-maas", "gelir-vergisi-hesapla", "damga-vergisi-hesapla", "gun-sayisi-ekle-is-gunu"],
  related: ["maas-bordrosu-nasil-okunur", "gelir-vergisi-dilimleri-2026", "haftalik-calisma-suresi-kac-saat"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 4857 sayılı İş Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4857.pdf"],
    ["Mevzuat Bilgi Sistemi – 7036 sayılı İş Mahkemeleri Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.7036.pdf"],
    ["Çalışma ve Sosyal Güvenlik Bakanlığı", "https://www.csgb.gov.tr/"]
  ],
  uyari: "hukuki danışmanlık değildir; kendi durumunuz için iş sözleşmenizi inceleyin ve gerekirse bir avukata ya da arabulucuya danışın"
};
