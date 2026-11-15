export default {
  slug: 'merdiven-kalori-hesapla',
  title: 'Merdiven Çıkmada Yakılan Kalori Hesaplama',
  h1Tail: 'çıkış, iniş ve basamak sayısı',
  pageTitle: 'Merdiven Çıkma Kalori Hesaplama – Kaç Basamak Kaç Kalori?',
  description: 'Kilonuzu, merdiven çıkma sürenizi ve temponuzu girin; yakılan kaloriyi hesaplayın. Basamak sayısı yazarsanız tırmanılan yüksekliği ve yapılan mekanik işi de görün.',
  card: 'Merdiven çıkarken ya da inerken harcanan kaloriyi süre ve tempoya göre bulun; basamak sayısından yüksekliği görün.',
  category: 'saglik',
  keywords: ['merdiven çıkma kalori', 'merdiven çıkmak kaç kalori yakar', 'kaç basamak kaç kalori', '10 dakika merdiven çıkmak', 'merdiven inme kalori', 'merdiven egzersizi kalori', 'kat çıkma kalori'],
  lead: 'Asansör yerine merdiveni seçmek gün içine sıkıştırılabilen en pratik egzersizlerden biridir. Kilonuzu, süreyi ve temponuzu yazın; araç <strong>yakılan kaloriyi</strong> hesaplasın. Basamak sayısını da girerseniz tırmandığınız yüksekliği ve yerçekimine karşı yaptığınız işi görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'tempo', label: 'Hareket türü', type: 'select', options: [['yavas', 'Merdiven çıkma – yavaş tempo'], ['hizli', 'Merdiven çıkma – hızlı tempo'], ['inis', 'Merdiven inme']] },
    { id: 'basamak', label: 'Basamak sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 200', hint: 'Yazarsanız tırmanılan yükseklik ve mekanik iş de hesaplanır.' },
    { id: 'yukseklik', label: 'Basamak yüksekliği (cm)', type: 'number', value: '17', hint: 'Konut merdivenlerinde çoğunlukla 16–18 cm arasındadır.' },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Süre');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 600) h.err('Süre 600 dakikadan uzun olamaz; süreyi dakika olarak yazın.');
    const tablo = { yavas: 4.0, hizli: 8.8, inis: 3.5 };
    const met = tablo[v.tempo] || tablo.yavas;
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    const rows = [
      ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
      ['Dakika başına', h.fmt(kcal / sure, 1) + ' kcal/dk'],
      ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
      ['Kullanılan MET değeri', h.fmt(met, 1)],
    ];
    if (String(v.basamak ?? '').trim() !== '') {
      const basamak = h.posint(v.basamak, 'Basamak sayısı');
      const cm = h.pos(v.yukseklik, 'Basamak yüksekliği');
      if (cm < 5 || cm > 40) h.err('Basamak yüksekliği 5 ile 40 cm arasında olmalı.');
      if (basamak > 100000) h.err('Basamak sayısı 100.000\'den büyük olamaz.');
      const metre = basamak * cm / 100;
      const joule = kilo * 9.80665 * metre;
      rows.push([v.tempo === 'inis' ? 'İnilen yükseklik' : 'Tırmanılan yükseklik', h.fmt(metre, 1) + ' m']);
      rows.push(['Yaklaşık kat sayısı', h.fmt(metre / 3, 1) + ' kat']);
      rows.push(['Yerçekimine karşı iş', `${h.fmt(joule / 1000, 2)} kJ (${h.fmt(joule / 4184, 1)} kcal)`]);
      rows.push(['Tempo', h.fmt(basamak / sure, 0) + ' basamak/dk']);
      rows.push(['Basamak başına kalori', h.fmt(kcal / basamak, 2) + ' kcal']);
    }
    return {
      rows,
      note: 'Kalori, MET × kilo × süre formülüyle tahmin edilir. Bir kat yaklaşık 3 metre kabul edilmiştir. Mekanik iş, vücudun harcadığı toplam enerjinin yalnızca küçük bir bölümüdür.',
    };
  },
  cases: [
    { in: { kilo: '70', sure: '10', tempo: 'hizli' }, out: { 'Yakılan kalori': '103 kcal', 'Dakika başına': '10,3 kcal/dk', 'Net kalori (dinlenme hariç)': '91 kcal', 'Kullanılan MET değeri': '8,8' } },
    { in: { kilo: '70', sure: '10', tempo: 'yavas', basamak: '200', yukseklik: '17' }, out: { 'Yakılan kalori': '47 kcal', 'Tırmanılan yükseklik': '34 m', 'Yaklaşık kat sayısı': '11,3 kat', 'Yerçekimine karşı iş': '23,34 kJ (5,6 kcal)', 'Tempo': '20 basamak/dk', 'Basamak başına kalori': '0,23 kcal' } },
    { in: { kilo: '80', sure: '15', tempo: 'inis' }, out: { 'Yakılan kalori': '70 kcal', 'Dakika başına': '4,7 kcal/dk', 'Net kalori (dinlenme hariç)': '50 kcal' } },
    { in: { kilo: '60', sure: '30', tempo: 'yavas' }, out: { 'Yakılan kalori': '120 kcal', 'Dakika başına': '4 kcal/dk', 'Net kalori (dinlenme hariç)': '90 kcal' } },
    { in: { kilo: '90', sure: '20', tempo: 'hizli', basamak: '1000', yukseklik: '18' }, out: { 'Yakılan kalori': '264 kcal', 'Tırmanılan yükseklik': '180 m', 'Yaklaşık kat sayısı': '60 kat', 'Tempo': '50 basamak/dk', 'Basamak başına kalori': '0,26 kcal' } },
    { in: { kilo: '75', sure: '5', tempo: 'inis', basamak: '150' }, out: { 'Yakılan kalori': '22 kcal', 'İnilen yükseklik': '25,5 m' } },
    { in: { kilo: '70', sure: '', tempo: 'hizli' }, error: true },
    { in: { kilo: '70', sure: '10', tempo: 'hizli', basamak: '12,5' }, error: true },
    { in: { kilo: '0', sure: '10', tempo: 'yavas' }, error: true },
  ],
  howto: [
    '"Kilo" alanına vücut ağırlığınızı yazın. Sırt çantası ya da alışveriş poşeti taşıyorsanız ağırlığını kilonuza ekleyebilirsiniz.',
    '"Süre" alanına merdivende geçirdiğiniz toplam dakikayı girin.',
    'Hareket türünü seçin: olağan hızla çıkıyorsanız yavaş tempo, basamakları koşar adım ya da nefes nefese çıkıyorsanız hızlı tempo, aşağı iniyorsanız merdiven inme.',
    'İsterseniz çıktığınız basamak sayısını ve basamak yüksekliğini yazın; yükseklik, kat sayısı ve basamak başına kalori de hesaplanır.',
    '"Hesapla" düğmesine basın ve sonuç satırlarını inceleyin.',
  ],
  sections: [
    { h: 'Kalori nasıl hesaplanır?', p: [
      'Araç, MET (metabolik eşdeğer) yöntemini kullanır: <strong>kalori = MET × kilo (kg) × süre (saat)</strong>. MET, bir hareketin dinlenmeye göre kaç kat enerji harcattığını gösterir. Merdiven için fiziksel aktivite derlemelerinde yer alan tipik değerler şunlardır: yavaş tempoda çıkış <strong>4,0 MET</strong>, hızlı tempoda çıkış <strong>8,8 MET</strong>, merdiven inme <strong>3,5 MET</strong>.',
      'Bu katsayılar hareketin sürekliliğini varsayar. Kat aralarında durup soluklanıyorsanız, süre alanına yalnızca hareket hâlinde geçen dakikaları yazmak sonucu gerçeğe yaklaştırır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '70 kg ağırlığında biri 10 dakika boyunca hızlı tempoda merdiven çıksın. Süre 10 ÷ 60 = 0,1667 saattir. Kalori 8,8 × 70 × 0,1667 = <strong>yaklaşık 103 kcal</strong> olur; dakika başına 10,3 kcal. Dinlenme payı çıkarılınca net harcama 7,8 × 70 × 0,1667 = yaklaşık 91 kcal\'dir.',
      'Aynı kişi 10 dakikada yavaş tempoda 200 basamak çıkarsa kalori 4,0 × 70 × 0,1667 = yaklaşık 47 kcal\'dir. Basamak yüksekliği 17 cm ise tırmanılan yükseklik 200 × 0,17 = 34 metre, yani kabaca 11 kattır. Basamak başına harcama 47 ÷ 200 = yaklaşık 0,23 kcal eder.',
    ] },
    { h: 'Mekanik iş ile yakılan kalori neden farklı?', p: [
      'Fizik açısından bir kütleyi yukarı taşımak için yapılan iş <strong>W = m × g × h</strong> formülüyle bulunur. 70 kg bir kişi 34 metre yükseldiğinde 70 × 9,80665 × 34 = 23.340 joule, yani 23,34 kJ iş yapmış olur. Bu, yalnızca 5,6 kcal\'ye karşılık gelir. Oysa aynı tırmanış için MET hesabı 47 kcal vermişti.',
      'Aradaki fark, kasların verimliliğinden kaynaklanır. İnsan vücudu harcadığı kimyasal enerjinin ancak küçük bir bölümünü mekanik işe çevirir; geri kalanı ısıya dönüşür. Ayrıca kollar sallanır, gövde dengelenir, kalp ve solunum kasları daha çok çalışır. Araç, merak edenler için iki değeri yan yana gösterir; kalori takibinde esas alınması gereken MET tabanlı sonuçtur.',
    ] },
    { h: 'Merdiven inmek de kalori yakar mı?', p: [
      'Evet, ancak çıkmaya göre belirgin biçimde daha az. İnişte kaslar vücudu frenleyerek çalışır; MET değeri 3,5 olarak alınır, bu da olağan tempolu düz yürüyüşle aynı düzeydedir. 80 kg bir kişi 15 dakika merdiven indiğinde 3,5 × 80 × 0,25 = 70 kcal harcar.',
      'İniş, enerji harcaması düşük olsa da diz eklemi ve ön uyluk kasları üzerinde yük oluşturur. Diz sorunu olanların inişte trabzandan destek alması ve basamakları atlamaması yerinde olur.',
    ] },
    { h: 'Günlük hayattan senaryolar', ul: [
      '<strong>Beşinci kata çıkmak:</strong> Kat başına yaklaşık 17–18 basamak hesabıyla 85–90 basamak eder ve olağan tempoda 2 dakika kadar sürer; 70 kg biri için yaklaşık 9 kcal.',
      '<strong>Metro ve üst geçit merdivenleri:</strong> Günde birkaç kez yürüyen merdiven yerine sabit merdiveni seçmek, hafta sonunda fark edilir bir toplam oluşturur.',
      '<strong>Merdiven antrenmanı:</strong> Stadyum ya da apartman merdiveninde 20 dakika hızlı çıkış, 70 kg biri için yaklaşık 205 kcal harcatır.',
      '<strong>İş yerinde asansörsüz gün:</strong> Gün boyu toplam 10 dakikalık yavaş çıkış 70 kg için yaklaşık 47 kcal eder.',
    ] },
    { h: 'Sınırlar ve sağlık notu', p: [
      'Sonuçlar ortalama katsayılara dayalı tahminlerdir. Basamak yüksekliği, merdivenin eğimi, taşınan yük, kondisyon düzeyi ve basamakları ikişer çıkmak gibi etkenler gerçek harcamayı değiştirir. Araç kat yüksekliğini 3 metre kabul eder; binanıza göre bu değer farklı olabilir.',
      'Bu sayfa bilgilendirme amaçlıdır ve tıbbi öneri değildir. Kalp-damar hastalığı, solunum sorunu, diz ya da kalça rahatsızlığı olanlar yoğun merdiven egzersizine başlamadan önce hekime danışmalıdır. Göğüs ağrısı, baş dönmesi ya da olağandışı nefes darlığı hissederseniz durun.',
    ] },
  ],
  faq: [
    ['10 dakika merdiven çıkmak kaç kalori yakar?', '70 kg bir kişi yavaş tempoda yaklaşık 47 kcal, hızlı tempoda yaklaşık 103 kcal harcar. Kilo arttıkça değer aynı oranda yükselir; 90 kg biri hızlı tempoda 10 dakikada yaklaşık 132 kcal harcar.'],
    ['Bir basamak kaç kalori eder?', 'Tempoya ve kiloya göre değişir. 70 kg bir kişi dakikada 20 basamaklık yavaş tempoda basamak başına yaklaşık 0,23 kcal harcar. Basamak sayısını ve süreyi girerseniz araç sizin değerinizi hesaplar.'],
    ['Merdiven çıkmak mı yürümek mi daha çok kalori yakar?', 'Aynı sürede merdiven çıkmak daha fazla enerji harcatır. Yavaş tempolu çıkış 4,0 MET, orta tempolu düz yürüyüş ise yaklaşık 3,5 MET\'tir; hızlı çıkış 8,8 MET ile koşuya yakın bir yoğunluğa ulaşır.'],
    ['Mekanik iş neden bu kadar düşük çıkıyor?', 'Mekanik iş yalnızca vücut kütlesini yukarı taşımak için gereken fiziksel enerjidir. Kaslar harcadıkları enerjinin büyük bölümünü ısıya çevirdiği için vücudun gerçek harcaması bunun birkaç katıdır.'],
    ['Basamakları ikişer çıkmak daha mı etkilidir?', 'İkişer çıkmak her adımda daha büyük bir kas kuvveti gerektirir ve genellikle tempoyu yükseltir. Araçta bunun için ayrı bir katsayı yoktur; nefesinizi belirgin biçimde hızlandırıyorsa hızlı tempoyu seçebilirsiniz.'],
    ['Basamak yüksekliğini bilmiyorum, ne yazmalıyım?', 'Varsayılan 17 cm değeri konut merdivenlerinin çoğu için uygundur. Kesin değer için bir basamağın dik yüzünü cetvelle ölçebilirsiniz. Bu alan yalnızca yükseklik ve mekanik iş satırlarını etkiler, kalori sonucunu değiştirmez.'],
    ['Yük taşıyarak çıkarsam nasıl hesaplarım?', 'Taşıdığınız yükün ağırlığını kilonuza ekleyip yazabilirsiniz. Bu yaklaşık bir düzeltmedir; elde taşınan yük dengeyi zorlaştırdığı için gerçek harcama biraz daha yüksek olabilir.'],
    ['Bilgilerim kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; kilo, süre ve basamak bilgileri hiçbir yere gönderilmez.'],
  ],
  related: ['met-kalori-hesapla', 'yuruyus-kalori-hesapla', 'adim-kalori-hesapla', 'ip-atlama-kalori-hesapla', 'kalori-acigi-hesapla'],
};
