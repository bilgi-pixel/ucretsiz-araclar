export default {
  slug: 'kare-kup-tablosu',
  title: 'Kare ve Küp Tablosu Oluşturma',
  h1Tail: 'n, n², n³',
  pageTitle: 'Kare ve Küp Tablosu Oluşturma – Sayıların Kareleri ve Küpleri',
  description: 'Seçtiğiniz aralıktaki tam sayıların kare ve küp tablosunu oluşturun. Kareler toplamını, küpler toplamını görün; tabloyu kopyalayıp hesap tablosuna yapıştırın.',
  card: 'Seçtiğiniz aralıktaki sayıların kare ve küp tablosunu oluşturun; kareler ve küpler toplamını görün.',
  category: 'matematik',
  keywords: ['kare tablosu', 'küp tablosu', 'sayıların kareleri', 'sayıların küpleri', '1den 20ye kadar kareler', 'tam kare sayılar listesi', 'tam küp sayılar', 'kareler toplamı formülü'],
  lead: 'Başlangıç ve bitiş sayılarını yazın; araç aradaki her tam sayının <strong>karesini (n²)</strong> ve <strong>küpünü (n³)</strong> tablo hâlinde listeler. Ayrıca sayıların, karelerin ve küplerin toplamını verir.',
  button: 'Oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç sayısı', type: 'number', value: '1', placeholder: 'Örn. 1' },
    { id: 'bitis', label: 'Bitiş sayısı', type: 'number', value: '20', placeholder: 'Örn. 20' },
    { id: 'adim', label: 'Artış miktarı', type: 'number', value: '1', hint: 'Yalnızca çift sayılar için 2\'den başlayıp artışı 2 yapabilirsiniz.' },
    { id: 'ayirici', label: 'Sütun ayırıcı', type: 'select', options: [['cizgi', 'Dikey çizgi ( | )'], ['sekme', 'Sekme (hesap tablosuna yapıştırmak için)']] },
  ],
  compute(v, h) {
    const a = h.int(v.baslangic, 'Başlangıç sayısı');
    const b = h.int(v.bitis, 'Bitiş sayısı');
    const d = h.posint(String(v.adim ?? '').trim() === '' ? '1' : v.adim, 'Artış miktarı');
    if (b < a) h.err('Bitiş sayısı başlangıç sayısından küçük olamaz; iki değerin yerini değiştirin.');
    if (Math.abs(a) > 10000 || Math.abs(b) > 10000) h.err('Başlangıç ve bitiş sayıları −10.000 ile 10.000 arasında olmalı.');
    const adet = Math.floor((b - a) / d) + 1;
    if (adet > 1000) h.err('Tablo en fazla 1.000 satır olabilir; aralığı daraltın ya da artış miktarını büyütün.');
    const ay = v.ayirici === 'sekme' ? '\t' : ' | ';
    const satirlar = [['n', 'n²', 'n³'].join(ay)];
    let t1 = 0, t2 = 0, t3 = 0;
    for (let n = a; n <= b; n += d) {
      const k = n * n, p = k * n;
      t1 += n; t2 += k; t3 += p;
      satirlar.push([n, k, p].join(ay));
    }
    return {
      rows: [
        ['Sayı adedi', h.fmt(adet, 0)],
        ['Kareler toplamı', h.fmt(t2, 0)],
        ['Küpler toplamı', h.fmt(t3, 0)],
        ['Sayıların toplamı', h.fmt(t1, 0)],
      ],
      text: satirlar.join('\n'),
      note: 'Tablodaki sayılar kopyalamaya uygun olması için binlik ayırıcı olmadan yazılır. Negatif sayının karesi pozitif, küpü negatiftir.',
    };
  },
  cases: [
    { in: { baslangic: '1', bitis: '5', adim: '1', ayirici: 'cizgi' }, out: { 'Sayı adedi': '5', 'Kareler toplamı': '55', 'Küpler toplamı': '225', 'Sayıların toplamı': '15' }, text: 'n | n² | n³\n1 | 1 | 1\n2 | 4 | 8\n3 | 9 | 27\n4 | 16 | 64\n5 | 25 | 125' },
    { in: { baslangic: '1', bitis: '10' }, out: { 'Sayı adedi': '10', 'Kareler toplamı': '385', 'Küpler toplamı': '3.025', 'Sayıların toplamı': '55' }, textMatch: '\\n10 \\| 100 \\| 1000$' },
    { in: { baslangic: '1', bitis: '100' }, out: { 'Kareler toplamı': '338.350', 'Küpler toplamı': '25.502.500', 'Sayıların toplamı': '5.050' } },
    { in: { baslangic: '11', bitis: '20' }, out: { 'Kareler toplamı': '2.485', 'Küpler toplamı': '41.075', 'Sayıların toplamı': '155' }, textMatch: '\\n20 \\| 400 \\| 8000$' },
    { in: { baslangic: '-3', bitis: '3' }, out: { 'Sayı adedi': '7', 'Kareler toplamı': '28', 'Küpler toplamı': '0', 'Sayıların toplamı': '0' }, textMatch: '^n \\| n² \\| n³\\n-3 \\| 9 \\| -27\\n' },
    { in: { baslangic: '2', bitis: '10', adim: '2' }, out: { 'Sayı adedi': '5', 'Kareler toplamı': '220', 'Küpler toplamı': '1.800' } },
    { in: { baslangic: '1', bitis: '2', ayirici: 'sekme' }, out: { 'Sayı adedi': '2' }, text: 'n\tn²\tn³\n1\t1\t1\n2\t4\t8' },
    { in: { baslangic: '12', bitis: '12' }, out: { 'Kareler toplamı': '144', 'Küpler toplamı': '1.728' }, text: 'n | n² | n³\n12 | 144 | 1728' },
    { in: { baslangic: '10', bitis: '1' }, error: true },
    { in: { baslangic: '1', bitis: '5000' }, error: true },
    { in: { baslangic: '1,5', bitis: '4' }, error: true },
    { in: { baslangic: '1', bitis: '10', adim: '0' }, error: true },
  ],
  howto: [
    '"Başlangıç sayısı" ve "Bitiş sayısı" alanlarına tablonun kapsayacağı aralığı yazın; örneğin 1 ve 20. Negatif tam sayılar da kullanılabilir.',
    'Sayıların birer birer artmasını istiyorsanız "Artış miktarı" alanını 1 olarak bırakın; yalnızca çift sayılar ya da 5\'in katları gibi listeler için 2 ya da 5 yazın.',
    'Tabloyu bir hesap tablosu programına yapıştıracaksanız "Sütun ayırıcı" olarak sekmeyi seçin; böylece her değer ayrı hücreye düşer.',
    '"Oluştur" düğmesine basın. Üstte toplamlar, altta n, n² ve n³ sütunlarından oluşan tablo görünür.',
    '"Sonucu kopyala" ile tabloyu panoya alın ve ders notunuza, ödevinize ya da tablonuza yapıştırın.',
  ],
  sections: [
    { h: 'Kare ve küp ne demektir?', p: [
      'Bir sayının <strong>karesi</strong>, o sayının kendisiyle çarpımıdır ve n² biçiminde yazılır: 7² = 7 · 7 = 49. Adı geometriden gelir; kenar uzunluğu n birim olan bir karenin alanı n² birimkaredir. Bir sayının <strong>küpü</strong> ise sayının kendisiyle üç kez çarpımıdır: 4³ = 4 · 4 · 4 = 64. Kenarı n birim olan bir küpün hacmi n³ birimküptür.',
      'Bir tam sayının karesi olan sayılara tam kare (1, 4, 9, 16, 25…), küpü olan sayılara tam küp (1, 8, 27, 64, 125…) denir. Bu sayıları ezbere bilmek karekök ve küpkök alma, çarpanlara ayırma, özdeşlikleri kullanma ve zihinden işlem yapma becerilerini belirgin biçimde hızlandırır. Tablo, ezber çalışırken başvuru kaynağı olarak ya da bir alıştırma kâğıdı hazırlarken kullanılabilir.',
    ] },
    { h: 'Çözümlü örnek: 1\'den 5\'e tablo', p: [
      'Başlangıca 1, bitişe 5 yazıldığında araç beş satırlık bir tablo üretir: 1\'in karesi 1 ve küpü 1; 2\'nin karesi 4 ve küpü 8; 3\'ün karesi 9 ve küpü 27; 4\'ün karesi 16 ve küpü 64; 5\'in karesi 25 ve küpü 125.',
      'Kareler toplamı 1 + 4 + 9 + 16 + 25 = <strong>55</strong>, küpler toplamı 1 + 8 + 27 + 64 + 125 = <strong>225</strong>, sayıların toplamı ise 15\'tir. Burada dikkat çekici bir ilişki vardır: 225 = 15². Yani ilk beş sayının küpleri toplamı, bu sayıların toplamının karesine eşittir. Bu bir rastlantı değildir ve bir sonraki bölümdeki formülün sonucudur.',
    ] },
    { h: 'Toplam formülleri', p: [
      '1\'den n\'ye kadar olan sayılar için toplamlar tek tek toplama yapmadan şu formüllerle bulunur:',
    ], ul: [
      '<strong>Sayıların toplamı:</strong> n · (n + 1) ÷ 2',
      '<strong>Kareler toplamı:</strong> n · (n + 1) · (2n + 1) ÷ 6',
      '<strong>Küpler toplamı:</strong> [n · (n + 1) ÷ 2]², yani sayıların toplamının karesi',
      '<strong>Örnek (n = 10):</strong> sayıların toplamı 10 · 11 ÷ 2 = 55; kareler toplamı 10 · 11 · 21 ÷ 6 = 385; küpler toplamı 55² = 3025',
      '<strong>Örnek (n = 100):</strong> kareler toplamı 338.350, küpler toplamı 5050² = 25.502.500',
    ] },
    { h: 'Ara toplamlar nasıl bulunur?', p: [
      'Formüller 1\'den başlayan toplamlar içindir. Aralık 1\'den başlamıyorsa büyük toplamdan küçük toplam çıkarılır. Örneğin 11\'den 20\'ye kadar olan sayıların kareleri toplamı, ilk 20 sayının kareleri toplamından (2870) ilk 10 sayının kareleri toplamının (385) çıkarılmasıyla 2485 bulunur. Araç 11–20 aralığı için aynı sonucu doğrudan verir; küpler toplamı da 44.100 − 3.025 = 41.075 olur.',
    ] },
    { h: 'Kare ve küp sayılardaki örüntüler', ul: [
      '<strong>Ardışık kareler arasındaki fark</strong> ardışık tek sayılardır: 4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7. Genel olarak (n + 1)² − n² = 2n + 1\'dir.',
      '<strong>İlk n tek sayının toplamı</strong> n²\'dir: 1 + 3 + 5 + 7 = 16 = 4².',
      '<strong>Tam karelerin son basamağı</strong> yalnızca 0, 1, 4, 5, 6 ya da 9 olabilir. Son basamağı 2, 3, 7 ya da 8 olan bir sayı tam kare değildir.',
      '<strong>Tam küplerin son basamağı</strong> her rakam olabilir; üstelik 1\'den 9\'a kadar sayıların küplerinin son basamakları birbirinden farklıdır. Bu özellik küpkökü zihinden tahmin etmeye yarar.',
      '<strong>5 ile biten sayıların karesi</strong> her zaman 25 ile biter: 15² = 225, 35² = 1225, 65² = 4225. Baştaki kısım, onlar basamağındaki sayı ile bir fazlasının çarpımıdır (3 · 4 = 12 → 1225).',
      '<strong>Hem tam kare hem tam küp</strong> olan sayılar altıncı kuvvetlerdir: 1, 64, 729, 4096…',
    ] },
    { h: 'Negatif sayılar ve sık yapılan hatalar', p: [
      'Negatif bir sayının karesi pozitiftir, çünkü eksi ile eksinin çarpımı artıdır: (−3)² = 9. Küpü ise negatiftir: (−3)³ = −27. Bu yüzden −3 ile 3 arasındaki bir tabloda kareler toplamı 28 olurken küpler toplamı sıfır çıkar; negatif ve pozitif küpler birbirini götürür.',
      'Yazımda parantez önemlidir: −3² ifadesi işlem önceliği gereği −(3²) = −9 anlamına gelir, (−3)² ise 9\'dur. Tablodaki değerler sayının kendisinin karesidir, yani parantezli biçime karşılık gelir. Bir diğer yaygın hata kare almayı iki ile çarpmakla karıştırmaktır: 6² = 36\'dır, 12 değil; aynı şekilde 2³ = 8\'dir, 6 değil.',
    ] },
    { h: 'Sınırlar ve kopyalama ipuçları', p: [
      'Araç tam sayılarla çalışır; başlangıç ve bitiş −10.000 ile 10.000 arasında olmalı ve tablo en fazla 1.000 satır içermelidir. Bu sınırlar içinde bütün değerler ve toplamlar yuvarlama olmadan tam olarak hesaplanır. Daha geniş bir aralığı taramak isterseniz artış miktarını büyütebilir ya da aralığı parçalara bölebilirsiniz.',
      'Sekme ayırıcılı çıktı, hesap tablosu programlarına yapıştırıldığında üç sütuna kendiliğinden dağılır. Dikey çizgili çıktı ise düz metin belgelerinde ve mesajlarda daha okunaklıdır. Ondalıklı bir sayının karesini ya da küpünü hesaplamanız gerekiyorsa üs alma aracını kullanın.',
    ] },
  ],
  faq: [
    ['Bir sayının karesi ve küpü nasıl hesaplanır?', 'Kare için sayı kendisiyle bir kez, küp için iki kez daha çarpılır. 6\'nın karesi 6 · 6 = 36, küpü 6 · 6 · 6 = 216\'dır. Tablo bu işlemi seçtiğiniz aralıktaki her sayı için yapar.'],
    ['1\'den 20\'ye kadar sayıların kareleri nelerdir?', '1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361 ve 400\'dür. Başlangıca 1, bitişe 20 yazarak bu listeyi küpleriyle birlikte oluşturabilirsiniz.'],
    ['1\'den 10\'a kadar sayıların küpleri nelerdir?', '1, 8, 27, 64, 125, 216, 343, 512, 729 ve 1000\'dir. Toplamları 3025 eder; bu da 1\'den 10\'a kadar sayıların toplamı olan 55\'in karesidir.'],
    ['Kareler toplamı formülü nedir?', '1\'den n\'ye kadar sayıların kareleri toplamı n · (n + 1) · (2n + 1) ÷ 6 formülüyle bulunur. n = 10 için 10 · 11 · 21 ÷ 6 = 385 eder. Araçtaki "Kareler toplamı" satırıyla sonucu karşılaştırabilirsiniz.'],
    ['Negatif sayıların karesi neden pozitiftir?', 'İki negatif sayının çarpımı pozitif olduğu için. (−5) · (−5) = 25\'tir. Küpte ise üçüncü bir negatif çarpan daha geldiğinden sonuç yeniden negatif olur: (−5)³ = −125.'],
    ['Tabloyu hesap tablosuna nasıl aktarırım?', '"Sütun ayırıcı" olarak sekmeyi seçip tabloyu oluşturun, "Sonucu kopyala" düğmesine basın ve hesap tablosunda bir hücreye yapıştırın. Sayı, kare ve küp değerleri üç ayrı sütuna yerleşir.'],
    ['Yalnızca tek ya da çift sayıların tablosunu oluşturabilir miyim?', 'Evet. Çift sayılar için başlangıca 2, artış miktarına 2 yazın; tek sayılar için başlangıcı 1, artışı 2 yapın. 2\'den 10\'a çift sayılar için kareler toplamı 220, küpler toplamı 1800 çıkar.'],
    ['Oluşturduğum tablo bir yere kaydediliyor mu?', 'Hayır. Tablo tarayıcınızda üretilir; yazdığınız aralık ve sonuçlar sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['tam-kare-kontrol', 'karekok-hesapla', 'kup-kok-hesapla', 'us-logaritma-hesapla', 'ardisik-sayi-toplami'],
};
