export default {
  slug: "gunde-kac-soru-cozulmeli",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "YKS ve LGS İçin Günde Kaç Soru Çözülmeli? Günlük Soru Hedefi Nasıl Belirlenir",
  pageTitle: "Günde Kaç Soru Çözülmeli? YKS ve LGS Günlük Soru Hedefi",
  description: "Günde kaç soru çözülmeli sorusunun tek cevabı yok; hedef toplam soru, kalan gün ve hızınızdan hesaplanır. YKS, LGS örnek plan, soru başı süre ve deneme analizi.",
  keywords: ["günde kaç soru çözülmeli", "yks için günde kaç soru", "lgs günde kaç soru", "günlük soru hedefi", "soru çözme hızı", "ders çalışma planı", "deneme analizi", "tyt soru başına süre"],
  lead: "Günde kaç soru çözmeniz gerektiği, <strong>toplam soru hedefinizin çalışacağınız gün sayısına bölünmesiyle</strong> bulunur; herkes için geçerli tek bir sayı yoktur. Örneğin sınava 200 gün kala haftada 6 gün çalışan ve 30.000 soru hedefleyen bir YKS adayı için günlük hedef yaklaşık 175 sorudur. Soru sayısı tek başına başarı getirmez: konuyu öğrendikten sonra çözülen, yanlışları analiz edilen ve sınav süresine uygun hızda çözülen soru verimlidir. Bu sayfada hedefi kendiniz hesaplamanın yolunu, soru başına süreyi ve deneme analizini anlatıyoruz.",
  kisaCevap: [
    "Günlük soru hedefi = toplam soru hedefi ÷ çalışılacak gün sayısı.",
    "Çalışılacak gün = kalan gün × (haftada çalışılan gün ÷ 7); 200 gün ve haftada 6 gün için yaklaşık 171 gün.",
    "TYT'de 120 soruya 165 dakika verilir; soru başına ortalama yaklaşık 1 dakika 22 saniye düşer.",
    "LGS'de sözel bölümde 50 soruya 75 dakika (1,5 dk/soru), sayısal bölümde 40 soruya 80 dakika (2 dk/soru) ayrılır.",
    "Yeni konu öğrenirken az ama dikkatli, tekrar döneminde daha çok ve süreli soru çözmek verimlidir.",
    "Her denemeden sonra yanlış ve boşların nedenini (bilgi, dikkat, süre) sınıflandırmak soru sayısını artırmaktan daha fazla katkı sağlar."
  ],
  figure: {
    alt: "Günlük soru hedefi hesap akışı: 30.000 soru hedefi, 200 gün kaldı, haftada 6 gün çalışma; 171 çalışma günü, günde 175 soru; soru başına 1,5 dakika ile yaklaşık 4 saat 22 dakika. Altta önerilen ders dağılımı çubuğu.",
    caption: "Hedef soru sayısı, kalan süre ve çözme hızı birlikte düşünülür. Sayılar örnektir; kendi seviyenize ve programınıza göre değiştirin.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Günlük soru hedefi nasıl hesaplanır? (örnek YKS adayı)</text>
  <rect x="24" y="56" width="152" height="84" rx="10" class="sf sb"/>
  <text x="100" y="86" class="sm mid t2">Toplam hedef</text><text x="100" y="116" class="b lg mid">30.000</text>
  <rect x="200" y="56" width="152" height="84" rx="10" class="sf sb"/>
  <text x="276" y="86" class="sm mid t2">Kalan gün</text><text x="276" y="116" class="b lg mid">200</text>
  <rect x="376" y="56" width="152" height="84" rx="10" class="sf sb"/>
  <text x="452" y="86" class="sm mid t2">Çalışma günü</text><text x="452" y="116" class="b lg mid">≈ 171</text>
  <rect x="552" y="56" width="144" height="84" rx="10" class="p"/>
  <text x="624" y="86" class="sm mid sf">Günlük hedef</text><text x="624" y="116" class="b lg mid sf">≈ 175</text>
  <text x="188" y="104" class="b mid p">÷</text><text x="364" y="104" class="b mid p">→</text><text x="540" y="104" class="b mid p">=</text>
  <text x="452" y="160" class="sm mid t2">200 × 6 ÷ 7 (haftada 1 gün dinlenme)</text>
  <rect x="24" y="178" width="672" height="64" rx="10" class="ps"/>
  <text x="44" y="204" class="b">Süre: 175 soru × 1,5 dakika ≈ 262 dakika (4 sa 22 dk)</text>
  <text x="44" y="228" class="sm">Bunun üzerine yanlış analizi ve konu tekrarı için ayrıca 1–1,5 saat ayırın.</text>
  <text x="24" y="276" class="b">Örnek günlük dağılım (175 soru)</text>
  <rect x="24" y="290" width="235" height="44" class="p"/>
  <rect x="259" y="290" width="168" height="44" class="ps"/>
  <rect x="427" y="290" width="134" height="44" class="oks"/>
  <rect x="561" y="290" width="135" height="44" class="sf sb"/>
  <text x="141" y="318" class="sm mid sf b">Matematik 60</text>
  <text x="343" y="318" class="sm mid b">Fen 45</text>
  <text x="494" y="318" class="sm mid b">Türkçe 35</text>
  <text x="628" y="318" class="sm mid b">Sosyal 35</text>
  <text x="360" y="366" class="sm mid t2">Dağılımı zayıf olduğunuz derslere ve alan hedefinize göre ayarlayın.</text>
</svg>`
  },
  sections: [
    {
      h: "Günde kaç soru çözülmeli? Tek bir doğru sayı yok",
      p: [
        "İnternette \"günde 300 soru\", \"günde 500 soru\" gibi kesin rakamlar sıkça dolaşır. Ancak bu sayılar kişinin seviyesini, sınava kalan süreyi, okul yükünü ve ders hedefini dikkate almaz. Konusunu yeni öğrenen bir öğrenci için 300 soru hem yorucu hem de verimsiz olabilir; tekrar dönemindeki deneyimli bir aday için ise az kalabilir.",
        "Daha sağlıklı yaklaşım, sayıyı tersten hesaplamaktır: önce sınava kadar toplam kaç soru çözmek istediğinizi belirleyin, sonra bunu gerçekten çalışabileceğiniz günlere bölün. Son olarak çıkan sayının günlük zamanınıza sığıp sığmadığını soru başına süreyle kontrol edin. Bu üç adım, hedefinizin hem iddialı hem de sürdürülebilir olmasını sağlar.",
        "Unutulmaması gereken nokta şudur: soru çözmek bir <strong>öğrenme ve pekiştirme</strong> aracıdır. Anlamadan geçilen, kontrol edilmeyen ya da yanlışı incelenmeyen soru, sayıyı büyütür ama puana dönüşmez."
      ]
    },
    {
      h: "Günlük soru hedefi formülü",
      formula: "Çalışma günü = kalan gün × (haftada çalışılan gün ÷ 7)\nGünlük soru hedefi = toplam soru hedefi ÷ çalışma günü\nGünlük soru süresi = günlük hedef × soru başına süre",
      p: [
        "Formülde \"haftada çalışılan gün\" bilinçli olarak yer alır. Haftada bir gün dinlenmek uzun vadede tükenmişliği önler; bu günü hesaptan baştan düşmek planı gerçekçi kılar. Okul sınavları, bayramlar ve hastalık gibi kayıplar için ayrıca yüzde 10 civarında pay bırakmak iyi bir alışkanlıktır.",
        "Bu hesabı [[arac:soru-dagilimi-hesapla|Günlük Soru Hedefi Hesaplama]] aracıyla yapabilirsiniz: toplam hedefi, kalan gün sayısını ve haftada kaç gün çalıştığınızı girin; günlük ve haftalık hedefi, gereken süreyle birlikte görün. Sınava tam olarak kaç gün kaldığını öğrenmek için [[arac:kac-gun-kaldi|Kaç Gün Kaldı]] sayacını kullanabilirsiniz."
      ]
    },
    {
      h: "YKS için günde kaç soru çözülmeli? Örnek hesap",
      p: [
        "Sınava 200 gün kalmış, haftada 6 gün çalışabilen ve sınava kadar 30.000 soru çözmeyi hedefleyen bir 12. sınıf öğrencisini düşünelim."
      ],
      ol: [
        "Çalışma günü: 200 × 6 ÷ 7 ≈ <strong>171 gün</strong>.",
        "Günlük hedef: 30.000 ÷ 171 ≈ <strong>175 soru</strong>.",
        "Süre: soru başına ortalama 1,5 dakikayla 175 × 1,5 ≈ 262 dakika, yani yaklaşık 4 saat 22 dakika.",
        "Analiz ve tekrar için 1–1,5 saat eklenince günlük çalışma 5,5–6 saati bulur; okul günlerinde bu süre yüksekse hafta sonuna daha fazla soru kaydırılır.",
        "Haftalık kontrol: 175 × 6 = 1.050 soru. Haftanın sonunda gerçekleşen sayıyı hedefle karşılaştırın, eksik kalırsa toplam hedefi değil sonraki haftanın dağılımını düzeltin."
      ],
      after: [
        "Toplam hedefin kendisi de seviyeye göre değişir. Konuların büyük kısmını henüz bitirmemiş bir öğrenci için ilk aylarda konu anlatımı ve az sayıda temel soru, son aylarda ise süreli deneme ve karışık soru setleri ağırlıkta olmalıdır. Bu yüzden günlük hedefi sabit tutmak yerine dönemlere ayırmak daha verimlidir."
      ]
    },
    {
      h: "LGS öğrencisi günde kaç soru çözmeli?",
      p: [
        "LGS'ye hazırlanan 8. sınıf öğrencisinin okul derslerini de sürdürmesi gerekir; bu yüzden günlük hedef YKS adayına göre daha düşük tutulur. Örneğin sınava 150 gün kalmışken haftada 6 gün çalışan ve 15.000 soru hedefleyen bir öğrenci için çalışma günü 150 × 6 ÷ 7 ≈ 129, günlük hedef 15.000 ÷ 129 ≈ 117 sorudur.",
        "LGS'de sözel bölümde 50 soruya 75 dakika, sayısal bölümde 40 soruya 80 dakika verildiği bilinmektedir. Bu da sözel sorularda ortalama 1,5 dakika, sayısal sorularda 2 dakika demektir. Günlük çalışmada bu süreye yakın çözmek sınav temposuna alışmayı sağlar. Sınav süreleri ve soru sayıları her yıl MEB'in yayımladığı başvuru ve uygulama kılavuzunda açıklanır; güncel bilgiyi oradan teyit edin.",
        "Bu yaş grubunda uyku, hareket ve dinlenme özellikle önemlidir. Sayı yetişmediği bir günü telafi etmek için gece geç saate kadar çalışmak, ertesi günün verimini düşürür. Planınızı [[bilgi:uyku-borcu-nedir-nasil-hesaplanir|uyku borcu yazısındaki]] önerilerle birlikte düşünün."
      ]
    },
    {
      h: "Bir soruya ortalama kaç dakika ayrılmalı?",
      p: [
        "Soru başına süre, sınav süresinin soru sayısına bölünmesiyle bulunur. Ancak sınavda optik form kodlama ve kontrol için de zaman gerektiğinden, çalışırken bu sürenin biraz altında çözmeyi hedeflemek avantaj sağlar."
      ],
      table: {
        head: ["Oturum", "Soru sayısı", "Süre", "Soru başına ortalama"],
        rows: [
          ["TYT", "120", "165 dakika", "≈ 1 dk 22 sn"],
          ["AYT (tüm testler)", "160", "180 dakika", "≈ 1 dk 8 sn; adaylar genellikle kendi alanındaki 80 soruyu çözer, bu durumda ≈ 2 dk 15 sn"],
          ["LGS sözel", "50", "75 dakika", "1 dk 30 sn"],
          ["LGS sayısal", "40", "80 dakika", "2 dk"]
        ],
        caption: "Soru sayıları ve süreler ÖSYM ile MEB'in son kılavuzlarına göredir; sınav yılında değişiklik olabileceği için başvuru kılavuzunu kontrol edin."
      },
      after: [
        "Ortalama süre her soruya eşit zaman ayırmanız gerektiği anlamına gelmez. Kısa ve bilgiye dayalı sorular 30–40 saniyede biterken, uzun paragraf ve problem soruları 3 dakikayı bulabilir. Kendi hızınızı ölçmek için [[arac:soru-cozme-hizi-hesapla|Soru Çözme Hızı Hesaplama]] aracına çözdüğünüz soru sayısını ve geçen süreyi yazın; bu hızla sınavı bitirip bitiremeyeceğinizi görürsünüz."
      ]
    },
    {
      h: "Soru sayısı mı, konu tekrarı mı daha önemli?",
      p: [
        "İkisi birbirinin alternatifi değil, tamamlayıcısıdır. Konuyu bilmeden soru çözmek tahmin yapmaya, soru çözmeden konu okumak ise bilginin sınavda kullanılamamasına yol açar. Etkili bir döngü şöyledir: konu öğrenilir, hemen ardından az sayıda temel soru çözülür, birkaç gün sonra karışık sorularla tekrar edilir, haftalar sonra deneme içinde yeniden karşılaşılır.",
        "Bu aralıklarla tekrar yöntemi, bilginin uzun süreli belleğe yerleşmesini sağlar. Ayrıntıları [[bilgi:aralikli-tekrar-yontemi-nedir|aralıklı tekrar yazısında]] bulabilirsiniz. Kısa ve odaklı çalışma blokları için [[bilgi:pomodoro-teknigi-nedir|Pomodoro tekniği]] de soru çözme seanslarını düzenlemeye yardımcı olur."
      ],
      table: {
        head: ["Dönem", "Ağırlık", "Günlük soru yaklaşımı"],
        rows: [
          ["Konu öğrenme", "Konu anlatımı + temel sorular", "Az sayıda, çözümlü ve dikkatli"],
          ["Pekiştirme", "Konu bazlı test", "Orta sayıda, süre tutarak"],
          ["Tekrar", "Karışık sorular, eski yanlışlar", "Yüksek sayıda, sınav temposunda"],
          ["Son haftalar", "Deneme + analiz", "Deneme günü ayrı, ertesi gün analiz"]
        ]
      }
    },
    {
      h: "Derslere göre soru dağılımı nasıl yapılır?",
      p: [
        "Günlük hedefi derslere bölerken üç ölçüt kullanın: sınavdaki soru ağırlığı, sizin o dersteki eksiğiniz ve dersin doğası. Matematik ve fen gibi işlem ağırlıklı dersler düzenli ve her gün az az çalışıldığında daha iyi gelişir; paragraf da günlük alışkanlıkla hızlanır. Sosyal bilimlerde ise kısa tekrarlar ve bilgi kartları soru çözümünü destekler."
      ],
      ul: [
        "Zayıf olduğunuz derse günlük hedefin daha büyük payını verin ama güçlü derslerinizi tamamen bırakmayın.",
        "Her gün en az bir paragraf ve bir problem seti çözmek hız kazandırır.",
        "Bir derste art arda çok sayıda yanlış yapıyorsanız soru sayısını azaltıp konuya geri dönün.",
        "Haftalık saatleri derslere oranlamak için [[arac:ders-calisma-plani-hesapla|Ders Çalışma Planı Hesaplama]] aracına derslerinizi ve önem ağırlıklarını yazabilirsiniz."
      ]
    },
    {
      h: "Deneme sınavı sonrası analiz nasıl yapılır?",
      p: [
        "Deneme sınavının asıl değeri, sonrasında yapılan analizdedir. Netinizi not etmekle kalmayın; her yanlış ve boşun nedenini sınıflandırın. Bu sınıflandırma, bir sonraki haftanın soru dağılımını belirler."
      ],
      ol: [
        "Her yanlış ve boşu işaretleyin: bilgi eksikliği mi, dikkat hatası mı, süre yetmedi mi, yoksa soruyu yanlış mı okudunuz?",
        "Bilgi eksikliği olan konuları listeleyin ve haftalık plana konu tekrarı olarak ekleyin.",
        "Dikkat hatalarında soruyu çözdükten sonra kısa bir kontrol alışkanlığı geliştirin.",
        "Süre sorununda hangi test bölümünde zaman kaybettiğinizi belirleyin ve o bölümde süreli çalışın.",
        "Yanlışlarınızı bir defterde toplayın ve bir hafta, bir ay sonra yeniden çözün."
      ],
      after: [
        "Netlerinizi deneme deneme bir tabloya yazmak, gelişmeyi somut görmenizi sağlar. Tek bir denemedeki düşüş paniğe neden olmamalı; birkaç denemelik ortalama daha güvenilir bir göstergedir."
      ]
    },
    {
      h: "Haftalık çalışma programı nasıl hazırlanır?",
      ol: [
        "Sınav tarihine kalan günü ve haftada çalışabileceğiniz günü belirleyin.",
        "Toplam soru hedefinizi koyun ve günlük hedefi hesaplayın.",
        "Okul saatlerini, ulaşımı, uykuyu ve yemek saatlerini takvime işleyin; kalan boşluklara 40–50 dakikalık çalışma blokları yerleştirin.",
        "Her bloğa bir ders ve soru sayısı atayın; zor dersleri en dinç olduğunuz saatlere koyun.",
        "Haftada bir deneme ve bir analiz günü planlayın; bir günü dinlenmeye ayırın.",
        "Hafta sonunda gerçekleşeni hedefle karşılaştırın ve bir sonraki haftayı buna göre ayarlayın."
      ],
      after: [
        "Plan yaparken hedeflerinizi ölçülebilir ve zamana bağlı yazmak motivasyonu artırır; bunun için [[bilgi:smart-hedef-nedir-nasil-yazilir|SMART hedef yazısındaki]] yöntemi kullanabilirsiniz. Sınav kaygısı, uyku sorunu ya da uzun süreli yorgunluk yaşıyorsanız okulunuzun rehberlik servisine başvurmaktan çekinmeyin."
      ]
    }
  ],
  faq: [
    ["YKS için günde kaç soru çözülmeli?", "Herkes için tek bir sayı yoktur; toplam soru hedefinizi çalışabileceğiniz gün sayısına bölerek bulunur. Örneğin 200 gün kala haftada 6 gün çalışan ve 30.000 soru hedefleyen bir aday için günlük hedef yaklaşık 175 sorudur."],
    ["LGS öğrencisi günde kaç soru çözmeli?", "LGS öğrencisi okul derslerini de sürdürdüğü için hedef daha düşük tutulur. 150 gün kala haftada 6 gün çalışan ve 15.000 soru hedefleyen bir öğrenci için günlük hedef yaklaşık 117 soru çıkar."],
    ["Sınava kalan güne göre soru hedefi nasıl belirlenir?", "Önce kalan günü haftada çalıştığınız gün oranıyla çarparak gerçek çalışma gününü bulun. Ardından toplam soru hedefinizi bu sayıya bölün ve çıkan sayının günlük zamanınıza sığıp sığmadığını soru başına süreyle kontrol edin."],
    ["Soru sayısı mı konu tekrarı mı daha önemli?", "İkisi birbirini tamamlar. Konu öğrenilmeden çözülen soru tahmine, soru çözülmeden yapılan tekrar ise sınavda kullanılamayan bilgiye dönüşür. Konu öğrenme, temel soru, aralıklı tekrar ve deneme döngüsü en verimli yoldur."],
    ["Bir soruya ortalama kaç dakika ayrılmalı?", "TYT'de 120 soruya 165 dakika verildiği için soru başına yaklaşık 1 dakika 22 saniye düşer. LGS'de sözel sorularda 1,5 dakika, sayısal sorularda 2 dakika ortalamadır; çalışırken bu sürenin biraz altını hedeflemek avantaj sağlar."],
    ["Derslere göre soru dağılımı nasıl yapılır?", "Sınavdaki soru ağırlığı, sizin o dersteki eksiğiniz ve dersin doğası birlikte dikkate alınır. Zayıf derse daha büyük pay verilir, matematik ve paragraf her gün düzenli çalışılır, güçlü dersler de tamamen bırakılmaz."],
    ["Deneme sınavı sonrası analiz nasıl yapılır?", "Her yanlış ve boşun nedeni bilgi eksikliği, dikkat hatası ya da süre sorunu olarak sınıflandırılır. Bilgi eksikleri haftalık plana konu tekrarı olarak eklenir, yanlışlar bir deftere yazılıp belirli aralıklarla yeniden çözülür."],
    ["Haftalık çalışma programı nasıl hazırlanır?", "Kalan gün ve haftalık çalışma günü belirlenir, günlük soru hedefi hesaplanır ve okul, uyku, yemek saatleri dışındaki boşluklara çalışma blokları yerleştirilir. Haftada bir deneme, bir analiz ve bir dinlenme günü ayrılması önerilir."],
    ["Çok soru çözmek tek başına başarı getirir mi?", "Getirmez. Konusu anlaşılmadan, süre tutulmadan ve yanlışları incelenmeden çözülen sorular sayıyı büyütür ama nete yansımaz. Verimli olan, öğrenme döngüsüne bağlı, analiz edilen ve sınav temposuna uygun çözülen sorulardır."]
  ],
  tools: ["soru-dagilimi-hesapla", "soru-cozme-hizi-hesapla", "ders-calisma-plani-hesapla", "kac-gun-kaldi"],
  related: ["aralikli-tekrar-yontemi-nedir", "pomodoro-teknigi-nedir", "smart-hedef-nedir-nasil-yazilir", "uyku-borcu-nedir-nasil-hesaplanir"],
  sources: [
    ["ÖSYM – YKS Kılavuzu ve sınav bilgileri", "https://www.osym.gov.tr/"],
    ["MEB – Ortaöğretim Kurumlarına İlişkin Merkezî Sınav (LGS) kılavuzu", "https://www.meb.gov.tr/"]
  ]
};
