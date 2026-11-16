export default {
  slug: "kolesterol-orani-total-hdl-nedir",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "Kolesterol Oranı Nedir? Total/HDL ve LDL/HDL Oranı Nasıl Hesaplanır",
  pageTitle: "Kolesterol Oranı Nedir? Total/HDL ve LDL/HDL Hesaplama",
  description: "Kolesterol oranı, toplam kolesterolün HDL'ye bölümüdür. Total/HDL, LDL/HDL, non-HDL ve trigliserit/HDL hesabı, mg/dL ile mmol/L çevirisi ve örnek tahlil.",
  keywords: ["kolesterol oranı nedir", "total kolesterol hdl oranı", "ldl hdl oranı", "kolesterol oranı hesaplama", "hdl nedir", "ldl nedir", "non-hdl kolesterol", "kolesterol mmol/l çevirme", "trigliserit hdl oranı"],
  lead: "Kolesterol oranı, kan tahlilindeki <strong>toplam (total) kolesterol değerinin HDL kolesterol değerine bölünmesiyle</strong> bulunan bir sayıdır; toplam kolesterol 200 mg/dL, HDL 50 mg/dL ise oran 4,0'dır. Aynı tahlilden LDL/HDL oranı, non-HDL kolesterol ve trigliserit/HDL oranı da hesaplanabilir. Bu oranlar tek başına tanı koydurmaz; yaş, tansiyon, sigara, diyabet ve aile öyküsüyle birlikte hekim tarafından yorumlanır. Bu sayfada değerlerin ne anlama geldiğini, oranların nasıl hesaplandığını ve birim çevirisini genel bilgi olarak bulacaksınız.",
  kisaCevap: [
    "Total kolesterol/HDL oranı = toplam kolesterol ÷ HDL kolesterol (iki değer aynı birimde olmalı).",
    "LDL/HDL oranı = LDL kolesterol ÷ HDL kolesterol.",
    "Non-HDL kolesterol = toplam kolesterol − HDL kolesterol.",
    "Kolesterolü mg/dL'den mmol/L'ye çevirmek için 38,67'ye, trigliseridi çevirmek için 88,57'ye bölün.",
    "Tahminî LDL (Friedewald) = toplam kolesterol − HDL − trigliserit ÷ 5 (mg/dL); trigliserit 400 mg/dL ve üzerindeyse kullanılmaz.",
    "Oranlar tanı aracı değildir; sonuçlarınızı ve ne yapılması gerektiğini hekiminizle değerlendirin."
  ],
  figure: {
    alt: "Örnek kolesterol tahlilinden oran hesapları: toplam kolesterol 200, HDL 50, trigliserit 150 mg/dL; total/HDL 4,0, non-HDL 150, Friedewald LDL 120, LDL/HDL 2,4, trigliserit/HDL 3,0; mmol/L karşılıkları.",
    caption: "Bir örnek tahlil üzerinde tüm oranlar. Değerler yalnızca hesaplamayı göstermek için seçilmiştir ve bir sağlık durumunu temsil etmez. Yorum için hekiminize başvurun.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Örnek tahlilden kolesterol oranları</text>
  <rect x="20" y="50" width="220" height="150" rx="10" class="sf sb"/>
  <text x="130" y="78" class="b mid">Tahlil (mg/dL)</text>
  <text x="40" y="110">Toplam kolesterol</text><text x="222" y="110" class="b end">200</text>
  <text x="40" y="140">HDL</text><text x="222" y="140" class="b end">50</text>
  <text x="40" y="170">Trigliserit</text><text x="222" y="170" class="b end">150</text>
  <g>
    <rect x="260" y="50" width="210" height="70" rx="10" class="p"/>
    <text x="365" y="76" class="sm mid sf">Total / HDL</text><text x="365" y="106" class="lg b mid sf">200 ÷ 50 = 4,0</text>
    <rect x="490" y="50" width="210" height="70" rx="10" class="ps"/>
    <text x="595" y="76" class="sm mid">Non-HDL</text><text x="595" y="106" class="lg b mid">200 − 50 = 150</text>
    <rect x="260" y="130" width="210" height="70" rx="10" class="ps"/>
    <text x="365" y="156" class="sm mid">Tahminî LDL (Friedewald)</text><text x="365" y="186" class="b mid">200 − 50 − 150÷5 = 120</text>
    <rect x="490" y="130" width="210" height="70" rx="10" class="ps"/>
    <text x="595" y="156" class="sm mid">LDL / HDL</text><text x="595" y="186" class="lg b mid">120 ÷ 50 = 2,4</text>
  </g>
  <rect x="260" y="210" width="440" height="56" rx="10" class="sf sb"/>
  <text x="480" y="234" class="sm mid">Trigliserit / HDL (mg/dL esaslı)</text><text x="480" y="256" class="b mid">150 ÷ 50 = 3,0</text>
  <rect x="20" y="210" width="220" height="56" rx="10" class="oks"/>
  <text x="130" y="234" class="sm mid">Oranlar birimsizdir</text><text x="130" y="256" class="sm mid">aynı birimde bölün</text>
  <rect x="20" y="282" width="680" height="72" rx="10" class="sf sb"/>
  <text x="40" y="308" class="b">mmol/L karşılıkları</text>
  <text x="40" y="334" class="sm">Toplam 200 ÷ 38,67 = 5,17 · HDL 50 ÷ 38,67 = 1,29 · Trigliserit 150 ÷ 88,57 = 1,69 mmol/L</text>
  <rect x="20" y="366" width="680" height="40" rx="8" class="dgs"/>
  <text x="360" y="391" class="b mid">Oranlar tanı koydurmaz; yorum hekiminize aittir.</text>
</svg>`
  },
  sections: [
    {
      h: "Kolesterol, HDL ve LDL nedir?",
      p: [
        "Kolesterol, vücudun hücre zarları, bazı hormonlar ve D vitamini yapımı için kullandığı yağ benzeri bir maddedir. Kanda tek başına dolaşamaz; <strong>lipoprotein</strong> adı verilen taşıyıcı parçacıklarla taşınır. Tahlil raporlarında gördüğünüz HDL ve LDL bu taşıyıcıların türlerini ifade eder.",
        "<strong>LDL kolesterol</strong> (düşük yoğunluklu lipoprotein), kolesterolü karaciğerden dokulara taşır ve halk arasında \"kötü kolesterol\" olarak bilinir. <strong>HDL kolesterol</strong> (yüksek yoğunluklu lipoprotein) ise fazla kolesterolün dokulardan karaciğere geri taşınmasına katkıda bulunur ve \"iyi kolesterol\" olarak anılır. <strong>Toplam kolesterol</strong> bu taşıyıcılardaki kolesterolün toplamıdır. <strong>Trigliserit</strong> ise kandaki ayrı bir yağ türüdür ve rutin lipid panelinde birlikte ölçülür.",
        "Bu adlandırmalar basitleştirmedir. Kalp-damar sağlığı açısından değerlendirme, tek bir değere değil, tüm değerlerin ve kişinin genel risk durumunun birlikte ele alınmasına dayanır. Bu sayfadaki bilgiler genel bilgi amaçlıdır; kendi sonuçlarınızın ne anlama geldiğini hekiminiz söyler."
      ]
    },
    {
      h: "Kolesterol oranı nedir, neden hesaplanır?",
      p: [
        "Kolesterol oranı, en yaygın biçimiyle toplam kolesterolün HDL'ye bölünmesidir ve \"total/HDL oranı\" ya da \"kolesterol oranı\" diye anılır. Oranın mantığı, iki kişinin aynı toplam kolesterol değerine sahip olsa bile bu toplamın ne kadarının HDL'den oluştuğunun farklı olabilmesidir. Toplam 200 mg/dL olan iki kişiden birinin HDL'si 40, diğerinin 70 ise oranları 5,0 ve 2,9 olarak farklılaşır.",
        "Bu nedenle bazı risk değerlendirme yöntemleri ve klinik yaklaşımlar tek tek değerlerin yanında oranlara da bakar. Yine de oran, hekimin kullandığı birçok bilgiden yalnızca biridir. Güncel klinik kılavuzların hangi değeri, hangi hedefle ve kimler için kullandığı zaman içinde değişebilir; bu yüzden oranı kendi başınıza \"iyi\" ya da \"kötü\" diye etiketlemek yerine hekiminize sormanız gerekir."
      ]
    },
    {
      h: "Total kolesterol/HDL oranı nasıl hesaplanır?",
      p: [
        "Hesap basittir, tek dikkat edilmesi gereken iki değerin aynı birimde olmasıdır. Türkiye'deki laboratuvarlar sonuçları genellikle mg/dL olarak verir; bazı raporlarda mmol/L de bulunabilir. Oran birimsiz bir sayı olduğu için, iki değer de aynı birimdeyse sonuç değişmez."
      ],
      formula: "Total/HDL oranı = toplam kolesterol ÷ HDL kolesterol\nLDL/HDL oranı = LDL kolesterol ÷ HDL kolesterol\nNon-HDL kolesterol = toplam kolesterol − HDL kolesterol\nTrigliserit/HDL oranı = trigliserit ÷ HDL (genellikle mg/dL değerleriyle)",
      ol: [
        "Tahlil raporunuzdan toplam kolesterol ve HDL değerlerini bulun: örnekte 200 ve 50 mg/dL.",
        "Toplam kolesterolü HDL'ye bölün: 200 ÷ 50 = 4,0.",
        "Raporunuzda LDL varsa onu da HDL'ye bölün: 120 ÷ 50 = 2,4.",
        "Non-HDL için toplamdan HDL'yi çıkarın: 200 − 50 = 150 mg/dL.",
        "Trigliserit/HDL için 150 ÷ 50 = 3,0 hesaplanır.",
        "Sonuçları, raporunuzdaki laboratuvar referans aralıklarıyla birlikte hekiminize gösterin."
      ],
      after: [
        "Bu hesapları elle yapmak yerine [[arac:kolesterol-orani-hesapla|Kolesterol Oranı Hesaplama aracına]] toplam kolesterol ve HDL değerinizi girebilirsiniz; trigliserit ya da LDL eklerseniz diğer oranları da gösterir. Araç tarayıcınızda çalışır, girdiğiniz değerler hiçbir yere gönderilmez."
      ]
    },
    {
      h: "LDL/HDL oranı ve non-HDL kolesterol ne anlama gelir?",
      p: [
        "<strong>LDL/HDL oranı</strong>, taşıyıcılar arasındaki dengeyi toplam yerine doğrudan LDL üzerinden ifade eder. Raporunuzda LDL doğrudan ölçülmüş olabilir ya da laboratuvar onu bir formülle hesaplamış olabilir; raporda genellikle hangisinin kullanıldığı belirtilir.",
        "<strong>Non-HDL kolesterol</strong>, toplam kolesterolden HDL çıkarıldığında kalan kısımdır ve LDL dahil diğer taşıyıcılardaki kolesterolü kapsar. Avantajı, yalnızca iki değerle hesaplanabilmesi ve aç ya da tok alınmış kanda da kullanılabilmesidir. Bazı değerlendirmelerde LDL'ye ek olarak non-HDL değerine de bakılır.",
        "<strong>Trigliserit/HDL oranı</strong> ise araştırmalarda farklı amaçlarla incelenen bir göstergedir. Bu oranın nasıl yorumlanacağı konusunda tek bir standart yoktur; sonuç sizin için ne ifade ediyorsa bunu hekiminiz değerlendirir."
      ]
    },
    {
      h: "Tahminî LDL nasıl hesaplanır? Friedewald formülü",
      p: [
        "Birçok laboratuvar LDL'yi doğrudan ölçmek yerine toplam kolesterol, HDL ve trigliserit değerlerinden hesaplar. En bilinen yöntem <strong>Friedewald formülüdür</strong>. Formül, trigliseridin yaklaşık beşte birinin çok düşük yoğunluklu lipoproteinlerdeki kolesterolü temsil ettiği varsayımına dayanır."
      ],
      formula: "mg/dL ile: LDL ≈ toplam kolesterol − HDL − trigliserit ÷ 5\nmmol/L ile: LDL ≈ toplam kolesterol − HDL − trigliserit ÷ 2,2\nÖrnek: 200 − 50 − 150 ÷ 5 = 120 mg/dL",
      after: [
        "Formülün sınırları vardır: trigliserit 400 mg/dL ve üzerinde olduğunda güvenilir sonuç vermez ve kullanılmaz. Çok düşük LDL değerlerinde ve bazı özel durumlarda da sapma gösterebilir; bu yüzden laboratuvarlar farklı formüller ya da doğrudan ölçüm tercih edebilir. Raporunuzdaki LDL değeri ile sizin hesapladığınız arasında fark varsa raporun yöntemini esas alın."
      ]
    },
    {
      h: "Tahlil sonucundaki mg/dL ne demek? mmol/L'ye çevirme",
      p: [
        "<strong>mg/dL</strong>, bir desilitre (100 mL) kandaki miligram cinsinden madde miktarıdır ve Türkiye'de yaygın olarak kullanılır. <strong>mmol/L</strong> ise litre başına milimol cinsinden miktardır; birçok Avrupa ülkesinde tercih edilir. Yurt dışında yapılmış bir tahlili ya da yabancı kaynaklı bir bilgiyi okurken birim farkına dikkat etmek gerekir."
      ],
      table: {
        head: ["Ölçüm", "mg/dL → mmol/L", "mmol/L → mg/dL", "Örnek"],
        rows: [
          ["Toplam, HDL, LDL kolesterol", "÷ 38,67", "× 38,67", "200 mg/dL ≈ 5,17 mmol/L"],
          ["Trigliserit", "÷ 88,57", "× 88,57", "150 mg/dL ≈ 1,69 mmol/L"],
          ["HDL örneği", "÷ 38,67", "× 38,67", "50 mg/dL ≈ 1,29 mmol/L"]
        ],
        caption: "Kolesterol ve trigliseridin molekül ağırlıkları farklı olduğu için çevirme katsayıları farklıdır. Kan şekeri birimleri için ayrı katsayı kullanılır."
      },
      after: [
        "Kan şekeri ve HbA1c gibi diğer tahlil değerlerinin birim çevirisi için [[arac:kan-sekeri-birim-cevir|Kan Şekeri Birim Çevirici]] ve [[bilgi:hba1c-nedir-kan-sekeri-birimleri|HbA1c ve kan şekeri birimleri]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Sonuçları kim yorumlamalı?",
      p: [
        "Kolesterol değerlerinin ve oranlarının yorumu hekime aittir. Aynı değer, yaşı, tansiyonu, sigara kullanımı, diyabeti, böbrek hastalığı ya da ailede erken kalp hastalığı öyküsü olan biri ile bunların hiçbiri olmayan biri için farklı anlamlar taşıyabilir. Hekim, toplam riski değerlendirmek için bu bilgilerin hepsini birlikte ele alır ve gerekiyorsa ek tetkik ister.",
        "Kendi hesapladığınız oranı, bir hastalığın var ya da yok olduğu şeklinde yorumlamayın ve ilaç başlamak, bırakmak ya da dozunu değiştirmek gibi kararları kendiniz vermeyin. Tahlil sonucunuzu ve hesapladığınız oranları kontrol randevunuza götürmek, hekiminizle konuşmayı kolaylaştırır."
      ],
      note: "Bu içerik tıbbi tavsiye değildir. Tahlil sonuçlarınızın değerlendirilmesi, tanı ve tedavi kararları için hekiminize başvurun."
    },
    {
      h: "Tahlil öncesi ve sonrası dikkat edilecek noktalar",
      ul: [
        "<strong>Açlık koşulu:</strong> Bazı laboratuvarlar trigliserit ölçümü için açlık ister; tahlilden önce size verilen talimata uyun.",
        "<strong>Aynı laboratuvar:</strong> Değerleri zaman içinde karşılaştıracaksanız mümkünse aynı laboratuvarı ve aynı koşulları kullanın; yöntem farkı küçük sapmalar yaratabilir.",
        "<strong>Tek ölçüm:</strong> Tek bir tahlil anlık bir görüntüdür; hekim gerekirse ölçümü tekrarlatabilir.",
        "<strong>Birim kontrolü:</strong> Oranı hesaplarken iki değerin aynı birimde olduğundan emin olun.",
        "<strong>Referans aralığı:</strong> Raporunuzdaki referans aralıkları laboratuvara göre değişebilir; yorumu hekime bırakın."
      ],
      after: [
        "Kalp-damar sağlığıyla ilgili diğer genel göstergeler için [[bilgi:tansiyon-degerleri-kac-olmali|tansiyon değerleri]] ve [[bilgi:bel-kalca-orani-nasil-hesaplanir|bel-kalça oranı]] yazılarına göz atabilirsiniz. Bu göstergelerin hepsi genel bilgilendirme amaçlıdır ve hekim değerlendirmesinin yerini tutmaz."
      ]
    },
    {
      h: "Oranları zaman içinde takip etmek",
      p: [
        "Tek bir tahlil anlık bir görüntü sunar; değerlerin zaman içinde nasıl değiştiği çoğu zaman daha fazla bilgi verir. Tahlil sonuçlarınızı tarih sırasıyla bir tabloya yazmak ve her satıra toplam kolesterol, HDL, LDL, trigliserit ile hesapladığınız oranları eklemek, kontrol randevusunda hekiminizle konuşmayı kolaylaştırır.",
        "Tabloya tahlilin açlıkla mı tok mu alındığını, hangi laboratuvarda yapıldığını ve o dönemde kullandığınız ilaçları da not edin. Bu bilgiler olmadan iki ölçüm arasındaki farkın gerçek bir değişim mi yoksa koşul farkı mı olduğunu anlamak zorlaşır. Tahlil sıklığına ve hangi değerlerin izleneceğine ise hekiminiz karar verir; kendi tablonuz yalnızca bu görüşmeye hazırlık için bir araçtır ve hiçbir zaman hekim değerlendirmesinin yerine geçmez. Tabloyu kâğıtta ya da telefonunuzda kolayca tutabilirsiniz; önemli olan düzenli güncellemektir."
      ]
    },
    {
      h: "Sık yapılan hesap hataları",
      ul: [
        "<strong>Farklı birimleri bölmek:</strong> Toplamı mg/dL, HDL'yi mmol/L olarak bölmek yaklaşık 39 kat hatalı bir oran verir.",
        "<strong>HDL ile LDL'yi karıştırmak:</strong> Raporda yan yana duran değerlerin yerini kontrol edin; HDL her zaman toplam kolesterolden küçüktür.",
        "<strong>Yüksek trigliseritte Friedewald kullanmak:</strong> 400 mg/dL ve üzerinde formül güvenilir değildir.",
        "<strong>Trigliserit katsayısını kolesterol için kullanmak:</strong> Kolesterol 38,67, trigliserit 88,57 ile çevrilir.",
        "<strong>Oranı tanı gibi okumak:</strong> Oran, hekimin değerlendirmesinde kullanılan bilgilerden yalnızca biridir."
      ]
    }
  ],
  faq: [
    ["Kolesterol oranı nedir?", "Kolesterol oranı, kan tahlilindeki toplam kolesterol değerinin HDL kolesterol değerine bölünmesiyle elde edilen birimsiz bir sayıdır. Toplam kolesterolün ne kadarının HDL'den oluştuğunu gösterir ve hekimin risk değerlendirmesinde kullandığı bilgilerden biridir."],
    ["Total kolesterol/HDL oranı nasıl hesaplanır?", "Toplam kolesterol HDL değerine bölünür; iki değer aynı birimde olmalıdır. Toplam kolesterol 200 mg/dL, HDL 50 mg/dL ise oran 200 ÷ 50 = 4,0'dır. Oranın sizin için ne anlama geldiğini hekiminiz değerlendirir."],
    ["LDL/HDL oranı ne anlama gelir?", "LDL/HDL oranı, LDL kolesterolün HDL kolesterole bölünmesiyle bulunur ve iki taşıyıcı arasındaki dengeyi ifade eder. Örnekte 120 ÷ 50 = 2,4'tür. Tek başına tanı koydurmaz; yaş, tansiyon, sigara ve diğer risklerle birlikte hekim tarafından yorumlanır."],
    ["HDL ve LDL arasındaki fark nedir?", "LDL, kolesterolü karaciğerden dokulara taşıyan lipoproteindir ve halk arasında kötü kolesterol diye bilinir. HDL ise fazla kolesterolün karaciğere geri taşınmasına katkıda bulunur ve iyi kolesterol olarak anılır. Bu adlandırmalar basitleştirmedir."],
    ["Tahlil sonucundaki mg/dL ne demek?", "mg/dL, bir desilitre yani 100 mililitre kanda kaç miligram madde bulunduğunu gösteren birimdir ve Türkiye'de lipid sonuçlarında yaygın kullanılır. Bazı ülkelerde aynı değerler litre başına milimol olarak, yani mmol/L ile raporlanır."],
    ["Non-HDL kolesterol nasıl bulunur?", "Toplam kolesterolden HDL kolesterol çıkarılır. Toplam 200, HDL 50 mg/dL ise non-HDL kolesterol 150 mg/dL'dir. Yalnızca iki değerle hesaplanabildiği ve tok alınmış kanda da kullanılabildiği için bazı değerlendirmelerde LDL'ye ek olarak bakılır."],
    ["Kolesterol değerleri mmol/L'ye nasıl çevrilir?", "Toplam, HDL ve LDL kolesterol mg/dL'den mmol/L'ye çevrilirken 38,67'ye bölünür; trigliserit için katsayı 88,57'dir. Ters yönde aynı sayılarla çarpılır. Örneğin 200 mg/dL kolesterol yaklaşık 5,17 mmol/L eder."],
    ["Sonuçları kim yorumlamalı?", "Kolesterol değerlerini ve oranlarını hekiminiz yorumlamalıdır. Aynı değer yaş, tansiyon, sigara, diyabet ve aile öyküsüne göre farklı anlam taşıyabilir. Tanı, tedavi ya da ilaçla ilgili kararları kendi hesabınıza göre vermeyin."],
    ["Friedewald formülü her zaman kullanılabilir mi?", "Hayır. Formül, trigliserit 400 mg/dL ve üzerinde olduğunda güvenilir sonuç vermez ve kullanılmaz; çok düşük LDL değerlerinde de sapabilir. Bu nedenle laboratuvarlar farklı formüller ya da doğrudan ölçüm tercih edebilir; raporunuzdaki yöntemi esas alın."]
  ],
  tools: ["kolesterol-orani-hesapla", "kan-sekeri-birim-cevir", "bel-kalca-orani-hesapla"],
  related: ["hba1c-nedir-kan-sekeri-birimleri", "tansiyon-degerleri-kac-olmali", "bel-kalca-orani-nasil-hesaplanir", "vki-nedir-nasil-hesaplanir"],
  sources: [
    ["T.C. Sağlık Bakanlığı", "https://www.saglik.gov.tr/"],
    ["Dünya Sağlık Örgütü – Kalp-damar hastalıkları", "https://www.who.int/"]
  ],
  uyari: "tıbbi tavsiye değildir; tahlil sonuçlarınızın yorumu, tanı ve tedavi için hekiminize danışın"
};
