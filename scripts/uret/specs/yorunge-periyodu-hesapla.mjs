export default {
  slug: 'yorunge-periyodu-hesapla',
  title: 'Yörünge Periyodu Hesaplama',
  h1Tail: 'Kepler\'in üçüncü yasası',
  pageTitle: 'Yörünge Periyodu Hesaplama – Uydu ve Gezegen Dolanma Süresi',
  description: 'Bir uydunun ya da gezegenin yörünge periyodunu Kepler\'in üçüncü yasasıyla hesaplayın. Yükseklik ya da yörünge yarıçapından dolanma süresi ve hız.',
  card: 'Uydu yüksekliğinden ya da yörünge yarıçapından dolanma süresini ve yörünge hızını Kepler\'in üçüncü yasasıyla bulun.',
  category: 'bilim',
  keywords: ['yörünge periyodu hesaplama', 'dolanma süresi hesaplama', 'kepler üçüncü yasa', 'uydu periyodu', 'yörünge hızı hesaplama', 'yer sabit yörünge yüksekliği', 'uydu kaç dakikada döner'],
  lead: 'Bir uydunun, ayın ya da gezegenin merkezdeki cisim çevresinde bir tam turu ne kadar sürede tamamladığını hesaplayın. Araç Kepler\'in üçüncü yasasının Newton biçimini, <strong>T = 2π · √(a³ / (G · M))</strong> bağıntısını kullanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'merkez', label: 'Merkezdeki cisim', type: 'select', options: [['dunya', 'Dünya'], ['gunes', 'Güneş'], ['ay', 'Ay'], ['mars', 'Mars'], ['jupiter', 'Jüpiter'], ['ozel', 'Özel değer gireceğim']] },
    { id: 'kutle', label: 'Özel kütle (kg)', type: 'text', placeholder: 'Örn. 5.972e24', hint: 'Yalnızca "Özel değer" seçiliyse kullanılır.' },
    { id: 'yaricap', label: 'Özel yarıçap (km)', type: 'text', placeholder: 'Örn. 6371', hint: 'Yalnızca "Özel değer" seçiliyse ve yükseklik giriliyorsa gerekir.' },
    { id: 'tur', label: 'Uzaklık türü', type: 'select', options: [['yukseklik', 'Yüzeyden yükseklik'], ['merkez', 'Merkezden uzaklık (yörünge yarıçapı)']] },
    { id: 'mesafe', label: 'Uzaklık (km)', type: 'text', placeholder: 'Örn. 400', hint: 'Büyük değerler için 1.496e8 gibi bilimsel gösterim kullanılabilir.' },
  ],
  compute(v, h) {
    const G = 6.6743e-11;
    const tablo = { dunya: [5.972e24, 6371], gunes: [1.989e30, 695700], ay: [7.342e22, 1737.4], mars: [6.417e23, 3389.5], jupiter: [1.898e27, 69911] };
    let M, R;
    if (v.merkez === 'ozel') {
      M = h.pos(v.kutle, 'Özel kütle');
      R = v.tur === 'merkez' ? h.nonneg(h.opt(v.yaricap, 0, 'Özel yarıçap'), 'Özel yarıçap') : h.pos(v.yaricap, 'Özel yarıçap');
    } else [M, R] = tablo[v.merkez] || tablo.dunya;
    let aKm;
    if (v.tur === 'merkez') {
      aKm = h.pos(v.mesafe, 'Uzaklık');
      if (aKm < R) h.err(`Yörünge yarıçapı merkezdeki cismin yarıçapından (${h.fmt(R, 1)} km) küçük olamaz.`);
    } else aKm = R + h.nonneg(v.mesafe, 'Uzaklık');
    const a = aKm * 1000;
    const T = 2 * Math.PI * Math.sqrt(a * a * a / (G * M));
    if (!Number.isFinite(T)) h.err('Sonuç hesaplanamadı; değerleri kontrol edin.');
    const hiz = 2 * Math.PI * a / T;
    let s = Math.round(T);
    const gun = Math.floor(s / 86400); s -= gun * 86400;
    const sa = Math.floor(s / 3600); s -= sa * 3600;
    const dk = Math.floor(s / 60); s -= dk * 60;
    const parca = [];
    if (gun) parca.push(h.fmt(gun, 0) + ' gün');
    if (gun || sa) parca.push(sa + ' sa');
    if (gun || sa || dk) parca.push(dk + ' dk');
    parca.push(s + ' sn');
    return {
      rows: [
        ['Yörünge periyodu', parca.join(' ')],
        ['Saniye', h.fmt(T, 1) + ' s'],
        ['Dakika', h.fmt(T / 60, 2) + ' dk'],
        ['Gün', h.fmt(T / 86400, 4) + ' gün'],
        ['Yörünge hızı', h.fmt(hiz / 1000, 3) + ' km/s'],
        ['Yörünge yarıçapı', h.fmt(aKm, 1) + ' km'],
        ['Günlük tur sayısı', h.fmt(86400 / T, 2)],
      ],
      note: 'Dairesel yörünge ve merkezdeki cisme göre ihmal edilebilir uydu kütlesi varsayılmıştır. Eliptik yörüngede "uzaklık" yerine yarı büyük eksen kullanılır; hız satırı ortalama değerdir.',
    };
  },
  cases: [
    { in: { merkez: 'dunya', tur: 'yukseklik', mesafe: '400' }, out: { 'Yörünge periyodu': '1 sa 32 dk 25 sn', 'Dakika': '92,42 dk', 'Yörünge hızı': '7,672 km/s', 'Yörünge yarıçapı': '6.771 km' } },
    { in: { merkez: 'dunya', tur: 'merkez', mesafe: '42164' }, out: { 'Yörünge periyodu': '23 sa 56 dk 5 sn', 'Saniye': '86.164,8 s', 'Yörünge hızı': '3,075 km/s' } },
    { in: { merkez: 'dunya', tur: 'merkez', mesafe: '384400' }, out: { 'Yörünge periyodu': '27 gün 10 sa 51 dk 17 sn', 'Gün': '27,4523 gün', 'Yörünge hızı': '1,018 km/s' } },
    { in: { merkez: 'gunes', tur: 'merkez', mesafe: '1.496e8' }, out: { 'Gün': '365,2105 gün', 'Yörünge hızı': '29,789 km/s' } },
    { in: { merkez: 'mars', tur: 'yukseklik', mesafe: '300' }, out: { 'Yörünge periyodu': '1 sa 53 dk 24 sn' } },
    { in: { merkez: 'ay', tur: 'yukseklik', mesafe: '100' }, out: { 'Yörünge periyodu': '1 sa 57 dk 49 sn', 'Yörünge hızı': '1,633 km/s' } },
    { in: { merkez: 'ozel', kutle: '1e24', yaricap: '9000', tur: 'yukseklik', mesafe: '1000' }, out: { 'Yörünge periyodu': '6 sa 45 dk 21 sn', 'Yörünge yarıçapı': '10.000 km' } },
    { in: { merkez: 'dunya', tur: 'merkez', mesafe: '5000' }, error: true },
    { in: { merkez: 'dunya', tur: 'yukseklik', mesafe: '' }, error: true },
  ],
  howto: [
    'Çevresinde dönülen merkezdeki cismi seçin: Dünya uyduları için Dünya, gezegenler için Güneş. Listede olmayan bir cisim için "Özel değer" seçip kütlesini (ve gerekiyorsa yarıçapını) yazın.',
    'Uzaklık türünü belirleyin. Uydu yükseklikleri genellikle yüzeyden ölçülür; gezegen ve ay yörüngeleri ise merkezden uzaklıkla verilir.',
    'Uzaklığı kilometre olarak yazın. Dünya–Güneş arası gibi büyük değerleri 1.496e8 biçiminde girebilirsiniz.',
    '"Hesapla" düğmesine basın. Periyot gün, saat, dakika ve saniye olarak; ayrıca yörünge hızı ve bir günde atılan tur sayısı listelenir.',
  ],
  sections: [
    { h: 'Kepler\'in üçüncü yasası', p: [
      'Johannes Kepler, on yedinci yüzyılın başında gezegen gözlemlerinden şu düzeni çıkardı: bir gezegenin Güneş çevresindeki dolanma süresinin karesi, yörüngesinin yarı büyük ekseninin küpüyle orantılıdır. Yani <strong>T² ∝ a³</strong>. Güneş\'ten uzaktaki gezegenler yalnızca daha uzun yol katettikleri için değil, aynı zamanda daha yavaş hareket ettikleri için de turlarını çok daha uzun sürede tamamlar.',
      'Newton, kütle çekim yasasıyla bu orantının sabitini de buldu. Dairesel yörüngede merkezcil kuvveti kütle çekimi sağlar; buradan <strong>T = 2π · √(a³ / (G · M))</strong> elde edilir. M merkezdeki cismin kütlesi, a yörünge yarıçapı (elipste yarı büyük eksen), G evrensel çekim sabitidir. Dolanan cismin kütlesi, merkezdeki cisme göre çok küçük olduğu sürece sonucu etkilemez: aynı yörüngedeki bir vida ile bir uzay istasyonu aynı sürede döner.',
    ] },
    { h: 'Yükseklik mi, yörünge yarıçapı mı?', p: [
      'Formüldeki a, merkezdeki cismin <strong>merkezinden</strong> ölçülen uzaklıktır. Haberlerde bir uydunun "400 km yükseklikte" olduğu söylendiğinde bu yüzeyden ölçülmüş değerdir; yörünge yarıçapını bulmak için Dünya\'nın yarıçapı (yaklaşık 6371 km) eklenir ve a = 6771 km olur. Bu ayrımı atlamak en sık yapılan hatadır ve sonucu tümüyle bozar. "Uzaklık türü" seçeneği bu dönüşümü sizin yerinize yapar ve kullanılan yörünge yarıçapını sonuçta gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Alçak yörünge (400 km):</strong> a = 6771 km = 6,771 × 10⁶ m, M = 5,972 × 10²⁴ kg. T = 2π · √((6,771 × 10⁶)³ / (6,6743 × 10⁻¹¹ × 5,972 × 10²⁴)) ≈ 5545 s, yani yaklaşık 92,4 dakika. Bu yükseklikteki bir uzay istasyonu günde yaklaşık 15,6 tur atar ve 7,67 km/s hızla ilerler.',
      '<strong>Yer sabit yörünge:</strong> Yörünge yarıçapı 42 164 km alındığında periyot 23 saat 56 dakika 5 saniye çıkar. Bu, Dünya\'nın yıldızlara göre kendi ekseninde bir tam dönüş süresine (yıldız günü) eşittir; dolayısıyla ekvator üzerindeki böyle bir uydu gökyüzünde hep aynı noktada görünür. Yüzeyden yüksekliği yaklaşık 35 790 km\'dir. Televizyon yayın uydularının çanak antenleri bu sayede sabit bir yöne bakar.',
      '<strong>Ay:</strong> Merkezden 384 400 km uzaklık için periyot yaklaşık 27,45 gün bulunur. Ay\'ın gözlenen yıldız ayı yaklaşık 27,32 gündür; küçük fark, Ay\'ın kütlesinin Dünya\'ya göre ihmal edilemeyecek kadar büyük olmasından kaynaklanır.',
      '<strong>Dünya\'nın yılı:</strong> Merkez olarak Güneş seçilip uzaklık 1,496 × 10⁸ km yazıldığında periyot yaklaşık 365,2 gün, yörünge hızı yaklaşık 29,8 km/s çıkar.',
    ] },
    { h: 'Dünya çevresindeki yörünge türleri', ul: [
      '<strong>Alçak Dünya yörüngesi:</strong> yaklaşık 200–2000 km yükseklik; periyot kabaca 90 dakika ile 2 saat arası. Gözlem uyduları ve insanlı istasyonlar buradadır.',
      '<strong>Orta Dünya yörüngesi:</strong> konum belirleme uyduları yaklaşık 20 000 km yükseklikte, yaklaşık 12 saatlik periyotla döner.',
      '<strong>Yer eş zamanlı / yer sabit yörünge:</strong> yaklaşık 35 790 km yükseklik; periyot bir yıldız günü.',
      '<strong>Ay:</strong> yaklaşık 384 400 km uzaklık; periyot yaklaşık 27,3 gün.',
    ] },
    { h: 'Yörünge hızı', p: [
      'Dairesel yörüngede hız sabittir ve çevrenin periyoda bölümüyle bulunur: v = 2π · a / T. Aynı sonuç v = √(G · M / a) bağıntısından da çıkar. Yörünge büyüdükçe hız azalır: alçak yörüngede yaklaşık 7,7 km/s olan hız, yer sabit yörüngede 3,07 km/s\'ye, Ay\'ın uzaklığında yaklaşık 1 km/s\'ye düşer. Bu, sezgiye aykırı bir sonuç doğurur: daha yüksek yörüngeye çıkmak için motor ateşlenip hız kazanılır, ama varılan yüksek yörüngede araç eskisinden daha yavaş döner.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç iki cisimli, ideal bir sistem varsayar: merkezdeki cisim küresel simetriktir, dolanan cismin kütlesi ihmal edilir, atmosfer sürtünmesi ve üçüncü cisimlerin çekimi yoktur. Gerçekte alçak yörüngedeki uydular ince atmosfer nedeniyle zamanla alçalır; Dünya\'nın basıklığı yörünge düzlemini yavaşça döndürür; Ay ve Güneş\'in çekimi yüksek yörüngeleri etkiler. Eliptik yörüngelerde periyot yine aynı formülle, a yerine yarı büyük eksen konularak bulunur; ancak hız yörünge boyunca değişir.',
      'Kullanılan kütle ve yarıçaplar yuvarlanmış başvuru değerleridir. Sonuçlar ders, ödev ve merak amaçlı hesaplar için uygundur; gerçek uydu operasyonlarının gerektirdiği duyarlılığı taşımaz.',
    ] },
  ],
  faq: [
    ['Yörünge periyodu formülü nedir?', 'T = 2π · √(a³ / (G · M)). a yörünge yarıçapı ya da yarı büyük eksen (metre), M merkezdeki cismin kütlesi (kg), G = 6,6743 × 10⁻¹¹ N·m²/kg²\'dir. Sonuç saniye cinsinden çıkar.'],
    ['Uydunun kütlesi periyodu etkiler mi?', 'Uydu, merkezdeki cisme göre çok hafifse hayır. Aynı yörüngedeki bütün cisimler aynı sürede döner. Kütleler birbirine yakın olduğunda (çift yıldızlar, Dünya–Ay gibi) formülde iki kütlenin toplamı kullanılır ve sonuç bir miktar değişir.'],
    ['Uzay istasyonu Dünya çevresinde ne kadar sürede döner?', 'Yaklaşık 400 km yükseklikte periyot 92 dakika civarındadır. Bu, istasyondakilerin bir günde yaklaşık 15–16 kez gün doğumu görmesi anlamına gelir.'],
    ['Yer sabit yörünge neden hep aynı yükseklikte?', 'Periyot yalnızca yörünge yarıçapına bağlıdır. Dünya\'nın dönüş süresine eşit periyodu veren tek bir yarıçap vardır: yaklaşık 42 164 km. Bu yüzden bütün yer sabit uydular ekvator üzerinde, yaklaşık 35 790 km yükseklikteki aynı halkada dizilir.'],
    ['Yüzeyden yükseklik yerine neden merkezden uzaklık kullanılıyor?', 'Kütle çekimi cisimlerin merkezleri arasındaki uzaklığa göre işler. Küresel bir gezegen dışarıdaki cisimlere, tüm kütlesi merkezindeymiş gibi etki eder. Yükseklik girdiğinizde araç gezegenin yarıçapını kendisi ekler.'],
    ['Periyottan yörünge yarıçapını bulabilir miyim?', 'Evet, formül tersine çevrilir: a = ∛(G · M · T² / 4π²). Bu araç doğrudan bu yönde hesap yapmaz; ancak farklı uzaklıklar deneyerek istediğiniz periyoda hızla yaklaşabilirsiniz.'],
    ['Başka bir gezegenin uydusunu nasıl hesaplarım?', 'Mars ve Jüpiter listede hazırdır. Diğerleri için "Özel değer gireceğim" seçeneğiyle gezegenin kütlesini kilogram, yarıçapını kilometre olarak yazın ve uzaklığı girin.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez ya da saklanmaz.'],
  ],
  related: ['kacis-hizi-hesapla', 'kutle-cekim-kuvveti-hesapla', 'merkezcil-kuvvet-hesapla', 'aci-hizi-hesapla', 'gezegen-agirligi-hesapla'],
};
