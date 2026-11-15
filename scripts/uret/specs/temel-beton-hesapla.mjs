export default {
  slug: 'temel-beton-hesapla',
  title: 'Temel Betonu Hesaplama',
  h1Tail: 'radye, sürekli, tekil',
  pageTitle: 'Temel Betonu Hesaplama – Radye, Sürekli ve Tekil Temel Kaç m³?',
  description: 'Temel ölçülerini girin; radye, sürekli ya da tekil temel için gereken beton hacmini, grobeton miktarını ve taban alanını fire payıyla metreküp olarak hesaplayın.',
  card: 'Radye, sürekli ve tekil temeller için gereken beton ve grobeton hacmini ölçülere göre metreküp olarak hesaplayın.',
  category: 'insaat',
  keywords: ['temel betonu hesaplama', 'radye temel beton hesabı', 'temel kaç m3 beton alır', 'sürekli temel beton hesabı', 'tekil temel hacmi', 'grobeton hesaplama', 'temel metraj hesabı'],
  lead: `Temelin uzunluğunu, genişliğini ve kalınlığını yazın; araç <strong>gereken beton hacmini metreküp olarak</strong> hesaplar. Tekil temellerde adet girebilir, temel altına dökülecek grobetonu da aynı hesapta görebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Temel türü', type: 'select', options: [['radye', 'Radye (plak) temel'], ['surekli', 'Sürekli (şerit) temel'], ['tekil', 'Tekil (münferit) temel']] },
    { id: 'uzunluk', label: 'Uzunluk (m)', type: 'number', placeholder: 'Örn. 12', hint: 'Sürekli temelde tüm şeritlerin toplam uzunluğu.' },
    { id: 'genislik', label: 'Genişlik (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'kalinlik', label: 'Kalınlık / yükseklik (cm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1', hint: 'Aynı ölçüdeki tekil temel sayısı.' },
    { id: 'grobeton', label: 'Grobeton kalınlığı (cm)', type: 'number', value: '0', hint: 'Yoksa 0 bırakın.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Uzunluk');
    const W = h.pos(v.genislik, 'Genişlik');
    const kal = h.pos(v.kalinlik, 'Kalınlık');
    const adet = h.posint(v.adet, 'Adet');
    const gro = h.nonneg(v.grobeton, 'Grobeton kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (kal > 500) h.err('Kalınlık santimetre olarak yazılmalı (örn. 50).');
    if (gro > 100) h.err('Grobeton kalınlığı santimetre olarak yazılmalı (örn. 10).');
    const adlar = { radye: 'Radye temel', surekli: 'Sürekli temel', tekil: 'Tekil temel' };
    const ad = adlar[v.tur];
    if (!ad) h.err('Temel türünü listeden seçin.');
    const k = 1 + fire / 100;
    const alan = L * W * adet;
    const net = alan * (kal / 100);
    const rows = [
      ['Gerekli temel betonu', h.fmt(net * k, 2) + ' m³'],
      ['Fire hariç hacim', h.fmt(net, 3) + ' m³'],
      ['Taban alanı', h.fmt(alan, 2) + ' m²'],
    ];
    if (adet > 1) rows.push(['Tek temel hacmi', h.fmt(net / adet, 3) + ' m³']);
    if (gro > 0) rows.push(['Gerekli grobeton', h.fmt(alan * (gro / 100) * k, 2) + ' m³']);
    rows.push(['Yaklaşık beton ağırlığı', h.fmt(net * k * 2.4, 2) + ' ton']);
    rows.push(['Temel türü', ad]);
    return {
      rows,
      note: 'Grobeton, temel taban alanı kadar bir yüzeye döküldüğü varsayılarak hesaplanır; taşma payı bırakılıyorsa gerçek miktar biraz daha fazladır. Ağırlık 2.400 kg/m³ üzerinden verilmiştir.',
    };
  },
  cases: [
    { in: { tur: 'radye', uzunluk: '12', genislik: '10', kalinlik: '50' }, out: { 'Gerekli temel betonu': '63 m³', 'Fire hariç hacim': '60 m³', 'Taban alanı': '120 m²', 'Yaklaşık beton ağırlığı': '151,2 ton', 'Temel türü': 'Radye temel' } },
    { in: { tur: 'surekli', uzunluk: '48', genislik: '0,6', kalinlik: '50', fire: '0' }, out: { 'Gerekli temel betonu': '14,4 m³', 'Taban alanı': '28,8 m²', 'Temel türü': 'Sürekli temel' } },
    { in: { tur: 'tekil', uzunluk: '1,5', genislik: '1,5', kalinlik: '40', adet: '12' }, out: { 'Gerekli temel betonu': '11,34 m³', 'Fire hariç hacim': '10,8 m³', 'Tek temel hacmi': '0,9 m³', 'Taban alanı': '27 m²' } },
    { in: { tur: 'radye', uzunluk: '12', genislik: '10', kalinlik: '60', grobeton: '10', fire: '0' }, out: { 'Gerekli temel betonu': '72 m³', 'Gerekli grobeton': '12 m³' } },
    { in: { tur: 'radye', uzunluk: '8', genislik: '9', kalinlik: '40', fire: '10' }, out: { 'Gerekli temel betonu': '31,68 m³', 'Fire hariç hacim': '28,8 m³' } },
    { in: { tur: 'tekil', uzunluk: '2', genislik: '2', kalinlik: '60', adet: '6', grobeton: '10' }, out: { 'Gerekli temel betonu': '15,12 m³', 'Fire hariç hacim': '14,4 m³', 'Gerekli grobeton': '2,52 m³', 'Tek temel hacmi': '2,4 m³' } },
    { in: { tur: 'radye', uzunluk: '', genislik: '10', kalinlik: '50' }, error: true },
    { in: { tur: 'radye', uzunluk: '12', genislik: '10', kalinlik: '5000' }, error: true },
    { in: { tur: 'tekil', uzunluk: '2', genislik: '2', kalinlik: '60', adet: '0' }, error: true },
  ],
  howto: [
    `Temel türünü seçin. Tür seçimi hesap yöntemini değiştirmez; alanları hangi ölçüyle dolduracağınızı hatırlatır ve sonuçta etiket olarak görünür.`,
    `Uzunluk ve genişliği metre olarak yazın. Radyede temelin dış ölçülerini, sürekli temelde şeritlerin toplam uzunluğunu ve şerit genişliğini, tekil temelde tek pabucun plan ölçülerini girin.`,
    `Temel kalınlığını (yüksekliğini) santimetre olarak yazın. Tekil temelde aynı ölçüdeki temellerin adedini de belirtin.`,
    `Temel altına grobeton dökülecekse kalınlığını yazın; dökülmeyecekse 0 bırakın. Fire payını ihtiyacınıza göre ayarlayın.`,
    `"Hesapla" düğmesine basın; gerekli temel betonu, grobeton ve taban alanı görüntülenir.`,
  ],
  sections: [
    { h: 'Temel betonu nasıl hesaplanır?', p: [
      `Temel, yapının yükünü zemine aktaran betonarme elemandır. Hangi türde olursa olsun, düz tabanlı bir temelin beton hacmi aynı basit çarpımla bulunur: <strong>hacim = uzunluk × genişlik × kalınlık</strong>. Kalınlık santimetreden metreye çevrilir ve sonuç metreküp olarak elde edilir. Birden fazla aynı temel varsa adetle çarpılır, en sonda fire payı eklenir.`,
      `Türler arasındaki fark, hangi ölçülerin girileceğindedir. <strong>Radye temel</strong> binanın tamamının altına yayılan tek bir plaktır; dış ölçüler ve plak kalınlığı yeterlidir. <strong>Sürekli (şerit) temel</strong> duvar ya da kolon aksları boyunca uzanan şeritlerden oluşur; tüm şeritlerin toplam uzunluğu, şerit genişliği ve yüksekliği girilir. <strong>Tekil (münferit) temel</strong> her kolonun altındaki ayrı pabuçtur; tek pabucun ölçüleri ve adedi girilir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Radye:</strong> 12 × 10 metre oturma alanlı, 50 cm kalınlığında bir radye temel için hacim 12 × 10 × 0,50 = 60 m³'tür. Yüzde 5 fire ile <strong>63 m³</strong> beton sipariş edilmelidir. Taban alanı 120 m²'dir.`,
      `<strong>Sürekli temel:</strong> akslar boyunca toplam 48 metre uzunluğunda, 60 cm genişliğinde ve 50 cm yüksekliğinde şeritler için 48 × 0,60 × 0,50 = 14,4 m³ beton gerekir.`,
      `<strong>Tekil temel:</strong> 1,5 × 1,5 metre plan ölçüsünde, 40 cm kalınlığında 12 pabuç için tek temel 0,9 m³, toplam 10,8 m³ eder; yüzde 5 fireyle 11,34 m³ olur.`,
    ] },
    { h: 'Grobeton nedir, neden hesaplanır?', p: [
      `Grobeton, temel kazısı tamamlandıktan sonra zemine dökülen donatısız, düşük dozlu tesviye betonudur. Temel donatısının ve kalıbının temiz, düz bir yüzeye oturmasını sağlar ve taze betonun zeminle doğrudan temasını önler. Kalınlığı projeye göre değişmekle birlikte uygulamada çoğunlukla 10 cm civarındadır.`,
      `Araç grobeton hacmini, temel taban alanı ile grobeton kalınlığını çarparak bulur. 12 × 10 metrelik radye altına 10 cm grobeton için 120 × 0,10 = 12 m³ gerekir. Uygulamada grobeton, kalıp kurulabilmesi için temel kenarlarından bir miktar dışarı taşırılır; bu taşma payını hesaba katmak isterseniz uzunluk ve genişliği taşma kadar artırıp grobetonu ayrı bir hesap olarak yapabilirsiniz.`,
    ] },
    { h: 'Sürekli temelde uzunluk nasıl ölçülür?', p: [
      `Şerit temeller köşelerde ve kesişimlerde üst üste biner. Her aksı dıştan dışa ölçüp toplarsanız kesişim bölgeleri iki kez sayılır ve beton fazla çıkar. Doğru yöntem, bir yöndeki şeritleri tam boy, diğer yöndeki şeritleri ise kesişen şeritlerin genişliği kadar kısaltarak ölçmektir. Küçük yapılarda bu fark birkaç yüzde düzeyinde kalır, ancak çok akslı planlarda belirgin hâle gelir.`,
      `Farklı genişlik ya da yükseklikte şeritler varsa her grubu ayrı hesaplayıp sonuçları toplayın. Bağ kirişleri de aynı yolla, sürekli temel seçeneğiyle hesaplanabilir.`,
    ] },
    { h: 'Fire payı ve sipariş', p: [
      `Temel betonunda kayıplar; kazı tabanındaki düzgünsüzlüklerden, kalıp açılmalarından, pompa ve transmikserde kalan betondan kaynaklanır. Grobeton dökülmüş düzgün bir tabanda yüzde 3–5 fire çoğu zaman yeterlidir. Doğrudan zemine dökülen ya da kazı yüzeyi kalıp olarak kullanılan temellerde kayıp daha yüksek olur; bu durumda payı artırın.`,
      `Hazır beton genellikle transmikserlerle teslim edilir ve sipariş yarım ya da tam metreküplere yuvarlanır. Çıkan sonucu, tedarikçinizin teslim birimine göre yukarı yuvarlamanız pratik olur.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Kalınlığı metre yerine santimetre, ya da tam tersi girmek: kalınlık alanı santimetredir; 50 cm için 50 yazılır.`,
      `Radyede konsol çıkmalarını unutmak: radye çoğu zaman bina oturma alanından dışarı taşar; ölçüleri temel planından alın.`,
      `Sürekli temelde kesişimleri iki kez saymak: yukarıda anlatıldığı gibi bir yöndeki şeritleri kısaltarak ölçün.`,
      `Kirişli radyede yalnızca plağı hesaplamak: plak üstünde ya da altında kirişler varsa onların hacmini sürekli temel seçeneğiyle ayrıca hesaplayıp ekleyin.`,
      `Asansör kuyusu ve çukur temelleri atlamak: bunlar ayrı birer kalem olarak hesaplanmalıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç, düz tabanlı ve sabit kalınlıklı temeller için <strong>yalnızca beton miktarını</strong> hesaplar. Kademeli ya da eğimli (trapez kesitli) pabuçlarda sonuç yaklaşık olur. Temel türü, boyutları, beton sınıfı ve donatısı; zemin etüdü ve statik projeye dayanılarak yetkili inşaat ve jeoloji mühendislerince belirlenir. Bu sayfadaki sonuçlar keşif ve sipariş tahmini içindir, tasarım kararı için kullanılmamalıdır.`,
    ] },
  ],
  faq: [
    ['100 m² radye temel kaç metreküp beton alır?', `Kalınlığa bağlıdır. 100 m² taban alanında 40 cm kalınlık için 40 m³, 50 cm için 50 m³, 60 cm için 60 m³ beton gerekir. Üzerine fire payını ekleyin.`],
    ['Radye temel kalınlığı kaç santimetre olmalı?', `Bunu araç belirleyemez. Radye kalınlığı kat sayısına, zemin özelliklerine ve yapısal hesaba bağlıdır ve statik projede verilir. Araca projedeki kalınlığı yazmalısınız.`],
    ['Grobeton hesabı nasıl yapılıyor?', `Temel taban alanı grobeton kalınlığıyla çarpılır ve aynı fire payı uygulanır. 120 m² alana 10 cm grobeton, firesiz 12 m³ eder. Grobetonu temelden dışarı taşırıyorsanız taşmalı ölçülerle ayrı bir hesap yapın.`],
    ['Sürekli temelde hangi uzunluğu yazmalıyım?', `Tüm şeritlerin toplam uzunluğunu yazın. Köşe ve kesişimlerde aynı hacmi iki kez saymamak için bir yöndeki şeritleri tam boy, diğer yöndekileri kesişen şeritlerin genişliği kadar kısa ölçün.`],
    ['Fire payını kaç almalıyım?', `Grobeton üzerine kalıplı dökümlerde yüzde 3–5 yaygındır. Zemine doğrudan dökümde ya da kazı kenarlarının kalıp olarak kullanıldığı durumlarda yüzde 10'a kadar çıkmak gerekebilir.`],
    ['Temel betonu kaç ton gelir?', `Taze beton yaklaşık 2,4 ton/m³ ağırlığındadır. 63 m³ temel betonu yaklaşık 151 ton eder. Araç bu değeri "Yaklaşık beton ağırlığı" satırında gösterir.`],
    ['Kirişli radye temeli nasıl hesaplarım?', `Önce plağı radye olarak hesaplayın. Ardından kirişleri, plak dışında kalan yüksekliklerini kalınlık olarak alıp sürekli temel seçeneğiyle hesaplayın ve iki sonucu toplayın.`],
    ['Yazdığım ölçüler saklanıyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; proje ölçüleriniz hiçbir sunucuya gönderilmez. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['beton-hesapla', 'kolon-beton-hesapla', 'kalip-alani-hesapla', 'hafriyat-hesapla', 'insaat-demiri-agirligi-hesapla', 'cimento-hesapla'],
};
