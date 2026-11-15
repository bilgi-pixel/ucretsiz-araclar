export default {
  slug: 'cidr-hesapla',
  title: 'CIDR Aralığı Hesaplama',
  h1Tail: 'IP bloğunun ilk ve son adresi',
  pageTitle: 'CIDR Aralığı Hesaplama – IP Bloğu Başlangıç ve Bitiş Adresi',
  description: 'CIDR gösterimindeki bir IPv4 bloğunun (ör. 10.0.0.0/22) ilk ve son adresini, toplam adres sayısını, maskesini ve kullanılabilir cihaz aralığını hesaplayın.',
  card: 'Bir CIDR bloğunun (ör. 192.168.1.0/24) adres aralığını, adres sayısını, maskesini ve yayın adresini bulun.',
  category: 'gelistirici',
  keywords: ['cidr hesaplama', 'cidr aralığı', 'ip aralığı hesaplama', 'cidr to ip range', '/24 kaç ip', 'ip bloğu hesaplama', 'cidr notasyonu', 'güvenlik duvarı ip aralığı'],
  lead: 'Bir IPv4 bloğunu <strong>adres/önek</strong> biçiminde (örneğin <code>192.168.1.0/24</code>) yazın; araç bloğun ilk ve son adresini, içerdiği toplam adres sayısını, alt ağ maskesini, joker maskesini ve cihazlara verilebilecek aralığı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'cidr', label: 'CIDR bloğu', type: 'text', placeholder: 'Örn. 192.168.1.0/24', hint: 'IPv4 adresi, eğik çizgi ve 0–32 arası önek uzunluğu. Adres bloğun içindeki herhangi bir adres olabilir.', wide: true },
  ],
  compute(v, h) {
    const t = String(v.cidr ?? '').trim().replace(/\s+/g, '');
    if (t === '') h.err('"CIDR bloğu" alanını doldurun (örn. 192.168.1.0/24).');
    const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/.exec(t);
    if (!m) {
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(t)) h.err('Önek uzunluğu eksik. Adresin sonuna eğik çizgiyle öneki ekleyin (örn. ' + t + '/24).');
      h.err('CIDR bloğunu "a.b.c.d/önek" biçiminde yazın (örn. 10.0.0.0/8). Yalnızca IPv4 desteklenir.');
    }
    const okt = [m[1], m[2], m[3], m[4]].map(Number);
    if (okt.some((o) => o > 255)) h.err('IPv4 adresindeki her bölüm 0 ile 255 arasında olmalı.');
    const p = Number(m[5]);
    if (p > 32) h.err('Önek uzunluğu 0 ile 32 arasında olmalı.');
    const ip = ((okt[0] * 16777216) + (okt[1] * 65536) + (okt[2] * 256) + okt[3]) >>> 0;
    const mask = p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0;
    const wild = (~mask) >>> 0;
    const ag = (ip & mask) >>> 0;
    const yayin = (ag | wild) >>> 0;
    const yaz = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
    const toplam = Math.pow(2, 32 - p);
    let ilk, son, kullan, not;
    if (p === 32) { ilk = ag; son = ag; kullan = 1; not = '/32 tek bir adresi (tek cihazı) gösterir; ağ ve yayın adresi ayrımı yoktur.'; }
    else if (p === 31) { ilk = ag; son = yayin; kullan = 2; not = '/31 blokları noktadan noktaya bağlantılarda kullanılır; iki adres de cihaza verilebilir (RFC 3021).'; }
    else { ilk = (ag + 1) >>> 0; son = (yayin - 1) >>> 0; kullan = toplam - 2; not = 'Kullanılabilir adres sayısı, ağ ve yayın adresi düşülerek bulunur (toplam − 2).'; }
    if (ip !== ag) not += ' Yazdığınız adres bloğun başlangıcı değildi; blok ' + yaz(ag) + '/' + p + ' olarak normalleştirildi.';
    return {
      rows: [
        ['Adres aralığı', yaz(ag) + ' – ' + yaz(yayin)],
        ['Toplam adres', h.fmt(toplam, 0)],
        ['Kullanılabilir cihaz adresi', h.fmt(kullan, 0)],
        ['Ağ adresi', yaz(ag)],
        ['Yayın adresi', yaz(yayin)],
        ['İlk kullanılabilir adres', yaz(ilk)],
        ['Son kullanılabilir adres', yaz(son)],
        ['Alt ağ maskesi', yaz(mask)],
        ['Joker maske', yaz(wild)],
        ['Normalleştirilmiş blok', yaz(ag) + '/' + p],
      ],
      note: not,
    };
  },
  cases: [
    { in: { cidr: '192.168.1.0/24' }, out: { 'Adres aralığı': '192.168.1.0 – 192.168.1.255', 'Toplam adres': '256', 'Kullanılabilir cihaz adresi': '254', 'Alt ağ maskesi': '255.255.255.0' } },
    { in: { cidr: '192.168.10.77/26' }, out: { 'Adres aralığı': '192.168.10.64 – 192.168.10.127', 'Toplam adres': '64', 'İlk kullanılabilir adres': '192.168.10.65', 'Son kullanılabilir adres': '192.168.10.126', 'Normalleştirilmiş blok': '192.168.10.64/26' } },
    { in: { cidr: '10.0.0.0/8' }, out: { 'Adres aralığı': '10.0.0.0 – 10.255.255.255', 'Toplam adres': '16.777.216', 'Kullanılabilir cihaz adresi': '16.777.214', 'Joker maske': '0.255.255.255' } },
    { in: { cidr: '172.16.5.130/20' }, out: { 'Ağ adresi': '172.16.0.0', 'Yayın adresi': '172.16.15.255', 'Toplam adres': '4.096', 'Alt ağ maskesi': '255.255.240.0' } },
    { in: { cidr: '10.1.1.1/32' }, out: { 'Adres aralığı': '10.1.1.1 – 10.1.1.1', 'Toplam adres': '1', 'Kullanılabilir cihaz adresi': '1', 'Alt ağ maskesi': '255.255.255.255' } },
    { in: { cidr: '192.0.2.4/31' }, out: { 'Adres aralığı': '192.0.2.4 – 192.0.2.5', 'Toplam adres': '2', 'Kullanılabilir cihaz adresi': '2' } },
    { in: { cidr: '0.0.0.0/0' }, out: { 'Adres aralığı': '0.0.0.0 – 255.255.255.255', 'Toplam adres': '4.294.967.296', 'Alt ağ maskesi': '0.0.0.0' } },
    { in: { cidr: '192.168.1.0/33' }, error: true },
    { in: { cidr: '256.1.1.1/24' }, error: true },
    { in: { cidr: '192.168.1.0' }, error: true },
  ],
  howto: [
    '"CIDR bloğu" alanına IPv4 adresini, ardından eğik çizgiyi ve önek uzunluğunu yazın: <code>10.20.0.0/16</code> gibi.',
    'Bloğun ilk adresini bilmiyorsanız sorun değil; blok içindeki herhangi bir adresi yazabilirsiniz. Araç bloğu kendisi normalleştirir.',
    '"Hesapla" düğmesine basın. İlk satırda bloğun kapsadığı adres aralığı, altında toplam adres sayısı ve maskeler görünür.',
    'Güvenlik duvarı kuralı, izin listesi ya da yönlendirme tablosu için gereken satırı "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'CIDR gösterimi ne anlatır?', p: [
      'CIDR (Classless Inter-Domain Routing, sınıfsız alanlar arası yönlendirme), bir IP bloğunu tek satırda yazmanın standart yoludur. Eğik çizgiden önceki kısım bir IPv4 adresi, sonraki sayı ise <strong>önek uzunluğudur</strong>: 32 bitlik adresin baştan kaç bitinin ağı tanımladığını söyler. Kalan bitler blok içindeki tek tek adresleri ayırt eder. <code>192.168.1.0/24</code> yazıldığında ilk 24 bit sabittir, son 8 bit serbesttir; bu da 2<sup>8</sup> = 256 adres demektir.',
      'CIDR, 1990\'ların başında eski A, B ve C sınıfı düzenin yerini almak üzere getirilmiştir. Sınıflı düzende bir kuruma ya 256 ya 65.536 ya da 16 milyonu aşkın adres verilebiliyordu; arası yoktu. CIDR ile önek istenen bit sınırına konabildiği için 512, 1.024 ya da 4.096 adreslik bloklar da tanımlanabilir hâle geldi. Bugün internet servis sağlayıcıları, bulut hizmetleri ve kurumsal ağların tamamı bu gösterimi kullanır.',
    ] },
    { h: 'Aralık nasıl hesaplanır?', p: [
      'Hesabın özü iki bit işlemidir. Önce önek uzunluğundan alt ağ maskesi üretilir: baştan önek kadar bit 1, kalanlar 0 yapılır. Adres bu maskeyle VE (AND) işlemine sokulunca serbest bitler sıfırlanır ve <strong>bloğun ilk adresi</strong> (ağ adresi) elde edilir. Serbest bitlerin hepsi 1 yapıldığında ise <strong>bloğun son adresi</strong> (yayın adresi) bulunur. Toplam adres sayısı 2<sup>(32 − önek)</sup> formülüyle hesaplanır.',
      'Çözümlü örnek: <code>192.168.10.77/26</code>. Önek 26 olduğundan son oktetin ilk iki biti ağa, son altı biti cihazlara aittir; blok boyu 2<sup>6</sup> = 64 adrestir. Son oktet 64\'ün katlarında bölünür: 0–63, 64–127, 128–191, 192–255. 77 sayısı 64–127 dilimine düştüğü için blok 192.168.10.64 ile başlar, 192.168.10.127 ile biter. Ağ ve yayın adresi çıkarılınca cihazlara 192.168.10.65 ile 192.168.10.126 arasındaki 62 adres kalır. Maske 255.255.255.192, joker maske 0.0.0.63 olur. Bu değerleri araca aynı girdiyi yazarak doğrulayabilirsiniz.',
    ] },
    { h: 'Sık kullanılan önek uzunlukları', ul: [
      '<strong>/8</strong> – 16.777.216 adres, maske 255.0.0.0 (ör. 10.0.0.0/8 özel ağ bloğu)',
      '<strong>/12</strong> – 1.048.576 adres, maske 255.240.0.0 (172.16.0.0/12 özel ağ bloğu)',
      '<strong>/16</strong> – 65.536 adres, maske 255.255.0.0 (192.168.0.0/16 özel ağ bloğu)',
      '<strong>/20</strong> – 4.096 adres, maske 255.255.240.0',
      '<strong>/22</strong> – 1.024 adres, maske 255.255.252.0',
      '<strong>/24</strong> – 256 adres, maske 255.255.255.0 (ev ve küçük ofis ağlarının alışılmış boyu)',
      '<strong>/27</strong> – 32 adres, maske 255.255.255.224',
      '<strong>/29</strong> – 8 adres, maske 255.255.255.248 (sabit IP paketlerinde sık görülür)',
      '<strong>/30</strong> – 4 adres, 2 kullanılabilir; yönlendiriciler arası bağlantı',
      '<strong>/32</strong> – tek adres; güvenlik duvarında tek bir sunucuyu ya da istemciyi belirtir',
    ] },
    { h: 'Nerede işe yarar?', p: [
      'Bulut sağlayıcılarında sanal ağ ve alt ağ tanımlarken, güvenlik gruplarına ya da güvenlik duvarına izin kuralı yazarken, bir sunucuda yalnızca ofis IP bloğundan gelen bağlantılara izin verirken hep CIDR bloğu istenir. Kuralı yazmadan önce bloğun gerçekte hangi adresleri kapsadığını görmek, yanlışlıkla gereğinden geniş bir aralığa kapı açmayı önler. Örneğin /16 yazmakla /24 yazmak arasında 65.280 adreslik fark vardır.',
      'Tersine bir kullanım da yaygındır: elinizde bir IP adresi ve erişim günlüğünde gördüğünüz bir blok vardır, adresin o bloğa girip girmediğini anlamak istersiniz. Bloğu yazıp aralığın başını ve sonunu görmek bu soruyu hemen yanıtlar. Ağ planlarken de iki alt ağın çakışıp çakışmadığını, aralıklarını karşılaştırarak anlayabilirsiniz.',
    ] },
    { h: 'Özel durumlar: /31, /32 ve /0', p: [
      'Sıradan bir alt ağda ilk adres ağın kendisini, son adres yayın (broadcast) adresini gösterdiği için cihazlara verilmez; kullanılabilir adres sayısı toplamdan iki eksiktir. İki istisna vardır. <strong>/32</strong> tek bir adrestir ve tek cihazı işaret eder. <strong>/31</strong> ise yalnızca iki adres içerir; yönlendiriciler arasındaki noktadan noktaya hatlarda adres israfını önlemek için iki adresin de kullanılmasına izin verilir. Araç bu iki durumda kullanılabilir adres sayısını sırasıyla 1 ve 2 olarak gösterir.',
      '<strong>/0</strong> öneki hiçbir biti sabitlemez; <code>0.0.0.0/0</code> tüm IPv4 adres uzayını, yani 4.294.967.296 adresi kapsar. Yönlendirme tablolarında "varsayılan rota", güvenlik duvarı kurallarında ise "her yerden" anlamına gelir. Bir kurala bu bloğu yazarken gerçekten herkese erişim vermek istediğinizden emin olun.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık hata, bloğun başlangıcı olmayan bir adresi başlangıç sanmaktır. <code>10.0.5.0/22</code> yazıldığında blok 10.0.5.0\'dan değil 10.0.4.0\'dan başlar ve 10.0.7.255\'te biter; çünkü /22 blokları üçüncü oktette dörder dörder ilerler. Bazı sistemler böyle bir girdiyi reddeder, bazıları sessizce düzeltir. Araç normalleştirilmiş bloğu ayrı satırda göstererek farkı görünür kılar.',
      'Bu araç yalnızca IPv4 için çalışır; IPv6 blokları (ör. /64) desteklenmez. Sonuçlar matematiksel hesaptır: bir adresin gerçekte hangi kuruma ait olduğunu, internete açık olup olmadığını ya da ağınızda kullanılıp kullanılmadığını göstermez. Üretim ortamındaki güvenlik duvarı ve yönlendirme değişikliklerini uygulamadan önce ağ yöneticinizle doğrulayın.',
    ] },
  ],
  faq: [
    ['/24 kaç IP adresi eder?', '/24 önekli bir blok 2 üzeri 8, yani 256 adres içerir. İlki ağ adresi, sonuncusu yayın adresi olduğundan cihazlara 254 adres verilebilir. Maskesi 255.255.255.0\'dır.'],
    ['CIDR ile alt ağ maskesi arasındaki fark nedir?', 'İkisi aynı bilgiyi farklı yazar. /24 öneki "ilk 24 bit ağa aittir" der; 255.255.255.0 maskesi de aynı 24 biti 1 olarak gösterir. CIDR daha kısa olduğu için yapılandırma dosyalarında ve bulut panellerinde tercih edilir.'],
    ['Bloğun içindeki herhangi bir adresi yazsam olur mu?', 'Evet. 192.168.10.77/26 yazdığınızda araç bloğun 192.168.10.64/26 olduğunu bulur ve notta bunu belirtir. Aralık, yazdığınız adresin içinde bulunduğu bloğa göre hesaplanır.'],
    ['Joker maske (wildcard) ne işe yarar?', 'Joker maske, alt ağ maskesinin bitlerinin tersidir; /24 için 0.0.0.255 olur. Bazı yönlendirici erişim listelerinde ve yönlendirme protokolü ayarlarında maske yerine bu biçim istenir.'],
    ['Tek bir IP adresini CIDR ile nasıl yazarım?', 'Adresin sonuna /32 ekleyin: 203.0.113.10/32 yalnızca o adresi kapsar. Güvenlik duvarı kurallarında tek bir istemciye izin vermenin standart yolu budur.'],
    ['Önek büyüdükçe blok büyür mü, küçülür mü?', 'Küçülür. Önek her bir arttığında blok yarıya iner: /24 256 adres, /25 128 adres, /26 64 adres içerir. Önek küçüldükçe blok ikiye katlanır: /23 512 adrestir.'],
    ['IPv6 bloklarını hesaplayabilir miyim?', 'Hayır, bu araç yalnızca 32 bitlik IPv4 adresleriyle çalışır. IPv6\'da mantık aynıdır ancak adres 128 bittir ve gösterimi farklıdır.'],
    ['Yazdığım IP adresleri bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız blok sunucuya iletilmez, kaydedilmez. Sayfa açıldıktan sonra bağlantı olmadan da çalışır.'],
  ],
  related: ['ip-alt-ag-hesapla', 'alt-ag-maskesi-cevir', 'ip-ikili-cevir', 'ip-ondalik-cevir', 'ikili-ondalik-cevir'],
};
