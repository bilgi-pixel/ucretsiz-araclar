export default {
  slug: "kredi-dosya-masrafi-ve-sigorta-toplam-maliyet",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Kredi Dosya Masrafı ve Sigorta: Kredinin Toplam Maliyeti Nasıl Hesaplanır?",
  pageTitle: "Kredi Dosya Masrafı, Sigorta ve YMO: Toplam Kredi Maliyeti",
  description: "Bireysel kredide tahsis ücreti anaparanın binde 5'ini aşamaz, hayat sigortası zorunlu değildir. KKDF, BSMV, YMO ve toplam geri ödeme örnek hesapla.",
  keywords: ["kredi dosya masrafı", "kredi tahsis ücreti binde 5", "kredi hayat sigortası zorunlu mu", "yıllık maliyet oranı ymo", "kkdf bsmv kredi", "kredi toplam geri ödeme", "konut kredisi ekspertiz ücreti", "kredi masrafı iadesi"],
  lead: "Bir kredinin gerçek maliyeti yalnızca faiz oranından değil; faize eklenen KKDF ve BSMV'den, tahsis (dosya) ücretinden ve varsa sigorta priminden oluşur ve bunların hepsini tek oranda gösteren ölçü <strong>yıllık maliyet oranıdır (YMO)</strong>. Bireysel kredilerde tahsis ücreti kullandırılan anaparanın binde 5'ini aşamaz; kredi bağlantılı hayat sigortası ise zorunlu değildir, banka sigortasız seçeneği de sunmak zorundadır. Bu yazıda masraf kalemlerini, toplam geri ödemenin nasıl bulunduğunu ve faizi düşük görünen kredinin neden daha pahalı çıkabileceğini örnekle anlatıyoruz.",
  kisaCevap: [
    "Bireysel kredilerde tahsis ücreti, kullandırılan anaparanın en fazla binde 5'idir; 200.000 TL'lik kredide üst sınır 1.000 TL'dir.",
    "İhtiyaç ve taşıt gibi tüketici kredilerinde faize %15 KKDF ve %15 BSMV eklenir; konut kredilerinde bu vergiler uygulanmaz.",
    "Kredi bağlantılı hayat sigortası zorunlu değildir; sigortayı istediğiniz şirketten yaptırabilir ya da hiç yaptırmayabilirsiniz.",
    "Toplam geri ödeme = taksit × vade + peşin alınan masraflar; YMO bu nakit akışından hesaplanan gerçek yıllık maliyettir.",
    "Konut kredisinde ekspertiz ücreti, ipotek işlemlerindeki tapu masrafları ve zorunlu deprem sigortası (DASK) ayrıca hesaba katılmalıdır.",
    "Sınırı aşan ya da onayınız alınmadan tahsil edilen ücretler için önce bankaya, sonuç alamazsanız tüketici hakem heyetine başvurulabilir."
  ],
  figure: {
    alt: "İki kredinin karşılaştırması: A kredisi aylık %3,49, masrafsız, toplam 332.362 TL ve YMO yüzde 70,3; B kredisi aylık %3,39 ama 1.150 TL tahsis ücreti ve 4.000 TL sigortayla toplam 333.221 TL ve YMO yüzde 72,9.",
    caption: "200.000 TL, 24 ay vadeli örnek ihtiyaç kredisi (KKDF ve BSMV dahil). Faizi daha düşük olan B kredisi, masraf ve sigorta eklenince A'dan yaklaşık 860 TL daha pahalıya gelir. Oranlar örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Faizi düşük kredi her zaman ucuz mu?</text>
  <rect x="30" y="54" width="320" height="290" rx="12" class="oks"/>
  <text x="190" y="84" class="lg b mid">Kredi A</text>
  <text x="50" y="118" class="sm">Aylık faiz</text><text x="330" y="118" class="sm b end">%3,49</text>
  <text x="50" y="144" class="sm">Tahsis ücreti</text><text x="330" y="144" class="sm b end">0 TL</text>
  <text x="50" y="170" class="sm">Sigorta</text><text x="330" y="170" class="sm b end">yok</text>
  <text x="50" y="196" class="sm">Aylık taksit</text><text x="330" y="196" class="sm b end">13.848,40 TL</text>
  <line x1="50" y1="212" x2="330" y2="212" class="sb" fill="none"/>
  <text x="50" y="240" class="sm">Toplam ödeme</text><text x="330" y="240" class="b end">332.361,61 TL</text>
  <text x="190" y="290" class="sm mid">Yıllık maliyet oranı</text>
  <text x="190" y="324" class="xl mid ok">%70,3</text>
  <rect x="370" y="54" width="320" height="290" rx="12" class="dgs"/>
  <text x="530" y="84" class="lg b mid">Kredi B</text>
  <text x="390" y="118" class="sm">Aylık faiz</text><text x="670" y="118" class="sm b end">%3,39</text>
  <text x="390" y="144" class="sm">Tahsis ücreti + BSMV</text><text x="670" y="144" class="sm b end">1.150 TL</text>
  <text x="390" y="170" class="sm">Hayat sigortası</text><text x="670" y="170" class="sm b end">4.000 TL</text>
  <text x="390" y="196" class="sm">Aylık taksit</text><text x="670" y="196" class="sm b end">13.669,64 TL</text>
  <line x1="390" y1="212" x2="670" y2="212" class="sb" fill="none"/>
  <text x="390" y="240" class="sm">Toplam ödeme</text><text x="670" y="240" class="b end">333.221,27 TL</text>
  <text x="530" y="290" class="sm mid">Yıllık maliyet oranı</text>
  <text x="530" y="324" class="xl mid dg">%72,9</text>
  <rect x="30" y="362" width="660" height="46" rx="10" class="sf sb"/>
  <text x="360" y="384" class="sm b mid">200.000 TL · 24 ay · faize KKDF %15 + BSMV %15 eklenmiş</text>
  <text x="360" y="401" class="sm mid t2">Karşılaştırmada faiz oranına değil YMO'ya ve toplam ödemeye bakın</text>
</svg>`
  },
  sections: [
    {
      h: "Kredinin maliyeti hangi kalemlerden oluşur?",
      p: [
        "Bankaların reklamlarında öne çıkan aylık faiz oranı, kredinin maliyetinin yalnızca bir parçasıdır. Tüketici kredilerinde faizin üzerine vergi eklenir, kredi kullandırılırken bir defalık ücret alınır ve çoğu zaman bir sigorta teklif edilir. Bu kalemler toplandığında, aynı faiz oranlı iki kredinin maliyeti birbirinden belirgin biçimde farklı olabilir.",
        "Kredinin toplam maliyetini doğru karşılaştırmanın yolu, tüm ödemeleri hesaba katan iki rakama bakmaktır: toplam geri ödeme tutarı ve yıllık maliyet oranı (YMO). Bankalar sözleşme öncesi bilgi formunda bu iki değeri göstermek zorundadır."
      ],
      table: {
        head: ["Kalem", "Ne zaman alınır?", "Hangi kredide?"],
        rows: [
          ["Faiz", "Her taksitte", "Tüm krediler"],
          ["KKDF (%15)", "Faiz tutarı üzerinden, her taksitte", "İhtiyaç, taşıt gibi tüketici kredileri; konutta yok"],
          ["BSMV (%15)", "Faiz ve ücretler üzerinden", "Tüketici kredileri; konutta yok"],
          ["Tahsis (dosya) ücreti", "Kredi kullandırılırken bir kez", "Bireysel kredilerde en fazla anaparanın binde 5'i"],
          ["Hayat sigortası", "Peşin ya da taksitle", "İsteğe bağlı"],
          ["Ekspertiz ücreti", "Başvuru aşamasında", "Konut ve bazı taşıt kredileri"],
          ["İpotek ve tapu işlem masrafları", "İpotek tesisinde", "Konut kredisi"],
          ["DASK ve konut sigortası", "Yıllık", "Konut kredisi (DASK yasal zorunluluk)"]
        ],
        caption: "Oranlar 16.11.2026 itibarıyla. KKDF ve BSMV oranları Cumhurbaşkanı kararıyla değişebilir."
      }
    },
    {
      h: "Kredi tahsis (dosya) ücreti en fazla ne kadar olabilir?",
      p: [
        "Halk arasında \"dosya masrafı\" denen ücretin resmî adı kredi tahsis ücretidir. Türkiye Cumhuriyet Merkez Bankası'nın finansal tüketicilerden alınacak ücretlere ilişkin tebliğine göre bireysel kredilerde bu ücret, kullandırılan kredi anaparasının <strong>binde 5'ini</strong> aşamaz. Banka bundan düşük ücret alabilir ya da hiç almayabilir; ama tavanı aşamaz.",
        "Tüketici kredilerinde ücretin üzerine %15 BSMV eklenir. Örneğin 200.000 TL'lik bir ihtiyaç kredisinde azami tahsis ücreti 200.000 × 0,005 = 1.000 TL, BSMV 150 TL, toplam peşin kesinti 1.150 TL'dir. Konut kredilerinde BSMV uygulanmadığından aynı tutardaki krediye en fazla 1.000 TL ücret yansır.",
        "Tahsis ücreti dışında \"hesap işletim\", \"dosya inceleme\" ya da \"istihbarat\" adıyla ayrı ücret alınması, tebliğin izin verdiği ücret kalemleri arasında değilse mümkün değildir. Kredi bağlantılı ürünler (sigorta, kart, hesap) için ise ayrıca ve açıkça onayınız alınmalıdır."
      ]
    },
    {
      h: "Kredi hayat sigortası zorunlu mu?",
      p: [
        "Hayır. Tüketici kredisi mevzuatına göre kredi bağlantılı sigorta, tüketicinin açık talebi olmadan yaptırılamaz. Banka sigortalı bir teklif sunuyorsa sigortasız seçeneği de göstermek zorundadır. Ayrıca sigortayı bankanın önerdiği şirket yerine istediğiniz bir sigorta şirketinden yaptırıp poliçeyi bankaya sunma hakkınız vardır.",
        "Hayat sigortası, borçlunun vefatı ya da sürekli iş göremezliği hâlinde kalan borcu kapattığı için aileniz açısından koruma sağlayabilir. Karar verirken primi toplam maliyete ekleyin ve teminat süresinin kredi vadesiyle aynı olup olmadığına bakın. Krediyi erken kapatırsanız peşin ödenen primin kalan süreye düşen kısmının iadesini isteyebilirsiniz; erken kapamanın hesabı için [[bilgi:kredi-erken-kapama-nasil-hesaplanir|kredi erken kapama]] yazısına bakın.",
        "Konut kredisinde durum biraz farklıdır: zorunlu deprem sigortası (DASK) yasal bir zorunluluktur ve ipotekli konut için yaptırılmalıdır. Banka ayrıca yangın sigortası isteyebilir; bunu da kendi seçtiğiniz şirketten yaptırabilirsiniz."
      ]
    },
    {
      h: "KKDF ve BSMV faizi ne kadar artırır?",
      p: [
        "İhtiyaç ve taşıt kredilerinde her taksitin faiz kısmına %15 KKDF ve %15 BSMV eklenir. İkisi de faiz tutarı üzerinden hesaplandığı için pratikte vergili aylık oran, vergisiz oranın 1,30 katıdır. Aylık %3,50 faizli bir tüketici kredisinin vergili aylık maliyeti 3,50 × 1,30 = %4,55 olur.",
        "Konut kredilerinde KKDF ve BSMV uygulanmaz; bu yüzden konut kredisi faiz oranı, ihtiyaç kredisi oranıyla doğrudan karşılaştırılamaz. Ticari kredilerde ise vergilendirme farklıdır."
      ],
      formula: "Vergili aylık oran = aylık faiz × (1 + KKDF + BSMV) = aylık faiz × 1,30\nAylık taksit = P × r ÷ (1 − (1 + r)^(−n))\nP: anapara · r: vergili aylık oran · n: taksit sayısı"
    },
    {
      h: "Toplam geri ödeme ve YMO nasıl hesaplanır? Çözümlü örnek",
      p: [
        "200.000 TL'lik, 24 ay vadeli bir ihtiyaç kredisi için iki teklif aldığınızı düşünün. Oranlar örnek amaçlıdır; güncel oranları bankanızdan öğrenin."
      ],
      ol: [
        "Kredi A: aylık %3,49, tahsis ücreti yok, sigorta yok. Vergili oran 3,49 × 1,30 = %4,537. Taksit 13.848,40 TL; toplam ödeme 13.848,40 × 24 = 332.361,61 TL.",
        "Kredi B: aylık %3,39. Vergili oran %4,407. Taksit 13.669,64 TL; taksitlerin toplamı 328.071,27 TL.",
        "Kredi B'de peşin kesintiler: 1.150 TL tahsis ücreti (BSMV dahil) ve 4.000 TL hayat sigortası primi, toplam 5.150 TL.",
        "Kredi B'nin toplam maliyeti 328.071,27 + 5.150 = 333.221,27 TL olur; Kredi A'dan yaklaşık 860 TL fazladır.",
        "YMO, cebinize giren net tutar ile ödediğiniz taksitleri eşitleyen orandır: Kredi A için yıllık yaklaşık %70,3, Kredi B için cebe giren 194.850 TL üzerinden yaklaşık %72,9."
      ],
      after: [
        "Örnek, iki önemli dersi gösteriyor. Birincisi, faiz oranındaki 0,10 puanlık fark masraflarla kolayca silinebilir. İkincisi, masraflar peşin alındığında cebe giren para azalır ve YMO yükselir. Taksiti ve toplam ödemeyi [[arac:kredi-hesapla|Kredi Hesaplama]] aracıyla, masrafların yıllık orana etkisini [[arac:efektif-faiz-hesapla|Efektif Faiz Hesapla]] aracıyla görebilirsiniz. Nominal ve efektif oran farkının mantığı [[bilgi:nominal-ve-efektif-faiz-farki|nominal ve efektif faiz]] yazısında anlatılır."
      ]
    },
    {
      h: "Konut kredisinde ekspertiz, ipotek ve sigorta masrafları",
      p: [
        "Konut kredisinde banka, teminat olarak alacağı konutun değerini lisanslı bir değerleme uzmanına belirletir. Ekspertiz ücreti, Merkez Bankası düzenlemesinde ayrıca sayılan ücretlerdendir ve kredi kullanılmasa da başvuru aşamasında alınabilir; tutarı her yıl güncellenen sınırlar içinde bankadan bankaya değişir. Kredi teklifini kabul etmeden önce ekspertiz ücretinin ne kadar olduğunu ve krediyi kullanmazsanız iade edilip edilmeyeceğini sorun.",
        "Kredi onaylandıktan sonra konut üzerine bankaya ipotek kurulur. İpotek tesisi sırasında tapu müdürlüğünde döner sermaye ücreti gibi işlem masrafları doğar; konut finansmanına ilişkin işlemlerde uygulanan harç istisnalarını banka ve tapu müdürlüğünden teyit edin. Konut satın alımında alıcı ve satıcının ödediği tapu harcı bunlardan ayrıdır.",
        "Bu masrafların tamamını görmek için [[arac:konut-kredisi-hesapla|Konut Kredisi Hesapla]] aracı ekspertiz, ipotek ve sigorta kalemlerini ayrı satırlarda girmenize izin verir. Gelirinize göre kullanabileceğiniz tutar için [[bilgi:maasa-gore-ne-kadar-kredi-cekilir|maaşa göre ne kadar kredi çekilir]] yazısına göz atın."
      ]
    },
    {
      h: "Haksız alınan kredi masrafları geri istenebilir mi?",
      p: [
        "Evet. Binde 5 sınırını aşan tahsis ücreti, onayınız alınmadan yapılan sigorta ya da mevzuatta yer almayan bir ücret alındıysa önce bankaya yazılı başvurarak iade isteyin. Bankalar şikâyetlere belirli süre içinde yanıt vermek zorundadır.",
        "Sonuç alamazsanız tutar, her yıl Ticaret Bakanlığı'nca belirlenen parasal sınırın altındaysa ikamet ettiğiniz yerdeki tüketici hakem heyetine başvurabilirsiniz; başvuru ücretsizdir ve e-Devlet üzerinden yapılabilir. Sınırın üzerindeki uyuşmazlıklar için tüketici mahkemesine gitmeden önce arabuluculuk aşaması vardır. Başvuruda sözleşme, ödeme planı, hesap dökümü ve sigorta poliçesini ekleyin.",
        "Bankanın şikâyetinizi sonuçlandırmaması durumunda Bankacılık Düzenleme ve Denetleme Kurumu'na da bildirimde bulunabilirsiniz. Kredi notunuzu etkileyen gecikmeler ise ayrı bir konudur; [[bilgi:kredi-notu-kac-olmali-findeks|kredi notu]] yazısında ele alınır."
      ]
    },
    {
      h: "Kredi teklifini karşılaştırırken kontrol listesi",
      ul: [
        "Sözleşme öncesi bilgi formunu isteyin; YMO ve toplam geri ödeme tutarı yazılı olmalıdır.",
        "Tahsis ücretinin anaparanın binde 5'ini aşıp aşmadığını hesaplayın.",
        "Sigortanın isteğe bağlı olduğunu, sigortasız teklifi de istediğinizi söyleyin.",
        "Konut kredisinde ekspertiz, ipotek, DASK ve konut sigortasını toplam maliyete ekleyin.",
        "Erken kapama hâlinde alınacak komisyonu ve sigorta prim iadesini sorun.",
        "Aynı vade ve tutarla en az iki bankadan teklif alın; faiz yerine YMO'yu karşılaştırın.",
        "Oranı karşılaştırırken yüzde ile yüzde puan farkını karıştırmayın; [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı bu farkı netleştirir."
      ]
    }
  ],
  faq: [
    ["Kredi tahsis (dosya) ücreti en fazla ne kadar olabilir?", "Bireysel kredilerde tahsis ücreti, kullandırılan anaparanın binde 5'ini aşamaz. 200.000 TL'lik bir krediye en fazla 1.000 TL ücret uygulanabilir; tüketici kredilerinde bunun üzerine %15 BSMV eklenir."],
    ["Kredi hayat sigortası zorunlu mu?", "Hayır. Kredi bağlantılı sigorta tüketicinin açık talebi olmadan yaptırılamaz ve banka sigortasız seçeneği de sunmak zorundadır. Sigorta istenirse başka bir şirketten de yaptırılabilir; konut kredisinde yalnızca DASK yasal zorunluluktur."],
    ["Yıllık maliyet oranı (YMO) nedir?", "YMO, faiz, vergi, tahsis ücreti ve sigorta dahil tüm ödemeleri hesaba katarak kredinin gerçek yıllık maliyetini gösteren orandır. Cebe giren net tutarı taksitlerin bugünkü değerine eşitleyen oran olarak hesaplanır."],
    ["KKDF ve BSMV hangi kredilerde uygulanır?", "İhtiyaç ve taşıt gibi tüketici kredilerinde faiz tutarına %15 KKDF ve %15 BSMV eklenir, bu da vergili oranı vergisiz oranın 1,30 katına çıkarır. Konut kredilerinde KKDF ve BSMV uygulanmaz."],
    ["Toplam geri ödeme tutarı nasıl hesaplanır?", "Aylık taksit vade sayısıyla çarpılır ve peşin alınan tahsis ücreti, sigorta primi gibi masraflar eklenir. Örnekte 13.669,64 TL × 24 = 328.071,27 TL'ye 5.150 TL masraf eklenince toplam 333.221,27 TL olur."],
    ["Faiz oranı aynı iki kredi neden farklı maliyet çıkarır?", "Tahsis ücreti, sigorta primi ve ekspertiz gibi masraflar farklı olabilir; ayrıca masrafların peşin kesilmesi cebe giren parayı azaltır. Bu yüzden karşılaştırmada faiz oranı yerine YMO ve toplam geri ödeme kullanılmalıdır."],
    ["Konut kredisinde ekspertiz ve ipotek masrafları ne kadar tutar?", "Ekspertiz ücreti Merkez Bankası düzenlemesindeki sınırlar içinde bankadan bankaya değişir ve her yıl güncellenir; ipotek tesisinde tapu müdürlüğü işlem masrafları doğar. Güncel tutarları başvuru öncesinde bankadan yazılı olarak istemek en güvenli yoldur."],
    ["Haksız alınan kredi masrafları geri istenebilir mi?", "Evet. Önce bankaya yazılı başvurulur; sonuç alınamazsa tutar parasal sınırın altındaysa tüketici hakem heyetine, üzerindeyse arabuluculuk sonrasında tüketici mahkemesine gidilir. Sözleşme ve ödeme dökümü başvuruya eklenmelidir."],
    ["Efektif faiz oranı masrafları nasıl yansıtır?", "Efektif oran, faizin bileşik etkisini ve peşin alınan masrafları birlikte hesaba katar. Masraflar cebe giren tutarı azalttığı için aynı taksitle ödenen kredinin efektif yıllık maliyeti nominal orandan belirgin biçimde yüksek çıkar."]
  ],
  tools: ["kredi-hesapla", "efektif-faiz-hesapla", "konut-kredisi-hesapla", "yuzde-hesapla"],
  related: ["kredi-erken-kapama-nasil-hesaplanir", "nominal-ve-efektif-faiz-farki", "maasa-gore-ne-kadar-kredi-cekilir", "kredi-notu-kac-olmali-findeks"],
  sources: [
    ["TCMB – Finansal tüketicilerden alınacak ücretler", "https://www.tcmb.gov.tr/"],
    ["BDDK – Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"],
    ["Ticaret Bakanlığı – Tüketici hakem heyetleri", "https://www.ticaret.gov.tr/"]
  ],
  uyari: "örnek oranlar varsayımdır ve yatırım ya da kredi tavsiyesi değildir; güncel koşullar için bankanızdan sözleşme öncesi bilgi formunu isteyin"
};
