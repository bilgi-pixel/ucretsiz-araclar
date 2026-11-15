export default {
  slug: 'kek-kalibi-donustur',
  title: 'Kek Kalıbı Boyutu Dönüştürme',
  h1Tail: 'tarifi yeni kalıba uyarlayın',
  pageTitle: 'Kek Kalıbı Boyutu Dönüştürme – Tarif Çarpanı Hesaplama',
  description: 'Tarifteki kalıp ile elinizdeki kalıbın ölçülerini girin; malzemeleri kaçla çarpmanız gerektiğini bulun. Yuvarlak, kare ve dikdörtgen kalıplar arasında dönüşüm yapar.',
  card: 'Tarifi farklı çapta ya da şekildeki kalıba uyarlamak için malzeme çarpanını taban alanı üzerinden hesaplayın.',
  category: 'gunluk',
  keywords: ['kek kalıbı dönüştürme', 'kalıp boyutu hesaplama', '20 cm kalıp 24 cm kalıp', 'tarif çarpanı', 'yuvarlak kalıp kare kalıp', 'kek kalıbı ölçüleri', 'kalıp değiştirme hesaplama'],
  lead: 'Tarif 20 cm\'lik kalıp için yazılmış ama sizin kalıbınız 24 cm mi? İki kalıbın ölçülerini girin; araç taban alanlarını karşılaştırarak <strong>malzemeleri kaçla çarpmanız gerektiğini</strong> söyler. İsterseniz bir malzemenin miktarını yazıp yeni değerini doğrudan görebilirsiniz.',
  button: 'Dönüştür',
  inputs: [
    { id: 'kaynakSekil', label: 'Tarifteki kalıbın şekli', type: 'select', options: [['yuvarlak', 'Yuvarlak'], ['dikdortgen', 'Kare / dikdörtgen']] },
    { id: 'kaynakA', label: 'Tarifteki kalıp: çap ya da 1. kenar (cm)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'kaynakB', label: 'Tarifteki kalıp: 2. kenar (cm)', type: 'number', placeholder: 'Kare ya da yuvarlaksa boş bırakın' },
    { id: 'hedefSekil', label: 'Elimdeki kalıbın şekli', type: 'select', options: [['yuvarlak', 'Yuvarlak'], ['dikdortgen', 'Kare / dikdörtgen']] },
    { id: 'hedefA', label: 'Elimdeki kalıp: çap ya da 1. kenar (cm)', type: 'number', placeholder: 'Örn. 24' },
    { id: 'hedefB', label: 'Elimdeki kalıp: 2. kenar (cm)', type: 'number', placeholder: 'Kare ya da yuvarlaksa boş bırakın' },
    { id: 'miktar', label: 'Bir malzemenin tarifteki miktarı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 200', hint: 'Birim fark etmez: gram, mililitre, adet ya da su bardağı.' },
  ],
  compute(v, h) {
    const alan = (sekil, aMetin, bMetin, ad) => {
      const a = h.pos(aMetin, ad + ' ölçüsü');
      if (a > 200) h.err(ad + ' ölçüsü 200 cm\'den büyük olamaz; değeri santimetre olarak yazdığınızdan emin olun.');
      if (sekil === 'dikdortgen') {
        const b = String(bMetin ?? '').trim() === '' ? a : h.pos(bMetin, ad + ' 2. kenarı');
        if (b > 200) h.err(ad + ' 2. kenarı 200 cm\'den büyük olamaz.');
        return a * b;
      }
      return Math.PI * a * a / 4;
    };
    const A1 = alan(v.kaynakSekil, v.kaynakA, v.kaynakB, 'Tarifteki kalıp');
    const A2 = alan(v.hedefSekil, v.hedefA, v.hedefB, 'Elimdeki kalıp');
    const k = A2 / A1;
    const yuzde = (k - 1) * 100;
    const degisim = Math.abs(yuzde) < 0.05 ? 'Aynı miktar' : '%' + h.fmt(Math.abs(yuzde), 1) + (yuzde > 0 ? ' daha fazla' : ' daha az');
    const rows = [
      ['Malzeme çarpanı', h.fmt(k, 2) + ' kat'],
      ['Malzeme değişimi', degisim],
      ['Tarifteki kalıbın taban alanı', h.fmt(A1, 1) + ' cm²'],
      ['Elimdeki kalıbın taban alanı', h.fmt(A2, 1) + ' cm²'],
    ];
    if (String(v.miktar ?? '').trim() !== '') {
      const m = h.pos(v.miktar, 'Malzeme miktarı');
      rows.push(['Yeni malzeme miktarı', h.fmt(m * k, 2)]);
    }
    return {
      rows,
      note: 'Çarpan, hamur yüksekliğinin aynı kalması için taban alanlarının oranıdır. Pişirme süresi çarpanla orantılı değişmez; keki kürdan testiyle denetleyin.',
    };
  },
  cases: [
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '20', hedefSekil: 'yuvarlak', hedefA: '24', miktar: '200' }, out: { 'Malzeme çarpanı': '1,44 kat', 'Malzeme değişimi': '%44 daha fazla', 'Tarifteki kalıbın taban alanı': '314,2 cm²', 'Elimdeki kalıbın taban alanı': '452,4 cm²', 'Yeni malzeme miktarı': '288' } },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '20', hedefSekil: 'dikdortgen', hedefA: '20' }, out: { 'Malzeme çarpanı': '1,27 kat', 'Elimdeki kalıbın taban alanı': '400 cm²' } },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '24', hedefSekil: 'yuvarlak', hedefA: '18' }, out: { 'Malzeme çarpanı': '0,56 kat', 'Tarifteki kalıbın taban alanı': '452,4 cm²', 'Elimdeki kalıbın taban alanı': '254,5 cm²' } },
    { in: { kaynakSekil: 'dikdortgen', kaynakA: '20', kaynakB: '30', hedefSekil: 'yuvarlak', hedefA: '26' }, out: { 'Malzeme çarpanı': '0,88 kat', 'Tarifteki kalıbın taban alanı': '600 cm²', 'Elimdeki kalıbın taban alanı': '530,9 cm²' } },
    { in: { kaynakSekil: 'dikdortgen', kaynakA: '25', kaynakB: '35', hedefSekil: 'dikdortgen', hedefA: '30', hedefB: '40', miktar: '3' }, out: { 'Malzeme çarpanı': '1,37 kat', 'Tarifteki kalıbın taban alanı': '875 cm²', 'Elimdeki kalıbın taban alanı': '1.200 cm²', 'Yeni malzeme miktarı': '4,11' } },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '18', hedefSekil: 'yuvarlak', hedefA: '18' }, out: { 'Malzeme çarpanı': '1 kat', 'Malzeme değişimi': 'Aynı miktar' } },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '20', hedefSekil: 'yuvarlak', hedefA: '' }, error: true },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '0', hedefSekil: 'yuvarlak', hedefA: '24' }, error: true },
    { in: { kaynakSekil: 'yuvarlak', kaynakA: '20', hedefSekil: 'yuvarlak', hedefA: '2400' }, error: true },
  ],
  howto: [
    'Tarifin yazıldığı kalıbın şeklini seçin ve ölçüsünü santimetre olarak girin: yuvarlak kalıpta çapı, kare kalıpta bir kenarı yazmanız yeterlidir.',
    'Dikdörtgen kalıpta ikinci kenarı da yazın; kare ve yuvarlak kalıplarda bu alanı boş bırakın.',
    'Aynı bilgileri kullanacağınız kalıp için doldurun.',
    'İsterseniz tarifteki bir malzemenin miktarını yazın; araç yeni kalıp için gereken miktarı da hesaplar.',
    '"Dönüştür" düğmesine basın ve çıkan çarpanı tarifteki bütün malzemelere uygulayın.',
  ],
  sections: [
    { h: 'Çarpan neden çapın değil alanın oranıdır?', p: [
      'Kalıp değiştirirken en sık yapılan hata, çapların oranını kullanmaktır: 20 cm\'den 24 cm\'ye geçerken malzemeyi 24 ÷ 20 = 1,2 ile çarpmak. Oysa hamur kalıbın tabanına yayılır ve taban alanı çapın <strong>karesiyle</strong> büyür. Hamurun aynı yükseklikte olması için gereken çarpan alanların oranıdır: (24 ÷ 20)² = <strong>1,44</strong>. Yani dört santimetrelik çap farkı, malzemede yüzde 44\'lük artış demektir.',
      'Araç her kalıbın taban alanını hesaplar ve ikincisini birincisine böler. Yuvarlak kalıpta alan <strong>π × çap² ÷ 4</strong>, kare ve dikdörtgen kalıpta <strong>kenar × kenar</strong> formülüyle bulunur. Kalıpların yüksekliği hesaba girmez, çünkü amaç hamur kalınlığını tarifteki gibi tutmaktır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>20 cm yuvarlaktan 24 cm yuvarlağa.</strong> Alanlar 314,2 cm² ve 452,4 cm², çarpan 1,44. Tarifte 200 gram un varsa yeni miktar 200 × 1,44 = <strong>288 gram</strong> olur. Üç yumurta 4,32 yumurtaya karşılık gelir; pratikte dört yumurta kullanılır.',
      '<strong>20 cm yuvarlaktan 20 cm kareye.</strong> Aynı ölçüdeki kare kalıp yuvarlaktan daha büyüktür, çünkü köşeler de dolar. Alanlar 314,2 cm² ve 400 cm², çarpan <strong>1,27</strong>. Tarifi değiştirmeden kare kalıba dökerseniz kek yaklaşık beşte bir oranında daha alçak olur.',
      '<strong>24 cm yuvarlaktan 18 cm yuvarlağa.</strong> Çarpan (18 ÷ 24)² = 0,5625, yani yaklaşık <strong>0,56</strong>. Tarifin yarısından biraz fazlası yeterlidir; pratikte tarifi yarıya indirip biraz daha alçak bir kek elde etmek de mümkündür.',
    ] },
    { h: 'Sık kullanılan yuvarlak kalıp dönüşümleri', ul: [
      '<strong>18 cm → 20 cm:</strong> 1,23 kat',
      '<strong>18 cm → 24 cm:</strong> 1,78 kat',
      '<strong>20 cm → 22 cm:</strong> 1,21 kat',
      '<strong>20 cm → 26 cm:</strong> 1,69 kat',
      '<strong>22 cm → 26 cm:</strong> 1,4 kat',
      '<strong>24 cm → 20 cm:</strong> 0,69 kat',
      '<strong>26 cm → 22 cm:</strong> 0,72 kat',
      '<strong>28 cm → 24 cm:</strong> 0,73 kat',
    ] },
    { h: 'Çarpanı uygularken', p: [
      'Çarpanı bütün malzemelere aynı şekilde uygulayın: un, şeker, yağ, sıvılar ve kabartıcılar birlikte ölçeklenir. Gramla ölçülen malzemelerde bu kolaydır. Yumurta gibi tam adetle kullanılan malzemelerde sonucu en yakın tam sayıya yuvarlayın; arada kalıyorsanız yumurtayı çırpıp tartarak kullanabilir ya da aradaki farkı bir iki kaşık sıvıyla dengeleyebilirsiniz.',
      'Çarpan 1\'e çok yakınsa (0,9 ile 1,1 arası) tarifi değiştirmeden kullanmak çoğu zaman sorun çıkarmaz; kek yalnızca birkaç milimetre daha ince ya da kalın olur. Çarpan 1,5\'i aşıyorsa tarifi bir buçuk ya da iki kat yapıp artan hamuru küçük bir kalıpta ya da kâğıt kapsüllerde pişirmek, ondalıklı miktarlarla uğraşmaktan daha rahat olabilir.',
    ] },
    { h: 'Pişirme süresi ve sıcaklık', p: [
      'Hamur yüksekliği aynı kaldığında pişirme süresi malzeme çarpanı kadar değişmez; çünkü ısının hamurun ortasına ulaşması gereken mesafe esas olarak kalınlığa bağlıdır. Yine de geniş kalıpta merkez kenarlardan daha uzaktadır ve pişme biraz uzayabilir; küçük kalıpta ise kısalabilir. Sıcaklığı tarifteki gibi bırakıp keki tarifte verilen sürenin biraz öncesinden başlayarak kürdan ya da şiş batırarak denetlemek en güvenli yoldur.',
      'Tarifi değiştirmeden farklı kalıba dökerseniz durum değişir: hamur daha ince yayılırsa daha çabuk pişer ve kuruyabilir, daha kalın kalırsa ortası geç pişer ve üstü fazla kızarabilir. Kalıbı hiçbir zaman ağzına kadar doldurmayın; kabaran hamur için pay bırakın.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap, düz tabanlı ve kenarları dik kalıplar içindir. Ortası delikli kalıplar, kenarları eğimli tart kalıpları, kalp ya da yıldız biçimli kalıplar için taban alanı bu formüllerle bulunamaz. Böyle kalıplarda en pratik yöntem hacim karşılaştırmasıdır: iki kalıbı da aynı yüksekliğe kadar suyla doldurup suyu ölçün ve iki hacmin oranını çarpan olarak kullanın. Kalıp ölçüsünü üst kenardan değil, tabandan ve içten içe almaya dikkat edin; etiketteki ölçü çoğu zaman üst çaptır.',
    ] },
  ],
  faq: [
    ['20 cm kalıp tarifini 24 cm kalıba nasıl uyarlarım?', 'Bütün malzemeleri 1,44 ile çarpın. Bu değer, iki kalıbın taban alanlarının oranıdır: (24 ÷ 20)² = 1,44. Örneğin 200 gram un 288 grama çıkar.'],
    ['Neden çapların oranını kullanamıyorum?', 'Çünkü hamur miktarı çapla değil alanla orantılıdır ve alan çapın karesiyle artar. Çap oranı 1,2 iken alan oranı 1,44\'tür; çap oranını kullanırsanız kek belirgin biçimde alçak kalır.'],
    ['Yuvarlak kalıp tarifini kare kalıpta yapabilir miyim?', 'Evet. İki şekli seçip ölçüleri girin. Aynı ölçüdeki kare kalıp yuvarlaktan yaklaşık yüzde 27 daha büyüktür; 20 cm yuvarlak tarif, yaklaşık 18 cm\'lik kare kalıba değişiklik yapmadan uyar.'],
    ['Pişirme süresini de çarpanla çarpmalı mıyım?', 'Hayır. Hamur kalınlığı aynı kaldığı için süre çarpan kadar değişmez. Tarifteki süreyi başlangıç noktası alın ve keki kürdan testiyle denetleyin; büyük kalıplarda biraz uzayabilir.'],
    ['Kalıp yüksekliği hesaba neden girmiyor?', 'Amaç hamurun tarifteki kalınlıkta olmasıdır; bu yalnızca taban alanına bağlıdır. Kalıbınızın yüksekliği, kabaran hamuru taşırmayacak kadar olmalıdır.'],
    ['Çarpan 4,32 yumurta gibi bir sonuç verirse ne yapmalıyım?', 'En yakın tam sayıya yuvarlayın. Hassas tariflerde yumurtaları çırpıp tartarak tam miktarı alabilir ya da eksik kalan kısmı az miktarda süt ya da suyla tamamlayabilirsiniz.'],
    ['Kelepçeli kalıp ve tepsi için de geçerli mi?', 'Evet. Tabanı düz ve kenarları dik olan her kalıp ve tepsi için aynı hesap geçerlidir. Borulu ya da şekilli kalıplarda su ile hacim ölçmek daha doğru sonuç verir.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; hiçbir bilgi sunucuya gönderilmez.'],
  ],
  related: ['tarif-olcekle', 'yumurta-boyutu-donustur', 'mutfak-olcu-donustur', 'su-bardagi-gram-cevir', 'oran-oranti-hesapla'],
};
