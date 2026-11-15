export default {
  slug: 'favok-hesapla',
  title: 'FAVÖK ve FAVÖK Marjı Hesaplama',
  h1Tail: 'iki yöntemle',
  pageTitle: 'FAVÖK Hesaplama – FAVÖK Marjı ve Faaliyet Kârı (FVÖK)',
  description: 'Faiz, amortisman ve vergi öncesi kârı (FAVÖK) faaliyet kârından ya da net kârdan başlayarak hesaplayın; FAVÖK marjını ve faaliyet kârı marjını birlikte görün.',
  card: 'FAVÖK tutarını ve FAVÖK marjını faaliyet kârından ya da net kârdan başlayarak iki yöntemle hesaplayın.',
  category: 'finans',
  keywords: ['favök hesaplama', 'favök marjı hesaplama', 'favök nedir', 'ebitda hesaplama', 'favök formülü', 'faiz amortisman vergi öncesi kâr', 'fvök hesaplama', 'ebitda marjı'],
  lead: 'İşletmenizin ana faaliyetinden ürettiği nakde yakın kârı bulun. Araç <strong>FAVÖK</strong> (faiz, amortisman ve vergi öncesi kâr) tutarını iki farklı yoldan hesaplar ve satışlara oranlayarak <strong>FAVÖK marjını</strong> verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Hesaplama yöntemi', type: 'select', options: [['faaliyet', 'Satışlardan başla (satış − maliyet − giderler + amortisman)'], ['net', 'Net kârdan başla (net kâr + faiz + vergi + amortisman)']], wide: true },
    { id: 'satis', label: 'Net satışlar (TL)', type: 'number', placeholder: 'Örn. 1000000', hint: 'Binlik ayraç kullanmayın ya da 1.000.000,00 biçiminde yazın.' },
    { id: 'amortisman', label: 'Amortisman ve itfa payları (TL)', type: 'number', placeholder: 'Örn. 50000', hint: 'Maliyet ve giderlerin içinde yer alan toplam tutar; boş = 0.' },
    { id: 'smm', label: 'Satışların maliyeti (TL)', type: 'number', placeholder: 'Örn. 600000', hint: 'Yalnızca birinci yöntemde kullanılır.' },
    { id: 'gider', label: 'Faaliyet giderleri (TL)', type: 'number', placeholder: 'Örn. 250000', hint: 'Pazarlama, satış, genel yönetim, Ar-Ge. Yalnızca birinci yöntemde; boş = 0.' },
    { id: 'netKar', label: 'Dönem net kârı (TL)', type: 'number', placeholder: 'Örn. 80000', hint: 'Yalnızca ikinci yöntemde; zarar için eksi işaretiyle yazın.' },
    { id: 'faiz', label: 'Finansman (faiz) giderleri (TL)', type: 'number', placeholder: 'Örn. 30000', hint: 'Yalnızca ikinci yöntemde; boş = 0.' },
    { id: 'vergi', label: 'Vergi gideri (TL)', type: 'number', placeholder: 'Örn. 40000', hint: 'Yalnızca ikinci yöntemde; boş = 0.' },
  ],
  compute(v, h) {
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const nn = (s, ad) => { const n = h.opt(s, 0, ad); if (n < 0) h.err(`"${ad}" negatif olamaz.`); return n; };
    const satis = h.pos(v.satis, 'Net satışlar');
    const amort = nn(v.amortisman, 'Amortisman ve itfa payları');
    let fvok, note;
    if (v.yontem === 'net') {
      const kar = h.num(v.netKar, 'Dönem net kârı');
      const faiz = nn(v.faiz, 'Finansman (faiz) giderleri');
      const vergi = nn(v.vergi, 'Vergi gideri');
      fvok = kar + faiz + vergi;
      note = 'Net kârdan başlanan yöntemde, esas faaliyet dışı gelir ve giderler (kur farkı, varlık satış kârı gibi) net kârın içinde kaldığı için sonuç, satışlardan başlanan yöntemden farklı çıkabilir.';
    } else {
      const smm = h.nonneg(v.smm, 'Satışların maliyeti');
      const gider = nn(v.gider, 'Faaliyet giderleri');
      if (amort > smm + gider + 1e-9) h.err('"Amortisman ve itfa payları" maliyet ve giderlerin toplamından büyük olamaz; amortisman bu kalemlerin içinde yer alan bir tutardır.');
      fvok = satis - smm - gider;
      note = 'Amortisman, satışların maliyeti ve faaliyet giderlerinin içinde zaten gider yazılmış kabul edilir ve faaliyet kârına geri eklenir.';
    }
    const favok = fvok + amort;
    return {
      rows: [
        ['FAVÖK', h.para(favok)],
        ['FAVÖK marjı', yuzde(favok / satis * 100)],
        ['Faaliyet kârı (FVÖK)', h.para(fvok)],
        ['FVÖK marjı', yuzde(fvok / satis * 100)],
        ['Geri eklenen amortisman', h.para(amort)],
      ],
      note,
    };
  },
  cases: [
    { in: { yontem: 'faaliyet', satis: '1000000', smm: '600000', gider: '250000', amortisman: '50000' }, out: { 'FAVÖK': '200.000,00 TL', 'FAVÖK marjı': '%20', 'Faaliyet kârı (FVÖK)': '150.000,00 TL', 'FVÖK marjı': '%15' } },
    { in: { yontem: 'net', satis: '1000000', netKar: '80000', faiz: '30000', vergi: '40000', amortisman: '50000' }, out: { 'FAVÖK': '200.000,00 TL', 'FAVÖK marjı': '%20', 'Faaliyet kârı (FVÖK)': '150.000,00 TL', 'FVÖK marjı': '%15' } },
    { in: { yontem: 'faaliyet', satis: '500000', smm: '400000', gider: '150000', amortisman: '20000' }, out: { 'FAVÖK': '-30.000,00 TL', 'FAVÖK marjı': '-%6', 'Faaliyet kârı (FVÖK)': '-50.000,00 TL', 'FVÖK marjı': '-%10' } },
    { in: { yontem: 'faaliyet', satis: '2400000', smm: '1500000', gider: '540000', amortisman: '' }, out: { 'FAVÖK': '360.000,00 TL', 'FAVÖK marjı': '%15', 'Geri eklenen amortisman': '0,00 TL' } },
    { in: { yontem: 'net', satis: '800000', netKar: '-20000', faiz: '60000', vergi: '', amortisman: '40000' }, out: { 'FAVÖK': '80.000,00 TL', 'FAVÖK marjı': '%10', 'Faaliyet kârı (FVÖK)': '40.000,00 TL', 'FVÖK marjı': '%5' } },
    { in: { yontem: 'faaliyet', satis: '750000', smm: '450000', gider: '187500', amortisman: '37500' }, out: { 'FAVÖK': '150.000,00 TL', 'FAVÖK marjı': '%20', 'FVÖK marjı': '%15' } },
    { in: { yontem: 'faaliyet', satis: '0', smm: '600000', gider: '250000', amortisman: '50000' }, error: true },
    { in: { yontem: 'net', satis: '1000000', netKar: '', faiz: '30000', vergi: '40000', amortisman: '50000' }, error: true },
    { in: { yontem: 'faaliyet', satis: '1000000', smm: '600000', gider: '250000', amortisman: '-5' }, error: true },
  ],
  howto: [
    'Elinizdeki verilere uygun yöntemi seçin. Ayrıntılı gelir tablonuz varsa "Satışlardan başla", yalnızca net kâr ile faiz ve vergi tutarlarını biliyorsanız "Net kârdan başla" seçeneği uygundur.',
    'Her iki yöntemde de net satışları ve dönem içinde gider yazılan toplam amortisman ile itfa payını girin.',
    'Birinci yöntemde satışların maliyetini ve faaliyet giderlerini; ikinci yöntemde net kârı, finansman giderini ve vergi giderini doldurun. Seçmediğiniz yöntemin alanları dikkate alınmaz.',
    '"Hesapla" düğmesine basın. FAVÖK tutarı, FAVÖK marjı, faaliyet kârı (FVÖK) ve FVÖK marjı birlikte listelenir.',
  ],
  sections: [
    { h: 'FAVÖK nedir?', p: [
      'FAVÖK, "faiz, amortisman ve vergi öncesi kâr" ifadesinin kısaltmasıdır; İngilizce karşılığı EBITDA\'dır. Bir işletmenin ana faaliyetinden, yani mal ya da hizmet üretip satmaktan elde ettiği kârı; borçlanma düzeyinin, vergi yükünün ve geçmişte yapılmış yatırımların muhasebe etkisinin dışında gösterir.',
      'Amortisman, yıllar önce satın alınmış bir makinenin maliyetinin yıllara yayılarak gider yazılmasıdır; o yıl kasadan para çıkışı gerektirmez. Faiz gideri işletmenin ne kadar borçlandığına, vergi ise yasal düzenlemelere ve teşviklere bağlıdır. FAVÖK bu üç kalemi dışarıda bırakarak "bu iş kendi başına ne kadar para üretiyor?" sorusuna yaklaşık bir yanıt verir. Bu nedenle şirket değerlemelerinde, kredi görüşmelerinde ve farklı borç yapısına sahip işletmelerin karşılaştırılmasında sıkça kullanılır.',
    ] },
    { h: 'İki hesaplama yöntemi', p: [
      'FAVÖK\'e gelir tablosunun üstünden ya da altından başlayarak ulaşılabilir.',
    ], ul: [
      '<strong>Satışlardan başlayarak:</strong> Faaliyet kârı (FVÖK) = Net satışlar − Satışların maliyeti − Faaliyet giderleri. Ardından <strong>FAVÖK = FVÖK + Amortisman ve itfa payları</strong>.',
      '<strong>Net kârdan başlayarak:</strong> <strong>FAVÖK = Net kâr + Finansman giderleri + Vergi gideri + Amortisman ve itfa payları</strong>.',
      '<strong>FAVÖK marjı</strong> = FAVÖK ÷ Net satışlar × 100.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir gıda üreticisinin yıllık net satışı 1.000.000 TL, satışlarının maliyeti 600.000 TL, pazarlama ve genel yönetim giderleri 250.000 TL olsun. Bu tutarların içinde makine ve taşıtlar için ayrılmış 50.000 TL amortisman bulunuyor. Faaliyet kârı 1.000.000 − 600.000 − 250.000 = 150.000 TL\'dir. Amortisman geri eklendiğinde FAVÖK 150.000 + 50.000 = 200.000 TL çıkar. FAVÖK marjı 200.000 ÷ 1.000.000 = %20, faaliyet kârı marjı ise %15\'tir.',
      'Aynı işletme 30.000 TL faiz ve 40.000 TL vergi ödedikten sonra 80.000 TL net kâr açıklamış olsun. Alttan yukarı gidildiğinde 80.000 + 30.000 + 40.000 + 50.000 = 200.000 TL bulunur. İki yöntem, esas faaliyet dışı gelir ya da gider olmadığında aynı sonuca ulaşır.',
    ] },
    { h: 'İki yöntem neden farklı sonuç verebilir?', p: [
      'Gerçek gelir tablolarında faaliyet kârı ile net kâr arasında yalnızca faiz ve vergi yoktur. Kur farkı gelir ve giderleri, yatırım faaliyetlerinden gelirler, iştirak kârları, sabit kıymet satış kârı ya da zararı gibi kalemler de araya girer. Net kârdan başlayan hesap bu kalemleri FAVÖK\'ün içinde bırakır; satışlardan başlayan hesap ise dışarıda tutar. Ana faaliyetin performansını görmek istiyorsanız birinci yöntem daha temiz bir sonuç verir. Şirketlerin açıkladığı FAVÖK rakamlarını karşılaştırırken hangi tanımın kullanıldığına bakmayı unutmayın; "düzeltilmiş FAVÖK" gibi adlarla tek seferlik giderlerin de geri eklendiği durumlar yaygındır.',
    ] },
    { h: 'FAVÖK marjı nasıl yorumlanır?', p: [
      'FAVÖK marjı, her 100 liralık satışın kaç lirasının faaliyetten nakde yakın kâr olarak kaldığını gösterir. Marj ne kadar yüksekse işletmenin faiz ödemek, yatırım yapmak ve ortaklarına pay dağıtmak için o kadar geniş alanı vardır. Yine de sektörler arası fark büyüktür: düşük marjla yüksek hacim çeviren perakende ve dağıtım işletmelerinde marj tek haneli olabilirken, yazılım ya da telekom altyapısı gibi alanlarda çok daha yüksek değerler görülür. Marjı kendi sektörünüzle ve geçmiş dönemlerinizle karşılaştırın.',
      'Bankalar ve yatırımcılar FAVÖK\'ü borç ödeme kapasitesinin göstergesi olarak da kullanır; net finansal borcun FAVÖK\'e oranı, mevcut faaliyet kârıyla borcun kaç yılda ödenebileceğine dair kaba bir fikir verir.',
    ] },
    { h: 'FAVÖK\'ün sınırları', ul: [
      'FAVÖK nakit akışı değildir. Stok ve alacak artışına bağlanan para ile makine yenileme harcamaları bu rakamda görünmez.',
      'Amortismanı yok saymak, makinelerin bir gün yenilenmesi gerekeceği gerçeğini ortadan kaldırmaz. Varlık yoğun işletmelerde FAVÖK, gerçek kârlılığı olduğundan parlak gösterebilir.',
      'Faiz dışarıda bırakıldığı için aşırı borçlu bir işletme de yüksek FAVÖK açıklayabilir; borç yükünü ayrıca değerlendirin.',
      'Standart bir muhasebe kalemi olmadığı için hesaplama ayrıntıları işletmeden işletmeye değişebilir.',
    ], p: [
      'Bu hesaplayıcı genel bilgi verir; değerleme, kredi başvurusu ya da yatırım kararı için mali müşavirinizin ya da bir finans uzmanının hazırladığı analizi esas alın.',
    ] },
  ],
  faq: [
    ['FAVÖK nasıl hesaplanır?', 'Faaliyet kârına dönem içinde gider yazılan amortisman ve itfa payları eklenir. Faaliyet kârı, net satışlardan satışların maliyeti ve faaliyet giderleri düşülerek bulunur. Alternatif olarak net kâra faiz, vergi ve amortisman eklenir.'],
    ['FAVÖK marjı nedir?', 'FAVÖK tutarının net satışlara oranıdır. 1.000.000 TL satış ve 200.000 TL FAVÖK için marj %20\'dir; her 100 liralık satışın 20 lirası faiz, vergi ve amortisman öncesi kâr olarak kalmıştır.'],
    ['FAVÖK ile FVÖK arasındaki fark nedir?', 'FVÖK (faiz ve vergi öncesi kâr), amortisman düşüldükten sonraki faaliyet kârıdır. FAVÖK ise amortismanın geri eklenmiş hâlidir. Aradaki fark tam olarak dönemin amortisman ve itfa giderine eşittir.'],
    ['FAVÖK ile EBITDA aynı şey mi?', 'Evet. EBITDA, İngilizce "earnings before interest, taxes, depreciation and amortization" ifadesinin kısaltmasıdır; Türkçede FAVÖK olarak kullanılır.'],
    ['Amortisman tutarını nereden bulurum?', 'Gelir tablosunda ayrı bir satır olarak görünmeyebilir; satışların maliyeti ve faaliyet giderlerinin içine dağılmıştır. Toplam tutar mali tablo dipnotlarında, nakit akış tablosunda ya da muhasebe kayıtlarındaki amortisman giderleri dökümünde yer alır.'],
    ['FAVÖK negatif olabilir mi?', 'Evet. Satışlar, amortisman hariç maliyet ve giderleri bile karşılamıyorsa FAVÖK negatif çıkar. Bu, işletmenin ana faaliyetinin yatırım ve finansman maliyetlerinden önce bile nakit tükettiğini gösteren ciddi bir uyarıdır.'],
    ['FAVÖK net kârdan neden büyüktür?', 'Çünkü faiz, vergi ve amortisman giderleri henüz düşülmemiştir. Bu üç kalemin toplamı kadar fark oluşur. Yüksek borçlu ya da makine yatırımı büyük işletmelerde FAVÖK ile net kâr arasındaki açıklık çok geniş olabilir.'],
    ['Girdiğim finansal veriler paylaşılıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; satış, maliyet ve kâr rakamlarınız hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['faaliyet-kar-marji-hesapla', 'kar-marji-hesapla', 'amortisman-hesapla', 'ozkaynak-karliligi-hesapla', 'aktif-karlilik-hesapla', 'kar-zarar-hesapla'],
};
