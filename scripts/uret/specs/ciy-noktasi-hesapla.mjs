export default {
  slug: 'ciy-noktasi-hesapla',
  title: 'Çiy Noktası Hesaplama',
  h1Tail: 'sıcaklık ve bağıl nemden',
  pageTitle: 'Çiy Noktası Hesaplama – Sıcaklık ve Nemden Yoğuşma Sıcaklığı',
  description: 'Hava sıcaklığı ve bağıl nemden çiy noktasını Magnus formülüyle hesaplayın. Buhar basıncını, mutlak nemi ve yoğuşma riskini de gösterir.',
  card: 'Sıcaklık ve bağıl nemden çiy noktasını, buhar basıncını ve mutlak nemi hesaplayın; yoğuşma ve küf riskini değerlendirin.',
  category: 'gunluk',
  keywords: ['çiy noktası hesaplama', 'çiy noktası nedir', 'yoğuşma sıcaklığı hesaplama', 'çiğ noktası hesaplama', 'mutlak nem hesaplama', 'terleme sıcaklığı', 'dew point hesaplama', 'cam buğulanması'],
  lead: 'Havanın içindeki su buharının yoğuşmaya başladığı sıcaklığa <strong>çiy noktası</strong> denir. Bu araç, ortam sıcaklığı ve bağıl nemden çiy noktasını hesaplar; yanında buhar basıncını ve bir metreküp havadaki su miktarını da verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sicaklik', label: 'Hava sıcaklığı (°C)', type: 'number', placeholder: 'Örn. 22' },
    { id: 'nem', label: 'Bağıl nem (%)', type: 'number', placeholder: 'Örn. 55' },
  ],
  compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    const R = h.num(v.nem, 'Bağıl nem');
    if (T < -45 || T > 60) h.err('Hava sıcaklığı −45 °C ile 60 °C arasında olmalı; formül bu aralıkta geçerlidir.');
    if (!(R > 0) || R > 100) h.err('Bağıl nem 0\'dan büyük ve en fazla 100 olmalı (örn. 55).');
    const b = 17.62;
    const c = 243.12;
    const gama = Math.log(R / 100) + (b * T) / (c + T);
    const td = (c * gama) / (b - gama);
    const es = 6.112 * Math.exp((b * T) / (c + T));
    const e = (es * R) / 100;
    const mutlak = (216.7 * e) / (T + 273.15);
    let yorum;
    if (td < 0) yorum = 'Çok kuru hava; yoğuşma kırağı (don) olarak görülür';
    else if (td < 10) yorum = 'Kuru ve ferah';
    else if (td < 16) yorum = 'Rahat';
    else if (td < 18) yorum = 'Hafif nemli';
    else if (td < 21) yorum = 'Nemli; çoğu kişi için rahatsız edici';
    else if (td < 24) yorum = 'Bunaltıcı';
    else yorum = 'Çok bunaltıcı';
    return {
      rows: [
        ['Çiy noktası', h.fmt(td, 1) + ' °C'],
        ['Sıcaklık ile çiy noktası farkı', h.fmt(T - td, 1) + ' °C'],
        ['Buhar basıncı', h.fmt(e, 2) + ' hPa'],
        ['Doymuş buhar basıncı', h.fmt(es, 2) + ' hPa'],
        ['Mutlak nem', h.fmt(mutlak, 1) + ' g/m³'],
        ['Hava hissi', yorum],
      ],
      note: 'Sıcaklığı çiy noktasının altında olan her yüzeyde (cam, soğuk duvar, boru) yoğuşma başlar. Hesap su üzerindeki doyma için Magnus formülünü kullanır.',
    };
  },
  cases: [
    { in: { sicaklik: '20', nem: '50' }, out: { 'Çiy noktası': '9,3 °C', 'Buhar basıncı': '11,66 hPa', 'Mutlak nem': '8,6 g/m³' } },
    { in: { sicaklik: '25', nem: '60' }, out: { 'Çiy noktası': '16,7 °C', 'Sıcaklık ile çiy noktası farkı': '8,3 °C', 'Hava hissi': 'Hafif nemli' } },
    { in: { sicaklik: '30', nem: '100' }, out: { 'Çiy noktası': '30 °C', 'Sıcaklık ile çiy noktası farkı': '0 °C' } },
    { in: { sicaklik: '0', nem: '80' }, out: { 'Çiy noktası': '-3 °C', 'Doymuş buhar basıncı': '6,11 hPa' } },
    { in: { sicaklik: '-5', nem: '70' }, out: { 'Çiy noktası': '-9,6 °C' } },
    { in: { sicaklik: '35', nem: '20' }, out: { 'Çiy noktası': '8,7 °C', 'Hava hissi': 'Kuru ve ferah' } },
    { in: { sicaklik: '22', nem: '45' }, out: { 'Çiy noktası': '9,5 °C', 'Mutlak nem': '8,7 g/m³' } },
    { in: { sicaklik: '20', nem: '0' }, error: true },
    { in: { sicaklik: '20', nem: '130' }, error: true },
    { in: { sicaklik: 'sıcak', nem: '50' }, error: true },
  ],
  howto: [
    '"Hava sıcaklığı" alanına ortamın sıcaklığını santigrat derece olarak yazın. İç ortam için oda termometresini, dış ortam için hava durumu verisini kullanabilirsiniz.',
    '"Bağıl nem" alanına higrometrenin ya da hava durumu uygulamasının gösterdiği yüzde değerini girin.',
    '"Hesapla" düğmesine basın. İlk satırda çiy noktasını, altında sıcaklıkla arasındaki farkı, buhar basıncını ve mutlak nemi görürsünüz.',
    'Yoğuşma riskini değerlendirmek için cam, duvar ya da boru yüzeyinin sıcaklığını çiy noktasıyla karşılaştırın: yüzey daha soğuksa üzerinde su damlacıkları oluşur.',
  ],
  sections: [
    { h: 'Çiy noktası nedir?', p: [
      'Hava, sıcaklığına bağlı olarak sınırlı miktarda su buharı taşıyabilir; sıcak hava daha fazla, soğuk hava daha az buhar tutar. Belirli miktarda nem içeren bir havayı, basıncını değiştirmeden soğutmaya başladığınızda bağıl nem yükselir ve bir noktada %100\'e ulaşır. İşte bu sıcaklık çiy noktasıdır. Daha fazla soğutulursa fazla buhar sıvıya dönüşür: çimenlerde çiy, camda buğu, soğuk su şişesinin dışında damlalar olarak görürüz.',
      'Bağıl nem gün içinde sıcaklıkla birlikte sürekli değişirken çiy noktası, havadaki gerçek su buharı miktarı değişmediği sürece sabit kalır. Bu yüzden meteorologlar havanın ne kadar nemli olduğunu anlatmak için çoğu zaman bağıl nem yerine çiy noktasını tercih eder.',
    ] },
    { h: 'Magnus formülü', p: [
      'Araç, doymuş buhar basıncı için yaygın kullanılan Magnus yaklaşımını temel alır. Su üzerindeki doymuş buhar basıncı <code>e<sub>s</sub> = 6,112 × exp(17,62·T ÷ (243,12 + T))</code> hPa olarak hesaplanır; T santigrat derecedir. Havadaki gerçek buhar basıncı, bunun bağıl nemle çarpımıdır: <code>e = e<sub>s</sub> × N ÷ 100</code>.',
      'Çiy noktası, bu buhar basıncının doyma değerine eşit olduğu sıcaklıktır. Denklem tersine çevrildiğinde şu elde edilir: önce <code>γ = ln(N ÷ 100) + 17,62·T ÷ (243,12 + T)</code> hesaplanır, sonra <code>T<sub>ç</sub> = 243,12·γ ÷ (17,62 − γ)</code> bulunur. Mutlak nem ise <code>216,7 × e ÷ (T + 273,15)</code> bağıntısıyla gram bölü metreküp olarak verilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Oda sıcaklığı 20 °C, bağıl nem %50 olsun. Önce 17,62 × 20 ÷ (243,12 + 20) = 1,3393 bulunur. ln(0,50) = −0,6931 olduğundan γ = 0,6462\'dir. Çiy noktası 243,12 × 0,6462 ÷ (17,62 − 0,6462) ≈ <strong>9,3 °C</strong> çıkar. Aynı koşulda doymuş buhar basıncı 23,33 hPa, gerçek buhar basıncı 11,66 hPa ve mutlak nem 8,6 g/m³\'tür.',
      'Bu sonucun pratik anlamı şudur: odadaki herhangi bir yüzey 9,3 °C\'nin altına inerse üzerinde su yoğuşur. Kışın tek camlı bir pencerenin iç yüzeyi kolayca bu sıcaklığın altına düşer ve cam buğulanır. İkinci bir örnek: 25 °C ve %60 nemde çiy noktası 16,7 °C\'dir; buzdolabından çıkan 4 °C\'lik bir şişe anında terler.',
    ] },
    { h: 'Evde yoğuşma ve küf', p: [
      'Küf sorununun kaynağı çoğu zaman çiy noktasının altında kalan soğuk yüzeylerdir: yalıtımsız dış duvar köşeleri, kolon ve kiriş gibi ısı köprüleri, pencere kenarları ve dolap arkaları. Yüzey sıcaklığı çiy noktasına yaklaştıkça yüzeydeki bağıl nem yükselir ve küf için uygun ortam, gözle görülür damlalar oluşmadan önce de ortaya çıkabilir.',
      'Çözüm iki yönlüdür: ya yüzeyi ısıtırsınız (yalıtım, ısıtmayı düzenli tutma) ya da çiy noktasını düşürürsünüz (havalandırma, nem alma, çamaşırı içeride kurutmama, banyo ve mutfakta aspiratör kullanma). Araca farklı nem değerleri yazarak, örneğin nemi %65\'ten %50\'ye indirmenin çiy noktasını kaç derece düşürdüğünü görebilirsiniz.',
    ] },
    { h: 'Çiy noktasına göre hava hissi', ul: [
      '<strong>10 °C\'nin altı:</strong> Kuru ve ferah; cilt ve boğaz kuruluğu hissedilebilir.',
      '<strong>10-16 °C:</strong> Çoğu insan için rahat.',
      '<strong>16-18 °C:</strong> Hafif nemli; hareket halindeyken fark edilir.',
      '<strong>18-21 °C:</strong> Nemli; çoğu kişi rahatsız olur.',
      '<strong>21-24 °C:</strong> Bunaltıcı.',
      '<strong>24 °C ve üzeri:</strong> Çok bunaltıcı; ter buharlaşmakta zorlanır.',
    ] },
    { h: 'Başka kullanım alanları', p: [
      'Boya ve kaplama işlerinde yüzey sıcaklığının çiy noktasının birkaç derece üzerinde olması istenir; aksi halde yüzeyde gözle görülmeyen nem filmi boyanın tutunmasını bozar. Soğutma tesisatında borular çiy noktasının altında çalıştığı için yalıtılır, yoksa terleme yapar. Fotoğrafçılar soğuktan sıcak ortama geçerken merceğin buğulanacağını, astronomi meraklıları teleskop optiğinin çiy tutacağını bu değerden öngörür. Tarımda gece sıcaklığının çiy noktasına inmesi çiy ve sis, sıfırın altındaki çiy noktası ise kırağı olasılığı demektir. Havacılıkta sıcaklık ile çiy noktası arasındaki farkın daralması sis ve alçak bulut habercisidir.',
    ] },
    { h: 'Doğruluk ve sınırlar', p: [
      'Magnus formülü −45 °C ile 60 °C arasında su üzerindeki doyma basıncını yüzde birin altında bir hatayla verir; bu, gündelik işler için fazlasıyla yeterlidir. Sıfırın altında buz üzerindeki doyma için farklı katsayılar kullanılır; bu durumda "kırağı noktası" burada hesaplanan değerden biraz yüksek çıkar. Sonucun doğruluğu asıl olarak ölçümünüze bağlıdır: ev tipi higrometreler birkaç puan sapabilir ve bu, çiy noktasında yaklaşık bir derecelik farka yol açar. Yapı fiziği ve tesisat tasarımı gibi mühendislik kararlarında ayrıntılı hesap için uzmana danışın.',
    ] },
  ],
  faq: [
    ['Çiy noktası ile bağıl nem arasındaki fark nedir?', 'Bağıl nem, havanın o sıcaklıkta taşıyabileceği buharın yüzde kaçını taşıdığını gösterir ve sıcaklık değiştikçe değişir. Çiy noktası ise havadaki buhar miktarının doğrudan ölçüsüdür; hava ısınıp soğusa da buhar miktarı aynı kaldıkça değişmez.'],
    ['Bağıl nem %100 olduğunda çiy noktası kaçtır?', 'Hava sıcaklığına eşittir. Hava zaten doymuş olduğundan en küçük soğuma yoğuşma başlatır; sis ve çiy bu koşulda oluşur.'],
    ['Camlarım neden buğulanıyor?', 'Camın iç yüzey sıcaklığı odadaki havanın çiy noktasının altına düştüğü için. 20 °C ve %50 nemde çiy noktası 9,3 °C\'dir; cam bundan soğuksa buğulanır. Nemi düşürmek ya da camın yalıtımını iyileştirmek sorunu azaltır.'],
    ['Çiy noktası hava sıcaklığından yüksek olabilir mi?', 'Hayır. Bağıl nem %100\'ü geçemeyeceği için çiy noktası en fazla hava sıcaklığına eşit olur. Aradaki fark büyüdükçe hava daha kurudur.'],
    ['Mutlak nem ne anlama gelir?', 'Bir metreküp havanın içindeki su buharının gram cinsinden kütlesidir. 20 °C ve %50 nemde yaklaşık 8,6 g/m³\'tür. Nem alma cihazının ne kadar su toplayacağını tahmin ederken işe yarar.'],
    ['Evde ideal nem ve çiy noktası kaç olmalı?', 'Konfor için iç ortamda bağıl nemin genellikle %40-60 arasında tutulması önerilir. 20-22 °C\'lik bir odada bu, kabaca 6-14 °C arası bir çiy noktasına karşılık gelir.'],
    ['Çiy noktası sıfırın altındaysa ne olur?', 'Yoğuşma sıvı su yerine doğrudan buz kristalleri, yani kırağı biçiminde gerçekleşir. Bu durumda gerçek kırağı noktası burada hesaplanan değerden biraz daha yüksektir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz sıcaklık ve nem değerleri sunucuya gönderilmez.'],
  ],
  related: ['isi-indeksi-hesapla', 'ruzgar-hissedilen-sicaklik-hesapla', 'oda-hacmi-hesapla', 'rakim-kaynama-noktasi-hesapla', 'basinc-hesapla'],
};
