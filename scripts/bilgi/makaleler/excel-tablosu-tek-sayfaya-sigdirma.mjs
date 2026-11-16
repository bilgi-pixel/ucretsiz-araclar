export default {
  slug: "excel-tablosu-tek-sayfaya-sigdirma",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Excel Tablosu Tek Sayfaya Nasıl Sığdırılır? Yazdırma Alanı ve PDF",
  pageTitle: "Excel Tablosu Tek Sayfaya Sığdırma: Yazdırma Alanı, Ölçek, PDF",
  description: "Elektronik tabloyu tek sayfaya sığdırma: yazdırma alanı, yatay yönlendirme, genişliği 1 sayfaya ölçekleme, başlık satırı tekrarı, okunur ölçek sınırı ve PDF'e çevirme.",
  keywords: ["excel tek sayfaya sığdırma", "excel yazdırma alanı", "excel yatay yazdırma", "excel pdf tek sayfa", "excel sütunlar sayfaya sığmıyor", "sayfa sonu önizleme", "excel ölçekleme", "başlık satırı her sayfada"],
  lead: "Bir elektronik tabloyu tek sayfaya sığdırmanın en hızlı yolu, <strong>sayfa düzeni ayarlarında ölçeklemeyi \"genişlik 1 sayfa, yükseklik otomatik\" yapmak ve gerekiyorsa yönü yataya çevirmektir</strong>. Böylece sütunlar tek sayfaya küçülür, satırlar ise gerektiği kadar sayfaya bölünür. Yazdırılacak bölümü yazdırma alanıyla sınırlamak, boş sütunları gizlemek ve kenar boşluklarını daraltmak ölçeği yükseltir. Bu sayfada A4 için hesaplı örnekleri, okunabilirlik sınırını, başlık satırını her sayfada tekrarlamayı ve PDF'e çevirirken düzenin neden bozulduğunu bulacaksınız.",
  kisaCevap: [
    "Ölçeklemede \"tüm sütunları bir sayfaya sığdır\" seçeneği yalnızca genişliği küçültür; satırlar birden fazla sayfaya yayılabilir.",
    "\"Sayfayı tek sayfaya sığdır\" hem genişliği hem yüksekliği küçültür; uzun tablolarda yazıyı okunmaz hâle getirebilir.",
    "A4 dikey yazdırılabilir genişlik, 1,8 cm kenar boşluklarıyla yaklaşık 17,4 cm; yatayda yaklaşık 26,1 cm'dir.",
    "Ölçek %70'in altına inerse 11 puntoluk yazı yaklaşık 7,7 puntoya düşer; bu çoğu kişi için okunabilirlik sınırıdır.",
    "Yazdırma alanı, sayfanın yalnızca seçtiğiniz hücre aralığını basmasını sağlar; boş ve yardımcı sütunlar dışarıda kalır.",
    "Başlık satırı, sayfa düzeni ayarlarındaki \"üstte yinelenecek satırlar\" ile her sayfada tekrarlanır."
  ],
  figure: {
    alt: "A4 dikey ve yatay sayfada 24 cm genişliğindeki bir tablonun ölçeklenmesi: dikeyde yüzde 72, yatayda yüzde 100 ölçekle sığması ve 11 puntonun 7,9 puntoya düşmesi.",
    caption: "Örnek: sütun genişlikleri toplamı 24 cm olan tablo. Dikey A4'te sığması için %72'ye küçülmesi gerekir; yatay A4'te ise küçültmeden sığar. Yön değiştirmek çoğu zaman ölçeklemeden daha okunur sonuç verir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">24 cm genişliğindeki tablo A4'e nasıl sığar?</text>
  <text x="170" y="64" class="b mid">Dikey A4 (21 × 29,7 cm)</text>
  <rect x="95" y="76" width="150" height="212" rx="4" class="sf sb"/>
  <rect x="108" y="90" width="124" height="110" class="ps"/>
  <text x="170" y="140" class="b mid">ölçek %72</text>
  <text x="170" y="162" class="sm mid">yazı 11 → 7,9 punto</text>
  <text x="170" y="310" class="sm mid t2">kullanılabilir genişlik ≈ 17,4 cm</text>
  <text x="510" y="64" class="b mid">Yatay A4 (29,7 × 21 cm)</text>
  <rect x="404" y="96" width="212" height="150" rx="4" class="sf sb"/>
  <rect x="417" y="110" width="172" height="80" class="oks"/>
  <text x="503" y="148" class="b mid">ölçek %100</text>
  <text x="503" y="170" class="sm mid">yazı 11 punto kalır</text>
  <text x="510" y="268" class="sm mid t2">kullanılabilir genişlik ≈ 26,1 cm</text>
  <rect x="20" y="336" width="680" height="70" rx="8" class="sf sb"/>
  <rect x="20" y="336" width="8" height="70" class="p"/>
  <text x="42" y="362" class="b">Ölçek = kullanılabilir genişlik ÷ tablo genişliği</text>
  <text x="42" y="388" class="sm t2">Dikey: 17,4 ÷ 24 = 0,725 → %72 · Yatay: 26,1 ÷ 24 = 1,09 → küçültme gerekmez</text>
</svg>`
  },
  sections: [
    {
      h: "Tablo neden sayfaya sığmıyor?",
      p: [
        "Elektronik tablo programı ekranda sonsuz genişlikte bir ızgara gösterir; kâğıt ise sabittir. A4 kâğıdın genişliği 21 cm'dir ve kenar boşlukları düşüldüğünde yazdırılabilir alan dikeyde yaklaşık 17–18 cm'ye iner. Ekranda rahatça görünen on iki sütunluk bir tablonun sütun genişlikleri toplamı 25–30 cm'yi kolayca bulur. Program sığmayan sütunları ikinci, üçüncü sayfaya taşır.",
        "Sayfaya sığmama sorununun üç tipik nedeni vardır: gereğinden geniş bırakılmış sütunlar, yazdırılması gerekmeyen yardımcı sütunlar ve dikey yönde yazdırılmaya çalışılan yatay bir tablo. Ölçeklemeye geçmeden önce bu üçünü düzeltmek, yazıyı küçültmeden daha temiz bir çıktı sağlar.",
        "Kâğıt ölçülerini merak ediyorsanız [[bilgi:a4-kagit-boyutu-kac-cm|A4 kâğıt boyutu kaç cm]] yazısı A serisinin tüm boyutlarını verir."
      ]
    },
    {
      h: "Kaç yüzdelik ölçek gerekir? Hesap formülü",
      p: [
        "Gereken ölçeği önceden hesaplayabilirsiniz. Sütun genişliklerinin toplamını santimetre cinsinden bulun ve kâğıdın kullanılabilir genişliğine bölün. Sonuç 1'den büyükse küçültmeye gerek yoktur; 1'den küçükse bu oran, ayarlamanız gereken ölçektir."
      ],
      formula: "Kullanılabilir genişlik = kâğıt genişliği − sol boşluk − sağ boşluk\nÖlçek = kullanılabilir genişlik ÷ tablo genişliği\nYazdırılan punto = gerçek punto × ölçek",
      table: {
        head: ["Kâğıt ve yön", "Kâğıt genişliği", "Boşluklar (sol + sağ)", "Kullanılabilir genişlik"],
        rows: [
          ["A4 dikey, normal boşluk", "21,0 cm", "1,8 + 1,8 cm", "17,4 cm"],
          ["A4 dikey, dar boşluk", "21,0 cm", "0,6 + 0,6 cm", "19,8 cm"],
          ["A4 yatay, normal boşluk", "29,7 cm", "1,8 + 1,8 cm", "26,1 cm"],
          ["A4 yatay, dar boşluk", "29,7 cm", "0,6 + 0,6 cm", "28,5 cm"],
          ["A3 yatay, normal boşluk", "42,0 cm", "1,8 + 1,8 cm", "38,4 cm"]
        ],
        caption: "Boşluk değerleri yaygın hazır ayarlara yakın örneklerdir; kendi şablonunuzdaki değerleri kullanın."
      },
      after: [
        "<strong>Çözümlü örnek:</strong> Sütun genişlikleri toplamı 24 cm olan bir satış tablosunu A4 dikey, normal boşluklarla yazdıracaksınız. Ölçek = 17,4 ÷ 24 = 0,725, yani yaklaşık %72'dir. 11 puntoluk yazı kâğıtta 11 × 0,72 ≈ 7,9 punto olur; okunur ama küçüktür. Aynı tabloyu yatay yazdırırsanız 26,1 ÷ 24 = 1,09 çıkar; ölçek %100 kalır ve yazı küçülmez.",
        "Dar boşluk seçeneğiyle dikeyde ölçek 19,8 ÷ 24 = 0,825'e, yani yaklaşık %82'ye çıkar; yazı 9 punto civarında kalır. Punto ve milimetre ilişkisini [[bilgi:punto-kac-mm-yazi-boyutu|punto kaç mm]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Adım adım: tabloyu tek sayfaya sığdırmak",
      ol: [
        "<strong>Gereksizleri ayıklayın:</strong> Ara hesap, not ya da yardımcı formül sütunlarını gizleyin. Gizli sütunlar yazdırılmaz.",
        "<strong>Sütunları daraltın:</strong> Uzun başlıkları iki satıra kaydırın (metni kaydır), sayı sütunlarını içeriğe göre otomatik genişliğe getirin.",
        "<strong>Yazdırma alanını belirleyin:</strong> Basılacak hücre aralığını seçip sayfa düzeni menüsünden yazdırma alanı olarak ayarlayın.",
        "<strong>Yönü seçin:</strong> Sütun sayısı satır sayısından fazla ya da tablo 18 cm'den genişse yatay yönü deneyin.",
        "<strong>Kenar boşluklarını daraltın:</strong> Dar boşluk hazır ayarı birkaç santimetre kazandırır; ciltlenecek belgede sol boşluğu fazla bırakın.",
        "<strong>Ölçeklemeyi ayarlayın:</strong> Genişliği 1 sayfa, yüksekliği otomatik yapın. Program gereken yüzdeyi kendisi hesaplar.",
        "<strong>Önizleyin:</strong> Baskı önizlemesinde yazının okunur kaldığını ve sayfa sonlarının mantıklı yerlere düştüğünü kontrol edin."
      ]
    },
    {
      h: "Yazdırma alanı nasıl belirlenir?",
      p: [
        "Yazdırma alanı, çalışma sayfasının yalnızca belirli bir hücre aralığının basılmasını sağlar. Örneğin A1:H45 aralığını yazdırma alanı yaparsanız, sayfanın sağında duran hesap notları ya da aşağıdaki taslak tablolar çıktıya girmez. Program bu ayarı dosyayla birlikte kaydeder; bir sonraki yazdırmada da aynı alan kullanılır.",
        "Yazdırma alanı ayarlıyken sayfa sonu önizlemesi görünümüne geçerseniz, mavi kesik çizgiler sayfaların nerede bölündüğünü gösterir. Bu çizgileri fareyle sürükleyerek sayfa sonlarını elle taşıyabilirsiniz; program ölçeği buna göre otomatik değiştirir. Birden fazla bağımsız aralığı aynı anda yazdırma alanı yaparsanız her biri ayrı sayfaya basılır."
      ]
    },
    {
      h: "Yatay (landscape) yazdırma ne zaman tercih edilir?",
      p: [
        "Tablonun genişliği yüksekliğinden belirgin biçimde fazlaysa yatay yön neredeyse her zaman daha iyi sonuç verir. A4 yatayda kullanılabilir genişlik dikeye göre yaklaşık %50 daha fazladır (26,1 cm'ye karşı 17,4 cm). On ve daha fazla sütunlu fiyat listeleri, aylık puantaj ve vardiya çizelgeleri, takvim görünümlü planlar için yatay yön doğal tercihtir.",
        "Dikey yön ise az sütunlu, çok satırlı listeler için uygundur: telefon rehberi, ürün listesi, yoklama çizelgesi gibi. Bir belgenin bazı sayfaları dikey, bazıları yatay olabilir; bunun için her tabloyu ayrı çalışma sayfasına koyup her sayfanın yönünü ayrı ayarlayın."
      ]
    },
    {
      h: "Sütunlar ikinci sayfaya taşıyorsa ne yapılır?",
      ul: [
        "<strong>Tek bir sütun taşıyorsa:</strong> Ölçeklemeye gitmeden önce kenar boşluklarını daraltmayı ya da en geniş sütunu biraz kısmayı deneyin; çoğu zaman bu yeter.",
        "<strong>Birden fazla sütun taşıyorsa:</strong> Genişliği 1 sayfaya ölçekleyin ya da yönü yataya çevirin.",
        "<strong>Tablo çok genişse:</strong> Tabloyu mantıklı iki parçaya bölün (örneğin ilk yarıyıl ve ikinci yarıyıl) ya da A3 kâğıda yazdırın.",
        "<strong>Sütun yerine satır bazlı okunacaksa:</strong> Sayfa sırasını \"önce aşağı, sonra yana\" yerine \"önce yana, sonra aşağı\" ayarlayın; böylece aynı satırların devamı ardışık sayfalarda olur.",
        "<strong>Boş sayfa çıkıyorsa:</strong> Kullanılan alanın sağında ya da altında biçimlendirilmiş boş hücreler kalmıştır; yazdırma alanını yeniden tanımlayın."
      ]
    },
    {
      h: "Ölçekleme yazıyı okunmaz hâle getirir mi?",
      p: [
        "Getirebilir. \"Sayfayı tek sayfaya sığdır\" seçeneği hem genişliği hem yüksekliği tek sayfaya zorladığı için 200 satırlık bir tabloyu %25'e kadar küçültebilir; bu durumda 11 puntoluk yazı yaklaşık 2,8 puntoya iner ve çıplak gözle okunmaz. Uzun tablolarda bu yüzden yalnızca genişliği 1 sayfaya sığdırın, yüksekliği otomatik bırakın.",
        "Pratik bir sınır olarak yazdırılan yazının 7–8 puntonun altına inmemesine dikkat edin. 11 puntoluk bir tabloda bu, yaklaşık %65–70 ölçeğe karşılık gelir. Daha fazla küçültme gerekiyorsa yatay yön, A3 kâğıt ya da tabloyu bölmek daha iyi seçeneklerdir. Toner tasarrufu için gri tonlamalı yazdırmayı da düşünebilirsiniz."
      ],
      table: {
        head: ["Ölçek", "11 punto yazı kâğıtta", "Okunabilirlik"],
        rows: [
          ["%100", "11 punto", "Rahat"],
          ["%85", "9,4 punto", "Rahat"],
          ["%72", "7,9 punto", "Okunur, küçük"],
          ["%60", "6,6 punto", "Zor, yakından"],
          ["%40", "4,4 punto", "Pratikte okunmaz"]
        ]
      }
    },
    {
      h: "Başlık satırı her sayfada nasıl tekrarlanır?",
      p: [
        "Çok sayfaya yayılan tablolarda ikinci sayfadan itibaren sütun başlıkları görünmezse hangi sayının neyi gösterdiği anlaşılmaz. Sayfa düzeni ayarlarındaki \"yazdırma başlıkları\" bölümünde <strong>üstte yinelenecek satırlar</strong> alanına başlık satırını (örneğin 1. satır ya da 1:2 aralığı) girin. Program bu satırı her sayfanın başına otomatik ekler; tabloya fiziksel olarak kopyalamanız gerekmez.",
        "Aynı yöntemle <strong>solda yinelenecek sütunlar</strong> da tanımlayabilirsiniz. Ürün kodu ya da personel adı gibi kimlik sütununu her sayfada tekrarlamak, yana doğru bölünen geniş tablolarda okumayı çok kolaylaştırır. Sayfa altbilgisine \"Sayfa 1 / 4\" biçiminde numara eklemek de dağınık çıktıların sırasını korur."
      ]
    },
    {
      h: "PDF'e çevirirken sayfa düzeni neden bozulur? Geniş tablo A4'e nasıl sığdırılır?",
      p: [
        "PDF'e çevirme, aslında sanal bir yazıcıya yazdırmaktır. Sayfa düzeni ayarları yapılmamış bir tablo, PDF'te de kâğıtta olduğu gibi bölünür. Bilgisayarda bulunmayan yazı tipleri yerine başka yazı tipi kullanılırsa metin genişler ve son sütun bir sonraki sayfaya kayabilir. Farklı bir bilgisayarda açılan dosyada varsayılan yazıcının kâğıt boyutu Letter ise A4 için yapılan ayarlar da bozulur.",
        "Çözüm, PDF'e çevirmeden önce yukarıdaki adımlarla sayfa düzenini tamamlamaktır: yazdırma alanı, yön, ölçek, başlık satırları ve kâğıt boyutu. Programınızda bu ayarlarla uğraşmak istemiyorsanız [[arac:excelden-pdfe|Excel'i PDF'e Çevir]] aracı A4 ya da A3, yatay ya da dikey, sayfaya sığdırma ve başlık tekrarı seçenekleriyle dosyayı tarayıcınızda çevirir.",
        "Elinizde zaten oluşturulmuş ama sayfaları farklı boyutlarda bir PDF varsa [[arac:pdf-a4-boyutlandir|PDF Sayfa Boyutunu Değiştir]] aracıyla bütün sayfaları A4'e getirebilirsiniz. Çok sayfalı küçük tabloları tek kâğıda ikişer ya da dörder sayfa basmak için [[arac:pdf-n-up|PDF Sayfaları Tek Sayfaya Sığdır]] aracını kullanabilirsiniz. Dönüştürme süreciyle ilgili ayrıntılar [[rehber:excel-pdf-donusturme|Excel PDF dönüştürme rehberinde]] yer alır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yazı tipini küçültmek:</strong> Tüm hücrelerin puntosunu elle düşürmek ekranda da okumayı zorlaştırır; küçültmeyi yalnızca yazdırma ölçeğiyle yapın.",
        "<strong>Boş hücreleri biçimlendirmek:</strong> Bütün sütuna kenarlık ya da renk vermek, programın binlerce boş satırı da yazdırılacak alan sanmasına yol açar.",
        "<strong>Önizlemeyi atlamak:</strong> Ayar yaptıktan sonra baskı önizlemesine bakmadan yazdırmak, kâğıt ve toner israfının en yaygın nedenidir.",
        "<strong>Başlığı her sayfaya kopyalamak:</strong> Başlık satırını elle tekrar yazmak, satır eklenince sayfa sonlarını bozar; yinelenecek satırlar ayarını kullanın.",
        "<strong>Kâğıt boyutunu kontrol etmemek:</strong> Başka bilgisayardan gelen dosyada kâğıt Letter olarak kalmış olabilir; A4 seçili olduğundan emin olun."
      ]
    }
  ],
  faq: [
    ["Excel tablosu tek sayfaya nasıl sığdırılır?", "Sayfa düzeni ayarlarında ölçeklemeyi genişlik 1 sayfa, yükseklik otomatik yapın; gerekirse yönü yataya çevirip kenar boşluklarını daraltın. Önce gereksiz sütunları gizlemek ölçeğin daha az düşmesini sağlar."],
    ["Yazdırma alanı nasıl belirlenir?", "Basılacak hücre aralığını seçin ve sayfa düzeni menüsünden yazdırma alanı olarak ayarlayın. Bu alan dosyayla kaydedilir; dışındaki notlar ve yardımcı tablolar çıktıya girmez."],
    ["Yatay (landscape) yazdırma ne zaman tercih edilir?", "Tablo genişliği 18 cm'yi aşıyorsa ya da sütun sayısı fazlaysa yatay yön tercih edilir. A4 yatayda kullanılabilir genişlik dikeye göre yaklaşık yüzde elli fazladır ve yazıyı küçültme ihtiyacını azaltır."],
    ["Sütunlar ikinci sayfaya taşıyorsa ne yapılır?", "Önce kenar boşluklarını daraltıp geniş sütunları kısın. Yetmezse genişliği tek sayfaya ölçekleyin, yönü yataya çevirin ya da çok geniş tabloyu mantıklı iki parçaya bölün."],
    ["Ölçekleme yazıyı okunmaz hâle getirir mi?", "Fazla küçültülürse evet. Yazdırılan punto, gerçek punto ile ölçeğin çarpımıdır; 11 puntoluk yazı yüzde yetmiş ölçekte yaklaşık 7,7 puntoya düşer. Bunun altına inmemeye çalışın."],
    ["Başlık satırı her sayfada nasıl tekrarlanır?", "Sayfa düzeni ayarlarındaki yazdırma başlıkları bölümünde üstte yinelenecek satırlar alanına başlık satırını girin. Program bu satırı her sayfanın başına otomatik olarak ekler."],
    ["Excel PDF'e çevrilirken sayfa düzeni neden bozulur?", "PDF'e çevirmek sanal yazıcıya yazdırmaktır; sayfa düzeni ayarlanmamışsa tablo aynı şekilde bölünür. Eksik yazı tipleri ve farklı varsayılan kâğıt boyutu da son sütunun kaymasına yol açabilir."],
    ["Geniş tablo A4'e nasıl sığdırılır?", "Gerekli ölçeği kullanılabilir genişliğin tablo genişliğine bölünmesiyle hesaplayın. Yüzde yetmişin altına iniyorsa yatay yönü, dar kenar boşluğunu ya da tabloyu iki parçaya bölmeyi tercih edin."],
    ["Tek sayfaya sığdırınca neden çok küçük çıkıyor?", "Sayfayı tek sayfaya sığdır seçeneği yüksekliği de tek sayfaya zorlar. Uzun tablolarda yalnızca genişliği bir sayfaya sığdırıp yüksekliği otomatik bıraktığınızda yazı çok daha büyük kalır."]
  ],
  tools: ["excelden-pdfe", "pdf-a4-boyutlandir", "pdf-n-up"],
  related: ["a4-kagit-boyutu-kac-cm", "punto-kac-mm-yazi-boyutu", "kitapcik-baski-nasil-yapilir-bir-sayfaya-iki-sayfa", "gri-tonlama-yazdirma-ile-toner-tasarrufu"]
};
