export default {
  slug: 'mama-olcek-hesapla',
  title: 'Bebek Maması Su Ölçek Hesaplama',
  h1Tail: 'kaç ml suya kaç ölçek',
  pageTitle: 'Bebek Maması Su Ölçek Hesaplama – Kaç ml Suya Kaç Ölçek?',
  description: 'Mama kutusundaki orana göre kaç ml suya kaç ölçek mama gerektiğini, günlük toplam su ve ölçek miktarını, kutunun kaç gün yeteceğini hesaplayın.',
  card: 'Kutudaki su-ölçek oranını girin; hazırlayacağınız biberon için ölçek sayısını ve günlük mama tüketimini görün.',
  category: 'gunluk',
  keywords: ['mama ölçek hesaplama', 'kaç ml suya kaç ölçek mama', 'bebek maması su oranı', '150 ml suya kaç ölçek', 'mama hazırlama oranı', 'mama kutusu kaç gün gider', 'biberon ölçek hesabı'],
  lead: 'Biberon hazırlarken su ile mama tozu arasındaki oran, kutunun üzerinde yazan orandan sapmamalıdır. Bu araç, <strong>kutunuzdaki oranı</strong> (bir ölçek için kaç ml su) temel alarak hazırlamak istediğiniz su miktarına kaç ölçek gerektiğini, tam ölçeğe denk gelmiyorsa en yakın uygun miktarları ve günlük tüketimi hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'su', label: 'Hazırlanacak su miktarı (ml)', type: 'number', placeholder: 'Örn. 150' },
    { id: 'oran', label: 'Kutudaki oran: 1 ölçek için su (ml)', type: 'number', value: '30', hint: 'Mama kutusundaki hazırlama tablosundan bakın; çoğu üründe 30, bazılarında 60' },
    { id: 'ogun', label: 'Günlük öğün sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 6' },
    { id: 'olcekGram', label: 'Bir ölçek kaç gram (isteğe bağlı)', type: 'number', placeholder: 'Kutuda yazar, örn. 4,5' },
    { id: 'kutuGram', label: 'Kutu ağırlığı (g, isteğe bağlı)', type: 'number', placeholder: 'Örn. 800' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const su = h.pos(v.su, 'Hazırlanacak su miktarı');
    if (su > 2000) h.err('"Hazırlanacak su miktarı" en fazla 2000 ml olabilir; tek bir hazırlama için miktarı yazın.');
    const oran = h.pos(v.oran, 'Kutudaki oran');
    const olcek = su / oran;
    const yakin = Math.round(olcek);
    const tam = Math.abs(olcek - yakin) < 1e-9;
    const rows = [['Gereken mama', `${h.fmt(olcek, 2)} ölçek`]];
    let note;
    if (tam) {
      note = 'Su miktarı tam ölçeğe denk geliyor. ';
    } else {
      const alt = Math.floor(olcek + 1e-9);
      const ust = alt + 1;
      if (alt >= 1) rows.push(['Alt tam ölçek seçeneği', `${alt} ölçek için ${h.fmt(alt * oran, 1)} ml su`]);
      rows.push(['Üst tam ölçek seçeneği', `${ust} ölçek için ${h.fmt(ust * oran, 1)} ml su`]);
      note = 'Bu su miktarı tam ölçeğe denk gelmiyor. Ölçeği yarım ya da tepeleme doldurmak yerine su miktarını tam ölçek seçeneklerinden birine göre ayarlayın. ';
    }
    let gunlukGram = null;
    if (dolu(v.ogun)) {
      const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
      if (ogun > 24) h.err('"Günlük öğün sayısı" en fazla 24 olabilir.');
      rows.push(['Günlük toplam su', `${h.fmt(su * ogun, 1)} ml`]);
      rows.push(['Günlük toplam ölçek', `${h.fmt(olcek * ogun, 2)} ölçek`]);
      if (dolu(v.olcekGram)) gunlukGram = olcek * ogun * h.pos(v.olcekGram, 'Bir ölçek kaç gram');
    }
    if (dolu(v.olcekGram)) {
      const g = h.pos(v.olcekGram, 'Bir ölçek kaç gram');
      rows.push(['Bir öğündeki mama tozu', `${h.fmt(olcek * g, 1)} g`]);
      if (gunlukGram !== null) rows.push(['Günlük mama tozu', `${h.fmt(gunlukGram, 1)} g`]);
    }
    if (dolu(v.kutuGram)) {
      const kutu = h.pos(v.kutuGram, 'Kutu ağırlığı');
      if (gunlukGram === null) h.err('Kutunun kaç gün yeteceğini hesaplamak için "Günlük öğün sayısı" ve "Bir ölçek kaç gram" alanlarını da doldurun.');
      rows.push(['Kutunun yeteceği süre', `${h.fmt(kutu / gunlukGram, 1)} gün`]);
    }
    return {
      rows,
      note: note + 'Oran ve hazırlama talimatı için her zaman kullandığınız mamanın kutusunu esas alın; bebeğinizin ne kadar ve ne sıklıkta besleneceğine çocuk doktorunuz karar verir.',
    };
  },
  cases: [
    { in: { su: '150', oran: '30' }, out: { 'Gereken mama': '5 ölçek' } },
    { in: { su: '100', oran: '30' }, out: { 'Gereken mama': '3,33 ölçek', 'Alt tam ölçek seçeneği': '3 ölçek için 90 ml su', 'Üst tam ölçek seçeneği': '4 ölçek için 120 ml su' } },
    { in: { su: '120', oran: '60' }, out: { 'Gereken mama': '2 ölçek' } },
    { in: { su: '180', oran: '30', ogun: '6', olcekGram: '4,5', kutuGram: '800' }, out: { 'Gereken mama': '6 ölçek', 'Günlük toplam su': '1.080 ml', 'Günlük toplam ölçek': '36 ölçek', 'Bir öğündeki mama tozu': '27 g', 'Günlük mama tozu': '162 g', 'Kutunun yeteceği süre': '4,9 gün' } },
    { in: { su: '90', oran: '30', ogun: '8' }, out: { 'Gereken mama': '3 ölçek', 'Günlük toplam su': '720 ml', 'Günlük toplam ölçek': '24 ölçek' } },
    { in: { su: '20', oran: '30' }, out: { 'Gereken mama': '0,67 ölçek', 'Üst tam ölçek seçeneği': '1 ölçek için 30 ml su' } },
    { in: { su: '', oran: '30' }, error: true },
    { in: { su: '150', oran: '0' }, error: true },
    { in: { su: '150', oran: '30', kutuGram: '800' }, error: true },
  ],
  howto: [
    'Mama kutusunun üzerindeki hazırlama tablosuna bakın ve bir ölçek mama için kaç ml su gerektiğini bulun; bu değeri "Kutudaki oran" alanına yazın.',
    '"Hazırlanacak su miktarı" alanına biberona koyacağınız su miktarını ml olarak girin.',
    'Günlük tüketimi de görmek isterseniz öğün sayısını, bir ölçeğin gramını ve kutu ağırlığını isteğe bağlı alanlara ekleyin.',
    '"Hesapla" düğmesine basın. Ölçek sayısı tam çıkmıyorsa araç, alt ve üst tam ölçek için uygun su miktarlarını ayrıca gösterir.',
  ],
  sections: [
    { h: 'Su ve ölçek oranı nasıl hesaplanır?', p: [
      'Mama üreticileri hazırlama oranını kutunun üzerinde açıkça belirtir. Hesap şudur: <strong>ölçek sayısı = su miktarı (ml) ÷ bir ölçek için gereken su (ml)</strong>. Piyasadaki pek çok devam ve bebek sütünde bir silme ölçek için 30 ml su kullanılır; bazı ürünlerde ise ölçek kaşığı daha büyüktür ve bir ölçek 60 ml suya karşılık gelir. Bu yüzden araç oranı sabitlemez, sizden ister. Marka ya da ürün değiştirdiğinizde oranı yeniden kontrol edin.',
      'Önemli bir ayrıntı: tabloda yazan miktar <strong>su miktarıdır</strong>, hazırlanmış mamanın hacmi değildir. Toz suya eklendiğinde hacim biraz artar; 150 ml suya 5 ölçek eklediğinizde biberondaki seviye 150 ml çizgisinin üzerine çıkar. Bu normaldir ve su miktarını azaltmanızı gerektirmez.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Kutuda "30 ml suya 1 ölçek" yazıyorsa ve 150 ml su ile biberon hazırlayacaksanız: 150 ÷ 30 = <strong>5 ölçek</strong>. Sonuç tam sayıdır, başka bir ayarlama gerekmez.',
      '100 ml su için aynı oranla 100 ÷ 30 = 3,33 ölçek çıkar. Ölçek kaşığıyla üçte bir ölçek doğru biçimde ölçülemez. Bu durumda araç iki seçenek gösterir: <strong>3 ölçek için 90 ml su</strong> ya da <strong>4 ölçek için 120 ml su</strong>. Su miktarını bu değerlerden birine çekmek, oranı bozmadan hazırlamanın yoludur.',
      'Günlük tüketim örneği: günde 6 öğün, her öğünde 180 ml su ve 6 ölçek kullanılıyor olsun. Günlük su 6 × 180 = 1.080 ml, günlük ölçek 36 eder. Bir ölçek 4,5 gram ise öğün başına 27 g, günde 162 g mama tozu harcanır. 800 gramlık bir kutu 800 ÷ 162 = yaklaşık <strong>4,9 gün</strong> yeter.',
    ] },
    { h: 'Oranı değiştirmek neden sakıncalı?', p: [
      'Mama tozunun suya oranı, bebeğin alacağı enerji ve besin ögelerinin yoğunluğunu belirler. Daha fazla toz koymak mamayı yoğunlaştırır ve bebeğin böbreklerine ve sindirimine fazladan yük bindirebilir; daha az toz koymak ise mamayı sulandırır ve bebeğin yeterince beslenmemesine yol açabilir. "Daha doyurucu olsun" ya da "kutu daha uzun gitsin" düşüncesiyle oranla oynamak doğru değildir.',
      'Doktorunuz özel bir durum nedeniyle farklı bir hazırlama biçimi önerdiyse onun tarifine uyun; bu araç yalnızca kutudaki standart oranı uygular.',
    ] },
    { h: 'Hazırlarken dikkat edilecek noktalar', ul: [
      'Ölçeği kutunun içinden çıkan kendi kaşığıyla alın; başka ürünün kaşığı farklı hacimde olabilir.',
      'Ölçeği bastırmadan doldurun ve üzerini kutunun kenarı ya da temiz bir bıçak sırtıyla silin. Tepeleme ya da sıkıştırılmış ölçek oranı bozar.',
      'Önce suyu, sonra mamayı ekleyin; böylece su miktarını biberonun çizgisinden doğru okursunuz.',
      'Suyun kaynatılması, soğutulacağı sıcaklık ve hazırlanan mamanın ne kadar süre bekleyebileceği konusunda kutudaki talimatı ve doktorunuzun önerisini izleyin.',
      'Biberonda artan mamayı bir sonraki öğüne saklamayın.',
    ] },
    { h: 'Kutunun kaç gün yeteceğini bilmek ne işe yarar?', p: [
      'Mama, bez ile birlikte bebekli bir evin en büyük düzenli harcamalarındandır ve tükenmesi beklenmedik bir anda eczane ya da market aramayı gerektirir. Kutunun yaklaşık kaç gün dayanacağını bilirseniz yedek kutuyu zamanında alır, kampanya dönemlerinde kaç kutu almanın mantıklı olduğunu görürsünüz. Bebek büyüdükçe öğün başına miktar arttığı için hesabı birkaç haftada bir güncelleyin. Açılan kutunun ne kadar sürede tüketilmesi gerektiği de ambalajda yazar; stok yaparken bunu göz önünde bulundurun.',
    ] },
    { h: 'Sınırlar ve sağlık uyarısı', p: [
      'Bu sayfa bir beslenme rehberi değildir; bebeğinizin günde kaç öğün ve öğün başına ne kadar mama alması gerektiğini söylemez. Bu miktarlar bebeğin yaşına, kilosuna ve sağlık durumuna göre değişir ve çocuk doktorunuz ya da aile hekiminiz tarafından belirlenmelidir. Araç yalnızca sizin girdiğiniz oranla aritmetik yapar. Kutudaki tablo ile araç sonucu arasında bir fark görürseniz kutudaki tabloyu esas alın.',
    ] },
  ],
  faq: [
    ['150 ml suya kaç ölçek mama konur?', 'Kutunuzda 30 ml suya 1 ölçek yazıyorsa 5 ölçek. Oran 60 ml suya 1 ölçek ise 2,5 ölçek çıkar; bu durumda 120 ml suya 2 ölçek ya da 180 ml suya 3 ölçek hazırlamak daha doğrudur.'],
    ['Yarım ölçek kullanabilir miyim?', 'Ölçek kaşığıyla yarım ya da üçte bir ölçeği hassas biçimde almak mümkün değildir. Su miktarını tam ölçeğe denk gelecek şekilde ayarlamak daha güvenlidir; araç bu miktarları sizin için gösterir.'],
    ['Her mamada oran 30 ml suya 1 ölçek midir?', 'Hayır. Yaygın oran bu olsa da ürünler arasında fark vardır ve ölçek kaşıklarının boyu da değişir. Mutlaka kullandığınız ürünün kutusundaki tabloya bakın.'],
    ['Hazırlanan mama neden yazdığım su miktarından fazla görünüyor?', 'Çünkü toz suya karıştığında hacim artar. Tablodaki değer eklenecek su miktarıdır; hazır mamanın hacmi bundan biraz fazla olur.'],
    ['Bir kutu mama kaç gün gider?', 'Kutu ağırlığını günlük kullanılan mama tozuna bölerek bulunur. Günde 162 g kullanan bir bebek için 800 g kutu yaklaşık 4,9 gün, 400 g kutu yaklaşık 2,5 gün yeter.'],
    ['Bir ölçeğin kaç gram olduğunu nereden öğrenirim?', 'Kutunun hazırlama tablosunda ya da besin değerleri bölümünde "1 ölçek yaklaşık … g" biçiminde yazar. Üründen ürüne değiştiği için tahmin yürütmeyin.'],
    ['Mamayı daha koyu hazırlarsam bebeğim daha uzun tok kalır mı?', 'Oranı kendi kendinize değiştirmeyin. Yoğun hazırlanan mama bebeğe zarar verebilir. Bebeğinizin doymadığını düşünüyorsanız miktar ve öğün düzenini doktorunuzla görüşün.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['bebek-bezi-hesapla', 'seyreltme-orani-hesapla', 'su-ihtiyaci-hesapla', 'cocuk-beden-bul', 'kahve-su-orani-hesapla'],
};
