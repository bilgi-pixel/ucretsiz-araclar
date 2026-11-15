export default {
  slug: 'elektrikli-arac-menzil-hesapla',
  title: 'Elektrikli Araç Menzil Hesaplama',
  h1Tail: 'batarya ve tüketimden km',
  pageTitle: 'Elektrikli Araç Menzil Hesaplama – Bataryayla Kaç Km Gider?',
  description: 'Batarya kapasitesi, tüketim ve şarj yüzdesinden elektrikli aracınızın kaç kilometre gideceğini hesaplayın; kış ve otoyol için ek tüketim payı ekleyin.',
  card: 'Batarya kapasitesi, tüketim ve şarj yüzdesinden elektrikli aracın tahmini menzilini kilometre olarak bulun.',
  category: 'gunluk',
  keywords: ['elektrikli araç menzil hesaplama', 'elektrikli araba kaç km gider', 'menzil hesaplama', 'kWh menzil', 'batarya menzil hesabı', 'kWh/100 km', 'kışın elektrikli araç menzili'],
  lead: `Bataryanızın kullanılabilir kapasitesini, aracın ortalama tüketimini ve mevcut şarj yüzdesini yazın; araç <strong>tahmini menzili</strong> kilometre olarak verir. Varışta bırakmak istediğiniz rezervi ve soğuk hava ya da otoyol için ek tüketim payını da hesaba katabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Kullanılabilir batarya kapasitesi (kWh)', type: 'number', placeholder: 'Örn. 60', hint: 'Brüt değil net (kullanılabilir) kapasiteyi yazın.' },
    { id: 'tuketim', label: 'Ortalama tüketim (kWh/100 km)', type: 'number', placeholder: 'Örn. 16' },
    { id: 'sarj', label: 'Mevcut şarj (%)', type: 'number', value: '100' },
    { id: 'rezerv', label: 'Varışta kalacak rezerv (%)', type: 'number', value: '0', hint: 'Güvenlik payı olarak bırakmak istediğiniz şarj.' },
    { id: 'ek', label: 'Ek tüketim payı (%)', type: 'number', value: '0', hint: 'Soğuk hava, otoyol hızı, klima, yük gibi koşullar için; yoksa 0.' },
  ],
  compute(v, h) {
    const kap = h.pos(v.kapasite, 'Kullanılabilir batarya kapasitesi');
    const tuk = h.pos(v.tuketim, 'Ortalama tüketim');
    const sarj = h.opt(v.sarj, 100, 'Mevcut şarj');
    const rez = h.opt(v.rezerv, 0, 'Varışta kalacak rezerv');
    const ek = h.opt(v.ek, 0, 'Ek tüketim payı');
    if (kap > 1000) h.err('"Kullanılabilir batarya kapasitesi" kWh olarak girilmeli; değer çok yüksek görünüyor.');
    if (tuk > 200) h.err('"Ortalama tüketim" 100 km için kWh olarak girilmeli; Wh/km değerini 10\'a bölerek yazın.');
    if (sarj <= 0 || sarj > 100) h.err('"Mevcut şarj" 0 ile 100 arasında olmalı.');
    if (rez < 0 || rez >= 100) h.err('"Varışta kalacak rezerv" 0 ile 100 arasında olmalı.');
    if (rez >= sarj) h.err('Rezerv, mevcut şarjdan küçük olmalı; aksi halde kullanılabilecek enerji kalmaz.');
    if (ek < -50 || ek > 300) h.err('"Ek tüketim payı" −50 ile 300 arasında olmalı.');
    const etkin = tuk * (1 + ek / 100);
    const enerji = kap * (sarj - rez) / 100;
    const menzil = enerji / etkin * 100;
    return {
      rows: [
        ['Tahmini menzil', h.fmt(menzil, 1) + ' km'],
        ['Kullanılabilecek enerji', h.fmt(enerji, 2) + ' kWh'],
        ['Etkin tüketim', h.fmt(etkin, 2) + ' kWh/100 km'],
        ['Tam şarjla menzil (%100 → %0)', h.fmt(kap / etkin * 100, 1) + ' km'],
        ['Her %1 şarj ile gidilen yol', h.fmt(kap / etkin, 2) + ' km'],
        ['1 kWh ile gidilen yol', h.fmt(100 / etkin, 2) + ' km'],
      ],
      note: 'Menzil = kullanılabilecek enerji ÷ tüketim × 100. Gerçek menzil hıza, sıcaklığa, eğime, lastiklere ve batarya yaşına göre değişir; sonuç tahmindir.',
    };
  },
  cases: [
    { in: { kapasite: '60', tuketim: '16', sarj: '100', rezerv: '0', ek: '0' }, out: { 'Tahmini menzil': '375 km', 'Kullanılabilecek enerji': '60 kWh', '1 kWh ile gidilen yol': '6,25 km', 'Her %1 şarj ile gidilen yol': '3,75 km' } },
    { in: { kapasite: '60', tuketim: '16', sarj: '80', rezerv: '10', ek: '0' }, out: { 'Tahmini menzil': '262,5 km', 'Kullanılabilecek enerji': '42 kWh', 'Tam şarjla menzil (%100 → %0)': '375 km' } },
    { in: { kapasite: '75', tuketim: '18', sarj: '100', rezerv: '10', ek: '25' }, out: { 'Tahmini menzil': '300 km', 'Etkin tüketim': '22,5 kWh/100 km', 'Tam şarjla menzil (%100 → %0)': '333,3 km' } },
    { in: { kapasite: '50', tuketim: '15', sarj: '90', rezerv: '20', ek: '0' }, out: { 'Tahmini menzil': '233,3 km', 'Kullanılabilecek enerji': '35 kWh' } },
    { in: { kapasite: '77', tuketim: '17,5' }, out: { 'Tahmini menzil': '440 km' } },
    { in: { kapasite: '40', tuketim: '20', sarj: '50', rezerv: '10', ek: '20' }, out: { 'Tahmini menzil': '66,7 km', 'Kullanılabilecek enerji': '16 kWh', 'Etkin tüketim': '24 kWh/100 km' } },
    { in: { kapasite: '60', tuketim: '16', sarj: '10', rezerv: '10', ek: '0' }, error: true },
    { in: { kapasite: '60', tuketim: '0', sarj: '100', rezerv: '0', ek: '0' }, error: true },
    { in: { kapasite: '60', tuketim: '16', sarj: '120', rezerv: '0', ek: '0' }, error: true },
  ],
  howto: [
    `Aracınızın kullanılabilir (net) batarya kapasitesini kWh olarak yazın; bu değer araç belgelerinde ya da gösterge ekranındaki enerji bilgilerinde yer alır.`,
    `Yol bilgisayarındaki uzun dönem ortalama tüketimi kWh/100 km olarak girin. Aracınız Wh/km gösteriyorsa değeri 10'a bölün.`,
    `Mevcut şarj yüzdesini ve varışta güvenlik payı olarak kalmasını istediğiniz rezervi belirtin.`,
    `Kış koşulları, yüksek otoyol hızı ya da dolu bagaj gibi durumlar için "Ek tüketim payı" alanına bir yüzde yazın.`,
    `"Hesapla" düğmesine basın; ilk satır planlamada kullanacağınız menzili gösterir.`,
  ],
  sections: [
    { h: 'Menzil nasıl hesaplanır?', p: [
      `Elektrikli araçta menzil hesabı, içten yanmalı araçtaki "depo ÷ tüketim" mantığının aynısıdır; yalnızca litre yerine kilovatsaat (kWh) kullanılır. Batarya bir enerji deposudur ve kapasitesi kWh ile ölçülür. Tüketim ise aracın 100 kilometrede harcadığı enerjidir ve kWh/100 km olarak ifade edilir. Formül şudur: <strong>menzil (km) = kullanılabilecek enerji (kWh) ÷ tüketim (kWh/100 km) × 100</strong>.`,
      `Kullanılabilecek enerji, bataryanın tamamı olmak zorunda değildir. Yola yüzde 80 şarjla çıkıp varışta yüzde 10 bırakmak istiyorsanız elinizde kapasitenin yüzde 70'i vardır. Araç bu farkı kendisi hesaplar: <strong>enerji = kapasite × (mevcut şarj − rezerv) ÷ 100</strong>. Ek tüketim payı girildiğinde tüketim o oranda artırılır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> Kullanılabilir kapasitesi 60 kWh, ortalama tüketimi 16 kWh/100 km olan bir araç tam şarjla 60 ÷ 16 × 100 = <strong>375 km</strong> gider. Bu araç her kilovatsaatle 6,25 km, her yüzde 1 şarjla 3,75 km yol alır.`,
      `<strong>Örnek 2:</strong> Aynı araçla yüzde 80 şarjla yola çıkıp varışta yüzde 10 bırakmak isterseniz kullanılabilecek enerji 60 × 0,70 = 42 kWh olur; menzil 42 ÷ 16 × 100 = <strong>262,5 km</strong>'ye iner. Şehirler arası yolculuklarda hızlı şarj molaları çoğunlukla bu aralıkta planlanır, çünkü bataryanın son yüzde 20'lik kısmı belirgin biçimde daha yavaş dolar.`,
      `<strong>Örnek 3:</strong> 75 kWh bataryalı, 18 kWh/100 km tüketen bir araçla kışın otoyolda yüzde 25 ek tüketim öngörelim ve yüzde 10 rezerv bırakalım. Etkin tüketim 18 × 1,25 = 22,5 kWh/100 km, enerji 75 × 0,90 = 67,5 kWh olur; menzil 67,5 ÷ 22,5 × 100 = <strong>300 km</strong> çıkar.`,
    ] },
    { h: 'Brüt ve net kapasite farkı', p: [
      `Üreticiler bataryanın ömrünü korumak için kapasitenin küçük bir bölümünü kullanıma kapatır. Bataryanın toplam kapasitesine brüt, sürücünün gerçekten kullanabildiği kısma net ya da kullanılabilir kapasite denir. Menzil hesabında her zaman net değer kullanılmalıdır; brüt değerle yapılan hesap menzili olduğundan uzun gösterir.`,
      `Batarya zamanla kapasite kaybeder. Birkaç yıl kullanılmış bir araçta gerçek kullanılabilir kapasite, fabrika değerinin bir miktar altındadır. Aracınızın batarya sağlık durumu (SoH) bilgisi varsa kapasiteyi bu oranla çarparak girmeniz sonucu gerçeğe yaklaştırır.`,
    ] },
    { h: 'Menzili etkileyen koşullar', ul: [
      `<strong>Hız:</strong> hava direnci hızın karesiyle arttığı için otoyol hızlarında tüketim şehir içine göre belirgin biçimde yükselir. İçten yanmalı araçların tersine elektrikli araçlar şehir içinde daha verimlidir.`,
      `<strong>Sıcaklık:</strong> soğuk havada batarya verimi düşer ve kabin ısıtması doğrudan bataryadan enerji çeker. Isı pompası olan araçlarda kayıp daha azdır.`,
      `<strong>Eğim ve yük:</strong> yokuş çıkarken tüketim artar; inişte geri kazanımlı frenleme enerjinin bir kısmını geri verir ama tamamını değil.`,
      `<strong>Lastik ve jant:</strong> geniş ve büyük jantlı lastikler, düşük lastik basıncı ve kış lastikleri yuvarlanma direncini artırır.`,
      `<strong>Rüzgâr ve yağış:</strong> karşıdan esen rüzgâr ve ıslak zemin tüketimi yükseltir.`,
    ] },
    { h: 'Ek tüketim payını nasıl seçmeli?', p: [
      `Bu alan için tek bir doğru değer yoktur; araç modeline, hıza ve hava koşullarına göre değişir. En güvenilir yöntem kendi aracınızın verisini kullanmaktır: yol bilgisayarınızın yaz ve kış aylarındaki ya da şehir içi ve otoyol yolculuklarındaki ortalama tüketimlerini karşılaştırın ve aradaki yüzde farkını bu alana yazın. Veriniz yoksa ilk planlamada temkinli davranıp yüksek bir pay seçmek ve yüzde 10–15 rezerv bırakmak, şarj istasyonu aralıklarının uzun olduğu güzergâhlarda sizi yolda kalmaktan korur.`,
      `Alana negatif değer de yazılabilir: sürekli düşük hızda, ılıman havada yapılan yolculuklarda tüketim ortalamanın altına inebilir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Hesap, tüketimin yol boyunca sabit kaldığını varsayar ve yol profilini, trafik durumunu ya da şarj sırasındaki kayıpları modellemez. Resmî test döngülerinde (WLTP gibi) açıklanan menzil değerleri de belirli koşullara göre ölçülür; günlük kullanımda çoğu zaman bu değerin altında kalınır. Sonuç planlama amaçlı bir tahmindir; uzun yolculuklarda aracınızın kendi menzil göstergesini ve güzergâhtaki şarj noktalarını ayrıca kontrol edin.`,
    ] },
  ],
  faq: [
    ['Elektrikli araç menzili nasıl hesaplanır?', `Kullanılabilir batarya enerjisi (kWh) ortalama tüketime (kWh/100 km) bölünüp 100 ile çarpılır. 60 kWh batarya ve 16 kWh/100 km tüketimle menzil 375 km'dir.`],
    ['Aracım Wh/km gösteriyor, nasıl girmeliyim?', `Wh/km değerini 10'a bölerek kWh/100 km'ye çevirin. Örneğin 160 Wh/km, 16 kWh/100 km'ye eşittir.`],
    ['Kışın menzil ne kadar düşer?', `Düşüş araca, sıcaklığa ve ısıtma sistemine göre değişir; kesin bir oran vermek doğru olmaz. Kendi aracınızın kış aylarındaki ortalama tüketimini yaz ortalamasıyla karşılaştırıp farkı "Ek tüketim payı" alanına yazabilirsiniz.`],
    ['Neden yüzde 100 yerine yüzde 80 şarj öneriliyor?', `Birçok üretici günlük kullanımda bataryayı tam doldurmamayı önerir ve hızlı şarjda son yüzde 20'lik bölüm yavaş dolar. Aracınız için önerilen günlük şarj sınırını kullanım kılavuzundan öğrenin.`],
    ['Hesaplanan menzil ile aracın gösterdiği menzil neden farklı?', `Araçlar menzil tahminini son sürüşlerdeki tüketime, sıcaklığa ve bazen güzergâha göre sürekli günceller. Bu sayfa ise girdiğiniz sabit ortalama tüketimi kullanır.`],
    ['Rezerv alanı ne işe yarar?', `Varışta bataryada kalmasını istediğiniz güvenlik payıdır. Yüzde 10 rezerv yazarsanız menzil, şarjın yüzde 10'a düştüğü noktaya kadar hesaplanır.`],
    ['Bu hesap şarj maliyetini de veriyor mu?', `Hayır, yalnızca mesafeyi hesaplar. Şarj gideri için elektrikli araç şarj maliyeti aracını kullanabilirsiniz.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya iletilmez.`],
  ],
  related: ['elektrikli-arac-sarj-maliyeti-hesapla', 'sarj-suresi-hesapla', 'kilometre-maliyeti-hesapla', 'kwh-joule-cevir', 'yakit-tuketimi-hesapla'],
};
