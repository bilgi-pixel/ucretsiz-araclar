export default {
  slug: "merkezcil-kuvvet-ve-acisal-hiz",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Merkezcil Kuvvet ve Açısal Hız Nedir? Düzgün Çembersel Hareket Formülleri",
  pageTitle: "Merkezcil Kuvvet ve Açısal Hız: Formüller ve Örnekler",
  description: "Merkezcil kuvvet F = m·v²/r, açısal hız ω = 2π/T ile bulunur. v = ω·r, RPM'den rad/s'ye çevirme, periyot ve frekans, virajda savrulma ve sıkma örnekleri.",
  keywords: ["merkezcil kuvvet formülü", "açısal hız nedir", "düzgün çembersel hareket", "merkezcil ivme", "rpm rad/s çevirme", "periyot ve frekans", "merkezkaç kuvveti", "virajda savrulma", "çizgisel hız"],
  lead: "Merkezcil kuvvet, çembersel yörüngede dönen bir cismi sürekli merkeze doğru çeken net kuvvettir ve <strong>F = m × v² ÷ r</strong> formülüyle hesaplanır. Açısal hız ise birim zamanda taranan açıdır: <strong>ω = 2π ÷ T = 2πf</strong>, birimi rad/s'dir; çizgisel hızla bağı <strong>v = ω × r</strong>'dir. Örneğin 1.000 kg'lık bir araç 50 m yarıçaplı virajı 72 km/sa (20 m/s) hızla dönerken 8.000 N merkezcil kuvvete ihtiyaç duyar. Bu sayfada formülleri, RPM çevrimini, periyot ve frekansı, merkezkaç kuvvetinin ne olduğunu ve günlük örnekleri çözümlü olarak bulacaksınız.",
  kisaCevap: [
    "Merkezcil ivme a = v² ÷ r = ω² × r, merkezcil kuvvet F = m × a'dır; yön her an merkeze doğrudur.",
    "Açısal hız ω = 2π ÷ T = 2π × f'dir; bir tam tur 2π radyandır.",
    "Çizgisel hız v = ω × r: aynı açısal hızda merkezden uzaktaki nokta daha hızlı gider.",
    "RPM'den rad/s'ye: ω = RPM × 2π ÷ 60 ≈ RPM × 0,1047; 3.000 RPM ≈ 314,2 rad/s = 50 Hz.",
    "Hız iki katına çıkarsa gereken merkezcil kuvvet dört katına çıkar.",
    "Merkezkaç kuvveti dönen gözlemcinin hissettiği hayali (eylemsiz) bir kuvvettir; dışarıdan bakan için yalnızca merkezcil kuvvet vardır."
  ],
  figure: {
    alt: "Çembersel yörüngede bir araç: hız vektörü teğet yönde, merkezcil kuvvet merkeze doğru gösteriliyor. Sağda örnek hesap kartı: 1000 kilogram, 20 metre bölü saniye, 50 metre yarıçap, merkezcil ivme 8, kuvvet 8000 newton.",
    caption: "Hız vektörü her an yörüngeye teğettir; merkezcil kuvvet ise hızın yönünü değiştirir, büyüklüğünü değil. Virajda bu kuvveti lastik ile yol arasındaki sürtünme sağlar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="okm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" class="p"/></marker>
    <marker id="oka" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" class="ok"/></marker>
  </defs>
  <text x="210" y="32" class="lg b mid">Düzgün çembersel hareket</text>
  <circle cx="210" cy="215" r="140" class="sf sb"/>
  <circle cx="210" cy="215" r="140" class="sb dash" fill="none"/>
  <circle cx="210" cy="215" r="5" class="t"/>
  <text x="200" y="240" class="sm end mu">merkez</text>
  <line x1="210" y1="215" x2="309" y2="116" class="st dash" fill="none"/>
  <text x="250" y="180" class="sm">r = 50 m</text>
  <circle cx="309" cy="116" r="12" class="p"/>
  <line x1="309" y1="116" x2="389" y2="196" class="sok sw" fill="none" marker-end="url(#oka)"/>
  <text x="392" y="216" class="b ok">v = 20 m/s</text>
  <text x="392" y="236" class="sm ok">teğet yönde</text>
  <line x1="309" y1="116" x2="252" y2="173" class="sp sw" fill="none" marker-end="url(#okm)"/>
  <text x="300" y="80" class="b p">F merkeze doğru</text>
  <path d="M120,110 A140,140 0 0,1 180,80" class="sa sw" fill="none"/>
  <text x="96" y="96" class="sm">ω</text>
  <rect x="450" y="60" width="250" height="300" rx="10" class="sf sb"/>
  <rect x="450" y="60" width="250" height="40" rx="10" class="p"/>
  <text x="575" y="86" class="b mid sf">Virajdaki araç</text>
  <text x="466" y="128" class="sm">m = 1.000 kg · v = 72 km/sa</text>
  <text x="466" y="152" class="sm">a = v² ÷ r = 400 ÷ 50</text>
  <text x="466" y="176" class="b">a = 8 m/s²</text>
  <text x="466" y="204" class="sm">F = m × a = 1.000 × 8</text>
  <text x="466" y="228" class="b p">F = 8.000 N</text>
  <line x1="466" y1="244" x2="684" y2="244" class="sb" fill="none"/>
  <text x="466" y="268" class="sm">Gereken sürtünme: 8 ÷ 9,81 = 0,82</text>
  <text x="466" y="292" class="sm">Örnek kuru yol katsayısı: 0,7</text>
  <text x="466" y="316" class="b dg">Sonuç: araç savrulur</text>
  <text x="466" y="340" class="sm t2">Bu virajda sınır ≈ 67 km/sa</text>
</svg>`
  },
  sections: [
    {
      h: "Düzgün çembersel hareket nedir?",
      p: [
        "Bir cisim çember biçiminde bir yörüngede <strong>sabit süratle</strong> dönüyorsa düzgün çembersel hareket yapıyordur. Sürat sabit olsa da hız sabit değildir, çünkü hız bir vektördür ve yönü her an değişir. Yönü değişen bir hız, ivme demektir; bu ivme her zaman çemberin merkezine doğrudur ve adına <strong>merkezcil ivme</strong> denir.",
        "Newton'un ikinci yasasına göre ivme varsa onu oluşturan bir net kuvvet de vardır. Merkeze doğru yönelmiş bu net kuvvete <strong>merkezcil kuvvet</strong> denir. Merkezcil kuvvet ayrı bir kuvvet türü değildir; ipteki gerilme, lastik ile yol arasındaki sürtünme, gezegenle Güneş arasındaki kütle çekimi ya da bir yükü döndüren manyetik kuvvet bu görevi üstlenebilir. Temel hareket yasaları için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] makalesine bakabilirsiniz.",
        "Bu konu 11. sınıf fizik programında \"çembersel hareket\" ünitesinde işlenir; açısal momentum ve kütle çekimiyle devam eder."
      ]
    },
    {
      h: "Periyot ve frekans nasıl bulunur?",
      p: [
        "Bir tam turun süresine <strong>periyot (T)</strong> denir ve saniye ile ölçülür. Bir saniyedeki tur sayısına <strong>frekans (f)</strong> denir ve birimi hertz'dir (Hz = 1/s). İkisi birbirinin tersidir: f = 1 ÷ T. Saniyede 2 tur atan bir cismin frekansı 2 Hz, periyodu 0,5 saniyedir.",
        "Motorlarda ve fanlarda frekans yerine çoğunlukla <strong>dakikadaki devir (RPM, dev/dk)</strong> kullanılır. RPM'yi 60'a bölerseniz hertz bulursunuz: 3.000 RPM = 50 Hz, 1.200 RPM = 20 Hz."
      ],
      formula: "f = 1 ÷ T\nRPM = f × 60\nT = 60 ÷ RPM   (saniye)"
    },
    {
      h: "Açısal hız ile çizgisel hız arasındaki ilişki nedir?",
      p: [
        "<strong>Açısal hız (ω)</strong>, cismin merkez etrafında birim zamanda taradığı açıdır. Bir tam tur 2π radyan olduğu için ω = 2π ÷ T = 2π × f yazılır ve birimi rad/s'dir. Dönen bir diskin tüm noktaları aynı açısal hıza sahiptir.",
        "<strong>Çizgisel hız (v)</strong> ise noktanın yörüngesi boyunca aldığı yolun hızıdır. Bir turda alınan yol çevre kadar, yani 2πr'dir; bu yüzden v = 2πr ÷ T = ω × r olur. Aynı diskte merkeze yakın nokta yavaş, kenardaki nokta hızlı gider. Atlıkarıncanın dış sırasındaki atların daha hızlı gitmesi bundandır. Radyanın yay uzunluğuyla ilişkisi için [[bilgi:daire-dilimi-ve-yay-uzunlugu|daire dilimi ve yay uzunluğu]] makalesine göz atabilirsiniz."
      ],
      formula: "ω = 2π ÷ T = 2π × f   (rad/s)\nv = ω × r = 2π × r ÷ T   (m/s)",
      ul: [
        "İpe bağlı bir taş r = 0,5 m yarıçapta saniyede 2 tur atıyor: T = 0,5 s, ω = 2π × 2 = 4π ≈ 12,57 rad/s, v = 12,57 × 0,5 ≈ 6,28 m/s.",
        "Dünya kendi ekseni etrafında yaklaşık 23 saat 56 dakikada (86.164 s) bir tur döner: ω ≈ 7,29 × 10<sup>−5</sup> rad/s.",
        "Saatin yelkovanı 60 dakikada bir tur atar: ω = 2π ÷ 3.600 ≈ 0,00175 rad/s."
      ],
      after: [
        "Devir/dakika, frekans, periyot ya da çizgisel hızdan açısal hızı bulmak için [[arac:aci-hizi-hesapla|Açısal Hız Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "RPM rad/s'ye nasıl çevrilir?",
      p: [
        "RPM dakikadaki tur sayısıdır. Her tur 2π radyan, her dakika 60 saniye olduğundan çarpan 2π ÷ 60 ≈ 0,10472'dir. Ters yönde rad/s değerini 60 ÷ 2π ≈ 9,549 ile çarparsınız."
      ],
      table: {
        head: ["Devir (RPM)", "Frekans (Hz)", "Açısal hız (rad/s)", "Bir turun süresi"],
        rows: [
          ["60", "1", "6,28", "1 s"],
          ["600", "10", "62,83", "0,1 s"],
          ["1.200", "20", "125,66", "0,05 s"],
          ["1.500", "25", "157,08", "0,04 s"],
          ["3.000", "50", "314,16", "0,02 s"]
        ],
        caption: "Değerler ω = RPM × 2π ÷ 60 ile hesaplanmıştır. 50 Hz şebekedeki iki kutuplu bir motorun senkron hızı 3.000 RPM'dir."
      },
      after: [
        "Hertz ile RPM arasında çevirmek için [[arac:hz-rpm-cevir|Hz RPM Çevirici]], radyan ile tur arasında çevirmek için [[arac:radyan-devir-cevir|Radyan Devir Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Merkezcil kuvvet nasıl hesaplanır? Çözümlü örnekler",
      p: [
        "Merkezcil ivme hız ve yarıçap cinsinden a = v² ÷ r, açısal hız cinsinden a = ω² × r olarak yazılır. Kuvvet, bu ivmenin kütleyle çarpımıdır. Hız formülde karesiyle yer aldığı için, hız iki katına çıktığında gereken kuvvet dört katına çıkar; yarıçap iki katına çıktığında ise kuvvet yarıya iner."
      ],
      formula: "a = v² ÷ r = ω² × r\nF = m × v² ÷ r = m × ω² × r\nF = m × 4π² × r ÷ T²",
      ol: [
        "<strong>Virajdaki araç:</strong> m = 1.000 kg, v = 72 km/sa = 20 m/s, r = 50 m. a = 400 ÷ 50 = 8 m/s², F = 1.000 × 8 = 8.000 N.",
        "<strong>Hız artınca:</strong> Aynı virajda 90 km/sa (25 m/s) için a = 625 ÷ 50 = 12,5 m/s², F = 12.500 N. Hız %25 arttı, kuvvet %56 arttı.",
        "<strong>İpe bağlı taş:</strong> m = 0,2 kg, r = 0,5 m, ω = 12,57 rad/s. F = 0,2 × 12,57² × 0,5 ≈ 15,8 N. Bu kuvveti ipteki gerilme sağlar; ip koparsa taş teğet doğrultusunda düz gider.",
        "<strong>Periyottan hesap:</strong> Aynı taş için F = 0,2 × 4π² × 0,5 ÷ 0,5² ≈ 15,8 N; iki yol aynı sonucu verir."
      ],
      after: [
        "Kütle, hız ve yarıçaptan kuvveti ya da kuvvetten hızı, yarıçapı veya kütleyi bulmak için [[arac:merkezcil-kuvvet-hesapla|Merkezcil Kuvvet Hesaplama]] aracını kullanabilirsiniz; merkezcil ivme ve periyot da gösterilir."
      ]
    },
    {
      h: "Araç virajda neden savrulur?",
      p: [
        "Düz bir yolda virajı dönen bir aracın merkezcil kuvvetini lastiklerle yol arasındaki sürtünme sağlar. Sürtünmenin alabileceği en büyük değer µ × m × g'dir. Gereken merkezcil kuvvet bu sınırı aşarsa lastikler yolu tutamaz ve araç virajın dışına doğru kayar. Bu durumda araç \"dışarı itilmez\"; yalnızca yönünü değiştirecek kadar kuvvet bulamadığı için düz gitmeye devam eder.",
        "Sınır hız, iki kuvvet eşitlenerek bulunur: m × v² ÷ r = µ × m × g ⇒ v<sub>max</sub> = √(µ × g × r). Kütle sadeleşir; ağır ya da hafif araç için sınır aynıdır. Yukarıdaki örnekte gereken katsayı 8 ÷ 9,81 ≈ 0,82'dir. Kuru asfalt için örnek değer µ = 0,7 alınırsa 50 m'lik virajda sınır hız √(0,7 × 9,81 × 50) ≈ 18,5 m/s, yani yaklaşık 67 km/sa'tir. Islak yolda µ = 0,4 alınırsa sınır yaklaşık 50 km/sa'e iner."
      ],
      ul: [
        "Viraja girmeden önce yavaşlamak en etkili önlemdir; hızın karesi belirleyicidir.",
        "Yağmur, buzlanma ve aşınmış lastik sürtünme katsayısını düşürür ve sınır hızı azaltır.",
        "Otoyol virajlarına verilen <strong>dever</strong> (yana eğim), normal kuvvetin bir bileşenini merkeze yönlendirerek sürtünmeye olan ihtiyacı azaltır.",
        "Sürtünme katsayıları burada örnek değerlerdir; gerçek değer lastik, yol yüzeyi ve sıcaklığa göre değişir. Sürtünme hesabı için [[bilgi:surtunme-kuvveti-nasil-hesaplanir|sürtünme kuvveti]], duruş mesafesi için [[bilgi:fren-mesafesi-nasil-hesaplanir|fren mesafesi]] makalelerine bakın."
      ],
      note: "Bu hesaplar fizik eğitimine yöneliktir; gerçek trafikte yol ve hava koşulları, lastik durumu ve sürücü tepki süresi sonuçları büyük ölçüde değiştirir. Her zaman trafik işaretlerindeki hız sınırlarına ve viraj uyarılarına uyun."
    },
    {
      h: "Merkezkaç kuvveti gerçek bir kuvvet mi?",
      p: [
        "Dönen bir otobüste dışa doğru savrulduğunuzu hissedersiniz. Bu hisse günlük dilde merkezkaç kuvveti denir. Dışarıdan, yani duran bir gözlemcinin bakış açısından durum farklıdır: vücudunuz eylemsizliği nedeniyle düz gitmek ister, otobüs ise döner. Koltuk ya da tutamak sizi merkeze doğru iterek yön değiştirmenizi sağlar. Dışarıdan bakan için yalnızca bu merkezcil kuvvet vardır.",
        "Fizikte merkezkaç kuvveti, dönen (eylemsiz olmayan) bir referans sisteminde hesapları kolaylaştırmak için eklenen <strong>hayali</strong> ya da eylemsiz bir kuvvet olarak tanımlanır. Büyüklüğü merkezcil kuvvete eşit, yönü zıttır. Bu yüzden \"gerçek değil\" demek yerine \"yalnızca dönen gözlemcinin hesabında görünen bir kuvvettir\" demek daha doğrudur. Ders kitaplarında ve sınavlarda kuvvet çizimleri dışarıdaki gözlemciye göre yapılır ve merkezkaç kuvveti çizilmez."
      ]
    },
    {
      h: "Çamaşır makinesi sıkmada nasıl çalışır?",
      p: [
        "Sıkma programında tambur yüksek devirde döner. Çamaşırlar tamburun duvarına dayanır ve duvar onlara merkezcil kuvvet uygular. Tamburun deliklerinin hizasındaki su damlalarına ise bu kuvveti uygulayacak bir yüzey yoktur; damlalar teğet doğrultusunda düz gidip deliklerden dışarı çıkar.",
        "Örnek: 1.200 RPM'de dönen ve yarıçapı 25 cm olan bir tambur için ω = 1.200 × 2π ÷ 60 ≈ 125,7 rad/s, merkezcil ivme a = ω² × r ≈ 125,7² × 0,25 ≈ 3.948 m/s²'dir. Bu, yerçekimi ivmesinin yaklaşık 400 katıdır. Tamburun çevresindeki bir noktanın çizgisel hızı ω × r ≈ 31,4 m/s'dir. Devir sayısını artırmak ivmeyi karesiyle artırdığı için yüksek devirli sıkma çamaşırı daha kuru çıkarır.",
        "Aynı ilke laboratuvar santrifüjlerinde, salata kurutucularda ve süt makinelerinde yoğunlukları farklı maddeleri ayırmak için kullanılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>km/sa ile hesap yapmak:</strong> Formüller m/s ister; km/sa değerini 3,6'ya bölün. 72 km/sa = 20 m/s'dir.",
        "<strong>RPM'yi doğrudan ω yerine koymak:</strong> RPM'yi önce 2π ÷ 60 ile çarparak rad/s'ye çevirin.",
        "<strong>Çap ile yarıçapı karıştırmak:</strong> Tambur ya da teker çapı verilmişse yarıya bölün.",
        "<strong>Merkezcil kuvveti ayrıca çizmek:</strong> Serbest cisim diyagramında merkezcil kuvvet ayrı bir ok değildir; gerilme, sürtünme ya da çekim kuvvetlerinin merkeze yönelik bileşkesidir.",
        "<strong>Hızla doğrusal artış sanmak:</strong> Hız iki katına çıkınca kuvvet iki değil dört katına çıkar."
      ]
    }
  ],
  faq: [
    ["Merkezcil kuvvet nedir?", "Merkezcil kuvvet, çembersel yörüngede dönen bir cismi sürekli merkeze doğru çeken net kuvvettir. Ayrı bir kuvvet türü değildir; ipteki gerilme, sürtünme ya da kütle çekimi gibi kuvvetlerin merkeze yönelik bileşkesidir."],
    ["Merkezcil kuvvet nasıl hesaplanır?", "Merkezcil kuvvet F = m × v² ÷ r ya da F = m × ω² × r formülüyle hesaplanır. 1.000 kg'lık araç 50 m yarıçaplı virajı 20 m/s hızla dönerken 8.000 N merkezcil kuvvet gerekir."],
    ["Açısal hız ile çizgisel hız arasındaki ilişki nedir?", "Çizgisel hız, açısal hız ile yarıçapın çarpımıdır: v = ω × r. Dönen bir diskin tüm noktaları aynı açısal hıza sahiptir, ancak merkezden uzaktaki noktaların çizgisel hızı daha büyüktür."],
    ["RPM rad/s'ye nasıl çevrilir?", "RPM değeri 2π ile çarpılıp 60'a bölünür, yani yaklaşık 0,1047 ile çarpılır. 3.000 RPM yaklaşık 314,2 rad/s, 1.200 RPM yaklaşık 125,7 rad/s eder; ters yönde rad/s değeri 9,549 ile çarpılır."],
    ["Periyot ve frekans nasıl bulunur?", "Periyot bir tam turun süresidir, frekans ise saniyedeki tur sayısıdır ve ikisi birbirinin tersidir: f = 1 ÷ T. Saniyede 2 tur atan cismin frekansı 2 Hz, periyodu 0,5 saniyedir."],
    ["Merkezkaç kuvveti gerçek bir kuvvet mi?", "Merkezkaç kuvveti, dönen bir referans sisteminde hesaba eklenen hayali (eylemsiz) bir kuvvettir. Dışarıdaki duran gözlemci için yalnızca merkeze yönelik merkezcil kuvvet vardır; dışa savrulma hissi eylemsizlikten kaynaklanır."],
    ["Araç virajda neden savrulur?", "Virajda merkezcil kuvveti lastik ile yol arasındaki sürtünme sağlar. Hız arttıkça gereken kuvvet hızın karesiyle büyür; sürtünmenin sınırını aşınca lastikler yolu tutamaz ve araç düz gitmeye devam ederek virajın dışına kayar."],
    ["Çamaşır makinesi sıkmada nasıl çalışır?", "Tambur yüksek devirde döner ve duvarı çamaşırlara merkezcil kuvvet uygular. Deliklerin hizasındaki suya kuvvet uygulayan bir yüzey olmadığı için su teğet doğrultusunda dışarı çıkar; 1.200 RPM'de ivme yerçekiminin yaklaşık 400 katına ulaşır."],
    ["Yarıçap küçülürse merkezcil kuvvet ne olur?", "Hız sabitken yarıçap küçülürse merkezcil kuvvet artar, çünkü F = m × v² ÷ r formülünde yarıçap paydadadır. Dar bir virajı aynı hızla dönmek bu yüzden geniş bir virajdan daha fazla sürtünme gerektirir."]
  ],
  tools: ["merkezcil-kuvvet-hesapla", "aci-hizi-hesapla", "hz-rpm-cevir", "radyan-devir-cevir"],
  related: ["newtonun-hareket-yasalari", "surtunme-kuvveti-nasil-hesaplanir", "basit-sarkac-periyodu-formulu"],
  sources: [
    ["MEB – Ortaöğretim Fizik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"],
    ["BIPM – SI birimleri (radyan, hertz, newton)", "https://www.bipm.org/en/measurement-units"]
  ]
};
