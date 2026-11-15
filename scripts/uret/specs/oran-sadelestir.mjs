export default {
  slug: 'oran-sadelestir',
  title: 'Oran Sadeleştirme',
  h1Tail: 'a:b en sade hâli',
  pageTitle: 'Oran Sadeleştirme – Oranı En Sade Hâle Getirme (a:b ve a:b:c)',
  description: 'Oranı en sade hâline getirin. 12:18 gibi iki terimli ve 12:18:24 gibi çok terimli oranları, ondalıklı değerleri sadeleştirir; ortak böleni ve yüzde paylarını gösterir.',
  card: 'İki ya da daha çok terimli oranı en küçük tam sayılarla yazın; ortak böleni ve her terimin yüzde payını görün.',
  category: 'matematik',
  keywords: ['oran sadeleştirme', 'oranı en sade hale getirme', 'oran hesaplama', 'en sade oran', 'ebob ile sadeleştirme', 'üçlü oran sadeleştirme', 'en boy oranı bulma', 'ondalıklı oran sadeleştirme'],
  lead: 'Oranı <strong>12:18</strong> ya da <strong>12:18:24</strong> biçiminde yazın; araç bütün terimleri en büyük ortak bölenlerine bölerek oranı en küçük tam sayılarla ifade eder. Ondalıklı terimler de tam sayılı orana çevrilir.',
  button: 'Sadeleştir',
  inputs: [
    { id: 'oran', label: 'Oran', type: 'text', placeholder: 'Örn. 12:18 ya da 6:9:15', hint: 'Terimleri iki nokta üst üste (:) ile ayırın. En az 2, en çok 6 terim yazabilirsiniz.', wide: true },
  ],
  compute(v, h) {
    const ham = String(v.oran ?? '').trim();
    if (ham === '') h.err('"Oran" alanını doldurun (örn. 12:18).');
    const parcalar = ham.split(/[:\/]/).map((p) => p.trim());
    if (parcalar.length < 2) h.err('Oran en az iki terimden oluşur; terimleri iki nokta üst üste ile ayırarak yazın (örn. 12:18).');
    if (parcalar.length > 6) h.err('En çok 6 terimli oran sadeleştirilebilir; terim sayısını azaltın.');
    const terimler = parcalar.map((p, i) => h.pos(p, `${i + 1}. terim`));
    let k = 1, tamlar = null;
    for (let i = 0; i <= 9 && !tamlar; i++) {
      const t = terimler.map((q) => q * k);
      if (t.every((q) => Math.abs(q - Math.round(q)) < 1e-9 * Math.max(1, q) && q < 1e15)) tamlar = t.map(Math.round);
      else k *= 10;
    }
    if (!tamlar) h.err('Terimler çok büyük ya da çok fazla ondalık basamaklı; en çok 9 ondalık basamak kullanın.');
    const ebob = (p, q) => { while (q) { [p, q] = [q, p % q]; } return p; };
    const g = tamlar.reduce(ebob);
    const sade = tamlar.map((q) => q / g);
    const toplam = sade.reduce((p, q) => p + q, 0);
    const bolen = g / k;
    const rows = [
      ['Sadeleşmiş oran', sade.map((q) => h.fmt(q, 0).replace(/\./g, '')).join(':')],
      ['Ortak bölen (EBOB)', h.fmt(bolen, 9)],
      ['Birinci terim 1 alınırsa', sade.map((q) => h.fmt(q / sade[0], 4)).join(' : ')],
      ['Terimlerin payı', sade.map((q) => '%' + h.fmt(q / toplam * 100, 2)).join(' / ')],
    ];
    if (sade.length === 2) rows.push(['Kesir değeri (ilk ÷ ikinci)', h.fmt(sade[0] / sade[1], 6)]);
    return {
      rows,
      note: Math.abs(bolen - 1) < 1e-12
        ? 'Girdiğiniz oran zaten en sade hâlinde; terimlerin 1\'den büyük ortak böleni yok.'
        : 'Bütün terimler ortak bölene bölündü; oranın değeri değişmedi, yalnızca yazılışı sadeleşti.',
    };
  },
  cases: [
    { in: { oran: '12:18' }, out: { 'Sadeleşmiş oran': '2:3', 'Ortak bölen (EBOB)': '6', 'Birinci terim 1 alınırsa': '1 : 1,5', 'Terimlerin payı': '%40 / %60', 'Kesir değeri (ilk ÷ ikinci)': '0,666667' } },
    { in: { oran: '12:18:24' }, out: { 'Sadeleşmiş oran': '2:3:4', 'Ortak bölen (EBOB)': '6', 'Terimlerin payı': '%22,22 / %33,33 / %44,44' } },
    { in: { oran: '1920:1080' }, out: { 'Sadeleşmiş oran': '16:9', 'Ortak bölen (EBOB)': '120', 'Kesir değeri (ilk ÷ ikinci)': '1,777778' } },
    { in: { oran: '100:25' }, out: { 'Sadeleşmiş oran': '4:1', 'Ortak bölen (EBOB)': '25', 'Terimlerin payı': '%80 / %20' } },
    { in: { oran: '1,5:2' }, out: { 'Sadeleşmiş oran': '3:4', 'Ortak bölen (EBOB)': '0,5' } },
    { in: { oran: '0,25 : 1' }, out: { 'Sadeleşmiş oran': '1:4' } },
    { in: { oran: '7:13' }, out: { 'Sadeleşmiş oran': '7:13', 'Ortak bölen (EBOB)': '1' } },
    { in: { oran: '2,4:3,6:6' }, out: { 'Sadeleşmiş oran': '2:3:5', 'Ortak bölen (EBOB)': '1,2', 'Terimlerin payı': '%20 / %30 / %50' } },
    { in: { oran: '6/8' }, out: { 'Sadeleşmiş oran': '3:4' } },
    { in: { oran: '12' }, error: true },
    { in: { oran: '12:0' }, error: true },
    { in: { oran: 'a:b' }, error: true },
  ],
  howto: [
    'Oranın terimlerini aralarına iki nokta üst üste koyarak "Oran" alanına yazın: iki terimli oran için 12:18, üç terimli oran için 12:18:24 gibi.',
    'Ondalıklı terimlerde virgül kullanın (örneğin 1,5:2). Bütün terimler aynı birimde ve sıfırdan büyük olmalıdır.',
    '"Sadeleştir" düğmesine basın. İlk satırda oranın en sade hâli, ikinci satırda terimlerin bölündüğü ortak bölen görünür.',
    'Alt satırlardan birinci terim 1 kabul edildiğindeki karşılıkları ve her terimin toplam içindeki yüzde payını okuyun.',
  ],
  sections: [
    { h: 'Oran nedir, sadeleştirmek ne demektir?', p: [
      'Oran, aynı türden iki ya da daha çok büyüklüğün birbirine göre ne kadar olduğunu gösteren karşılaştırmadır. 12 kız ve 18 erkek öğrencinin bulunduğu bir sınıfta kızların erkeklere oranı 12:18\'dir. Bu oran doğru olmakla birlikte en yalın anlatım değildir; "her 2 kıza karşılık 3 erkek" demek aynı bilgiyi daha küçük sayılarla verir.',
      'Sadeleştirme, oranın bütün terimlerini aynı sayıya bölerek daha küçük tam sayılarla yazmaktır. Terimlerin 1\'den başka ortak böleni kalmadığında oran <strong>en sade hâline</strong> gelmiş olur. Sadeleştirme oranın değerini değiştirmez: 12:18, 6:9 ve 2:3 aynı oranı ifade eder; tıpkı 12/18 ile 2/3 kesirlerinin eşit olması gibi.',
    ] },
    { h: 'Nasıl hesaplanır?', ol: [
      'Terimlerin <strong>en büyük ortak bölenini (EBOB)</strong> bulun. İkiden fazla terim varsa hepsini birden bölen en büyük sayı aranır.',
      'Her terimi bu sayıya bölün.',
      'Bölümleri aynı sırayla, aralarına iki nokta üst üste koyarak yazın.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 12:18. 12\'nin bölenleri 1, 2, 3, 4, 6, 12; 18\'in bölenleri 1, 2, 3, 6, 9, 18. En büyük ortak bölen 6\'dır. 12 ÷ 6 = 2 ve 18 ÷ 6 = 3, yani oran <strong>2:3</strong> olur. Toplam 5 payın 2\'si birinci terime düşer; bu da %40 ve %60 paylarına karşılık gelir.',
      '<strong>Örnek 2:</strong> 12:18:24. Üç sayının en büyük ortak böleni yine 6\'dır. Bölümler 2, 3 ve 4; oran <strong>2:3:4</strong>.',
      '<strong>Örnek 3:</strong> 1920:1080. EBOB 120\'dir. 1920 ÷ 120 = 16 ve 1080 ÷ 120 = 9; oran <strong>16:9</strong>. Bu, geniş ekran görüntülerin bilinen en-boy oranıdır.',
      '<strong>Örnek 4:</strong> 100:25. EBOB 25\'tir; oran <strong>4:1</strong>. Birinci büyüklük ikincinin dört katıdır.',
    ] },
    { h: 'Ondalıklı oranları sadeleştirme', p: [
      'Terimler ondalıklı olduğunda önce hepsi aynı 10 kuvvetiyle çarpılarak tam sayıya çevrilir, sonra bilinen yöntem uygulanır. 1,5:2 oranında iki terim de 10 ile çarpılır ve 15:20 elde edilir; 15 ile 20\'nin EBOB\'u 5 olduğundan oran <strong>3:4</strong> olur. Araç bu durumda ortak böleni başlangıçtaki terimler cinsinden gösterir: 1,5 ÷ 0,5 = 3 ve 2 ÷ 0,5 = 4, yani ortak bölen 0,5\'tir.',
      'Benzer biçimde 2,4:3,6:6 oranı 24:36:60 olarak yazılır, EBOB 12 bulunur ve sonuç 2:3:5 çıkar. Kesirli terimlerde de mantık aynıdır: bütün terimler paydaların ortak katıyla çarpılıp tam sayıya çevrilir.',
    ] },
    { h: 'Sonuç satırlarının anlamı', ul: [
      '<strong>Sadeleşmiş oran:</strong> Oranın en küçük tam sayılarla yazılmış hâli.',
      '<strong>Ortak bölen (EBOB):</strong> Girdiğiniz terimlerin bölündüğü sayı. 1 çıkıyorsa oran zaten sadedir.',
      '<strong>Birinci terim 1 alınırsa:</strong> Oranın "1\'e karşılık kaç" biçimi. Ölçeklerde ve karışım tariflerinde bu yazım yaygındır; 2:3 oranı 1 : 1,5 olarak da söylenebilir.',
      '<strong>Terimlerin payı:</strong> Her terimin toplam içindeki yüzdesi. Bir bütünü verilen orana göre paylaştırırken doğrudan kullanılır.',
      '<strong>Kesir değeri:</strong> İki terimli oranlarda ilk terimin ikinciye bölümü.',
    ] },
    { h: 'Oranların kullanıldığı yerler', p: [
      '<strong>Tarifler ve karışımlar:</strong> 500 gram una 300 gram su kullanılan bir hamurda un-su oranı 5:3\'tür. Oranı bilmek, tarifi istediğiniz miktara büyütüp küçültmeyi kolaylaştırır. Harç, boya, temizlik çözeltisi ve gübre karışımlarında da ürün etiketleri oran verir.',
      '<strong>Ekran ve fotoğraf:</strong> Piksel boyutlarından en-boy oranı bulunur: 1920×1080 ve 1280×720 çözünürlüklerin ikisi de 16:9\'dur; 1024×768 ise 4:3 eder. Görseli bozmadan yeniden boyutlandırmak için bu oranın korunması gerekir.',
      '<strong>Harita ve maket ölçekleri:</strong> 1:50.000 ölçekli bir haritada 1 santimetre, arazide 50.000 santimetreye, yani 500 metreye karşılık gelir.',
      '<strong>Paylaşım:</strong> Bir tutar ortaklar arasında 2:3:5 oranında bölünecekse toplam pay 10\'dur ve ortaklar tutarın %20, %30 ve %50\'sini alır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Farklı birimleri oranlamak. 50 santimetrenin 2 metreye oranı 50:2 değildir; önce aynı birime çevrilir (50:200) ve 1:4 bulunur.',
      'Terimlerin yalnızca bir kısmını bölmek. Üç terimli oranda üç terimin de aynı sayıya bölünmesi gerekir; 12:18:25 oranında ilk iki terim 6\'ya bölünebilir ama üçüncüsü bölünemediğinden oran zaten sadedir.',
      'Terimlerin sırasını değiştirmek. 2:3 ile 3:2 farklı oranlardır.',
      'Sıfır ya da negatif terim yazmak. Araç yalnızca sıfırdan büyük terimleri kabul eder.',
      'Büyük sayılarda binlik ayırıcı kullanmak. Nokta ondalık ayırıcı sayılabileceğinden 50.000 yerine 50000 yazın.',
      'Çok terimli oranı tek bir kesre çevirmeye çalışmak. a:b:c üç büyüklüğü birlikte karşılaştırır; tek bir bölme işlemine karşılık gelmez.',
    ] },
  ],
  faq: [
    ['Oran nasıl sadeleştirilir?', 'Bütün terimler en büyük ortak bölenlerine bölünür. Örneğin 12:18 oranında EBOB 6\'dır; 12 ÷ 6 = 2 ve 18 ÷ 6 = 3 olduğundan oranın en sade hâli 2:3\'tür.'],
    ['Üç terimli oran sadeleştirilebilir mi?', 'Evet. Üç terimin birlikte en büyük ortak böleni bulunur ve hepsi bu sayıya bölünür. 12:18:24 oranı 2:3:4 olur. Araç en çok altı terimli oranları destekler.'],
    ['Ondalıklı oranı nasıl sadeleştiririm?', 'Terimleri virgülle yazmanız yeterlidir. Araç önce bütün terimleri tam sayıya çevirir, sonra sadeleştirir: 1,5:2 oranı 15:20 üzerinden 3:4 bulunur.'],
    ['Oran ile kesir aynı şey midir?', 'İki terimli oran bir kesir gibi yazılabilir: 2:3 oranı 2/3 değerine karşılık gelir. Ancak oran parçayı parçayla da karşılaştırabilir. Sınıftaki 2:3 kız-erkek oranında kızlar sınıfın 2/3\'ü değil, 2/5\'idir.'],
    ['Sadeleştirme oranın değerini değiştirir mi?', 'Hayır. Bütün terimler aynı sayıya bölündüğü için büyüklükler arasındaki ilişki aynı kalır. 12:18 ile 2:3 aynı oranı gösterir; yalnızca yazılışı sadeleşir.'],
    ['Ortak bölen 1 çıkıyorsa ne anlama gelir?', 'Terimler aralarında asaldır, yani 1\'den başka ortak bölenleri yoktur. Oran zaten en sade hâlindedir; 7:13 buna bir örnektir.'],
    ['Ekran çözünürlüğünden en-boy oranını bulabilir miyim?', 'Evet. Genişlik ve yüksekliği piksel olarak yazın: 1920:1080 için sonuç 16:9, 1024:768 için 4:3 çıkar.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Sadeleştirme tarayıcınızda yapılır; girdiğiniz oran sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kesir-sadelestir', 'ters-oranti-hesapla', 'ondalik-kesir-cevir', 'yuzde-kesir-cevir', 'kesir-karsilastir'],
};
