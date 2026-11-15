export default {
  slug: 'kesir-sadelestir',
  title: 'Kesir Sadeleştirme',
  h1Tail: 'en sade hâl ve EBOB',
  pageTitle: 'Kesir Sadeleştirme – Kesri En Sade Hâline Getirme Aracı',
  description: 'Pay ve paydayı yazın, kesri en sade hâline getirin. Araç EBOB değerini, tam sayılı kesir gösterimini, ondalık ve yüzde karşılığını birlikte verir.',
  card: 'Kesri pay ve paydanın EBOB\'una bölerek en sade hâline getirin; tam sayılı, ondalık ve yüzde karşılığını görün.',
  category: 'matematik',
  keywords: ['kesir sadeleştirme', 'kesir sadeleştir', 'en sade kesir', 'kesri en sade hale getirme', 'sadeleştirme hesaplama', 'kesir kısaltma', 'pay payda sadeleştirme'],
  lead: 'Pay ve paydasını yazdığınız kesri <strong>en sade hâline</strong> getirin. Araç iki sayının en büyük ortak bölenini bulur, kesri bu sayıya böler ve sonucu tam sayılı kesir, ondalık sayı ve yüzde olarak da gösterir.',
  button: 'Sadeleştir',
  inputs: [
    { id: 'pay', label: 'Pay', type: 'number', placeholder: 'Örn. 45' },
    { id: 'payda', label: 'Payda', type: 'number', placeholder: 'Örn. 60' },
  ],
  compute(v, h) {
    let a = h.int(v.pay, 'Pay');
    let b = h.int(v.payda, 'Payda');
    if (b === 0) h.err('Payda sıfır olamaz; sıfıra bölme tanımsızdır. Sıfırdan farklı bir payda yazın.');
    if (Math.abs(a) > 1e15 || Math.abs(b) > 1e15) h.err('Pay ve payda en fazla 15 basamaklı olabilir; daha küçük sayılar yazın.');
    if (b < 0) { a = -a; b = -b; }
    let x = Math.abs(a), y = b;
    while (y) { const t = x % y; x = y; y = t; }
    const g = x;
    const p = a / g, q = b / g;
    const isaret = p < 0 ? '-' : '';
    const m = Math.abs(p);
    const sade = q === 1 ? `${isaret}${m}` : `${isaret}${m}/${q}`;
    let tamli;
    if (q === 1) tamli = 'Sonuç tam sayı';
    else if (m < q) tamli = 'Yok (basit kesir)';
    else tamli = `${isaret}${Math.floor(m / q)} tam ${m % q}/${q}`;
    return {
      rows: [
        ['Sade kesir', sade],
        ['EBOB', String(g)],
        ['Tam sayılı gösterim', tamli],
        ['Ondalık değer', h.fmt(p / q, 6)],
        ['Yüzde', '%' + h.fmt((p / q) * 100, 4)],
      ],
      note: g === 1 ? 'Pay ve payda aralarında asal olduğu için kesir zaten en sade hâlindedir.' : `Pay ve payda ${g} sayısına bölünerek sadeleştirildi.`,
    };
  },
  cases: [
    { in: { pay: '45', payda: '60' }, out: { 'Sade kesir': '3/4', 'EBOB': '15', 'Tam sayılı gösterim': 'Yok (basit kesir)', 'Ondalık değer': '0,75', 'Yüzde': '%75' } },
    { in: { pay: '18', payda: '4' }, out: { 'Sade kesir': '9/2', 'EBOB': '2', 'Tam sayılı gösterim': '4 tam 1/2', 'Ondalık değer': '4,5' } },
    { in: { pay: '8', payda: '12' }, out: { 'Sade kesir': '2/3', 'EBOB': '4', 'Ondalık değer': '0,666667', 'Yüzde': '%66,6667' } },
    { in: { pay: '7', payda: '13' }, out: { 'Sade kesir': '7/13', 'EBOB': '1' } },
    { in: { pay: '-6', payda: '8' }, out: { 'Sade kesir': '-3/4', 'EBOB': '2', 'Ondalık değer': '-0,75' } },
    { in: { pay: '6', payda: '-8' }, out: { 'Sade kesir': '-3/4' } },
    { in: { pay: '12', payda: '4' }, out: { 'Sade kesir': '3', 'EBOB': '4', 'Tam sayılı gösterim': 'Sonuç tam sayı' } },
    { in: { pay: '0', payda: '5' }, out: { 'Sade kesir': '0', 'Ondalık değer': '0' } },
    { in: { pay: '1071', payda: '462' }, out: { 'Sade kesir': '51/22', 'EBOB': '21', 'Tam sayılı gösterim': '2 tam 7/22' } },
    { in: { pay: '5', payda: '0' }, error: true },
    { in: { pay: '1,5', payda: '2' }, error: true },
    { in: { pay: '', payda: '4' }, error: true },
  ],
  howto: [
    '"Pay" alanına kesrin üstteki sayısını, "Payda" alanına alttaki sayısını yazın. İkisi de tam sayı olmalıdır.',
    'Negatif bir kesir için eksi işaretini paya ya da paydaya koyabilirsiniz; araç işareti sonuçta her zaman başa alır.',
    '"Sadeleştir" düğmesine basın. İlk satırda en sade kesir, altında bölmede kullanılan EBOB değeri görünür.',
    'Bileşik kesirlerde "Tam sayılı gösterim" satırına, karşılaştırma yapmak için ondalık ve yüzde satırlarına bakın.',
  ],
  sections: [
    { h: 'Kesir sadeleştirme nedir?', p: [
      'Bir kesrin pay ve paydasını aynı sayıya böldüğünüzde kesrin değeri değişmez, yalnızca yazılışı kısalır. Bu işleme sadeleştirme denir. 45/60 ile 3/4 aynı miktarı gösterir; ancak 3/4 hem okunması hem de sonraki işlemlerde kullanılması daha kolay olan biçimdir. Pay ile paydanın 1 dışında ortak böleni kalmadığında kesir <strong>en sade hâline</strong> gelmiş olur. Bu durumda pay ve paydaya "aralarında asal" denir.',
      'Okul matematiğinde bir sorunun cevabı çoğunlukla en sade hâliyle istenir. Test sorularında şıklar sade kesir olarak verildiği için, işlem doğru yapılsa bile sadeleştirme atlanırsa cevap şıklarda bulunamaz. Toplama, çıkarma ve çarpma işlemlerinden önce sadeleştirmek ise sayıları küçültür ve işlem hatası olasılığını azaltır.',
    ] },
    { h: 'EBOB ile tek adımda sadeleştirme', p: [
      'En hızlı yöntem, pay ve paydanın en büyük ortak bölenini (EBOB) bulup ikisini de bu sayıya bölmektir: <strong>sade kesir = (pay ÷ EBOB) / (payda ÷ EBOB)</strong>. Bu yolla ara adım kalmaz, sonuç doğrudan en sade hâldir.',
      'Araç EBOB\'u Öklid algoritmasıyla bulur. Algoritma büyük sayıyı küçüğe böler, kalanı alır ve kalan sıfır olana kadar bölen ile kalan üzerinde aynı işlemi sürdürür; sıfırdan önceki son bölen EBOB\'dur. 45 ve 60 için adımlar şöyledir: 60 ÷ 45 kalan 15, 45 ÷ 15 kalan 0. Öyleyse EBOB 15\'tir ve 45/60 = (45 ÷ 15)/(60 ÷ 15) = 3/4 olur.',
      'Elle çözerken EBOB\'u bulmak zor geliyorsa adım adım da gidebilirsiniz: önce 2\'ye, sonra 3\'e, sonra 5\'e bölünüp bölünmediğine bakar ve ortak bölen kalmayana kadar devam edersiniz. 45/60 önce 5\'e bölünür ve 9/12 olur, sonra 3\'e bölünür ve 3/4 elde edilir. Sonuç aynıdır; yalnızca yol uzar.',
    ] },
    { h: 'Çözümlü örnekler', ol: [
      '<strong>8/12:</strong> 8 ile 12\'nin EBOB\'u 4\'tür. 8 ÷ 4 = 2, 12 ÷ 4 = 3. Sonuç 2/3, ondalık karşılığı yaklaşık 0,666667\'dir.',
      '<strong>18/4:</strong> EBOB 2\'dir, kesir 9/2 olur. Pay paydadan büyük olduğu için bu bir bileşik kesirdir; 9 ÷ 2 = 4, kalan 1 olduğundan tam sayılı yazılışı 4 tam 1/2\'dir.',
      '<strong>1071/462:</strong> 1071 ÷ 462 kalan 147, 462 ÷ 147 kalan 21, 147 ÷ 21 kalan 0. EBOB 21\'dir; kesir 51/22, yani 2 tam 7/22 olur.',
      '<strong>7/13:</strong> 7 ve 13 asal sayılardır, ortak bölenleri yalnızca 1\'dir. Kesir zaten en sade hâlindedir.',
      '<strong>12/4:</strong> Payda payı tam böldüğünde sonuç kesir değil tam sayıdır: 12/4 = 3.',
    ] },
    { h: 'Bölünebilme kurallarıyla hızlı kontrol', p: [
      'Bir kesrin sadeleşip sadeleşmediğini anlamak için bölünebilme kuralları işe yarar. Pay ve paydanın ikisi de aşağıdaki koşulu sağlıyorsa o sayıyla sadeleştirme yapılabilir:',
    ], ul: [
      '<strong>2:</strong> son basamak çift ise.',
      '<strong>3:</strong> basamakların toplamı 3\'ün katı ise.',
      '<strong>5:</strong> son basamak 0 ya da 5 ise.',
      '<strong>9:</strong> basamakların toplamı 9\'un katı ise.',
      '<strong>10:</strong> son basamak 0 ise; sondaki sıfırlar karşılıklı silinebilir.',
      '<strong>11:</strong> basamaklar sağdan başlayarak sırayla artı ve eksi işaretiyle toplandığında sonuç 0 ya da 11\'in katı ise.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, toplama ya da çıkarma içeren bir ifadede terimleri tek tek sadeleştirmektir. (6 + 3)/6 ifadesinde üstteki 6 ile alttaki 6 sadeleştirilemez; önce pay hesaplanır, 9/6 bulunur ve bu 3/2 olarak sadeleşir. Sadeleştirme yalnızca çarpanlar arasında yapılır.',
      'İkinci hata, pay ve paydayı farklı sayılara bölmektir. Payı 3\'e, paydayı 2\'ye bölerseniz kesrin değeri değişir. Üçüncü hata yarıda bırakmaktır: 24/36 kesrini 2\'ye bölüp 12/18 bulmak sadeleştirmedir ama en sade hâl değildir; doğru sonuç 2/3\'tür. Araç her zaman en sade hâli verdiği için elle bulduğunuz sonucu buradan doğrulayabilirsiniz.',
    ] },
    { h: 'Negatif kesirler, sıfır ve sınırlar', p: [
      'Eksi işareti payda, paydada ya da kesrin önünde olabilir; üçü de aynı sayıyı gösterir. Araç işareti başa alır: 6/(-8) girdisi -3/4 olarak döner. Hem pay hem payda negatifse işaretler birbirini götürür ve sonuç pozitif çıkar. Pay sıfır olduğunda kesrin değeri sıfırdır. Payda sıfır olamaz; sıfıra bölme tanımsız olduğundan araç bu durumda uyarı verir.',
      'Pay ve payda tam sayı olmalıdır. 1,5/2 gibi ondalıklı bir ifadeyi sadeleştirmek için önce pay ve paydayı aynı sayıyla çarparak ondalıktan kurtarın: 1,5/2 = 15/20 = 3/4. Araç 15 basamağa kadar olan sayılarla tam doğrulukla çalışır.',
    ] },
  ],
  faq: [
    ['Kesir en sade hâle nasıl getirilir?', 'Pay ve paydanın en büyük ortak böleni bulunur ve ikisi de bu sayıya bölünür. Örneğin 45/60 kesrinde EBOB 15\'tir; 45 ÷ 15 = 3 ve 60 ÷ 15 = 4 olduğundan en sade hâl 3/4\'tür.'],
    ['Sadeleştirince kesrin değeri değişir mi?', 'Hayır. Pay ve payda aynı sayıya bölündüğü için kesrin gösterdiği miktar aynı kalır. 2/4, 3/6 ve 50/100 kesirlerinin hepsi 1/2\'ye eşittir; bunlara denk kesirler denir.'],
    ['Bir kesrin sadeleşmeyeceğini nasıl anlarım?', 'Pay ve paydanın 1\'den başka ortak böleni yoksa kesir sadeleşmez. Araçta EBOB satırında 1 görüyorsanız kesir zaten en sade hâlindedir. 7/13 ya da 8/15 bu türdendir.'],
    ['Sadeleştirme ile genişletme arasındaki fark nedir?', 'Sadeleştirmede pay ve payda aynı sayıya bölünür, genişletmede aynı sayıyla çarpılır. İkisinde de değer değişmez. Genişletme, paydaları eşitlemek gerektiğinde, yani toplama ve çıkarmada kullanılır.'],
    ['Bileşik kesir sadeleştirilir mi?', 'Evet. Payı paydasından büyük olan kesirler de aynı yöntemle sadeleşir. 18/4 kesri 9/2 olur; araç buna ek olarak 4 tam 1/2 biçimindeki tam sayılı yazılışı da gösterir.'],
    ['Ondalıklı sayı içeren kesri nasıl sadeleştiririm?', 'Önce pay ve paydayı 10, 100 gibi aynı sayıyla çarparak ondalık kısmı yok edin, sonra sadeleştirin. 0,6/1,5 kesri 6/15 olur ve 2/5 olarak sadeleşir.'],
    ['EBOB neden satır olarak gösteriliyor?', 'Ödevlerde ve sınav çözümlerinde çoğu zaman hangi sayıyla sadeleştirildiğinin yazılması istenir. EBOB satırı, pay ve paydanın bölündüğü sayıyı doğrudan verir; böylece işlem adımını defterinize aktarabilirsiniz.'],
    ['Yazdığım sayılar kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; pay ve payda hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı kesilse de araç çalışmayı sürdürür.'],
  ],
  related: ['kesir-hesapla', 'ebob-ekok', 'bilesik-kesir-cevir', 'kesir-karsilastir', 'ondalik-kesir-cevir', 'oran-sadelestir'],
};
