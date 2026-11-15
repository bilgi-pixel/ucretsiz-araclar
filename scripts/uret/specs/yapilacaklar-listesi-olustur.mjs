export default {
  slug: 'yapilacaklar-listesi-olustur',
  title: 'Yapılacaklar Listesi Oluşturma',
  h1Tail: 'onay kutulu yazdırılabilir PDF',
  pageTitle: 'Yapılacaklar Listesi Oluştur – Onay Kutulu Yazdırılabilir PDF',
  description: 'Onay kutulu, numaralı yapılacaklar listesini PDF olarak oluşturun. Boş satırlarla ya da kendi maddeleriniz hazır yazılmış halde; öncelik, tarih ve sorumlu sütunlarıyla.',
  card: 'Onay kutulu yapılacaklar listesini PDF olarak oluşturun: boş ya da maddeleriniz hazır yazılı; öncelik, tarih ve sorumlu sütunu seçenekli.',
  category: 'planlama',
  pdf: true,
  keywords: ['yapılacaklar listesi', 'yapılacaklar listesi şablonu', 'to do listesi pdf', 'onay kutulu liste', 'yazdırılabilir yapılacaklar listesi', 'kontrol listesi oluştur', 'boş iş listesi', 'görev listesi şablonu'],
  lead: 'Her satırında onay kutusu bulunan, numaralı bir <strong>yapılacaklar listesi</strong> oluşturun. Sayfayı boş satırlarla bastırabilir ya da maddelerinizi yazıp listenin hazır dolu gelmesini sağlayabilirsiniz; öncelik, son tarih ve sorumlu sütunları isteğe bağlıdır.',
  button: 'Listeyi oluştur',
  inputs: [
    { id: 'baslik', label: 'Liste başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Taşınma Hazırlığı', hint: 'En fazla 40 karakter.', wide: true },
    { id: 'maddeler', label: 'Hazır yazılacak maddeler (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir iş yazın\nElektrik aboneliğini taşı\nKolileri etiketle', hint: 'Her satır bir madde; en fazla 120 madde, madde başına 50 karakter. Boş bırakırsanız liste boş satırlarla basılır.', wide: true },
    { id: 'sutun', label: 'Sütunlar', type: 'select', options: [['oncelik', 'İş + öncelik + son tarih'], ['sade', 'Yalnızca iş (sade)'], ['kisi', 'İş + sorumlu + son tarih']] },
    { id: 'satir', label: 'Sayfa başına satır', type: 'number', value: '25', hint: 'A4 için 8 ile 40, A5 için 8 ile 28 arasında.' },
    { id: 'sayfa', label: 'Sayfa sayısı', type: 'number', value: '1', hint: '1 ile 20 arasında.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
  ],
  compute(v, h) {
    const baslik = (v.baslik || '').trim() || 'Yapılacaklar Listesi';
    if (baslik.length > 40) h.err('Liste başlığı en fazla 40 karakter olabilir.');
    const maddeler = h.lines(v.maddeler);
    if (maddeler.length > 120) h.err('En fazla 120 madde yazabilirsiniz; listeyi iki parçaya bölün.');
    const uzun = maddeler.findIndex((s) => s.length > 50);
    if (uzun >= 0) h.err(`${uzun + 1}. madde 50 karakterden uzun; kısaltın ya da iki satıra bölün.`);
    const a5 = v.boyut === 'a5';
    const satir = h.posint(v.satir, 'Sayfa başına satır'), enCok = a5 ? 28 : 40;
    if (satir < 8 || satir > enCok) h.err(`Sayfa başına satır ${a5 ? 'A5' : 'A4'} kâğıt için 8 ile ${enCok} arasında olmalı.`);
    const sayfa = h.posint(v.sayfa, 'Sayfa sayısı');
    if (sayfa > 20) h.err('Sayfa sayısı en fazla 20 olabilir.');
    const toplam = satir * sayfa;
    if (maddeler.length > toplam) h.err(`${maddeler.length} madde yazdınız ama listede ${toplam} satır var. Sayfa sayısını en az ${Math.ceil(maddeler.length / satir)} yapın ya da satır sayısını artırın.`);
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const tur = v.sutun === 'sade' ? 'sade' : v.sutun === 'kisi' ? 'kisi' : 'oncelik';
    // Sağdaki ek sütunlar: [ad, genişlik]
    const ek = tur === 'oncelik' ? [['Öncelik', 17 * k], ['Son tarih', 27 * k]] : tur === 'kisi' ? [['Sorumlu', 36 * k], ['Son tarih', 27 * k]] : [];
    const noW = 9 * k, kutuW = 8 * k;
    const sayfalar = [];
    for (let s = 0; s < sayfa; s++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      ops.push(['yazi', sayfa > 1 ? `Sayfa ${s + 1} / ${sayfa}` : 'Tarih: ____ / ____ / ________', W - m, m + 7 * k, f(9), { hiza: 'sag', ton: 0.4 }]);
      ops.push(['cizgi', m, m + 10.5 * k, W - m, m + 10.5 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 14 * k, bh = 7 * k, alt = H - m, rh = (alt - ust - bh) / satir, sag = W - m;
      const ekTop = ek.reduce((a, e) => a + e[1], 0), isX = m + noW + kutuW, isSon = sag - ekTop;
      // Başlık şeridi
      ops.push(['kutu', m, ust, W - 2 * m, bh, { dolgu: 0.9, cizgi: 0.5 }]);
      ops.push(['yazi', 'No', m + noW / 2, ust + 5 * k, f(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Yapılacak iş', isX + 1.5 * k, ust + 5 * k, f(8), { kalin: true }]);
      let x = isSon;
      for (const [ad, gen] of ek) { ops.push(['yazi', ad, x + gen / 2, ust + 5 * k, f(8), { kalin: true, hiza: 'orta' }]); x += gen; }
      // Satırlar
      ops.push(['kutu', m, ust + bh, W - 2 * m, alt - ust - bh, { cizgi: 0.5 }]);
      const kb = Math.min(3.8 * k, rh * 0.6);
      for (let r = 0; r < satir; r++) {
        const y = ust + bh + r * rh, no = s * satir + r, orta = y + rh / 2;
        if (r > 0) ops.push(['cizgi', m, y, sag, y, { kalinlik: 0.2, ton: 0.65 }]);
        ops.push(['yazi', String(no + 1), m + noW / 2, orta + 1 * k, f(7.5), { hiza: 'orta', ton: 0.45 }]);
        ops.push(['kutu', m + noW + (kutuW - kb) / 2, orta - kb / 2, kb, kb, { cizgi: 0.3, kalinlik: 0.3 }]);
        if (no < maddeler.length) ops.push(['yazi', maddeler[no], isX + 1.5 * k, orta + 1.1 * k, f(9)]);
      }
      // Sütun ayırıcılar
      ops.push(['cizgi', m + noW, ust, m + noW, alt, { kalinlik: 0.2, ton: 0.65 }]);
      x = isSon;
      for (const [, gen] of ek) { ops.push(['cizgi', x, ust, x, alt, { kalinlik: 0.2, ton: 0.65 }]); x += gen; }
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${sayfa} sayfa`],
        ['Toplam satır', `${toplam} satır`],
        ['Hazır yazılan madde', maddeler.length ? `${maddeler.length} madde` : 'Yok (boş liste)'],
        ['Boş satır', `${toplam - maddeler.length} satır`],
        ['Sütunlar', tur === 'sade' ? 'No, onay kutusu, iş' : tur === 'kisi' ? 'No, onay kutusu, iş, sorumlu, son tarih' : 'No, onay kutusu, iş, öncelik, son tarih'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'yapilacaklar-listesi-olustur', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { satir: '25', sayfa: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'Toplam satır': '25 satır', 'Hazır yazılan madde': 'Yok (boş liste)', 'Boş satır': '25 satır', 'Sütunlar': 'No, onay kutusu, iş, öncelik, son tarih' }, pdfSayfa: 1 },
    { in: { baslik: 'Taşınma Hazırlığı', maddeler: 'Elektrik aboneliğini taşı\nKolileri etiketle\nNakliyeciyi ara', satir: '20', sayfa: '1', sutun: 'kisi' }, out: { 'Toplam satır': '20 satır', 'Hazır yazılan madde': '3 madde', 'Boş satır': '17 satır', 'Sütunlar': 'No, onay kutusu, iş, sorumlu, son tarih' }, pdfSayfa: 1 },
    { in: { satir: '28', sayfa: '3', boyut: 'a5', sutun: 'sade' }, out: { 'Sayfa sayısı': '3 sayfa', 'Toplam satır': '84 satır', 'Sütunlar': 'No, onay kutusu, iş', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 3 },
    { in: { maddeler: 'a\n\n  b  \nc\nd\ne\nf\ng\nh\ni', satir: '8', sayfa: '2' }, out: { 'Toplam satır': '16 satır', 'Hazır yazılan madde': '9 madde', 'Boş satır': '7 satır' }, pdfSayfa: 2 },
    { in: { satir: '40', sayfa: '20' }, out: { 'Toplam satır': '800 satır', 'Sayfa sayısı': '20 sayfa' }, pdfSayfa: 20 },
    { in: { maddeler: 'Pasaport süresini kontrol et\nSeyahat sigortası yaptır', satir: '12', boyut: 'a5', sutun: 'kisi' }, out: { 'Hazır yazılan madde': '2 madde', 'Boş satır': '10 satır' }, pdfSayfa: 1 },
    { in: { maddeler: 'a\nb\nc\nd\ne\nf\ng\nh\ni', satir: '8', sayfa: '1' }, error: true },
    { in: { satir: '30', boyut: 'a5' }, error: true },
    { in: { maddeler: 'Bu madde elli karakterlik sınırı açıkça aşan çok uzun bir iş tanımıdır', satir: '20' }, error: true },
    { in: { satir: '5' }, error: true },
  ],
  howto: [
    'İsterseniz listeye bir başlık verin: "Hafta Sonu İşleri", "Taşınma Hazırlığı", "Proje Kapanışı" gibi. Boş bırakırsanız "Yapılacaklar Listesi" yazılır.',
    'Maddeleri hazır yazdırmak istiyorsanız "Hazır yazılacak maddeler" kutusuna her satıra bir iş gelecek biçimde yazın. Boş bir şablon istiyorsanız bu kutuyu boş bırakın.',
    'Sütun düzenini seçin: kişisel listeler için öncelik ve son tarih, ekip listeleri için sorumlu ve son tarih, alışveriş ya da kontrol listesi gibi basit kullanımlar için sade düzen.',
    'Sayfa başına kaç satır ve kaç sayfa istediğinizi yazın, kâğıt boyutunu seçin.',
    '"Listeyi oluştur" düğmesine basın; önizlemeyi kontrol edip "PDF indir" ile dosyayı kaydedin ve yazdırın.',
  ],
  sections: [
    { h: 'Sayfa düzeni', p: [
      'Sayfanın üstünde liste başlığı, karşısında tek sayfalık listelerde elle doldurulacak bir tarih alanı, çok sayfalı listelerde ise "Sayfa 2 / 3" biçiminde sayfa numarası bulunur. Altındaki tablo gri bir başlık şeridiyle başlar. Her satırda soldan sağa sıra numarası, işi bitirdiğinizde işaretleyeceğiniz onay kutusu ve iş için geniş bir yazı alanı yer alır. Seçtiğiniz düzene göre sağda iki dar sütun daha olabilir.',
      'Sıra numaraları sayfalar boyunca devam eder: sayfa başına 25 satırlık üç sayfalık bir listede ikinci sayfa 26, üçüncü sayfa 51 numarayla başlar. Hazır yazdırdığınız maddeler ilk satırlardan itibaren sırayla yerleştirilir, kalan satırlar sonradan ekleyeceğiniz işler için boş kalır.',
    ] },
    { h: 'Hangi sütun düzenini seçmeli?', ul: [
      '<strong>İş + öncelik + son tarih:</strong> kişisel ve iş amaçlı genel listeler için. Öncelik sütununa A, B, C ya da 1, 2, 3 yazabilir, yıldız koyabilirsiniz. Son tarih sütunu, günü geçmemesi gereken işleri diğerlerinden ayırır.',
      '<strong>Yalnızca iş (sade):</strong> alışveriş, bavul, yolculuk öncesi kontrol, temizlik ya da açılış kapanış kontrol listesi gibi, sıranın ve tarihin önemli olmadığı listeler için. Yazı alanı en geniş bu düzendedir.',
      '<strong>İş + sorumlu + son tarih:</strong> ev halkı, sınıf, dernek ya da küçük ekipler için. Toplantı sonunda kimin neyi ne zamana kadar yapacağını yazıp herkesin göreceği bir yere asmak, işlerin sahipsiz kalmasını önler.',
    ] },
    { h: 'Satır sayısı ve satır yüksekliği', p: [
      'Satırlar sayfa yüksekliğine eşit olarak dağıtılır; satır sayısını azalttıkça her satır yükselir. A4 sayfada 25 satır seçildiğinde satır yüksekliği yaklaşık 10 mm, 40 satırda yaklaşık 6 mm olur. Büyük el yazısıyla yazanlar ya da çocuklar için 15 ile 20 satır, sık yazanlar için 30 ve üzeri uygundur. A5 kâğıtta en fazla 28 satıra izin verilir; daha fazlası satırları elle yazılamayacak kadar daraltır.',
      'Toplam satır sayısı, sayfa başına satır ile sayfa sayısının çarpımıdır. Örnek: sayfa başına 20 satır ve 1 sayfa seçip 3 madde yazdıysanız listenizde 3 dolu, 17 boş satır olur. Yazdığınız madde sayısı toplam satırı aşarsa araç, gereken en az sayfa sayısını söyleyerek uyarır; 9 maddeyi 8 satırlık tek sayfaya sığdırmak isterseniz sayfa sayısını 2 yapmanız istenir.',
    ] },
    { h: 'İşe yarayan bir liste nasıl yazılır?', ol: [
      '<strong>Fiille başlayın.</strong> "Fatura" yerine "elektrik faturasını öde" yazın. Ne yapılacağı belli olan madde ertelenmez.',
      '<strong>Tek oturuşluk parçalara bölün.</strong> "Evi taşı" bir madde değil, bir projedir. Onu "nakliyeciden fiyat al", "kolileri etiketle" gibi adımlara ayırın.',
      '<strong>Listeyi kısa tutun.</strong> Bir günde bitmeyecek kadar uzun bir liste, bitirme duygusunu elinizden alır. Günlük liste için on on beş madde çoğu zaman yeterlidir.',
      '<strong>En zor ya da en önemli işi işaretleyin.</strong> Öncelik sütunu bunun içindir; günün başında o işe başlamak listenin geri kalanını kolaylaştırır.',
      '<strong>Bitenlerin üstünü çizin ya da kutuyu işaretleyin.</strong> Gün sonunda işaretli kutuları görmek, ne kadar yol aldığınızı somut olarak gösterir.',
      '<strong>Düzenli olarak yenileyin.</strong> Karalanmış, yarısı bitmiş listeyi temiz bir sayfaya aktarmak, artık gerekmeyen işleri ayıklamanın da fırsatıdır.',
    ] },
    { h: 'Tekrar kullanılan kontrol listeleri', p: [
      'Maddeleri hazır yazdırma özelliği, aynı adımların her seferinde tekrarlandığı işler için kullanışlıdır: dükkân açılış ve kapanış kontrolü, haftalık temizlik, araçla uzun yola çıkmadan önce yapılacaklar, kamp çantası, yeni işe başlayan birine anlatılacaklar. Listeyi bir kez yazıp PDF dosyasını saklarsanız her seferinde yeniden yazdırıp kutuları işaretlemeniz yeterli olur.',
      'Sık kullanacağınız bir kontrol listesini şeffaf dosyaya koyup üzerine silinebilir kalemle işaret atmak, aynı çıktıyı defalarca kullanmanızı sağlar.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde yönü <strong>dikey</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. A5 listeleri yazıcının "sayfa başına 2 sayfa" seçeneğiyle tek A4 kâğıda çift olarak bastırıp ortadan kesebilirsiniz.',
      'Bir dosyada en fazla 20 sayfa ve 120 hazır madde bulunabilir. Her madde 50 karakterle sınırlıdır; daha uzun işler satırdan taşacağı için kabul edilmez, kısaltmanız ya da iki maddeye bölmeniz gerekir. Liste başlığı en fazla 40 karakterdir. Dosya yazdırılıp kalemle işaretlenmek üzere tasarlanmıştır; ekranda tıklanabilen onay kutuları içermez.',
    ] },
  ],
  faq: [
    ['Yapılacaklar listesini ücretsiz oluşturabilir miyim?', 'Evet. Araç ücretsizdir, kayıt istemez ve oluşturacağınız liste sayısında sınır yoktur.'],
    ['Listeyi boş mu yoksa dolu mu bastırmalıyım?', 'İkisi de mümkündür. Maddeler kutusunu boş bırakırsanız yalnızca numaralı ve onay kutulu boş satırlar basılır. Maddelerinizi yazarsanız ilk satırlara hazır yerleştirilir, kalan satırlar boş kalır.'],
    ['Bir maddeye en fazla kaç karakter yazabilirim?', 'En fazla 50 karakter. Bu sınır, yazının en dar düzende ve A5 kâğıtta bile satırdan taşmaması için konmuştur. Daha uzun işleri kısaltabilir ya da iki maddeye bölebilirsiniz.'],
    ['Maddelerim satır sayısından fazlaysa ne olur?', 'Araç dosyayı oluşturmaz ve gereken en az sayfa sayısını bildirir. Sayfa sayısını ya da sayfa başına satır sayısını artırıp yeniden deneyin.'],
    ['Öncelik sütununa ne yazılır?', 'Dilediğiniz bir işaret sistemi kullanabilirsiniz: en önemli işlere A, sonrakilere B ve C; ya da 1, 2, 3; ya da yalnızca en önemli üç işe yıldız. Önemli olan, sistemi basit tutup her listede aynı biçimde kullanmaktır.'],
    ['Aynı listeyi ekipçe kullanabilir miyiz?', 'Evet. "İş + sorumlu + son tarih" düzenini seçin, çıktıyı ortak bir panoya asın. Her işin karşısına sorumlunun adını ve teslim tarihini yazmak, takip toplantılarını da kısaltır.'],
    ['Alışveriş listesi olarak kullanılabilir mi?', 'Sade düzen alışveriş listesi olarak rahatlıkla kullanılabilir. Ürünleri reyonlara göre gruplayan, miktar sütunu olan bir düzen için alışveriş listesi oluşturma aracına da bakabilirsiniz.'],
    ['Yazdığım maddeler bir yere kaydediliyor mu?', 'Hayır. Liste tarayıcınızın içinde PDF dosyasına dönüştürülür. Yazdığınız başlık ve maddeler sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['gunluk-planlayici', 'haftalik-planlayici', 'alisveris-listesi-olustur', 'saatlik-gun-plani', 'hedef-planlayici'],
};
