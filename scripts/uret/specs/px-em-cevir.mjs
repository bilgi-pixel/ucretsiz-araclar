export default {
  slug: 'px-em-cevir',
  title: 'Piksel EM Çevirici',
  h1Tail: 'px ↔ em',
  pageTitle: 'Piksel EM Çevirici – px\'ten em\'e, em\'den px\'e CSS Hesaplama',
  description: 'Piksel değerini em birimine, em değerini piksele çevirin. Üst öğenin yazı boyutunu girin; em, yüzde ve hazır CSS değeri birlikte hesaplanır.',
  card: 'CSS için pikseli em\'e, em\'i piksele çevirin; referans yazı boyutunu siz belirleyin, yüzde karşılığını da görün.',
  category: 'birim',
  keywords: ['px em çevirme', 'em px hesaplama', 'piksel em', '1 em kaç px', 'css em hesaplama', 'em birimi nedir', 'px to em'],
  lead: `CSS ölçülerini <strong>piksel (px)</strong> ile <strong>em</strong> arasında çevirin. Em bağlama göre değiştiği için hesap, sizin gireceğiniz referans yazı boyutuna (çoğunlukla üst öğenin boyutu) göre yapılır.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 20' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['px', 'Piksel → EM'], ['em', 'EM → Piksel']] },
    { id: 'ust', label: 'Referans yazı boyutu (px)', type: 'number', value: '16', hint: 'font-size için üst öğenin, diğer özellikler için öğenin kendi yazı boyutu.' },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const ust = h.pos(v.ust, 'Referans yazı boyutu');
    const px = v.yon === 'em' ? x * ust : x;
    const em = px / ust;
    const css = (n, birim) => String(Number(n.toFixed(4))) + birim;
    const a = ['EM', h.fmt(em, 4) + ' em'];
    const b = ['Piksel', h.fmt(px, 4) + ' px'];
    return {
      rows: [
        v.yon === 'em' ? b : a,
        v.yon === 'em' ? a : b,
        ['Yüzde karşılığı', '%' + h.fmt(em * 100, 2)],
        ['CSS değeri', v.yon === 'em' ? css(px, 'px') : css(em, 'em')],
      ],
      note: 'Referans yazı boyutu ' + h.fmt(ust, 4) + ' px alındı: bu bağlamda 1 em = ' + h.fmt(ust, 4) + ' px.',
    };
  },
  cases: [
    { in: { deger: '20', yon: 'px', ust: '16' }, out: { 'EM': '1,25 em', 'Yüzde karşılığı': '%125', 'CSS değeri': '1.25em' } },
    { in: { deger: '1,5', yon: 'em', ust: '20' }, out: { 'Piksel': '30 px', 'CSS değeri': '30px' } },
    { in: { deger: '12', yon: 'px', ust: '16' }, out: { 'EM': '0,75 em', 'Yüzde karşılığı': '%75' } },
    { in: { deger: '2', yon: 'em' }, out: { 'Piksel': '32 px' } },
    { in: { deger: '18', yon: 'px', ust: '12' }, out: { 'EM': '1,5 em' } },
    { in: { deger: '14', yon: 'px', ust: '14' }, out: { 'EM': '1 em', 'Yüzde karşılığı': '%100' } },
    { in: { deger: '0,8', yon: 'em', ust: '15' }, out: { 'Piksel': '12 px' } },
    { in: { deger: '20', yon: 'px', ust: '-16' }, error: true },
    { in: { deger: 'büyük', yon: 'px', ust: '16' }, error: true },
  ],
  howto: [
    `"Değer" alanına çevirmek istediğiniz piksel ya da em ölçüsünü yazın.`,
    `"Çeviri yönü" listesinden pikselden em'e mi, em'den piksele mi geçeceğinizi seçin.`,
    `"Referans yazı boyutu" alanına em'in dayandığı boyutu piksel olarak girin. Yazı boyutu ayarlıyorsanız bu, üst öğenin hesaplanmış boyutudur; kenar boşluğu ya da genişlik ayarlıyorsanız öğenin kendi yazı boyutudur.`,
    `"Çevir" düğmesine basın ve "CSS değeri" satırındaki noktalı ondalık metni stil dosyanıza aktarın.`,
  ],
  sections: [
    { h: 'Em birimi nereden gelir?', p: [
      `Em, tipografide bir yazı tipinin punto boyutuna eşit genişlikteki ölçünün adıdır; adını geleneksel olarak büyük M harfinin kapladığı kareden alır. CSS bu kavramı göreli bir uzunluk birimi olarak devralmıştır: <strong>1 em, geçerli yazı boyutu kadardır</strong>. Yazı boyutu 16 piksel olan bir paragrafta 1 em 16 pikseldir; 20 piksel olan bir başlıkta 20 pikseldir.`,
      `Yani em sabit bir uzunluk değildir, bir çarpandır. Aynı <code>1.5em</code> değeri sayfanın iki farklı yerinde iki farklı piksel sonucuna dönüşebilir. Bu sayfadaki araç da bu yüzden tek bir sayıyla yetinmez; referans boyutu sizden ister.`,
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      `Pikselden em'e: <strong>em = px ÷ referans yazı boyutu</strong>. Em'den piksele: <strong>px = em × referans yazı boyutu</strong>. Yüzde karşılığı em değerinin 100 katıdır; yazı boyutu için <code>1.25em</code> ile <code>125%</code> aynı sonucu verir.`,
      `<strong>Örnek 1:</strong> Üst öğenin yazısı 16 px ve içindeki alt başlığın 20 px olmasını istiyorsunuz. 20 ÷ 16 = 1,25 em, yani yüzde 125.`,
      `<strong>Örnek 2:</strong> Yazı boyutu 20 px olan bir düğmede <code>padding: 1.5em</code> tanımlı. 1,5 × 20 = 30 px iç boşluk oluşur. Düğmenin yazısını büyütürseniz boşluk da aynı oranda büyür.`,
      `<strong>Örnek 3:</strong> 16 px'lik gövde metninin içinde 12 px'lik bir dipnot için 12 ÷ 16 = 0,75 em yazılır.`,
    ] },
    { h: 'Em hangi boyuta bakar?', p: [
      `Kural özelliğe göre değişir ve en çok karışıklık buradan çıkar. <code>font-size</code> özelliğinde em, <strong>üst öğenin</strong> hesaplanmış yazı boyutuna göre çözülür. <code>margin</code>, <code>padding</code>, <code>width</code>, <code>line-height</code> gibi diğer bütün özelliklerde ise em, <strong>öğenin kendi</strong> yazı boyutuna göre çözülür.`,
      `Somut bir durum: üst öğe 16 px, alt öğe <code>font-size: 1.5em; margin-bottom: 1em</code>. Yazı boyutu 1,5 × 16 = 24 px olur. Alt boşluk ise üst öğeye göre değil öğenin yeni boyutuna göre hesaplanır ve 24 px çıkar. Bu durumda araca referans olarak önce 16, sonra 24 yazmanız gerekir.`,
    ] },
    { h: 'İç içe öğelerde katlanma etkisi', p: [
      `Em'in en bilinen tuzağı birikmedir. Bir listeye <code>font-size: 0.875em</code> verdiğinizi ve liste içinde başka bir liste olduğunu düşünün. Dış liste 16 × 0,875 = 14 px olur. İç liste bu 14 pikseli referans alır ve 14 × 0,875 = 12,25 px'e düşer; üçüncü düzey 10,72 px'e iner. Her düzeyde yazı biraz daha küçülür.`,
      `Bu davranış bazen istenir, çoğu zaman istenmez. Sayfa genelinde tutarlı ölçü gerekiyorsa köke bağlı rem birimi, bir bileşenin kendi içinde orantılı ölçeklenmesi gerekiyorsa em birimi daha uygundur. Düğme, rozet, etiket gibi bileşenlerde iç boşluğu em ile vermek, yazı boyutu değiştiğinde oranların korunmasını sağlar.`,
    ] },
    { h: 'Em nerede iyi çalışır?', ul: [
      `<strong>Bileşen içi boşluklar:</strong> Düğme ve form alanlarında dolgu, yazı boyutuyla birlikte ölçeklenir.`,
      `<strong>Satır içi simgeler:</strong> Genişliği ve yüksekliği 1 em verilen bir simge, yanındaki metinle aynı boyda kalır.`,
      `<strong>Harf ve sözcük aralığı:</strong> <code>letter-spacing</code> değerini em ile vermek, aralığın her yazı boyutunda aynı oranda görünmesini sağlar.`,
      `<strong>Paragraf girintisi ve liste boşlukları:</strong> Tipografik ölçüler geleneksel olarak em ile düşünülür.`,
      `<strong>Medya sorguları:</strong> Em ile yazılan kırılma noktaları, kullanıcının tarayıcıda seçtiği yazı boyutuna uyum sağlar; burada em öğeye değil tarayıcının başlangıç yazı boyutuna göre yorumlanır.`,
    ] },
    { h: '16 px referans için hızlı tablo', ul: [
      `<strong>8 px</strong> = 0,5 em (%50)`,
      `<strong>12 px</strong> = 0,75 em (%75)`,
      `<strong>14 px</strong> = 0,875 em (%87,5)`,
      `<strong>16 px</strong> = 1 em (%100)`,
      `<strong>18 px</strong> = 1,125 em (%112,5)`,
      `<strong>20 px</strong> = 1,25 em (%125)`,
      `<strong>24 px</strong> = 1,5 em (%150)`,
      `<strong>32 px</strong> = 2 em (%200)`,
    ] },
    { h: 'Sınırlar', p: [
      `Araç, tarayıcının hesapladığı gerçek yazı boyutunu bilemez; doğru sonuç için referans boyutu sizin doğru girmeniz gerekir. Emin değilseniz tarayıcının geliştirici araçlarında öğeyi seçip hesaplanmış <code>font-size</code> değerine bakın. Sonuçlar dört ondalık basamağa yuvarlanır ve CSS değeri ondalık nokta ile yazılır.`,
    ] },
  ],
  faq: [
    ['1 em kaç pikseldir?', 'Geçerli yazı boyutu kaç pikselse 1 em o kadardır. Hiçbir özel boyut tanımlanmamış bir sayfada yazı boyutu 16 piksel olduğundan 1 em 16 piksel eder; boyut 20 piksel olan bir öğede 20 pikseldir.'],
    ['Em ile rem arasında ne fark var?', 'Em bulunduğu bağlamdaki yazı boyutuna, rem ise yalnızca kök öğenin yazı boyutuna göre hesaplanır. Em iç içe öğelerde birikir, rem birikmez.'],
    ['Em ile yüzde aynı şey mi?', 'Yazı boyutu için evet: 1,25em ile %125 aynı sonucu verir. Genişlik ve boşluklarda ise yüzde, kapsayıcının genişliğine göre hesaplanır; em yine yazı boyutuna bakar.'],
    ['Referans yazı boyutuna ne yazmalıyım?', 'font-size ayarlıyorsanız üst öğenin hesaplanmış yazı boyutunu, diğer özellikleri ayarlıyorsanız öğenin kendi yazı boyutunu yazın. Bilmiyorsanız tarayıcı geliştirici araçlarından bakabilirsiniz.'],
    ['Yazılarım iç içe listelerde neden küçülüyor?', 'Em her düzeyde bir önceki düzeyin boyutunu referans aldığından 1\'den küçük değerler katlanarak küçülür. Çözüm, bu kuralı rem ile yazmak ya da iç listeler için boyutu 1em olarak sıfırlamaktır.'],
    ['line-height için em kullanmalı mıyım?', 'Satır yüksekliğinde birimsiz sayı (örneğin 1.5) genellikle daha güvenlidir; çünkü birimsiz değer alt öğelere çarpan olarak, em değeri ise hesaplanmış sabit uzunluk olarak aktarılır.'],
    ['E-posta şablonlarında em kullanılabilir mi?', 'Bazı e-posta istemcilerinin göreli birim desteği sınırlıdır. Şablonlarda tutarlı görünüm için ölçüler çoğunlukla piksele çevrilerek yazılır; bu araçla em değerlerinizi piksele dönüştürebilirsiniz.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; hiçbir değer sunucuya iletilmez.'],
  ],
  related: ['px-rem-cevir', 'css-birim-cevir', 'punto-piksel-cevir', 'en-boy-kutu-hesapla', 'ekran-cozunurlugu'],
};
