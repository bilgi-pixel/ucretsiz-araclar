export default {
  slug: 'egik-duzlem-hesapla',
  title: 'Eğik Düzlem Hesaplama',
  h1Tail: 'ivme, kuvvetler ve iniş süresi',
  pageTitle: 'Eğik Düzlem Hesaplama – İvme, Normal Kuvvet ve Sürtünme',
  description: 'Eğik düzlemdeki cismin ivmesini, ağırlığın bileşenlerini, normal kuvveti ve sürtünme kuvvetini hesaplayın. Rampa uzunluğu girerseniz iniş süresi ve hızı da bulunur.',
  card: 'Eğik düzlemde ivmeyi, ağırlığın bileşenlerini, normal ve sürtünme kuvvetini; isterseniz iniş süresini ve hızını hesaplayın.',
  category: 'bilim',
  keywords: ['eğik düzlem hesaplama', 'eğik düzlemde ivme', 'eğik düzlem formülleri', 'mg sin alfa', 'eğik düzlem sürtünme', 'eğik düzlemde normal kuvvet', 'rampa hesaplama fizik'],
  lead: `Eğik düzlem üzerine bırakılan bir cismin <strong>ivmesini</strong>, ağırlığının yüzeye paralel ve dik bileşenlerini, normal kuvveti ve sürtünme kuvvetini hesaplayın. Sürtünme katsayısı ve rampa uzunluğu isteğe bağlıdır.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'aci', label: 'Eğim açısı (°)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'mu', label: 'Sürtünme katsayısı (μ)', type: 'number', value: '0', hint: 'Sürtünmesiz yüzey için 0 bırakın.' },
    { id: 'g', label: 'Yer çekimi ivmesi (m/s²)', type: 'number', value: '9,81' },
    { id: 'uzunluk', label: 'Eğik düzlemin uzunluğu (m)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız durgun bırakılan cismin iniş süresi ve hızı bulunur.' },
  ],
  compute(v, h) {
    const m = h.pos(v.kutle, 'Kütle');
    const aci = h.pos(v.aci, 'Eğim açısı');
    if (aci >= 90) h.err('Eğim açısı 0 ile 90 derece arasında olmalı. 90 derece düşey duvar demektir; bu durumda serbest düşme hesabını kullanın.');
    const mu = h.opt(v.mu, 0, 'Sürtünme katsayısı');
    if (mu < 0) h.err('Sürtünme katsayısı negatif olamaz.');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const rad = (aci * Math.PI) / 180;
    const W = m * g;
    const par = W * Math.sin(rad);
    const N = W * Math.cos(rad);
    const fmax = mu * N;
    const kayar = par > fmax + 1e-12;
    const f = kayar ? fmax : par;
    const net = kayar ? par - fmax : 0;
    const a = net / m;
    const rows = [
      ['İvme', h.fmt(a, 3) + ' m/s²'],
      ['Durum', kayar ? 'Cisim aşağı doğru kayar' : 'Cisim kaymaz (sürtünme yeterli)'],
      ['Ağırlığın paralel bileşeni', h.fmt(par, 2) + ' N'],
      ['Normal kuvvet', h.fmt(N, 2) + ' N'],
      ['Sürtünme kuvveti', h.fmt(f, 2) + ' N'],
      ['Net kuvvet', h.fmt(net, 2) + ' N'],
      ['Ağırlık', h.fmt(W, 2) + ' N'],
    ];
    if (mu > 0) rows.push(['Kaymanın başladığı açı', h.fmt((Math.atan(mu) * 180) / Math.PI, 2) + '°']);
    if (String(v.uzunluk ?? '').trim() !== '') {
      const L = h.pos(v.uzunluk, 'Eğik düzlemin uzunluğu');
      rows.push(['Yükseklik', h.fmt(L * Math.sin(rad), 3) + ' m']);
      if (kayar) {
        rows.push(['İniş süresi', h.fmt(Math.sqrt((2 * L) / a), 3) + ' s']);
        rows.push(['Alt uçtaki hız', h.fmt(Math.sqrt(2 * a * L), 3) + ' m/s']);
      }
    }
    return { rows, note: 'Cismin durgun bırakıldığı, statik ve kinetik sürtünme katsayılarının eşit olduğu ve cismin yuvarlanmadan kaydığı varsayılmıştır.' };
  },
  cases: [
    { in: { kutle: '10', aci: '30', mu: '0', g: '9,81' }, out: { 'İvme': '4,905 m/s²', 'Ağırlığın paralel bileşeni': '49,05 N', 'Normal kuvvet': '84,96 N', 'Sürtünme kuvveti': '0 N' } },
    { in: { kutle: '5', aci: '30', mu: '0,2', g: '10' }, out: { 'İvme': '3,268 m/s²', 'Ağırlığın paralel bileşeni': '25 N', 'Normal kuvvet': '43,3 N', 'Sürtünme kuvveti': '8,66 N', 'Net kuvvet': '16,34 N' } },
    { in: { kutle: '2', aci: '10', mu: '0,5', g: '9,81' }, out: { 'İvme': '0 m/s²', 'Durum': 'Cisim kaymaz (sürtünme yeterli)', 'Sürtünme kuvveti': '3,41 N', 'Kaymanın başladığı açı': '26,57°' } },
    { in: { kutle: '1', aci: '30', mu: '0', g: '10', uzunluk: '10' }, out: { 'İvme': '5 m/s²', 'İniş süresi': '2 s', 'Alt uçtaki hız': '10 m/s', 'Yükseklik': '5 m' } },
    { in: { kutle: '1', aci: '45', mu: '0', g: '9,81' }, out: { 'İvme': '6,937 m/s²' } },
    { in: { kutle: '3', aci: '60', mu: '0,5', g: '10' }, out: { 'İvme': '6,16 m/s²', 'Normal kuvvet': '15 N', 'Sürtünme kuvveti': '7,5 N', 'Durum': 'Cisim aşağı doğru kayar' } },
    { in: { kutle: '10', aci: '90', mu: '0', g: '9,81' }, error: true },
    { in: { kutle: '0', aci: '30', mu: '0', g: '9,81' }, error: true },
    { in: { kutle: '10', aci: '', mu: '0', g: '9,81' }, error: true },
  ],
  howto: [
    `"Kütle" alanına cismin kütlesini kilogram olarak yazın.`,
    `"Eğim açısı" alanına düzlemin yatayla yaptığı açıyı derece cinsinden girin (0 ile 90 arasında).`,
    `Yüzey sürtünmeliyse sürtünme katsayısını yazın; sürtünmesiz sorularda 0 bırakın. Sorunuzda g = 10 verilmişse yer çekimi ivmesini değiştirin.`,
    `İniş süresini ve alt uçtaki hızı da öğrenmek istiyorsanız eğik düzlemin uzunluğunu metre olarak ekleyin.`,
    `"Hesapla" düğmesine basın. İvme, cismin kayıp kaymayacağı ve bütün kuvvetler ayrı satırlarda görüntülenir.`,
  ],
  sections: [
    { h: 'Eğik düzlemde kuvvetler', p: [
      `Eğik düzlem, yatayla belirli bir açı yapan düz bir yüzeydir; rampa, yokuş, kaydırak ve yükleme sehpası gündelik örnekleridir. Üzerindeki cisme üç kuvvet etki eder: düşey doğrultuda aşağıya doğru ağırlık, yüzeye dik doğrultuda normal kuvvet ve yüzeye paralel, harekete zıt yönde sürtünme kuvveti.`,
      `Soruyu çözmenin anahtarı, ağırlığı yüzeye paralel ve yüzeye dik iki bileşene ayırmaktır. Eğim açısı θ ise paralel bileşen <strong>m × g × sin θ</strong>, dik bileşen <strong>m × g × cos θ</strong> olur. Paralel bileşen cismi aşağı doğru çeker; dik bileşen cismi yüzeye bastırır ve normal kuvvetle dengelenir.`,
    ] },
    { h: 'Formüller', ul: [
      `<strong>Normal kuvvet:</strong> N = m × g × cos θ`,
      `<strong>Sürtünme kuvveti (kayarken):</strong> F<sub>s</sub> = μ × N = μ × m × g × cos θ`,
      `<strong>Net kuvvet:</strong> F<sub>net</sub> = m × g × sin θ − μ × m × g × cos θ`,
      `<strong>İvme:</strong> a = g × (sin θ − μ × cos θ)`,
      `<strong>Sürtünmesiz ivme:</strong> a = g × sin θ`,
      `<strong>Kayma koşulu:</strong> tan θ > μ`,
      `<strong>İniş süresi (durgun bırakılırsa):</strong> t = √(2 × L ÷ a); alt uçtaki hız v = √(2 × a × L)`,
    ], p: [
      `İvme formülünde kütlenin yer almadığına dikkat edin. Aynı eğimde, aynı sürtünme katsayısıyla ağır ve hafif cisimler aynı ivmeyle kayar. Kütle yalnızca kuvvetlerin büyüklüğünü etkiler.`,
    ] },
    { h: 'Çözümlü örnek: sürtünmesiz eğik düzlem', p: [
      `10 kg kütleli bir cisim 30 derecelik sürtünmesiz eğik düzleme bırakılıyor, g = 9,81 m/s². Ağırlık 10 × 9,81 = 98,1 N'dur. Paralel bileşen 98,1 × sin 30° = 98,1 × 0,5 = 49,05 N, normal kuvvet 98,1 × cos 30° = 98,1 × 0,866 = 84,96 N olur. Sürtünme olmadığından net kuvvet 49,05 N, ivme 49,05 ÷ 10 = 4,905 m/s² bulunur. Bu, g'nin tam yarısıdır; çünkü sin 30° = 0,5'tir.`,
    ] },
    { h: 'Çözümlü örnek: sürtünmeli eğik düzlem', p: [
      `5 kg kütleli bir cisim 30 derecelik eğik düzlemde, μ = 0,2 ve g = 10 m/s² alınsın. Ağırlık 50 N, paralel bileşen 25 N, normal kuvvet 50 × 0,866 = 43,3 N'dur. Sürtünme kuvveti 0,2 × 43,3 = 8,66 N olur. Net kuvvet 25 − 8,66 = 16,34 N, ivme 16,34 ÷ 5 = 3,268 m/s² bulunur.`,
      `Şimdi cismin kaymadığı bir durum: 2 kg kütle, 10 derece eğim, μ = 0,5. Kayma koşuluna bakılır: tan 10° ≈ 0,176, bu 0,5'ten küçüktür; cisim kaymaz. Cismi yerinde tutan statik sürtünme, paralel bileşene eşittir: 2 × 9,81 × sin 10° ≈ 3,41 N. Bu katsayıyla kayma ancak eğim yaklaşık 26,57 dereceyi geçince başlar.`,
    ] },
    { h: 'İniş süresi ve hız', p: [
      `Cisim durgun bırakıldığında sabit ivmeyle hızlanır. Uzunluğu 10 metre olan 30 derecelik sürtünmesiz bir rampada g = 10 m/s² için ivme 5 m/s²'dir. İniş süresi t = √(2 × 10 ÷ 5) = 2 saniye, alt uçtaki hız v = √(2 × 5 × 10) = 10 m/s olur. Rampanın yüksekliği 10 × sin 30° = 5 metredir. Sürtünmesiz durumda bu hız, aynı yükseklikten serbest düşen cismin hızıyla aynıdır: √(2 × g × h) = √(2 × 10 × 5) = 10 m/s. Bu, mekanik enerjinin korunumunun doğrudan sonucudur.`,
    ] },
    { h: 'Sık kullanılan açı değerleri', ul: [
      `<strong>30°:</strong> sin = 0,5 · cos ≈ 0,866`,
      `<strong>37°:</strong> sin ≈ 0,6 · cos ≈ 0,8 (ders sorularında yuvarlanmış kabul)`,
      `<strong>45°:</strong> sin = cos ≈ 0,707`,
      `<strong>53°:</strong> sin ≈ 0,8 · cos ≈ 0,6 (ders sorularında yuvarlanmış kabul)`,
      `<strong>60°:</strong> sin ≈ 0,866 · cos = 0,5`,
    ], p: [
      `Ders kitaplarında 37 ve 53 derece için 0,6 ve 0,8 değerleri kullanılır; gerçek trigonometrik değerler bunlardan çok az farklıdır. Araç gerçek değerlerle hesap yaptığı için bu açılarda sonuç, yuvarlanmış kabulle çözülen kitap cevabından üçüncü basamakta küçük bir fark gösterebilir.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En yaygın hata sin ile cos'u karıştırmaktır: paralel bileşen sin, normal kuvvet cos ile hesaplanır. İkinci hata, cisim kaymadığı hâlde sürtünme kuvvetini μ × N almak; durgun cisimde sürtünme paralel bileşene eşittir. Üçüncüsü, açıyı radyan girmektir; araç derece bekler.`,
      `Hesap, cismin kendi ağırlığıyla aşağı doğru kaydığı durumu ele alır. Yukarı doğru itilen ya da iple çekilen cisim, makara sistemleri ve yuvarlanan cisimler (bilye, silindir) ayrı hesap gerektirir. Sonuçlar eğitim amaçlıdır; rampa, konveyör ya da yük sabitleme tasarımı gibi güvenlikle ilgili işlerde yetkili bir mühendise danışın.`,
    ] },
  ],
  faq: [
    ['Eğik düzlemde ivme formülü nedir?', `Sürtünmesiz eğik düzlemde ivme a = g × sin θ'dır. Sürtünme varsa a = g × (sin θ − μ × cos θ) olur. Her iki durumda da ivme kütleye bağlı değildir.`],
    ['Eğik düzlemde normal kuvvet nasıl bulunur?', `Normal kuvvet, ağırlığın yüzeye dik bileşenine eşittir: N = m × g × cos θ. Eğim arttıkça cos θ küçüldüğü için normal kuvvet azalır.`],
    ['Cisim hangi açıda kaymaya başlar?', `Eğim açısının tanjantı sürtünme katsayısını aştığında kayma başlar: tan θ > μ. Örneğin μ = 0,5 için sınır açı yaklaşık 26,57 derecedir. Araç bu açıyı ayrı bir satırda gösterir.`],
    ['Kütle ivmeyi etkiler mi?', `Hayır. Hem cismi aşağı çeken kuvvet hem de sürtünme kuvveti kütleyle orantılı olduğu için ivme hesabında kütle sadeleşir. Kütle yalnızca newton cinsinden kuvvet değerlerini değiştirir.`],
    ['Sürtünmesiz eğik düzlemde alt uçtaki hız neye bağlıdır?', `Yalnızca yüksekliğe bağlıdır: v = √(2 × g × h). Eğim açısı ve rampa uzunluğu iniş süresini değiştirir ama aynı yükseklikten inen cisimler alt uca aynı hızla ulaşır.`],
    ['Cisim kaymıyorsa sürtünme kuvveti kaçtır?', `Durgun cisimde statik sürtünme, ağırlığın paralel bileşenine eşit ve ona zıt yöndedir: m × g × sin θ. Bu değer, en büyük statik sürtünme olan μ × N'den küçük ya da ona eşittir.`],
    ['Eğik düzlem neden basit makine sayılır?', `Bir yükü doğrudan kaldırmak yerine rampa boyunca itmek, gereken kuvveti azaltır; karşılığında yol uzar. Sürtünme ihmal edilirse yapılan iş değişmez, yalnızca kuvvetten kazanılıp yoldan kaybedilir.`],
    ['Yazdığım değerler saklanıyor mu?', `Hayır. Hesap tümüyle tarayıcınızda çalışır; girdiğiniz değerler sunucuya gönderilmez.`],
  ],
  related: ['surtunme-kuvveti-hesapla', 'kuvvet-hesapla', 'duzgun-hizlanan-hareket-hesapla', 'potansiyel-enerji-hesapla', 'serbest-dusme-hesapla'],
};
