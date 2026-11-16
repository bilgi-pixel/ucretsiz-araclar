export default {
  slug: "yapay-zekaya-prompt-nasil-yazilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Yapay Zekâya Prompt Nasıl Yazılır? Etkili Komut Yazma Kuralları ve Örnekler",
  pageTitle: "Prompt Nasıl Yazılır? Yapay Zekâya Etkili Komut Yazma Rehberi",
  description: "Yapay zekâya prompt nasıl yazılır? Görev, bağlam, rol, örnek ve çıktı biçimi bölümleri; uzun metin verme, kelime sınırı, doğrulama ve gizlilik kuralları, örneklerle.",
  keywords: ["prompt nasıl yazılır", "yapay zeka komut yazma", "etkili prompt örnekleri", "prompt mühendisliği", "yapay zekaya soru sorma", "prompt şablonu", "türkçe prompt", "yapay zeka çıktı biçimi"],
  lead: "İyi bir prompt, yapay zekâya ne yapmasını istediğinizi (görev), hangi durumda olduğunuzu (bağlam), kimin için yazdığını (hedef kitle) ve sonucu hangi biçimde beklediğinizi (çıktı biçimi) açıkça söyleyen kısa bir talimattır. Model aklınızdakini bilemez; ona ne kadar net çerçeve verirseniz yanıt o kadar isabetli olur. Bu yazıda bir promptun bölümlerini, örnek vermenin etkisini, uzun metinlerle çalışmayı, kelime sınırlarını, yanıtları doğrulamayı ve kişisel verileri korumayı somut örneklerle anlatıyoruz.",
  kisaCevap: [
    "Prompt, yapay zekâ modeline verilen yazılı talimattır; soru, görev, bağlam ve örnekler içerebilir.",
    "Etkili bir prompt beş parçadan oluşur: görev, bağlam, rol veya hedef kitle, örnek ve çıktı biçimi.",
    "\"Kısa yaz\" yerine \"en fazla 120 kelime, 3 madde\" gibi ölçülebilir sınırlar daha tutarlı sonuç verir.",
    "Bir iki örnek göstermek, uzun açıklamalardan daha hızlı istenen üslubu öğretir.",
    "Uzun metinleri tırnak ya da başlıklarla talimattan ayırın ve modelden yalnızca bu metne dayanmasını isteyin.",
    "Model emin görünse de yanlış olabilir; rakam, tarih, mevzuat ve kaynakları mutlaka kendiniz doğrulayın.",
    "TC kimlik numarası, şifre, sağlık ve müşteri bilgileri gibi kişisel verileri prompta yazmayın."
  ],
  figure: {
    alt: "Etkili prompt yapısı: görev, bağlam, hedef kitle, örnek ve çıktı biçimi kutuları; altta zayıf ve güçlü prompt karşılaştırması.",
    caption: "Beş parçalı prompt şablonu. Zayıf promptta yalnızca konu vardır; güçlü promptta görev, bağlam, hedef kitle, uzunluk sınırı ve çıktı biçimi açıkça yazılmıştır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Etkili promptun beş parçası</text>
  <g class="mid">
    <rect x="20" y="52" width="128" height="92" rx="10" class="p"/>
    <text x="84" y="84" class="sf b">1. Görev</text><text x="84" y="106" class="sf sm">Ne yapılacak?</text><text x="84" y="126" class="sf sm">"özetle", "yaz"</text>
    <rect x="160" y="52" width="128" height="92" rx="10" class="ps"/>
    <text x="224" y="84" class="b">2. Bağlam</text><text x="224" y="106" class="sm">Durum, amaç,</text><text x="224" y="126" class="sm">kısıtlar</text>
    <rect x="300" y="52" width="128" height="92" rx="10" class="ps"/>
    <text x="364" y="84" class="b">3. Kitle / rol</text><text x="364" y="106" class="sm">Kime, hangi</text><text x="364" y="126" class="sm">gözle?</text>
    <rect x="440" y="52" width="128" height="92" rx="10" class="oks"/>
    <text x="504" y="84" class="b">4. Örnek</text><text x="504" y="106" class="sm">İstenen üslup</text><text x="504" y="126" class="sm">1–2 örnek</text>
    <rect x="580" y="52" width="120" height="92" rx="10" class="oks"/>
    <text x="640" y="84" class="b">5. Biçim</text><text x="640" y="106" class="sm">Tablo, madde,</text><text x="640" y="126" class="sm">kelime sınırı</text>
  </g>
  <rect x="20" y="166" width="680" height="74" rx="8" class="dgs"/>
  <text x="36" y="190" class="b dg">Zayıf prompt</text>
  <text x="36" y="214" class="sm">"Toner hakkında bir şey yaz."</text>
  <text x="36" y="232" class="sm t2">Sonuç: rastgele uzunluk, belirsiz kitle, kullanılamayan metin</text>
  <rect x="20" y="254" width="680" height="148" rx="8" class="sf sb"/>
  <rect x="20" y="254" width="8" height="148" class="ok"/>
  <text x="40" y="278" class="b ok">Güçlü prompt</text>
  <text x="40" y="302" class="sm"><tspan class="b">Görev:</tspan> Bir ürün açıklaması yaz.</text>
  <text x="40" y="322" class="sm"><tspan class="b">Bağlam:</tspan> Ofis yazıcısı için muadil toner, 3.000 sayfa.</text>
  <text x="40" y="342" class="sm"><tspan class="b">Kitle:</tspan> Küçük işletmelerin satın alma sorumluları.</text>
  <text x="40" y="362" class="sm"><tspan class="b">Örnek:</tspan> Aşağıdaki açıklamanın üslubunu izle: "…"</text>
  <text x="40" y="382" class="sm"><tspan class="b">Biçim:</tspan> En fazla 120 kelime, 1 paragraf + 3 madde.</text>
</svg>`
  },
  sections: [
    {
      h: "Prompt nedir, neden bu kadar önemlidir?",
      p: [
        "Prompt, bir yapay zekâ sohbet asistanına ya da dil modeline yazdığınız istek metnidir. Kısa bir soru da olabilir, birkaç paragraflık ayrıntılı bir görev tanımı da. Model, yazdığınız metni okuyup en olası devamı üretir; sizin aklınızdan geçen ama yazmadığınız ayrıntıları bilemez.",
        "Aynı konuda iki farklı kişinin çok farklı kalitede yanıt almasının nedeni çoğu zaman modelin kendisi değil, verilen talimatın açıklığıdır. \"Bana bir e-posta yaz\" diyen kişi genel bir taslak alır; \"Teslimatı iki gün geciken müşteriye, özür dileyen ama suçu kabul etmeyen, 100 kelimelik resmî bir e-posta yaz\" diyen kişi doğrudan kullanabileceği bir metin alır.",
        "Prompt yazmak bir yazılım becerisinden çok iyi bir iş tarifi yazma becerisidir. Bir stajyere ya da dışarıdan çalıştığınız bir yazara iş verirken neleri söylüyorsanız, modele de aynı bilgileri vermeniz gerekir."
      ]
    },
    {
      h: "İyi bir prompt hangi bölümlerden oluşur?",
      p: [
        "Her promptta beş parçanın hepsi gerekmez; ama sonuç beklediğiniz gibi çıkmadığında eksik olan genellikle bunlardan biridir. Aşağıdaki tablo her parçanın işlevini ve örnek bir ifadesini gösterir."
      ],
      table: {
        head: ["Bölüm", "Sorusu", "Örnek ifade"],
        rows: [
          ["Görev", "Ne yapılacak?", "Bu metni özetle / bu tabloyu karşılaştır / 5 başlık öner"],
          ["Bağlam", "Neden, hangi durumda?", "Bir belediyeye teklif hazırlıyoruz, bütçe sınırlı"],
          ["Rol / hedef kitle", "Kim için, hangi bakışla?", "Teknik bilgisi olmayan okurlar için, sade dille"],
          ["Örnek", "Nasıl görünmeli?", "Şu iki cümlenin üslubunu izle: ..."],
          ["Çıktı biçimi", "Hangi şekilde teslim?", "Markdown tablo, en fazla 150 kelime, başlık yok"],
          ["Kısıtlar", "Neler olmasın?", "Marka adı kullanma, kesin rakam uydurma"]
        ]
      },
      after: [
        "Pratik bir sıra: önce görevi bir cümleyle yazın, sonra bağlamı ve hedef kitleyi ekleyin, varsa örneği verin, en sonda çıktı biçimini ve kısıtları belirtin. Talimatları madde madde yazmak, tek uzun paragraf yazmaktan daha az yanlış anlaşılır."
      ]
    },
    {
      h: "Rol, bağlam ve çıktı biçimi neden belirtilmelidir?",
      p: [
        "Rol vermek (\"bir muhasebeci gibi değerlendir\", \"bir öğretmen gibi açıkla\") modelin hangi terimleri, hangi ayrıntı düzeyini ve hangi tonu kullanacağını belirler. Rolün kendisi bilgi eklemez; ama yanıtın bakış açısını daraltır. Hedef kitleyi söylemek çoğu zaman rolden daha etkilidir: \"10. sınıf öğrencisi için\" ifadesi hem dili hem örnekleri ayarlar.",
        "Bağlam, modelin tahmin etmek zorunda kaldığı boşlukları doldurur. Bir sunum metni istiyorsanız sunumun kaç dakika süreceğini, kime yapılacağını ve amacın ikna mı bilgilendirme mi olduğunu yazın. Bağlam olmadan model \"ortalama\" bir senaryo varsayar.",
        "Çıktı biçimi, yanıtı doğrudan kullanılabilir hâle getirir. Tablo mu, madde listesi mi, e-posta mı, kod mu istediğinizi söyleyin. Bir tabloyu sonradan web sayfasına koyacaksanız sütun adlarını da belirtin; Markdown çıktısı istiyorsanız bunu açıkça yazın."
      ]
    },
    {
      h: "Örnek vermek yanıt kalitesini nasıl etkiler?",
      p: [
        "Üslubu kelimelerle tarif etmek zordur. \"Samimi ama profesyonel\" ifadesi herkes için farklı anlama gelir. Bunun yerine istediğiniz tarzda yazılmış bir iki örnek göstermek, modelin kalıbı hızla yakalamasını sağlar. Bu yönteme \"az örnekli\" (few-shot) istem denir.",
        "Örnek verirken dikkat edilecek nokta, modelin örneği fazla kopyalamamasıdır. Tek bir örnek verirseniz bütün çıktılar o örneğin cümle yapısına benzeyebilir. İki üç farklı örnek vermek ve \"bu örneklerin üslubunu izle, içeriğini kopyalama\" demek daha dengeli sonuç verir.",
        "Örneği talimattan açıkça ayırın: \"Örnek 1:\" ve \"Örnek 2:\" başlıkları ya da tırnak işaretleri kullanın. Aksi hâlde model örneği de görevin bir parçası sanabilir."
      ],
      ol: [
        "Görevi yazın: \"Ürünlerimiz için 3 kısa sosyal medya metni yaz.\"",
        "Örnekleri ekleyin: \"Örnek 1: ...\" ve \"Örnek 2: ...\" (geçmişte beğendiğiniz iki gerçek metin).",
        "Talimatı netleştirin: \"Bu örneklerin uzunluğunu ve tonunu izle, cümlelerini tekrar etme.\"",
        "Kısıtı ekleyin: \"Her metin en fazla 200 karakter, emoji yok.\""
      ]
    },
    {
      h: "Uzun metinleri yapay zekâya verirken nelere dikkat edilir?",
      p: [
        "Bir raporu, sözleşmeyi ya da toplantı notunu özetletmek en yaygın kullanım alanlarından biridir. Burada en önemli kural, talimat ile metni birbirinden ayırmaktır. Metni üç tırnak, köşeli başlık ya da \"METİN BAŞLANGICI / METİN SONU\" gibi işaretler arasına koyun; talimatı metnin öncesine ya da sonrasına yazın.",
        "Modelden yalnızca verdiğiniz metne dayanmasını isteyin: \"Metinde olmayan bilgi ekleme; metinde yoksa 'metinde yok' yaz.\" Bu cümle uydurma bilgi riskini belirgin biçimde azaltır. Özette sayfa ya da bölüm numarası istemek, sonradan kontrol etmenizi de kolaylaştırır.",
        "Çok uzun belgelerde modellerin bir kerede işleyebileceği metin miktarı sınırlıdır ve bu sınır kelime değil \"token\" ile ölçülür. Türkçe gibi eklemeli dillerde bir kelime genellikle birden fazla token'a bölünür. Ayrıntı için [[bilgi:yapay-zeka-token-nedir-kac-kelime|yapay zekâ token nedir]] yazısına bakabilirsiniz. Belgeyi bölümlere ayırıp her bölümü ayrı özetletmek ve sonra özetleri birleştirmek, sınırın yakınında çalışırken daha güvenilir bir yoldur."
      ]
    },
    {
      h: "Kelime ve karakter sınırı prompt yazımını nasıl etkiler?",
      p: [
        "\"Kısa tut\" talimatı göreceli olduğu için her seferinde farklı uzunlukta yanıt alırsınız. Ölçülebilir bir sınır verin: \"en fazla 120 kelime\", \"3 madde, her biri tek cümle\", \"meta açıklama için 150–160 karakter\". Modeller kelime sayısını kesin tutturamayabilir; ama sınır verildiğinde sapma belirgin biçimde azalır.",
        "Karakter sınırı olan alanlarda (SMS, sosyal medya, ürün başlığı, meta açıklama) çıktıyı mutlaka kendiniz ölçün. Model \"155 karakter\" dese bile gerçek uzunluk farklı olabilir. Metni [[arac:karakter-sayaci|Karakter Sayacı]]na yapıştırarak boşluklu ve boşluksuz uzunluğu, [[arac:kelime-sayaci|Kelime Sayacı]] ile de kelime sayısını kontrol edin.",
        "Kendi promptunuzun uzunluğu da önemlidir. Gereksiz tekrarlar ve çelişen talimatlar modelin dikkatini dağıtır. İyi bir prompt çoğu zaman 50–200 kelime arasındadır; uzun metin verdiğinizde bu sınır yalnızca talimat kısmı için geçerlidir."
      ],
      table: {
        head: ["Belirsiz talimat", "Ölçülebilir karşılığı"],
        rows: [
          ["Kısa yaz", "En fazla 80 kelime"],
          ["Detaylı anlat", "4 başlık, her başlık altında 2 paragraf"],
          ["Liste yap", "5 maddelik numaralı liste, her madde tek cümle"],
          ["SEO uyumlu başlık", "60 karakteri geçmeyen, anahtar kelimeyle başlayan başlık"],
          ["Resmî olsun", "\"Siz\" dili, kısaltma yok, selamlama ve kapanış cümlesi olsun"]
        ]
      }
    },
    {
      h: "Markdown biçimli çıktı nasıl istenir?",
      p: [
        "Yanıtı bir web sayfasına, belgeye ya da not uygulamasına aktaracaksanız Markdown çıktısı işinizi kolaylaştırır. Promptun sonuna \"Yanıtı Markdown biçiminde ver; ana başlıklar için ##, tablolar için Markdown tablo kullan\" yazmanız yeterlidir. Kod blokları gerekiyorsa dilini de belirtin.",
        "Çıktıyı yapıştırmadan önce [[arac:markdown-onizleme|Markdown Önizleme]] aracında nasıl görüneceğini kontrol edebilirsiniz. Markdown sözdizimine yabancıysanız [[bilgi:markdown-nedir-nasil-yazilir|Markdown nedir]] yazısı temel kuralları anlatır.",
        "Toplu düzeltme gerektiğinde, örneğin modelin her yerde kullandığı bir terimi değiştirmek istediğinizde, metni yeniden ürettirmek yerine [[arac:bul-ve-degistir|Bul ve Değiştir]] aracıyla tek seferde düzeltmek daha hızlı ve tutarlıdır."
      ]
    },
    {
      h: "Yanıtı doğrulamak neden gereklidir?",
      p: [
        "Dil modelleri akıcı ve kendinden emin metin üretir; ancak bu, metnin doğru olduğu anlamına gelmez. Model var olmayan bir kanun maddesini, yanlış bir tarihi ya da uydurma bir kaynağı gerçekmiş gibi yazabilir. Buna \"halüsinasyon\" denir ve özellikle rakam, mevzuat, sağlık ve finans konularında risklidir.",
        "Doğrulama için üç basit alışkanlık edinin: rakam ve tarihleri resmî kaynaktan kontrol edin; modelden yanıtındaki varsayımları ayrıca listelemesini isteyin; hesap içeren yanıtlarda hesabı bir hesap makinesi ya da ilgili araçla yeniden yapın. Model bir hesap yaptığında adımları yazmasını istemek, hatanın nerede olduğunu görmenizi kolaylaştırır.",
        "Sağlık, hukuk ve vergi gibi konularda yapay zekâ yanıtı yalnızca bir başlangıç noktasıdır; karar vermeden önce uzmana danışmak gerekir."
      ]
    },
    {
      h: "Kişisel ve gizli veriler prompta yazılmalı mı?",
      p: [
        "Hayır. Yazdığınız metin, kullandığınız hizmetin koşullarına göre sunucularda saklanabilir, hizmet kalitesini artırmak için incelenebilir. TC kimlik numarası, banka ve kart bilgileri, şifreler, müşteri listeleri, sağlık bilgileri ve ticari sırlar prompta yazılmamalıdır. Kişisel Verilerin Korunması Kanunu açısından başkalarına ait kişisel verileri üçüncü taraf bir hizmete aktarmak ayrıca sorumluluk doğurabilir.",
        "Gerçek veriyle çalışmanız gerekiyorsa önce anonimleştirin: adları \"Müşteri A\", numaraları \"XXX\" yapın. Bunun için de metni hizmete yapıştırmadan önce bilgisayarınızda düzenleyin. Bilişim Ajans araçları tarayıcınızda çalıştığı için metniniz hiçbir sunucuya gönderilmeden bu temizliği yapabilirsiniz.",
        "Kurumsal kullanımda şirketinizin yapay zekâ kullanım politikasını öğrenin; bazı kurumlar belirli hizmetleri ya da belirli veri türlerini yasaklar."
      ]
    },
    {
      h: "Sık yapılan hatalar ve çözümleri",
      ul: [
        "<strong>Tek kelimelik istek:</strong> \"SEO\" yazıp beklemek yerine ne istediğinizi bir cümleyle anlatın.",
        "<strong>Çelişen talimatlar:</strong> \"Kısa olsun\" ile \"her ayrıntıyı anlat\" aynı promptta olmamalı.",
        "<strong>Olumsuz talimata boğmak:</strong> Ne istemediğiniz kadar ne istediğinizi de yazın.",
        "<strong>Tek denemede vazgeçmek:</strong> İlk yanıtı taslak kabul edin; \"ikinci paragrafı kısalt, tonu daha resmî yap\" gibi takip talimatlarıyla düzeltin.",
        "<strong>Doğrulamadan yayımlamak:</strong> Rakam, isim ve alıntıları kontrol etmeden metni kullanmayın.",
        "<strong>Kişisel veri yapıştırmak:</strong> Metni önce anonimleştirin."
      ],
      after: [
        "Aynı tür işleri sık yapıyorsanız iyi çalışan promptlarınızı bir şablon dosyasında saklayın ve yalnızca değişen kısımlarını doldurun. Örneğin e-ticaret ürün metinleri için kurduğunuz şablonu [[bilgi:urun-aciklamasi-nasil-yazilir-e-ticaret|ürün açıklaması yazma]] ilkeleriyle birleştirebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Prompt nedir?", "Prompt, bir yapay zekâ modeline verdiğiniz yazılı istek ya da talimattır. Soru, görev tanımı, bağlam, örnek ve çıktı biçimi gibi bilgileri içerebilir ve yanıtın kalitesini doğrudan belirler."],
    ["İyi bir prompt hangi bölümlerden oluşur?", "İyi bir prompt genellikle görev, bağlam, rol veya hedef kitle, örnek ve çıktı biçimi bölümlerinden oluşur. Gerekirse istenmeyen şeyleri belirten kısıtlar da eklenir; her parça modelin tahmin etmek zorunda kaldığı bir boşluğu kapatır."],
    ["Rol, bağlam ve çıktı biçimi neden belirtilmelidir?", "Rol ve hedef kitle yanıtın dilini ve ayrıntı düzeyini, bağlam modelin varsayımlarını, çıktı biçimi ise yanıtın doğrudan kullanılabilirliğini belirler. Bunlar yazılmazsa model ortalama bir senaryo varsayar."],
    ["Örnek vermek yanıt kalitesini nasıl etkiler?", "Bir iki örnek göstermek, üslubu ve uzunluğu kelimelerle tarif etmekten daha etkilidir. Ancak tek örnek verilirse çıktılar ona fazla benzeyebilir; birkaç farklı örnek verip içeriği kopyalamamasını istemek daha dengeli sonuç verir."],
    ["Uzun metinleri yapay zekâya verirken nelere dikkat edilir?", "Metni tırnak ya da başlıklarla talimattan ayırın, modelden yalnızca o metne dayanmasını isteyin ve metinde olmayanı 'yok' diye belirtmesini söyleyin. Çok uzun belgeleri bölümlere ayırıp ayrı ayrı işletmek daha güvenilirdir."],
    ["Kelime ve karakter sınırı prompt yazımını nasıl etkiler?", "Ölçülebilir sınırlar vermek, yanıt uzunluğundaki sapmayı azaltır. Model sınırı tam tutturamayabileceği için SMS, başlık ya da meta açıklama gibi alanlarda çıktıyı bir karakter sayacıyla mutlaka kendiniz ölçün."],
    ["Yanıtı doğrulamak neden gereklidir?", "Dil modelleri yanlış bilgiyi de akıcı ve kendinden emin biçimde yazabilir. Rakamları, tarihleri, mevzuatı ve kaynakları resmî kaynaktan kontrol etmek, hesapları ayrıca yeniden yapmak hatalı bilgiyi kullanma riskini azaltır."],
    ["Kişisel ve gizli veriler prompta yazılmalı mı?", "Yazılmamalıdır. Kimlik numarası, kart bilgisi, şifre, sağlık ve müşteri verileri ile ticari sırlar hizmet sağlayıcının sunucularında saklanabilir. Gerçek veriyle çalışmanız gerekiyorsa önce adları ve numaraları anonimleştirin."],
    ["Markdown biçimli çıktı nasıl istenir?", "Promptun sonuna yanıtı Markdown biçiminde vermesini, başlıklar için ## ve tablolar için Markdown tablo kullanmasını yazmanız yeterlidir. Çıktıyı yapıştırmadan önce bir Markdown önizleme aracında görünümünü kontrol edebilirsiniz."]
  ],
  tools: ["kelime-sayaci", "karakter-sayaci", "markdown-onizleme", "bul-ve-degistir"],
  related: ["yapay-zeka-token-nedir-kac-kelime", "markdown-nedir-nasil-yazilir"],
  sources: [
    ["Kişisel Verileri Koruma Kurumu", "https://www.kvkk.gov.tr/"]
  ]
};
