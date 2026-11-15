export default {
  slug: 'kutle-yuzdesi-bilesik-hesapla',
  title: 'Bileşikte Kütlece Yüzde Bileşim Hesaplama',
  h1Tail: 'formülden element yüzdeleri',
  pageTitle: 'Kütlece Yüzde Bileşim Hesaplama – Bileşikte Element Yüzdesi',
  description: 'Kimyasal formülü yazın; bileşikteki her elementin kütlece yüzdesini ve molar kütleyi görün. Parantezli formüller ve kristal suyu desteklenir.',
  card: 'Kimyasal formülden bileşikteki her elementin kütlece yüzdesini ve molar kütleyi bulun; parantez ve hidratlar desteklenir.',
  category: 'bilim',
  keywords: ['kütlece yüzde bileşim', 'bileşikte element yüzdesi', 'yüzde bileşim hesaplama', 'kütlece yüzde hesaplama', 'elementin kütlece yüzdesi', 'formülden yüzde bulma', 'bileşikte kütle oranı'],
  lead: 'Bir bileşiğin formülünü yazın; içindeki her elementin <strong>kütlece yüzde kaçını</strong> oluşturduğunu ve bileşiğin molar kütlesini görün. İsterseniz numune kütlesini de girerek her elementten kaç gram bulunduğunu hesaplayın.',
  button: 'Hesapla',
  inputs: [
    { id: 'formul', label: 'Kimyasal formül', type: 'text', placeholder: 'Örn. Ca(OH)2', hint: 'Büyük-küçük harfe dikkat edin (Co kobalt, CO karbon monoksit). Kristal suyu için nokta kullanın: CuSO4.5H2O' },
    { id: 'numune', label: 'Numune kütlesi (g, isteğe bağlı)', type: 'number', placeholder: 'Örn. 50' },
  ],
  compute(v, h) {
    const A = {
      H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
      Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
      Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
      Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
      Nb: 92.906, Mo: 95.95, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
      Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Sm: 150.36,
      Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
      Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59, Tl: 204.38, Pb: 207.2,
      Bi: 208.98, Th: 232.04, U: 238.03,
    };
    let f = String(v.formul ?? '').replace(/\s/g, '').replace(/[₀-₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)));
    if (f === '') h.err('Kimyasal formülü yazın (örn. H2O, Ca(OH)2).');
    if (f.length > 100) h.err('Formül çok uzun; en fazla 100 karakter yazın.');
    const sayim = {};
    const sira = [];
    const ekle = (hedef, sem, n) => { hedef[sem] = (hedef[sem] || 0) + n; };
    const coz = (s) => {
      const yigin = [{}];
      let i = 0;
      const sayiOku = () => {
        let j = i;
        while (j < s.length && /\d/.test(s[j])) j++;
        if (j === i) return 1;
        const n = Number(s.slice(i, j));
        i = j;
        if (n < 1) h.err('Formülde alt indis 0 olamaz.');
        return n;
      };
      while (i < s.length) {
        const c = s[i];
        if (c === '(' || c === '[') { yigin.push({}); i++; }
        else if (c === ')' || c === ']') {
          if (yigin.length < 2) h.err('Formülde açılmamış bir parantez kapatılmış.');
          i++;
          const k = sayiOku();
          const grup = yigin.pop();
          for (const e of Object.keys(grup)) ekle(yigin[yigin.length - 1], e, grup[e] * k);
        } else if (/[A-Z]/.test(c)) {
          let sem = c;
          if (i + 1 < s.length && /[a-z]/.test(s[i + 1])) sem += s[i + 1];
          if (!(sem in A)) {
            if (sem.length === 2 && sem[0] in A && !/[a-z]/.test(s[i + 1] || '')) sem = c;
            else h.err(`"${sem}" tabloda bulunan bir element sembolü değil. Yazımı ve büyük-küçük harfi kontrol edin.`);
          }
          i += sem.length;
          if (!sira.includes(sem)) sira.push(sem);
          ekle(yigin[yigin.length - 1], sem, sayiOku());
        } else if (/[a-z]/.test(c)) h.err('Element sembolleri büyük harfle başlar (örn. NaCl, H2O). Formülü büyük-küçük harfe dikkat ederek yazın.');
        else h.err(`Formülde tanınmayan karakter var: "${c}".`);
      }
      if (yigin.length !== 1) h.err('Formülde kapatılmamış parantez var.');
      return yigin[0];
    };
    for (const parca of f.split(/[.·*]/)) {
      if (parca === '') h.err('Formülde nokta işaretinden önce ya da sonra eksik bölüm var.');
      const m = /^(\d*)(.*)$/.exec(parca);
      const kat = m[1] === '' ? 1 : Number(m[1]);
      if (kat < 1 || m[2] === '') h.err('Kristal suyu bölümünü 5H2O biçiminde yazın.');
      const p = coz(m[2]);
      for (const e of Object.keys(p)) ekle(sayim, e, p[e] * kat);
    }
    let M = 0;
    let atom = 0;
    for (const e of sira) { M += A[e] * sayim[e]; atom += sayim[e]; }
    const bosNumune = String(v.numune ?? '').trim() === '';
    const numune = bosNumune ? null : h.pos(v.numune, 'Numune kütlesi');
    const rows = [['Molar kütle', h.fmt(M, 3) + ' g/mol']];
    for (const e of sira) {
      const pay = A[e] * sayim[e];
      rows.push([`${e} yüzdesi`, `%${h.fmt(pay / M * 100, 2)} (${sayim[e]} atom, ${h.fmt(pay, 3)} g/mol)`]);
    }
    if (numune !== null) for (const e of sira) rows.push([`${e} kütlesi`, h.fmt(numune * A[e] * sayim[e] / M, 3) + ' g']);
    rows.push(['Formül birimindeki atom sayısı', String(atom)]);
    return { rows, note: 'Yüzdeler standart atom kütleleriyle hesaplanır ve iki ondalığa yuvarlanır; toplamları yuvarlama nedeniyle 100\'den 0,01 kadar sapabilir.' };
  },
  cases: [
    { in: { formul: 'H2O' }, out: { 'Molar kütle': '18,015 g/mol', 'H yüzdesi': '%11,19 (2 atom, 2,016 g/mol)', 'O yüzdesi': '%88,81 (1 atom, 15,999 g/mol)', 'Formül birimindeki atom sayısı': '3' } },
    { in: { formul: 'Ca(OH)2' }, out: { 'Molar kütle': '74,092 g/mol', 'Ca yüzdesi': '%54,09 (1 atom, 40,078 g/mol)', 'O yüzdesi': '%43,19 (2 atom, 31,998 g/mol)', 'H yüzdesi': '%2,72 (2 atom, 2,016 g/mol)' } },
    { in: { formul: 'CO2' }, out: { 'Molar kütle': '44,009 g/mol', 'C yüzdesi': '%27,29 (1 atom, 12,011 g/mol)', 'O yüzdesi': '%72,71 (2 atom, 31,998 g/mol)' } },
    { in: { formul: 'NaCl', numune: '100' }, out: { 'Molar kütle': '58,44 g/mol', 'Na yüzdesi': '%39,34 (1 atom, 22,99 g/mol)', 'Na kütlesi': '39,339 g', 'Cl kütlesi': '60,661 g' } },
    { in: { formul: 'CuSO4.5H2O' }, out: { 'Molar kütle': '249,677 g/mol', 'Cu yüzdesi': '%25,45 (1 atom, 63,546 g/mol)', 'O yüzdesi': '%57,67 (9 atom, 143,991 g/mol)', 'H yüzdesi': '%4,04 (10 atom, 10,08 g/mol)', 'Formül birimindeki atom sayısı': '21' } },
    { in: { formul: 'Fe2O3' }, out: { 'Molar kütle': '159,687 g/mol', 'Fe yüzdesi': '%69,94 (2 atom, 111,69 g/mol)', 'O yüzdesi': '%30,06 (3 atom, 47,997 g/mol)' } },
    { in: { formul: 'C6H12O6' }, out: { 'Molar kütle': '180,156 g/mol', 'C yüzdesi': '%40 (6 atom, 72,066 g/mol)', 'H yüzdesi': '%6,71 (12 atom, 12,096 g/mol)' } },
    { in: { formul: '(NH4)2SO4' }, out: { 'Molar kütle': '132,134 g/mol', 'N yüzdesi': '%21,2 (2 atom, 28,014 g/mol)', 'S yüzdesi': '%24,26 (1 atom, 32,06 g/mol)' } },
    { in: { formul: 'Xy2O' }, error: true },
    { in: { formul: 'Ca(OH2' }, error: true },
    { in: { formul: '' }, error: true },
    { in: { formul: 'h2o' }, error: true },
  ],
  howto: [
    '"Kimyasal formül" kutusuna bileşiğin formülünü yazın. Alt indisleri normal rakamla girin: H2O, Fe2O3, Ca(OH)2.',
    'Parantezli grupları olduğu gibi yazın; kristal suyu içeren bileşiklerde su kısmını noktayla ayırın (CuSO4.5H2O).',
    'Belirli bir miktar maddede her elementten kaç gram olduğunu görmek istiyorsanız "Numune kütlesi" alanına gram değerini yazın; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satırda molar kütle, ardından her element için kütlece yüzde, atom sayısı ve o elementin molar kütleye katkısı listelenir.',
    'Yüzdelerin toplamının 100 ettiğini kontrol edin; yuvarlama nedeniyle 99,99 ya da 100,01 görmeniz olağandır.',
  ],
  sections: [
    { h: 'Kütlece yüzde bileşim nedir?', p: [
      'Kütlece yüzde bileşim, bir bileşiğin kütlesinin yüzde kaçının hangi elementten geldiğini gösterir. Bileşikler sabit oranlar yasasına uyar: saf su nereden alınırsa alınsın kütlesinin yaklaşık %11,19\'u hidrojen, %88,81\'i oksijendir. Bu oran numunenin büyüklüğüne bağlı değildir; bir damla su için de bir ton su için de aynıdır.',
      'Bu bilgi kimyada pek çok yerde kullanılır: gübrelerdeki azot oranının karşılaştırılması, bir cevherden elde edilebilecek metal miktarının tahmini, element analizi sonuçlarından basit formül bulunması ve bir maddenin saflığının sınanması bunlardan birkaçıdır.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Bir elementin kütlece yüzdesi şu bağıntıyla bulunur: <strong>% element = (atom sayısı × atom kütlesi) ÷ bileşiğin molar kütlesi × 100</strong>. Molar kütle, formüldeki tüm atomların kütlelerinin toplamıdır. Parantez dışındaki alt indis parantez içindeki her atomu çarpar; kristal suyundaki katsayı ise su molekülünün tamamını çarpar.',
      'Araç standart atom kütlelerini kullanır (H 1,008; C 12,011; N 14,007; O 15,999; Na 22,990; S 32,06; Cl 35,45; Ca 40,078; Fe 55,845; Cu 63,546 gibi). Okul sorularında çoğu zaman yuvarlatılmış değerler (H 1, C 12, O 16) verildiğinden, elle bulduğunuz sonuç ile buradaki sonuç arasında virgülden sonraki basamaklarda küçük farklar olabilir.',
    ] },
    { h: 'Çözümlü örnek: su (H₂O)', p: [
      'Suyun formülünde iki hidrojen ve bir oksijen atomu vardır. Hidrojenin katkısı 2 × 1,008 = 2,016 g/mol, oksijenin katkısı 15,999 g/mol\'dür. Molar kütle 2,016 + 15,999 = 18,015 g/mol olur. Hidrojen yüzdesi 2,016 ÷ 18,015 × 100 = <strong>%11,19</strong>, oksijen yüzdesi 15,999 ÷ 18,015 × 100 = <strong>%88,81</strong> bulunur. Molekülde atom sayısı bakımından hidrojen çoğunlukta olsa da kütlenin büyük kısmı oksijenden gelir; atom sayısı oranı ile kütle oranı aynı şey değildir.',
    ] },
    { h: 'Çözümlü örnek: parantezli formül ve hidrat', p: [
      'Kalsiyum hidroksit Ca(OH)₂ formülünde parantez dışındaki 2, içerideki oksijen ve hidrojeni ikiye katlar: bir Ca, iki O, iki H. Katkılar sırasıyla 40,078, 31,998 ve 2,016 g/mol; toplam 74,092 g/mol\'dür. Yüzdeler Ca için %54,09, O için %43,19, H için %2,72 çıkar.',
      'Göztaşı olarak bilinen bakır(II) sülfat pentahidrat CuSO₄·5H₂O biçiminde yazılır. Beş su molekülü 10 hidrojen ve 5 oksijen getirir; sülfattaki dört oksijenle birlikte toplam dokuz oksijen olur. Molar kütle 249,677 g/mol, bakır yüzdesi %25,45\'tir. Aynı tuzun susuz hâlinde (CuSO₄) bakır oranı daha yüksektir; hidratlarda kristal suyunu hesaba katmamak sık yapılan bir hatadır.',
    ] },
    { h: 'Numune kütlesinden element miktarı', p: [
      'Yüzde bileşim bilindikten sonra herhangi bir miktar maddede bir elementten kaç gram bulunduğu basit bir çarpımla elde edilir. Sodyum klorürde sodyum oranı %39,34\'tür; 100 gram sofra tuzunda yaklaşık 39,34 gram sodyum, 60,66 gram klor vardır. Araçta numune kütlesini girdiğinizde bu değerler ayrı satırlar hâlinde, yuvarlanmamış orandan hesaplanarak gösterilir.',
      'Aynı yöntem gübre karşılaştırmasında da işe yarar: amonyum sülfat (NH₄)₂SO₄ kütlece %21,2 azot içerir. İki farklı azotlu bileşiğin formüllerini sırayla yazarak hangisinin birim kütle başına daha fazla azot taşıdığını görebilirsiniz.',
    ] },
    { h: 'Formül yazım kuralları ve sınırlar', ul: [
      'Element sembolleri büyük harfle başlar, ikinci harf küçüktür: <code>Na</code>, <code>Cl</code>, <code>Fe</code>. <code>CO</code> karbon monoksit, <code>Co</code> kobalttır.',
      'Alt indisler sembolden hemen sonra yazılır: <code>Al2(SO4)3</code>. Yuvarlak ve köşeli parantez iç içe kullanılabilir.',
      'Kristal suyu nokta, orta nokta ya da yıldızla ayrılır: <code>Na2CO3.10H2O</code>.',
      'İyon yükleri (2+, −) ve hâl belirteçleri (k, s, g, suda) yazılmaz.',
      'Tabloda doğada kararlı izotopu bulunan elementler ile toryum ve uranyum yer alır; standart atom kütlesi tanımlı olmayan radyoaktif elementler desteklenmez.',
      'Araç formülün kimyasal olarak var olup olmadığını denetlemez; yalnızca yazdığınız atom sayılarına göre hesap yapar.',
    ] },
  ],
  faq: [
    ['Bileşikte bir elementin kütlece yüzdesi nasıl bulunur?', 'Elementin formüldeki atom sayısı atom kütlesiyle çarpılır, bileşiğin molar kütlesine bölünür ve 100 ile çarpılır. Örneğin CO₂ için karbon yüzdesi 12,011 ÷ 44,009 × 100 = %27,29 olur.'],
    ['Yüzdelerin toplamı neden tam 100 çıkmıyor?', 'Her yüzde iki ondalık basamağa ayrı ayrı yuvarlandığı için toplam 99,99 ya da 100,01 olabilir. Yuvarlanmamış değerlerin toplamı tam 100\'dür.'],
    ['Ders kitabındaki sonuçla küçük fark var, neden?', 'Okul sorularında atom kütleleri genellikle tam sayıya yuvarlanır (H 1, O 16, Ca 40). Bu araç daha hassas standart değerleri kullandığından sonuçlar virgülden sonra biraz farklı çıkabilir.'],
    ['Kristal suyu olan bileşikleri nasıl yazarım?', 'Su kısmını noktayla ayırıp başına katsayısını ekleyin: CuSO4.5H2O, MgSO4.7H2O gibi. Katsayı su molekülündeki tüm atomlara uygulanır.'],
    ['Kütlece yüzde ile mol yüzdesi aynı mıdır?', 'Hayır. Suda atomların üçte ikisi hidrojendir ama kütlenin yalnızca %11,19\'u hidrojendir. Kütlece yüzde atomların ağırlığını, mol yüzdesi ise sayısını esas alır.'],
    ['Yüzde bileşimden formül bulunabilir mi?', 'Evet, tersine işlemle basit (ampirik) formül bulunur: her elementin yüzdesi atom kütlesine bölünür, çıkan sayılar en küçüğüne oranlanır ve tam sayılara tamamlanır. Bu araç yalnızca formülden yüzdeye doğru hesap yapar.'],
    ['Bu araç karışımların yüzdesini hesaplar mı?', 'Hayır. Buradaki hesap tek bir saf bileşiğin içindeki elementler içindir. Çözeltilerde çözünen maddenin kütlece yüzdesi farklı bir hesaptır ve ayrı bir araçla yapılır.'],
    ['Yazdığım formül kaydediliyor mu?', 'Hayır. Atom kütleleri tablosu sayfanın içindedir; formül tarayıcınızda çözümlenir ve hiçbir yere gönderilmez.'],
  ],
  related: ['molar-kutle-hesapla', 'mol-hesapla', 'kutlece-yuzde-derisim-hesapla', 'periyodik-tablo', 'tanecik-sayisi-hesapla', 'elektron-dizilimi-bul'],
};
