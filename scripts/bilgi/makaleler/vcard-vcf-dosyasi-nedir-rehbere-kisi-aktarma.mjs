export default {
  slug: "vcard-vcf-dosyasi-nedir-rehbere-kisi-aktarma",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "vCard (.vcf) Dosyası Nedir? Rehbere Kişi Aktarma ve QR Kartvizit",
  pageTitle: "vCard (.vcf) Dosyası Nedir? Rehbere Kişi Aktarma ve QR Kod",
  description: "vCard (.vcf), kişi bilgilerini telefon rehberine aktarılabilir metin olarak saklayan standart dosyadır. Alanlar, Türkçe karakter, numara biçimi ve QR kartvizit.",
  keywords: ["vcf dosyası nedir", "vcard nedir", "vcf nasıl açılır", "rehber aktarma vcf", "android iphone rehber taşıma", "vcard qr kod", "dijital kartvizit", "vcf türkçe karakter", "birden çok kişi vcf"],
  lead: "vCard, ad, telefon, e-posta, şirket ve adres gibi kişi bilgilerini tüm telefonların ve e-posta programlarının anlayacağı ortak bir metin biçiminde saklayan standarttır; dosya uzantısı <strong>.vcf</strong>'dir. Bir VCF dosyasını telefonda açtığınızda rehber uygulaması \"kişiyi ekle\" seçeneği sunar; içinde yüzlerce kişi bulunan tek bir VCF ile tüm rehberinizi bir cihazdan diğerine taşıyabilirsiniz. Aynı metin bir QR koda yerleştirildiğinde kartvizitinizi okutan kişi bilgilerinizi tek dokunuşla kaydeder. Bu sayfada dosyanın yapısını, sürümlerini, Türkçe karakter sorununu ve telefon numarasının doğru yazımını anlatıyoruz.",
  kisaCevap: [
    "VCF dosyası düz metindir; her kişi BEGIN:VCARD satırıyla başlar, END:VCARD satırıyla biter.",
    "Yaygın sürümler 2.1, 3.0 (RFC 2426) ve 4.0'dır (RFC 6350); 4.0 sürümünde UTF-8 kodlama zorunludur.",
    "Temel alanlar: FN (görünen ad), N (soyad;ad), TEL (telefon), EMAIL, ORG (şirket), TITLE (ünvan), ADR (adres), URL.",
    "Tek bir VCF dosyasında art arda birden çok kişi bulunabilir; rehber dışa aktarma bu yolla çalışır.",
    "Türkçe karakterlerin bozulması çoğunlukla dosyanın UTF-8 dışında bir kodlamayla kaydedilmesinden kaynaklanır.",
    "Telefon numarasını uluslararası biçimde (+90 ile) yazmak, numaranın yurt dışında ve her cihazda doğru aranmasını sağlar."
  ],
  figure: {
    alt: "Bir vCard dosyasının satır satır yapısı: BEGIN, VERSION, N, FN, ORG, TEL, EMAIL ve END satırları. Sağda aynı metnin QR koda dönüşüp telefon rehberinde kişi kartı olarak açılması.",
    caption: "Soldaki metin, uydurma bir kişiye ait vCard 3.0 kaydıdır. Aynı metin ister .vcf dosyası olarak gönderilsin ister QR koda yerleştirilsin, telefonun rehber uygulaması onu aynı kişi kartına dönüştürür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Bir vCard kaydının yolculuğu</text>
  <rect x="20" y="46" width="330" height="300" rx="10" class="sf sb"/>
  <text x="36" y="70" class="b">ornek.vcf (metin)</text>
  <g class="sm">
    <rect x="30" y="82" width="310" height="22" rx="4" class="ps"/><text x="38" y="98" class="b">BEGIN:VCARD</text>
    <text x="38" y="124">VERSION:3.0</text>
    <text x="38" y="148">N:Demir;Elif;;;</text>
    <text x="38" y="172">FN:Elif Demir</text>
    <text x="38" y="196">ORG:Örnek Ajans</text>
    <text x="38" y="220">TITLE:Satış Sorumlusu</text>
    <text x="38" y="244">TEL;TYPE=CELL:+905550000000</text>
    <text x="38" y="268">EMAIL:elif@ornek.test</text>
    <rect x="30" y="280" width="310" height="22" rx="4" class="ps"/><text x="38" y="296" class="b">END:VCARD</text>
  </g>
  <text x="36" y="330" class="sm mu">Uydurma kişi ve numara</text>
  <line x1="352" y1="140" x2="400" y2="140" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="352" y1="260" x2="400" y2="260" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="405" y="80" width="130" height="120" rx="10" class="sf sb"/>
  <g class="p">
    <rect x="420" y="95" width="30" height="30"/><rect x="490" y="95" width="30" height="30"/><rect x="420" y="155" width="30" height="30"/>
    <rect x="460" y="105" width="10" height="10"/><rect x="470" y="135" width="10" height="10"/><rect x="460" y="155" width="10" height="20"/>
    <rect x="490" y="145" width="10" height="10"/><rect x="505" y="165" width="15" height="10"/>
  </g>
  <text x="470" y="220" class="sm mid b">QR kartvizit</text>
  <rect x="405" y="232" width="130" height="56" rx="10" class="sf sb"/>
  <text x="470" y="256" class="sm mid b">.vcf eki</text>
  <text x="470" y="276" class="sm mid">e-posta, mesaj</text>
  <line x1="537" y1="140" x2="568" y2="190" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="537" y1="260" x2="568" y2="220" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="572" y="110" width="128" height="200" rx="16" class="oks"/>
  <circle cx="636" cy="160" r="24" class="sf"/>
  <text x="636" y="167" class="mid b">ED</text>
  <text x="636" y="210" class="sm mid b">Elif Demir</text>
  <text x="636" y="230" class="sm mid">Örnek Ajans</text>
  <text x="636" y="258" class="sm mid ok b">Kişiyi ekle</text>
  <rect x="20" y="360" width="680" height="46" rx="8" class="ps"/>
  <text x="360" y="389" class="sm mid">Bir dosyada birden çok kişi: BEGIN:VCARD … END:VCARD blokları art arda yazılır.</text>
</svg>`
  },
  sections: [
    {
      h: "vCard (.vcf) dosyası nedir?",
      p: [
        "vCard, elektronik kartvizit için geliştirilmiş açık bir standarttır. Kâğıt kartvizitte ne varsa, yani ad, ünvan, şirket, telefon, e-posta, adres ve web sitesi, vCard'da da bulunur; ama bilgiler bir makinenin okuyabileceği düzenli satırlar hâlinde yazılır. Dosyaya kaydedildiğinde uzantısı <strong>.vcf</strong> (vCard File) olur.",
        "VCF düz metin olduğu için not defteriyle açıp okuyabilirsiniz. Her kişi <code>BEGIN:VCARD</code> satırıyla başlar ve <code>END:VCARD</code> satırıyla biter. Aradaki her satır bir alanı tanımlar: iki noktanın solunda alan adı ve varsa parametreleri, sağında değer bulunur. Örneğin <code>TEL;TYPE=CELL:+905550000000</code> satırı bir cep telefonu numarası tanımlar.",
        "Biçim, telefon üreticilerinden ve işletim sistemlerinden bağımsızdır. Bu nedenle Android, iOS, masaüstü e-posta programları ve çevrim içi rehber hizmetleri aynı dosyayı tanır. Rehber aktarımı, e-posta imzasına kartvizit ekleme ve QR kartvizit bu ortak dil sayesinde mümkündür."
      ]
    },
    {
      h: "VCF dosyasında hangi alanlar bulunur?",
      table: {
        head: ["Alan", "Anlamı", "Örnek (uydurma)"],
        rows: [
          ["VERSION", "vCard sürümü (zorunlu)", "VERSION:3.0"],
          ["FN", "Görünen tam ad (3.0 ve 4.0'da zorunlu)", "FN:Elif Demir"],
          ["N", "Yapılandırılmış ad: soyad;ad;ikinci ad;ön ek;son ek", "N:Demir;Elif;;;"],
          ["ORG", "Kurum ya da şirket", "ORG:Örnek Ajans"],
          ["TITLE", "Ünvan, görev", "TITLE:Satış Sorumlusu"],
          ["TEL", "Telefon; TYPE ile cep, iş, ev", "TEL;TYPE=WORK:+903120000000"],
          ["EMAIL", "E-posta adresi", "EMAIL:elif@ornek.test"],
          ["ADR", "Adres: posta kutusu;ek;sokak;şehir;bölge;posta kodu;ülke", "ADR;TYPE=WORK:;;Atatürk Cad. 1;Ankara;;06000;Türkiye"],
          ["URL", "Web sitesi", "URL:ornek.test"],
          ["NOTE", "Serbest not", "NOTE:Fuar görüşmesi"],
          ["PHOTO", "Fotoğraf (gömülü ya da bağlantı)", "Dosyayı büyütür"]
        ],
        caption: "Örnekteki ad, numara ve adresler uydurmadır. Noktalı virgülle ayrılan alanlarda boş kısımlar yine noktalı virgülle korunur."
      },
      after: [
        "N alanının sırası sık karıştırılır: önce <strong>soyad</strong>, sonra ad gelir. Bu alan yanlış doldurulursa rehberde kişi \"Elif Demir\" yerine \"Demir Elif\" olarak sıralanabilir. FN alanı ise ekranda görünecek adı olduğu gibi tutar. Virgül, noktalı virgül ve ters eğik çizgi değerin içinde geçecekse önüne ters eğik çizgi konarak kaçırılır; bu kural için [[bilgi:kacis-karakteri-nedir-n-t-ters-egik-cizgi|kaçış karakteri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "vCard sürümleri: 2.1, 3.0 ve 4.0 farkı",
      table: {
        head: ["Sürüm", "Yıl / belge", "Karakter kodlaması", "Not"],
        rows: [
          ["2.1", "1996, sektör belgesi", "Varsayılan ASCII; CHARSET parametresiyle başka kodlama", "Eski telefonlar; Türkçe için CHARSET=UTF-8 gerekir"],
          ["3.0", "1998, RFC 2426", "Metin için kodlama dış ortamdan belirlenir; pratikte UTF-8", "En yaygın uyumlu sürüm"],
          ["4.0", "2011, RFC 6350", "UTF-8 zorunlu", "En güncel; bazı eski cihazlar tam desteklemez"]
        ]
      },
      after: [
        "Geniş uyumluluk istiyorsanız 3.0 sürümü ve UTF-8 kodlama güvenli bir seçimdir. Çok eski cihazlara aktarım yapacaksanız 2.1 sürümünde <code>CHARSET=UTF-8</code> parametresini ad alanlarına eklemek Türkçe karakterleri korur. [[arac:vcard-olustur|vCard Kartvizit Metni Oluşturma aracı]], girdiğiniz bilgilerden doğru satırları ve kaçış karakterlerini içeren metni üretir."
      ]
    },
    {
      h: "VCF dosyası telefonda nasıl açılır?",
      p: [
        "Bir VCF dosyası size e-posta eki, mesaj ya da indirme bağlantısı olarak geldiğinde dosyaya dokunmanız genellikle yeterlidir. Telefon dosyayı rehber uygulamasına yönlendirir ve kişiyi ya da kişileri eklemek isteyip istemediğinizi sorar. Birden çok kişi içeren dosyalarda \"tümünü ekle\" seçeneği çıkar."
      ],
      ol: [
        "Dosyaya dokunun ya da dosya yöneticisinden açın.",
        "Açma seçenekleri gelirse rehber ya da kişiler uygulamasını seçin.",
        "Kişilerin hangi hesaba (telefon belleği, bulut hesabı) kaydedileceğini seçin; senkronizasyon için bulut hesabı daha kullanışlıdır.",
        "Önizlemede adların ve Türkçe karakterlerin doğru göründüğünü kontrol edin, sonra ekleyin."
      ],
      after: [
        "Bilgisayarda VCF dosyasını e-posta programının kişiler bölümünden \"içe aktar\" ile alabilir ya da not defteriyle açıp içeriğini inceleyebilirsiniz. Dosyayı açtığınızda anlamsız karakterler görüyorsanız sorun kodlamadadır; aşağıdaki bölüm çözümü anlatıyor."
      ]
    },
    {
      h: "Rehber Android'den iPhone'a VCF ile nasıl taşınır?",
      p: [
        "İki işletim sistemi aynı bulut hesabını kullanıyorsa rehberi senkronizasyonla taşımak en kolay yoldur. Ancak hesap kullanmak istemiyorsanız ya da yalnızca telefon belleğindeki kişileri taşıyacaksanız VCF yöntemi her durumda çalışır."
      ],
      ol: [
        "Eski telefonda rehber uygulamasının ayarlarından \"dışa aktar\" seçeneğini bulun ve kişileri tek bir .vcf dosyası olarak kaydedin.",
        "Dosyayı yeni telefona kendinize e-posta göndererek, kablo bağlantısıyla ya da güvendiğiniz bir aktarım yöntemiyle taşıyın.",
        "Yeni telefonda dosyayı açın ve tüm kişileri ekleyin.",
        "Birkaç kişiyi rastgele açıp numaraların, e-postaların ve Türkçe harflerin doğru aktarıldığını kontrol edin.",
        "Aktarım bittikten sonra rehber dosyasını e-postanızdan ve indirilenler klasöründen silin; içinde başkalarının kişisel verileri vardır."
      ],
      after: [
        "Son adım önemlidir: rehber dosyası yakınlarınızın ve iş bağlantılarınızın telefon numaralarını ve e-posta adreslerini içerir. Bu dosyayı herkese açık bir yere yüklemeyin ve işiniz bitince silin."
      ]
    },
    {
      h: "Türkçe karakterler vCard'da neden bozulur?",
      p: [
        "VCF bir metin dosyası olduğu için [[bilgi:ascii-unicode-utf8-farki|karakter kodlaması]] sorunlarından etkilenir. Dosya Windows-1254 gibi eski bir kodlamayla kaydedilmiş ama alıcı cihaz UTF-8 bekliyorsa ya da tam tersi olduğunda ş, ğ, ı, İ harfleri anlamsız işaretlere ya da soru işaretine dönüşür. 2.1 sürümünde ayrıca kodlama belirtilmezse cihaz metni ASCII kabul edebilir.",
        "Çözüm üç adımdan oluşur: dosyayı UTF-8 olarak kaydedin, mümkünse 3.0 ya da 4.0 sürümünü kullanın ve 2.1 sürümü zorunluysa ad alanlarına <code>CHARSET=UTF-8</code> ekleyin. Bozuk gelen bir dosyayı düzeltmek için önce not defteri benzeri bir düzenleyicide hangi kodlamayla doğru göründüğünü bulun, sonra UTF-8 olarak yeniden kaydedin. Genel çözüm yolları [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Telefon numarası hangi biçimde yazılmalı?",
      p: [
        "vCard numarayı metin olarak saklar, yani ne yazarsanız o kaydedilir. Ancak rehber uygulamaları ve arama ekranı numarayı doğru tanımak için uluslararası biçimi tercih eder. En güvenli yazım <strong>E.164</strong> biçimidir: artı işareti, ülke kodu ve başında sıfır olmadan alan kodu ile numara, boşluksuz. Türkiye için örnek: <code>+905550000000</code> (uydurma numara)."
      ],
      table: {
        head: ["Yazım", "Örnek (uydurma)", "Sonuç"],
        rows: [
          ["E.164", "+905550000000", "Her ülkede ve her cihazda doğru aranır"],
          ["Uluslararası, boşluklu", "+90 555 000 00 00", "Okunaklı, çoğu cihaz tanır"],
          ["Ulusal", "0555 000 00 00", "Türkiye'de çalışır, yurt dışından aramada sorun çıkarır"],
          ["Ülke kodu çift sıfırla", "00905550000000", "Çalışır ama bazı sistemler tanımaz"]
        ]
      },
      after: [
        "Numaraları toplu olarak bu biçime çevirmek için [[arac:telefon-numarasi-bicimlendir|Telefon Numarası Biçimlendirme aracını]] kullanabilirsiniz. Web sitesinde tıklanınca arayan numara bağlantısı için [[bilgi:telefon-numarasi-formati-ve-tikla-ara-linki|telefon numarası formatı]] yazısı yol gösterir."
      ]
    },
    {
      h: "Kartvizit için vCard QR kodu nasıl yapılır?",
      p: [
        "QR kartvizit, vCard metninin doğrudan QR koda yerleştirilmesidir. Telefonun kamerası kodu okuduğunda içeriğin bir kişi kartı olduğunu anlar ve \"kişiyi ekle\" önerir. Bilgiler kodun içinde durduğu için okutmak internet bağlantısı gerektirmez ve hiçbir sunucuya uğramaz.",
        "QR kodun boyutu içindeki metin uzadıkça büyür ve karmaşıklaşır. Kâğıt kartvizitte rahat okunan bir kod için yalnızca gerekli alanları (ad, telefon, e-posta, şirket, web sitesi) koyun; adres, uzun not ve özellikle fotoğraf eklemeyin. [[arac:qr-wifi|Wi-Fi, Kartvizit ve Konum QR Kodu aracı]] vCard alanlarını doldurup QR kodu PNG ya da SVG olarak indirmenizi sağlar. Baskı boyutu ve hata düzeltme ayarı için [[rehber:qr-kod-nasil-olusturulur|QR kod rehberine]] bakabilirsiniz.",
        "Baskıdan önce kodu birkaç farklı telefonla okutun ve eklenen kişide Türkçe harflerin doğru göründüğünü kontrol edin."
      ]
    },
    {
      h: "Birden çok kişi tek VCF dosyasında olabilir mi?",
      p: [
        "Evet. vCard standardı, birden çok kaydın aynı dosyada art arda yazılmasına izin verir. Her kişi kendi <code>BEGIN:VCARD</code> ve <code>END:VCARD</code> bloğu içinde durur; bloklar arasında başka bir ayraç gerekmez. Rehber dışa aktarma işlemleri genellikle tüm rehberi bu şekilde tek dosyada toplar.",
        "Çok kişili dosyayı açtığınızda telefon hepsini birlikte eklemeyi önerir. Birkaç bin kişilik dosyalarda işlem birkaç saniye sürebilir ve aynı kişiler iki kez aktarıldıysa rehberde çift kayıtlar oluşur. Çoğu rehber uygulamasının \"yinelenen kişileri birleştir\" özelliği bu durumda işinizi kolaylaştırır. Büyük bir dosyayı içe aktarmadan önce rehberinizin bir yedeğini almak, beklenmedik bir sonuçta geri dönmenizi sağlar."
      ]
    }
  ],
  faq: [
    ["vCard (.vcf) dosyası nedir?", "vCard, kişi bilgilerini tüm telefon ve e-posta programlarının anlayacağı ortak bir metin biçiminde saklayan standarttır. Dosya uzantısı .vcf'dir; içinde ad, telefon, e-posta, şirket ve adres gibi alanlar satır satır yazılıdır."],
    ["VCF dosyası telefonda nasıl açılır?", "Dosyaya dokunduğunuzda telefon onu rehber uygulamasına yönlendirir ve kişiyi eklemek isteyip istemediğinizi sorar. Kayıt yeri olarak telefon belleği ya da bulut hesabı seçebilir, önizlemede bilgileri kontrol ederek ekleyebilirsiniz."],
    ["Rehber Android'den iPhone'a VCF ile nasıl taşınır?", "Eski telefonda rehberi tek bir VCF dosyası olarak dışa aktarın, dosyayı yeni telefona taşıyın ve açarak tüm kişileri ekleyin. Kontrolden sonra dosyayı silin, çünkü başkalarının kişisel verilerini içerir."],
    ["Kartvizit için vCard QR kodu nasıl yapılır?", "vCard metnini bir QR kod oluşturucuya verin; kod okutulduğunda telefon kişi eklemeyi önerir. Kodun küçük baskıda okunabilmesi için yalnızca ad, telefon, e-posta, şirket ve web sitesi gibi gerekli alanları kullanın."],
    ["VCF dosyasında hangi alanlar bulunur?", "Temel alanlar VERSION, FN (görünen ad), N (soyad;ad), TEL, EMAIL, ORG, TITLE, ADR, URL ve NOTE'tur. TEL ve ADR gibi alanlara TYPE parametresiyle cep, iş ya da ev türü eklenebilir."],
    ["Türkçe karakterler vCard'da neden bozulur?", "Dosya UTF-8 dışında bir kodlamayla kaydedildiğinde ya da eski 2.1 sürümünde kodlama belirtilmediğinde ş, ğ, ı gibi harfler bozulur. Dosyayı UTF-8 kaydedip 3.0 veya 4.0 sürümünü kullanmak sorunu önler."],
    ["Telefon numarası hangi biçimde yazılmalı?", "En güvenli biçim, artı işareti ve ülke koduyla başlayan, alan kodunun başındaki sıfırı içermeyen E.164 yazımıdır; örneğin +905550000000. Bu biçim yurt dışından aramada ve farklı cihazlarda sorun çıkarmaz."],
    ["Birden çok kişi tek VCF dosyasında olabilir mi?", "Evet. Her kişi kendi BEGIN:VCARD ve END:VCARD bloğu içinde olmak üzere bloklar art arda yazılabilir. Rehber dışa aktarma bu yöntemle tüm kişileri tek dosyada toplar."],
    ["vCard oluşturmak için bilgilerim bir yere gönderiliyor mu?", "Hayır. vCard ve QR kod araçları tarayıcınızda çalışır; girdiğiniz ad, numara ve e-posta hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda silinir."]
  ],
  tools: ["vcard-olustur", "qr-wifi", "telefon-numarasi-bicimlendir"],
  related: ["telefon-numarasi-formati-ve-tikla-ara-linki", "ascii-unicode-utf8-farki", "e-posta-imzasi-nasil-olusturulur"],
  sources: [
    ["IETF – RFC 6350 vCard 4.0", "https://www.rfc-editor.org/rfc/rfc6350"],
    ["IETF – RFC 2426 vCard 3.0", "https://www.rfc-editor.org/rfc/rfc2426"],
    ["ITU – E.164 uluslararası numara planı", "https://www.itu.int/rec/T-REC-E.164"]
  ]
};
