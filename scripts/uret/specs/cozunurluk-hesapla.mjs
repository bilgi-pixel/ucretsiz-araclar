export default {
  slug: 'cozunurluk-hesapla',
  title: 'Çözünürlük Hesaplama',
  h1Tail: 'g/100 g su',
  pageTitle: 'Çözünürlük Hesaplama – Doymuş Çözelti ve Çöken Madde Miktarı',
  description: 'Çözünürlüğü g/100 g su olarak hesaplayın; belirli miktar suda en çok kaç gram madde çözüneceğini, çözeltinin doymuş olup olmadığını ve soğutunca çöken miktarı bulun.',
  card: 'Çözünürlüğü g/100 g su olarak bulun; suda en çok çözünecek miktarı, doymuşluk durumunu ve soğutunca çöken maddeyi hesaplayın.',
  category: 'bilim',
  keywords: ['çözünürlük hesaplama', 'çözünürlük formülü', 'doymuş çözelti hesaplama', 'g/100 g su', 'çöken madde miktarı', 'doymamış çözelti', 'çözünürlük soruları', 'kristallenme hesaplama'],
  lead: 'Bir maddenin <strong>çözünürlüğünü</strong> (100 gram suda çözünen gram miktarı) hesaplayın ya da bilinen çözünürlükten yola çıkarak elinizdeki suda en çok ne kadar madde çözüneceğini, çözeltinin doymuş mu doymamış mı olduğunu ve soğutma sonucu ne kadar katının çökeceğini bulun.',
  button: 'Hesapla',
  inputs: [
    { id: 'su', label: 'Su kütlesi (g)', type: 'number', placeholder: 'Örn. 200' },
    { id: 'cozunen', label: 'Eklenen madde kütlesi (g)', type: 'number', placeholder: 'Örn. 72', hint: 'Çözünürlük alanı boşsa bu miktarın suyu tam doyurduğu kabul edilir.' },
    { id: 'cozunurluk', label: 'Çözünürlük (g/100 g su)', type: 'number', placeholder: 'Boş = hesaplanacak', hint: 'Biliniyorsa yazın; boş bırakırsanız su ve madde kütlesinden hesaplanır.' },
    { id: 'soguk', label: 'Soğutulan sıcaklıktaki çözünürlük (g/100 g su, isteğe bağlı)', type: 'number', hint: 'Çözelti soğutulduğunda çöken madde miktarını görmek için düşük sıcaklıktaki çözünürlüğü yazın.' },
  ],
  compute(v, h) {
    const bos = (s) => String(s ?? '').trim() === '';
    const su = h.pos(v.su, 'Su kütlesi');
    const rows = [];
    let S;
    let cozunmus;
    if (bos(v.cozunurluk)) {
      if (bos(v.cozunen)) h.err('Çözünürlüğü ya da eklenen madde kütlesini yazın; ikisi birden boş bırakılamaz.');
      const m = h.pos(v.cozunen, 'Eklenen madde kütlesi');
      S = m / su * 100;
      cozunmus = m;
      rows.push(['Çözünürlük', h.fmt(S, 2) + ' g/100 g su']);
    } else {
      S = h.pos(v.cozunurluk, 'Çözünürlük');
      const enCok = S * su / 100;
      rows.push(['En çok çözünebilen madde', h.fmt(enCok, 2) + ' g']);
      if (bos(v.cozunen)) {
        cozunmus = enCok;
        rows.push(['Durum', 'Doymuş çözelti için gereken miktar gösterildi']);
      } else {
        const m = h.nonneg(v.cozunen, 'Eklenen madde kütlesi');
        if (m < enCok - 1e-9) {
          cozunmus = m;
          rows.push(['Durum', 'Doymamış']);
          rows.push(['Doyurmak için eklenmesi gereken', h.fmt(enCok - m, 2) + ' g']);
        } else if (m <= enCok + 1e-9) {
          cozunmus = enCok;
          rows.push(['Durum', 'Doymuş']);
        } else {
          cozunmus = enCok;
          rows.push(['Durum', 'Doymuş, dipte çözünmemiş katı var']);
          rows.push(['Çözünmeden kalan', h.fmt(m - enCok, 2) + ' g']);
        }
        rows.push(['Çözünen madde', h.fmt(cozunmus, 2) + ' g']);
      }
    }
    rows.push(['Çözelti kütlesi', h.fmt(su + cozunmus, 2) + ' g']);
    rows.push(['Kütlece yüzde derişim', '%' + h.fmt(cozunmus / (su + cozunmus) * 100, 2)]);
    if (!bos(v.soguk)) {
      const S2 = h.nonneg(v.soguk, 'Soğutulan sıcaklıktaki çözünürlük');
      if (S2 > S + 1e-9) h.err('Soğutulan sıcaklıktaki çözünürlük, ilk çözünürlükten büyük olamaz. Değerleri kontrol edin.');
      const kalan = Math.min(cozunmus, S2 * su / 100);
      rows.push(['Soğutunca çöken madde', h.fmt(cozunmus - kalan, 2) + ' g']);
      rows.push(['Soğutulmuş çözeltide kalan madde', h.fmt(kalan, 2) + ' g']);
    }
    return { rows, note: 'Çözünürlük 100 g su başına tanımlanmıştır. Çökme hesabında suyun buharlaşmadığı ve çözeltinin aşırı doymuş kalmadığı varsayılır.' };
  },
  cases: [
    { in: { su: '200', cozunen: '72' }, out: { 'Çözünürlük': '36 g/100 g su', 'Çözelti kütlesi': '272 g', 'Kütlece yüzde derişim': '%26,47' } },
    { in: { su: '100', cozunen: '50', cozunurluk: '36' }, out: { 'En çok çözünebilen madde': '36 g', 'Durum': 'Doymuş, dipte çözünmemiş katı var', 'Çözünmeden kalan': '14 g', 'Çözelti kütlesi': '136 g' } },
    { in: { su: '250', cozunurluk: '36' }, out: { 'En çok çözünebilen madde': '90 g', 'Çözelti kütlesi': '340 g', 'Kütlece yüzde derişim': '%26,47' } },
    { in: { su: '100', cozunen: '20', cozunurluk: '36' }, out: { 'Durum': 'Doymamış', 'Doyurmak için eklenmesi gereken': '16 g', 'Çözelti kütlesi': '120 g', 'Kütlece yüzde derişim': '%16,67' } },
    { in: { su: '200', cozunurluk: '110', soguk: '32' }, out: { 'En çok çözünebilen madde': '220 g', 'Soğutunca çöken madde': '156 g', 'Soğutulmuş çözeltide kalan madde': '64 g' } },
    { in: { su: '50', cozunen: '20', cozunurluk: '40' }, out: { 'Durum': 'Doymuş', 'Çözünen madde': '20 g', 'Kütlece yüzde derişim': '%28,57' } },
    { in: { su: '100', cozunen: '40', cozunurluk: '110', soguk: '32' }, out: { 'Durum': 'Doymamış', 'Soğutunca çöken madde': '8 g' } },
    { in: { su: '0', cozunen: '20' }, error: true },
    { in: { su: '100' }, error: true },
    { in: { su: '100', cozunurluk: '30', soguk: '50' }, error: true },
  ],
  howto: [
    'Su kütlesini gram olarak yazın. Suyun yoğunluğu yaklaşık 1 g/mL olduğundan 200 mL su için 200 yazabilirsiniz.',
    'Çözünürlüğü <strong>bulmak</strong> istiyorsanız suyu tam doyuran madde miktarını "Eklenen madde kütlesi" alanına yazıp çözünürlük alanını boş bırakın.',
    'Çözünürlük <strong>biliniyorsa</strong> ilgili alana yazın. Madde kütlesini boş bırakırsanız doymuş çözelti için gereken miktar, doldurursanız çözeltinin doymuş olup olmadığı hesaplanır.',
    'Sıcak çözeltinin soğutulmasıyla ilgili bir soru çözüyorsanız düşük sıcaklıktaki çözünürlüğü son alana girin.',
    '"Hesapla" düğmesine basın ve sonuç satırlarından çözünen miktarı, çözelti kütlesini, yüzde derişimi ve varsa çöken maddeyi okuyun.',
  ],
  sections: [
    { h: 'Çözünürlük nedir?', p: [
      'Çözünürlük, belirli bir sıcaklıkta belirli miktardaki çözücüde çözünebilen en fazla madde miktarıdır. Okul kimyasında ve çözünürlük tablolarında en yaygın gösterim <strong>g/100 g su</strong> biçimidir: 100 gram suyu doygunluğa ulaştıran madde kütlesi. Örneğin sofra tuzunun oda sıcaklığındaki çözünürlüğü yaklaşık 36 g/100 g sudur; 100 gram suya 36 gramdan fazla tuz eklenirse fazlası çözünmeden dipte kalır.',
      'Çözünürlüğe ulaşmış çözeltiye <strong>doymuş</strong>, daha az madde içerene <strong>doymamış</strong> çözelti denir. Özel koşullarda, sıcak doymuş bir çözelti sarsılmadan yavaşça soğutulursa çözünürlüğün izin verdiğinden fazla maddeyi bir süre çözünmüş hâlde tutabilir; bu kararsız duruma aşırı doymuş çözelti adı verilir.',
    ] },
    { h: 'Hesaplama formülleri', p: [
      'Çözünürlük orantıyla bulunur: <strong>Çözünürlük = çözünen kütlesi ÷ su kütlesi × 100</strong>. Tersine, çözünürlük (S) biliniyorsa belirli miktar suda en çok çözünecek madde <strong>m = S × su kütlesi ÷ 100</strong> olur. Doymuş çözeltinin kütlesi su ile çözünenin toplamıdır ve kütlece yüzde derişimi <strong>S ÷ (100 + S) × 100</strong> bağıntısıyla hesaplanır.',
      'Dikkat edilmesi gereken nokta, çözünürlüğün 100 gram <em>çözelti</em> değil 100 gram <em>su</em> başına tanımlanmasıdır. Çözünürlüğü 36 g/100 g su olan bir maddenin doymuş çözeltisi kütlece %36 değil, 36 ÷ 136 × 100 = %26,47\'dir.',
    ] },
    { h: 'Çözümlü örnek: çözünürlüğü bulma', p: [
      'Belirli bir sıcaklıkta 200 gram su en çok 72 gram tuz çözebiliyor. Çözünürlük 72 ÷ 200 × 100 = <strong>36 g/100 g su</strong> olur. Oluşan doymuş çözelti 200 + 72 = 272 gramdır ve kütlece yüzde derişimi 72 ÷ 272 × 100 = %26,47\'dir.',
      'Aynı çözünürlükle 250 gram suda en çok 36 × 250 ÷ 100 = 90 gram tuz çözünür; çözelti 340 gram gelir. Derişim yine %26,47\'dir, çünkü doymuş çözeltinin derişimi miktara değil yalnızca sıcaklığa bağlıdır.',
    ] },
    { h: 'Çözümlü örnek: doymuş mu, doymamış mı?', p: [
      'Çözünürlüğü 36 g/100 g su olan tuzdan 100 gram suya 50 gram ekleniyor. Su en çok 36 gram çözebildiğinden 50 − 36 = <strong>14 gram</strong> tuz dipte kalır; çözelti doymuştur ve kütlesi 136 gramdır (dipteki katı çözelti kütlesine sayılmaz).',
      'Aynı suya yalnızca 20 gram tuz eklenseydi tamamı çözünür, çözelti doymamış olurdu. Doygunluğa ulaşmak için 36 − 20 = 16 gram daha tuz eklenebilir. Bu çözeltinin derişimi 20 ÷ 120 × 100 = %16,67\'dir.',
    ] },
    { h: 'Sıcaklık etkisi ve soğutunca çöken madde', p: [
      'Katıların çoğunun sudaki çözünürlüğü sıcaklık yükseldikçe artar; gazların çözünürlüğü ise azalır. Sıcakta hazırlanan doymuş bir çözelti soğutulduğunda su artık o kadar maddeyi tutamaz ve aradaki fark kristal olarak çöker. Çöken miktar şu bağıntıyla bulunur: <strong>çöken = (S<sub>sıcak</sub> − S<sub>soğuk</sub>) × su kütlesi ÷ 100</strong>.',
      'Örnek: bir tuzun çözünürlüğü yüksek sıcaklıkta 110, düşük sıcaklıkta 32 g/100 g su olsun (potasyum nitratın 60 °C ve 20 °C dolayındaki değerlerine yakın sayılardır). 200 gram suyla hazırlanan sıcak doymuş çözeltide 220 gram madde çözünmüştür. Soğutulunca su yalnızca 64 gram tutabilir ve 220 − 64 = <strong>156 gram</strong> madde çöker. Çözelti başlangıçta doymamışsa çöken miktar daha az olur: 100 gram suda 40 gram madde varsa soğutulduğunda yalnızca 40 − 32 = 8 gram çöker.',
      'Kesin çözünürlük değerleri maddeye ve sıcaklığa göre değişir; sorudaki tabloyu ya da güvenilir bir çözünürlük eğrisini esas alın.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Çözünürlüğü 100 gram çözeltiye göre düşünmek. Tanım 100 gram su içindir.',
      'Çözünmeden kalan katıyı çözelti kütlesine eklemek. Dipteki katı ayrı bir fazdır.',
      'Soru çözelti kütlesini verdiğinde onu su kütlesi gibi kullanmak. Önce orantıyla suyu ayırın: çözünürlük 36 ise 136 gram doymuş çözeltide 100 gram su vardır.',
      'Soğutma sorularında suyun bir kısmının buharlaştığı durumları göz ardı etmek. Araç su kütlesinin değişmediğini varsayar.',
      'Kristal suyu ile çöken tuzlarda (hidratlarda) çöken katı bir miktar suyu da beraberinde götürür; bu durum burada hesaba katılmaz.',
    ], p: [
      'Araç yalnızca suyu çözücü kabul eden, g/100 g su tanımına dayalı orantı hesapları yapar. Az çözünen tuzlardaki çözünürlük çarpımı (K<sub>çç</sub>) ve ortak iyon etkisi gibi denge hesapları kapsam dışındadır.',
    ] },
  ],
  faq: [
    ['Çözünürlük nasıl hesaplanır?', 'Suyu tam doyuran madde kütlesi su kütlesine bölünür ve 100 ile çarpılır. 200 gram suda en çok 72 gram madde çözünüyorsa çözünürlük 72 ÷ 200 × 100 = 36 g/100 g sudur.'],
    ['Doymuş çözeltinin yüzde derişimi çözünürlüğe eşit midir?', 'Hayır. Çözünürlük 100 gram suya, yüzde derişim 100 gram çözeltiye göredir. Çözünürlüğü S olan maddenin doymuş çözeltisi kütlece S ÷ (100 + S) × 100 yüzdeliktir; S = 36 için %26,47.'],
    ['Çözeltinin doymuş olup olmadığını nasıl anlarım?', 'Eklenen maddeyi, o miktar suda çözünebilecek en yüksek miktarla (S × su ÷ 100) karşılaştırın. Eklenen daha azsa doymamış, eşitse doymuş, fazlaysa doymuştur ve aradaki fark dipte katı olarak kalır.'],
    ['Soğutulunca çöken madde nasıl bulunur?', 'İki sıcaklıktaki çözünürlük farkı su kütlesiyle çarpılıp 100\'e bölünür. Çözelti başlangıçta doymamışsa çözünmüş madde miktarından, soğuk suda çözünebilecek en yüksek miktar çıkarılır.'],
    ['Su miktarını mililitre olarak girebilir miyim?', 'Evet, oda sıcaklığı dolayında suyun yoğunluğu yaklaşık 1 g/mL olduğundan mililitre değeri gram yerine yazılabilir. Hassas hesapta sıcaklığa bağlı küçük yoğunluk farkı vardır.'],
    ['Sıcaklık çözünürlüğü nasıl etkiler?', 'Katıların çoğunda sıcaklık arttıkça çözünürlük artar, gazlarda ise azalır. Bu yüzden çözünürlük değeri her zaman sıcaklıkla birlikte verilir; araçta kullandığınız değerin doğru sıcaklığa ait olduğundan emin olun.'],
    ['Aşırı doymuş çözelti bu hesapta nasıl ele alınır?', 'Ele alınmaz. Araç, çözünürlüğü aşan maddenin tamamının katı olarak ayrıldığını varsayar. Aşırı doymuş çözeltiler kararsızdır ve küçük bir sarsıntı ya da kristal eklenmesiyle fazla madde hızla çöker.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız kütle ve çözünürlük değerleri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kutlece-yuzde-derisim-hesapla', 'karisim-derisimi-hesapla', 'molarite-hesapla', 'molalite-hesapla', 'seyreltme-hesapla'],
};
