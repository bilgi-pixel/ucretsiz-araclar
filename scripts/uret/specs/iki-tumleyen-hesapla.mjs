export default {
  slug: 'iki-tumleyen-hesapla',
  title: 'İkiye Tümleyen Hesaplama',
  h1Tail: 'negatif sayıların ikili gösterimi',
  pageTitle: 'İkiye Tümleyen Hesaplama – Negatif Sayının İkili Gösterimi',
  description: 'Ondalık bir tam sayının 8, 16, 32 ya da 64 bit ikiye tümleyen gösterimini adım adım bulun ya da ikili diziyi işaretli ondalık değere çevirin.',
  card: 'Negatif ya da pozitif tam sayının ikiye tümleyen gösterimini adım adım bulun; ikiliden işaretli ondalığa da çevirin.',
  category: 'gelistirici',
  keywords: ['ikiye tümleyen hesaplama', '2\'ye tümleyen', 'two\'s complement hesaplama', 'negatif sayı ikili gösterim', 'bire tümleyen', 'işaretli ikili sayı çevirme', 'ikiye tümleyen ondalık çevirme', '-5 ikili gösterimi'],
  lead: 'Bir tam sayıyı yazın; araç bu sayının seçtiğiniz bit genişliğindeki <strong>ikiye tümleyen</strong> gösterimini, negatif sayılarda "ters çevir ve 1 ekle" adımlarını tek tek göstererek üretir. Ters yönde, ikili ya da onaltılık bir bit dizisinin hangi işaretli sayıya karşılık geldiğini de bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Sayı ya da bit dizisi', type: 'text', placeholder: 'Örn. -5 ya da 11111011' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ondalik', 'Ondalık sayı → İkiye tümleyen'], ['ikili', 'İkili / onaltılık dizi → Ondalık']] },
    { id: 'genislik', label: 'Bit genişliği', type: 'select', options: [['8', '8 bit'], ['16', '16 bit'], ['32', '32 bit'], ['64', '64 bit']] },
  ],
  compute(v, h) {
    const w = [8, 16, 32, 64].includes(Number(v.genislik)) ? Number(v.genislik) : 8;
    const W = BigInt(w);
    const mod = 1n << W;
    const yari = mod >> 1n;
    const maske = mod - 1n;
    const iki = (x) => x.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const on6 = (x) => '0x' + x.toString(16).toUpperCase().padStart(w / 4, '0');
    const bin = (x) => (x < 0n ? '-' : '') + (x < 0n ? -x : x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Sayı ya da bit dizisi" alanını doldurun.');
    let bits; // işaretsiz gösterim
    if (v.yon === 'ikili') {
      const t = ham.replace(/[\s_]/g, '');
      if (/^0[xX][0-9a-fA-F]+$/.test(t)) {
        if (t.length - 2 > w / 4) h.err(`Onaltılık dizi ${w} bit için en fazla ${w / 4} hane olabilir.`);
        bits = BigInt(t);
      } else {
        const b = t.replace(/^0[bB]/, '');
        if (!/^[01]+$/.test(b)) h.err('İkili dizi yalnızca 0 ve 1 içerebilir. Onaltılık yazacaksanız başına 0x ekleyin.');
        if (b.length !== w) h.err(`${w} bit genişlik için tam ${w} hane yazın (${b.length} hane yazdınız). Kısa diziyi işaret bitiyle soldan tamamlayın ya da uygun genişliği seçin.`);
        bits = BigInt('0b' + b);
      }
    } else {
      const t = ham.replace(/\s/g, '').replace(/−/g, '-');
      if (!/^[-+]?\d+$/.test(t)) h.err('Ondalık yönde yalnızca tam sayı yazın (örn. -42). Kesirli sayıların ikiye tümleyen gösterimi yoktur.');
      if (t.length > 40) h.err('Sayı çok uzun.');
      const x = BigInt(t);
      if (x < -yari || x > yari - 1n) h.err(`${bin(x)} sayısı ${w} bit işaretli aralığa sığmıyor (${bin(-yari)} ile ${bin(yari - 1n)} arası). Daha büyük bir bit genişliği seçin.`);
      bits = x & maske;
    }
    const negatif = bits >= yari;
    const deger = negatif ? bits - mod : bits;
    const tersIsaret = (mod - bits) & maske;
    const tersMetin = deger === -yari ? `${iki(tersIsaret)} (taşma: ${bin(yari)} bu genişliğe sığmaz)` : `${iki(tersIsaret)} (${bin(-deger)})`;
    const rows = [];
    if (v.yon === 'ikili') {
      rows.push(['İşaretli ondalık değer', bin(deger)]);
      rows.push(['İkili gösterim', iki(bits)]);
    } else {
      rows.push(['İkiye tümleyen (ikili)', iki(bits)]);
      rows.push(['İşaretli ondalık değer', bin(deger)]);
    }
    rows.push(['Onaltılık', on6(bits)]);
    rows.push(['İşaretsiz yorum', bin(bits)]);
    rows.push(['İşaret biti', negatif ? '1 (negatif)' : '0 (sıfır ya da pozitif)']);
    if (negatif) {
      const mutlak = -deger;
      rows.push(['Adım 1: mutlak değer (ikili)', iki(mutlak)]);
      rows.push(['Adım 2: bitleri ters çevir', iki(~mutlak & maske)]);
      rows.push(['Adım 3: 1 ekle', iki(bits)]);
    }
    rows.push(['Bire tümleyeni', iki(~bits & maske)]);
    rows.push(['Ters işaretlisi', tersMetin]);
    rows.push(['Gösterilebilen aralık', `${bin(-yari)} … ${bin(yari - 1n)}`]);
    return {
      rows,
      note: `${w} bit ikiye tümleyende en soldaki bit −2^${w - 1} ağırlığındadır; diğer bitler olağan pozitif ağırlıklarını taşır.`,
    };
  },
  cases: [
    { in: { deger: '-5', yon: 'ondalik', genislik: '8' }, out: { 'İkiye tümleyen (ikili)': '1111 1011', 'Onaltılık': '0xFB', 'İşaretsiz yorum': '251', 'Adım 1: mutlak değer (ikili)': '0000 0101', 'Adım 2: bitleri ters çevir': '1111 1010', 'Adım 3: 1 ekle': '1111 1011' } },
    { in: { deger: '11010110', yon: 'ikili', genislik: '8' }, out: { 'İşaretli ondalık değer': '-42', 'Onaltılık': '0xD6', 'İşaretsiz yorum': '214', 'Ters işaretlisi': '0010 1010 (42)' } },
    { in: { deger: '5', yon: 'ondalik', genislik: '8' }, out: { 'İkiye tümleyen (ikili)': '0000 0101', 'İşaret biti': '0 (sıfır ya da pozitif)', 'Ters işaretlisi': '1111 1011 (-5)' } },
    { in: { deger: '-128', yon: 'ondalik', genislik: '8' }, out: { 'İkiye tümleyen (ikili)': '1000 0000', 'Onaltılık': '0x80', 'Ters işaretlisi': '1000 0000 (taşma: 128 bu genişliğe sığmaz)' } },
    { in: { deger: '127', yon: 'ondalik', genislik: '8' }, out: { 'İkiye tümleyen (ikili)': '0111 1111', 'Gösterilebilen aralık': '-128 … 127' } },
    { in: { deger: '-1', yon: 'ondalik', genislik: '16' }, out: { 'İkiye tümleyen (ikili)': '1111 1111 1111 1111', 'Onaltılık': '0xFFFF', 'İşaretsiz yorum': '65.535' } },
    { in: { deger: '0xFF', yon: 'ikili', genislik: '8' }, out: { 'İşaretli ondalık değer': '-1' } },
    { in: { deger: '1000 0000', yon: 'ikili', genislik: '8' }, out: { 'İşaretli ondalık değer': '-128' } },
    { in: { deger: '-2147483648', yon: 'ondalik', genislik: '32' }, out: { 'Onaltılık': '0x80000000', 'Gösterilebilen aralık': '-2.147.483.648 … 2.147.483.647' } },
    { in: { deger: '0', yon: 'ondalik', genislik: '8' }, out: { 'İkiye tümleyen (ikili)': '0000 0000', 'Ters işaretlisi': '0000 0000 (0)' } },
    { in: { deger: '128', yon: 'ondalik', genislik: '8' }, error: true },
    { in: { deger: '1012', yon: 'ikili', genislik: '8' }, error: true },
    { in: { deger: '1111', yon: 'ikili', genislik: '8' }, error: true },
    { in: { deger: '2,5', yon: 'ondalik', genislik: '8' }, error: true },
  ],
  howto: [
    'Ondalık bir sayının gösterimini bulmak için yönü "Ondalık sayı → İkiye tümleyen" bırakın ve sayıyı eksi işaretiyle birlikte yazın (örneğin -42).',
    'Elinizde bir bit dizisi varsa yönü "İkili / onaltılık dizi → Ondalık" yapın. İkili diziyi seçtiğiniz genişlik kadar haneyle, onaltılık diziyi <code>0x</code> önekiyle yazın.',
    '"Bit genişliği" listesinden sayının saklanacağı boyutu seçin: bayt için 8, kısa tam sayı için 16, olağan tam sayı için 32, uzun tam sayı için 64.',
    '"Hesapla" düğmesine basın. Negatif sayılarda üç adımlı dönüşüm ayrı satırlarda gösterilir.',
  ],
  sections: [
    { h: 'İkiye tümleyen nedir?', p: [
      'Bilgisayarlar yalnızca 0 ve 1 saklayabildiğinden eksi işareti için ayrı bir simge yoktur; negatif sayılar da bit dizisi olarak kodlanmak zorundadır. Günümüzde neredeyse bütün işlemcilerin kullandığı yöntem <strong>ikiye tümleyen</strong> (two\'s complement) gösterimidir. Bu yöntemde en soldaki bit işareti belirler: 0 ise sayı sıfır ya da pozitiftir, 1 ise negatiftir. Pozitif sayılar bildiğimiz ikili yazımla saklanır; negatif sayılar ise aşağıda anlatılan dönüşümden geçer.',
      'Yöntemin tercih edilmesinin nedeni donanımı sadeleştirmesidir. İkiye tümleyende toplama ve çıkarma için ayrı devre gerekmez; işlemci pozitif ve negatif sayıları aynı toplayıcıyla toplar, çıkarma ise "ters işaretlisini topla" biçiminde yapılır. Ayrıca sıfırın tek bir gösterimi vardır.',
    ] },
    { h: 'Üç adımda negatif sayının gösterimi', ol: [
      'Sayının <strong>mutlak değerini</strong> seçilen genişlikte ikili olarak yazın.',
      'Bütün bitleri <strong>ters çevirin</strong>: 0\'lar 1, 1\'ler 0 olur. Bu ara sonuca bire tümleyen denir.',
      'Sonuca <strong>1 ekleyin</strong>. Elde edilen dizi sayının ikiye tümleyen gösterimidir.',
    ], p: [
      'Aynı üç adım ters yönde de çalışır: negatif bir gösterimi alıp bitlerini ters çevirir ve 1 eklerseniz mutlak değerini bulursunuz. Yani "ters çevir, 1 ekle" işlemi bir sayının işaretini değiştirmenin genel yoludur.',
    ] },
    { h: 'Çözümlü örnek: −5 ve −42', p: [
      '<strong>8 bitte −5:</strong> 5 sayısı <code>0000 0101</code> olarak yazılır. Bitler ters çevrilince <code>1111 1010</code> olur. 1 eklenince <code>1111 1011</code> elde edilir; onaltılık karşılığı 0xFB\'dir. Aynı bit dizisi işaretsiz okunursa 251 eder; bu da 256 − 5 değeridir.',
      '<strong>8 bitte −42:</strong> 42 = <code>0010 1010</code>. Ters çevrilmiş hâli <code>1101 0101</code>, 1 eklenmiş hâli <code>1101 0110</code>, yani 0xD6. Sağlamasını bit ağırlıklarıyla yapabiliriz: en soldaki bit −128 ağırlığındadır, diğer açık bitler 64, 16, 4 ve 2\'dir. −128 + 64 + 16 + 4 + 2 = −42.',
    ] },
    { h: 'Kestirme yollar', p: [
      '<strong>2<sup>n</sup> yöntemi:</strong> n bitlik bir genişlikte −x sayısının gösterimi, 2<sup>n</sup> − x sayısının işaretsiz ikili yazımıdır. 8 bitte −5 için 256 − 5 = 251 = <code>1111 1011</code>. "İkiye tümleyen" adı da buradan gelir: sayı, ikinin kuvvetine tamamlanır.',
      '<strong>Sağdan kopyalama yöntemi:</strong> pozitif sayının ikili yazımında sağdan başlayın, ilk 1\'e kadar olan bitleri (o 1 dahil) aynen kopyalayın, geri kalan bütün bitleri ters çevirin. <code>0010 1010</code> için sağdaki <code>10</code> aynen kalır, soldaki <code>0010 10</code> ters çevrilip <code>1101 01</code> olur: <code>1101 0110</code>.',
    ] },
    { h: 'Aralık ve taşma', p: [
      'n bitle −2<sup>n−1</sup> ile 2<sup>n−1</sup> − 1 arasındaki sayılar gösterilebilir. Negatif tarafta bir sayı fazladır, çünkü sıfır pozitif taraftaki dizilerden birini kullanır.',
    ], ul: [
      '<strong>8 bit:</strong> −128 … 127',
      '<strong>16 bit:</strong> −32.768 … 32.767',
      '<strong>32 bit:</strong> −2.147.483.648 … 2.147.483.647',
      '<strong>64 bit:</strong> −9.223.372.036.854.775.808 … 9.223.372.036.854.775.807',
    ] },
    { h: 'En küçük sayının tuhaflığı', p: [
      'Aralık simetrik olmadığından en küçük negatif sayının pozitif karşılığı yoktur. 8 bitte −128 <code>1000 0000</code> olarak saklanır; bitleri ters çevirip 1 eklediğinizde yine <code>1000 0000</code> çıkar. Yani −(−128) işlemi 8 bitte taşar ve sonuç yine −128 olur. Programlarda mutlak değer ya da işaret değiştirme işlemlerinin en küçük tam sayıda beklenmedik sonuç vermesinin nedeni budur. Araç bu durumda "Ters işaretlisi" satırında taşma uyarısı gösterir.',
      'Benzer biçimde 127\'ye 1 eklemek 8 bitte <code>1000 0000</code>, yani −128 verir. Sayaçların, zaman damgalarının ve oyun puanlarının aniden negatife dönmesi gibi hatalar bu taşmadan kaynaklanır.',
    ] },
    { h: 'Bire tümleyen ve işaret-büyüklük ile farkı', p: [
      'Negatif sayıları göstermenin iki eski yolu daha vardır. <strong>İşaret-büyüklük</strong> yönteminde en soldaki bit işaret, kalanlar mutlak değerdir; −5 <code>1000 0101</code> olur. <strong>Bire tümleyende</strong> negatif sayı, pozitifin bütün bitleri ters çevrilerek elde edilir; −5 <code>1111 1010</code> olur. İkisinde de +0 ve −0 olmak üzere iki ayrı sıfır bulunur ve toplama devresi ek düzeltme gerektirir. İkiye tümleyen bu iki sorunu da ortadan kaldırdığı için standart hâline gelmiştir.',
    ] },
    { h: 'Genişlik değiştirme: işaret genişletme', p: [
      'Bir sayıyı daha geniş bir alana taşırken soldaki yeni bitler işaret bitinin kopyasıyla doldurulur. 8 bitteki −5 (<code>1111 1011</code>) 16 bite taşındığında <code>1111 1111 1111 1011</code> olur; pozitif sayılarda ise sola sıfır eklenir. Araç bu yüzden ikili yönde tam genişlik kadar hane ister: <code>1111</code> gibi kısa bir dizinin 15 mi yoksa −1 mi olduğu genişlik bilinmeden söylenemez.',
    ] },
  ],
  faq: [
    ['İkiye tümleyen nasıl hesaplanır?', 'Sayının mutlak değeri ikili yazılır, bütün bitler ters çevrilir ve sonuca 1 eklenir. Örneğin 8 bitte −5 için 0000 0101 ters çevrilip 1111 1010 olur, 1 eklenince 1111 1011 elde edilir.'],
    ['Bire tümleyen ile ikiye tümleyen farkı nedir?', 'Bire tümleyen yalnızca bitlerin ters çevrilmiş hâlidir. İkiye tümleyen bunun 1 fazlasıdır. Bire tümleyende iki ayrı sıfır bulunurken ikiye tümleyende tek sıfır vardır ve toplama işlemi ek düzeltme gerektirmez.'],
    ['İkiye tümleyen diziyi ondalığa nasıl çeviririm?', 'En soldaki bit 0 ise dizi olağan ikili sayı gibi okunur. 1 ise en soldaki bite −2 üzeri (n−1) ağırlığı verilir, diğer bitlerin değerleri eklenir. 1101 0110 için −128 + 64 + 16 + 4 + 2 = −42.'],
    ['8 bitte neden −128 var ama +128 yok?', '8 bitle 256 farklı dizi yazılabilir. Bunların yarısı (işaret biti 1 olanlar) negatif sayılara, diğer yarısı sıfır ve pozitiflere ayrılır. Sıfır pozitif taraftan bir yer kapladığı için en büyük pozitif 127\'de kalır.'],
    ['Pozitif sayının ikiye tümleyen gösterimi nedir?', 'Pozitif sayılar ve sıfır dönüşüme uğramaz; olağan ikili yazımları soldan sıfırla tamamlanarak saklanır. 8 bitte 5 sayısı 0000 0101\'dir. Dönüşüm yalnızca negatif sayılar için gerekir.'],
    ['Aynı bit dizisi neden iki farklı sayı gösteriyor?', 'Bit dizisinin anlamı nasıl yorumlandığına bağlıdır. 1111 1011 dizisi işaretsiz tür olarak okunursa 251, işaretli tür olarak okunursa −5\'tir. Araç her iki yorumu da ayrı satırlarda verir.'],
    ['Hangi bit genişliğini seçmeliyim?', 'Değerin saklanacağı veri türüne göre seçin. Yanlış genişlik sonucu değiştirir: −5 8 bitte 0xFB, 16 bitte 0xFFFB, 32 bitte 0xFFFFFFFB olarak yazılır.'],
    ['Girdiğim sayı bir yere kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['bit-islem-hesapla', 'ieee754-cevir', 'ip-ikili-cevir', 'ascii-tablosu', 'chmod-hesapla'],
};
