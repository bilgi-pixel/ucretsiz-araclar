export default {
  slug: 'hafta-farki-hesapla',
  title: 'İki Tarih Arası Hafta Sayısı Hesaplama',
  h1Tail: 'tam hafta ve kalan gün',
  pageTitle: 'İki Tarih Arası Hafta Sayısı Hesaplama – Kaç Hafta Var?',
  description: 'İki tarih arasında kaç tam hafta ve kaç gün olduğunu hesaplayın. Toplam gün, ondalık hafta ve her iki tarihin yıl içindeki hafta numarası da gösterilir.',
  card: 'İki tarih arasındaki tam hafta sayısını ve artan günü bulun; toplam gün ve hafta numaralarıyla birlikte.',
  category: 'zaman',
  keywords: ['iki tarih arası hafta hesaplama', 'kaç hafta var', 'hafta farkı hesaplama', 'kaç hafta kaldı', 'kaç hafta oldu', 'tarihler arası hafta sayısı', 'hafta sayma'],
  lead: 'İki tarih arasında <strong>kaç tam hafta</strong> ve artan kaç gün bulunduğunu hesaplayın. Sınava, tatile ya da teslim tarihine kaç hafta kaldığını, bir kursun ya da projenin kaç hafta sürdüğünü tek adımda görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'bitis', label: 'Bitiş tarihi', type: 'date' },
    { id: 'dahil', label: 'Bitiş günü', type: 'select', options: [['hayir', 'Sayıma dahil değil'], ['evet', 'Sayıma dahil']] },
  ],
  compute(v, h) {
    let a = h.date(v.baslangic, 'Başlangıç tarihi');
    let b = h.date(v.bitis, 'Bitiş tarihi');
    let ters = false;
    if (b.getTime() < a.getTime()) { const t = a; a = b; b = t; ters = true; }
    const gun = h.gunFarki(a, b) + (v.dahil === 'evet' ? 1 : 0);
    const hafta = Math.floor(gun / 7);
    const artan = gun - hafta * 7;
    // ISO 8601 hafta numarası: hafta pazartesi başlar, 1. hafta yılın ilk perşembesini içeren haftadır.
    const isoHafta = (d) => {
      const pzt = (d.getUTCDay() + 6) % 7;
      const per = h.gunEkle(d, 3 - pzt);
      const y = per.getUTCFullYear();
      const ilk = new Date(Date.UTC(2000, 0, 1));
      ilk.setUTCFullYear(y);
      return `${y} yılının ${Math.floor(h.gunFarki(ilk, per) / 7) + 1}. haftası`;
    };
    return {
      rows: [
        ['Tam hafta sayısı', `${h.fmt(hafta, 0)} hafta`],
        ['Hafta ve gün', `${h.fmt(hafta, 0)} hafta ${artan} gün`],
        ['Toplam gün', `${h.fmt(gun, 0)} gün`],
        ['Ondalık hafta', `${h.fmt(gun / 7, 4)} hafta`],
        ['Başlangıç tarihi', `${h.fmtDate(a)} ${h.gunAdi(a)}, ${isoHafta(a)}`],
        ['Bitiş tarihi', `${h.fmtDate(b)} ${h.gunAdi(b)}, ${isoHafta(b)}`],
      ],
      note: (ters ? 'Bitiş tarihi başlangıçtan önce olduğu için tarihler yer değiştirilerek hesaplandı. ' : '')
        + 'Hafta numaraları ISO 8601 kuralına göredir: hafta pazartesi başlar, yılın ilk perşembesini içeren hafta 1. haftadır.',
    };
  },
  cases: [
    { in: { baslangic: '01.03.2026', bitis: '11.04.2026' }, out: { 'Tam hafta sayısı': '5 hafta', 'Hafta ve gün': '5 hafta 6 gün', 'Toplam gün': '41 gün', 'Ondalık hafta': '5,8571 hafta' } },
    { in: { baslangic: '01.01.2026', bitis: '08.10.2026' }, out: { 'Hafta ve gün': '40 hafta 0 gün', 'Toplam gün': '280 gün' } },
    { in: { baslangic: '01.01.2026', bitis: '31.12.2026' }, out: { 'Hafta ve gün': '52 hafta 0 gün', 'Başlangıç tarihi': '01.01.2026 Perşembe, 2026 yılının 1. haftası', 'Bitiş tarihi': '31.12.2026 Perşembe, 2026 yılının 53. haftası' } },
    { in: { baslangic: '01.01.2026', bitis: '07.01.2026', dahil: 'evet' }, out: { 'Hafta ve gün': '1 hafta 0 gün', 'Toplam gün': '7 gün' } },
    { in: { baslangic: '01.01.2026', bitis: '07.01.2026', dahil: 'hayir' }, out: { 'Hafta ve gün': '0 hafta 6 gün' } },
    { in: { baslangic: '15.01.2026', bitis: '01.01.2026' }, out: { 'Hafta ve gün': '2 hafta 0 gün', 'Ondalık hafta': '2 hafta' } },
    { in: { baslangic: '01.01.2027', bitis: '01.01.2027' }, out: { 'Hafta ve gün': '0 hafta 0 gün', 'Başlangıç tarihi': '01.01.2027 Cuma, 2026 yılının 53. haftası' } },
    { in: { baslangic: '30.02.2026', bitis: '11.04.2026' }, error: true },
    { in: { baslangic: '', bitis: '11.04.2026' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" ve "Bitiş tarihi" alanlarına aralığın iki ucunu girin.',
    'Son günü de saymak istiyorsanız (örneğin bir etkinliğin ilk ve son günü dahil süresi) "Bitiş günü" listesinden "Sayıma dahil" seçeneğini işaretleyin.',
    '"Hesapla" düğmesine basın. İlk satır tam hafta sayısını, ikinci satır artan günle birlikte süreyi verir.',
    'Alt satırlarda iki tarihin hangi güne ve yılın kaçıncı haftasına denk geldiğini kontrol edin.',
  ],
  sections: [
    { h: 'Hafta farkı hesabının mantığı', p: [
      'Hafta, takvimdeki en düzenli birimdir: her zaman tam 7 gündür, aylar ve yıllar gibi uzunluğu değişmez. Bu yüzden iki tarih arasındaki hafta sayısı, önce aradaki gün sayısını bulup 7\'ye bölerek hesaplanır. Bölümün tam kısmı <strong>tam hafta sayısını</strong>, kalanı ise <strong>artan günü</strong> verir.',
      'İşin zor kısmı gün sayısını doğru bulmaktır; aradaki ayların kaç çektiğini ve şubatın 28 mi 29 mu olduğunu tek tek hesaba katmak gerekir. Araç bu sayımı takvim üzerinden yapar, siz yalnızca iki tarihi girersiniz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '1 Mart 2026 ile 11 Nisan 2026 arasını hesaplayalım. Mart 31 gün çektiği için 1 Mart\'tan 1 Nisan\'a 31 gün, oradan 11 Nisan\'a 10 gün vardır; toplam <strong>41 gün</strong>. 41 ÷ 7 işleminin bölümü 5, kalanı 6\'dır. Sonuç <strong>5 hafta 6 gün</strong>, ondalık olarak 5,8571 haftadır.',
      'Bir başka örnek: 1 Ocak 2026\'dan 280 gün sonrası 8 Ekim 2026\'dır ve bu aralık tam 40 hafta eder. 1 Ocak ile 31 Aralık 2026 arası ise 364 gündür, yani tam 52 hafta. 365 günlük bir yılın 52 hafta 1 gün sürdüğünü, bu fazladan bir günün de her yıl aynı tarihin haftanın bir sonraki gününe kaymasına yol açtığını buradan görebilirsiniz.',
    ] },
    { h: 'Bitiş günü dahil mi, değil mi?', p: [
      'Varsayılan hesap, başlangıç gününden bitiş gününe kadar <em>geçen</em> süreyi ölçer; yani pazartesiden bir sonraki pazartesiye 7 gün, tam 1 hafta. Bu, "kaç hafta kaldı" ve "kaç hafta geçti" soruları için doğru sayımdır.',
      'Bazı durumlarda ise iki uç gün de sürenin parçasıdır: 1 Ocak\'ta başlayıp 7 Ocak\'ta biten bir kamp, ilk ve son günü dahil 7 gün, yani 1 hafta sürer. Böyle durumlarda "Sayıma dahil" seçeneğini kullanın; araç gün sayısına bir ekler. Aynı aralık varsayılan ayarla 6 gün, yani 0 hafta 6 gün çıkar. İki sonuç arasındaki fark her zaman bir gündür, ama bu bir gün tam hafta sayısını değiştirebilir.',
    ] },
    { h: 'Yılın kaçıncı haftası?', p: [
      'Sonuçtaki son iki satır, girdiğiniz tarihlerin haftanın hangi gününe ve yılın kaçıncı haftasına düştüğünü gösterir. Hafta numarası uluslararası ISO 8601 kuralına göre hesaplanır: hafta pazartesi günü başlar ve yılın ilk perşembesini içeren hafta 1. hafta sayılır.',
      'Bu kuralın ilginç bir sonucu vardır: yılın ilk günleri bir önceki yılın son haftasına, son günleri de bir sonraki yılın ilk haftasına ait olabilir. Örneğin 1 Ocak 2027 cuma gününe denk gelir ve ISO kuralına göre 2026 yılının 53. haftasındadır. Çoğu yıl 52 hafta numarasına sahiptir; perşembe günü başlayan yıllar ile çarşamba günü başlayan artık yıllar 53 haftalıdır. Üretim planı, sevkiyat ve vardiya çizelgelerinde hafta numarasıyla çalışanlar için bu ayrıntı önemlidir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Sınav ve ders planı:</strong> Sınav tarihine kalan hafta sayısını bulup konuları haftalara dağıtmak.',
      '<strong>Proje ve sprint planı:</strong> Başlangıç ve teslim tarihleri arasına kaç tane iki haftalık dönem sığdığını görmek.',
      '<strong>Kurs ve eğitim:</strong> 12 haftalık bir programın hangi tarihte bittiğini sağlamak için başlangıç ve bitiş tarihlerini karşılaştırmak.',
      '<strong>Spor ve diyet programı:</strong> Hedef tarihe kadar kaç antrenman haftası kaldığını hesaplamak.',
      '<strong>Tatil ve etkinlik geri sayımı:</strong> Düğüne, bayrama ya da yolculuğa kaç hafta ve gün kaldığını söylemek.',
      '<strong>Haftalık ödemeler:</strong> Haftalık ücret ya da haftalık kira ödenen işlerde dönem sayısını bulmak.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Araç yalnızca takvim günlerini sayar; hafta sonlarını ya da resmî tatilleri ayırmaz. Çalışma günü sayısı gerekiyorsa iş günü hesaplayan aracı kullanın. "Tam hafta" burada 7 günlük bloklar anlamına gelir; pazartesiden pazara uzanan takvim haftalarının sayısı değildir. Örneğin cuma ile sonraki pazartesi arasında yalnızca 3 gün vardır, ama bu iki gün farklı takvim haftalarındadır; bu ayrımı görmek için hafta numarası satırlarına bakın.',
      'Gebelik haftası gibi tıbbi sayımlar da gün farkına dayanır, ancak hangi tarihin başlangıç alınacağı hekimin değerlendirmesine bağlıdır. Buradaki sonuç bilgilendirme amaçlıdır; sağlıkla ilgili kararlar için hekiminize danışın.',
    ] },
  ],
  faq: [
    ['İki tarih arasında kaç hafta olduğunu nasıl bulurum?', 'İki tarih arasındaki gün sayısını bulup 7\'ye bölersiniz. Bölüm tam hafta sayısını, kalan artan günü verir. 41 günlük bir aralık 5 hafta 6 gün eder.'],
    ['Bir yılda kaç hafta vardır?', '365 günlük bir yıl 52 hafta 1 gün, 366 günlük artık yıl 52 hafta 2 gün sürer. ISO hafta numaralandırmasında yılların çoğu 52, bazıları 53 haftalıdır; 2026 yılı 53 haftalı yıllardan biridir.'],
    ['Bitiş gününü dahil etmek sonucu nasıl değiştirir?', 'Gün sayısına bir eklenir. 1 Ocak ile 7 Ocak arası dahil edilmeden 6 gün (0 hafta 6 gün), dahil edilerek 7 gün (1 hafta 0 gün) çıkar. Geri sayımlarda dahil etmeyin, etkinlik sürelerinde dahil edin.'],
    ['Ondalık hafta ne anlama geliyor?', 'Toplam gün sayısının 7\'ye bölünmüş hâlidir. 5 hafta 6 gün, 41 ÷ 7 = 5,8571 hafta eder. Haftalık ortalama hesaplarında ya da tablolarda tek sayı gerektiğinde kullanılır.'],
    ['Hafta numarası neden bazen bir önceki yılı gösteriyor?', 'ISO 8601 kuralında 1. hafta yılın ilk perşembesini içeren haftadır. Yıl cuma, cumartesi ya da pazar günü başlıyorsa ilk günler önceki yılın son haftasına ait sayılır. 1 Ocak 2027 bu yüzden 2026\'nın 53. haftasındadır.'],
    ['Hafta pazartesi mi pazar mı başlar?', 'Türkiye\'de ve ISO standardında hafta pazartesi başlar; araç da hafta numaralarını buna göre verir. Tam hafta sayısı ise haftanın hangi gün başladığından bağımsızdır, çünkü yalnızca 7 günlük blokları sayar.'],
    ['Tarihleri ters sırada girebilir miyim?', 'Evet. Araç erken tarihi başlangıç kabul eder ve sonuç altındaki notta tarihlerin yer değiştirdiğini belirtir.'],
    ['Girdiğim tarihler bir sunucuya gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; tarihler kaydedilmez ve hiçbir yere iletilmez.'],
  ],
  related: ['ay-farki-hesapla', 'iso-hafta-tarihi-cevir', 'is-gunu-hesapla', 'hafta-sonu-sayisi-hesapla', 'hangi-gun-hesapla'],
};
