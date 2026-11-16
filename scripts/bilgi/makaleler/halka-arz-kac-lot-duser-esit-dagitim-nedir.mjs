export default {
  slug: "halka-arz-kac-lot-duser-esit-dagitim-nedir",
  kategori: "finans",
  tarih: "2026-11-16",
  title: "Halka Arz Kaç Lot Düşer? Eşit Dağıtım, Oransal Dağıtım ve Hesaplama",
  pageTitle: "Halka Arz Kaç Lot Düşer? Eşit ve Oransal Dağıtım Hesabı",
  description: "Halka arzda kişi başı lot, bireysel yatırımcıya ayrılan lot sayısının katılımcı sayısına bölünmesiyle bulunur. Eşit ve oransal dağıtım, bloke tutar ve örnek hesaplar.",
  keywords: ["halka arz kaç lot düşer", "eşit dağıtım nedir", "halka arz lot hesaplama", "oransal dağıtım", "lot nedir", "halka arz katılımcı sayısı", "halka arz nasıl katılınır", "halka arz dağıtım sonuçları"],
  lead: "Eşit dağıtımlı bir halka arzda kişi başına düşen lot, yaklaşık olarak <strong>bireysel yatırımcılara ayrılan toplam lot ÷ katılımcı sayısı</strong> formülüyle bulunur; daha az talep edenlerin artan payı diğerlerine yeniden paylaştırılır. Oransal dağıtımda ise herkes talebiyle orantılı pay alır. Borsa İstanbul'da 1 lot 1 paydır. Bu sayfada iki yöntemin adım adım hesabını, katılımcı sayısının etkisini, bloke edilen tutarı ve izahnamede bakılacak bilgileri anlatıyoruz; yatırım tavsiyesi vermiyoruz.",
  kisaCevap: [
    "Borsa İstanbul pay piyasasında 1 lot, 1 adet paydır.",
    "Eşit dağıtımda kişi başı lot ≈ bireysel gruba ayrılan lot ÷ talepte bulunan kişi sayısıdır.",
    "Eşit paydan az talep eden, talebi kadar alır; artan lotlar kalan yatırımcılar arasında yeniden eşit bölünür.",
    "Oransal dağıtımda herkes, dağıtılacak lotun toplam talebe oranı kadar pay alır.",
    "Aynı kişinin farklı aracı kurumlardan verdiği talepler birleştirilir; kişi başı lotu artırmaz.",
    "Talep sırasında lot × fiyat kadar tutar bloke edilir; dağıtım sonrası alınamayan kısmın blokesi kaldırılır."
  ],
  figure: {
    alt: "Eşit dağıtım örneği: 1.000 lot dört yatırımcıya; A 100 lot ister ve alır, kalan 900 lot üç kişiye 300'er bölünür; B 300, C ve D 300'er lot alır. Yanında oransal dağıtım: toplam 4.000 lot talepte oran 0,25.",
    caption: "Eşit dağıtımda küçük talepler önce tamamen karşılanır, artan lot diğerlerine bölünür. Oransal dağıtımda herkes talebinin aynı oranını alır. Sayılar öğretici örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="190" y="30" class="lg b mid">Eşit dağıtım</text>
  <text x="190" y="52" class="sm mid mu">1.000 lot · 4 kişi · ilk eşit pay 250</text>
  <g class="sm">
    <text x="30" y="92" class="b">A</text><text x="30" y="108" class="mu">talep 100</text>
    <rect x="100" y="78" width="40" height="28" rx="4" class="p"/><text x="150" y="98" class="b">100</text>
    <text x="30" y="152" class="b">B</text><text x="30" y="168" class="mu">talep 300</text>
    <rect x="100" y="138" width="120" height="28" rx="4" class="p"/><text x="230" y="158" class="b">300</text>
    <text x="30" y="212" class="b">C</text><text x="30" y="228" class="mu">talep 400</text>
    <rect x="100" y="198" width="120" height="28" rx="4" class="p"/><rect x="220" y="198" width="40" height="28" class="sf sb"/>
    <text x="270" y="218" class="b">300</text>
    <text x="30" y="272" class="b">D</text><text x="30" y="288" class="mu">talep 600</text>
    <rect x="100" y="258" width="120" height="28" rx="4" class="p"/><rect x="220" y="258" width="120" height="28" class="sf sb"/>
    <text x="350" y="278" class="b">300</text>
  </g>
  <rect x="20" y="308" width="340" height="96" rx="8" class="sf sb"/>
  <text x="36" y="332" class="sm">1) A talebi 250'den az: 100 alır</text>
  <text x="36" y="354" class="sm">2) Kalan 900 ÷ 3 = 300</text>
  <text x="36" y="376" class="sm">3) B, C, D 300'er alır · Toplam 1.000</text>
  <text x="36" y="396" class="sm mu">Boş kutu: karşılanamayan talep</text>
  <line x1="380" y1="20" x2="380" y2="404" class="sb dash" fill="none"/>
  <text x="550" y="30" class="lg b mid">Oransal dağıtım</text>
  <text x="550" y="52" class="sm mid mu">1.000 lot ÷ 4.000 talep = 0,25</text>
  <g class="sm">
    <text x="400" y="98" class="b">A 400</text><rect x="470" y="80" width="100" height="26" rx="4" class="ps"/><rect x="470" y="80" width="25" height="26" class="p"/><text x="580" y="99">→ 100</text>
    <text x="400" y="158" class="b">B 800</text><rect x="470" y="140" width="200" height="26" rx="4" class="ps"/><rect x="470" y="140" width="50" height="26" class="p"/><text x="530" y="159">→ 200</text>
    <text x="400" y="218" class="b">C 1.200</text><rect x="470" y="200" width="225" height="26" rx="4" class="ps"/><rect x="470" y="200" width="75" height="26" class="p"/><text x="555" y="219">→ 300</text>
    <text x="400" y="278" class="b">D 1.600</text><rect x="470" y="260" width="225" height="26" rx="4" class="ps"/><rect x="470" y="260" width="100" height="26" class="p"/><text x="580" y="279">→ 400</text>
  </g>
  <rect x="400" y="308" width="300" height="96" rx="8" class="oks"/>
  <text x="416" y="334" class="sm">Herkes talebinin %25'ini alır</text>
  <text x="416" y="358" class="sm">Büyük talep, büyük pay</text>
  <text x="416" y="382" class="sm">Toplam: 100+200+300+400 = 1.000</text>
