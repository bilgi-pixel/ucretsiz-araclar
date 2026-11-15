export default {
  slug: 'n-dereceden-kok-hesapla',
  title: 'N. Dereceden Kök Hesaplama',
  h1Tail: 'ⁿ√x',
  pageTitle: 'N. Dereceden Kök Hesaplama – 4., 5. ve Daha Yüksek Dereceden Kök Alma',
  description: 'Bir sayının istediğiniz dereceden kökünü hesaplayın: 4. kök, 5. kök, 10. kök ve ötesi. Negatif sayı kuralını uygular, sağlamayı ve tam kök kontrolünü gösterir.',
  card: 'Bir sayının dilediğiniz dereceden kökünü alın; tek ve çift derece kuralları, sağlama ve tam kök kontrolüyle.',
  category: 'matematik',
  keywords: ['n. dereceden kök', 'kök hesaplama', '4. dereceden kök', '5. dereceden kök', 'dördüncü kök', 'kök alma', 'kök derecesi', 'üslü sayıdan köke çevirme', 'yüksek dereceden kök'],
  lead: 'Sayıyı ve kökün derecesini yazın; araç <strong>n. dereceden kökü</strong>, yani n kez kendisiyle çarpıldığında o sayıyı veren değeri hesaplasın. Derece çiftse ikinci (negatif) kök de gösterilir; derece tekse negatif sayıların kökü de alınır.',
  button: 'Hesapla',
  inputs: [
    { id: 'x', label: 'Sayı (x) – kök içi', type: 'number', placeholder: 'Örn. 32' },
    { id: 'n', label: 'Kök derecesi (n)', type: 'number', placeholder: 'Örn. 5', hint: '2 ile 1000 arasında tam sayı' },
  ],
  compute(v, h) {
    const x = h.num(v.x, 'Sayı (x)');
    const n = h.int(v.n, 'Kök derecesi (n)');
    if (n < 2) h.err('Kök derecesi en az 2 olmalı (2 karekök, 3 küp kök demektir).');
    if (n > 1000) h.err('Kök derecesi en fazla 1000 olabilir.');
    if (Math.abs(x) > 1e300) h.err('Sayı çok büyük; daha küçük bir değer yazın.');
    const cift = n % 2 === 0;
    if (x < 0 && cift) h.err(`Negatif bir sayının ${n}. dereceden (çift dereceli) gerçek kökü yoktur. Pozitif bir sayı ya da tek bir derece yazın.`);
    let r = Math.sign(x) * Math.pow(Math.abs(x), 1 / n);
    // Kayan nokta artığını temizle: kısa ondalıklı aday tam sağlıyorsa onu kullan
    const aday = Number(r.toFixed(9));
    if (Math.abs(Math.pow(aday, n) - x) <= 1e-12 * Math.max(1, Math.abs(x))) r = aday;
    const tamKok = Number.isInteger(x) && Number.isInteger(r);
    const par = (t) => (t < 0 ? `(${h.fmt(t, 0)})` : h.fmt(t, 0));
    const ad = n === 2 ? 'Karekök' : n === 3 ? 'Küp kök' : `${n}. dereceden kök`;
    const rows = [
      ['Kök değeri', h.fmt(r, 8)],
      ['İşlem', `${ad}: ${x < 0 ? '(' + h.fmt(x, 10) + ')' : h.fmt(x, 10)}^(1/${n})`],
      ['Sağlama (sonucun n. kuvveti)', h.sig(Math.pow(r, n), 9)],
      ['Tam kök mü?', tamKok ? `Evet, ${par(r)}^${n} = ${h.fmt(x, 0)}` : 'Hayır'],
    ];
    let note;
    if (cift && x > 0) {
      rows.push(['İkinci gerçek kök', h.fmt(-r, 8)]);
      note = 'Derece çift olduğu için karşıt işaretli sayı da aynı kuvveti verir; kök işaretinin değeri ise pozitif olan köktür.';
    } else if (x < 0) {
      note = 'Derece tek olduğu için negatif sayının kökü tanımlıdır ve negatiftir.';
    } else if (x === 0) {
      note = 'Sıfırın her dereceden kökü sıfırdır.';
    } else {
      note = 'Derece tek olduğu için tek bir gerçek kök vardır.';
    }
    if (!tamKok && r !== aday) note += ' Sonuç sekiz ondalık basamağa yuvarlanmıştır.';
    return { rows, note };
  },
  cases: [
    { in: { x: '32', n: '5' }, out: { 'Kök değeri': '2', 'İşlem': '5. dereceden kök: 32^(1/5)', 'Sağlama (sonucun n. kuvveti)': '32', 'Tam kök mü?': 'Evet, 2^5 = 32' } },
    { in: { x: '81', n: '4' }, out: { 'Kök değeri': '3', 'Tam kök mü?': 'Evet, 3^4 = 81', 'İkinci gerçek kök': '-3' } },
    { in: { x: '-27', n: '3' }, out: { 'Kök değeri': '-3', 'İşlem': 'Küp kök: (-27)^(1/3)', 'Tam kök mü?': 'Evet, (-3)^3 = -27' } },
    { in: { x: '2', n: '2' }, out: { 'Kök değeri': '1,41421356', 'İşlem': 'Karekök: 2^(1/2)', 'Tam kök mü?': 'Hayır', 'İkinci gerçek kök': '-1,41421356' } },
    { in: { x: '1024', n: '10' }, out: { 'Kök değeri': '2', 'Tam kök mü?': 'Evet, 2^10 = 1.024' } },
    { in: { x: '0,0625', n: '4' }, out: { 'Kök değeri': '0,5', 'Sağlama (sonucun n. kuvveti)': '0,0625', 'Tam kök mü?': 'Hayır' } },
    { in: { x: '2', n: '12' }, out: { 'Kök değeri': '1,05946309' } },
    { in: { x: '10', n: '3' }, out: { 'Kök değeri': '2,15443469', 'Sağlama (sonucun n. kuvveti)': '10' } },
    { in: { x: '0', n: '7' }, out: { 'Kök değeri': '0', 'Tam kök mü?': 'Evet, 0^7 = 0' } },
    { in: { x: '-16', n: '4' }, error: true },
    { in: { x: '16', n: '0' }, error: true },
    { in: { x: '16', n: '2,5' }, error: true },
    { in: { x: '', n: '3' }, error: true },
  ],
  howto: [
    '"Sayı (x)" alanına kök içindeki sayıyı yazın. Ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Kök derecesi (n)" alanına kökün derecesini yazın: karekök için 2, küp kök için 3, dördüncü kök için 4 gibi.',
    '"Hesapla" düğmesine basın. İlk satır kök değeridir; "Sağlama" satırı bu değerin n. kuvvetinin yazdığınız sayıya döndüğünü gösterir.',
    'Derece çiftse "İkinci gerçek kök" satırına, sonucun tam sayı olup olmadığını görmek için "Tam kök mü?" satırına bakın.',
  ],
  sections: [
    { h: 'N. dereceden kök nedir?', p: [
      'Bir x sayısının n. dereceden kökü, n. kuvveti x olan sayıdır. Kök işaretinin sol üstüne yazılan küçük sayıya <strong>kökün derecesi</strong> denir. <strong>ⁿ√x = y</strong> demek, <strong>yⁿ = x</strong> demektir. 2 × 2 × 2 × 2 × 2 = 32 olduğundan 32\'nin beşinci dereceden kökü 2\'dir. Derece 2 ise karekök, 3 ise küp kök adını alır; karekökte derece yazılmaz.',
      'Kök alma, üs almanın tersidir ve kesirli üs olarak da yazılabilir: <strong>ⁿ√x = x^(1/n)</strong>. Daha genel olarak ⁿ√(x^m) = x^(m/n) olur. Örneğin 8^(2/3), önce küp kök alınıp sonra karesi alınarak (2² = 4) ya da önce kare alınıp sonra küp kök alınarak (∛64 = 4) hesaplanabilir. Araç da hesabı bu eşitlik üzerinden yapar ve işlem satırında üslü gösterimi verir.',
    ] },
    { h: 'Tek ve çift dereceli köklerde işaret kuralı', p: [
      '<strong>Derece çiftse</strong> (2, 4, 6…) kök içindeki sayı negatif olamaz, çünkü bir gerçek sayının çift kuvveti hiçbir zaman negatif çıkmaz. ⁴√(−16) gerçek sayılarda tanımsızdır ve araç bu durumda hata verir. Pozitif sayılarda ise iki gerçek sayı aynı kuvveti verir: 3⁴ = 81 ve (−3)⁴ = 81. Kök işareti tanım gereği pozitif olanı gösterir, yani ⁴√81 = 3\'tür; x⁴ = 81 denklemini çözüyorsanız −3 de çözümdür. Araç bu ikinci değeri ayrı satırda verir.',
      '<strong>Derece tekse</strong> (3, 5, 7…) her gerçek sayının tam bir gerçek kökü vardır ve kökün işareti sayının işaretiyle aynıdır: ∛(−27) = −3, ⁵√(−32) = −2.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> ⁴√81 kaçtır? 81 = 3 × 3 × 3 × 3 = 3⁴ olduğundan sonuç 3\'tür. Dördüncü kök, karekökün karekökü olarak da bulunabilir: √81 = 9, √9 = 3.',
      '<strong>Örnek 2:</strong> ¹⁰√1024 için 1024 = 2¹⁰ olduğu bilinirse sonuç doğrudan 2\'dir. Asal çarpanlara ayırmak genel yöntemdir: üsler kök derecesine bölünür.',
      '<strong>Örnek 3:</strong> ⁴√0,0625 kaçtır? 0,0625 = 625 ÷ 10.000 = 5⁴ ÷ 10⁴ olduğundan sonuç 5 ÷ 10 = 0,5\'tir. 0 ile 1 arasındaki sayıların kökü kendilerinden büyüktür ve derece arttıkça 1\'e yaklaşır.',
      '<strong>Örnek 4:</strong> ∛10 tam çıkmaz. 2³ = 8 ve 3³ = 27 olduğundan sonuç 2 ile 3 arasında, 2\'ye yakındır. Araç 2,15443469 değerini verir; sağlamada 2,15443469³ yaklaşık 10 eder.',
      '<strong>Örnek 5 – büyüme oranı:</strong> Bir yatırım 5 yılda 2 katına çıktıysa yıllık ortalama büyüme çarpanı ⁵√2 yaklaşık 1,1487\'dir; bu da yılda ortalama yüzde 14,87 artış demektir. Sayı alanına 2, derece alanına 5 yazarak aynı değeri bulursunuz.',
    ] },
    { h: 'Köklü ifadelerin özellikleri', ul: [
      '<strong>Çarpma:</strong> ⁿ√(a × b) = ⁿ√a × ⁿ√b (çift derecede a ve b negatif olmamalı).',
      '<strong>Bölme:</strong> ⁿ√(a ÷ b) = ⁿ√a ÷ ⁿ√b, b sıfırdan farklı olmak üzere.',
      '<strong>Kökün kökü:</strong> dereceler çarpılır. Karekökün küp kökü altıncı köktür: ∛(√64) = ⁶√64 = 2.',
      '<strong>Derece genişletme ve sadeleştirme:</strong> ⁿ√(a^m) ifadesinde n ve m aynı sayıyla çarpılıp bölünebilir: ⁶√(a³) = √a (a negatif değilken).',
      '<strong>Kuvvetin kökü:</strong> n tek ise ⁿ√(aⁿ) = a, n çift ise ⁿ√(aⁿ) = |a|.',
      '<strong>Toplama üzerine dağılmaz:</strong> ⁿ√(a + b), ⁿ√a + ⁿ√b değildir.',
    ] },
    { h: 'Derece büyüdükçe ne olur?', p: [
      '1\'den büyük bir sayının kökü, derece arttıkça küçülür ve 1\'e yaklaşır. 1000 sayısı için karekök yaklaşık 31,62, küp kök 10, altıncı kök yaklaşık 3,16, onuncu kök yaklaşık 2 ve yüzüncü kök yaklaşık 1,07\'dir. 0 ile 1 arasındaki sayılarda ise kök aşağıdan 1\'e yaklaşır. 1\'in her dereceden kökü 1, 0\'ın her dereceden kökü 0\'dır.',
      'Bu davranış yüksek dereceli köklerin neden küçük oranları ifade etmekte kullanıldığını açıklar. Müzikte bir oktav, frekansın iki katına çıkması demektir ve eşit aralıklı on iki yarım sese bölünür; ardışık iki yarım ses arasındaki frekans oranı ¹²√2, yani yaklaşık 1,05946309\'dur. Araca 2 ve 12 yazarak bu değeri görebilirsiniz.',
    ] },
    { h: 'Kullanım alanları', p: [
      'Yüksek dereceden kökler en çok ortalama büyüme hesaplarında karşınıza çıkar: n dönemde gerçekleşen toplam artıştan dönem başına ortalama artışı bulmak için n. kök alınır. Nüfus artışı, enflasyon, satış büyümesi ve yatırım getirisi gibi konularda bileşik yıllık büyüme oranı bu yolla bulunur. Geometrik ortalama da n sayının çarpımının n. köküdür.',
      'Geometride küpün kenarı hacmin küp köküdür; daha yüksek boyutlu benzerlik problemlerinde de aynı düşünce sürer. Okul matematiğinde ise köklü ifadeleri üslü biçime çevirme, sadeleştirme ve üslü denklemleri çözme sorularında bu araçla sonuçlarınızı sağlayabilirsiniz.',
    ] },
    { h: 'Duyarlılık ve sınırlar', p: [
      'Kök derecesi 2 ile 1000 arasında bir tam sayı olmalıdır; 2,5 gibi kesirli dereceler için üslü sayı hesabı yapan bir araç kullanın. Sonuç en fazla sekiz ondalık basamakla gösterilir. Tam kök olmayan durumlarda değer yuvarlandığından sağlama satırında çok küçük sapmalar görülebilir. Araç yalnızca gerçek kökleri verir; karmaşık kökler kapsam dışıdır.',
    ] },
  ],
  faq: [
    ['N. dereceden kök nasıl hesaplanır?', 'Sayı asal çarpanlarına ayrılır ve her üs kök derecesine bölünür. Üsler tam bölünmüyorsa sonuç tam çıkmaz; bu durumda sayının 1/n üncü kuvveti hesap makinesiyle ya da bu araçla alınır.'],
    ['Negatif sayının kökü alınır mı?', 'Kök derecesi tekse alınır ve sonuç negatiftir: ⁵√(−32) = −2. Derece çiftse gerçek sayılarda sonuç yoktur; araç bu durumda uyarı verir.'],
    ['Dördüncü dereceden kök nasıl kolayca bulunur?', 'Art arda iki kez karekök alınır. ⁴√625 için √625 = 25 ve √25 = 5 bulunur. Benzer biçimde altıncı kök, karekökün küp kökü; sekizinci kök, üç kez karekök alınarak bulunur.'],
    ['Kök ile üslü sayı arasındaki ilişki nedir?', 'ⁿ√x ifadesi x^(1/n) ile aynıdır. Kök içindeki sayının üssü varsa pay olarak yazılır: ⁿ√(x^m) = x^(m/n). Bu dönüşüm köklü ifadelerde çarpma ve bölmeyi kolaylaştırır.'],
    ['Çift dereceli kökte neden iki sonuç gösteriliyor?', 'Çünkü hem pozitif hem negatif değer aynı çift kuvveti verir: 3⁴ ve (−3)⁴ ikisi de 81\'dir. Kök işaretinin değeri pozitif olandır; ikinci satır, denklem çözerken gözden kaçmaması için eklenmiştir.'],
    ['Hesap makinesinde n. kök nasıl alınır?', 'Özel kök tuşu yoksa üs tuşunu kullanıp sayının (1 ÷ n) inci kuvvetini alın. 32\'nin beşinci kökü için 32^(1÷5) ya da 32^0,2 yazılır.'],
    ['1\'in ve 0\'ın n. dereceden kökü kaçtır?', '1\'in her dereceden kökü 1, 0\'ın her dereceden kökü 0\'dır; çünkü bu sayıların bütün pozitif kuvvetleri yine kendileridir.'],
    ['Yazdığım sayılar saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['karekok-hesapla', 'kup-kok-hesapla', 'us-logaritma-hesapla', 'geometrik-ortalama-hesapla', 'bilimsel-gosterim-cevir'],
};
