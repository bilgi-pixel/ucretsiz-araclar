export default {
  slug: 'elektrik-alan-hesapla',
  title: 'Elektrik Alan Hesaplama',
  h1Tail: 'E = k·q/r², E = F/q, E = V/d',
  pageTitle: 'Elektrik Alan Hesaplama – Noktasal Yük, F/q ve V/d Formülleri',
  description: 'Elektrik alan şiddetini üç yoldan hesaplayın: noktasal yükün çevresinde E = k·q/r², deneme yüküne etkiyen kuvvetten E = F/q ya da paralel levhalarda E = V/d.',
  card: 'Elektrik alan şiddetini noktasal yükten, yüke etkiyen kuvvetten ya da paralel levhalar arasındaki gerilimden hesaplayın.',
  category: 'bilim',
  keywords: ['elektrik alan hesaplama', 'elektrik alan şiddeti', 'elektrik alan formülü', 'E = kq/r2', 'E = F/q', 'paralel levhalar elektrik alan', 'N/C V/m'],
  lead: `Elektrik alan şiddetini elinizdeki verilere göre üç farklı yoldan hesaplayın: bir <strong>noktasal yükün</strong> çevresinde, bir yüke etkiyen <strong>kuvvetten</strong> ya da <strong>paralel levhalar</strong> arasındaki gerilimden.`,
  button: 'Hesapla',
  inputs: [
    { id: 'yontem', label: 'Hesap yöntemi', type: 'select', wide: true, options: [['nokta', 'Noktasal yük (E = k·q/r²)'], ['kuvvet', 'Kuvvet ve yük (E = F/q)'], ['levha', 'Paralel levhalar (E = V/d)']] },
    { id: 'yuk', label: 'Yük (q)', type: 'number', placeholder: 'Örn. 1', hint: 'Birinci ve ikinci yöntemde gerekir.' },
    { id: 'yukBirim', label: 'Yük birimi', type: 'select', options: [['uC', 'Mikrocoulomb (µC)'], ['nC', 'Nanocoulomb (nC)'], ['pC', 'Pikocoulomb (pC)'], ['mC', 'Milicoulomb (mC)'], ['C', 'Coulomb (C)']] },
    { id: 'mesafe', label: 'Uzaklık r ya da levha aralığı d (m)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Birinci ve üçüncü yöntemde gerekir. Metre cinsinden yazın.' },
    { id: 'kuvvet', label: 'Kuvvet F (N)', type: 'number', placeholder: 'Yalnızca ikinci yöntemde' },
    { id: 'gerilim', label: 'Gerilim V (volt)', type: 'number', placeholder: 'Yalnızca üçüncü yöntemde' },
  ],
  compute(v, h) {
    const K = 8.9875517923e9;
    const B = { C: 1, mC: 1e-3, uC: 1e-6, nC: 1e-9, pC: 1e-12 };
    const carpan = B[v.yukBirim] || 1e-6;
    let E, yon;
    const ek = [];
    if (v.yontem === 'kuvvet') {
      const F = h.nonneg(v.kuvvet, 'Kuvvet');
      const q = h.num(v.yuk, 'Yük') * carpan;
      if (q === 0) h.err('Yük sıfır olamaz; E = F/q bağıntısında sıfıra bölünemez.');
      E = F / Math.abs(q);
      yon = q > 0 ? 'Pozitif yüke etkiyen kuvvetle aynı yönde' : 'Negatif yüke etkiyen kuvvete zıt yönde';
      ek.push(['Yük', h.sig(q, 6) + ' C']);
    } else if (v.yontem === 'levha') {
      const V = h.nonneg(v.gerilim, 'Gerilim');
      const d = h.pos(v.mesafe, 'Levha aralığı');
      E = V / d;
      yon = 'Pozitif levhadan negatif levhaya doğru';
      ek.push(['Levha aralığı', h.sig(d * 1000, 6) + ' mm']);
    } else {
      const q = h.num(v.yuk, 'Yük') * carpan;
      const r = h.pos(v.mesafe, 'Uzaklık');
      E = (K * Math.abs(q)) / (r * r);
      yon = q === 0 ? 'Alan yok (yük sıfır)' : q > 0 ? 'Yükten dışarı doğru (pozitif yük)' : 'Yüke doğru (negatif yük)';
      ek.push(['Bu noktadaki elektrik potansiyeli', h.sig((K * q) / r, 6) + ' V']);
      ek.push(['Yük', h.sig(q, 6) + ' C']);
    }
    return {
      rows: [
        ['Elektrik alan şiddeti', h.sig(E, 6) + ' N/C'],
        ['Eşdeğer gösterim', h.sig(E, 6) + ' V/m'],
        ['Kilovolt bölü metre', h.sig(E / 1000, 6) + ' kV/m'],
        ['Yön', yon],
        ...ek,
      ],
      note: 'N/C ve V/m aynı birimdir. Noktasal yük hesabında k = 8,9875517923 × 10^9 N·m²/C² ve ortam olarak boşluk (hava) alınmıştır.',
    };
  },
  cases: [
    { in: { yontem: 'nokta', yuk: '1', yukBirim: 'uC', mesafe: '1' }, out: { 'Elektrik alan şiddeti': '8.987,55 N/C', 'Yön': 'Yükten dışarı doğru (pozitif yük)', 'Bu noktadaki elektrik potansiyeli': '8.987,55 V' } },
    { in: { yontem: 'kuvvet', kuvvet: '0,02', yuk: '4', yukBirim: 'uC' }, out: { 'Elektrik alan şiddeti': '5.000 N/C', 'Kilovolt bölü metre': '5 kV/m' } },
    { in: { yontem: 'levha', gerilim: '12', mesafe: '0,002' }, out: { 'Elektrik alan şiddeti': '6.000 N/C', 'Eşdeğer gösterim': '6.000 V/m', 'Levha aralığı': '2 mm' } },
    { in: { yontem: 'nokta', yuk: '2', yukBirim: 'nC', mesafe: '0,1' }, out: { 'Elektrik alan şiddeti': '1.797,51 N/C', 'Bu noktadaki elektrik potansiyeli': '179,751 V' } },
    { in: { yontem: 'nokta', yuk: '-5', yukBirim: 'uC', mesafe: '0,5' }, out: { 'Elektrik alan şiddeti': '179.751 N/C', 'Yön': 'Yüke doğru (negatif yük)' } },
    { in: { yontem: 'levha', gerilim: '220', mesafe: '0,01' }, out: { 'Elektrik alan şiddeti': '22.000 N/C', 'Kilovolt bölü metre': '22 kV/m' } },
    { in: { yontem: 'kuvvet', kuvvet: '0,003', yuk: '6', yukBirim: 'nC' }, out: { 'Elektrik alan şiddeti': '500.000 N/C' } },
    { in: { yontem: 'nokta', yuk: '1', yukBirim: 'uC', mesafe: '0' }, error: true },
    { in: { yontem: 'kuvvet', kuvvet: '0,02', yuk: '0', yukBirim: 'uC' }, error: true },
    { in: { yontem: 'levha', gerilim: '', mesafe: '0,01' }, error: true },
  ],
  howto: [
    `"Hesap yöntemi" listesinden sorunuza uyan formülü seçin: noktasal yükün çevresindeki alan, bir yüke etkiyen kuvvetten alan ya da paralel levhalar arasındaki düzgün alan.`,
    `Noktasal yük yönteminde alanı oluşturan yükü ve birimini, ardından alanın sorulduğu noktanın yüke uzaklığını metre olarak yazın.`,
    `Kuvvet yönteminde alana konan yükü ve ona etkiyen kuvveti newton olarak girin.`,
    `Paralel levha yönteminde levhalar arasındaki gerilimi volt, levha aralığını metre olarak yazın (2 mm için 0,002).`,
    `"Hesapla" düğmesine basın. Alan şiddeti N/C, V/m ve kV/m olarak, alanın yönü de ayrı bir satırda verilir.`,
  ],
  sections: [
    { h: 'Elektrik alan nedir?', p: [
      `Elektrik yükü taşıyan her cisim, çevresindeki uzayda başka yüklere kuvvet uygulayabilen bir etki bölgesi oluşturur. Bu bölgeye elektrik alan denir. Alanın herhangi bir noktasındaki şiddeti, o noktaya konan birim pozitif yüke etki eden kuvvet olarak tanımlanır. Elektrik alan vektörel bir büyüklüktür: hem büyüklüğü hem yönü vardır.`,
      `Alanın yönü, o noktaya konan pozitif bir deneme yüküne etkiyecek kuvvetin yönüdür. Bu yüzden alan çizgileri pozitif yüklerden çıkar ve negatif yüklerde son bulur. Çizgilerin sık olduğu yerde alan güçlü, seyrek olduğu yerde zayıftır.`,
    ] },
    { h: 'Üç formül, üç durum', p: [
      `<strong>Tanım formülü: E = F ÷ q.</strong> Alan içindeki bir q yüküne F kuvveti etki ediyorsa alan şiddeti bu kuvvetin yüke oranıdır. Birimi newton bölü coulombdur (N/C). Tersinden, alanı bilinen bir bölgeye konan yüke etkiyen kuvvet F = q × E ile bulunur.`,
      `<strong>Noktasal yükün alanı: E = k × |q| ÷ r².</strong> Tek bir noktasal yükün r uzaklığında oluşturduğu alandır. k Coulomb sabitidir ve boşlukta yaklaşık 9 × 10<sup>9</sup> N·m²/C² değerindedir. Alan, uzaklığın karesiyle ters orantılı olarak azalır. İletken bir kürenin dışındaki alan da, kürenin bütün yükü merkezde toplanmış gibi bu formülle hesaplanır.`,
      `<strong>Paralel levhalar: E = V ÷ d.</strong> Aralarında V gerilimi bulunan, birbirine d kadar yakın iki paralel iletken levha arasında alan yaklaşık olarak düzgündür; her noktada aynı büyüklükte ve aynı yöndedir. Bu formülden gelen birim volt bölü metredir (V/m) ve N/C ile tamamen aynıdır.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Noktasal yük:</strong> +1 µC'luk bir yükten 1 metre uzaktaki alan E = 8,9875 × 10<sup>9</sup> × 1 × 10<sup>−6</sup> ÷ 1² ≈ 8.987,55 N/C'dur. Yük pozitif olduğu için alan yükten dışarı doğrudur. Aynı noktadaki elektrik potansiyeli k × q ÷ r ≈ 8.987,55 volttur.`,
      `<strong>Negatif yük:</strong> −5 µC'luk bir yükten 0,5 m uzakta alan 8,9875 × 10<sup>9</sup> × 5 × 10<sup>−6</sup> ÷ 0,25 ≈ 179.751 N/C büyüklüğündedir ve yüke doğru yönelir.`,
      `<strong>Kuvvetten alan:</strong> 4 µC'luk bir yüke 0,02 N kuvvet etki ediyorsa bulunduğu noktadaki alan E = 0,02 ÷ (4 × 10<sup>−6</sup>) = 5.000 N/C, yani 5 kV/m'dir.`,
      `<strong>Paralel levhalar:</strong> Aralarında 12 V gerilim olan ve 2 mm arayla duran iki levha arasındaki alan E = 12 ÷ 0,002 = 6.000 V/m olur. Levha aralığı yarıya indirilirse aynı gerilimde alan iki katına çıkar.`,
    ] },
    { h: 'N/C ile V/m neden aynı?', p: [
      `Volt, birim yük başına enerji demektir: 1 V = 1 J/C. Joule ise newton ile metrenin çarpımıdır. Buna göre 1 V/m = 1 (N·m/C) ÷ m = 1 N/C eder. İki birim arasında çevirme katsayısı yoktur; hangisinin kullanılacağı bağlama göre değişir. Kuvvet ve yük üzerinden konuşulurken N/C, gerilim ve mesafe üzerinden konuşulurken V/m tercih edilir. Yüksek alanlar için kV/m ya da MV/m kullanılır.`,
    ] },
    { h: 'Karşılaştırma için kabaca değerler', p: [
      `Elektrik alan şiddetinin hangi ölçeklerde karşımıza çıktığına dair fikir vermesi için birkaç yaklaşık değer aşağıdadır. Bunlar koşullara göre geniş aralıkta değişen kaba büyüklüklerdir.`,
    ], ul: [
      `Açık havada, yeryüzü yakınında atmosferin doğal alanı: yüz V/m mertebesinde`,
      `Kuru havanın delinmeye (kıvılcım atlamasına) başladığı alan: yaklaşık 3 milyon V/m, yani 3 MV/m`,
      `1,5 voltluk pil uçlarına bağlı, 1 mm aralıklı iki levha arasında: 1.500 V/m`,
    ] },
    { h: 'Birden fazla yük ve sık yapılan hatalar', p: [
      `Bir noktada birden fazla yükün alanı varsa her yükün alanı ayrı ayrı hesaplanır ve vektörel olarak toplanır; buna üst üste binme (süperpozisyon) ilkesi denir. Aynı doğrultudaki alanlar yönlerine göre toplanır ya da çıkarılır, farklı doğrultudakiler bileşenlerine ayrılır. Bu araç tek bir yükün ya da tek bir levha çiftinin alanını verir.`,
    ], ul: [
      `Uzaklığı santimetre olarak yazmak. Araç metre bekler: 10 cm için 0,1 girin.`,
      `Alanı oluşturan yük ile alana konan deneme yükünü karıştırmak. E = k·q/r² formülündeki q alanı oluşturan yüktür; E = F/q formülündeki q ise alanın içine konan yüktür.`,
      `Negatif yük için alanın büyüklüğünü negatif yazmak. Büyüklük pozitiftir; işaret yalnızca yönü belirler.`,
      `Elektrik alan ile elektrik potansiyelini karıştırmak. Alan uzaklığın karesiyle, potansiyel uzaklığın kendisiyle ters orantılıdır ve potansiyel skalerdir.`,
    ] },
    { h: 'Sınırlar ve güvenlik uyarısı', p: [
      `Noktasal yük formülü, yükün boyutunun uzaklığa göre çok küçük olduğu ve ortamın boşluk ya da hava olduğu durumlar için geçerlidir. Paralel levha formülü levhaların kenarlarından uzak, iç bölgedeki düzgün alanı verir; kenarlarda alan saçaklanır. Sonuçlar eğitim amaçlıdır. Yüksek gerilim, yalıtım aralığı ve elektrostatik boşalma gibi konular can güvenliğini ilgilendirir; bu tür işlerde yürürlükteki standartlar ve yetkili bir elektrik mühendisinin değerlendirmesi esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Elektrik alan formülü nedir?', `Tanım olarak E = F ÷ q'dur. Noktasal bir yükün çevresinde E = k × |q| ÷ r², paralel levhalar arasında ise E = V ÷ d kullanılır. Hangisinin seçileceği soruda verilen büyüklüklere bağlıdır.`],
    ['Elektrik alanın birimi nedir?', `SI biriminde newton bölü coulomb (N/C) ya da volt bölü metredir (V/m). İkisi birbirine eşittir; araç sonucu her iki gösterimle verir.`],
    ['Elektrik alanın yönü nasıl belirlenir?', `Alanın yönü, o noktaya konan pozitif bir yüke etkiyecek kuvvetin yönüdür. Pozitif yükün alanı yükten dışarı, negatif yükün alanı yüke doğrudur. Paralel levhalarda alan pozitif levhadan negatif levhaya yönelir.`],
    ['Uzaklık iki katına çıkarsa noktasal yükün alanı ne olur?', `Alan uzaklığın karesiyle ters orantılı olduğundan dörtte birine düşer. Paralel levhalar arasındaki düzgün alanda ise konum değişse de alan aynı kalır.`],
    ['Elektrik alan ile elektriksel kuvvet arasındaki fark nedir?', `Elektrik alan, uzayın bir noktasının özelliğidir ve orada yük olmasa da vardır. Elektriksel kuvvet ise o noktaya bir yük konduğunda ortaya çıkar ve F = q × E kadardır.`],
    ['Negatif yüke etkiyen kuvvet hangi yöndedir?', `Negatif yüke etkiyen kuvvet, elektrik alanın yönüne zıttır. Pozitif yük alan yönünde, negatif yük alana ters yönde itilir.`],
    ['Kitaptaki sonuçla neden küçük bir fark var?', `Okul kitaplarında Coulomb sabiti çoğunlukla 9 × 10^9 alınır. Araç daha duyarlı olan 8,9875517923 × 10^9 değerini kullandığından noktasal yük hesaplarında sonuç binde bir kadar daha küçük çıkar.`],
    ['Girdiğim değerler bir yere gönderiliyor mu?', `Hayır. Hesap tümüyle tarayıcınızda yapılır; değerler sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['coulomb-kuvveti-hesapla', 'manyetik-kuvvet-hesapla', 'isik-siddeti-mesafe-hesapla', 'kuvvet-hesapla', 'bilimsel-gosterim-cevir'],
};
