export default {
  slug: "iban-nedir-kac-haneli",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "IBAN Nedir, Kaç Haneli? IBAN Nasıl Okunur ve Doğruluğu Nasıl Kontrol Edilir",
  pageTitle: "IBAN Nedir, Kaç Haneli? TR IBAN Yapısı ve Doğrulama",
  description: "Türkiye'de IBAN 26 karakterdir: TR, 2 kontrol hanesi, 5 haneli banka kodu, 1 rezerv hane ve 16 haneli hesap numarası. IBAN nasıl okunur, mod 97 kontrolü nasıl işler?",
  keywords: ["iban nedir", "iban kaç haneli", "iban doğrulama", "iban nasıl öğrenilir", "iban'dan banka bulma", "tr iban formatı", "yanlış iban'a para gönderme", "iban kontrol hanesi"],
  lead: "IBAN (Uluslararası Banka Hesap Numarası), bir banka hesabını dünya genelinde tek biçimde tanımlayan koddur ve Türkiye'de <strong>TR ile başlayan 26 karakterden</strong> oluşur: 2 harflik ülke kodu, 2 haneli kontrol numarası, 5 haneli banka kodu, 1 rezerv hane ve 16 haneli hesap numarası. Kontrol haneleri sayesinde yanlış yazılan bir IBAN'ın büyük çoğunluğu daha gönderim yapılmadan yakalanır. Bu sayfada IBAN'ın her bölümünün ne anlama geldiğini, bankanın nasıl anlaşıldığını, doğrulamanın mantığını ve yanlış gönderimde ne olacağını anlatıyoruz.",
  kisaCevap: [
    "Türkiye'de IBAN 26 karakterdir: TR + 24 rakam.",
    "3–4. karakterler kontrol haneleridir; IBAN'ın tamamından hesaplanır ve yazım hatalarını yakalar.",
    "5–9. karakterler bankanın 5 haneli EFT kodudur; bu bölümden IBAN'ın hangi bankaya ait olduğu anlaşılır.",
    "10. karakter rezerv hanedir ve şu an 0'dır; 11–26. karakterler bankanın belirlediği hesap numarasıdır.",
    "Doğrulamada ilk 4 karakter sona taşınır, harfler sayıya çevrilir ve sayının 97'ye bölümünden kalan 1 olmalıdır.",
    "Doğrulama yalnızca biçimin tutarlılığını gösterir; hesap sahibinin kim olduğunu göstermez."
  ],
  figure: {
    alt: "Türkiye IBAN'ının beş bölümü: TR ülke kodu, 33 kontrol hanesi, 00061 banka kodu, 0 rezerv hane ve 16 haneli hesap numarası; altında mod 97 doğrulamasının adımları ve kalan 1 sonucu.",
    caption: "Uluslararası IBAN kayıt belgelerinde Türkiye için yayımlanan örnek IBAN'ın bölümleri. Bu numara biçimi göstermek için kullanılan bir örnektir. Alttaki adımlar, kontrol hanelerinin doğrulanmasını gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">TR IBAN'ı 26 karakter: beş bölüm</text>
  <rect x="20" y="56" width="70" height="56" rx="6" class="p"/><text x="55" y="92" class="lg b mid sf">TR</text>
  <rect x="96" y="56" width="70" height="56" rx="6" class="dgs"/><text x="131" y="92" class="lg b mid">33</text>
  <rect x="172" y="56" width="130" height="56" rx="6" class="ps"/><text x="237" y="92" class="lg b mid">00061</text>
  <rect x="308" y="56" width="44" height="56" rx="6" class="sf sb"/><text x="330" y="92" class="lg b mid">0</text>
  <rect x="358" y="56" width="342" height="56" rx="6" class="oks"/><text x="529" y="92" class="lg b mid">0519786457841326</text>
  <g class="sm mid">
    <text x="55" y="134" class="b">Ülke</text><text x="55" y="150">2 harf</text>
    <text x="131" y="134" class="b dg">Kontrol</text><text x="131" y="150">2 hane</text>
    <text x="237" y="134" class="b p">Banka kodu</text><text x="237" y="150">5 hane</text>
    <text x="330" y="134" class="b">Rezerv</text><text x="330" y="150">1 hane</text>
    <text x="529" y="134" class="b ok">Hesap numarası</text><text x="529" y="150">16 hane</text>
  </g>
  <text x="360" y="192" class="b mid">Kontrol nasıl yapılır? (mod 97)</text>
  <rect x="20" y="206" width="680" height="40" rx="8" class="sf sb"/>
  <text x="36" y="231" class="sm"><tspan class="b">1.</tspan> İlk 4 karakteri sona al: 0006100519786457841326<tspan class="b p">TR33</tspan></text>
  <rect x="20" y="254" width="680" height="40" rx="8" class="sf sb"/>
  <text x="36" y="279" class="sm"><tspan class="b">2.</tspan> Harfleri sayıya çevir (T = 29, R = 27): …1326<tspan class="b p">2927</tspan>33</text>
  <rect x="20" y="302" width="680" height="40" rx="8" class="sf sb"/>
  <text x="36" y="327" class="sm"><tspan class="b">3.</tspan> Parça parça 97'ye böl: kalanlar 18 → 40 → 0 → 1</text>
  <rect x="20" y="352" width="680" height="54" rx="8" class="p"/>
  <text x="360" y="385" class="b mid sf">Son kalan 1 ise IBAN biçimce geçerlidir</text>
</svg>`
  },
  sections: [
    {
      h: "IBAN nedir, ne işe yarar?",
      p: [
        "IBAN, İngilizce International Bank Account Number ifadesinin kısaltmasıdır ve uluslararası standartlarla (ISO 13616) tanımlanmış bir hesap numarası biçimidir. Amaç, para transferlerinde alıcı hesabın tek bir kodla, hatasız ve otomatik olarak tanımlanmasıdır. IBAN'dan önce para göndermek için banka adı, şube kodu ve hesap numarası ayrı ayrı yazılırdı; bu da hatalara ve gecikmelere yol açıyordu.",
        "Türkiye'de IBAN kullanımı 2000'li yıllarda yaygınlaştı ve bugün havale, EFT ve FAST gibi tüm yurt içi transferlerde zorunlu tanımlayıcıdır. Yurt dışından para alırken de IBAN'ın yanında bankanın uluslararası tanıtım kodu (SWIFT/BIC) istenebilir.",
        "IBAN bir hesap numarası olduğu için gizli bir şifre değildir; para almak için karşı tarafla paylaşılması gerekir. Ancak kimlik bilgileriyle birlikte dikkatsizce paylaşılması dolandırıcılık riskini artırabilir; bu konuyu aşağıda ayrıca ele alıyoruz."
      ]
    },
    {
      h: "Türkiye'de IBAN kaç hanelidir? Bölüm bölüm yapı",
      p: [
        "Her ülkenin IBAN uzunluğu farklıdır; Türkiye için uzunluk sabit <strong>26 karakterdir</strong>. İlk iki karakter harf, kalan 24 karakter rakamdır. Basılı belgelerde okunabilirlik için dörderli gruplar hâlinde boşluklu yazılır; ancak transfer ekranlarına boşluksuz girilir."
      ],
      table: {
        head: ["Karakter sırası", "Uzunluk", "Bölüm", "Açıklama"],
        rows: [
          ["1–2", "2", "Ülke kodu", "Türkiye için her zaman TR"],
          ["3–4", "2", "Kontrol haneleri", "IBAN'ın geri kalanından hesaplanan doğrulama numarası"],
          ["5–9", "5", "Banka kodu", "Bankanın EFT sistemindeki 5 haneli kodu"],
          ["10", "1", "Rezerv alan", "İleride kullanılmak üzere ayrılmıştır, şu an 0"],
          ["11–26", "16", "Hesap numarası", "Bankanın kendi sistemine göre belirlediği numara; şube ve müşteri bilgisi içerebilir"]
        ],
        caption: "Toplam 2 + 2 + 5 + 1 + 16 = 26 karakter."
      },
      after: [
        "Hesap numarası bölümünün iç yapısı bankadan bankaya değişir. Bazı bankalar bu 16 hanede şube kodunu ve müşteri numarasını açıkça barındırırken, bazıları kendi iç numaralandırmasını kullanır. Bu yüzden IBAN'dan şube ya da kişi bilgisi çıkarmaya çalışmak güvenilir bir yöntem değildir.",
        "Diğer ülkelerde uzunluk farklıdır: Norveç'te 15, Hollanda'da 18, Almanya ve Birleşik Krallık'ta 22, Fransa ve İtalya'da 27 karakterdir. Yurt dışına para gönderirken alıcının verdiği IBAN'ın uzunluğu bu yüzden Türkiye'dekinden farklı olabilir; bu bir hata işareti değildir. Ancak her ülkede ilk iki karakter ülke kodu, sonraki iki karakter kontrol haneleridir ve mod 97 doğrulaması aynı şekilde işler."
      ]
    },
    {
      h: "IBAN'dan hangi banka olduğu anlaşılır mı?",
      p: [
        "Evet. IBAN'ın 5. ile 9. karakterleri arasındaki 5 haneli bölüm, Türkiye'deki her bankaya özgü EFT banka kodudur. Bu kodlar bankalar arası ödeme sistemlerinde kullanılır ve kamuya açık listelerde yayımlanır. Örneğin yukarıdaki görselde yer alan örnek IBAN'da banka kodu 00061'dir.",
        "Bankanın adını görmek için kodu bu listelerde aramanız ya da [[arac:iban-dogrula|IBAN Doğrulama ve Banka Bulma]] aracını kullanmanız yeterlidir. Araç kontrol hanelerini ve uzunluğu doğrular, banka kodunu ayırıp banka adını gösterir. Hesap sahibini sorgulamaz ve girdiğiniz IBAN'ı hiçbir sunucuya göndermez; işlem tamamen tarayıcınızda yapılır.",
        "Banka birleşmeleri ya da devirleri sonrasında eski kodlar bir süre geçerliliğini koruyabilir. Gönderim ekranında bankanın gösterdiği alıcı banka adı, her zaman son kontrol noktasıdır."
      ]
    },
    {
      h: "IBAN doğruluğu nasıl kontrol edilir? Mod 97 mantığı",
      p: [
        "IBAN'ın 3. ve 4. karakterlerindeki kontrol haneleri, numaranın tamamıyla matematiksel bir ilişki içindedir. Bu ilişki <strong>mod 97</strong> adı verilen bir kalan işlemine dayanır. Doğrulama şu adımlarla yapılır:"
      ],
      ol: [
        "<strong>Uzunluğu ve karakterleri kontrol edin:</strong> Türkiye IBAN'ı tam 26 karakter olmalı, TR ile başlamalı ve kalan karakterler rakam olmalıdır. Boşlukları silin.",
        "<strong>İlk dört karakteri sona taşıyın:</strong> TR33 0006 1005 1978 6457 8413 26 için 0006100519786457841326TR33 elde edilir.",
        "<strong>Harfleri sayıya çevirin:</strong> Standartta A = 10, B = 11 … Z = 35'tir. T = 29, R = 27 olduğundan sonuç 0006100519786457841326292733 olur.",
        "<strong>Sayının 97'ye bölümünden kalanı bulun:</strong> Sayı çok uzun olduğu için parça parça bölünür. İlk 9 hane 000610051'in 97'ye bölümünden kalan 18'dir. Kalanı sonraki hanelerin önüne yazıp devam edilir: 189786457 için kalan 40, 408413262 için kalan 0, son parça 92733 için kalan 1'dir.",
        "<strong>Sonucu yorumlayın:</strong> Kalan 1 ise IBAN biçimce geçerlidir. Kalan başka bir sayıysa en az bir karakter hatalı yazılmıştır."
      ],
      after: [
        "Bu yöntem tek rakamlık yazım hatalarının tamamını ve yan yana iki rakamın yer değiştirmesi gibi sık hataların neredeyse tamamını yakalar. Parça parça kalan almanın mantığını denemek isterseniz [[arac:mod-alma-hesapla|Mod Alma (Kalan Bulma) Hesaplama]] aracıyla her adımı tek tek sağlayabilirsiniz. Kopyaladığınız IBAN'daki boşlukları ve görünmeyen karakterleri temizlemek için [[arac:bosluk-temizle|Fazla Boşlukları Temizleme]] aracı işinizi kolaylaştırır."
      ]
    },
    {
      h: "Doğrulamanın gösterdiği ve göstermediği",
      p: [
        "Mod 97 kontrolünden geçen bir IBAN'ın yalnızca <strong>biçimce tutarlı</strong> olduğu söylenebilir. Bu kontrol aşağıdaki soruların cevabını vermez:"
      ],
      table: {
        head: ["Soru", "Biçim doğrulaması cevaplar mı?", "Nereden öğrenilir?"],
        rows: [
          ["Karakter sayısı ve kontrol haneleri doğru mu?", "Evet", "IBAN doğrulama aracı"],
          ["Hangi bankaya ait?", "Evet (banka kodundan)", "Banka kodu listesi, doğrulama aracı"],
          ["Böyle bir hesap gerçekten açık mı?", "Hayır", "Gönderen banka, işlem sırasında"],
          ["Hesap kime ait?", "Hayır", "Yalnızca hesap sahibi ve bankası"],
          ["Hesap güvenilir bir kişiye mi ait?", "Hayır", "Karşı tarafı başka kanallardan doğrulayarak"]
        ]
      },
      after: [
        "Bu nedenle IBAN'ı doğrulamak bir alışverişin ya da kiralamanın güvenli olduğunu göstermez. Tanımadığınız birine para göndermeden önce alıcının adının bankanızın gösterdiği adla uyuştuğunu kontrol edin ve karşı tarafın kimliğini bağımsız bir kanaldan teyit edin."
      ]
    },
    {
      h: "Yanlış IBAN'a para gönderilirse ne olur?",
      p: [
        "IBAN'da tek bir rakam yanlışsa kontrol haneleri tutmayacağı için bankacılık uygulamaları işlemi büyük olasılıkla başlatmaz. Asıl risk, biçimce geçerli ama başka bir kişiye ait bir IBAN'ın girilmesidir; örneğin yanlış kişiden kopyalanan ya da eski bir mesajda kalan bir numara. Bu durumda para o hesaba gider.",
        "Bankaların çoğu gönderim öncesinde alıcı adını girmenizi ister ya da hesap sahibinin adını kısmen gösterir. Ad ile IBAN uyuşmazlığında işlem iade edilebilir; ancak bu kontrolün kapsamı bankadan bankaya ve işlem türüne göre değişir."
      ],
      ol: [
        "Hatayı fark ettiğiniz anda kendi bankanızı arayın ve işlem bilgilerini (tarih, saat, tutar, IBAN) iletin.",
        "Bankanız alıcı bankayla iletişime geçerek iade talebinde bulunur; para alıcının hesabına geçmişse iade çoğunlukla hesap sahibinin onayına bağlıdır.",
        "Alıcı iadeyi kabul etmezse sebepsiz zenginleşme hükümlerine dayanarak hukuki yollara başvurabilirsiniz; bu aşamada bir hukukçudan destek almak yararlı olur.",
        "Dolandırıcılık şüphesi varsa vakit kaybetmeden kolluk kuvvetlerine ya da Cumhuriyet savcılığına başvurun."
      ]
    },
    {
      h: "IBAN'ımı nasıl öğrenirim? Paylaşmak güvenli mi?",
      p: [
        "Kendi IBAN'ınızı bankanızın mobil uygulamasında ya da internet şubesinde hesap ayrıntıları bölümünde görebilir, kopyalayabilir ve paylaşabilirsiniz. Banka kartınızın üzerinde ya da hesap cüzdanınızda yazmıyorsa şubeden, ATM'den ya da müşteri hizmetlerinden de öğrenebilirsiniz. Bir hesaba ait IBAN, hesap kapanmadıkça değişmez.",
        "IBAN tek başına hesabınızdan para çekilmesine izin vermez; para almak için paylaşılması zaten gereklidir. Yine de bazı durumlarda dikkatli olmak gerekir: hesabınıza tanımadığınız biri para gönderip \"yanlışlıkla gönderdim\" diyerek başka bir hesaba iade isterse, iadeyi yalnızca bankanız aracılığıyla, gönderen hesaba yapın. Hesabınızı başkasının para trafiğine kullandırmak ise ciddi hukuki sonuçlar doğurabilir. IBAN'ı kimlik fotokopisi, doğum tarihi gibi kişisel verilerle birlikte paylaşmaktan kaçının."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>O ile 0'ı karıştırmak:</strong> TR'den sonra yalnızca rakam gelir; büyük O harfi yazılmamalıdır.",
        "<strong>Boşluklu ya da eksik kopyalamak:</strong> Mesajlardan kopyalanan IBAN'larda sondaki rakamlar kesilebilir; 26 karakteri sayın.",
        "<strong>Eski IBAN kullanmak:</strong> Kapanmış ya da başka bankaya taşınmış hesaplar için eski IBAN'a gönderilen para iade edilir ya da gecikir.",
        "<strong>Doğrulamayı kimlik kontrolü sanmak:</strong> Geçerli bir IBAN, alıcının güvenilir olduğunu göstermez.",
        "<strong>IBAN üretmeye çalışmak:</strong> Rastgele numaralarla deneme yapmak anlamsızdır ve kötüye kullanım şüphesi doğurur; doğru IBAN yalnızca hesap sahibinden ya da bankasından alınır."
      ],
      after: [
        "Fatura ve ödeme kayıtlarında vergi numarasını da kontrol etmeniz gerekiyorsa [[bilgi:vergi-numarasi-nasil-ogrenilir|vergi numarası nasıl öğrenilir]] yazısına göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["IBAN nedir?", "IBAN, uluslararası standartla tanımlanmış banka hesap numarasıdır. Ülke kodu, kontrol haneleri, banka kodu ve hesap numarasını tek bir kodda birleştirir. Havale, EFT ve FAST gibi transferlerde alıcı hesabı hatasız tanımlamak için kullanılır."],
    ["Türkiye'de IBAN kaç hanelidir?", "Türkiye'de IBAN 26 karakterdir. İlk iki karakter TR harfleridir, ardından 24 rakam gelir: 2 kontrol hanesi, 5 haneli banka kodu, 1 rezerv hane ve 16 haneli hesap numarası."],
    ["IBAN'daki rakamlar ne anlama gelir?", "TR'den sonraki iki rakam kontrol haneleridir. Sonraki beş rakam bankanın EFT kodunu, onuncu karakter şu an sıfır olan rezerv alanı, son on altı rakam ise bankanın belirlediği hesap numarasını gösterir."],
    ["IBAN'dan hangi banka olduğu anlaşılır mı?", "Evet, IBAN'ın beşinci ile dokuzuncu karakterleri arasındaki beş haneli bölüm bankanın EFT kodudur. Bu kod kamuya açık banka listelerinden ya da IBAN doğrulama aracından bakılarak bankanın adı öğrenilebilir."],
    ["IBAN doğruluğu nasıl kontrol edilir?", "İlk dört karakter sona taşınır, harfler standarttaki sayılara çevrilir ve oluşan sayının 97'ye bölümünden kalan bulunur. Kalan 1 ise IBAN biçimce geçerlidir; bu kontrol hesap sahibini göstermez."],
    ["Yanlış IBAN'a para gönderilirse ne olur?", "Kontrol haneleri tutmayan IBAN'a genellikle işlem yapılamaz. Geçerli ama yanlış kişiye ait bir IBAN'a gönderilen para ise o hesaba geçer; hemen bankanızı arayarak iade talebi başlatmanız gerekir ve iade çoğunlukla alıcının onayına bağlıdır."],
    ["IBAN'ımı nasıl öğrenirim?", "Bankanızın mobil uygulamasında ya da internet şubesinde hesap ayrıntıları bölümünde IBAN'ınız görünür ve kopyalanabilir. Ayrıca şubeden, ATM'den ya da müşteri hizmetlerini arayarak da öğrenebilirsiniz."],
    ["IBAN paylaşmak güvenli mi?", "IBAN tek başına hesabınızdan para çekilmesine izin vermez ve para almak için paylaşılması gerekir. Ancak kimlik bilgileriyle birlikte paylaşmaktan kaçının, yanlışlıkla gönderildiği söylenen paraları yalnızca bankanız aracılığıyla iade edin."]
  ],
  tools: ["iban-dogrula", "mod-alma-hesapla", "bosluk-temizle"],
  related: ["vergi-numarasi-nasil-ogrenilir", "tc-kimlik-numarasi-algoritmasi"],
  sources: [
    ["Türkiye Cumhuriyet Merkez Bankası – Ödeme sistemleri", "https://www.tcmb.gov.tr/"],
    ["ISO – ISO 13616 IBAN standardı", "https://www.iso.org/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"]
  ]
};
