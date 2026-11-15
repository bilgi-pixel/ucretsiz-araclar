export default {
  slug: "altyazi-dosyasi-srt-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "SRT Altyazı Dosyası Nedir? Altyazı Kaydırma ve Senkronizasyon Nasıl Yapılır",
  pageTitle: "SRT Nedir? Altyazı Kaydırma ve Senkronizasyon Nasıl Yapılır",
  description: "SRT, sıra numarası, zaman aralığı ve metinden oluşan düz metin altyazı dosyasıdır. Altyazı kaydırma, fps farkını düzeltme, VTT farkı ve bozuk Türkçe karakter.",
  keywords: ["srt nedir", "altyazı kaydırma", "altyazı senkronizasyonu", "altyazı geç geliyor", "srt dosyası nasıl açılır", "vtt srt farkı", "altyazı türkçe karakter bozuk", "videoya altyazı ekleme"],
  lead: "SRT, her altyazı satırını bir sıra numarası, <strong>başlangıç --> bitiş</strong> zaman aralığı ve ekranda görünecek metinle tanımlayan düz metin bir altyazı dosyasıdır. Altyazı videonun gerisinde ya da önünde kalıyorsa bütün zamanlara aynı süreyi ekleyerek ya da çıkararak, giderek açılıyorsa kare hızı farkını düzelterek senkronize edersiniz. Bu sayfada SRT dosyasının yapısını, zaman kodunun nasıl okunduğunu, altyazı kaydırma hesabını, 23,976 ile 25 fps farkını, VTT ile SRT'nin farkını ve bozuk Türkçe karakterlerin nedenini bulacaksınız.",
  kisaCevap: [
    "SRT bloğu dört parçadır: sıra numarası, SS:DD:SN,mmm --> SS:DD:SN,mmm zaman satırı, bir ya da iki satır metin ve boş bir satır.",
    "Altyazı baştan sona aynı miktarda geç geliyorsa tüm zamanlardan o süreyi çıkarın; erken geliyorsa ekleyin.",
    "Kayma video ilerledikçe büyüyorsa sorun kare hızı farkıdır; 23,976 fps için hazırlanmış altyazıyı 25 fps videoya uyarlamak için zamanlar 0,95904 ile çarpılır.",
    "VTT, \"WEBVTT\" başlığıyla başlar ve milisaniyeyi nokta ile ayırır; web tarayıcılarındaki video oynatıcılar VTT kullanır.",
    "Türkçe harfler ý, þ, ð ya da Ä± gibi görünüyorsa dosyanın karakter kodlaması yanlış okunuyordur; dosyayı UTF-8 olarak kaydetmek çoğu zaman sorunu çözer.",
    "SRT düz metindir; Not Defteri gibi herhangi bir metin düzenleyiciyle açılıp düzenlenebilir."
  ],
  figure: {
    alt: "Bir SRT altyazı bloğunun parçalarını gösteren şema: sıra numarası, okla ayrılmış başlangıç ve bitiş zamanı, metin satırları, boş satır; altta altyazının 2,5 saniye geri kaydırılmasını gösteren zaman çizelgesi.",
    caption: "Üstte tek bir SRT bloğunun anatomisi. Altta, altyazının videodan 2,5 saniye geç geldiği durumda tüm zamanlardan 2,5 saniye çıkarılarak senkronizasyonun nasıl sağlandığı gösterilmiştir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">SRT bloğunun anatomisi</text>
  <rect x="30" y="46" width="380" height="176" rx="10" class="sf sb"/>
  <text x="50" y="80" class="b">42</text>
  <text x="50" y="112" class="b p">00:42:12,700 --> 00:42:15,300</text>
  <text x="50" y="144">Yarın sabah erkenden yola çıkıyoruz.</text>
  <text x="50" y="172">Hazır ol!</text>
  <text x="50" y="204" class="sm mu">(boş satır)</text>
  <g class="sm">
    <line x1="420" y1="76" x2="450" y2="76" class="st" fill="none"/><text x="456" y="80">Sıra numarası</text>
    <line x1="420" y1="108" x2="450" y2="108" class="st" fill="none"/><text x="456" y="104">Başlangıç --> bitiş</text>
    <text x="456" y="120" class="t2">saat:dakika:saniye,milisaniye</text>
    <line x1="420" y1="156" x2="450" y2="156" class="st" fill="none"/><text x="456" y="160">Metin: 1–2 satır</text>
    <line x1="420" y1="200" x2="450" y2="200" class="st" fill="none"/><text x="456" y="204">Blok ayırıcı</text>
  </g>
  <text x="30" y="262" class="b">Altyazı 2,5 sn geç geliyor → tüm zamanlardan 2,5 sn çıkar</text>
  <line x1="40" y1="330" x2="690" y2="330" class="st" fill="none"/>
  <g class="sm mid">
    <line x1="100" y1="324" x2="100" y2="336" class="st" fill="none"/><text x="100" y="354">42:08</text>
    <line x1="260" y1="324" x2="260" y2="336" class="st" fill="none"/><text x="260" y="354">42:10</text>
    <line x1="420" y1="324" x2="420" y2="336" class="st" fill="none"/><text x="420" y="354">42:12</text>
    <line x1="580" y1="324" x2="580" y2="336" class="st" fill="none"/><text x="580" y="354">42:14</text>
  </g>
  <rect x="276" y="282" width="208" height="30" rx="6" class="oks"/>
  <text x="380" y="302" class="sm mid b">Konuşma 42:10,2 – 42:12,8</text>
  <rect x="476" y="370" width="208" height="30" rx="6" class="dgs"/>
  <text x="580" y="390" class="sm mid b">Altyazı 42:12,7 – 42:15,3</text>
  <line x1="470" y1="378" x2="300" y2="318" class="sp sw" fill="none"/>
  <text x="250" y="390" class="sm b p">−2,5 sn</text>
</svg>`
  },
  sections: [
    {
      h: "SRT dosyası nedir?",
      p: [
        "SRT (SubRip Text), video altyazıları için en yaygın kullanılan dosya biçimidir. Adını, altyazıları DVD'lerden metne çeviren eski bir programdan alır. Bir SRT dosyası yalnızca düz metin içerir; resim, yazı tipi ya da renk bilgisi taşımaz. Bu sadelik onu neredeyse tüm video oynatıcılar, televizyonlar, video düzenleme programları ve video paylaşım platformları tarafından desteklenen evrensel bir biçim yapar.",
        "Dosyanın içinde, her biri bir altyazı satırını temsil eden bloklar art arda dizilir. Her blok ekranda ne zaman hangi yazının görüneceğini söyler. Video dosyasıyla aynı adı taşıyan bir SRT dosyası (film.mp4 ve film.srt gibi) aynı klasörde durduğunda çoğu oynatıcı altyazıyı otomatik yükler."
      ]
    },
    {
      h: "SRT bloğu ve zaman kodu nasıl okunur?",
      p: [
        "Bir SRT bloğu dört parçadan oluşur ve bloklar arasında mutlaka bir boş satır bulunur. Zaman satırında başlangıç ve bitiş, iki tire ve büyüktür işaretinden oluşan bir okla ayrılır."
      ],
      formula: "42\n00:42:12,700 --> 00:42:15,300\nYarın sabah erkenden yola çıkıyoruz.\nHazır ol!",
      table: {
        head: ["Parça", "Örnek", "Anlamı"],
        rows: [
          ["Sıra numarası", "42", "Bloğun dosyadaki sırası; 1'den başlar"],
          ["Saat", "00", "Videonun kaçıncı saati"],
          ["Dakika", "42", "Dakika (00–59)"],
          ["Saniye", "12", "Saniye (00–59)"],
          ["Milisaniye", ",700", "Virgülden sonra üç hane: 0,7 saniye"],
          ["Süre", "15,300 − 12,700", "Yazı ekranda 2,6 saniye kalır"]
        ]
      },
      after: [
        "SRT'de milisaniye virgülle ayrılır; bu, biçimin Avrupa kökenli bir alışkanlığıdır. Video düzenleme programlarında gördüğünüz SS:DD:SN:KK biçimindeki zaman kodunun son hanesi ise milisaniye değil kare (frame) numarasıdır. 25 fps bir videoda 12. kare 12 ÷ 25 = 0,48 saniyedir. İki gösterim arasında çevirme yapmak için [[arac:zaman-kodu-cevir|zaman kodu çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Altyazı geride kalıyorsa nasıl düzeltilir? Sabit kaydırma",
      p: [
        "En sık karşılaşılan durum, altyazının filmin başından sonuna kadar aynı miktarda geç ya da erken gelmesidir. Bu genellikle altyazının farklı bir sürüm için (örneğin başında jenerik ya da logo olan bir kopya için) hazırlanmasından kaynaklanır. Çözüm, tüm zaman değerlerine aynı süreyi eklemek ya da çıkarmaktır."
      ],
      ol: [
        "Videoda belirgin bir konuşmanın başladığı anı not edin: örneğin 42:10,2.",
        "Aynı cümlenin altyazısının SRT'deki başlangıç zamanına bakın: 00:42:12,700.",
        "Farkı bulun: 42:12,7 − 42:10,2 = 2,5 saniye. Altyazı 2,5 saniye geç geliyor.",
        "Tüm başlangıç ve bitiş zamanlarından 2,5 saniye çıkarın: 00:42:12,700 --> 00:42:15,300 satırı 00:42:10,200 --> 00:42:12,800 olur.",
        "Videonun sonlarına doğru başka bir konuşmada kontrol edin. Fark hâlâ sıfıra yakınsa işlem tamamdır."
      ],
      after: [
        "Bu işlemi yüzlerce satır için elle yapmak yerine [[arac:altyazi-araci|altyazı düzenleme aracı]]nda kaydırma süresini yazmanız yeterlidir; tüm zamanlar tek seferde güncellenir. Birçok oynatıcı da oynatma sırasında altyazıyı geçici olarak kaydırmaya izin verir, ancak dosyayı düzeltmek kalıcı çözümdür."
      ]
    },
    {
      h: "Altyazı giderek kayıyorsa: kare hızı (fps) farkı",
      p: [
        "Altyazı filmin başında doğru, ortasında birkaç saniye geride, sonunda daha da gerideyse sabit bir kaydırma işe yaramaz. Bu durumun en yaygın nedeni, altyazının farklı kare hızındaki bir sürüm için hazırlanmış olmasıdır. Sinema filmleri genellikle 23,976 fps'tir; bazı yayın ve kopya sürümleri ise 25 fps'e hızlandırılır. 25 fps sürüm aynı kareleri daha hızlı oynattığı için yaklaşık %4 daha kısa sürer."
      ],
      formula: "Hız oranı = 23,976 ÷ 25 = 0,95904\nYeni zaman = eski zaman × 0,95904 (23,976 için hazırlanmış altyazı, 25 fps video)\nYeni zaman = eski zaman × 1,04271 (25 fps için hazırlanmış altyazı, 23,976 fps video)",
      after: [
        "Örnek: 23,976 fps sürüm için hazırlanmış bir altyazıda 01:00:00,000'da başlayan satır, 25 fps videoda 3.600 × 0,95904 = 3.452,54 saniyede, yani 00:57:32,544'te görünmelidir. Fark bir saatte yaklaşık 2,5 dakikaya ulaşır; bu yüzden fps uyumsuzluğu çok hızlı fark edilir.",
        "[[arac:altyazi-araci|Altyazı aracı]], 23,976 ile 25 fps arasındaki hız farkını düzeltme seçeneği sunar. Bazen hem fps farkı hem de sabit bir kayma birlikte bulunur; önce hız farkını, ardından sabit kaydırmayı düzeltmek en kolay yoldur."
      ]
    },
    {
      h: "SRT ile VTT arasındaki fark nedir?",
      p: [
        "WebVTT (VTT), web sayfalarındaki video oynatıcılar için geliştirilmiş bir altyazı biçimidir ve SRT'ye çok benzer. Tarayıcılar web sayfasındaki videolara altyazı eklerken VTT biçimini kullanır. SRT'yi VTT'ye çevirmek çoğu zaman birkaç küçük değişiklikten ibarettir."
      ],
      table: {
        head: ["Özellik", "SRT", "VTT"],
        rows: [
          ["Dosya başlığı", "Yok", "İlk satır \"WEBVTT\" olmalı"],
          ["Milisaniye ayırıcı", "Virgül: 00:01:02,500", "Nokta: 00:01:02.500"],
          ["Sıra numarası", "Zorunlu", "İsteğe bağlı (kimlik olarak)"],
          ["Saat hanesi", "Her zaman yazılır", "Bir saatten kısa videolarda atlanabilir"],
          ["Konum ve stil", "Çok sınırlı", "Konum, hizalama ve stil desteği"],
          ["Tipik kullanım", "Oynatıcılar, televizyonlar, düzenleme programları", "Web sayfalarındaki video oynatıcılar"]
        ]
      },
      after: [
        "Daha gelişmiş bir biçim olan ASS/SSA ise yazı tipi, renk, konum ve efekt gibi biçimlendirmeleri taşır; anime ve karaoke altyazılarında yaygındır. [[arac:altyazi-araci|Altyazı aracı]] SRT, VTT ve ASS dosyalarını açabilir ve SRT ile VTT arasında dönüştürme yapar."
      ]
    },
    {
      h: "Altyazıdaki Türkçe karakterler neden bozuk çıkar?",
      p: [
        "Bilgisayarlar harfleri sayılarla saklar ve hangi sayının hangi harfe karşılık geldiğini bir <strong>karakter kodlaması</strong> belirler. Eski Türkçe altyazıların çoğu, Windows'un Türkçe kodlaması olan Windows-1254 ile kaydedilmiştir. Oynatıcı bu dosyayı Batı Avrupa kodlamasıyla okursa Türkçeye özgü harfler başka harflere dönüşür. Günümüzde önerilen evrensel kodlama UTF-8'dir; ancak UTF-8 dosya eski kodlamayla okunursa da farklı türde bir bozulma görülür."
      ],
      table: {
        head: ["Doğru harf", "Windows-1254 dosya Batı Avrupa olarak okunursa", "UTF-8 dosya Windows-1254 olarak okunursa"],
        rows: [
          ["ı", "ý", "Ä±"],
          ["ş", "þ", "ÅŸ"],
          ["ğ", "ð", "ÄŸ"],
          ["İ", "Ý", "Ä°"],
          ["Ş", "Þ", "Åž"],
          ["Ğ", "Ð", "Äž"]
        ]
      },
      after: [
        "Bozulmanın türüne bakarak sorunun hangi yönde olduğunu anlayabilirsiniz. Tek harflik değişimlerde (ý, þ, ð) dosya Windows-1254'tür ve yanlış okunmaktadır; iki karakterlik dizilerde (Ä±, ÅŸ) dosya UTF-8'dir ama eski kodlamayla okunmaktadır. En kalıcı çözüm dosyayı UTF-8 olarak yeniden kaydetmektir. Altyazı aracındaki karakter onarma seçeneği bu dönüşümleri otomatik yapar; konunun genel açıklaması [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazımızdadır.",
        "Eski bir televizyon ya da oynatıcı Türkçe harfleri hiçbir kodlamada gösteremiyorsa son çare olarak harfleri İngilizce karşılıklarına çevirebilirsiniz; [[arac:turkce-karakter-donustur|Türkçe karakter dönüştürücü]] ç, ğ, ı, ö, ş, ü harflerini c, g, i, o, s, u'ya çevirir. Bu yöntem okunabilirliği azalttığı için yalnızca zorunlu durumlarda kullanılmalıdır."
      ]
    },
    {
      h: "SRT dosyası nasıl açılır, düzenlenir ve videoya eklenir?",
      ul: [
        "<strong>Açmak ve düzenlemek:</strong> SRT düz metin olduğu için Not Defteri ya da herhangi bir metin düzenleyiciyle açılır. Düzenledikten sonra dosyayı .srt uzantısı ve UTF-8 kodlamasıyla kaydedin; uzantının .txt'ye dönüşmediğinden emin olun.",
        "<strong>Bilgisayarda izlerken:</strong> SRT dosyasını videoyla aynı klasöre ve aynı adla koyun (film.mp4 ve film.srt). Birden fazla dil için film.tr.srt gibi dil kodu eklemek birçok oynatıcıda işe yarar.",
        "<strong>Televizyonda izlerken:</strong> USB bellekte video ve SRT aynı adla aynı klasörde durmalıdır. Bazı televizyonlar UTF-8 yerine Windows-1254 bekleyebilir; Türkçe harfler bozuksa diğer kodlamayı deneyin.",
        "<strong>Video paylaşım platformunda:</strong> Video yükledikten sonra altyazı bölümünden SRT ya da VTT dosyasını yükleyebilirsiniz; izleyici altyazıyı açıp kapatabilir.",
        "<strong>Kalıcı (gömülü) altyazı:</strong> Yazının görüntüye işlenmesi gerekiyorsa (sosyal medya videoları gibi) bir video düzenleme programında altyazıyı \"yakmanız\" gerekir. Bu yöntemde altyazı kapatılamaz ve sonradan düzeltilemez."
      ]
    },
    {
      h: "İyi bir altyazının ölçüleri",
      p: [
        "Altyazı hazırlarken ya da düzenlerken izleyicinin rahat okuyabilmesi için yaygın olarak benimsenen bazı kurallar vardır. Bu değerler kurumdan kuruma biraz farklılık gösterse de iyi bir başlangıç noktasıdır."
      ],
      ul: [
        "Bir blokta en fazla iki satır kullanın ve her satırı yaklaşık 40 karakter civarında tutun.",
        "Bir altyazı ekranda en az bir saniye, en fazla altı yedi saniye kalsın.",
        "Okuma hızını saniyede yaklaşık 15–17 karakteri aşmayacak biçimde ayarlayın; çocuklara yönelik içerikte daha yavaş tutun.",
        "Ardışık iki blok arasında birkaç karelik boşluk bırakın ki göz yeni altyazının geldiğini fark etsin.",
        "Satırları anlam bütünlüğünü bozmayacak yerlerden bölün; edat ile isim, sıfat ile isim aynı satırda kalsın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Milisaniyeyi saniye sanmak:</strong> 00:00:05,500 beş buçuk saniyedir; virgülden sonraki üç hane milisaniyedir.",
        "<strong>fps farkına sabit kaydırma uygulamak:</strong> Kayma giderek büyüyorsa önce hız oranını düzeltin.",
        "<strong>Boş satırları silmek:</strong> Bloklar arasındaki boş satır kalkarsa oynatıcı dosyayı okuyamaz ya da altyazılar birleşir.",
        "<strong>Dosyayı yanlış kodlamayla kaydetmek:</strong> Türkçe harfler bozulursa dosyayı UTF-8 olarak yeniden kaydedin.",
        "<strong>Sıra numarasını önemsememek:</strong> Satır ekleyip sildikten sonra numaralar atlanırsa bazı katı oynatıcılar hata verebilir; düzenleme sonrası yeniden numaralandırmak iyi bir alışkanlıktır."
      ]
    }
  ],
  faq: [
    ["SRT dosyası nedir?", "SRT, her altyazı satırını sıra numarası, başlangıç ve bitiş zamanı ve metinle tanımlayan düz metin bir altyazı dosyasıdır. Neredeyse tüm video oynatıcılar, televizyonlar ve video platformları tarafından desteklenir."],
    ["Altyazı geride kalıyorsa nasıl düzeltilir?", "Altyazı baştan sona aynı miktarda geç geliyorsa tüm başlangıç ve bitiş zamanlarından o süreyi çıkarırsınız. Farkı, videodaki bir konuşmanın başladığı an ile altyazıdaki zamanı karşılaştırarak bulabilirsiniz."],
    ["Altyazı kaydırma nasıl yapılır?", "Bir altyazı düzenleme aracında kaydırma süresini artı ya da eksi saniye olarak yazarsınız ve tüm zamanlar birlikte güncellenir. Kayma video ilerledikçe büyüyorsa önce kare hızı farkını düzeltmeniz gerekir."],
    ["SRT ve VTT farkı nedir?", "VTT, WEBVTT başlığıyla başlar, milisaniyeyi virgül yerine noktayla ayırır ve konum ile stil bilgisi taşıyabilir. Web sayfalarındaki video oynatıcılar VTT, masaüstü oynatıcılar ve televizyonlar daha çok SRT kullanır."],
    ["SRT dosyası nasıl düzenlenir?", "SRT düz metin olduğu için Not Defteri gibi bir metin düzenleyiciyle açıp düzenleyebilirsiniz. Kaydederken uzantının .srt kalmasına, kodlamanın UTF-8 olmasına ve bloklar arasındaki boş satırların korunmasına dikkat edin."],
    ["Altyazıdaki Türkçe karakterler neden bozuk çıkar?", "Dosyanın karakter kodlaması oynatıcının beklediğinden farklıdır. Eski Türkçe altyazılar çoğunlukla Windows-1254 ile kaydedilmiştir; dosyayı UTF-8 olarak yeniden kaydetmek ya da oynatıcıda kodlamayı değiştirmek sorunu çözer."],
    ["Videoya altyazı nasıl eklenir?", "Bilgisayarda izlemek için SRT dosyasını videoyla aynı ad ve klasöre koymanız yeterlidir. Video platformlarında altyazı bölümünden dosyayı yüklersiniz. Görüntüye kalıcı yazı için video düzenleme programında altyazıyı gömmeniz gerekir."],
    ["Zaman kodu formatı nasıl okunur?", "SRT'de zaman saat:dakika:saniye,milisaniye biçimindedir; 00:42:12,700 videonun 42. dakikasının 12,7. saniyesidir. Video programlarındaki SS:DD:SN:KK biçiminde ise son hane kare numarasıdır."],
    ["23,976 ve 25 fps altyazı nasıl uyumlu hâle getirilir?", "23,976 fps için hazırlanmış altyazıyı 25 fps videoya uyarlamak için tüm zamanlar 0,95904 ile çarpılır; ters durumda 1,04271 ile çarpılır. Altyazı araçlarındaki fps dönüştürme seçeneği bu hesabı otomatik yapar."]
  ],
  tools: ["altyazi-araci", "zaman-kodu-cevir", "turkce-karakter-donustur"],
  related: ["turkce-karakter-sorunu-nasil-duzeltilir", "gb-kac-mb-veri-birimleri"],
  sources: [
    ["W3C – WebVTT: The Web Video Text Tracks Format", "https://www.w3.org/TR/webvtt1/"]
  ]
};
