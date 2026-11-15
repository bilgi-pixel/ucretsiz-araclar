export default {
  slug: 'kumas-metraj-hesapla',
  title: 'Kumaş Metrajı Hesaplama',
  h1Tail: 'kaç metre kumaş gerekir?',
  pageTitle: 'Kumaş Metrajı Hesaplama – Kaç Metre Kumaş Almalıyım?',
  description: 'Kesilecek parça ölçüsü, adet, dikiş payı ve kumaş enine göre kaç metre kumaş gerektiğini hesaplayın. Parçaların kumaşa yerleşimini ve fire oranını da gösterir.',
  card: 'Parça ölçüsü, adet ve kumaş enini yazın; dikiş payı dahil kaç metre kumaş almanız gerektiğini ve yerleşimi görün.',
  category: 'gunluk',
  keywords: ['kumaş metraj hesaplama', 'kaç metre kumaş gerekir', 'kumaş hesaplama', 'masa örtüsü kaç metre kumaş', 'yastık kılıfı kumaş hesabı', 'kumaş eni 140', 'dikiş payı hesaplama'],
  lead: 'Aynı ölçüde keseceğiniz dikdörtgen parçaların enini, boyunu ve adedini, alacağınız kumaşın enini ve dikiş payını yazın. Araç parçaları kumaşın enine yan yana dizer, kaç sıra gerektiğini bulur ve topdan kestirmeniz gereken <strong>uzunluğu metre olarak</strong> verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'parcaEn', label: 'Parça eni (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'parcaBoy', label: 'Parça boyu (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'adet', label: 'Parça adedi', type: 'number', value: '1' },
    { id: 'kumasEni', label: 'Kumaş eni (cm)', type: 'number', value: '140', hint: 'Topun üzerinde yazar; yaygın enler 90, 140, 150, 160, 180, 240 ve 280 cm\'dir.' },
    { id: 'pay', label: 'Dikiş / kıvırma payı (cm, her kenara)', type: 'number', value: '1,5' },
    { id: 'dondur', label: 'Parça yan çevrilebilir mi?', type: 'select', options: [['hayir', 'Hayır – desen ya da tüy yönü var'], ['evet', 'Evet – düz renk, yön önemsiz']] },
    { id: 'cekme', label: 'Çekme payı (%)', type: 'number', value: '0', hint: 'Yıkamada çeken pamuklu ve ketenlerde %3–5 ekleyin.' },
  ],
  compute(v, h) {
    const en = h.pos(v.parcaEn, 'Parça eni');
    const boy = h.pos(v.parcaBoy, 'Parça boyu');
    const adet = h.posint(v.adet, 'Parça adedi');
    const ke = h.pos(v.kumasEni, 'Kumaş eni');
    const pay = h.nonneg(h.opt(v.pay, 0, 'Dikiş payı'), 'Dikiş payı');
    const cekme = h.nonneg(h.opt(v.cekme, 0, 'Çekme payı'), 'Çekme payı');
    if (cekme > 30) h.err('Çekme payı %30\'dan büyük olamaz.');
    const pe = en + 2 * pay, pb = boy + 2 * pay;
    const dene = (w, l) => {
      const n = Math.floor(ke / w + 1e-9);
      if (n < 1) return null;
      const sira = Math.ceil(adet / n - 1e-9);
      return { n, sira, uzun: sira * l };
    };
    const duz = dene(pe, pb);
    const yan = v.dondur === 'evet' ? dene(pb, pe) : null;
    let sec = duz, cevrik = false;
    if (yan && (!duz || yan.uzun < duz.uzun - 1e-9)) { sec = yan; cevrik = true; }
    if (!sec) {
      h.err(v.dondur === 'evet'
        ? 'Parça, payları ile birlikte kumaş enine hiçbir yönde sığmıyor; daha enli kumaş seçin ya da parçayı ekleyerek dikmeyi planlayın.'
        : `Parçanın paylı eni (${h.fmt(pe, 1)} cm) kumaş eninden büyük; daha enli kumaş seçin ya da yön önemli değilse parçayı yan çevirmeye izin verin.`);
    }
    const net = sec.uzun * (1 + cekme / 100);
    const al = Math.ceil(net / 10 - 1e-9) / 10;
    const fireOran = (1 - (adet * pe * pb) / (ke * sec.uzun)) * 100;
    return {
      rows: [
        ['Gerekli kumaş', h.fmt(net / 100, 2) + ' m'],
        ['Satın alınacak (10 cm\'e yuvarlanmış)', h.fmt(al, 1) + ' m'],
        ['Yerleşim', `Enine ${sec.n} parça × ${sec.sira} sıra (${cevrik ? 'yan çevrilmiş' : 'düz'})`],
        ['Paylı kesim ölçüsü', `${h.fmt(pe, 1)} × ${h.fmt(pb, 1)} cm`],
        ['Kullanılan kumaş alanı', h.fmt(ke * net / 10000, 2) + ' m²'],
        ['Artan kumaş (fire)', '%' + h.fmt(Math.max(0, fireOran), 1)],
      ],
      note: 'Parça boyu kumaşın boyuna (kenar örgüsüne paralel) yerleştirilir. Hesap aynı ölçüde dikdörtgen parçalar içindir; kalıplı giysi parçalarında pastal planına göre değişir.',
    };
  },
  cases: [
    { in: { parcaEn: '40', parcaBoy: '40', adet: '12', kumasEni: '140', pay: '2', dondur: 'hayir', cekme: '0' }, out: { 'Gerekli kumaş': '1,76 m', 'Satın alınacak (10 cm\'e yuvarlanmış)': '1,8 m', 'Yerleşim': 'Enine 3 parça × 4 sıra (düz)', 'Paylı kesim ölçüsü': '44 × 44 cm', 'Artan kumaş (fire)': '%5,7' } },
    { in: { parcaEn: '50', parcaBoy: '70', adet: '4', kumasEni: '140', pay: '1,5', dondur: 'evet', cekme: '0' }, out: { 'Gerekli kumaş': '1,46 m', 'Satın alınacak (10 cm\'e yuvarlanmış)': '1,5 m', 'Yerleşim': 'Enine 2 parça × 2 sıra (düz)' } },
    { in: { parcaEn: '80', parcaBoy: '30', adet: '4', kumasEni: '150', pay: '0', dondur: 'evet', cekme: '0' }, out: { 'Gerekli kumaş': '0,8 m', 'Yerleşim': 'Enine 5 parça × 1 sıra (yan çevrilmiş)' } },
    { in: { parcaEn: '80', parcaBoy: '30', adet: '4', kumasEni: '150', pay: '0', dondur: 'hayir', cekme: '0' }, out: { 'Gerekli kumaş': '1,2 m', 'Yerleşim': 'Enine 1 parça × 4 sıra (düz)' } },
    { in: { parcaEn: '160', parcaBoy: '220', adet: '1', kumasEni: '180', pay: '2', dondur: 'hayir', cekme: '0' }, out: { 'Gerekli kumaş': '2,24 m', 'Satın alınacak (10 cm\'e yuvarlanmış)': '2,3 m', 'Kullanılan kumaş alanı': '4,03 m²' } },
    { in: { parcaEn: '40', parcaBoy: '40', adet: '12', kumasEni: '140', pay: '2', dondur: 'hayir', cekme: '5' }, out: { 'Gerekli kumaş': '1,85 m', 'Satın alınacak (10 cm\'e yuvarlanmış)': '1,9 m' } },
    { in: { parcaEn: '200', parcaBoy: '100', adet: '1', kumasEni: '140', pay: '1', dondur: 'hayir' }, error: true },
    { in: { parcaEn: '40', parcaBoy: '40', adet: '0', kumasEni: '140' }, error: true },
    { in: { parcaEn: '40', parcaBoy: '', adet: '2', kumasEni: '140' }, error: true },
  ],
  howto: [
    'Bitmiş parçanın enini ve boyunu santimetre olarak yazın; boy, kumaşın uzunluğu yönünde duracak kenardır.',
    'Kaç adet keseceğinizi ve kumaşın enini girin. Kumaş eni topun etiketinde ya da satıcının fiyat kartında yazar.',
    'Her kenara bırakacağınız dikiş ya da kıvırma payını yazın; pay istemiyorsanız 0 girin.',
    'Kumaş düz renkse ve yön fark etmiyorsa "yan çevrilebilir" seçeneğini açın; araç daha az kumaş harcayan yerleşimi seçer.',
    '"Hesapla" düğmesine basın. Gerekli metrajı, 10 santime yuvarlanmış alım miktarını ve parçaların dizilişini görün.',
  ],
  sections: [
    { h: 'Hesabın mantığı', p: [
      'Kumaş topdan satılır: eni sabittir, siz yalnızca uzunluğu belirlersiniz. Bu yüzden asıl soru "parçalarım kumaşın enine kaçar kaçar sığıyor?" sorusudur. Araç önce her parçaya dört kenardan dikiş payı ekler: <strong>kesim eni = parça eni + 2 × pay</strong>, <strong>kesim boyu = parça boyu + 2 × pay</strong>.',
      'Ardından kumaş enini kesim enine bölüp aşağı yuvarlayarak bir sıraya sığan parça sayısını bulur. Adet bu sayıya bölünüp yukarı yuvarlanınca sıra sayısı çıkar ve <strong>gerekli uzunluk = sıra sayısı × kesim boyu</strong> olur. Çekme payı girildiyse uzunluk o oranda artırılır. Kumaşçılar genellikle 10 santimlik adımlarla kestiği için sonuç ayrıca yukarı doğru 10 cm\'e yuvarlanır.',
      'Yan çevirmeye izin verildiğinde aynı hesap parça 90 derece döndürülerek tekrarlanır ve daha kısa çıkan yerleşim seçilir.',
    ] },
    { h: 'Çözümlü örnek: 12 adet peçete', p: [
      '40 × 40 cm bitmiş ölçüde 12 kumaş peçete, her kenardan 2 cm çift kıvırma payıyla dikilecek; kumaş eni 140 cm. Kesim ölçüsü 44 × 44 cm olur. 140 ÷ 44 = 3,18 olduğundan bir sıraya 3 peçete sığar. 12 ÷ 3 = 4 sıra gerekir ve uzunluk 4 × 44 = 176 cm, yani <strong>1,76 metre</strong> eder; kumaşçıdan 1,8 metre istenir. Kumaşın yaklaşık %5,7\'si artar; bu, enin sonunda kalan 8 santimlik şerittir.',
      'Aynı kumaş pamukluysa ve dikmeden önce yıkanacaksa %5 çekme payıyla 176 × 1,05 = 184,8 cm, yuvarlanmış haliyle 1,9 metre almak gerekir.',
    ] },
    { h: 'Çözümlü örnek: yan çevirmenin etkisi', p: [
      '80 cm eninde, 30 cm boyunda dört şerit (örneğin runner astarı) 150 cm enindeki düz renkli kumaştan kesilecek olsun, pay yok. Parçalar olduğu gibi yerleştirilirse 150 cm ene yalnızca bir tane sığar; dört sıra, 4 × 30 = 120 cm kumaş gider. Parçalar yan çevrilirse 30 santimlik kenar ene gelir, 150 ÷ 30 = 5 parça tek sıraya sığar ve yalnızca 80 cm kumaş yeter. Desenli, çizgili, kadife ya da saten gibi yönü belli olan kumaşlarda ise çevirmek görüntüyü bozacağı için bu tasarruf kullanılamaz.',
    ] },
    { h: 'Dikiş payı, kıvırma payı ve çekme', ul: [
      '<strong>Düz dikiş payı:</strong> ev dikişinde çoğunlukla 1–1,5 cm bırakılır.',
      '<strong>Çift kıvırma (baskı):</strong> peçete, masa örtüsü, perde eteği gibi kenarlarda kumaş iki kez katlanır; 1 cm + 1 cm kıvırma için kenar başına 2 cm, geniş etek baskılarında daha fazlası gerekir.',
      '<strong>Fermuar ve zarf kapama:</strong> yastık kılıflarında arka yüz iki parçadan oluşuyorsa bindirme payını parça ölçüsüne siz ekleyin.',
      '<strong>Çekme:</strong> pamuk, keten ve viskon ilk yıkamada boydan birkaç yüzde kısalabilir. Kumaşı kesmeden önce yıkayıp ütülemek en sağlıklısıdır; bu durumda çekme payını metraja ekleyin.',
      '<strong>Desen raporu:</strong> büyük desenli kumaşlarda parçaların desenini denk getirmek için her sıraya bir desen tekrarı kadar ek uzunluk gerekebilir; araç bunu hesaplamaz.',
    ] },
    { h: 'Kumaş enleri hakkında', p: [
      'Aynı iş için gereken metraj, kumaşın enine göre ciddi biçimde değişir. Türkiye\'de giyimlik pamuklu ve poplinler çoğunlukla 140–150 cm, astarlar 90–150 cm, döşemelik kumaşlar 140 cm, nevresimlik ve çarşaflıklar 240–280 cm, tül ve perdelikler 280–300 cm civarında satılır. Etiketteki en, kenar örgüsü (kumaşın iki yanındaki sık dokunmuş şerit) dahil ölçü olabilir; kullanılabilir en bir iki santim daha dardır. Kıl payı sığan yerleşimlerde bunu göz önünde bulundurun.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç, hepsi aynı ölçüde olan dikdörtgen parçaları ızgara düzeninde yerleştirir. Farklı ölçüde parçaları birlikte yerleştirmez, eğri kenarlı giysi kalıplarını iç içe geçirmez ve verev (çapraz) kesimi hesaplamaz. Elbise, ceket gibi kalıplı dikimlerde kalıp zarfındaki metraj tablosu ya da pastal planı esas alınmalıdır. Yuvarlak masa örtüsü gibi parçalarda çapı hem en hem boy olarak girerek dıştan saran kareyi hesaplatabilirsiniz.',
    ] },
  ],
  faq: [
    ['Kumaş metrajı nasıl hesaplanır?', 'Parçanın paylı eni kumaş enine bölünür ve bir sıraya kaç parça sığdığı bulunur. Toplam adet bu sayıya bölünüp yukarı yuvarlanır, çıkan sıra sayısı parçanın paylı boyuyla çarpılır. Sonuç santimetredir; 100\'e bölünce metre elde edilir.'],
    ['140 cm enindeki kumaştan kaç yastık kılıfı çıkar?', '50 × 70 cm yastık için 1,5 cm payla kesim ölçüsü 53 × 73 cm olur. 140 cm ene iki parça sığar. Dört parça (iki kılıfın ön ve arka yüzü) için iki sıra, yani 1,46 metre kumaş gerekir.'],
    ['Dikdörtgen masa örtüsü için kaç metre kumaş alınır?', 'Masanın ölçüsüne her kenardan istediğiniz sarkma payını ekleyip bitmiş ölçüyü bulun. 160 × 220 cm bitmiş ölçü, 2 cm kıvırma payı ve 180 cm enli kumaş için 2,24 metre gerekir; 2,3 metre alınır. Kumaş eni yetmiyorsa iki en birleştirilir ve metraj iki katına çıkar.'],
    ['Parça boyunu neden kumaş boyuna yerleştiriyoruz?', 'Dokuma kumaşlar boyuna (çözgü yönünde) daha az esner ve daha düzgün dökülür. Giysi ve perdede düşüşün düzgün olması için parçanın uzun ekseni çoğu zaman kumaş boyuna paralel kesilir. Yön önemli değilse yan çevirme seçeneğiyle tasarruf edebilirsiniz.'],
    ['Artan kumaş oranı ne anlama geliyor?', 'Satın alınan dikdörtgenin, parçalar kesildikten sonra geriye kalan kısmının yüzdesidir. Kenarda kalan dar şerit ve son sırada boş kalan yerler buna dahildir. Oran yüksekse farklı enli bir kumaşın daha verimli olup olmadığını deneyebilirsiniz.'],
    ['Neden 10 santime yuvarlanıyor?', 'Kumaşçılar genellikle 10 santimlik adımlarla ölçüp keser ve makasın biraz eğri gitmesi olağandır. Hesaplanan net uzunluğun üzerine çıkan ilk 10 cm katı, kesim hatasına karşı küçük bir güvenlik payı da sağlar.'],
    ['Desenli kumaşta ne kadar fazla almalıyım?', 'Desenin tekrar aralığına (rapor boyu) bağlıdır. Parçaların deseni yan yana tutacaksa genel kural her sıra için bir rapor boyu kadar ek almaktır. Rapor boyunu kumaş üzerinde aynı motifin iki tekrarı arasını ölçerek bulabilirsiniz.'],
    ['Yazdığım ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; ölçüleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['perde-olcusu-hesapla', 'beden-olcusu-bul', 'fire-orani-hesapla', 'cm-inc-cevir', 'duvar-kagidi-hesapla'],
};
