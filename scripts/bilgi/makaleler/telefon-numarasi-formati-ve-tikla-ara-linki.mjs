export default {
  slug: "telefon-numarasi-formati-ve-tikla-ara-linki",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Telefon Numarası Formatı: +90 Nasıl Yazılır? E.164 ve Tıkla-Ara Linki",
  pageTitle: "Telefon Numarası Formatı +90 Nasıl Yazılır? Tıkla-Ara Linki",
  description: "Türkiye numarası uluslararası formatta +90 532 123 45 67 yazılır, baştaki 0 atılır. E.164 biçimi, tel: ve sms: bağlantısı, mailto ve WhatsApp linkinde numara yazımı.",
  keywords: ["telefon numarası formatı", "+90 nasıl yazılır", "uluslararası telefon formatı", "e.164 nedir", "tıkla ara linki", "tel link nedir", "sms linki oluşturma", "web sitesine arama butonu"],
  lead: "Türkiye'deki bir telefon numarası uluslararası formatta, başındaki <strong>0 atılıp yerine +90 yazılarak</strong> gösterilir: 0532 123 45 67 numarası <strong>+90 532 123 45 67</strong> olur. Makinelerin ve web bağlantılarının kullandığı standart biçim olan <strong>E.164</strong>'te aynı numara boşluksuz <code>+905321234567</code> şeklinde yazılır. Web sitenizde ziyaretçilerin tek dokunuşla arama yapabilmesi için bu biçimi <code>tel:+905321234567</code> bağlantısında kullanırsınız. Bu sayfada sabit hat ve cep numaralarının yazımını, SMS, e-posta ve WhatsApp bağlantılarını ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Türkiye ülke kodu 90'dır; uluslararası yazımda numaranın başındaki 0 kaldırılır ve +90 eklenir.",
    "Türkiye numaraları ülke kodundan sonra 10 hanedir: 3 haneli alan ya da operatör kodu ve 7 haneli abone numarası.",
    "E.164 biçimi: artı işareti, ülke kodu ve numara; boşluk, tire, parantez ve baştaki 0 yoktur, toplam en fazla 15 rakam.",
    "Tıkla-ara bağlantısı tel:+905321234567, SMS bağlantısı sms:+905321234567 biçimindedir.",
    "WhatsApp bağlantısında numara artı işareti ve 0 olmadan, yalnızca rakamlarla yazılır: 905321234567.",
    "+90'dan sonra 0 yazılmaz; +90 0532 yazımı hatalıdır ve bazı sistemlerde arama başarısız olur."
  ],
  figure: {
    alt: "Aynı telefon numarasının dört yazımı: ulusal 0532 123 45 67, uluslararası +90 532 123 45 67, E.164 +905321234567 ve tel: bağlantısı; numaranın ülke kodu, operatör kodu ve abone numarası parçaları.",
    caption: "Numara parçaları: ülke kodu (90), alan ya da operatör kodu (532) ve 7 haneli abone numarası. Ulusal yazımda başa 0 gelir, uluslararası yazımda 0 düşer ve +90 eklenir. Örnek numara temsilîdir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Bir numara, dört yazım</text>
  <rect x="110" y="50" width="100" height="56" rx="8" class="p"/>
  <text x="160" y="76" class="lg b mid sf">+90</text><text x="160" y="96" class="sm mid sf">ülke kodu</text>
  <rect x="220" y="50" width="110" height="56" rx="8" class="ps"/>
  <text x="275" y="76" class="lg b mid">532</text><text x="275" y="96" class="sm mid">alan/operatör</text>
  <rect x="340" y="50" width="270" height="56" rx="8" class="oks"/>
  <text x="475" y="76" class="lg b mid">123 45 67</text><text x="475" y="96" class="sm mid">7 haneli abone numarası</text>
  <text x="360" y="128" class="sm mid t2">Ülke kodundan sonra 10 hane · baştaki 0 yalnızca yurt içi aramada kullanılır</text>
  <g>
    <rect x="20" y="148" width="680" height="50" rx="8" class="sf sb"/>
    <text x="40" y="179" class="b">Ulusal</text><text x="250" y="179" class="lg">0532 123 45 67</text><text x="680" y="179" class="sm end t2">yurt içi, basılı</text>
    <rect x="20" y="206" width="680" height="50" rx="8" class="sf sb"/>
    <text x="40" y="237" class="b">Uluslararası</text><text x="250" y="237" class="lg">+90 532 123 45 67</text><text x="680" y="237" class="sm end t2">kartvizit, web</text>
    <rect x="20" y="264" width="680" height="50" rx="8" class="ps"/>
    <text x="40" y="295" class="b">E.164</text><text x="250" y="295" class="lg b p">+905321234567</text><text x="680" y="295" class="sm end t2">sistemler, veritabanı</text>
    <rect x="20" y="322" width="680" height="50" rx="8" class="p"/>
    <text x="40" y="353" class="b sf">Bağlantı</text><text x="250" y="353" class="lg sf">tel:+905321234567</text><text x="680" y="353" class="sm end sf">tıkla-ara</text>
  </g>
  <rect x="20" y="382" width="680" height="30" rx="6" class="dgs"/>
  <text x="360" y="402" class="b mid">Hatalı: +90 0532 … · 0090532 … (bağlantıda) · +90-532-…</text>
</svg>`
  },
  sections: [
    {
      h: "Türkiye telefon numarasının yapısı",
      p: [
        "Türkiye'de sabit ve mobil numaraların tamamı aynı yapıyı izler: yurt içinde arama yapılırken başa konan <strong>0</strong> (ulusal ön ek), ardından <strong>3 haneli alan ya da operatör kodu</strong> ve <strong>7 haneli abone numarası</strong>. Böylece yurt içinde yazılan bir numara 0 ile birlikte 11 hane, 0 olmadan 10 hanedir.",
        "Cep telefonu numaraları 5 ile başlayan kodlarla (ör. 532, 542, 555), sabit hatlar il alan kodlarıyla (ör. İstanbul Avrupa yakası 212, Anadolu yakası 216, Ankara 312, İzmir 232) başlar. 850 ile başlayan numaralar ve 444 ile başlayan yedi haneli kurumsal numaralar gibi özel numara türleri de vardır; 444 numaraları alan kodu olmadan aranır ve yurt dışından erişimi her zaman mümkün olmayabilir."
      ],
      table: {
        head: ["Numara türü", "Yurt içi yazım", "Uluslararası yazım", "E.164"],
        rows: [
          ["Cep telefonu", "0532 123 45 67", "+90 532 123 45 67", "+905321234567"],
          ["İstanbul sabit hat", "0212 123 45 67", "+90 212 123 45 67", "+902121234567"],
          ["Ankara sabit hat", "0312 123 45 67", "+90 312 123 45 67", "+903121234567"],
          ["0850 numarası", "0850 123 45 67", "+90 850 123 45 67", "+908501234567"]
        ],
        caption: "Tablodaki numaralar yalnızca biçimi göstermek için verilmiş temsilî örneklerdir."
      }
    },
    {
      h: "Türkiye numarası uluslararası formatta nasıl yazılır? +90'dan sonra sıfır yazılır mı?",
      p: [
        "Uluslararası formatta numaranın başındaki <strong>0 kaldırılır</strong> ve yerine artı işareti ile ülke kodu <strong>+90</strong> eklenir. 0 yalnızca yurt içinden yapılan aramalarda kullanılan bir ön ektir; ülke kodu yazıldığında görevi kalmaz. Bu nedenle <strong>+90'dan sonra 0 yazılmaz</strong>: doğru yazım +90 532 123 45 67, hatalı yazım +90 0532 123 45 67'dir.",
        "Artı işareti, \"bulunduğun ülkenin uluslararası çıkış kodunu kullan\" anlamına gelir. Türkiye'den ve Avrupa'nın büyük bölümünden yurt dışı çıkış kodu 00'dır; bu yüzden bazı yerlerde 0090 532 … yazımını görebilirsiniz. Ancak çıkış kodu ülkeden ülkeye değiştiği için kartvizitte, web sitesinde ve e-posta imzasında her yerden doğru çalışan <strong>+</strong> işaretini kullanmak en doğrusudur."
      ],
      ol: [
        "Numarayı yurt içi biçimde yazın: 0532 123 45 67.",
        "Baştaki 0'ı silin: 532 123 45 67.",
        "Başa +90 ekleyin: +90 532 123 45 67.",
        "Okunurluk için boşlukları 3-3-2-2 düzeninde bırakın; sistemlere kaydederken boşlukları kaldırın: +905321234567."
      ]
    },
    {
      h: "E.164 formatı nedir?",
      p: [
        "E.164, Uluslararası Telekomünikasyon Birliği'nin (ITU) telefon numaraları için belirlediği uluslararası numaralandırma planıdır. Bu plana göre bir numara <strong>ülke kodu</strong> ve <strong>ulusal anlamlı numaradan</strong> oluşur ve toplamda <strong>en fazla 15 rakam</strong> içerir. Yazılırken başa artı işareti konur; boşluk, tire, nokta, parantez ve ulusal ön ek (Türkiye'de baştaki 0) bulunmaz.",
        "E.164 biçimi insanların okuması için değil, sistemlerin numarayı tek ve tutarlı biçimde tanıması içindir. SMS gönderim sistemleri, müşteri veritabanları, çağrı merkezi yazılımları ve iki adımlı doğrulama servisleri numarayı genellikle bu biçimde ister. Türkiye numaraları E.164'te artı işaretinden sonra 12 rakamdır: 90 ve 10 haneli ulusal numara."
      ],
      table: {
        head: ["Kural", "Doğru", "Yanlış"],
        rows: [
          ["Başta artı ve ülke kodu", "+905321234567", "905321234567 (bazı sistemlerde)"],
          ["Ulusal ön ek yok", "+905321234567", "+9005321234567"],
          ["Ayırıcı karakter yok", "+905321234567", "+90 (532) 123-45-67"],
          ["En fazla 15 rakam", "12 rakam (Türkiye)", "Fazla ya da eksik hane"]
        ]
      },
      after: [
        "Veritabanında numaraları E.164 biçiminde saklayıp ekranda okunur biçimde göstermek en temiz yöntemdir. Böylece aynı numaranın \"0532…\", \"532…\" ve \"+90 532…\" gibi farklı kayıtları oluşmaz ve tekrar eden müşteri kayıtlarını ayıklamak kolaylaşır."
      ]
    },
    {
      h: "Web sitesine tıkla-ara bağlantısı nasıl eklenir?",
      p: [
        "Telefondan sitenize giren ziyaretçinin numaraya dokunarak arama başlatabilmesi için numarayı <code>tel:</code> şemalı bir bağlantı hâline getirirsiniz. Bağlantı adresinde numara E.164 biçiminde, boşluksuz yazılır; ekranda görünen metin ise okunaklı hâlde kalabilir. Örneğin bağlantının adresi <code>tel:+905321234567</code>, görünen metni \"+90 532 123 45 67\" olur.",
        "Masaüstü bilgisayarlarda tel: bağlantısına tıklandığında işletim sistemi kurulu bir arama uygulaması varsa onu açar, yoksa bir şey olmayabilir. Bu yüzden numarayı yalnızca bir \"Bizi arayın\" düğmesinin arkasına gizlemek yerine görünür metin olarak da yazmak, masaüstü kullanıcılarının numarayı okuyabilmesini sağlar."
      ],
      ul: [
        "Mağaza ve işletme sitelerinde tıkla-ara düğmesini sayfanın üst kısmında ve iletişim bölümünde gösterin.",
        "Bağlantıda boşluk, parantez ya da tire kullanmayın; bazı cihazlar bunları doğru yorumlamayabilir.",
        "Dahili numara gerekiyorsa bazı cihazlar virgülle beklemeli tuşlamayı destekler, ancak her cihazda çalışmayabilir; dahiliyi metin olarak da yazın."
      ],
      after: [
        "Doğru biçimde bağlantı ve kullanıma hazır kodu [[arac:tel-link-olustur|Telefon ve SMS Bağlantısı Oluşturma aracı]] üretir; numarayı uluslararası biçime de çevirir. Bağlantılardaki özel karakterlerin nasıl kodlandığını [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "SMS gönder bağlantısı nasıl yapılır?",
      p: [
        "SMS bağlantısı tel: bağlantısına benzer, yalnızca şema <code>sms:</code>'dir: <code>sms:+905321234567</code>. Ziyaretçi bağlantıya dokunduğunda telefonun mesaj uygulaması alıcısı dolu olarak açılır. İsterseniz mesaj metnini de önceden doldurabilirsiniz; bunun için numaranın arkasına <code>body</code> parametresi eklenir ve metindeki boşluk ile Türkçe karakterler URL kodlamasıyla yazılır.",
        "Mesaj metni parametresinin yazımında işletim sistemleri arasında küçük farklar vardır; bazı cihazlar soru işaretiyle (<code>?body=</code>), bazıları farklı ayırıcıyla daha iyi çalışır. Bu yüzden önceden doldurulmuş SMS bağlantısını hem Android hem iOS cihazda denemek iyi bir alışkanlıktır. Mesajın kaç karakter olacağını ve Türkçe karakterlerin uzunluğa etkisini [[bilgi:sms-kac-karakter|SMS kaç karakter]] yazısında görebilirsiniz."
      ]
    },
    {
      h: "Mailto bağlantısı nedir?",
      p: [
        "<code>mailto:</code> bağlantısı, tıklandığında ziyaretçinin e-posta programını alıcı adresi dolu olarak açar: <code>mailto:bilgi@ornekfirma.com.tr</code>. Konu ve gövde metni de eklenebilir: <code>?subject=</code> ile konu, <code>&body=</code> ile metin; birden fazla parametre <code>&</code> ile birleştirilir ve metindeki boşluklar %20 olarak kodlanır.",
        "Mailto bağlantıları özellikle teklif isteme ve destek talebi gibi durumlarda konu satırını standartlaştırmak için kullanışlıdır. Ancak ziyaretçinin cihazında bir e-posta programı tanımlı değilse bağlantı bir şey açmayabilir; bu yüzden e-posta adresini görünür metin olarak da yazmak gerekir. Bağlantıyı doğru kodlamayla [[arac:mailto-link-olustur|Mailto Bağlantısı Oluşturucu]] hazırlar."
      ]
    },
    {
      h: "WhatsApp bağlantısında numara nasıl yazılmalı?",
      p: [
        "WhatsApp'ın sohbet başlatma bağlantısında numara <strong>yalnızca rakamlardan</strong> oluşur: ülke kodu ve numara yazılır, artı işareti, baştaki 0, boşluk ve tire kullanılmaz. Türkiye'deki 0532 123 45 67 numarası bağlantıda <strong>905321234567</strong> olarak yer alır. Önceden doldurulmuş mesaj eklemek için text parametresi kullanılır ve metin URL kodlamasıyla yazılır.",
        "En sık yapılan hata numarayı 0 ile ya da ülke kodu olmadan yazmaktır; bu durumda bağlantı yanlış numaraya yönlenir ya da \"numara WhatsApp'ta değil\" uyarısı çıkar. Bağlantıyı [[arac:whatsapp-link|WhatsApp Link Oluşturucu]] ile hazırlayabilir, işletme hesabı ve bağlantı kullanımı için [[rehber:whatsapp-is-hesabi-ve-link-kullanimi|WhatsApp iş hesabı rehberine]] bakabilirsiniz."
      ],
      table: {
        head: ["Bağlantı türü", "Numara biçimi", "Örnek"],
        rows: [
          ["Tıkla-ara", "E.164, artı ile", "tel:+905321234567"],
          ["SMS", "E.164, artı ile", "sms:+905321234567"],
          ["WhatsApp", "Yalnızca rakam, artısız", "905321234567"],
          ["Görünen metin", "Okunur, boşluklu", "+90 532 123 45 67"]
        ]
      }
    },
    {
      h: "Numara listesi tek seferde nasıl biçimlendirilir?",
      p: [
        "Bir müşteri listesindeki numaralar genellikle karışık biçimlerde gelir: \"0532 123 45 67\", \"5321234567\", \"+90 (532) 123-45-67\", \"0090 532…\" gibi. Bunları tek tek düzeltmek yerine aynı kuralı hepsine uygulayan bir dönüştürücü kullanmak hem zaman kazandırır hem de hataları azaltır."
      ],
      ol: [
        "Numaralardaki boşluk, tire, nokta ve parantezleri kaldırın.",
        "Başta 0090 varsa 90'a, başta +90 varsa 90'a indirin.",
        "Başta tek 0 varsa silin; geriye 10 hane kalmalıdır.",
        "10 hanenin başına 90 ekleyin ve E.164 için artı işareti koyun.",
        "10 haneye ulaşmayan ya da fazla olan numaraları ayrı bir listeye alıp elle kontrol edin."
      ],
      after: [
        "[[arac:telefon-numarasi-bicimlendir|Telefon Numarası Biçimlendirme aracı]] bu adımları uygular; numarayı +90 uluslararası, 0 ile ulusal, E.164 ve tel: bağlantısı biçimlerinde gösterir ve cep ya da sabit hat olduğunu belirtir. Araç tarayıcınızda çalışır, numaralar hiçbir sunucuya gönderilmez. Kişisel verilerin bulunduğu listeleri paylaşırken kişisel verilerin korunmasına ilişkin yükümlülüklerinizi göz önünde bulundurun."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>+90'dan sonra 0 yazmak:</strong> +90 0532 … hatalıdır; 0 ülke kodu yazıldığında düşer.",
        "<strong>Bağlantıda boşluk ve parantez:</strong> tel: ve sms: adreslerinde yalnızca artı ve rakam kullanın.",
        "<strong>WhatsApp'ta artı ya da 0 kullanmak:</strong> Bağlantıda numara yalnızca rakamlardan oluşmalıdır.",
        "<strong>Ülke kodunu unutmak:</strong> Yurt dışındaki ziyaretçiler ve bazı uygulamalar ülke kodsuz numarayı tanımaz.",
        "<strong>Görsel içinde numara:</strong> Resim olarak eklenen numara tıklanamaz ve kopyalanamaz.",
        "<strong>Farklı biçimlerde kayıt:</strong> Veritabanında karışık biçimler tekrar eden kayıtlara yol açar; E.164'te saklayın."
      ],
      after: [
        "E-posta imzanıza tıklanabilir numara eklemek isterseniz [[bilgi:e-posta-imzasi-nasil-olusturulur|e-posta imzası nasıl oluşturulur]] yazısı adım adım anlatır."
      ]
    }
  ],
  faq: [
    ["Türkiye telefon numarası uluslararası formatta nasıl yazılır?", "Numaranın başındaki 0 kaldırılır ve yerine +90 yazılır. 0532 123 45 67 numarası uluslararası formatta +90 532 123 45 67 olur. Sistemlerde kullanılan E.164 biçiminde ise aynı numara boşluksuz olarak +905321234567 yazılır."],
    ["+90'dan sonra sıfır yazılır mı?", "Hayır. Baştaki 0 yalnızca yurt içi aramalarda kullanılan ulusal ön ektir ve ülke kodu yazıldığında düşer. +90 0532 yazımı hatalıdır ve bazı sistemlerde aramanın başarısız olmasına yol açar; doğru yazım +90 532 biçimindedir."],
    ["E.164 formatı nedir?", "E.164, Uluslararası Telekomünikasyon Birliği'nin telefon numaraları için belirlediği numaralandırma planıdır. Numara artı işareti, ülke kodu ve ulusal numaradan oluşur; boşluk, tire, parantez ve ulusal ön ek içermez ve en fazla 15 rakamdır. Türkiye numaraları artıdan sonra 12 rakamdır."],
    ["Web sitesine tıkla-ara bağlantısı nasıl eklenir?", "Numarayı tel: şemalı bir bağlantıya dönüştürürsünüz; bağlantı adresinde numara boşluksuz E.164 biçiminde, yani tel:+905321234567 şeklinde yazılır. Ekranda görünen metin okunaklı kalabilir. Masaüstü kullanıcıları için numarayı metin olarak da gösterin."],
    ["SMS gönder bağlantısı nasıl yapılır?", "sms: şemasıyla ve E.164 numarayla bağlantı oluşturulur: sms:+905321234567. Mesaj metnini önceden doldurmak için body parametresi eklenir ve metin URL kodlamasıyla yazılır. Parametre yazımı işletim sistemine göre farklı davranabildiği için iki platformda da deneyin."],
    ["Mailto bağlantısı nedir?", "Mailto bağlantısı tıklandığında ziyaretçinin e-posta programını alıcı adresi dolu olarak açan bağlantıdır. Konu için subject, metin için body parametresi eklenebilir ve boşluklar yüzde 20 olarak kodlanır. Cihazda e-posta programı yoksa çalışmayabileceği için adresi metin olarak da yazın."],
    ["WhatsApp bağlantısında numara nasıl yazılmalı?", "WhatsApp sohbet bağlantısında numara yalnızca rakamlardan oluşur: ülke kodu ve numara yazılır, artı işareti, baştaki 0, boşluk ve tire kullanılmaz. 0532 123 45 67 numarası bağlantıda 905321234567 olarak yer alır."],
    ["Numara listesi tek seferde nasıl biçimlendirilir?", "Önce boşluk, tire ve parantezler kaldırılır, baştaki 0090, +90 ya da 0 temizlenip 10 haneli ulusal numara elde edilir, ardından başına +90 eklenir. Bu kuralı tüm listeye uygulayan bir biçimlendirme aracı hataları ve zaman kaybını azaltır."],
    ["Yurt dışından Türkiye nasıl aranır?", "Aramanın yapıldığı ülkenin uluslararası çıkış kodu, ardından 90 ve 10 haneli numara tuşlanır. Cep telefonlarında çıkış kodu yerine artı işareti kullanılabilir: +90 532 123 45 67. Artı işareti her ülkede doğru çıkış koduna dönüştürüldüğü için en güvenli yazımdır."]
  ],
  tools: ["telefon-numarasi-bicimlendir", "tel-link-olustur", "mailto-link-olustur", "whatsapp-link"],
  related: ["e-posta-imzasi-nasil-olusturulur", "sms-kac-karakter", "url-kodlama-yuzde-20-nedir"],
  sources: [
    ["ITU – E.164 uluslararası numaralandırma planı", "https://www.itu.int/rec/T-REC-E.164/"],
    ["Bilgi Teknolojileri ve İletişim Kurumu", "https://www.btk.gov.tr/"]
  ]
};
