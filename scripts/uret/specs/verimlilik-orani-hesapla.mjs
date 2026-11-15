export default {
  slug: 'verimlilik-orani-hesapla',
  title: 'Verimlilik Oranı Hesaplama',
  h1Tail: 'çıktı ÷ girdi',
  pageTitle: 'Verimlilik Oranı Hesaplama – Çıktı/Girdi ve Standarda Göre Yüzde',
  description: 'Elde edilen çıktıyı kullanılan girdiye bölerek verimliliği hesaplayın; standart ya da hedef değer girerek verimlilik yüzdesini ve hedeften sapmayı görün.',
  card: 'Çıktıyı girdiye bölerek verimliliği bulun; standart değere göre verimlilik yüzdesini ve farkı görün.',
  category: 'finans',
  keywords: ['verimlilik oranı hesaplama', 'verimlilik hesaplama', 'verimlilik formülü', 'iş gücü verimliliği', 'üretim verimliliği', 'çıktı girdi oranı', 'saat başına üretim', 'verimlilik yüzdesi'],
  lead: 'Bir ekibin, makinenin ya da sürecin kullandığı kaynağa karşılık ne kadar iş çıkardığını ölçün. Araç <strong>verimliliği (çıktı ÷ girdi)</strong> hesaplar; standart bir değer girerseniz gerçekleşen verimliliğin standardın yüzde kaçı olduğunu ve aradaki farkı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'cikti', label: 'Elde edilen çıktı', type: 'number', placeholder: 'Örn. 480', hint: 'Üretilen adet, tamamlanan iş, satış tutarı gibi.' },
    { id: 'girdi', label: 'Kullanılan girdi', type: 'number', placeholder: 'Örn. 40', hint: 'Çalışma saati, kişi sayısı, makine saati, hammadde kg gibi.' },
    { id: 'standart', label: 'Standart verimlilik (birim girdi başına çıktı)', type: 'number', placeholder: 'İsteğe bağlı, örn. 15', hint: 'Hedeflenen ya da olağan kabul edilen değer.', wide: true },
  ],
  compute(v, h) {
    const cikti = h.nonneg(v.cikti, 'Elde edilen çıktı');
    const girdi = h.pos(v.girdi, 'Kullanılan girdi');
    const ver = cikti / girdi;
    const rows = [['Verimlilik (birim girdi başına çıktı)', h.fmt(ver, 4)]];
    if (cikti > 0) rows.push(['Birim çıktı başına girdi', h.fmt(girdi / cikti, 4)]);
    let note = 'Sonucun birimi, yazdığınız çıktı ve girdinin birimlerine bağlıdır (örneğin adet/saat). Tek başına bir sayı, ancak aynı işin başka bir dönemiyle ya da bir standartla karşılaştırıldığında anlam kazanır.';
    if (String(v.standart ?? '').trim() !== '') {
      const st = h.pos(v.standart, 'Standart verimlilik');
      const beklenen = st * girdi;
      const oran = ver / st * 100;
      const fark = cikti - beklenen;
      rows.push(['Verimlilik oranı (standarda göre)', '%' + h.fmt(oran, 2)]);
      rows.push(['Standarda göre beklenen çıktı', h.fmt(beklenen, 2)]);
      rows.push(['Çıktı farkı', (fark > 0 && Number(fark.toFixed(2)) !== 0 ? '+' : '') + h.fmt(fark, 2)]);
      rows.push(['Bu çıktı için standart girdi', h.fmt(cikti / st, 2)]);
      if (oran > 100 + 1e-9) note = 'Gerçekleşen verimlilik standardın üzerinde. Sürekli yüksek çıkıyorsa standardı güncellemek gerekebilir.';
      else if (oran < 100 - 1e-9) note = 'Gerçekleşen verimlilik standardın altında. Farkın nedeni duruşlar, malzeme beklemeleri, hatalı üretim ya da gerçekçi olmayan bir standart olabilir.';
      else note = 'Gerçekleşen verimlilik standartla aynı.';
    }
    return { rows, note };
  },
  cases: [
    { in: { cikti: '480', girdi: '40', standart: '15' }, out: { 'Verimlilik (birim girdi başına çıktı)': '12', 'Birim çıktı başına girdi': '0,0833', 'Verimlilik oranı (standarda göre)': '%80', 'Standarda göre beklenen çıktı': '600', 'Çıktı farkı': '-120', 'Bu çıktı için standart girdi': '32' } },
    { in: { cikti: '1200', girdi: '8' }, out: { 'Verimlilik (birim girdi başına çıktı)': '150', 'Birim çıktı başına girdi': '0,0067' } },
    { in: { cikti: '660', girdi: '40', standart: '15' }, out: { 'Verimlilik (birim girdi başına çıktı)': '16,5', 'Verimlilik oranı (standarda göre)': '%110', 'Çıktı farkı': '+60', 'Bu çıktı için standart girdi': '44' } },
    { in: { cikti: '90', girdi: '7,5', standart: '12' }, out: { 'Verimlilik (birim girdi başına çıktı)': '12', 'Verimlilik oranı (standarda göre)': '%100', 'Çıktı farkı': '0' } },
    { in: { cikti: '0', girdi: '10', standart: '5' }, out: { 'Verimlilik (birim girdi başına çıktı)': '0', 'Verimlilik oranı (standarda göre)': '%0', 'Çıktı farkı': '-50' } },
    { in: { cikti: '250000', girdi: '160' }, out: { 'Verimlilik (birim girdi başına çıktı)': '1.562,5', 'Birim çıktı başına girdi': '0,0006' } },
    { in: { cikti: '45', girdi: '60', standart: '1' }, out: { 'Verimlilik (birim girdi başına çıktı)': '0,75', 'Birim çıktı başına girdi': '1,3333', 'Verimlilik oranı (standarda göre)': '%75', 'Standarda göre beklenen çıktı': '60' } },
    { in: { cikti: '480', girdi: '0' }, error: true },
    { in: { cikti: '-3', girdi: '40' }, error: true },
    { in: { cikti: '480', girdi: '40', standart: '0' }, error: true },
  ],
  howto: [
    '"Elde edilen çıktı" alanına dönem içinde ortaya çıkan sonucu yazın: üretilen parça sayısı, paketlenen koli, kapatılan destek talebi, yapılan satış tutarı gibi.',
    '"Kullanılan girdi" alanına bu çıktıyı elde etmek için harcanan kaynağı yazın: toplam çalışma saati, makine saati, kişi sayısı ya da tüketilen hammadde.',
    'Karşılaştırma yapmak istiyorsanız birim girdi başına beklenen çıktıyı "Standart verimlilik" alanına girin; örneğin saat başına 15 adet.',
    '"Hesapla" düğmesine basın. Verimlilik değeri ve standart girdiyseniz verimlilik yüzdesi, beklenen çıktı ve fark listelenir.',
  ],
  sections: [
    { h: 'Verimlilik nedir?', p: [
      'Verimlilik, elde edilen çıktının bu çıktı için kullanılan girdiye oranıdır: <strong>Verimlilik = Çıktı ÷ Girdi</strong>. Aynı kaynakla daha fazla üretmek ya da aynı üretimi daha az kaynakla yapmak verimliliği artırır. Kavram çok geniştir; girdinin ne olduğuna göre farklı adlar alır.',
    ], ul: [
      '<strong>İş gücü verimliliği:</strong> Çalışılan saat ya da kişi başına üretim. Örneğin saat başına 12 adet.',
      '<strong>Makine verimliliği:</strong> Makine çalışma saati başına üretim.',
      '<strong>Malzeme verimliliği:</strong> Kullanılan hammadde başına elde edilen ürün; kilogram un başına kaç ekmek gibi.',
      '<strong>Enerji verimliliği:</strong> Tüketilen kilovatsaat başına üretim.',
      '<strong>Sermaye verimliliği:</strong> Yatırılan para başına elde edilen satış ya da katma değer.',
    ] },
    { h: 'Verimlilik oranı: standarda göre yüzde', p: [
      'Tek başına "saatte 12 adet" bilgisi iyi mi kötü mü olduğunu söylemez. Bunu anlamak için bir karşılaştırma değeri gerekir: geçmiş ortalama, zaman etüdüyle belirlenmiş standart, makinenin katalog kapasitesi ya da yönetimin koyduğu hedef. Verimlilik oranı, gerçekleşen değerin bu standarda bölünmesiyle bulunur: <strong>Verimlilik oranı = Gerçekleşen verimlilik ÷ Standart verimlilik × 100</strong>.',
      'Aynı oran iki başka biçimde de yazılabilir ve üçü de aynı sonucu verir: gerçekleşen çıktının standarda göre beklenen çıktıya oranı ya da bu çıktı için standartta gereken girdinin fiilen kullanılan girdiye oranı. Oran %100 ise iş tam standartta, üzerindeyse standarttan iyi, altındaysa standarttan kötü yapılmıştır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir dikim bandında beş kişi sekiz saatlik vardiyada toplam 40 saat çalışmış ve 480 gömlek dikmiş olsun. Verimlilik 480 ÷ 40 = saat başına 12 gömlektir. Tersinden bakıldığında bir gömlek 40 ÷ 480 = 0,0833 saat, yani 5 dakika tutmuştur.',
      'İşletmenin standardı saat başına 15 gömlek ise 40 saatte beklenen üretim 15 × 40 = 600 gömlektir. Verimlilik oranı 12 ÷ 15 = %80 çıkar; bant standardın 120 gömlek gerisinde kalmıştır. Başka bir açıdan, 480 gömlek standart hızda 480 ÷ 15 = 32 saatte dikilebilirdi; fazladan 8 saat harcanmıştır. Aynı değerleri araca girdiğinizde bu sonuçları görürsünüz.',
    ] },
    { h: 'Verimlilik, etkinlik ve kârlılık farkı', p: [
      'Bu üç kavram gündelik dilde birbirinin yerine kullanılsa da aynı şey değildir. <strong>Verimlilik</strong> kaynağın ne kadar iyi kullanıldığına bakar. <strong>Etkinlik</strong> hedefe ulaşılıp ulaşılmadığına bakar: çok verimli biçimde yanlış ürünü üretmek etkin değildir. <strong>Kârlılık</strong> ise fiyatları da hesaba katar; verimlilik artarken hammadde fiyatı yükseliyorsa kâr düşebilir.',
      'Benzer biçimde, yalnızca tek bir girdiye göre ölçülen kısmi verimlilik yanıltabilir. Yeni bir makine alındığında iş gücü verimliliği yükselir, ama bunun karşılığında sermaye girdisi artmıştır. Kararlarınızı tek bir orana değil, en önemli iki üç girdinin birlikte seyrine dayandırın.',
    ] },
    { h: 'Doğru ölçüm için ipuçları', ul: [
      'Çıktıyı yalnızca sağlam ve teslim edilebilir üretim olarak sayın; hatalı ya da yeniden işlenen ürünleri dahil etmek verimliliği yapay biçimde yükseltir.',
      'Girdiyi tutarlı tanımlayın: ücretli saat mi, fiilen çalışılan saat mi? Molalar, toplantılar ve duruşlar dahil mi? Dönemler arasında aynı tanımı kullanın.',
      'Farklı ürünleri adetle toplamayın. Yapım süreleri farklı ürünlerde çıktıyı standart saat ya da parasal değer cinsinden ifade edin.',
      'Parasal çıktı kullanıyorsanız fiyat artışlarını ayıklayın; yoksa enflasyon verimlilik artışı gibi görünür.',
      'Çok kısa dönemler rastlantısal dalgalanma içerir; haftalık ya da aylık ortalamalarla çalışmak daha sağlıklıdır.',
    ] },
    { h: 'Verimliliği artırmanın yolları ve sınırlar', p: [
      'Kayıpların çoğu çalışma hızından değil, beklemelerden kaynaklanır: malzeme bekleme, ayar ve model değişimi, arıza, onay bekleme, eksik bilgi. Bu duruşları kaydetmek çoğu zaman en büyük iyileştirme fırsatını gösterir. İş akışını sadeleştirmek, tekrarlayan işleri otomatikleştirmek, çalışanları eğitmek ve ekipmanın düzenli bakımını yapmak da kalıcı etki sağlar.',
      'Verimlilik rakamını bireysel baskı aracına dönüştürmek, kaliteden ödün verilmesine ve iş güvenliği risklerine yol açabilir. Standartları gerçekçi belirleyin ve sonucu kalite göstergeleriyle birlikte okuyun. Bu araç genel bir oran hesabı yapar; ücret, prim ve kadro kararları için tek başına yeterli bir ölçü değildir.',
    ] },
  ],
  faq: [
    ['Verimlilik oranı nasıl hesaplanır?', 'Önce çıktı girdiye bölünerek verimlilik bulunur. Sonra bu değer standart verimliliğe bölünüp 100 ile çarpılır. 40 saatte 480 adet üretildiyse verimlilik 12 adet/saattir; standart 15 ise oran %80 olur.'],
    ['Verimlilik oranı %100\'ü geçebilir mi?', 'Evet. Standart, ulaşılabilecek en yüksek değer değil, beklenen değerdir. Standardın üzerinde üretim yapıldığında oran %100\'ü aşar. Oran sürekli yüksek çıkıyorsa standardın düşük belirlenmiş olması mümkündür.'],
    ['Standart verimliliği bilmiyorsam ne yazmalıyım?', 'Alanı boş bırakabilirsiniz; araç yalnızca çıktı/girdi oranını verir. Karşılaştırma için geçmiş birkaç ayın ortalamasını ya da en iyi dönemin değerini standart olarak kullanmak iyi bir başlangıçtır.'],
    ['Çıktı ve girdi için hangi birimleri kullanmalıyım?', 'Ölçmek istediğiniz şeye bağlıdır. İş gücü verimliliği için adet ve çalışma saati, satış ekibi için ciro ve kişi sayısı, malzeme verimliliği için ürün ağırlığı ve hammadde ağırlığı kullanılabilir. Sonucun birimi çıktı biriminin girdi birimine bölümüdür.'],
    ['Verimlilik ile verim (randıman) aynı mı?', 'Yakın ama farklı kullanılır. Verim ya da randıman genellikle aynı birimdeki malzeme giriş çıkışını yüzde olarak ifade eder ve %100\'ü geçemez. Verimlilik ise farklı birimlerdeki çıktı ve girdiyi oranlar; saatte adet gibi.'],
    ['Hizmet işlerinde verimlilik nasıl ölçülür?', 'Çıktıyı sayılabilir bir sonuçla tanımlayın: çözülen destek talebi, tamamlanan teslimat, kesilen fatura, muayene edilen araç. Girdi çoğunlukla çalışma saatidir. Kaliteyi de izlemek için müşteri memnuniyeti ya da hata oranı gibi ikinci bir gösterge ekleyin.'],
    ['"Bu çıktı için standart girdi" satırı ne anlama gelir?', 'Elde ettiğiniz çıktının standart hızda ne kadar girdiyle üretilebileceğini gösterir. Fiilen kullandığınız girdi bundan fazlaysa aradaki fark boşa giden kaynaktır.'],
    ['Girdiğim üretim verileri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['fire-orani-hesapla', 'calisan-basi-ciro-hesapla', 'doluluk-orani-hesapla', 'birim-maliyet-hesapla', 'yuzde-hesapla'],
};
