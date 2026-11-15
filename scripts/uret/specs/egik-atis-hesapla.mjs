export default {
  slug: 'egik-atis-hesapla',
  title: 'Eğik Atış Hesaplama',
  h1Tail: 'menzil, yükseklik, uçuş süresi',
  pageTitle: 'Eğik Atış Hesaplama – Menzil, Maksimum Yükseklik, Uçuş Süresi',
  description: 'İlk hız ve atış açısından eğik atışın menzilini, maksimum yüksekliğini, uçuş süresini ve yere çarpma hızını hesaplayın. Yüksekten atış da desteklenir.',
  card: 'İlk hız ve açıdan eğik atışın menzilini, maksimum yüksekliğini ve uçuş süresini bulun; yüksekten atışı da hesaplayın.',
  category: 'bilim',
  keywords: ['eğik atış hesaplama', 'eğik atış formülleri', 'menzil hesaplama', 'maksimum yükseklik hesaplama', 'uçuş süresi', 'atış açısı menzil', 'yatay atış hesaplama'],
  lead: `Yatayla belirli bir açı yaparak fırlatılan cismin <strong>menzilini, çıkabileceği maksimum yüksekliği ve havada kalma süresini</strong> hesaplayın. İlk hızı ve atış açısını girin; isterseniz atışın yapıldığı yüksekliği de ekleyin. Hava direnci hesaba katılmaz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hiz', label: 'İlk hız (m/s)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'aci', label: 'Atış açısı (°)', type: 'number', placeholder: 'Örn. 30', hint: 'Yatayla yapılan açı, 0–90 arası. Yatay atış için 0 yazın.' },
    { id: 'yukseklik', label: 'Atış yüksekliği (m)', type: 'number', value: '0', hint: 'Cismin fırlatıldığı noktanın yerden yüksekliği. Yerden atışta 0.' },
    { id: 'g', label: 'Yer çekimi ivmesi g (m/s²)', type: 'number', value: '9,81', hint: 'Okul sorularında çoğu zaman 10 alınır.' },
  ],
  compute(v, h) {
    const v0 = h.pos(v.hiz, 'İlk hız');
    const aci = h.num(v.aci, 'Atış açısı');
    if (aci < 0 || aci > 90) h.err('Atış açısı 0 ile 90 derece arasında olmalı.');
    const h0 = h.opt(v.yukseklik, 0, 'Atış yüksekliği');
    if (h0 < 0) h.err('"Atış yüksekliği" negatif olamaz.');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const rad = (aci * Math.PI) / 180;
    const vx = aci === 90 ? 0 : v0 * Math.cos(rad);
    const vy = aci === 0 ? 0 : v0 * Math.sin(rad);
    const tCikis = vy / g;
    const T = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
    const R = vx * T;
    const H = h0 + (vy * vy) / (2 * g);
    const vSon = Math.sqrt(v0 * v0 + 2 * g * h0);
    return {
      rows: [
        ['Menzil', h.fmt(R, 2) + ' m'],
        ['Maksimum yükseklik', h.fmt(H, 2) + ' m'],
        ['Uçuş süresi', h.fmt(T, 2) + ' s'],
        ['Tepe noktasına çıkış süresi', h.fmt(tCikis, 2) + ' s'],
        ['Yatay hız', h.fmt(vx, 2) + ' m/s'],
        ['Düşey ilk hız', h.fmt(vy, 2) + ' m/s'],
        ['Yere çarpma hızı', h.fmt(vSon, 2) + ' m/s'],
      ],
      note: `g = ${h.fmt(g, 4)} m/s² alındı. Hava direnci yok sayılır ve cismin atış düzeyinin altındaki yatay zemine düştüğü varsayılır; maksimum yükseklik yerden ölçülür.`,
    };
  },
  cases: [
    { in: { hiz: '20', aci: '30', yukseklik: '0', g: '10' }, out: { 'Menzil': '34,64 m', 'Maksimum yükseklik': '5 m', 'Uçuş süresi': '2 s', 'Yatay hız': '17,32 m/s', 'Düşey ilk hız': '10 m/s' } },
    { in: { hiz: '10', aci: '45', yukseklik: '0', g: '10' }, out: { 'Menzil': '10 m', 'Maksimum yükseklik': '2,5 m', 'Uçuş süresi': '1,41 s' } },
    { in: { hiz: '20', aci: '90', yukseklik: '0', g: '10' }, out: { 'Menzil': '0 m', 'Maksimum yükseklik': '20 m', 'Uçuş süresi': '4 s' } },
    { in: { hiz: '10', aci: '0', yukseklik: '20', g: '10' }, out: { 'Menzil': '20 m', 'Maksimum yükseklik': '20 m', 'Uçuş süresi': '2 s', 'Yere çarpma hızı': '22,36 m/s' } },
    { in: { hiz: '50', aci: '60', yukseklik: '0', g: '9,81' }, out: { 'Menzil': '220,7 m', 'Maksimum yükseklik': '95,57 m', 'Uçuş süresi': '8,83 s' } },
    { in: { hiz: '40', aci: '30', yukseklik: '0', g: '10' }, out: { 'Menzil': '138,56 m', 'Maksimum yükseklik': '20 m', 'Uçuş süresi': '4 s', 'Tepe noktasına çıkış süresi': '2 s' } },
    { in: { hiz: '20', aci: '30', yukseklik: '15', g: '10' }, out: { 'Menzil': '51,96 m', 'Maksimum yükseklik': '20 m', 'Uçuş süresi': '3 s', 'Yere çarpma hızı': '26,46 m/s' } },
    { in: { hiz: '20', aci: '120', yukseklik: '0', g: '10' }, error: true },
    { in: { hiz: '0', aci: '30', yukseklik: '0', g: '10' }, error: true },
    { in: { hiz: '20', aci: '', yukseklik: '0', g: '10' }, error: true },
  ],
  howto: [
    `"İlk hız" kutusuna cismin fırlatılma hızını m/s cinsinden yazın.`,
    `"Atış açısı" kutusuna hız vektörünün yatayla yaptığı açıyı derece olarak girin. Tam yatay atış için 0, düşey yukarı atış için 90 yazın.`,
    `Cisim yerden değil de bir yükseklikten (balkon, kule, uçurum) atılıyorsa "Atış yüksekliği" kutusuna bu yüksekliği metre olarak yazın; yerden atışta 0 bırakın.`,
    `Gerekirse g değerini sorunuza göre değiştirin ve "Hesapla" düğmesine basın.`,
    `Sonuç kutusunda menzil, yerden ölçülen maksimum yükseklik, toplam uçuş süresi, tepeye çıkış süresi, hız bileşenleri ve yere çarpma hızı listelenir.`,
  ],
  sections: [
    { h: 'Eğik atış nedir?', p: [
      `Eğik atış, bir cismin yatayla belirli bir açı yapacak biçimde fırlatılmasıyla oluşan harekettir. Kaleye vurulan top, basket atışı, cirit ve gülle atma, fıskiyeden çıkan su aynı türden yörünge izler. Hava direnci ihmal edildiğinde bu yörünge bir <strong>paraboldür</strong>.`,
      `Hareketi anlamanın anahtarı, onu birbirinden bağımsız iki harekete ayırmaktır. Yatay doğrultuda cisme hiçbir kuvvet etki etmez, bu yüzden yatay hız hareket boyunca <em>sabit</em> kalır. Düşey doğrultuda ise yer çekimi etkilidir; cisim yukarı çıkarken yavaşlar, tepe noktasında düşey hızı sıfır olur, sonra hızlanarak iner. İki hareket aynı süreyi paylaşır.`,
    ] },
    { h: 'Formüller', p: [
      `İlk hız v<sub>0</sub>, atış açısı θ olsun. Önce hız bileşenlerine ayrılır: <strong>v<sub>x</sub> = v<sub>0</sub> · cos θ</strong> ve <strong>v<sub>y</sub> = v<sub>0</sub> · sin θ</strong>. Yerden atılıp aynı düzeye düşen cisim için:`,
    ], ul: [
      `<strong>Tepeye çıkış süresi:</strong> t = v<sub>y</sub> ÷ g`,
      `<strong>Uçuş süresi:</strong> T = 2 · v<sub>y</sub> ÷ g`,
      `<strong>Maksimum yükseklik:</strong> H = v<sub>y</sub>² ÷ (2 · g)`,
      `<strong>Menzil:</strong> R = v<sub>x</sub> · T = v<sub>0</sub>² · sin 2θ ÷ g`,
      `<strong>Yüksekten atış</strong> (atış yüksekliği h<sub>0</sub>): T = [v<sub>y</sub> + √(v<sub>y</sub>² + 2 · g · h<sub>0</sub>)] ÷ g, menzil yine v<sub>x</sub> · T, maksimum yükseklik h<sub>0</sub> + v<sub>y</sub>² ÷ (2g) olur.`,
      `<strong>Yere çarpma hızı:</strong> enerji korunumundan v = √(v<sub>0</sub>² + 2 · g · h<sub>0</sub>); yerden atışta ilk hıza eşittir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Bir top 20 m/s hızla, 30° açıyla atılıyor (g = 10). v<sub>x</sub> = 20 × cos 30° ≈ 17,32 m/s, v<sub>y</sub> = 20 × sin 30° = 10 m/s. Uçuş süresi T = 2 × 10 ÷ 10 = <strong>2 s</strong>, maksimum yükseklik H = 10² ÷ 20 = <strong>5 m</strong>, menzil R = 17,32 × 2 ≈ <strong>34,64 m</strong>.`,
      `<strong>Örnek 2:</strong> 10 m/s hızla 45° açıyla atış (g = 10): R = 10² × sin 90° ÷ 10 = <strong>10 m</strong>, H = (10 × sin 45°)² ÷ 20 = 50 ÷ 20 = <strong>2,5 m</strong>, T ≈ <strong>1,41 s</strong>.`,
      `<strong>Örnek 3 (yatay atış):</strong> 20 m yüksekliğindeki bir binadan 10 m/s hızla yatay atılan cisim (g = 10) T = √(2 × 20 ÷ 10) = <strong>2 s</strong> sonra yere düşer ve yatayda 10 × 2 = <strong>20 m</strong> yol alır. Yere çarpma hızı √(10² + 2 × 10 × 20) = √500 ≈ <strong>22,36 m/s</strong> olur.`,
      `<strong>Örnek 4 (yüksekten eğik atış):</strong> 15 m yükseklikten 20 m/s hızla 30° açıyla atış (g = 10): v<sub>y</sub> = 10 m/s, T = [10 + √(100 + 300)] ÷ 10 = <strong>3 s</strong>, menzil 17,32 × 3 ≈ <strong>51,96 m</strong>, yerden maksimum yükseklik 15 + 5 = <strong>20 m</strong>.`,
    ] },
    { h: 'Hangi açıda en uzağa gider?', p: [
      `Yerden atılıp aynı düzeye düşen cisimde menzil sin 2θ ile orantılıdır ve bu değer θ = 45° iken en büyüktür. Dolayısıyla aynı hızla en uzak mesafe 45° açıyla elde edilir. Ayrıca toplamı 90° olan açılar (30° ile 60°, 20° ile 70° gibi) aynı menzili verir; yalnızca büyük açıda cisim daha yükseğe çıkar ve havada daha uzun kalır.`,
      `Atış bir yükseklikten yapılıyorsa en uzun menzili veren açı 45°'den küçüktür. Gülle atmada ideal açının 45°'nin altında olmasının nedenlerinden biri budur. Hava direnci de gerçek atışlarda en uygun açıyı düşürür.`,
    ] },
    { h: 'Hareket boyunca neler değişir, neler sabit kalır?', ul: [
      `Yatay hız bileşeni hiç değişmez; tepe noktasında cismin hızı sıfır değil, v<sub>x</sub> kadardır.`,
      `Düşey hız her saniye g kadar azalır, tepede sıfır olur, inişte aynı hızla artar.`,
      `İvme hareketin her anında g'dir ve aşağı yönlüdür; tepe noktasında da ivme sıfır değildir.`,
      `Yerden atışta çıkış süresi iniş süresine eşittir ve cisim yere, atıldığı sürat ve açıyla çarpar.`,
      `Sürtünme olmadığından mekanik enerji korunur; kinetik enerji tepe noktasında en küçük değerini alır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `sin ile cos'u karıştırmak: açı yatayla veriliyorsa yatay bileşen cos, düşey bileşen sin ile bulunur.`,
      `Hesap makinesini radyan modunda bırakmak.`,
      `Uçuş süresi yerine çıkış süresini kullanarak menzili yarı değerde bulmak.`,
      `Yüksekten atışta R = v<sub>0</sub>² · sin 2θ ÷ g formülünü kullanmak; bu formül yalnızca atış ve düşüş düzeyi aynıysa geçerlidir.`,
      `Araç hava direncini, rüzgârı ve cismin dönmesini hesaba katmaz. Hafif toplarda ve yüksek hızlarda gerçek menzil hesaplanandan belirgin biçimde kısadır; sonuçlar eğitim amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Eğik atışta menzil formülü nedir?', `Yerden atılıp aynı düzeye düşen cisim için menzil R = v₀² · sin 2θ ÷ g bağıntısıyla bulunur. Genel olarak menzil, yatay hız ile uçuş süresinin çarpımıdır.`],
    ['Maksimum yükseklik nasıl hesaplanır?', `Düşey ilk hızın karesi 2g'ye bölünür: H = (v₀ · sin θ)² ÷ (2g). Atış bir yükseklikten yapılıyorsa bu değer atış yüksekliğine eklenir.`],
    ['En uzun menzil hangi açıda elde edilir?', `Hava direnci yoksa ve cisim atıldığı düzeye düşüyorsa 45° açıda. Atış yüksekten yapılıyorsa ya da hava direnci etkiliyse en uygun açı 45°'den küçük olur.`],
    ['30° ve 60° açılarla atılan cisimlerin menzili neden aynı?', `Menzil sin 2θ'ya bağlıdır; sin 60° ile sin 120° birbirine eşittir. Bu yüzden toplamı 90° olan açılar aynı menzili verir, ancak 60°'lik atışta cisim daha yükseğe çıkar ve daha uzun süre havada kalır.`],
    ['Tepe noktasında cismin hızı sıfır mıdır?', `Hayır, yalnızca düşey hız bileşeni sıfırdır. Yatay hız değişmediği için cisim tepe noktasında v₀ · cos θ hızıyla yatay doğrultuda hareket eder. Düşey yukarı atış (90°) bunun tek istisnasıdır.`],
    ['Yatay atışı bu araçla hesaplayabilir miyim?', `Evet. Atış açısına 0 yazın ve cismin atıldığı yüksekliği girin. Araç düşme süresini, yatayda alınan yolu ve yere çarpma hızını verir.`],
    ['Kütle sonucu etkiler mi?', `Hava direncinin ihmal edildiği modelde hayır. Menzil, yükseklik ve süre yalnızca ilk hıza, açıya, atış yüksekliğine ve g'ye bağlıdır; bu yüzden araçta kütle girdisi yoktur.`],
    ['Girdiğim değerler kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['serbest-dusme-hesapla', 'duzgun-hizlanan-hareket-hesapla', 'ivme-hesapla', 'kinetik-enerji-hesapla', 'potansiyel-enerji-hesapla'],
};
