export default {
  slug: "roe-roa-nedir-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "ROE ve ROA Nedir? Özkaynak ve Aktif Kârlılığı Nasıl Hesaplanır",
  pageTitle: "ROE ve ROA Nedir? Özkaynak ve Aktif Kârlılığı Hesaplama",
  description: "ROE net kârın özkaynağa, ROA net kârın toplam aktiflere oranıdır. Formüller, çözümlü örnek, DuPont analizi, borç/özkaynak etkisi ve yorumlama ipuçları.",
  keywords: ["roe nedir", "roa nedir", "özkaynak kârlılığı", "aktif kârlılığı", "roe nasıl hesaplanır", "dupont analizi", "borç özkaynak oranı", "bilanço oranları"],
  lead: "ROE (özkaynak kârlılığı) net kârın özkaynaklara, ROA (aktif kârlılığı) ise net kârın toplam aktiflere bölünmesiyle bulunur ve ikisi de yüzde olarak ifade edilir. ROE ortakların koyduğu her 100 liraya ne kadar kâr düştüğünü, ROA ise şirketin sahip olduğu tüm varlıkları ne kadar verimli kullandığını gösterir. Aradaki farkı yaratan borçtur. Bu sayfada formülleri, bir şirket bilançosu üzerinde çözümlü örneği, DuPont ayrıştırmasını ve oranları yorumlarken dikkat edilecek noktaları bulacaksınız.",
  kisaCevap: [
    "ROE = net kâr ÷ özkaynaklar × 100; ortakların sermayesinin getirisini gösterir.",
    "ROA = net kâr ÷ toplam aktifler × 100; şirketin tüm varlıklarının getirisini gösterir.",
    "Toplam aktifler = borçlar + özkaynaklar olduğu için borç arttıkça ROE, ROA'dan uzaklaşır.",
    "DuPont: ROE = net kâr marjı × aktif devir hızı × özkaynak çarpanı.",
    "Kâr bir yıla, bilanço bir güne ait olduğu için paydada dönem başı ve sonu ortalamasını kullanmak daha doğru sonuç verir.",
    "Oranlar tek başına iyi ya da kötü değildir; aynı sektördeki şirketlerle, şirketin geçmiş yıllarıyla ve enflasyonla karşılaştırılarak yorumlanır."
  ],
  figure: {
    alt: "DuPont ağacı: yüzde 20 ROE; yüzde 12 net kâr marjı, 0,67 aktif devir hızı ve 2,5 özkaynak çarpanının çarpımı olarak gösteriliyor. Altta aynı yüzde 8 ROA'ya sahip iki şirketin farklı borç düzeyiyle farklı ROE'si.",
    caption: "Örnek şirkette ROA %8, ROE %20'dir. ROE'yi ROA'dan yukarı taşıyan 2,5'lik özkaynak çarpanıdır, yani borçla finanse edilen varlıklardır. Tutarlar örnektir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">DuPont ağacı: ROE nereden geliyor?</text>
  <rect x="270" y="48" width="180" height="62" rx="10" class="p"/>
  <text x="360" y="74" class="sm mid sf">ROE (özkaynak kârlılığı)</text>
  <text x="360" y="100" class="xl mid sf">%20</text>
  <g class="sp" fill="none"><line x1="360" y1="110" x2="360" y2="128"/><line x1="110" y1="128" x2="610" y2="128"/>
  <line x1="110" y1="128" x2="110" y2="144"/><line x1="360" y1="128" x2="360" y2="144"/><line x1="610" y1="128" x2="610" y2="144"/></g>
  <rect x="20" y="144" width="180" height="86" rx="10" class="sf sb"/>
  <text x="110" y="168" class="sm mid mu">Net kâr marjı</text>
  <text x="110" y="196" class="lg b mid">%12</text>
  <text x="110" y="218" class="sm mid t2">12 mn ÷ 100 mn satış</text>
  <text x="235" y="194" class="lg b mid p">×</text>
  <rect x="270" y="144" width="180" height="86" rx="10" class="sf sb"/>
  <text x="360" y="168" class="sm mid mu">Aktif devir hızı</text>
  <text x="360" y="196" class="lg b mid">0,67</text>
  <text x="360" y="218" class="sm mid t2">100 mn ÷ 150 mn aktif</text>
  <text x="485" y="194" class="lg b mid p">×</text>
  <rect x="520" y="144" width="180" height="86" rx="10" class="ps"/>
  <text x="610" y="168" class="sm mid">Özkaynak çarpanı</text>
  <text x="610" y="196" class="lg b mid">2,5</text>
  <text x="610" y="218" class="sm mid t2">150 mn ÷ 60 mn özkaynak</text>
  <rect x="20" y="246" width="430" height="36" rx="8" class="oks"/>
  <text x="235" y="270" class="sm mid b">Marj × devir = ROA = %8 (12 mn ÷ 150 mn)</text>
  <text x="20" y="316" class="b">Aynı ROA, farklı borç: ROE nasıl değişir?</text>
  <text x="20" y="346" class="sm">A şirketi: özkaynak 60 mn</text>
  <rect x="200" y="332" width="200" height="22" rx="4" class="ps"/>
  <text x="410" y="348" class="sm b">ROE %20</text>
  <text x="20" y="384" class="sm">B şirketi: özkaynak 30 mn</text>
  <rect x="200" y="370" width="400" height="22" rx="4" class="p"/>
  <text x="610" y="386" class="sm b">ROE %40</text>
  <text x="20" y="424" class="sm t2">B'nin yüksek ROE'si daha çok borçtan gelir; faiz yükü ve risk de daha yüksektir.</text>
</svg>`
  },
  sections: [
    {
      h: "ROE (özkaynak kârlılığı) nedir?",
      p: [
        "ROE, İngilizce \"return on equity\" ifadesinin kısaltmasıdır ve Türkçede <strong>özkaynak kârlılığı</strong> ya da özsermaye kârlılığı olarak geçer. Şirketin bir dönemde elde ettiği net kârın, ortaklara ait kaynaklara yani özkaynaklara oranıdır. Ortaklar açısından bakıldığında \"şirkete bıraktığım her 100 lira bir yılda bana kaç lira kâr üretti?\" sorusunun cevabıdır.",
        "Özkaynaklar; ödenmiş sermaye, sermaye yedekleri, kâr yedekleri ve geçmiş yıl kârları gibi kalemlerden oluşur. Bilançonun pasif tarafında, borçların altında yer alır. Net kâr ise gelir tablosunun en alt satırıdır, yani tüm giderler, faizler ve vergiler düşüldükten sonra kalan tutardır."
      ],
      formula: "ROE = net kâr ÷ özkaynaklar × 100\nDaha doğru biçim: ROE = net kâr ÷ ((dönem başı özkaynak + dönem sonu özkaynak) ÷ 2) × 100"
    },
    {
      h: "ROA (aktif kârlılığı) nedir?",
      p: [
        "ROA, \"return on assets\" yani <strong>aktif kârlılığı</strong> ya da varlık getirisidir. Net kârın şirketin toplam aktiflerine, başka bir deyişle sahip olduğu tüm varlıklara oranıdır. Aktifler nakit, alacaklar, stoklar, makineler, binalar ve diğer tüm varlıkları kapsar; bunların ortaklarca mı yoksa borçla mı finanse edildiğine bakmaz.",
        "Bu nedenle ROA, yönetimin eldeki varlıkları ne kadar verimli kullandığını gösteren daha \"saf\" bir ölçüdür. Çok makine ve tesis gerektiren sanayi şirketlerinde ROA düşük, az varlıkla çalışan hizmet ve yazılım şirketlerinde yüksek olma eğilimindedir."
      ],
      formula: "ROA = net kâr ÷ toplam aktifler × 100\nBilanço eşitliği: toplam aktifler = toplam borçlar + özkaynaklar",
      after: [
        "Bazı analistler ROA hesabında net kâra vergi etkisi arındırılmış faiz giderini geri ekler; böylece borçla finansmanın etkisi paydan da çıkarılmış olur. Hangi tanımın kullanıldığına dikkat etmek, iki farklı kaynaktaki oranları karşılaştırırken önemlidir."
      ]
    },
    {
      h: "Çözümlü örnek: bir şirket bilançosundan ROE ve ROA",
      p: [
        "Aşağıdaki tutarlar hayalî bir üretim şirketine aittir ve yalnızca hesabı göstermek içindir. Şirketin bir yıllık net satışları 100 milyon TL, net kârı 12 milyon TL'dir. Yıl sonu bilançosunda toplam aktifler 150 milyon TL, borçlar 90 milyon TL, özkaynaklar 60 milyon TL'dir."
      ],
      ol: [
        "ROE: 12 ÷ 60 = 0,20 → <strong>%20</strong>. Ortakların koyduğu her 100 TL'ye yılda 20 TL net kâr düşmüştür.",
        "ROA: 12 ÷ 150 = 0,08 → <strong>%8</strong>. Şirketin her 100 TL'lik varlığı yılda 8 TL net kâr üretmiştir.",
        "Net kâr marjı: 12 ÷ 100 = %12. Her 100 TL'lik satıştan 12 TL net kâr kalmıştır.",
        "Aktif devir hızı: 100 ÷ 150 ≈ 0,67. Şirket varlıklarının yaklaşık üçte ikisi kadar satış yapmıştır.",
        "Borç/özkaynak oranı: 90 ÷ 60 = 1,5. Her 1 TL özkaynağa karşılık 1,5 TL borç vardır."
      ],
      after: [
        "Dönem başı özkaynak 50 milyon TL olsaydı ortalama özkaynak (50 + 60) ÷ 2 = 55 milyon TL olurdu ve ROE 12 ÷ 55 ≈ %21,8 çıkardı. Kâr yıl boyunca birikerek oluştuğu için ortalama kullanmak, özellikle hızlı büyüyen şirketlerde daha gerçekçi bir sonuç verir. Bu hesapları [[arac:ozkaynak-karliligi-hesapla|Özkaynak Kârlılığı (ROE) Hesaplama]] ve [[arac:aktif-karlilik-hesapla|Aktif Kârlılığı (ROA) Hesaplama]] araçlarıyla tekrarlayabilirsiniz."
      ]
    },
    {
      h: "DuPont analizi nedir?",
      p: [
        "DuPont analizi, ROE'yi üç parçaya ayırarak kârlılığın nereden geldiğini gösterir. Adını bu yöntemi 20. yüzyılın başında iç raporlamada kullanan kimya şirketinden alır. Üç çarpan, şirketin üç farklı yönünü ölçer: satıştan ne kadar kâr bıraktığı, varlıklarını ne kadar hızlı çevirdiği ve ne kadar borçla çalıştığı."
      ],
      formula: "ROE = (net kâr ÷ satışlar) × (satışlar ÷ toplam aktifler) × (toplam aktifler ÷ özkaynaklar)\nROE = net kâr marjı × aktif devir hızı × özkaynak çarpanı\nÖrnek: %12 × 0,667 × 2,5 = %20",
      after: [
        "İlk iki çarpanın çarpımı ROA'yı verir. Dolayısıyla <strong>ROE = ROA × özkaynak çarpanı</strong> diye de yazılabilir. İki şirketin ROE'si aynı olsa bile biri yüksek kâr marjıyla, diğeri yüksek borçla bu sonuca ulaşmış olabilir. DuPont ayrıştırması bu farkı görünür kılar ve \"ROE neden düştü?\" sorusuna somut bir cevap verir: marj mı daraldı, satışlar mı yavaşladı, yoksa borç mu azaldı?"
      ]
    },
    {
      h: "Borç/özkaynak oranı ROE'yi nasıl etkiler?",
      p: [
        "Borçla alınan varlıklar kâr üretiyor ama ortakların sermayesini artırmıyorsa, kâr daha küçük bir özkaynak tabanına bölünür ve ROE yükselir. Buna finansal kaldıraç etkisi denir. Görseldeki B şirketi A ile aynı varlıklara ve aynı 12 milyon TL kâra sahip olsaydı, özkaynağı 30 milyon TL olduğu için ROE'si %40'a çıkardı.",
        "Bu karşılaştırma basitleştirilmiştir; gerçekte daha fazla borç daha fazla faiz gideri demektir ve net kârı düşürür. Borcun maliyeti, borçla alınan varlıkların getirisinden yüksekse kaldıraç ters çalışır ve ROE'yi aşağı çeker. Üstelik yüksek borç, satışların düştüğü dönemlerde şirketin dayanıklılığını azaltır."
      ],
      table: {
        head: ["Özkaynak (mn TL)", "Borç (mn TL)", "Borç/özkaynak", "Özkaynak çarpanı", "ROA", "ROE"],
        rows: [
          ["150", "0", "0", "1,0", "%8", "%8"],
          ["100", "50", "0,5", "1,5", "%8", "%12"],
          ["60", "90", "1,5", "2,5", "%8", "%20"],
          ["30", "120", "4,0", "5,0", "%8", "%40"]
        ],
        caption: "Toplam aktif 150 milyon TL ve net kâr 12 milyon TL sabit tutulmuştur; faiz giderinin kâra etkisi bu tabloda ihmal edilmiştir."
      },
      after: [
        "Borçluluk düzeyini ayrıca görmek için [[arac:borc-ozkaynak-orani-hesapla|Borç/Özkaynak Oranı Hesaplama]] aracı kaldıraç oranını ve özkaynak çarpanını birlikte verir. Yüksek ROE gördüğünüzde ilk sorulması gereken soru, bunun ne kadarının borçtan geldiğidir."
      ]
    },
    {
      h: "İyi bir ROE oranı kaç olmalı?",
      p: [
        "Herkes için geçerli tek bir \"iyi ROE\" eşiği yoktur. Oran; sektöre, şirketin büyüklüğüne, faiz ortamına ve özellikle enflasyona göre yorumlanmalıdır. Yüksek enflasyon dönemlerinde nominal kârlar şiştiği için ROE de yüksek görünebilir; bu durumda oranı enflasyonla ve risksiz sayılabilecek yatırım getirileriyle karşılaştırmak gerekir.",
        "Türkiye'de borsada işlem gören şirketlerin finansal tabloları belirli dönemlerden itibaren enflasyon düzeltmesine tabi tutulmaktadır. Düzeltilmiş ve düzeltilmemiş tablolardan hesaplanan ROE değerleri birbirinden çok farklı çıkabilir; karşılaştırma yaparken aynı esasla hazırlanmış tabloları kullandığınızdan emin olun. Paranın satın alma gücü değişimini görmek için [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz]] yazısındaki mantık ROE için de geçerlidir."
      ],
      ul: [
        "<strong>Sektör içinde karşılaştırın:</strong> Bir perakende şirketinin ROE'sini bir enerji şirketininkiyle kıyaslamak anlamlı değildir.",
        "<strong>Birkaç yılın ortalamasına bakın:</strong> Tek seferlik bir varlık satışı bir yılın ROE'sini olağan dışı yükseltebilir.",
        "<strong>ROA ile birlikte okuyun:</strong> ROA düşük, ROE yüksekse kârlılık büyük ölçüde borca dayanıyor demektir.",
        "<strong>Negatif özkaynağa dikkat:</strong> Birikmiş zararlar nedeniyle özkaynak negatife dönmüşse ROE hesaplansa bile anlamını yitirir."
      ]
    },
    {
      h: "Bankalarda ROE neden ayrıca izlenir?",
      p: [
        "Bankaların iş modeli doğası gereği yüksek kaldıraçlıdır: topladıkları mevduat ve diğer yabancı kaynaklar özkaynaklarının kat kat üzerindedir. Bu yüzden bankalarda ROA genellikle düşük yüzdelerde kalırken ROE çok daha yüksek çıkabilir. Bir sanayi şirketinde endişe verici olacak bir kaldıraç düzeyi, bankacılıkta olağan sayılır.",
        "Bu nedenle banka analizinde ROE ile birlikte sermaye yeterliliği oranı ve aktif kalitesi göstergeleri de izlenir. Bankacılık sektörüne ait toplu verileri Bankacılık Düzenleme ve Denetleme Kurumu yayımlar. Banka ROE'sini sanayi şirketlerinin ROE'siyle doğrudan karşılaştırmak yanıltıcı olur."
      ]
    },
    {
      h: "ROE ile ROA farkı neden önemlidir? Diğer oranlarla ilişki",
      p: [
        "ROE ile ROA arasındaki fark, şirketin finansman tercihini özetler. İki oranın birbirine yakın olması şirketin az borçla çalıştığını, ROE'nin ROA'nın çok üstünde olması ise kârlılığın borçla büyütüldüğünü gösterir. Yatırımcılar ve kredi veren kurumlar bu farka farklı açılardan bakar: biri getiriyi, diğeri geri ödeme riskini görür.",
        "Bu oranlar diğer temel göstergelerle birlikte daha anlamlı hale gelir. Fiyat/kazanç oranı şirketin piyasa değerini kârla, FAVÖK ise faaliyet kârını amortisman ve finansman etkisinden arındırarak gösterir. Konuyu bütünüyle görmek için [[bilgi:fk-orani-nedir|F/K oranı]] ve [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK]] yazılarına da göz atabilirsiniz."
      ],
      table: {
        head: ["Oran", "Formül", "Neyi gösterir?"],
        rows: [
          ["ROE", "Net kâr ÷ özkaynak", "Ortakların sermayesinin getirisi"],
          ["ROA", "Net kâr ÷ toplam aktif", "Tüm varlıkların getirisi"],
          ["Net kâr marjı", "Net kâr ÷ satışlar", "Satıştan kalan kâr payı"],
          ["Aktif devir hızı", "Satışlar ÷ toplam aktif", "Varlıkların satışa dönüşme hızı"],
          ["Borç/özkaynak", "Toplam borç ÷ özkaynak", "Finansal kaldıraç düzeyi"]
        ]
      }
    },
    {
      h: "Hesaplarken sık yapılan hatalar",
      ul: [
        "<strong>Çeyreklik kârı yıllık sanmak:</strong> Üç aylık net kârla hesaplanan ROE yıllık değildir; son dört çeyreğin toplamını kullanın.",
        "<strong>Ana ortaklık ayrımını atlamak:</strong> Konsolide tablolarda ana ortaklığa ait net kârı ana ortaklığa ait özkaynakla eşleştirin.",
        "<strong>Dönem sonu özkaynağı kullanmak:</strong> Yıl içinde sermaye artırımı yapılmışsa dönem sonu değer ROE'yi olduğundan düşük gösterir; ortalama alın.",
        "<strong>Brüt kârla hesaplamak:</strong> ROE ve ROA'da pay her zaman net kârdır; faaliyet kârı ya da brüt kâr kullanılırsa oran şişer.",
        "<strong>Oranı tek başına karar ölçütü yapmak:</strong> Oranlar geçmişi anlatır; geleceğe ilişkin bir yatırım kararı için tek başına yeterli değildir."
      ],
      note: "Bu sayfa finansal oranları kavram olarak açıklar; belirli bir hisse senedi ya da şirket için yatırım tavsiyesi değildir. Yatırım kararlarınızda yetkili kuruluşlardan profesyonel destek alın."
    }
  ],
  faq: [
    ["ROE (özkaynak kârlılığı) nedir?", "ROE, şirketin net kârının özkaynaklarına oranıdır ve yüzde olarak ifade edilir. Ortakların şirkete bıraktığı her 100 liranın bir dönemde ne kadar net kâr ürettiğini gösterir; örneğin 12 milyon kâr ve 60 milyon özkaynakla ROE %20'dir."],
    ["ROA (aktif kârlılığı) nedir?", "ROA, net kârın toplam aktiflere bölünmesiyle bulunan orandır. Şirketin borçla ya da özkaynakla finanse edilmiş tüm varlıklarının ne kadar kâr ürettiğini gösterir ve yönetimin varlık kullanma verimliliğini ölçer."],
    ["ROE nasıl hesaplanır?", "Yıllık net kâr, dönemin ortalama özkaynağına bölünür ve 100 ile çarpılır. Ortalama özkaynak, dönem başı ve dönem sonu özkaynak toplamının yarısıdır. Çeyreklik verilerde son dört çeyreğin net kârı toplanarak yıllık değer bulunur."],
    ["İyi bir ROE oranı kaç olmalı?", "Evrensel bir eşik yoktur. ROE; aynı sektördeki şirketlerle, şirketin önceki yıllarıyla, enflasyonla ve risksiz getirilerle karşılaştırılarak yorumlanır. Yüksek ROE'nin borçtan mı yoksa gerçek kârlılıktan mı geldiğine de bakılmalıdır."],
    ["ROE ile ROA farkı neden önemlidir?", "Fark şirketin ne kadar borçla çalıştığını gösterir. İki oran birbirine yakınsa şirket az borçludur; ROE, ROA'nın çok üzerindeyse kârlılık finansal kaldıraçla büyütülmüştür ve faiz yükü ile finansal risk de genellikle daha yüksektir."],
    ["Borç/özkaynak oranı ROE'yi nasıl etkiler?", "Borç arttıkça aynı kâr daha küçük bir özkaynağa bölündüğü için ROE yükselir; buna kaldıraç etkisi denir. Ancak borcun faiz maliyeti varlıkların getirisini aşarsa kaldıraç ters çalışır ve ROE düşer, iflas riski artar."],
    ["Bankalarda ROE neden ayrıca izlenir?", "Bankalar mevduat gibi yabancı kaynaklarla çalıştığı için özkaynakları aktiflerinin küçük bir kısmıdır. Bu yüzden ROA düşük, ROE yüksek çıkar. Bankalarda ROE, sermaye yeterliliği ve aktif kalitesi göstergeleriyle birlikte değerlendirilir."],
    ["DuPont analizi nedir?", "DuPont analizi ROE'yi net kâr marjı, aktif devir hızı ve özkaynak çarpanının çarpımı olarak üçe ayırır. Böylece kârlılığın satış marjından mı, varlık verimliliğinden mi yoksa borçtan mı kaynaklandığı görülebilir."],
    ["ROE negatif çıkarsa ne anlama gelir?", "Net kâr negatifse yani şirket zarar etmişse ROE de negatif çıkar ve ortakların sermayesinin o dönemde eridiğini gösterir. Özkaynağın kendisi negatifse oran matematiksel olarak hesaplansa bile yorumlanamaz hale gelir."]
  ],
  tools: ["ozkaynak-karliligi-hesapla", "aktif-karlilik-hesapla", "borc-ozkaynak-orani-hesapla"],
  related: ["fk-orani-nedir", "favok-nedir-nasil-hesaplanir", "reel-faiz-nedir-nasil-hesaplanir"],
  sources: [
    ["Kamuyu Aydınlatma Platformu – finansal raporlar", "https://www.kap.org.tr/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, oranlar kavramsal olarak açıklanmıştır"
};
