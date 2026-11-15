export default {
  slug: 'guc-faktoru-hesapla',
  title: 'Güç Faktörü (Cos φ) Hesaplama',
  pageTitle: 'Güç Faktörü (Cos φ) Hesaplama – Kompanzasyon kVAR Hesabı',
  description: 'Aktif güç ile görünür ya da reaktif güçten güç faktörünü (cos φ) hesaplayın. Faz açısını, tan φ değerini ve hedef cos φ için gereken kondansatör gücünü bulun.',
  card: 'Aktif, reaktif ve görünür güçten cos φ değerini bulun; hedef güç faktörü için gereken kompanzasyon gücünü hesaplayın.',
  category: 'elektrik',
  keywords: ['güç faktörü hesaplama', 'cos fi hesaplama', 'cos φ nedir', 'kompanzasyon hesabı', 'kvar hesaplama', 'reaktif güç hesaplama', 'kondansatör gücü hesaplama'],
  lead: 'Bir tesisin ya da cihazın <strong>güç faktörünü</strong> (cos φ) aktif güç ile görünür güçten ya da aktif güç ile reaktif güçten hesaplayın. İsterseniz hedef bir güç faktörü yazın; araç bu değere ulaşmak için gereken kompanzasyon gücünü kVAR olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'aktif', label: 'Aktif güç (kW)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'yontem', label: 'İkinci bilinen değer', type: 'select', options: [['kva', 'Görünür güç (kVA)'], ['kvar', 'Reaktif güç (kVAR)']] },
    { id: 'ikinci', label: 'İkinci değer', type: 'number', placeholder: 'Örn. 100', hint: 'Yukarıda seçtiğiniz büyüklüğün değeri (kVA ya da kVAR).' },
    { id: 'hedef', label: 'Hedef cos φ (isteğe bağlı)', type: 'number', placeholder: 'Örn. 0,95', hint: 'Doldurursanız gereken kondansatör gücü hesaplanır.' },
  ],
  compute(v, h) {
    const P = h.pos(v.aktif, 'Aktif güç');
    let S, Q;
    if (v.yontem === 'kvar') {
      Q = h.nonneg(v.ikinci, 'Reaktif güç');
      S = Math.sqrt(P * P + Q * Q);
    } else {
      S = h.pos(v.ikinci, 'Görünür güç');
      if (S < P - 1e-9) h.err('Görünür güç (kVA), aktif güçten (kW) küçük olamaz. Değerleri ve birimleri kontrol edin.');
      Q = Math.sqrt(Math.max(0, S * S - P * P));
    }
    const pf = Math.min(1, P / S);
    const aci = Math.acos(pf) * 180 / Math.PI;
    const tan1 = Q / P;
    const rows = [
      ['Güç faktörü (cos φ)', h.fmt(pf, 4)],
      ['Faz açısı (φ)', h.fmt(aci, 2) + '°'],
      ['Görünür güç', h.fmt(S, 2) + ' kVA'],
      ['Reaktif güç', h.fmt(Q, 2) + ' kVAR'],
      ['tan φ', h.fmt(tan1, 4)],
    ];
    let note = 'cos φ = kW ÷ kVA. Sonuç bilgilendirme amaçlıdır; kompanzasyon panosu tasarımı için elektrik mühendisine danışın.';
    if (String(v.hedef ?? '').trim() !== '') {
      const t = h.pos(v.hedef, 'Hedef cos φ');
      if (t > 1) h.err('"Hedef cos φ" 1\'den büyük olamaz; 0,95 gibi bir değer yazın.');
      const tan2 = Math.sqrt(Math.max(0, 1 - t * t)) / t;
      const qc = Math.max(0, P * (tan1 - tan2));
      rows.push(['Gereken kompanzasyon gücü', h.fmt(qc, 2) + ' kVAR']);
      rows.push(['Kompanzasyon sonrası görünür güç', h.fmt(qc > 0 ? P / t : S, 2) + ' kVA']);
      if (qc === 0) note = 'Mevcut güç faktörü hedef değere eşit ya da ondan yüksek; ek kompanzasyon gerekmiyor. ' + note;
    }
    return { rows, note };
  },
  cases: [
    { in: { aktif: '80', yontem: 'kva', ikinci: '100' }, out: { 'Güç faktörü (cos φ)': '0,8', 'Faz açısı (φ)': '36,87°', 'Reaktif güç': '60 kVAR', 'tan φ': '0,75' } },
    { in: { aktif: '60', yontem: 'kvar', ikinci: '80' }, out: { 'Güç faktörü (cos φ)': '0,6', 'Görünür güç': '100 kVA', 'Faz açısı (φ)': '53,13°' } },
    { in: { aktif: '80', yontem: 'kva', ikinci: '100', hedef: '0,95' }, out: { 'Gereken kompanzasyon gücü': '33,71 kVAR', 'Kompanzasyon sonrası görünür güç': '84,21 kVA' } },
    { in: { aktif: '100', yontem: 'kva', ikinci: '100' }, out: { 'Güç faktörü (cos φ)': '1', 'Faz açısı (φ)': '0°', 'Reaktif güç': '0 kVAR' } },
    { in: { aktif: '45', yontem: 'kva', ikinci: '50' }, out: { 'Güç faktörü (cos φ)': '0,9', 'Faz açısı (φ)': '25,84°' } },
    { in: { aktif: '30', yontem: 'kvar', ikinci: '40', hedef: '0,5' }, out: { 'Güç faktörü (cos φ)': '0,6', 'Gereken kompanzasyon gücü': '0 kVAR', 'Kompanzasyon sonrası görünür güç': '50 kVA' } },
    { in: { aktif: '100', yontem: 'kva', ikinci: '80' }, error: true },
    { in: { aktif: '80', yontem: 'kva', ikinci: '100', hedef: '1,1' }, error: true },
    { in: { aktif: '', yontem: 'kva', ikinci: '100' }, error: true },
  ],
  howto: [
    '"Aktif güç" alanına tesisin ya da cihazın kW cinsinden gücünü yazın.',
    'İkinci olarak hangi değeri bildiğinizi seçin: görünür güç (kVA) ya da reaktif güç (kVAR). Değeri "İkinci değer" alanına girin.',
    'Kompanzasyon hesabı da istiyorsanız "Hedef cos φ" alanına ulaşmak istediğiniz güç faktörünü yazın; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın. Güç faktörü, faz açısı, görünür ve reaktif güç ile tan φ değeri listelenir; hedef verdiyseniz gereken kondansatör gücü de eklenir.',
  ],
  sections: [
    { h: 'Güç faktörü nedir?', p: [
      'Güç faktörü, şebekeden çekilen toplam gücün ne kadarının işe dönüştüğünü gösteren 0 ile 1 arasındaki orandır. Aktif gücün (kW) görünür güce (kVA) bölünmesiyle bulunur ve gerilim ile akım arasındaki faz açısının kosinüsüne eşit olduğu için cos φ olarak anılır. Değer 1\'e ne kadar yakınsa çekilen akımın o kadar büyük bölümü faydalı işte kullanılıyor demektir.',
      'Elektrik motorları, transformatörler, kaynak makineleri ve balastlı aydınlatma armatürleri manyetik alan oluşturmak için reaktif güce ihtiyaç duyar. Bu güç sayaçta aktif tüketim olarak görünmez ama hatlardan akım olarak geçer; kabloları ısıtır, gerilim düşümünü artırır ve trafonun kapasitesini meşgul eder. Bu nedenle işletmelerde güç faktörünün yüksek tutulması istenir.',
    ] },
    { h: 'Hesaplama formülleri', ul: [
      '<strong>cos φ = P ÷ S</strong> (P: aktif güç kW, S: görünür güç kVA)',
      '<strong>S = √(P² + Q²)</strong> (Q: reaktif güç kVAR)',
      '<strong>tan φ = Q ÷ P</strong>',
      '<strong>Q<sub>c</sub> = P × (tan φ<sub>1</sub> − tan φ<sub>2</sub>)</strong> (mevcut açıdan hedef açıya geçmek için gereken kondansatör gücü)',
    ], p: [
      'Son formülde φ<sub>1</sub> mevcut, φ<sub>2</sub> hedeflenen faz açısıdır. Kondansatörler, endüktif yüklerin çektiği reaktif gücü yerinde karşılar; böylece şebekeden çekilen reaktif güç azalır, aktif güç ise değişmez.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir atölye 80 kW aktif güç çekiyor ve ölçülen görünür güç 100 kVA olsun. Güç faktörü 80 ÷ 100 = 0,8, faz açısı 36,87 derece, reaktif güç √(100² − 80²) = 60 kVAR, tan φ ise 60 ÷ 80 = 0,75 bulunur.',
      'Güç faktörü 0,95\'e çıkarılmak istensin. Hedef açının tanjantı √(1 − 0,95²) ÷ 0,95 = yaklaşık 0,3287\'dir. Gereken kondansatör gücü 80 × (0,75 − 0,3287) = 33,71 kVAR olur. Kompanzasyondan sonra görünür güç 80 ÷ 0,95 = 84,21 kVA\'ya düşer; yani aynı iş için şebekeden yaklaşık yüzde 16 daha az akım çekilir.',
      'İkinci bir örnek: aktif gücü 60 kW, reaktif gücü 80 kVAR olan bir yükün görünür gücü √(60² + 80²) = 100 kVA, güç faktörü 0,6 ve faz açısı 53,13 derecedir.',
    ] },
    { h: 'Yüklere göre tipik güç faktörü aralıkları', p: ['Aşağıdaki değerler yaklaşık ve yüke, markaya, çalışma noktasına göre değişkendir; kesin değer için etiket ya da ölçüm esas alınmalıdır.'], ul: [
      '<strong>Rezistanslı ısıtıcı, fırın, akkor lamba:</strong> 1\'e çok yakın',
      '<strong>Tam yükte çalışan asenkron motor:</strong> yaklaşık 0,8 – 0,9',
      '<strong>Boşta ya da düşük yükte çalışan motor:</strong> belirgin biçimde daha düşük',
      '<strong>Kaynak makinesi, ark ocağı:</strong> düşük ve değişken',
      '<strong>Kompanze edilmemiş manyetik balastlı floresan:</strong> yaklaşık 0,5 dolayında',
    ] },
    { h: 'Düşük güç faktörünün sonuçları', p: [
      'Aynı aktif güç için güç faktörü düştükçe akım artar. Bu, kablolarda ve trafoda daha fazla ısı kaybı, daha büyük gerilim düşümü ve tesisin kapasitesinin daha çabuk dolması anlamına gelir. Türkiye\'de belirli bağlantı gücünün üzerindeki abonelerde reaktif tüketim ayrıca ölçülür ve aktif tüketime göre belirlenen oranlar aşıldığında reaktif enerji bedeli faturaya yansıtılır. Sınır oranlar ve hangi abone gruplarını kapsadığı zaman içinde değişebildiğinden güncel mevzuatı ve dağıtım şirketinizin duyurularını kontrol edin.',
      'Fazla kompanzasyon da sorundur: gereğinden büyük kondansatör bağlanırsa tesis kapasitif tarafa geçer ve bu kez kapasitif reaktif tüketim oluşur. Bu yüzden değişken yüklü tesislerde kademeli, otomatik kumandalı kompanzasyon panoları kullanılır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç, sinüs biçimli gerilim ve akımı varsayan temel güç üçgenine dayanır. Sürücüler, LED sürücüleri ve anahtarlamalı güç kaynakları gibi harmonik üreten yüklerde gerçek güç faktörü yalnızca faz kaymasından oluşmaz; bozulma bileşeni de devreye girer ve kondansatörle düzeltilemez. Ayrıca hesaplanan kVAR değeri tek bir çalışma noktası içindir.',
      'Sonuçlar ön fikir vermek içindir. Kompanzasyon panosunun kademe seçimi, harmonik filtre gereksinimi ve koruma düzeni ölçüme dayalı olarak elektrik mühendisi tarafından belirlenmelidir.',
    ] },
  ],
  faq: [
    ['Cos φ kaç olmalıdır?', 'Teknik açıdan 1\'e ne kadar yakınsa o kadar iyidir. İşletmelerde uygulamada 0,95 ve üzeri hedeflenir; reaktif bedel ödememek için gereken sınır oranlar mevzuatla belirlendiğinden güncel düzenlemeye bakılmalıdır.'],
    ['Güç faktörü 1\'den büyük olabilir mi?', 'Hayır. Aktif güç görünür güçten büyük olamayacağı için güç faktörü en fazla 1\'dir. Araçta kVA değerini kW değerinden küçük yazarsanız hata mesajı alırsınız.'],
    ['Gereken kondansatör gücü nasıl hesaplanır?', 'Aktif güç, mevcut ve hedef faz açılarının tanjantları farkıyla çarpılır. 80 kW ve cos φ = 0,8 olan bir tesisi 0,95\'e çıkarmak için yaklaşık 33,71 kVAR gerekir.'],
    ['tan φ değeri ne işe yarar?', 'Reaktif gücün aktif güce oranıdır ve reaktif tüketim sınırları çoğunlukla bu oran üzerinden tanımlanır. Ayrıca kompanzasyon formülünde doğrudan kullanılır.'],
    ['Evlerde güç faktörü önemli mi?', 'Konutlarda reaktif enerji genellikle faturalandırılmadığı için doğrudan maliyeti olmaz. Yine de düşük güç faktörlü cihazlar aynı güç için daha fazla akım çeker; bu, UPS ve jeneratör seçerken dikkate alınır.'],
    ['Aktif ve reaktif tüketimden güç faktörü bulunabilir mi?', 'Evet. Aynı dönemde ölçülen aktif enerji (kWh) ve reaktif enerji (kVARh) değerlerini kW ve kVAR yerine yazarsanız o dönemin ortalama güç faktörünü elde edersiniz, çünkü oran aynıdır.'],
    ['Hedef değeri mevcut değerden düşük yazarsam ne olur?', 'Araç gereken kompanzasyon gücünü 0 kVAR olarak gösterir ve ek kondansatöre ihtiyaç olmadığını belirtir.'],
    ['Girdiğim veriler paylaşılıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kva-kw-cevir', 'kw-amper-cevir', 'uc-faz-guc-hesapla', 'kapasitif-reaktans-hesapla', 'empedans-hesapla'],
};
