export default {
  slug: "pesin-mi-taksit-mi-hesaplama",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Peşin mi Taksit mi? Vade Farkı ve Enflasyonla Doğru Karşılaştırma",
  pageTitle: "Peşin mi Taksit mi? Vade Farkı ve Bugünkü Değer Hesabı",
  description: "Peşin mi taksit mi? Taksitlerin bugünkü değerini peşin fiyatla karşılaştırın; vade farkı, örtük aylık faiz, peşin indirimi ve enflasyonun etkisi çözümlü örneklerle.",
  keywords: ["peşin mi taksit mi", "vade farkı hesaplama", "peşin indirim mi taksit mi", "taksitli alışveriş enflasyon", "vade farkı yüzde kaç", "peşin fiyatına taksit mantıklı mı", "taksitin bugünkü değeri", "örtük faiz hesaplama"],
  lead: "Peşin mi taksit mi sorusunun cevabı, <strong>taksitlerin bugünkü değerini peşin fiyatla karşılaştırarak</strong> bulunur: paranızı bekletebileceğiniz en iyi güvenli getiri oranıyla taksitleri bugüne indirgersiniz; toplam peşin fiyattan düşükse taksit, yüksekse peşin daha avantajlıdır. Kısa yoldan, taksitli planın içindeki örtük aylık faizi hesaplayıp mevduatın aylık net getirisiyle de karşılaştırabilirsiniz. Bu rehberde vade farkı, peşin indirimi, \"peşin fiyatına taksit\" ve enflasyon etkisini adım adım örneklerle anlatıyoruz.",
  kisaCevap: [
    "Taksitlerin bugünkü değeri = taksit × [1 − (1 + r)<sup>−n</sup>] ÷ r; r paranızın aylık alternatif getirisidir.",
    "Bugünkü değer peşin fiyattan düşükse taksit, yüksekse peşin daha kârlıdır.",
    "Vade farkı oranı = (taksitler toplamı − peşin fiyat) ÷ peşin fiyat; bu toplam oran aylık faiz değildir.",
    "12 × 2.750 TL taksit ile 30.000 TL peşin arasındaki örtük faiz aylık yaklaşık %1,50'dir.",
    "Peşin fiyatına taksitte de peşin indirimi teklif ediliyorsa indirim aslında taksidin örtük faizidir.",
    "Enflasyon taksitlerin reel yükünü azaltır; ama doğru karşılaştırma, parayı bekleteceğiniz gerçek getiriyle yapılır."
  ],
  figure: {
    alt: "30.000 TL peşin ile 12 kere 2.750 TL taksidin karşılaştırması: taksit toplamı 33.000 TL, aylık yüzde 2 getiriyle bugünkü değeri 29.082 TL, yüzde 3 getiriyle 27.374 TL.",
    caption: "Taksitlerin nominal toplamı peşinden yüksek görünse de bugünkü değerleri paranızın getirisine göre peşin fiyatın altına inebilir. Başabaş noktası aylık yaklaşık %1,50'dir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">30.000 TL peşin mi, 12 × 2.750 TL mi?</text>
  <line x1="200" y1="56" x2="200" y2="330" class="sb" fill="none"/>
  <line x1="200" y1="330" x2="700" y2="330" class="sb" fill="none"/>
  <line x1="636" y1="56" x2="636" y2="330" class="sdg dash" fill="none"/>
  <text x="636" y="350" class="sm mid dg">peşin 30.000</text>
  <text x="190" y="96" class="end b">Peşin fiyat</text>
  <rect x="200" y="74" width="436" height="38" rx="4" class="p"/>
  <text x="620" y="99" class="b end sf">30.000</text>
  <text x="190" y="156" class="end b">Taksit toplamı</text>
  <rect x="200" y="134" width="480" height="38" rx="4" class="dgs"/>
  <text x="670" y="159" class="b end">33.000</text>
  <text x="190" y="212" class="end b">BD, aylık %2</text>
  <rect x="200" y="190" width="423" height="38" rx="4" class="oks"/>
  <text x="613" y="215" class="b end">29.082</text>
  <text x="190" y="268" class="end b">BD, aylık %3</text>
  <rect x="200" y="246" width="398" height="38" rx="4" class="oks"/>
  <text x="588" y="271" class="b end">27.374</text>
  <text x="190" y="302" class="end sm mu">BD: bugünkü değer</text>
  <rect x="20" y="366" width="680" height="44" rx="8" class="sf sb"/>
  <text x="360" y="393" class="sm mid t2">Örtük faiz aylık %1,50 · Paranız bundan fazla kazanıyorsa taksit avantajlı</text>
</svg>`
  },
  sections: [
    {
      h: "Neden toplamları karşılaştırmak yetmez?",
      p: [
        "Taksitli fiyat 33.000 TL, peşin fiyat 30.000 TL olduğunda ilk bakışta peşin almak 3.000 TL kârlı görünür. Ancak bu karşılaştırma farklı zamanlarda ödenen paraları aynı kefeye koyar. Bugün ödediğiniz 30.000 TL ile on iki ay boyunca ayda 2.750 TL ödemek aynı şey değildir: taksitle alırsanız peşin ödemeyeceğiniz parayı bir yıl boyunca bir yerde değerlendirebilirsiniz.",
        "Finansta bu ilkeye <strong>paranın zaman değeri</strong> denir. Bugünkü 1 lira, gelecekteki 1 liradan değerlidir; çünkü bugün elinizdeyse faiz getirisi sağlar ve enflasyon karşısında erimeden kullanılabilir. Doğru karşılaştırma, gelecekte ödenecek taksitleri bugüne indirgeyip peşin fiyatla yan yana koymaktır.",
        "Bu yüzden aynı taksit teklifi, mevduat getirilerinin düşük olduğu bir dönemde pahalı, yüksek olduğu bir dönemde ucuz olabilir. Karar, teklifin kendisi kadar sizin paranıza ulaşabileceğiniz getiriye de bağlıdır."
      ]
    },
    {
      h: "Taksitlerin bugünkü değeri formülü",
      p: [
        "Eşit taksitlerin bugünkü değeri, her taksidin ödeneceği aya göre iskontolanıp toplanmasıyla bulunur. Eşit taksitlerde bu toplam kısa bir formüle iner. Burada r paranızı bekletebileceğiniz yerin <strong>aylık net getirisi</strong>dir (örneğin stopaj sonrası mevduat getirisi), n taksit sayısıdır. İlk taksidin bir ay sonra ödendiği varsayılır."
      ],
      formula: "Bugünkü değer (BD) = Taksit × [1 − (1 + r)^(−n)] ÷ r\nKarar: BD < Peşin fiyat → taksit avantajlı;  BD > Peşin fiyat → peşin avantajlı",
      after: [
        "Yıllık getiri oranınız biliniyorsa aylık orana çevirirken bileşik dönüşüm yapın: aylık r = (1 + yıllık)<sup>1/12</sup> − 1. Yıllık %42,6 bileşik getiri aylık %3'e karşılık gelir. Bu hesabı elle yapmak yerine [[arac:bugunku-deger-hesapla|Bugünkü Değer Hesaplama]] aracını ya da doğrudan iki teklifi karşılaştıran [[arac:pesin-vadeli-karsilastir|Peşin Vadeli Karşılaştırma]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 30.000 TL peşin ya da 12 × 2.750 TL",
      p: [
        "Bir beyaz eşya mağazası bir ürünü 30.000 TL peşin ya da aylık 2.750 TL'den 12 taksitle satıyor. Taksitler toplamı 33.000 TL, vade farkı 3.000 TL'dir."
      ],
      ol: [
        "Vade farkı oranı: 3.000 ÷ 30.000 = %10 (12 ay için toplam).",
        "Paranızın aylık net getirisi %3 olsun. BD = 2.750 × [1 − 1,03<sup>−12</sup>] ÷ 0,03 = 2.750 × 9,954 = 27.373,51 TL.",
        "27.373,51 TL, 30.000 TL'den 2.626,49 TL düşüktür: taksitle almak bugünkü parayla 2.626 TL daha ucuzdur.",
        "Getiri aylık %2 olsaydı BD 29.082,19 TL olurdu; taksit yine avantajlı, ama fark 918 TL'ye iner.",
        "Getiri aylık %1'e düşerse BD peşin fiyatı aşar ve peşin almak daha kârlı hâle gelir."
      ],
      after: [
        "Önemli varsayım: Taksitle aldığınızda peşin fiyat kadar parayı gerçekten ayıracak ve getiri sağlayan bir yerde tutacaksınız. Bu para harcanacaksa hesap anlamını yitirir ve taksit yalnızca borçlanma olur."
      ]
    },
    {
      h: "Taksitli alışverişin gerçek faizi nasıl bulunur?",
      p: [
        "İkinci yöntem, taksitli planın içine gizlenmiş faizi bulmaktır. Bu, taksitlerin bugünkü değerini peşin fiyata eşitleyen aylık orandır (iç verim oranı). Bu oranı bulduğunuzda, onu mevduat ya da kredi faiziyle doğrudan karşılaştırabilirsiniz.",
        "Yukarıdaki örnekte 30.000 TL'yi 12 × 2.750 TL'ye eşitleyen aylık oran yaklaşık <strong>%1,50</strong>'dir; yıllık bileşik karşılığı %19,5'tir. Toplam vade farkı %10 olduğu hâlde örtük faizin aylık %1,50 olması şaşırtıcı gelebilir. Bunun nedeni, borcun her taksitte azalmasıdır: ortalama borç bakiyesi peşin fiyatın yarısı civarındadır.",
        "Toplam vade farkını taksit sayısına bölerek \"aylık %0,83\" demek yanlıştır; gerçek oran neredeyse iki katıdır. Vade farkı ile taksit oranları arasındaki ilişkiyi ayrıntılı görmek için [[arac:vade-farki-hesapla|Vade Farkı Hesaplama]] aracını kullanabilirsiniz."
      ],
      table: {
        head: ["Paranızın aylık net getirisi", "Taksitlerin BD'si", "Peşin fiyatla fark", "Karar"],
        rows: [
          ["%1,00", "30.951", "+951", "Peşin"],
          ["%1,50 (başabaş)", "≈ 30.000", "≈ 0", "Fark yok"],
          ["%2,00", "29.082", "−918", "Taksit"],
          ["%3,00", "27.374", "−2.626", "Taksit"],
          ["%4,00", "25.809", "−4.191", "Taksit"]
        ],
        caption: "12 × 2.750 TL taksit, 30.000 TL peşin fiyat. Tutarlar TL, yuvarlanmıştır."
      }
    },
    {
      h: "Peşin indirimi mi, peşin fiyatına taksit mi?",
      p: [
        "Sık karşılaşılan teklif şudur: \"Peşin fiyatına 6 taksit ya da peşine %8 indirim.\" Burada taksitli fiyat aslında liste fiyatıdır, gerçek peşin fiyat ise indirimli fiyattır. Yani indirim, taksidin örtük faizidir.",
        "Örnek: 10.000 TL'lik ürün için 6 × 1.666,67 TL taksit ya da 9.200 TL peşin. Taksitleri 9.200 TL'ye eşitleyen aylık oran yaklaşık %2,44'tür. Paranız aylık %3 net getiri sağlıyorsa taksitlerin bugünkü değeri 9.028,65 TL olur ve taksit 171 TL daha avantajlıdır. Getiriniz aylık %2,44'ün altındaysa indirimi alıp peşin ödemek daha kârlıdır.",
        "Kural olarak: peşin indirimi yüzdesi ne kadar büyük ve taksit sayısı ne kadar azsa, örtük faiz o kadar yüksektir. 3 taksit için %5 peşin indirimi, 12 taksit için %5 indirimden çok daha pahalı bir taksit demektir."
      ]
    },
    {
      h: "Enflasyon taksitli alışverişi nasıl etkiler?",
      p: [
        "Yüksek enflasyon dönemlerinde taksitler sabit tutarlı olduğu için zamanla reel olarak hafifler: bugün 2.750 TL olan taksit, bir yıl sonra fiyatlar %30 artmışsa bugünün parasıyla yaklaşık 2.115 TL'lik yük taşır. Bu yüzden enflasyon dönemlerinde \"taksit her zaman kârlıdır\" düşüncesi yaygındır.",
        "Ancak doğru ölçüt yine paranızın gerçek getirisidir. Taksit yerine peşin ödeyeceğiniz parayı enflasyonu karşılayan bir getiriyle değerlendiremiyorsanız (örneğin vadesiz hesapta ya da nakit tutuyorsanız), enflasyon oranını iskonto oranı olarak kullanmak mantıklıdır. Parayı mevduatta tutuyorsanız mevduatın net getirisini kullanın. Ürünün fiyatının yakında artacağını düşünüyorsanız erken almanın kendisi de bir kazanç olabilir; bu, peşin ya da taksit seçiminden ayrı bir karardır. Paranın alım gücünün nasıl eridiğini [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Kredi kartında taksit ve dikkat edilecekler",
      ul: [
        "<strong>Taksit sınırları:</strong> Kredi kartıyla yapılabilecek taksit sayısı BDDK düzenlemeleriyle ürün grubuna göre sınırlandırılır ve zaman zaman değişir; bazı ürünlerde taksit hiç yapılamaz. Güncel sınırı bankanızdan öğrenin.",
        "<strong>Limit bloke olur:</strong> Taksitli alışverişte toplam tutar kart limitinizden hemen düşülür; limit taksit ödendikçe açılır.",
        "<strong>Asgari ödeme tuzağı:</strong> Taksitli alışverişin avantajı, ekstrenin tamamını ödediğinizde geçerlidir. Asgari ödeme yapıp kalanı akdi faize bırakırsanız taksitin avantajı kaybolur.",
        "<strong>Taksit ötele ve ek taksit kampanyaları:</strong> Bazıları ek ücret ya da faiz içerebilir; koşulları okuyun.",
        "<strong>Mağaza taksiti ile kart taksiti:</strong> Kartla faizsiz taksit ile mağazanın vade farklı taksiti farklı şeylerdir; tutarları karşılaştırmak için [[arac:taksit-hesapla|Taksit Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Karar vermek için 5 adımlık kontrol listesi",
      ol: [
        "Gerçek peşin fiyatı öğrenin; varsa peşin indirimini mutlaka sorun.",
        "Taksit tutarını, sayısını ve ilk taksidin ne zaman başladığını not edin.",
        "Paranızın aylık net getirisini belirleyin: stopaj sonrası mevduat faizi ya da kullanacağınız güvenli yatırımın getirisi.",
        "Taksitlerin bugünkü değerini hesaplayın ve peşin fiyatla karşılaştırın.",
        "Sonuç birbirine çok yakınsa nakit esnekliğinizi, acil durum fonunuzu ve kart limitinizi göz önünde bulundurun."
      ]
    }
  ],
  faq: [
    ["Peşin mi almak mantıklı, taksit mi?", "Taksitlerin bugünkü değerini paranızın aylık net getirisiyle hesaplayın. Bu değer peşin fiyattan düşükse taksit, yüksekse peşin daha kârlıdır. Peşin için ayıracağınız parayı gerçekten getiri sağlayan bir yerde tutamayacaksanız taksitin avantajı ortadan kalkar."],
    ["Vade farkı nasıl hesaplanır?", "Vade farkı tutarı, taksitler toplamından peşin fiyatın çıkarılmasıyla bulunur. Oranı ise bu farkın peşin fiyata bölünmesidir. 12 kere 2.750 TL ile 30.000 TL peşin için vade farkı 3.000 TL, oranı yüzde 10'dur; bu oran aylık faiz değildir."],
    ["Peşin indirimi vade farkıyla nasıl karşılaştırılır?", "Peşin indirimli fiyatı gerçek peşin fiyat kabul edin ve taksitleri bu fiyata eşitleyen aylık oranı bulun. Örneğin 6 taksit karşılığında yüzde 8 indirim aylık yaklaşık yüzde 2,44 örtük faize denk gelir; getiriniz bundan düşükse indirimi alın."],
    ["Enflasyon taksitli alışverişi nasıl etkiler?", "Taksitler sabit tutarlı olduğu için enflasyon arttıkça reel yükleri azalır. Ancak karşılaştırmada esas olan paranızın alternatif getirisidir. Parayı enflasyondan korunmayan bir yerde tutuyorsanız iskonto oranı olarak enflasyonu, mevduattaysa net mevduat getirisini kullanın."],
    ["Peşin fiyatına 12 taksit gerçekten avantajlı mı?", "Peşin indirimi yoksa ve gerçekten aynı fiyatsa, paranız sıfırın üzerinde herhangi bir getiri sağladığı sürece taksit avantajlıdır. Ancak peşine indirim veriliyorsa taksitli fiyatın içinde örtük bir faiz vardır ve hesap yapmak gerekir."],
    ["Taksitli alışverişin gerçek faizi nasıl bulunur?", "Taksitlerin bugünkü değerini peşin fiyata eşitleyen aylık oran, yani iç verim oranı bulunur. 30.000 TL peşin ile 12 kere 2.750 TL için bu oran aylık yaklaşık yüzde 1,50, yıllık bileşik olarak yüzde 19,5'tir."],
    ["Bugünkü değer hesabı neden önemlidir?", "Farklı zamanlarda ödenen paralar doğrudan toplanarak karşılaştırılamaz, çünkü bugünkü para faiz kazanabilir ve enflasyonla erir. Bugünkü değer hesabı, gelecekteki taksitleri bugünün parasına çevirerek peşin fiyatla adil bir karşılaştırma yapmanızı sağlar."],
    ["Kredi kartında taksit sınırı nedir?", "Kredi kartıyla yapılabilecek taksit sayısı BDDK düzenlemeleriyle ürün grubuna göre sınırlandırılır ve zaman zaman değiştirilir. Bazı ürün gruplarında taksit yapılamaz. Güncel sınırları bankanızın duyurularından ya da BDDK'nın yayımladığı düzenlemelerden öğrenebilirsiniz."],
    ["Toplam vade farkını taksit sayısına bölmek doğru mu?", "Hayır. Borç her taksitte azaldığı için ortalama bakiye peşin fiyatın yaklaşık yarısıdır. Yüzde 10 toplam vade farkını 12'ye bölüp aylık yüzde 0,83 demek yanlış olur; gerçek örtük faiz aylık yaklaşık yüzde 1,50'dir."]
  ],
  tools: ["pesin-vadeli-karsilastir", "vade-farki-hesapla", "bugunku-deger-hesapla", "taksit-hesapla"],
  related: ["enflasyona-gore-paranin-degeri", "bilesik-faiz-nedir", "72-kurali-nedir"],
  sources: [
    ["TCMB – Mevduat ve kredi faiz istatistikleri", "https://www.tcmb.gov.tr/"],
    ["BDDK – Kredi kartı düzenlemeleri", "https://www.bddk.org.tr/"]
  ],
  uyari: "finansal tavsiye değildir, örnek oranlar varsayımdır"
};
