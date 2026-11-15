export default {
  slug: 'fahrenheit-kelvin-cevir',
  title: 'Fahrenheit Kelvin Çevirici',
  h1Tail: '°F ↔ K',
  pageTitle: 'Fahrenheit Kelvin Çevirici – °F\'ı Kelvine, Kelvini °F\'a Çevirme',
  description: 'Fahrenheit dereceyi Kelvine, Kelvini Fahrenheit dereceye çevirin. K = (°F + 459,67) × 5/9 formülü, adım adım çözümlü örnekler ve başvuru tablosuyla.',
  card: 'Fahrenheit dereceyi Kelvine, Kelvini Fahrenheit\'a çevirin; santigrat karşılığı ve adım adım formülle.',
  category: 'birim',
  keywords: ['fahrenheit kelvin çevirme', 'kelvin fahrenheit', 'f to k', 'k to f', 'fahrenheit kelvin formülü', 'kelvin kaç fahrenheit', 'sıcaklık birimi çevirme'],
  lead: 'Fahrenheit (°F) cinsinden verilen bir sıcaklığı Kelvine (K) ya da Kelvin değerini Fahrenheit\'a çevirin. Araç <strong>K = (°F + 459,67) × 5/9</strong> bağıntısını uygular ve ara adım olan santigrat değerini de gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 72', hint: 'Fahrenheit için eksi değer yazılabilir; Kelvin negatif olamaz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['f', 'Fahrenheit (°F) → Kelvin (K)'], ['k', 'Kelvin (K) → Fahrenheit (°F)']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    let f, k;
    if (v.yon === 'k') {
      if (x < 0) h.err('Kelvin ölçeğinde negatif sıcaklık yoktur; 0 ya da daha büyük bir değer yazın.');
      k = x; f = x * 9 / 5 - 459.67;
    } else {
      if (x < -459.67 - 1e-9) h.err('Sıcaklık mutlak sıfırın (−459,67 °F) altında olamaz; daha yüksek bir değer yazın.');
      f = x; k = Math.max(0, (x + 459.67) * 5 / 9);
    }
    const c = k - 273.15;
    const rows = v.yon === 'k'
      ? [['Fahrenheit', h.fmt(f, 4) + ' °F'], ['Kelvin', h.fmt(k, 4) + ' K']]
      : [['Kelvin', h.fmt(k, 4) + ' K'], ['Fahrenheit', h.fmt(f, 4) + ' °F']];
    rows.push(['Celsius', h.fmt(c, 4) + ' °C']);
    return { rows, note: 'K = (°F + 459,67) × 5/9 ve °F = K × 9/5 − 459,67. Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  },
  cases: [
    { in: { deger: '32', yon: 'f' }, out: { 'Kelvin': '273,15 K', 'Celsius': '0 °C' } },
    { in: { deger: '300', yon: 'k' }, out: { 'Fahrenheit': '80,33 °F', 'Celsius': '26,85 °C' } },
    { in: { deger: '212', yon: 'f' }, out: { 'Kelvin': '373,15 K', 'Celsius': '100 °C' } },
    { in: { deger: '0', yon: 'k' }, out: { 'Fahrenheit': '-459,67 °F' } },
    { in: { deger: '0', yon: 'f' }, out: { 'Kelvin': '255,3722 K' } },
    { in: { deger: '98,6', yon: 'f' }, out: { 'Kelvin': '310,15 K', 'Celsius': '37 °C' } },
    { in: { deger: '-459,67', yon: 'f' }, out: { 'Kelvin': '0 K' } },
    { in: { deger: '273,15', yon: 'k' }, out: { 'Fahrenheit': '32 °F' } },
    { in: { deger: '-1', yon: 'k' }, error: true },
    { in: { deger: '-460', yon: 'f' }, error: true },
    { in: { deger: 'x', yon: 'f' }, error: true },
  ],
  howto: [
    '"Sıcaklık" alanına Fahrenheit ya da Kelvin cinsinden değerinizi yazın.',
    '"Çeviri yönü" listesinden hangi birimden hangisine geçeceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda istediğiniz karşılık, son satırda aynı sıcaklığın santigrat değeri görünür.',
    'Birden fazla değer çevirecekseniz alanı değiştirip yeniden "Çevir" düğmesine basmanız yeterlidir; sonuç her seferinde güncellenir.',
    'Sonucu "Sonucu kopyala" düğmesiyle panoya alıp raporunuza ya da hesap tablonuza yapıştırabilirsiniz.',
  ],
  sections: [
    { h: 'Bu çeviri neden iki adımlı?', p: [
      'Fahrenheit ile Kelvin arasında hem adım büyüklüğü hem de sıfır noktası farklıdır. Bir Kelvinlik değişim 1,8 Fahrenheit derecelik değişime eşittir; ayrıca Kelvin ölçeğinin sıfırı mutlak sıfırdayken Fahrenheit ölçeğinde mutlak sıfır −459,67 değerine denk düşer. Çeviri bu yüzden hem bir kaydırma hem de bir ölçekleme içerir.',
      'Birçok kişi işlemi santigrat üzerinden yapar: önce Fahrenheit santigrata çevrilir, sonra 273,15 eklenir. Doğrudan formül de aynı sonucu verir ve tek satırda yazılabilir. Araç her iki değeri de gösterdiği için hangi yolu izlerseniz izleyin sonucunuzu denetleyebilirsiniz.',
    ] },
    { h: 'Formüller', ul: [
      'Fahrenheit\'tan Kelvine: <strong>K = (°F + 459,67) × 5/9</strong>',
      'Kelvinden Fahrenheit\'a: <strong>°F = K × 9/5 − 459,67</strong>',
      'Santigrat üzerinden: <strong>°C = (°F − 32) × 5/9</strong>, ardından <strong>K = °C + 273,15</strong>',
    ] },
    { h: 'Adım adım çözümlü örnekler', p: [
      '<strong>Örnek 1 – 98,6 °F kaç Kelvindir?</strong> 98,6 + 459,67 = 558,27. Bu sayı 5 ile çarpılıp 9\'a bölünür: 558,27 × 5 ÷ 9 = 310,15 K. Santigrat yolundan denetleyelim: (98,6 − 32) × 5/9 = 37 °C; 37 + 273,15 = 310,15 K. İki yol aynı sonucu verir.',
      '<strong>Örnek 2 – 300 K kaç Fahrenheit eder?</strong> 300 × 9 ÷ 5 = 540; 540 − 459,67 = 80,33 °F. Aynı sıcaklık 26,85 °C\'dir.',
      '<strong>Örnek 3 – 0 °F kaç Kelvindir?</strong> (0 + 459,67) × 5 ÷ 9 = 255,3722 K. Burada sık yapılan hata, sıfır Fahrenheit\'ı "sıfır sıcaklık" sanmaktır; oysa 0 °F mutlak sıfırın 255 Kelvin üzerindedir.',
      '<strong>Örnek 4 – Suyun donma ve kaynama noktaları.</strong> 32 °F için (32 + 459,67) × 5/9 = 273,15 K; 212 °F için (212 + 459,67) × 5/9 = 373,15 K. Aradaki fark Fahrenheit ölçeğinde 180 derece, Kelvin ölçeğinde 100 birimdir; 180 ÷ 100 = 1,8 oranı formüldeki 9/5 katsayısının kaynağıdır.',
    ] },
    { h: '459,67 sayısı nereden geliyor?', p: [
      'Mutlak sıfır santigrat ölçeğinde −273,15 °C\'dir. Bu değeri Fahrenheit\'a çevirirsek −273,15 × 1,8 + 32 = −459,67 °F elde ederiz. Yani bir Fahrenheit değerine 459,67 eklemek, sıfırı mutlak sıfıra taşımak anlamına gelir. Bu kaydırılmış ölçeğin ayrı bir adı da vardır: <strong>Rankine</strong>. Rankine ölçeği Fahrenheit adımlarını kullanır ama sıfırı mutlak sıfırdadır; dolayısıyla Rankine değeri 5/9 ile çarpıldığında doğrudan Kelvin bulunur. Formüldeki iki işlem tam olarak budur: önce Rankine\'e geç, sonra Kelvine ölçekle.',
    ] },
    { h: 'Hangi durumlarda gerekir?', p: [
      'Türkiye\'de eğitim ve sanayi metrik birimlerle yürür; ancak Amerikan kaynaklı ders kitapları, teknik el kitapları, makine katalogları ve bilimsel makalelerde sıcaklık Fahrenheit olarak verilebilir. Termodinamik, ısı transferi ve gaz hesaplarında ise formüllere mutlak sıcaklık, yani Kelvin girilmesi gerekir. Yurt dışından gelen bir cihazın teknik belgesindeki çalışma sıcaklığını bir mühendislik hesabına aktarırken, ithal bir soğutucu akışkanın tablosunu okurken ya da İngilizce bir fizik problemini çözerken bu çeviriye ihtiyaç duyulur.',
      'Bu araç birim çevirisi yapar; cihaz seçimi ya da tasarım kararı gibi mühendislik değerlendirmeleri için ilgili standartlara ve uzman görüşüne başvurulmalıdır.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>−459,67 °F</strong> = 0 K (mutlak sıfır)',
      '<strong>−40 °F</strong> = 233,15 K',
      '<strong>0 °F</strong> = 255,3722 K',
      '<strong>32 °F</strong> = 273,15 K (suyun donma noktası)',
      '<strong>68 °F</strong> = 293,15 K (oda sıcaklığı)',
      '<strong>98,6 °F</strong> = 310,15 K (vücut sıcaklığı)',
      '<strong>212 °F</strong> = 373,15 K (suyun deniz seviyesinde kaynama noktası)',
      '<strong>80,33 °F</strong> = 300 K',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Birinci hata işlem sırasıdır: Fahrenheit\'tan Kelvine geçerken toplama önce, çarpma sonra yapılır. 5/9 ile çarpıp sonra 459,67 eklemek yanlış sonuç verir. İkinci hata 9/5 ile 5/9\'u karıştırmaktır; Kelvin sayısı Fahrenheit adımından büyük bir adımla ölçüldüğü için Fahrenheit\'tan Kelvine giderken küçülten kesir, yani 5/9 kullanılır. Üçüncü hata sıcaklık farklarında kaydırma uygulamaktır: 18 °F\'lık bir artış yalnızca 10 K\'lik artıştır, 459,67 eklenmez.',
      'Araç, Kelvin için negatif, Fahrenheit için −459,67\'den küçük değerleri kabul etmez. Sonuçlar dört ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['0 Fahrenheit kaç Kelvindir?', '0 °F yaklaşık 255,3722 K\'dir. Hesap (0 + 459,67) × 5/9 işlemiyle yapılır; santigrat karşılığı −17,7778 °C\'dir.'],
    ['1 Kelvin kaç Fahrenheit eder?', '1 K sıcaklığı −457,87 °F\'a karşılık gelir. Bir Kelvinlik sıcaklık değişimi ise 1,8 Fahrenheit derecelik değişime eşittir.'],
    ['Fahrenheit ile Kelvin hangi değerde eşit olur?', 'İki ölçek 574,5875 değerinde kesişir: 574,5875 °F aynı zamanda 574,5875 K\'dir. Bu değer F = (F + 459,67) × 5/9 denkleminin çözümüdür.'],
    ['Formülü ezberlemek zor, daha kolay bir yol var mı?', 'Santigrat üzerinden gidebilirsiniz: Fahrenheit değerinden 32 çıkarın, 5/9 ile çarpın, sonuca 273,15 ekleyin. Araç ara değer olan santigratı da gösterdiği için adımlarınızı karşılaştırabilirsiniz.'],
    ['Rankine ile Kelvin arasındaki ilişki nedir?', 'Rankine de mutlak sıfırdan başlar ama Fahrenheit adımlarını kullanır. Rankine değeri Fahrenheit değerine 459,67 eklenerek bulunur ve Kelvin değerinin 1,8 katıdır.'],
    ['Kelvin alanına neden negatif sayı yazamıyorum?', 'Kelvin mutlak sıcaklık ölçeğidir ve sıfırı ulaşılabilecek en düşük sıcaklık sınırıdır. Negatif bir Kelvin değeri gündelik fizik açısından tanımlı olmadığından araç hata mesajı verir.'],
    ['Sonuç neden kitaptaki değerden biraz farklı?', 'Bazı kaynaklar 459,67 yerine 460, 273,15 yerine 273 kullanır. Bu yuvarlamalar sonuçta bir dereceye kadar fark yaratabilir. Araç kesin sabitlerle hesaplar.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; yazdığınız sıcaklık hiçbir sunucuya gönderilmez.'],
  ],
  related: ['celsius-fahrenheit-cevir', 'celsius-kelvin-cevir', 'kelvin-rankine-cevir', 'birim-donustur', 'isi-enerjisi-hesapla'],
};
