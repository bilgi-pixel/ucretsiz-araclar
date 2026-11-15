export default {
  slug: 'tiklama-orani-hesapla',
  title: 'Tıklama Oranı (CTR) Hesaplama',
  h1Tail: 'gösterim ve tıklamadan',
  pageTitle: 'Tıklama Oranı (CTR) Hesaplama – Reklam ve Arama Sonucu TO Formülü',
  description: 'Gösterim ve tıklama sayısından tıklama oranını (CTR) hesaplayın; harcama girerek tıklama başı maliyeti ve bin gösterim maliyetini de aynı anda görün.',
  card: 'Gösterim ve tıklama sayısından CTR değerini bulun; harcama ekleyerek tıklama başı ve bin gösterim maliyetini görün.',
  category: 'finans',
  keywords: ['tıklama oranı hesaplama', 'CTR hesaplama', 'CTR nedir', 'tıklama oranı formülü', 'TO hesaplama', 'reklam tıklama oranı', 'click through rate', 'e-posta tıklama oranı'],
  lead: 'Bir reklamın, arama sonucunun ya da e-postanın kaç kez görüntülendiğini ve kaç kez tıklandığını yazın; araç görenlerin yüzde kaçının tıkladığını, yani <strong>tıklama oranını (CTR)</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'gosterim', label: 'Gösterim sayısı', type: 'number', placeholder: 'Örn. 20000' },
    { id: 'tiklama', label: 'Tıklama sayısı', type: 'number', placeholder: 'Örn. 500' },
    { id: 'harcama', label: 'Toplam harcama (TL)', type: 'number', placeholder: 'Örn. 1000', hint: 'İsteğe bağlı; tıklama başı ve bin gösterim maliyeti için.' },
    { id: 'hedef', label: 'Hedef tıklama oranı (%)', type: 'number', placeholder: 'Örn. 3', hint: 'İsteğe bağlı.' },
  ],
  compute(v, h) {
    const g = h.posint(v.gosterim, 'Gösterim sayısı');
    const t = h.int(v.tiklama, 'Tıklama sayısı');
    if (t < 0) h.err('"Tıklama sayısı" negatif olamaz.');
    if (t > g) h.err('Tıklama sayısı gösterim sayısından büyük olamaz; iki değerin aynı rapora ve aynı döneme ait olduğunu kontrol edin.');
    const ctr = (t / g) * 100;
    const rows = [
      ['Tıklama oranı (CTR)', '%' + h.fmt(ctr, 2)],
      ['Tıklama sıklığı', t > 0 ? 'Her ' + h.fmt(g / t, 2) + ' gösterimde 1' : '—'],
      ['1.000 gösterimde tıklama', h.fmt((t / g) * 1000, 1)],
      ['Tıklanmayan gösterim', h.fmt(g - t, 0)],
    ];
    if (String(v.harcama ?? '').trim() !== '') {
      const p = h.nonneg(v.harcama, 'Toplam harcama');
      rows.push(['Tıklama başı maliyet (CPC)', t > 0 ? h.para(p / t) : '—']);
      rows.push(['Bin gösterim maliyeti (CPM)', h.para((p / g) * 1000)]);
    }
    if (String(v.hedef ?? '').trim() !== '') {
      const hedef = h.pos(v.hedef, 'Hedef tıklama oranı');
      if (hedef > 100) h.err('"Hedef tıklama oranı" en fazla 100 olabilir.');
      const gerek = Math.ceil((g * hedef) / 100 - 1e-9);
      const ek = Math.max(0, gerek - t);
      rows.push(['Hedef için gereken tıklama', h.fmt(gerek, 0)]);
      rows.push(['Gereken ek tıklama', ek > 0 ? h.fmt(ek, 0) : '0 (hedefe ulaşılmış)']);
    }
    return {
      rows,
      note: 'CTR = tıklama sayısı ÷ gösterim sayısı × 100. Oranlar yerleşime, hedeflemeye ve reklam biçimine göre büyük farklılık gösterir.',
    };
  },
  cases: [
    { in: { gosterim: '20000', tiklama: '500' }, out: { 'Tıklama oranı (CTR)': '%2,5', 'Tıklama sıklığı': 'Her 40 gösterimde 1', '1.000 gösterimde tıklama': '25', 'Tıklanmayan gösterim': '19.500' } },
    { in: { gosterim: '20000', tiklama: '500', harcama: '1000' }, out: { 'Tıklama oranı (CTR)': '%2,5', 'Tıklama başı maliyet (CPC)': '2,00 TL', 'Bin gösterim maliyeti (CPM)': '50,00 TL' } },
    { in: { gosterim: '150000', tiklama: '450' }, out: { 'Tıklama oranı (CTR)': '%0,3', 'Tıklama sıklığı': 'Her 333,33 gösterimde 1', '1.000 gösterimde tıklama': '3' } },
    { in: { gosterim: '80000', tiklama: '1200', hedef: '2' }, out: { 'Tıklama oranı (CTR)': '%1,5', 'Hedef için gereken tıklama': '1.600', 'Gereken ek tıklama': '400' } },
    { in: { gosterim: '12000', tiklama: '0', harcama: '300' }, out: { 'Tıklama oranı (CTR)': '%0', 'Tıklama sıklığı': '—', 'Tıklama başı maliyet (CPC)': '—', 'Bin gösterim maliyeti (CPM)': '25,00 TL' } },
    { in: { gosterim: '1000', tiklama: '37', hedef: '3' }, out: { 'Tıklama oranı (CTR)': '%3,7', 'Hedef için gereken tıklama': '30', 'Gereken ek tıklama': '0 (hedefe ulaşılmış)' } },
    { in: { gosterim: '3', tiklama: '1' }, out: { 'Tıklama oranı (CTR)': '%33,33', 'Tıklama sıklığı': 'Her 3 gösterimde 1' } },
    { in: { gosterim: '500', tiklama: '900' }, error: true },
    { in: { gosterim: '0', tiklama: '0' }, error: true },
    { in: { gosterim: 'çok', tiklama: '10' }, error: true },
  ],
  howto: [
    'Reklam panelinizden, arama performansı raporunuzdan ya da e-posta gönderim raporunuzdan ilgili dönemin gösterim sayısını alıp ilk alana yazın.',
    'Aynı rapordaki tıklama sayısını ikinci alana girin.',
    'Maliyet ölçülerini de görmek isterseniz o dönemdeki toplam harcamayı, bir hedefiniz varsa ulaşmak istediğiniz tıklama oranını ekleyin.',
    '"Hesapla" düğmesine basın. Sonuçta tıklama oranı, kaç gösterimde bir tıklama aldığınız ve girdiyseniz tıklama başı maliyet ile bin gösterim maliyeti yer alır.',
  ],
  sections: [
    { h: 'Tıklama oranı (CTR) nedir?', p: [
      'Tıklama oranı, İngilizce "click-through rate" ifadesinin kısaltmasıyla CTR, Türkçe panellerde ise çoğunlukla TO olarak geçen ölçüdür. Bir reklamı, arama sonucunu, e-postadaki bağlantıyı ya da bir düğmeyi gören kişilerin yüzde kaçının ona tıkladığını gösterir. Mesajınızın, onu gören kitleye ne kadar ilgi çekici ve alakalı geldiğinin en hızlı göstergesidir.',
      'Oran iki sayıya dayanır. <strong>Gösterim</strong>, içeriğin bir ekranda görüntülenme sayısıdır; aynı kişi reklamı beş kez görürse beş gösterim sayılır. <strong>Tıklama</strong> ise kullanıcının içeriğe dokunup hedef sayfaya yönelmesidir.',
    ] },
    { h: 'CTR formülü', p: [
      '<strong>CTR (%) = tıklama sayısı ÷ gösterim sayısı × 100</strong>',
      'Formül tersinden de kullanılır: beklenen tıklama sayısı = gösterim × CTR ÷ 100. Örneğin %2 tıklama oranı beklediğiniz bir kampanyada 50.000 gösterim yaklaşık 1.000 tıklama getirir. Bütçe planlarken bu ilişki, satın alınacak gösterim miktarından siteye kaç ziyaretçi geleceğini tahmin etmeye yarar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir kampanya 20.000 kez gösterilmiş ve 500 tıklama almış olsun. CTR = 500 ÷ 20.000 × 100 = <strong>%2,5</strong>. Yani reklam ortalama her 40 gösterimde bir kez tıklanmış, 1.000 gösterim başına 25 tıklama gelmiştir.',
      'Kampanyaya 1.000 TL harcandıysa tıklama başı maliyet 1.000 ÷ 500 = <strong>2,00 TL</strong>, bin gösterim maliyeti 1.000 ÷ 20.000 × 1.000 = <strong>50,00 TL</strong> olur. Bu üç ölçü birbirine bağlıdır: tıklama başı maliyet = bin gösterim maliyeti ÷ (10 × CTR). Örnekte 50 ÷ (10 × 2,5) = 2 TL. Buradan önemli bir sonuç çıkar: gösterim başına ödeme yaptığınız bir kampanyada tıklama oranını iki katına çıkarmak, tıklama başına maliyetinizi yarıya indirir.',
    ] },
    { h: 'CTR nerelerde kullanılır?', ul: [
      '<strong>Arama ağı reklamları:</strong> Kullanıcı tam o ürünü ya da hizmeti aradığı için tıklama oranları görece yüksektir. Reklam metninin arama terimiyle uyumu belirleyicidir.',
      '<strong>Görüntülü ve sosyal medya reklamları:</strong> Kullanıcı başka bir içerikle ilgilenirken karşısına çıktığından oranlar çok daha düşüktür; görselin dikkat çekmesi ve hedef kitlenin doğru seçilmesi öne çıkar.',
      '<strong>Organik arama sonuçları:</strong> Arama performansı raporlarındaki gösterim ve tıklama sayılarından hesaplanır. Sıralama yükseldikçe oran belirgin biçimde artar; başlık ve açıklama metni de etkilidir.',
      '<strong>E-posta pazarlaması:</strong> Tıklama oranı genellikle teslim edilen e-posta sayısına göre hesaplanır. E-postayı açanlara göre hesaplanan "açılanlar içinde tıklama oranı" ayrı bir ölçüdür ve içeriğin kalitesini gösterir.',
      '<strong>Site içi öğeler:</strong> Bir afişin, düğmenin ya da öneri kutusunun kaç görüntülemede kaç tıklama aldığı, tasarım kararlarını sınamak için kullanılır.',
    ] },
    { h: 'Yüksek CTR her zaman iyi midir?', p: [
      'Tıklama oranı bir ara ölçüdür; asıl hedef satış, başvuru ya da kayıt gibi sonuçlardır. Abartılı ya da yanıltıcı bir başlık tıklama oranını yükseltir, fakat gelen ziyaretçi aradığını bulamayıp hemen ayrılır. Tıklama başına ödeme yapılan bir kampanyada bu, boşa giden bütçe demektir. Bu nedenle CTR her zaman dönüşüm oranı ve dönüşüm başı maliyetle birlikte okunmalıdır: düşük tıklama oranına rağmen gelenlerin büyük kısmını müşteriye çeviren bir reklam, çok tıklanan ama satış getirmeyen bir reklamdan daha değerlidir.',
      'Öte yandan çok düşük tıklama oranı da bir sinyaldir. Reklamın yanlış kitleye gösterildiğine, mesajın ilgi çekmediğine ya da aynı kişilere fazla sık gösterilip görmezden gelinmeye başlandığına işaret edebilir.',
    ] },
    { h: 'Tıklama oranını artırmak için', ul: [
      'Başlıkta kullanıcının aradığı ifadeyi ve somut bir faydayı öne çıkarın; genel sloganlar yerine fiyat, süre, teslimat gibi net bilgiler verin.',
      'Hedef kitleyi daraltın. Herkese gösterilen reklam yerine, ürünle gerçekten ilgilenme olasılığı yüksek kitleye gösterilen reklam daha çok tıklanır.',
      'Alakasız aramaları ve yerleşimleri dışlayın; ilgisiz gösterimler paydayı büyütüp oranı düşürür.',
      'Farklı başlık ve görselleri aynı anda yayına alıp yeterli gösterim biriktikten sonra karşılaştırın.',
      'Görüntülü reklamlarda gösterim sıklığını sınırlayın; aynı kişinin onuncu kez gördüğü reklamın tıklanma olasılığı düşer.',
      'E-postada konu satırı açılmayı, e-postanın içindeki tek ve belirgin çağrı düğmesi ise tıklamayı belirler; çok sayıda bağlantı dikkati dağıtır.',
    ] },
    { h: 'Sınırlar', p: [
      'Sektör ortalamaları olarak dolaşan rakamlar platforma, ülkeye, reklam biçimine ve yıla göre çok değiştiği için bu sayfada sabit bir "iyi CTR" değeri verilmemiştir; en sağlıklı kıyas kendi geçmiş kampanyalarınızla yapılan kıyastır. Birkaç yüz gösterimle hesaplanan oranlar rastlantıya açıktır; karar vermeden önce yeterli veri biriktirin. Otomatik yazılımlardan gelen geçersiz tıklamalar ve yanlışlıkla yapılan dokunuşlar da oranı olduğundan yüksek gösterebilir. Sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['CTR nasıl hesaplanır?', 'Tıklama sayısı gösterim sayısına bölünür ve 100 ile çarpılır. 20.000 gösterimde 500 tıklama alındıysa CTR 500 ÷ 20.000 × 100 = %2,5\'tir.'],
    ['CTR ile TO aynı şey mi?', 'Evet. TO, tıklama oranının Türkçe kısaltmasıdır ve reklam panellerinin Türkçe arayüzlerinde bu adla görünür. CTR ise aynı ölçünün İngilizce kısaltmasıdır.'],
    ['İyi bir tıklama oranı kaçtır?', 'Tek bir sayı vermek doğru olmaz. Arama reklamlarında oranlar yüzde birkaç düzeyinde seyrederken görüntülü reklamlarda yüzde birin altında kalması olağandır. En doğru ölçüt, aynı kanal ve biçimdeki kendi geçmiş sonuçlarınızdır.'],
    ['Gösterim ile erişim arasındaki fark nedir?', 'Gösterim, içeriğin toplam görüntülenme sayısıdır. Erişim ise içeriği en az bir kez gören tekil kişi sayısıdır. Bir kişi reklamı üç kez gördüyse 3 gösterim, 1 erişim sayılır. CTR gösterim üzerinden hesaplanır.'],
    ['Tıklama oranı tıklama başı maliyeti etkiler mi?', 'Evet. Gösterim başına ödeme yapılan kampanyalarda oran arttıkça aynı bütçeyle daha çok tıklama alınır ve tıklama başı maliyet düşer. Açık artırmalı reklam sistemlerinde de yüksek tıklama oranı reklamın alaka düzeyinin göstergesi sayıldığından maliyeti olumlu etkileyebilir.'],
    ['Tıklama sayısı gösterimden fazla çıkabilir mi?', 'Hayır; bir tıklamanın olabilmesi için önce bir gösterim gerekir. Böyle bir durumla karşılaşıyorsanız sayılar farklı dönemlere ya da farklı raporlara ait olabilir.'],
    ['E-posta için tıklama oranını nasıl hesaplarım?', 'Gösterim alanına teslim edilen e-posta sayısını, tıklama alanına e-postadaki bağlantılara tıklayan tekil kişi sayısını yazın. Açılanlar içindeki tıklama oranını bulmak için gösterim yerine açılan e-posta sayısını girin.'],
    ['Kampanya verilerim kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; gösterim, tıklama ve harcama bilgileri sunucuya gönderilmez.'],
  ],
  related: ['donusum-orani-hesapla', 'bin-gosterim-maliyeti-hesapla', 'tiklama-basi-maliyet-hesapla', 'reklam-getirisi-hesapla', 'etkilesim-orani-hesapla'],
};
