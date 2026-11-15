export default {
  slug: 'serbest-dusme-hesapla',
  title: 'Serbest Düşme Hesaplama',
  h1Tail: 'h = ½ · g · t²',
  pageTitle: 'Serbest Düşme Hesaplama – Düşme Süresi, Yükseklik, Çarpma Hızı',
  description: 'Serbest düşmede yükseklik, düşme süresi ve yere çarpma hızını hesaplayın. Birini girin, diğer ikisini bulun; h = ½gt² ve v = gt formülleri, çözümlü örnekler.',
  card: 'Yükseklik, süre ya da çarpma hızından birini girin; serbest düşmenin diğer değerlerini m/s ve km/sa olarak bulun.',
  category: 'bilim',
  keywords: ['serbest düşme hesaplama', 'serbest düşme formülü', 'düşme süresi hesaplama', 'yere çarpma hızı', 'h = 1/2 g t2', 'serbest düşme hız', 'yükseklikten düşme süresi'],
  lead: `Durgun hâlden bırakılan bir cismin <strong>düşme süresini, düştüğü yüksekliği ve yere çarpma hızını</strong> hesaplayın. Üç büyüklükten bildiğiniz birini girmeniz yeterlidir; araç <strong>h = ½ · g · t²</strong> ve <strong>v = g · t</strong> bağıntılarıyla diğerlerini bulur. Hava direnci hesaba katılmaz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bilinen', label: 'Bilinen büyüklük', type: 'select', options: [['h', 'Yükseklik (m)'], ['t', 'Düşme süresi (s)'], ['v', 'Yere çarpma hızı (m/s)']] },
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 20', hint: 'Seçtiğiniz büyüklüğün değeri: metre, saniye ya da m/s.' },
    { id: 'g', label: 'Yer çekimi ivmesi g (m/s²)', type: 'number', value: '9,81', hint: 'Okul sorularında çoğu zaman 10 alınır. Ay için yaklaşık 1,62.' },
  ],
  compute(v, h) {
    const ad = v.bilinen === 't' ? 'Düşme süresi' : v.bilinen === 'v' ? 'Yere çarpma hızı' : 'Yükseklik';
    const x = h.pos(v.deger, ad);
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    let t, y, hiz;
    if (v.bilinen === 't') { t = x; y = 0.5 * g * t * t; hiz = g * t; }
    else if (v.bilinen === 'v') { hiz = x; t = hiz / g; y = (hiz * hiz) / (2 * g); }
    else { y = x; t = Math.sqrt((2 * y) / g); hiz = Math.sqrt(2 * g * y); }
    const tS = ['Düşme süresi', h.fmt(t, 4) + ' s'];
    const yS = ['Yükseklik', h.fmt(y, 4) + ' m'];
    const vS = ['Yere çarpma hızı', h.fmt(hiz, 4) + ' m/s'];
    const bas = v.bilinen === 't' ? [yS, vS, tS] : v.bilinen === 'v' ? [yS, tS, vS] : [tS, vS, yS];
    return {
      rows: [
        ...bas,
        ['Yere çarpma hızı (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Ortalama hız', h.fmt(hiz / 2, 4) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. İlk hız sıfır kabul edilir ve hava direnci yok sayılır; gerçek düşmede hız daha düşük, süre daha uzun olur.`,
    };
  },
  cases: [
    { in: { bilinen: 'h', deger: '20', g: '10' }, out: { 'Düşme süresi': '2 s', 'Yere çarpma hızı': '20 m/s', 'Yere çarpma hızı (km/sa)': '72 km/sa' } },
    { in: { bilinen: 't', deger: '3', g: '9,81' }, out: { 'Yükseklik': '44,145 m', 'Yere çarpma hızı': '29,43 m/s', 'Yere çarpma hızı (km/sa)': '105,95 km/sa' } },
    { in: { bilinen: 'h', deger: '45', g: '10' }, out: { 'Düşme süresi': '3 s', 'Yere çarpma hızı': '30 m/s', 'Ortalama hız': '15 m/s' } },
    { in: { bilinen: 'v', deger: '19,62', g: '9,81' }, out: { 'Düşme süresi': '2 s', 'Yükseklik': '19,62 m' } },
    { in: { bilinen: 'h', deger: '100', g: '9,81' }, out: { 'Düşme süresi': '4,5152 s', 'Yere çarpma hızı': '44,2945 m/s' } },
    { in: { bilinen: 't', deger: '1', g: '9,81' }, out: { 'Yükseklik': '4,905 m', 'Yere çarpma hızı': '9,81 m/s' } },
    { in: { bilinen: 't', deger: '2', g: '1,62' }, out: { 'Yükseklik': '3,24 m', 'Yere çarpma hızı': '3,24 m/s' } },
    { in: { bilinen: 'h', deger: '-5', g: '9,81' }, error: true },
    { in: { bilinen: 'h', deger: '20', g: '0' }, error: true },
    { in: { bilinen: 't', deger: '', g: '9,81' }, error: true },
  ],
  howto: [
    `"Bilinen büyüklük" listesinden elinizdeki veriyi seçin: cismin bırakıldığı yükseklik, düşme süresi ya da yere çarpma hızı.`,
    `"Değer" kutusuna bu büyüklüğün değerini yazın. Yükseklik metre, süre saniye, hız m/s cinsinden olmalıdır.`,
    `Yer çekimi ivmesi 9,81 olarak hazır gelir. Sorunuzda g = 10 m/s² verilmişse ya da Ay gibi başka bir gök cismi için hesap yapıyorsanız değiştirin.`,
    `"Hesapla" düğmesine basın. Sonuçta düşme süresi, yükseklik, çarpma hızının m/s ve km/sa karşılıkları ile düşme boyunca ortalama hız görünür.`,
  ],
  sections: [
    { h: 'Serbest düşme nedir?', p: [
      `Serbest düşme, bir cismin ilk hızı olmadan bırakıldığı ve yalnızca yer çekimi kuvvetinin etkisiyle hareket ettiği durumdur. Cisim aşağı doğru sabit ivmeyle hızlanır; bu ivme yer çekimi ivmesidir ve <strong>g</strong> ile gösterilir. Yeryüzüne yakın bölgede g yaklaşık 9,81 m/s² değerindedir; yani düşen cismin hızı her saniye yaklaşık 9,81 m/s artar.`,
      `Serbest düşmenin en çarpıcı sonucu, hava direnci olmadığında düşme süresinin ve hızının cismin kütlesine bağlı olmamasıdır. Havası boşaltılmış bir tüpte tüy ile bilye aynı anda yere ulaşır. Gündelik hayatta tüyün yavaş düşmesinin nedeni kütlesi değil, hava direncidir.`,
    ] },
    { h: 'Formüller', p: [
      `İlk hızı sıfır olan, sabit g ivmesiyle düşen cisim için üç temel bağıntı vardır:`,
    ], ul: [
      `<strong>v = g · t</strong> — t saniye sonraki hız`,
      `<strong>h = ½ · g · t²</strong> — t saniyede düşülen yükseklik`,
      `<strong>v² = 2 · g · h</strong> — h kadar düşüldüğünde ulaşılan hız (zamansız hız formülü)`,
      `Bunlardan türetilen <code>t = √(2h ÷ g)</code> ve <code>v = √(2 · g · h)</code> eşitlikleri yükseklikten süre ve hız bulmak için kullanılır.`,
      `Hız düzgün arttığı için düşme boyunca ortalama hız, son hızın yarısıdır: v<sub>ort</sub> = v ÷ 2.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Bir taş 20 m yükseklikten bırakılıyor (g = 10). t = √(2 × 20 ÷ 10) = √4 = <strong>2 s</strong>. Çarpma hızı v = 10 × 2 = <strong>20 m/s</strong>, yani 72 km/sa.`,
      `<strong>Örnek 2:</strong> Bir cisim 3 saniyede yere düşüyor (g = 9,81). h = ½ × 9,81 × 3² = 4,905 × 9 = <strong>44,145 m</strong>. Çarpma hızı v = 9,81 × 3 = <strong>29,43 m/s</strong>, yaklaşık 105,95 km/sa.`,
      `<strong>Örnek 3:</strong> 45 m yükseklikten bırakılan cisim g = 10 için t = √(90 ÷ 10) = <strong>3 s</strong> sonra, <strong>30 m/s</strong> hızla yere çarpar. Ortalama hızı 15 m/s'dir; 15 × 3 = 45 m sonucu yüksekliği doğrular.`,
      `<strong>Örnek 4:</strong> Yere 19,62 m/s hızla çarpan cisim (g = 9,81) t = 19,62 ÷ 9,81 = <strong>2 s</strong> düşmüştür; bırakıldığı yükseklik 19,62² ÷ (2 × 9,81) = <strong>19,62 m</strong> olur.`,
      `<strong>Örnek 5:</strong> 100 m yükseklikten düşme g = 9,81 için yaklaşık <strong>4,52 s</strong> sürer ve hız yaklaşık <strong>44,29 m/s</strong> (159 km/sa) değerine ulaşır.`,
    ] },
    { h: 'Saniye saniye düşme: 1-3-5-7 kuralı', p: [
      `g = 10 m/s² alındığında serbest düşen cisim ilk saniyede 5 m, ikinci saniyede 15 m, üçüncü saniyede 25 m, dördüncü saniyede 35 m yol alır. Ardışık saniyelerde alınan yollar 1 : 3 : 5 : 7 oranında artar. Toplam yollar ise 5, 20, 45, 80 m biçiminde, sürenin karesiyle orantılı büyür. Sınav sorularında bu oranları bilmek işlemi çok hızlandırır.`,
      `Hızlar ise her saniye eşit miktarda artar: 1. saniyenin sonunda 10, 2. saniyenin sonunda 20, 3. saniyenin sonunda 30 m/s. Hız-zaman grafiği orijinden geçen bir doğrudur ve eğimi g'ye, altındaki alan düşülen yüksekliğe eşittir.`,
    ] },
    { h: 'Hava direnci ve limit hız', p: [
      `Gerçek ortamda düşen cisme hızla birlikte artan bir hava direnci etki eder. Hız büyüdükçe direnç kuvveti ağırlığa yaklaşır; ikisi eşitlendiğinde net kuvvet sıfır olur ve cisim sabit hızla düşmeye devam eder. Bu hıza <em>limit hız</em> denir. Yağmur damlalarının çok yüksekten düşmelerine rağmen yere zararsız hızlarla ulaşması ve paraşütün işe yaraması bu yüzdendir.`,
      `Bu araç hava direncini yok sayar; dolayısıyla sonuçlar ağır ve küçük kesitli cisimlerin kısa mesafeli düşmeleri için gerçeğe yakındır. Uzun düşmelerde ya da hafif, geniş yüzeyli cisimlerde gerçek hız hesaplanandan belirgin biçimde düşük, süre ise daha uzun olur.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Süre formülünde karekök almayı ya da yükseklik formülünde sürenin karesini almayı unutmak.`,
      `½ çarpanını atlayıp h = g · t² yazmak; sonuç iki kat büyük çıkar.`,
      `Soruda verilen g değerini (9,8, 9,81 ya da 10) kullanmamak.`,
      `Cismin ilk hızı varsa (aşağı ya da yukarı atılmışsa) bu formüller geçerli değildir; düşey atış bağıntıları gerekir.`,
      `Hesap, g'nin sabit kaldığı yeryüzüne yakın yükseklikler içindir. Sonuçlar eğitim ve tahmin amaçlıdır; güvenlik, yüksekte çalışma ya da darbe hesabı gibi konularda tek başına karar ölçütü olarak kullanılmamalıdır.`,
    ] },
  ],
  faq: [
    ['Serbest düşme formülü nedir?', `İlk hızsız bırakılan cisim için yükseklik h = ½ · g · t², hız v = g · t ve zamansız bağıntı v² = 2 · g · h biçimindedir. g yer çekimi ivmesi, t düşme süresidir.`],
    ['Ağır cisim daha mı hızlı düşer?', `Hava direnci yoksa hayır. Serbest düşmede ivme kütleden bağımsızdır; ağır ve hafif cisim aynı yükseklikten aynı sürede düşer. Gündelik hayattaki fark hava direncinden kaynaklanır.`],
    ['Düşme süresi yükseklikten nasıl bulunur?', `Süre, yüksekliğin iki katının g'ye bölümünün kareköküdür: t = √(2h ÷ g). 20 m için g = 10 alınırsa √4 = 2 saniye bulunur.`],
    ['Yere çarpma hızı nasıl hesaplanır?', `Yükseklik biliniyorsa v = √(2 · g · h), süre biliniyorsa v = g · t kullanılır. 45 m yükseklikten düşen cisim g = 10 için 30 m/s hızla yere ulaşır.`],
    ['g neden bazen 10, bazen 9,81 alınır?', `Yer çekimi ivmesinin yeryüzündeki standart değeri yaklaşık 9,81 m/s²'dir. Okul sorularında işlemi kolaylaştırmak için 10'a yuvarlanır. Araçta g kutusunu sorunuza göre değiştirebilirsiniz.`],
    ['Yükseklik iki katına çıkarsa düşme süresi iki katına çıkar mı?', `Hayır. Süre yüksekliğin kareköküyle orantılıdır; yükseklik iki katına çıkınca süre yaklaşık 1,41 kat, dört katına çıkınca iki kat olur. Çarpma hızı da aynı oranda artar.`],
    ['Ay\'da serbest düşme nasıl olur?', `Ay'da çekim ivmesi yaklaşık 1,62 m/s² olduğundan cisimler çok daha yavaş hızlanır ve atmosfer olmadığı için hava direnci yoktur. g kutusuna 1,62 yazarak Ay için hesap yapabilirsiniz.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['egik-atis-hesapla', 'potansiyel-enerji-hesapla', 'duzgun-hizlanan-hareket-hesapla', 'ivme-hesapla', 'kinetik-enerji-hesapla'],
};
