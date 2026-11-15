export default {
  slug: 'cm-piksel-cevir',
  title: 'Santimetre Piksel Çevirici',
  h1Tail: 'cm ↔ px',
  pageTitle: 'Santimetre Piksel Çevirici – cm\'den Piksele, Pikselden cm\'ye',
  description: 'Santimetreyi piksele, pikseli santimetreye DPI değerine göre çevirin. Baskı için 300 DPI, ekran için 96 DPI; tam piksel ve inç karşılığı da gösterilir.',
  card: 'Santimetre ölçüsünü seçtiğiniz DPI değerine göre piksele ya da pikseli santimetreye çevirin; baskı ve ekran için.',
  category: 'birim',
  keywords: ['cm piksel çevirme', 'santimetre piksel', 'piksel cm hesaplama', '1 cm kaç piksel', 'a4 kaç piksel', '300 dpi cm piksel', 'cm to px'],
  lead: `Bir uzunluğu <strong>santimetreden piksele</strong> ya da <strong>pikselden santimetreye</strong> çevirin. Sonuç çözünürlüğe bağlıdır; bu yüzden DPI değerini siz seçersiniz: ekran için 96, kaliteli baskı için 300.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 21' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cm', 'Santimetre → Piksel'], ['px', 'Piksel → Santimetre']] },
    { id: 'dpi', label: 'Çözünürlük (DPI / PPI)', type: 'number', value: '96', hint: 'Web: 96 · Baskı: 300 · Gazete/afiş: 150 · Eski ekran ölçüsü: 72' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const cm = v.yon === 'px' ? x * 2.54 / dpi : x;
    const px = cm * dpi / 2.54;
    const a = ['Piksel', h.fmt(px, 2) + ' px'];
    const b = ['Santimetre', h.fmt(cm, 4) + ' cm'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Tam piksel (yuvarlanmış)', h.fmt(Math.round(px - 1e-9), 0) + ' px'],
        ['İnç', h.fmt(cm / 2.54, 4) + ' inç'],
        ['1 cm karşılığı', h.fmt(dpi / 2.54, 4) + ' px'],
      ],
      note: 'Piksel = cm × DPI ÷ 2,54. Görüntü dosyalarında piksel sayısı tam sayı olmak zorundadır.',
    };
  },
  cases: [
    { in: { deger: '21', yon: 'cm', dpi: '300' }, out: { 'Piksel': '2.480,31 px', 'Tam piksel (yuvarlanmış)': '2.480 px' } },
    { in: { deger: '1000', yon: 'px', dpi: '96' }, out: { 'Santimetre': '26,4583 cm', 'Piksel': '1.000 px' } },
    { in: { deger: '2,54', yon: 'cm', dpi: '96' }, out: { 'Piksel': '96 px', 'İnç': '1 inç' } },
    { in: { deger: '29,7', yon: 'cm', dpi: '300' }, out: { 'Piksel': '3.507,87 px', 'Tam piksel (yuvarlanmış)': '3.508 px' } },
    { in: { deger: '10', yon: 'cm' }, out: { 'Piksel': '377,95 px', '1 cm karşılığı': '37,7953 px' } },
    { in: { deger: '300', yon: 'px', dpi: '300' }, out: { 'Santimetre': '2,54 cm' } },
    { in: { deger: '1', yon: 'cm', dpi: '72' }, out: { 'Piksel': '28,35 px' } },
    { in: { deger: '21', yon: 'cm', dpi: '0' }, error: true },
    { in: { deger: '-3', yon: 'cm', dpi: '96' }, error: true },
  ],
  howto: [
    `"Değer" alanına santimetre ya da piksel cinsinden ölçüyü yazın.`,
    `"Çeviri yönü" listesinden santimetreden piksele mi, pikselden santimetreye mi çevireceğinizi seçin.`,
    `"Çözünürlük" alanına hedef ortamın DPI değerini girin. Matbaa işi için baskı merkezinin istediği değeri (çoğunlukla 300) kullanın.`,
    `"Çevir" düğmesine basın. Kesirli piksel sonucunun yanında, görüntü boyutu olarak kullanabileceğiniz yuvarlanmış tam piksel değeri de verilir.`,
    `En ve boy için işlemi iki kez yapın; örneğin A4 için önce 21, sonra 29,7 santimetreyi çevirin.`,
  ],
  sections: [
    { h: 'Santimetre ile piksel arasında neden sabit oran yok?', p: [
      `Santimetre gerçek dünyadaki bir uzunluktur; cetvelle ölçülür. Piksel ise bir görüntünün ya da ekranın en küçük noktasıdır ve kendi başına bir uzunluğu yoktur. Aynı 1.000 piksellik görsel telefonda birkaç santimetre, projeksiyon perdesinde iki metre genişliğinde görünebilir. İki birimi birbirine bağlayan değer, bir inçe kaç nokta sığdığını söyleyen <strong>DPI</strong> (dots per inch) ya da ekranlar için <strong>PPI</strong> (pixels per inch) değeridir.`,
      `Bu nedenle "1 cm kaç piksel?" sorusunun tek bir cevabı olmaz; cevap her zaman "hangi çözünürlükte?" sorusuyla birlikte verilir. Araç, seçtiğiniz DPI için 1 santimetrenin karşılığını ayrı bir satırda gösterir.`,
    ] },
    { h: 'Formül', p: [
      `Bir inç 2,54 santimetre olduğundan: <strong>piksel = cm × DPI ÷ 2,54</strong> ve tersine <strong>cm = piksel × 2,54 ÷ DPI</strong>.`,
      `<strong>Çözümlü örnek 1:</strong> A4 kâğıdın kısa kenarı 21 cm'dir. 300 DPI'da 21 × 300 ÷ 2,54 = 2.480,31 piksel eder; görüntü genişliği 2.480 piksel alınır. Uzun kenar 29,7 cm için sonuç 3.507,87, yani 3.508 pikseldir. Baskıya hazır A4 görselin 2.480 × 3.508 piksel olarak bilinmesi bu hesaptan gelir.`,
      `<strong>Çözümlü örnek 2:</strong> 1.000 piksel genişliğindeki bir görsel, CSS referansı olan 96 DPI'da 1.000 × 2,54 ÷ 96 = 26,4583 cm'ye karşılık gelir.`,
      `<strong>Çözümlü örnek 3:</strong> 96 DPI'da 10 cm, 377,95 pikseldir; 1 cm yaklaşık 37,8 piksel eder.`,
    ] },
    { h: 'Hangi DPI değerini seçmeli?', ul: [
      `<strong>96:</strong> CSS ve web tarayıcılarının kabul ettiği referanstır. Stil dosyasındaki 1cm ile 37,7953px aynı uzunluktur.`,
      `<strong>72:</strong> Bazı grafik programlarının yeni belge varsayılanı ve eski ekran ölçüsüdür. 1 cm yaklaşık 28,35 piksel eder.`,
      `<strong>150:</strong> Uzaktan bakılan büyük afişler ve taslak baskılar için çoğu zaman yeterli görülür.`,
      `<strong>300:</strong> Elde tutulup yakından bakılan broşür, kartvizit, fotoğraf ve dergi baskıları için yaygın hedeftir. 1 cm yaklaşık 118,11 piksel eder.`,
      `<strong>600 ve üzeri:</strong> Çizgi çalışmaları, ince yazılar ve tarama işlerinde kullanılır.`,
    ], p: [
      `Kesin değer için baskıyı yapacak matbaanın ya da fotoğrafçının teknik şartlarına bakın; aynı iş için farklı merkezler farklı çözünürlük isteyebilir.`,
    ] },
    { h: '300 DPI için sık aranan ölçüler', ul: [
      `<strong>A4 (21 × 29,7 cm):</strong> 2.480 × 3.508 piksel`,
      `<strong>A5 (14,8 × 21 cm):</strong> 1.748 × 2.480 piksel`,
      `<strong>A3 (29,7 × 42 cm):</strong> 3.508 × 4.961 piksel`,
      `<strong>10 × 15 cm fotoğraf:</strong> 1.181 × 1.772 piksel`,
      `<strong>13 × 18 cm fotoğraf:</strong> 1.535 × 2.126 piksel`,
      `<strong>5 × 6 cm fotoğraf:</strong> 591 × 709 piksel`,
      `<strong>8,5 × 5,5 cm kartvizit:</strong> 1.004 × 650 piksel (kesim payı hariç)`,
    ] },
    { h: 'Ekranda santimetre neden tutmaz?', p: [
      `CSS'te bir öğeye <code>width: 10cm</code> verdiğinizde tarayıcı bunu 377,95 CSS pikseline çevirir; ancak ekrana cetvel tuttuğunuzda çoğu zaman tam 10 cm ölçmezsiniz. Çünkü tarayıcı ekranın gerçek fiziksel yoğunluğunu değil 96 DPI referansını kullanır. Dizüstü ekranları, telefonlar ve yüksek yoğunluklu monitörlerde gerçek yoğunluk bundan belirgin biçimde farklıdır.`,
      `Ekranda gerçek boyutlu bir çizim göstermek istiyorsanız ekranınızın gerçek PPI değerini hesaplayıp araca onu girmelisiniz. Gerçek PPI, ekranın piksel çözünürlüğü ve inç cinsinden köşegen uzunluğundan bulunur. Kâğıda yazdırılan sayfalarda ise santimetre birimi doğru çalışır; yazıcı fiziksel ölçüyü korur.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Düşük çözünürlüklü görseli büyütmek:</strong> 800 piksellik bir görseli programda 300 DPI olarak işaretlemek ona ayrıntı kazandırmaz; yalnızca baskı boyutu küçülür (yaklaşık 6,77 cm). Piksel sayısı baştan yeterli olmalıdır.`,
      `<strong>Kesim payını unutmak:</strong> Matbaa işleri kenarlarda birkaç milimetre taşma payı ister. Piksel boyutunu hesaplarken bu payı santimetre ölçüsüne ekleyin.`,
      `<strong>Milimetre ile santimetreyi karıştırmak:</strong> Fotoğraf ölçüleri bazen milimetre olarak verilir; 35 mm, 3,5 cm olarak girilmelidir.`,
      `<strong>Yuvarlama farkı:</strong> Kesirli sonucu en ve boy için ayrı ayrı yuvarlamak en-boy oranında bir piksellik sapmaya yol açabilir; bu, baskıda fark edilmez.`,
    ] },
  ],
  faq: [
    ['1 cm kaç piksel eder?', 'Çözünürlüğe bağlıdır. 96 DPI\'da 37,7953 piksel, 72 DPI\'da 28,35 piksel, 300 DPI\'da 118,11 piksel eder. Formül: DPI ÷ 2,54.'],
    ['A4 kâğıt kaç pikseldir?', '300 DPI\'da 2.480 × 3.508 piksel, 150 DPI\'da 1.240 × 1.754 piksel, 96 DPI\'da yaklaşık 794 × 1.123 pikseldir.'],
    ['DPI ile PPI aynı şey mi?', 'Gündelik kullanımda birbirinin yerine geçer. Tam anlamıyla PPI ekrandaki ya da görüntüdeki piksel yoğunluğunu, DPI ise yazıcının bir inçe koyduğu mürekkep noktası sayısını anlatır. Bu çeviride ikisi de inç başına piksel olarak ele alınır.'],
    ['Görselim kaç santimetre basılabilir?', '"Piksel → Santimetre" yönünü seçip görselin piksel genişliğini ve hedef DPI değerini girin. Örneğin 3.000 piksel genişliğindeki bir fotoğraf 300 DPI\'da 25,4 cm genişliğinde basılabilir.'],
    ['Sonuç neden kesirli çıkıyor?', 'Santimetre ve inç arasındaki 2,54 katsayısı yüzünden çoğu ölçü tam piksele denk gelmez. Görüntü dosyaları tam piksel gerektirdiği için araç yuvarlanmış değeri ayrıca verir.'],
    ['Telefon ekranında 1 cm kaç pikseldir?', 'Telefonun gerçek piksel yoğunluğuna bağlıdır; yoğunluk modelden modele değişir. Cihazınızın PPI değerini biliyorsanız DPI alanına yazarak fiziksel piksel karşılığını bulabilirsiniz.'],
    ['Vesikalık fotoğraf için kaç piksel gerekir?', 'İstenen baskı ölçüsünü santimetre olarak girip 300 DPI seçin. Başvuru yapılan kurumun ölçü ve piksel şartları farklı olabileceğinden güncel başvuru kılavuzunu kontrol edin.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['inc-piksel-cevir', 'dpi-hesapla', 'baski-piksel-boyutu-hesapla', 'fotograf-baski-boyutu-hesapla', 'kagit-boyutlari', 'cm-inc-cevir'],
};
