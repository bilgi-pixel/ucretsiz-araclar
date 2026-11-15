export default {
  slug: 'daire-dilimi-hesapla',
  title: 'Daire Dilimi Alanı Hesaplama',
  h1Tail: 'dilim alanı, yay ve kiriş',
  pageTitle: 'Daire Dilimi Alanı Hesaplama – Yay Uzunluğu ve Kiriş ile',
  description: 'Yarıçapı ve merkez açıyı yazın; daire diliminin alanını, yay uzunluğunu, dilim çevresini, kiriş uzunluğunu ve daire parçasının alanını derece ya da radyanla hesaplayın.',
  card: 'Yarıçap ve merkez açıdan daire dilimi alanını, yay ve kiriş uzunluğunu, daire parçası alanını bulun.',
  category: 'matematik',
  keywords: ['daire dilimi alanı hesaplama', 'yay uzunluğu hesaplama', 'daire dilimi formülü', 'merkez açı alan', 'kiriş uzunluğu hesaplama', 'daire parçası alanı', 'sektör alanı'],
  lead: `Yarıçapı ve merkez açısı bilinen bir <strong>daire diliminin</strong> (sektörün) alanını hesaplayın. Araç ayrıca <strong>yay uzunluğunu</strong>, dilimin çevresini, yayın uçlarını birleştiren <strong>kirişi</strong> ve kiriş ile yay arasında kalan <strong>daire parçasının</strong> alanını verir. Açıyı derece ya da radyan olarak girebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yaricap', label: 'Yarıçap', type: 'number', placeholder: 'Örn. 10' },
    { id: 'aci', label: 'Merkez açı', type: 'number', placeholder: 'Örn. 90' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece'], ['radyan', 'Radyan']] },
  ],
  compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const aci = h.pos(v.aci, 'Merkez açı');
    let t;
    if (v.birim === 'radyan') {
      if (aci > 2 * Math.PI + 1e-9) h.err('Merkez açı en fazla 2π (yaklaşık 6,2832) radyan olabilir. Derece yazdıysanız açı birimini "Derece" seçin.');
      t = Math.min(aci, 2 * Math.PI);
    } else {
      if (aci > 360) h.err('Merkez açı en fazla 360 derece olabilir.');
      t = aci * Math.PI / 180;
    }
    const alan = r * r * t / 2;
    const yay = r * t;
    const kiris = 2 * r * Math.abs(Math.sin(t / 2));
    const parca = r * r * (t - Math.sin(t)) / 2;
    return {
      rows: [
        ['Dilim alanı', h.fmt(alan, 4) + ' birim²'],
        ['Yay uzunluğu', h.fmt(yay, 4) + ' birim'],
        ['Dilimin çevresi (yay + 2 yarıçap)', h.fmt(yay + 2 * r, 4) + ' birim'],
        ['Kiriş uzunluğu', h.fmt(kiris, 4) + ' birim'],
        ['Daire parçası alanı (kiriş ile yay arası)', h.fmt(parca, 4) + ' birim²'],
        ['Tam dairedeki payı', '%' + h.fmt(t / (2 * Math.PI) * 100, 2)],
        ['Açı', h.fmt(t * 180 / Math.PI, 4) + '° = ' + h.fmt(t, 4) + ' rad'],
      ],
      note: 'Dilim alanı = π·r²·α ÷ 360 (derece) = ½·r²·θ (radyan). Yay uzunluğu = r·θ.',
    };
  },
  cases: [
    { in: { yaricap: '10', aci: '90', birim: 'derece' }, out: { 'Dilim alanı': '78,5398 birim²', 'Yay uzunluğu': '15,708 birim', 'Dilimin çevresi (yay + 2 yarıçap)': '35,708 birim', 'Kiriş uzunluğu': '14,1421 birim', 'Daire parçası alanı (kiriş ile yay arası)': '28,5398 birim²', 'Tam dairedeki payı': '%25' } },
    { in: { yaricap: '6', aci: '60', birim: 'derece' }, out: { 'Dilim alanı': '18,8496 birim²', 'Yay uzunluğu': '6,2832 birim', 'Kiriş uzunluğu': '6 birim', 'Daire parçası alanı (kiriş ile yay arası)': '3,2611 birim²', 'Tam dairedeki payı': '%16,67' } },
    { in: { yaricap: '2', aci: '1', birim: 'radyan' }, out: { 'Dilim alanı': '2 birim²', 'Yay uzunluğu': '2 birim', 'Dilimin çevresi (yay + 2 yarıçap)': '6 birim' } },
    { in: { yaricap: '1', aci: '360', birim: 'derece' }, out: { 'Dilim alanı': '3,1416 birim²', 'Yay uzunluğu': '6,2832 birim', 'Kiriş uzunluğu': '0 birim', 'Tam dairedeki payı': '%100' } },
    { in: { yaricap: '5', aci: '180', birim: 'derece' }, out: { 'Dilim alanı': '39,2699 birim²', 'Kiriş uzunluğu': '10 birim', 'Yay uzunluğu': '15,708 birim' } },
    { in: { yaricap: '12', aci: '30', birim: 'derece' }, out: { 'Dilim alanı': '37,6991 birim²', 'Yay uzunluğu': '6,2832 birim' } },
    { in: { yaricap: '10', aci: '400', birim: 'derece' }, error: true },
    { in: { yaricap: '10', aci: '0', birim: 'derece' }, error: true },
    { in: { yaricap: '10', aci: '90', birim: 'radyan' }, error: true },
    { in: { yaricap: '-2', aci: '90', birim: 'derece' }, error: true },
  ],
  howto: [
    `"Yarıçap" kutusuna dairenin yarıçapını yazın. Elinizde çap varsa önce ikiye bölün.`,
    `"Merkez açı" kutusuna dilimin iki yarıçapı arasındaki açıyı girin ve açı birimini (derece ya da radyan) seçin.`,
    `"Hesapla" düğmesine basın. Dilim alanı ilk satırda; yay uzunluğu, dilim çevresi, kiriş ve daire parçası alanı ardından gelir.`,
    `Son satırlarda dilimin tam dairenin yüzde kaçı olduğunu ve açının iki birimdeki karşılığını görebilirsiniz.`,
  ],
  sections: [
    { h: 'Daire dilimi nedir?', p: [
      `Daire dilimi, iki yarıçap ile bu yarıçapların uçları arasındaki yayın sınırladığı bölgedir; matematikte <strong>sektör</strong> olarak da adlandırılır. Bir pizza ya da pasta dilimi tam olarak bu şekildedir. Dilimin büyüklüğünü, iki yarıçapın merkezde oluşturduğu <strong>merkez açı</strong> belirler.`,
      `Dilim, tam dairenin merkez açıyla orantılı bir parçasıdır. Açı 360°'nin dörtte biri olan 90° ise dilim de dairenin dörtte biridir. Alan ve yay uzunluğu formüllerinin tamamı bu basit orantıdan çıkar.`,
    ] },
    { h: 'Dilim alanı ve yay uzunluğu formülleri', p: [
      `Açı derece cinsinden α ise: <strong>Dilim alanı = π · r² · α ÷ 360</strong> ve <strong>Yay uzunluğu = 2 · π · r · α ÷ 360</strong>. Yani tam dairenin alanı ve çevresi, α ÷ 360 oranıyla çarpılır.`,
      `Açı radyan cinsinden θ ise formüller sadeleşir: <strong>Dilim alanı = ½ · r² · θ</strong> ve <strong>Yay uzunluğu = r · θ</strong>. Radyanın tanımı zaten budur: yarıçap uzunluğundaki yayı gören merkez açı 1 radyandır. Bu iki formülü birleştirince kullanışlı bir bağıntı daha çıkar: <strong>Dilim alanı = yay × yarıçap ÷ 2</strong>; dilim, tabanı yay, yüksekliği yarıçap olan bir üçgen gibi düşünülebilir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Yarıçapı 10 cm olan dairede 90°'lik dilimi ele alalım. Tam dairenin alanı π × 100 ≈ 314,1593 cm², dilim bunun dörtte biri: <strong>78,5398 cm²</strong>. Tam çevre 62,8319 cm, yay bunun dörtte biri: <strong>15,708 cm</strong>. Dilimin çevresi yaya iki yarıçap eklenerek bulunur: 15,708 + 20 = <strong>35,708 cm</strong>.`,
      `Yayın iki ucunu birleştiren kiriş, 10-10 dik kenarlı ikizkenar dik üçgenin hipotenüsüdür: 10 × √2 ≈ <strong>14,1421 cm</strong>. Bu üçgenin alanı 50 cm² olduğundan kiriş ile yay arasında kalan daire parçası 78,5398 − 50 = <strong>28,5398 cm²</strong> eder.`,
      `Radyanla bir örnek: yarıçap 2, açı 1 radyan ise alan ½ × 4 × 1 = <strong>2 birim²</strong>, yay 2 × 1 = <strong>2 birim</strong>, dilim çevresi 2 + 4 = 6 birimdir.`,
    ] },
    { h: 'Kiriş ve daire parçası', p: [
      `<strong>Kiriş</strong>, çember üzerindeki iki noktayı birleştiren doğru parçasıdır. Merkez açısı θ olan yayın kirişi <strong>2 · r · sin(θ ÷ 2)</strong> uzunluğundadır. Açı 60° olduğunda kiriş yarıçapa eşit olur, çünkü iki yarıçap ve kiriş bir eşkenar üçgen oluşturur; 180°'de kiriş çapa eşittir.`,
      `<strong>Daire parçası</strong> (segment), kiriş ile yay arasında kalan bölgedir. Alanı, dilimin alanından iki yarıçap ve kirişin oluşturduğu üçgenin alanı çıkarılarak bulunur: <strong>½ · r² · (θ − sin θ)</strong>, θ radyan olmak üzere. Yarıçapı 6, açısı 60° olan dilimde bu değer yaklaşık 3,2611 birim²'dir. Açı 180°'yi geçtiğinde aynı formül büyük parçanın alanını verir; yatay duran silindirik bir tankta sıvı kesitinin alanı bu yolla hesaplanır.`,
    ] },
    { h: 'Derece mi, radyan mı?', p: [
      `Gündelik ölçümlerde ve okul sorularının çoğunda açı dereceyle verilir; iletki ve gönyeler de dereceyle çalışır. Radyan ise fizik, mühendislik ve ileri matematikte tercih edilir, çünkü formülleri sadeleştirir. Dönüşüm kolaydır: 180° = π radyan. Buna göre 90° yaklaşık 1,5708, 60° yaklaşık 1,0472, 1 radyan ise yaklaşık 57,2958 derecedir.`,
      `Araç, yanlış birim seçimine karşı basit bir denetim yapar: radyan seçiliyken 2π'den büyük bir değer yazarsanız (örneğin 90), derece yazmış olabileceğinizi belirten bir uyarı görürsünüz. Sonuçların son satırında açı her iki birimde de gösterilir.`,
    ] },
    { h: 'Kullanım alanları', ul: [
      `<strong>Pasta grafiği:</strong> bir kalemin yüzde payını açıya çevirmek ya da çizilmiş dilimin payını okumak. Yüzde 25'lik pay 90°'lik dilimdir.`,
      `<strong>Pizza ve pasta:</strong> farklı çaptaki ve dilim sayısındaki ürünlerde bir dilimin gerçek büyüklüğünü karşılaştırmak.`,
      `<strong>Sulama:</strong> belirli bir açıyı tarayan döner fıskiyenin suladığı alan bir daire dilimidir.`,
      `<strong>İnşaat ve marangozluk:</strong> yay biçimli kemer, dönel merdiven basamağı, köşe tezgâhı ve yelpaze biçimli döşemelerde malzeme ve kenar bandı boyu.`,
      `<strong>Araç ve makine:</strong> silecek kolunun taradığı cam yüzeyi, bir kolun ya da kapının açılırken süpürdüğü alan.`,
      `<strong>Dikiş:</strong> kloş etek kalıbı bir halka dilimidir; bel ve etek ucu yay uzunlukları bu formüllerle çıkarılır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Derece cinsinden açıyı radyan formülüne (½ · r² · θ) koymak. Sonuç onlarca kat büyük çıkar.`,
      `Yarıçap yerine çapı yazmak; alan dört kat, yay iki kat büyük hesaplanır.`,
      `Dilim alanı ile daire parçası alanını karıştırmak. Dilim merkeze kadar uzanır; parça yalnızca kirişin dışında kalan kısımdır.`,
      `Dilimin çevresini yalnızca yay uzunluğu sanmak. Çevreye iki yarıçap da dahildir.`,
    ], p: [
      `Merkez açı 0'dan büyük, en fazla 360° (2π radyan) olabilir. Sonuçlar dört ondalık basamağa yuvarlanır ve yarıçapı yazdığınız birime göre okunur. Yapı ve imalat işlerinde hesap değerine kesim ve birleştirme payı eklenmelidir.`,
    ] },
  ],
  faq: [
    ['Daire diliminin alanı nasıl hesaplanır?', 'Tam dairenin alanı, merkez açının 360\'a oranıyla çarpılır: π · r² · α ÷ 360. Yarıçapı 10, açısı 90 derece olan dilimin alanı yaklaşık 78,5398 birim karedir.'],
    ['Yay uzunluğu nasıl bulunur?', 'Tam çevrenin açıya düşen payı alınır: 2 · π · r · α ÷ 360. Radyanla çalışıyorsanız yarıçap ile açıyı çarpmak yeterlidir. Yarıçapı 12, açısı 30 derece olan yayın uzunluğu 2π, yani yaklaşık 6,2832 birimdir.'],
    ['Daire dilimi ile daire parçası arasındaki fark nedir?', 'Daire dilimi iki yarıçap ve bir yayla sınırlanır, ucu merkezdedir. Daire parçası ise bir kiriş ve bir yayla sınırlanır; dilimden merkezdeki üçgen çıkarılınca kalan kısımdır.'],
    ['Yay uzunluğu ve yarıçap biliniyorsa alan nasıl bulunur?', 'Yay uzunluğu ile yarıçap çarpılıp ikiye bölünür. Yayı 15,708, yarıçapı 10 olan dilimin alanı 78,54 birim karedir. Merkez açıyı da yayı yarıçapa bölerek radyan cinsinden bulabilirsiniz.'],
    ['Kiriş uzunluğu nasıl hesaplanır?', 'Yarıçapın iki katı, merkez açının yarısının sinüsüyle çarpılır: 2 · r · sin(α ÷ 2). Yarıçap 10, açı 90 derece ise kiriş yaklaşık 14,1421 birimdir.'],
    ['Pasta grafiğinde yüzde kaç derece eder?', 'Yüzde değeri 3,6 ile çarpılır. Yüzde 10 pay 36 derece, yüzde 25 pay 90 derece, yüzde 50 pay 180 derecedir. Araç, girdiğiniz açının tam dairedeki yüzde payını da gösterir.'],
    ['Açıyı radyan olarak nasıl girerim?', 'Açı birimi listesinden "Radyan" seçeneğini işaretleyin ve değeri ondalık sayı olarak yazın; örneğin π/2 için 1,5708. En büyük değer tam daireye karşılık gelen 2π, yaklaşık 6,2832\'dir.'],
    ['Hesap verilerim bir yere aktarılıyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['daire-alani-hesapla', 'daire-cevresi-hesapla', 'derece-radyan-cevir', 'elips-alani-hesapla', 'alan-cevre-hesapla'],
};
