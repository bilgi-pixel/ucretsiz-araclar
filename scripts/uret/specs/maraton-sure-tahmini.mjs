export default {
  slug: 'maraton-sure-tahmini',
  title: 'Maraton ve Yarış Süresi Tahmini',
  h1Tail: 'Riegel formülüyle',
  pageTitle: 'Maraton ve Yarış Süresi Tahmini – Riegel Formülü Hesaplama',
  description: 'Bildiğiniz bir yarış sürenizden 5K, 10K, yarı maraton ve maraton bitiş sürenizi Riegel formülüyle tahmin edin; hedef tempo ve yorgunluk katsayısı ayarıyla.',
  card: 'Bilinen bir yarış sürenizden 5K, 10K, yarı maraton ve maraton sürenizi Riegel formülüyle tahmin edin.',
  category: 'saglik',
  keywords: ['maraton süre tahmini', 'yarış süresi tahmini', 'riegel formülü', 'maraton kaç saatte biter', 'yarı maraton süre tahmini', '10k süresinden maraton tahmini', 'koşu yarış hesaplama'],
  lead: `Yakın zamanda koştuğunuz bir yarışın ya da zamanlı denemenin mesafesini ve süresini girin; araç, mesafe uzadıkça temponun yavaşlamasını hesaba katan <strong>Riegel formülüyle</strong> başka bir mesafedeki olası bitiş sürenizi tahmin eder. 5 km, 10 km, yarı maraton ve maraton için tahminler aynı tabloda yer alır.`,
  button: 'Tahmin et',
  inputs: [
    { id: 'mesafe', label: 'Bilinen yarış mesafesi (km)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'sure', label: 'Bilinen yarış süresi', type: 'text', placeholder: 'Örn. 50:00 ya da 1:45:30', hint: 'saat:dakika:saniye ya da dakika:saniye. Tek sayı dakika kabul edilir.' },
    { id: 'hedef', label: 'Hedef mesafe (km)', type: 'number', value: '42,195', hint: 'Maraton 42,195 – yarı maraton 21,0975.' },
    { id: 'katsayi', label: 'Yorgunluk katsayısı', type: 'number', value: '1,06', hint: 'Standart değer 1,06. Dayanıklılığı zayıf olanlar 1,08–1,10 deneyebilir.' },
  ],
  compute(v, h) {
    const d1 = h.pos(v.mesafe, 'Bilinen yarış mesafesi');
    const d2 = h.pos(h.opt(v.hedef, 42.195, 'Hedef mesafe') + '', 'Hedef mesafe');
    const k = h.opt(v.katsayi, 1.06, 'Yorgunluk katsayısı');
    if (d1 < 1 || d1 > 250) h.err('Bilinen yarış mesafesi 1 ile 250 km arasında olmalı.');
    if (d2 < 1 || d2 > 250) h.err('Hedef mesafe 1 ile 250 km arasında olmalı.');
    if (k < 1 || k > 1.3) h.err('Yorgunluk katsayısı 1 ile 1,3 arasında olmalı. Standart değer 1,06\'dır.');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Bilinen yarış süresi" alanını doldurun (örn. 50:00).');
    let t1;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi saat:dakika:saniye ya da dakika:saniye biçiminde yazın (örn. 1:45:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 3) {
        if (n[1] >= 60 || n[2] >= 60) h.err('Dakika ve saniye 60\'tan küçük olmalı.');
        t1 = n[0] * 3600 + n[1] * 60 + n[2];
      } else {
        if (n[1] >= 60) h.err('Saniye 60\'tan küçük olmalı.');
        t1 = n[0] * 60 + n[1];
      }
    } else {
      t1 = h.pos(ham, 'Bilinen yarış süresi') * 60;
    }
    if (!(t1 > 0)) h.err('Süre sıfırdan büyük olmalı.');
    const tempo1 = t1 / d1;
    if (tempo1 < 120 || tempo1 > 1800) h.err('Girdiğiniz mesafe ve süre 2:00 ile 30:00 dk/km arasında bir tempoya denk gelmiyor. Değerleri kontrol edin.');
    const bicim = (s) => {
      const t = Math.round(s);
      const sa = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), ss = t % 60;
      return sa > 0 ? `${sa}:${String(d).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${d}:${String(ss).padStart(2, '0')}`;
    };
    const tahmin = (d) => t1 * Math.pow(d / d1, k);
    const t2 = tahmin(d2);
    return {
      rows: [
        ['Tahmini süre', bicim(t2)],
        ['Gereken tempo', bicim(t2 / d2) + ' dk/km'],
        ['Hedef mesafe', h.fmt(d2, 4) + ' km'],
        ['Bilinen yarış temposu', bicim(tempo1) + ' dk/km'],
        ['5 km tahmini', bicim(tahmin(5))],
        ['10 km tahmini', bicim(tahmin(10))],
        ['Yarı maraton tahmini', bicim(tahmin(21.0975))],
        ['Maraton tahmini', bicim(tahmin(42.195))],
      ],
      note: 'Tahmin, hedef mesafeye uygun antrenman yaptığınızı ve benzer parkur ve hava koşullarını varsayar.',
    };
  },
  cases: [
    { in: { mesafe: '10', sure: '50:00', hedef: '42,195', katsayi: '1,06' }, out: { 'Tahmini süre': '3:50:01', 'Gereken tempo': '5:27 dk/km', 'Bilinen yarış temposu': '5:00 dk/km', '5 km tahmini': '23:59', '10 km tahmini': '50:00', 'Yarı maraton tahmini': '1:50:19', 'Maraton tahmini': '3:50:01' } },
    { in: { mesafe: '5', sure: '25:00', hedef: '10', katsayi: '1,06' }, out: { 'Tahmini süre': '52:07', 'Gereken tempo': '5:13 dk/km', 'Yarı maraton tahmini': '1:55:00', 'Maraton tahmini': '3:59:47' } },
    { in: { mesafe: '21,0975', sure: '1:45:00' }, out: { 'Tahmini süre': '3:38:55', 'Gereken tempo': '5:11 dk/km', '10 km tahmini': '47:35', '5 km tahmini': '22:50' } },
    { in: { mesafe: '10', sure: '50', hedef: '42,195', katsayi: '1,08' }, out: { 'Tahmini süre': '3:56:44', 'Gereken tempo': '5:37 dk/km' } },
    { in: { mesafe: '5', sure: '20:00', hedef: '21,0975' }, out: { 'Tahmini süre': '1:32:00', 'Gereken tempo': '4:22 dk/km', 'Hedef mesafe': '21,0975 km' } },
    { in: { mesafe: '42,195', sure: '3:45:00', hedef: '50' }, out: { 'Tahmini süre': '4:29:21', 'Gereken tempo': '5:23 dk/km' } },
    { in: { mesafe: '10', sure: '', hedef: '42,195' }, error: true },
    { in: { mesafe: '10', sure: '50:00', hedef: '42,195', katsayi: '2' }, error: true },
    { in: { mesafe: '10', sure: '10:00', hedef: '42,195' }, error: true },
    { in: { mesafe: '0', sure: '50:00' }, error: true },
  ],
  howto: [
    `"Bilinen yarış mesafesi" alanına son dönemde tüm gücünüzle koştuğunuz bir yarışın ya da denemenin mesafesini kilometre olarak yazın.`,
    `"Bilinen yarış süresi" alanına o koşunun süresini girin: 50 dakika için 50:00, 1 saat 45 dakika için 1:45:00.`,
    `"Hedef mesafe" alanına tahmin istediğiniz mesafeyi yazın; varsayılan değer maratondur.`,
    `Yorgunluk katsayısını değiştirmeniz gerekmiyorsa 1,06 olarak bırakın ve "Tahmin et" düğmesine basın.`,
    `İlk satırdaki tahmini süreye ve bu süre için kilometre başına korumanız gereken tempoya bakın; alt satırlarda standart yarış mesafelerinin tahminleri yer alır.`,
  ],
  sections: [
    { h: 'Riegel formülü nedir?', p: [
      `Bir mesafedeki performanstan başka bir mesafedeki süreyi tahmin etmenin en yaygın yolu, mühendis ve koşucu Peter Riegel'in önerdiği üslü bağıntıdır: <strong>T<sub>2</sub> = T<sub>1</sub> × (D<sub>2</sub> ÷ D<sub>1</sub>)<sup>1,06</sup></strong>. Burada T<sub>1</sub> bilinen süre, D<sub>1</sub> bilinen mesafe, D<sub>2</sub> hedef mesafe ve T<sub>2</sub> tahmini süredir.`,
      `Üs tam 1 olsaydı tempo hiç değişmez, mesafe iki katına çıkınca süre de tam iki katına çıkardı. 1,06 üssü, mesafe uzadıkça temponun bir miktar düştüğünü anlatır: mesafe iki katına çıktığında süre 2<sup>1,06</sup> = 2,085 katına çıkar, yani tempo yaklaşık yüzde 4 yavaşlar. Bu oran, farklı mesafelerdeki rekorlar ve çok sayıda amatör sonucu incelenerek bulunmuş bir ortalamadır.`,
    ] },
    { h: 'Çözümlü örnek: 10 km süresinden maraton', p: [
      `10 kilometreyi 50:00'da koşan birinin maraton tahminini hesaplayalım. Mesafe oranı 42,195 ÷ 10 = 4,2195'tir. Bu sayının 1,06'ncı kuvveti yaklaşık 4,6002 eder. Bilinen süre 3.000 saniye olduğundan tahmin 3.000 × 4,6002 = 13.801 saniye, yani <strong>3:50:01</strong> olur.`,
      `Bu süre için gereken ortalama tempo 13.801 ÷ 42,195 = 327 saniye, yani 5:27 dk/km'dir. 10 kilometredeki 5:00 dk/km tempoya göre kilometrede 27 saniyelik bir yavaşlama öngörülmektedir. Aynı girdiyle yarı maraton tahmini 1:50:19, 5 kilometre tahmini ise 23:59 çıkar; kısa mesafede formül daha hızlı bir tempo bekler.`,
    ] },
    { h: 'Yorgunluk katsayısı ne zaman değiştirilir?', p: [
      `1,06 değeri iyi antrenmanlı koşucuların ortalamasıdır. Uygulamada pek çok amatör, özellikle maratonda, bu tahminden yavaş kalır; çünkü haftalık kilometresi düşük olan koşucuda dayanıklılık, hızın ima ettiği düzeyde değildir. Böyle durumlarda 1,07–1,10 arası bir katsayı daha gerçekçi sonuç verir. Yukarıdaki örnekte katsayı 1,08 alınırsa maraton tahmini 3:56:44'e çıkar; yalnızca 0,02'lik fark yaklaşık yedi dakika demektir.`,
      `Kendi katsayınızı bulmak mümkündür: aynı dönemde koştuğunuz iki farklı mesafenin sonuçlarını deneyin ve kısa yarıştan yapılan tahmin uzun yarışın gerçek süresine denk gelene kadar katsayıyı ayarlayın. Çok güçlü dayanıklılığı olan ultra koşucularında 1,05'in altı, hızı iyi ama dayanıklılığı zayıf koşucularda 1,10'un üstü görülebilir.`,
    ] },
    { h: 'Tahminin güvenilir olması için', ul: [
      `<strong>Yakın tarihli sonuç kullanın.</strong> Altı aydan eski bir derece bugünkü formunuzu yansıtmayabilir.`,
      `<strong>Tüm gücünüzle koşulmuş bir süre girin.</strong> Antrenman koşusu ya da sohbet temposundaki süre tahmini olduğundan yavaş çıkarır.`,
      `<strong>Mesafeleri birbirine yakın tutun.</strong> Yarı maratondan maraton tahmini, 5 kilometreden maraton tahminine göre çok daha isabetlidir.`,
      `<strong>Hedef mesafeye hazırlanmış olun.</strong> Formül, maraton için gereken uzun koşuları ve haftalık hacmi tamamladığınızı varsayar.`,
      `<strong>Koşulları karşılaştırın.</strong> Serin havada düz parkurda koşulan 10 kilometre ile sıcak ve tepelik bir maraton aynı kefeye konamaz.`,
    ] },
    { h: 'Tahmini yarış planına dönüştürmek', p: [
      `Tahmin edilen süreyi doğrudan hedef olarak almak yerine bir aralık olarak düşünmek daha sağlıklıdır. İlk maratonunuzsa tahmine yüzde 3–5 eklemek ve yarışın ilk yarısını "Gereken tempo" satırındaki değerden biraz yavaş koşmak, son 10 kilometrede duvara çarpma riskini azaltır. Deneyimli koşucular tahmini tempoyu uzun antrenmanların son bölümlerinde deneyerek sürdürülebilir olup olmadığını sınar.`,
      `Türkiye'deki büyük şehir maratonlarının bir kısmında köprü geçişleri, rampalar ve sahil rüzgârı tempoyu etkiler; parkur profilini önceden incelemek ve hedefi buna göre birkaç dakika esnetmek mantıklıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Riegel formülü yaklaşık 1,5 kilometre ile maraton arasındaki mesafeler için geliştirilmiştir; birkaç dakikadan kısa süren koşularda ve çok uzun ultra mesafelerde isabeti düşer. Yaş, cinsiyet, antrenman geçmişi, beslenme stratejisi ve yarış günü koşulları hesaba katılmaz. Sonuç bir olasılık tahminidir, garanti değildir.`,
      `Uzun mesafe koşusu vücuda ciddi yük bindirir. Maraton ya da yarı maraton hazırlığına başlamadan önce, özellikle kalp-damar rahatsızlığı öykünüz ya da kronik bir hastalığınız varsa hekim kontrolünden geçmeniz önerilir.`,
    ] },
  ],
  faq: [
    ['10 km sürem 50 dakika, maratonu kaç saatte bitiririm?', `Riegel formülü standart katsayıyla 3:50:01 tahmin eder. Bu, maratona özgü hazırlığı tamamladığınız varsayımına dayanır; haftalık kilometreniz düşükse 3:55–4:05 aralığı daha gerçekçi olabilir.`],
    ['Yarı maraton süremi ikiyle çarpsam maraton sürem çıkar mı?', `Hayır, bu fazla iyimser olur. Formüle göre süre iki katın yaklaşık yüzde 4 fazlasıdır. 1:45:00 yarı maraton için maraton tahmini 3:30:00 değil 3:38:55'tir; çoğu amatörde fark daha da büyüktür.`],
    ['Riegel formülü ne kadar doğru?', `İyi antrenmanlı koşucularda ve birbirine yakın mesafelerde genellikle yüzde birkaç hata payıyla tutar. Kısa mesafeden maraton tahmininde ve dayanıklılık antrenmanı eksik koşucularda iyimser kalma eğilimindedir.`],
    ['Yorgunluk katsayısını kaç almalıyım?', `Emin değilseniz 1,06'da bırakın. İlk maratonunuza hazırlanıyorsanız ya da haftada 50 kilometrenin altında koşuyorsanız 1,08 civarı daha temkinli bir tahmin verir.`],
    ['Antrenman koşumun süresini girebilir miyim?', `Girebilirsiniz ama tahmin yavaş çıkar. Formül, girilen sürenin o mesafedeki en iyi eforunuz olduğunu varsayar. Yarış ya da zamanlı deneme sonucu kullanmak en doğrusudur.`],
    ['Maratondan daha uzun mesafeler için kullanılabilir mi?', `Hesap yapılır, ancak ultra mesafelerde yürüyüş molaları, beslenme, arazi ve gece koşusu gibi etkenler devreye girdiğinden sonuç kaba bir fikir olmaktan öteye geçmez.`],
    ['Gereken tempo satırı ne anlama geliyor?', `Tahmini süreye ulaşmak için hedef mesafe boyunca kilometre başına korumanız gereken ortalama tempodur. Yarışta saatinize bu değeri hedef olarak ayarlayabilirsiniz.`],
    ['Yarış sürelerim kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz hiçbir bilgi sunucuya gönderilmez.`],
  ],
  related: ['kosu-temposu-hesapla', 'kosu-hiz-bolgeleri-hesapla', 'vo2-max-hesapla', 'kosu-kalori-hesapla', 'maksimum-nabiz-hesapla'],
};
