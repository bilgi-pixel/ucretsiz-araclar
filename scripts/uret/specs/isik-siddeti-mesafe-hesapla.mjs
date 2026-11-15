export default {
  slug: 'isik-siddeti-mesafe-hesapla',
  title: 'Ters Kare Yasası Hesaplama',
  h1Tail: 'ışık, ses ve ışınım şiddeti',
  pageTitle: 'Ters Kare Yasası Hesaplama – Mesafeye Göre Işık ve Ses Şiddeti',
  description: 'Ters kare yasasıyla ışık, ses ya da ışınım şiddetinin mesafeyle nasıl değiştiğini hesaplayın: yeni mesafedeki şiddet, hedef şiddet için mesafe ve kaynak gücünden şiddet.',
  card: 'Işık, ses ya da ışınım şiddetinin mesafeyle değişimini ters kare yasasıyla hesaplayın; hedef şiddet için gereken mesafeyi bulun.',
  category: 'bilim',
  keywords: ['ters kare yasası', 'ters kare kanunu hesaplama', 'ışık şiddeti mesafe', 'aydınlanma şiddeti mesafe', 'şiddet mesafe ilişkisi', 'inverse square law', 'ışınım şiddeti hesaplama', 'noktasal kaynak şiddeti'],
  lead: 'Noktasal bir kaynaktan yayılan ışığın, sesin ya da ışınımın şiddeti uzaklığın karesiyle ters orantılı azalır. Bu araç <strong>I₁·r₁² = I₂·r₂²</strong> eşitliğiyle yeni mesafedeki şiddeti ya da istenen şiddet için gereken mesafeyi, <strong>I = P/(4πr²)</strong> ile de kaynak gücünden şiddeti hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Hesap türü', type: 'select', options: [['yeni', 'Yeni mesafedeki şiddeti bul'], ['mesafe', 'Hedef şiddet için mesafeyi bul'], ['kaynak', 'Kaynak gücünden şiddeti bul (I = P/4πr²)']] },
    { id: 'siddet', label: 'Bilinen şiddet I₁ ya da kaynak gücü P (W)', type: 'number', placeholder: 'Örn. 100', hint: 'İlk iki hesapta bilinen şiddet (lüks, W/m² gibi herhangi bir birim), üçüncüsünde kaynağın watt cinsinden gücü.' },
    { id: 'r1', label: 'Bilinen mesafe r₁ (m)', type: 'number', placeholder: 'Örn. 1', hint: 'Şiddetin ölçüldüğü ya da hesaplanacağı uzaklık.' },
    { id: 'hedef', label: 'Yeni mesafe r₂ (m) ya da hedef şiddet I₂', type: 'number', placeholder: 'Örn. 2', hint: 'Birinci hesapta yeni mesafe, ikincisinde istenen şiddet. Kaynak gücü hesabında boş bırakılabilir.' },
  ],
  compute(v, h) {
    if (v.mod === 'kaynak') {
      const P = h.pos(v.siddet, 'Kaynak gücü');
      const r = h.pos(v.r1, 'Mesafe');
      const alan = 4 * Math.PI * r * r;
      const I = P / alan;
      const rows = [
        ['Şiddet', h.sig(I) + ' W/m²'],
        ['Küre yüzey alanı (4πr²)', h.sig(alan) + ' m²'],
        ['İki kat mesafedeki şiddet', h.sig(I / 4) + ' W/m²'],
      ];
      if (String(v.hedef ?? '').trim() !== '') {
        const r2 = h.pos(v.hedef, 'Yeni mesafe');
        rows.push(['Yeni mesafedeki şiddet', h.sig(P / (4 * Math.PI * r2 * r2)) + ' W/m²']);
      }
      return { rows, note: 'Kaynağın noktasal olduğu, gücünü her yöne eşit yaydığı ve ortamda soğurma ya da yansıma olmadığı varsayılır.' };
    }
    const I1 = h.pos(v.siddet, 'Bilinen şiddet');
    const r1 = h.pos(v.r1, 'Bilinen mesafe');
    if (v.mod === 'mesafe') {
      const I2 = h.pos(v.hedef, 'Hedef şiddet');
      const r2 = r1 * Math.sqrt(I1 / I2);
      return {
        rows: [
          ['Gereken mesafe', h.sig(r2) + ' m'],
          ['Mesafe oranı (r₂/r₁)', h.sig(r2 / r1)],
          ['Şiddet oranı (I₂/I₁)', h.sig(I2 / I1)],
          ['Mesafe değişimi', (r2 >= r1 ? '+' : '−') + h.sig(Math.abs(r2 - r1)) + ' m'],
        ],
        note: 'Hedef şiddet, bilinen şiddetle aynı birimde yazılmalıdır. Noktasal kaynak ve engelsiz ortam varsayılır.',
      };
    }
    const r2 = h.pos(v.hedef, 'Yeni mesafe');
    const oran = (r1 / r2) * (r1 / r2);
    const I2 = I1 * oran;
    return {
      rows: [
        ['Yeni şiddet', h.sig(I2)],
        ['Şiddet oranı (I₂/I₁)', h.sig(oran)],
        ['Yüzde olarak', '%' + h.sig(oran * 100, 5)],
        ['Düzey farkı', h.fmt(10 * Math.log10(oran), 2) + ' dB'],
        ['Mesafe oranı (r₂/r₁)', h.sig(r2 / r1)],
      ],
      note: 'Yeni şiddet, girdiğiniz şiddetle aynı birimdedir (lüks, W/m² vb.). Noktasal kaynak ve engelsiz ortam varsayılır.',
    };
  },
  cases: [
    { in: { mod: 'yeni', siddet: '100', r1: '1', hedef: '2' }, out: { 'Yeni şiddet': '25', 'Şiddet oranı (I₂/I₁)': '0,25', 'Yüzde olarak': '%25', 'Düzey farkı': '-6,02 dB' } },
    { in: { mod: 'mesafe', siddet: '100', r1: '1', hedef: '25' }, out: { 'Gereken mesafe': '2 m', 'Mesafe değişimi': '+1 m' } },
    { in: { mod: 'yeni', siddet: '800', r1: '2', hedef: '4' }, out: { 'Yeni şiddet': '200' } },
    { in: { mod: 'yeni', siddet: '50', r1: '3', hedef: '1' }, out: { 'Yeni şiddet': '450', 'Şiddet oranı (I₂/I₁)': '9' } },
    { in: { mod: 'kaynak', siddet: '100', r1: '2' }, out: { 'Şiddet': '1,98944 W/m²', 'Küre yüzey alanı (4πr²)': '50,2655 m²' } },
    { in: { mod: 'kaynak', siddet: '1000', r1: '10' }, out: { 'Şiddet': '0,795775 W/m²' } },
    { in: { mod: 'mesafe', siddet: '400', r1: '0,5', hedef: '100' }, out: { 'Gereken mesafe': '1 m' } },
    { in: { mod: 'mesafe', siddet: '90', r1: '3', hedef: '810' }, out: { 'Gereken mesafe': '1 m', 'Mesafe değişimi': '−2 m' } },
    { in: { mod: 'yeni', siddet: '100', r1: '0', hedef: '2' }, error: true },
    { in: { mod: 'yeni', siddet: '100', r1: '1', hedef: '' }, error: true },
    { in: { mod: 'kaynak', siddet: '-5', r1: '1' }, error: true },
  ],
  howto: [
    '"Hesap türü" listesinden yeni mesafedeki şiddeti mi, hedef şiddet için gereken mesafeyi mi, yoksa kaynak gücünden şiddeti mi bulacağınızı seçin.',
    'İlk kutuya bilinen şiddeti yazın. Birim serbesttir: lüks, W/m², mikrosievert/saat gibi hangi birimle girerseniz sonuç da o birimde çıkar. Kaynak gücü hesabında buraya gücü watt olarak yazın.',
    'Şiddetin bilindiği (ya da hesaplanacağı) uzaklığı metre cinsinden girin.',
    'Son kutuya, seçtiğiniz hesap türüne göre yeni mesafeyi ya da ulaşmak istediğiniz şiddeti yazın.',
    '"Hesapla" düğmesine basın; şiddet, oranlar ve desibel cinsinden düzey farkı sonuç kutusunda listelenir.',
  ],
  sections: [
    { h: 'Ters kare yasası nedir?', p: [
      'Noktasal bir kaynak, enerjisini her yöne eşit biçimde yayar. Bu enerji kaynaktan uzaklaştıkça giderek büyüyen bir küre yüzeyine dağılır. Kürenin yüzey alanı 4πr² olduğundan, yarıçap iki katına çıktığında alan dört katına çıkar ve aynı enerji dört kat geniş bir yüzeye yayılmış olur. Birim alana düşen enerji, yani şiddet de dörtte bire iner. Şiddetin uzaklığın karesiyle ters orantılı olmasına bu nedenle ters kare yasası denir.',
      'Yasa yalnızca ışığa özgü değildir. Açık havada yayılan ses, bir antenin yaydığı radyo dalgaları, radyoaktif bir kaynaktan çıkan gama ışınları, hatta kütle çekimi ve elektriksel kuvvet aynı geometrik mantığa uyar. Ortak koşul, etkinin bir noktadan çıkıp üç boyutlu uzayda engelsiz yayılmasıdır.',
    ] },
    { h: 'Formüller', p: [
      'Gücü P olan ve her yöne eşit yayın yapan bir kaynağın r uzaklığındaki şiddeti <strong>I = P/(4πr²)</strong> ile bulunur. Güç watt, mesafe metre alındığında şiddet W/m² çıkar.',
      'Kaynağın gücü bilinmese bile iki mesafe arasındaki ilişki kurulabilir, çünkü P ve 4π sabittir: <strong>I₁·r₁² = I₂·r₂²</strong>. Buradan yeni şiddet <strong>I₂ = I₁·(r₁/r₂)²</strong>, istenen şiddet için gereken mesafe ise <strong>r₂ = r₁·√(I₁/I₂)</strong> olarak elde edilir. Bu oran biçimi birimden bağımsızdır; şiddeti hangi birimle girerseniz sonuç da aynı birimde çıkar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Aydınlanma örneği:</strong> Bir lamba 1 m uzaklıktaki masada 100 lüks aydınlanma sağlıyor. Lamba 2 m uzağa taşınırsa I₂ = 100 × (1/2)² = <strong>25 lüks</strong> olur. Aydınlanma dörtte bire, yani %25\'e düşmüştür. Tersine, 3 m uzakta 50 birim ölçülen bir kaynağa 1 m\'ye kadar yaklaşılırsa şiddet 50 × 3² = 450 birime çıkar.',
      '<strong>Mesafe bulma:</strong> 1 m\'de 100 lüks veren aynı lambayla 25 lüks elde etmek için r₂ = 1 × √(100/25) = 1 × 2 = <strong>2 m</strong> uzaklık gerekir. Fotoğrafçılıkta flaş mesafesini ayarlarken ya da bitki yetiştirme lambasını konumlandırırken bu hesap kullanılır.',
      '<strong>Kaynak gücünden şiddet:</strong> 100 W gücünde, her yöne eşit ışıma yapan bir kaynağın 2 m uzağındaki şiddeti I = 100/(4π × 2²) = 100/50,27 ≈ <strong>1,99 W/m²</strong> eder. 1000 W\'lık bir kaynağın 10 m uzağında ise yaklaşık 0,796 W/m² bulunur.',
    ] },
    { h: 'Hızlı başvuru: mesafe katına göre şiddet', ul: [
      'Mesafe <strong>2 katı</strong> → şiddet 1/4 (%25), yaklaşık 6 dB azalma',
      'Mesafe <strong>3 katı</strong> → şiddet 1/9 (yaklaşık %11,1)',
      'Mesafe <strong>4 katı</strong> → şiddet 1/16 (%6,25), yaklaşık 12 dB azalma',
      'Mesafe <strong>10 katı</strong> → şiddet 1/100 (%1), 20 dB azalma',
      'Mesafe <strong>yarısı</strong> → şiddet 4 katı, yaklaşık 6 dB artış',
    ], p: [
      'Ses için sık kullanılan "mesafe iki katına çıkınca düzey 6 dB düşer" kuralı bu yasanın desibel karşılığıdır: 10·log(1/4) ≈ −6,02 dB. Araç, yeni mesafe hesabında bu düzey farkını da gösterir.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Fotoğraf ve video çekiminde ışık kaynağını özneden uzaklaştırmanın pozlamaya etkisi ters kare yasasıyla öngörülür; mesafeyi 1,4 katına çıkarmak ışığı yaklaşık yarıya indirir. İç mekân aydınlatmasında armatür yüksekliği değiştirildiğinde çalışma düzlemindeki aydınlanmanın nasıl değişeceği kabaca aynı yolla tahmin edilir. Açık hava etkinliklerinde hoparlörden uzaklaştıkça ses düzeyindeki düşüş, astronomide yıldızların görünür parlaklığından uzaklık kestirimi ve radyasyondan korunmada "mesafeyi artırma" ilkesi de bu yasaya dayanır.',
    ] },
    { h: 'Yasanın geçerli olmadığı durumlar', p: [
      'Ters kare yasası ideal bir noktasal kaynak ve engelsiz ortam içindir. Gerçek hayatta şu durumlarda sonuçlar sapar: Kaynak, ölçüm mesafesine göre büyükse (uzun bir floresan tüp ya da geniş bir pencere gibi) yakın mesafelerde azalma daha yavaştır; genel bir kural olarak mesafe kaynağın en büyük boyutunun en az beş katı olduğunda noktasal kabul yeterince iyidir. Lazer, projektör ve reflektörlü fener gibi yönlendirilmiş demetlerde ışık küresel yayılmadığından yasa doğrudan uygulanamaz. Kapalı odalarda duvarlardan yansıyan ışık ve ses, uzak noktalardaki şiddeti hesaplanandan yüksek tutar. Sis, duman, su ya da zırhlama malzemesi gibi soğurucu ortamlarda ise azalma hesaplanandan hızlıdır.',
      'Bu nedenle sonuçları bir ön tahmin olarak değerlendirin. Aydınlatma projesi, gürültü haritası ya da radyasyon güvenliği gibi konularda ölçüm cihazı verileri ve uzman hesabı esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['Ters kare yasası formülü nedir?', 'İki mesafe arasında I₁·r₁² = I₂·r₂² eşitliği geçerlidir. Kaynak gücü biliniyorsa şiddet I = P/(4πr²) ile hesaplanır. Her iki bağıntı da şiddetin uzaklığın karesiyle ters orantılı olduğunu söyler.'],
    ['Mesafe iki katına çıkınca ışık şiddeti ne olur?', 'Dörtte birine düşer. Çünkü aynı enerji dört kat büyük bir küre yüzeyine yayılır. Mesafe üç katına çıkarsa şiddet dokuzda bire iner.'],
    ['Şiddeti yarıya indirmek için ne kadar uzaklaşmalıyım?', 'Mesafeyi √2, yani yaklaşık 1,41 katına çıkarmanız gerekir. Örneğin 1 m uzaktaki bir kaynaktan 1,41 m\'ye çekilirseniz şiddet yarıya iner.'],
    ['Hangi birimle hesap yapabilirim?', 'Oran hesaplarında birim serbesttir; lüks, W/m², mikrosievert/saat ya da herhangi bir şiddet birimi kullanabilirsiniz, sonuç aynı birimde çıkar. Yalnızca kaynak gücünden şiddet hesabında güç watt, mesafe metre olmalıdır.'],
    ['Ters kare yasası ses için de geçerli mi?', 'Açık alanda ve noktasal sayılabilecek kaynaklar için evet. Mesafe iki katına çıktığında ses şiddeti dörtte bire, ses düzeyi ise yaklaşık 6 dB düşer. Kapalı mekânlarda yansımalar nedeniyle düşüş daha azdır.'],
    ['Lazer ışığı neden bu yasaya uymaz?', 'Lazer demeti her yöne değil, çok dar bir açıyla tek yöne yayılır. Enerji küre yüzeyine dağılmadığı için şiddet mesafeyle çok daha yavaş azalır. Yasa, enerjisini her yöne eşit yayan kaynaklar için türetilmiştir.'],
    ['Lümen değerini doğrudan güç olarak girebilir miyim?', 'Hayır; kaynak gücü hesabı watt cinsinden ışıma gücü içindir. Aydınlatmada lümen ve lüks kullanıyorsanız bir mesafede ölçülmüş lüks değerini girip oran hesabını seçmek daha doğrudur.'],
    ['Verilerim bir sunucuya gidiyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz sayılar hiçbir yere gönderilmez ve kaydedilmez.'],
  ],
  related: ['ses-siddeti-hesapla', 'kutle-cekim-kuvveti-hesapla', 'coulomb-kuvveti-hesapla', 'elektrik-alan-hesapla', 'dalga-boyu-frekans-hesapla'],
};
