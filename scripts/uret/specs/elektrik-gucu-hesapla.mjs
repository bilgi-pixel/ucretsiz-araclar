export default {
  slug: 'elektrik-gucu-hesapla',
  title: 'Elektrik Gücü (Watt) Hesaplama',
  h1Tail: 'P = V × I × cos φ',
  pageTitle: 'Elektrik Gücü Hesaplama – Volt ve Amperden Watt, kW ve kWh',
  description: 'Gerilim ve akımdan elektrik gücünü watt olarak hesaplayın. DC, tek faz ve üç faz AC için aktif, görünür ve reaktif gücü, isteğe bağlı olarak kWh tüketimini verir.',
  card: 'Volt ve amperden watt hesabı: DC, tek faz ve üç faz için aktif, görünür ve reaktif güç ile günlük-aylık kWh tüketimi.',
  category: 'elektrik',
  keywords: ['elektrik gücü hesaplama', 'watt hesaplama', 'volt amper watt', 'güç formülü', 'üç faz güç hesaplama', 'kaç watt çeker', 'kWh hesaplama', 'aktif güç görünür güç'],
  lead: 'Gerilim ve akımı yazarak bir cihazın ya da devrenin <strong>elektrik gücünü watt</strong> olarak hesaplayın. Doğru akım, tek fazlı ve üç fazlı alternatif akım desteklenir; günlük kullanım süresini eklerseniz enerji tüketimini kWh olarak da görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'sistem', label: 'Sistem türü', type: 'select', options: [['tek', 'AC tek faz'], ['uc', 'AC üç faz'], ['dc', 'DC (doğru akım)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', placeholder: 'Örn. 220', hint: 'Üç fazda fazlar arası (hat) gerilimini yazın, örn. 380 ya da 400.' },
    { id: 'akim', label: 'Akım (A)', type: 'number', placeholder: 'Örn. 10', hint: 'Üç fazda bir fazdan geçen hat akımı.' },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '1', hint: '0 ile 1 arasında. Isıtıcı gibi omik yüklerde 1; motorlarda etiket değerini kullanın. DC\'de dikkate alınmaz.' },
    { id: 'saat', label: 'Günlük çalışma süresi (saat, isteğe bağlı)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'fiyat', label: 'Birim fiyat (TL/kWh, isteğe bağlı)', type: 'number', hint: 'Faturanızdaki vergiler dahil birim fiyatı yazın; binlik ayraç kullanmayın.' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const V = h.pos(v.gerilim, 'Gerilim');
    const I = h.pos(v.akim, 'Akım');
    const dc = v.sistem === 'dc';
    const uc = v.sistem === 'uc';
    let pf = 1;
    if (!dc) {
      pf = h.opt(v.cosfi, 1, 'Güç faktörü');
      if (!(pf > 0) || pf > 1) h.err('"Güç faktörü" 0\'dan büyük ve en çok 1 olmalı (örn. 0,85).');
    }
    const S = (uc ? Math.sqrt(3) : 1) * V * I;
    const P = S * pf;
    const rows = [
      ['Aktif güç', h.fmt(P, 2) + ' W'],
      ['Aktif güç (kW)', h.fmt(P / 1000, 4) + ' kW'],
    ];
    if (!dc) {
      const Q = S * Math.sqrt(Math.max(0, 1 - pf * pf));
      rows.push(['Görünür güç', h.fmt(S, 2) + ' VA']);
      rows.push(['Reaktif güç', h.fmt(Q, 2) + ' VAR']);
    }
    if (!bos(v.saat)) {
      const saat = h.pos(v.saat, 'Günlük çalışma süresi');
      if (saat > 24) h.err('"Günlük çalışma süresi" 24 saatten fazla olamaz.');
      const gun = P / 1000 * saat;
      rows.push(['Günlük tüketim', h.fmt(gun, 3) + ' kWh']);
      rows.push(['Aylık tüketim (30 gün)', h.fmt(gun * 30, 2) + ' kWh']);
      if (!bos(v.fiyat)) {
        const f = h.nonneg(v.fiyat, 'Birim fiyat');
        rows.push(['Aylık maliyet (30 gün)', h.para(gun * 30 * f)]);
      }
    } else if (!bos(v.fiyat)) h.err('Maliyet hesabı için "Günlük çalışma süresi" alanını da doldurun.');
    return {
      rows,
      note: dc ? 'Doğru akımda P = V × I.' : uc ? 'Dengeli üç fazlı yük için P = √3 × V(hat) × I(hat) × cos φ.' : 'Tek fazlı alternatif akımda P = V × I × cos φ.',
    };
  },
  cases: [
    { in: { sistem: 'tek', gerilim: '220', akim: '10', cosfi: '1' }, out: { 'Aktif güç': '2.200 W', 'Aktif güç (kW)': '2,2 kW', 'Görünür güç': '2.200 VA', 'Reaktif güç': '0 VAR' } },
    { in: { sistem: 'uc', gerilim: '380', akim: '10', cosfi: '0,8' }, out: { 'Aktif güç': '5.265,43 W', 'Aktif güç (kW)': '5,2654 kW', 'Görünür güç': '6.581,79 VA', 'Reaktif güç': '3.949,08 VAR' } },
    { in: { sistem: 'dc', gerilim: '12', akim: '5' }, out: { 'Aktif güç': '60 W', 'Aktif güç (kW)': '0,06 kW' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '8', cosfi: '0,9', saat: '5', fiyat: '3' }, out: { 'Aktif güç': '1.656 W', 'Görünür güç': '1.840 VA', 'Günlük tüketim': '8,28 kWh', 'Aylık tüketim (30 gün)': '248,4 kWh', 'Aylık maliyet (30 gün)': '745,20 TL' } },
    { in: { sistem: 'dc', gerilim: '5', akim: '2', saat: '24' }, out: { 'Aktif güç': '10 W', 'Günlük tüketim': '0,24 kWh', 'Aylık tüketim (30 gün)': '7,2 kWh' } },
    { in: { sistem: 'tek', gerilim: '220', akim: '0,5', cosfi: '0,6' }, out: { 'Aktif güç': '66 W', 'Görünür güç': '110 VA', 'Reaktif güç': '88 VAR' } },
    { in: { sistem: 'tek', gerilim: '220', akim: '10', cosfi: '1,2' }, error: true },
    { in: { sistem: 'tek', gerilim: '', akim: '10', cosfi: '1' }, error: true },
    { in: { sistem: 'dc', gerilim: '12', akim: '5', saat: '30' }, error: true },
  ],
  howto: [
    '"Sistem türü" listesinden devrenizi seçin: ev prizleri için AC tek faz, sanayi tipi motor ve panolar için AC üç faz, akü, adaptör çıkışı ve güneş paneli gibi kaynaklar için DC.',
    'Gerilimi volt, akımı amper olarak yazın. Üç fazda fazlar arası gerilimi ve tek bir faz iletkeninden geçen akımı kullanın.',
    'Alternatif akımda yükün güç faktörünü girin. Bilmiyorsanız ve yük ısıtıcı ya da akkor lamba gibi omik bir yükse 1 olarak bırakın.',
    'Enerji tüketimini de görmek isterseniz günlük çalışma süresini saat olarak, maliyet için faturanızdaki birim fiyatı ekleyin.',
    '"Hesapla" düğmesine basın. İlk satır watt cinsinden aktif güçtür; altında kW, görünür ve reaktif güç ile tüketim satırları yer alır.',
  ],
  sections: [
    { h: 'Elektrik gücü nedir, watt neyi ölçer?', p: [
      'Elektrik gücü, bir devrede birim zamanda harcanan ya da dönüştürülen elektrik enerjisidir. Birimi watt (W) olup bir watt, saniyede bir joule enerji demektir. Bir cihazın etiketindeki watt değeri, o cihazın çalışırken şebekeden ne hızla enerji çektiğini gösterir; 2.000 W\'lık bir ısıtıcı, 1.000 W\'lık bir ısıtıcının iki katı hızla enerji tüketir.',
      'Güç ile enerji sık karıştırılır. Güç anlık bir hızdır (W, kW); enerji ise bu hızın süreyle çarpımıdır (Wh, kWh). Elektrik faturaları güce göre değil, tüketilen enerjiye, yani kilovatsaate göre düzenlenir.',
    ] },
    { h: 'Güç formülleri', ul: [
      '<strong>Doğru akım (DC):</strong> P = V × I',
      '<strong>Tek fazlı alternatif akım:</strong> P = V × I × cos φ',
      '<strong>Üç fazlı alternatif akım (dengeli yük):</strong> P = √3 × V<sub>hat</sub> × I<sub>hat</sub> × cos φ',
    ], p: [
      'Burada V volt cinsinden gerilim, I amper cinsinden akım, cos φ ise güç faktörüdür. √3 yaklaşık 1,732\'dir ve üç fazlı sistemde fazlar arası gerilim ile faz-nötr gerilimi arasındaki orandan gelir. Üç faz formülünde hat (fazlar arası) gerilimi kullanılır; faz-nötr gerilimiyle çalışacaksanız aynı güç 3 × V<sub>faz</sub> × I × cos φ olarak da yazılabilir.',
    ] },
    { h: 'Aktif, görünür ve reaktif güç', p: [
      'Alternatif akımda üç ayrı güç kavramı vardır. <strong>Görünür güç</strong> (S, birimi VA) gerilim ile akımın doğrudan çarpımıdır ve kabloların, sigortaların, trafoların taşıması gereken yükü belirler. <strong>Aktif güç</strong> (P, birimi W) gerçekten işe, ısıya ya da ışığa dönüşen kısımdır; sayaç bunu ölçer. <strong>Reaktif güç</strong> (Q, birimi VAR) ise motor sargıları ve kondansatörler gibi elemanların manyetik ve elektrik alanlarında gidip gelen, işe dönüşmeyen kısımdır.',
      'Üçü arasındaki ilişki bir dik üçgenle gösterilir: S² = P² + Q². Güç faktörü, aktif gücün görünür güce oranıdır (cos φ = P ÷ S). Omik yüklerde 1\'dir; motorlarda, floresan balastlarında ve bazı güç kaynaklarında 1\'in altına düşer. Güç faktörü düştükçe aynı işi yapmak için şebekeden daha fazla akım çekilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Tek faz:</strong> 220 volt altında 10 amper çeken omik bir ısıtıcının gücü 220 × 10 × 1 = <strong>2.200 W</strong>, yani 2,2 kW\'tır. Güç faktörü 1 olduğundan görünür güç de 2.200 VA, reaktif güç sıfırdır.',
      '<strong>Üç faz:</strong> 380 volt hat gerilimli şebekede her fazdan 10 amper çeken, güç faktörü 0,8 olan bir motorun görünür gücü 1,732 × 380 × 10 = 6.581,79 VA\'dır. Aktif güç 6.581,79 × 0,8 = <strong>5.265,43 W</strong>, reaktif güç 6.581,79 × 0,6 = 3.949,08 VAR bulunur (cos φ = 0,8 iken sin φ = 0,6).',
      '<strong>Doğru akım:</strong> 12 voltluk aküden 5 amper çeken bir cihaz 12 × 5 = <strong>60 W</strong> harcar.',
      '<strong>Tüketim:</strong> 230 volt, 8 amper ve 0,9 güç faktörüyle çalışan bir cihazın aktif gücü 230 × 8 × 0,9 = 1.656 W\'tır. Günde 5 saat çalışırsa günlük 1,656 × 5 = 8,28 kWh, 30 günde 248,4 kWh enerji tüketir. Birim fiyat örnek olarak 3 TL/kWh alınırsa aylık maliyet 745,20 TL olur. Gerçek birim fiyat tarifeye ve tüketim kademesine göre değişir; hesap için kendi faturanızdaki değeri kullanın.',
    ] },
    { h: 'Akım ve gerilim değerini nereden bulurum?', ul: [
      'Cihazın arkasındaki ya da altındaki <strong>etiket</strong> çoğunlukla anma gerilimini ve akımını ya da doğrudan gücünü verir.',
      'Adaptörlerde "Çıkış: 5 V 2 A" gibi ifadeler DC çıkış değerleridir; çarpımı adaptörün verebileceği en yüksek gücü gösterir.',
      'Çalışan bir devrede akım <strong>pens ampermetre</strong> ile iletken kesilmeden ölçülebilir.',
      'Etiketteki değerler çoğu zaman en yüksek ya da anma değerleridir; buzdolabı ve klima gibi aralıklı çalışan cihazların ortalama tüketimi daha düşüktür.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarı', ul: [
      'Motorlu yüklerde güç faktörünü 1 almak. Bu durumda bulunan değer aktif güç değil görünür güçtür.',
      'Üç faz hesabında faz-nötr gerilimini (220-230 V) √3 formülüne koymak. Formül hat gerilimiyle (380-400 V) çalışır.',
      'Watt ile kilovatsaati karıştırmak. Watt gücü, kilovatsaat ise tüketilen enerjiyi gösterir.',
      'Motor etiketindeki gücü şebekeden çekilen güç sanmak. Motor etiketleri genellikle mil (çıkış) gücünü verir; çekilen elektrik gücü verim nedeniyle daha yüksektir.',
    ], p: [
      'Bu sayfadaki sonuçlar bilgilendirme amaçlıdır ve dengeli, sinüs biçimli yükler için geçerlidir. Kablo kesiti, sigorta ve şalter seçimi gibi kararlar yalnızca güç hesabına dayandırılmamalı; yürürlükteki yönetmeliklere göre yetkili bir elektrik mühendisi ya da elektrikçi tarafından verilmelidir.',
    ] },
  ],
  faq: [
    ['Watt nasıl hesaplanır?', 'Doğru akımda gerilim ile akım çarpılır (P = V × I). Tek fazlı alternatif akımda bu çarpım güç faktörüyle, üç fazlı sistemde ayrıca √3 ile çarpılır.'],
    ['220 voltta 10 amper kaç watt eder?', 'Güç faktörü 1 olan omik bir yük için 220 × 10 = 2.200 watt, yani 2,2 kilowatt eder. Güç faktörü 0,8 olan bir yükte aktif güç 1.760 watt olur.'],
    ['Güç faktörü (cos φ) nedir, bilmiyorsam ne yazmalıyım?', 'Aktif gücün görünür güce oranıdır ve 0 ile 1 arasında değer alır. Isıtıcı, fırın, akkor lamba gibi yüklerde 1 alınır. Motorlarda etiketin üzerinde yazar; yazmıyorsa sonuç yalnızca kaba bir tahmin olur.'],
    ['VA ile watt arasındaki fark nedir?', 'VA görünür gücün, watt aktif gücün birimidir. Omik yüklerde ikisi eşittir. Güç faktörü 1\'den küçük yüklerde watt değeri VA değerinden küçüktür; kesintisiz güç kaynakları ve trafolar bu yüzden VA ile sınıflandırılır.'],
    ['Üç fazda neden √3 ile çarpılıyor?', 'Üç fazlı sistemde fazlar arası gerilim, faz-nötr geriliminin √3 katıdır. Toplam güç üç fazın gücünün toplamı olduğundan, hat gerilimi ve hat akımıyla yazıldığında formülde √3 çarpanı ortaya çıkar.'],
    ['kWh tüketimi nasıl hesaplanıyor?', 'Aktif güç kilowatta çevrilir ve çalışma süresiyle (saat) çarpılır. 1.656 W\'lık bir cihaz günde 5 saat çalışırsa 1,656 × 5 = 8,28 kWh tüketir. Aylık değer 30 gün üzerinden hesaplanır.'],
    ['Hesaplanan maliyet faturamla birebir tutar mı?', 'Hayır, yaklaşık bir değerdir. Gerçek fatura tarife türüne, tüketim kademelerine, vergi ve fonlara, cihazın gerçekte ne kadar süre tam güçte çalıştığına bağlıdır. Güncel birim fiyat için faturanıza ya da dağıtım şirketinizin duyurularına bakın.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; gerilim, akım ve fiyat değerleri sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['ohm-kanunu-hesapla', 'amper-watt-cevir', 'uc-faz-guc-hesapla', 'guc-faktoru-hesapla', 'cihaz-elektrik-maliyeti-hesapla', 'kva-kw-cevir'],
};
