export default {
  slug: 'kacis-hizi-hesapla',
  title: 'Kaçış Hızı Hesaplama',
  h1Tail: 'gezegen ve yıldızlar için',
  pageTitle: 'Kaçış Hızı Hesaplama – Dünya, Ay, Mars ve Diğer Gök Cisimleri',
  description: 'Bir gök cisminin çekiminden kurtulmak için gereken kaçış hızını v = √(2GM/r) ile hesaplayın. Dünya, Ay, Mars, Jüpiter, Güneş ya da kendi değerleriniz.',
  card: 'Gezegen, uydu ya da yıldızın kütle ve yarıçapından kaçış hızını, dairesel yörünge hızını ve çekim ivmesini bulun.',
  category: 'bilim',
  keywords: ['kaçış hızı hesaplama', 'dünyanın kaçış hızı', 'kurtulma hızı', 'kaçış hızı formülü', 'ayın kaçış hızı', 'ikinci kozmik hız', 'yörünge hızı hesaplama'],
  lead: 'Kaçış hızı, bir cismin motor gücü olmadan bir gök cisminin çekiminden tümüyle kurtulabilmesi için sahip olması gereken en küçük hızdır. Araç <strong>v = √(2 · G · M / r)</strong> bağıntısını kullanır; hazır gök cisimlerinden birini seçebilir ya da kütle ve yarıçapı kendiniz yazabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'cisim', label: 'Gök cismi', type: 'select', options: [['dunya', 'Dünya'], ['ay', 'Ay'], ['mars', 'Mars'], ['venus', 'Venüs'], ['merkur', 'Merkür'], ['jupiter', 'Jüpiter'], ['saturn', 'Satürn'], ['gunes', 'Güneş'], ['ozel', 'Özel değer gireceğim']] },
    { id: 'kutle', label: 'Özel kütle (kg)', type: 'text', placeholder: 'Örn. 5.972e24', hint: 'Yalnızca "Özel değer" seçiliyse kullanılır. 5.972e24 = 5,972 × 10²⁴' },
    { id: 'yaricap', label: 'Özel yarıçap (km)', type: 'text', placeholder: 'Örn. 6371', hint: 'Yalnızca "Özel değer" seçiliyse kullanılır.' },
    { id: 'yukseklik', label: 'Yüzeyden yükseklik (km)', type: 'number', value: '0', hint: 'Yüzeyden kaçış için 0 bırakın.' },
  ],
  compute(v, h) {
    const G = 6.6743e-11;
    const tablo = {
      dunya: [5.972e24, 6371], ay: [7.342e22, 1737.4], mars: [6.417e23, 3389.5], venus: [4.867e24, 6051.8],
      merkur: [3.301e23, 2439.7], jupiter: [1.898e27, 69911], saturn: [5.683e26, 58232], gunes: [1.989e30, 695700],
    };
    let M, R;
    if (v.cisim === 'ozel') { M = h.pos(v.kutle, 'Özel kütle'); R = h.pos(v.yaricap, 'Özel yarıçap'); }
    else [M, R] = tablo[v.cisim] || tablo.dunya;
    const yuk = h.nonneg(h.opt(v.yukseklik, 0, 'Yüzeyden yükseklik'), 'Yüzeyden yükseklik');
    const r = (R + yuk) * 1000;
    const ve = Math.sqrt(2 * G * M / r);
    if (!Number.isFinite(ve)) h.err('Sonuç hesaplanamadı; kütle ve yarıçap değerlerini kontrol edin.');
    const c = 299792458;
    const rows = [
      ['Kaçış hızı', h.fmt(ve / 1000, 3) + ' km/s'],
      ['Metre/saniye', h.fmt(ve, 1) + ' m/s'],
      ['Kilometre/saat', h.fmt(ve * 3.6, 0) + ' km/sa'],
      ['Dairesel yörünge hızı', h.fmt(ve / Math.SQRT2 / 1000, 3) + ' km/s'],
      ['Çekim ivmesi', h.fmt(G * M / (r * r), 3) + ' m/s²'],
      ['Merkezden uzaklık', h.fmt(r / 1000, 1) + ' km'],
    ];
    let note = 'Hava direnci ve gök cisminin dönüşü hesaba katılmaz. Kaçış hızı, fırlatılan cismin kütlesine bağlı değildir.';
    if (ve >= c) note = 'Bulunan değer ışık hızına eşit ya da ondan büyük; bu ölçekte Newton fiziği geçerli değildir ve sonuç fiziksel anlam taşımaz.';
    else if (ve > 0.1 * c) note = 'Bulunan hız ışık hızının onda birini aşıyor; bu ölçekte göreli etkiler önem kazanır, sonuç yaklaşık kabul edilmelidir.';
    return { rows, note };
  },
  cases: [
    { in: { cisim: 'dunya', yukseklik: '0' }, out: { 'Kaçış hızı': '11,186 km/s', 'Kilometre/saat': '40.270 km/sa', 'Dairesel yörünge hızı': '7,91 km/s', 'Çekim ivmesi': '9,82 m/s²' } },
    { in: { cisim: 'ay', yukseklik: '0' }, out: { 'Kaçış hızı': '2,375 km/s', 'Çekim ivmesi': '1,623 m/s²' } },
    { in: { cisim: 'mars', yukseklik: '0' }, out: { 'Kaçış hızı': '5,027 km/s', 'Çekim ivmesi': '3,728 m/s²' } },
    { in: { cisim: 'dunya', yukseklik: '400' }, out: { 'Kaçış hızı': '10,851 km/s', 'Dairesel yörünge hızı': '7,672 km/s', 'Merkezden uzaklık': '6.771 km' } },
    { in: { cisim: 'jupiter', yukseklik: '0' }, out: { 'Kaçış hızı': '60,2 km/s' } },
    { in: { cisim: 'gunes', yukseklik: '0' }, out: { 'Kaçış hızı': '617,766 km/s' } },
    { in: { cisim: 'ozel', kutle: '1e22', yaricap: '1000', yukseklik: '0' }, out: { 'Kaçış hızı': '1,155 km/s', 'Metre/saniye': '1.155,4 m/s' } },
    { in: { cisim: 'ozel', kutle: '', yaricap: '1000', yukseklik: '0' }, error: true },
    { in: { cisim: 'dunya', yukseklik: '-100' }, error: true },
  ],
  howto: [
    '"Gök cismi" listesinden Dünya, Ay, Mars gibi hazır seçeneklerden birini seçin. Başka bir cisim için "Özel değer gireceğim" seçeneğini kullanın.',
    'Özel değer seçtiyseniz kütleyi kilogram, yarıçapı kilometre olarak yazın. Büyük kütleler için 5.972e24 biçimindeki bilimsel gösterimi kullanabilirsiniz.',
    'Kaçışın yüzeyden değil belirli bir yükseklikten başlayacağını varsayıyorsanız yüksekliği kilometre olarak girin; yüzey için 0 bırakın.',
    '"Hesapla" düğmesine basın. Kaçış hızı km/s, m/s ve km/sa olarak; ayrıca aynı uzaklıktaki dairesel yörünge hızı ve çekim ivmesi listelenir.',
  ],
  sections: [
    { h: 'Kaçış hızı nedir?', p: [
      'Yukarı fırlatılan bir taş yavaşlar, durur ve geri düşer. Daha hızlı atarsanız daha yükseğe çıkar, ama yine döner. Peki öyle bir hız var mı ki taş bir daha hiç geri dönmesin? Hava direncinin olmadığı varsayılırsa evet: bu hıza kaçış hızı (kurtulma hızı, ikinci kozmik hız) denir. Bu hızla fırlatılan cisim giderek yavaşlar ama hızı ancak sonsuz uzaklıkta sıfıra iner; gök cisminin çekimi onu hiçbir zaman geri çeviremez.',
      'Önemli bir ayrıntı: kaçış hızı, itki almadan, yalnızca başlangıç hızıyla yol alan cisimler için tanımlıdır. Motorunu çalıştırmayı sürdüren bir roket, yeterli yakıtı olduğu sürece çok daha düşük hızlarla da uzaklaşabilir. Kaçış hızı bu nedenle bir "hız sınırı" değil, bir enerji ölçüsüdür.',
    ] },
    { h: 'Formül nereden gelir?', p: [
      'Formül enerjinin korunumundan çıkar. Kütlesi m olan cismin yüzeydeki kinetik enerjisi ½ · m · v², kütle çekim potansiyel enerjisi −G · M · m / r\'dir. Cismin tam sınırda kurtulabilmesi için toplam enerjinin sıfır olması gerekir: ½ · m · v² = G · M · m / r. Buradan m sadeleşir ve <strong>v = √(2 · G · M / r)</strong> elde edilir.',
      'Sonuçta fırlatılan cismin kütlesi yer almaz; bir çakıl taşı için de bir uzay aracı için de kaçış hızı aynıdır. Fırlatma yönü de (cisim gezegene çarpmadığı sürece) önemli değildir. Hızı belirleyen yalnızca gök cisminin kütlesi M ile merkezden uzaklık r\'dir. Yüzey çekim ivmesi g biliniyorsa aynı bağıntı v = √(2 · g · r) biçiminde de yazılabilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Dünya:</strong> M = 5,972 × 10²⁴ kg, r = 6371 km = 6,371 × 10⁶ m. v = √(2 × 6,6743 × 10⁻¹¹ × 5,972 × 10²⁴ / 6,371 × 10⁶) ≈ 11 186 m/s, yani yaklaşık 11,2 km/s. Bu, saatte 40 000 kilometrenin biraz üzerinde bir hızdır.',
      '<strong>Ay:</strong> M = 7,342 × 10²² kg, r = 1737,4 km için v ≈ 2,375 km/s bulunur. Dünya\'dakinin yaklaşık beşte biri olan bu değer, Ay\'dan dönüş araçlarının neden çok daha küçük roketlerle kalkabildiğini açıklar.',
      '<strong>Yüzeyden 400 km yukarıda:</strong> Dünya için yükseklik alanına 400 yazıldığında r = 6771 km olur ve kaçış hızı 10,851 km/s\'ye düşer. Aynı yükseklikteki dairesel yörünge hızı 7,672 km/s\'dir; yani alçak yörüngedeki bir aracın Dünya\'dan tümüyle kurtulmak için yaklaşık 3,2 km/s ek hıza ihtiyacı vardır.',
    ] },
    { h: 'Hazır gök cisimleri için sonuçlar', p: [
      'Listedeki cisimler için aracın kullandığı kütle ve ortalama yarıçap değerleriyle bulunan yüzey kaçış hızları şöyledir. Kaynaklarda, kullanılan yarıçapa (ekvator ya da ortalama) göre küçük farklar görülebilir.',
    ], ul: [
      '<strong>Ay:</strong> yaklaşık 2,4 km/s',
      '<strong>Merkür:</strong> yaklaşık 4,2 km/s',
      '<strong>Mars:</strong> yaklaşık 5,0 km/s',
      '<strong>Venüs:</strong> yaklaşık 10,4 km/s',
      '<strong>Dünya:</strong> yaklaşık 11,2 km/s',
      '<strong>Satürn:</strong> yaklaşık 36,1 km/s',
      '<strong>Jüpiter:</strong> yaklaşık 60,2 km/s',
      '<strong>Güneş:</strong> yaklaşık 617,8 km/s',
    ] },
    { h: 'Kaçış hızı ile yörünge hızı arasındaki ilişki', p: [
      'Aynı uzaklıkta dairesel yörüngede kalmak için gereken hız v<sub>yörünge</sub> = √(G · M / r)\'dir. Kaçış hızı bunun tam √2 katı, yani yaklaşık 1,414 katıdır. Dünya yüzeyi için yörünge hızı 7,9 km/s (birinci kozmik hız), kaçış hızı 11,2 km/s\'dir. Bu iki değerin arasındaki hızlarda cisim elips biçiminde bir yörüngeye girer; kaçış hızında yörünge parabole, üstünde hiperbole dönüşür.',
      'Kaçış hızı bir gök cisminin atmosfer tutup tutamayacağını da belirler. Gaz moleküllerinin ısıl hızları kaçış hızına yaklaştıkça gaz zamanla uzaya kaçar. Ay\'ın ve Merkür\'ün kayda değer bir atmosferinin bulunmaması, Jüpiter gibi dev gezegenlerin ise hidrojen ve helyum gibi en hafif gazları bile tutabilmesi bu ilişkiyle açıklanır. Kaçış hızının ışık hızına ulaştığı yarıçap ise kara deliklerin olay ufkunu tanımlar.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap hava direncini, gök cisminin kendi ekseni etrafındaki dönüşünü ve başka gök cisimlerinin çekimini dikkate almaz. Gerçek fırlatmalarda atmosfer sürtünmesi ve yer çekimi kayıpları nedeniyle gereken toplam hız değişimi kuramsal değerden büyüktür; buna karşılık ekvatora yakın yerlerden doğuya doğru fırlatma, Dünya\'nın dönüşünden yaklaşık 0,46 km/s kazandırır. Ayrıca Dünya\'dan kurtulan bir araç hâlâ Güneş\'in çekim alanındadır; Güneş sisteminden çıkmak için ayrı ve daha büyük bir hız gerekir.',
      'Gaz devleri ve Güneş için "yüzey" kesin bir katı sınır değildir; verilen yarıçap alışılmış başvuru değeridir. Sonuçlar eğitim amaçlıdır ve görev planlamasında kullanılacak duyarlılıkta değildir.',
    ] },
  ],
  faq: [
    ['Dünya\'nın kaçış hızı kaçtır?', 'Yüzeyden yaklaşık 11,2 km/s, yani saatte yaklaşık 40 270 kilometredir. Bu değer hava direnci ve Dünya\'nın dönüşü hesaba katılmadan bulunan kuramsal değerdir.'],
    ['Kaçış hızı fırlatılan cismin kütlesine bağlı mıdır?', 'Hayır. Formülde yalnızca gök cisminin kütlesi ve merkezden uzaklık yer alır. Ancak ağır bir cismi bu hıza ulaştırmak için gereken enerji, kütlesiyle doğru orantılı olarak daha fazladır.'],
    ['Roketler kaçış hızına ulaşmak zorunda mıdır?', 'Hayır. Kaçış hızı itkisiz, serbest hareket eden cisimler için geçerlidir. Motoru çalışan bir roket daha düşük hızla da yükselebilir; ancak motor durduğu anda bulunduğu uzaklıktaki kaçış hızının altındaysa çekime bağlı kalır.'],
    ['Yükseldikçe kaçış hızı değişir mi?', 'Evet, azalır. Hız, merkezden uzaklığın kareköküyle ters orantılıdır. Dünya yüzeyinde 11,19 km/s olan değer 400 km yükseklikte 10,85 km/s\'ye iner. Yükseklik alanını kullanarak istediğiniz irtifadaki değeri bulabilirsiniz.'],
    ['Kaçış hızı ile yörünge hızı aynı şey midir?', 'Hayır. Dairesel yörünge hızı cismin gök cismi çevresinde dönmeye devam etmesini sağlar; kaçış hızı ise tümüyle uzaklaşmasını. Aynı uzaklıkta kaçış hızı, yörünge hızının √2 (yaklaşık 1,414) katıdır.'],
    ['Kendi gezegenimi nasıl hesaplarım?', '"Özel değer gireceğim" seçeneğini işaretleyin, kütleyi kilogram ve yarıçapı kilometre olarak yazın. Örneğin 1 × 10²² kg kütleli ve 1000 km yarıçaplı bir cisim için kaçış hızı yaklaşık 1,155 km/s çıkar.'],
    ['Kara deliklerde kaçış hızı ne olur?', 'Olay ufku denilen sınırda kaçış hızı ışık hızına eşitlenir; bu sınırın içinden ışık bile çıkamaz. Bu ölçekte Newton formülü yalnızca kaba bir fikir verir, doğru betimleme genel görelilik gerektirir. Araç, sonuç ışık hızına yaklaştığında uyarı notu gösterir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; seçimleriniz ve yazdığınız sayılar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['yorunge-periyodu-hesapla', 'kutle-cekim-kuvveti-hesapla', 'gezegen-agirligi-hesapla', 'kinetik-enerji-hesapla', 'serbest-dusme-hesapla'],
};
