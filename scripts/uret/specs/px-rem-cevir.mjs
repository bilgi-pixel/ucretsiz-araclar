export default {
  slug: 'px-rem-cevir',
  title: 'Piksel REM Çevirici',
  h1Tail: 'px ↔ rem',
  pageTitle: 'Piksel REM Çevirici – px\'ten rem\'e, rem\'den px\'e CSS Hesaplama',
  description: 'Piksel değerini rem birimine, rem değerini piksele çevirin. Kök yazı boyutunu (varsayılan 16 px) değiştirebilir, hazır CSS değerini kopyalayabilirsiniz.',
  card: 'CSS için pikseli rem\'e, rem\'i piksele çevirin; kök yazı boyutu ayarlanabilir, hazır CSS değeri verilir.',
  category: 'birim',
  keywords: ['px rem çevirme', 'rem px hesaplama', 'piksel rem', '1 rem kaç px', '16px kaç rem', 'css rem hesaplama', 'px to rem'],
  lead: `CSS ölçülerini <strong>piksel (px)</strong> ile <strong>rem</strong> arasında çevirin. Hesap kök öğenin yazı boyutuna göre yapılır; tarayıcı varsayılanı olan 16 px hazır gelir, projenizde farklıysa değiştirebilirsiniz.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 24' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['px', 'Piksel → REM'], ['rem', 'REM → Piksel']] },
    { id: 'kok', label: 'Kök yazı boyutu (px)', type: 'number', value: '16', hint: 'html öğesinin font-size değeri. Tarayıcı varsayılanı 16 pikseldir.' },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const kok = h.pos(v.kok, 'Kök yazı boyutu');
    const px = v.yon === 'rem' ? x * kok : x;
    const rem = px / kok;
    const css = (n, birim) => String(Number(n.toFixed(4))) + birim;
    const a = ['REM', h.fmt(rem, 4) + ' rem'];
    const b = ['Piksel', h.fmt(px, 4) + ' px'];
    return {
      rows: [
        v.yon === 'rem' ? b : a,
        v.yon === 'rem' ? a : b,
        ['CSS değeri', v.yon === 'rem' ? css(px, 'px') : css(rem, 'rem')],
        ['Kök boyuta oranı', '%' + h.fmt(rem * 100, 2)],
      ],
      note: 'Kök yazı boyutu ' + h.fmt(kok, 4) + ' px kabul edildi: 1 rem = ' + h.fmt(kok, 4) + ' px.',
    };
  },
  cases: [
    { in: { deger: '24', yon: 'px', kok: '16' }, out: { 'REM': '1,5 rem', 'CSS değeri': '1.5rem', 'Kök boyuta oranı': '%150' } },
    { in: { deger: '2,5', yon: 'rem', kok: '16' }, out: { 'Piksel': '40 px', 'CSS değeri': '40px' } },
    { in: { deger: '10', yon: 'px', kok: '16' }, out: { 'REM': '0,625 rem', 'CSS değeri': '0.625rem' } },
    { in: { deger: '14', yon: 'px' }, out: { 'REM': '0,875 rem' } },
    { in: { deger: '18', yon: 'px', kok: '10' }, out: { 'REM': '1,8 rem' } },
    { in: { deger: '1', yon: 'rem', kok: '16' }, out: { 'Piksel': '16 px' } },
    { in: { deger: '-8', yon: 'px', kok: '16' }, out: { 'REM': '-0,5 rem', 'CSS değeri': '-0.5rem' } },
    { in: { deger: '24', yon: 'px', kok: '0' }, error: true },
    { in: { deger: '', yon: 'px', kok: '16' }, error: true },
  ],
  howto: [
    `"Değer" alanına tasarım dosyasındaki piksel ölçüsünü ya da stil dosyanızdaki rem değerini yazın. Negatif kenar boşlukları için eksi işaretli sayı da girebilirsiniz.`,
    `"Çeviri yönü" listesinden hangi birimden hangisine geçeceğinizi seçin.`,
    `Projenizde html öğesine özel bir yazı boyutu tanımlıysa "Kök yazı boyutu" alanını buna göre güncelleyin; tanımlı değilse 16 olarak bırakın.`,
    `"Çevir" düğmesine basın. "CSS değeri" satırındaki ondalık noktalı metni doğrudan stil dosyanıza yapıştırabilirsiniz.`,
  ],
  sections: [
    { h: 'REM birimi nedir?', p: [
      `REM, "root em" ifadesinin kısaltmasıdır ve CSS'te sayfanın kök öğesinin, yani <code>html</code> etiketinin yazı boyutuna göre ölçü veren göreli bir birimdir. Kök yazı boyutu 16 piksel ise 1 rem 16 piksele, 2 rem 32 piksele karşılık gelir. Öğenin sayfanın neresinde, hangi kapsayıcının içinde olduğu sonucu değiştirmez; rem her yerde aynı referansa bakar.`,
      `Bu özellik rem'i em biriminden ayırır. Em, öğenin kendi ya da üst öğesinin yazı boyutuna göre hesaplandığından iç içe yapılarda katlanarak büyüyebilir. Rem'de böyle bir birikme olmaz; bu yüzden tutarlı boşluk ve yazı ölçekleri kurmak için tercih edilir.`,
    ] },
    { h: 'Hesap formülü', p: [
      `Pikselden rem'e: <strong>rem = px ÷ kök yazı boyutu</strong>. Rem'den piksele: <strong>px = rem × kök yazı boyutu</strong>.`,
      `<strong>Çözümlü örnek 1:</strong> Tasarımda başlık 24 px olarak verilmiş ve kök boyut 16 px. 24 ÷ 16 = 1,5 rem; stil dosyasına <code>font-size: 1.5rem</code> yazılır.`,
      `<strong>Çözümlü örnek 2:</strong> Stil dosyasında <code>padding: 2.5rem</code> görüyorsunuz. 2,5 × 16 = 40 px; öğe varsayılan ayarlarda 40 piksel iç boşluk alır.`,
      `<strong>Çözümlü örnek 3:</strong> 10 px'lik küçük bir etiket için 10 ÷ 16 = 0,625 rem bulunur.`,
    ] },
    { h: 'Neden piksel yerine rem?', p: [
      `Kullanıcılar tarayıcı ayarlarından varsayılan yazı boyutunu büyütebilir; görme güçlüğü yaşayan pek çok kişi bu ayarı kullanır. Yazı boyutları piksel olarak sabitlenmiş bir sayfa bu tercihi dikkate almaz. Rem ile tanımlanan ölçüler ise kök boyutla birlikte orantılı olarak büyür ya da küçülür. Erişilebilirlik yönergelerinin metnin yeniden boyutlandırılabilmesini istemesi, rem kullanımını güçlü bir alışkanlık hâline getirmiştir.`,
      `İkinci yarar bakım kolaylığıdır. Bütün boşluklar ve yazı boyutları rem'e bağlıysa, belirli bir ekran genişliğinde kök boyutu değiştirerek tüm arayüzü tek satırla ölçeklendirebilirsiniz.`,
    ] },
    { h: 'Yüzde 62,5 yöntemi', p: [
      `Bazı projelerde kök öğeye <code>font-size: 62.5%</code> verilir. Varsayılan 16 pikselin yüzde 62,5'i 10 piksel ettiğinden 1 rem 10 piksele eşitlenir ve zihinden hesap kolaylaşır: 18 px = 1,8 rem, 24 px = 2,4 rem. Bu yöntemi kullanan bir projede çalışıyorsanız "Kök yazı boyutu" alanına 10 yazmanız yeterlidir.`,
      `Yöntemin bir bedeli vardır: gövde metni için ayrıca 1,6 rem gibi bir boyut tanımlamayı unutursanız yazılar çok küçük kalır ve üçüncü taraf bileşenler beklenenden farklı görünebilir. Ekip içinde hangi kök boyutun kullanıldığını belgelemek karışıklığı önler.`,
    ] },
    { h: '16 px kök boyut için dönüşüm tablosu', ul: [
      `<strong>4 px</strong> = 0,25 rem`,
      `<strong>8 px</strong> = 0,5 rem`,
      `<strong>12 px</strong> = 0,75 rem`,
      `<strong>14 px</strong> = 0,875 rem`,
      `<strong>16 px</strong> = 1 rem`,
      `<strong>18 px</strong> = 1,125 rem`,
      `<strong>20 px</strong> = 1,25 rem`,
      `<strong>24 px</strong> = 1,5 rem`,
      `<strong>32 px</strong> = 2 rem`,
      `<strong>40 px</strong> = 2,5 rem`,
      `<strong>48 px</strong> = 3 rem`,
      `<strong>64 px</strong> = 4 rem`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Ondalık ayracı:</strong> CSS ondalık için nokta ister. Türkçe yazım alışkanlığıyla <code>1,5rem</code> yazılırsa kural geçersiz sayılır. Araç bu nedenle ayrı bir "CSS değeri" satırı üretir.`,
      `<strong>Kök ile body'yi karıştırmak:</strong> Rem, <code>body</code> öğesinin değil <code>html</code> öğesinin yazı boyutuna bakar. Yalnızca body'ye boyut vermek rem değerlerini etkilemez.`,
      `<strong>Her şeyi rem yapmak:</strong> Bir pikselik kenarlık gibi ince çizgiler ölçeklendiğinde bulanık görünebilir; bunlar için piksel kullanmak yaygın bir tercihtir.`,
      `<strong>Medya sorgularında beklenti:</strong> Medya sorgularındaki rem değerleri, stil dosyasında köke verdiğiniz boyuta değil tarayıcının başlangıç yazı boyutuna göre yorumlanır. Kök boyutu 10 piksele çekmiş olsanız bile sorgudaki 1 rem varsayılan ayarda 16 piksel sayılır.`,
    ] },
  ],
  faq: [
    ['1 rem kaç pikseldir?', 'Kök yazı boyutu kaç pikselse 1 rem o kadardır. Tarayıcıların varsayılanı 16 piksel olduğundan, özel bir ayar yapılmadıysa 1 rem = 16 px\'tir.'],
    ['16 px kaç rem eder?', 'Varsayılan kök boyutla 16 px tam 1 rem eder. Kök boyut 10 px olarak ayarlanmışsa aynı 16 px, 1,6 rem olur.'],
    ['Rem ile em arasındaki fark nedir?', 'Rem her zaman kök öğenin yazı boyutuna göre hesaplanır. Em ise yazı boyutu için üst öğenin, diğer özellikler için öğenin kendi yazı boyutuna bakar ve iç içe öğelerde katlanabilir.'],
    ['Kök yazı boyutunu nereden öğrenirim?', 'Projenizin stil dosyasında html ya da :root seçicisine verilmiş font-size değerine bakın. Böyle bir kural yoksa tarayıcı varsayılanı olan 16 piksel geçerlidir.'],
    ['Negatif değer girebilir miyim?', 'Evet. Negatif kenar boşluğu gibi durumlar için eksi işaretli değerler çevrilir; örneğin -8 px, 16 piksel kök boyutla -0,5 rem eder.'],
    ['Sonuç neden dört ondalıkla sınırlı?', 'Tarayıcılar çok küçük kesirleri zaten alt piksele yuvarlar; dört ondalık basamak 16 piksellik kökte pikselin binde ikisinden daha ince bir duyarlılık sağlar ve stil dosyasını okunaklı tutar.'],
    ['Kullanıcı tarayıcıda yazı boyutunu büyütürse ne olur?', 'Rem ile tanımlanmış tüm ölçüler aynı oranda büyür. Örneğin kullanıcı varsayılanı 20 piksele çıkarırsa 1,5 rem 24 yerine 30 piksel olarak çizilir.'],
    ['Yazdığım değerler bir sunucuya gidiyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayılar gönderilmez ve saklanmaz.'],
  ],
  related: ['px-em-cevir', 'css-birim-cevir', 'punto-piksel-cevir', 'en-boy-kutu-hesapla', 'ekran-cozunurlugu'],
};
