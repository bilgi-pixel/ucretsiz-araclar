export default {
  slug: "favok-nedir-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "FAVÖK Nedir, Nasıl Hesaplanır? EBITDA, Faaliyet Kârı ve Marjı",
  pageTitle: "FAVÖK Nedir, Nasıl Hesaplanır? EBITDA ve FAVÖK Marjı",
  description: "FAVÖK, faiz, amortisman ve vergi öncesi kârdır: faaliyet kârına amortisman eklenerek bulunur. EBITDA ile ilişkisi, FAVÖK marjı, net kârdan hesaplama ve çözümlü örnek.",
  keywords: ["favök nedir", "favök nasıl hesaplanır", "ebitda nedir", "favök marjı", "faaliyet kârı nedir", "net kâr favök farkı", "negatif favök", "net borç favök"],
  lead: "FAVÖK, <strong>faiz, amortisman ve vergi öncesi kâr</strong> demektir ve bir şirketin esas faaliyetlerinden, finansman yapısı, vergi ve amortisman politikası hesaba katılmadan ne kadar kazanç ürettiğini gösterir. En basit hesabı, gelir tablosundaki faaliyet kârına amortisman ve itfa paylarını geri eklemektir: 1,5 milyon TL faaliyet kârı ve 600 bin TL amortismanı olan bir şirketin FAVÖK'ü 2,1 milyon TL'dir. İngilizcedeki karşılığı EBITDA'dır. Bu sayfada iki hesap yolunu, FAVÖK marjını, net kârla farkını ve göstergenin sınırlarını çözümlü örnekle bulacaksınız.",
  kisaCevap: [
    "FAVÖK = faaliyet kârı (FVÖK) + amortisman ve itfa payları.",
    "Net kârdan başlayarak: FAVÖK = net kâr + vergi gideri + finansman (faiz) gideri + amortisman, faaliyet dışı kalemler düzeltilerek.",
    "FAVÖK marjı = FAVÖK ÷ net satışlar × 100; 2,1 milyon TL FAVÖK ve 10 milyon TL satışta %21'dir.",
    "FAVÖK, İngilizce EBITDA'nın (Earnings Before Interest, Taxes, Depreciation and Amortization) Türkçe karşılığıdır.",
    "FAVÖK nakit akışı değildir: yatırım harcamalarını, işletme sermayesi değişimini ve borç ödemelerini göstermez.",
    "Negatif FAVÖK, şirketin esas faaliyetlerinin amortisman öncesinde bile zarar ettiğini gösterir."
  ],
  figure: {
    alt: "10 milyon TL net satıştan net kâra şelale: amortisman hariç satışların maliyeti 5,6 milyon ve faaliyet giderleri 2,3 milyon düşülünce FAVÖK 2,1 milyon; amortisman 0,6 milyon düşülünce faaliyet kârı 1,5 milyon; faiz 0,7 ve vergi 0,2 milyon sonrası net kâr 0,6 milyon TL.",
    caption: "Örnek şirketin gelir tablosu bin TL cinsinden. FAVÖK, nakit çıkışı gerektiren işletme giderlerinden sonra, amortisman, faiz ve vergiden önce kalan tutardır.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Satıştan net kâra (bin TL)</text>
  <g class="sm">
    <text x="92" y="66" class="end b">Net satışlar</text><rect x="100" y="50" width="600" height="24" rx="3" class="sf sb"/><text x="400" y="67" class="mid b">10.000</text>
    <text x="92" y="100" class="end">SMM*</text><rect x="364" y="84" width="336" height="24" rx="3" class="dgs"/><text x="532" y="101" class="mid">−5.600</text>
    <text x="92" y="134" class="end">Faaliyet gid.*</text><rect x="226" y="118" width="138" height="24" rx="3" class="dgs"/><text x="295" y="135" class="mid">−2.300</text>
    <text x="92" y="168" class="end b p">FAVÖK</text><rect x="100" y="152" width="126" height="24" rx="3" class="p"/><text x="236" y="169" class="b p">2.100 (%21)</text>
    <text x="92" y="202" class="end">Amortisman</text><rect x="190" y="186" width="36" height="24" rx="3" class="dgs"/><text x="236" y="203">−600</text>
    <text x="92" y="236" class="end b">FVÖK</text><rect x="100" y="220" width="90" height="24" rx="3" class="ps"/><text x="200" y="237" class="b">1.500 (%15)</text>
    <text x="92" y="270" class="end">Faiz gideri</text><rect x="148" y="254" width="42" height="24" rx="3" class="dgs"/><text x="200" y="271">−700</text>
    <text x="92" y="304" class="end">Vergi öncesi</text><rect x="100" y="288" width="48" height="24" rx="3" class="sf sb"/><text x="158" y="305">800</text>
    <text x="92" y="338" class="end">Vergi (%25)</text><rect x="136" y="322" width="12" height="24" rx="3" class="dgs"/><text x="158" y="339">−200</text>
    <text x="92" y="372" class="end b ok">Net kâr</text><rect x="100" y="356" width="36" height="24" rx="3" class="ok"/><text x="146" y="373" class="b ok">600 (%6)</text>
  </g>
  <rect x="420" y="190" width="280" height="150" rx="10" class="sf sb"/>
  <text x="560" y="218" class="b mid">İki yoldan aynı sonuç</text>
  <text x="560" y="248" class="sm mid">1.500 + 600 = 2.100</text>
  <text x="560" y="272" class="sm mid t2">faaliyet kârı + amortisman</text>
  <text x="560" y="302" class="sm mid">600 + 200 + 700 + 600 = 2.100</text>
  <text x="560" y="326" class="sm mid t2">net kâr + vergi + faiz + amortisman</text>
  <text x="20" y="420" class="sm t2">* Amortisman hariç tutarlar. Örnek vergi oranı yalnızca hesap mantığını göstermek içindir.</text>
</svg>`
  },
  sections: [
    {
      h: "FAVÖK nedir, ne anlatır?",
      p: [
        "FAVÖK, bir şirketin satışlarından, ürettiği mal ve hizmetin maliyetini ve personel, kira, pazarlama gibi faaliyet giderlerini düştükten sonra kalan; ama henüz <strong>faiz, vergi, amortisman ve itfa payları</strong> düşülmemiş kârıdır. Şirketin \"asıl işinden\" ne kadar kazandığını, finansman tercihi ve muhasebe politikalarının etkisinden arındırarak göstermeye çalışır.",
        "Neden bu kalemler dışarıda bırakılır? <strong>Faiz</strong>, şirketin işini nasıl finanse ettiğine bağlıdır; aynı işi yapan biri borçla, diğeri özkaynakla çalışıyorsa faiz giderleri çok farklı olur. <strong>Vergi</strong> ülkeye, teşviklere ve geçmiş zararlara göre değişir. <strong>Amortisman ve itfa payları</strong> ise geçmişte yapılmış yatırımların muhasebe kurallarına göre yıllara dağıtılmasıdır ve o yıl nakit çıkışı yaratmaz. FAVÖK bu üç etkiyi ayıklayarak farklı şirketlerin faaliyet performansını yan yana koymayı kolaylaştırır.",
        "Türk şirketlerinin finansal tablo açıklamalarında ve haberlerde FAVÖK sık geçer. Ancak FAVÖK, Türkiye Finansal Raporlama Standartları'nda tanımlanmış zorunlu bir kalem değildir; şirketler tarafından ek gösterge olarak açıklanır ve hesaplama yöntemleri arasında küçük farklar olabilir. Bu yüzden iki şirketin FAVÖK'ünü karşılaştırırken nasıl hesaplandığına bakmak gerekir."
      ]
    },
    {
      h: "FAVÖK nasıl hesaplanır? İki yol",
      p: [
        "FAVÖK iki yönden hesaplanabilir: gelir tablosunda yukarıdan aşağı faaliyet kârından başlayarak ya da aşağıdan yukarı net kârdan geriye giderek. İki yöntem, faaliyet dışı kalemler doğru ayıklandığında aynı sonucu verir."
      ],
      formula: "1) Faaliyet kârından: FAVÖK = faaliyet kârı (FVÖK) + amortisman ve itfa payları\n   Faaliyet kârı = net satışlar − satışların maliyeti − faaliyet giderleri\n2) Net kârdan: FAVÖK = net kâr + vergi gideri + finansman giderleri − finansman gelirleri\n   + amortisman ve itfa payları ± esas faaliyet dışı gelir ve giderler\nFAVÖK marjı = FAVÖK ÷ net satışlar × 100",
      after: [
        "Amortisman tutarı gelir tablosunda genellikle ayrı satırda görünmez; satışların maliyeti ve faaliyet giderlerinin içine dağılmıştır. Toplam amortisman ve itfa paylarını nakit akış tablosunun işletme faaliyetleri bölümünden ya da dipnotlardan alabilirsiniz. Bu tutarların nasıl hesaplandığı için [[bilgi:amortisman-nasil-hesaplanir|amortisman nasıl hesaplanır]] yazısına bakabilirsiniz.",
        "Net kârdan başlanan yöntemde kur farkı, varlık satış kârı, değer düşüklüğü gibi esas faaliyet dışı kalemler net kârın içinde kaldığı için ayrıca düzeltilmezse FAVÖK farklı çıkar. [[arac:favok-hesapla|FAVÖK Hesaplama aracı]] iki yöntemi de destekler ve FAVÖK marjını faaliyet kâr marjıyla birlikte gösterir."
      ]
    },
    {
      h: "Çözümlü örnek: 10 milyon TL satışlı şirket",
      p: [
        "Bir üretim şirketinin bir yıllık gelir tablosu örnek tutarlarla şöyle olsun: net satışlar 10.000.000 TL, satışların maliyeti 6.000.000 TL (içinde 400.000 TL makine amortismanı), faaliyet giderleri 2.500.000 TL (içinde 200.000 TL ofis ve taşıt amortismanı), finansman gideri 700.000 TL. Örnek olarak %25 vergi oranı kullanalım."
      ],
      table: {
        head: ["Kalem", "Tutar (TL)", "Satışa oranı"],
        rows: [
          ["Net satışlar", "10.000.000", "%100"],
          ["Satışların maliyeti (−)", "6.000.000", "%60"],
          ["Brüt kâr", "4.000.000", "%40"],
          ["Faaliyet giderleri (−)", "2.500.000", "%25"],
          ["Faaliyet kârı (FVÖK)", "1.500.000", "%15"],
          ["+ Amortisman (400.000 + 200.000)", "600.000", "%6"],
          ["<strong>FAVÖK</strong>", "<strong>2.100.000</strong>", "<strong>%21</strong>"],
          ["Finansman gideri (−)", "700.000", "%7"],
          ["Vergi öncesi kâr", "800.000", "%8"],
          ["Vergi gideri (%25, −)", "200.000", "%2"],
          ["Net kâr", "600.000", "%6"]
        ],
        caption: "Tutarlar örnektir. Vergi oranı yalnızca hesap mantığını göstermek için seçilmiştir; güncel oran ve istisnalar için mevzuata bakın."
      },
      after: [
        "Sağlama için net kârdan geriye gidelim: 600.000 + 200.000 (vergi) + 700.000 (faiz) + 600.000 (amortisman) = 2.100.000 TL. Bu şirkette faaliyet dışı gelir ya da gider olmadığı için iki yöntem aynı sonucu verdi. Brüt kâr ve faaliyet kâr marjlarını ayrıca görmek için [[arac:faaliyet-kar-marji-hesapla|Faaliyet Kâr Marjı Hesaplama aracı]], ürün bazında kâr marjı için [[arac:kar-marji-hesapla|Kâr Marjı Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "EBITDA, FAVÖK, FVÖK ve net kâr arasındaki farklar",
      table: {
        head: ["Kısaltma", "Açılımı", "Neyi göstermez?"],
        rows: [
          ["FAVÖK (EBITDA)", "Faiz, amortisman ve vergi öncesi kâr", "Faiz, vergi, amortisman ve itfa payları"],
          ["FVÖK (EBIT)", "Faiz ve vergi öncesi kâr; faaliyet kârına yakın", "Faiz ve vergi"],
          ["VÖK (EBT)", "Vergi öncesi kâr", "Yalnızca vergi"],
          ["Net kâr", "Dönem net kârı", "Hepsi düşülmüştür"]
        ]
      },
      after: [
        "<strong>EBITDA ile FAVÖK aynı şeydir</strong>; biri İngilizce, diğeri Türkçe kısaltmadır. Faaliyet kârı ile FAVÖK arasındaki tek fark amortisman ve itfa paylarıdır. Yoğun yatırım yapan sektörlerde (enerji, telekomünikasyon, havayolu, üretim) bu fark büyük olur; yazılım ya da danışmanlık gibi az sabit varlıkla çalışan sektörlerde ise FAVÖK ile faaliyet kârı birbirine yakındır.",
        "Net kârın FAVÖK'ten düşük olmasının nedeni, FAVÖK'ten sonra gelen üç kalemdir: amortisman, faiz ve vergi. Yüksek borçlu bir şirket güçlü bir FAVÖK'e rağmen faiz giderleri yüzünden net zarar açıklayabilir. Tersine, yüklü bir varlık satış kârı net kârı FAVÖK'e yaklaştırabilir ya da geçirebilir."
      ]
    },
    {
      h: "FAVÖK marjı nasıl yorumlanır?",
      p: [
        "FAVÖK marjı, satışların yüzde kaçının faaliyet nakit kârına dönüştüğünü gösterir. Örnekteki %21, şirketin her 100 TL'lik satışından amortisman, faiz ve vergi öncesinde 21 TL kazandığı anlamına gelir. Marj tek başına değil, karşılaştırmayla anlam kazanır: aynı şirketin önceki yıllarıyla ve aynı sektördeki şirketlerle.",
        "Sektörler arasında marj farkları doğaldır. Perakende ve toptan ticaret gibi yüksek cirolu, düşük kârlı işlerde FAVÖK marjı tek haneli olabilirken altyapı yoğun sektörlerde çok daha yüksek marjlar görülür. Bu yüzden \"iyi FAVÖK marjı kaçtır\" sorusunun evrensel bir cevabı yoktur.",
        "Marjın yıldan yıla değişimi çoğu zaman marjın kendisinden daha bilgilendiricidir. Satışlar artarken FAVÖK marjı düşüyorsa maliyetler satış fiyatlarından hızlı artıyor olabilir; marj yükseliyorsa şirket ölçek ekonomisinden ya da fiyatlama gücünden yararlanıyor olabilir."
      ]
    },
    {
      h: "FAVÖK neden şirket değerlemesinde kullanılır?",
      p: [
        "Şirket değerlemesinde en sık kullanılan çarpanlardan biri <strong>firma değeri / FAVÖK</strong> oranıdır. Firma değeri, şirketin piyasa değerine net borcunun eklenmesiyle bulunur. FAVÖK faiz öncesi bir gösterge olduğu için, borç ve özkaynak sahiplerinin toplam payını gösteren firma değeriyle tutarlı bir eşleşme sağlar. Örnekte firma değeri 14.700.000 TL olsaydı çarpan 14.700.000 ÷ 2.100.000 = 7 olurdu.",
        "Bankalar ve kredi kuruluşları ise <strong>net borç / FAVÖK</strong> oranına bakar; şirketin bugünkü faaliyet kârıyla borcunu kabaca kaç yılda ödeyebileceğini gösterir. Örnek şirketin net borcu 4.200.000 TL ise oran 2,0'dır. Bu oranlar sektöre ve faiz ortamına göre farklı yorumlanır; bu sayfadaki örnekler yatırım tavsiyesi değil, hesap yönteminin anlatımıdır."
      ]
    },
    {
      h: "Negatif FAVÖK ne anlama gelir? Göstergenin sınırları",
      p: [
        "FAVÖK'ün eksi çıkması, şirketin satış gelirlerinin; amortisman, faiz ve vergi hiç hesaba katılmadan, yalnızca ürün maliyeti ve faaliyet giderlerini bile karşılamadığını gösterir. Yeni kurulan, büyüme aşamasındaki şirketlerde geçici olarak görülebilir; olgun bir şirkette ise iş modelinde ciddi bir sorunun işaretidir.",
        "FAVÖK yararlı bir göstergedir ama sınırları iyi bilinmelidir:"
      ],
      ul: [
        "<strong>Nakit akışı değildir:</strong> Alacaklardaki ve stoklardaki artış nakdi bağlar, ama FAVÖK'ü etkilemez.",
        "<strong>Yatırım ihtiyacını göstermez:</strong> Amortismanı dışarıda bırakmak, makinelerin yenilenmesi için yapılması gereken harcamaları görünmez kılar.",
        "<strong>Borç yükünü gizler:</strong> Faiz giderleri hariç tutulduğu için yüksek borçlu şirketler FAVÖK'te sağlıklı görünebilir.",
        "<strong>Tanımı şirketten şirkete değişebilir:</strong> Bazı şirketler tek seferlik kalemleri ayıklayarak \"düzeltilmiş FAVÖK\" açıklar; karşılaştırmada bu farka dikkat edilmelidir.",
        "<strong>Enflasyon ve kur etkileri:</strong> Yüksek enflasyon dönemlerinde ve kur hareketlerinin büyük olduğu yıllarda karşılaştırma yapılırken hangi düzeltmelerin uygulandığı kontrol edilmelidir."
      ],
      after: [
        "Kâr hesaplarının temel kavramlarına göz atmak için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] ve sabit giderlerin satışla ilişkisini anlamak için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazıları faydalı olur."
      ]
    },
    {
      h: "FAVÖK hesaplarken sık yapılan hatalar",
      ul: [
        "<strong>Amortismanı iki kez eklemek:</strong> Amortisman zaten maliyet ve giderlerin içindedir; faaliyet kârına bir kez geri eklenir.",
        "<strong>Faaliyet dışı kalemleri ayıklamamak:</strong> Net kârdan başlarken kur farkı ve varlık satış kârı düzeltilmezse FAVÖK şişer ya da küçülür.",
        "<strong>Finansman gelirlerini unutmak:</strong> Net kârdan geriye giderken faiz gideri eklenir, faiz geliri çıkarılır.",
        "<strong>Marjı farklı sektörlerle kıyaslamak:</strong> Perakendecinin %5'i ile enerji şirketinin %40'ı aynı ölçütle değerlendirilemez.",
        "<strong>FAVÖK'ü kâr sanmak:</strong> Hissedara kalan kâr net kârdır; FAVÖK yalnızca faaliyet performansının bir ölçüsüdür."
      ]
    }
  ],
  faq: [
    ["FAVÖK nedir?", "FAVÖK, faiz, amortisman ve vergi öncesi kâr demektir. Bir şirketin esas faaliyetlerinden, finansman yapısı, vergi ve amortisman politikası hesaba katılmadan elde ettiği kazancı gösterir; İngilizce karşılığı EBITDA'dır."],
    ["FAVÖK nasıl hesaplanır?", "En kolay yol, gelir tablosundaki faaliyet kârına amortisman ve itfa paylarını eklemektir. Net kârdan başlanacaksa vergi gideri, net faiz gideri ve amortisman eklenir, faaliyet dışı gelir ve giderler düzeltilir."],
    ["EBITDA ile FAVÖK aynı şey mi?", "Evet. EBITDA İngilizce Earnings Before Interest, Taxes, Depreciation and Amortization ifadesinin kısaltmasıdır; Türkçe karşılığı faiz, amortisman ve vergi öncesi kâr, yani FAVÖK'tür."],
    ["FAVÖK marjı nasıl bulunur?", "FAVÖK net satışlara bölünüp 100 ile çarpılır. 2,1 milyon TL FAVÖK ve 10 milyon TL net satışı olan bir şirketin FAVÖK marjı yüzde 21'dir; bu, her 100 TL satıştan 21 TL faaliyet kazancı kaldığını gösterir."],
    ["Faaliyet kârı ile FAVÖK farkı nedir?", "Faaliyet kârı amortisman düşüldükten sonraki kârdır; FAVÖK ise amortisman ve itfa payları geri eklenmiş hâlidir. Aradaki fark tam olarak amortisman tutarıdır ve yatırım yoğun sektörlerde büyüktür."],
    ["Net kâr neden FAVÖK'ten düşüktür?", "Net kâr, FAVÖK'ten sonra amortisman, faiz gideri ve vergi düşülerek bulunur. Borcu yüksek ya da yoğun yatırım yapmış şirketlerde bu kalemler büyük olduğu için net kâr FAVÖK'ün çok altında kalabilir."],
    ["FAVÖK neden şirket değerlemesinde kullanılır?", "FAVÖK finansman ve vergi farklarından arındırıldığı için şirketleri karşılaştırmayı kolaylaştırır. Firma değeri / FAVÖK ve net borç / FAVÖK oranları değerleme ve kredi analizinde yaygın kullanılan ölçütlerdir."],
    ["Negatif FAVÖK ne anlama gelir?", "Negatif FAVÖK, satış gelirlerinin amortisman, faiz ve vergi hesaba katılmadan bile ürün maliyetini ve faaliyet giderlerini karşılamadığını gösterir. Büyüme aşamasındaki şirketlerde geçici olabilir, olgun şirkette ciddi uyarı işaretidir."]
  ],
  tools: ["favok-hesapla", "faaliyet-kar-marji-hesapla", "kar-marji-hesapla", "amortisman-hesapla"],
  related: ["amortisman-nasil-hesaplanir", "kar-marji-nasil-hesaplanir", "basabas-noktasi-nedir"],
  sources: [
    ["Kamu Gözetimi, Muhasebe ve Denetim Standartları Kurumu (KGK) – TFRS", "https://www.kgk.gov.tr/"],
    ["Sermaye Piyasası Kurulu (SPK)", "https://www.spk.gov.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır, yatırım tavsiyesi değildir; şirket analizi ve vergi uygulamaları için uzmanınıza danışın"
};
