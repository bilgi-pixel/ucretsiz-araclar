export default {
  slug: 'saat-acisi-hesapla',
  title: 'Akrep Yelkovan Açısı Hesaplama',
  h1Tail: 'saat kaçta kaç derece?',
  pageTitle: 'Akrep Yelkovan Açısı Hesaplama – Saat Açı Problemleri Çözücü',
  description: 'Saati ve dakikayı yazın, akrep ile yelkovan arasındaki küçük ve büyük açıyı derece olarak görün. Formül, çözümlü örnekler ve saat problemleri için ipuçları.',
  card: 'Verilen saatte akrep ile yelkovan arasındaki küçük ve büyük açıyı, ibrelerin konumlarını ve açı türünü hesaplayın.',
  category: 'zaman',
  keywords: ['akrep yelkovan açısı', 'saat açısı hesaplama', 'akrep ile yelkovan arasındaki açı', 'saat problemleri', 'saat 3.30 da açı', 'akrep yelkovan formülü', 'saat açı sorusu'],
  lead: 'Analog bir saatte akrep ile yelkovan arasındaki açıyı bulun. Saati ve dakikayı yazmanız yeterli; araç <strong>küçük açıyı</strong>, <strong>büyük açıyı</strong>, her iki ibrenin 12\'ye göre konumunu ve açının türünü (dar, dik, geniş, doğru) verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'saat', label: 'Saat', type: 'number', placeholder: 'Örn. 3', hint: '0–23 arası tam sayı; 15 yazarsanız 3 olarak değerlendirilir.' },
    { id: 'dakika', label: 'Dakika', type: 'number', placeholder: 'Örn. 30', value: '0', hint: '0 ile 60 arası; 12,5 gibi ondalıklı dakika da yazabilirsiniz.' },
  ],
  compute(v, h) {
    const s = h.int(v.saat, 'Saat');
    if (s < 0 || s > 23) h.err('"Saat" 0 ile 23 arasında olmalı.');
    const d = h.nonneg(v.dakika, 'Dakika');
    if (d >= 60) h.err('"Dakika" 60\'tan küçük olmalı (0–59,99).');
    const akrep = (s % 12) * 30 + d * 0.5;
    const yelkovan = d * 6;
    let fark = Math.abs(akrep - yelkovan);
    if (fark > 180) fark = 360 - fark;
    fark = Math.round(fark * 1e6) / 1e6;
    let tur;
    if (fark === 0) tur = 'Sıfır açı (ibreler üst üste)';
    else if (fark < 90) tur = 'Dar açı';
    else if (fark === 90) tur = 'Dik açı';
    else if (fark < 180) tur = 'Geniş açı';
    else tur = 'Doğru açı (ibreler zıt yönde)';
    return {
      rows: [
        ['Küçük açı', h.fmt(fark, 3) + '°'],
        ['Büyük açı', h.fmt(360 - fark, 3) + '°'],
        ['Akrebin konumu', h.fmt(akrep, 3) + '°'],
        ['Yelkovanın konumu', h.fmt(yelkovan, 3) + '°'],
        ['Açı türü', tur],
      ],
      note: 'İbre konumları 12 hizasından saat yönünde ölçülür. Akrebin dakikalar ilerledikçe sürekli kaydığı varsayılır.',
    };
  },
  cases: [
    { in: { saat: '3', dakika: '30' }, out: { 'Küçük açı': '75°', 'Büyük açı': '285°', 'Akrebin konumu': '105°', 'Yelkovanın konumu': '180°', 'Açı türü': 'Dar açı' } },
    { in: { saat: '3', dakika: '0' }, out: { 'Küçük açı': '90°', 'Büyük açı': '270°', 'Açı türü': 'Dik açı' } },
    { in: { saat: '9', dakika: '45' }, out: { 'Küçük açı': '22,5°', 'Akrebin konumu': '292,5°', 'Yelkovanın konumu': '270°' } },
    { in: { saat: '6', dakika: '0' }, out: { 'Küçük açı': '180°', 'Büyük açı': '180°', 'Açı türü': 'Doğru açı (ibreler zıt yönde)' } },
    { in: { saat: '12', dakika: '0' }, out: { 'Küçük açı': '0°', 'Açı türü': 'Sıfır açı (ibreler üst üste)' } },
    { in: { saat: '2', dakika: '20' }, out: { 'Küçük açı': '50°' } },
    { in: { saat: '15', dakika: '0' }, out: { 'Küçük açı': '90°' } },
    { in: { saat: '12', dakika: '30' }, out: { 'Küçük açı': '165°', 'Açı türü': 'Geniş açı' } },
    { in: { saat: '7', dakika: '25' }, out: { 'Küçük açı': '72,5°' } },
    { in: { saat: '25', dakika: '0' }, error: true },
    { in: { saat: '4', dakika: '60' }, error: true },
    { in: { saat: '', dakika: '10' }, error: true },
  ],
  howto: [
    '"Saat" alanına saati yazın. 24 saatlik gösterimle de yazabilirsiniz; 15 ile 3 aynı ibre konumunu verir.',
    '"Dakika" alanına dakikayı yazın. Tam saatler için 0 bırakın.',
    '"Hesapla" düğmesine basın. İlk satırdaki küçük açı, saat problemlerinde genellikle sorulan değerdir.',
    'Soruda "büyük açı" ya da "saat yönünde ölçülen açı" isteniyorsa ikinci satırdaki değeri ve ibre konumlarını kullanın.',
  ],
  sections: [
    { h: 'Akrep ve yelkovan ne kadar hızlı döner?', p: [
      'Saat kadranı 360 derecelik bir dairedir ve 12 eşit saat aralığına bölünmüştür; iki komşu rakam arası <strong>30 derecedir</strong>. Dakika çizgileri arası ise 360 ÷ 60 = 6 derecedir.',
      'Yelkovan (uzun ibre) bir saatte tam tur atar, yani dakikada <strong>6 derece</strong> ilerler. Akrep (kısa ibre) 12 saatte bir tur atar; saatte 30 derece, dakikada ise yalnızca <strong>0,5 derece</strong> yol alır. Saat problemlerinin püf noktası tam da buradadır: akrep saat başlarında rakamın tam üstündedir ama dakikalar ilerledikçe o da yavaş yavaş kayar. Saat 3.30\'da akrep 3\'ün üzerinde değil, 3 ile 4\'ün tam ortasındadır.',
    ] },
    { h: 'Açı formülü', p: [
      'Saat <em>s</em>, dakika <em>d</em> olmak üzere ibrelerin 12 hizasından saat yönünde ölçülen konumları şöyledir: akrep = 30 × s + 0,5 × d, yelkovan = 6 × d. Aradaki fark alındığında okul kitaplarındaki ünlü formül ortaya çıkar:',
      '<strong>Açı = |30 × s − 5,5 × d|</strong>',
      'Buradaki 5,5 katsayısı, yelkovanın dakikada 6 derece, akrebin 0,5 derece gitmesinden, yani yelkovanın akrebe her dakika 5,5 derece yaklaşmasından ya da ondan uzaklaşmasından gelir. Sonuç 180 dereceden büyük çıkarsa küçük açıyı bulmak için 360\'tan çıkarılır. Formülde saat 12 ise s yerine 0 alınır; 13 ve sonrası için 12 çıkarılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Saat 3.30:</strong> Akrep 30 × 3 + 0,5 × 30 = 105 derecede, yelkovan 6 × 30 = 180 derecededir. Fark 75 derecedir; küçük açı 75°, büyük açı 285° olur. Pek çok öğrenci akrebi 3\'ün üstünde sayıp 90 derece cevabını verir; doğru cevap 75 derecedir.',
      '<strong>Saat 9.45:</strong> Akrep 270 + 22,5 = 292,5 derecede, yelkovan 270 derecededir. Aradaki açı 22,5 derecedir.',
      '<strong>Saat 2.20:</strong> Formülle |30 × 2 − 5,5 × 20| = |60 − 110| = 50 derece bulunur.',
      '<strong>Saat 12.30:</strong> Saat 12 için s = 0 alınır: |0 − 5,5 × 30| = 165 derece. İbreler neredeyse zıt yöndedir ama tam doğru açı oluşmaz, çünkü akrep yarım saatte 15 derece ilerlemiştir.',
    ] },
    { h: 'İbreler ne zaman çakışır, ne zaman dik olur?', p: [
      'Yelkovan akrebe göre dakikada 5,5 derece hızlı döndüğünden, akrebi tam bir tur farkla yakalaması 360 ÷ 5,5 = 65 tam 5/11 dakika, yani yaklaşık 65 dakika 27 saniye sürer. Bu yüzden ibreler 12 saatte 12 kez değil <strong>11 kez</strong> üst üste gelir; bir günde bu sayı 22\'dir. Çakışmalar 12.00\'dan sonra yaklaşık 1.05, 2.11, 3.16, 4.22 gibi saatlerde gerçekleşir.',
      'Aynı mantıkla ibreler 12 saatte 11 kez zıt yönde (180 derece) durur ve <strong>22 kez dik açı</strong> yapar; bir günde 44 dik açı oluşur. Saat tam 3.00 ve 9.00 bunların en bilinenleridir. Saat tam 6.00 ise doğru açının tam saate denk geldiği tek andır.',
      'Belirli bir açının hangi dakikada oluşacağını bulmak için formül tersine çevrilir: d = (30 × s ± açı) ÷ 5,5. Örneğin saat 4 ile 5 arasında ibrelerin çakıştığı an için d = 120 ÷ 5,5 = 21,82 dakikadır. Bu değeri "Dakika" alanına 21,82 olarak yazarsanız açının sıfıra çok yakın çıktığını görürsünüz.',
    ] },
    { h: 'Sınavlarda dikkat edilecek noktalar', ul: [
      'Soruda yalnızca "açı" deniyorsa kural olarak <strong>küçük açı</strong> (0–180 derece) istenir.',
      'Akrebin dakikayla birlikte kaydığını unutmayın; her dakika için 0,5 derece ekleyin.',
      'Saat 12 için formülde 0 kullanın; 12 yazarsanız sonuç 360 derece kayar ve yanlış yorumlanabilir.',
      '"Saat yönünde yelkovandan akrebe" gibi yön belirten sorularda ibre konumlarını ayrı ayrı bulup çıkarma yapın; araçtaki konum satırları bunun içindir.',
      'Saniye ibresi bu tür sorulara dahil edilmez; yalnızca akrep ve yelkovan dikkate alınır.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç, ibreleri kesintisiz hareket eden ideal bir saate göre hesap yapar. Bazı duvar saatlerinde yelkovan dakikada bir sıçrayarak ilerler, bazı ucuz mekanizmalarda akrep tam yerinde durmaz; gerçek bir saatte gözle ölçtüğünüz açı birkaç derece farklı olabilir. Sonuçlar en fazla üç ondalık basamakla gösterilir. Öğleden önce ve sonra ibreler aynı konumda olduğundan 24 saatlik girişler 12 saatlik karşılığına indirgenir.',
    ] },
  ],
  faq: [
    ['Saat 3.30\'da akrep ile yelkovan arasındaki açı kaç derecedir?', '75 derecedir. Akrep 3 ile 4\'ün ortasında, 105 derecede; yelkovan 6\'nın üzerinde, 180 derecededir. Aradaki fark 75 derece, büyük açı ise 285 derecedir.'],
    ['Akrep yelkovan açısı formülü nedir?', 'Açı = |30 × saat − 5,5 × dakika| formülü kullanılır. Sonuç 180\'den büyükse 360\'tan çıkarılarak küçük açı bulunur. Saat 12 için saat değeri 0 alınır.'],
    ['Akrep ile yelkovan günde kaç kez üst üste gelir?', '24 saatte 22 kez çakışırlar. Yelkovan akrebi yaklaşık her 65 dakika 27 saniyede bir yakaladığı için 12 saatte 11 çakışma olur.'],
    ['Günde kaç kez dik açı oluşur?', 'İbreler 12 saatte 22, bir günde 44 kez birbirine dik konuma gelir. Bunların yalnızca 3.00 ve 9.00 anları tam saate denk gelir.'],
    ['Akrep dakikada kaç derece döner?', 'Akrep 12 saatte 360 derece döndüğü için saatte 30, dakikada 0,5 derece ilerler. Yelkovan ise dakikada 6 derece döner.'],
    ['Saat 15.00 yazarsam ne olur?', 'Analog saatte 15.00 ile 3.00 aynı görünür. Araç 12\'den büyük saatleri 12\'ye göre kalanına indirger ve 90 derece sonucunu verir.'],
    ['Ondalıklı dakika neden kabul ediliyor?', 'İbrelerin çakıştığı ya da belirli bir açı yaptığı anlar genellikle tam dakikaya denk gelmez. Örneğin 4 ile 5 arasındaki çakışma 21,82. dakikadadır; bu tür sonuçları sınamak için ondalıklı giriş yapılabilir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz saat bilgisi hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['saat-hesapla', '12-24-saat-cevir', 'sure-toplama', 'saniye-sure-cevir', 'yuzde-hesapla'],
};
