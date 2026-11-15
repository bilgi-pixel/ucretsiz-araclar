export default {
  slug: 'vektor-hesapla',
  title: 'Vektör Toplama ve Büyüklük Hesaplama',
  h1Tail: 'bileşke, fark, birim vektör',
  pageTitle: 'Vektör Toplama ve Büyüklük Hesaplama – Bileşke ve Birim Vektör',
  description: 'İki ya da üç boyutlu vektörleri bileşenleriyle toplayın ya da çıkarın. Bileşke vektörü, büyüklüğünü, birim vektörünü ve yön açısını anında görün.',
  card: 'Vektörleri bileşenleriyle toplayın ya da çıkarın; bileşkenin büyüklüğünü, birim vektörünü ve yön açısını bulun.',
  category: 'matematik',
  keywords: ['vektör toplama', 'vektör büyüklüğü hesaplama', 'bileşke vektör hesaplama', 'birim vektör bulma', 'vektör çıkarma', 'vektörün normu', 'vektör yön açısı', 'bileşke kuvvet hesaplama'],
  lead: 'Vektörlerin bileşenlerini aralarına boşluk koyarak yazın. Araç iki vektörü toplar ya da çıkarır; <strong>bileşke vektörü</strong>, büyüklüğünü (normunu), birim vektörünü ve iki boyutta x ekseniyle yaptığı açıyı gösterir. Tek vektör yazarsanız yalnızca o vektörün özellikleri hesaplanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'A vektörü', type: 'text', placeholder: 'Örn. 3 4', hint: 'Bileşenleri boşluk ya da noktalı virgülle ayırın; ondalık için virgül kullanabilirsiniz.' },
    { id: 'islem', label: 'İşlem', type: 'select', options: [['topla', 'Toplama (A + B)'], ['cikar', 'Çıkarma (A − B)']] },
    { id: 'b', label: 'B vektörü (isteğe bağlı)', type: 'text', placeholder: 'Örn. 1 2', hint: 'Boş bırakırsanız yalnızca A vektörünün büyüklüğü ve birim vektörü hesaplanır.' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const t = String(s ?? '').replace(/[()\[\]<>]/g, ' ');
      const x = h.nums(t, ad);
      if (x.length < 2) h.err(`"${ad}" için en az iki bileşen yazın ve bileşenleri boşlukla ayırın (örn. 3 4).`);
      if (x.length > 10) h.err(`"${ad}" en fazla 10 bileşenli olabilir.`);
      return x;
    };
    const boy = (x) => Math.sqrt(x.reduce((t, k) => t + k * k, 0));
    const yaz = (x) => '(' + x.map((k) => h.fmt(k, 4)).join('; ') + ')';
    const A = oku(v.a, 'A vektörü');
    const bVar = String(v.b ?? '').trim() !== '';
    const B = bVar ? oku(v.b, 'B vektörü') : null;
    if (B && B.length !== A.length) h.err(`Vektörlerin boyutları aynı olmalı: A ${A.length}, B ${B.length} bileşenli.`);
    const R = B ? A.map((k, i) => (v.islem === 'cikar' ? k - B[i] : k + B[i])) : A.slice();
    const n = boy(R);
    const rows = [
      ['Sonuç vektörü', yaz(R)],
      ['Sonucun büyüklüğü', h.fmt(n, 4)],
      ['Birim vektör', n < 1e-12 ? 'tanımsız (sıfır vektör)' : yaz(R.map((k) => k / n))],
    ];
    if (R.length === 2) rows.push(['Yön açısı (x ekseniyle)', n < 1e-12 ? 'tanımsız' : h.fmt((Math.atan2(R[1], R[0]) * 180) / Math.PI, 4) + '°']);
    rows.push(['|A|', h.fmt(boy(A), 4)]);
    if (B) rows.push(['|B|', h.fmt(boy(B), 4)]);
    return {
      rows,
      note: B ? 'Bileşkenin büyüklüğü, vektörler aynı yönde değilse |A| + |B| toplamından küçüktür.' : 'B vektörü boş bırakıldığı için yalnızca A vektörünün özellikleri hesaplandı.',
    };
  },
  cases: [
    { in: { a: '1 2', islem: 'topla', b: '3 4' }, out: { 'Sonuç vektörü': '(4; 6)', 'Sonucun büyüklüğü': '7,2111', 'Birim vektör': '(0,5547; 0,8321)', 'Yön açısı (x ekseniyle)': '56,3099°', '|A|': '2,2361', '|B|': '5' } },
    { in: { a: '3 4', b: '' }, out: { 'Sonuç vektörü': '(3; 4)', 'Sonucun büyüklüğü': '5', 'Birim vektör': '(0,6; 0,8)', 'Yön açısı (x ekseniyle)': '53,1301°' } },
    { in: { a: '1 2 2', islem: 'topla', b: '2 1 -2' }, out: { 'Sonuç vektörü': '(3; 3; 0)', 'Sonucun büyüklüğü': '4,2426', '|A|': '3', '|B|': '3' } },
    { in: { a: '5; 7', islem: 'cikar', b: '2; 3' }, out: { 'Sonuç vektörü': '(3; 4)', 'Sonucun büyüklüğü': '5' } },
    { in: { a: '2 3 6', b: '' }, out: { 'Sonucun büyüklüğü': '7', 'Birim vektör': '(0,2857; 0,4286; 0,8571)' } },
    { in: { a: '1 2', islem: 'cikar', b: '1 2' }, out: { 'Sonuç vektörü': '(0; 0)', 'Sonucun büyüklüğü': '0', 'Birim vektör': 'tanımsız (sıfır vektör)' } },
    { in: { a: '0 -5', b: '' }, out: { 'Yön açısı (x ekseniyle)': '-90°', 'Birim vektör': '(0; -1)' } },
    { in: { a: '1 2 3', islem: 'topla', b: '4 5' }, error: true },
    { in: { a: '7', b: '' }, error: true },
    { in: { a: '', b: '1 2' }, error: true },
  ],
  howto: [
    '"A vektörü" alanına bileşenleri sırayla, aralarında boşluk bırakarak yazın: iki boyut için <code>3 4</code>, üç boyut için <code>1 2 2</code> gibi.',
    'İkinci bir vektörle işlem yapacaksanız "İşlem" listesinden toplama ya da çıkarmayı seçin ve "B vektörü" alanını aynı sayıda bileşenle doldurun.',
    'Yalnızca tek vektörün büyüklüğünü ve birim vektörünü istiyorsanız B alanını boş bırakın.',
    '"Hesapla" düğmesine basın. Sonuç vektörü, büyüklüğü, birim vektörü ve iki boyutlu vektörlerde yön açısı listelenir.',
  ],
  sections: [
    { h: 'Vektör nedir, bileşen ne demektir?', p: [
      'Yalnızca büyüklüğüyle tanımlanan niceliklere skaler denir; kütle, sıcaklık ve süre buna örnektir. <strong>Vektör</strong> ise hem büyüklüğü hem yönü olan niceliktir: kuvvet, hız, ivme ve yer değiştirme vektörel büyüklüklerdir. 5 newtonluk bir kuvvetin etkisi, hangi yöne uygulandığını bilmeden anlaşılamaz.',
      'Bir vektörü sayılarla ifade etmenin en pratik yolu onu eksenler üzerindeki izdüşümlerine, yani <strong>bileşenlerine</strong> ayırmaktır. Düzlemde A = (3, 4) vektörü x yönünde 3, y yönünde 4 birim ilerlemeyi anlatır. Uzayda üçüncü bir z bileşeni eklenir. Bu sayfadaki araç bileşenlerle çalışır; bu yüzden sonuçlar ölçekli çizime gerek kalmadan elde edilir. Türkçede ondalık ayırıcı virgül olduğu için sonuçlarda bileşenler noktalı virgülle ayrılarak yazılır.',
    ] },
    { h: 'Toplama, çıkarma ve büyüklük formülleri', ul: [
      '<strong>Toplama:</strong> A + B = (a₁ + b₁, a₂ + b₂, a₃ + b₃). Karşılıklı bileşenler toplanır.',
      '<strong>Çıkarma:</strong> A − B = (a₁ − b₁, a₂ − b₂, a₃ − b₃). Bu işlem, A ile B\'nin ters yönlüsünü toplamakla aynıdır.',
      '<strong>Büyüklük (norm):</strong> |A| = √(a₁² + a₂² + a₃²). Pisagor teoreminin genellemesidir.',
      '<strong>Birim vektör:</strong> Vektörün her bileşeni büyüklüğüne bölünür; sonuç aynı yönde ve boyu 1 olan vektördür.',
      '<strong>Yön açısı (iki boyut):</strong> θ = arctan(y ÷ x); açının hangi bölgede olduğu bileşenlerin işaretine göre belirlenir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> A = (1, 2) ve B = (3, 4) vektörlerinin toplamı (1 + 3, 2 + 4) = (4, 6) olur. Bileşkenin büyüklüğü √(16 + 36) = √52 = 7,2111\'dir. Tek tek büyüklükler |A| = √5 = 2,2361 ve |B| = 5 olduğundan toplamları 7,2361 eder; bileşke bundan biraz küçüktür, çünkü vektörler tam olarak aynı yönde değildir. Bileşkenin x ekseniyle yaptığı açı arctan(6 ÷ 4) = 56,3099°, birim vektörü ise (0,5547; 0,8321) bulunur.',
      '<strong>Örnek 2:</strong> Üç boyutta A = (1, 2, 2) ve B = (2, 1, −2) için toplam (3, 3, 0) ve büyüklüğü √18 = 4,2426\'dır. Her iki vektörün boyu 3 olmasına rağmen bileşke 6 değil 4,2426 çıkar; z bileşenleri birbirini götürmüştür.',
      '<strong>Örnek 3:</strong> Tek vektör A = (3, 4) için büyüklük √(9 + 16) = 5, birim vektör (3 ÷ 5, 4 ÷ 5) = (0,6; 0,8) ve yön açısı 53,1301°\'dir.',
    ] },
    { h: 'Büyüklük ve açı verilmişse bileşenler nasıl bulunur?', p: [
      'Fizik sorularında vektör çoğu zaman "yatayla 30° açı yapan 10 N\'luk kuvvet" biçiminde verilir. Bu durumda bileşenler x = büyüklük · cos(açı) ve y = büyüklük · sin(açı) ile bulunur. Örnekteki kuvvet için x = 10 · cos 30° = 8,6603 ve y = 10 · sin 30° = 5 olur. Bu değerleri araca <code>8,6603 5</code> biçiminde yazarak başka bir kuvvetle toplayabilirsiniz.',
      'Açıyı her zaman pozitif x ekseninden saat yönünün tersine ölçün. Batıya ya da güneye bakan vektörlerde bileşenlerden biri ya da ikisi negatif çıkar; işareti atlamak en yaygın hata kaynağıdır.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Bileşke kuvvet:</strong> Bir cisme etki eden kuvvetlerin toplamı, cismin hangi yönde ve ne kadar ivmeleneceğini belirler.',
      '<strong>Bağıl hız:</strong> Akıntılı nehirde karşıya geçen kayığın ya da rüzgârda uçan uçağın yere göre hızı, iki hız vektörünün toplamıdır.',
      '<strong>Yer değiştirme:</strong> Önce 3 km doğuya, sonra 4 km kuzeye yürüyen biri başlangıç noktasından 5 km uzaklaşmıştır; gidilen yol ise 7 km\'dir.',
      '<strong>Bilgisayar grafikleri ve oyun programlama:</strong> Konum, hız ve yön hesaplarının tamamı vektör toplama ve normalleştirme (birim vektöre çevirme) üzerine kuruludur.',
      '<strong>Harita ve navigasyon:</strong> Ardışık hareketlerin toplam etkisi vektör toplamıyla bulunur.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Vektörlerin büyüklüklerini doğrudan toplamak yanlıştır; |A + B| değeri yalnızca vektörler aynı yöndeyse |A| + |B| toplamına eşittir, diğer bütün durumlarda daha küçüktür. Zıt yönlü vektörlerde ise bileşkenin büyüklüğü büyüklüklerin farkına iner. Çıkarma işleminde sıra önemlidir: A − B ile B − A aynı büyüklükte ama zıt yönlüdür.',
      'Araç 2 ile 10 arasında bileşeni olan vektörleri kabul eder ve iki vektörün aynı boyutta olmasını ister. Bileşenleri virgülle ayırmayın; <code>3,4</code> yazımı tek bir ondalık sayı (3,4) olarak okunur. Sıfır vektörün yönü olmadığı için birim vektörü ve yön açısı tanımsızdır. Yön açısı yalnızca iki boyutlu vektörlerde ve −180° ile 180° arasında gösterilir.',
    ] },
  ],
  faq: [
    ['İki vektör nasıl toplanır?', 'Karşılıklı bileşenler toplanır. A = (1, 2) ve B = (3, 4) için A + B = (4, 6) olur. Çizimle yapılırsa uç uca ekleme ya da paralelkenar yöntemi aynı sonucu verir.'],
    ['Vektörün büyüklüğü nasıl hesaplanır?', 'Bileşenlerin kareleri toplanır ve karekökü alınır. (3, 4) vektörünün büyüklüğü √(9 + 16) = 5, (2, 3, 6) vektörünün büyüklüğü √(4 + 9 + 36) = 7\'dir.'],
    ['Birim vektör nedir, nasıl bulunur?', 'Büyüklüğü 1 olan ve yalnızca yön bilgisi taşıyan vektördür. Bir vektörün her bileşeni kendi büyüklüğüne bölünerek bulunur; (3, 4) için birim vektör (0,6; 0,8) olur.'],
    ['Bileşke vektörün büyüklüğü neden büyüklüklerin toplamından küçük çıkıyor?', 'Vektörler yönlü olduğu için farklı yönlerdeki kısımlar birbirini tam olarak desteklemez. Bu durum üçgen eşitsizliğiyle ifade edilir: |A + B| ≤ |A| + |B|. Eşitlik yalnızca vektörler aynı yöndeyken sağlanır.'],
    ['Vektör çıkarma ne anlama gelir?', 'A − B, B\'nin ucundan A\'nın ucuna giden vektördür; bileşenler karşılıklı çıkarılarak bulunur. İki nokta arasındaki yer değiştirme ya da bağıl hız hesaplarında kullanılır.'],
    ['Üçten fazla bileşenli vektör girebilir miyim?', 'Evet, 10 bileşene kadar vektör yazabilirsiniz. Toplama, çıkarma, büyüklük ve birim vektör formülleri her boyutta aynıdır. Yön açısı satırı yalnızca iki boyutlu vektörlerde gösterilir.'],
    ['Bileşenleri hangi biçimde yazmalıyım?', 'Aralarına boşluk ya da noktalı virgül koyarak yazın: 3 4 ya da 3; 4. Ondalıklı bileşenlerde virgül ya da nokta kullanabilirsiniz, örneğin 1,5 2,25. Parantez yazmanız gerekmez.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız vektörler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['skaler-carpim-hesapla', 'vektorel-carpim-hesapla', 'iki-nokta-arasi-uzaklik', 'pisagor-teoremi-hesapla', 'matris-hesapla'],
};
