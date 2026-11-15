export default {
  slug: 'skaler-carpim-hesapla',
  title: 'Skaler (Nokta) Çarpım Hesaplama',
  h1Tail: 'iç çarpım ve aradaki açı',
  pageTitle: 'Skaler (Nokta) Çarpım Hesaplama – İç Çarpım ve Vektörler Arası Açı',
  description: 'İki vektörün skaler (nokta) çarpımını hesaplayın. Vektörlerin büyüklüklerini, aralarındaki açıyı, izdüşümü ve dik olup olmadıklarını tek adımda görün.',
  card: 'İki vektörün skaler (nokta) çarpımını, aralarındaki açıyı, izdüşümü ve diklik durumunu hesaplayın.',
  category: 'matematik',
  keywords: ['skaler çarpım hesaplama', 'nokta çarpım hesaplama', 'iç çarpım hesaplama', 'iki vektör arasındaki açı', 'vektörler dik mi', 'dot product hesaplama', 'vektör izdüşümü hesaplama'],
  lead: 'İki vektörün bileşenlerini yazın; araç <strong>skaler çarpımı</strong> (nokta çarpım, iç çarpım) hesaplar, vektörler arasındaki açıyı bulur ve vektörlerin birbirine dik olup olmadığını söyler.',
  button: 'Hesapla',
  inputs: [
    { id: 'a', label: 'A vektörü', type: 'text', placeholder: 'Örn. 1 2 3', hint: 'Bileşenleri boşluk ya da noktalı virgülle ayırın.' },
    { id: 'b', label: 'B vektörü', type: 'text', placeholder: 'Örn. 4 -5 6', hint: 'A ile aynı sayıda bileşen yazın.' },
  ],
  compute(v, h) {
    const oku = (s, ad) => {
      const x = h.nums(String(s ?? '').replace(/[()\[\]<>]/g, ' '), ad);
      if (x.length < 2) h.err(`"${ad}" için en az iki bileşen yazın ve bileşenleri boşlukla ayırın (örn. 3 4).`);
      if (x.length > 10) h.err(`"${ad}" en fazla 10 bileşenli olabilir.`);
      return x;
    };
    const A = oku(v.a, 'A vektörü'), B = oku(v.b, 'B vektörü');
    if (A.length !== B.length) h.err(`Vektörlerin boyutları aynı olmalı: A ${A.length}, B ${B.length} bileşenli.`);
    const ic = A.reduce((t, k, i) => t + k * B[i], 0);
    const na = Math.sqrt(A.reduce((t, k) => t + k * k, 0));
    const nb = Math.sqrt(B.reduce((t, k) => t + k * k, 0));
    const sifir = na < 1e-12 || nb < 1e-12;
    const cos = sifir ? 0 : Math.max(-1, Math.min(1, ic / (na * nb)));
    const aci = (Math.acos(cos) * 180) / Math.PI;
    let durum;
    if (sifir) durum = 'Vektörlerden biri sıfır vektör; açı tanımsız';
    else if (Math.abs(cos) < 1e-9) durum = 'Vektörler birbirine dik';
    else if (cos > 1 - 1e-9) durum = 'Vektörler paralel ve aynı yönlü';
    else if (cos < -1 + 1e-9) durum = 'Vektörler paralel ve zıt yönlü';
    else durum = cos > 0 ? 'Aradaki açı dar' : 'Aradaki açı geniş';
    return {
      rows: [
        ['Skaler çarpım (A · B)', h.fmt(ic, 4)],
        ['Aradaki açı', sifir ? 'tanımsız' : h.fmt(aci, 4) + '°'],
        ['cos θ', sifir ? 'tanımsız' : h.fmt(cos, 4)],
        ['|A|', h.fmt(na, 4)],
        ['|B|', h.fmt(nb, 4)],
        ['A\'nın B üzerindeki izdüşümü', nb < 1e-12 ? 'tanımsız' : h.fmt(ic / nb, 4)],
        ['Durum', durum],
      ],
      note: 'Açı 0° ile 180° arasında verilir. İzdüşüm, A vektörünün B doğrultusundaki işaretli uzunluğudur.',
    };
  },
  cases: [
    { in: { a: '1 2 3', b: '4 -5 6' }, out: { 'Skaler çarpım (A · B)': '12', 'Aradaki açı': '68,5624°', 'cos θ': '0,3655', '|A|': '3,7417', '|B|': '8,775', 'A\'nın B üzerindeki izdüşümü': '1,3675', 'Durum': 'Aradaki açı dar' } },
    { in: { a: '1 0', b: '0 1' }, out: { 'Skaler çarpım (A · B)': '0', 'Aradaki açı': '90°', 'Durum': 'Vektörler birbirine dik' } },
    { in: { a: '1 2 3', b: '4 5 6' }, out: { 'Skaler çarpım (A · B)': '32', 'Aradaki açı': '12,9332°', 'cos θ': '0,9746' } },
    { in: { a: '3 4', b: '3 4' }, out: { 'Skaler çarpım (A · B)': '25', 'Aradaki açı': '0°', 'Durum': 'Vektörler paralel ve aynı yönlü' } },
    { in: { a: '1 2', b: '-2 -4' }, out: { 'Skaler çarpım (A · B)': '-10', 'Aradaki açı': '180°', 'cos θ': '-1', 'Durum': 'Vektörler paralel ve zıt yönlü' } },
    { in: { a: '1; 2', b: '3; 4' }, out: { 'Skaler çarpım (A · B)': '11', 'Aradaki açı': '10,3048°', 'A\'nın B üzerindeki izdüşümü': '2,2' } },
    { in: { a: '2 -1 0', b: '-3 0 5' }, out: { 'Skaler çarpım (A · B)': '-6', 'Durum': 'Aradaki açı geniş' } },
    { in: { a: '0 0', b: '1 2' }, out: { 'Skaler çarpım (A · B)': '0', 'Aradaki açı': 'tanımsız' } },
    { in: { a: '1 2 3', b: '4 5' }, error: true },
    { in: { a: '1 2', b: '' }, error: true },
  ],
  howto: [
    '"A vektörü" alanına birinci vektörün bileşenlerini aralarında boşluk bırakarak yazın, örneğin <code>1 2 3</code>.',
    '"B vektörü" alanına ikinci vektörü aynı sayıda bileşenle yazın, örneğin <code>4 -5 6</code>.',
    '"Hesapla" düğmesine basın. İlk satırda skaler çarpım, ardından aradaki açı, kosinüs değeri, büyüklükler ve izdüşüm görünür.',
    '"Durum" satırından vektörlerin dik, paralel ya da aralarındaki açının dar mı geniş mi olduğunu okuyun.',
  ],
  sections: [
    { h: 'Skaler çarpım nedir?', p: [
      'Skaler çarpım, iki vektörü alıp sonuç olarak tek bir sayı veren işlemdir. İşlem işareti olarak nokta kullanıldığı için <strong>nokta çarpım</strong>, doğrusal cebirde ise <strong>iç çarpım</strong> adıyla da anılır. Sonucun vektör değil sayı (skaler) olması, onu vektörel çarpımdan ayıran temel özelliktir.',
      'Bu sayı, iki vektörün birbirine ne kadar "aynı yöne baktığının" ölçüsüdür. Aynı yöne bakan vektörlerde sonuç pozitif ve büyüktür, birbirine dik vektörlerde sıfırdır, zıt yönlere bakan vektörlerde negatiftir. İşlem iki boyutta, üç boyutta ve daha yüksek boyutlarda aynı kuralla tanımlanır; bu yüzden araç 10 bileşene kadar vektörleri kabul eder.',
    ] },
    { h: 'İki formül: bileşenlerle ve açıyla', p: [
      'Skaler çarpımın birbirine eşit iki ifadesi vardır. Bileşenler biliniyorsa karşılıklı bileşenler çarpılıp toplanır: <strong>A · B = a₁b₁ + a₂b₂ + a₃b₃</strong>. Büyüklükler ve aradaki açı biliniyorsa <strong>A · B = |A| · |B| · cos θ</strong> kullanılır.',
      'Bu iki ifade eşitlendiğinde vektörler arasındaki açı bulunur: <strong>cos θ = (A · B) ÷ (|A| · |B|)</strong>. Araç önce bileşenlerden skaler çarpımı ve büyüklükleri hesaplar, sonra bu bağıntıyla açıyı 0° ile 180° arasında verir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'A = (1, 2, 3) ve B = (4, −5, 6) olsun. Skaler çarpım 1 · 4 + 2 · (−5) + 3 · 6 = 4 − 10 + 18 = <strong>12</strong> eder. Büyüklükler |A| = √(1 + 4 + 9) = √14 = 3,7417 ve |B| = √(16 + 25 + 36) = √77 = 8,775\'tir.',
      'Kosinüs değeri 12 ÷ (3,7417 · 8,775) = 0,3655 çıkar. Buradan açı arccos(0,3655) = <strong>68,5624°</strong> bulunur. Sonuç pozitif olduğundan açı dardır. A vektörünün B doğrultusundaki izdüşümü ise 12 ÷ 8,775 = 1,3675 birimdir.',
      'İkinci bir örnek: A = (1, 0) ve B = (0, 1) için çarpım 1 · 0 + 0 · 1 = 0\'dır. Sonucun sıfır çıkması bu iki vektörün birbirine dik olduğunu gösterir; nitekim bunlar x ve y eksenlerinin birim vektörleridir.',
    ] },
    { h: 'Sonucun işareti ne söyler?', ul: [
      '<strong>A · B > 0:</strong> Aradaki açı 90°\'den küçüktür (dar açı); vektörler genel olarak aynı tarafa bakar.',
      '<strong>A · B = 0:</strong> Vektörler birbirine diktir (ortogonal). Diklik kontrolünün en hızlı yolu budur.',
      '<strong>A · B < 0:</strong> Aradaki açı 90°\'den büyüktür (geniş açı); vektörler birbirine karşı çalışır.',
      '<strong>A · B = |A| · |B|:</strong> Vektörler paralel ve aynı yönlüdür, açı 0°\'dir.',
      '<strong>A · B = −|A| · |B|:</strong> Vektörler paralel ve zıt yönlüdür, açı 180°\'dir.',
    ] },
    { h: 'İzdüşüm ve fizikteki iş kavramı', p: [
      'A vektörünün B doğrultusundaki skaler izdüşümü, A\'nın B yönünde ne kadar "ilerlediğini" verir ve (A · B) ÷ |B| ile hesaplanır. Sonuç negatifse A, B\'nin tersi yönünde bileşene sahiptir. Bu kavram bir kuvvetin belirli bir doğrultudaki etkili kısmını bulmak için kullanılır.',
      'Fizikte sabit bir kuvvetin yaptığı <strong>iş</strong>, kuvvet vektörü ile yer değiştirme vektörünün skaler çarpımıdır: W = F · d = F · d · cos θ. Yere paralel 10 metrelik yolda, yatayla 60° açı yapan 20 N\'luk kuvvet 20 · 10 · cos 60° = 100 joule iş yapar. Kuvvet harekete dikse cos 90° = 0 olduğundan iş yapılmaz; ağır bir çantayı yatay yolda taşırken yer çekimine karşı iş yapılmamasının nedeni budur.',
    ] },
    { h: 'Diğer kullanım alanları', p: [
      'Bilgisayar grafiklerinde bir yüzeyin ne kadar aydınlanacağı, yüzey normali ile ışık yönünün skaler çarpımıyla belirlenir. Veri biliminde ve arama sistemlerinde iki metnin ya da iki kullanıcının benzerliği, bunları temsil eden vektörler arasındaki açının kosinüsüyle ölçülür; bu ölçüye kosinüs benzerliği denir ve araçtaki "cos θ" satırı tam olarak bu değerdir. Analitik geometride iki doğrunun dik olup olmadığı, doğrultu vektörlerinin skaler çarpımının sıfır olup olmadığına bakılarak kontrol edilir.',
    ] },
    { h: 'Özellikler, hatalar ve sınırlar', p: [
      'Skaler çarpımda sıra önemli değildir: A · B = B · A. Toplama üzerine dağılır: A · (B + C) = A · B + A · C. Bir vektörün kendisiyle çarpımı büyüklüğünün karesine eşittir: A · A = |A|².',
      'En sık yapılan hata, sonucu vektör olarak yazmaktır; karşılıklı bileşenler çarpıldıktan sonra mutlaka toplanmalıdır. İkinci yaygın hata negatif bileşenlerde işareti kaybetmektir. Araçta bileşenleri virgülle ayırmayın, çünkü virgül ondalık ayırıcı olarak okunur. Vektörlerden biri sıfır vektörse açı ve kosinüs tanımsızdır; araç bu durumda yalnızca skaler çarpımı (sıfır) gösterir. Sonuçlar dört ondalık basamağa yuvarlanır.',
    ] },
  ],
  faq: [
    ['Skaler çarpım nasıl hesaplanır?', 'Karşılıklı bileşenler çarpılır ve çarpımlar toplanır. (1, 2, 3) ile (4, −5, 6) için 1 · 4 + 2 · (−5) + 3 · 6 = 12 bulunur. Sonuç bir vektör değil, tek bir sayıdır.'],
    ['Skaler çarpım sıfırsa ne anlama gelir?', 'Sıfırdan farklı iki vektörün skaler çarpımı sıfırsa vektörler birbirine diktir; aralarındaki açı 90°\'dir. Örneğin (2, 3) ile (−3, 2) vektörlerinin çarpımı −6 + 6 = 0 olduğundan bu vektörler diktir.'],
    ['İki vektör arasındaki açı nasıl bulunur?', 'Skaler çarpım, büyüklüklerin çarpımına bölünür ve sonucun arkkosinüsü alınır: θ = arccos[(A · B) ÷ (|A| · |B|)]. Araç bu hesabı kendiliğinden yapar ve açıyı derece olarak verir.'],
    ['Skaler çarpım negatif olabilir mi?', 'Evet. Vektörler arasındaki açı 90°\'den büyükse kosinüs negatif olur ve çarpım negatif çıkar. Tam zıt yönlü vektörlerde sonuç büyüklüklerin çarpımının negatifidir.'],
    ['Skaler çarpım ile vektörel çarpım arasındaki fark nedir?', 'Skaler çarpımın sonucu bir sayıdır ve cos θ ile orantılıdır; her boyutta tanımlıdır. Vektörel çarpımın sonucu ise iki vektöre de dik yeni bir vektördür, sin θ ile orantılıdır ve üç boyutlu uzayda tanımlanır.'],
    ['Nokta çarpım, iç çarpım ve skaler çarpım aynı şey midir?', 'Bu sayfadaki anlamıyla evet. Üçü de bileşenleri gerçek sayı olan vektörler için aynı işlemi ifade eder; farklı adlar farklı ders ve kaynak geleneklerinden gelir.'],
    ['İki boyutlu ve üç boyutlu vektörleri birlikte çarpabilir miyim?', 'Hayır, iki vektörün bileşen sayısı eşit olmalıdır. İki boyutlu bir vektörü üç boyutlu bir vektörle çarpmak istiyorsanız eksik olan üçüncü bileşeni 0 olarak yazabilirsiniz.'],
    ['Yazdığım vektörler bir yere kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda gerçekleşir; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['vektorel-carpim-hesapla', 'vektor-hesapla', 'kosinus-hesapla', 'ters-trigonometri-hesapla', 'matris-hesapla'],
};
