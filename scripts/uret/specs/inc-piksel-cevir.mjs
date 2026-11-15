export default {
  slug: 'inc-piksel-cevir',
  title: 'İnç Piksel Çevirici',
  h1Tail: 'inç ↔ px',
  pageTitle: 'İnç Piksel Çevirici – İnçten Piksele, Pikselden İnçe Hesaplama',
  description: 'İnçi piksele, pikseli inçe DPI/PPI değerine göre çevirin. Piksel = inç × DPI formülüyle çalışır; santimetre karşılığını ve tam piksel değerini de verir.',
  card: 'İnç ölçüsünü DPI değerine göre piksele, piksel sayısını inçe çevirin; tarama, baskı ve ekran hesapları için.',
  category: 'birim',
  keywords: ['inç piksel çevirme', 'inch pixel', 'piksel inç hesaplama', '1 inç kaç piksel', 'dpi piksel hesaplama', '300 dpi inç piksel', 'inch to px'],
  lead: `<strong>İnç</strong> cinsinden bir uzunluğun kaç <strong>piksel</strong> ettiğini ya da belirli sayıda pikselin kaç inç tuttuğunu hesaplayın. Aradaki bağ doğrudan çözünürlüktür: DPI, bir inçteki piksel sayısıdır.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 8,5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['inc', 'İnç → Piksel'], ['px', 'Piksel → İnç']] },
    { id: 'dpi', label: 'Çözünürlük (DPI / PPI)', type: 'number', value: '96', hint: 'Bir inçteki piksel sayısı. Web: 96 · Baskı: 300 · Tarama: 600' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const inc = v.yon === 'px' ? x / dpi : x;
    const px = inc * dpi;
    const a = ['Piksel', h.fmt(px, 2) + ' px'];
    const b = ['İnç', h.fmt(inc, 4) + ' inç'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Tam piksel (yuvarlanmış)', h.fmt(Math.round(px - 1e-9), 0) + ' px'],
        ['Santimetre', h.fmt(inc * 2.54, 4) + ' cm'],
      ],
      note: 'Piksel = inç × DPI. ' + h.fmt(dpi, 2) + ' DPI için 1 inç = ' + h.fmt(dpi, 2) + ' piksel.',
    };
  },
  cases: [
    { in: { deger: '8,5', yon: 'inc', dpi: '300' }, out: { 'Piksel': '2.550 px', 'Santimetre': '21,59 cm' } },
    { in: { deger: '1920', yon: 'px', dpi: '96' }, out: { 'İnç': '20 inç', 'Santimetre': '50,8 cm' } },
    { in: { deger: '1', yon: 'inc', dpi: '96' }, out: { 'Piksel': '96 px', 'Santimetre': '2,54 cm' } },
    { in: { deger: '11', yon: 'inc', dpi: '300' }, out: { 'Piksel': '3.300 px' } },
    { in: { deger: '600', yon: 'px', dpi: '72' }, out: { 'İnç': '8,3333 inç' } },
    { in: { deger: '6', yon: 'inc', dpi: '150' }, out: { 'Piksel': '900 px', 'Tam piksel (yuvarlanmış)': '900 px' } },
    { in: { deger: '2,5', yon: 'inc' }, out: { 'Piksel': '240 px' } },
    { in: { deger: '8,5', yon: 'inc', dpi: '' }, error: true },
    { in: { deger: '-1', yon: 'inc', dpi: '96' }, error: true },
  ],
  howto: [
    `"Değer" alanına inç ya da piksel cinsinden sayıyı yazın; 8,5 gibi ondalıklı değerler kabul edilir.`,
    `"Çeviri yönü" listesinden inçten piksele mi, pikselden inçe mi çevireceğinizi seçin.`,
    `"Çözünürlük" alanına bir inçte kaç piksel bulunacağını girin. Görseli nerede kullanacağınıza göre 96, 150, 300 ya da 600 gibi bir değer seçin.`,
    `"Çevir" düğmesine basın. Sonuçta piksel, inç ve santimetre değerleri birlikte gösterilir.`,
  ],
  sections: [
    { h: 'İnç ile piksel ilişkisi', p: [
      `Çözünürlük birimlerinin adı zaten çeviri formülünü söyler: DPI "inç başına nokta", PPI "inç başına piksel" demektir. Dolayısıyla <strong>piksel = inç × DPI</strong> ve <strong>inç = piksel ÷ DPI</strong>. Santimetre hesaplarındaki 2,54 katsayısı burada araya girmez; inçle çalışmak bu yüzden tarayıcı, yazıcı ve grafik programı ayarlarında daha yalın sonuç verir.`,
      `Bu ilişki üç niceliği birbirine bağlar. İkisini biliyorsanız üçüncüsünü bulursunuz: fiziksel boyut ile çözünürlükten piksel sayısı, piksel sayısı ile çözünürlükten fiziksel boyut, piksel sayısı ile fiziksel boyuttan çözünürlük.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1 – Baskı:</strong> ABD'de yaygın olan Letter kâğıdı 8,5 × 11 inçtir. 300 DPI'da genişlik 8,5 × 300 = 2.550 piksel, yükseklik 11 × 300 = 3.300 pikseldir.`,
      `<strong>Örnek 2 – Ekran:</strong> 1.920 piksel genişliğindeki bir görsel, 96 DPI referansında 1.920 ÷ 96 = 20 inç, yani 50,8 cm genişliğe karşılık gelir.`,
      `<strong>Örnek 3 – Tarama:</strong> 6 inç genişliğindeki bir fotoğrafı 150 DPI ile tararsanız 6 × 150 = 900 piksel genişliğinde bir dosya elde edersiniz. Aynı fotoğrafı 600 DPI ile tararsanız 3.600 piksel olur; dosya boyutu da buna göre büyür.`,
      `<strong>Örnek 4 – Eski ekran ölçüsü:</strong> 72 DPI kabul eden bir belgede 600 piksel, 600 ÷ 72 = 8,3333 inç eder.`,
    ] },
    { h: 'DPI değerini doğru seçmek', p: [
      `<strong>Web ve arayüz:</strong> CSS standardı 1 inci 96 piksel sayar. Stil dosyasına <code>1in</code> yazdığınızda tarayıcı bunu 96 CSS pikseli olarak yorumlar. Ekranın gerçek yoğunluğu ne olursa olsun bu oran sabittir.`,
      `<strong>Baskı:</strong> Yakından incelenen işlerde 300 DPI yaygın hedeftir. Büyük boy afişler uzaktan görüldüğü için daha düşük değerlerle basılabilir. Kesin değer için baskı merkezinin şartnamesine bakın.`,
      `<strong>Tarama:</strong> Belgeler için 200–300, arşivlenecek fotoğraflar için 600 ve üzeri değerler tercih edilir. Taranan görselin piksel boyutu, özgün belgenin inç ölçüsü ile tarama çözünürlüğünün çarpımıdır.`,
    ] },
    { h: 'Ekranınızın gerçek PPI değeri', p: [
      `Monitör ve telefonların inç değeri köşegen uzunluğudur. Gerçek piksel yoğunluğunu bulmak için önce piksel cinsinden köşegeni hesaplarsınız (genişlik ve yüksekliğin kareleri toplamının karekökü), sonra bunu inç cinsinden köşegene bölersiniz.`,
      `Örneğin 1.920 × 1.080 çözünürlüklü 24 inçlik bir monitörde piksel köşegeni yaklaşık 2.203'tür; 2.203 ÷ 24 ≈ 91,8 PPI. Aynı çözünürlükteki 15,6 inçlik dizüstü ekranında değer yaklaşık 141 PPI olur. Bu yüzden aynı görsel dizüstünde fiziksel olarak daha küçük görünür. Gerçek boyutlu bir önizleme için DPI alanına ekranınızın kendi PPI değerini yazabilirsiniz.`,
    ] },
    { h: '300 DPI için fotoğraf ve kâğıt ölçüleri', ul: [
      `<strong>4 × 6 inç:</strong> 1.200 × 1.800 piksel`,
      `<strong>5 × 7 inç:</strong> 1.500 × 2.100 piksel`,
      `<strong>8 × 10 inç:</strong> 2.400 × 3.000 piksel`,
      `<strong>8,5 × 11 inç (Letter):</strong> 2.550 × 3.300 piksel`,
      `<strong>11 × 17 inç (Tabloid):</strong> 3.300 × 5.100 piksel`,
      `<strong>1 × 1 inç:</strong> 300 × 300 piksel`,
    ] },
    { h: 'Bir görseldeki DPI etiketi ne anlama gelir?', p: [
      `Görüntü dosyalarının içinde saklanan DPI bilgisi yalnızca bir etikettir; yazdırma programına "bu pikselleri inç başına şu kadar sıklıkla yerleştir" önerisinde bulunur. Etiketi değiştirmek pikselleri değiştirmez. 3.000 × 2.000 piksellik bir fotoğraf 300 DPI olarak işaretlendiğinde 10 × 6,6667 inç, 150 DPI olarak işaretlendiğinde 20 × 13,3333 inç basılır; dosyadaki ayrıntı aynıdır.`,
      `Web'de bu etiket tamamen yok sayılır. Tarayıcı görseli piksel boyutuna ve stil kurallarına göre çizer. "Web için 72 DPI kaydet" önerisi dosya boyutunu ya da ekrandaki netliği etkilemez; önemli olan piksel sayısıdır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Düşük piksel sayılı bir görseli yeniden örnekleyerek büyütmek yeni ayrıntı üretmez; baskı bulanık çıkar.`,
      `Ekran inçini (köşegen) genişlik sanmak. 27 inçlik bir monitörün genişliği 27 inç değildir.`,
      `Yazıcının mürekkep noktası çözünürlüğü (örneğin 1.200 DPI) ile görselin piksel çözünürlüğünü karıştırmak. Yazıcılar bir pikseli birçok mürekkep noktasıyla oluşturur; görsel için 300 PPI çoğu işte yeterlidir.`,
      `Kesirli inç ölçülerini yanlış yazmak. 8 1/2 inç, araca 8,5 olarak girilmelidir.`,
    ] },
  ],
  faq: [
    ['1 inç kaç pikseldir?', 'DPI değeri kaçsa o kadardır: 96 DPI\'da 96 piksel, 72 DPI\'da 72 piksel, 300 DPI\'da 300 piksel. CSS\'te 1in her zaman 96 CSS pikseline eşittir.'],
    ['300 DPI\'da 4 × 6 inç fotoğraf kaç piksel olmalı?', '4 × 300 = 1.200 ve 6 × 300 = 1.800; yani 1.200 × 1.800 piksel, yaklaşık 2,2 megapiksel yeterlidir.'],
    ['Görselimin baskı boyutunu nasıl bulurum?', '"Piksel → İnç" yönünü seçin, piksel genişliğini ve baskı çözünürlüğünü girin. 3.600 piksellik bir görsel 300 DPI\'da 12 inç, yani 30,48 cm genişliğinde basılır.'],
    ['DPI ve PPI farkı önemli mi?', 'Bu çeviri açısından hayır; ikisi de inç başına piksel olarak kullanılır. Ayrım, yazıcının mürekkep noktaları ile görüntünün pikselleri arasında yapılır.'],
    ['Görselin DPI değerini 72\'den 300\'e çevirmek kaliteyi artırır mı?', 'Yalnızca etiketi değiştirirseniz hayır; piksel sayısı aynı kalır, baskı boyutu küçülür. Kalite için baştan yeterli piksel sayısına sahip bir kaynak gerekir.'],
    ['Santimetre ölçüsünü nasıl piksele çeviririm?', 'Sonuçtaki santimetre satırı karşılığı gösterir. Santimetreden başlamak isterseniz santimetre-piksel çevirici aracını kullanabilir ya da değeri 2,54\'e bölerek inçe çevirebilirsiniz.'],
    ['Tarayıcıda 1 inçlik bir kutu neden cetvelle 1 inç ölçülmüyor?', 'Tarayıcılar ekranın gerçek yoğunluğunu değil 96 piksel referansını kullanır. Ekranınızın gerçek PPI değeri 96\'dan farklıysa kutu fiziksel olarak daha küçük ya da büyük görünür; yazdırıldığında ise doğru ölçüde çıkar.'],
    ['Girdiğim sayılar kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; değerler sunucuya gönderilmez.'],
  ],
  related: ['cm-piksel-cevir', 'dpi-hesapla', 'ekran-boyutu-hesapla', 'megapiksel-hesapla', 'baski-piksel-boyutu-hesapla', 'cm-inc-cevir'],
};
