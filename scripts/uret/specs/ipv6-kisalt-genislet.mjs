export default {
  slug: 'ipv6-kisalt-genislet',
  title: 'IPv6 Adresi Kısaltma ve Genişletme',
  h1Tail: 'kısa ↔ tam yazım',
  pageTitle: 'IPv6 Adresi Kısaltma ve Genişletme – Tam ve Kısa Yazım Çevirici',
  description: 'IPv6 adresini RFC 5952 kurallarına göre kısaltın ya da 32 haneli tam yazımına genişletin. Çift iki nokta, baştaki sıfırlar ve adres türü tek sonuçta.',
  card: 'IPv6 adresini standart kısa biçime indirin ya da 8 grupluk tam yazımına açın; adres türünü de görün.',
  category: 'gelistirici',
  keywords: ['ipv6 kısaltma', 'ipv6 genişletme', 'ipv6 tam yazım', 'ipv6 sıkıştırma', 'ipv6 adres çevirici', 'rfc 5952', 'ipv6 çift iki nokta', 'ipv6 expand compress'],
  lead: 'Bir IPv6 adresini yazın; araç aynı adresin hem <strong>RFC 5952</strong> kurallarına uygun en kısa yazımını hem de sekiz grubu dörder haneyle gösteren tam yazımını üretir. Adresin hangi türe (küresel, bağlantı yerel, geri döngü vb.) girdiğini de belirtir.',
  button: 'Çevir',
  inputs: [
    { id: 'adres', label: 'IPv6 adresi', type: 'text', placeholder: 'Örn. 2001:0db8:0000:0000:0000:ff00:0042:8329', hint: 'Kısa ya da tam yazım olabilir; sondaki /64 gibi önek uzunluğu korunur.', wide: true },
  ],
  compute(v, h) {
    let s = String(v.adres ?? '').trim().toLowerCase();
    if (s === '') h.err('"IPv6 adresi" alanını doldurun.');
    if (s.startsWith('[') && s.endsWith(']')) s = s.slice(1, -1);
    let onek = '';
    const egik = s.indexOf('/');
    if (egik !== -1) {
      const p = s.slice(egik + 1);
      if (!/^\d{1,3}$/.test(p) || Number(p) > 128) h.err('Önek uzunluğu 0 ile 128 arasında bir tam sayı olmalı (örn. /64).');
      onek = '/' + Number(p);
      s = s.slice(0, egik);
    }
    if (s.includes('%')) h.err('Bölge (zone) eki içeren adresler desteklenmiyor; % işaretinden sonrasını silip deneyin.');
    // Sonda gömülü IPv4 varsa iki gruba çevir
    if (s.includes('.')) {
      const k = s.lastIndexOf(':');
      if (k === -1) h.err('Bu bir IPv4 adresine benziyor; IPv6 adresi iki nokta ile ayrılmış gruplardan oluşur.');
      const ok = s.slice(k + 1).split('.');
      if (ok.length !== 4 || ok.some((o) => !/^\d{1,3}$/.test(o) || Number(o) > 255)) h.err('Adresin sonundaki IPv4 bölümü geçersiz; 0-255 arası dört sayı olmalı.');
      const n = ok.map(Number);
      s = s.slice(0, k + 1) + ((n[0] << 8) | n[1]).toString(16) + ':' + ((n[2] << 8) | n[3]).toString(16);
    }
    if (!/^[0-9a-f:]+$/.test(s)) h.err('IPv6 adresi yalnızca 0-9, a-f karakterleri ve iki nokta içerebilir.');
    const cift = s.split('::');
    if (cift.length > 2) h.err('Çift iki nokta (::) bir adreste yalnızca bir kez kullanılabilir.');
    const parcala = (t) => (t === '' ? [] : t.split(':'));
    let grup;
    if (cift.length === 2) {
      const sol = parcala(cift[0]);
      const sag = parcala(cift[1]);
      if (sol.length + sag.length > 7) h.err('Çift iki nokta en az bir sıfır grubunun yerini tutmalı; adreste fazla grup var.');
      grup = [...sol, ...new Array(8 - sol.length - sag.length).fill('0'), ...sag];
    } else {
      grup = parcala(s);
      if (grup.length !== 8) h.err(`IPv6 adresi 8 gruptan oluşur; ${grup.length} grup bulundu. Eksik sıfır gruplarını :: ile gösterebilirsiniz.`);
    }
    if (grup.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) h.err('Her grup 1 ile 4 arasında onaltılık haneden oluşmalı.');
    const say = grup.map((g) => parseInt(g, 16));
    const tam = say.map((x) => x.toString(16).padStart(4, '0')).join(':');
    const sifirsiz = say.map((x) => x.toString(16)).join(':');
    // En uzun sıfır dizisi (en az 2 grup), eşitlikte ilki
    let enBas = -1;
    let enUz = 0;
    let bas = -1;
    for (let i = 0; i <= 8; i++) {
      if (i < 8 && say[i] === 0) { if (bas === -1) bas = i; }
      else if (bas !== -1) {
        if (i - bas > enUz) { enUz = i - bas; enBas = bas; }
        bas = -1;
      }
    }
    let kisa;
    if (enUz >= 2) {
      kisa = say.slice(0, enBas).map((x) => x.toString(16)).join(':') + '::' + say.slice(enBas + enUz).map((x) => x.toString(16)).join(':');
    } else kisa = sifirsiz;
    let tur;
    const hepsiSifir = say.every((x) => x === 0);
    if (hepsiSifir) tur = 'Belirtilmemiş adres (::)';
    else if (say.slice(0, 7).every((x) => x === 0) && say[7] === 1) tur = 'Geri döngü (loopback, ::1)';
    else if (say.slice(0, 5).every((x) => x === 0) && say[5] === 0xffff) tur = 'IPv4 eşlemeli adres (::ffff:0:0/96)';
    else if ((say[0] & 0xff00) === 0xff00) tur = 'Çoklu yayın (multicast, ff00::/8)';
    else if ((say[0] & 0xffc0) === 0xfe80) tur = 'Bağlantı yerel (link-local, fe80::/10)';
    else if ((say[0] & 0xfe00) === 0xfc00) tur = 'Benzersiz yerel (unique local, fc00::/7)';
    else if (say[0] === 0x2001 && say[1] === 0x0db8) tur = 'Belgeleme amaçlı (2001:db8::/32)';
    else if ((say[0] & 0xe000) === 0x2000) tur = 'Küresel tekil yayın (global unicast, 2000::/3)';
    else tur = 'Ayrılmış ya da özel amaçlı aralık';
    return {
      rows: [
        ['Kısaltılmış', kisa + onek],
        ['Genişletilmiş', tam + onek],
        ['Yalnızca baştaki sıfırlar atılmış', sifirsiz + onek],
        ['Adres türü', tur],
        ['Sıkıştırılan sıfır grubu', enUz >= 2 ? `${enUz} grup` : 'Yok'],
      ],
      note: 'Kısaltma RFC 5952 önerisine göre yapılır: küçük harf, baştaki sıfırlar atılır, en uzun sıfır dizisi :: ile gösterilir.',
    };
  },
  cases: [
    { in: { adres: '2001:0db8:0000:0000:0000:ff00:0042:8329' }, out: { 'Kısaltılmış': '2001:db8::ff00:42:8329', 'Genişletilmiş': '2001:0db8:0000:0000:0000:ff00:0042:8329', 'Sıkıştırılan sıfır grubu': '3 grup' } },
    { in: { adres: '2001:db8::1' }, out: { 'Genişletilmiş': '2001:0db8:0000:0000:0000:0000:0000:0001', 'Kısaltılmış': '2001:db8::1', 'Adres türü': 'Belgeleme amaçlı (2001:db8::/32)' } },
    { in: { adres: '::1' }, out: { 'Genişletilmiş': '0000:0000:0000:0000:0000:0000:0000:0001', 'Adres türü': 'Geri döngü (loopback, ::1)' } },
    { in: { adres: '2001:db8:0:0:1:0:0:1' }, out: { 'Kısaltılmış': '2001:db8::1:0:0:1' } },
    { in: { adres: '2001:db8:0:1:1:1:1:1' }, out: { 'Kısaltılmış': '2001:db8:0:1:1:1:1:1', 'Sıkıştırılan sıfır grubu': 'Yok' } },
    { in: { adres: '::ffff:192.168.1.1' }, out: { 'Kısaltılmış': '::ffff:c0a8:101', 'Genişletilmiş': '0000:0000:0000:0000:0000:ffff:c0a8:0101', 'Adres türü': 'IPv4 eşlemeli adres (::ffff:0:0/96)' } },
    { in: { adres: 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329/64' }, out: { 'Kısaltılmış': 'fe80::202:b3ff:fe1e:8329/64', 'Adres türü': 'Bağlantı yerel (link-local, fe80::/10)' } },
    { in: { adres: '::' }, out: { 'Kısaltılmış': '::', 'Genişletilmiş': '0000:0000:0000:0000:0000:0000:0000:0000' } },
    { in: { adres: '2001:db8::1::2' }, error: true },
    { in: { adres: '2001:db8:1:2:3' }, error: true },
    { in: { adres: '2001:dg8::1' }, error: true },
    { in: { adres: '' }, error: true },
  ],
  howto: [
    'IPv6 adresini "IPv6 adresi" alanına yapıştırın. Büyük ya da küçük harf, kısa ya da tam yazım fark etmez.',
    'Adresin sonunda /64 gibi bir önek uzunluğu varsa silmenize gerek yoktur; sonuçlara aynen eklenir.',
    '"Çevir" düğmesine basın. İlk satırda standart kısa yazım, ikinci satırda 39 karakterlik tam yazım görünür.',
    'Yapılandırma dosyasına, güvenlik duvarı kuralına ya da kayıt araması için ihtiyacınız olan biçimi kopyalayın.',
  ],
  sections: [
    { h: 'IPv6 adresi nasıl yazılır?', p: [
      'Bir IPv6 adresi 128 bit uzunluğundadır. Okunabilsin diye 16 bitlik sekiz gruba bölünür, her grup dört onaltılık haneyle yazılır ve gruplar iki nokta ile ayrılır. Tam yazım bu yüzden 32 hane ve 7 iki nokta, yani 39 karakter tutar: <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code>.',
      'Bu kadar uzun bir dizgiyi elle yazmak hataya çok açık olduğundan standart iki kısaltma yoluna izin verir. Birincisi, her grubun <strong>başındaki sıfırlar</strong> atılabilir: <code>0db8</code> yerine <code>db8</code>, <code>0042</code> yerine <code>42</code>, <code>0000</code> yerine <code>0</code>. İkincisi, art arda gelen tümü sıfır gruplar tek bir <strong>çift iki nokta</strong> (<code>::</code>) ile değiştirilebilir. Yukarıdaki adres böylece <code>2001:db8::ff00:42:8329</code> olur.',
    ] },
    { h: 'Çift iki nokta neden yalnızca bir kez kullanılır?', p: [
      'Çift iki nokta "burada sekize tamamlayacak kadar sıfır grubu var" anlamına gelir. Adreste bir tane olduğunda eksik grup sayısı kesin olarak hesaplanır: sekizden yazılı grup sayısı çıkarılır. İki tane olsaydı sıfırların hangi boşluğa kaç tane düşeceği bilinemezdi. Örneğin <code>2001:db8::1::2</code> yazımında dört eksik grup iki boşluğa farklı biçimlerde dağıtılabilir; bu yüzden araç böyle bir girdiyi geçersiz sayar.',
    ] },
    { h: 'RFC 5952 kuralları: tek doğru kısa yazım', p: [
      'Kısaltma kuralları esnek bırakıldığında aynı adres onlarca farklı biçimde yazılabilir; bu da kayıt dosyalarında arama yapmayı, iki listeyi karşılaştırmayı ve denetimi zorlaştırır. RFC 5952 bu yüzden metin gösterimi için tek bir biçim önerir. Araç kısaltılmış sonucu bu kurallara göre üretir:',
    ], ul: [
      'Onaltılık harfler <strong>küçük harfle</strong> yazılır (<code>FE80</code> değil <code>fe80</code>).',
      'Her gruptaki baştaki sıfırların tamamı atılır; tümü sıfır olan grup tek <code>0</code> olarak kalır.',
      'Çift iki nokta, <strong>en uzun</strong> sıfır grubu dizisinin yerine konur.',
      'Aynı uzunlukta iki dizi varsa <strong>soldaki ilk dizi</strong> sıkıştırılır.',
      'Tek başına duran bir sıfır grubu çift iki nokta ile kısaltılmaz; <code>0</code> olarak yazılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Eşit uzunlukta iki sıfır dizisi:</strong> <code>2001:db8:0:0:1:0:0:1</code> adresinde ikişer gruptan oluşan iki sıfır dizisi vardır. Kurala göre soldaki sıkıştırılır ve sonuç <code>2001:db8::1:0:0:1</code> olur; sağdaki sıfırlar açık yazılır.',
      '<strong>Tek sıfır grubu:</strong> <code>2001:db8:0:1:1:1:1:1</code> adresinde yalnızca bir sıfır grubu bulunur. Bunu <code>::</code> ile değiştirmek karakter kazandırmaz ve standartça önerilmez; araç adresi olduğu gibi bırakır ve "Sıkıştırılan sıfır grubu" satırında "Yok" yazar.',
      '<strong>Genişletme:</strong> <code>2001:db8::1</code> adresinde üç grup yazılıdır, demek ki çift iki nokta beş sıfır grubunun yerini tutar. Tam yazım <code>2001:0db8:0000:0000:0000:0000:0000:0001</code> olur.',
      '<strong>Gömülü IPv4:</strong> <code>::ffff:192.168.1.1</code> gibi yazımlarda son 32 bit noktalı ondalık gösterilir. 192 ve 168 birlikte <code>c0a8</code>, 1 ve 1 birlikte <code>0101</code> eder; araç bunu <code>::ffff:c0a8:101</code> biçiminde onaltılık gruplara çevirir.',
    ] },
    { h: 'Hangi biçim nerede işe yarar?', p: [
      'Kısa yazım insanlar içindir: belge, e-posta, DNS kaydı, sunucu yapılandırması ve güvenlik duvarı kuralı gibi yerlerde okunması ve yazılması kolaydır. Tam yazım ise makinelerle çalışırken değerlidir. Adresleri metin olarak sıralamak, sabit genişlikli sütunlarda hizalamak, ters DNS (ip6.arpa) kaydı hazırlarken haneleri tek tek ters çevirmek ya da iki adresin ilk 64 bitinin aynı olup olmadığını gözle karşılaştırmak tam yazımla çok daha kolaydır.',
      'Web adreslerinde IPv6 adresi köşeli parantez içine alınır, çünkü iki nokta aynı zamanda kapı numarasını ayırır: <code>[2001:db8::1]:8080</code> gibi. Araç köşeli parantezle yapıştırılan adresi de kabul eder; parantezleri atıp çevirir.',
    ] },
    { h: 'Adres türleri', p: [
      'Sonuçtaki "Adres türü" satırı, adresin ilk bitlerine bakılarak belirlenir. En sık karşılaşılanlar şunlardır:',
    ], ul: [
      '<code>::1</code> – geri döngü; IPv4\'teki 127.0.0.1 karşılığıdır.',
      '<code>fe80::/10</code> – bağlantı yerel; her arayüzde kendiliğinden oluşur, yönlendirici ötesine geçmez.',
      '<code>fc00::/7</code> – benzersiz yerel; kurum içi ağlar için ayrılmıştır (uygulamada <code>fd</code> ile başlar).',
      '<code>2000::/3</code> – küresel tekil yayın; internette yönlendirilen adresler.',
      '<code>ff00::/8</code> – çoklu yayın; bir gruba gönderim için kullanılır.',
      '<code>2001:db8::/32</code> – belge ve örneklerde kullanılmak üzere ayrılmış, internette yönlendirilmeyen aralık.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, grupların <em>sonundaki</em> sıfırları atmaktır. <code>2001:db80</code> ile <code>2001:db8</code> farklı adreslerdir; yalnızca baştaki sıfırlar atılabilir. İkinci yaygın hata, bir grupta dörtten fazla hane yazmak ya da g, h gibi onaltılık olmayan harfler kullanmaktır. Araç bu durumlarda hangi kuralın bozulduğunu söyleyen bir hata mesajı verir.',
      'Araç adresin biçimini denetler; adresin gerçekten bir cihaza atanmış olup olmadığını, erişilebilirliğini ya da hangi kuruma ait olduğunu sorgulamaz, çünkü hiçbir ağ isteği yapmaz. <code>fe80::1%eth0</code> gibi bölge eki içeren yazımlar da desteklenmez; yüzde işaretinden sonrasını silerek deneyebilirsiniz.',
    ] },
  ],
  faq: [
    ['IPv6 adresi nasıl kısaltılır?', 'Önce her gruptaki baştaki sıfırlar atılır, sonra art arda gelen en uzun sıfır grubu dizisi çift iki nokta (::) ile değiştirilir. Örneğin 2001:0db8:0000:0000:0000:ff00:0042:8329 adresi 2001:db8::ff00:42:8329 olur.'],
    ['Kısaltılmış IPv6 adresi nasıl genişletilir?', 'Yazılı grup sayısı sekizden çıkarılır; fark kadar 0000 grubu çift iki noktanın yerine konur ve her grup sola sıfır eklenerek dört haneye tamamlanır. 2001:db8::1 için beş sıfır grubu eklenir.'],
    ['Bir adreste neden iki tane :: olamaz?', 'Çünkü eksik sıfır gruplarının hangi boşluğa kaç tane düşeceği belirsiz kalır ve adres tek anlamlı olmaktan çıkar. Standart bu nedenle çift iki noktaya yalnızca bir kez izin verir.'],
    ['Kısa ve tam yazım aynı adres midir?', 'Evet. İkisi de aynı 128 bitlik değeri gösterir; fark yalnızca metin gösterimindedir. Ağ cihazları adresi ikili olarak sakladığından hangi yazımı kullandığınız çalışma biçimini değiştirmez.'],
    ['Büyük harfle yazılmış IPv6 adresi geçerli mi?', 'Geçerlidir; onaltılık haneler büyük-küçük harfe duyarlı değildir. Ancak RFC 5952 metin gösteriminde küçük harf önerir, bu yüzden araç sonuçları küçük harfle verir.'],
    ['Tek bir sıfır grubu neden :: ile kısaltılmıyor?', 'Tek grubun yerine çift iki nokta koymak kısalık sağlamaz ve standartça önerilmez. Bu durumda grup yalnızca 0 olarak yazılır; çift iki nokta en az iki gruptan oluşan diziler için kullanılır.'],
    ['Önek uzunluğu (/64) girebilir miyim?', 'Evet. Adresin sonuna /0 ile /128 arasında bir önek ekleyebilirsiniz; araç öneki denetler ve kısaltılmış, genişletilmiş sonuçların sonuna aynen ekler. Ağ adresi hesabı ise yapılmaz.'],
    ['Yazdığım adres bir sunucuya gönderiliyor mu?', 'Hayır. Çevirme işlemi tamamen tarayıcınızda çalışan kodla yapılır; adres hiçbir yere iletilmez, kaydedilmez ve herhangi bir ağ sorgusu yapılmaz.'],
  ],
  related: ['ip-alt-ag-hesapla', 'cidr-hesapla', 'ip-ikili-cevir', 'ip-ondalik-cevir', 'mac-adresi-bicimlendir', 'alt-ag-maskesi-cevir'],
};
