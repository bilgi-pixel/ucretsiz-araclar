export default {
  slug: 'mol-hesapla',
  title: 'Mol Hesaplama',
  h1Tail: 'kütle, tanecik ve hacimden mol',
  pageTitle: 'Mol Hesaplama – Kütleden, Tanecik Sayısından ve Hacimden Mol Bulma',
  description: 'Kütle ve mol kütlesinden, tanecik sayısından ya da normal şartlardaki gaz hacminden mol sayısını hesaplayın; molden kütleye, tanecik sayısına ve hacme geçin.',
  card: 'Kütleden, tanecik sayısından ya da gaz hacminden mol sayısını bulun; molü grama, taneciğe ve litreye çevirin.',
  category: 'bilim',
  keywords: ['mol hesaplama', 'mol sayısı bulma', 'n = m/M', 'gram mol çevirme', 'mol kütle hesaplama', 'avogadro sayısı mol', 'normal şartlarda mol hacmi', 'kimya mol hesabı'],
  lead: 'Bir maddenin mol sayısını kütlesinden (<strong>n = m/M</strong>), tanecik sayısından (<strong>n = N/N<sub>A</sub></strong>) ya da normal şartlardaki gaz hacminden (<strong>n = V/22,4</strong>) hesaplayın. Araç mol sayısını bulduktan sonra kütle, tanecik sayısı ve gaz hacmi karşılıklarını da birlikte gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Bilinen büyüklük', type: 'select', options: [['kutle', 'Kütle (gram) → mol'], ['mol', 'Mol → kütle (gram)'], ['tanecik', 'Tanecik sayısı → mol'], ['hacim', 'Gaz hacmi (litre, normal şartlar) → mol']] },
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 36', hint: 'Seçiminize göre gram, mol, tanecik sayısı (örn. 3,01e23) ya da litre.' },
    { id: 'molKutle', label: 'Mol kütlesi (g/mol)', type: 'number', placeholder: 'Örn. 18', hint: 'Kütle ile mol arasındaki çevirilerde zorunludur. Diğer hesaplarda doldurursanız kütle de gösterilir.' },
  ],
  compute(v, h) {
    const NA = 6.02214076e23;
    const dolu = String(v.molKutle ?? '').trim() !== '';
    const M = dolu ? h.pos(v.molKutle, 'Mol kütlesi') : null;
    const x = h.pos(v.deger, 'Değer');
    let n;
    if (v.mod === 'mol') {
      if (M === null) h.err('Molden kütleye geçmek için "Mol kütlesi" alanını doldurun (örn. su için 18).');
      n = x;
    } else if (v.mod === 'tanecik') n = x / NA;
    else if (v.mod === 'hacim') n = x / 22.4;
    else {
      if (M === null) h.err('Kütleden mol bulmak için "Mol kütlesi" alanını doldurun (örn. su için 18).');
      n = x / M;
    }
    const molMetin = (n >= 0.001 ? h.fmt(n, 4) : h.sig(n, 4)) + ' mol';
    const bil = (y) => {
      const [m, e] = y.toExponential(3).split('e');
      return `${String(Number(m)).replace('.', ',')} × 10^${Number(e)}`;
    };
    const rows = [];
    const kutleSatiri = M === null ? null : ['Kütle', h.sig(n * M, 6) + ' g'];
    if (v.mod === 'mol') { rows.push(kutleSatiri); rows.push(['Mol sayısı', molMetin]); }
    else { rows.push(['Mol sayısı', molMetin]); if (kutleSatiri) rows.push(kutleSatiri); }
    rows.push(['Tanecik sayısı', bil(n * NA)]);
    rows.push(['Normal şartlarda gaz hacmi (0 °C, 1 atm)', h.sig(n * 22.4, 6) + ' L']);
    rows.push(['Oda koşullarında gaz hacmi (25 °C, 1 atm)', h.sig(n * 24.5, 6) + ' L']);
    return {
      rows,
      note: 'Hacim satırları yalnızca gaz hâlindeki maddeler için anlamlıdır ve ideal gaz kabulüne dayanır. Avogadro sayısı 6,02214076 × 10^23 alınmıştır.',
    };
  },
  cases: [
    { in: { mod: 'kutle', deger: '36', molKutle: '18' }, out: { 'Mol sayısı': '2 mol', 'Tanecik sayısı': '1,204 × 10^24', 'Normal şartlarda gaz hacmi (0 °C, 1 atm)': '44,8 L' } },
    { in: { mod: 'mol', deger: '0,5', molKutle: '44' }, out: { 'Kütle': '22 g', 'Tanecik sayısı': '3,011 × 10^23', 'Normal şartlarda gaz hacmi (0 °C, 1 atm)': '11,2 L' } },
    { in: { mod: 'tanecik', deger: '6,02214076e23' }, out: { 'Mol sayısı': '1 mol', 'Normal şartlarda gaz hacmi (0 °C, 1 atm)': '22,4 L' } },
    { in: { mod: 'tanecik', deger: '3,011e23' }, out: { 'Mol sayısı': '0,5 mol' } },
    { in: { mod: 'hacim', deger: '5,6', molKutle: '32' }, out: { 'Mol sayısı': '0,25 mol', 'Kütle': '8 g' } },
    { in: { mod: 'kutle', deger: '5,85', molKutle: '58,5' }, out: { 'Mol sayısı': '0,1 mol' } },
    { in: { mod: 'kutle', deger: '4', molKutle: '40' }, out: { 'Mol sayısı': '0,1 mol', 'Oda koşullarında gaz hacmi (25 °C, 1 atm)': '2,45 L' } },
    { in: { mod: 'kutle', deger: '36', molKutle: '' }, error: true },
    { in: { mod: 'mol', deger: '-2', molKutle: '18' }, error: true },
    { in: { mod: 'hacim', deger: 'abc' }, error: true },
  ],
  howto: [
    '"Bilinen büyüklük" listesinden elinizdeki veriyi seçin: kütle, mol, tanecik sayısı ya da normal şartlardaki gaz hacmi.',
    '"Değer" kutusuna bu büyüklüğü yazın. Tanecik sayısı gibi çok büyük sayılar için 3,01e23 biçiminde bilimsel gösterim kullanabilirsiniz.',
    'Kütle ile mol arasında çeviri yapıyorsanız maddenin mol kütlesini g/mol olarak girin. Bilmiyorsanız önce molar kütle hesaplama aracıyla formülden bulabilirsiniz.',
    '"Hesapla" düğmesine basın; mol sayısı, kütle, tanecik sayısı ve gaz hacmi karşılıkları birlikte listelenir.',
  ],
  sections: [
    { h: 'Mol nedir?', p: [
      'Mol, madde miktarını ifade eden temel birimdir. Atomlar ve moleküller tek tek sayılamayacak kadar küçük ve çok olduğundan kimyacılar onları düzine ya da deste mantığıyla, ama çok daha büyük bir paketle sayar. Bir mol, tam olarak 6,02214076 × 10<sup>23</sup> tane tanecik içerir. Bu sayıya Avogadro sayısı denir ve N<sub>A</sub> ile gösterilir. Tanecik; söz konusu maddeye göre atom, molekül, iyon ya da formül birimi olabilir.',
      'Molün kullanışlı olmasının nedeni, kimyasal tepkimelerin tanecik sayılarına göre gerçekleşmesidir. İki hidrojen molekülü bir oksijen molekülüyle birleşerek iki su molekülü oluşturur; bu oran gram olarak değil, mol olarak korunur. Laboratuvarda tartılan gramı tepkime denklemindeki katsayılara bağlayan köprü mol kavramıdır.',
    ] },
    { h: 'Mol hesaplama formülleri', ul: [
      '<strong>n = m / M</strong> — kütleden mol (m gram, M mol kütlesi g/mol)',
      '<strong>m = n · M</strong> — molden kütle',
      '<strong>n = N / N<sub>A</sub></strong> — tanecik sayısından mol (N<sub>A</sub> ≈ 6,022 × 10<sup>23</sup>)',
      '<strong>n = V / 22,4</strong> — normal şartlarda (0 °C, 1 atm) gaz hacminden mol (V litre)',
    ], p: [
      'Mol kütlesi, bir mol maddenin gram cinsinden kütlesidir ve sayısal olarak maddenin bağıl atom ya da molekül kütlesine eşittir. Bir bileşiğin mol kütlesi, formülündeki atomların mol kütleleri toplanarak bulunur: su (H₂O) için 2 × 1 + 16 = 18 g/mol, karbondioksit (CO₂) için 12 + 2 × 16 = 44 g/mol.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Kütleden mol:</strong> 36 gram su kaç moldür? Suyun mol kütlesi 18 g/mol alınırsa n = 36/18 = <strong>2 mol</strong>. Bu miktar 2 × 6,022 × 10<sup>23</sup> ≈ 1,204 × 10<sup>24</sup> su molekülü içerir.',
      '<strong>Molden kütle:</strong> 0,5 mol karbondioksit kaç gramdır? m = 0,5 × 44 = <strong>22 g</strong>. Gaz hâlindeki bu miktar normal şartlarda 0,5 × 22,4 = 11,2 litre hacim kaplar.',
      '<strong>Tanecik sayısından mol:</strong> 3,011 × 10<sup>23</sup> tane atom içeren bir örnek n = 3,011 × 10<sup>23</sup>/6,022 × 10<sup>23</sup> ≈ <strong>0,5 mol</strong> eder.',
      '<strong>Hacimden mol:</strong> Normal şartlarda 5,6 litre hacim kaplayan oksijen gazı n = 5,6/22,4 = <strong>0,25 mol</strong>\'dür. Oksijenin (O₂) mol kütlesi 32 g/mol olduğundan kütlesi 0,25 × 32 = 8 gramdır.',
      '<strong>Sofra tuzu:</strong> 5,85 gram sodyum klorür (NaCl, mol kütlesi 58,5 g/mol) n = 5,85/58,5 = <strong>0,1 mol</strong> eder.',
    ] },
    { h: 'Normal şartlar ve oda koşulları', p: [
      'Gazların hacmi sıcaklık ve basınca bağlı olduğundan mol–hacim çevirisinde koşullar belirtilmelidir. Türkiye\'deki kimya derslerinde <strong>normal şartlar altında (NŞA)</strong> ifadesi 0 °C sıcaklık ve 1 atm basınç anlamına gelir; bu koşullarda bir mol ideal gaz 22,4 litre hacim kaplar. <strong>Oda koşulları</strong> ise 25 °C ve 1 atm olarak alınır ve bir mol gaz yaklaşık 24,5 litre yer tutar. Araç her iki hacmi de ayrı satırlarda verir; hacimden mol hesabında ise girdiğiniz hacmin normal şartlarda ölçüldüğünü kabul eder.',
      'Bu hacim değerleri gazın cinsine bağlı değildir: ideal gaz kabulüyle bir mol hidrojen de, bir mol karbondioksit de aynı koşullarda aynı hacmi kaplar. Farklı sıcaklık ve basınçlar için ideal gaz denklemi (P·V = n·R·T) kullanılmalıdır. Katı ve sıvılar için 22,4 litre kuralı geçerli değildir; bir mol su yalnızca yaklaşık 18 mililitre yer tutar.',
    ] },
    { h: 'Sık kullanılan mol kütleleri', ul: [
      'Hidrojen gazı (H₂): 2 g/mol',
      'Su (H₂O): 18 g/mol',
      'Amonyak (NH₃): 17 g/mol',
      'Oksijen gazı (O₂): 32 g/mol',
      'Karbondioksit (CO₂): 44 g/mol',
      'Sodyum klorür (NaCl): 58,5 g/mol',
      'Sodyum hidroksit (NaOH): 40 g/mol',
      'Sülfürik asit (H₂SO₄): 98 g/mol',
      'Kalsiyum karbonat (CaCO₃): 100 g/mol',
      'Glikoz (C₆H₁₂O₆): 180 g/mol',
    ], p: [
      'Bu değerler ders kitaplarında kullanılan yuvarlatılmış atom kütleleriyle (H = 1, C = 12, N = 14, O = 16, Na = 23, S = 32, Cl = 35,5, Ca = 40) hesaplanmıştır. Daha hassas değerler için atom kütlelerinin ondalıklı hâlleri kullanılır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, elementin atom kütlesi ile molekülünün mol kütlesini karıştırmaktır. Oksijen atomunun mol kütlesi 16 g/mol iken, havadaki oksijen gazı O₂ molekülleri hâlinde bulunur ve mol kütlesi 32 g/mol\'dür. Hidrojen, azot, flor, klor, brom ve iyot da doğada iki atomlu moleküller oluşturur.',
      'İkinci hata, "tanecik" sözcüğünün neyi saydığına dikkat etmemektir. Bir mol su 6,022 × 10<sup>23</sup> molekül içerir; ancak her molekülde üç atom bulunduğundan toplam atom sayısı bunun üç katıdır. Araçtaki tanecik sayısı, mol kütlesini hangi birim için girdiyseniz onun sayısıdır. Üçüncü hata, kütleyi kilogram ya da miligram olarak bırakmaktır; formül gram ile çalışır. Son olarak 22,4 L/mol değeri yalnızca gazlar ve yalnızca 0 °C ile 1 atm için geçerlidir.',
    ] },
  ],
  faq: [
    ['Mol sayısı nasıl hesaplanır?', 'Kütle biliniyorsa n = m/M formülüyle: gram cinsinden kütle, mol kütlesine bölünür. Tanecik sayısı biliniyorsa Avogadro sayısına, normal şartlardaki gaz hacmi biliniyorsa 22,4\'e bölünür.'],
    ['1 mol kaç tanecik içerir?', '6,02214076 × 10^23 tanecik içerir. Bu sayı Avogadro sayısıdır ve 2019\'dan itibaren molün tanımı doğrudan bu kesin değere dayanır. Derslerde çoğunlukla 6,02 × 10^23 olarak yuvarlanır.'],
    ['Mol kütlesi nasıl bulunur?', 'Bileşiğin formülündeki her elementin atom kütlesi, o elementin atom sayısıyla çarpılır ve sonuçlar toplanır. Örneğin H₂SO₄ için 2 × 1 + 32 + 4 × 16 = 98 g/mol.'],
    ['1 mol gaz kaç litredir?', 'Normal şartlarda (0 °C, 1 atm) yaklaşık 22,4 litre, oda koşullarında (25 °C, 1 atm) yaklaşık 24,5 litredir. Bu değerler ideal gaz kabulüyle tüm gazlar için aynıdır.'],
    ['Gram ile mol arasındaki fark nedir?', 'Gram kütleyi, mol ise tanecik sayısını temel alan madde miktarını ölçer. Aynı mol sayısındaki farklı maddelerin kütleleri farklıdır: 1 mol su 18 gram, 1 mol demir yaklaşık 56 gramdır.'],
    ['Molekül sayısından atom sayısına nasıl geçilir?', 'Molekül sayısı, bir moleküldeki atom sayısıyla çarpılır. 1 mol CO₂ içinde 6,022 × 10^23 molekül, dolayısıyla 3 × 6,022 × 10^23 atom bulunur.'],
    ['Mol ile molarite aynı şey midir?', 'Hayır. Mol madde miktarıdır; molarite ise bir litre çözeltide çözünmüş maddenin mol sayısıdır ve derişim birimidir. Molarite hesabı için çözelti hacmi de bilinmelidir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['molar-kutle-hesapla', 'tanecik-sayisi-hesapla', 'molarite-hesapla', 'ideal-gaz-denklemi-hesapla', 'kutle-yuzdesi-bilesik-hesapla'],
};
