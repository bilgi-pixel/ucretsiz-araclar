export default {
  slug: 'molar-kutle-hesapla',
  title: 'Molar Kütle (Mol Kütlesi) Hesaplama',
  h1Tail: 'kimyasal formülden g/mol',
  pageTitle: 'Molar Kütle Hesaplama – Kimyasal Formülden Mol Kütlesi (g/mol)',
  description: 'Kimyasal formülü yazın, molar kütleyi g/mol olarak hesaplayın. Parantezli formülleri ve kristal suyunu destekler; elementlerin kütlece yüzdesini de gösterir.',
  card: 'H2O, Ca(OH)2, CuSO4·5H2O gibi formüllerin mol kütlesini ve elementlerin kütlece yüzdesini hesaplayın.',
  category: 'bilim',
  keywords: ['molar kütle hesaplama', 'mol kütlesi hesaplama', 'molekül ağırlığı hesaplama', 'formülden mol kütlesi', 'g/mol hesaplama', 'bileşik mol kütlesi', 'atom kütlesi tablosu', 'kütlece yüzde bileşim'],
  lead: 'Bir elementin ya da bileşiğin kimyasal formülünü yazın; araç formülü çözümleyip atom kütlelerini toplayarak <strong>molar kütleyi g/mol</strong> cinsinden verir. Parantezli gruplar, köşeli parantezler ve kristal suyu (hidrat) yazımı desteklenir; her elementin katkısı ve kütlece yüzdesi ayrıca listelenir.',
  button: 'Hesapla',
  inputs: [
    { id: 'formul', label: 'Kimyasal formül', type: 'text', placeholder: 'Örn. H2O, Ca(OH)2, CuSO4.5H2O', hint: 'Element simgelerinde büyük-küçük harfe dikkat edin: Co kobalt, CO karbon monoksittir. Kristal suyu için nokta kullanın.', wide: true },
    { id: 'kutle', label: 'Örnek kütlesi (gram, isteğe bağlı)', type: 'number', placeholder: 'Örn. 36', hint: 'Doldurursanız bu kütlenin kaç mol ettiği de hesaplanır.' },
  ],
  compute(v, h) {
    const T = {
      H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
      Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
      Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
      Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
      Nb: 92.906, Mo: 95.95, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71, Sb: 121.76,
      Te: 127.6, I: 126.9, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Sm: 150.36,
      Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.5, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
      Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59, Tl: 204.38, Pb: 207.2,
      Bi: 208.98, Th: 232.04, Pa: 231.04, U: 238.03,
    };
    let s = String(v.formul ?? '').trim();
    if (!s) h.err('Bir kimyasal formül yazın (örn. H2O).');
    s = s.replace(/\s+/g, '')
      .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
      .replace(/[\[{]/g, '(').replace(/[\]}]/g, ')');
    if (s.length > 200) h.err('Formül çok uzun; en fazla 200 karakter yazın.');
    const toplam = {};
    const sira = [];
    const ekle = (hedef, sym, n) => { hedef[sym] = (hedef[sym] || 0) + n; };
    const parcalar = s.split(/[·.*•]/);
    for (const parca of parcalar) {
      if (!parca) h.err('Kristal suyu ayracından önce ve sonra bir formül olmalı (örn. CuSO4.5H2O).');
      const m = /^(\d*)(.*)$/.exec(parca);
      const kat = m[1] === '' ? 1 : Number(m[1]);
      const govde = m[2];
      if (kat < 1) h.err('Formülün başındaki katsayı en az 1 olmalı.');
      if (!govde) h.err('Katsayıdan sonra bir formül yazın (örn. 5H2O).');
      let i = 0;
      const sayi = () => {
        let t = '';
        while (i < govde.length && /\d/.test(govde[i])) { t += govde[i]; i++; }
        if (t === '') return 1;
        const n = Number(t);
        if (n < 1) h.err('Alt indis 0 olamaz; elementi formülden çıkarın ya da sayıyı düzeltin.');
        if (n > 100000) h.err('Alt indis çok büyük.');
        return n;
      };
      const grup = (derinlik) => {
        const yerel = {};
        let adet = 0;
        while (i < govde.length && govde[i] !== ')') {
          const ch = govde[i];
          if (ch === '(') {
            if (derinlik > 10) h.err('Çok fazla iç içe parantez var.');
            i++;
            const ic = grup(derinlik + 1);
            if (govde[i] !== ')') h.err('Açılan bir parantez kapatılmamış.');
            i++;
            const n = sayi();
            for (const k of Object.keys(ic)) ekle(yerel, k, ic[k] * n);
            adet++;
          } else if (/[A-Z]/.test(ch)) {
            let sym = ch;
            i++;
            if (i < govde.length && /[a-z]/.test(govde[i])) { sym += govde[i]; i++; }
            if (i < govde.length && /[a-z]/.test(govde[i])) h.err(`"${sym}${govde[i]}…" tanınmadı. Element simgeleri bir büyük harf ve en fazla bir küçük harften oluşur.`);
            if (!T[sym]) h.err(`"${sym}" simgeli bir element bulunamadı. Büyük-küçük harf yazımını kontrol edin (örn. NaCl, Co, CO).`);
            if (!sira.includes(sym)) sira.push(sym);
            ekle(yerel, sym, sayi());
            adet++;
          } else if (/[a-z]/.test(ch)) {
            h.err(`Element simgeleri büyük harfle başlar; "${ch}" harfini kontrol edin (örn. h2o yerine H2O).`);
          } else if (/\d/.test(ch)) {
            h.err('Sayı bir element simgesinden ya da kapanan parantezden sonra gelmelidir.');
          } else {
            h.err(`Formülde geçersiz karakter var: "${ch}". Yalnızca element simgeleri, sayılar, parantez ve nokta kullanın.`);
          }
        }
        if (adet === 0) h.err('Boş parantez ya da boş formül parçası var.');
        return yerel;
      };
      const sonuc = grup(0);
      if (i < govde.length) h.err('Fazladan bir kapanış parantezi var.');
      for (const k of Object.keys(sonuc)) ekle(toplam, k, sonuc[k] * kat);
    }
    let M = 0;
    let atom = 0;
    for (const k of sira) { M += toplam[k] * T[k]; atom += toplam[k]; }
    const satirlar = sira.map((k) => `${k}: ${toplam[k]} atom × ${h.fmt(T[k], 4)} = ${h.fmt(toplam[k] * T[k], 3)} g/mol (%${h.fmt(toplam[k] * T[k] / M * 100, 2)})`);
    const rows = [
      ['Molar kütle', h.fmt(M, 3) + ' g/mol'],
      ['Toplam atom sayısı', String(atom)],
      ['Element çeşidi', String(sira.length)],
      ['Kütlece bileşim', sira.map((k) => `${k} %${h.fmt(toplam[k] * T[k] / M * 100, 2)}`).join('; ')],
    ];
    if (String(v.kutle ?? '').trim() !== '') {
      const g = h.pos(v.kutle, 'Örnek kütlesi');
      rows.push(['Mol sayısı', h.sig(g / M, 6) + ' mol']);
    }
    return {
      rows,
      text: satirlar.join('\n'),
      note: 'Standart atom kütlelerinin kısaltılmış değerleri kullanılır (H = 1,008; C = 12,011; O = 15,999 …). Ders kitaplarındaki yuvarlatılmış değerlerle küçük farklar olabilir.',
    };
  },
  cases: [
    { in: { formul: 'H2O' }, out: { 'Molar kütle': '18,015 g/mol', 'Toplam atom sayısı': '3', 'Kütlece bileşim': 'H %11,19; O %88,81' } },
    { in: { formul: 'Ca(OH)2' }, out: { 'Molar kütle': '74,092 g/mol', 'Toplam atom sayısı': '5', 'Element çeşidi': '3' } },
    { in: { formul: 'CO2' }, out: { 'Molar kütle': '44,009 g/mol' } },
    { in: { formul: 'NaCl' }, out: { 'Molar kütle': '58,44 g/mol', 'Toplam atom sayısı': '2' } },
    { in: { formul: 'C6H12O6' }, out: { 'Molar kütle': '180,156 g/mol', 'Toplam atom sayısı': '24' } },
    { in: { formul: 'CuSO4.5H2O' }, out: { 'Molar kütle': '249,677 g/mol', 'Toplam atom sayısı': '21' } },
    { in: { formul: 'CuSO4·5H2O' }, out: { 'Molar kütle': '249,677 g/mol' } },
    { in: { formul: 'H2SO4' }, out: { 'Molar kütle': '98,072 g/mol' } },
    { in: { formul: 'Al2(SO4)3' }, out: { 'Molar kütle': '342,132 g/mol', 'Toplam atom sayısı': '17' } },
    { in: { formul: 'K4[Fe(CN)6]' }, out: { 'Molar kütle': '368,345 g/mol', 'Toplam atom sayısı': '17' } },
    { in: { formul: 'NH4NO3' }, out: { 'Molar kütle': '80,043 g/mol', 'Element çeşidi': '3' } },
    { in: { formul: 'H2O', kutle: '36,03' }, out: { 'Mol sayısı': '2 mol' }, textMatch: 'O: 1 atom × 15,999 = 15,999 g/mol \\(%88,81\\)' },
    { in: { formul: 'O2' }, out: { 'Molar kütle': '31,998 g/mol' } },
    { in: { formul: 'Xx2' }, error: true },
    { in: { formul: 'h2o' }, error: true },
    { in: { formul: 'Ca(OH2' }, error: true },
    { in: { formul: '' }, error: true },
  ],
  howto: [
    'Formül kutusuna bileşiğin kimyasal formülünü yazın. Alt indisleri normal rakamla girin: H₂SO₄ için H2SO4.',
    'Element simgelerinin ilk harfini büyük, varsa ikinci harfini küçük yazın. Çok atomlu grupları parantez içine alıp sayısını parantezden sonra belirtin: Ca(OH)2, Al2(SO4)3.',
    'Kristal suyu içeren bileşiklerde su kısmını nokta ile ayırın: CuSO4.5H2O.',
    'Belirli bir kütlenin kaç mol olduğunu da görmek istiyorsanız örnek kütlesini gram olarak ekleyin.',
    '"Hesapla" düğmesine basın. Molar kütle, atom sayıları ve her elementin kütlece yüzdesi listelenir; ayrıntılı döküm metin kutusunda yer alır.',
  ],
  sections: [
    { h: 'Molar kütle nedir?', p: [
      'Molar kütle (mol kütlesi), bir maddenin bir molünün gram cinsinden kütlesidir ve birimi g/mol\'dür. Bir mol, yaklaşık 6,022 × 10<sup>23</sup> tanecik demektir; dolayısıyla molar kütle, bu kadar atomun, molekülün ya da formül biriminin toplam kütlesini verir. Sayısal olarak maddenin bağıl atom kütlesine ya da bağıl molekül kütlesine eşittir; bu nedenle gündelik dilde "molekül ağırlığı" ifadesi de aynı anlamda kullanılır.',
      'Molar kütle kimyadaki hemen her nicel hesabın başlangıç noktasıdır. Tartılan gramı mole çevirmek, belirli derişimde çözelti hazırlamak, bir tepkimede ne kadar ürün oluşacağını öngörmek ya da bir gazın yoğunluğunu hesaplamak için önce maddenin molar kütlesi bilinmelidir.',
    ] },
    { h: 'Nasıl hesaplanır?', p: [
      'Bir bileşiğin molar kütlesi, formülündeki her elementin atom kütlesinin o elementin atom sayısıyla çarpılıp toplanmasıyla bulunur: <strong>M = Σ (atom sayısı × atom kütlesi)</strong>. Parantezli gruplarda parantez dışındaki sayı içerideki her atomu çarpar. Kristal suyu içeren bileşiklerde nokta ile ayrılan su moleküllerinin kütlesi de toplama eklenir.',
      'Araç, standart atom kütlelerinin yaygın kullanılan kısaltılmış değerleriyle çalışır: hidrojen 1,008; karbon 12,011; azot 14,007; oksijen 15,999; sodyum 22,990; kükürt 32,06; klor 35,45; kalsiyum 40,078; demir 55,845; bakır 63,546 gibi. Hidrojenden uranyuma kadar doğada bulunan ve kararlı atom kütlesi tanımlı elementler desteklenir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Su (H₂O):</strong> İki hidrojen ve bir oksijen atomu vardır. M = 2 × 1,008 + 15,999 = 2,016 + 15,999 = <strong>18,015 g/mol</strong>. Kütlenin %11,19\'u hidrojenden, %88,81\'i oksijenden gelir.',
      '<strong>Kalsiyum hidroksit, Ca(OH)₂:</strong> Parantez dışındaki 2, içerideki oksijen ve hidrojenin ikişer tane olduğunu gösterir. M = 40,078 + 2 × (15,999 + 1,008) = 40,078 + 34,014 = <strong>74,092 g/mol</strong>. Formülde toplam 5 atom bulunur.',
      '<strong>Alüminyum sülfat, Al₂(SO₄)₃:</strong> 2 alüminyum, 3 kükürt ve 12 oksijen atomu vardır. M = 2 × 26,982 + 3 × 32,06 + 12 × 15,999 = 53,964 + 96,18 + 191,988 = <strong>342,132 g/mol</strong>.',
      '<strong>Göztaşı, CuSO₄·5H₂O:</strong> Susuz bakır(II) sülfatın molar kütlesi 63,546 + 32,06 + 4 × 15,999 = 159,602 g/mol\'dür. Beş su molekülü 5 × 18,015 = 90,075 g/mol ekler ve toplam <strong>249,677 g/mol</strong> olur. Kristal suyu hesaba katılmazsa çözelti hazırlarken tartılan miktar belirgin biçimde hatalı çıkar.',
    ] },
    { h: 'Formül yazım kuralları', ul: [
      'Her element simgesi büyük harfle başlar; ikinci harf varsa küçüktür: <code>Na</code>, <code>Cl</code>, <code>Fe</code>.',
      'Büyük-küçük harf anlamı değiştirir: <code>Co</code> kobalt elementidir, <code>CO</code> ise karbon monoksit.',
      'Alt indisler elementin ya da parantezin hemen ardından normal rakamla yazılır: <code>C6H12O6</code>.',
      'Yuvarlak ve köşeli parantezler iç içe kullanılabilir: <code>K4[Fe(CN)6]</code>.',
      'Kristal suyu nokta, yıldız ya da orta nokta ile ayrılır: <code>CuSO4.5H2O</code>, <code>Na2CO3*10H2O</code>.',
      'İyon yükleri (+, −) ve hâl belirteçleri (k, s, g, suda) yazılmaz; yük molar kütleyi pratikte değiştirmez.',
    ] },
    { h: 'Ders kitabı değerleriyle farklar', p: [
      'Okul sorularında atom kütleleri çoğunlukla tam sayıya yuvarlanır (H = 1, C = 12, N = 14, O = 16, Na = 23, S = 32, Ca = 40; klor için 35,5). Bu değerlerle su 18 g/mol, sülfürik asit 98 g/mol, glikoz 180 g/mol bulunur. Araç ise daha hassas atom kütleleriyle 18,015; 98,072 ve 180,156 g/mol değerlerini verir. Fark genellikle binde birkaç düzeyindedir; sınav sorusu çözüyorsanız soruda verilen atom kütlelerini esas alın, laboratuvar tartımı yapıyorsanız hassas değeri kullanın.',
      'Atom kütleleri, elementin doğadaki izotoplarının bolluklarına göre ağırlıklı ortalamasıdır. Bazı elementlerde bu oran kaynağa göre çok az değiştiğinden, standart atom kütleleri resmî çizelgelerde aralık olarak da verilir; burada kullanılanlar bu aralıkların yaygın kabul gören tek değerli karşılıklarıdır.',
    ] },
    { h: 'Sınırlar', p: [
      'Teknesyum, prometyum ve uranyumdan ağır elementler gibi kararlı izotopu bulunmayan ve standart atom kütlesi tanımlanmamış elementler desteklenmez. Araç, formülün kimyasal olarak anlamlı olup olmadığını denetlemez; yazdığınız simgeler geçerliyse var olmayan bir bileşiğin de kütlesini toplar. Polimerler gibi tekrar sayısı belirsiz yapılarda yalnızca tekrarlanan birimin molar kütlesi hesaplanabilir. İzotopça zenginleştirilmiş maddelerde (örneğin ağır su) gerçek molar kütle buradaki değerden farklıdır.',
    ] },
  ],
  faq: [
    ['Molar kütle nasıl hesaplanır?', 'Formüldeki her elementin atom kütlesi atom sayısıyla çarpılır ve sonuçlar toplanır. Örneğin CO₂ için 12,011 + 2 × 15,999 = 44,009 g/mol bulunur.'],
    ['Molar kütle ile molekül kütlesi aynı şey midir?', 'Sayısal olarak aynıdır, birimleri farklıdır. Molekül kütlesi tek bir molekülün atomik kütle birimi (akb) cinsinden kütlesidir; molar kütle ise bir mol maddenin gram cinsinden kütlesidir ve g/mol ile ifade edilir.'],
    ['Suyun mol kütlesi neden tam 18 çıkmıyor?', 'Çünkü araç hidrojen için 1,008 ve oksijen için 15,999 değerlerini kullanır; sonuç 18,015 g/mol olur. Ders kitaplarında atom kütleleri 1 ve 16 olarak yuvarlandığı için 18 g/mol kullanılır.'],
    ['Parantezli formülleri nasıl yazmalıyım?', 'Grubu parantez içine alıp tekrar sayısını parantezden hemen sonra yazın: Mg(NO3)2, Ca3(PO4)2. Köşeli parantez de kullanabilirsiniz; araç ikisini aynı biçimde yorumlar.'],
    ['Kristal suyu (hidrat) nasıl girilir?', 'Ana formül ile su kısmı arasına nokta koyun ve su sayısını başa yazın: Na2CO3.10H2O ya da MgSO4.7H2O. Araç su moleküllerinin kütlesini toplam molar kütleye ekler.'],
    ['Elementlerin molar kütlesi nasıl bulunur?', 'Tek atomlu elementlerde molar kütle doğrudan atom kütlesidir: demir için Fe yazarsanız 55,845 g/mol görürsünüz. İki atomlu gazlar için molekül formülünü yazın: oksijen gazı O2 31,998 g/mol, azot gazı N2 28,014 g/mol.'],
    ['Küçük harfle yazdığımda neden hata alıyorum?', 'Kimyasal simgelerde büyük-küçük harf ayrımı anlam taşır. "co" yazımı kobalt mı yoksa karbon ve oksijen mi belirsiz kalır; bu yüzden araç simgelerin kurallı yazılmasını ister.'],
    ['Yazdığım formül bir yere gönderiliyor mu?', 'Hayır. Formül tarayıcınızda çözümlenir ve hesap orada yapılır; hiçbir veri sunucuya iletilmez.'],
  ],
  related: ['mol-hesapla', 'kutle-yuzdesi-bilesik-hesapla', 'molarite-hesapla', 'tanecik-sayisi-hesapla', 'gaz-yogunlugu-hesapla'],
};
