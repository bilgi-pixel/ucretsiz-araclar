export default {
  slug: "yapay-zeka-token-nedir-kac-kelime",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Yapay Zekâda Token Nedir? 1 Token Kaç Kelime, Türkçe Neden Fazla Tutar",
  pageTitle: "Yapay Zekâda Token Nedir? 1 Token Kaç Kelime, Türkçede Kaç Token",
  description: "Token, dil modelinin metni böldüğü parçadır. İngilizcede 1 token yaklaşık 0,75 kelime; Türkçede bir kelime yaklaşık 1,5–2,5 token. Bağlam penceresi, hesap.",
  keywords: ["token nedir yapay zeka", "1 token kaç kelime", "bağlam penceresi nedir", "türkçe token sayısı", "prompt uzunluğu", "yapay zeka karakter sınırı", "token hesaplama", "token ücretlendirmesi"],
  lead: "Yapay zekâ dil modellerinde <strong>token, modelin metni işlemek için böldüğü en küçük parçadır</strong>; bir token bazen bütün bir kelime, bazen bir kelimenin eki ya da tek bir noktalama işaretidir. İngilizce metinde 1 token ortalama 4 karakter, yani yaklaşık 0,75 kelime eder. Türkçe eklemeli bir dil olduğu için kelimeler daha çok parçaya bölünür ve bir Türkçe kelime yaklaşık 1,5–2,5 token tutar. Bu sayfada token kavramını, Türkçenin neden fazla token harcadığını, bağlam penceresini, kelime sayısından token tahmini yapmayı ve ücretlendirmenin mantığını bulacaksınız.",
  kisaCevap: [
    "Token, dil modelinin sözlüğündeki bir metin parçasıdır: kelime, kelime parçası, ek, rakam ya da işaret olabilir.",
    "İngilizcede kaba kural: 1 token ≈ 4 karakter ≈ 0,75 kelime; 1.000 kelime ≈ 1.300–1.400 token.",
    "Türkçede bir kelime yaklaşık 1,5–2,5 token tutar; 1.000 Türkçe kelime kabaca 1.500–2.500 token eder.",
    "Bağlam penceresi, modelin tek seferde dikkate alabildiği toplam token sınırıdır; girdi ve çıktı birlikte sayılır.",
    "Ücretli kullanımda girdi ve çıktı tokenları genellikle ayrı fiyatlanır; çıktı tokenı çoğu zaman daha pahalıdır.",
    "Kesin token sayısı modele özgü bölme yöntemine bağlıdır; kelime sayısından yapılan hesap yalnızca tahmindir."
  ],
  figure: {
    alt: "Aynı cümlenin İngilizce ve Türkçe hâlinin tokenlara bölünmesi: İngilizce \"I could not come\" dört token, Türkçe \"gelemedim\" tek kelime ama üç token; altta 1.000 kelimelik metnin token karşılıkları.",
    caption: "Gösterim temsilîdir; her model metni kendi sözlüğüne göre farklı yerlerden böler. Ortak eğilim, eklemeli dillerde tek kelimenin birden fazla tokena ayrılmasıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Metin tokenlara nasıl bölünür? (temsilî)</text>
  <text x="20" y="70" class="b">İngilizce: 4 kelime → yaklaşık 4 token</text>
  <rect x="20" y="82" width="60" height="40" rx="6" class="ps"/><text x="50" y="108" class="mid">I</text>
  <rect x="86" y="82" width="100" height="40" rx="6" class="ps"/><text x="136" y="108" class="mid">could</text>
  <rect x="192" y="82" width="80" height="40" rx="6" class="ps"/><text x="232" y="108" class="mid">not</text>
  <rect x="278" y="82" width="100" height="40" rx="6" class="ps"/><text x="328" y="108" class="mid">come</text>
  <text x="20" y="168" class="b">Türkçe: 1 kelime → yaklaşık 3 token</text>
  <rect x="20" y="180" width="80" height="40" rx="6" class="oks"/><text x="60" y="206" class="mid">gel</text>
  <rect x="106" y="180" width="80" height="40" rx="6" class="oks"/><text x="146" y="206" class="mid">eme</text>
  <rect x="192" y="180" width="80" height="40" rx="6" class="oks"/><text x="232" y="206" class="mid">dim</text>
  <text x="300" y="206" class="sm mu">aynı anlam, daha az kelime, benzer token</text>
  <rect x="20" y="250" width="680" height="150" rx="8" class="sf sb"/>
  <text x="40" y="280" class="b">1.000 kelimelik metin kaç token? (yaklaşık)</text>
  <text x="40" y="314">İngilizce</text>
  <rect x="160" y="298" width="182" height="24" rx="4" class="ps"/>
  <text x="352" y="316" class="sm b">≈ 1.300–1.400</text>
  <text x="40" y="354">Türkçe</text>
  <rect x="160" y="338" width="210" height="24" rx="4" class="ok"/>
  <rect x="370" y="338" width="140" height="24" rx="4" class="oks"/>
  <text x="520" y="356" class="sm b">≈ 1.500–2.500</text>
  <text x="40" y="388" class="sm t2">Kesin değer modelin bölme yöntemine bağlıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Yapay zekâ modellerinde token nedir?",
      p: [
        "Büyük dil modelleri metni harf harf ya da kelime kelime değil, <strong>token</strong> adı verilen parçalar hâlinde işler. Model eğitilmeden önce çok büyük bir metin derleminden bir \"token sözlüğü\" çıkarılır. Sık geçen kelimeler bu sözlükte tek parça olarak yer alır; seyrek kelimeler, ekler ve yabancı adlar ise daha küçük parçalara ayrılır. Sözlükte on binlerce ile birkaç yüz bin arasında parça bulunabilir.",
        "Bir cümleyi modele verdiğinizde önce bu sözlüğe göre parçalara bölünür, her parça bir sayıya çevrilir ve model bu sayı dizisi üzerinde çalışır. Modelin ürettiği cevap da token token oluşturulur: model her adımda bir sonraki en olası tokenı seçer, ekler ve devam eder. Bu yüzden hem okuma hem yazma kapasitesi token cinsinden ölçülür.",
        "Token kavramı, kelime sayısıyla doğrudan aynı şey değildir. Boşluklar, noktalama işaretleri, rakamlar, satır sonları ve emojiler de token harcar. Uzun bir sayı birkaç tokena, bir emoji birden fazla tokena bölünebilir."
      ]
    },
    {
      h: "1 token yaklaşık kaç kelime veya karakterdir?",
      p: [
        "İngilizce metinlerde yaygın kabul gören kaba kural, 1 tokenın ortalama 4 karaktere, yani yaklaşık üç çeyrek kelimeye denk geldiğidir. Başka bir deyişle 100 token yaklaşık 75 İngilizce kelime, 1.000 İngilizce kelime yaklaşık 1.300–1.400 token eder. Bu oran modelden modele biraz değişir ama İngilizce için oldukça istikrarlıdır.",
        "Türkçede oran farklıdır. Eklemeli yapı nedeniyle bir Türkçe kelime ortalama olarak İngilizce bir kelimeden daha uzundur ve sözlükte bütün hâliyle bulunma olasılığı daha düşüktür. Güncel modellerde bir Türkçe kelimenin <strong>yaklaşık 1,5–2,5 token</strong> tuttuğu söylenebilir; teknik terimler, özel adlar ve uzun ekli kelimeler bu aralığın üstüne çıkabilir. Bu değerler yaklaşıktır ve kullanılan modele göre değişir."
      ],
      table: {
        head: ["Metin", "Kelime", "Tahmini token (İngilizce)", "Tahmini token (Türkçe)"],
        rows: [
          ["Kısa soru", "20", "≈ 27", "≈ 30–50"],
          ["Bir paragraf", "120", "≈ 160", "≈ 180–300"],
          ["Bir sayfa (12 punto)", "300", "≈ 400", "≈ 450–750"],
          ["Uzun makale", "2.000", "≈ 2.700", "≈ 3.000–5.000"],
          ["300 sayfalık kitap", "75.000", "≈ 100.000", "≈ 110.000–190.000"]
        ],
        caption: "İngilizce için kelime ÷ 0,75, Türkçe için kelime × 1,5–2,5 alınmıştır. Gerçek değer metnin türüne ve modele göre değişir."
      }
    },
    {
      h: "Türkçe metin neden daha fazla token tutar?",
      p: [
        "Türkçe, kelime köküne art arda ekler getirerek anlam kuran bir dildir. \"Gelemediğimizden\" tek kelimedir ama İngilizcede \"because we could not come\" gibi beş kelimelik bir ifadeye karşılık gelir. Token sözlüğü ağırlıklı olarak İngilizce metinlerden oluşturulduğunda, İngilizcedeki \"could\", \"not\", \"come\" gibi sık kelimeler tek token olur; Türkçedeki \"-emedi-\", \"-ğimiz-\", \"-den\" gibi ek kalıpları ise ya ayrı parçalara ya da daha da küçük harf gruplarına bölünür.",
        "Sonuçta aynı anlamı taşıyan Türkçe metin daha az kelimeyle yazılsa bile daha fazla token harcayabilir. Türkçe karakterler de etkilidir: ç, ğ, ı, ö, ş, ü harfleri bilgisayarda UTF-8 ile 2 bayt olarak kodlanır ve bazı sözlüklerde ayrı parçalar olarak işlenebilir. Bu kodlamanın ayrıntısını [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısında bulabilirsiniz.",
        "Çok dilli verilerle eğitilen yeni modellerde bu fark eskisine göre azalmıştır, ama tamamen kapanmamıştır. Pratik sonuç şudur: Türkçe çalışırken token sınırlarına İngilizceye göre daha erken ulaşırsınız."
      ]
    },
    {
      h: "Bağlam penceresi ne demektir?",
      p: [
        "Bağlam penceresi (context window), modelin tek bir işlemde dikkate alabildiği toplam token sayısıdır. Bu sınırın içine sizin yazdığınız istem, sohbetin önceki mesajları, yüklediğiniz belgeler, sistem talimatları ve modelin üreteceği cevap birlikte girer. Pencere dolduğunda en eski mesajlar dikkate alınmamaya başlar ya da yeni girdi kabul edilmez.",
        "Günümüzde bağlam pencereleri modele göre onbinlerce tokendan bir milyon tokena kadar geniş bir aralıkta değişir. Ancak pencerenin büyük olması, içindeki her bilgiye aynı dikkatle bakıldığı anlamına gelmez. Çok uzun belgelerde ortalarda kalan ayrıntılar daha kolay gözden kaçabilir; önemli talimatları istemin başına ya da sonuna koymak bu yüzden faydalıdır."
      ],
      ul: [
        "<strong>Girdi tokenları:</strong> Sizin gönderdiğiniz her şey: soru, belge, önceki mesajlar.",
        "<strong>Çıktı tokenları:</strong> Modelin ürettiği cevap; çoğu modelde ayrı bir üst sınırı vardır.",
        "<strong>Sohbet geçmişi:</strong> Uzun sohbetlerde her yeni mesajla birlikte önceki mesajlar da yeniden pencereye girer."
      ]
    },
    {
      h: "Uzun bir belge sohbete neden sığmayabilir?",
      p: [
        "Belgenizin sayfa sayısı küçük görünse de token karşılığı beklediğinizden büyük olabilir. 100 sayfalık Türkçe bir rapor, sayfa başına 300 kelimeyle yaklaşık 30.000 kelime eder; bu da kabaca 45.000–75.000 token demektir. Tablolar, dipnotlar ve kaynakçalar sayıları ve işaretleri yoğun içerdiği için token sayısını daha da artırır.",
        "PDF ya da taranmış belgelerde durum daha karmaşıktır. Metin katmanından çıkarılan yazı, sayfa numaraları, üst ve alt bilgiler, tekrar eden başlıklar gibi gereksiz parçalar da içerir. Belgeyi bölümlere ayırmak, yalnızca gerekli bölümleri göndermek ya da önce düz metne çevirip temizlemek sınırın içinde kalmanızı sağlar. Bir metnin kaç sayfa tuttuğunu tahmin etmek için [[bilgi:kac-kelime-kac-sayfa-eder|kaç kelime kaç sayfa eder]] yazısındaki hesap kullanılabilir."
      ]
    },
    {
      h: "Token sayısı kelime sayısından nasıl tahmin edilir?",
      p: [
        "Kesin token sayısını yalnızca ilgili modelin bölme aracı verir. Günlük kullanım için ise kelime ya da karakter sayısından iyi bir tahmin yapılabilir. Önce metninizin kelime ve karakter sayısını bulun; [[arac:kelime-sayaci|Kelime Sayacı]] ve [[arac:karakter-sayaci|Karakter Sayacı]] araçları bunu metninizi hiçbir yere göndermeden tarayıcıda yapar."
      ],
      formula: "İngilizce: token ≈ kelime ÷ 0,75 ≈ karakter ÷ 4\nTürkçe: token ≈ kelime × 1,5 (alt tahmin) … kelime × 2,5 (üst tahmin)\nGüvenli plan: Türkçe metinde kelime × 2 alın, %20 pay bırakın",
      ol: [
        "Bir rapor özetini yapay zekâya göndereceksiniz; kelime sayacı 2.400 kelime gösteriyor.",
        "Türkçe için orta tahmin: 2.400 × 2 = 4.800 token.",
        "Aralık: 2.400 × 1,5 = 3.600 ile 2.400 × 2,5 = 6.000 token arası.",
        "Modelden yaklaşık 600 kelimelik bir özet isteyeceksiniz: 600 × 2 = 1.200 çıktı tokenı.",
        "Toplam ihtiyaç yaklaşık 4.800 + 1.200 = 6.000 token; %20 payla 7.200 token planlayın."
      ]
    },
    {
      h: "Kısa ve net istem yazmanın faydası nedir?",
      p: [
        "İstem (prompt), modele verdiğiniz talimattır. Kısa ve net bir istem hem daha az token harcar hem de modelin asıl isteğinizi anlamasını kolaylaştırır. Uzun girişler, tekrarlanan nezaket cümleleri ve gereksiz bağlam, pencereyi doldurur ve önemli talimatın dikkatten kaçmasına yol açabilir.",
        "Kısa yazmak, eksik yazmak demek değildir. Görevi, hedef kitleyi, istediğiniz biçimi ve uzunluğu açıkça belirtmek sonucu iyileştirir. Gereksiz kısmı atmak için metni kendi gözünüzle sadeleştirebilir, belirli bir karakter sınırına indirmeniz gerekiyorsa [[arac:metin-kisalt|Metin Kısaltma]] aracını kullanabilirsiniz."
      ],
      ul: [
        "Görevi ilk cümlede söyleyin: \"Aşağıdaki metni 150 kelimede özetle.\"",
        "Biçimi belirtin: madde listesi, tablo, e-posta taslağı gibi.",
        "Belgenin yalnızca gerekli bölümünü ekleyin; kapak, içindekiler ve kaynakçayı çıkarın.",
        "Uzun sohbetlerde konu değiştiğinde yeni bir sohbet başlatın; eski mesajlar boşuna token harcamasın.",
        "Kişisel veri, şifre ya da gizli kurum bilgisini isteme yazmayın; metni göndermeden önce bu bilgileri çıkarın."
      ]
    },
    {
      h: "Token ücretlendirmesi nasıl işler?",
      p: [
        "Yapay zekâ hizmetlerinin geliştirici arayüzlerinde (API) ücretlendirme genellikle milyon token başına belirlenir. Girdi tokenları ve çıktı tokenları ayrı fiyatlandırılır; modelin cevap üretmesi daha fazla hesaplama gerektirdiği için çıktı tokenı çoğu zaman girdi tokenından birkaç kat pahalıdır. Daha büyük ve yetenekli modeller, küçük modellere göre token başına daha yüksek fiyatlıdır.",
        "Hesap mantığı basittir: toplam ücret = (girdi tokenı × girdi birim fiyatı) + (çıktı tokenı × çıktı birim fiyatı). Fiyatlar hizmetten hizmete ve zamanla değiştiği için burada bir tutar vermiyoruz; kullandığınız hizmetin güncel fiyat sayfasını esas alın. Türkçe çalışıyorsanız aynı iş için token sayısının daha yüksek çıkacağını bütçenize yansıtın.",
        "Abonelikle kullanılan sohbet uygulamalarında ise doğrudan token ücreti ödenmez; bunun yerine belirli bir süre içinde gönderebileceğiniz mesaj ya da işlem miktarına sınır konur. Bu sınırlar da arka planda büyük ölçüde token tüketimine göre belirlenir."
      ]
    }
  ],
  faq: [
    ["Yapay zekâ modellerinde token nedir?", "Token, dil modelinin metni işlemek için böldüğü parçadır. Sık kelimeler tek token, seyrek kelimeler, ekler, rakamlar ve işaretler ise bir ya da birden fazla parça olarak işlenir; model hem okumayı hem yazmayı token token yapar."],
    ["1 token yaklaşık kaç kelime veya karakterdir?", "İngilizce metinde 1 token ortalama 4 karakter, yani yaklaşık 0,75 kelimedir. Türkçede ise bir kelime yaklaşık 1,5–2,5 token tutar; kesin değer kullanılan modele göre değişir."],
    ["Türkçe metin neden daha fazla token tutar?", "Türkçe eklemeli bir dildir; tek kelime birçok ek taşır ve token sözlüklerinde bütün hâliyle bulunma olasılığı düşüktür. Kelime parçalara bölündüğü için aynı anlam daha fazla tokenla ifade edilir."],
    ["Bağlam penceresi ne demektir?", "Bağlam penceresi, modelin tek seferde dikkate alabildiği toplam token sınırıdır. İstem, sohbet geçmişi, eklenen belgeler ve modelin cevabı bu sınırın içinde birlikte sayılır."],
    ["Uzun bir belge sohbete neden sığmayabilir?", "Yüz sayfalık Türkçe bir rapor kabaca 45.000–75.000 token edebilir; tablolar ve dipnotlar bu sayıyı artırır. Belgeyi bölümlere ayırmak ve gereksiz kısımları çıkarmak sınırın içinde kalmayı sağlar."],
    ["Token sayısı kelime sayısından nasıl tahmin edilir?", "İngilizcede kelime sayısını 0,75'e bölerek, Türkçede kelime sayısını yaklaşık 2 ile çarparak tahmin yapabilirsiniz. Güvenli planlama için yüzde yirmi pay bırakmak ve modelin cevabını da hesaba katmak gerekir."],
    ["Kısa ve net istem yazmanın faydası nedir?", "Kısa ve net istem daha az token harcar, bağlam penceresini gereksiz doldurmaz ve modelin asıl görevi doğru anlamasını kolaylaştırır. Görev, biçim ve uzunluğu açıkça belirtmek sonucu iyileştirir."],
    ["Token ücretlendirmesi nasıl işler?", "Geliştirici arayüzlerinde ücret genellikle milyon token başına belirlenir ve girdi ile çıktı tokenları ayrı fiyatlanır. Çıktı tokenı çoğu zaman daha pahalıdır; güncel fiyat için hizmetin kendi sayfasına bakın."],
    ["Boşluk ve noktalama işaretleri de token sayılır mı?", "Evet. Boşluklar çoğu zaman bir sonraki kelimeyle birlikte tek parçaya dahil edilir, noktalama işaretleri, satır sonları, rakamlar ve emojiler ise ayrı tokenlar olarak sayılabilir."]
  ],
  tools: ["kelime-sayaci", "karakter-sayaci", "metin-kisalt"],
  related: ["kac-kelime-kac-sayfa-eder", "ascii-unicode-utf8-farki", "dakikada-kac-kelime-okunur", "json-nedir-nasil-okunur"]
};
