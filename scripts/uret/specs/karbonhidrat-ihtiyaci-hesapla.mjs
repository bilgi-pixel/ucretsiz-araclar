export default {
  slug: 'karbonhidrat-ihtiyaci-hesapla',
  title: 'Günlük Karbonhidrat İhtiyacı Hesaplama',
  h1Tail: 'gram/gün',
  pageTitle: 'Günlük Karbonhidrat İhtiyacı Hesaplama – Günde Kaç Gram?',
  description: 'Günlük kalorinize göre almanız gereken karbonhidrat miktarını gram olarak hesaplayın. Kilonuzu ve spor düzeyinizi yazarsanız g/kg hedefini de görün.',
  card: 'Günlük kaloriden karbonhidrat gram aralığını bulun; spor yapanlar için kilogram başına hedefi de hesaplayın.',
  category: 'saglik',
  keywords: ['günlük karbonhidrat ihtiyacı', 'günde kaç gram karbonhidrat', 'karbonhidrat hesaplama', 'kilo başına karbonhidrat', 'sporcu karbonhidrat ihtiyacı', 'karbonhidrat yüzdesi', 'diyet karbonhidrat miktarı'],
  lead: 'Günlük kalori alımınıza göre <strong>kaç gram karbonhidrat</strong> yemeniz gerektiğini hesaplayın. Araç, enerjinin karbonhidrattan gelmesi önerilen payını grama çevirir; kilonuzu ve antrenman düzeyinizi eklerseniz kilogram başına hedefi de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kalori', label: 'Günlük kalori (kcal)', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'altYuzde', label: 'Karbonhidrat payı alt sınır (%)', type: 'number', value: '45' },
    { id: 'ustYuzde', label: 'Karbonhidrat payı üst sınır (%)', type: 'number', value: '65', hint: 'Tek bir yüzde için iki alana aynı değeri yazın.' },
    { id: 'kilo', label: 'Kilo (kg) – isteğe bağlı', type: 'number', placeholder: 'Örn. 70' },
    { id: 'spor', label: 'Antrenman düzeyi – isteğe bağlı', type: 'select', options: [
      ['yok', 'Belirtmek istemiyorum'],
      ['hafif', 'Hafif: düşük yoğunluk ya da beceri çalışması (3–5 g/kg)'],
      ['orta', 'Orta: günde yaklaşık 1 saat egzersiz (5–7 g/kg)'],
      ['yogun', 'Yoğun: günde 1–3 saat dayanıklılık antrenmanı (6–10 g/kg)'],
      ['cokyogun', 'Çok yoğun: günde 4–5 saat ve üzeri (8–12 g/kg)'],
    ] },
  ],
  compute(v, h) {
    const kal = h.pos(v.kalori, 'Günlük kalori');
    if (kal < 500 || kal > 10000) h.err('Günlük kalori 500 ile 10.000 kcal arasında olmalı.');
    const alt = h.pos(v.altYuzde, 'Alt sınır yüzdesi');
    const ust = h.pos(v.ustYuzde, 'Üst sınır yüzdesi');
    if (ust > 100) h.err('Üst sınır yüzdesi 100\'den büyük olamaz.');
    if (alt > ust) h.err('Alt sınır yüzdesi üst sınırdan büyük olamaz; iki değerin yerini değiştirin.');
    const kAlt = kal * alt / 100, kUst = kal * ust / 100;
    const gAlt = kAlt / 4, gUst = kUst / 4;
    const tek = Math.abs(alt - ust) < 1e-9;
    const aralik = (x, y, d, birim) => (tek || Math.abs(x - y) < 1e-9 ? `${h.fmt(x, d)}${birim}` : `${h.fmt(x, d)} – ${h.fmt(y, d)}${birim}`);
    const rows = [
      ['Günlük karbonhidrat', aralik(gAlt, gUst, 0, ' g')],
      ['Karbonhidrattan gelen kalori', aralik(kAlt, kUst, 0, ' kcal')],
      ['Aralığın ortası', h.fmt((gAlt + gUst) / 2, 0) + ' g'],
    ];
    const kiloVar = String(v.kilo ?? '').trim() !== '';
    const tablo = { hafif: [3, 5], orta: [5, 7], yogun: [6, 10], cokyogun: [8, 12] };
    const sp = tablo[v.spor];
    if (sp && !kiloVar) h.err('Antrenman düzeyine göre hedef için kilonuzu da yazın ya da düzeyi "Belirtmek istemiyorum" olarak bırakın.');
    if (kiloVar) {
      const kilo = h.pos(v.kilo, 'Kilo');
      if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı.');
      rows.push(['Kilogram başına', aralik(gAlt / kilo, gUst / kilo, 2, ' g/kg')]);
      if (sp) rows.push(['Antrenman düzeyine göre hedef', `${h.fmt(kilo * sp[0], 0)} – ${h.fmt(kilo * sp[1], 0)} g (${sp[0]}–${sp[1]} g/kg)`]);
    }
    return {
      rows,
      note: gAlt < 130 - 1e-9
        ? 'Alt sınır günde 130 gramın altında. Bu değer, beslenme başvuru kaynaklarında yetişkinler için anılan en az karbonhidrat miktarıdır; düşük karbonhidratlı beslenmeyi bir uzmanla planlayın.'
        : 'Karbonhidrat 4 kcal/g kabul edildi. Sonuç bilgilendirme amaçlıdır; diyabetiniz varsa miktarı hekiminiz ve diyetisyeniniz belirler.',
    };
  },
  cases: [
    { in: { kalori: '2000' }, out: { 'Günlük karbonhidrat': '225 – 325 g', 'Karbonhidrattan gelen kalori': '900 – 1.300 kcal', 'Aralığın ortası': '275 g' } },
    { in: { kalori: '2500', kilo: '70', spor: 'orta' }, out: { 'Günlük karbonhidrat': '281 – 406 g', 'Karbonhidrattan gelen kalori': '1.125 – 1.625 kcal', 'Kilogram başına': '4,02 – 5,8 g/kg', 'Antrenman düzeyine göre hedef': '350 – 490 g (5–7 g/kg)' } },
    { in: { kalori: '1800', altYuzde: '50', ustYuzde: '60' }, out: { 'Günlük karbonhidrat': '225 – 270 g', 'Karbonhidrattan gelen kalori': '900 – 1.080 kcal' } },
    { in: { kalori: '3200', kilo: '80', spor: 'yogun' }, out: { 'Günlük karbonhidrat': '360 – 520 g', 'Kilogram başına': '4,5 – 6,5 g/kg', 'Antrenman düzeyine göre hedef': '480 – 800 g (6–10 g/kg)' } },
    { in: { kalori: '2000', altYuzde: '50', ustYuzde: '50' }, out: { 'Günlük karbonhidrat': '250 g', 'Karbonhidrattan gelen kalori': '1.000 kcal', 'Aralığın ortası': '250 g' } },
    { in: { kalori: '1600' }, out: { 'Günlük karbonhidrat': '180 – 260 g', 'Karbonhidrattan gelen kalori': '720 – 1.040 kcal' } },
    { in: { kalori: '1200', altYuzde: '20', ustYuzde: '30', kilo: '60' }, out: { 'Günlük karbonhidrat': '60 – 90 g', 'Kilogram başına': '1 – 1,5 g/kg' } },
    { in: { kalori: '2000', altYuzde: '65', ustYuzde: '45' }, error: true },
    { in: { kalori: '' }, error: true },
    { in: { kalori: '2000', spor: 'orta' }, error: true },
  ],
  howto: [
    'Günlük toplam kalori alımınızı ya da hedefinizi yazın.',
    'Karbonhidratın enerjideki payı için alt ve üst yüzdeyi girin; varsayılan %45–65 aralığı genel öneridir. Tek bir yüzde kullanacaksanız iki alana aynı sayıyı yazın.',
    'Kilogram başına karşılığı görmek isterseniz kilonuzu ekleyin.',
    'Düzenli antrenman yapıyorsanız düzeyinizi seçin; araç kiloya göre gram hedefini ayrıca hesaplar.',
    '"Hesapla" düğmesine basın ve gram aralığını, kalori karşılığını ve varsa kilogram başına değerleri okuyun.',
  ],
  sections: [
    { h: 'Karbonhidrat ihtiyacı nasıl belirlenir?', p: [
      'Karbonhidratlar vücudun, özellikle de beynin ve çalışan kasların başlıca enerji kaynağıdır. İhtiyacı belirlemenin iki yaygın yolu vardır. Birincisi <strong>enerji payı</strong> yaklaşımıdır: günlük kalorinin belli bir yüzdesinin karbonhidrattan gelmesi hedeflenir. Beslenme başvuru kaynaklarında yetişkinler için bu pay çoğunlukla %45 ile %65 arasında verilir. İkincisi <strong>kilogram başına gram</strong> yaklaşımıdır ve daha çok sporcular için kullanılır; çünkü antrenman yükü arttıkça kasların karbonhidrat gereksinimi kalori yüzdesinden bağımsız olarak yükselir.',
      'Araç iki yöntemi de sunar. Kalori ve yüzdelerden gram aralığını hesaplar; kilonuzu ve antrenman düzeyinizi yazdığınızda kiloya dayalı hedefi yanına koyar. İki sonucu karşılaştırmak, mevcut kalori planınızın antrenmanınızı karşılayıp karşılamadığını görmenizi sağlar.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Karbonhidratın gramı yaklaşık 4 kilokalori enerji verir. Buna göre: <strong>karbonhidrat (g) = kalori × yüzde ÷ 100 ÷ 4</strong>.',
      'Günde 2000 kcal alan biri için alt sınır 2000 × 0,45 = 900 kcal, yani 900 ÷ 4 = 225 gramdır. Üst sınır 2000 × 0,65 = 1300 kcal, yani 325 gramdır. Sonuç <strong>225 – 325 g</strong> aralığıdır ve ortası 275 gramdır.',
      'İkinci örnek: 70 kg ağırlığında, günde yaklaşık bir saat egzersiz yapan ve 2500 kcal alan biri. Yüzde yöntemi 281 – 406 gram verir; bu kilogram başına 4,02 – 5,8 grama denk gelir. Orta düzey antrenman için kiloya dayalı hedef ise 70 × 5 = 350 ile 70 × 7 = 490 gram arasındadır. İki aralığın kesiştiği 350 – 406 gram bölgesi bu kişi için makul bir hedef olur.',
    ] },
    { h: 'Antrenman düzeyine göre kilogram başına aralıklar', p: ['Spor beslenmesi kaynaklarında sık kullanılan genel çerçeve şöyledir:'], ul: [
      '<strong>Hafif:</strong> düşük yoğunluklu ya da beceri ağırlıklı çalışma, 3–5 g/kg.',
      '<strong>Orta:</strong> günde yaklaşık bir saat orta yoğunlukta egzersiz, 5–7 g/kg.',
      '<strong>Yoğun:</strong> günde 1–3 saat orta-yüksek yoğunlukta dayanıklılık antrenmanı, 6–10 g/kg.',
      '<strong>Çok yoğun:</strong> günde 4–5 saat ve üzeri antrenman, 8–12 g/kg.',
    ] },
    { h: 'Hangi karbonhidrat? Miktar kadar kalite', p: [
      'Gram hesabı tek başına yeterli değildir; karbonhidratın kaynağı da önemlidir. Tam tahıllar, bulgur, kuru baklagiller, sebzeler ve meyveler karbonhidratla birlikte lif, vitamin ve mineral sağlar ve kan şekerini daha yavaş yükseltir. Şekerli içecekler, tatlılar ve beyaz undan yapılan ürünler ise aynı gramı çok daha az besin değeriyle verir. Dünya Sağlık Örgütü, eklenmiş (serbest) şekerlerin günlük enerjinin %10\'unun altında tutulmasını önerir; 2000 kcal için bu yaklaşık 50 gramın altı demektir.',
      'Türk mutfağında karbonhidratın başlıca kaynakları ekmek, pilav, makarna, bulgur ve hamur işleridir. Porsiyon fikri vermesi için yaklaşık değerler: bir ince dilim ekmek 12–15 gram, dört beş yemek kaşığı pişmiş pilav ya da makarna 25–30 gram, orta boy bir meyve 15–20 gram karbonhidrat içerir. Bu değerler ürüne göre değişir; kesin bilgi için besin etiketine bakın.',
    ] },
    { h: 'Düşük karbonhidratlı beslenme ve alt sınır', p: [
      'Beslenme başvuru değerlerinde yetişkinler için günde 130 gram karbonhidrat, beynin glikoz gereksinimine dayanan en az miktar olarak anılır. Araç, hesaplanan alt sınır bu değerin altına düştüğünde sonuç notunda bunu belirtir. Daha düşük karbonhidratlı beslenme biçimleri uygulanabilir, ancak özellikle diyabet ilacı kullananlarda kan şekeri düşmesi riski nedeniyle hekim ve diyetisyen gözetimi gerekir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Besinin ağırlığını karbonhidrat miktarı sanmak: 100 gram pişmiş pilav yaklaşık 28 gram karbonhidrat içerir, 100 gram değil.',
      'Meyve, süt ve yoğurttaki karbonhidratı saymamak; bunlar da toplamın parçasıdır.',
      'Antrenman olmayan günlerde de yoğun gün hedefini uygulamak. Kiloya dayalı aralıklar antrenman yüküne göre günden güne ayarlanabilir.',
      'Yüzdeyi sabit tutup kaloriyi çok düşürmek; bu durumda gram miktarı antrenmanı karşılamayacak kadar azalabilir.',
    ], p: [
      'Sonuçlar genel bilgilendirme içindir ve kişisel beslenme planının yerini tutmaz.',
    ] },
  ],
  faq: [
    ['Günde kaç gram karbonhidrat almalıyım?', 'Genel öneri, günlük enerjinin %45–65\'inin karbonhidrattan gelmesidir. 2000 kcal için bu 225 ile 325 gram arasına denk gelir. Kesin miktar kalori ihtiyacınıza ve hareket düzeyinize bağlıdır.'],
    ['Karbonhidrat gramı kaloriden nasıl hesaplanır?', 'Kalori, karbonhidrat yüzdesiyle çarpılıp 100\'e bölünür; çıkan kalori 4\'e bölünür. 2000 kcal ve %50 için 1000 ÷ 4 = 250 gram bulunur.'],
    ['Kilo vermek için karbonhidratı kesmek şart mı?', 'Hayır. Kilo kaybını belirleyen temel etken toplam kalori açığıdır. Karbonhidratı azaltmak bazı kişilerde kalori kontrolünü kolaylaştırır, ancak tümüyle kesmek zorunlu değildir ve sürdürülebilir olmayabilir.'],
    ['Sporcular neden daha fazla karbonhidrata ihtiyaç duyar?', 'Orta ve yüksek yoğunluklu egzersizde kaslar ağırlıklı olarak depolanmış karbonhidratı (glikojen) kullanır. Antrenman süresi ve yoğunluğu arttıkça bu depoları yenilemek için gereken miktar yükselir.'],
    ['Lif karbonhidrat hesabına dahil mi?', 'Besin etiketlerinde lif çoğunlukla ayrı bir satırda gösterilir. Bu araç toplam karbonhidrat hedefi verir ve lif için ayrı bir düzeltme yapmaz.'],
    ['Akşam karbonhidrat yemek kilo aldırır mı?', 'Kilo değişimini günlük toplam enerji dengesi belirler; karbonhidratın saati tek başına belirleyici değildir. Yine de geç saatte büyük porsiyonlar toplam kaloriyi artırmayı kolaylaştırabilir.'],
    ['Diyabetim var, bu sonucu kullanabilir miyim?', 'Diyabette karbonhidrat miktarı ve dağılımı ilaç tedavisiyle birlikte kişiye özel planlanır. Buradaki sonuç genel bilgi niteliğindedir; kendi planınız için hekiminize ve diyetisyeninize danışın.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; kalori ve kilo bilgileriniz sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['makro-besin-hesapla', 'protein-ihtiyaci-hesapla', 'kalori-hesapla', 'gunluk-lif-ihtiyaci-hesapla', 'bazal-metabolizma-hesapla'],
};
