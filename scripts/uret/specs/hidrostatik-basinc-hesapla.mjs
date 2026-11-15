export default {
  slug: 'hidrostatik-basinc-hesapla',
  title: 'Hidrostatik Basınç Hesaplama',
  h1Tail: 'P = ρ·g·h',
  pageTitle: 'Hidrostatik Basınç Hesaplama – Sıvı Basıncı P = ρ·g·h',
  description: 'Derinliğe göre sıvı basıncını P = ρ·g·h ile hesaplayın. Su, deniz suyu, cıva ya da özel yoğunluk; sonuç kPa, bar, atm ve mutlak basınç olarak.',
  card: 'Sıvının derinliğinden hidrostatik basıncı kPa, bar ve atm olarak bulun; yüzey basıncını ekleyerek mutlak basıncı da görün.',
  category: 'bilim',
  keywords: ['hidrostatik basınç hesaplama', 'sıvı basıncı hesaplama', 'su basıncı derinlik', 'p = h d g', 'kaç metre kaç bar', 'mutlak basınç hesaplama', 'depo taban basıncı'],
  lead: 'Durgun bir sıvının belirli bir derinlikte oluşturduğu basıncı hesaplayın. Araç <strong>P = ρ · g · h</strong> bağıntısını kullanır; sonucu kilopascal, bar ve atmosfer olarak verir, yüzeydeki basıncı ekleyerek mutlak basıncı da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sivi', label: 'Sıvı', type: 'select', options: [['su', 'Tatlı su (1000 kg/m³)'], ['deniz', 'Deniz suyu (1025 kg/m³)'], ['civa', 'Cıva (13600 kg/m³)'], ['ozel', 'Özel yoğunluk gireceğim']] },
    { id: 'yogunluk', label: 'Özel sıvı yoğunluğu (kg/m³)', type: 'number', placeholder: 'Örn. 850', hint: 'Yalnızca "Özel yoğunluk" seçiliyse kullanılır.' },
    { id: 'derinlik', label: 'Derinlik / sıvı yüksekliği (m)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'g', label: 'Yer çekimi ivmesi (m/s²)', type: 'number', value: '9,81' },
    { id: 'yuzey', label: 'Sıvı yüzeyindeki basınç (kPa)', type: 'number', value: '101,325', hint: 'Açık yüzey için atmosfer basıncı. Yalnızca sıvı basıncı için 0 yazın.' },
    { id: 'alan', label: 'Yüzey alanı (m², isteğe bağlı)', type: 'number', placeholder: 'Örn. 2', hint: 'Yazarsanız bu derinlikteki yatay yüzeye sıvının uyguladığı kuvvet hesaplanır.' },
  ],
  compute(v, h) {
    const tablo = { su: 1000, deniz: 1025, civa: 13600 };
    const rho = v.sivi === 'ozel' ? h.pos(v.yogunluk, 'Özel sıvı yoğunluğu') : (tablo[v.sivi] || 1000);
    const d = h.nonneg(v.derinlik, 'Derinlik');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const p0 = h.nonneg(h.opt(v.yuzey, 0, 'Sıvı yüzeyindeki basınç'), 'Sıvı yüzeyindeki basınç') * 1000;
    const p = rho * g * d;
    const rows = [
      ['Hidrostatik basınç', h.fmt(p / 1000, 3) + ' kPa'],
      ['Pascal olarak', h.fmt(p, 2) + ' Pa'],
      ['Bar olarak', h.fmt(p / 1e5, 5) + ' bar'],
      ['Atmosfer olarak', h.fmt(p / 101325, 4) + ' atm'],
      ['Mutlak basınç', h.fmt((p + p0) / 1000, 3) + ' kPa'],
      ['Sıvı yoğunluğu', h.fmt(rho, 3) + ' kg/m³'],
    ];
    if (String(v.alan ?? '').trim() !== '') {
      const A = h.pos(v.alan, 'Yüzey alanı');
      rows.push(['Yüzeye etkiyen sıvı kuvveti', h.fmt(p * A, 2) + ' N']);
    }
    return { rows, note: 'Hidrostatik basınç yalnızca sıvı sütunundan kaynaklanan (gösterge) basınçtır. Mutlak basınç = yüzey basıncı + hidrostatik basınç.' };
  },
  cases: [
    { in: { sivi: 'su', derinlik: '10', g: '9,81', yuzey: '101,325' }, out: { 'Hidrostatik basınç': '98,1 kPa', 'Bar olarak': '0,981 bar', 'Atmosfer olarak': '0,9682 atm', 'Mutlak basınç': '199,425 kPa' } },
    { in: { sivi: 'deniz', derinlik: '100', g: '9,81', yuzey: '101,325' }, out: { 'Hidrostatik basınç': '1.005,525 kPa', 'Bar olarak': '10,05525 bar', 'Mutlak basınç': '1.106,85 kPa' } },
    { in: { sivi: 'civa', derinlik: '0,76', g: '9,81', yuzey: '0' }, out: { 'Hidrostatik basınç': '101,396 kPa', 'Atmosfer olarak': '1,0007 atm', 'Mutlak basınç': '101,396 kPa' } },
    { in: { sivi: 'su', derinlik: '2,5', g: '9,81', yuzey: '101,325', alan: '4' }, out: { 'Hidrostatik basınç': '24,525 kPa', 'Pascal olarak': '24.525 Pa', 'Yüzeye etkiyen sıvı kuvveti': '98.100 N' } },
    { in: { sivi: 'ozel', yogunluk: '800', derinlik: '5', g: '10', yuzey: '100' }, out: { 'Hidrostatik basınç': '40 kPa', 'Mutlak basınç': '140 kPa' } },
    { in: { sivi: 'su', derinlik: '0', g: '9,81', yuzey: '101,325' }, out: { 'Hidrostatik basınç': '0 kPa', 'Mutlak basınç': '101,325 kPa' } },
    { in: { sivi: 'su', derinlik: '-5', g: '9,81' }, error: true },
    { in: { sivi: 'ozel', yogunluk: 'abc', derinlik: '5', g: '9,81' }, error: true },
  ],
  howto: [
    'Sıvıyı listeden seçin. Yağ, benzin, süt gibi başka bir sıvı için "Özel yoğunluk" seçip yoğunluğu kg/m³ olarak yazın.',
    'Basıncını merak ettiğiniz noktanın sıvı yüzeyinden olan düşey derinliğini metre olarak girin.',
    'Yer çekimi ivmesini gerekirse değiştirin (sınav sorularında çoğu zaman 10 m/s² alınır).',
    'Sıvı yüzeyindeki basınç açık hava basıncı olarak hazır gelir. Kapalı ve basınçlı bir tank için kendi değerinizi, yalnızca sıvı basıncı için 0 yazın.',
    'İsterseniz bir yüzey alanı girin ve "Hesapla" düğmesine basın; basınç değerleriyle birlikte o yüzeye etkiyen kuvvet de listelenir.',
  ],
  sections: [
    { h: 'Hidrostatik basınç nedir?', p: [
      'Durgun bir sıvının içindeki her nokta, üzerinde duran sıvı sütununun ağırlığını taşır. Bu ağırlığın birim alana düşen payına hidrostatik basınç denir. Tabanı A, yüksekliği h olan bir sıvı sütununun kütlesi ρ · A · h, ağırlığı ρ · A · h · g\'dir; bunu taban alanına böldüğümüzde alan sadeleşir ve <strong>P = ρ · g · h</strong> elde edilir. Lise kitaplarında aynı bağıntı P = h · d · g biçiminde yazılır.',
      'Formülün en önemli sonucu, basıncın yalnızca <strong>derinliğe, sıvının yoğunluğuna ve yer çekimine</strong> bağlı olmasıdır. Kabın biçimi, genişliği ya da içindeki toplam sıvı miktarı sonucu değiştirmez. İnce uzun bir borunun dibindeki basınç, aynı yükseklikteki dev bir barajın dibindeki basınçla aynıdır. Bu durum "hidrostatik paradoks" olarak bilinir.',
    ] },
    { h: 'Gösterge basıncı ve mutlak basınç', p: [
      'ρ · g · h yalnızca sıvının katkısıdır. Yüzeyi atmosfere açık bir sıvıda, yüzeye ayrıca hava basıncı etki eder ve bu basınç sıvının her noktasına aynen iletilir (Pascal ilkesi). Dolayısıyla derinlikteki gerçek, yani mutlak basınç <strong>P<sub>mutlak</sub> = P₀ + ρ · g · h</strong> olur. Deniz seviyesinde P₀ yaklaşık 101,325 kPa\'dır.',
      'Manometrelerin çoğu atmosfer basıncını sıfır kabul eder ve yalnızca farkı gösterir; buna gösterge (efektif) basıncı denir. Tesisat ve pompa hesaplarında genellikle gösterge basıncı, dalış ve gaz hesaplarında ise mutlak basınç kullanılır. Araç ikisini ayrı satırlarda verir, böylece hangisine ihtiyacınız varsa onu alabilirsiniz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 10 metre su:</strong> ρ = 1000 kg/m³, g = 9,81 m/s², h = 10 m için P = 1000 × 9,81 × 10 = 98 100 Pa = 98,1 kPa, yani 0,981 bar. Buna atmosfer basıncı eklenince mutlak basınç 199,425 kPa olur. "Her 10 metre su yaklaşık 1 bar eder" kuralı buradan gelir.',
      '<strong>Örnek 2 – Denizde 100 metre:</strong> Deniz suyu için ρ = 1025 kg/m³ alınırsa P = 1025 × 9,81 × 100 = 1 005 525 Pa ≈ 10,06 bar. Mutlak basınç yaklaşık 1106,85 kPa\'dır; yüzeydeki basıncın on bir katına yakın.',
      '<strong>Örnek 3 – Cıva sütunu:</strong> 0,76 m yüksekliğindeki cıva sütunu 13600 × 9,81 × 0,76 = 101 396 Pa basınç yapar. Bu değer bir atmosfere çok yakındır; Torricelli\'nin barometre deneyinde cıvanın 76 cm\'de durmasının açıklaması budur.',
      '<strong>Örnek 4 – Depo tabanı:</strong> 2,5 m yüksekliğinde su dolu bir deponun 4 m² tabanına sıvının uyguladığı basınç 24,525 kPa, kuvvet ise 24 525 × 4 = 98 100 N\'dur. Bu, tabanın üzerindeki 10 ton suyun ağırlığıdır.',
    ] },
    { h: 'Pratik eşdeğerler', ul: [
      '<strong>1 metre su sütunu</strong> ≈ 9,81 kPa ≈ 0,098 bar',
      '<strong>10 metre su sütunu</strong> ≈ 98,1 kPa ≈ 0,98 bar ≈ 0,97 atm',
      '<strong>1 bar</strong> ≈ 10,2 metre su sütunu',
      '<strong>760 mm cıva sütunu</strong> ≈ 1 atm = 101,325 kPa',
      '<strong>1 atm</strong> ≈ 10,33 metre su sütunu',
    ] },
    { h: 'Nerelerde karşımıza çıkar?', p: [
      'Apartmanların çatısındaki su deposu, alt katlardaki musluklara yükseklik farkı kadar basınç sağlar; 20 metre aşağıdaki bir dairede bu yaklaşık 2 bar eder. Şehir şebekelerinde su kulelerinin yüksek yapılmasının nedeni de aynıdır. Barajların gövdesi tabana doğru kalınlaşır, çünkü su basıncı derinlikle doğru orantılı artar ve en büyük yük tabana biner.',
      'Dalgıçlar her 10 metrede yaklaşık bir atmosferlik ek basınçla karşılaşır; kulaklardaki baskı ve solunan gazın yoğunlaşması bu artışın sonucudur. Hastanelerde serum şişesinin koldan yukarıya asılması, sıvının damar içi basıncı yenebilmesi için gerekli yükseklik farkını sağlar. Kan basıncının milimetre cıva ile ifade edilmesi de cıva sütunlu eski ölçüm aletlerinden kalma bir alışkanlıktır.',
    ] },
    { h: 'Varsayımlar ve uyarılar', p: [
      'Hesap sıvının durgun, sıkıştırılamaz ve her derinlikte aynı yoğunlukta olduğunu varsayar. Çok büyük derinliklerde su hafifçe sıkışır, sıcaklık ve tuzluluk da yoğunluğu değiştirir; bu etkiler gündelik derinliklerde ihmal edilebilir düzeydedir. Akan sıvılarda hız kaynaklı basınç değişimleri ve boru sürtünme kayıpları bu aracın kapsamı dışındadır. Gazlarda yoğunluk yükseklikle belirgin biçimde değiştiğinden formül atmosfer gibi kalın gaz katmanlarına doğrudan uygulanamaz.',
      'Düşey bir duvara etkiyen toplam kuvvet, basınç derinlikle değiştiği için taban basıncı ile alanın çarpımı değildir; ortalama basınç kullanılır. Araçtaki kuvvet satırı yalnızca belirtilen derinlikteki yatay bir yüzey içindir. Depo, havuz, tank ve dalış planlaması gibi güvenlikle ilgili konularda sonuçlar bilgilendirme amaçlıdır; tasarım kararı için yetkili bir mühendise ya da eğitmene danışılmalıdır.',
    ] },
  ],
  faq: [
    ['Sıvı basıncı formülü nedir?', 'P = ρ · g · h, okul kitaplarındaki yazımıyla P = h · d · g. ρ (ya da d) sıvının yoğunluğu, g yer çekimi ivmesi, h noktanın sıvı yüzeyine olan düşey uzaklığıdır.'],
    ['10 metre derinlikte su basıncı kaç bardır?', 'Tatlı suda sıvının oluşturduğu basınç yaklaşık 0,98 bardır. Atmosfer basıncı da eklendiğinde mutlak basınç yaklaşık 1,99 bar olur.'],
    ['Kabın şekli basıncı etkiler mi?', 'Hayır. Aynı sıvıda aynı derinlikteki tüm noktalarda basınç eşittir; kabın geniş, dar, eğik ya da kıvrımlı olması sonucu değiştirmez. Bileşik kaplarda sıvı seviyelerinin eşitlenmesi bunun sonucudur.'],
    ['Derinlik hangi yönde ölçülür?', 'Her zaman düşey doğrultuda, sıvının serbest yüzeyinden aşağıya doğru ölçülür. Eğik bir boruda borunun uzunluğu değil, iki nokta arasındaki yükseklik farkı kullanılır.'],
    ['Mutlak basınç ile gösterge basıncı arasındaki fark nedir?', 'Gösterge basıncı atmosfer basıncına göre ölçülen farktır; mutlak basınç ise boşluğa göre ölçülen toplam değerdir. Açık yüzeyli bir sıvıda mutlak basınç, hidrostatik basınca atmosfer basıncının eklenmesiyle bulunur.'],
    ['Basınçtan derinliği nasıl bulurum?', 'Formülü tersine çevirin: h = P / (ρ · g). Örneğin tatlı suda 50 kPa gösterge basıncı 50 000 / (1000 × 9,81) ≈ 5,1 metre derinliğe karşılık gelir.'],
    ['Yüzey basıncı alanına ne yazmalıyım?', 'Sıvının üstü açıksa varsayılan 101,325 kPa değerini bırakın; yüksek rakımda yerel hava basıncını yazabilirsiniz. Üstü basınçlı gazla kapalı bir tankta gazın mutlak basıncını girin. Yalnızca sıvının katkısıyla ilgileniyorsanız 0 yazın.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['basinc-hesapla', 'kaldirma-kuvveti-hesapla', 'yogunluk-hesapla', 'debi-hesapla', 'kuvvet-hesapla'],
};
