export default {
  slug: 'celsius-fahrenheit-cevir',
  title: 'Celsius Fahrenheit Çevirici',
  h1Tail: '°C ↔ °F',
  pageTitle: 'Celsius Fahrenheit Çevirici – Santigrat Dereceyi Fahrenhayta Çevirme',
  description: 'Santigrat (Celsius) dereceyi Fahrenheit dereceye, Fahrenheit dereceyi santigrata çevirin. Formül, çözümlü örnekler ve fırın, ateş, hava sıcaklığı tablosuyla.',
  card: 'Santigrat dereceyi Fahrenheit\'a, Fahrenheit\'ı santigrata çevirin; Kelvin karşılığı ve formülüyle birlikte.',
  category: 'birim',
  keywords: ['celsius fahrenheit çevirme', 'santigrat fahrenheit', 'fahrenheit kaç derece', 'c to f', 'f to c', 'derece fahrenheit hesaplama', '100 fahrenheit kaç santigrat', 'sıcaklık çevirici'],
  lead: 'Bir sıcaklığı santigrat dereceden (°C) Fahrenheit dereceye (°F) ya da tersine çevirin. Araç <strong>°F = °C × 9/5 + 32</strong> bağıntısını kullanır ve aynı sıcaklığın Kelvin karşılığını da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 37', hint: 'Sıfırın altı için başına eksi işareti koyun (örn. -18).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['c', 'Celsius (°C) → Fahrenheit (°F)'], ['f', 'Fahrenheit (°F) → Celsius (°C)']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    const c = v.yon === 'f' ? (x - 32) * 5 / 9 : x;
    const f = v.yon === 'f' ? x : x * 9 / 5 + 32;
    if (c < -273.15 - 1e-9) h.err('Bu sıcaklık mutlak sıfırın (−273,15 °C = −459,67 °F) altında; daha yüksek bir değer yazın.');
    const k = c + 273.15;
    const rows = v.yon === 'f'
      ? [['Celsius', h.fmt(c, 4) + ' °C'], ['Fahrenheit', h.fmt(f, 4) + ' °F']]
      : [['Fahrenheit', h.fmt(f, 4) + ' °F'], ['Celsius', h.fmt(c, 4) + ' °C']];
    rows.push(['Kelvin', h.fmt(k, 4) + ' K']);
    return { rows, note: '°F = °C × 9/5 + 32 ve °C = (°F − 32) × 5/9. Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  },
  cases: [
    { in: { deger: '100', yon: 'c' }, out: { 'Fahrenheit': '212 °F', 'Kelvin': '373,15 K' } },
    { in: { deger: '32', yon: 'f' }, out: { 'Celsius': '0 °C', 'Kelvin': '273,15 K' } },
    { in: { deger: '37', yon: 'c' }, out: { 'Fahrenheit': '98,6 °F', 'Kelvin': '310,15 K' } },
    { in: { deger: '-40', yon: 'c' }, out: { 'Fahrenheit': '-40 °F' } },
    { in: { deger: '0', yon: 'c' }, out: { 'Fahrenheit': '32 °F' } },
    { in: { deger: '350', yon: 'f' }, out: { 'Celsius': '176,6667 °C' } },
    { in: { deger: '180', yon: 'c' }, out: { 'Fahrenheit': '356 °F' } },
    { in: { deger: '0', yon: 'f' }, out: { 'Celsius': '-17,7778 °C' } },
    { in: { deger: 'sıcak', yon: 'c' }, error: true },
    { in: { deger: '-300', yon: 'c' }, error: true },
    { in: { deger: '-500', yon: 'f' }, error: true },
  ],
  howto: [
    '"Sıcaklık" alanına çevirmek istediğiniz değeri yazın; ondalık için virgül ya da nokta, sıfırın altı için eksi işareti kullanabilirsiniz.',
    '"Çeviri yönü" listesinden santigrattan Fahrenheit\'a mı, Fahrenheit\'tan santigrata mı çevireceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız karşılık, altında girdiğiniz değer ve Kelvin karşılığı görünür.',
    'Sonucu tarif defterine, seyahat notuna ya da ödevinize aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'İki ölçek arasındaki fark nereden geliyor?', p: [
      'Celsius ölçeğinde suyun donma noktası 0, deniz seviyesindeki kaynama noktası 100 kabul edilir; aradaki aralık 100 eşit parçaya bölünmüştür. Türkçede "santigrat derece" adı da buradan gelir. Fahrenheit ölçeğinde ise aynı iki nokta 32 ve 212 ile gösterilir; yani donma ile kaynama arasında 180 derecelik bir aralık vardır.',
      'Bu iki bilgi çeviri formülünün tamamını açıklar. 100 santigrat derecelik aralık 180 Fahrenheit derecesine karşılık geldiği için bir santigrat derecelik değişim 180 ÷ 100 = 1,8 (yani 9/5) Fahrenheit derecesidir. Sıfır noktaları da çakışmadığı için hesaba 32 derecelik bir kaydırma eklenir. Uzunluk ya da ağırlık çevirilerinden farklı olarak burada yalnızca bir katsayıyla çarpmak yetmez; kaydırmayı unutmak en sık yapılan hatadır.',
    ] },
    { h: 'Formüller ve çözümlü örnekler', p: [
      'Santigrattan Fahrenheit\'a: <strong>°F = °C × 9/5 + 32</strong>. Örnek: vücut sıcaklığı 37 °C için 37 × 1,8 = 66,6; üzerine 32 eklenince 98,6 °F bulunur. Fırın tariflerinde sık geçen 180 °C için 180 × 1,8 = 324, artı 32 = 356 °F eder.',
      'Fahrenheit\'tan santigrata: <strong>°C = (°F − 32) × 5/9</strong>. Önce 32 çıkarılır, sonra 5/9 ile çarpılır; sıra önemlidir. Örnek: Amerikan tariflerindeki 350 °F için 350 − 32 = 318; 318 × 5 ÷ 9 = 176,6667 °C. Uygulamada bu değer 175 ya da 180 °C\'ye yuvarlanır. 0 °F ise (0 − 32) × 5/9 = −17,7778 °C eder; derin dondurucuların −18 °C ayarı buradan gelir.',
      'İki ölçeğin aynı sayıyı gösterdiği tek sıcaklık −40 derecedir: −40 × 1,8 + 32 = −40. Araca −40 yazıp her iki yönü denediğinizde sonucun değişmediğini görebilirsiniz.',
    ] },
    { h: 'Akıldan hızlı tahmin yöntemi', p: [
      'Yanınızda hesap makinesi yokken santigratı ikiyle çarpıp 30 eklemek kaba bir Fahrenheit tahmini verir: 20 °C için 20 × 2 + 30 = 70 °F (gerçek değer 68 °F). Tersine, Fahrenheit değerinden 30 çıkarıp ikiye bölmek yaklaşık santigratı verir: 80 °F için (80 − 30) ÷ 2 = 25 °C (gerçek değer 26,67 °C). Bu yöntem hava sıcaklıkları için iş görür; ancak değer büyüdükçe hata artar. Fırın sıcaklığı, ateş ölçümü ya da laboratuvar çalışması gibi durumlarda tahmin yerine bu sayfadaki kesin hesabı kullanın.',
    ] },
    { h: 'Sık karşılaşılan sıcaklıklar', ul: [
      '<strong>−40 °C</strong> = −40 °F (iki ölçeğin kesiştiği nokta)',
      '<strong>−18 °C</strong> = −0,4 °F (derin dondurucu ayarı)',
      '<strong>0 °C</strong> = 32 °F (suyun donma noktası)',
      '<strong>4 °C</strong> = 39,2 °F (buzdolabı sıcaklığı)',
      '<strong>20 °C</strong> = 68 °F (oda sıcaklığı)',
      '<strong>37 °C</strong> = 98,6 °F (normal vücut sıcaklığı)',
      '<strong>38 °C</strong> = 100,4 °F (ateş sınırı olarak anılan değer)',
      '<strong>100 °C</strong> = 212 °F (suyun deniz seviyesinde kaynama noktası)',
      '<strong>160 °C</strong> = 320 °F, <strong>180 °C</strong> = 356 °F, <strong>200 °C</strong> = 392 °F, <strong>220 °C</strong> = 428 °F (fırın ayarları)',
    ] },
    { h: 'Türkiye\'de Fahrenheit ile nerede karşılaşılır?', p: [
      'Türkiye\'de günlük hayatta santigrat kullanılır; Fahrenheit ise çoğunlukla Amerika Birleşik Devletleri kaynaklı içerikte karşımıza çıkar. İngilizce yemek tariflerinde fırın sıcaklığı, yurt dışından alınan fırın, hava fritözü ve mangal termometrelerinin göstergeleri, ABD hava durumu tahminleri, ithal ateş ölçerlerin varsayılan ayarı ve bazı klima kumandaları Fahrenheit gösterebilir.',
      'Ateş ölçerde 100 °F civarında bir değer gördüğünüzde paniğe kapılmadan önce birimi kontrol edin: 100 °F yalnızca 37,78 °C\'dir. Benzer biçimde ABD\'deki bir şehir için verilen 75 derecelik tahmin 23,89 °C\'lik ılık bir güne karşılık gelir. Bu araç yalnızca birim çevirir; sağlıkla ilgili değerlendirme için hekime danışılmalıdır.',
    ] },
    { h: 'Sıcaklık farkı çevirirken dikkat', p: [
      'Bir sıcaklık değerini çevirmekle bir sıcaklık <em>farkını</em> çevirmek aynı şey değildir. "Hava yarın 10 derece ısınacak" cümlesindeki 10 °C\'lik artış, Fahrenheit ölçeğinde 10 × 1,8 = 18 derecelik artış demektir; buraya 32 eklenmez. Bu araç tek bir sıcaklık noktasını çevirir. Fark çevirmeniz gerekiyorsa santigrat farkını 1,8 ile çarpmanız, Fahrenheit farkını 1,8\'e bölmeniz yeterlidir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Fiziksel olarak ulaşılabilecek en düşük sıcaklık mutlak sıfırdır: −273,15 °C, yani −459,67 °F. Bunun altındaki bir değer yazıldığında araç hata verir. Üst sınır yoktur. Sonuçlar dört ondalık basamağa kadar gösterilir; termometrelerin çoğu onda bir dereceden daha hassas olmadığından günlük işlerde bir ondalık basamak yeterlidir.',
    ] },
  ],
  faq: [
    ['1 santigrat derece kaç Fahrenheit eder?', '1 °C sıcaklığı 33,8 °F eder. Ancak 1 santigrat derecelik bir sıcaklık artışı 1,8 Fahrenheit derecelik artışa karşılık gelir; ilki bir sıcaklık noktası, ikincisi bir farktır.'],
    ['100 Fahrenheit kaç santigrat derecedir?', '100 °F, (100 − 32) × 5/9 işlemiyle 37,7778 °C eder. Bu, normal vücut sıcaklığının biraz üzerinde bir değerdir.'],
    ['Santigrat ile Celsius aynı şey mi?', 'Evet. Ölçeğin resmî adı Celsius\'tur; "santigrat" ise donma ile kaynama arasının yüz parçaya bölünmesinden gelen eski ve Türkçede hâlâ yaygın olan addır. İkisi de °C simgesiyle gösterilir.'],
    ['Fırın tarifinde 350 °F yazıyor, kaç dereceye ayarlamalıyım?', '350 °F tam olarak 176,67 °C\'dir. Ev fırınlarında genellikle 175 ya da 180 °C seçilir. Turbo (fanlı) fırınlarda tarifin önerisine göre biraz daha düşük ayar gerekebilir; bu fırının özelliğine bağlıdır.'],
    ['Hangi sıcaklıkta Celsius ve Fahrenheit eşittir?', 'Yalnızca −40 derecede. −40 °C ile −40 °F aynı sıcaklıktır; bunun dışındaki hiçbir değerde iki ölçek aynı sayıyı göstermez.'],
    ['Fahrenheit değeri neden hep daha büyük görünüyor?', 'Çünkü Fahrenheit derecesi santigrat derecesinden daha küçük bir adımdır ve ölçeğin sıfırı daha soğuk bir noktadadır. −40\'ın üzerindeki bütün sıcaklıklarda Fahrenheit sayısı santigrat sayısından büyük çıkar.'],
    ['Negatif değer yazabilir miyim?', 'Evet. Sayının başına eksi işareti koymanız yeterlidir. Yalnızca mutlak sıfırın, yani −273,15 °C ya da −459,67 °F değerinin altına inilemez.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz sıcaklık hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['celsius-kelvin-cevir', 'fahrenheit-kelvin-cevir', 'kelvin-rankine-cevir', 'birim-donustur', 'isi-enerjisi-hesapla'],
};
