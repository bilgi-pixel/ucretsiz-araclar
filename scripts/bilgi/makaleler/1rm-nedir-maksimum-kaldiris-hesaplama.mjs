export default {
  slug: "1rm-nedir-maksimum-kaldiris-hesaplama",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "1RM Nedir? Bir Tekrar Maksimum Hesaplama ve Ağırlık Seçme Rehberi",
  pageTitle: "1RM Nedir? Bir Tekrar Maksimum Hesaplama (Epley, Brzycki)",
  description: "1RM, bir hareketi doğru teknikle yalnızca bir kez kaldırabileceğiniz en yüksek ağırlıktır. Epley ve Brzycki formülleri, yüzde tablosu, tekrar aralığı ve güvenli test.",
  keywords: ["1rm nedir", "1rm hesaplama", "bir tekrar maksimum", "bench press 1rm", "1rm yüzde tablosu", "epley formülü", "brzycki formülü", "wilks puanı nedir"],
  lead: "1RM (one repetition maximum, bir tekrar maksimum), <strong>bir egzersizi doğru teknikle yalnızca bir kez kaldırabileceğiniz en yüksek ağırlıktır</strong>. Gerçek 1RM'yi test etmek yorucu ve riskli olabildiği için çoğu zaman daha hafif bir ağırlıkla yapılan tekrar sayısından tahmin edilir. En yaygın Epley formülüne göre 1RM = ağırlık × (1 + tekrar ÷ 30); 80 kg'ı 6 kez kaldıran biri için tahmin 96 kg'dır. 1RM bilindiğinde antrenman yükleri yüzdeyle planlanır: kuvvet için %85 ve üzeri, kas gelişimi için çoğunlukla %65–85 aralığı kullanılır. Bu yazıda formülleri, yüzde tablosunu ve güvenli test yöntemini anlatıyoruz.",
  kisaCevap: [
    "1RM, tek tekrarda doğru formla kaldırılabilen en yüksek ağırlıktır; her egzersiz için ayrı ölçülür.",
    "Epley: 1RM = ağırlık × (1 + tekrar ÷ 30). Brzycki: 1RM = ağırlık × 36 ÷ (37 − tekrar).",
    "Tahmin formülleri 2–10 tekrar aralığında en güvenilirdir; tekrar arttıkça sapma büyür.",
    "Yaklaşık eşleşme: %90 ≈ 4 tekrar, %85 ≈ 6, %80 ≈ 8, %75 ≈ 10, %70 ≈ 12 tekrar.",
    "Genel öneri: kuvvet için %85+ ve 1–6 tekrar, kas gelişimi için %65–85 ve 6–12 tekrar, dayanıklılık için %65 altı ve 12+ tekrar.",
    "Gerçek 1RM testi ısınma, kademeli yük artışı, uzun dinlenme ve yardımcı (spotter) ya da güvenlik barı gerektirir."
  ],
  figure: {
    alt: "1RM yüzdesi ile yapılabilecek yaklaşık tekrar sayısı grafiği: yüzde 100 bir tekrar, yüzde 85 altı tekrar, yüzde 70 on iki tekrar; yanında 80 kg ile 6 tekrar örneğinden 96 kg 1RM tahmini.",
    caption: "Yük hafifledikçe yapılabilecek tekrar sayısı artar. Grafik genel bir ortalamadır; kişiye ve harekete göre birkaç tekrar sapabilir. Sağdaki kart, Epley formülüyle 80 kg × 6 tekrardan 96 kg 1RM tahminini ve antrenman yüklerini gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1RM yüzdesi ve yaklaşık tekrar sayısı</text>
  <line x1="70" y1="360" x2="420" y2="360" class="st" fill="none"/>
  <line x1="70" y1="360" x2="70" y2="60" class="st" fill="none"/>
  <text x="420" y="390" class="sm end">Tekrar</text>
  <text x="78" y="68" class="sm">%1RM</text>
  <g class="sm mid">
    <text x="95" y="378">1</text><text x="145" y="378">2</text><text x="195" y="378">4</text><text x="245" y="378">6</text>
    <text x="295" y="378">8</text><text x="345" y="378">10</text><text x="395" y="378">12</text>
  </g>
  <g class="sm end">
    <text x="62" y="94">100</text><text x="62" y="154">90</text><text x="62" y="214">80</text><text x="62" y="274">70</text>
  </g>
  <polyline points="95,90 145,120 195,150 245,180 295,210 345,240 395,270" class="sp sw" fill="none"/>
  <circle cx="95" cy="90" r="6" class="p"/><circle cx="145" cy="120" r="6" class="p"/><circle cx="195" cy="150" r="6" class="p"/>
  <circle cx="245" cy="180" r="8" class="a"/><circle cx="295" cy="210" r="6" class="p"/><circle cx="345" cy="240" r="6" class="p"/><circle cx="395" cy="270" r="6" class="p"/>
  <text x="258" y="172" class="sm b">%85 ≈ 6 tekrar</text>
  <rect x="85" y="290" width="155" height="22" rx="4" class="dgs"/><text x="162" y="306" class="sm mid">Kuvvet (1–6)</text>
  <rect x="248" y="290" width="155" height="22" rx="4" class="oks"/><text x="325" y="306" class="sm mid">Kas gelişimi (6–12)</text>
  <rect x="450" y="60" width="250" height="330" rx="10" class="sf sb"/>
  <rect x="450" y="60" width="250" height="44" rx="10" class="p"/>
  <text x="575" y="88" class="b mid sf">80 kg × 6 tekrar</text>
  <text x="470" y="132">Epley: 80 × (1 + 6/30)</text>
  <text x="470" y="160" class="lg b p">1RM ≈ 96 kg</text>
  <text x="470" y="186" class="sm t2">Brzycki: 80 × 36/31 ≈ 92,9 kg</text>
  <line x1="470" y1="202" x2="680" y2="202" class="sb" fill="none"/>
  <text x="470" y="228">%90 → 86,4 kg</text>
  <text x="470" y="256">%85 → 81,6 kg</text>
  <text x="470" y="284">%80 → 76,8 kg</text>
  <text x="470" y="312">%75 → 72,0 kg</text>
  <text x="470" y="340">%70 → 67,2 kg</text>
  <text x="470" y="372" class="sm t2">Plakaya göre en yakın ağırlığa yuvarlayın</text>
</svg>`
  },
  sections: [
    {
      h: "1RM nedir, ne işe yarar?",
      p: [
        "1RM, İngilizce \"one repetition maximum\" ifadesinin kısaltmasıdır ve Türkçede <strong>bir tekrar maksimum</strong> olarak geçer. Bir egzersizde (bench press, squat, deadlift, overhead press gibi) tam hareket açıklığında ve doğru teknikle yalnızca bir kez kaldırabildiğiniz en yüksek yüktür. İki tekrar yapabildiğiniz ağırlık 1RM'niz değildir; 1RM'nizin altındadır.",
        "1RM'nin iki temel kullanımı vardır. Birincisi <strong>ilerlemeyi ölçmektir</strong>: kuvvetinizin aylar içinde nasıl değiştiğini tek bir sayıyla izleyebilirsiniz. İkincisi <strong>antrenman yükünü planlamaktır</strong>: birçok program \"3 set 5 tekrar %80\" gibi yüzdelerle yazılır ve bu yüzdeler 1RM'ye göre hesaplanır. Böylece farklı kuvvet düzeyindeki kişiler aynı programı kendi ağırlıklarıyla uygulayabilir."
      ]
    },
    {
      h: "1RM nasıl hesaplanır? Epley ve Brzycki formülleri",
      p: [
        "Gerçek 1RM'yi denemek yerine, yaklaşık 2 ile 10 tekrar arasında yapabildiğiniz bir setten tahmin yürütmek daha güvenlidir. Bunun için araştırmacıların geliştirdiği çeşitli formüller kullanılır. Hepsi aynı mantığa dayanır: bir ağırlıkla kaç tekrar yapabildiğiniz, o ağırlığın 1RM'nizin yüzde kaçı olduğunu gösterir."
      ],
      formula: "Epley: 1RM = w × (1 + r ÷ 30)\nBrzycki: 1RM = w × 36 ÷ (37 − r)\nLombardi: 1RM = w × r<sup>0,10</sup>\nO'Conner: 1RM = w × (1 + 0,025 × r)\n(w: kaldırılan ağırlık, r: tükenişe kadar yapılan tekrar)",
      ol: [
        "80 kg ile tükenişe kadar 6 tekrar yaptınız.",
        "Epley: 80 × (1 + 6 ÷ 30) = 80 × 1,2 = <strong>96,0 kg</strong>.",
        "Brzycki: 80 × 36 ÷ (37 − 6) = 2.880 ÷ 31 ≈ <strong>92,9 kg</strong>.",
        "Lombardi: 80 × 6<sup>0,1</sup> ≈ 80 × 1,196 ≈ <strong>95,7 kg</strong>.",
        "O'Conner: 80 × (1 + 0,15) = <strong>92,0 kg</strong>.",
        "Dört formülün ortalaması ≈ <strong>94,2 kg</strong>. Formüller arasındaki 4 kg'lık fark, tahminin doğasındaki belirsizliği gösterir."
      ],
      after: [
        "Formüllerin hiçbiri kesin değildir. Brzycki düşük tekrarlarda, Epley orta tekrarlarda iyi sonuç verme eğilimindedir; 10–12 tekrarın üzerinde hepsinin sapması büyür. Bu yüzden tahmini her zaman temkinli kullanın ve antrenman yüklerini ilk haftalarda biraz düşük tutun.",
        "Bu hesabı [[arac:bir-tekrar-maksimum-hesapla|Bir Tekrar Maksimum (1RM) Hesaplama]] aracıyla yapabilirsiniz. Ağırlığı ve tekrar sayısını (en fazla 12) girdiğinizde araç dört formülün sonucunu, ortalamasını ve %50 ile %95 arasındaki antrenman yüklerini listeler."
      ]
    },
    {
      h: "1RM yüzde tablosu: hangi yük kaç tekrar?",
      p: [
        "Aşağıdaki tablo, 1RM'nin belirli yüzdeleriyle tükenişe kadar yapılabilecek yaklaşık tekrar sayısını ve 1RM'si 96 kg olan bir kişi için karşılık gelen ağırlıkları gösterir. Tekrar sayıları genel ortalamadır; antrenman geçmişi, kas lifi yapısı ve hareket türü bu sayıları birkaç tekrar değiştirebilir."
      ],
      table: {
        head: ["1RM yüzdesi", "Yaklaşık tekrar", "1RM = 96 kg için", "Genel kullanım"],
        rows: [
          ["%100", "1", "96,0 kg", "Test, yarışma"],
          ["%95", "2", "91,2 kg", "Maksimal kuvvet"],
          ["%90", "3–4", "86,4 kg", "Maksimal kuvvet"],
          ["%85", "5–6", "81,6 kg", "Kuvvet"],
          ["%80", "7–8", "76,8 kg", "Kuvvet ve kas gelişimi"],
          ["%75", "9–10", "72,0 kg", "Kas gelişimi"],
          ["%70", "11–12", "67,2 kg", "Kas gelişimi"],
          ["%65", "14–15", "62,4 kg", "Kas dayanıklılığı, teknik"],
          ["%60 ve altı", "15+", "57,6 kg ve altı", "Isınma, teknik, dayanıklılık"]
        ],
        caption: "Ağırlıklar plakalara göre en yakın 1,25 ya da 2,5 kg'a yuvarlanır. Tekrar sayıları tüm setlerin tükenişe kadar yapıldığını varsayar."
      }
    },
    {
      h: "1RM'nin yüzde kaçıyla antrenman yapılmalı?",
      p: [
        "Hangi yüzdeyle çalışacağınız hedefinize bağlıdır. Klasik antrenman bilimi hedefleri yük aralıklarıyla eşleştirir; ancak güncel araştırmalar, setler tükenişe yakın yapıldığında daha geniş aralıkların da etkili olabileceğini gösterir. Aşağıdaki değerler genel bir başlangıç noktasıdır."
      ],
      table: {
        head: ["Hedef", "Yük (%1RM)", "Tekrar", "Set", "Dinlenme"],
        rows: [
          ["Maksimal kuvvet", "%85–100", "1–6", "3–6", "2–5 dk"],
          ["Kas gelişimi (hipertrofi)", "%65–85", "6–12", "3–5", "60–120 sn"],
          ["Kas dayanıklılığı", "%50–65", "12–20+", "2–3", "30–60 sn"],
          ["Patlayıcı güç", "%30–60 (hıza odaklı)", "3–6", "3–5", "2–3 dk"],
          ["Yeni başlayan", "%50–70", "8–15", "1–3", "60–90 sn"]
        ]
      },
      after: [
        "Yüzdelerin yanında \"zorluk\" algısını da izlemek faydalıdır. Birçok antrenör setin sonunda kaç tekrar daha yapabileceğinizi soran <strong>RIR</strong> (repetitions in reserve) ya da 1–10 ölçekli <strong>RPE</strong> kullanır. Örneğin \"%80, 2 RIR\" ifadesi, ağırlıkla tükenişe 2 tekrar kala seti bitirmeniz gerektiği anlamına gelir. 1RM'niz değişkendir: uykusuzluk, beslenme ve stres o günkü gerçek kapasitenizi düşürebilir."
      ]
    },
    {
      h: "Hipertrofi için kaç tekrar yapılmalı?",
      p: [
        "Kas gelişimi için en yaygın öneri set başına 6–12 tekrar, 1RM'nin yaklaşık %65–85'i ve haftada kas grubu başına 10–20 setlik toplam hacimdir. Bu aralık; mekanik gerilimi, toplam iş miktarını ve uygulanabilirliği dengelediği için tercih edilir.",
        "Bununla birlikte, setler tükenişe 0–3 tekrar kalacak kadar zorlayıcı yapıldığında 5 tekrarlık ağır setlerle 20 tekrarlık hafif setlerin de kas gelişimi sağlayabildiği bilinmektedir. Pratikte en önemli etkenler; yeterli haftalık hacim, kademeli yüklenme (zamanla ağırlığı ya da tekrarı artırmak), yeterli protein ve uykudur. Günlük protein ihtiyacınızı [[bilgi:gunluk-protein-ihtiyaci-ne-kadar|günlük protein ihtiyacı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "1RM testi güvenli nasıl yapılır?",
      p: [
        "Gerçek 1RM testi, teknik olarak hareketi iyi bilen ve en az birkaç aydır düzenli antrenman yapan kişiler için uygundur. Yeni başlayanlar için 3–5 tekrarlık bir setten tahmin yapmak daha güvenlidir. Test yapacaksanız aşağıdaki sırayı izleyin:"
      ],
      ol: [
        "Genel ısınma: 5–10 dakika hafif kardiyo ve hareketle ilgili eklemlere mobilite çalışması.",
        "Boş bar ya da hafif yükle 10 tekrar; ardından tahmini 1RM'nin %50'siyle 8–10 tekrar.",
        "%70 ile 3–5 tekrar, %80 ile 2–3 tekrar, %90 ile 1 tekrar. Setler arasında 2–3 dakika dinlenin.",
        "İlk deneme tahmini 1RM'nin yaklaşık %95–100'ü. Başarılıysa yükü %2–5 artırın; denemeler arasında 3–5 dakika dinlenin.",
        "Toplam 3–5 deneme içinde maksimumu bulun. Teknik bozulduğu anda testi sonlandırın; formu bozuk kaldırış geçerli 1RM sayılmaz.",
        "Bench press ve squat'ta mutlaka deneyimli bir yardımcı (spotter) ya da güvenlik barları olan bir kafes kullanın."
      ],
      after: [
        "Ağrı, baş dönmesi ya da göğüs sıkışması hissederseniz testi hemen bırakın. Yüksek tansiyon, kalp-damar hastalığı, yakın zamanda geçirilmiş sakatlık ya da hamilelik gibi durumlarda maksimal kaldırış yapmadan önce hekiminize danışın."
      ]
    },
    {
      h: "Wilks puanı nedir?",
      p: [
        "1RM mutlak bir değerdir; 60 kg'lık ve 100 kg'lık iki sporcunun aynı ağırlığı kaldırması aynı başarı anlamına gelmez. Powerlifting'de farklı vücut ağırlığı ve cinsiyetteki sporcuları karşılaştırmak için <strong>Wilks katsayısı</strong> geliştirilmiştir. Sporcunun squat, bench press ve deadlift 1RM'lerinin toplamı, vücut ağırlığına ve cinsiyete göre hesaplanan bir katsayıyla çarpılır; sonuç Wilks puanıdır.",
        "Örneğin aynı 500 kg toplamı, hafif bir sporcu için ağır bir sporcuya göre daha yüksek bir Wilks puanı verir. Bazı federasyonlar zamanla güncellenmiş katsayılara ve farklı puanlama sistemlerine geçmiştir; hangi sistemin kullanıldığını yarıştığınız federasyonun kurallarından kontrol edin. Kendi puanınızı [[arac:wilks-puani-hesapla|Wilks Puanı Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Pound ağırlıklar kg'a nasıl çevrilir?",
      p: [
        "Bazı salonlardaki plakalar ve yabancı programlar pound (lb) kullanır. 1 lb tam olarak 0,45359237 kg'dır; pratikte 0,4536 ile çarpmak yeterlidir. Ters yönde 1 kg ≈ 2,2046 lb'dir."
      ],
      table: {
        head: ["Pound", "Kilogram", "Not"],
        rows: [
          ["45 lb", "20,41 kg", "Standart pound plakası ve bar"],
          ["135 lb", "61,23 kg", "Bar + iki 45 lb plaka"],
          ["225 lb", "102,06 kg", "Bar + dört 45 lb plaka"],
          ["315 lb", "142,88 kg", "Bar + altı 45 lb plaka"],
          ["220,46 lb", "100 kg", "Ters yön örneği"]
        ]
      },
      after: [
        "Programınız pound cinsinden yazılmışsa önce 1RM'nizi pounda çevirip yüzdeleri öyle hesaplamak ya da tüm yüzdeleri kg cinsinden bulup en yakın plakaya yuvarlamak gerekir. Çeviriyi [[arac:kg-pound-cevir|Kilogram Pound Çevirici]] ile yapabilir, birimin tarihçesini [[bilgi:1-pound-kac-kg|1 pound kaç kg]] yazısında okuyabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tükenişe gitmeyen setten hesap:</strong> 10 tekrar yapabileceğiniz ağırlıkla 6 tekrarda bırakıp 6 girerseniz 1RM olduğundan düşük çıkar.",
        "<strong>Bozuk formla sayılan tekrarlar:</strong> Yarım hareket açıklığıyla ya da sekerek yapılan tekrarlar tahmini şişirir.",
        "<strong>Yüksek tekrarlı setten tahmin:</strong> 15–20 tekrarlık setlerden yapılan tahmin güvenilir değildir; ağırlığı artırıp 3–8 tekrarla yeniden ölçün.",
        "<strong>Tek 1RM'yi her harekete uygulamak:</strong> Bench press 1RM'si, incline press ya da dumbbell press için geçerli değildir; her hareketin kendi 1RM'si vardır.",
        "<strong>Her hafta maksimum denemek:</strong> Sık maksimal test toparlanmayı bozar ve sakatlık riskini artırır; 6–12 haftada bir yeterlidir."
      ]
    }
  ],
  faq: [
    ["1RM nedir?", "1RM, bir tekrar maksimum demektir ve bir egzersizi doğru teknikle tam hareket açıklığında yalnızca bir kez kaldırabileceğiniz en yüksek ağırlığı ifade eder. Kuvveti ölçmek ve antrenman yüklerini yüzdeyle planlamak için kullanılır."],
    ["1RM nasıl hesaplanır?", "Tükenişe kadar 2 ile 10 tekrar yapabildiğiniz bir ağırlık seçilir ve formüle konur. Epley formülüne göre 1RM, ağırlık çarpı bir artı tekrar bölü 30'dur; 80 kg ile 6 tekrar yaklaşık 96 kg verir."],
    ["Epley ve Brzycki formülleri nedir?", "Epley formülü 1RM = ağırlık × (1 + tekrar ÷ 30), Brzycki formülü 1RM = ağırlık × 36 ÷ (37 − tekrar) şeklindedir. İkisi de tekrar sayısından tahmin yapar; düşük tekrarlarda sonuçları birbirine yakındır."],
    ["1RM'nin yüzde kaçıyla antrenman yapılmalı?", "Genel öneriye göre maksimal kuvvet için yüzde 85 ile 100 arası, kas gelişimi için yüzde 65 ile 85 arası, kas dayanıklılığı için yüzde 65'in altı kullanılır. Yeni başlayanlar daha düşük yüzdelerle tekniğe odaklanmalıdır."],
    ["Hipertrofi için kaç tekrar yapılmalı?", "En yaygın öneri set başına 6 ile 12 tekrar ve haftada kas grubu başına 10 ile 20 settir. Setler tükenişe yakın yapıldığında daha düşük ya da daha yüksek tekrar aralıkları da kas gelişimi sağlayabilir."],
    ["Wilks puanı nedir?", "Wilks puanı, powerlifting'de farklı vücut ağırlığı ve cinsiyetteki sporcuları karşılaştırmak için kullanılan bir katsayı sistemidir. Squat, bench press ve deadlift toplamı, vücut ağırlığına bağlı katsayıyla çarpılarak bulunur."],
    ["Pound ağırlıklar kg'a nasıl çevrilir?", "Pound değeri 0,45359237 ile çarpılır; pratikte 0,4536 yeterlidir. Örneğin 225 lb yaklaşık 102,06 kg, 45 lb'lik plaka yaklaşık 20,41 kg eder."],
    ["1RM testi güvenli nasıl yapılır?", "Genel ısınmadan sonra yük kademeli artırılır, tahmini 1RM'ye yaklaşırken her denemede yüzde 2 ile 5 eklenir ve denemeler arasında 3 ile 5 dakika dinlenilir. Yardımcı ya da güvenlik barı kullanılmalı, teknik bozulunca test bitirilmelidir."],
    ["Yeni başlayanlar 1RM testi yapmalı mı?", "Önerilmez. Hareket tekniği oturmadan maksimal yük denemek sakatlık riskini artırır. Yeni başlayanlar 3 ile 8 tekrarlık bir setten tahmin yapmalı ve ilk aylarda tekniğe odaklanmalıdır."]
  ],
  tools: ["bir-tekrar-maksimum-hesapla", "wilks-puani-hesapla", "kg-pound-cevir", "protein-ihtiyaci-hesapla"],
  related: ["gunluk-protein-ihtiyaci-ne-kadar", "1-pound-kac-kg", "vucut-yag-orani-kac-olmali"],
  uyari: "genel bilgidir, kişisel antrenman ya da tıbbi tavsiye değildir; sağlık sorununuz varsa maksimal kaldırış öncesi hekiminize danışın",
  sources: [
    ["Dünya Sağlık Örgütü – Fiziksel aktivite önerileri", "https://www.who.int/news-room/fact-sheets/detail/physical-activity"],
    ["Gençlik ve Spor Bakanlığı", "https://www.gsb.gov.tr/"]
  ]
};
