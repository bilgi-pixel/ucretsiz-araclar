export default {
  slug: "takvime-etkinlik-ekleme-ics-dosyasi",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Takvime Etkinlik ve Hatırlatıcı Nasıl Eklenir? ICS Dosyası Nedir",
  pageTitle: "ICS Dosyası Nedir? Takvime Etkinlik ve Hatırlatıcı Ekleme",
  description: "ICS, etkinliği her takvim uygulamasının okuyabildiği iCalendar biçimidir. Dosyayı açma, tekrarlayan etkinlik, hatırlatıcı ve saat dilimi hatası örnekli.",
  keywords: ["ics dosyası nedir", "takvime etkinlik ekleme", "takvim hatırlatıcı", "takvim daveti oluşturma", "ics nasıl açılır", "telefon takvimine ekleme", "icalendar", "takvime ekle bağlantısı"],
  lead: "ICS dosyası, bir etkinliğin başlığını, tarihini, saatini, yerini ve hatırlatıcısını tüm yaygın takvim uygulamalarının okuyabildiği iCalendar biçiminde saklayan küçük bir metin dosyasıdır. Dosyayı açtığınızda telefonunuz ya da bilgisayarınız etkinliği takviminize eklemeyi önerir. Bu sayfada ICS dosyasının içini satır satır inceliyor, nasıl açılacağını, tekrarlayan etkinlik ve hatırlatıcı tanımlamayı, saat dilimi hatalarının nedenini ve etkinliği web sitesinde \"takvime ekle\" bağlantısıyla paylaşmayı anlatıyoruz.",
  kisaCevap: [
    "ICS (iCalendar), takvim verisi için açık bir standarttır; tek dosyada bir ya da birden çok etkinlik bulunabilir.",
    "Dosya düz metindir: BEGIN:VEVENT ile başlayan blokta SUMMARY başlığı, DTSTART başlangıcı, DTEND bitişi tutar.",
    "Saat sonundaki Z harfi UTC demektir; Türkiye saati UTC+3 olduğu için 10:00 toplantı 07:00Z olarak yazılır.",
    "Tekrarlayan etkinlik RRULE satırıyla tanımlanır: FREQ=WEEKLY;COUNT=4 dört hafta boyunca tekrarlar.",
    "Hatırlatıcı VALARM bloğuyla eklenir; TRIGGER:-PT15M etkinlikten 15 dakika önce uyarı verir."
  ],
  figure: {
    alt: "Bir ICS dosyasının katmanları: dışta VCALENDAR, içinde VEVENT, en içte VALARM. Yanlarında başlık, başlangıç saati 07:00Z yani Türkiye saatiyle 10:00, haftalık dört tekrar ve 15 dakika önce hatırlatma etiketleri.",
    caption: "ICS dosyası iç içe bloklardan oluşur. Örnekteki etkinlik 3 Aralık 2026 Perşembe saat 10:00'da (Türkiye) başlar, dört hafta tekrarlanır ve 15 dakika önce hatırlatır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">ICS dosyasının iç yapısı</text>
  <rect x="20" y="48" width="430" height="356" rx="10" class="sf sb"/>
  <text x="36" y="74" class="b p">BEGIN:VCALENDAR</text>
  <text x="36" y="96" class="sm t2">VERSION:2.0 · takvim kabı</text>
  <rect x="40" y="110" width="390" height="252" rx="8" class="ps"/>
  <text x="56" y="134" class="b p">BEGIN:VEVENT</text>
  <text x="56" y="160" class="sm">SUMMARY:Ekip toplantısı</text>
  <text x="56" y="182" class="sm">DTSTART:20261203T070000Z</text>
  <text x="56" y="204" class="sm">DTEND:20261203T080000Z</text>
  <text x="56" y="226" class="sm">RRULE:FREQ=WEEKLY;COUNT=4</text>
  <rect x="60" y="242" width="350" height="100" rx="8" class="oks"/>
  <text x="76" y="266" class="b ok">BEGIN:VALARM</text>
  <text x="76" y="290" class="sm">TRIGGER:-PT15M</text>
  <text x="76" y="312" class="sm">ACTION:DISPLAY</text>
  <text x="76" y="334" class="b ok">END:VALARM</text>
  <text x="56" y="384" class="b p">END:VEVENT · END:VCALENDAR</text>
  <rect x="470" y="110" width="230" height="56" rx="8" class="p"/>
  <text x="585" y="134" class="b mid sf">07:00Z = 10:00 TSİ</text>
  <text x="585" y="154" class="sm mid sf">Z: UTC · Türkiye UTC+3</text>
  <line x1="300" y1="178" x2="466" y2="140" class="sp dash" fill="none"/>
  <rect x="470" y="186" width="230" height="56" rx="8" class="sf sb"/>
  <text x="585" y="210" class="b mid">4 Perşembe tekrar</text>
  <text x="585" y="230" class="sm mid t2">3, 10, 17, 24 Aralık</text>
  <line x1="290" y1="222" x2="466" y2="214" class="sp dash" fill="none"/>
  <rect x="470" y="262" width="230" height="56" rx="8" class="oks"/>
  <text x="585" y="286" class="b mid">Uyarı 09:45'te</text>
  <text x="585" y="306" class="sm mid">15 dakika önce</text>
  <line x1="200" y1="286" x2="466" y2="290" class="sok dash" fill="none"/>
  <rect x="470" y="338" width="230" height="66" rx="8" class="sf sb"/>
  <text x="585" y="362" class="sm mid b">Düz metin dosyası</text>
  <text x="585" y="382" class="sm mid t2">uzantı .ics · UTF-8</text>
</svg>`
  },
  sections: [
    {
      h: "ICS dosyası nedir?",
      p: [
        "ICS, iCalendar standardına göre yazılmış takvim dosyalarının uzantısıdır. Standart, farklı takvim programlarının birbirine etkinlik aktarabilmesi için geliştirilmiştir. Bir e-posta davetindeki \"takvime ekle\" düğmesi, bir okulun yayınladığı sınav takvimi ya da bir etkinlik sitesinden indirdiğiniz bilet hatırlatıcısı çoğu zaman arka planda bir ICS dosyasıdır.",
        "ICS dosyasının en büyük avantajı evrensel olmasıdır. Aynı dosyayı bilgisayarınızdaki e-posta programının takviminde, telefonunuzun yerleşik takviminde ya da tarayıcıdan kullandığınız çevrim içi takvimde açabilirsiniz. Dosya düz metin olduğu için çok küçüktür; tek bir etkinlik genellikle 1 KB'ın altındadır ve e-postayla kolayca gönderilir.",
        "Kişi kartları için kullanılan vCard biçimiyle karıştırılmamalıdır. vCard (VCF) rehbere kişi ekler, ICS takvime etkinlik ekler. İki biçimin yazım mantığı birbirine benzer; kişi kartlarını [[bilgi:vcard-vcf-dosyasi-nedir-rehbere-kisi-aktarma|vCard dosyası]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "Bir ICS dosyasının içinde ne yazar?",
      p: [
        "ICS dosyasını bir metin düzenleyiciyle açtığınızda, her satırın \"ALAN:DEĞER\" biçiminde yazıldığını görürsünüz. Dosya VCALENDAR bloğuyla başlar ve biter; içinde bir ya da daha fazla VEVENT (etkinlik) bloğu bulunur. Aşağıda, Türkiye saatiyle 10:00'da başlayan bir saatlik toplantının en sade hali yer alıyor."
      ],
      formula: "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Ornek//Takvim//TR\nBEGIN:VEVENT\nUID:toplanti-20261203@ornek\nDTSTAMP:20261115T090000Z\nDTSTART:20261203T070000Z\nDTEND:20261203T080000Z\nSUMMARY:Ekip toplantısı\nLOCATION:Toplantı salonu\nEND:VEVENT\nEND:VCALENDAR",
      table: {
        head: ["Alan", "Anlamı", "Örnek değer"],
        rows: [
          ["UID", "Etkinliğin benzersiz kimliği; güncellemede aynı kalmalı", "toplanti-20261203@ornek"],
          ["DTSTAMP", "Dosyanın oluşturulduğu an (UTC)", "20261115T090000Z"],
          ["DTSTART", "Başlangıç tarihi ve saati", "20261203T070000Z"],
          ["DTEND", "Bitiş tarihi ve saati", "20261203T080000Z"],
          ["SUMMARY", "Takvimde görünen başlık", "Ekip toplantısı"],
          ["LOCATION", "Yer bilgisi", "Toplantı salonu"],
          ["DESCRIPTION", "Açıklama, gündem, bağlantı notu", "Gündem: bütçe"]
        ]
      },
      after: [
        "Tarih ve saat \"YYYYAAGG\" ve \"SSDDss\" biçiminde, aralarında T harfiyle yazılır: 20261203T070000 ifadesi 3 Aralık 2026 saat 07:00:00 demektir. Tüm gün etkinliklerinde saat kısmı yazılmaz ve değer tarih olarak işaretlenir; doğum günü gibi etkinlikler bu biçimde tanımlanır. UID alanı önemlidir: aynı UID ile gönderilen ikinci dosya takvimde yeni bir etkinlik açmak yerine mevcut etkinliği günceller."
      ]
    },
    {
      h: "ICS dosyası nasıl açılır?",
      p: [
        "Çoğu cihazda ICS dosyasına dokunmak ya da çift tıklamak yeterlidir. İşletim sistemi dosyayı varsayılan takvim uygulamasıyla açar ve etkinliği eklemek isteyip istemediğinizi sorar. Bazı durumlarda ise ek adımlar gerekir."
      ],
      ul: [
        "<strong>Bilgisayarda:</strong> dosyaya çift tıklayın; e-posta programınızın takvimi etkinliği önizler. Varsayılan program yanlışsa sağ tıklayıp \"Birlikte aç\" ile takvim uygulamanızı seçin.",
        "<strong>Telefonda:</strong> e-postadaki ya da indirilenlerdeki dosyaya dokunun; yerleşik takvim \"Takvime ekle\" ekranını açar. Hangi takvim hesabına ekleneceğini seçmeyi unutmayın.",
        "<strong>Çevrim içi takvimde:</strong> tarayıcıdan kullandığınız takvimin ayarlarında \"İçe aktar\" bölümünü bulun, ICS dosyasını seçin ve etkinliklerin aktarılacağı takvimi belirleyin.",
        "<strong>İçeriğe bakmak için:</strong> dosyayı herhangi bir metin düzenleyiciyle açarak satırları okuyabilirsiniz; şüpheli bir dosyada açıklama ve bağlantıları bu yolla kontrol etmek güvenlidir."
      ],
      after: [
        "Tanımadığınız kişilerden gelen takvim davetlerine dikkat edin. İstenmeyen davetler, açıklama alanına yerleştirilmiş sahte bağlantılarla oltalama amacıyla kullanılabilir. Bağlantıya tıklamadan önce adresi kontrol etmenin yollarını [[bilgi:oltalama-sahte-link-nasil-anlasilir|oltalama bağlantıları]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Çevrim içi takvime, e-posta takvimine ve telefona ICS ile etkinlik eklemek",
      p: [
        "ICS standardı açık olduğu için yaygın takvim uygulamalarının tamamı dosyayı içe aktarabilir. Uygulamalar arasındaki farklar ayrıntıdadır: bazıları tekrar kurallarının tümünü desteklemez, bazıları hatırlatıcıyı kendi varsayılan ayarıyla değiştirir, bazıları da dosyadaki renk ya da kategori bilgisini yok sayar.",
        "İçe aktarma ile abonelik arasındaki farkı da bilmek gerekir. İçe aktardığınız ICS dosyası takviminize bir kez kopyalanır; dosyayı hazırlayan kişi sonradan değişiklik yaparsa sizin takviminiz güncellenmez. Bir takvime abone olmak ise bir web adresindeki ICS içeriğinin düzenli aralıklarla yeniden okunmasıdır; okul tatilleri veya maç fikstürü gibi değişebilecek takvimlerde abonelik daha uygundur."
      ],
      table: {
        head: ["Yöntem", "Nasıl çalışır", "Ne zaman uygun"],
        rows: [
          ["ICS dosyasını açmak", "Etkinlik bir kez kopyalanır", "Tek seferlik randevu, toplantı, bilet"],
          ["İçe aktar (çoklu)", "Dosyadaki tüm etkinlikler eklenir", "Sınav takvimi, ders programı"],
          ["Takvim aboneliği", "Adres düzenli aralıklarla yeniden okunur", "Değişebilecek fikstür, tatil listesi"],
          ["E-posta daveti", "Katıl / reddet cevabı gönderilebilir", "Katılımcısı olan toplantılar"]
        ]
      }
    },
    {
      h: "Tekrarlayan etkinlik ICS'te nasıl tanımlanır?",
      p: [
        "Her hafta tekrar eden bir ders ya da her ay ödenen bir fatura için tek tek etkinlik oluşturmak gerekmez. VEVENT bloğuna eklenen tek bir <code>RRULE</code> (tekrar kuralı) satırı, takvim uygulamasına etkinliği hangi düzenle çoğaltacağını söyler."
      ],
      formula: "RRULE:FREQ=WEEKLY;COUNT=4\n→ 4 hafta, her hafta aynı gün\nRRULE:FREQ=MONTHLY;BYMONTHDAY=15;UNTIL=20271231T000000Z\n→ her ayın 15'i, 2027 sonuna kadar\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR\n→ her pazartesi, çarşamba ve cuma",
      ol: [
        "<strong>FREQ</strong> sıklığı belirler: DAILY (günlük), WEEKLY (haftalık), MONTHLY (aylık), YEARLY (yıllık).",
        "<strong>INTERVAL</strong> aralığı belirler: INTERVAL=2 ile haftalık kural iki haftada bir tekrarlanır.",
        "<strong>COUNT</strong> toplam tekrar sayısını, <strong>UNTIL</strong> son tarihi verir; ikisi aynı kuralda birlikte kullanılmaz.",
        "<strong>BYDAY</strong> haftanın günlerini iki harfli İngilizce kısaltmayla seçer: MO, TU, WE, TH, FR, SA, SU."
      ],
      after: [
        "Örneğimizde 3 Aralık 2026 Perşembe başlayan toplantı, FREQ=WEEKLY;COUNT=4 kuralıyla 3, 10, 17 ve 24 Aralık tarihlerinde dört kez görünür. Tekrarlardan biri iptal edilirse EXDATE satırıyla o tarih kuraldan çıkarılabilir."
      ]
    },
    {
      h: "Hatırlatıcı (alarm) ICS'e eklenebilir mi?",
      p: [
        "Evet. VEVENT bloğunun içine yerleştirilen bir <code>VALARM</code> bloğu, etkinlikten önce uyarı verilmesini sağlar. TRIGGER satırı uyarının zamanını süre biçiminde tutar: eksi işareti \"önce\" demektir, PT15M 15 dakika, PT1H 1 saat, P1D 1 gün anlamına gelir. Aynı etkinliğe birden fazla VALARM bloğu ekleyerek, örneğin bir gün önce ve bir saat önce iki ayrı hatırlatma kurabilirsiniz."
      ],
      formula: "BEGIN:VALARM\nTRIGGER:-PT15M\nACTION:DISPLAY\nDESCRIPTION:Toplantı 15 dakika sonra\nEND:VALARM",
      after: [
        "Bazı takvim uygulamaları güvenlik nedeniyle dışarıdan gelen dosyalardaki alarmları yok sayar ve kendi varsayılan hatırlatıcısını uygular. Etkinliği ekledikten sonra hatırlatıcının görünüp görünmediğini kontrol edin. Takvime bağlı olmadan, yalnızca birkaç dakika içinde uyarı almak istiyorsanız [[arac:online-alarm|Online Alarm]] sekme açıkken sesli uyarı verir."
      ]
    },
    {
      h: "Saat dilimi hatası neden olur?",
      p: [
        "ICS dosyalarında en sık karşılaşılan sorun, etkinliğin takvimde bir ya da birkaç saat kaymış görünmesidir. Bunun nedeni saatin üç farklı biçimde yazılabilmesidir: UTC olarak (sonunda Z harfiyle), belirli bir saat dilimine bağlı olarak (TZID parametresiyle) ya da hiçbir dilim belirtilmeden \"yerel\" olarak. Üçüncü biçim, dosyayı açan cihazın kendi saat dilimiyle yorumlanır ve başka ülkedeki bir katılımcıda farklı saat gösterir."
      ],
      ul: [
        "<strong>Z ile UTC:</strong> Türkiye UTC+3 olduğu için 10:00'daki etkinlik 07:00Z yazılır. Z'yi unutup 100000 yazarsanız bazı uygulamalar bunu 10:00 UTC, yani Türkiye'de 13:00 olarak gösterir.",
        "<strong>TZID ile:</strong> DTSTART;TZID=Europe/Istanbul:20261203T100000 biçimi okunaklıdır; ancak dosyada saat dilimi tanımı da bulunmalıdır.",
        "<strong>Yaz saati farkı:</strong> Türkiye 2016'dan beri yıl boyu UTC+3 kullanır, Avrupa ülkeleri ise mart ve ekimde saat değiştirir. Avrupa'daki katılımcılarla kurulan tekrarlayan toplantılar bu tarihlerde bir saat kayabilir."
      ],
      after: [
        "Türkiye'nin saat uygulamasını ve Avrupa ile farkın nasıl değiştiğini [[bilgi:turkiye-yaz-saati-kis-saati-uygulamasi|Türkiye'de yaz saati]] yazısında ayrıntılı anlatıyoruz. UTC kavramını ve bilgisayarların zamanı nasıl sakladığını [[bilgi:unix-zaman-damgasi-nedir|Unix zaman damgası]] yazısı açıklar."
      ]
    },
    {
      h: "Bir etkinliği web sitesinde \"takvime ekle\" bağlantısıyla paylaşmak",
      p: [
        "Bir işletme, dernek ya da okul olarak etkinlik duyuruyorsanız ziyaretçilerin tarihi kaçırmaması için \"takvime ekle\" seçeneği sunmak işe yarar. En evrensel yol, etkinliğin ICS dosyasını hazırlayıp sitenize yüklemek ve duyurunun altına \"Takvime ekle (.ics)\" bağlantısı koymaktır. Ziyaretçi bağlantıya tıkladığında dosya iner ve kendi takvim uygulamasında açılır."
      ],
      ol: [
        "[[arac:ics-etkinlik-olustur|ICS Etkinlik Oluştur]] aracına başlık, tarih, saat, konum ve açıklamayı yazın.",
        "Tüm gün etkinliği mi yoksa saatli etkinlik mi olduğunu seçin; saatli etkinliklerde araç saati UTC'ye çevirir.",
        "Gerekiyorsa hatırlatma süresini belirleyin.",
        "Oluşan metni .ics uzantılı dosya olarak indirin ve sitenize ya da e-postanıza ekleyin.",
        "Yayınlamadan önce dosyayı kendi telefonunuzda ve bilgisayarınızda açarak saatin doğru göründüğünü kontrol edin."
      ],
      after: [
        "Kişisel kullanım için yıl içindeki doğum günü ve yıl dönümlerini toplu görmek isterseniz [[arac:ozel-gunler-takvimi|Özel Günler Takvimi]] yazdırılabilir bir liste hazırlar."
      ]
    }
  ],
  faq: [
    ["ICS dosyası nedir?", "ICS, iCalendar standardına göre yazılmış takvim dosyasıdır. İçinde etkinliğin başlığı, tarihi, saati, yeri ve hatırlatıcısı düz metin olarak bulunur; yaygın takvim uygulamalarının tamamı bu dosyayı okuyabilir."],
    ["ICS dosyası nasıl açılır?", "Telefonda dosyaya dokunmak, bilgisayarda çift tıklamak çoğu zaman yeterlidir; takvim uygulaması etkinliği eklemeyi önerir. Çevrim içi takvimlerde ise ayarlardaki içe aktar bölümünden dosyayı seçmeniz gerekir."],
    ["Çevrim içi takvime ICS ile etkinlik nasıl eklenir?", "Takvimin ayarlarında içe aktar seçeneğini açın, ICS dosyasını seçin ve etkinliğin ekleneceği takvimi belirleyin. Değişebilecek takvimler için dosyayı içe aktarmak yerine ICS adresine abone olmak daha uygundur."],
    ["E-posta takviminde ve telefon takviminde ICS çalışır mı?", "Evet. iCalendar açık bir standart olduğu için e-posta programlarının takvimleri ve telefonların yerleşik takvimleri ICS dosyalarını açar. Bazı uygulamalar karmaşık tekrar kurallarını ya da dosyadaki alarmları desteklemeyebilir."],
    ["Tekrarlayan etkinlik ICS'te nasıl tanımlanır?", "Etkinlik bloğuna bir RRULE satırı eklenir. FREQ sıklığı, INTERVAL aralığı, COUNT tekrar sayısını, UNTIL son tarihi, BYDAY ise haftanın günlerini belirler; FREQ=WEEKLY;COUNT=4 dört hafta tekrar eder."],
    ["Hatırlatıcı (alarm) ICS'e eklenebilir mi?", "Evet, etkinliğin içine bir VALARM bloğu yazılır. TRIGGER:-PT15M etkinlikten 15 dakika önce uyarı verir; birden fazla VALARM ile örneğin bir gün ve bir saat önce iki ayrı hatırlatma kurulabilir."],
    ["Saat dilimi hatası neden olur?", "Saat UTC, belirli bir saat dilimi ya da dilimsiz yerel saat olarak yazılabilir. Z harfi unutulursa ya da dilim belirtilmezse dosyayı açan cihaz saati farklı yorumlar ve etkinlik bir veya birkaç saat kaymış görünür."],
    ["Bir etkinliği web sitesinde takvime ekle bağlantısıyla nasıl paylaşırım?", "Etkinliğin ICS dosyasını hazırlayıp sitenize yükleyin ve duyurunun altına dosyaya giden bir bağlantı koyun. Ziyaretçi tıkladığında dosya iner ve kendi takviminde açılır; yayından önce saati kendi cihazınızda test edin."],
    ["ICS dosyası virüs taşır mı?", "ICS düz metin dosyasıdır ve kendi başına program çalıştırmaz. Ancak açıklama alanına sahte bağlantılar konabilir; tanımadığınız kişilerden gelen davetlerdeki bağlantılara tıklamadan önce adresi kontrol edin."]
  ],
  tools: ["ics-etkinlik-olustur", "online-alarm", "ozel-gunler-takvimi", "zaman-dilimi-cevirici"],
  related: ["vcard-vcf-dosyasi-nedir-rehbere-kisi-aktarma", "turkiye-yaz-saati-kis-saati-uygulamasi", "unix-zaman-damgasi-nedir"]
};
