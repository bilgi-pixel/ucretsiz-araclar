export default {
  slug: 'rampa-egimi-hesapla',
  title: 'Rampa Eğimi Hesaplama',
  h1Tail: 'uzunluk ve yüzde eğim',
  pageTitle: 'Rampa Eğimi Hesaplama – Rampa Uzunluğu ve Yüzde Eğim',
  description: 'Aşılacak yüksekliğe ve istenen eğime göre gereken rampa uzunluğunu ya da mevcut rampanın yüzde eğimini, açısını ve 1:n oranını hesaplayın.',
  card: 'Yükseklik ve hedef eğimden rampa uzunluğunu ya da mevcut rampanın yüzde eğimini, açısını ve oranını bulun.',
  category: 'insaat',
  keywords: ['rampa eğimi hesaplama', 'rampa uzunluğu hesaplama', 'engelli rampası eğimi', 'rampa kaç metre olmalı', 'garaj rampası eğimi', 'rampa yüzde hesabı', 'rampa açısı'],
  lead: `Aşmanız gereken yükseklik farkını ve hedef eğimi girin, <strong>rampanın kaç metre olması gerektiğini</strong> öğrenin; ya da mevcut bir rampanın uzunluğunu yazıp <strong>yüzde eğimini</strong>, açısını ve 1:n oranını bulun.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yukseklik', label: 'Aşılacak yükseklik (cm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'bilinen', label: 'Hesap türü', type: 'select', options: [['egim', 'Hedef eğim belli → rampa uzunluğunu bul'], ['uzunluk', 'Rampa yatay uzunluğu belli → eğimi bul']] },
    { id: 'deger', label: 'Hedef eğim (%) ya da yatay uzunluk (m)', type: 'number', placeholder: 'Örn. 8', hint: 'İlk hesap türünde yüzde eğimi (örn. 8), ikincisinde rampanın yatay uzunluğunu metre olarak yazın.' },
  ],
  compute(v, h) {
    const hCm = h.pos(v.yukseklik, 'Aşılacak yükseklik');
    const hM = hCm / 100;
    let yatay; let oran;
    if (v.bilinen === 'uzunluk') {
      yatay = h.pos(v.deger, 'Yatay uzunluk');
      oran = hM / yatay;
    } else {
      const yz = h.pos(v.deger, 'Hedef eğim');
      if (yz > 100) h.err('Hedef eğim %100\'den büyük olamaz; rampalar için genellikle %5–15 arası değerler kullanılır.');
      oran = yz / 100;
      yatay = hM / oran;
    }
    const yuzey = Math.sqrt(yatay * yatay + hM * hM);
    const aci = Math.atan(oran) * 180 / Math.PI;
    const ana = v.bilinen === 'uzunluk'
      ? [['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)], ['Yatay uzunluk', h.fmt(yatay, 2) + ' m']]
      : [['Gereken yatay uzunluk', h.fmt(yatay, 2) + ' m'], ['Eğim yüzdesi', '%' + h.fmt(oran * 100, 2)]];
    return {
      rows: [
        ...ana,
        ['Rampa yüzey uzunluğu', h.fmt(yuzey, 2) + ' m'],
        ['Eğim açısı', h.fmt(aci, 2) + '°'],
        ['Oran (düşey:yatay)', '1:' + h.fmt(1 / oran, 2)],
        ['Her 1 m yatayda yükselme', h.fmt(oran * 100, 2) + ' cm'],
      ],
      note: 'Sahanlık (dinlenme düzlüğü) uzunlukları hesaba dahil değildir. Erişilebilirlik rampalarında izin verilen eğim ve sahanlık koşulları için güncel standart ve yönetmelikleri kontrol edin.',
    };
  },
  cases: [
    { in: { yukseklik: '50', bilinen: 'egim', deger: '8' }, out: { 'Gereken yatay uzunluk': '6,25 m', 'Rampa yüzey uzunluğu': '6,27 m', 'Eğim açısı': '4,57°', 'Oran (düşey:yatay)': '1:12,5' } },
    { in: { yukseklik: '30', bilinen: 'uzunluk', deger: '6' }, out: { 'Eğim yüzdesi': '%5', 'Eğim açısı': '2,86°', 'Oran (düşey:yatay)': '1:20' } },
    { in: { yukseklik: '100', bilinen: 'egim', deger: '10' }, out: { 'Gereken yatay uzunluk': '10 m', 'Rampa yüzey uzunluğu': '10,05 m', 'Eğim açısı': '5,71°' } },
    { in: { yukseklik: '15', bilinen: 'egim', deger: '6' }, out: { 'Gereken yatay uzunluk': '2,5 m', 'Her 1 m yatayda yükselme': '6 cm' } },
    { in: { yukseklik: '120', bilinen: 'egim', deger: '12' }, out: { 'Gereken yatay uzunluk': '10 m', 'Rampa yüzey uzunluğu': '10,07 m' } },
    { in: { yukseklik: '45', bilinen: 'uzunluk', deger: '3' }, out: { 'Eğim yüzdesi': '%15', 'Eğim açısı': '8,53°', 'Oran (düşey:yatay)': '1:6,67' } },
    { in: { yukseklik: '50', bilinen: 'egim', deger: '0' }, error: true },
    { in: { yukseklik: '', bilinen: 'egim', deger: '8' }, error: true },
  ],
  howto: [
    'Rampanın alt ve üst noktası arasındaki kot farkını santimetre olarak ölçüp "Aşılacak yükseklik" alanına yazın.',
    'Rampa yapacaksanız "Hedef eğim belli" seçeneğini, var olan bir rampayı değerlendirecekseniz "Rampa yatay uzunluğu belli" seçeneğini işaretleyin.',
    'Üçüncü kutuya ilk durumda yüzde eğimi, ikinci durumda rampanın yatay izdüşüm uzunluğunu metre olarak girin.',
    '"Hesapla" düğmesine basın; rampa uzunluğu, eğim yüzdesi, açı ve oran birlikte gösterilir.',
    'Bulduğunuz uzunluk yerinize sığmıyorsa eğimi artırmak yerine rampayı dönüşlü (L ya da U biçiminde) planlamayı düşünün.',
  ],
  sections: [
    { h: 'Rampa eğimi nasıl hesaplanır?', p: [
      `Rampa eğimi, aşılan yüksekliğin rampanın yatay uzunluğuna oranıdır: <strong>eğim (%) = yükseklik ÷ yatay uzunluk × 100</strong>. Formül ters çevrildiğinde belirli bir eğim için gereken uzunluk elde edilir: <strong>yatay uzunluk = yükseklik ÷ (eğim ÷ 100)</strong>. Araç yüksekliği santimetre olarak alır, metreye çevirir ve uzunluğu metre olarak verir.`,
      `Rampanın üzerinde yürüdüğünüz ya da tekerleğin döndüğü yüzey, yatay izdüşümden biraz uzundur. Bu yüzey uzunluğu Pisagor bağıntısıyla bulunur: <strong>yüzey = √(yatay² + yükseklik²)</strong>. Kaplama, korkuluk ve kaymaz bant gibi malzemelerin metrajını çıkarırken yüzey uzunluğunu, yer planlaması yaparken yatay uzunluğu kullanmak gerekir.`,
    ] },
    { h: 'Çözümlü örnek: 50 cm yükseklik için rampa', p: [
      `Bina girişinde üç basamakla aşılan 50 cm'lik bir kot farkı olsun ve rampanın %8 eğimle yapılması istensin. Yatay uzunluk 0,50 ÷ 0,08 = 6,25 m çıkar. Yüzey uzunluğu √(6,25² + 0,50²) = 6,27 m, eğim açısı 4,57 derece, oran 1:12,5'tir. Aynı yükseklik %5 eğimle aşılmak istenirse rampa 10 m'ye uzar; %10 eğimde ise 5 m yeter. Görüldüğü gibi eğimdeki birkaç puanlık değişiklik rampa boyunu metrelerce etkiler.`,
      `Ters yönde bir örnek: 30 cm yüksekliğe çıkan ve yatayda 6 m yer kaplayan mevcut bir rampanın eğimi 0,30 ÷ 6 × 100 = %5, açısı 2,86 derece ve oranı 1:20'dir.`,
    ] },
    { h: 'Erişilebilirlik rampalarında eğim', p: [
      `Tekerlekli sandalye, bebek arabası ve yürüteç kullananlar için rampa eğimi, kullanıcının yardım almadan çıkıp çıkamayacağını belirleyen en önemli etkendir. Eğim arttıkça kol gücü gereksinimi hızla yükselir, inişte ise kontrol zorlaşır. Bu nedenle erişilebilirlik standartları düşük eğimler öngörür ve rampa uzadıkça izin verilen eğimi daha da düşürür; belirli aralıklarla düz sahanlık bırakılmasını, yeterli net genişliği, iki yanda küpeşte ve kenar korumasını da şart koşar.`,
      `Uygulamada kısa mesafelerde %8 civarı, uzun rampalarda %5–6 civarı değerler sıkça anılır; ancak yapınız için bağlayıcı olan değerler yürürlükteki erişilebilirlik standardı, imar mevzuatı ve belediyenizin uygulamalarıdır. Proje yapmadan önce güncel mevzuatı kontrol edin ve mümkünse bir mimara danışın. Bu araç bir mevzuat denetimi yapmaz; yalnızca geometriyi hesaplar.`,
    ] },
    { h: 'Araç ve yükleme rampaları', p: [
      `Otopark ve garaj rampalarında kaygı farklıdır: aracın alt kısmının rampa başlangıcında ya da tepesinde sürtmemesi, ıslak ve buzlu havada lastiklerin tutunması ve sürücünün görüşü. Bu rampalarda yaya rampalarına göre daha yüksek eğimler kullanılır, baş ve sondaki geçiş bölümleri ise daha yumuşak eğimle yapılır. Açık rampalarda kaymaz yüzey ve yağmur suyu ızgarası düşünülmelidir.`,
      `Kamyonet kasasına ya da römorka motosiklet, çim biçme makinesi veya el arabası çıkarmak için kullanılan taşınabilir rampalarda da aynı hesap geçerlidir. Kasa yüksekliği 80 cm ise ve rampa yatayda 3 m yer kaplıyorsa eğim yaklaşık %26,7, açı yaklaşık 14,9 derecedir. Rampa kısaldıkça açı büyür ve yükün geri kayma riski artar.`,
    ] },
    { h: 'Yer yetmediğinde ne yapılır?', ul: [
      '<strong>Dönüşlü rampa:</strong> Rampa iki ya da üç kola bölünür, kollar arasında düz sahanlık bırakılır. Toplam eğimli uzunluk aynı kalır, kaplanan alan toparlanır.',
      '<strong>Kot farkını azaltmak:</strong> Giriş önündeki zemin dolguyla bir miktar yükseltilirse aşılacak yükseklik ve dolayısıyla rampa boyu kısalır.',
      '<strong>Farklı giriş noktası:</strong> Binanın arazi kotuna daha yakın bir cephesinden giriş düzenlemek çoğu zaman en ekonomik çözümdür.',
      '<strong>Mekanik çözüm:</strong> Rampa için hiç yer yoksa platform asansörü gibi düzenekler değerlendirilir; bunların seçimi uzmanlık gerektirir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En yaygın hata, eğimi rampanın yüzey uzunluğu üzerinden hesaplamaktır; doğru payda yatay izdüşümdür. İkinci hata, yüksekliği bitmiş zemin kotları arasında değil kaba ölçüler arasında almaktır; kaplama kalınlıkları eklendiğinde fark birkaç santimetre değişebilir. Üçüncüsü, sahanlıkları toplam uzunluğa eklemeyi unutmaktır: araç yalnızca eğimli kısmı verir, sahanlık boylarını siz eklemelisiniz.`,
      `Hesap sonuçları bilgilendirme amaçlıdır. Rampanın taşıyıcı sistemi, kaplama seçimi, korkuluk yüksekliği ve drenajı ayrı mühendislik ve mimarlık konularıdır; uygulama öncesinde yetkili bir uzmandan görüş alın.`,
    ] },
  ],
  faq: [
    ['%8 eğimli rampa 1 metre yükseklik için kaç metre olmalı?', '1 m ÷ 0,08 = 12,5 m yatay uzunluk gerekir. Yüzey uzunluğu yaklaşık 12,54 m\'dir. Bu uzunluğa, gerekiyorsa ara sahanlıkların boyu ayrıca eklenir.'],
    ['Rampa eğimi yüzde mi, derece mi olarak verilir?', 'Yapı işlerinde eğim çoğunlukla yüzde ya da 1:n oranı olarak verilir. Derece daha az kullanılır; yine de araç üçünü de gösterir. %8 eğim yaklaşık 4,57 derece ve 1:12,5 oranına eşittir.'],
    ['1:12 oranı yüzde kaç eder?', '1:12, her 12 birim yatayda 1 birim yükselme demektir ve 100 ÷ 12 = %8,33 eğime karşılık gelir. 1:20 oranı %5, 1:10 oranı %10\'dur.'],
    ['Yatay uzunluk ile yüzey uzunluğu arasındaki fark önemli mi?', 'Düşük eğimlerde fark çok küçüktür; %8 eğimde yaklaşık binde üç kadardır. Eğim arttıkça fark büyür. Yer planlamasında yatay uzunluğu, malzeme hesabında yüzey uzunluğunu kullanın.'],
    ['Rampanın genişliğini de hesaplıyor mu?', 'Hayır. Araç yalnızca eğim ve uzunlukla ilgilenir. Net genişlik, sahanlık ölçüleri ve küpeşte yükseklikleri kullanım amacına göre ilgili standartlarda tanımlanır.'],
    ['Yüksekliği metre olarak girebilir miyim?', 'Yükseklik alanı santimetre bekler. 1,2 m\'lik bir kot farkı için 120 yazın. Uzunluk alanı ise metre cinsindendir.'],
    ['Çok kısa bir rampa neden tehlikelidir?', 'Aynı yükseklik kısa mesafede aşıldığında eğim dikleşir. Tekerlekli sandalye geriye devrilebilir, inişte hız kontrolü zorlaşır, ıslak zeminde kayma riski artar. Bu nedenle rampayı kısaltmak yerine dönüşlü planlamak tercih edilir.'],
    ['Yazdığım ölçüler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['egim-yuzdesi-hesapla', 'merdiven-hesapla', 'cati-alani-hesapla', 'hafriyat-hesapla'],
};
