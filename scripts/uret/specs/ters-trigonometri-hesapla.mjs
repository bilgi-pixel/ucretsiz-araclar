export default {
  slug: 'ters-trigonometri-hesapla',
  title: 'Ters Trigonometri (Arcsin, Arccos, Arctan) Hesaplama',
  h1Tail: 'orandan açıya',
  pageTitle: 'Arcsin, Arccos, Arctan Hesaplama – Ters Trigonometri Aracı',
  description: 'Sinüs, kosinüs ya da tanjant değerinden açıyı bulun. Arcsin, arccos ve arctan sonucunu derece, radyan ve derece-dakika-saniye olarak, 0°–360° çözümleriyle verir.',
  card: 'Arcsin, arccos ve arctan ile orandan açıyı bulun; derece, radyan, dakika-saniye ve 0°–360° arasındaki tüm çözümler.',
  category: 'matematik',
  keywords: ['arcsin hesaplama', 'arccos hesaplama', 'arctan hesaplama', 'ters trigonometri', 'ters sinüs', 'ters tanjant', 'sin-1 hesaplama', 'açı bulma'],
  lead: 'Bir trigonometrik oranı yazın ve fonksiyonu seçin; araç o orana karşılık gelen açıyı <strong>derece, radyan ve derece-dakika-saniye</strong> olarak verir. Esas değerin yanında 0° ile 360° arasında aynı oranı veren bütün açıları da listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Değer (oran)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Arcsin ve arccos için -1 ile 1 arasında olmalıdır.' },
    { id: 'fonksiyon', label: 'Fonksiyon', type: 'select', options: [['arcsin', 'arcsin (ters sinüs)'], ['arccos', 'arccos (ters kosinüs)'], ['arctan', 'arctan (ters tanjant)']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const f = ['arcsin', 'arccos', 'arctan'].includes(v.fonksiyon) ? v.fonksiyon : 'arcsin';
    if (f !== 'arctan' && Math.abs(x) > 1) h.err(`${f} yalnızca -1 ile 1 arasındaki değerler için tanımlıdır; sinüs ve kosinüs bu aralığın dışına çıkamaz. Değeri kontrol edin ya da arctan seçin.`);
    const rad = f === 'arcsin' ? Math.asin(x) : f === 'arccos' ? Math.acos(x) : Math.atan(x);
    let deg = rad * 180 / Math.PI;
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const norm = (a) => { const r = Number(((a % 360 + 360) % 360).toFixed(6)); return r === 360 ? 0 : r; };
    const aday = f === 'arcsin' ? [norm(deg), norm(180 - deg)] : f === 'arccos' ? [norm(deg), norm(360 - deg)] : [norm(deg), norm(deg + 180)];
    const cozum = [...new Set(aday)].sort((a, b) => a - b).map((a) => h.fmt(a, 6) + '°').join(' ve ');
    const ts = Math.round(Math.abs(deg) * 360000) / 100;
    const D = Math.floor(ts / 3600 + 1e-9), M = Math.floor((ts - D * 3600) / 60 + 1e-9), S = ts - D * 3600 - M * 60;
    const dms = `${deg < 0 ? '-' : ''}${D}° ${M}′ ${h.fmt(Math.abs(S), 2)}″`;
    const aralik = { arcsin: '-90° ile 90° arası', arccos: '0° ile 180° arası', arctan: '-90° ile 90° arası (uçlar hariç)' }[f];
    return {
      rows: [
        ['Açı (derece)', h.fmt(deg, 6) + '°'],
        ['Açı (radyan)', h.fmt(rad, 6) + ' rad'],
        ['π cinsinden', h.fmt(rad / Math.PI, 6) + 'π rad'],
        ['Derece dakika saniye', dms],
        ['0°–360° arasındaki çözümler', cozum],
        ['Esas değer aralığı', aralik],
      ],
      note: 'İlk satır fonksiyonun esas değeridir. Aynı oranı veren diğer açılar, listelenen çözümlere 360°\'nin tam katları eklenerek bulunur.',
    };
  },
  cases: [
    { in: { deger: '0,5', fonksiyon: 'arcsin' }, out: { 'Açı (derece)': '30°', 'Açı (radyan)': '0,523599 rad', 'π cinsinden': '0,166667π rad', '0°–360° arasındaki çözümler': '30° ve 150°' } },
    { in: { deger: '1', fonksiyon: 'arctan' }, out: { 'Açı (derece)': '45°', 'Açı (radyan)': '0,785398 rad', '0°–360° arasındaki çözümler': '45° ve 225°' } },
    { in: { deger: '0,5', fonksiyon: 'arccos' }, out: { 'Açı (derece)': '60°', '0°–360° arasındaki çözümler': '60° ve 300°', 'Esas değer aralığı': '0° ile 180° arası' } },
    { in: { deger: '-1', fonksiyon: 'arccos' }, out: { 'Açı (derece)': '180°', 'Açı (radyan)': '3,141593 rad', '0°–360° arasındaki çözümler': '180°' } },
    { in: { deger: '-0,5', fonksiyon: 'arcsin' }, out: { 'Açı (derece)': '-30°', '0°–360° arasındaki çözümler': '210° ve 330°', 'Derece dakika saniye': '-30° 0′ 0″' } },
    { in: { deger: '0,6', fonksiyon: 'arcsin' }, out: { 'Açı (derece)': '36,869898°', 'Derece dakika saniye': '36° 52′ 11,63″' } },
    { in: { deger: '0', fonksiyon: 'arccos' }, out: { 'Açı (derece)': '90°', '0°–360° arasındaki çözümler': '90° ve 270°' } },
    { in: { deger: '0', fonksiyon: 'arctan' }, out: { 'Açı (derece)': '0°', '0°–360° arasındaki çözümler': '0° ve 180°' } },
    { in: { deger: '1', fonksiyon: 'arcsin' }, out: { 'Açı (derece)': '90°', '0°–360° arasındaki çözümler': '90°' } },
    { in: { deger: '0,75', fonksiyon: 'arctan' }, out: { 'Açı (derece)': '36,869898°' } },
    { in: { deger: '2', fonksiyon: 'arcsin' }, error: true },
    { in: { deger: '-1,5', fonksiyon: 'arccos' }, error: true },
    { in: { deger: 'abc', fonksiyon: 'arctan' }, error: true },
  ],
  howto: [
    '"Değer (oran)" alanına bildiğiniz sinüs, kosinüs ya da tanjant değerini yazın; örneğin 0,5 ya da 0,8660254.',
    '"Fonksiyon" listesinden bu değerin hangi orana ait olduğunu seçin: sinüs değeri için arcsin, kosinüs için arccos, tanjant için arctan.',
    '"Hesapla" düğmesine basın. İlk satır esas değeri derece olarak gösterir; altında radyan, π cinsinden ve derece-dakika-saniye karşılıkları yer alır.',
    'Denklem çözüyorsanız "0°–360° arasındaki çözümler" satırına bakın; bir oran çoğu zaman bir turda iki farklı açıya karşılık gelir.',
  ],
  sections: [
    { h: 'Ters trigonometrik fonksiyon ne demektir?', p: [
      'Sinüs, kosinüs ve tanjant açıdan orana gider: 30° verildiğinde sin 30° = 0,5 bulunur. Ters trigonometrik fonksiyonlar bu yolu geri yürür ve <strong>"hangi açının sinüsü 0,5\'tir?"</strong> sorusunu yanıtlar. arcsin 0,5 = 30° yazımı tam olarak bunu söyler. Hesap makinelerinde bu fonksiyonlar sin<sup>−1</sup>, cos<sup>−1</sup> ve tan<sup>−1</sup> tuşlarıyla gösterilir; programlama dillerinde <code>asin</code>, <code>acos</code>, <code>atan</code> adlarıyla geçer.',
      'Buradaki −1 üs değil, ters fonksiyon işaretidir. sin<sup>−1</sup>x ifadesi 1 ÷ sin x anlamına gelmez; 1 ÷ sin x kosekanttır ve bambaşka bir değerdir.',
    ] },
    { h: 'Esas değer aralıkları neden var?', p: [
      'Trigonometrik fonksiyonlar periyodik olduğundan aynı oranı sonsuz sayıda açı verir: sinüsü 0,5 olan açılar 30°, 150°, 390°, 510° diye sürer. Bir fonksiyonun tersinin tek bir sonuç verebilmesi için açı belirli bir aralığa kısıtlanır ve o aralıktaki sonuca <strong>esas değer</strong> denir.',
    ], ul: [
      '<strong>arcsin:</strong> girdi −1 ile 1 arasında, sonuç −90° ile 90° arasında (−π/2 ile π/2)',
      '<strong>arccos:</strong> girdi −1 ile 1 arasında, sonuç 0° ile 180° arasında (0 ile π)',
      '<strong>arctan:</strong> girdi herhangi bir gerçek sayı, sonuç −90° ile 90° arasında, uçlar dahil değil',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>arcsin 0,5:</strong> Sinüsü 0,5 olan esas açı 30°\'dir; radyan olarak π/6 ≈ 0,523599 eder. Sinüs II. bölgede de pozitif olduğundan 180° − 30° = 150° de aynı sinüse sahiptir. Araç çözümleri "30° ve 150°" olarak yazar.',
      '<strong>arccos 0,5:</strong> Esas değer 60°\'dir. Kosinüs IV. bölgede de pozitif olduğu için ikinci çözüm 360° − 60° = 300° olur.',
      '<strong>arctan 1:</strong> Esas değer 45°, yani π/4 ≈ 0,785398 radyandır. Tanjantın periyodu 180° olduğundan diğer çözüm 45° + 180° = 225°\'dir.',
      '<strong>arcsin(−0,5):</strong> Esas değer −30°\'dir. Pozitif ölçüyle ifade edildiğinde çözümler 210° ve 330° olur; ikisi de sinüsün negatif olduğu alt yarıdadır.',
      '<strong>arcsin 0,6:</strong> Sonuç 36,869898°\'dir; derece-dakika-saniye olarak 36° 52′ 11,63″ yazılır. Bu, kenarları 3-4-5 olan dik üçgenin küçük açısıdır ve arctan 0,75 ile aynı açıyı verir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>arcsin 0</strong> = 0°, <strong>arcsin 0,5</strong> = 30°, <strong>arcsin (√2/2)</strong> = 45°, <strong>arcsin (√3/2)</strong> = 60°, <strong>arcsin 1</strong> = 90°',
      '<strong>arccos 1</strong> = 0°, <strong>arccos (√3/2)</strong> = 30°, <strong>arccos (√2/2)</strong> = 45°, <strong>arccos 0,5</strong> = 60°, <strong>arccos 0</strong> = 90°, <strong>arccos (−1)</strong> = 180°',
      '<strong>arctan 0</strong> = 0°, <strong>arctan (√3/3)</strong> = 30°, <strong>arctan 1</strong> = 45°, <strong>arctan √3</strong> = 60°',
      'Köklü değerleri ondalık yazarken yeterli basamak kullanın: √2/2 ≈ 0,7071067812, √3/2 ≈ 0,8660254038, √3 ≈ 1,7320508076',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Kenar uzunlukları bilinen bir dik üçgende açıyı bulmanın yolu ters trigonometridir. Yatayda 4 metre, düşeyde 3 metre olan bir rampanın eğim açısı arctan(3 ÷ 4) = arctan 0,75 ≈ 36,87°\'dir. Yüzde olarak verilen eğimler de aynı yolla açıya çevrilir: %10 eğim arctan 0,1 ≈ 5,71° eder.',
      'Fizikte bileşenleri bilinen bir vektörün yönü arctan(y ÷ x) ile, ışığın kırılma açısı Snell yasasında arcsin ile bulunur. Elektrikte güç faktörü cos φ bilindiğinde faz açısı φ = arccos(güç faktörü) olur. Lise trigonometri denklemlerinde ise sin x = a biçimindeki eşitliklerin çözüm kümesi esas değerden yola çıkılarak yazılır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Arcsin ya da arccos için 1\'den büyük bir değer yazmak en sık görülen hatadır; hipotenüs en uzun kenar olduğu için sinüs ve kosinüs 1\'i aşamaz. Böyle bir değer çıktıysa büyük olasılıkla oran ters kurulmuştur ya da aslında tanjant hesaplanmıştır.',
      'Arctan yalnızca oranı bilir, noktanın hangi bölgede olduğunu bilmez. Bileşenleri (−1, −1) olan bir vektör için y ÷ x = 1 çıkar ve arctan 45° verir; oysa vektör III. bölgededir ve gerçek yön 225°\'dir. Bu yüzden iki çözümü birlikte gösteriyoruz; doğru olanı bileşenlerin işaretine bakarak seçmelisiniz. Yuvarlanmış oran girildiğinde sonuç da yaklaşık çıkar: 0,866 yazarsanız 60° yerine 59,9971° görürsünüz.',
    ] },
  ],
  faq: [
    ['Arcsin 0,5 kaç derecedir?', 'arcsin 0,5 = 30°\'dir, radyan olarak π/6 eder. 0° ile 360° arasında sinüsü 0,5 olan ikinci açı 150°\'dir.'],
    ['Arcsin ile sin üzeri −1 aynı şey midir?', 'Evet, sin<sup>−1</sup>x yazımı arcsin x ile aynıdır ve ters sinüs anlamına gelir. Ancak bu, 1 ÷ sin x demek değildir; 1 ÷ sin x kosekant fonksiyonudur.'],
    ['Arcsin 2 neden hesaplanamıyor?', 'Sinüs değeri hiçbir gerçek açı için −1 ile 1 aralığının dışına çıkmaz. Bu yüzden sinüsü 2 olan bir açı yoktur ve arcsin 2 gerçek sayılarda tanımsızdır. Aynı kısıt arccos için de geçerlidir.'],
    ['Arctan için bir sınır var mı?', 'Hayır, arctan her gerçek sayı için tanımlıdır. Girdi büyüdükçe sonuç 90°\'ye yaklaşır ama hiçbir zaman 90° olmaz; örneğin arctan 1000 yaklaşık 89,9427°\'dir.'],
    ['Neden iki çözüm gösteriliyor?', 'Bir tam turda sinüs, kosinüs ve tanjant aynı değeri genellikle iki farklı açıda alır. Ters fonksiyon yalnızca esas değeri verir; denklem çözerken ikinci açıya da ihtiyaç duyulduğu için ikisi birlikte listelenir.'],
    ['Sonucu radyan olarak nasıl alırım?', 'Ayrı bir ayar gerekmez; sonuç kutusunda açı hem derece hem radyan olarak, ayrıca π\'nin katı biçiminde yazılır. Örneğin arctan 1 için 0,785398 rad ve 0,25π rad görürsünüz.'],
    ['Arccot nasıl hesaplanır?', 'Pozitif bir x için arccot x = arctan(1 ÷ x) eşitliğini kullanabilirsiniz. Örneğin kotanjantı √3 olan açı, arctan(1 ÷ 1,7320508) = 30°\'dir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız oran sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sinus-hesapla', 'kosinus-hesapla', 'tanjant-hesapla', 'derece-radyan-cevir', 'dms-ondalik-derece-cevir', 'dik-ucgen-hesapla'],
};
