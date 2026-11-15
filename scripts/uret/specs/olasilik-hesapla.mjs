export default {
  slug: 'olasilik-hesapla',
  title: 'Olasılık Hesaplama',
  h1Tail: 'kesir, yüzde ve tekrarlı deneme',
  pageTitle: 'Olasılık Hesaplama – İstenen Durum / Tüm Durum, Yüzde ve Kesir',
  description: 'İstenen durum sayısını tüm durum sayısına bölerek olasılığı kesir, ondalık ve yüzde olarak bulun; olmama ve tekrarlı denemede en az bir kez olma şansını görün.',
  card: 'İstenen durum ve tüm durum sayısından olasılığı kesir, ondalık ve yüzde olarak hesaplayın; tekrarlı denemeleri de görün.',
  category: 'matematik',
  keywords: ['olasılık hesaplama', 'olasılık nasıl hesaplanır', 'istenen durum tüm durum', 'olasılık yüzde hesaplama', 'en az bir kez olasılığı', 'olasılık formülü', 'tümleyen olay olasılığı', 'şans oranı hesaplama'],
  lead: 'Eş olasılıklı bir deneyde bir olayın gerçekleşme olasılığını bulun. Araç <strong>istenen durum sayısı ÷ tüm durum sayısı</strong> oranını sadeleştirilmiş kesir, ondalık sayı ve yüzde olarak verir; ayrıca olayın olmama olasılığını ve deney tekrarlandığında en az bir kez gerçekleşme şansını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'istenen', label: 'İstenen durum sayısı', type: 'number', placeholder: 'Örn. 1' },
    { id: 'toplam', label: 'Tüm durum sayısı', type: 'number', placeholder: 'Örn. 6' },
    { id: 'deneme', label: 'Deneme sayısı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 3', hint: 'Deney bağımsız olarak kaç kez tekrarlanacak? Boş bırakılırsa 1 kabul edilir.' },
  ],
  compute(v, h) {
    const a = h.int(v.istenen, 'İstenen durum sayısı');
    const b = h.posint(v.toplam, 'Tüm durum sayısı');
    if (a < 0) h.err('"İstenen durum sayısı" negatif olamaz.');
    if (a > b) h.err('İstenen durum sayısı tüm durum sayısından büyük olamaz; olasılık 1\'i aşamaz.');
    const n = String(v.deneme ?? '').trim() === '' ? 1 : h.posint(v.deneme, 'Deneme sayısı');
    if (n > 1000000) h.err('"Deneme sayısı" en fazla 1.000.000 olabilir.');
    const ebob = (x, y) => { while (y) { [x, y] = [y, x % y]; } return x; };
    const g = ebob(a, b) || 1;
    const p = a / b;
    const q = (b - a) / b;
    let oran;
    if (a === 0) oran = '0 : 1 (olanaksız olay)';
    else if (a === b) oran = '1 : 0 (kesin olay)';
    else { const g2 = ebob(a, b - a); oran = `${h.fmt(a / g2, 0)} : ${h.fmt((b - a) / g2, 0)}`; }
    const enAzBir = 1 - Math.pow(q, n);
    const hepsi = Math.pow(p, n);
    const rows = [
      ['Olasılık', h.fmt(p, 6)],
      ['Yüzde', '%' + h.fmt(p * 100, 4)],
      ['Kesir', a === 0 ? '0' : a === b ? '1' : `${a / g}/${b / g}`],
      ['Olmama olasılığı', `${h.fmt(q, 6)} (%${h.fmt(q * 100, 4)})`],
      ['Lehte : aleyhte oranı', oran],
    ];
    if (n > 1) {
      rows.push([`${h.fmt(n, 0)} denemede en az bir kez`, `${h.fmt(enAzBir, 6)} (%${h.fmt(enAzBir * 100, 4)})`]);
      rows.push([`${h.fmt(n, 0)} denemenin hepsinde`, `${h.sig(hepsi, 6)} (%${h.sig(hepsi * 100, 6)})`]);
      rows.push([`${h.fmt(n, 0)} denemede hiç olmaması`, `${h.fmt(1 - enAzBir, 6)} (%${h.fmt((1 - enAzBir) * 100, 4)})`]);
    }
    return {
      rows,
      note: 'Hesap, tüm durumların eşit olasılıklı ve tekrarlanan denemelerin birbirinden bağımsız olduğunu varsayar.',
    };
  },
  cases: [
    { in: { istenen: '1', toplam: '6' }, out: { 'Olasılık': '0,166667', 'Yüzde': '%16,6667', 'Kesir': '1/6', 'Olmama olasılığı': '0,833333 (%83,3333)', 'Lehte : aleyhte oranı': '1 : 5' } },
    { in: { istenen: '13', toplam: '52' }, out: { 'Olasılık': '0,25', 'Yüzde': '%25', 'Kesir': '1/4', 'Lehte : aleyhte oranı': '1 : 3' } },
    { in: { istenen: '1', toplam: '2', deneme: '3' }, out: { 'Olasılık': '0,5', '3 denemede en az bir kez': '0,875 (%87,5)', '3 denemenin hepsinde': '0,125 (%12,5)', '3 denemede hiç olmaması': '0,125 (%12,5)' } },
    { in: { istenen: '4', toplam: '52' }, out: { 'Kesir': '1/13', 'Olasılık': '0,076923', 'Lehte : aleyhte oranı': '1 : 12' } },
    { in: { istenen: '0', toplam: '10' }, out: { 'Olasılık': '0', 'Kesir': '0', 'Olmama olasılığı': '1 (%100)' } },
    { in: { istenen: '5', toplam: '5' }, out: { 'Olasılık': '1', 'Yüzde': '%100', 'Kesir': '1' } },
    { in: { istenen: '1', toplam: '6', deneme: '4' }, out: { '4 denemede en az bir kez': '0,517747 (%51,7747)' } },
    { in: { istenen: '7', toplam: '6' }, error: true },
    { in: { istenen: '1', toplam: '0' }, error: true },
    { in: { istenen: '1,5', toplam: '6' }, error: true },
  ],
  howto: [
    '"İstenen durum sayısı" alanına olayınızı gerçekleştiren sonuçların sayısını yazın. Bir zarda 6 gelmesi için bu sayı 1, çift sayı gelmesi için 3\'tür.',
    '"Tüm durum sayısı" alanına deneyin olası bütün sonuçlarının sayısını yazın: zar için 6, iskambil destesi için 52, yazı tura için 2.',
    'Deney birden çok kez tekrarlanacaksa "Deneme sayısı" alanını doldurun; tek deneme için boş bırakın.',
    '"Hesapla" düğmesine basın. Olasılık ondalık, yüzde ve sadeleştirilmiş kesir olarak, tümleyen olayın olasılığıyla birlikte listelenir.',
    'Deneme sayısı yazdıysanız en az bir kez, her seferinde ve hiç gerçekleşmeme olasılıklarını da sonuç kutusunun alt satırlarında okuyun.',
  ],
  sections: [
    { h: 'Klasik olasılık tanımı ve formül', p: [
      'Bir deneyin bütün olası sonuçlarının kümesine <em>örnek uzay</em>, bu sonuçların bir alt kümesine <em>olay</em> denir. Sonuçların hepsi aynı şansa sahipse bir A olayının olasılığı şu oranla bulunur: <strong>P(A) = istenen durum sayısı ÷ tüm durum sayısı</strong>. Okul kitaplarında bu, s(A) ÷ s(E) biçiminde yazılır.',
      'Olasılık her zaman 0 ile 1 arasında bir sayıdır. 0, olayın hiçbir sonuçta gerçekleşmediğini (olanaksız olay); 1, her sonuçta gerçekleştiğini (kesin olay) gösterir. Aynı sayıyı 100 ile çarparak yüzde, pay ve paydayı en büyük ortak bölenlerine bölerek sade kesir biçiminde ifade edebilirsiniz. Araç üç gösterimi birlikte verir, çünkü sınav sorularında çoğunlukla kesir, gündelik konuşmada ise yüzde beklenir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Zar:</strong> Hilesiz bir zar atıldığında 6 gelme olasılığı için istenen durum 1, tüm durum 6\'dır. Sonuç 1/6, yani 0,166667 ya da %16,6667 olur. 6 gelmeme olasılığı 5/6 = 0,833333\'tür.',
      '<strong>İskambil:</strong> 52 kartlık desteden rastgele çekilen bir kartın kupa olma olasılığı 13/52\'dir. Kesir sadeleşince 1/4, yani %25 bulunur. Aynı desteden as çekme olasılığı 4/52 = 1/13, yaklaşık 0,076923\'tür.',
      '<strong>Torba:</strong> İçinde 3 kırmızı, 5 mavi ve 2 yeşil top bulunan torbadan bir top çekildiğinde mavi gelme olasılığı 5/10 = 1/2\'dir. Burada tüm durum sayısı, torbadaki topların toplamıdır; renk sayısı değildir.',
    ] },
    { h: 'Tümleyen olay ve lehte-aleyhte oranı', p: [
      'Bir olayın gerçekleşmeme olasılığı, 1\'den gerçekleşme olasılığının çıkarılmasıyla bulunur: <strong>P(A\') = 1 − P(A)</strong>. "En az bir" ifadesi içeren sorularda doğrudan saymak yerine tümleyeni hesaplamak neredeyse her zaman daha kısadır.',
      'Sonuçlardaki "lehte : aleyhte" satırı, olasılığın bir başka yazım biçimidir. 1/6 olasılık, 1 uygun sonuca karşı 5 uygun olmayan sonuç demektir ve 1 : 5 diye okunur. Bu oran olasılıkla karıştırılmamalıdır: 1 : 5 oranı %20 değil, %16,67 olasılığa karşılık gelir; çünkü payda 5 değil, 1 + 5 = 6\'dır.',
    ] },
    { h: 'Tekrarlanan bağımsız denemeler', p: [
      'Aynı deney birbirini etkilemeyecek biçimde n kez tekrarlanırsa olasılıklar çarpılır. Olayın her seferinde gerçekleşmesi <strong>p<sup>n</sup></strong>, hiç gerçekleşmemesi <strong>(1 − p)<sup>n</sup></strong> olasılığındadır. Buradan en az bir kez gerçekleşme olasılığı <strong>1 − (1 − p)<sup>n</sup></strong> olarak çıkar.',
      'Örneğin yazı tura üç kez atıldığında en az bir kez yazı gelmesi için p = 1/2 ve n = 3 alınır: 1 − (1/2)<sup>3</sup> = 0,875. Üçünün de yazı gelme olasılığı ise 0,125\'tir. Bir zarı dört kez atıp en az bir kez 6 görme olasılığı 1 − (5/6)<sup>4</sup> = 0,517747 eder; yani dört atış, yarı yarıya şansı ancak biraz aşar.',
      'Bağımsızlık koşulu önemlidir. Torbadan çekilen top geri konmuyorsa ikinci çekilişte hem istenen hem tüm durum sayısı değişir; bu durumda denemeler bağımsız değildir ve bu alan kullanılmamalıdır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Eş olasılıklı olmayan sonuçları saymak:</strong> İki zarın toplamı 2 ile 12 arasında 11 farklı değer alır, ama toplamın 7 gelme olasılığı 1/11 değildir. Doğru örnek uzay 36 sıralı ikiliden oluşur ve 7 toplamını 6 ikili verir.',
      '<strong>Sırayı göz ardı etmek:</strong> İki madeni parada "bir yazı bir tura" sonucu YT ve TY olmak üzere iki ayrı durumdur; olasılığı 1/3 değil 2/4\'tür.',
      '<strong>Kumarbaz yanılgısı:</strong> Arka arkaya beş kez tura gelmiş olması, altıncı atışta yazı gelme olasılığını artırmaz; hilesiz parada her atış yine 1/2\'dir.',
      '<strong>Yüzdeleri toplamak:</strong> %10 şanslı bir olayı 10 kez denemek %100 garanti vermez; en az bir kez gerçekleşme olasılığı yaklaşık %65,13\'tür.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç yalnızca sayılabilir ve eşit şanslı sonuçlardan oluşan deneyler içindir; bu nedenle iki alan da tam sayı olmalıdır. Koşullu olasılık, birbirine bağlı olaylar, geri koymadan çekiliş ya da sürekli dağılımlar bu hesabın kapsamı dışındadır. Gerçek hayattaki zar, para ya da çekilişlerin tam anlamıyla hilesiz olduğu da bir varsayımdır.',
      'Sonuçlar bilgilendirme ve ders çalışma amaçlıdır. Hesaplanan olasılık uzun vadeli sıklığı anlatır; tek bir denemenin sonucunu önceden bildirmez ve şans oyunlarında kazanç beklentisi oluşturmak için kullanılmamalıdır.',
    ] },
  ],
  faq: [
    ['Olasılık nasıl hesaplanır?', 'Sonuçları eşit şanslı olan bir deneyde olasılık, istenen durum sayısının tüm durum sayısına bölünmesiyle bulunur. Bir zarda tek sayı gelmesi için istenen durum 3, tüm durum 6 olduğundan olasılık 3/6 = 1/2\'dir.'],
    ['Olasılık 1\'den büyük ya da negatif olabilir mi?', 'Hayır. Olasılık en az 0, en çok 1 olur. İstenen durum sayısı tüm durum sayısını aşıyorsa sayımda hata vardır; araç bu durumda uyarı verir.'],
    ['Olasılığı yüzdeye nasıl çeviririm?', 'Ondalık olasılığı 100 ile çarpmanız yeterlidir. 0,25 olasılık %25, 1/8 = 0,125 olasılık %12,5 demektir. Araç yüzdeyi dört ondalık basamağa kadar gösterir.'],
    ['"En az bir kez" olasılığı neden tümleyenle hesaplanır?', 'Çünkü "en az bir kez" olayı bir, iki, üç… kez gerçekleşme durumlarının hepsini kapsar ve bunları tek tek toplamak uzundur. Tek istenmeyen durum "hiç gerçekleşmemesi" olduğundan 1 − (1 − p)^n formülü aynı sonucu tek adımda verir.'],
    ['Lehte : aleyhte oranı ile olasılık arasındaki fark nedir?', 'Olasılık, uygun sonuçların bütün sonuçlara oranıdır; lehte : aleyhte oranı ise uygun sonuçların uygun olmayan sonuçlara oranıdır. 1/4 olasılık 1 : 3 oranına eşittir.'],
    ['Bir zarı kaç kez atarsam 6 gelmesi garanti olur?', 'Hiçbir zaman garanti olmaz. Deneme sayısı arttıkça en az bir kez 6 gelme olasılığı 1\'e yaklaşır ama ona ulaşmaz: 6 atışta yaklaşık %66,51, 12 atışta yaklaşık %88,78, 24 atışta yaklaşık %98,74 olur.'],
    ['İki ayrı olayın birlikte gerçekleşme olasılığını bulabilir miyim?', 'Olaylar bağımsızsa olasılıkları çarpmanız gerekir. Aynı olayın tekrarı için "Deneme sayısı" alanı bunu yapar; farklı iki olay için her birinin olasılığını ayrı ayrı hesaplayıp sonuçları çarpabilirsiniz.'],
    ['Girdiğim sayılar kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['zar-olasiligi-hesapla', 'binom-dagilimi-hesapla', 'kombinasyon-permutasyon', 'faktoriyel-hesapla', 'yuzde-hesapla'],
};
