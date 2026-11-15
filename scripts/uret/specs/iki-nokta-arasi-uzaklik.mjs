export default {
  slug: 'iki-nokta-arasi-uzaklik',
  title: 'İki Nokta Arası Uzaklık Hesaplama',
  h1Tail: 'düzlemde ve uzayda',
  pageTitle: 'İki Nokta Arası Uzaklık Hesaplama – Koordinatlardan Mesafe Bulma',
  description: 'Koordinatları bilinen iki nokta arasındaki uzaklığı hesaplayın. Düzlemde (x, y) ve uzayda (x, y, z) çalışır; uzaklığın karesini ve eksen farklarını da gösterir.',
  card: 'Koordinatları verilen iki nokta arasındaki uzaklığı düzlemde ya da üç boyutlu uzayda hesaplayın.',
  category: 'matematik',
  keywords: ['iki nokta arası uzaklık', 'iki nokta arası uzaklık formülü', 'koordinatlardan mesafe hesaplama', 'analitik geometri uzaklık', 'öklid uzaklığı', 'uzayda iki nokta arası uzaklık', 'doğru parçası uzunluğu'],
  lead: 'İki noktanın koordinatlarını yazın; araç aralarındaki <strong>dik (kuş uçuşu) uzaklığı</strong> Pisagor bağıntısına dayanan uzaklık formülüyle hesaplar. z koordinatlarını da girerseniz hesap üç boyutlu uzayda yapılır.',
  button: 'Hesapla',
  inputs: [
    { id: 'x1', label: 'Birinci nokta: x₁', type: 'number', placeholder: 'Örn. 1' },
    { id: 'y1', label: 'Birinci nokta: y₁', type: 'number', placeholder: 'Örn. 1' },
    { id: 'x2', label: 'İkinci nokta: x₂', type: 'number', placeholder: 'Örn. 4' },
    { id: 'y2', label: 'İkinci nokta: y₂', type: 'number', placeholder: 'Örn. 5' },
    { id: 'z1', label: 'Birinci nokta: z₁ (isteğe bağlı)', type: 'number', placeholder: 'Düzlem için boş bırakın' },
    { id: 'z2', label: 'İkinci nokta: z₂ (isteğe bağlı)', type: 'number', placeholder: 'Düzlem için boş bırakın' },
  ],
  compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const z1Bos = String(v.z1 ?? '').trim() === '', z2Bos = String(v.z2 ?? '').trim() === '';
    if (z1Bos !== z2Bos) h.err('Üç boyutlu hesap için z₁ ve z₂ alanlarının ikisini de doldurun; düzlemde hesap için ikisini de boş bırakın.');
    const ucBoyut = !z1Bos;
    const dx = x2 - x1, dy = y2 - y1;
    const dz = ucBoyut ? h.num(v.z2, 'z₂') - h.num(v.z1, 'z₁') : 0;
    const uzaklik = Math.hypot(dx, dy, dz);
    const s = (x) => h.fmt(x, 6);
    const rows = [
      ['Uzaklık', s(uzaklik) + ' birim'],
      ['Uzaklığın karesi', s(dx * dx + dy * dy + dz * dz)],
      ['Δx', s(dx)],
      ['Δy', s(dy)],
    ];
    if (ucBoyut) rows.push(['Δz', s(dz)]);
    rows.push(['Eksenler boyunca toplam yol', s(Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) + ' birim']);
    return {
      rows,
      note: ucBoyut
        ? 'd = √(Δx² + Δy² + Δz²). Üç eksenin de aynı birimde olduğu varsayılır.'
        : 'd = √(Δx² + Δy²). İki eksenin de aynı birimde olduğu varsayılır.',
    };
  },
  cases: [
    { in: { x1: '1', y1: '1', x2: '4', y2: '5' }, out: { 'Uzaklık': '5 birim', 'Uzaklığın karesi': '25', 'Δx': '3', 'Δy': '4', 'Eksenler boyunca toplam yol': '7 birim' } },
    { in: { x1: '1', y1: '2', x2: '4', y2: '6', z1: '3', z2: '15' }, out: { 'Uzaklık': '13 birim', 'Uzaklığın karesi': '169', 'Δz': '12' } },
    { in: { x1: '0', y1: '0', x2: '3', y2: '4' }, out: { 'Uzaklık': '5 birim' } },
    { in: { x1: '-2', y1: '3', x2: '4', y2: '-5' }, out: { 'Uzaklık': '10 birim', 'Δx': '6', 'Δy': '-8' } },
    { in: { x1: '0', y1: '0', x2: '1', y2: '1' }, out: { 'Uzaklık': '1,414214 birim', 'Uzaklığın karesi': '2' } },
    { in: { x1: '0', y1: '0', x2: '1', y2: '2', z1: '0', z2: '2' }, out: { 'Uzaklık': '3 birim', 'Eksenler boyunca toplam yol': '5 birim' } },
    { in: { x1: '1,5', y1: '2', x2: '4,5', y2: '6' }, out: { 'Uzaklık': '5 birim' } },
    { in: { x1: '7', y1: '-3', x2: '7', y2: '-3' }, out: { 'Uzaklık': '0 birim' } },
    { in: { x1: 'abc', y1: '1', x2: '4', y2: '5' }, error: true },
    { in: { x1: '1', y1: '1', x2: '4', y2: '5', z1: '2' }, error: true },
  ],
  howto: [
    'Birinci noktanın x ve y koordinatlarını "x₁" ve "y₁" alanlarına, ikinci noktanınkileri "x₂" ve "y₂" alanlarına yazın.',
    'Noktalar düzlemdeyse z alanlarını boş bırakın. Uzayda hesap yapacaksanız iki noktanın z koordinatlarını da girin.',
    '"Hesapla" düğmesine basın. İlk satırda iki nokta arasındaki uzaklık görünür.',
    'Köklü sonucu elle sadeleştirmek isterseniz "Uzaklığın karesi" satırındaki sayının karekökünü alın; örneğin kare 8 ise uzaklık 2√2\'dir.',
  ],
  sections: [
    { h: 'Uzaklık formülü nereden gelir?', p: [
      'Koordinat düzleminde iki noktayı birleştiren doğru parçası, kenarları eksenlere paralel bir dik üçgenin hipotenüsüdür. Üçgenin yatay dik kenarı iki noktanın x koordinatları arasındaki fark (Δx), düşey dik kenarı ise y koordinatları arasındaki farktır (Δy). Pisagor bağıntısı hipotenüsün karesinin dik kenarların kareleri toplamına eşit olduğunu söyler; buradan uzaklık formülü çıkar:',
      '<strong>d = √[(x₂ − x₁)² + (y₂ − y₁)²]</strong>',
      'Farkların karesi alındığı için noktaların hangisinin birinci, hangisinin ikinci yazıldığı önemli değildir; A\'dan B\'ye uzaklık ile B\'den A\'ya uzaklık aynıdır. Uzaklık hiçbir zaman negatif çıkmaz ve yalnızca iki nokta aynıysa sıfırdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> A(1, 1) ve B(4, 5). Δx = 4 − 1 = 3, Δy = 5 − 1 = 4. d = √(3² + 4²) = √(9 + 16) = √25 = 5 birim. Bu, bilinen 3-4-5 dik üçgenidir.',
      '<strong>Örnek 2:</strong> A(−2, 3) ve B(4, −5). Δx = 4 − (−2) = 6, Δy = −5 − 3 = −8. d = √(36 + 64) = √100 = 10 birim. Negatif koordinat çıkarılırken işaretin artıya döndüğüne dikkat edin.',
      '<strong>Örnek 3:</strong> A(0, 0) ve B(1, 1). d = √(1 + 1) = √2 ≈ 1,414214 birim. Kenarı 1 birim olan karenin köşegenidir.',
    ] },
    { h: 'Üç boyutlu uzayda uzaklık', p: [
      'Noktalar uzaydaysa formüle üçüncü eksenin farkı eklenir: <strong>d = √(Δx² + Δy² + Δz²)</strong>. Mantık aynıdır; önce tabandaki köşegen, sonra bu köşegenle yükseklik farkının oluşturduğu ikinci dik üçgenin hipotenüsü bulunur.',
      '<strong>Örnek:</strong> A(1, 2, 3) ve B(4, 6, 15). Δx = 3, Δy = 4, Δz = 12. d = √(9 + 16 + 144) = √169 = 13 birim. Tabandaki uzaklık 5 birimdir; 5 ve 12 dik kenarlı üçgenin hipotenüsü de 13\'tür.',
      'Bir odanın karşılıklı iki köşesi arasındaki mesafe, bir dikdörtgenler prizmasının cisim köşegeni ya da farklı kotlardaki iki nokta arasına çekilecek kablonun en kısa boyu bu formülle hesaplanır.',
    ] },
    { h: 'Sonuç satırları ne anlatır?', ul: [
      '<strong>Uzaklık:</strong> İki nokta arasındaki en kısa, düz çizgi mesafesi. Öklid uzaklığı olarak da adlandırılır.',
      '<strong>Uzaklığın karesi:</strong> Karekök alınmadan önceki toplam. Tam kare değilse sonucu köklü biçimde yazmak için kullanılır.',
      '<strong>Δx, Δy, Δz:</strong> İkinci noktanın koordinatından birincinin çıkarılmasıyla bulunan işaretli farklar. Hangi yönde ne kadar ilerlendiğini gösterir.',
      '<strong>Eksenler boyunca toplam yol:</strong> Farkların mutlak değerlerinin toplamı. Yalnızca eksenlere paralel hareket edilebildiğinde (ızgara planlı sokaklar, satranç tahtasında kale) kat edilecek yoldur ve düz çizgi uzaklığından kısa olamaz.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Analitik geometri sorularında uzaklık formülü; üçgenin kenar uzunluklarını ve çevresini bulmak, üçgenin ikizkenar, eşkenar ya da dik olup olmadığını sınamak, çemberin yarıçapını merkez ve çember üzerindeki bir noktadan hesaplamak için kullanılır. Üç kenar uzunluğu bulunduktan sonra en uzun kenarın karesi diğer ikisinin kareleri toplamına eşitse üçgen diktir.',
      'Okul dışında da aynı hesap karşınıza çıkar: bir çizim programındaki iki nokta arasının ölçüsü, ekrandaki iki piksel arasındaki mesafe, oyun programlamada iki nesnenin birbirine yakınlığı, arsa planında koordinatları verilen iki köşe arasındaki kenar uzunluğu ve veri biliminde iki gözlemin benzerliği bu formülle ölçülür.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Farkların karesini almak yerine koordinatların karelerinin farkını almak. (x₂ − x₁)² ile x₂² − x₁² aynı şey değildir.',
      'Negatif koordinatı çıkarırken işareti çevirmemek: 4 − (−2) işleminin sonucu 2 değil 6\'dır.',
      'Karekökü ayrı ayrı almak: √(9 + 16) = 5\'tir; √9 + √16 = 7 değildir.',
      'x ile y koordinatlarını karıştırmak; bir noktanın x değerini diğerinin y değerinden çıkarmak.',
      'Eksenleri farklı birimlerde kullanmak. Bir eksen metre, diğeri santimetre ise önce aynı birime çevirin.',
    ] },
    { h: 'Sınırlar', p: [
      'Bu araç düz (Öklid) geometride çalışır. Harita üzerindeki enlem ve boylam değerleri düzlem koordinatı değildir; iki şehir arasındaki mesafe için dünyanın küreselliğini hesaba katan ayrı bir yöntem gerekir. Sonuç altı ondalık basamağa yuvarlanır ve birim olarak koordinatların birimi neyse o kabul edilir.',
    ] },
  ],
  faq: [
    ['İki nokta arasındaki uzaklık formülü nedir?', 'd = √[(x₂ − x₁)² + (y₂ − y₁)²]. Koordinat farklarının kareleri toplanır ve karekökü alınır. Formül, Pisagor bağıntısının koordinat düzlemine uygulanmış hâlidir.'],
    ['Uzayda iki nokta arasındaki uzaklık nasıl bulunur?', 'Formüle z farkının karesi eklenir: d = √(Δx² + Δy² + Δz²). Araçta z₁ ve z₂ alanlarını doldurduğunuzda hesap kendiliğinden üç boyutlu yapılır.'],
    ['Noktaların sırası sonucu etkiler mi?', 'Hayır. Farkların karesi alındığı için işaret kaybolur; A\'dan B\'ye ve B\'den A\'ya uzaklık aynıdır. Yalnızca Δx ve Δy satırlarındaki işaretler değişir.'],
    ['Uzaklık negatif çıkabilir mi?', 'Hayır. Uzaklık bir karekök sonucudur ve en az sıfırdır. Sıfır çıkması iki noktanın aynı nokta olduğu anlamına gelir.'],
    ['Sonuç köklü çıkıyorsa tam değerini nasıl yazarım?', '"Uzaklığın karesi" satırındaki sayıyı kök içine yazın ve tam kare çarpanlarını dışarı alın. Örneğin kare 50 ise uzaklık √50 = 5√2 olur; araç bunun yaklaşık değeri olan 7,071068\'i gösterir.'],
    ['Bir noktanın orijine uzaklığını nasıl bulurum?', 'İkinci nokta olarak (0, 0) girin. Sonuç √(x² + y²) değerine eşittir; örneğin (3, 4) noktasının orijine uzaklığı 5 birimdir.'],
    ['Enlem ve boylamla şehirler arası mesafe hesaplanır mı?', 'Bu araçla hayır. Enlem ve boylam küre üzerindeki açılardır; düzlem formülü yanlış sonuç verir. Coğrafi mesafeler için büyük çember hesabı yapan bir araç gerekir.'],
    ['Girdiğim koordinatlar kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['orta-nokta-hesapla', 'egim-hesapla', 'dogru-denklemi-bul', 'ucgen-alani-hesapla', 'daire-alani-hesapla'],
};
