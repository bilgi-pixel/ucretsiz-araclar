export default {
  slug: "iki-belge-arasindaki-fark-nasil-bulunur",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "İki Belge Arasındaki Fark Nasıl Bulunur? PDF ve Metin Karşılaştırma",
  pageTitle: "İki Belge Arasındaki Fark Nasıl Bulunur? PDF ve Metin Karşılaştırma",
  description: "İki PDF ya da metin sürümü arasındaki farklar diff yöntemiyle bulunur. Satır ve kelime bazlı karşılaştırma, taranmış PDF, biçim farkı ve gizli belge önerileri.",
  keywords: ["iki pdf karşılaştırma", "iki metin arasındaki fark", "sözleşme farkı bulma", "belge karşılaştırma", "word belge karşılaştırma", "değişiklik bulma", "diff nedir", "metin karşılaştırma"],
  lead: "İki belge arasındaki fark, her iki sürümün metnini çıkarıp bir <strong>karşılaştırma (diff) algoritmasıyla</strong> satır, kelime ya da karakter düzeyinde hizalayarak bulunur; eklenen kısımlar yeşil, silinenler kırmızı gösterilir. PDF'lerde önce metin katmanı okunur, taranmış PDF'lerde ise önce OCR ile metin üretilir. Bu sayfada diff'in nasıl çalıştığını, sözleşme sürümlerini karşılaştırırken izlenecek yolu, satır ve kelime bazlı yöntemin farkını, biçim değişikliklerinin neden çoğu zaman görünmediğini ve gizli belgeleri hiçbir yere yüklemeden nasıl karşılaştırabileceğinizi bulacaksınız.",
  kisaCevap: [
    "Karşılaştırma araçları iki metnin en uzun ortak alt dizisini (LCS) bulur; ortakta olmayan parçalar eklenen ya da silinen olarak işaretlenir.",
    "Satır bazlı karşılaştırma değişen satırın tamamını, kelime bazlı karşılaştırma yalnızca değişen kelimeyi gösterir.",
    "Metin katmanı olan PDF'ler doğrudan karşılaştırılır; taranmış PDF'ler önce OCR'dan geçirilmelidir.",
    "Kalın, renk, yazı tipi gibi biçim farkları metin karşılaştırmasında görünmez; bunun için görsel (piksel) karşılaştırma gerekir.",
    "Sözleşmede sayı, tarih, tutar ve olumsuzluk ekleri (\"-maz\", \"-mez\") en kritik farklardır; kelime ya da karakter düzeyinde kontrol edilmelidir.",
    "Tarayıcıda çalışan araçlarla belge bilgisayarınızdan çıkmadan karşılaştırılabilir."
  ],
  figure: {
    alt: "İki sözleşme sürümünün karşılaştırılması: üstte satır bazlı görünümde değişen satırın tamamı kırmızı ve yeşil, altta kelime bazlı görünümde yalnızca 30 yerine 45 ve yüzde 2 yerine yüzde 3 işaretli.",
    caption: "Aynı değişiklik iki farklı ayrıntı düzeyinde: satır bazlı görünüm hangi satırın değiştiğini, kelime bazlı görünüm satırın içinde tam olarak neyin değiştiğini gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sözleşme v1 ile v2 karşılaştırması</text>
  <text x="30" y="66" class="b">1) Satır bazlı görünüm</text>
  <rect x="30" y="80" width="660" height="34" rx="4" class="dgs"/>
  <text x="44" y="102" class="sm"><tspan class="dg b">− </tspan>Teslim süresi 30 gündür; gecikmede günlük %2 ceza uygulanır.</text>
  <rect x="30" y="118" width="660" height="34" rx="4" class="oks"/>
  <text x="44" y="140" class="sm"><tspan class="ok b">+ </tspan>Teslim süresi 45 gündür; gecikmede günlük %3 ceza uygulanır.</text>
  <rect x="30" y="156" width="660" height="34" rx="4" class="sf sb"/>
  <text x="44" y="178" class="sm mu">  Ödeme, teslimden sonra 15 gün içinde yapılır. (değişmedi)</text>
  <text x="30" y="226" class="b">2) Kelime bazlı görünüm</text>
  <rect x="30" y="240" width="660" height="44" rx="4" class="sf sb"/>
  <text x="44" y="268" class="sm">Teslim süresi</text>
  <rect x="146" y="252" width="30" height="22" rx="3" class="dgs"/><text x="161" y="268" class="sm mid dg b">30</text>
  <rect x="180" y="252" width="30" height="22" rx="3" class="oks"/><text x="195" y="268" class="sm mid ok b">45</text>
  <text x="216" y="268" class="sm">gündür; gecikmede günlük</text>
  <rect x="404" y="252" width="34" height="22" rx="3" class="dgs"/><text x="421" y="268" class="sm mid dg b">%2</text>
  <rect x="442" y="252" width="34" height="22" rx="3" class="oks"/><text x="459" y="268" class="sm mid ok b">%3</text>
  <text x="482" y="268" class="sm">ceza uygulanır.</text>
  <rect x="30" y="312" width="210" height="84" rx="8" class="ps"/>
  <text x="135" y="342" class="b mid">Değişen satır</text><text x="135" y="372" class="xl mid p">1 / 3</text>
  <rect x="255" y="312" width="210" height="84" rx="8" class="ps"/>
  <text x="360" y="342" class="b mid">Değişen kelime</text><text x="360" y="372" class="xl mid p">2</text>
  <rect x="480" y="312" width="210" height="84" rx="8" class="sf sb"/>
  <text x="585" y="342" class="b mid">Biçim farkı</text><text x="585" y="370" class="sm mid mu">metin diff'inde</text><text x="585" y="386" class="sm mid mu">görünmez</text>
