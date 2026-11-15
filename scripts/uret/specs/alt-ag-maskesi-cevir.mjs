export default {
  slug: 'alt-ag-maskesi-cevir',
  title: 'Alt Ağ Maskesi CIDR Çevirici',
  h1Tail: 'maske ↔ /önek',
  pageTitle: 'Alt Ağ Maskesi CIDR Çevirici – 255.255.255.0 Kaç Bit? /24 Hangi Maske?',
  description: 'Alt ağ maskesini CIDR önekine, CIDR önekini maskeye çevirin. Joker (wildcard) maske, ikili gösterim, toplam adres ve kullanılabilir cihaz sayısı birlikte.',
  card: 'Alt ağ maskesini /önek biçimine ya da tersine çevirin; joker maske, ikili yazım ve host sayısı da çıkar.',
  category: 'gelistirici',
  keywords: ['alt ağ maskesi cidr', 'subnet mask çevirici', '255.255.255.0 kaç bit', 'cidr maske tablosu', 'wildcard maske hesaplama', '/24 alt ağ maskesi', 'netmask cidr çevirme', 'önek uzunluğu maske'],
  lead: 'Noktalı ondalık bir alt ağ maskesini (<code>255.255.255.0</code>), CIDR önekini (<code>/24</code>) ya da joker maskeyi (<code>0.0.0.255</code>) yazın; araç hangisini yazdığınızı kendisi anlar ve diğer gösterimleri, ikili açılımı ve o ağa sığan adres sayısını verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Maske ya da CIDR öneki', type: 'text', placeholder: 'Örn. 255.255.255.0 ya da /24', hint: 'Alt ağ maskesi, 0-32 arası önek ya da joker (wildcard) maske yazabilirsiniz.' },
  ],
  compute(v, h) {
    const s = String(v.deger ?? '').trim();
    if (s === '') h.err('"Maske ya da CIDR öneki" alanını doldurun.');
    let onek;
    let girdi;
    if (s.includes('.')) {
      const ok = s.split('.');
      if (ok.length !== 4 || ok.some((o) => !/^\d{1,3}$/.test(o) || Number(o) > 255)) h.err('Maske, noktayla ayrılmış 0-255 arası dört sayıdan oluşmalı (örn. 255.255.255.0).');
      const n = ok.map(Number);
      const deger = ((n[0] * 256 + n[1]) * 256 + n[2]) * 256 + n[3];
      const ikili = deger.toString(2).padStart(32, '0');
      if (/^1*0*$/.test(ikili)) { onek = ikili.indexOf('0') === -1 ? 32 : ikili.indexOf('0'); girdi = 'Alt ağ maskesi'; }
      else if (/^0*1*$/.test(ikili)) { onek = ikili.indexOf('1'); girdi = 'Joker (wildcard) maske'; }
      else h.err('Bu geçerli bir alt ağ maskesi değil: maskede 1 bitleri solda kesintisiz olmalı (örn. 255.255.240.0). 255.255.0.255 gibi aralıklı maskeler kullanılamaz.');
    } else {
      const t = s.replace(/^\//, '').trim();
      if (!/^\d{1,2}$/.test(t) || Number(t) > 32) h.err('CIDR öneki 0 ile 32 arasında bir tam sayı olmalı (örn. /24).');
      onek = Number(t);
      girdi = 'CIDR öneki';
    }
    const ikili = '1'.repeat(onek) + '0'.repeat(32 - onek);
    const sekizli = [0, 8, 16, 24].map((i) => ikili.slice(i, i + 8));
    const maske = sekizli.map((b) => parseInt(b, 2));
    const joker = maske.map((m) => 255 - m);
    const toplam = 2 ** (32 - onek);
    const kullan = onek === 32 ? 1 : onek === 31 ? 2 : toplam - 2;
    const sinif = onek === 8 ? 'A sınıfı varsayılan maskesi' : onek === 16 ? 'B sınıfı varsayılan maskesi' : onek === 24 ? 'C sınıfı varsayılan maskesi' : 'Sınıfsız (CIDR) maske';
    return {
      rows: [
        ['CIDR öneki', '/' + onek],
        ['Alt ağ maskesi', maske.join('.')],
        ['Joker (wildcard) maske', joker.join('.')],
        ['İkili maske', sekizli.join('.')],
        ['Onaltılık maske', '0x' + maske.map((m) => m.toString(16).padStart(2, '0')).join('')],
        ['Ağ biti / host biti', `${onek} / ${32 - onek}`],
        ['Toplam adres', h.fmt(toplam, 0)],
        ['Kullanılabilir cihaz adresi', h.fmt(kullan, 0)],
        ['Girdi türü', girdi],
        ['Sınıf karşılığı', sinif],
      ],
      note: onek >= 31 ? '/31 noktadan noktaya bağlantılarda iki adresin de kullanıldığı, /32 ise tek bir cihazı gösteren özel durumlardır.' : 'Kullanılabilir adres sayısı, ağ adresi ve yayın (broadcast) adresi düşülerek hesaplanır.',
    };
  },
  cases: [
    { in: { deger: '255.255.255.0' }, out: { 'CIDR öneki': '/24', 'Joker (wildcard) maske': '0.0.0.255', 'Toplam adres': '256', 'Kullanılabilir cihaz adresi': '254' } },
    { in: { deger: '/26' }, out: { 'Alt ağ maskesi': '255.255.255.192', 'Joker (wildcard) maske': '0.0.0.63', 'İkili maske': '11111111.11111111.11111111.11000000', 'Kullanılabilir cihaz adresi': '62' } },
    { in: { deger: '16' }, out: { 'Alt ağ maskesi': '255.255.0.0', 'Toplam adres': '65.536', 'Kullanılabilir cihaz adresi': '65.534', 'Sınıf karşılığı': 'B sınıfı varsayılan maskesi' } },
    { in: { deger: '0.0.0.3' }, out: { 'CIDR öneki': '/30', 'Alt ağ maskesi': '255.255.255.252', 'Kullanılabilir cihaz adresi': '2', 'Girdi türü': 'Joker (wildcard) maske' } },
    { in: { deger: '255.255.254.0' }, out: { 'CIDR öneki': '/23', 'Toplam adres': '512', 'Kullanılabilir cihaz adresi': '510' } },
    { in: { deger: '/20' }, out: { 'Alt ağ maskesi': '255.255.240.0', 'Joker (wildcard) maske': '0.0.15.255', 'Toplam adres': '4.096', 'Onaltılık maske': '0xfffff000' } },
    { in: { deger: '/32' }, out: { 'Alt ağ maskesi': '255.255.255.255', 'Toplam adres': '1', 'Kullanılabilir cihaz adresi': '1' } },
    { in: { deger: '/31' }, out: { 'Alt ağ maskesi': '255.255.255.254', 'Kullanılabilir cihaz adresi': '2' } },
    { in: { deger: '255.255.0.255' }, error: true },
    { in: { deger: '33' }, error: true },
    { in: { deger: '255.255.256.0' }, error: true },
    { in: { deger: '' }, error: true },
  ],
  howto: [
    'Elinizdeki değeri alana yazın: <code>255.255.255.0</code> gibi bir maske, <code>/24</code> ya da yalnızca <code>24</code> gibi bir önek ya da <code>0.0.0.255</code> gibi bir joker maske.',
    '"Çevir" düğmesine basın. Araç girdinin türünü kendisi belirler ve "Girdi türü" satırında gösterir.',
    'İlk üç satırdan ihtiyacınız olan gösterimi alın: CIDR öneki, noktalı ondalık maske ya da joker maske.',
    'Ağa kaç cihaz sığacağını görmek için "Kullanılabilir cihaz adresi" satırına bakın; yetmiyorsa öneki bir küçültüp yeniden deneyin.',
  ],
  sections: [
    { h: 'Alt ağ maskesi ne işe yarar?', p: [
      'Bir IPv4 adresi 32 bittir ve iki parçadan oluşur: ağın kendisini gösteren <strong>ağ bölümü</strong> ile o ağdaki cihazı gösteren <strong>host bölümü</strong>. Adresin kaçıncı bitine kadar ağ, nereden sonra host olduğunu alt ağ maskesi söyler. Maskede 1 olan bitler ağ bölümünü, 0 olan bitler host bölümünü işaretler. Bir cihaz, başka bir adrese paket gönderirken kendi adresiyle hedef adresi maskeden geçirir; ağ bölümleri aynıysa paketi doğrudan gönderir, farklıysa varsayılan ağ geçidine yollar.',
      'Maskede 1 bitleri her zaman solda ve kesintisizdir. Bu yüzden bir maskeyi tarif etmek için "soldan kaç bit 1" demek yeterlidir. CIDR gösterimi tam olarak budur: <code>/24</code>, maskenin ilk 24 bitinin 1 olduğunu söyler.',
    ] },
    { h: 'Maskeden CIDR önekine, önekten maskeye', p: [
      'Maskeyi öneke çevirmek için her sekizliyi ikiliye açıp 1\'leri sayarsınız. <code>255.255.255.192</code> maskesinde ilk üç sekizli 8\'er bit 1 içerir (24 bit); 192 ise ikilide <code>11000000</code> olduğundan 2 bit daha ekler. Toplam 26, yani <code>/26</code>.',
      'Tersine giderken öneki 8\'e bölersiniz. <code>/20</code> için 20 = 8 + 8 + 4 olduğundan ilk iki sekizli 255, üçüncü sekizlinin ilk 4 biti 1\'dir: <code>11110000</code> = 240. Dördüncü sekizli 0 kalır ve maske <code>255.255.240.0</code> olur. Bir sekizlide görülebilecek değerler sınırlıdır: 0, 128, 192, 224, 240, 248, 252, 254 ve 255. Maskenizde bunların dışında bir sayı varsa (örneğin 250) o maske geçersizdir.',
    ] },
    { h: 'Joker (wildcard) maske nedir?', p: [
      'Joker maske, alt ağ maskesinin bit bit tersidir: her sekizli 255\'ten çıkarılarak bulunur. <code>255.255.255.0</code> maskesinin joker karşılığı <code>0.0.0.255</code>, <code>255.255.240.0</code> maskesininki <code>0.0.15.255</code> olur. Yönlendiricilerde erişim denetim listeleri (ACL) ve bazı yönlendirme protokolü yapılandırmaları maske yerine joker maske ister; "0 olan bitler eşleşmeli, 1 olan bitler serbest" mantığıyla çalışır.',
      'Araç joker maske yazdığınızda bunu tanır. Örneğin <code>0.0.0.3</code> girdisi <code>/30</code> önekine ve <code>255.255.255.252</code> maskesine karşılık gelir; bu, iki yönlendirici arasındaki bağlantılarda sık kullanılan 4 adreslik ağdır.',
    ] },
    { h: 'Adres ve cihaz sayısı nasıl hesaplanır?', p: [
      'Host bölümünde kalan bit sayısı <em>h</em> = 32 − önek ise ağdaki toplam adres sayısı 2<sup>h</sup> olur. Bunlardan ilki ağ adresi, sonuncusu yayın (broadcast) adresidir ve cihazlara atanmaz; kullanılabilir adres sayısı bu yüzden 2<sup>h</sup> − 2\'dir. <code>/24</code> için 2<sup>8</sup> = 256 adres ve 254 cihaz; <code>/23</code> için 512 adres ve 510 cihaz; <code>/16</code> için 65.536 adres ve 65.534 cihaz çıkar.',
      'İki istisna vardır. <code>/31</code> ağında yalnızca iki adres bulunur ve noktadan noktaya bağlantılarda ikisi de kullanılabilir. <code>/32</code> ise tek bir adresi gösterir; yönlendirme tablolarında tek bir cihaza giden yol ya da geri döngü arayüzü için kullanılır. Araç bu iki durumda sırasıyla 2 ve 1 değerini verir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>/8</strong> – 255.0.0.0 – 16.777.216 adres',
      '<strong>/16</strong> – 255.255.0.0 – 65.536 adres',
      '<strong>/20</strong> – 255.255.240.0 – 4.096 adres',
      '<strong>/22</strong> – 255.255.252.0 – 1.024 adres',
      '<strong>/23</strong> – 255.255.254.0 – 512 adres',
      '<strong>/24</strong> – 255.255.255.0 – 256 adres, 254 cihaz',
      '<strong>/25</strong> – 255.255.255.128 – 128 adres, 126 cihaz',
      '<strong>/26</strong> – 255.255.255.192 – 64 adres, 62 cihaz',
      '<strong>/27</strong> – 255.255.255.224 – 32 adres, 30 cihaz',
      '<strong>/28</strong> – 255.255.255.240 – 16 adres, 14 cihaz',
      '<strong>/29</strong> – 255.255.255.248 – 8 adres, 6 cihaz',
      '<strong>/30</strong> – 255.255.255.252 – 4 adres, 2 cihaz',
    ] },
    { h: 'Uygulamada nerede karşınıza çıkar?', p: [
      'Ev ve küçük ofis modemlerinin çoğu <code>192.168.1.0/24</code> benzeri bir ağ kurar; ağ ayarlarında maske olarak 255.255.255.0 görürsünüz. Bir ofiste cihaz sayısı 254\'ü aşacaksa maskeyi 255.255.254.0 (/23) yapmak adres alanını ikiye katlar. Kamera sistemlerinde, yazıcı ağlarında ya da misafir kablosuz ağında ise tam tersine /27 ya da /28 gibi küçük ağlar tercih edilir.',
      'Bulut sağlayıcılarının sanal ağ ayarları, güvenlik duvarı kuralları ve VPN yapılandırmaları neredeyse her zaman CIDR gösterimi ister. Eski cihazların arayüzleri ve işletim sistemlerinin ağ pencereleri ise noktalı ondalık maske bekler. İki dünya arasında gidip gelirken bu çevirici zaman kazandırır.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Araç yalnızca maskeyi çevirir; belirli bir IP adresi için ağ adresi, yayın adresi ve ilk-son cihaz adresini hesaplamaz. Bunun için ilgili araçlardaki alt ağ hesaplayıcıyı kullanabilirsiniz. Yalnızca IPv4 maskeleri desteklenir; IPv6\'da noktalı maske kullanılmaz, önek uzunluğu doğrudan yazılır.',
      '<code>0.0.0.0</code> girdisi hem /0 maskesi hem de /32\'nin joker maskesi olarak okunabilir; araç bunu maske (/0) kabul eder. Sonuçlar bilgilendirme amaçlıdır; canlı bir ağda maske değiştirmeden önce adres planınızı ve bağlı cihazların ayarlarını gözden geçirin.',
    ] },
  ],
  faq: [
    ['255.255.255.0 kaç bittir?', '255.255.255.0 maskesi 24 bittir ve CIDR gösteriminde /24 olarak yazılır. Bu ağda toplam 256 adres bulunur; ağ ve yayın adresi düşüldüğünde 254 cihaza adres verilebilir.'],
    ['/24 ile /16 arasındaki fark nedir?', '/24 ağında adresin ilk üç sekizlisi ağı, son sekizlisi cihazı gösterir ve 256 adres vardır. /16 ağında ilk iki sekizli ağı gösterir; son iki sekizli cihazlara kalır ve 65.536 adres bulunur.'],
    ['Joker maske ile alt ağ maskesi aynı şey mi?', 'Hayır, birbirinin tersidir. Joker maske, alt ağ maskesindeki her sekizlinin 255\'ten çıkarılmasıyla bulunur. 255.255.255.0 maskesinin joker karşılığı 0.0.0.255\'tir ve çoğunlukla erişim listelerinde kullanılır.'],
    ['255.255.0.255 neden geçersiz?', 'Geçerli bir alt ağ maskesinde 1 bitleri solda kesintisiz, 0 bitleri sağda kesintisiz olmalıdır. 255.255.0.255 maskesinde sıfırların ardından yeniden 1\'ler geldiği için ağ ve host bölümü ayrılamaz.'],
    ['Kullanılabilir adres sayısı neden toplamdan 2 eksik?', 'Her alt ağın ilk adresi ağın kendisini, son adresi ise yayın (broadcast) adresini gösterir. Bu iki adres cihazlara atanmadığı için kullanılabilir sayı toplam adresin 2 eksiğidir.'],
    ['/30 maskesi ne zaman kullanılır?', '/30, yani 255.255.255.252, toplam 4 adres ve 2 kullanılabilir adres içerir. İki yönlendiriciyi ya da iki cihazı birbirine bağlayan noktadan noktaya hatlarda adres israfını önlemek için tercih edilir.'],
    ['A, B, C sınıfı maskeler hâlâ geçerli mi?', 'Sınıflı adresleme yerini uzun süre önce CIDR\'a bırakmıştır; ağ büyüklüğü artık önekle serbestçe belirlenir. Yine de /8, /16 ve /24 maskeleri alışkanlıkla A, B ve C sınıfı varsayılan maskeleri olarak anılır.'],
    ['Yazdığım maske ya da ağ bilgisi kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['ip-alt-ag-hesapla', 'cidr-hesapla', 'ip-ikili-cevir', 'ip-ondalik-cevir', 'ipv6-kisalt-genislet', 'mac-adresi-bicimlendir'],
};
