export default {
  slug: 'yag-yakim-bolgesi-hesapla',
  title: 'Yağ Yakım Nabız Bölgesi Hesaplama',
  h1Tail: 'yaşa göre nabız aralığı',
  pageTitle: 'Yağ Yakım Nabız Bölgesi Hesaplama – Yaşa Göre Yağ Yakma Nabzı',
  description: 'Yaşınızı girin; yağ yakım bölgesi olarak bilinen nabız aralığını (maksimum nabzın %60–70\'i) hesaplayın. Dinlenik nabız yazarsanız Karvonen aralığını da görün.',
  card: 'Yaşınıza göre yağ yakım nabız aralığınızı bulun; dinlenik nabzınızla kişiselleştirilmiş aralığı da görün.',
  category: 'saglik',
  keywords: ['yağ yakım nabzı', 'yağ yakım bölgesi hesaplama', 'yağ yakma nabız aralığı', 'kaç nabızda yağ yakılır', 'yaşa göre yağ yakım nabzı', 'kardiyo nabız aralığı', 'fat burn nabız'],
  lead: 'Koşu bandı ve akıllı saatlerde görülen "yağ yakım bölgesi", enerjinin görece büyük bölümünün yağdan karşılandığı düşük-orta yoğunluktaki nabız aralığıdır. Yaşınızı yazın; araç <strong>yağ yakım nabız aralığınızı</strong>, komşu bölgeleri ve isterseniz dinlenik nabzınıza göre kişiselleştirilmiş aralığı hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'yas', label: 'Yaş', type: 'number', placeholder: 'Örn. 35' },
    { id: 'yontem', label: 'Maksimum nabız tahmini', type: 'select', options: [['klasik', '220 − yaş (klasik)'], ['tanaka', '208 − 0,7 × yaş']] },
    { id: 'dinlenik', label: 'Dinlenik nabız (isteğe bağlı)', type: 'number', placeholder: 'Örn. 62', hint: 'Yazarsanız nabız rezervi (Karvonen) yöntemiyle ikinci bir aralık hesaplanır.' },
  ],
  compute(v, h) {
    const yas = h.pos(v.yas, 'Yaş');
    if (yas < 10 || yas > 100) h.err('Yaş 10 ile 100 arasında olmalı.');
    const maks = v.yontem === 'tanaka' ? 208 - 0.7 * yas : 220 - yas;
    const yuzde = (p) => Math.round(maks * p / 100 + 1e-9);
    const rows = [
      ['Yağ yakım nabız aralığı', `${yuzde(60)}–${yuzde(70)} atım/dk`],
      ['Tahmini maksimum nabız', h.fmt(maks, 0) + ' atım/dk'],
      ['Isınma bölgesi (%50–60)', `${yuzde(50)}–${yuzde(60)} atım/dk`],
      ['Kardiyo bölgesi (%70–80)', `${yuzde(70)}–${yuzde(80)} atım/dk`],
      ['Yüksek yoğunluk (%80–90)', `${yuzde(80)}–${yuzde(90)} atım/dk`],
    ];
    if (String(v.dinlenik ?? '').trim() !== '') {
      const d = h.pos(v.dinlenik, 'Dinlenik nabız');
      if (d < 25 || d > 120) h.err('Dinlenik nabız 25 ile 120 atım/dk arasında olmalı.');
      if (d >= maks) h.err('Dinlenik nabız tahmini maksimum nabızdan küçük olmalı; değerleri kontrol edin.');
      const rezerv = maks - d;
      const k = (p) => Math.round(d + rezerv * p / 100 + 1e-9);
      rows.push(['Nabız rezervine göre aralık (%50–65)', `${k(50)}–${k(65)} atım/dk`]);
      rows.push(['Nabız rezervi', h.fmt(rezerv, 0) + ' atım/dk']);
    }
    return {
      rows,
      note: 'Yağ yakım bölgesi, maksimum nabzın %60–70\'i olarak alınmıştır. Bu bölgede yağın enerjideki payı yüksektir, ancak toplam kalori harcaması daha yüksek yoğunluklardan düşüktür. Maksimum nabız tahmini kişiden kişiye 10–12 atım sapabilir.',
    };
  },
  cases: [
    { in: { yas: '30', yontem: 'klasik' }, out: { 'Yağ yakım nabız aralığı': '114–133 atım/dk', 'Tahmini maksimum nabız': '190 atım/dk', 'Isınma bölgesi (%50–60)': '95–114 atım/dk', 'Kardiyo bölgesi (%70–80)': '133–152 atım/dk' } },
    { in: { yas: '40', yontem: 'klasik', dinlenik: '60' }, out: { 'Yağ yakım nabız aralığı': '108–126 atım/dk', 'Tahmini maksimum nabız': '180 atım/dk', 'Nabız rezervine göre aralık (%50–65)': '120–138 atım/dk', 'Nabız rezervi': '120 atım/dk' } },
    { in: { yas: '30', yontem: 'tanaka' }, out: { 'Yağ yakım nabız aralığı': '112–131 atım/dk', 'Tahmini maksimum nabız': '187 atım/dk' } },
    { in: { yas: '50', yontem: 'klasik' }, out: { 'Yağ yakım nabız aralığı': '102–119 atım/dk', 'Tahmini maksimum nabız': '170 atım/dk', 'Yüksek yoğunluk (%80–90)': '136–153 atım/dk' } },
    { in: { yas: '50', yontem: 'tanaka' }, out: { 'Yağ yakım nabız aralığı': '104–121 atım/dk', 'Tahmini maksimum nabız': '173 atım/dk' } },
    { in: { yas: '25', yontem: 'klasik', dinlenik: '70' }, out: { 'Yağ yakım nabız aralığı': '117–137 atım/dk', 'Nabız rezervine göre aralık (%50–65)': '133–151 atım/dk', 'Nabız rezervi': '125 atım/dk' } },
    { in: { yas: '', yontem: 'klasik' }, error: true },
    { in: { yas: '5', yontem: 'klasik' }, error: true },
    { in: { yas: '40', yontem: 'klasik', dinlenik: '200' }, error: true },
  ],
  howto: [
    '"Yaş" alanına yaşınızı yazın.',
    'Maksimum nabız tahmini için yöntemi seçin. Klasik 220 − yaş en yaygın olanıdır; 208 − 0,7 × yaş formülü ileri yaşlarda biraz daha yüksek, genç yaşlarda biraz daha düşük değer verir.',
    'Dinlenik nabzınızı biliyorsanız ilgili alana yazın; böylece nabız rezervi yöntemiyle kişiselleştirilmiş ikinci bir aralık da hesaplanır.',
    '"Hesapla" düğmesine basın. İlk satırda yağ yakım nabız aralığınız, altında maksimum nabız tahmininiz ve komşu bölgeler görünür.',
    'Antrenman sırasında nabzınızı saat, göğüs bandı ya da kardiyo aletinin sensörüyle izleyip bu aralıkta tutmaya çalışın.',
  ],
  sections: [
    { h: 'Yağ yakım bölgesi nedir?', p: [
      'Vücut egzersiz sırasında enerjiyi başlıca iki kaynaktan karşılar: yağ ve karbonhidrat. Düşük yoğunlukta enerjinin büyük bölümü yağdan gelir; yoğunluk arttıkça karbonhidratın payı yükselir. "Yağ yakım bölgesi" adı, yağın enerjideki payının yüksek olduğu ve hareketin uzun süre sürdürülebildiği bu düşük-orta yoğunluk aralığına verilir.',
      'Nabız üzerinden tanımlandığında bu bölge yaygın olarak <strong>maksimum nabzın %60–70\'i</strong> kabul edilir. Araç da bu aralığı kullanır. Kişinin yağ kullanımının en yüksek olduğu gerçek yoğunluk kondisyona, beslenmeye ve bireysel farklara göre değişir; kesin değer ancak laboratuvarda solunum gazı ölçümüyle saptanabilir.',
    ] },
    { h: 'Hesaplama formülü', p: [
      'Önce maksimum nabız tahmin edilir. Klasik yöntem <strong>maksimum nabız = 220 − yaş</strong> formülüdür. Seçenek olarak sunulan ikinci formül <strong>208 − 0,7 × yaş</strong> biçimindedir ve geniş yaş gruplarında yapılan çalışmalara dayanır. Sonra bu değerin %60\'ı alt sınır, %70\'i üst sınır olarak alınır.',
      'Dinlenik nabız girildiğinde araç ayrıca nabız rezervi yöntemini uygular: <strong>hedef = dinlenik nabız + (maksimum nabız − dinlenik nabız) × yoğunluk</strong>. Rezerv yöntemi aynı yüzde için daha yüksek nabız verdiğinden burada düşük-orta yoğunluğa karşılık gelen %50–65 aralığı kullanılır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '40 yaşında, dinlenik nabzı 60 olan biri için klasik formülle maksimum nabız 220 − 40 = 180 atım/dk\'dır. Yağ yakım aralığının alt sınırı 180 × 0,60 = <strong>108</strong>, üst sınırı 180 × 0,70 = <strong>126</strong> atım/dk çıkar.',
      'Nabız rezervi 180 − 60 = 120 atımdır. Rezerv yöntemiyle alt sınır 60 + 120 × 0,50 = <strong>120</strong>, üst sınır 60 + 120 × 0,65 = <strong>138</strong> atım/dk bulunur. İki yöntemin aralıkları 120–126 arasında örtüşür. Dinlenik nabzı düşük, kondisyonu iyi kişilerde rezerv yöntemi daha gerçekçi bir hedef verme eğilimindedir; pratik bir yaklaşım, iki aralığın kesiştiği bölgeden başlayıp hissinize göre ayarlamaktır.',
    ] },
    { h: 'Yağ yakım bölgesi efsanesi: oran mı, toplam mı?', p: [
      'Bu bölgeyle ilgili en yaygın yanılgı, "yalnızca bu nabızda yağ yakılır" düşüncesidir. Doğru olan şudur: düşük yoğunlukta yağın <em>oranı</em> yüksektir, ancak dakikada harcanan <em>toplam</em> enerji düşüktür. Daha yüksek yoğunlukta yağın oranı azalır, fakat toplam kalori harcaması arttığı için yakılan yağ miktarı mutlak olarak benzer, hatta daha fazla olabilir.',
      'Kilo kontrolü açısından belirleyici olan, gün ve hafta boyunca alınan ve harcanan toplam enerjinin dengesidir; tek bir antrenmanda hangi yakıtın kullanıldığı değil. Yağ yakım bölgesinin asıl üstünlüğü başka yerdedir: yoğunluk düşük olduğu için antrenman uzun sürdürülebilir, eklemlere ve sinir sistemine yükü azdır, sık tekrarlanabilir ve yeni başlayanlar için güvenlidir.',
    ] },
    { h: 'Yaşa göre yağ yakım nabız aralıkları (220 − yaş)', ul: [
      '<strong>20 yaş</strong>: 120–140 atım/dk',
      '<strong>30 yaş</strong>: 114–133 atım/dk',
      '<strong>40 yaş</strong>: 108–126 atım/dk',
      '<strong>50 yaş</strong>: 102–119 atım/dk',
      '<strong>60 yaş</strong>: 96–112 atım/dk',
      '<strong>70 yaş</strong>: 90–105 atım/dk',
    ] },
    { h: 'Bu bölgede nasıl antrenman yapılır?', p: [
      'Tempolu yürüyüş, hafif koşu, bisiklet, eliptik ve yüzme bu bölge için uygun hareketlerdir. Nabız sensörünüz yoksa "konuşma testi" işe yarar: tam cümlelerle rahatça konuşabiliyor ama şarkı söyleyemiyorsanız büyük olasılıkla doğru yoğunluktasınız. Seansın ilk birkaç dakikasında nabız yavaşça yükselir; hedef aralığa oturması için sabırlı olun.',
      'Yalnızca tek bir bölgede çalışmak zorunda değilsiniz. Haftalık programın çoğunu bu düşük yoğunlukta, küçük bir bölümünü daha yüksek yoğunlukta yapmak hem dayanıklılığı hem toplam enerji harcamasını destekleyen yaygın bir yaklaşımdır.',
    ] },
    { h: 'Sınırlar ve sağlık uyarısı', p: [
      'Maksimum nabız formülleri toplum ortalamalarına dayanır ve bireysel sapma 10–12 atımı bulabilir. Nabzı etkileyen ilaç kullananlarda (örneğin beta blokerler), kalp ve ritim sorunu olanlarda ve hamilelerde bu aralıklar geçerli olmayabilir. Böyle durumlarda egzersiz yoğunluğu hekim önerisiyle belirlenmelidir.',
      'Bu sayfa bilgilendirme amaçlıdır; tıbbi öneri ya da kişisel antrenman programı değildir. Egzersiz sırasında göğüs ağrısı, baş dönmesi ya da olağandışı nefes darlığı yaşarsanız durun ve sağlık yardımı alın.',
    ] },
  ],
  faq: [
    ['Yağ yakmak için nabız kaç olmalı?', 'Yaygın tanıma göre maksimum nabzın %60–70\'i aralığında olmalıdır. 30 yaşında biri için bu 114–133, 40 yaş için 108–126, 50 yaş için 102–119 atım/dk eder. Değerler tahmindir ve kişiden kişiye değişir.'],
    ['Yağ yakım bölgesinin dışında yağ yakılmaz mı?', 'Yakılır. Vücut her yoğunlukta yağ ve karbonhidratı birlikte kullanır; değişen yalnızca oranlarıdır. Daha yüksek nabızda yağın payı azalır, ancak toplam enerji harcaması arttığı için yakılan yağ miktarı benzer ya da daha fazla olabilir.'],
    ['Kilo vermek için hangi nabızda çalışmalıyım?', 'Kilo kaybını toplam enerji dengesi belirler. Düşük yoğunluk uzun sürdürülebildiği ve sık tekrarlanabildiği için yararlıdır; daha yüksek yoğunluk aynı sürede daha çok kalori harcatır. Sürdürebildiğiniz bir karışım en etkili olanıdır.'],
    ['220 − yaş ile 208 − 0,7 × yaş arasındaki fark nedir?', 'İkisi de maksimum nabzı yaştan tahmin eder. 40 yaşında aynı sonucu verirler (180). Daha genç yaşlarda ikinci formül biraz daha düşük, daha ileri yaşlarda biraz daha yüksek değer üretir; örneğin 60 yaşında 160 yerine 166.'],
    ['Dinlenik nabzı neden giriyorum?', 'Dinlenik nabız kondisyon düzeyinizi yansıtır. Girdiğinizde araç nabız rezervi yöntemiyle ikinci bir aralık hesaplar; bu aralık yalnızca yaşa dayanan hesaptan daha kişiseldir.'],
    ['Bu bölgede ne kadar süre egzersiz yapmalıyım?', 'Yoğunluk düşük olduğu için seanslar genellikle 30 dakika ve üzeri planlanır. Yeni başlayanlar 15–20 dakikayla başlayıp süreyi haftadan haftaya artırabilir. Kişisel hedefler için bir uzmana danışmak yararlıdır.'],
    ['Kardiyo aletindeki yağ yakım göstergesi doğru mu?', 'Aletler genellikle yaşa dayalı aynı yüzdeleri kullanır; el sensörlerinin nabız ölçümü ise hareket sırasında sapabilir. Göğüs bandı daha güvenilirdir. Gösterge kaba bir rehberdir, kesin ölçüm değildir.'],
    ['Bilgilerim bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yaş ve nabız bilgileriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['nabiz-rezervi-hesapla', 'maksimum-nabiz-hesapla', 'kalori-acigi-hesapla', 'yuruyus-kalori-hesapla', 'kosu-hiz-bolgeleri-hesapla'],
};
