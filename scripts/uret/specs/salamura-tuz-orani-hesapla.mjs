export default {
  slug: 'salamura-tuz-orani-hesapla',
  title: 'Salamura Tuz Oranı Hesaplama',
  h1Tail: 'turşu, zeytin ve peynir için',
  pageTitle: 'Salamura Tuz Oranı Hesaplama – Litre Suya Kaç Gram Tuz?',
  description: 'Su miktarını ve istediğiniz tuz yüzdesini girin; turşu, zeytin ya da peynir salamurası için gereken tuzu gram olarak hesaplayın. Üç farklı hesap yöntemi desteklenir.',
  card: 'Turşu, zeytin ve peynir salamurası için su miktarına ve yüzdeye göre gereken tuzu gram olarak bulun.',
  category: 'gunluk',
  keywords: ['salamura tuz oranı', 'turşu tuz oranı hesaplama', '1 litre suya kaç gram tuz', 'yüzde 5 salamura', 'zeytin salamurası tuz oranı', 'salamura hesaplama', 'turşu suyu tuz ölçüsü'],
  lead: 'Kullanacağınız su miktarını ve hedeflediğiniz tuz yüzdesini yazın; araç <strong>kaç gram tuz</strong> tartmanız gerektiğini hesaplar. Yüzdenin suya göre mi, hazır salamuraya göre mi, yoksa su ile sebzenin toplamına göre mi alınacağını siz seçersiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'su', label: 'Su miktarı (litre)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'oran', label: 'Tuz oranı (%)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yontem', label: 'Yüzde neye göre?', type: 'select', options: [['su', 'Suya göre (100 g suya X g tuz)'], ['cozelti', 'Salamuraya göre (ağırlıkça % çözelti)'], ['denge', 'Su + sebze toplamına göre (denge yöntemi)']] },
    { id: 'sebze', label: 'Sebze ağırlığı (kg, denge yöntemi için)', type: 'number', placeholder: 'Örn. 1' },
  ],
  compute(v, h) {
    const suG = h.pos(v.su, 'Su miktarı') * 1000;
    const p = h.pos(v.oran, 'Tuz oranı');
    if (p > 30) h.err('Tuz oranı %30\'dan büyük olamaz; tuz suda bu kadar çözünmez. Salamuralar çoğunlukla %2 ile %12 arasındadır.');
    let tuz;
    let sebzeG = 0;
    if (v.yontem === 'cozelti') tuz = suG * p / (100 - p);
    else if (v.yontem === 'denge') {
      if (String(v.sebze ?? '').trim() === '') h.err('Denge yöntemi için "Sebze ağırlığı" alanını doldurun.');
      sebzeG = h.pos(v.sebze, 'Sebze ağırlığı') * 1000;
      tuz = (suG + sebzeG) * p / 100;
    } else tuz = suG * p / 100;
    const rows = [
      ['Gereken tuz', h.fmt(tuz, 1) + ' g'],
      ['1 litre suya düşen tuz', h.fmt(tuz / suG * 1000, 1) + ' g'],
      ['Salamura ağırlığı (su + tuz)', h.fmt(suG + tuz, 0) + ' g'],
      ['Salamuranın ağırlıkça tuz oranı', '%' + h.fmt(tuz / (suG + tuz) * 100, 2)],
    ];
    if (v.yontem === 'denge') rows.push(['Kavanozdaki toplam ağırlık', h.fmt(suG + sebzeG + tuz, 0) + ' g']);
    return {
      rows,
      note: '1 litre su 1.000 g kabul edilir. Tuzu kaşıkla değil teraziyle ölçün; tuzun tane iriliğine göre bir kaşığın ağırlığı çok değişir.',
    };
  },
  cases: [
    { in: { su: '2', oran: '5', yontem: 'su' }, out: { 'Gereken tuz': '100 g', '1 litre suya düşen tuz': '50 g', 'Salamura ağırlığı (su + tuz)': '2.100 g', 'Salamuranın ağırlıkça tuz oranı': '%4,76' } },
    { in: { su: '2', oran: '5', yontem: 'cozelti' }, out: { 'Gereken tuz': '105,3 g', '1 litre suya düşen tuz': '52,6 g', 'Salamuranın ağırlıkça tuz oranı': '%5' } },
    { in: { su: '1', oran: '2,5', yontem: 'denge', sebze: '1' }, out: { 'Gereken tuz': '50 g', '1 litre suya düşen tuz': '50 g', 'Kavanozdaki toplam ağırlık': '2.050 g' } },
    { in: { su: '1', oran: '10', yontem: 'su' }, out: { 'Gereken tuz': '100 g', 'Salamura ağırlığı (su + tuz)': '1.100 g', 'Salamuranın ağırlıkça tuz oranı': '%9,09' } },
    { in: { su: '0,5', oran: '3', yontem: 'su' }, out: { 'Gereken tuz': '15 g', '1 litre suya düşen tuz': '30 g' } },
    { in: { su: '1,5', oran: '2', yontem: 'denge', sebze: '0,5' }, out: { 'Gereken tuz': '40 g', 'Kavanozdaki toplam ağırlık': '2.040 g' } },
    { in: { su: '1', oran: '10', yontem: 'cozelti' }, out: { 'Gereken tuz': '111,1 g', 'Salamuranın ağırlıkça tuz oranı': '%10' } },
    { in: { su: '1', oran: '2', yontem: 'denge', sebze: '' }, error: true },
    { in: { su: '2', oran: '45', yontem: 'su' }, error: true },
    { in: { su: '0', oran: '5', yontem: 'su' }, error: true },
  ],
  howto: [
    'Kavanoza ya da bidona koyacağınız suyu ölçün ve litre olarak yazın.',
    'Tarifinizdeki ya da hedeflediğiniz tuz yüzdesini girin; yarım değerler için virgül kullanabilirsiniz (2,5 gibi).',
    'Yüzdenin neye göre hesaplanacağını seçin. Tarif "litre suya şu kadar gram" mantığındaysa ilk seçenek uygundur.',
    'Denge yöntemini seçtiyseniz kavanoza koyacağınız temizlenmiş sebzenin ağırlığını kilogram olarak ekleyin.',
    '"Hesapla" düğmesine basın ve çıkan gramı mutfak terazisiyle tartın.',
  ],
  sections: [
    { h: 'Üç yöntem arasındaki fark', p: [
      'Bir tarifte "%5 salamura" yazdığında bunun neyin yüzde beşi olduğu her zaman açık değildir. Ev mutfağında en yaygın yorum <strong>suya göre</strong> hesaptır: her 100 gram suya 5 gram tuz, yani bir litre suya 50 gram tuz. Ölçmesi kolaydır ve çoğu ev tarifi bu mantıkla yazılmıştır.',
      'Gıda teknolojisinde ise yüzde, <strong>hazır salamuranın</strong> ağırlığına göre verilir: 100 gram salamuranın 5 gramı tuz, 95 gramı sudur. Bu durumda bir litre suya 1.000 × 5 ÷ 95 = 52,6 gram tuz gerekir. İki yorum düşük yüzdelerde birbirine çok yakındır; %10\'da fark 100 grama karşı 111,1 gramdır ve artık göz ardı edilemez.',
      'Üçüncü yol, fermente turşularda kullanılan <strong>denge yöntemidir</strong>. Sebze büyük oranda sudan oluştuğu için kavanoza girdikten sonra tuz, sebzenin suyu ile salamura arasında dengelenir. Bu yöntemde tuz, su ile sebzenin toplam ağırlığı üzerinden hesaplanır; böylece kavanoz ne kadar sıkı doldurulursa doldurulsun son tuzluluk aynı kalır.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>Suya göre:</strong> tuz (g) = su (g) × oran ÷ 100',
      '<strong>Salamuraya göre:</strong> tuz (g) = su (g) × oran ÷ (100 − oran)',
      '<strong>Denge yöntemi:</strong> tuz (g) = (su + sebze) (g) × oran ÷ 100',
    ], p: [
      'Hesaplarda bir litre su 1.000 gram alınır. Araç ayrıca, hangi yöntemi seçerseniz seçin, ortaya çıkan salamuranın gerçek ağırlıkça tuz oranını da gösterir; böylece farklı kaynaklardaki tarifleri aynı ölçüyle karşılaştırabilirsiniz.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>2 litre su, %5, suya göre.</strong> Tuz = 2.000 × 5 ÷ 100 = <strong>100 g</strong>. Salamuranın toplam ağırlığı 2.100 g olur ve gerçek ağırlıkça tuz oranı 100 ÷ 2.100 = %4,76 çıkar. Aynı girdilerle "salamuraya göre" seçilirse tuz 2.000 × 5 ÷ 95 = <strong>105,3 g</strong> olur ve oran tam %5\'e gelir.',
      '<strong>1 kg salatalık, 1 litre su, %2,5, denge yöntemi.</strong> Toplam ağırlık 2.000 g, gereken tuz 2.000 × 2,5 ÷ 100 = <strong>50 g</strong>. Suya düşen tuz litre başına 50 gramdır; yani başlangıçta salamura yaklaşık %5 tuzludur, sebze suyunu saldıkça kavanozun tamamı %2,5 civarında dengelenir.',
    ] },
    { h: 'Hangi iş için hangi aralık?', p: [
      'Salamuranın yoğunluğu ürüne, saklama süresine ve damak zevkine göre değişir. Fermente sebze turşularında düşük ve orta yoğunluklar, uzun süre bekleyecek zeytin ve peynirde daha yüksek yoğunluklar tercih edilir. Tuz azaldıkça fermantasyon hızlanır ama bozulma riski artar; tuz arttıkça ürün daha uzun dayanır ama sertleşir ve tuzlu olur. Kesin oran için güvendiğiniz, denenmiş bir tarifi esas alın; araç yalnızca o tarifteki yüzdeyi grama çevirir.',
      'Geleneksel "yumurta testi" de bir yoğunluk ölçüsüdür: çiğ yumurtanın salamurada yüzmeye başlaması kabaca %10 dolayında bir tuzluluğa işaret eder. Yumurtanın tazeliği sonucu etkilediği için bu test tartının yerini tutmaz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Tuzu bardak ya da kaşıkla ölçmek: ince sofra tuzu ile iri kaya tuzunun aynı kaşıktaki ağırlığı neredeyse iki kat fark edebilir. Terazi kullanın.',
      'Yüzdeyi yanlış tabana uygulamak: tarif salamuraya göre yazılmışken suya göre hesaplamak tuzu eksik bırakır.',
      'Sebzenin ağırlığını yok saymak: çok sıkı doldurulmuş kavanozda az su kalır; yalnızca suya göre hesaplanan tuz, sebzenin saldığı suyla seyrelir.',
      'İyotlu ya da katkılı tuz kullanmak: turşularda katkısız turşuluk tuz ya da kaya tuzu tercih edilir; katkılar salamurayı bulandırabilir.',
      'Tuzu çözmeden kavanoza dökmek: tuz dibe çöker ve üst kısım tuzsuz kalır. Tuzu suyun bir bölümünde tamamen eritip sonra ekleyin.',
    ] },
    { h: 'Sınırlar ve gıda güvenliği', p: [
      'Tuz suda sınırsız çözünmez; oda sıcaklığında doymuş salamura ağırlıkça yaklaşık %26 tuz içerir. Araç bu nedenle %30\'un üzerindeki değerleri kabul etmez. Hesap, sirke, şeker ya da baharat gibi diğer bileşenleri dikkate almaz.',
      'Sonuçlar bilgilendirme amaçlıdır. Ev yapımı turşu ve salamura ürünlerde güvenlik yalnızca tuz oranına değil; temizliğe, sebzenin salamuranın altında kalmasına, asitliğe ve saklama koşullarına da bağlıdır. Kötü koku, küf ya da şüpheli görünüm durumunda ürünü tüketmeyin. Tuz kısıtlaması gereken bir sağlık durumunuz varsa hekiminize ya da diyetisyeninize danışın.',
    ] },
  ],
  faq: [
    ['1 litre suya kaç gram tuz konur?', 'Hedef yüzdeye bağlıdır. Suya göre hesapta %3 için 30 g, %5 için 50 g, %10 için 100 g tuz gerekir. Yüzde hazır salamuraya göre verilmişse %5 için 52,6 g, %10 için 111,1 g tuz kullanılır.'],
    ['Suya göre ve salamuraya göre yüzde arasındaki fark önemli mi?', 'Düşük oranlarda fark küçüktür: %3\'te litre başına 30 g yerine 30,9 g. Oran yükseldikçe açılır: %10\'da 100 g yerine 111,1 g. Uzun süre saklanacak ürünlerde tarifin hangi tabanı kullandığını bilmek önemlidir.'],
    ['Denge yöntemi ne zaman kullanılır?', 'Sebzenin de ağırlığı hesaba katılmak istendiğinde, özellikle fermente turşularda kullanılır. Su ve sebze birlikte tartılır, tuz bu toplamın yüzdesi olarak eklenir. Böylece kavanozun doluluk oranı son tuzluluğu değiştirmez.'],
    ['Tuzu çay bardağı ya da kaşıkla ölçebilir miyim?', 'Önerilmez. Tuzun tane iriliği ve nemi kaşık ağırlığını çok değiştirir. Birkaç gramlık fark küçük kavanozlarda yüzdeyi belirgin biçimde oynatır; mutfak terazisi en güvenilir yoldur.'],
    ['Salamuraya sirke ekleyeceğim, hesap değişir mi?', 'Sirke de sıvı hacmine katkı yapar. Suya göre hesaplıyorsanız su ile sirkenin toplamını "su miktarı" olarak girmek, tuzun toplam sıvıya oranını korur.'],
    ['Neden %30\'dan büyük oran girilemiyor?', 'Tuzun sudaki çözünürlüğü sınırlıdır; doymuş salamura ağırlıkça yaklaşık %26 tuz içerir. Daha fazlası çözünmeden dipte kalır, bu yüzden daha yüksek bir yüzde anlamlı değildir.'],
    ['Peynir ya da zeytin salamurası için de kullanılabilir mi?', 'Evet. Hesap ürüne göre değişmez; yalnızca hedef yüzde değişir. Tarifinizdeki yüzdeyi ve su miktarını girmeniz yeterlidir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız miktarlar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kutlece-yuzde-derisim-hesapla', 'karisim-derisimi-hesapla', 'tarif-olcekle', 'mutfak-olcu-donustur', 'recel-seker-orani-hesapla', 'yuzde-hesapla'],
};
