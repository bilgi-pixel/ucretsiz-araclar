export default {
  slug: 'kolesterol-orani-hesapla',
  title: 'Kolesterol Oranı Hesaplama',
  h1Tail: 'toplam kolesterol / HDL',
  pageTitle: 'Kolesterol Oranı Hesaplama – Toplam Kolesterol HDL Oranı',
  description: 'Tahlil sonucunuzdaki toplam kolesterol ve HDL değerinden kolesterol oranını, non-HDL kolesterolü, LDL/HDL ve trigliserit/HDL oranlarını hesaplayın.',
  card: 'Toplam kolesterol ve HDL değerinizi girin; kolesterol oranını, non-HDL kolesterolü ve LDL/HDL oranını hesaplayın.',
  category: 'saglik',
  keywords: ['kolesterol oranı hesaplama', 'toplam kolesterol hdl oranı', 'ldl hdl oranı', 'non hdl kolesterol hesaplama', 'trigliserit hdl oranı', 'friedewald ldl hesaplama', 'kolesterol risk oranı'],
  lead: 'Kan tahlilinizdeki toplam kolesterol ve HDL değerlerini yazın; <strong>toplam kolesterol / HDL oranını</strong> ve <strong>non-HDL kolesterolü</strong> hesaplayın. LDL ya da trigliserit değerini de girerseniz LDL/HDL ve trigliserit/HDL oranları ile Friedewald formülüne göre tahmini LDL de gösterilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'toplam', label: 'Toplam kolesterol', type: 'number', placeholder: 'Örn. 200' },
    { id: 'hdl', label: 'HDL kolesterol', type: 'number', placeholder: 'Örn. 50' },
    { id: 'ldl', label: 'LDL kolesterol (isteğe bağlı)', type: 'number', placeholder: 'Örn. 130' },
    { id: 'tg', label: 'Trigliserit (isteğe bağlı)', type: 'number', placeholder: 'Örn. 150', hint: 'LDL boş, trigliserit doluysa LDL Friedewald formülüyle tahmin edilir.' },
    { id: 'birim', label: 'Birim', type: 'select', options: [['mgdl', 'mg/dL'], ['mmol', 'mmol/L']] },
  ],
  compute(v, h) {
    const mmol = v.birim === 'mmol';
    const b = mmol ? 'mmol/L' : 'mg/dL';
    const bos = (x) => String(x ?? '').trim() === '';
    const tk = h.pos(v.toplam, 'Toplam kolesterol');
    const hdl = h.pos(v.hdl, 'HDL kolesterol');
    if (hdl >= tk) h.err('HDL kolesterol toplam kolesterolden küçük olmalı; değerlerin yerini ve birimi kontrol edin.');
    const ust = mmol ? 30 : 1200;
    if (tk > ust) h.err(`"Toplam kolesterol" bu birim için çok yüksek görünüyor; birim seçimini (${b}) kontrol edin.`);
    if (!mmol && tk < 30) h.err('Değerler mg/dL için çok düşük görünüyor; tahliliniz mmol/L ise birimi değiştirin.');
    const oran = tk / hdl;
    const nonHdl = tk - hdl;
    const d = mmol ? 2 : 1;
    let yorum;
    if (oran < 3.5) yorum = 'Düşük oran (3,5\'in altı)';
    else if (oran <= 5) yorum = 'Orta oran (3,5 – 5 arası)';
    else yorum = 'Yüksek oran (5\'in üzeri)';
    const rows = [
      ['Toplam kolesterol / HDL oranı', h.fmt(oran, 2)],
      ['Oranın düzeyi', yorum],
      ['Non-HDL kolesterol', `${h.fmt(nonHdl, d)} ${b}`],
      ['HDL\'nin toplam içindeki payı', '%' + h.fmt((hdl / tk) * 100, 1)],
    ];
    let ldl = null;
    let tg = null;
    if (!bos(v.tg)) tg = h.pos(v.tg, 'Trigliserit');
    if (!bos(v.ldl)) {
      ldl = h.pos(v.ldl, 'LDL kolesterol');
      if (ldl >= tk) h.err('LDL kolesterol toplam kolesterolden küçük olmalı.');
    } else if (tg !== null) {
      const tgMg = mmol ? tg * 88.57 : tg;
      if (tgMg >= 400) rows.push(['Tahmini LDL (Friedewald)', 'Hesaplanamaz (trigliserit 400 mg/dL ve üzeri)']);
      else {
        const t = tk - hdl - tg / (mmol ? 2.2 : 5);
        if (t <= 0) rows.push(['Tahmini LDL (Friedewald)', 'Hesaplanamaz (değerler birbiriyle uyumsuz)']);
        else { ldl = t; rows.push(['Tahmini LDL (Friedewald)', `${h.fmt(ldl, d)} ${b}`]); }
      }
    }
    if (ldl !== null) rows.push(['LDL / HDL oranı', h.fmt(ldl / hdl, 2)]);
    if (tg !== null) {
      const tgMg = mmol ? tg * 88.57 : tg;
      const hdlMg = mmol ? hdl * 38.67 : hdl;
      rows.push(['Trigliserit / HDL oranı (mg/dL esaslı)', h.fmt(tgMg / hdlMg, 2)]);
    }
    return {
      rows,
      note: 'Oranlar tek başına tanı koydurmaz; kalp-damar riski yaş, tansiyon, sigara, diyabet ve aile öyküsüyle birlikte hekim tarafından değerlendirilir.',
    };
  },
  cases: [
    { in: { toplam: '200', hdl: '50', birim: 'mgdl' }, out: { 'Toplam kolesterol / HDL oranı': '4', 'Oranın düzeyi': 'Orta oran (3,5 – 5 arası)', 'Non-HDL kolesterol': '150 mg/dL', 'HDL\'nin toplam içindeki payı': '%25' } },
    { in: { toplam: '200', hdl: '50', ldl: '130', birim: 'mgdl' }, out: { 'Toplam kolesterol / HDL oranı': '4', 'LDL / HDL oranı': '2,6' } },
    { in: { toplam: '200', hdl: '50', tg: '150', birim: 'mgdl' }, out: { 'Tahmini LDL (Friedewald)': '120 mg/dL', 'LDL / HDL oranı': '2,4', 'Trigliserit / HDL oranı (mg/dL esaslı)': '3' } },
    { in: { toplam: '240', hdl: '40', birim: 'mgdl' }, out: { 'Toplam kolesterol / HDL oranı': '6', 'Oranın düzeyi': 'Yüksek oran (5\'in üzeri)', 'Non-HDL kolesterol': '200 mg/dL' } },
    { in: { toplam: '180', hdl: '60', birim: 'mgdl' }, out: { 'Toplam kolesterol / HDL oranı': '3', 'Oranın düzeyi': 'Düşük oran (3,5\'in altı)', 'Non-HDL kolesterol': '120 mg/dL' } },
    { in: { toplam: '5,2', hdl: '1,3', tg: '1,7', birim: 'mmol' }, out: { 'Toplam kolesterol / HDL oranı': '4', 'Non-HDL kolesterol': '3,9 mmol/L', 'Tahmini LDL (Friedewald)': '3,13 mmol/L' } },
    { in: { toplam: '230', hdl: '45', tg: '450', birim: 'mgdl' }, out: { 'Toplam kolesterol / HDL oranı': '5,11', 'Tahmini LDL (Friedewald)': 'Hesaplanamaz (trigliserit 400 mg/dL ve üzeri)', 'Trigliserit / HDL oranı (mg/dL esaslı)': '10' } },
    { in: { toplam: '50', hdl: '200', birim: 'mgdl' }, error: true },
    { in: { toplam: '', hdl: '50', birim: 'mgdl' }, error: true },
    { in: { toplam: '5,2', hdl: '1,3', birim: 'mgdl' }, error: true },
  ],
  howto: [
    'Tahlil sonucunuzda "Total kolesterol" ya da "Kolesterol (total)" satırındaki değeri "Toplam kolesterol" alanına yazın.',
    '"HDL kolesterol" alanına HDL değerini girin. Bu iki alan zorunludur.',
    'Varsa LDL ve trigliserit değerlerini de yazın; boş bırakırsanız ilgili oranlar hesaplanmaz.',
    'Tahlildeki birime göre mg/dL ya da mmol/L seçin. Türkiye\'deki laboratuvarların çoğu mg/dL kullanır.',
    '"Hesapla" düğmesine basın ve oranları inceleyin.',
  ],
  sections: [
    { h: 'Kolesterol oranı nedir?', p: [
      'Kandaki kolesterol, lipoprotein adı verilen taşıyıcı paketlerin içinde dolaşır. <strong>LDL</strong> kolesterolü dokulara taşır ve fazlası damar duvarında birikime katkıda bulunabilir; bu yüzden halk arasında "kötü kolesterol" olarak anılır. <strong>HDL</strong> ise fazla kolesterolü karaciğere geri taşır ve "iyi kolesterol" olarak bilinir. Toplam kolesterol bu ikisinin ve diğer lipoproteinlerin içindeki kolesterolün tamamıdır.',
      'Toplam kolesterolün tek başına yüksek olması her zaman aynı anlama gelmez; aynı toplam değere sahip iki kişiden HDL\'si yüksek olanın tablosu daha olumlu sayılır. <strong>Kolesterol oranı</strong> bu dengeyi tek bir sayıyla özetler: toplam kolesterol HDL\'ye bölünür. Sayı küçüldükçe HDL\'nin toplam içindeki payı büyümüş olur.',
    ] },
    { h: 'Formüller ve çözümlü örnek', p: [
      'Toplam kolesterol 200 mg/dL, HDL 50 mg/dL, trigliserit 150 mg/dL olan bir tahlili ele alalım.',
    ], ul: [
      '<strong>Toplam / HDL oranı</strong> = 200 ÷ 50 = 4',
      '<strong>Non-HDL kolesterol</strong> = toplam − HDL = 200 − 50 = 150 mg/dL',
      '<strong>Tahmini LDL (Friedewald)</strong> = toplam − HDL − trigliserit ÷ 5 = 200 − 50 − 30 = 120 mg/dL',
      '<strong>LDL / HDL oranı</strong> = 120 ÷ 50 = 2,4',
      '<strong>Trigliserit / HDL oranı</strong> = 150 ÷ 50 = 3',
    ] },
    { h: 'Oran nasıl yorumlanır?', p: [
      'Toplam kolesterol / HDL oranı için kaynaklarda sıkça anılan yaklaşık eşikler şöyledir: 5\'in üzerindeki oranlar yüksek, 3,5 ile 5 arası orta, 3,5\'in altı ise düşük kabul edilir ve düşük oran genellikle daha olumlu bir tabloya işaret eder. Araç "Oranın düzeyi" satırında bu kaba sınıflamayı kullanır. Bu eşikler kesin tanı sınırları değildir; laboratuvarlar ve kılavuzlar arasında farklılık görülebilir.',
      'Güncel kılavuzlar tedavi kararlarında çoğunlukla oranları değil, LDL kolesterolü ve kişinin toplam kalp-damar riskini esas alır. Hedef LDL değeri, kişinin risk grubuna göre değişir; daha önce kalp krizi geçirmiş ya da diyabeti olan biri için hedef, başka risk etkeni bulunmayan genç bir erişkinden çok daha düşüktür. Bu nedenle oranı bir tarama göstergesi olarak görmek, kararı ise hekime bırakmak gerekir.',
    ] },
    { h: 'Non-HDL kolesterol neden önemli?', p: [
      'Non-HDL kolesterol, toplam kolesterolden HDL çıkarılarak bulunur ve damar sertliğine katkıda bulunabilen bütün lipoproteinlerin taşıdığı kolesterolü tek sayıda toplar. Hesabı için açlık gerekmez ve trigliserit yüksek olduğunda bile güvenilir kalır. Bu özelliği nedeniyle özellikle trigliseriti yüksek, diyabetli ya da kilolu kişilerde LDL\'ye ek bir gösterge olarak kullanılır.',
    ] },
    { h: 'Friedewald formülünün sınırları', p: [
      'Birçok laboratuvar LDL\'yi doğrudan ölçmez, Friedewald formülüyle hesaplar: mg/dL biriminde LDL = toplam − HDL − trigliserit ÷ 5; mmol/L biriminde bölen 2,2\'dir. Formül, trigliseritin beşte birinin VLDL kolesterolüne karşılık geldiği varsayımına dayanır.',
      'Bu varsayım trigliserit yükseldikçe bozulur. Trigliserit 400 mg/dL ve üzerindeyse formül kullanılmaz; araç da bu durumda tahmini LDL vermez. Tokluk kanında ve LDL\'nin çok düşük olduğu durumlarda da sapma artar. Tahlil raporunuzda LDL değeri yazıyorsa onu doğrudan "LDL kolesterol" alanına girin; araç o zaman tahmin yapmaz, verdiğiniz değeri kullanır.',
    ] },
    { h: 'Birimler: mg/dL ve mmol/L', p: [
      'Türkiye\'de ve ABD\'de lipit değerleri çoğunlukla mg/dL ile, birçok Avrupa ülkesinde mmol/L ile bildirilir. Kolesterol için 1 mmol/L yaklaşık 38,67 mg/dL, trigliserit için 1 mmol/L yaklaşık 88,57 mg/dL\'dir. Toplam/HDL ve LDL/HDL oranları birimden bağımsızdır. Trigliserit/HDL oranı ise birime göre değiştiğinden araç bu oranı her zaman mg/dL üzerinden verir.',
    ] },
    { h: 'Uyarı', p: [
      'Bu hesaplama bilgilendirme amaçlıdır ve tıbbi değerlendirme yerine geçmez. Tahlil sonuçlarınızı, ilaç başlama ya da bırakma kararlarını ve beslenme düzeninizdeki köklü değişiklikleri mutlaka hekiminizle görüşün.',
    ] },
  ],
  faq: [
    ['Kolesterol oranı nasıl hesaplanır?', 'Toplam kolesterol değeri HDL kolesterol değerine bölünür. Örneğin toplam kolesterol 200 mg/dL, HDL 50 mg/dL ise oran 4 olur.'],
    ['Toplam kolesterol / HDL oranı kaç olmalı?', 'Yaygın yaklaşık eşiklere göre 5\'in altı istenir; 3,5\'in altı daha olumlu kabul edilir. Bu sınırlar genel bilgi niteliğindedir, kişisel hedefinizi hekiminiz belirler.'],
    ['LDL/HDL oranı ile toplam/HDL oranı arasındaki fark nedir?', 'İlki yalnızca LDL\'yi, ikincisi HDL dışındaki bütün kolesterolü de içeren toplam değeri HDL ile karşılaştırır. İkisi de aynı dengeyi farklı açıdan gösterir; toplam/HDL oranı için LDL değerine gerek yoktur.'],
    ['Non-HDL kolesterol nedir?', 'Toplam kolesterolden HDL\'nin çıkarılmasıyla bulunan değerdir. LDL ile birlikte diğer damar sertliğine katkıda bulunabilen lipoproteinlerin kolesterolünü de kapsar.'],
    ['Tahlilimde LDL yazmıyor, hesaplayabilir miyim?', 'Evet. Toplam kolesterol, HDL ve trigliserit değerlerini girip LDL alanını boş bırakırsanız araç Friedewald formülüyle tahmini LDL verir. Trigliserit 400 mg/dL ve üzerindeyse tahmin yapılmaz.'],
    ['Oranlar için aç olmak gerekir mi?', 'Toplam kolesterol ve HDL tokluktan az etkilenir, dolayısıyla toplam/HDL oranı ve non-HDL büyük ölçüde değişmez. Trigliserit ise yemekten sonra yükselir; trigliserite dayanan hesaplar için açlık kanı tercih edilir.'],
    ['HDL\'m yüksekse toplam kolesterolün yüksek olması sorun değil midir?', 'Yüksek HDL oranı iyileştirir ancak tek başına güvence değildir. LDL düzeyi ve diğer risk etkenleri de değerlendirilmelidir; yorumu hekiminize bırakın.'],
    ['Tahlil değerlerim bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['tansiyon-degerlendirme', 'vki-hesapla', 'bel-kalca-orani-hesapla', 'kan-sekeri-birim-cevir', 'hba1c-ortalama-seker-hesapla'],
};
