export default {
  slug: "alacak-devir-hizi-nedir-tahsil-suresi",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Alacak Devir Hızı Nedir? Ortalama Tahsil Süresi Nasıl Hesaplanır?",
  pageTitle: "Alacak Devir Hızı ve Ortalama Tahsil Süresi Nasıl Hesaplanır?",
  description: "Alacak devir hızı = kredili net satışlar ÷ ortalama ticari alacak; tahsil süresi = 365 ÷ devir hızı. KDV tutarlılığı, vade politikası, nakit dönüşüm süresi ve örnek.",
  keywords: ["alacak devir hızı", "ortalama tahsil süresi", "alacak tahsil süresi", "dso nedir", "alacak devir hızı formülü", "vadeli satış tahsilat", "nakit dönüşüm süresi", "tahsilat süresini kısaltma"],
  lead: "Alacak devir hızı, bir işletmenin ticari alacaklarını bir dönem içinde kaç kez tahsil edip yeniden oluşturduğunu gösterir ve <strong>kredili net satışların ortalama ticari alacaklara bölünmesiyle</strong> bulunur. Bu sayıyı dönemin gün sayısına bölmek <strong>ortalama tahsil süresini</strong> verir. Yıllık 7,2 milyon TL vadeli satışı ve ortalama 1,2 milyon TL alacağı olan bir işletmede devir hızı 6, tahsil süresi yaklaşık 61 gündür. Bu sayfada formülü, KDV kaynaklı sık hatayı, sonucun vade politikasıyla nasıl karşılaştırılacağını ve süreyi kısaltmanın yollarını anlatıyoruz.",
  kisaCevap: [
    "Alacak devir hızı = kredili (vadeli) net satışlar ÷ ortalama ticari alacak.",
    "Ortalama ticari alacak = (dönem başı alacak + dönem sonu alacak) ÷ 2.",
    "Ortalama tahsil süresi (gün) = dönem gün sayısı ÷ alacak devir hızı; yıllık hesapta 365 kullanılır.",
    "Satış ile alacak aynı KDV esasında olmalıdır; alacaklar KDV dahil tutulduğu için satış da KDV dahil alınır.",
    "Tahsil süresini tanıdığınız vadeyle karşılaştırın: 45 gün vadeye karşı 61 günlük tahsil, ortalama 16 gün gecikme demektir.",
    "Nakit dönüşüm süresi = stokta kalma süresi + tahsil süresi − borç ödeme süresi."
  ],
  figure: {
    alt: "Alacak devir hızı hesap kartı: 7,2 milyon TL vadeli satış, 1 milyon ve 1,4 milyon TL dönem başı ve sonu alacak, ortalama 1,2 milyon, devir hızı 6, tahsil süresi 60,8 gün; 45 günlük vadeyle karşılaştırma çubuğu.",
    caption: "Örnek işletmede alacaklar yılda 6 kez döner ve ortalama 60,8 günde tahsil edilir. Tanınan vade 45 gün olduğu için müşteriler ortalama yaklaşık 16 gün geç ödüyor; bu gecikme yaklaşık 312 bin TL'lik nakdi alacakta bağlı tutuyor.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Alacak devir hızı örneği</text>
  <rect x="20" y="52" width="210" height="80" rx="10" class="sf sb"/>
  <text x="125" y="80" class="sm mid">Vadeli satış (KDV dahil)</text>
  <text x="125" y="114" class="lg b mid">7.200.000 TL</text>
  <rect x="255" y="52" width="210" height="80" rx="10" class="sf sb"/>
  <text x="360" y="80" class="sm mid">Ortalama alacak</text>
  <text x="360" y="104" class="sm mid t2">(1,0 mn + 1,4 mn) ÷ 2</text>
  <text x="360" y="124" class="b mid">1.200.000 TL</text>
  <rect x="490" y="52" width="210" height="80" rx="10" class="p"/>
  <text x="595" y="80" class="sm mid sf">Devir hızı · Tahsil süresi</text>
  <text x="595" y="114" class="lg b mid sf">6 kez · 60,8 gün</text>
  <text x="20" y="180" class="b">Tanınan vade ile gerçekleşen tahsil</text>
  <text x="20" y="222" class="sm b">Vade</text>
  <rect x="110" y="204" width="444" height="28" rx="4" class="oks"/>
  <text x="564" y="223" class="sm b">45 gün</text>
  <text x="20" y="266" class="sm b">Tahsil</text>
  <rect x="110" y="248" width="444" height="28" rx="4" class="ps"/>
  <rect x="554" y="248" width="156" height="28" rx="4" class="dgs"/>
  <text x="632" y="267" class="sm mid b dg">+15,8 gün</text>
  <rect x="20" y="300" width="680" height="84" rx="10" class="sf sb"/>
  <rect x="20" y="300" width="8" height="84" class="p"/>
  <text x="44" y="326" class="sm">Günlük vadeli satış: 7.200.000 ÷ 365 ≈ 19.726 TL</text>
  <text x="44" y="350" class="sm">15,8 gün × 19.726 TL ≈ 312.000 TL alacakta bekliyor</text>
  <text x="44" y="372" class="sm b p">Tahsil 45 güne inerse bu nakit kasaya döner</text>
</svg>`
  },
  sections: [
    {
      h: "Alacak devir hızı nedir?",
      p: [
        "Vadeli satış yapan her işletme, malı ya da hizmeti teslim ettiği an ile parayı tahsil ettiği an arasında müşterisine fiilen kredi açmış olur. Bilançodaki ticari alacaklar bu kredinin toplamıdır. Alacak devir hızı, bu alacak stokunun bir dönem içinde kaç kez tahsil edilip yerine yenisinin geldiğini, yani alacakların ne kadar hızlı nakde döndüğünü ölçer.",
        "Devir hızı yükseldikçe alacaklar daha çabuk tahsil ediliyor demektir; düştükçe para müşterilerde daha uzun süre bekliyordur. Kâğıt üzerinde kârlı olan pek çok işletme, alacaklarını zamanında tahsil edemediği için maaş, kira ve tedarikçi ödemelerinde zorlanır. Bu yüzden alacak devir hızı, kârlılık oranları kadar önemli bir sağlık göstergesidir."
      ]
    },
    {
      h: "Alacak devir hızı formülü nasıl uygulanır?",
      formula: "Ortalama ticari alacak = (dönem başı alacak + dönem sonu alacak) ÷ 2\nAlacak devir hızı = kredili net satışlar ÷ ortalama ticari alacak\nOrtalama tahsil süresi (gün) = dönem gün sayısı ÷ alacak devir hızı\nKısa yol: tahsil süresi = ortalama alacak ÷ kredili satış × gün sayısı",
      ol: [
        "Dönemi belirleyin: yıllık hesapta 365 gün, çeyreklik hesapta 90 ya da 91 gün kullanın.",
        "Kredili (vadeli) net satışları bulun: toplam satıştan peşin satışları, iadeleri ve iskontoları çıkarın.",
        "Dönem başı ve dönem sonu ticari alacak bakiyelerini alın: alıcılar, alacak senetleri ve vadeli çekler dahil; şüpheli alacaklar ayrı tutulur.",
        "Ortalama alacağı hesaplayın ve satışı bu ortalamaya bölün.",
        "Gün sayısını devir hızına bölerek tahsil süresini bulun."
      ],
      after: [
        "Örnek: yıllık KDV dahil vadeli satış 7.200.000 TL, dönem başı alacak 1.000.000 TL, dönem sonu alacak 1.400.000 TL. Ortalama alacak 1.200.000 TL, devir hızı 7.200.000 ÷ 1.200.000 = 6, tahsil süresi 365 ÷ 6 = 60,8 gündür. Aynı hesabı [[arac:alacak-devir-hizi-hesapla|Alacak Devir Hızı Hesaplama]] aracında dönem başı bakiyesini girerek ya da boş bırakarak yapabilirsiniz."
      ]
    },
    {
      h: "KDV ve peşin satış: hesabı bozan iki ayrıntı",
      p: [
        "Gelir tablosundaki satışlar KDV hariçtir, ama müşteriden alacağınız tutar faturadaki KDV dahil toplamdır; bu yüzden bilançodaki ticari alacaklar KDV'yi içerir. KDV hariç satışı KDV dahil alacağa bölmek, devir hızını olduğundan düşük, tahsil süresini olduğundan uzun gösterir."
      ],
      table: {
        head: ["Hesap", "Satış", "Ortalama alacak", "Devir hızı", "Tahsil süresi"],
        rows: [
          ["Yanlış: KDV hariç satış", "6.000.000", "1.200.000 (KDV dahil)", "5,0", "73,0 gün"],
          ["Doğru: KDV dahil satış (%20)", "7.200.000", "1.200.000 (KDV dahil)", "6,0", "60,8 gün"]
        ],
        caption: "Aynı işletme için yalnızca KDV tutarsızlığı 12 günlük fark yaratır. Farklı KDV oranlı satışlarınız varsa satışları gerçek KDV tutarlarıyla toplayın."
      },
      after: [
        "İkinci ayrıntı peşin satışlardır. Kasadan ya da kartla tahsil edilen satışlar alacak oluşturmaz; bunları formüle dahil etmek devir hızını şişirir ve tahsil süresini olduğundan kısa gösterir. Peşin ve vadeli satışı ayıramıyorsanız toplam satışı kullanın ama sonucu \"iyimser bir tahmin\" olarak yorumlayın."
      ]
    },
    {
      h: "Ortalama tahsil süresi kaç gün olmalı?",
      p: [
        "Evrensel bir \"doğru gün sayısı\" yoktur; doğru karşılaştırma ölçütü, işletmenin müşterilerine tanıdığı vadedir. 30 gün vadeyle çalışan bir işletmenin tahsil süresi 35 gün ise müşteriler büyük ölçüde zamanında ödüyordur; 60 gün ise ciddi bir tahsilat sorunu vardır. Genel bir kural olarak tahsil süresinin vade süresini %10–20'den fazla aşmaması hedeflenir."
      ],
      formula: "Ortalama gecikme (gün) = ortalama tahsil süresi − ortalama vade\nGecikmede bağlı nakit ≈ günlük vadeli satış × ortalama gecikme\nÖrnek: 60,8 − 45 = 15,8 gün · 7.200.000 ÷ 365 × 15,8 ≈ 312.000 TL",
      after: [
        "Birden çok müşteriye farklı vadeler tanıyorsanız karşılaştırma için tutar ağırlıklı ortalama vadeyi kullanın. Bunu [[arac:ortalama-vade-hesapla|Ortalama Vade Hesaplama]] aracıyla bulabilir, yöntemin ayrıntısını [[bilgi:ortalama-vade-nasil-hesaplanir|ortalama vade nasıl hesaplanır]] yazısında okuyabilirsiniz."
      ]
    },
    {
      h: "Alacak devir hızı düşükse ne anlama gelir?",
      ul: [
        "<strong>Müşteriler geç ödüyor:</strong> Tahsilat takibi zayıf olabilir ya da birkaç büyük müşteri ödemeyi sistematik olarak geciktiriyor olabilir.",
        "<strong>Vadeler uzatılmış:</strong> Satış ekibi rekabet için vade uzatmış ve bu, nakit planına yansıtılmamış olabilir.",
        "<strong>Şüpheli alacak birikiyor:</strong> Tahsili zor alacaklar ortalamayı yukarı çeker; yaşlandırma tablosuyla ayrıca incelenmelidir.",
        "<strong>Dönem sonu etkisi:</strong> Yıl sonunda yapılan büyük bir vadeli satış, dönem sonu bakiyesini geçici olarak şişirip oranı bozabilir.",
        "<strong>Mevsimsellik:</strong> Satışları belli aylarda yoğunlaşan işletmelerde iki bakiyenin ortalaması gerçeği yansıtmayabilir; aylık bakiyelerin ortalaması daha doğrudur."
      ],
      after: [
        "Tek bir orana bakarak karar vermek yerine alacakları vadesine göre gruplayan bir yaşlandırma tablosu (0–30, 31–60, 61–90, 90+ gün) hazırlamak sorunun nerede olduğunu gösterir. Cari hesap takibinin temel mantığı [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe ve cari hesap takibi]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Vade politikası tahsil süresini nasıl etkiler?",
      p: [
        "Tahsil süresinin taban değeri, tanıdığınız vadedir: 60 gün vade veren bir işletme, müşterilerinin tamamı zamanında ödese bile 60 günün altına inemez. Bu yüzden vadeyi uzatmak satışları artırabilir, ama her uzatma işletmenin müşterilerine finansman sağlamak için kendi kaynağını ya da banka kredisini kullanması anlamına gelir.",
        "Vade kararını verirken iki maliyeti karşılaştırmak gerekir: vadeyle kazanılacak ek satışın kârı ve uzayan alacağın finansman maliyeti. Uzun vadeye fiyat farkı yansıtılıyorsa bunun faturalanması ayrı kurallara tabidir ve vade farkı faturasıyla yapılır. Fatura tarihinden vade gününü bulmak için [[arac:vade-tarihi-hesapla|Vade Tarihi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Nakit dönüşüm süresi ile ilişkisi nedir?",
      p: [
        "Ortalama tahsil süresi, nakit dönüşüm süresinin üç bileşeninden biridir. Nakit dönüşüm süresi, tedarikçiye yapılan ödemeden müşteriden tahsilata kadar paranın işletmenin içinde kaç gün bağlı kaldığını gösterir."
      ],
      formula: "Faaliyet döngüsü = stokta kalma süresi + ortalama tahsil süresi\nNakit dönüşüm süresi = faaliyet döngüsü − borç ödeme süresi\nÖrnek: 50 + 60,8 − 40 = 70,8 gün",
      after: [
        "Örnekteki işletme malını ortalama 50 günde satıyor, parasını 60,8 günde tahsil ediyor ve tedarikçisine 40 günde ödüyor. Yani tedarikçiye ödeme yaptıktan sonra yaklaşık 71 gün boyunca kendi parasıyla müşterisini finanse ediyor. Tahsil süresini 45 güne indirmek nakit dönüşüm süresini 55 güne düşürür. Bu hesabı [[arac:nakit-donusum-suresi-hesapla|Nakit Dönüşüm Süresi Hesaplama]] aracıyla yapabilir, kâr eden işletmenin neden nakitsiz kalabildiğini [[bilgi:nakit-akis-tablosu-nasil-yapilir|nakit akış tablosu]] yazısında görebilirsiniz."
      ]
    },
    {
      h: "Sektörlere göre beklenen tahsil süreleri farklı mı?",
      p: [
        "Evet, belirgin biçimde farklıdır. Perakende, restoran ve kafeler gibi satışın büyük kısmının peşin ya da kartla yapıldığı işlerde tahsil süresi birkaç gündür; kart tahsilatlarının hesaba geçme süresi belirleyici olur. Toptan ticaret, üretim ve inşaat gibi işletmeler arası satışlarda ise vadeli satış yaygındır ve tahsil süreleri haftalardan aylara uzanır. Kamu kurumlarına mal ya da hizmet satanlarda tahsil süresi bütçe ve ödeme süreçlerine bağlıdır.",
        "Bu nedenle bir işletmenin oranını farklı sektördeki bir işletmeyle karşılaştırmak yanıltıcıdır. Anlamlı karşılaştırmalar, aynı işletmenin önceki dönemleri ve aynı sektördeki benzer ölçekli işletmelerle yapılır. Oranı cari oran gibi likidite göstergeleriyle birlikte değerlendirmek daha bütünlüklü bir resim verir."
      ]
    },
    {
      h: "Tahsil süresini kısaltmanın yolları nelerdir?",
      ol: [
        "<strong>Faturayı hemen kesin:</strong> Vade fatura tarihinden işler; teslimden günler sonra kesilen fatura tahsilatı aynı gün kadar geciktirir.",
        "<strong>Vadeyi yazılı ve net tanımlayın:</strong> Sözleşme, teklif ve faturada vade günü ile ödeme yöntemi açıkça yazsın.",
        "<strong>Vadesinden önce hatırlatın:</strong> Vadeden birkaç gün önce gönderilen kısa bir hatırlatma, gecikmelerin önemli bir kısmını önler.",
        "<strong>Erken ödemeye iskonto verin:</strong> \"10 gün içinde öderseniz %2 indirim\" gibi koşullar tahsilatı hızlandırır; maliyetini [[bilgi:erken-odeme-iskontosu-2-10-net-30|erken ödeme iskontosu]] yazısıyla hesaplayın.",
        "<strong>Müşteri bazında limit koyun:</strong> Sürekli geç ödeyen müşteride yeni vadeli satışı mevcut bakiyeye bağlayın.",
        "<strong>Yaşlandırma tablosunu her ay inceleyin:</strong> 60 günü geçen alacaklar için kişisel arama ve yazılı ihtar takvimi oluşturun."
      ],
      after: [
        "Örnek işletmede tahsil süresini 60,8 günden 45 güne indirmek, günlük 19.726 TL'lik vadeli satışla yaklaşık 312.000 TL'lik nakdi alacaktan kasaya çeker. Bu tutar çoğu küçük işletme için bir aylık maaş ve kira ödemesine karşılık gelir; kısa vadeli kredi ihtiyacını da aynı ölçüde azaltır."
      ]
    }
  ],
  faq: [
    ["Alacak devir hızı nedir?", "Alacak devir hızı, bir işletmenin ticari alacaklarını bir dönem içinde kaç kez tahsil edip yenilediğini gösteren orandır. Kredili net satışların ortalama ticari alacaklara bölünmesiyle bulunur ve alacakların ne kadar hızlı nakde döndüğünü ölçer."],
    ["Alacak devir hızı formülü nasıl uygulanır?", "Dönem başı ve dönem sonu ticari alacakların ortalaması alınır, kredili net satışlar bu ortalamaya bölünür. Yıllık 7,2 milyon TL vadeli satış ve 1,2 milyon TL ortalama alacakta devir hızı 6'dır."],
    ["Ortalama tahsil süresi kaç gün olmalı?", "Doğru ölçüt müşterilere tanınan vadedir. Tahsil süresinin vade süresini %10–20'den fazla aşmaması hedeflenir; 45 gün vadeye karşı 61 günlük tahsil süresi ortalama 16 günlük gecikme anlamına gelir."],
    ["Alacak devir hızı düşükse ne anlama gelir?", "Müşterilerin geç ödediğini, vadelerin uzatıldığını, tahsili zor alacakların biriktiğini ya da dönem sonunda büyük bir vadeli satış yapıldığını gösterebilir. Nedeni bulmak için alacak yaşlandırma tablosu incelenmelidir."],
    ["Vade politikası tahsil süresini nasıl etkiler?", "Tanınan vade tahsil süresinin taban değeridir; müşterilerin tamamı zamanında ödese bile tahsil süresi vadenin altına inmez. Vadeyi uzatmak satış getirebilir ama işletmenin müşteriyi finanse etme maliyetini artırır."],
    ["Nakit dönüşüm süresi ile ilişkisi nedir?", "Nakit dönüşüm süresi, stokta kalma süresi ile ortalama tahsil süresinin toplamından borç ödeme süresi çıkarılarak bulunur. Tahsil süresi kısaldıkça paranın işletmede bağlı kaldığı süre de aynı gün kadar kısalır."],
    ["Ortalama vade hesabı tahsilat planında nasıl kullanılır?", "Farklı vadeli çek, senet ve faturaların tutar ağırlıklı ortalama vadesi, gerçekleşen tahsil süresiyle karşılaştırılacak hedef değeri verir. İki değer arasındaki fark ortalama gecikmeyi gösterir."],
    ["Sektörlere göre beklenen tahsil süreleri farklı mı?", "Evet. Peşin ve kartlı satışın yaygın olduğu perakende ve restoranlarda tahsil süresi birkaç gündür; toptan ticaret, üretim ve inşaatta vadeli satış nedeniyle haftalar ya da aylar sürebilir. Karşılaştırma aynı sektör içinde yapılmalıdır."],
    ["Tahsil süresini kısaltmanın yolları nelerdir?", "Faturayı teslimle birlikte kesmek, vadeyi yazılı netleştirmek, vadeden önce hatırlatma göndermek, erken ödemeye iskonto tanımak, geç ödeyen müşteriye limit koymak ve yaşlandırma tablosunu her ay izlemek en etkili yollardır."]
  ],
  tools: ["alacak-devir-hizi-hesapla", "nakit-donusum-suresi-hesapla", "ortalama-vade-hesapla", "vade-tarihi-hesapla"],
  related: ["nakit-akis-tablosu-nasil-yapilir", "ortalama-vade-nasil-hesaplanir", "erken-odeme-iskontosu-2-10-net-30", "cari-oran-ve-likidite-oranlari"]
};
