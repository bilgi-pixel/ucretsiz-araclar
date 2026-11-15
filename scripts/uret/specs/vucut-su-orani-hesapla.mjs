export default {
  slug: 'vucut-su-orani-hesapla',
  title: 'Vücut Su Miktarı Hesaplama',
  h1Tail: 'toplam vücut suyu ve oranı',
  pageTitle: 'Vücut Su Miktarı Hesaplama – Toplam Vücut Suyu ve Su Oranı',
  description: 'Yaş, boy, kilo ve cinsiyetinize göre vücudunuzdaki toplam su miktarını litre olarak ve vücut ağırlığına oranını Watson formülüyle hesaplayın.',
  card: 'Boy, kilo, yaş ve cinsiyetinizi girin; vücudunuzdaki toplam su miktarını litre ve yüzde olarak Watson formülüyle görün.',
  category: 'saglik',
  keywords: ['vücut su oranı hesaplama', 'vücut su miktarı', 'toplam vücut suyu hesaplama', 'watson formülü', 'vücudun yüzde kaçı su', 'vücut su yüzdesi', 'hücre içi hücre dışı sıvı'],
  lead: 'Vücudunuzda yaklaşık kaç litre su bulunduğunu ve bunun vücut ağırlığınızın yüzde kaçına karşılık geldiğini hesaplayın. Araç, erişkinler için geliştirilmiş <strong>Watson formülünü</strong> kullanır ve suyun hücre içi ile hücre dışı bölmelere yaklaşık dağılımını da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: [['erkek', 'Erkek'], ['kadin', 'Kadın']] },
    { id: 'yas', label: 'Yaş', type: 'number', placeholder: 'Örn. 30', hint: 'Erkeklerde zorunlu; kadınlar için formül yaşı kullanmaz, boş bırakılabilir.' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 175' },
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
  ],
  compute(v, h) {
    const erkek = v.cinsiyet !== 'kadin';
    const boy = h.pos(v.boy, 'Boy');
    const kilo = h.pos(v.kilo, 'Kilo');
    if (boy < 130 || boy > 220) h.err('"Boy" 130 ile 220 cm arasında olmalı; değeri santimetre olarak yazın (örn. 175).');
    if (kilo < 30 || kilo > 250) h.err('"Kilo" 30 ile 250 kg arasında olmalı.');
    let su;
    if (erkek) {
      const yas = h.pos(v.yas, 'Yaş');
      if (yas < 18 || yas > 100) h.err('Formül erişkinler içindir; "Yaş" 18 ile 100 arasında olmalı.');
      su = 2.447 - 0.09156 * yas + 0.1074 * boy + 0.3362 * kilo;
    } else {
      if (String(v.yas ?? '').trim() !== '') {
        const yas = h.pos(v.yas, 'Yaş');
        if (yas < 18 || yas > 100) h.err('Formül erişkinler içindir; "Yaş" 18 ile 100 arasında olmalı.');
      }
      su = -2.097 + 0.1069 * boy + 0.2466 * kilo;
    }
    const oran = (su / kilo) * 100;
    return {
      rows: [
        ['Toplam vücut suyu', h.fmt(su, 1) + ' litre'],
        ['Vücut ağırlığına oranı', '%' + h.fmt(oran, 1)],
        ['Hücre içi sıvı (yaklaşık 2/3)', h.fmt((su * 2) / 3, 1) + ' litre'],
        ['Hücre dışı sıvı (yaklaşık 1/3)', h.fmt(su / 3, 1) + ' litre'],
        ['Su dışındaki kütle', h.fmt(kilo - su, 1) + ' kg'],
      ],
      note: 'Watson formülü sağlıklı erişkinlerden elde edilen bir tahmindir. Ödem, sıvı kaybı, gebelik ve ileri derecede kas ya da yağ fazlalığında gerçek değer sapabilir; sonuç tıbbi değerlendirme yerine geçmez.',
    };
  },
  cases: [
    { in: { cinsiyet: 'erkek', yas: '30', boy: '175', kilo: '70' }, out: { 'Toplam vücut suyu': '42 litre', 'Vücut ağırlığına oranı': '%60', 'Hücre içi sıvı (yaklaşık 2/3)': '28 litre', 'Hücre dışı sıvı (yaklaşık 1/3)': '14 litre', 'Su dışındaki kütle': '28 kg' } },
    { in: { cinsiyet: 'kadin', yas: '30', boy: '165', kilo: '60' }, out: { 'Toplam vücut suyu': '30,3 litre', 'Vücut ağırlığına oranı': '%50,6', 'Hücre içi sıvı (yaklaşık 2/3)': '20,2 litre', 'Hücre dışı sıvı (yaklaşık 1/3)': '10,1 litre' } },
    { in: { cinsiyet: 'erkek', yas: '50', boy: '180', kilo: '85' }, out: { 'Toplam vücut suyu': '45,8 litre', 'Vücut ağırlığına oranı': '%53,9', 'Hücre içi sıvı (yaklaşık 2/3)': '30,5 litre', 'Hücre dışı sıvı (yaklaşık 1/3)': '15,3 litre' } },
    { in: { cinsiyet: 'kadin', yas: '', boy: '170', kilo: '75' }, out: { 'Toplam vücut suyu': '34,6 litre', 'Vücut ağırlığına oranı': '%46,1' } },
    { in: { cinsiyet: 'erkek', yas: '25', boy: '170', kilo: '65' }, out: { 'Toplam vücut suyu': '40,3 litre', 'Vücut ağırlığına oranı': '%62' } },
    { in: { cinsiyet: 'erkek', yas: '70', boy: '168', kilo: '72' }, out: { 'Toplam vücut suyu': '38,3 litre', 'Vücut ağırlığına oranı': '%53,2' } },
    { in: { cinsiyet: 'erkek', yas: '', boy: '175', kilo: '70' }, error: true },
    { in: { cinsiyet: 'kadin', yas: '30', boy: '1,65', kilo: '60' }, error: true },
    { in: { cinsiyet: 'erkek', yas: '10', boy: '140', kilo: '35' }, error: true },
  ],
  howto: [
    'Cinsiyetinizi seçin; Watson formülü kadın ve erkekler için ayrı katsayılar kullanır.',
    'Yaşınızı yazın. Erkeklerde yaş hesaba girer; kadınlar için formülde yaş terimi bulunmadığından bu alan boş bırakılabilir.',
    'Boyunuzu santimetre, kilonuzu kilogram olarak girin.',
    '"Hesapla" düğmesine basın. Toplam vücut suyu litre olarak, ağırlığınıza oranı yüzde olarak, hücre içi ve hücre dışı dağılımıyla birlikte görünür.',
  ],
  sections: [
    { h: 'Toplam vücut suyu nedir?', p: [
      'İnsan vücudunun en büyük bileşeni sudur. Kanın sıvı kısmı, hücrelerin içi, hücreler arasındaki boşluklar, beyin omurilik sıvısı ve sindirim salgıları bu suyun parçalarıdır. Hepsinin toplamına <strong>toplam vücut suyu</strong> denir. Erişkin bir erkekte vücut ağırlığının kabaca yüzde 50–65\'i, erişkin bir kadında yüzde 45–60\'ı sudur; bebeklerde bu oran daha yüksektir, yaş ilerledikçe düşer.',
      'Oranın kişiden kişiye değişmesinin başlıca nedeni vücut bileşimidir. Kas dokusunun yaklaşık dörtte üçü suyken yağ dokusu çok az su içerir. Bu yüzden aynı kilodaki iki kişiden kaslı olanın su oranı daha yüksek, yağ oranı fazla olanın daha düşüktür. Kadınlarda ortalama yağ oranı daha yüksek olduğu için su yüzdesi erkeklere göre biraz daha düşük çıkar.',
    ] },
    { h: 'Watson formülü', p: [
      'Bu araç, 1980 yılında yayımlanan ve erişkinlerde toplam vücut suyunu basit vücut ölçülerinden tahmin eden Watson formülünü kullanır. Formül, vücut suyu izotop seyreltme yöntemiyle ölçülmüş yüzlerce erişkinin verisinden türetilmiştir ve klinikte, özellikle böbrek hastalıklarında ilaç ve diyaliz hesaplarında hâlâ sık kullanılır.',
    ], ul: [
      '<strong>Erkek:</strong> su (litre) = 2,447 − 0,09156 × yaş + 0,1074 × boy (cm) + 0,3362 × kilo (kg)',
      '<strong>Kadın:</strong> su (litre) = −2,097 + 0,1069 × boy (cm) + 0,2466 × kilo (kg)',
    ] },
    { h: 'Çözümlü örnek', p: [
      '30 yaşında, 175 cm boyunda ve 70 kg ağırlığında bir erkek için: 0,09156 × 30 = 2,747; 0,1074 × 175 = 18,795; 0,3362 × 70 = 23,534. Toplam 2,447 − 2,747 + 18,795 + 23,534 = 42,03, yani yaklaşık <strong>42 litre</strong>. Bu, 70 kilonun yaklaşık yüzde 60\'ıdır.',
      '165 cm boyunda, 60 kg ağırlığında bir kadın için: 0,1069 × 165 = 17,639; 0,2466 × 60 = 14,796. Toplam −2,097 + 17,639 + 14,796 = 30,34, yani yaklaşık <strong>30,3 litre</strong>; vücut ağırlığının yaklaşık yüzde 50,6\'sı.',
    ] },
    { h: 'Hücre içi ve hücre dışı sıvı', p: [
      'Fizyoloji kitaplarındaki klasik kabule göre toplam vücut suyunun yaklaşık <strong>üçte ikisi hücrelerin içinde</strong>, <strong>üçte biri hücrelerin dışında</strong> bulunur. Hücre dışı sıvının büyük bölümü dokular arasındaki sıvıdır; geri kalanı kan plazmasıdır. Araç bu oranları kullanarak iki bölmeyi litre olarak gösterir. 42 litre toplam suyu olan bir kişide bu yaklaşık 28 litre hücre içi, 14 litre hücre dışı sıvı demektir.',
      'Bu dağılım sağlıklı kişiler için bir ortalamadır. Kalp, böbrek ve karaciğer hastalıklarında, ödemde ya da ağır sıvı kaybında bölmeler arasındaki denge değişir; böyle durumlarda dağılım ancak klinik değerlendirme ve özel ölçümlerle belirlenebilir.',
    ] },
    { h: 'Sonuç ile günlük su ihtiyacı aynı şey değildir', p: [
      'Burada hesaplanan değer vücudunuzda <em>bulunan</em> suyun miktarıdır; bir günde <em>içmeniz gereken</em> su miktarı değildir. Vücut her gün idrar, ter, solunum ve dışkıyla su kaybeder ve bu kayıp içecekler, yiyeceklerdeki su ve metabolizma sırasında oluşan suyla yerine konur. Günlük ihtiyaç hava sıcaklığına, harekete ve beslenmeye göre değişir. İçmeniz gereken miktarı öğrenmek istiyorsanız su ihtiyacı hesaplama aracını kullanın.',
    ] },
    { h: 'Tartıdaki su oranı neden farklı çıkabilir?', p: [
      'Vücut analizi yapan tartılar ve el tipi cihazlar, vücuttan çok zayıf bir akım geçirerek direnci ölçer ve su miktarını buradan tahmin eder. Bu ölçüm, o günkü sıvı durumunuzdan, son öğünden, egzersizden ve hatta ayaklarınızın nemli olup olmamasından etkilenir. Watson formülü ise yalnızca yaş, boy ve kiloya bakar; aynı ölçülerdeki sporcu ile hareketsiz kişi için aynı sonucu verir. İki yöntemin birkaç puan farklı sonuç vermesi olağandır.',
      'Formül 18 yaş üstü erişkinler içindir; çocuklarda, gebelikte, uzuv kaybında, ileri derecede obezitede ve vücutta sıvı birikimi olan hastalıklarda güvenilirliği azalır. Sonuçlar bilgilendirme amaçlıdır; sıvı kısıtlaması, diyaliz ya da ilaç dozu gibi tıbbi kararlar için hekiminize danışın.',
    ] },
  ],
  faq: [
    ['Vücudun yüzde kaçı sudur?', 'Erişkin erkeklerde vücut ağırlığının yaklaşık yüzde 50–65\'i, kadınlarda yüzde 45–60\'ı sudur. Kas oranı arttıkça yüzde yükselir, yağ oranı arttıkça düşer.'],
    ['70 kiloluk bir insanda kaç litre su bulunur?', '30 yaşında, 175 cm boyunda ve 70 kg ağırlığındaki bir erkek için Watson formülü yaklaşık 42 litre verir. Aynı kilodaki bir kadında ya da daha yaşlı birinde bu değer daha düşük olur.'],
    ['Kadınlarda neden yaş sorulmuyor?', 'Watson formülünün kadınlar için olan denkleminde yaş terimi yoktur; çalışmada yaşın kadınlardaki tahmine anlamlı katkısı bulunmamıştır. Bu yüzden yaş alanını boş bırakabilirsiniz.'],
    ['Çok su içersem vücut su oranım yükselir mi?', 'Kısa süreliğine çok az değişir; sağlıklı böbrekler fazla suyu hızla atar. Kalıcı su oranını belirleyen asıl etken kas ve yağ dokusunun miktarıdır.'],
    ['Su oranımın düşük çıkması susuz kaldığım anlamına mı gelir?', 'Hayır. Formül anlık sıvı durumunuzu ölçmez; yalnızca vücut ölçülerinize göre beklenen ortalamayı verir. Düşük yüzde çoğunlukla yağ oranının yüksek olmasından kaynaklanır.'],
    ['Yaş ilerledikçe vücut suyu neden azalır?', 'Yaşla birlikte kas kütlesi azalma, yağ oranı artma eğilimindedir. Kas su açısından zengin olduğu için toplam vücut suyu ve oranı düşer; erkek formülündeki eksi işaretli yaş terimi bunu yansıtır.'],
    ['Bu hesap çocuklar için kullanılabilir mi?', 'Hayır. Watson formülü erişkin verilerinden türetilmiştir. Çocuklarda vücut su oranı yaşa göre hızla değişir ve farklı denklemler kullanılır.'],
    ['Girdiğim boy ve kilo bilgileri kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerleriniz sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['su-ihtiyaci-hesapla', 'vucut-yag-orani-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'vki-hesapla', 'terleme-orani-hesapla'],
};
