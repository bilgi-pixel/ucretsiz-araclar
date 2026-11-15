export default {
  slug: 'hedef-kilo-tarihi-hesapla',
  title: 'Hedef Kiloya Ulaşma Tarihi Hesaplama',
  h1Tail: 'kaç haftada, hangi gün?',
  pageTitle: 'Hedef Kiloya Ulaşma Tarihi Hesaplama – Kaç Haftada Kilo Veririm?',
  description: 'Mevcut kilonuzu, hedef kilonuzu ve haftalık temponuzu yazın; hedefe hangi tarihte ulaşacağınızı, kaç hafta süreceğini ve gereken günlük kalori farkını görün.',
  card: 'Mevcut ve hedef kilonuza göre hedefe ulaşacağınız tarihi, süreyi ve gereken günlük kalori farkını hesaplayın.',
  category: 'saglik',
  keywords: ['hedef kilo tarihi', 'kaç haftada kilo veririm', 'kilo verme süresi hesaplama', 'hedef kiloya ne zaman ulaşırım', 'haftada yarım kilo vermek', 'kilo alma süresi', 'diyet takvimi hesaplama'],
  lead: 'Mevcut kilonuzu, ulaşmak istediğiniz kiloyu ve haftada kaç kilo değişmeyi planladığınızı yazın. Araç, hedefe <strong>hangi tarihte</strong> varacağınızı, kaç hafta ve gün süreceğini ve bu tempo için gereken yaklaşık günlük kalori farkını gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mevcut', label: 'Mevcut kilo (kg)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'hedef', label: 'Hedef kilo (kg)', type: 'number', placeholder: 'Örn. 72' },
    { id: 'hiz', label: 'Haftalık değişim (kg/hafta)', type: 'number', value: '0,5', hint: 'Haftada vermeyi ya da almayı planladığınız miktar.' },
    { id: 'baslangic', label: 'Başlangıç tarihi (boş = bugün)', type: 'date' },
  ],
  compute(v, h) {
    const mevcut = h.pos(v.mevcut, 'Mevcut kilo');
    const hedef = h.pos(v.hedef, 'Hedef kilo');
    const hiz = h.pos(v.hiz, 'Haftalık değişim');
    if (mevcut > 400 || hedef > 400) h.err('Kilo değerleri 400 kg\'dan büyük olamaz; kilogram cinsinden yazdığınızdan emin olun.');
    if (Math.abs(mevcut - hedef) < 1e-9) h.err('Mevcut kilo ile hedef kilo aynı; farklı bir hedef yazın.');
    if (hiz > 5) h.err('Haftalık değişim 5 kg\'dan büyük olamaz; daha gerçekçi bir tempo yazın.');
    const bas = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const fark = Math.abs(mevcut - hedef);
    const veriyor = hedef < mevcut;
    const hafta = fark / hiz;
    const gun = Math.ceil(hafta * 7 - 1e-9);
    const bitis = h.gunEkle(bas, gun);
    const gunlukKcal = hiz * 7700 / 7;
    const yuzde = hiz / mevcut * 100;
    const tamHafta = Math.floor(gun / 7);
    const artan = gun % 7;
    let not = 'Hesap, 1 kg vücut ağırlığı değişimini yaklaşık 7.700 kcal sayan kaba kurala ve sabit haftalık tempoya dayanır; gerçek ilerleme dalgalıdır.';
    if (veriyor && yuzde > 1 + 1e-9) not += ' Seçtiğiniz tempo vücut ağırlığınızın haftada %1\'inden fazla; bu hız çoğu kişi için sürdürülebilir değildir, bir uzmana danışın.';
    return {
      rows: [
        ['Hedefe ulaşma tarihi', `${h.fmtDate(bitis)} ${h.gunAdi(bitis)}`],
        ['Süre', `${gun} gün (${tamHafta} hafta${artan ? ' ' + artan + ' gün' : ''})`],
        ['Yaklaşık ay', h.fmt(gun / 30.44, 1) + ' ay'],
        [veriyor ? 'Verilecek toplam kilo' : 'Alınacak toplam kilo', h.fmt(fark, 2) + ' kg'],
        [veriyor ? 'Gereken günlük kalori açığı' : 'Gereken günlük kalori fazlası', h.fmt(gunlukKcal, 0) + ' kcal'],
        ['Haftalık değişim oranı', '%' + h.fmt(yuzde, 2) + ' (vücut ağırlığına göre)'],
        ['Başlangıç tarihi', h.fmtDate(bas)],
      ],
      note: not,
    };
  },
  cases: [
    { in: { mevcut: '80', hedef: '72', hiz: '0,5', baslangic: '2026-01-01' }, out: { 'Hedefe ulaşma tarihi': '23.04.2026 Perşembe', 'Süre': '112 gün (16 hafta)', 'Verilecek toplam kilo': '8 kg', 'Gereken günlük kalori açığı': '550 kcal' } },
    { in: { mevcut: '60', hedef: '65', hiz: '0,25', baslangic: '2026-03-01' }, out: { 'Hedefe ulaşma tarihi': '19.07.2026 Pazar', 'Süre': '140 gün (20 hafta)', 'Alınacak toplam kilo': '5 kg', 'Gereken günlük kalori fazlası': '275 kcal' } },
    { in: { mevcut: '95', hedef: '85', hiz: '1', baslangic: '2026-06-01' }, out: { 'Hedefe ulaşma tarihi': '10.08.2026 Pazartesi', 'Süre': '70 gün (10 hafta)', 'Gereken günlük kalori açığı': '1.100 kcal', 'Haftalık değişim oranı': '%1,05 (vücut ağırlığına göre)' } },
    { in: { mevcut: '70', hedef: '68', hiz: '0,7', baslangic: '2026-02-01' }, out: { 'Hedefe ulaşma tarihi': '21.02.2026 Cumartesi', 'Süre': '20 gün (2 hafta 6 gün)', 'Gereken günlük kalori açığı': '770 kcal' } },
    { in: { mevcut: '100', hedef: '90', hiz: '0,5', baslangic: '2028-01-01' }, out: { 'Hedefe ulaşma tarihi': '20.05.2028 Cumartesi', 'Süre': '140 gün (20 hafta)', 'Yaklaşık ay': '4,6 ay' } },
    { in: { mevcut: '82,5', hedef: '80', hiz: '0,5', baslangic: '31.12.2026' }, out: { 'Hedefe ulaşma tarihi': '04.02.2027 Perşembe', 'Süre': '35 gün (5 hafta)', 'Verilecek toplam kilo': '2,5 kg' } },
    { in: { mevcut: '80', hedef: '80', hiz: '0,5', baslangic: '2026-01-01' }, error: true },
    { in: { mevcut: '80', hedef: '72', hiz: '0', baslangic: '2026-01-01' }, error: true },
    { in: { mevcut: 'seksen', hedef: '72', hiz: '0,5', baslangic: '2026-01-01' }, error: true },
  ],
  howto: [
    '"Mevcut kilo" alanına bugünkü tartı değerinizi, "Hedef kilo" alanına ulaşmak istediğiniz değeri kilogram olarak yazın. Hedef mevcut kilodan küçükse kilo verme, büyükse kilo alma hesabı yapılır.',
    '"Haftalık değişim" alanına haftada kaç kilo vermeyi ya da almayı planladığınızı girin. Varsayılan değer haftada yarım kilodur.',
    'Programa bugün başlamıyorsanız "Başlangıç tarihi" alanından ilk günü seçin; boş bırakırsanız bugünün tarihi alınır.',
    '"Hesapla" düğmesine basın. İlk satırda hedefe ulaşacağınız tarih ve haftanın günü, altında süre, toplam değişim ve gereken günlük kalori farkı görünür.',
    'Tempoyu değiştirip yeniden hesaplayarak farklı senaryoları karşılaştırın; örneğin haftada 0,5 kg ile 0,75 kg arasındaki tarih farkına bakın.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      'Mantık basit bir bölme işlemidir. Önce mevcut kilo ile hedef kilo arasındaki fark bulunur, sonra bu fark haftalık tempoya bölünür: <strong>süre (hafta) = |mevcut kilo − hedef kilo| ÷ haftalık değişim</strong>. Çıkan hafta sayısı 7 ile çarpılarak güne çevrilir, küsuratlı günler yukarı yuvarlanır ve başlangıç tarihine eklenir. Artık yıllar ve ay uzunlukları takvim üzerinden otomatik hesaba katılır.',
      'Günlük kalori farkı için yaygın kullanılan kaba kural uygulanır: yaklaşık 1 kilogram vücut ağırlığı değişimi 7.700 kilokalorilik enerji farkına karşılık gelir. Buna göre <strong>günlük kalori farkı = haftalık değişim × 7.700 ÷ 7</strong>. Haftada 0,5 kg için bu değer günde 550 kcal, haftada 1 kg için günde 1.100 kcal eder.',
    ] },
    { h: 'Çözümlü örnek: 80 kilodan 72 kiloya', p: [
      'Mevcut kilonuz 80 kg, hedefiniz 72 kg olsun ve 1 Ocak 2026\'da haftada 0,5 kg temposuyla başlayın. Verilecek toplam kilo 80 − 72 = 8 kg\'dır. Süre 8 ÷ 0,5 = 16 hafta, yani 16 × 7 = 112 gündür. 1 Ocak 2026\'ya 112 gün eklendiğinde <strong>23 Nisan 2026 Perşembe</strong> gününe ulaşılır. Bu tempo için gereken günlük açık 0,5 × 7.700 ÷ 7 = 550 kcal\'dir ve haftalık değişim vücut ağırlığının yaklaşık %0,63\'üne denk gelir.',
      'Aynı kişi tempoyu haftada 1 kg\'a çıkarırsa süre 8 haftaya iner, ancak günlük açık 1.100 kcal\'ye yükselir. Bu büyüklükte bir açığı yalnızca beslenmeyle kapatmak çoğu kişi için zordur; hesap, hız ile zorluk arasındaki takası sayılarla görmenizi sağlar.',
    ] },
    { h: 'Kilo alma hedefinde kullanım', p: [
      'Hedef kilo mevcut kilodan büyük yazıldığında araç aynı hesabı kilo alma yönünde yapar ve sonuç satırları "alınacak toplam kilo" ile "günlük kalori fazlası" olarak adlandırılır. Örneğin 60 kg\'dan 65 kg\'a haftada 0,25 kg ile çıkmak isteyen biri için süre 5 ÷ 0,25 = 20 hafta, yani 140 gündür; 1 Mart 2026\'da başlanırsa hedef tarih 19 Temmuz 2026 Pazar olur ve gereken fazla günde yaklaşık 275 kcal\'dir.',
      'Kas kütlesi kazanmayı hedefleyenlerde yavaş tempo genellikle tercih edilir; hızlı alınan kilonun daha büyük bölümü yağ olma eğilimindedir. Bu ayrım kişiden kişiye değiştiği için araç yalnızca toplam ağırlık üzerinden hesap yapar.',
    ] },
    { h: 'Gerçekçi bir tempo seçmek', p: [
      'Beslenme alanında sık anılan genel çerçeve, kilo verirken haftada vücut ağırlığının yaklaşık %0,5–1\'i kadar bir tempodur. 80 kg bir kişi için bu haftada 0,4–0,8 kg aralığına denk gelir. Araç, seçtiğiniz tempoyu vücut ağırlığına oranlayarak gösterir ve %1\'in üzerindeki kilo verme hızlarında not düşer. Bu sınır kesin bir kural değil, yön gösteren bir çerçevedir.',
      'Çok agresif hedefler genellikle erken bırakmayla sonuçlanır. Takvime bakıp "düğüne kadar yetişir mi" diye hesap yapıyorsanız önce gerçekçi tempoyla tarihi bulun; tarih size uymuyorsa hedef kiloyu kademelendirmek, tempoyu sürdürülemez düzeye çıkarmaktan daha sağlıklı bir yoldur.',
    ] },
    { h: 'Sonucu yorumlarken dikkat edilecekler', ul: [
      '<strong>İlerleme doğrusal değildir.</strong> İlk haftalarda su ve glikojen kaybı nedeniyle tartı hızlı düşer, sonra yavaşlar. Araç ise sabit tempo varsayar.',
      '<strong>Kilo azaldıkça enerji ihtiyacı da azalır.</strong> Aynı beslenme düzeni zamanla daha küçük bir açık yaratır; bu yüzden hedef tarih çoğu zaman biraz ileri kayar.',
      '<strong>Günlük tartı dalgalanır.</strong> Tuz, su, sindirim ve hormonlar günden güne 1–2 kg oynama yapabilir. Haftalık ortalamaya bakmak daha güvenilirdir.',
      '<strong>7.700 kcal kuralı yaklaşık bir değerdir.</strong> Kaybedilen ağırlığın ne kadarının yağ, ne kadarının su ve kas olduğuna göre gerçek enerji karşılığı değişir.',
      '<strong>Plato dönemleri normaldir.</strong> Bir iki hafta tartının oynamaması planın bozulduğu anlamına gelmez.',
    ] },
    { h: 'Sağlık uyarısı', p: [
      'Bu sayfadaki sonuçlar bilgilendirme ve planlama amaçlıdır; tıbbi öneri değildir. Kronik hastalığı olanlar, hamileler, emzirenler, ergenlik çağındakiler ve yeme bozukluğu öyküsü bulunanlar kilo değişimi hedeflemeden önce hekim ya da diyetisyene danışmalıdır. Çok düşük kalorili diyetler yalnızca sağlık uzmanı gözetiminde uygulanmalıdır.',
    ] },
  ],
  faq: [
    ['Haftada kaç kilo vermek sağlıklıdır?', 'Genel çerçeve olarak haftada vücut ağırlığının yaklaşık %0,5–1\'i kadar bir tempo sık anılır; çoğu yetişkin için bu haftada 0,5–1 kg aralığına denk gelir. Kişisel durumunuz farklı olabileceği için kesin hedefi hekim ya da diyetisyenle belirlemek en doğrusudur.'],
    ['10 kilo vermek ne kadar sürer?', 'Haftada 0,5 kg temposuyla 10 ÷ 0,5 = 20 hafta, yani 140 gün sürer; bu yaklaşık 4,6 aydır. Haftada 1 kg ile süre 10 haftaya iner, ancak gereken günlük kalori açığı 550 kcal\'den 1.100 kcal\'ye çıkar.'],
    ['Günlük kalori açığı nasıl hesaplanıyor?', 'Haftalık kilo değişimi 7.700 ile çarpılıp 7\'ye bölünür. Bu, 1 kg vücut ağırlığının yaklaşık 7.700 kcal enerjiye karşılık geldiği varsayımına dayanır. Değer yaklaşık olduğundan sonucu kesin bir reçete değil, büyüklük tahmini olarak okuyun.'],
    ['Hesaplanan tarihte hedefe kesin ulaşır mıyım?', 'Hayır. Araç sabit bir haftalık tempo varsayar; gerçekte ilerleme dalgalı olur, metabolizma kiloyla birlikte değişir ve plato dönemleri yaşanır. Tarihi bir yol haritası olarak görün ve birkaç haftada bir güncel kilonuzla yeniden hesaplayın.'],
    ['Başlangıç tarihini boş bırakırsam ne olur?', 'Cihazınızın bugünkü tarihi başlangıç kabul edilir. Geçmişte başladığınız bir programın bitişini görmek ya da ileri bir tarihte başlamayı planlamak için alanı elle doldurabilirsiniz.'],
    ['Kilo almak için de kullanabilir miyim?', 'Evet. Hedef kiloyu mevcut kilonuzdan büyük yazmanız yeterlidir. Araç bu durumda süreyi aynı şekilde hesaplar ve gereken değeri günlük kalori fazlası olarak gösterir.'],
    ['Haftalık tempoyu ondalıklı yazabilir miyim?', 'Evet, virgül ya da nokta kullanarak 0,25 ya da 0,75 gibi değerler girebilirsiniz. Süre tam güne denk gelmezse küsurat bir sonraki güne yuvarlanır.'],
    ['Kilo bilgilerim kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; yazdığınız kilo ve tarih bilgileri hiçbir sunucuya gönderilmez ve sayfayı kapattığınızda silinir.'],
  ],
  related: ['kalori-acigi-hesapla', 'kilo-alma-kalori-hesapla', 'bazal-metabolizma-hesapla', 'makro-besin-hesapla', 'adim-kalori-hesapla'],
};
