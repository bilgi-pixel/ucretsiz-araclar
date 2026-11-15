export default {
  slug: "hisse-ortalama-maliyet-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Hisse Ortalama Maliyet Nasıl Hesaplanır? Kademeli Alım Örnekleri",
  pageTitle: "Hisse Ortalama Maliyet Hesaplama: Formül ve Kademeli Alım",
  description: "Hisse ortalama maliyeti = toplam ödenen tutar ÷ toplam lot. Kademeli alım, komisyon, maliyet düşürme için gereken lot, bedelsiz sonrası maliyet ve kâr-zarar örnekleri.",
  keywords: ["hisse ortalama maliyet hesaplama", "ortalama maliyet nasıl bulunur", "maliyet düşürme hesaplama", "hisse ağırlıklı ortalama", "bedelsiz sonrası maliyet", "kademeli alım ortalama fiyat", "lot maliyeti hesaplama", "hisse kâr zarar yüzdesi"],
  lead: "Hisse ortalama maliyeti, <strong>tüm alımlarda ödediğiniz toplam tutarın elinizdeki toplam lot sayısına bölünmesiyle</strong> bulunur; bu bir ağırlıklı ortalamadır. Örneğin 100 lotu 50 TL'den, 200 lotu 40 TL'den ve 100 lotu 35 TL'den aldıysanız 16.500 TL ödeyip 400 lot almışsınızdır ve ortalama maliyetiniz 41,25 TL'dir. Fiyatların basit ortalaması olan 41,67 TL yanlış sonuç verir. Bu sayfada komisyonun maliyete eklenmesini, maliyet düşürmek için kaç lot gerektiğini, bedelsiz ve kısmi satış sonrası hesabı adım adım anlatıyoruz.",
  kisaCevap: [
    "Ortalama maliyet = Σ(lot × alış fiyatı) ÷ Σ lot; her alım, lot sayısı oranında ağırlık taşır.",
    "Alış komisyonu ve varsa diğer işlem masrafları toplam ödenen tutara eklenir.",
    "Hedef ortalamaya inmek için gereken lot = mevcut lot × (mevcut maliyet − hedef) ÷ (hedef − güncel fiyat).",
    "%100 bedelsizde lot sayısı iki katına çıkar, ortalama maliyet yarıya iner; toplam maliyet değişmez.",
    "Kısmi satış ağırlıklı ortalama yönteminde kalan lotların ortalamasını değiştirmez.",
    "Kâr-zarar yüzdesi = (güncel fiyat − ortalama maliyet) ÷ ortalama maliyet × 100."
  ],
  figure: {
    alt: "Üç kademeli alımın maliyet alanları: 100 lot 50 TL, 200 lot 40 TL, 100 lot 35 TL; toplam 16.500 TL ve 400 lot; ağırlıklı ortalama maliyet çizgisi 41,25 TL.",
    caption: "Her dikdörtgenin genişliği lot sayısını, yüksekliği alış fiyatını gösterir; alanı o alımda ödenen tutardır. Kesikli çizgi, toplam alanı aynı genişlikte tek bir dikdörtgene yayan ağırlıklı ortalama maliyettir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kademeli alımda ağırlıklı ortalama maliyet</text>
  <line x1="70" y1="340" x2="660" y2="340" class="st" fill="none"/>
  <line x1="70" y1="70" x2="70" y2="340" class="st" fill="none"/>
  <text x="62" y="94" class="sm end mu">50 TL</text>
  <text x="62" y="144" class="sm end mu">40 TL</text>
  <text x="62" y="169" class="sm end mu">35 TL</text>
  <rect x="80" y="90" width="140" height="250" class="ps"/>
  <rect x="220" y="140" width="280" height="200" class="sf sb"/>
  <rect x="500" y="165" width="140" height="175" class="oks"/>
  <text x="150" y="250" class="b mid">1. alım</text><text x="150" y="274" class="sm mid">100 lot × 50</text><text x="150" y="296" class="sm mid b">5.000 TL</text>
  <text x="360" y="250" class="b mid">2. alım</text><text x="360" y="274" class="sm mid">200 lot × 40</text><text x="360" y="296" class="sm mid b">8.000 TL</text>
  <text x="570" y="250" class="b mid">3. alım</text><text x="570" y="274" class="sm mid">100 lot × 35</text><text x="570" y="296" class="sm mid b">3.500 TL</text>
  <line x1="80" y1="134" x2="660" y2="134" class="sp sw dash" fill="none"/>
  <rect x="470" y="96" width="180" height="30" rx="6" class="p"/>
  <text x="560" y="116" class="sm mid b sf">Ortalama 41,25 TL</text>
  <text x="360" y="362" class="sm mid t2">400 lot</text>
  <rect x="70" y="378" width="590" height="34" rx="8" class="sf sb"/>
  <text x="365" y="400" class="mid b">16.500 TL ÷ 400 lot = 41,25 TL (basit ortalama 41,67 yanlış)</text>
</svg>`
  },
  sections: [
    {
      h: "Hisse ortalama maliyeti nedir?",
      p: [
        "Ortalama maliyet, bir hisse senedinden elinizde bulunan lotlar için ödediğiniz ortalama birim fiyattır. Borsada aynı hisseyi farklı günlerde ve farklı fiyatlardan almak yaygın bir uygulamadır; buna kademeli alım denir. Her alım farklı fiyattan yapıldığı için pozisyonunuzun kâr mı zarar mı ettiğini anlamak, hedef satış fiyatı belirlemek ve getirinizi ölçmek için tek bir maliyet rakamına ihtiyaç duyarsınız.",
        "Bu rakam bir <strong>ağırlıklı ortalamadır</strong>: 10 lotluk bir alım ile 1.000 lotluk bir alım aynı etkide olamaz. Daha çok lot aldığınız fiyat ortalamayı kendine doğru daha güçlü çeker. Aracı kurum uygulamalarının çoğu ortalama maliyeti otomatik gösterir; ancak hesabın mantığını bilmek, bedelsiz sermaye artırımı, kısmi satış ya da farklı hesaplardaki lotları birleştirme gibi durumlarda rakamın doğru olup olmadığını kontrol etmenizi sağlar.",
        "Bu yazı yalnızca aritmetik hesaplamayı anlatır; bir hisseye yatırım yapıp yapmama kararı ya da maliyet düşürme stratejisinin uygun olup olmadığı kişisel durumunuza bağlıdır."
      ]
    },
    {
      h: "Ortalama maliyet formülü",
      p: [
        "Her alımda ödenen tutarı (lot × fiyat) bulun, bunları toplayın ve toplam lot sayısına bölün. Komisyon ödediyseniz onu da toplam tutara ekleyin."
      ],
      formula: "Ortalama maliyet = (L₁ × F₁ + L₂ × F₂ + … + Lₙ × Fₙ + komisyonlar) ÷ (L₁ + L₂ + … + Lₙ)\nL: alınan lot sayısı · F: alış fiyatı",
      after: [
        "Türkiye'de pay piyasasında 1 lot 1 adet paya karşılık gelir; bu yüzden lot ile adet bu hesapta aynı anlamdadır. Formülün genel hâli, not ortalamasında kredi ile notu çarpmakla aynı mantıktır. Farklı ağırlıklarla ortalama almak için [[arac:agirlikli-ortalama-hesapla|Ağırlıklı Ortalama Hesaplama]] aracını da kullanabilirsiniz; ağırlıkların lot sayısı, değerlerin fiyat olduğunu düşünün.",
        "Formülün bir başka faydası da yeni bir alımın ortalamayı ne kadar oynatacağını önceden görmektir. Elinizdeki pozisyon büyüdükçe aynı büyüklükteki ek alımın ortalamaya etkisi azalır; ilk alımlarda birkaç lot ortalamayı belirgin biçimde değiştirirken, binlerce lotluk bir pozisyonda aynı alım neredeyse fark yaratmaz."
      ]
    },
    {
      h: "Çözümlü örnek: üç kademeli alım",
      p: [
        "Bir yatırımcının aynı hisseyi üç farklı günde aldığını varsayalım. Fiyatlar ve lot sayıları örnektir."
      ],
      table: {
        head: ["Alım", "Lot", "Fiyat", "Ödenen tutar", "Kümülatif lot", "Kümülatif ortalama"],
        rows: [
          ["1. alım", "100", "50,00 TL", "5.000 TL", "100", "50,00 TL"],
          ["2. alım", "200", "40,00 TL", "8.000 TL", "300", "43,33 TL"],
          ["3. alım", "100", "35,00 TL", "3.500 TL", "400", "41,25 TL"]
        ],
        caption: "Kümülatif ortalama, o ana kadar ödenen toplam tutarın o ana kadar alınan toplam lota bölünmesiyle bulunur."
      },
      ol: [
        "Toplam ödenen tutar: 5.000 + 8.000 + 3.500 = 16.500 TL.",
        "Toplam lot: 100 + 200 + 100 = 400.",
        "Ortalama maliyet: 16.500 ÷ 400 = <strong>41,25 TL</strong>.",
        "Kontrol: fiyatların basit ortalaması (50 + 40 + 35) ÷ 3 = 41,67 TL'dir. Fark, 40 TL'den yapılan alımın diğerlerinin iki katı büyüklükte olmasından kaynaklanır."
      ],
      after: [
        "Aynı hesabı alım sayısından bağımsız olarak [[arac:hisse-ortalama-maliyet-hesapla|Hisse Ortalama Maliyet Hesaplama]] aracında satır satır yapabilir, güncel fiyatı girerek kâr ya da zararınızı da görebilirsiniz."
      ]
    },
    {
      h: "Komisyon maliyete eklenir mi?",
      p: [
        "Evet. Gerçek maliyetinizi bulmak için alış sırasında ödediğiniz aracı kurum komisyonunu ve varsa borsa payı gibi kesintileri toplam tutara eklemeniz gerekir. Satış sırasında ödenecek komisyon ise maliyete değil, satıştan elde edilen tutardan düşülür.",
        "Örnekte alış komisyonu binde 2 (örnek oran) olsaydı, 16.500 × 0,002 = 33 TL komisyon ödenirdi. Komisyon dahil maliyet (16.500 + 33) ÷ 400 = 41,3325 TL olur. Fark küçük görünse de sık işlem yapan yatırımcılar için yıllık toplamda belirgin bir rakama ulaşır."
      ],
      formula: "Komisyon dahil maliyet = (Toplam alış tutarı + alış komisyonları) ÷ Toplam lot\nNet satış geliri = Satış tutarı − satış komisyonu",
      after: [
        "Komisyon oranınızın tutara etkisini ve komisyon KDV'sini görmek için [[arac:komisyon-hesapla|Komisyon Hesaplama]] aracını kullanabilirsiniz. Aracı kurumların oranları farklı olduğu için hesapta kendi sözleşmenizdeki oranı kullanın."
      ]
    },
    {
      h: "Maliyet düşürmek için kaç lot almak gerekir?",
      p: [
        "Elinizdeki hissenin fiyatı ortalama maliyetinizin altına düştüğünde, ek alımla ortalamayı belirli bir hedefe çekmek için kaç lot gerektiğini formülle bulabilirsiniz. Bu formül ağırlıklı ortalama denkleminin hedef değere göre çözülmesidir."
      ],
      formula: "Gereken lot (x) = n × (M − H) ÷ (H − P)\nn: mevcut lot · M: mevcut ortalama maliyet · H: hedef ortalama · P: güncel fiyat",
      ol: [
        "Durum: elinizde 50 TL ortalamayla 100 lot var, hisse şu an 40 TL. Ortalamanızı 45 TL'ye indirmek istiyorsunuz.",
        "Değerleri yerine koyun: x = 100 × (50 − 45) ÷ (45 − 40) = 100 × 5 ÷ 5 = 100 lot.",
        "Kontrol edin: (100 × 50 + 100 × 40) ÷ 200 = 9.000 ÷ 200 = 45 TL.",
        "Hedefi 42 TL yapsaydınız: x = 100 × 8 ÷ 2 = 400 lot gerekirdi; toplam yatırımınız 5.000 TL'den 21.000 TL'ye çıkardı."
      ],
      after: [
        "Bu örnek önemli bir gerçeği gösteriyor: hedef ortalama güncel fiyata yaklaştıkça gereken lot sayısı hızla artar ve hedef güncel fiyata eşit ya da altında olamaz. Maliyet düşürmek pozisyonu büyütmek anlamına geldiği için riskinizi de artırır; bu bir strateji değil, yalnızca matematiksel bir sonuçtur."
      ]
    },
    {
      h: "Bedelsiz ve bedelli sermaye artırımı maliyeti nasıl etkiler?",
      p: [
        "<strong>Bedelsiz sermaye artırımında</strong> şirket, iç kaynaklarını sermayeye ekler ve ortaklara para almadan yeni pay verir. Elinizdeki lot sayısı artar, ama toplam maliyetiniz değişmez. Bu yüzden ortalama maliyet, bedelsiz oranı ölçüsünde düşer. Hisse fiyatı da bölünme günü aynı oranda düzeltilir; servetiniz değişmez.",
        "<strong>Bedelli sermaye artırımında</strong> ise yeni payları, genellikle 1 TL nominal bedelden, para ödeyerek alırsınız. Ödediğiniz tutar toplam maliyete eklenir."
      ],
      formula: "Bedelsiz sonrası maliyet = Eski ortalama ÷ (1 + bedelsiz oranı)\nÖrnek: %100 bedelsiz → 41,25 ÷ 2 = 20,625 TL; 400 lot → 800 lot\nBedelli sonrası maliyet = (Eski toplam maliyet + yeni lot × kullanım fiyatı) ÷ yeni toplam lot",
      after: [
        "Bedelli örnek: 400 lot ve 16.500 TL maliyetiniz varken %50 bedelli artırımda 200 yeni lotu 1 TL'den alırsanız toplam maliyet 16.700 TL, toplam lot 600 olur; yeni ortalama 16.700 ÷ 600 ≈ 27,83 TL'dir. Aracı kurum uygulamaları bu düzeltmeleri genellikle otomatik yapar, ancak hesaplarınızı bu mantıkla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Kısmi satıştan sonra ortalama maliyet değişir mi?",
      p: [
        "Ağırlıklı ortalama yöntemiyle hesaplandığında, elinizdeki lotların bir kısmını satmanız kalan lotların ortalama maliyetini değiştirmez. Satış yalnızca o lotlar için kâr ya da zarar gerçekleştirir. Örnekte 41,25 TL ortalamalı 400 lotun 150'sini 45 TL'den satarsanız gerçekleşen kâr 150 × (45 − 41,25) = 562,50 TL olur; kalan 250 lotun maliyeti yine 41,25 TL'dir.",
        "Vergi açısından ise durum farklı olabilir: gelir vergisi mevzuatında aynı tür menkul kıymetlerin farklı tarihlerde alınmasında, satılanın maliyeti için <strong>ilk giren ilk çıkar</strong> yöntemi esas alınır. Aracı kurumun vergi hesabında kullandığı maliyet, uygulamada gördüğünüz ortalamadan farklı çıkabilir. Kâr-zarar takibiniz için ağırlıklı ortalamayı, vergi konularında ise aracı kurumunuzun bildirimlerini esas alın."
      ]
    },
    {
      h: "Kâr-zarar yüzdesi nasıl hesaplanır?",
      p: [
        "Pozisyonunuzun yüzde kaç kârda ya da zararda olduğunu bulmak için güncel fiyat ile ortalama maliyet arasındaki farkı ortalama maliyete bölersiniz."
      ],
      formula: "Kâr-zarar % = (Güncel fiyat − Ortalama maliyet) ÷ Ortalama maliyet × 100\nToplam kâr-zarar = (Güncel fiyat − Ortalama maliyet) × Lot",
      table: {
        head: ["Güncel fiyat", "Fark (ortalama 41,25)", "Yüzde", "400 lot için tutar"],
        rows: [
          ["35,00 TL", "−6,25 TL", "%−15,15", "−2.500 TL"],
          ["41,25 TL", "0", "%0", "0"],
          ["45,00 TL", "+3,75 TL", "%+9,09", "+1.500 TL"],
          ["50,00 TL", "+8,75 TL", "%+21,21", "+3.500 TL"]
        ]
      },
      after: [
        "Satış tutarı ve alış tutarından kâr yüzdesini doğrudan bulmak için [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama]] aracı da kullanılabilir. Temettü gelirinizi maliyetinize göre değerlendirmek isterseniz [[bilgi:temettu-verimi-nedir|temettü verimi nedir]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Fiyatların basit ortalamasını almak:</strong> Lot sayıları farklıysa basit ortalama yanlıştır; her zaman toplam tutarı toplam lota bölün.",
        "<strong>Komisyonu unutmak:</strong> Özellikle küçük ve sık alımlarda komisyon, başabaş fiyatını yukarı iter.",
        "<strong>Bedelsizden sonra eski maliyete bakmak:</strong> Bölünme sonrası fiyat düşer; eski maliyetle kıyaslarsanız büyük bir zarar görürsünüz, oysa servetiniz değişmemiştir.",
        "<strong>Hedef ortalamayı güncel fiyata çok yakın seçmek:</strong> Gereken lot sayısı katlanarak artar.",
        "<strong>Farklı hesaplardaki lotları ayrı hesaplamak:</strong> Aynı hissenin toplam pozisyonunu görmek için tüm hesaplardaki alımları tek tabloda birleştirin."
      ]
    }
  ],
  faq: [
    ["Hisse ortalama maliyeti nasıl hesaplanır?", "Her alımda alınan lot sayısı alış fiyatıyla çarpılır, bu tutarlar ve varsa alış komisyonları toplanır. Bulunan toplam, elinizdeki toplam lot sayısına bölünür. Sonuç, pozisyonunuzun ağırlıklı ortalama birim maliyetidir."],
    ["Farklı fiyatlardan alınan hisselerin ortalaması nasıl bulunur?", "Fiyatların basit ortalaması değil, lot sayılarıyla ağırlıklandırılmış ortalaması alınır. Örneğin 100 lot 50 TL, 200 lot 40 TL ve 100 lot 35 TL alımın ortalaması 16.500 bölü 400 yani 41,25 TL'dir."],
    ["Maliyet düşürmek için kaç lot almak gerekir?", "Gereken lot, mevcut lot ile mevcut maliyet ve hedef arasındaki farkın çarpımının, hedef ile güncel fiyat arasındaki farka bölünmesiyle bulunur. 50 TL'den 100 lotu 40 TL fiyatta 45 TL ortalamaya indirmek için 100 lot gerekir."],
    ["Bedelsiz sermaye artırımı maliyeti nasıl etkiler?", "Bedelsizde lot sayısı artar ama toplam maliyet değişmez, bu yüzden ortalama maliyet bir artı bedelsiz oranına bölünür. Yüzde yüz bedelsizde lotlar iki katına çıkar, ortalama maliyet ve hisse fiyatı yarıya iner."],
    ["Komisyon maliyete eklenir mi?", "Evet, alış sırasında ödenen komisyon ve kesintiler toplam alış tutarına eklenerek gerçek ortalama maliyet bulunur. Satıştaki komisyon ise maliyete eklenmez, satış gelirinden düşülerek net kâr ya da zarar hesaplanır."],
    ["Kısmi satıştan sonra ortalama maliyet değişir mi?", "Ağırlıklı ortalama yönteminde kısmi satış, kalan lotların ortalama maliyetini değiştirmez; yalnızca satılan lotların kârı ya da zararı gerçekleşir. Vergi hesabında ise mevzuat gereği ilk giren ilk çıkar yöntemi kullanılabilir."],
    ["Ağırlıklı ortalama ile basit ortalama farkı nedir?", "Basit ortalama her alıma eşit önem verir ve fiyatları toplayıp alım sayısına böler. Ağırlıklı ortalama ise her fiyatı alınan lot sayısı kadar sayar. Alım büyüklükleri farklıysa yalnızca ağırlıklı ortalama doğru maliyeti verir."],
    ["Kâr-zarar yüzdesi nasıl hesaplanır?", "Güncel fiyattan ortalama maliyet çıkarılır, fark ortalama maliyete bölünür ve 100 ile çarpılır. 41,25 TL maliyetli bir hisse 45 TL olduğunda pozisyon yaklaşık yüzde 9,09 kârdadır."]
  ],
  tools: ["hisse-ortalama-maliyet-hesapla", "agirlikli-ortalama-hesapla", "kar-zarar-hesapla", "komisyon-hesapla"],
  related: ["temettu-verimi-nedir", "fk-orani-nedir", "ortalama-medyan-mod-nedir"],
  sources: [
    ["Sermaye Piyasası Kurulu", "https://www.spk.gov.tr/"],
    ["Gelir İdaresi Başkanlığı – Menkul kıymet kazançlarının vergilendirilmesi", "https://www.gib.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; yalnızca hesaplama yöntemini anlatır"
};
