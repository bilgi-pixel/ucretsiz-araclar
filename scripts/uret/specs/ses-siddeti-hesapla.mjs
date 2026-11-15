export default {
  slug: 'ses-siddeti-hesapla',
  title: 'Ses Şiddeti Düzeyi (Desibel) Hesaplama',
  h1Tail: 'W/m² ↔ dB',
  pageTitle: 'Ses Şiddeti Düzeyi Hesaplama – Desibel (dB) ve W/m² Dönüşümü',
  description: 'Ses şiddetini (W/m²) desibele, desibeli ses şiddetine çevirin; birden çok ses kaynağının toplam desibel düzeyini logaritmik olarak doğru biçimde hesaplayın.',
  card: 'Ses şiddetinden desibel düzeyini, desibelden şiddeti bulun; birden çok kaynağın toplam desibelini hesaplayın.',
  category: 'bilim',
  keywords: ['desibel hesaplama', 'ses şiddeti düzeyi', 'dB hesaplama', 'ses şiddeti formülü', 'desibel toplama', 'W/m2 desibel çevirme', 'işitme eşiği', 'ses düzeyi hesaplama'],
  lead: 'Ses şiddetini (W/m²) desibel cinsinden ses şiddeti düzeyine ya da desibeli şiddete çevirin; birkaç kaynağın birlikte oluşturduğu toplam düzeyi bulun. Hesap <strong>L = 10·log(I/I₀)</strong> bağıntısına ve I₀ = 10<sup>-12</sup> W/m² işitme eşiğine dayanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap türü', type: 'select', options: [['duzey', 'Şiddetten desibele (W/m² → dB)'], ['siddet', 'Desibelden şiddete (dB → W/m²)'], ['topla', 'Birden çok kaynağın toplam desibeli']] },
    { id: 'deger', label: 'Ses şiddeti (W/m²) ya da düzey (dB)', type: 'number', placeholder: 'Örn. 1e-5 ya da 70', hint: 'İlk iki hesap türünde kullanılır. Küçük şiddetler için 1e-5 gibi bilimsel gösterim yazabilirsiniz.' },
    { id: 'liste', label: 'Kaynakların düzeyleri (dB, boşlukla ayırın)', type: 'text', placeholder: 'Örn. 60 60 65', hint: 'Yalnızca toplam desibel hesabında kullanılır; en az iki değer yazın.', wide: true },
  ],
  compute(v, h) {
    const I0 = 1e-12;
    const bil = (x) => {
      if (x === 0) return '0';
      const [m, e] = x.toExponential(4).split('e');
      if (Number(e) >= -3 && Number(e) <= 5) return h.sig(x, 5);
      return `${String(Number(m)).replace('.', ',')} × 10^${Number(e)}`;
    };
    const benzet = (L) => {
      if (L < 0) return 'İşitme eşiğinin altında';
      if (L < 20) return 'İşitme eşiğine yakın, çok sessiz';
      if (L < 40) return 'Fısıltı, sessiz oda';
      if (L < 60) return 'Sakin ofis, alçak sesle konuşma';
      if (L < 80) return 'Normal konuşma, kalabalık ortam';
      if (L < 100) return 'Yoğun trafik, gürültülü atölye';
      if (L < 120) return 'Çok yüksek; uzun süre rahatsız edici';
      return 'Acı eşiği ve üzeri';
    };
    if (v.mod === 'topla') {
      const d = h.nums(v.liste, 'Kaynakların düzeyleri');
      if (d.length < 2) h.err('Toplam düzey için en az iki kaynağın desibel değerini boşlukla ayırarak yazın.');
      if (d.length > 50) h.err('En fazla 50 kaynak girebilirsiniz.');
      for (const x of d) if (x < -50 || x > 250) h.err('Desibel değerleri -50 ile 250 arasında olmalı.');
      const I = d.reduce((a, x) => a + I0 * Math.pow(10, x / 10), 0);
      const L = 10 * Math.log10(I / I0);
      const enBuyuk = Math.max(...d);
      return {
        rows: [
          ['Toplam ses düzeyi', h.fmt(L, 2) + ' dB'],
          ['Toplam ses şiddeti', bil(I) + ' W/m²'],
          ['Kaynak sayısı', String(d.length)],
          ['En gürültülü kaynağa göre artış', h.fmt(L - enBuyuk, 2) + ' dB'],
          ['Yaklaşık karşılık', benzet(L)],
        ],
        note: 'Kaynakların birbirinden bağımsız (uyumsuz) olduğu ve düzeylerin aynı noktada ölçüldüğü varsayılır. Desibeller doğrudan toplanmaz; şiddetler toplanır.',
      };
    }
    if (v.mod === 'siddet') {
      const L = h.num(v.deger, 'Ses düzeyi');
      if (L < -50 || L > 250) h.err('Ses düzeyi -50 ile 250 dB arasında olmalı.');
      const I = I0 * Math.pow(10, L / 10);
      return {
        rows: [
          ['Ses şiddeti', bil(I) + ' W/m²'],
          ['Ses düzeyi', h.fmt(L, 2) + ' dB'],
          ['İşitme eşiğinin katı (I/I₀)', bil(I / I0)],
          ['Yaklaşık karşılık', benzet(L)],
        ],
        note: 'Referans şiddet I₀ = 10^-12 W/m² (1000 Hz için işitme eşiği) alınmıştır.',
      };
    }
    const I = h.pos(v.deger, 'Ses şiddeti');
    const L = 10 * Math.log10(I / I0);
    return {
      rows: [
        ['Ses düzeyi', h.fmt(L, 2) + ' dB'],
        ['Ses şiddeti', bil(I) + ' W/m²'],
        ['İşitme eşiğinin katı (I/I₀)', bil(I / I0)],
        ['Yaklaşık karşılık', benzet(L)],
      ],
      note: 'Referans şiddet I₀ = 10^-12 W/m² (1000 Hz için işitme eşiği) alınmıştır.',
    };
  },
  cases: [
    { in: { mod: 'duzey', deger: '1e-5' }, out: { 'Ses düzeyi': '70 dB', 'İşitme eşiğinin katı (I/I₀)': '1 × 10^7' } },
    { in: { mod: 'siddet', deger: '120' }, out: { 'Ses şiddeti': '1 W/m²', 'Yaklaşık karşılık': 'Acı eşiği ve üzeri' } },
    { in: { mod: 'duzey', deger: '1e-12' }, out: { 'Ses düzeyi': '0 dB' } },
    { in: { mod: 'siddet', deger: '60' }, out: { 'Ses şiddeti': '1 × 10^-6 W/m²' } },
    { in: { mod: 'topla', liste: '60 60' }, out: { 'Toplam ses düzeyi': '63,01 dB', 'En gürültülü kaynağa göre artış': '3,01 dB' } },
    { in: { mod: 'topla', liste: '70 80' }, out: { 'Toplam ses düzeyi': '80,41 dB', 'Kaynak sayısı': '2' } },
    { in: { mod: 'duzey', deger: '2e-6' }, out: { 'Ses düzeyi': '63,01 dB' } },
    { in: { mod: 'topla', liste: '50 50 50 50 50 50 50 50 50 50' }, out: { 'Toplam ses düzeyi': '60 dB' } },
    { in: { mod: 'duzey', deger: '0' }, error: true },
    { in: { mod: 'topla', liste: '60' }, error: true },
    { in: { mod: 'siddet', deger: '' }, error: true },
  ],
  howto: [
    '"Hesap türü" listesinden şiddetten desibele, desibelden şiddete ya da birden çok kaynağın toplamına ait hesabı seçin.',
    'Şiddetten desibele hesabında ses şiddetini W/m² olarak yazın. Çok küçük değerler için 3,2e-7 gibi bilimsel gösterim kullanabilirsiniz.',
    'Desibelden şiddete hesabında aynı kutuya düzeyi dB olarak girin; örneğin 85.',
    'Toplam hesabında ikinci kutuya her kaynağın desibel değerini aralarında boşluk bırakarak yazın.',
    '"Hesapla" düğmesine basın. Sonuçta düzey, şiddet, işitme eşiğine oran ve gündelik hayattan yaklaşık bir karşılık görünür.',
  ],
  sections: [
    { h: 'Ses şiddeti ve ses şiddeti düzeyi arasındaki fark', p: [
      'Ses şiddeti, ses dalgasının birim zamanda birim yüzeyden geçirdiği enerjidir ve metrekare başına watt (W/m²) ile ölçülür. İnsan kulağı olağanüstü geniş bir aralığı algılar: zar zor duyulan bir ses ile kulakta acı oluşturan bir ses arasında şiddet bakımından yaklaşık bir trilyon kat fark vardır. Bu kadar geniş bir aralığı doğrusal bir ölçekle ifade etmek kullanışsız olduğu için logaritmik bir ölçek, yani desibel kullanılır.',
      'Ses şiddeti düzeyi, bir sesin şiddetinin işitme eşiği kabul edilen referans şiddete oranının logaritmasıdır. Dolayısıyla desibel mutlak bir enerji birimi değil, bir orandır. Fizik derslerinde referans olarak I₀ = 10<sup>-12</sup> W/m² alınır; bu değer sağlıklı genç bir kulağın 1000 Hz frekansta duyabildiği en zayıf ses kabul edilir.',
    ] },
    { h: 'Desibel formülü', p: [
      'Ses şiddeti düzeyi <strong>L = 10·log<sub>10</sub>(I/I₀)</strong> bağıntısıyla hesaplanır. Tersine, düzey bilindiğinde şiddet <strong>I = I₀·10<sup>L/10</sup></strong> ile bulunur. Formüldeki 10 çarpanı, "bel" adı verilen birimin onda biri olan desibele geçişi sağlar.',
      'Logaritmanın doğal sonucu şudur: şiddet 10 katına çıktığında düzey 10 dB artar, 100 katına çıktığında 20 dB, 1000 katına çıktığında 30 dB artar. Şiddetin iki katına çıkması ise yalnızca yaklaşık 3 dB\'lik bir artış demektir, çünkü 10·log 2 ≈ 3,01\'dir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Şiddetten düzeye:</strong> Bir noktadaki ses şiddeti 10<sup>-5</sup> W/m² olsun. Oran I/I₀ = 10<sup>-5</sup>/10<sup>-12</sup> = 10<sup>7</sup> olur. L = 10·log(10<sup>7</sup>) = 10 × 7 = <strong>70 dB</strong>. Araçta şiddet kutusuna 1e-5 yazdığınızda aynı sonucu alırsınız.',
      '<strong>Düzeyden şiddete:</strong> 60 dB\'lik bir sesin şiddeti I = 10<sup>-12</sup> × 10<sup>60/10</sup> = 10<sup>-12</sup> × 10<sup>6</sup> = <strong>10<sup>-6</sup> W/m²</strong> eder. 120 dB için ise sonuç 1 W/m²\'dir; bu değer acı eşiği olarak bilinir.',
      '<strong>İki kaynağın toplamı:</strong> Her biri tek başına 60 dB üreten iki özdeş makine birlikte çalıştığında toplam 120 dB olmaz. Şiddetler toplanır: 10<sup>-6</sup> + 10<sup>-6</sup> = 2 × 10<sup>-6</sup> W/m². Düzey L = 10·log(2 × 10<sup>6</sup>) ≈ <strong>63,01 dB</strong> çıkar. Yani kaynak sayısını ikiye katlamak düzeyi yalnızca 3 dB yükseltir.',
    ] },
    { h: 'Desibeller neden doğrudan toplanmaz?', p: [
      'Desibel logaritmik bir büyüklük olduğundan aritmetik toplama anlamsızdır. Doğru yöntem, her düzeyi önce şiddete çevirmek, şiddetleri toplamak ve toplamı yeniden desibele dönüştürmektir. Araç "toplam desibel" seçeneğinde tam olarak bunu yapar.',
      'Bu hesabın pratik bir sonucu vardır: düzeyleri birbirinden çok farklı iki kaynaktan güçlü olan belirleyicidir. 70 dB ve 80 dB\'lik iki kaynağın toplamı yaklaşık 80,41 dB\'dir; zayıf kaynak toplamı yarım desibel bile artırmaz. Aradaki fark 10 dB\'yi geçtiğinde zayıf kaynağın katkısı çoğu uygulamada ihmal edilir. Tersine, on özdeş kaynak düzeyi tam 10 dB yükseltir: on adet 50 dB\'lik kaynak birlikte 60 dB eder.',
    ] },
    { h: 'Gündelik seslerin yaklaşık düzeyleri', ul: [
      '<strong>0 dB</strong>: işitme eşiği (10<sup>-12</sup> W/m²)',
      '<strong>20–30 dB</strong>: yaprak hışırtısı, fısıltı',
      '<strong>40–50 dB</strong>: sessiz ev ya da kütüphane ortamı',
      '<strong>60 dB</strong>: yakın mesafede normal konuşma',
      '<strong>70–80 dB</strong>: elektrikli süpürge, işlek cadde',
      '<strong>90–100 dB</strong>: gürültülü atölye, yakından geçen motosiklet',
      '<strong>110 dB</strong>: yüksek sesli konser ortamı',
      '<strong>120 dB ve üzeri</strong>: acı eşiği (1 W/m²)',
    ], p: [
      'Bu değerler mesafeye, ortama ve ölçüm yöntemine göre değişen yaklaşık örneklerdir; aracın "Yaklaşık karşılık" satırı da aynı kaba sınıflamayı kullanır.',
    ] },
    { h: 'Algılanan yükseklik ve sınırlar', p: [
      'Kulağın algısı da kabaca logaritmiktir. Genel bir kural olarak düzeydeki 10 dB\'lik artış çoğu insan tarafından sesin yaklaşık iki katı yüksek olduğu biçiminde algılanır; oysa bu artış on kat fazla şiddet demektir. 1 dB\'lik fark ancak dikkatli dinlendiğinde ayırt edilebilir, 3 dB\'lik fark ise rahatça fark edilir.',
      'Bu araç saf fiziksel tanımı kullanır ve frekans ağırlıklandırması yapmaz. Gürültü ölçüm cihazlarında görülen dB(A) değeri, kulağın alçak ve çok yüksek frekanslara daha az duyarlı olmasını hesaba katan bir düzeltme içerir; burada hesaplanan değerle aynı olmayabilir. Ses basıncı düzeyi (20 mikropaskal referanslı) havada şiddet düzeyine sayısal olarak çok yakındır, ancak tanımı farklıdır.',
      'Sonuçlar eğitim ve bilgilendirme amaçlıdır. İşyeri gürültüsü, işitme sağlığı ya da yasal gürültü sınırlarıyla ilgili kararlar kalibre edilmiş cihazlarla yapılan ölçümlere ve ilgili uzmanların değerlendirmesine dayanmalıdır; güncel mevzuat sınır değerlerini ayrıca kontrol edin.',
    ] },
  ],
  faq: [
    ['Desibel nasıl hesaplanır?', 'Ses şiddeti W/m² olarak biliniyorsa L = 10·log(I/I₀) formülü kullanılır; I₀ = 10^-12 W/m² işitme eşiğidir. Örneğin 10^-5 W/m² şiddetindeki ses 70 dB eder.'],
    ['İki 60 dB\'lik ses birlikte kaç desibel eder?', 'Yaklaşık 63 dB eder. Desibeller toplanmaz, şiddetler toplanır; şiddetin iki katına çıkması düzeyi 10·log 2 ≈ 3,01 dB artırır.'],
    ['0 dB sessizlik anlamına mı gelir?', 'Hayır. 0 dB, şiddetin referans değere eşit olduğunu, yani sesin tam işitme eşiğinde olduğunu gösterir. Bu eşiğin altındaki sesler negatif desibel değerleriyle ifade edilir ve fiziksel olarak vardır.'],
    ['Ses 10 dB artınca şiddet kaç kat artar?', 'On kat artar. 20 dB artış 100 kat, 30 dB artış 1000 kat şiddet demektir. Algılanan yükseklik ise her 10 dB\'de kabaca iki katına çıkar.'],
    ['Ses şiddeti mesafeyle nasıl değişir?', 'Açık alanda noktasal bir kaynaktan uzaklaştıkça şiddet mesafenin karesiyle ters orantılı azalır. Mesafe iki katına çıktığında şiddet dörtte bire, düzey ise yaklaşık 6 dB aşağı düşer.'],
    ['dB ile dB(A) aynı şey midir?', 'Hayır. dB(A), insan kulağının frekansa göre duyarlılığını hesaba katan ağırlıklandırılmış bir ölçümdür. Bu araç ağırlıklandırma yapmaz; yalnızca şiddet ile düzey arasındaki fiziksel tanımı uygular.'],
    ['Negatif desibel olabilir mi?', 'Evet. Şiddet 10^-12 W/m² değerinden küçükse oran 1\'in altına düşer ve logaritma negatif çıkar. Örneğin 10^-13 W/m² şiddetindeki ses -10 dB düzeyindedir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['isik-siddeti-mesafe-hesapla', 'ses-hizi-hesapla', 'dalga-boyu-frekans-hesapla', 'doppler-etkisi-hesapla', 'bilimsel-gosterim-cevir'],
};
