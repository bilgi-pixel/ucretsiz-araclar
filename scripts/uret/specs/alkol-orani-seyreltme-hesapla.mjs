export default {
  slug: 'alkol-orani-seyreltme-hesapla',
  title: 'Kolonya ve Alkol Seyreltme Hesaplama',
  h1Tail: 'kaç ml alkol, kaç ml su?',
  pageTitle: 'Kolonya ve Alkol Seyreltme Hesaplama – 96 Dereceden 80 Dereceye',
  description: 'Yüksek dereceli etil alkolü istediğiniz dereceye indirmek için gereken alkol ve saf su miktarını hesaplayın. Kolonya ve dezenfektan karışımları için hacimce yüzde hesabı.',
  card: 'Etil alkolü hedef dereceye indirmek için ne kadar alkol ve ne kadar saf su gerektiğini hacimce hesaplayın.',
  category: 'gunluk',
  keywords: ['alkol seyreltme hesaplama', 'kolonya yapımı hesaplama', '96 derece alkol 80 derece yapma', 'alkol su oranı', 'etil alkol sulandırma', 'kolonya kaç derece', '70 derece alkol hazırlama'],
  lead: 'Elinizdeki etil alkolün derecesini ve ulaşmak istediğiniz dereceyi yazın. Araç, <strong>C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub></strong> eşitliğiyle kaç mililitre alkole kaç mililitre saf su ekleneceğini hesaplar; ister eldeki alkol miktarından, ister istenen son hacimden yola çıkabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'c1', label: 'Eldeki alkolün derecesi (% hacim)', type: 'number', value: '96', placeholder: 'Örn. 96' },
    { id: 'c2', label: 'Hedef derece (% hacim)', type: 'number', value: '80', placeholder: 'Örn. 80' },
    { id: 'mod', label: 'Bilinen miktar', type: 'select', options: [['son', 'İstediğim son karışım hacmi'], ['alkol', 'Elimdeki alkolün hacmi']] },
    { id: 'hacim', label: 'Hacim (ml)', type: 'number', placeholder: 'Örn. 1000' },
  ],
  compute(v, h) {
    const c1 = h.pos(v.c1, 'Eldeki alkolün derecesi');
    const c2 = h.pos(v.c2, 'Hedef derece');
    const hacim = h.pos(v.hacim, 'Hacim');
    if (c1 > 100) h.err('Alkol derecesi 100\'den büyük olamaz; hacimce yüzde değerini yazın (örn. 96).');
    if (c2 > c1 + 1e-9) h.err('Hedef derece, eldeki alkolün derecesinden yüksek olamaz; su ekleyerek derece yalnızca düşürülür.');
    let alkol, son;
    if (v.mod === 'alkol') { alkol = hacim; son = hacim * c1 / c2; }
    else { son = hacim; alkol = hacim * c2 / c1; }
    const su = son - alkol;
    const saf = alkol * c1 / 100;
    const oran = alkol > 0 ? su / alkol : 0;
    return {
      rows: [
        ['Eklenecek saf su', h.fmt(su, 2) + ' ml'],
        [`Gerekli alkol (${h.fmt(c1, 2)}°)`, h.fmt(alkol, 2) + ' ml'],
        ['Son karışım (kuramsal)', h.fmt(son, 2) + ' ml'],
        ['Karışımdaki saf etanol', h.fmt(saf, 2) + ' ml'],
        ['Su / alkol oranı', `1 ölçü alkole ${h.fmt(oran, 3)} ölçü su`],
      ],
      note: 'Hesap hacimce yüzdeye göredir. Alkol ve su karışınca toplam hacim bir miktar büzüldüğü için gerçek son hacim kuramsal değerden biraz az çıkar; kesin derece için alkolmetreyle ölçün.',
    };
  },
  cases: [
    { in: { c1: '96', c2: '80', mod: 'son', hacim: '1000' }, out: { 'Eklenecek saf su': '166,67 ml', 'Gerekli alkol (96°)': '833,33 ml', 'Karışımdaki saf etanol': '800 ml' } },
    { in: { c1: '96', c2: '80', mod: 'alkol', hacim: '500' }, out: { 'Eklenecek saf su': '100 ml', 'Son karışım (kuramsal)': '600 ml', 'Su / alkol oranı': '1 ölçü alkole 0,2 ölçü su' } },
    { in: { c1: '96', c2: '70', mod: 'son', hacim: '500' }, out: { 'Gerekli alkol (96°)': '364,58 ml', 'Eklenecek saf su': '135,42 ml' } },
    { in: { c1: '99,9', c2: '80', mod: 'son', hacim: '250' }, out: { 'Gerekli alkol (99,9°)': '200,2 ml', 'Eklenecek saf su': '49,8 ml' } },
    { in: { c1: '80', c2: '80', mod: 'son', hacim: '400' }, out: { 'Eklenecek saf su': '0 ml', 'Gerekli alkol (80°)': '400 ml' } },
    { in: { c1: '96', c2: '60', mod: 'alkol', hacim: '1000' }, out: { 'Son karışım (kuramsal)': '1.600 ml', 'Eklenecek saf su': '600 ml', 'Karışımdaki saf etanol': '960 ml' } },
    { in: { c1: '70', c2: '80', mod: 'son', hacim: '1000' }, error: true },
    { in: { c1: '120', c2: '80', mod: 'son', hacim: '1000' }, error: true },
    { in: { c1: '96', c2: '80', mod: 'son', hacim: '' }, error: true },
  ],
  howto: [
    'Aldığınız etil alkolün etiketindeki dereceyi ilk alana yazın (çoğu zaman 96).',
    'Ulaşmak istediğiniz dereceyi girin; geleneksel kolonya için 80, cilt ve yüzey dezenfeksiyonu için çoğunlukla 70 kullanılır.',
    'Hesabı neye göre yapacağınızı seçin: doldurmak istediğiniz şişenin hacmi belliyse "son karışım hacmi", elinizde belli miktar alkol varsa "elimdeki alkolün hacmi".',
    'Hacmi mililitre olarak yazıp "Hesapla" düğmesine basın; eklenecek su ve gereken alkol miktarını okuyun.',
    'Önce alkolü, sonra suyu ölçüp karıştırın. Esans kullanacaksanız alkole ekleyip çözdürdükten sonra suyu katın.',
  ],
  sections: [
    { h: 'Formül ve mantığı', p: [
      'Seyreltme sırasında karışımdaki saf etanol miktarı değişmez; yalnızca toplam hacim büyür. Bu yüzden başlangıçtaki ve sondaki saf etanol birbirine eşitlenir: <strong>C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub></strong>. Burada C<sub>1</sub> eldeki alkolün hacimce yüzdesi, V<sub>1</sub> kullanılacak alkol hacmi, C<sub>2</sub> hedef yüzde, V<sub>2</sub> son karışımın hacmidir. Eklenecek su ise aradaki farktır: <strong>su = V<sub>2</sub> − V<sub>1</sub></strong>.',
      'Son hacim biliniyorsa gereken alkol V<sub>1</sub> = V<sub>2</sub> × C<sub>2</sub> ÷ C<sub>1</sub> olur. Eldeki alkol biliniyorsa ulaşılacak son hacim V<sub>2</sub> = V<sub>1</sub> × C<sub>1</sub> ÷ C<sub>2</sub> ile bulunur. "Derece" sözcüğü Türkiye\'de gündelik dilde hacimce alkol yüzdesi anlamında kullanılır; 80 derece kolonya, hacminin yüzde 80\'i etanol olan kolonyadır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 1 litre 80 derece kolonya:</strong> 96 derecelik alkolden V<sub>1</sub> = 1000 × 80 ÷ 96 = 833,33 ml gerekir. Üzerine 1000 − 833,33 = 166,67 ml saf su eklenir. Karışımda 800 ml saf etanol bulunur.',
      '<strong>Örnek 2 – Eldeki 500 ml alkolün tamamını 80 dereceye indirmek:</strong> V<sub>2</sub> = 500 × 96 ÷ 80 = 600 ml. Yani 500 ml alkole 100 ml su katılır; her bir ölçü alkole 0,2 ölçü su düşer.',
      '<strong>Örnek 3 – 500 ml 70 derece çözelti:</strong> 500 × 70 ÷ 96 = 364,58 ml alkol ve 135,42 ml su.',
    ] },
    { h: 'Hacim büzülmesi: Neden tam 1 litre çıkmıyor?', p: [
      'Etanol ve su molekülleri karıştığında birbirlerinin arasındaki boşluklara yerleşir ve toplam hacim, iki sıvının ayrı ayrı hacimleri toplamından biraz küçük olur. Bu olaya hacim büzülmesi denir ve karışım ısınarak kendini belli eder. 833 ml alkole 167 ml su eklediğinizde ölçü kabında 1000 ml\'nin biraz altında bir seviye görürsünüz.',
      'Büzülme nedeniyle, kuramsal su miktarıyla hazırlanan karışımın derecesi hedefin çok az üzerinde kalır. Ev kullanımı için bu fark önemsizdir. Kesin dereceye ihtiyaç duyulan işlerde yöntem şudur: hesaplanan alkolü ölçü kabına koyun, ardından suyu toplam hacim hedef çizgiye gelene kadar ekleyin ve karışım oda sıcaklığına döndükten sonra alkolmetreyle kontrol edin. Alkolmetreler genellikle 20 °C için ayarlıdır; sıcak karışımda yanlış okur.',
    ] },
    { h: 'Ev yapımı kolonyada dikkat edilecekler', ul: [
      '<strong>Yalnızca etil alkol (etanol) kullanın.</strong> Metil alkol (metanol) zehirlidir; cilde sürülmesi ve buharının solunması bile ağır zehirlenmeye yol açabilir. İçeriği belirsiz, etiketsiz ya da açıkta satılan alkolü kullanmayın.',
      'Su olarak saf su ya da kaynatılıp soğutulmuş, kireci düşük su tercih edin; musluk suyundaki mineraller bulanıklık ve tortu yapabilir.',
      'Esans (limon, lavanta vb.) önce alkolde çözülür, su en son eklenir. Esans oranı genellikle toplam hacmin yüzde 1–3\'ü düzeyindedir; fazla esans ciltte tahrişe neden olabilir.',
      'Karışımı koyu renkli, ağzı sıkı kapanan cam şişede birkaç gün dinlendirmek kokunun oturmasına yardım eder.',
      'Alkol son derece yanıcıdır. Ocak, çakmak, soba gibi ateş kaynaklarından uzakta, iyi havalanan bir yerde çalışın; çocukların ulaşamayacağı yerde saklayın.',
    ] },
    { h: 'Hızlı başvuru: 96 derecelik alkolden 1 litre karışım', ul: [
      '<strong>90 derece:</strong> 937,5 ml alkol + 62,5 ml su',
      '<strong>80 derece:</strong> 833,33 ml alkol + 166,67 ml su',
      '<strong>70 derece:</strong> 729,17 ml alkol + 270,83 ml su',
      '<strong>60 derece:</strong> 625 ml alkol + 375 ml su',
      '<strong>50 derece:</strong> 520,83 ml alkol + 479,17 ml su',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca su ekleyerek dereceyi düşürme hesabı yapar; hedef derece eldekinden yüksek olamaz. İki farklı dereceli alkolü birbirine karıştırma ya da ağırlıkça yüzde hesabı bu sayfanın kapsamında değildir. Sonuçlar bilgilendirme amaçlıdır; tıbbi dezenfeksiyon, laboratuvar ya da ticari üretim gibi doğruluğun kritik olduğu işlerde ilgili standartlara ve ölçüm cihazlarına başvurun. Hazırladığınız karışım içilmek için değildir.',
    ] },
  ],
  faq: [
    ['96 derece alkolü 80 dereceye indirmek için ne kadar su eklenir?', 'Her 100 ml 96 derecelik alkole 20 ml su eklenir. 1 litre 80 derece karışım için 833,33 ml alkol ve 166,67 ml su gerekir. Oran sabittir: bir ölçü alkole 0,2 ölçü su.'],
    ['Kolonya kaç derece olmalıdır?', 'Geleneksel limon kolonyası çoğunlukla 80 derecedir; yani hacminin yüzde 80\'i etil alkoldür. Daha hafif kokulu ve cildi daha az kurutan 60–70 derece kolonyalar da vardır. Derece düştükçe uçuculuk ve serinlik hissi azalır.'],
    ['70 derece alkol neden dezenfektan olarak kullanılır?', 'Yüzde 60–80 aralığındaki etanol çözeltileri, içerdikleri su sayesinde mikroorganizmaların proteinlerini saf alkole göre daha etkili biçimde bozar ve yüzeyde daha yavaş buharlaştığı için temas süresi uzar. Bu nedenle el ve yüzey dezenfeksiyonunda genellikle 70 derece civarı tercih edilir.'],
    ['Musluk suyu kullanabilir miyim?', 'Kullanılabilir ama önerilmez. Sert sulardaki kireç ve mineraller karışımı bulandırabilir, şişe dibinde tortu bırakabilir. Saf su ya da kaynatılıp soğutulmuş su daha berrak sonuç verir.'],
    ['Karışım neden ısındı?', 'Etanol ile su karışırken ısı açığa çıkar; bu doğal bir olaydır ve tehlikeli değildir. Aynı etkileşim toplam hacmin biraz küçülmesine de yol açar. Dereceyi ölçecekseniz karışımın oda sıcaklığına dönmesini bekleyin.'],
    ['Hesap ağırlıkça mı hacimce mi?', 'Hacimcedir. Alkollü ürünlerin etiketindeki derece hacimce yüzdeyi gösterir ve mutfak ölçü kabıyla çalışmak için de hacim pratiktir. Tartıyla çalışacaksanız etanolün sudan hafif olduğunu (yaklaşık 0,79 g/ml) hesaba katmanız gerekir; mililitre ile gram birbirinin yerine kullanılamaz.'],
    ['Su ekleyerek alkolün derecesini yükseltebilir miyim?', 'Hayır. Su eklemek dereceyi yalnızca düşürür. Dereceyi yükseltmek için daha yüksek dereceli alkol eklemek gerekir; araç hedef derece eldekinden büyük girildiğinde bu yüzden hata verir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['seyreltme-orani-hesapla', 'seyreltme-hesapla', 'kutlece-yuzde-derisim-hesapla', 'litre-mililitre-cevir', 'mum-yapimi-hesapla'],
};
