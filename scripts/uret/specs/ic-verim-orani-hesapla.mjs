export default {
  slug: 'ic-verim-orani-hesapla',
  title: 'İç Verim Oranı (IRR) Hesaplama',
  h1Tail: 'nakit akışlarından',
  pageTitle: 'İç Verim Oranı (IRR) Hesaplama – Nakit Akışından İç Getiri Oranı',
  description: 'İlk yatırım tutarını ve dönemlik nakit akışlarını yazın; iç verim oranını (IRR), net nakit fazlasını ve isterseniz seçtiğiniz iskonto oranındaki NBD\'yi görün.',
  card: 'İlk yatırım ve dönemlik nakit akışlarından iç verim oranını (IRR) bulun; iskonto oranıyla karşılaştırın.',
  category: 'finans',
  keywords: ['iç verim oranı hesaplama', 'irr hesaplama', 'iç getiri oranı', 'iç kârlılık oranı', 'irr nedir', 'irr formülü', 'yatırım projesi değerlendirme', 'nakit akışı irr'],
  lead: 'Bir yatırımın ilk tutarını ve sonraki dönemlerde sağlayacağı nakit akışlarını yazın; araç, net bugünkü değeri sıfırlayan oranı, yani <strong>iç verim oranını (IRR)</strong> bulur. İsterseniz kendi iskonto oranınızı da girip projeyi bu eşikle karşılaştırabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'yatirim', label: 'İlk yatırım tutarı', type: 'number', placeholder: 'Örn. 10000', hint: 'Bugün yapılan harcama; artı işaretli yazın.' },
    { id: 'akislar', label: 'Dönemlik nakit akışları', type: 'textarea', placeholder: 'Örn. 3000 4200 6800', hint: 'Her dönemin net akışını sırayla, boşluk ya da satır sonuyla ayırarak yazın. Çıkış olan dönem için eksi işareti kullanın.', wide: true },
    { id: 'donem', label: 'Dönem uzunluğu', type: 'select', options: [['yil', 'Yıllık'], ['ay', 'Aylık']] },
    { id: 'iskonto', label: 'İskonto oranı (%, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10', hint: 'Dönemlik oran. Yazarsanız NBD ve karşılaştırma da gösterilir.' },
  ],
  compute(v, h) {
    const y = h.pos(v.yatirim, 'İlk yatırım tutarı');
    const cf = h.nums(v.akislar, 'Dönemlik nakit akışları');
    if (cf.length > 120) h.err('En fazla 120 dönem girebilirsiniz; akışları daha uzun dönemlerde toplayın.');
    if (!cf.some((x) => x > 0)) h.err('En az bir dönemde pozitif nakit girişi olmalı; aksi halde iç verim oranı tanımlanamaz.');
    const isk = String(v.iskonto ?? '').trim() === '' ? null : h.num(v.iskonto, 'İskonto oranı');
    if (isk !== null && isk <= -100) h.err('"İskonto oranı" %-100\'den büyük olmalı.');
    const nbd = (r) => {
      let s = -y;
      for (let i = 0; i < cf.length; i++) s += cf[i] / Math.pow(1 + r, i + 1);
      return s;
    };
    const izgara = [];
    for (let i = 0; i <= 398; i++) izgara.push(-0.99 + i * 0.005);
    for (let r = 1.05; r <= 1000; r *= 1.05) izgara.push(r);
    const kokler = [];
    for (let i = 0; i < izgara.length - 1; i++) {
      let a = izgara[i], b = izgara[i + 1];
      let fa = nbd(a), fb = nbd(b);
      if (!Number.isFinite(fa) || !Number.isFinite(fb) || fa === 0) continue;
      if (fb === 0) { kokler.push(b); continue; }
      if (fa * fb > 0) continue;
      for (let k = 0; k < 100; k++) {
        const m = (a + b) / 2, fm = nbd(m);
        if (fm === 0) { a = b = m; break; }
        if (fa * fm < 0) { b = m; fb = fm; } else { a = m; fa = fm; }
      }
      kokler.push((a + b) / 2);
    }
    if (!kokler.length) h.err('Bu nakit akışları için %-99 ile %100.000 arasında bir iç verim oranı bulunamadı. Tutarları ve işaretleri kontrol edin.');
    kokler.sort((p, q) => Math.abs(p) - Math.abs(q));
    const irr = kokler[0];
    const yuzde = (x) => {
      const t = h.fmt(Math.abs(x), 2);
      return (x < 0 && t !== '0' ? '-%' : '%') + t;
    };
    const toplam = cf.reduce((s, x) => s + x, 0);
    const ad = v.donem === 'ay' ? 'aylık' : 'yıllık';
    const rows = [
      ['İç verim oranı (IRR)', yuzde(irr * 100) + ' (' + ad + ')'],
    ];
    if (v.donem === 'ay') rows.push(['Yıllık bileşik karşılığı', yuzde((Math.pow(1 + irr, 12) - 1) * 100)]);
    rows.push(['Toplam nakit akışı', h.para(toplam)]);
    rows.push(['Net nakit fazlası', h.para(toplam - y)]);
    rows.push(['Dönem sayısı', String(cf.length)]);
    if (isk !== null) {
      const n = nbd(isk / 100);
      rows.push(['Net bugünkü değer', h.para(n)]);
      rows.push(['Değerlendirme', Math.abs(irr * 100 - isk) < 0.005 ? 'IRR iskonto oranına eşit: proje başabaş' : irr * 100 > isk ? 'IRR iskonto oranının üzerinde' : 'IRR iskonto oranının altında']);
    }
    let isaret = 0, onceki = -1;
    for (const x of cf) { if (x === 0) continue; const s = x > 0 ? 1 : -1; if (s !== onceki) isaret++; onceki = s; }
    let note = 'Akışların her dönemin sonunda gerçekleştiği varsayılır. Oran, yazdığınız dönem uzunluğu içindir.';
    if (isaret > 1) note = 'Nakit akışları birden fazla kez işaret değiştiriyor; bu durumda birden çok iç verim oranı olabilir' + (kokler.length > 1 ? ' (bulunan kök sayısı: ' + kokler.length + ')' : '') + '. Sıfıra en yakın oran gösterilmiştir; kararı NBD ile doğrulayın.';
    return { rows, note };
  },
  cases: [
    { in: { yatirim: '1000', akislar: '1100' }, out: { 'İç verim oranı (IRR)': '%10 (yıllık)', 'Net nakit fazlası': '100,00 TL' } },
    { in: { yatirim: '10000', akislar: '3000 4200 6800', iskonto: '10' }, out: { 'İç verim oranı (IRR)': '%16,34 (yıllık)', 'Net bugünkü değer': '1.307,29 TL', 'Değerlendirme': 'IRR iskonto oranının üzerinde' } },
    { in: { yatirim: '1000', akislar: '0\n0\n1331' }, out: { 'İç verim oranı (IRR)': '%10 (yıllık)', 'Dönem sayısı': '3' } },
    { in: { yatirim: '100', akislar: '60 60' }, out: { 'İç verim oranı (IRR)': '%13,07 (yıllık)', 'Toplam nakit akışı': '120,00 TL' } },
    { in: { yatirim: '1000', akislar: '400 400' }, out: { 'İç verim oranı (IRR)': '-%13,67 (yıllık)', 'Net nakit fazlası': '-200,00 TL' } },
    { in: { yatirim: '1000', akislar: '1010', donem: 'ay' }, out: { 'İç verim oranı (IRR)': '%1 (aylık)', 'Yıllık bileşik karşılığı': '%12,68' } },
    { in: { yatirim: '1000', akislar: '500 500 500' }, out: { 'İç verim oranı (IRR)': '%23,38 (yıllık)' } },
    { in: { yatirim: '1000', akislar: '-200 -300' }, error: true },
    { in: { yatirim: '0', akislar: '500 500' }, error: true },
  ],
  howto: [
    '"İlk yatırım tutarı" alanına bugün yapacağınız harcamayı artı işaretli olarak yazın; araç bunu sıfırıncı dönemdeki nakit çıkışı kabul eder.',
    '"Dönemlik nakit akışları" kutusuna birinci dönemden başlayarak her dönemin net akışını sırayla girin. Sayıları boşlukla ya da alt alta yazabilirsiniz; ek harcama gereken dönemi eksi işaretiyle belirtin, akış olmayan dönem için 0 yazın.',
    'Akışlarınız yıllık mı aylık mı, "Dönem uzunluğu" listesinden seçin. Aylık seçerseniz bulunan aylık oranın yıllık bileşik karşılığı da gösterilir.',
    'Karşılaştırma yapmak istiyorsanız "İskonto oranı" alanına beklediğiniz dönemlik getiriyi (sermaye maliyetinizi) yazın.',
    '"Hesapla" düğmesine basın; iç verim oranı, toplam akış, net fazla ve varsa net bugünkü değer listelenir.',
  ],
  sections: [
    { h: 'İç verim oranı nedir?', p: [
      'İç verim oranı, bir yatırımın gelecekteki nakit akışlarının bugünkü değerini ilk yatırım tutarına eşitleyen iskonto oranıdır. Başka bir deyişle net bugünkü değeri (NBD) tam sıfır yapan orandır. Türkçe kaynaklarda iç getiri oranı ya da iç kârlılık oranı adlarıyla, İngilizce kısaltmasıyla da IRR olarak geçer.',
      'Oranın çekiciliği, projeyi tek bir yüzdeyle özetlemesidir: "Bu makine yatırımı yıllık %16 kazandırıyor" cümlesi, mevduat faizi ya da kredi maliyetiyle doğrudan kıyaslanabilir. İç verim oranı sermaye maliyetinizin üzerindeyse proje değer yaratır, altındaysa paranızı alternatifinde değerlendirmek daha kazançlıdır.',
    ] },
    { h: 'Formül ve hesaplama yöntemi', p: [
      'İlk yatırım <em>Y</em>, dönem sonlarındaki akışlar <em>A<sub>1</sub>, A<sub>2</sub>, …, A<sub>n</sub></em> olsun. İç verim oranı <em>r</em>, şu denklemi sağlayan değerdir: <strong>Y = A<sub>1</sub>/(1+r) + A<sub>2</sub>/(1+r)<sup>2</sup> + … + A<sub>n</sub>/(1+r)<sup>n</sup></strong>.',
      'Tek dönemlik durum dışında bu denklemin cebirsel bir kapalı çözümü yoktur; oran deneme yanılmayla aranır. Araç, %-99 ile %100.000 arasındaki aralığı tarar, net bugünkü değerin işaret değiştirdiği yeri bulur ve aralığı art arda ikiye bölerek kökü çok yüksek duyarlılıkla belirler. Elle hesapta aynı mantık iki tahmini oran arasında doğrusal enterpolasyon yapılarak uygulanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir atölye 10.000 TL\'lik bir tezgâh alıyor ve tezgâhın üç yıl boyunca sırasıyla 3.000, 4.200 ve 6.800 TL net nakit sağlamasını bekliyor. Toplam giriş 14.000 TL, net nakit fazlası 4.000 TL\'dir; ancak bu fazla paranın zaman değerini hesaba katmaz.',
      '%10 iskonto oranıyla akışların bugünkü değerleri 2.727,27 + 3.471,07 + 5.108,94 = 11.307,29 TL eder; NBD 1.307,29 TL\'dir ve pozitiftir. Oranı %20\'ye çıkardığınızda NBD negatife döner. Sıfır noktası bu ikisinin arasındadır ve araç onu <strong>%16,34</strong> olarak bulur. Atölyenin sermaye maliyeti %10 ise proje kabul edilebilir; kredi maliyeti %20 ise edilemez.',
      'Daha basit bir denetim örneği: 1.000 TL yatırıp bir yıl sonra 1.100 TL alıyorsanız iç verim oranı tam %10\'dur. Aynı 1.000 TL üç yıl hiç ödeme yapmayıp sonunda 1.331 TL veriyorsa oran yine %10\'dur, çünkü 1.000 × 1,1<sup>3</sup> = 1.331 eder.',
    ] },
    { h: 'İç verim oranı ile net bugünkü değer arasındaki fark', p: [
      'NBD, projenin bugünkü parayla kaç lira değer kattığını söyler; iç verim oranı ise bu değerin hangi getiri yüzdesine denk geldiğini. Tek bir projeyi kabul ya da reddederken ikisi aynı kararı verir. Birbirini dışlayan iki proje arasında seçim yaparken ise çelişebilirler: küçük ama yüksek oranlı bir proje, büyük ama düşük oranlı bir projeden daha az lira kazandırabilir. Bu durumda finans kitaplarının ortak önerisi NBD\'ye bakmaktır.',
      'İç verim oranının örtük bir varsayımı da vardır: ara dönemlerde elde edilen nakdin aynı oranla yeniden değerlendirildiği kabul edilir. Çok yüksek çıkan oranlarda bu gerçekçi olmayabilir.',
    ] },
    { h: 'Birden fazla ya da hiç kök olmaması', p: [
      'Klasik bir yatırımda önce çıkış, sonra girişler vardır; işaret bir kez değişir ve tek bir iç verim oranı bulunur. Proje ortasında büyük bir bakım harcaması ya da sonunda söküm maliyeti varsa akışlar birden fazla kez işaret değiştirir ve denklem birden çok oranla sağlanabilir. Araç bu durumu sonuç altındaki notta bildirir ve sıfıra en yakın kökü gösterir.',
      'Girişlerin toplamı yatırımdan küçükse oran negatif çıkar; bu, paranın bir kısmının geri dönmediği anlamına gelir. Hiç pozitif akış yoksa oran tanımsızdır ve araç hata verir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'İlk yatırımı eksi işaretle yazmak: bu alana tutarı artı olarak girin, işareti araç kendisi uygular.',
      'Aylık akışlardan çıkan oranı yıllık sanmak: aylık %1, yıllık %12 değil bileşik olarak %12,68\'dir.',
      'Akış olmayan dönemi atlamak: boş geçen yıl için 0 yazmazsanız sonraki tutarlar bir dönem öne kayar ve oran olduğundan yüksek çıkar.',
      'Kâr rakamı kullanmak: hesap muhasebe kârıyla değil, kasaya fiilen giren ve çıkan nakitle yapılır; amortisman nakit çıkışı değildir.',
      'Enflasyonu karıştırmak: akışlar cari fiyatlarla tahmin edildiyse bulunan oran nominaldir; reel getiri için enflasyondan arındırmanız gerekir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonucun kalitesi tahmin ettiğiniz nakit akışlarının kalitesi kadardır; araç yalnızca aritmetiği yapar. Akışların dönem sonunda ve eşit aralıklarla gerçekleştiği varsayılır; düzensiz tarihli akışlar için sonuç yaklaşık olur. Burada üretilen değerler bilgilendirme amaçlıdır, yatırım tavsiyesi değildir; önemli tutarlı kararlarda bir mali müşavir ya da finans uzmanıyla çalışın.',
    ] },
  ],
  faq: [
    ['İç verim oranı kaç olmalı?', 'Evrensel bir eşik yoktur. Oran, paranın size maliyetinden (kredi faizi, ortakların beklediği getiri ya da vazgeçtiğiniz alternatif getiri) yüksek olmalıdır. Sermaye maliyeti %25 olan bir işletme için %20\'lik bir proje cazip değildir.'],
    ['IRR ile ROI aynı şey mi?', 'Hayır. Yatırım getirisi (ROI) toplam kazancı yatırıma oranlar ve zamanı dikkate almaz. İç verim oranı ise akışların hangi dönemde geldiğini hesaba katan, dönem başına bileşik bir orandır.'],
    ['İç verim oranı negatif çıkabilir mi?', 'Evet. Girişlerin toplamı ilk yatırımı karşılamıyorsa oran negatiftir. Örneğin 1.000 TL yatırıp iki yıl 400\'er TL alıyorsanız oran yaklaşık -%13,67 olur.'],
    ['Aylık akışlarla hesap yapabilir miyim?', 'Evet. Akışları ay ay yazıp dönem uzunluğunu "Aylık" seçin. Araç aylık oranı ve bunun yıllık bileşik karşılığını birlikte gösterir; iskonto oranını da aylık olarak yazmalısınız.'],
    ['Excel\'deki sonuçla aynı mı çıkar?', 'Aynı akışlarla, ilk yatırımı eksi işaretli ilk hücre olarak verdiğinizde tablo programlarındaki iç verim oranı işleviyle aynı değeri görmeniz gerekir; her ikisi de NBD\'yi sıfırlayan oranı arar. Küçük farklar yuvarlamadan kaynaklanır.'],
    ['Neden "birden çok oran olabilir" notu çıkıyor?', 'Nakit akışlarınız artıdan eksiye ya da eksiden artıya birden fazla kez geçiyorsa denklem birden çok kökle sağlanabilir. Böyle projelerde tek bir orana güvenmek yerine net bugünkü değere bakmak daha sağlıklıdır.'],
    ['Hurda ya da satış değerini nereye yazmalıyım?', 'Yatırımın sonunda elde edilecek hurda, devir ya da satış bedelini son dönemin nakit akışına ekleyin. Örneğin son yıl 2.000 TL işletme nakdi ve 5.000 TL satış bedeli varsa o dönem için 7.000 yazın.'],
    ['Girdiğim tutarlar kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız yatırım ve nakit akışı bilgileri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['net-bugunku-deger-hesapla', 'yatirim-getirisi-hesapla', 'geri-odeme-suresi-hesapla', 'yillik-bilesik-buyume-hesapla', 'bugunku-deger-hesapla'],
};
