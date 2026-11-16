export default {
  slug: "ortalama-vade-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Ortalama Vade Nasıl Hesaplanır? Çek, Senet ve Fatura Vadelerini Birleştirme",
  pageTitle: "Ortalama Vade Nasıl Hesaplanır? Çek ve Fatura Vade Ortalaması",
  description: "Ortalama vade, her tutarın vade günüyle çarpılıp toplamın toplam tutara bölünmesiyle bulunur. Çek örneği, ortalama vade tarihi, vade farkı ve tablo formülü.",
  keywords: ["ortalama vade hesaplama", "vade ortalaması", "çek ortalama vadesi", "ağırlıklı ortalama vade", "ortalama vade tarihi", "fatura vade hesabı", "cari hesap vade", "vade farkı hesaplama"],
  lead: "Ortalama vade, farklı tarihlerde ödenecek birden çok çek, senet ya da faturanın, toplam tutarın tek bir günde ödenmesi hâlinde denk geleceği <strong>tutar ağırlıklı ortalama süredir</strong>. Her kalemin tutarı vade günüyle çarpılır, bu çarpımlar toplanır ve toplam tutara bölünür. Örneğin 10.000 TL 30 günlük, 20.000 TL 60 günlük ve 30.000 TL 90 günlük üç çekin ortalama vadesi (300.000 + 1.200.000 + 2.700.000) ÷ 60.000 = <strong>70 gündür</strong>; basit ortalamayla bulunacak 60 gün yanıltıcıdır. Bu sayfada formülü, ortalama vade tarihini, vade farkını, cari hesap ekstresinde kullanımı ve tedarikçi pazarlığındaki yerini anlatıyoruz.",
  kisaCevap: [
    "Ortalama vade (gün) = Σ (tutar × vade günü) ÷ Σ tutar.",
    "Vade günleri aynı başlangıç tarihinden sayılmalıdır (bugün, fatura tarihi ya da ekstre tarihi).",
    "Ortalama vade tarihi = başlangıç tarihi + ortalama vade günü.",
    "Ağırlıklandırma tutara göre yapılır, çünkü büyük tutarın geç ödenmesi küçük tutarın geç ödenmesinden daha değerlidir.",
    "Basit ortalama yalnızca tüm tutarlar eşitse doğru sonuç verir.",
    "Vade farkı yaklaşık olarak toplam tutar × aylık oran × gün ÷ 30 ile tahmin edilir; oran taraflarca ya da sözleşmeyle belirlenir."
  ],
  figure: {
    alt: "Üç çekin zaman çizelgesi: 10.000 TL 30. gün, 20.000 TL 60. gün, 30.000 TL 90. gün. Tutarlar daire büyüklüğüyle gösteriliyor, ağırlıklı ortalama vade 70. günde, basit ortalama 60. günde işaretli.",
    caption: "Çekler zaman çizelgesinde tutarlarıyla orantılı dairelerle gösterilmiştir. Ağırlık merkezi en büyük çekin bulunduğu 90. güne doğru kayar ve 70. güne düşer. Basit ortalama (60. gün) tutar farkını yok saydığı için erken çıkar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Tutar ağırlıklı ortalama vade</text>
  <line x1="60" y1="200" x2="680" y2="200" class="st sw" fill="none"/>
  <g class="sm mid mu"><text x="60" y="228">0. gün</text><text x="240" y="228">30</text><text x="420" y="228">60</text><text x="600" y="228">90</text></g>
  <line x1="60" y1="192" x2="60" y2="208" class="st" fill="none"/>
  <circle cx="240" cy="200" r="22" class="ps"/><text x="240" y="160" class="sm mid b">10.000 TL</text>
  <circle cx="420" cy="200" r="32" class="ps"/><text x="420" y="152" class="sm mid b">20.000 TL</text>
  <circle cx="600" cy="200" r="40" class="p"/><text x="600" y="146" class="sm mid b">30.000 TL</text>
  <line x1="480" y1="90" x2="480" y2="250" class="sok sw" fill="none"/>
  <text x="480" y="80" class="b mid ok">Ağırlıklı ortalama: 70. gün</text>
  <line x1="420" y1="250" x2="420" y2="270" class="sdg dash" fill="none"/>
  <text x="420" y="288" class="sm mid dg">basit ortalama 60. gün (yanlış)</text>
  <rect x="60" y="306" width="620" height="80" rx="10" class="sf sb"/>
  <text x="76" y="332" class="b">Hesap</text>
  <text x="76" y="354" class="sm">10.000×30 + 20.000×60 + 30.000×90 = 300.000 + 1.200.000 + 2.700.000 = 4.200.000</text>
  <text x="76" y="376" class="sm">4.200.000 ÷ 60.000 = <tspan class="b ok">70 gün</tspan> · Başlangıç 1 Ekim 2026 ise ortalama vade tarihi 10 Aralık 2026</text>
</svg>`
  },
  sections: [
    {
      h: "Ortalama vade nedir?",
      p: [
        "Ticarette alacak ve borçlar çoğu zaman tek bir tarihte değil, farklı vadelerde ödenir: biri ay sonuna, biri iki ay sonraya, biri sezon sonuna yazılmış çekler; 30, 60 ve 90 gün vadeli faturalar gibi. Bu kalemleri tek tek izlemek mümkündür ama toplam tablo hakkında hızlı bir fikir vermez. <strong>Ortalama vade</strong>, tüm bu kalemleri tek bir sayıya indirger: \"Bu paranın tamamı aslında ortalama kaç gün sonra tahsil edilecek ya da ödenecek?\"",
        "Ortalama vade, toptancı ve bayi ilişkilerinde, cari hesap mutabakatlarında, çek ve senetle yapılan tahsilatlarda ve tedarikçiyle vade pazarlığında sık kullanılır. Bir müşterinin verdiği çeklerin ortalama vadesi, sizin o müşteriye tanıdığınız vade süresini ne kadar uzattığını gösterir. Aynı sayı, finansman maliyetini ve vade farkını hesaplamanın da temelidir."
      ]
    },
    {
      h: "Ağırlıklı ortalama vade neden tutara göre yapılır?",
      p: [
        "Paranın zaman değeri vardır: 30.000 TL'yi 90 gün sonra almak, 10.000 TL'yi 90 gün sonra almaktan üç kat daha fazla finansman yükü demektir. Bu yüzden ortalama, her vadenin ne kadar parayı temsil ettiğini hesaba katmalıdır. Büyük tutarlı kalemin vadesi, ortalamayı kendine doğru çeker.",
        "Basit ortalama (vade günlerini toplayıp kalem sayısına bölmek) bu farkı yok sayar. Örnekteki üç çekte basit ortalama (30 + 60 + 90) ÷ 3 = 60 gündür; gerçek ağırlıklı ortalama ise 70 gündür. Aradaki 10 gün, 60.000 TL'lik bir toplamda hiç de küçük olmayan bir finansman farkı yaratır. Yalnızca tüm tutarlar eşit olduğunda iki yöntem aynı sonucu verir. Ortalama türleri arasındaki farkı ortalama türleri yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Birden çok çekin ortalama vadesi nasıl hesaplanır?",
      formula: "Ortalama vade (gün) = Σ (tutarᵢ × günᵢ) ÷ Σ tutarᵢ\ngünᵢ: her kalemin ortak başlangıç tarihinden vadesine kadar geçen gün",
      ol: [
        "Ortak bir başlangıç tarihi seçin: bugün, fatura tarihi ya da ekstre tarihi. Örnek: 1 Ekim 2026.",
        "Her çekin bu tarihten vadesine kadar geçen gün sayısını bulun: 31 Ekim → 30 gün, 30 Kasım → 60 gün, 30 Aralık → 90 gün.",
        "Her tutarı gün sayısıyla çarpın: 10.000 × 30 = 300.000; 20.000 × 60 = 1.200.000; 30.000 × 90 = 2.700.000.",
        "Çarpımları toplayın: 4.200.000.",
        "Toplam tutara bölün: 4.200.000 ÷ 60.000 = <strong>70 gün</strong>."
      ],
      table: {
        head: ["Çek", "Tutar", "Vade tarihi", "Gün", "Tutar × gün"],
        rows: [
          ["1", "10.000 TL", "31.10.2026", "30", "300.000"],
          ["2", "20.000 TL", "30.11.2026", "60", "1.200.000"],
          ["3", "30.000 TL", "30.12.2026", "90", "2.700.000"],
          ["Toplam", "60.000 TL", "", "", "4.200.000"]
        ],
        caption: "Ortalama vade 4.200.000 ÷ 60.000 = 70 gün. Tutarlar örnektir."
      },
      after: [
        "Gün sayılarını elle saymak yerine iki tarih arasındaki farkı hesaplayan bir araç kullanmak hata riskini azaltır; ayrıntı için [[rehber:tarih-farki-ve-gun-sayma|tarih farkı ve gün sayma rehberi]]. [[arac:ortalama-vade-hesapla|Ortalama Vade Hesaplama aracına]] her satıra tutarı ve vade gününü ya da vade tarihini yazmanız yeterlidir; araç ortalama vadeyi gün ve tarih olarak verir."
      ]
    },
    {
      h: "Ortalama vade tarihi nasıl bulunur?",
      p: [
        "Ortalama vade gününü başlangıç tarihine eklediğinizde <strong>ortalama vade tarihini</strong> bulursunuz. Örnekte 1 Ekim 2026 + 70 gün = 10 Aralık 2026'dır. Bu tarih, \"üç çekin toplamı olan 60.000 TL'yi tek seferde alsaydım, hangi gün almam denk olurdu?\" sorusunun cevabıdır.",
        "Sonuç küsuratlı çıkarsa (örneğin 57,4 gün) genellikle en yakın tam güne yuvarlanır. Tarih hafta sonuna ya da resmî tatile denk gelirse, uygulamada ödeme ya da tahsilat çoğu zaman bir sonraki iş gününe kayar; bu nedenle tarihi ilettiğiniz tarafla nasıl yuvarlanacağını önceden konuşun. Belirli bir tarihe gün eklemek için [[arac:vade-tarihi-hesapla|Vade Tarihi Hesaplama aracı]] haftanın gününü ve kalan gün sayısını da gösterir."
      ]
    },
    {
      h: "Vade farkı faizle nasıl hesaplanır?",
      p: [
        "Ortalama vade, vade farkı hesabını tek satıra indirir. Tüm kalemleri ayrı ayrı faizlendirmek yerine toplam tutarı ortalama vade kadar süreyle faizlendirmek, basit faiz kabulüyle aynı sonucu verir. Uygulanacak oran taraflar arasındaki anlaşmaya, sözleşmeye ya da piyasa koşullarına göre belirlenir; aşağıdaki oran yalnızca örnektir."
      ],
      formula: "Vade farkı ≈ toplam tutar × aylık oran × ortalama vade (gün) ÷ 30\nÖrnek: 60.000 × 0,03 × 70 ÷ 30 = 4.200 TL (aylık %3 örnek oran)",
      after: [
        "Bu hesap basit faiz yaklaşımıdır; uzun vadelerde ve yüksek oranlarda bileşik etki farkı büyütür. Peşin fiyata vade farkı eklemek, taksit tutarı bulmak ya da ters yönde oran hesaplamak için [[arac:vade-farki-hesapla|Vade Farkı Hesaplama aracını]] kullanabilirsiniz. Çekleri vadesinden önce bankaya kırdırmayı düşünüyorsanız iskonto hesabı farklıdır; ayrıntısı [[bilgi:cek-senet-iskonto-nedir|çek senet iskonto]] yazısında, hesabı [[arac:cek-senet-iskonto-hesapla|Çek Senet İskonto Hesaplama]] aracında."
      ]
    },
    {
      h: "Cari hesap ekstresinde ortalama vade nasıl okunur?",
      p: [
        "Bayi ve toptancılar cari hesap ekstresinde çoğu zaman \"ortalama vade\" ya da \"bakiye vadesi\" satırına yer verir. Bu değer, açık bakiyeyi oluşturan faturaların tutar ağırlıklı ortalama vadesidir. İki farklı biçimde gösterilebilir: ekstre tarihinden <strong>ileriye</strong> doğru (henüz vadesi gelmemiş borçların ortalama kaç gün sonra ödeneceği) ya da <strong>geriye</strong> doğru (vadesi geçmiş borçların ortalama kaç gün gecikmede olduğu)."
      ],
      ul: [
        "<strong>Pozitif ortalama vade:</strong> Bakiyenin ortalama vadesi henüz gelmemiştir; sayı, kalan süreyi gösterir.",
        "<strong>Negatif ya da \"gecikmiş\" ortalama vade:</strong> Bakiyenin ortalama vadesi geçmiştir; sayı ortalama gecikme gününü gösterir ve gecikme faizi ya da vade farkı gündeme gelebilir.",
        "<strong>Tahsilatların etkisi:</strong> Yapılan ödemeler genellikle en eski faturadan başlayarak kapatılır; bu yüzden ödeme yaptıktan sonra ortalama vade ileri kayar.",
        "<strong>Mutabakat:</strong> Ekstredeki ortalama vadeyi kendi kayıtlarınızla karşılaştırmak, gözden kaçmış bir fatura ya da yanlış tarihli bir ödemeyi ortaya çıkarabilir."
      ],
      after: [
        "Cari hesap ve tahsilat takibinin genel mantığı için [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe ve cari hesap takibi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Tedarikçiyle vade pazarlığında ortalama vade nasıl kullanılır?",
      p: [
        "Ortalama vade, iki tarafın farklı ödeme planlarını aynı ölçüye getirdiği için pazarlıkta ortak bir dil sağlar. Tedarikçi \"60 gün vade\" önerdiğinde, sizin farklı tutar ve tarihlerde vermeyi düşündüğünüz çeklerin ortalama vadesinin 60 günü aşıp aşmadığına bakarak teklifin uygun olup olmadığını hemen görebilirsiniz."
      ],
      ol: [
        "Tedarikçinin kabul ettiği ortalama vadeyi öğrenin; örneğin 60 gün.",
        "Vermeyi planladığınız çekleri yazın: 15.000 TL 30 gün, 25.000 TL 60 gün, 10.000 TL 90 gün.",
        "Ortalamayı hesaplayın: (450.000 + 1.500.000 + 900.000) ÷ 50.000 = 57 gün.",
        "57 gün, 60 günlük sınırın içindedir; plan kabul edilebilir. Sınırı aşıyorsa büyük tutarlı çeki öne çekmek ortalamayı en hızlı düşüren yoldur."
      ],
      after: [
        "Pazarlıkta ortalama vadenin yanında vade farkı oranı, peşin ödeme iskontosu ve gecikme koşulları da konuşulmalıdır. Peşin indirim ile vadeli fiyatı karşılaştırmak için [[bilgi:pesin-mi-taksit-mi-hesaplama|peşin mi taksit mi]] yazısındaki yöntem işletmeler için de geçerlidir."
      ]
    },
    {
      h: "Elektronik tablo programında ortalama vade formülü",
      p: [
        "Tutarlar B sütununda, vade günleri C sütununda (2. ile 10. satırlar arasında) ise ortalama vade tek formülle hesaplanır: İngilizce sürümde <code>=SUMPRODUCT(B2:B10;C2:C10)/SUM(B2:B10)</code>, Türkçe sürümde <code>=TOPLA.ÇARPIM(B2:B10;C2:C10)/TOPLA(B2:B10)</code>. Programınızın bölge ayarına göre bağımsız değişken ayracı virgül ya da noktalı virgül olabilir.",
        "Vade günü yerine vade tarihleri varsa önce her satırda tarih ile başlangıç tarihi arasındaki farkı ayrı bir sütunda hesaplayın (iki tarihi çıkarmak gün sayısını verir), sonra aynı formülü kullanın. Ortalama vade tarihini bulmak için başlangıç tarihine sonucu ekleyip hücreyi tarih biçimine çevirin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Basit ortalama almak:</strong> Tutarlar farklıysa vade günlerinin basit ortalaması yanlış sonuç verir.",
        "<strong>Farklı başlangıç tarihleri kullanmak:</strong> Bir kalemi fatura tarihinden, diğerini bugünden saymak ortalamayı bozar.",
        "<strong>Ay sayısını 30 gün varsaymak:</strong> Gerçek vade tarihleri varsa gün farkını takvimden hesaplayın.",
        "<strong>Vadesi geçmiş kalemleri sıfır gün saymak:</strong> Geçmiş vadeler negatif gün olarak ya da ayrı bir gecikme hesabıyla değerlendirilmelidir.",
        "<strong>Vade farkı oranını sabit sanmak:</strong> Oran anlaşmaya ve piyasa koşullarına göre değişir; örnek oranları gerçek teklif gibi kullanmayın."
      ]
    }
  ],
  faq: [
    ["Ortalama vade nedir?", "Farklı tarihlerde ödenecek birden çok çek, senet ya da faturanın, toplam tutar tek seferde ödenseydi denk geleceği tutar ağırlıklı ortalama süredir. Gün ya da tarih olarak ifade edilir."],
    ["Birden çok çekin ortalama vadesi nasıl hesaplanır?", "Her çekin tutarı ortak bir başlangıç tarihinden vadesine kadar geçen gün sayısıyla çarpılır, çarpımlar toplanır ve toplam tutara bölünür. 10.000 TL 30 gün, 20.000 TL 60 gün ve 30.000 TL 90 gün için sonuç 70 gündür."],
    ["Ağırlıklı ortalama vade neden tutara göre yapılır?", "Büyük tutarın geç ödenmesi, küçük tutarın geç ödenmesinden daha fazla finansman yükü yaratır. Tutara göre ağırlıklandırma bu farkı hesaba katar; basit ortalama yalnızca tutarlar eşitse doğrudur."],
    ["Ortalama vade tarihi nasıl bulunur?", "Ortalama vade günü, hesapta kullanılan başlangıç tarihine eklenir. 1 Ekim 2026'dan başlayan 70 günlük ortalama vade, 10 Aralık 2026 tarihine denk gelir; sonuç küsuratlıysa en yakın güne yuvarlanır."],
    ["Vade farkı faizle nasıl hesaplanır?", "Basit faiz kabulüyle vade farkı yaklaşık toplam tutar × aylık oran × ortalama vade günü ÷ 30 olarak bulunur. Aylık yüzde 3 örnek oranla 60.000 TL ve 70 gün için yaklaşık 4.200 TL eder; oran anlaşmaya göre değişir."],
    ["Cari hesap ekstresinde ortalama vade nasıl okunur?", "Ekstredeki ortalama vade, açık bakiyeyi oluşturan faturaların tutar ağırlıklı ortalama vadesidir. Pozitif değer kalan süreyi, gecikmiş ya da negatif değer ortalama gecikme gününü gösterir."],
    ["Tedarikçiyle vade pazarlığında ortalama vade nasıl kullanılır?", "Vermeyi planladığınız çeklerin ortalama vadesini hesaplayıp tedarikçinin kabul ettiği vadeyle karşılaştırırsınız. Sınır aşılıyorsa büyük tutarlı çeki öne çekmek ortalamayı en hızlı düşüren yoldur."],
    ["Excel'de ortalama vade formülü nedir?", "Elektronik tablo programında tutarlar B, günler C sütunundaysa Türkçe sürümde =TOPLA.ÇARPIM(B2:B10;C2:C10)/TOPLA(B2:B10), İngilizce sürümde =SUMPRODUCT(B2:B10;C2:C10)/SUM(B2:B10) formülü kullanılır. Bölge ayarına göre ayraç virgül olabilir."],
    ["Ortalama vade hesabında hafta sonları dikkate alınır mı?", "Hesap takvim günleriyle yapılır ve hafta sonu ayrımı yapılmaz. Bulunan tarih hafta sonuna ya da resmî tatile denk gelirse, uygulamada ödeme çoğunlukla sonraki iş gününe kayar; bunu taraflarla önceden netleştirin."]
  ],
  tools: ["ortalama-vade-hesapla", "vade-tarihi-hesapla", "vade-farki-hesapla", "cek-senet-iskonto-hesapla"],
  related: ["cek-senet-iskonto-nedir", "on-muhasebe-nedir-cari-hesap-takibi", "pesin-mi-taksit-mi-hesaplama"],
  uyari: "örnek oranlar ve tutarlar bilgilendirme amaçlıdır; finansman ve sözleşme kararlarınız için mali müşavirinize danışın"
};
