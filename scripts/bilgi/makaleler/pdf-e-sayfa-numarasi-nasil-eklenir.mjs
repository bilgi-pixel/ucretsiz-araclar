export default {
  slug: "pdf-e-sayfa-numarasi-nasil-eklenir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'e Sayfa Numarası Nasıl Eklenir? Konum, Başlangıç Sayısı ve Biçim",
  pageTitle: "PDF'e Sayfa Numarası Ekleme: Konum, Başlangıç ve Biçim",
  description: "PDF'e sonradan sayfa numarası eklemek mümkündür: konumu seçin, kapak gibi ilk sayfaları atlayın, başlangıç sayısını belirleyin ve 1 / 12 biçimini kullanın. Tez örneği.",
  keywords: ["pdf sayfa numarası ekleme", "pdf'e numara verme", "pdf sayfa numarası nasıl eklenir", "tez sayfa numarası pdf", "kapak hariç sayfa numarası", "pdf sayfa numarası ücretsiz", "sayfa x / y", "pdf numaralandırma"],
  lead: "PDF'e sayfa numarası eklemek için dosyayı bir numaralandırma aracında açıp numaranın konumunu (alt orta, sağ alt, üst köşe), biçimini (1, 1 / 12, Sayfa 1) ve başlangıç sayısını seçmeniz yeterlidir; kaynak Word dosyasına ihtiyaç yoktur. Kapak gibi ilk sayfalar atlanabilir, numaralandırma istediğiniz sayıdan başlatılabilir. Bu yazıda tez, rapor ve dilekçe gibi belgeler için doğru ayarları, Roma rakamlı ön sayfaların nasıl çözüleceğini ve birleştirilen dosyalarda sıralamanın nasıl korunacağını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Sayfa numarası PDF'e sonradan, her sayfanın üzerine yeni bir metin katmanı olarak eklenebilir; mevcut içerik değişmez.",
    "Atlanan sayfa sayısı ile başlangıç numarası ayrı ayarlardır: kapak atlanıp ikinci sayfaya 1 de verilebilir, 2 de.",
    "\"Sayfa 1 / 12\" biçiminde ikinci sayı, numaralanan sayfaların değil genellikle belgenin toplam sayfa sayısını gösterir; araç ayarına dikkat edin.",
    "Roma rakamlı ön bölüm ve Arap rakamlı ana metin için belge iki parçaya ayrılıp ayrı numaralanır, sonra birleştirilir.",
    "Dosyaları önce birleştirip sonra numaralamak, numaraların kesintisiz sıralanmasını sağlar.",
    "Numara eklemek dosya boyutunu yalnızca birkaç kilobayt artırır."
  ],
  figure: {
    alt: "Altı sayfalık bir belgenin numaralandırılması: kapak atlanıyor, ikinci sayfadan itibaren alt ortada 1'den 5'e numara; altta atlanan sayfa ve başlangıç numarası ayarlarının farkı.",
    caption: "\"İlk kaç sayfa atlansın\" ayarı numaranın nereden itibaren basılacağını, \"başlangıç numarası\" ise ilk basılan sayfaya hangi sayının yazılacağını belirler. İkisi birlikte kullanıldığında kapak, içindekiler ve ana metin istenen biçimde numaralanır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kapak hariç numaralandırma</text>
  <g>
    <rect x="30" y="56" width="96" height="130" rx="4" class="dgs"/>
    <text x="78" y="110" class="mid b">Kapak</text>
    <text x="78" y="132" class="mid sm dg">atlanır</text>
    <rect x="146" y="56" width="96" height="130" rx="4" class="sf sb"/>
    <rect x="262" y="56" width="96" height="130" rx="4" class="sf sb"/>
    <rect x="378" y="56" width="96" height="130" rx="4" class="sf sb"/>
    <rect x="494" y="56" width="96" height="130" rx="4" class="sf sb"/>
    <rect x="610" y="56" width="96" height="130" rx="4" class="sf sb"/>
    <g class="sm mu">
      <line x1="160" y1="80" x2="228" y2="80" class="sb" fill="none"/><line x1="160" y1="96" x2="228" y2="96" class="sb" fill="none"/><line x1="160" y1="112" x2="210" y2="112" class="sb" fill="none"/>
      <line x1="276" y1="80" x2="344" y2="80" class="sb" fill="none"/><line x1="276" y1="96" x2="344" y2="96" class="sb" fill="none"/>
      <line x1="392" y1="80" x2="460" y2="80" class="sb" fill="none"/><line x1="392" y1="96" x2="440" y2="96" class="sb" fill="none"/>
      <line x1="508" y1="80" x2="576" y2="80" class="sb" fill="none"/><line x1="508" y1="96" x2="576" y2="96" class="sb" fill="none"/>
      <line x1="624" y1="80" x2="692" y2="80" class="sb" fill="none"/>
    </g>
    <text x="194" y="176" class="mid b p">1</text>
    <text x="310" y="176" class="mid b p">2</text>
    <text x="426" y="176" class="mid b p">3</text>
    <text x="542" y="176" class="mid b p">4</text>
    <text x="658" y="176" class="mid b p">5</text>
  </g>
  <g class="sm mid mu">
    <text x="78" y="206">PDF s. 1</text><text x="194" y="206">PDF s. 2</text><text x="310" y="206">PDF s. 3</text>
    <text x="426" y="206">PDF s. 4</text><text x="542" y="206">PDF s. 5</text><text x="658" y="206">PDF s. 6</text>
  </g>
  <rect x="30" y="230" width="320" height="150" rx="10" class="ps"/>
  <text x="46" y="258" class="b">Ayar A</text>
  <text x="46" y="284" class="sm">İlk kaç sayfa atlansın: 1</text>
  <text x="46" y="306" class="sm">Başlangıç numarası: 1</text>
  <text x="46" y="340" class="sm b">2. sayfaya "1" yazılır</text>
  <text x="46" y="362" class="sm t2">Kapak sayılmaz (yukarıdaki görünüm)</text>
  <rect x="370" y="230" width="320" height="150" rx="10" class="oks"/>
  <text x="386" y="258" class="b">Ayar B</text>
  <text x="386" y="284" class="sm">İlk kaç sayfa atlansın: 1</text>
  <text x="386" y="306" class="sm">Başlangıç numarası: 2</text>
  <text x="386" y="340" class="sm b">2. sayfaya "2" yazılır</text>
  <text x="386" y="362" class="sm t2">Kapak sayılır ama numarası basılmaz</text>
</svg>`
  },
  sections: [
    {
      h: "PDF'e sonradan sayfa numarası eklemek mümkün mü?",
      p: [
        "Evet. PDF düzenlenemez bir biçim gibi görünse de her sayfanın üzerine yeni metin, şekil ya da görüntü katmanı eklemek mümkündür. Sayfa numarası aracı, belirlediğiniz konuma küçük bir metin kutusu yerleştirir; sayfadaki yazı, tablo ve görseller olduğu gibi kalır. Bu sayede Word dosyasını kaybettiğiniz, taranmış belgelerden oluşan ya da farklı kaynaklardan birleştirilmiş bir PDF'e de numara verebilirsiniz.",
        "Önemli bir ayrıntı vardır: PDF'teki mevcut numaraları silmek ya da değiştirmek bu yöntemle mümkün değildir, çünkü eski numara sayfanın kendi içeriğinin parçasıdır. Belgede zaten numara varsa yeni numarayı farklı bir köşeye koymak ya da kaynağa dönüp numarasız bir PDF almak daha temiz sonuç verir."
      ]
    },
    {
      h: "Numarayı alt ortaya, sağ alta veya üste koymak",
      p: [
        "Konum seçimi belgenin türüne ve bağlanma biçimine bağlıdır. Tek yüzlü basılacak tez ve raporlarda alt orta ya da sağ alt en yaygın tercihtir. Üst köşe, başlık bilgisiyle birlikte kullanılan resmî yazışmalarda ve hukuki belgelerde görülür. Kenar boşluğu ayarı numaranın sayfa kenarına uzaklığını belirler; çok küçük tutulursa yazıcılar bu alanı basamayabilir."
      ],
      table: {
        head: ["Konum", "Uygun belge", "Dikkat edilecek nokta"],
        rows: [
          ["Alt orta", "Tez, ödev, kitapçık, sunum çıktısı", "Altbilgideki dipnot ya da logo ile çakışmasın"],
          ["Sağ alt", "Rapor, teklif, kurumsal belge", "Sağ kenar boşluğu en az 10–15 mm olsun"],
          ["Sol alt", "Çift yüz basımda çift sayfalar", "Tek yüz basımda pek tercih edilmez"],
          ["Üst orta veya sağ üst", "Dilekçe ekleri, hukuki dosyalar", "Antetli kâğıt ve başlıklarla çakışmasın"]
        ]
      },
      after: [
        "Yazı boyutu için 9–11 punto çoğu belgede okunaklıdır. Renk olarak siyah ya da koyu gri, resmî belgelerde en güvenli seçimdir; renkli numaralar fotokopide soluk çıkabilir."
      ]
    },
    {
      h: "Kapak sayfasını numaralandırmadan başlamak",
      p: [
        "Kapak, onay sayfası ya da boş arka sayfa gibi numara istemeyen sayfalar için \"ilk kaç sayfa atlansın\" ayarını kullanırsınız. Bu ayar numaranın hangi PDF sayfasından itibaren basılacağını belirler. Ardından gelen \"başlangıç numarası\" ise ilk basılan sayfaya hangi sayının yazılacağını söyler.",
        "İki yaygın beklenti vardır. Bazı kurumlar kapağın sayılmamasını, ikinci sayfanın \"1\" olmasını ister. Bazıları ise kapağın sayılıp numarasının basılmamasını, ikinci sayfanın \"2\" olmasını ister. İlki için 1 sayfa atlayıp başlangıcı 1 yapın; ikincisi için 1 sayfa atlayıp başlangıcı 2 yapın. Kurumunuzun yazım kılavuzu varsa hangisini istediğini oradan kontrol edin."
      ]
    },
    {
      h: "Numaralandırmayı 3'ten ya da başka bir sayıdan başlatmak",
      p: [
        "Başlangıç numarası, belgenin daha büyük bir dosyanın parçası olduğu durumlarda işe yarar. Örneğin bir raporun ikinci bölümünü ayrı PDF olarak hazırladıysanız ve ilk bölüm 24 sayfadan oluşuyorsa, ikinci bölümü 25'ten başlatırsınız. Aynı şekilde kapak ve içindekiler sayfası (iki sayfa) sayılıyor ama numara basılmıyorsa, 2 sayfa atlayıp başlangıcı 3 yapabilirsiniz."
      ],
      formula: "Basılan numara = başlangıç numarası + (PDF sayfa sırası − atlanan sayfa sayısı − 1)\nÖrnek: 2 sayfa atla, başlangıç 3 → PDF'in 3. sayfasına 3, 10. sayfasına 10 yazılır",
      after: [
        "Bu formül, PDF görüntüleyicinin alt çubuğunda gördüğünüz sayfa sırasının basılı numarayla nasıl ilişkilendiğini gösterir. Kontrol için son sayfaya bakın: 40 sayfalık bir PDF'te 2 sayfa atlayıp 3'ten başladıysanız son sayfa 40 yazmalıdır."
      ]
    },
    {
      h: "\"Sayfa 1 / 10\" biçimi nasıl kullanılır?",
      p: [
        "\"x / y\" biçimi okuyucuya hem bulunduğu sayfayı hem belgenin uzunluğunu söyler; sözleşme, teklif ve resmî yazışmalarda eksik sayfa olup olmadığını anlamayı kolaylaştırır. Araçta bu biçim için hazır seçenekler (1 / 12, Sayfa 1 / 12) ve kendi kalıbınızı yazabileceğiniz özel kalıp bulunur. Özel kalıpta <code>{n}</code> sayfa numarasının, <code>{toplam}</code> toplam sayfa sayısının yerini tutar; \"Sf. {n} / {toplam}\" gibi bir kalıp yazabilirsiniz.",
        "Kapak atlandığında toplam sayının neyi gösterdiğine dikkat edin. 12 sayfalık bir belgede kapak atlanıp numaralar 1'den başlarsa son sayfada \"11 / 12\" yazması kafa karıştırabilir. Böyle durumlarda başlangıcı 2 yapmak (son sayfa \"12 / 12\" olur) ya da yalnızca \"1, 2, 3\" biçimini kullanmak daha tutarlıdır. Sonucu kaydetmeden önce ilk ve son sayfaları önizlemede kontrol edin."
      ]
    },
    {
      h: "Roma rakamıyla ön sayfalar nasıl numaralanır?",
      p: [
        "Tezlerde ve kitaplarda ön bölüm (özet, önsöz, içindekiler, tablolar listesi) genellikle küçük Roma rakamlarıyla (i, ii, iii…), ana metin ise 1'den başlayan Arap rakamlarıyla numaralanır. Tek seferde iki farklı numara sistemi uygulanamıyorsa iki geçişli bir yol izlenir."
      ],
      ol: [
        "Belgeyi ön bölüm ve ana metin olarak ikiye ayırın; [[arac:pdf-sayfa-duzenle|PDF Sayfa Düzenleme]] aracında sayfaları seçip ayrı PDF olarak çıkarabilirsiniz.",
        "Ön bölümü numaralandırırken özel kalıba Roma rakamlarını sırayla yazmak yerine, ön bölümü kaynak belgede (Word gibi) Roma rakamıyla hazırlamak en temiz yoldur. Kaynak yoksa her sayfa için ayrı sayfa aralığı seçip kalıba \"i\", \"ii\" gibi sabit metin yazarak ilerleyebilirsiniz.",
        "Ana metni bu araçla 1'den başlayarak numaralandırın.",
        "İki parçayı [[arac:pdf-birlestir|PDF Birleştir]] ile yeniden tek dosya yapın ve sayfa sırasını kontrol edin."
      ],
      after: [
        "Roma rakamlarının yazım kuralları ve 1–100 karşılıkları için [[bilgi:roma-rakamlari-tablosu|Roma rakamları tablosu]] yazısına, sayı çevirisi için [[arac:roma-rakami|Roma Rakamı Çevirici]]ye bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 48 sayfalık bir tez",
      p: [
        "Bir tez PDF'i 48 sayfadan oluşsun: 1. sayfa kapak, 2. sayfa onay sayfası, 3–8. sayfalar ön bölüm (6 sayfa), 9–48. sayfalar ana metin (40 sayfa). Kılavuz, kapak ve onay sayfasının numarasız, ön bölümün Roma rakamlı, ana metnin 1'den başlamasını istiyor."
      ],
      table: {
        head: ["Parça", "PDF sayfaları", "İşlem", "Sonuç"],
        rows: [
          ["Kapak + onay", "1–2", "Numara yok", "Numarasız"],
          ["Ön bölüm", "3–8", "Kaynakta Roma rakamı ya da aralık bazlı sabit metin", "i … vi"],
          ["Ana metin", "9–48", "8 sayfa atla, başlangıç 1", "1 … 40"]
        ],
        caption: "Ana metin numarası formülle kontrol edilir: 1 + (48 − 8 − 1) = 40."
      },
      after: [
        "Ana metin tek dosyada kalacaksa ayırmaya gerek yoktur: \"ilk kaç sayfa atlansın\" alanına 8, başlangıç numarasına 1 yazmanız yeterlidir. Tez hazırlığının diğer adımları için [[rehber:tez-rapor-pdf-hazirlama|tez ve rapor PDF hazırlama rehberi]] işinize yarar."
      ]
    },
    {
      h: "Birleştirilen PDF'lerde numaralar nasıl düzenlenir?",
      p: [
        "Birden fazla PDF'i tek dosya yapıp numaralandıracaksanız sıra önemlidir: <strong>önce birleştirin, sonra numaralandırın</strong>. Dosyaları ayrı ayrı numaralandırıp sonra birleştirirseniz her parça 1'den başlar ve son belgede numaralar tekrar eder.",
        "Her dosyanın kendi numarasını koruması gereken durumlar da vardır; örneğin bir başvuru dosyasındaki ekler ayrı belgelerdir ve kendi sayfa düzenleri vardır. Bu durumda ekleri numaralandırmadan birleştirip numarayı \"Ek-1 / Sayfa {n}\" gibi bir kalıpla yalnızca ilgili sayfa aralığına ekleyebilirsiniz. Toplu dosya desteği sayesinde aynı ayarı birden fazla PDF'e tek seferde de uygulayabilirsiniz."
      ]
    },
    {
      h: "Dosya boyutu ve gizlilik",
      p: [
        "Sayfa numarası, her sayfaya birkaç karakterlik metin ve bir yazı tipi bilgisi ekler. Bu nedenle dosya boyutundaki artış çoğunlukla birkaç kilobayt düzeyindedir; 10 MB'lık bir tez dosyası numaralandırıldıktan sonra da yaklaşık 10 MB kalır. Boyut sınırı olan bir sisteme yükleyecekseniz numaralandırmadan sonra sıkıştırma yapmak daha doğru olur.",
        "Tez, sözleşme ve kişisel belgeler hassas bilgiler içerir. Bilişim Ajans'ın [[arac:pdf-sayfa-numarasi|PDF Sayfa Numarası Ekleme]] aracı dosyayı tarayıcınızda işler; dosya hiçbir sunucuya yüklenmez, internet bağlantısı kesik olsa bile sayfa açıldıktan sonra çalışmaya devam eder."
      ]
    },
    {
      h: "Adım adım: araçla numara eklemek",
      ol: [
        "Aracı açın ve PDF dosyanızı sürükleyip bırakın ya da seçin; birden fazla dosya seçebilirsiniz.",
        "Konum listesinden alt orta, sağ alt ya da üst köşe gibi bir yer seçin.",
        "Biçimi belirleyin: 1, 1 / 12, Sayfa 1, Sayfa 1 / 12, - 1 - ya da kendi özel kalıbınız.",
        "Kapak gibi numarasız kalacak sayfalar için \"ilk kaç sayfa atlansın\" alanını, gerekiyorsa başlangıç numarasını doldurun.",
        "Yalnızca bir bölümü numaralandıracaksanız sayfa aralığını yazın (örneğin 9-48).",
        "Yazı boyutu, kenar boşluğu ve rengi ayarlayın, önizlemeyi kontrol edip yeni PDF'i indirin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ayrı numaralandırıp sonra birleştirmek:</strong> numaralar her parçada 1'den başlar; önce birleştirin.",
        "<strong>Atlama ile başlangıcı karıştırmak:</strong> \"kapak sayılsın mı\" sorusunun cevabına göre başlangıcı 1 ya da 2 seçin.",
        "<strong>Mevcut numaranın üstüne basmak:</strong> eski numara silinmez; farklı konum seçin ya da numarasız kaynağa dönün.",
        "<strong>Çok küçük kenar boşluğu:</strong> 5 mm'nin altındaki boşluklar baskıda kesilebilir.",
        "<strong>Son sayfayı kontrol etmemek:</strong> formülle beklenen son numarayı hesaplayıp önizlemeyle karşılaştırın."
      ]
    }
  ],
  faq: [
    ["PDF'e sonradan sayfa numarası eklemek mümkün mü?", "Evet. Numaralandırma aracı her sayfanın üzerine yeni bir metin katmanı ekler; sayfadaki mevcut içerik değişmez. Word dosyası olmayan, taranmış ya da birleştirilmiş PDF'lere de bu yöntemle numara verebilirsiniz."],
    ["Numara alt ortaya, sağ alta veya üste nasıl konur?", "Araçtaki konum listesinden alt orta, alt sağ, alt sol, üst orta, üst sağ ya da üst sol seçeneklerinden birini seçersiniz. Kenar boşluğu ayarıyla numaranın sayfa kenarına uzaklığını da belirleyebilirsiniz."],
    ["Kapak sayfasını numaralandırmadan nasıl başlanır?", "\"İlk kaç sayfa atlansın\" alanına 1 yazın. Kapak sayılmayacaksa başlangıç numarasını 1, kapak sayılıp numarası basılmayacaksa 2 yapın; böylece ikinci sayfaya sırasıyla 1 ya da 2 yazılır."],
    ["Numaralandırmayı 3'ten başlatmak mümkün mü?", "Evet. Başlangıç numarası alanına 3 yazarsınız. Kapak ve içindekiler gibi iki sayfa sayılıp numarasız kalacaksa iki sayfa atlayıp 3'ten başlamak, üçüncü sayfaya 3 yazılmasını sağlar."],
    ["'Sayfa 1 / 10' biçimi nasıl kullanılır?", "Hazır \"Sayfa 1 / 12\" biçimini seçebilir ya da özel kalıba {n} ve {toplam} yer tutucularıyla kendi metninizi yazabilirsiniz. Kapak atlandığında toplam sayının belgenin tümünü gösterdiğini unutmayın ve son sayfayı kontrol edin."],
    ["Roma rakamıyla ön sayfalar nasıl numaralanır?", "Belgeyi ön bölüm ve ana metin olarak ayırın. Ön bölümü kaynak belgede Roma rakamıyla hazırlayın ya da sayfa aralığı bazlı sabit metinle numaralayın, ana metni 1'den başlatın ve iki parçayı yeniden birleştirin."],
    ["Birleştirilen PDF'lerde numaralar nasıl düzenlenir?", "Önce dosyaları birleştirip sonra tek seferde numaralandırın; böylece numaralar kesintisiz sıralanır. Ayrı numaralanan dosyaları birleştirirseniz her parça 1'den başlar ve numaralar tekrar eder."],
    ["Sayfa numarası eklemek dosya boyutunu artırır mı?", "Çok az artırır. Her sayfaya yalnızca birkaç karakterlik metin ve yazı tipi bilgisi eklendiği için artış genellikle birkaç kilobayttır; büyük taranmış dosyalarda fark neredeyse hissedilmez."],
    ["Dosya yüklemeden sayfa numarası eklenebilir mi?", "Evet. Bilişim Ajans'ın aracı dosyayı tarayıcınızda işler, hiçbir sunucuya göndermez. Bu yüzden tez, sözleşme ve kişisel belgeleri gizlilik endişesi olmadan numaralandırabilirsiniz."]
  ],
  tools: ["pdf-sayfa-numarasi", "pdf-birlestir", "pdf-sayfa-duzenle", "roma-rakami", "pdf-kucult"],
  related: ["roma-rakamlari-tablosu", "pdf-nasil-bolunur-sayfa-ayirma", "kitapcik-baski-nasil-yapilir-bir-sayfaya-iki-sayfa"]
};
