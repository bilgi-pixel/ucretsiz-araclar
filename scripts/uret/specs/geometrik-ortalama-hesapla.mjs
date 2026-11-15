export default {
  slug: 'geometrik-ortalama-hesapla',
  title: 'Geometrik Ortalama Hesaplama',
  h1Tail: 'sayılar ve yüzde değişimler için',
  pageTitle: 'Geometrik Ortalama Hesaplama – Formül, Ortalama Büyüme Oranı',
  description: 'Pozitif sayıların geometrik ortalamasını ya da art arda gelen yüzde değişimlerin ortalama büyüme oranını hesaplayın. Aritmetik ortalamayla karşılaştırmalı sonuç verir.',
  card: 'Sayıların geometrik ortalamasını ya da yüzde değişimlerin dönem başına ortalama büyüme oranını bulun.',
  category: 'matematik',
  keywords: ['geometrik ortalama hesaplama', 'geometrik ortalama formülü', 'geometrik ortalama nasıl bulunur', 'ortalama büyüme oranı hesaplama', 'yıllık ortalama getiri', 'geometrik orta', 'bileşik büyüme oranı'],
  lead: 'Pozitif sayıların <strong>geometrik ortalamasını</strong>, yani çarpımlarının n. dereceden kökünü hesaplayın. Art arda gelen yüzde artış ve azalışlarınız varsa girdi türünü değiştirerek dönem başına ortalama değişim oranını da bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 2 8  ya da  10 20 30', hint: 'Boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın.', wide: true },
    { id: 'tur', label: 'Girdi türü', type: 'select', options: [['sayi', 'Pozitif sayılar'], ['yuzde', 'Yüzde değişimler (% artış / azalış)']] },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const yuzde = v.tur === 'yuzde';
    const c = yuzde ? a.map((x) => 1 + x / 100) : a;
    if (yuzde) {
      if (c.some((x) => !(x > 1e-12))) h.err('Yüzde değişimler -100\'den büyük olmalı; yüzde 100 ya da daha fazla düşüşte değer sıfırlandığı için ortalama oran hesaplanamaz.');
    } else if (c.some((x) => !(x > 0))) {
      h.err('Geometrik ortalama yalnızca sıfırdan büyük sayılar için hesaplanır. Sıfır ve negatif değerleri çıkarın; artış-azalış oranlarınız varsa "Yüzde değişimler" türünü seçin.');
    }
    const logOrt = c.reduce((s, x) => s + Math.log(x), 0) / n;
    const go = Math.exp(logOrt);
    const carpim = c.reduce((s, x) => s * x, 1);
    const ao = a.reduce((s, x) => s + x, 0) / n;
    const carpimMetin = Number.isFinite(carpim) && carpim > 0 ? h.sig(carpim, 8) : 'Gösterilemeyecek kadar büyük ya da küçük';
    if (yuzde) {
      return {
        rows: [
          ['Ortalama değişim oranı', '% ' + h.fmt((go - 1) * 100, 2)],
          ['Geometrik ortalama (çarpan)', h.fmt(go, 4)],
          ['Toplam değişim', Number.isFinite(carpim) ? '% ' + h.fmt((carpim - 1) * 100, 2) : '—'],
          ['Yüzdelerin aritmetik ortalaması', '% ' + h.fmt(ao, 2)],
          ['Dönem sayısı', String(n)],
        ],
        note: 'Her yüzde değişim (1 + oran ÷ 100) çarpanına çevrildi; çarpanların geometrik ortalamasından 1 çıkarılarak dönem başına ortalama oran bulundu.',
      };
    }
    return {
      rows: [
        ['Geometrik ortalama', h.fmt(go, 4)],
        ['Aritmetik ortalama', h.fmt(ao, 4)],
        ['Sayıların çarpımı', carpimMetin],
        ['Veri sayısı', String(n)],
      ],
      note: 'Geometrik ortalama, sayıların çarpımının n. dereceden köküdür ve aritmetik ortalamadan büyük olamaz.',
    };
  },
  cases: [
    { in: { sayilar: '2 8', tur: 'sayi' }, out: { 'Geometrik ortalama': '4', 'Aritmetik ortalama': '5', 'Sayıların çarpımı': '16', 'Veri sayısı': '2' } },
    { in: { sayilar: '10 20 30', tur: 'yuzde' }, out: { 'Ortalama değişim oranı': '% 19,72', 'Geometrik ortalama (çarpan)': '1,1972', 'Toplam değişim': '% 71,6', 'Yüzdelerin aritmetik ortalaması': '% 20' } },
    { in: { sayilar: '1 3 9', tur: 'sayi' }, out: { 'Geometrik ortalama': '3', 'Sayıların çarpımı': '27' } },
    { in: { sayilar: '4 9', tur: 'sayi' }, out: { 'Geometrik ortalama': '6', 'Aritmetik ortalama': '6,5' } },
    { in: { sayilar: '10 100 1000', tur: 'sayi' }, out: { 'Geometrik ortalama': '100', 'Aritmetik ortalama': '370' } },
    { in: { sayilar: '50 -50', tur: 'yuzde' }, out: { 'Ortalama değişim oranı': '% -13,4', 'Toplam değişim': '% -25', 'Yüzdelerin aritmetik ortalaması': '% 0' } },
    { in: { sayilar: '100 -50', tur: 'yuzde' }, out: { 'Ortalama değişim oranı': '% 0', 'Toplam değişim': '% 0' } },
    { in: { sayilar: '5', tur: 'sayi' }, out: { 'Geometrik ortalama': '5' } },
    { in: { sayilar: '4 0 9', tur: 'sayi' }, error: true },
    { in: { sayilar: '-3 3', tur: 'sayi' }, error: true },
    { in: { sayilar: '20 -100', tur: 'yuzde' }, error: true },
  ],
  howto: [
    'Sayılarınızı "Sayılar" kutusuna aralarında boşluk bırakarak yazın.',
    '"Girdi türü" listesinden seçim yapın. Doğrudan pozitif sayıların ortalamasını arıyorsanız "Pozitif sayılar", yıllık ya da aylık artış-azalış oranlarınız varsa "Yüzde değişimler" seçeneğini kullanın.',
    'Yüzde türünde artışları düz, azalışları eksi işaretiyle yazın: yüzde 10 artış için 10, yüzde 5 düşüş için -5.',
    '"Hesapla" düğmesine basın. İlk satırda geometrik ortalamayı ya da dönem başına ortalama değişim oranını, altında karşılaştırma için aritmetik ortalamayı görürsünüz.',
  ],
  sections: [
    { h: 'Geometrik ortalama nedir?', p: [
      'Geometrik ortalama, n tane pozitif sayının çarpımının n. dereceden köküdür: <strong>G = ⁿ√(x₁ · x₂ · … · xₙ)</strong>. Aritmetik ortalama "bütün değerler eşit olsaydı aynı <em>toplamı</em> veren sayı hangisidir" sorusunu yanıtlar; geometrik ortalama ise "aynı <em>çarpımı</em> veren sayı hangisidir" sorusunun yanıtıdır.',
      'İki sayı için hesap bir kareköktür. 2 ile 8\'in çarpımı 16, karekökü <strong>4</strong>\'tür; aritmetik ortalamaları ise 5\'tir. Adını geometriden alır: kenarları 4 ve 9 birim olan bir dikdörtgenle aynı alana sahip karenin kenarı, bu iki sayının geometrik ortalaması olan 6 birimdir. Üç sayıda küp kök alınır: 1, 3 ve 9\'un çarpımı 27, küp kökü 3\'tür. Okul matematiğinde iki sayının geometrik ortalamasına <strong>geometrik orta</strong> da denir; bir geometrik dizide her terim, komşularının geometrik ortasıdır.',
    ] },
    { h: 'Hesap yöntemi ve logaritma', p: [
      'Çok sayıda ya da çok büyük değer çarpıldığında sonuç hızla devasa boyutlara ulaşır. Bu yüzden uygulamada logaritma kullanılır: sayıların doğal logaritmaları alınır, bu logaritmaların aritmetik ortalaması bulunur ve sonucun üstel fonksiyonu hesaplanır. Yani geometrik ortalama, logaritmaların ortalamasının geri dönüştürülmüş halidir. Araç da hesabı bu yolla yapar; böylece yüzlerce değer girilse bile taşma olmaz. "Sayıların çarpımı" satırı yalnızca bilgi amaçlıdır ve çok büyük çarpımlarda bilimsel gösterimle yazılır.',
      '10, 100 ve 1000 sayılarında bu mantık açıkça görülür: onluk logaritmaları 1, 2 ve 3, ortalaması 2 ve geometrik ortalama 10² = 100\'dür. Aritmetik ortalama ise 370 çıkar ve en büyük değerin etkisi altındadır.',
    ] },
    { h: 'Yüzde değişimlerin ortalaması: çözümlü örnek', p: [
      'Geometrik ortalamanın en yaygın kullanımı, art arda gelen büyüme oranlarının ortalamasını bulmaktır. Bir birikim üç yıl boyunca sırasıyla yüzde 10, yüzde 20 ve yüzde 30 değer kazanmış olsun. Oranlar önce çarpana çevrilir: 1,10, 1,20 ve 1,30. Çarpımları 1,716\'dır; yani 100.000 lira üç yılın sonunda 171.600 liraya ulaşmış, toplam artış yüzde 71,6 olmuştur.',
      '1,716\'nın küp kökü yaklaşık 1,1972\'dir. Buna göre yıllık ortalama büyüme <strong>yüzde 19,72</strong>\'dir: her yıl bu oranda artan bir tutar üç yılın sonunda aynı yere varır. Yüzdelerin aritmetik ortalaması olan yüzde 20 ise biraz fazla gösterir; her yıl yüzde 20 artış 172.800 lira ederdi. Aracı "Yüzde değişimler" türünde 10 20 30 girerek çalıştırdığınızda bu değerleri görürsünüz. Finans dilinde bu orana yıllık bileşik büyüme oranı denir.',
    ] },
    { h: 'Aritmetik ortalama neden yanıltır?', p: [
      'Bir varlık önce yüzde 50 yükselip sonra yüzde 50 düşerse yüzdelerin aritmetik ortalaması sıfırdır ve hiçbir şey değişmemiş gibi görünür. Oysa 100 lira önce 150\'ye çıkar, sonra 75\'e iner; ortada yüzde 25 kayıp vardır. Çarpanların geometrik ortalaması √(1,5 × 0,5) ≈ 0,866 olduğundan dönem başına ortalama değişim yaklaşık <strong>yüzde −13,4</strong>\'tür ve gerçeği doğru yansıtır. Benzer biçimde yüzde 100 artışı ancak yüzde 50 düşüş dengeler; bu iki oranın geometrik ortalaması tam sıfırdır.',
      'Genel kural şudur: değerler toplanarak birleşiyorsa aritmetik, çarpılarak birleşiyorsa geometrik ortalama kullanılır. Büyüme oranları, faiz ve getiri çarpanları, endeks değişimleri, nüfus artışı ve bakteri çoğalması çarpımsal süreçlerdir.',
    ] },
    { h: 'Diğer kullanım alanları', ul: [
      '<strong>Farklı ölçeklerdeki puanlar:</strong> Biri 1–10, diğeri 1–1000 aralığında ölçülen ölçütler birleştirilirken geometrik ortalama büyük ölçekli ölçütün sonucu ezmesini önler.',
      '<strong>Oranların ve endekslerin ortalaması:</strong> Fiyat endeksleri ve performans karşılaştırma oranları geometrik ortalamayla özetlenir.',
      '<strong>Görüntü ve ekran oranları:</strong> İki en-boy oranı arasında dengeli bir ara oran seçmek için geometrik ortalama alınır.',
      '<strong>Çarpık dağılan ölçümler:</strong> Birkaç çok yüksek değerin bulunduğu derişim ve sayım verilerinde geometrik ortalama tipik düzeyi daha iyi gösterir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Geometrik ortalama yalnızca pozitif sayılar için tanımlıdır. Dizide tek bir sıfır bulunması çarpımı sıfırlar, negatif sayılar ise kökü anlamsız kılabilir; araç bu durumlarda hata verir. Yüzde türünde −100 ve altı kabul edilmez, çünkü değerin tamamen sıfırlandığı bir dönemden sonra ortalama oran konuşulamaz.',
      'Pozitif sayılarda geometrik ortalama aritmetik ortalamadan büyük olamaz; ikisi yalnızca bütün değerler eşitken birbirine eşittir. Değerler birbirinden uzaklaştıkça aradaki fark açılır. Sonuçlar dört, yüzdeler iki ondalık basamağa yuvarlanır. Getiri hesapları geçmiş verinin özetidir; gelecekteki getiriyi göstermez ve yatırım tavsiyesi niteliği taşımaz.',
    ] },
  ],
  faq: [
    ['Geometrik ortalama nasıl hesaplanır?', 'Sayılar birbiriyle çarpılır ve çarpımın, sayı adedi kadar dereceden kökü alınır. İki sayıda karekök, üç sayıda küp kök kullanılır; 4 ile 9\'un geometrik ortalaması √36 = 6\'dır.'],
    ['Geometrik ortalama ile aritmetik ortalama arasındaki fark nedir?', 'Aritmetik ortalama toplamı, geometrik ortalama çarpımı korur. Toplanarak birleşen büyüklüklerde aritmetik, oran ve büyüme gibi çarpılarak birleşen büyüklüklerde geometrik ortalama doğru sonucu verir.'],
    ['Geometrik ortalama aritmetik ortalamadan büyük olabilir mi?', 'Hayır. Pozitif sayılar için geometrik ortalama her zaman aritmetik ortalamaya eşit ya da ondan küçüktür. Eşitlik yalnızca bütün sayılar aynı olduğunda sağlanır.'],
    ['Negatif sayı ya da sıfır neden girilemiyor?', 'Sıfır çarpımı sıfıra indirir ve ortalama anlamını yitirir; negatif sayılarda ise çift dereceli kök gerçek sayı vermeyebilir. Artış ve azalış oranlarınız varsa bunları yüzde türünde girin, araç çarpana çevirir.'],
    ['Yıllık ortalama getiriyi nasıl bulurum?', 'Girdi türünü "Yüzde değişimler" yapıp her yılın getirisini sırayla yazın. İlk satırdaki ortalama değişim oranı, her yıl aynı oranda büyüseydiniz aynı sonuca ulaştıracak yıllık orandır.'],
    ['Yalnızca başlangıç ve bitiş değerini biliyorsam ne yapmalıyım?', 'Bitiş değerini başlangıç değerine bölün, sonucun dönem sayısı kadar dereceden kökünü alın ve 1 çıkarın. 100.000 liranın üç yılda 171.600 liraya çıkması, 1,716\'nın küp kökünden yıllık yaklaşık yüzde 19,72 eder.'],
    ['Değerlerin sırası sonucu değiştirir mi?', 'Hayır. Çarpma işleminde sıra önemli olmadığından sayıları ya da yüzdeleri hangi sırayla yazarsanız yazın geometrik ortalama aynı çıkar.'],
    ['Yazdığım sayılar kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; verileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['harmonik-ortalama-hesapla', 'agirlikli-ortalama-hesapla', 'ortalama-hesapla', 'geometrik-dizi-hesapla', 'bilesik-faiz-hesapla', 'yuzde-degisim-hesapla'],
};
