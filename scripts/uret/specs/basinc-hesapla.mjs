export default {
  slug: 'basinc-hesapla',
  title: 'Basınç Hesaplama',
  h1Tail: 'P = F ÷ A',
  pageTitle: 'Basınç Hesaplama – P = F/A ile Basınç, Kuvvet ve Yüzey Alanı',
  description: 'Kuvvet ve yüzey alanından basıncı pascal, kPa, bar ve atm olarak hesaplayın; basınçtan kuvveti ya da alanı bulun. P = F/A formülü ve çözümlü örnekler.',
  card: 'P = F/A ile katı basıncını pascal, bar ve atm olarak bulun; basınçtan kuvveti ya da yüzey alanını hesaplayın.',
  category: 'bilim',
  keywords: ['basınç hesaplama', 'basınç formülü', 'P = F/A', 'katı basıncı hesaplama', 'pascal hesaplama', 'kuvvet alan basınç', 'basınç nasıl bulunur', 'bar pascal'],
  lead: `Bir yüzeye dik etki eden kuvvetten ve yüzey alanından <strong>basıncı</strong> hesaplayın; basıncı bilinen durumda kuvveti ya da alanı bulun. Araç <strong>P = F ÷ A</strong> bağıntısını kullanır ve sonucu pascal, kilopascal, bar ve atmosfer olarak gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['p', 'Basınç (P)'], ['f', 'Kuvvet (F)'], ['a', 'Yüzey alanı (A)']] },
    { id: 'kuvvet', label: 'Kuvvet (N)', type: 'number', placeholder: 'Örn. 100', hint: 'Yüzeye dik kuvvet. Kuvveti arıyorsanız boş bırakın.' },
    { id: 'alan', label: 'Yüzey alanı', type: 'number', placeholder: 'Örn. 2', hint: 'Alanı arıyorsanız boş bırakın.' },
    { id: 'alanBirim', label: 'Alan birimi', type: 'select', options: [['m2', 'm²'], ['cm2', 'cm²']] },
    { id: 'basinc', label: 'Basınç (Pa)', type: 'number', placeholder: 'Örn. 50', hint: 'Pascal cinsinden; 1 bar = 100000 Pa. Basıncı arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const kat = v.alanBirim === 'cm2' ? 1e-4 : 1;
    let p, f, a;
    if (v.bul === 'f') {
      p = h.nonneg(v.basinc, 'Basınç');
      a = h.pos(v.alan, 'Yüzey alanı') * kat;
      f = p * a;
    } else if (v.bul === 'a') {
      f = h.pos(v.kuvvet, 'Kuvvet');
      p = h.pos(v.basinc, 'Basınç');
      a = f / p;
    } else {
      f = h.nonneg(v.kuvvet, 'Kuvvet');
      a = h.pos(v.alan, 'Yüzey alanı') * kat;
      p = f / a;
    }
    const pSatir = ['Basınç', h.fmt(p, 4) + ' Pa'];
    const fSatir = ['Kuvvet', h.fmt(f, 4) + ' N'];
    const aSatir = ['Yüzey alanı', h.sig(a, 6) + ' m²'];
    const bas = v.bul === 'f' ? [fSatir, pSatir, aSatir] : v.bul === 'a' ? [aSatir, pSatir, fSatir] : [pSatir, fSatir, aSatir];
    return {
      rows: [
        ...bas,
        ['Yüzey alanı (cm²)', h.sig(a * 1e4, 6) + ' cm²'],
        ['Basınç (kPa)', h.fmt(p / 1000, 6) + ' kPa'],
        ['Basınç (bar)', h.fmt(p / 1e5, 6) + ' bar'],
        ['Basınç (atm)', h.fmt(p / 101325, 6) + ' atm'],
      ],
      note: '1 Pa = 1 N/m²; 1 bar = 100.000 Pa; 1 atm = 101.325 Pa. Kuvvetin yüzeye dik ve düzgün dağıldığı varsayılır.',
    };
  },
  cases: [
    { in: { bul: 'p', kuvvet: '100', alan: '2', alanBirim: 'm2' }, out: { 'Basınç': '50 Pa', 'Basınç (kPa)': '0,05 kPa' } },
    { in: { bul: 'p', kuvvet: '50', alan: '5', alanBirim: 'cm2' }, out: { 'Basınç': '100.000 Pa', 'Basınç (bar)': '1 bar', 'Basınç (atm)': '0,986923 atm', 'Yüzey alanı': '0,0005 m²' } },
    { in: { bul: 'p', kuvvet: '600', alan: '0,03', alanBirim: 'm2' }, out: { 'Basınç': '20.000 Pa', 'Basınç (kPa)': '20 kPa', 'Basınç (bar)': '0,2 bar' } },
    { in: { bul: 'f', alan: '1', alanBirim: 'm2', basinc: '101325' }, out: { 'Kuvvet': '101.325 N', 'Basınç (atm)': '1 atm' } },
    { in: { bul: 'a', kuvvet: '500', basinc: '2500' }, out: { 'Yüzey alanı': '0,2 m²', 'Yüzey alanı (cm²)': '2.000 cm²' } },
    { in: { bul: 'p', kuvvet: '588,6', alan: '300', alanBirim: 'cm2' }, out: { 'Basınç': '19.620 Pa', 'Basınç (kPa)': '19,62 kPa' } },
    { in: { bul: 'f', alan: '20', alanBirim: 'cm2', basinc: '250000' }, out: { 'Kuvvet': '500 N' } },
    { in: { bul: 'p', kuvvet: '100', alan: '0', alanBirim: 'm2' }, error: true },
    { in: { bul: 'a', kuvvet: '500', basinc: '0' }, error: true },
    { in: { bul: 'p', kuvvet: '-5', alan: '2' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden basınç, kuvvet ya da yüzey alanından hangisini aradığınızı seçin.`,
    `Bildiğiniz değerleri yazın. Kuvvet newton, basınç pascal cinsindendir; alan için m² ya da cm² birimini listeden seçin.`,
    `Elinizde kütle varsa kuvveti (ağırlığı) bulmak için kütleyi yer çekimi ivmesiyle çarpın: 60 kg'lık bir kişinin ağırlığı yaklaşık 60 × 9,81 = 588,6 N'dur.`,
    `"Hesapla" düğmesine basın. Sonuçta basınç dört ayrı birimde, alan ise hem m² hem cm² olarak listelenir.`,
  ],
  sections: [
    { h: 'Basınç nedir?', p: [
      `Basınç, bir yüzeyin birim alanına dik olarak etki eden kuvvettir. Aynı kuvvet küçük bir alana uygulandığında büyük, geniş bir alana yayıldığında küçük basınç oluşturur. Bıçağın keskin tarafının kesmesi, raptiyenin sivri ucunun duvara kolayca girmesi, karda yürürken ayakların batması ama kayakla batılmaması hep bu ilişkiyle açıklanır.`,
      `Basınç skaler bir büyüklüktür; yönü yoktur, yalnızca büyüklüğü vardır. Kuvvet ise vektöreldir. Bu sayfa katı cisimlerin temas yüzeyine yaptığı basıncı ve genel olarak kuvvet-alan ilişkisini hesaplar.`,
    ] },
    { h: 'Formül ve birimler', p: [
      `Temel bağıntı <strong>P = F ÷ A</strong> biçimindedir. F yüzeye dik kuvvet (newton), A yüzey alanı (metrekare), P basınçtır. Birimi newton bölü metrekaredir ve <strong>pascal (Pa)</strong> adını alır: 1 Pa = 1 N/m². Formülden <code>F = P · A</code> ve <code>A = F ÷ P</code> eşitlikleri de elde edilir.`,
      `Pascal gündelik ölçekte çok küçük bir birimdir; bir kâğıt yaprağının masaya yaptığı basınç yaklaşık 1 Pa düzeyindedir. Bu yüzden pratikte katları kullanılır:`,
    ], ul: [
      `<strong>1 kPa</strong> = 1000 Pa`,
      `<strong>1 bar</strong> = 100.000 Pa = 100 kPa`,
      `<strong>1 atm</strong> = 101.325 Pa (deniz seviyesindeki standart hava basıncı)`,
      `<strong>1 cm²</strong> = 0,0001 m²; alan cm² verilmişse 10.000'e bölünerek m²'ye çevrilir`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 100 N ağırlığındaki bir kutu 2 m²'lik tabanıyla zemine oturuyor. P = 100 ÷ 2 = <strong>50 Pa</strong>.`,
      `<strong>Örnek 2:</strong> 50 N'luk kuvvet 5 cm²'lik bir yüzeye uygulanıyor. Alan 5 ÷ 10.000 = 0,0005 m² olduğundan P = 50 ÷ 0,0005 = <strong>100.000 Pa</strong>, yani tam 1 bar eder. Küçük bir kuvvetin dar alanda ne kadar büyük basınç oluşturduğuna dikkat edin.`,
      `<strong>Örnek 3:</strong> 60 kg'lık bir kişinin ağırlığı yaklaşık 588,6 N'dur. İki ayağının toplam taban alanı 300 cm² ise zemine yaptığı basınç 588,6 ÷ 0,03 = <strong>19.620 Pa</strong> (19,62 kPa) olur. Aynı kişi tek ayağı üzerinde durursa alan yarıya iner, basınç iki katına çıkar.`,
      `<strong>Örnek 4:</strong> 1 m²'lik yüzeye 1 atm (101.325 Pa) basınç uygulayan hava, bu yüzeye F = 101.325 × 1 = <strong>101.325 N</strong> kuvvet uygular; bu yaklaşık 10 tonluk bir kütlenin ağırlığına denktir.`,
      `<strong>Örnek 5:</strong> 500 N'luk bir yükün zemine en fazla 2500 Pa basınç yapması isteniyorsa gereken taban alanı A = 500 ÷ 2500 = <strong>0,2 m²</strong>, yani 2000 cm²'dir.`,
    ] },
    { h: 'Gündelik hayatta basınç', p: [
      `Basıncı artırmak istediğimizde alanı küçültürüz: bıçak, iğne, çivi, balta ve kramponlu ayakkabı bu amaçla sivri ya da keskin yapılır. Basıncı azaltmak istediğimizde alanı büyütürüz: iş makinelerinin paletleri, kar ayakkabıları, geniş lastikler, bina temelleri ve sırt çantalarının geniş askıları yükü geniş alana yayar.`,
      `Katılar üzerlerine uygulanan kuvveti aynı doğrultuda iletir; basıncı ise iletmek zorunda değildir. Bir çiviye çekiçle vurduğunuzda kuvvet uca aynen ulaşır, ancak ucun alanı çok küçük olduğundan oradaki basınç baş kısmındakinden kat kat büyüktür.`,
    ] },
    { h: 'Sıvı ve gaz basıncından farkı', p: [
      `Durgun sıvıların basıncı derinliğe ve sıvının yoğunluğuna bağlıdır ve P = h · d · g bağıntısıyla hesaplanır; kabın şekline ya da sıvı miktarına bağlı değildir. Kapalı kaplardaki gazların basıncı ise tanecik sayısı, sıcaklık ve hacimle belirlenir. Bu sayfadaki P = F ÷ A tanımı hepsi için geçerlidir, ancak sıvı ve gaz sorularında kuvvet doğrudan verilmediği için kendi bağıntıları kullanılır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Alanı cm² olarak bırakıp doğrudan bölmek; sonuç 10.000 kat küçük çıkar. Araçta birimi listeden seçerek bu hatadan kaçınabilirsiniz.`,
      `Kuvvet yerine kütleyi (kg) yazmak; kütle önce g ile çarpılarak newtona çevrilmelidir.`,
      `Temas yüzeyi yerine cismin toplam yüzey alanını kullanmak; yalnızca zemine değen alan hesaba katılır.`,
      `Eğik yüzeylerde ağırlığın tamamını almak; basıncı kuvvetin yüzeye dik bileşeni oluşturur.`,
      `Sonuç, kuvvetin yüzeye düzgün dağıldığı varsayımıyla bulunan ortalama basınçtır. Zemin taşıma kapasitesi, basınçlı kap ya da hidrolik sistem tasarımı gibi güvenlik gerektiren işlerde bu hesap tek başına yeterli değildir; ilgili mühendislik hesabı uzmanınca yapılmalıdır.`,
    ] },
  ],
  faq: [
    ['Basınç formülü nedir?', `Basınç, yüzeye dik kuvvetin yüzey alanına bölümüdür: P = F ÷ A. Kuvvet newton, alan metrekare alındığında sonuç pascal olur.`],
    ['Basıncın birimi nedir?', `SI birimi pascal'dır (Pa) ve newton bölü metrekareye eşittir. Uygulamada kilopascal, bar ve atmosfer de kullanılır; 1 bar 100.000 Pa, 1 atm 101.325 Pa'dır.`],
    ['Alan küçülürse basınç nasıl değişir?', `Kuvvet sabitken basınç alanla ters orantılıdır. Alan yarıya inerse basınç iki katına, onda birine inerse on katına çıkar. Sivri ve keskin aletlerin çalışma ilkesi budur.`],
    ['Kütleden basınç nasıl hesaplanır?', `Önce ağırlık bulunur: kütle yer çekimi ivmesiyle çarpılır (F = m · g). Sonra bu kuvvet temas alanına bölünür. 10 kg'lık cisim için kuvvet yaklaşık 98,1 N'dur.`],
    ['1 bar kaç pascal eder?', `1 bar tam olarak 100.000 pascal, yani 100 kilopascaldır. Standart atmosfer basıncından biraz küçüktür: 1 atm yaklaşık 1,01325 bar eder.`],
    ['Basınç kuvveti ile basınç aynı şey mi?', `Hayır. Basınç kuvveti, yüzeye dik etki eden toplam kuvvettir ve birimi newtondur. Basınç ise bu kuvvetin birim alana düşen miktarıdır ve birimi pascaldır.`],
    ['Bu araç sıvı basıncını hesaplar mı?', `Doğrudan değil. Sıvı basıncı derinlik, yoğunluk ve yer çekimi ivmesinden hesaplanır. Sıvının bir yüzeye uyguladığı kuvveti biliyorsanız P = F ÷ A burada da kullanılabilir.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['hidrostatik-basinc-hesapla', 'kuvvet-hesapla', 'kutle-agirlik-hesapla', 'yogunluk-hesapla', 'kaldirma-kuvveti-hesapla'],
};
