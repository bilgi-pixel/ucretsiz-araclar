export default {
  slug: 'potansiyel-enerji-hesapla',
  title: 'Potansiyel Enerji Hesaplama',
  h1Tail: 'E = m · g · h',
  pageTitle: 'Potansiyel Enerji Hesaplama – mgh ile Enerji, Kütle, Yükseklik',
  description: 'Kütle, yükseklik ve yer çekimi ivmesinden çekim potansiyel enerjisini hesaplayın; enerjiden kütleyi ya da yüksekliği bulun. E = m·g·h, çözümlü örneklerle.',
  card: 'E = m·g·h ile yer çekimi potansiyel enerjisini, kütleyi ya da yüksekliği bulun; g değerini kendiniz seçin.',
  category: 'bilim',
  keywords: ['potansiyel enerji hesaplama', 'potansiyel enerji formülü', 'mgh hesaplama', 'çekim potansiyel enerjisi', 'yükseklik enerjisi', 'potansiyel enerji nasıl bulunur', 'mgh formülü'],
  lead: `Yerden belirli bir yükseklikte duran cismin <strong>yer çekimi potansiyel enerjisini</strong> hesaplayın ya da enerjisi bilinen cismin kütlesini, yüksekliğini bulun. Araç <strong>E<sub>p</sub> = m · g · h</strong> bağıntısını kullanır; yer çekimi ivmesini 9,81 yerine 10 ya da başka bir değer alabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['e', 'Potansiyel enerji (E)'], ['m', 'Kütle (m)'], ['y', 'Yükseklik (h)']] },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 10', hint: 'Kütleyi arıyorsanız boş bırakın.' },
    { id: 'yukseklik', label: 'Yükseklik (m)', type: 'number', placeholder: 'Örn. 5', hint: 'Seçtiğiniz sıfır düzeyine göre. Yüksekliği arıyorsanız boş bırakın.' },
    { id: 'g', label: 'Yer çekimi ivmesi g (m/s²)', type: 'number', value: '9,81', hint: 'Okul sorularında çoğu zaman 10 alınır. Ay için yaklaşık 1,62.' },
    { id: 'enerji', label: 'Potansiyel enerji (J)', type: 'number', placeholder: 'Örn. 490,5', hint: 'Enerjiyi arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    let m, y, e;
    if (v.bul === 'm') {
      e = h.pos(v.enerji, 'Potansiyel enerji');
      y = h.pos(v.yukseklik, 'Yükseklik');
      m = e / (g * y);
    } else if (v.bul === 'y') {
      e = h.nonneg(v.enerji, 'Potansiyel enerji');
      m = h.pos(v.kutle, 'Kütle');
      y = e / (m * g);
    } else {
      m = h.pos(v.kutle, 'Kütle');
      y = h.nonneg(v.yukseklik, 'Yükseklik');
      e = m * g * y;
    }
    const satirlar = {
      e: ['Potansiyel enerji', h.fmt(e, 4) + ' J'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      y: ['Yükseklik', h.fmt(y, 4) + ' m'],
    };
    const sira = v.bul === 'm' ? ['m', 'e', 'y'] : v.bul === 'y' ? ['y', 'e', 'm'] : ['e', 'm', 'y'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Enerji (kJ)', h.fmt(e / 1000, 4) + ' kJ'],
        ['Cismin ağırlığı', h.fmt(m * g, 4) + ' N'],
        ['Serbest bırakılırsa yere çarpma hızı', h.fmt(Math.sqrt(2 * g * y), 4) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. Çarpma hızı hava direnci yok sayılarak √(2·g·h) ile bulunur.`,
    };
  },
  cases: [
    { in: { bul: 'e', kutle: '10', yukseklik: '5', g: '9,81' }, out: { 'Potansiyel enerji': '490,5 J', 'Cismin ağırlığı': '98,1 N', 'Serbest bırakılırsa yere çarpma hızı': '9,9045 m/s' } },
    { in: { bul: 'e', kutle: '2', yukseklik: '10', g: '10' }, out: { 'Potansiyel enerji': '200 J', 'Enerji (kJ)': '0,2 kJ' } },
    { in: { bul: 'y', kutle: '10', g: '9,81', enerji: '981' }, out: { 'Yükseklik': '10 m' } },
    { in: { bul: 'm', yukseklik: '2', g: '9,81', enerji: '196,2' }, out: { 'Kütle': '10 kg', 'Cismin ağırlığı': '98,1 N' } },
    { in: { bul: 'e', kutle: '70', yukseklik: '3', g: '9,81' }, out: { 'Potansiyel enerji': '2.060,1 J', 'Enerji (kJ)': '2,0601 kJ' } },
    { in: { bul: 'e', kutle: '5', yukseklik: '20', g: '10' }, out: { 'Potansiyel enerji': '1.000 J', 'Serbest bırakılırsa yere çarpma hızı': '20 m/s' } },
    { in: { bul: 'e', kutle: '4', yukseklik: '0', g: '10' }, out: { 'Potansiyel enerji': '0 J' } },
    { in: { bul: 'e', kutle: '0', yukseklik: '5', g: '9,81' }, error: true },
    { in: { bul: 'e', kutle: '5', yukseklik: '5', g: '0' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden potansiyel enerji, kütle ya da yükseklikten hangisini aradığınızı seçin.`,
    `Bildiğiniz değerleri yazın: kütle kilogram, yükseklik metre, enerji joule cinsindendir. Aradığınız büyüklüğün kutusunu boş bırakabilirsiniz.`,
    `Yer çekimi ivmesi kutusunda 9,81 hazır gelir. Sorunuzda g = 10 m/s² verilmişse ya da başka bir gök cismi için hesap yapıyorsanız bu değeri değiştirin.`,
    `"Hesapla" düğmesine basın. Sonuçta aradığınız değerle birlikte enerjinin kilojoule karşılığı, cismin ağırlığı ve o yükseklikten bırakıldığında yere çarpma hızı gösterilir.`,
  ],
  sections: [
    { h: 'Potansiyel enerji nedir?', p: [
      `Potansiyel enerji, bir cismin konumu ya da durumu nedeniyle depoladığı enerjidir. Bu sayfada hesaplanan tür, <em>yer çekimi (çekim) potansiyel enerjisidir</em>: bir cismi yukarı kaldırmak için yer çekimine karşı iş yaparsınız ve bu iş cisimde enerji olarak saklanır. Cisim serbest bırakıldığında saklanan enerji harekete, yani kinetik enerjiye dönüşür.`,
      `Raftaki kitap, baraj gölündeki su, vinçle kaldırılmış yük ve tepedeki kızak yer çekimi potansiyel enerjisine sahiptir. Hidroelektrik santraller tam olarak bu enerjiyi kullanır: yüksekteki su aşağı inerken türbini döndürür.`,
    ] },
    { h: 'Formül: E = m · g · h', p: [
      `Yeryüzüne yakın bölgede çekim potansiyel enerjisi <strong>E<sub>p</sub> = m · g · h</strong> ile bulunur. m kilogram cinsinden kütle, g yer çekimi ivmesi (m/s²), h ise seçilen sıfır düzeyinden itibaren metre cinsinden yüksekliktir. Sonuç joule (J) olarak çıkar.`,
      `m · g çarpımı cismin ağırlığıdır; dolayısıyla formül "ağırlık çarpı yükseklik" olarak da okunabilir. Diğer büyüklükler için <code>m = E ÷ (g · h)</code> ve <code>h = E ÷ (m · g)</code> biçimleri kullanılır.`,
      `Yer çekimi ivmesi yeryüzünde enleme ve yüksekliğe göre az da olsa değişir; standart değer yaklaşık 9,81 m/s² kabul edilir. Lise sorularında işlem kolaylığı için çoğunlukla 10 m/s² verilir. Hangi değerin kullanılacağı soruda yazar; araçta bu yüzden g ayrı bir kutudur.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 10 kg kütleli bir koli 5 m yükseklikteki rafa konuyor (g = 9,81). E = 10 × 9,81 × 5 = <strong>490,5 J</strong>. Kolinin ağırlığı 98,1 N'dur; raftan düşerse yere yaklaşık 9,9 m/s hızla çarpar.`,
      `<strong>Örnek 2:</strong> 2 kg'lık bir cisim 10 m yükseklikte (g = 10). E = 2 × 10 × 10 = <strong>200 J</strong>.`,
      `<strong>Örnek 3:</strong> 10 kg'lık bir cismin potansiyel enerjisi 981 J ise yüksekliği h = 981 ÷ (10 × 9,81) = <strong>10 m</strong> olur.`,
      `<strong>Örnek 4:</strong> 2 m yükseklikte 196,2 J potansiyel enerjiye sahip cismin kütlesi m = 196,2 ÷ (9,81 × 2) = <strong>10 kg</strong> bulunur.`,
      `<strong>Örnek 5:</strong> 70 kg'lık bir kişi bir kat (yaklaşık 3 m) merdiven çıktığında potansiyel enerjisi 70 × 9,81 × 3 = <strong>2.060,1 J</strong> artar; bu yaklaşık 2,06 kJ'dür.`,
    ] },
    { h: 'Sıfır düzeyi (referans noktası) seçimi', p: [
      `Potansiyel enerjinin mutlak bir değeri yoktur; yükseklik her zaman seçtiğiniz bir sıfır düzeyine göre ölçülür. Masanın üstündeki bir kalemin potansiyel enerjisi masaya göre sıfır, zemine göre pozitiftir. Fizik problemlerinde önemli olan iki konum arasındaki <strong>enerji farkıdır</strong> ve bu fark sıfır düzeyinin nereye konduğuna bağlı değildir.`,
      `Sıfır düzeyinin altındaki konumlarda potansiyel enerji negatif olur; örneğin zemin sıfır seçilmişse kuyunun dibindeki taşın enerjisi eksidir. Bu araç yüksekliği sıfır ya da pozitif kabul eder; negatif durumlarda aynı büyüklüğü hesaplayıp işaretini kendiniz yorumlayabilirsiniz.`,
    ] },
    { h: 'Kinetik enerjiye dönüşüm', p: [
      `Hava direnci ve sürtünme ihmal edildiğinde mekanik enerji korunur: cisim düşerken kaybettiği potansiyel enerji kadar kinetik enerji kazanır. m · g · h = ½ · m · v² eşitliğinden kütle sadeleşir ve yere çarpma hızı <strong>v = √(2 · g · h)</strong> bulunur. Dikkat çekici sonuç şudur: hava direnci yoksa çarpma hızı kütleye bağlı değildir.`,
      `Araç bu hızı ayrı bir satırda verir. 20 m yükseklikten bırakılan cisim g = 10 için √(2 × 10 × 20) = 20 m/s hızla yere ulaşır. Gerçekte hava direnci özellikle hafif ve geniş yüzeyli cisimlerde hızı belirgin biçimde düşürür.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Kütle yerine ağırlığı yazıp ayrıca g ile çarpmak; ağırlık zaten m · g'dir.`,
      `Yüksekliği santimetre olarak bırakmak; 150 cm, 1,5 m olarak yazılmalıdır.`,
      `Soruda g = 10 verildiği hâlde 9,81 ile hesaplamak ya da tersi.`,
      `Eğik düzlemde yol uzunluğunu yükseklik sanmak; formüldeki h düşey yüksekliktir.`,
      `m · g · h bağıntısı g'nin sabit sayılabildiği, yeryüzüne yakın yükseklikler için geçerlidir. Uydu yörüngeleri gibi çok büyük yüksekliklerde genel kütle çekim potansiyel enerjisi bağıntısı kullanılır. Yay gibi esnek cisimlerin potansiyel enerjisi de ayrı bir formülle hesaplanır.`,
    ] },
  ],
  faq: [
    ['Potansiyel enerji formülü nedir?', `Yer çekimi potansiyel enerjisi kütle, yer çekimi ivmesi ve yüksekliğin çarpımıdır: E = m · g · h. Kütle kg, g m/s², yükseklik m alındığında sonuç joule olur.`],
    ['g değeri 9,81 mi 10 mu alınmalı?', `Gerçek değer yaklaşık 9,81 m/s²'dir. Okul sorularında işlem kolaylığı için 10 verilebilir; soruda hangi değer yazıyorsa onu kullanın. Araçta g kutusunu istediğiniz gibi değiştirebilirsiniz.`],
    ['Yükseklik iki katına çıkarsa enerji ne olur?', `Potansiyel enerji yükseklikle doğru orantılıdır; yükseklik iki katına çıkınca enerji de iki katına çıkar. Aynı şey kütle için de geçerlidir.`],
    ['Potansiyel enerji negatif olabilir mi?', `Evet, cisim seçilen sıfır düzeyinin altındaysa potansiyel enerjisi negatif kabul edilir. Fiziksel olarak anlamlı olan iki konum arasındaki enerji farkıdır.`],
    ['Ay\'da potansiyel enerji nasıl hesaplanır?', `Formül aynıdır, yalnızca g değişir. Ay yüzeyinde çekim ivmesi yaklaşık 1,62 m/s² olduğundan aynı kütle ve yükseklik için enerji Dünya'dakinin yaklaşık altıda biri kadardır. g kutusuna 1,62 yazmanız yeterlidir.`],
    ['Potansiyel enerjiden çarpma hızı nasıl bulunur?', `Hava direnci yok sayılırsa potansiyel enerjinin tamamı kinetik enerjiye dönüşür ve hız v = √(2 · g · h) olur. Sonuç kütleden bağımsızdır; araç bu değeri ayrı satırda gösterir.`],
    ['Esneklik potansiyel enerjisi bu araçla hesaplanır mı?', `Hayır. Gerilmiş ya da sıkıştırılmış yayın enerjisi ½ · k · x² bağıntısıyla bulunur ve yay sabitine bağlıdır. Bu sayfa yalnızca yer çekimi potansiyel enerjisini hesaplar.`],
    ['Girdiğim değerler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez, kaydedilmez.`],
  ],
  related: ['kinetik-enerji-hesapla', 'serbest-dusme-hesapla', 'is-hesapla', 'kutle-agirlik-hesapla', 'guc-hesapla'],
};
