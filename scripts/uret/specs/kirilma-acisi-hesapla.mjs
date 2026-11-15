export default {
  slug: 'kirilma-acisi-hesapla',
  title: 'Kırılma Açısı (Snell Yasası) Hesaplama',
  h1Tail: 'n₁ · sin θ₁ = n₂ · sin θ₂',
  pageTitle: 'Kırılma Açısı Hesaplama – Snell Yasası, Kritik Açı ve Tam Yansıma',
  description: 'Snell yasasıyla ışığın kırılma açısını hesaplayın. İki ortamın kırılma indisini ve gelme açısını girin; kırılma açısı, sapma, kritik açı ve tam yansıma durumu gösterilir.',
  card: 'Kırılma indisleri ve gelme açısından ışığın kırılma açısını bulun; kritik açıyı ve tam yansıma olup olmadığını görün.',
  category: 'bilim',
  keywords: ['kırılma açısı hesaplama', 'snell yasası', 'kırılma indisi', 'kritik açı hesaplama', 'tam yansıma', 'sınır açısı', 'ışığın kırılması formülü', 'snell kanunu'],
  lead: 'Işık bir saydam ortamdan diğerine geçerken doğrultu değiştirir. Araç, <strong>n<sub>1</sub> · sin θ<sub>1</sub> = n<sub>2</sub> · sin θ<sub>2</sub></strong> eşitliğiyle kırılma açısını bulur; çok yoğun ortamdan az yoğuna geçişte kritik açıyı ve tam yansımayı da denetler.',
  button: 'Hesapla',
  inputs: [
    { id: 'n1', label: 'Işığın geldiği ortamın kırılma indisi (n₁)', type: 'number', value: '1', hint: 'Hava yaklaşık 1; su yaklaşık 1,33; cam yaklaşık 1,5.' },
    { id: 'n2', label: 'Işığın geçtiği ortamın kırılma indisi (n₂)', type: 'number', value: '1,33' },
    { id: 'aci', label: 'Gelme açısı (°)', type: 'number', placeholder: 'Örn. 45', hint: 'Yüzeyin normaliyle (dikmeyle) yapılan açı; 0 ile 90 arasında.' },
  ],
  compute(v, h) {
    const n1 = h.num(v.n1, 'n₁');
    const n2 = h.num(v.n2, 'n₂');
    if (n1 < 1 || n2 < 1) h.err('Kırılma indisi 1\'den küçük olamaz (boşluk için 1\'dir).');
    const a = h.num(v.aci, 'Gelme açısı');
    if (a < 0 || a >= 90) h.err('Gelme açısı 0 (dahil) ile 90 (hariç) derece arasında olmalı; açı yüzeyle değil normalle ölçülür.');
    const D = 180 / Math.PI;
    const s = n1 * Math.sin(a / D) / n2;
    const kritik = n1 > n2 ? Math.asin(n2 / n1) * D : null;
    const kritikMetin = kritik === null ? 'Yok (tam yansıma yalnızca n₁ > n₂ iken olur)' : h.fmt(kritik, 4) + '°';
    const hiz = (n) => h.fmt(299792.458 / n, 0) + ' km/s';
    if (s > 1 + 1e-12) {
      return {
        rows: [
          ['Kırılma açısı', 'Kırılma yok (tam yansıma)'],
          ['Yansıma açısı', h.fmt(a, 4) + '°'],
          ['Kritik açı', kritikMetin],
          ['Durum', 'Gelme açısı kritik açıdan büyük; ışık ikinci ortama geçmez'],
        ],
        note: 'Tam yansımada ışığın tamamı geldiği ortama, gelme açısına eşit açıyla geri döner.',
      };
    }
    const b = Math.asin(Math.min(1, s)) * D;
    let durum;
    if (Math.abs(n1 - n2) < 1e-12 || a === 0) durum = 'Işık doğrultu değiştirmez';
    else if (n2 > n1) durum = 'Işık normale yaklaşır';
    else durum = 'Işık normalden uzaklaşır';
    return {
      rows: [
        ['Kırılma açısı', h.fmt(b, 4) + '°'],
        ['Sapma açısı', h.fmt(Math.abs(a - b), 4) + '°'],
        ['Kritik açı', kritikMetin],
        ['Durum', durum],
        ['Birinci ortamda ışık hızı', hiz(n1)],
        ['İkinci ortamda ışık hızı', hiz(n2)],
      ],
      note: 'Açılar yüzeyin normaline göre ölçülür. Kırılma indisi ışığın rengine (dalga boyuna) göre az da olsa değişir.',
    };
  },
  cases: [
    { in: { n1: '1', n2: '1,5', aci: '30' }, out: { 'Kırılma açısı': '19,4712°', 'Sapma açısı': '10,5288°', 'Durum': 'Işık normale yaklaşır' } },
    { in: { n1: '1,5', n2: '1', aci: '45' }, out: { 'Kırılma açısı': 'Kırılma yok (tam yansıma)', 'Kritik açı': '41,8103°' } },
    { in: { n1: '1', n2: '1,33', aci: '45' }, out: { 'Kırılma açısı': '32,1176°', 'İkinci ortamda ışık hızı': '225.408 km/s' } },
    { in: { n1: '1,5', n2: '1', aci: '30' }, out: { 'Kırılma açısı': '48,5904°', 'Kritik açı': '41,8103°', 'Durum': 'Işık normalden uzaklaşır' } },
    { in: { n1: '1,33', n2: '1', aci: '30' }, out: { 'Kırılma açısı': '41,6823°', 'Kritik açı': '48,7535°' } },
    { in: { n1: '1', n2: '1,5', aci: '0' }, out: { 'Kırılma açısı': '0°', 'Durum': 'Işık doğrultu değiştirmez' } },
    { in: { n1: '1', n2: '2,42', aci: '45' }, out: { 'Kırılma açısı': '16,9893°' } },
    { in: { n1: '1', n2: '1,5', aci: '90' }, error: true },
    { in: { n1: '0,5', n2: '1,5', aci: '30' }, error: true },
    { in: { n1: '1', n2: '1,5', aci: '' }, error: true },
  ],
  howto: [
    'Işığın geldiği ortamın kırılma indisini ilk alana yazın. Hava için 1, su için yaklaşık 1,33, cam için yaklaşık 1,5 kullanılır.',
    'Işığın geçeceği ikinci ortamın kırılma indisini ikinci alana yazın.',
    'Gelme açısını derece olarak girin. Açı, ışının yüzeyle değil yüzeye dik çizilen normalle yaptığı açıdır.',
    '"Hesapla" düğmesine basın. Kırılma açısı, ışının ne kadar saptığı, varsa kritik açı ve ışığın normale yaklaşıp uzaklaştığı bilgisi listelenir. Tam yansıma oluşuyorsa araç bunu açıkça belirtir.',
  ],
  sections: [
    { h: 'Işık neden kırılır?', p: [
      'Işık farklı saydam ortamlarda farklı hızlarla yayılır. Bir ortamdan diğerine eğik açıyla geçerken hızı değiştiği için doğrultusu da değişir; bu olaya <strong>kırılma</strong> denir. Bardaktaki kaşığın kırık görünmesi, havuzun olduğundan sığ görünmesi ve merceklerin ışığı toplaması kırılmanın sonuçlarıdır.',
      'Bir ortamın ışığı ne kadar yavaşlattığını <strong>kırılma indisi</strong> (n) gösterir: n = c ÷ v. Burada c ışığın boşluktaki hızı, v ortamdaki hızıdır. Boşluğun indisi tam 1\'dir; hava buna çok yakındır ve hesaplarda 1 alınır. İndisi büyük olan ortama optik bakımdan "çok yoğun", küçük olana "az yoğun" denir. Araç her iki ortam için ışık hızını da sonuçlarda gösterir.',
    ] },
    { h: 'Snell yasası', p: [
      'Gelme açısı ile kırılma açısı arasındaki ilişkiyi Snell yasası verir: <strong>n<sub>1</sub> · sin θ<sub>1</sub> = n<sub>2</sub> · sin θ<sub>2</sub></strong>. θ<sub>1</sub> gelme açısı, θ<sub>2</sub> kırılma açısıdır ve ikisi de yüzeyin normalinden ölçülür. Kırılma açısı buradan θ<sub>2</sub> = arcsin(n<sub>1</sub> · sin θ<sub>1</sub> ÷ n<sub>2</sub>) olarak bulunur.',
      'Yasadan iki pratik kural çıkar. Işık az yoğun ortamdan çok yoğun ortama geçerken (örneğin havadan cama) <strong>normale yaklaşır</strong>; kırılma açısı gelme açısından küçük olur. Çok yoğun ortamdan az yoğuna geçerken (camdan havaya) <strong>normalden uzaklaşır</strong>. Yüzeye dik gelen, yani gelme açısı 0° olan ışın ise kırılmadan yoluna devam eder; yalnızca hızı değişir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 (havadan cama):</strong> n<sub>1</sub> = 1, n<sub>2</sub> = 1,5 ve gelme açısı 30°. sin θ<sub>2</sub> = 1 × sin 30° ÷ 1,5 = 0,5 ÷ 1,5 = 0,3333; θ<sub>2</sub> ≈ 19,4712°. Işın normale yaklaşmış ve 10,5288° sapmıştır.',
      '<strong>Örnek 2 (havadan suya):</strong> n<sub>2</sub> = 1,33 ve gelme açısı 45° için sin θ<sub>2</sub> = 0,7071 ÷ 1,33 ≈ 0,5317; θ<sub>2</sub> ≈ 32,1176°. Sudaki ışık hızı yaklaşık 225.408 km/s\'dir.',
      '<strong>Örnek 3 (camdan havaya):</strong> n<sub>1</sub> = 1,5, n<sub>2</sub> = 1 ve gelme açısı 30°. sin θ<sub>2</sub> = 1,5 × 0,5 = 0,75; θ<sub>2</sub> ≈ 48,5904°. Işın normalden uzaklaşmıştır. Bu geçiş için kritik açı 41,8103°\'dir.',
      '<strong>Örnek 4 (tam yansıma):</strong> Aynı cam-hava yüzeyine ışın 45° ile gelirse sin θ<sub>2</sub> = 1,5 × 0,7071 ≈ 1,06 çıkar. Sinüs 1\'den büyük olamayacağı için kırılma gerçekleşmez; ışın 45° ile cama geri yansır.',
    ] },
    { h: 'Kritik açı ve tam yansıma', p: [
      'Işık çok yoğun ortamdan az yoğun ortama geçerken gelme açısı büyüdükçe kırılma açısı 90°\'ye yaklaşır. Kırılma açısının tam 90° olduğu gelme açısına <strong>kritik açı</strong> (sınır açısı) denir ve sin θ<sub>k</sub> = n<sub>2</sub> ÷ n<sub>1</sub> ile bulunur. Gelme açısı bundan büyük olursa ışık ikinci ortama hiç geçemez, tamamı geri yansır. Buna <strong>tam yansıma</strong> denir.',
      'Tam yansıma yalnızca n<sub>1</sub> > n<sub>2</sub> iken mümkündür; havadan suya ya da cama giden ışıkta hiçbir açıda oluşmaz. Fiber optik kablolarda ışığın kablo boyunca kayıpsıza yakın ilerlemesi, dürbünlerdeki prizmalar ve pırlantanın parıltısı tam yansımaya dayanır. Kritik açı su-hava için yaklaşık 48,75°, cam-hava (n = 1,5) için yaklaşık 41,81°, elmas-hava (n = 2,42) için yaklaşık 24,41°\'dir.',
    ] },
    { h: 'Yaygın kırılma indisleri (yaklaşık)', ul: [
      '<strong>Boşluk:</strong> 1 (tanım gereği)',
      '<strong>Hava:</strong> yaklaşık 1,0003; hesaplarda 1 alınır',
      '<strong>Su:</strong> yaklaşık 1,33',
      '<strong>Buz:</strong> yaklaşık 1,31',
      '<strong>Pencere camı:</strong> yaklaşık 1,5 (türüne göre 1,45–1,9 arasında değişir)',
      '<strong>Elmas:</strong> yaklaşık 2,42',
    ], p: [
      'Bu değerler görünür ışığın orta bölgesi için tipik yaklaşık değerlerdir. Gerçek indis malzemenin bileşimine, sıcaklığa ve ışığın dalga boyuna göre değişir; ödev ya da deneyde size verilen değeri kullanın.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık yapılan hata açıyı yüzeyle ölçmektir. Soruda "ışın yüzeyle 30° açı yapıyor" deniyorsa gelme açısı 90 − 30 = 60°\'dir. İkinci hata ortamların sırasını karıştırmaktır: n<sub>1</sub> her zaman ışığın geldiği, n<sub>2</sub> geçtiği ortamdır. Üçüncüsü, tam yansıma sınırındaki açılarda yuvarlama yüzünden sonucun beklenenden farklı görünmesidir; kritik açıya çok yakın değerlerde kırılma açısı 90°\'ye hızla yaklaşır.',
      'Araç tek renkli ışık ve düzgün, düz bir ara yüzey varsayar. Beyaz ışıkta her rengin indisi biraz farklı olduğundan renkler ayrışır (prizmadaki gökkuşağı); bu etki hesaba katılmaz. Kırılan ışıkla birlikte yüzeyden her zaman bir miktar kısmi yansıma da olur; araç yansıyan ve kırılan ışığın şiddet oranını vermez.',
    ] },
  ],
  faq: [
    ['Kırılma açısı nasıl hesaplanır?', 'Snell yasasıyla: sin θ₂ = n₁ · sin θ₁ ÷ n₂. Havadan (n = 1) cama (n = 1,5) 30° ile gelen ışının kırılma açısı yaklaşık 19,4712°\'dir.'],
    ['Kırılma indisi nedir?', 'Işığın boşluktaki hızının o ortamdaki hızına oranıdır. İndis büyüdükçe ışık ortamda daha yavaş ilerler. Suyun indisi yaklaşık 1,33, camınki yaklaşık 1,5\'tir.'],
    ['Kritik açı nasıl bulunur?', 'sin θ = n₂ ÷ n₁ eşitliğinden bulunur ve yalnızca ışık çok yoğun ortamdan az yoğuna geçerken tanımlıdır. Camdan (1,5) havaya geçişte kritik açı yaklaşık 41,81°\'dir.'],
    ['Tam yansıma ne zaman olur?', 'Işık çok yoğun ortamdan az yoğun ortama, kritik açıdan büyük bir gelme açısıyla geldiğinde olur. Bu durumda ışığın tamamı geldiği ortama geri yansır.'],
    ['Işık normale ne zaman yaklaşır?', 'Az yoğun ortamdan çok yoğun ortama geçerken, yani n₂ > n₁ olduğunda normale yaklaşır. Tersi durumda normalden uzaklaşır.'],
    ['Dik gelen ışın kırılır mı?', 'Hayır. Gelme açısı 0° ise kırılma açısı da 0°\'dir; ışın doğrultu değiştirmeden geçer. Yalnızca hızı ve dalga boyu değişir.'],
    ['Gelme açısını yüzeyle mi normalle mi ölçmeliyim?', 'Normalle, yani yüzeye dik çizilen doğruyla. Açı yüzeye göre verilmişse 90\'dan çıkararak gelme açısını bulun.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz indis ve açı değerleri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['mercek-denklemi-hesapla', 'dalga-boyu-frekans-hesapla', 'foton-enerjisi-hesapla', 'isik-siddeti-mesafe-hesapla'],
};
