export default {
  slug: 'tank-doluluk-hesapla',
  title: 'Yatay Silindirik Tank Doluluk Hesaplama',
  h1Tail: 'seviyeden litre',
  pageTitle: 'Yatay Silindirik Tank Doluluk Hesaplama – Seviyeden Litre Bulma',
  description: 'Yatay duran silindirik tankta ölçtüğünüz sıvı yüksekliğinden kalan litreyi ve doluluk yüzdesini hesaplayın. Mazot, su ve yakıt tankları için çubuk ölçümüne uygundur.',
  card: 'Yatay silindirik tankta sıvı yüksekliğinden kalan litreyi, doluluk yüzdesini ve boş hacmi hesaplayın.',
  category: 'insaat',
  keywords: ['yatay tank hacim hesaplama', 'silindirik tank doluluk', 'mazot tankı litre hesaplama', 'tank seviye hesabı', 'yatay silindir kısmi hacim', 'tank çubuk ölçümü', 'yakıt tankı kaç litre'],
  lead: 'Yan yatmış silindirik bir tankta sıvı yüksekliği ile litre arasındaki ilişki doğrusal değildir. Tankın çapını, boyunu ve çubukla ölçtüğünüz sıvı yüksekliğini yazın; araç <strong>daire parçası alanı</strong> formülüyle kalan litreyi ve doluluk yüzdesini versin.',
  button: 'Hesapla',
  inputs: [
    { id: 'cap', label: 'Tank iç çapı (cm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'uzunluk', label: 'Tank iç uzunluğu (cm)', type: 'number', placeholder: 'Örn. 200', hint: 'Silindirik gövdenin boyu; düz kapaklı tank kabul edilir.' },
    { id: 'seviye', label: 'Sıvı yüksekliği (cm)', type: 'number', placeholder: 'Örn. 25', hint: 'Tankın en alt noktasından sıvı yüzeyine kadar olan dik mesafe.' },
  ],
  compute(v, h) {
    const d = h.pos(v.cap, 'Tank iç çapı');
    const L = h.pos(v.uzunluk, 'Tank iç uzunluğu');
    const s = h.nonneg(v.seviye, 'Sıvı yüksekliği');
    if (s > d + 1e-9) h.err('Sıvı yüksekliği tank çapından büyük olamaz; ölçüleri santimetre olarak kontrol edin.');
    const r = d / 2;
    const y = Math.min(s, d);
    const oran = Math.max(-1, Math.min(1, (r - y) / r));
    const kesit = r * r * Math.acos(oran) - (r - y) * Math.sqrt(Math.max(0, 2 * r * y - y * y));
    const tam = Math.PI * r * r;
    const litre = kesit * L / 1000;
    const toplam = tam * L / 1000;
    return {
      rows: [
        ['Mevcut sıvı hacmi', h.fmt(litre, 2) + ' litre'],
        ['Doluluk oranı', '%' + h.fmt(kesit / tam * 100, 2)],
        ['Toplam kapasite', h.fmt(toplam, 2) + ' litre'],
        ['Boş hacim', h.fmt(toplam - litre, 2) + ' litre'],
        ['Mevcut sıvı (metreküp)', h.fmt(litre / 1000, 4) + ' m³'],
      ],
      note: 'Hesap düz kapaklı, tam yatay duran silindirik tank içindir. Bombeli kapaklarda ve eğimli duran tanklarda gerçek hacim bir miktar farklı olur.',
    };
  },
  cases: [
    { in: { cap: '100', uzunluk: '200', seviye: '25' }, out: { 'Mevcut sıvı hacmi': '307,09 litre', 'Doluluk oranı': '%19,55', 'Toplam kapasite': '1.570,8 litre' } },
    { in: { cap: '100', uzunluk: '200', seviye: '50' }, out: { 'Mevcut sıvı hacmi': '785,4 litre', 'Doluluk oranı': '%50', 'Boş hacim': '785,4 litre' } },
    { in: { cap: '100', uzunluk: '200', seviye: '75' }, out: { 'Mevcut sıvı hacmi': '1.263,7 litre', 'Doluluk oranı': '%80,45' } },
    { in: { cap: '100', uzunluk: '200', seviye: '100' }, out: { 'Mevcut sıvı hacmi': '1.570,8 litre', 'Doluluk oranı': '%100', 'Boş hacim': '0 litre' } },
    { in: { cap: '200', uzunluk: '500', seviye: '50' }, out: { 'Mevcut sıvı hacmi': '3.070,92 litre', 'Doluluk oranı': '%19,55', 'Toplam kapasite': '15.707,96 litre' } },
    { in: { cap: '120', uzunluk: '250', seviye: '60' }, out: { 'Mevcut sıvı hacmi': '1.413,72 litre', 'Toplam kapasite': '2.827,43 litre' } },
    { in: { cap: '100', uzunluk: '200', seviye: '0' }, out: { 'Mevcut sıvı hacmi': '0 litre', 'Doluluk oranı': '%0' } },
    { in: { cap: '100', uzunluk: '200', seviye: '120' }, error: true },
    { in: { cap: '0', uzunluk: '200', seviye: '10' }, error: true },
  ],
  howto: [
    'Tankın iç çapını santimetre olarak yazın. Dıştan ölçtüyseniz sac kalınlığının iki katını düşün.',
    'Silindirik gövdenin iç uzunluğunu santimetre olarak girin.',
    'Temiz bir ölçü çubuğunu dolum ağzından tankın tabanına değene kadar dik indirin, çıkarın ve ıslak kısmın boyunu okuyun. Bu değeri "Sıvı yüksekliği" alanına yazın.',
    '"Hesapla" düğmesine basın. Tankta kalan litre, doluluk yüzdesi, toplam kapasite ve doldurulabilecek boş hacim görüntülenir.',
  ],
  sections: [
    { h: 'Yatay tankta seviye neden litreyle doğru orantılı değildir?', p: [
      'Dik duran bir silindirde sıvı her santimetrede aynı miktarda yükselir, çünkü kesit hep aynı dairedir. Yan yatırılmış silindirde ise sıvının yüzey genişliği yüksekliğe göre değişir: tabanda çok dardır, tam ortada tankın çapına eşit olur, üstte yeniden daralır. Bu yüzden alttaki ve üstteki santimetreler az, ortadaki santimetreler çok sıvı tutar.',
      'Sonuç olarak "çubuk çeyrek seviyeyi gösteriyor, tankın dörtte biri dolu" çıkarımı yanlıştır. Çapın dörtte biri yüksekliğindeki sıvı, tank hacminin yalnızca yaklaşık %19,55\'ini doldurur. Çapın dörtte üçünde ise doluluk %80,45\'tir. Yalnızca tam orta noktada seviye ile doluluk eşitlenir: yarı yükseklik, yarı hacimdir.',
    ] },
    { h: 'Kullanılan formül', p: [
      'Sıvının tank kesitinde kapladığı şekil bir daire parçasıdır (segment). Yarıçap <em>r</em>, sıvı yüksekliği <em>h</em> olmak üzere bu parçanın alanı şöyledir:',
      '<strong>A = r² × arccos((r − h) ÷ r) − (r − h) × √(2 × r × h − h²)</strong>',
      'Buradaki arccos değeri radyan cinsindendir. Alan tank uzunluğuyla çarpıldığında sıvı hacmi bulunur: <strong>V = A × L</strong>. Ölçüler santimetre girildiğinde hacim santimetreküp çıkar; 1000\'e bölünerek litreye çevrilir. Toplam kapasite ise tam dairenin alanından hesaplanır: π × r² × L.',
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      'İç çapı 100 cm, uzunluğu 200 cm olan bir mazot tankında çubuk 25 cm ıslanmış olsun. Yarıçap r = 50 cm, h = 25 cm.',
    ], ol: [
      '(r − h) ÷ r = 25 ÷ 50 = 0,5 ve arccos(0,5) = 1,0472 radyan.',
      'r² × 1,0472 = 2500 × 1,0472 = 2617,99 cm².',
      '√(2 × 50 × 25 − 25²) = √1875 = 43,301 ve (r − h) ile çarpımı 25 × 43,301 = 1082,53 cm².',
      'Segment alanı: 2617,99 − 1082,53 = 1535,46 cm².',
      'Hacim: 1535,46 × 200 = 307.092 cm³ = <strong>307,09 litre</strong>.',
      'Toplam kapasite: π × 2500 × 200 = 1.570.796 cm³ = 1.570,8 litre; doluluk 307,09 ÷ 1.570,8 = <strong>%19,55</strong>.',
    ] },
    { h: 'Seviye–doluluk başvuru tablosu', p: [
      'Aşağıdaki oranlar tankın boyutundan bağımsızdır; sıvı yüksekliğinin çapa oranına karşılık gelen doluluk yüzdesini verir. Kendi tankınızın toplam kapasitesiyle çarparak kaba bir tahmin yapabilirsiniz.',
    ], ul: [
      'Yükseklik çapın <strong>%10</strong>\'u: doluluk yaklaşık %5,2',
      'Yükseklik çapın <strong>%20</strong>\'si: doluluk yaklaşık %14,2',
      'Yükseklik çapın <strong>%25</strong>\'i: doluluk yaklaşık %19,6',
      'Yükseklik çapın <strong>%30</strong>\'u: doluluk yaklaşık %25,2',
      'Yükseklik çapın <strong>%40</strong>\'ı: doluluk yaklaşık %37,4',
      'Yükseklik çapın <strong>%50</strong>\'si: doluluk tam %50',
      'Yükseklik çapın <strong>%75</strong>\'i: doluluk yaklaşık %80,4',
      'Yükseklik çapın <strong>%90</strong>\'ı: doluluk yaklaşık %94,8',
    ] },
    { h: 'Kullanım alanları', p: [
      'Yatay silindirik tanklar çiftliklerde ve şantiyelerde mazot depolamak, akaryakıt istasyonlarında yer altı stoklamak, tankerlerde sıvı taşımak, sanayide kimyasal ve yağ saklamak, kırsalda su ve sıvı gübre bulundurmak için yaygın biçimde kullanılır. Bu tankların çoğunda seviye göstergesi bulunmaz ya da arızalıdır; stok takibi çubuk ölçümüyle yapılır.',
      'Araç bu ölçümü litreye çevirerek sipariş zamanını planlamanıza, teslimat öncesi ve sonrası ölçüm farkından gelen miktarı kontrol etmenize ve tüketimi izlemenize yardımcı olur. "Boş hacim" satırı, tankerden taşırmadan en fazla kaç litre alabileceğinizi gösterir. Kendi tankınız için beşer santimetre aralıklarla hesap yapıp bir kalibrasyon cetveli hazırlayabilir ve tankın yanına asabilirsiniz.',
    ] },
    { h: 'Doğru ölçüm için ipuçları ve sınırlar', p: [
      'Çubuğu tam dik tutun; eğik indirilen çubuk seviyeyi olduğundan yüksek gösterir. Ölçümü tank dolumundan hemen sonra değil, yüzey durulduktan sonra yapın. Dolum ağzı tankın tam üst noktasında değilse çubuğun tabana değdiği nokta en alt nokta olmayabilir. Tank hafif eğimli duruyorsa iki uçtan ölçüp ortalamasını almak hatayı azaltır.',
      'Hesap, uçları düz kapaklı ideal bir silindir içindir. Bombeli (torisferik ya da eliptik) kapaklı tanklarda kapakların hacmi ayrıca eklenmelidir; bu ek hacim tankın geometrisine göre toplamın birkaç yüzdesi düzeyinde olabilir. İç çap yerine dış çap girilmesi de kapasiteyi olduğundan büyük gösterir. Sıcaklıkla genleşen yakıtlarda hacim mevsime göre değişir. Sonuç bilgilendirme amaçlıdır; ticari teslim, faturalama ve resmî stok beyanında kalibre edilmiş sayaç ya da onaylı kalibrasyon cetveli esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Yatay tank yarı seviyedeyse yarısı mı doludur?', 'Evet, yalnızca tam orta noktada seviye ile doluluk eşittir. Sıvı yüksekliği çapın yarısıysa tank tam %50 doludur. Diğer bütün seviyelerde oran farklıdır.'],
    ['Çubuk çeyrek seviyeyi gösteriyorsa tankın ne kadarı doludur?', 'Çapın dörtte biri yüksekliğindeki sıvı tankın yaklaşık %19,55\'ini doldurur. Örneğin 1.570,8 litrelik bir tankta bu 307,09 litre eder; dörtte bir hesabıyla bulunacak 392,7 litreden belirgin biçimde azdır.'],
    ['Tankın toplam hacmini nasıl bulurum?', 'Sıvı yüksekliğine tank çapını yazarsanız mevcut hacim toplam kapasiteye eşit olur. Araç ayrıca her hesapta "Toplam kapasite" satırını gösterir; formülü π × r² × L\'dir.'],
    ['Ölçüleri metre ya da milimetre olarak girebilir miyim?', 'Alanlar santimetre bekler. Metre cinsinden ölçüleri 100 ile çarpın, milimetre cinsinden ölçüleri 10\'a bölün. Üç değerin de aynı birimde, santimetre olması gerekir.'],
    ['Dik duran silindirik tank için de kullanılır mı?', 'Hayır. Dik silindirde hacim seviyeyle doğru orantılıdır; taban alanını sıvı yüksekliğiyle çarpmak yeterlidir. Bu araç yalnızca ekseni yere paralel duran tanklar içindir.'],
    ['Bombeli kapaklı tanklarda sonuç doğru olur mu?', 'Silindirik gövde için doğru olur, ancak bombeli kapakların içindeki sıvı hesaba katılmaz. Bu nedenle gerçek miktar hesaplanan değerden bir miktar fazladır. Kesin sonuç için üreticinin kalibrasyon tablosuna bakın.'],
    ['Hangi sıvılar için geçerli?', 'Hesap tamamen geometriktir; su, mazot, benzin, yağ, sıvı gübre gibi her sıvı için aynı litre değerini verir. Ağırlığı bulmak isterseniz litreyi sıvının yoğunluğuyla çarpmanız gerekir.'],
    ['Girdiğim tank ölçüleri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; ölçüleriniz hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['su-deposu-hacmi-hesapla', 'boru-hacmi-hesapla', 'hacim-hesapla', 'yagmur-suyu-hasadi-hesapla', 'havuz-hacmi-hesapla'],
};
