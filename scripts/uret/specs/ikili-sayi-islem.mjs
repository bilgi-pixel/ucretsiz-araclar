export default {
  slug: 'ikili-sayi-islem',
  title: 'İkili Sayılarla Dört İşlem',
  h1Tail: 'binary toplama, çıkarma, çarpma, bölme',
  pageTitle: 'İkili Sayılarla Dört İşlem – Binary Toplama, Çıkarma, Çarpma',
  description: 'İki ikili (binary) sayıyı toplayın, çıkarın, çarpın ya da bölün. Sonucu ikili ve ondalık olarak, bölmede kalanıyla ve ondalık sağlamasıyla birlikte görün.',
  card: 'İki binary sayıyı toplayın, çıkarın, çarpın ya da bölün; sonucu ikili ve ondalık sağlamasıyla birlikte görün.',
  category: 'matematik',
  keywords: ['ikili sayılarda toplama', 'binary toplama', 'binary çıkarma', 'ikili sayılarda çarpma', 'binary bölme', 'ikili sayı hesap makinesi', '2lik tabanda dört işlem', 'binary calculator'],
  lead: `0 ve 1'lerden oluşan iki ikili sayıyı yazın, işlemi seçin; araç <strong>toplama, çıkarma, çarpma ve bölme</strong> sonucunu ikili olarak verir. Aynı işlemin ondalık karşılığı da gösterildiği için elle yaptığınız çözümü kolayca sağlayabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'birinci', label: 'Birinci ikili sayı', type: 'text', placeholder: 'Örn. 1010' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['topla', 'Toplama (+)'], ['cikar', 'Çıkarma (−)'], ['carp', 'Çarpma (×)'], ['bol', 'Bölme (÷)']] },
    { id: 'ikinci', label: 'İkinci ikili sayı', type: 'text', placeholder: 'Örn. 11' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/^0b/i, '');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      if (!/^[01]+$/.test(t)) h.err(`"${ad}" yalnızca 0 ve 1 rakamlarından oluşmalı; diğer karakterleri silin.`);
      if (t.length > 128) h.err(`"${ad}" en fazla 128 bit olabilir.`);
      return BigInt('0b' + t);
    };
    const a = oku(v.birinci, 'Birinci ikili sayı');
    const b = oku(v.ikinci, 'İkinci ikili sayı');
    const bin = (x) => (x < 0n ? '-' + (-x).toString(2) : x.toString(2));
    const dec = (x) => x.toLocaleString('tr-TR');
    let sonuc, kalan = null, simge;
    if (v.islem === 'cikar') { sonuc = a - b; simge = '−'; }
    else if (v.islem === 'carp') { sonuc = a * b; simge = '×'; }
    else if (v.islem === 'bol') {
      if (b === 0n) h.err('Sıfıra bölme tanımsızdır; ikinci sayıyı sıfırdan farklı yazın.');
      sonuc = a / b; kalan = a % b; simge = '÷';
    } else { sonuc = a + b; simge = '+'; }
    const rows = [[kalan === null ? 'Sonuç (ikili)' : 'Bölüm (ikili)', bin(sonuc)]];
    if (kalan !== null) rows.push(['Kalan (ikili)', bin(kalan)]);
    rows.push(['Sonucun ondalık karşılığı', dec(sonuc)]);
    rows.push(['Ondalık sağlama', `${dec(a)} ${simge} ${dec(b)} = ${dec(sonuc)}` + (kalan !== null ? `, kalan ${dec(kalan)}` : '')]);
    rows.push(['Sonucun bit sayısı', String((sonuc < 0n ? -sonuc : sonuc).toString(2).length)]);
    return {
      rows,
      note: kalan !== null ? 'Bölme tam sayı bölmesidir: bölüm ve kalan ayrı ayrı verilir.' : 'Negatif sonuçlar başında eksi işaretiyle gösterilir; ikiye tümleyen biçimi kullanılmaz.',
    };
  },
  cases: [
    { in: { birinci: '1010', islem: 'topla', ikinci: '11' }, out: { 'Sonuç (ikili)': '1101', 'Sonucun ondalık karşılığı': '13', 'Ondalık sağlama': '10 + 3 = 13' } },
    { in: { birinci: '1010', islem: 'cikar', ikinci: '11' }, out: { 'Sonuç (ikili)': '111', 'Sonucun ondalık karşılığı': '7' } },
    { in: { birinci: '101', islem: 'carp', ikinci: '11' }, out: { 'Sonuç (ikili)': '1111', 'Ondalık sağlama': '5 × 3 = 15' } },
    { in: { birinci: '1100', islem: 'bol', ikinci: '11' }, out: { 'Bölüm (ikili)': '100', 'Kalan (ikili)': '0' } },
    { in: { birinci: '1101', islem: 'bol', ikinci: '10' }, out: { 'Bölüm (ikili)': '110', 'Kalan (ikili)': '1', 'Ondalık sağlama': '13 ÷ 2 = 6, kalan 1' } },
    { in: { birinci: '11', islem: 'cikar', ikinci: '1010' }, out: { 'Sonuç (ikili)': '-111', 'Sonucun ondalık karşılığı': '-7' } },
    { in: { birinci: '1111', islem: 'topla', ikinci: '1' }, out: { 'Sonuç (ikili)': '10000', 'Sonucun bit sayısı': '5' } },
    { in: { birinci: '1011', islem: 'topla', ikinci: '110' }, out: { 'Sonuç (ikili)': '10001' } },
    { in: { birinci: '1101', islem: 'carp', ikinci: '101' }, out: { 'Sonuç (ikili)': '1000001', 'Sonucun ondalık karşılığı': '65' } },
    { in: { birinci: '1010', islem: 'bol', ikinci: '0' }, error: true },
    { in: { birinci: '1021', islem: 'topla', ikinci: '11' }, error: true },
    { in: { birinci: '101', islem: 'topla', ikinci: '' }, error: true },
  ],
  howto: [
    `"Birinci ikili sayı" alanına ilk sayıyı yalnızca 0 ve 1 kullanarak yazın. Okumayı kolaylaştırmak için araya boşluk koyabilirsiniz.`,
    `"İşlem" listesinden toplama, çıkarma, çarpma ya da bölmeyi seçin.`,
    `"İkinci ikili sayı" alanına ikinci sayıyı yazın. Bölmede bu sayı bölendir ve sıfır olamaz.`,
    `"Hesapla" düğmesine basın. İkili sonuç, ondalık karşılığı ve işlemin ondalık sağlaması birlikte listelenir; bölmede kalan ayrı satırda yer alır.`,
  ],
  sections: [
    { h: 'İkili toplama kuralları', p: [
      `İkili sistemde toplama, ondalıktaki gibi sağdan sola basamak basamak yapılır; tek fark, elde değerinin 10'da değil 2'de oluşmasıdır. Dört temel kural vardır: <strong>0 + 0 = 0</strong>, <strong>0 + 1 = 1</strong>, <strong>1 + 0 = 1</strong> ve <strong>1 + 1 = 10</strong>. Son kuralda basamağa 0 yazılır ve bir sonraki basamağa 1 elde aktarılır. Eldeyle birlikte üç tane 1 toplanırsa sonuç 11 olur: basamağa 1 yazılır, elde yine 1'dir.`,
      `<strong>Örnek:</strong> 1010 + 11 işlemini yapalım. Sayıları sağa yaslayıp 1010 ve 0011 olarak alt alta yazarız. En sağda 0 + 1 = 1. İkinci basamakta 1 + 1 = 10; 0 yazar, 1 elde alırız. Üçüncü basamakta 0 + 0 + elde 1 = 1. Dördüncü basamakta 1 + 0 = 1. Sonuç <strong>1101</strong> olur. Ondalık sağlaması 10 + 3 = 13'tür ve 1101 gerçekten 8 + 4 + 1 = 13 eder.`,
      `Elde zincirinin en güzel örneği 1111 + 1 işlemidir: her basamakta 1 + 1 = 10 oluşur, elde en sola kadar taşınır ve sonuç <strong>10000</strong> çıkar. Dört bitlik bir sayı böylece beş bite uzar; sabit uzunluklu bilgisayar belleğinde bu duruma taşma denir.`,
    ] },
    { h: 'İkili çıkarma ve ödünç alma', p: [
      `Çıkarmada kurallar şöyledir: 0 − 0 = 0, 1 − 0 = 1, 1 − 1 = 0. Zor olan 0 − 1 durumudur: soldaki basamaktan ödünç alınır, bulunduğumuz basamak 10 (yani iki) olur ve 10 − 1 = 1 yazılır. Soldaki basamak 0 ise ödünç, ilk 1'e rastlanana kadar sola doğru zincirlenir.`,
      `<strong>Örnek:</strong> 1010 − 11 işleminde en sağda 0 − 1 yapılamaz; soldaki 1'den ödünç alırız, 10 − 1 = 1. İkinci basamak ödünç verdiği için 0 kalmıştır ve 0 − 1 için yine soldan ödünç gerekir; üçüncü basamak 0 olduğundan ödünç dördüncü basamaktan gelir. Sonuçta <strong>111</strong> elde edilir; ondalıkta 10 − 3 = 7. Küçük sayıdan büyük sayı çıkarıldığında araç sonucu eksi işaretiyle yazar: 11 − 1010 = −111.`,
    ] },
    { h: 'İkili çarpma: kaydır ve topla', p: [
      `İkili çarpma, ondalık çarpmadan daha kolaydır; çünkü çarpım tablosu yalnızca 0 ve 1'den oluşur. Çarpanın her basamağı için iki olasılık vardır: basamak 1 ise çarpılan sayı aynen yazılır, 0 ise sıfır satırı yazılır. Her satır bir öncekine göre bir basamak sola kaydırılır ve satırlar toplanır.`,
      `<strong>Örnek:</strong> 101 × 11 işleminde çarpanın sağdaki 1'i için 101, soldaki 1'i için bir basamak kaydırılmış 1010 yazılır. 101 + 1010 = <strong>1111</strong>. Ondalık sağlama: 5 × 3 = 15. Bir başka örnek: 1101 × 101 işleminde 1101 ile iki basamak kaydırılmış 110100 toplanır ve <strong>1000001</strong> bulunur; ondalıkta 13 × 5 = 65.`,
      `Bu yöntemin kullanışlı bir sonucu vardır: bir ikili sayının sonuna 0 eklemek onu 2 ile, iki tane 0 eklemek 4 ile çarpar. İşlemcilerdeki "sola kaydırma" işlemi tam olarak budur.`,
    ] },
    { h: 'İkili bölme', p: [
      `İkili bölme, okulda öğrenilen uzun bölmenin aynısıdır; üstelik her adımda bölümün basamağı yalnızca 0 ya da 1 olabilir. Bölünenin solundan başlayarak bölenin sığdığı en kısa parça alınır; sığıyorsa bölüme 1 yazılıp bölen çıkarılır, sığmıyorsa 0 yazılıp bir basamak daha indirilir.`,
      `<strong>Örnek:</strong> 1100 ÷ 11 işleminde ilk iki basamak 11'dir ve bölen bir kez sığar; bölüme 1 yazılır, kalan 0 olur. İndirilen iki sıfır için bölüme iki tane 0 eklenir. Sonuç <strong>100</strong>, kalan 0'dır; ondalıkta 12 ÷ 3 = 4. Kalanlı bir örnek: 1101 ÷ 10 işleminin bölümü <strong>110</strong>, kalanı <strong>1</strong>'dir; yani 13 ÷ 2 = 6, kalan 1. Araç bölmede ondalık kesir üretmez; bölüm ve kalanı ayrı ayrı verir.`,
    ] },
    { h: 'Kimler için yararlı?', ul: [
      `<strong>Lise ve üniversite öğrencileri:</strong> Bilişim teknolojileri, sayısal tasarım ve mantık devreleri derslerindeki alıştırmaların sonucunu kontrol etmek.`,
      `<strong>Programlamaya yeni başlayanlar:</strong> Bit düzeyindeki işlemlerin ve kaydırmanın sayılar üzerindeki etkisini görmek.`,
      `<strong>Elektronikle uğraşanlar:</strong> Toplayıcı devre tasarlarken beklenen çıkışı önceden hesaplamak.`,
      `<strong>Sınava hazırlananlar:</strong> Elle çözülen işlemin her adımını ondalık sağlama satırıyla doğrulamak.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Elle yapılan işlemlerde en sık hata, sayıları sağa yaslamadan alt alta yazmaktır; basamaklar kaydığında bütün sonuç bozulur. İkinci hata 1 + 1 işleminde eldeyi unutmak, üçüncüsü ise çıkarmada ödünç zincirini yarıda bırakmaktır. Şüpheye düştüğünüzde iki sayıyı ondalığa çevirip işlemi ondalık yaparak sonucu karşılaştırın; araçtaki sağlama satırı tam olarak bunu gösterir.`,
      `Araç işaretsiz tam sayılarla çalışır; her sayı en fazla 128 bit olabilir. Girdi olarak eksi işaretli ya da kesirli ikili sayı kabul edilmez. Çıkarmanın negatif sonucu eksi işaretiyle yazılır, ikiye tümleyen gösterimine çevrilmez. Hesap tam sayı aritmetiğiyle yapıldığı için büyük sayılarda da yuvarlama hatası oluşmaz.`,
    ] },
  ],
  faq: [
    ['İkili sistemde 1 + 1 kaç eder?', '10 eder; yani ondalık 2. Basamağa 0 yazılır ve bir sonraki basamağa 1 elde aktarılır. 1 + 1 + 1 ise 11, yani ondalık 3\'tür.'],
    ['Binary toplama nasıl yapılır?', 'Sayılar sağa yaslanarak alt alta yazılır ve sağdan sola toplanır. Bir basamaktaki toplam 2 ya da 3 olduğunda basamağa sırasıyla 0 ya da 1 yazılıp sola 1 elde taşınır. 1011 + 110 işleminin sonucu 10001\'dir.'],
    ['İkili çıkarmada ödünç alma nasıl olur?', '0\'dan 1 çıkarılacağında soldaki ilk 1\'den ödünç alınır. Ödünç alınan basamak 0\'a düşer, bulunduğunuz basamak ikiye yükselir ve 10 − 1 = 1 yazılır. Arada 0\'lar varsa onlar 1\'e dönüşür.'],
    ['Sonuç negatif çıkarsa nasıl gösterilir?', 'Başında eksi işaretiyle gösterilir: 11 − 1010 = −111. Bilgisayarların kullandığı ikiye tümleyen biçimi bit uzunluğuna bağlı olduğu için araç bu gösterimi üretmez.'],
    ['Bölme sonucu neden virgüllü değil?', 'Araç tam sayı bölmesi yapar ve bölüm ile kalanı ayrı satırlarda verir. 1101 ÷ 10 için bölüm 110, kalan 1\'dir. Bu biçim, elle yapılan uzun bölmenin sonucuyla birebir örtüşür.'],
    ['Farklı uzunluktaki iki sayıyla işlem yapabilir miyim?', 'Evet. Kısa sayının başına sıfır eklenmiş gibi düşünülür; 1010 + 11 işlemi 1010 + 0011 olarak hesaplanır. Baştaki sıfırları kendiniz yazmanıza gerek yoktur.'],
    ['İkili sayıyı 2 ile çarpmanın kısa yolu var mı?', 'Evet, sayının sonuna bir 0 eklemek yeterlidir: 101 (5) sayısı 1010 (10) olur. Sondaki 0\'ı silmek ise sayıyı 2\'ye böler.'],
    ['Yazdığım sayılar saklanıyor mu?', 'Hayır. İşlem yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['ikili-ondalik-cevir', 'onaltilik-hesap-makinesi', 'sayi-tabani-donustur', 'onaltilik-ondalik-cevir', 'hesap-makinesi'],
};
