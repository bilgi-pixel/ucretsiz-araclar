export default {
  slug: 'pcb-yol-genisligi-hesapla',
  title: 'PCB Yol Genişliği Hesaplama',
  h1Tail: 'akıma göre bakır yol genişliği',
  pageTitle: 'PCB Yol Genişliği Hesaplama – Akıma Göre Bakır Yol (IPC-2221)',
  description: 'Baskı devre kartında taşınacak akım, bakır kalınlığı ve izin verilen sıcaklık artışına göre gereken yol genişliğini IPC-2221 bağıntısıyla mm ve mil olarak hesaplayın.',
  card: 'Akım, bakır kalınlığı ve sıcaklık artışına göre PCB yol genişliğini mm ve mil olarak hesaplayın; direnç ve gerilim düşümünü görün.',
  category: 'elektrik',
  keywords: ['pcb yol genişliği hesaplama', 'pcb yol kalınlığı kaç amper', 'baskı devre yol genişliği', 'pcb trace width', 'ipc-2221 hesaplama', 'bakır yol akım taşıma', '1 amper için yol genişliği'],
  lead: 'Yoldan geçecek akımı, kartın bakır kalınlığını ve kabul ettiğiniz sıcaklık artışını girin. Araç, yaygın kullanılan IPC-2221 bağıntısıyla <strong>gereken en düşük yol genişliğini</strong> milimetre ve mil olarak verir; yol uzunluğunu yazarsanız direnci, gerilim düşümünü ve güç kaybını da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'akim', label: 'Akım (A)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'bakir', label: 'Bakır kalınlığı', type: 'select', options: [['1', '1 oz (yaklaşık 35 µm)'], ['0.5', '0,5 oz (yaklaşık 18 µm)'], ['2', '2 oz (yaklaşık 70 µm)'], ['3', '3 oz (yaklaşık 105 µm)']] },
    { id: 'artis', label: 'Sıcaklık artışı (°C)', type: 'number', value: '10', hint: 'Yolun ortam sıcaklığının kaç derece üstüne çıkmasına izin verdiğiniz.' },
    { id: 'katman', label: 'Katman', type: 'select', options: [['dis', 'Dış katman (havayla temas eden)'], ['ic', 'İç katman']] },
    { id: 'uzunluk', label: 'Yol uzunluğu (mm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 100', hint: 'Yazarsanız direnç ve gerilim düşümü hesaplanır.' },
  ],
  compute(v, h) {
    const i = h.pos(v.akim, 'Akım');
    if (i > 35) h.err('Bu bağıntı yaklaşık 35 A\'e kadar geçerlidir; daha yüksek akımlar için bara ya da kalın bakır çözümleri gerekir.');
    const oz = v.bakir === '0.5' ? 0.5 : v.bakir === '2' ? 2 : v.bakir === '3' ? 3 : 1;
    const dt = h.opt(v.artis, 10, 'Sıcaklık artışı');
    if (dt < 1 || dt > 100) h.err('Sıcaklık artışı 1 ile 100 °C arasında olmalı; genellikle 10 ya da 20 °C seçilir.');
    const k = v.katman === 'ic' ? 0.024 : 0.048;
    const alan = Math.pow(i / (k * Math.pow(dt, 0.44)), 1 / 0.725); // mil²
    const kalinMil = 1.378 * oz;
    const mil = alan / kalinMil;
    const mm = mil * 0.0254;
    const rows = [
      ['Gerekli en düşük yol genişliği', h.fmt(mm, 3) + ' mm'],
      ['Yol genişliği (mil)', h.fmt(mil, 2) + ' mil'],
      ['Gerekli bakır kesit alanı', h.fmt(alan, 2) + ' mil²'],
      ['Bakır kalınlığı', h.fmt(kalinMil * 25.4, 1) + ' µm'],
    ];
    if (String(v.uzunluk ?? '').trim() !== '') {
      const l = h.pos(v.uzunluk, 'Yol uzunluğu');
      const r = 1.724e-8 * (l / 1000) / (mm * 1e-3 * kalinMil * 25.4e-6);
      rows.push(['Yol direnci (20 °C)', h.fmt(r * 1000, 2) + ' mΩ']);
      rows.push(['Gerilim düşümü', h.fmt(r * i * 1000, 2) + ' mV']);
      rows.push(['Yolda harcanan güç', h.fmt(r * i * i * 1000, 2) + ' mW']);
    }
    return {
      rows,
      note: 'IPC-2221 bağıntısı: I = k × ΔT^0,44 × A^0,725 (dış katman k = 0,048; iç katman k = 0,024; A mil²). Sonuç alt sınırdır; yer varsa yolu daha geniş çizin ve üreticinizin en düşük yol genişliği kuralına uyun.',
    };
  },
  cases: [
    { in: { akim: '1', bakir: '1', artis: '10', katman: 'dis' }, out: { 'Gerekli en düşük yol genişliği': '0,3 mm', 'Yol genişliği (mil)': '11,83 mil', 'Gerekli bakır kesit alanı': '16,3 mil²', 'Bakır kalınlığı': '35 µm' } },
    { in: { akim: '2', bakir: '1', artis: '10', katman: 'dis', uzunluk: '100' }, out: { 'Gerekli en düşük yol genişliği': '0,781 mm', 'Yol genişliği (mil)': '30,76 mil', 'Yol direnci (20 °C)': '63,03 mΩ', 'Gerilim düşümü': '126,07 mV', 'Yolda harcanan güç': '252,14 mW' } },
    { in: { akim: '1', bakir: '1', artis: '10', katman: 'ic' }, out: { 'Gerekli en düşük yol genişliği': '0,781 mm', 'Yol genişliği (mil)': '30,76 mil' } },
    { in: { akim: '5', bakir: '2', artis: '20', katman: 'dis', uzunluk: '50' }, out: { 'Gerekli en düşük yol genişliği': '0,908 mm', 'Yol genişliği (mil)': '35,74 mil', 'Bakır kalınlığı': '70 µm', 'Yol direnci (20 °C)': '13,56 mΩ', 'Gerilim düşümü': '67,82 mV' } },
    { in: { akim: '3', bakir: '1', artis: '10', katman: 'dis' }, out: { 'Gerekli en düşük yol genişliği': '1,367 mm', 'Yol genişliği (mil)': '53,82 mil' } },
    { in: { akim: '0,5', bakir: '0.5', artis: '10', katman: 'dis' }, out: { 'Gerekli en düşük yol genişliği': '0,231 mm', 'Yol genişliği (mil)': '9,09 mil', 'Bakır kalınlığı': '17,5 µm' } },
    { in: { akim: '10', bakir: '1', artis: '10', katman: 'dis' }, out: { 'Gerekli en düşük yol genişliği': '7,194 mm', 'Yol genişliği (mil)': '283,23 mil' } },
    { in: { akim: '0', bakir: '1', artis: '10', katman: 'dis' }, error: true },
    { in: { akim: '50', bakir: '1', artis: '10', katman: 'dis' }, error: true },
    { in: { akim: '2', bakir: '1', artis: '0', katman: 'dis' }, error: true },
  ],
  howto: [
    'Yolun sürekli taşıyacağı en yüksek akımı amper olarak yazın. Kısa süreli tepe akımı değil, uzun süre akan değeri esas alın.',
    'Kartınızın bakır kalınlığını seçin. Standart kartların çoğu 1 oz bakırla üretilir; güç kartlarında 2 oz ve üzeri tercih edilir.',
    'İzin verdiğiniz sıcaklık artışını girin. 10 °C temkinli, 20 °C daha dar yollara izin veren yaygın bir tercihtir.',
    'Yolun dış katmanda mı iç katmanda mı olduğunu belirtin; iç katmanlar ısıyı daha zor attığı için daha geniş yol ister.',
    'Direnç ve gerilim düşümünü de görmek için yol uzunluğunu milimetre olarak ekleyin ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Yol genişliği neden akıma bağlıdır?', p: [
      'Baskı devre kartındaki bakır yollar ince ve dardır; bu yüzden küçük de olsa bir dirençleri vardır. Yoldan akım geçtiğinde bu dirençte güç harcanır ve yol ısınır. Akım arttıkça ısınma akımın karesiyle büyür. Yol yeterince geniş değilse sıcaklık kart malzemesinin dayanabileceği düzeyin üzerine çıkar; bakır karttan ayrılabilir, lehim maskesi kararabilir, en kötü durumda yol bir sigorta gibi eriyerek kopar.',
      'Tasarımcının işi, yolun ortam sıcaklığının üzerine en fazla kaç derece ısınmasına izin vereceğine karar vermek ve o sınırı aşmayacak kesit alanını bulmaktır. Kesit alanı, yol genişliği ile bakır kalınlığının çarpımıdır; kalınlık kart siparişinde sabitlendiği için geriye genişliği hesaplamak kalır.',
    ] },
    { h: 'IPC-2221 bağıntısı', p: [
      'Bu araç, sektörde uzun süredir başvurulan IPC-2221 genel tasarım standardındaki eğrilere uydurulmuş bağıntıyı kullanır: <strong>I = k × ΔT<sup>0,44</sup> × A<sup>0,725</sup></strong>. Burada I amper olarak akım, ΔT santigrat derece olarak sıcaklık artışı, A mil kare olarak bakır kesit alanıdır. k katsayısı dış katmanlar için 0,048, iç katmanlar için 0,024 alınır.',
      'Bağıntı alan için çözülürse <strong>A = (I ÷ (k × ΔT<sup>0,44</sup>))<sup>1 ÷ 0,725</sup></strong> elde edilir. Genişlik ise alanın bakır kalınlığına bölünmesiyle bulunur. 1 oz bakır yaklaşık 1,378 mil, yani 35 mikrometre kalınlığındadır; "oz" ifadesi bir fit kareye yayılan bakırın ons cinsinden ağırlığından gelir. 1 mil inçin binde biridir ve 0,0254 mm eder.',
    ] },
    { h: 'Çözümlü örnek: 2 A, 1 oz, 10 °C, dış katman', ol: [
      'ΔT<sup>0,44</sup> = 10<sup>0,44</sup> ≈ 2,754',
      'k × ΔT<sup>0,44</sup> = 0,048 × 2,754 ≈ 0,1322',
      'I ÷ 0,1322 = 2 ÷ 0,1322 ≈ 15,13',
      'A = 15,13<sup>1,3793</sup> ≈ 42,39 mil²',
      'Genişlik = 42,39 ÷ 1,378 ≈ 30,76 mil = 0,781 mm',
    ], p: [
      'Bu yol 100 mm uzunluğundaysa 20 °C\'deki direnci yaklaşık 63 mΩ olur; 2 A akımda yaklaşık 126 mV gerilim düşer ve yolda yaklaşık 252 mW ısıya dönüşür. 5 V\'luk bir hatta 126 mV, yüzde 2,5\'lik bir kayıptır; düşük gerilimli devrelerde ısınma sınırı sağlansa bile gerilim düşümü yüzünden yolu genişletmek gerekebilir.',
    ] },
    { h: 'Dış katman ve iç katman farkı', p: [
      'Dış katmandaki bir yol ısısını hem karta hem doğrudan havaya verir. İç katmandaki yol ise her iki yandan yalıtkan malzemeyle sarılıdır ve ısıyı atması zordur. Bağıntıdaki k katsayısının iç katmanda yarıya inmesi bunu yansıtır. Sonuç çarpıcıdır: 1 A için dış katmanda yaklaşık 0,3 mm yeterken iç katmanda aynı sıcaklık artışı için yaklaşık 0,78 mm gerekir; yani iç katman yolu kabaca 2,6 kat geniş olmalıdır.',
    ] },
    { h: 'Hızlı başvuru: 1 oz bakır, 10 °C artış, dış katman', ul: [
      '<strong>0,5 A:</strong> yaklaşık 0,12 mm (üretim alt sınırı genellikle bundan büyüktür)',
      '<strong>1 A:</strong> yaklaşık 0,30 mm',
      '<strong>2 A:</strong> yaklaşık 0,78 mm',
      '<strong>3 A:</strong> yaklaşık 1,37 mm',
      '<strong>5 A:</strong> yaklaşık 2,77 mm',
      '<strong>10 A:</strong> yaklaşık 7,19 mm',
    ], p: [
      'Değerlerin akımla doğrusal artmadığına dikkat edin: akım iki katına çıktığında gereken genişlik yaklaşık 2,6 katına çıkar. Yüksek akımlarda bu yüzden bakır kalınlığını artırmak, yolu iki katmana bölüp geçiş delikleriyle (via) birleştirmek ya da bakır dolgu alanları kullanmak daha uygulanabilir çözümlerdir.',
    ] },
    { h: 'Pratik tasarım önerileri', ul: [
      'Hesaplanan değer alt sınırdır. Kartta yer varsa güç ve toprak yollarını olabildiğince geniş çizin; geniş yol hem daha serin kalır hem gerilim düşümünü azaltır.',
      'Sinyal yolları için akım belirleyici değildir; orada üreticinin en düşük yol genişliği ve empedans gereksinimleri geçerlidir.',
      'Bir yol üzerindeki en dar nokta (boyun) tüm yolun akım kapasitesini belirler. Entegre bacakları arasından geçerken daralan bölümleri kısa tutun.',
      'Katman değiştiren geçiş delikleri de akım taşır; yüksek akımlı hatlarda tek delik yerine birkaç deliği paralel kullanın.',
      'Yüksek ortam sıcaklığında çalışan kartlarda izin verilen artışı küçük seçin; ortam sıcaklığı ile artışın toplamı kart malzemesinin sınırının güvenle altında kalmalıdır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'IPC-2221 eğrileri eski ve temkinli ölçümlere dayanır; yakındaki bakır alanların, kart kalınlığının ve hava akışının etkisini ayrıntılı olarak hesaba katmaz. Daha yeni IPC-2152 standardı bu etkenleri içerir ve çoğu durumda daha dar yollara izin verir. Bu araç yaklaşık 35 A\'e ve 100 °C sıcaklık artışına kadar olan aralıkta sonuç verir; direnç hesabı 20 °C\'deki bakır özdirencine göre yapılır ve yol ısındıkça direnç bir miktar artar.',
      'Sonuçlar bilgilendirme amaçlıdır. Şebeke gerilimi taşıyan, yüksek akımlı ya da güvenlik açısından kritik kartlarda yol genişliğinin yanı sıra yalıtım aralıkları da ilgili standartlara göre belirlenmeli ve tasarım deneyimli bir mühendis tarafından doğrulanmalıdır.',
    ] },
  ],
  faq: [
    ['1 amper için PCB yol genişliği ne olmalı?', '1 oz bakır, 10 °C sıcaklık artışı ve dış katman için yaklaşık 0,3 mm (yaklaşık 12 mil) yeterlidir. İç katmanda aynı koşullarda yaklaşık 0,78 mm gerekir. Yer varsa daha geniş çizmek her zaman iyidir.'],
    ['Mil ile milimetre arasındaki ilişki nedir?', '1 mil, inçin binde biridir ve 0,0254 mm eder. 10 mil 0,254 mm, 100 mil 2,54 mm\'dir. Mil, milimetrenin kısaltması değildir; bu iki birim sık karıştırılır.'],
    ['1 oz bakır kaç mikrondur?', 'Yaklaşık 35 mikrometre, yani 0,035 mm\'dir. 2 oz bakır yaklaşık 70, 0,5 oz bakır yaklaşık 17,5 mikrometre kalınlığındadır.'],
    ['Sıcaklık artışını kaç seçmeliyim?', '10 °C temkinli ve yaygın bir seçimdir. Kart sıkışıksa 20 °C kullanılabilir. Sıcak ortamda çalışacak ya da kapalı kutuya konacak kartlarda düşük değer tercih edin.'],
    ['Bakır kalınlığını artırmak genişliği ne kadar azaltır?', 'Gereken kesit alanı aynı kaldığı için genişlik kalınlıkla ters orantılı azalır: 2 oz bakırda genişlik 1 oz\'a göre yarıya iner.'],
    ['Kısa süreli tepe akımları için de bu genişlik mi gerekir?', 'Hayır. Bağıntı sürekli akımdaki kararlı sıcaklığı esas alır. Milisaniyeler süren darbelerde yol ısınmaya vakit bulamaz; ortalama (etkin) akıma göre hesap yapmak daha gerçekçidir.'],
    ['Yolun üzerini lehimle kaplamak akım kapasitesini artırır mı?', 'Kesiti büyüttüğü için bir miktar artırır; ancak lehimin iletkenliği bakırdan belirgin biçimde düşüktür ve kaplama kalınlığı denetlenemez. Hesaba güvenilir bir katkı olarak katılmamalı, yalnızca ek pay sayılmalıdır.'],
    ['Girdiğim tasarım değerleri saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; değerleriniz hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kablo-kesiti-hesapla', 'gerilim-dusumu-hesapla', 'awg-mm2-cevir', 'ohm-kanunu-hesapla', 'isi-kaybi-direnc-hesapla'],
};
