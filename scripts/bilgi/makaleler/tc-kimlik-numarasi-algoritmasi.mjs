export default {
  slug: "tc-kimlik-numarasi-algoritmasi",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "TC Kimlik Numarası Nasıl Oluşur? 11 Haneli Doğrulama Algoritması ve Vergi No Farkı",
  pageTitle: "TC Kimlik Numarası Algoritması: Son İki Hane Kontrolü",
  description: "TC kimlik numarası 11 hanelidir; 10. ve 11. haneler ilk dokuz haneden hesaplanan kontrol haneleridir. Doğrulama kuralları, mod 10, vergi no farkı.",
  keywords: ["tc kimlik algoritması", "tc kimlik no nasıl oluşur", "tc kimlik son iki hane", "tc kimlik doğrulama", "tc kimlik neden çift biter", "vergi kimlik numarası farkı", "10 haneli vergi no", "mod 10 nedir"],
  lead: "TC kimlik numarası 11 hanelidir; ilk hane sıfır olamaz, 10. ve 11. haneler ise ilk dokuz haneden belirli bir kuralla hesaplanan <strong>kontrol haneleridir</strong>. Bu kontrol haneleri, numara bir forma yazılırken yapılan yazım ve rakam yer değiştirme hatalarını yakalamak için vardır. Algoritmaya uyan bir numaranın gerçekten birine ait olduğu ya da o kişiye ait olduğu bu kontrolle anlaşılamaz; bu, Nüfus ve Vatandaşlık İşleri (NVİ) sorgusu değildir. Bu sayfada kontrol kurallarını, son hanenin neden hep çift olduğunu ve vergi numarasıyla farkını bulacaksınız.",
  kisaCevap: [
    "TC kimlik numarası 11 haneden oluşur ve ilk hanesi hiçbir zaman 0 değildir.",
    "10. hane kontrolü: (1, 3, 5, 7 ve 9. hanelerin toplamı × 7 − 2, 4, 6 ve 8. hanelerin toplamı) mod 10 işleminin sonucu 10. haneye eşit olmalıdır.",
    "11. hane kontrolü: ilk 10 hanenin toplamının mod 10 değeri 11. haneye eşit olmalıdır.",
    "Bu kurallar nedeniyle 11. hane her zaman çift sayıdır (0, 2, 4, 6 ya da 8).",
    "Algoritma kontrolü yalnızca biçimi denetler; numaranın kime ait olduğunu, geçerli olup olmadığını ya da kişinin varlığını göstermez.",
    "Gerçek kişilerde TC kimlik numarası vergi kimlik numarası yerine kullanılır; şirketlerin vergi numarası ise 10 hanelidir ve farklı bir algoritmayla denetlenir."
  ],
  figure: {
    alt: "TC kimlik numarasının 11 hanesi kutularda gösteriliyor; tek sıralı haneler bordo, çift sıralı haneler yeşil, 10. ve 11. haneler kontrol hanesi olarak işaretli. Altında 1-2-3-4-5-6-7-8-9 dizisiyle kontrol hesabı.",
    caption: "Kontrol hesabı, kurgusal 123456789 dizisi üzerinde gösterilmiştir. Bu dizi yalnızca öğretim amaçlıdır; algoritmaya uyması herhangi bir kişiye ait olduğu anlamına gelmez ve hiçbir başvuruda kullanılamaz.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">11 hane: 9 veri hanesi + 2 kontrol hanesi</text>
  <g class="mid">
    <rect x="22" y="52" width="56" height="56" rx="8" class="ps"/><text x="50" y="88" class="lg b">1</text>
    <rect x="86" y="52" width="56" height="56" rx="8" class="oks"/><text x="114" y="88" class="lg b">2</text>
    <rect x="150" y="52" width="56" height="56" rx="8" class="ps"/><text x="178" y="88" class="lg b">3</text>
    <rect x="214" y="52" width="56" height="56" rx="8" class="oks"/><text x="242" y="88" class="lg b">4</text>
    <rect x="278" y="52" width="56" height="56" rx="8" class="ps"/><text x="306" y="88" class="lg b">5</text>
    <rect x="342" y="52" width="56" height="56" rx="8" class="oks"/><text x="370" y="88" class="lg b">6</text>
    <rect x="406" y="52" width="56" height="56" rx="8" class="ps"/><text x="434" y="88" class="lg b">7</text>
    <rect x="470" y="52" width="56" height="56" rx="8" class="oks"/><text x="498" y="88" class="lg b">8</text>
    <rect x="534" y="52" width="56" height="56" rx="8" class="ps"/><text x="562" y="88" class="lg b">9</text>
    <rect x="598" y="52" width="48" height="56" rx="8" class="p"/><text x="622" y="88" class="lg b sf">5</text>
    <rect x="652" y="52" width="48" height="56" rx="8" class="p"/><text x="676" y="88" class="lg b sf">0</text>
  </g>
  <g class="sm mid mu">
    <text x="50" y="126">1.</text><text x="114" y="126">2.</text><text x="178" y="126">3.</text><text x="242" y="126">4.</text><text x="306" y="126">5.</text>
    <text x="370" y="126">6.</text><text x="434" y="126">7.</text><text x="498" y="126">8.</text><text x="562" y="126">9.</text>
    <text x="622" y="126" class="p b">10.</text><text x="676" y="126" class="p b">11.</text>
  </g>
  <rect x="22" y="148" width="330" height="124" rx="10" class="sf sb"/>
  <text x="38" y="174" class="b">10. hane kontrolü</text>
  <text x="38" y="200" class="sm">Tek sıralar: 1+3+5+7+9 = 25</text>
  <text x="38" y="220" class="sm">Çift sıralar: 2+4+6+8 = 20</text>
  <text x="38" y="242" class="sm">(25 × 7 − 20) = 155 → mod 10 = <tspan class="b p">5</tspan></text>
  <text x="38" y="262" class="sm ok b">10. hane 5 mi? Evet</text>
  <rect x="368" y="148" width="332" height="124" rx="10" class="sf sb"/>
  <text x="384" y="174" class="b">11. hane kontrolü</text>
  <text x="384" y="200" class="sm">İlk 10 hanenin toplamı:</text>
  <text x="384" y="220" class="sm">1+2+…+9 + 5 = 50</text>
  <text x="384" y="242" class="sm">50 mod 10 = <tspan class="b p">0</tspan></text>
  <text x="384" y="262" class="sm ok b">11. hane 0 mı? Evet</text>
  <rect x="22" y="290" width="678" height="62" rx="10" class="dgs"/>
  <text x="38" y="316" class="b">Yazım hatası yakalanır: 7 ile 8 yer değiştirse</text>
  <text x="38" y="338" class="sm">1234568<tspan class="b">7</tspan>950 → tek sıralar 26, çift 19 → (182 − 19) mod 10 = 3 ≠ 5</text>
  <rect x="22" y="368" width="678" height="56" rx="10" class="sf sb"/>
  <rect x="22" y="368" width="8" height="56" class="dg"/>
  <text x="44" y="392" class="b">Kontrol yalnızca biçimi denetler</text>
  <text x="44" y="412" class="sm t2">Kime ait olduğunu söylemez · NVİ sorgusu değildir · örnek dizi kurgusaldır</text>
</svg>`
  },
  sections: [
    {
      h: "TC kimlik numarası nedir, nasıl bir yapısı vardır?",
      p: [
        "T.C. kimlik numarası, Türkiye Cumhuriyeti vatandaşlarına nüfus kaydıyla birlikte verilen, kişiye özgü ve değişmeyen 11 haneli bir numaradır. Nüfus, sağlık, eğitim, vergi, sosyal güvenlik ve bankacılık işlemlerinin büyük kısmında kişiyi tanımlayan ortak anahtar olarak kullanılır. Numara Merkezi Nüfus İdaresi Sistemi (MERNİS) üzerinden Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü tarafından verilir.",
        "Numaranın ilk dokuz hanesi kişiyi ayırt eden kısımdır; bu hanelerin hangi kurala göre dağıtıldığı kamuya açık bir yöntem olarak sunulmaz ve kişinin doğum yeri, yaşı ya da cinsiyeti gibi bilgileri doğrudan taşımaz. Son iki hane ise ilk dokuz haneden hesaplanan <strong>kontrol haneleridir</strong>. Kontrol hanesi fikri, banka hesap numaralarında, IBAN'da ve barkodlarda da kullanılan yaygın bir hata yakalama yöntemidir.",
        "Kontrol hanelerinin tek amacı, numara elle yazılırken ya da okunurken yapılan hataları anında fark etmektir. Bir kişinin kimliğini kanıtlamak, numaranın kime ait olduğunu bulmak ya da \"gerçek\" bir numara elde etmek bu kuralların konusu değildir."
      ]
    },
    {
      h: "Doğrulama kuralları: üç basit koşul",
      p: [
        "Bir numaranın biçim olarak doğru yazılıp yazılmadığını anlamak için üç koşula bakılır. Hepsi sağlanıyorsa numara \"algoritmaya uygundur\"; biri bile sağlanmıyorsa numarada kesin olarak bir yazım hatası vardır. Haneleri soldan sağa 1'den 11'e kadar numaralandırdığımızı varsayalım."
      ],
      formula: "Koşul 0: numara 11 rakamdan oluşur ve 1. hane 0 değildir\nKoşul 1: 10. hane = (7 × (h1 + h3 + h5 + h7 + h9) − (h2 + h4 + h6 + h8)) mod 10\nKoşul 2: 11. hane = (h1 + h2 + … + h10) mod 10",
      after: [
        "Birinci koşulda tek sıralı haneler 7 ile çarpılır, çift sıralı haneler çıkarılır. Bu farklı ağırlıklandırma sayesinde yan yana iki rakamın yer değiştirmesi gibi sık görülen hatalar çoğu zaman yakalanır. İkinci koşul ise ilk on hanenin toplamına dayanan basit bir sağlama işlemidir ve tek bir rakamın yanlış yazılmasını yakalar.",
        "Çıkarma işleminin sonucu negatif çıkabileceği için programlamada mod alırken dikkatli olmak gerekir: matematikte −3 mod 10 = 7'dir, ama bazı programlama dillerinde % işleci −3 sonucunu verir. Bu farkı [[arac:mod-alma-hesapla|Mod Alma Hesaplama aracı]] iki sonucu yan yana göstererek açıklar."
      ]
    },
    {
      h: "Mod 10 işlemi nedir?",
      p: [
        "Mod 10, bir sayının 10'a bölümünden kalan demektir; pratikte sayının <strong>son basamağına</strong> eşittir. 155 mod 10 = 5, 50 mod 10 = 0, 182 mod 10 = 2 sonucunu verir. Kontrol haneleri tek basamaklı olmak zorunda olduğu için hesap sonucu her zaman mod 10 ile 0–9 aralığına indirilir.",
        "Negatif sonuçlarda matematiksel kalan her zaman 0 ile 9 arasındadır. Örneğin 7 × 10 − 75 = −5 çıksaydı, −5 mod 10 = 5 olurdu, çünkü −5 = 10 × (−1) + 5'tir. Form doğrulama kodu yazanların en sık takıldığı yer burasıdır: dilin % işleci negatif kalan döndürüyorsa sonuca 10 ekleyip yeniden mod almak gerekir."
      ],
      table: {
        head: ["İşlem", "Matematiksel sonuç", "Açıklama"],
        rows: [
          ["155 mod 10", "5", "Son basamak"],
          ["50 mod 10", "0", "Tam bölünür"],
          ["163 mod 10", "3", "Son basamak"],
          ["−5 mod 10", "5", "Negatifte 10 eklenir"],
          ["−23 mod 10", "7", "−23 + 30 = 7"]
        ]
      }
    },
    {
      h: "Adım adım kontrol örneği (kurgusal dizi)",
      p: [
        "Algoritmanın nasıl çalıştığını göstermek için gerçek kişilerle hiçbir ilgisi olmayan, öğretim amaçlı <strong>1 2 3 4 5 6 7 8 9</strong> dizisini kullanalım. Bu dizi kurgusaldır; aşağıda yalnızca kontrolün hangi adımlarla yapıldığı gösterilmektedir. Bir numaranın algoritmaya uyması, onun bir kişiye ait olduğu ya da herhangi bir işlemde kullanılabileceği anlamına gelmez."
      ],
      ol: [
        "Tek sıralı haneleri (1, 3, 5, 7, 9. sıradakiler) toplayın: 1 + 3 + 5 + 7 + 9 = 25.",
        "Çift sıralı haneleri (2, 4, 6, 8. sıradakiler) toplayın: 2 + 4 + 6 + 8 = 20.",
        "Birinci toplamı 7 ile çarpıp ikinci toplamı çıkarın: 25 × 7 − 20 = 155. Sonucun mod 10 değeri 5'tir; demek ki 10. hane 5 olmalıdır.",
        "İlk on hanenin toplamını bulun: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 5 = 50. Mod 10 değeri 0'dır; demek ki 11. hane 0 olmalıdır.",
        "Formdaki numaranın 10. ve 11. haneleri bu değerlerle aynıysa numara biçim olarak doğru yazılmıştır; değilse kullanıcıdan numarayı yeniden kontrol etmesini isteyin."
      ],
      after: [
        "Aynı dizide 7. ve 8. haneler yer değiştirseydi, yani numara 12345687950 diye yanlış yazılsaydı, tek sıralar toplamı 26, çift sıralar toplamı 19 olurdu. 26 × 7 − 19 = 163 ve 163 mod 10 = 3 çıkar; 10. hanede ise 5 yazdığı için kontrol hemen başarısız olur. Kontrol hanelerinin değeri tam olarak budur: dikkatsizlikle yapılan hatayı başvuru gönderilmeden önce yakalamak."
      ]
    },
    {
      h: "TC kimlik numarası neden çift sayıyla biter?",
      p: [
        "Son hanenin her zaman 0, 2, 4, 6 ya da 8 olması tesadüf değildir, iki kuralın birleşiminden matematiksel olarak çıkar. Tek sıralı hanelerin toplamına T, çift sıralı hanelerin toplamına Ç diyelim. 10. hane, mod 10'da 7T − Ç değerine eşittir. 11. hane ise ilk on hanenin toplamıdır: T + Ç + (7T − Ç)."
      ],
      formula: "11. hane ≡ T + Ç + (7T − Ç) ≡ 8T (mod 10)",
      after: [
        "8T her zaman çift bir sayıdır ve çift bir sayının 10'a bölümünden kalan da çifttir. Dolayısıyla tek bir rakamla biten bir numara görürseniz, başka hiçbir hesap yapmadan yanlış yazıldığını söyleyebilirsiniz. Bu özellik, kullanıcıya \"son hane çift olmalı\" gibi hızlı bir ipucu vermek için de kullanılabilir."
      ]
    },
    {
      h: "Algoritma kontrolü kişinin varlığını doğrular mı?",
      p: [
        "Hayır. Algoritma kontrolü yalnızca rakamların kendi aralarındaki ilişkiye bakar. On milyonlarca farklı dizi bu kurallara uyar ve bunların hangisinin bir kişiye verildiği, kime ait olduğu ya da kişinin hayatta olup olmadığı bu hesapla bilinemez. Bu yüzden kontrolden geçen bir numara için \"geçerli kimlik\" değil, en fazla \"biçimi doğru\" denebilir.",
        "Bir kurumun gerçekten kimlik doğrulaması yapması gerekiyorsa, NVİ'nin yetkili kurumlara sunduğu kimlik paylaşım ve doğrulama hizmetlerini kullanması gerekir; bu hizmetlerde numara ad, soyad ve doğum yılı gibi bilgilerle birlikte sorgulanır ve erişim mevzuatla sınırlandırılmıştır. Bireyler kendi kimlik bilgilerini e-Devlet üzerinden görebilir."
      ],
      note: "Uyarı: Başkasına ait kimlik numarasını izinsiz kullanmak, sahte kimlik ya da belge düzenlemek ve kimlik bilgileriyle dolandırıcılık yapmak Türk Ceza Kanunu kapsamında suçtur. Kimlik numarası 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel veridir; toplanması, saklanması ve paylaşılması hukuki dayanak gerektirir. Bu sayfa ve ilgili araç yalnızca yazım hatalarını yakalamaya yöneliktir; numara üretmez ve sorgulamaz."
    },
    {
      h: "Vergi kimlik numarası ile TC kimlik numarası farkı",
      p: [
        "Vergi kimlik numarası (VKN), vergi idaresinin mükellefleri tanımlamak için kullandığı numaradır ve <strong>10 hanelidir</strong>. Şirketler, dernekler, vakıflar ve diğer tüzel kişiler 10 haneli VKN kullanır. Gerçek kişiler için ise T.C. kimlik numarası vergi kimlik numarası yerine geçer; şahıs şirketi sahibi, serbest meslek erbabı ya da kira geliri beyan eden biri işlemlerini kimlik numarasıyla yürütür.",
        "VKN'nin son hanesi de bir kontrol hanesidir, ancak hesap TC kimlik numarasından farklıdır: ilk dokuz hanenin her birine sıra numarasına bağlı bir ekleme, ikinin kuvvetleriyle çarpma ve mod 9 işlemleri uygulanır, sonuç mod 10 ile tek haneye indirilir. Bu nedenle bir numarayı denetlerken önce hane sayısına bakıp hangi kuralın uygulanacağını seçmek gerekir. Kendi vergi numaranızı nereden öğreneceğinizi [[bilgi:vergi-numarasi-nasil-ogrenilir|vergi numarası nasıl öğrenilir]] yazısında bulabilirsiniz."
      ],
      table: {
        head: ["Özellik", "T.C. kimlik numarası", "Vergi kimlik numarası (VKN)"],
        rows: [
          ["Hane sayısı", "11", "10"],
          ["Kime verilir?", "T.C. vatandaşı gerçek kişiler", "Tüzel kişiler ve bazı gerçek kişiler"],
          ["Veren kurum", "Nüfus ve Vatandaşlık İşleri", "Gelir İdaresi Başkanlığı"],
          ["Kontrol hanesi", "Son iki hane", "Son hane"],
          ["Son hane özelliği", "Her zaman çift", "0–9 arası herhangi bir rakam"],
          ["Faturada kullanım", "Şahıs mükelleflerde VKN yerine", "Şirket faturalarında"]
        ]
      },
      after: [
        "Yabancı uyruklu kişilere verilen ve 99 ile başlayan yabancı kimlik numaraları da 11 hanelidir ve aynı kontrol yapısını kullanır. Bu nedenle 99 ile başlayan bir numara algoritma kontrolünden geçebilir; bu da kontrolün kişinin uyruğu ya da durumu hakkında bilgi vermediğini bir kez daha gösterir."
      ]
    },
    {
      h: "Formlarda numara doğrulaması nasıl yapılmalı?",
      p: [
        "Bir başvuru formu, fatura ekranı ya da müşteri kayıt sistemi tasarlıyorsanız kontrol hanesi denetimi kullanıcı deneyimini belirgin biçimde iyileştirir. Yanlış yazılan numarayı form gönderilmeden yakalamak, sonradan yapılacak düzeltmelerden çok daha ucuzdur."
      ],
      ul: [
        "Önce boşluk, tire ve nokta gibi karakterleri temizleyin; ardından tam 11 rakam olup olmadığına bakın.",
        "İlk hanenin 0 olmadığını, son hanenin çift olduğunu kontrol edin; bu iki hızlı test birçok hatayı tek başına yakalar.",
        "Ardından iki kontrol hanesini hesaplayın ve yazılanla karşılaştırın; negatif sonuçlarda matematiksel mod alın.",
        "Hata mesajında \"numara geçersiz\" yerine \"numarayı yazarken bir rakam hatalı olabilir, lütfen kontrol edin\" gibi yönlendirici bir ifade kullanın.",
        "Kontrolü yalnızca istemci tarafında yapmakla yetinmeyin; sunucuda da tekrarlayın, ama kimlik doğrulaması gerekiyorsa yetkili resmî hizmeti kullanın.",
        "Kimlik numarasını gereğinden fazla saklamayın, kayıtlarda maskeleyin ve kişisel veri mevzuatına uygun aydınlatma metni sunun."
      ]
    },
    {
      h: "TC Kimlik Doğrula aracı ne yapar, ne yapmaz?",
      p: [
        "[[arac:tc-kimlik-dogrula|TC Kimlik Doğrula aracı]] yazdığınız 11 haneli numaranın yukarıdaki kurallara uyup uymadığını tarayıcınızda denetler ve hangi koşulun sağlanmadığını tek tek gösterir. Numara hiçbir sunucuya gönderilmez, kaydedilmez ve kimseyle paylaşılmaz.",
        "Araç numaranın kime ait olduğunu söylemez, NVİ ya da MERNİS sorgusu yapmaz ve numara üretmez. Amacı, kendi numaranızı ya da müşterinizin size verdiği numarayı bir forma girmeden önce yazım hatası açısından kontrol etmenizdir. 10 haneli şirket vergi numaraları için [[arac:vergi-no-dogrula|Vergi No Doğrula aracı]] aynı mantıkla biçimsel kontrol yapar. Banka hesap numaralarındaki benzer kontrol hanesi mantığı için [[bilgi:iban-nedir-kac-haneli|IBAN kaç haneli]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["TC kimlik numarası nasıl oluşur?", "Numara 11 haneden oluşur. İlk dokuz hane kişiyi ayırt eden kısımdır ve NVİ tarafından verilir; 10. ve 11. haneler ise bu dokuz haneden belirli bir kuralla hesaplanan kontrol haneleridir. İlk hane hiçbir zaman sıfır olamaz."],
    ["Son iki hane nasıl hesaplanır?", "10. hane için tek sıralı hanelerin toplamı 7 ile çarpılır, çift sıralı hanelerin toplamı çıkarılır ve sonucun mod 10 değeri alınır. 11. hane ise ilk on hanenin toplamının mod 10 değeridir. Bu hesap yazım hatasını yakalamak için kullanılır."],
    ["TC kimlik numarası neden çift sayıyla biter?", "11. hane, matematiksel olarak tek sıralı haneler toplamının 8 katının mod 10 değerine eşit çıkar. Sekizin herhangi bir katı çift olduğu için son hane de her zaman 0, 2, 4, 6 ya da 8 olur; tek rakamla biten numara mutlaka hatalıdır."],
    ["Vergi kimlik numarası ile TC kimlik farkı nedir?", "TC kimlik numarası 11 hanelidir ve gerçek kişilere NVİ tarafından verilir. Vergi kimlik numarası 10 hanelidir, Gelir İdaresi Başkanlığı tarafından verilir ve şirketler gibi tüzel kişilerde kullanılır. İki numaranın kontrol hanesi algoritmaları da birbirinden farklıdır."],
    ["Şahıslar vergi numarası yerine TC kimlik kullanabilir mi?", "Evet. Gerçek kişilerde T.C. kimlik numarası vergi kimlik numarası yerine geçer; şahıs şirketi sahipleri, serbest meslek erbabı ve kira geliri beyan edenler vergi işlemlerini kimlik numarasıyla yürütür. Faturalarda da bu numara yazılır."],
    ["Algoritma kontrolü kişinin varlığını doğrular mı?", "Hayır. Kontrol yalnızca rakamların kendi aralarındaki matematiksel ilişkiye bakar ve çok sayıda dizi bu kurallara uyar. Numaranın kime ait olduğunu ya da kişinin var olup olmadığını göstermez; bu bir NVİ sorgusu değildir."],
    ["Formlarda numara doğrulaması nasıl yapılır?", "Karakterler temizlenir, 11 rakam ve sıfır olmayan ilk hane aranır, son hanenin çift olduğu ve iki kontrol hanesinin hesapla tuttuğu denetlenir. Kimlik doğrulaması gereken işlerde ise yetkili kurumların resmî doğrulama hizmeti kullanılmalıdır."],
    ["Mod 10 işlemi nedir?", "Mod 10, bir sayının 10'a bölümünden kalan değerdir ve pozitif sayılarda son basamağa eşittir; örneğin 155 mod 10 sonucu 5'tir. Negatif sayılarda matematiksel kalan 0 ile 9 arasında olacak şekilde 10 eklenerek bulunur."],
    ["TC kimlik doğrulama aracına yazdığım numara kaydediliyor mu?", "Hayır. Araç tamamen tarayıcınızda çalışır, numarayı hiçbir sunucuya göndermez ve saklamaz. Yalnızca yazım hatası olup olmadığını gösterir; kişi sorgulamaz, numara üretmez ve resmî bir doğrulama yerine geçmez."]
  ],
  tools: ["tc-kimlik-dogrula", "vergi-no-dogrula", "mod-alma-hesapla"],
  related: ["vergi-numarasi-nasil-ogrenilir", "iban-nedir-kac-haneli"],
  sources: [
    ["Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü", "https://www.nvi.gov.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["Kişisel Verileri Koruma Kurumu", "https://www.kvkk.gov.tr/"]
  ],
  uyari: "algoritma kontrolü kimlik doğrulaması ya da NVİ sorgusu değildir; başkasına ait kimlik bilgisini izinsiz kullanmak suçtur"
};
