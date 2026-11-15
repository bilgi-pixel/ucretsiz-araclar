export default {
  slug: 'derece-radyan-cevir',
  title: 'Derece Radyan Çevirici',
  h1Tail: '° ↔ rad',
  pageTitle: "Derece Radyan Çevirici – Dereceyi Radyana, Radyanı Dereceye Çevirme",
  description: "Dereceyi radyana, radyanı dereceye çevirin. π radyan = 180° eşitliğiyle çalışır; sonucu π'nin katı, grad ve devir olarak da gösterir. π katı girişi desteklenir.",
  card: "Dereceyi radyana, radyanı dereceye çevirin; π cinsinden yazım, grad ve devir karşılığıyla birlikte.",
  category: 'birim',
  keywords: ['derece radyan çevirme', 'radyan derece çevirme', '1 radyan kaç derece', '180 derece kaç radyan', 'pi radyan kaç derece', 'radyan hesaplama', 'açı birimi çevirme'],
  lead: "Bir açıyı dereceden radyana ya da radyandan dereceye çevirin. Araç <strong>π radyan = 180°</strong> eşitliğini kullanır, sonucu π'nin katı olarak da yazar ve aynı açının grad ve devir karşılığını verir. Radyanı doğrudan π katı olarak (örneğin 0,5π) girebilirsiniz.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Açı değeri', type: 'number', placeholder: 'Örn. 90', hint: 'Negatif açı girebilirsiniz. π katı yönünde yalnızca katsayıyı yazın (π/2 için 0,5).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['derece', 'Derece → Radyan'], ['radyan', 'Radyan → Derece'], ['pi', 'π katı (radyan) → Derece']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    let derece;
    if (v.yon === 'radyan') derece = x * 180 / Math.PI;
    else if (v.yon === 'pi') derece = x * 180;
    else derece = x;
    const radyan = v.yon === 'radyan' ? x : derece * Math.PI / 180;
    const piKat = v.yon === 'pi' ? x : derece / 180;
    const dereceSatir = ['Derece', h.fmt(derece, 6) + '°'];
    const radyanSatir = ['Radyan', h.fmt(radyan, 6) + ' rad'];
    const rows = v.yon === 'derece' ? [radyanSatir, ['π cinsinden', h.fmt(piKat, 6) + 'π rad'], dereceSatir] : [dereceSatir, radyanSatir, ['π cinsinden', h.fmt(piKat, 6) + 'π rad']];
    rows.push(['Grad', h.fmt(derece * 10 / 9, 6) + ' grad']);
    rows.push(['Devir', h.fmt(derece / 360, 6) + ' devir']);
    return { rows, note: 'π = 3,14159265358979… alınır; sonuçlar en fazla altı ondalık basamakla gösterilir. 1 rad = 180 ÷ π ≈ 57,29578°.' };
  },
  cases: [
    { in: { deger: '180', yon: 'derece' }, out: { 'Radyan': '3,141593 rad', 'π cinsinden': '1π rad', 'Grad': '200 grad', 'Devir': '0,5 devir' } },
    { in: { deger: '1', yon: 'radyan' }, out: { 'Derece': '57,29578°', 'π cinsinden': '0,31831π rad' } },
    { in: { deger: '90', yon: 'derece' }, out: { 'Radyan': '1,570796 rad', 'π cinsinden': '0,5π rad', 'Grad': '100 grad' } },
    { in: { deger: '45', yon: 'derece' }, out: { 'Radyan': '0,785398 rad', 'π cinsinden': '0,25π rad' } },
    { in: { deger: '360', yon: 'derece' }, out: { 'Radyan': '6,283185 rad', 'π cinsinden': '2π rad', 'Devir': '1 devir' } },
    { in: { deger: '0,5', yon: 'pi' }, out: { 'Derece': '90°', 'Radyan': '1,570796 rad' } },
    { in: { deger: '2', yon: 'pi' }, out: { 'Derece': '360°', 'Devir': '1 devir' } },
    { in: { deger: '-30', yon: 'derece' }, out: { 'Radyan': '-0,523599 rad' } },
    { in: { deger: '0', yon: 'radyan' }, out: { 'Derece': '0°' } },
    { in: { deger: 'pi', yon: 'radyan' }, error: true },
    { in: { deger: '', yon: 'derece' }, error: true },
  ],
  howto: [
    "'Açı değeri' alanına açıyı yazın. Ondalık için virgül ya da nokta kullanabilir, saat yönündeki açılar için eksi işareti koyabilirsiniz.",
    "'Çeviri yönü' listesinden dereceden radyana, radyandan dereceye ya da π katından dereceye geçişi seçin.",
    "Radyan değeriniz π/3 ya da 3π/4 gibi π'li bir ifadeyse 'π katı' yönünü seçip yalnızca katsayıyı girin: π/3 için 0,333333, 3π/4 için 0,75.",
    "'Çevir' düğmesine basın. İlk satır istediğiniz birimdeki sonucu, alt satırlar π cinsinden yazımı, grad ve devir karşılığını gösterir.",
  ],
  sections: [
    { h: 'Radyan nedir?', p: [
      "Radyan, açıyı çember üzerindeki yay uzunluğuyla tanımlayan birimdir. Bir çemberde yarıçap uzunluğunda bir yay alırsanız, bu yayın merkezde gördüğü açı <strong>1 radyandır</strong>. Çemberin çevresi 2π × yarıçap olduğundan tam bir tur 2π radyan, yarım tur π radyan eder. Derece ise tam turu 360 eşit parçaya bölen, çok eski çağlardan kalma pratik bir birimdir.",
      "Radyanın üstünlüğü, açıyı bir uzunluk oranı olarak vermesidir; bu yüzden birimsiz bir sayıdır ve formülleri sadeleştirir. Yay uzunluğu doğrudan yarıçap × açı, daire diliminin alanı yarıçapın karesi × açı ÷ 2 olarak yazılır. Türev ve integralde sinüs ile kosinüsün bilinen kuralları da yalnızca açı radyan olduğunda geçerlidir.",
    ] },
    { h: 'Çeviri formülleri', p: [
      "İki birim arasındaki köprü π radyan = 180° eşitliğidir. Buradan iki formül çıkar: <strong>radyan = derece × π ÷ 180</strong> ve <strong>derece = radyan × 180 ÷ π</strong>. 1 radyan yaklaşık 57,29578 derece, 1 derece yaklaşık 0,0174533 radyandır.",
      "Radyan değerleri çoğu zaman ondalık sayı yerine π'nin katı olarak yazılır, çünkü böylesi hem daha kısa hem de tamdır. Derece değerini 180'e bölmek size bu katsayıyı verir: 60° için 60 ÷ 180 = 1/3, yani π/3 radyan.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Örnek 1: 90° kaç radyandır? 90 × π ÷ 180 = π/2. Ondalık olarak 1,570796 radyan eder; araç bunu '0,5π rad' satırıyla birlikte gösterir.",
      "Örnek 2: 1 radyan kaç derecedir? 1 × 180 ÷ π = 57,29578°. Bu açı, bir eşkenar üçgenin 60 derecelik köşesinden biraz dardır; çünkü yarıçap uzunluğundaki yay, aynı uzunluktaki kirişten daha kısa bir açıklığı kapatır.",
      "Örnek 3: 45° için 45 ÷ 180 = 0,25 bulunur; açı π/4 radyandır ve ondalık değeri 0,785398'dir.",
      "Örnek 4: −30° saat yönünde ölçülmüş bir açıdır ve −0,523599 radyana, yani −π/6'ya karşılık gelir. İşaret çeviride aynen korunur.",
    ] },
    { h: 'Sık kullanılan açılar tablosu', ul: [
      "<strong>30°</strong> = π/6 ≈ 0,523599 rad",
      "<strong>45°</strong> = π/4 ≈ 0,785398 rad",
      "<strong>60°</strong> = π/3 ≈ 1,047198 rad",
      "<strong>90°</strong> = π/2 ≈ 1,570796 rad",
      "<strong>120°</strong> = 2π/3 ≈ 2,094395 rad",
      "<strong>135°</strong> = 3π/4 ≈ 2,356194 rad",
      "<strong>180°</strong> = π ≈ 3,141593 rad",
      "<strong>270°</strong> = 3π/2 ≈ 4,712389 rad",
      "<strong>360°</strong> = 2π ≈ 6,283185 rad",
    ] },
    { h: 'Hesap makinesi ve yazılımda en sık yapılan hata', p: [
      "Trigonometri sorularında yanlış sonucun en yaygın nedeni açı kipidir. Bilimsel hesap makinelerinde DEG (derece), RAD (radyan) ve GRAD kipleri bulunur. Makine RAD kipindeyken sin 30 yazarsanız 0,5 yerine yaklaşık −0,988 görürsünüz; çünkü makine 30 dereceyi değil 30 radyanı hesaplar. Sınava girmeden önce ekrandaki kip göstergesini kontrol etmek iyi bir alışkanlıktır.",
      "Programlama dillerinin ve hesap tablolarının trigonometri fonksiyonları neredeyse her zaman radyan bekler. Derece cinsinden bir açının sinüsünü alacaksanız önce radyana çevirmeniz gerekir. Tersine, arksinüs ve arktanjant gibi fonksiyonların döndürdüğü değer de radyandır; ekranda derece göstermek için 180 ÷ π ile çarpılır.",
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      "Lise ve üniversite matematiğinde birim çember, trigonometrik denklemler, limit ve türev konuları radyanla işlenir; üniversite sınavına hazırlananların iki birim arasında hızlı geçiş yapabilmesi gerekir. Fizikte açısal hız radyan/saniye ile ölçülür; dönen bir milin, sarkaçların ve alternatif akımın hesaplarında açı radyandır.",
      "Mühendislikte robot kolu eklemleri, servo motor konumları ve sinyal işleme; yazılımda oyun motorları, grafik kütüphaneleri ve harita uygulamaları açıyı radyan olarak saklar. Coğrafi koordinatlarla mesafe hesaplanırken enlem ve boylam önce radyana çevrilir.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç herhangi bir büyüklükte pozitif ya da negatif açıyı kabul eder ve 360 dereceyi aşan değerleri küçültmez; 450° girdiğinizde 2,5π radyan sonucunu görürsünüz. Sonuçlar altı ondalık basamağa yuvarlanır. π irrasyonel bir sayı olduğundan ondalık radyan değerleri her zaman yaklaşık, π'li yazım ise tamdır.",
    ] },
  ],
  faq: [
    ['1 radyan kaç derecedir?', "1 radyan 180 ÷ π, yani yaklaşık 57,29578 derecedir. Derece, dakika ve saniye olarak yaklaşık 57° 17′ 45″ eder."],
    ['180 derece kaç radyandır?', "180 derece tam olarak π radyandır; ondalık değeri yaklaşık 3,141593'tür. Buna göre 360 derece 2π, 90 derece π/2 radyandır."],
    ['Dereceyi radyana nasıl çeviririm?', "Derece değerini π ile çarpıp 180'e bölersiniz. Kısa yol olarak dereceyi 180'e bölüp sonucun yanına π yazabilirsiniz: 120° ÷ 180 = 2/3, yani 2π/3 radyan."],
    ['π/3 radyanı araca nasıl girerim?', "Yön olarak 'π katı (radyan) → Derece' seçin ve katsayıyı ondalık yazın. π/3 için 0,333333 girdiğinizde yaklaşık 60° sonucunu alırsınız."],
    ['Radyanın simgesi nedir?', "Radyan 'rad' kısaltmasıyla gösterilir. Matematik metinlerinde birim çoğu kez hiç yazılmaz; derece simgesi taşımayan bir açı değerinin radyan olduğu kabul edilir."],
    ['Negatif açı ne anlama gelir?', "Pozitif açılar saat yönünün tersine, negatif açılar saat yönünde ölçülür. −90° ile 270° çember üzerinde aynı noktayı gösterir, ancak araç değeri değiştirmeden çevirir."],
    ['Grad ile radyan aynı şey mi?', "Hayır. Grad tam turu 400 parçaya bölen ayrı bir birimdir; 100 grad 90 dereceye eşittir. Radyan ise yay uzunluğuna dayanır. Araç her iki karşılığı da gösterir."],
    ['Girdiğim açılar bir yere gönderiliyor mu?', "Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz."],
  ],
  related: ['derece-grad-cevir', 'radyan-devir-cevir', 'dms-ondalik-derece-cevir', 'ters-trigonometri-hesapla', 'dik-ucgen-hesapla'],
};