</svg>`
  },
  sections: [
    {
      h: "Belge karşılaştırma (diff) nedir, nasıl çalışır?",
      p: [
        "<strong>Diff</strong>, İngilizce \"difference\" sözcüğünden gelir ve iki metin arasındaki farkları listeleyen yönteme verilen addır. Yazılımcıların kod sürümlerini izlemek için kullandığı bu yöntem bugün sözleşme, şartname, tez ve yönetmelik taslaklarının karşılaştırılmasında da standart hâle gelmiştir.",
        "Algoritmanın temel fikri basittir: iki metinde <strong>aynı sırayla geçen en uzun ortak parçayı</strong> (en uzun ortak alt dizi, LCS) bulmak. Ortak dizide yer alan satırlar ya da kelimeler \"değişmedi\" sayılır; yalnızca ilk metinde olanlar <em>silinen</em>, yalnızca ikinci metinde olanlar <em>eklenen</em> olarak işaretlenir. Bir kelimenin değiştirilmesi aslında \"eskisi silindi, yenisi eklendi\" çiftidir.",
        "Bu yaklaşımın güzel yanı, araya paragraf eklense bile geri kalan metnin kaymış görünmemesidir. Sıradan bir \"satır satır eşleştirme\" yapılsaydı, 3. satıra eklenen tek bir cümle sonraki tüm satırları farklı gösterirdi. LCS tabanlı diff ise eklenen satırı ayrı tutar, gerisini yeniden hizalar."
      ]
    },
    {
      h: "Satır, kelime ve karakter bazlı karşılaştırma farkı",
      p: [
        "Karşılaştırmanın ayrıntı düzeyi (taneciği) sonucu doğrudan etkiler. Aynı iki metin satır düzeyinde 1 fark, kelime düzeyinde 2 fark, karakter düzeyinde ise 2 rakamlık fark olarak görünebilir. Hangi düzeyi seçeceğiniz, belgenin türüne ve aradığınız değişikliğin büyüklüğüne bağlıdır."
      ],
      table: {
        head: ["Düzey", "Neyi gösterir?", "En uygun kullanım", "Zayıf yanı"],
        rows: [
          ["Satır bazlı", "Değişen satırın tamamını", "Kod, liste, madde madde metin", "Uzun paragraflarda küçük değişiklik gözden kaçar"],
          ["Kelime bazlı", "Satır içindeki değişen kelimeleri", "Sözleşme, dilekçe, makale", "Kelime sınırı olmayan değişikliklerde (ek, harf) kaba kalır"],
          ["Karakter bazlı", "Tek harf ve rakam farklarını", "Tutar, IBAN, tarih, kod numarası", "Çok değişen metinde okunması zordur"]
        ]
      },
      after: [
        "Pratik yöntem şudur: önce satır bazlı görünümle belgenin hangi bölümlerinin değiştiğini görün, ardından değişen bölümlere kelime ya da karakter bazlı görünümle yakından bakın. [[arac:metin-karsilastir|Metin Karşılaştırma aracı]] üç düzeyi de sunar ve sonuçları yan yana ya da birleşik görünümde gösterebilir."
      ]
    },
    {
      h: "Sözleşmenin iki sürümünde neyin değiştiğini bulmak: adım adım",
      p: [
        "Karşı taraftan gelen \"son hâli\" ile sizin onayladığınız taslak arasında küçük ama önemli değişiklikler olabilir. Gözle okuyarak karşılaştırmak hem yorucu hem de risklidir; insan gözü tanıdık metinde rakam değişikliklerini kolayca atlar. Şu sırayı izleyin:"
      ],
      ol: [
        "İki dosyanın da en son sürüm olduğundan emin olun; dosya adlarına tarih ya da sürüm numarası ekleyin (ör. sozlesme-v1, sozlesme-v2).",
        "Dosyalar PDF ise [[arac:pdf-karsilastir|PDF Karşılaştır]] aracına iki dosyayı yükleyin; Word belgesiyse metni kopyalayıp metin karşılaştırma aracına yapıştırabilirsiniz.",
        "Önce sayfa sayısı ve belge bilgisi tablosuna bakın: sayfa sayısının değişmesi eklenmiş ya da çıkarılmış bir bölüm olduğunu gösterir.",
        "Satır bazlı farkları gözden geçirin, ardından değişen satırları kelime düzeyinde inceleyin.",
        "Tutar, süre, oran, tarih, taraf unvanı ve \"değildir / -mez\" gibi olumsuzluk ifadelerini ayrıca karakter düzeyinde kontrol edin.",
        "Farkları .txt rapor olarak kaydedin ve hukuk danışmanınızla ya da karşı tarafla bu liste üzerinden konuşun."
      ],
      after: [
        "Şekildeki örnekte \"30 gün\" ifadesinin \"45 gün\", \"%2\" oranının \"%3\" olarak değiştiği görülüyor. Satır bazlı görünüm yalnızca bir satırın değiştiğini söyler; kelime bazlı görünüm ise iki kritik değişikliği tek bakışta ortaya koyar."
      ]
    },
    {
      h: "Taranmış PDF'ler karşılaştırılabilir mi?",
      p: [
        "PDF iki farklı şekilde oluşabilir. Word ya da benzeri bir programdan \"PDF olarak kaydet\" ile üretilen dosyalarda metin katmanı vardır; harfler seçilebilir, kopyalanabilir ve doğrudan karşılaştırılabilir. Tarayıcıdan ya da telefon kamerasından elde edilen PDF'ler ise yalnızca resimden oluşur; içinde \"metin\" yoktur.",
        "Taranmış PDF'leri metin olarak karşılaştırmak için önce <strong>OCR</strong> (optik karakter tanıma) uygulanması gerekir. [[arac:pdf-ocr|PDF OCR aracı]] sayfalara görünmez bir metin katmanı ekler; ardından [[arac:pdf-metin-cikar|PDF'den Metin Çıkarma]] ile metni alıp karşılaştırabilirsiniz.",
        "OCR'ın bir hata payı olduğunu unutmayın. Düşük çözünürlüklü ya da eğik taramalarda \"0\" ile \"O\", \"1\" ile \"l\", \"ı\" ile \"i\" karışabilir. Bu yüzden OCR sonrası çıkan farkların bir kısmı gerçek değişiklik değil, tanıma hatasıdır. Kritik rakamları her zaman taramanın kendisine bakarak doğrulayın."
      ],
      table: {
        head: ["PDF türü", "Nasıl anlaşılır?", "Karşılaştırma yolu"],
        rows: [
          ["Metin katmanlı (dijital)", "Metin fareyle seçilebiliyor", "Doğrudan PDF ya da metin karşılaştırma"],
          ["Taranmış (resim)", "Metin seçilemiyor, tüm sayfa tek resim", "Önce OCR, sonra metin karşılaştırma"],
          ["Karma", "Bazı sayfalar seçilebiliyor, bazıları değil", "Taranmış sayfalara OCR, sonra karşılaştırma"],
          ["Biçim odaklı", "Metin aynı, görünüm farklı", "Görsel (piksel) karşılaştırma"]
        ]
      }
    },
    {
      h: "Biçim değişiklikleri karşılaştırmada görünür mü?",
      p: [
        "Metin karşılaştırma yalnızca karakterlere bakar. Bir cümlenin kalın yazılması, yazı tipinin büyümesi, rengin değişmesi ya da tablonun yer değiştirmesi metin aynı kaldığı sürece fark olarak görünmez. Bu, çoğu sözleşme incelemesi için yeterlidir; çünkü hukuki sonuç doğuran şey kelimelerdir.",
        "Ancak logo, imza, kaşe, tablo düzeni ya da grafik gibi görsel öğelerin değişip değişmediğini merak ediyorsanız <strong>görsel karşılaştırma</strong> kullanmanız gerekir. Bu yöntemde iki sayfa resme çevrilir ve piksel piksel üst üste konur; farklı pikseller kırmızıyla boyanır. PDF karşılaştırma aracındaki görsel mod tam olarak bunu yapar.",
        "Görsel karşılaştırmanın da sınırları vardır: satırlar bir satır aşağı kaydığında sayfanın geri kalanı tamamen farklı görünebilir. Bu yüzden önce metin, sonra görsel karşılaştırma yapmak en verimli sıradır."
      ]
    },
    {
      h: "Word'deki \"Değişiklikleri İzle\" ile karşılaştırma arasındaki fark",
      p: [
        "Kelime işlemcilerdeki <em>değişiklikleri izle</em> özelliği, belge düzenlenirken yapılan her işlemi kaydeder: kim, ne zaman, neyi sildi ya da ekledi. Bu yöntem, belgenin tüm düzenleme sürecinin aynı dosya üzerinde ve özellik açıkken yapılmasına dayanır.",
        "Karşılaştırma (diff) ise geçmişe bakmaz; yalnızca iki sonucu yan yana koyar. Karşı taraf izlemeyi kapatıp değişiklik yaptıysa, metni başka bir dosyaya kopyaladıysa ya da belgeyi PDF'e çevirdiyse izleme kaydı işe yaramaz; karşılaştırma ise yine çalışır."
      ],
      table: {
        head: ["Özellik", "Değişiklikleri izle", "Karşılaştırma (diff)"],
        rows: [
          ["Neye dayanır?", "Düzenleme sırasında tutulan kayda", "İki dosyanın son hâline"],
          ["Kimin değiştirdiği", "Gösterilir", "Gösterilmez"],
          ["İzleme kapatılırsa", "Değişiklik kaydedilmez", "Fark yine bulunur"],
          ["PDF ile çalışır mı?", "Hayır", "Evet"],
          ["Güvenilirlik", "Karşı tarafın dürüstlüğüne bağlı", "Bağımsız doğrulama sağlar"]
        ]
      },
      after: [
        "Önemli belgelerde iki yöntemi birlikte kullanmak en sağlıklısıdır: izleme kaydıyla müzakere sürecini yürütün, imzadan önce ise son sürümü onayladığınız sürümle bağımsız olarak karşılaştırın."
      ]
    },
    {
      h: "Gizli belgeleri yüklemeden karşılaştırmak",
      p: [
        "Sözleşmeler, teklifler, maaş tabloları ve kişisel veri içeren belgeler, dosyayı sunucuya yükleyen çevrim içi hizmetlere verilmemelidir. Yüklenen dosyanın ne kadar süre saklandığını, kimlerin erişebildiğini ve yedeklere girip girmediğini dışarıdan bilmek mümkün değildir.",
        "Bilişim Ajans'ın karşılaştırma araçları tarayıcınızda çalışan JavaScript ile işlem yapar; dosya bilgisayarınızdan çıkmaz. Sayfa yüklendikten sonra internet bağlantınızı kesseniz bile karşılaştırma çalışmaya devam eder; bu, verinin hiçbir yere gönderilmediğinin pratik bir kanıtıdır.",
        "Ek güvenlik için karşılaştırma bittikten sonra sekmeyi kapatın. İki dosyanın birebir aynı olup olmadığını hızlıca anlamak isterseniz özet değerlerine de bakabilirsiniz; tek bir bayt farkı bile özeti tamamen değiştirir. Bu konuyu [[bilgi:hash-nedir-sha256-md5|hash ve SHA-256 rehberinde]] ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Karşılaştırmada sık yapılan hatalar",
      ul: [
        "<strong>Boşluk ve satır sonu farklarını gerçek değişiklik sanmak:</strong> PDF'ten çıkarılan metinde satırlar sayfa genişliğine göre kırılır. Karşılaştırmadan önce satırları paragraf hâlinde birleştirmek ya da \"boşlukları yok say\" seçeneğini açmak gürültüyü azaltır.",
        "<strong>Türkçe karakter kodlaması:</strong> Bir sürümde \"ı\" yerine \"i\", \"ş\" yerine \"s\" görünüyorsa sorun içerik değil kodlamadır. Ayrıntı için [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu rehberine]] bakın.",
        "<strong>Yalnızca ilk sayfalara bakmak:</strong> Değişiklikler çoğu zaman ek protokol, ceza maddesi ya da son sayfadaki imza bölümünde yapılır.",
        "<strong>OCR hatasını değişiklik sanmak:</strong> Taranmış belgede bulunan farkı mutlaka orijinal görüntüyle kontrol edin.",
        "<strong>Tablo içeriğini atlamak:</strong> PDF tabloları metne çevrilirken hücre sırası değişebilir; tablolarda görsel karşılaştırma daha güvenilirdir.",
        "<strong>Yanlış dosya çiftini karşılaştırmak:</strong> \"son\", \"son2\", \"en son\" gibi adlar karışıklığa yol açar; sürüm numarası kullanın."
      ]
    },
    {
      h: "Hangi aracı ne zaman kullanmalısınız?",
      p: [
        "İhtiyacınıza göre şu yol haritasını izleyebilirsiniz. Elinizde iki dijital PDF varsa doğrudan PDF karşılaştırma aracını açın; hem metin farkını hem görsel farkı aynı ekranda görürsünüz. İki e-posta metni, iki madde listesi ya da iki kod parçası gibi düz metinler için metin karşılaştırma aracı daha hızlıdır.",
        "Taranmış belgelerde sıra OCR, metin çıkarma ve karşılaştırmadır. Uzun listelerde önce tekrarlanan satırları temizlemek karşılaştırmayı sadeleştirir; bunun için [[bilgi:tekrar-eden-satirlari-silme-liste-duzenleme|liste düzenleme rehberine]] göz atabilirsiniz. Karşılaştırmadan önce gereksiz sayfaları ayıklamak isterseniz [[bilgi:pdf-sayfa-silme-ve-dondurme|PDF sayfa silme rehberi]] yardımcı olur."
      ]
    }
  ],
  faq: [
    ["İki PDF arasındaki farklar nasıl bulunur?", "İki PDF'i karşılaştırma aracına yükleyin; araç metin katmanını okuyup satır ve kelime düzeyinde farkları renkli gösterir. Taranmış PDF'lerde önce OCR uygulamanız, ardından çıkan metni karşılaştırmanız gerekir."],
    ["Sözleşmenin iki sürümünde neyin değiştiği nasıl görülür?", "Onayladığınız sürüm ile size gönderilen son sürümü kelime bazlı karşılaştırın. Tutar, süre, oran, tarih ve olumsuzluk ifadelerini ayrıca karakter düzeyinde kontrol edin; farkları rapor olarak kaydedip danışmanınızla paylaşın."],
    ["Metin karşılaştırma (diff) nasıl çalışır?", "Diff, iki metinde aynı sırayla geçen en uzun ortak parçayı bulur. Bu ortak dizide olmayan parçalar ilk metinde varsa silinen, ikinci metinde varsa eklenen olarak işaretlenir; böylece araya eklenen satırlar geri kalanı kaydırmaz."],
    ["Taranmış PDF'ler karşılaştırılabilir mi?", "Evet, ancak önce OCR ile metin katmanı oluşturulması gerekir. OCR tanıma hataları yapabileceği için bulunan farkları, özellikle rakam ve tutarları, taranmış görüntünün kendisiyle karşılaştırarak doğrulamak gerekir."],
    ["Satır bazlı ve kelime bazlı karşılaştırma farkı nedir?", "Satır bazlı karşılaştırma değişen satırın tamamını işaretler ve belgenin hangi bölümünün değiştiğini gösterir. Kelime bazlı karşılaştırma ise satırın içinde yalnızca değişen kelimeleri vurgular; sözleşme ve dilekçe gibi metinlerde daha kullanışlıdır."],
    ["Biçim değişiklikleri karşılaştırmada görünür mü?", "Metin karşılaştırmasında görünmez; kalın yazı, renk, yazı tipi ya da sayfa düzeni farkları karakterleri değiştirmez. Bu tür farkları görmek için iki sayfayı resim olarak üst üste koyan görsel karşılaştırmayı kullanmanız gerekir."],
    ["Gizli belgeler yüklemeden nasıl karşılaştırılır?", "Dosyayı sunucuya göndermeyen, tarayıcıda çalışan araçlar kullanın. Bilişim Ajans araçları işlemi bilgisayarınızda yapar; sayfa açıldıktan sonra interneti kesseniz bile çalışmaya devam eder, böylece belge hiçbir yere gitmez."],
    ["Word'de değişiklikleri izle ile karşılaştırma farkı nedir?", "Değişiklikleri izle, düzenleme sırasında kimin neyi değiştirdiğini kaydeder ama özellik kapatılırsa kayıt tutulmaz. Karşılaştırma ise iki dosyanın son hâline bakar, geçmişe ihtiyaç duymaz ve PDF'lerde de çalışır."],
    ["İki dosyanın birebir aynı olduğu nasıl anlaşılır?", "En hızlı yol iki dosyanın SHA-256 özetini karşılaştırmaktır; özetler aynıysa dosyalar bayt bayt aynıdır. Özetler farklıysa farkın nerede olduğunu görmek için metin ya da PDF karşılaştırması yapmanız gerekir."]
  ],
  tools: ["pdf-karsilastir", "metin-karsilastir", "pdf-metin-cikar", "pdf-ocr"],
  related: ["hash-nedir-sha256-md5", "turkce-karakter-sorunu-nasil-duzeltilir", "pdf-sayfa-silme-ve-dondurme"]
};
