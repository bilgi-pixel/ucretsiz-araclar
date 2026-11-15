export default {
  slug: "ev-kac-yilda-amorti-eder",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Ev Kaç Yılda Kendini Amorti Eder? Kira Getirisi ve Amortisman Süresi",
  pageTitle: "Ev Kaç Yılda Amorti Eder? Kira Getirisi Hesaplama",
  description: "Ev kaç yılda amorti eder? Ev fiyatını yıllık kiraya bölün. Brüt ve net kira getirisi, giderler, boş kalma, kira artışının etkisi ve mevduatla karşılaştırma örnekle.",
  keywords: ["ev kaç yılda amorti eder", "kira getirisi hesaplama", "amortisman süresi ev", "brüt kira getirisi", "net kira getirisi", "yatırımlık ev hesabı", "konut geri dönüş süresi", "ev mi mevduat mı"],
  lead: "Bir evin kendini kaç yılda amorti edeceği, <strong>ev fiyatının yıllık kira gelirine bölünmesiyle</strong> bulunur: 4.000.000 TL'lik ve aylık 20.000 TL kira getiren bir ev 4.000.000 ÷ 240.000 = 16,7 yılda (200 ayda) kendini öder; bu, %6 brüt kira getirisi demektir. Gerçekçi hesap için tapu ve komisyon masrafları, bakım, vergi ve boş kalma süresi de katılmalıdır; bu örnekte net süre yaklaşık 21,6 yıla çıkar. Yazıda brüt ve net hesabı, kira artışının etkisini ve evi mevduatla nasıl karşılaştıracağınızı anlatıyoruz.",
  kisaCevap: [
    "Brüt amortisman süresi (yıl) = ev fiyatı ÷ yıllık kira; ay cinsinden = ev fiyatı ÷ aylık kira.",
    "Brüt kira getirisi (%) = yıllık kira ÷ ev fiyatı × 100; 16,7 yıllık amortisman %6 brüt getiriye denktir.",
    "Net getiri = (yıllık kira − bakım, vergi, sigorta, boş kalma) ÷ (ev fiyatı + alım masrafları).",
    "Metrekare ile kısa yol: amortisman süresi = m² satış fiyatı ÷ (m² aylık kira × 12).",
    "Kira her yıl arttıkça nominal geri ödeme süresi kısalır; yıllık %20 kira artışıyla 16,7 yıllık süre yaklaşık 8 yıla iner, ama bu paranın değer kaybını hesaba katmaz.",
    "Yatırım kararı için kira getirisini, beklenen değer artışıyla birlikte mevduatın net reel getirisiyle karşılaştırın."
  ],
  figure: {
    alt: "4 milyon TL ev ve aylık 20.000 TL kira: brüt amortisman 16,7 yıl ve yüzde 6 getiri; alım masrafları ve yıllık 47.000 TL gider eklenince net amortisman 21,6 yıl ve yüzde 4,6 getiri.",
    caption: "Aynı evin brüt ve net hesabı. Tapu harcı ve komisyon maliyeti büyütür, giderler ve boş kalma süresi geliri azaltır; net süre brütün yaklaşık 5 yıl üzerindedir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Ev kaç yılda kendini öder?</text>
  <rect x="20" y="50" width="330" height="200" rx="10" class="sf sb"/>
  <rect x="20" y="50" width="330" height="44" rx="10" class="ps"/>
  <text x="185" y="78" class="b mid">Brüt hesap</text>
  <text x="40" y="124">Ev fiyatı</text><text x="330" y="124" class="b end">4.000.000</text>
  <text x="40" y="154">Yıllık kira (12 × 20.000)</text><text x="330" y="154" class="b end">240.000</text>
  <text x="185" y="198" class="xl mid">16,7 yıl</text>
  <text x="185" y="230" class="sm mid t2">Brüt getiri %6,0 · 200 ay</text>
  <rect x="370" y="50" width="330" height="200" rx="10" class="sf sb"/>
  <rect x="370" y="50" width="330" height="44" rx="10" class="p"/>
  <text x="535" y="78" class="b mid sf">Net hesap</text>
  <text x="390" y="124">Toplam maliyet</text><text x="680" y="124" class="b end">4.176.000</text>
  <text x="390" y="154">Net yıllık gelir</text><text x="680" y="154" class="b end">193.000</text>
  <text x="535" y="198" class="xl mid p">21,6 yıl</text>
  <text x="535" y="230" class="sm mid t2">Net getiri %4,6</text>
  <text x="360" y="284" class="b mid">Kira yıllık artarsa nominal geri ödeme süresi</text>
  <g class="mid">
    <rect x="40" y="300" width="140" height="56" rx="8" class="sf sb"/><text x="110" y="324" class="sm t2">artış %0</text><text x="110" y="346" class="b">16,7 yıl</text>
    <rect x="210" y="300" width="140" height="56" rx="8" class="ps"/><text x="280" y="324" class="sm t2">artış %10</text><text x="280" y="346" class="b">10,3 yıl</text>
    <rect x="380" y="300" width="140" height="56" rx="8" class="ps"/><text x="450" y="324" class="sm t2">artış %20</text><text x="450" y="346" class="b">8,0 yıl</text>
    <rect x="550" y="300" width="140" height="56" rx="8" class="ps"/><text x="620" y="324" class="sm t2">artış %30</text><text x="620" y="346" class="b">6,8 yıl</text>
  </g>
  <text x="360" y="392" class="sm mid mu">Nominal süre kısalır ama paranın değer kaybı ayrıca düşünülmelidir.</text>
</svg>`
  },
  sections: [
    {
      h: "Amortisman süresi ne anlama gelir?",
      p: [
        "Konut yatırımında amortisman süresi, evi satın almak için ödediğiniz paranın kira gelirleriyle kaç yılda geri döneceğini gösterir. Muhasebedeki amortisman (yıpranma payı) kavramıyla karıştırılmamalıdır; burada kastedilen, finansın \"geri ödeme süresi\" ölçüsüdür.",
        "Bu ölçü özellikle aynı bütçeyle farklı evleri, ilçeleri ya da yatırım araçlarını karşılaştırırken işe yarar. Kısa amortisman süresi, fiyatına göre yüksek kira getiren bir evi gösterir. Uzun süre ise ya kiraların fiyatlara göre düşük kaldığı ya da fiyatın beklenen değer artışını önceden yansıttığı bir bölgeye işaret eder.",
        "Amortisman süresi ile kira getirisi aynı bilginin iki yüzüdür: biri diğerinin tersidir. 20 yıllık amortisman %5, 25 yıllık amortisman %4 brüt kira getirisi demektir."
      ]
    },
    {
      h: "Brüt kira getirisi ve amortisman formülü",
      formula: "Brüt amortisman süresi (yıl) = Ev fiyatı ÷ (Aylık kira × 12)\nBrüt kira getirisi (%) = (Aylık kira × 12) ÷ Ev fiyatı × 100\nAy cinsinden süre = Ev fiyatı ÷ Aylık kira",
      p: [
        "Örnek: 4.000.000 TL'lik bir daire aylık 20.000 TL'ye kiralanıyor. Yıllık kira 240.000 TL'dir. Amortisman süresi 4.000.000 ÷ 240.000 = 16,7 yıl, ay cinsinden 4.000.000 ÷ 20.000 = 200 aydır. Brüt kira getirisi 240.000 ÷ 4.000.000 × 100 = %6'dır.",
        "Bu hesap hızlı bir ön eleme için yeterlidir. İlanlarda gördüğünüz fiyat ve kira değerlerini girerek farklı evleri birkaç saniyede karşılaştırabilirsiniz. [[arac:kira-getirisi-hesapla|Kira Getirisi Hesaplama]] aracı hem brüt hem net sonucu ay ve yıl olarak verir."
      ]
    },
    {
      h: "Net kira getirisi: giderler hesaba nasıl katılır?",
      p: [
        "Gerçek getiri, evi almak için yapılan ek ödemeleri ve ev sahibi olarak üstlendiğiniz yıllık giderleri hesaba kattığınızda ortaya çıkar. Aşağıdaki tablo aynı evin net hesabını <strong>örnek tutarlarla</strong> gösterir."
      ],
      table: {
        head: ["Kalem", "Örnek tutar", "Açıklama"],
        rows: [
          ["Ev fiyatı", "4.000.000 TL", "Satış bedeli"],
          ["Tapu harcı (alıcı payı %2)", "80.000 TL", "Satış bedeli üzerinden"],
          ["Emlak komisyonu (%2 + KDV)", "96.000 TL", "Oran pazarlığa bağlıdır"],
          ["Toplam yatırım", "4.176.000 TL", "Paydaya bu yazılır"],
          ["Yıllık kira", "240.000 TL", "12 × 20.000 TL"],
          ["Boş kalma (1 ay)", "−20.000 TL", "Kiracı değişiminde"],
          ["Bakım ve onarım", "−20.000 TL", "Boya, tesisat, beyaz eşya"],
          ["Emlak vergisi", "−4.000 TL", "Belediyeye göre değişir"],
          ["DASK ve konut sigortası", "−3.000 TL", "Yıllık poliçe"],
          ["Net yıllık gelir", "193.000 TL", "Kira geliri vergisi öncesi"]
        ],
        caption: "Net getiri = 193.000 ÷ 4.176.000 = %4,62; net amortisman süresi = 4.176.000 ÷ 193.000 = 21,6 yıl. Tutarlar örnektir."
      },
      after: [
        "Aidat genellikle kiracı tarafından ödendiği için bu tabloya eklenmedi; ancak ev boşken aidat ve demirbaş giderleri ev sahibine kalır. Kira geliri belirli bir tutarı aşarsa gelir vergisi beyanı gerekir; bu vergi de net getiriyi düşürür. Ayrıntısını [[bilgi:kira-geliri-vergisi-nasil-hesaplanir|kira geliri vergisi nasıl hesaplanır]] yazısında bulabilirsiniz. Alım masraflarının tamamı için [[rehber:tapu-harci-ve-emlak-masraflari|tapu harcı ve ev alırken masraflar]] rehberine bakabilirsiniz."
      ]
    },
    {
      h: "Metrekare fiyatıyla hızlı amortisman hesabı",
      p: [
        "Bir bölgedeki satış ve kira ilanlarını karşılaştırırken metrekare birim fiyatlarıyla çalışmak pratiktir, çünkü evlerin büyüklük farkı ortadan kalkar. Formül şudur: amortisman süresi = m² satış fiyatı ÷ (m² aylık kira × 12).",
        "100 m²'lik örnek evde m² satış fiyatı 40.000 TL, m² aylık kira 200 TL'dir. Süre 40.000 ÷ (200 × 12) = 16,7 yıl çıkar; toplam fiyatla yapılan hesapla aynıdır. Bir ilçede m² kira 250 TL'ye çıkarken m² fiyat 40.000 TL'de kalırsa süre 13,3 yıla iner. Birim fiyatları ve bölge ortalamasından sapmayı görmek için [[arac:metrekare-fiyati-hesapla|Metrekare Fiyatı Hesaplama]] aracını kullanabilirsiniz.",
        "Brüt ve net metrekare farkına dikkat edin: satış ilanları çoğu zaman brüt, kira ilanları bazen net metrekare yazar. Karşılaştırmada iki tarafta da aynı ölçüyü kullanın."
      ]
    },
    {
      h: "Kira artışı amortisman süresini kısaltır mı?",
      p: [
        "Yukarıdaki hesaplar kiranın hiç artmadığını varsayar. Gerçekte kira her yıl yenilenir ve Türkiye'de konut kiralarındaki artış, Türk Borçlar Kanunu'na göre önceki kira yılının TÜFE on iki aylık ortalamasını aşamaz. Kira her yıl arttıkça toplanan kiralar daha hızlı birikir ve nominal geri ödeme süresi kısalır."
      ],
      table: {
        head: ["Yıllık kira artışı", "Nominal geri ödeme süresi", "Yorum"],
        rows: [
          ["%0", "16,7 yıl", "Sabit kira"],
          ["%10", "10,3 yıl", "Ilımlı enflasyon"],
          ["%20", "8,0 yıl", "Yüksek enflasyon"],
          ["%30", "6,8 yıl", "Çok yüksek enflasyon"]
        ],
        caption: "4.000.000 TL ev, ilk yıl 240.000 TL kira. Değerler nominaldir; paranın alım gücü kaybı hesaba katılmamıştır."
      },
      after: [
        "Bu tablo yanıltıcı olabilir: kiralar enflasyonla artıyorsa evin fiyatı ve paranın değeri de değişir. Bugünkü 4 milyon TL'yi 7 yılda nominal olarak geri almak, alım gücünü geri almak anlamına gelmez. Daha sağlıklı yaklaşım, reel (enflasyondan arındırılmış) kira getirisine bakmaktır; kira enflasyonla aynı hızda artıyorsa reel getiri ilk yılki brüt getiriye yakın kalır. Yasal kira artışını hesaplamak için [[arac:kira-artis-hesapla|Kira Artışı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kiradaki ev mi, mevduat mı? Doğru karşılaştırma",
      p: [
        "Evi mevduatla karşılaştırırken yalnızca kira getirisine bakmak eksik kalır, çünkü konutun toplam getirisi iki parçadan oluşur: kira getirisi ve fiyat artışı (değer kazancı). Mevduatın getirisi ise faizdir, ana para nominal olarak sabit kalır."
      ],
      formula: "Konutun toplam yıllık getirisi ≈ Net kira getirisi + Beklenen yıllık değer artışı\nMevduatın getirisi = Faiz oranı × (1 − stopaj oranı)",
      ul: [
        "<strong>Likidite:</strong> Mevduat günler içinde nakde döner; evin satışı aylar sürebilir ve satış masrafı doğurur.",
        "<strong>Risk:</strong> Kiracı ödemeyebilir, ev uzun süre boş kalabilir, büyük onarım çıkabilir. Mevduatta bu riskler yoktur, ama faiz oranı ve kur riski vardır.",
        "<strong>Değer artışı belirsizdir:</strong> Geçmişteki fiyat artışları gelecek için garanti değildir. Resmî eğilimi TCMB'nin Konut Fiyat Endeksi'nden izleyebilirsiniz.",
        "<strong>Zaman ufku:</strong> Ev uzun vadeli bir yatırımdır; alım ve satım masrafları kısa vadede getiriyi siler."
      ],
      after: [
        "Bir yatırımın kendini geri ödeme süresini iskontolu yöntemle, yani paranın zaman değerini de katarak hesaplamak isterseniz [[arac:geri-odeme-suresi-hesapla|Geri Ödeme Süresi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Türkiye'de ortalama amortisman süresi kaç yıl?",
      p: [
        "Türkiye geneli için resmî bir amortisman istatistiği yayımlanmaz. Özel kuruluşların yayımladığı endeksler il ve ilçe bazında birbirinden çok farklı süreler gösterir ve kira ile fiyat hareketlerine göre aydan aya değişir. Turistik ya da prestijli semtlerde süre uzarken, üniversite ve sanayi bölgelerine yakın, kiralık talebi yüksek yerlerde kısalabilir.",
        "Bu yüzden genel bir ortalamaya güvenmek yerine, almayı düşündüğünüz sokaktaki benzer büyüklükteki evlerin satış ve kira ilanlarını derleyip kendi hesabınızı yapın. En az beş-on ilanın medyanını almak, tek bir aşırı değerin sonucu bozmasını engeller."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Alım masraflarını unutmak:</strong> Tapu harcı ve komisyon toplam maliyeti %4–5 artırabilir.",
        "<strong>Evin hiç boş kalmayacağını varsaymak:</strong> Kiracı değişimlerinde bir-iki aylık boşluk olağandır.",
        "<strong>Brüt ve net metrekareyi karıştırmak:</strong> Fiyat brüt, kira net metrekareye göre ise sonuç sapar.",
        "<strong>Nominal geri ödemeyi reel sanmak:</strong> Enflasyonlu ortamda hızlı nominal geri ödeme alım gücü kazancı anlamına gelmez.",
        "<strong>Vergiyi yok saymak:</strong> İstisna tutarını aşan kira gelirleri beyana tabidir."
      ]
    }
  ],
  faq: [
    ["Ev kendini kaç yılda amorti eder?", "Ev fiyatını yıllık kira gelirine bölerek bulursunuz. 4.000.000 TL'lik ve aylık 20.000 TL kira getiren ev 16,7 yılda, yani 200 ayda kendini öder. Masraf ve giderler eklendiğinde net süre bu örnekte yaklaşık 21,6 yıla çıkar."],
    ["Kira getirisi nasıl hesaplanır?", "Brüt kira getirisi, yıllık kira gelirinin ev fiyatına bölünüp 100 ile çarpılmasıyla bulunur. Aylık 20.000 TL kira ve 4.000.000 TL fiyat için yıllık 240.000 TL kira, yüzde 6 brüt getiri demektir."],
    ["Brüt ve net kira getirisi farkı nedir?", "Brüt getiri yalnızca kira ve fiyatı kullanır. Net getiri ise yıllık kiradan bakım, emlak vergisi, sigorta ve boş kalma kaybını düşer, fiyata da tapu harcı ve komisyon gibi alım masraflarını ekler. Net getiri her zaman brütten düşüktür."],
    ["Türkiye ortalama amortisman süresi kaç yıl?", "Türkiye geneli için resmî bir amortisman istatistiği yoktur. Özel endeksler il ve ilçeye göre çok farklı süreler gösterir. En doğru yöntem, almayı düşündüğünüz bölgedeki benzer evlerin güncel satış ve kira ilanlarıyla kendi hesabınızı yapmaktır."],
    ["Aidat ve vergiler hesaba nasıl katılır?", "Ev sahibine kalan yıllık giderler kira gelirinden düşülür. Aidat çoğunlukla kiracıya aittir, ancak ev boşken ev sahibi öder. Emlak vergisi, DASK ve sigorta ev sahibinin giderleridir. Kira geliri vergisi de beyan gerekiyorsa net getiriden düşülmelidir."],
    ["Metrekare fiyatı amortismanı nasıl etkiler?", "Amortisman süresi, metrekare satış fiyatının metrekare başına yıllık kiraya bölünmesiyle de bulunur. Metrekare fiyatı 40.000 TL ve metrekare aylık kirası 200 TL olan bir evde süre 40.000 bölü 2.400 eşittir 16,7 yıldır."],
    ["Kira artışı amortisman süresini kısaltır mı?", "Nominal olarak kısaltır: yıllık yüzde 20 kira artışıyla 16,7 yıllık süre yaklaşık 8 yıla iner. Ancak kiralar enflasyonla birlikte arttığında paranın alım gücü de düşer; bu yüzden reel getiriye bakmak daha sağlıklı bir değerlendirme sağlar."],
    ["Kiradaki ev mi, mevduat mı sorusu nasıl karşılaştırılır?", "Evin toplam getirisini net kira getirisi ile beklenen yıllık değer artışının toplamı olarak düşünün ve mevduatın stopaj sonrası faiziyle karşılaştırın. Likidite, kiracı riski, satış masrafı ve yatırım süresi gibi farkları da karara katın."],
    ["Yüzde 5 kira getirisi kaç yıllık amortisman demektir?", "Amortisman süresi brüt kira getirisinin tersidir. Yüzde 5 getiri 100 bölü 5 eşittir 20 yıl, yüzde 4 getiri 25 yıl, yüzde 8 getiri ise 12,5 yıllık brüt amortisman süresine karşılık gelir."]
  ],
  tools: ["kira-getirisi-hesapla", "geri-odeme-suresi-hesapla", "metrekare-fiyati-hesapla", "kira-artis-hesapla"],
  related: ["kira-geliri-vergisi-nasil-hesaplanir", "emlak-vergisi-nasil-hesaplanir", "pesin-mi-taksit-mi-hesaplama"],
  sources: [
    ["TCMB – Konut Fiyat Endeksi", "https://www.tcmb.gov.tr/"],
    ["TÜİK – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, örnek tutarlar varsayımdır"
};
