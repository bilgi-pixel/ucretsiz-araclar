export default {
  slug: 'yazma-hizi-sure-hesapla',
  title: 'Yazma Hızına Göre Süre Hesaplama',
  h1Tail: 'klavyede kaç dakika sürer?',
  pageTitle: 'Yazma Hızına Göre Süre Hesaplama – Metin Kaç Dakikada Yazılır?',
  description: 'Kelime ya da karakter sayısını ve dakikadaki yazma hızınızı girin; metni klavyede yazmanın ne kadar süreceğini düzeltme payıyla birlikte hesaplayın.',
  card: 'Bir metni klavyede yazmanın kaç dakika süreceğini kelime ya da karakter sayısına ve yazma hızınıza göre bulun.',
  category: 'egitim',
  keywords: ['yazma hızı süre hesaplama', 'kelime kaç dakikada yazılır', 'wpm süre hesaplama', 'klavye yazma süresi', 'dakikada kelime', 'metin yazma süresi', 'on parmak yazma hızı'],
  lead: 'Yazacağınız metnin uzunluğunu ve dakikada kaç kelime yazdığınızı girin; araç metnin klavyede <strong>ne kadar sürede</strong> yazılacağını hesaplasın. Düzeltme ve duraklama payı ekleyerek daha gerçekçi bir süre elde edebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Metin uzunluğu', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['kelime', 'Kelime'], ['karakter', 'Karakter (boşluklar dahil)']] },
    { id: 'hiz', label: 'Yazma hızı (kelime/dakika)', type: 'number', value: '40', hint: 'Hız testlerinde 1 kelime 5 vuruş sayılır.' },
    { id: 'pay', label: 'Düzeltme ve duraklama payı (%)', type: 'number', value: '0', hint: 'Yazım hatalarını düzeltme, düşünme ve kısa molalar için.' },
  ],
  compute(v, h) {
    const u = h.pos(v.uzunluk, 'Metin uzunluğu');
    const hiz = h.pos(v.hiz, 'Yazma hızı');
    const pay = h.nonneg(String(h.opt(v.pay, 0, 'Düzeltme payı')), 'Düzeltme payı');
    if (hiz > 400) h.err('Yazma hızı dakikada 400 kelimeden büyük olamaz; değeri kontrol edin.');
    if (pay > 500) h.err('Düzeltme payı en fazla %500 olabilir.');
    if (u > 1e9) h.err('Metin uzunluğu çok büyük.');
    const kelime = v.birim === 'karakter' ? u / 5 : u;
    const dk = (kelime / hiz) * (1 + pay / 100);
    const sn = Math.round(dk * 60);
    const sa = Math.floor(sn / 3600), d = Math.floor((sn % 3600) / 60), s = sn % 60;
    const parca = [];
    if (sa > 0) parca.push(`${h.fmt(sa, 0)} sa`);
    if (d > 0 || (sa > 0 && s > 0)) parca.push(`${d} dk`);
    if (s > 0 || parca.length === 0) parca.push(`${s} sn`);
    return {
      rows: [
        ['Tahmini süre', parca.join(' ')],
        ['Toplam dakika', h.fmt(dk, 2) + ' dk'],
        ['Kelime karşılığı', h.fmt(kelime, 1) + ' kelime'],
        ['Vuruş karşılığı', h.fmt(kelime * 5, 0) + ' vuruş'],
        ['Dakikadaki vuruş', h.fmt(hiz * 5, 0) + ' vuruş/dk'],
        ['Pay dahil saatlik üretim', h.fmt((hiz * 60) / (1 + pay / 100), 0) + ' kelime/saat'],
      ],
      note: 'Hız testlerindeki standart kabulle 1 kelime = 5 vuruş (boşluk dahil) alınmıştır. Süre yalnızca yazmayı kapsar; metni tasarlama ve gözden geçirme süresi için pay ekleyin.',
    };
  },
  cases: [
    { in: { uzunluk: '1000', birim: 'kelime', hiz: '40', pay: '0' }, out: { 'Tahmini süre': '25 dk', 'Toplam dakika': '25 dk', 'Vuruş karşılığı': '5.000 vuruş', 'Dakikadaki vuruş': '200 vuruş/dk' } },
    { in: { uzunluk: '500', birim: 'kelime', hiz: '50', pay: '20' }, out: { 'Tahmini süre': '12 dk', 'Pay dahil saatlik üretim': '2.500 kelime/saat' } },
    { in: { uzunluk: '3000', birim: 'karakter', hiz: '60', pay: '0' }, out: { 'Tahmini süre': '10 dk', 'Kelime karşılığı': '600 kelime' } },
    { in: { uzunluk: '250', birim: 'kelime', hiz: '40', pay: '0' }, out: { 'Tahmini süre': '6 dk 15 sn', 'Toplam dakika': '6,25 dk' } },
    { in: { uzunluk: '10000', birim: 'kelime', hiz: '40', pay: '0' }, out: { 'Tahmini süre': '4 sa 10 dk', 'Toplam dakika': '250 dk' } },
    { in: { uzunluk: '100', birim: 'kelime', hiz: '80', pay: '0' }, out: { 'Tahmini süre': '1 dk 15 sn' } },
    { in: { uzunluk: '20', birim: 'kelime', hiz: '40', pay: '0' }, out: { 'Tahmini süre': '30 sn' } },
    { in: { uzunluk: '1000', birim: 'kelime', hiz: '0', pay: '0' }, error: true },
    { in: { uzunluk: '', birim: 'kelime', hiz: '40', pay: '0' }, error: true },
    { in: { uzunluk: '1000', birim: 'kelime', hiz: '40', pay: '-10' }, error: true },
  ],
  howto: [
    'Yazacağınız metnin uzunluğunu girin ve bu sayının kelime mi yoksa boşluklar dahil karakter mi olduğunu seçin.',
    'Dakikadaki yazma hızınızı kelime cinsinden yazın. Bilmiyorsanız bir dakikalık bir hız testi yapın ya da varsayılan 40 değeriyle başlayın.',
    'Hataları düzeltme, düşünme ve kısa duraklamalar için bir yüzde payı ekleyin; kaynak metne bakarak yazıyorsanız yüzde 10–20, kendi metninizi oluşturuyorsanız daha yüksek bir pay gerçekçidir.',
    '"Hesapla" düğmesine basın. Tahmini süre saat, dakika ve saniye olarak gösterilir.',
  ],
  sections: [
    { h: 'Yazma hızı nasıl ölçülür?', p: [
      'Klavyede yazma hızı çoğunlukla dakikadaki kelime sayısıyla ifade edilir; İngilizce kısaltması WPM\'dir (words per minute). Kelimelerin uzunluğu dilden dile ve metinden metne değiştiği için hız testlerinde ortak bir ölçü kullanılır: <strong>boşluklar dahil her 5 vuruş bir kelime</strong> sayılır. Buna göre dakikada 200 vuruş yapan biri 40 kelime/dakika hızındadır.',
      'Bu kabul önemli bir sonuç doğurur. Türkçe sondan eklemeli bir dildir ve kelimeleri ortalama olarak İngilizce kelimelerden uzundur. Dolayısıyla hız testinde 40 kelime/dakika ölçülen biri, gerçek bir Türkçe metinde dakikada 40\'tan az kelime yazabilir. En güvenilir sonuç için metnin uzunluğunu karakter olarak girin; araç karakter sayısını 5\'e bölerek test ölçüsüne çevirir.',
    ] },
    { h: 'Formül', p: [
      'Hesap tek satırdır: <strong>süre (dakika) = kelime sayısı ÷ yazma hızı × (1 + pay ÷ 100)</strong>. Uzunluk karakter olarak verildiyse önce kelimeye çevrilir: kelime = karakter ÷ 5. Düzeltme payı, saf yazma süresinin üzerine eklenen orandır; yüzde 20 pay, 10 dakikalık işi 12 dakikaya çıkarır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '1000 kelimelik bir metni dakikada 40 kelime hızla, pay eklemeden yazmak 1000 ÷ 40 = <strong>25 dakika</strong> sürer. Bu, 5000 vuruşa ve dakikada 200 vuruşa karşılık gelir.',
      '500 kelimelik bir yazıyı dakikada 50 kelime hızla yazıyorsanız saf süre 10 dakikadır. Yüzde 20 düzeltme payıyla süre <strong>12 dakikaya</strong> çıkar; bu tempoda saatte ortaya çıkan net metin 2500 kelimedir.',
      'Boşluklar dahil 3000 karakterlik bir metin 600 test kelimesine eşittir. Dakikada 60 kelime yazan biri bunu <strong>10 dakikada</strong> bitirir. 250 kelimelik kısa bir e-posta ise 40 kelime/dakika hızla 6 dakika 15 saniye tutar.',
    ] },
    { h: 'Hız düzeyleri için yaklaşık başvuru', p: [
      'Aşağıdaki aralıklar kesin sınırlar değildir; kişiden kişiye, klavyeye ve metnin türüne göre değişir. Kendi hızınızı ölçmek her zaman daha doğrudur.',
    ], ul: [
      '<strong>20–30 kelime/dk</strong>: klavyeye bakarak, iki ya da birkaç parmakla yazanlar.',
      '<strong>35–45 kelime/dk</strong>: düzenli bilgisayar kullanan çoğu kişinin bulunduğu aralık.',
      '<strong>50–70 kelime/dk</strong>: on parmak yazan, klavyeye bakmayan kullanıcılar.',
      '<strong>80 kelime/dk ve üzeri</strong>: yoğun pratik yapmış, mesleği gereği çok yazan kişiler.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Ödev, tez ya da rapor teslimine ne kadar yazım süresi ayırmanız gerektiğini planlarken; el yazısı notları ya da ses kayıtlarını temize çekerken; veri girişi, çeviri ve içerik yazarlığı gibi işlerde teslim süresi ve ücret belirlerken bu hesap doğrudan kullanılabilir. Büro yönetimi, adalet ve sekreterlik alanlarındaki klavye uygulama sınavlarına hazırlananlar da belirli bir sürede istenen kelime sayısına ulaşmak için hangi hıza çıkmaları gerektiğini tersinden görebilir.',
      'Örneğin 3 dakikada 90 kelime yazmanız isteniyorsa gereken hız 30 kelime/dakikadır. Araçta 90 kelime ve 30 hız girdiğinizde sürenin tam 3 dakika çıktığını görürsünüz; hızınız 25 ise süre 3 dakika 36 saniyeye uzar. Sınavların kendi sayma kuralları (yanlış kelimelerin düşülmesi gibi) olabileceğini unutmayın; koşullar için ilgili sınavın güncel kılavuzuna bakın.',
    ] },
    { h: 'Yazma hızını artırmak için', ul: [
      'Klavyeye bakmadan, on parmakla yazmayı öğrenin. Başlangıçta hız düşer, birkaç hafta içinde eski hızın üzerine çıkar.',
      'Önce doğruluğa, sonra hıza odaklanın. Hata düzeltmek, yavaş ama doğru yazmaktan daha çok zaman alır.',
      'Günde 10–15 dakikalık düzenli pratik, haftada bir yapılan uzun çalışmadan daha etkilidir.',
      'Türkçe yazıyorsanız F klavye de bir seçenektir; Türkçede sık geçen harfler temel sıraya yerleştirildiği için parmak hareketi azalır. Q klavyeyle de yüksek hızlara ulaşılabilir; önemli olan tek düzende kalmaktır.',
      'Bilek ve omuz duruşuna dikkat edin, uzun yazma seanslarında düzenli mola verin.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap sabit bir hız varsayar. Gerçekte hız yorgunlukla düşer, sayı, simge ve yabancı sözcük içeren metinlerde yavaşlar. Ayrıca araç yalnızca tuşlama süresini ölçer; ne yazacağını düşünme, kaynak tarama ve son okuma bunun dışındadır. Özgün bir metin üretirken yazma süresi çoğu zaman toplam emeğin küçük bir bölümüdür. Dokunmatik ekranda ya da sesle yazmada hızlar farklıdır; kendi ölçtüğünüz hızı girerseniz araç onlar için de kullanılabilir.',
    ] },
  ],
  faq: [
    ['1000 kelimelik bir yazı kaç dakikada yazılır?', 'Dakikada 40 kelime hızla, duraklamasız 25 dakikada yazılır. Hız 60 kelime/dakika ise yaklaşık 16 dakika 40 saniye, 25 kelime/dakika ise 40 dakika sürer. Düzeltme payı eklerseniz süre o oranda uzar.'],
    ['Yazma hızımı nasıl öğrenirim?', 'Bir kronometre açıp tanıdık bir metni bir ya da üç dakika boyunca yazın. Yazdığınız karakter sayısını (boşluklar dahil) 5\'e, sonra dakikaya bölün. Örneğin 3 dakikada 660 karakter yazdıysanız hızınız 44 kelime/dakikadır.'],
    ['Neden 1 kelime 5 karakter sayılıyor?', 'Kelime uzunlukları değişken olduğu için hız ölçümlerinde ortak bir birim gerekir. Yaygın kabul, boşluk dahil 5 vuruşun bir kelime sayılmasıdır. Bu sayede farklı metinlerle yapılan ölçümler karşılaştırılabilir.'],
    ['Türkçe metinlerde sonuç doğru çıkar mı?', 'Kelime sayısıyla hesap yaptığınızda süre biraz düşük çıkabilir, çünkü Türkçe kelimeler ortalama olarak 5 karakterden uzundur. Daha doğru sonuç için metnin karakter sayısını girin.'],
    ['Düzeltme payını yüzde kaç almalıyım?', 'Hazır bir metni kopyalıyorsanız yüzde 10–20 çoğu zaman yeterlidir. Kendi düşüncelerinizi yazıya döküyorsanız yüzde 50–100 hatta daha fazlası gerekebilir; bu tümüyle çalışma biçiminize bağlıdır.'],
    ['Karakter sayısına boşluklar dahil mi?', 'Evet. Boşluk tuşu da bir vuruştur ve süre alır. Kelime işlemcilerdeki "boşluklu karakter sayısı" değerini kullanın.'],
    ['El yazısı için de kullanabilir miyim?', 'Kendi el yazısı hızınızı ölçüp kelime/dakika olarak girerseniz evet. Araç hesabı hıza göre yapar; hızın hangi araçla elde edildiği sonucu değiştirmez.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda gerçekleşir; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kelime-sayfa-cevir', 'kitap-okuma-suresi-hesapla', 'sunum-suresi-hesapla', 'pomodoro-plani-hesapla', 'soru-cozme-hizi-hesapla'],
};
