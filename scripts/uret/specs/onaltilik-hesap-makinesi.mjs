export default {
  slug: 'onaltilik-hesap-makinesi',
  title: 'Onaltılık Hesap Makinesi',
  h1Tail: 'hex dört işlem ve bit işlemleri',
  pageTitle: 'Onaltılık Hesap Makinesi – Hex Toplama, Çıkarma, Çarpma, Bölme',
  description: 'İki onaltılık (hex) sayıyı toplayın, çıkarın, çarpın, bölün ya da AND, OR, XOR işlemine sokun. Sonuç hex, ondalık ve ikili olarak birlikte gösterilir.',
  card: 'İki hex sayıyla toplama, çıkarma, çarpma, bölme ve AND, OR, XOR yapın; sonucu hex, ondalık ve ikili görün.',
  category: 'matematik',
  keywords: ['hex hesap makinesi', 'onaltılık toplama', 'hex toplama', 'hex çıkarma', 'onaltılık çarpma', 'hex calculator', 'hex and or xor', '16lık tabanda işlem'],
  lead: `İki onaltılık (hex) sayıyı yazıp işlemi seçin. Araç <strong>toplama, çıkarma, çarpma, bölme</strong> ile bit düzeyindeki <strong>AND, OR ve XOR</strong> işlemlerini yapar; sonucu onaltılık, ondalık ve ikili olarak yan yana gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'birinci', label: 'Birinci hex sayı', type: 'text', placeholder: 'Örn. 1A3' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['topla', 'Toplama (+)'], ['cikar', 'Çıkarma (−)'], ['carp', 'Çarpma (×)'], ['bol', 'Bölme (÷)'], ['and', 'AND (ve)'], ['or', 'OR (veya)'], ['xor', 'XOR (özel veya)']] },
    { id: 'ikinci', label: 'İkinci hex sayı', type: 'text', placeholder: 'Örn. 2F' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/^(0x|#)/i, '');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      if (!/^[0-9a-f]+$/i.test(t)) h.err(`"${ad}" yalnızca 0–9 rakamları ve A–F harflerinden oluşmalı; diğer karakterleri silin.`);
      if (t.length > 32) h.err(`"${ad}" en fazla 32 onaltılık basamak olabilir.`);
      return BigInt('0x' + t);
    };
    const a = oku(v.birinci, 'Birinci hex sayı');
    const b = oku(v.ikinci, 'İkinci hex sayı');
    const yaz = (x, taban) => (x < 0n ? '-' + (-x).toString(taban) : x.toString(taban)).toUpperCase();
    const dec = (x) => x.toLocaleString('tr-TR');
    let sonuc, kalan = null, simge;
    switch (v.islem) {
      case 'cikar': sonuc = a - b; simge = '−'; break;
      case 'carp': sonuc = a * b; simge = '×'; break;
      case 'bol':
        if (b === 0n) h.err('Sıfıra bölme tanımsızdır; ikinci sayıyı sıfırdan farklı yazın.');
        sonuc = a / b; kalan = a % b; simge = '÷'; break;
      case 'and': sonuc = a & b; simge = 'AND'; break;
      case 'or': sonuc = a | b; simge = 'OR'; break;
      case 'xor': sonuc = a ^ b; simge = 'XOR'; break;
      default: sonuc = a + b; simge = '+';
    }
    const rows = [[kalan === null ? 'Sonuç (hex)' : 'Bölüm (hex)', yaz(sonuc, 16)]];
    if (kalan !== null) rows.push(['Kalan (hex)', yaz(kalan, 16)]);
    rows.push(['Sonucun ondalık karşılığı', dec(sonuc)]);
    rows.push(['Sonucun ikili karşılığı', yaz(sonuc, 2)]);
    rows.push(['Ondalık sağlama', `${dec(a)} ${simge} ${dec(b)} = ${dec(sonuc)}` + (kalan !== null ? `, kalan ${dec(kalan)}` : '')]);
    return {
      rows,
      note: kalan !== null ? 'Bölme tam sayı bölmesidir: bölüm ve kalan ayrı ayrı verilir.' : 'Negatif sonuçlar başında eksi işaretiyle gösterilir; ikiye tümleyen biçimi kullanılmaz.',
    };
  },
  cases: [
    { in: { birinci: 'FF', islem: 'topla', ikinci: '1' }, out: { 'Sonuç (hex)': '100', 'Sonucun ondalık karşılığı': '256', 'Ondalık sağlama': '255 + 1 = 256' } },
    { in: { birinci: 'A', islem: 'carp', ikinci: 'B' }, out: { 'Sonuç (hex)': '6E', 'Sonucun ondalık karşılığı': '110', 'Sonucun ikili karşılığı': '1101110' } },
    { in: { birinci: '1A3', islem: 'topla', ikinci: '2F' }, out: { 'Sonuç (hex)': '1D2', 'Sonucun ondalık karşılığı': '466' } },
    { in: { birinci: '5C', islem: 'cikar', ikinci: '2F' }, out: { 'Sonuç (hex)': '2D', 'Ondalık sağlama': '92 − 47 = 45' } },
    { in: { birinci: 'ff', islem: 'bol', ikinci: '10' }, out: { 'Bölüm (hex)': 'F', 'Kalan (hex)': 'F', 'Ondalık sağlama': '255 ÷ 16 = 15, kalan 15' } },
    { in: { birinci: 'F0', islem: 'and', ikinci: '3C' }, out: { 'Sonuç (hex)': '30', 'Sonucun ikili karşılığı': '110000' } },
    { in: { birinci: 'F0', islem: 'or', ikinci: '0F' }, out: { 'Sonuç (hex)': 'FF' } },
    { in: { birinci: 'FF', islem: 'xor', ikinci: '0F' }, out: { 'Sonuç (hex)': 'F0', 'Sonucun ondalık karşılığı': '240' } },
    { in: { birinci: '1', islem: 'cikar', ikinci: '2' }, out: { 'Sonuç (hex)': '-1' } },
    { in: { birinci: 'FFFF', islem: 'carp', ikinci: 'FFFF' }, out: { 'Sonuç (hex)': 'FFFE0001', 'Sonucun ondalık karşılığı': '4.294.836.225' } },
    { in: { birinci: '0x1000', islem: 'topla', ikinci: '0x2A0' }, out: { 'Sonuç (hex)': '12A0' } },
    { in: { birinci: 'FF', islem: 'bol', ikinci: '0' }, error: true },
    { in: { birinci: 'XYZ', islem: 'topla', ikinci: '1' }, error: true },
    { in: { birinci: '', islem: 'topla', ikinci: '1' }, error: true },
  ],
  howto: [
    `"Birinci hex sayı" alanına ilk değeri yazın. Büyük ya da küçük harf kullanabilir, başına <code>0x</code> ön eki koyabilirsiniz.`,
    `"İşlem" listesinden dört işlemden birini ya da AND, OR, XOR bit işlemlerinden birini seçin.`,
    `"İkinci hex sayı" alanına ikinci değeri yazın. Bölmede bu sayı bölendir ve sıfır olamaz.`,
    `"Hesapla" düğmesine basın. Sonuç onaltılık, ondalık ve ikili olarak; işlemin ondalık sağlamasıyla birlikte görünür.`,
  ],
  sections: [
    { h: 'Onaltılık toplama nasıl yapılır?', p: [
      `Onaltılık toplama, ondalık toplamayla aynı mantıkta sağdan sola yapılır; yalnızca elde 10'da değil <strong>16'da</strong> oluşur. Bir basamaktaki toplam 15'i aşarsa toplamdan 16 çıkarılır, kalan o basamağa yazılır ve sola 1 elde aktarılır. Harflerin değerlerini akılda tutmak gerekir: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.`,
      `<strong>Örnek:</strong> 1A3 + 2F işlemini yapalım. En sağda 3 + F = 3 + 15 = 18 eder; 18 − 16 = 2 yazılır, elde 1. Ortada A + 2 + elde 1 = 10 + 2 + 1 = 13, yani D yazılır; elde yok. Solda 1 aynen iner. Sonuç <strong>1D2</strong>'dir. Ondalık sağlama: 419 + 47 = 466 ve 1D2 gerçekten 256 + 208 + 2 = 466 eder.`,
      `En bilinen elde örneği FF + 1'dir: F + 1 = 16 olduğundan 0 yazılır ve elde 1 taşınır; ikinci basamakta yine F + 1 = 16 oluşur. Sonuç <strong>100</strong>, yani ondalık 256'dır.`,
    ] },
    { h: 'Onaltılık çıkarma', p: [
      `Çıkarmada üstteki basamak alttakinden küçükse soldaki basamaktan ödünç alınır ve ödünç alınan değer 16'dır. <strong>Örnek:</strong> 5C − 2F işleminde C (12) değerinden F (15) çıkarılamaz; soldan 16 ödünç alınır, 12 + 16 = 28 ve 28 − 15 = 13, yani D yazılır. Soldaki 5 ödünç verdiği için 4'e düşmüştür; 4 − 2 = 2. Sonuç <strong>2D</strong> olur; ondalıkta 92 − 47 = 45.`,
      `Küçük sayıdan büyük sayı çıkarıldığında araç sonucu eksi işaretiyle yazar. Sabit genişlikli bilgisayar yazmaçlarında aynı işlem taşarak FFFF… gibi bir değere döner; bu sayfa ise matematiksel sonucu gösterir.`,
    ] },
    { h: 'Çarpma ve bölme', p: [
      `Onaltılık çarpma tablosunu ezbere bilen pek azdır; pratik yol, basamakları ondalık değerleriyle çarpıp sonucu yeniden 16'lık tabana çevirmektir. <strong>Örnek:</strong> A × B = 10 × 11 = 110. 110 ÷ 16 = 6 kalan 14 olduğundan sonuç <strong>6E</strong>'dir. Bir sayıyı 10 (onaltılık) ile, yani 16 ile çarpmak sonuna bir sıfır eklemek demektir: 2F × 10 = 2F0.`,
      `Bölme tam sayı bölmesi olarak yapılır; bölüm ve kalan ayrı satırlarda verilir. FF ÷ 10 işleminde 255 ÷ 16 = 15 kalan 15 olduğundan bölüm <strong>F</strong>, kalan da <strong>F</strong>'dir. Dikkat ederseniz 16'ya bölmek, sayının son basamağını kalan olarak ayırıp geri kalanını bölüm yapmakla aynıdır.`,
    ] },
    { h: 'AND, OR ve XOR bit işlemleri', p: [
      `Bit işlemleri, iki sayının ikili yazımlarını basamak basamak karşılaştırır. <strong>AND</strong> yalnızca iki bit de 1 ise 1 verir; <strong>OR</strong> bitlerden en az biri 1 ise 1 verir; <strong>XOR</strong> ise bitler birbirinden farklıysa 1 verir. Onaltılık yazım bu işlemler için çok uygundur, çünkü her basamak dört biti temsil eder ve işlem basamak basamak düşünülebilir.`,
      `<strong>Örnek:</strong> F0 AND 3C işleminde F0 = 11110000, 3C = 00111100'dır. Yalnızca her iki sayıda da 1 olan bitler kalır: 00110000, yani <strong>30</strong>. F0 OR 0F işleminde bütün bitler 1 olur ve sonuç <strong>FF</strong> çıkar. FF XOR 0F işleminde alt dört bit ters çevrilir, üst dört bit olduğu gibi kalır; sonuç <strong>F0</strong>'dır.`,
      `Bu işlemlerin tipik kullanımı maskelemedir. Bir değerin yalnızca alt baytını almak için FF ile AND yapılır; belirli bir biti açmak için OR, bir biti tersine çevirmek için XOR kullanılır. Altı haneli bir renk kodundan yeşil bileşeni ayırmak için kod 00FF00 ile AND işlemine sokulur.`,
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      `<strong>Bellek adresleri:</strong> Bir taban adrese uzaklık eklemek; örneğin 1000 + 2A0 = 12A0.`,
      `<strong>Gömülü sistemler:</strong> Yazmaç değerlerinde bit maskesi hazırlamak ve kontrol etmek.`,
      `<strong>Renk hesapları:</strong> İki renk kodunun bileşenlerini toplamak ya da maskeyle ayırmak.`,
      `<strong>Ağ ve donanım kimlikleri:</strong> Onaltılık yazılan adres aralıklarının büyüklüğünü çıkarma ile bulmak.`,
      `<strong>Dersler ve sınavlar:</strong> Sayısal mantık ve bilgisayar mimarisi alıştırmalarının sonucunu doğrulamak.`,
    ] },
    { h: 'Sınırlar ve ipuçları', p: [
      `Her sayı en fazla 32 onaltılık basamak (128 bit) olabilir. Girdiler işaretsiz tam sayıdır; eksi işaretli ya da kesirli onaltılık değer kabul edilmez. Hesap tam sayı aritmetiğiyle yapıldığından büyük çarpımlarda bile yuvarlama olmaz: FFFF × FFFF işleminin sonucu tam olarak FFFE0001'dir.`,
      `Sık yapılan bir hata, onaltılık 10 değerini on sanmaktır; onaltılık 10 on altıdır. Bir diğer hata, toplamda 9'u aşan değeri ondalıktaki gibi elde saymaktır: 7 + 5 onaltılıkta 12 değil C'dir, elde ancak toplam 16'ya ulaştığında oluşur. Emin olamadığınızda sonuç kutusundaki ondalık sağlama satırına bakın.`,
    ] },
  ],
  faq: [
    ['Hex toplama nasıl yapılır?', 'Basamaklar sağdan sola toplanır. Bir basamaktaki toplam 16 ya da daha fazlaysa 16 çıkarılıp kalan yazılır ve sola 1 elde taşınır. 1A3 + 2F işleminin sonucu 1D2\'dir.'],
    ['FF + 1 neden 100 eder?', 'F en büyük onaltılık rakamdır. F + 1 = 16 olduğunda basamağa 0 yazılıp elde taşınır; bu iki basamakta da gerçekleşir ve sonuç 100 olur. Ondalık karşılığı 255 + 1 = 256\'dır.'],
    ['Onaltılık 10 ile ondalık 10 aynı mı?', 'Hayır. Onaltılık 10, ondalık 16\'ya eşittir. Ondalık 10\'un onaltılık yazımı ise A\'dır. Karışıklığı önlemek için onaltılık sayılar çoğunlukla 0x ön ekiyle yazılır.'],
    ['AND, OR ve XOR ne işe yarar?', 'İki sayının bitlerini karşılaştıran işlemlerdir. AND bitleri süzmek (maskelemek), OR bitleri açmak, XOR ise bitleri tersine çevirmek ve iki değerin hangi bitlerde farklılaştığını bulmak için kullanılır.'],
    ['Bölme sonucunda kesir çıkar mı?', 'Hayır. Araç tam sayı bölmesi yapar; bölüm ve kalan ayrı satırlarda gösterilir. FF ÷ 10 için bölüm F, kalan F\'dir.'],
    ['Küçük harfle yazabilir miyim?', 'Evet. ff ile FF aynı kabul edilir; sonuç her zaman büyük harfle yazılır. Başa eklenen 0x ön eki ve aradaki boşluklar da sorun oluşturmaz.'],
    ['Sonuç negatif olursa ne görürüm?', 'Başında eksi işareti bulunan bir onaltılık sayı görürsünüz; örneğin 1 − 2 = −1. Belirli bir bit genişliğindeki ikiye tümleyen karşılığı bu araçta hesaplanmaz.'],
    ['Girdiğim değerler bir sunucuya gönderiliyor mu?', 'Hayır. Bütün işlemler tarayıcınızda yapılır; yazdığınız sayılar hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['onaltilik-ondalik-cevir', 'ikili-sayi-islem', 'sayi-tabani-donustur', 'ikili-ondalik-cevir', 'hesap-makinesi'],
};
