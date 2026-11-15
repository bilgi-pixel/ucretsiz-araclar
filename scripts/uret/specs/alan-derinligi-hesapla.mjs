export default {
  slug: 'alan-derinligi-hesapla',
  title: 'Alan Derinliği (DOF) Hesaplama',
  h1Tail: 'net alan ve hiperfokal mesafe',
  pageTitle: 'Alan Derinliği (DOF) Hesaplama – Net Alan ve Hiperfokal Mesafe',
  description: 'Odak uzaklığı, diyafram, konu mesafesi ve sensör boyutundan yakın ve uzak netlik sınırını, toplam alan derinliğini ve hiperfokal mesafeyi hesaplayın.',
  card: 'Odak uzaklığı, diyafram ve mesafeden net görünen alanın nerede başlayıp bittiğini ve hiperfokal mesafeyi hesaplayın.',
  category: 'gunluk',
  keywords: ['alan derinliği hesaplama', 'dof hesaplama', 'hiperfokal mesafe hesaplama', 'net alan derinliği', 'diyafram alan derinliği', 'depth of field', 'bulanıklık dairesi'],
  lead: "Fotoğrafta <strong>net görünen bölgenin</strong> nerede başlayıp nerede bittiğini hesaplayın. Odak uzaklığını, diyafram değerini, konuya olan mesafeyi ve sensör boyutunu girin; araç yakın ve uzak netlik sınırını, toplam alan derinliğini ve hiperfokal mesafeyi versin.",
  button: 'Hesapla',
  inputs: [
    { id: 'odak', label: 'Odak uzaklığı (mm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'diyafram', label: 'Diyafram (f/)', type: 'number', placeholder: 'Örn. 1,8' },
    { id: 'mesafe', label: 'Konu mesafesi (m)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'coc', label: 'Sensör (bulanıklık dairesi)', type: 'select', options: [['0.03', 'Tam kare – 0,030 mm'], ['0.02', 'APS-C – 0,020 mm'], ['0.015', 'Micro Four Thirds – 0,015 mm'], ['0.011', '1 inç tip – 0,011 mm']] },
  ],
  compute(v, h) {
    const f = h.pos(v.odak, 'Odak uzaklığı');
    const N = h.pos(v.diyafram, 'Diyafram');
    const sm = h.pos(v.mesafe, 'Konu mesafesi');
    const c = Number(v.coc) > 0 ? Number(v.coc) : 0.03;
    const s = sm * 1000;
    if (s <= f) h.err('Konu mesafesi odak uzaklığından büyük olmalı. Mesafeyi metre, odak uzaklığını milimetre olarak yazdığınızdan emin olun.');
    const H = f * f / (N * c) + f;
    const yakin = s * (H - f) / (H + s - 2 * f);
    const sonsuz = s >= H - 1e-9;
    const uzak = sonsuz ? Infinity : s * (H - f) / (H - s);
    const uz = (mm) => (mm >= 1000 ? h.fmt(mm / 1000, 2) + ' m' : h.fmt(mm / 10, 1) + ' cm');
    return {
      rows: [
        ['Toplam alan derinliği', sonsuz ? 'Sonsuz' : uz(uzak - yakin)],
        ['Yakın netlik sınırı', uz(yakin)],
        ['Uzak netlik sınırı', sonsuz ? 'Sonsuz' : uz(uzak)],
        ['Konunun önündeki net alan', uz(s - yakin)],
        ['Konunun arkasındaki net alan', sonsuz ? 'Sonsuz' : uz(uzak - s)],
        ['Hiperfokal mesafe', uz(H)],
        ['Bulanıklık dairesi', h.fmt(c, 3) + ' mm'],
      ],
      note: 'H = f² ÷ (N × c) + f. Mesafeler sensör düzleminden ölçülür. Netlik sınırı keskin bir çizgi değil, kabul edilebilir bulanıklığa göre tanımlanan bir eşiktir.',
    };
  },
  cases: [
    { in: { odak: '50', diyafram: '1,8', mesafe: '3', coc: '0.03' }, out: { 'Toplam alan derinliği': '38,4 cm', 'Yakın netlik sınırı': '2,82 m', 'Uzak netlik sınırı': '3,2 m', 'Hiperfokal mesafe': '46,35 m' } },
    { in: { odak: '24', diyafram: '11', mesafe: '5', coc: '0.03' }, out: { 'Toplam alan derinliği': 'Sonsuz', 'Yakın netlik sınırı': '1,3 m', 'Uzak netlik sınırı': 'Sonsuz', 'Hiperfokal mesafe': '1,77 m' } },
    { in: { odak: '50', diyafram: '8', mesafe: '3', coc: '0.03' }, out: { 'Toplam alan derinliği': '1,85 m', 'Yakın netlik sınırı': '2,34 m', 'Uzak netlik sınırı': '4,19 m', 'Hiperfokal mesafe': '10,47 m' } },
    { in: { odak: '35', diyafram: '2,8', mesafe: '2', coc: '0.02' }, out: { 'Toplam alan derinliği': '36,2 cm', 'Yakın netlik sınırı': '1,84 m', 'Uzak netlik sınırı': '2,2 m', 'Hiperfokal mesafe': '21,91 m' } },
    { in: { odak: '50', diyafram: '2', mesafe: '10', coc: '0.03' }, out: { 'Toplam alan derinliği': '5,06 m', 'Yakın netlik sınırı': '8,07 m', 'Uzak netlik sınırı': '13,14 m', 'Hiperfokal mesafe': '41,72 m' } },
    { in: { odak: '100', diyafram: '2,8', mesafe: '0,5', coc: '0.03' }, out: { 'Toplam alan derinliği': '0,3 cm', 'Yakın netlik sınırı': '49,8 cm', 'Uzak netlik sınırı': '50,2 cm' } },
    { in: { odak: '50', diyafram: '1,8', mesafe: '0,04', coc: '0.03' }, error: true },
    { in: { odak: '50', diyafram: '0', mesafe: '3', coc: '0.03' }, error: true },
    { in: { odak: '', diyafram: '1,8', mesafe: '3' }, error: true },
  ],
  howto: [
    'Lensin odak uzaklığını milimetre olarak yazın.',
    'Kullandığınız diyafram değerini girin; f/2,8 için 2,8, f/11 için 11 yazmanız yeterlidir.',
    'Netlediğiniz konunun makineye uzaklığını metre olarak yazın. 80 santimetre için 0,8 girin.',
    'Makinenizin sensör boyutunu seçin. Bu seçim, hesapta kullanılan bulanıklık dairesi değerini belirler.',
    'Hesapla düğmesine basın. Netliğin başladığı ve bittiği mesafeler, toplam alan derinliği ve hiperfokal mesafe listelenir.',
  ],
  sections: [
    { h: 'Alan derinliği nedir?', p: [
      'Bir lens yalnızca tek bir mesafeye tam olarak netleme yapar. O mesafenin önündeki ve arkasındaki nesneler giderek bulanıklaşır; ancak bulanıklık belirli bir düzeyi aşmadığı sürece göz bunu fark etmez ve o bölgeyi net olarak algılar. Net algılanan bu bölgenin derinliğine <strong>alan derinliği</strong> (İngilizce kısaltmasıyla DOF) denir.',
      'Alan derinliği dar olduğunda konu net, arka plan yumuşak ve bulanık görünür; portre ve ürün fotoğrafında aranan etki budur. Geniş olduğunda ön plandaki taştan ufuktaki dağa kadar her şey net çıkar; manzara ve mimari fotoğrafta tercih edilir. Hangisini elde edeceğinizi çekimden önce bilmek, diyafram ve mesafe seçimini deneme yanılmadan kurtarır.',
    ] },
    { h: 'Alan derinliğini belirleyen dört etken', ul: [
      '<strong>Diyafram:</strong> f sayısı küçüldükçe (f/1,8 gibi geniş açıklık) alan derinliği daralır; büyüdükçe (f/11, f/16) genişler.',
      '<strong>Odak uzaklığı:</strong> aynı mesafeden uzun odaklı lensle çekim alan derinliğini daraltır; geniş açı lensler doğal olarak geniş net alan verir.',
      '<strong>Konu mesafesi:</strong> konuya yaklaştıkça net alan hızla daralır. Makro çekimde derinlik milimetrelerle ölçülür.',
      '<strong>Sensör boyutu:</strong> hesapta bulanıklık dairesi üzerinden etkili olur. Küçük sensörde aynı kadraj için daha kısa odak uzaklığı kullanıldığından pratikte daha geniş alan derinliği elde edilir.',
    ] },
    { h: 'Formüller', p: [
      'Hesabın merkezinde <strong>hiperfokal mesafe</strong> vardır: <strong>H = f² ÷ (N × c) + f</strong>. Burada <em>f</em> odak uzaklığı, <em>N</em> diyafram sayısı, <em>c</em> bulanıklık dairesinin çapıdır. Konu mesafesi <em>s</em> olmak üzere yakın sınır <strong>s × (H − f) ÷ (H + s − 2f)</strong>, uzak sınır <strong>s × (H − f) ÷ (H − s)</strong> ile bulunur. Konu mesafesi hiperfokal mesafeye eşit ya da ondan büyükse uzak sınır sonsuza uzanır.',
      'Bulanıklık dairesi, bir noktanın sensör üzerinde nokta olarak algılanmaya devam ettiği en büyük leke çapıdır. Yaygın kabul, sensör köşegeninin yaklaşık 1.500\'de biridir: tam kare için 0,030 mm, APS-C için 0,020 mm, Micro Four Thirds için 0,015 mm. Bu değerler, orta boy bir baskıya normal mesafeden bakıldığı varsayımına dayanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Tam kare makinede 50 mm lens, f/1,8 diyafram ve 3 metre uzaktaki bir konu için hesaplayalım. Hiperfokal mesafe: 50² ÷ (1,8 × 0,03) + 50 = 2.500 ÷ 0,054 + 50 = 46.346 mm, yani 46,35 metre. Yakın sınır: 3.000 × 46.296 ÷ (46.346 + 3.000 − 100) = 2.820 mm, yani 2,82 metre. Uzak sınır: 3.000 × 46.296 ÷ (46.346 − 3.000) = 3.204 mm, yani 3,20 metre. Toplam alan derinliği yalnızca <strong>38,4 santimetredir</strong>; konunun 18 santimetre önü ve 20 santimetre arkası nettir.',
      'Aynı sahnede diyaframı f/8\'e kısarsanız hiperfokal mesafe 10,47 metreye iner, net alan 2,34 metreden 4,19 metreye uzanır ve toplam derinlik 1,85 metreye çıkar. Yan yana duran iki kişiyi çekerken f/1,8 yeterli olabilir; arka arkaya iki sıra hâlinde dizilmiş bir grubu çekerken diyaframı kısmanız gerektiği bu sayılardan açıkça görülür.',
    ] },
    { h: 'Hiperfokal mesafe nasıl kullanılır?', p: [
      'Hiperfokal mesafeye netleme yaptığınızda, bu mesafenin yarısından sonsuza kadar olan her şey kabul edilebilir netlikte olur. Manzara fotoğrafçıları bu yöntemi, ön plandaki ayrıntı ile ufku aynı karede net tutmak için kullanır. Örneğin tam karede 24 mm lens ve f/11 için hiperfokal mesafe 1,77 metredir; makineyi bu mesafeye netlediğinizde yaklaşık 90 santimetreden sonsuza kadar olan alan net çıkar.',
      'Sokak fotoğrafında aynı ilke "bölge netlemesi" olarak uygulanır: lens önceden belirli bir mesafeye ayarlanır ve otomatik netlemeyi beklemeden, konu net bölgeye girdiği anda deklanşöre basılır.',
    ] },
    { h: 'Sınırlar ve yorumlama', p: [
      'Netlik sınırları fiziksel bir duvar değildir; netlik, odak düzleminden uzaklaştıkça kademeli olarak azalır. Hesaplanan sınırlar, seçilen bulanıklık dairesi ölçütüne göre "kabul edilebilir" eşiği gösterir. Görüntüyü büyük basacak ya da ekranda yüzde yüz büyütmeyle inceleyecekseniz daha katı bir ölçüt gerekir ve gerçek net alan burada görünenden dar algılanır.',
      'Formüller ince mercek yaklaşımına dayanır ve mesafeleri sensör düzleminden ölçer. Çok yakın çekimlerde (makro) lensin iç yapısı sonucu etkilediğinden değerler yaklaşık kalır. Çok kısık diyaframlarda (f/16 ve ötesi) kırınım, alan derinliği artsa bile genel keskinliği düşürür; bu etki hesaba dahil değildir. Sonuçları çekim planı için bir kılavuz olarak kullanın ve önemli işlerde deneme karesiyle doğrulayın.',
    ] },
  ],
  faq: [
    ['Alan derinliğini azaltmak için ne yapmalıyım?', 'Diyaframı açın (küçük f sayısı), konuya yaklaşın ve daha uzun odak uzaklığı kullanın. Konu ile arka plan arasındaki mesafeyi artırmak da arka planın daha bulanık görünmesini sağlar.'],
    ['Hiperfokal mesafe ne demek?', 'Netleme yapıldığında, yarısından sonsuza kadar olan alanın net göründüğü mesafedir. Odak uzaklığının karesinin, diyafram ile bulanıklık dairesinin çarpımına bölünmesi ve odak uzaklığının eklenmesiyle bulunur.'],
    ['Bulanıklık dairesi nedir?', 'Bir noktanın sensörde oluşturduğu lekenin, göz tarafından hâlâ nokta olarak algılandığı en büyük çaptır. Tam kare sensör için yaygın kabul 0,030 milimetredir; sensör küçüldükçe değer de küçülür.'],
    ['Net alan konunun önünde ve arkasında eşit mi dağılır?', 'Hayır. Net alanın arkadaki bölümü her zaman öndekinden büyüktür. Yakın mesafelerde ikisi birbirine yaklaşır; mesafe arttıkça arka taraf hızla uzar ve hiperfokal mesafede sonsuza ulaşır.'],
    ['Küçük sensörlü makinelerde arka plan neden daha az bulanık?', 'Aynı kadrajı elde etmek için daha kısa odak uzaklığı kullanılır ve kısa odak uzaklığı alan derinliğini genişletir. Bu yüzden telefon kameralarında doğal arka plan bulanıklığı sınırlıdır.'],
    ['Sonuçta "Sonsuz" yazması ne anlama geliyor?', 'Konu mesafesi hiperfokal mesafeye ulaşmış ya da onu geçmiştir; yakın sınırdan itibaren ufka kadar her şey kabul edilebilir netliktedir.'],
    ['Mesafeyi nereden ölçmeliyim?', 'Konudan sensör düzlemine kadar ölçülür. Makinelerin üst kapağında içinden çizgi geçen daire biçimindeki işaret sensör düzleminin yerini gösterir. Gündelik mesafelerde lensin önünden ölçmek anlamlı bir fark yaratmaz.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kamera-lens-gorus-acisi-hesapla', 'crop-faktoru-hesapla', 'pozlama-hesapla', 'timelapse-hesapla', 'baski-piksel-boyutu-hesapla'],
};
