export default {
  slug: "doviz-kar-zarar-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Döviz Kâr Zarar Nasıl Hesaplanır? Alış-Satış Makası ve Getiri",
  pageTitle: "Döviz Kâr Zarar Nasıl Hesaplanır? Makas, Getiri ve Reel Kazanç",
  description: "Döviz kârı = miktar × (satış kuru − alış kuru) − masraflar. Alış-satış makası, yüzde getiri, ortalama maliyet, enflasyona göre reel getiri ve örnek hesaplar.",
  keywords: ["döviz kar zarar hesaplama", "dolar kar zarar hesaplama", "euro kar zarar", "döviz makası nedir", "döviz getirisi hesaplama", "dövizde reel getiri", "döviz alış satış farkı", "ortalama döviz maliyeti"],
  lead: "Döviz kâr ya da zararı, elinizdeki döviz miktarının <strong>sattığınız kur ile aldığınız kur arasındaki farkla</strong> çarpılması ve varsa komisyon gibi masrafların düşülmesiyle bulunur. Yüzde getiri ise bu kârın ödediğiniz toplam TL'ye bölünmesidir. Hesapta en çok atlanan nokta, bankanın size döviz sattığı kur ile sizden döviz aldığı kur arasındaki <strong>makastır</strong>; aynı gün alıp satsanız bile bu fark kadar zarar edersiniz. Bu sayfada formülü, makası, ortalama maliyeti ve enflasyona göre reel getiriyi örnek kurlarla bulacaksınız.",
  kisaCevap: [
    "Kâr/zarar (TL) = döviz miktarı × (satarken aldığınız kur − alırken ödediğiniz kur) − masraflar.",
    "Yüzde getiri = kâr ÷ alışta ödenen toplam TL × 100.",
    "Siz döviz alırken bankanın satış kuru, satarken bankanın alış kuru geçerlidir; aradaki fark makastır.",
    "Makas oranı = (satış kuru − alış kuru) ÷ satış kuru × 100.",
    "Farklı zamanlarda alınan dövizin ortalama maliyeti = toplam ödenen TL ÷ toplam döviz miktarı.",
    "Reel getiri = (1 + nominal getiri) ÷ (1 + enflasyon) − 1; kur artışı enflasyonun altındaysa reel kayıp vardır."
  ],
  figure: {
    alt: "1.000 dolarlık örnek işlem: 38,50 kurdan alış, 41,20 kurdan satış, 2.700 TL kâr ve yüzde 7 getiri; altta aynı gün alış-satışta 38,20 ve 38,50 kurları arasındaki yüzde 0,78 makas.",
    caption: "Kurlar örnektir. Üst bölüm bir alım-satım işleminin kârını, alt bölüm aynı anda alıp satmanın bile neden zarar ettirdiğini gösterir: banka size daha pahalıya satar, sizden daha ucuza alır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="dk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="ok"/></marker></defs>
  <text x="360" y="30" class="lg b mid">1.000 USD ile örnek işlem</text>
  <rect x="30" y="54" width="250" height="96" rx="8" class="sf sb"/>
  <text x="155" y="80" class="sm mid">Alış (bankanın satış kuru)</text>
  <text x="155" y="110" class="xl mid">38,50</text>
  <text x="155" y="136" class="sm mid t2">Ödenen: 38.500 TL</text>
  <line x1="292" y1="102" x2="420" y2="102" class="sok sw" fill="none" marker-end="url(#dk)"/>
  <text x="356" y="92" class="sm mid ok b">Kur +%7,01</text>
  <rect x="440" y="54" width="250" height="96" rx="8" class="sf sb"/>
  <text x="565" y="80" class="sm mid">Satış (bankanın alış kuru)</text>
  <text x="565" y="110" class="xl mid">41,20</text>
  <text x="565" y="136" class="sm mid t2">Alınan: 41.200 TL</text>
  <rect x="30" y="166" width="660" height="56" rx="8" class="oks"/>
  <text x="360" y="191" class="b mid">Kâr = 1.000 × (41,20 − 38,50) = 2.700 TL</text>
  <text x="360" y="212" class="sm mid">Getiri = 2.700 ÷ 38.500 = %7,01 (masrafsız)</text>
  <text x="30" y="258" class="b">Aynı gün al-sat: makas</text>
  <line x1="60" y1="310" x2="660" y2="310" class="st" fill="none"/>
  <rect x="200" y="290" width="320" height="40" class="dgs"/>
  <circle cx="200" cy="310" r="7" class="p"/>
  <circle cx="520" cy="310" r="7" class="p"/>
  <text x="200" y="282" class="sm mid b">Banka alış 38,20</text>
  <text x="520" y="282" class="sm mid b">Banka satış 38,50</text>
  <text x="360" y="315" class="sm mid b dg">Makas 0,30 TL</text>
  <rect x="30" y="350" width="660" height="50" rx="8" class="sf sb"/>
  <rect x="30" y="350" width="8" height="50" class="p"/>
  <text x="50" y="380" class="sm">1.000 USD hemen geri satılırsa 38.200 TL alınır: 300 TL (%0,78) kayıp.</text>
</svg>`
  },
  sections: [
    {
      h: "Döviz kâr zarar nasıl hesaplanır?",
      p: [
        "Döviz alım satımında kâr, iki işlem arasındaki TL farkıdır: döviz alırken ödediğiniz TL ile aynı dövizi satarken eline geçen TL. Aradaki fark pozitifse kâr, negatifse zarardır. Hesaba bankanın ya da döviz bürosunun aldığı komisyon, havale ücreti ve varsa vergi gibi kesintileri de katmanız gerekir.",
        "Bu basit tanımın iki kritik ayrıntısı vardır. Birincisi, kullanılan kur ekranda gördüğünüz \"ortalama\" kur değil, işlemin gerçekleştiği kurdur. İkincisi, alış ve satışta farklı kurlar geçerlidir. Bu iki noktaya dikkat etmeden yapılan hesap, kazancı olduğundan yüksek gösterir."
      ],
      formula: "Alış maliyeti (TL) = döviz miktarı × alış kuru + alış masrafları\nSatış geliri (TL) = döviz miktarı × satış kuru − satış masrafları\nKâr/zarar (TL) = satış geliri − alış maliyeti\nGetiri (%) = kâr/zarar ÷ alış maliyeti × 100"
    },
    {
      h: "Alış-satış makası nedir, kârı nasıl etkiler?",
      p: [
        "Bankalar ve döviz büroları her döviz için iki fiyat ilan eder. <strong>Alış kuru</strong>, kurumun sizden döviz alırken ödediği fiyattır; <strong>satış kuru</strong> ise size döviz satarken istediği fiyattır. Satış kuru her zaman alış kurundan yüksektir. Siz döviz alırken satış kurunu, satarken alış kurunu görürsünüz.",
        "Bu iki kur arasındaki farka makas denir ve kurumun kazancıdır. Makas, piyasanın açık olup olmamasına, işlem tutarına, para birimine ve kanala (şube, mobil uygulama, büro) göre değişir. Hafta sonları ve piyasanın kapalı olduğu saatlerde makas genellikle açılır; dar işlem gören para birimlerinde de daha geniştir."
      ],
      formula: "Makas (TL) = satış kuru − alış kuru\nMakas oranı (%) = (satış kuru − alış kuru) ÷ satış kuru × 100",
      after: [
        "Örnek: Banka doları 38,20'den alıp 38,50'den satıyorsa makas 0,30 TL, oranı 0,30 ÷ 38,50 = %0,78'dir. 1.000 dolar alıp hemen geri satarsanız 38.500 TL ödeyip 38.200 TL alırsınız; kur hiç değişmeden 300 TL kaybedersiniz. Yani başabaş noktasına gelmek için kurun en az makas kadar yükselmesi gerekir."
      ]
    },
    {
      h: "Dolarda yüzde kaç kazandım? Çözümlü örnek",
      ol: [
        "1.000 USD'yi 38,50 kurdan aldınız: maliyet 1.000 × 38,50 = 38.500 TL.",
        "Birkaç ay sonra bankanın alış kuru 41,20 oldu ve dövizi sattınız: gelir 1.000 × 41,20 = 41.200 TL.",
        "Kâr: 41.200 − 38.500 = 2.700 TL.",
        "Getiri: 2.700 ÷ 38.500 × 100 = %7,01.",
        "İşlem başına 50 TL masraf ödediyseniz kâr 2.700 − 100 = 2.600 TL, getiri 2.600 ÷ 38.550 ≈ %6,74 olur."
      ],
      after: [
        "Bu hesapta kurların örnek olduğunu unutmayın. Kendi işleminiz için miktarı, alış ve satış kurunu ve masrafı [[arac:doviz-kar-zarar-hesapla|Döviz Kâr Zarar Hesaplama]] aracına yazarak kârı, getiri oranını ve masraf dahil başabaş satış kurunu görebilirsiniz. Yalnızca iki kur arasındaki yüzde değişimi merak ediyorsanız [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracı yeterlidir."
      ]
    },
    {
      h: "Ortalama döviz maliyeti nasıl hesaplanır?",
      p: [
        "Dövizi tek seferde değil, farklı tarihlerde parça parça aldıysanız tek bir alış kuru yoktur. Bu durumda <strong>ağırlıklı ortalama maliyet</strong> kullanılır: ödediğiniz toplam TL'yi, aldığınız toplam döviz miktarına bölersiniz. Basit kur ortalaması almak, farklı miktarlarla yapılan alımlarda yanlış sonuç verir."
      ],
      table: {
        head: ["Alım", "Miktar (USD)", "Kur", "Ödenen TL"],
        rows: [
          ["1. alım", "500", "36,00", "18.000"],
          ["2. alım", "300", "38,00", "11.400"],
          ["3. alım", "200", "40,00", "8.000"],
          ["Toplam", "1.000", "37,40 (ortalama)", "37.400"]
        ],
        caption: "Basit ortalama (36 + 38 + 40) ÷ 3 = 38,00 olurdu; ağırlıklı ortalama ise 37.400 ÷ 1.000 = 37,40'tır."
      },
      after: [
        "Bu 1.000 doları 41,20'den satarsanız kâr 41.200 − 37.400 = 3.800 TL, getiri %10,16 olur. Aynı mantık hisse senetlerinde de kullanılır; ayrıntı için [[bilgi:hisse-ortalama-maliyet-nasil-hesaplanir|hisse ortalama maliyet nasıl hesaplanır]] yazısına bakabilirsiniz. Dövizin bir kısmını satarsanız kalan kısmın ortalama maliyeti değişmez; yalnızca satılan kısım için kâr ya da zarar gerçekleşir."
      ]
    },
    {
      h: "Enflasyona göre döviz getirisi reel mi?",
      p: [
        "TL cinsinden kâr etmeniz, satın alma gücünüzün arttığı anlamına gelmez. Aynı dönemde fiyatlar genel olarak daha hızlı arttıysa, dövizi bozup eline geçen TL ile daha az şey alabilirsiniz. Bu farkı görmek için nominal getiriyi enflasyonla karşılaştırıp reel getiriyi hesaplamak gerekir."
      ],
      formula: "Reel getiri = (1 + nominal getiri) ÷ (1 + enflasyon) − 1",
      after: [
        "Örnek: Döviz işleminden %7,01 nominal getiri elde ettiniz, aynı dönemde enflasyon %12 oldu (örnek oran). Reel getiri 1,0701 ÷ 1,12 − 1 = −%4,46 olur; yani TL kazancınıza rağmen satın alma gücünüz yaklaşık %4,5 azalmıştır. Basitçe 7,01 − 12 = −4,99 diye çıkarmak yaklaşık sonuç verir ama yüksek oranlarda sapar.",
        "Dönem enflasyonunu bulmak için [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracını, reel getiri hesabı için [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracını kullanabilirsiniz. Kavramın ayrıntısı [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz nedir]] yazısında anlatılır."
      ]
    },
    {
      h: "Banka ile döviz bürosu kuru neden farklı?",
      p: [
        "Her kurum kendi kurunu piyasa kuruna kendi makasını ve maliyetini ekleyerek belirler. Bankaların mobil uygulamalarında ilan edilen kurlar, şubeden farklı olabilir; büyük tutarlı işlemlerde özel kur verilebilir. Döviz büroları ise nakit taşıma, güvenlik ve kira gibi giderlerini fiyatlarına yansıtır.",
        "Ayrıca ekranlarda gördüğünüz ve haberlerde geçen kur çoğunlukla bankalar arası piyasa kurudur; bireysel müşteriye uygulanan kur bundan farklıdır. Türkiye Cumhuriyet Merkez Bankası'nın her iş günü ilan ettiği gösterge niteliğindeki kurlar ise resmî işlemler ve muhasebe kayıtları için kullanılır; bunlar da bir bankada işlem yapabileceğiniz kur değildir."
      ]
    },
    {
      h: "Kâr zarar hesabına komisyon dahil edilmeli mi?",
      p: [
        "Evet. Kâr, cebinize giren net tutardır; bu yüzden alış ve satışta ödediğiniz her ücret hesaba girmelidir. Hesaplar arası havale ücreti, nakit çekim ücreti, döviz bürosunun işlem komisyonu ve varsa kambiyo işlemlerine uygulanan vergi bu kapsamdadır. Döviz alımlarına uygulanan kambiyo muamele vergisi gibi kesintilerin oranı Cumhurbaşkanı kararıyla belirlenir ve değişebilir; işlem öncesi bankanızdan güncel durumu öğrenin.",
        "Masrafları hesaba katınca başabaş kuru da değişir. Örnekteki 1.000 doları 38,50'den alıp 50 TL masraf ödediyseniz ve satışta da 50 TL masraf ödeyecekseniz, zarar etmemek için satış kurunun en az (38.500 + 50 + 50) ÷ 1.000 = 38,60 olması gerekir."
      ]
    },
    {
      h: "Döviz kazancı vergiye tabi mi?",
      p: [
        "Bireylerin ticari faaliyet kapsamında olmayan, kendi birikimleri için yaptığı döviz alım satımından doğan kur farkı kazancı, genel uygulamada beyana tabi bir gelir olarak değerlendirilmez. Döviz tevdiat hesabındaki faiz gelirleri ise kaynakta stopaja tabidir.",
        "İşlemlerin sıklığı ve büyüklüğü ticari faaliyet görünümü kazanıyorsa ya da döviz bir şirketin varlığıysa durum farklıdır: şirketlerde kur farkları kurumlar vergisi matrahına girer. Kendi durumunuz için mali müşavirinize danışmanız ve güncel mevzuatı Gelir İdaresi Başkanlığı'ndan kontrol etmeniz önerilir."
      ]
    },
    {
      h: "Euro ve parite: iki döviz arasında geçişte kâr zarar",
      p: [
        "Euro, sterlin ya da başka bir dövizde hesap aynıdır; yalnızca o dövizin alış ve satış kurları kullanılır. Ancak dolardan euroya ya da eurodan dolara geçtiğinizde işin içine <strong>parite</strong> girer. Parite, iki yabancı paranın birbirine oranıdır; EUR/USD paritesi 1,08 ise 1 euro 1,08 dolar eder.",
        "Dolarınızı euroya çevirdiğinizde iki ayrı makas ödersiniz: biri dolar satışında, diğeri euro alışında. Bu nedenle sık parite değişimi, kurlar hiç değişmese bile birikiminizi aşındırır. Böyle bir geçişin sonucunu TL cinsinden ölçmek en sağlıklı yoldur: başlangıçta dövize ödediğiniz toplam TL ile sonunda elinizdeki dövizin güncel alış kuruyla TL karşılığını karşılaştırın."
      ]
    },
    {
      h: "Zarar ne zaman gerçekleşmiş sayılır?",
      p: [
        "Elinizdeki dövizin bugünkü kurla TL karşılığı, ödediğiniz tutarın altındaysa bu bir <strong>kâğıt üzerindeki zarardır</strong>; dövizi satmadığınız sürece gerçekleşmiş sayılmaz. Kur sonradan yükselirse zarar ortadan kalkabilir. Satış yaptığınız anda ise kâr ya da zarar kesinleşir.",
        "Bu ayrım, kararlarınızı etkiler. Kısa vadede TL ihtiyacınız yoksa geçici kur düşüşü bir kayıp gibi görünse de birikimin amacına göre değerlendirilmelidir. Öte yandan acil bir harcama için düşük kurdan satış yapmak zorunda kalmamak adına, kısa vadeli ihtiyaçlar için TL cinsinden ayrı bir acil durum birikimi tutmak yaygın bir yaklaşımdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ortalama kurla hesaplamak:</strong> İşlem kurları değil ekran kurları kullanılınca makas görünmez olur.",
        "<strong>Basit kur ortalaması almak:</strong> Farklı miktarlı alımlarda ağırlıklı ortalama kullanılmalıdır.",
        "<strong>Masrafları unutmak:</strong> Küçük tutarlı işlemlerde sabit ücretler getiriyi belirgin biçimde düşürür.",
        "<strong>Nominal kârı gerçek kazanç sanmak:</strong> Enflasyonun altındaki kur artışı satın alma gücü kaybıdır.",
        "<strong>Yüzde değişimi ters hesaplamak:</strong> Getiri her zaman başlangıçta ödenen tutara bölünür, satış tutarına değil."
      ]
    }
  ],
  faq: [
    ["Döviz kâr zarar nasıl hesaplanır?", "Döviz miktarını satış sırasında aldığınız kur ile alış sırasında ödediğiniz kur arasındaki farkla çarpın, sonra komisyon gibi masrafları düşün. 1.000 USD için 38,50'den alıp 41,20'den satmak 2.700 TL kâr eder."],
    ["Alış-satış makası kârı nasıl etkiler?", "Makas, bankanın satış kuru ile alış kuru arasındaki farktır. Döviz alırken yüksek, satarken düşük kur uygulandığı için kurun en az makas kadar yükselmesi gerekir; aksi halde aynı gün alıp satmak bile zarar ettirir."],
    ["Dolarda yüzde kaç kazandım nasıl bulunur?", "Kârı, dövizi alırken ödediğiniz toplam TL'ye bölüp 100 ile çarpın. 38.500 TL ödeyip 41.200 TL aldıysanız 2.700 ÷ 38.500 × 100 = %7,01 getiri elde etmişsinizdir."],
    ["Enflasyona göre döviz getirisi reel mi?", "Reel getiri, (1 + nominal getiri) ÷ (1 + enflasyon) − 1 formülüyle bulunur. Kur artışı aynı dönemdeki enflasyonun altında kaldıysa TL kârına rağmen satın alma gücünüz azalmıştır."],
    ["Banka ile döviz bürosu kuru neden farklı?", "Her kurum kurunu piyasa kuruna kendi makasını ve maliyetlerini ekleyerek belirler. Kanal, saat, işlem tutarı ve para birimi makası değiştirir; Merkez Bankası kurları ise gösterge niteliğindedir."],
    ["Döviz kazancı vergiye tabi mi?", "Bireylerin ticari olmayan döviz alım satımından doğan kur farkı genel uygulamada beyana tabi değildir; döviz hesabı faizleri ise stopaja tabidir. Ticari nitelikli işlemler ve şirketler için farklı kurallar geçerlidir."],
    ["Kâr zarar hesabına komisyon dahil edilmeli mi?", "Evet. Alış ve satışta ödenen komisyon, havale ücreti ve vergiler kârdan düşülmelidir. Masraflar başabaş kurunu da yükseltir; 50 TL'lik iki masraf 1.000 USD'de başabaş kurunu 10 kuruş artırır."],
    ["Kâğıt üzerindeki döviz zararı gerçek zarar mıdır?", "Dövizi satmadığınız sürece bugünkü kurla hesaplanan zarar gerçekleşmemiş sayılır ve kur yükselirse ortadan kalkabilir. Satış yaptığınız anda ise kâr ya da zarar kesinleşir ve geri dönmez."],
    ["Ortalama döviz maliyeti nasıl hesaplanır?", "Farklı zamanlarda yaptığınız tüm alımlarda ödediğiniz toplam TL'yi toplam döviz miktarına bölün. 37.400 TL ile 1.000 USD aldıysanız ortalama maliyetiniz 37,40'tır; basit kur ortalaması yanıltır."]
  ],
  tools: ["doviz-kar-zarar-hesapla", "yuzde-degisim-hesapla", "enflasyon-hesapla", "reel-faiz-hesapla"],
  related: ["reel-faiz-nedir-nasil-hesaplanir", "enflasyona-gore-paranin-degeri", "hisse-ortalama-maliyet-nasil-hesaplanir"],
  sources: [
    ["TCMB – Gösterge niteliğindeki döviz kurları", "https://www.tcmb.gov.tr/"],
    ["TÜİK – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; kurlar örnektir, işlem öncesi kurumunuzun güncel kur ve masraflarını kontrol edin"
};
