export default {
  slug: 'yay-uzunlugu-hesapla',
  title: 'Yay Uzunluğu Hesaplama',
  h1Tail: 'çember yayı ve kiriş',
  pageTitle: 'Yay Uzunluğu Hesaplama – Çember Yayı, Kiriş ve Dilim Alanı',
  description: 'Yarıçap ve merkez açıdan çember yayının uzunluğunu hesaplayın. Derece ya da radyan girin; kiriş uzunluğu, daire dilimi ve daire parçası alanı da gösterilir.',
  card: 'Yarıçap ve merkez açıyı yazın; yay uzunluğunu, kiriş uzunluğunu ve daire dilimi alanını derece ya da radyanla hesaplayın.',
  category: 'matematik',
  keywords: ['yay uzunluğu hesaplama', 'çember yayı uzunluğu', 'yay uzunluğu formülü', 'kiriş uzunluğu hesaplama', 'merkez açı yay', 'daire dilimi alanı', 'radyan yay uzunluğu'],
  lead: 'Çemberin yarıçapını ve yayı gören merkez açıyı girin; araç <strong>yay uzunluğunu</strong> hesaplar. Aynı yayın kiriş uzunluğunu, daire dilimi ve daire parçası alanını, yayın çemberin yüzde kaçı olduğunu da verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'yaricap', label: 'Yarıçap (r)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'aci', label: 'Merkez açı', type: 'number', placeholder: 'Örn. 90' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece (°)'], ['radyan', 'Radyan']] },
  ],
  compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const x = h.pos(v.aci, 'Merkez açı');
    const rad = v.birim === 'radyan' ? x : x * Math.PI / 180;
    if (rad > 2 * Math.PI + 1e-9) h.err(v.birim === 'radyan' ? 'Merkez açı en fazla 2π (yaklaşık 6,2832) radyan olabilir; bu değer tam bir çembere karşılık gelir.' : 'Merkez açı en fazla 360° olabilir; bu değer tam bir çembere karşılık gelir.');
    const deg = rad * 180 / Math.PI;
    const u = (y) => h.fmt(y, 4) + ' birim', al = (y) => h.fmt(y, 4) + ' birim²';
    return {
      rows: [
        ['Yay uzunluğu', u(r * rad)],
        ['Kiriş uzunluğu', u(2 * r * Math.sin(rad / 2))],
        ['Daire dilimi alanı', al(0.5 * r * r * rad)],
        ['Daire parçası alanı', al(0.5 * r * r * (rad - Math.sin(rad)))],
        ['Çemberin tamamına oranı', '%' + h.fmt(rad / (2 * Math.PI) * 100, 4)],
        ['Merkez açı (derece)', h.fmt(deg, 6) + '°'],
        ['Merkez açı (radyan)', h.fmt(rad, 6) + ' rad'],
        ['Çemberin çevresi', u(2 * Math.PI * r)],
      ],
      note: 'Yay uzunluğu = r × θ (θ radyan). Uzunluklar yarıçapı yazdığınız birimde, alanlar o birimin karesindedir.',
    };
  },
  cases: [
    { in: { yaricap: '10', aci: '90', birim: 'derece' }, out: { 'Yay uzunluğu': '15,708 birim', 'Kiriş uzunluğu': '14,1421 birim', 'Daire dilimi alanı': '78,5398 birim²', 'Daire parçası alanı': '28,5398 birim²', 'Çemberin tamamına oranı': '%25', 'Merkez açı (radyan)': '1,570796 rad' } },
    { in: { yaricap: '5', aci: '2', birim: 'radyan' }, out: { 'Yay uzunluğu': '10 birim', 'Kiriş uzunluğu': '8,4147 birim', 'Daire dilimi alanı': '25 birim²', 'Merkez açı (derece)': '114,591559°' } },
    { in: { yaricap: '6', aci: '60', birim: 'derece' }, out: { 'Yay uzunluğu': '6,2832 birim', 'Kiriş uzunluğu': '6 birim', 'Daire dilimi alanı': '18,8496 birim²' } },
    { in: { yaricap: '7', aci: '180', birim: 'derece' }, out: { 'Yay uzunluğu': '21,9911 birim', 'Kiriş uzunluğu': '14 birim', 'Daire dilimi alanı': '76,969 birim²', 'Çemberin tamamına oranı': '%50' } },
    { in: { yaricap: '10', aci: '45', birim: 'derece' }, out: { 'Yay uzunluğu': '7,854 birim', 'Kiriş uzunluğu': '7,6537 birim', 'Daire dilimi alanı': '39,2699 birim²' } },
    { in: { yaricap: '1', aci: '360', birim: 'derece' }, out: { 'Yay uzunluğu': '6,2832 birim', 'Kiriş uzunluğu': '0 birim', 'Daire dilimi alanı': '3,1416 birim²', 'Çemberin tamamına oranı': '%100' } },
    { in: { yaricap: '30', aci: '40', birim: 'derece' }, out: { 'Yay uzunluğu': '20,944 birim', 'Çemberin çevresi': '188,4956 birim' } },
    { in: { yaricap: '2,5', aci: '1,2', birim: 'radyan' }, out: { 'Yay uzunluğu': '3 birim', 'Daire dilimi alanı': '3,75 birim²' } },
    { in: { yaricap: '0', aci: '90', birim: 'derece' }, error: true },
    { in: { yaricap: '10', aci: '400', birim: 'derece' }, error: true },
    { in: { yaricap: '10', aci: '7', birim: 'radyan' }, error: true },
    { in: { yaricap: 'abc', aci: '90', birim: 'derece' }, error: true },
  ],
  howto: [
    '"Yarıçap (r)" alanına çemberin yarıçapını yazın. Elinizde çap varsa ikiye bölerek girin.',
    '"Merkez açı" alanına yayı gören açıyı yazın ve yanındaki listeden birimini seçin: derece ya da radyan.',
    '"Hesapla" düğmesine basın. İlk satırda yay uzunluğu görünür.',
    'Aynı yayın iki ucunu birleştiren kirişin uzunluğunu, daire dilimi ve daire parçası alanlarını alt satırlardan okuyun.',
  ],
  sections: [
    { h: 'Yay uzunluğu nedir, nasıl hesaplanır?', p: [
      'Yay, bir çemberin iki noktası arasında kalan eğri parçadır. Uzunluğu, o yayı merkezden gören açının bütün çembere oranı kadardır. Merkez açı derece olarak verildiğinde formül <strong>yay = 2 · π · r · (α ÷ 360)</strong> biçimindedir; yani çevrenin α/360 kadarı alınır.',
      'Açı radyan olarak verildiğinde formül çok daha yalın olur: <strong>yay = r · θ</strong>. Bunun nedeni radyanın tanımıdır: 1 radyan, yarıçap uzunluğunda bir yayı gören merkez açıdır. Dolayısıyla radyan cinsinden açı, yayın yarıçapın kaç katı olduğunu doğrudan söyler. Tam çember 2π radyandır ve yay uzunluğu 2πr, yani çevre olur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Yarıçapı 10 cm olan çemberde 90°\'lik merkez açının gördüğü yay, çevrenin dörtte biridir. Çevre 2 · π · 10 ≈ 62,8319 cm olduğundan yay ≈ 15,708 cm bulunur. Aynı yayın kirişi 2 · 10 · sin 45° ≈ 14,1421 cm, daire dilimi alanı π · 100 ÷ 4 ≈ 78,5398 cm² olur.',
      '<strong>Örnek 2:</strong> Yarıçap 5 ve açı 2 radyan ise yay = 5 · 2 = 10 birimdir. Hiç π kullanmadan sonuca varılır. Bu açının derece karşılığı yaklaşık 114,59°\'dir; dilim alanı ½ · 5² · 2 = 25 birimkaredir.',
      '<strong>Örnek 3:</strong> Yarıçap 6 ve açı 60° için yay = 2 · π · 6 ÷ 6 = 2π ≈ 6,2832 birimdir. Kiriş ise tam 6 birim çıkar, çünkü iki yarıçap ve kiriş bir eşkenar üçgen oluşturur. Yayın kirişten yaklaşık yüzde 4,7 daha uzun olduğuna dikkat edin.',
      '<strong>Örnek 4:</strong> 180°\'lik açıda yay yarım çemberdir. Yarıçap 7 ise yay = π · 7 ≈ 21,9911 birim, kiriş ise çapa eşit, yani 14 birimdir.',
    ] },
    { h: 'Kiriş, daire dilimi ve daire parçası', p: [
      'Sonuç kutusundaki diğer satırlar aynı merkez açıya ait ilgili büyüklüklerdir ve birbirine karıştırılmamalıdır.',
    ], ul: [
      '<strong>Kiriş:</strong> yayın iki ucunu birleştiren doğru parçasıdır. Uzunluğu 2 · r · sin(θ ÷ 2) ile bulunur ve her zaman yaydan kısadır.',
      '<strong>Daire dilimi:</strong> iki yarıçap ve yay ile sınırlanan pasta dilimi biçimindeki bölgedir. Alanı ½ · r² · θ (θ radyan) ya da π · r² · α ÷ 360 (α derece) olur. Yay uzunluğu biliniyorsa alan = yay · r ÷ 2 biçiminde de yazılabilir.',
      '<strong>Daire parçası:</strong> kiriş ile yay arasında kalan bölgedir. Dilim alanından, iki yarıçap ve kirişin oluşturduğu üçgenin alanı çıkarılarak bulunur: ½ · r² · (θ − sin θ).',
      '<strong>Çemberin tamamına oranı:</strong> yayın çevrenin yüzde kaçı olduğunu gösterir; 90° için %25, 180° için %50\'dir.',
    ] },
    { h: 'Hızlı başvuru: açıya göre yay', ul: [
      '<strong>30°</strong> (π/6 rad): yay = π·r ÷ 6 ≈ 0,5236 · r',
      '<strong>45°</strong> (π/4 rad): yay = π·r ÷ 4 ≈ 0,7854 · r',
      '<strong>60°</strong> (π/3 rad): yay = π·r ÷ 3 ≈ 1,0472 · r',
      '<strong>90°</strong> (π/2 rad): yay = π·r ÷ 2 ≈ 1,5708 · r',
      '<strong>120°</strong> (2π/3 rad): yay ≈ 2,0944 · r',
      '<strong>180°</strong> (π rad): yay = π·r ≈ 3,1416 · r',
      '<strong>360°</strong> (2π rad): yay = 2·π·r ≈ 6,2832 · r',
    ] },
    { h: 'Kullanım alanları', p: [
      'Yol ve demiryolu projelerinde kurbaların (virajların) uzunluğu yay hesabıdır: 30 metre yarıçaplı ve 40° sapma açılı bir kurbanın uzunluğu yaklaşık 20,944 metredir. Bahçe düzenlemesinde kavisli bordür ya da çit için gereken malzeme, kemerli kapı ve pencerelerde kemer boyu, sac ve boru bükümünde bükülen kısmın açınım uzunluğu aynı formülle bulunur.',
      'Saat ve gösterge kadranlarında ibrenin ucunun kat ettiği yol, dönen bir tekerleğin belirli bir açı döndüğünde aldığı mesafe ve coğrafyada aynı boylam üzerindeki iki nokta arasındaki uzaklık da yay uzunluğudur. Büküm ve imalat işlerinde malzeme kalınlığı, tarafsız eksen ve esneme payı sonucu değiştirir; buradaki değer geometrik uzunluktur ve bilgilendirme amaçlıdır. Yapı ve yol projelerinde ilgili standartlar ve mühendis hesabı esas alınmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık yapılan hata, derece olarak verilen açıyı doğrudan r · θ formülüne koymaktır. Bu formül yalnızca radyanla çalışır; derece kullanıyorsanız önce π ÷ 180 ile çarpmanız gerekir. Araçta birimi doğru seçtiğinizde dönüşüm kendiliğinden yapılır.',
      'İkinci hata yarıçap yerine çap girmektir; bu durumda bütün uzunluklar iki katı, alanlar dört katı çıkar. Üçüncüsü, yay ile kirişi aynı sanmaktır: küçük açılarda birbirlerine çok yakındırlar ama açı büyüdükçe fark hızla artar. Araç 0° ile 360° arasındaki merkez açıları kabul eder; bir turdan uzun sarımlar için tur sayısını çevreyle çarpıp kalan açının yayını ekleyebilirsiniz. Sonuçlar dört ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['Yay uzunluğu formülü nedir?', 'Açı derece ise yay = 2 · π · r · α ÷ 360, radyan ise yay = r · θ formülü kullanılır. İkisi aynı sonucu verir; radyan biçimi daha kısadır.'],
    ['Yarıçapı 10 cm olan çemberde 90 derecelik yay kaç cm\'dir?', 'Yaklaşık 15,708 cm\'dir. Çevrenin (62,8319 cm) dörtte biri alınır; radyanla hesaplandığında 10 · π ÷ 2 aynı sonucu verir.'],
    ['Yay uzunluğu ile kiriş uzunluğu arasındaki fark nedir?', 'Yay çember üzerindeki eğri yoldur, kiriş ise yayın iki ucunu birleştiren düz doğru parçasıdır. Kiriş her zaman daha kısadır; 60°\'lik açıda yarıçapı 6 olan çemberde yay yaklaşık 6,2832, kiriş 6 birimdir.'],
    ['Yay uzunluğu ve yarıçap biliniyorsa merkez açı nasıl bulunur?', 'Yay uzunluğu yarıçapa bölünür; sonuç radyan cinsinden açıdır: θ = yay ÷ r. Dereceye çevirmek için 180 ÷ π ile çarpılır. Yay 10, yarıçap 5 ise açı 2 radyan, yani yaklaşık 114,59°\'dir.'],
    ['Daire dilimi alanı yay uzunluğundan nasıl bulunur?', 'Dilim alanı, yay uzunluğu ile yarıçapın çarpımının yarısıdır: alan = yay · r ÷ 2. Yay 10 ve yarıçap 5 birimse alan 25 birimkaredir.'],
    ['Radyan nedir?', 'Radyan, yarıçap uzunluğundaki bir yayı gören merkez açının ölçüsüdür. Tam çember 2π radyan, yani 360°\'dir; 1 radyan yaklaşık 57,2958° eder.'],
    ['Çap biliniyorsa nasıl hesaplarım?', 'Çapı ikiye bölüp yarıçap olarak girin. Çapı 20 cm olan bir çember için yarıçap alanına 10 yazmanız gerekir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; yazdığınız yarıçap ve açı değerleri sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['daire-dilimi-hesapla', 'daire-cevresi-hesapla', 'daire-alani-hesapla', 'derece-radyan-cevir', 'aci-hizi-hesapla'],
};
