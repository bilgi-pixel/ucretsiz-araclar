export default {
  slug: 'su-tuketimi-hesapla',
  title: 'Su Tüketimi ve Maliyeti Hesaplama',
  h1Tail: 'sayaç endeksinden',
  pageTitle: 'Su Tüketimi ve Maliyeti Hesaplama – Sayaç Endeksinden m³ ve Tutar',
  description: 'İlk ve son sayaç endeksini girin; dönem tüketimini m³ ve litre olarak, günlük ve kişi başı tüketimi, 30 günlük karşılığı ve birim fiyata göre tutarı hesaplayın.',
  card: 'Su sayacı endekslerinden dönem tüketimini, kişi başı günlük litreyi ve birim fiyata göre tutarı hesaplayın.',
  category: 'gunluk',
  keywords: ['su tüketimi hesaplama', 'su faturası hesaplama', 'su sayacı endeks hesaplama', 'kişi başı su tüketimi', 'm3 su kaç litre', 'aylık su tüketimi', 'günlük su tüketimi'],
  lead: 'Su sayacınızın dönem başındaki ve sonundaki endeksini yazın; araç aradaki farktan <strong>tüketimi metreküp ve litre olarak</strong>, günlük ortalamayı, kişi başına düşen günlük litreyi ve girdiğiniz birim fiyata göre yaklaşık tutarı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'ilkEndeks', label: 'İlk endeks (m³)', type: 'number', placeholder: 'Örn. 1250' },
    { id: 'sonEndeks', label: 'Son endeks (m³)', type: 'number', placeholder: 'Örn. 1265' },
    { id: 'gun', label: 'İki okuma arasındaki gün sayısı', type: 'number', value: '30' },
    { id: 'kisi', label: 'Hanedeki kişi sayısı', type: 'number', value: '1' },
    { id: 'fiyat', label: 'Birim fiyat (TL/m³, isteğe bağlı)', type: 'number', placeholder: 'Faturanızdaki m³ fiyatı', hint: 'Atık su ve vergiler dahil toplam m³ bedelini yazarsanız sonuç faturaya daha yakın olur.' },
  ],
  compute(v, h) {
    const ilk = h.nonneg(v.ilkEndeks, 'İlk endeks');
    const son = h.nonneg(v.sonEndeks, 'Son endeks');
    if (son < ilk) h.err('Son endeks ilk endeksten küçük olamaz. Değerlerin yerini kontrol edin.');
    const gun = h.posint(v.gun, 'Gün sayısı');
    const kisi = h.posint(v.kisi, 'Kişi sayısı');
    const fiyat = h.opt(v.fiyat, null, 'Birim fiyat');
    if (fiyat !== null && fiyat < 0) h.err('"Birim fiyat" negatif olamaz.');
    const m3 = son - ilk;
    const litre = m3 * 1000;
    const gunluk = litre / gun;
    const rows = [
      ['Dönem tüketimi', h.fmt(m3, 3) + ' m³'],
      ['Litre karşılığı', h.fmt(litre, 0) + ' L'],
      ['Günlük ortalama', h.fmt(gunluk, 1) + ' L/gün'],
      ['Kişi başı günlük', h.fmt(gunluk / kisi, 1) + ' L/kişi/gün'],
      ['30 günlük karşılığı', h.fmt(m3 / gun * 30, 2) + ' m³'],
      ['Yıllık karşılığı', h.fmt(m3 / gun * 365, 1) + ' m³'],
    ];
    if (fiyat !== null) {
      rows.push(['Dönem tutarı', h.para(m3 * fiyat)]);
      rows.push(['30 günlük tutar', h.para(m3 / gun * 30 * fiyat)]);
    }
    return {
      rows,
      note: fiyat !== null
        ? 'Tutar, tüketimin tek bir birim fiyatla çarpımıdır; kademeli tarife, sabit bedeller ve yuvarlamalar nedeniyle faturanız farklı çıkabilir.'
        : 'Tutarı görmek için faturanızdaki m³ birim fiyatını girin. 1 m³ = 1.000 litre.',
    };
  },
  cases: [
    { in: { ilkEndeks: '1250', sonEndeks: '1265', gun: '30', kisi: '4', fiyat: '40' }, out: { 'Dönem tüketimi': '15 m³', 'Litre karşılığı': '15.000 L', 'Günlük ortalama': '500 L/gün', 'Kişi başı günlük': '125 L/kişi/gün', '30 günlük karşılığı': '15 m³', 'Dönem tutarı': '600,00 TL' } },
    { in: { ilkEndeks: '482,35', sonEndeks: '490,75', gun: '28', kisi: '2' }, out: { 'Dönem tüketimi': '8,4 m³', 'Litre karşılığı': '8.400 L', 'Günlük ortalama': '300 L/gün', 'Kişi başı günlük': '150 L/kişi/gün', '30 günlük karşılığı': '9 m³', 'Yıllık karşılığı': '109,5 m³' } },
    { in: { ilkEndeks: '0', sonEndeks: '12', gun: '60', kisi: '1', fiyat: '25,5' }, out: { 'Dönem tüketimi': '12 m³', 'Günlük ortalama': '200 L/gün', '30 günlük karşılığı': '6 m³', 'Dönem tutarı': '306,00 TL', '30 günlük tutar': '153,00 TL' } },
    { in: { ilkEndeks: '100', sonEndeks: '100', gun: '30', kisi: '3' }, out: { 'Dönem tüketimi': '0 m³', 'Kişi başı günlük': '0 L/kişi/gün' } },
    { in: { ilkEndeks: '2000', sonEndeks: '2036,5', gun: '365', kisi: '1' }, out: { 'Dönem tüketimi': '36,5 m³', 'Günlük ortalama': '100 L/gün', '30 günlük karşılığı': '3 m³', 'Yıllık karşılığı': '36,5 m³' } },
    { in: { ilkEndeks: '1265', sonEndeks: '1250', gun: '30', kisi: '4' }, error: true },
    { in: { ilkEndeks: '1250', sonEndeks: '1265', gun: '0', kisi: '4' }, error: true },
    { in: { ilkEndeks: '', sonEndeks: '1265', gun: '30', kisi: '4' }, error: true },
  ],
  howto: [
    'Önceki faturanızdaki ya da dönem başında not ettiğiniz sayaç değerini "İlk endeks" alanına yazın.',
    'Sayacın bugünkü değerini ya da yeni faturadaki son okumayı "Son endeks" alanına girin. Sayaçtaki kırmızı haneler metreküpün ondalık kısmıdır; virgülden sonra yazabilirsiniz.',
    'İki okuma arasında kaç gün geçtiğini ve evde kaç kişinin yaşadığını belirtin.',
    'Tutarı da görmek istiyorsanız faturanızdaki metreküp birim fiyatını yazın; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın; tüketim, günlük ve kişi başı ortalamalar ile tutar listelenir.',
  ],
  sections: [
    { h: 'Sayaç endeksinden tüketim nasıl bulunur?', p: [
      'Su sayacı, içinden geçen suyun toplam hacmini metreküp olarak sayar ve bu sayı hiç sıfırlanmaz. Bir dönemdeki tüketim, dönem sonundaki endeksten dönem başındaki endeksin çıkarılmasıyla bulunur: <strong>tüketim = son endeks − ilk endeks</strong>. Bir metreküp bin litre olduğu için sonucu 1.000 ile çarpmak litre karşılığını verir.',
      'Mekanik sayaçlarda siyah haneler tam metreküpü, kırmızı haneler ya da küçük kadranlar metreküpün kesirlerini gösterir. Faturalarda çoğunlukla yalnızca tam metreküp okunur; kendi takibinizde kırmızı haneleri de yazarsanız kısa dönemlerde daha duyarlı sonuç alırsınız.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Dört kişilik bir evde sayaç ay başında 1.250, otuz gün sonra 1.265 gösteriyor olsun. Tüketim 1.265 − 1.250 = <strong>15 m³</strong>, yani 15.000 litredir. Günlük ortalama 15.000 ÷ 30 = 500 litre, kişi başına düşen miktar 500 ÷ 4 = <strong>125 litre</strong> olur. Metreküp birim fiyatı 40 TL girilirse dönem tutarı 15 × 40 = 600,00 TL hesaplanır.',
      'Okuma aralığı tam otuz gün değilse karşılaştırma yapmak zorlaşır. İkinci bir örnekte endeks 28 günde 482,35\'ten 490,75\'e çıkmış olsun: tüketim 8,4 m³, günlük ortalama 8.400 ÷ 28 = 300 litredir. Araç bunu otuz güne oranlayarak 9 m³ bulur; böylece 28 günlük ve 33 günlük faturaları aynı ölçekte kıyaslayabilirsiniz.',
    ] },
    { h: 'Kişi başı tüketim ne anlatır?', p: [
      'Hanenin toplam tüketimi kişi sayısına göre doğal olarak değişir; bu yüzden karşılaştırma için en kullanışlı gösterge kişi başına günlük litredir. Bu değer duş süresine, çamaşır ve bulaşık makinesinin kullanım sıklığına, bahçe sulamasına ve tesisattaki kaçaklara bağlı olarak evden eve büyük fark gösterir. Kendi değerinizi birkaç dönem boyunca izlemek, başkalarının ortalamasıyla kıyaslamaktan daha anlamlıdır: aynı evde belirgin bir artış çoğunlukla alışkanlık değişikliğine ya da bir kaçağa işaret eder.',
    ] },
    { h: 'Birim fiyat alanına ne yazılmalı?', p: [
      'Su faturasında metreküp başına birden fazla kalem bulunur: su bedeli, atık su bedeli, vergi ve bazı idarelerde ek paylar. Ayrıca birçok su idaresi kademeli tarife uygular; tüketim belirli bir eşiği aşınca metreküp fiyatı yükselir. Tarifeler ilden ile ve yıl içinde değiştiği için araç hiçbir fiyatı sabitlemez; değeri siz girersiniz.',
      'En pratik yol, son faturanızdaki toplam tutarı o faturadaki metreküp tüketimine bölmek ve çıkan <strong>ortalama birim fiyatı</strong> yazmaktır. Böylece atık su ve vergiler de hesaba girmiş olur. Tüketiminiz kademe eşiğinin yakınındaysa gerçek fatura bu basit çarpımdan sapabilir; sonuç bir tahmindir, kesin tutar için idarenizin güncel tarifesine bakın.',
    ] },
    { h: 'Kaçak kontrolü için sayaç nasıl kullanılır?', ol: [
      'Evdeki bütün muslukları, makineleri ve rezervuar dolumlarını kapatın.',
      'Sayacın kırmızı hanelerini ve varsa küçük dönen göstergeyi not edin.',
      'En az bir iki saat, mümkünse gece boyunca hiç su kullanmayın.',
      'Sayaca yeniden bakın. Endeks değiştiyse tesisatta ya da rezervuarda kaçak olabilir.',
      'İki okumayı bu araca ilk ve son endeks olarak girip gün sayısını 1 yazarsanız kaçağın günlük litre karşılığını kabaca görebilirsiniz; bekleme süreniz bir günden kısaysa sonucu süreye göre oranlayın.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'İlk ve son endeksi ters yazmak: araç son endeksin küçük olduğu durumda uyarı verir.',
      'Kırmızı haneleri tam sayı gibi okumak: 01265 ve kırmızı 480 görünen sayaç 1.265,480 m³ demektir, 1.265.480 değil.',
      'Okuma aralığını ay sayısıyla karıştırmak: iki aylık okumalarda gün sayısına 60 civarı bir değer yazılmalıdır.',
      'Sayaç değişimi: dönem içinde sayaç yenilendiyse eski ve yeni sayacın tüketimleri ayrı ayrı hesaplanıp toplanmalıdır.',
      'Ortak kullanım: apartmanlarda ortak alan suyu ayrı sayaçtan ölçülür ve bu hesaba girmez.',
    ], p: [
      'Yıllık karşılık, dönemdeki günlük ortalamanın 365 günle çarpımıdır; yaz ve kış tüketimi farklı olan evlerde yalnızca kaba bir fikir verir. Hesaplanan tutar bilgilendirme amaçlıdır ve fatura yerine geçmez.',
    ] },
  ],
  faq: [
    ['1 metreküp su kaç litredir?', '1 metreküp tam olarak 1.000 litredir. Faturadaki 15 m³ tüketim 15.000 litre, yani yaklaşık 790 adet 19 litrelik damacana kadar su demektir.'],
    ['Su sayacındaki kırmızı rakamlar ne anlama gelir?', 'Kırmızı haneler metreküpün ondalık kısmını, yani litreleri gösterir. Faturalamada genellikle yalnızca siyah haneler dikkate alınır. Bu araçta kırmızı haneleri virgülden sonra yazarak daha duyarlı hesap yapabilirsiniz.'],
    ['Fatura tutarı neden araçtaki sonuçtan farklı çıkıyor?', 'Araç tüketimi tek bir birim fiyatla çarpar. Gerçek faturada kademeli tarife, atık su bedeli, vergi, sabit bedeller ve yuvarlama bulunabilir. Farkı azaltmak için son faturanızın toplamını tüketime bölerek bulduğunuz ortalama fiyatı girin.'],
    ['Okuma aralığı 30 gün değilse ne yapmalıyım?', 'Gerçek gün sayısını yazın. Araç hem dönemin gerçek tüketimini hem de bunun 30 güne oranlanmış karşılığını verir; farklı uzunluktaki dönemleri bu satır üzerinden karşılaştırabilirsiniz.'],
    ['Kişi sayısına misafirleri de katmalı mıyım?', 'Sürekli yaşayan kişi sayısını yazmak yeterlidir. Dönemin önemli bir bölümünde evde kalan misafir olduysa sayıyı buna göre artırabilirsiniz; aksi halde kişi başı değer olduğundan yüksek görünür.'],
    ['Tüketimim hiç su kullanmadığım halde artıyor, neden?', 'En sık neden rezervuar iç takımındaki sızıntı ve damlatan musluklardır. Bütün su kullanımını kapatıp sayacı birkaç saat arayla okuyarak kaçak olup olmadığını anlayabilirsiniz; endeks değişiyorsa bir tesisatçıya danışın.'],
    ['Araç sıcak su ya da ortak sayaç için kullanılabilir mi?', 'Evet. Metreküp ölçen her sayaç için aynı hesap geçerlidir. Merkezi sıcak su sayaçlarında birim fiyat olarak yönetimin belirlediği sıcak su metreküp bedelini girmeniz gerekir.'],
    ['Girdiğim endeksler bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; endeks, kişi sayısı ve fiyat bilgileri sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['dus-su-tuketimi-hesapla', 'su-deposu-hacmi-hesapla', 'litre-metrekup-cevir', 'elektrik-tuketim-hesapla', 'dogalgaz-tuketim-hesapla'],
};
