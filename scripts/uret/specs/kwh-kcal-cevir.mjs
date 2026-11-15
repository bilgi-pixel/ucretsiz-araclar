export default {
  slug: 'kwh-kcal-cevir',
  title: 'Kilovatsaat Kilokalori Çevirici',
  h1Tail: 'kWh ↔ kcal',
  pageTitle: 'Kilovatsaat Kilokalori Çevirici – kWh\'den kcal\'ye, kcal\'den kWh\'ye',
  description: 'Kilovatsaati kilokaloriye, kilokaloriyi kilovatsaate çevirin. 1 kWh ≈ 860,42 kcal eşitliğiyle elektrik, doğal gaz ve yakıt enerjisini aynı birimde karşılaştırın.',
  card: 'kWh\'yi kcal\'ye, kcal\'yi kWh\'ye çevirin; elektrik, doğal gaz ve yakıt enerjisini MJ karşılığıyla birlikte karşılaştırın.',
  category: 'birim',
  keywords: ['kwh kcal çevirme', '1 kwh kaç kcal', 'kcal kwh dönüştürme', 'kilovatsaat kilokalori', '860 kcal kwh', 'doğal gaz kcal kwh', 'kwh kalori hesaplama'],
  lead: 'Enerjiyi kilovatsaat (kWh) ile kilokalori (kcal) arasında çevirin. Araç <strong>1 kWh ≈ 860,42 kcal</strong> eşitliğini kullanır; elektrik faturasındaki tüketimi yakıtların ısıl değeriyle aynı birimde görmenizi sağlar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 9155', hint: 'Binlik ayraç kullanmadan yazın. Tek noktalı yazım ondalık sayılır.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kwh', 'Kilovatsaat → Kilokalori'], ['kcal', 'Kilokalori → Kilovatsaat']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kj = v.yon === 'kcal' ? x * 4.184 : x * 3600;
    const kcalRow = ['Kilokalori', h.fmt(kj / 4.184, 2) + ' kcal'];
    const kwhRow = ['Kilovatsaat', h.fmt(kj / 3600, 4) + ' kWh'];
    return {
      rows: [
        ...(v.yon === 'kcal' ? [kwhRow, kcalRow] : [kcalRow, kwhRow]),
        ['Megajoule', h.fmt(kj / 1000, 4) + ' MJ'],
        ['Kilojoule', h.fmt(kj, 1) + ' kJ'],
      ],
      note: '1 kWh = 3600 kJ ve 1 kcal = 4,184 kJ alınmıştır. Sonuç yalnızca enerji eşdeğeridir; cihaz verimi hesaba katılmaz.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'kwh' }, out: { 'Kilokalori': '860,42 kcal', 'Megajoule': '3,6 MJ', 'Kilojoule': '3.600 kJ' } },
    { in: { deger: '2000', yon: 'kcal' }, out: { 'Kilovatsaat': '2,3244 kWh', 'Megajoule': '8,368 MJ' } },
    { in: { deger: '10', yon: 'kwh' }, out: { 'Kilokalori': '8.604,21 kcal' } },
    { in: { deger: '860', yon: 'kcal' }, out: { 'Kilovatsaat': '0,9995 kWh' } },
    { in: { deger: '9155', yon: 'kcal' }, out: { 'Kilovatsaat': '10,6401 kWh' } },
    { in: { deger: '0,5', yon: 'kwh' }, out: { 'Kilokalori': '430,21 kcal' } },
    { in: { deger: '100', yon: 'kwh' }, out: { 'Kilokalori': '86.042,07 kcal', 'Megajoule': '360 MJ' } },
    { in: { deger: '0', yon: 'kcal' }, out: { 'Kilovatsaat': '0 kWh' } },
    { in: { deger: '', yon: 'kwh' }, error: true },
    { in: { deger: '-5', yon: 'kwh' }, error: true },
  ],
  howto: [
    'Çevirmek istediğiniz enerji miktarını "Değer" alanına yazın: faturadaki kWh tüketimi, bir yakıtın kcal cinsinden ısıl değeri ya da bir cihazın saatlik kcal kapasitesi olabilir.',
    'Elinizdeki değer kWh ise "Kilovatsaat → Kilokalori", kcal ise "Kilokalori → Kilovatsaat" yönünü seçin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, diğer satırlar megajoule ve kilojoule değerlerini verir.',
    'Farklı enerji kaynaklarını karşılaştırıyorsanız hepsini kWh\'ye çevirip sonuçları kopyalayarak yan yana yazın.',
  ],
  sections: [
    { h: 'kWh ve kcal neden birbirine çevrilir?', p: [
      'Kilovatsaat elektrik enerjisinin, kilokalori ise ısı enerjisinin alışılmış birimidir. İkisi de aynı fiziksel büyüklüğü, yani enerjiyi ölçer; ancak farklı sektörler farklı birime alışmıştır. Elektrik sayaçları kWh ile çalışır. Kombi, kazan, soba ve kalorifer sistemlerinde kapasiteler uzun yıllar kcal/saat ile, yakıtların ısıl değerleri ise kilogram ya da metreküp başına kcal ile verilmiştir.',
      'Isınma giderini karşılaştırmak isteyen biri kaçınılmaz olarak bu iki dünyayı bir araya getirmek zorunda kalır: klimayla ya da elektrikli ısıtıcıyla ısınmanın kWh tüketimi ile doğal gaz, kömür ya da odunun kcal cinsinden ısısı ancak ortak bir birimde karşılaştırılabilir.',
    ] },
    { h: 'Dönüşüm katsayısı nasıl bulunur?', p: [
      'Her iki birim de joule üzerinden tanımlıdır. Bir kilovatsaat 3600 kilojoule\'dür (1000 W × 3600 s). Bir kilokalori ise 4,184 kilojoule\'dür. İkisini oranladığınızda 3600 ÷ 4,184 = 860,42 bulunur. Yani <strong>kcal = kWh × 860,42</strong> ve <strong>kWh = kcal ÷ 860,42</strong>; ikinci formül kcal × 0,0011622 olarak da yazılabilir.',
      'Teknik kaynaklarda bu katsayı çoğunlukla yuvarlanarak <strong>860</strong> alınır. Uluslararası tablo kalorisiyle (4,1868 kJ) hesap yapıldığında katsayı 859,85 olur. Üç değer arasındaki fark binde birin altındadır ve ısınma hesaplarındaki diğer belirsizliklerin yanında önemsizdir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Elektrikten ısıya:</strong> 10 kWh elektrik enerjisi 10 × 860,42 = 8604,21 kcal\'ye eşdeğerdir. Verimi yüzde yüze yakın olan elektrikli bir ısıtıcı bu enerjinin neredeyse tamamını ısıya çevirir.',
      '<strong>Yakıttan elektriğe:</strong> Isıl değeri 9155 kcal olarak verilen bir metreküp gazın enerjisi 9155 ÷ 860,42 = 10,6401 kWh\'dir.',
      '<strong>Besin enerjisi:</strong> 2000 kcal\'lik günlük besin enerjisi 2,3244 kWh, yani 8,368 MJ eder. Bu, bir insanın gün boyu kullandığı enerjinin birkaç kilovatsaatlik bir elektrik tüketimi düzeyinde olduğunu gösterir.',
      '<strong>Yuvarlak katsayının sınanması:</strong> 860 kcal tam 1 kWh değil, 0,9995 kWh eder; 860 yuvarlamasının hatası on binde beş kadardır.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>0,5 kWh</strong> ≈ 430,21 kcal',
      '<strong>1 kWh</strong> ≈ 860,42 kcal = 3,6 MJ',
      '<strong>10 kWh</strong> ≈ 8604,21 kcal',
      '<strong>100 kWh</strong> ≈ 86.042,07 kcal',
      '<strong>1000 kcal</strong> ≈ 1,1622 kWh',
      '<strong>10.000 kcal</strong> ≈ 11,6222 kWh',
      '<strong>20.000 kcal</strong> ≈ 23,2444 kWh',
    ] },
    { h: 'Doğal gaz, kombi ve kcal/saat', p: [
      'Kombi ve kazanların kapasitesi eski etiketlerde kcal/saat, yenilerinde kilovat olarak yazar. Enerji ile güç arasındaki ilişki aynı katsayıyı kullanır: 1 kW ≈ 860,42 kcal/saat. Bu yüzden kapasite çevirmek için de bu aracı kullanabilirsiniz; kcal/saat değerini girdiğinizde "Kilovatsaat" satırındaki sayı aynı zamanda kilovat cinsinden kapasitedir. Örneğin 20.000 kcal/saat yaklaşık 23,24 kW eder.',
      'Doğal gaz tüketimi sayaçta metreküp olarak ölçülür; faturalandırmada gazın ısıl değeri üzerinden kWh\'ye dönüştürülmesi yaygın bir uygulamadır. Kullanılan ısıl değer ve dönüşüm yöntemi dağıtım şirketine ve döneme göre değişebilir; kendi hesabınızı yaparken faturanızda yazan değerleri esas alın ve güncel mevzuatı kontrol edin.',
    ] },
    { h: 'Eşdeğer enerji, eşit ısınma demek değildir', p: [
      'Bu sayfanın verdiği sonuç yalnızca enerji eşdeğeridir. Gerçek hayatta her cihaz yakıtın ya da elektriğin enerjisini farklı oranda faydalı ısıya çevirir. Yoğuşmalı bir kombi, eski tip bir soba ve bir ısı pompası aynı miktar enerjiyle çok farklı miktarda ısı sağlar. Isı pompaları ve inverter klimalar tükettikleri her kWh elektrik için ortamdan aldıkları ısıyla birlikte birkaç kWh\'lik ısı verebilir; yakmalı cihazlar ise baca kayıpları nedeniyle yakıt enerjisinin bir bölümünü kaybeder.',
      'Maliyet karşılaştırması yaparken sırasıyla şu adımları izlemek gerekir: yakıtın ya da elektriğin enerji içeriğini ortak birime çevirin, cihaz verimiyle çarpıp faydalı ısıyı bulun, sonra birim fiyatı faydalı ısıya bölün. Araç bu zincirin yalnızca ilk halkasını yapar.',
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      'Sonuçlar bilgilendirme amaçlıdır. Isıtma sistemi seçimi, kapasite belirleme ve yatırım kararları için binanın ısı kaybı hesabı gerekir; bu konuda bir tesisat mühendisine ya da yetkili servise danışın. Araç negatif değer kabul etmez ve tarife fiyatı, vergi ya da abonelik bedeli içermez.',
    ] },
  ],
  faq: [
    ['1 kWh kaç kcal eder?', '1 kilovatsaat yaklaşık 860,42 kilokaloridir. Teknik hesaplarda çoğunlukla 860 kcal olarak yuvarlanır.'],
    ['1 kcal kaç kWh eder?', '1 kilokalori yaklaşık 0,001162 kWh, yani 1,162 watt-saattir. 1000 kcal yaklaşık 1,1622 kWh eder.'],
    ['Neden bazı kaynaklarda 860, bazılarında 859,85 yazıyor?', 'Fark kalorinin tanımından gelir. Termokimyasal kaloriyle (4,184 J) katsayı 860,42; uluslararası tablo kalorisiyle (4,1868 J) 859,85\'tir. 860 ise her ikisinin pratik yuvarlamasıdır.'],
    ['24.000 kcal/saat kombi kaç kW eder?', '24.000 ÷ 860,42 yaklaşık 27,89 kW eder. kcal/saat değerini araca girip "Kilovatsaat" satırındaki sayıyı kilovat olarak okuyabilirsiniz.'],
    ['Bir metreküp doğal gaz kaç kWh eder?', 'Bu, gazın ısıl değerine bağlıdır ve sabit değildir. Isıl değer 9155 kcal alınırsa yaklaşık 10,64 kWh bulunur. Kendi hesabınız için faturanızda belirtilen değeri kullanın.'],
    ['Yediğim kaloriyi kWh\'ye çevirmek anlamlı mı?', 'Birim olarak doğrudur; 2000 kcal yaklaşık 2,32 kWh eder. Ancak bu yalnızca büyüklük karşılaştırması içindir; vücudun enerji kullanımı bir elektrikli cihazınkiyle aynı biçimde değerlendirilemez.'],
    ['1 kWh elektrikle ne kadar su ısıtılır?', 'Kayıpsız varsayımla 860,42 kcal, 860,42 litre suyu 1 °C ya da yaklaşık 21,5 litre suyu 40 °C ısıtır. Gerçekte kayıplar nedeniyle bu miktar biraz daha azdır.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kwh-joule-cevir', 'kcal-kj-cevir', 'btu-kcal-cevir', 'kombi-kapasite-hesapla', 'elektrik-tuketim-hesapla', 'isi-enerjisi-hesapla'],
};
