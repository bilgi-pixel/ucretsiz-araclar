export default {
  slug: 'koni-yuzey-alani-hesapla',
  title: 'Koni Yüzey Alanı Hesaplama',
  h1Tail: 'A = πr(r + l)',
  pageTitle: 'Koni Yüzey Alanı Hesaplama – Yanal Alan, Toplam Alan ve Açınım',
  description: 'Koninin yanal ve toplam yüzey alanını yarıçap ile yükseklik ya da ana doğrudan hesaplayın. Ana doğru, yükseklik ve açınım merkez açısı da gösterilir.',
  card: 'Koninin yanal ve toplam yüzey alanını hesaplayın; ana doğru uzunluğu ve açınımdaki merkez açısıyla birlikte.',
  category: 'matematik',
  keywords: ['koni yüzey alanı hesaplama', 'koni yanal alan', 'koninin alanı formülü', 'pi r l', 'koni açınımı', 'ana doğru hesaplama', 'koni merkez açısı'],
  lead: `Dik dairesel koninin yanal alanını <strong>π · r · l</strong>, toplam yüzey alanını <strong>π · r · (r + l)</strong> formülüyle hesaplayın. Yarıçapın yanında yüksekliği ya da ana doğruyu (yan kenar uzunluğu) girebilirsiniz; araç eksik olanı ve açınımdaki merkez açısını kendisi bulur.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yaricap', label: 'Taban yarıçapı (r)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'tur', label: 'İkinci ölçü', type: 'select', options: [['h', 'Yükseklik (h)'], ['l', 'Ana doğru (l)']] },
    { id: 'ikinci', label: 'Yükseklik ya da ana doğru', type: 'number', placeholder: 'Örn. 4' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const r = h.pos(v.yaricap, 'Taban yarıçapı');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    let l, yuk;
    if (v.tur === 'l') {
      l = h.pos(v.ikinci, 'Ana doğru');
      if (l <= r) h.err('Ana doğru taban yarıçapından büyük olmalı; aksi halde koni oluşmaz. Değerleri kontrol edin.');
      yuk = Math.sqrt(l * l - r * r);
    } else {
      yuk = h.pos(v.ikinci, 'Yükseklik');
      l = Math.sqrt(r * r + yuk * yuk);
    }
    const yanal = Math.PI * r * l;
    const taban = Math.PI * r * r;
    return {
      rows: [
        ['Toplam yüzey alanı', `${h.fmt(yanal + taban, 4)} ${b}²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Taban alanı', `${h.fmt(taban, 4)} ${b}²`],
        ['Metrekare karşılığı (toplam)', `${h.fmt((yanal + taban) * m2Kat, 4)} m²`],
        ['Ana doğru', `${h.fmt(l, 4)} ${b}`],
        ['Yükseklik', `${h.fmt(yuk, 4)} ${b}`],
        ['Açınım merkez açısı', `${h.fmt(360 * r / l, 4)}°`],
      ],
      note: 'Dik dairesel koni varsayılır. Açınım merkez açısı, yan yüzey düzleme açıldığında oluşan daire diliminin açısıdır; dilimin yarıçapı ana doğruya eşittir.',
    };
  },
  cases: [
    { in: { yaricap: '3', tur: 'h', ikinci: '4', birim: 'cm' }, out: { 'Toplam yüzey alanı': '75,3982 cm²', 'Yanal alan': '47,1239 cm²', 'Taban alanı': '28,2743 cm²', 'Ana doğru': '5 cm', 'Açınım merkez açısı': '216°' } },
    { in: { yaricap: '5', tur: 'l', ikinci: '13', birim: 'cm' }, out: { 'Toplam yüzey alanı': '282,7433 cm²', 'Yanal alan': '204,2035 cm²', 'Yükseklik': '12 cm', 'Açınım merkez açısı': '138,4615°' } },
    { in: { yaricap: '6', tur: 'h', ikinci: '8', birim: 'cm' }, out: { 'Toplam yüzey alanı': '301,5929 cm²', 'Yanal alan': '188,4956 cm²', 'Ana doğru': '10 cm' } },
    { in: { yaricap: '1', tur: 'l', ikinci: '2', birim: 'm' }, out: { 'Toplam yüzey alanı': '9,4248 m²', 'Yanal alan': '6,2832 m²', 'Yükseklik': '1,7321 m', 'Açınım merkez açısı': '180°' } },
    { in: { yaricap: '8', tur: 'h', ikinci: '15', birim: 'm' }, out: { 'Toplam yüzey alanı': '628,3185 m²', 'Yanal alan': '427,2566 m²', 'Taban alanı': '201,0619 m²', 'Ana doğru': '17 m', 'Metrekare karşılığı (toplam)': '628,3185 m²' } },
    { in: { yaricap: '30', tur: 'h', ikinci: '40', birim: 'mm' }, out: { 'Yanal alan': '4.712,389 mm²', 'Ana doğru': '50 mm' } },
    { in: { yaricap: '5', tur: 'l', ikinci: '4', birim: 'cm' }, error: true },
    { in: { yaricap: '3', tur: 'l', ikinci: '3', birim: 'cm' }, error: true },
    { in: { yaricap: '0', tur: 'h', ikinci: '4', birim: 'cm' }, error: true },
  ],
  howto: [
    `"Taban yarıçapı" alanına koninin taban yarıçapını yazın; elinizde çap varsa ikiye bölün.`,
    `"İkinci ölçü" listesinden bildiğiniz değeri seçin: tepeden tabana inen dik yükseklik ya da yan yüzey boyunca ölçülen ana doğru.`,
    `Bu değeri yazın, birimi seçin ve "Hesapla" düğmesine basın.`,
    `Toplam yüzey alanı, yanal alan ve taban alanı listelenir; ayrıca ana doğru, yükseklik ve açınımda kesilecek daire diliminin merkez açısı gösterilir.`,
  ],
  sections: [
    { h: 'Koni yüzey alanı formülleri', p: [
      `Koninin yüzeyi iki parçadan oluşur: dairesel taban ve tepeye doğru daralan eğri yan yüzey. Taban alanı bilinen daire formülüdür, <strong>π · r²</strong>. Yan yüzeyin alanı ise <strong>π · r · l</strong> ile bulunur; buradaki l, tepe noktasından taban çemberine yan yüzey üzerinden çizilen doğrunun uzunluğudur ve ana doğru adını alır. İkisinin toplamı <strong>A = π · r · (r + l)</strong> toplam yüzey alanını verir.`,
      `Ana doğru, yarıçap ve yükseklik bir dik üçgen oluşturur; ana doğru bu üçgenin hipotenüsüdür: <strong>l = √(r² + h²)</strong>. Bu yüzden yükseklik biliniyorsa önce ana doğru hesaplanır. Tersine, ana doğru biliniyorsa yükseklik h = √(l² − r²) olur. Ana doğru her zaman yarıçaptan büyük olmak zorundadır; eşit ya da küçükse koni oluşmaz ve araç bu durumda uyarı verir.`,
    ] },
    { h: 'Çözümlü örnek: yükseklik biliniyorsa', p: [
      `Taban yarıçapı 3 cm, yüksekliği 4 cm olan koni için önce ana doğru bulunur: l = √(9 + 16) = 5 cm. Yanal alan π · 3 · 5 = 15π ≈ <strong>47,1239 cm²</strong>, taban alanı 9π ≈ 28,2743 cm², toplam yüzey alanı 24π ≈ <strong>75,3982 cm²</strong> olur.`,
    ] },
    { h: 'Çözümlü örnek: ana doğru biliniyorsa', p: [
      `Yarıçapı 5 cm, ana doğrusu 13 cm olan bir külah düşünelim. Yanal alan doğrudan π · 5 · 13 = 65π ≈ <strong>204,2035 cm²</strong> çıkar. Taban da sayılırsa 25π eklenir ve toplam 90π ≈ 282,7433 cm² olur. Yükseklik √(169 − 25) = 12 cm\'dir. Külah gibi tabanı olmayan cisimlerde gereken malzeme yalnızca yanal alan kadardır; bu nedenle araç yanal alanı ayrı satırda verir.`,
    ] },
    { h: 'Açınım: koni kâğıttan nasıl kesilir?', p: [
      `Koninin yan yüzeyi bir kenarından kesilip düzleştirildiğinde bir <strong>daire dilimi</strong> elde edilir. Bu dilimin yarıçapı ana doğruya, yay uzunluğu ise taban çevresine (2 · π · r) eşittir. Dilimin merkez açısı buradan çıkar: <strong>açı = 360° · r ÷ l</strong>. Yanal alan formülü de bu açınımdan gelir: yarıçapı l olan tam dairenin alanı π · l², dilim bunun r ÷ l kadarı olduğundan alan π · r · l eder.`,
      `Örneğin r = 3 cm ve l = 5 cm için açı 360 · 3 ÷ 5 = 216° olur; yani 5 cm yarıçaplı bir daireden 216 derecelik dilimi kesip kenarlarını birleştirirseniz bu koniyi elde edersiniz. Ana doğru yarıçapın tam iki katı olduğunda (r = 1, l = 2) açı 180° çıkar; koni tam bir yarım daireden kıvrılır. Karton şapka, huni ya da abajur yaparken bu açı ve ana doğru uzunluğu kesim şablonu için yeterlidir; yapıştırma payını ayrıca bırakmayı unutmayın.`,
    ] },
    { h: 'Kullanım alanları', ul: [
      `Konik çatı, kule külahı ya da çadır için gereken kaplama ve kumaş yüzeyini bulmak`,
      `Huni, abajur, parti şapkası, külah gibi cisimlerin sac ya da karton açınımını çıkarmak`,
      `Konik silo dibi ve bunker gibi parçaların boyanacak ya da kaplanacak alanını tahmin etmek`,
      `Trafik konisi benzeri kalıplarda malzeme miktarını kestirmek`,
      `Geometri problemlerinde yanal alan, tüm alan ve merkez açısı sonuçlarını denetlemek`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En yaygın hata, yanal alan formülünde ana doğru yerine yüksekliği kullanmaktır: π · r · h yanlış, π · r · l doğrudur. İkinci hata, tabanı olmayan bir cisimde (külah, huni) taban alanını da eklemek ya da tersine kapalı bir konide tabanı unutmaktır. Üçüncüsü, çapı yarıçap yerine yazmaktır.`,
      `Araç dik dairesel koni içindir; tepe noktası taban merkezinin tam üstünde kabul edilir. Eğik konilerde yan yüzey alanı bu formülle bulunamaz. Tepesi kesilmiş cisimler için kesik koni hesabı gerekir. Sonuçlar bilgilendirme amaçlıdır; çatı kaplaması ya da sac imalatı gibi işlerde bindirme, birleşim ve fire payları eklenmeli, gerektiğinde uzmana danışılmalıdır.`,
    ] },
  ],
  faq: [
    ['Koninin yüzey alanı nasıl hesaplanır?', 'Yanal alan ile taban alanı toplanır: A = π · r · l + π · r² = π · r · (r + l). Yarıçapı 3 cm ve ana doğrusu 5 cm olan koninin toplam alanı 24π ≈ 75,3982 cm² olur.'],
    ['Ana doğru nedir, yükseklikten farkı ne?', 'Ana doğru, tepe noktasından taban çemberine yan yüzey boyunca ölçülen uzunluktur. Yükseklik ise tepeden taban merkezine inen dik uzaklıktır. Aralarındaki bağıntı l² = r² + h² biçimindedir ve ana doğru her zaman daha uzundur.'],
    ['Yalnızca yükseklik biliniyorsa yanal alan nasıl bulunur?', 'Önce ana doğru l = √(r² + h²) ile hesaplanır, sonra π · r · l uygulanır. Araçta "Yükseklik" seçeneğini işaretlediğinizde bu adım kendiliğinden yapılır.'],
    ['Koninin açınımındaki merkez açısı nasıl hesaplanır?', 'Açı = 360° · r ÷ l formülüyle bulunur. Yarıçap 3 cm, ana doğru 5 cm ise açı 216° olur. Bu, yarıçapı ana doğru kadar olan bir daireden kesilecek dilimin açısıdır.'],
    ['Külah ya da huni için hangi alanı kullanmalıyım?', 'Tabanı olmayan cisimlerde yalnızca "Yanal alan" satırı geçerlidir. Toplam yüzey alanı, tabanı da kapalı olan koniler içindir.'],
    ['Ana doğru yarıçaptan küçük olabilir mi?', 'Hayır. Ana doğru, yarıçap ve yüksekliğin oluşturduğu dik üçgenin hipotenüsüdür; bu yüzden yarıçaptan büyük olmak zorundadır. Küçük ya da eşit bir değer girerseniz araç hata mesajı gösterir.'],
    ['Yanal alan mı büyük olur, taban alanı mı?', 'Yanal alan her zaman taban alanından büyüktür, çünkü π · r · l ifadesindeki l, π · r · r ifadesindeki r\'den büyüktür. İkisinin oranı l ÷ r kadardır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz ölçüler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['koni-hacmi-hesapla', 'kesik-koni-hacmi-hesapla', 'silindir-yuzey-alani-hesapla', 'kure-yuzey-alani-hesapla', 'daire-dilimi-hesapla', 'dik-ucgen-hesapla'],
};
