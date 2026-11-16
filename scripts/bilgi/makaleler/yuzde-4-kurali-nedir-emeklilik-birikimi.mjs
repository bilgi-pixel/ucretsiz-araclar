export default {
  slug: "yuzde-4-kurali-nedir-emeklilik-birikimi",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "%4 Kuralı Nedir? Emeklilik İçin Ne Kadar Birikim Gerektiği Nasıl Hesaplanır",
  pageTitle: "%4 Kuralı Nedir? 25 Kat Kuralı ve Emeklilik Birikimi Hesabı",
  description: "%4 kuralı, birikimin ilk yılında %4'ünü çekip sonra enflasyona göre artırmanın uzun süre yetebileceğini söyler; hedef yıllık giderin 25 katıdır. Varsayımlar, sınırlar.",
  keywords: ["yüzde 4 kuralı", "4 kuralı emeklilik", "finansal özgürlük hesaplama", "fire hesaplama", "emeklilik birikimi ne kadar", "25 kat kuralı", "güvenli çekim oranı", "reel getiri emeklilik"],
  lead: "%4 kuralı, emeklilikte birikimin ilk yıl %4'ünü harcayıp sonraki yıllarda bu tutarı yalnızca enflasyon kadar artırırsanız, birikimin geçmiş piyasa verilerine göre en az 30 yıl yetmiş olduğunu söyleyen bir planlama kuralıdır. Tersinden okunduğunda hedef birikim, yıllık giderin 25 katıdır: yılda 600.000 TL harcayan biri için 15 milyon TL. Kural ABD verilerine dayanır, getiri garantisi değildir ve Türkiye gibi yüksek enflasyonlu ortamlarda yalnızca reel (enflasyondan arındırılmış) tutarlarla anlamlıdır. Aşağıda hesabı, varsayımları ve sınırlarını bulacaksınız.",
  kisaCevap: [
    "%4 kuralı: emekliliğin ilk yılında birikimin %4'ü çekilir, sonraki yıllarda çekilen tutar enflasyon oranında artırılır.",
    "Hedef birikim = yıllık gider × 25, çünkü 1 ÷ 0,04 = 25.",
    "Daha temkinli oranlar daha büyük hedef demektir: %3,5 için 28,6 kat, %3 için 33,3 kat.",
    "Kural 1990'larda ABD hisse ve tahvil verileriyle, 30 yıllık emeklilik süresi için türetilmiştir; garanti değildir.",
    "Yüksek enflasyonda tüm tutarlar bugünkü TL ile, getiri ise reel getiri olarak düşünülmelidir.",
    "Beklenen SGK emekli aylığı yıllık giderden düşülürse birikimle karşılanacak tutar ve hedef küçülür."
  ],
  figure: {
    alt: "%4 kuralının mantığı: yıllık gider 600.000 TL çarpı 25 eşittir 15 milyon TL hedef. SGK aylığı yılda 240.000 TL karşılarsa kalan 360.000 TL çarpı 25 eşittir 9 milyon TL. Altta çekim oranına göre gereken kat: yüzde 4 için 25, yüzde 3,5 için 28,6, yüzde 3 için 33,3.",
    caption: "Hedef birikim yıllık giderin çekim oranına bölünmesiyle bulunur. Emekli aylığı gibi düzenli gelirler önce giderden düşülür. Tutarlar bugünkü TL ile ifade edilmiş örneklerdir; yatırım tavsiyesi değildir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">%4 kuralı: hedef birikim nasıl bulunur?</text>
  <rect x="30" y="54" width="200" height="70" rx="8" class="sf sb"/>
  <text x="130" y="80" class="sm mid t2">Yıllık gider (bugünkü TL)</text>
  <text x="130" y="106" class="b lg mid">600.000 TL</text>
  <text x="252" y="98" class="xl mid p">× 25</text>
  <rect x="280" y="54" width="200" height="70" rx="8" class="p"/>
  <text x="380" y="80" class="sm mid sf">Hedef birikim</text>
  <text x="380" y="106" class="b lg mid sf">15.000.000 TL</text>
  <rect x="500" y="54" width="190" height="70" rx="8" class="ps"/>
  <text x="595" y="80" class="sm mid">İlk yıl çekim</text>
  <text x="595" y="106" class="b mid">%4 = 600.000 TL</text>
  <text x="30" y="160" class="b">Emekli aylığı hesaba katılırsa</text>
  <rect x="30" y="172" width="400" height="36" rx="6" class="oks"/>
  <text x="44" y="196" class="sm b">SGK aylığı (örnek): 240.000 TL/yıl</text>
  <rect x="430" y="172" width="260" height="36" rx="6" class="ps"/>
  <text x="444" y="196" class="sm b">Kalan: 360.000 TL</text>
  <text x="30" y="232" class="sm t2">360.000 × 25 = 9.000.000 TL birikim yeterli olur</text>
  <text x="30" y="272" class="b">Çekim oranına göre gereken kat</text>
  <rect x="30" y="286" width="250" height="32" rx="4" class="ps"/>
  <text x="290" y="308" class="sm b">%4 → 25 kat</text>
  <rect x="30" y="326" width="286" height="32" rx="4" class="ps"/>
  <text x="326" y="348" class="sm b">%3,5 → 28,6 kat</text>
  <rect x="30" y="366" width="333" height="32" rx="4" class="p"/>
  <text x="373" y="388" class="sm b">%3 → 33,3 kat</text>
</svg>`
  },
  sections: [
    {
      h: "%4 kuralı nedir, nereden çıktı?",
      p: [
        "%4 kuralı, emekliliğe ne kadar birikimle girilmesi gerektiğini tahmin etmek için kullanılan basit bir planlama kuralıdır. 1990'larda ABD'de yapılan araştırmalar, hisse senedi ve tahvilden oluşan karma bir portföyden ilk yıl birikimin %4'ü kadar para çekilip sonraki yıllarda bu tutar enflasyon kadar artırıldığında, geçmiş dönemlerin büyük çoğunluğunda birikimin 30 yıl boyunca tükenmediğini göstermiştir. Kural bu bulgunun sadeleştirilmiş hâlidir.",
        "Kural son yıllarda finansal bağımsızlık ve erken emeklilik (İngilizce kısaltmasıyla FIRE) akımında yaygınlaştı. Erken emeklilik hedefleyenler, \"yıllık giderimin 25 katını biriktirirsem çalışmak zorunda kalmam\" düşüncesini bu kurala dayandırır.",
        "Önemli bir nokta: %4 kuralı bir <strong>getiri vaadi</strong> değildir ve hangi yatırım aracının seçileceğini söylemez. Bir planlama varsayımıdır. Bu yazı da yatırım tavsiyesi vermez; yalnızca hesabın matematiğini ve varsayımlarını açıklar."
      ]
    },
    {
      h: "Yıllık giderin 25 katı neden hedef kabul edilir?",
      p: [
        "Kuralın tersinden okunuşu çok basittir. Yılda birikimin %4'ünü çekecekseniz ve bu tutar yıllık giderinizi karşılamalıysa, birikim yıllık giderin 1 ÷ 0,04 = 25 katı olmalıdır. Daha temkinli bir çekim oranı seçtiğinizde kat sayısı yükselir."
      ],
      formula: "Hedef birikim = yıllık gider ÷ çekim oranı\n%4 için: yıllık gider × 25\nİlk yıl çekim = birikim × 0,04; sonraki yıllar = önceki yıl × (1 + enflasyon)",
      table: {
        head: ["Çekim oranı", "Gereken kat", "Yıllık gider 360.000 TL", "Yıllık gider 600.000 TL"],
        rows: [
          ["%5", "20", "7.200.000 TL", "12.000.000 TL"],
          ["%4", "25", "9.000.000 TL", "15.000.000 TL"],
          ["%3,5", "28,6", "10.285.714 TL", "17.142.857 TL"],
          ["%3", "33,3", "12.000.000 TL", "20.000.000 TL"]
        ],
        caption: "Tutarlar bugünkü TL ile ifade edilmiş örneklerdir. Emeklilik süresi uzadıkça daha düşük çekim oranı daha temkinli kabul edilir."
      },
      after: [
        "Erken emeklilikte birikimin 30 değil 40–50 yıl yetmesi gerekebilir. Bu nedenle erken emeklilik planlayanlar çoğu zaman %3–3,5 gibi daha düşük oranlarla hesap yapar."
      ]
    },
    {
      h: "Çözümlü örnek: hedef birikim ve SGK emekli aylığı",
      p: [
        "Aylık 50.000 TL, yani yılda 600.000 TL harcayan bir hane düşünelim. Tüm gider birikimden karşılanacaksa hedef 600.000 × 25 = 15.000.000 TL'dir. Ancak çoğu kişi emeklilikte SGK'dan aylık da alacaktır; bu gelir birikimden çekilmesi gereken tutarı azaltır."
      ],
      ol: [
        "Yıllık gideri bugünkü fiyatlarla yazın: 50.000 × 12 = 600.000 TL.",
        "Beklenen emekli aylığını bugünkü TL ile tahmin edin: örnek olarak aylık 20.000 TL, yılda 240.000 TL.",
        "Birikimle karşılanacak gider: 600.000 − 240.000 = 360.000 TL.",
        "Hedef birikim: 360.000 × 25 = 9.000.000 TL.",
        "İlk yıl çekim: 9.000.000 × 0,04 = 360.000 TL; ertesi yıl bu tutar enflasyon kadar artırılır."
      ],
      after: [
        "Emekli aylığının ne zaman başlayacağı ve tutarı prim günü, prim tutarları ve emeklilik yaşına bağlıdır. SGK'nın e-Devlet üzerindeki hizmet dökümü ve emeklilik tarihi sorgulama ekranları bu tahmini gerçekçi kılmanın en iyi yoludur. Prim günü hesabı için [[bilgi:sgk-prim-gunu-nasil-hesaplanir|SGK prim günü]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Reel getiri hesabı bu kuralda neden önemlidir?",
      p: [
        "%4 kuralının arkasındaki araştırmalar, birikimin enflasyonun üzerinde ortalama bir reel getiri sağladığı varsayımına dayanır. Kuralın işlemesi için önemli olan nominal faiz ya da getiri değil, <strong>reel getiridir</strong>. Nominal getirisi %40 olan bir birikim, enflasyon %32 iken reel olarak yalnızca yaklaşık %6 büyür."
      ],
      formula: "Reel getiri = (1 + nominal getiri) ÷ (1 + enflasyon) − 1\nÖrnek: 1,40 ÷ 1,32 − 1 = 0,0606 → yaklaşık %6,1",
      after: [
        "Bu nedenle hesapları her zaman <strong>bugünkü TL</strong> ile yapmak gerekir. \"Yirmi yıl sonra 15 milyon TL\" demek anlamsızdır, çünkü o tarihte 15 milyon TL'nin alım gücü bugünkünden çok farklı olacaktır. Doğru ifade, \"bugünkü fiyatlarla 15 milyon TL'lik alım gücü\"dür. Reel faizin mantığını [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz nedir]] yazısında bulabilir, kendi rakamlarınızı [[arac:reel-faiz-hesapla|Reel Faiz Hesaplama]] aracıyla deneyebilirsiniz. Paranın değerinin zamanla nasıl eridiğini görmek için [[arac:enflasyon-hesapla|Enflasyon Hesaplama]] aracı da faydalıdır."
      ]
    },
    {
      h: "Çekim tutarı yıllar içinde nasıl artar?",
      p: [
        "Kuralın sık yanlış anlaşılan yanı, her yıl birikimin o anki değerinin %4'ünün çekilmediğidir. Yalnızca ilk yıl %4 çekilir; sonraki yıllarda çekim tutarı, birikimin değerinden bağımsız olarak enflasyon kadar artırılır. Böylece harcamanın alım gücü sabit kalır. Aşağıdaki tablo, 9 milyon TL birikimle başlayan ve enflasyonun örnek olarak her yıl %30 olduğu bir senaryoda çekilecek nominal tutarı gösterir."
      ],
      table: {
        head: ["Yıl", "Hesap", "Nominal çekim", "Bugünkü TL karşılığı"],
        rows: [
          ["1", "9.000.000 × %4", "360.000 TL", "360.000 TL"],
          ["2", "360.000 × 1,30", "468.000 TL", "360.000 TL"],
          ["3", "468.000 × 1,30", "608.400 TL", "360.000 TL"]
        ],
        caption: "Enflasyon oranı yalnızca örnektir. Nominal tutar her yıl büyür, alım gücü sabit kalır."
      }
    },
    {
      h: "%4 kuralı yüksek enflasyonlu ülkelerde işler mi?",
      p: [
        "Kuralın matematiği her ülkede aynıdır ama arkasındaki tarihsel veriler ABD piyasalarına aittir. Türkiye gibi enflasyonun yüksek ve oynak, döviz kurlarının değişken olduğu ekonomilerde aynı başarı oranının geçerli olacağına dair bir kanıt yoktur. Bu yüzden kuralı kesin bir sınır değil, kaba bir başlangıç noktası olarak kullanmak gerekir.",
        "Yüksek enflasyon ortamında dikkat edilmesi gereken başlıca riskler şunlardır: getirinin enflasyonun altında kaldığı yıllar, birikimin döviz ya da faiz gibi tek bir unsura aşırı bağımlı olması ve emeklilik giderlerinin genel enflasyondan hızlı artması (sağlık ve kira gibi). Bu risklere karşı birçok planlamacı daha düşük çekim oranı, daha büyük nakit tamponu ve esnek harcama planı önerir."
      ]
    },
    {
      h: "Hedefe kaç yılda ulaşılır?",
      p: [
        "Hedef birikime ulaşma süresi; mevcut birikime, her yıl eklenen tutara ve reel getiriye bağlıdır. Hepsinin bugünkü TL ile düşünülmesi gerekir. Aşağıdaki tabloda bugün 1.000.000 TL birikimi olan ve her yıl bugünkü değerle 240.000 TL (aylık 20.000 TL) ekleyen biri için 9.000.000 TL hedefe ulaşma süresi gösterilmiştir."
      ],
      table: {
        head: ["Varsayılan reel getiri", "Hedefe ulaşma süresi", "Süre sonundaki birikim (bugünkü TL)"],
        rows: [
          ["%2", "25 yıl", "yaklaşık 9,33 milyon TL"],
          ["%3", "22 yıl", "yaklaşık 9,24 milyon TL"],
          ["%4", "20 yıl", "yaklaşık 9,34 milyon TL"]
        ],
        caption: "Hesap yıllık bileşik büyüme ve yıl sonu katkı varsayımıyla yapılmıştır. Getiri oranları varsayımdır, garanti değildir."
      },
      after: [
        "Hedef süresini kendi rakamlarınızla hesaplamak için [[arac:hedef-birikim-suresi-hesapla|Hedef Birikim Süresi Hesaplama]], belirli bir süre sonunda biriken tutarı görmek için [[arac:birikim-hesapla|Birikim Hesaplama]] aracını kullanabilirsiniz. Aylık ne kadar ayırmanız gerektiğini düşünüyorsanız [[bilgi:maasin-yuzde-kaci-biriktirilmeli-tasarruf-orani|maaşın yüzde kaçı biriktirilmeli]] yazısı yol gösterir."
      ]
    },
    {
      h: "Kuralın varsayımları ve sınırları",
      ul: [
        "<strong>Süre varsayımı:</strong> Orijinal çalışmalar 30 yıllık emekliliği esas alır. Daha uzun süreler için oran düşürülmelidir.",
        "<strong>Portföy varsayımı:</strong> Hisse ve tahvil karışımı bir portföy esas alınmıştır. Tamamen mevduatta ya da tek bir araçta tutulan birikim için sonuç farklı olabilir.",
        "<strong>Sıra riski:</strong> Emekliliğin ilk yıllarında yaşanan büyük kayıplar, ortalama getiri aynı olsa bile birikimi çok daha hızlı eritebilir.",
        "<strong>Sabit harcama varsayımı:</strong> Kural her yıl aynı reel harcamayı varsayar; gerçek hayatta sağlık giderleri yaşla artabilir, seyahat gibi giderler azalabilir.",
        "<strong>Vergi ve masraflar:</strong> Getiriler üzerindeki vergiler ve yönetim ücretleri hesaba katılmazsa gerçek çekilebilir tutar daha düşük olur.",
        "<strong>Esneklik:</strong> Kötü yıllarda harcamayı biraz kısabilen biri için kural daha güvenli işler; harcaması tamamen sabit olan biri için risk daha yüksektir."
      ]
    },
    {
      h: "Erken emeklilik hedefi hesaplanırken sık yapılan hatalar",
      ul: [
        "<strong>Nominal rakamlarla hesap yapmak:</strong> Gelecekteki TL ile bugünkü TL'yi karıştırmak hedefi anlamsız kılar.",
        "<strong>Gideri eksik yazmak:</strong> Sağlık, araç yenileme, ev bakımı ve yıllık bir kez yapılan ödemeler unutulmamalıdır.",
        "<strong>Emekli aylığını iki kez saymak:</strong> SGK aylığı önce giderden düşülmeli, sonra 25 ile çarpılmalıdır.",
        "<strong>Tek bir kurala güvenmek:</strong> %4 kuralı bir başlangıç tahminidir; kişisel durumunuz için bir uzmanla görüşmek daha sağlıklıdır.",
        "<strong>Acil durum fonunu atlamak:</strong> Birikimin bir kısmını kolay ulaşılabilir tutmak, kötü bir yılda yatırımları zararına satma zorunluluğunu azaltır. Hızlı bir kural için [[bilgi:72-kurali-nedir|72 kuralı]] birikimin kaç yılda ikiye katlanacağını tahmin etmeye yarar."
      ]
    }
  ],
  faq: [
    ["%4 kuralı nedir?", "%4 kuralı, emekliliğin ilk yılında birikimin yüzde 4'ünü çekip sonraki yıllarda bu tutarı enflasyon kadar artırmanın, geçmiş ABD piyasa verilerine göre birikimin çoğu dönemde 30 yıl yetmesini sağladığını söyleyen bir planlama kuralıdır."],
    ["Yıllık giderin 25 katı neden hedef birikim kabul edilir?", "Yıllık gider birikimin yüzde 4'üne eşit olacaksa birikim, gideri 0,04'e bölerek bulunur; bu da 25 kata denk gelir. Yılda 600.000 TL harcayan biri için hedef 15.000.000 TL'dir."],
    ["%4 kuralı yüksek enflasyonlu ülkelerde işler mi?", "Kuralın matematiği her yerde aynıdır ama dayandığı tarihsel veriler ABD'ye aittir. Yüksek ve oynak enflasyonlu ekonomilerde aynı başarının garantisi yoktur; tutarlar reel düşünülmeli ve daha temkinli bir çekim oranı tercih edilebilir."],
    ["Reel getiri hesabı bu kuralda neden önemlidir?", "Kural, birikimin enflasyonun üzerinde büyüdüğünü varsayar. Nominal getiri enflasyona yakınsa birikim reel olarak büyümez ve çekimler birikimi hızla eritir. Reel getiri, nominal getirinin enflasyondan arındırılmış hâlidir."],
    ["Erken emeklilik (FIRE) hedefi nasıl hesaplanır?", "Bugünkü fiyatlarla yıllık gider belirlenir, varsa beklenen emekli aylığı düşülür ve kalan tutar seçilen çekim oranına bölünür. Erken emeklilikte süre uzun olduğu için çoğu kişi yüzde 4 yerine yüzde 3–3,5 kullanır."],
    ["Hedefe kaç yılda ulaşılacağı nasıl bulunur?", "Mevcut birikim, yıllık katkı ve varsayılan reel getiri bileşik büyüme formülüyle yıl yıl ilerletilir. Bugün 1 milyon TL'si olan ve yılda 240.000 TL ekleyen biri yüzde 3 reel getiri varsayımıyla 9 milyon TL'ye yaklaşık 22 yılda ulaşır."],
    ["Kuralın varsayımları ve sınırları nelerdir?", "Kural 30 yıllık emeklilik, hisse ve tahvil karışımı portföy ve her yıl sabit reel harcama varsayar. İlk yıllardaki büyük kayıplar, vergiler, masraflar ve sağlık giderlerindeki artış kuralın sonucunu olumsuz etkileyebilir."],
    ["SGK emekli maaşı hesaba nasıl katılır?", "Beklenen yıllık emekli aylığı bugünkü TL ile yıllık giderden düşülür; kalan tutar 25 ile çarpılır. Yıllık gideri 600.000 TL olan ve yılda 240.000 TL aylık bekleyen birinin hedefi 9 milyon TL'ye iner."],
    ["%4 kuralı yatırım tavsiyesi midir?", "Hayır. Kural yalnızca ne kadar birikim gerekebileceğini kabaca tahmin etmeye yarayan bir planlama varsayımıdır. Hangi araçlara yatırım yapılacağını söylemez ve hiçbir getiriyi garanti etmez; kişisel kararlar için lisanslı bir uzmana danışılmalıdır."],
    ["Her yıl birikimin yüzde 4'ü mü çekilir?", "Hayır. Yüzde 4 yalnızca ilk yılın çekim tutarını belirler. Sonraki yıllarda çekilen tutar, birikimin o anki değerine bakılmaksızın önceki yılın tutarının enflasyon oranında artırılmasıyla bulunur; böylece harcamanın alım gücü sabit kalır."]
  ],
  tools: ["birikim-hesapla", "hedef-birikim-suresi-hesapla", "reel-faiz-hesapla", "enflasyon-hesapla"],
  related: ["reel-faiz-nedir-nasil-hesaplanir", "birikim-hedefine-kac-ayda-ulasilir", "72-kurali-nedir", "enflasyona-gore-paranin-degeri"],
  sources: [
    ["SGK – Emeklilik ve hizmet dökümü işlemleri", "https://www.sgk.gov.tr/"],
    ["TÜİK – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; örnekler varsayımlara dayanır ve getiri garantisi içermez, kişisel kararlarınız için lisanslı bir yatırım danışmanına başvurun"
};
