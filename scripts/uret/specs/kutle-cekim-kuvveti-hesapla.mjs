export default {
  slug: 'kutle-cekim-kuvveti-hesapla',
  title: 'Kütle Çekim Kuvveti Hesaplama',
  h1Tail: 'Newton\'un evrensel çekim yasası',
  pageTitle: 'Kütle Çekim Kuvveti Hesaplama – Newton Evrensel Çekim Yasası',
  description: 'İki kütle arasındaki çekim kuvvetini F = G·m₁·m₂/r² ile hesaplayın. Gezegen ölçeğindeki büyük sayılar için bilimsel gösterim desteklenir.',
  card: 'İki kütle ve aralarındaki uzaklıktan Newton\'un evrensel çekim yasasıyla kuvveti ve çekim ivmelerini hesaplayın.',
  category: 'bilim',
  keywords: ['kütle çekim kuvveti hesaplama', 'evrensel çekim yasası', 'gravitasyon kuvveti', 'F = G m1 m2 / r2', 'çekim sabiti G', 'dünya ay çekim kuvveti', 'çekim ivmesi hesaplama'],
  lead: 'Kütlesi olan her iki cisim birbirini çeker. Bu araç Newton\'un evrensel çekim yasası <strong>F = G · m₁ · m₂ / r²</strong> ile iki kütle arasındaki kuvveti ve her kütlenin diğerinin bulunduğu yerde oluşturduğu çekim ivmesini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'm1', label: 'Birinci kütle m₁ (kg)', type: 'text', placeholder: 'Örn. 5.972e24', hint: 'Büyük sayılar için bilimsel gösterim: 5.972e24 = 5,972 × 10²⁴' },
    { id: 'm2', label: 'İkinci kütle m₂ (kg)', type: 'text', placeholder: 'Örn. 70' },
    { id: 'r', label: 'Merkezler arası uzaklık', type: 'text', placeholder: 'Örn. 6.371e6' },
    { id: 'rBirim', label: 'Uzaklık birimi', type: 'select', options: [['m', 'Metre (m)'], ['km', 'Kilometre (km)']] },
  ],
  compute(v, h) {
    const G = 6.6743e-11; // N·m²/kg²
    const m1 = h.pos(v.m1, 'Birinci kütle');
    const m2 = h.pos(v.m2, 'İkinci kütle');
    const r = h.pos(v.r, 'Merkezler arası uzaklık') * (v.rBirim === 'km' ? 1000 : 1);
    const F = G * m1 * m2 / (r * r);
    if (!Number.isFinite(F)) h.err('Sonuç hesaplanamayacak kadar büyük; değerleri kontrol edin.');
    return {
      rows: [
        ['Kütle çekim kuvveti', h.sig(F, 6) + ' N'],
        ['m₁ kütlesinin m₂ konumundaki çekim ivmesi', h.sig(G * m1 / (r * r), 6) + ' m/s²'],
        ['m₂ kütlesinin m₁ konumundaki çekim ivmesi', h.sig(G * m2 / (r * r), 6) + ' m/s²'],
        ['Uzaklık', h.sig(r, 6) + ' m'],
      ],
      note: 'G = 6,6743 × 10⁻¹¹ N·m²/kg² alınmıştır. Kuvvet iki cisme de eşit büyüklükte ve zıt yönde etki eder. Uzaklık, kütle merkezleri arasında ölçülür.',
    };
  },
  cases: [
    { in: { m1: '5.972e24', m2: '70', r: '6.371e6', rBirim: 'm' }, out: { 'Kütle çekim kuvveti': '687,398 N', 'm₁ kütlesinin m₂ konumundaki çekim ivmesi': '9,81997 m/s²' } },
    { in: { m1: '5.972e24', m2: '7.348e22', r: '384400', rBirim: 'km' }, out: { 'Kütle çekim kuvveti': '1,98211 × 10^20 N', 'm₁ kütlesinin m₂ konumundaki çekim ivmesi': '0,00269748 m/s²', 'Uzaklık': '384.400.000 m' } },
    { in: { m1: '1', m2: '1', r: '1', rBirim: 'm' }, out: { 'Kütle çekim kuvveti': '6,6743 × 10^-11 N' } },
    { in: { m1: '60', m2: '80', r: '0,5', rBirim: 'm' }, out: { 'Kütle çekim kuvveti': '0,00000128147 N' } },
    { in: { m1: '1.989e30', m2: '5.972e24', r: '1.496e11', rBirim: 'm' }, out: { 'Kütle çekim kuvveti': '3,5424 × 10^22 N' } },
    { in: { m1: '1000', m2: '1000', r: '10', rBirim: 'm' }, out: { 'Kütle çekim kuvveti': '6,6743 × 10^-7 N' } },
    { in: { m1: '5.972e24', m2: '70', r: '0', rBirim: 'm' }, error: true },
    { in: { m1: 'dünya', m2: '70', r: '6371', rBirim: 'km' }, error: true },
  ],
  howto: [
    'İki cismin kütlesini kilogram olarak yazın. Gezegen ve yıldız kütleleri için bilimsel gösterim kullanın; örneğin Dünya için 5.972e24.',
    'Cisimlerin kütle merkezleri arasındaki uzaklığı girin ve birimini (metre ya da kilometre) seçin. Yüzeydeki bir cisim için bu uzaklık gezegenin yarıçapıdır.',
    '"Hesapla" düğmesine basın. İlk satır kuvveti newton olarak verir; çok büyük ya da çok küçük sonuçlar 10\'un kuvvetiyle yazılır.',
    'Alttaki iki satır, her kütlenin diğerinin konumunda yarattığı çekim ivmesidir. Sonuçları "Sonucu kopyala" düğmesiyle ödevinize ya da notlarınıza aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Evrensel çekim yasası', p: [
      'Isaac Newton 1687\'de yayımladığı çalışmasında, elmayı yere düşüren kuvvet ile Ay\'ı yörüngesinde tutan kuvvetin aynı kuvvet olduğunu öne sürdü. Yasaya göre evrendeki her iki kütle birbirini, kütlelerinin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılı bir kuvvetle çeker: <strong>F = G · m₁ · m₂ / r²</strong>.',
      'Buradaki G, evrensel çekim sabitidir ve değeri yaklaşık 6,6743 × 10⁻¹¹ N·m²/kg²\'dir. Sabitin bu kadar küçük olması, kütle çekiminin gündelik cisimler arasında neden hissedilmediğini açıklar. G ilk kez Henry Cavendish\'in 1798\'de burulma terazisiyle yaptığı deneyle ölçülmüş, böylece Dünya\'nın kütlesi de ilk kez hesaplanabilmiştir.',
    ] },
    { h: 'Ters kare ilişkisi ne anlama gelir?', p: [
      'Kuvvet uzaklığın karesiyle azalır. Uzaklık iki katına çıkarsa kuvvet dörtte birine, üç katına çıkarsa dokuzda birine düşer; uzaklık yarıya inerse kuvvet dört katına çıkar. Kütlelerden biri iki katına çıkarsa kuvvet de iki katına çıkar. Bu oranlar sınav sorularında sıkça sorulur ve formülü ezberlemeden akıl yürüterek çözülebilir.',
      'Uzaklık her zaman <strong>kütle merkezleri arasında</strong> ölçülür. Dünya yüzeyinde duran bir insan için r, yerden yükseklik değil Dünya\'nın yarıçapıdır (yaklaşık 6371 km). Küresel ve simetrik cisimler dışarıdaki noktalara, tüm kütleleri merkezde toplanmış gibi etki eder; bu yüzden gezegenler için formül doğrudan uygulanabilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Dünya yüzeyindeki insan:</strong> m₁ = 5,972 × 10²⁴ kg, m₂ = 70 kg, r = 6,371 × 10⁶ m. F = 6,6743 × 10⁻¹¹ × 5,972 × 10²⁴ × 70 / (6,371 × 10⁶)² ≈ 687,4 N. Bu, 70 kg kütleli kişinin ağırlığıdır. Aynı hesap Dünya\'nın yüzeydeki çekim ivmesini de verir: yaklaşık 9,82 m/s².',
      '<strong>Örnek 2 – Dünya ile Ay:</strong> Ay\'ın kütlesi 7,348 × 10²² kg, ortalama uzaklık 384 400 km alınırsa kuvvet yaklaşık 1,98 × 10²⁰ N bulunur. Dünya\'nın Ay\'ın bulunduğu yerde yarattığı çekim ivmesi yalnızca 0,0027 m/s²\'dir; yüzeydeki değerin yaklaşık 3600\'de biri. Ay yaklaşık 60 Dünya yarıçapı uzakta olduğundan bu sonuç ters kare yasasıyla tam uyuşur (60² = 3600).',
      '<strong>Örnek 3 – İki insan:</strong> 60 kg ve 80 kg kütleli iki kişi yarım metre arayla duruyor. F = 6,6743 × 10⁻¹¹ × 60 × 80 / 0,5² ≈ 1,28 × 10⁻⁶ N. Bu, bir kum tanesinin ağırlığından bile küçük bir kuvvettir.',
      '<strong>Örnek 4 – Güneş ile Dünya:</strong> Güneş\'in kütlesi 1,989 × 10³⁰ kg, ortalama uzaklık 1,496 × 10¹¹ m için kuvvet yaklaşık 3,54 × 10²² N olur. Dünya\'yı yörüngesinde tutan merkezcil kuvvet budur.',
    ] },
    { h: 'Sık kullanılan kütle ve uzaklıklar', p: [
      'Aşağıdaki yuvarlanmış değerler ders sorularında yaygın olarak kullanılır; alanlara parantez içindeki yazımla girebilirsiniz.',
    ], ul: [
      '<strong>Dünya\'nın kütlesi:</strong> 5,972 × 10²⁴ kg (5.972e24)',
      '<strong>Dünya\'nın ortalama yarıçapı:</strong> 6371 km (6.371e6 m)',
      '<strong>Ay\'ın kütlesi:</strong> 7,35 × 10²² kg (7.35e22)',
      '<strong>Dünya–Ay ortalama uzaklığı:</strong> 384 400 km',
      '<strong>Güneş\'in kütlesi:</strong> 1,989 × 10³⁰ kg (1.989e30)',
      '<strong>Dünya–Güneş ortalama uzaklığı:</strong> 1,496 × 10¹¹ m (yaklaşık 149,6 milyon km)',
    ] },
    { h: 'Çekim kuvveti, ağırlık ve çekim ivmesi', p: [
      'Bir gezegenin yüzeyindeki cismin ağırlığı, gezegenle cisim arasındaki kütle çekim kuvvetinden başka bir şey değildir. F = G · M · m / r² ifadesini m\'ye böldüğümüzde cisimden bağımsız bir büyüklük kalır: <strong>g = G · M / r²</strong>. Buna çekim alanı şiddeti ya da çekim ivmesi denir. Araç bu değeri her iki kütle için ayrı satırda gösterir. Ağırlığın W = m · g ile hesaplanması, evrensel çekim yasasının yüzeye yakın bölge için kısaltılmış hâlidir.',
      'Yükseğe çıkıldıkça r büyüdüğü için g azalır; ancak yeryüzündeki yükseklikler Dünya\'nın yarıçapı yanında çok küçük kaldığından fark küçüktür. Yerden 400 km yükseklikteki bir uzay istasyonunda çekim ivmesi hâlâ yüzeydeki değerin yaklaşık yüzde doksanıdır. Astronotların ağırlıksız görünmesinin nedeni çekimin yokluğu değil, istasyonla birlikte sürekli serbest düşme hâlinde olmalarıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'Formül noktasal kütleler ve küresel simetrik cisimler için tam geçerlidir. Düzensiz biçimli ve birbirine çok yakın cisimlerde kütle dağılımı hesaba katılmalıdır. Bir gezegenin içindeki noktalar için de formül bu hâliyle kullanılamaz; yalnızca o noktanın altında kalan kütle çekime katkı yapar. Çok güçlü çekim alanlarında (nötron yıldızları, kara delik çevresi) ve çok hassas yörünge hesaplarında Newton yasası yerini genel göreliliğe bırakır. Girdiğiniz kütle ve uzaklık değerlerinin doğruluğu sonucun doğruluğunu belirler; araç eğitim ve ön hesap amaçlıdır.',
    ] },
  ],
  faq: [
    ['Kütle çekim kuvveti formülü nedir?', 'F = G · m₁ · m₂ / r². G evrensel çekim sabiti (6,6743 × 10⁻¹¹ N·m²/kg²), m₁ ve m₂ kütleler (kg), r kütle merkezleri arasındaki uzaklıktır (m). Sonuç newton cinsindendir.'],
    ['Büyük sayıları nasıl yazmalıyım?', 'Bilimsel gösterim kullanın: sayının ardından "e" ve 10\'un üssünü yazın. 5,972 × 10²⁴ için 5.972e24, 1,496 × 10¹¹ için 1.496e11 yazılır. Ondalık ayracı olarak nokta ya da virgül kullanabilirsiniz.'],
    ['Hangi cisim diğerini daha güçlü çeker?', 'İkisi de aynı büyüklükte kuvvet uygular. Dünya sizi ne kadar kuvvetle çekiyorsa siz de Dünya\'yı o kadar kuvvetle çekersiniz (etki-tepki). Fark ivmelerdedir: aynı kuvvet küçük kütleye büyük, dev kütleye fark edilemeyecek kadar küçük ivme kazandırır.'],
    ['Uzaklık iki katına çıkarsa kuvvet ne olur?', 'Dörtte birine düşer. Kuvvet uzaklığın karesiyle ters orantılı olduğundan uzaklık n katına çıktığında kuvvet n² kat azalır.'],
    ['Gündelik cisimler neden birbirine yapışmıyor?', 'Çünkü G çok küçüktür. Birer tonluk iki cisim 10 metre arayla durduğunda aralarındaki çekim yaklaşık 6,7 × 10⁻⁷ newtondur; sürtünme ve diğer kuvvetler yanında fark edilemez. Kütle çekimi ancak gezegen ölçeğindeki kütlelerde belirginleşir.'],
    ['Uzaklık olarak yerden yüksekliği mi yazmalıyım?', 'Hayır, kütle merkezleri arasındaki uzaklığı yazmalısınız. Dünya yüzeyinden h kadar yükseklikteki bir cisim için uzaklık, Dünya yarıçapı ile h\'nin toplamıdır.'],
    ['G ile g arasındaki fark nedir?', 'Büyük G her yerde aynı olan evrensel çekim sabitidir. Küçük g ise belirli bir gök cisminin belirli bir uzaklıktaki çekim ivmesidir ve g = G · M / r² ile bulunur; Dünya yüzeyinde yaklaşık 9,8 m/s², Ay yüzeyinde yaklaşık 1,6 m/s²\'dir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız sayılar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['kacis-hizi-hesapla', 'yorunge-periyodu-hesapla', 'gezegen-agirligi-hesapla', 'kutle-agirlik-hesapla', 'coulomb-kuvveti-hesapla'],
};
