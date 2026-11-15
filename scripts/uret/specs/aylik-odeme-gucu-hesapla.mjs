export default {
  slug: 'aylik-odeme-gucu-hesapla',
  title: 'Gelire Göre Aylık Ödeme Gücü Hesaplama',
  h1Tail: 'ne kadar taksit ödeyebilirim?',
  pageTitle: 'Aylık Ödeme Gücü Hesaplama – Gelire Göre Ne Kadar Taksit Ödenir?',
  description: "Aylık gelirinize, sabit giderlerinize ve mevcut taksitlerinize göre bütçenizi zorlamadan üstlenebileceğiniz en yüksek yeni taksiti ve borç/gelir oranınızı hesaplayın.",
  card: "Gelir, gider ve mevcut borçlarınıza göre rahatça ödeyebileceğiniz en yüksek aylık taksiti hesaplayın.",
  category: 'finans',
  keywords: ['aylık ödeme gücü hesaplama', 'ne kadar taksit ödeyebilirim', 'borç gelir oranı hesaplama', 'gelire göre kredi taksiti', 'taksit ödeme kapasitesi', 'borçlanma kapasitesi', 'maaşa göre taksit'],
  lead: "Yeni bir kredi ya da taksitli alışveriş öncesinde bütçenizin ne kadar taksiti kaldıracağını görün. Araç, aylık gelirinizi, sabit giderlerinizi ve mevcut borç ödemelerinizi kullanarak <strong>üstlenebileceğiniz en yüksek yeni taksiti</strong> ve <strong>borç/gelir oranınızı</strong> hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'gelir', label: 'Aylık net gelir (TL)', type: 'number', placeholder: 'Örn. 50000', hint: 'Hanenin düzenli net geliri. Binlik ayraç kullanmayın ya da 50.000,00 biçiminde yazın.' },
    { id: 'gider', label: 'Aylık sabit giderler (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 20000', hint: 'Kira, fatura, mutfak, ulaşım, okul gibi zorunlu harcamalar. Binlik ayraç kullanmayın.' },
    { id: 'mevcut', label: 'Mevcut aylık borç ödemeleri (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 5000', hint: 'Süren kredi taksitleri ve kart taksitleri toplamı.' },
    { id: 'oran', label: 'Borç/gelir oranı sınırı (%)', type: 'number', value: '40', hint: 'Toplam borç ödemesinin gelire oranı için kabul ettiğiniz üst sınır.' },
  ],
  compute(v, h) {
    const gelir = h.pos(v.gelir, 'Aylık net gelir');
    const gider = h.opt(v.gider, 0, 'Aylık sabit giderler');
    const mevcut = h.opt(v.mevcut, 0, 'Mevcut aylık borç ödemeleri');
    const oran = h.opt(v.oran, 40, 'Borç/gelir oranı sınırı');
    if (gider < 0 || mevcut < 0) h.err('Gider ve borç ödemesi alanları negatif olamaz.');
    if (!(oran > 0) || oran > 100) h.err('"Borç/gelir oranı sınırı" 0\'dan büyük ve en fazla 100 olmalı.');
    const sinir = gelir * oran / 100;
    const kalan = gelir - gider - mevcut;
    const orandan = sinir - mevcut;
    const yeni = Math.max(0, Math.min(orandan, kalan));
    let neden;
    if (yeni <= 1e-9) neden = kalan <= 1e-9 ? 'Yeni taksit için bütçede pay yok' : 'Borç/gelir sınırı zaten dolmuş';
    else neden = kalan < orandan - 1e-9 ? 'Giderlerden kalan bütçe' : 'Borç/gelir oranı sınırı';
    return {
      rows: [
        ['Üstlenilebilecek en yüksek yeni taksit', h.para(yeni)],
        ['Belirleyici sınır', neden],
        ['Toplam borç ödeme sınırı', h.para(sinir)],
        ['Mevcut borç/gelir oranı', '%' + h.fmt(mevcut / gelir * 100, 2)],
        ['Yeni taksitle borç/gelir oranı', '%' + h.fmt((mevcut + yeni) / gelir * 100, 2)],
        ['Gider ve mevcut borçlardan sonra kalan', h.para(kalan)],
        ['Yeni taksitten sonra kalan', h.para(kalan - yeni)],
      ],
      note: 'Bu tutar bir üst sınırdır; beklenmedik harcamalar ve birikim için pay bırakmak üzere daha düşük bir taksit seçmek güvenlidir. Kredi kuruluşları kendi ölçütlerini uygular.',
    };
  },
  cases: [
    { in: { gelir: '50000' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '20.000,00 TL', 'Belirleyici sınır': 'Borç/gelir oranı sınırı', 'Toplam borç ödeme sınırı': '20.000,00 TL', 'Mevcut borç/gelir oranı': '%0' } },
    { in: { gelir: '50000', gider: '20000', mevcut: '5000' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '15.000,00 TL', 'Mevcut borç/gelir oranı': '%10', 'Yeni taksitle borç/gelir oranı': '%40', 'Gider ve mevcut borçlardan sonra kalan': '25.000,00 TL', 'Yeni taksitten sonra kalan': '10.000,00 TL' } },
    { in: { gelir: '30000', gider: '22000', mevcut: '3000' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '5.000,00 TL', 'Belirleyici sınır': 'Giderlerden kalan bütçe', 'Yeni taksitle borç/gelir oranı': '%26,67', 'Yeni taksitten sonra kalan': '0,00 TL' } },
    { in: { gelir: '40000', mevcut: '18000' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '0,00 TL', 'Belirleyici sınır': 'Borç/gelir sınırı zaten dolmuş', 'Mevcut borç/gelir oranı': '%45' } },
    { in: { gelir: '60000', gider: '10000', oran: '30' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '18.000,00 TL', 'Toplam borç ödeme sınırı': '18.000,00 TL', 'Yeni taksitten sonra kalan': '32.000,00 TL' } },
    { in: { gelir: '25000', gider: '24000', mevcut: '2000' }, out: { 'Üstlenilebilecek en yüksek yeni taksit': '0,00 TL', 'Belirleyici sınır': 'Yeni taksit için bütçede pay yok', 'Gider ve mevcut borçlardan sonra kalan': '-1.000,00 TL' } },
    { in: { gelir: '0' }, error: true },
    { in: { gelir: '50000', oran: '150' }, error: true },
  ],
  howto: [
    '"Aylık net gelir" alanına elinize geçen düzenli geliri yazın. Düzensiz gelirleri (prim, ek iş) dâhil etmemek daha temkinli bir sonuç verir.',
    'Kira, faturalar, mutfak ve ulaşım gibi her ay kaçınılmaz olan harcamalarınızın toplamını "Aylık sabit giderler" alanına girin.',
    'Hâlen ödediğiniz kredi ve kredi kartı taksitlerinin aylık toplamını yazın.',
    'Borç/gelir oranı sınırını gerekirse değiştirin. Daha temkinli bir plan için oranı düşürebilirsiniz.',
    '"Hesapla" düğmesine basın; önerilen en yüksek taksit ve bu taksitten sonra elinizde kalacak tutar gösterilir.',
  ],
  sections: [
    { h: 'Ödeme gücü nedir, nasıl ölçülür?', p: [
      "Ödeme gücü, bir hanenin yaşam düzenini bozmadan her ay borç ödemesine ayırabileceği paradır. Bunu ölçmenin iki tamamlayıcı yolu vardır. Birincisi <strong>borç/gelir oranıdır</strong>: tüm aylık borç ödemelerinin net gelire bölünmesiyle bulunur ve borç yükünün gelire göre ağırlığını gösterir. İkincisi <strong>kalan bütçe</strong> yaklaşımıdır: gelirden zorunlu giderler ve mevcut taksitler düşüldükten sonra elde ne kaldığına bakılır.",
      "Tek başına hiçbiri yeterli değildir. Geliri yüksek ama giderleri de yüksek bir hane, borç/gelir oranı düşük görünse bile yeni bir taksiti kaldıramayabilir. Tersine, giderleri çok düşük biri için kalan bütçe büyük görünür ama gelirin büyük bölümünü borca bağlamak ilk beklenmedik masrafta sıkıntı yaratır. Araç bu yüzden iki sınırı da hesaplar ve <strong>küçük olanı</strong> önerir; hangi sınırın belirleyici olduğunu da ayrı bir satırda söyler.",
    ] },
    { h: 'Hesaplama formülü', p: [
      "Önce oran sınırından gelen tutar bulunur: <strong>gelir × sınır oranı − mevcut borç ödemeleri</strong>. Sonra bütçeden kalan tutar bulunur: <strong>gelir − sabit giderler − mevcut borç ödemeleri</strong>. Üstlenilebilecek en yüksek yeni taksit bu ikisinden küçük olanıdır; sonuç eksiye düşüyorsa sıfır kabul edilir.",
      "Varsayılan sınır yüzde 40'tır. Bu, kişisel finans kaynaklarında sık anılan pratik bir eşiktir, resmî ya da bağlayıcı bir kural değildir. Kredi veren kuruluşların uyguladığı ölçütler kuruma, kredi türüne ve yürürlükteki düzenlemelere göre değişir; başvuru öncesinde güncel koşulları ilgili kuruluştan öğrenin.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "<strong>Oran sınırının belirleyici olduğu durum:</strong> Aylık net geliri 50.000 TL, sabit giderleri 20.000 TL ve mevcut taksitleri 5.000 TL olan bir hane düşünelim. Yüzde 40 sınırına göre toplam borç ödemesi en fazla 50.000 × 0,40 = 20.000 TL olabilir; mevcut 5.000 TL düşülünce yeni taksit için 15.000 TL kalır. Bütçe tarafında ise 50.000 − 20.000 − 5.000 = 25.000 TL boşluk vardır. Küçük olan 15.000 TL'dir. Bu taksit alındığında borç/gelir oranı yüzde 10'dan yüzde 40'a çıkar ve ay sonunda 10.000 TL serbest para kalır.",
      "<strong>Bütçenin belirleyici olduğu durum:</strong> Geliri 30.000 TL, giderleri 22.000 TL, mevcut taksiti 3.000 TL olan biri için oran sınırı 12.000 − 3.000 = 9.000 TL'ye izin verir; ancak bütçede yalnızca 30.000 − 22.000 − 3.000 = 5.000 TL vardır. Önerilen üst sınır 5.000 TL'dir ve bu durumda ay sonunda hiç para kalmaz. Böyle bir sonuç gördüğünüzde üst sınırın tamamını kullanmak yerine belirgin biçimde daha düşük bir taksit seçmek gerekir.",
    ] },
    { h: 'Üst sınırın tamamını kullanmalı mıyım?', p: [
      "Hayır; araç bir tavan gösterir, hedef değil. Sabit giderler listesine girmeyen pek çok harcama vardır: sağlık, giyim, ev ve araç onarımı, hediye, tatil, okul dönemi masrafları. Ayrıca gelir kesintiye uğrayabilir, değişken faizli borçlarda taksit artabilir. Yeni taksitten sonra kalan tutarın en azından gelirin onda biri kadar olması ve bir acil durum fonunun bulunması, planı daha dayanıklı kılar.",
      "Taksitli bir alışveriş ya da kredi düşünüyorsanız önce taksiti bu araçla sınayın, ardından vade ve faiz koşullarına göre toplam geri ödemeyi ayrıca hesaplayın. Düşük taksit uğruna vadeyi çok uzatmak ödenecek toplam faizi artırır.",
    ] },
    { h: 'Borç/gelir oranını yorumlama', ul: [
      "<strong>%20'nin altı:</strong> borç yükü hafiftir; yeni bir yükümlülük için alan vardır.",
      "<strong>%20 – %35:</strong> yönetilebilir düzeydir; yeni borç alırken kalan bütçeye dikkat edilmelidir.",
      "<strong>%35 – %50:</strong> bütçe gergindir; gelir kaybı ya da beklenmedik gider ödemeleri aksatabilir.",
      "<strong>%50'nin üstü:</strong> gelirin yarısından fazlası borca gidiyor demektir; yeni borç yerine mevcut borcu azaltmaya odaklanmak yerinde olur.",
    ], p: [
      "Bu bölümdeki aralıklar genel kabul görmüş pratik yorumlardır, kesin sınırlar değildir. Kişinin gelir güvencesi, bakmakla yükümlü olduğu kişi sayısı ve birikimi değerlendirmeyi değiştirir.",
    ] },
    { h: 'Uyarı', p: [
      "Sonuçlar girdiğiniz rakamlara dayanan bilgilendirme amaçlı bir tahmindir; kredi onayı, kredi notu ya da bir kuruluşun vereceği limit hakkında bilgi vermez. Önemli bir borçlanma kararı öncesinde sözleşme koşullarını dikkatle okuyun ve gerekirse bir mali danışmana başvurun.",
    ] },
  ],
  faq: [
    ['Maaşımın ne kadarını taksite ayırabilirim?', "Kesin bir kural yoktur. Yaygın pratik yaklaşım, tüm borç ödemelerinin net gelirin yaklaşık yüzde 30 ile 40'ını aşmamasıdır. Araç varsayılan olarak yüzde 40 kullanır; daha temkinli olmak için oranı düşürebilirsiniz."],
    ['Borç/gelir oranı nasıl hesaplanır?', "Aylık tüm borç ödemelerinin toplamı aylık net gelire bölünür ve 100 ile çarpılır. 40.000 TL gelir ve 18.000 TL taksit için oran yüzde 45'tir."],
    ['Sabit giderlere neler yazılmalı?', "Kira ya da aidat, elektrik, su, doğal gaz, internet ve telefon faturaları, mutfak harcaması, ulaşım, okul ve kreş ödemeleri, sigorta primleri gibi her ay kaçınılmaz olan kalemler yazılır. Taksitleri buraya değil, mevcut borç ödemeleri alanına girin."],
    ['Kira borç ödemesi sayılır mı?', "Bu araçta kira sabit gider olarak ele alınır, borç/gelir oranına girmez. Bazı değerlendirmelerde konut gideri de orana katılır; daha sıkı bir sınama isterseniz kirayı mevcut borç ödemeleri alanına yazabilirsiniz."],
    ['Sonuç sıfır çıktı, ne anlama geliyor?', "Ya mevcut borçlarınız belirlediğiniz oran sınırını zaten dolduruyor ya da gelirden gider ve taksitler düşüldüğünde para kalmıyor demektir. 'Belirleyici sınır' satırı hangisinin geçerli olduğunu gösterir."],
    ['Bu taksitle ne kadar kredi çekebileceğimi nasıl bulurum?', "Kredi tutarı; taksite, vadeye ve faiz oranına birlikte bağlıdır. Burada bulduğunuz taksiti bir taksit ya da kredi hesaplama aracına girerek farklı vade ve oranlar için tutarı görebilirsiniz."],
    ['Eşimin gelirini eklemeli miyim?', "Borç ortak bütçeden ödenecekse hanenin toplam düzenli net gelirini ve toplam giderlerini yazmak daha doğru sonuç verir. Tek kişinin ödeyeceği bir borçta yalnızca o kişinin gelirini kullanın."],
    ['Gelir ve borç bilgilerim saklanıyor mu?', "Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız hiçbir tutar sunucuya gönderilmez ya da kaydedilmez."],
  ],
  related: ['taksit-hesapla', 'borc-odeme-plani-hesapla', 'butce-50-30-20-hesapla', 'tasarruf-orani-hesapla', 'yillik-maas-hesapla'],
};
