export default {
  slug: 'ip-ikili-cevir',
  title: 'IP Adresini İkili Sayıya Çevirme',
  h1Tail: 'IPv4 ↔ binary',
  pageTitle: 'IP Adresini İkili Sayıya Çevirme – IPv4 Binary Dönüştürücü',
  description: 'IPv4 adresini 32 bitlik ikili (binary) gösterime, ikili gösterimi noktalı ondalık IP adresine çevirin. Onaltılık ve tek sayı karşılığı da gösterilir.',
  card: 'IPv4 adresini oktet oktet ikili sayıya çevirin ya da 32 biti yeniden IP adresine dönüştürün.',
  category: 'gelistirici',
  keywords: ['ip ikili çevirme', 'ip binary çevirme', 'ip adresi binary', 'ipv4 ikili sayı', 'ikili ip adresi çevirme', 'ip to binary', 'oktet ikili karşılığı'],
  lead: 'Noktalı ondalık yazılmış bir IPv4 adresini (ör. <code>192.168.1.1</code>) sekizer bitlik dört gruba çevirin ya da 32 bitlik ikili yazımı yeniden okunabilir IP adresine dönüştürün. Sonuçla birlikte onaltılık karşılık ve adresin tek tam sayı değeri de verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'adres', label: 'Adres', type: 'text', placeholder: 'Örn. 192.168.1.1', hint: 'İkiliden çevirirken 32 biti bitişik ya da noktayla/boşlukla dört gruba ayırarak yazın.', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ikili', 'IP adresi → İkili'], ['ip', 'İkili → IP adresi']] },
  ],
  compute(v, h) {
    const t = String(v.adres ?? '').trim();
    if (t === '') h.err('"Adres" alanını doldurun.');
    let okt;
    if (v.yon === 'ip') {
      if (/[^01.\s]/.test(t)) h.err('İkili yazımda yalnızca 0 ve 1 rakamları, nokta ve boşluk kullanılabilir.');
      const gr = t.split(/[.\s]+/).filter(Boolean);
      if (gr.length === 1) {
        if (gr[0].length !== 32) h.err('Bitişik yazımda tam 32 bit gerekir; şu an ' + gr[0].length + ' bit var.');
        okt = [0, 8, 16, 24].map((i) => parseInt(gr[0].slice(i, i + 8), 2));
      } else if (gr.length === 4) {
        if (gr.some((g) => g.length > 8)) h.err('Her grup en fazla 8 bit olabilir.');
        okt = gr.map((g) => parseInt(g, 2));
      } else h.err('İkili adresi tek parça 32 bit ya da dört grup hâlinde yazın (örn. 11000000.10101000.00000001.00000001).');
    } else {
      const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(t);
      if (!m) h.err('IPv4 adresini noktayla ayrılmış dört sayı olarak yazın (örn. 192.168.1.1).');
      okt = [m[1], m[2], m[3], m[4]].map(Number);
      if (okt.some((o) => o > 255)) h.err('IPv4 adresindeki her bölüm 0 ile 255 arasında olmalı.');
    }
    const bin = okt.map((o) => o.toString(2).padStart(8, '0'));
    const hex = okt.map((o) => o.toString(16).toUpperCase().padStart(2, '0'));
    const tam = okt[0] * 16777216 + okt[1] * 65536 + okt[2] * 256 + okt[3];
    const birler = bin.join('').split('').filter((c) => c === '1').length;
    const ip = okt.join('.');
    const ikili = bin.join('.');
    const rows = v.yon === 'ip'
      ? [['IP adresi', ip], ['İkili gösterim', ikili]]
      : [['İkili gösterim', ikili], ['IP adresi', ip]];
    rows.push(
      ['Bitişik 32 bit', bin.join('')],
      ['Onaltılık', hex.join('.')],
      ['Tek tam sayı', String(tam)],
      ['1 olan bit sayısı', String(birler)],
    );
    return { rows, note: 'Her oktet 8 bitle yazılır; baştaki sıfırlar korunur. Bit ağırlıkları soldan sağa 128, 64, 32, 16, 8, 4, 2, 1\'dir.' };
  },
  cases: [
    { in: { adres: '192.168.1.1', yon: 'ikili' }, out: { 'İkili gösterim': '11000000.10101000.00000001.00000001', 'Onaltılık': 'C0.A8.01.01', 'Tek tam sayı': '3232235777' } },
    { in: { adres: '11000000.10101000.00000001.00000001', yon: 'ip' }, out: { 'IP adresi': '192.168.1.1' } },
    { in: { adres: '10.0.0.1', yon: 'ikili' }, out: { 'İkili gösterim': '00001010.00000000.00000000.00000001', 'Tek tam sayı': '167772161', '1 olan bit sayısı': '3' } },
    { in: { adres: '255.255.255.0', yon: 'ikili' }, out: { 'İkili gösterim': '11111111.11111111.11111111.00000000', '1 olan bit sayısı': '24', 'Onaltılık': 'FF.FF.FF.00' } },
    { in: { adres: '172.16.254.1', yon: 'ikili' }, out: { 'İkili gösterim': '10101100.00010000.11111110.00000001', 'Tek tam sayı': '2886794753' } },
    { in: { adres: '00001000000010000000100000001000', yon: 'ip' }, out: { 'IP adresi': '8.8.8.8', 'Tek tam sayı': '134744072' } },
    { in: { adres: '1010 0 0 1', yon: 'ip' }, out: { 'IP adresi': '10.0.0.1', 'İkili gösterim': '00001010.00000000.00000000.00000001' } },
    { in: { adres: '192.168.1.256', yon: 'ikili' }, error: true },
    { in: { adres: '1100', yon: 'ip' }, error: true },
    { in: { adres: '192.168.1', yon: 'ikili' }, error: true },
  ],
  howto: [
    '"Çeviri yönü" listesinden IP adresinden ikiliye mi, ikiliden IP adresine mi çevireceğinizi seçin.',
    'IP adresinden çeviriyorsanız adresi noktalı ondalık biçimde yazın: <code>172.16.254.1</code> gibi.',
    'İkiliden çeviriyorsanız 32 biti bitişik yazın ya da dört gruba bölüp aralarına nokta veya boşluk koyun; gruplarda baştaki sıfırları yazmasanız da olur.',
    '"Çevir" düğmesine basın; ikili gösterim, onaltılık karşılık ve adresin tam sayı değeri birlikte listelenir.',
    'Ders notuna ya da yapılandırma belgesine eklemek için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Bir IP adresi aslında 32 bittir', p: [
      'Bilgisayarlar IPv4 adresini bizim yazdığımız gibi dört sayı olarak değil, 32 adet 0 ve 1\'den oluşan tek bir dizi olarak saklar ve işler. Noktalı ondalık yazım yalnızca insanların okuyabilmesi için bulunmuş bir kolaylıktır: 32 bit sekizerli dört gruba (oktete) bölünür, her grup ondalık sayıya çevrilir ve aralarına nokta konur. Sekiz bitle 0\'dan 255\'e kadar 256 farklı değer yazılabildiği için bir IP adresinin hiçbir bölümü 255\'i geçemez.',
      'Alt ağ maskeleri, yönlendirme kararları ve erişim listeleri bit düzeyinde çalışır. Bir adresin hangi ağa ait olduğunu anlamak için yönlendirici, adres ile maskeyi bit bit karşılaştırır. Bu yüzden ağ derslerinde ve sertifika sınavlarında ilk öğretilen beceri, bir adresi ikiliye çevirip yeniden ondalığa döndürebilmektir.',
    ] },
    { h: 'Elle çevirme yöntemi ve çözümlü örnek', p: [
      'Bir oktetin sekiz biti soldan sağa şu ağırlıkları taşır: <strong>128, 64, 32, 16, 8, 4, 2, 1</strong>. Ondalık bir sayıyı ikiliye çevirmek için en büyük ağırlıktan başlanır: ağırlık sayıya sığıyorsa o bit 1 yazılır ve ağırlık sayıdan düşülür, sığmıyorsa 0 yazılır.',
      'Örnek olarak 192.168.1.1 adresini çevirelim. <strong>192</strong>: 128 sığar (kalan 64), 64 sığar (kalan 0), geri kalan bitler 0 olur; sonuç 11000000. <strong>168</strong>: 128 sığar (kalan 40), 64 sığmaz, 32 sığar (kalan 8), 16 sığmaz, 8 sığar (kalan 0); sonuç 10101000. <strong>1</strong>: yalnızca en sağdaki bit 1\'dir; sonuç 00000001. Dördüncü oktet de aynıdır. Adresin ikili yazımı <code>11000000.10101000.00000001.00000001</code> olur; araç aynı girdiyle tam olarak bu sonucu verir.',
      'Tersine çevirmek daha da kolaydır: 1 olan bitlerin ağırlıkları toplanır. 10101100 için 128 + 32 + 8 + 4 = 172 bulunur. 00010000 yalnızca 16\'dır, 11111110 ise 255 − 1 = 254 eder. Böylece 10101100.00010000.11111110.00000001 dizisi 172.16.254.1 adresine karşılık gelir.',
    ] },
    { h: 'Sık karşılaşılan oktet değerleri', ul: [
      '<strong>0</strong> = 00000000',
      '<strong>1</strong> = 00000001',
      '<strong>10</strong> = 00001010',
      '<strong>127</strong> = 01111111',
      '<strong>128</strong> = 10000000',
      '<strong>172</strong> = 10101100',
      '<strong>192</strong> = 11000000',
      '<strong>224</strong> = 11100000',
      '<strong>240</strong> = 11110000',
      '<strong>248</strong> = 11111000',
      '<strong>252</strong> = 11111100',
      '<strong>254</strong> = 11111110',
      '<strong>255</strong> = 11111111',
    ] },
    { h: 'Onaltılık ve tek tam sayı karşılığı', p: [
      'İkili yazım uzun olduğu için programcılar çoğu zaman onaltılık (hex) gösterimi tercih eder: her dört bit tek bir onaltılık basamağa denk gelir, dolayısıyla bir oktet iki basamakla yazılır. 192 sayısı C0, 168 sayısı A8 olur ve 192.168.1.1 adresi C0.A8.01.01 biçiminde gösterilir. Paket yakalama araçlarının ham çıktılarında adresler bu biçimde görünür.',
      '"Tek tam sayı" satırı, 32 bitin bütün olarak okunmuş hâlidir. Hesabı şöyledir: birinci oktet × 16.777.216 + ikinci oktet × 65.536 + üçüncü oktet × 256 + dördüncü oktet. 192.168.1.1 için sonuç 3232235777\'dir. Veritabanlarında IP adreslerini sıralamak ya da bir aralığa girip girmediğini hızlı sorgulamak için adresler sıklıkla bu tam sayı biçiminde saklanır.',
    ] },
    { h: 'Maskelerde bit saymak', p: [
      'Sonuçtaki "1 olan bit sayısı" satırı özellikle alt ağ maskelerinde işe yarar. Geçerli bir maske soldan kesintisiz 1\'lerle başlar ve 0\'larla biter; 1\'lerin sayısı doğrudan CIDR önek uzunluğudur. 255.255.255.0 yazdığınızda 24 adet 1 görürsünüz, bu maske /24\'e karşılık gelir. 255.255.240.0 maskesi 11111111.11111111.11110000.00000000 biçimindedir ve 20 adet 1 içerir, yani /20\'dir. İkili yazımda 1\'lerin arasına 0 girmişse (örneğin 255.0.255.0) o değer geçerli bir alt ağ maskesi değildir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata baştaki sıfırları atmaktır. 1 sayısının ikili karşılığı tek başına "1" olsa da bir oktet her zaman sekiz bitle yazılır: 00000001. Sıfırlar atılırsa bitlerin hizası bozulur ve maskeyle karşılaştırma yanlış sonuç verir. İkinci hata, ağırlıkları sağdan sola yerine soldan sağa küçükten büyüğe dizmektir; en soldaki bit her zaman 128\'dir.',
      'Bu araç yalnızca IPv4 adreslerini çevirir; iki nokta üst üste ile yazılan 128 bitlik IPv6 adresleri kapsam dışındadır. Araç bir adresin gerçekte kullanımda olup olmadığını ya da kime ait olduğunu denetlemez, yalnızca sayı tabanı dönüşümü yapar.',
    ] },
  ],
  faq: [
    ['192.168.1.1 adresinin ikili karşılığı nedir?', '11000000.10101000.00000001.00000001 olur. 192 sayısı 128 + 64, 168 sayısı 128 + 32 + 8 toplamıdır; son iki oktet ise yalnızca en sağdaki biti 1 olan 00000001 değeridir.'],
    ['Bir IP adresi kaç bitten oluşur?', 'IPv4 adresi 32 bittir ve sekizer bitlik dört oktete bölünür. Bu, yaklaşık 4,29 milyar farklı adres demektir. IPv6 adresleri ise 128 bittir.'],
    ['Neden bir oktet 255\'ten büyük olamaz?', 'Çünkü sekiz bitle yazılabilen en büyük sayı 11111111, yani 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255\'tir. 256 yazmak için dokuzuncu bir bit gerekir.'],
    ['İkili yazarken baştaki sıfırları yazmak zorunda mıyım?', 'Dört grup hâlinde ve aralarında nokta ya da boşluk bırakarak yazıyorsanız hayır; araç eksik bitleri soldan sıfırla tamamlar. Bitişik yazıyorsanız tam 32 bit girmeniz gerekir, aksi hâlde oktet sınırları belirlenemez.'],
    ['255.255.255.0 maskesi ikilide nasıl görünür?', '11111111.11111111.11111111.00000000 olarak yazılır. 24 adet 1 içerdiği için CIDR gösteriminde /24\'e karşılık gelir.'],
    ['"Tek tam sayı" değeri ne işe yarar?', 'Adresin 32 bitinin tek bir sayı olarak okunmuş hâlidir. Veritabanında IP aralığı sorgulamak, adresleri sıralamak ya da iki adres arasındaki farkı bulmak için kullanılır.'],
    ['IPv6 adresini çevirebilir miyim?', 'Hayır. Bu araç yalnızca noktalı ondalık IPv4 adresleri ve 32 bitlik ikili diziler için tasarlanmıştır.'],
    ['Girdiğim adres bir sunucuya gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; yazdığınız adres hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['ip-ondalik-cevir', 'cidr-hesapla', 'ip-alt-ag-hesapla', 'ikili-ondalik-cevir', 'alt-ag-maskesi-cevir'],
};
