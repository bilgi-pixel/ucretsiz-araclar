export default {
  slug: 'aktif-karlilik-hesapla',
  title: 'Aktif Kârlılığı (ROA) Hesaplama',
  h1Tail: 'varlıkların getirisi',
  pageTitle: 'Aktif Kârlılığı (ROA) Hesaplama – Varlık Getirisi Formülü',
  description: 'Net kâr ve toplam aktif tutarından aktif kârlılığını (ROA) hesaplayın. Net satışları da girerseniz oranı kâr marjı ve aktif devir hızına ayrılmış olarak görün.',
  card: 'Net kârın toplam varlıklara oranını (ROA) hesaplayın; varlıklarınızın ne kadar kâr ürettiğini görün.',
  category: 'finans',
  keywords: ['aktif kârlılığı hesaplama', 'roa hesaplama', 'aktif karlılık oranı', 'varlık kârlılığı', 'roa formülü', 'roa nedir', 'aktif devir hızı', 'toplam aktif getirisi'],
  lead: 'İşletmenizin sahip olduğu tüm varlıkların dönem içinde yüzde kaç net kâr ürettiğini hesaplayın. <strong>ROA = Net kâr ÷ Ortalama toplam aktif</strong>; net satışları da girerseniz sonuç marj ve devir hızı olarak iki parçaya ayrılır.',
  button: 'Hesapla',
  inputs: [
    { id: 'netKar', label: 'Dönem net kârı (TL)', type: 'number', placeholder: 'Örn. 200000', hint: 'Zarar için eksi işaretiyle yazın. Binlik ayraç kullanmayın ya da 200.000,00 biçiminde yazın.' },
    { id: 'aktifSon', label: 'Dönem sonu toplam aktif (TL)', type: 'number', placeholder: 'Örn. 2700000' },
    { id: 'aktifBas', label: 'Dönem başı toplam aktif (TL)', type: 'number', placeholder: 'Örn. 2300000', hint: 'İsteğe bağlı; boşsa dönem sonu kullanılır.' },
    { id: 'satis', label: 'Net satışlar (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Marj ve devir hızı ayrıştırması için.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const kar = h.num(v.netKar, 'Dönem net kârı');
    const son = h.pos(v.aktifSon, 'Dönem sonu toplam aktif');
    const bas = dolu(v.aktifBas) ? h.pos(v.aktifBas, 'Dönem başı toplam aktif') : son;
    const ort = (bas + son) / 2;
    const roa = kar / ort * 100;
    const rows = [
      ['Aktif kârlılığı (ROA)', yuzde(roa)],
      ['Ortalama toplam aktif', h.para(ort)],
      ['100 TL varlık başına net kâr', h.para(roa)],
    ];
    let note = 'Net kâr vergi sonrası dönem kârıdır. Oran, varlıkların borçla mı özkaynakla mı finanse edildiğine bakmaksızın toplam varlık getirisini gösterir.';
    if (dolu(v.satis)) {
      const satis = h.pos(v.satis, 'Net satışlar');
      rows.push(['Net kâr marjı', yuzde(kar / satis * 100)]);
      rows.push(['Aktif devir hızı', h.fmt(satis / ort, 2)]);
      note = 'ROA = Net kâr marjı × Aktif devir hızı. Bileşenler yuvarlanmış gösterildiği için çarpımları ROA ile küçük farklar verebilir.';
    }
    return { rows, note };
  },
  cases: [
    { in: { netKar: '200000', aktifSon: '2500000' }, out: { 'Aktif kârlılığı (ROA)': '%8', 'Ortalama toplam aktif': '2.500.000,00 TL', '100 TL varlık başına net kâr': '8,00 TL' } },
    { in: { netKar: '200000', aktifSon: '2700000', aktifBas: '2300000', satis: '5000000' }, out: { 'Aktif kârlılığı (ROA)': '%8', 'Net kâr marjı': '%4', 'Aktif devir hızı': '2' } },
    { in: { netKar: '-30000', aktifSon: '600000' }, out: { 'Aktif kârlılığı (ROA)': '-%5', '100 TL varlık başına net kâr': '-5,00 TL' } },
    { in: { netKar: '90000', aktifSon: '1300000', aktifBas: '1100000' }, out: { 'Aktif kârlılığı (ROA)': '%7,5', 'Ortalama toplam aktif': '1.200.000,00 TL' } },
    { in: { netKar: '0', aktifSon: '750000' }, out: { 'Aktif kârlılığı (ROA)': '%0' } },
    { in: { netKar: '1000000', aktifSon: '3000000', satis: '4000000' }, out: { 'Aktif kârlılığı (ROA)': '%33,33', 'Net kâr marjı': '%25', 'Aktif devir hızı': '1,33' } },
    { in: { netKar: '200000', aktifSon: '0' }, error: true },
    { in: { netKar: 'kâr', aktifSon: '2500000' }, error: true },
    { in: { netKar: '200000', aktifSon: '2500000', satis: '-10' }, error: true },
  ],
  howto: [
    'Gelir tablosundaki vergi sonrası dönem net kârını ilk alana yazın; dönem zararla kapandıysa eksi işaretiyle girin.',
    'Bilançonun aktif toplamını (dönen varlıklar ile duran varlıkların toplamı) dönem sonu alanına yazın.',
    'Önceki dönem sonu bilançonuz elinizdeyse aktif toplamını dönem başı alanına girin; araç iki değerin ortalamasını kullanır.',
    'İsterseniz net satışları da yazın ve "Hesapla" düğmesine basın. ROA ile birlikte net kâr marjı ve aktif devir hızını görürsünüz.',
  ],
  sections: [
    { h: 'Aktif kârlılığı (ROA) nedir?', p: [
      'Aktif kârlılığı, İngilizce "Return on Assets" ifadesinin kısaltmasıyla ROA, bir işletmenin elindeki tüm varlıkları kâra dönüştürmedeki başarısını ölçer. Bilançonun aktif tarafında kasa ve banka, alacaklar, stoklar, makineler, taşıtlar, binalar ve diğer bütün varlıklar yer alır. ROA, bu varlıkların toplamına karşılık dönem içinde ne kadar net kâr elde edildiğini yüzde olarak verir.',
      'Oranın güzelliği, finansman biçiminden bağımsız bir bakış sunmasıdır. Makineyi kendi paranızla da alsanız krediyle de alsanız o makine aktifte aynı tutarla durur. Bu nedenle ROA, yönetimin "eldeki kaynakla ne kadar iş çıkardığını" gösterir; sermayenin kimden geldiği sorusunu bir kenara bırakır.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      '<strong>ROA = Net kâr ÷ Ortalama toplam aktif × 100</strong>. Ortalama toplam aktif, dönem başı ve dönem sonu aktif toplamlarının ortalamasıdır. Yıl içinde büyük bir yatırım yapıldıysa ya da varlık satıldıysa yalnızca yıl sonu rakamını kullanmak oranı çarpıtacağından ortalama tercih edilir.',
      'Bir mobilya atölyesi yılı 200.000 TL net kârla kapatmış olsun. Yılbaşında aktif toplamı 2.300.000 TL, yıl sonunda 2.700.000 TL. Ortalama (2.300.000 + 2.700.000) ÷ 2 = 2.500.000 TL\'dir. ROA = 200.000 ÷ 2.500.000 × 100 = %8 bulunur. Atölyedeki her 100 liralık varlık yıl boyunca 8 lira net kâr üretmiştir.',
    ] },
    { h: 'Marj ve devir hızı ayrıştırması', p: [
      'ROA iki oranın çarpımı olarak yazılabilir: <strong>ROA = Net kâr marjı × Aktif devir hızı</strong>. Net kâr marjı, net kârın net satışlara oranıdır. Aktif devir hızı ise net satışların ortalama toplam aktife bölünmesiyle bulunur ve varlıkların yılda kaç katı satış yapıldığını gösterir.',
      'Aynı atölyenin net satışları 5.000.000 TL ise net kâr marjı 200.000 ÷ 5.000.000 = %4, aktif devir hızı 5.000.000 ÷ 2.500.000 = 2 olur. Çarpım %4 × 2 = %8\'dir. Bu döküm, kârlılığı artırmanın iki ayrı yolunu gösterir: ya her satıştan daha çok kâr bırakmak ya da aynı varlıkla daha çok satış yapmak. Atıl duran bir makineyi satmak ya da stok seviyesini düşürmek, marjı değiştirmeden devir hızını ve dolayısıyla ROA\'yı yükseltir.',
    ] },
    { h: 'Sektöre göre ROA neden çok değişir?', p: [
      'Varlık yoğunluğu sektörden sektöre büyük fark gösterir. Fabrika, enerji santrali, otel ya da nakliye filosu işleten bir şirketin bilançosunda büyük tutarlı duran varlıklar bulunur; bu işletmelerde ROA doğal olarak düşük seyreder. Buna karşılık danışmanlık, yazılım ya da ajans gibi asıl varlığı insan olan işletmelerde aktif toplamı küçüktür ve ROA yüksek çıkar. Bankalarda ise aktifler çok büyük, kâr marjı çok ince olduğundan oran tipik olarak küçük yüzdelerle ifade edilir.',
      'Bu nedenle bir marketin ROA\'sını bir çimento fabrikasınınkiyle kıyaslamak anlamsızdır. Sağlıklı karşılaştırma aynı sektördeki benzer büyüklükteki işletmelerle ve işletmenin kendi geçmiş yıllarıyla yapılır.',
    ] },
    { h: 'ROA ile ROE arasındaki ilişki', p: [
      'Özkaynak kârlılığı (ROE) net kârı yalnızca ortakların sermayesine oranlar. İki oran arasındaki bağ finansal kaldıraçtır: <strong>ROE = ROA × (Toplam aktif ÷ Özkaynak)</strong>. Hiç borcu olmayan bir işletmede ikisi eşittir. Borç arttıkça ROE, ROA\'nın üzerine çıkar. ROE yüksek ama ROA düşükse kârlılığın önemli bölümü borçlanmadan geliyor demektir; faizler yükseldiğinde ya da satışlar düştüğünde bu yapı kırılganlaşır.',
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', ul: [
      'Bilançodaki varlıklar çoğunlukla tarihî maliyetle kayıtlıdır. Yıllar önce alınmış ve büyük ölçüde amorti edilmiş makinelerle çalışan bir işletmenin aktifi küçük, ROA\'sı olduğundan yüksek görünür.',
      'Kiralanan varlıklar bilançoda yer almıyorsa, kiracı işletme mülk sahibi rakibine göre daha yüksek ROA gösterir; oysa iki işletme aynı varlıkla çalışmaktadır.',
      'Tek seferlik gelir ve giderler net kârı o yıl için çarpıtır; sürdürülebilir kârlılık için bunları ayıklayın.',
      'Dönemin net kârını yıl sonu yerine farklı bir tarihin aktifiyle eşleştirmeyin; kâr ve varlık aynı döneme ait olmalıdır.',
      'Yıllık olmayan dönemlerde (örneğin altı aylık kâr) bulunan oran yıllık oranla doğrudan karşılaştırılamaz.',
    ], p: [
      'Hesaplama bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Kredi, ortaklık ya da yatırım kararlarında mali tabloların bütününü bir uzmanla birlikte değerlendirin.',
    ] },
  ],
  faq: [
    ['ROA nasıl hesaplanır?', 'Dönem net kârı ortalama toplam aktife bölünür ve 100 ile çarpılır. 200.000 TL net kâr ve 2.500.000 TL ortalama aktif için ROA %8 çıkar.'],
    ['Toplam aktif nedir, nereden bulurum?', 'Bilançonun sol tarafının toplamıdır: dönen varlıklar (kasa, banka, alacak, stok) ile duran varlıkların (makine, taşıt, bina, haklar) toplamı. Aynı tutar bilançonun pasif toplamına, yani borçlar ile özkaynağın toplamına eşittir.'],
    ['İyi bir ROA yüzde kaçtır?', 'Sektöre bağlıdır. Varlık yoğun sanayi ve altyapı işletmelerinde düşük, hizmet ve yazılım işletmelerinde yüksek oranlar olağandır. Kendi sektörünüzdeki işletmelerle ve önceki yıllarınızla karşılaştırmak tek anlamlı ölçüdür.'],
    ['ROA ile ROE farkı nedir?', 'ROA kârı borçla finanse edilenler dahil bütün varlıklara, ROE ise yalnızca özkaynağa oranlar. Borcu olan bir işletmede ROE her zaman ROA\'dan büyüktür; aradaki fark kaldıraç etkisini gösterir.'],
    ['Net kâr yerine faaliyet kârı kullanabilir miyim?', 'Bazı analizlerde finansman etkisini dışarıda bırakmak için faiz ve vergi öncesi kâr kullanılır. Bu durumda bulunan oran klasik ROA değil, varlıkların faaliyet getirisidir. Araç yazdığınız tutarı olduğu gibi kullanır; karşılaştırmalarda aynı kâr tanımını korumaya dikkat edin.'],
    ['Aktif devir hızı ne anlatır?', 'Net satışların ortalama toplam aktife oranıdır. 2 değeri, işletmenin varlıklarının iki katı kadar yıllık satış yaptığını gösterir. Düşük kâr marjıyla çalışan ticaret işletmeleri yeterli ROA\'ya yüksek devir hızıyla ulaşır.'],
    ['ROA neden negatif çıkar?', 'Dönem zararla kapandığında net kâr negatiftir ve oran da negatif olur. Örneğin 600.000 TL aktifle 30.000 TL zarar eden bir işletmenin ROA\'sı -%5\'tir.'],
    ['Yazdığım bilanço rakamları kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; rakamlar sunucuya gönderilmez, saklanmaz ve üçüncü kişilerle paylaşılmaz.'],
  ],
  related: ['ozkaynak-karliligi-hesapla', 'yatirim-getirisi-hesapla', 'borc-ozkaynak-orani-hesapla', 'faaliyet-kar-marji-hesapla', 'kar-marji-hesapla', 'cari-oran-hesapla'],
};
