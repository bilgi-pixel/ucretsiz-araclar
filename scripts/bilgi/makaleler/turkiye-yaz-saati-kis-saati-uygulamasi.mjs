export default {
  slug: "turkiye-yaz-saati-kis-saati-uygulamasi",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Türkiye'de Yaz Saati Var mı? Kalıcı UTC+3 ve Saat Farkları Nasıl Değişir",
  pageTitle: "Türkiye'de Yaz Saati Var mı? Kalıcı UTC+3 ve Avrupa Saat Farkı",
  description: "Türkiye 2016'dan beri yıl boyu UTC+3 kullanır, saatler ileri ya da geri alınmaz. Avrupa ve ABD saat değiştirince farkın nasıl değiştiği tarih ve örneklerle.",
  keywords: ["türkiye yaz saati", "kış saati uygulaması", "saatler geri alınacak mı", "türkiye utc+3", "avrupa ile saat farkı", "saat değişimi ne zaman", "kalıcı yaz saati", "türkiye saat dilimi"],
  lead: "Türkiye'de yaz saati ve kış saati uygulaması yoktur: 8 Eylül 2016 tarihli Resmî Gazete'de yayımlanan Bakanlar Kurulu kararıyla yaz saati yıl boyunca sürdürülmeye başlandı ve ülke o tarihten beri kesintisiz UTC+3 kullanıyor. Saatler mart ya da ekim aylarında ileri veya geri alınmaz. Ancak Avrupa ülkeleri ve ABD saat değiştirmeye devam ettiği için Türkiye ile aradaki fark yılda iki kez değişir. Bu sayfada bu farkın nasıl hesaplandığını, hangi tarihlerde değiştiğini ve kalıcı saatin günlük hayata etkisini anlatıyoruz.",
  kisaCevap: [
    "Türkiye 2016'dan beri yıl boyu UTC+3 kullanır; saatler ileri ya da geri alınmaz.",
    "UTC+3, 45° doğu boylamının güneş saatine karşılık gelir; Türkiye'nin büyük bölümü bu boylamın batısında kalır.",
    "Avrupa Birliği ülkeleri mart ayının son pazarı saatleri bir saat ileri, ekim ayının son pazarı bir saat geri alır.",
    "Bu yüzden Türkiye ile Orta Avrupa arasındaki fark yazın 1 saat, kışın 2 saattir; Londra ile 2 ve 3 saattir.",
    "Kalıcı UTC+3 nedeniyle kış aylarında batı illerinde güneş sabah 08.00'den sonra doğar."
  ],
  figure: {
    alt: "Yıllık zaman çizelgesi: Türkiye tüm yıl UTC+3 çizgisinde sabit. Orta Avrupa kışın UTC+1, 29 Mart'tan 25 Ekim'e kadar UTC+2. Altta Türkiye ile farkın kışın 2, yazın 1 saat olduğu gösteriliyor.",
    caption: "2026 örneği: Avrupa 29 Mart'ta saatleri ileri, 25 Ekim'de geri aldı. Türkiye'nin saati değişmediği için farkı değiştiren taraf her zaman Avrupa'dır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">2026'da Türkiye ve Orta Avrupa saati</text>
  <g class="sm mid t2">
    <text x="105" y="62">Ocak</text><text x="167" y="62">Şub</text><text x="229" y="62">Mart</text><text x="291" y="62">Nis</text><text x="353" y="62">May</text><text x="415" y="62">Haz</text><text x="477" y="62">Tem</text><text x="539" y="62">Ağu</text><text x="601" y="62">Eyl</text><text x="663" y="62">Ekim</text>
  </g>
  <text x="20" y="110" class="b">Türkiye</text>
  <rect x="76" y="88" width="624" height="36" rx="6" class="p"/>
  <text x="388" y="112" class="b mid sf">UTC+3 · tüm yıl sabit</text>
  <text x="20" y="178" class="b">Avrupa</text>
  <rect x="76" y="156" width="178" height="36" rx="6" class="sf sb"/>
  <text x="165" y="180" class="sm mid b">UTC+1 (kış)</text>
  <rect x="254" y="156" width="400" height="36" rx="6" class="ps"/>
  <text x="454" y="180" class="sm mid b">UTC+2 (yaz saati)</text>
  <rect x="654" y="156" width="46" height="36" rx="6" class="sf sb"/>
  <text x="677" y="180" class="sm mid b">+1</text>
  <line x1="254" y1="140" x2="254" y2="210" class="sa sw dash" fill="none"/>
  <line x1="654" y1="140" x2="654" y2="210" class="sa sw dash" fill="none"/>
  <text x="254" y="228" class="sm mid b">29 Mart: ileri</text>
  <text x="654" y="228" class="sm mid b">25 Ekim: geri</text>
  <text x="20" y="276" class="b">Fark</text>
  <rect x="76" y="254" width="178" height="40" rx="6" class="dgs"/>
  <text x="165" y="280" class="b mid">2 saat</text>
  <rect x="254" y="254" width="400" height="40" rx="6" class="oks"/>
  <text x="454" y="280" class="b mid">1 saat</text>
  <rect x="654" y="254" width="46" height="40" rx="6" class="dgs"/>
  <text x="677" y="280" class="b mid">2</text>
  <rect x="20" y="314" width="680" height="72" rx="8" class="sf sb"/>
  <rect x="20" y="314" width="8" height="72" class="p"/>
  <text x="44" y="340" class="b">Örnek: Berlin'de 15.00 toplantısı</text>
  <text x="44" y="364" class="sm">Temmuzda İstanbul'da 16.00 · Aralıkta İstanbul'da 17.00</text>
</svg>`
  },
  sections: [
    {
      h: "Türkiye'de yaz saati ve kış saati uygulaması var mı?",
      p: [
        "Hayır. Türkiye uzun yıllar boyunca birçok Avrupa ülkesi gibi her bahar saatleri bir saat ileri, her sonbahar bir saat geri alıyordu. 2016 yılında bu düzen değişti. 27 Mart 2016'da başlayan yaz saati, 7 Eylül 2016 tarihli ve 2016/9154 sayılı Bakanlar Kurulu kararıyla yıl boyunca sürdürülmeye başlandı. Karar 8 Eylül 2016 tarihli ve 29825 sayılı Resmî Gazete'de yayımlandı ve 30 Ekim 2016'da yapılması planlanan geri alma kaldırıldı.",
        "Bu uygulama sonraki yıllarda yargıya da taşındı; ancak yeni düzenlemelerle sürdürüldü ve Türkiye 2016'dan bu yana saatlerini hiç değiştirmedi. Bugün Türkiye'de geçerli saat yıl boyunca Eş Güdümlü Evrensel Saat'in (UTC) üç saat ilerisidir. Günlük dilde buna hâlâ \"kalıcı yaz saati\" denir, ama teknik olarak ortada değişen bir yaz ya da kış saati yoktur; tek ve sabit bir saat dilimi vardır.",
        "Her yıl mart ve ekim sonlarında \"saatler geri alınacak mı?\" sorusunun yeniden gündeme gelmesinin nedeni, Avrupa'daki saat değişimidir. O tarihlerde Türkiye'de saatlere dokunmanız gerekmez; değişen yalnızca Avrupa ve bazı diğer ülkelerle aradaki farktır."
      ]
    },
    {
      h: "Türkiye kalıcı olarak hangi saat dilimini kullanıyor?",
      p: [
        "Türkiye UTC+3 saat dilimini kullanır. Saat dilimleri teorik olarak 15'er derecelik boylam dilimlerine göre tanımlanır, çünkü Dünya 24 saatte 360 derece döner ve her saatte 15 derece ilerler. UTC+3, 45° doğu boylamının güneş saatine karşılık gelir. Türkiye ise yaklaşık 26° ile 45° doğu boylamları arasında uzanır; yani ülkenin neredeyse tamamı bu referans boylamın batısındadır.",
        "2016 öncesinde Türkiye kışın UTC+2 kullanıyordu; bu da 30° doğu boylamının, yani yaklaşık İzmit'ten geçen boylamın güneş saatiydi. UTC+3'e kalıcı geçiş, saatin coğrafi olarak doğudaki bir boylama göre ayarlanması anlamına gelir. Bu durumun sabah ve akşam aydınlığına etkisini aşağıda ayrıca ele alıyoruz. Boylam ve saat ilişkisinin hesabını [[bilgi:boylam-farki-yerel-saat-hesabi|boylam farkından yerel saat hesabı]] yazısında adım adım bulabilirsiniz."
      ],
      table: {
        head: ["Dönem", "Kış", "Yaz", "Referans boylam"],
        rows: [
          ["2016 öncesi", "UTC+2", "UTC+3", "30° D (kış), 45° D (yaz)"],
          ["2016'dan beri", "UTC+3", "UTC+3", "45° D (tüm yıl)"]
        ]
      }
    },
    {
      h: "Avrupa'da saatler hangi tarihlerde ileri–geri alınır?",
      p: [
        "Avrupa Birliği ülkelerinde saat değişimi ortak bir kuralla yapılır: saatler <strong>mart ayının son pazar günü</strong> UTC'ye göre 01.00'de bir saat ileri, <strong>ekim ayının son pazar günü</strong> UTC'ye göre 01.00'de bir saat geri alınır. Bu kural Birleşik Krallık gibi AB dışındaki bazı Avrupa ülkelerinde de aynı şekilde uygulanır. ABD ve Kanada'nın çoğu bölgesi ise farklı bir takvim kullanır: saatler mart ayının ikinci pazarı ileri, kasım ayının ilk pazarı geri alınır."
      ],
      table: {
        head: ["Yıl", "Avrupa: ileri", "Avrupa: geri", "ABD: ileri", "ABD: geri"],
        rows: [
          ["2026", "29 Mart", "25 Ekim", "8 Mart", "1 Kasım"],
          ["2027", "28 Mart", "31 Ekim", "14 Mart", "7 Kasım"]
        ],
        caption: "Tarihler kurallardan hesaplanmıştır: Avrupa'da mart ve ekimin son pazarı, ABD'de martın ikinci ve kasımın ilk pazarı."
      },
      after: [
        "Avrupa ile ABD'nin tarihleri farklı olduğu için yılda iki kez, birkaç haftalık geçiş dönemlerinde ABD ile Avrupa arasındaki fark da bir saat değişir. Bu dönemlerde Türkiye'den iki kıtaya birden toplantı ayarlayanların özellikle dikkatli olması gerekir."
      ]
    },
    {
      h: "Avrupa saatleri değiştirince Türkiye ile fark neden değişir?",
      p: [
        "Türkiye'nin saati sabit olduğu için farkı değiştiren her zaman karşı taraftır. Orta Avrupa kışın UTC+1, yazın UTC+2 kullanır. Türkiye UTC+3 olduğundan fark kışın 3 − 1 = 2 saat, yazın 3 − 2 = 1 saattir. Aynı hesap Birleşik Krallık için kışın 3 − 0 = 3, yazın 3 − 1 = 2 saat verir."
      ],
      formula: "Saat farkı = Türkiye UTC farkı − karşı ülkenin o tarihteki UTC farkı\nBerlin, temmuz: 3 − 2 = 1 saat · Berlin, aralık: 3 − 1 = 2 saat\nNew York, temmuz: 3 − (−4) = 7 saat · New York, aralık: 3 − (−5) = 8 saat",
      table: {
        head: ["Şehir", "Kışın UTC", "Yazın UTC", "Türkiye kışın ileride", "Türkiye yazın ileride"],
        rows: [
          ["Londra", "+0", "+1", "3 saat", "2 saat"],
          ["Berlin, Paris, Roma", "+1", "+2", "2 saat", "1 saat"],
          ["Atina, Bükreş, Kiev", "+2", "+3", "1 saat", "fark yok"],
          ["New York", "−5", "−4", "8 saat", "7 saat"],
          ["Moskova", "+3", "+3", "fark yok", "fark yok"],
          ["Dubai", "+4", "+4", "1 saat geride", "1 saat geride"]
        ],
        caption: "Moskova ve Dubai saat değiştirmediği için farkları yıl boyu sabittir."
      },
      after: [
        "Şehirler arasındaki anlık farkı ve yaz saati durumunu elle takip etmek yerine [[arac:zaman-dilimi-cevirici|Zaman Dilimi Çevirici]] aracıyla görebilirsiniz; araç seçtiğiniz tarihte hangi ülkenin yaz saatinde olduğunu dikkate alır."
      ]
    },
    {
      h: "Uçuş ve toplantı saatlerinde fark nasıl hesaplanır?",
      p: [
        "Uluslararası planlarda en güvenli yol, saati her zaman yerel saatle ve tarihle birlikte yazmak, gerekirse UTC karşılığını da eklemektir. Uçak biletlerinde kalkış ve iniş saatleri havaalanlarının yerel saatiyle yazılır; bu yüzden uçuş süresini bulmak için önce iki saati aynı dilime çevirmek gerekir."
      ],
      ol: [
        "Kalkış saatini yazın: İstanbul'dan 10 Aralık'ta 09.30'da kalkan bir uçuş.",
        "Varış saatini yazın: Londra'ya yerel saatle 10.45'te iniyor.",
        "Aralıkta Londra UTC+0, Türkiye UTC+3 olduğundan varışı Türkiye saatine çevirin: 10.45 + 3 = 13.45.",
        "Farkı alın: 13.45 − 09.30 = 4 saat 15 dakika. Bu, uçuşun gerçek süresidir.",
        "Aynı uçuş temmuzda olsaydı Londra UTC+1 olacağından varış saati yerel olarak bir saat daha geç görünürdü; süre değişmezdi."
      ],
      after: [
        "Toplantı davetlerinde saat dilimi bilgisinin kaybolması da sık rastlanan bir sorundur. Takvim davetinin içinde saatin nasıl saklandığını [[bilgi:takvime-etkinlik-ekleme-ics-dosyasi|ICS dosyası]] yazısında anlatıyoruz. 12 saatlik AM/PM biçiminde verilen saatleri dönüştürmek için [[arac:12-24-saat-cevir|12 ve 24 Saat Çevirici]], süre farkını hesaplamak için [[arac:saat-hesapla|Saat Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Telefonlar saati neden otomatik değiştirir?",
      p: [
        "Telefonlar ve bilgisayarlar saati, işletim sistemine gömülü bir saat dilimi veritabanına göre gösterir. Bu veritabanında her bölgenin hangi tarihte hangi UTC farkını kullandığı kayıtlıdır; Türkiye için kullanılan kayıt \"Europe/Istanbul\" adını taşır. Cihaz, ağdan ya da internetten UTC saatini alır ve bu kayda göre yerel saati hesaplar.",
        "2016'daki değişiklik çok kısa sürede ilan edildiği için güncellemesi gecikmiş bazı cihazlar 30 Ekim 2016'da saati kendiliğinden bir saat geri aldı. Bugün bu sorun büyük ölçüde geride kaldı, ama uzun süredir güncellenmemiş eski cihazlarda, bazı güvenlik kameralarında ve kayıt cihazlarında saat hâlâ yanlış kayabilir. Böyle bir durumda cihazın saat dilimini \"İstanbul\" ya da \"UTC+3\" olarak elle ayarlayıp otomatik yaz saati seçeneğini kapatmak sorunu çözer."
      ],
      ul: [
        "Cihazınızın saati mart ya da ekim sonunda kendiliğinden değiştiyse sistem güncellemesini yapın.",
        "Saat dilimi seçiminde Türkiye'yi değil de örneğin Atina ya da Bükreş'i seçerseniz cihaz Avrupa takvimine göre saat değiştirir.",
        "Yanlış saat yalnızca görüntü sorunu değildir; güvenli web sitelerinin sertifika denetimi de saat yanlışsa hata verebilir."
      ]
    },
    {
      h: "Kalıcı yaz saati sabahları neden geç aydınlatır?",
      p: [
        "Güneşin en tepeye çıktığı an, yani güneş öğlesi, bir yerin boylamına bağlıdır. Saat UTC+3'e, yani 45° doğu boylamına göre ayarlandığında, bu boylamın batısındaki yerlerde güneş öğlesi saat 12.00'den sonraya kayar. Her 1 derece batı için yaklaşık 4 dakika gecikme olur. İstanbul yaklaşık 29° doğudadır; 45 − 29 = 16 derece fark, güneş öğlesinin saatte yaklaşık 64 dakika geç, 13.00 civarında yaşanması demektir.",
        "Kış aylarında günler kısa olduğu için bu kayma sabahları belirginleşir. Aralık ayında batı illerinde güneş sabah 08.00'den sonra doğar; okula ve işe karanlıkta gidilir. Buna karşılık akşamları hava daha geç kararır. Doğudaki illerde bu etki çok daha zayıftır, çünkü bu iller referans boylama yakındır. Kalıcı saat tartışmalarının merkezinde bu sabah–akşam dengesi vardır."
      ],
      note: "Saatin sabah karanlığı uyku düzenini etkileyebilir. Kış aylarında sabah gün ışığı almak ve yatma saatini düzenli tutmak genel olarak önerilir; uyku sorunlarınız sürüyorsa bir hekime danışın."
    },
    {
      h: "Saat değişimi hangi ülkelerde kaldırıldı?",
      p: [
        "Saat değişimini kaldırmak yalnızca Türkiye'ye özgü bir karar değildir. Son yıllarda birçok ülke, enerji tasarrufu etkisinin beklenenden düşük olduğu ve iki kez saat değiştirmenin uyku ve trafik güvenliği üzerinde olumsuz etkisi bulunduğu gerekçesiyle uygulamayı bıraktı. Ülkeler kaldırırken genellikle yaz ya da kış saatinden birini kalıcı olarak seçti."
      ],
      ul: [
        "<strong>Rusya:</strong> 2011'de saat değişimini kaldırdı; 2014'te kalıcı olarak kış saatine döndü. Moskova bugün yıl boyu UTC+3'tür.",
        "<strong>Azerbaycan:</strong> 2016'da saat değişimini kaldırdı.",
        "<strong>İran:</strong> 2022'de yaz saati uygulamasını sona erdirdi.",
        "<strong>Meksika:</strong> 2022'de ülkenin büyük bölümünde yaz saatini kaldırdı; bazı sınır bölgelerinde uygulama sürüyor.",
        "<strong>Avrupa Birliği:</strong> 2019'da Avrupa Parlamentosu saat değişiminin kaldırılması yönünde oy kullandı, ancak üye ülkeler ortak bir karar alamadığı için uygulama sürüyor."
      ],
      after: [
        "Ekvatora yakın ülkelerin çoğu ise hiçbir zaman saat değiştirmedi, çünkü yıl boyunca gün uzunluğu fazla değişmez. Saat değişimi, yaz ile kış arasındaki gün ışığı farkının büyük olduğu orta ve yüksek enlemlerde anlamlıdır."
      ]
    }
  ],
  faq: [
    ["Türkiye'de yaz saati ve kış saati uygulaması var mı?", "Yok. Türkiye 8 Eylül 2016 tarihli Resmî Gazete'de yayımlanan kararla yaz saatini yıl boyu sürdürmeye başladı ve o tarihten beri saatleri ne ileri ne geri alıyor. Ülke tüm yıl UTC+3 kullanıyor."],
    ["Türkiye kalıcı olarak hangi saat dilimini kullanıyor?", "Türkiye kalıcı olarak UTC+3 saat dilimini kullanıyor. Bu saat 45° doğu boylamının güneş saatine karşılık gelir; 2016 öncesinde kışın kullanılan UTC+2 ise 30° doğu boylamına göreydi."],
    ["Avrupa saatleri değiştirince Türkiye ile fark neden değişir?", "Türkiye'nin saati sabit, Avrupa'nınki ise yılda iki kez değiştiği için fark da değişir. Orta Avrupa kışın UTC+1, yazın UTC+2 olduğundan Türkiye kışın 2 saat, yazın 1 saat ileridedir."],
    ["Avrupa'da saatler hangi tarihlerde ileri–geri alınır?", "Avrupa Birliği'nde saatler mart ayının son pazarı bir saat ileri, ekim ayının son pazarı bir saat geri alınır. 2026'da bu tarihler 29 Mart ve 25 Ekim, 2027'de 28 Mart ve 31 Ekim'dir."],
    ["Telefonlar saati neden otomatik değiştirir?", "Cihazlar yerel saati, işletim sistemindeki saat dilimi veritabanına göre hesaplar. Veritabanı güncel değilse ya da yanlış ülke seçilmişse cihaz Türkiye'de olmayan bir saat değişimini uygulayabilir; güncelleme ve doğru dilim seçimi bunu önler."],
    ["Kalıcı yaz saati sabahları neden geç aydınlatır?", "Saat 45° doğu boylamına göre ayarlı, Türkiye'nin çoğu ise bu boylamın batısında kalıyor. Her derece batı için güneş yaklaşık 4 dakika geç doğduğundan kışın batı illerinde güneş sabah 08.00'den sonra doğar."],
    ["Uçuş ve toplantı saatlerinde fark nasıl hesaplanır?", "Her iki saati de aynı dilime, örneğin Türkiye saatine ya da UTC'ye çevirip farkı alın. Karşı ülkenin o tarihte yaz saatinde olup olmadığını kontrol etmek gerekir; Türkiye'nin saati yıl boyu sabittir."],
    ["Saat değişimi hangi ülkelerde kaldırıldı?", "Türkiye'nin yanı sıra Rusya, Azerbaycan, İran ve Meksika'nın büyük bölümü saat değişimini kaldırdı. Avrupa Parlamentosu da 2019'da kaldırma yönünde oy verdi, ancak AB'de uygulama ortak karar alınamadığı için sürüyor."],
    ["Mart ya da ekim sonunda saatimi değiştirmem gerekir mi?", "Türkiye'de gerekmez. Bu tarihlerde yalnızca Avrupa ve bazı ülkelerle aradaki fark değişir. Cihazınızın saati kendiliğinden değiştiyse sistem güncellemesi yapın ve saat dilimi olarak İstanbul'u seçin."]
  ],
  tools: ["zaman-dilimi-cevirici", "12-24-saat-cevir", "saat-hesapla"],
  related: ["boylam-farki-yerel-saat-hesabi", "takvime-etkinlik-ekleme-ics-dosyasi", "am-pm-ne-demek-12-24-saat"],
  sources: [
    ["Resmî Gazete – 8 Eylül 2016, Sayı 29825 (Karar 2016/9154)", "https://www.resmigazete.gov.tr/"],
    ["Avrupa Birliği – Yaz saati uygulaması", "https://european-union.europa.eu/"]
  ]
};
