export default {
  slug: 'ozkaynak-karliligi-hesapla',
  title: 'Özkaynak Kârlılığı (ROE) Hesaplama',
  h1Tail: 'DuPont ayrıştırmasıyla',
  pageTitle: 'Özkaynak Kârlılığı (ROE) Hesaplama – Formül ve DuPont Analizi',
  description: 'Net kâr ve özkaynak tutarından özkaynak kârlılığını (ROE) hesaplayın. Satış ve aktif toplamını da girerseniz DuPont ayrıştırmasıyla kârlılığın kaynağını görün.',
  card: 'Net kârın özkaynağa oranını (ROE) bulun; isterseniz DuPont analiziyle marj, devir hızı ve kaldıraca ayırın.',
  category: 'finans',
  keywords: ['özkaynak kârlılığı hesaplama', 'roe hesaplama', 'özkaynak karlılığı formülü', 'özsermaye kârlılığı', 'dupont analizi', 'roe nedir', 'özkaynak getirisi', 'özkaynak çarpanı'],
  lead: 'Ortakların işletmeye koyduğu her 100 liranın dönem sonunda kaç lira net kâr ürettiğini hesaplayın. <strong>ROE = Net kâr ÷ Ortalama özkaynak</strong>; satış ve aktif toplamını da yazarsanız araç oranı üç bileşene ayırır.',
  button: 'Hesapla',
  inputs: [
    { id: 'netKar', label: 'Dönem net kârı (TL)', type: 'number', placeholder: 'Örn. 150000', hint: 'Zarar için eksi işaretiyle yazın. Binlik ayraç kullanmayın ya da 150.000,00 biçiminde yazın.' },
    { id: 'ozSon', label: 'Dönem sonu özkaynak (TL)', type: 'number', placeholder: 'Örn. 1100000' },
    { id: 'ozBas', label: 'Dönem başı özkaynak (TL)', type: 'number', placeholder: 'Örn. 900000', hint: 'İsteğe bağlı; boşsa dönem sonu kullanılır.' },
    { id: 'satis', label: 'Net satışlar (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'DuPont ayrıştırması için.' },
    { id: 'aktif', label: 'Ortalama toplam aktif (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'DuPont ayrıştırması için.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const yuzde = (x) => (x < 0 && Number(x.toFixed(2)) !== 0 ? '-' : '') + '%' + h.fmt(Math.abs(x), 2);
    const kar = h.num(v.netKar, 'Dönem net kârı');
    const son = h.pos(v.ozSon, 'Dönem sonu özkaynak');
    const bas = dolu(v.ozBas) ? h.pos(v.ozBas, 'Dönem başı özkaynak') : son;
    const ort = (bas + son) / 2;
    const roe = kar / ort * 100;
    const rows = [
      ['Özkaynak kârlılığı (ROE)', yuzde(roe)],
      ['Ortalama özkaynak', h.para(ort)],
      ['100 TL özkaynak başına net kâr', h.para(roe)],
    ];
    let note = 'Özkaynak negatif ya da sıfıra çok yakınsa oran anlamını yitirir; bu durumda ROE yorumlanmamalıdır.';
    const sVar = dolu(v.satis), aVar = dolu(v.aktif);
    if (sVar !== aVar) h.err('DuPont ayrıştırması için "Net satışlar" ve "Ortalama toplam aktif" alanlarının ikisini de doldurun ya da ikisini de boş bırakın.');
    if (sVar && aVar) {
      const satis = h.pos(v.satis, 'Net satışlar');
      const aktif = h.pos(v.aktif, 'Ortalama toplam aktif');
      if (aktif < ort - 1e-9) h.err('"Ortalama toplam aktif" özkaynaktan küçük olamaz; toplam aktif, özkaynak ile borçların toplamıdır.');
      rows.push(['Net kâr marjı', yuzde(kar / satis * 100)]);
      rows.push(['Aktif devir hızı', h.fmt(satis / aktif, 2)]);
      rows.push(['Özkaynak çarpanı', h.fmt(aktif / ort, 2)]);
      note = 'DuPont: ROE = Net kâr marjı × Aktif devir hızı × Özkaynak çarpanı. Bileşenler yuvarlanmış gösterildiği için çarpımları ROE ile küçük farklar verebilir.';
    }
    return { rows, note };
  },
  cases: [
    { in: { netKar: '150000', ozSon: '1000000' }, out: { 'Özkaynak kârlılığı (ROE)': '%15', 'Ortalama özkaynak': '1.000.000,00 TL', '100 TL özkaynak başına net kâr': '15,00 TL' } },
    { in: { netKar: '150000', ozSon: '1100000', ozBas: '900000', satis: '2000000', aktif: '2500000' }, out: { 'Özkaynak kârlılığı (ROE)': '%15', 'Net kâr marjı': '%7,5', 'Aktif devir hızı': '0,8', 'Özkaynak çarpanı': '2,5' } },
    { in: { netKar: '-50000', ozSon: '400000', ozBas: '600000' }, out: { 'Özkaynak kârlılığı (ROE)': '-%10', 'Ortalama özkaynak': '500.000,00 TL' } },
    { in: { netKar: '240000', ozSon: '800000', ozBas: '700000' }, out: { 'Özkaynak kârlılığı (ROE)': '%32', 'Ortalama özkaynak': '750.000,00 TL' } },
    { in: { netKar: '0', ozSon: '500000' }, out: { 'Özkaynak kârlılığı (ROE)': '%0' } },
    { in: { netKar: '123456', ozSon: '987654' }, out: { 'Özkaynak kârlılığı (ROE)': '%12,5' } },
    { in: { netKar: '300000', ozSon: '1500000', ozBas: '1500000', satis: '6000000', aktif: '1500000' }, out: { 'Özkaynak kârlılığı (ROE)': '%20', 'Net kâr marjı': '%5', 'Aktif devir hızı': '4', 'Özkaynak çarpanı': '1' } },
    { in: { netKar: '150000', ozSon: '0' }, error: true },
    { in: { netKar: '', ozSon: '1000000' }, error: true },
    { in: { netKar: '150000', ozSon: '1000000', satis: '2000000' }, error: true },
  ],
  howto: [
    'Gelir tablosunun son satırındaki dönem net kârını (vergi sonrası) ilk alana yazın. Dönem zararla kapandıysa tutarı eksi işaretiyle girin.',
    'Bilançodaki özkaynaklar toplamını dönem sonu alanına yazın. Elinizde önceki dönemin bilançosu varsa dönem başı özkaynağı da girin; araç ikisinin ortalamasını kullanır.',
    'Kârlılığın nereden geldiğini görmek istiyorsanız net satışları ve ortalama toplam aktifi de doldurun. Bu iki alan birlikte doldurulur ya da birlikte boş bırakılır.',
    '"Hesapla" düğmesine basın. İlk satır ROE değerini, DuPont alanlarını doldurduysanız alt satırlar marj, devir hızı ve özkaynak çarpanını gösterir.',
  ],
  sections: [
    { h: 'Özkaynak kârlılığı (ROE) nedir?', p: [
      'Özkaynak kârlılığı, İngilizce "Return on Equity" ifadesinin kısaltmasıyla ROE, bir işletmenin ortaklarına ait sermayeyi ne kadar verimli kullandığını gösteren kârlılık oranıdır. Özkaynak; ödenmiş sermaye, yedekler, geçmiş yıl kârları ve dönem kârından oluşur, yani varlıklardan tüm borçlar düşüldükten sonra ortaklara kalan paydır. ROE bu payın bir yılda yüzde kaç getiri ürettiğini söyler.',
      'Oran hem şirket ortakları hem de hisse senedi yatırımcıları tarafından yakından izlenir. Bir işletme sahibi için "paramı bu işe bağlamak yerine başka bir yere koysaydım ne kazanırdım?" sorusunun karşılaştırma ölçüsüdür. ROE uzun süre alternatif getirilerin altında kalıyorsa sermaye o işte verimli çalışmıyor demektir.',
    ] },
    { h: 'ROE formülü', p: [
      '<strong>ROE = Net kâr ÷ Ortalama özkaynak × 100</strong>. Ortalama özkaynak, dönem başı ve dönem sonu özkaynağın toplamının yarısıdır. Net kâr bir dönem boyunca oluşurken özkaynak tek bir tarihin bakiyesidir; ortalama almak bu uyumsuzluğu giderir. Dönem içinde sermaye artırımı ya da yüksek tutarlı kâr dağıtımı yapıldıysa ortalama kullanmak özellikle önemlidir.',
      'Örnek: Dönem net kârı 150.000 TL, dönem başı özkaynak 900.000 TL, dönem sonu özkaynak 1.100.000 TL olsun. Ortalama özkaynak (900.000 + 1.100.000) ÷ 2 = 1.000.000 TL\'dir. ROE = 150.000 ÷ 1.000.000 × 100 = %15 bulunur. Ortakların işletmede duran her 100 lirası yıl boyunca 15 lira net kâr üretmiştir.',
    ] },
    { h: 'DuPont ayrıştırması: kârlılık nereden geliyor?', p: [
      'Aynı ROE değerine çok farklı yollardan ulaşılabilir. DuPont analizi oranı üç çarpana böler: <strong>ROE = Net kâr marjı × Aktif devir hızı × Özkaynak çarpanı</strong>.',
    ], ul: [
      '<strong>Net kâr marjı</strong> (Net kâr ÷ Net satışlar): Her 100 liralık satıştan kaç lira kâr kaldığını gösterir; fiyatlama gücü ve maliyet kontrolünün ölçüsüdür.',
      '<strong>Aktif devir hızı</strong> (Net satışlar ÷ Ortalama toplam aktif): Varlıkların ne kadar yoğun kullanıldığını gösterir; düşük marjla çalışan market gibi işletmeler kârlılığı buradan sağlar.',
      '<strong>Özkaynak çarpanı</strong> (Ortalama toplam aktif ÷ Ortalama özkaynak): Finansal kaldıracın ölçüsüdür. 1 ise hiç borç yoktur; 2,5 ise varlıkların her 2,5 lirasının 1 lirası özkaynakla, kalanı borçla finanse edilmiştir.',
    ] },
    { h: 'DuPont örneği', p: [
      'Yukarıdaki işletmenin net satışları 2.000.000 TL, ortalama toplam aktifi 2.500.000 TL olsun. Net kâr marjı 150.000 ÷ 2.000.000 = %7,5; aktif devir hızı 2.000.000 ÷ 2.500.000 = 0,8; özkaynak çarpanı 2.500.000 ÷ 1.000.000 = 2,5 çıkar. Çarpım 0,075 × 0,8 × 2,5 = 0,15, yani %15\'tir ve doğrudan hesaplanan ROE ile aynıdır.',
      'Bu döküm, %15\'lik getirinin önemli bölümünün kaldıraçtan geldiğini gösterir. Aynı işletme hiç borç kullanmasaydı çarpan 1 olur ve ROE yalnızca %6 kalırdı. Borç kârlılığı yükseltir ama faiz yükünü ve iflas riskini de artırır; bu yüzden ROE\'yi borçluluk oranlarıyla birlikte okumak gerekir.',
    ] },
    { h: 'Yorumlarken dikkat edilecekler', ul: [
      'Yüksek ROE her zaman iyi haber değildir; özkaynağı zararlarla erimiş bir şirkette küçük bir kâr bile çok yüksek oran üretir.',
      'Özkaynak negatifse oran matematiksel olarak hesaplanabilse de anlam taşımaz; araç bu nedenle pozitif özkaynak ister.',
      'Tek seferlik gelirler (gayrimenkul satışı, kur farkı, teşvik) net kârı şişirebilir. Sürdürülebilir kârlılığı görmek için bu kalemleri ayırarak ikinci bir hesap yapın.',
      'Yüksek enflasyon dönemlerinde nominal ROE yanıltıcıdır; getiriyi enflasyonla karşılaştırmadan "kârlı" demek doğru olmaz.',
      'Sektörler arasında karşılaştırma sağlıklı değildir: varlık yoğun sanayi ile az sermaye gerektiren hizmet işletmesinin doğal ROE düzeyleri farklıdır.',
    ] },
    { h: 'ROE, ROA ve ROI arasındaki fark', p: [
      'ROE net kârı yalnızca ortakların sermayesine oranlar. Aktif kârlılığı (ROA) aynı kârı borçla finanse edilenler de dahil tüm varlıklara oranlar; dolayısıyla borç kullanan bir işletmede ROA her zaman ROE\'den düşüktür. Yatırım getirisi (ROI) ise belirli bir projenin ya da harcamanın getirisini ölçer, işletmenin bütününü değil.',
      'Bu sayfa genel bir oran hesaplayıcısıdır ve yatırım tavsiyesi değildir. Hisse senedi alım satımı, ortaklık ya da kredi kararlarında tek bir orana dayanmayın; mali tabloların tamamını değerlendirin ve gerekirse bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['ROE nasıl hesaplanır?', 'Dönem net kârı ortalama özkaynağa bölünür ve 100 ile çarpılır. 150.000 TL net kâr ve 1.000.000 TL ortalama özkaynak için sonuç %15\'tir.'],
    ['İyi bir özkaynak kârlılığı yüzde kaçtır?', 'Evrensel bir eşik yoktur. Oranın en azından enflasyonun ve risksiz sayılan getiri seçeneklerinin üzerinde olması beklenir; aksi halde sermaye reel olarak erir. Ayrıca aynı sektördeki işletmelerle ve şirketin kendi geçmiş yıllarıyla karşılaştırmak gerekir.'],
    ['ROE negatif çıkarsa ne anlama gelir?', 'İşletme dönemi zararla kapatmıştır ve özkaynak erimektedir. Araç zararı eksi işaretli oran olarak gösterir; örneğin 500.000 TL ortalama özkaynakla 50.000 TL zarar -%10 ROE demektir.'],
    ['Neden ortalama özkaynak kullanılıyor?', 'Kâr yıl boyunca birikir, özkaynak ise belirli bir günün rakamıdır. Dönem içinde sermaye artırımı ya da kâr dağıtımı olduysa yalnızca dönem sonu rakamını kullanmak oranı çarpıtır. Dönem başı bakiyesi yoksa alanı boş bırakabilirsiniz.'],
    ['Özkaynak çarpanı nedir?', 'Toplam aktifin özkaynağa oranıdır ve finansal kaldıracı ölçer. Çarpan 1 ise işletmenin borcu yoktur. Çarpan büyüdükçe varlıkların daha büyük bölümü borçla finanse ediliyor demektir; bu ROE\'yi yükseltir ama riski de artırır.'],
    ['DuPont alanlarını doldurmak zorunda mıyım?', 'Hayır. Yalnızca net kâr ve özkaynak ile ROE hesaplanır. Net satışlar ve ortalama toplam aktif isteğe bağlıdır; ikisini birlikte girerseniz oranın marj, devir hızı ve kaldıraç bileşenlerini görürsünüz.'],
    ['Vergi öncesi kâr ile hesaplayabilir miyim?', 'ROE geleneksel olarak vergi sonrası net kârla hesaplanır, çünkü ortaklara kalan tutar budur. Vergi öncesi kârı yazarsanız daha yüksek bir oran elde edersiniz; karşılaştırma yaparken herkesin aynı kâr tanımını kullandığından emin olun.'],
    ['Şirketimin rakamları güvende mi?', 'Evet. Hesap yalnızca tarayıcınızda çalışır; girdiğiniz kâr, özkaynak ve satış tutarları hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['aktif-karlilik-hesapla', 'borc-ozkaynak-orani-hesapla', 'yatirim-getirisi-hesapla', 'faaliyet-kar-marji-hesapla', 'kar-marji-hesapla', 'fiyat-kazanc-orani-hesapla'],
};
