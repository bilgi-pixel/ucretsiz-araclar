export default {
  slug: "borc-kapatma-yontemleri-cig-ve-kartopu",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Borç Nasıl Kapatılır? Çığ ve Kartopu Yöntemiyle Borç Ödeme Planı",
  pageTitle: "Borç Nasıl Kapatılır? Çığ ve Kartopu Yöntemi Karşılaştırması",
  description: "Birden fazla borç çığ yöntemiyle en yüksek faizliden, kartopu yöntemiyle en küçük bakiyeden kapatılır. Çözümlü örnek, faiz farkı, kart mı kredi mi ve yapılandırma.",
  keywords: ["borç nasıl kapatılır", "kartopu yöntemi", "çığ yöntemi borç", "borç ödeme planı", "kredi kartı borcu nasıl biter", "borç sıralaması", "borç kapatma stratejisi", "snowball avalanche"],
  lead: "Birden fazla borcu kapatırken iki yöntem öne çıkar: <strong>çığ (avalanche) yöntemi</strong> tüm borçların asgari ödemesini yapıp artan parayı en yüksek faizli borca, <strong>kartopu (snowball) yöntemi</strong> ise en küçük bakiyeli borca yönlendirir. Çığ yöntemi matematiksel olarak daha az faiz öder; kartopu yöntemi ilk borcu daha hızlı kapattığı için motivasyon sağlar. Bu sayfada iki yöntemi aynı borçlar üzerinde ay ay karşılaştıran çözümlü bir örnek, kredi kartı ile kredi arasında sıra seçimi, asgari ödemenin maliyeti ve yapılandırmanın ne zaman mantıklı olduğu anlatılıyor.",
  kisaCevap: [
    "Önce tüm borçların asgari ya da sabit taksitleri ödenir; geriye kalan \"ek para\" tek bir hedef borca yönlendirilir.",
    "Çığ yöntemi: ek para en yüksek faiz oranlı borca gider; toplam faiz en düşük olur.",
    "Kartopu yöntemi: ek para en küçük bakiyeli borca gider; ilk borç daha erken kapanır.",
    "Bir borç kapanınca onun taksiti de bir sonraki hedefe eklenir; ödeme tutarı kartopu gibi büyür.",
    "Örnekte 70.000 TL borç, ayda 7.000 TL ile iki yöntemde de 13 ayda biter; çığ yöntemi yaklaşık 3.000 TL daha az faiz öder.",
    "Yalnızca asgari ve sabit taksitlerle aynı borç 46 ayda ve yaklaşık 60.000 TL faizle kapanır."
  ],
  figure: {
    alt: "Üç borcun kapanış ayları: kartopu yönteminde Kart B 2. ayda, kredi 7. ayda, Kart A 13. ayda kapanıyor; çığ yönteminde Kart A 10., Kart B 11., kredi 13. ayda. Toplam faiz 19.988 TL ve 16.988 TL.",
    caption: "Aynı borçlar ve aynı aylık bütçeyle iki yöntem 13 ayda biter; fark, faizin ne kadar olduğu ve ilk borcun ne zaman kapandığıdır. Faiz oranları ve tutarlar örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı borçlar, iki yöntem: hangi borç kaçıncı ayda biter?</text>
  <g class="sm mid t2">
    <text x="190" y="62">1</text><text x="425" y="62">7</text><text x="545" y="62">10</text><text x="660" y="62">13 ay</text>
  </g>
  <line x1="190" y1="70" x2="660" y2="70" class="sb" fill="none"/>
  <text x="20" y="100" class="b">Kartopu</text>
  <text x="20" y="118" class="sm t2">küçük bakiye önce</text>
  <rect x="190" y="88" width="39" height="22" rx="4" class="oks"/><text x="236" y="104" class="sm">Kart B · 2. ay</text>
  <rect x="190" y="116" width="235" height="22" rx="4" class="ps"/><text x="432" y="132" class="sm">Kredi · 7. ay</text>
  <rect x="190" y="144" width="470" height="22" rx="4" class="dgs"/><text x="196" y="160" class="sm b">Kart A · 13. ay</text>
  <rect x="520" y="172" width="180" height="30" rx="6" class="sf sb"/><text x="610" y="192" class="sm b mid">Faiz: 19.988 TL</text>
  <text x="20" y="244" class="b">Çığ</text>
  <text x="20" y="262" class="sm t2">yüksek faiz önce</text>
  <rect x="190" y="232" width="352" height="22" rx="4" class="dgs"/><text x="196" y="248" class="sm b">Kart A · 10. ay</text>
  <rect x="190" y="260" width="392" height="22" rx="4" class="oks"/><text x="196" y="276" class="sm b">Kart B · 11. ay</text>
  <rect x="190" y="288" width="470" height="22" rx="4" class="ps"/><text x="196" y="304" class="sm b">Kredi · 13. ay</text>
  <rect x="520" y="316" width="180" height="30" rx="6" class="p"/><text x="610" y="336" class="sm b mid sf">Faiz: 16.988 TL</text>
  <rect x="20" y="360" width="680" height="44" rx="8" class="sf sb"/>
  <text x="36" y="380" class="sm">Kart A 40.000 TL %4,25 · Kart B 6.000 TL %3,25 · Kredi 24.000 TL %2,5 (aylık, örnek)</text>
  <text x="36" y="397" class="sm t2">Aylık bütçe 7.000 TL: 4.000 TL asgari/sabit ödeme + 3.000 TL ek ödeme</text>
</svg>`
  },
  sections: [
    {
      h: "Birden fazla borç hangi sırayla kapatılmalı?",
      p: [
        "Birden fazla borcu olan kişinin ilk hatası, ek parayı tüm borçlara eşit dağıtmaktır. Bu yaklaşım hiçbir borcu hızlıca kapatmaz ve yüksek faizli borçların büyümesine zaman tanır. Sistemli bir plan iki kurala dayanır: <strong>hiçbir borcun asgari ödemesini kaçırmamak</strong> ve elde kalan tüm ek parayı <strong>tek bir hedef borca</strong> yöneltmek.",
        "Hedef borcun hangisi olacağını belirleyen ölçüt, iki yöntem arasındaki farkı oluşturur. Çığ yönteminde ölçüt faiz oranı, kartopu yönteminde bakiye büyüklüğüdür. İki yöntemde de bir borç kapandığında onun için ödenen tutar bir sonraki hedefe eklenir; aylık toplam ödeme sabit kalırken hedefe giden pay giderek büyür."
      ]
    },
    {
      h: "Çığ (avalanche) yöntemi nedir?",
      p: [
        "Çığ yönteminde borçlar <strong>faiz oranına göre büyükten küçüğe</strong> sıralanır. Asgari ödemeler yapıldıktan sonra kalan para en yüksek faizli borca yatırılır. O borç bitince ek para bir sonraki en yüksek faizliye geçer.",
        "Yöntemin mantığı basittir: her ay en çok faiz üreten bakiyeyi küçültmek, toplam faiz maliyetini en aza indirir. Dezavantajı, en yüksek faizli borç aynı zamanda büyük bir bakiyeyse ilk \"kapandı\" duygusunun aylarca gecikebilmesidir."
      ]
    },
    {
      h: "Kartopu (snowball) yöntemi nedir?",
      p: [
        "Kartopu yönteminde borçlar <strong>bakiyeye göre küçükten büyüğe</strong> sıralanır; faiz oranına bakılmaz. Ek para en küçük borca gider, o borç kısa sürede kapanır ve serbest kalan taksit bir sonraki küçük borca eklenir.",
        "Bu yöntem matematiksel olarak genellikle daha fazla faiz öder, ama ilk borcun birkaç ay içinde kapanması güçlü bir motivasyon kaynağıdır. Borç ödemede en büyük risk planı yarıda bırakmak olduğu için, bazı kişiler için kartopu yöntemi pratikte daha başarılı sonuç verebilir. Ayrıca kapanan her borç, takip edilecek bir son ödeme tarihini ve gecikme riskini ortadan kaldırır."
      ]
    },
    {
      h: "Çözümlü örnek: aynı borçlar, iki yöntem",
      p: [
        "Bir kişinin üç borcu ve borç ödemeye ayırabileceği aylık 7.000 TL'si var. Faiz oranları aylık ve örnektir; her ay önce faiz eklenip sonra ödeme düşülmüştür. Kredi kartlarının \"asgari\" ödemesi hesabı sadeleştirmek için sabit tutar alınmıştır."
      ],
      table: {
        head: ["Borç", "Bakiye", "Aylık faiz (örnek)", "Asgari / sabit ödeme"],
        rows: [
          ["Kart A", "40.000 TL", "%4,25", "2.000 TL"],
          ["Kart B", "6.000 TL", "%3,25", "600 TL"],
          ["İhtiyaç kredisi", "24.000 TL", "%2,50", "1.400 TL"],
          ["Toplam", "70.000 TL", "", "4.000 TL (+3.000 TL ek)"]
        ]
      },
      ol: [
        "<strong>Kartopu sırası:</strong> Kart B (6.000) → Kredi (24.000) → Kart A (40.000). Kart B 2. ayda, kredi 7. ayda, Kart A 13. ayda kapanır. Toplam faiz yaklaşık <strong>19.988 TL</strong>.",
        "<strong>Çığ sırası:</strong> Kart A (%4,25) → Kart B (%3,25) → Kredi (%2,50). Kart A 10. ayda, Kart B 11. ayda, kredi 13. ayda kapanır. Toplam faiz yaklaşık <strong>16.988 TL</strong>.",
        "<strong>Fark:</strong> Her iki plan da 13 ayda biter; çığ yöntemi yaklaşık 3.000 TL daha az faiz öder. Kartopu yöntemi ise ilk borcu 2. ayda kapatarak erken bir kazanım sağlar.",
        "<strong>Hiç plan yapılmazsa:</strong> Yalnızca asgari ve sabit ödemeler yapılıp ek 3.000 TL borca yatırılmazsa aynı borçlar yaklaşık 46 ayda ve 60.000 TL'yi aşan faizle kapanır."
      ],
      after: [
        "Faiz farkı, borçların faiz oranları birbirinden ne kadar uzaksa o kadar büyür. Oranlar birbirine yakınsa iki yöntem arasındaki fark önemsizleşir ve motivasyon açısından kartopu tercih edilebilir. Kendi borçlarınızla bu hesabı yapmak için her borcu [[arac:borc-odeme-plani-hesapla|Borç Ödeme Planı Hesaplama]] aracına girip ay ay tabloyu görebilirsiniz."
      ]
    },
    {
      h: "Hangi yöntem daha az faiz öder?",
      p: [
        "Asgari ödemeler aynı ve ek para aynıysa, <strong>çığ yöntemi her zaman toplam faizi en aza indirir</strong> ya da en kötü durumda kartopuya eşit olur. Bunun nedeni, her ay ek paranın en pahalı borca gitmesi ve faiz üreten bakiyenin en hızlı küçülmesidir.",
        "Kartopu yönteminin avantajı finansal değil davranışsaldır. Karar verirken kendinize şunu sorun: \"Birkaç bin lira daha az faiz mi, yoksa ilk ayda bir borcun kapandığını görmek mi beni planda tutar?\" İkisinin karması da mümkündür: çok küçük bir borç birkaç ayda kapanabiliyorsa önce onu bitirip ardından çığ sırasına geçmek."
      ],
      table: {
        head: ["Ölçüt", "Çığ yöntemi", "Kartopu yöntemi"],
        rows: [
          ["Sıralama ölçütü", "Faiz oranı (yüksekten düşüğe)", "Bakiye (küçükten büyüğe)"],
          ["Toplam faiz", "En düşük", "Biraz ya da belirgin yüksek"],
          ["İlk borcun kapanması", "Geç olabilir", "Hızlı"],
          ["Motivasyon", "Sabır ister", "Erken kazanım sağlar"],
          ["En uygun olduğu durum", "Faiz oranları arasında büyük fark varsa", "Çok sayıda küçük borç ve motivasyon sorunu varsa"]
        ]
      }
    },
    {
      h: "Kredi kartı borcu mu, kredi borcu mu önce kapatılmalı?",
      p: [
        "Türkiye'de kredi kartı akdi faizi genellikle ihtiyaç kredisi faizinden yüksektir ve faiz kalan bakiyenin tamamına işler. Bu nedenle çığ mantığıyla çoğu durumda <strong>önce kart borcu</strong> hedeflenir. Kredi kartı faiz oranları TCMB tarafından borç tutarına göre kademeli olarak belirlenir; güncel oranları [[bilgi:kredi-karti-akdi-ve-gecikme-faizi-2026|kredi kartı akdi ve gecikme faizi]] makalesinde bulabilirsiniz.",
        "İstisnalar da vardır: kredinin gecikmeye düşmüş bir taksiti varsa, gecikme faizi ve kredi notu etkisi nedeniyle önce o taksit güncel hâle getirilmelidir. Ayrıca ihtiyaç kredisini erken kapatmanın bir erken ödeme ücreti olabileceğini ve kalan faizin indirileceğini unutmayın; erken kapamanın hesabı için [[bilgi:kredi-erken-kapama-nasil-hesaplanir|kredi erken kapama]] makalesine bakın."
      ]
    },
    {
      h: "Asgari ödemeyle borç kaç ayda biter?",
      p: [
        "Yalnızca asgari ödeme yapıldığında, ödemenin büyük kısmı faize gider ve anapara çok yavaş azalır. Örnekteki 40.000 TL'lik Kart A için her ay 2.000 TL ödendiğinde, ilk ay faiz 40.000 × %4,25 = 1.700 TL olur; 2.000 TL'lik ödemenin yalnızca 300 TL'si borcu azaltır. Borcun kapanması bu tempoyla yıllar sürer.",
        "Kendi kartınız için yalnızca asgari ödemeyle borcun kaç ayda biteceğini ve toplam ne kadar faiz ödeyeceğinizi [[arac:kredi-karti-asgari-odeme-hesapla|Kredi Kartı Asgari Ödeme Hesaplama]] aracıyla görebilirsiniz. Bu hesap, ek ödemenin neden bu kadar önemli olduğunu somut olarak gösterir."
      ]
    },
    {
      h: "Borç transferi ya da yapılandırma ne zaman mantıklı?",
      ul: [
        "<strong>Yeni faiz gerçekten düşükse:</strong> Kart borcunu daha düşük faizli bir krediye aktarmak toplam maliyeti düşürebilir. Karşılaştırmayı aylık faizle değil, tüm masraflar ve vergiler dahil toplam geri ödemeyle yapın.",
        "<strong>Taksit bütçeye uyuyorsa:</strong> Vadeyi uzatmak aylık yükü azaltır ama toplam faizi artırabilir. Yapılandırmanın kısa vadeli rahatlama mı, gerçek tasarruf mu sağladığını [[arac:kredi-hesapla|Kredi Hesaplama]] aracıyla kontrol edin.",
        "<strong>Kartı kullanmayı durdurabiliyorsanız:</strong> Borç transferinden sonra kart yeniden doldurulursa toplam borç artar. Transfer, harcama alışkanlığı değişmezse sorunu çözmez.",
        "<strong>Gecikme varsa:</strong> Yasal takibe dönüşmeden bankayla yapılandırma görüşmesi yapmak, hem faiz hem kredi notu açısından genellikle daha az zararlıdır."
      ],
      after: [
        "Bu bölüm genel bilgi verir; hangi ürünün sizin için uygun olduğu gelir durumunuza ve sözleşme koşullarına bağlıdır ve kişisel finansal tavsiye niteliği taşımaz."
      ]
    },
    {
      h: "Borç öderken birikim yapılmalı mı?",
      p: [
        "Yüksek faizli borç varken birikim yapmak çoğu zaman pahalıdır: aylık %4 faizli borcun karşısında, mevduatın net getirisi genellikle daha düşüktür. Yine de <strong>küçük bir acil durum fonu</strong> tutmak önerilir. Fon olmadığında beklenmedik bir masraf yeniden karta yüklenir ve plan bozulur.",
        "Pratik bir yaklaşım: önce bir aylık zorunlu giderleri karşılayacak küçük bir fon oluşturmak, ardından tüm ek parayı borca yöneltmek, borçlar bittikten sonra eski taksit tutarlarını doğrudan birikime aktarmaktır. Gelir-gider dağılımını planlamak için [[bilgi:50-30-20-butce-kurali|50/30/20 bütçe kuralı]] ve [[arac:butce-planlayici|Bütçe Planlayıcı]] işinizi kolaylaştırır."
      ]
    },
    {
      h: "Adım adım borç ödeme planı",
      ol: [
        "Tüm borçları tek listede toplayın: bakiye, aylık faiz, asgari ya da sabit ödeme, son ödeme tarihi.",
        "Aylık bütçenizde borca ayırabileceğiniz toplam tutarı belirleyin; asgari ödemelerin toplamını bundan çıkarın, kalan ek paradır.",
        "Yönteminizi seçin: faiz farkı büyükse çığ, motivasyon önceliğiyse kartopu.",
        "Her ay tüm asgari ödemeleri otomatik talimatla yapın, ek parayı yalnızca hedef borca yatırın.",
        "Bir borç kapandığında onun ödemesini bir sonraki hedefe ekleyin; aylık toplam ödemeyi düşürmeyin.",
        "Ayda bir listeyi güncelleyin ve kalan süreyi yeniden hesaplayın."
      ]
    }
  ],
  faq: [
    ["Birden fazla borç hangi sırayla kapatılmalı?", "Tüm borçların asgari ödemesi yapıldıktan sonra kalan para tek bir hedefe yöneltilmelidir. Faizi en aza indirmek için en yüksek faizli borç, motivasyon için en küçük bakiyeli borç hedef seçilir."],
    ["Kartopu (snowball) yöntemi nedir?", "Borçların bakiyeye göre küçükten büyüğe sıralandığı ve ek paranın en küçük borca yatırıldığı yöntemdir. Küçük borç kapanınca onun taksiti bir sonrakine eklenir; ödeme kartopu gibi büyür."],
    ["Çığ (avalanche) yöntemi nedir?", "Borçların faiz oranına göre yüksekten düşüğe sıralandığı ve ek paranın en yüksek faizli borca gittiği yöntemdir. En pahalı bakiye en hızlı küçüldüğü için toplam faiz en düşük olur."],
    ["Hangi yöntem daha az faiz öder?", "Asgari ödemeler ve ek para aynıysa çığ yöntemi her zaman en az faizi öder. Örnekte iki yöntem 13 ayda bitmiş, çığ yöntemi yaklaşık 3.000 TL daha az faiz ödemiştir; fark oranlar arasındaki açıklığa bağlıdır."],
    ["Kredi kartı borcu mu kredi borcu mu önce kapatılmalı?", "Kart faizi genellikle ihtiyaç kredisi faizinden yüksek olduğu için çoğu durumda önce kart borcu hedeflenir. Gecikmeye düşmüş bir kredi taksiti varsa önce onun güncellenmesi gerekir."],
    ["Asgari ödemeyle borç kaç ayda biter?", "Faiz yüksekse asgari ödemenin büyük kısmı faize gider ve borç yıllarca sürebilir. Örnekte 40.000 TL'lik kartta 2.000 TL ödemenin ilk ay yalnızca 300 TL'si anaparayı azaltmaktadır."],
    ["Borç transferi ya da yapılandırma ne zaman mantıklı?", "Yeni ürünün masraflar dahil toplam maliyeti gerçekten düşükse, taksit bütçeye uyuyorsa ve eski kart yeniden doldurulmayacaksa mantıklı olabilir. Vade uzatmak aylık yükü azaltsa da toplam faizi artırabilir."],
    ["Borç öderken birikim yapılmalı mı?", "Yüksek faizli borç varken büyük birikim genellikle pahalıdır; ancak beklenmedik masrafların yeniden karta yüklenmemesi için küçük bir acil durum fonu tutulması önerilir. Borç bitince taksitler birikime aktarılabilir."],
    ["Borçlar bittikten sonra ne yapılmalı?", "Borçlara ödenen aylık tutar harcamaya kaydırılmadan birikime ya da acil durum fonuna aktarılmalıdır. Böylece yeni borçlanma ihtiyacı azalır ve bütçe disiplini korunur."]
  ],
  tools: ["borc-odeme-plani-hesapla", "kredi-karti-asgari-odeme-hesapla", "kredi-hesapla", "butce-planlayici", "faiz-hesapla"],
  related: ["kredi-karti-akdi-ve-gecikme-faizi-2026", "kredi-erken-kapama-nasil-hesaplanir", "50-30-20-butce-kurali", "kredi-notu-kac-olmali-findeks", "bilesik-faiz-nedir"],
  sources: [
    ["TCMB – Kredi kartı işlemlerinde uygulanacak azami faiz oranları", "https://www.tcmb.gov.tr/"]
  ],
  uyari: "finansal tavsiye değildir; borçlarınızla ilgili kararlar için sözleşme koşullarınızı ve bütçenizi esas alın"
};
