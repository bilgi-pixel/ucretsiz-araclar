export default {
  slug: 'trafo-sarim-orani-hesapla',
  title: 'Trafo Sarım Oranı Hesaplama',
  pageTitle: 'Trafo Sarım Oranı Hesaplama – Dönüştürme Oranı, Sarım ve Gerilim',
  description: 'Transformatörün sarım oranını hesaplayın. Primer ve sekonder gerilim ile sarım sayılarından eksik olanı bulur; ideal trafo için primer akımı ve gücü de verir.',
  card: 'Trafonun primer-sekonder gerilim ve sarım sayılarından eksik değeri ve dönüştürme oranını bulun.',
  category: 'elektrik',
  keywords: ['trafo sarım oranı', 'trafo sarım hesabı', 'dönüştürme oranı hesaplama', 'primer sekonder sarım sayısı', 'trafo hesaplama', 'transformatör gerilim hesabı', 'sipir sayısı hesaplama'],
  lead: 'Bir transformatörün primer gerilimi, sekonder gerilimi, primer sarım sayısı ve sekonder sarım sayısından <strong>üçünü yazın, dördüncüsünü</strong> araç hesaplasın. İdeal trafo bağıntısı V<sub>1</sub> ÷ V<sub>2</sub> = N<sub>1</sub> ÷ N<sub>2</sub> kullanılır; yük akımı girerseniz primer akımı da bulunur.',
  button: 'Hesapla',
  inputs: [
    { id: 'v1', label: 'Primer gerilim V₁ (V)', type: 'number', placeholder: 'Örn. 220' },
    { id: 'v2', label: 'Sekonder gerilim V₂ (V)', type: 'number', placeholder: 'Örn. 12' },
    { id: 'n1', label: 'Primer sarım sayısı N₁', type: 'number', placeholder: 'Örn. 1100' },
    { id: 'n2', label: 'Sekonder sarım sayısı N₂', type: 'number', placeholder: 'Bulunacak değeri boş bırakın', hint: 'Dört alandan tam olarak birini boş bırakın.' },
    { id: 'i2', label: 'Sekonder (yük) akımı (A) – isteğe bağlı', type: 'number', placeholder: 'Örn. 5' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const alan = [['v1', 'Primer gerilim'], ['v2', 'Sekonder gerilim'], ['n1', 'Primer sarım sayısı'], ['n2', 'Sekonder sarım sayısı']];
    const eksik = alan.filter(([k]) => bos(v[k]));
    if (eksik.length !== 1) h.err('Primer gerilim, sekonder gerilim, primer sarım ve sekonder sarım alanlarından tam olarak birini boş bırakın; diğer üçünü doldurun.');
    const d = {};
    for (const [k, ad] of alan) if (!bos(v[k])) d[k] = h.pos(v[k], ad);
    const hedef = eksik[0][0];
    if (hedef === 'v1') d.v1 = d.v2 * d.n1 / d.n2;
    else if (hedef === 'v2') d.v2 = d.v1 * d.n2 / d.n1;
    else if (hedef === 'n1') d.n1 = d.n2 * d.v1 / d.v2;
    else d.n2 = d.n1 * d.v2 / d.v1;
    const a = d.v1 / d.v2;
    const etiket = { v1: 'Primer gerilim', v2: 'Sekonder gerilim', n1: 'Primer sarım sayısı', n2: 'Sekonder sarım sayısı' };
    const deger = (k) => (k[0] === 'v' ? h.fmt(d[k], 3) + ' V' : h.fmt(d[k], 2) + ' sarım');
    const rows = [[etiket[hedef], deger(hedef)]];
    rows.push(['Dönüştürme oranı (N₁ : N₂)', h.fmt(a, 4) + ' : 1']);
    const tip = Math.abs(a - 1) < 1e-9 ? 'İzolasyon trafosu (1 : 1)' : a > 1 ? 'Düşürücü trafo' : 'Yükseltici trafo';
    rows.push(['Trafo tipi', tip]);
    rows.push(['Sarım başına gerilim', h.fmt(d.v1 / d.n1, 4) + ' V/sarım']);
    if (!bos(v.i2)) {
      const i2 = h.pos(v.i2, 'Sekonder akımı');
      rows.push(['Primer akımı (ideal)', h.fmt(i2 / a, 4) + ' A']);
      rows.push(['Görünür güç', h.fmt(d.v2 * i2, 2) + ' VA']);
    }
    let note = 'İdeal (kayıpsız) trafo varsayılmıştır; gerçek trafoda yük altında sekonder gerilimi bir miktar düşer.';
    if ((hedef === 'n1' || hedef === 'n2') && Math.abs(d[hedef] - Math.round(d[hedef])) > 1e-6) note = 'Sarım sayısı tam çıkmadı; uygulamada en yakın tam sayıya yuvarlanır. ' + note;
    return { rows, note };
  },
  cases: [
    { in: { v1: '220', v2: '12', n1: '1100', n2: '' }, out: { 'Sekonder sarım sayısı': '60 sarım', 'Dönüştürme oranı (N₁ : N₂)': '18,3333 : 1', 'Trafo tipi': 'Düşürücü trafo', 'Sarım başına gerilim': '0,2 V/sarım' } },
    { in: { v1: '220', v2: '', n1: '1000', n2: '50' }, out: { 'Sekonder gerilim': '11 V', 'Dönüştürme oranı (N₁ : N₂)': '20 : 1' } },
    { in: { v1: '', v2: '24', n1: '500', n2: '1000' }, out: { 'Primer gerilim': '12 V', 'Dönüştürme oranı (N₁ : N₂)': '0,5 : 1', 'Trafo tipi': 'Yükseltici trafo' } },
    { in: { v1: '230', v2: '230', n1: '', n2: '400' }, out: { 'Primer sarım sayısı': '400 sarım', 'Trafo tipi': 'İzolasyon trafosu (1 : 1)' } },
    { in: { v1: '220', v2: '12', n1: '1100', n2: '', i2: '5' }, out: { 'Primer akımı (ideal)': '0,2727 A', 'Görünür güç': '60 VA' } },
    { in: { v1: '240', v2: '24', n1: '', n2: '100', i2: '2' }, out: { 'Primer sarım sayısı': '1.000 sarım', 'Primer akımı (ideal)': '0,2 A', 'Görünür güç': '48 VA' } },
    { in: { v1: '220', v2: '12', n1: '1100', n2: '60' }, error: true },
    { in: { v1: '220', v2: '', n1: '', n2: '60' }, error: true },
    { in: { v1: '220', v2: '-12', n1: '1100', n2: '' }, error: true },
  ],
  howto: [
    'Bildiğiniz üç değeri ilgili alanlara yazın: primer gerilim, sekonder gerilim, primer sarım sayısı ve sekonder sarım sayısından üçü.',
    'Bulmak istediğiniz dördüncü alanı boş bırakın. Birden fazla alan boşsa ya da dördü de doluysa araç uyarı verir.',
    'Primer akımı ve gücü de görmek istiyorsanız sekonderden çekilecek yük akımını yazın; istemiyorsanız bu alanı boş bırakın.',
    '"Hesapla" düğmesine basın. Eksik değer, dönüştürme oranı, trafo tipi ve sarım başına gerilim listelenir.',
  ],
  sections: [
    { h: 'Sarım oranı ne demektir?', p: [
      'Transformatör, ortak bir demir nüve üzerine sarılmış iki bobinden oluşur. Şebekeye bağlanan bobine primer, yükün bağlandığı bobine sekonder denir. Primer sargıdan geçen alternatif akım nüvede değişken bir manyetik akı oluşturur; bu akı sekonder sargının her sarımında aynı gerilimi indükler. Dolayısıyla bir sargının uçlarındaki gerilim, o sargının sarım sayısıyla doğru orantılıdır.',
      'Primer sarım sayısının sekonder sarım sayısına bölümüne <strong>sarım oranı</strong> ya da dönüştürme oranı denir. Oran 1\'den büyükse trafo gerilimi düşürür, 1\'den küçükse yükseltir, tam 1 ise giriş ile çıkışı yalnızca elektriksel olarak ayıran izolasyon trafosudur. Sarım yerine "sipir" ya da "tur" sözcükleri de kullanılır.',
    ] },
    { h: 'Temel bağıntılar', ul: [
      '<strong>V<sub>1</sub> ÷ V<sub>2</sub> = N<sub>1</sub> ÷ N<sub>2</sub> = a</strong> (dönüştürme oranı)',
      '<strong>I<sub>1</sub> ÷ I<sub>2</sub> = N<sub>2</sub> ÷ N<sub>1</sub> = 1 ÷ a</strong> (akımlar gerilimle ters orantılıdır)',
      '<strong>V<sub>1</sub> × I<sub>1</sub> = V<sub>2</sub> × I<sub>2</sub></strong> (ideal trafoda giriş ve çıkış gücü eşittir)',
    ], p: [
      'Bu eşitlikler kayıpsız, yani ideal bir transformatör için geçerlidir. Gerilim düştüğünde akımın aynı oranda yükselmesi, enerjinin korunmasının doğal sonucudur: trafo güç üretmez, yalnızca gerilim ve akım düzeyini değiştirir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Sekonder sarım sayısı:</strong> 220 voltu 12 volta düşürecek ve primeri 1.100 sarım olan bir trafonun sekonderi 1.100 × 12 ÷ 220 = 60 sarım olmalıdır. Dönüştürme oranı 220 ÷ 12 = 18,3333\'tür; sarım başına gerilim 220 ÷ 1.100 = 0,2 volttur.',
      '<strong>Primer akımı:</strong> Aynı trafonun sekonderinden 5 amper çekiliyorsa çıkış gücü 12 × 5 = 60 VA olur. İdeal durumda primer akımı 5 ÷ 18,3333 = 0,2727 amperdir; 220 × 0,2727 çarpımı da yaklaşık 60 VA verir.',
      '<strong>Sekonder gerilimi:</strong> Primeri 1.000, sekonderi 50 sarım olan bir trafo 220 volta bağlanırsa çıkışta 220 × 50 ÷ 1.000 = 11 volt alınır; oran 20\'dir.',
      '<strong>Yükseltici trafo:</strong> 500 sarımlı primer ve 1.000 sarımlı sekonderden 24 volt alınıyorsa primere uygulanan gerilim 24 × 500 ÷ 1.000 = 12 volttur. Oran 0,5 olduğundan trafo gerilimi iki katına çıkarır.',
    ] },
    { h: 'Sarım başına gerilim neden önemli?', p: [
      'Trafo sararken önce nüvenin kesitine ve çalışma frekansına göre sarım başına düşecek gerilim belirlenir, ardından her sargının sarım sayısı istenen gerilim bu değere bölünerek bulunur. Araç, girdiğiniz primer değerlerinden sarım başına gerilimi hesaplayıp gösterir; aynı nüve üzerine ek bir sargı eklemek istediğinizde gereken sarım sayısını bu değerle kolayca bulursunuz. Örneğin sarım başına 0,2 volt düşen bir nüvede 24 voltluk ek sargı için 120 sarım gerekir.',
      'Sarım başına gerilimin nüvenin taşıyabileceğinden yüksek seçilmesi nüveyi doyuma götürür; trafo aşırı akım çeker ve ısınır. Bu nedenle yalnızca oranı tutturmak yetmez, mutlak sarım sayıları da nüveye uygun olmalıdır. Nüve hesabı bu aracın kapsamında değildir.',
    ] },
    { h: 'Gerçek trafolarda farklar', p: [
      'Gerçek transformatörlerde sargı direnci, kaçak akı ve nüve kayıpları vardır. Bu yüzden sekonder gerilimi boşta hesaplanan değere çok yakınken, yük bağlandığında bir miktar düşer. Küçük trafolarda bu düşüşü karşılamak için sekonder sarım sayısı hesaplanan değerin biraz üzerinde tutulur; ne kadar pay bırakılacağı trafonun gücüne ve yapısına bağlıdır.',
      'Primer akımı da ideal değerden biraz yüksektir, çünkü trafo yük olmasa bile nüveyi mıknatıslamak için küçük bir akım çeker ve kayıplar giriş gücüne eklenir. Sonuçları tasarımın ilk adımı olarak görün; tel çapı, izolasyon sınıfı ve ısınma hesabı ayrıca yapılmalıdır.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Şebeke gerilimine bağlı transformatörlerle çalışmak elektrik çarpması ve yangın riski taşır. Yükseltici trafolarda sekonder gerilimi öldürücü düzeye çıkabilir. Bu sayfadaki sonuçlar eğitim ve ön tasarım amaçlıdır; şebekeye bağlanacak bir trafonun yapımı ve bağlantısı yetkin kişilerce, uygun izolasyon ve koruma elemanlarıyla yapılmalıdır.',
    ] },
  ],
  faq: [
    ['Sarım oranı nasıl hesaplanır?', 'Primer sarım sayısı sekonder sarım sayısına bölünür. Aynı oran primer gerilimin sekonder gerilime bölünmesiyle de bulunur. 220 volttan 12 volta düşüren bir trafonun oranı 18,33\'tür.'],
    ['220 volttan 12 volta düşürmek için kaç sarım gerekir?', 'Bu, primer sarım sayısına bağlıdır. Primer 1.100 sarımsa sekonder 60 sarım olur. Primer sarım sayısı ise nüvenin kesitine göre belirlenir; yalnızca orandan mutlak sayı çıkarılamaz.'],
    ['Trafo doğru akımla çalışır mı?', 'Hayır. Trafonun çalışması değişen manyetik akıya dayanır; doğru akım sabit bir akı oluşturduğundan sekonderde gerilim indüklenmez ve primer sargı aşırı akım çekerek zarar görebilir.'],
    ['Gerilim düşünce akım neden artar?', 'İdeal trafoda giriş gücü çıkış gücüne eşittir. Güç gerilim ile akımın çarpımı olduğundan gerilim hangi oranda düşerse akım o oranda yükselir.'],
    ['Hesaplanan sarım sayısı küsuratlı çıkarsa ne yapmalıyım?', 'Sarım sayısı tam sayı olmak zorundadır; en yakın tam sayıya yuvarlanır. Yük altındaki gerilim düşümünü karşılamak için çoğunlukla yukarı yuvarlamak tercih edilir.'],
    ['Dört alanı da doldurabilir miyim?', 'Hayır. Araç üç değerden dördüncüyü hesaplar; bu yüzden tam olarak bir alan boş bırakılmalıdır. Elinizdeki dört değerin tutarlılığını görmek için birini boş bırakıp sonucu karşılaştırabilirsiniz.'],
    ['Akım trafolarında oran aynı mantıkla mı okunur?', 'Akım trafolarında oran akımlar üzerinden, örneğin 100/5 A biçiminde verilir ve akımlar sarım sayılarıyla ters orantılıdır. Temel ilke aynıdır ancak bu araç gerilim trafoları için düzenlenmiştir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['ohm-kanunu-hesapla', 'elektrik-gucu-hesapla', 'bobin-enduktans-hesapla', 'kva-kw-cevir', 'gerilim-bolucu-hesapla'],
};
