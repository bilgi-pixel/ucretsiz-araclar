export default {
  slug: 'paralelkenar-alani-hesapla',
  title: 'Paralelkenar Alanı Hesaplama',
  h1Tail: 'taban-yükseklik ya da kenar-açı',
  pageTitle: 'Paralelkenar Alanı Hesaplama – Taban Yükseklik veya Açı ile',
  description: 'Paralelkenarın alanını taban ve yükseklikten ya da iki kenar ile aralarındaki açıdan hesaplayın. Çevre, yükseklik ve köşegen uzunlukları da gösterilir.',
  card: 'Paralelkenarın alanını taban × yükseklik ya da a × b × sin(açı) ile bulun; çevre ve köşegenler de hesaplanır.',
  category: 'matematik',
  keywords: ['paralelkenar alanı hesaplama', 'paralelkenarın alanı formülü', 'paralelkenar çevresi', 'paralelkenar köşegen uzunluğu', 'taban çarpı yükseklik', 'a b sin alfa', 'paralelkenar yükseklik bulma'],
  lead: `Paralelkenarın alanını iki yoldan hesaplayın: <strong>taban × yükseklik</strong> ya da <strong>iki komşu kenar ve aralarındaki açı</strong> (a × b × sin α). İkinci yöntemde çevre, yükseklik ve iki köşegenin uzunluğu da verilir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Bilinenler', type: 'select', options: [['th', 'Taban ve yükseklik'], ['aci', 'İki kenar ve aradaki açı']] },
    { id: 'taban', label: 'Taban (a kenarı)', type: 'number', placeholder: 'Örn. 8' },
    { id: 'yukseklik', label: 'Yükseklik', type: 'number', placeholder: 'Örn. 5', hint: 'Tabana dik uzaklık; yalnızca ilk yöntemde' },
    { id: 'yanKenar', label: 'Yan kenar (b)', type: 'number', placeholder: 'Örn. 6', hint: 'Açı yönteminde zorunlu; ilk yöntemde çevre için isteğe bağlı' },
    { id: 'aci', label: 'a ile b arasındaki açı (derece)', type: 'number', placeholder: 'Örn. 30', hint: 'Yalnızca ikinci yöntemde' },
  ],
  compute(v, h) {
    const a = h.pos(v.taban, 'Taban');
    if (v.yontem === 'aci') {
      const b = h.pos(v.yanKenar, 'Yan kenar');
      const aci = h.pos(v.aci, 'Açı');
      if (aci >= 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
      const rad = aci * Math.PI / 180;
      const alan = a * b * Math.sin(rad);
      const k1 = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(rad)));
      const k2 = Math.sqrt(Math.max(0, a * a + b * b + 2 * a * b * Math.cos(rad)));
      return {
        rows: [
          ['Alan', h.fmt(alan, 4) + ' birim²'],
          ['Çevre', h.fmt(2 * (a + b), 4) + ' birim'],
          ['Tabana ait yükseklik', h.fmt(b * Math.sin(rad), 4) + ' birim'],
          ['Kısa köşegen', h.fmt(Math.min(k1, k2), 4) + ' birim'],
          ['Uzun köşegen', h.fmt(Math.max(k1, k2), 4) + ' birim'],
        ],
        note: 'Alan = a × b × sin(α). Köşegenler kosinüs teoremiyle bulunur. Açı 90° ise şekil dikdörtgendir.',
      };
    }
    const y = h.pos(v.yukseklik, 'Yükseklik');
    const rows = [['Alan', h.fmt(a * y, 4) + ' birim²']];
    if (String(v.yanKenar ?? '').trim() !== '') {
      const b = h.pos(v.yanKenar, 'Yan kenar');
      if (b < y * (1 - 1e-12)) h.err('Yan kenar yükseklikten kısa olamaz; yükseklik tabana dik olan en kısa uzaklıktır.');
      rows.push(['Çevre', h.fmt(2 * (a + b), 4) + ' birim']);
      rows.push(['Taban ile yan kenar arasındaki dar açı', h.fmt(Math.asin(Math.min(1, y / b)) * 180 / Math.PI, 2) + '°']);
    }
    return { rows, note: 'Alan = taban × yükseklik. Sonuç, uzunlukları yazdığınız birimin karesidir.' };
  },
  cases: [
    { in: { yontem: 'th', taban: '8', yukseklik: '5' }, out: { 'Alan': '40 birim²' } },
    { in: { yontem: 'aci', taban: '10', yanKenar: '6', aci: '30' }, out: { 'Alan': '30 birim²', 'Çevre': '32 birim', 'Tabana ait yükseklik': '3 birim' } },
    { in: { yontem: 'aci', taban: '5', yanKenar: '4', aci: '90' }, out: { 'Alan': '20 birim²', 'Kısa köşegen': '6,4031 birim', 'Uzun köşegen': '6,4031 birim' } },
    { in: { yontem: 'th', taban: '12', yukseklik: '7', yanKenar: '9' }, out: { 'Alan': '84 birim²', 'Çevre': '42 birim' } },
    { in: { yontem: 'th', taban: '2,5', yukseklik: '4' }, out: { 'Alan': '10 birim²' } },
    { in: { yontem: 'aci', taban: '6', yanKenar: '4', aci: '60' }, out: { 'Alan': '20,7846 birim²', 'Kısa köşegen': '5,2915 birim', 'Uzun köşegen': '8,7178 birim' } },
    { in: { yontem: 'th', taban: '10', yukseklik: '3', yanKenar: '6' }, out: { 'Alan': '30 birim²', 'Taban ile yan kenar arasındaki dar açı': '30°' } },
    { in: { yontem: 'aci', taban: '10', yanKenar: '6', aci: '180' }, error: true },
    { in: { yontem: 'th', taban: '8', yukseklik: '5', yanKenar: '4' }, error: true },
    { in: { yontem: 'th', taban: '', yukseklik: '5' }, error: true },
  ],
  howto: [
    `"Bilinenler" listesinden yöntemi seçin: taban ve yüksekliği mi, yoksa iki komşu kenarı ve aralarındaki açıyı mı biliyorsunuz?`,
    `Taban uzunluğunu yazın. İlk yöntemde yüksekliği, ikinci yöntemde yan kenarı ve açıyı (derece olarak) ekleyin.`,
    `İlk yöntemde çevreyi de görmek isterseniz yan kenarı yazabilirsiniz; bu kutu o yöntemde isteğe bağlıdır.`,
    `"Hesapla" düğmesine basın ve alanla birlikte verilen ek ölçüleri sonuç kutusundan okuyun.`,
  ],
  sections: [
    { h: 'Paralelkenarın alan formülü', p: [
      `Paralelkenar, karşılıklı kenarları hem paralel hem de eşit uzunlukta olan dörtgendir. Alanı <strong>taban × yükseklik</strong> çarpımına eşittir. Buradaki yükseklik, tabanla karşısındaki kenar arasındaki dik uzaklıktır; eğik duran yan kenarın uzunluğu değildir.`,
      `Formülün dikdörtgeninkine bu kadar benzemesi tesadüf değildir. Paralelkenarın bir ucundan dik bir üçgen kesip öbür uca taşırsanız şekil, aynı taban ve aynı yükseklikte bir dikdörtgene dönüşür. Alan değişmediğinden iki şeklin alanı eşittir. Örnek: tabanı 8 cm, yüksekliği 5 cm olan paralelkenarın alanı 8 × 5 = <strong>40 cm²</strong>'dir.`,
    ] },
    { h: 'İki kenar ve açı ile alan: a × b × sin α', p: [
      `Yükseklik ölçülmemiş ama komşu iki kenar ile aralarındaki açı biliniyorsa alan <strong>a × b × sin α</strong> formülüyle bulunur. Çünkü b kenarının tabana göre yüksekliği b × sin α kadardır.`,
      `Çözümlü örnek: a = 10, b = 6 ve açı 30° olsun. sin 30° = 0,5 olduğundan yükseklik 6 × 0,5 = 3 birim, alan 10 × 3 = <strong>30 birim²</strong>, çevre 2 × (10 + 6) = <strong>32 birim</strong> çıkar. Paralelkenarda komşu açılar birbirini 180°'ye tamamlar ve sin α = sin (180° − α) olduğundan, dar açıyı da geniş açıyı da yazsanız aynı alanı elde edersiniz; 30° yerine 150° girmek sonucu değiştirmez.`,
      `Aynı kenarlarla en büyük alan açının 90° olduğu durumda, yani dikdörtgende elde edilir. Açı küçüldükçe şekil "yatar" ve alan azalır. Bu, bir makas ya da açılır kapanır kafes düşünülerek kolayca canlandırılabilir: kenar uzunlukları sabit kalır, alan değişir.`,
    ] },
    { h: 'Köşegen uzunlukları', p: [
      `Paralelkenarın iki köşegeni birbirini ortalar ama genellikle eşit uzunlukta değildir. Uzunlukları kosinüs teoremiyle bulunur: <strong>k² = a² + b² − 2ab·cos α</strong> ve <strong>k² = a² + b² + 2ab·cos α</strong>. Dar açının karşısındaki köşegen kısa, geniş açının karşısındaki köşegen uzundur.`,
      `Örnek: a = 6, b = 4, açı 60° için kısa köşegen √(36 + 16 − 24) = √28 ≈ <strong>5,2915</strong>, uzun köşegen √(36 + 16 + 24) = √76 ≈ <strong>8,7178</strong> birimdir; alan 24 × sin 60° ≈ 20,7846 birim² olur. Açı 90° olduğunda kosinüs sıfırlanır ve iki köşegen eşitlenir: 5'e 4'lük dikdörtgende her ikisi de √41 ≈ 6,4031 birimdir. Köşegenlerin kareleri toplamının, dört kenarın kareleri toplamına eşit olması (paralelkenar yasası) sonuçları sınamanın hızlı bir yoludur.`,
    ] },
    { h: 'Paralelkenarın temel özellikleri', ul: [
      `Karşılıklı kenarlar paralel ve eşit uzunluktadır; bu yüzden çevre 2 × (a + b) ile bulunur.`,
      `Karşılıklı açılar eşittir, komşu açıların toplamı 180°'dir.`,
      `Köşegenler birbirini ortalar ve her köşegen şekli eş iki üçgene böler.`,
      `Dikdörtgen, eşkenar dörtgen ve kare, paralelkenarın özel hâlleridir.`,
      `Hangi kenar taban seçilirse seçilsin alan aynıdır: a × h<sub>a</sub> = b × h<sub>b</sub>. Bu eşitlikten bilinmeyen yükseklik bulunabilir.`,
    ] },
    { h: 'Kullanım alanları', p: [
      `Okul geometrisinin yanında paralelkenar hesabı pratik işlerde de karşınıza çıkar. Çapraz (balıksırtı ya da baklava) döşenen parke ve seramikte parçalar paralelkenar biçimindedir; kaplanacak yüzey için parça sayısı tek parçanın alanından bulunur. Eğik cepheli parseller, verev kesilmiş kumaş şeritleri (biye), çatı ve merdiven altı gibi eğik yüzeyler, eğik otopark çizgileriyle ayrılan park yerleri de paralelkenardır.`,
      `Fizikte iki kuvvetin bileşkesi paralelkenar yöntemiyle çizilir; vektörlerin oluşturduğu paralelkenarın alanı ise vektörel çarpımın büyüklüğüne eşittir. Bu araçtaki a × b × sin α formülü tam olarak bu büyüklüğü verir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Taban ile yan kenarı çarpmak. Bu çarpım yalnızca dikdörtgende alanı verir; eğik paralelkenarda sonucu olduğundan büyük gösterir.`,
      `Yüksekliği yanlış kenara göre almak. Yükseklik, taban olarak seçtiğiniz kenara dik ölçülmelidir.`,
      `Yan kenardan büyük bir yükseklik yazmak. Yükseklik en kısa uzaklık olduğundan yan kenarı geçemez; araç böyle bir girişte uyarır.`,
      `Açıyı radyan olarak girmek. Bu araçta açı derece cinsindendir.`,
      `Üçgen formülüyle karıştırıp sonucu ikiye bölmek.`,
    ] },
    { h: 'Birimler ve sınırlar', p: [
      `Bütün uzunlukları aynı birimle yazın; sonuç o birimin karesidir. Açı 0'dan büyük, 180'den küçük olmalıdır. Sonuçlar en fazla dört ondalık basamakla gösterilir. İlk yöntemde yan kenar da girilirse araç, taban ile yan kenar arasındaki dar açıyı da hesaplar; böylece gönye ya da açıölçer olmadan şeklin eğimini öğrenebilirsiniz. Malzeme siparişi verirken kesim firesini ayrıca eklemeyi unutmayın.`,
    ] },
  ],
  faq: [
    ['Paralelkenarın alanı nasıl hesaplanır?', 'Taban uzunluğu, o tabana ait yükseklikle çarpılır. Tabanı 8, yüksekliği 5 olan paralelkenarın alanı 40 birim karedir. Yükseklik bilinmiyorsa iki kenar ile aradaki açının sinüsü çarpılır.'],
    ['Paralelkenarda alan neden ikiye bölünmez?', 'İkiye bölme üçgen ve yamuk formüllerine özgüdür. Paralelkenar, kesilip kaydırıldığında aynı taban ve yükseklikte bir dikdörtgene dönüştüğü için alanı doğrudan taban çarpı yüksekliktir.'],
    ['Yüksekliği bilmiyorsam alanı nasıl bulurum?', 'Komşu iki kenarı ve aralarındaki açıyı biliyorsanız a × b × sin α formülünü kullanın. Kenarları 10 ve 6, açısı 30 derece olan paralelkenarın alanı 30 birim karedir.'],
    ['Paralelkenarın çevresi nasıl bulunur?', 'Karşılıklı kenarlar eşit olduğundan iki komşu kenarın toplamı ikiyle çarpılır: Ç = 2 × (a + b). Kenarları 12 ve 9 olan paralelkenarın çevresi 42 birimdir.'],
    ['Dar açıyı mı geniş açıyı mı yazmalıyım?', 'Fark etmez. Komşu açılar 180 dereceye tamamlandığı ve sinüsleri eşit olduğu için 30 derece de 150 derece de aynı alanı verir. Köşegenler de kısa ve uzun olarak sıralanıp gösterilir.'],
    ['Köşegenler bilindiğinde alan hesaplanabilir mi?', 'Yalnızca köşegen uzunlukları yeterli değildir; aralarındaki açı da gerekir. Bu durumda alan, köşegenlerin çarpımının yarısı ile aradaki açının sinüsünün çarpımıdır. Eşkenar dörtgende köşegenler dik olduğundan çarpımın yarısı doğrudan alanı verir.'],
    ['Dikdörtgen bir paralelkenar mıdır?', 'Evet. Dikdörtgen, bütün açıları 90 derece olan paralelkenardır. Araçta açıyı 90 yazarsanız alan iki kenarın çarpımına, köşegenler de birbirine eşit çıkar.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız ölçüler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['eskenar-dortgen-alani-hesapla', 'yamuk-alani-hesapla', 'ucgen-alani-hesapla', 'alan-cevre-hesapla', 'metrekare-hesapla'],
};
