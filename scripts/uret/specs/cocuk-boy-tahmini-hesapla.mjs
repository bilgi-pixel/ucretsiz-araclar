export default {
  slug: 'cocuk-boy-tahmini-hesapla',
  title: 'Çocuk Boy Tahmini Hesaplama',
  h1Tail: 'anne ve baba boyuna göre',
  pageTitle: 'Çocuk Boy Tahmini Hesaplama – Anne Baba Boyuna Göre Hedef Boy',
  description: 'Anne ve baba boyundan çocuğun yetişkinlikte ulaşması beklenen boyu hesaplayın. Hedef boy formülüyle tahmini değeri ve olası alt-üst aralığı görün.',
  card: 'Anne ve baba boyunu girin; çocuğunuzun yetişkinlikteki tahmini boyunu ve olası aralığı hedef boy yöntemiyle görün.',
  category: 'saglik',
  keywords: ['çocuk boy tahmini', 'çocuğum kaç boy olacak', 'hedef boy hesaplama', 'anne baba boyuna göre boy', 'genetik boy hesaplama', 'boy tahmini formülü', 'yetişkin boy tahmini'],
  lead: 'Anne ve babanın boyunu yazarak çocuğun yetişkinlikte ulaşması beklenen boyu tahmin edin. Araç, çocuk sağlığında yaygın kullanılan <strong>hedef boy (ebeveyn ortalaması)</strong> yöntemini uygular ve tek bir sayı yerine olası aralığı da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'anne', label: 'Anne boyu (cm)', type: 'number', placeholder: 'Örn. 165' },
    { id: 'baba', label: 'Baba boyu (cm)', type: 'number', placeholder: 'Örn. 180' },
    { id: 'cinsiyet', label: 'Çocuğun cinsiyeti', type: 'select', options: [['erkek', 'Erkek'], ['kiz', 'Kız']] },
  ],
  compute(v, h) {
    const anne = h.pos(v.anne, 'Anne boyu');
    const baba = h.pos(v.baba, 'Baba boyu');
    if (anne < 120 || anne > 220) h.err('"Anne boyu" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın.');
    if (baba < 120 || baba > 220) h.err('"Baba boyu" 120 ile 220 cm arasında olmalı; değeri santimetre olarak yazın.');
    const erkek = v.cinsiyet !== 'kiz';
    const hedef = (anne + baba + (erkek ? 13 : -13)) / 2;
    const alt = hedef - 8.5;
    const ust = hedef + 8.5;
    const inc = hedef / 2.54;
    const ft = Math.floor(inc / 12 + 1e-9);
    return {
      rows: [
        ['Tahmini yetişkin boyu', h.fmt(hedef, 1) + ' cm'],
        ['Olası aralık', `${h.fmt(alt, 1)} – ${h.fmt(ust, 1)} cm`],
        ['Ebeveyn boy ortalaması', h.fmt((anne + baba) / 2, 1) + ' cm'],
        ['Feet ve inç karşılığı', `${ft} ft ${h.fmt(inc - ft * 12, 1)} inç`],
      ],
      note: 'Hedef boy yöntemi: erkek çocukta (anne + baba + 13) ÷ 2, kız çocukta (anne + baba − 13) ÷ 2; aralık ±8,5 cm. Sonuç istatistiksel bir tahmindir, tıbbi değerlendirme değildir.',
    };
  },
  cases: [
    { in: { anne: '165', baba: '180', cinsiyet: 'erkek' }, out: { 'Tahmini yetişkin boyu': '179 cm', 'Olası aralık': '170,5 – 187,5 cm' } },
    { in: { anne: '165', baba: '180', cinsiyet: 'kiz' }, out: { 'Tahmini yetişkin boyu': '166 cm', 'Olası aralık': '157,5 – 174,5 cm' } },
    { in: { anne: '160', baba: '175', cinsiyet: 'erkek' }, out: { 'Tahmini yetişkin boyu': '174 cm', 'Ebeveyn boy ortalaması': '167,5 cm' } },
    { in: { anne: '158', baba: '171', cinsiyet: 'kiz' }, out: { 'Tahmini yetişkin boyu': '158 cm', 'Olası aralık': '149,5 – 166,5 cm' } },
    { in: { anne: '170,5', baba: '182', cinsiyet: 'erkek' }, out: { 'Tahmini yetişkin boyu': '182,8 cm' } },
    { in: { anne: '162', baba: '178', cinsiyet: 'kiz' }, out: { 'Tahmini yetişkin boyu': '163,5 cm', 'Feet ve inç karşılığı': '5 ft 4,4 inç' } },
    { in: { anne: '', baba: '180', cinsiyet: 'erkek' }, error: true },
    { in: { anne: '1,65', baba: '180', cinsiyet: 'erkek' }, error: true },
  ],
  howto: [
    '"Anne boyu" alanına annenin boyunu santimetre olarak yazın; 1,65 değil 165 biçiminde girin.',
    '"Baba boyu" alanına babanın boyunu aynı şekilde santimetre olarak yazın.',
    'Çocuğun cinsiyetini seçin; formül kız ve erkek çocuklar için farklı düzeltme uygular.',
    '"Hesapla" düğmesine basın. Tahmini yetişkin boyu, olası alt ve üst sınırla birlikte görünür.',
  ],
  sections: [
    { h: 'Hedef boy yöntemi nasıl çalışır?', p: [
      'Boy uzunluğu büyük ölçüde kalıtsaldır; bu yüzden bir çocuğun yetişkin boyuna dair en basit ipucu anne ve babasının boyudur. Çocuk hekimliğinde "hedef boy" ya da "ebeveyn ortalaması boyu" denilen yöntem bu fikre dayanır. Önce anne ve babanın boyları toplanır. Yetişkin erkekler ortalama olarak kadınlardan yaklaşık 13 cm daha uzun olduğu için, erkek çocukta bu toplama 13 cm eklenir, kız çocukta 13 cm çıkarılır ve sonuç ikiye bölünür.',
      'Formül şöyledir: erkek çocuk için <strong>(anne boyu + baba boyu + 13) ÷ 2</strong>, kız çocuk için <strong>(anne boyu + baba boyu − 13) ÷ 2</strong>. Yöntem tek bir kesin değer vermez; aynı anne babanın çocukları bile birbirinden farklı boylarda olabilir. Bu nedenle sonucun çevresinde yaklaşık <strong>±8,5 cm</strong>\'lik bir aralık kabul edilir ve sağlıklı çocukların büyük bölümünün yetişkin boyu bu aralığa düşer.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Annenin 165 cm, babanın 180 cm olduğunu düşünelim. İki boyun toplamı 345 cm\'dir. Erkek çocuk için 345 + 13 = 358, bunun yarısı <strong>179 cm</strong> eder. Olası aralık 179 − 8,5 = 170,5 cm ile 179 + 8,5 = 187,5 cm arasıdır.',
      'Aynı çiftin kız çocuğu için hesap 345 − 13 = 332, yarısı <strong>166 cm</strong> olur; aralık 157,5 ile 174,5 cm arasındadır. Görüldüğü gibi aynı ebeveynlerin kız ve erkek çocukları için tahmin tam 13 cm farklı çıkar. Araçtaki "Ebeveyn boy ortalaması" satırı ise düzeltme yapılmadan önceki sade ortalamayı, yani bu örnekte 172,5 cm\'yi gösterir.',
    ] },
    { h: 'Tahmin neden kesin değildir?', p: [
      'Boy tek bir genle değil, çok sayıda genin ortak etkisiyle belirlenir. Çocuk, anne ve babasından bu genlerin farklı bileşimlerini alır; büyükanne ve büyükbabalardan gelen özellikler de ortaya çıkabilir. Kardeşlerin boylarının birbirinden farklı olmasının nedeni budur.',
      'Kalıtımın yanında çevresel etkenler de rol oynar. Yeterli ve dengeli beslenme, düzenli uyku, fiziksel etkinlik, çocukluk döneminde geçirilen uzun süreli hastalıklar ve ergenliğe giriş yaşı yetişkin boyunu etkileyebilir. Ergenliğe erken giren bir çocuk yaşıtlarından önce uzar ama büyümesi de daha erken durabilir; geç giren çocuk ise uzun süre kısa görünüp sonradan arayı kapatabilir.',
      'Ayrıca çok uzun ya da çok kısa ebeveynlerin çocuklarında tahmin, toplum ortalamasına doğru bir miktar kayma eğilimindedir. İstatistikte "ortalamaya dönüş" denilen bu durum nedeniyle, uç değerlerde formülün verdiği sonuç gerçekleşen boydan biraz sapabilir.',
    ] },
    { h: 'Sonucu yorumlarken dikkat edilecekler', ul: [
      'Ebeveyn boylarını tahminen değil, ölçerek girin. Ayakkabısız, duvara yaslanarak yapılan ölçüm en doğru sonucu verir.',
      'İleri yaşlarda boy bir miktar kısalabildiği için, mümkünse anne babanın genç yetişkinlikteki boyunu kullanın.',
      'Sonuç yalnızca yetişkinlikte ulaşılacak boyla ilgilidir; çocuğun bugünkü boyunun yaşına uygun olup olmadığını göstermez.',
      'Çocuğun şu anki boyu, kilosu ya da kemik yaşı bu yönteme dahil değildir. Bunları kullanan daha ayrıntılı yöntemleri hekimler uygular.',
      'Aralık bir güvence değildir; az sayıda sağlıklı çocuk bu sınırların dışında kalabilir.',
    ] },
    { h: 'Ne zaman hekime danışılmalı?', p: [
      'Bu araç bilgilendirme amaçlıdır ve bir büyüme değerlendirmesinin yerini tutmaz. Çocuğunuzun boyu yaşıtlarından belirgin biçimde geri kalıyorsa, bir yıl içinde beklenenden çok az uzadıysa, büyüme eğrisinde zamanla alt sıralara doğru kayma varsa ya da ergenlik belirtileri çok erken veya çok geç ortaya çıktıysa bir çocuk sağlığı uzmanına başvurmanız gerekir.',
      'Hekimler düzenli boy ve kilo ölçümlerini büyüme eğrilerine işler, gerektiğinde el bilek filmiyle kemik yaşını değerlendirir ve hedef boyu bu verilerle birlikte yorumlar. Tek başına bir formül sonucu ne endişe ne de rahatlama nedeni olmalıdır.',
    ] },
  ],
  faq: [
    ['Çocuğumun boyu kaç olacak, kesin olarak hesaplanabilir mi?', 'Hayır. Hiçbir yöntem yetişkin boyunu kesin olarak bilemez. Hedef boy formülü istatistiksel bir orta nokta verir; gerçek boy çoğu çocukta bu değerin yaklaşık 8,5 cm altı ile üstü arasında kalır.'],
    ['Formüldeki 13 cm nereden geliyor?', 'Yetişkin erkeklerle kadınların ortalama boyları arasındaki fark yaklaşık 13 cm kabul edilir. Erkek çocukta anne boyunu erkek ölçeğine, kız çocukta baba boyunu kadın ölçeğine yaklaştırmak için bu değer eklenir ya da çıkarılır.'],
    ['Çocuk anne babasından daha uzun olabilir mi?', 'Evet. Tahmin aralığının üst sınırı çoğu zaman uzun ebeveynin boyunu aşar. Beslenme ve sağlık koşullarının iyileşmesiyle yeni kuşakların önceki kuşaklardan daha uzun olması da sık görülen bir durumdur.'],
    ['Çocuğun şimdiki boyunu neden sormuyorsunuz?', 'Hedef boy yöntemi yalnızca ebeveyn boylarını kullanır. Çocuğun mevcut boyuna, yaşına ve kemik yaşına dayanan yöntemler daha ayrıntılıdır ve tablo ya da hekim değerlendirmesi gerektirir.'],
    ['Kardeşler için sonuç aynı mı çıkar?', 'Aynı cinsiyetteki kardeşler için formül aynı sayıyı verir, çünkü girdiler değişmez. Gerçekte kardeşlerin boyları farklı olabilir; sonuçtaki aralık bu doğal çeşitliliği yansıtır.'],
    ['Beslenme ve spor boyu uzatır mı?', 'Dengeli beslenme, yeterli uyku ve düzenli hareket çocuğun kalıtsal boy potansiyeline ulaşmasına yardımcı olur. Ancak bunlar genetik sınırın çok ötesinde bir uzama sağlamaz; mucize vaat eden ürünlere itibar etmeyin.'],
    ['Evlat edinilmiş çocuk ya da boyu bilinmeyen ebeveyn için kullanılabilir mi?', 'Yöntem biyolojik anne ve babanın boyuna dayanır. Bu bilgilerden biri bilinmiyorsa formül uygulanamaz; bu durumda çocuğun kendi büyüme eğrisini izleyen hekim değerlendirmesi daha anlamlıdır.'],
    ['Girdiğim boy bilgileri kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ideal-kilo-hesapla', 'vki-hesapla', 'yas-hesapla', 'cm-inc-cevir', 'duzeltilmis-yas-hesapla'],
};
