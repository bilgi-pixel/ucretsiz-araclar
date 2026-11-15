export default {
  slug: 'motor-guc-tork-hesapla',
  title: 'Motor Güç Tork Devir Hesaplama',
  h1Tail: 'kW, Nm, d/dk',
  pageTitle: 'Motor Güç Tork Devir Hesaplama – kW, Nm ve d/dk İlişkisi',
  description: 'Motor gücü (kW), tork (Nm) ve devir (d/dk) değerlerinden ikisini yazın, üçüncüsünü hesaplayın. Beygir gücü ve açısal hız karşılığı da gösterilir.',
  card: 'Güç, tork ve devirden ikisini girin, üçüncüsünü bulun; beygir gücü ve rad/s karşılığıyla birlikte.',
  category: 'elektrik',
  keywords: ['motor tork hesaplama', 'güç tork devir formülü', 'kw nm hesaplama', 'motor torku nasıl hesaplanır', 'devir tork güç', 'elektrik motoru tork', 'nm kw çevirme'],
  lead: `Dönen bir milde <strong>güç, tork ve devir</strong> birbirine tek bir formülle bağlıdır. Bu üç büyüklükten ikisini yazın; araç üçüncüsünü hesaplasın ve gücü beygir gücü, devri açısal hız olarak da göstersin.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hedef', label: 'Hesaplanacak değer', type: 'select', options: [['tork', 'Tork (güç ve devir biliniyor)'], ['guc', 'Güç (tork ve devir biliniyor)'], ['devir', 'Devir (güç ve tork biliniyor)']] },
    { id: 'guc', label: 'Güç (kW)', type: 'number', placeholder: 'Örn. 7,5' },
    { id: 'tork', label: 'Tork (Nm)', type: 'number', placeholder: 'Örn. 47,75' },
    { id: 'devir', label: 'Devir (d/dk)', type: 'number', placeholder: 'Örn. 1500' },
  ],
  compute(v, h) {
    const K = 60000 / (2 * Math.PI); // 9549,2966
    let P, T, n;
    if (v.hedef === 'guc') {
      T = h.pos(v.tork, 'Tork');
      n = h.pos(v.devir, 'Devir');
      P = T * n / K;
    } else if (v.hedef === 'devir') {
      P = h.pos(v.guc, 'Güç');
      T = h.pos(v.tork, 'Tork');
      n = P * K / T;
    } else {
      P = h.pos(v.guc, 'Güç');
      n = h.pos(v.devir, 'Devir');
      T = P * K / n;
    }
    const satirlar = {
      tork: ['Tork', h.fmt(T, 2) + ' Nm'],
      guc: ['Güç', h.fmt(P, 3) + ' kW'],
      devir: ['Devir', h.fmt(n, 1) + ' d/dk'],
    };
    const ilk = v.hedef === 'guc' ? 'guc' : v.hedef === 'devir' ? 'devir' : 'tork';
    const sira = [ilk, ...['tork', 'guc', 'devir'].filter((k) => k !== ilk)];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Güç (beygir gücü)', h.fmt(P / 0.73549875, 2) + ' BG'],
        ['Açısal hız', h.fmt(2 * Math.PI * n / 60, 2) + ' rad/s'],
        ['Tork (kgf·m)', h.fmt(T / 9.80665, 3) + ' kgf·m'],
      ],
      note: 'P (kW) = T (Nm) × n (d/dk) ÷ 9549,3. Hesap mil çıkışındaki mekanik güç içindir; 1 BG = 0,7355 kW (metrik beygir gücü).',
    };
  },
  cases: [
    { in: { hedef: 'tork', guc: '7,5', devir: '1500' }, out: { 'Tork': '47,75 Nm', 'Güç (beygir gücü)': '10,2 BG', 'Açısal hız': '157,08 rad/s' } },
    { in: { hedef: 'guc', tork: '100', devir: '3000' }, out: { 'Güç': '31,416 kW', 'Güç (beygir gücü)': '42,71 BG', 'Açısal hız': '314,16 rad/s' } },
    { in: { hedef: 'devir', guc: '15', tork: '97,4' }, out: { 'Devir': '1.470,6 d/dk' } },
    { in: { hedef: 'tork', guc: '75', devir: '1480' }, out: { 'Tork': '483,92 Nm' } },
    { in: { hedef: 'tork', guc: '1,1', devir: '2850' }, out: { 'Tork': '3,69 Nm' } },
    { in: { hedef: 'tork', guc: '0,75', devir: '1400' }, out: { 'Tork': '5,12 Nm' } },
    { in: { hedef: 'guc', tork: '50', devir: '955' }, out: { 'Güç': '5 kW' } },
    { in: { hedef: 'guc', tork: '9,80665', devir: '1000' }, out: { 'Tork (kgf·m)': '1 kgf·m', 'Güç': '1,027 kW' } },
    { in: { hedef: 'tork', guc: '7,5', devir: '0' }, error: true },
    { in: { hedef: 'tork', guc: '', devir: '1500' }, error: true },
    { in: { hedef: 'devir', guc: '15', tork: '-4' }, error: true },
  ],
  howto: [
    `"Hesaplanacak değer" listesinden bulmak istediğiniz büyüklüğü seçin: tork, güç ya da devir.`,
    `Bildiğiniz iki değeri ilgili alanlara yazın. Güç kilowatt, tork newton metre, devir dakikadaki devir sayısı cinsindendir. Hesaplanacak büyüklüğün alanını boş bırakabilirsiniz.`,
    `Motor etiketinde güç beygir gücü olarak yazıyorsa önce 0,7355 ile çarparak kilowatta çevirin.`,
    `"Hesapla" düğmesine basın. Aranan değer ilk satırda, diğer büyüklükler ve birim karşılıkları altında görünür.`,
  ],
  sections: [
    { h: 'Güç, tork ve devir arasındaki ilişki', p: [
      `Tork, bir mili döndürmeye çalışan kuvvetin etkisidir ve newton metre (Nm) ile ölçülür. Devir, milin ne kadar hızlı döndüğünü anlatır. Güç ise bu ikisinin çarpımıdır: birim zamanda yapılan iştir. Temel fizik eşitliği <strong>P = T × ω</strong> biçimindedir; P watt, T newton metre, ω radyan/saniye cinsinden açısal hızdır.`,
      `Sanayide devir dakikada devir (d/dk) ve güç kilowatt olarak kullanıldığından, birim dönüşümleri formüle gömülür. Bir devir 2π radyan, bir dakika 60 saniye olduğundan ω = 2π × n ÷ 60 olur ve eşitlik şu pratik biçime dönüşür: <strong>P (kW) = T (Nm) × n (d/dk) ÷ 9549,3</strong>. Buradaki 9549,3 sayısı 60 000 ÷ 2π işleminin sonucudur. Aynı eşitlikten <strong>T = 9549,3 × P ÷ n</strong> ve <strong>n = 9549,3 × P ÷ T</strong> elde edilir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Tork bulma:</strong> Etiketinde 7,5 kW ve 1500 d/dk yazan bir motorun torku 9549,3 × 7,5 ÷ 1500 = <strong>47,75 Nm</strong> olur. Gücün beygir gücü karşılığı 7,5 ÷ 0,7355 = 10,2 BG, açısal hız 157,08 rad/s'dir.`,
      `<strong>Güç bulma:</strong> Bir test düzeneğinde 3000 d/dk'da 100 Nm tork ölçülüyorsa mil gücü 100 × 3000 ÷ 9549,3 = <strong>31,416 kW</strong> eder; bu yaklaşık 42,71 BG'dir.`,
      `<strong>Devir bulma:</strong> 15 kW güç veren ve 97,4 Nm tork üreten bir motorun devri 9549,3 × 15 ÷ 97,4 = <strong>1470,6 d/dk</strong> çıkar. Bu, dört kutuplu bir asenkron motorun tam yükteki tipik devrine karşılık gelir.`,
    ] },
    { h: 'Aynı güçte devir düştükçe tork neden artar?', p: [
      `Formüldeki çarpım ilişkisi önemli bir sonuç doğurur: güç sabitken devir yarıya indirilirse tork iki katına çıkar. Redüktörler tam olarak bunu yapar. 1500 d/dk'da 47,75 Nm veren 7,5 kW'lık motorun çıkışına 1:10 oranlı bir redüktör bağlanırsa çıkış mili 150 d/dk'da döner ve kuramsal tork 477,5 Nm olur. Gerçekte redüktörün verimi kadar bir kayıp oluşur; %95 verimli bir redüktörde çıkış torku yaklaşık 454 Nm'dir.`,
      `Bu nedenle konveyör, vinç, karıştırıcı gibi düşük devirde yüksek kuvvet isteyen uygulamalarda küçük güçlü ama redüktörlü motorlar kullanılır. Araçta redüktör çıkışını hesaplamak için güç alanına motor gücünü (isterseniz verimle çarparak), devir alanına çıkış devrini yazmanız yeterlidir.`,
    ] },
    { h: 'Asenkron motorlarda devir değerleri', p: [
      `Şebekeden beslenen üç fazlı asenkron motorların senkron devri kutup sayısına ve frekansa bağlıdır: <strong>n<sub>s</sub> = 120 × f ÷ kutup sayısı</strong>. 50 Hz şebekede 2 kutuplu motor 3000, 4 kutuplu 1500, 6 kutuplu 1000, 8 kutuplu 750 d/dk senkron devre sahiptir. Motor yük altında bu değerin birkaç yüzde altında döner; bu farka kayma denir. Etikette 1500 yerine 1440 ya da 1470 gibi değerler görmenizin nedeni budur.`,
      `Tork hesabında senkron devri değil, etiketteki anma devrini kullanın. Frekans konvertörü (sürücü) ile çalıştırılan motorlarda anma frekansının altında tork yaklaşık sabit kalırken güç devirle birlikte düşer; anma frekansının üzerinde ise güç yaklaşık sabit kalır ve tork düşer.`,
    ] },
    { h: 'Birimler ve dönüşümler', ul: [
      `<strong>1 kW</strong> = 1000 W = 1,3596 BG (metrik beygir gücü)`,
      `<strong>1 BG</strong> (PS, metrik) = 0,7355 kW`,
      `<strong>1 HP</strong> (mekanik, ABD/İngiliz) ≈ 0,7457 kW; metrik beygir gücünden biraz büyüktür`,
      `<strong>1 kgf·m</strong> = 9,80665 Nm`,
      `<strong>1 lbf·ft</strong> ≈ 1,3558 Nm`,
      `<strong>1 d/dk</strong> = 0,10472 rad/s`,
    ], p: [
      `Türkiye'de motor etiketlerinde ve taşıt belgelerinde geçen beygir gücü çoğunlukla metrik beygir gücüdür; araç da bu tanımı kullanır. ABD kaynaklı kataloglardaki HP değerini çevirirken 0,7457 katsayısını kullanmanız gerekir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Elektrik gücü ile mil gücünü karıştırmak:</strong> Motor etiketindeki kW değeri mil çıkış gücüdür. Şebekeden çekilen elektrik gücü, verim kadar daha yüksektir.`,
      `<strong>Kalkış torkunu anma torku sanmak:</strong> Formül sürekli çalışma noktası içindir. Asenkron motorların kalkış ve devrilme torkları anma torkunun katlarıdır ve katalogdan okunur.`,
      `<strong>Redüktör verimini unutmak:</strong> Özellikle sonsuz vidalı redüktörlerde kayıp yüksektir; çıkış torku kuramsal değerin belirgin biçimde altında kalabilir.`,
      `<strong>Watt yerine kilowatt yazmak ya da tersi:</strong> Güç alanı kilowatt bekler; 750 W'lık bir motor için 0,75 yazılmalıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Araç yalnızca güç, tork ve devir arasındaki matematiksel ilişkiyi hesaplar. Yükün atalet momenti, hızlanma süresi, servis faktörü, çalışma rejimi, ortam sıcaklığı ve mekanik emniyet katsayıları dikkate alınmaz. Motor ve redüktör seçimi bu etkenlerin tümü değerlendirilerek yapılmalıdır. Dönen makinelerle ilgili tasarım ve uygulamalarda yetkili bir mühendise danışın; sonuçlar bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Motor torku nasıl hesaplanır?', `Tork (Nm) = 9549,3 × güç (kW) ÷ devir (d/dk). Örneğin 7,5 kW ve 1500 d/dk için tork 47,75 Nm'dir.`],
    ['Formüldeki 9549 sayısı nereden geliyor?', `Birim dönüşümünden: 60 000 ÷ 2π = 9549,3. Kilowattı watta (×1000) ve dakikadaki devri saniyedeki radyana (×2π ÷ 60) çevirmenin birleşik sonucudur. Çoğu kaynakta 9550 olarak yuvarlanır.`],
    ['1 kW kaç beygir gücüdür?', `1 kW yaklaşık 1,36 metrik beygir gücüdür (BG). Tersine 1 BG, 0,7355 kW eder. ABD ölçüsü HP için 1 kW yaklaşık 1,341 HP'dir.`],
    ['Devri düşürürsem tork artar mı?', `Güç sabit kalıyorsa evet; tork devirle ters orantılıdır. Redüktör devri düşürüp torku aynı oranda (verim kaybı hariç) artırır. Ancak motorun kendisini sürücüyle yavaşlatmak torku artırmaz, gücü düşürür.`],
    ['Etiketteki kW elektrik gücü mü, mekanik güç mü?', `Elektrik motorlarında etiket gücü mil çıkışındaki mekanik güçtür. Şebekeden çekilen güç, bu değerin motor verimine bölünmesiyle bulunur.`],
    ['Nm ile kgf·m arasındaki fark nedir?', `İkisi de tork birimidir. 1 kgf·m, 9,80665 Nm'ye eşittir. Eski kataloglarda ve bazı taşıt belgelerinde kgf·m kullanılır; araç her iki değeri de gösterir.`],
    ['Bu hesap içten yanmalı motorlar için de geçerli mi?', `Evet, formül dönen her mil için aynıdır. 4000 d/dk'da 200 Nm üreten bir motorun o devirdeki gücü 200 × 4000 ÷ 9549,3 ≈ 83,8 kW'dır.`],
    ['Girdiğim değerler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; değerler sunucuya gönderilmez.`],
  ],
  related: ['uc-faz-guc-hesapla', 'kw-amper-cevir', 'elektrik-gucu-hesapla', 'guc-faktoru-hesapla', 'kva-kw-cevir'],
};
