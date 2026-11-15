export default {
  slug: 'kilo-alma-kalori-hesapla',
  title: 'Kilo Alma İçin Kalori Hesaplama',
  pageTitle: 'Kilo Alma İçin Kalori Hesaplama – Günde Kaç Kalori Almalı?',
  description: 'Kilo almak için günde kaç kalori almanız gerektiğini hesaplayın. Haftalık hedefinize göre kalori fazlasını ve hedef kiloya ulaşma süresini görün.',
  card: 'Kilo almak için günlük kalori hedefinizi, gereken kalori fazlasını ve hedef kiloya ulaşma süresini hesaplayın.',
  category: 'saglik',
  keywords: ['kilo alma kalori hesaplama', 'kilo almak için kaç kalori', 'kalori fazlası hesaplama', 'sağlıklı kilo alma', 'haftada kaç kilo alınır', 'kilo alma süresi', 'bulk kalori hesaplama'],
  lead: 'Kilonuzu koruduğunuz kalori miktarını ve hedefinizi yazın; araç <strong>kilo almak için günde kaç kalori</strong> almanız gerektiğini, bunun için gereken kalori fazlasını ve hedef kilonuza yaklaşık ne kadar sürede ulaşacağınızı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'ihtiyac', label: 'Günlük kalori ihtiyacı (kcal)', type: 'number', placeholder: 'Örn. 2500', hint: 'Kilonuzu koruduğunuz kalori. Binlik ayraç kullanmayın (2500 yazın).' },
    { id: 'mevcut', label: 'Mevcut kilo (kg)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'hedef', label: 'Hedef kilo (kg)', type: 'number', placeholder: 'Örn. 65' },
    { id: 'hiz', label: 'Haftalık kilo artışı hedefi', type: 'select', options: [
      ['0.25', 'Haftada 0,25 kg (yavaş, kontrollü)'],
      ['0.5', 'Haftada 0,5 kg (orta)'],
      ['0.75', 'Haftada 0,75 kg (hızlı)'],
      ['1', 'Haftada 1 kg (çok hızlı)'],
    ] },
  ],
  compute(v, h) {
    const ihtiyac = h.pos(v.ihtiyac, 'Günlük kalori ihtiyacı');
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    if (ihtiyac < 800 || ihtiyac > 10000) h.err('Günlük kalori ihtiyacı 800 ile 10.000 kcal arasında olmalı; binlik ayraç kullanmadan yazın (2500).');
    if (mevcut < 30 || mevcut > 300) h.err('Mevcut kilo 30 ile 300 kg arasında olmalı.');
    if (hedef > 400) h.err('Hedef kilo 400 kg\'dan büyük olamaz.');
    if (hedef <= mevcut) h.err('Hedef kilo mevcut kilodan büyük olmalı. Kilo vermek için "Kalori Açığı ve Kilo Verme Süresi Hesaplama" aracını kullanın.');
    const hizlar = { '0.25': 0.25, '0.5': 0.5, '0.75': 0.75, '1': 1 };
    const hiz = hizlar[v.hiz] || 0.25;
    const KG = 7700;
    const fazla = hiz * KG / 7;
    const kilo = hedef - mevcut;
    const hafta = kilo / hiz;
    const gun = Math.max(1, Math.ceil(hafta * 7 - 1e-9));
    return {
      rows: [
        ['Günlük alınması gereken kalori', h.fmt(ihtiyac + fazla, 0) + ' kcal'],
        ['Günlük kalori fazlası', h.fmt(fazla, 0) + ' kcal'],
        ['Alınacak kilo', h.fmt(kilo, 1) + ' kg'],
        ['Tahmini süre', `${h.fmt(gun, 0)} gün (yaklaşık ${h.fmt(hafta, 1)} hafta)`],
        ['Toplam kalori fazlası', h.fmt(kilo * KG, 0) + ' kcal'],
        ['Fazlanın ihtiyaca oranı', '%' + h.fmt(fazla / ihtiyac * 100, 1)],
      ],
      note: (hiz >= 0.75 ? 'Hızlı kilo artışında alınan kilonun daha büyük bölümü yağ olur; kas kazanımı hedefleniyorsa daha yavaş bir hız seçin. ' : '')
        + '1 kg vücut ağırlığı yaklaşık 7700 kcal kabul edildi; gerçek artış kişiden kişiye değişir.',
    };
  },
  cases: [
    { in: { ihtiyac: '2500', mevcut: '60', hedef: '65', hiz: '0.25' }, out: { 'Günlük alınması gereken kalori': '2.775 kcal', 'Günlük kalori fazlası': '275 kcal', 'Alınacak kilo': '5 kg', 'Tahmini süre': '140 gün (yaklaşık 20 hafta)', 'Toplam kalori fazlası': '38.500 kcal', 'Fazlanın ihtiyaca oranı': '%11' } },
    { in: { ihtiyac: '2200', mevcut: '55', hedef: '60', hiz: '0.5' }, out: { 'Günlük alınması gereken kalori': '2.750 kcal', 'Günlük kalori fazlası': '550 kcal', 'Tahmini süre': '70 gün (yaklaşık 10 hafta)', 'Fazlanın ihtiyaca oranı': '%25' } },
    { in: { ihtiyac: '3000', mevcut: '70', hedef: '76', hiz: '0.5' }, out: { 'Günlük alınması gereken kalori': '3.550 kcal', 'Alınacak kilo': '6 kg', 'Tahmini süre': '84 gün (yaklaşık 12 hafta)', 'Toplam kalori fazlası': '46.200 kcal' } },
    { in: { ihtiyac: '2000', mevcut: '50', hedef: '53', hiz: '0.75' }, out: { 'Günlük alınması gereken kalori': '2.825 kcal', 'Günlük kalori fazlası': '825 kcal', 'Tahmini süre': '28 gün (yaklaşık 4 hafta)' } },
    { in: { ihtiyac: '2400', mevcut: '62', hedef: '64', hiz: '1' }, out: { 'Günlük alınması gereken kalori': '3.500 kcal', 'Günlük kalori fazlası': '1.100 kcal', 'Tahmini süre': '14 gün (yaklaşık 2 hafta)' } },
    { in: { ihtiyac: '2600', mevcut: '68', hedef: '70,5', hiz: '0.25' }, out: { 'Günlük alınması gereken kalori': '2.875 kcal', 'Alınacak kilo': '2,5 kg', 'Tahmini süre': '70 gün (yaklaşık 10 hafta)' } },
    { in: { ihtiyac: '2500', mevcut: '65', hedef: '60', hiz: '0.5' }, error: true },
    { in: { ihtiyac: '', mevcut: '60', hedef: '65', hiz: '0.5' }, error: true },
    { in: { ihtiyac: '2.500', mevcut: '60', hedef: '65', hiz: '0.5' }, error: true },
  ],
  howto: [
    'Kilonuzun sabit kaldığı günlük kalori miktarını "Günlük kalori ihtiyacı" alanına yazın. Bilmiyorsanız önce günlük kalori ihtiyacı hesaplayıcısını kullanın.',
    'Mevcut kilonuzu ve ulaşmak istediğiniz hedef kiloyu kilogram olarak girin.',
    'Haftada ne kadar kilo almak istediğinizi listeden seçin. Emin değilseniz en yavaş seçenekle başlayın.',
    '"Hesapla" düğmesine basın. İlk satır günlük almanız gereken toplam kaloriyi, ikinci satır ihtiyacınızın üzerine eklemeniz gereken fazlayı gösterir.',
    'Süre satırından hedefinize yaklaşık kaç gün ve hafta kaldığını okuyun.',
  ],
  sections: [
    { h: 'Kilo almak için neden kalori fazlası gerekir?', p: [
      'Vücut ağırlığı uzun vadede enerji dengesiyle belirlenir. Harcadığınız kadar enerji alırsanız kilonuz sabit kalır; daha azını alırsanız kilo verir, daha fazlasını alırsanız kilo alırsınız. Kilo almak isteyen biri için hedef, günlük kalori ihtiyacının üzerine düzenli ve ölçülü bir <strong>kalori fazlası</strong> eklemektir.',
      'Zayıf kişilerin sık yaşadığı sorun, çok yediğini düşünmesine karşın gerçekte ihtiyacı kadar ya da daha azını almasıdır. Öğün atlamak, iştahın çabuk kapanması ve yüksek hareketlilik bu duruma yol açar. Sayıya dökmek bu yüzden işe yarar: hedef kaloriyi bildiğinizde gün içinde ne kadar eksik kaldığınızı görebilirsiniz.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Araç, bir kilogram vücut ağırlığının yaklaşık 7700 kilokaloriye karşılık geldiği kabulünü kullanır. Haftalık hedefinize göre günlük fazla şöyle bulunur: <strong>günlük fazla = haftalık hedef (kg) × 7700 ÷ 7</strong>. Günlük hedef kalori ise ihtiyaç ile bu fazlanın toplamıdır. Süre, alınacak kilonun haftalık hedefe bölünmesiyle hesaplanır.',
    ], ul: [
      '<strong>Haftada 0,25 kg:</strong> günde 275 kcal fazla',
      '<strong>Haftada 0,5 kg:</strong> günde 550 kcal fazla',
      '<strong>Haftada 0,75 kg:</strong> günde 825 kcal fazla',
      '<strong>Haftada 1 kg:</strong> günde 1100 kcal fazla',
    ] },
    { h: 'Çözümlü örnek', p: [
      '60 kg ağırlığında, hedefi 65 kg olan ve kilosunu günde 2500 kcal ile koruyan birini ele alalım. Haftada 0,25 kg hedefi seçildiğinde günlük fazla 0,25 × 7700 ÷ 7 = <strong>275 kcal</strong> olur; günlük hedef 2500 + 275 = <strong>2775 kcal</strong>\'dir. Alınacak 5 kg için süre 5 ÷ 0,25 = 20 hafta, yani 140 gündür. Toplam fazla 5 × 7700 = 38.500 kcal eder ve günlük fazla, ihtiyacın %11\'ine denk gelir.',
      'Aynı kişi haftada 0,5 kg hedeflerse günlük fazla 550 kcal\'ye, hedef 3050 kcal\'ye çıkar; süre 10 haftaya iner. Süre yarıya düşer ama alınan kilonun içindeki yağ payı büyük olasılıkla artar.',
    ] },
    { h: 'Hangi hızı seçmeli?', p: [
      'Vücudun belli bir sürede yapabileceği kas miktarı sınırlıdır. Kalori fazlası bu sınırın çok üzerine çıktığında artan enerji yağ olarak depolanır. Bu nedenle amaç yalnızca tartıdaki sayıyı büyütmek değil de kas kütlesini artırmaksa, direnç antrenmanıyla birlikte küçük bir fazla (günde yaklaşık 250–500 kcal) genellikle daha uygundur. Antrenmana yeni başlayanlar görece hızlı ilerleyebilir; deneyimli sporcularda kas kazanımı yavaşladığı için daha küçük fazlalar tercih edilir.',
      'Hastalık sonrası toparlanma ya da belirgin düşük kiloluluk gibi durumlarda daha hızlı artış hedeflenebilir; ancak bu durumlarda planı hekim ve diyetisyen belirlemelidir. Araç, haftada 0,75 kg ve üzeri hedeflerde sonuç notunda yağlanma konusunda uyarı gösterir.',
    ] },
    { h: 'Kaloriyi artırmanın pratik yolları', ul: [
      'Öğün sayısını artırın: üç ana öğüne iki üç ara öğün eklemek, porsiyonları büyütmekten çoğu zaman daha kolaydır.',
      'Enerji yoğun ama besleyici seçeneklerden yararlanın: kuruyemiş ve ezmeleri, zeytinyağı, tahin, pekmez, kuru meyve, tam yağlı süt ürünleri, yumurta.',
      'Sıvı kalori kullanın: süt, ayran, meyveli yoğurt karışımları iştahı kapatmadan kalori ekler.',
      'Yemeklere bir yemek kaşığı zeytinyağı eklemek tek başına yaklaşık 100 kcal sağlar.',
      'Yeterli protein alın ve haftada birkaç gün direnç egzersizi yapın; fazlanın kasa yönelmesine bu ikisi yardımcı olur.',
      'Haftada bir, aynı gün ve saatte tartılın. İki üç hafta boyunca artış yoksa günlük hedefi 100–200 kcal yükseltin.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      '7700 kcal kuralı bir yaklaşımdır. Kilo aldıkça vücudun enerji ihtiyacı da artar; ayrıca bazı kişilerde fazla beslenmeyle birlikte istem dışı hareketlilik ve ısı üretimi yükselir, bu da beklenen artışı yavaşlatır. İlk günlerde tartıdaki hızlı yükseliş çoğunlukla su ve sindirim içeriğidir. Bu nedenle hesaplanan süreyi bir öngörü olarak görün ve birkaç haftalık eğilime göre ayarlama yapın.',
      'İstem dışı kilo kaybı, iştahsızlık, sindirim sorunları ya da tiroit hastalığı gibi bir neden varsa önce bunun değerlendirilmesi gerekir. Bu araç bilgilendirme amaçlıdır; tıbbi tanı ya da tedavi önerisi değildir. Kronik hastalığınız varsa ya da çocuklar ve gençler için plan yapıyorsanız hekime ve diyetisyene danışın.',
    ] },
  ],
  faq: [
    ['Kilo almak için günde kaç kalori almalıyım?', 'Günlük kalori ihtiyacınızın üzerine bir fazla eklemeniz gerekir. Haftada 0,25 kg için yaklaşık 275 kcal, 0,5 kg için yaklaşık 550 kcal fazla hesaplanır. İhtiyacı 2500 kcal olan biri için bu 2775 ya da 3050 kcal demektir.'],
    ['1 kilo almak için kaç kalori gerekir?', 'Yaklaşık 7700 kcal\'lik toplam fazla 1 kg vücut ağırlığına karşılık gelir. Bu miktarı bir haftaya yayarsanız günde 1100 kcal, bir aya yayarsanız günde yaklaşık 257 kcal fazla gerekir.'],
    ['Haftada kaç kilo almak sağlıklıdır?', 'Çoğu yetişkin için haftada 0,25 ile 0,5 kg arası artış makul kabul edilir. Daha hızlı artışta alınan kilonun daha büyük kısmı yağ olur.'],
    ['Çok yiyorum ama kilo alamıyorum, neden?', 'Çoğu zaman alınan kalori sanıldığından düşüktür ya da gün içi hareketlilik yüksektir. Birkaç gün boyunca yediklerinizi tartarak kaydetmek gerçek alımı gösterir. Açıklanamayan zayıflık varsa hekime başvurun.'],
    ['Kilo alırken sadece kas alabilir miyim?', 'Tümüyle kas almak pratikte mümkün değildir; bir miktar yağ artışı olağandır. Küçük kalori fazlası, yeterli protein ve düzenli direnç antrenmanı kas payını artırır.'],
    ['Abur cuburla kilo almak olur mu?', 'Kalori fazlası her kaynaktan kilo aldırır, ancak şeker ve doymuş yağ ağırlıklı beslenme kan yağları ve genel sağlık açısından sakıncalıdır. Fazlayı besleyici, enerji yoğun gıdalardan karşılamak daha doğrudur.'],
    ['Hedefe ulaşınca ne yapmalıyım?', 'Yeni kilonuzdaki kalori ihtiyacınızı yeniden hesaplayın ve fazlayı kaldırarak o değere geçin. Eski alışkanlıklara dönmek kilonun geri gitmesine yol açabilir.'],
    ['Bilgilerim bir yere kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kalori ve kilo değerleriniz sunucuya gönderilmez.'],
  ],
  related: ['kalori-hesapla', 'kalori-acigi-hesapla', 'bazal-metabolizma-hesapla', 'protein-ihtiyaci-hesapla', 'makro-besin-hesapla', 'ideal-kilo-hesapla'],
};
