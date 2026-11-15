export default {
  slug: 'agirlikli-ortalama-hesapla',
  title: 'Ağırlıklı Ortalama Hesaplama',
  h1Tail: 'değer ve ağırlık listesiyle',
  pageTitle: 'Ağırlıklı Ortalama Hesaplama – Kredi, Yüzde ve Miktar Ağırlıklı',
  description: 'Değerleri ve ağırlıklarını yazın, ağırlıklı ortalamayı anında bulun. Kredili not ortalaması, yüzdeli sınav notu ve ortalama maliyet hesapları için uygundur.',
  card: 'Değerleri ağırlıklarıyla birlikte girin; kredili not, yüzdeli sınav ve ortalama maliyet için ağırlıklı ortalamayı bulun.',
  category: 'matematik',
  keywords: ['ağırlıklı ortalama hesaplama', 'ağırlıklı ortalama formülü', 'ağırlıklı ortalama nasıl hesaplanır', 'kredili ortalama hesaplama', 'yüzdeli not hesaplama', 'ortalama maliyet hesaplama', 'tartılı ortalama'],
  lead: 'Her değerin sonuca farklı oranda katkı yaptığı durumlarda basit ortalama yanıltır. Değerleri ve karşılık gelen ağırlıkları aynı sırayla yazın; araç <strong>ağırlıklı ortalamayı</strong> ve karşılaştırma için basit ortalamayı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'degerler', label: 'Değerler', type: 'textarea', placeholder: 'Örn. 70 80 90', hint: 'Notlar, fiyatlar ya da ölçümler. Boşluk, satır sonu ya da noktalı virgülle ayırın.', wide: true },
    { id: 'agirliklar', label: 'Ağırlıklar', type: 'textarea', placeholder: 'Örn. 30 30 40', hint: 'Değerlerle aynı sırada ve aynı sayıda: yüzde, kredi, katsayı ya da miktar.', wide: true },
  ],
  compute(v, h) {
    const x = h.nums(v.degerler, 'Değerler');
    const w = h.nums(v.agirliklar, 'Ağırlıklar');
    if (x.length !== w.length) h.err(`Değer sayısı (${x.length}) ile ağırlık sayısı (${w.length}) eşit olmalı. Her değerin karşısına bir ağırlık yazın.`);
    if (w.some((a) => a < 0)) h.err('Ağırlıklar negatif olamaz. Hesaba katmak istemediğiniz değerin ağırlığını 0 yazın.');
    const wt = w.reduce((s, a) => s + a, 0);
    if (!(wt > 0)) h.err('Ağırlıkların toplamı sıfırdan büyük olmalı; en az bir ağırlık pozitif olsun.');
    const carpimlar = x.map((a, i) => a * w[i]);
    const at = carpimlar.reduce((s, a) => s + a, 0);
    const basit = x.reduce((s, a) => s + a, 0) / x.length;
    const satirlar = x.slice(0, 200).map((a, i) => `${h.fmt(a, 4)}\t${h.fmt(w[i], 4)}\t${h.fmt(carpimlar[i], 4)}\t% ${h.fmt((w[i] / wt) * 100, 2)}`);
    return {
      rows: [
        ['Ağırlıklı ortalama', h.fmt(at / wt, 4)],
        ['Ağırlıklı toplam (Σ değer × ağırlık)', h.fmt(at, 4)],
        ['Ağırlıkların toplamı', h.fmt(wt, 4)],
        ['Basit (ağırlıksız) ortalama', h.fmt(basit, 4)],
        ['Değer sayısı', String(x.length)],
      ],
      text: 'Değer\tAğırlık\tÇarpım\tPay\n' + satirlar.join('\n') + (x.length > 200 ? '\n…' : ''),
      note: 'Ağırlıkların toplamının 1 ya da 100 olması gerekmez; araç ağırlıklı toplamı ağırlıkların toplamına böler.',
    };
  },
  cases: [
    { in: { degerler: '70 80 90', agirliklar: '30 30 40' }, out: { 'Ağırlıklı ortalama': '81', 'Ağırlıklı toplam (Σ değer × ağırlık)': '8.100', 'Ağırlıkların toplamı': '100', 'Basit (ağırlıksız) ortalama': '80' }, text: 'Değer\tAğırlık\tÇarpım\tPay\n70\t30\t2.100\t% 30\n80\t30\t2.400\t% 30\n90\t40\t3.600\t% 40' },
    { in: { degerler: '85 70 90', agirliklar: '3 4 2' }, out: { 'Ağırlıklı ortalama': '79,4444', 'Ağırlıklı toplam (Σ değer × ağırlık)': '715', 'Ağırlıkların toplamı': '9' } },
    { in: { degerler: '70 80 90', agirliklar: '0,3 0,3 0,4' }, out: { 'Ağırlıklı ortalama': '81', 'Ağırlıkların toplamı': '1' } },
    { in: { degerler: '10 20', agirliklar: '1 3' }, out: { 'Ağırlıklı ortalama': '17,5', 'Basit (ağırlıksız) ortalama': '15' } },
    { in: { degerler: '4 3,5 2', agirliklar: '3 2 5' }, out: { 'Ağırlıklı ortalama': '2,9', 'Ağırlıklı toplam (Σ değer × ağırlık)': '29' } },
    { in: { degerler: '40 50', agirliklar: '100 300' }, out: { 'Ağırlıklı ortalama': '47,5', 'Ağırlıklı toplam (Σ değer × ağırlık)': '19.000' } },
    { in: { degerler: '60 100 45', agirliklar: '40 60 0' }, out: { 'Ağırlıklı ortalama': '84' } },
    { in: { degerler: '50', agirliklar: '2' }, out: { 'Ağırlıklı ortalama': '50', 'Değer sayısı': '1' } },
    { in: { degerler: '70 80 90', agirliklar: '30 70' }, error: true },
    { in: { degerler: '70 80', agirliklar: '0 0' }, error: true },
    { in: { degerler: '70 80', agirliklar: '-1 2' }, error: true },
  ],
  howto: [
    '"Değerler" kutusuna ortalamasını almak istediğiniz sayıları yazın: sınav notları, ders notları, birim fiyatlar ya da ölçümler.',
    '"Ağırlıklar" kutusuna her değerin ağırlığını aynı sırayla yazın. Yüzde (30 30 40), kredi (3 4 2), katsayı ya da miktar olabilir.',
    'İki kutudaki sayı adedinin eşit olduğundan emin olun; birinci değer birinci ağırlıkla, ikinci değer ikinci ağırlıkla eşleşir.',
    '"Hesapla" düğmesine basın. İlk satırda ağırlıklı ortalamayı, altındaki tabloda her değerin çarpımını ve toplam ağırlık içindeki payını görürsünüz.',
  ],
  sections: [
    { h: 'Ağırlıklı ortalama nedir?', p: [
      'Basit aritmetik ortalamada bütün değerler eşit söz hakkına sahiptir: toplanır ve adede bölünür. Ağırlıklı ortalamada ise her değer, önemini gösteren bir ağırlıkla çarpılır; ağırlığı büyük olan değer sonucu kendine doğru daha çok çeker. Eski kaynaklarda <strong>tartılı ortalama</strong> adıyla da geçer.',
      'Gündelik hayattaki ortalamaların çoğu aslında ağırlıklıdır. Üniversitede dönem ortalaması derslerin kredisine, bir dersin başarı notu vize ve finalin yüzdelerine, bir deponun ortalama maliyeti alınan miktarlara, bir portföyün getirisi varlıkların paylarına göre ağırlıklandırılır. Bütün ağırlıklar eşit olduğunda ağırlıklı ortalama basit ortalamayla aynı sonucu verir.',
    ] },
    { h: 'Formül', p: [
      'Değerler x₁, x₂, …, xₙ ve ağırlıklar w₁, w₂, …, wₙ olmak üzere <strong>ağırlıklı ortalama = (x₁·w₁ + x₂·w₂ + … + xₙ·wₙ) ÷ (w₁ + w₂ + … + wₙ)</strong> biçiminde hesaplanır. Yani her değer kendi ağırlığıyla çarpılır, çarpımlar toplanır ve bu toplam ağırlıkların toplamına bölünür.',
      'Ağırlıkların hangi ölçekte yazıldığı sonucu değiştirmez; önemli olan birbirlerine oranlarıdır. 30, 30, 40 yazmakla 0,3, 0,3, 0,4 ya da 3, 3, 4 yazmak aynı ortalamayı verir. Bu nedenle ağırlıkların toplamının 100 ya da 1 etmesi şart değildir.',
    ] },
    { h: 'Örnek 1: Yüzdeli sınav notu', p: [
      'Bir derste birinci vize yüzde 30, ikinci vize yüzde 30, final yüzde 40 etkili olsun. Öğrencinin notları sırasıyla 70, 80 ve 90\'dır. Çarpımlar 70 × 30 = 2.100, 80 × 30 = 2.400 ve 90 × 40 = 3.600 eder; toplamları 8.100\'dür. Ağırlıkların toplamı 100 olduğundan başarı notu 8.100 ÷ 100 = <strong>81</strong> çıkar. Basit ortalama ise 80\'dir; final hem yüksek hem ağır olduğu için sonuç bir puan yukarıdadır.',
    ] },
    { h: 'Örnek 2: Kredili not ortalaması', p: [
      'Üç dersin notları 85, 70 ve 90; kredileri sırasıyla 3, 4 ve 2 olsun. Ağırlıklı toplam 85 × 3 + 70 × 4 + 90 × 2 = 255 + 280 + 180 = 715, toplam kredi 9\'dur. Ortalama 715 ÷ 9 ≈ <strong>79,44</strong> bulunur. Basit ortalama 81,67 olurdu; en yüksek kredili dersin notu en düşük olduğu için ağırlıklı ortalama bunun altında kalmıştır. Dörtlük sistemde de mantık aynıdır: katsayıları 4, 3,5 ve 2 olan, kredileri 3, 2 ve 5 olan üç ders için sonuç 29 ÷ 10 = 2,9\'dur.',
    ] },
    { h: 'Örnek 3: Ortalama maliyet', p: [
      'Bir esnaf aynı üründen önce tanesi 40 liradan 100 adet, sonra tanesi 50 liradan 300 adet almış olsun. Burada değerler birim fiyatlar, ağırlıklar ise miktarlardır. Toplam ödeme 40 × 100 + 50 × 300 = 19.000 lira, toplam miktar 400 adettir; ortalama birim maliyet 19.000 ÷ 400 = <strong>47,5</strong> lira eder. İki fiyatın basit ortalaması olan 45 lira yanlıştır, çünkü pahalı alımdan üç kat fazla yapılmıştır. Farklı tarihlerde alınan hisse, döviz ya da altının ortalama alış maliyeti de aynı yöntemle bulunur.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Değerlerle ağırlıkların sırasını karıştırmak:</strong> Her ağırlık kendi değerinin hizasında olmalıdır. Sonuç tablosundaki satırlardan eşleşmeyi kontrol edin.',
      '<strong>Adede bölmek:</strong> Ağırlıklı toplam değer sayısına değil, ağırlıkların toplamına bölünür.',
      '<strong>Ortalamaların ortalamasını almak:</strong> 20 kişilik şubenin ortalaması 60, 30 kişilik şubenin ortalaması 70 ise genel ortalama 65 değil 66\'dır; şube mevcutları ağırlık olarak kullanılmalıdır.',
      '<strong>Henüz girilmemiş notu sıfır saymak:</strong> Açıklanmamış bir sınavı listeye 0 notuyla eklerseniz ortalama düşer. O satırı hiç yazmayın ya da ağırlığını 0 girin.',
      '<strong>Yüzdeleri hem yüzde hem ondalık yazmak:</strong> Ağırlıkların hepsi aynı ölçekte olmalıdır; 30 ile 0,4\'ü birlikte kullanmayın.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Değerler negatif olabilir, örneğin zarar eden bir kalemin getirisi; ağırlıklar ise sıfır ya da pozitif olmalıdır. Ağırlığı sıfır olan değer sonucu etkilemez ama basit ortalama satırına dâhil edilir. Sonuç dört ondalık basamağa yuvarlanır; kurumunuz notu farklı bir kurala göre yuvarlıyorsa ya da geçme şartı olarak finalden asgari not istiyorsa bu kurallar hesaba katılmaz. Resmî not ve ortalamalar için kurumunuzun yönetmeliği ve açıkladığı sonuç esastır. Yatırım maliyeti hesaplarında komisyon ve vergi gibi kalemler ayrıca eklenmelidir; bu sayfa mali tavsiye vermez.',
    ] },
  ],
  faq: [
    ['Ağırlıklı ortalama ile aritmetik ortalama arasındaki fark nedir?', 'Aritmetik ortalamada her değer eşit sayılır. Ağırlıklı ortalamada her değer bir ağırlıkla çarpılır ve toplam, ağırlıkların toplamına bölünür. Ağırlıkların hepsi eşitse iki ortalama aynı çıkar.'],
    ['Ağırlıkların toplamı 100 olmak zorunda mı?', 'Hayır. Araç ağırlıklı toplamı ağırlıkların toplamına böldüğü için yüzde, ondalık oran, kredi ya da adet yazabilirsiniz. Önemli olan ağırlıkların birbirine oranıdır.'],
    ['Vize ve final notumla dönem notumu nasıl hesaplarım?', 'Değerler kutusuna vize ve final notlarınızı, ağırlıklar kutusuna yüzdelerini yazın. Vize 60, final 100 ve oranlar yüzde 40 ile 60 ise sonuç 84 olur.'],
    ['Ağırlıklı ortalama en büyük değerden büyük çıkabilir mi?', 'Ağırlıklar negatif olmadığı sürece hayır. Sonuç her zaman en küçük değer ile en büyük değer arasında kalır. Bu aralığın dışında bir sonuç görürseniz girdilerinizi kontrol edin.'],
    ['Ağırlığı sıfır yazarsam ne olur?', 'O değer ağırlıklı ortalamaya hiç katkı yapmaz. Hesaba katmak istemediğiniz bir kalemi silmeden devre dışı bırakmanın pratik yoludur.'],
    ['Farklı fiyatlardan aldığım ürünün ortalama maliyetini bulabilir miyim?', 'Evet. Birim fiyatları değer, aldığınız miktarları ağırlık olarak yazın. Sonuç, toplam ödemenizin toplam miktara bölümüne eşit olan ortalama birim maliyettir.'],
    ['Değer ve ağırlık sayıları farklıysa ne olur?', 'Araç hesap yapmaz ve iki listenin kaçar sayı içerdiğini belirten bir uyarı gösterir. Eksik ya da fazla yazılmış sayıyı düzeltip yeniden deneyin.'],
    ['Girdiğim notlar ya da fiyatlar saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdıklarınız sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['ortalama-hesapla', 'not-ortalamasi', 'harf-notu-hesapla', 'geometrik-ortalama-hesapla', 'harmonik-ortalama-hesapla', 'yuzde-hesapla'],
};
