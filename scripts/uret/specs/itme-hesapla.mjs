export default {
  slug: 'itme-hesapla',
  title: 'İtme (İmpuls) Hesaplama',
  h1Tail: 'I = F · Δt = Δp',
  pageTitle: 'İtme (İmpuls) Hesaplama – I = F·Δt ve Momentum Değişimi',
  description: 'İtmeyi kuvvet ve etki süresinden ya da kütle ile hız değişiminden hesaplayın. Momentum değişimini, ortalama kuvveti ve hız değişimini aynı ekranda görün.',
  card: 'Kuvvet ve süreden ya da kütle ve hız değişiminden itmeyi (impuls), ortalama kuvveti ve momentum değişimini hesaplayın.',
  category: 'bilim',
  keywords: ['itme hesaplama', 'impuls hesaplama', 'itme formülü', 'itme momentum ilişkisi', 'F.t hesaplama', 'momentum değişimi', 'ortalama kuvvet hesaplama'],
  lead: `Bir cisme etki eden itmeyi (impuls) iki yoldan hesaplayın: <strong>kuvvet × süre</strong> ya da <strong>kütle × hız değişimi</strong>. Araç, verdiğiniz ek bilgilere göre ortalama kuvveti ya da hız değişimini de bulur.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Hesap yöntemi', type: 'select', wide: true, options: [['ft', 'Kuvvet ve süreden (I = F·Δt)'], ['mv', 'Kütle ve hızlardan (I = m·Δv)']] },
    { id: 'kuvvet', label: 'Kuvvet F (N)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'sure', label: 'Etki süresi Δt (s)', type: 'number', placeholder: 'Örn. 0,2', hint: 'İkinci yöntemde isteğe bağlı; yazarsanız ortalama kuvvet bulunur.' },
    { id: 'kutle', label: 'Kütle m (kg)', type: 'number', placeholder: 'Örn. 0,4', hint: 'Birinci yöntemde isteğe bağlı; yazarsanız hız değişimi bulunur.' },
    { id: 'ilkHiz', label: 'İlk hız (m/s)', type: 'number', value: '0' },
    { id: 'sonHiz', label: 'Son hız (m/s)', type: 'number', placeholder: 'Örn. 25' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    let I, rows;
    if (v.yontem === 'mv') {
      const m = h.pos(v.kutle, 'Kütle');
      const v1 = h.num(v.ilkHiz, 'İlk hız');
      const v2 = h.num(v.sonHiz, 'Son hız');
      I = m * (v2 - v1);
      rows = [
        ['İtme', h.fmt(I, 4) + ' N·s'],
        ['Momentum değişimi', h.fmt(I, 4) + ' kg·m/s'],
        ['İlk momentum', h.fmt(m * v1, 4) + ' kg·m/s'],
        ['Son momentum', h.fmt(m * v2, 4) + ' kg·m/s'],
        ['Hız değişimi', h.fmt(v2 - v1, 4) + ' m/s'],
      ];
      if (!bos(v.sure)) {
        const t = h.pos(v.sure, 'Etki süresi');
        rows.push(['Ortalama kuvvet', h.fmt(I / t, 4) + ' N']);
      }
    } else {
      const F = h.num(v.kuvvet, 'Kuvvet');
      const t = h.pos(v.sure, 'Etki süresi');
      I = F * t;
      rows = [
        ['İtme', h.fmt(I, 4) + ' N·s'],
        ['Momentum değişimi', h.fmt(I, 4) + ' kg·m/s'],
      ];
      if (!bos(v.kutle)) {
        const m = h.pos(v.kutle, 'Kütle');
        rows.push(['Hız değişimi', h.fmt(I / m, 4) + ' m/s']);
      }
    }
    return { rows, note: 'İtme vektörel bir büyüklüktür; eksi işaret, itmenin pozitif kabul ettiğiniz yöne zıt olduğunu gösterir. 1 N·s = 1 kg·m/s.' };
  },
  cases: [
    { in: { yontem: 'ft', kuvvet: '50', sure: '0,2' }, out: { 'İtme': '10 N·s', 'Momentum değişimi': '10 kg·m/s' } },
    { in: { yontem: 'mv', kutle: '0,4', ilkHiz: '0', sonHiz: '25', sure: '0,05' }, out: { 'İtme': '10 N·s', 'Ortalama kuvvet': '200 N', 'Son momentum': '10 kg·m/s' } },
    { in: { yontem: 'ft', kuvvet: '1000', sure: '0,01', kutle: '0,5' }, out: { 'İtme': '10 N·s', 'Hız değişimi': '20 m/s' } },
    { in: { yontem: 'mv', kutle: '0,15', ilkHiz: '-40', sonHiz: '30' }, out: { 'İtme': '10,5 N·s', 'Hız değişimi': '70 m/s', 'İlk momentum': '-6 kg·m/s' } },
    { in: { yontem: 'mv', kutle: '1000', ilkHiz: '20', sonHiz: '0', sure: '4' }, out: { 'İtme': '-20.000 N·s', 'Ortalama kuvvet': '-5.000 N' } },
    { in: { yontem: 'ft', kuvvet: '12', sure: '3' }, out: { 'İtme': '36 N·s' } },
    { in: { yontem: 'ft', kuvvet: '50', sure: '0' }, error: true },
    { in: { yontem: 'mv', kutle: '0', ilkHiz: '0', sonHiz: '10' }, error: true },
    { in: { yontem: 'ft', kuvvet: '', sure: '2' }, error: true },
  ],
  howto: [
    `"Hesap yöntemi" listesinden elinizdeki verilere uygun olanı seçin: kuvvet ve süre biliniyorsa birinci, kütle ile ilk ve son hız biliniyorsa ikinci yöntem.`,
    `Birinci yöntemde kuvveti newton, etki süresini saniye olarak yazın. Kütleyi de girerseniz cismin hızının ne kadar değiştiği hesaplanır.`,
    `İkinci yöntemde kütleyi kilogram, hızları metre bölü saniye olarak yazın. Cisim geri sekiyorsa hızlardan birini eksi işaretli girin. Etki süresini de yazarsanız ortalama kuvvet bulunur.`,
    `"Hesapla" düğmesine basın. İtme, momentum değişimi ve varsa ek sonuçlar listelenir.`,
  ],
  sections: [
    { h: 'İtme nedir?', p: [
      `İtme (impuls), bir kuvvetin bir cisme belirli bir süre boyunca etki etmesinin toplam sonucunu ölçen büyüklüktür. Büyük bir kuvvet kısa süre, küçük bir kuvvet uzun süre etki ederek aynı itmeyi oluşturabilir. İtme vektöreldir; yönü, uygulanan net kuvvetin yönüyle aynıdır. Birimi newton saniyedir (N·s) ve bu birim kilogram metre bölü saniyeye (kg·m/s) eşittir.`,
      `Futbol topuna vurulan şut, raketle karşılanan tenis topu, çekiçle çakılan çivi ya da duvara çarpan bir araç, kuvvetin çok kısa sürede etkidiği olaylardır. Bu tür çarpma ve vuruş olaylarında kuvvetin anlık değerini ölçmek zordur; itme kavramı, olayın öncesi ve sonrasına bakarak sonucu hesaplamayı sağlar.`,
    ] },
    { h: 'Formüller ve itme-momentum teoremi', p: [
      `Sabit ya da ortalama bir kuvvet için itme <strong>I = F × Δt</strong> bağıntısıyla bulunur. Newton'ın ikinci yasası F = m × a ve ivmenin tanımı a = Δv ÷ Δt birleştirildiğinde F × Δt = m × Δv elde edilir. Sağ taraf cismin momentumundaki değişimdir. Buna itme-momentum teoremi denir: <strong>I = Δp = m × (v<sub>son</sub> − v<sub>ilk</sub>)</strong>.`,
      `Bu eşitlik iki yönde kullanılır. Kuvvet ve süre biliniyorsa cismin hızının ne kadar değişeceği bulunur. Hız değişimi biliniyorsa, çarpışma sırasında etki eden ortalama kuvvet <strong>F = Δp ÷ Δt</strong> ile hesaplanır. Kuvvet-zaman grafiğinde eğrinin altında kalan alan da itmeyi verir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Kuvvet ve süre:</strong> Bir cisme 50 N'luk kuvvet 0,2 saniye boyunca uygulanıyor. İtme I = 50 × 0,2 = 10 N·s olur. Cismin momentumu da 10 kg·m/s değişir.`,
      `<strong>Şut:</strong> 0,4 kg kütleli duran bir topa vuruluyor ve top 25 m/s hızla ayrılıyor. İtme I = 0,4 × (25 − 0) = 10 N·s bulunur. Ayağın topla teması 0,05 saniye sürdüyse ortalama kuvvet 10 ÷ 0,05 = 200 N'dur.`,
      `<strong>Geri seken top:</strong> 0,15 kg kütleli bir top 40 m/s hızla sopaya geliyor ve ters yönde 30 m/s hızla dönüyor. Dönüş yönü pozitif seçilirse ilk hız −40, son hız +30 olur. Hız değişimi 30 − (−40) = 70 m/s, itme 0,15 × 70 = 10,5 N·s bulunur. Hızların büyüklüklerini çıkarıp 10 m/s almak bu tür sorulardaki en yaygın hatadır.`,
      `<strong>Fren yapan araç:</strong> 1000 kg kütleli bir otomobil 20 m/s hızdan 4 saniyede duruyor. İtme 1000 × (0 − 20) = −20.000 N·s, ortalama fren kuvveti −20.000 ÷ 4 = −5.000 N olur. Eksi işaret, kuvvetin hareket yönüne zıt olduğunu belirtir.`,
    ] },
    { h: 'Süre uzarsa kuvvet neden azalır?', p: [
      `Belirli bir momentum değişimi için itme sabittir. İtme kuvvet ile sürenin çarpımı olduğundan, etki süresi uzadıkça ortalama kuvvet aynı oranda küçülür. Günlük hayattaki pek çok güvenlik önlemi bu ilkeye dayanır: hava yastığı ve emniyet kemeri yolcunun durma süresini uzatır, kask içindeki köpük darbeyi zamana yayar, yüksekten atlayan biri dizlerini bükerek yere iner, kaleci topu kollarını geri çekerek tutar.`,
      `Tersine, kuvvetin büyük olması istenen durumlarda süre kısaltılır. Çekiç sert bir yüzeye vurduğunda çok kısa sürede durur ve çiviye büyük bir kuvvet uygular. Aynı çekici yumuşak bir yastığa vurduğunuzda itme aynı kalsa da kuvvet çok daha küçüktür.`,
    ] },
    { h: 'İşaret ve yön seçimi', p: [
      `Tek boyutlu sorularda bir yön pozitif seçilir ve o yöne zıt hızlar eksi işaretle yazılır. Araç, hızları işaretleriyle birlikte işler; bu nedenle sonuç da işaretli çıkar. Yalnızca büyüklük gerekiyorsa sonucun mutlak değerini alın. İki boyutlu hareketlerde her eksen için ayrı hesap yapılır ve bileşenler vektörel olarak toplanır; bu araç tek doğrultudaki hesabı yapar.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Süreyi milisaniye olarak bırakmak. 50 ms için 0,05 yazılmalıdır.`,
      `Kütleyi gram olarak girmek. 400 g'lık top için 0,4 kg yazın.`,
      `Geri seken cisimlerde hızların işaretini unutmak ve hız değişimini küçük bulmak.`,
      `İtme ile momentumu aynı şey sanmak. Momentum cismin o andaki durumunu, itme ise momentumdaki değişimi anlatır.`,
      `Ortalama kuvveti en büyük kuvvet sanmak. Çarpma sırasında anlık kuvvet ortalamanın epeyce üzerine çıkabilir.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Hesaplanan kuvvet, etki süresi boyunca sabit kabul edilen ortalama değerdir; gerçek çarpışmalarda kuvvet zamanla hızla değişir. Kütlenin olay sırasında değişmediği ve hareketin tek doğrultuda olduğu varsayılır. Sonuçlar ders çalışma ve ön değerlendirme içindir; koruyucu donanım, araç güvenliği ya da yapı tasarımı gibi konularda mühendislik analizinin yerini tutmaz.`,
    ] },
  ],
  faq: [
    ['İtme formülü nedir?', `İtme, kuvvet ile kuvvetin etki süresinin çarpımıdır: I = F × Δt. Aynı zamanda momentum değişimine eşittir: I = m × (v son − v ilk).`],
    ['İtmenin birimi nedir?', `SI biriminde newton saniyedir (N·s). Bu birim momentumun birimi olan kg·m/s ile aynıdır, çünkü 1 N = 1 kg·m/s² olduğundan saniye ile çarpıldığında kg·m/s elde edilir.`],
    ['İtme ile momentum arasındaki ilişki nedir?', `Bir cisme uygulanan net itme, o cismin momentumundaki değişime eşittir. Buna itme-momentum teoremi denir. İtme sıfırsa momentum değişmez.`],
    ['Ortalama kuvvet nasıl hesaplanır?', `Momentum değişimi etki süresine bölünür: F = Δp ÷ Δt. Araçta ikinci yöntemi seçip etki süresini de yazarsanız ortalama kuvvet ayrı bir satırda verilir.`],
    ['İtme neden negatif çıkabilir?', `İtme vektörel olduğu için yönü vardır. Pozitif seçtiğiniz yöne zıt bir kuvvet ya da hızdaki azalma, eksi işaretli itme verir. Fren yapan bir araçta itmenin negatif çıkması beklenen durumdur.`],
    ['Hava yastığı itmeyi azaltır mı?', `Hayır, itmeyi değil kuvveti azaltır. Yolcunun momentum değişimi, yani itme aynıdır; hava yastığı durma süresini uzattığı için yolcuya etki eden ortalama kuvvet küçülür.`],
    ['Duvara çarpıp geri dönen topta itme nasıl bulunur?', `Geliş ve dönüş hızları zıt yönlü olduğu için biri eksi işaretle yazılır. Hız değişimi iki hız büyüklüğünün toplamı kadar olur ve itme, kütle ile bu toplamın çarpımıdır.`],
    ['Girdiğim veriler bir yere gönderiliyor mu?', `Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya iletilmez ve kaydedilmez.`],
  ],
  related: ['momentum-hesapla', 'kuvvet-hesapla', 'carpisma-hesapla', 'ivme-hesapla', 'kinetik-enerji-hesapla'],
};
