export default {
  slug: 'yuruyus-kalori-hesapla',
  title: 'Yürüyüşte Yakılan Kalori Hesaplama',
  pageTitle: 'Yürüyüşte Yakılan Kalori Hesaplama – 1 Saat Yürüyüş Kaç Kalori?',
  description: 'Kilonuza, yürüyüş sürenize ve temponuza göre yürüyüşte kaç kalori yaktığınızı hesaplayın. MET yöntemiyle çalışır; mesafeyi ve net kaloriyi de gösterir.',
  card: 'Kilo, süre ve tempoya göre yürüyüşte yakılan kaloriyi MET yöntemiyle hesaplayın; mesafe ve net kaloriyi görün.',
  category: 'saglik',
  keywords: ['yürüyüş kalori hesaplama', '1 saat yürüyüş kaç kalori', 'yürüyüşte yakılan kalori', 'tempolu yürüyüş kalori', '30 dakika yürüyüş kaç kalori', 'yürüyüş met değeri', 'yürüyerek kilo verme'],
  lead: 'Kilonuzu, yürüyüş sürenizi ve temponuzu girerek <strong>yürüyüşte yaktığınız kaloriyi</strong> hesaplayın. Araç, fiziksel aktivitelerin enerji maliyetini gösteren MET değerlerini kullanır; kat ettiğiniz mesafeyi ve dinlenme hâline göre fazladan harcadığınız net kaloriyi de verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'sure', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'tempo', label: 'Yürüyüş temposu (düz zemin)', type: 'select', options: [
      ['3.2', 'Çok yavaş, gezinti – 3,2 km/sa'],
      ['4', 'Yavaş – 4 km/sa'],
      ['4.8', 'Normal tempo – 4,8 km/sa'],
      ['5.6', 'Tempolu – 5,6 km/sa'],
      ['6.4', 'Hızlı – 6,4 km/sa'],
      ['7.2', 'Çok hızlı – 7,2 km/sa'],
      ['8', 'Yarış yürüyüşüne yakın – 8 km/sa'],
    ] },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const sure = h.pos(v.sure, 'Süre');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı.');
    if (sure > 1440) h.err('Süre en fazla 1440 dakika (24 saat) olabilir; değeri dakika olarak yazın.');
    // Yaklaşık MET değerleri (düz, sert zeminde yürüyüş)
    const tablo = { '3.2': 2.8, '4': 3.0, '4.8': 3.5, '5.6': 4.3, '6.4': 5.0, '7.2': 7.0, '8': 8.3 };
    const anahtar = Object.prototype.hasOwnProperty.call(tablo, v.tempo) ? v.tempo : '4.8';
    const met = tablo[anahtar];
    const hiz = Number(anahtar);
    const saat = sure / 60;
    const kcal = met * kilo * saat;
    const net = (met - 1) * kilo * saat;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Mesafe', h.fmt(hiz * saat, 2) + ' km'],
        ['Dakika başına', h.fmt(kcal / sure, 2) + ' kcal'],
        ['MET değeri', h.fmt(met, 1)],
      ],
      note: 'Hesap: kalori = MET × kilo × saat. Değerler düz zemin içindir ve ortalama bir tahmindir; yokuş, zemin, yaş ve kondisyon sonucu değiştirir.',
    };
  },
  cases: [
    { in: { kilo: '70', sure: '60', tempo: '4.8' }, out: { 'Yakılan kalori': '245 kcal', 'Net kalori (dinlenme hariç)': '175 kcal', 'Mesafe': '4,8 km', 'Dakika başına': '4,08 kcal', 'MET değeri': '3,5' } },
    { in: { kilo: '80', sure: '30', tempo: '5.6' }, out: { 'Yakılan kalori': '172 kcal', 'Net kalori (dinlenme hariç)': '132 kcal', 'Mesafe': '2,8 km', 'MET değeri': '4,3' } },
    { in: { kilo: '60', sure: '45', tempo: '4' }, out: { 'Yakılan kalori': '135 kcal', 'Net kalori (dinlenme hariç)': '90 kcal', 'Mesafe': '3 km', 'Dakika başına': '3 kcal' } },
    { in: { kilo: '90', sure: '60', tempo: '6.4' }, out: { 'Yakılan kalori': '450 kcal', 'Net kalori (dinlenme hariç)': '360 kcal', 'Mesafe': '6,4 km', 'MET değeri': '5' } },
    { in: { kilo: '75', sure: '20', tempo: '7.2' }, out: { 'Yakılan kalori': '175 kcal', 'Net kalori (dinlenme hariç)': '150 kcal', 'Mesafe': '2,4 km' } },
    { in: { kilo: '60', sure: '90', tempo: '3.2' }, out: { 'Yakılan kalori': '252 kcal', 'Net kalori (dinlenme hariç)': '162 kcal', 'Mesafe': '4,8 km', 'MET değeri': '2,8' } },
    { in: { kilo: '70', sure: '', tempo: '4.8' }, error: true },
    { in: { kilo: '0', sure: '60', tempo: '4.8' }, error: true },
    { in: { kilo: '70', sure: '-30', tempo: '4.8' }, error: true },
  ],
  howto: [
    'Kilonuzu kilogram olarak yazın. Sırt çantası gibi taşıdığınız belirgin bir yük varsa ağırlığını kilonuza ekleyebilirsiniz.',
    'Yürüdüğünüz süreyi dakika cinsinden girin; bir buçuk saat için 90 yazın.',
    'Temponuza en yakın seçeneği işaretleyin. Hızınızı bilmiyorsanız konuşurken zorlanmadığınız rahat tempo "Normal", cümle kurarken nefesinizin hızlandığı tempo "Tempolu" seçeneğine yakındır.',
    '"Hesapla" düğmesine basın. Yakılan toplam kalori, net kalori, mesafe ve dakika başına harcama görünür.',
  ],
  sections: [
    { h: 'Hesap hangi yönteme dayanır?', p: [
      'Araç, egzersiz biliminde yaygın kullanılan <strong>MET</strong> (metabolik eşdeğer) yöntemini uygular. 1 MET, sakin otururken harcanan enerjiye, yani vücut ağırlığının kilogramı başına saatte yaklaşık 1 kilokaloriye karşılık gelir. Bir aktivitenin MET değeri, o aktivitenin dinlenmeye göre kaç kat enerji gerektirdiğini gösterir. Formül şöyledir: <strong>kalori = MET × kilo (kg) × süre (saat)</strong>.',
      'Yürüyüşün MET değeri hıza bağlıdır. Araçta kullanılan yaklaşık değerler, fiziksel aktivitelerin enerji maliyetini derleyen başvuru tablolarındaki düz ve sert zeminde yürüyüş değerlerine dayanır:',
    ], ul: [
      '<strong>3,2 km/sa (gezinti):</strong> 2,8 MET',
      '<strong>4 km/sa (yavaş):</strong> 3,0 MET',
      '<strong>4,8 km/sa (normal):</strong> 3,5 MET',
      '<strong>5,6 km/sa (tempolu):</strong> 4,3 MET',
      '<strong>6,4 km/sa (hızlı):</strong> 5,0 MET',
      '<strong>7,2 km/sa (çok hızlı):</strong> 7,0 MET',
      '<strong>8 km/sa (yarış yürüyüşüne yakın):</strong> 8,3 MET',
    ] },
    { h: 'Çözümlü örnek: 70 kg, 1 saat normal tempo', p: [
      '70 kg ağırlığındaki bir kişi saatte 4,8 km hızla 60 dakika yürüsün. Bu tempoda MET değeri 3,5\'tir. Hesap: 3,5 × 70 × 1 = <strong>245 kcal</strong>. Aynı sürede kat edilen mesafe 4,8 km, dakika başına harcama 245 ÷ 60 = 4,08 kcal\'dir.',
      'Bu 245 kilokalorinin bir bölümünü kişi yürümese de harcayacaktı; çünkü vücut otururken de enerji tüketir. Dinlenme payı 1 MET olduğundan yürüyüşün gerçekten eklediği enerji (3,5 − 1) × 70 × 1 = <strong>175 kcal</strong>\'dir. Araç bu değeri "Net kalori" satırında gösterir. Kilo verme hesabı yaparken toplam yerine net değeri kullanmak daha gerçekçi sonuç verir.',
      'İkinci örnek: 80 kg ağırlığında biri 30 dakika tempolu (5,6 km/sa) yürürse 4,3 × 80 × 0,5 = 172 kcal harcar ve 2,8 km yol alır.',
    ] },
    { h: 'Kilo ve tempo sonucu nasıl etkiler?', p: [
      'Formülden görüldüğü gibi harcanan kalori vücut ağırlığıyla doğru orantılıdır: aynı yürüyüşte 90 kg bir kişi, 60 kg bir kişinin bir buçuk katı enerji harcar. Daha ağır bir bedeni taşımak daha çok iş gerektirir. Bu aynı zamanda kilo verdikçe aynı yürüyüşün daha az kalori yaktırdığı anlamına gelir.',
      'Tempo ise iki yönden etkiler. Hız arttıkça MET değeri yükselir; üstelik bu artış doğrusal değildir. 6,4 km/sa hızdan 7,2 km/sa hıza çıkmak MET değerini 5,0\'dan 7,0\'a taşır, çünkü bu hızlarda yürümek mekanik olarak verimsizleşir ve vücut koşuya geçmek ister. Bu nedenle süreniz kısıtlıysa tempoyu artırmak, süreniz bolsa süreyi uzatmak kalori harcamasını yükseltmenin iki ayrı yoludur.',
    ] },
    { h: 'Hızlı başvuru: 70 kg için yaklaşık değerler', ul: [
      '30 dakika normal tempo (4,8 km/sa): yaklaşık 123 kcal',
      '30 dakika tempolu (5,6 km/sa): yaklaşık 151 kcal',
      '45 dakika normal tempo: yaklaşık 184 kcal',
      '60 dakika normal tempo: 245 kcal',
      '60 dakika tempolu: 301 kcal',
      '60 dakika hızlı (6,4 km/sa): 350 kcal',
    ] },
    { h: 'Sonucu etkileyen ama hesaba girmeyen etkenler', p: [
      'MET tabloları ortalama değerlerdir ve düz, sert zemini varsayar. Gerçek harcama birçok etkene göre değişir. Yokuş yukarı yürümek harcamayı belirgin biçimde artırır; kum, çim, kar gibi yumuşak zeminler de daha çok enerji ister. Rüzgâr, taşınan yük, ayakkabı ve yürüyüş tekniği de etkilidir. Kişisel etkenler de vardır: yaş, cinsiyet, kas kütlesi ve kondisyon düzeyi aynı kilodaki iki kişinin harcamasını farklılaştırır. Koşu bandında tutamaklara yaslanmak ise harcamayı azaltır.',
      'Akıllı saat ve telefon uygulamaları nabız ve hareket verisinden tahmin yapar; onların gösterdiği değer de bir tahmindir ve bu araçla birebir tutması beklenmemelidir. Sonuçları kesin ölçüm olarak değil, yaklaşık bir büyüklük olarak değerlendirin.',
    ] },
    { h: 'Yürüyüş ve kilo kontrolü', p: [
      'Bir kilogram vücut yağı yaklaşık 7700 kilokaloriye karşılık gelir. 70 kg bir kişinin günde bir saat normal tempoda yürüyerek eklediği net harcama 175 kcal olduğuna göre, beslenmesini değiştirmeden yalnızca bu yürüyüşle bir kilogramlık açığa ulaşması yaklaşık 44 gün sürer. Bu, yürüyüşün değersiz olduğunu değil, kilo kontrolünde beslenmeyle birlikte düşünülmesi gerektiğini gösterir.',
      'Dünya Sağlık Örgütü yetişkinlere haftada en az 150 dakika orta yoğunlukta fiziksel aktivite önerir; tempolu yürüyüş bu tanıma uyar. Yürüyüşün yararı kaloriyle sınırlı değildir: kalp-damar sağlığı, kan şekeri düzeni, ruh hâli ve uyku üzerinde de olumlu etkileri bildirilmiştir.',
      'Bu araç bilgilendirme amaçlıdır. Kalp, eklem ya da solunum sorununuz varsa ya da uzun süredir hareketsizseniz egzersize başlamadan önce hekiminize danışın.',
    ] },
  ],
  faq: [
    ['1 saat yürüyüş kaç kalori yakar?', '70 kg bir kişi normal tempoda (4,8 km/sa) bir saatte yaklaşık 245 kcal, tempolu yürüyüşte (5,6 km/sa) yaklaşık 301 kcal harcar. Sonuç kilonuza ve hızınıza göre değişir.'],
    ['30 dakika yürüyüş kaç kalori yakar?', '70 kg için normal tempoda yaklaşık 123 kcal, tempolu yürüyüşte yaklaşık 151 kcal\'dir. 90 kg bir kişide aynı değerler yaklaşık 158 ve 194 kcal olur.'],
    ['MET değeri ne demek?', 'MET, bir aktivitenin dinlenme hâline göre kaç kat enerji harcattığını gösteren katsayıdır. 3,5 MET\'lik bir yürüyüş, otururken harcanan enerjinin üç buçuk katını gerektirir.'],
    ['Net kalori ile toplam kalori arasındaki fark nedir?', 'Toplam kalori, yürüyüş süresince harcanan tüm enerjidir. Net kalori ise bu süreyi oturarak geçirseydiniz harcayacağınız miktar düşüldükten sonra kalan, yani yürüyüşün gerçekten eklediği kısımdır.'],
    ['Hızlı yürümek mi, uzun yürümek mi daha çok kalori yakar?', 'İkisi de harcamayı artırır. Aynı sürede hızlı yürümek daha fazla kalori yakar; ancak yavaş tempoda süreyi uzatarak da aynı toplam harcamaya ulaşılabilir. Sürdürebileceğiniz seçenek en iyisidir.'],
    ['Yokuş yukarı yürüyüş hesaba katılıyor mu?', 'Hayır. Araçtaki değerler düz zemin içindir. Eğim arttıkça enerji harcaması belirgin biçimde yükselir; yokuşlu parkurlarda gerçek değer burada görülenden fazla olur.'],
    ['Günde 10.000 adım kaç kalori eder?', 'Adım uzunluğuna bağlı olarak 10.000 adım kabaca 6,5–8 km eder. Normal tempoda bu yaklaşık 80–100 dakikalık yürüyüştür; süreyi ve kilonuzu araca yazarak kendi değerinizi bulabilirsiniz.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kilo ve süre bilgileriniz herhangi bir sunucuya gönderilmez.'],
  ],
  related: ['adim-kalori-hesapla', 'kosu-kalori-hesapla', 'met-kalori-hesapla', 'kalori-hesapla', 'kalori-acigi-hesapla', 'bisiklet-kalori-hesapla'],
};
