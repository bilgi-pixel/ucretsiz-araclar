export default {
  slug: "kelime-yogunlugu-nedir-seo",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Anahtar Kelime Yoğunluğu Nedir? Metinde Kelime Sıklığı Nasıl Ölçülür",
  pageTitle: "Anahtar Kelime Yoğunluğu Nedir? SEO İçin Kelime Sıklığı",
  description: "Anahtar kelime yoğunluğu = kelimenin geçiş sayısı ÷ toplam kelime × 100. SEO için ideal oran var mı, anahtar kelime doldurma, Türkçe ekler ve kelime frekansı analizi.",
  keywords: ["anahtar kelime yoğunluğu", "kelime yoğunluğu nedir", "kelime sıklığı analizi", "seo kelime yoğunluğu", "keyword density", "anahtar kelime doldurma", "kelime bulutu oluşturma", "metinde en çok geçen kelimeler"],
  lead: "Anahtar kelime yoğunluğu, bir kelimenin ya da kelime grubunun metinde kaç kez geçtiğinin toplam kelime sayısına oranıdır ve <strong>geçiş sayısı ÷ toplam kelime × 100</strong> ile hesaplanır. 800 kelimelik bir metinde \"fatura\" kelimesi 12 kez geçiyorsa yoğunluk %1,5'tir. Arama motorları için tutulması gereken bir \"ideal yoğunluk\" yoktur; arama motorları sıralamada belirli bir oranı hedeflemenizi önermez ve aynı kelimeyi doğal olmayan biçimde tekrarlamayı spam olarak değerlendirir. Yoğunluk ölçümü yine de metindeki tekrarları ve konu dağılımını görmek için yararlı bir kontrol aracıdır. Bu sayfada hesap yöntemlerini, Türkçeye özgü durumları ve analiz araçlarını bulacaksınız.",
  kisaCevap: [
    "Kelime yoğunluğu (%) = kelimenin geçiş sayısı ÷ metindeki toplam kelime × 100.",
    "800 kelimelik metinde 12 kez geçen kelimenin yoğunluğu 12 ÷ 800 × 100 = %1,5'tir.",
    "SEO için kanıtlanmış bir ideal yoğunluk yoktur; metin önce okuyucu için yazılmalıdır.",
    "Anahtar kelimeyi doğal olmayan biçimde tekrarlamak (anahtar kelime doldurma) arama motorlarının spam politikalarına aykırıdır.",
    "Türkçede ekler nedeniyle aynı kelime farklı biçimlerde geçer; analizde kök ve çekimli biçimleri birlikte düşünün.",
    "Kelime frekansı analizi, metinde en çok geçen kelimeleri ve gereksiz tekrarları bulmanın en hızlı yoludur."
  ],
  figure: {
    alt: "800 kelimelik örnek metinde en sık geçen kelimelerin çubuk grafiği: fatura 12 kez yüzde 1,5, e-fatura 8 kez yüzde 1, kesmek 6 kez, vergi 5 kez, müşteri 4 kez; yanında yoğunluk formülü ve doğal, yüksek, doldurma bölgeleri.",
    caption: "Örnek: 800 kelimelik bir rehber metnin kelime frekansı. Bağlaçlar (ve, bir, bu) filtrelenmiştir. Ana konu kelimesinin birkaç biçimde ve doğal aralıklarla geçmesi, tek bir biçimin art arda tekrarından daha sağlıklıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">800 kelimelik metinde kelime frekansı</text>
  <g class="sm">
    <text x="130" y="72" class="end">fatura</text><rect x="140" y="56" width="288" height="24" rx="4" class="p"/><text x="436" y="73" class="b">12 · %1,5</text>
    <text x="130" y="112" class="end">e-fatura</text><rect x="140" y="96" width="192" height="24" rx="4" class="ps"/><text x="340" y="113" class="b">8 · %1,0</text>
    <text x="130" y="152" class="end">kesmek</text><rect x="140" y="136" width="144" height="24" rx="4" class="ps"/><text x="292" y="153" class="b">6 · %0,75</text>
    <text x="130" y="192" class="end">vergi</text><rect x="140" y="176" width="120" height="24" rx="4" class="ps"/><text x="268" y="193" class="b">5 · %0,63</text>
    <text x="130" y="232" class="end">müşteri</text><rect x="140" y="216" width="96" height="24" rx="4" class="ps"/><text x="244" y="233" class="b">4 · %0,5</text>
  </g>
  <rect x="520" y="52" width="180" height="96" rx="10" class="sf sb"/>
  <text x="610" y="80" class="sm mid">Yoğunluk</text>
  <text x="610" y="110" class="b mid">12 ÷ 800 × 100</text>
  <text x="610" y="134" class="lg b mid p">%1,5</text>
  <rect x="520" y="160" width="180" height="80" rx="10" class="ps"/>
  <text x="610" y="186" class="sm mid">Kelime bazlı (2 kelime)</text>
  <text x="610" y="214" class="b mid">8 × 2 ÷ 800 = %2</text>
  <text x="20" y="282" class="b">Yorum için kaba bir kılavuz (kural değil)</text>
  <rect x="20" y="296" width="226" height="64" rx="8" class="oks"/>
  <text x="133" y="322" class="b mid">Doğal kullanım</text>
  <text x="133" y="344" class="sm mid">konuya göre değişir</text>
  <rect x="247" y="296" width="226" height="64" rx="8" class="ps"/>
  <text x="360" y="322" class="b mid">Gözden geçirin</text>
  <text x="360" y="344" class="sm mid">okurken tekrar hissi</text>
  <rect x="474" y="296" width="226" height="64" rx="8" class="dgs"/>
  <text x="587" y="322" class="b mid">Doldurma</text>
  <text x="587" y="344" class="sm mid">doğal olmayan tekrar</text>
  <text x="360" y="396" class="sm mid t2">Belirleyici olan oran değil, metnin okuyucuya doğal gelmesidir.</text>
</svg>`
  },
  sections: [
    {
      h: "Anahtar kelime yoğunluğu nedir?",
      p: [
        "Anahtar kelime yoğunluğu (İngilizce adıyla keyword density), bir metinde belirli bir kelimenin ya da kelime grubunun ne sıklıkta geçtiğini gösteren yüzdedir. Arama motoru optimizasyonunun (SEO) ilk yıllarında arama motorları sayfanın konusunu büyük ölçüde kelime tekrarlarından çıkardığı için yoğunluk önemli bir ölçü olarak görülüyordu. Bu dönemde bazı siteler aynı kelimeyi onlarca kez tekrarlayarak üst sıralara çıkmaya çalıştı.",
        "Günümüzde arama motorları bir sayfanın konusunu eş anlamlı kelimeler, ilgili kavramlar, başlık yapısı, bağlam ve kullanıcı davranışı gibi çok sayıda sinyalle anlar. Bu yüzden yoğunluk artık bir sıralama hedefi değil, metnin dengesini kontrol etmek için kullanılan bir ölçüdür: ana konunun metinde yeterince işlenip işlenmediğini ve gereksiz tekrar olup olmadığını gösterir."
      ]
    },
    {
      h: "Kelime yoğunluğu nasıl hesaplanır?",
      p: [
        "Tek kelimelik bir ifade için hesap basittir: kelimenin geçiş sayısı toplam kelime sayısına bölünür ve 100 ile çarpılır. Birden fazla kelimeden oluşan ifadelerde iki yöntem kullanılır; hangisini kullandığınızı belirtmeden iki raporu karşılaştırmamak gerekir."
      ],
      formula: "Tek kelime: yoğunluk (%) = geçiş sayısı ÷ toplam kelime × 100\nKelime grubu, geçiş bazlı: yoğunluk (%) = ifadenin geçiş sayısı ÷ toplam kelime × 100\nKelime grubu, kelime bazlı: yoğunluk (%) = geçiş sayısı × ifadedeki kelime sayısı ÷ toplam kelime × 100",
      ol: [
        "Metnin toplam kelime sayısını bulun: 800 kelime.",
        "\"fatura\" kelimesinin geçiş sayısını sayın: 12.",
        "Yoğunluğu hesaplayın: 12 ÷ 800 × 100 = %1,5.",
        "İki kelimelik \"e-fatura kesmek\" ifadesi 8 kez geçiyorsa geçiş bazlı yoğunluk 8 ÷ 800 × 100 = %1, kelime bazlı yoğunluk 8 × 2 ÷ 800 × 100 = %2'dir."
      ],
      after: [
        "Toplam kelime sayısı için [[arac:kelime-sayaci|Kelime Sayacı]], her kelimenin kaç kez geçtiğini ve yüzdesini görmek için [[arac:kelime-frekansi|Kelime Frekansı Analizi aracı]] kullanılabilir. Frekans aracı Türkçe harf kurallarına uygun çalışır ve bağlaçları filtreleyebilir."
      ]
    },
    {
      h: "SEO için ideal kelime yoğunluğu var mı?",
      p: [
        "Kısa cevap: <strong>hayır</strong>. Arama motorlarının yayımladığı rehberlerde sıralama için belirli bir kelime yoğunluğu önerilmez. İnternette sık görülen \"%1–2\" ya da \"%2–3\" gibi oranlar, deneyime dayalı genel tavsiyelerdir ve hiçbir arama motoru bu oranları bir sıralama kuralı olarak açıklamamıştır.",
        "Asıl önemli olan, metnin okuyucunun sorusunu eksiksiz ve anlaşılır biçimde cevaplamasıdır. Konuyu iyi işleyen bir metinde ana kelime kendiliğinden birkaç kez, başlıklarda ve ilk paragrafta doğal olarak geçer. Yoğunluk ölçümünü bir hedef olarak değil, yazdıktan sonra \"bu kelimeyi çok mu tekrar ettim, yoksa konuyu hiç mi anmadım?\" sorusunu sormak için kullanın."
      ],
      table: {
        head: ["Durum", "Ne gösterir?", "Ne yapılabilir?"],
        rows: [
          ["Ana kelime hiç ya da bir kez geçiyor", "Konu metinde net değil olabilir", "Başlık ve giriş paragrafını gözden geçirin"],
          ["Ana kelime doğal aralıklarla geçiyor", "Konu açık, metin dengeli", "Değişiklik gerekmez"],
          ["Aynı kalıp her paragrafta birkaç kez", "Okurken tekrar hissi doğar", "Eş anlamlı ve ilgili kavramlarla çeşitlendirin"],
          ["Cümleler kelimeyi sığdırmak için bozulmuş", "Anahtar kelime doldurma", "Metni okuyucu için yeniden yazın"]
        ]
      }
    },
    {
      h: "Anahtar kelime doldurma neden zararlı?",
      p: [
        "Anahtar kelime doldurma (keyword stuffing), bir sayfanın sıralamasını yapay olarak yükseltmek amacıyla aynı kelimeyi ya da ifadeyi metne doğal olmayan biçimde yerleştirmektir. Örneğin \"Ucuz halı arıyorsanız ucuz halı mağazamızdaki ucuz halı modellerine bakın\" gibi cümleler, sayfanın sonuna eklenmiş anahtar kelime listeleri ya da metinle aynı renkte gizlenmiş kelimeler bu kapsamdadır.",
        "Büyük arama motorlarının yayımladığı spam politikaları anahtar kelime doldurmayı açıkça spam uygulamaları arasında sayar. Bu tür sayfalar sıralamada geriletilebilir ya da arama sonuçlarından çıkarılabilir. Daha önemlisi, okuyucu bu metni yapay bulur ve sayfayı terk eder; bu da sitenin güvenilirliğine zarar verir. Reklam geliri elde eden siteler için düşük kaliteli, tekrar dolu içerik reklam ağlarının yayıncı politikaları açısından da risk oluşturabilir."
      ]
    },
    {
      h: "Türkçe metinlerde yoğunluk hesabı neden farklıdır?",
      p: [
        "Türkçe eklemeli bir dildir: tek bir kök, aldığı eklerle onlarca farklı biçimde görünebilir. \"Fatura\" kelimesi metinde \"faturayı\", \"faturanın\", \"faturalar\", \"faturasını\" gibi biçimlerde geçer. Basit bir kelime sayacı bunları ayrı kelimeler olarak sayar; bu nedenle yalnızca \"fatura\" biçimine bakarak hesaplanan yoğunluk, konunun metinde gerçekte ne kadar işlendiğini olduğundan düşük gösterir."
      ],
      ul: [
        "<strong>Çekimli biçimleri toplayın:</strong> Frekans listesinde aynı kökten gelen biçimleri bir arada değerlendirin.",
        "<strong>Kesme işaretine dikkat:</strong> \"KDV'yi\" ve \"KDV\" farklı biçimler olarak sayılabilir.",
        "<strong>Büyük-küçük harf:</strong> Türkçede \"İ/i\" ve \"I/ı\" dönüşümü doğru yapılmazsa \"İstanbul\" ile \"istanbul\" ayrı sayılabilir; Türkçe kurallara uygun araç kullanın.",
        "<strong>Bağlaç ve edatları filtreleyin:</strong> \"ve\", \"bir\", \"bu\", \"için\" gibi kelimeler her metinde en sık geçenlerdir ve konu hakkında bilgi vermez.",
        "<strong>Ekli biçimleri doğal kullanın:</strong> Arama motorları Türkçe çekimleri anlar; ana kelimeyi her yerde eksiz yazmak metni bozar."
      ],
      after: [
        "Türkçe karakterlerin farklı kodlamalarda bozulması da sayımı etkileyebilir; bu konuda [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Metinde en çok geçen kelimeler nasıl bulunur?",
      ol: [
        "Metninizi düz metin olarak kopyalayın; başlık, menü ve alt bilgi gibi tekrar eden site öğelerini dışarıda bırakın.",
        "[[arac:kelime-frekansi|Kelime Frekansı aracına]] yapıştırın ve bağlaç filtresini açın.",
        "Listenin ilk 10–20 kelimesine bakın: bunlar metnin gerçekte neyi anlattığını gösterir.",
        "Ana konunuzla ilgili kelimeler listenin üst sıralarında değilse metnin odağını gözden geçirin.",
        "Konuyla ilgisiz bir kelime çok üst sıralardaysa gereksiz tekrar olup olmadığını kontrol edin."
      ],
      after: [
        "Bu yöntem kendi yazdığınız metinleri değerlendirmek kadar, bir konuyu ele alan metinlerde hangi kavramların öne çıktığını anlamak için de kullanılabilir. Uzun bir metnin okunma süresini tahmin etmek isterseniz [[bilgi:dakikada-kac-kelime-okunur|dakikada kaç kelime okunur]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Kelime bulutu nasıl oluşturulur?",
      p: [
        "Kelime bulutu, bir metinde sık geçen kelimeleri sıklıklarına göre farklı büyüklüklerde gösteren görseldir. En sık geçen kelime en büyük yazılır; böylece metnin ana temaları tek bakışta görülür. Sunumlarda, anket cevaplarının özetlenmesinde ve eğitim materyallerinde sıkça kullanılır.",
        "Kelime bulutu oluştururken bağlaçları çıkarmak, aynı kökten gelen biçimleri birleştirmek ve gösterilecek kelime sayısını sınırlamak (ör. en sık 50 kelime) daha anlamlı bir görsel verir. [[arac:kelime-bulutu|Kelime Bulutu Oluşturucu]] metninizden doğrudan bulut üretir ve tarayıcınızda çalışır; metniniz hiçbir sunucuya gönderilmez."
      ]
    },
    {
      h: "Art arda tekrar eden kelimeler nasıl yakalanır?",
      p: [
        "Yazım ve düzenleme sırasında en sık gözden kaçan hatalardan biri aynı kelimenin art arda iki kez yazılmasıdır: \"bu bu\", \"için için\" gibi. Bu tür tekrarlar okurken göze takılmayabilir ama metnin kalitesini düşürür. Ayrıca aynı kelimenin kısa aralıklarla, örneğin aynı cümlede iki kez kullanılması da üslubu zayıflatır.",
        "[[arac:kelime-tekrar-bul|Art Arda Tekrarlanan Kelimeleri Bulma aracı]] yan yana tekrar eden kelimeleri işaretler. Aynı cümle ya da paragraf içindeki tekrarlar için frekans listesini paragraf paragraf incelemek ve tekrar eden kelimeyi eş anlamlısıyla değiştirmek iyi bir düzenleme yöntemidir."
      ]
    },
    {
      h: "Kelime sayısı yoğunluğu nasıl etkiler?",
      p: [
        "Yoğunluk bir oran olduğu için metin uzadıkça aynı oranı korumak için gereken geçiş sayısı artar. 300 kelimelik bir metinde 6 kez geçen kelime %2 yoğunluk verirken, 1.500 kelimelik bir metinde aynı 6 geçiş yalnızca %0,4'tür. Uzun ve kapsamlı metinlerde ana kelimenin oranının düşmesi doğaldır, çünkü metin konunun alt başlıklarını, ilgili kavramları ve örnekleri de işler."
      ],
      table: {
        head: ["Toplam kelime", "6 geçiş", "12 geçiş", "24 geçiş"],
        rows: [
          ["300", "%2,0", "%4,0", "%8,0"],
          ["800", "%0,75", "%1,5", "%3,0"],
          ["1.500", "%0,4", "%0,8", "%1,6"],
          ["2.500", "%0,24", "%0,48", "%0,96"]
        ],
        caption: "Aynı geçiş sayısı kısa metinde yüksek, uzun metinde düşük yoğunluk verir."
      },
      after: [
        "Bu nedenle kısa ürün açıklamalarında birkaç tekrar bile yoğunluğu yüksek gösterebilir; burada da ölçü okuyucunun metni doğal bulmasıdır. Metnin uzunluğunu sayfa olarak görmek isterseniz [[bilgi:kac-kelime-kac-sayfa-eder|kaç kelime kaç sayfa eder]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Yoğunluktan daha önemli olanlar",
      ul: [
        "<strong>Arama niyetini karşılamak:</strong> Okuyucu ne arıyorsa ilk paragrafta net bir cevap verin.",
        "<strong>Başlık yapısı:</strong> Konuyu mantıklı alt başlıklara bölün; başlıklar metnin iskeletini oluşturur.",
        "<strong>Özgünlük ve doğruluk:</strong> Başka kaynaklarda olmayan örnek, hesap ya da deneyim ekleyin.",
        "<strong>İlgili kavramlar:</strong> Ana kelimenin eş anlamlılarını ve konuyla ilişkili terimleri doğal biçimde kullanın.",
        "<strong>Okunabilirlik:</strong> Kısa paragraflar, anlaşılır cümleler ve gerektiğinde liste ve tablolar kullanın.",
        "<strong>Sayfa başlığı ve açıklama:</strong> Arama sonucunda görünen başlık ve açıklama tıklanma oranını doğrudan etkiler."
      ]
    }
  ],
  faq: [
    ["Anahtar kelime yoğunluğu nedir?", "Anahtar kelime yoğunluğu, bir kelimenin ya da kelime grubunun metinde kaç kez geçtiğinin toplam kelime sayısına oranının yüzde olarak ifadesidir. Metnin dengesini ve tekrarları kontrol etmek için kullanılır; günümüzde bir sıralama hedefi olarak görülmez."],
    ["Kelime yoğunluğu nasıl hesaplanır?", "Kelimenin geçiş sayısı toplam kelime sayısına bölünüp 100 ile çarpılır. 800 kelimelik metinde 12 kez geçen kelimenin yoğunluğu yüzde 1,5'tir. Birden fazla kelimeden oluşan ifadelerde geçiş bazlı ve kelime bazlı iki farklı yöntem kullanılabilir."],
    ["SEO için ideal kelime yoğunluğu var mı?", "Hayır. Arama motorları belirli bir yoğunluk oranı önermez; internette görülen yüzde 1 ile 3 gibi oranlar yalnızca genel tavsiyelerdir. Önemli olan metnin okuyucunun sorusunu iyi cevaplaması ve ana kelimenin doğal biçimde kullanılmasıdır."],
    ["Anahtar kelime doldurma neden zararlı?", "Aynı kelimeyi sıralamayı yapay olarak yükseltmek için doğal olmayan biçimde tekrarlamak arama motorlarının spam politikalarına aykırıdır ve sayfanın geriletilmesine yol açabilir. Okuyucu da bu metni yapay bulur ve sayfayı terk eder."],
    ["Metinde en çok geçen kelimeler nasıl bulunur?", "Metni bir kelime frekansı aracına yapıştırıp bağlaç filtresini açtığınızda kelimeler geçiş sayısına göre sıralanır. Listenin ilk 10 ile 20 kelimesi metnin gerçekte neyi anlattığını gösterir ve gereksiz tekrarları fark etmenizi sağlar."],
    ["Kelime bulutu nasıl oluşturulur?", "Metin bir kelime bulutu oluşturucuya yapıştırılır; araç sık geçen kelimeleri sıklıklarına göre büyük ya da küçük yazarak görsel üretir. Bağlaçları çıkarmak ve gösterilecek kelime sayısını sınırlamak daha anlamlı bir bulut verir."],
    ["Art arda tekrar eden kelimeler nasıl yakalanır?", "Tekrar bulma aracı, bu bu ya da için için gibi yan yana yazılmış aynı kelimeleri işaretler. Aynı cümle ya da paragraf içindeki yakın tekrarlar için frekans listesini bölüm bölüm incelemek ve kelimeyi eş anlamlısıyla değiştirmek etkili bir yöntemdir."],
    ["Kelime sayısı yoğunluğu nasıl etkiler?", "Yoğunluk bir oran olduğu için metin uzadıkça aynı geçiş sayısı daha düşük yüzde verir: 6 geçiş 300 kelimede yüzde 2, 1.500 kelimede yüzde 0,4'tür. Uzun ve kapsamlı metinlerde ana kelimenin oranının düşmesi doğaldır."],
    ["Türkçede ekli kelimeler yoğunluğa sayılır mı?", "Basit sayaçlar faturayı ve faturanın gibi çekimli biçimleri ayrı kelimeler olarak sayar. Konunun metinde ne kadar işlendiğini doğru görmek için aynı kökten gelen biçimleri birlikte değerlendirmek ve Türkçe harf kurallarına uygun bir araç kullanmak gerekir."]
  ],
  tools: ["kelime-frekansi", "kelime-bulutu", "kelime-sayaci", "kelime-tekrar-bul"],
  related: ["dakikada-kac-kelime-okunur", "kac-kelime-kac-sayfa-eder", "turkce-karakter-sorunu-nasil-duzeltilir", "open-graph-meta-etiketi-nedir"]
};
