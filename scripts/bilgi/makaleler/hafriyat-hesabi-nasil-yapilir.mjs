export default {
  slug: "hafriyat-hesabi-nasil-yapilir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Hafriyat Hesabı Nasıl Yapılır? Kazı Hacmi, Kabarma Payı ve Kamyon Sayısı",
  pageTitle: "Hafriyat Hesabı Nasıl Yapılır? Kazı Hacmi ve Kamyon Sayısı",
  description: "Hafriyat hacmi taban alanı × derinlikle, şevli kazıda prizmoid formülüyle bulunur; kabarma payı eklenir ve kamyon hacmine bölünür. Örnek hesaplar ve tablolar.",
  keywords: ["hafriyat hesabı", "kazı hacmi hesaplama", "hafriyat kaç kamyon", "toprak kabarma katsayısı", "1 m3 toprak kaç ton", "temel kazısı hesabı", "şevli kazı hacmi", "bodrum kazısı hafriyat"],
  lead: "Hafriyat hesabı üç adımda yapılır: önce kazının yerinde hacmi bulunur (düz kazıda boy × en × derinlik), sonra kazılan toprağın gevşeyerek hacminin artmasını karşılayan <strong>kabarma payı</strong> eklenir, en son bu taşınacak hacim kamyon kasa hacmine bölünerek sefer sayısı bulunur. Örneğin 12 × 10 m tabanlı, 3 m derinliğinde, 0,5 şevli bir kazı yaklaşık 468 m³ eder; %25 kabarmayla 585 m³ taşınır ve 15 m³'lük kamyonla 39 sefer gerekir. Bu sayfada formülleri, örnek kabarma katsayılarını, toprağın ağırlığını ve bodrum kazısı örneğini bulacaksınız.",
  kisaCevap: [
    "Düz (dik kenarlı) kazı hacmi = taban boyu × taban eni × derinlik.",
    "Şevli kazıda prizmoid formülü kullanılır: V = h ÷ 6 × (A_taban + 4 × A_orta + A_üst).",
    "Kabarmış hacim = yerinde hacim × (1 + kabarma payı); kabarma payı zemine göre örnek olarak %10 ile %50 arasında değişir.",
    "Sefer sayısı = kabarmış hacim ÷ kamyon kasa hacmi, sonuç yukarı yuvarlanır.",
    "1 m³ toprak yerinde yaklaşık 1,6–2,0 ton gelir; kamyonlarda hacim kadar taşıma ağırlığı sınırı da kontrol edilmelidir.",
    "Hafriyat toprağı yalnızca belediyenin izin verdiği döküm sahalarına, gerekli belgelerle taşınabilir."
  ],
  figure: {
    alt: "Şevli kazı kesiti: 12 metre taban, 3 metre derinlik ve 0,5 şev oranıyla üst ağız 15 metre. Sağda yerinde hacim 468 metreküp, yüzde 25 kabarmayla 585 metreküp ve 15 metreküplük kamyonla 39 sefer hesabı.",
    caption: "Şev, kazı kenarının eğimli bırakılmasıdır; 0,5 şev oranı her 1 m derinlikte kenarın 0,5 m dışa açılması demektir. Kazılan toprak gevşediği için taşınan hacim, çukurun hacminden fazladır. Değerler örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Şevli kazı: kesit ve hesap zinciri</text>
  <line x1="20" y1="90" x2="430" y2="90" class="st sw" fill="none"/>
  <polygon points="50,90 400,90 355,250 95,250" class="ps"/>
  <polygon points="50,90 95,250 95,90" class="oks"/>
  <polygon points="400,90 355,250 355,90" class="oks"/>
  <line x1="95" y1="90" x2="95" y2="250" class="sb dash" fill="none"/>
  <line x1="355" y1="90" x2="355" y2="250" class="sb dash" fill="none"/>
  <line x1="95" y1="268" x2="355" y2="268" class="st" fill="none"/>
  <text x="225" y="288" class="sm mid b">taban 12 m</text>
  <line x1="50" y1="72" x2="400" y2="72" class="st" fill="none"/>
  <text x="225" y="64" class="sm mid b">üst ağız 12 + 2 × 0,5 × 3 = 15 m</text>
  <line x1="420" y1="90" x2="420" y2="250" class="st" fill="none"/>
  <text x="426" y="176" class="sm b">3 m</text>
  <text x="72" y="236" class="sm mid ok b">şev</text>
  <text x="72" y="252" class="sm mid ok">1,5 m</text>
  <text x="225" y="176" class="mid b">Yerinde toprak</text>
  <text x="225" y="198" class="sm mid t2">taban eni 10 m (kesitte görünmüyor)</text>
  <rect x="470" y="56" width="230" height="74" rx="10" class="sf sb"/>
  <text x="585" y="82" class="sm mid mu">1 · Yerinde hacim (prizmoid)</text>
  <text x="585" y="114" class="lg b mid">468 m³</text>
  <rect x="470" y="146" width="230" height="74" rx="10" class="ps"/>
  <text x="585" y="172" class="sm mid">2 · Kabarma %25 (örnek)</text>
  <text x="585" y="204" class="lg b mid">468 × 1,25 = 585 m³</text>
  <rect x="470" y="236" width="230" height="74" rx="10" class="p"/>
  <text x="585" y="262" class="sm mid sf">3 · Kamyon 15 m³</text>
  <text x="585" y="294" class="lg b mid sf">585 ÷ 15 = 39 sefer</text>
  <rect x="20" y="326" width="680" height="80" rx="10" class="sf sb"/>
  <text x="36" y="352" class="sm">A taban = 12 × 10 = 120 m² · A orta = 13,5 × 11,5 = 155,25 m² · A üst = 15 × 13 = 195 m²</text>
  <text x="36" y="378" class="sm b">V = 3 ÷ 6 × (120 + 4 × 155,25 + 195) = 0,5 × 936 = 468 m³</text>
  <text x="36" y="398" class="sm t2">Şevsiz (dik) kazı olsaydı: 12 × 10 × 3 = 360 m³</text>
</svg>`
  },
  sections: [
    {
      h: "Hafriyat nedir, neden hesaplanır?",
      p: [
        "Hafriyat, bir yapının temeli, bodrumu, havuzu, altyapı hattı ya da zemin düzenlemesi için toprağın kazılıp yerinden çıkarılması ve taşınmasıdır. Kazıdan çıkan toprağa hafriyat toprağı denir. Bir inşaatın başında yapılan bu iş, hem maliyet hem de süre açısından önemli bir kalemdir: kazı makinesinin çalışma süresi, kamyon sefer sayısı, döküm sahası ücreti ve nakliye mesafesi doğrudan hafriyat hacmine bağlıdır.",
        "Doğru bir hesap üç soruya cevap verir: Çukur kaç metreküp? Kazılan toprak gevşeyince kaç metreküp olur? Bu toprağı taşımak için kaç kamyon seferi gerekir? Aşağıdaki adımlar bu sorulara sırasıyla cevap verir. Derin kazılarda şev açısı, iksa (destek) sistemi ve komşu yapıların güvenliği ise mutlaka yetkili mühendis tarafından belirlenmelidir."
      ]
    },
    {
      h: "Hafriyat hacmi nasıl hesaplanır?",
      p: [
        "Kenarları dik kazılan dikdörtgen bir çukurun hacmi, taban alanı ile derinliğin çarpımıdır. Uygulamada kazı, temel ölçülerinden biraz büyük yapılır; kalıp, su yalıtımı ve çalışma alanı için her yandan genellikle birkaç on santimetre ile bir metre arasında çalışma payı bırakılır. Bu pay hesaba katılmazsa hacim olduğundan küçük çıkar."
      ],
      formula: "Düz kazı: V = boy × en × derinlik\nÇalışma paylı boy = temel boyu + 2 × çalışma payı",
      after: [
        "Düzensiz arazilerde zemin kotu kazı alanı boyunca değişiyorsa alan küçük karelere bölünür, her karenin köşelerindeki kazı derinliklerinin ortalaması alınır ve kare alanıyla çarpılır. Tüm karelerin toplamı kazı hacmini verir. Basit geometrik şekillerin hacmi için [[arac:hacim-hesapla|Hacim Hesaplama aracı]], formüller için [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısı işinizi görür."
      ]
    },
    {
      h: "Şevli kazı hacmi nasıl hesaplanır?",
      p: [
        "Toprağın kaymasını önlemek için kazı kenarları çoğu zaman eğimli bırakılır; buna <strong>şev</strong> denir. Şev oranı, yatay açılmanın düşey derinliğe oranıdır: 0,5 şev, her 1 metre derinlikte kenarın 0,5 metre dışa açıldığını gösterir. Şevli kazının üst ağzı tabandan büyük olduğu için hacim, taban alanı × derinlik ile bulunamaz; kesik piramide benzeyen bu şeklin hacmi <strong>prizmoid formülüyle</strong> hesaplanır."
      ],
      formula: "Üst ağız boyu = taban boyu + 2 × şev oranı × derinlik\nOrta kesit boyu = taban boyu + şev oranı × derinlik\nV = derinlik ÷ 6 × (A_taban + 4 × A_orta + A_üst)",
      ol: [
        "Taban 12 × 10 m, derinlik 3 m, şev oranı 0,5 olsun.",
        "Üst ağız: 12 + 2 × 0,5 × 3 = 15 m ve 10 + 3 = 13 m. Üst alan 15 × 13 = 195 m².",
        "Orta kesit: 12 + 1,5 = 13,5 m ve 10 + 1,5 = 11,5 m. Orta alan 13,5 × 11,5 = 155,25 m².",
        "Taban alanı: 12 × 10 = 120 m².",
        "V = 3 ÷ 6 × (120 + 4 × 155,25 + 195) = 0,5 × 936 = 468 m³."
      ],
      after: [
        "Aynı kazı dik kenarlı yapılsaydı hacim 360 m³ olurdu. Şev, bu örnekte hacmi %30 artırıyor. Derin kazılarda şevin hacme etkisi daha da büyür; bu yüzden şev oranını tahmin yerine zemin raporuna ve mühendis kararına göre girmek gerekir."
      ]
    },
    {
      h: "Kabarma katsayısı nedir?",
      p: [
        "Toprak yerindeyken sıkışmış hâldedir. Kazılıp kamyona yüklendiğinde taneler arasındaki boşluklar artar ve aynı toprak daha büyük bir hacim kaplar. Bu artışa <strong>kabarma</strong>, artış oranına kabarma payı ya da kabarma katsayısı denir. Taşıma ve döküm hesapları yerinde hacimle değil, kabarmış hacimle yapılmalıdır."
      ],
      formula: "Kabarmış hacim = yerinde hacim × (1 + kabarma payı ÷ 100)\nÖrnek: 468 × (1 + 25 ÷ 100) = 585 m³",
      table: {
        head: ["Zemin türü", "Örnek kabarma payı", "Not"],
        rows: [
          ["Kum, çakıl", "%10–15", "Taneli, az kabarır"],
          ["Bitkisel toprak", "%20–25", "Organik madde içerir"],
          ["Kumlu kil, siltli zemin", "%20–30", "Nem durumuna göre değişir"],
          ["Sert kil", "%30–40", "Topaklar arasında boşluk kalır"],
          ["Ayrışmış ya da patlatılmış kaya", "%40–60 ve üzeri", "En fazla kabaran grup"]
        ],
        caption: "Değerler planlama için yaklaşık aralıklardır; gerçek değer zemin etüdüne, neme ve kazı yöntemine göre belirlenir."
      },
      after: [
        "Kazılan toprak geri dolguda kullanılacaksa ters bir etki de vardır: sıkıştırıldığında hacmi yerindeki hâlinin bile altına inebilir. Bu nedenle \"çıkan toprak geri dolguya yeter mi?\" sorusu kabarma ve sıkışma oranları birlikte düşünülerek cevaplanmalıdır."
      ]
    },
    {
      h: "1 m³ toprak kaç ton gelir?",
      p: [
        "Toprağın ağırlığı türüne ve nem oranına göre değişir. Yerindeki sıkışmış toprak için 1 m³ genellikle 1,6 ile 2,0 ton arasında gelir; kaya daha ağırdır. Kabarmış toprağın metreküp ağırlığı ise daha düşüktür, çünkü aynı kütle daha büyük hacme yayılmıştır."
      ],
      table: {
        head: ["Malzeme (yerinde)", "Yaklaşık yoğunluk (ton/m³)"],
        rows: [
          ["Kuru kum", "1,5–1,7"],
          ["Nemli kum, çakıl", "1,8–2,0"],
          ["Bitkisel toprak", "1,3–1,6"],
          ["Kil", "1,8–2,1"],
          ["Kaya", "2,4–2,7"]
        ],
        caption: "Örnek değerlerdir; kesin değer için zemin raporuna bakılmalıdır."
      },
      after: [
        "Ağırlık, kamyon kapasitesi açısından önemlidir. Bir kamyonun kasası hacim olarak dolsa bile yasal taşıma ağırlığını aşmamalıdır. Örneğin 15 m³'lük bir kasa, yoğunluğu 1,5 ton/m³ olan kabarmış ıslak kil ile doldurulursa yaklaşık 22,5 ton yük oluşur; bu değer aracın izin verilen yükünü aşıyorsa kasa tam doldurulmaz. Ton ile kilogram arasında çeviri için [[arac:ton-kg-cevir|Ton Kg Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "Bir kamyon kaç m³ hafriyat taşır? Sefer sayısı",
      p: [
        "Hafriyat kamyonlarının kasa hacmi aracın tipine göre değişir; şehir içi işlerde sık kullanılan damperli kamyonlar için 10–20 m³ arası kasa hacimleri yaygındır. Kesin değeri hizmet aldığınız nakliyeciden öğrenmek gerekir. Sefer sayısı, kabarmış hacmin kasa hacmine bölünmesi ve sonucun yukarı yuvarlanmasıyla bulunur."
      ],
      formula: "Sefer sayısı = kabarmış hacim ÷ kamyon kasa hacmi (yukarı yuvarlanır)\nÖrnek: 585 ÷ 15 = 39 sefer",
      table: {
        head: ["Kabarmış hacim", "10 m³ kamyon", "15 m³ kamyon", "20 m³ kamyon"],
        rows: [
          ["150 m³", "15 sefer", "10 sefer", "8 sefer"],
          ["360 m³", "36 sefer", "24 sefer", "18 sefer"],
          ["585 m³", "59 sefer", "39 sefer", "30 sefer"],
          ["910 m³", "91 sefer", "61 sefer", "46 sefer"]
        ]
      },
      after: [
        "Bu hesapları tek adımda yapmak için [[arac:hafriyat-hesapla|Hafriyat Hesaplama aracı]] taban ölçüleri, derinlik, şev oranı, kabarma payı ve kamyon hacmini alarak yerinde hacmi, taşınacak hacmi ve sefer sayısını verir."
      ]
    },
    {
      h: "Temel ve bodrum kat kazısı ne kadar hafriyat çıkarır?",
      p: [
        "Örnek olarak 14 × 11 m oturumlu bir binanın bodrum katı için kazı yapılacağını düşünelim. Her yandan 1 m çalışma payı bırakıldığında kazı tabanı 16 × 13 m olur. Bodrum kat yüksekliği, döşeme ve temel kalınlığı birlikte kazı derinliğini 3,5 m'ye çıkarsın."
      ],
      ol: [
        "Kenarlar iksa ile tutulup dik kazılırsa hacim 16 × 13 × 3,5 = 728 m³ olur.",
        "Kabarma payı %25 kabul edilirse taşınacak hacim 728 × 1,25 = 910 m³'tür.",
        "15 m³'lük kamyonla 910 ÷ 15 = 60,7, yani 61 sefer gerekir.",
        "Aynı kazı 0,3 şevle yapılsaydı üst ağız 18,1 × 15,1 m olur, yerinde hacim yaklaşık 840 m³'e, taşınacak hacim yaklaşık 1.050 m³'e çıkardı."
      ],
      after: [
        "Bu örnek, çalışma payının ve şevin hacmi ne kadar büyüttüğünü gösterir. Komşu parsellere yakın şehir içi kazılarda geniş şev açmak çoğu zaman mümkün değildir; bu durumda iksa sistemi gerekir ve bunun türüne, derinliğine mühendis karar verir. Ayrıca kazı hacmi hesaplanırken grobeton ve temel altı dolgu gibi katmanların kalınlığının da derinliğe eklendiğinden emin olun."
      ]
    },
    {
      h: "Hafriyat dökümü için izin gerekir mi?",
      p: [
        "Evet. Hafriyat toprağı rastgele bir alana dökülemez. Türkiye'de hafriyat toprağı ile inşaat ve yıkıntı atıklarının toplanması, taşınması ve depolanması ilgili yönetmelikle düzenlenir ve uygulamayı belediyeler yürütür. Genel olarak hafriyat yalnızca belediyenin belirlediği ya da izin verdiği döküm sahalarına, yetkili taşıyıcılarla ve gerekli taşıma belgeleriyle götürülebilir.",
        "Uygulama ayrıntıları, ücretler ve başvuru süreci il ve ilçeden ilçeye farklılık gösterebilir. Kazıya başlamadan önce yapı ruhsatı sürecinde ve bağlı bulunduğunuz belediyenin ilgili biriminden hafriyat izni, döküm sahası ve belge koşullarını öğrenmeniz gerekir. İzinsiz döküm idari yaptırımlara yol açabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kabarmayı unutmak:</strong> Çukurun hacmine göre kamyon ayarlamak, sefer sayısını %10–50 arasında eksik tahmin ettirir.",
        "<strong>Çalışma payını atlamak:</strong> Kazı temel ölçüsünde değil, çalışma paylı ölçüde yapılır.",
        "<strong>Şevli kazıyı düz kazı gibi hesaplamak:</strong> Taban alanı × derinlik, şevli kazıda hacmi olduğundan küçük gösterir.",
        "<strong>Yalnızca hacme bakmak:</strong> Ağır ve ıslak zeminde kamyonun ağırlık sınırı hacimden önce dolabilir.",
        "<strong>Derinliği eksik ölçmek:</strong> Grobeton, yalıtım ve dolgu katmanlarının kalınlığı kazı derinliğine eklenmelidir.",
        "<strong>Güvenliği hesaba katmamak:</strong> Derin kazılarda şev ve iksa kararı mühendisliktir; göçük riski hayati tehlike yaratır."
      ]
    }
  ],
  faq: [
    ["Hafriyat hacmi nasıl hesaplanır?", "Dik kenarlı kazıda hacim taban boyu, taban eni ve derinliğin çarpımıdır. Şevli kazıda prizmoid formülü kullanılır: derinlik bölü altı çarpı taban alanı, dört kat orta kesit alanı ve üst ağız alanının toplamı. Çalışma payı ölçülere eklenmelidir."],
    ["Kabarma katsayısı nedir?", "Kazılan toprağın gevşeyerek yerindeki hâline göre ne kadar fazla hacim kapladığını gösteren orandır. Örnek olarak kumda %10–15, bitkisel toprakta %20–25, kilde %30–40, kayada %40–60 ve üzeri kabul edilir. Taşıma hesabı kabarmış hacimle yapılır."],
    ["1 m³ toprak kaç ton gelir?", "Yerindeki sıkışmış toprak için 1 m³ genellikle 1,6 ile 2,0 ton arasındadır. Kuru kum 1,5–1,7 ton, kil 1,8–2,1 ton, kaya 2,4–2,7 ton civarındadır. Kesin değer zemin türüne ve neme bağlıdır, zemin raporundan öğrenilir."],
    ["Bir kamyon kaç m³ hafriyat taşır?", "Kasa hacmi araç tipine göre değişir; şehir içi damperli kamyonlarda 10–20 m³ arası yaygındır. Ancak ağır ve ıslak zeminde aracın yasal yük sınırı hacimden önce dolabilir. Kesin kapasiteyi hizmet aldığınız nakliyeciden öğrenmelisiniz."],
    ["Temel kazısı için hacim nasıl bulunur?", "Temel ölçülerine her yandan çalışma payı eklenir, derinliğe grobeton ve dolgu kalınlıkları dahil edilir ve bu ölçüler çarpılır. Şev bırakılacaksa prizmoid formülü kullanılır. Sonuca kabarma payı eklenerek taşınacak hacim bulunur."],
    ["Şevli kazı hacmi nasıl hesaplanır?", "Önce şev oranı ve derinlikle üst ağız ve orta kesit ölçüleri bulunur. Ardından V = derinlik ÷ 6 × (taban alanı + 4 × orta alan + üst alan) uygulanır. 12 × 10 m taban, 3 m derinlik ve 0,5 şevle hacim 468 m³ çıkar."],
    ["Hafriyat dökümü için izin gerekir mi?", "Evet. Hafriyat toprağı yalnızca belediyenin belirlediği ya da izin verdiği döküm sahalarına, yetkili taşıyıcılarla ve gerekli belgelerle götürülebilir. Ayrıntılar ve ücretler belediyeye göre değiştiği için kazıdan önce ilgili birime başvurulmalıdır."],
    ["Bodrum kat kazısı ne kadar hafriyat çıkarır?", "Örnek olarak 16 × 13 m taban ve 3,5 m derinlikteki dik kenarlı bir bodrum kazısı 728 m³ eder. %25 kabarmayla 910 m³ taşınır ve 15 m³'lük kamyonla yaklaşık 61 sefer gerekir. Şev bırakılırsa hacim belirgin biçimde artar."],
    ["Hafriyat hesaplama aracı ne kadar doğru sonuç verir?", "Araç girdiğiniz ölçülerle geometrik hacmi doğru hesaplar; sonucun gerçeğe yakınlığı ise kabarma payı, şev oranı ve derinlik gibi girdilerin doğruluğuna bağlıdır. Planlama için uygundur, kesin metraj için proje ve saha ölçümü esas alınmalıdır."]
  ],
  tools: ["hafriyat-hesapla", "hacim-hesapla", "ton-kg-cevir"],
  related: ["alan-ve-hacim-formulleri", "yogunluk-nedir-nasil-hesaplanir", "insaat-demiri-agirligi-tablosu"],
  sources: [
    ["T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", "https://csb.gov.tr/"],
    ["Mevzuat Bilgi Sistemi", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "değerler örnektir; derin kazılarda şev ve iksa kararını yetkili mühendis verir"
};
