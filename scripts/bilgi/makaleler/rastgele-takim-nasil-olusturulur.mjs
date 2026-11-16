export default {
  slug: "rastgele-takim-nasil-olusturulur",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Rastgele Takım Nasıl Oluşturulur? Halı Saha, Sınıf ve Turnuva Kurası",
  pageTitle: "Rastgele Takım Oluşturma: Halı Saha, Sınıf ve Turnuva Kurası",
  description: "İsim listesi rastgele takımlara listeyi yansız karıştırıp sırayla dağıtarak bölünür. Seviye dengeli yılan dağıtımı, tek sayıda kişi, eleme tablosu ve kura paylaşımı.",
  keywords: ["rastgele takım oluşturma", "takım kurası", "halı saha takım kurma", "sınıfı gruplara ayırma", "isim listesi karıştırma", "dengeli takım kurma", "turnuva eşleşmesi", "eleme tablosu", "kura çekme"],
  lead: "Bir isim listesini rastgele takımlara bölmenin en doğru yolu, listeyi önce <strong>yansız biçimde karıştırmak</strong>, sonra sırayla takımlara dağıtmaktır: karışık listedeki 1. kişi A takımına, 2. kişi B takımına, 3. kişi yeniden A takımına gider. Bu yöntemde her kişinin her takıma düşme olasılığı eşittir ve takım sayıları en fazla bir kişi farkla dengelenir. Seviyelerin de dengeli olması isteniyorsa oyuncular önce gruplara ayrılır, her grup kendi içinde karıştırılır ve \"yılan\" sırasıyla dağıtılır. Bu sayfada halı saha, sınıf ve turnuva için yöntemleri ve kuranın adil olup olmadığını nasıl anlayacağınızı anlatıyoruz.",
  kisaCevap: [
    "Adil kura için önce listeyi Fisher–Yates gibi yansız bir yöntemle karıştırın, sonra sırayla takımlara dağıtın.",
    "N kişi T takıma bölündüğünde takım büyüklükleri ya ⌊N/T⌋ ya da ⌈N/T⌉ olur; örneğin 11 kişi 2 takımda 6 ve 5 kişidir.",
    "Seviye dengesi için oyuncuları güçlerine göre sıralayıp yılan dağıtımı (A-B-B-A) uygulamak, en güçlü oyuncuların tek takımda toplanmasını önler.",
    "Eleme turnuvasında katılımcı sayısı 2'nin kuvveti değilse eksik kalan yerler \"bay\" (maçsız tur atlama) ile doldurulur.",
    "Tek eleme usulünde N katılımcı için oynanacak maç sayısı her zaman N − 1'dir.",
    "Tohum (seed) değeriyle yapılan karışım tekrar üretilebilir; kurayı paylaşırken tohumu da paylaşmak şeffaflık sağlar."
  ],
  figure: {
    alt: "Rastgele takım kurmanın iki adımı: 10 isimlik liste karıştırılıyor, ardından sırayla A ve B takımlarına dağıtılıyor. Altta seviye dengesi için yılan dağıtımı A, B, B, A sırası gösteriliyor.",
    caption: "Üstte saf rastgele dağıtım: karışık liste sırayla takımlara verilir. Altta yılan dağıtımı: oyuncular güçten zayıfa sıralanır, sıra her turda tersine döner (A-B, B-A, A-B…). Böylece en güçlü iki oyuncu farklı takımlara düşer.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Karıştır, sonra sırayla dağıt</text>
  <rect x="20" y="46" width="150" height="196" rx="10" class="sf sb"/>
  <text x="95" y="70" class="b mid">Liste</text>
  <g class="sm mid"><text x="95" y="96">Ali · Burak</text><text x="95" y="120">Can · Deniz</text><text x="95" y="144">Emre · Fatih</text><text x="95" y="168">Gökay · Hakan</text><text x="95" y="192">İlker · Kerem</text></g>
  <text x="95" y="226" class="sm mid mu">10 kişi</text>
  <line x1="172" y1="144" x2="216" y2="144" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="220" y="46" width="160" height="196" rx="10" class="ps"/>
  <text x="300" y="70" class="b mid">Karışık sıra</text>
  <g class="sm mid"><text x="300" y="96">1 Deniz · 2 Ali</text><text x="300" y="120">3 Kerem · 4 Can</text><text x="300" y="144">5 Hakan · 6 Emre</text><text x="300" y="168">7 Burak · 8 İlker</text><text x="300" y="192">9 Fatih · 10 Gökay</text></g>
  <text x="300" y="226" class="sm mid mu">Fisher–Yates</text>
  <line x1="382" y1="110" x2="426" y2="90" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="382" y1="180" x2="426" y2="200" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="430" y="46" width="270" height="92" rx="10" class="oks"/>
  <text x="446" y="70" class="b">A takımı (tek sıralar)</text>
  <text x="446" y="96" class="sm">Deniz, Kerem, Hakan, Burak, Fatih</text>
  <text x="446" y="120" class="sm mu">1, 3, 5, 7, 9</text>
  <rect x="430" y="150" width="270" height="92" rx="10" class="sf sb"/>
  <text x="446" y="174" class="b">B takımı (çift sıralar)</text>
  <text x="446" y="200" class="sm">Ali, Can, Emre, İlker, Gökay</text>
  <text x="446" y="224" class="sm mu">2, 4, 6, 8, 10</text>
  <text x="20" y="278" class="b">Seviye dengesi: yılan dağıtımı</text>
  <g class="mid">
    <rect x="20" y="292" width="100" height="44" rx="8" class="p"/><text x="70" y="320" class="sf b">1 → A</text>
    <rect x="130" y="292" width="100" height="44" rx="8" class="sf sb"/><text x="180" y="320" class="b">2 → B</text>
    <rect x="240" y="292" width="100" height="44" rx="8" class="sf sb"/><text x="290" y="320" class="b">3 → B</text>
    <rect x="350" y="292" width="100" height="44" rx="8" class="p"/><text x="400" y="320" class="sf b">4 → A</text>
    <rect x="460" y="292" width="100" height="44" rx="8" class="p"/><text x="510" y="320" class="sf b">5 → A</text>
    <rect x="570" y="292" width="130" height="44" rx="8" class="sf sb"/><text x="635" y="320" class="b">6 → B …</text>
  </g>
  <text x="20" y="366" class="sm">Oyuncular güçten zayıfa sıralanır (1 en güçlü). Sıra her turda döner: A-B, B-A, A-B.</text>
  <text x="20" y="390" class="sm">Aynı seviyedeki oyuncular kendi içinde karıştırılırsa kura hem dengeli hem rastgele olur.</text>
</svg>`
  },
  sections: [
    {
      h: "Bir isim listesi rastgele takımlara nasıl bölünür?",
      p: [
        "Elle kura çekmenin klasik yolu isimleri kâğıtlara yazıp torbadan çekmektir. Dijital ortamda aynı işin karşılığı, listeyi yansız biçimde karıştırmak ve karışık listeyi sırayla takımlara dağıtmaktır. Bu iki adım ayrı düşünüldüğünde kuranın adil olup olmadığını denetlemek de kolaylaşır."
      ],
      ol: [
        "Katılımcıları her satıra bir isim gelecek şekilde yazın; tekrar eden isimleri ve boş satırları temizleyin.",
        "Listeyi yansız bir yöntemle karıştırın. [[arac:satirlari-karistir|Satırları Karıştırma aracı]] alt alta yazılmış isimleri tek tıkla rastgele sıraya dizer.",
        "Takım sayısını belirleyin (T).",
        "Karışık listede 1. kişiyi 1. takıma, 2. kişiyi 2. takıma, …, T. kişiyi T. takıma verin; T+1. kişiden itibaren yeniden 1. takımdan başlayın.",
        "Sonucu herkesin görebileceği şekilde paylaşın."
      ],
      after: [
        "Bu yöntemde takım büyüklükleri kendiliğinden dengelenir: N kişi T takıma bölündüğünde her takım ya N ÷ T'nin aşağı yuvarlanmışı ya da yukarı yuvarlanmışı kadar kişi alır. 22 kişi 4 takıma bölünürse iki takım 6, iki takım 5 kişi olur."
      ]
    },
    {
      h: "Rastgele karıştırma gerçekten adil midir?",
      p: [
        "Bir karıştırmanın adil olması, listenin olası tüm sıralamalarının eşit olasılıkla ortaya çıkması demektir. 10 kişilik bir listenin 3.628.800 farklı sıralaması vardır ve iyi bir karıştırma algoritması bunların her birini aynı olasılıkla üretir. Bu özelliği garanti eden yöntemlerin en bilineni <strong>Fisher–Yates</strong> (Knuth) karıştırmasıdır: listenin sonundan başlanır, her adımda kalan elemanlar arasından rastgele biri seçilip o konuma yerleştirilir.",
        "Sık yapılan bir hata, listeyi \"rastgele bir karşılaştırmayla sıralamak\"tır. Bu yöntem bazı sıralamaları diğerlerinden daha olası kılar ve listenin başındaki isimlerin belirli takımlara düşme eğilimi yaratabilir. Bir başka zayıf nokta da rastgele sayı kaynağıdır: tahmin edilebilir sayılar üreten basit üreteçler yerine tarayıcıların kriptografik rastgele sayı üreteci daha güvenilirdir. Bilişim Ajans'ın karıştırma, çekiliş ve [[arac:rastgele-sayi|Rastgele Sayı]] araçları bu güvenli kaynağı kullanır.",
        "Adil bir kuranın sonucunda bile şans eseri dengesiz takımlar çıkabilir. Rastgelelik herkesin eşit şansa sahip olmasını sağlar, sonucun dengeli olmasını değil. Seviye dengesi istiyorsanız bir sonraki bölümdeki yöntemi kullanın. Olasılığın temelleri için [[bilgi:olasilik-nasil-hesaplanir|olasılık nasıl hesaplanır]] yazısına bakabilirsiniz."
      ],
      table: {
        head: ["Kişi ve takım", "Olası farklı takım düzeni"],
        rows: [
          ["10 kişi, 2 takım (5'er)", "126"],
          ["12 kişi, 3 takım (4'er)", "5.775"],
          ["30 kişilik sınıf, 6 grup (5'er)", "Yaklaşık 1,2 × 10<sup>17</sup>"]
        ],
        caption: "Takımların adı olmadığı (A ile B'nin yer değiştirmesinin aynı düzen sayıldığı) varsayılmıştır. Sayılar, elle denemeyle adil kura yapmanın neden mümkün olmadığını gösterir."
      }
    },
    {
      h: "Halı sahada adil ve seviye dengeli takım nasıl kurulur?",
      p: [
        "Halı saha maçında tamamen rastgele kura bazen tüm iyi oyuncuları aynı tarafa toplar ve maçın tadı kaçar. Seviye dengesini korurken rastgeleliği de kaybetmemenin en pratik yolu <strong>katmanlı kura</strong> ve <strong>yılan dağıtımıdır</strong>."
      ],
      ol: [
        "Oyuncuları kabaca seviye gruplarına ayırın: örneğin 14 kişide 4 güçlü, 6 orta, 4 yeni başlayan.",
        "Kaleci gibi özel rolleri ayrı tutun ve her takıma birer tane verin.",
        "Her grubu kendi içinde ayrı ayrı karıştırın.",
        "Grupları güçlüden zayıfa art arda dizin ve yılan sırasıyla dağıtın: 1. oyuncu A'ya, 2. B'ye, 3. B'ye, 4. A'ya, 5. A'ya, 6. B'ye…",
        "Sonuçta her takım her seviyeden yaklaşık eşit sayıda oyuncu alır."
      ],
      after: [
        "Yılan dağıtımının mantığı basittir: düz sırayla (A-B-A-B) dağıtıldığında her turda ilk seçimi A takımı yapar ve küçük de olsa avantaj birikir. Sıranın her turda dönmesi bu avantajı dengeler. Maç sonunda gol farkını ve puan durumunu takip etmek isterseniz [[bilgi:gol-averaji-nasil-hesaplanir-lig-fiksturu|gol averajı ve fikstür]] yazısı işinize yarar."
      ]
    },
    {
      h: "Tek sayıda kişide takımlar nasıl dengelenir?",
      p: [
        "Kişi sayısı takım sayısına tam bölünmüyorsa bazı takımlar bir kişi fazla olur. Sırayla dağıtım yöntemi bu farkı en fazla bir kişiyle sınırlar. 11 kişi iki takıma bölündüğünde takımlar 6 ve 5 kişi, 23 öğrenci 4 gruba bölündüğünde grupların üçü 6, biri 5 kişi olur."
      ],
      ul: [
        "<strong>Dönüşümlü oyuncu:</strong> Halı sahada fazla kişi, iki takım arasında belirli aralıklarla taraf değiştirebilir.",
        "<strong>Eksik takıma avantaj:</strong> Kalabalık takım kaleciyi sahada oynatmaz ya da az kişili takım ek oyuncu değişikliği hakkı alır.",
        "<strong>Görev dağılımı:</strong> Sınıfta 5 kişilik gruba daha kısa bir görev ya da 6 kişilik gruplara ek bir rol (sunucu, zaman tutucu) verilir.",
        "<strong>Yedek listesi:</strong> Fazla kişi yedek olarak kaydedilir ve ilk sakatlıkta ya da yorgunlukta oyuna girer."
      ]
    },
    {
      h: "Sınıf rastgele gruplara nasıl ayrılır?",
      p: [
        "Öğretmenler için rastgele grup kurmanın iki faydası vardır: öğrenciler her zaman aynı arkadaşlarıyla çalışmaz ve kimse \"seçilmeyen kişi\" olmaz. Öğrenci listesini bir kez karıştırıp sırayla gruplara dağıtmak, birkaç saniyede adil bir sonuç verir.",
        "Belirli öğrencilerin aynı gruba düşmemesi gerekiyorsa (örneğin ayrı tutulması gereken iki öğrenci) bu kişileri önce farklı gruplara elle yerleştirip kalanları rastgele dağıtabilirsiniz. Cinsiyet ya da başarı dengesi isteniyorsa halı saha bölümündeki katmanlı kura aynen uygulanır: listeyi önce alt gruplara ayırın, her alt grubu karıştırın, sonra yılan sırasıyla dağıtın.",
        "Öğrenci isimleri kişisel veri olduğu için listeyi yalnızca tarayıcıda çalışan araçlarda işlemek iyi bir alışkanlıktır. Bilişim Ajans'ın karıştırma ve çekiliş araçları listeyi hiçbir sunucuya göndermez."
      ]
    },
    {
      h: "Turnuva eşleşmesi ve eleme tablosu nasıl yapılır?",
      p: [
        "Tek eleme usulünde her maçı kaybeden turnuvadan çıkar ve kazanan bir sonraki tura geçer. Tablonun düzgün çalışması için ilk turdaki yer sayısının 2'nin kuvveti (4, 8, 16, 32…) olması gerekir. Katılımcı sayısı bu sayılardan biri değilse eksik kalan yerler <strong>bay</strong> ile doldurulur: bay alan katılımcı ilk turu maç yapmadan geçer."
      ],
      table: {
        head: ["Katılımcı", "Tablo boyutu", "Bay sayısı", "Tur sayısı", "Toplam maç"],
        rows: [
          ["6", "8", "2", "3", "5"],
          ["8", "8", "0", "3", "7"],
          ["12", "16", "4", "4", "11"],
          ["20", "32", "12", "5", "19"],
          ["32", "32", "0", "5", "31"]
        ],
        caption: "Tek eleme usulünde maç sayısı her zaman katılımcı sayısının bir eksiğidir, çünkü şampiyon dışındaki her katılımcı tam bir kez elenir."
      },
      after: [
        "Bay hakkını kimin alacağı da kurayla belirlenebilir; güçlü oyuncuların ilk turda karşılaşmaması isteniyorsa önce \"seri başı\" oyuncular tablonun farklı yarılarına yerleştirilir, kalanlar rastgele dağıtılır. [[arac:eleme-tablosu-olustur|Eleme Turnuvası Tablosu Oluşturma aracı]] katılımcı listesinden turları, eşleşmeleri, bay geçenleri ve maç sayısını otomatik çıkarır. Tablo boyutunun 2'nin kuvveti olması, [[bilgi:aritmetik-ve-geometrik-dizi-formulleri|geometrik dizi]] mantığının günlük bir örneğidir."
      ]
    },
    {
      h: "Kura sonucu nasıl paylaşılır?",
      p: [
        "Kuranın adil yapıldığına herkesin inanması, sonucun kendisi kadar önemlidir. Bunun için birkaç basit yöntem vardır:"
      ],
      ul: [
        "<strong>Canlı kura:</strong> Ekranı paylaşarak ya da herkesin önünde tek tıkla karıştırın; sonucu beğenmeyip yeniden çekmeyin.",
        "<strong>Tohum değeri:</strong> Satırları Karıştırma aracındaki tohum seçeneğiyle aynı liste ve aynı tohum her zaman aynı karışımı verir. Tohumu kura öncesinde ilan edip sonuçla birlikte paylaşırsanız herkes sonucu kendisi doğrulayabilir.",
        "<strong>Ekran görüntüsü ya da sonuç kartı:</strong> [[arac:cekilis|Çekiliş aracı]] sonucu PNG kart olarak indirmenizi sağlar; mesajlaşma grubunda paylaşmak kolaydır.",
        "<strong>Kuralları önceden açıklayın:</strong> Seviye grupları, kaleci ayrımı ve bay kuralı kuradan önce belirlenirse sonradan itiraz azalır."
      ],
      after: [
        "Ödüllü çekilişler takım kurasından farklıdır ve bazı durumlarda resmî izne tabidir; ayrıntılar için [[rehber:cekilis-yapma|çekiliş yapma rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Beğenilmeyen kurayı tekrarlamak:</strong> Sonuç istenene kadar yeniden çekmek kurayı rastgele olmaktan çıkarır.",
        "<strong>Listeyi alfabetik dağıtmak:</strong> Karıştırmadan sırayla dağıtmak rastgele değildir; aynı harfle başlayanlar hep aynı takıma düşer.",
        "<strong>Tekrarlı isimleri temizlememek:</strong> Aynı kişi iki kez yazılırsa hem iki takımda görünür hem de şansı iki katına çıkar.",
        "<strong>Seviye dengesi için tümüyle elle seçim yapmak:</strong> Katmanlı kura hem dengeyi hem rastgeleliği korur.",
        "<strong>Bay hakkını rastgele vermeyi unutmak:</strong> Bayların hep listenin başındakilere gitmesi adaletsizlik yaratır."
      ]
    }
  ],
  faq: [
    ["Bir isim listesi rastgele takımlara nasıl bölünür?", "Liste önce yansız bir yöntemle karıştırılır, sonra karışık listedeki kişiler sırayla takımlara dağıtılır. Böylece herkesin her takıma düşme şansı eşit olur ve takım büyüklükleri en fazla bir kişi farkla dengelenir."],
    ["Halı sahada adil takım nasıl kurulur?", "Oyuncuları seviye gruplarına ayırın, kalecileri ayrı tutun, her grubu kendi içinde karıştırın ve yılan sırasıyla (A-B-B-A) dağıtın. Bu yöntem hem rastgeleliği hem de seviye dengesini korur."],
    ["Sınıf rastgele gruplara nasıl ayrılır?", "Öğrenci listesini karıştırıp sırayla gruplara dağıtın. Belirli öğrencilerin ayrı olması gerekiyorsa önce onları farklı gruplara yerleştirin, başarı ya da cinsiyet dengesi için katmanlı kura kullanın."],
    ["Seviye dengeli takım kurmanın yolu nedir?", "Oyuncuları güçten zayıfa sıralayıp yılan dağıtımı yapmak ya da seviye gruplarını ayrı ayrı karıştırıp her takıma her gruptan eşit sayıda oyuncu vermek en pratik yoldur."],
    ["Turnuva eşleşmesi ve eleme tablosu nasıl yapılır?", "Katılımcı sayısı 2'nin kuvvetine tamamlanır, eksik yerler bay ile doldurulur ve eşleşmeler kurayla belirlenir. Tek eleme usulünde toplam maç sayısı katılımcı sayısının bir eksiğidir; 12 katılımcıda 11 maç oynanır."],
    ["Rastgele karıştırma gerçekten adil midir?", "Fisher–Yates gibi yansız bir algoritma ve güvenilir bir rastgele sayı kaynağı kullanılırsa tüm sıralamalar eşit olasılıkla ortaya çıkar. Ancak adil kura bile şans eseri dengesiz takımlar üretebilir."],
    ["Tek sayıda kişide takımlar nasıl dengelenir?", "Sırayla dağıtım takımlar arasındaki farkı bir kişiyle sınırlar; 11 kişi 6 ve 5 olarak ayrılır. Fazla kişi dönüşümlü oynayabilir, yedek olabilir ya da az kişili takıma oyun içi bir avantaj tanınabilir."],
    ["Kura sonucu nasıl paylaşılır?", "Kurayı herkesin önünde tek seferde yapın, tohum değerini paylaşarak sonucun doğrulanmasını sağlayın ya da sonuç kartını ekran görüntüsü olarak gönderin. Kuralları kuradan önce açıklamak itirazları azaltır."],
    ["Takım kurasında isimler bir yere kaydediliyor mu?", "Hayır. Satırları Karıştırma, Çekiliş ve Eleme Tablosu araçları tarayıcınızda çalışır; girdiğiniz isim listesi hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda silinir."]
  ],
  tools: ["satirlari-karistir", "cekilis", "rastgele-sayi", "eleme-tablosu-olustur"],
  related: ["olasilik-nasil-hesaplanir", "permutasyon-ve-kombinasyon-farki", "bowling-puani-nasil-hesaplanir"]
};
