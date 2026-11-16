export default {
  slug: "ikiye-tumleyen-negatif-sayilar-binary",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "İkiye Tümleyen Nedir? Negatif Sayılar İkilik Sistemde Nasıl Gösterilir",
  pageTitle: "İkiye Tümleyen Nedir? Negatif Sayıların Binary Gösterimi",
  description: "İkiye tümleyen: sayının bitleri ters çevrilir, 1 eklenir. 8 bitte −5 = 11111011. Bire tümleyen farkı, −128…127 aralığı, taşma, AND OR XOR ve bit kaydırma.",
  keywords: ["ikiye tümleyen nedir", "2'ye tümleyen", "negatif sayı binary", "bire tümleyen", "işaretli sayılar", "8 bit en küçük sayı", "taşma overflow", "and or xor nedir", "bit kaydırma"],
  lead: "İkiye tümleyen, bilgisayarların negatif tam sayıları ikilik sistemde gösterme yöntemidir: sayının pozitif hâlinin <strong>bütün bitleri ters çevrilir ve sonuca 1 eklenir</strong>. Örneğin 8 bitte 5 = 00000101, ters çevrilmiş hâli 11111010, 1 eklenince <strong>−5 = 11111011</strong> olur. Bu yöntemde en soldaki bit işareti gösterir, sıfırın tek gösterimi vardır ve çıkarma işlemi toplamayla yapılabilir. Bu sayfada bire tümleyen farkını, bit genişliğine göre sayı aralıklarını, taşmanın nedenini, AND, OR, XOR ve bit kaydırma işlemlerini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Negatif sayı bulmak için pozitif değerin bitleri ters çevrilir (bire tümleyen) ve 1 eklenir (ikiye tümleyen).",
    "En soldaki bit (en anlamlı bit) 0 ise sayı pozitif, 1 ise negatiftir.",
    "n bitlik ikiye tümleyende aralık −2<sup>n−1</sup> ile 2<sup>n−1</sup> − 1 arasıdır; 8 bitte −128 ile 127.",
    "İkili diziyi çözmek için en soldaki bitin ağırlığı eksi alınır: 11111011 = −128 + 123 = −5.",
    "İki pozitif sayının toplamı negatif görünüyorsa taşma olmuştur: 8 bitte 100 + 50 = −106 çıkar.",
    "Bilgisayarlar ikiye tümleyeni tercih eder, çünkü tek sıfır vardır ve aynı toplayıcı devre hem toplar hem çıkarır."
  ],
  figure: {
    alt: "8 bitlik kutular üzerinde −5'in bulunuşu: 5 = 00000101, bitler ters çevrilince 11111010, 1 eklenince 11111011. Altta sayı çemberi: 0'dan 127'ye pozitif, −128'den −1'e negatif bölge.",
    caption: "Üstte üç adımda −5'in ikiye tümleyeni bulunur. Altta 8 bitlik değerlerin dizilişi: 01111111 (127) bir artırılırsa 10000000 (−128) olur; taşma bu sınırda yaşanır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">8 bitte −5 nasıl yazılır?</text>
  <g class="b mid">
    <text x="120" y="72" class="end">5 =</text>
    <rect x="140" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="162" y="73">0</text>
    <rect x="190" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="212" y="73">0</text>
    <rect x="240" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="262" y="73">0</text>
    <rect x="290" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="312" y="73">0</text>
    <rect x="340" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="362" y="73">0</text>
    <rect x="390" y="50" width="44" height="34" rx="4" class="ps"/><text x="412" y="73">1</text>
    <rect x="440" y="50" width="44" height="34" rx="4" class="sf sb"/><text x="462" y="73">0</text>
    <rect x="490" y="50" width="44" height="34" rx="4" class="ps"/><text x="512" y="73">1</text>
    <text x="120" y="126" class="end">ters çevir</text>
    <rect x="140" y="104" width="44" height="34" rx="4" class="ps"/><text x="162" y="127">1</text>
    <rect x="190" y="104" width="44" height="34" rx="4" class="ps"/><text x="212" y="127">1</text>
    <rect x="240" y="104" width="44" height="34" rx="4" class="ps"/><text x="262" y="127">1</text>
    <rect x="290" y="104" width="44" height="34" rx="4" class="ps"/><text x="312" y="127">1</text>
    <rect x="340" y="104" width="44" height="34" rx="4" class="ps"/><text x="362" y="127">1</text>
    <rect x="390" y="104" width="44" height="34" rx="4" class="sf sb"/><text x="412" y="127">0</text>
    <rect x="440" y="104" width="44" height="34" rx="4" class="ps"/><text x="462" y="127">1</text>
    <rect x="490" y="104" width="44" height="34" rx="4" class="sf sb"/><text x="512" y="127">0</text>
    <text x="120" y="180" class="end">+1 = −5</text>
    <rect x="140" y="158" width="44" height="34" rx="4" class="p"/><text x="162" y="181" class="sf">1</text>
    <rect x="190" y="158" width="44" height="34" rx="4" class="p"/><text x="212" y="181" class="sf">1</text>
    <rect x="240" y="158" width="44" height="34" rx="4" class="p"/><text x="262" y="181" class="sf">1</text>
    <rect x="290" y="158" width="44" height="34" rx="4" class="p"/><text x="312" y="181" class="sf">1</text>
    <rect x="340" y="158" width="44" height="34" rx="4" class="p"/><text x="362" y="181" class="sf">1</text>
    <rect x="390" y="158" width="44" height="34" rx="4" class="sf sb"/><text x="412" y="181">0</text>
    <rect x="440" y="158" width="44" height="34" rx="4" class="p"/><text x="462" y="181" class="sf">1</text>
    <rect x="490" y="158" width="44" height="34" rx="4" class="p"/><text x="512" y="181" class="sf">1</text>
  </g>
  <g class="sm mid mu">
    <text x="162" y="210">−128</text><text x="212" y="210">64</text><text x="262" y="210">32</text><text x="312" y="210">16</text>
    <text x="362" y="210">8</text><text x="412" y="210">4</text><text x="462" y="210">2</text><text x="512" y="210">1</text>
  </g>
  <text x="560" y="130" class="b">Sağlama</text>
  <text x="560" y="154" class="sm">−128 + 64 + 32</text>
  <text x="560" y="172" class="sm">+ 16 + 8 + 2 + 1</text>
  <text x="560" y="194" class="b p">= −5</text>
  <line x1="40" y1="234" x2="680" y2="234" class="sb dash" fill="none"/>
  <text x="360" y="262" class="b mid">8 bitlik aralık</text>
  <rect x="60" y="280" width="300" height="44" rx="6" class="dgs"/>
  <rect x="360" y="280" width="300" height="44" rx="6" class="oks"/>
  <text x="70" y="307" class="b">−128</text><text x="350" y="307" class="b end">−1</text>
  <text x="370" y="307" class="b">0</text><text x="650" y="307" class="b end">127</text>
  <g class="sm">
    <text x="70" y="344">10000000</text><text x="350" y="344" class="end">11111111</text>
    <text x="370" y="344">00000000</text><text x="650" y="344" class="end">01111111</text>
  </g>
  <text x="360" y="380" class="sm mid t2">İşaret biti 1 olan yarı negatif, 0 olan yarı pozitiftir.</text>
  <text x="360" y="402" class="sm mid dg">127 + 1 → 10000000 = −128 (taşma)</text>
</svg>`
  },
  sections: [
    {
      h: "İkiye tümleyen nedir?",
      p: [
        "İkilik sistemde yalnızca 0 ve 1 vardır; eksi işareti için ayrı bir sembol yoktur. Bilgisayarın negatif sayıyı saklayabilmesi için bitlerden birini işarete ayırması ya da sayıyı özel bir kurala göre kodlaması gerekir. Günümüzdeki işlemcilerin neredeyse tamamı tam sayılar için <strong>ikiye tümleyen</strong> (two's complement) kodlamasını kullanır.",
        "Bu kodlamada pozitif sayılar olağan ikili gösterimleriyle yazılır. Negatif bir sayı ise, pozitif karşılığının bütün bitleri ters çevrilip 1 eklenerek elde edilir. Sonuçta en soldaki bit kendiliğinden işaret biti olur: pozitiflerde 0, negatiflerde 1.",
        "Bu konuya geçmeden önce ondalık sayının ikiliye nasıl çevrildiğini bilmek işinizi kolaylaştırır; temel çevrim adımlarını [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] makalesinde bulabilirsiniz."
      ]
    },
    {
      h: "Negatif bir sayı ikilik sistemde nasıl yazılır? Adım adım",
      ol: [
        "Bit genişliğini seçin. Sonuç 8, 16, 32 ya da 64 bit için farklıdır; aynı −5, 8 bitte 11111011, 16 bitte 1111111111111011 olur.",
        "Sayının mutlak değerini bu genişlikte ikiliye çevirin ve soldan sıfırla doldurun: 5 → 00000101.",
        "Bütün bitleri ters çevirin (0 → 1, 1 → 0): 11111010. Bu ara sonuç bire tümleyendir.",
        "Sonuca 1 ekleyin: 11111010 + 1 = 11111011. Bu, −5'in 8 bitlik ikiye tümleyen gösterimidir.",
        "Sağlama yapın: en soldaki bitin ağırlığını −128 alıp diğer bitleri olağan biçimde toplayın: −128 + 64 + 32 + 16 + 8 + 2 + 1 = −5."
      ],
      after: [
        "Pratik bir kısayol da vardır: sağdan başlayıp ilk 1'e kadar olan bitleri (o 1 dahil) aynen yazın, ondan sonraki tüm bitleri ters çevirin. 00000101 için sağdaki ilk 1 aynen kalır, geri kalanlar ters çevrilir ve yine 11111011 bulunur.",
        "Kendi sayınızı farklı bit genişliklerinde denemek için [[arac:iki-tumleyen-hesapla|İkiye Tümleyen Hesaplama]] aracı adımları tek tek gösterir; ikili diziyi işaretli ondalık değere çevirme yönünde de çalışır."
      ]
    },
    {
      h: "Bire tümleyen ile ikiye tümleyen farkı nedir?",
      p: [
        "<strong>Bire tümleyen</strong> (one's complement) yalnızca bitleri ters çevirir; 1 eklemez. Bu yöntemde −5 = 11111010 olur. Basit görünse de iki önemli sorunu vardır: sıfırın iki ayrı gösterimi oluşur (00000000 = +0 ve 11111111 = −0) ve toplama sonrasında taşan biti başa geri eklemek (end-around carry) gerekir.",
        "İkiye tümleyende 1 eklemek bu sorunları çözer. Sıfırın tek gösterimi kalır ve kazanılan bir kod sayesinde negatif tarafta bir sayı fazla sığar. Ayrıca ilk yöntem olan <strong>işaret-büyüklük</strong> gösteriminde (en soldaki bit işaret, kalanı büyüklük) de iki sıfır vardır ve toplama için ayrı mantık gerekir."
      ],
      table: {
        head: ["Değer", "İşaret-büyüklük", "Bire tümleyen", "İkiye tümleyen"],
        rows: [
          ["+5", "00000101", "00000101", "00000101"],
          ["−5", "10000101", "11111010", "11111011"],
          ["+0", "00000000", "00000000", "00000000"],
          ["−0", "10000000", "11111111", "yok (tek sıfır)"],
          ["−1", "10000001", "11111110", "11111111"],
          ["En küçük (8 bit)", "−127", "−127", "−128"]
        ],
        caption: "Üç yöntem pozitif sayılarda aynıdır; fark yalnızca negatiflerde ve sıfırdadır."
      }
    },
    {
      h: "8 bitte en küçük ve en büyük sayı kaçtır? Bit genişliğine göre aralıklar",
      p: [
        "n bitle 2<sup>n</sup> farklı kod yazılabilir. İkiye tümleyende bunların yarısı negatiflere, yarısı sıfır ve pozitiflere ayrılır. Sıfır pozitif tarafta yer kapladığı için pozitif tarafın üst sınırı bir eksik kalır."
      ],
      formula: "En küçük = −2^(n−1)\nEn büyük = 2^(n−1) − 1",
      table: {
        head: ["Bit sayısı", "En küçük", "En büyük", "İşaretsiz en büyük"],
        rows: [
          ["8", "−128", "127", "255"],
          ["16", "−32.768", "32.767", "65.535"],
          ["32", "−2.147.483.648", "2.147.483.647", "4.294.967.295"],
          ["64", "−9.223.372.036.854.775.808", "9.223.372.036.854.775.807", "18.446.744.073.709.551.615"]
        ],
        caption: "Aynı bit dizisi işaretsiz yorumlanırsa farklı sayı ifade eder: 11111011 işaretsiz 251, işaretli −5'tir."
      },
      after: [
        "Bu sınırlar programlama dillerindeki tam sayı türlerinin aralığını belirler. Ondalıklı sayılar ise ikiye tümleyenle değil, ayrı bir standartla saklanır; bunun neden 0,1 + 0,2 gibi işlemlerde küçük farklar ürettiğini [[bilgi:ieee-754-kayan-nokta-0-1-0-2|IEEE 754 kayan nokta]] makalesi anlatır."
      ]
    },
    {
      h: "Çıkarma toplamayla nasıl yapılır? Çözümlü örnekler",
      p: [
        "İkiye tümleyenin en büyük kazancı, çıkarmanın ayrı bir devre gerektirmemesidir. A − B işlemi, A + (−B) olarak yapılır; −B de B'nin ikiye tümleyenidir. Bit genişliğinin dışına taşan son elde atılır."
      ],
      ul: [
        "<strong>7 − 5:</strong> 00000111 + 11111011 = 1 00000010. Dokuzuncu bit atılır, sonuç 00000010 = 2.",
        "<strong>3 − 5:</strong> 00000011 + 11111011 = 11111110. İşaret biti 1, yani negatif. Ters çevirip 1 ekleyince 00000010 çıkar; sonuç −2.",
        "<strong>−20'nin gösterimi:</strong> 20 = 00010100 → ters 11101011 → +1 = 11101100.",
        "<strong>16 bitte −1.000:</strong> 1.000 = 0000001111101000 → sonuç 1111110000011000, onaltılık FC18."
      ],
      after: [
        "Onaltılık gösterim, uzun bit dizilerini dörtlü gruplarla kısaltmanın standart yoludur; 11111011 = FB gibi. Dönüşüm mantığı için [[bilgi:onaltilik-hex-sayi-sistemi|onaltılık sayı sistemi]] makalesine göz atabilirsiniz. İkili toplama ve çıkarmayı kendi sayılarınızla denemek için [[arac:ikili-sayi-islem|İkili Sayı İşlemleri]] aracını kullanın."
      ]
    },
    {
      h: "Taşma (overflow) neden olur?",
      p: [
        "Taşma, işlemin sonucu seçilen bit genişliğinin aralığına sığmadığında ortaya çıkar. 8 bitte 100 + 50 = 150 sonucu 127 sınırını aşar. Bit dizisi 10010110 olur; işaret biti 1 olduğu için bu dizi −106 olarak okunur (150 − 256 = −106).",
        "Taşmayı tanımanın kuralı basittir: aynı işaretli iki sayı toplanır ve sonucun işareti farklı çıkarsa taşma olmuştur. Pozitif + pozitif = negatif ya da negatif + negatif = pozitif sonucu her zaman taşmadır. Farklı işaretli iki sayının toplamında taşma olmaz.",
        "En dışa taşan elde biti (carry) ile taşma (overflow) aynı şey değildir. 7 − 5 örneğinde elde biti oluştu ama sonuç doğrudur. İşlemciler bu yüzden ikisi için ayrı bayrak tutar. Yazılımda sayaçların, sıcaklık değerlerinin ya da para tutarlarının beklenmedik biçimde eksiye dönmesi çoğu zaman bu taşmanın sonucudur."
      ]
    },
    {
      h: "AND, OR ve XOR işlemleri nasıl yapılır? Bit kaydırma ne işe yarar?",
      p: [
        "Bit işlemleri, iki sayının aynı konumdaki bitlerini tek tek karşılaştırır. Örnekte 12 = 00001100 ve 10 = 00001010 kullanılmıştır."
      ],
      table: {
        head: ["İşlem", "Kural", "12 ve 10 için sonuç", "Ondalık"],
        rows: [
          ["AND", "İki bit de 1 ise 1", "00001000", "8"],
          ["OR", "Bitlerden biri 1 ise 1", "00001110", "14"],
          ["XOR", "Bitler farklıysa 1", "00000110", "6"],
          ["NOT 5", "Her biti ters çevir", "11111010", "−6"],
          ["5 sola 2 kaydır", "Sağa iki sıfır ekle", "00010100", "20"],
          ["−20 sağa 2 kaydır (aritmetik)", "Soldan işaret bitini çoğalt", "11111011", "−5"]
        ]
      },
      ul: [
        "<strong>AND</strong> maskelemede kullanılır: bir sayının yalnızca belirli bitlerini okumak, örneğin alt ağ maskesiyle ağ adresini bulmak.",
        "<strong>OR</strong> belirli bitleri 1 yapmak, yani bir ayarı ya da bayrağı açmak için kullanılır.",
        "<strong>XOR</strong> bir biti tersine çevirir; aynı anahtarla iki kez XOR yapmak orijinal değeri geri verir ve basit şifreleme ile hata denetiminde kullanılır.",
        "<strong>Sola kaydırma</strong> her adımda 2 ile çarpar, <strong>aritmetik sağa kaydırma</strong> işaret bitini koruyarak 2'ye böler (aşağı yuvarlar). NOT işleminin −(x + 1) vermesi de ikiye tümleyenin doğal sonucudur."
      ],
      after: [
        "Bu işlemleri ikili, onaltılık ve işaretli ondalık sonuçlarıyla görmek için [[arac:bit-islem-hesapla|Bit İşlemleri Hesaplama]] aracını kullanabilirsiniz. Alt ağ maskesinde AND kullanımına bir örnek için [[bilgi:ip-adresi-ve-alt-ag-maskesi-nedir|IP adresi ve alt ağ maskesi]] makalesine bakın."
      ]
    },
    {
      h: "İkiye tümleyen neden bilgisayarlarda tercih edilir?",
      ul: [
        "<strong>Tek sıfır:</strong> +0 ve −0 karışıklığı yoktur; eşitlik karşılaştırmaları basitleşir.",
        "<strong>Tek toplayıcı devre:</strong> Toplama ve çıkarma aynı donanımla yapılır; işlemci tasarımı küçülür ve hızlanır.",
        "<strong>İşaretsiz sayılarla uyum:</strong> Toplama devresi işaretli ve işaretsiz sayılar için aynı bit sonucunu üretir; yalnızca yorum değişir.",
        "<strong>Kolay genişletme:</strong> 8 bitlik bir sayıyı 16 bite çıkarmak için işaret bitini sola doğru çoğaltmak yeter (11111011 → 1111111111111011).",
        "<strong>Doğal sıralama:</strong> −1'den bir eksiltmek ya da 127'ye bir eklemek, sayaç mantığıyla sorunsuz sarar; bu davranış öngörülebilir ve test edilebilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Bit genişliğini belirtmemek:</strong> \"−5'in ikiye tümleyeni\" sorusunun cevabı genişlik verilmeden tek değildir.",
        "<strong>1 eklemeyi unutmak:</strong> Yalnızca bitleri ters çevirmek bire tümleyen verir; sonuç bir eksik çıkar.",
        "<strong>Diziyi işaretsiz okumak:</strong> 11111011'i 251 olarak okumak, işaretli bağlamda yanlıştır.",
        "<strong>Taşmayı elde bitiyle karıştırmak:</strong> Elde bitinin oluşması hatayı göstermez; işaret kuralına bakın.",
        "<strong>Mantıksal ve aritmetik kaydırmayı karıştırmak:</strong> Negatif bir sayıyı mantıksal sağa kaydırmak soldan 0 ekler ve sayıyı büyük bir pozitife çevirir."
      ]
    }
  ],
  faq: [
    ["İkiye tümleyen nedir?", "İkiye tümleyen, negatif tam sayıları ikilik sistemde gösterme yöntemidir. Pozitif sayının bitleri ters çevrilir ve 1 eklenir; en soldaki bit işaret biti olur ve negatif sayılarda 1'dir."],
    ["Negatif bir sayı ikilik sistemde nasıl yazılır?", "Önce bit genişliği seçilir, sonra mutlak değer ikiliye çevrilir, bitler ters çevrilir ve 1 eklenir. 8 bitte −5 için 00000101 → 11111010 → 11111011 adımları izlenir."],
    ["Bire tümleyen ile ikiye tümleyen farkı nedir?", "Bire tümleyende yalnızca bitler ters çevrilir, ikiye tümleyende ayrıca 1 eklenir. Bire tümleyende +0 ve −0 diye iki sıfır vardır; ikiye tümleyende sıfır tektir ve toplama işlemi düzeltme gerektirmez."],
    ["8 bitte en küçük ve en büyük sayı kaçtır?", "8 bitlik ikiye tümleyen gösterimde en küçük sayı −128 (10000000), en büyük sayı 127 (01111111) olur. Aynı 8 bit işaretsiz kullanılırsa 0 ile 255 arası yazılabilir."],
    ["Taşma (overflow) neden olur?", "Sonuç bit genişliğinin aralığına sığmadığında taşma olur. 8 bitte 100 + 50 = 150 sonucu 127'yi aştığı için 10010110 dizisi −106 olarak okunur; iki pozitifin toplamı negatif çıktıysa taşma vardır."],
    ["AND, OR ve XOR işlemleri nasıl yapılır?", "Sayıların aynı konumdaki bitleri karşılaştırılır. AND ikisi de 1 ise, OR biri 1 ise, XOR bitler farklıysa 1 verir. 12 ve 10 için sonuçlar sırasıyla 8, 14 ve 6'dır."],
    ["Bit kaydırma ne işe yarar?", "Sola kaydırma sayıyı her adımda 2 ile çarpar, aritmetik sağa kaydırma işaret bitini koruyarak 2'ye böler. 5 sola iki kez kaydırılınca 20, −20 sağa iki kez kaydırılınca −5 olur; maskeleme ve hızlı çarpmada kullanılır."],
    ["İkiye tümleyen neden bilgisayarlarda tercih edilir?", "Sıfırın tek gösterimi vardır, toplama ve çıkarma aynı devreyle yapılır ve işaretsiz sayılarla aynı toplayıcı kullanılabilir. Bu da işlemci tasarımını sadeleştirir ve hızlandırır."],
    ["11111111 hangi sayıdır?", "8 bitlik işaretli yorumda 11111111 −1'dir, çünkü −128 + 127 = −1 eder. Aynı dizi işaretsiz yorumlanırsa 255 anlamına gelir; hangi değerin kastedildiğini veri türü belirler."]
  ],
  tools: ["iki-tumleyen-hesapla", "bit-islem-hesapla", "ikili-ondalik-cevir", "ikili-sayi-islem"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "onaltilik-hex-sayi-sistemi", "ieee-754-kayan-nokta-0-1-0-2"]
};
