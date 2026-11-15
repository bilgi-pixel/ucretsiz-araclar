export default {
  slug: 'normalite-hesapla',
  title: 'Normalite Hesaplama',
  h1Tail: 'N = M × tesir değerliği',
  pageTitle: 'Normalite Hesaplama – Eşdeğer Kütle ve Molariteden Normalite',
  description: 'Çözeltinin normalitesini kütle, mol kütlesi, hacim ve tesir değerliğinden ya da doğrudan molariteden hesaplayın. Eşdeğer kütle ve eşdeğer sayısı da gösterilir.',
  card: 'Kütle, mol kütlesi, hacim ve tesir değerliğinden normaliteyi, molariteyi ve eşdeğer kütleyi hesaplayın.',
  category: 'bilim',
  keywords: ['normalite hesaplama', 'normalite formülü', 'eşdeğer kütle hesaplama', 'tesir değerliği', 'molarite normalite çevirme', 'eşdeğer gram sayısı', 'normal çözelti hazırlama'],
  lead: 'Bir çözeltinin <strong>normalitesini (N)</strong> çözünen maddenin kütlesinden ya da bilinen molaritesinden hesaplayın. Araç, tesir değerliğini hesaba katarak molariteyi, eşdeğer kütleyi ve eşdeğer gram sayısını da verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap türü', type: 'select', options: [['kutle', 'Kütle ve hacimden'], ['molarite', 'Molariteden']] },
    { id: 'kutle', label: 'Çözünen kütlesi (g)', type: 'number', placeholder: 'Örn. 4,9', hint: 'Yalnızca "Kütle ve hacimden" hesabında gerekir.' },
    { id: 'molKutle', label: 'Mol kütlesi (g/mol)', type: 'number', placeholder: 'Örn. 98', hint: 'Molariteden hesapta isteğe bağlıdır; yazarsanız eşdeğer kütle de gösterilir.' },
    { id: 'hacim', label: 'Çözelti hacmi (mL)', type: 'number', placeholder: 'Örn. 500', hint: 'Yalnızca "Kütle ve hacimden" hesabında gerekir.' },
    { id: 'molarite', label: 'Molarite (mol/L)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Yalnızca "Molariteden" hesabında gerekir.' },
    { id: 'td', label: 'Tesir değerliği', type: 'number', value: '1', hint: 'Asitte verilen H⁺, bazda OH⁻ sayısı; tuzda toplam katyon yükü; redoksta alınan ya da verilen elektron sayısı.' },
  ],
  compute(v, h) {
    const td = h.posint(v.td, 'Tesir değerliği');
    if (td > 20) h.err('"Tesir değerliği" 20\'den büyük olamaz; değeri kontrol edin.');
    if (v.mod === 'molarite') {
      const M = h.pos(v.molarite, 'Molarite');
      const N = M * td;
      const rows = [
        ['Normalite', h.fmt(N, 4) + ' N'],
        ['Molarite', h.fmt(M, 4) + ' M'],
        ['1 litredeki eşdeğer gram sayısı', h.fmt(N, 4) + ' eşdeğer'],
      ];
      if (String(v.molKutle ?? '').trim() !== '') {
        const mk = h.pos(v.molKutle, 'Mol kütlesi');
        rows.push(['Eşdeğer kütle', h.fmt(mk / td, 4) + ' g/eşdeğer']);
        rows.push(['1 litre için gereken madde', h.fmt(M * mk, 4) + ' g']);
      }
      return { rows, note: 'Normalite = molarite × tesir değerliği. Tesir değerliği tepkimeye göre değişebilir.' };
    }
    const m = h.pos(v.kutle, 'Çözünen kütlesi');
    const mk = h.pos(v.molKutle, 'Mol kütlesi');
    const mL = h.pos(v.hacim, 'Çözelti hacmi');
    const mol = m / mk;
    const M = mol / (mL / 1000);
    const N = M * td;
    return {
      rows: [
        ['Normalite', h.fmt(N, 4) + ' N'],
        ['Molarite', h.fmt(M, 4) + ' M'],
        ['Eşdeğer kütle', h.fmt(mk / td, 4) + ' g/eşdeğer'],
        ['Eşdeğer gram sayısı', h.fmt(mol * td, 4) + ' eşdeğer'],
        ['Mol sayısı', h.fmt(mol, 4) + ' mol'],
      ],
      note: 'Normalite = eşdeğer gram sayısı ÷ çözelti hacmi (L). Hacim çözücünün değil, hazırlanan çözeltinin toplam hacmidir.',
    };
  },
  cases: [
    { in: { mod: 'kutle', kutle: '4,9', molKutle: '98', hacim: '500', td: '2' }, out: { 'Normalite': '0,2 N', 'Molarite': '0,1 M', 'Eşdeğer kütle': '49 g/eşdeğer', 'Eşdeğer gram sayısı': '0,1 eşdeğer' } },
    { in: { mod: 'molarite', molarite: '0,5', td: '3' }, out: { 'Normalite': '1,5 N', 'Molarite': '0,5 M' } },
    { in: { mod: 'kutle', kutle: '4', molKutle: '40', hacim: '250', td: '1' }, out: { 'Normalite': '0,4 N', 'Molarite': '0,4 M', 'Mol sayısı': '0,1 mol' } },
    { in: { mod: 'kutle', kutle: '7,4', molKutle: '74', hacim: '1000', td: '2' }, out: { 'Normalite': '0,2 N', 'Eşdeğer kütle': '37 g/eşdeğer' } },
    { in: { mod: 'kutle', kutle: '3,65', molKutle: '36,5', hacim: '100', td: '1' }, out: { 'Normalite': '1 N', 'Molarite': '1 M' } },
    { in: { mod: 'molarite', molarite: '0,02', molKutle: '158', td: '5' }, out: { 'Normalite': '0,1 N', 'Eşdeğer kütle': '31,6 g/eşdeğer', '1 litre için gereken madde': '3,16 g' } },
    { in: { mod: 'kutle', kutle: '4,9', molKutle: '98', hacim: '500', td: '0' }, error: true },
    { in: { mod: 'kutle', kutle: '', molKutle: '98', hacim: '500', td: '2' }, error: true },
    { in: { mod: 'molarite', molarite: '0,5', td: '1,5' }, error: true },
  ],
  howto: [
    '"Hesap türü" listesinden elinizdeki veriye uygun olanı seçin: tartılan madde ve çözelti hacmi biliniyorsa "Kütle ve hacimden", derişim mol/L olarak biliniyorsa "Molariteden".',
    'Kütleden hesapta çözünen kütlesini gram, mol kütlesini g/mol ve çözeltinin toplam hacmini mililitre olarak yazın. Molariteden hesapta yalnızca molariteyi girmeniz yeterlidir.',
    '"Tesir değerliği" alanına maddenin o tepkimedeki değerliğini tam sayı olarak yazın; örneğin sülfürik asit için 2, sodyum hidroksit için 1.',
    '"Hesapla" düğmesine basın. İlk satırda normalite, altında molarite, eşdeğer kütle ve eşdeğer gram sayısı görünür.',
    'Sonucu rapora ya da ödev defterine aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Normalite nedir?', p: [
      'Normalite, bir litre çözeltide çözünmüş maddenin <strong>eşdeğer gram sayısını</strong> gösteren derişim birimidir ve N harfiyle yazılır. Molarite çözeltideki tanecik (mol) sayısını sayarken normalite, bu taneciklerin tepkimede ne kadar "iş görebildiğini" sayar. Bir mol sülfürik asit iki mol hidrojen iyonu verebildiği için bir mol hidroklorik asidin iki katı baz nötrleştirir; normalite bu farkı doğrudan sayıya yansıtır.',
      'Bu nedenle normalite özellikle asit-baz titrasyonlarında, çöktürme ve yükseltgenme-indirgenme analizlerinde kullanışlıdır. Aynı normalitedeki iki çözeltinin eşit hacimleri birbirini tam olarak tüketir; hesap yaparken tepkime denklemindeki katsayılara ayrıca bakmak gerekmez.',
    ] },
    { h: 'Normalite formülü ve tesir değerliği', p: [
      'Temel bağıntı şudur: <strong>N = M × t</strong>. Burada M molarite (mol/L), t ise tesir değerliğidir. Kütleden başlanacaksa önce mol sayısı bulunur (n = m ÷ mol kütlesi), hacme bölünerek molarite elde edilir, sonra tesir değerliğiyle çarpılır. Aynı sonuca eşdeğer kütle üzerinden de varılır: eşdeğer kütle = mol kütlesi ÷ t, eşdeğer gram sayısı = m ÷ eşdeğer kütle, N = eşdeğer gram sayısı ÷ hacim (L).',
      'Tesir değerliği maddenin türüne göre belirlenir:',
    ], ul: [
      '<strong>Asitlerde</strong> tepkimede verilen H⁺ sayısıdır: HCl için 1, H₂SO₄ için 2, H₃PO₄ tam nötrleşmede 3.',
      '<strong>Bazlarda</strong> verilen OH⁻ sayısıdır: NaOH için 1, Ca(OH)₂ için 2, Al(OH)₃ için 3.',
      '<strong>Tuzlarda</strong> katyonların toplam pozitif yüküdür: NaCl için 1, CaCl₂ için 2, Al₂(SO₄)₃ için 6.',
      '<strong>Redoks tepkimelerinde</strong> formül birimi başına alınan ya da verilen elektron sayısıdır: asidik ortamda permanganat (MnO₄⁻ → Mn²⁺) için 5.',
    ] },
    { h: 'Çözümlü örnek: sülfürik asit çözeltisi', p: [
      '4,9 gram H₂SO₄ suda çözülüp hacim 500 mL\'ye tamamlanıyor. Mol kütlesi 98 g/mol alındığında mol sayısı 4,9 ÷ 98 = 0,05 mol olur. Hacim 0,5 litre olduğundan molarite 0,05 ÷ 0,5 = 0,1 M\'dir. Sülfürik asit iki hidrojen iyonu verdiği için tesir değerliği 2\'dir ve normalite 0,1 × 2 = <strong>0,2 N</strong> bulunur.',
      'Eşdeğer kütle yoluyla sağlama yapalım: 98 ÷ 2 = 49 g/eşdeğer. 4,9 gram madde 4,9 ÷ 49 = 0,1 eşdeğer gram eder; bu da 0,5 litrede 0,2 N demektir. Araç aynı girdilerle 0,2 N, 0,1 M, 49 g/eşdeğer ve 0,1 eşdeğer sonuçlarını verir.',
    ] },
    { h: 'Çözümlü örnek: molariteden normaliteye geçiş', p: [
      '0,5 M fosforik asit (H₃PO₄) çözeltisi, üç hidrojeninin de nötrleştiği bir tepkimede kullanılacaksa tesir değerliği 3 alınır ve normalite 0,5 × 3 = <strong>1,5 N</strong> olur. Aynı çözelti yalnızca ilk hidrojenin verildiği bir tepkimede 0,5 N gibi davranır. Bu örnek normalitenin çözeltinin değil, <em>çözelti ile tepkimenin birlikte</em> bir özelliği olduğunu gösterir.',
      'Redoks örneği: 0,02 M potasyum permanganat asidik ortamda beş elektron aldığından 0,02 × 5 = 0,1 N\'dir. Mol kütlesi 158 g/mol yazılırsa araç eşdeğer kütleyi 31,6 g/eşdeğer, bir litre çözelti için tartılacak miktarı 3,16 g olarak gösterir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Hacim olarak çözücünün (suyun) miktarını almak. Formüldeki hacim, madde çözüldükten sonra balon jojede tamamlanan <strong>toplam çözelti hacmidir</strong>.',
      'Mililitreyi litreye çevirmeyi unutmak. Araç hacmi mL olarak alır ve çeviriyi kendisi yapar; elle hesapta 250 mL = 0,25 L yazılmalıdır.',
      'Tesir değerliğini formüldeki hidrojen sayısına bakarak ezbere seçmek. Asetik asidin (CH₃COOH) dört hidrojeni vardır ama yalnızca biri asidiktir; tesir değerliği 1\'dir.',
      'Kristal suyu içeren maddelerde susuz mol kütlesini kullanmak. Tartılan madde hidrat ise mol kütlesine kristal suyu da eklenmelidir.',
      'Normaliteyi molariteden küçük bulmak. Tesir değerliği en az 1 olduğundan normalite molariteye eşit ya da ondan büyüktür.',
    ] },
    { h: 'Normalite ne zaman tercih edilir, ne zaman edilmez?', p: [
      'Lise ve üniversite laboratuvarlarında titrasyon hesaplarında N₁V₁ = N₂V₂ eşitliği büyük kolaylık sağlar. Su sertliği, alkalinite ve asitlik gibi analizlerde de eşdeğer temelli birimlerle karşılaşılır. Buna karşılık normalite, aynı çözelti için tepkimeye göre farklı değer alabildiğinden belirsizliğe yol açabilir; bu yüzden güncel bilimsel yazımda çoğunlukla molarite tercih edilir ve normalite verilecekse tesir değerliği ya da tepkime açıkça belirtilir.',
      'Bu sayfadaki sonuçlar öğrenme ve hesap kontrolü amaçlıdır. Derişik asit ve bazlarla çözelti hazırlarken laboratuvar güvenlik kurallarına uyun, analiz sonuçlarının geçerliliği için kullandığınız yöntemin standardına bakın.',
    ] },
  ],
  faq: [
    ['Normalite ile molarite arasındaki fark nedir?', 'Molarite bir litre çözeltideki mol sayısını, normalite ise eşdeğer gram sayısını verir. İkisi arasındaki bağ N = M × tesir değerliği eşitliğidir. Tesir değerliği 1 olan HCl ve NaOH gibi maddelerde iki değer birbirine eşittir.'],
    ['Tesir değerliği nasıl bulunur?', 'Asitlerde tepkimede verilen H⁺ sayısına, bazlarda OH⁻ sayısına, tuzlarda katyonların toplam yüküne, redoks tepkimelerinde ise alınan ya da verilen elektron sayısına bakılır. Emin değilseniz tepkime denklemini yazıp bir formül biriminin kaç H⁺, OH⁻ ya da elektron alışverişi yaptığını sayın.'],
    ['Eşdeğer kütle nedir?', 'Maddenin mol kütlesinin tesir değerliğine bölünmesiyle bulunan değerdir ve bir eşdeğer gramın kaç gram olduğunu gösterir. Sülfürik asit için 98 ÷ 2 = 49 g/eşdeğer, sodyum hidroksit için 40 ÷ 1 = 40 g/eşdeğer eder.'],
    ['1 N çözelti nasıl hazırlanır?', 'Maddenin eşdeğer kütlesi kadar gramı tartılır, bir miktar saf suda çözülür ve hacim balon jojede 1 litreye tamamlanır. Örneğin 1 N NaOH için 40 gram, 1 N H₂SO₄ için 49 gram saf madde gerekir. Derişik asitlerde saflık ve yoğunluk da hesaba katılmalıdır.'],
    ['Normalite molariteden küçük olabilir mi?', 'Hayır. Tesir değerliği en az 1 olan bir tam sayı olduğu için normalite molariteye eşit ya da onun tam katıdır. Daha küçük bir değer buluyorsanız hacim birimini ya da tesir değerliğini kontrol edin.'],
    ['Aynı çözeltinin normalitesi neden tepkimeye göre değişir?', 'Çünkü tesir değerliği maddenin o tepkimede kaç H⁺, OH⁻ ya da elektron alışverişi yaptığına bağlıdır. 1 M fosforik asit tam nötrleşmede 3 N, yalnızca bir hidrojenini verdiği tepkimede 1 N olarak hesaba girer.'],
    ['Hacmi litre olarak girebilir miyim?', 'Alan mililitre bekler. Litre cinsinden bir değeri 1000 ile çarparak yazın; örneğin 0,25 L için 250, 2 L için 2000 girin.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız kütle, hacim ve derişim değerleri herhangi bir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['molarite-hesapla', 'titrasyon-hesapla', 'molar-kutle-hesapla', 'mol-hesapla', 'seyreltme-hesapla', 'ph-hesapla'],
};
