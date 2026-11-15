export default {
  slug: 'mach-kmh-cevir',
  title: 'Mach km/h Çevirici',
  h1Tail: 'Mach ↔ km/h',
  pageTitle: 'Mach km/h Çevirici – Mach Sayısı Kaç Kilometre Hız Yapar?',
  description: 'Mach sayısını km/h\'ye, km/h hızı Mach sayısına çevirin. Ses hızını hava sıcaklığına göre hesaplar; deniz seviyesi ve seyir irtifası değerlerini karşılaştırın.',
  card: 'Mach sayısını km/h\'ye, km/h\'yi Mach\'a çevirin; ses hızı hava sıcaklığına göre hesaplanır, m/s ve knot da verilir.',
  category: 'birim',
  keywords: ['mach km/h çevirme', '1 mach kaç km', 'mach kaç kilometre', 'ses hızı kaç km/h', 'mach sayısı hesaplama', 'mach 2 kaç km', 'süpersonik hız', 'ses hızı hesaplama'],
  lead: 'Mach sayısını kilometre/saate ya da km/h cinsinden bir hızı Mach sayısına çevirin. Mach 1, o andaki ses hızıdır ve hava sıcaklığına bağlıdır; 15 °C\'de <strong>yaklaşık 1.225 km/h</strong> eder.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mach', 'Mach → km/h'], ['kmh', 'km/h → Mach']] },
    { id: 'sicaklik', label: 'Hava sıcaklığı (°C)', type: 'number', value: '15', hint: 'Deniz seviyesi standardı 15 °C; yaklaşık 11 km irtifada −56,5 °C.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const t = h.opt(v.sicaklik, 15, 'Hava sıcaklığı');
    if (t <= -273.15) h.err('"Hava sıcaklığı" mutlak sıfırdan (−273,15 °C) büyük olmalı.');
    if (t > 1000) h.err('"Hava sıcaklığı" için 1.000 °C\'yi aşmayan bir değer yazın.');
    // İdeal gaz için ses hızı: a = √(γ·R·T); kuru hava γ = 1,4, R = 287,05287 J/(kg·K)
    const a = Math.sqrt(1.4 * 287.05287 * (t + 273.15)); // m/s
    const aKmh = a * 3.6;
    const mach = v.yon === 'kmh' ? x / aKmh : x;
    const kmh = v.yon === 'kmh' ? x : x * aKmh;
    const f = (n) => h.sig(n, 7);
    const rejim = mach < 0.8 ? 'Ses altı (subsonik)' : mach < 1.2 ? 'Ses hızı civarı (transonik)' : mach < 5 ? 'Ses üstü (süpersonik)' : 'Hipersonik';
    return {
      rows: [
        v.yon === 'kmh' ? ['Mach sayısı', 'Mach ' + f(mach)] : ['Kilometre/saat', f(kmh) + ' km/h'],
        v.yon === 'kmh' ? ['Kilometre/saat', f(kmh) + ' km/h'] : ['Mach sayısı', 'Mach ' + f(mach)],
        ['Bu sıcaklıkta ses hızı', h.fmt(a, 2) + ' m/s (' + h.fmt(aKmh, 1) + ' km/h)'],
        ['Metre/saniye', f(kmh / 3.6) + ' m/s'],
        ['Knot', f(kmh / 1.852) + ' kn'],
        ['Hız rejimi', rejim],
      ],
      note: 'Ses hızı kuru hava için a = √(1,4 × 287,05 × T) bağıntısıyla hesaplanır (T kelvin). Nem ve gerçek atmosfer koşulları küçük sapmalara yol açar.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'mach', sicaklik: '15' }, out: { 'Kilometre/saat': '1.225,058 km/h', 'Bu sıcaklıkta ses hızı': '340,29 m/s (1.225,1 km/h)', 'Hız rejimi': 'Ses hızı civarı (transonik)' } },
    { in: { deger: '900', yon: 'kmh', sicaklik: '-56,5' }, out: { 'Mach sayısı': 'Mach 0,847258', 'Bu sıcaklıkta ses hızı': '295,07 m/s (1.062,3 km/h)' } },
    { in: { deger: '2', yon: 'mach', sicaklik: '15' }, out: { 'Kilometre/saat': '2.450,117 km/h', 'Hız rejimi': 'Ses üstü (süpersonik)' } },
    { in: { deger: '0,85', yon: 'mach', sicaklik: '-56,5' }, out: { 'Kilometre/saat': '902,9127 km/h' } },
    { in: { deger: '1', yon: 'mach', sicaklik: '20' }, out: { 'Kilometre/saat': '1.235,641 km/h', 'Metre/saniye': '343,2337 m/s' } },
    { in: { deger: '1000', yon: 'kmh', sicaklik: '' }, out: { 'Mach sayısı': 'Mach 0,8162876' } },
    { in: { deger: '5', yon: 'mach', sicaklik: '15' }, out: { 'Kilometre/saat': '6.125,292 km/h', 'Hız rejimi': 'Hipersonik' } },
    { in: { deger: '1', yon: 'mach', sicaklik: '-300' }, error: true },
    { in: { deger: 'ses', yon: 'mach', sicaklik: '15' }, error: true },
  ],
  howto: [
    '"Değer" alanına Mach sayısını (örneğin 0,85) ya da km/h cinsinden hızı yazın.',
    '"Çeviri yönü" listesinden "Mach → km/h" veya "km/h → Mach" seçeneğini belirleyin.',
    '"Hava sıcaklığı" alanını uçuşun yapıldığı havanın sıcaklığına göre düzenleyin. Bilmiyorsanız deniz seviyesi için 15, yolcu uçaklarının seyir irtifası için −56,5 yazın.',
    '"Çevir" düğmesine basın. Sonuçta karşılık gelen hız, o sıcaklıktaki ses hızı, m/s ve knot değerleri ile hız rejimi gösterilir.',
    'Farklı irtifaları karşılaştırmak için yalnızca sıcaklığı değiştirip yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Mach sayısı nedir?', p: [
      'Mach sayısı, bir cismin hızının içinde hareket ettiği ortamdaki ses hızına oranıdır. Adını Avusturyalı fizikçi Ernst Mach\'tan alır ve birimsiz bir büyüklüktür: Mach 1 ses hızında, Mach 0,5 ses hızının yarısında, Mach 2 ses hızının iki katında uçmak demektir. Türkçede "mah" diye okunur.',
      'Bu yüzden "1 Mach kaç km/h eder?" sorusunun tek bir cevabı yoktur. Ses hızı sabit değildir; havada esas olarak sıcaklığa bağlıdır. Deniz seviyesinde 15 °C sıcaklıkta ses yaklaşık 340,3 m/s, yani 1.225 km/h hızla yayılır. Yolcu uçaklarının seyrettiği 11 kilometre dolayındaki irtifada hava yaklaşık −56,5 °C\'dir ve ses hızı 295,1 m/s\'ye, yani 1.062 km/h\'ye düşer. Aynı Mach sayısı yukarıda daha düşük bir km/h değerine karşılık gelir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Araç, ses hızını ideal gaz bağıntısıyla hesaplar: <strong>a = √(γ · R · T)</strong>. Burada γ havanın özgül ısılar oranı (1,4), R kuru havanın gaz sabiti (287,05 J/kg·K), T ise kelvin cinsinden mutlak sıcaklıktır (°C + 273,15). Sonuç metre/saniyedir; 3,6 ile çarpılarak km/h\'ye çevrilir.',
      'Ardından dönüşüm tek adımdır: <strong>hız = Mach × ses hızı</strong> ve <strong>Mach = hız ÷ ses hızı</strong>. Formülde basınç ya da irtifanın doğrudan yer almadığına dikkat edin; irtifanın etkisi, yukarı çıkıldıkça havanın soğumasından kaynaklanır. Bu nedenle araç sizden irtifa değil sıcaklık ister.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Deniz seviyesinde Mach 2:</strong> 15 °C için T = 288,15 K ve a = √(1,4 × 287,05 × 288,15) = 340,29 m/s = 1.225,06 km/h. Mach 2 bunun iki katı, yani 2.450,12 km/h eder.',
      '<strong>Örnek 2 – Seyir halindeki yolcu uçağı:</strong> Uçak, −56,5 °C sıcaklıktaki havada 900 km/h hızla ilerliyor. Bu sıcaklıkta ses hızı 1.062,25 km/h olduğundan Mach sayısı 900 ÷ 1.062,25 = 0,847 bulunur. Modern yolcu jetlerinin Mach 0,78–0,85 aralığında seyretmesiyle uyumlu bir sonuçtur.',
      '<strong>Örnek 3 – Aynı hız, farklı sıcaklık:</strong> 1.000 km/h, 15 °C\'de Mach 0,816 iken −56,5 °C\'de Mach 0,941 eder. Yere göre hız aynı kalsa da uçağın aerodinamik açıdan sese ne kadar yaklaştığı tamamen değişir; pilotların yüksek irtifada km/h ya da knot yerine Mach göstergesini izlemesinin nedeni budur.',
    ] },
    { h: 'Hız rejimleri', p: [
      'Havacılıkta hızlar Mach sayısına göre kabaca dört bölgeye ayrılır. Sınırlar kaynaktan kaynağa küçük farklar gösterir; araç aşağıdaki yaygın aralıkları kullanır.',
    ], ul: [
      '<strong>Ses altı (subsonik), Mach 0,8\'in altı:</strong> Pervaneli uçaklar, helikopterler ve yolcu jetlerinin büyük bölümü bu aralıkta uçar.',
      '<strong>Transonik, Mach 0,8–1,2:</strong> Uçağın bazı bölgelerinde akış ses hızını aşar, şok dalgaları oluşmaya başlar ve sürükleme hızla artar. "Ses duvarı" deyimi bu bölgedeki zorluklardan doğmuştur.',
      '<strong>Ses üstü (süpersonik), Mach 1,2–5:</strong> Savaş uçakları ve geçmişteki ses üstü yolcu uçakları bu aralıktadır. Cisim, yerde "sonik patlama" olarak duyulan şok dalgası üretir.',
      '<strong>Hipersonik, Mach 5 ve üzeri:</strong> Atmosfere giren uzay araçları ve bazı deneysel araçlar bu hızlara ulaşır; sürtünme kaynaklı ısınma tasarımın ana sorunu haline gelir.',
    ] },
    { h: 'Sıcaklığa göre ses hızı tablosu', ul: [
      '<strong>−56,5 °C</strong> (yaklaşık 11 km irtifa): 295,07 m/s = 1.062,3 km/h',
      '<strong>−40 °C:</strong> 306,10 m/s = 1.102,0 km/h',
      '<strong>−20 °C:</strong> 318,96 m/s = 1.148,3 km/h',
      '<strong>0 °C:</strong> 331,32 m/s = 1.192,7 km/h',
      '<strong>15 °C</strong> (standart deniz seviyesi): 340,29 m/s = 1.225,1 km/h',
      '<strong>20 °C:</strong> 343,23 m/s = 1.235,6 km/h',
      '<strong>30 °C:</strong> 349,04 m/s = 1.256,5 km/h',
      '<strong>40 °C:</strong> 354,75 m/s = 1.277,1 km/h',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap kuru hava ve ideal gaz davranışı varsayar. Gerçekte nem ses hızını çok az artırır; çok yüksek sıcaklıklarda γ değeri de 1,4\'ten sapar. Gündelik merak, ödev ve genel havacılık bilgisi için bu farklar önemsizdir, ancak uçuş planlaması ve mühendislik çalışmaları için yetkili kaynaklardaki atmosfer tablolarına ve uçağın el kitabına başvurulmalıdır.',
      'Mach sayısı yalnızca hava için tanımlı değildir; suda ses yaklaşık 1.500 m/s hızla yayıldığından aynı hız su içinde bambaşka bir Mach sayısına karşılık gelir. Bu çevirici yalnızca hava ortamı için tasarlanmıştır. Ayrıca sonuçtaki km/h değeri havaya göre hızdır; rüzgâr varsa uçağın yere göre hızı bundan farklı olur.',
    ] },
  ],
  faq: [
    ['1 Mach kaç km/h eder?', 'Deniz seviyesinde 15 °C sıcaklıkta 1 Mach yaklaşık 1.225 km/h (340,3 m/s) eder. Sıcaklık düştükçe bu değer azalır; yolcu uçaklarının seyir irtifasındaki −56,5 °C\'de 1 Mach yaklaşık 1.062 km/h\'dir.'],
    ['Mach 2 kaç kilometre hız yapar?', '15 °C\'de Mach 2 yaklaşık 2.450 km/h\'dir. Yüksek irtifadaki soğuk havada (−56,5 °C) aynı Mach sayısı yaklaşık 2.125 km/h\'ye karşılık gelir.'],
    ['Ses hızı neden sıcaklığa bağlı?', 'Ses, hava moleküllerinin birbirine çarparak titreşimi iletmesiyle yayılır. Sıcak havada moleküller daha hızlı hareket ettiği için titreşim daha çabuk aktarılır. Ses hızı mutlak sıcaklığın kareköküyle orantılıdır; basınç tek başına sonucu değiştirmez.'],
    ['Yolcu uçakları kaç Mach ile uçar?', 'Jet motorlu yolcu uçaklarının tipik seyir hızı Mach 0,78 ile 0,85 arasındadır. Seyir irtifasında bu, yaklaşık 830–900 km/h hava hızına denk gelir.'],
    ['Ses duvarını aşmak ne demek?', 'Bir aracın Mach 1\'i geçmesi, yani bulunduğu ortamdaki ses hızından daha hızlı hareket etmesi demektir. Bu sırada oluşan şok dalgası yerde gök gürültüsünü andıran bir patlama sesi olarak duyulur.'],
    ['Sıcaklık alanını boş bırakırsam ne olur?', 'Alan boşsa hesap standart deniz seviyesi sıcaklığı olan 15 °C ile yapılır. Farklı bir irtifa ya da hava koşulu için gerçek dış hava sıcaklığını yazmanız sonucu daha doğru kılar.'],
    ['Mach sayısının birimi var mı?', 'Hayır. Mach sayısı iki hızın oranı olduğu için birimsizdir. Bu yüzden "Mach 2" biçiminde, sayının önüne yazılarak ifade edilir.'],
    ['Girdiğim değerler bir sunucuya gidiyor mu?', 'Hayır. Bütün hesap tarayıcınızda çalışır; yazdığınız hız ve sıcaklık değerleri hiçbir yere iletilmez ya da saklanmaz.'],
  ],
  related: ['kmh-mph-cevir', 'ms-kmh-cevir', 'knot-kmh-cevir', 'celsius-kelvin-cevir', 'deniz-mili-km-cevir'],
};
