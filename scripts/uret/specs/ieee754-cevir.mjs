export default {
  slug: 'ieee754-cevir',
  title: 'IEEE 754 Kayan Nokta Çevirici',
  h1Tail: 'float ve double bit gösterimi',
  pageTitle: 'IEEE 754 Kayan Nokta Çevirici – Float ve Double Bit Gösterimi',
  description: 'Ondalık sayıyı IEEE 754 tek (32 bit) ya da çift (64 bit) duyarlıklı gösterime çevirin; işaret, üs ve kesir bitlerini, onaltılık kodu ve saklanan tam değeri görün.',
  card: 'Bir sayının 32 ya da 64 bit IEEE 754 gösterimini çıkarın ya da onaltılık bit dizisini sayıya çevirin.',
  category: 'gelistirici',
  keywords: ['ieee 754 çevirici', 'kayan nokta gösterimi', 'float ikili gösterim', 'float hex çevirme', 'double bit gösterimi', 'kayan noktalı sayı hesaplama', 'mantis üs işaret biti', '0.1 float gösterimi'],
  lead: 'Bir ondalık sayıyı yazın; araç bu sayının bilgisayar belleğinde <strong>IEEE 754</strong> standardına göre nasıl saklandığını gösterir: işaret biti, üs alanı, kesir alanı, onaltılık kod ve gerçekte saklanan tam değer. Ters yönde, onaltılık ya da ikili bit dizisini sayıya da çevirebilirsiniz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sayı ya da bit dizisi', type: 'text', placeholder: 'Örn. 0,15625 ya da 0x3E200000', hint: 'Sayı yönünde ondalık virgül ya da nokta, 1e-3 gibi üslü yazım, sonsuz ve nan kabul edilir.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['sayi', 'Sayı → IEEE 754 bitleri'], ['bit', 'Onaltılık / ikili bitler → Sayı']] },
    { id: 'duyarlik', label: 'Duyarlık', type: 'select', options: [['32', 'Tek duyarlık (32 bit, float)'], ['64', 'Çift duyarlık (64 bit, double)']] },
  ],
  compute(v, h) {
    const w = v.duyarlik === '64' ? 64 : 32;
    const ub = w === 32 ? 8 : 11; // üs biti
    const p = w === 32 ? 23 : 52; // kesir biti
    const yansiz = w === 32 ? 127 : 1023;
    const dv = new DataView(new ArrayBuffer(8));
    let bits; // BigInt
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Sayı ya da bit dizisi" alanını doldurun.');
    let taşma = false;
    if (v.yon === 'bit') {
      const t = ham.replace(/^0[xXbB]/, '').replace(/[\s_|]/g, '');
      if (/^[01]+$/.test(t) && t.length === w) bits = BigInt('0b' + t);
      else if (/^[0-9a-fA-F]+$/.test(t) && t.length === w / 4) bits = BigInt('0x' + t);
      else h.err(`${w} bit için tam ${w / 4} onaltılık hane (örn. ${w === 32 ? '3E200000' : '3FF0000000000000'}) ya da tam ${w} ikili hane yazın.`);
    } else {
      const k = ham.toLowerCase().replace(/\s/g, '').replace(/−/g, '-');
      let x;
      if (/^[+]?(sonsuz|inf|infinity|∞)$/.test(k)) x = Infinity;
      else if (/^-(sonsuz|inf|infinity|∞)$/.test(k)) x = -Infinity;
      else if (k === 'nan') x = NaN;
      else x = h.num(ham, 'Sayı');
      if (w === 32) {
        dv.setFloat32(0, x);
        bits = BigInt(dv.getUint32(0));
        if (Number.isFinite(x) && !Number.isFinite(dv.getFloat32(0))) taşma = true;
      } else {
        dv.setFloat64(0, x);
        bits = dv.getBigUint64(0);
      }
    }
    const ikili = bits.toString(2).padStart(w, '0');
    const isaret = ikili[0];
    const usBit = ikili.slice(1, 1 + ub);
    const kesirBit = ikili.slice(1 + ub);
    const e = parseInt(usBit, 2);
    const f = BigInt('0b' + kesirBit);
    const eMax = (1 << ub) - 1;
    let deger;
    if (w === 32) { dv.setUint32(0, Number(bits)); deger = dv.getFloat32(0); } else { dv.setBigUint64(0, bits); deger = dv.getFloat64(0); }
    // En kısa geri dönüşümlü gösterim
    let kisa;
    if (Number.isNaN(deger)) kisa = 'Sayı değil (not a number)';
    else if (deger === Infinity) kisa = '+Sonsuz';
    else if (deger === -Infinity) kisa = '-Sonsuz';
    else if (deger === 0) kisa = isaret === '1' ? '-0' : '0';
    else {
      let s = String(deger);
      if (w === 32) {
        for (let i = 1; i <= 9; i++) {
          const a = Number(deger.toPrecision(i));
          if (Math.fround(a) === deger) { s = String(a); break; }
        }
      }
      kisa = s.replace('.', ',');
    }
    let tur;
    let usMetin;
    let mantis;
    let tam;
    if (e === eMax) {
      tur = f === 0n ? 'Sonsuz' : 'Sayı değil (not a number)';
      usMetin = `${e} (özel değer)`;
      mantis = '—';
      tam = kisa;
    } else {
      const M = e === 0 ? f : f | (1n << BigInt(p));
      const E = (e === 0 ? 1 : e) - yansiz - p;
      if (e === 0) {
        tur = f === 0n ? 'Sıfır' : 'Denormal (alt normal) sayı';
        usMetin = `0 (etkin üs: ${1 - yansiz})`;
      } else {
        tur = 'Normal sayı';
        usMetin = `${e} (yansız: ${e - yansiz})`;
      }
      mantis = String((e === 0 ? 0 : 1) + Number(f) / 2 ** p).replace('.', ',');
      if (M === 0n) tam = isaret === '1' ? '-0' : '0';
      else {
        let g;
        if (E >= 0) g = (M << BigInt(E)).toString();
        else {
          const k = -E;
          const d = (M * 5n ** BigInt(k)).toString().padStart(k + 1, '0');
          const kes = d.slice(-k).replace(/0+$/, '');
          g = d.slice(0, -k) + (kes ? ',' + kes : '');
        }
        tam = g.length > 80 ? kisa + ' (yaklaşık; tam açılım çok uzun)' : (isaret === '1' ? '-' : '') + g;
      }
    }
    const on6 = '0x' + bits.toString(16).toUpperCase().padStart(w / 4, '0');
    const satirlar = [
      ['Onaltılık', on6],
      ['Değer (kısa gösterim)', kisa],
      ['İkili (işaret | üs | kesir)', `${isaret} ${usBit} ${kesirBit}`],
      ['İşaret biti', isaret === '1' ? '1 (negatif)' : '0 (pozitif)'],
      ['Üs alanı', usMetin],
      ['Anlamlı kısım (mantis)', mantis],
      ['Saklanan tam değer', tam],
      ['Tür', tur],
    ];
    if (v.yon === 'bit') { const t = satirlar[0]; satirlar[0] = satirlar[1]; satirlar[1] = t; }
    return {
      rows: satirlar,
      note: taşma ? 'Yazdığınız sayı tek duyarlığın sınırını aştığı için sonsuz olarak saklanır.' : `${w} bit: 1 işaret biti, ${ub} üs biti, ${p} kesir biti. Çoğu ondalık kesir ikilide tam gösterilemez; "Saklanan tam değer" satırı gerçekte tutulan sayıdır.`,
    };
  },
  cases: [
    { in: { deger: '0,15625', yon: 'sayi', duyarlik: '32' }, out: { 'Onaltılık': '0x3E200000', 'İkili (işaret | üs | kesir)': '0 01111100 01000000000000000000000', 'Üs alanı': '124 (yansız: -3)', 'Anlamlı kısım (mantis)': '1,25', 'Saklanan tam değer': '0,15625' } },
    { in: { deger: '0x40490FDB', yon: 'bit', duyarlik: '32' }, out: { 'Değer (kısa gösterim)': '3,1415927', 'Saklanan tam değer': '3,1415927410125732421875', 'Tür': 'Normal sayı' } },
    { in: { deger: '0.1', yon: 'sayi', duyarlik: '32' }, out: { 'Onaltılık': '0x3DCCCCCD', 'Saklanan tam değer': '0,100000001490116119384765625', 'Değer (kısa gösterim)': '0,1' } },
    { in: { deger: '0,1', yon: 'sayi', duyarlik: '64' }, out: { 'Onaltılık': '0x3FB999999999999A', 'Saklanan tam değer': '0,1000000000000000055511151231257827021181583404541015625' } },
    { in: { deger: '85,125', yon: 'sayi', duyarlik: '32' }, out: { 'Onaltılık': '0x42AA4000', 'İkili (işaret | üs | kesir)': '0 10000101 01010100100000000000000', 'Üs alanı': '133 (yansız: 6)' } },
    { in: { deger: '-2', yon: 'sayi', duyarlik: '32' }, out: { 'Onaltılık': '0xC0000000', 'İşaret biti': '1 (negatif)', 'Saklanan tam değer': '-2' } },
    { in: { deger: '1', yon: 'sayi', duyarlik: '64' }, out: { 'Onaltılık': '0x3FF0000000000000', 'Üs alanı': '1023 (yansız: 0)', 'Anlamlı kısım (mantis)': '1' } },
    { in: { deger: '7F800000', yon: 'bit', duyarlik: '32' }, out: { 'Değer (kısa gösterim)': '+Sonsuz', 'Tür': 'Sonsuz' } },
    { in: { deger: '7FC00000', yon: 'bit', duyarlik: '32' }, out: { 'Tür': 'Sayı değil (not a number)', 'Değer (kısa gösterim)': 'Sayı değil (not a number)' } },
    { in: { deger: '00000001', yon: 'bit', duyarlik: '32' }, out: { 'Tür': 'Denormal (alt normal) sayı', 'Üs alanı': '0 (etkin üs: -126)' } },
    { in: { deger: '7F7FFFFF', yon: 'bit', duyarlik: '32' }, out: { 'Saklanan tam değer': '340282346638528859811704183484516925440' } },
    { in: { deger: '-0', yon: 'sayi', duyarlik: '32' }, out: { 'Onaltılık': '0x80000000', 'Tür': 'Sıfır' } },
    { in: { deger: 'abc', yon: 'sayi', duyarlik: '32' }, error: true },
    { in: { deger: '0x123', yon: 'bit', duyarlik: '32' }, error: true },
    { in: { deger: '', yon: 'sayi', duyarlik: '64' }, error: true },
  ],
  howto: [
    'Sayıyı bit gösterimine çevirecekseniz "Çeviri yönü" listesinde "Sayı → IEEE 754 bitleri" seçili kalsın ve sayıyı yazın (örneğin 0,15625 ya da -2,5).',
    'Elinizde onaltılık ya da ikili bir bit dizisi varsa yönü "Onaltılık / ikili bitler → Sayı" yapın ve diziyi yazın; <code>0x</code> öneki ve boşluklar göz ardı edilir.',
    '"Duyarlık" listesinden tek (32 bit, float) ya da çift (64 bit, double) duyarlığı seçin.',
    '"Çevir" düğmesine basın. İkili satırında bitler işaret, üs ve kesir olarak boşlukla üç parçaya ayrılmış gösterilir.',
    '"Saklanan tam değer" satırını yazdığınız sayıyla karşılaştırarak yuvarlama farkını görün.',
  ],
  sections: [
    { h: 'IEEE 754 nedir?', p: [
      'IEEE 754, kesirli sayıların bilgisayarda ikili olarak nasıl saklanacağını ve bu sayılarla nasıl işlem yapılacağını tanımlayan standarttır. İşlemcilerin ve programlama dillerinin neredeyse tamamı bu standardı kullanır; C ve Java\'daki <code>float</code> ve <code>double</code>, JavaScript\'teki bütün sayılar, Python\'daki <code>float</code> bu biçimlerdedir.',
      'Fikir, bilimsel gösterimin ikili karşılığıdır. Ondalıkta 0,00123 sayısını 1,23 × 10<sup>−3</sup> diye yazdığımız gibi, ikilide de her sayı <strong>1,kesir × 2<sup>üs</sup></strong> biçimine getirilir. Bellekte üç alan tutulur: sayının artı mı eksi mi olduğunu söyleyen <strong>işaret biti</strong>, ikinin kuvvetini veren <strong>üs alanı</strong> ve virgülden sonraki ikili basamakları tutan <strong>kesir alanı</strong>.',
    ] },
    { h: 'Tek ve çift duyarlık', ul: [
      '<strong>Tek duyarlık (32 bit):</strong> 1 işaret + 8 üs + 23 kesir biti. Üs yanlılığı 127. Yaklaşık 7 anlamlı ondalık basamak taşır.',
      '<strong>Çift duyarlık (64 bit):</strong> 1 işaret + 11 üs + 52 kesir biti. Üs yanlılığı 1023. Yaklaşık 15-16 anlamlı ondalık basamak taşır.',
    ], p: [
      'Üs alanı negatif kuvvetleri de gösterebilsin diye gerçek üsse sabit bir sayı (yanlılık) eklenerek saklanır. Tek duyarlıkta gerçek üs −3 ise alana −3 + 127 = 124 yazılır. Araç "Üs alanı" satırında hem saklanan ham değeri hem de yanlılık çıkarılmış gerçek üssü gösterir.',
    ] },
    { h: 'Çözümlü örnek: 0,15625', p: [
      '0,15625 sayısı ikilide <code>0,00101</code> olarak yazılır (1/8 + 1/32). Virgülü ilk 1\'in sağına taşırsak <code>1,01 × 2<sup>−3</sup></code> elde ederiz. Sayı pozitif olduğundan işaret biti 0\'dır. Üs −3, yanlılıkla birlikte 124, ikilide <code>01111100</code>. Kesir alanına virgülden sonraki <code>01</code> yazılır ve sağı sıfırla doldurulur.',
      'Üç alan yan yana geldiğinde <code>0 01111100 01000000000000000000000</code> dizisi oluşur; onaltılık karşılığı <strong>0x3E200000</strong> olur. Anlamlı kısım 1,25\'tir ve 1,25 × 2<sup>−3</sup> = 0,15625 eder. Bu sayı ikinin kuvvetlerinin toplamı olduğu için hatasız saklanır.',
    ] },
    { h: '0,1 neden tam saklanamaz?', p: [
      'Ondalıkta 1/3 nasıl 0,333... diye sonsuza kadar sürüyorsa, ikilide de 1/10 sonsuz tekrar eden bir kesirdir: <code>0,000110011001100...</code>. Kesir alanı sınırlı olduğundan dizi bir yerde kesilir ve en yakın değere yuvarlanır. Tek duyarlıkta 0,1 yazdığınızda gerçekte saklanan sayı <strong>0,100000001490116119384765625</strong> olur; çift duyarlıkta hata çok daha küçüktür ama sıfır değildir.',
      'Programlarda <code>0.1 + 0.2</code> işleminin <code>0.3</code> yerine <code>0.30000000000000004</code> vermesinin nedeni budur. Bu bir hata değil, biçimin doğal sonucudur. Para tutarları gibi kesin ondalık gereken yerlerde kayan nokta yerine tam sayı (kuruş) ya da ondalık veri türleri kullanılmalı; kayan noktalı sayılar eşitlikle değil küçük bir tolerans ile karşılaştırılmalıdır.',
    ] },
    { h: 'Özel değerler', ul: [
      '<strong>Sıfır:</strong> üs ve kesir alanı tümüyle 0. İşaret biti ayrı olduğundan +0 ve −0 vardır; −0\'ın tek duyarlık kodu 0x80000000\'dir.',
      '<strong>Sonsuz:</strong> üs alanı tümüyle 1, kesir 0. Tek duyarlıkta +sonsuz 0x7F800000\'dir; taşma ve sıfıra bölmede ortaya çıkar.',
      '<strong>NaN (sayı değil):</strong> üs alanı tümüyle 1, kesir sıfırdan farklı. 0/0 ya da negatif sayının karekökü gibi tanımsız işlemlerin sonucudur.',
      '<strong>Denormal (alt normal) sayılar:</strong> üs alanı 0, kesir sıfırdan farklı. Başta gizli 1 yerine 0 varsayılır; sıfıra çok yakın değerlerin yumuşak biçimde gösterilmesini sağlar.',
    ] },
    { h: 'Bit dizisinden sayıya', p: [
      'Hata ayıklarken bellek dökümünde, ağ paketinde ya da ikili dosyada 4 ya da 8 baytlık bir değer görürsünüz ve bunun hangi sayıya karşılık geldiğini öğrenmek istersiniz. Ters yön bunun içindir. Örneğin <code>0x40490FDB</code> tek duyarlıkta π sayısının en yakın karşılığıdır: kısa gösterimi 3,1415927, saklanan tam değer ise 3,1415927410125732421875\'tir.',
      'Dikkat: bellek dökümlerinde baytlar çoğu zaman küçük uçlu (little-endian) sırayla görünür; yani <code>DB 0F 49 40</code> biçiminde. Araca yazmadan önce bayt sırasını en anlamlı bayt başta olacak şekilde çevirmeniz gerekir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca ikili 32 ve 64 bit biçimlerini destekler; yarım duyarlık (16 bit), genişletilmiş 80 bit ve ondalık kayan nokta biçimleri kapsam dışıdır. Sayı yönünde girdi önce çift duyarlıklı olarak okunur, bu yüzden 17 anlamlı basamaktan uzun girdilerin fazlası etkisizdir. Tam ondalık açılımı çok uzun olan değerlerde (çok büyük ya da sıfıra çok yakın sayılar) "Saklanan tam değer" satırı kısa gösterimi yaklaşık olarak verir.',
    ] },
  ],
  faq: [
    ['Float ile double arasındaki fark nedir?', 'Float 32 bittir ve yaklaşık 7 anlamlı basamak taşır; double 64 bittir ve yaklaşık 15-16 anlamlı basamak taşır. Double aynı zamanda çok daha geniş bir büyüklük aralığını kapsar, ancak bellekte iki kat yer tutar.'],
    ['0,1 + 0,2 neden 0,3 etmiyor?', 'Çünkü 0,1 ve 0,2 ikilide sonsuz tekrar eden kesirlerdir ve saklanırken yuvarlanır. Yuvarlanmış iki değerin toplamı, 0,3 için saklanan değerden bir basamak farklı çıkar. Sonuç çift duyarlıkta 0,30000000000000004 olur.'],
    ['Üs yanlılığı (bias) ne demek?', 'Üs alanı işaretsiz bir tam sayıdır; negatif üsleri gösterebilmek için gerçek üsse sabit bir değer eklenir. Bu değer tek duyarlıkta 127, çift duyarlıkta 1023\'tür. Gerçek üs, saklanan değerden yanlılık çıkarılarak bulunur.'],
    ['Mantis nedir?', 'Mantis ya da anlamlı kısım, sayının 1 ile 2 arasındaki ikili bilimsel gösterim katsayısıdır. Baştaki 1 her normal sayıda aynı olduğu için saklanmaz; yalnızca virgülden sonraki bitler kesir alanına yazılır.'],
    ['NaN nedir, nasıl oluşur?', 'NaN "sayı değil" anlamına gelir ve tanımsız işlemlerin sonucudur: sıfır bölü sıfır, sonsuz eksi sonsuz gibi. Üs alanının tümü 1 ve kesir alanı sıfırdan farklıdır. NaN kendisi dahil hiçbir değere eşit değildir.'],
    ['Negatif sıfır gerçekten var mı?', 'Evet. İşaret biti ayrı tutulduğu için +0 ve −0 iki ayrı bit dizisidir. Karşılaştırmada eşit sayılırlar, ancak 1 bölü +0 artı sonsuz, 1 bölü −0 eksi sonsuz verir.'],
    ['Onaltılık kodu hangi bayt sırasıyla yazmalıyım?', 'En anlamlı bayt başta olacak şekilde (büyük uçlu) yazın. Bellek dökümünden küçük uçlu sırayla aldıysanız baytları ters çevirin: DB 0F 49 40 yerine 40490FDB.'],
    ['Yazdığım sayılar sunucuya gönderiliyor mu?', 'Hayır. Çeviri, tarayıcınızın kendi kayan nokta işlemleriyle yerel olarak yapılır. Girdiğiniz değer hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['bit-islem-hesapla', 'iki-tumleyen-hesapla', 'ip-ikili-cevir', 'ascii-tablosu', 'crc32-hesapla'],
};
