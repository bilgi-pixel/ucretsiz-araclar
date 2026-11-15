export default {
  slug: 'coulomb-kuvveti-hesapla',
  title: 'Coulomb Kuvveti Hesaplama',
  h1Tail: 'F = k · q₁ · q₂ / r²',
  pageTitle: 'Coulomb Kuvveti Hesaplama – İki Yük Arasındaki Elektriksel Kuvvet',
  description: 'İki noktasal yük arasındaki elektriksel kuvveti Coulomb yasasıyla hesaplayın. Yükleri µC, nC ya da C; uzaklığı m, cm ya da mm girin; itme mi çekme mi olduğunu görün.',
  card: 'İki noktasal yük arasındaki elektriksel kuvveti Coulomb yasasıyla hesaplayın; itme ya da çekme olduğu belirtilir.',
  category: 'bilim',
  keywords: ['coulomb kuvveti hesaplama', 'coulomb yasası', 'elektriksel kuvvet hesaplama', 'iki yük arasındaki kuvvet', 'k q1 q2 / r2', 'coulomb sabiti', 'elektrostatik kuvvet'],
  lead: `İki noktasal elektrik yükü arasındaki kuvveti <strong>Coulomb yasası</strong> ile hesaplayın. Yüklerin büyüklüğünü, işaretini ve aralarındaki uzaklığı girin; araç kuvvetin büyüklüğünü ve itme mi çekme mi olduğunu söylesin.`,
  button: 'Hesapla',
  inputs: [
    { id: 'q1', label: 'Birinci yük (q₁)', type: 'number', placeholder: 'Örn. 2', hint: 'Negatif yük için eksi işareti kullanın.' },
    { id: 'q1b', label: 'q₁ birimi', type: 'select', options: [['uC', 'Mikrocoulomb (µC)'], ['nC', 'Nanocoulomb (nC)'], ['pC', 'Pikocoulomb (pC)'], ['mC', 'Milicoulomb (mC)'], ['C', 'Coulomb (C)']] },
    { id: 'q2', label: 'İkinci yük (q₂)', type: 'number', placeholder: 'Örn. -3' },
    { id: 'q2b', label: 'q₂ birimi', type: 'select', options: [['uC', 'Mikrocoulomb (µC)'], ['nC', 'Nanocoulomb (nC)'], ['pC', 'Pikocoulomb (pC)'], ['mC', 'Milicoulomb (mC)'], ['C', 'Coulomb (C)']] },
    { id: 'r', label: 'Yükler arası uzaklık', type: 'number', placeholder: 'Örn. 30' },
    { id: 'rb', label: 'Uzaklık birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
    { id: 'er', label: 'Ortamın bağıl dielektrik sabiti (εᵣ)', type: 'number', value: '1', hint: 'Boşluk ve hava için 1.' },
  ],
  compute(v, h) {
    const K = 8.9875517923e9;
    const B = { C: 1, mC: 1e-3, uC: 1e-6, nC: 1e-9, pC: 1e-12 };
    const U = { m: 1, cm: 0.01, mm: 0.001 };
    const q1 = h.num(v.q1, 'Birinci yük') * (B[v.q1b] || 1e-6);
    const q2 = h.num(v.q2, 'İkinci yük') * (B[v.q2b] || 1e-6);
    const r = h.pos(v.r, 'Yükler arası uzaklık') * (U[v.rb] || 0.01);
    const er = h.opt(v.er, 1, 'Bağıl dielektrik sabiti');
    if (er < 1) h.err('Bağıl dielektrik sabiti 1\'den küçük olamaz. Boşluk ve hava için 1 yazın.');
    const k = K / er;
    const F = (k * Math.abs(q1 * q2)) / (r * r);
    const carp = q1 * q2;
    const tur = carp === 0 ? 'Yok (yüklerden biri sıfır)' : carp > 0 ? 'İtme (aynı işaretli yükler)' : 'Çekme (zıt işaretli yükler)';
    return {
      rows: [
        ['Kuvvetin büyüklüğü', h.sig(F, 6) + ' N'],
        ['Etkileşim', tur],
        ['Uzaklık', h.sig(r, 6) + ' m'],
        ['Birinci yük', h.sig(q1, 6) + ' C'],
        ['İkinci yük', h.sig(q2, 6) + ' C'],
        ['Ortamdaki Coulomb sabiti', h.sig(k, 6) + ' N·m²/C²'],
      ],
      note: 'k = 8,9875517923 × 10^9 N·m²/C² (boşluk). Yükler noktasal ve durgun kabul edilmiştir. Her iki yüke de aynı büyüklükte, zıt yönlü kuvvet etki eder.',
    };
  },
  cases: [
    { in: { q1: '1', q1b: 'uC', q2: '1', q2b: 'uC', r: '1', rb: 'm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '0,00898755 N', 'Etkileşim': 'İtme (aynı işaretli yükler)' } },
    { in: { q1: '2', q1b: 'uC', q2: '-3', q2b: 'uC', r: '30', rb: 'cm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '0,59917 N', 'Etkileşim': 'Çekme (zıt işaretli yükler)', 'Uzaklık': '0,3 m' } },
    { in: { q1: '1', q1b: 'C', q2: '1', q2b: 'C', r: '1', rb: 'm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '8.987.550.000 N' } },
    { in: { q1: '5', q1b: 'nC', q2: '5', q2b: 'nC', r: '5', rb: 'cm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '0,0000898755 N' } },
    { in: { q1: '1', q1b: 'uC', q2: '1', q2b: 'uC', r: '1', rb: 'm', er: '80' }, out: { 'Kuvvetin büyüklüğü': '0,000112344 N' } },
    { in: { q1: '3', q1b: 'uC', q2: '3', q2b: 'uC', r: '300', rb: 'mm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '0,898755 N' } },
    { in: { q1: '0', q1b: 'uC', q2: '4', q2b: 'uC', r: '10', rb: 'cm', er: '1' }, out: { 'Kuvvetin büyüklüğü': '0 N', 'Etkileşim': 'Yok (yüklerden biri sıfır)' } },
    { in: { q1: '2', q1b: 'uC', q2: '-3', q2b: 'uC', r: '0', rb: 'cm', er: '1' }, error: true },
    { in: { q1: '', q1b: 'uC', q2: '-3', q2b: 'uC', r: '30', rb: 'cm', er: '1' }, error: true },
    { in: { q1: '2', q1b: 'uC', q2: '3', q2b: 'uC', r: '30', rb: 'cm', er: '0,5' }, error: true },
  ],
  howto: [
    `Birinci ve ikinci yükün değerini yazın, yanlarındaki listelerden birimlerini seçin. Negatif yükleri eksi işaretiyle girin.`,
    `Yükler arasındaki uzaklığı yazın ve birimini (santimetre, metre ya da milimetre) seçin.`,
    `Yükler hava ya da boşlukta ise bağıl dielektrik sabitini 1 bırakın; su, yağ ya da cam gibi bir ortam için o ortamın değerini yazın.`,
    `"Hesapla" düğmesine basın. Kuvvetin büyüklüğü newton olarak, etkileşimin türü de itme ya da çekme olarak gösterilir.`,
  ],
  sections: [
    { h: 'Coulomb yasası nedir?', p: [
      `Fransız fizikçi Charles-Augustin de Coulomb'un 1780'lerde burulma terazisiyle yaptığı deneylere dayanan bu yasa, durgun iki noktasal yük arasındaki kuvveti tanımlar. Yasaya göre kuvvet, yüklerin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılıdır ve yükleri birleştiren doğru boyunca etki eder.`,
      `Aynı işaretli yükler (artı-artı ya da eksi-eksi) birbirini iter, zıt işaretli yükler birbirini çeker. Newton'ın üçüncü yasası gereği iki yüke etki eden kuvvetler eşit büyüklükte ve zıt yönlüdür; büyük yük küçük yüke daha fazla kuvvet uygulamaz.`,
    ] },
    { h: 'Formül ve sabitler', p: [
      `Kuvvetin büyüklüğü <strong>F = k × |q<sub>1</sub> × q<sub>2</sub>| ÷ r²</strong> bağıntısıyla hesaplanır. Burada q<sub>1</sub> ve q<sub>2</sub> coulomb cinsinden yükler, r metre cinsinden uzaklık, k ise Coulomb sabitidir. Boşlukta k yaklaşık 8,99 × 10<sup>9</sup> N·m²/C² değerindedir; lise sorularında çoğu zaman 9 × 10<sup>9</sup> alınır. Sabit, boşluğun elektriksel geçirgenliği ε<sub>0</sub> cinsinden k = 1 ÷ (4π ε<sub>0</sub>) olarak da yazılır.`,
      `Yükler boşluk yerine yalıtkan bir ortamın içindeyse kuvvet, ortamın bağıl dielektrik sabiti ε<sub>r</sub> kadar azalır: <strong>F = k × |q<sub>1</sub> × q<sub>2</sub>| ÷ (ε<sub>r</sub> × r²)</strong>. Hava için bu değer 1'e çok yakındır. Oda sıcaklığındaki su için yaklaşık 80 alınır; yani aynı iki yük suyun içinde yaklaşık 80 kat daha zayıf etkileşir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `+2 µC ve −3 µC'luk iki yük havada birbirinden 30 cm uzakta olsun. Önce birimler SI'ya çevrilir: q<sub>1</sub> = 2 × 10<sup>−6</sup> C, q<sub>2</sub> = −3 × 10<sup>−6</sup> C, r = 0,3 m. Yüklerin çarpımının mutlak değeri 6 × 10<sup>−12</sup> C², uzaklığın karesi 0,09 m²'dir.`,
      `F = 8,9875 × 10<sup>9</sup> × 6 × 10<sup>−12</sup> ÷ 0,09 ≈ 0,59917 N bulunur. k yerine 9 × 10<sup>9</sup> alınırsa sonuç 0,6 N çıkar; ders kitabı cevaplarıyla aradaki küçük fark bu yuvarlamadan kaynaklanır. Yükler zıt işaretli olduğu için kuvvet çekme kuvvetidir.`,
      `Bir başka örnek: 1 µC'luk iki yük 1 metre arayla durduğunda kuvvet yaklaşık 0,00899 N, yani 9 milinewton kadardır. Aynı yükler 80 dielektrik sabitli bir ortama konursa kuvvet yaklaşık 0,000112 N'a düşer.`,
    ] },
    { h: 'Uzaklığın etkisi: ters kare yasası', p: [
      `Kuvvet uzaklığın karesiyle ters orantılı olduğundan uzaklıktaki değişim sonucu güçlü biçimde etkiler. Uzaklık iki katına çıkarsa kuvvet dörtte birine, üç katına çıkarsa dokuzda birine düşer. Uzaklık yarıya inerse kuvvet dört katına çıkar. Yüklerden biri iki katına çıkarılırsa kuvvet de iki katına çıkar; her iki yük birden iki katına çıkarılırsa kuvvet dört kat olur.`,
      `Bu yapı, Newton'ın kütle çekim yasasıyla aynı biçimdedir. Aradaki fark, kütle çekiminin her zaman çekici olması, elektriksel kuvvetin ise yüklerin işaretine göre itici ya da çekici olabilmesidir. Ayrıca elektriksel kuvvet çok daha şiddetlidir: bir hidrojen atomunda elektron ile proton arasındaki elektriksel çekim yaklaşık 8 × 10<sup>−8</sup> N düzeyindedir ve aynı iki parçacık arasındaki kütle çekiminden karşılaştırılamayacak kadar büyüktür.`,
    ] },
    { h: 'Yük birimleri', ul: [
      `<strong>1 mC</strong> (milicoulomb) = 10<sup>−3</sup> C`,
      `<strong>1 µC</strong> (mikrocoulomb) = 10<sup>−6</sup> C`,
      `<strong>1 nC</strong> (nanocoulomb) = 10<sup>−9</sup> C`,
      `<strong>1 pC</strong> (pikocoulomb) = 10<sup>−12</sup> C`,
      `<strong>Temel yük</strong> (bir protonun yükü) ≈ 1,602 × 10<sup>−19</sup> C`,
    ], p: [
      `Coulomb gündelik ölçekte çok büyük bir yük birimidir. Birer coulombluk iki yük 1 metre arayla durabilseydi aralarındaki kuvvet yaklaşık 9 milyar newton olurdu. Bu yüzden laboratuvar ve ders sorularında yükler mikrocoulomb ya da nanocoulomb düzeyindedir.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Uzaklığı santimetre olarak formüle koymak. Araçta birimi doğru seçerseniz çevirme otomatik yapılır.`,
      `Uzaklığın karesini almayı unutmak.`,
      `Yüklerin işaretini kuvvetin büyüklüğüne taşımak. Büyüklük her zaman pozitiftir; işaret yalnızca itme ya da çekme olduğunu belirler.`,
      `Mikrocoulombu 10<sup>−3</sup> almak; doğrusu 10<sup>−6</sup>'dır.`,
      `İkiden fazla yük olduğunda kuvvetleri sayı olarak toplamak. Kuvvetler vektördür; her çift için ayrı hesaplanıp yönleriyle birlikte toplanmalıdır.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Coulomb yasası, boyutları aralarındaki uzaklığa göre çok küçük olan durgun yükler için geçerlidir. Büyük iletken küreler birbirine yaklaştığında yük dağılımı değişir; hareketli yüklerde manyetik etkiler de devreye girer. Araç iki yük arasındaki kuvvetin büyüklüğünü verir, üç ve daha fazla yükün bileşke kuvvetini hesaplamaz. Sonuçlar eğitim amaçlıdır; yüksek gerilim ve elektrostatik boşalma içeren uygulamalarda uzman görüşü ve ilgili güvenlik kuralları esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Coulomb kuvveti formülü nedir?', `F = k × |q₁ × q₂| ÷ r². k Coulomb sabiti (yaklaşık 9 × 10^9 N·m²/C²), q₁ ve q₂ coulomb cinsinden yükler, r metre cinsinden uzaklıktır.`],
    ['Coulomb sabiti kaçtır?', `Boşlukta yaklaşık 8,99 × 10^9 N·m²/C²'dir. Okul sorularında işlem kolaylığı için 9 × 10^9 alınır. Araç daha duyarlı olan 8,9875517923 × 10^9 değerini kullanır.`],
    ['Kuvvetin itme mi çekme mi olduğu nasıl anlaşılır?', `Yüklerin işaretine bakılır. İkisi de pozitif ya da ikisi de negatifse itme, biri pozitif biri negatifse çekme kuvveti oluşur. Araç bunu "Etkileşim" satırında belirtir.`],
    ['Uzaklık iki katına çıkarsa kuvvet ne olur?', `Kuvvet uzaklığın karesiyle ters orantılı olduğu için dörtte birine düşer. Uzaklık yarıya inerse dört katına çıkar.`],
    ['Sonucum kitaptaki cevaptan neden biraz farklı?', `Büyük olasılıkla kitap k = 9 × 10^9 kullanmıştır. Araçtaki daha duyarlı sabitle sonuç binde bir düzeyinde daha küçük çıkar; örneğin 0,6 N yerine 0,59917 N.`],
    ['Ortamın dielektrik sabiti kuvveti nasıl etkiler?', `Kuvvet, bağıl dielektrik sabitine bölünür. Hava için değer yaklaşık 1 olduğundan fark edilmez; su gibi yüksek dielektrik sabitli ortamlarda kuvvet belirgin biçimde azalır.`],
    ['Büyük yük küçük yüke daha fazla kuvvet uygular mı?', `Hayır. Etki-tepki yasası gereği iki yüke etki eden kuvvetler eşit büyüklükte ve zıt yönlüdür. Yüklerin büyüklüğü farklı olsa da kuvvet ikisi için aynıdır.`],
    ['Girdiğim değerler saklanıyor mu?', `Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.`],
  ],
  related: ['elektrik-alan-hesapla', 'kutle-cekim-kuvveti-hesapla', 'manyetik-kuvvet-hesapla', 'isik-siddeti-mesafe-hesapla', 'bilimsel-gosterim-cevir'],
};
