export default {
  slug: 'cari-oran-hesapla',
  title: 'Cari Oran Hesaplama',
  h1Tail: 'likidite oranları',
  pageTitle: 'Cari Oran Hesaplama – Asit-Test Oranı ve Net İşletme Sermayesi',
  description: 'Dönen varlıklar ve kısa vadeli borçlardan cari oranı hesaplayın; stok ve nakit tutarını da yazarak asit-test oranını, nakit oranını ve net işletme sermayesini görün.',
  card: 'Dönen varlık ve kısa vadeli borçlardan cari oranı, asit-test oranını, nakit oranını ve net işletme sermayesini hesaplayın.',
  category: 'finans',
  keywords: ['cari oran hesaplama', 'cari oran formülü', 'asit test oranı hesaplama', 'likidite oranı hesaplama', 'nakit oranı hesaplama', 'net işletme sermayesi', 'cari oran kaç olmalı'],
  lead: `Bilançonuzdaki dönen varlıklar ile kısa vadeli yabancı kaynaklar toplamını yazın; araç <strong>cari oranı</strong> ve net işletme sermayesini hesaplasın. Stok ve nakit tutarlarını da girerseniz asit-test ve nakit oranlarını aynı anda görürsünüz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'donen', label: 'Dönen varlıklar', type: 'number', placeholder: 'Örn. 500000' },
    { id: 'kvyk', label: 'Kısa vadeli yabancı kaynaklar', type: 'number', placeholder: 'Örn. 250000', hint: 'Bir yıl içinde ödenecek borçların toplamı.' },
    { id: 'stok', label: 'Stoklar (isteğe bağlı)', type: 'number', placeholder: 'Örn. 200000', hint: 'Asit-test oranı için.' },
    { id: 'nakit', label: 'Nakit ve benzerleri (isteğe bağlı)', type: 'number', placeholder: 'Örn. 50000', hint: 'Kasa, banka ve hemen paraya çevrilebilen menkul kıymetler; nakit oranı için.' },
  ],
  compute(v, h) {
    const donen = h.nonneg(v.donen, 'Dönen varlıklar');
    const kvyk = h.pos(v.kvyk, 'Kısa vadeli yabancı kaynaklar');
    const stokVar = String(v.stok ?? '').trim() !== '';
    const nakitVar = String(v.nakit ?? '').trim() !== '';
    const stok = stokVar ? h.nonneg(v.stok, 'Stoklar') : 0;
    const nakit = nakitVar ? h.nonneg(v.nakit, 'Nakit ve benzerleri') : 0;
    if (stok > donen) h.err('Stoklar dönen varlıkların bir parçasıdır; dönen varlıklar toplamından büyük olamaz.');
    if (nakit > donen) h.err('Nakit ve benzerleri dönen varlıkların bir parçasıdır; dönen varlıklar toplamından büyük olamaz.');
    if (stok + nakit > donen + 1e-9) h.err('Stoklar ile nakdin toplamı dönen varlıkları aşıyor; tutarları kontrol edin.');
    const cari = donen / kvyk;
    const nis = donen - kvyk;
    const yorum = cari < 1 - 1e-9 ? 'Dönen varlıklar kısa vadeli borçları karşılamıyor'
      : cari < 1.5 - 1e-9 ? 'Kısa vadeli borçlar karşılanıyor, güvenlik payı dar'
      : cari <= 2 + 1e-9 ? 'Genel kabul gören 1,5–2 aralığında'
      : 'Borç ödeme gücü yüksek; atıl varlık olup olmadığına bakın';
    const rows = [
      ['Cari oran', h.fmt(cari, 2)],
      ['Net işletme sermayesi', (nis < 0 ? '−' : '') + h.para(Math.abs(nis))],
    ];
    if (stokVar) rows.push(['Asit-test oranı', h.fmt((donen - stok) / kvyk, 2)]);
    if (nakitVar) rows.push(['Nakit oranı', h.fmt(nakit / kvyk, 2)]);
    rows.push(['Değerlendirme', yorum]);
    return {
      rows,
      note: 'Değerlendirme genel bir başparmak kuralına dayanır; uygun düzey sektöre, vade yapısına ve stokların niteliğine göre değişir.',
    };
  },
  cases: [
    { in: { donen: '500000', kvyk: '250000' }, out: { 'Cari oran': '2', 'Net işletme sermayesi': '250.000,00 TL', 'Değerlendirme': 'Genel kabul gören 1,5–2 aralığında' } },
    { in: { donen: '300000', kvyk: '400000' }, out: { 'Cari oran': '0,75', 'Net işletme sermayesi': '−100.000,00 TL', 'Değerlendirme': 'Dönen varlıklar kısa vadeli borçları karşılamıyor' } },
    { in: { donen: '500000', kvyk: '250000', stok: '200000', nakit: '50000' }, out: { 'Cari oran': '2', 'Asit-test oranı': '1,2', 'Nakit oranı': '0,2' } },
    { in: { donen: '360000', kvyk: '300000', stok: '120000' }, out: { 'Cari oran': '1,2', 'Asit-test oranı': '0,8', 'Değerlendirme': 'Kısa vadeli borçlar karşılanıyor, güvenlik payı dar' } },
    { in: { donen: '900000', kvyk: '300000', nakit: '150000' }, out: { 'Cari oran': '3', 'Nakit oranı': '0,5', 'Değerlendirme': 'Borç ödeme gücü yüksek; atıl varlık olup olmadığına bakın' } },
    { in: { donen: '1250000', kvyk: '800000', stok: '450000' }, out: { 'Cari oran': '1,56', 'Asit-test oranı': '1', 'Net işletme sermayesi': '450.000,00 TL' } },
    { in: { donen: '500000', kvyk: '0' }, error: true },
    { in: { donen: '500000', kvyk: '250000', stok: '600000' }, error: true },
    { in: { donen: 'abc', kvyk: '250000' }, error: true },
  ],
  howto: [
    `Bilançonuzun aktif tarafındaki "Dönen Varlıklar" grubunun toplamını ilk alana yazın.`,
    `Pasif taraftaki "Kısa Vadeli Yabancı Kaynaklar" grubunun toplamını ikinci alana girin.`,
    `Asit-test oranını da görmek için stoklar toplamını, nakit oranı için kasa, banka ve benzeri hazır değerlerin toplamını isteğe bağlı alanlara ekleyin.`,
    `"Hesapla" düğmesine basın. Cari oran ilk satırda; net işletme sermayesi, diğer likidite oranları ve kısa bir değerlendirme altında görünür.`,
  ],
  sections: [
    { h: 'Cari oran nedir?', p: [
      `Cari oran, bir işletmenin bir yıl içinde paraya çevirmeyi beklediği varlıklarının, bir yıl içinde ödemesi gereken borçlarını kaç kez karşıladığını gösteren likidite oranıdır. Formülü yalındır: <strong>Cari oran = Dönen varlıklar ÷ Kısa vadeli yabancı kaynaklar</strong>. Sonuç bir yüzde değil, bir kat sayıdır; 2 çıkması, her 1 liralık kısa vadeli borca karşılık 2 liralık dönen varlık bulunduğu anlamına gelir.`,
      `Dönen varlıklar; kasa, banka, menkul kıymetler, ticari alacaklar, stoklar ve gelecek aylara ait giderler gibi kalemlerden oluşur. Kısa vadeli yabancı kaynaklar ise banka kredilerinin bir yıl içinde ödenecek kısmını, satıcılara borçları, ödenecek vergi ve sosyal güvenlik primlerini, alınan avansları kapsar. Tekdüzen Hesap Planı'nda bunlar sırasıyla 1 ve 3 ile başlayan hesap sınıflarıdır.`,
    ] },
    { h: 'Asit-test oranı, nakit oranı ve net işletme sermayesi', p: [
      `Cari oran bütün dönen varlıkları aynı ölçüde likit sayar; oysa stokun satılıp tahsil edilmesi zaman alır. Bu yüzden üç tamamlayıcı ölçü kullanılır.`,
    ], ul: [
      `<strong>Asit-test (likidite) oranı</strong> = (Dönen varlıklar − Stoklar) ÷ Kısa vadeli yabancı kaynaklar. Stok satılamasa bile borçların ne ölçüde ödenebileceğini gösterir.`,
      `<strong>Nakit oranı</strong> = Nakit ve benzerleri ÷ Kısa vadeli yabancı kaynaklar. Alacaklar da tahsil edilemezse elde hazır duran paranın borçları karşılama gücüdür.`,
      `<strong>Net işletme sermayesi</strong> = Dönen varlıklar − Kısa vadeli yabancı kaynaklar. Aynı karşılaştırmayı oran olarak değil lira olarak verir; negatifse kısa vadeli borçlar dönen varlıkları aşıyordur.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `Bir toptan ticaret işletmesinin bilançosunda dönen varlıklar 500.000 lira, kısa vadeli yabancı kaynaklar 250.000 lira olsun. Dönen varlıkların 200.000 lirası stok, 50.000 lirası kasa ve banka mevcududur.`,
    ], ol: [
      `Cari oran: 500.000 ÷ 250.000 = 2.`,
      `Net işletme sermayesi: 500.000 − 250.000 = 250.000 lira.`,
      `Asit-test oranı: (500.000 − 200.000) ÷ 250.000 = 1,2.`,
      `Nakit oranı: 50.000 ÷ 250.000 = 0,2.`,
      `Yorum: İşletme stoklarını hiç satamasa bile alacakları ve nakdiyle kısa vadeli borçlarını karşılayabiliyor; ancak borçların yalnızca beşte biri hazır parayla ödenebilir durumda, geri kalanı alacakların tahsiline bağlı.`,
    ] },
    { h: 'Cari oran kaç olmalı?', p: [
      `Finans kitaplarında cari oran için 2, asit-test oranı için 1, nakit oranı için 0,2 dolayı değerler yeterli kabul edilen başparmak kuralları olarak anılır. Gelişmekte olan ülkelerde ve kısa vadeli borçlanmanın yaygın olduğu piyasalarda cari oranın 1,5 dolayında olması da çoğu zaman yeterli sayılır. Araçtaki değerlendirme satırı bu genel aralıklara göre yazılmıştır.`,
      `Bu eşikler kesin kural değildir. Peşin satış yapıp vadeli mal alan perakende zincirleri 1'in altında cari oranla sorunsuz çalışabilir, çünkü stokları günler içinde nakde döner. Uzun üretim süreli ya da vadeli satış yapan işletmelerde ise 2'nin üzerindeki oran bile rahatlatıcı olmayabilir. Çok yüksek cari oran da her zaman iyi haber değildir: atıl nakit, tahsil edilemeyen alacak ya da satılamayan stok birikimini gösterebilir.`,
    ] },
    { h: 'Yorumlarken dikkat edilecekler', ul: [
      `<strong>Alacakların kalitesi:</strong> Tahsili şüpheli alacaklar dönen varlıkları şişirir. Vadesi geçmiş alacakları ayrıca inceleyin.`,
      `<strong>Stokların niteliği:</strong> Modası geçmiş ya da yavaş dönen stok bilançoda görünse de borç ödemeye yaramaz.`,
      `<strong>Bilanço günü etkisi:</strong> Oran tek bir günün fotoğrafıdır. Dönem sonundan hemen önce borç ödemek ya da tahsilatı hızlandırmak oranı geçici olarak iyileştirebilir.`,
      `<strong>Vade uyumu:</strong> Borçların çoğu önümüzdeki ay, alacakların çoğu altı ay sonra vadeliyse oran yüksek olsa bile nakit sıkışıklığı yaşanabilir.`,
      `<strong>Eğilim:</strong> Tek dönemin değeri yerine birkaç dönemin seyrine ve sektör ortalamasına bakmak daha anlamlıdır.`,
    ] },
    { h: 'Uyarı', p: [
      `Bu araç yalnızca girdiğiniz bilanço tutarlarından oran hesaplar; işletmenin gerçek ödeme gücü hakkında tek başına hüküm vermez. Sonuçlar bilgilendirme amaçlıdır. Kredi, yatırım, ortaklık ya da şirket değerlemesi gibi kararlar için bağımsız denetçi, mali müşavir ya da finans uzmanına danışın.`,
    ] },
  ],
  faq: [
    [`Cari oran nasıl hesaplanır?`, `Dönen varlıklar toplamı kısa vadeli yabancı kaynaklar toplamına bölünür. 500.000 liralık dönen varlık ve 250.000 liralık kısa vadeli borçta cari oran 2'dir.`],
    [`Cari oranın 1'in altında olması ne anlama gelir?`, `Kısa vadeli borçların dönen varlıklardan fazla olduğunu, yani net işletme sermayesinin negatif olduğunu gösterir. İşletme borçlarını ödemek için duran varlık satmak, yeni borç bulmak ya da sermaye koymak zorunda kalabilir. Stoku çok hızlı dönen bazı sektörlerde bu durum olağan olabilir.`],
    [`Asit-test oranı ile cari oran arasındaki fark nedir?`, `Asit-test oranında stoklar dönen varlıklardan çıkarılır. Stokun paraya çevrilmesi en uzun süren kalem olduğu varsayıldığı için bu oran daha ihtiyatlı bir likidite ölçüsüdür.`],
    [`Net işletme sermayesi negatif çıkarsa ne yapmalıyım?`, `Önce borçların ve alacakların vade dağılımına bakın. Kısa vadeli kredileri uzun vadeye yaymak, alacak tahsil süresini kısaltmak, stok düzeyini düşürmek ya da özkaynak artırmak sık başvurulan yollardır. Karar için mali danışmanınızla görüşün.`],
    [`Cari oran çok yüksek olursa kötü mü?`, `Tek başına kötü değildir, ancak kaynakların verimsiz kullanıldığına işaret edebilir. Atıl nakit, tahsil edilemeyen alacaklar ya da satılamayan stoklar oranı yükseltir; nedenini kalem kalem incelemek gerekir.`],
    [`Hangi tarihli bilanço tutarlarını kullanmalıyım?`, `İki tutar da aynı bilanço tarihine ait olmalıdır. Güncel durumu görmek için en son ara dönem mizanını, dönemler arası karşılaştırma için yıl sonu bilançolarını kullanabilirsiniz.`],
    [`Stok ve nakit alanlarını boş bırakabilir miyim?`, `Evet. Bu iki alan isteğe bağlıdır; boş bıraktığınızda yalnızca cari oran ve net işletme sermayesi hesaplanır, asit-test ve nakit oranı satırları gösterilmez.`],
    [`Bilanço verilerim kaydediliyor mu?`, `Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız tutarlar sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['borc-ozkaynak-orani-hesapla', 'stok-devir-hizi-hesapla', 'nakit-donusum-suresi-hesapla', 'alacak-devir-hizi-hesapla', 'ozkaynak-karliligi-hesapla'],
};
