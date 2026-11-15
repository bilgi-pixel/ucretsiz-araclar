export default {
  slug: 'iki-zar-olasilik-hesapla',
  title: 'İki Zar Toplam Olasılıkları Hesaplama',
  h1Tail: '2–12 arası toplamlar',
  pageTitle: 'İki Zar Toplam Olasılıkları Hesaplama – 2\'den 12\'ye Olasılık Tablosu',
  description: 'İki zar atıldığında toplamın belirli bir sayı, en az ya da en çok o sayı gelme olasılığını kesir ve yüzde olarak hesaplayın; tüm toplamların tablosunu görün.',
  card: 'İki zarın toplamının istediğiniz sayı gelme olasılığını kesir ve yüzde olarak bulun; 2–12 arası tüm toplamların tablosunu görün.',
  category: 'gunluk',
  keywords: ['iki zar olasılık', 'iki zar toplamı olasılığı', 'zar toplamı 7 gelme olasılığı', 'çift zar olasılık tablosu', 'iki zar atıldığında', 'zar olasılık hesaplama', 'düşeş gelme olasılığı'],
  lead: 'İki adet altı yüzlü zar atıldığında <strong>toplamın belirli bir değer gelme olasılığını</strong> hesaplayın. Araç 36 eşit olası sonuç üzerinden uygun durumları sayar; sonucu sadeleştirilmiş kesir ve yüzde olarak verir, ayrıca 2\'den 12\'ye bütün toplamların dağılım tablosunu listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'toplam', label: 'Hedef toplam (2–12)', type: 'number', placeholder: 'Örn. 7', value: '7' },
    { id: 'kosul', label: 'Koşul', type: 'select', options: [['tam', 'Toplam tam olarak bu sayı'], ['enaz', 'Toplam en az bu sayı'], ['encok', 'Toplam en çok bu sayı']] },
  ],
  compute(v, h) {
    const t = h.int(v.toplam, 'Hedef toplam');
    if (t < 2 || t > 12) h.err('İki zarın toplamı 2 ile 12 arasında olabilir; bu aralıkta bir tam sayı yazın.');
    const yol = (s) => 6 - Math.abs(s - 7);
    const uygunMu = (s) => (v.kosul === 'enaz' ? s >= t : v.kosul === 'encok' ? s <= t : s === t);
    let uygun = 0;
    const ciftler = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (uygunMu(a + b)) { uygun++; ciftler.push(`(${a},${b})`); }
    const obeb = (x, y) => (y === 0 ? x : obeb(y, x % y));
    const g = obeb(uygun, 36);
    const kesir = uygun === 36 ? '1' : `${uygun / g}/${36 / g}`;
    const p = uygun / 36;
    const satirlar = [];
    for (let s = 2; s <= 12; s++) satirlar.push(`${String(s).padStart(2, ' ')}: ${yol(s)}/36 = %${h.fix(yol(s) / 36 * 100, 2)}${uygunMu(s) ? '  ←' : ''}`);
    const baslik = v.kosul === 'enaz' ? `Toplam en az ${t}` : v.kosul === 'encok' ? `Toplam en çok ${t}` : `Toplam ${t}`;
    return {
      rows: [
        ['Olasılık', '%' + h.fmt(p * 100, 2)],
        ['Kesir olarak', kesir],
        ['Uygun durum sayısı', `${uygun} / 36`],
        ['Gelmeme olasılığı', '%' + h.fmt((1 - p) * 100, 2)],
        ['Ortalama sıklık', uygun === 36 ? 'Her atışta' : h.fmt(36 / uygun, 1) + ' atışta 1'],
      ],
      text: `${baslik} için uygun zar çiftleri (birinci zar, ikinci zar):\n${ciftler.join(' ')}\n\nTüm toplamların dağılımı:\n${satirlar.join('\n')}`,
      note: 'Zarların hilesiz ve birbirinden bağımsız olduğu varsayılır. Olasılık, uzun vadedeki oranı anlatır; tek tek atışların sonucunu belirlemez.',
    };
  },
  cases: [
    { in: { toplam: '7', kosul: 'tam' }, out: { 'Olasılık': '%16,67', 'Kesir olarak': '1/6', 'Uygun durum sayısı': '6 / 36', 'Gelmeme olasılığı': '%83,33', 'Ortalama sıklık': '6 atışta 1' }, textMatch: '\\(1,6\\) \\(2,5\\) \\(3,4\\) \\(4,3\\) \\(5,2\\) \\(6,1\\)' },
    { in: { toplam: '2', kosul: 'tam' }, out: { 'Olasılık': '%2,78', 'Kesir olarak': '1/36', 'Uygun durum sayısı': '1 / 36', 'Ortalama sıklık': '36 atışta 1' } },
    { in: { toplam: '10', kosul: 'enaz' }, out: { 'Olasılık': '%16,67', 'Kesir olarak': '1/6', 'Uygun durum sayısı': '6 / 36' } },
    { in: { toplam: '4', kosul: 'encok' }, out: { 'Kesir olarak': '1/6', 'Uygun durum sayısı': '6 / 36' } },
    { in: { toplam: '8', kosul: 'tam' }, out: { 'Olasılık': '%13,89', 'Kesir olarak': '5/36', 'Ortalama sıklık': '7,2 atışta 1' } },
    { in: { toplam: '12', kosul: 'encok' }, out: { 'Olasılık': '%100', 'Kesir olarak': '1', 'Gelmeme olasılığı': '%0', 'Ortalama sıklık': 'Her atışta' } },
    { in: { toplam: '8', kosul: 'enaz' }, out: { 'Kesir olarak': '5/12', 'Uygun durum sayısı': '15 / 36', 'Olasılık': '%41,67' } },
    { in: { toplam: '7', kosul: 'encok' }, out: { 'Kesir olarak': '7/12', 'Uygun durum sayısı': '21 / 36' }, textMatch: ' 7: 6/36 = %16,67  ←\\n 8: 5/36 = %13,89\\n' },
    { in: { toplam: '13', kosul: 'tam' }, error: true },
    { in: { toplam: '1', kosul: 'tam' }, error: true },
    { in: { toplam: '6,5', kosul: 'tam' }, error: true },
  ],
  howto: [
    'Olasılığını merak ettiğiniz toplamı 2 ile 12 arasında bir tam sayı olarak yazın.',
    'Koşulu seçin: toplam tam olarak o sayı mı, en az o sayı mı, yoksa en çok o sayı mı gelsin?',
    '"Hesapla" düğmesine basın. İlk satırda olasılık yüzde olarak, altında sadeleştirilmiş kesir ve 36 durumdan kaçının uygun olduğu görünür.',
    'Alttaki kutuda koşulu sağlayan bütün zar çiftlerini ve 2–12 arası toplamların tam dağılımını inceleyin; koşula uyan satırlar okla işaretlenir.',
  ],
  sections: [
    { h: 'Neden 36 durum var?', p: [
      'Tek bir zarın altı yüzü vardır. İki zar birlikte atıldığında birinci zarın her sonucu, ikinci zarın altı sonucundan herhangi biriyle eşleşebilir; böylece 6 × 6 = 36 farklı sonuç ortaya çıkar. Zarlar hilesizse bu 36 sonucun her biri eşit olasılıklıdır. Bir olayın olasılığı, o olayı sağlayan sonuçların sayısının 36\'ya bölünmesiyle bulunur: <strong>olasılık = uygun durum sayısı ÷ 36</strong>.',
      'Burada sıkça gözden kaçan nokta, zarların ayrı ayrı sayılmasıdır. (2,5) ile (5,2) aynı toplamı verir ama iki farklı sonuçtur; zarlardan birinin kırmızı, diğerinin beyaz olduğunu düşünmek bunu kavramayı kolaylaştırır. Buna karşılık (3,3) gibi çift gelen sonuçlar yalnızca bir kez sayılır. Toplamların eşit olasılıklı olmamasının nedeni budur.',
    ] },
    { h: 'Toplamların dağılımı', p: [
      'Toplam 7\'yi veren altı çift vardır: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). 7\'den uzaklaştıkça uygun çift sayısı birer birer azalır. Kısa yoldan, bir toplamı veren çift sayısı <strong>6 − |toplam − 7|</strong> ifadesiyle bulunur. Dağılım simetriktir: 6 ile 8, 5 ile 9, 2 ile 12 aynı olasılığa sahiptir.',
    ], ul: [
      'Toplam <strong>2</strong> ve <strong>12</strong>: 1/36 (%2,78)',
      'Toplam <strong>3</strong> ve <strong>11</strong>: 2/36 = 1/18 (%5,56)',
      'Toplam <strong>4</strong> ve <strong>10</strong>: 3/36 = 1/12 (%8,33)',
      'Toplam <strong>5</strong> ve <strong>9</strong>: 4/36 = 1/9 (%11,11)',
      'Toplam <strong>6</strong> ve <strong>8</strong>: 5/36 (%13,89)',
      'Toplam <strong>7</strong>: 6/36 = 1/6 (%16,67)',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Toplamın 8 gelmesi:</strong> Uygun çiftler (2,6), (3,5), (4,4), (5,3), (6,2) olmak üzere beş tanedir. Olasılık 5/36, yani yaklaşık %13,89\'dur; ortalama 7,2 atışta bir görülür.',
      '<strong>Toplamın en az 10 gelmesi:</strong> 10 için üç, 11 için iki, 12 için bir çift vardır; toplam 6 uygun durum. Olasılık 6/36 = 1/6, yani %16,67\'dir. İlginç bir rastlantı olarak bu, toplamın tam 7 gelme olasılığına eşittir.',
      '<strong>Toplamın en çok 7 gelmesi:</strong> 2\'den 7\'ye kadar çift sayıları 1 + 2 + 3 + 4 + 5 + 6 = 21 eder. Olasılık 21/36 = 7/12, yaklaşık %58,33\'tür. Tersi olan "8 ve üzeri" ise 15/36 = 5/12 çıkar; ikisinin toplamı 1\'dir.',
    ] },
    { h: 'Oyunlarda ve derslerde kullanımı', p: [
      'İki zar toplamı, olasılık konusunun en bilinen örneklerinden biridir ve ortaokul ile lise matematik sorularında sıkça karşınıza çıkar. Sınav sorularında "toplamın asal sayı gelmesi" ya da "toplamın 4\'ten küçük olması" gibi koşullar sorulduğunda, alttaki dağılım tablosundan ilgili satırları toplayarak yanıtı doğrulayabilirsiniz.',
      'Masa oyunlarında dağılımı bilmek strateji kurmaya yarar. İki zarın toplamıyla kaynak üretilen strateji oyunlarında 6 ve 8 numaralı alanların 2 ve 12\'ye göre beş kat sık çalışması, emlak temalı oyunlarda piyonların en sık yedi kare ilerlemesi bu tablonun doğrudan sonucudur. Tavlada ise hesap farklıdır: orada toplam değil, zarların tek tek değerleri ve çift gelme durumu önem taşır; belirli bir çiftin, örneğin düşeşin (6,6) gelme olasılığı 1/36\'dır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>On bir toplamı eşit olasılıklı saymak:</strong> 2\'den 12\'ye on bir farklı toplam vardır ama her birinin olasılığı 1/11 değildir; 7, 2\'ye göre altı kat olasıdır.',
      '<strong>Sırayı göz ardı etmek:</strong> (1,2) ile (2,1) ayrı sonuçlardır. Bunları tek sayarsanız 36 yerine 21 durum bulur ve yanlış olasılıklara ulaşırsınız.',
      '<strong>Geçmiş atışların etkilediğini düşünmek:</strong> Art arda beş kez 7 gelmemiş olması, altıncı atışta 7 gelme olasılığını artırmaz; her atış bağımsızdır ve olasılık yine 1/6\'dır.',
      '<strong>"Ortalama 6 atışta bir" ifadesini garanti sanmak:</strong> Bu uzun vadeli ortalamadır. Altı atışta en az bir kez 7 gelme olasılığı yaklaşık %66,5\'tir, yüzde yüz değildir.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç, yüzleri 1\'den 6\'ya numaralı iki standart zarı ve her yüzün eşit olasılıkla geldiğini kabul eder. Hileli ya da aşınmış zarlar, farklı yüz sayılı zarlar ve üç ya da daha çok zarın toplamı bu hesabın dışındadır. Sonuçlar matematiksel olasılıktır; şans oyunlarında kazanç beklentisi oluşturmak için kullanılmamalıdır.',
    ] },
  ],
  faq: [
    ['İki zar atıldığında en çok hangi toplam gelir?', 'En olası toplam 7\'dir. 36 sonucun 6\'sı 7 verir; olasılık 1/6, yani yaklaşık %16,67\'dir. Ardından 5/36 olasılıkla 6 ve 8 gelir.'],
    ['Toplamın 7 gelme olasılığı kaçtır?', '6/36 = 1/6\'dır. Uygun çiftler (1,6), (2,5), (3,4), (4,3), (5,2) ve (6,1) olmak üzere altı tanedir.'],
    ['İki zarın aynı gelme (çift atma) olasılığı nedir?', '(1,1)\'den (6,6)\'ya altı çift vardır; olasılık 6/36 = 1/6\'dır. Belirli bir çiftin, örneğin düşeşin gelme olasılığı ise 1/36\'dır. Bu araç toplamlar üzerinden çalıştığı için çift atma olasılığını ayrıca hesaplamaz.'],
    ['Toplamın çift sayı gelme olasılığı kaçtır?', 'Çift toplamlar 2, 4, 6, 8, 10 ve 12\'dir; uygun durum sayıları 1 + 3 + 5 + 5 + 3 + 1 = 18 eder. Olasılık 18/36 = 1/2\'dir. Tek toplam gelme olasılığı da aynıdır.'],
    ['Toplamın asal sayı gelme olasılığı nedir?', '2 ile 12 arasındaki asal toplamlar 2, 3, 5, 7 ve 11\'dir. Uygun durumlar 1 + 2 + 4 + 6 + 2 = 15 olduğundan olasılık 15/36 = 5/12, yaklaşık %41,67\'dir.'],
    ['İki zarın toplamının beklenen değeri kaçtır?', 'Tek zarın beklenen değeri 3,5\'tir; iki zarın toplamının beklenen değeri 7 olur. Dağılım 7 çevresinde simetrik olduğu için en olası toplam ile ortalama aynı sayıya denk gelir.'],
    ['"En az" ve "en çok" koşulları nasıl hesaplanıyor?', 'Koşulu sağlayan her toplamın uygun durum sayıları toplanır. Örneğin "en az 10" için 10, 11 ve 12\'nin durumları 3 + 2 + 1 = 6 eder ve olasılık 6/36 bulunur. Koşula giren satırlar tabloda okla gösterilir.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; herhangi bir veri sunucuya iletilmez ya da saklanmaz.'],
  ],
  related: ['zar-olasiligi-hesapla', 'olasilik-hesapla', 'binom-dagilimi-hesapla', 'faktoriyel-hesapla', 'bowling-puani-hesapla'],
};
