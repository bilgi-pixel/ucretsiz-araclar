export default {
  slug: "bisiklette-kadans-nedir",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "Bisiklette Kadans Nedir? Pedal Devri, Vites Oranı ve Hız Hesabı",
  pageTitle: "Bisiklette Kadans Nedir? İdeal Kadans, Vites Oranı ve Hız",
  description: "Bisiklette kadans nedir, ideal kadans kaç rpm? Vites oranı hesabı, kadanstan hız bulma formülü, yokuşta vites seçimi, kadans sensörü ve kalori hesabı örnekli.",
  keywords: ["bisiklet kadans nedir", "ideal kadans kaç rpm", "bisiklet vites oranı", "bisiklet hızı hesaplama", "pedal devri", "bisiklet kaç kalori yakar", "yokuşta vites seçimi", "kadans sensörü"],
  lead: "Kadans, <strong>bisiklette pedalların bir dakikada kaç tam tur döndüğüdür</strong> ve devir/dakika (rpm) ile ölçülür. Rahat bir şehir sürüşünde kadans genellikle 60–80 rpm, deneyimli yol bisikletçilerinde 80–100 rpm civarındadır. Hız; kadans, vites oranı ve tekerlek çevresiyle belirlenir: 50/17 vitesinde, 2.105 mm çevreli tekerlekle 90 rpm kadans yaklaşık 33,4 km/sa eder. Bu yazıda kadansın ne işe yaradığını, vites oranı ve hız formüllerini, yokuşta vites seçimini ve kalori hesabını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Kadans = dakikadaki pedal turu sayısı (rpm); 30 saniyede 45 tur 90 rpm eder.",
    "Vites oranı = ön dişli (aynakol) diş sayısı ÷ arka dişli diş sayısı; 50/17 için 2,94.",
    "Pedal turu başına yol = vites oranı × tekerlek çevresi; 2,94 × 2,105 m = 6,19 m.",
    "Hız (km/sa) = kadans × pedal turu başına yol (m) × 60 ÷ 1.000.",
    "Yokuşta küçük ön, büyük arka dişliyle (düşük vites oranı) kadansı koruyarak çıkmak dizleri daha az zorlar.",
    "Kalori yaklaşık olarak MET × kilo × saat formülüyle tahmin edilir; tempoya göre değişir."
  ],
  figure: {
    alt: "Bisiklet aktarma şeması: 50 dişli aynakol ve 17 dişli arka dişli, vites oranı 2,94; bir pedal turunda tekerlek 2,94 tur döner ve 6,19 metre yol alınır; 90 rpm kadansla hız 33,4 km/sa.",
    caption: "50/17 vitesinde bir pedal turu tekerleği 2,94 tur döndürür. 2.105 mm çevreli tekerlekte bu 6,19 metre eder; dakikada 90 pedal turuyla saatte yaklaşık 33,4 km gidilir. Aynı vitesle 60 rpm kadans 22,3 km/sa verir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kadans, vites oranı ve hız</text>
  <circle cx="150" cy="150" r="70" class="sf sb"/>
  <circle cx="150" cy="150" r="58" class="ps"/>
  <text x="150" y="146" class="b mid">Aynakol</text><text x="150" y="168" class="lg b mid">50 diş</text>
  <circle cx="400" cy="150" r="30" class="sf sb"/>
  <circle cx="400" cy="150" r="22" class="oks"/>
  <text x="400" y="156" class="b mid">17</text>
  <line x1="150" y1="80" x2="400" y2="120" class="st sw" fill="none"/>
  <line x1="150" y1="220" x2="400" y2="180" class="st sw" fill="none"/>
  <text x="275" y="94" class="sm mid t2">zincir</text>
  <text x="400" y="204" class="sm mid">arka dişli</text>
  <rect x="470" y="62" width="230" height="64" rx="10" class="p"/>
  <text x="585" y="88" class="b mid sf">Vites oranı</text>
  <text x="585" y="112" class="mid sf">50 ÷ 17 = 2,94</text>
  <rect x="470" y="136" width="230" height="64" rx="10" class="ps"/>
  <text x="585" y="162" class="b mid">Pedal turu başına yol</text>
  <text x="585" y="186" class="mid">2,94 × 2,105 m = 6,19 m</text>
  <rect x="470" y="210" width="230" height="64" rx="10" class="oks"/>
  <text x="585" y="236" class="b mid">90 rpm'de hız</text>
  <text x="585" y="260" class="mid">90 × 6,19 × 60 ÷ 1.000 ≈ 33,4 km/sa</text>
  <text x="30" y="300" class="b">Aynı vitesle (50/17) kadansa göre hız</text>
  <g class="sm">
    <text x="30" y="328">60 rpm</text><rect x="100" y="316" width="223" height="16" rx="3" class="ps"/><text x="330" y="328" class="b">22,3 km/sa</text>
    <text x="30" y="352">90 rpm</text><rect x="100" y="340" width="334" height="16" rx="3" class="p"/><text x="440" y="352" class="b">33,4 km/sa</text>
    <text x="30" y="376">100 rpm</text><rect x="100" y="364" width="372" height="16" rx="3" class="p"/><text x="478" y="376" class="b">37,2 km/sa</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Bisiklette kadans nedir?",
      p: [
        "Kadans, pedalların dakikada kaç tam tur döndüğünü gösteren ölçüdür ve İngilizce <em>revolutions per minute</em> kısaltmasıyla rpm (devir/dakika) olarak ifade edilir. Bir pedal turu, sağ pedalın en üst noktadan başlayıp yeniden en üst noktaya gelmesidir. Kadansı ölçmenin en basit yolu, 30 saniye boyunca sağ dizinizin kaç kez en üste çıktığını sayıp ikiyle çarpmaktır: 45 tur sayarsanız kadansınız 90 rpm'dir.",
        "Kadans, bisikletçinin gücü nasıl ürettiğini anlatır. Aynı hızı iki yolla elde edebilirsiniz: ağır bir viteste yavaş çevirerek (düşük kadans, yüksek kuvvet) ya da hafif bir viteste hızlı çevirerek (yüksek kadans, düşük kuvvet). Hangisinin daha verimli olduğu kişiye, sürüşün süresine ve araziye göre değişir; ama kadansı bilmek, vites seçimini bilinçli yapmanın ilk adımıdır."
      ]
    },
    {
      h: "İdeal kadans kaç rpm olmalı?",
      p: [
        "Herkes için tek bir ideal kadans yoktur. Genel gözlemler, yeni başlayanların doğal olarak 60–70 rpm civarında pedal çevirdiğini, deneyimli yol bisikletçilerinin ise düz yolda çoğunlukla 80–100 rpm aralığını tercih ettiğini gösterir. Dağ bisikletinde ve dik yokuşlarda kadans genellikle daha düşüktür; arazi ve tutuş koşulları burada belirleyicidir."
      ],
      table: {
        head: ["Sürüş türü", "Tipik kadans aralığı", "Not"],
        rows: [
          ["Şehir içi, rahat sürüş", "60–80 rpm", "Konforlu, konuşarak sürülebilir tempo"],
          ["Yol bisikleti, düz yol", "80–100 rpm", "Uzun sürede kas yorgunluğunu azaltır"],
          ["Yokuş çıkışı", "60–85 rpm", "Vites küçültülerek kadans korunmaya çalışılır"],
          ["Sprint", "100–120+ rpm", "Kısa süreli, yüksek güç"],
          ["Dağ bisikleti, teknik arazi", "60–80 rpm", "Tutuş ve denge öncelikli"]
        ],
        caption: "Aralıklar genel gözlemlerdir; kendinize uygun kadansı konfor ve nefes durumunuza göre bulun."
      },
      after: [
        "Kadansı artırmaya çalışırken amaç sıçramadan, kalçanız selede sabit kalarak akıcı çevirmektir. Selede zıplıyorsanız kadans o an için fazla yüksek demektir. Dizlerinizde ağrı hissediyorsanız çok ağır bir viteste düşük kadansla zorlanıyor olabilirsiniz; ağrı sürerse sürüşe ara verip bir sağlık uzmanına danışın. Sele yüksekliği ve kadro ölçüsü de diz yükünü etkiler; doğru ölçü için [[bilgi:bisiklet-kadro-boyu-nasil-secilir|bisiklet kadro boyu]] yazısına bakın."
      ]
    },
    {
      h: "Vites oranı nasıl hesaplanır?",
      p: [
        "Vites oranı, ön dişlinin (aynakol) diş sayısının arka dişlinin diş sayısına bölünmesiyle bulunur. Bu oran, bir pedal turunda arka tekerleğin kaç tur döndüğünü söyler. 50 dişli aynakol ve 17 dişli arka dişlide oran 50 ÷ 17 = 2,94'tür: her pedal turunda tekerlek yaklaşık üç tur döner."
      ],
      formula: "Vites oranı = aynakol diş sayısı ÷ arka dişli diş sayısı\nPedal turu başına yol (m) = vites oranı × tekerlek çevresi (m)\nDişli inç = vites oranı × tekerlek çapı (inç)",
      table: {
        head: ["Vites (ön/arka)", "Oran", "Pedal turu başına yol", "Kullanım"],
        rows: [
          ["34/32", "1,06", "2,24 m", "Dik yokuş, en hafif vites"],
          ["34/28", "1,21", "2,56 m", "Yokuş"],
          ["50/17", "2,94", "6,19 m", "Düz yol temposu"],
          ["50/11", "4,55", "9,57 m", "İniş, en ağır vites"]
        ],
        caption: "Yol, 700×25C lastik için yaklaşık 2.105 mm tekerlek çevresiyle hesaplanmıştır."
      },
      after: [
        "Oran büyüdükçe vites \"ağırlaşır\": her pedal turunda daha çok yol alırsınız ama pedalı çevirmek için daha fazla kuvvet gerekir. Dişli inç değeri ise eski bir gelenekten gelir ve oranı tekerlek çapıyla (yol bisikletinde yaklaşık 27 inç) çarpar; 50/17 için yaklaşık 79 inç bulunur. Tüm vites kombinasyonlarınızı tablo halinde görmek için [[arac:bisiklet-vites-orani-hesapla|Bisiklet Vites Oranı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kadanstan hız nasıl bulunur? Çözümlü örnek",
      p: [
        "Kadans, vites oranı ve tekerlek çevresi bilinirse teorik hız doğrudan hesaplanır. Tekerlek çevresi lastik ölçüsüne bağlıdır; 700×25C yol lastiği için yaklaşık 2.105 mm, 700×32C için yaklaşık 2.155 mm, 26 × 2,0 inç dağ bisikleti lastiği için yaklaşık 2.055 mm kullanılır. En doğru değer, lastiği bir tam tur yuvarlayıp yerde aldığı yolu ölçerek bulunur."
      ],
      ol: [
        "Vites oranını bulun: 50 ÷ 17 = 2,941.",
        "Pedal turu başına yolu bulun: 2,941 × 2,105 m = 6,191 m.",
        "Dakikadaki yolu bulun: 90 rpm × 6,191 m = 557,2 m/dk.",
        "Saate çevirin: 557,2 × 60 ÷ 1.000 = 33,4 km/sa.",
        "Ters hesap: aynı viteste 30 km/sa için gereken kadans = 30 × 1.000 ÷ 60 ÷ 6,191 ≈ 80,8 rpm."
      ],
      formula: "Hız (km/sa) = kadans (rpm) × vites oranı × tekerlek çevresi (m) × 60 ÷ 1.000\nKadans = hız × 1.000 ÷ 60 ÷ (vites oranı × tekerlek çevresi)",
      after: [
        "Bu hız teoriktir; rüzgâr, eğim ve yol koşulları gerçek hızı değil, bu kadansı korumak için gereken kuvveti değiştirir. Hesabı [[arac:bisiklet-hiz-kadans-hesapla|Bisiklet Hız ve Kadans Hesaplama]] aracıyla yapabilirsiniz; araç seçtiğiniz vites için 60–110 rpm arası hız tablosunu da gösterir. Hız, yol ve süre ilişkisinin genel formülü [[bilgi:hiz-yol-zaman-formulu|hız yol zaman formülü]] yazısındadır."
      ]
    },
    {
      h: "Yokuşta hangi vites kullanılmalı?",
      p: [
        "Yokuşta amaç, kadansı çok fazla düşürmeden çıkmaktır. Bunun için vites oranını küçültürsünüz: önde küçük aynakola, arkada büyük dişliye geçersiniz. 34/28 vitesinde 70 rpm kadans yaklaşık 10,7 km/sa eder; aynı kadansla 50/17 vitesinde 26 km/sa gitmeniz gerekirdi ki bu dik bir yokuşta çoğu kişi için mümkün değildir.",
        "Vitesi yokuşa girmeden önce, pedal üzerindeki baskı hafifken değiştirmek hem zincir ve dişlileri korur hem de ritminizi bozmaz. Zincirin çapraz çalışmasından (büyük aynakol ile en büyük arka dişli ya da küçük aynakol ile en küçük arka dişli) kaçının; bu kombinasyonlar zincir aşınmasını artırır. Yokuşu ayakta çıkmak kısa süreli güç sağlar ama nabzı hızla yükseltir; uzun yokuşlarda oturarak, düzenli bir kadansla çıkmak çoğu kişi için daha sürdürülebilirdir."
      ]
    },
    {
      h: "Yüksek kadans mı düşük kadans mı daha verimli?",
      p: [
        "Bu soru spor bilimcileri arasında uzun süredir tartışılır. Laboratuvar ölçümlerinde birçok kişide en düşük enerji harcaması 60–80 rpm gibi görece düşük kadanslarda görülür. Buna karşın deneyimli bisikletçiler çoğunlukla 85–95 rpm'i tercih eder, çünkü yüksek kadansta her pedal darbesinde gereken kuvvet azalır ve bacak kasları uzun sürüşlerde daha geç yorulur.",
        "Pratik bir yaklaşım şöyledir: kısa ve rahat sürüşlerde kendinizi zorlamadan doğal kadansınızla sürün; uzun sürüşlerde kadansınızı kademeli olarak 5–10 rpm artırmayı deneyin ve nefesiniz, nabzınız ve kas hissiniz üzerinden kendinize uygun aralığı bulun. Yüksek kadans kalp-damar sistemini, düşük kadans kasları daha fazla zorlar; ikisi arasındaki dengeyi bulmak zamanla gelişir."
      ]
    },
    {
      h: "Bisiklet sürmek saatte kaç kalori yakar?",
      p: [
        "Bisikletle harcanan enerji hız, arazi, rüzgâr ve kişinin kilosuna göre değişir. En yaygın tahmin yöntemi MET (metabolik eşdeğer) değerini kullanır: <strong>kalori ≈ MET × vücut ağırlığı (kg) × süre (saat)</strong>. Fiziksel aktivite rehberlerinde yavaş tempolu, keyif amaçlı bisiklet sürüşü için MET yaklaşık 4–7, orta tempolu sürüş için 8 civarı, hızlı sürüş için 10 ve üzeri değerler verilir.",
        "Örnek: 70 kg'lık biri 1 saat boyunca orta tempoda (MET ≈ 8) sürerse yaklaşık 8 × 70 × 1 = 560 kcal harcar. Aynı kişi rahat bir şehir turunda (MET ≈ 5) yaklaşık 350 kcal harcar. Bu değerler kabaca tahmindir; ayrıntı için [[bilgi:met-degeri-nedir-kalori-nasil-hesaplanir|MET değeri nedir]] yazısına, hesap için [[arac:bisiklet-kalori-hesapla|Bisiklet Kalori Hesaplama]] aracına bakabilirsiniz."
      ]
    },
    {
      h: "Kadans sensörü ne işe yarar?",
      p: [
        "Kadans sensörü, genellikle pedal koluna ya da aynakola takılan küçük bir cihazdır ve her pedal turunu algılayarak kadansı anlık olarak bisiklet bilgisayarına, akıllı saate ya da telefona gönderir. Hız sensörü ise tekerlek göbeğine takılır ve tekerlek dönüşünü ölçer. İkisi birlikte kullanıldığında hangi viteste hangi kadansla ne hızda gittiğinizi görürsünüz.",
        "Sensör olmadan da kadansı ölçebilirsiniz: 30 saniye sayıp ikiyle çarpmak ya da tempo uygulamasıyla ritim tutmak yeterlidir. Sensörün asıl faydası, antrenman sırasında kadansı sürekli izleyip belirli bir aralıkta kalmayı kolaylaştırmasıdır. Kadans verisini nabızla birlikte izlemek, gücü nasıl ürettiğinizi daha iyi anlamanızı sağlar; nabız bölgeleri için [[bilgi:yag-yakim-nabzi-kac-olmali|nabız bölgeleri]] yazısı faydalı olabilir."
      ]
    },
    {
      h: "Güvenlik ve sık yapılan hatalar",
      ul: [
        "<strong>Ağır viteste zorlamak:</strong> Düşük kadansla yüksek kuvvet uygulamak dizlere yük bindirir; vitesi zamanında küçültün.",
        "<strong>Yokuşta geç vites değiştirmek:</strong> Pedal üzerinde tam baskı varken vites değiştirmek zincirin atmasına yol açabilir.",
        "<strong>Lastik çevresini yanlış girmek:</strong> Hız hesabında yanlış çevre değeri, sonuçta yüzde birkaçlık sapma yaratır.",
        "<strong>Kaskı ihmal etmek:</strong> Kısa mesafede bile kask takın, trafikte görünür kıyafet ve ışık kullanın.",
        "<strong>Kendini zorlamak:</strong> Göğüs ağrısı, baş dönmesi ya da olağandışı nefes darlığında sürüşü bırakın ve bir hekime başvurun; kronik rahatsızlığınız varsa antrenman planını hekiminizle konuşun."
      ]
    }
  ],
  faq: [
    ["Bisiklette kadans nedir?", "Kadans, bisiklette pedalların dakikada kaç tam tur döndüğünü gösteren ölçüdür ve rpm, yani devir/dakika ile ifade edilir. 30 saniyede sayılan pedal turu ikiyle çarpılarak kolayca bulunabilir."],
    ["İdeal kadans kaç rpm olmalı?", "Tek bir ideal değer yoktur. Rahat şehir sürüşünde 60–80 rpm, deneyimli yol bisikletçilerinde düz yolda 80–100 rpm yaygındır. Uygun kadansı konfor, nefes ve kas hissinize göre kendiniz belirlersiniz."],
    ["Vites oranı nasıl hesaplanır?", "Ön dişlinin (aynakol) diş sayısı arka dişlinin diş sayısına bölünür. 50 dişli aynakol ve 17 dişli arka dişlide oran 2,94'tür; yani her pedal turunda arka tekerlek yaklaşık 2,94 tur döner."],
    ["Kadanstan hız nasıl bulunur?", "Hız = kadans × vites oranı × tekerlek çevresi × 60 ÷ 1.000 formülüyle km/sa olarak bulunur. 50/17 vitesinde 2,105 metre çevreli tekerlek ve 90 rpm kadansla hız yaklaşık 33,4 km/sa'tir."],
    ["Yokuşta hangi vites kullanılmalı?", "Yokuşta önde küçük aynakol, arkada büyük dişli seçilerek vites oranı küçültülür ve kadans korunur. Vitesi yokuşa girmeden, pedal baskısı hafifken değiştirmek zinciri ve ritminizi korur."],
    ["Yüksek kadans mı düşük kadans mı daha verimli?", "Laboratuvarda birçok kişide en düşük enerji harcaması 60–80 rpm civarında görülür, ancak deneyimli bisikletçiler kas yorgunluğunu azalttığı için 85–95 rpm'i tercih eder. Doğru aralık kişiden kişiye değişir."],
    ["Bisiklet sürmek saatte kaç kalori yakar?", "Kalori yaklaşık MET × kilo × saat formülüyle tahmin edilir. 70 kg'lık biri orta tempoda (MET ≈ 8) bir saatte yaklaşık 560 kcal, rahat bir şehir turunda (MET ≈ 5) yaklaşık 350 kcal harcar."],
    ["Kadans sensörü ne işe yarar?", "Kadans sensörü her pedal turunu algılayıp anlık kadansı bisiklet bilgisayarına ya da telefona gönderir. Antrenmanda kadansı sürekli izleyip belirli bir aralıkta kalmayı ve vites seçimini kolaylaştırır."],
    ["Tekerlek çevresi nasıl ölçülür?", "Lastiğin yere değen noktasını işaretleyip bisikleti düz bir zeminde bir tam tur ilerletin ve iki işaret arasındaki mesafeyi milimetre olarak ölçün. Üzerine oturarak ölçmek, lastik basıklığını da hesaba katar."]
  ],
  tools: ["bisiklet-hiz-kadans-hesapla", "bisiklet-vites-orani-hesapla", "bisiklet-kalori-hesapla", "bisiklet-kadro-boyu-bul"],
  related: ["bisiklet-kadro-boyu-nasil-secilir", "met-degeri-nedir-kalori-nasil-hesaplanir", "hiz-yol-zaman-formulu", "yag-yakim-nabzi-kac-olmali"],
  uyari: "tıbbi ya da antrenman tavsiyesi değildir; kronik bir rahatsızlığınız varsa egzersiz planınızı hekiminizle belirleyin"
};
