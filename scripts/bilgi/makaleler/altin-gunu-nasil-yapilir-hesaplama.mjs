export default {
  slug: "altin-gunu-nasil-yapilir-hesaplama",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Altın Günü Nasıl Yapılır? Sıra, Tutar ve Gram–Çeyrek Hesabı",
  pageTitle: "Altın Günü Nasıl Yapılır? Sıra, Tutar, Gram ve Çeyrek Hesabı",
  description: "Altın gününde her üye sırası gelen kişiye aynı miktarda altın verir; N kişilik grup N ayda tamamlanır. Sıra kurası, gram–çeyrek seçimi, fiyat etkisi ve kurallar.",
  keywords: ["altın günü nasıl yapılır", "altın günü hesaplama", "altın günü sırası", "gün grubu kuralları", "altın günü çeyrek mi gram mı", "döviz günü", "altın günü kaç kişi olur", "tl günü"],
  lead: "Altın gününde grubun her üyesi, her ay sırası gelen kişiye <strong>aynı miktarda altın</strong> (ör. bir çeyrek ya da bir gram) verir; sıra herkese bir kez geldiğinde gün tamamlanır. 10 kişilik bir grupta gün 10 ayda biter ve her üye toplamda verdiği kadar altın alır: 9 çeyrek verir, sırası geldiğinde 9 çeyrek alır. Kazanç ya da kayıp yoktur; değişen tek şey, birikimin kime ne zaman toplu hâlde ulaştığıdır. Bu sayfada sıranın adil belirlenmesini, gram ile çeyrek farkını, fiyat değişiminin etkisini ve grup kurallarını anlatıyoruz.",
  kisaCevap: [
    "N kişilik bir altın günü N ayda (ya da N toplantıda) tamamlanır; her üye bir kez toplu ödeme alır.",
    "Her üye her ay sırası gelen kişiye belirlenen miktarı verir; sırası gelen kişi kendisi hariç N − 1 üyeden altın toplar.",
    "Gün sonunda herkes verdiği kadar altın almış olur; altın cinsinden net kazanç sıfırdır.",
    "İlk sıradaki üye birikimi erkenden alır (faizsiz borçlanma gibi), son sıradaki ise ay ay biriktirip en sonda toplu alır (faizsiz borç vermek gibi).",
    "Sıra, herkesin önünde yapılan bir kurayla ya da ihtiyaç sırasına göre oy birliğiyle belirlenmelidir.",
    "Altın fiyatı yükselirse TL cinsinden erken alanların sonraki ödemeleri pahalanır, geç alanlar avantajlı olur."
  ],
  figure: {
    alt: "10 kişilik ve kişi başı 5.000 TL değerinde altın günü için ilk ve son sıradaki üyenin birikimli durumu: ilk sıradaki birinci ayda 45.000 TL alıp sonra her ay 5.000 TL öder, son sıradaki dokuz ay öder ve onuncu ayda 45.000 TL alır.",
    caption: "Örnek: 10 kişi, her ay kişi başı 5.000 TL değerinde altın. İlk sıradaki üye birinci ay +45.000 TL ile başlar ve sıfıra iner; son sıradaki üye −45.000 TL'ye kadar iner ve onuncu ay sıfıra döner. İkisi de sonunda aynı yerde biter.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">İlk ve son sıradaki üyenin net durumu</text>
  <line x1="80" y1="210" x2="680" y2="210" class="st sw" fill="none"/>
  <line x1="80" y1="60" x2="80" y2="360" class="st" fill="none"/>
  <g class="sm end mu"><text x="72" y="74">+45 bin</text><text x="72" y="214">0</text><text x="72" y="354">−45 bin</text></g>
  <line x1="80" y1="70" x2="680" y2="70" class="sb dash" fill="none"/>
  <line x1="80" y1="350" x2="680" y2="350" class="sb dash" fill="none"/>
  <polyline points="110,70 170,86 230,101 290,117 350,132 410,148 470,163 530,179 590,194 650,210" class="sp sw" fill="none"/>
  <polyline points="110,226 170,241 230,257 290,272 350,288 410,303 470,319 530,334 590,350 650,210" class="sok sw" fill="none"/>
  <circle cx="110" cy="70" r="6" class="p"/><circle cx="650" cy="210" r="7" class="a"/>
  <circle cx="590" cy="350" r="6" class="ok"/>
  <g class="sm mid t2">
    <text x="110" y="384">1</text><text x="170" y="384">2</text><text x="230" y="384">3</text><text x="290" y="384">4</text><text x="350" y="384">5</text>
    <text x="410" y="384">6</text><text x="470" y="384">7</text><text x="530" y="384">8</text><text x="590" y="384">9</text><text x="650" y="384">10</text>
  </g>
  <text x="380" y="408" class="sm mid mu">ay (toplantı)</text>
  <rect x="150" y="48" width="230" height="26" rx="6" class="sf sb"/>
  <text x="160" y="66" class="sm b p">1. sıra: önce alır, sonra öder</text>
  <rect x="300" y="310" width="230" height="26" rx="6" class="sf sb"/>
  <text x="310" y="328" class="sm b ok">10. sıra: önce öder, sonra alır</text>
  <text x="662" y="200" class="sm b">bitiş: 0</text>
</svg>`
  },
  sections: [
    {
      h: "Altın günü nedir, nasıl işler?",
      p: [
        "Altın günü, Türkiye'de özellikle komşular, akrabalar, iş arkadaşları ve arkadaş grupları arasında yaygın olan geleneksel bir birikim yöntemidir. Grup belli aralıklarla (genellikle ayda bir) bir araya gelir; her toplantıda üyelerden biri ev sahibi olur ve diğer üyeler ona önceden kararlaştırılan miktarda altın verir. Sıra herkese bir kez geldiğinde gün tamamlanır.",
        "Sistemin mantığı faizsiz bir dönüşümlü kredidir. Grup bütün olarak hiçbir şey kazanmaz ya da kaybetmez; yalnızca her üye, ayda küçük bir miktarı ayırarak sırası geldiğinde toplu bir birikime ulaşır. Pek çok kişi için bu, tek başına biriktirmekte zorlandığı bir tutarı sosyal bir taahhütle disiplinli hâle getirmenin yoludur. Toplantıların sohbet ve ikramla geçmesi de geleneğin sosyal yönünü oluşturur.",
        "Altın günü bir aile ve dostluk geleneğidir; ticari bir faaliyet ya da yatırım ürünü değildir. Bu yüzden kuralların açık olması, herkesin ödeme gücüne uygun miktar seçilmesi ve güvenin korunması her şeyden önemlidir."
      ]
    },
    {
      h: "Kaç kişilik grup kaç ayda tamamlanır? Hesap mantığı",
      p: [
        "Hesap çok basittir: Grupta N kişi varsa gün N toplantıda tamamlanır. Her toplantıda sırası gelen üye, kendisi dışındaki N − 1 kişiden altın alır. Kendi payını kendisine vermediği için toplu aldığı miktar, gün boyunca vereceği toplam miktara eşittir."
      ],
      formula: "Toplantı sayısı = üye sayısı (N)\nSırası gelenin aldığı = (N − 1) × kişi başı miktar\nBir üyenin gün boyunca verdiği = (N − 1) × kişi başı miktar\n10 kişi, 1 çeyrek: her üye 9 çeyrek verir, 9 çeyrek alır",
      table: {
        head: ["Üye sayısı", "Süre (aylık)", "Kişi başı 1 çeyrek ile toplu alınan", "Kişi başı 1 gram ile toplu alınan"],
        rows: [
          ["6 kişi", "6 ay", "5 çeyrek", "5 gram"],
          ["8 kişi", "8 ay", "7 çeyrek", "7 gram"],
          ["10 kişi", "10 ay", "9 çeyrek", "9 gram"],
          ["12 kişi", "12 ay", "11 çeyrek", "11 gram"]
        ],
        caption: "Toplantılar iki haftada bir yapılırsa süre yarıya iner; aylık yük ise ikiye katlanır."
      },
      after: [
        "Grup büyüdükçe toplu alınan miktar artar ama sıranın gelmesi de uzar. 12 kişilik bir grupta son sıradaki üye bir yıl boyunca ödeme yapıp en sonda toplu alır. Bu yüzden çoğu grup 6 ile 12 kişi arasında kurulur; daha uzun süreler, üyelerin taşınma, iş değişikliği ya da ekonomik sıkıntı nedeniyle ayrılma riskini artırır. Toplantı tarihlerini herkesin görebileceği şekilde planlamak için [[arac:aylik-planlayici|aylık planlayıcı]] çıktısı kullanılabilir."
      ]
    },
    {
      h: "Gün sırası adil biçimde nasıl belirlenir?",
      p: [
        "Sıra, altın gününde en çok tartışma çıkaran konudur, çünkü ilk sıralar birikimi erken almak anlamına gelir. Adil bir sıra için en yaygın iki yöntem vardır: herkesin önünde yapılan bir <strong>kura</strong> ya da üyelerin ihtiyaçlarına göre <strong>oy birliğiyle</strong> belirlenen sıra (ör. düğünü, doğumu ya da taşınması yaklaşan üyeye öncelik vermek)."
      ],
      ol: [
        "İlk toplantıda tüm üyelerin adını tek bir listeye yazın.",
        "Herkesin görebileceği bir ekranda [[arac:cekilis|çekiliş aracıyla]] isimleri rastgele sıralayın ya da kâğıtlara yazıp torbadan çekin.",
        "Çıkan sırayı, tarihleriyle birlikte yazılı bir listeye dönüştürün ve gruptaki herkese gönderin.",
        "Sıra değişikliği gerekirse yalnızca iki üyenin karşılıklı rızasıyla yer değiştirilebileceğini baştan kararlaştırın.",
        "Ev sahipliği sırası ile altın alma sırası farklı olacaksa bunu da ayrıca yazın."
      ],
      after: [
        "Kura yöntemini daha önce hiç kullanmadıysanız [[rehber:cekilis-yapma|çekiliş yapma rehberi]] adım adım yol gösterir. Rastgele sıralama, kimsenin \"kayırıldım\" ya da \"geriye atıldım\" hissetmemesini sağlar."
      ]
    },
    {
      h: "Sırası sonda olan neden dezavantajlı sayılır?",
      p: [
        "Yukarıdaki görselde 10 kişilik ve kişi başı 5.000 TL değerinde bir gün için iki üyenin net durumu görülür. Birinci sıradaki üye ilk ay 9 × 5.000 = 45.000 TL alır; sonraki dokuz ay her ay 5.000 TL öder ve dönem sonunda sıfıra iner. Bu, faizsiz bir borçlanmadır: Bugünün parasını bugün almış, borcunu taksitle ödemiştir.",
        "Onuncu sıradaki üye ise dokuz ay boyunca toplam 45.000 TL öder ve parasını ancak onuncu ay toplu olarak alır. Bu da diğer üyelere faizsiz borç vermek gibidir. Altın yerine TL ile yapılan bir günde enflasyon yüksekse, son sıradakinin aldığı 45.000 TL'nin alım gücü, ilk aylarda ödediği paranın alım gücünden düşük olur. Paranın zaman içindeki değer kaybını [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazımızda görebilirsiniz.",
        "Altın günü bu dezavantajı büyük ölçüde azaltır: Herkes altın cinsinden verip altın cinsinden aldığı için, son sıradakinin aldığı 9 çeyrek de ilk sıradakinin aldığı 9 çeyrekle aynı miktardadır. Altının TL değeri yükselmişse son sıradaki üye TL karşılığı olarak daha fazla değer almış olur."
      ]
    },
    {
      h: "Çeyrek mi gram altın mı tercih edilmeli?",
      p: [
        "Altın gününde en yaygın birimler çeyrek altın ve gram altındır. Çeyrek altın 22 ayar olup yaklaşık 1,75 gram ağırlığındadır; gram altın ise genellikle 24 ayar (995 ya da 999,9 saflıkta) bir gramlık külçedir. İkisi arasındaki seçim, grubun bütçesi ve altını nasıl kullanacağıyla ilgilidir."
      ],
      table: {
        head: ["Özellik", "Çeyrek altın", "Gram altın"],
        rows: [
          ["Ayar", "22 ayar", "Genellikle 24 ayar"],
          ["Ağırlık", "Yaklaşık 1,75 g", "1 g"],
          ["Alış–satış farkı", "Genellikle daha yüksek", "Genellikle daha düşük"],
          ["Hediye ve takı geleneği", "Çok yaygın", "Daha az yaygın"],
          ["Bütçeye göre ayarlama", "Tam adetle sınırlı", "0,5 g, 2 g gibi esnek"]
        ]
      },
      after: [
        "Grup kurulurken hangi ürünün kabul edileceği netleştirilmelidir: \"Çeyrek\" denildiğinde yeni basım mı, eski basım mı kabul ediliyor; gram altında hangi saflık geçerli? Bu ayrıntılar netleştirilmezse sırası gelen üye farklı değerde ürünler alabilir. Çeyrek altının içindeki saf altın miktarını [[bilgi:ceyrek-altin-kac-gram-ayar-milyem|çeyrek altın kaç gram]] yazımızda, farklı ayar ve milyemlerdeki has karşılığını [[arac:altin-milyem-hesapla|altın milyem hesaplama]] ve [[arac:altin-ayar-hesapla|altın ayar hesaplama]] araçlarında bulabilirsiniz."
      ]
    },
    {
      h: "Altın fiyatı değişirse kim kazançlı olur?",
      p: [
        "Altın cinsinden bakıldığında kimse kazanmaz ya da kaybetmez; herkes verdiği kadar altını alır. Ancak üyelerin altını her ay TL ile satın aldığı düşünülürse, fiyat hareketi TL cinsinden bir fark yaratır. Altın fiyatı gün boyunca <strong>yükselirse</strong>, erken sıradaki üyenin sonraki aylarda vereceği altınlar daha pahalıya gelir; geç sıradaki üye ise ilk aylarda daha ucuza aldığı altınlarla katkı yapıp en sonda aynı miktarı almış olur. Fiyat <strong>düşerse</strong> durum tersine döner.",
        "Bu fark bir \"kâr\" değil, zamanlama etkisidir ve kimse fiyatın yönünü önceden bilemez. Grup içinde \"altın düştü, ben kayba uğradım\" tartışmalarını önlemenin yolu, baştan herkesin altın cinsinden borçlandığını ve TL karşılığının değişebileceğini kabul etmesidir."
      ]
    },
    {
      h: "Grup kuralları: ayrılan üye, geciken ödeme",
      p: [
        "Altın günlerinde sorunların çoğu yazılı kural olmamasından çıkar. Grup kurulurken aşağıdaki konuları konuşup kısa bir yazılı metne dökmek ve herkese göndermek, aylar sonra yaşanabilecek kırgınlıkları önler."
      ],
      ul: [
        "<strong>Ödeme günü:</strong> Altın toplantı günü mü, toplantıdan önce mi teslim edilecek? Gecikme olursa ne kadar süre beklenecek?",
        "<strong>Ayrılan üye:</strong> Sırasını almış bir üye ayrılmak isterse kalan borcunu nasıl ödeyecek? Sırası gelmemiş üye ayrılırsa verdikleri iade mi edilecek, yoksa sırası geldiğinde mi alacak?",
        "<strong>Yeni üye:</strong> Ayrılan üyenin yerine yeni biri alınabilir mi, hangi sırayı devralır?",
        "<strong>Ürün standardı:</strong> Çeyrek, yarım ya da gram altında hangi basım ve saflık geçerli?",
        "<strong>Toplantı yapılamazsa:</strong> Altın elden mi, banka hesabı aracılığıyla mı teslim edilecek?",
        "<strong>Kayıt:</strong> Kimin kime, hangi tarihte ne verdiği basit bir tabloda tutulmalı; masrafları paylaşma mantığı için [[bilgi:ortak-gider-nasil-paylasilir|ortak gider nasıl paylaşılır]] yazımız da fikir verir."
      ]
    },
    {
      h: "Altın günü yerine TL günü ya da döviz günü mantıklı mı?",
      p: [
        "TL günü aynı mantıkla nakit para üzerinden yapılır ve en basit yöntemdir: alış–satış farkı, sahte ürün ya da saflık tartışması yoktur. Dezavantajı, enflasyonun yüksek olduğu dönemlerde son sıradakilerin aldığı paranın alım gücünün azalmasıdır. Döviz günü ise kişi başı belirli bir miktar döviz üzerinden yapılır ve kur değişimi altındakine benzer bir zamanlama etkisi yaratır.",
        "Hangisinin \"daha iyi\" olduğu kişiden kişiye değişir; bu bir yatırım tavsiyesi konusu değil, grubun tercihi meselesidir. Önemli olan, seçilen birimin herkes tarafından kolayca temin edilebilmesi, aylık tutarın her üyenin bütçesini zorlamaması ve kuralların baştan netleşmesidir. Toplantı ikramlarının da bütçeyi zorlamayacak sade bir düzende tutulması, günün asıl amacının birikim olduğunu korur."
      ]
    }
  ],
  faq: [
    ["Altın günü nedir, nasıl işler?", "Altın günü, bir grubun düzenli aralıklarla bir araya gelip her toplantıda sırası gelen üyeye önceden kararlaştırılan miktarda altın verdiği geleneksel birikim yöntemidir. Sıra herkese bir kez geldiğinde gün tamamlanır ve herkes verdiği kadar altın almış olur."],
    ["Gün sırası adil biçimde nasıl belirlenir?", "En adil yöntem, ilk toplantıda herkesin önünde yapılan kuradır; isimler kâğıtlarla ya da bir çekiliş aracıyla rastgele sıralanır. Alternatif olarak üyelerin ihtiyaçlarına göre oy birliğiyle sıra belirlenebilir. Çıkan sıra yazılı hâle getirilip herkese gönderilmelidir."],
    ["Çeyrek mi gram altın mı tercih edilmeli?", "Çeyrek altın hediye geleneğine daha uygundur ama alış–satış farkı genellikle daha yüksektir. Gram altın daha esnek miktarlar sunar ve fark genellikle daha düşüktür. Seçim grubun bütçesine ve altını nasıl kullanacağına bağlıdır; ürün standardı baştan belirlenmelidir."],
    ["Altın fiyatı değişirse kim kazançlı olur?", "Altın cinsinden kimse kazanmaz, herkes verdiği kadar altın alır. TL cinsinden ise fiyat yükselirse geç sıradakiler, düşerse erken sıradakiler avantajlı olur. Bu fark bir kâr değil, fiyatın yönü önceden bilinmediği için oluşan zamanlama etkisidir."],
    ["Kaç kişilik grup kaç ayda tamamlanır?", "Aylık toplanan bir grup, üye sayısı kadar ayda tamamlanır; 10 kişilik grup 10 ayda biter. Sırası gelen üye kendisi dışındaki dokuz kişiden altın alır. Toplantılar iki haftada bir yapılırsa süre yarıya iner, aylık yük artar."],
    ["Sırası sonda olan neden dezavantajlı sayılır?", "Son sıradaki üye aylarca ödeme yapıp birikimini en sonda alır; bu, diğer üyelere faizsiz borç vermek gibidir. TL gününde enflasyon bu paranın alım gücünü azaltır. Altın gününde ise miktar altın cinsinden sabit olduğu için bu dezavantaj büyük ölçüde azalır."],
    ["Ayrılan üye olursa ne yapılır?", "Bu durum için kural baştan yazılmalıdır. Sırasını almış üye kalan borcunu ödemeye devam etmeli; sırası gelmemiş üyenin verdikleri ya iade edilir ya da sırası geldiğinde ödenir. Yerine yeni üye alınacaksa hangi sırayı devralacağı da önceden kararlaştırılmalıdır."],
    ["Altın günü yerine TL günü mantıklı mı?", "TL günü daha basittir ve saflık ya da alış–satış farkı tartışması yaratmaz, ancak enflasyon dönemlerinde son sıradakilerin aldığı paranın alım gücü düşer. Hangisinin seçileceği grubun tercihidir ve yatırım kararı olarak değerlendirilmemelidir."],
    ["Altın günü kaç kişi olur?", "Kesin bir kural yoktur, ancak çoğu grup 6 ile 12 kişi arasında kurulur. Grup büyüdükçe toplu alınan miktar artar ama sıranın gelmesi uzar ve üyelerin ayrılma riski yükselir. Herkesin aylık katkıyı rahatça karşılayabileceği bir büyüklük seçilmelidir."]
  ],
  tools: ["cekilis", "altin-milyem-hesapla", "altin-ayar-hesapla", "aylik-planlayici"],
  related: ["ceyrek-altin-kac-gram-ayar-milyem", "altin-iscilik-ucreti-nasil-hesaplanir", "enflasyona-gore-paranin-degeri", "ortak-gider-nasil-paylasilir"],
  uyari: "yatırım danışmanlığı değildir; gruba katılmadan önce aylık katkının bütçenize uygun olduğundan emin olun"
};
