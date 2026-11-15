export default {
  slug: 'bit-islem-hesapla',
  title: 'Bit İşlemleri (AND, OR, XOR) Hesaplama',
  h1Tail: 'AND, OR, XOR, NOT, kaydırma',
  pageTitle: 'Bit İşlemleri Hesaplama – AND, OR, XOR, NOT ve Bit Kaydırma',
  description: 'İki sayı arasında AND, OR, XOR, NAND, NOR, XNOR, NOT ve bit kaydırma işlemlerini yapın. Sonucu ikili, onaltılık, sekizlik ve işaretli ondalık olarak görün.',
  card: 'İki sayıya AND, OR, XOR, NOT ya da bit kaydırma uygulayın; sonucu ikili, onaltılık ve ondalık olarak görün.',
  category: 'gelistirici',
  keywords: ['bit işlemleri hesaplama', 'and or xor hesaplama', 'bitwise hesap makinesi', 'xor hesaplama', 'bit kaydırma hesaplama', 'ikili and işlemi', 'not işlemi hesaplama', 'bit maskeleme'],
  lead: 'İki tam sayıyı ve yapmak istediğiniz bit düzeyi işlemi seçin; araç sonucu ondalık, ikili, onaltılık ve sekizlik olarak verir, işlenenlerin ikili açılımını alt alta gösterir. Sayıları ondalık yazabileceğiniz gibi <code>0x</code>, <code>0b</code> ve <code>0o</code> önekleriyle de girebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'A sayısı', type: 'text', placeholder: 'Örn. 12, 0x0C ya da 0b1100' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['and', 'AND (ve) – A & B'], ['or', 'OR (veya) – A | B'], ['xor', 'XOR (özel veya) – A ^ B'], ['not', 'NOT (değil) – ~A'], ['nand', 'NAND – ~(A & B)'], ['nor', 'NOR – ~(A | B)'], ['xnor', 'XNOR – ~(A ^ B)'], ['shl', 'Sola kaydır – A << B'], ['shr', 'Sağa kaydır (mantıksal) – A >>> B'], ['sar', 'Sağa kaydır (aritmetik) – A >> B']] },
    { id: 'b', label: 'B sayısı (ya da kaydırma miktarı)', type: 'text', placeholder: 'Örn. 10', hint: 'NOT işleminde bu alan kullanılmaz; boş bırakabilirsiniz.' },
    { id: 'genislik', label: 'Bit genişliği', type: 'select', value: '32', options: [['8', '8 bit'], ['16', '16 bit'], ['32', '32 bit'], ['64', '64 bit']] },
  ],
  compute(v, h) {
    const w = [8, 16, 32, 64].includes(Number(v.genislik)) ? Number(v.genislik) : 32;
    const W = BigInt(w);
    const mod = 1n << W;
    const maske = mod - 1n;
    const oku = (s, ad) => {
      let t = String(s ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
      if (t === '') h.err(`"${ad}" alanını doldurun.`);
      let eksi = false;
      if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
      if (!/^(0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+)$/.test(t)) h.err(`"${ad}" geçerli bir tam sayı değil. Ondalık (12), onaltılık (0x0C), ikili (0b1100) ya da sekizlik (0o14) yazın.`);
      if (t.length > 80) h.err(`"${ad}" çok uzun.`);
      let n = BigInt(t);
      if (eksi) n = -n;
      if (n > maske || n < -(mod >> 1n)) h.err(`"${ad}" ${w} bite sığmıyor. Daha büyük bir bit genişliği seçin ya da sayıyı küçültün.`);
      return n & maske;
    };
    const op = v.islem || 'and';
    const A = oku(v.a, 'A sayısı');
    const kaydirma = op === 'shl' || op === 'shr' || op === 'sar';
    let B = 0n;
    if (kaydirma) {
      const t = String(v.b ?? '').trim();
      if (!/^\d{1,3}$/.test(t)) h.err('Kaydırma miktarını 0 ya da pozitif bir tam sayı olarak "B sayısı" alanına yazın.');
      B = BigInt(t);
      if (B > W) h.err(`Kaydırma miktarı bit genişliğinden (${w}) büyük olamaz.`);
    } else if (op !== 'not') B = oku(v.b, 'B sayısı');
    const isaretli = (x) => (x >= (mod >> 1n) ? x - mod : x);
    let r;
    if (op === 'and') r = A & B;
    else if (op === 'or') r = A | B;
    else if (op === 'xor') r = A ^ B;
    else if (op === 'not') r = ~A;
    else if (op === 'nand') r = ~(A & B);
    else if (op === 'nor') r = ~(A | B);
    else if (op === 'xnor') r = ~(A ^ B);
    else if (op === 'shl') r = A << B;
    else if (op === 'shr') r = A >> B;
    else r = isaretli(A) >> B;
    r &= maske;
    const iki = (x) => x.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const on6 = (x) => '0x' + x.toString(16).toUpperCase().padStart(w / 4, '0');
    const bin = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const birler = r.toString(2).replace(/0/g, '').length;
    const rows = [
      ['Sonuç (ondalık)', bin(r)],
      ['Sonuç (ikili)', iki(r)],
      ['Sonuç (onaltılık)', on6(r)],
      ['Sonuç (sekizlik)', '0o' + r.toString(8)],
      ['Sonuç (işaretli ondalık)', bin(isaretli(r)).replace(/^-\./, '-')],
      ['A (ikili)', iki(A)],
    ];
    if (!kaydirma && op !== 'not') rows.push(['B (ikili)', iki(B)]);
    rows.push(['1 olan bit sayısı', String(birler)]);
    return {
      rows,
      note: `Hesap ${w} bit genişliğinde yapılır; bu genişliğin dışına taşan bitler atılır. İşaretli değer ikiye tümleyen yorumudur.`,
    };
  },
  cases: [
    { in: { a: '12', islem: 'and', b: '10', genislik: '8' }, out: { 'Sonuç (ondalık)': '8', 'Sonuç (ikili)': '0000 1000', 'Sonuç (onaltılık)': '0x08', 'A (ikili)': '0000 1100', 'B (ikili)': '0000 1010' } },
    { in: { a: '12', islem: 'xor', b: '10', genislik: '8' }, out: { 'Sonuç (ondalık)': '6', 'Sonuç (ikili)': '0000 0110', '1 olan bit sayısı': '2' } },
    { in: { a: '12', islem: 'or', b: '10', genislik: '8' }, out: { 'Sonuç (ondalık)': '14', 'Sonuç (ikili)': '0000 1110', 'Sonuç (sekizlik)': '0o16' } },
    { in: { a: '12', islem: 'not', b: '', genislik: '8' }, out: { 'Sonuç (ondalık)': '243', 'Sonuç (ikili)': '1111 0011', 'Sonuç (onaltılık)': '0xF3', 'Sonuç (işaretli ondalık)': '-13' } },
    { in: { a: '0xFF', islem: 'and', b: '0x0F', genislik: '16' }, out: { 'Sonuç (ondalık)': '15', 'Sonuç (onaltılık)': '0x000F' } },
    { in: { a: '1', islem: 'shl', b: '4', genislik: '8' }, out: { 'Sonuç (ondalık)': '16', 'Sonuç (ikili)': '0001 0000' } },
    { in: { a: '255', islem: 'shl', b: '1', genislik: '8' }, out: { 'Sonuç (ondalık)': '254' } },
    { in: { a: '200', islem: 'shr', b: '3', genislik: '8' }, out: { 'Sonuç (ondalık)': '25' } },
    { in: { a: '-16', islem: 'sar', b: '2', genislik: '8' }, out: { 'Sonuç (ondalık)': '252', 'Sonuç (işaretli ondalık)': '-4' } },
    { in: { a: '12', islem: 'nand', b: '10', genislik: '8' }, out: { 'Sonuç (ondalık)': '247' } },
    { in: { a: '0b1010', islem: 'xnor', b: '0b0110', genislik: '8' }, out: { 'Sonuç (ikili)': '1111 0011' } },
    { in: { a: '0xDEADBEEF', islem: 'and', b: '0x0000FFFF', genislik: '32' }, out: { 'Sonuç (onaltılık)': '0x0000BEEF', 'Sonuç (ondalık)': '48.879' } },
    { in: { a: '256', islem: 'and', b: '1', genislik: '8' }, error: true },
    { in: { a: 'abc', islem: 'or', b: '1', genislik: '8' }, error: true },
    { in: { a: '5', islem: 'xor', b: '', genislik: '8' }, error: true },
  ],
  howto: [
    '"A sayısı" alanına ilk sayıyı yazın. Ondalık yazabilir ya da <code>0x1F</code>, <code>0b1010</code>, <code>0o17</code> gibi önekli biçimleri kullanabilirsiniz.',
    '"İşlem" listesinden AND, OR, XOR, NOT, NAND, NOR, XNOR ya da kaydırma işlemlerinden birini seçin.',
    '"B sayısı" alanına ikinci sayıyı, kaydırma işlemlerinde ise kaç bit kaydırılacağını yazın. NOT için bu alan boş kalabilir.',
    'Sonucun kaç bitlik bir değişkende tutulduğunu "Bit genişliği" ile belirleyin; NOT ve sola kaydırma sonuçları buna göre değişir.',
    '"Hesapla" düğmesine basın ve sonucu istediğiniz tabanda kopyalayın.',
  ],
  sections: [
    { h: 'Bit düzeyi işlem nedir?', p: [
      'Bilgisayar bir tam sayıyı ikili basamaklar, yani bitler hâlinde saklar. Toplama ve çarpma gibi aritmetik işlemler sayının bütününe bakarken bit düzeyi işlemler iki sayıyı <strong>aynı hizadaki bitleri tek tek karşılaştırarak</strong> işler. Her bit çifti için kural basittir ve basamaklar arasında elde taşınmaz. Bu sadelik bit işlemlerini hem çok hızlı hem de donanıma çok yakın kılar: bayrak (flag) saklamak, izin maskeleri kurmak, ağ adresi hesaplamak, renk bileşenlerini ayırmak ve gömülü sistemlerde yazmaç (register) ayarlamak hep bu işlemlerle yapılır.',
    ] },
    { h: 'AND, OR, XOR ve NOT kuralları', ul: [
      '<strong>AND (&)</strong>: iki bit de 1 ise sonuç 1, aksi hâlde 0. Belirli bitleri <em>ayıklamak</em> ya da sıfırlamak için kullanılır.',
      '<strong>OR (|)</strong>: bitlerden en az biri 1 ise sonuç 1. Belirli bitleri <em>açmak</em> için kullanılır.',
      '<strong>XOR (^)</strong>: bitler farklıysa sonuç 1, aynıysa 0. Belirli bitleri <em>tersine çevirmek</em> ve farkları bulmak için kullanılır.',
      '<strong>NOT (~)</strong>: tek sayıyla çalışır; her 0 bitini 1, her 1 bitini 0 yapar.',
      '<strong>NAND, NOR, XNOR</strong>: sırasıyla AND, OR ve XOR sonucunun NOT uygulanmış hâlidir.',
    ] },
    { h: 'Çözümlü örnek: 12 ve 10', p: [
      '12 ikilide <code>1100</code>, 10 ikilide <code>1010</code> olarak yazılır. Bitleri alt alta koyup soldan sağa karşılaştıralım. AND için: 1&1=1, 1&0=0, 0&1=0, 0&0=0; sonuç <code>1000</code>, yani <strong>8</strong>. OR için: 1, 1, 1, 0; sonuç <code>1110</code>, yani <strong>14</strong>. XOR için: 0, 1, 1, 0; sonuç <code>0110</code>, yani <strong>6</strong>.',
      'Bu üç sonuç arasında hoş bir ilişki vardır: OR sonucu, AND ile XOR sonuçlarının toplamına eşittir (8 + 6 = 14). Çünkü AND iki sayıda ortak olan bitleri, XOR ise yalnızca birinde olan bitleri verir; ikisi birlikte OR\'u oluşturur.',
    ] },
    { h: 'Bit genişliği neden önemli?', p: [
      'AND, OR ve XOR sonuçları genişlikten etkilenmez, ancak NOT ve türevleri etkilenir. 12 sayısına 8 bit genişlikte NOT uygulandığında <code>0000 1100</code> ters çevrilir ve <code>1111 0011</code>, yani 243 elde edilir. Aynı işlem 16 bitte 65.523, 32 bitte 4.294.967.283 verir; çünkü soldaki bütün sıfırlar da 1 olur.',
      'Programlama dillerinin çoğu tam sayıları işaretli saklar ve en soldaki biti işaret olarak yorumlar. Bu yorumla <code>1111 0011</code> değeri −13 demektir; genel kural <strong>~A = −A − 1</strong> biçimindedir. Araç bu yüzden hem işaretsiz hem de işaretli (ikiye tümleyen) değeri ayrı satırlarda gösterir. Kendi dilinizde gördüğünüz sonuç negatifse "işaretli ondalık" satırına bakın.',
    ] },
    { h: 'Bit kaydırma işlemleri', p: [
      '<strong>Sola kaydırma</strong> bitleri sola iter, sağdan sıfır doldurur. Her bir bitlik kaydırma sayıyı 2 ile çarpmaya denktir: 1 << 4 = 16. Genişliğin dışına çıkan bitler kaybolur; 8 bitte 255 << 1 işlemi 510 değil 254 verir, çünkü en soldaki 1 biti dışarı taşar.',
      '<strong>Sağa kaydırma</strong> iki türlüdür. Mantıksal kaydırmada soldan her zaman 0 girer; 200 >>> 3 = 25 olur (200 ÷ 8 = 25). Aritmetik kaydırmada ise soldan işaret biti kopyalanır, böylece negatif sayılar negatif kalır: 8 bitte −16 >> 2 = −4. Araçta ikisi ayrı seçenek olarak yer alır; pozitif sayılarda sonuçları aynıdır.',
    ] },
    { h: 'Sık kullanılan kalıplar', ul: [
      '<strong>Bit sınama:</strong> <code>x & (1 << n)</code> sıfır değilse n. bit açıktır.',
      '<strong>Bit açma:</strong> <code>x | (1 << n)</code>',
      '<strong>Bit kapatma:</strong> <code>x & ~(1 << n)</code>',
      '<strong>Bit çevirme:</strong> <code>x ^ (1 << n)</code>',
      '<strong>Alt baytı alma:</strong> <code>x & 0xFF</code>; örneğin 0xDEADBEEF & 0x0000FFFF = 0x0000BEEF.',
      '<strong>Tek-çift sınama:</strong> <code>x & 1</code> sonucu 1 ise sayı tektir.',
      '<strong>İkinin kuvveti sınama:</strong> x sıfırdan büyükken <code>x & (x − 1)</code> sıfırsa x ikinin kuvvetidir.',
    ] },
    { h: 'Uygulama örnekleri', p: [
      'Ağ hesaplarında bir IP adresine alt ağ maskesiyle AND uygulandığında ağ adresi bulunur. Dosya izinlerinde okuma, yazma ve çalıştırma hakları 4, 2 ve 1 değerli bitlerdir; OR ile birleştirilir, AND ile sınanır. Renk kodlarında <code>0xRRGGBB</code> biçimindeki bir değerden kırmızı bileşeni almak için 16 bit sağa kaydırıp <code>0xFF</code> ile AND yapılır. XOR ise sağlama (parity) hesaplarında ve basit hata denetiminde temel taştır: bir değeri aynı anahtarla iki kez XOR\'lamak ilk değeri geri verir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç en fazla 64 bit genişlikte tam sayılarla çalışır ve hesapları tam duyarlıkla yapar; 53 bitin üzerindeki değerlerde de yuvarlama olmaz. Ondalıklı (kesirli) sayılar kabul edilmez. Negatif sayı yazarsanız seçili genişlikte ikiye tümleyen karşılığına çevrilir; sayı seçili genişliğe sığmıyorsa hata verilir. Farklı dillerde kaydırma miktarının genişliği aşması farklı sonuçlar doğurabildiğinden araç bu durumu kabul etmez.',
    ] },
  ],
  faq: [
    ['AND ile OR arasındaki fark nedir?', 'AND yalnızca iki bit de 1 olduğunda 1 verir, OR ise bitlerden biri 1 olduğunda 1 verir. Örneğin 12 AND 10 = 8, 12 OR 10 = 14 eder. AND bit ayıklamak, OR bit açmak için kullanılır.'],
    ['XOR işlemi ne işe yarar?', 'XOR, iki sayının farklı olan bitlerini 1 yapar. Belirli bitleri tersine çevirmek, iki değerin nerede ayrıştığını bulmak ve eşlik (parity) hesaplamak için kullanılır. 12 XOR 10 = 6 eder.'],
    ['NOT işleminin sonucu neden negatif çıkıyor?', 'Çoğu dil tam sayıları işaretli saklar ve NOT bütün bitleri, işaret bitini de çevirir. Bu yüzden ~A sonucu −A − 1 olur; ~12 = −13. Araçta işaretsiz karşılık 8 bitte 243, işaretli karşılık −13 olarak gösterilir.'],
    ['Sola kaydırma neden 2 ile çarpmaya eşit?', 'İkili sistemde her basamak bir öncekinin iki katıdır. Bitleri bir basamak sola taşımak her birinin değerini ikiye katlar. 3 << 2 işlemi 3 × 4 = 12 verir; taşan bit yoksa bu eşitlik her zaman geçerlidir.'],
    ['Mantıksal ve aritmetik sağa kaydırma farkı nedir?', 'Mantıksal kaydırmada soldan boşalan yerlere 0 konur. Aritmetik kaydırmada işaret biti kopyalanır, böylece negatif sayı negatif kalır. Pozitif sayılarda ikisi aynı sonucu verir.'],
    ['Onaltılık ya da ikili sayı girebilir miyim?', 'Evet. Onaltılık için 0x, ikili için 0b, sekizlik için 0o önekini kullanın: 0xFF, 0b11110000, 0o377 gibi. Öneksiz yazılan sayılar ondalık kabul edilir.'],
    ['Hangi bit genişliğini seçmeliyim?', 'Sonucu kullanacağınız değişkenin türüne göre seçin: bir bayt için 8, kısa tam sayı için 16, çoğu dildeki int için 32, uzun tam sayı için 64 bit. AND, OR ve XOR sonucu genişlikten etkilenmez; NOT ve sola kaydırma etkilenir.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['iki-tumleyen-hesapla', 'ip-ikili-cevir', 'chmod-hesapla', 'ieee754-cevir', 'alt-ag-maskesi-cevir', 'hex-rgb-cevir'],
};
