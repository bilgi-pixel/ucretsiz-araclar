export default {
  slug: 'dms-ondalik-derece-cevir',
  title: 'Derece Dakika Saniye – Ondalık Derece Çevirici',
  h1Tail: 'DMS ↔ DD',
  pageTitle: "Derece Dakika Saniye – Ondalık Derece Çevirici (DMS ↔ DD)",
  description: "Derece, dakika ve saniyeyi ondalık dereceye, ondalık dereceyi DMS biçimine çevirin. Enlem-boylam koordinatları ve açı ölçüleri için iki yönlü hesaplama.",
  card: "Derece-dakika-saniyeyi ondalık dereceye, ondalık dereceyi DMS biçimine çevirin; koordinat ve açı ölçüleri için.",
  category: 'birim',
  keywords: ['derece dakika saniye çevirme', 'ondalık derece çevirme', 'dms dd çevirme', 'koordinat çevirme', 'enlem boylam ondalık', 'derece dakika saniye hesaplama', 'koordinat dönüştürme'],
  lead: "<strong>41° 0′ 30″</strong> gibi derece-dakika-saniye (DMS) biçimindeki bir açıyı ondalık dereceye ya da 41,008333° gibi ondalık bir değeri DMS biçimine çevirin. Enlem ve boylam koordinatlarında, harita ve navigasyon uygulamalarında ve açı ölçümlerinde iki gösterim arasında geçiş yapmak için kullanılır.",
  button: 'Çevir',
  inputs: [
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['dms', 'Derece dakika saniye → Ondalık derece'], ['ondalik', 'Ondalık derece → Derece dakika saniye']] },
    { id: 'derece', label: 'Derece (°)', type: 'number', placeholder: 'Örn. 41', hint: 'Yalnızca DMS yönünde kullanılır.' },
    { id: 'dakika', label: 'Dakika (′)', type: 'number', placeholder: 'Örn. 0', hint: 'Boş bırakılırsa 0 sayılır; 0–59,99 arası.' },
    { id: 'saniye', label: 'Saniye (″)', type: 'number', placeholder: 'Örn. 30', hint: 'Boş bırakılırsa 0 sayılır; ondalıklı olabilir.' },
    { id: 'isaret', label: 'Yön / işaret', type: 'select', options: [['arti', 'Kuzey ya da Doğu (+)'], ['eksi', 'Güney ya da Batı (−)']], hint: 'Yalnızca DMS yönünde kullanılır.' },
    { id: 'ondalik', label: 'Ondalık derece', type: 'number', placeholder: 'Örn. 41,008333', hint: 'Yalnızca ondalık yönde kullanılır; güney ve batı için eksi işareti koyun.' },
  ],
  compute(v, h) {
    let deger;
    if (v.yon === 'ondalik') {
      deger = h.num(v.ondalik, 'Ondalık derece');
    } else {
      const d = h.nonneg(v.derece, 'Derece');
      const m = h.opt(v.dakika, 0, 'Dakika');
      const s = h.opt(v.saniye, 0, 'Saniye');
      if (m < 0 || m >= 60) h.err('"Dakika" 0 ile 60 arasında olmalı (60 dahil değil). 60 dakikayı 1 derece olarak yazın.');
      if (s < 0 || s >= 60) h.err('"Saniye" 0 ile 60 arasında olmalı (60 dahil değil). 60 saniyeyi 1 dakika olarak yazın.');
      deger = d + m / 60 + s / 3600;
      if (v.isaret === 'eksi') deger = -deger;
    }
    const ss = Math.round(Math.abs(deger) * 360000);
    const d = Math.floor(ss / 360000);
    const m = Math.floor((ss % 360000) / 6000);
    const s = (ss % 6000) / 100;
    const eksi = deger < 0 && ss > 0 ? '-' : '';
    const dmsSatir = ['Derece dakika saniye', `${eksi}${d}° ${m}′ ${h.fmt(s, 2)}″`];
    const ddSatir = ['Ondalık derece', h.fmt(deger, 6) + '°'];
    const rows = v.yon === 'ondalik' ? [dmsSatir, ddSatir] : [ddSatir, dmsSatir];
    rows.push(['Derece ve ondalık dakika', `${eksi}${d}° ${h.fmt((ss % 360000) / 6000, 4)}′`]);
    rows.push(['Radyan', h.fmt(deger * Math.PI / 180, 6) + ' rad']);
    return { rows, note: '1° = 60′ = 3600″. Ondalık derece altı basamağa, saniye yüzde bire yuvarlanır. Eksi işaret güney enlemini ya da batı boylamını gösterir.' };
  },
  cases: [
    { in: { yon: 'dms', derece: '41', dakika: '0', saniye: '30', isaret: 'arti' }, out: { 'Ondalık derece': '41,008333°', 'Derece ve ondalık dakika': '41° 0,5′' } },
    { in: { yon: 'ondalik', ondalik: '40,2085' }, out: { 'Derece dakika saniye': '40° 12′ 30,6″', 'Derece ve ondalık dakika': '40° 12,51′' } },
    { in: { yon: 'dms', derece: '37', dakika: '54', saniye: '36', isaret: 'arti' }, out: { 'Ondalık derece': '37,91°' } },
    { in: { yon: 'ondalik', ondalik: '-73,9857' }, out: { 'Derece dakika saniye': '-73° 59′ 8,52″' } },
    { in: { yon: 'dms', derece: '73', dakika: '59', saniye: '8,52', isaret: 'eksi' }, out: { 'Ondalık derece': '-73,9857°' } },
    { in: { yon: 'dms', derece: '0', dakika: '30', saniye: '', isaret: 'arti' }, out: { 'Ondalık derece': '0,5°', 'Derece dakika saniye': '0° 30′ 0″' } },
    { in: { yon: 'ondalik', ondalik: '12,5' }, out: { 'Derece dakika saniye': '12° 30′ 0″', 'Radyan': '0,218166 rad' } },
    { in: { yon: 'dms', derece: '29', dakika: '', saniye: '', isaret: 'arti' }, out: { 'Ondalık derece': '29°' } },
    { in: { yon: 'dms', derece: '41', dakika: '60', saniye: '0', isaret: 'arti' }, error: true },
    { in: { yon: 'ondalik', ondalik: '' }, error: true },
    { in: { yon: 'dms', derece: '', dakika: '10', saniye: '5', isaret: 'arti' }, error: true },
  ],
  howto: [
    "'Çeviri yönü' listesinden DMS'den ondalığa ya da ondalıktan DMS'ye geçişi seçin.",
    "DMS yönünde derece, dakika ve saniyeyi ilgili kutulara yazın. Dakika ya da saniye yoksa kutuyu boş bırakabilirsiniz.",
    "Koordinat güney enlemi ya da batı boylamı ise 'Yön / işaret' listesinden eksi seçeneğini işaretleyin; sonuç negatif ondalık derece olarak gelir.",
    "Ondalık yönde yalnızca 'Ondalık derece' kutusunu doldurun; güney ve batı için sayının başına eksi koyun.",
    "'Çevir' düğmesine basın. Sonuçta ondalık derece, DMS, derece ve ondalık dakika ile radyan karşılığı birlikte listelenir.",
  ],
  sections: [
    { h: 'İki gösterim: DMS ve ondalık derece', p: [
      "Bir açıyı ya da coğrafi koordinatı yazmanın iki yaygın yolu vardır. <strong>Derece-dakika-saniye (DMS)</strong> gösteriminde derece 60 dakikaya, dakika 60 saniyeye bölünür; 41° 0′ 30″ gibi yazılır. <strong>Ondalık derece (DD)</strong> gösteriminde aynı açı tek bir sayıyla ifade edilir: 41,008333°. İkisi aynı büyüklüğü anlatır, yalnızca yazım farklıdır.",
      "DMS denizcilik haritalarında, topoğrafik paftalarda, tapu ve imar belgelerinde ve astronomide alışılmış biçimdir. Ondalık derece ise yazılımların, navigasyon cihazlarının ve hesap tablolarının tercihidir, çünkü tek bir sayı olarak saklanması ve işlenmesi kolaydır. Bir kaynaktan aldığınız koordinatı başka bir araca girerken çoğu zaman bu iki biçim arasında çeviri yapmak gerekir.",
      "Arada kalan üçüncü bir yazım da vardır: derece ve ondalık dakika (41° 0,5′). Denizcilikte ve bazı el tipi konum cihazlarında kullanılır. Araç bu biçimi de ayrı bir satırda verir.",
    ] },
    { h: 'Çeviri formülleri', p: [
      "DMS'den ondalığa: <strong>ondalık derece = derece + dakika ÷ 60 + saniye ÷ 3600</strong>. Güney enlemleri ve batı boylamları için sonuç eksi işaretle yazılır.",
      "Ondalıktan DMS'ye: sayının tam kısmı derecedir. Ondalık kısım 60 ile çarpılır; çıkan sayının tam kısmı dakikadır. Dakikanın ondalık kısmı yeniden 60 ile çarpılarak saniye bulunur. İşaret en sonda derecenin başına ya da yön harfi olarak eklenir.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Örnek 1: 41° 0′ 30″ kaç ondalık derecedir? 41 + 0 ÷ 60 + 30 ÷ 3600 = 41 + 0,008333 = 41,008333°. Derece ve ondalık dakika olarak 41° 0,5′ yazılır, çünkü 30 saniye yarım dakikadır.",
      "Örnek 2: 40,2085° DMS olarak nasıl yazılır? Derece 40'tır. 0,2085 × 60 = 12,51; dakika 12'dir. 0,51 × 60 = 30,6 saniye. Sonuç 40° 12′ 30,6″.",
      "Örnek 3: 37° 54′ 36″ için 54 ÷ 60 = 0,9 ve 36 ÷ 3600 = 0,01 bulunur; toplam 37,91°.",
      "Örnek 4: −73,9857° batı boylamıdır. İşaret bir kenara bırakılıp 73,9857 çevrilir: 0,9857 × 60 = 59,142 dakika, 0,142 × 60 = 8,52 saniye. Sonuç −73° 59′ 8,52″, yani 73° 59′ 8,52″ Batı.",
    ] },
    { h: 'Enlem ve boylamda işaret kuralı', ul: [
      "<strong>Kuzey enlemi (K / N):</strong> pozitif. Türkiye'nin tamamı kuzey yarımkürededir.",
      "<strong>Güney enlemi (G / S):</strong> negatif.",
      "<strong>Doğu boylamı (D / E):</strong> pozitif. Türkiye başlangıç meridyeninin doğusundadır.",
      "<strong>Batı boylamı (B / W):</strong> negatif.",
      "Enlem −90 ile +90, boylam −180 ile +180 derece arasında değer alır.",
      "Koordinat çiftlerinde çoğu yazılım önce enlemi, sonra boylamı bekler; bazı biçimler ise tersini kullanır. Sırayı karıştırmak noktayı bambaşka bir yere taşır.",
    ] },
    { h: 'Ondalık basamak sayısı ne kadar hassasiyet demektir?', p: [
      "Enlemde bir derece yeryüzünde yaklaşık 111 kilometreye karşılık gelir. Buna göre bir açı dakikası yaklaşık 1,85 kilometre, yani bir deniz mili; bir açı saniyesi ise yaklaşık 31 metredir. Ondalık derecede dördüncü basamak yaklaşık 11 metre, beşinci basamak yaklaşık 1,1 metre, altıncı basamak yaklaşık 11 santimetre duyarlılık demektir.",
      "Boylamda bir derecenin karşılığı sabit değildir; ekvatorda yine yaklaşık 111 kilometredir ama kutuplara doğru daralır. Türkiye'nin bulunduğu enlemlerde bir boylam derecesi kabaca 83 ile 90 kilometre arasındadır. Bu nedenle bir adresi ya da arazi köşesini tarif ederken en az beş ondalık basamak ya da saniyenin onda biri düzeyinde yazmak yerinde olur.",
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      "Ondalık kısmı dakika sanmak: 41,30° ile 41° 30′ aynı değildir. 41° 30′ ondalık olarak 41,5° eder.",
      "Derece ve ondalık dakika biçimini DMS gibi okumak: 41° 12,51′ ifadesinde virgülden sonraki 51 saniye değil, dakikanın kesridir.",
      "Eksi işaretini ya da yön harfini unutmak; batı boylamındaki bir nokta doğuya, güneydeki bir nokta kuzeye düşer.",
      "Dakika ya da saniyeye 60 ve üzeri değer yazmak. Araç bu durumda uyarı verir; 60 saniye 1 dakikaya eklenmelidir.",
      "Farklı kaynaklardaki koordinatların aynı datuma (referans sistemine) ait olduğunu varsaymak. Bu araç yalnızca yazım biçimini değiştirir, datum ya da projeksiyon dönüşümü yapmaz.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç bir gösterim çeviricisidir; enlem-boylam aralığı denetimi, UTM ya da başka bir projeksiyona dönüşüm ve iki nokta arası mesafe hesabı yapmaz. Tapu, kadastro, imar ve denizcilik gibi resmî ya da güvenlikle ilgili işlerde koordinatları yetkili kurumun verileriyle ve bir uzmanla doğrulayın.",
    ] },
  ],
  faq: [
    ['Derece dakika saniye ondalık dereceye nasıl çevrilir?', "Dakika 60'a, saniye 3600'e bölünür ve dereceye eklenir. Örneğin 41° 0′ 30″ için 41 + 0 + 30 ÷ 3600 = 41,008333° bulunur."],
    ['Ondalık derece DMS biçimine nasıl çevrilir?', "Tam kısım derecedir. Ondalık kısım 60 ile çarpılır, tam kısmı dakikadır; kalan ondalık yine 60 ile çarpılarak saniye elde edilir. 12,5° için sonuç 12° 30′ 0″ olur."],
    ['Bir derece kaç dakika, kaç saniyedir?', "1 derece 60 açı dakikası, 1 dakika 60 açı saniyesidir. Dolayısıyla 1 derece 3600 saniyedir. Bu dakika ve saniyeler zaman değil, açı birimidir."],
    ['Güney ve batı koordinatlarını nasıl girerim?', "DMS yönünde 'Yön / işaret' listesinden eksi seçeneğini seçin. Ondalık yönde sayının başına eksi işareti koyun. Sonuçta eksi işaret güney enlemini ya da batı boylamını gösterir."],
    ['Harita uygulamasından kopyaladığım koordinatı çevirebilir miyim?', "Evet. Uygulamalar genellikle ondalık derece verir; enlem ve boylamı ayrı ayrı 'Ondalık derece' kutusuna yazarak her birinin DMS karşılığını alabilirsiniz."],
    ['Dakikayı ondalıklı yazabilir miyim?', "Evet. 41° 12,51′ gibi derece ve ondalık dakika biçimindeki bir değeri, dakika kutusuna 12,51 yazıp saniyeyi boş bırakarak çevirebilirsiniz."],
    ['Saniye neden ondalıklı çıkıyor?', "Ondalık derecenin altmışlık sisteme tam oturması enderdir. Araç saniyeyi yüzde bir duyarlılıkla gösterir; bu, yeryüzünde yaklaşık 30 santimetrelik bir hassasiyete karşılık gelir."],
    ['Girdiğim koordinatlar bir yere gönderiliyor mu?', "Hayır. Çeviri tümüyle tarayıcınızda yapılır. Yazdığınız konum bilgisi hiçbir sunucuya iletilmez, saklanmaz ve harita servisleriyle paylaşılmaz."],
  ],
  related: ['derece-radyan-cevir', 'derece-grad-cevir', 'deniz-mili-km-cevir', 'radyan-devir-cevir', 'km-mil-cevir'],
};
