export default {
  slug: 'yari-omur-hesapla',
  title: 'Yarı Ömür Hesaplama',
  h1Tail: 'radyoaktif bozunma',
  pageTitle: 'Yarı Ömür Hesaplama – Kalan Miktar, Geçen Süre ve Yarılanma',
  description: 'Radyoaktif bozunmada kalan miktarı, geçen süreyi, yarı ömrü ya da başlangıç miktarını hesaplayın. N = N₀·(1/2)^(t/T) formülü, bozunma sabitiyle birlikte.',
  card: 'Yarı ömür formülüyle kalan miktarı, geçen süreyi, yarılanma süresini ya da başlangıç miktarını üç bilinenden bulun.',
  category: 'bilim',
  keywords: ['yarı ömür hesaplama', 'yarılanma süresi hesaplama', 'radyoaktif bozunma hesaplama', 'kalan madde miktarı', 'bozunma sabiti', 'karbon 14 yaş tayini', 'yarı ömür formülü'],
  lead: 'Yarı ömür, bozunan bir maddenin miktarının yarıya inmesi için geçen süredir. Bu araç <strong>N = N₀ · (1/2)<sup>t/T</sup></strong> bağıntısındaki dört büyüklükten üçünü alır, dördüncüsünü hesaplar; bozunma sabitini ve kaç yarı ömür geçtiğini de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['kalan', 'Kalan miktar (N)'], ['sure', 'Geçen süre (t)'], ['yari', 'Yarı ömür (T)'], ['baslangic', 'Başlangıç miktarı (N₀)']] },
    { id: 'baslangic', label: 'Başlangıç miktarı (N₀)', type: 'number', placeholder: 'Örn. 100', hint: 'Gram, mol, atom sayısı, aktivite ya da yüzde; kalan miktarla aynı birimde.' },
    { id: 'kalan', label: 'Kalan miktar (N)', type: 'number', placeholder: 'Örn. 25' },
    { id: 'yariOmur', label: 'Yarı ömür (T)', type: 'number', placeholder: 'Örn. 5730', hint: 'Geçen süreyle aynı zaman biriminde (saniye, gün, yıl…).' },
    { id: 'sure', label: 'Geçen süre (t)', type: 'number', placeholder: 'Örn. 11460' },
  ],
  compute(v, h) {
    const bul = ['kalan', 'sure', 'yari', 'baslangic'].includes(v.bul) ? v.bul : 'kalan';
    let N0, N, T, t;
    if (bul !== 'baslangic') N0 = h.pos(v.baslangic, 'Başlangıç miktarı');
    if (bul !== 'kalan') N = h.pos(v.kalan, 'Kalan miktar');
    if (bul !== 'yari') T = h.pos(v.yariOmur, 'Yarı ömür');
    if (bul !== 'sure') t = bul === 'yari' ? h.pos(v.sure, 'Geçen süre') : h.nonneg(v.sure, 'Geçen süre');
    if ((bul === 'sure' || bul === 'yari') && N > N0) h.err('Kalan miktar başlangıç miktarından büyük olamaz; iki değeri kontrol edin.');
    if (bul === 'kalan') N = N0 * Math.pow(0.5, t / T);
    else if (bul === 'baslangic') N0 = N * Math.pow(2, t / T);
    else if (bul === 'sure') t = T * Math.log(N0 / N) / Math.LN2;
    else {
      if (N === N0) h.err('Kalan miktar başlangıç miktarına eşitse bozunma olmamıştır; yarı ömür bu verilerden bulunamaz.');
      T = t * Math.LN2 / Math.log(N0 / N);
    }
    if (![N0, N, T, t].every(Number.isFinite)) h.err('Sonuç hesaplanamayacak kadar büyük; değerleri kontrol edin.');
    const satir = {
      kalan: ['Kalan miktar', h.sig(N, 6)],
      sure: ['Geçen süre', h.sig(t, 6)],
      yari: ['Yarı ömür', h.sig(T, 6)],
      baslangic: ['Başlangıç miktarı', h.sig(N0, 6)],
    };
    const rows = [satir[bul]];
    for (const k of ['baslangic', 'kalan', 'yari', 'sure']) if (k !== bul) rows.push(satir[k]);
    rows.push(['Kalan oran', '%' + h.sig(N / N0 * 100, 6)]);
    rows.push(['Bozunan miktar', h.sig(N0 - N, 6)]);
    rows.push(['Geçen yarı ömür sayısı', h.sig(t / T, 6)]);
    rows.push(['Bozunma sabiti (λ)', h.sig(Math.LN2 / T, 6) + ' (1/zaman birimi)']);
    rows.push(['Ortalama ömür (τ)', h.sig(T / Math.LN2, 6)]);
    return { rows, note: 'Miktarlar girdiğiniz birimde, süreler girdiğiniz zaman birimindedir. Yarı ömür ile geçen süre aynı birimde yazılmalıdır.' };
  },
  cases: [
    { in: { bul: 'kalan', baslangic: '100', yariOmur: '5730', sure: '11460' }, out: { 'Kalan miktar': '25', 'Kalan oran': '%25', 'Bozunan miktar': '75', 'Geçen yarı ömür sayısı': '2', 'Bozunma sabiti (λ)': '0,000120968 (1/zaman birimi)' } },
    { in: { bul: 'sure', baslangic: '100', kalan: '12,5', yariOmur: '10' }, out: { 'Geçen süre': '30', 'Geçen yarı ömür sayısı': '3' } },
    { in: { bul: 'yari', baslangic: '200', kalan: '50', sure: '20' }, out: { 'Yarı ömür': '10', 'Kalan oran': '%25' } },
    { in: { bul: 'baslangic', kalan: '5', yariOmur: '2', sure: '6' }, out: { 'Başlangıç miktarı': '40', 'Bozunan miktar': '35' } },
    { in: { bul: 'kalan', baslangic: '80', yariOmur: '8', sure: '24' }, out: { 'Kalan miktar': '10', 'Bozunan miktar': '70' } },
    { in: { bul: 'kalan', baslangic: '500', yariOmur: '30,17', sure: '10' }, out: { 'Kalan miktar': '397,367' } },
    { in: { bul: 'sure', baslangic: '100', kalan: '70', yariOmur: '5730' }, out: { 'Geçen süre': '2.948,5' } },
    { in: { bul: 'kalan', baslangic: '100', yariOmur: '5730', sure: '0' }, out: { 'Kalan miktar': '100', 'Kalan oran': '%100' } },
    { in: { bul: 'sure', baslangic: '50', kalan: '80', yariOmur: '10' }, error: true },
    { in: { bul: 'kalan', baslangic: '100', yariOmur: '0', sure: '10' }, error: true },
    { in: { bul: 'yari', baslangic: '100', kalan: '100', sure: '5' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden neyi hesaplamak istediğinizi seçin: kalan miktar, geçen süre, yarı ömür ya da başlangıç miktarı.',
    'Diğer üç değeri yazın. Bulunacak büyüklüğün alanını boş bırakabilirsiniz.',
    'Miktarları aynı birimde (gram, mol, atom sayısı, becquerel, yüzde), süreleri de aynı zaman biriminde (gün ile gün, yıl ile yıl) girdiğinizden emin olun.',
    '"Hesapla" düğmesine basın. Aranan değerin yanında kalan oran, bozunan miktar, geçen yarı ömür sayısı, bozunma sabiti ve ortalama ömür de listelenir.',
  ],
  sections: [
    { h: 'Yarı ömür ne demektir?', p: [
      'Kararsız bir atom çekirdeğinin ne zaman bozunacağı önceden bilinemez; bozunma rastlantısal bir olaydır. Ancak çok sayıda çekirdek bir arada olduğunda istatistik devreye girer: belirli bir sürede çekirdeklerin her zaman aynı oranı bozunur. Çekirdeklerin yarısının bozunması için geçen süreye <strong>yarı ömür</strong> ya da yarılanma süresi denir ve her izotop için sabittir. Sıcaklık, basınç ya da kimyasal bağlar gibi dış koşullar bu süreyi pratikte değiştirmez.',
      'Her yarı ömürde eldeki miktarın yarısı kalır: bir yarı ömür sonra yüzde 50, iki yarı ömür sonra yüzde 25, üç yarı ömür sonra yüzde 12,5. Azalma doğrusal değil üsteldir; bu yüzden madde kuramsal olarak hiçbir zaman tam sıfıra inmez. Yaklaşık on yarı ömür sonra başlangıçtaki miktarın binde biri kalır.',
    ] },
    { h: 'Formüller', p: [
      'Temel bağıntı <strong>N = N₀ · (1/2)<sup>t/T</sup></strong> biçimindedir. N₀ başlangıç miktarı, N geçen t süresi sonunda kalan miktar, T yarı ömürdür. t/T oranı kaç yarı ömür geçtiğini gösterir ve tam sayı olmak zorunda değildir.',
      'Aynı yasa bozunma sabiti λ ile de yazılır: N = N₀ · e<sup>−λt</sup>. İkisi arasındaki bağ <strong>λ = ln 2 / T ≈ 0,693 / T</strong> eşitliğidir. Bir çekirdeğin bozunmadan önceki ortalama yaşam süresi τ = 1/λ = T / ln 2 ≈ 1,443 · T olur. Bilinmeyen süre ya da yarı ömür olduğunda logaritma alınır: t = T · log₂(N₀/N) ve T = t / log₂(N₀/N). Araç bu dönüşümleri sizin yerinize yapar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Kalan miktar:</strong> Yarı ömrü 5730 yıl olan karbon-14\'ten 100 birim içeren bir örnekte 11 460 yıl sonra ne kadar kalır? t/T = 11 460 / 5730 = 2 yarı ömür geçmiştir. N = 100 × (1/2)² = 25 birim; 75 birim bozunmuştur.',
      '<strong>Örnek 2 – Geçen süre:</strong> Yarı ömrü 10 gün olan bir maddenin 100 gramından 12,5 gram kalmışsa oran 100 / 12,5 = 8 = 2³ olduğundan üç yarı ömür, yani 30 gün geçmiştir.',
      '<strong>Örnek 3 – Yarı ömür:</strong> 200 birimlik aktivite 20 saatte 50 birime düşüyorsa oran 4 = 2² olur; 20 saatte iki yarı ömür geçmiştir ve yarı ömür 10 saattir.',
      '<strong>Örnek 4 – Başlangıç miktarı:</strong> Yarı ömrü 2 saat olan bir maddeden 6 saat sonra 5 mg kalmışsa üç yarı ömür geçmiştir; başlangıçta 5 × 2³ = 40 mg vardı.',
      '<strong>Örnek 5 – Tam sayı olmayan durum:</strong> Karbon-14 oranı başlangıcın yüzde 70\'ine inmiş bir örneğin yaşı t = 5730 × log₂(100/70) ≈ 2948,5 yıldır. Kafadan çözülemeyen bu tür hesaplar aracın asıl kolaylık sağladığı yerdir.',
    ] },
    { h: 'Bazı izotopların yaklaşık yarı ömürleri', p: [
      'Aşağıdaki değerler yuvarlanmış, yaygın olarak anılan değerlerdir; duyarlı hesaplar için güncel nükleer veri tablolarına başvurun.',
    ], ul: [
      '<strong>Teknesyum-99m:</strong> yaklaşık 6 saat (tıbbi görüntüleme)',
      '<strong>Radon-222:</strong> yaklaşık 3,8 gün',
      '<strong>İyot-131:</strong> yaklaşık 8 gün',
      '<strong>Kobalt-60:</strong> yaklaşık 5,3 yıl',
      '<strong>Sezyum-137:</strong> yaklaşık 30 yıl',
      '<strong>Karbon-14:</strong> yaklaşık 5730 yıl',
      '<strong>Potasyum-40:</strong> yaklaşık 1,25 milyar yıl',
      '<strong>Uranyum-238:</strong> yaklaşık 4,5 milyar yıl',
    ] },
    { h: 'Kullanım alanları', p: [
      '<strong>Yaş tayini:</strong> Canlılar yaşadıkları sürece atmosferle karbon alışverişi yapar ve bünyelerindeki karbon-14 oranı yaklaşık sabit kalır. Ölümden sonra alışveriş durur, karbon-14 bozunarak azalır. Kalan oran ölçülerek organik kalıntının yaşı hesaplanır. Yöntem kabaca elli bin yıla kadar olan örneklerde işe yarar; daha yaşlı kayaçlar için uranyum-kurşun ya da potasyum-argon gibi çok uzun yarı ömürlü çiftler kullanılır. Gerçek tarihlendirmede atmosferdeki karbon-14 düzeyinin zaman içindeki değişimi için kalibrasyon uygulanır; bu araç yalnızca temel üstel hesabı yapar.',
      '<strong>Tıp:</strong> Görüntülemede kullanılan izotopların kısa yarı ömürlü olması, hastanın aldığı dozun kısa sürede azalması demektir. İlaçların vücuttaki derişiminin yarıya inme süresi için de "yarı ömür" terimi kullanılır ve birçok ilaçta azalma aynı üstel yasaya yaklaşık olarak uyar; ancak ilaç dozu ve doz aralığı kararları yalnızca hekim ve eczacı tarafından verilmelidir.',
      '<strong>Çevre ve enerji:</strong> Nükleer atıkların ne kadar süre korunaklı saklanması gerektiği ve bir kaza sonrası bölgedeki ışınımın ne hızla azalacağı, ilgili izotopların yarı ömürleriyle belirlenir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata doğrusal düşünmektir: "bir yarı ömürde yarısı bozunuyorsa iki yarı ömürde tamamı biter" çıkarımı yanlıştır; her adımda <em>kalan</em> miktarın yarısı gider. İkinci hata birim karışıklığıdır: yarı ömür yıl, süre gün olarak yazılırsa sonuç anlamsız olur. Üçüncüsü, "bozunan miktar" ile "kalan miktar"ın karıştırılmasıdır; soru hangisini istiyorsa ona göre satırı okuyun.',
      'Yasa çok sayıda çekirdek için geçerli bir istatistik yasadır; birkaç atomdan oluşan örneklerde gerçek sayılar dalgalanır. Bozunma ürünü de radyoaktifse toplam aktivite bu basit formülle izlenemez. Sonuçlar eğitim amaçlıdır; radyasyon güvenliği, tıbbi doz ve atık yönetimi gibi konularda yetkili uzmanların hesapları esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Yarı ömür formülü nedir?', 'N = N₀ · (1/2)^(t/T). N₀ başlangıç miktarı, N kalan miktar, t geçen süre, T yarı ömürdür. Bozunma sabitiyle yazımı N = N₀ · e^(−λt) olup λ = 0,693 / T\'dir.'],
    ['3 yarı ömür sonra maddenin ne kadarı kalır?', 'Sekizde biri, yani yüzde 12,5\'i kalır; yüzde 87,5\'i bozunmuş olur. Genel olarak n yarı ömür sonra kalan kesir (1/2)ⁿ\'dir.'],
    ['Yarı ömür sıcaklık ya da basınçla değişir mi?', 'Radyoaktif bozunma çekirdeğe ait bir özelliktir ve gündelik koşullardaki sıcaklık, basınç ya da kimyasal durum değişikliklerinden pratikte etkilenmez. Bu kararlılık, yarı ömrü güvenilir bir saat yapar.'],
    ['Miktar olarak gram yerine yüzde ya da aktivite yazabilir miyim?', 'Evet. Formül oranlarla çalışır; başlangıç ve kalan değer aynı birimde olduğu sürece gram, mol, atom sayısı, becquerel cinsinden aktivite ya da yüzde kullanabilirsiniz. Sonuç da aynı birimdedir.'],
    ['Bozunma sabiti ile yarı ömür arasındaki ilişki nedir?', 'λ = ln 2 / T. Yarı ömür kısaldıkça bozunma sabiti büyür, yani madde daha hızlı bozunur. Aktivite A = λ · N ile bulunur; bunun için λ saniye⁻¹ biriminde, N çekirdek sayısı olarak alınmalıdır.'],
    ['Radyoaktif madde ne zaman tamamen biter?', 'Kuramsal olarak hiçbir zaman; miktar her yarı ömürde yarıya iner ama sıfıra ulaşmaz. Pratikte yaklaşık on yarı ömür sonra başlangıcın binde biri, yirmi yarı ömür sonra milyonda biri kalır.'],
    ['Kalan miktar başlangıçtan büyük girilirse ne olur?', 'Bozunmada miktar yalnızca azalabileceği için araç bu durumda hata verir. Değerleri yanlış alanlara yazmış olabilirsiniz; başlangıç ve kalan miktarı kontrol edin.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kutle-enerji-hesapla', 'tanecik-sayisi-hesapla', 'mol-hesapla', 'foton-enerjisi-hesapla', 'bilimsel-gosterim-cevir'],
};
