export default {
  slug: 'ton-kg-cevir',
  title: 'Ton Kilogram Çevirici',
  h1Tail: 'ton ↔ kg',
  pageTitle: 'Ton Kilogram Çevirici – Ton Kaç kg, Metrik, ABD ve İngiliz Tonu',
  description: 'Tonu kilograma, kilogramı tona çevirin. Metrik ton (1.000 kg), ABD short tonu ve İngiliz long tonu arasındaki farkı tek sonuçta, kental ve pound ile görün.',
  card: 'Tonu kilograma, kilogramı tona çevirin; metrik ton, ABD short ton ve İngiliz long ton karşılıklarıyla birlikte.',
  category: 'birim',
  keywords: ['ton kg çevirme', '1 ton kaç kg', 'kg ton hesaplama', 'metrik ton', 'short ton kaç kg', 'long ton kaç kg', 'ton kilogram dönüştürme', 'kental kaç kg'],
  lead: 'Bir yükün ağırlığını ton ile kilogram arasında çevirin. Türkiye\'de kullanılan <strong>metrik ton 1.000 kilogramdır</strong>; araç ayrıca ABD\'de kullanılan short ton ile İngiliz long tonunu da tanır ve hepsini aynı sonuçta yan yana gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 2,5', hint: 'Binlik ayraç kullanmayın (25000 yazın) ya da 25.000,00 biçiminde yazın.' },
    { id: 'birim', label: 'Girdiğiniz birim', type: 'select', options: [['t', 'Metrik ton (t)'], ['kg', 'Kilogram (kg)'], ['short', 'ABD tonu (short ton)'], ['long', 'İngiliz tonu (long ton)']] },
  ],
  compute(v, h) {
    const LB = 0.45359237;
    const KAT = { t: 1000, kg: 1, short: 2000 * LB, long: 2240 * LB };
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kat = KAT[v.birim];
    if (!kat) h.err('Listeden geçerli bir birim seçin.');
    const kg = x * kat;
    const kgSatir = ['Kilogram', h.fmt(kg, 4) + ' kg'];
    const tSatir = ['Metrik ton', h.fmt(kg / 1000, 6) + ' t'];
    return {
      rows: [
        ...(v.birim === 'kg' ? [tSatir, kgSatir] : [kgSatir, tSatir]),
        ['ABD tonu (short ton)', h.fmt(kg / KAT.short, 4) + ' sh tn'],
        ['İngiliz tonu (long ton)', h.fmt(kg / KAT.long, 4) + ' long tn'],
        ['Kental (100 kg)', h.fmt(kg / 100, 4) + ' q'],
        ['Pound', h.fmt(kg / LB, 2) + ' lb'],
      ],
      note: '1 metrik ton = 1.000 kg; 1 short ton = 2.000 lb = 907,18474 kg; 1 long ton = 2.240 lb = 1.016,0469088 kg.',
    };
  },
  cases: [
    { in: { deger: '2,5', birim: 't' }, out: { 'Kilogram': '2.500 kg', 'Kental (100 kg)': '25 q' } },
    { in: { deger: '1500', birim: 'kg' }, out: { 'Metrik ton': '1,5 t', 'Kilogram': '1.500 kg' } },
    { in: { deger: '1', birim: 'short' }, out: { 'Kilogram': '907,1847 kg', 'Pound': '2.000 lb', 'Metrik ton': '0,907185 t' } },
    { in: { deger: '1', birim: 'long' }, out: { 'Kilogram': '1.016,0469 kg', 'Pound': '2.240 lb', 'ABD tonu (short ton)': '1,12 sh tn' } },
    { in: { deger: '1000', birim: 'kg' }, out: { 'Metrik ton': '1 t', 'ABD tonu (short ton)': '1,1023 sh tn', 'İngiliz tonu (long ton)': '0,9842 long tn', 'Pound': '2.204,62 lb' } },
    { in: { deger: '750', birim: 'kg' }, out: { 'Metrik ton': '0,75 t', 'Kental (100 kg)': '7,5 q' } },
    { in: { deger: '0', birim: 't' }, out: { 'Kilogram': '0 kg' } },
    { in: { deger: 'iki ton', birim: 't' }, error: true },
    { in: { deger: '-1', birim: 'kg' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına değeri yazın. Büyük sayılarda binlik ayraç koymayın; 25000 ya da 25.000,00 biçiminde yazın.',
    '"Girdiğiniz birim" listesinden değerin hangi birimde olduğunu seçin: metrik ton, kilogram, ABD tonu ya da İngiliz tonu.',
    '"Çevir" düğmesine basın. Ton girdiyseniz ilk satırda kilogram, kilogram girdiyseniz ilk satırda metrik ton karşılığı görünür.',
    'Yabancı bir belgeyle çalışıyorsanız alt satırlardaki short ton, long ton ve pound değerlerini karşılaştırarak hangi tonun kastedildiğini doğrulayın.',
  ],
  sections: [
    { h: 'Ton kaç kilogramdır?', p: [
      'Türkiye\'de ve metrik sistemi kullanan bütün ülkelerde ton, <strong>1.000 kilogram</strong> demektir. Uluslararası yazımda simgesi küçük <strong>t</strong> harfidir ve İngilizce metinlerde öbür tonlardan ayırt etmek için "tonne" ya da "metric ton" diye yazılır. Bin kilogram aynı zamanda bir megagramdır, ancak bu ad gündelik hayatta neredeyse hiç kullanılmaz.',
      'Çeviri bu yüzden çok basittir: tonu kilograma çevirmek için 1.000 ile çarpar, kilogramı tona çevirmek için 1.000\'e bölersiniz. <strong>kg = t × 1.000</strong> ve <strong>t = kg ÷ 1.000</strong>. Ondalık virgülü üç basamak kaydırmak yeterlidir: 2,5 ton 2.500 kg, 750 kg ise 0,75 tondur.',
    ] },
    { h: 'Üç farklı ton: metrik, short ve long', p: [
      'İşin karıştığı yer, İngilizce "ton" sözcüğünün üç ayrı birimi anlatabilmesidir. ABD\'de gündelik hayatta kullanılan <strong>short ton</strong> 2.000 pounddur ve 907,18474 kilograma eşittir. Birleşik Krallık\'ın eski ölçü sistemindeki <strong>long ton</strong> ise 2.240 pounddur ve 1.016,0469088 kilogram eder. Metrik ton bu ikisinin arasında kalır.',
      'Fark küçük görünse de büyük yüklerde önem kazanır. 1.000 short ton yalnızca 907,18 metrik ton ederken 1.000 long ton 1.016,05 metrik tona karşılık gelir; ikisi arasında yaklaşık 109 tonluk fark vardır. ABD kaynaklı bir teklif, navlun belgesi ya da makine kataloğunda yalnızca "ton" yazıyorsa hangi tonun kastedildiğini karşı taraftan yazılı olarak teyit etmek gerekir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Bir kamyona 2,5 ton kum yüklenecek. 2,5 × 1.000 = 2.500 kg eder; bu aynı zamanda 25 kentaldir.',
      'Örnek 2: Kantar fişinde 1.500 kg yazıyor. 1.500 ÷ 1.000 = 1,5 ton.',
      'Örnek 3: ABD\'den gelen bir teklifte makinenin ağırlığı 1 short ton olarak verilmiş. 1 × 907,18474 = 907,1847 kg, yani 0,907185 metrik ton. Vinç ya da forklift seçerken bu değeri kullanmalısınız.',
      'Örnek 4: Eski bir İngiliz gemi belgesinde 1 long ton yazıyor. Karşılığı 1.016,0469 kg\'dır ve bu 1,12 short tona eşittir, çünkü 2.240 ÷ 2.000 = 1,12.',
      'Örnek 5: 1.000 kg, yani 1 metrik ton; 1,1023 short ton, 0,9842 long ton ve 2.204,62 pound eder.',
    ] },
    { h: 'Kental ve diğer ara birimler', p: [
      'Tarımda ve hububat ticaretinde sık duyulan <strong>kental</strong> (kentner) 100 kilogramdır; bir ton 10 kental eder. Buğday, arpa ve pamuk verimi anlatılırken "dekara şu kadar kental" ifadesi hâlâ kullanılır. Araç, girdiğiniz ağırlığın kental karşılığını ayrı bir satırda gösterir.',
      'Halk arasında bazen ton yerine "bin kilo" denir; ikisi aynı şeydir. Buna karşılık gemicilikte geçen "gros ton" ve "net ton" ağırlık değil, geminin kapalı hacmini anlatan ölçülerdir. Soğutma ve klima kapasitesinde kullanılan "ton" da bir güç birimidir. Bu sayfa yalnızca kütle birimi olan tonu çevirir.',
    ] },
    { h: 'Türkiye\'de kullanım alanları', ul: [
      '<strong>Nakliye ve lojistik:</strong> kamyon, tır ve konteyner yükleri ton üzerinden planlanır; araçların azami yüklü ağırlığı ve dingil sınırları ton ile ifade edilir.',
      '<strong>İnşaat:</strong> demir, çimento, kum, mıcır ve hazır beton bileşenleri ton ile satılır; şantiye hesabında kilograma çevirmek gerekir.',
      '<strong>Tarım:</strong> hasat miktarı, yem, gübre ve hububat alımları ton ya da kental ile konuşulur.',
      '<strong>Hurda ve geri dönüşüm:</strong> fiyatlar kilogram başına verilir, toplam ise ton ile anılır.',
      '<strong>Yakıt ve maden:</strong> kömür, cevher ve mermer blokları ton ile tartılır.',
      '<strong>Dış ticaret:</strong> ithalat ve ihracat belgelerinde metrik ton, short ton ve long ton ayrımı sözleşme tutarını doğrudan etkiler.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık yapılan hata, İngilizce belgedeki "ton" sözcüğünü sorgulamadan 1.000 kg kabul etmektir. İkinci hata, girdide binlik ayraç olarak tek nokta kullanmaktır: araç "1.500" yazımını ondalıklı sayı, yani 1,5 olarak okur. Bin beş yüz yazmak için 1500 ya da 1.500,00 biçimini kullanın.',
      'Araç negatif değer kabul etmez ve yalnızca birim çevirir. Bir aracın taşıyabileceği yük, köprü ve yol ağırlık sınırları ya da kaldırma ekipmanının kapasitesi gibi kararlar için bu sonuç tek başına yeterli değildir; ruhsat bilgilerine, üretici verilerine ve güncel mevzuata bakılmalı, gerekirse yetkili bir mühendise danışılmalıdır.',
    ] },
  ],
  faq: [
    ['1 ton kaç kilogramdır?', 'Türkiye\'de kullanılan metrik ton 1.000 kilogramdır. ABD\'deki short ton 907,18474 kg, İngiliz long tonu ise 1.016,0469088 kg eder.'],
    ['1 kilogram kaç tondur?', '1 kilogram 0,001 tondur. Kilogram değerini 1.000\'e bölerek tona çevirirsiniz; 250 kg 0,25 ton, 12.000 kg 12 ton eder.'],
    ['Yarım ton kaç kilodur?', 'Yarım ton 500 kilogramdır. Çeyrek ton 250 kg, bir buçuk ton 1.500 kg eder.'],
    ['Metrik ton ile ton aynı şey mi?', 'Türkçede evet; "ton" denildiğinde 1.000 kilogramlık metrik ton anlaşılır. İngilizce metinlerde ise "ton" çoğu zaman short tonu, "tonne" ya da "metric ton" ise 1.000 kilogramı anlatır.'],
    ['Short ton ile long ton arasındaki fark nedir?', 'Short ton 2.000 pound (907,18474 kg), long ton 2.240 pound (1.016,0469088 kg) eder. Long ton, short tondan yüzde 12 daha ağırdır. Short ton ABD\'de, long ton Birleşik Krallık\'ın eski ölçü sisteminde kullanılır.'],
    ['1 ton kaç kentaldir?', '1 ton 10 kentaldir, çünkü bir kental 100 kilogramdır. 3,5 ton buğday 35 kental eder.'],
    ['Ton simgesi büyük harfle mi yazılır?', 'Metrik tonun simgesi küçük t harfidir. Büyük T, uluslararası birim sisteminde manyetik akı yoğunluğu birimi olan teslanın simgesidir; bu yüzden ağırlık yazarken küçük harf kullanmak doğrudur.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız ağırlık sunucuya iletilmez ve saklanmaz. Sayfa yüklendikten sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['kg-gram-cevir', 'kg-pound-cevir', 'birim-donustur', 'beton-hesapla', 'desi-hesapla'],
};
