export default {
  slug: 'hz-rpm-cevir',
  title: 'Hertz RPM Çevirici',
  h1Tail: 'Hz ↔ devir/dakika',
  pageTitle: 'Hertz RPM Çevirici – Hz\'den Devir/Dakikaya Hesaplama',
  description: 'Hertz değerini RPM\'e (devir/dakika), RPM\'i hertze çevirin. Açısal hızı rad/s olarak ve bir turun süresini de gösterir; motor, fan ve titreşim hesapları için.',
  card: 'Frekansı (Hz) devir/dakikaya, devir/dakikayı frekansa çevirin; açısal hız ve tur süresi de hesaplanır.',
  category: 'birim',
  keywords: ['hz rpm çevirme', 'rpm hz hesaplama', 'devir dakika hertz', '50 hz kaç devir', 'rpm kaç hz', 'd/dk hz çevirici', 'açısal hız rad/s'],
  lead: `Dönme hızını <strong>hertz (Hz)</strong> ile <strong>devir/dakika (RPM)</strong> arasında çevirin. Araç aynı anda açısal hızı radyan/saniye olarak ve tek bir turun kaç milisaniye sürdüğünü de verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 50' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['hz', 'Hertz → RPM'], ['rpm', 'RPM → Hertz']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const hz = v.yon === 'rpm' ? x / 60 : x;
    const rpm = hz * 60;
    const rads = 2 * Math.PI * hz;
    const tur = hz > 0 ? h.fmt(1000 / hz, 4) + ' ms' : '— (dönme yok)';
    const a = ['Devir/dakika (RPM)', h.fmt(rpm, 4) + ' RPM'];
    const b = ['Frekans (Hz)', h.fmt(hz, 4) + ' Hz'];
    return {
      rows: [
        v.yon === 'rpm' ? b : a,
        v.yon === 'rpm' ? a : b,
        ['Açısal hız', h.fmt(rads, 4) + ' rad/s'],
        ['Bir tur süresi', tur],
      ],
      note: '1 Hz = 60 RPM. Hertz burada saniyedeki tam tur sayısı (devir/saniye) olarak yorumlanır.',
    };
  },
  cases: [
    { in: { deger: '50', yon: 'hz' }, out: { 'Devir/dakika (RPM)': '3.000 RPM', 'Açısal hız': '314,1593 rad/s', 'Bir tur süresi': '20 ms' } },
    { in: { deger: '1500', yon: 'rpm' }, out: { 'Frekans (Hz)': '25 Hz', 'Bir tur süresi': '40 ms' } },
    { in: { deger: '60', yon: 'rpm' }, out: { 'Frekans (Hz)': '1 Hz', 'Açısal hız': '6,2832 rad/s', 'Bir tur süresi': '1.000 ms' } },
    { in: { deger: '7200', yon: 'rpm' }, out: { 'Frekans (Hz)': '120 Hz', 'Bir tur süresi': '8,3333 ms' } },
    { in: { deger: '0,5', yon: 'hz' }, out: { 'Devir/dakika (RPM)': '30 RPM', 'Bir tur süresi': '2.000 ms' } },
    { in: { deger: '45', yon: 'rpm' }, out: { 'Frekans (Hz)': '0,75 Hz' } },
    { in: { deger: '0', yon: 'hz' }, out: { 'Devir/dakika (RPM)': '0 RPM', 'Bir tur süresi': '— (dönme yok)' } },
    { in: { deger: '-10', yon: 'hz' }, error: true },
    { in: { deger: 'hızlı', yon: 'rpm' }, error: true },
  ],
  howto: [
    `"Değer" alanına elinizdeki sayıyı yazın. Ondalık kısmı virgülle ya da noktayla ayırabilirsiniz.`,
    `"Çeviri yönü" listesinden hertzden RPM'e mi, RPM'den hertze mi geçeceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında diğer birim, açısal hız ve bir turun süresi görünür.`,
    `Sonuçları rapora ya da bakım formuna aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Hertz ve RPM arasındaki ilişki', p: [
      `Hertz, bir olayın saniyede kaç kez tekrarlandığını söyleyen frekans birimidir. RPM ise İngilizce "revolutions per minute" ifadesinin kısaltmasıdır ve bir milin dakikada kaç tam tur attığını gösterir; Türkçe kaynaklarda <strong>d/dk</strong> ya da <strong>dev/dak</strong> olarak yazılır. Dönen bir parça için "saniyede bir tur" ile "1 Hz" aynı şeydir. Bir dakikada 60 saniye olduğundan iki birim arasındaki katsayı her zaman 60'tır.`,
      `Formüller şöyledir: <strong>RPM = Hz × 60</strong> ve <strong>Hz = RPM ÷ 60</strong>. Bu ilişki tanımdan gelir, deneysel bir katsayı içermez; bu nedenle çeviri tam sonuç verir ve yuvarlama yalnızca gösterimde yapılır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Saniyede 50 tur atan bir rotorun devri nedir? 50 × 60 = 3.000 RPM. Bir tur 1 ÷ 50 = 0,02 saniye, yani 20 milisaniye sürer. Açısal hız 2 × π × 50 = 314,1593 rad/s olur.`,
      `<strong>Örnek 2:</strong> Etiketinde 1.500 d/dk yazan bir motorun mili saniyede kaç tur atar? 1.500 ÷ 60 = 25 Hz. Her tur 40 milisaniye sürer.`,
      `<strong>Örnek 3:</strong> 7.200 RPM'lik bir sabit diskin plakası 7.200 ÷ 60 = 120 Hz ile döner; bir tam tur yaklaşık 8,3333 milisaniyedir. Okuma kafasının istenen veriye ulaşmak için ortalama yarım tur beklemesi gerektiği düşünülürse bu süre diskin gecikmesi hakkında fikir verir.`,
    ] },
    { h: 'Açısal hız (rad/s) neden gösteriliyor?', p: [
      `Fizik ve makine hesaplarında dönme hızı çoğu zaman radyan/saniye cinsinden istenir; simgesi ω (omega) harfidir. Bir tam tur 2π radyan olduğundan <strong>ω = 2π × f</strong> bağıntısı geçerlidir. Tork ile gücün ilişkisi (güç = tork × açısal hız), merkezkaç kuvveti ve çevresel hız (v = ω × r) gibi formüller RPM değil rad/s bekler. Araç bu değeri hazır verdiği için ara adımı elle yapmanız gerekmez. 60 RPM, yani 1 Hz, 6,2832 rad/s eder.`,
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      `<strong>Elektrik motorları:</strong> Sürücü (frekans invertörü) ekranında hertz, motor etiketinde d/dk yazar. İkisini karşılaştırmak için çeviri gerekir.`,
      `<strong>Titreşim analizi:</strong> Bakım ekipleri spektrumda dönme frekansını (1× bileşeni) hertz olarak görür; makinenin devri ise RPM olarak bilinir. 1.480 RPM'lik bir pompanın 1× tepe noktası yaklaşık 24,67 Hz'de aranır.`,
      `<strong>Fanlar ve soğutma:</strong> Bilgisayar fanlarının hız sinyali ve devir ölçerler çoğunlukla frekans üretir.`,
      `<strong>Çamaşır makinesi:</strong> 1.200 devirli sıkma, tamburun saniyede 20 tur atması demektir.`,
      `<strong>Plak çalarlar:</strong> 45'lik bir plak saniyede 0,75 tur döner.`,
      `<strong>Otomotiv:</strong> Dakikada 3.000 devirde çalışan bir motorun krank mili saniyede 50 tur atar.`,
    ] },
    { h: 'Şebeke frekansı ile motor devri aynı şey değildir', p: [
      `Sık yapılan bir hata, şebekenin 50 Hz olmasından yola çıkarak her motorun 3.000 d/dk döndüğünü sanmaktır. Alternatif akım motorlarında senkron hız kutup sayısına bağlıdır: <strong>senkron devir = 120 × frekans ÷ kutup sayısı</strong>. 50 Hz'de iki kutuplu motor 3.000, dört kutuplu motor 1.500, altı kutuplu motor 1.000 d/dk senkron hıza sahiptir. Asenkron motorlar yük altında bu değerin biraz altında döner; etiketlerde 1.450 ya da 2.900 gibi sayılar görmenizin nedeni budur.`,
      `Bu sayfadaki çeviri elektriksel frekansı değil, <em>mekanik dönme frekansını</em> RPM'e çevirir. Sürücünüz 50 Hz gösterirken dört kutuplu motorunuzun mili yaklaşık 25 Hz ile döner. Elektriksel frekanstan mil devrine geçmek için önce kutup sayısına göre hesap yapın, ardından isterseniz sonucu burada hertze çevirin.`,
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      `<strong>1 Hz</strong> = 60 RPM`,
      `<strong>10 Hz</strong> = 600 RPM`,
      `<strong>16,6667 Hz</strong> = 1.000 RPM`,
      `<strong>25 Hz</strong> = 1.500 RPM`,
      `<strong>50 Hz</strong> = 3.000 RPM`,
      `<strong>60 Hz</strong> = 3.600 RPM`,
      `<strong>90 Hz</strong> = 5.400 RPM`,
      `<strong>100 Hz</strong> = 6.000 RPM`,
      `<strong>120 Hz</strong> = 7.200 RPM`,
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      `Araç negatif değer kabul etmez; dönme yönü işaretle değil ayrıca belirtilir. Sıfır girildiğinde tur süresi tanımsız olduğundan çizgi gösterilir. Sonuçlar dört ondalık basamağa kadar yuvarlanır. Devir ölçerle alınan değerlerin kendi ölçüm belirsizliği vardır; hassas dengeleme, rezonans ya da emniyet hesabı gibi mühendislik kararlarında sonuçları yetkili bir uzmanla birlikte değerlendirin.`,
    ] },
  ],
  faq: [
    ['1 Hz kaç RPM eder?', '1 Hz, 60 RPM eder. Saniyede bir tur atan bir mil dakikada 60 tur atar; çarpan dakikadaki saniye sayısından gelir.'],
    ['50 Hz kaç devir/dakikadır?', 'Mekanik dönme frekansı 50 Hz olan bir mil 3.000 devir/dakika ile döner. Şebeke frekansı 50 Hz olan bir motorun devri ise kutup sayısına bağlıdır; dört kutuplu motorda senkron hız 1.500 devir/dakikadır.'],
    ['RPM değerini hertze nasıl çeviririm?', 'RPM değerini 60\'a bölün. Örneğin 1.500 RPM, 1.500 ÷ 60 = 25 Hz eder. Araçta "RPM → Hertz" yönünü seçmeniz yeterlidir.'],
    ['RPM ile d/dk aynı şey mi?', 'Evet. RPM İngilizce kısaltmadır; d/dk, dev/dak ve devir/dakika aynı birimin Türkçe yazımlarıdır. Uluslararası yazımda min⁻¹ ya da r/min olarak da görülür.'],
    ['Rad/s değerini RPM\'e nasıl çeviririm?', 'Rad/s değerini 2π\'ye bölerek hertzi, sonra 60 ile çarparak RPM\'i bulursunuz. Kısaca RPM = rad/s × 60 ÷ 2π, yani yaklaşık rad/s × 9,5493\'tür.'],
    ['Monitörün 60 Hz yenileme hızı RPM\'e çevrilir mi?', 'Matematiksel olarak 60 Hz, 3.600 RPM\'e karşılık gelir; ancak ekran yenilemede dönen bir parça olmadığı için bu çeviri anlam taşımaz. RPM yalnızca dönme hareketi için kullanılır.'],
    ['Bir tur süresi ne işe yarar?', 'Periyot, tek bir tam turun süresidir ve frekansın tersidir. Stroboskopla ölçüm yaparken, sensör örnekleme aralığını seçerken ya da bir diskin erişim gecikmesini tahmin ederken kullanılır.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızın içinde yapılır; yazdığınız sayı hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['radyan-devir-cevir', 'dalga-boyu-frekans-hesapla', 'derece-radyan-cevir', 'birim-donustur', 'vites-hiz-hesapla'],
};
