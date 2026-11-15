export default {
  slug: 'karisim-derisimi-hesapla',
  title: 'Karışım Derişimi Hesaplama',
  h1Tail: 'çözeltileri karıştırma',
  pageTitle: 'Karışım Derişimi Hesaplama – Çözeltileri Karıştırınca Son Derişim',
  description: 'İki ya da üç çözelti karıştırıldığında oluşan son derişimi hesaplayın. Kütlece yüzde ve molarite için çalışır; saf su eklemeyi de destekler.',
  card: 'İki ya da üç çözeltiyi karıştırınca oluşan son derişimi kütlece yüzde ya da molarite olarak hesaplayın.',
  category: 'bilim',
  keywords: ['karışım derişimi hesaplama', 'çözelti karıştırma hesaplama', 'karışım problemleri', 'son derişim bulma', 'yüzde derişim karışım', 'molarite karışım', 'çözeltilerin karıştırılması'],
  lead: 'Aynı maddenin farklı derişimlerdeki çözeltilerini karıştırdığınızda oluşan <strong>son derişimi</strong> bulun. Kütlece yüzde ya da molarite ile çalışabilir, derişimi 0 yazarak karışıma saf su da ekleyebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Derişim türü', type: 'select', options: [['yuzde', 'Kütlece yüzde (miktar: gram)'], ['molarite', 'Molarite (miktar: mililitre)']] },
    { id: 'c1', label: '1. çözeltinin derişimi', type: 'number', placeholder: 'Örn. 10' },
    { id: 'm1', label: '1. çözeltinin miktarı', type: 'number', placeholder: 'Örn. 200' },
    { id: 'c2', label: '2. çözeltinin derişimi', type: 'number', placeholder: 'Örn. 20', hint: 'Saf su ekliyorsanız derişime 0 yazın.' },
    { id: 'm2', label: '2. çözeltinin miktarı', type: 'number', placeholder: 'Örn. 300' },
    { id: 'c3', label: '3. çözeltinin derişimi (isteğe bağlı)', type: 'number' },
    { id: 'm3', label: '3. çözeltinin miktarı (isteğe bağlı)', type: 'number', hint: 'Yüzde hesabında miktarları gram, molarite hesabında mililitre olarak yazın.' },
  ],
  compute(v, h) {
    const yuzde = v.tur !== 'molarite';
    const bos = (s) => String(s ?? '').trim() === '';
    const parca = [];
    const ekle = (c, m, no) => {
      const cc = h.nonneg(c, `${no}. çözeltinin derişimi`);
      const mm = h.pos(m, `${no}. çözeltinin miktarı`);
      if (yuzde && cc > 100) h.err(`${no}. çözeltinin derişimi %100'den büyük olamaz.`);
      parca.push([cc, mm]);
    };
    ekle(v.c1, v.m1, 1);
    ekle(v.c2, v.m2, 2);
    if (!bos(v.c3) || !bos(v.m3)) {
      if (bos(v.c3) || bos(v.m3)) h.err('3. çözelti için derişim ve miktarı birlikte yazın ya da ikisini de boş bırakın.');
      ekle(v.c3, v.m3, 3);
    }
    const toplam = parca.reduce((a, [, m]) => a + m, 0);
    const carpim = parca.reduce((a, [c, m]) => a + c * m, 0);
    const son = carpim / toplam;
    const enK = Math.min(...parca.map(([c]) => c));
    const enB = Math.max(...parca.map(([c]) => c));
    const rows = yuzde
      ? [
        ['Karışımın derişimi', '%' + h.fmt(son, 4)],
        ['Toplam miktar', h.fmt(toplam, 4) + ' g'],
        ['Toplam çözünen', h.fmt(carpim / 100, 4) + ' g'],
        ['Toplam çözücü', h.fmt(toplam - carpim / 100, 4) + ' g'],
      ]
      : [
        ['Karışımın derişimi', h.fmt(son, 4) + ' M'],
        ['Toplam miktar', h.fmt(toplam, 4) + ' mL'],
        ['Toplam çözünen', h.fmt(carpim / 1000, 6) + ' mol'],
      ];
    rows.push(['Derişim aralığı', yuzde ? `%${h.fmt(enK, 4)} – %${h.fmt(enB, 4)}` : `${h.fmt(enK, 4)} M – ${h.fmt(enB, 4)} M`]);
    return {
      rows,
      note: yuzde
        ? 'Kütleler toplanabilir olduğundan sonuç kesindir. Çözeltilerin aynı çözüneni içerdiği ve aralarında tepkime olmadığı varsayılır.'
        : 'Hacimlerin toplanabildiği (karışınca hacim değişmediği) ve çözeltilerin aynı çözüneni içerdiği varsayılır.',
    };
  },
  cases: [
    { in: { tur: 'yuzde', c1: '10', m1: '200', c2: '20', m2: '300' }, out: { 'Karışımın derişimi': '%16', 'Toplam miktar': '500 g', 'Toplam çözünen': '80 g', 'Toplam çözücü': '420 g' } },
    { in: { tur: 'molarite', c1: '0,5', m1: '100', c2: '0,1', m2: '400' }, out: { 'Karışımın derişimi': '0,18 M', 'Toplam miktar': '500 mL', 'Toplam çözünen': '0,09 mol' } },
    { in: { tur: 'yuzde', c1: '40', m1: '150', c2: '0', m2: '50' }, out: { 'Karışımın derişimi': '%30', 'Toplam çözünen': '60 g' } },
    { in: { tur: 'yuzde', c1: '10', m1: '100', c2: '20', m2: '100', c3: '30', m3: '200' }, out: { 'Karışımın derişimi': '%22,5', 'Toplam miktar': '400 g', 'Derişim aralığı': '%10 – %30' } },
    { in: { tur: 'molarite', c1: '2', m1: '250', c2: '0', m2: '750' }, out: { 'Karışımın derişimi': '0,5 M', 'Toplam çözünen': '0,5 mol' } },
    { in: { tur: 'yuzde', c1: '25', m1: '80', c2: '5', m2: '120' }, out: { 'Karışımın derişimi': '%13', 'Toplam çözünen': '26 g' } },
    { in: { tur: 'yuzde', c1: '120', m1: '200', c2: '20', m2: '300' }, error: true },
    { in: { tur: 'yuzde', c1: '10', m1: '200', c2: '20', m2: '300', c3: '30' }, error: true },
    { in: { tur: 'molarite', c1: '0,5', m1: '0', c2: '0,1', m2: '400' }, error: true },
  ],
  howto: [
    '"Derişim türü" listesinden çözeltilerinizin nasıl tanımlandığını seçin: kütlece yüzde ya da molarite.',
    'Birinci ve ikinci çözeltinin derişimini ve miktarını yazın. Yüzde hesabında miktar gram, molarite hesabında mililitre olmalıdır.',
    'Karışıma saf su katılıyorsa onu derişimi 0 olan bir çözelti gibi girin. Üçüncü bir çözelti varsa son iki alanı da doldurun; yoksa boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır karışımın son derişimidir; altında toplam miktar ve toplam çözünen madde yer alır.',
    'Sonucun, girdiğiniz en küçük ve en büyük derişim arasında olduğunu "Derişim aralığı" satırından doğrulayın.',
  ],
  sections: [
    { h: 'Karışım derişimi nasıl hesaplanır?', p: [
      'Aynı maddeyi içeren çözeltiler karıştırıldığında çözünen madde yok olmaz, yalnızca daha büyük bir çözelti içine dağılır. Bu yüzden hesap bir <strong>madde korunumu</strong> hesabıdır: karışımdaki toplam çözünen, karıştırılan çözeltilerdeki çözünenlerin toplamına eşittir. Son derişim, toplam çözünenin toplam çözelti miktarına bölünmesiyle bulunur.',
      'Formül olarak: <strong>C<sub>son</sub> = (C₁·m₁ + C₂·m₂ + C₃·m₃) ÷ (m₁ + m₂ + m₃)</strong>. Kütlece yüzde için m çözelti kütlesidir; molarite için m yerine hacim (V) yazılır ve aynı eşitlik M₁V₁ + M₂V₂ = M<sub>son</sub>V<sub>son</sub> biçimini alır. Matematiksel olarak bu, derişimlerin miktarlara göre ağırlıklı ortalamasıdır.',
    ] },
    { h: 'Çözümlü örnek: kütlece yüzde', p: [
      'Kütlece %10\'luk 200 gram tuz çözeltisi ile %20\'lik 300 gram tuz çözeltisi karıştırılıyor. Birinci çözeltide 200 × 10 ÷ 100 = 20 gram, ikincide 300 × 20 ÷ 100 = 60 gram tuz vardır. Toplam tuz 80 gram, toplam çözelti 500 gramdır. Son derişim 80 ÷ 500 × 100 = <strong>%16</strong> olur. Karışımdaki su miktarı 500 − 80 = 420 gramdır.',
      'Sonucun %15 değil %16 çıkması önemlidir: derişimlerin düz ortalaması yalnızca miktarlar eşitken doğrudur. Burada derişik çözeltiden daha fazla kullanıldığı için sonuç %20\'ye daha yakındır.',
    ] },
    { h: 'Çözümlü örnek: molarite', p: [
      '0,5 M derişimli 100 mL çözelti ile 0,1 M derişimli 400 mL çözelti karıştırılıyor. Birincide 0,5 × 0,1 = 0,05 mol, ikincide 0,1 × 0,4 = 0,04 mol çözünen bulunur. Toplam 0,09 mol madde 500 mL, yani 0,5 litre çözeltidedir: 0,09 ÷ 0,5 = <strong>0,18 M</strong>.',
      'Molarite hesabında hacimlerin toplanabildiği kabul edilir. Seyreltik sulu çözeltilerde bu kabul çok iyi tutar; derişik asitler ya da su-alkol gibi karışımlarda son hacim, hacimlerin toplamından biraz farklı olabilir. Böyle durumlarda kütle temelli hesap daha güvenilirdir.',
    ] },
    { h: 'Saf su ekleme, buharlaştırma ve saf madde ekleme', p: [
      'Su eklemek, derişimi 0 olan bir çözelti karıştırmakla aynıdır. Örneğin %40\'lık 150 gram çözeltiye 50 gram su eklenirse çözünen 60 gram olarak kalır, toplam kütle 200 grama çıkar ve derişim %30\'a düşer. Molaritede de durum aynıdır: 2 M 250 mL çözeltiye 750 mL su eklenince 0,5 mol madde 1 litreye yayılır ve derişim 0,5 M olur.',
      'Kütlece yüzde hesabında çözeltiye saf katı madde eklemek istiyorsanız onu derişimi 100 olan bir bileşen olarak girebilirsiniz. Suyun buharlaştırılması ise bu araçla doğrudan hesaplanmaz; o durumda çözünen miktarını "Toplam çözünen" satırından alıp kalan çözelti kütlesine elle bölmeniz gerekir.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      'Lise kimya ve matematik derslerindeki karışım problemlerinde sonucu kontrol etmek.',
      'Laboratuvarda eldeki iki stok çözeltiden ara derişimli bir çözelti hazırlarken oranları sınamak.',
      'Temizlik, tarım ya da gıda uygulamalarında farklı yoğunluktaki çözeltileri birleştirirken ortaya çıkacak yüzdeyi görmek.',
      'Salamura, şurup ya da sirke gibi karışımlarda tuz, şeker ya da asit oranını tahmin etmek.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Derişimlerin aritmetik ortalamasını almak. Miktarlar eşit değilse sonuç yanlış olur.',
      'Yüzde hesabında çözelti kütlesi yerine çözücü kütlesini yazmak. Miktar alanına çözeltinin toplam kütlesi girilir.',
      'Bir çözeltiyi gram, diğerini mililitre olarak girmek. Tüm miktarlar aynı birimde olmalıdır; kütlece yüzde ile hacim birlikte kullanılacaksa önce yoğunlukla kütleye çevrilmelidir.',
      'Farklı maddelerin çözeltilerini karıştırmak. Araç, tüm çözeltilerde aynı çözünenin bulunduğunu ve aralarında kimyasal tepkime olmadığını varsayar; asit ile baz karıştırılıyorsa nötrleşme hesabı gerekir.',
    ], p: [
      'Sonuç her zaman en seyreltik ve en derişik bileşenin derişimleri arasındadır. Hedeflediğiniz değer bu aralığın dışındaysa eldeki çözeltilerle o derişime ulaşılamaz. Sonuçlar bilgilendirme amaçlıdır; kimyasallarla çalışırken ürün etiketindeki ve güvenlik bilgi formundaki uyarılara uyun.',
    ] },
  ],
  faq: [
    ['İki çözelti karıştırılınca derişim nasıl bulunur?', 'Her çözeltideki çözünen miktarı (derişim × miktar) toplanır ve toplam çözelti miktarına bölünür. Kütlece yüzdede miktar kütledir, molaritede hacimdir.'],
    ['Derişimlerin ortalamasını almak neden yanlış?', 'Düz ortalama her çözeltiden eşit miktarda kullanıldığını varsayar. Miktarlar farklıysa çok olan çözelti sonucu kendine doğru çeker; doğru yöntem miktarlara göre ağırlıklı ortalamadır.'],
    ['Çözeltiye su eklediğimde nasıl hesaplarım?', 'Suyu derişimi 0 olan ikinci çözelti olarak girin. Çözünen miktarı değişmez, yalnızca toplam miktar artar ve derişim buna göre düşer.'],
    ['Üçten fazla çözelti karıştırabilir miyim?', 'Araç en çok üç bileşen alır. Daha fazlası için önce üçünü hesaplayın, çıkan derişimi ve toplam miktarı tek bir çözelti gibi yeniden girip kalanlarla birleştirin.'],
    ['Molarite hesabında hacimler gerçekten toplanır mı?', 'Seyreltik sulu çözeltilerde pratik olarak evet. Derişik çözeltilerde ve farklı sıvıların karışımında hacim küçük oranda azalabilir ya da artabilir; hassas iş için son hacmi ölçmek ya da kütle ile çalışmak gerekir.'],
    ['Belirli bir derişimi elde etmek için oranı nasıl bulurum?', 'Bu araç verilen miktarlardan sonucu bulur. Hedef derişim için miktarları değiştirip deneyebilir ya da şu kuralı kullanabilirsiniz: bileşenlerin miktarları, hedef derişime olan uzaklıklarıyla ters orantılıdır.'],
    ['Kütlece yüzde ile hacimce yüzde aynı mı?', 'Hayır. Kütlece yüzde gram başına gram, hacimce yüzde mililitre başına mililitre üzerinden tanımlanır. Bu sayfadaki yüzde hesabı kütle içindir; hacimce yüzdelerde hacimler tam toplanmayabileceği için sonuç yaklaşık olur.'],
    ['Girdiğim sayılar saklanıyor mu?', 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; değerler herhangi bir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kutlece-yuzde-derisim-hesapla', 'molarite-hesapla', 'seyreltme-hesapla', 'seyreltme-orani-hesapla', 'ppm-hesapla'],
};
