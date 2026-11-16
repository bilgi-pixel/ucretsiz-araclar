export default {
  slug: "kitapcik-baski-nasil-yapilir-bir-sayfaya-iki-sayfa",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Kitapçık Baskı Nasıl Yapılır? Bir Sayfaya İki Sayfa Yazdırma ve Sıralama",
  pageTitle: "Kitapçık Baskı Nasıl Yapılır? Bir Sayfaya İki Sayfa Yazdırma",
  description: "Kitapçık baskıda her A4 kâğıda iki yüzüyle 4 sayfa gelir; bu yüzden sayfa sayısı 4'ün katı olmalı. 8 sayfalık dizilim, tek taraflı yazıcıda baskı, cilt payı, tasarruf.",
  keywords: ["kitapçık baskı", "bir sayfaya iki sayfa yazdırma", "booklet yazdırma", "pdf kitapçık yapma", "a4 kitapçık a5", "sayfa sayısı 4'ün katı", "çift taraflı kitapçık", "kitapçık sayfa sıralaması"],
  lead: "Kitapçık baskıda <strong>her A4 kâğıdın iki yüzüne ikişer sayfa, yani toplam 4 sayfa</strong> basılır ve kâğıtlar ortadan katlanınca A5 boyutunda bir kitapçık oluşur. Katlanınca doğru sırayla okunabilmesi için sayfalar karışık görünen bir düzende dizilir: 8 sayfalık kitapçıkta ilk kâğıdın ön yüzüne 8 ve 1, arka yüzüne 2 ve 7 gelir. Bu yüzden sayfa sayısı 4'ün katı olmalıdır. Bu yazıda dizilim mantığını, PDF'i kitapçık düzenine çevirmeyi, tek taraflı yazıcıda kitapçık basmayı, cilt payını ve 2'li, 4'lü, 9'lu yazdırmanın farkını bulacaksınız.",
  kisaCevap: [
    "Bir A4 kâğıt = 2 yüz × 2 sayfa = 4 kitapçık sayfası; kâğıt sayısı = sayfa sayısı ÷ 4 (yukarı yuvarlanır).",
    "Sayfa sayısı 4'ün katı değilse sona boş sayfa eklenir: 10 sayfa 12'ye, 18 sayfa 20'ye tamamlanır.",
    "8 sayfalık dizilim: 1. kâğıt ön 8|1, arka 2|7; 2. kâğıt ön 6|3, arka 4|5.",
    "Kitapçıkta kâğıt yatay kullanılır ve çift taraflı baskıda kısa kenardan çevrilir.",
    "A4 sayfa A5'e sığarken yaklaşık %71 ölçeklenir; 12 punto yazı yaklaşık 8,5 punto görünür.",
    "Tek taraflı A4 baskıya göre kitapçık kâğıdı %75 azaltır: 8 sayfa için 8 yerine 2 kâğıt."
  ],
  figure: {
    alt: "8 sayfalık kitapçık dizilimi: birinci kâğıdın ön yüzünde 8 ve 1, arka yüzünde 2 ve 7; ikinci kâğıdın ön yüzünde 6 ve 3, arka yüzünde 4 ve 5. Kâğıtlar iç içe konup ortadan katlanıyor.",
    caption: "Her kâğıdın ön ve arka yüzünde iki sayfa vardır. İkinci kâğıt birincinin içine yerleştirilip ortadan katlandığında sayfalar 1'den 8'e sırayla okunur. Her yüzdeki iki sayfanın toplamı sayfa sayısının bir fazlasıdır (9).",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">8 sayfalık kitapçık: hangi sayfa nereye?</text>
  <text x="185" y="60" class="b mid">1. kâğıt (dış)</text>
  <text x="535" y="60" class="b mid">2. kâğıt (iç)</text>
  <g class="mid">
    <rect x="40" y="74" width="290" height="110" rx="6" class="sf sb"/>
    <line x1="185" y1="74" x2="185" y2="184" class="st dash" fill="none"/>
    <text x="112" y="142" class="xl">8</text><text x="258" y="142" class="xl p">1</text>
    <text x="185" y="200" class="sm mu">ön yüz</text>
    <rect x="40" y="214" width="290" height="110" rx="6" class="ps sb"/>
    <line x1="185" y1="214" x2="185" y2="324" class="st dash" fill="none"/>
    <text x="112" y="282" class="xl">2</text><text x="258" y="282" class="xl">7</text>
    <text x="185" y="340" class="sm mu">arka yüz (kısa kenardan çevrilir)</text>
    <rect x="390" y="74" width="290" height="110" rx="6" class="sf sb"/>
    <line x1="535" y1="74" x2="535" y2="184" class="st dash" fill="none"/>
    <text x="462" y="142" class="xl">6</text><text x="608" y="142" class="xl">3</text>
    <text x="535" y="200" class="sm mu">ön yüz</text>
    <rect x="390" y="214" width="290" height="110" rx="6" class="ps sb"/>
    <line x1="535" y1="214" x2="535" y2="324" class="st dash" fill="none"/>
    <text x="462" y="282" class="xl">4</text><text x="608" y="282" class="xl">5</text>
    <text x="535" y="340" class="sm mu">arka yüz</text>
  </g>
  <rect x="20" y="356" width="680" height="54" rx="10" class="sf sb"/>
  <rect x="20" y="356" width="8" height="54" class="p"/>
  <text x="44" y="378" class="b">Kural: aynı yüzdeki iki sayfanın toplamı = sayfa sayısı + 1</text>
  <text x="44" y="400" class="sm t2">8 + 1 = 9 · 2 + 7 = 9 · 6 + 3 = 9 · 4 + 5 = 9 · Kesik çizgi: katlama yeri</text>
</svg>`
  },
  sections: [
    {
      h: "Kitapçık baskı nedir, sayfalar neden karışık dizilir?",
      p: [
        "Kitapçık baskı, belgeyi yatay A4 kâğıtların iki yüzüne ikişer sayfa gelecek şekilde basıp kâğıtları iç içe yerleştirerek ortadan katlamaktır. Sonuçta A5 boyutunda, ortadan zımbalanabilen ya da dikilebilen küçük bir kitap elde edilir. Okul broşürleri, düğün ve etkinlik programları, kullanım kılavuzları, şiir ve öykü kitapçıkları, sınav kitapçıkları ve dernek bültenleri bu yöntemle kolayca hazırlanır.",
        "Sayfalar karışık görünür, çünkü katlandıktan sonra doğru sırada okunmaları gerekir. En dıştaki kâğıt hem ilk sayfayı hem son sayfayı taşır: ön yüzünün sağında kapak (1. sayfa), solunda arka kapak (son sayfa) bulunur. Arka yüzünde ise 2. sayfa ile sondan bir önceki sayfa yan yana durur. İçerideki kâğıtlar ortadaki sayfaları taşır; en içteki kâğıdın arka yüzünde kitapçığın tam ortasındaki iki sayfa yan yana gelir.",
        "Bu düzene matbaacılıkta \"imposition\" (sayfa yerleşimi) denir. Elle düzenlemek mümkündür ama hataya açıktır; yazıcı sürücülerinin \"kitapçık\" seçeneği ya da PDF araçları bu sıralamayı otomatik yapar."
      ]
    },
    {
      h: "Kitapçık için sayfa sayısı neden 4'ün katı olmalı?",
      p: [
        "Her kâğıdın iki yüzü, her yüzün iki yarısı vardır; dolayısıyla bir kâğıt tam olarak 4 kitapçık sayfası taşır. Kâğıt yarıya bölünemeyeceği için toplam sayfa sayısı 4'ün katına tamamlanır. Eksik kalan sayfalar boş sayfa olarak tamamlanır. Araçların çoğu boş sayfaları en sona ekler; belgenizin son sayfası bir arka kapaksa, boş sayfaları arka kapağın önüne kendiniz eklemeniz daha düzgün bir sonuç verir."
      ],
      formula: "Kâğıt sayısı = sayfa sayısı ÷ 4 (yukarı yuvarlanır)\nTamamlanmış sayfa sayısı = kâğıt sayısı × 4\nAynı yüzdeki iki sayfanın toplamı = tamamlanmış sayfa sayısı + 1",
      table: {
        head: ["Belgedeki sayfa", "Tamamlanmış sayfa", "Boş sayfa", "Kâğıt sayısı"],
        rows: [
          ["8", "8", "0", "2"],
          ["10", "12", "2", "3"],
          ["15", "16", "1", "4"],
          ["18", "20", "2", "5"],
          ["24", "24", "0", "6"],
          ["30", "32", "2", "8"]
        ]
      },
      after: [
        "Boş sayfalar tasarımı bozuyorsa onları kaldırmak yerine içeriği yeniden düzenleyin: bir \"Notlar\" sayfası, içindekiler, bir görsel ya da arka kapak bilgisi eklemek yaygın çözümlerdir. Boş sayfa eklemek, sayfaları sıralamak ya da gereksizleri silmek için [[arac:pdf-sayfa-duzenle|PDF Sayfa Düzenleme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 12 sayfalık kitapçığın dizilimi",
      p: [
        "12 sayfalık bir kitapçık 3 kâğıt gerektirir. Aynı yüzdeki iki sayfanın toplamı 13'tür. Dıştaki kâğıttan içeriye doğru dizilim şöyledir; her satırda solda ve sağda basılacak sayfalar yazar:"
      ],
      table: {
        head: ["Kâğıt", "Ön yüz (sol | sağ)", "Arka yüz (sol | sağ)"],
        rows: [
          ["1. kâğıt (dış)", "12 | 1", "2 | 11"],
          ["2. kâğıt", "10 | 3", "4 | 9"],
          ["3. kâğıt (iç)", "8 | 5", "6 | 7"]
        ],
        caption: "Ön yüzde sağdaki sayfa tek, soldaki çift numaralıdır; arka yüzde tersi geçerlidir. Her kâğıtta sağ ve sol sayfa numaraları ikişer artar ve azalır."
      },
      after: [
        "Kontrol için kâğıtları sırayla üst üste koyup ortadan katladığınızda sayfaları çevirin: 1, 2, 3 … 12 sırasıyla ilerlemelidir. Kâğıt sayısı arttıkça elle dizmek zorlaşır; bu nedenle PDF'i kitapçık düzenine çeviren bir araç kullanmak hem zaman kazandırır hem hata riskini ortadan kaldırır."
      ]
    },
    {
      h: "PDF kitapçık düzenine nasıl çevrilir? Adım adım",
      ol: [
        "Belgenizi PDF olarak kaydedin. Sayfa boyutlarının hepsi aynı değilse önce tek boyuta (genellikle A4) getirin; karışık boyutlar kitapçıkta kayma yaratır.",
        "Sayfa sayısını kontrol edin ve gerekirse boş sayfalar ekleyerek 4'ün katına tamamlayın. Araçların çoğu bunu otomatik yapar.",
        "PDF'i kitapçık düzeninde yeniden oluşturun: [[arac:pdf-n-up|PDF N-up ve Kitapçık]] aracında kitapçık modunu seçtiğinizde sayfalar yatay A4 yaprakların iki yarısına doğru sırayla yerleştirilir.",
        "Çıktı PDF'ini açıp ilk yaprağın sol yarısında son sayfanın, sağ yarısında ilk sayfanın olduğunu kontrol edin.",
        "Yazdırırken \"gerçek boyut\" ya da \"%100\" seçin; yazıcının \"sayfaya sığdır\" ayarı ikinci kez küçültme yapabilir.",
        "Çift taraflı baskıda \"kısa kenardan çevir\" seçeneğini kullanın, sonra kâğıtları sırasıyla iç içe koyup katlayın ve ortadan zımbalayın."
      ],
      after: [
        "Farklı boyutlu sayfaları tek boyuta getirmek için [[arac:pdf-a4-boyutlandir|PDF A4 Boyutlandırma]] aracını kullanabilirsiniz. Tüm işlemler tarayıcınızda yapılır; PDF'iniz bilgisayarınızdan çıkmaz. Sayfa döndürme ve silme gibi ek düzenlemeler için [[bilgi:pdf-sayfa-silme-ve-dondurme|PDF sayfa silme ve döndürme]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Tek taraflı yazıcıda kitapçık nasıl basılır?",
      p: [
        "Yazıcınız otomatik çift taraflı baskı yapmıyorsa kitapçığı elle çift taraflı basabilirsiniz. Önemli olan kâğıdı doğru yönde geri yerleştirmektir; bunun için önce tek bir kâğıtla deneme yapın."
      ],
      ol: [
        "Kitapçık düzenindeki PDF'te yalnızca tek numaralı yaprakları (1., 3., 5. …) yani ön yüzleri yazdırın.",
        "Basılan kâğıtları sırasını bozmadan alın.",
        "Deneme kâğıdının üzerine bir ok çizerek yazıcınızın kâğıdı hangi yüzüne ve hangi yönde bastığını öğrenin.",
        "Kâğıt destesini kısa kenarından çevirerek yazıcıya geri yerleştirin; yazıcınıza göre destenin sırasını tersine çevirmeniz gerekebilir.",
        "Çift numaralı yaprakları (2., 4., 6. …) yani arka yüzleri yazdırın. Bazı yazıcılarda bu yaprakları ters sırayla basmak gerekir; yazdırma penceresindeki \"ters sıra\" seçeneği işinizi görür.",
        "Kâğıtları sırasıyla iç içe koyup katlayın ve sayfa sırasını kontrol edin."
      ],
      after: [
        "Elle çift taraflı baskıda en sık hata, arka yüzün baş aşağı çıkmasıdır. Bu genellikle kâğıdın uzun kenardan çevrilmesinden kaynaklanır. Kitapçıkta yaprak yatay olduğu için çevirme kısa kenardan yapılmalıdır."
      ]
    },
    {
      h: "Kenar boşluğu, cilt payı ve okunurluk",
      p: [
        "A4 sayfa kitapçıkta A5 yarıya yerleştirildiğinde yaklaşık %70,7 oranında küçülür; çünkü A5'in kenarları A4'ün kenarlarının 1 ÷ √2 katıdır. Bu yüzden 12 punto yazı kitapçıkta yaklaşık 8,5 punto görünür. Okunurluğu korumak için kitapçık olarak basılacak belgeyi baştan 13–14 punto ile hazırlamak ya da doğrudan A5 sayfa boyutunda tasarlamak daha iyi sonuç verir. Kâğıt ölçüleri için [[bilgi:a4-kagit-boyutu-kac-cm|A4 kâğıt boyutu]], punto ile milimetre ilişkisi için [[bilgi:punto-kac-mm-yazi-boyutu|punto kaç mm]] yazılarına bakabilirsiniz.",
        "Cilt payı, katlama yerine yakın iç kenarda bırakılan ek boşluktur. Zımbalı ince kitapçıklarda iç kenarda 1–1,5 cm boşluk genellikle yeterlidir. Sayfa sayısı arttıkça içteki kâğıtlar katlanınca dışa doğru taşar (kayma); kalın kitapçıklarda kenar yazılarının kesilmemesi için dış kenar boşluğunu biraz geniş tutun. Çok sayfalı belgeleri tek kitapçık yerine birkaç küçük formaya bölüp sonra birleştirmek de bir çözümdür."
      ],
      table: {
        head: ["Ayar", "Öneri", "Neden?"],
        rows: [
          ["İç kenar (cilt) boşluğu", "1–1,5 cm", "Katlama ve zımba yazıyı kapatmasın"],
          ["Dış kenar boşluğu", "1–1,5 cm, kalın kitapçıkta biraz fazla", "Kayma ve kesim payı"],
          ["Gövde yazısı", "A4'te 13–14 punto ya da A5'te 10–11 punto", "Küçülme sonrası okunurluk"],
          ["Kâğıt", "80–100 g/m²", "Arka yüzden yazı geçmesin"]
        ]
      },
      after: [
        "İnce kâğıtta arka yüzdeki yazı ön yüzden görünebilir. Kâğıt gramajının ne anlama geldiği [[bilgi:kagit-gramaji-nedir-80-gr|kâğıt gramajı nedir]] yazısında anlatılır."
      ]
    },
    {
      h: "2'li, 4'lü ve 9'lu sayfa yazdırma ne işe yarar? Kâğıt tasarrufu",
      p: [
        "Kitapçık dışında bir kâğıda birden fazla sayfa basmanın başka biçimleri de vardır. Bunlara N-up yazdırma denir: 2'li, 4'lü, 6'lı ya da 9'lu. Bu düzenlerde sayfalar sırayla dizilir, katlama gerekmez; kitapçık gibi karışık sıralama yapılmaz."
      ],
      table: {
        head: ["Düzen", "Bir yüzde kaç sayfa?", "Yazı ölçeği (yaklaşık)", "Uygun kullanım"],
        rows: [
          ["Kitapçık", "2 (iki yüzde 4)", "%71", "Okunacak, katlanacak belge"],
          ["2'li N-up", "2", "%71", "Ders notu, taslak okuma"],
          ["4'lü N-up", "4", "%50", "Sunum slaytları, kontrol çıktısı"],
          ["9'lu N-up", "9", "%33", "Slayt özetleri, küçük resim listesi"]
        ]
      },
      after: [
        "Kâğıt tasarrufunu hesaplamak kolaydır. 24 sayfalık bir belgeyi 20 kopya tek taraflı A4 basarsanız 480 kâğıt kullanırsınız. Aynı belge kitapçık olarak basıldığında kopya başına 6 kâğıt, toplam 120 kâğıt gerekir; kâğıt %75 azalır ve basılan yüz sayısı da 480'den 240'a düşer. Sayfa başı baskı maliyetinizi toner ve kâğıt fiyatına göre bulmak için [[arac:sayfa-basi-maliyet-hesapla|Sayfa Başı Maliyet Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Uzun kenardan çevirmek:</strong> Kitapçıkta yaprak yatay olduğundan arka yüz baş aşağı çıkar; kısa kenar seçilmelidir.",
        "<strong>Çift ölçekleme:</strong> PDF zaten kitapçık düzenindeyken yazıcının kitapçık seçeneğini de açmak sayfaları ikinci kez küçültür ve sıralamayı bozar.",
        "<strong>Arka kapağı boş sayfaların arkasında bırakmak:</strong> Otomatik tamamlamada boş sayfalar en sona gelir; arka kapağınız varsa boş sayfaları onun önüne elle ekleyin.",
        "<strong>Kapak sayfasını unutmak:</strong> Kapak 1. sayfadır; arka kapak son sayfadır ve ikisi aynı kâğıdın ön yüzündedir.",
        "<strong>Deneme yapmadan toplu baskı:</strong> Tek kâğıtlık bir deneme, yön ve sıralama hatalarını erkenden yakalar."
      ]
    }
  ],
  faq: [
    ["Kitapçık baskıda sayfalar neden karışık sırayla dizilir?", "Kâğıtlar iç içe konup ortadan katlandığında sayfaların doğru sırada okunması için dizilim değişir. En dış kâğıt ilk ve son sayfayı, en iç kâğıt ortadaki sayfaları taşır. 8 sayfalık kitapçıkta ilk kâğıdın ön yüzünde 8 ve 1 yan yana durur."],
    ["Bir A4 kâğıda iki sayfa nasıl yazdırılır?", "Yazdırma penceresinde kâğıt başına sayfa ya da N-up seçeneğinden 2'yi seçebilir veya PDF'i önceden 2'li düzene çevirebilirsiniz. Sayfalar yatay A4 kâğıdın iki yarısına yaklaşık yüzde 71 ölçekle sığar."],
    ["Kitapçık için sayfa sayısı neden 4'ün katı olmalı?", "Bir kâğıdın iki yüzü vardır ve her yüze iki sayfa gelir; böylece bir kâğıt 4 sayfa taşır. Kâğıt yarıya bölünemediği için sayfa sayısı 4'ün katına tamamlanır, eksikler sona boş sayfa olarak eklenir."],
    ["Tek taraflı yazıcıda kitapçık nasıl basılır?", "Önce kitapçık PDF'inin ön yüz yapraklarını yazdırın, kâğıtları kısa kenarından çevirip yazıcıya geri koyun ve arka yüz yapraklarını basın. Yazıcınızın yönünü öğrenmek için önce tek kâğıtla deneme yapın."],
    ["PDF'i kitapçık düzenine nasıl çevirebilirim?", "PDF sayfalarını tek boyuta getirip sayfa sayısını 4'ün katına tamamlayın, ardından kitapçık düzeni oluşturan bir PDF aracıyla sayfaları yatay yaprakların iki yarısına sıralayın. Yazdırırken gerçek boyutu ve kısa kenardan çevirmeyi seçin."],
    ["Kenar boşluğu ve cilt payı ne kadar bırakılmalı?", "Zımbalı ince kitapçıklarda iç ve dış kenarda 1 ile 1,5 cm boşluk genellikle yeterlidir. Sayfa sayısı arttıkça içteki kâğıtlar dışa taşacağından kalın kitapçıklarda dış kenar boşluğunu biraz daha geniş tutun."],
    ["2'li, 4'lü ve 9'lu sayfa yazdırma ne işe yarar?", "Kâğıt tasarrufu ve hızlı gözden geçirme için kullanılır. 2'li düzen ders notlarına, 4'lü düzen sunum slaytlarına, 9'lu düzen slayt özetlerine uygundur. Sayfalar sırayla dizilir, kitapçık gibi katlanmaz."],
    ["Kitapçık baskıda kâğıt tasarrufu ne kadardır?", "Tek taraflı A4 baskıya göre kâğıt kullanımı yüzde 75 azalır, çünkü bir kâğıda 4 sayfa sığar. 24 sayfalık belgenin 20 kopyası tek taraflı 480 kâğıt, kitapçık olarak 120 kâğıt gerektirir."]
  ],
  tools: ["pdf-n-up", "pdf-sayfa-duzenle", "pdf-a4-boyutlandir", "sayfa-basi-maliyet-hesapla"],
  related: ["a4-kagit-boyutu-kac-cm", "kagit-gramaji-nedir-80-gr", "pdf-sayfa-silme-ve-dondurme", "toner-kac-sayfa-basar-sayfa-maliyeti"],
  sources: [
    ["ISO – ISO 216 kâğıt boyutları standardı", "https://www.iso.org/"],
    ["Türk Standardları Enstitüsü", "https://www.tse.org.tr/"]
  ]
};
