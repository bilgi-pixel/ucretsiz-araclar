export default {
  slug: "erken-odeme-iskontosu-2-10-net-30",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Erken Ödeme İskontosu Nedir? \"2/10 Net 30\" Koşulunun Yıllık Maliyeti",
  pageTitle: "Erken Ödeme İskontosu Nedir? 2/10 Net 30 Yıllık Maliyeti",
  description: "2/10 net 30: 10 gün içinde öderseniz %2 iskonto, aksi hâlde 30 günde tam tutar. İskontoyu kullanmamanın yıllık maliyeti yaklaşık %37, bileşik %44,6. Hesap ve KDV.",
  keywords: ["erken ödeme iskontosu", "peşin ödeme indirimi", "2/10 net 30", "nakit iskonto", "tedarikçi vade indirimi", "iskonto yıllık faiz", "erken ödeme avantajı", "iskonto kdv matrahı"],
  lead: "Erken ödeme (nakit) iskontosu, tedarikçinin faturayı vadesinden önce ödeyen alıcıya tanıdığı indirimdir. <strong>\"2/10 net 30\"</strong> koşulu, faturayı 10 gün içinde öderseniz yüzde 2 indirim alacağınızı, aksi hâlde tam tutarı 30 gün içinde ödemeniz gerektiğini anlatır. İndirimi kullanmamak, 20 günlük ek vade için yüzde 2 ödemek demektir ve bunun yıllık karşılığı <strong>basit faizle yaklaşık yüzde 37,2, bileşik faizle yaklaşık yüzde 44,6</strong>'dır. Bu sayfada hesabı adım adım, mevduat ve kredi faiziyle karşılaştırmayı ve iskontonun faturada ve KDV'de nasıl ele alındığını bulacaksınız.",
  kisaCevap: [
    "\"2/10 net 30\": 10 gün içinde ödemede %2 iskonto; iskonto kullanılmazsa tam tutar 30. günde ödenir.",
    "İskontoyu kullanmamanın yıllık basit maliyeti = iskonto ÷ (100 − iskonto) × 365 ÷ (net vade − iskonto vadesi).",
    "2/10 net 30 için: 2 ÷ 98 × 365 ÷ 20 ≈ %37,24; bileşik (efektif) karşılığı ≈ %44,59.",
    "Kural: paranızın alternatif getirisi ya da borçlanma maliyetiniz bu oranın altındaysa iskontoyu kullanmak kârlıdır.",
    "1/10 net 30'un yıllık maliyeti ≈ %18,4; 2/10 net 60'ın ≈ %14,9; vade farkı uzadıkça oran düşer.",
    "Satıştan sonra yapılan iskonto KDV matrahını düşürür; belgeleme şekli için mali müşavirinize danışın."
  ],
  figure: {
    alt: "2/10 net 30 zaman çizelgesi: fatura günü, 10. gün iskontolu 98.000 TL ödeme, 30. gün tam 100.000 TL ödeme; aradaki 20 gün için 2.000 TL farkın yıllık yüzde 37,2 basit ve yüzde 44,6 bileşik maliyete denk geldiği hesap kartı.",
    caption: "Örnek: 100.000 TL'lik fatura. 10. günde 98.000 TL ödemek ile 30. günde 100.000 TL ödemek arasındaki 2.000 TL fark, 98.000 TL'yi 20 gün kullanmanın bedelidir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">"2/10 net 30" ne demek?</text>
  <line x1="60" y1="130" x2="660" y2="130" class="st sw" fill="none"/>
  <circle cx="60" cy="130" r="10" class="p"/>
  <circle cx="260" cy="130" r="12" class="ok"/>
  <circle cx="660" cy="130" r="12" class="dg"/>
  <text x="60" y="100" class="b mid">0. gün</text><text x="60" y="164" class="sm mid">fatura</text><text x="60" y="182" class="sm mid t2">100.000 TL</text>
  <text x="260" y="100" class="b mid ok">10. gün</text><text x="260" y="164" class="sm mid b">98.000 TL öde</text><text x="260" y="182" class="sm mid t2">%2 iskonto</text>
  <text x="660" y="100" class="b mid dg">30. gün</text><text x="660" y="164" class="sm mid b">100.000 TL öde</text><text x="660" y="182" class="sm mid t2">net vade</text>
  <rect x="262" y="118" width="396" height="24" class="dgs"/>
  <text x="460" y="135" class="sm mid b">20 gün ek vade = 2.000 TL bedel</text>
  <rect x="40" y="214" width="310" height="170" rx="10" class="sf sb"/>
  <text x="56" y="242" class="b">Basit yıllık maliyet</text>
  <text x="56" y="270" class="sm">2 ÷ 98 = %2,041 (20 günlük)</text>
  <text x="56" y="292" class="sm">365 ÷ 20 = 18,25 dönem</text>
  <text x="56" y="314" class="sm">%2,041 × 18,25</text>
  <text x="195" y="360" class="xl mid p">≈ %37,2</text>
  <rect x="370" y="214" width="310" height="170" rx="10" class="p"/>
  <text x="386" y="242" class="b sf">Bileşik (efektif) maliyet</text>
  <text x="386" y="270" class="sm sf">(1 + 2/98)^18,25 − 1</text>
  <text x="386" y="292" class="sm sf">dönem getirisi yeniden kullanılırsa</text>
  <text x="386" y="314" class="sm sf">karar ölçütü: alternatif getiri</text>
  <text x="525" y="360" class="xl mid sf">≈ %44,6</text>
</svg>`
  },
  sections: [
    {
      h: "Erken ödeme (nakit) iskontosu nedir?",
      p: [
        "Ticari satışlarda mal ya da hizmet çoğu zaman peşin değil, belirli bir vadeyle satılır. Tedarikçi bu vade boyunca alıcıyı fiilen finanse eder ve tahsilatı gecikir. Nakit akışını hızlandırmak isteyen tedarikçi, faturayı erken ödeyen alıcıya küçük bir indirim teklif eder; buna <strong>erken ödeme iskontosu</strong>, nakit iskonto ya da peşin ödeme indirimi denir.",
        "Bu indirim, satış anında fiyattan düşülen ticari iskontodan (liste fiyatı indirimi, miktar indirimi) farklıdır. Ticari iskonto alıcının ne zaman ödediğinden bağımsızdır; erken ödeme iskontosu ise yalnızca ödeme belirli bir süre içinde yapılırsa kazanılır. Ayrıca çek ve senet iskontosundan da farklıdır: orada bir alacak belgesi vadesinden önce bankaya kırdırılır. Çek ve senet iskontosu için [[bilgi:cek-senet-iskonto-nedir|çek-senet iskonto yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "\"2/10 net 30\" ifadesi ne anlama gelir?",
      p: [
        "Bu kısa yazım, uluslararası ticarette yaygın bir ödeme koşulu kalıbıdır ve üç bilgi taşır. İlk sayı iskonto oranını, ikinci sayı iskontonun geçerli olduğu gün sayısını, \"net\" sonrasındaki sayı ise tam tutarın en geç ödenmesi gereken günü gösterir. Gün sayımı genellikle fatura tarihinden başlar; sözleşmede teslim tarihi ya da ay sonu esas alınabilir."
      ],
      table: {
        head: ["Koşul", "Anlamı", "Ek vade", "Yıllık basit maliyet", "Yıllık bileşik maliyet"],
        rows: [
          ["2/10 net 30", "10 günde öde %2 indirim, yoksa 30 günde tam", "20 gün", "%37,24", "%44,59"],
          ["1/10 net 30", "10 günde öde %1 indirim, yoksa 30 günde tam", "20 gün", "%18,43", "%20,13"],
          ["1/15 net 30", "15 günde öde %1 indirim, yoksa 30 günde tam", "15 gün", "%24,58", "%27,71"],
          ["2/15 net 45", "15 günde öde %2 indirim, yoksa 45 günde tam", "30 gün", "%24,83", "%27,86"],
          ["3/15 net 45", "15 günde öde %3 indirim, yoksa 45 günde tam", "30 gün", "%37,63", "%44,86"],
          ["2/10 net 60", "10 günde öde %2 indirim, yoksa 60 günde tam", "50 gün", "%14,90", "%15,89"]
        ],
        caption: "Yıl 365 gün alınmıştır. Bileşik maliyet, aynı fırsatın yıl boyunca tekrarlandığı varsayımıyla hesaplanır."
      },
      after: [
        "Tablo önemli bir noktayı gösterir: iskonto oranı kadar <strong>ek vadenin uzunluğu</strong> da maliyeti belirler. Yüzde 2'lik iskonto 20 günlük ek vadede yüzde 37 yıllık maliyete denk gelirken, 50 günlük ek vadede yüzde 15'e düşer."
      ]
    },
    {
      h: "İskontoyu kullanmamanın yıllık maliyeti nasıl hesaplanır?",
      p: [
        "İskontoyu kullanmayan alıcı, aslında tedarikçiden kısa vadeli bir kredi alır: 10. günde ödeyebileceği 98 lirayı 30. güne kadar elinde tutar ve bunun için 2 lira fazla öder. Bu örtük kredinin faiz oranı şöyle bulunur:"
      ],
      formula: "Dönem maliyeti = iskonto % ÷ (100 − iskonto %)\nYıllık basit maliyet = dönem maliyeti × 365 ÷ (net vade − iskonto vadesi)\nYıllık bileşik maliyet = (1 + dönem maliyeti)^(365 ÷ ek vade) − 1",
      ol: [
        "Fatura tutarı 100.000 TL, koşul 2/10 net 30.",
        "İskontolu ödeme: 10. günde 98.000 TL. Tam ödeme: 30. günde 100.000 TL. Fark 2.000 TL.",
        "Dönem maliyeti: 2.000 ÷ 98.000 = %2,041. Paydada 100.000 değil 98.000 vardır, çünkü kullanılan \"kredi\" 98.000 TL'dir.",
        "Yılda kaç 20 günlük dönem var: 365 ÷ 20 = 18,25.",
        "Basit yıllık maliyet: %2,041 × 18,25 ≈ <strong>%37,24</strong>.",
        "Bileşik yıllık maliyet: (1,02041)^18,25 − 1 ≈ <strong>%44,59</strong>."
      ],
      after: [
        "Basit oran hızlı karşılaştırma için yeterlidir; bileşik oran, bu tür fırsatların yıl içinde sürekli tekrarlandığı ve kazancın yeniden kullanıldığı durumu yansıtır. İki kavramın farkı [[bilgi:nominal-ve-efektif-faiz-farki|nominal ve efektif faiz yazısında]] anlatılır; dönüşümü [[arac:efektif-faiz-hesapla|Efektif Faiz Oranı Hesaplama]] aracıyla yapabilirsiniz."
      ]
    },
    {
      h: "Erken ödeme mi mevduat faizi mi daha kârlı?",
      p: [
        "Karar ölçütü basittir: iskontonun yıllık maliyeti, paranın alternatif getirisinden ya da borçlanma maliyetinizden yüksekse iskontoyu kullanmak kârlıdır. Karşılaştırmayı aynı tutar ve aynı süre üzerinden yapmak en doğrusudur."
      ],
      ol: [
        "Seçenek A: 10. günde 98.000 TL ödeyip iskontoyu kullanmak. Kazanç 2.000 TL.",
        "Seçenek B: 98.000 TL'yi 20 gün mevduatta tutup 30. günde 100.000 TL ödemek. Örnek olarak yıllık brüt %40 faiz alalım (örnek oran; güncel oranı bankanızdan öğrenin).",
        "20 günlük brüt faiz: 98.000 × 0,40 × 20 ÷ 365 ≈ 2.148 TL.",
        "Kısa vadeli TL mevduatta stopaj kesilir. Örnek olarak %17,5 stopajla net faiz ≈ 2.148 × 0,825 ≈ 1.772 TL.",
        "Sonuç: 2.000 TL iskonto kazancı, 1.772 TL net faizden yüksektir; iskontoyu kullanmak bu örnekte yaklaşık 228 TL daha kârlıdır."
      ],
      after: [
        "Başa baş noktası da hesaplanabilir: net yıllık getiri yaklaşık %37,24'ü geçmedikçe iskonto üstündür; %17,5 stopajla bu, yaklaşık %45,1 brüt mevduat faizine karşılık gelir. Mevduat getirisini kendi oranlarınızla hesaplamak için [[arac:mevduat-faizi-hesapla|Mevduat Faizi Hesaplama]], gün bazında faiz için [[arac:gunluk-faiz-hesapla|Günlük Faiz Hesaplama]] aracını kullanabilirsiniz. Stopaj oranları vadeye ve döneme göre değiştiği için [[bilgi:stopaj-nedir-hangi-gelirlerden-kesilir|stopaj yazısındaki]] güncel bilgiye bakın.",
        "İskontoyu kullanmak için kredi çekmeniz gerekiyorsa aynı karşılaştırmayı kredinin toplam maliyetiyle (faiz ve vergiler dahil) yapın. Kredinin yıllık maliyeti %37'nin altındaysa, kısa vadeli krediyle bile iskontoyu kullanmak mantıklı olabilir; ancak nakit sıkışıklığı riskini ve likidite oranlarınızı da değerlendirin."
      ]
    },
    {
      h: "Günlük faizle iskonto nasıl karşılaştırılır?",
      p: [
        "Bazı işletmeler kararları günlük getiri üzerinden verir. 2/10 net 30 koşulunda iskonto, 20 gün için %2,041 getiri sağlar; bu günde yaklaşık <strong>%0,102</strong> eder. Paranızın günlük net getirisi bunun altındaysa iskonto avantajlıdır.",
        "Bu yaklaşım, farklı vade ve oranlardaki teklifleri hızlıca sıralamayı kolaylaştırır. Örneğin 1/15 net 30 koşulunda günlük getiri 1 ÷ 99 ÷ 15 ≈ %0,067, 2/10 net 60 koşulunda 2 ÷ 98 ÷ 50 ≈ %0,041'dir. Elinizde sınırlı nakit varsa, önce günlük getirisi en yüksek iskontoları kullanmak toplam kazancı en büyük yapar."
      ]
    },
    {
      h: "İskonto faturada nasıl gösterilir, KDV matrahını düşürür mü?",
      p: [
        "3065 sayılı Katma Değer Vergisi Kanunu'nun 25. maddesine göre, teslim ve hizmet işlemlerinde mutad olan miktarda yapılan ve fatura ile benzeri belgelerde gösterilen iskontolar KDV matrahına dahil edilmez. Satış faturasında doğrudan uygulanan bir iskonto bu nedenle KDV'yi de düşürür.",
        "Erken ödeme iskontosu ise çoğu zaman fatura kesildikten sonra, ödeme günü belli olunca kesinleşir. Bu durumda Kanun'un 35. maddesindeki matrah değişikliği hükümleri devreye girer: satıcı ve alıcı, iskonto tutarı kadar matrahı ve buna ait KDV'yi düzeltir. Örneğin %20 KDV'li bir satışta 2.000 TL'lik matrah indirimi 400 TL KDV düzeltmesi doğurur; toplam etki 2.400 TL olur.",
        "Uygulamada belgenin kim tarafından ve hangi türde düzenleneceği (fiyat farkı, iskonto faturası ya da başka bir belge) işlemin niteliğine ve tarafların durumuna göre değişebilir. Bu nedenle iskonto politikanızı belirlerken ve sözleşmeye yazarken mali müşavirinizle birlikte çalışın; iskontonun KDV dahil mi hariç mi uygulanacağını sözleşmede açıkça belirtin."
      ],
      note: "Vergi uygulamaları değişebilir. Güncel uygulama ve özel durumlar için Gelir İdaresi Başkanlığı'nın düzenlemelerine ve mali müşavirinizin görüşüne başvurun."
    },
    {
      h: "Tedarikçiyle iskonto pazarlığı nasıl yapılır?",
      ul: [
        "<strong>Yıllık maliyeti gösterin:</strong> Tedarikçiye, sunduğu %1'lik iskontonun kendisi için yaklaşık %18'lik bir finansman maliyeti olduğunu ve bunu kendi kredi maliyetiyle karşılaştırmasını önerin. Kredi maliyeti daha yüksekse daha cömert bir iskonto ikisinin de yararınadır.",
        "<strong>Vade ile oranı birlikte konuşun:</strong> %2 iskonto yerine iskonto süresini 10 günden 15 güne çıkarmak, nakit planlamanızı kolaylaştırabilir.",
        "<strong>Ödeme güvenilirliğini öne çıkarın:</strong> Düzenli ve zamanında ödeyen bir alıcı, tedarikçi için tahsilat riskini azaltır; bu pazarlıkta güçlü bir argümandır.",
        "<strong>Kademeli iskonto önerin:</strong> Örneğin peşinde %3, 10 günde %2, 20 günde %1 gibi bir yapı her iki tarafa esneklik sağlar.",
        "<strong>Yazılı hâle getirin:</strong> Gün sayımının fatura tarihinden mi teslimden mi başladığını, iskontonun KDV dahil mi hariç mi olduğunu ve geç ödemede uygulanacak koşulları sözleşmeye yazın."
      ],
      after: [
        "Liste fiyatı, iskonto oranı ve net fiyat arasındaki hesaplar için [[arac:iskonto-hesapla|İskonto Hesaplama]] aracını, art arda uygulanan indirimler için [[bilgi:zincirleme-indirim-nasil-hesaplanir|zincirleme indirim yazısını]] kullanabilirsiniz. İskontoların işletmenin nakit durumu üzerindeki etkisini izlemek için [[bilgi:cari-oran-ve-likidite-oranlari|cari oran ve likidite oranları]] yazısı da yararlıdır."
      ]
    }
  ],
  faq: [
    ["Erken ödeme (nakit) iskontosu nedir?", "Erken ödeme iskontosu, tedarikçinin faturayı belirli bir süre içinde ödeyen alıcıya tanıdığı indirimdir. Amacı tahsilatı hızlandırmaktır. Satış anında fiyattan düşülen ticari iskontodan ve çek-senet iskontosundan farklıdır; yalnızca zamanında ödeme yapılırsa kazanılır."],
    ["'2/10 net 30' ifadesi ne anlama gelir?", "Fatura 10 gün içinde ödenirse yüzde 2 indirim uygulanacağını, ödenmezse tam tutarın en geç 30. günde ödeneceğini anlatır. Gün sayımı genellikle fatura tarihinden başlar; sözleşme farklı bir başlangıç belirleyebilir."],
    ["İskontoyu kullanmamanın yıllık maliyeti nasıl hesaplanır?", "İskonto oranı, 100 eksi iskonto oranına bölünür ve 365'in ek vade gününe bölümüyle çarpılır. 2/10 net 30 için 2 ÷ 98 × 365 ÷ 20 ≈ yüzde 37,24 basit, (1 + 2/98)^18,25 − 1 ≈ yüzde 44,59 bileşik yıllık maliyet bulunur."],
    ["Erken ödeme mi mevduat faizi mi daha kârlı?", "İskontonun yıllık maliyetini paranızın net alternatif getirisiyle karşılaştırın. 2/10 net 30 koşulunda net mevduat getirisi yüzde 37,24'ün altındaysa iskontoyu kullanmak kârlıdır. Örnek oranlarla 98.000 TL için iskonto 2.000 TL, 20 günlük net mevduat faizi yaklaşık 1.772 TL getirir."],
    ["İskonto faturada nasıl gösterilir?", "Satış anında uygulanan iskonto faturada ayrı satır olarak gösterilir ve matrahtan düşülür. Fatura kesildikten sonra kesinleşen erken ödeme iskontosu ise matrah düzeltmesi gerektirir; hangi belgenin kim tarafından düzenleneceğini mali müşavirinizle belirleyin."],
    ["İskonto KDV matrahını düşürür mü?", "Evet. KDV Kanunu'nun 25. maddesine göre faturada gösterilen mutad iskontolar matraha dahil edilmez; satıştan sonra yapılan iskontolar ise 35. madde uyarınca matrah ve KDV düzeltmesine konu olur. %20 KDV'de 2.000 TL'lik iskonto 400 TL KDV düzeltmesi doğurur."],
    ["Günlük faizle iskonto nasıl karşılaştırılır?", "İskontonun dönem getirisi ek vade gün sayısına bölünür. 2/10 net 30'da 2 ÷ 98 ÷ 20 ≈ günde yüzde 0,102 eder. Paranızın günlük net getirisi bunun altındaysa iskontoyu kullanmak avantajlıdır; sınırlı nakitte önce günlük getirisi yüksek iskontolar seçilir."],
    ["Tedarikçiyle iskonto pazarlığı nasıl yapılır?", "İskontonun tedarikçi için yıllık finansman maliyetini gösterin, oran ile iskonto süresini birlikte konuşun, düzenli ödeme geçmişinizi öne çıkarın ve kademeli bir yapı önerin. Gün sayımı, KDV ve geç ödeme koşullarını sözleşmeye yazılı olarak ekleyin."],
    ["Basit ve bileşik iskonto maliyeti neden farklı çıkar?", "Basit hesap, yıl içindeki 18,25 dönemin getirisini yalnızca toplar. Bileşik hesap ise her dönemde elde edilen kazancın bir sonraki dönemde yeniden kullanıldığını varsayar ve getiriyi üst üste ekler. Bu nedenle 2/10 net 30'da basit oran yüzde 37,24, bileşik oran yüzde 44,59 çıkar."]
  ],
  tools: ["iskonto-hesapla", "gunluk-faiz-hesapla", "efektif-faiz-hesapla", "mevduat-faizi-hesapla"],
  related: ["nominal-ve-efektif-faiz-farki", "cek-senet-iskonto-nedir", "zincirleme-indirim-nasil-hesaplanir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – 3065 sayılı Katma Değer Vergisi Kanunu", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – KDV Kanunu md. 25 ve 35", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "finansal ya da vergi danışmanlığı değildir; işletmenize özgü kararlar için mali müşavirinize danışın"
};
