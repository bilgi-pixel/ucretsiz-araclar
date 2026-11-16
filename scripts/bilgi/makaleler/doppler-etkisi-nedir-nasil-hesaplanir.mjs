export default {
  slug: "doppler-etkisi-nedir-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Doppler Etkisi Nedir? Ambulans Sesi Örneği ve Frekans Formülü",
  pageTitle: "Doppler Etkisi Nedir? Formül, Ambulans Örneği ve Hesaplama",
  description: "Doppler etkisi, kaynak ya da gözlemci hareket edince algılanan frekansın değişmesidir. Formül, işaret seçimi, ambulans örneği, radar, ultrason ve kırmızıya kayma.",
  keywords: ["doppler etkisi nedir", "doppler formülü", "ambulans sesi neden değişir", "kırmızıya kayma", "doppler radar", "yaklaşan kaynak frekans", "doppler etkisi örnekleri", "doppler ultrason prensibi"],
  lead: "Doppler etkisi, bir dalga kaynağı ile onu algılayan gözlemci birbirine göre hareket ettiğinde <strong>algılanan frekansın kaynağın gerçek frekansından farklı olmasıdır</strong>: yaklaşırken frekans artar, ses incelir; uzaklaşırken frekans azalır, ses kalınlaşır. 700 Hz siren çalan ve saatte 72 km hızla giden bir ambulans yaklaşırken yaklaşık 743 Hz, uzaklaşırken yaklaşık 661 Hz duyulur. Bu sayfada formülü, işaretlerin nasıl seçildiğini, çözümlü örnekleri ve etkinin radar, tıp ve astronomideki kullanımını anlatıyoruz.",
  kisaCevap: [
    "Ses için genel formül: f' = f × (c ± v<sub>g</sub>) ÷ (c ∓ v<sub>k</sub>); c ses hızı, v<sub>g</sub> gözlemcinin, v<sub>k</sub> kaynağın hızıdır.",
    "Birbirine yaklaşma frekansı artırır: üstteki gözlemci hızına +, alttaki kaynak hızına − işareti verilir.",
    "20 °C havada ses hızı yaklaşık 343 m/s'dir; 700 Hz siren 20 m/s hızla yaklaşırken 743,3 Hz, uzaklaşırken 661,4 Hz duyulur.",
    "Hareket eden kaynağın önünde dalga boyu kısalır, arkasında uzar; frekans değişimi bunun sonucudur.",
    "Işıkta uzaklaşan cisimlerin tayfı kırmızıya, yaklaşanlarınki maviye kayar; küçük hızlarda z ≈ v ÷ c'dir.",
    "Radar ve ultrason yansıyan dalgada çift Doppler kayması ölçer: Δf ≈ 2 × v × f ÷ c."
  ],
  figure: {
    alt: "Hareket eden bir ambulansın yaydığı ses dalgalarının önde sıkışıp arkada seyrelmesini gösteren eşmerkezli olmayan halkalar ve yaklaşan ile uzaklaşan gözlemcinin duyduğu 743 ve 661 hertzlik frekanslar.",
    caption: "Kaynak sağa doğru 20 m/s hızla hareket ederken her yeni dalga halkası bir öncekinden biraz daha sağda başlar. Öndeki gözlemciye sık dalgalar (kısa dalga boyu, 743 Hz), arkadakine seyrek dalgalar (uzun dalga boyu, 661 Hz) ulaşır. Kaynağın frekansı 700 Hz'dir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Yaklaşan ve uzaklaşan kaynak</text>
  <circle cx="300" cy="190" r="150" class="sp" fill="none"/>
  <circle cx="330" cy="190" r="115" class="sp" fill="none"/>
  <circle cx="360" cy="190" r="80" class="sp" fill="none"/>
  <circle cx="390" cy="190" r="45" class="sp" fill="none"/>
  <rect x="396" y="176" width="44" height="28" rx="6" class="p"/>
  <text x="418" y="196" class="sm mid sf b">700</text>
  <line x1="444" y1="190" x2="500" y2="190" class="sa sw" fill="none"/>
  <polygon points="500,182 516,190 500,198" class="a"/>
  <text x="472" y="176" class="sm mid b">20 m/s</text>
  <circle cx="620" cy="190" r="14" class="ok"/>
  <text x="620" y="236" class="b mid ok">743,3 Hz</text>
  <text x="620" y="256" class="sm mid">dalgalar sık · ses ince</text>
  <circle cx="90" cy="190" r="14" class="dg"/>
  <text x="90" y="236" class="b mid dg">661,4 Hz</text>
  <text x="90" y="256" class="sm mid">dalgalar seyrek · ses kalın</text>
  <rect x="160" y="344" width="400" height="30" rx="6" class="sf sb"/>
  <text x="360" y="365" class="sm mid">f' = 700 × 343 ÷ (343 ∓ 20)</text>
</svg>`
  },
  sections: [
    {
      h: "Doppler etkisi nedir?",
      p: [
        "Doppler etkisi, adını 1842'de bu olguyu açıklayan Avusturyalı fizikçi Christian Doppler'den alır. Bir dalga kaynağı belirli bir frekansta dalga yayar; kaynak ya da gözlemci hareket ettiğinde gözlemciye birim zamanda ulaşan dalga tepesi sayısı değişir. Gözlemci bu değişen sayıyı farklı bir frekans olarak algılar.",
        "Etki ses, ışık, radyo ve su dalgaları gibi tüm dalgalarda görülür. Günlük hayatta en çok sesle fark edilir: yanınızdan hızla geçen bir aracın motor sesi ya da sireni, tam önünüzden geçtiği anda belirgin biçimde kalınlaşır. Siren aslında aynı notayı çalmaktadır; değişen, sizin duyduğunuz frekanstır."
      ]
    },
    {
      h: "Yaklaşan ambulansın sesi neden incelir?",
      p: [
        "Hareketsiz bir kaynağın yaydığı ses dalgaları her yöne eşit aralıklarla yayılır; dalga tepeleri arasındaki uzaklık, yani dalga boyu, her yönde aynıdır. Kaynak bir yöne hareket ederken ise her yeni dalga tepesini bir öncekinden biraz daha ileride yayar. Hareket yönünde dalga tepeleri birbirine yaklaşır, arkada birbirinden uzaklaşır.",
        "Ses havada her zaman aynı hızla ilerlediği için kısalan dalga boyu, kulağa saniyede daha fazla dalga tepesi ulaşması demektir: frekans artar ve ses incelir. Kaynak uzaklaşırken bunun tersi olur. Örnekte 700 Hz için durgun havada dalga boyu 343 ÷ 700 = 0,49 m iken ambulansın önünde 0,461 m'ye kısalır, arkasında 0,519 m'ye uzar. Dalga boyu ve frekans ilişkisi [[bilgi:dalga-boyu-ve-frekans-iliskisi|dalga boyu ve frekans]] yazısında ayrıntılı anlatılıyor."
      ]
    },
    {
      h: "Algılanan frekans formülü nasıl yazılır?",
      p: [
        "Ses için, ortamın (havanın) durgun olduğu ve kaynak ile gözlemcinin aynı doğru üzerinde hareket ettiği durumda genel formül şöyledir:"
      ],
      formula: "f' = f × (c ± v_g) ÷ (c ∓ v_k)\nf: kaynağın frekansı · f': algılanan frekans · c: ses hızı\nv_g: gözlemcinin hızı · v_k: kaynağın hızı",
      table: {
        head: ["Durum", "Pay (gözlemci)", "Payda (kaynak)", "Sonuç"],
        rows: [
          ["Kaynak gözlemciye yaklaşıyor", "c", "c − v_k", "Frekans artar"],
          ["Kaynak gözlemciden uzaklaşıyor", "c", "c + v_k", "Frekans azalır"],
          ["Gözlemci kaynağa yaklaşıyor", "c + v_g", "c", "Frekans artar"],
          ["Gözlemci kaynaktan uzaklaşıyor", "c − v_g", "c", "Frekans azalır"],
          ["İkisi de birbirine yaklaşıyor", "c + v_g", "c − v_k", "Frekans en çok artar"]
        ]
      },
      after: [
        "Formülün kaynak ve gözlemci için simetrik olmadığına dikkat edin: kaynağın 20 m/s ile yaklaşması ile gözlemcinin 20 m/s ile yaklaşması aynı sonucu vermez. Bunun nedeni, sesin bir ortamda yayılmasıdır; hareketin ortama göre kimde olduğu önemlidir."
      ]
    },
    {
      h: "Kaynak ve gözlemci hareket ettiğinde işaretler nasıl seçilir?",
      p: [
        "İşaret seçimini ezberlemek yerine tek bir kuralı akılda tutmak yeterlidir: <strong>birbirine yaklaşma frekansı artırmalı, uzaklaşma azaltmalıdır</strong>. Frekansı artırmak için ya pay büyümeli ya payda küçülmelidir. Gözlemci yaklaşıyorsa paya + v<sub>g</sub>, kaynak yaklaşıyorsa paydaya − v<sub>k</sub> yazılır. Uzaklaşmada işaretler tersine döner.",
        "Sonucu her zaman mantıkla kontrol edin: yaklaşan bir kaynak için bulduğunuz frekans kaynağın frekansından küçük çıktıysa bir işaret ters seçilmiştir."
      ]
    },
    {
      h: "Çözümlü örnekler: ambulans, yürüyen gözlemci ve karşılaşan araçlar",
      p: [
        "Tüm örneklerde ses hızı 343 m/s (20 °C hava) ve kaynak frekansı 700 Hz alınmıştır. 20 m/s, saatte 72 km'ye eşittir."
      ],
      table: {
        head: ["Durum", "Hesap", "Algılanan frekans"],
        rows: [
          ["Ambulans 20 m/s ile yaklaşıyor", "700 × 343 ÷ (343 − 20)", "743,34 Hz"],
          ["Ambulans 20 m/s ile uzaklaşıyor", "700 × 343 ÷ (343 + 20)", "661,43 Hz"],
          ["Ambulans duruyor, gözlemci 20 m/s ile yaklaşıyor", "700 × (343 + 20) ÷ 343", "740,82 Hz"],
          ["Ambulans 20 m/s, karşıdan araç 15 m/s ile yaklaşıyor", "700 × (343 + 15) ÷ (343 − 20)", "775,85 Hz"],
          ["Ambulans 25 m/s (90 km/sa) ile yaklaşıyor", "700 × 343 ÷ (343 − 25)", "755,03 Hz"]
        ]
      },
      after: [
        "İlk iki satırın farkı 743,34 − 661,43 = 81,9 Hz'dir; ambulans önünüzden geçtiği anda duyduğunuz frekans yaklaşık %11 düşer. Müzikte bu, yaklaşık iki yarım seslik bir inişe karşılık gelir ve kulağın kolayca fark ettiği bir farktır. Kendi değerlerinizle hesap yapmak için [[arac:doppler-etkisi-hesapla|Doppler Etkisi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Ses hızı Doppler hesabını nasıl etkiler?",
      p: [
        "Formüldeki c, sesin içinde yayıldığı ortamdaki hızıdır ve havada sıcaklıkla değişir: 0 °C'de yaklaşık 331 m/s, 20 °C'de 343 m/s, 30 °C'de yaklaşık 349 m/s'dir. Aynı hızdaki kaynak için ses hızı ne kadar düşükse frekans kayması o kadar büyüktür, çünkü kaynağın hızı ses hızına göre daha büyük bir pay oluşturur.",
        "Suda ses yaklaşık 1.480 m/s, vücut dokusunda ortalama 1.540 m/s hızla yayılır; bu yüzden aynı hızlarda Doppler kayması havadakinden çok daha küçüktür. Sıcaklığa göre ses hızını bulmak için [[arac:ses-hizi-hesapla|Ses Hızı Hesaplama]] aracı, konunun ayrıntısı için [[bilgi:ses-hizi-kac-km-saat|ses hızı kaç km/saat]] yazısı işinize yarar."
      ]
    },
    {
      h: "Işıkta kırmızıya ve maviye kayma nedir?",
      p: [
        "Işık da bir dalgadır, ama boşlukta yayılır ve hızı her gözlemci için aynıdır; bu yüzden ışıkta Doppler etkisi görelilik kuramıyla hesaplanır. Işık hızına göre küçük hızlarda basit bir yaklaşım yeterlidir: dalga boyundaki göreli değişim, hızın ışık hızına oranına eşittir. Uzaklaşan bir yıldızın ya da gökadanın tayf çizgileri uzun dalga boyuna, yani kırmızıya; yaklaşanınki kısa dalga boyuna, maviye kayar."
      ],
      formula: "z = Δλ ÷ λ ≈ v ÷ c   (v, ışık hızından çok küçükse)\nÖrnek: hidrojen çizgisi 656,28 nm yerine 656,50 nm ölçülürse\nz = 0,22 ÷ 656,28 ≈ 0,000335 → v ≈ 0,000335 × 300.000 km/s ≈ 100 km/s (uzaklaşıyor)",
      after: [
        "Uzak gökadaların neredeyse tamamında görülen kırmızıya kayma, evrenin genişlediğinin temel kanıtlarından biridir. Çok büyük uzaklıklarda bu kayma, basit hız formülünden çok uzayın kendisinin genişlemesiyle açıklanır. Astronomik uzaklık birimleri için [[bilgi:isik-yili-nedir-kac-km|ışık yılı nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Doppler radarı ve tıpta Doppler ultrason hangi prensiple çalışır?",
      p: [
        "Hız radarı, bilinen frekansta bir radyo dalgası gönderir ve hareket eden araçtan yansıyan dalganın frekansını ölçer. Dalga araca giderken ve araçtan dönerken iki kez kaydığı için frekans farkı yaklaşık 2 × v × f ÷ c olur. 24,125 GHz'te çalışan bir radar için saatte 100 km (27,78 m/s) hızla yaklaşan araçta fark 2 × 27,78 × 24,125 × 10<sup>9</sup> ÷ (3 × 10<sup>8</sup>) ≈ 4.468 Hz'dir. Meteoroloji radarları aynı ilkeyle yağmur damlalarının rüzgârla hareketini ölçer.",
        "Tıpta Doppler ultrason, damarlardaki kan hücrelerinden yansıyan ses dalgalarının frekans kaymasından kan akış hızını ve yönünü hesaplar. Burada ses hızı dokuda yaklaşık 1.540 m/s alınır ve ses demeti ile akış arasındaki açının kosinüsü formüle eklenir. Örneğin 5 MHz'lik problla 60 derecelik açıda 0,5 m/s akış, 2 × 5.000.000 × 0,5 × 0,5 ÷ 1.540 ≈ 1.623 Hz kayma verir; bu, insan kulağının duyabileceği aralıkta olduğu için cihazlar akışı ses olarak da dinletebilir. Değerlendirme ve tanı her zaman hekime aittir."
      ],
      formula: "Radar / ultrason: Δf ≈ 2 × v × f × cos θ ÷ c"
    },
    {
      h: "Ses hızını aşan cisimlerde ne olur? Sık yapılan hatalar",
      p: [
        "Kaynağın hızı ses hızına yaklaştıkça formüldeki payda sıfıra yaklaşır ve önündeki dalgalar üst üste yığılır. Kaynak ses hızını aştığında artık önüne dalga gönderemez; dalga cepheleri koni biçiminde bir şok dalgası oluşturur. Yerdeki gözlemci bu koninin geçişini ani ve güçlü bir patlama sesi (ses patlaması) olarak duyar. Bu durumda basit Doppler formülü uygulanamaz; hızın ses hızına oranı Mach sayısıyla ifade edilir."
      ],
      ul: [
        "<strong>Hızları farklı birimlerde yazmak:</strong> km/sa değerini m/s'ye çevirmeden formüle koymayın; 72 km/sa = 20 m/s'dir.",
        "<strong>İşareti ezberden seçmek:</strong> Yaklaşmada sonuç büyümeli, uzaklaşmada küçülmelidir; sonucu bu kuralla kontrol edin.",
        "<strong>Kaynak ve gözlemciyi aynı saymak:</strong> Seste ikisinin formüldeki yeri farklıdır ve sonuçlar küçük de olsa farklı çıkar.",
        "<strong>Yan yana geçişte de tam kayma beklemek:</strong> Formül doğrusal hareket içindir; kaynak tam yanınızdan geçerken bakış doğrultusundaki hız bileşeni sıfıra iner.",
        "<strong>Rüzgârı unutmak:</strong> Ortamın kendisi hareket ediyorsa (rüzgâr), hızlar havaya göre alınmalıdır."
      ]
    }
  ],
  faq: [
    ["Doppler etkisi nedir?", "Doppler etkisi, dalga kaynağı ile gözlemci birbirine göre hareket ettiğinde algılanan frekansın kaynağın gerçek frekansından farklı olmasıdır. Yaklaşmada frekans artar, uzaklaşmada azalır; ses, ışık ve radyo dalgalarında görülür."],
    ["Yaklaşan ambulansın sesi neden incelir, uzaklaşınca kalınlaşır?", "Hareket eden siren önündeki dalgaları sıkıştırıp arkasındakileri seyreltir. Öndeki gözlemciye saniyede daha çok dalga tepesi ulaştığı için frekans artar ve ses incelir; arkada frekans azalır ve ses kalınlaşır."],
    ["Algılanan frekans formülü nasıl yazılır?", "Ses için f' = f × (c ± v_g) ÷ (c ∓ v_k) formülü kullanılır. Burada c ses hızı, v_g gözlemcinin, v_k kaynağın hızıdır; işaretler yaklaşmada frekansı artıracak biçimde seçilir."],
    ["Kaynak ve gözlemci hareket ettiğinde işaretler nasıl seçilir?", "Birbirine yaklaşma frekansı artırmalıdır: gözlemci yaklaşıyorsa paya artı, kaynak yaklaşıyorsa paydaya eksi yazılır. Uzaklaşmada işaretler ters çevrilir ve sonuç kaynağın frekansından küçük çıkmalıdır."],
    ["Ses hızı Doppler hesabını nasıl etkiler?", "Ses hızı ortama ve sıcaklığa göre değişir; havada 20 °C'de yaklaşık 343 m/s'dir. Ses hızı düştükçe aynı kaynak hızı daha büyük bir frekans kaymasına yol açar; suda ve dokuda kayma çok daha küçüktür."],
    ["Işıkta kırmızıya ve maviye kayma nedir?", "Uzaklaşan bir ışık kaynağının tayf çizgileri uzun dalga boyuna, yani kırmızıya; yaklaşanınki kısa dalga boyuna, maviye kayar. Küçük hızlarda kayma oranı yaklaşık olarak hızın ışık hızına oranına eşittir."],
    ["Doppler radarı hız ölçmede nasıl kullanılır?", "Radar gönderdiği dalganın araçtan yansıyan kısmının frekansını ölçer. Dalga iki kez kaydığı için fark yaklaşık 2 × v × f ÷ c olur; bu farktan aracın hızı hesaplanır."],
    ["Tıpta Doppler ultrason hangi prensiple çalışır?", "Cihaz, damarlardaki kan hücrelerinden yansıyan ultrasonun frekans kaymasını ölçerek kan akışının hızını ve yönünü hesaplar. Dokuda ses hızı yaklaşık 1.540 m/s alınır ve ses demeti ile akış arasındaki açı hesaba katılır."],
    ["Ses hızını aşan cisimlerde ne olur?", "Kaynak ses hızını aştığında önüne dalga gönderemez; dalga cepheleri koni biçiminde bir şok dalgası oluşturur ve yerde ses patlaması duyulur. Bu durumda basit Doppler formülü geçerli değildir."]
  ],
  tools: ["doppler-etkisi-hesapla", "ses-hizi-hesapla", "dalga-boyu-frekans-hesapla"],
  related: ["ses-hizi-kac-km-saat", "dalga-boyu-ve-frekans-iliskisi", "simsek-ne-kadar-uzakta-nasil-hesaplanir"]
};
