export default {
  slug: 'kondansator-seri-paralel-hesapla',
  title: 'Kondansatör Seri Paralel Hesaplama',
  h1Tail: 'eşdeğer kapasite',
  pageTitle: 'Kondansatör Seri Paralel Hesaplama – Eşdeğer Kapasite Bulma',
  description: 'Seri ya da paralel bağlı kondansatörlerin eşdeğer kapasitesini hesaplayın. pF, nF, µF birimleriyle çalışır; diğer bağlantı türündeki sonucu da karşılaştırmalı gösterir.',
  card: 'Seri ya da paralel bağlı kondansatörlerin toplam kapasitesini pF, nF ve µF cinsinden hesaplayın.',
  category: 'elektrik',
  keywords: ['kondansatör seri paralel hesaplama', 'eşdeğer kapasite', 'seri kondansatör hesaplama', 'paralel kondansatör hesaplama', 'kapasitör toplama', 'kondansatör bağlantı formülü', 'toplam sığa'],
  lead: 'Birden fazla kondansatörün seri ya da paralel bağlandığında oluşturduğu <strong>eşdeğer kapasiteyi</strong> bulun. Değerleri boşlukla ayırarak yazın, birimi ve bağlantı türünü seçin; araç sonucu hem seçtiğiniz birimde hem de en okunaklı birimde verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'degerler', label: 'Kapasite değerleri', type: 'text', placeholder: 'Örn. 10 22 47', hint: 'Değerleri boşlukla ayırın; ondalık için virgül kullanın (4,7).', wide: true },
    { id: 'birim', label: 'Birim', type: 'select', options: [['uF', 'Mikrofarad (µF)'], ['nF', 'Nanofarad (nF)'], ['pF', 'Pikofarad (pF)'], ['mF', 'Milifarad (mF)'], ['F', 'Farad (F)']] },
    { id: 'baglanti', label: 'Bağlantı türü', type: 'select', options: [['paralel', 'Paralel'], ['seri', 'Seri']] },
  ],
  compute(v, h) {
    const carpanlar = { pF: 1e-12, nF: 1e-9, uF: 1e-6, mF: 1e-3, F: 1 };
    const adlar = { pF: 'pF', nF: 'nF', uF: 'µF', mF: 'mF', F: 'F' };
    const birim = carpanlar[v.birim] ? v.birim : 'uF';
    const liste = h.nums(v.degerler, 'Kapasite değerleri');
    if (liste.some((x) => !(x > 0))) h.err('Kapasite değerleri sıfırdan büyük olmalı.');
    if (liste.length < 2) h.err('Hesap için en az iki kapasite değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 değer yazabilirsiniz.');
    const paralel = liste.reduce((a, b) => a + b, 0);
    const seri = 1 / liste.reduce((a, c) => a + 1 / c, 0);
    const uygun = (x) => {
      const f = x * carpanlar[birim];
      if (f < 0.9999999e-9) return h.sig(f / 1e-12, 6) + ' pF';
      if (f < 0.9999999e-6) return h.sig(f / 1e-9, 6) + ' nF';
      if (f < 0.9999999e-3) return h.sig(f / 1e-6, 6) + ' µF';
      if (f < 0.9999999) return h.sig(f / 1e-3, 6) + ' mF';
      return h.sig(f, 6) + ' F';
    };
    const seriMi = v.baglanti === 'seri';
    const sonuc = seriMi ? seri : paralel;
    return {
      rows: [
        ['Eşdeğer kapasite', h.fmt(sonuc, 4) + ' ' + adlar[birim]],
        ['Uygun birimle', uygun(sonuc)],
        ['Bağlantı türü', seriMi ? 'Seri' : 'Paralel'],
        ['Kondansatör sayısı', String(liste.length)],
        seriMi ? ['Paralel bağlansaydı', uygun(paralel)] : ['Seri bağlansaydı', uygun(seri)],
      ],
      note: seriMi
        ? 'Seri bağlantıda eşdeğer kapasite en küçük kondansatörden küçüktür; toplam gerilim dayanımı artar ancak gerilim eşit paylaşılmayabilir.'
        : 'Paralel bağlantıda kapasiteler toplanır; grubun gerilim dayanımı en düşük anma gerilimli kondansatör kadardır.',
    };
  },
  cases: [
    { in: { degerler: '10 22 47', birim: 'uF', baglanti: 'paralel' }, out: { 'Eşdeğer kapasite': '79 µF', 'Uygun birimle': '79 µF', 'Kondansatör sayısı': '3' } },
    { in: { degerler: '10 10', birim: 'uF', baglanti: 'seri' }, out: { 'Eşdeğer kapasite': '5 µF', 'Paralel bağlansaydı': '20 µF' } },
    { in: { degerler: '100 100 100', birim: 'nF', baglanti: 'seri' }, out: { 'Eşdeğer kapasite': '33,3333 nF', 'Paralel bağlansaydı': '300 nF' } },
    { in: { degerler: '6 3', birim: 'uF', baglanti: 'seri' }, out: { 'Eşdeğer kapasite': '2 µF', 'Bağlantı türü': 'Seri' } },
    { in: { degerler: '4700 4700', birim: 'uF', baglanti: 'paralel' }, out: { 'Eşdeğer kapasite': '9.400 µF', 'Uygun birimle': '9,4 mF', 'Seri bağlansaydı': '2,35 mF' } },
    { in: { degerler: '470 470', birim: 'pF', baglanti: 'paralel' }, out: { 'Eşdeğer kapasite': '940 pF', 'Seri bağlansaydı': '235 pF' } },
    { in: { degerler: '10 15 30', birim: 'nF', baglanti: 'seri' }, out: { 'Eşdeğer kapasite': '5 nF', 'Paralel bağlansaydı': '55 nF' } },
    { in: { degerler: '2200 1000', birim: 'pF', baglanti: 'paralel' }, out: { 'Eşdeğer kapasite': '3.200 pF', 'Uygun birimle': '3,2 nF' } },
    { in: { degerler: '10', birim: 'uF', baglanti: 'seri' }, error: true },
    { in: { degerler: '10 0', birim: 'uF', baglanti: 'paralel' }, error: true },
    { in: { degerler: '', birim: 'uF', baglanti: 'paralel' }, error: true },
  ],
  howto: [
    'Kondansatörlerin kapasite değerlerini aralarında boşluk bırakarak yazın. Örneğin üç kondansatör için "10 22 47".',
    'Değerlerin birimini seçin. Hepsi aynı birimde olmalıdır; 100 nF ile 1 µF\'ı birlikte girecekseniz ikisini de nanofarad olarak (100 ve 1000) yazın.',
    'Kondansatörlerin nasıl bağlandığını belirtin: uçları ortak iki noktada birleşiyorsa paralel, arka arkaya dizilmişlerse seri.',
    '"Hesapla" düğmesine basın. İlk satır eşdeğer kapasiteyi seçtiğiniz birimde, ikinci satır en okunaklı birimde gösterir.',
    'Son satırda aynı kondansatörlerin diğer bağlantı türünde vereceği değeri görerek iki seçeneği karşılaştırın.',
  ],
  sections: [
    { h: 'Kondansatörlerde kural dirençlerin tersidir', p: [
      'Dirençlerde seri bağlantı değerleri toplar, paralel bağlantı küçültür. Kondansatörlerde durum tam tersidir: <strong>paralel bağlantıda kapasiteler toplanır</strong>, seri bağlantıda eşdeğer kapasite küçülür. Bunun fiziksel açıklaması basittir. Paralel bağlanan kondansatörlerin plakaları yan yana gelerek tek bir büyük plaka gibi davranır; plaka alanı büyüdükçe kapasite artar. Seri bağlantıda ise plakalar arasındaki toplam yalıtkan kalınlığı artmış gibi olur ve kapasite azalır.',
    ] },
    { h: 'Formüller', p: [
      '<strong>Paralel:</strong> C<sub>eş</sub> = C<sub>1</sub> + C<sub>2</sub> + C<sub>3</sub> + … Her kondansatör aynı gerilimi görür, depolanan yükler toplanır.',
      '<strong>Seri:</strong> 1 ÷ C<sub>eş</sub> = 1 ÷ C<sub>1</sub> + 1 ÷ C<sub>2</sub> + 1 ÷ C<sub>3</sub> + … Yalnızca iki kondansatör için kısa yol: C<sub>eş</sub> = (C<sub>1</sub> × C<sub>2</sub>) ÷ (C<sub>1</sub> + C<sub>2</sub>). Seri bağlı kondansatörlerin hepsi aynı yükü taşır; gerilim ise kapasiteyle ters orantılı paylaşılır, yani küçük kondansatörün üzerine daha yüksek gerilim düşer.',
      'Değeri C olan n adet eş kondansatör paralel bağlanırsa n × C, seri bağlanırsa C ÷ n elde edilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Paralel:</strong> 10 µF, 22 µF ve 47 µF kondansatörler paralel bağlanırsa eşdeğer kapasite 10 + 22 + 47 = 79 µF olur.',
      '<strong>Seri, eş değerler:</strong> İki adet 10 µF kondansatör seri bağlanırsa 10 ÷ 2 = 5 µF elde edilir. Üç adet 100 nF seri bağlandığında 100 ÷ 3 = 33,3333 nF çıkar.',
      '<strong>Seri, farklı değerler:</strong> 6 µF ile 3 µF seri bağlıysa (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 µF bulunur. Sonuç, en küçük kondansatörden (3 µF) daha küçüktür. 10 nF, 15 nF ve 30 nF için terslerin toplamı 1/10 + 1/15 + 1/30 = 6/30 olduğundan eşdeğer 5 nF\'tır.',
      '<strong>Birim geçişi:</strong> İki adet 4.700 µF kondansatör paralel bağlandığında 9.400 µF, yani 9,4 mF elde edilir; seri bağlansalardı 2.350 µF olurdu.',
    ] },
    { h: 'Birimler arası geçiş', p: [
      'Farad günlük elektronik için çok büyük bir birimdir; bu yüzden alt katları kullanılır. Aralarındaki ilişki biner biner ilerler:',
    ], ul: [
      '1 F = 1.000 mF = 1.000.000 µF',
      '1 µF = 1.000 nF = 1.000.000 pF',
      '1 nF = 1.000 pF',
      '100 nF = 0,1 µF (seramik kondansatörlerde "104" koduyla gösterilir)',
      '4.700 µF = 4,7 mF',
    ] },
    { h: 'Hangi bağlantı ne zaman tercih edilir?', p: [
      '<strong>Paralel bağlantı</strong> en çok kapasiteyi artırmak için kullanılır. Güç kaynağı çıkışlarında büyük bir elektrolitik kondansatörün yanına küçük bir seramik kondansatör paralel konur; büyük olan düşük frekanslı dalgalanmayı, küçük olan yüksek frekanslı gürültüyü süzer. Elde 220 µF yoksa iki adet 100 µF ile bir adet 22 µF paralel bağlanarak 222 µF elde edilebilir.',
      '<strong>Seri bağlantı</strong> çoğunlukla gerilim dayanımını artırmak için yapılır. İki adet eş kondansatör seri bağlandığında kapasite yarıya iner, buna karşılık ideal durumda toplam gerilim dayanımı iki katına çıkar. Ancak gerçek kondansatörlerin kaçak akımları ve kapasite toleransları farklı olduğundan gerilim eşit paylaşılmaz; bu yüzden yüksek gerilim uygulamalarında her kondansatöre paralel dengeleme dirençleri eklenir.',
    ] },
    { h: 'Dikkat edilecekler ve uyarı', p: [
      'Paralel grupta gerilim dayanımı, grubun en düşük anma gerilimli elemanı kadardır; 16 V\'luk bir kondansatörü 25 V\'luklarla paralel bağlamak grubu 16 V ile sınırlar. Elektrolitik kondansatörler kutupludur; ters bağlantı ısınmaya ve patlamaya yol açabilir. Kapasite toleransları (özellikle elektrolitiklerde yüzde 20 yaygındır) hesaplanan değerin gerçekte bir miktar farklı çıkmasına neden olur.',
      'Büyük kapasiteli ya da yüksek gerilimli kondansatörler, devre kapatıldıktan sonra da tehlikeli miktarda yük tutabilir. Dokunmadan önce uygun bir dirençle boşaltılmaları gerekir. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; şebeke gerilimli ya da yüksek enerjili devrelerde yetkili bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Paralel bağlı kondansatörlerde toplam kapasite nasıl bulunur?', 'Değerler doğrudan toplanır. 10 µF, 22 µF ve 47 µF paralel bağlandığında 79 µF elde edilir.'],
    ['Seri bağlı kondansatörlerin eşdeğeri nasıl hesaplanır?', 'Her değerin tersi alınıp toplanır, sonra toplamın tersi alınır. İki kondansatör için çarpım bölü toplam kısayolu kullanılabilir: 6 µF ve 3 µF için 2 µF.'],
    ['Seri bağlantıda kapasite neden azalır?', 'Seri bağlantı, plakalar arasındaki yalıtkan mesafesini artırmış gibi etki eder. Mesafe arttıkça kapasite düşer; eşdeğer değer en küçük kondansatörden bile küçük olur.'],
    ['Kondansatörleri seri bağlamanın faydası nedir?', 'Toplam gerilim dayanımını artırır. İki eş kondansatör seri bağlandığında ideal durumda iki katı gerilime dayanır; pratikte dengeleme dirençleri kullanılması önerilir.'],
    ['Farklı birimdeki değerleri nasıl girerim?', 'Hepsini aynı birime çevirin. 1 µF = 1.000 nF, 1 nF = 1.000 pF. Örneğin 100 nF ve 1 µF için nanofarad seçip "100 1000" yazın.'],
    ['Farklı gerilim değerli kondansatörler paralel bağlanır mı?', 'Bağlanabilir, ancak grup en düşük anma gerilimli kondansatörün değeriyle sınırlanır. Devre gerilimi bu değerin altında kalmalıdır.'],
    ['Kutuplu ve kutupsuz kondansatörler birlikte kullanılabilir mi?', 'Paralel bağlantıda yaygın biçimde kullanılır; kutuplu olanın artı ve eksi uçlarının doğru yönde bağlanması yeterlidir. Kapasite hesabı aynı kalır.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kondansator-kodu-coz', 'kondansator-enerjisi-hesapla', 'rc-zaman-sabiti-hesapla', 'seri-direnc-hesapla', 'paralel-direnc-hesapla'],
};
