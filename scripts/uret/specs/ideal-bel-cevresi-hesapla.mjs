export default {
  slug: 'ideal-bel-cevresi-hesapla',
  title: 'İdeal Bel Çevresi Hesaplama',
  h1Tail: 'boya göre bel çevresi sınırı',
  pageTitle: 'İdeal Bel Çevresi Hesaplama – Boya Göre Bel Çevresi Kaç Olmalı?',
  description: 'Boyunuza göre önerilen en yüksek bel çevresini hesaplayın. Bel çevrenizi de yazarsanız bel-boy oranınızı, risk aralığını ve hedefe kaç santim kaldığını görün.',
  card: 'Boyunuza göre bel çevrenizin kaç santimi geçmemesi gerektiğini ve mevcut ölçünüzün hedefe uzaklığını görün.',
  category: 'saglik',
  keywords: ['ideal bel çevresi hesaplama', 'bel çevresi kaç olmalı', 'boya göre bel çevresi', 'bel çevresi sınırı kadın erkek', 'bel boy oranı', 'bel çevresi nasıl ölçülür', 'göbek çevresi kaç olmalı'],
  lead: 'Boyunuzu girin; araç, "bel çevreniz boyunuzun yarısından az olsun" kuralına göre <strong>önerilen en yüksek bel çevresini</strong> ve sağlıklı kabul edilen aralığı hesaplasın. Mevcut bel çevrenizi de yazarsanız bel-boy oranınızı, hangi aralıkta olduğunuzu ve hedefe kaç santimetre uzakta olduğunuzu görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 175' },
    { id: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: [['erkek', 'Erkek'], ['kadin', 'Kadın']] },
    { id: 'bel', label: 'Mevcut bel çevresi (cm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 92', hint: 'Boş bırakırsanız yalnızca boyunuza göre hedef değerler gösterilir.' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    if (boy < 3) h.err('Boyu santimetre olarak yazın (örn. 1,75 yerine 175).');
    if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı.');
    const kadin = v.cinsiyet === 'kadin';
    const ust = boy * 0.5;
    const rows = [
      ['Önerilen en yüksek bel çevresi', h.fmt(ust, 1) + ' cm'],
      ['Sağlıklı kabul edilen aralık', `${h.fmt(boy * 0.4, 1)}–${h.fmt(ust, 1)} cm`],
      ['Belirgin risk sınırı (boyun %60\'ı)', h.fmt(boy * 0.6, 1) + ' cm'],
      ['Cinsiyete göre genel eşikler', kadin ? '80 cm üstü artmış risk, 88 cm üstü yüksek risk' : '94 cm üstü artmış risk, 102 cm üstü yüksek risk'],
    ];
    const belHam = String(v.bel ?? '').trim();
    if (belHam !== '') {
      const bel = h.pos(belHam, 'Bel çevresi');
      if (bel < 30 || bel > 250) h.err('Bel çevresi 30 ile 250 cm arasında olmalı.');
      if (bel >= boy) h.err('Bel çevresi boydan büyük ya da boya eşit olamaz; iki değeri de santimetre olarak yazdığınızdan emin olun.');
      const oran = bel / boy;
      let yorum;
      if (oran < 0.4 - 1e-9) yorum = 'Düşük (0,40 altı)';
      else if (oran < 0.5 - 1e-9) yorum = 'Sağlıklı aralıkta (0,40–0,50)';
      else if (oran < 0.6 - 1e-9) yorum = 'Artmış risk (0,50–0,60)';
      else yorum = 'Belirgin artmış risk (0,60 ve üstü)';
      const fark = bel - ust;
      rows.push(['Bel-boy oranınız', h.fmt(oran, 2)]);
      rows.push(['Değerlendirme', yorum]);
      rows.push(['Önerilen sınıra göre', Math.abs(fark) < 1e-9 ? 'Tam sınırda' : fark > 0 ? `${h.fmt(fark, 1)} cm fazla` : `Sınırın ${h.fmt(-fark, 1)} cm altında`]);
    }
    return {
      rows,
      note: 'Önerilen sınır "bel çevresi boyun yarısından az olmalı" kuralına dayanır. Sonuç bilgilendirme amaçlıdır; tanı koymaz, hekim ya da diyetisyen değerlendirmesinin yerini tutmaz.',
    };
  },
  cases: [
    { in: { boy: '175', cinsiyet: 'erkek' }, out: { 'Önerilen en yüksek bel çevresi': '87,5 cm', 'Sağlıklı kabul edilen aralık': '70–87,5 cm', 'Belirgin risk sınırı (boyun %60\'ı)': '105 cm', 'Cinsiyete göre genel eşikler': '94 cm üstü artmış risk, 102 cm üstü yüksek risk' } },
    { in: { boy: '160', cinsiyet: 'kadin', bel: '85' }, out: { 'Önerilen en yüksek bel çevresi': '80 cm', 'Bel-boy oranınız': '0,53', 'Değerlendirme': 'Artmış risk (0,50–0,60)', 'Önerilen sınıra göre': '5 cm fazla', 'Cinsiyete göre genel eşikler': '80 cm üstü artmış risk, 88 cm üstü yüksek risk' } },
    { in: { boy: '180', cinsiyet: 'erkek', bel: '85' }, out: { 'Önerilen en yüksek bel çevresi': '90 cm', 'Bel-boy oranınız': '0,47', 'Değerlendirme': 'Sağlıklı aralıkta (0,40–0,50)', 'Önerilen sınıra göre': 'Sınırın 5 cm altında' } },
    { in: { boy: '170', cinsiyet: 'kadin', bel: '102' }, out: { 'Bel-boy oranınız': '0,6', 'Değerlendirme': 'Belirgin artmış risk (0,60 ve üstü)', 'Önerilen sınıra göre': '17 cm fazla' } },
    { in: { boy: '165', cinsiyet: 'kadin', bel: '60' }, out: { 'Bel-boy oranınız': '0,36', 'Değerlendirme': 'Düşük (0,40 altı)', 'Sağlıklı kabul edilen aralık': '66–82,5 cm' } },
    { in: { boy: '170', cinsiyet: 'erkek', bel: '85' }, out: { 'Bel-boy oranınız': '0,5', 'Değerlendirme': 'Artmış risk (0,50–0,60)', 'Önerilen sınıra göre': 'Tam sınırda' } },
    { in: { boy: '200', cinsiyet: 'erkek' }, out: { 'Önerilen en yüksek bel çevresi': '100 cm', 'Sağlıklı kabul edilen aralık': '80–100 cm', 'Belirgin risk sınırı (boyun %60\'ı)': '120 cm' } },
    { in: { boy: '1,75', cinsiyet: 'erkek' }, error: true },
    { in: { boy: '', cinsiyet: 'erkek', bel: '90' }, error: true },
    { in: { boy: '160', cinsiyet: 'kadin', bel: '170' }, error: true },
  ],
  howto: [
    'Boyunuzu santimetre olarak yazın; ayakkabısız ölçülen değeri kullanın.',
    'Cinsiyetinizi seçin; bu, sonuçta gösterilen cinsiyete özgü genel eşik değerlerini belirler.',
    'İsterseniz mevcut bel çevrenizi yazın. Ölçümü çıplak ten üzerinden, nefes verdikten sonra, mezurayı sıkmadan yapın.',
    '"Hesapla" düğmesine basın. Boyunuza göre önerilen üst sınır ilk satırda, oranınız ve değerlendirme altta görünür.',
    'Ölçümü birkaç haftada bir aynı koşullarda tekrarlayıp sonucu not ederek değişimi izleyin.',
  ],
  sections: [
    { h: 'Bel çevresi neden önemlidir?', p: [
      'Tartı ve vücut kitle indeksi toplam ağırlık hakkında bilgi verir, ancak yağın vücutta <em>nerede</em> toplandığını söylemez. Karın bölgesinde, iç organların çevresinde biriken yağ (iç organ yağı), kalça ve bacaklarda deri altında biriken yağa göre kalp-damar hastalıkları, tip 2 diyabet ve yüksek tansiyon riskiyle daha yakından ilişkilendirilir. Bel çevresi, bu karın içi yağlanmanın evde bir mezurayla alınabilecek en basit göstergesidir.',
      'Bu yüzden normal kilolu görünen ama bel çevresi geniş olan bir kişi, tartıda daha ağır ama yağı kalça çevresinde toplanan bir kişiden daha yüksek risk taşıyabilir. Bel çevresini izlemek, kilo izlemenin tamamlayıcısıdır.',
    ] },
    { h: 'Boya göre hesap: bel çevresi boyun yarısından az olmalı', p: [
      'Sabit eşik değerlerinin bir zayıflığı vardır: 155 cm boyundaki biriyle 195 cm boyundaki birine aynı sınır uygulanır. Bunu düzeltmek için bel çevresi boya oranlanır. Yaygın olarak önerilen sade kural şudur: <strong>bel çevreniz boyunuzun yarısından az olsun</strong>. Yani bel-boy oranı 0,5\'in altında kalmalıdır.',
      'Formül: <strong>önerilen en yüksek bel çevresi = boy × 0,5</strong>. Sağlıklı kabul edilen aralık boyun %40\'ı ile %50\'si arasıdır; 0,5 ile 0,6 arası artmış risk, 0,6 ve üstü belirgin artmış risk olarak anılır.',
      'Çözümlü örnek: 175 cm boyundaki bir kişi için üst sınır 175 × 0,5 = 87,5 cm\'dir. Sağlıklı aralık 70 ile 87,5 cm arasıdır; 105 cm (boyun %60\'ı) ve üstü belirgin risk bölgesidir.',
      'İkinci örnek: 160 cm boyunda, bel çevresi 85 cm olan bir kadın. Önerilen sınır 80 cm\'dir. Bel-boy oranı 85 ÷ 160 = 0,53 çıkar ve artmış risk aralığına düşer; sınırın altına inmek için bel çevresinin 5 cm\'den fazla azalması gerekir.',
    ] },
    { h: 'Cinsiyete göre sabit eşikler', p: [
      'Dünya Sağlık Örgütü\'nün uzman raporlarında ve birçok kılavuzda Avrupa kökenli yetişkinler için sık anılan sabit eşikler de vardır. Araç bunları bilgi olarak ayrıca gösterir:',
    ], ul: [
      '<strong>Erkekler:</strong> 94 cm üstü artmış risk, 102 cm üstü yüksek risk',
      '<strong>Kadınlar:</strong> 80 cm üstü artmış risk, 88 cm üstü yüksek risk',
    ] },
    { h: 'İki yöntem neden farklı sonuç verebilir?', p: [
      'Sabit eşikler boyu hesaba katmadığı için kısa ve uzun boylularda boya göre hesapla çelişebilir. 190 cm boyunda bir erkek için boya göre sınır 95 cm\'dir ve sabit eşikle neredeyse aynıdır; 165 cm boyunda bir erkek için ise boya göre sınır 82,5 cm iken sabit eşik yine 94 cm\'dir. Kısa boylu kişilerde boya göre hesap daha erken uyarı verir.',
      'Ayrıca farklı toplumlar için farklı eşikler önerilmiştir; örneğin Güney ve Doğu Asya kökenli yetişkinlerde daha düşük değerler kullanılır. Hangi ölçütün sizin için uygun olduğunu hekiminiz belirler; bu sayfadaki değerler genel bilgilendirme niteliğindedir.',
    ] },
    { h: 'Bel çevresi doğru nasıl ölçülür?', ol: [
      'Ayakta dik durun, ayaklarınızı omuz genişliğinde açın ve karın bölgenizi açın; kıyafet üzerinden ölçmeyin.',
      'En alt kaburganızın alt kenarını ve kalça kemiğinizin üst çıkıntısını parmaklarınızla bulun. Mezurayı bu iki noktanın tam ortasından geçirin; bu çoğu kişide göbek deliğinin biraz üzerine denk gelir.',
      'Mezuranın yere paralel olduğundan ve sırtınızda kıvrılmadığından emin olun.',
      'Normal bir nefes verin; karnınızı içeri çekmeyin, şişirmeyin.',
      'Mezurayı tene değecek ama bastırmayacak kadar gergin tutup değeri okuyun. İki kez ölçüp ortalamasını alın.',
    ], p: [
      'Pantolon bedeni bel çevresi değildir: pantolonlar çoğunlukla kalça kemiğinin üzerinde, daha aşağıda durur ve kalıplar markaya göre değişir. Ölçümü her seferinde günün aynı saatinde, tercihen sabah aç karnına yapmak karşılaştırmayı kolaylaştırır.',
    ] },
    { h: 'Sınırlar ve uyarılar', p: [
      'Bu hesap yetişkinler içindir. Gebelikte, karında sıvı toplanması ya da kitle gibi durumlarda bel çevresi yağlanmayı yansıtmaz. Çocuk ve ergenlerde değerlendirme yaşa göre yapılır. 0,40\'ın altındaki oranlar bazı kaynaklarda zayıflık göstergesi sayılır; bu durumda bel çevresini daha da inceltmeyi hedeflemek doğru değildir.',
      '"İdeal" sözcüğü estetik bir ölçüyü değil, sağlık açısından önerilen üst sınırı anlatır. Araç bir tarama göstergesi sunar; tanı koymaz. Bel çevrenizi azaltmak için beslenme ve egzersiz programına başlamadan önce, özellikle süregelen bir hastalığınız varsa, hekiminize ya da diyetisyeninize danışın.',
    ] },
  ],
  faq: [
    ['Bel çevresi kaç santim olmalı?', 'Sade kural, bel çevresinin boyun yarısından az olmasıdır. 170 cm boyundaki bir yetişkin için bu 85 cm\'nin altı demektir. Sabit eşik olarak ise erkeklerde 94 cm, kadınlarda 80 cm üstü artmış risk kabul edilir.'],
    ['175 cm boy için ideal bel çevresi nedir?', 'Önerilen üst sınır 87,5 cm\'dir. Boyun %40\'ı ile %50\'si arasındaki 70–87,5 cm aralığı sağlıklı kabul edilir.'],
    ['Bel-boy oranı nasıl hesaplanır?', 'Bel çevresi boya bölünür; iki değer de aynı birimde olmalıdır. 85 cm bel ve 160 cm boy için 85 ÷ 160 = 0,53 bulunur.'],
    ['Kadın ve erkek için sınır farklı mı?', 'Boya göre hesapta 0,5 kuralı her iki cinsiyet için aynıdır. Sabit eşiklerde ise fark vardır: erkeklerde 94 ve 102 cm, kadınlarda 80 ve 88 cm değerleri kullanılır.'],
    ['Bel çevresini nereden ölçmeliyim?', 'En alt kaburganın alt kenarı ile kalça kemiğinin üst çıkıntısı arasındaki orta noktadan, mezura yere paralel olacak şekilde ve normal nefes verdikten sonra ölçün. Göbeğin en geniş yerinden ya da pantolon belinden ölçmek farklı sonuç verir.'],
    ['Vücut kitle indeksim normal ama bel çevrem geniş, bu ne anlama gelir?', 'Toplam ağırlığınız boyunuza göre olağan olsa da yağın karın bölgesinde toplandığını gösterebilir. Bu durum kılavuzlarda ayrı bir risk göstergesi olarak ele alınır; hekiminizle görüşmeniz yerinde olur.'],
    ['Bel çevresi ne kadar sürede azalır?', 'Kişiden kişiye çok değişir ve yalnızca belirli bir bölgeden yağ yakmak mümkün değildir. Dengeli beslenme ve düzenli hareketle toplam yağ azaldıkça bel çevresi de küçülür. Kişisel hedef ve süre için diyetisyen ya da hekim desteği alın.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; boy ve bel ölçüleriniz sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['bel-boy-orani-hesapla', 'bel-kalca-orani-hesapla', 'vki-hesapla', 'ponderal-indeks-hesapla', 'kalori-hesapla'],
};
