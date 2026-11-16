export default {
  slug: "zil-sesi-nasil-yapilir-sarkidan-kesit-alma",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Zil Sesi Nasıl Yapılır? Şarkıdan Kesit Alma, Süre ve Format Seçimi",
  pageTitle: "Zil Sesi Nasıl Yapılır? Kesit Alma, Süre ve Format",
  description: "Zil sesi için ses dosyasından 20–30 saniyelik bir kesit seçin, başına ve sonuna yumuşak geçiş ekleyin, desteklenen formatta kaydedin. Telif ve boyut notlarıyla.",
  keywords: ["zil sesi yapma", "şarkıdan zil sesi", "ses kesme", "zil sesi kaç saniye", "android zil sesi", "mp3 kırpma", "zil sesi formatı", "fade in fade out"],
  lead: "Zil sesi yapmak için bir ses dosyasından 20–30 saniyelik bir bölüm seçip başına ve sonuna kısa bir yumuşak geçiş (fade) ekler, sonucu telefonunuzun desteklediği bir formatta kaydedersiniz. Android telefonlar WAV, MP3 ve OGG gibi yaygın biçimleri kabul eder; iOS'ta zil sesi en fazla 40 saniye olabilir ve özel bir AAC biçimine (m4r) çevrilmesi gerekir. Yalnızca kendi kaydınızı ya da kullanma hakkına sahip olduğunuz sesleri kullanın. Bu yazıda kesit seçimi, süre, format, boyut ve telefona aktarma adımlarını anlatıyoruz.",
  kisaCevap: [
    "İyi bir zil sesi 20–30 saniyedir; iOS'ta üst sınır 40 saniyedir, Android'de katı bir sınır yoktur ama uzun dosya çalarken kesilir.",
    "Kesitin başına 0,5–1 saniye, sonuna 1–2 saniye yumuşak geçiş eklemek ani başlama ve kesilmeyi önler.",
    "30 saniyelik 44,1 kHz, 16 bit, stereo WAV yaklaşık 5,3 MB; aynı süre 128 kbps sıkıştırılmış biçimde yaklaşık 480 KB tutar.",
    "Android zil seslerini genellikle WAV, MP3 ve OGG biçiminde kabul eder; iOS'ta zil sesi m4r uzantılı AAC dosyası olmalıdır.",
    "Yalnızca kendi kaydınızı, telifsiz ya da lisansı size ait sesleri kullanın; zil sesini paylaşmak ya da satmak telif ihlali olabilir."
  ],
  figure: {
    alt: "Üç dakikalık bir ses dosyasının dalga formu; 62. ile 90. saniye arası 28 saniyelik kesit seçili, başta 1 saniye giriş ve sonda 2 saniye çıkış yumuşatması. Altta WAV ve sıkıştırılmış biçimlerin boyut karşılaştırması.",
    caption: "Kesit, şarkının en tanınır ve hareketli bölümünden seçilir. Yumuşak geçişler kesitin kulağa doğal gelmesini sağlar. Aynı 28 saniye sıkıştırılmamış WAV'da megabaytlarca, sıkıştırılmış biçimde birkaç yüz kilobayt tutar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kesit seçimi ve yumuşak geçiş</text>
  <rect x="30" y="50" width="660" height="140" rx="8" class="sf sb"/>
  <rect x="254" y="54" width="224" height="132" class="ps"/>
  <polyline points="40,120 60,98 80,138 100,104 120,132 140,110 160,128 180,96 200,142 220,100 240,136 260,82 280,156 300,76 320,162 340,84 360,152 380,78 400,160 420,86 440,150 460,90 480,140 500,104 520,132 540,112 560,126 580,106 600,134 620,112 640,126 660,116 680,120" class="sp sw" fill="none"/>
  <polygon points="254,186 262,54 262,186" class="a"/>
  <polygon points="462,54 478,186 462,186" class="a"/>
  <text x="258" y="212" class="sm mid b">62 sn</text>
  <text x="478" y="212" class="sm mid b">90 sn</text>
  <text x="366" y="212" class="sm mid p b">28 saniyelik kesit</text>
  <text x="40" y="212" class="sm mu">0:00</text>
  <text x="684" y="212" class="sm mu end">3:00</text>
  <text x="30" y="244" class="sm">Turuncu üçgenler: başta 1 sn giriş, sonda 2 sn çıkış yumuşatması (fade)</text>
  <text x="30" y="280" class="b">28 saniyenin dosya boyutu</text>
  <text x="30" y="312" class="sm">WAV 44,1 kHz, 16 bit, stereo</text>
  <rect x="270" y="298" width="400" height="22" rx="4" class="dg"/>
  <text x="664" y="314" class="sm end b sf">4,94 MB</text>
  <text x="30" y="346" class="sm">WAV, mono</text>
  <rect x="270" y="332" width="200" height="22" rx="4" class="a"/>
  <text x="464" y="348" class="sm end b">2,47 MB</text>
  <text x="30" y="380" class="sm">Sıkıştırılmış, 128 kbps</text>
  <rect x="270" y="366" width="18" height="22" rx="4" class="ok"/>
  <text x="296" y="382" class="sm b">448 KB</text>
</svg>`
  },
  sections: [
    {
      h: "Zil sesi yapmak için neye ihtiyacınız var?",
      p: [
        "Bir zil sesi aslında kısa ve iyi kesilmiş bir ses dosyasıdır. Bunun için üç şey gerekir: kaynak ses dosyası, başlangıç ve bitişi saniye hassasiyetinde seçebileceğiniz bir kırpma aracı ve sonucu telefonun tanıdığı bir biçimde kaydetme imkânı. Telefona özel uygulama yüklemek şart değildir; tarayıcıda çalışan bir ses kesme aracı da aynı işi görür.",
        "Kaynak olarak kendi sesinizi, çocuğunuzun kahkahasını, bir enstrüman kaydınızı ya da kullanım lisansı size verilmiş bir müziği seçebilirsiniz. Kaynak ne kadar temizse sonuç da o kadar iyi olur; düşük kaliteli, çok kez sıkıştırılmış dosyalar telefon hoparlöründe cızırtılı duyulabilir."
      ]
    },
    {
      h: "Telif hakkı: hangi sesler zil sesi yapılabilir?",
      p: [
        "Şarkılar, film müzikleri ve reklam cıngılları telif hakkıyla korunur. Bir şarkıdan kesit alıp zil sesi yapmak, o eserin çoğaltılması anlamına gelir. Eseri yasal yoldan edinmiş olsanız bile kesiti başkalarıyla paylaşmak, sosyal medyada yayımlamak, bir sitede indirmeye sunmak ya da satmak hak sahibinin izni olmadan yapılamaz.",
        "En güvenli yol, hakkına sahip olduğunuz seslerle çalışmaktır. Aşağıdaki kaynaklar zil sesi için sorun çıkarmaz:"
      ],
      ul: [
        "Kendi yaptığınız ses kaydı: bir melodi, bir söz, ailenizden birinin sesi (kişinin izniyle).",
        "Kendi bestelediğiniz ya da çaldığınız müzik.",
        "Lisansı zil sesi kullanımına açıkça izin veren telifsiz ses kütüphaneleri; lisans koşullarını okuyun.",
        "Telefonla birlikte gelen ya da zil sesi olarak lisanslanıp satın alınan sesler."
      ],
      after: [
        "Korsan kaynaklardan indirilmiş bir şarkıyı zil sesi yapmak ise baştan hukuka aykırı bir kopya kullanmak demektir. Bu yazıdaki adımları yalnızca kullanma hakkına sahip olduğunuz seslerle uygulayın."
      ]
    },
    {
      h: "Zil sesi en fazla kaç saniye olmalı?",
      p: [
        "Telefon çaldığında çoğu arama ilk 10–20 saniye içinde açılır ya da reddedilir. Bu yüzden zil sesinin en tanınır kısmı ilk saniyelerde gelmelidir. Uygulamada 20–30 saniyelik bir kesit hem yeterince tanınır hem de çalarken birkaç kez tekrar etmeden işini görür.",
        "iOS işletim sistemli telefonlarda zil sesi en fazla 40 saniye olabilir; daha uzun dosyalar zil sesi olarak kabul edilmez. Android'de katı bir sınır yoktur, ama arama çaldığı sürece dosya baştan çalınır; uzun bir dosyada şarkının yalnızca girişini duyarsınız. Bildirim ve mesaj sesleri için ise 1–3 saniyelik kısa, keskin sesler daha uygundur."
      ],
      table: {
        head: ["Kullanım", "Önerilen süre", "Not"],
        rows: [
          ["Arama zil sesi", "20–30 sn", "iOS'ta üst sınır 40 sn"],
          ["Alarm sesi", "30–60 sn", "Yavaş yükselen giriş uyandırırken daha rahatsız etmez"],
          ["Mesaj ve bildirim", "1–3 sn", "Uzun bildirim sesi rahatsız edici olur"],
          ["Kişiye özel zil", "10–20 sn", "Arayanı tanımak için ilk saniyeler yeterli"]
        ]
      }
    },
    {
      h: "Şarkıdan ya da kayıttan kesit nasıl seçilir?",
      p: [
        "İyi bir kesit, ritmin ya da melodinin oturduğu bir noktadan başlar ve bir müzik cümlesinin sonunda biter. Şarkının nakarat bölümü genellikle en tanınır kısımdır. Kesiti dalga formunda görerek seçmek işinizi kolaylaştırır: sesin yükseldiği tepeler vuruşları, sessiz alanlar ara verilen yerleri gösterir."
      ],
      ol: [
        "Dosyayı dinleyip zil sesi olmasını istediğiniz bölümün yaklaşık başlangıç ve bitiş saniyesini not edin; örneğin 62 ile 90 saniye arası.",
        "Kırpma aracında başlangıç ve bitiş noktalarını bu değerlere ayarlayın; dalga formunda bir vuruşun hemen önüne denk getirin.",
        "Seçimi dinleyin. Başlangıç bir kelimenin ya da notanın ortasına düşüyorsa yarım saniye ileri veya geri kaydırın.",
        "Bitişi bir müzik cümlesinin sonuna yerleştirin; böylece zil tekrar ettiğinde geçiş kulağı yormaz.",
        "Kesit süresini kontrol edin: 90 − 62 = 28 saniye, hem iOS sınırının hem de 30 saniye önerisinin içinde."
      ]
    },
    {
      h: "Kesitin başına ve sonuna yumuşak geçiş (fade) eklemek",
      p: [
        "Bir şarkının ortasından alınan kesit ani başlar ve bıçakla kesilmiş gibi biter. <strong>Giriş yumuşatması</strong> (fade in) sesi sıfırdan başlayıp kısa sürede tam seviyeye çıkarır; <strong>çıkış yumuşatması</strong> (fade out) ise sonda sesi kademeli olarak kısar. Böylece hem ilk saniyede irkiltici bir patlama olmaz hem de zil tekrar ederken \"tık\" sesi duyulmaz.",
        "Başlangıçta 0,5–1 saniye, sonda 1–2 saniye çoğu kesit için yeterlidir. Alarm seslerinde girişi 3–5 saniyeye uzatmak sesin yavaşça yükselmesini sağlar. Ses seviyesi ayarı ise kaynak dosya çok kısıksa ya da çok yüksekse kesiti diğer zil seslerinizle aynı seviyeye getirmek için kullanılır; seviyeyi aşırı yükseltmek sesin bozulmasına (patlamasına) yol açar."
      ]
    },
    {
      h: "Format seçimi: WAV, MP3, OGG, m4r",
      p: [
        "Telefonlar farklı biçimleri farklı ölçüde destekler. Android telefonların büyük çoğunluğu WAV, MP3 ve OGG dosyalarını zil sesi olarak kabul eder. iOS'ta ise zil sesi, AAC ile sıkıştırılmış ve m4r uzantılı bir dosya olmalıdır; bu dosya genellikle bilgisayardaki müzik ve cihaz yönetimi uygulamasıyla telefona aktarılır.",
        "WAV sıkıştırılmamış bir biçimdir; her yerde açılır ama büyüktür. MP3, AAC ve Opus gibi sıkıştırılmış biçimler aynı sesi çok daha küçük dosyada saklar; telefon hoparlöründe 128 kbps ile kaynak arasındaki fark pek duyulmaz. Bit hızı seçimi için [[bilgi:mp3-kac-kbps-olmali-ses-kalitesi|MP3 kaç kbps olmalı]] yazısına bakabilirsiniz."
      ],
      table: {
        head: ["Biçim", "Sıkıştırma", "Tipik kullanım", "Not"],
        rows: [
          ["WAV", "Yok", "Android zil sesi, düzenleme ara dosyası", "En uyumlu, en büyük"],
          ["MP3", "Kayıplı", "Android zil sesi", "Yaygın ve küçük"],
          ["OGG (Vorbis/Opus)", "Kayıplı", "Android zil ve bildirim sesleri", "Çok küçük dosya"],
          ["m4r (AAC)", "Kayıplı", "iOS zil sesi", "En fazla 40 sn"]
        ]
      },
      after: [
        "Bilişim Ajans'ın [[arac:ses-kirp|Ses Kesme ve Birleştirme]] aracı kesiti WAV ya da WebM/Opus olarak kaydeder; [[arac:ses-donustur|Ses Dönüştürücü]] ise dosyaları WAV'a ya da WebM/OGG Opus biçimine çevirir. Bu araçlar MP3 ya da m4r çıktısı vermez; WAV dosyası Android'de doğrudan kullanılabilir, iOS için WAV'ı cihaz yönetim uygulamasında m4r'ye dönüştürmeniz gerekir."
      ]
    },
    {
      h: "WAV ile sıkıştırılmış biçimler arasında boyut farkı",
      p: [
        "Sıkıştırılmamış ses dosyasının boyutu örnekleme hızı, bit derinliği, kanal sayısı ve süreyle doğru orantılıdır. Sıkıştırılmış dosyanın boyutu ise yalnızca bit hızı ve süreye bağlıdır."
      ],
      formula: "WAV boyutu (bayt) = örnekleme hızı × (bit derinliği ÷ 8) × kanal sayısı × süre (sn)\n44.100 × 2 × 2 × 28 = 4.939.200 bayt ≈ 4,94 MB\nSıkıştırılmış boyut (bayt) = bit hızı (bit/sn) ÷ 8 × süre\n128.000 ÷ 8 × 28 = 448.000 bayt ≈ 448 KB",
      table: {
        head: ["Süre", "WAV stereo", "WAV mono", "128 kbps", "64 kbps"],
        rows: [
          ["10 sn", "1,76 MB", "0,88 MB", "160 KB", "80 KB"],
          ["20 sn", "3,53 MB", "1,76 MB", "320 KB", "160 KB"],
          ["28 sn", "4,94 MB", "2,47 MB", "448 KB", "224 KB"],
          ["30 sn", "5,29 MB", "2,65 MB", "480 KB", "240 KB"],
          ["40 sn", "7,06 MB", "3,53 MB", "640 KB", "320 KB"]
        ],
        caption: "WAV değerleri 44,1 kHz ve 16 bit içindir; MB = 1.000.000 bayt alınmıştır."
      },
      after: [
        "Telefon hoparlörü tek ya da küçük iki hoparlörden oluştuğu için mono kayıt zil sesi için çoğu zaman yeterlidir ve boyutu yarıya indirir. Farklı ayarların boyutunu karşılaştırmak için [[arac:ses-dosyasi-boyutu-hesapla|Ses Dosyası Boyutu Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Telefonda zil sesi olarak ayarlamak",
      p: [
        "Android'de hazırladığınız dosyayı kabloyla, bulut depolamayla ya da dosya paylaşımıyla telefona aktarın. Dosyayı dahili depolamadaki zil sesleri klasörüne koymak, sistemin onu zil sesi listesinde göstermesini kolaylaştırır. Ardından Ayarlar içinde ses ve titreşim bölümünden zil sesi seçeneğine girip listeden dosyanızı seçin; bazı modellerde \"cihazdan ekle\" ya da artı simgesiyle dosyayı doğrudan seçebilirsiniz.",
        "iOS'ta m4r dosyasını bilgisayardaki cihaz yönetim uygulamasıyla telefonun zil sesleri bölümüne aktarmanız ya da telefondaki müzik oluşturma uygulamasından zil sesi olarak dışa aktarmanız gerekir. Aktarımdan sonra Ayarlar içindeki ses bölümünden zil sesini seçebilirsiniz. Menü adları işletim sistemi sürümüne göre değişebilir."
      ]
    },
    {
      h: "Kendi ses kaydınızdan zil sesi yapmak",
      p: [
        "Kendi kaydınız telif açısından en sorunsuz seçenektir. Sessiz bir odada, telefonu ağzınızdan 20–30 cm uzakta tutarak kayıt alın. Kayıttan önce ve sonra birkaç saniye sessizlik bırakın; bu, kırparken temiz başlangıç ve bitiş noktası bulmanızı kolaylaştırır.",
        "Tarayıcıda çalışan [[arac:ses-kaydedici|Online Ses Kaydedici]] ile kaydı alıp aynı bilgisayarda ses kesme aracıyla kırpabilirsiniz. Başka birinin sesini kullanacaksanız ondan izin alın; bir kişinin sesi de kişisel veridir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Şarkının girişini almak:</strong> girişler çoğu zaman sessiz ve yavaştır; zil sesi çalarken tanınmaz.",
        "<strong>Yumuşak geçiş eklememek:</strong> ani başlangıç irkiltir, ani bitiş tekrar ederken tık sesi yapar.",
        "<strong>Sesi aşırı yükseltmek:</strong> seviyeyi patlama sınırına kadar çıkarmak telefon hoparlöründe bozulmaya yol açar.",
        "<strong>40 saniyeyi aşmak:</strong> iOS'ta uzun dosya zil sesi listesinde görünmez.",
        "<strong>Telifli kesiti paylaşmak:</strong> kişisel kullanım için hazırladığınız kesiti başkalarına dağıtmayın."
      ]
    }
  ],
  faq: [
    ["Bir şarkıdan zil sesi için kesit nasıl alınır?", "Ses kesme aracında dosyayı açıp dalga formunda nakarat gibi tanınır bir bölümün başlangıç ve bitiş saniyesini seçin. Başlangıcı bir vuruşun önüne, bitişi bir müzik cümlesinin sonuna yerleştirip yumuşak geçiş ekleyin ve kaydedin."],
    ["Zil sesi en fazla kaç saniye olmalı?", "Arama zil sesi için 20–30 saniye idealdir. iOS'ta üst sınır 40 saniyedir; Android'de katı bir sınır yoktur, ancak uzun dosyanın yalnızca başı çalınır. Bildirim sesleri için 1–3 saniye yeterlidir."],
    ["iOS ve Android telefonlarda zil sesi formatı farklı mı?", "Evet. Android çoğunlukla WAV, MP3 ve OGG dosyalarını zil sesi olarak kabul eder. iOS'ta zil sesi m4r uzantılı AAC dosyası olmalı ve en fazla 40 saniye sürmelidir; aktarım genellikle cihaz yönetim uygulamasıyla yapılır."],
    ["Kesitin başına ve sonuna yumuşak geçiş (fade) nasıl eklenir?", "Ses kesme aracındaki giriş ve çıkış yumuşatma alanlarına saniye cinsinden değer girersiniz. Başta 0,5–1 saniye, sonda 1–2 saniye çoğu kesit için yeterlidir; alarm seslerinde girişi birkaç saniyeye uzatabilirsiniz."],
    ["WAV ve sıkıştırılmış formatlar arasında boyut farkı ne kadardır?", "30 saniyelik 44,1 kHz, 16 bit stereo WAV yaklaşık 5,29 MB tutar. Aynı süre 128 kbps sıkıştırılmış biçimde yaklaşık 480 KB, yani yaklaşık on bir kat daha küçüktür."],
    ["Telefonda zil sesi olarak nasıl ayarlanır?", "Android'de dosyayı telefona aktarıp zil sesleri klasörüne koyun, Ayarlar'daki ses bölümünden zil sesi listesinden seçin. iOS'ta m4r dosyasını cihaz yönetim uygulamasıyla aktardıktan sonra Ayarlar'daki ses bölümünden seçersiniz."],
    ["Kendi ses kaydımdan zil sesi yapabilir miyim?", "Evet, telif açısından en sorunsuz yol budur. Sessiz bir ortamda kayıt alıp başta ve sonda sessizlik bırakın, ardından ses kesme aracında kırpın. Başka birinin sesini kullanacaksanız mutlaka iznini alın."],
    ["Telifli şarkıyı zil sesi yapmak serbest mi?", "Şarkılar telifle korunur ve kesit almak eserin çoğaltılmasıdır. Kesiti paylaşmak, yayımlamak ya da satmak hak sahibinin izni olmadan yapılamaz; korsan kaynaktan alınan dosya kullanmak da hukuka aykırıdır. Yalnızca hakkına sahip olduğunuz sesleri kullanın."],
    ["Ses dosyasını yüklemeden kırpmak mümkün mü?", "Evet. Bilişim Ajans'ın ses kesme aracı dosyayı tarayıcınızda işler, hiçbir sunucuya göndermez. Kişisel kayıtlarınızı gizlilik endişesi olmadan kırpıp yumuşak geçiş ekleyebilir ve WAV ya da Opus olarak indirebilirsiniz."]
  ],
  tools: ["ses-kirp", "ses-donustur", "ses-dosyasi-boyutu-hesapla", "ses-kaydedici"],
  related: ["mp3-kac-kbps-olmali-ses-kalitesi", "dosya-uzantilari-nedir-docx-xlsx-pdf"]
};
