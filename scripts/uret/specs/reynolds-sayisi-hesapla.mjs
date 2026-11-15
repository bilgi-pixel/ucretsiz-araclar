export default {
  slug: 'reynolds-sayisi-hesapla',
  title: 'Reynolds Sayısı Hesaplama',
  h1Tail: 'laminer mi, türbülanslı mı?',
  pageTitle: 'Reynolds Sayısı Hesaplama – Laminer ve Türbülanslı Akış Rejimi',
  description: 'Akış hızı, boru çapı, yoğunluk ve viskoziteden Reynolds sayısını hesaplayın; boru akışının laminer, geçiş ya da türbülanslı olduğunu ve laminer sınır hızını görün.',
  card: 'Hız, çap, yoğunluk ve viskoziteden Reynolds sayısını bulun; akışın laminer mi türbülanslı mı olduğunu öğrenin.',
  category: 'bilim',
  keywords: ['reynolds sayısı hesaplama', 'reynolds sayısı formülü', 'laminer akış', 'türbülanslı akış', 'akış rejimi', 'Re sayısı', 'kinematik viskozite', 'boru akışı hesaplama'],
  lead: 'Bir akışkanın boru içindeki akışının düzenli mi (laminer) yoksa çalkantılı mı (türbülanslı) olacağını Reynolds sayısıyla belirleyin. Araç <strong>Re = ρ·v·D/μ</strong> bağıntısını kullanır; su ve hava için 20 °C\'deki yaklaşık özellikler hazır gelir, başka akışkanlar için değerleri kendiniz girebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'akiskan', label: 'Akışkan', type: 'select', options: [['su', 'Su (20 °C)'], ['hava', 'Hava (20 °C, 1 atm)'], ['ozel', 'Diğer (yoğunluk ve viskoziteyi ben gireceğim)']] },
    { id: 'hiz', label: 'Ortalama akış hızı (m/s)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'cap', label: 'Boru iç çapı / karakteristik uzunluk (m)', type: 'number', placeholder: 'Örn. 0,05', hint: 'Metre cinsinden; 50 mm için 0,05 yazın.' },
    { id: 'yogunluk', label: 'Yoğunluk (kg/m³)', type: 'number', placeholder: 'Örn. 1000', hint: 'Yalnızca "Diğer" seçildiğinde kullanılır.' },
    { id: 'viskozite', label: 'Dinamik viskozite (Pa·s)', type: 'number', placeholder: 'Örn. 0,001', hint: 'Yalnızca "Diğer" seçildiğinde kullanılır. 1 cP = 0,001 Pa·s.' },
  ],
  compute(v, h) {
    const hiz = h.pos(v.hiz, 'Akış hızı');
    const D = h.pos(v.cap, 'Çap');
    let ro;
    let mu;
    if (v.akiskan === 'ozel') {
      ro = h.pos(v.yogunluk, 'Yoğunluk');
      mu = h.pos(v.viskozite, 'Dinamik viskozite');
    } else if (v.akiskan === 'hava') { ro = 1.204; mu = 1.825e-5; }
    else { ro = 998.2; mu = 1.002e-3; }
    const Re = ro * hiz * D / mu;
    let rejim;
    if (Re < 2300) rejim = 'Laminer (Re < 2300)';
    else if (Re <= 4000) rejim = 'Geçiş bölgesi (2300–4000)';
    else rejim = 'Türbülanslı (Re > 4000)';
    return {
      rows: [
        ['Reynolds sayısı', h.sig(Re, 5)],
        ['Akış rejimi (boru akışı)', rejim],
        ['Kinematik viskozite', h.sig(mu / ro) + ' m²/s'],
        ['Laminer sınır hızı (Re = 2300)', h.sig(2300 * mu / (ro * D)) + ' m/s'],
        ['Kullanılan yoğunluk', h.sig(ro) + ' kg/m³'],
        ['Kullanılan dinamik viskozite', h.sig(mu) + ' Pa·s'],
      ],
      note: 'Rejim sınırları dairesel kesitli boru içi akış için yaygın kabul edilen değerlerdir. Su ve hava özellikleri 20 °C için yaklaşık değerlerdir; sıcaklıkla değişir.',
    };
  },
  cases: [
    { in: { akiskan: 'su', hiz: '1', cap: '0,05' }, out: { 'Reynolds sayısı': '49.810', 'Akış rejimi (boru akışı)': 'Türbülanslı (Re > 4000)' } },
    { in: { akiskan: 'ozel', hiz: '0,02', cap: '0,05', yogunluk: '1000', viskozite: '0,001' }, out: { 'Reynolds sayısı': '1.000', 'Akış rejimi (boru akışı)': 'Laminer (Re < 2300)', 'Kinematik viskozite': '0,000001 m²/s', 'Laminer sınır hızı (Re = 2300)': '0,046 m/s' } },
    { in: { akiskan: 'hava', hiz: '10', cap: '0,1' }, out: { 'Reynolds sayısı': '65.973' } },
    { in: { akiskan: 'ozel', hiz: '0,06', cap: '0,05', yogunluk: '1000', viskozite: '0,001' }, out: { 'Reynolds sayısı': '3.000', 'Akış rejimi (boru akışı)': 'Geçiş bölgesi (2300–4000)' } },
    { in: { akiskan: 'ozel', hiz: '2', cap: '0,1', yogunluk: '1000', viskozite: '0,001' }, out: { 'Reynolds sayısı': '200.000', 'Akış rejimi (boru akışı)': 'Türbülanslı (Re > 4000)' } },
    { in: { akiskan: 'ozel', hiz: '0,5', cap: '0,02', yogunluk: '900', viskozite: '0,09' }, out: { 'Reynolds sayısı': '100', 'Akış rejimi (boru akışı)': 'Laminer (Re < 2300)' } },
    { in: { akiskan: 'su', hiz: '0,01', cap: '0,02' }, out: { 'Reynolds sayısı': '199,24', 'Akış rejimi (boru akışı)': 'Laminer (Re < 2300)' } },
    { in: { akiskan: 'ozel', hiz: '1', cap: '0,05', yogunluk: '1000', viskozite: '' }, error: true },
    { in: { akiskan: 'su', hiz: '-1', cap: '0,05' }, error: true },
    { in: { akiskan: 'su', hiz: '1', cap: '0' }, error: true },
  ],
  howto: [
    '"Akışkan" listesinden su ya da havayı seçin; başka bir sıvı ya da gaz için "Diğer" seçeneğini işaretleyin.',
    'Akışkanın borudaki ortalama hızını m/s olarak yazın. Debi biliniyorsa hız, debinin boru kesit alanına bölünmesiyle bulunur.',
    'Borunun iç çapını metre cinsinden girin. Boru dışındaki akışlarda buraya ilgili karakteristik uzunluk yazılır.',
    '"Diğer" seçtiyseniz akışkanın yoğunluğunu kg/m³, dinamik viskozitesini Pa·s olarak girin.',
    '"Hesapla" düğmesine basın. Reynolds sayısı, akış rejimi, kinematik viskozite ve akışın laminer kalacağı en yüksek hız görüntülenir.',
  ],
  sections: [
    { h: 'Reynolds sayısı neyi anlatır?', p: [
      'Reynolds sayısı, bir akıştaki eylemsizlik kuvvetlerinin viskoz (iç sürtünme) kuvvetlere oranını veren boyutsuz bir sayıdır. Adını, on dokuzuncu yüzyılın sonunda cam bir borudaki su akışına boya vererek düzenli akıştan çalkantılı akışa geçişi inceleyen Osborne Reynolds\'tan alır. Birimi yoktur; aynı Reynolds sayısına sahip iki akış, boyutları ve akışkanları farklı olsa bile benzer davranır. Rüzgâr tünelinde küçük modellerle yapılan deneylerin gerçek boyuttaki araçlara uygulanabilmesi bu benzerliğe dayanır.',
      'Sayı küçükken viskozite baskındır: akışkan, birbirine karışmayan düzgün katmanlar hâlinde kayar. Buna <strong>laminer akış</strong> denir. Sayı büyüdükçe eylemsizlik öne geçer, küçük bozulmalar sönmek yerine büyür ve akış girdaplı, karışık bir yapıya bürünür. Buna <strong>türbülanslı akış</strong> denir.',
    ] },
    { h: 'Formül ve büyüklükler', p: [
      'Reynolds sayısı <strong>Re = ρ·v·D/μ</strong> bağıntısıyla hesaplanır. ρ akışkanın yoğunluğu (kg/m³), v ortalama akış hızı (m/s), D karakteristik uzunluk (boru akışında iç çap, m) ve μ dinamik viskozitedir (Pa·s). Dinamik viskozitenin yoğunluğa oranına kinematik viskozite denir (ν = μ/ρ, birimi m²/s); bu durumda formül <strong>Re = v·D/ν</strong> biçiminde de yazılabilir.',
      'Viskozite için eski kaynaklarda santipuaz (cP) birimi sık görülür: 1 cP = 0,001 Pa·s. Oda sıcaklığındaki suyun viskozitesi yaklaşık 1 cP olduğundan bu çeviri akılda kolay kalır. Kinematik viskozitede kullanılan santistok (cSt) ise 10<sup>-6</sup> m²/s\'dir.',
    ] },
    { h: 'Boru akışında rejim sınırları', ul: [
      '<strong>Re < 2300</strong>: laminer akış. Hız profili parabol biçimindedir, basınç kaybı hızla doğru orantılıdır.',
      '<strong>2300 – 4000</strong>: geçiş bölgesi. Akış kararsızdır; laminer ve türbülanslı davranış arasında gidip gelebilir.',
      '<strong>Re > 4000</strong>: türbülanslı akış. Karışma güçlüdür, basınç kaybı yaklaşık olarak hızın karesiyle artar.',
    ], p: [
      'Bu sınırlar dairesel kesitli boru içi akış için mühendislikte yaygın kabul edilen değerlerdir ve keskin çizgiler değildir. Boru girişinin biçimi, yüzey pürüzlülüğü ve titreşim, geçişin tam olarak hangi değerde başlayacağını etkiler. Düz bir levha üzerindeki akış ya da bir küre etrafındaki akış gibi başka geometrilerde kritik değerler çok farklıdır; araçtaki rejim satırı yalnızca boru akışı için yorumlanmalıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Ev tesisatı:</strong> İç çapı 50 mm (0,05 m) olan bir borudan 20 °C\'deki su 1 m/s hızla akıyor. Su için ρ ≈ 998,2 kg/m³ ve μ ≈ 1,002 × 10<sup>-3</sup> Pa·s alınırsa Re = 998,2 × 1 × 0,05/0,001002 ≈ <strong>49.810</strong> bulunur. Değer 4000\'in çok üzerinde olduğundan akış türbülanslıdır. Gündelik tesisat akışlarının neredeyse tamamı bu bölgededir.',
      '<strong>Yavaş akış:</strong> Yoğunluğu 1000 kg/m³ ve viskozitesi 0,001 Pa·s olan bir sıvı aynı boruda 0,02 m/s hızla akarsa Re = 1000 × 0,02 × 0,05/0,001 = <strong>1000</strong> olur; akış laminerdir. Bu boruda akışın laminer kalabileceği en yüksek hız 2300 × 0,001/(1000 × 0,05) = 0,046 m/s\'dir. Araç bu sınır hızını ayrı bir satırda verir.',
      '<strong>Koyu sıvı:</strong> Yoğunluğu 900 kg/m³, viskozitesi 0,09 Pa·s olan bir yağ 20 mm çaplı boruda 0,5 m/s hızla aksa bile Re = 900 × 0,5 × 0,02/0,09 = <strong>100</strong> çıkar. Viskozite yüksek olduğunda oldukça hızlı akışlar bile laminer kalır.',
    ] },
    { h: 'Uygulamada neden önemlidir?', p: [
      'Akış rejimi, boru hattındaki basınç kaybının nasıl hesaplanacağını belirler. Laminer akışta sürtünme katsayısı doğrudan 64/Re bağıntısıyla bulunurken, türbülanslı akışta boru pürüzlülüğünü de içeren diyagramlar ya da ampirik denklemler kullanılır. Isı değiştiricilerde türbülans istenir, çünkü karışma ısı geçişini artırır; hassas dozajlama, mikroakışkan cihazlar ve bazı laboratuvar düzeneklerinde ise öngörülebilir olduğu için laminer akış tercih edilir.',
      'Sayı yalnızca borularla sınırlı değildir. Kan damarlarındaki akış, uçak kanadı çevresindeki hava, bir topun havadaki hareketi ve nehir akıntıları da Reynolds sayısıyla sınıflandırılır; ancak her birinde karakteristik uzunluk ve kritik değerler farklı tanımlanır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Çapı milimetre olarak bırakmak sonucu bin kat büyütür; değer mutlaka metreye çevrilmelidir. Dinamik viskozite ile kinematik viskoziteyi karıştırmak da yaygındır: yoğunlukla birlikte kullanılan μ\'dür, ν kullanıldığında yoğunluk formülde yer almaz. Hız olarak borunun eksenindeki en yüksek hız değil, kesit ortalaması alınmalıdır. Dairesel olmayan kanallarda çap yerine hidrolik çap (4 × kesit alanı / ıslak çevre) kullanılır.',
      'Viskozite sıcaklığa çok duyarlıdır: suyun viskozitesi ısındıkça belirgin biçimde azalır, yağlarınki ise birkaç derecelik farkla bile önemli ölçüde değişebilir. Araçtaki su ve hava değerleri 20 °C için yaklaşık tablo değerleridir; farklı sıcaklıklarda "Diğer" seçeneğiyle kendi verinizi girin. Bal, boya ya da kan gibi Newton tipi olmayan akışkanlarda tek bir viskozite değeri tanımlanamadığı için sonuç yalnızca kabaca yol gösterir. Hesap bilgilendirme amaçlıdır; tesisat ve proses tasarımı için ilgili standartlar ve mühendislik hesabı esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Reynolds sayısı formülü nedir?', 'Re = ρ·v·D/μ. Yoğunluk, hız ve karakteristik uzunluğun çarpımı dinamik viskoziteye bölünür. Kinematik viskozite biliniyorsa Re = v·D/ν olarak da hesaplanır.'],
    ['Reynolds sayısının birimi var mıdır?', 'Hayır, boyutsuz bir sayıdır. Formüldeki birimler tutarlı (kg/m³, m/s, m, Pa·s) girildiğinde tüm birimler birbirini götürür.'],
    ['Laminer ve türbülanslı akış arasındaki sınır kaçtır?', 'Boru içi akışta yaklaşık 2300\'ün altı laminer, 4000\'in üstü türbülanslı kabul edilir; arası geçiş bölgesidir. Bu değerler boru akışına özgüdür ve koşullara göre bir miktar değişebilir.'],
    ['Evdeki musluk suyu laminer mi akar?', 'Boru içinde çoğunlukla türbülanslıdır. Yarım parmak bir boruda saniyede bir metre hızla akan su için Reynolds sayısı on binler mertebesindedir. Musluk çok az açıldığında görülen cam gibi pürüzsüz su ipliği ise laminer akışa örnektir.'],
    ['Sıcaklık Reynolds sayısını nasıl etkiler?', 'Viskozite üzerinden etkiler. Sıvılar ısındıkça viskoziteleri düşer ve aynı hızda Reynolds sayısı büyür. Gazlarda durum terstir; sıcaklık arttıkça viskozite artar.'],
    ['Karakteristik uzunluk olarak ne almalıyım?', 'Dairesel boruda iç çap alınır. Dairesel olmayan kanallarda hidrolik çap, düz levha üzerindeki akışta levhanın ön kenarından uzaklık, küre ya da silindir etrafındaki akışta cismin çapı kullanılır.'],
    ['Debiden Reynolds sayısını nasıl bulurum?', 'Önce ortalama hızı hesaplayın: hız = debi / kesit alanı, dairesel boru için alan π·D²/4\'tür. Bulduğunuz hızı m/s olarak bu araca girin.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda yapılır; değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['debi-hesapla', 'yogunluk-hesapla', 'hidrostatik-basinc-hesapla', 'basinc-hesapla', 'kaldirma-kuvveti-hesapla'],
};
