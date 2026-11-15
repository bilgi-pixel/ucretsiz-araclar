export default {
  slug: 'kutle-enerji-hesapla',
  title: 'Kütle Enerji Eşdeğerliği (E = mc²) Hesaplama',
  h1Tail: 'kütleden enerji, enerjiden kütle',
  pageTitle: 'E = mc² Hesaplama – Kütle Enerji Eşdeğerliği Hesaplayıcı',
  description: 'Einstein\'ın E = mc² bağıntısıyla bir kütlenin enerji karşılığını ya da bir enerjinin kütle karşılığını hesaplayın. Joule, kWh, MeV ve TNT eşdeğeri.',
  card: 'E = mc² ile kütlenin enerji karşılığını joule, kWh, MeV ve TNT eşdeğeri olarak bulun; enerjiden kütleye de çevirin.',
  category: 'bilim',
  keywords: ['e=mc2 hesaplama', 'kütle enerji eşdeğerliği', 'kütle enerji dönüşümü', 'durgun kütle enerjisi', '1 gram kaç joule', 'atomik kütle birimi MeV', 'einstein formülü'],
  lead: 'Einstein\'ın ünlü bağıntısı <strong>E = m · c²</strong>, kütle ile enerjinin aynı şeyin iki görünümü olduğunu söyler. Bir kütleyi yazıp karşılık gelen durgun enerjiyi, ya da bir enerji değerini yazıp eşdeğer kütleyi hesaplayın.',
  button: 'Hesapla',
  inputs: [
    { id: 'hesap', label: 'Hesap yönü', type: 'select', options: [['kutle', 'Kütleden enerji'], ['enerji', 'Enerjiden kütle']] },
    { id: 'kutle', label: 'Kütle', type: 'text', placeholder: 'Örn. 1', hint: 'Kütleden enerji hesabında kullanılır. Bilimsel gösterim: 9.109e-31' },
    { id: 'kBirim', label: 'Kütle birimi', type: 'select', options: [['kg', 'Kilogram (kg)'], ['g', 'Gram (g)'], ['mg', 'Miligram (mg)'], ['ug', 'Mikrogram (µg)'], ['u', 'Atomik kütle birimi (u)']] },
    { id: 'enerji', label: 'Enerji', type: 'text', placeholder: 'Örn. 1', hint: 'Enerjiden kütle hesabında kullanılır.' },
    { id: 'eBirim', label: 'Enerji birimi', type: 'select', options: [['J', 'Joule (J)'], ['kWh', 'Kilowatt saat (kWh)'], ['MeV', 'Megaelektronvolt (MeV)']] },
  ],
  compute(v, h) {
    const c = 299792458; // m/s, tam tanım
    const eV = 1.602176634e-19;
    const kb = { kg: 1, g: 1e-3, mg: 1e-6, ug: 1e-9, u: 1.6605390666e-27 };
    const eb = { J: 1, kWh: 3.6e6, MeV: eV * 1e6 };
    const bil = (x) => {
      if (x === 0) return '0';
      const a = Math.abs(x);
      if (a >= 1e7 || a < 1e-4) {
        const [m, e] = x.toExponential(5).split('e');
        return String(Number(m)).replace('.', ',') + ' × 10^' + Number(e);
      }
      return h.sig(x, 6);
    };
    let m, E;
    if (v.hesap === 'enerji') {
      E = h.pos(v.enerji, 'Enerji') * (eb[v.eBirim] || 1);
      m = E / (c * c);
    } else {
      m = h.pos(v.kutle, 'Kütle') * (kb[v.kBirim] || 1);
      E = m * c * c;
    }
    if (!Number.isFinite(E) || !(E > 0) || !(m > 0)) h.err('Değer hesaplanamayacak kadar büyük ya da küçük; girdiyi kontrol edin.');
    const enerjiSatiri = ['Enerji', bil(E) + ' J'];
    const kutleSatiri = ['Kütle', bil(m) + ' kg'];
    return {
      rows: [
        ...(v.hesap === 'enerji' ? [kutleSatiri, enerjiSatiri] : [enerjiSatiri, kutleSatiri]),
        ['Kütle (gram)', bil(m * 1000) + ' g'],
        ['Kilowatt saat', bil(E / 3.6e6) + ' kWh'],
        ['Megaelektronvolt', bil(E / (eV * 1e6)) + ' MeV'],
        ['TNT eşdeğeri', bil(E / 4.184e9) + ' ton'],
      ],
      note: 'c = 299 792 458 m/s (tam tanım). Sonuç, kütlenin tamamının enerjiye dönüştüğü kuramsal durumu gösterir. TNT eşdeğeri 1 ton = 4,184 × 10⁹ J kabulüyle hesaplanır.',
    };
  },
  cases: [
    { in: { hesap: 'kutle', kutle: '1', kBirim: 'kg' }, out: { 'Enerji': '8,98755 × 10^16 J', 'Kilowatt saat': '2,49654 × 10^10 kWh', 'TNT eşdeğeri': '2,14808 × 10^7 ton' } },
    { in: { hesap: 'kutle', kutle: '1', kBirim: 'g' }, out: { 'Enerji': '8,98755 × 10^13 J', 'Kilowatt saat': '2,49654 × 10^7 kWh', 'TNT eşdeğeri': '21.480,8 ton' } },
    { in: { hesap: 'kutle', kutle: '1', kBirim: 'u' }, out: { 'Enerji': '1,49242 × 10^-10 J', 'Megaelektronvolt': '931,494 MeV' } },
    { in: { hesap: 'kutle', kutle: '9.1093837015e-31', kBirim: 'kg' }, out: { 'Megaelektronvolt': '0,510999 MeV', 'Enerji': '8,18711 × 10^-14 J' } },
    { in: { hesap: 'kutle', kutle: '1', kBirim: 'ug' }, out: { 'Enerji': '8,98755 × 10^7 J', 'Kilowatt saat': '24,9654 kWh', 'TNT eşdeğeri': '0,0214808 ton' } },
    { in: { hesap: 'enerji', enerji: '1', eBirim: 'kWh' }, out: { 'Kütle': '4,00554 × 10^-11 kg', 'Enerji': '3.600.000 J' } },
    { in: { hesap: 'enerji', enerji: '1e14', eBirim: 'J' }, out: { 'Kütle': '0,00111265 kg', 'Kütle (gram)': '1,11265 g' } },
    { in: { hesap: 'enerji', enerji: '938,272', eBirim: 'MeV' }, out: { 'Kütle': '1,67262 × 10^-27 kg' } },
    { in: { hesap: 'kutle', kutle: '-1', kBirim: 'kg' }, error: true },
    { in: { hesap: 'enerji', enerji: '', eBirim: 'J' }, error: true },
  ],
  howto: [
    '"Hesap yönü" listesinden kütleden enerjiye mi, enerjiden kütleye mi gideceğinizi seçin.',
    'Kütleden enerji için kütleyi yazıp birimini seçin: kilogram, gram, miligram, mikrogram ya da atom ve parçacık hesapları için atomik kütle birimi (u).',
    'Enerjiden kütle için enerji değerini yazıp birimini (joule, kWh ya da MeV) seçin.',
    '"Hesapla" düğmesine basın. Sonuç joule, kilowatt saat, megaelektronvolt ve TNT eşdeğeri olarak; kütle ise kilogram ve gram olarak gösterilir. Çok büyük ve çok küçük sayılar 10\'un kuvvetiyle yazılır.',
  ],
  sections: [
    { h: 'E = mc² ne anlatır?', p: [
      'Albert Einstein 1905\'te özel görelilik kuramının bir sonucu olarak, bir cismin kütlesinin onun içerdiği enerjinin ölçüsü olduğunu gösterdi. Bağıntıdaki E enerji (joule), m kütle (kilogram), c ise ışığın boşluktaki hızıdır: saniyede 299 792 458 metre. Işık hızının karesi yaklaşık 9 × 10¹⁶ gibi dev bir sayı olduğundan, çok küçük bir kütle bile olağanüstü büyük bir enerjiye karşılık gelir.',
      'Buradaki enerji, cismin hareket etmese bile yalnızca kütlesi olduğu için sahip olduğu <strong>durgun enerjidir</strong>. Bağıntı iki yönde de işler: bir sistem enerji kaybettiğinde kütlesi azalır, enerji kazandığında artar. Isıtılan bir demir parçası ya da sıkıştırılan bir yay, ölçülemeyecek kadar az da olsa daha ağırdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>1 kilogram:</strong> E = 1 × (299 792 458)² ≈ 8,98755 × 10¹⁶ J. Bu yaklaşık 2,5 × 10¹⁰ kWh, yani 25 milyar kilowatt saat eder; TNT cinsinden yaklaşık 21,5 megaton.',
      '<strong>1 gram:</strong> E ≈ 8,98755 × 10¹³ J, yaklaşık 25 milyon kWh ya da 21,5 kiloton TNT eşdeğeri. Bir ataş ağırlığındaki maddenin durgun enerjisi, büyük bir kentin günlerce tükettiği elektriğe karşılık gelir.',
      '<strong>1 atomik kütle birimi:</strong> 1 u = 1,6605 × 10⁻²⁷ kg için E ≈ 1,4924 × 10⁻¹⁰ J = 931,494 MeV. Çekirdek fiziğinde kütle farklarını enerjiye çevirirken kullanılan "1 u ≈ 931,5 MeV" eşitliği buradan gelir.',
      '<strong>Elektron:</strong> Kütlesi 9,109 × 10⁻³¹ kg olan elektronun durgun enerjisi yaklaşık 0,511 MeV\'dir. Parçacık fizikçileri kütleleri doğrudan MeV/c² birimiyle ifade eder.',
      '<strong>Ters yön:</strong> 1 kWh enerji, yalnızca 4 × 10⁻¹¹ kg, yani gramın yüz milyarda dördü kadar bir kütleye eşdeğerdir. Gündelik enerji alışverişlerinde kütle değişimini fark etmememizin nedeni budur.',
    ] },
    { h: 'Kütle gerçekten enerjiye dönüşür mü?', p: [
      'Araç, kütlenin <em>tamamının</em> enerjiye çevrildiği kuramsal durumu hesaplar. Bu ancak madde ile karşıt maddenin buluşup yok olduğu olaylarda gerçekleşir. Gündelik ve endüstriyel süreçlerde dönüşen pay çok daha küçüktür:',
    ], ul: [
      '<strong>Kimyasal tepkimeler</strong> (yanma, patlama): kütlenin kabaca on milyarda biri mertebesinde bir bölümü enerjiye gider; bu yüzden kimyada kütlenin korunduğu kabul edilir.',
      '<strong>Çekirdek bölünmesi</strong> (fisyon): yakıt kütlesinin yaklaşık binde biri enerjiye dönüşür.',
      '<strong>Çekirdek kaynaşması</strong> (füzyon): hidrojenin helyuma dönüştüğü tepkimelerde kütlenin yaklaşık binde yedisi enerji olarak açığa çıkar. Güneş bu yolla her saniye yaklaşık dört milyon ton kütle kaybeder.',
      '<strong>Madde–karşıt madde yok olması:</strong> kütlenin tamamı enerjiye dönüşür.',
    ] },
    { h: 'Kütle açığı ve bağlanma enerjisi', p: [
      'Bir atom çekirdeğinin kütlesi, onu oluşturan proton ve nötronların tek tek kütlelerinin toplamından biraz küçüktür. Aradaki farka kütle açığı denir ve çekirdeği bir arada tutan bağlanma enerjisine karşılık gelir: E<sub>bağ</sub> = Δm · c². Örneğin kütle açığı 0,03 u olan bir çekirdeğin bağlanma enerjisi 0,03 × 931,494 ≈ 27,9 MeV\'dir. Bu hesabı araçta kütle birimi olarak "u" seçip farkı yazarak doğrudan yapabilirsiniz. Nükleer santrallerin ve yıldızların enerji kaynağı, tepkime öncesi ve sonrası toplam kütleler arasındaki bu küçük farktır.',
    ] },
    { h: 'Birimler hakkında', p: [
      'Joule, SI enerji birimidir; 1 kWh = 3,6 × 10⁶ J eder ve elektrik faturalarından tanıdıktır. Elektronvolt (eV), bir elektronun bir voltluk gerilim altında kazandığı enerjidir: 1 eV = 1,602 × 10⁻¹⁹ J. Atom ve çekirdek ölçeğinde milyon elektronvolt (MeV) kullanılır. TNT eşdeğeri patlama enerjilerini karşılaştırmak için kullanılan geleneksel bir ölçüdür; 1 ton TNT 4,184 × 10⁹ J kabul edilir.',
      'Atomik kütle birimi (u ya da dalton), karbon-12 atomunun kütlesinin on ikide biridir. Proton ve nötronun kütleleri yaklaşık 1 u olduğundan atom kütleleri bu birimle kolayca ifade edilir.',
    ] },
    { h: 'Sınırlar ve yanlış anlamalar', p: [
      'E = mc² yalnızca durgun cisimler içindir. Hareketli cisimlerde toplam enerji E² = (m · c²)² + (p · c)² bağıntısıyla verilir; burada p momentumdur. Kütlesi olmayan foton için bu bağıntı E = p · c hâline gelir. Dolayısıyla "ışığın enerjisi var, öyleyse kütlesi var" çıkarımı doğru değildir.',
      'Bağıntı bir maddenin istenildiği zaman enerjiye çevrilebileceğini de söylemez; hangi dönüşümlerin mümkün olduğunu başka korunum yasaları belirler. Sonuçlar eğitim amaçlıdır ve kuramsal üst sınırı gösterir; bir yakıttan ya da reaktörden pratikte elde edilecek enerjiyi hesaplamak için kullanılmamalıdır.',
    ] },
  ],
  faq: [
    ['E = mc² formülünde c nedir?', 'Işığın boşluktaki hızıdır ve tam olarak 299 792 458 m/s\'dir. Formülde karesi alınır; c² yaklaşık 8,98755 × 10¹⁶ m²/s² eder.'],
    ['1 gram madde kaç joule enerjiye eşdeğerdir?', 'Yaklaşık 8,99 × 10¹³ joule, yani yaklaşık 25 milyon kilowatt saat. Bu, kütlenin tamamının enerjiye dönüştüğü kuramsal değerdir.'],
    ['1 atomik kütle birimi kaç MeV eder?', '1 u yaklaşık 931,494 MeV\'dir. Çekirdek tepkimelerinde kütle farkı u cinsinden bulunup bu sayıyla çarpılarak açığa çıkan enerji MeV olarak elde edilir.'],
    ['Formüle kütleyi gram olarak yazabilir miyim?', 'Elle hesapta hayır; SI birimleriyle çalışmak için kütle kilogram olmalıdır, aksi hâlde sonuç bin kat hatalı çıkar. Araçta ise birimi listeden seçmeniz yeterlidir, dönüşüm kendiliğinden yapılır.'],
    ['Nükleer santraller kütlenin tamamını enerjiye çevirir mi?', 'Hayır. Bölünme tepkimesinde yakıt kütlesinin yalnızca binde biri kadarı enerjiye dönüşür; geri kalanı tepkime ürünleri olarak varlığını sürdürür. Yine de bu oran kimyasal yakıtlarla kıyaslandığında milyonlarca kat büyüktür.'],
    ['Enerji kazanan bir cismin kütlesi artar mı?', 'Evet, ama fark edilemeyecek kadar az. 1 kWh enerji depolayan bir bataryanın kütlesi yaklaşık 4 × 10⁻¹¹ kg artar. Bu değişim en duyarlı terazilerle bile ölçülemez.'],
    ['Fotonun kütlesi var mıdır?', 'Hayır, fotonun durgun kütlesi sıfırdır. Enerjisi E = h · f ile, momentumu p = E / c ile verilir. E = mc² durgun kütlesi olan cisimlerin durgun enerjisini anlatır ve fotona bu biçimde uygulanmaz.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; yazdığınız sayılar sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['foton-enerjisi-hesapla', 'kinetik-enerji-hesapla', 'zaman-genlesmesi-hesapla', 'yari-omur-hesapla', 'bilimsel-gosterim-cevir'],
};
