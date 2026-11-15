export default {
  slug: 'punto-piksel-cevir',
  title: 'Punto Piksel (pt – px) Çevirici',
  h1Tail: 'pt ↔ px',
  pageTitle: 'Punto Piksel Çevirici – pt\'den px\'e, px\'ten pt\'ye Hesaplama',
  description: 'Punto (pt) değerini piksele (px), pikseli puntoya çevirin. Varsayılan 96 DPI ile 12 pt = 16 px; farklı çözünürlük girebilir, milimetre karşılığını görebilirsiniz.',
  card: 'Yazı boyutunu puntodan piksele ya da pikselden puntoya çevirin; DPI seçilebilir, milimetre karşılığı gösterilir.',
  category: 'birim',
  keywords: ['punto piksel çevirme', 'pt px çevirici', '12 punto kaç piksel', 'px pt hesaplama', 'punto kaç px', 'yazı boyutu piksel', 'pt to px'],
  lead: `Yazı tipi boyutlarını <strong>punto (pt)</strong> ile <strong>piksel (px)</strong> arasında çevirin. Web için geçerli 96 DPI varsayılandır; baskı ya da farklı ekranlar için çözünürlüğü kendiniz girebilirsiniz.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 12' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['pt', 'Punto → Piksel'], ['px', 'Piksel → Punto']] },
    { id: 'dpi', label: 'Çözünürlük (DPI)', type: 'number', value: '96', hint: 'Web ve CSS için 96; eski Mac/PDF mantığı için 72; baskı için 300.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük (DPI)');
    const pt = v.yon === 'px' ? x * 72 / dpi : x;
    const px = pt * dpi / 72;
    const a = ['Piksel', h.fmt(px, 4) + ' px'];
    const b = ['Punto', h.fmt(pt, 4) + ' pt'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Milimetre', h.fmt(pt * 25.4 / 72, 4) + ' mm'],
        ['İnç', h.fmt(pt / 72, 4) + ' inç'],
      ],
      note: '1 punto = 1/72 inç kabul edilir. ' + h.fmt(dpi, 2) + ' DPI için 1 pt = ' + h.fmt(dpi / 72, 4) + ' px.',
    };
  },
  cases: [
    { in: { deger: '12', yon: 'pt', dpi: '96' }, out: { 'Piksel': '16 px', 'Milimetre': '4,2333 mm' } },
    { in: { deger: '16', yon: 'px', dpi: '96' }, out: { 'Punto': '12 pt', 'Piksel': '16 px' } },
    { in: { deger: '72', yon: 'pt', dpi: '96' }, out: { 'Piksel': '96 px', 'Milimetre': '25,4 mm', 'İnç': '1 inç' } },
    { in: { deger: '10', yon: 'pt', dpi: '72' }, out: { 'Piksel': '10 px' } },
    { in: { deger: '11', yon: 'pt', dpi: '96' }, out: { 'Piksel': '14,6667 px' } },
    { in: { deger: '12', yon: 'pt', dpi: '300' }, out: { 'Piksel': '50 px' } },
    { in: { deger: '24', yon: 'px' }, out: { 'Punto': '18 pt' } },
    { in: { deger: '12', yon: 'pt', dpi: '0' }, error: true },
    { in: { deger: 'on iki', yon: 'pt', dpi: '96' }, error: true },
  ],
  howto: [
    `"Değer" alanına punto ya da piksel cinsinden boyutu yazın.`,
    `"Çeviri yönü" listesinden puntodan piksele mi, pikselden puntoya mı çevireceğinizi belirleyin.`,
    `Web tasarımı için çözünürlüğü 96 olarak bırakın. Baskıya gidecek bir görselde yazının kaç piksel tutacağını arıyorsanız baskı çözünürlüğünü (örneğin 300) yazın.`,
    `"Çevir" düğmesine basın; karşılık gelen değerle birlikte milimetre ve inç ölçüsü de listelenir.`,
  ],
  sections: [
    { h: 'Punto nedir, piksel nedir?', p: [
      `<strong>Punto</strong> (İngilizce point, kısaltması pt) matbaacılıktan gelen fiziksel bir uzunluk birimidir. Masaüstü yayıncılıkta kullanılan tanıma göre bir punto, inçin 72'de biridir; yani yaklaşık 0,3528 milimetredir. Kelime işlemcide seçtiğiniz "12 punto", kâğıt üzerinde harf gövdesi için ayrılan yüksekliğin 12/72 inç, yani yaklaşık 4,23 mm olduğunu söyler.`,
      `<strong>Piksel</strong> ise ekranın ya da görüntünün en küçük noktasıdır ve tek başına fiziksel bir uzunluğu yoktur; kaç milimetre ettiği ekranın yoğunluğuna bağlıdır. İki birimi birbirine bağlayan şey çözünürlüktür: bir inçe kaç piksel sığdığı, yani DPI (ya da PPI) değeri.`,
    ] },
    { h: 'Çeviri formülü', p: [
      `Genel bağıntı şudur: <strong>px = pt × DPI ÷ 72</strong> ve tersine <strong>pt = px × 72 ÷ DPI</strong>. Web tarayıcıları ve CSS standardı bir inci 96 piksel sayar. Bu durumda oran 96 ÷ 72 = 1,3333 olur: <strong>1 pt = 1,3333 px</strong>, <strong>1 px = 0,75 pt</strong>.`,
      `<strong>Çözümlü örnek:</strong> 12 puntoluk gövde metni web sayfasında kaç piksel olmalı? 12 × 96 ÷ 72 = 16 px. Tarayıcıların varsayılan yazı boyutunun 16 px olması tesadüf değildir; bu, alışılmış 12 puntoya denk gelir. Ters yönde, tasarım dosyasında 24 px görünen bir başlık 24 × 72 ÷ 96 = 18 puntodur.`,
    ] },
    { h: 'Neden farklı DPI değerleri var?', p: [
      `<strong>96 DPI:</strong> CSS'in referans değeridir. Yüksek yoğunluklu (Retina benzeri) ekranlarda bile tarayıcı "CSS pikseli" kavramını kullandığından, web için pt ↔ px çevirisinde 96 dışında bir değer girmenize gerek yoktur.`,
      `<strong>72 DPI:</strong> Eski masaüstü yayıncılık geleneğinde ve bazı grafik programlarının varsayılan belge ayarında bir inç 72 piksel sayılır. Bu ayarda 1 pt tam 1 px olur; 10 punto yazı 10 piksel yer tutar.`,
      `<strong>300 DPI:</strong> Baskıya hazırlanan piksel tabanlı görsellerde yaygın çözünürlüktür. 12 puntoluk bir yazının 300 DPI'lık görselde 12 × 300 ÷ 72 = 50 piksel yüksekliğe karşılık geldiğini araçla görebilirsiniz. Afiş ya da kartvizit tasarımında yazıyı piksel olarak ölçmeniz gerektiğinde bu hesap işe yarar.`,
    ] },
    { h: 'Yaygın yazı boyutları (96 DPI)', ul: [
      `<strong>8 pt</strong> = 10,6667 px (dipnot, küçük etiket)`,
      `<strong>9 pt</strong> = 12 px`,
      `<strong>10 pt</strong> = 13,3333 px`,
      `<strong>10,5 pt</strong> = 14 px`,
      `<strong>11 pt</strong> = 14,6667 px`,
      `<strong>12 pt</strong> = 16 px (tarayıcı varsayılanı)`,
      `<strong>14 pt</strong> = 18,6667 px`,
      `<strong>18 pt</strong> = 24 px`,
      `<strong>24 pt</strong> = 32 px`,
      `<strong>36 pt</strong> = 48 px`,
      `<strong>72 pt</strong> = 96 px (1 inç)`,
    ] },
    { h: 'Hangi durumda hangisini kullanmalı?', p: [
      `Ekranda görüntülenecek içerikte piksel ya da ona bağlı göreli birimler (rem, em) tercih edilir; çünkü ekranların fiziksel boyutu kullanıcıdan kullanıcıya değişir ve punto gibi mutlak bir uzunluk ekranda güvenilir biçimde tutturulamaz. Baskı stil dosyalarında (yazdırma için ayrılmış CSS kuralları), PDF üretiminde ve kelime işlemci belgelerinde ise punto doğal birimdir.`,
      `Türkiye'de tez yazım kılavuzları, dilekçe ve resmî yazı şablonları yazı boyutunu punto olarak belirtir. Aynı metni bir web sayfasına ya da e-posta şablonuna taşırken kurumsal kimlikteki punto değerini piksele çevirmek gerekir. Benzer biçimde, bir arayüz tasarımındaki piksel ölçülerini sunum ya da belge yazılımına aktarırken ters yönde çeviri yapılır.`,
    ] },
    { h: 'Dikkat edilmesi gerekenler', ul: [
      `Punto, harfin görünen yüksekliği değil, yazı tipinin tasarım karesinin (em kutusunun) yüksekliğidir. Aynı puntodaki iki farklı yazı tipi gözle farklı büyüklükte görünebilir.`,
      `Mobil işletim sistemlerinin kendi yoğunluktan bağımsız birimleri vardır; bunlar piksel ya da puntoyla birebir aynı değildir. Bu araç yalnızca pt ve px arasında çalışır.`,
      `Kesirli piksel değerleri tarayıcılarda geçerlidir, ancak bazı eski e-posta istemcileri bunları tam sayıya yuvarlar. Şablonlarda tam sayıya yakın değerler seçmek tutarlılık sağlar.`,
      `Geleneksel matbaa puntosu (Didot ya da eski Amerikan puntosu) 1/72 inçten çok az farklıdır. Güncel yazılımların tamamı 1/72 inç tanımını kullandığı için araç da bu değeri esas alır.`,
    ] },
  ],
  faq: [
    ['12 punto kaç pikseldir?', 'Web ve CSS ölçüsüyle (96 DPI) 12 punto tam 16 pikseldir. 72 DPI kabul eden bir belgede 12 piksel, 300 DPI baskı görselinde 50 piksel eder.'],
    ['1 punto kaç piksel eder?', '96 DPI için 1 punto 1,3333 pikseldir; tersinden 1 piksel 0,75 puntodur. Oran 96 ÷ 72 bölümünden gelir.'],
    ['Punto kaç milimetredir?', '1 punto 25,4 ÷ 72 = yaklaşık 0,3528 mm\'dir. 12 punto 4,2333 mm, 72 punto ise tam 25,4 mm, yani 1 inç eder.'],
    ['Word\'deki punto ile CSS\'teki pt aynı mı?', 'Evet, ikisi de 1/72 inç tanımını kullanır. Word\'de 11 punto olan metin için CSS\'te 11pt ya da 14,6667px yazarsanız yazdırıldığında aynı boyutu elde edersiniz.'],
    ['Retina ya da 4K ekranda sonuç değişir mi?', 'Hayır. Tarayıcılar yüksek yoğunluklu ekranlarda da CSS pikselini 1/96 inç referansına göre ölçekler; 12pt yine 16 CSS pikseline karşılık gelir. Değişen yalnızca bir CSS pikselini çizen fiziksel nokta sayısıdır.'],
    ['DPI alanını ne zaman değiştirmeliyim?', 'Baskı için hazırlanan piksel tabanlı bir görselde yazı yüksekliğini hesaplarken ya da 72 DPI varsayan bir grafik belgesiyle çalışırken değiştirin. Web sayfası ve arayüz tasarımı için 96 olarak bırakın.'],
    ['Punto mu piksel mi kullanmalıyım?', 'Ekran için piksel ya da rem gibi göreli birimler, kâğıda basılacak belgeler için punto uygundur. Erişilebilirlik açısından web metinlerinde kullanıcının tarayıcı ayarına uyan rem birimi çoğu zaman en iyi seçimdir.'],
    ['Girdiğim sayılar saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez ya da kaydedilmez.'],
  ],
  related: ['css-birim-cevir', 'px-rem-cevir', 'px-em-cevir', 'mm-punto-cevir', 'dpi-hesapla'],
};
