export default {
  slug: "vites-orani-nedir-devire-gore-hiz",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Vites Oranı Nedir? Motor Devri, Diferansiyel ve Lastikten Hız Hesabı",
  pageTitle: "Vites Oranı Nedir? Devire Göre Hız ve Diferansiyel Hesabı",
  description: "Vites oranı nedir, motor devrinden hız nasıl hesaplanır? Diferansiyel oranı, lastik ebadının hıza ve kilometre sayacına etkisi, kısa-uzun vites farkı ve tork ilişkisi.",
  keywords: ["vites oranı nedir", "devire göre hız", "şanzıman oranı", "diferansiyel oranı", "3000 devirde kaç km", "lastik çevresi", "vites hız tablosu", "son dişli oranı"],
  lead: "Vites oranı, motor krank milinin şanzıman çıkışını bir tur döndürmek için kaç tur attığını gösterir; 3,73 oranlı birinci viteste motor 3,73 tur döndüğünde şanzıman çıkışı 1 tur döner. Araç hızı <strong>motor devri ÷ (vites oranı × diferansiyel oranı) × lastik çevresi</strong> formülüyle bulunur. 205/55 R16 lastikli, 3,94 diferansiyelli bir araç 0,71 oranlı altıncı viteste 3.000 d/d'de yaklaşık 127,7 km/sa gider. Bu sayfada formülü adım adım, vites hız tablosunu, lastik değişiminin etkisini ve tork ilişkisini bulacaksınız.",
  kisaCevap: [
    "Vites oranı = giriş dişlisinin tur sayısı ÷ çıkış dişlisinin tur sayısı; 1'den büyük oran hızı düşürüp torku artırır.",
    "Toplam aktarma oranı = vites oranı × diferansiyel (son dişli) oranı; 0,71 × 3,94 = 2,797.",
    "Hız (km/sa) = devir ÷ toplam oran × lastik çevresi (mm) × 60 ÷ 1.000.000.",
    "205/55 R16 lastiğin çapı 631,9 mm, çevresi yaklaşık 1.985 mm'dir.",
    "Örnek: 3.000 d/d, 6. vites (0,71), diferansiyel 3,94 → yaklaşık 127,7 km/sa; 120 km/sa için yaklaşık 2.818 d/d.",
    "Lastik çapı yüzde 5 büyürse aynı devirde gerçek hız yüzde 5 artar, ama gösterge eski değeri göstermeye devam eder."
  ],
  figure: {
    alt: "Motordan tekerleğe güç aktarımı akış şeması: motor 3000 d/d, şanzıman 0,71, diferansiyel 3,94, tekerlek 1072 d/d ve 1985 mm çevreli lastikle 127,7 km/sa hız.",
    caption: "Devir her aktarma kademesinde orana bölünür, tork ise aynı oranla çarpılır (kayıplar hariç). Tekerlek devri lastik çevresiyle çarpılınca yol hızı bulunur.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="okv" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Motor devrinden yol hızına</text>
  <rect x="20" y="60" width="140" height="96" rx="10" class="p"/>
  <text x="90" y="92" class="b mid sf">Motor</text><text x="90" y="122" class="xl mid sf">3.000</text><text x="90" y="144" class="sm mid sf">d/d</text>
  <line x1="162" y1="108" x2="196" y2="108" class="sp sw" fill="none" marker-end="url(#okv)"/>
  <rect x="200" y="60" width="140" height="96" rx="10" class="sf sb"/>
  <text x="270" y="92" class="b mid">Şanzıman</text><text x="270" y="122" class="xl mid">÷ 0,71</text><text x="270" y="144" class="sm mid t2">6. vites</text>
  <line x1="342" y1="108" x2="376" y2="108" class="sp sw" fill="none" marker-end="url(#okv)"/>
  <rect x="380" y="60" width="140" height="96" rx="10" class="sf sb"/>
  <text x="450" y="92" class="b mid">Diferansiyel</text><text x="450" y="122" class="xl mid">÷ 3,94</text><text x="450" y="144" class="sm mid t2">son dişli</text>
  <line x1="522" y1="108" x2="556" y2="108" class="sp sw" fill="none" marker-end="url(#okv)"/>
  <rect x="560" y="60" width="140" height="96" rx="10" class="oks"/>
  <text x="630" y="92" class="b mid">Tekerlek</text><text x="630" y="122" class="xl mid">1.072</text><text x="630" y="144" class="sm mid">d/d</text>
  <circle cx="630" cy="250" r="62" class="sf sb"/><circle cx="630" cy="250" r="34" class="ps"/>
  <text x="630" y="246" class="sm mid b">205/55 R16</text><text x="630" y="262" class="sm mid">Ø 631,9 mm</text>
  <text x="630" y="336" class="sm mid">çevre 1.985 mm</text>
  <rect x="20" y="190" width="520" height="96" rx="10" class="sf sb"/>
  <text x="36" y="216" class="b">Hesap</text>
  <text x="36" y="240" class="sm">Toplam oran = 0,71 × 3,94 = 2,797</text>
  <text x="36" y="262" class="sm">Tekerlek devri = 3.000 ÷ 2,797 = 1.072,4 d/d</text>
  <text x="36" y="282" class="sm">Hız = 1.072,4 × 1,985 m × 60 ÷ 1.000 = <tspan class="b p">127,7 km/sa</tspan></text>
  <rect x="20" y="304" width="520" height="80" rx="10" class="ps"/>
  <text x="36" y="330" class="b">Tork ters yönde büyür</text>
  <text x="36" y="352" class="sm">250 Nm × 2,797 ≈ 699 Nm tekerlek torku (6. vites, kayıplar hariç)</text>
  <text x="36" y="372" class="sm">250 Nm × 14,70 ≈ 3.674 Nm (1. vites: 3,73 × 3,94)</text>
</svg>`
  },
  sections: [
    {
      h: "Vites oranı nedir?",
      p: [
        "Bir dişli çiftinde oran, büyük dişlinin diş sayısının küçük dişlinin diş sayısına bölümüdür. 11 dişli bir dişli 41 dişli bir dişliyi döndürüyorsa oran 41 ÷ 11 = 3,73'tür: giriş 3,73 tur attığında çıkış 1 tur atar. Şanzımandaki her vites, farklı bir dişli çiftinin devreye girmesidir ve kendi oranı vardır.",
        "Oran 1'den büyükse çıkış girişten <strong>yavaş</strong> döner ama <strong>daha fazla tork</strong> taşır; birinci ve ikinci vitesler böyledir. Oran 1'e eşitse (çoğu araçta dördüncü ya da beşinci vites) motor ve çıkış aynı hızda döner; buna direkt vites denir. Oran 1'den küçükse çıkış motordan hızlı döner; buna overdrive denir ve yakıt tasarrufu için en üst viteslerde kullanılır.",
        "Bu ilişki, enerjinin korunumunun bir sonucudur: dişli kutusu gücü artırmaz, yalnızca devir ile tork arasında takas yapar. Devir yarıya inerse tork (kayıplar hariç) iki katına çıkar. Güç, tork ve devir ilişkisi için [[bilgi:beygir-gucu-ve-tork-farki|beygir gücü ve tork yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Motor devrinden araç hızı nasıl hesaplanır?",
      p: [
        "Motor ile tekerlek arasında iki aktarma kademesi vardır: şanzıman (vites oranı) ve diferansiyel (son dişli oranı). İkisi çarpılarak toplam aktarma oranı bulunur. Motor devri bu orana bölündüğünde tekerleğin dakikadaki devri çıkar; tekerlek devri lastik çevresiyle çarpılınca yol hızı bulunur."
      ],
      formula: "Lastik çapı (mm) = jant (inç) × 25,4 + 2 × taban genişliği × yanak oranı ÷ 100\nLastik çevresi (mm) = π × çap\nTekerlek devri (d/d) = motor devri ÷ (vites oranı × diferansiyel oranı)\nHız (km/sa) = tekerlek devri × çevre (mm) × 60 ÷ 1.000.000",
      ol: [
        "Lastik: 205/55 R16. Yanak yüksekliği 205 × 0,55 = 112,75 mm; çap 16 × 25,4 + 2 × 112,75 = 406,4 + 225,5 = 631,9 mm.",
        "Çevre: π × 631,9 ≈ 1.985,2 mm, yani yaklaşık 1,985 m.",
        "Toplam oran: altıncı vites 0,71 × diferansiyel 3,94 = 2,797.",
        "Tekerlek devri: 3.000 ÷ 2,797 ≈ 1.072,4 d/d.",
        "Hız: 1.072,4 × 1.985,2 × 60 ÷ 1.000.000 ≈ <strong>127,7 km/sa</strong>.",
        "Ters yönde: 120 km/sa için gereken devir 120 ÷ 127,7 × 3.000 ≈ 2.818 d/d olur. Kısa yol: bu viteste 1.000 d/d başına 42,58 km/sa."
      ],
      after: [
        "Bu hesap kuramsal hızı verir. Gerçek hız; debriyaj ya da tork konvertöründeki kayma, lastiğin yük altında ezilmesi ve diş aşınması nedeniyle genellikle birkaç yüzde daha düşüktür. Hesabı kendi aracınızın değerleriyle yapmak için [[arac:vites-hiz-hesapla|Vites Oranına Göre Hız Hesaplama]] aracını kullanabilirsiniz; araç 1.000 devir başına hızı ve tekerlek devrini de gösterir."
      ]
    },
    {
      h: "Örnek vites hız tablosu (3.000 d/d)",
      p: [
        "Aşağıdaki tablo, 205/55 R16 lastikli ve 3,94 diferansiyel oranlı örnek bir altı vitesli şanzımanda motor 3.000 d/d'de dönerken her vitesteki hızı gösterir. Oranlar örnektir; aracınızın kendi değerleri kullanım kılavuzunda ya da teknik föyünde yazar."
      ],
      table: {
        head: ["Vites", "Vites oranı", "Toplam oran", "3.000 d/d'de hız", "Tekerlek torku (250 Nm motor)"],
        rows: [
          ["1", "3,73", "14,696", "24,3 km/sa", "3.674 Nm"],
          ["2", "2,14", "8,432", "42,4 km/sa", "2.108 Nm"],
          ["3", "1,39", "5,477", "65,2 km/sa", "1.369 Nm"],
          ["4", "1,03", "4,058", "88,1 km/sa", "1.015 Nm"],
          ["5", "0,89", "3,507", "101,9 km/sa", "877 Nm"],
          ["6", "0,71", "2,797", "127,7 km/sa", "699 Nm"]
        ],
        caption: "Tekerlek torku = motor torku × toplam oran; şanzıman ve diferansiyeldeki yaklaşık yüzde 5–15'lik verim kayıpları dahil değildir."
      },
      after: [
        "Tablo iki şeyi açıkça gösterir: aynı motor devrinde birinci vites altıncı vitesin yaklaşık beşte biri kadar hız verir, ama tekerleğe beş kat fazla tork iletir. Kalkışta ve yokuşta düşük vitesin, otoyolda yüksek vitesin seçilmesinin nedeni budur."
      ]
    },
    {
      h: "Diferansiyel (son dişli) oranı hıza nasıl etki eder?",
      p: [
        "Diferansiyel, şanzımandan gelen hareketi tekerleklere aktaran ve virajda iç ve dış tekerleğin farklı hızda dönmesine izin veren son kademedir. Oranı tüm viteslere aynı şekilde etki eder: diferansiyel oranı büyüdükçe her viteste aynı devirde daha düşük hız, daha yüksek tork elde edilir.",
        "Örnek: Diferansiyel 3,94 yerine 4,30 olsaydı altıncı viteste 3.000 d/d'deki hız 127,7 km/sa'ten yaklaşık 117,0 km/sa'e düşerdi. Araç daha çevik hızlanır ama otoyolda daha yüksek devirde gider; bu da gürültüyü ve genellikle yakıt tüketimini artırır. Bu yüzden aynı modelin farklı motor seçeneklerinde farklı son dişli oranları kullanılabilir."
      ]
    },
    {
      h: "Lastik ebadı değişince hız ve kilometre sayacı nasıl etkilenir?",
      p: [
        "Hız göstergesi ve kilometre sayacı, şanzıman ya da tekerlek dönüşünü sayar ve fabrika lastik çevresini varsayar. Daha büyük çaplı bir lastik takıldığında tekerlek her turda daha uzun yol alır; gösterge bunu bilmediği için gerçek hızı olduğundan düşük, gidilen yolu da olduğundan kısa gösterir."
      ],
      table: {
        head: ["Lastik", "Çap", "Fabrika ebadına göre fark", "3.000 d/d, 6. viteste gerçek hız"],
        rows: [
          ["205/55 R16 (fabrika)", "631,9 mm", "—", "127,7 km/sa"],
          ["225/45 R17", "634,3 mm", "+%0,38", "128,2 km/sa"],
          ["215/60 R16", "664,4 mm", "+%5,14", "134,3 km/sa"]
        ],
        caption: "Gösterge her üç durumda da yaklaşık aynı hızı gösterir; fark, gerçek hız ile gösterge arasındaki sapmadır."
      },
      after: [
        "Çap farkı yüzde 1–2'yi aşan değişikliklerde gösterge sapması hissedilir hâle gelir. Örnekteki 215/60 R16 lastikle gösterge 128 km/sa gösterirken araç gerçekte yaklaşık 134 km/sa hızla gidebilir; bu hız sınırlarında önemli bir farktır. Lastik değiştirmeden önce iki ebadı [[arac:lastik-karsilastir|Lastik Ebadı Karşılaştırma]] aracında kıyaslayın. Ebat kodlarının anlamı [[bilgi:lastik-ebatlari-nasil-okunur|lastik ebatları yazısında]] anlatılır; ruhsata ve araç onayına uygun ebat dışına çıkmayın."
      ]
    },
    {
      h: "Otoyolda 6. viteste kaç devirde gidilir?",
      p: [
        "Cevap aracın vites ve diferansiyel oranlarına ve lastiğine bağlıdır; ama hesap her araç için aynıdır. Örnek araçta altıncı viteste 1.000 d/d başına 42,58 km/sa elde edildiği için:"
      ],
      ul: [
        "90 km/sa → 90 ÷ 42,58 × 1.000 ≈ 2.114 d/d",
        "110 km/sa → yaklaşık 2.583 d/d",
        "120 km/sa → yaklaşık 2.818 d/d",
        "130 km/sa → yaklaşık 3.053 d/d"
      ],
      after: [
        "Kendi aracınızın değerini bulmak için sabit hızda giderken devir saatine bakıp bu oranı çıkarabilirsiniz. Otomatik şanzımanlarda tork konvertörü kilitli değilse devir hesaplanandan biraz yüksek görünür. Hızın yol ve süreyle ilişkisini hesaplamak için [[bilgi:hiz-yol-zaman-formulu|hız-yol-zaman formülü]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Kısa ve uzun vites oranının artısı eksisi",
      ul: [
        "<strong>Kısa (yüksek sayısal) oranlar:</strong> Aynı devirde daha az hız, daha çok tekerlek torku. Hızlanma ve yokuş performansı artar, römork çekmek kolaylaşır; otoyolda devir yükselir, gürültü ve tüketim artabilir.",
        "<strong>Uzun (düşük sayısal) oranlar:</strong> Aynı devirde daha çok hız. Otoyolda düşük devir, sessizlik ve çoğu durumda daha düşük tüketim sağlar; hızlanma zayıflar, yokuşta vites küçültme ihtiyacı artar.",
        "<strong>Vites aralıklarının sıklığı:</strong> Ardışık oranlar birbirine yakınsa vites değişiminde devir az düşer ve motor güçlü bölgesinde kalır; aralık genişse vites sayısı azalır ama devir düşüşü büyür.",
        "<strong>Motor karakteri:</strong> Düşük devirde yüksek tork üreten motorlar daha uzun oranları taşıyabilir; yüksek devirde güç üreten motorlar kısa oranlarla daha canlı hissedilir."
      ]
    },
    {
      h: "Tork ile vites oranı arasındaki ilişki ve bisiklet örneği",
      p: [
        "Tekerleğe ulaşan tork, motor torkunun toplam aktarma oranıyla çarpımından kayıplar düşülerek bulunur. 250 Nm motor torku birinci viteste (toplam oran 14,696) tekerleklerde kuramsal olarak yaklaşık 3.674 Nm'ye ulaşır. Tekerlekteki itme kuvveti ise bu torkun lastik yarıçapına bölünmesidir: 3.674 Nm ÷ 0,316 m ≈ 11.600 N. Motor gücü, tork ve devir arasında dönüşüm için [[arac:motor-guc-tork-hesapla|Motor Güç Tork Devir Hesaplama]] aracını kullanabilirsiniz.",
        "Bisiklette de aynı mantık geçerlidir, yalnızca motorun yerini pedal alır ve oran ters yazılır: aynakol (ön dişli) diş sayısı ÷ arka dişli diş sayısı. 50 dişli aynakol ve 25 dişli arka dişliyle oran 2,0'dır; her pedal turunda arka tekerlek 2 tur döner. Çevresi yaklaşık 2.105 mm olan bir tekerlekte bu, pedal başına 4,21 m eder; dakikada 90 pedal turuyla yaklaşık 22,7 km/sa hız bulunur. Bisiklet oranlarının tamamını görmek için [[arac:bisiklet-vites-orani-hesapla|Bisiklet Vites Oranı Hesaplama]] aracını, pedal hızı kavramı için [[bilgi:bisiklette-kadans-nedir|kadans yazısını]] inceleyebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Vites oranı nedir?", "Vites oranı, şanzımana giren milin çıkış milini bir tur döndürmek için kaç tur attığını gösterir ve dişlilerin diş sayısı oranına eşittir. 3,73 oranında motor 3,73 tur döndüğünde çıkış 1 tur döner; oran büyüdükçe hız düşer, tork artar."],
    ["Motor devrinden araç hızı nasıl hesaplanır?", "Motor devri, vites oranı ile diferansiyel oranının çarpımına bölünerek tekerlek devri bulunur. Tekerlek devri lastik çevresiyle (mm) ve 60 ile çarpılıp 1.000.000'a bölününce km/sa cinsinden hız çıkar. 3.000 d/d, 0,71 ve 3,94 oranlarıyla 205/55 R16'da 127,7 km/sa bulunur."],
    ["Diferansiyel (son dişli) oranı hıza nasıl etki eder?", "Diferansiyel oranı tüm viteslerde toplam oranı aynı ölçüde değiştirir. Oran büyüdükçe aynı devirde hız düşer ve tork artar. Örnek araçta 3,94 yerine 4,30 kullanılsaydı altıncı viteste 3.000 d/d'deki hız 127,7'den 117,0 km/sa'e inerdi."],
    ["Lastik ebadı değişince hız ve kilometre sayacı nasıl etkilenir?", "Büyük çaplı lastik her turda daha uzun yol aldığı için gerçek hız ve gidilen yol artar, ama gösterge fabrika çevresini varsaydığından eski değerleri gösterir. Çap yüzde 5 büyürse gösterge 128 km/sa'te araç yaklaşık 134 km/sa gider."],
    ["Otoyolda 6. viteste kaç devirde gidilir?", "Aracın oranlarına ve lastiğine bağlıdır. Örnek araçta altıncı viteste 1.000 d/d başına 42,58 km/sa elde edildiği için 120 km/sa yaklaşık 2.818 d/d, 90 km/sa yaklaşık 2.114 d/d demektir. Kendi değerlerinizi hız hesaplama aracına girebilirsiniz."],
    ["Kısa ve uzun vites oranının artısı eksisi nedir?", "Kısa oranlar hızlanmayı, yokuş ve yük performansını artırır ama otoyolda devri ve gürültüyü yükseltir. Uzun oranlar otoyolda düşük devir ve genellikle daha az tüketim sağlar, buna karşılık hızlanma zayıflar ve sık vites küçültmek gerekir."],
    ["Tork ile vites oranı arasındaki ilişki nedir?", "Tekerleğe ulaşan tork, motor torkunun toplam aktarma oranıyla çarpımıdır; kayıplar bundan düşülür. 250 Nm motor torku birinci vites ve diferansiyelin toplam 14,7 oranıyla tekerlekte kuramsal olarak yaklaşık 3.674 Nm olur. Devir aynı oranla düşer."],
    ["Bisiklette vites oranı aynı mantıkla mı çalışır?", "Evet, ancak oran aynakol diş sayısının arka dişli diş sayısına bölümü olarak yazılır. 50/25 oranında her pedal turunda arka tekerlek 2 tur döner; 2.105 mm çevreli tekerlekle pedal başına 4,21 m yol alınır ve 90 pedal turunda yaklaşık 22,7 km/sa elde edilir."],
    ["Hesaplanan hız neden göstergeden farklı çıkıyor?", "Hız göstergeleri genellikle gerçek hızdan biraz yüksek gösterecek şekilde ayarlanır; ayrıca lastiklerin aşınması, basıncı ve yük altında ezilmesi etkin çevreyi küçültür. Otomatik şanzımanlarda tork konvertörü kayması da devir ile hız ilişkisini değiştirir."]
  ],
  tools: ["vites-hiz-hesapla", "lastik-karsilastir", "motor-guc-tork-hesapla", "bisiklet-vites-orani-hesapla"],
  related: ["beygir-gucu-ve-tork-farki", "lastik-ebatlari-nasil-okunur", "bisiklette-kadans-nedir"]
};
