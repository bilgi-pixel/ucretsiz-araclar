export default {
  slug: "cari-oran-ve-likidite-oranlari",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Cari Oran Nedir? Likidite Oranları, Nakit Döngüsü ve Alacak Devir Hızı",
  pageTitle: "Cari Oran Nedir, Kaç Olmalı? Likidite Oranları ve Nakit Döngüsü",
  description: "Cari oran = dönen varlıklar ÷ kısa vadeli borçlar. Asit-test ve nakit oranı, ideal değerler, alacak devir hızı, tahsil ve nakit dönüşüm süresi örnekli.",
  keywords: ["cari oran nedir", "cari oran kaç olmalı", "likidite oranları", "asit test oranı", "nakit oranı", "nakit dönüşüm süresi", "alacak devir hızı", "ortalama tahsil süresi"],
  lead: "Cari oran, bir işletmenin <strong>dönen varlıklarının kısa vadeli yabancı kaynaklarına bölünmesiyle</strong> bulunur ve bir yıl içinde vadesi gelecek borçların, bir yıl içinde nakde dönüşecek varlıklarla kaç kez karşılanabildiğini gösterir. Dönen varlıkları 1,5 milyon TL, kısa vadeli borçları 1 milyon TL olan işletmenin cari oranı 1,5'tir. Geleneksel olarak 1,5–2 arası güvenli kabul edilse de doğru değer sektöre ve işletmenin nakit döngüsüne göre değişir. Aşağıda asit-test ve nakit oranını, alacak devir hızını ve nakit dönüşüm süresini aynı bilanço üzerinde adım adım hesaplıyoruz.",
  kisaCevap: [
    "Cari oran = dönen varlıklar ÷ kısa vadeli yabancı kaynaklar; geleneksel ölçü 1,5–2 civarıdır.",
    "Asit-test (likidite) oranı = (dönen varlıklar − stoklar) ÷ kısa vadeli borçlar; genellikle 1 civarı aranır.",
    "Nakit oranı = (hazır değerler + menkul kıymetler) ÷ kısa vadeli borçlar; 0,2 ve üzeri çoğu zaman yeterli sayılır.",
    "Alacak devir hızı = kredili satışlar ÷ ortalama ticari alacaklar; ortalama tahsil süresi = 365 ÷ devir hızı.",
    "Nakit dönüşüm süresi = stok süresi + tahsil süresi − borç ödeme süresi (gün).",
    "Oranlar sektörden sektöre çok değişir; tek bir yılın değeri yerine eğilime ve sektör ortalamasına bakın."
  ],
  figure: {
    alt: "Örnek bilançoda dönen varlıkların bileşenleri ve üç likidite oranı: cari oran 1,50, asit-test oranı 0,90, nakit oranı 0,25; altında nakit dönüşüm süresinin stok süresi 73 gün artı tahsil süresi 46 gün eksi borç süresi 49 gün eşittir yaklaşık 70 gün olarak zaman çizelgesi.",
    caption: "Üst kısımda aynı bilançodan hesaplanan üç likidite oranı, payda giderek daralan bir varlık grubuyla görülüyor. Alt kısımda nakit dönüşüm süresi: işletme malı aldığı günden satış bedelini tahsil ettiği güne kadar geçen sürenin, tedarikçiye ödeme vadesiyle finanse edilmeyen kısmı.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Örnek bilanço: kısa vadeli borçlar 1.000.000 TL</text>
  <g class="sm">
    <rect x="20" y="48" width="56" height="44" class="p"/><text x="48" y="74" class="mid sf b">Nakit</text>
    <rect x="76" y="48" width="14" height="44" class="a"/>
    <rect x="90" y="48" width="154" height="44" class="ps"/><text x="167" y="74" class="mid">Ticari alacak 550 bin</text>
    <rect x="244" y="48" width="168" height="44" class="oks"/><text x="328" y="74" class="mid">Stok 600 bin</text>
    <rect x="412" y="48" width="28" height="44" class="sf sb"/>
    <text x="450" y="66">Dönen varlıklar</text><text x="450" y="84" class="b">1.500.000 TL</text>
    <text x="20" y="110" class="mu">Nakit 200 bin · menkul kıymet 50 bin · peşin giderler 100 bin</text>
  </g>
  <g class="mid">
    <rect x="20" y="126" width="220" height="80" rx="8" class="sf sb"/>
    <text x="130" y="150" class="sm">Cari oran</text><text x="130" y="178" class="xl">1,50</text>
    <text x="130" y="198" class="sm mu">1.500 ÷ 1.000</text>
    <rect x="250" y="126" width="220" height="80" rx="8" class="ps"/>
    <text x="360" y="150" class="sm">Asit-test oranı</text><text x="360" y="178" class="xl">0,90</text>
    <text x="360" y="198" class="sm">(1.500 − 600) ÷ 1.000</text>
    <rect x="480" y="126" width="220" height="80" rx="8" class="p"/>
    <text x="590" y="150" class="sm sf">Nakit oranı</text><text x="590" y="178" class="xl sf">0,25</text>
    <text x="590" y="198" class="sm sf">(200 + 50) ÷ 1.000</text>
  </g>
  <line x1="20" y1="226" x2="700" y2="226" class="sb dash" fill="none"/>
  <text x="360" y="254" class="b mid">Nakit dönüşüm süresi (gün)</text>
  <g class="sm">
    <rect x="40" y="272" width="292" height="34" rx="4" class="oks"/><text x="186" y="294" class="mid b">Stok süresi 73 gün</text>
    <rect x="332" y="272" width="184" height="34" rx="4" class="ps"/><text x="424" y="294" class="mid b">Tahsil 46 gün</text>
    <rect x="40" y="316" width="196" height="34" rx="4" class="dgs"/><text x="138" y="338" class="mid b">Borç ödeme 49 gün</text>
    <rect x="236" y="316" width="280" height="34" rx="4" class="p"/><text x="376" y="338" class="mid b sf">Nakit dönüşüm ≈ 70 gün</text>
    <text x="40" y="370">Mal alındı</text><text x="236" y="370" class="mid">Tedarikçiye ödendi</text><text x="516" y="370" class="end">Müşteriden tahsil edildi</text>
  </g>
  <rect x="40" y="386" width="660" height="40" rx="8" class="sf sb"/>
  <text x="370" y="411" class="sm mid">73 + 46 − 49 ≈ 70 gün: bu süre işletmenin kendi kaynağıyla finanse edilir.</text>
</svg>`
  },
  sections: [
    {
      h: "Likidite nedir, neden önemlidir?",
      p: [
        "<strong>Likidite</strong>, bir işletmenin kısa vadeli yükümlülüklerini zamanında ve zarar etmeden ödeyebilme gücüdür. Kârlı bir işletme bile elinde yeterli nakit yoksa maaşları, vergiyi, kirayı ya da tedarikçi ödemelerini aksatabilir. Bu yüzden kârlılık ile likidite ayrı ayrı izlenir: biri işin ne kadar kazandırdığını, diğeri faturaların ödenip ödenemeyeceğini anlatır.",
        "Likidite oranları bilançodaki dönen varlıkları (bir yıl içinde nakde dönmesi beklenen varlıklar) kısa vadeli yabancı kaynaklarla (bir yıl içinde ödenecek borçlar) karşılaştırır. Bankalar kredi değerlendirmesinde, tedarikçiler vadeli satış kararında, yatırımcılar ise şirket analizinde bu oranlara bakar. İşletme sahibi için de nakit sıkışıklığını önceden görmenin en pratik yoludur."
      ]
    },
    {
      h: "Cari oran nedir, nasıl hesaplanır?",
      p: [
        "Cari oran, likidite oranlarının en genelidir. Dönen varlıkların tamamını kısa vadeli borçlarla karşılaştırır. Türkiye'deki Tekdüzen Hesap Planı'nda dönen varlıklar 1 ile başlayan hesap grubunda, kısa vadeli yabancı kaynaklar 3 ile başlayan grupta yer alır; bu yüzden bilançonun ilgili toplamlarını okumak yeterlidir."
      ],
      formula: "Cari oran = Dönen varlıklar ÷ Kısa vadeli yabancı kaynaklar\nNet işletme sermayesi = Dönen varlıklar − Kısa vadeli yabancı kaynaklar",
      ol: [
        "Bilançodan dönen varlıklar toplamını alın: örnekte 1.500.000 TL (hazır değerler 200.000, menkul kıymetler 50.000, ticari alacaklar 550.000, stoklar 600.000, peşin ödenmiş giderler 100.000).",
        "Kısa vadeli yabancı kaynakları alın: örnekte 1.000.000 TL.",
        "Bölün: 1.500.000 ÷ 1.000.000 = 1,50.",
        "Net işletme sermayesini bulun: 1.500.000 − 1.000.000 = 500.000 TL.",
        "Yorum: Kısa vadeli her 1 TL borca karşılık 1,5 TL dönen varlık vardır; ancak bu varlıkların bir kısmı stok olduğu için hemen nakde dönmeyebilir."
      ],
      after: [
        "Bu hesabı ve aşağıdaki asit-test ile nakit oranını tek ekranda görmek için [[arac:cari-oran-hesapla|cari oran hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Asit-test ve nakit oranı: cari orandan farkı",
      p: [
        "Cari oranın zayıf yanı, bütün dönen varlıkları eşit derecede likit saymasıdır. Oysa stokların satılması ve satış bedelinin tahsil edilmesi zaman alır; peşin ödenmiş giderler ise hiç nakde dönmez. Bu yüzden daha temkinli iki oran kullanılır."
      ],
      table: {
        head: ["Oran", "Formül", "Örnekte", "Yaygın ölçü"],
        rows: [
          ["Cari oran", "Dönen varlıklar ÷ KVYK", "1.500 ÷ 1.000 = 1,50", "1,5–2"],
          ["Asit-test (likidite) oranı", "(Dönen varlıklar − stoklar) ÷ KVYK", "900 ÷ 1.000 = 0,90", "≈ 1"],
          ["Temkinli asit-test", "(Dönen − stoklar − peşin ödenmiş giderler) ÷ KVYK", "800 ÷ 1.000 = 0,80", "≈ 1"],
          ["Nakit oranı", "(Hazır değerler + menkul kıymetler) ÷ KVYK", "250 ÷ 1.000 = 0,25", "≥ 0,2"]
        ],
        caption: "KVYK: kısa vadeli yabancı kaynaklar. Tutarlar bin TL'dir. Yaygın ölçüler geleneksel kabullerdir; sektöre göre büyük farklılık gösterir."
      },
      after: [
        "Örnek işletmenin cari oranı rahat görünse de asit-test oranı 1'in altındadır: stoklar satılamazsa kısa vadeli borçların ancak %90'ı karşılanabilir. Bu, stok devir hızının ne kadar önemli olduğunu gösterir; stokların ne sıklıkla satışa dönüştüğünü [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı nasıl hesaplanır]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "İdeal cari oran kaç olmalı?",
      p: [
        "Ders kitaplarında sık geçen \"cari oran 2, asit-test oranı 1 olmalı\" kuralı, sanayi işletmeleri için geliştirilmiş geleneksel bir ölçüdür. Gerçekte ideal değer işletmenin faaliyet biçimine bağlıdır. Peşin satış yapan ve stoğu hızla dönen perakende işletmeleri ya da market zincirleri 1'in altında cari oranla sorunsuz çalışabilir; çünkü tahsilat neredeyse anında, tedarikçi ödemesi ise vadelidir. Uzun üretim süreli, vadeli satış yapan bir makine üreticisi ise 2'nin üzerinde cari orana ihtiyaç duyabilir.",
        "Çok yüksek bir cari oran da her zaman iyi değildir. 3–4 gibi değerler, gereğinden fazla stok tutulduğuna, alacakların geç tahsil edildiğine ya da nakdin verimsiz biçimde kasada bekletildiğine işaret edebilir. Bu yüzden oranları tek başına değil; geçmiş yıllarla, aynı sektördeki işletmelerle ve kârlılık oranlarıyla birlikte değerlendirmek gerekir. Kârlılık tarafı için [[bilgi:roe-roa-nedir-nasil-hesaplanir|ROE ve ROA nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Alacak devir hızı ve ortalama tahsil süresi nasıl hesaplanır?",
      p: [
        "Ticari alacaklar, dönen varlıkların büyük kısmını oluşturur ve tahsil edilmedikçe likiditeye katkı vermez. <strong>Alacak devir hızı</strong>, yıllık kredili (vadeli) satışların ortalama ticari alacak bakiyesine oranıdır ve alacakların yılda kaç kez nakde döndüğünü gösterir. <strong>Ortalama tahsil süresi</strong> ise bir satışın bedelinin ortalama kaç günde tahsil edildiğini anlatır."
      ],
      formula: "Ortalama ticari alacak = (dönem başı alacak + dönem sonu alacak) ÷ 2\nAlacak devir hızı = Net kredili satışlar ÷ Ortalama ticari alacak\nOrtalama tahsil süresi (gün) = 365 ÷ Alacak devir hızı",
      ol: [
        "Örnek: yıllık kredili satışlar 4.400.000 TL; dönem başı ticari alacak 500.000 TL, dönem sonu 600.000 TL.",
        "Ortalama alacak: (500.000 + 600.000) ÷ 2 = 550.000 TL.",
        "Devir hızı: 4.400.000 ÷ 550.000 = 8. Alacaklar yılda 8 kez nakde dönüyor.",
        "Tahsil süresi: 365 ÷ 8 ≈ 45,6 gün.",
        "Yorum: Müşterilere 30 gün vade veriliyorsa ortalama 46 günlük tahsil, ödemelerin sistematik olarak geciktiğine işaret eder."
      ],
      after: [
        "Kredili satış tutarı ayrıca bilinmiyorsa toplam net satışlar kullanılabilir; ancak peşin satışların payı yüksekse devir hızı olduğundan iyi görünür. Bu hesabı [[arac:alacak-devir-hizi-hesapla|alacak devir hızı hesaplama]] aracıyla yapabilirsiniz. Alacakların çek ve senetle tahsil edildiği durumda erken nakde çevirmenin maliyeti [[bilgi:cek-senet-iskonto-nedir|çek senet iskontosu]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Nakit dönüşüm süresi nedir?",
      p: [
        "<strong>Nakit dönüşüm süresi</strong> (nakit döngüsü), işletmenin tedarikçisine ödeme yaptığı günden müşterisinden tahsilat yaptığı güne kadar geçen ortalama gün sayısıdır. Bu süre boyunca işletme, faaliyetini kendi parasıyla ya da krediyle finanse etmek zorundadır. Süre ne kadar kısaysa işletmenin işletme sermayesi ihtiyacı o kadar azdır; bazı perakende işletmelerinde süre negatif bile olabilir, yani tedarikçiye ödeme müşteriden tahsilattan sonra yapılır."
      ],
      formula: "Stok süresi (gün) = Ortalama stok ÷ Satılan malın maliyeti × 365\nBorç ödeme süresi (gün) = Ortalama ticari borç ÷ Satılan malın maliyeti × 365\nFaaliyet döngüsü = Stok süresi + Tahsil süresi\nNakit dönüşüm süresi = Stok süresi + Tahsil süresi − Borç ödeme süresi",
      ol: [
        "Örnek: satılan malın maliyeti 3.000.000 TL, ortalama stok 600.000 TL, ortalama ticari borç 400.000 TL; tahsil süresi bir önceki bölümden 45,6 gün.",
        "Stok süresi: 600.000 ÷ 3.000.000 × 365 = 73 gün.",
        "Borç ödeme süresi: 400.000 ÷ 3.000.000 × 365 ≈ 48,7 gün.",
        "Faaliyet döngüsü: 73 + 45,6 ≈ 118,6 gün.",
        "Nakit dönüşüm süresi: 73 + 45,6 − 48,7 ≈ 70 gün. İşletme her satış döngüsünde yaklaşık 70 günü kendi kaynağıyla finanse ediyor."
      ],
      after: [
        "Nakit dönüşüm süresini kısaltmanın üç yolu vardır: stokları daha hızlı eritmek, tahsilatı hızlandırmak ve tedarikçilerle daha uzun vade konuşmak. Bu kalemleri girerek süreyi [[arac:nakit-donusum-suresi-hesapla|nakit dönüşüm süresi hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Bankalar kredi verirken hangi oranlara bakar?",
      p: [
        "Bankalar kredi değerlendirmesinde tek bir orana değil, finansal tabloların bütününe ve işletmenin geçmiş ödeme davranışına bakar. Likidite tarafında cari oran ve asit-test oranı, işletmenin kısa vadeli borçlarını ödeyip ödeyemeyeceğinin ilk göstergesidir. Bunun yanında borçluluk oranları (toplam borç ÷ özkaynak gibi), faiz karşılama oranı, faaliyet kârlılığı ve nakit akışı da incelenir.",
        "Faaliyet kârlılığının borç ödeme kapasitesiyle ilişkisi için kullanılan temel göstergelerden biri FAVÖK'tür; ayrıntılar [[bilgi:favok-nedir-nasil-hesaplanir|FAVÖK nedir]] yazısında. Banka kredi kararları ve kullanılan eşikler kurumdan kuruma değişir; buradaki bilgiler genel bir çerçeve sunar ve kredi danışmanlığı yerine geçmez."
      ]
    },
    {
      h: "Bilançodan likidite analizi nasıl yapılır? Sık yapılan hatalar",
      p: [
        "Sağlıklı bir analiz için en az iki üç yıllık bilançoyu yan yana koyup oranların nasıl değiştiğine bakın. Cari oran düşerken stok süresi uzuyorsa işletme satamadığı malı finanse ediyordur; tahsil süresi uzuyorsa müşteriler ödemeyi geciktiriyordur. Oranları mutlaka mali müşavirinizin hazırladığı dönem sonu bilançosuyla hesaplayın; ara dönem tahminleri yanıltıcı olabilir."
      ],
      ul: [
        "<strong>Tek bir orana güvenmek:</strong> Yüksek cari oran, satılamayan stoklardan kaynaklanıyor olabilir. Asit-test ve nakit oranına da bakın.",
        "<strong>Dönem sonu bakiyesini kullanmak:</strong> Mevsimsel işletmelerde yıl sonu bakiyesi yıl ortalamasından çok farklıdır; devir hızlarında ortalama bakiye kullanın.",
        "<strong>Sektörü göz ardı etmek:</strong> Market ile makine üreticisinin oranlarını aynı ölçüyle değerlendirmek yanlış sonuç verir.",
        "<strong>Tahsili şüpheli alacakları saymak:</strong> Tahsil edilemeyeceği belli olan alacaklar dönen varlıkları şişirir.",
        "<strong>Gün sayısını karıştırmak:</strong> Bazı kaynaklar 360, bazıları 365 gün kullanır; karşılaştırma yaparken aynı tabanı kullanın."
      ]
    }
  ],
  faq: [
    ["Cari oran nedir, nasıl hesaplanır?", "Cari oran, dönen varlıkların kısa vadeli yabancı kaynaklara bölünmesiyle bulunur ve kısa vadeli borçların dönen varlıklarla kaç kez karşılanabildiğini gösterir. Dönen varlıkları 1,5 milyon TL, kısa vadeli borçları 1 milyon TL olan işletmenin cari oranı 1,5'tir."],
    ["İdeal cari oran kaç olmalı?", "Geleneksel ölçü 1,5 ile 2 arasıdır, ancak ideal değer sektöre göre değişir. Peşin satış yapan ve stoğu hızlı dönen işletmeler 1'in altında çalışabilirken uzun üretim süreli ve vadeli satış yapan işletmeler daha yüksek orana ihtiyaç duyar; çok yüksek oran da atıl varlık işareti olabilir."],
    ["Asit-test oranı ile cari oran farkı nedir?", "Asit-test oranı, dönen varlıklardan stokları çıkararak hesaplanır ve kısa vadeli borçların stoklar satılmadan karşılanıp karşılanamayacağını gösterir. Cari oran tüm dönen varlıkları kullandığı için daha iyimser, asit-test oranı daha temkinlidir; genellikle 1 civarı aranır."],
    ["Nakit dönüşüm süresi nedir?", "Nakit dönüşüm süresi, işletmenin tedarikçisine ödeme yaptığı günden müşterisinden tahsilat yaptığı güne kadar geçen ortalama gün sayısıdır. Stok süresi ile tahsil süresinin toplamından borç ödeme süresi çıkarılarak bulunur; kısa olması daha az finansman ihtiyacı demektir."],
    ["Alacak devir hızı nasıl hesaplanır?", "Alacak devir hızı, yıllık net kredili satışların ortalama ticari alacak bakiyesine bölünmesiyle bulunur. Ortalama alacak, dönem başı ve dönem sonu bakiyelerinin ortalamasıdır. 4,4 milyon TL kredili satış ve 550 bin TL ortalama alacakla devir hızı 8'dir."],
    ["Ortalama tahsil süresi nasıl bulunur?", "Ortalama tahsil süresi 365'in alacak devir hızına bölünmesiyle bulunur. Alacak devir hızı 8 olan bir işletmede satış bedelleri ortalama yaklaşık 46 günde tahsil edilir. Verilen vadeden uzun bir süre, ödemelerin geciktiğini gösterir."],
    ["Bankalar kredi verirken hangi oranlara bakar?", "Bankalar likidite için cari oran ve asit-test oranına, borç yükü için borç–özkaynak oranlarına, ödeme gücü için faiz karşılama ve faaliyet kârlılığına bakar; nakit akışını ve geçmiş ödeme davranışını da inceler. Eşikler bankaya ve sektöre göre değişir."],
    ["Bilançodan likidite analizi nasıl yapılır?", "Dönen varlıklar ve kısa vadeli borç toplamlarından cari, asit-test ve nakit oranları hesaplanır; gelir tablosuyla birlikte stok, alacak ve borç süreleri bulunur. Oranlar en az iki üç yıl boyunca karşılaştırılır ve sektör ortalamasıyla değerlendirilir."],
    ["Nakit oranı nedir?", "Nakit oranı, hazır değerler ile menkul kıymetlerin toplamının kısa vadeli borçlara bölünmesiyle bulunan en temkinli likidite oranıdır. İşletmenin hiçbir tahsilat ve satış yapmadan borçlarının ne kadarını hemen ödeyebileceğini gösterir; 0,2 ve üzeri çoğu zaman yeterli sayılır."]
  ],
  tools: ["cari-oran-hesapla", "nakit-donusum-suresi-hesapla", "alacak-devir-hizi-hesapla"],
  related: ["stok-devir-hizi-nasil-hesaplanir", "roe-roa-nedir-nasil-hesaplanir", "favok-nedir-nasil-hesaplanir", "fk-orani-nedir", "cek-senet-iskonto-nedir"],
  uyari: "yatırım veya kredi danışmanlığı değildir; işletmenize özgü değerlendirme için mali müşavirinize danışın",
  sources: [
    ["Kamu Gözetimi Muhasebe ve Denetim Standartları Kurumu (KGK)", "https://www.kgk.gov.tr/"],
    ["Gelir İdaresi Başkanlığı – Muhasebe Sistemi Uygulama Genel Tebliğleri", "https://www.gib.gov.tr/"]
  ]
};
