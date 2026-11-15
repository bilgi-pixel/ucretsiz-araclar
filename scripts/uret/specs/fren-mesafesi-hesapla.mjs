export default {
  slug: 'fren-mesafesi-hesapla',
  title: 'Fren ve Duruş Mesafesi Hesaplama',
  h1Tail: 'reaksiyon + fren mesafesi',
  pageTitle: 'Fren ve Duruş Mesafesi Hesaplama – Hıza ve Zemine Göre',
  description: 'Hız, reaksiyon süresi ve zemin durumuna göre reaksiyon mesafesini, fren mesafesini ve toplam duruş mesafesini metre olarak hesaplayın.',
  card: 'Hıza, reaksiyon süresine ve zemine göre reaksiyon, fren ve toplam duruş mesafesini metre olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['fren mesafesi hesaplama', 'duruş mesafesi hesaplama', 'reaksiyon mesafesi', 'durma mesafesi formülü', 'ıslak zeminde fren mesafesi', 'kaç metrede durur', 'intikal mesafesi'],
  lead: `Aracın hızını, sürücünün reaksiyon süresini ve zemin durumunu seçin; araç <strong>reaksiyon mesafesini, fren mesafesini ve ikisinin toplamı olan duruş mesafesini</strong> fizik formülleriyle hesaplar.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hiz', label: 'Hız (km/sa)', type: 'number', placeholder: 'Örn. 90' },
    { id: 'reaksiyon', label: 'Reaksiyon süresi (saniye)', type: 'number', value: '1', hint: 'Tehlikeyi fark etmekle frene basmak arasındaki süre.' },
    { id: 'zemin', label: 'Zemin durumu', type: 'select', options: [['kuru', 'Kuru asfalt (μ ≈ 0,7)'], ['islak', 'Islak asfalt (μ ≈ 0,4)'], ['kar', 'Karlı yol (μ ≈ 0,2)'], ['buz', 'Buzlu yol (μ ≈ 0,1)']] },
    { id: 'ozel', label: 'Özel sürtünme katsayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 0,8', hint: 'Doldurulursa zemin seçimi yerine bu değer kullanılır.' },
  ],
  compute(v, h) {
    const G = 9.81;
    const kmh = h.pos(v.hiz, 'Hız');
    const t = h.nonneg(v.reaksiyon, 'Reaksiyon süresi');
    if (kmh > 400) h.err('"Hız" en fazla 400 km/sa olabilir.');
    if (t > 10) h.err('"Reaksiyon süresi" saniye cinsinden girilmeli; en fazla 10 olabilir.');
    const tablo = { kuru: 0.7, islak: 0.4, kar: 0.2, buz: 0.1 };
    let mu = tablo[v.zemin] ?? 0.7;
    if (String(v.ozel ?? '').trim() !== '') {
      mu = h.pos(v.ozel, 'Özel sürtünme katsayısı');
      if (mu > 1.5) h.err('"Özel sürtünme katsayısı" en fazla 1,5 olabilir; binek araçlar için olağan aralık 0,1–1 arasıdır.');
    }
    const ms = kmh / 3.6;
    const dR = ms * t;
    const dF = ms * ms / (2 * mu * G);
    const tF = ms / (mu * G);
    return {
      rows: [
        ['Toplam duruş mesafesi', h.fmt(dR + dF, 1) + ' m'],
        ['Reaksiyon mesafesi', h.fmt(dR, 1) + ' m'],
        ['Fren mesafesi', h.fmt(dF, 1) + ' m'],
        ['Toplam duruş süresi', h.fmt(t + tF, 2) + ' sn'],
        ['Hız', h.fmt(ms, 2) + ' m/sn'],
        ['Kullanılan sürtünme katsayısı', h.fmt(mu, 2)],
        ['Yavaşlama ivmesi', h.fmt(mu * G, 2) + ' m/sn²'],
      ],
      note: 'Düz yolda, tekerlekler kilitlenmeden tam frenleme varsayılmıştır. Sürtünme katsayıları yaklaşık tipik değerlerdir; gerçek mesafe lastik, fren, yük ve yol durumuna göre değişir.',
    };
  },
  cases: [
    { in: { hiz: '90', reaksiyon: '1', zemin: 'kuru' }, out: { 'Toplam duruş mesafesi': '70,5 m', 'Reaksiyon mesafesi': '25 m', 'Fren mesafesi': '45,5 m', 'Toplam duruş süresi': '4,64 sn', 'Hız': '25 m/sn' } },
    { in: { hiz: '50', reaksiyon: '1', zemin: 'islak' }, out: { 'Toplam duruş mesafesi': '38,5 m', 'Reaksiyon mesafesi': '13,9 m', 'Fren mesafesi': '24,6 m' } },
    { in: { hiz: '120', reaksiyon: '1,5', zemin: 'kuru' }, out: { 'Toplam duruş mesafesi': '130,9 m', 'Reaksiyon mesafesi': '50 m', 'Fren mesafesi': '80,9 m' } },
    { in: { hiz: '30', reaksiyon: '1', zemin: 'buz' }, out: { 'Toplam duruş mesafesi': '43,7 m', 'Fren mesafesi': '35,4 m' } },
    { in: { hiz: '100', reaksiyon: '1', zemin: 'kuru', ozel: '0,8' }, out: { 'Toplam duruş mesafesi': '76,9 m', 'Fren mesafesi': '49,2 m', 'Kullanılan sürtünme katsayısı': '0,8' } },
    { in: { hiz: '72', reaksiyon: '0,75', zemin: 'kar' }, out: { 'Toplam duruş mesafesi': '116,9 m', 'Reaksiyon mesafesi': '15 m', 'Fren mesafesi': '101,9 m', 'Hız': '20 m/sn' } },
    { in: { hiz: '0', reaksiyon: '1', zemin: 'kuru' }, error: true },
    { in: { hiz: 'hızlı', reaksiyon: '1', zemin: 'kuru' }, error: true },
    { in: { hiz: '90', reaksiyon: '1', zemin: 'kuru', ozel: '3' }, error: true },
  ],
  howto: [
    `"Hız" alanına aracın frenleme başlamadan önceki hızını kilometre/saat olarak yazın.`,
    `Reaksiyon süresini girin; dikkatli bir sürücü için 1 saniye yaygın bir kabuldür, yorgunluk ya da dikkat dağınıklığında daha yüksek değer seçin.`,
    `Zemin durumunu listeden seçin. Elinizde farklı bir sürtünme katsayısı varsa "Özel sürtünme katsayısı" alanına yazın.`,
    `"Hesapla" düğmesine basın; ilk satır toplam duruş mesafesini, altındaki satırlar reaksiyon ve fren paylarını gösterir.`,
  ],
  sections: [
    { h: 'Duruş mesafesi iki parçadan oluşur', p: [
      `Bir sürücü tehlikeyi gördüğü anda araç durmaya başlamaz. Önce göz tehlikeyi algılar, beyin karar verir ve ayak gaz pedalından fren pedalına geçer. Bu sürede araç hızını hiç kesmeden yoluna devam eder; kat edilen yola <strong>reaksiyon mesafesi</strong> (intikal mesafesi) denir. Frene basıldıktan sonra aracın tamamen durana kadar aldığı yol ise <strong>fren mesafesi</strong>dir. İkisinin toplamı <strong>duruş mesafesi</strong>ni verir ve önünüzdeki engele çarpıp çarpmayacağınızı belirleyen değer budur.`,
      `Sürücü kurslarında ve trafik eğitimlerinde bu ayrımın üzerinde durulmasının nedeni, iki parçanın farklı etkenlere bağlı olmasıdır. Reaksiyon mesafesi sürücünün durumuna, fren mesafesi ise aracın ve yolun durumuna bağlıdır.`,
    ] },
    { h: 'Formüller', p: [
      `Hız önce metre/saniyeye çevrilir: <strong>v = km/sa ÷ 3,6</strong>. Reaksiyon mesafesi sabit hızla gidilen yoldur: <strong>reaksiyon mesafesi = v × t</strong>. Fren mesafesi, aracın hareket enerjisinin lastik ile yol arasındaki sürtünmeyle tüketilmesinden çıkar: <strong>fren mesafesi = v² ÷ (2 × μ × g)</strong>. Burada μ lastik-yol sürtünme katsayısı, g ise 9,81 m/sn² olan yer çekimi ivmesidir.`,
      `Formülde aracın kütlesinin yer almaması dikkat çekicidir: ideal koşullarda ağır araçta hem durdurulacak enerji hem de sürtünme kuvveti aynı oranda artar. Gerçekte ise aşırı yük frenleri ısıtır ve lastiklerin tutunma sınırını zorlar; bu yüzden yüklü araç pratikte daha uzun mesafede durur.`,
    ] },
    { h: 'Çözümlü örnek: 90 km/sa, kuru asfalt', p: [
      `Hız 90 km/sa ise v = 90 ÷ 3,6 = 25 m/sn olur. Reaksiyon süresi 1 saniye alındığında araç frene basılana kadar 25 × 1 = <strong>25 metre</strong> gider. Kuru asfalt için μ = 0,7 kabul edildiğinde fren mesafesi 25² ÷ (2 × 0,7 × 9,81) = 625 ÷ 13,734 = <strong>45,5 metre</strong> çıkar. Toplam duruş mesafesi 25 + 45,5 = <strong>70,5 metre</strong>dir.`,
      `Frenleme süresi v ÷ (μ × g) = 25 ÷ 6,867 = 3,64 saniyedir; reaksiyonla birlikte araç tehlikenin fark edilmesinden 4,64 saniye sonra durur. Aynı hızda ıslak asfaltta (μ = 0,4) fren mesafesi 79,6 metreye, toplam mesafe 104,6 metreye çıkar.`,
    ] },
    { h: 'Hız iki katına çıkınca fren mesafesi dört katına çıkar', p: [
      `Fren mesafesi hızın karesiyle orantılıdır. Bu, sezgiye aykırı ama hayati bir sonuç doğurur: hız 50'den 100 km/sa'ya çıktığında fren mesafesi iki değil dört kat uzar. Kuru asfaltta 50 km/sa hızda fren mesafesi yaklaşık 14 metreyken 100 km/sa hızda yaklaşık 56 metredir. Reaksiyon mesafesi ise hızla doğru orantılı artar.`,
      `Yerleşim yerlerinde hız sınırlarının düşük tutulmasının fiziksel gerekçesi budur. Şehir içinde 50 yerine 70 km/sa ile gitmek, kuru yolda duruş mesafesini yaklaşık 28 metreden 47 metreye çıkarır; aradaki fark bir yaya geçidinin önünde durabilmekle duramamak arasındaki farktır.`,
    ] },
    { h: 'Reaksiyon süresini ve zemini doğru seçmek', ul: [
      `<strong>Reaksiyon süresi:</strong> hesaplarda çoğunlukla 1 saniye alınır; beklenmedik durumlarda 1,5 saniye ve üzeri daha gerçekçi olabilir. Yorgunluk, uykusuzluk, alkol, ilaç ve telefonla ilgilenmek bu süreyi belirgin biçimde uzatır.`,
      `<strong>Kuru asfalt (≈ 0,7):</strong> iyi durumdaki lastik ve temiz, kuru asfalt için tipik bir değerdir; yeni lastik ve kaliteli zeminde daha yüksek olabilir.`,
      `<strong>Islak asfalt (≈ 0,4):</strong> yağmurun ilk dakikalarında yoldaki toz ve yağ tabakası zemini daha da kayganlaştırır; diş derinliği azalmış lastiklerde değer hızla düşer.`,
      `<strong>Kar (≈ 0,2) ve buz (≈ 0,1):</strong> kış lastiği bu değerleri iyileştirir ama kuru zemin düzeyine getirmez. Gizli buzlanmada sürtünme çok daha düşük olabilir.`,
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      `Hesap düz yolda, sabit sürtünme katsayısıyla ve fren sisteminin tam verimle çalıştığı ideal bir frenlemeyi modeller. Yokuş aşağı yollarda mesafe uzar, yokuş yukarı kısalır. Fren sisteminin basınç oluşturma gecikmesi, ABS'nin çalışma biçimi, lastik basıncı, amortisörlerin durumu ve aracın yükü hesaba katılmamıştır. Bu nedenle sonuçlar eğitim ve farkındalık amaçlıdır; kaza incelemesi, bilirkişilik ya da mühendislik kararı için uzman değerlendirmesi gerekir. Yolda güvenli olan, hesabın gösterdiğinden daha fazla mesafe bırakmaktır.`,
    ] },
  ],
  faq: [
    ['Fren mesafesi ile duruş mesafesi aynı şey mi?', `Hayır. Fren mesafesi, frene basıldıktan sonra aracın durana kadar aldığı yoldur. Duruş mesafesi ise bunun üzerine sürücünün reaksiyon süresinde gidilen yolun eklenmesiyle bulunur.`],
    ['Fren mesafesi nasıl hesaplanır?', `Metre/saniye cinsinden hızın karesi, sürtünme katsayısı ile yer çekimi ivmesinin (9,81) çarpımının iki katına bölünür. 90 km/sa hız ve 0,7 sürtünme katsayısı için sonuç yaklaşık 45,5 metredir.`],
    ['Reaksiyon süresi kaç saniye alınmalı?', `Genel hesaplarda 1 saniye yaygın kabuldür. Sürücünün yaşı, dikkati ve yorgunluğu bu süreyi değiştirir; temkinli bir hesap için 1,5 saniye kullanabilirsiniz.`],
    ['Islak yolda fren mesafesi ne kadar uzar?', `Bu sayfadaki tipik değerlerle (kuru 0,7, ıslak 0,4) fren mesafesi yaklaşık 1,75 katına çıkar. Aşınmış lastiklerde ve su birikintilerinde fark çok daha büyük olabilir.`],
    ['Aracın ağırlığı fren mesafesini etkiler mi?', `İdeal formülde kütle sadeleşir ve sonucu değiştirmez. Uygulamada ağır yük frenlerin ısınmasına ve lastik tutunmasının azalmasına yol açabildiği için mesafe uzayabilir.`],
    ['ABS fren mesafesini kısaltır mı?', `ABS'nin temel görevi tekerleklerin kilitlenmesini önleyerek frenleme sırasında direksiyon hâkimiyetini korumaktır. Mesafeye etkisi zemine göre değişir; bu sayfa ABS davranışını ayrıca modellemez.`],
    ['Sürtünme katsayısını nereden bulabilirim?', `Listedeki değerler yaklaşık tipik değerlerdir. Fizik ve mühendislik kaynaklarında lastik-yol çifti için farklı zeminlere ait aralıklar verilir; elinizde belirli bir değer varsa "Özel sürtünme katsayısı" alanına yazabilirsiniz.`],
    ['Yazdığım değerler kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; hiçbir bilgi sunucuya gönderilmez.`],
  ],
  related: ['takip-mesafesi-hesapla', 'hiz-hesapla', 'duzgun-hizlanan-hareket-hesapla', 'lastik-karsilastir', 'vites-hiz-hesapla'],
};
