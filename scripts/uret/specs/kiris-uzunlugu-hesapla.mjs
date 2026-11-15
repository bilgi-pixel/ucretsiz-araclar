export default {
  slug: 'kiris-uzunlugu-hesapla',
  title: 'Kiriş Uzunluğu Hesaplama',
  h1Tail: 'çemberde kiriş',
  pageTitle: 'Kiriş Uzunluğu Hesaplama – Çemberde Kiriş, Ok Yüksekliği ve Yay',
  description: 'Çemberin yarıçapı ile merkez açı, merkeze uzaklık ya da ok yüksekliğinden kiriş uzunluğunu hesaplayın; yay uzunluğu ve diğer ölçüler de gösterilir.',
  card: 'Yarıçap ve merkez açı, merkeze uzaklık ya da ok yüksekliğinden çemberin kiriş uzunluğunu bulun.',
  category: 'matematik',
  keywords: ['kiriş uzunluğu hesaplama', 'kiriş uzunluğu formülü', 'çemberde kiriş', 'merkez açıdan kiriş bulma', 'ok yüksekliği hesaplama', 'sagitta hesaplama', 'kiriş yay hesabı'],
  lead: 'Bir çemberin yarıçapını ve kirişi belirleyen tek bir ölçüyü (merkez açı, kirişin merkeze uzaklığı ya da ok yüksekliği) yazın; araç <strong>kiriş uzunluğunu</strong>, karşılık gelen yay uzunluğunu ve eksik kalan diğer ölçüleri birlikte hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'yaricap', label: 'Yarıçap (r)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'bilinen', label: 'Bilinen ikinci ölçü', type: 'select', options: [['aci', 'Merkez açı (derece)'], ['uzaklik', 'Kirişin merkeze uzaklığı'], ['ok', 'Ok yüksekliği (sagitta)']] },
    { id: 'deger', label: 'Bu ölçünün değeri', type: 'number', placeholder: 'Örn. 60', hint: 'Açı derece cinsinden, uzunluklar yarıçapla aynı birimde yazılır.' },
  ],
  compute(v, h) {
    const r = h.pos(v.yaricap, 'Yarıçap');
    const x = h.num(v.deger, 'Bu ölçünün değeri');
    let d; // merkezden kirişe işaretli uzaklık (büyük yayda negatif)
    if (v.bilinen === 'uzaklik') {
      if (x < 0) h.err('Merkeze uzaklık negatif olamaz.');
      if (x >= r) h.err('Kirişin merkeze uzaklığı yarıçaptan küçük olmalı; eşit ya da büyükse doğru çemberi kesmez.');
      d = x;
    } else if (v.bilinen === 'ok') {
      if (!(x > 0)) h.err('Ok yüksekliği sıfırdan büyük olmalı.');
      if (x >= 2 * r) h.err('Ok yüksekliği çaptan (2r) küçük olmalı.');
      d = r - x;
    } else {
      if (!(x > 0) || !(x < 360)) h.err('Merkez açı 0 ile 360 derece arasında olmalı (uçlar hariç).');
      d = r * Math.cos((x * Math.PI) / 360);
    }
    const aciRad = v.bilinen === 'aci' ? (x * Math.PI) / 180 : 2 * Math.acos(Math.max(-1, Math.min(1, d / r)));
    const kiris = v.bilinen === 'aci' ? 2 * r * Math.sin(aciRad / 2) : 2 * Math.sqrt(Math.max(0, r * r - d * d));
    const ok = r - d;
    return {
      rows: [
        ['Kiriş uzunluğu', h.fmt(kiris, 4)],
        ['Merkez açı', h.fmt((aciRad * 180) / Math.PI, 4) + '°'],
        ['Merkeze uzaklık', h.fmt(Math.abs(d), 4)],
        ['Ok yüksekliği', h.fmt(ok, 4)],
        ['Yay uzunluğu', h.fmt(r * aciRad, 4)],
        ['Çap', h.fmt(2 * r, 4)],
      ],
      note: 'Uzunluklar yarıçapla aynı birimdedir. Merkez açı 180°\'den büyükse kiriş büyük yayı görür; ok yüksekliği yarıçaptan büyük çıkar.',
    };
  },
  cases: [
    { in: { yaricap: '10', bilinen: 'aci', deger: '60' }, out: { 'Kiriş uzunluğu': '10', 'Merkeze uzaklık': '8,6603', 'Ok yüksekliği': '1,3397', 'Yay uzunluğu': '10,472' } },
    { in: { yaricap: '5', bilinen: 'uzaklik', deger: '3' }, out: { 'Kiriş uzunluğu': '8', 'Merkez açı': '106,2602°', 'Ok yüksekliği': '2', 'Yay uzunluğu': '9,273' } },
    { in: { yaricap: '5', bilinen: 'ok', deger: '2' }, out: { 'Kiriş uzunluğu': '8', 'Merkeze uzaklık': '3' } },
    { in: { yaricap: '10', bilinen: 'aci', deger: '90' }, out: { 'Kiriş uzunluğu': '14,1421' } },
    { in: { yaricap: '10', bilinen: 'aci', deger: '180' }, out: { 'Kiriş uzunluğu': '20', 'Merkeze uzaklık': '0', 'Ok yüksekliği': '10' } },
    { in: { yaricap: '13', bilinen: 'uzaklik', deger: '5' }, out: { 'Kiriş uzunluğu': '24' } },
    { in: { yaricap: '1', bilinen: 'aci', deger: '120' }, out: { 'Kiriş uzunluğu': '1,7321', 'Merkeze uzaklık': '0,5' } },
    { in: { yaricap: '5', bilinen: 'uzaklik', deger: '7' }, error: true },
    { in: { yaricap: '0', bilinen: 'aci', deger: '60' }, error: true },
    { in: { yaricap: '10', bilinen: 'aci', deger: '400' }, error: true },
  ],
  howto: [
    '"Yarıçap" alanına çemberin yarıçapını yazın. Elinizde çap varsa ikiye bölerek girin.',
    '"Bilinen ikinci ölçü" listesinden elinizdeki bilgiyi seçin: kirişi gören merkez açı, kirişin merkeze olan dik uzaklığı ya da kirişin ortasından yaya kadar olan ok yüksekliği.',
    '"Bu ölçünün değeri" alanına seçtiğiniz ölçüyü yazın. Açıyı derece olarak, uzunlukları yarıçapla aynı birimde girin.',
    '"Hesapla" düğmesine basın. İlk satırda kiriş uzunluğunu, altında merkez açıyı, merkeze uzaklığı, ok yüksekliğini ve yay uzunluğunu görürsünüz.',
  ],
  sections: [
    { h: 'Kiriş nedir?', p: [
      'Çember üzerindeki iki noktayı birleştiren doğru parçasına <strong>kiriş</strong> denir. Merkezden geçen kiriş çaptır ve çemberdeki en uzun kiriştir; diğer bütün kirişler çaptan kısadır. Bir kiriş çemberi iki yaya ayırır: küçük olanına küçük yay, diğerine büyük yay denir. Kirişin iki ucunu merkeze birleştiren yarıçapların arasındaki açı da o kirişi gören <strong>merkez açıdır</strong>.',
      'Kirişle ilgili iki temel özellik hesapların dayanağıdır. Birincisi, merkezden kirişe indirilen dikme kirişi tam ortadan ikiye böler. İkincisi, merkeze eşit uzaklıktaki kirişlerin boyları eşittir; kiriş merkeze yaklaştıkça uzar, uzaklaştıkça kısalır. Bu sayfadaki üç formülün tamamı, yarıçap, yarım kiriş ve merkezden inen dikmenin oluşturduğu dik üçgenden çıkar.',
    ] },
    { h: 'Kiriş uzunluğu formülleri', p: [
      'Yarıçap <em>r</em>, merkez açı <em>θ</em>, kirişin merkeze uzaklığı <em>d</em> ve ok yüksekliği <em>s</em> olmak üzere kiriş uzunluğu <em>c</em> üç ayrı yoldan bulunur:',
    ], ul: [
      '<strong>Merkez açıdan:</strong> c = 2 · r · sin(θ ÷ 2)',
      '<strong>Merkeze uzaklıktan:</strong> c = 2 · √(r² − d²)',
      '<strong>Ok yüksekliğinden:</strong> c = 2 · √(2 · r · s − s²)',
      '<strong>Ölçüler arası bağıntılar:</strong> d = r · cos(θ ÷ 2) ve s = r − d',
      '<strong>Yay uzunluğu:</strong> yay = r · θ (θ radyan cinsinden), derece ile yay = 2 · π · r · θ ÷ 360',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – merkez açıdan:</strong> Yarıçapı 10 cm olan çemberde 60°\'lik merkez açının gördüğü kiriş: c = 2 · 10 · sin(30°) = 20 · 0,5 = 10 cm. Yarıçaplar ve kiriş eşkenar üçgen oluşturduğu için sonucun yarıçapa eşit çıkması beklenen bir durumdur. Aynı kirişin merkeze uzaklığı 10 · cos(30°) = 8,6603 cm, ok yüksekliği 10 − 8,6603 = 1,3397 cm ve yay uzunluğu 10 · π ÷ 3 = 10,472 cm olur.',
      '<strong>Örnek 2 – merkeze uzaklıktan:</strong> Yarıçapı 5 cm olan çemberde merkeze 3 cm uzaklıktaki kiriş: c = 2 · √(25 − 9) = 2 · 4 = 8 cm. Burada 3-4-5 dik üçgeni kendini gösterir. Merkez açı 106,2602°, ok yüksekliği 5 − 3 = 2 cm, yay uzunluğu ise 9,273 cm bulunur.',
      '<strong>Örnek 3 – ok yüksekliğinden:</strong> Aynı çemberde ok yüksekliği 2 cm verilirse c = 2 · √(2 · 5 · 2 − 4) = 2 · √16 = 8 cm çıkar; yani ikinci örnekteki kirişin aynısıdır.',
    ] },
    { h: 'Ok yüksekliği (sagitta) ne işe yarar?', p: [
      'Ok yüksekliği, kirişin orta noktasından yayın en uzak noktasına kadar olan dik mesafedir; teknik kaynaklarda sagitta ya da yay yüksekliği adıyla da geçer. Sahada merkez açıyı ölçmek zordur, oysa bir kemerin açıklığını ve yüksekliğini şerit metreyle ölçmek kolaydır. Bu yüzden kemerli kapı ve pencere imalatında, bombeli cam ve sac kesiminde, viraj ve kurp aplikasyonunda, tonoz ve kubbe kalıplarında hesap çoğunlukla kiriş ve ok yüksekliği üzerinden yürür.',
      'Elinizde kiriş ve ok yüksekliği varken yarıçapı bulmanız gerekirse şu bağıntı kullanılır: r = (c² ÷ 4 + s²) ÷ (2 · s). Örneğin açıklığı 8, yüksekliği 2 birim olan bir yayın yarıçapı (16 + 4) ÷ 4 = 5 birimdir. Bulduğunuz yarıçapı bu araca yazarak sonucu sağlayabilirsiniz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Kiriş ile yayı karıştırmak: kiriş düz çizgidir, yay ise çemberin eğri parçasıdır ve aynı uçlar için her zaman kirişten uzundur.',
      'Merkez açı yerine çevre açıyı kullanmak: aynı yayı gören çevre açı merkez açının yarısıdır; çevre açı biliniyorsa iki katını girin.',
      'Formülde açının tamamının sinüsünü almak: doğru ifade sin(θ ÷ 2)\'dir, sin(θ) değil.',
      'Çapı yarıçap alanına yazmak ya da uzunlukları farklı birimlerde girmek (yarıçap metre, uzaklık santimetre gibi).',
      'Merkeze uzaklığı yarıçaptan büyük girmek: bu durumda doğru çemberi kesmez ve kiriş oluşmaz; araç bunu hata olarak bildirir.',
    ] },
    { h: 'Hızlı başvuru: merkez açıya göre kiriş', p: [
      'Yarıçap 1 birim alındığında kiriş uzunluğu doğrudan 2 · sin(θ ÷ 2) değerine eşittir. Başka bir yarıçap için aşağıdaki katsayıyı yarıçapla çarpmanız yeterlidir.',
    ], ul: [
      '<strong>30°</strong> → 0,5176 · r',
      '<strong>45°</strong> → 0,7654 · r',
      '<strong>60°</strong> → 1 · r',
      '<strong>90°</strong> → 1,4142 · r (√2 · r)',
      '<strong>120°</strong> → 1,7321 · r (√3 · r)',
      '<strong>180°</strong> → 2 · r (çap)',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç tam bir çember varsayar ve sonuçları dört ondalık basamağa yuvarlar. Merkez açı 0° ile 360° arasında, ok yüksekliği ise sıfır ile çap arasında olmalıdır. Merkez açı 180°\'yi geçtiğinde kiriş büyük yayı görür; kiriş uzunluğu 360° − θ açısının kirişiyle aynıdır, ancak yay uzunluğu ve ok yüksekliği büyük yaya göre verilir. İmalat ve şantiye uygulamalarında ölçüm payı, malzeme kalınlığı ve tolerans ayrıca dikkate alınmalıdır; sonuçlar geometrik hesap niteliğindedir.',
    ] },
  ],
  faq: [
    ['Kiriş uzunluğu formülü nedir?', 'Yarıçap r ve merkez açı θ biliniyorsa kiriş uzunluğu c = 2 · r · sin(θ ÷ 2) ile bulunur. Kirişin merkeze uzaklığı d biliniyorsa c = 2 · √(r² − d²) kullanılır. Her iki formül de aynı dik üçgenden türetilir ve aynı sonucu verir.'],
    ['Çemberdeki en uzun kiriş hangisidir?', 'Merkezden geçen kiriş, yani çaptır. Uzunluğu 2 · r kadardır ve merkez açısı 180°\'dir. Merkeze uzaklık arttıkça kiriş kısalır; uzaklık yarıçapa yaklaştığında kiriş uzunluğu sıfıra yaklaşır.'],
    ['Kiriş ile yay arasındaki fark nedir?', 'Kiriş, çember üzerindeki iki noktayı birleştiren düz doğru parçasıdır. Yay ise aynı iki nokta arasında çember boyunca ilerleyen eğri parçadır. Örneğin yarıçapı 10 olan çemberde 60°\'lik açının kirişi 10, yayı ise 10,472 birimdir.'],
    ['Çevre açı biliniyorsa kiriş nasıl bulunur?', 'Aynı yayı gören merkez açı, çevre açının iki katıdır. Çevre açıyı ikiyle çarpıp merkez açı olarak girmeniz yeterlidir. Doğrudan formülle yazmak isterseniz c = 2 · r · sin(çevre açı) olur.'],
    ['Kiriş ve ok yüksekliğinden yarıçap nasıl hesaplanır?', 'Kiriş c ve ok yüksekliği s için yarıçap r = (c² ÷ 4 + s²) ÷ (2 · s) bağıntısıyla bulunur. Açıklığı 8 cm, yüksekliği 2 cm olan bir yay için r = (16 + 4) ÷ 4 = 5 cm çıkar.'],
    ['Merkezden kirişe indirilen dikme neden kirişi ortalar?', 'Kirişin iki ucunu merkeze birleştiren yarıçaplar eşit olduğundan ortaya ikizkenar üçgen çıkar. İkizkenar üçgende tepe noktasından tabana inen yükseklik aynı zamanda kenarortaydır; bu nedenle dikme kirişi iki eşit parçaya ayırır.'],
    ['Açıyı radyan olarak girebilir miyim?', 'Araç açıyı derece olarak bekler. Radyan değerini 180 ile çarpıp π sayısına bölerek dereceye çevirebilirsiniz; örneğin π ÷ 3 radyan 60 dereceye eşittir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler herhangi bir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['yay-uzunlugu-hesapla', 'daire-dilimi-hesapla', 'daire-cevresi-hesapla', 'daire-alani-hesapla', 'pisagor-teoremi-hesapla'],
};
