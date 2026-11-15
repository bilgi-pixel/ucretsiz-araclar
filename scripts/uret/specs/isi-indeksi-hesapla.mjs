export default {
  slug: 'isi-indeksi-hesapla',
  title: 'Isı İndeksi (Nem Etkisi) Hesaplama',
  h1Tail: 'sıcaklık + bağıl nem',
  pageTitle: 'Isı İndeksi Hesaplama – Nemli Havada Hissedilen Sıcaklık',
  description: 'Hava sıcaklığı ve bağıl nemden ısı indeksini, yani sıcak ve nemli havada hissedilen sıcaklığı hesaplayın; dikkat, tehlike ve aşırı tehlike düzeyini görün.',
  card: 'Sıcaklık ve bağıl nemden ısı indeksini hesaplayın; nemli havada hissedilen sıcaklığı ve risk düzeyini görün.',
  category: 'gunluk',
  keywords: ['ısı indeksi hesaplama', 'nemli havada hissedilen sıcaklık', 'heat index hesaplama', 'nem hissedilen sıcaklık', 'bunaltıcı sıcak hesaplama', 'sıcak çarpması riski', 'bağıl nem sıcaklık'],
  lead: 'Yazın 33 °C\'lik kuru bir hava katlanılabilirken aynı sıcaklık nemli bir sahil kentinde bunaltır. Bu araç, hava sıcaklığı ile bağıl nemi birleştirerek <strong>ısı indeksini</strong>, yani vücudun gölgede algıladığı sıcaklığı hesaplar ve risk düzeyini gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sicaklik', label: 'Hava sıcaklığı', type: 'number', placeholder: 'Örn. 34' },
    { id: 'birim', label: 'Sıcaklık birimi', type: 'select', options: [['c', 'Santigrat (°C)'], ['f', 'Fahrenhayt (°F)']] },
    { id: 'nem', label: 'Bağıl nem (%)', type: 'number', placeholder: 'Örn. 65' },
  ],
  compute(v, h) {
    const g = h.num(v.sicaklik, 'Hava sıcaklığı');
    const R = h.num(v.nem, 'Bağıl nem');
    if (R < 0 || R > 100) h.err('Bağıl nem 0 ile 100 arasında olmalı.');
    const T = v.birim === 'f' ? g : g * 1.8 + 32;
    if (T < 68 - 1e-9) h.err('Isı indeksi 20 °C (68 °F) ve üzerindeki sıcaklıklar için anlamlıdır. Soğuk havalar için rüzgâr etkili hissedilen sıcaklık aracını kullanın.');
    if (T > 140) h.err('Hava sıcaklığı 60 °C (140 °F) değerini aşamaz; değeri ve birimi kontrol edin.');
    const basit = 0.5 * (T + 61 + (T - 68) * 1.2 + R * 0.094);
    let hi = basit;
    if ((basit + T) / 2 >= 80) {
      hi = -42.379 + 2.04901523 * T + 10.14333127 * R - 0.22475541 * T * R
        - 6.83783e-3 * T * T - 5.481717e-2 * R * R + 1.22874e-3 * T * T * R
        + 8.5282e-4 * T * R * R - 1.99e-6 * T * T * R * R;
      if (R < 13 && T >= 80 && T <= 112) hi -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
      if (R > 85 && T >= 80 && T <= 87) hi += ((R - 85) / 10) * ((87 - T) / 5);
    }
    const hiC = (hi - 32) / 1.8;
    const tC = (T - 32) / 1.8;
    let duzey;
    if (hi < 80) duzey = 'Belirgin ısı stresi beklenmez';
    else if (hi < 90) duzey = 'Dikkat: uzun süreli etkinlikte yorgunluk olabilir';
    else if (hi < 103) duzey = 'Aşırı dikkat: sıcak krampı ve ısı bitkinliği olası';
    else if (hi < 125) duzey = 'Tehlike: ısı bitkinliği muhtemel, sıcak çarpması olası';
    else duzey = 'Aşırı tehlike: sıcak çarpması riski çok yüksek';
    return {
      rows: [
        ['Isı indeksi', h.fmt(hiC, 1) + ' °C'],
        ['Isı indeksi (Fahrenhayt)', h.fmt(hi, 1) + ' °F'],
        ['Termometre ile fark', h.fmt(hiC - tC, 1) + ' °C'],
        ['Risk düzeyi', duzey],
      ],
      note: 'Değer gölge ve hafif rüzgâr içindir; doğrudan güneş altında hissedilen sıcaklık yaklaşık 8 °C\'ye kadar daha yüksek olabilir.',
    };
  },
  cases: [
    { in: { sicaklik: '32', birim: 'c', nem: '60' }, out: { 'Isı indeksi': '37,1 °C', 'Risk düzeyi': 'Aşırı dikkat: sıcak krampı ve ısı bitkinliği olası' } },
    { in: { sicaklik: '90', birim: 'f', nem: '70' }, out: { 'Isı indeksi (Fahrenhayt)': '105,9 °F', 'Isı indeksi': '41,1 °C' } },
    { in: { sicaklik: '35', birim: 'c', nem: '50' }, out: { 'Isı indeksi': '40,7 °C', 'Termometre ile fark': '5,7 °C', 'Risk düzeyi': 'Tehlike: ısı bitkinliği muhtemel, sıcak çarpması olası' } },
    { in: { sicaklik: '96', birim: 'f', nem: '50' }, out: { 'Isı indeksi (Fahrenhayt)': '107,6 °F' } },
    { in: { sicaklik: '30', birim: 'c', nem: '80' }, out: { 'Isı indeksi': '37,7 °C' } },
    { in: { sicaklik: '40', birim: 'c', nem: '40' }, out: { 'Isı indeksi': '48,3 °C' } },
    { in: { sicaklik: '25', birim: 'c', nem: '50' }, out: { 'Isı indeksi': '24,9 °C', 'Risk düzeyi': 'Belirgin ısı stresi beklenmez' } },
    { in: { sicaklik: '86', birim: 'f', nem: '90' }, out: { 'Isı indeksi (Fahrenhayt)': '105,4 °F' } },
    { in: { sicaklik: '10', birim: 'c', nem: '50' }, error: true },
    { in: { sicaklik: '32', birim: 'c', nem: '120' }, error: true },
    { in: { sicaklik: '32', birim: 'c', nem: '' }, error: true },
  ],
  howto: [
    '"Hava sıcaklığı" alanına gölgede ölçülen sıcaklığı yazın ve birimini seçin. Türkiye\'de hava tahminleri santigrat verir; Fahrenhayt seçeneği yurt dışı kaynakları içindir.',
    '"Bağıl nem" alanına yüzde değerini girin. Hava durumu uygulamalarında "nem" olarak gösterilen sayı budur.',
    '"Hesapla" düğmesine basın. Isı indeksini santigrat ve Fahrenhayt olarak, termometreyle arasındaki farkı ve risk düzeyini görürsünüz.',
    'Güneş altında çalışacak ya da spor yapacaksanız sonuca birkaç derece pay ekleyin; hesap gölge koşulları içindir.',
  ],
  sections: [
    { h: 'Isı indeksi nedir, nem neden bunaltır?', p: [
      'İnsan vücudu fazla ısısını büyük ölçüde terleyerek atar: ter buharlaşırken ciltten ısı alır ve bizi serinletir. Havadaki su buharı arttıkça ter buharlaşamaz, cilt ıslak kalır ve soğutma mekanizması yavaşlar. Bağıl nem yüzde 100\'e yaklaştığında terleme neredeyse hiç işe yaramaz. Bu yüzden nemli havada vücut, termometrenin gösterdiğinden daha yüksek bir sıcaklığa maruz kalıyormuş gibi zorlanır.',
      'Isı indeksi bu etkiyi tek bir sayıya indirger: belirli sıcaklık ve nemdeki havanın, vücut üzerinde hangi sıcaklıktaki kuru hava kadar yük oluşturduğunu söyler. Rüzgâr soğutmasının yaz mevsimindeki karşılığı gibi düşünülebilir.',
    ] },
    { h: 'Hesap yöntemi', p: [
      'Araç, ABD Ulusal Hava Servisi\'nin kullandığı yöntemi izler. Önce basit bir yaklaşım hesaplanır: <code>0,5 × (T + 61 + (T − 68) × 1,2 + 0,094 × N)</code>. Burada T sıcaklık (°F), N bağıl nemdir (%). Bu değer ile sıcaklığın ortalaması 80 °F\'ın altındaysa sonuç olarak basit değer kullanılır; çünkü ılıman koşullarda nem etkisi küçüktür.',
      'Ortalama 80 °F ve üzerindeyse dokuz terimli Rothfusz regresyon denklemi devreye girer. Bu denklem, Steadman\'ın insan vücudu ısı dengesi modelinden üretilen tabloya uydurulmuş bir polinomdur ve sıcaklık ile nemin hem ayrı ayrı hem de çarpımlarını içerir. Çok kuru (nem %13\'ün altı) ve çok nemli (nem %85\'in üstü) uç koşullarda resmî yöntemdeki küçük düzeltmeler de uygulanır. Santigrat girdiğiniz değer önce <code>°F = °C × 1,8 + 32</code> ile çevrilir, sonuç yeniden santigrata döndürülür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> İstanbul\'da bir ağustos öğleden sonrası: sıcaklık 32 °C, bağıl nem %60. 32 °C, 89,6 °F eder. Denklem 98,7 °F verir; bu da <strong>37,1 °C</strong> demektir. Termometre 32 gösterirken vücudunuz 37 derecelik bir hava yükü altındadır ve düzey "aşırı dikkat"tir.',
      '<strong>Örnek 2:</strong> Antalya\'da 35 °C ve %50 nem. Isı indeksi <strong>40,7 °C</strong> çıkar; termometreyle fark 5,7 derecedir ve düzey "tehlike"ye geçer.',
      '<strong>Örnek 3:</strong> 30 °C sıcaklıkta nem %80 ise ısı indeksi 37,7 °C olur. Yani daha serin ama daha nemli bir gün, 32 °C ve %60 nemli günden daha bunaltıcıdır.',
      '<strong>Örnek 4:</strong> Güneydoğu\'da 40 °C ve %40 nem: ısı indeksi 48,3 °C. Nem düşük görünse de sıcaklık yüksek olduğunda küçük nem artışları bile sonucu hızla yükseltir.',
    ] },
    { h: 'Risk düzeyleri', ul: [
      '<strong>27 °C\'nin altı (80 °F altı):</strong> Belirgin ısı stresi beklenmez.',
      '<strong>27-32 °C (80-90 °F) – Dikkat:</strong> Uzun süreli fiziksel etkinlikte ve güneş altında yorgunluk görülebilir.',
      '<strong>32-39 °C (90-103 °F) – Aşırı dikkat:</strong> Sıcak krampları ve ısı bitkinliği olasıdır; uzun süreli etkinlik sıcak çarpmasına yol açabilir.',
      '<strong>39-51 °C (103-124 °F) – Tehlike:</strong> Kramp ve ısı bitkinliği muhtemel, sıcak çarpması olasıdır.',
      '<strong>52 °C ve üzeri (125 °F üstü) – Aşırı tehlike:</strong> Sıcak çarpması riski çok yüksektir.',
    ] },
    { h: 'Günlük hayatta kullanım', p: [
      'Akdeniz, Ege ve Karadeniz kıyılarında yaz aylarında nem sıklıkla %60\'ın üzerindedir; İzmir, Antalya, Mersin, Adana ve İstanbul\'da 32-35 °C\'lik günlerde ısı indeksi kolayca 40 °C\'yi aşar. İç Anadolu\'da ise aynı sıcaklıkta nem düşük olduğundan hissedilen sıcaklık termometreye yakın, hatta biraz altında kalabilir.',
      'Sabah koşusunun saatini seçerken, çocukların dış mekân etkinliğini planlarken, şantiye ve tarla çalışmasında mola aralıklarını belirlerken ya da yaşlı bir yakınınızın evde klimasız kalıp kalamayacağına karar verirken ısı indeksine bakmak, yalnızca sıcaklığa bakmaktan daha doğru bir fikir verir. Değer yükseldikçe sıvı alımını artırmak, etkinliği sabah ve akşam saatlerine kaydırmak ve gölge molalarını sıklaştırmak gerekir.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Isı indeksi gölgede ve hafif rüzgârda, ortalama yapıda ve hafif giyimli bir yetişkin için tanımlanmıştır. Doğrudan güneş altında hissedilen değer belirgin biçimde daha yüksek olabilir. Kuvvetli rüzgâr, ağır iş kıyafeti, koruyucu donanım, yaş, kilo ve sağlık durumu kişisel etkiyi değiştirir. Denklem bir regresyondur; uç değerlerde birkaç derecelik sapma olağandır. Araç 20 °C\'nin altındaki sıcaklıklarda hesap yapmaz, çünkü serin havada nem ısı yükü oluşturmaz.',
      'Sonuç bilgilendirme amaçlıdır ve tıbbi tavsiye değildir. Baş dönmesi, bulantı, bilinç bulanıklığı, terlemenin kesilmesi ya da çok yüksek vücut ısısı gibi belirtilerde kişiyi serin bir yere alın ve acil sağlık hizmetlerini arayın.',
    ] },
  ],
  faq: [
    ['Isı indeksi ile hissedilen sıcaklık aynı şey mi?', 'Sıcak havada evet; hava tahminlerinde yazın verilen "hissedilen sıcaklık" çoğunlukla nem etkisini yansıtan ısı indeksi ya da benzeri bir ölçüdür. Kışın verilen hissedilen sıcaklık ise rüzgâr soğutmasına dayanır.'],
    ['Bağıl nem nedir?', 'Havanın o sıcaklıkta taşıyabileceği en fazla su buharının yüzde kaçını taşıdığını gösterir. %100 havanın doyduğu anlamına gelir. Aynı miktar su buharı sıcak havada daha düşük, soğuk havada daha yüksek bağıl nem demektir.'],
    ['Isı indeksi neden bazen sıcaklıktan düşük çıkıyor?', 'Nem çok düşükken ter hızla buharlaşır ve vücut etkili biçimde soğur. Bu durumda ısı indeksi termometre değerinin biraz altında kalabilir; örneğin 25 °C ve %50 nemde sonuç 24,9 °C\'dir.'],
    ['Güneşte ısı indeksi ne kadar artar?', 'Resmî tablolar gölge içindir. Doğrudan güneş altında değerin yaklaşık 8 °C\'ye (15 °F) kadar yükselebileceği kabul edilir. Açık alanda çalışırken ya da spor yaparken bu payı hesaba katın.'],
    ['Hangi ısı indeksinde dışarıda spor yapılmamalı?', 'Kesin bir sınır kişiye göre değişir; ancak ısı indeksi 32 °C\'nin üzerine çıktığında yoğun egzersizi kısaltmak, 39 °C\'nin üzerinde ise serin saatlere ertelemek genel olarak önerilir. Kronik hastalığınız varsa hekiminize danışın.'],
    ['Nemi nereden öğrenebilirim?', 'Hava durumu uygulamaları ve meteoroloji bültenleri anlık bağıl nemi verir. Evde ucuz bir higrometreyle iç ortam nemini ölçebilirsiniz. Çiy noktasını biliyorsanız bağıl nemi ondan da hesaplayabilirsiniz.'],
    ['20 °C\'nin altında neden hesap yapılmıyor?', 'Serin havada vücut ısısını atmakta zorlanmaz; nemin bunaltıcı etkisi ortaya çıkmaz. Yöntem sıcak koşullar için geliştirilmiştir ve düşük sıcaklıklarda anlamlı sonuç vermez.'],
    ['Girdiğim veriler bir yere gönderiliyor mu?', 'Hayır. Tüm hesaplama tarayıcınızda yapılır; sıcaklık ve nem değerleri sunucuya iletilmez, kaydedilmez.'],
  ],
  related: ['ruzgar-hissedilen-sicaklik-hesapla', 'ciy-noktasi-hesapla', 'celsius-fahrenheit-cevir', 'kamp-su-yiyecek-hesapla', 'beaufort-ruzgar-cevir'],
};
