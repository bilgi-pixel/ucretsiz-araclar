export default {
  slug: 'kablo-kesiti-hesapla',
  title: 'Kablo Kesiti Hesaplama',
  h1Tail: 'gerilim düşümüne göre mm²',
  pageTitle: 'Kablo Kesiti Hesaplama – Akım ve Mesafeye Göre Kaç mm² Kablo?',
  description: 'Akım, hat uzunluğu ve izin verilen gerilim düşümüne göre gereken kablo kesitini (mm²) hesaplayın. Tek faz, üç faz ve DC; bakır ve alüminyum iletken desteklenir.',
  card: 'Akım, mesafe ve gerilim düşümü sınırından gereken kablo kesitini ve en yakın standart mm² değerini bulun.',
  category: 'elektrik',
  keywords: ['kablo kesiti hesaplama', 'kaç mm kablo', 'kablo kesit hesabı', 'gerilim düşümüne göre kablo kesiti', 'trifaze kablo kesiti', '12v kablo kesiti', 'kablo kalınlığı hesaplama'],
  lead: 'Bir hattan geçecek akıma, hattın uzunluğuna ve kabul ettiğiniz gerilim düşümüne göre <strong>en küçük kablo kesitini</strong> hesaplayın. Araç sonucu en yakın standart kesite yuvarlar ve o kesitte gerçekleşecek gerilim düşümünü gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sistem', label: 'Sistem', type: 'select', options: [['tek', 'Tek faz (AC)'], ['uc', 'Üç faz (AC)'], ['dc', 'Doğru akım (DC)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', value: '230', hint: 'Tek fazda faz-nötr (230), üç fazda faz-faz (400), DC\'de kaynak gerilimi.' },
    { id: 'akim', label: 'Akım (A)', type: 'number', placeholder: 'Örn. 16' },
    { id: 'uzunluk', label: 'Hat uzunluğu (m, tek yön)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'dusum', label: 'İzin verilen gerilim düşümü (%)', type: 'number', value: '3' },
    { id: 'malzeme', label: 'İletken', type: 'select', options: [['cu', 'Bakır'], ['al', 'Alüminyum']] },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '1', hint: 'Isıtıcı ve akkor yüklerde 1; motorlarda etiket değerini yazın. DC\'de dikkate alınmaz.' },
  ],
  compute(v, h) {
    const sistem = ['tek', 'uc', 'dc'].includes(v.sistem) ? v.sistem : 'tek';
    const u = h.pos(v.gerilim, 'Gerilim');
    const i = h.pos(v.akim, 'Akım');
    const l = h.pos(v.uzunluk, 'Hat uzunluğu');
    const yuzde = h.pos(v.dusum, 'İzin verilen gerilim düşümü');
    if (yuzde >= 100) h.err('"İzin verilen gerilim düşümü" %100\'den küçük olmalı; tipik değerler %1 ile %5 arasındadır.');
    let cosfi = 1;
    if (sistem !== 'dc') {
      cosfi = h.pos(v.cosfi, 'Güç faktörü');
      if (cosfi > 1) h.err('"Güç faktörü" 0 ile 1 arasında olmalı (örn. 0,85).');
    }
    const iletkenlik = v.malzeme === 'al' ? 35 : 56;
    const katsayi = sistem === 'uc' ? Math.sqrt(3) : 2;
    const izinli = (u * yuzde) / 100;
    const pay = katsayi * l * i * cosfi;
    const kesit = pay / (iletkenlik * izinli);
    const standartlar = sistem === 'dc'
      ? [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]
      : [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
    const dusumKesit = standartlar.find((s) => s >= kesit * (1 - 1e-9));
    if (!dusumKesit) h.err(`Hesaplanan kesit ${h.fmt(kesit, 1)} mm² olup 240 mm²'den büyük. Hattı paralel kablolarla kurmayı, gerilimi yükseltmeyi ya da mesafeyi kısaltmayı değerlendirin.`);
    // Akım taşıma için yaklaşık en küçük kesit: koruma elemanı anma akımına göre yaygın tesisat uygulaması (bakır, PVC yalıtım).
    // Alüminyumda bir üst standart kesit alınır. 10 A'e kadar DC devrelerde bu sınır uygulanmaz (ince kablolu düşük gerilim işleri).
    const AKIM = [[10, 1.5], [16, 2.5], [25, 4], [32, 6], [40, 10], [63, 16], [80, 25], [100, 35], [125, 50], [160, 70], [200, 95], [250, 120]];
    let akimKesit = null, tabloDisi = false;
    if (!(sistem === 'dc' && i <= 10)) {
      const satir = AKIM.find(([a]) => i <= a * (1 + 1e-9));
      if (!satir) tabloDisi = true;
      else { akimKesit = satir[1]; if (v.malzeme === 'al') akimKesit = standartlar[Math.min(standartlar.length - 1, standartlar.indexOf(akimKesit) + 1)]; }
    }
    const secilen = Math.max(dusumKesit, akimKesit || 0);
    const gercek = pay / (iletkenlik * secilen);
    return {
      rows: [
        ['Önerilen standart kesit', h.fmt(secilen, 2) + ' mm²'],
        ['Gerilim düşümü için en küçük kesit', h.fmt(kesit, 3) + ' mm²'],
        ['Akım için en küçük kesit (yaklaşık)', tabloDisi ? '250 A üzeri: tablo dışı, projeye göre belirlenir' : akimKesit ? h.fmt(akimKesit, 2) + ' mm²' : 'Uygulanmadı (10 A\'e kadar DC)'],
        ['Belirleyici ölçüt', akimKesit && akimKesit > dusumKesit ? 'Akım taşıma' : 'Gerilim düşümü'],
        ['İzin verilen gerilim düşümü', h.fmt(izinli, 3) + ' V'],
        ['Seçilen kesitte gerilim düşümü', `${h.fmt(gercek, 3)} V (%${h.fmt((gercek / u) * 100, 2)})`],
        ['Hat sonundaki gerilim', h.fmt(u - gercek, 2) + ' V'],
        ['Akım yoğunluğu', h.fmt(i / secilen, 2) + ' A/mm²'],
      ],
      note: 'Önerilen kesit, gerilim düşümü ile akım taşıma ölçütlerinden büyük olanıdır. Akım ölçütü yaygın tesisat uygulamasına dayanan yaklaşık bir alt sınırdır; gerçek akım taşıma kapasitesi döşeme şekline, ortam sıcaklığına, kablo tipine ve yan yana kablo sayısına göre düşebilir. Kesin seçim ve koruma elemanı uyumu için yetkili elektrik mühendisine ya da elektrikçiye danışın.',
    };
  },
  cases: [
    { in: { sistem: 'tek', gerilim: '230', akim: '16', uzunluk: '30', dusum: '3', malzeme: 'cu', cosfi: '1' }, out: { 'Önerilen standart kesit': '2,5 mm²', 'Gerilim düşümü için en küçük kesit': '2,484 mm²', 'İzin verilen gerilim düşümü': '6,9 V', 'Seçilen kesitte gerilim düşümü': '6,857 V (%2,98)', 'Hat sonundaki gerilim': '223,14 V', 'Akım yoğunluğu': '6,4 A/mm²' } },
    { in: { sistem: 'dc', gerilim: '12', akim: '10', uzunluk: '5', dusum: '3', malzeme: 'cu' }, out: { 'Önerilen standart kesit': '6 mm²', 'Gerilim düşümü için en küçük kesit': '4,96 mm²', 'Seçilen kesitte gerilim düşümü': '0,298 V (%2,48)' } },
    { in: { sistem: 'uc', gerilim: '400', akim: '32', uzunluk: '50', dusum: '3', malzeme: 'cu', cosfi: '0,8' }, out: { 'Önerilen standart kesit': '6 mm²', 'Gerilim düşümü için en küçük kesit': '3,299 mm²', 'Akım için en küçük kesit (yaklaşık)': '6 mm²', 'Belirleyici ölçüt': 'Akım taşıma', 'İzin verilen gerilim düşümü': '12 V' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '25', uzunluk: '5', dusum: '3', malzeme: 'cu', cosfi: '1' }, out: { 'Önerilen standart kesit': '4 mm²', 'Akım için en küçük kesit (yaklaşık)': '4 mm²', 'Belirleyici ölçüt': 'Akım taşıma' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '40', uzunluk: '100', dusum: '5', malzeme: 'al', cosfi: '1' }, out: { 'Önerilen standart kesit': '25 mm²', 'Gerilim düşümü için en küçük kesit': '19,876 mm²', 'Seçilen kesitte gerilim düşümü': '9,143 V (%3,98)' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '10', uzunluk: '10', dusum: '3', malzeme: 'cu', cosfi: '1' }, out: { 'Önerilen standart kesit': '1,5 mm²', 'Gerilim düşümü için en küçük kesit': '0,518 mm²', 'Seçilen kesitte gerilim düşümü': '2,381 V (%1,04)' } },
    { in: { sistem: 'dc', gerilim: '24', akim: '5', uzunluk: '2', dusum: '3', malzeme: 'cu' }, out: { 'Önerilen standart kesit': '0,5 mm²', 'Gerilim düşümü için en küçük kesit': '0,496 mm²', 'Seçilen kesitte gerilim düşümü': '0,714 V (%2,98)' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '', uzunluk: '30', dusum: '3', malzeme: 'cu', cosfi: '1' }, error: true },
    { in: { sistem: 'dc', gerilim: '12', akim: '200', uzunluk: '100', dusum: '1', malzeme: 'cu' }, error: true },
    { in: { sistem: 'uc', gerilim: '400', akim: '32', uzunluk: '50', dusum: '3', malzeme: 'cu', cosfi: '1,2' }, error: true },
    { in: { sistem: 'tek', gerilim: '230', akim: '16', uzunluk: '-5', dusum: '3', malzeme: 'cu', cosfi: '1' }, error: true },
  ],
  howto: [
    'Sistemi seçin: ev prizleri ve aydınlatma için tek faz, motor ve sanayi panoları için üç faz, akü ve güneş paneli hatları için doğru akım.',
    'Gerilimi yazın. Tek fazda faz-nötr gerilimi (230 V), üç fazda faz-faz gerilimi (400 V), doğru akımda sistem gerilimi (12, 24, 48 V gibi) girilir.',
    'Hattan geçecek akımı amper olarak, hattın tek yön uzunluğunu metre olarak girin. Gidiş-dönüş iletkeni araç tarafından hesaba katılır; uzunluğu ikiyle çarpmayın.',
    'Kabul ettiğiniz en yüksek gerilim düşümünü yüzde olarak, iletken malzemesini ve alternatif akımda güç faktörünü belirtin.',
    '"Hesapla" düğmesine basın. İlk satır önerilen standart kesiti, sonraki satırlar hesaplanan kesin değeri ve seçilen kesitte oluşacak gerilim düşümünü verir.',
    'Sonuçta iki ölçüt de görünür: gerilim düşümü için en küçük kesit ve akım için yaklaşık en küçük kesit. Araç büyük olanı önerir; kesin seçim için döşeme koşullarınıza uygun akım taşıma tablosuna da bakın.',
  ],
  sections: [
    { h: 'Kablo kesiti neye göre belirlenir?', p: [
      'Bir hattın kablo kesiti iki ayrı ölçüte göre seçilir ve ikisinden <strong>büyük olan</strong> uygulanır. Birincisi <strong>akım taşıma kapasitesidir</strong>: kablo, üzerinden geçen akımla ısınır ve yalıtkanının dayanabileceği sıcaklığı aşmamalıdır. Bu kapasite yalnızca kesite değil; kablonun tipine, boru içinde mi, sıva altında mı, kablo tavasında mı döşendiğine, ortam sıcaklığına ve yan yana kaç kablo bulunduğuna bağlıdır. Bu yüzden tek bir sayıyla verilemez, üretici ve standart tablolarından okunur.',
      'İkincisi <strong>gerilim düşümüdür</strong>: kablo ne kadar uzun ve ince olursa direnci o kadar büyür ve hattın sonundaki cihaza o kadar düşük gerilim ulaşır. Kısa hatlarda genellikle akım taşıma kapasitesi, uzun hatlarda ise gerilim düşümü belirleyici olur. Bu araç gerilim düşümüne göre kesiti hesaplar, ayrıca akım için yaygın tesisat uygulamasına dayanan yaklaşık bir alt sınırı (örneğin 16 A için 2,5 mm², 25 A için 4 mm², 32 A için 6 mm² bakır) uygular ve ikisinden büyük olanı önerir.',
    ] },
    { h: 'Hesapta kullanılan formül', p: [
      'Tek fazlı alternatif akım ve doğru akım hatlarında akım hem gidiş hem dönüş iletkeninden geçtiği için uzunluk iki kez sayılır: <strong>S = 2 × L × I × cos φ ÷ (κ × ΔU)</strong>. Üç fazlı dengeli hatlarda ikinin yerini kök üç (yaklaşık 1,732) alır: <strong>S = √3 × L × I × cos φ ÷ (κ × ΔU)</strong>.',
      'Burada S kesit (mm²), L tek yön hat uzunluğu (m), I akım (A), ΔU volt cinsinden izin verilen gerilim düşümü, κ ise iletkenin öz iletkenliğidir. Hesapta bakır için 56, alüminyum için 35 m/(Ω·mm²) değerleri kullanılır. ΔU, gerilim ile yüzde sınırın çarpımından bulunur: 230 V\'ta yüzde 3, 6,9 V eder.',
      'Formül, kablonun yalnızca omik direncini dikkate alan yaygın yaklaşık yöntemdir. Küçük ve orta kesitlerde yeterince doğrudur; çok büyük kesitlerde ve uzun hatlarda kablonun endüktif reaktansı da hesaba katılmalıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Tek faz:</strong> 230 V, 16 A çeken bir yük 30 metre uzakta, sınır yüzde 3, iletken bakır. ΔU = 6,9 V. S = 2 × 30 × 16 ÷ (56 × 6,9) = 960 ÷ 386,4 = 2,484 mm². Bir üst standart kesit 2,5 mm²\'dir. Bu kesitle düşüm 960 ÷ (56 × 2,5) = 6,857 V, yani yüzde 2,98 olur.',
      '<strong>12 V doğru akım:</strong> 10 A çeken bir cihaz aküden 5 metre uzakta. ΔU = 0,36 V. S = 2 × 5 × 10 ÷ (56 × 0,36) = 100 ÷ 20,16 = 4,96 mm²; standart kesit 6 mm². Aynı akım 230 V\'ta 1,5 mm² ile rahatça taşınırken 12 V\'ta 6 mm² gerekmesi, düşük gerilimli sistemlerde kabloların neden kalın olduğunu açıklar.',
      '<strong>Üç faz:</strong> 400 V, 32 A, cos φ 0,8, 50 metre, yüzde 3. ΔU = 12 V. S = 1,732 × 50 × 32 × 0,8 ÷ (56 × 12) = 2.217 ÷ 672 = 3,299 mm²; gerilim düşümü tek başına 4 mm² ile sağlanır. Ancak 32 A için akım ölçütü 6 mm² gerektirir; araç bu yüzden 6 mm² önerir ve belirleyici ölçütü "Akım taşıma" olarak gösterir. Bu örnek, gerilim düşümü hesabının tek başına neden yeterli olmadığını gösterir.',
    ] },
    { h: 'Standart kesitler', p: [
      'Kablolar belirli kesitlerde üretilir; hesap sonucu her zaman bir üst standart değere yuvarlanır. Sabit tesisatta kullanılan başlıca kesitler şunlardır:',
    ], ul: [
      '1,5 – 2,5 – 4 – 6 – 10 – 16 mm²',
      '25 – 35 – 50 – 70 – 95 mm²',
      '120 – 150 – 185 – 240 mm²',
      'Doğru akım ve düşük gerilim kablajında ayrıca 0,5 – 0,75 – 1 mm²',
    ] },
    { h: 'Bakır mı, alüminyum mu?', p: [
      'Alüminyumun iletkenliği bakırın yaklaşık yüzde 60\'ı kadardır. Aynı gerilim düşümü için alüminyum iletkenin kesiti bakırın yaklaşık 1,6 katı olmalıdır. Buna karşılık alüminyum daha hafif ve genellikle daha ekonomiktir; bu yüzden uzun ve büyük kesitli besleme hatlarında tercih edilebilir. Bina içi küçük kesitli tesisatta ise bakır kullanılır. Alüminyum iletkenlerde bağlantı noktaları özel pabuç ve klemens gerektirir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Uzunluğu iki kez saymak:</strong> araç gidiş-dönüşü kendisi hesaplar; yalnızca tek yön mesafeyi yazın.',
      '<strong>Yalnızca gerilim düşümüne bakmak:</strong> kısa hatta hesap çok küçük bir kesit verebilir; akım taşıma kapasitesi daha büyük kesit gerektiriyorsa o kullanılır.',
      '<strong>Anma akımı yerine tahmini akım yazmak:</strong> motorların kalkış akımı ve sürekli çalışan yüklerin payı gözetilmelidir.',
      '<strong>Sigortayı kabloya göre değil yüke göre seçmek:</strong> koruma elemanı kabloyu korumalıdır; kablonun taşıyabileceğinden büyük sigorta kullanılmaz.',
      '<strong>Düşük gerilimde yüzdeyi küçümsemek:</strong> 12 V\'luk sistemde yüzde 3 yalnızca 0,36 V\'tur; birkaç metrelik hat bile kalın kablo ister.',
    ] },
    { h: 'Önemli uyarı', p: [
      'Bu araç bilgilendirme ve ön değerlendirme amaçlıdır; bir proje hesabının yerini tutmaz. İzin verilen gerilim düşümü sınırları, en küçük kesitler ve akım taşıma kapasiteleri yürürlükteki yönetmelik ve standartlarla belirlenir ve tesisin türüne göre değişir; varsayılan yüzde 3 değeri yalnızca bir örnektir, güncel mevzuatı ve proje şartnamesini kontrol edin.',
      'Yanlış seçilmiş kablo aşırı ısınmaya ve yangına yol açabilir. Elektrik tesisatının tasarımı, kablo ve koruma elemanı seçimi yetkili bir elektrik mühendisi ya da ehliyetli elektrikçi tarafından yapılmalıdır.',
    ] },
  ],
  faq: [
    ['Kablo kesiti nasıl hesaplanır?', 'Tek fazda S = 2 × L × I × cos φ ÷ (κ × ΔU), üç fazda ikinin yerine kök üç kullanılır. Bulunan değer bir üst standart kesite yuvarlanır ve ayrıca akım taşıma kapasitesiyle karşılaştırılır.'],
    ['Hat uzunluğunu gidiş-dönüş olarak mı yazmalıyım?', 'Hayır, yalnızca tek yön mesafeyi yazın. Tek faz ve doğru akımda dönüş iletkeni formüldeki 2 çarpanıyla hesaba katılır.'],
    ['Mesafe uzadıkça neden daha kalın kablo gerekir?', 'Kablonun direnci uzunlukla doğru, kesitle ters orantılıdır. Mesafe iki katına çıkarsa aynı gerilim düşümünü korumak için kesit de iki katına çıkmalıdır.'],
    ['12 V sistemlerde kablolar neden bu kadar kalın?', 'Aynı güç düşük gerilimde daha yüksek akım demektir ve izin verilen düşüm volt olarak çok küçüktür. 12 V\'ta yüzde 3 yalnızca 0,36 V eder.'],
    ['Hesap 1,5 mm²\'den küçük çıktı, daha ince kablo kullanabilir miyim?', 'Alternatif akımlı sabit tesisatta araç en küçük 1,5 mm² önerir. Asıl belirleyici, devrenin akımı ve koruma elemanıdır; en küçük kesit kuralları için güncel mevzuata bakın.'],
    ['Güç faktörü kesiti nasıl etkiler?', 'Bu yaklaşık formülde düşük cos φ, gerilim düşümünün omik bileşenini azaltır. Büyük kesitlerde reaktans etkisi önem kazanır ve ayrıntılı hesap gerekir. Emin değilseniz cos φ değerini 1 bırakmak daha temkinli sonuç verir.'],
    ['Bu sonuçla doğrudan kablo alabilir miyim?', 'Sonuç bir ön fikir verir. Kesin seçim için akım taşıma kapasitesi, döşeme şekli, sigorta değeri ve yürürlükteki yönetmelik birlikte değerlendirilmeli; karar yetkili bir elektrikçi ya da mühendis tarafından verilmelidir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir veri sunucuya gönderilmez.'],
  ],
  related: ['gerilim-dusumu-hesapla', 'awg-mm2-cevir', 'kw-amper-cevir', 'uc-faz-guc-hesapla', 'amper-watt-cevir'],
};
