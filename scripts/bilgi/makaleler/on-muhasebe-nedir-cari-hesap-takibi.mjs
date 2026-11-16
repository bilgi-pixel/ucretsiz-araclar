export default {
  slug: "on-muhasebe-nedir-cari-hesap-takibi",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Ön Muhasebe Nedir? Cari Hesap, Gelir-Gider ve Fatura Takibi Nasıl Yapılır",
  pageTitle: "Ön Muhasebe Nedir? Cari Hesap ve Gelir-Gider Takibi",
  description: "Ön muhasebe, işletmenin fatura, tahsilat, ödeme, kasa, banka ve cari hesap kayıtlarını günlük tutmasıdır. Resmî muhasebeden farkı, ekstre okuma ve KDV kaydı.",
  keywords: ["ön muhasebe nedir", "cari hesap nedir", "cari hesap ekstresi", "gelir gider takibi", "tahsilat takibi", "kasa banka hareketleri", "küçük işletme muhasebe", "borç alacak takibi", "kdv dahil hariç kayıt"],
  lead: "Ön muhasebe, bir işletmenin satış ve alış faturalarını, tahsilat ve ödemelerini, kasa ve banka hareketlerini, müşteri ve tedarikçi bakiyelerini (cari hesapları) <strong>günlük olarak kayıt altına alıp izlemesidir</strong>. Amaç, \"kimden ne kadar alacağım var, kime ne kadar borcum var, kasada ve bankada ne kadar para var\" sorularını her an cevaplayabilmektir. Resmî muhasebe ise bu kayıtlardan yasal defterleri ve beyannameleri hazırlar ve mali müşavirin sorumluluğundadır. Bu sayfada ön muhasebenin kapsamını, cari hesabın mantığını, ekstre okumayı, KDV'li tutarların kaydını ve kayıtları mali müşavire düzenli aktarmayı anlatıyoruz.",
  kisaCevap: [
    "Ön muhasebe, işletmenin günlük ticari hareketlerini (fatura, tahsilat, ödeme, stok, kasa, banka) kaydedip izlemesidir; yönetim amaçlıdır.",
    "Resmî muhasebe, bu belgelerden yasal defterleri, beyannameleri ve mali tabloları hazırlar; mali müşavir tarafından yürütülür.",
    "Cari hesap, bir müşteri ya da tedarikçiyle olan borç-alacak hareketlerinin ve bakiyenin tutulduğu kişiye özel hesaptır.",
    "Ekstrede borç sütunu karşı tarafın size, alacak sütunu sizin karşı tarafa olan yükümlülüğü artıran hareketleri gösterir; bakiye ikisinin farkıdır.",
    "KDV dahil tutar = KDV hariç tutar × (1 + oran); %20 oranda 1.200 TL'lik faturanın matrahı 1.000 TL, KDV'si 200 TL'dir.",
    "Kasa yalnızca fiziksel nakdi, banka hesabı yalnızca bankadaki hareketleri gösterir; ikisini karıştırmamak mutabakatın temelidir."
  ],
  figure: {
    alt: "Ön muhasebenin akışı: satış ve alış faturaları, tahsilat ve ödemeler cari hesaplara, kasa ve banka hesaplarına işleniyor; dönem sonunda belgeler mali müşavire aktarılıyor. Altta örnek cari hesap ekstresi: borç, alacak ve bakiye sütunları.",
    caption: "Üst kısım, günlük belgelerin ön muhasebede hangi hesaplara işlendiğini ve resmî muhasebeye nasıl aktarıldığını gösterir. Alt kısım, uydurma bir müşterinin cari hesap ekstresidir: iki fatura ve bir tahsilat sonrası müşterinin 14.000 TL borç bakiyesi kalmıştır.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Ön muhasebeden resmî muhasebeye</text>
  <g class="sm mid">
    <rect x="20" y="48" width="150" height="40" rx="8" class="sf sb"/><text x="95" y="73">Satış faturaları</text>
    <rect x="20" y="96" width="150" height="40" rx="8" class="sf sb"/><text x="95" y="121">Alış faturaları</text>
    <rect x="20" y="144" width="150" height="40" rx="8" class="sf sb"/><text x="95" y="169">Tahsilat / ödeme</text>
  </g>
  <line x1="172" y1="116" x2="222" y2="116" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="226" y="48" width="250" height="136" rx="10" class="ps"/>
  <text x="351" y="74" class="b mid">Ön muhasebe (işletme)</text>
  <g class="sm mid"><text x="351" y="100">Cari hesaplar · Kasa · Banka</text><text x="351" y="124">Stok · Gelir-gider · Vade takibi</text><text x="351" y="148" class="b">Amaç: günlük yönetim</text></g>
  <line x1="478" y1="116" x2="528" y2="116" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="532" y="48" width="168" height="136" rx="10" class="p"/>
  <text x="616" y="74" class="b mid sf">Resmî muhasebe</text>
  <g class="sm mid sf"><text x="616" y="100" class="sf">Yasal defterler</text><text x="616" y="124" class="sf">Beyannameler</text><text x="616" y="148" class="sf b">Mali müşavir</text></g>
  <text x="20" y="218" class="b">Örnek cari hesap ekstresi (uydurma müşteri)</text>
  <rect x="20" y="230" width="680" height="186" rx="10" class="sf sb"/>
  <g class="sm">
    <text x="36" y="256" class="b">Tarih</text><text x="140" y="256" class="b">Açıklama</text><text x="470" y="256" class="b end">Borç</text><text x="570" y="256" class="b end">Alacak</text><text x="684" y="256" class="b end">Bakiye</text>
    <line x1="36" y1="266" x2="684" y2="266" class="sb" fill="none"/>
    <text x="36" y="290">03.11</text><text x="140" y="290">Satış faturası</text><text x="470" y="290" class="end">12.000</text><text x="570" y="290" class="end">—</text><text x="684" y="290" class="end">12.000 B</text>
    <text x="36" y="318">10.11</text><text x="140" y="318">Banka havalesi (tahsilat)</text><text x="470" y="318" class="end">—</text><text x="570" y="318" class="end">8.000</text><text x="684" y="318" class="end">4.000 B</text>
    <text x="36" y="346">14.11</text><text x="140" y="346">Satış faturası</text><text x="470" y="346" class="end">10.000</text><text x="570" y="346" class="end">—</text><text x="684" y="346" class="end">14.000 B</text>
    <line x1="36" y1="360" x2="684" y2="360" class="sb" fill="none"/>
    <text x="140" y="384" class="b">Toplam</text><text x="470" y="384" class="end b">22.000</text><text x="570" y="384" class="end b">8.000</text><text x="684" y="384" class="end b p">14.000 B</text>
  </g>
  <text x="36" y="406" class="sm mu">B: borç bakiyesi, müşterinin size borcu. Tutarlar TL ve örnektir.</text>
</svg>`
  },
  sections: [
    {
      h: "Ön muhasebe nedir, resmî muhasebeden farkı ne?",
      p: [
        "Bir işletmede her gün belgeler oluşur: kesilen satış faturaları, gelen alış faturaları, müşteriden alınan havaleler, tedarikçiye verilen çekler, kasaya giren nakit, kredi kartı tahsilatları. <strong>Ön muhasebe</strong>, bu hareketlerin işletme içinde düzenli olarak kaydedilip izlenmesidir. Sonuçta işletme sahibi her an alacaklarını, borçlarını, nakit durumunu ve stok miktarını görebilir.",
        "<strong>Resmî muhasebe</strong> ise aynı belgelerden, vergi mevzuatının istediği biçimde yasal defterleri tutmak, beyannameleri hazırlamak ve mali tabloları oluşturmaktır. Bu iş meslek mensubu olan serbest muhasebeci mali müşavirin (SMMM) sorumluluğundadır. Hangi defter türünün tutulacağı, hangi giderin nasıl kaydedileceği, hangi beyannamenin ne zaman verileceği gibi konular vergi danışmanlığı kapsamındadır ve bu sayfanın konusu değildir; bunlar için mali müşavirinize danışın.",
        "İki alan birbirini tamamlar. Ön muhasebe düzgün tutulduğunda mali müşavirinize giden belgeler eksiksiz ve zamanında olur, yanlış ya da eksik kayıt riski azalır ve işletme sahibi karar verirken güncel verilere dayanır."
      ],
      table: {
        head: ["Özellik", "Ön muhasebe", "Resmî muhasebe"],
        rows: [
          ["Amaç", "Günlük yönetim, nakit ve alacak takibi", "Yasal kayıt, vergi beyanı, mali tablolar"],
          ["Kimin işi?", "İşletme sahibi ya da çalışanı", "Mali müşavir"],
          ["Sıklık", "Her gün, hareket oldukça", "Dönemsel (aylık, üç aylık, yıllık)"],
          ["Temel kayıtlar", "Cari hesap, kasa, banka, stok, vade", "Yasal defterler, beyannameler"],
          ["Esneklik", "İşletmenin ihtiyacına göre", "Mevzuata bağlı"]
        ]
      }
    },
    {
      h: "Cari hesap nedir, borç-alacak nasıl izlenir?",
      p: [
        "Cari hesap, işletmenin düzenli ilişki içinde olduğu her müşteri ya da tedarikçi için ayrı tutulan bir hareket listesidir. Her satış faturası, her tahsilat, her iade ve her ödeme o kişinin cari hesabına işlenir. Böylece \"bu müşterinin bana toplam borcu ne kadar?\" sorusu tek bakışta cevaplanır.",
        "Cari hesapta iki sütun vardır: <strong>borç</strong> ve <strong>alacak</strong>. Müşteri açısından bakıldığında, ona kestiğiniz satış faturası müşterinin hesabına borç yazılır (müşterinin size borcu artar); müşteriden aldığınız ödeme alacak yazılır (borcu azalır). Tedarikçi hesabında ise tersi olur: tedarikçinin size kestiği fatura tedarikçi hesabına alacak, sizin ödemeniz borç olarak işlenir. Bakiye, iki sütunun farkıdır ve hangi tarafın ağır bastığına göre \"borç bakiyesi\" ya da \"alacak bakiyesi\" diye anılır."
      ]
    },
    {
      h: "Cari hesap ekstresi nasıl okunur?",
      p: [
        "Ekstre, bir cari hesaptaki hareketlerin tarih sırasıyla dökümüdür. Görseldeki uydurma örnekte müşteriye 3 Kasım'da 12.000 TL'lik fatura kesilmiş, 10 Kasım'da 8.000 TL havale alınmış, 14 Kasım'da 10.000 TL'lik ikinci fatura kesilmiştir."
      ],
      ol: [
        "Borç sütununu toplayın: 12.000 + 10.000 = 22.000 TL (müşterinin size olan borcunu artıran faturalar).",
        "Alacak sütununu toplayın: 8.000 TL (müşterinin yaptığı ödemeler).",
        "Bakiyeyi bulun: 22.000 − 8.000 = 14.000 TL borç bakiyesi. Müşterinin size 14.000 TL borcu vardır.",
        "Her satırın bakiye sütununun bir önceki bakiyeden doğru türediğini kontrol edin: 12.000 → 12.000 − 8.000 = 4.000 → 4.000 + 10.000 = 14.000.",
        "Ekstreyi müşteriye gönderip kendi kayıtlarıyla karşılaştırmasını istemek (mutabakat), farklılıkları erkenden ortaya çıkarır."
      ],
      after: [
        "Ekstrelerde sık görülen bir başka bilgi de bakiyenin ortalama vadesidir: açık faturaların tutar ağırlıklı olarak ortalama kaç gün içinde ödenmesi gerektiğini gösterir. Hesabı ve yorumu [[bilgi:ortalama-vade-nasil-hesaplanir|ortalama vade nasıl hesaplanır]] yazısında, pratik hesap [[arac:ortalama-vade-hesapla|Ortalama Vade Hesaplama aracında]]."
      ]
    },
    {
      h: "Gelir-gider takibi hangi kalemleri kapsar?",
      p: [
        "Gelir-gider takibi, işletmenin ne kazandığını ve neye harcadığını düzenli bir yapıda görmeyi sağlar. Kalemleri baştan belirlemek ve her hareketi aynı kalemlere işlemek, aylar arasında karşılaştırma yapmayı mümkün kılar."
      ],
      table: {
        head: ["Grup", "Örnek kalemler"],
        rows: [
          ["Gelirler", "Mal satışı, hizmet geliri, kira geliri, faiz ve diğer gelirler"],
          ["Satılan malın maliyeti", "Ürün alışları, nakliye ve gümrük gibi alışa bağlı giderler"],
          ["Personel giderleri", "Ücretler, prim ve ilgili yasal ödemeler"],
          ["İşletme giderleri", "Kira, elektrik, su, doğalgaz, internet, telefon, kırtasiye"],
          ["Satış ve pazarlama", "Reklam, pazaryeri komisyonu, kargo, ambalaj"],
          ["Finansman giderleri", "Kredi faizi, banka masrafları, çek kırdırma maliyeti"],
          ["Diğer", "Bakım-onarım, sigorta, danışmanlık ücretleri"]
        ],
        caption: "Kalem listesi örnektir; işletmenizin yapısına göre düzenleyin. Bu kalemlerin vergisel yorumu için mali müşavirinize başvurun."
      },
      after: [
        "Gelir ve gider kalemlerinden kâr marjını, başabaş noktasını ve ürün bazında kârlılığı izlemek mümkündür. Bir ürünün alış ve satış fiyatından kâr ya da zarar oranını görmek için [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama aracını]], kavramlar için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı]] ve başabaş noktası yazılarını kullanabilirsiniz."
      ]
    },
    {
      h: "Kasa ve banka hareketleri nasıl ayrılır?",
      p: [
        "Kasa, işletmenin elindeki <strong>fiziksel nakit</strong> parayı gösterir. Banka hesabı ise bankadaki hareketleri: havale, EFT, kredi kartı tahsilatlarının hesaba geçişi, otomatik ödemeler, banka masrafları. İkisini tek bir \"para\" hesabında tutmak, gün sonunda kasadaki parayı saymak ile banka hesap özetini karşılaştırmak gibi en temel kontrolleri imkânsız kılar."
      ],
      ul: [
        "<strong>Kasa sayımı:</strong> Gün sonunda kasadaki nakit sayılır ve kayıttaki kasa bakiyesiyle karşılaştırılır; fark varsa nedeni aynı gün araştırılır.",
        "<strong>Banka mutabakatı:</strong> Banka hesap özeti, kayıtlardaki banka hareketleriyle satır satır eşleştirilir; kaydedilmemiş masraflar ya da tanımlanamayan havaleler bulunur.",
        "<strong>Kredi kartı tahsilatları:</strong> POS cihazından yapılan satışlar hesaba çoğu zaman sonraki günlerde ve komisyon düşülerek geçer; bu nedenle ayrı izlenmesi gerekir.",
        "<strong>Kasadan bankaya yatırma:</strong> Kasadan çıkış ve bankaya giriş olarak iki ayrı hareket kaydedilir; gelir değildir, yalnızca paranın yer değiştirmesidir.",
        "<strong>Kişisel harcamalar:</strong> İşletme sahibinin kişisel harcamalarını işletme kasasından yapması kayıtları karıştırır; zorunlu hâllerde bunu açıkça ayrı kaydedin ve mali müşavirinize bildirin."
      ]
    },
    {
      h: "Vade takibi tahsilatı nasıl hızlandırır?",
      p: [
        "Vadeli satış yapan işletmelerde nakit sıkıntısının en yaygın nedeni, vadesi geçmiş alacakların zamanında fark edilmemesidir. Vade takibi, her faturanın vade tarihini kayda geçirip vadesi yaklaşan ve geçen alacakları düzenli olarak listelemektir."
      ],
      ol: [
        "Her satış faturasına vade tarihini yazın; fatura tarihine 30, 60 ya da 90 gün eklemek için [[arac:vade-tarihi-hesapla|Vade Tarihi Hesaplama aracını]] kullanabilirsiniz.",
        "Haftada bir \"vadesi bu hafta gelen\" ve \"vadesi geçmiş\" alacakları listeleyin.",
        "Vadesi yaklaşan müşterilere kibar bir hatırlatma gönderin; vadesi geçmiş olanlarla ödeme planı konuşun.",
        "Sürekli geciken müşterilerin vade süresini ve kredi limitini yeniden değerlendirin.",
        "Tedarikçi ödemelerinizi de aynı takvimde izleyin; tahsilat ve ödeme tarihlerini birbirine yakınlaştırmak nakit açığını azaltır."
      ]
    },
    {
      h: "KDV dahil ve hariç tutarlar nasıl kaydedilir?",
      p: [
        "Faturalarda üç tutar bulunur: KDV hariç tutar (matrah), KDV tutarı ve KDV dahil toplam. Ön muhasebede üçünü de ayrı ayrı kaydetmek, cari hesapta doğru bakiyeyi (KDV dahil tutar), gelir-gider raporunda doğru geliri (KDV hariç tutar) görmenizi sağlar."
      ],
      formula: "KDV dahil = KDV hariç × (1 + oran)\nKDV hariç = KDV dahil ÷ (1 + oran)\nÖrnek (%20): 1.200 ÷ 1,20 = 1.000 TL matrah, 200 TL KDV",
      after: [
        "Cari hesaba müşterinin ödemesi gereken tutar, yani KDV dahil toplam işlenir. Satış geliri ise KDV hariç tutar üzerinden izlenir; KDV, işletmenin geliri değil, devlet adına tahsil edilen bir vergidir. Hangi ürüne hangi oranın uygulanacağı, tevkifat ve indirim gibi konularda mali müşavirinizin yönlendirmesine uyun. Hesaplamalar için [[arac:kdv-hesapla|KDV Hesaplama aracını]], adım adım anlatım için [[rehber:kdv-hesaplama-nasil-yapilir|KDV hesaplama rehberini]] kullanabilirsiniz. Elektronik fatura türleri için [[bilgi:e-arsiv-fatura-nedir-nasil-kesilir|e-Arşiv fatura]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Ön muhasebe kayıtları mali müşavire nasıl aktarılır?",
      p: [
        "Mali müşavirle çalışmanın verimli olması, belgelerin düzenli, eksiksiz ve zamanında iletilmesine bağlıdır. Teslim takvimini ve biçimini mali müşavirinizle birlikte belirleyin; aşağıdaki liste genel bir çerçevedir."
      ],
      ul: [
        "<strong>Belgeler:</strong> Dönemin tüm satış ve alış faturaları (elektronik faturalar dahil), gider belgeleri, makbuzlar ve iade belgeleri.",
        "<strong>Banka ve kart:</strong> Tüm banka hesap özetleri ve POS tahsilat dökümleri.",
        "<strong>Kasa:</strong> Kasa hareket listesi ve gün sonu sayım kayıtları.",
        "<strong>Çek ve senet:</strong> Alınan ve verilen çek-senetlerin listesi, vadeleri ve durumları.",
        "<strong>Personel:</strong> Puantaj, işe giriş-çıkış ve ücret bilgileri.",
        "<strong>Açıklama notu:</strong> Olağan dışı hareketler (büyük alım, demirbaş, kredi kullanımı, ortak ödemesi) için kısa açıklamalar.",
        "<strong>Biçim:</strong> Listeleri düzenli bir elektronik tablo ya da mali müşavirinizin kabul ettiği dışa aktarım biçiminde gönderin; ad, tarih ve tutar sütunlarının tutarlı olmasına dikkat edin."
      ],
      after: [
        "Belgelerin saklanması da önemlidir. Vergi Usul Kanunu ve Türk Ticaret Kanunu, defter ve belgelerin belirli yıllar boyunca saklanmasını öngörür; süreler ve sizin için geçerli yükümlülükler hakkında mali müşavirinizden bilgi alın. Elektronik belgeleri yedekli tutmak ve kâğıt belgeleri tarih sırasıyla dosyalamak, olası bir incelemede işinizi kolaylaştırır. Küçük işletmeler için diğer dijital çözümler küçük işletme dijital araçlar rehberinde."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kişisel ve işletme parasını karıştırmak:</strong> Kasa ve banka bakiyeleri anlamsızlaşır, kâr hesaplanamaz.",
        "<strong>Tahsilatı yanlış cariye işlemek:</strong> Bir müşteri borçlu görünürken diğeri fazla ödemiş görünür; havale açıklamalarını kontrol edin.",
        "<strong>KDV dahil tutarı gelir saymak:</strong> Gelir raporu olduğundan yüksek görünür.",
        "<strong>Kayıtları ay sonuna bırakmak:</strong> Eksik belge ve unutulan hareketler artar; günlük ya da haftalık kayıt alışkanlığı edinin.",
        "<strong>Mutabakat yapmamak:</strong> Cari bakiyeler ve banka kayıtları karşı tarafla düzenli karşılaştırılmazsa hatalar yıl sonunda ortaya çıkar.",
        "<strong>Vergisel kararları tek başına vermek:</strong> Gider yazma, oran seçimi ve beyan konularında mali müşavirinize danışın."
      ]
    }
  ],
  faq: [
    ["Ön muhasebe nedir, resmi muhasebeden farkı ne?", "Ön muhasebe, işletmenin fatura, tahsilat, ödeme, kasa, banka ve cari hesap hareketlerini günlük yönetim amacıyla kaydetmesidir. Resmî muhasebe bu belgelerden yasal defterleri ve beyannameleri hazırlar ve mali müşavirin sorumluluğundadır."],
    ["Cari hesap nedir, borç-alacak nasıl izlenir?", "Cari hesap, bir müşteri ya da tedarikçiyle olan tüm hareketlerin ayrı tutulduğu hesaptır. Müşteriye kesilen fatura borç, alınan ödeme alacak olarak işlenir; bakiye iki sütunun farkıdır."],
    ["Cari hesap ekstresi nasıl okunur?", "Borç ve alacak sütunları ayrı ayrı toplanır, farkı bakiyeyi verir. Örnekte 22.000 TL fatura ve 8.000 TL tahsilat sonrası müşterinin 14.000 TL borç bakiyesi kalır; her satırdaki bakiye bir öncekinden türetilerek kontrol edilir."],
    ["Gelir-gider takibi hangi kalemleri kapsar?", "Satış ve hizmet gelirleri ile mal alışları, personel, kira, enerji, iletişim, pazarlama, kargo, komisyon ve finansman giderlerini kapsar. Kalemleri baştan belirleyip her ay aynı yapıda kaydetmek karşılaştırmayı kolaylaştırır."],
    ["Kasa ve banka hareketleri nasıl ayrılır?", "Kasa yalnızca fiziksel nakdi, banka hesabı yalnızca bankadaki hareketleri gösterir. Gün sonu kasa sayımı ve banka hesap özetiyle mutabakat için iki hesabın ayrı tutulması gerekir; kasadan bankaya yatırma gelir değil, yer değiştirmedir."],
    ["Vade takibi tahsilatı nasıl hızlandırır?", "Her faturanın vade tarihi kaydedilip vadesi yaklaşan ve geçen alacaklar düzenli listelendiğinde hatırlatmalar zamanında yapılır. Sürekli geciken müşterilerin vadesi ve kredi limiti yeniden değerlendirilebilir."],
    ["KDV dahil ve hariç tutarlar nasıl kaydedilir?", "Matrah, KDV ve KDV dahil toplam ayrı ayrı kaydedilir. Cari hesaba KDV dahil toplam, gelir raporuna KDV hariç tutar işlenir; yüzde 20 oranda 1.200 TL'lik faturanın matrahı 1.000 TL, KDV'si 200 TL'dir."],
    ["Ön muhasebe kayıtları mali müşavire nasıl aktarılır?", "Dönemin faturaları, banka özetleri, POS dökümleri, kasa kayıtları, çek-senet listesi ve personel bilgileri, mali müşavirle belirlenen takvim ve biçimde düzenli olarak iletilir. Olağan dışı hareketler için kısa açıklama eklemek faydalıdır."],
    ["Ön muhasebe için mali müşavire ihtiyaç var mı?", "Ön muhasebe işletmenin kendi iç takibidir ve işletme tarafından yapılabilir. Ancak yasal defterler, beyannameler ve vergisel kararlar mali müşavirin sorumluluğundadır; bu konularda mutlaka mali müşavirinize danışın."]
  ],
  tools: ["kdv-hesapla", "kar-zarar-hesapla", "vade-tarihi-hesapla", "ortalama-vade-hesapla"],
  related: ["ortalama-vade-nasil-hesaplanir", "e-arsiv-fatura-nedir-nasil-kesilir", "kar-marji-nasil-hesaplanir", "cari-oran-ve-likidite-oranlari"],
  sources: [
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["TÜRMOB – Türkiye Serbest Muhasebeci Mali Müşavirler ve Yeminli Mali Müşavirler Odaları Birliği", "https://www.turmob.org.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır, vergi ya da muhasebe danışmanlığı değildir; defter, beyan ve vergisel konularda mali müşavirinize danışın"
};
