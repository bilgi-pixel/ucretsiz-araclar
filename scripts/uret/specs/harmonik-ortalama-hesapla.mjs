export default {
  slug: 'harmonik-ortalama-hesapla',
  title: 'Harmonik Ortalama Hesaplama',
  h1Tail: 'hız ve oranların ortalaması',
  pageTitle: 'Harmonik Ortalama Hesaplama – Formül ve Ortalama Hız Örnekleri',
  description: 'Pozitif sayıların harmonik ortalamasını hesaplayın. Gidiş-dönüş ortalama hızı ve oran ortalamaları için doğru yöntem; aritmetik ve geometrik ortalamayla birlikte.',
  card: 'Pozitif sayıların harmonik ortalamasını bulun; ortalama hız ve oran hesaplarında aritmetik ve geometrik ortalamayla karşılaştırın.',
  category: 'matematik',
  keywords: ['harmonik ortalama hesaplama', 'harmonik ortalama formülü', 'harmonik ortalama nasıl bulunur', 'ortalama hız hesaplama', 'gidiş dönüş ortalama hız', 'harmonik orta', 'oranların ortalaması'],
  lead: 'Pozitif sayılarınızı yazın; araç <strong>harmonik ortalamayı</strong>, yani sayı adedinin terslerin toplamına bölümünü hesaplar. Eşit mesafelerde farklı hızlar gibi oran türü büyüklüklerde doğru ortalama budur; sonuç aritmetik ve geometrik ortalamayla yan yana gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 60 90', hint: 'Sıfırdan büyük sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın.', wide: true },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    if (a.some((x) => !(x > 0))) h.err('Harmonik ortalama yalnızca sıfırdan büyük sayılar için hesaplanır. Sıfır ve negatif değerleri listeden çıkarın.');
    const tersToplam = a.reduce((s, x) => s + 1 / x, 0);
    const ho = n / tersToplam;
    const go = Math.exp(a.reduce((s, x) => s + Math.log(x), 0) / n);
    const ao = a.reduce((s, x) => s + x, 0) / n;
    return {
      rows: [
        ['Harmonik ortalama', h.fmt(ho, 4)],
        ['Geometrik ortalama', h.fmt(go, 4)],
        ['Aritmetik ortalama', h.fmt(ao, 4)],
        ['Terslerin toplamı (Σ 1/x)', h.sig(tersToplam, 6)],
        ['Veri sayısı', String(n)],
      ],
      note: 'Pozitif sayılarda sıralama her zaman aynıdır: harmonik ortalama ≤ geometrik ortalama ≤ aritmetik ortalama.',
    };
  },
  cases: [
    { in: { sayilar: '60 90' }, out: { 'Harmonik ortalama': '72', 'Aritmetik ortalama': '75', 'Geometrik ortalama': '73,4847', 'Veri sayısı': '2' } },
    { in: { sayilar: '40 60' }, out: { 'Harmonik ortalama': '48', 'Aritmetik ortalama': '50', 'Terslerin toplamı (Σ 1/x)': '0,0416667' } },
    { in: { sayilar: '1 2 4' }, out: { 'Harmonik ortalama': '1,7143', 'Geometrik ortalama': '2', 'Aritmetik ortalama': '2,3333', 'Terslerin toplamı (Σ 1/x)': '1,75' } },
    { in: { sayilar: '30 60 20' }, out: { 'Harmonik ortalama': '30', 'Terslerin toplamı (Σ 1/x)': '0,1' } },
    { in: { sayilar: '6 12' }, out: { 'Harmonik ortalama': '8', 'Aritmetik ortalama': '9' } },
    { in: { sayilar: '0,8 0,6' }, out: { 'Harmonik ortalama': '0,6857', 'Aritmetik ortalama': '0,7' } },
    { in: { sayilar: '1 4 4' }, out: { 'Harmonik ortalama': '2', 'Aritmetik ortalama': '3' } },
    { in: { sayilar: '10' }, out: { 'Harmonik ortalama': '10', 'Geometrik ortalama': '10', 'Aritmetik ortalama': '10' } },
    { in: { sayilar: '60 0 90' }, error: true },
    { in: { sayilar: '-5 5' }, error: true },
    { in: { sayilar: '' }, error: true },
  ],
  howto: [
    'Ortalamasını almak istediğiniz pozitif sayıları "Sayılar" kutusuna yazın; örneğin gidiş ve dönüş hızlarınız.',
    'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Virgül ondalık işareti olarak okunur.',
    '"Hesapla" düğmesine basın. İlk satırda harmonik ortalamayı, altında geometrik ve aritmetik ortalamayı görürsünüz.',
    'Üç ortalamayı karşılaştırın: aralarındaki fark, değerlerin birbirinden ne kadar uzak olduğunu ve yanlış ortalama seçmenin ne kadar hata doğuracağını gösterir.',
  ],
  sections: [
    { h: 'Harmonik ortalama nedir?', p: [
      'Harmonik ortalama, sayıların terslerinin aritmetik ortalamasının tersidir. Formülü <strong>H = n ÷ (1/x₁ + 1/x₂ + … + 1/xₙ)</strong> biçimindedir: önce her sayının tersi alınır, tersler toplanır ve sayı adedi bu toplama bölünür. İki sayı için formül sadeleşir: <strong>H = 2ab ÷ (a + b)</strong>.',
      'Aritmetik ve geometrik ortalamayla birlikte üç klasik ortalamadan biridir ve bu üçlü içinde her zaman en küçük sonucu verir. Küçük değerlere daha fazla ağırlık tanıdığı için, dizideki en küçük sayı sonucu güçlü biçimde aşağı çeker. Okul matematiğinde iki sayının harmonik ortalaması <strong>harmonik orta</strong> adıyla da geçer.',
    ] },
    { h: 'Çözümlü örnek: gidiş-dönüş ortalama hızı', p: [
      'Bir sürücü 180 kilometrelik yolu giderken saatte 60 kilometre, dönerken saatte 90 kilometre hızla kat etsin. İlk akla gelen yanıt (60 + 90) ÷ 2 = 75 olur, ancak bu yanlıştır. Gidiş 180 ÷ 60 = 3 saat, dönüş 180 ÷ 90 = 2 saat sürer. Toplam 360 kilometre 5 saatte alınmıştır ve gerçek ortalama hız 360 ÷ 5 = <strong>72 km/sa</strong>\'tir.',
      'Harmonik ortalama aynı sonucu doğrudan verir: 2 × 60 × 90 ÷ (60 + 90) = 10.800 ÷ 150 = 72. Araca 60 ve 90 yazdığınızda ilk satırda 72, aritmetik ortalama satırında 75 görürsünüz. Aritmetik ortalamanın fazla çıkmasının nedeni, sürücünün yavaş gittiği bölümde daha uzun <em>süre</em> geçirmesidir; yavaş hız ortalamada daha çok söz sahibidir. Dikkat çekici bir nokta da sonucun mesafeden bağımsız olmasıdır: yol 180 değil 50 kilometre olsaydı ortalama hız yine 72 çıkardı.',
    ] },
    { h: 'Hangi durumda harmonik, hangi durumda aritmetik?', p: [
      'Hız, verimlilik, birim fiyat gibi büyüklükler birer orandır: kilometre bölü saat, parça bölü saat, lira bölü kilogram. Bu tür oranların ortalamasında belirleyici olan, hangi niceliğin sabit tutulduğudur.',
    ], ul: [
      '<strong>Paydaki nicelik eşitse harmonik ortalama:</strong> Eşit <em>mesafeler</em> farklı hızlarla gidildiyse, eşit <em>tutarlar</em> farklı fiyatlardan harcandıysa, eşit <em>iş</em> farklı hızlarda yapıldıysa.',
      '<strong>Paydadaki nicelik eşitse aritmetik ortalama:</strong> Eşit <em>süreler</em> boyunca farklı hızlarla gidildiyse, eşit <em>miktarlar</em> farklı fiyatlardan alındıysa.',
    ] },
    { h: 'Başka kullanım alanları', p: [
      '<strong>Düzenli alımda ortalama maliyet:</strong> Her ay aynı tutarla altın, döviz ya da fon alan biri için ortalama birim maliyet, alış fiyatlarının harmonik ortalamasıdır. Fiyat 40 lirayken ve 60 lirayken eşit tutarda alım yapıldıysa ortalama maliyet 50 değil 48 liradır; çünkü ucuzken daha fazla adet alınmıştır.',
      '<strong>Birlikte iş yapma problemleri:</strong> Bir musluk havuzu 6 saatte, diğeri 12 saatte dolduruyorsa bu sürelerin harmonik ortalaması 8\'dir ve iki musluk birlikte bunun yarısında, yani 4 saatte doldurur. İşçi ve havuz problemlerinin tamamı bu mantığa dayanır.',
      '<strong>Paralel dirençler:</strong> Paralel bağlı dirençlerin eşdeğeri, harmonik ortalamanın direnç sayısına bölümüdür. 6 ve 12 ohmluk iki direncin harmonik ortalaması 8, eşdeğer direnci 8 ÷ 2 = 4 ohmdur.',
      '<strong>Sınıflandırma başarısı:</strong> Veri biliminde kesinlik ve duyarlılık ölçülerinin harmonik ortalaması tek bir başarı puanı olarak kullanılır. 0,8 ve 0,6 değerleri için sonuç yaklaşık 0,6857\'dir; aritmetik ortalama olan 0,7\'den düşüktür, çünkü harmonik ortalama iki ölçüden zayıf olanı cezalandırır.',
      '<strong>Finansal oranlar:</strong> Fiyat-kazanç gibi oranların bir sepet için ortalaması alınırken birkaç aşırı yüksek değerin sonucu şişirmesini önlemek için harmonik ortalama kullanılır.',
    ] },
    { h: 'Üç ortalamanın sıralaması', p: [
      'Pozitif sayılar için her zaman <strong>harmonik ≤ geometrik ≤ aritmetik</strong> eşitsizliği geçerlidir. Üçü yalnızca bütün sayılar birbirine eşitken aynı değeri alır. 1, 2 ve 4 için harmonik ortalama yaklaşık 1,7143, geometrik ortalama 2, aritmetik ortalama yaklaşık 2,3333\'tür. İki sayı söz konusu olduğunda bir ilişki daha vardır: geometrik ortalamanın karesi, aritmetik ve harmonik ortalamaların çarpımına eşittir. 60 ile 90 için 75 × 72 = 5.400 ve bu sayı 60 × 90 çarpımının kendisidir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, hızların aritmetik ortalamasını almaktır; sınav sorularındaki çeldirici şık neredeyse her zaman budur. İkinci hata, harmonik ortalamayı mesafeler eşit değilken kullanmaktır. Yolun 100 kilometresi 60, kalan 300 kilometresi 90 hızla gidildiyse düz harmonik ortalama doğru sonucu vermez; toplam yolu toplam süreye bölmeniz ya da mesafeleri ağırlık alan ağırlıklı harmonik ortalamayı kullanmanız gerekir. Bu araç eşit ağırlıklı durumu hesaplar.',
      'Harmonik ortalama sıfır ve negatif sayılar için tanımlı değildir: sıfırın tersi alınamaz, artı ve eksi değerlerin tersleri ise birbirini götürerek anlamsız sonuçlar üretir. Araç bu durumda hata verir. Sıfıra çok yakın tek bir değer bile sonucu neredeyse sıfıra indirir; böyle bir değerin ölçüm hatası olup olmadığını kontrol edin. Sonuçlar dört ondalık basamağa yuvarlanır. Elektrik devresi ve yatırım hesaplarında bu sayfa yalnızca aritmetiği gösterir; uygulama kararları için ilgili alanın uzmanına danışın.',
    ] },
  ],
  faq: [
    ['Harmonik ortalama formülü nedir?', 'Sayı adedi, sayıların terslerinin toplamına bölünür: H = n ÷ (1/x₁ + … + 1/xₙ). İki sayı için kısa hali 2ab ÷ (a + b) biçimindedir.'],
    ['Gidiş 60, dönüş 90 km/sa ise ortalama hız kaçtır?', 'Mesafeler eşit olduğundan harmonik ortalama alınır ve sonuç 72 km/sa çıkar. 75 yanıtı yanlıştır, çünkü yavaş gidilen bölüm daha uzun sürer ve ortalamayı aşağı çeker.'],
    ['Harmonik ortalama neden aritmetik ortalamadan küçük çıkar?', 'Terslerle çalıştığı için küçük değerlere daha fazla ağırlık verir. Pozitif sayılarda harmonik ortalama hiçbir zaman geometrik ve aritmetik ortalamayı aşamaz; yalnızca tüm sayılar eşitse üçü aynıdır.'],
    ['Eşit sürelerde farklı hızlarla gittiysem hangi ortalamayı kullanmalıyım?', 'Aritmetik ortalamayı. Bir saat 60, bir saat 90 hızla gittiyseniz iki saatte 150 kilometre yol alırsınız ve ortalama hız 75 km/sa olur. Harmonik ortalama eşit mesafeler içindir.'],
    ['Sıfır ya da negatif sayı neden kabul edilmiyor?', 'Sıfırın tersi tanımsızdır ve negatif sayılar terslerin toplamını sıfıra yaklaştırıp anlamsız sonuçlar doğurabilir. Harmonik ortalama yalnızca pozitif büyüklükler için kullanılır.'],
    ['İkiden fazla hız için de kullanabilir miyim?', 'Evet, her bölümün uzunluğu eşit olduğu sürece. Üç eşit etap 30, 60 ve 20 km/sa hızla geçildiyse ortalama hız 30 km/sa\'tir.'],
    ['Paralel direnç hesabıyla ilişkisi nedir?', 'Paralel dirençlerin eşdeğeri, terslerin toplamının tersidir; bu da harmonik ortalamanın direnç sayısına bölünmüş halidir. Araçtaki "Terslerin toplamı" satırının tersini alarak eşdeğer direnci bulabilirsiniz.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; sayılarınız sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['geometrik-ortalama-hesapla', 'agirlikli-ortalama-hesapla', 'ortalama-hesapla', 'istatistik-hesapla', 'medyan-hesapla'],
};
