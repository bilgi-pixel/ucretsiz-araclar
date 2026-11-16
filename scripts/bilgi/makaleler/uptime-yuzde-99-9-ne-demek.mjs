export default {
  slug: "uptime-yuzde-99-9-ne-demek",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Uptime Yüzde 99,9 Ne Demek? SLA ve Yıllık Kesinti Süresi Hesabı",
  pageTitle: "Uptime %99,9 Ne Demek? SLA ve Kesinti Süresi Tablosu",
  description: "Uptime yüzde 99,9 yılda kaç saat kesinti demek? SLA nedir, five nines, aylık izin verilen kesinti, planlı bakım, gerçekleşen uptime hesabı ve hosting garantisi okuma.",
  keywords: ["uptime nedir", "yüzde 99.9 uptime", "sla nedir", "yıllık kesinti süresi", "hosting uptime garantisi", "five nines", "sunucu erişilebilirliği", "aylık kesinti hesaplama"],
  lead: "Uptime %99,9, <strong>bir hizmetin zamanın %99,9'unda çalışır, en fazla %0,1'inde kesintili olabileceği</strong> anlamına gelir. Bu oran yılda yaklaşık 8 saat 46 dakika, 30 günlük bir ayda 43 dakika 12 saniye kesintiye izin verir. Oran büyüdükçe izin verilen süre hızla kısalır: \"five nines\" denen %99,999 yılda yalnızca 5 dakika 15 saniyedir. Bu yazıda uptime ve SLA kavramlarını, kesinti süresi tablosunu, gerçekleşen uptime hesabını, planlı bakımın etkisini ve hosting tekliflerinin nasıl okunacağını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Uptime (%) = (dönem süresi − kesinti süresi) ÷ dönem süresi × 100.",
    "İzin verilen kesinti = dönem süresi × (1 − uptime oranı); %99,9 için yılda 8 sa 45 dk 36 sn.",
    "30 günlük ayda: %99 → 7 sa 12 dk, %99,9 → 43 dk 12 sn, %99,99 → 4 dk 19 sn.",
    "SLA (hizmet düzeyi sözleşmesi), taahhüt edilen uptime'ı, ölçüm yöntemini ve hedef tutturulamazsa verilecek tazminatı belirler.",
    "Planlı bakımın uptime hesabına girip girmediği sözleşmeye göre değişir; çoğu SLA önceden duyurulan bakımı hariç tutar.",
    "Birbirine bağlı iki %99,9'luk hizmetin birlikte uptime'ı yaklaşık %99,8'dir."
  ],
  figure: {
    alt: "Uptime yüzdesine göre yıllık izin verilen kesinti çubukları: yüzde 99 için 3 gün 15 saat, yüzde 99,5 için 1 gün 19 saat, yüzde 99,9 için 8 saat 46 dakika, yüzde 99,99 için 53 dakika, yüzde 99,999 için 5 dakika.",
    caption: "Her ek \"9\" izin verilen kesintiyi on kat kısaltır. Değerler 365 günlük yıl için hesaplanmıştır; 30 günlük ay sütunu aylık SLA raporlarında kullanılır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Uptime yüzdesi kaç kesinti demek?</text>
  <text x="30" y="64" class="b">Uptime</text><text x="160" y="64" class="b">Yıllık kesinti (365 gün)</text><text x="690" y="64" class="b end">Aylık (30 gün)</text>
  <line x1="30" y1="76" x2="690" y2="76" class="sb" fill="none"/>
  <g>
    <text x="30" y="108" class="b">%99</text><rect x="110" y="94" width="420" height="20" rx="4" class="dgs"/><text x="120" y="109" class="sm b">3 gün 15 sa 36 dk</text><text x="690" y="108" class="sm end">7 sa 12 dk</text>
    <text x="30" y="148" class="b">%99,5</text><rect x="110" y="134" width="210" height="20" rx="4" class="dgs"/><text x="330" y="149" class="sm b">1 gün 19 sa 48 dk</text><text x="690" y="148" class="sm end">3 sa 36 dk</text>
    <text x="30" y="188" class="b p">%99,9</text><rect x="110" y="174" width="42" height="20" rx="4" class="p"/><text x="162" y="189" class="sm b p">8 sa 45 dk 36 sn</text><text x="690" y="188" class="sm end b p">43 dk 12 sn</text>
    <text x="30" y="228" class="b">%99,95</text><rect x="110" y="214" width="21" height="20" rx="4" class="ps"/><text x="141" y="229" class="sm b">4 sa 22 dk 48 sn</text><text x="690" y="228" class="sm end">21 dk 36 sn</text>
    <text x="30" y="268" class="b">%99,99</text><rect x="110" y="254" width="6" height="20" rx="2" class="oks"/><text x="126" y="269" class="sm b">52 dk 34 sn</text><text x="690" y="268" class="sm end">4 dk 19 sn</text>
    <text x="30" y="308" class="b">%99,999</text><rect x="110" y="294" width="3" height="20" rx="1" class="ok"/><text x="123" y="309" class="sm b">5 dk 15 sn</text><text x="690" y="308" class="sm end">26 sn</text>
  </g>
  <rect x="30" y="330" width="660" height="56" rx="10" class="sf sb"/>
  <text x="360" y="354" class="b mid">%99,9 için: 365 × 24 sa × 0,001 = 8,76 saat</text>
  <text x="360" y="376" class="sm mid t2">Çubuk uzunlukları yıllık kesintiyle orantılıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Uptime nedir?",
      p: [
        "Uptime, bir sunucunun, web sitesinin ya da çevrim içi hizmetin belirli bir dönem boyunca çalışır ve erişilebilir durumda olduğu sürenin oranıdır. Tersi <strong>downtime</strong>, yani kesinti süresidir. Uptime genellikle yüzde ile ifade edilir: %99,9 uptime, ölçüm döneminin binde 999'unda hizmetin çalıştığı, binde 1'inde ise kesinti yaşandığı anlamına gelir.",
        "Uptime ölçümü göründüğü kadar basit değildir; \"çalışıyor\" tanımı sözleşmeye göre değişir. Sunucunun açık olması, web sayfasının yüklenmesi ve sayfanın belirli bir süre içinde doğru içerikle yanıt vermesi farklı ölçütlerdir. Sunucu açık olduğu halde site hata veriyorsa (örneğin 500 hatası) kullanıcı açısından hizmet kesintidedir. Hata kodlarının anlamını [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Yüzde 99,9 uptime yılda kaç saat kesinti demek?",
      p: [
        "İzin verilen kesinti, dönem süresinin uptime oranının tümleyeniyle çarpılmasıyla bulunur. %99,9 uptime'ın tümleyeni %0,1, yani 0,001'dir. 365 günlük bir yıl 8.760 saattir; 8.760 × 0,001 = 8,76 saat eder. 0,76 saat 45,6 dakikadır; sonuç <strong>8 saat 45 dakika 36 saniye</strong>, yuvarlanarak yaklaşık 8 saat 46 dakikadır."
      ],
      formula: "İzin verilen kesinti = dönem süresi × (1 − uptime ÷ 100)\nYıl: 365 × 24 × 60 = 525.600 dakika × 0,001 = 525,6 dk = 8 sa 45 dk 36 sn\n30 günlük ay: 43.200 dk × 0,001 = 43,2 dk = 43 dk 12 sn\nGün: 1.440 dk × 0,001 = 1,44 dk = 1 dk 26 sn",
      table: {
        head: ["Uptime", "Yıllık", "Aylık (30 gün)", "Haftalık", "Günlük"],
        rows: [
          ["%99", "3 gün 15 sa 36 dk", "7 sa 12 dk", "1 sa 40 dk 48 sn", "14 dk 24 sn"],
          ["%99,5", "1 gün 19 sa 48 dk", "3 sa 36 dk", "50 dk 24 sn", "7 dk 12 sn"],
          ["%99,9", "8 sa 45 dk 36 sn", "43 dk 12 sn", "10 dk 5 sn", "1 dk 26 sn"],
          ["%99,95", "4 sa 22 dk 48 sn", "21 dk 36 sn", "5 dk 2 sn", "43 sn"],
          ["%99,99", "52 dk 34 sn", "4 dk 19 sn", "1 dk 0,5 sn", "8,6 sn"],
          ["%99,999", "5 dk 15 sn", "26 sn", "6 sn", "0,9 sn"]
        ],
        caption: "Yıl 365 gün, ay 30 gün kabul edilmiştir. Takvim ayına göre (28–31 gün) aylık değerler birkaç dakika değişir."
      },
      after: [
        "Tablodaki en önemli ders şudur: %99 ile %99,9 arasındaki fark yalnızca 0,9 puan gibi görünse de kesinti süresi on kat azalır. Bir e-ticaret sitesi için yılda 3,6 gün kesinti ile 8,8 saat kesinti arasında büyük bir satış farkı vardır. Bu hesapları kendi oranınızla [[arac:uptime-hesapla|Uptime (SLA) Hesaplama]] aracında yapabilirsiniz."
      ]
    },
    {
      h: "SLA ne anlama gelir?",
      p: [
        "SLA (Service Level Agreement, hizmet düzeyi sözleşmesi), hizmet sağlayıcının müşterisine taahhüt ettiği performansı yazılı hale getiren belgedir. Uptime yüzdesi SLA'nın en bilinen maddesidir, ama tek maddesi değildir. İyi bir SLA şu soruların cevabını açıkça verir:"
      ],
      ul: [
        "<strong>Taahhüt edilen oran:</strong> Örneğin aylık %99,9 uptime.",
        "<strong>Ölçüm dönemi:</strong> Aylık mı, yıllık mı? Aylık ölçüm müşteri için daha korumacıdır, çünkü kötü bir ay iyi aylarla telafi edilemez.",
        "<strong>Kesinti tanımı:</strong> Hangi durum kesinti sayılır, kaç dakikadan kısa kesintiler hesaba katılmaz?",
        "<strong>Hariç tutulan durumlar:</strong> Planlı bakım, müşteri kaynaklı hatalar, mücbir sebepler, saldırılar.",
        "<strong>Ölçüm yöntemi:</strong> Kesinti kimin izleme sistemiyle, hangi aralıklarla ölçülür?",
        "<strong>Tazminat (hizmet kredisi):</strong> Taahhüt tutturulamazsa ücretin yüzde kaçı iade edilir ve nasıl talep edilir?"
      ],
      after: [
        "Çoğu SLA'da tazminat nakit iade değil, sonraki faturadan düşülen hizmet kredisidir ve müşterinin belirli bir süre içinde başvurması gerekir. Örneğin bir sözleşme, aylık uptime %99,9'un altına düşerse aylık ücretin %10'unun, %99'un altına düşerse %25'inin kredi olarak verileceğini yazabilir; bu oranlar yalnızca örnektir. Kesintinin işletmenize verdiği zarar genellikle bu kredilerden çok daha büyüktür; bu yüzden SLA'yı bir sigorta değil, sağlayıcının güven beyanı olarak görün."
      ]
    },
    {
      h: "Five nines (yüzde 99,999) ne demek?",
      p: [
        "\"Five nines\", uptime yüzdesindeki beş dokuzu (99,999) anlatan bir ifadedir ve yılda yalnızca yaklaşık 5 dakika 15 saniye kesintiye izin verir. Bu düzey; telekomünikasyon altyapısı, acil çağrı sistemleri, ödeme altyapıları ve borsa sistemleri gibi kesintinin çok pahalı ya da tehlikeli olduğu hizmetlerde hedeflenir.",
        "Beş dokuza ulaşmak, tek bir sunucuyla mümkün değildir. Birden fazla veri merkezi, otomatik yük devretme, yedekli güç ve ağ bağlantıları, kesintisiz yazılım güncelleme yöntemleri ve 7/24 izleme gerekir. Her ek dokuz maliyeti belirgin biçimde artırdığı için çoğu küçük işletme web sitesi için %99,9 ya da %99,95 makul bir hedeftir. Sunucu donanımında disk yedekliliği için [[bilgi:raid-0-1-5-10-farki|RAID türleri]], elektrik kesintisine karşı [[bilgi:ups-aku-kac-saat-gider|UPS süresi]] yazıları konuyu tamamlar."
      ]
    },
    {
      h: "Kesinti süresi aylık nasıl hesaplanır? Gerçekleşen uptime",
      p: [
        "Sözleşmedeki taahhüdü kontrol etmek için yaşanan kesintiden gerçekleşen uptime'ı hesaplarsınız. 30 günlük bir ayda toplam 43.200 dakika vardır. Bu ay sitenizin üç ayrı olayda toplam 90 dakika erişilemediğini varsayalım."
      ],
      ol: [
        "Dönemi dakikaya çevirin: 30 × 24 × 60 = 43.200 dakika.",
        "Kesintileri toplayın: 25 + 45 + 20 = 90 dakika.",
        "Çalışma süresini bulun: 43.200 − 90 = 43.110 dakika.",
        "Uptime'ı hesaplayın: 43.110 ÷ 43.200 × 100 = %99,79.",
        "Taahhütle karşılaştırın: %99,9 taahhüdü 43,2 dakika kesintiye izin verirdi; 90 dakika bu sınırın iki katından fazladır, SLA ihlali vardır."
      ],
      formula: "Gerçekleşen uptime (%) = (dönem − kesinti) ÷ dönem × 100\n(43.200 − 90) ÷ 43.200 × 100 = %99,79",
      after: [
        "Takvim ayı kullanılıyorsa 31 günlük ay 44.640, 28 günlük şubat 40.320 dakikadır. Dakika, saat ve saniye çevirileri için [[arac:saniye-dakika-cevir|Saniye Dakika Çevirici]], yüzde karşılaştırmaları için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Planlı bakım uptime'a dahil mi?",
      p: [
        "Bu, sözleşmenin en önemli ayrıntılarından biridir. Birçok sağlayıcı, belirli bir süre önceden (örneğin 48 ya da 72 saat) duyurulan ve belirli saatlerde yapılan planlı bakımları kesinti hesabına katmaz. Bu durumda %99,9 taahhüdü, bakımlar dışında kalan zaman için geçerlidir ve gerçek erişilebilirlik bunun altında kalabilir.",
        "Bir örnekle görelim: Sağlayıcı her ay gece 2 saatlik bakım yapıyor ve bakımları hesaptan düşüyor. Yılda 24 saat planlı bakım, taahhüt edilen 8,8 saatlik plansız kesinti hakkının üstüne eklenir; kullanıcıların gözünden yıllık erişilemezlik 30 saati aşabilir. Sözleşmeyi okurken bakımın üst sınırına, duyuru süresine ve bakım saatlerinin sizin yoğun saatlerinize denk gelip gelmediğine bakın."
      ]
    },
    {
      h: "Hosting firmalarının uptime garantisi nasıl okunur?",
      p: [
        "Hosting tekliflerinde \"%99,9 uptime garantisi\" ifadesi çok yaygındır, ama iki teklif aynı oranı yazdığı halde çok farklı koruma sağlayabilir. Teklifleri karşılaştırırken şu kontrol listesini kullanın:"
      ],
      ul: [
        "Oran aylık mı yıllık mı ölçülüyor? Yıllık ölçümde tek bir uzun kesinti diğer aylarla telafi edilir.",
        "Planlı bakım, saldırılar ve müşteri kaynaklı hatalar hariç tutuluyor mu?",
        "Kesinti hangi izleme sistemiyle ve kaç dakikalık aralıklarla ölçülüyor?",
        "Hizmet kredisi ne kadar ve nasıl talep ediliyor; otomatik mi, başvuruyla mı?",
        "Durum sayfası (status page) ve geçmiş kesinti kayıtları kamuya açık mı?",
        "Yedekleme ve felaket kurtarma hizmetleri uptime taahhüdünden ayrı mı?"
      ],
      after: [
        "Uptime yalnızca erişilebilirliği ölçer; sitenin hızı, yedeklerin varlığı ya da destek ekibinin yanıt süresi ayrı konulardır. Kullanıcılarınızın bağlantı hızının deneyime etkisi için [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı]] yazısına da göz atabilirsiniz."
      ]
    },
    {
      h: "Web sitesi erişilebilirliği nasıl izlenir?",
      p: [
        "Sağlayıcının raporuna ek olarak kendi izlemenizi yapmak, kesintileri hem erken fark etmenizi hem de SLA ihlallerini belgelemenizi sağlar. İzleme servisleri sitenizi belirli aralıklarla (örneğin her 1 ya da 5 dakikada bir) farklı konumlardan kontrol eder; sayfa yanıt vermezse ya da hata kodu dönerse size bildirim gönderir.",
        "İzleme aralığı kesinti ölçümünün hassasiyetini belirler. 5 dakikalık aralıkla yapılan kontrolde 3 dakikalık bir kesinti hiç görülmeyebilir ya da 5 dakika sayılabilir. Birden fazla konumdan kontrol, yalnızca bir bölgedeki ağ sorununu tüm kesinti sanma hatasını önler. Birbirine bağlı hizmetlerin toplam uptime'ı da hesaplanmalıdır: siteniz %99,9'luk bir sunucuya ve %99,9'luk bir veritabanı hizmetine bağlıysa ikisinin birlikte çalışma olasılığı 0,999 × 0,999 ≈ %99,8'dir; yedekli iki sunucu ise toplam uptime'ı yükseltir."
      ]
    }
  ],
  faq: [
    ["Uptime nedir?", "Uptime, bir sunucunun ya da çevrim içi hizmetin belirli bir dönemde çalışır ve erişilebilir olduğu sürenin oranıdır. Yüzde olarak ifade edilir; tersi olan downtime ise hizmetin kesintide kaldığı süredir."],
    ["Yüzde 99,9 uptime yılda kaç saat kesinti demek?", "%99,9 uptime, 365 günlük yılda en fazla 8 saat 45 dakika 36 saniye kesintiye izin verir. 30 günlük bir ayda bu süre 43 dakika 12 saniye, bir günde ise yaklaşık 1 dakika 26 saniyedir."],
    ["SLA ne anlama gelir?", "SLA, hizmet düzeyi sözleşmesi demektir. Sağlayıcının taahhüt ettiği uptime oranını, ölçüm dönemini ve yöntemini, hariç tutulan durumları ve taahhüt tutturulamazsa verilecek hizmet kredisini yazılı olarak belirler."],
    ["Five nines (yüzde 99,999) ne demek?", "Five nines, %99,999 uptime anlamına gelir ve yılda yalnızca yaklaşık 5 dakika 15 saniye kesintiye izin verir. Telekomünikasyon ve ödeme altyapısı gibi kritik sistemlerde hedeflenir; yedekli altyapı gerektirir."],
    ["Hosting firmalarının uptime garantisi nasıl okunur?", "Oranın aylık mı yıllık mı ölçüldüğüne, planlı bakımın hariç tutulup tutulmadığına, ölçüm yöntemine ve hizmet kredisinin nasıl talep edildiğine bakın. Aynı oranı yazan iki teklif çok farklı koruma sağlayabilir."],
    ["Planlı bakım uptime'a dahil mi?", "Sözleşmeye bağlıdır. Birçok SLA önceden duyurulan planlı bakımları kesinti hesabından çıkarır; bu durumda kullanıcıların gördüğü toplam erişilemezlik taahhüt edilen kesinti süresinden daha uzun olabilir."],
    ["Kesinti süresi aylık nasıl hesaplanır?", "30 günlük ay 43.200 dakikadır. İzin verilen kesinti bu sürenin uptime tümleyeniyle çarpılarak bulunur; gerçekleşen uptime ise (43.200 − kesinti) ÷ 43.200 × 100 formülüyle hesaplanır. 90 dakika kesinti %99,79 eder."],
    ["Web sitesi erişilebilirliği nasıl izlenir?", "İzleme servisleri siteyi belirli aralıklarla farklı konumlardan kontrol eder ve yanıt alamazsa bildirim gönderir. Kısa izleme aralığı ve çok konumlu kontrol, kesintileri daha doğru ölçer ve SLA ihlallerini belgelemeyi kolaylaştırır."],
    ["İki hizmetin toplam uptime'ı nasıl hesaplanır?", "Birbirine bağlı, ikisi de çalışmak zorunda olan hizmetlerin uptime oranları çarpılır: 0,999 × 0,999 ≈ %99,8. Yedekli iki sunucuda ise ikisinin birden kesintide olma olasılığı çok düşük olduğu için toplam uptime yükselir."]
  ],
  tools: ["uptime-hesapla", "saniye-dakika-cevir", "yuzde-hesapla"],
  related: ["http-durum-kodlari-404-500-nedir", "raid-0-1-5-10-farki", "ups-aku-kac-saat-gider", "internet-hizi-kac-mbps-olmali"]
};
