export default {
  slug: 'nabiz-rezervi-hesapla',
  title: 'Nabız Rezervi (Karvonen) Hesaplama',
  h1Tail: 'hedef nabız aralığı',
  pageTitle: 'Nabız Rezervi Hesaplama – Karvonen Formülüyle Hedef Nabız Aralığı',
  description: 'Yaşınızı ve dinlenik nabzınızı girin; Karvonen formülüyle nabız rezervinizi, seçtiğiniz yoğunluk için hedef nabız aralığını ve beş antrenman bölgesini hesaplayın.',
  card: 'Karvonen formülüyle nabız rezervinizi ve dinlenik nabzınıza göre kişiselleştirilmiş hedef nabız aralığınızı bulun.',
  category: 'saglik',
  keywords: ['karvonen formülü', 'nabız rezervi hesaplama', 'hedef nabız hesaplama', 'kalp atım hızı rezervi', 'antrenman nabız aralığı', 'dinlenik nabız hedef nabız', 'karvonen hesaplama'],
  lead: 'Karvonen yöntemi, hedef nabzı yalnızca yaşa göre değil <strong>dinlenik nabzınıza</strong> göre de ayarlar. Yaşınızı, dinlenik nabzınızı ve çalışmak istediğiniz yoğunluk aralığını yazın; araç nabız rezervinizi ve hedef nabız aralığınızı hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'yas', label: 'Yaş', type: 'number', placeholder: 'Örn. 40', hint: 'Maksimum nabzınızı biliyorsanız boş bırakabilirsiniz.' },
    { id: 'dinlenik', label: 'Dinlenik nabız (atım/dk)', type: 'number', placeholder: 'Örn. 60', hint: 'Sabah uyanınca, yataktan kalkmadan ölçülen değer.' },
    { id: 'maks', label: 'Maksimum nabız (isteğe bağlı)', type: 'number', placeholder: 'Boş = 220 − yaş', hint: 'Test ya da ölçümle bildiğiniz değer varsa yazın.' },
    { id: 'alt', label: 'Yoğunluk alt sınırı (%)', type: 'number', value: '60' },
    { id: 'ust', label: 'Yoğunluk üst sınırı (%)', type: 'number', value: '70' },
  ],
  compute(v, h) {
    const dinlenik = h.pos(v.dinlenik, 'Dinlenik nabız');
    if (dinlenik < 25 || dinlenik > 120) h.err('Dinlenik nabız 25 ile 120 atım/dk arasında olmalı; dinlenme hâlindeki ölçümünüzü yazın.');
    let maks, kaynak;
    if (String(v.maks ?? '').trim() !== '') {
      maks = h.pos(v.maks, 'Maksimum nabız');
      if (maks < 90 || maks > 230) h.err('Maksimum nabız 90 ile 230 atım/dk arasında olmalı.');
      kaynak = 'girilen değer';
    } else {
      const yas = h.pos(v.yas, 'Yaş');
      if (yas < 10 || yas > 100) h.err('Yaş 10 ile 100 arasında olmalı.');
      maks = 220 - yas;
      kaynak = '220 − yaş';
    }
    if (maks <= dinlenik) h.err('Maksimum nabız dinlenik nabızdan büyük olmalı; değerleri kontrol edin.');
    const alt = h.pos(v.alt, 'Yoğunluk alt sınırı');
    const ust = h.pos(v.ust, 'Yoğunluk üst sınırı');
    if (alt > 100 || ust > 100) h.err('Yoğunluk yüzdeleri 100\'den büyük olamaz.');
    if (alt > ust) h.err('Yoğunluk alt sınırı üst sınırdan büyük olamaz.');
    const rezerv = maks - dinlenik;
    const hedef = (p) => Math.round(dinlenik + rezerv * p / 100 + 1e-9);
    const rows = [
      ['Hedef nabız aralığı', `${hedef(alt)}–${hedef(ust)} atım/dk`],
      ['Nabız rezervi', h.fmt(rezerv, 0) + ' atım/dk'],
      ['Maksimum nabız', `${h.fmt(maks, 0)} atım/dk (${kaynak})`],
      ['Dinlenik nabız', h.fmt(dinlenik, 0) + ' atım/dk'],
    ];
    const bolgeler = [
      ['Bölge 1 – Çok hafif (%50–60)', 50, 60],
      ['Bölge 2 – Hafif (%60–70)', 60, 70],
      ['Bölge 3 – Orta (%70–80)', 70, 80],
      ['Bölge 4 – Zor (%80–90)', 80, 90],
      ['Bölge 5 – Maksimum (%90–100)', 90, 100],
    ];
    for (const [ad, a, b] of bolgeler) rows.push([ad, `${hedef(a)}–${hedef(b)} atım/dk`]);
    return {
      rows,
      note: 'Hedef nabız = dinlenik nabız + nabız rezervi × yoğunluk. 220 − yaş tahmini kişiden kişiye 10–12 atım sapabilir; ölçülmüş maksimum nabzınız varsa onu kullanın.',
    };
  },
  cases: [
    { in: { yas: '40', dinlenik: '60', alt: '60', ust: '70' }, out: { 'Hedef nabız aralığı': '132–144 atım/dk', 'Nabız rezervi': '120 atım/dk', 'Maksimum nabız': '180 atım/dk (220 − yaş)', 'Bölge 1 – Çok hafif (%50–60)': '120–132 atım/dk', 'Bölge 5 – Maksimum (%90–100)': '168–180 atım/dk' } },
    { in: { yas: '30', dinlenik: '70', alt: '50', ust: '85' }, out: { 'Hedef nabız aralığı': '130–172 atım/dk', 'Nabız rezervi': '120 atım/dk', 'Maksimum nabız': '190 atım/dk (220 − yaş)', 'Bölge 3 – Orta (%70–80)': '154–166 atım/dk' } },
    { in: { yas: '', dinlenik: '55', maks: '185', alt: '70', ust: '80' }, out: { 'Hedef nabız aralığı': '146–159 atım/dk', 'Nabız rezervi': '130 atım/dk', 'Maksimum nabız': '185 atım/dk (girilen değer)' } },
    { in: { yas: '55', dinlenik: '65', alt: '40', ust: '60' }, out: { 'Hedef nabız aralığı': '105–125 atım/dk', 'Nabız rezervi': '100 atım/dk', 'Bölge 2 – Hafif (%60–70)': '125–135 atım/dk', 'Bölge 4 – Zor (%80–90)': '145–155 atım/dk' } },
    { in: { yas: '25', dinlenik: '50', alt: '85', ust: '95' }, out: { 'Hedef nabız aralığı': '173–188 atım/dk', 'Nabız rezervi': '145 atım/dk', 'Maksimum nabız': '195 atım/dk (220 − yaş)' } },
    { in: { yas: '60', dinlenik: '72', alt: '50', ust: '50' }, out: { 'Hedef nabız aralığı': '116–116 atım/dk', 'Nabız rezervi': '88 atım/dk' } },
    { in: { yas: '40', dinlenik: '', alt: '60', ust: '70' }, error: true },
    { in: { yas: '40', dinlenik: '60', alt: '80', ust: '60' }, error: true },
    { in: { yas: '', dinlenik: '60', maks: '', alt: '60', ust: '70' }, error: true },
    { in: { yas: '40', dinlenik: '60', alt: '60', ust: '120' }, error: true },
  ],
  howto: [
    'Dinlenik nabzınızı ölçün: sabah uyandığınızda, yataktan kalkmadan bileğinizden ya da boynunuzdan 60 saniye atım sayın. Birkaç sabahın ortalamasını almak daha güvenilirdir.',
    '"Yaş" alanını doldurun. Maksimum nabzınızı bir testle biliyorsanız yaş yerine "Maksimum nabız" alanına o değeri yazın.',
    'Çalışmak istediğiniz yoğunluk aralığını yüzde olarak girin. Varsayılan %60–70 hafif tempolu dayanıklılık çalışmasına karşılık gelir.',
    '"Hesapla" düğmesine basın. İlk satır hedef nabız aralığınızı, alt satırlar nabız rezervinizi ve beş bölgenin sınırlarını gösterir.',
  ],
  sections: [
    { h: 'Karvonen formülü', p: [
      'Nabız rezervi, maksimum nabız ile dinlenik nabız arasındaki farktır: <strong>nabız rezervi = maksimum nabız − dinlenik nabız</strong>. Bu fark, kalbinizin dinlenmeden en yüksek efora kadar kullanabildiği "çalışma aralığını" gösterir. Karvonen yöntemi hedef nabzı bu aralığın yüzdesi olarak tanımlar: <strong>hedef nabız = dinlenik nabız + nabız rezervi × yoğunluk (%)</strong>.',
      'Maksimum nabız ölçülmemişse araç en bilinen tahmin olan <strong>220 − yaş</strong> formülünü kullanır. Bu tahmin toplum ortalamasını yansıtır; bireylerde gerçek değer 10–12 atım yukarıda ya da aşağıda olabilir. Saha testiyle ya da efor testinde ölçülmüş bir değeriniz varsa ilgili alana yazmanız sonucu sizin için daha doğru kılar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '40 yaşında, dinlenik nabzı 60 olan biri %60–70 yoğunlukta çalışmak istesin. Tahmini maksimum nabız 220 − 40 = 180\'dir. Nabız rezervi 180 − 60 = <strong>120 atım</strong> eder. Alt sınır 60 + 120 × 0,60 = 60 + 72 = <strong>132</strong>, üst sınır 60 + 120 × 0,70 = 60 + 84 = <strong>144</strong> atım/dk bulunur.',
      'Aynı kişi için yalnızca maksimum nabzın yüzdesi alınsaydı aralık 180 × 0,60 = 108 ile 180 × 0,70 = 126 olurdu. Görüldüğü gibi Karvonen yöntemi aynı yüzde için daha yüksek nabız verir; bu nedenle iki yöntemin yüzdeleri birbirinin yerine kullanılamaz.',
    ] },
    { h: 'Dinlenik nabız neden önemli?', p: [
      'Aynı yaştaki iki kişinin kondisyonu çok farklı olabilir. Düzenli dayanıklılık antrenmanı yapanlarda kalp her atımda daha çok kan pompalar ve dinlenik nabız düşer. Yalnızca yaşa dayanan hesap bu iki kişiye aynı hedefi verir; Karvonen ise dinlenik nabzı hesaba katarak aralığı kişiselleştirir.',
      'Örneğin 40 yaşında, dinlenik nabzı 50 olan biri için %70 yoğunluk 50 + 130 × 0,70 = 141 atım/dk iken, dinlenik nabzı 80 olan biri için 80 + 100 × 0,70 = 150 atım/dk eder. Dinlenik nabzı düşük kişinin rezervi daha geniştir ve aynı göreli efor daha düşük bir nabızda gerçekleşir.',
    ] },
    { h: 'Yoğunluk yüzdesi nasıl seçilir?', ul: [
      '<strong>%50–60:</strong> Isınma, soğuma ve toparlanma günleri; egzersize yeni başlayanlar için başlangıç düzeyi.',
      '<strong>%60–70:</strong> Uzun süre sürdürülebilen hafif tempo; temel dayanıklılık çalışmaları.',
      '<strong>%70–80:</strong> Orta yoğunluk; nefes belirgin hızlanır, konuşma kısa cümlelere iner.',
      '<strong>%80–90:</strong> Zor tempo; eşik koşuları ve uzun tekrarlar.',
      '<strong>%90–100:</strong> Kısa süreli, çok yüksek yoğunluklu tekrarlar; yalnızca deneyimli ve sağlıklı sporcular için.',
    ] },
    { h: 'Doğru ölçüm için ipuçları', p: [
      'Dinlenik nabız en iyi sabah uyanır uyanmaz, kahve içmeden ve ayağa kalkmadan ölçülür. İşaret ve orta parmağınızı bileğinizin başparmak tarafına koyup 60 saniye sayın ya da 30 saniye sayıp ikiyle çarpın. Akıllı saatlerin gece boyunca ölçtüğü ortalama da iyi bir göstergedir. Hastalık, uykusuzluk, stres, kafein ve sıcak hava dinlenik nabzı geçici olarak yükseltir.',
      'Antrenman sırasında nabzı göğüs bandı en doğru ölçer; bilekten optik ölçüm özellikle interval çalışmalarında gecikebilir ya da sapabilir. Nabız, eforun başlamasından bir iki dakika sonra hedefe oturur; kısa tekrarlar için nabza değil tempoya ya da hisse göre çalışmak daha pratiktir.',
    ] },
    { h: 'Sınırlar ve sağlık uyarısı', p: [
      'Bu hesap sağlıklı yetişkinler için genel bir rehberdir. Beta bloker gibi nabzı düşüren ilaçlar kullananlarda, ritim bozukluğu ya da kalp hastalığı olanlarda ve hamilelerde formül geçerli olmayabilir; bu durumlarda hedef nabız hekim tarafından belirlenmelidir. Uzun süredir hareketsizseniz ya da risk etkenleriniz varsa yoğun egzersize başlamadan önce sağlık kontrolünden geçin.',
      'Egzersiz sırasında göğüs ağrısı, baş dönmesi, çarpıntı ya da olağandışı nefes darlığı yaşarsanız durun ve tıbbi yardım alın. Sonuçlar bilgilendirme amaçlıdır; tanı ya da tedavi önerisi değildir.',
    ] },
  ],
  faq: [
    ['Nabız rezervi nedir?', 'Maksimum nabız ile dinlenik nabız arasındaki farktır. Örneğin maksimum nabzı 180, dinlenik nabzı 60 olan birinin nabız rezervi 120 atımdır. Bu değer kalbin efor için kullanabildiği aralığı gösterir.'],
    ['Karvonen formülü ile 220 − yaş yöntemi arasındaki fark nedir?', '220 − yaş yalnızca maksimum nabzı tahmin eder; hedef aralık bunun yüzdesi olarak alınır. Karvonen ise dinlenik nabzı da kullanır ve yüzdeyi maksimum ile dinlenik arasındaki farka uygular. Sonuç daha kişisel ve aynı yüzde için daha yüksek bir nabızdır.'],
    ['Dinlenik nabız kaç olmalı?', 'Yetişkinlerde dinlenik nabız çoğunlukla dakikada 60–100 atım arasında kabul edilir; düzenli spor yapanlarda 40–60 aralığı da sık görülür. Sürekli çok yüksek ya da belirtilerle birlikte çok düşük değerlerde hekime danışılmalıdır.'],
    ['Maksimum nabzımı bilmiyorsam ne yapmalıyım?', 'Yaşınızı yazmanız yeterlidir; araç 220 − yaş tahminini kullanır. Bu tahmin kişiden kişiye sapabildiği için hedef aralığı kesin sınır değil, başlangıç rehberi olarak görün ve hissinizle birlikte değerlendirin.'],
    ['Hangi yoğunlukta çalışmalıyım?', 'Amaca göre değişir. Temel dayanıklılık ve uzun antrenmanlar için %60–70, orta yoğunluklu çalışmalar için %70–80, eşik ve tempo çalışmaları için %80–90 yaygın aralıklardır. Yeni başlayanların %50–60 ile başlayıp kademeli ilerlemesi uygundur.'],
    ['Kondisyonum arttıkça hedef nabzım değişir mi?', 'Evet. Düzenli antrenmanla dinlenik nabız düşer, nabız rezervi genişler ve aynı yüzdenin karşılığı değişir. Dinlenik nabzınızı birkaç haftada bir yeniden ölçüp hesabı güncellemek iyi olur.'],
    ['İlaç kullanıyorsam bu hesap geçerli mi?', 'Nabzı etkileyen ilaçlar, özellikle beta blokerler, hem dinlenik hem maksimum nabzı düşürür ve formülü geçersiz kılabilir. Bu durumda egzersiz yoğunluğunu hekiminizle birlikte belirleyin.'],
    ['Yazdığım bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yaş ve nabız bilgileriniz hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['maksimum-nabiz-hesapla', 'yag-yakim-bolgesi-hesapla', 'vo2-max-hesapla', 'kosu-hiz-bolgeleri-hesapla', 'tansiyon-degerlendirme'],
};