</svg>`
  },
  sections: [
    {
      h: "Lot nedir, bir lot kaç paydır?",
      p: [
        "Lot, borsada alım satımın yapıldığı en küçük miktar birimidir. Borsa İstanbul pay piyasasında <strong>1 lot = 1 pay</strong> olarak işlem görür; geçmişte 1 lotun 100 pay olduğu dönemler vardı, bu nedenle eski kaynaklarda farklı ifadeler görebilirsiniz. Halka arz ilanında \"20.000.000 lot satılacak\" deniyorsa, satışa sunulan pay adedi de 20 milyondur.",
        "Bir lotun fiyatı, halka arz fiyatıdır. Halka arz fiyatı 25,00 TL olan bir şirketten 8 lot düşerse, yatırımcının ödeyeceği tutar 8 × 25 = 200 TL olur. Bu yüzden yoğun ilgi gören halka arzlarda kişi başı tutarlar çoğu zaman küçük kalır."
      ]
    },
    {
      h: "Halka arzda dağıtım grupları ve yöntemler",
      p: [
        "Halka arz edilen paylar tek bir havuzdan değil, izahnamede belirtilen <strong>yatırımcı gruplarına</strong> ayrılarak dağıtılır. Tipik gruplar şunlardır: yurt içi bireysel yatırımcılar, yurt içi yüksek başvurulu yatırımcılar, yurt içi kurumsal yatırımcılar ve yurt dışı kurumsal yatırımcılar. Her gruba ayrılan oran ve gruplar arası aktarım kuralları izahnamede ve satış duyurusunda yazar.",
        "Her grubun içinde hangi dağıtım yönteminin uygulanacağı da önceden belirlenir. Bireysel yatırımcılar için Türkiye'de en sık kullanılan yöntem <strong>eşit dağıtımdır</strong>; kurumsal gruplarda ise genellikle <strong>oransal dağıtım</strong> ya da talep toplayan kurumun belirlediği yöntemler uygulanır. Kişi başı lot sorusu çoğunlukla bireysel gruptaki eşit dağıtımı ilgilendirir."
      ],
      table: {
        head: ["Yöntem", "Nasıl dağıtır?", "Kime uygun?"],
        rows: [
          ["Eşit dağıtım", "Lotlar katılımcı sayısına eşit bölünür; artan pay yeniden paylaştırılır", "Küçük tutarlı bireysel yatırımcılar"],
          ["Oransal dağıtım", "Herkes talebinin aynı oranını alır", "Büyük tutarlı talepler, kurumsal gruplar"],
          ["Karma yöntemler", "Bir kısım eşit, kalan oransal ya da kurumun belirlediği yöntem", "İzahnameye göre değişir"]
        ],
        caption: "Hangi yöntemin uygulanacağı her halka arzın satış duyurusunda yazar; tabloyu genel bilgi olarak okuyun."
      }
    },
    {
      h: "Eşit dağıtım nasıl yapılır? Adım adım hesap",
      p: [
        "Eşit dağıtımda amaç, talepte bulunan her yatırımcıya mümkün olduğunca aynı sayıda lot vermektir. Ancak bazı yatırımcılar eşit paydan daha az talep eder. Bu durumda onların talebi tamamen karşılanır, kalan lotlar kalan yatırımcılar arasında yeniden eşit bölünür. İşlem, herkesin ya talebi kadar ya da eşit payı kadar lot aldığı noktaya kadar tekrarlanır."
      ],
      formula: "İlk eşit pay = dağıtılacak lot ÷ talepte bulunan kişi sayısı\nEşit paydan az talep edenler talebi kadar alır\nYeni eşit pay = kalan lot ÷ kalan kişi sayısı (tekrar edilir)",
      ol: [
        "Dağıtılacak 1.000 lot, talepte bulunan 4 kişi var: A 100, B 300, C 400, D 600 lot istiyor.",
        "İlk eşit pay 1.000 ÷ 4 = 250 lottur. A yalnızca 100 lot istediği için 100 lot alır.",
        "Kalan lot 1.000 − 100 = 900; kalan kişi 3. Yeni eşit pay 900 ÷ 3 = 300 lottur.",
        "B tam 300 lot istediği için 300 alır. C ve D de 300'er lot alır.",
        "Toplam dağıtım 100 + 300 + 300 + 300 = 1.000 lottur. C'nin 100, D'nin 300 lotluk talebi karşılanamaz ve blokeleri çözülür."
      ],
      after: [
        "Lotlar bölünemediği için gerçek dağıtımlarda küsuratlar da ortaya çıkar. Kalan birkaç lot, izahnamede belirtilen kurala göre (örneğin kura ya da sıralama ile) dağıtılır. Bu yüzden yayımlanan kişi başı sayı bazen tam bölmeden bir iki lot farklı olabilir. Bölme işlemlerini [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] aracıyla hızlıca kontrol edebilirsiniz."
      ]
    },
    {
      h: "Katılımcı sayısı arttıkça kişi başı lot neden azalır?",
      p: [
        "Eşit dağıtımda pay, katılımcı sayısına bölündüğü için katılım arttıkça kişi başı lot ters orantılı olarak azalır. Bireysel gruba ayrılan lot sabittir; bu sabit miktarı paylaşan kişi sayısı iki katına çıkarsa kişi başı pay yarıya iner. Bu ilişkinin matematiğini [[bilgi:oran-oranti-nasil-cozulur|ters orantı]] yazımızda örneklerle anlattık."
      ],
      table: {
        head: ["Bireysel gruba ayrılan lot", "Katılımcı sayısı", "Kişi başı lot (yaklaşık)", "25 TL fiyatla tutar"],
        rows: [
          ["20.000.000", "1.000.000", "20 lot", "500 TL"],
          ["20.000.000", "2.000.000", "10 lot", "250 TL"],
          ["20.000.000", "2.500.000", "8 lot", "200 TL"],
          ["20.000.000", "4.000.000", "5 lot", "125 TL"]
        ],
        caption: "Herkesin en az eşit pay kadar talep ettiği varsayılmıştır; sayılar örnektir."
      },
      after: [
        "Talep toplama sürerken bazı aracı kurumlar ve veri yayıncıları anlık katılımcı tahminleri paylaşır. Bu tahminlerle kendi hesabınızı yapabilirsiniz, ancak kesin sayı dağıtım sonuçları açıklandığında belli olur. Katılımcı sayısındaki değişimin etkisini görmek için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracından yararlanabilirsiniz."
      ]
    },
    {
      h: "Oransal dağıtımda kişi başı lot nasıl hesaplanır?",
      p: [
        "Oransal dağıtımda dağıtılacak lot miktarı toplam talebe bölünerek bir <strong>karşılama oranı</strong> bulunur. Her yatırımcı, talebini bu oranla çarparak payını öğrenir. Talep arzdan azsa oran 1'i aşar ve herkes talebinin tamamını alır."
      ],
      formula: "Karşılama oranı = dağıtılacak lot ÷ toplam talep edilen lot\nKişinin alacağı lot = kişinin talebi × karşılama oranı",
      ol: [
        "Dağıtılacak 1.000 lot için toplam 4.000 lot talep gelmiş olsun: A 400, B 800, C 1.200, D 1.600.",
        "Karşılama oranı 1.000 ÷ 4.000 = 0,25'tir.",
        "A 400 × 0,25 = 100, B 200, C 300, D 400 lot alır; toplam 1.000 lot dağıtılır.",
        "Aynı talepler eşit dağıtımla karşılansaydı herkes 250 lot alırdı; A'nın payı artar, D'ninki azalırdı."
      ]
    },
    {
      h: "Talep toplama, bloke tutar ve dağıtım sonuçları",
      ul: [
        "<strong>Talep toplama süresi:</strong> Genellikle birkaç iş günü sürer; kesin tarih ve saatler satış duyurusunda ilan edilir.",
        "<strong>Bloke tutar:</strong> Talep verirken talep ettiğiniz lot sayısı ile halka arz fiyatının çarpımı kadar tutar hesabınızda bloke edilir. Örneğin 1.000 lot × 25 TL = 25.000 TL. Bazı kurumlar nakit dışında yatırım fonu, döviz ya da başka menkul kıymetleri teminat olarak kabul eder; koşullar kurumdan kuruma değişir.",
        "<strong>Dağıtım sonuçları:</strong> Talep toplama bittikten sonra, satış duyurusunda belirtilen süre içinde Kamuyu Aydınlatma Platformu'nda (KAP) açıklanır. Ardından dağıtılan lotlar hesabınıza geçer ve kalan bloke çözülür.",
        "<strong>Borsada işlem başlangıcı:</strong> Payların işlem görmeye başlayacağı tarih Borsa İstanbul tarafından duyurulur. Bu tarihten önce paylar satılamaz."
      ],
      after: [
        "Bloke süresince paranızın faiz getirmemesi de bir maliyettir. Bloke süresinin olası faiz kaybını kaba olarak görmek için [[arac:yatirim-getirisi-hesapla|Yatırım Getirisi Hesaplama]] aracını kullanabilirsiniz. Elde ettiğiniz payların ortalama maliyetini izlemek isterseniz [[bilgi:hisse-ortalama-maliyet-nasil-hesaplanir|hisse ortalama maliyet]] yazımız yardımcı olur."
      ]
    },
    {
      h: "Birden fazla aracı kurumdan talep vermek lot sayısını artırır mı?",
      p: [
        "Hayır. Eşit dağıtımda pay, kişi başına hesaplanır; aynı yatırımcının farklı aracı kurumlardan verdiği talepler T.C. kimlik numarası üzerinden <strong>birleştirilir</strong> ve tek bir talep gibi değerlendirilir. Birden fazla kurumdan başvurmak yalnızca daha fazla tutarın bloke edilmesine yol açar, kişi başı lotu artırmaz.",
        "Ailenin her bireyinin kendi adına açılmış hesabından talep vermesi ise ayrı katılımcı sayılır. Ancak başkasının kimliğiyle ya da onun bilgisi dışında hesap açmak ve talep vermek hukuka aykırıdır."
      ]
    },
    {
      h: "İzahnamede hangi bilgilere bakılır?",
      p: [
        "İzahname, şirketin ve halka arzın tüm koşullarını içeren, Sermaye Piyasası Kurulu (SPK) onaylı belgedir. Katılım kararını kimse sizin yerinize vermemeli; aşağıdaki başlıklar, belgeyi okurken nelere dikkat edileceğine dair genel bir kontrol listesidir:"
      ],
      ul: [
        "<strong>Satış yöntemi ve dağıtım grupları:</strong> Bireysel gruba ayrılan oran ve uygulanacak dağıtım yöntemi.",
        "<strong>Fonun kullanım yeri:</strong> Halka arzdan gelen paranın yatırım, borç ödeme ya da ortak satışı için mi kullanılacağı.",
        "<strong>Sermaye artırımı mı, ortak satışı mı:</strong> Paranın şirkete mi, mevcut ortaklara mı gideceği.",
        "<strong>Finansal tablolar ve riskler:</strong> Son dönem gelir, kâr, borçluluk ve risk faktörleri. Oranların anlamı için [[bilgi:fk-orani-nedir|F/K oranı]] yazımıza bakabilirsiniz.",
        "<strong>Satmama taahhüdü ve fiyat istikrarı:</strong> Ortakların belirli süre pay satmama taahhüdü ve fiyat istikrarını sağlayıcı işlemler."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Talep kadar lot beklemek:</strong> Yoğun ilgi gören halka arzlarda talebin çok küçük bir kısmı karşılanır; büyük talep eşit dağıtımda payı artırmaz.",
        "<strong>Bloke tutarı yanlış hesaplamak:</strong> Bloke, talep edilen lot × fiyat kadardır; dağıtılan lot sonrası iade edilir.",
        "<strong>Birden fazla kurumdan talep vermek:</strong> Talepler birleştirilir; ek fayda sağlamaz.",
        "<strong>Geçmiş halka arzlardan genelleme yapmak:</strong> Bir şirketin ilk günlerdeki fiyat hareketi diğerleri için gösterge değildir; karar verirken izahnameyi okuyun.",
        "<strong>Vergi ve komisyonu unutmak:</strong> Aracı kurum komisyonları ve satış sonrası vergi durumu net sonucu etkiler. Kâr ve zarar hesabını [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama]] aracıyla yapabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Lot nedir, bir lot kaç paydır?", "Lot, borsadaki en küçük işlem birimidir. Borsa İstanbul pay piyasasında bir lot bir paya eşittir; dolayısıyla 10 lot almak, şirketin 10 adet payını almak anlamına gelir."],
    ["Halka arzda eşit dağıtım nasıl yapılır?", "Bireysel gruba ayrılan lot, talepte bulunan kişi sayısına bölünür. Eşit paydan az talep edenler talebi kadar alır, artan lotlar kalan yatırımcılar arasında yeniden eşit bölünür ve işlem herkes payını alana kadar sürer."],
    ["Oransal dağıtımda kişi başı lot nasıl hesaplanır?", "Dağıtılacak lot toplam talebe bölünerek karşılama oranı bulunur, her yatırımcının talebi bu oranla çarpılır. Örneğin oran 0,25 ise 800 lot talep eden kişi 200 lot alır."],
    ["Katılımcı sayısı arttıkça kişi başı lot neden azalır?", "Eşit dağıtımda bireysel gruba ayrılan sabit lot katılımcı sayısına bölünür. Katılımcı sayısı iki katına çıkarsa kişi başı lot yaklaşık yarıya iner; bu basit bir ters orantıdır."],
    ["Halka arzda talep toplama kaç gün sürer?", "Talep toplama genellikle birkaç iş günü sürer. Kesin başlangıç ve bitiş tarihleri ile saatleri, SPK onaylı izahname ve satış duyurusunda ilan edilir; aracı kurumlar da bu takvime göre talep alır."],
    ["Birden fazla aracı kurumdan talep vermek lot sayısını artırır mı?", "Hayır. Aynı kişinin farklı kurumlardan verdiği talepler kimlik numarası üzerinden birleştirilir ve tek talep sayılır. Birden fazla başvuru yalnızca daha fazla tutarın gereksiz yere bloke edilmesine yol açar."],
    ["Dağıtım sonuçları ne zaman açıklanır?", "Talep toplama bittikten sonra satış duyurusunda belirtilen süre içinde Kamuyu Aydınlatma Platformu'nda açıklanır. Sonuçlar açıklandıktan sonra lotlar hesaba geçer ve kullanılmayan bloke çözülür."],
    ["Halka arza katılmak için ne kadar para bloke edilir?", "Talep ettiğiniz lot sayısı ile halka arz fiyatının çarpımı kadar tutar bloke edilir. Örneğin 25 TL fiyatlı halka arzda 1.000 lot talebi için 25.000 TL bloke olur; dağıtım sonrası fazlası iade edilir."],
    ["İzahnamede hangi bilgilere bakılır?", "Satış yöntemi ve dağıtım grupları, fonun kullanım yeri, sermaye artırımı mı ortak satışı mı olduğu, finansal tablolar, risk faktörleri, satmama taahhüdü ve fiyat istikrarı koşulları izahnamede okunması gereken başlıca bölümlerdir."]
  ],
  tools: ["yuzde-hesapla", "oran-oranti-hesapla", "kar-zarar-hesapla", "yatirim-getirisi-hesapla"],
  related: ["hisse-ortalama-maliyet-nasil-hesaplanir", "fk-orani-nedir", "oran-oranti-nasil-cozulur"],
  sources: [
    ["Sermaye Piyasası Kurulu", "https://www.spk.gov.tr/"],
    ["Kamuyu Aydınlatma Platformu", "https://www.kap.org.tr/"],
    ["Borsa İstanbul", "https://www.borsaistanbul.com/"]
  ],
  uyari: "yatırım tavsiyesi değildir; halka arza katılım kararınızı izahnameyi okuyarak ve gerekirse yetkili bir yatırım danışmanına danışarak verin"
};
