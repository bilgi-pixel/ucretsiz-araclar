export default {
  slug: 'gunes-paneli-hesapla',
  title: 'Güneş Paneli İhtiyacı Hesaplama',
  h1Tail: 'kaç panel, kaç kWp?',
  pageTitle: 'Güneş Paneli İhtiyacı Hesaplama – Kaç Panel ve Kaç kWp Gerekir?',
  description: 'Elektrik tüketiminize göre gereken güneş paneli sayısını ve kurulu gücü (kWp) hesaplayın. Güneşlenme saati, panel gücü ve sistem kaybını siz belirleyin.',
  card: 'Tüketiminize, güneşlenme saatine ve panel gücüne göre kaç panel ve kaç kWp kurulu güç gerektiğini bulun.',
  category: 'elektrik',
  keywords: ['güneş paneli hesaplama', 'kaç panel gerekir', 'kWp hesaplama', 'güneş enerjisi sistemi hesaplama', 'solar panel ihtiyacı', 'çatı ges hesaplama', 'panel sayısı hesaplama'],
  lead: `Günlük ya da aylık elektrik tüketiminizi yazın; araç bu tüketimi karşılamak için gereken <strong>kurulu gücü (kWp)</strong> ve <strong>panel sayısını</strong> hesaplasın. Güneşlenme saatini, tek panelin gücünü ve sistem kaybını kendi koşullarınıza göre değiştirebilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'tuketim', label: 'Elektrik tüketimi (kWh)', type: 'number', placeholder: 'Örn. 300', hint: 'Faturanızdaki kWh değeri; ondalık için virgül kullanın.' },
    { id: 'donem', label: 'Tüketim dönemi', type: 'select', options: [['ay', 'Aylık (30 gün)'], ['gun', 'Günlük']] },
    { id: 'gunes', label: 'Günlük eşdeğer güneş saati', type: 'number', value: '4,5', hint: 'Tepe güneş saati (kWh/m²/gün); bölgeye ve mevsime göre değişir.' },
    { id: 'panel', label: 'Tek panelin gücü (W)', type: 'number', value: '550' },
    { id: 'kayip', label: 'Sistem kaybı (%)', type: 'number', value: '20', hint: 'İnvertör, kablo, sıcaklık, toz ve gölge kayıplarının toplamı.' },
  ],
  compute(v, h) {
    const t = h.pos(v.tuketim, 'Elektrik tüketimi');
    const gunluk = v.donem === 'gun' ? t : t / 30;
    const saat = h.pos(v.gunes, 'Günlük eşdeğer güneş saati');
    if (saat > 12) h.err('"Günlük eşdeğer güneş saati" 12\'den büyük olamaz; tipik değerler 3 ile 6 arasındadır.');
    const pw = h.pos(v.panel, 'Tek panelin gücü');
    const kayip = h.nonneg(v.kayip, 'Sistem kaybı');
    if (kayip >= 100) h.err('"Sistem kaybı" %100\'den küçük olmalı; tipik değer %15 ile %25 arasındadır.');
    const verim = 1 - kayip / 100;
    const gerekli = gunluk / (saat * verim); // kWp
    const adet = Math.max(1, Math.ceil(gerekli * 1000 / pw - 1e-9));
    const kurulu = adet * pw / 1000;
    const uretim = kurulu * saat * verim;
    return {
      rows: [
        ['Gereken panel sayısı', h.fmt(adet, 0) + ' adet'],
        ['Gereken kurulu güç', h.fmt(gerekli, 2) + ' kWp'],
        ['Panellerin toplam gücü', h.fmt(kurulu, 2) + ' kWp'],
        ['Günlük tüketim', h.fmt(gunluk, 2) + ' kWh'],
        ['Tahmini günlük üretim', h.fmt(uretim, 2) + ' kWh'],
        ['Tahmini aylık üretim (30 gün)', h.fmt(uretim * 30, 1) + ' kWh'],
        ['Tahmini yıllık üretim (365 gün)', h.fmt(uretim * 365, 0) + ' kWh'],
      ],
      note: 'Sonuç, girdiğiniz ortalama güneş saatine dayanan bir ön boyutlandırmadır; kesin tasarım için yerinde keşif gerekir.',
    };
  },
  cases: [
    { in: { tuketim: '10', donem: 'gun', gunes: '5', panel: '400', kayip: '20' }, out: { 'Gereken panel sayısı': '7 adet', 'Gereken kurulu güç': '2,5 kWp', 'Panellerin toplam gücü': '2,8 kWp', 'Tahmini günlük üretim': '11,2 kWh' } },
    { in: { tuketim: '900', donem: 'ay', gunes: '4,5', panel: '550', kayip: '20' }, out: { 'Gereken panel sayısı': '16 adet', 'Gereken kurulu güç': '8,33 kWp', 'Panellerin toplam gücü': '8,8 kWp', 'Günlük tüketim': '30 kWh', 'Tahmini günlük üretim': '31,68 kWh' } },
    { in: { tuketim: '5', donem: 'gun', gunes: '4', panel: '300', kayip: '25' }, out: { 'Gereken panel sayısı': '6 adet', 'Gereken kurulu güç': '1,67 kWp', 'Tahmini günlük üretim': '5,4 kWh' } },
    { in: { tuketim: '12', donem: 'gun', gunes: '6', panel: '500', kayip: '0' }, out: { 'Gereken panel sayısı': '4 adet', 'Gereken kurulu güç': '2 kWp', 'Tahmini günlük üretim': '12 kWh', 'Tahmini yıllık üretim (365 gün)': '4.380 kWh' } },
    { in: { tuketim: '1', donem: 'gun', gunes: '5', panel: '100', kayip: '20' }, out: { 'Gereken panel sayısı': '3 adet', 'Gereken kurulu güç': '0,25 kWp', 'Panellerin toplam gücü': '0,3 kWp', 'Tahmini aylık üretim (30 gün)': '36 kWh' } },
    { in: { tuketim: '300', donem: 'ay', gunes: '5', panel: '500', kayip: '20' }, out: { 'Gereken panel sayısı': '5 adet', 'Gereken kurulu güç': '2,5 kWp', 'Günlük tüketim': '10 kWh' } },
    { in: { tuketim: '0', donem: 'ay' }, error: true },
    { in: { tuketim: '300', donem: 'ay', kayip: '100' }, error: true },
    { in: { tuketim: 'abc', donem: 'ay' }, error: true },
  ],
  howto: [
    `"Elektrik tüketimi" alanına faturanızdaki kWh değerini yazın ve bunun aylık mı günlük mü olduğunu "Tüketim dönemi" listesinden seçin.`,
    `"Günlük eşdeğer güneş saati" alanına bulunduğunuz bölge için ortalama tepe güneş saatini girin. Emin değilseniz varsayılan değeri bırakıp sonra farklı değerlerle deneyin.`,
    `Almayı düşündüğünüz panelin etiket gücünü watt olarak yazın; güncel konut panelleri çoğunlukla 400 W ile 600 W arasındadır.`,
    `"Sistem kaybı" alanını gerekmedikçe değiştirmeyin; gölgeli ya da çok sıcak bir çatı için değeri yükseltebilirsiniz.`,
    `"Hesapla" düğmesine basın. Gereken panel sayısı, kurulu güç ve tahmini günlük, aylık, yıllık üretim sonuç kutusunda listelenir.`,
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      `Bir güneş panelinin etiketinde yazan güç, standart test koşullarında, yani metrekareye 1000 W ışınım düştüğünde ürettiği güçtür. Gerçek hayatta güneş gün boyu bu şiddette parlamaz; bu yüzden gün içindeki toplam ışınım "eşdeğer tepe güneş saati" olarak ifade edilir. Günlük 4,5 saat demek, o gün panele düşen toplam enerjinin 4,5 saat boyunca tam güçte güneş almaya eşit olduğu anlamına gelir.`,
      `Buna göre bir sistemin günlük üretimi şu şekilde tahmin edilir: <strong>üretim (kWh) = kurulu güç (kWp) × güneş saati × (1 − kayıp)</strong>. Araç bu formülü tersine çevirir: <strong>gereken kurulu güç = günlük tüketim ÷ (güneş saati × (1 − kayıp))</strong>. Çıkan değer panel gücüne bölünür ve yarım panel takılamayacağı için yukarı yuvarlanır.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Günde 10 kWh elektrik tüketen bir ev düşünelim. Bölgedeki ortalama güneş saati 5, sistem kaybı %20 ve seçilen panel 400 W olsun. Kayıp düşüldükten sonra her 1 kWp kurulu güç günde 5 × 0,8 = 4 kWh üretir. Gereken kurulu güç 10 ÷ 4 = <strong>2,5 kWp</strong> olur. 2500 W ÷ 400 W = 6,25 ettiği için <strong>7 panel</strong> gerekir. Yedi panelin toplam gücü 2,8 kWp, tahmini günlük üretimi ise 2,8 × 4 = 11,2 kWh'dir; yani ihtiyacın biraz üzerinde bir pay kalır.`,
      `Aylık faturadan gidildiğinde hesap aynıdır. Ayda 900 kWh tüketen bir iş yeri günde ortalama 30 kWh harcar. 4,5 güneş saati ve %20 kayıpla gereken güç 30 ÷ 3,6 = 8,33 kWp'dir. 550 W'lık panellerden 16 adet kullanıldığında kurulu güç 8,8 kWp'ye, tahmini günlük üretim 31,68 kWh'ye ulaşır.`,
    ] },
    { h: 'Güneş saati değerini nasıl seçmeli?', p: [
      `Eşdeğer güneş saati, takvimdeki güneşlenme süresiyle aynı şey değildir. Yazın on dört saat aydınlık olan bir günde bile tepe güneş saati çoğunlukla 6–7 saati geçmez; kışın ise 2 saatin altına inebilir. Türkiye geneli için yıllık ortalama kabaca 3,5 ile 5,5 saat arasında değişir; güney ve güneydoğu illeri üst sınıra, Karadeniz kıyıları alt sınıra yakındır. Kesin değer için bulunduğunuz ilin resmî güneş enerjisi potansiyel verilerine bakmanız gerekir.`,
      `Şebekeye bağlı ve yıllık mahsuplaşma yapılan bir sistemde yıllık ortalamayı kullanmak mantıklıdır. Şebekeden bağımsız, akülü bir bağ evi ya da karavan sisteminde ise en kötü ayın, yani çoğu yerde aralık ya da ocak ayının değeriyle hesap yapılmalıdır; aksi hâlde kışın enerji yetmez.`,
    ] },
    { h: 'Sistem kaybı neleri kapsar?', ul: [
      `<strong>Sıcaklık:</strong> Hücre ısındıkça panel gücü düşer; yaz öğlesinde etiket gücünün belirgin biçimde altında üretim görülür.`,
      `<strong>İnvertör ve kablo:</strong> Doğru akımın alternatif akıma çevrilmesi ve kablolardaki gerilim düşümü birkaç puanlık kayıp yaratır.`,
      `<strong>Kirlenme:</strong> Toz, kuş pisliği ve yaprak panel yüzeyini kapatır; yağmurun az olduğu aylarda etki artar.`,
      `<strong>Gölge ve yönlenme:</strong> Baca, ağaç ya da komşu bina gölgesi ile güneye tam bakmayan çatı yüzeyleri üretimi azaltır.`,
      `<strong>Yaşlanma:</strong> Paneller yıllar içinde yavaş yavaş güç kaybeder.`,
    ], p: [
      `Bu etkilerin toplamı için %15–25 arası bir değer ön hesapta yaygın olarak kullanılır. Araçtaki %20 varsayılanı ortalama bir çatı içindir; akülü sistemlerde akü şarj-deşarj kaybı da ekleneceği için daha yüksek bir oran seçmek gerçekçi olur.`,
    ] },
    { h: 'Çatıda ne kadar yer gerekir?', p: [
      `Panel sayısını bulduktan sonra yerleşimi kontrol etmek gerekir. Panelin gerçek ölçüleri üreticinin teknik föyünde yazar; güncel 400–600 W sınıfı paneller kabaca 1,7 ile 2,6 metrekare arasında yer kaplar. Panel sayısını tek panelin alanıyla çarpıp üzerine bakım yolu, çatı kenarı boşlukları ve düz çatılarda sıralar arası gölge mesafesi için pay eklemelisiniz. Eğimli ve güneye bakan bir çatıda paneller sıkı dizilebilirken, düz çatıda aynı güç için belirgin biçimde daha fazla alan gerekir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Faturadaki tutarı (TL) tüketim sanmak. Hesap için <strong>kWh</strong> değeri gerekir.`,
      `Tek bir ayın faturasına göre boyutlandırmak. Klima ya da elektrikli ısıtma kullanılan aylar ortalamayı yanıltır; mümkünse on iki ayın ortalamasını alın.`,
      `Panel etiket gücünü saatlik gerçek üretim sanmak. 550 W'lık bir panel gün boyu 550 W vermez.`,
      `Gündüz üretilen enerjinin gece de kullanılabileceğini varsaymak. Bunun için ya şebeke mahsuplaşması ya da akü gerekir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu araç bir ön boyutlandırma hesabıdır. İnvertör seçimi, dizi gerilimi, çatı statiği, rüzgâr yükü, topraklama, yıldırımdan korunma ve şebeke bağlantı koşulları hesaba dâhil değildir. Lisanssız üretim, mahsuplaşma ve bağlantı başvurularına ilişkin kurallar zaman içinde değişir; yatırım kararı vermeden önce güncel mevzuatı kontrol edin ve yetkili bir elektrik mühendisinden ya da kurulum firmasından yerinde keşfe dayalı proje alın. Sonuçlar bilgilendirme amaçlıdır.`,
    ] },
  ],
  faq: [
    ['Ayda 300 kWh tüketen bir ev için kaç panel gerekir?', `Ayda 300 kWh, günde ortalama 10 kWh demektir. Günlük 5 güneş saati ve %20 kayıpla 2,5 kWp kurulu güç gerekir; bu da 500 W'lık panellerden 5 adet eder. Güneş saati 4'e düşerse gereken güç 3,13 kWp'ye, panel sayısı 7'ye çıkar.`],
    ['kWp ne demek?', `kWp, "kilowatt peak" yani tepe gücün kısaltmasıdır. Panellerin standart test koşullarındaki etiket güçlerinin toplamını gösterir. 10 adet 500 W panel 5 kWp kurulu güç eder.`],
    ['1 kWp güneş paneli günde kaç kWh üretir?', `Günlük üretim, eşdeğer güneş saati ile kayıp sonrası verimin çarpımıdır. 4,5 saat ve %20 kayıpla 1 kWp günde yaklaşık 3,6 kWh üretir. Yazın bu değer yükselir, kışın düşer.`],
    ['Sonuç neden yukarı yuvarlanıyor?', `Yarım panel takılamadığı için gereken güç panel gücüne bölünür ve bir üst tam sayıya çıkarılır. Bu nedenle "Panellerin toplam gücü" satırı, "Gereken kurulu güç" satırından biraz büyük çıkabilir.`],
    ['Akülü (off-grid) sistemde bu hesap yeterli mi?', `Panel sayısı için bir başlangıç verir ama yeterli değildir. Akülü sistemde en kötü ayın güneş saatiyle hesap yapılmalı, akü kapasitesi, kaç gün güneşsiz kalınabileceği ve şarj kontrol cihazı ayrıca boyutlandırılmalıdır.`],
    ['Panel gücü arttıkça üretim de aynı oranda artar mı?', `Toplam kurulu güç aynı kaldıkça üretim de yaklaşık aynıdır. 10 adet 400 W panel ile 8 adet 500 W panel aynı 4 kWp gücü verir; fark, kaplanan alan ve montaj maliyetindedir.`],
    ['Kışın üretim ne kadar düşer?', `Bölgeye göre değişir; kış aylarında eşdeğer güneş saati yaz değerinin yarısının da altına inebilir. Farkı görmek için "Günlük eşdeğer güneş saati" alanına kış değerini yazıp hesabı tekrarlayabilirsiniz.`],
    ['Yazdığım tüketim bilgisi bir yere kaydediliyor mu?', `Hayır. Hesap tamamen tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['cihaz-elektrik-maliyeti-hesapla', 'aku-kullanim-suresi-hesapla', 'kablo-kesiti-hesapla', 'elektrik-gucu-hesapla', 'ups-calisma-suresi-hesapla'],
};
