export default {
  slug: "bedelsiz-sermaye-artirimi-hisse-fiyati-nasil-duzelir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Bedelsiz Sermaye Artırımı Nedir? Hisse Fiyatı ve Lot Sayısı Nasıl Değişir?",
  pageTitle: "Bedelsiz Sermaye Artırımı: Fiyat Düzeltme ve Lot Hesabı",
  description: "Bedelsiz sermaye artırımında lot sayısı artar, fiyat aynı oranda düzeltilir ve toplam değer değişmez. %100 bedelsiz, rüçhan hakkı ve ortalama maliyet örnekleri.",
  keywords: ["bedelsiz sermaye artırımı nedir", "yüzde 100 bedelsiz", "bedelsiz fiyat düzeltme", "bedelsiz sonrası lot sayısı", "bedelli sermaye artırımı", "rüçhan hakkı nedir", "bedelsiz ortalama maliyet", "bedelsiz hisse ne zaman geçer"],
  lead: "Bedelsiz sermaye artırımı, şirketin iç kaynaklarını sermayeye ekleyip ortaklarına para almadan yeni pay dağıtmasıdır; elinizdeki lot sayısı artırım oranı kadar çoğalır, hisse fiyatı da aynı oranda aşağı <strong>düzeltilir</strong> ve toplam yatırım değeriniz o an değişmez. %100 bedelsizde 100 lot 200 lota çıkar, 80 TL'lik fiyat 40 TL olarak açılır. Bu yazıda fiyat düzeltme formülünü, bedelli artırım ve rüçhan hakkını, ortalama maliyetin yeniden hesaplanmasını ve SPK onay sürecini örneklerle anlatıyoruz. Yazı genel bilgi amaçlıdır, hiçbir hisse için alım satım önerisi içermez.",
  kisaCevap: [
    "Bedelsiz artırımda yeni lot = eski lot × (1 + bedelsiz oranı); %100 bedelsizde lot iki katına çıkar.",
    "Düzeltilmiş fiyat = önceki kapanış ÷ (1 + bedelsiz oranı); toplam değer düzeltme anında aynı kalır.",
    "Bedelsiz, şirkete yeni para girmediği için tek başına yatırımcıya gerçek bir kazanç sağlamaz; pastanın dilim sayısı artar, büyüklüğü değişmez.",
    "Bedelli artırımda ortaklar yeni payları rüçhan hakkıyla, genellikle nominal 1 TL'den para ödeyerek alır; şirkete nakit girer.",
    "Bedelsiz sonrası ortalama maliyet = toplam maliyet ÷ yeni lot sayısı; toplam maliyet değişmez.",
    "Bedelsiz paylar, SPK'nın ihraç belgesini onaylaması ve KAP'ta duyurulan hak kullanım tarihinde hesaplara geçer."
  ],
  figure: {
    alt: "Yüzde 100 bedelsiz örneği: önce 100 lot × 80 TL = 8.000 TL, sonra 200 lot × 40 TL = 8.000 TL; toplam değer değişmiyor. Altta yüzde 100 bedelsiz ve yüzde 50 bedelli birlikte düzeltilmiş fiyat formülü ve 24,20 TL sonucu.",
    caption: "Bedelsiz, aynı büyüklükteki değeri daha çok parçaya böler. Bedelli ve bedelsizin birlikte yapıldığı örnekte 60 TL'lik hisse, (60 + 0,5 × 1) ÷ 2,5 = 24,20 TL'den açılır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">%100 bedelsiz: dilim artar, pasta aynı kalır</text>
  <rect x="40" y="60" width="290" height="190" rx="12" class="sf sb"/>
  <text x="185" y="88" class="b mid">Hak kullanımından önce</text>
  <rect x="80" y="104" width="210" height="60" rx="6" class="p"/>
  <text x="185" y="141" class="b mid sf">100 lot</text>
  <text x="185" y="194" class="lg b mid">× 80 TL</text>
  <text x="185" y="230" class="b mid">= 8.000 TL</text>
  <line x1="340" y1="155" x2="380" y2="155" class="sp sw" fill="none"/>
  <polygon points="380,147 394,155 380,163" class="p"/>
  <rect x="400" y="60" width="290" height="190" rx="12" class="oks"/>
  <text x="545" y="88" class="b mid">Hak kullanımından sonra</text>
  <rect x="440" y="104" width="102" height="60" rx="6" class="p"/>
  <rect x="548" y="104" width="102" height="60" rx="6" class="ps"/>
  <text x="491" y="141" class="b mid sf">100</text>
  <text x="599" y="141" class="b mid">+100</text>
  <text x="545" y="194" class="lg b mid">200 lot × 40 TL</text>
  <text x="545" y="230" class="b mid ok">= 8.000 TL</text>
  <rect x="40" y="270" width="650" height="114" rx="12" class="sf sb"/>
  <text x="60" y="296" class="b">Bedelli + bedelsiz birlikte düzeltilmiş fiyat</text>
  <text x="60" y="322" class="sm">(Önceki kapanış + bedelli oranı × rüçhan fiyatı) ÷ (1 + bedelli oranı + bedelsiz oranı)</text>
  <text x="60" y="350" class="sm">Örnek: 60 TL · %50 bedelli (1 TL) · %100 bedelsiz</text>
  <text x="60" y="372" class="b p">(60 + 0,5 × 1) ÷ (1 + 0,5 + 1) = 60,5 ÷ 2,5 = 24,20 TL</text>
</svg>`
  },
  sections: [
    {
      h: "Bedelsiz sermaye artırımı nedir?",
      p: [
        "Bir anonim şirketin sermayesi, ortaklarının sahip olduğu payların nominal değerleri toplamıdır. Şirket yıllar içinde kâr ettikçe bu kârın bir kısmını dağıtmaz; yedek akçe, geçmiş yıl kârları, emisyon primi ya da enflasyon düzeltmesinden doğan farklar gibi kalemlerde biriktirir. Bedelsiz sermaye artırımı, bu iç kaynakların muhasebe kaydıyla sermaye hesabına aktarılmasıdır.",
        "Sermaye arttığı için yeni paylar çıkarılır ve mevcut ortaklara payları oranında, karşılığında para istenmeden dağıtılır. Şirketin kasasına para girmez, kasadan para çıkmaz; yalnızca öz kaynak içindeki kalemlerin yeri değişir. Bu yüzden bedelsiz artırım bir \"hediye\" değil, aynı şirketin daha fazla paya bölünmesidir.",
        "Halka açık şirketlerde bedelsiz oranı yüzde olarak duyurulur. %100 bedelsiz her bir lot için bir yeni lot, %250 bedelsiz her bir lot için iki buçuk yeni lot anlamına gelir."
      ]
    },
    {
      h: "Lot sayısı ve fiyat nasıl değişir? Fiyat düzeltme formülü",
      p: [
        "Hak kullanım günü, borsa fiyatı teorik olarak toplam piyasa değerini koruyacak şekilde düzeltilir. Bunun için önceki günün kapanış fiyatı, \"1 + bedelsiz oranı\" değerine bölünür. Lot sayısı ise aynı katsayıyla çarpılır; böylece lot × fiyat çarpımı değişmez."
      ],
      formula: "Yeni lot = eski lot × (1 + bedelsiz oranı)\nDüzeltilmiş fiyat = önceki kapanış ÷ (1 + bedelsiz oranı)\nToplam değer = yeni lot × düzeltilmiş fiyat = eski lot × önceki kapanış",
      table: {
        head: ["Bedelsiz oranı", "100 lot olur", "80 TL'lik fiyat olur", "Toplam değer"],
        rows: [
          ["%50", "150 lot", "53,33 TL", "8.000 TL"],
          ["%100", "200 lot", "40,00 TL", "8.000 TL"],
          ["%200", "300 lot", "26,67 TL", "8.000 TL"],
          ["%250", "350 lot", "22,86 TL", "8.000 TL"],
          ["%900", "1.000 lot", "8,00 TL", "8.000 TL"]
        ],
        caption: "Borsa fiyat adımları nedeniyle gerçek açılış fiyatı en yakın fiyat adımına yuvarlanabilir; küsurat lotlar için aracı kurumun uygulamasına bakın."
      },
      after: [
        "Yüzdelerin katsayıya çevrilmesinde sık hata yapılır: %250 bedelsiz katsayıyı 2,5 değil 3,5 yapar, çünkü mevcut paylar da yerinde durur. Bu tür oran dönüşümlerini [[arac:oran-oranti-hesapla|Oran Orantı Hesapla]] aracıyla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Bedelsiz sonrası hisse fiyatı neden düşük görünür?",
      p: [
        "Hak kullanım sabahı fiyat ekranında hisse önceki günün yarısı, üçte biri ya da daha düşük bir fiyattan görünür. Bu bir değer kaybı değil, düzeltmedir. Grafik sağlayıcıları ve aracı kurum uygulamaları geçmiş fiyatları da aynı katsayıyla geriye dönük düzeltir; düzeltilmemiş bir grafikte ise sert bir düşüş varmış gibi bir boşluk görünür.",
        "Düşük nominal fiyat bazı yatırımcılara hisseyi \"ucuzlamış\" gibi gösterebilir. Ancak ucuzluk ya da pahalılık, fiyatın kendisiyle değil şirketin değeriyle kâr, öz kaynak ya da nakit akışı gibi ölçüler arasındaki ilişkiyle değerlendirilir. Pay sayısı arttığında hisse başına kâr da aynı oranda azalır, oranlar değişmez.",
        "Düzeltmeden sonraki fiyat hareketleri piyasa koşullarına bağlıdır ve önceden bilinemez. Yüzde değişimleri yorumlarken düzeltilmiş fiyatlarla karşılaştırma yaptığınızdan emin olun; yüzde ile yüzde puan farkı için [[bilgi:yuzde-puan-ve-yuzde-degisim-farki|yüzde puan ve yüzde değişim]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Bedelsiz yatırımcıya gerçek bir kazanç sağlar mı?",
      p: [
        "Matematiksel olarak hayır. Hak kullanım anında elinizdeki toplam değer, işlem maliyetleri ve yuvarlamalar dışında aynı kalır. Şirketin varlıkları, borçları, kârı ve nakdi değişmez; yalnızca bunlar daha fazla paya bölünür.",
        "Bedelsizin dolaylı etkileri ayrıca tartışılır: pay sayısının artması işlem hacmini ve likiditeyi etkileyebilir, iç kaynakların sermayeye bağlanması şirketin bu kaynakları kâr payı olarak dağıtma esnekliğini azaltabilir. Bu etkiler şirketten şirkete değişir ve fiyata nasıl yansıyacağı kesin değildir. Bu nedenle bedelsiz haberini tek başına bir alım satım gerekçesi olarak görmemek, şirketin finansal tablolarına ve kendi risk durumunuza bakmak gerekir.",
        "Kâr payı (temettü) ise farklıdır: şirketten ortağa nakit çıkar. Temettü dağıtıldığında da fiyat temettü tutarı kadar düzeltilir, ama yatırımcı nakdi eline alır. Temettünün getiri olarak nasıl ölçüldüğü için [[bilgi:temettu-verimi-nedir|temettü verimi]] yazısına bakın."
      ],
      table: {
        head: ["Ölçüt", "Bedelsiz", "Bedelli", "Temettü"],
        rows: [
          ["Şirkete para girer mi?", "Hayır", "Evet", "Hayır, şirketten para çıkar"],
          ["Ortak para öder mi?", "Hayır", "Evet (rüçhan fiyatı)", "Hayır, nakit alır"],
          ["Lot sayısı", "Artar", "Rüçhan kullanılırsa artar", "Değişmez"],
          ["Fiyat düzeltmesi", "Bölme ile", "Bölme ve ekleme ile", "Temettü kadar düşülür"]
        ]
      }
    },
    {
      h: "Bedelli sermaye artırımı ve rüçhan hakkı nedir?",
      p: [
        "Bedelli sermaye artırımında şirket yeni paylar çıkarır ama ortaklardan karşılığında para ister. Mevcut ortakların, paylarının oranını korumak için yeni paylardan öncelikle alma hakkına <strong>rüçhan hakkı</strong> denir. Halka açık şirketlerde rüçhan hakkı genellikle nominal değerden, yani pay başına 1 TL'den kullandırılır ve belirli bir süre (çoğunlukla 15 gün) açık kalır.",
        "Rüçhan hakkını kullanmak istemeyen ortaklar, bu hakları ayrı bir menkul kıymet gibi borsada satabilir. Hakkını kullanmayan ve satmayan ortağın şirketteki payının oranı azalır; buna sulanma denir. Kullanılmayan paylar daha sonra halka arz edilebilir."
      ],
      formula: "Düzeltilmiş fiyat = (P − temettü + bedelli oranı × rüçhan fiyatı) ÷ (1 + bedelli oranı + bedelsiz oranı)\nÖrnek: P = 60 TL, %50 bedelli (1 TL), %100 bedelsiz\n(60 + 0,5 × 1) ÷ (1 + 0,5 + 1) = 60,5 ÷ 2,5 = 24,20 TL",
      after: [
        "Formülde bedelli kısım için rüçhan bedeli pay tarafına eklenir, çünkü rüçhan hakkını kullanan ortak şirkete para ödeyerek yeni pay almaktadır. Aynı formül, kâr payı dağıtımı varsa temettü tutarının düşülmesiyle de kullanılır."
      ]
    },
    {
      h: "Ortalama maliyet bedelsizden sonra nasıl yeniden hesaplanır?",
      p: [
        "Bedelsiz paylar için para ödemediğiniz için toplam maliyetiniz değişmez; yalnızca daha fazla lota bölünür. Bu yüzden yeni ortalama maliyet, toplam maliyetin yeni lot sayısına bölünmesiyle bulunur."
      ],
      ol: [
        "Örnek: 150 lotu ortalama 48 TL'den almışsınız. Toplam maliyet 150 × 48 = 7.200 TL.",
        "Şirket %200 bedelsiz yapıyor: yeni lot 150 × (1 + 2) = 450.",
        "Yeni ortalama maliyet: 7.200 ÷ 450 = 16 TL. Aynı sonuç 48 ÷ 3 ile de bulunur.",
        "Aynı dönemde %50 bedelli artırıma 1 TL'den katılırsanız 150 × 0,5 = 75 lot için 75 TL ödersiniz; toplam maliyet 7.275 TL, toplam lot 525, ortalama 7.275 ÷ 525 = 13,86 TL olur.",
        "Komisyon ve diğer işlem giderlerini toplam maliyete eklemeyi unutmayın."
      ],
      after: [
        "Kademeli alımlarla ortalama maliyet hesabı için [[arac:hisse-ortalama-maliyet-hesapla|Hisse Ortalama Maliyet Hesapla]] aracını kullanabilir, yöntemi [[bilgi:hisse-ortalama-maliyet-nasil-hesaplanir|hisse ortalama maliyet nasıl hesaplanır]] yazısında inceleyebilirsiniz. Bedelsiz oranının toplam lot üzerindeki etkisini [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracıyla hızlıca görebilirsiniz."
      ]
    },
    {
      h: "SPK onayı süreci ve bedelsizin hesaba geçmesi",
      ol: [
        "Kayıtlı sermaye sistemindeki şirketlerde yönetim kurulu, kayıtlı sermaye tavanı içinde bedelsiz artırım kararı alır ve bunu Kamuyu Aydınlatma Platformu'nda (KAP) duyurur.",
        "Şirket, ihraç belgesinin onayı için Sermaye Piyasası Kurulu'na başvurur. Başvuruda kullanılacak iç kaynakların finansal tablolarda gerçekten bulunduğu bağımsız denetimle gösterilir.",
        "SPK başvuruyu inceler ve uygun bulursa ihraç belgesini onaylar; onay haftalık SPK bülteninde yayımlanır. Bu süre başvurudan başvuruya değişir ve önceden kesin olarak bilinemez.",
        "Onaydan sonra şirket, hak kullanım (bölünme) tarihini KAP'ta ilan eder.",
        "Hak kullanım günü fiyat düzeltilmiş olarak işlem görür ve yeni paylar Merkezi Kayıt Kuruluşu üzerinden yatırımcı hesaplarına aktarılır; aracı kurum ekranında görünmesi kısa bir süre alabilir."
      ],
      after: [
        "Hak kullanım tarihinden bir gün önce hisseye sahip olan yatırımcılar bedelsiz payı alır. Bu tarih yaklaşırken fiyatta görülen hareketler beklentilere bağlıdır ve sonuç garanti değildir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Düzeltmeyi zarar sanmak:</strong> Fiyatın bölünmesi değer kaybı değildir; lot sayısı da aynı oranda artmıştır.",
        "<strong>Oranı katsayıya yanlış çevirmek:</strong> %250 bedelsiz katsayısı 3,5'tir, 2,5 değildir.",
        "<strong>Ortalama maliyeti eski lot sayısıyla bölmek:</strong> Toplam maliyet yeni lot sayısına bölünmelidir.",
        "<strong>Rüçhan süresini kaçırmak:</strong> Kullanılmayan ve satılmayan rüçhan hakları değersiz kalır ve payınız sulanır.",
        "<strong>Düzeltilmemiş grafiğe bakmak:</strong> Geçmiş fiyatları düzeltilmemiş grafikler yanıltıcı boşluklar gösterir."
      ]
    }
  ],
  faq: [
    ["Bedelsiz sermaye artırımı nedir?", "Şirketin yedekler, geçmiş yıl kârları ve emisyon primi gibi iç kaynaklarını sermayeye aktararak ortaklarına para almadan yeni pay dağıtmasıdır. Şirkete para girmez, yalnızca aynı öz kaynak daha fazla paya bölünür."],
    ["Yüzde 100 bedelsizde lot sayısı ve fiyat nasıl değişir?", "Lot sayısı iki katına çıkar, fiyat yarıya düzeltilir. 100 lotu 80 TL'den olan yatırımcı hak kullanımından sonra 200 lota 40 TL'den sahip olur ve toplam değeri 8.000 TL olarak kalır."],
    ["Bedelsiz sonrası hisse fiyatı neden düşük görünür?", "Hak kullanım günü fiyat, önceki kapanışın 1 artı bedelsiz oranına bölünmesiyle düzeltilir. Fiyat düşer ama lot sayısı aynı oranda arttığı için toplam değer korunur; bu bir değer kaybı değildir."],
    ["Bedelsiz yatırımcıya gerçek bir kazanç sağlar mı?", "Hak kullanım anında toplam değer değişmediği için tek başına bir kazanç sağlamaz. Sonraki fiyat hareketleri piyasa koşullarına ve şirketin performansına bağlıdır, önceden bilinemez ve garanti değildir."],
    ["Bedelli sermaye artırımı ve rüçhan hakkı nedir?", "Bedelli artırımda ortaklar yeni payları para ödeyerek alır ve şirkete nakit girer. Rüçhan hakkı, mevcut ortakların yeni paylardan öncelikle, genellikle nominal 1 TL'den alma hakkıdır; kullanılmayan hak borsada satılabilir."],
    ["Bedelsiz hisseler hesaba ne zaman geçer?", "SPK'nın ihraç belgesini onaylamasının ardından şirket KAP'ta hak kullanım tarihini ilan eder. Bu tarihte fiyat düzeltilir ve yeni paylar Merkezi Kayıt Kuruluşu üzerinden yatırımcı hesaplarına aktarılır."],
    ["Ortalama maliyet bedelsizden sonra nasıl yeniden hesaplanır?", "Toplam maliyet değişmediği için toplam maliyet yeni lot sayısına bölünür. 150 lot 48 TL'den alınmışsa toplam 7.200 TL, %200 bedelsizden sonra 450 lot olur ve yeni ortalama 16 TL'dir."],
    ["Temettü ile bedelsiz arasındaki fark nedir?", "Temettüde şirketten ortağa nakit çıkar ve fiyat temettü tutarı kadar düşülür; lot sayısı değişmez. Bedelsizde nakit hareketi olmaz, lot sayısı artar ve fiyat bölme yoluyla düzeltilir."],
    ["SPK onayı süreci nasıl işler?", "Yönetim kurulu kararı KAP'ta duyurulur, şirket ihraç belgesinin onayı için SPK'ya başvurur ve SPK incelemeden sonra onayı bültende yayımlar. Süre başvuruya göre değişir ve kesin bir takvim önceden bilinemez."]
  ],
  tools: ["hisse-ortalama-maliyet-hesapla", "yuzde-hesapla", "oran-oranti-hesapla"],
  related: ["hisse-ortalama-maliyet-nasil-hesaplanir", "temettu-verimi-nedir", "yuzde-puan-ve-yuzde-degisim-farki"],
  sources: [
    ["Sermaye Piyasası Kurulu", "https://spk.gov.tr/"],
    ["Kamuyu Aydınlatma Platformu", "https://www.kap.org.tr/"],
    ["Mevzuat Bilgi Sistemi – 6362 sayılı Sermaye Piyasası Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6362.pdf"]
  ],
  uyari: "genel bilgi niteliğindedir, yatırım tavsiyesi değildir; yatırım kararlarınız için yetkili bir yatırım danışmanına başvurun"
};
