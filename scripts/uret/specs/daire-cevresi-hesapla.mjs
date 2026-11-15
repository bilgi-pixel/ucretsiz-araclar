export default {
  slug: 'daire-cevresi-hesapla',
  title: 'Daire Çevresi Hesaplama',
  h1Tail: 'çember uzunluğu, 2πr',
  pageTitle: 'Daire Çevresi Hesaplama – Yarıçap, Çap ya da Alandan 2πr',
  description: 'Dairenin çevresini (çember uzunluğunu) yarıçap, çap ya da alandan hesaplayın. Ç = 2πr formülüyle çalışır; tekerleğin belirli turda aldığı yolu da verir.',
  card: 'Yarıçap, çap ya da alanı yazın; çember uzunluğunu 2πr ile bulun, isterseniz tur sayısına göre alınan yolu görün.',
  category: 'matematik',
  keywords: ['daire çevresi hesaplama', 'çember uzunluğu', 'çemberin çevresi formülü', '2 pi r', 'çaptan çevre hesaplama', 'tekerlek çevresi', 'alanı bilinen dairenin çevresi'],
  lead: `Dairenin çevresini, yani çemberin uzunluğunu <strong>yarıçap</strong>, <strong>çap</strong> ya da <strong>alan</strong> bilgisinden hesaplayın. Formül <strong>Ç = 2 · π · r</strong>'dir. Tur sayısı yazarsanız, o çaptaki bir tekerleğin kaymadan yuvarlanırken aldığı yol da bulunur.`,
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Ölçü', type: 'number', placeholder: 'Örn. 7' },
    { id: 'tur', label: 'Yazdığınız ölçü', type: 'select', options: [['r', 'Yarıçap'], ['d', 'Çap'], ['a', 'Alan']] },
    { id: 'devir', label: 'Tur sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000', hint: 'Tekerlek ya da makaranın aldığı yol için' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    let r;
    if (v.tur === 'd') r = x / 2;
    else if (v.tur === 'a') r = Math.sqrt(x / Math.PI);
    else r = x;
    const cevre = 2 * Math.PI * r;
    const rows = [
      ['Çevre', h.fmt(cevre, 4) + ' birim'],
      ['Yarıçap', h.fmt(r, 4) + ' birim'],
      ['Çap', h.fmt(2 * r, 4) + ' birim'],
      ['Alan', h.fmt(Math.PI * r * r, 4) + ' birim²'],
    ];
    if (String(v.devir ?? '').trim() !== '') {
      const n = h.pos(v.devir, 'Tur sayısı');
      rows.push(['Bu tur sayısında alınan yol', h.fmt(cevre * n, 4) + ' birim']);
    }
    return { rows, note: 'Ç = 2·π·r = π·d. Çevre, ölçüyü yazdığınız uzunluk birimiyle aynı birimdedir.' };
  },
  cases: [
    { in: { deger: '7', tur: 'r' }, out: { 'Çevre': '43,9823 birim', 'Çap': '14 birim', 'Alan': '153,938 birim²' } },
    { in: { deger: '1', tur: 'd' }, out: { 'Çevre': '3,1416 birim', 'Yarıçap': '0,5 birim' } },
    { in: { deger: '1', tur: 'r' }, out: { 'Çevre': '6,2832 birim' } },
    { in: { deger: '70', tur: 'd' }, out: { 'Çevre': '219,9115 birim' } },
    { in: { deger: '0,66', tur: 'd', devir: '1000' }, out: { 'Çevre': '2,0735 birim', 'Bu tur sayısında alınan yol': '2.073,4512 birim' } },
    { in: { deger: '78,5398', tur: 'a' }, out: { 'Çevre': '31,4159 birim', 'Yarıçap': '5 birim' } },
    { in: { deger: '-3', tur: 'r' }, error: true },
    { in: { deger: '', tur: 'r' }, error: true },
    { in: { deger: '5', tur: 'r', devir: 'x' }, error: true },
  ],
  howto: [
    `"Ölçü" kutusuna dairenin bildiğiniz değerini yazın.`,
    `"Yazdığınız ölçü" listesinden bu değerin yarıçap, çap ya da alan olduğunu belirtin.`,
    `Bir tekerleğin, makaranın ya da kasnağın kaç turda ne kadar yol aldığını öğrenmek istiyorsanız "Tur sayısı" kutusunu doldurun; istemiyorsanız boş bırakın.`,
    `"Hesapla" düğmesine basın. Çevre ilk satırda, yarıçap, çap ve alan altında listelenir.`,
  ],
  sections: [
    { h: 'Çevre formülü: 2πr ya da πd', p: [
      `Dairenin çevresi, onu sınırlayan çemberin bir ucundan başlayıp aynı noktaya dönene kadar ölçülen uzunluğudur. Bu uzunluk her dairede çapın aynı katıdır; bu sabit kata <strong>pi</strong> (π ≈ 3,14159) denir. Dolayısıyla <strong>Ç = π · d</strong> olur. Çap, yarıçapın iki katı olduğundan aynı formül <strong>Ç = 2 · π · r</strong> biçiminde de yazılır.`,
      `Pi sayısının tanımı zaten bu orandır: hangi büyüklükte olursa olsun, bir çemberin uzunluğunu çapına böldüğünüzde yaklaşık 3,14 elde edersiniz. Bir tencere kapağının çevresine ip sarıp ipi cetvelle ölçerek, sonra kapağın çapına bölerek bunu evde sınayabilirsiniz.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Yarıçaptan:</strong> yarıçapı 7 cm olan dairenin çevresi 2 × π × 7 = 14π ≈ <strong>43,9823 cm</strong>'dir. Okulda π = 22/7 alındığında aynı soru tam 44 cm sonucunu verir; aradaki küçük fark 22/7'nin pi'den biraz büyük olmasından kaynaklanır.`,
      `<strong>Çaptan:</strong> çapı 70 cm olan yuvarlak bir masanın kenarına şerit çekecekseniz π × 70 ≈ <strong>219,9115 cm</strong>, yani yaklaşık 2,2 metre şerit gerekir.`,
      `<strong>Alandan:</strong> alanı 78,5398 cm² olan dairenin yarıçapı √(78,5398 ÷ π) = 5 cm, çevresi 2 × π × 5 ≈ <strong>31,4159 cm</strong>'dir. Doğrudan formül Ç = 2 · √(π · A) şeklindedir.`,
    ] },
    { h: 'Tekerlek kaç turda ne kadar yol alır?', p: [
      `Kaymadan yuvarlanan bir tekerlek her tam turda kendi çevresi kadar ilerler. Bu yüzden alınan yol, çevre ile tur sayısının çarpımıdır. Dış çapı 0,66 metre olan bir bisiklet tekerleğinin çevresi π × 0,66 ≈ 2,0735 metredir; tekerlek 1000 tur attığında bisiklet yaklaşık <strong>2.073,45 metre</strong>, yani iki kilometreden biraz fazla yol almış olur.`,
      `Bisiklet kilometre saatlerinin ayarı, ölçüm tekerlekleri (yol ölçer), araç kilometre sayaçları ve konveyör bantları bu ilkeyle çalışır. Lastik ebadı değiştiğinde sayacın gösterdiği mesafenin sapmasının nedeni de budur: çap büyürse her turda alınan yol artar. Gerçek lastiklerde yük altındaki basılma nedeniyle etkin çevre, serbest hâldeki çevreden bir miktar küçük olur; hassas ayar için tekerleği yerde bir tam tur yuvarlayıp ölçmek en doğrusudur.`,
    ] },
    { h: 'Çevre hesabı nerelerde kullanılır?', ul: [
      `<strong>Dikiş ve el işi:</strong> yuvarlak masa örtüsüne dantel, biye ya da fisto geçerken gereken uzunluk.`,
      `<strong>Bahçe:</strong> yuvarlak bir tarhın ya da ağaç dibinin etrafına bordür taşı, çit teli veya damla sulama hortumu döşemek.`,
      `<strong>Tesisat ve imalat:</strong> boruya sarılacak yalıtım bandı, kelepçe boyu, sac büküm açınımı. Silindir biçimli bir tankın yan yüzeyi açıldığında bir kenarı çevre uzunluğunda olan bir dikdörtgen elde edilir.`,
      `<strong>Spor:</strong> atletizm pistlerinin viraj uzunlukları yarım çember hesabına dayanır; kulvar dışa kaydıkça yarıçap ve dolayısıyla mesafe artar.`,
      `<strong>Ağaç ve kolon ölçümü:</strong> çevreyi mezurayla ölçüp π'ye bölerek çapı bulmak. Çapı doğrudan ölçülemeyen kalın gövdelerde ve betonarme kolonlarda en pratik yöntem budur.`,
    ] },
    { h: 'Çevre ile alan arasındaki fark', p: [
      `Çevre bir <em>uzunluktur</em> ve santimetre, metre gibi birimlerle ölçülür. Alan ise bir <em>yüzey büyüklüğüdür</em> ve santimetrekare, metrekare ile ifade edilir. Yarıçap iki katına çıktığında çevre de iki katına çıkar; alan ise dört katına çıkar. Bu yüzden büyük bir dairede kenar için gereken malzeme (çit, bordür) alandaki malzemeye (çim, beton) göre daha yavaş artar.`,
      `İlginç bir eşitlik: yarıçapı 2 birim olan dairede çevre (4π) ile alan (4π) sayıca aynıdır; ancak birimleri farklı olduğundan bu iki büyüklük birbirine eşit sayılmaz.`,
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      `Çap <strong>1</strong> → çevre 3,1416`,
      `Çap <strong>10</strong> → çevre 31,4159`,
      `Çap <strong>50</strong> → çevre 157,0796`,
      `Çap <strong>100</strong> → çevre 314,1593`,
      `Yarıçap <strong>1</strong> → çevre 6,2832`,
      `Yarıçap <strong>7</strong> → çevre 43,9823`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En yaygın hata yarıçap ile çapı karıştırmaktır; çap yerine yarıçap yazılırsa sonuç yarı yarıya küçük çıkar. İkinci hata, alan formülü (π · r²) ile çevre formülünü (2 · π · r) birbirinin yerine kullanmaktır. Üçüncüsü de ölçüleri farklı birimlerle girmektir: çapı santimetre yazdıysanız çevre de santimetredir.`,
      `Araç kusursuz daire varsayar. Oval, basık ya da yıpranmış nesnelerde gerçek çevre hesaplanan değerden sapabilir. Sonuçlar dört ondalık basamağa yuvarlanır; kesim ve sipariş işlerinde birkaç milimetrelik birleştirme ya da bindirme payı bırakmak yerinde olur.`,
    ] },
  ],
  faq: [
    ['Dairenin çevresi nasıl hesaplanır?', 'Yarıçap iki ile ve pi sayısıyla çarpılır: Ç = 2 · π · r. Çap biliniyorsa doğrudan pi ile çarpmak yeterlidir. Yarıçapı 7 olan dairenin çevresi yaklaşık 43,98 birimdir.'],
    ['Çemberin uzunluğu ile dairenin çevresi aynı mı?', 'Evet. Çember, dairenin kenar çizgisidir; dairenin çevresi denildiğinde bu çizginin uzunluğu kastedilir. Her iki ifade için de 2πr formülü kullanılır.'],
    ['Çapı 1 metre olan dairenin çevresi kaç metredir?', 'Çevre, çap çarpı pi olduğundan yaklaşık 3,1416 metredir. Bu aynı zamanda pi sayısının tanımıdır: çevrenin çapa oranı.'],
    ['Alanı bilinen dairenin çevresi nasıl bulunur?', 'Önce yarıçap bulunur: r = √(A ÷ π). Sonra 2πr uygulanır. Araçta ölçü türünü "Alan" seçerseniz bu iki adım otomatik yapılır; alanı 78,5398 olan dairenin çevresi 31,4159 çıkar.'],
    ['Çevreden çap nasıl bulunur?', 'Çevre pi sayısına bölünür: d = Ç ÷ π. Mezurayla çevresini 94,25 cm ölçtüğünüz bir ağaç gövdesinin çapı yaklaşık 30 cm\'dir.'],
    ['Yarım çemberin uzunluğu nasıl hesaplanır?', 'Yay kısmı tam çevrenin yarısıdır, yani π · r. Yarım dairenin tüm kenar uzunluğu soruluyorsa düz kenar olan çapı da eklemek gerekir: π · r + 2r.'],
    ['Tur sayısı kutusu ne işe yarar?', 'Kaymadan dönen bir tekerleğin ya da makaranın belirtilen tur sayısında aldığı yolu verir. Hesap, çevre ile tur sayısının çarpımıdır; sonuç ölçüyle aynı uzunluk birimindedir.'],
    ['Hesaplarım kaydediliyor mu?', 'Hayır. Bütün işlem tarayıcınızda gerçekleşir, yazdığınız değerler sunucuya gönderilmez.'],
  ],
  related: ['daire-alani-hesapla', 'daire-dilimi-hesapla', 'elips-alani-hesapla', 'alan-cevre-hesapla', 'derece-radyan-cevir'],
};
