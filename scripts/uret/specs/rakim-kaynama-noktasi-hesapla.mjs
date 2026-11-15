export default {
  slug: 'rakim-kaynama-noktasi-hesapla',
  title: 'Rakıma Göre Suyun Kaynama Noktası Hesaplama',
  h1Tail: 'yükseklik → kaynama sıcaklığı',
  pageTitle: 'Rakıma Göre Suyun Kaynama Noktası – Yüksekte Su Kaç Derecede Kaynar?',
  description: 'Bulunduğunuz rakımı yazın; suyun kaç derecede kaynadığını, o yükseklikteki standart hava basıncını ve yemek pişirmeye etkisini hesaplayın.',
  card: 'Rakıma göre suyun kaç derecede kaynadığını ve o yükseklikteki hava basıncını hesaplayın; pişirme süresine etkisini görün.',
  category: 'gunluk',
  keywords: ['rakıma göre kaynama noktası', 'yüksekte su kaç derecede kaynar', 'kaynama noktası hesaplama', 'rakım hava basıncı hesaplama', 'yükseklik kaynama sıcaklığı', 'dağda su kaç derecede kaynar', 'yüksek rakımda pişirme'],
  lead: 'Su her yerde 100 °C\'de kaynamaz; yükseğe çıktıkça hava basıncı düşer ve su daha düşük sıcaklıkta kaynamaya başlar. Bu araç, yazdığınız rakım için <strong>suyun kaynama sıcaklığını</strong> ve o yükseklikteki standart hava basıncını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'rakim', label: 'Rakım (m)', type: 'number', placeholder: 'Örn. 1900', hint: 'Deniz seviyesinden yükseklik' },
  ],
  compute(v, h) {
    const y = h.num(v.rakim, 'Rakım');
    if (y < -500 || y > 11000) h.err('Rakım −500 m ile 11.000 m arasında olmalı; değeri metre cinsinden yazın.');
    const basinc = (m) => 101.325 * Math.pow(1 - 2.25577e-5 * m, 5.25588);
    const kaynama = (kPa) => 1730.63 / (8.07131 - Math.log10((kPa * 760) / 101.325)) - 233.426;
    const P = basinc(y);
    const T = kaynama(P);
    const T0 = kaynama(101.325);
    let etki;
    if (y < 300) etki = 'Deniz seviyesine yakın; tariflerdeki süreler geçerlidir';
    else if (y < 1000) etki = 'Hafif: uzun haşlamalarda süre biraz uzar';
    else if (y < 2500) etki = 'Belirgin: bakliyat, makarna ve yumurta daha geç pişer';
    else etki = 'Yüksek: haşlama çok uzar, düdüklü tencere önerilir';
    return {
      rows: [
        ['Suyun kaynama noktası', h.fmt(T, 1) + ' °C'],
        ['Kaynama noktası (Fahrenhayt)', h.fmt(T * 1.8 + 32, 1) + ' °F'],
        ['Deniz seviyesine göre fark', h.fmt(T - T0, 1) + ' °C'],
        ['Standart hava basıncı', `${h.fmt(P * 10, 0)} hPa (${h.fmt(P * 7.50062, 0)} mmHg)`],
        ['Deniz seviyesi basıncına oranı', '%' + h.fmt((P / 101.325) * 100, 1)],
        ['Pişirmeye etkisi', etki],
      ],
      note: 'Basınç, standart atmosfer modeline göre hesaplanır; günlük hava durumu basıncı birkaç yüzde oynatabilir ve kaynama noktasını yaklaşık ±1 °C değiştirebilir. Hesap saf su içindir.',
    };
  },
  cases: [
    { in: { rakim: '0' }, out: { 'Suyun kaynama noktası': '100 °C', 'Kaynama noktası (Fahrenhayt)': '212 °F', 'Deniz seviyesine göre fark': '0 °C', 'Standart hava basıncı': '1.013 hPa (760 mmHg)' } },
    { in: { rakim: '1000' }, out: { 'Suyun kaynama noktası': '96,7 °C', 'Deniz seviyesine göre fark': '-3,3 °C', 'Standart hava basıncı': '899 hPa (674 mmHg)' } },
    { in: { rakim: '1900' }, out: { 'Suyun kaynama noktası': '93,7 °C', 'Pişirmeye etkisi': 'Belirgin: bakliyat, makarna ve yumurta daha geç pişer' } },
    { in: { rakim: '2500' }, out: { 'Suyun kaynama noktası': '91,7 °C' } },
    { in: { rakim: '8849' }, out: { 'Suyun kaynama noktası': '70,3 °C', 'Standart hava basıncı': '314 hPa (236 mmHg)' } },
    { in: { rakim: '-400' }, out: { 'Suyun kaynama noktası': '101,3 °C' } },
    { in: { rakim: '5137' }, out: { 'Suyun kaynama noktası': '82,9 °C' } },
    { in: { rakim: '' }, error: true },
    { in: { rakim: '25000' }, error: true },
    { in: { rakim: 'yüksek' }, error: true },
  ],
  howto: [
    '"Rakım" alanına bulunduğunuz yerin deniz seviyesinden yüksekliğini metre olarak yazın. Rakımı telefonunuzun pusula ya da harita uygulamasından, il ve ilçe tanıtım bilgilerinden öğrenebilirsiniz.',
    '"Hesapla" düğmesine basın.',
    'İlk satırda suyun o yükseklikte kaç derecede kaynadığını, altında deniz seviyesine göre farkı ve standart hava basıncını görürsünüz.',
    '"Pişirmeye etkisi" satırı, haşlama ve kaynatma sürelerini uzatmanız gerekip gerekmediği konusunda kısa bir fikir verir.',
  ],
  sections: [
    { h: 'Yükseldikçe su neden daha erken kaynar?', p: [
      'Bir sıvı, buhar basıncı üzerindeki dış basınca eşitlendiğinde kaynar. Suyun buhar basıncı sıcaklıkla artar ve deniz seviyesindeki standart atmosfer basıncına (1.013 hPa) tam 100 °C\'de ulaşır. Yükseğe çıkıldıkça üzerinizdeki hava sütunu kısalır, basınç düşer ve suyun buhar basıncı bu düşük değere daha düşük bir sıcaklıkta yetişir. Sonuç: su daha erken fokurdar ama daha soğuktur.',
      'Önemli olan nokta şudur: kaynayan su, ocağı ne kadar açarsanız açın kaynama noktasından daha fazla ısınmaz. Verdiğiniz fazladan ısı sıcaklığı yükseltmez, yalnızca suyu daha hızlı buharlaştırır. Yemek ise suyun fokurdamasıyla değil sıcaklığıyla pişer; bu yüzden yüksek rakımda haşlamalar uzun sürer.',
    ] },
    { h: 'Hesap yöntemi', p: [
      'Araç iki adımda çalışır. İlk adımda rakımdan hava basıncı bulunur. Bunun için uluslararası standart atmosferin troposfer bağıntısı kullanılır: <code>P = 101,325 × (1 − 2,25577 × 10<sup>−5</sup> × h)<sup>5,25588</sup></code> kPa; h metre cinsinden rakımdır. Bağıntı, sıcaklığın her kilometrede 6,5 °C düştüğü ortalama bir atmosferi temsil eder.',
      'İkinci adımda bu basınçta suyun kaynayacağı sıcaklık, suyun buhar basıncı için kullanılan Antoine denklemi tersine çevrilerek hesaplanır: <code>T = 1730,63 ÷ (8,07131 − log<sub>10</sub>P) − 233,426</code>; burada P milimetre cıva, T santigrat derecedir. Denklem 1-100 °C aralığında deneysel verilerle çok iyi uyuşur; deniz seviyesinde 100,0 °C verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '1.000 metre rakımda: 1 − 2,25577 × 10<sup>−5</sup> × 1000 = 0,97744. Bunun 5,25588. kuvveti 0,8870\'tir; basınç 101,325 × 0,8870 ≈ 89,9 kPa, yani <strong>899 hPa</strong> ya da 674 mmHg olur. log<sub>10</sub>(674) ≈ 2,8287 olduğundan T = 1730,63 ÷ (8,07131 − 2,8287) − 233,426 ≈ <strong>96,7 °C</strong> bulunur. Deniz seviyesine göre fark −3,3 °C\'dir.',
      'Yaklaşık 1.900 m rakımlı Erzurum için sonuç 93,7 °C, 5.137 m yüksekliğindeki Ağrı Dağı zirvesi için 82,9 °C, 8.849 m\'deki Everest zirvesi için yaklaşık 70 °C\'dir. Deniz seviyesinin 400 m kadar altındaki Lut Gölü kıyısında ise su 101,3 °C\'de kaynar.',
    ] },
    { h: 'Hızlı başvuru: rakım ve kaynama noktası', ul: [
      '<strong>0 m</strong> (kıyı kentleri): 100 °C',
      '<strong>500 m:</strong> yaklaşık 98,3 °C',
      '<strong>1.000 m</strong> (Ankara, Konya, Kayseri çevresi): yaklaşık 96,7 °C',
      '<strong>1.500 m:</strong> yaklaşık 95 °C',
      '<strong>2.000 m</strong> (yüksek yaylalar, kayak merkezleri): yaklaşık 93,4 °C',
      '<strong>2.500 m:</strong> 91,7 °C',
      '<strong>3.000 m:</strong> yaklaşık 90 °C',
      '<strong>5.000 m:</strong> yaklaşık 83,3 °C',
    ] },
    { h: 'Mutfakta ne değişir?', p: [
      'Kabaca her 300 metrede kaynama noktası 1 °C düşer. Birkaç derecelik bu fark küçük görünse de pişme hızını hissedilir biçimde etkiler. Nohut, kuru fasulye ve mercimek gibi bakliyatlar, haşlanmış yumurta, patates ve makarna yüksek rakımda daha uzun süre ister. Doğu Anadolu\'da ve yaylalarda yaşayanların tariflerdeki süreleri uzatması ya da düdüklü tencereyi sık kullanması bundandır: düdüklü tencere içerideki basıncı yükselterek suyun kaynama noktasını yeniden 100 °C\'nin üzerine çıkarır.',
      'Çay ve kahve için de sonuç vardır. Siyah çay demlemek için kaynar suya yakın sıcaklık istenir; 2.000 m\'de su en fazla 93 °C civarına ulaşır ve dem biraz daha uzun bekletilir. Kamp ocağında içme suyunu kaynatarak arıtırken de suyun daha düşük sıcaklıkta kaynadığını bilmek ve yüksek rakımda kaynatma süresini uzun tutmak gerekir.',
      'Fırın işleri kaynama noktasına doğrudan bağlı değildir, ancak düşük basınçta hamur daha hızlı kabarır ve nem daha çabuk uçar; kek ve ekmek tariflerinde yüksek rakım için ayrıca ayar yapılır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Hesap, standart atmosferin ortalama basıncını kullanır. Gerçek basınç hava sistemlerine göre günden güne değişir; alçak basınçlı fırtınalı bir günde su biraz daha düşük, yüksek basınçlı açık bir günde biraz daha yüksek sıcaklıkta kaynar. Bu oynama çoğu zaman 1 °C\'nin altındadır. Elinizde barometreyle ölçülmüş istasyon basıncı varsa sonuç ondan daha doğru bulunur.',
      'Sonuç saf su içindir. Suda çözünen tuz ve şeker kaynama noktasını bir miktar yükseltir, ancak yemeklik miktarlarda bu etki derecenin onda birleri düzeyindedir. Bağıntı 11.000 m\'ye kadar olan troposfer için geçerlidir; araç bu yüzden daha yüksek değerleri kabul etmez. Laboratuvar kalibrasyonu, sterilizasyon ve gıda güvenliği gibi hassas işlerde ölçülmüş basınç ve onaylı tablolar kullanılmalıdır.',
    ] },
  ],
  faq: [
    ['Su her yerde 100 derecede mi kaynar?', 'Hayır. 100 °C yalnızca deniz seviyesindeki standart basınç için geçerlidir. Rakım arttıkça basınç ve onunla birlikte kaynama noktası düşer; 1.000 m\'de yaklaşık 96,7 °C, 2.000 m\'de yaklaşık 93,4 °C olur.'],
    ['Her kaç metrede kaynama noktası 1 derece düşer?', 'Alçak ve orta rakımlarda yaklaşık her 300 metrede 1 °C düşer. Bu pratik bir yaklaşımdır; kesin değer için aracı kullanın.'],
    ['Erzurum\'da su kaç derecede kaynar?', 'Yaklaşık 1.900 m rakım için hesap 93,7 °C verir. Günün hava basıncına göre birkaç onda bir derece oynayabilir.'],
    ['Yüksekte yemek neden geç pişer?', 'Çünkü kaynayan su daha soğuktur. Yemeği pişiren suyun sıcaklığıdır; su 93 °C\'de kaynıyorsa içindeki yiyecek de en fazla o sıcaklığa maruz kalır ve pişme yavaşlar.'],
    ['Düdüklü tencere bu sorunu nasıl çözer?', 'Kapağı buharı içeride tutarak tenceredeki basıncı dış basıncın üzerine çıkarır. Basınç arttığı için su 100 °C\'nin üzerinde kaynar ve yemek rakımdan bağımsız olarak hızlı pişer.'],
    ['Tuz eklemek kaynama noktasını ne kadar yükseltir?', 'Yemek için kullanılan miktarlarda çok az; bir litre suya bir yemek kaşığı tuz, kaynama noktasını derecenin yalnızca birkaç onda biri kadar yükseltir. Rakımın etkisini telafi etmez.'],
    ['Deniz seviyesinin altında ne olur?', 'Basınç standart değerin üzerine çıktığı için su 100 °C\'den biraz yüksek sıcaklıkta kaynar. Deniz seviyesinin 400 m altında kaynama noktası yaklaşık 101,3 °C\'dir.'],
    ['Yazdığım rakım bilgisi saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değer sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kaynama-noktasi-yukselmesi-hesapla', 'basinc-hesapla', 'ciy-noktasi-hesapla', 'celsius-fahrenheit-cevir', 'tirmanis-suresi-hesapla'],
};
