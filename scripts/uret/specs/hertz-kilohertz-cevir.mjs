export default {
  slug: 'hertz-kilohertz-cevir',
  title: 'Hertz Kilohertz Megahertz Çevirici',
  h1Tail: 'Hz ↔ kHz ↔ MHz ↔ GHz',
  pageTitle: `Hertz Kilohertz Megahertz Çevirici – Hz, kHz, MHz, GHz Çevirme`,
  description: `Frekansı hertz, kilohertz, megahertz, gigahertz ve terahertz arasında çevirin. Periyodu ve elektromanyetik dalganın boşluktaki dalga boyunu da hesaplar.`,
  card: `Frekansı Hz, kHz, MHz, GHz ve THz arasında çevirin; periyodu ve dalga boyunu da birlikte görün.`,
  category: 'birim',
  keywords: ['hertz kilohertz çevirme', 'megahertz kaç hertz', 'ghz mhz çevirme', '1 mhz kaç khz', 'frekans birimi çevirme', '2,4 ghz kaç mhz', 'khz hz çevirici'],
  lead: `Bir frekans değerini hertz (Hz), kilohertz (kHz), megahertz (MHz), gigahertz (GHz) ve terahertz (THz) arasında çevirin. Araç ayrıca bu frekansın <strong>periyodunu</strong> ve bir elektromanyetik dalga için boşluktaki <strong>dalga boyunu</strong> gösterir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Frekans değeri', type: 'number', placeholder: 'Örn. 2,4' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['hz', 'Hertz (Hz)'], ['khz', 'Kilohertz (kHz)'], ['mhz', 'Megahertz (MHz)'], ['ghz', 'Gigahertz (GHz)'], ['thz', 'Terahertz (THz)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['khz', 'Kilohertz (kHz)'], ['hz', 'Hertz (Hz)'], ['mhz', 'Megahertz (MHz)'], ['ghz', 'Gigahertz (GHz)'], ['thz', 'Terahertz (THz)']] },
  ],
  compute(v, h) {
    const birimler = {
      hz: [1, 'Hz'],
      khz: [1e3, 'kHz'],
      mhz: [1e6, 'MHz'],
      ghz: [1e9, 'GHz'],
      thz: [1e12, 'THz'],
    };
    const x = h.pos(v.deger, 'Frekans değeri');
    const k = birimler[v.kaynak] || birimler.hz;
    const t = birimler[v.hedef] || birimler.khz;
    const hz = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(hz / b[0], 9) + ' ' + b[1];
    // Büyüklüğe en uygun alt birimi seçer (değer 1'in altına düşmeyen en büyük birim).
    const uygun = (deger, liste) => {
      for (const [olcek, ad] of liste) {
        if (deger / olcek >= 1 - 1e-9) return h.sig(deger / olcek, 6) + ' ' + ad;
      }
      const son = liste[liste.length - 1];
      return h.sig(deger / son[0], 6) + ' ' + son[1];
    };
    const periyot = 1 / hz;
    const dalga = 299792458 / hz;
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Hertz', yaz(birimler.hz)],
        ['Kilohertz', yaz(birimler.khz)],
        ['Megahertz', yaz(birimler.mhz)],
        ['Gigahertz', yaz(birimler.ghz)],
        ['Terahertz', yaz(birimler.thz)],
        ['Periyot', uygun(periyot, [[1, 's'], [1e-3, 'ms'], [1e-6, 'µs'], [1e-9, 'ns'], [1e-12, 'ps'], [1e-15, 'fs']])],
        ['Dalga boyu (boşlukta)', uygun(dalga, [[1e3, 'km'], [1, 'm'], [1e-2, 'cm'], [1e-3, 'mm'], [1e-6, 'µm'], [1e-9, 'nm']])],
      ],
      note: 'Periyot T = 1 ÷ f. Dalga boyu, ışık hızı (299.792.458 m/s) frekansa bölünerek bulunur ve yalnızca elektromanyetik dalgalar için geçerlidir; ses dalgaları için kullanılmaz.',
    };
  },
  cases: [
    { in: { deger: '2,4', kaynak: 'ghz', hedef: 'mhz' }, out: { 'Sonuç': '2.400 MHz', 'Hertz': '2.400.000.000 Hz', 'Periyot': '416,667 ps', 'Dalga boyu (boşlukta)': '12,4914 cm' } },
    { in: { deger: '50', kaynak: 'hz', hedef: 'khz' }, out: { 'Sonuç': '0,05 kHz', 'Periyot': '20 ms', 'Dalga boyu (boşlukta)': '5.995,85 km' } },
    { in: { deger: '100', kaynak: 'mhz', hedef: 'khz' }, out: { 'Sonuç': '100.000 kHz', 'Gigahertz': '0,1 GHz', 'Periyot': '10 ns', 'Dalga boyu (boşlukta)': '2,99792 m' } },
    { in: { deger: '1', kaynak: 'khz', hedef: 'hz' }, out: { 'Sonuç': '1.000 Hz', 'Periyot': '1 ms', 'Dalga boyu (boşlukta)': '299,792 km' } },
    { in: { deger: '440', kaynak: 'hz', hedef: 'khz' }, out: { 'Sonuç': '0,44 kHz', 'Periyot': '2,27273 ms' } },
    { in: { deger: '1', kaynak: 'thz', hedef: 'ghz' }, out: { 'Sonuç': '1.000 GHz', 'Periyot': '1 ps', 'Dalga boyu (boşlukta)': '299,792 µm' } },
    { in: { deger: '16', kaynak: 'mhz', hedef: 'hz' }, out: { 'Sonuç': '16.000.000 Hz', 'Periyot': '62,5 ns' } },
    { in: { deger: '0', kaynak: 'hz', hedef: 'khz' }, error: true },
    { in: { deger: 'elli', kaynak: 'hz', hedef: 'khz' }, error: true },
  ],
  howto: [
    `"Frekans değeri" alanına sayıyı yazın; ondalık için virgül kullanabilirsiniz (örn. 2,4).`,
    `"Girilen birim" listesinden değerin birimini seçin: Hz, kHz, MHz, GHz ya da THz.`,
    `"Çevrilecek birim" listesinden sonucu görmek istediğiniz birimi seçin.`,
    `"Çevir" düğmesine basın. İlk satırda hedef birimdeki sonuç, altında beş birimin tamamı yer alır.`,
    `Son iki satırdan periyodu ve dalga boyunu okuyun; anten boyu ya da zamanlama hesabı için bu değerler işinize yarar.`,
  ],
  sections: [
    { h: 'Hertz nedir, katları nasıl çevrilir?', p: [
      `Hertz (Hz), bir olayın saniyede kaç kez yinelendiğini gösteren frekans birimidir. Saniyede bir tam salınım 1 Hz eder. Şebeke elektriğinden işlemci saatlerine, radyo yayınlarından ışığa kadar yinelenen her olay hertz ile ölçülür; yalnızca ölçek değişir.`,
      `Büyük frekanslar metrik ön eklerle yazılır ve her basamak bir öncekinin bin katıdır: <strong>1 kHz = 1.000 Hz</strong>, <strong>1 MHz = 1.000 kHz = 1.000.000 Hz</strong>, <strong>1 GHz = 1.000 MHz</strong> ve <strong>1 THz = 1.000 GHz</strong>. Büyük birimden küçüğe geçerken 1.000 ile çarpar, küçükten büyüğe geçerken 1.000'e bölersiniz. İki basamak atlıyorsanız çarpan bir milyon, üç basamak atlıyorsanız bir milyar olur.`,
    ] },
    { h: 'Çözümlü örnek: 2,4 GHz kaç megahertz?', p: [
      `Kablosuz ağların ve Bluetooth cihazlarının kullandığı bant 2,4 GHz olarak anılır. Megahertz karşılığı 2,4 × 1.000 = <strong>2.400 MHz</strong>, hertz karşılığı 2.400.000.000 Hz'tir. Periyot, 1'in frekansa bölünmesiyle bulunur: 1 ÷ 2.400.000.000 saniye, yani yaklaşık 0,4167 nanosaniye (416,7 pikosaniye). Dalga boyu için ışık hızı frekansa bölünür: 299.792.458 ÷ 2.400.000.000 ≈ 0,1249 metre, yani yaklaşık 12,49 santimetre.`,
      `Düşük frekanslı bir örnek olarak 50 Hz'lik şebeke gerilimini alalım. Kilohertz karşılığı 50 ÷ 1.000 = 0,05 kHz'tir. Bir tam dalga 1 ÷ 50 = 0,02 saniye, yani 20 milisaniye sürer. Bu süre, röle ve sigorta açma zamanlarını "kaç periyot" diye ifade ederken kullanılan temel değerdir.`,
    ] },
    { h: 'Periyot ve dalga boyu ne işe yarar?', p: [
      `Frekans ile periyot birbirinin tersidir: <strong>T = 1 ÷ f</strong>. Frekans bin kat arttığında periyot bin kat kısalır. Hertz saniyeyle, kilohertz milisaniyeyle, megahertz mikrosaniyeyle, gigahertz nanosaniyeyle eşleşir. Mikrodenetleyici programlarken zamanlayıcı ayarı yapmak ya da osiloskop ekranındaki bir dalganın yatay uzunluğundan frekansı çıkarmak için bu ilişki kullanılır; 16 MHz'lik bir kristalin periyodu 62,5 nanosaniyedir.`,
      `Dalga boyu ise dalganın bir periyotta kat ettiği yoldur: <strong>λ = c ÷ f</strong>. Buradaki c ışığın boşluktaki hızıdır. Anten boyları dalga boyunun kesirleriyle tasarlandığı için bu değer önemlidir; 100 MHz civarındaki FM yayınının dalga boyu yaklaşık 3 metredir. Dalga kablo ya da başka bir ortamda ilerlerken hızı düştüğünden gerçek dalga boyu burada gösterilenden kısa olur.`,
    ] },
    { h: 'Gündelik hayattan frekans örnekleri', ul: [
      `<strong>50 Hz:</strong> Türkiye'de şebeke elektriğinin frekansı.`,
      `<strong>20 Hz – 20 kHz:</strong> insan kulağının yaklaşık duyma aralığı; üst sınır yaşla birlikte düşer.`,
      `<strong>440 Hz:</strong> müzikte akort için kullanılan la notası.`,
      `<strong>87,5 – 108 MHz:</strong> FM radyo yayın bandı.`,
      `<strong>2,4 GHz ve 5 GHz:</strong> kablosuz ağların yaygın bantları.`,
      `<strong>Birkaç GHz:</strong> günümüz bilgisayar işlemcilerinin saat frekansı düzeyi.`,
      `<strong>Yüzlerce THz:</strong> görünür ışığın frekans bölgesi.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>MHz ile mHz'i karıştırmak:</strong> büyük M mega (milyon), küçük m mili (binde bir) demektir. Yazarken harf büyüklüğüne dikkat edin.`,
      `<strong>Ses için dalga boyu satırını kullanmak:</strong> ses havada yaklaşık 340 m/s hızla yayılır, ışık hızıyla değil. 440 Hz'lik bir sesin havadaki dalga boyu bir metrenin altındadır; bu sayfadaki dalga boyu satırı radyo dalgası ve ışık gibi elektromanyetik dalgalar içindir.`,
      `<strong>Mbps ile MHz'i eş saymak:</strong> megahertz bir frekans, megabit/saniye bir veri hızıdır. Bant genişliği veri hızını etkiler ama ikisi birbirine doğrudan çevrilemez.`,
      `<strong>Devir/dakika ile hertzi karıştırmak:</strong> motor devri dakika başınadır; hertze geçmek için 60'a bölmek gerekir. 3.000 devir/dakika 50 Hz eder.`,
    ] },
    { h: 'Sınırlar', p: [
      `Frekans sıfırdan büyük olmalıdır; sıfır frekansın periyodu tanımsızdır. Birim karşılıkları dokuz, periyot ve dalga boyu altı anlamlı basamakla gösterilir. Dalga boyu hesabında ışığın boşluktaki hızı olan 299.792.458 m/s kullanılır. Araç yalnızca dönüşüm yapar; anten, filtre ya da osilatör tasarımı gibi mühendislik kararları için ortamın özellikleri ve ilgili standartlar ayrıca değerlendirilmelidir.`,
    ] },
  ],
  faq: [
    ['1 megahertz kaç kilohertz eder?', `1 megahertz 1.000 kilohertz, yani 1.000.000 hertz eder. Megahertz değerini 1.000 ile çarparak kilohertze çevirirsiniz.`],
    ['1 gigahertz kaç megahertz eder?', `1 gigahertz 1.000 megahertz eder. Buna göre 2,4 GHz 2.400 MHz'e, 5 GHz ise 5.000 MHz'e karşılık gelir.`],
    ['1 kilohertz kaç hertz eder?', `1 kilohertz 1.000 hertz eder; yani saniyede bin salınım demektir. Periyodu 1 milisaniyedir.`],
    ['Frekanstan periyot nasıl hesaplanır?', `Periyot, 1'in hertz cinsinden frekansa bölünmesiyle bulunur. 50 Hz için 1 ÷ 50 = 0,02 saniye, yani 20 milisaniye; 1 MHz için 1 mikrosaniye eder.`],
    ['Frekans arttıkça dalga boyu neden kısalır?', `Dalga her periyotta bir dalga boyu yol alır ve yayılma hızı sabittir. Frekans arttığında periyot kısaldığı için dalganın bu sürede kat ettiği yol, yani dalga boyu da aynı oranda küçülür.`],
    ['Hz ile devir/dakika aynı şey midir?', `Hayır. Hertz saniyedeki, devir/dakika dakikadaki yineleme sayısıdır. Devir/dakikayı 60'a bölerek hertze, hertzi 60 ile çarparak devir/dakikaya geçersiniz.`],
    ['Kilohertz kısaltması nasıl yazılır?', `Kilohertz kHz biçiminde yazılır: k küçük, H büyük, z küçük harftir. Megahertz MHz, gigahertz GHz, terahertz THz olarak kısaltılır.`],
    ['Yazdığım frekans değerleri saklanıyor mu?', `Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz değer sunucuya gönderilmez ve kaydedilmez. Sayfa açıldıktan sonra internet olmadan da kullanılabilir.`],
  ],
  related: ['dalga-boyu-frekans-hesapla', 'hz-rpm-cevir', 'rc-filtre-kesim-frekansi-hesapla', 'milisaniye-saniye-cevir', 'foton-enerjisi-hesapla'],
};
