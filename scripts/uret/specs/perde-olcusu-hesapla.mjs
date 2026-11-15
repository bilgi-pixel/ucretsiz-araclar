export default {
  slug: 'perde-olcusu-hesapla',
  title: 'Perde Ölçüsü ve Kumaş Hesaplama',
  h1Tail: 'pile oranı ve metraj',
  pageTitle: 'Perde Ölçüsü Hesaplama – Tül ve Fon Perde Kumaş Metrajı',
  description: 'Korniş genişliğini, perde boyunu ve pile oranını girin; tül ya da fon perde için kaç metre kumaş gerektiğini, pano sayısını ve kesim boyunu hesaplayın.',
  card: 'Korniş genişliği, perde boyu ve pile oranından tül ya da fon perde için gereken kumaş metrajını bulun.',
  category: 'insaat',
  keywords: ['perde ölçüsü hesaplama', 'perde kumaş hesaplama', 'tül perde kaç metre', 'pile oranı hesaplama', 'fon perde metraj', '1e 3 pile ne demek', 'perde boyu nasıl ölçülür'],
  lead: "Korniş genişliğinden ve perde boyundan yola çıkarak <strong>kaç metre perdelik kumaş</strong> almanız gerektiğini hesaplayın. Araç hem geniş enli tül kumaşları hem de panolar halinde dikilen dar enli fon ve stor kumaşlarını destekler.",
  button: 'Hesapla',
  inputs: [
    { id: 'genislik', label: 'Korniş / ray genişliği (cm)', type: 'number', placeholder: 'Örn. 300' },
    { id: 'boy', label: 'Bitmiş perde boyu (cm)', type: 'number', placeholder: 'Örn. 260' },
    { id: 'pile', label: 'Pile oranı', type: 'select', value: '2.5', options: [['1', '1\'e 1 (düz, pilesiz)'], ['1.5', '1\'e 1,5 (seyrek pile)'], ['2', '1\'e 2'], ['2.5', '1\'e 2,5'], ['3', '1\'e 3 (sık pile)']] },
    { id: 'kullanim', label: 'Kumaş kullanımı', type: 'select', options: [['en', 'Geniş enli kumaş (tül): eni perde boyu olur'], ['pano', 'Dar enli kumaş (fon): panolar dikilir']] },
    { id: 'kumasEni', label: 'Kumaş eni (cm)', type: 'number', value: '300', hint: 'Tüllerde çoğunlukla 280–320 cm, fon kumaşlarda 140–150 cm.' },
    { id: 'kanat', label: 'Kanat sayısı', type: 'select', options: [['1', 'Tek kanat'], ['2', 'Çift kanat']] },
    { id: 'boyPay', label: 'Etek ve büzgü payı (cm)', type: 'number', value: '20', hint: 'Alt kıvırma ile üst büzgü bandı payının toplamı.' },
    { id: 'yanPay', label: 'Yan kenar payı (cm)', type: 'number', value: '5', hint: 'Her kanadın her iki yanı için.' },
  ],
  compute(v, h) {
    const g = h.pos(v.genislik, 'Korniş / ray genişliği');
    const boy = h.pos(v.boy, 'Bitmiş perde boyu');
    const pile = Number(v.pile);
    if (!(pile >= 1)) h.err('Pile oranı listeden seçilmelidir.');
    const ke = h.pos(v.kumasEni, 'Kumaş eni');
    const kanat = v.kanat === '2' ? 2 : 1;
    const bp = h.nonneg(v.boyPay, 'Etek ve büzgü payı');
    const yp = h.nonneg(v.yanPay, 'Yan kenar payı');
    const kesim = boy + bp;
    const kanatGen = g * pile / kanat + 2 * yp;
    const toplamGen = kanatGen * kanat;
    const rows = [];
    if (v.kullanim === 'pano') {
      const panoKanat = Math.ceil(kanatGen / ke - 1e-9);
      const pano = panoKanat * kanat;
      rows.push(['Gerekli kumaş', h.fmt(pano * kesim / 100, 2) + ' m']);
      rows.push(['Pano sayısı', pano + ' adet']);
      rows.push(['Pano kesim boyu', h.fmt(kesim, 1) + ' cm']);
      rows.push(['Dikilecek toplam genişlik', h.fmt(toplamGen, 1) + ' cm']);
      rows.push(['Kanat başına genişlik', h.fmt(kanatGen, 1) + ' cm']);
      return { rows, note: 'Desenli kumaşlarda her pano için desen tekrarı (raport) kadar ek pay gerekir; bu pay hesaba dahil değildir.' };
    }
    if (ke + 1e-9 < kesim) h.err('Kumaş eni (' + h.fmt(ke, 1) + ' cm), perde boyu ile payların toplamından (' + h.fmt(kesim, 1) + ' cm) kısa. Daha geniş enli kumaş seçin ya da "Dar enli kumaş" kullanımına geçin.');
    rows.push(['Gerekli kumaş', h.fmt(toplamGen / 100, 2) + ' m']);
    rows.push(['Dikilecek toplam genişlik', h.fmt(toplamGen, 1) + ' cm']);
    rows.push(['Kanat başına genişlik', h.fmt(kanatGen, 1) + ' cm']);
    rows.push(['Gereken kumaş eni (boy + pay)', h.fmt(kesim, 1) + ' cm']);
    rows.push(['Enden artan kumaş', h.fmt(ke - kesim, 1) + ' cm']);
    return { rows, note: 'Geniş enli kumaşta metraj korniş boyunca alınır; kumaşın eni perdenin boyunu oluşturur.' };
  },
  cases: [
    { in: { genislik: '300', boy: '260', pile: '3', kullanim: 'en', kumasEni: '300', kanat: '1' }, out: { 'Gerekli kumaş': '9,1 m', 'Dikilecek toplam genişlik': '910 cm', 'Gereken kumaş eni (boy + pay)': '280 cm', 'Enden artan kumaş': '20 cm' } },
    { in: { genislik: '200', boy: '260', pile: '2', kullanim: 'pano', kumasEni: '140', kanat: '2' }, out: { 'Gerekli kumaş': '11,2 m', 'Pano sayısı': '4 adet', 'Pano kesim boyu': '280 cm', 'Dikilecek toplam genişlik': '420 cm', 'Kanat başına genişlik': '210 cm' } },
    { in: { genislik: '400', boy: '250', kullanim: 'en', kumasEni: '280', kanat: '2' }, out: { 'Gerekli kumaş': '10,2 m', 'Kanat başına genişlik': '510 cm', 'Enden artan kumaş': '10 cm' } },
    { in: { genislik: '150', boy: '200', pile: '1', kullanim: 'en', kumasEni: '300', kanat: '1', boyPay: '0', yanPay: '0' }, out: { 'Gerekli kumaş': '1,5 m', 'Dikilecek toplam genişlik': '150 cm', 'Enden artan kumaş': '100 cm' } },
    { in: { genislik: '120', boy: '230', pile: '2.5', kullanim: 'pano', kumasEni: '150', kanat: '1', boyPay: '25', yanPay: '5' }, out: { 'Gerekli kumaş': '7,65 m', 'Pano sayısı': '3 adet', 'Pano kesim boyu': '255 cm', 'Dikilecek toplam genişlik': '310 cm' } },
    { in: { genislik: '350', boy: '270', pile: '1.5', kullanim: 'pano', kumasEni: '140', kanat: '2', boyPay: '20', yanPay: '4' }, out: { 'Gerekli kumaş': '11,6 m', 'Pano sayısı': '4 adet', 'Kanat başına genişlik': '270,5 cm' } },
    { in: { genislik: '300', boy: '290', pile: '3', kullanim: 'en', kumasEni: '280', kanat: '1' }, error: true },
    { in: { genislik: '', boy: '260' }, error: true },
  ],
  howto: [
    "Kornişin ya da rayın uçtan uca genişliğini santimetre olarak ölçüp yazın. Pencereyi değil, perdenin asılacağı kornişi ölçün.",
    "Bitmiş perde boyunu girin: kornişin perde takılan noktasından perdenin biteceği yere (zemin, pencere altı ya da denizlik) kadar olan mesafe.",
    "Pile oranını ve kumaş kullanımını seçin. Tül gibi 280–320 cm enli kumaşlarda \"Geniş enli\", 140–150 cm enli fon kumaşlarında \"Dar enli\" seçeneği uygundur. Kumaş enini topun etiketindeki değere göre düzeltin.",
    "Kanat sayısını ve dikiş paylarını kontrol edip \"Hesapla\" düğmesine basın. Alınacak kumaş metrajı ve kesim ölçüleri listelenir.",
  ],
  sections: [
    { h: 'Pile oranı ne demektir?', p: [
      "Pile oranı, perdenin korniş genişliğine göre kaç kat kumaşla dikildiğini anlatır. \"1'e 3 pile\" denildiğinde 1 metrelik korniş için 3 metre genişliğinde kumaş kullanılır; kumaş büzülerek ya da pilelenerek 1 metreye sığdırılır. Oran büyüdükçe perde daha dolgun ve dökümlü görünür, kumaş tüketimi de aynı oranda artar.",
      "Tül perdelerde 1'e 2,5 ve 1'e 3 en çok tercih edilen oranlardır; ince ve uçuşan kumaşlar sık pileyle daha iyi durur. Fon perdelerde kumaş kalın olduğundan 1'e 2 ya da 1'e 2,5 çoğunlukla yeterlidir. Stor, zebra ve Japon panel gibi düz sistemlerde pile yoktur; oran 1'e 1'dir.",
    ] },
    { h: 'Geniş enli kumaşla hesap (tül)', p: [
      "Tül kumaşların eni çoğunlukla 280–320 cm arasındadır ve bu en, perdenin boyunu oluşturacak biçimde kullanılır. Yani kumaş yan çevrilir: toptan kesilen metraj perdenin genişliğini, kumaşın eni ise perdenin yüksekliğini verir. Bu sayede perdede dikey ek dikişi olmaz.",
      "Formül basittir: <strong>metraj = korniş genişliği × pile oranı + yan kenar payları</strong>. Örneğin 300 cm kornişe 1'e 3 pileyle tek kanat tül dikilecekse 300 × 3 = 900 cm, iki yan kenar için 2 × 5 = 10 cm eklenerek 910 cm, yani <strong>9,1 metre</strong> kumaş alınır. Perde boyu 260 cm ve etek ile büzgü payı 20 cm ise kumaşın eninin en az 280 cm olması gerekir; 300 cm enli kumaşta 20 cm artar ve bu fazlalık etek kıvrımına katılabilir ya da kesilir.",
    ] },
    { h: 'Dar enli kumaşla hesap (fon perde)', p: [
      "Fon ve döşemelik tipi kumaşlar çoğunlukla 140–150 cm enindedir; perde boyu bu ene sığmaz. Bu yüzden kumaş boyuna kullanılır ve gerekli genişlik, yan yana dikilen panolarla elde edilir. Her kanat için gereken genişlik kumaş enine bölünür ve yukarı yuvarlanarak pano sayısı bulunur. Metraj ise <strong>pano sayısı × (perde boyu + etek ve büzgü payı)</strong> işlemidir.",
      "Örnek: 200 cm kornişe 1'e 2 pileyle çift kanat fon perde. Toplam pileli genişlik 400 cm, kanat başına 200 cm'dir; yan paylarla 210 cm olur. 140 cm enli kumaştan kanat başına 210 ÷ 140 = 1,5, yani 2 pano gerekir; iki kanat için 4 pano. Her pano 260 + 20 = 280 cm kesilir ve toplam <strong>11,2 metre</strong> kumaş alınır.",
    ] },
    { h: 'Ölçü alırken dikkat edilecekler', ul: [
      "<strong>Korniş genişliği:</strong> perdenin açıkken camı kapatmaması için korniş genellikle pencereden her iki yanda 15–25 cm taşırılır. Korniş henüz takılmadıysa pencere genişliğine bu payı ekleyin.",
      "<strong>Perde boyu:</strong> yere kadar inen perdelerde zeminden 1–2 cm yukarıda bitirmek süpürmeyi kolaylaştırır. Peteğin üzerinde biten perdelerde petekle arada birkaç santimetre boşluk bırakın.",
      "<strong>Ölçüm noktası:</strong> boyu kornişin üst kenarından değil, perdenin asıldığı rayın ya da halkanın alt noktasından ölçün.",
      "<strong>Birden fazla noktadan ölçün:</strong> zemin ve tavan her zaman paralel değildir; sol, orta ve sağdan ölçüp en kısa değeri esas alın.",
      "<strong>Çekme payı:</strong> pamuk ve keten içeren kumaşlar ilk yıkamada çekebilir; satıcıya çekme oranını sorup boy payını buna göre artırın.",
    ] },
    { h: 'Dikiş payları', p: [
      "Etek kıvrımı perdenin alt kenarının ağırlık kazanması için bırakılan katlamadır; tüllerde ince kurşun ip ya da dar kıvırma, fon perdelerde 8–10 cm'lik çift kat etek yaygındır. Üstte büzgü bandı ya da kanun pile için de birkaç santimetre katlanır. Araçta bu ikisinin toplamı için varsayılan 20 cm alınmıştır. Yan kenarlarda her taraf için 4–5 cm'lik kıvırma payı yeterlidir. Terziniz farklı paylarla çalışıyorsa alanları onun verdiği değerlere göre düzeltin.",
    ] },
    { h: 'Sınırlar', p: [
      "Desenli kumaşlarda panoların deseni yan yana tutturulmalıdır; bunun için her panoya desen tekrarı (raport) boyu kadar ek pay gerekir ve araç bu payı eklemez. Kruvaze, katlamalı ya da kuşgözlü modellerde üst pay farklı olabilir. Stor ve zebra perdeler mekanizmayla birlikte ölçüye göre üretildiğinden kumaş metrajı yerine net en ve boy ölçüsü verilir. Emin olmadığınız durumlarda kumaşı kestirmeden önce ölçüleri perdeciyle birlikte doğrulayın.",
    ] },
  ],
  faq: [
    ['3 metre kornişe kaç metre tül gerekir?', "Pile oranına bağlıdır. 1'e 2 pileyle 6 metre, 1'e 2,5 pileyle 7,5 metre, 1'e 3 pileyle 9 metre kumaş gerekir. Yan kenar kıvırmaları için 10 cm kadar eklenir."],
    ['1\'e 2 pile ile 1\'e 3 pile arasında ne fark var?', "1'e 3 pilede korniş genişliğinin üç katı kumaş kullanılır; perde daha sık kıvrımlı ve dolgun durur. 1'e 2 pile daha sade görünür ve üçte bir oranında daha az kumaş harcar."],
    ['Tül kumaşın eni perde boyuna yetmezse ne olur?', "Kumaş eni, perde boyu ile etek ve büzgü payının toplamından kısa ise perde boydan eksik kalır. Araç bu durumda uyarı verir. Daha geniş enli bir kumaş seçebilir ya da kumaşı boyuna kullanıp pano dikişiyle çalışabilirsiniz."],
    ['Fon perde için kaç pano gerekir?', "Her kanadın pileli genişliği kumaş enine bölünür ve yukarı yuvarlanır. 140 cm enli kumaşla, pileli genişliği 210 cm olan bir kanat için 2 pano gerekir. Çift kanatlı perdede bu sayı ikiyle çarpılır."],
    ['Tek kanat mı çift kanat mı seçmeliyim?', "Tül perdeler çoğunlukla tek parça dikilir. Fon perdeler pencerenin iki yanına toplandığı için genellikle çift kanattır. Çift kanatta yan kenar payı dört kenar için hesaplanır, bu yüzden metraj birkaç santimetre artar."],
    ['Pencere genişliğini mi korniş genişliğini mi yazmalıyım?', "Korniş genişliğini yazın. Perde kornişe asıldığı için pile hesabı korniş boyuna göre yapılır. Korniş takılı değilse pencere genişliğine her iki yan için taşma payı ekleyerek tahmini korniş boyunu bulun."],
    ['Stor perde için bu aracı kullanabilir miyim?', "Stor perdelerde pile olmadığı için oranı 1'e 1 seçip payları sıfırlayarak net kumaş ölçüsünü görebilirsiniz. Ancak storlar mekanizmasıyla birlikte ölçüye üretildiğinden satıcıya net en ve boy vermek yeterlidir."],
    ['Yazdığım ölçüler kaydediliyor mu?', "Hayır. Hesap yalnızca tarayıcınızda çalışır; ölçüleriniz hiçbir sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['duvar-kagidi-hesapla', 'duvar-alani-hesapla', 'cm-inc-cevir', 'supurgelik-hesapla', 'parke-hesapla'],
};
