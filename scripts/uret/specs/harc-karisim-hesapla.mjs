export default {
  slug: 'harc-karisim-hesapla',
  title: 'Harç Karışımı Hesaplama',
  h1Tail: 'çimento, kum, kireç',
  pageTitle: 'Harç Karışımı Hesaplama – Çimento, Kum ve Kireç Miktarı',
  description: 'Harç hacmini ve karışım oranını girin; gereken çimento kilosunu, torba sayısını, kum ve kireç hacmini, yaklaşık su miktarını anında hesaplayın.',
  card: 'Harç hacmi ve karışım oranına göre çimento torbası, kum, kireç ve yaklaşık su miktarını hesaplayın.',
  category: 'insaat',
  keywords: ['harç karışımı hesaplama', 'harç oranı', '1 m3 harç kaç torba çimento', 'çimento kum oranı', 'duvar harcı hesaplama', 'sıva harcı oranı', 'kireçli harç hesaplama', 'harç için kum miktarı'],
  lead: `Hazırlayacağınız harcın hacmini ve <strong>çimento : kireç : kum</strong> oranını yazın; araç gereken çimentoyu kilogram ve torba olarak, kumu ve kireci metreküp ve litre olarak, karma suyunu da yaklaşık litre olarak verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'hacim', label: 'Harç hacmi (m³)', type: 'number', placeholder: 'Örn. 1', hint: 'Yerine konmuş, ıslak harç hacmi.' },
    { id: 'cimentoPay', label: 'Çimento payı', type: 'number', value: '1' },
    { id: 'kumPay', label: 'Kum payı', type: 'number', value: '4' },
    { id: 'kirecPay', label: 'Kireç payı (yoksa 0)', type: 'number', value: '0' },
    { id: 'katsayi', label: 'Kuru hacim katsayısı', type: 'number', value: '1,33', hint: 'Kuru malzemenin ıslak harca oranı; genellikle 1,25–1,35.' },
    { id: 'torba', label: 'Torba ağırlığı (kg)', type: 'number', value: '50' },
    { id: 'suOran', label: 'Su / çimento oranı', type: 'number', value: '0,5', hint: 'Ağırlıkça; kıvama göre değişir.' },
  ],
  compute(v, h) {
    const hacim = h.pos(v.hacim, 'Harç hacmi');
    const c = h.pos(v.cimentoPay, 'Çimento payı');
    const k = h.pos(v.kumPay, 'Kum payı');
    const l = h.nonneg(v.kirecPay, 'Kireç payı');
    const kat = h.pos(v.katsayi, 'Kuru hacim katsayısı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const su = h.nonneg(v.suOran, 'Su / çimento oranı');
    if (kat < 1 || kat > 2) h.err('Kuru hacim katsayısı 1 ile 2 arasında olmalı (genellikle 1,25–1,35).');
    const YOGUNLUK = 1440; // gevşek dökme çimento, kg/m³
    const kuru = hacim * kat;
    const toplam = c + k + l;
    const cimM3 = kuru * c / toplam;
    const kumM3 = kuru * k / toplam;
    const kirecM3 = kuru * l / toplam;
    const cimKg = cimM3 * YOGUNLUK;
    const adet = Math.ceil(cimKg / torba - 1e-9);
    const rows = [
      ['Çimento', h.fmt(cimKg, 1) + ' kg'],
      ['Çimento torbası', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
      ['Kum', `${h.fmt(kumM3, 3)} m³ (${h.fmt(kumM3 * 1000, 0)} litre)`],
    ];
    if (l > 0) rows.push(['Kireç', `${h.fmt(kirecM3, 3)} m³ (${h.fmt(kirecM3 * 1000, 0)} litre)`]);
    rows.push(['Kuru karışım hacmi', h.fmt(kuru, 3) + ' m³']);
    rows.push(['Yaklaşık su', h.fmt(cimKg * su, 0) + ' litre']);
    return {
      rows,
      note: 'Oranlar hacimce alınır. Çimentonun gevşek yığın yoğunluğu 1.440 kg/m³ kabul edilmiştir; kumun nemi ve tane yapısı sonucu değiştirebilir.',
    };
  },
  cases: [
    { in: { hacim: '1', cimentoPay: '1', kumPay: '4' }, out: { 'Çimento': '383 kg', 'Çimento torbası': '8 torba (50 kg)', 'Kum': '1,064 m³ (1.064 litre)', 'Kuru karışım hacmi': '1,33 m³' } },
    { in: { hacim: '1', cimentoPay: '1', kumPay: '6' }, out: { 'Çimento': '273,6 kg', 'Çimento torbası': '6 torba (50 kg)', 'Kum': '1,14 m³ (1.140 litre)', 'Yaklaşık su': '137 litre' } },
    { in: { hacim: '2', cimentoPay: '1', kumPay: '5' }, out: { 'Çimento': '638,4 kg', 'Çimento torbası': '13 torba (50 kg)', 'Kum': '2,217 m³ (2.217 litre)' } },
    { in: { hacim: '2', cimentoPay: '1', kumPay: '6', kirecPay: '1' }, out: { 'Çimento': '478,8 kg', 'Çimento torbası': '10 torba (50 kg)', 'Kum': '1,995 m³ (1.995 litre)' } },
    { in: { hacim: '0,25', cimentoPay: '1', kumPay: '3', katsayi: '1,3', torba: '25' }, out: { 'Çimento': '117 kg', 'Çimento torbası': '5 torba (25 kg)', 'Kuru karışım hacmi': '0,325 m³' } },
    { in: { hacim: '1', cimentoPay: '1', kumPay: '3', katsayi: '1', suOran: '0' }, out: { 'Çimento': '360 kg', 'Kum': '0,75 m³ (750 litre)', 'Yaklaşık su': '0 litre' } },
    { in: { hacim: '', cimentoPay: '1', kumPay: '4' }, error: true },
    { in: { hacim: '1', cimentoPay: '1', kumPay: '0' }, error: true },
    { in: { hacim: '1', cimentoPay: '1', kumPay: '4', katsayi: '0,8' }, error: true },
  ],
  howto: [
    `"Harç hacmi" alanına ihtiyacınız olan ıslak harç miktarını metreküp olarak yazın. Duvar, sıva ya da şap için bu hacmi önce alan × kalınlık çarpımıyla bulabilirsiniz.`,
    `Çimento, kum ve varsa kireç paylarını girin. 1:4 karışım için çimento payına 1, kum payına 4 yazmanız yeterlidir; kireç kullanmıyorsanız kireç payını 0 bırakın.`,
    `Kuru hacim katsayısını, torba ağırlığını ve su / çimento oranını gerekiyorsa değiştirin. Emin değilseniz hazır gelen değerlerle devam edin.`,
    `"Hesapla" düğmesine basın. Çimento kilosu, yukarı yuvarlanmış torba sayısı, kum ve kireç hacmi ile yaklaşık su miktarı listelenir.`,
    `Sonucu kopyalayıp malzeme sipariş listenize ekleyin; şantiyedeki dökülme ve artık payı için bir miktar fazlasını almayı unutmayın.`,
  ],
  sections: [
    { h: 'Harç oranı ne anlama gelir?', p: [
      `Harç, bağlayıcı (çimento, bazen kireç), kum ve suyun karıştırılmasıyla elde edilir. Şantiyede söylenen "bire dört" ya da "1:4" ifadesi, bir ölçü çimentoya dört ölçü kum konduğunu anlatır. Ölçü kabı kova, el arabası ya da kürek olabilir; önemli olan her malzemenin aynı kapla ölçülmesidir. Bu yüzden oranlar <strong>hacimce</strong> kabul edilir ve bu araç da hesabı hacim üzerinden yapar.`,
      `Kireçli (melez) harçlarda oran üç sayıyla yazılır: çimento : kireç : kum. Örneğin 1:1:6, bir ölçü çimento, bir ölçü sönmüş kireç ve altı ölçü kum demektir. Kireç harcın işlenebilirliğini ve su tutma yeteneğini artırır, ancak dayanımı bir miktar düşürür.`,
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      `Kuru haldeki kum ve çimento su ile karıştırıldığında taneler arasındaki boşluklar dolar ve toplam hacim küçülür. Bu nedenle 1 m³ ıslak harç elde etmek için 1 m³'ten fazla kuru malzeme gerekir. Uygulamada bu fark <strong>kuru hacim katsayısı</strong> ile karşılanır; yaygın kabul 1,25 ile 1,35 arasıdır ve araçta varsayılan değer 1,33'tür.`,
      `Formül şöyledir: kuru hacim = harç hacmi × katsayı. Çimento hacmi = kuru hacim × çimento payı ÷ payların toplamı. Kum ve kireç hacmi de aynı yolla bulunur. Çimento torbayla satıldığı için hacim, gevşek yığın yoğunluğu olan yaklaşık 1.440 kg/m³ ile çarpılarak kilograma çevrilir ve torba ağırlığına bölünüp yukarı yuvarlanır.`,
    ] },
    { h: 'Çözümlü örnek: 1 m³ harç, 1:4 oran', p: [
      `Bir metreküp 1:4 harç için kuru hacim 1 × 1,33 = 1,33 m³ olur. Payların toplamı 1 + 4 = 5'tir. Çimento hacmi 1,33 × 1 ÷ 5 = 0,266 m³, kum hacmi 1,33 × 4 ÷ 5 = 1,064 m³ çıkar. Çimento ağırlığı 0,266 × 1.440 = 383 kg eder; 50 kilogramlık torbadan 383 ÷ 50 = 7,66, yani <strong>8 torba</strong> almak gerekir. Su / çimento oranı 0,5 alındığında karma suyu yaklaşık 192 litredir.`,
      `Aynı hacim 1:6 oranla hazırlanırsa payların toplamı 7 olur: çimento 1,33 ÷ 7 = 0,19 m³, yani 273,6 kg ve 6 torba; kum ise 1,14 m³ çıkar. Görüldüğü gibi oran zayıfladıkça çimento azalır, kum artar.`,
    ] },
    { h: 'Hangi işte hangi oran kullanılır?', p: [
      `Aşağıdaki değerler şantiyelerde sık karşılaşılan genel alışkanlıklardır; kesin oran projeye, kullanılan çimento sınıfına ve malzeme üreticisinin önerisine göre belirlenir.`,
    ], ul: [
      `<strong>1:3</strong> – güçlü harç; su ile temas eden yüzeyler, kaba sıvanın ilk katı, tamir işleri.`,
      `<strong>1:4</strong> – genel amaçlı sıva ve taşıyıcı olmayan duvar örgüsü için yaygın oran.`,
      `<strong>1:5 ve 1:6</strong> – bölme duvar örgüsü, dolgu ve tesviye işleri gibi dayanım beklentisi düşük uygulamalar.`,
      `<strong>1:1:6 ve 1:2:9</strong> – kireçli harçlar; işlenebilirliğin önemli olduğu tuğla örgüsü ve iç sıvalar.`,
    ] },
    { h: 'Kum hacmini kova ve el arabasıyla ölçmek', p: [
      `Araç kumu hem metreküp hem litre olarak verir, çünkü şantiyede ölçü çoğunlukla kovayla yapılır. Standart bir inşaat kovası yaklaşık 10–12 litre, bir el arabası ise modeline göre 60–90 litre alır. 1.064 litre kum, 12 litrelik kovayla yaklaşık 89 kova demektir. Kendi kabınızın hacmini bir kez suyla ölçüp not ederseniz hesap çok daha güvenilir olur.`,
      `Nemli kum kabarır; aynı ağırlıktaki kum nemliyken kuru haline göre daha fazla yer kaplar. Yağmur sonrası açıkta kalmış kumla çalışıyorsanız ölçü kabını biraz taşkın doldurmak ya da kum miktarını bir miktar artırmak gerekebilir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Islak harç hacmini doğrudan paylara bölmek: kuru hacim katsayısı unutulursa malzeme yaklaşık dörtte bir oranında eksik gelir.`,
      `Çimentoyu torba, kumu kürek sayarak karıştırmak: farklı kaplarla ölçülen oran gerçekte tutmaz.`,
      `Suyu göz kararı fazla koymak: fazla su harcı kolay işlenir yapar ama dayanımı düşürür ve çatlamayı artırır.`,
      `Fire payı bırakmamak: taşıma, dökülme ve kapta kalan harç için yüzde 5–10 fazlasını hesaba katmak yerinde olur.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Sonuçlar keşif ve malzeme siparişi için yaklaşık değerlerdir. Çimentonun yığın yoğunluğu, kumun tane dağılımı ve nemi, karıştırma yöntemi sonucu etkiler. Taşıyıcı duvarlar, deprem güvenliğini ilgilendiren elemanlar ve projeli işler için harç sınıfı ile karışım oranı mutlaka inşaat mühendisi tarafından belirlenmeli, yürürlükteki standart ve şartnameler esas alınmalıdır. Hazır kuru harç kullanıyorsanız ambalaj üzerindeki sarfiyat değerine uyun.`,
    ] },
  ],
  faq: [
    ['1 m³ harç için kaç torba çimento gerekir?', `Orana bağlıdır. Kuru hacim katsayısı 1,33 alındığında 1:3 için yaklaşık 479 kg (10 torba), 1:4 için 383 kg (8 torba), 1:5 için 319 kg (7 torba) ve 1:6 için 274 kg (6 torba) çimento gerekir. Torba sayıları 50 kilogramlık torbaya göre yukarı yuvarlanmıştır.`],
    ['Kuru hacim katsayısı neden 1,33?', `Kum ve çimento suyla karıştığında taneler arasındaki boşluklar dolar ve hacim azalır. 1 m³ ıslak harç için yaklaşık 1,25–1,35 m³ kuru malzeme gerektiği kabul edilir; 1,33 bu aralıkta sık kullanılan bir değerdir. Kumunuz çok inceyse ya da tecrübeniz farklı bir değer gösteriyorsa alanı değiştirebilirsiniz.`],
    ['Oranlar ağırlıkça mı, hacimce mi?', `Bu araçta ve şantiye pratiğinde oranlar hacimcedir; yani bir kova çimentoya dört kova kum gibi düşünülür. Ağırlıkça oranla çalışıyorsanız malzemelerin yoğunluklarını hesaba katarak hacme çevirmeniz gerekir.`],
    ['Su miktarı neden yaklaşık veriliyor?', `Gereken su, kumun nemine, tane inceliğine, hava sıcaklığına ve istenen kıvama göre değişir. Araç, çimento ağırlığını su / çimento oranıyla çarparak bir başlangıç değeri verir. Suyu azar azar ekleyip kıvamı gözle kontrol etmek en doğru yoldur.`],
    ['25 kilogramlık torba kullanıyorum, hesabı nasıl uyarlarım?', `"Torba ağırlığı" alanına 25 yazmanız yeterlidir. Çimento kilosu değişmez, yalnızca torba sayısı yeni ağırlığa göre yukarı yuvarlanarak yeniden hesaplanır.`],
    ['Harç hacmini nasıl bulurum?', `Sıva ve şap için alan ile kalınlığı çarpın: 50 m² yüzeye 2 cm sıva, 50 × 0,02 = 1 m³ harç eder. Duvar örgüsünde harç, toplam duvar hacminin derz kalınlığına ve tuğla boyutuna bağlı bir bölümüdür; kaba bir tahmin için duvar hacminin dörtte biri ile üçte biri arası alınır.`],
    ['Kireç eklemek zorunlu mu?', `Hayır. Kireç, harcın daha yumuşak ve kolay işlenir olmasını sağlar, ancak zorunlu değildir. Kullanmıyorsanız kireç payını 0 bırakın; sonuçta kireç satırı gösterilmez.`],
    ['Girdiğim değerler kaydediliyor mu?', `Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız ölçüler hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['cimento-hesapla', 'siva-hesapla', 'sap-hesapla', 'tugla-hesapla', 'kum-cakil-hesapla', 'beton-hesapla'],
};
