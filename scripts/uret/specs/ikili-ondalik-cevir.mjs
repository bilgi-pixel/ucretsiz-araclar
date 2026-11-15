export default {
  slug: 'ikili-ondalik-cevir',
  title: 'İkili (Binary) Ondalık Çevirici',
  h1Tail: '2\'lik ↔ 10\'luk taban',
  pageTitle: 'İkili (Binary) Ondalık Çevirici – 2\'lik Tabandan 10\'luk Tabana',
  description: 'İkili (binary) sayıyı ondalığa, ondalık sayıyı ikiliye çevirin. Sonucu dörtlü bit gruplarıyla, onaltılık ve sekizlik karşılığıyla birlikte görün.',
  card: 'Binary sayıyı ondalığa, ondalık sayıyı binary\'ye çevirin; bit grupları, hex ve oktal karşılığıyla birlikte.',
  category: 'matematik',
  keywords: ['binary ondalık çevirme', 'ikili sayı ondalık çevirme', 'ondalık binary çevirici', '2lik tabandan 10luk tabana', '10luk tabandan 2lik tabana', 'binary hesaplama', 'ikilik sayı sistemi'],
  lead: `0 ve 1'lerden oluşan ikili (binary) bir sayıyı ondalık karşılığına ya da ondalık bir tam sayıyı ikili gösterimine çevirin. Araç sonucu <strong>dörtlü bit gruplarıyla</strong>, onaltılık ve sekizlik karşılıklarıyla birlikte verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sayı', type: 'text', placeholder: 'Örn. 1010 ya da 255', hint: 'İkili sayıda boşluk bırakabilirsiniz: 1111 0000' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ikili', 'İkili → Ondalık'], ['ondalik', 'Ondalık → İkili']] },
  ],
  compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur; harf ve simgeleri silin.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^0b/i, '');
      if (!/^[01]+$/.test(t)) h.err('İkili sayı yalnızca 0 ve 1 rakamlarından oluşur; diğer karakterleri silin ya da çeviri yönünü değiştirin.');
      if (t.length > 200) h.err('İkili sayı çok uzun; en fazla 200 basamak yazın.');
      n = BigInt('0b' + t);
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const bin = n.toString(2);
    const grup = bin.padStart(Math.ceil(bin.length / 4) * 4, '0').replace(/(.{4})(?=.)/g, '$1 ');
    const ikiliSatir = ['İkili', s + bin], ondalikSatir = ['Ondalık', s + n.toString(10)];
    return {
      rows: [
        ...(v.yon === 'ondalik' ? [ikiliSatir, ondalikSatir] : [ondalikSatir, ikiliSatir]),
        ['Dörtlü gruplarla', s + grup],
        ['Onaltılık', s + n.toString(16).toUpperCase()],
        ['Sekizlik', s + n.toString(8)],
        ['Bit sayısı', String(bin.length)],
      ],
      note: 'Dörtlü gruplar, soldan sıfır eklenerek tamamlanır; her grup bir onaltılık basamağa karşılık gelir.',
    };
  },
  cases: [
    { in: { deger: '1010', yon: 'ikili' }, out: { 'Ondalık': '10', 'Onaltılık': 'A', 'Sekizlik': '12', 'Bit sayısı': '4' } },
    { in: { deger: '255', yon: 'ondalik' }, out: { 'İkili': '11111111', 'Dörtlü gruplarla': '1111 1111', 'Onaltılık': 'FF', 'Sekizlik': '377' } },
    { in: { deger: '1101', yon: 'ikili' }, out: { 'Ondalık': '13' } },
    { in: { deger: '156', yon: 'ondalik' }, out: { 'İkili': '10011100', 'Bit sayısı': '8' } },
    { in: { deger: '1000', yon: 'ondalik' }, out: { 'İkili': '1111101000', 'Dörtlü gruplarla': '0011 1110 1000', 'Onaltılık': '3E8' } },
    { in: { deger: '1 0000 0000', yon: 'ikili' }, out: { 'Ondalık': '256', 'Bit sayısı': '9' } },
    { in: { deger: '0', yon: 'ondalik' }, out: { 'İkili': '0' } },
    { in: { deger: '-101', yon: 'ikili' }, out: { 'Ondalık': '-5' } },
    { in: { deger: '102', yon: 'ikili' }, error: true },
    { in: { deger: '12,5', yon: 'ondalik' }, error: true },
    { in: { deger: '', yon: 'ikili' }, error: true },
  ],
  howto: [
    `Çevirmek istediğiniz sayıyı "Sayı" alanına yazın. İkili sayılarda okumayı kolaylaştırmak için basamaklar arasında boşluk bırakabilirsiniz.`,
    `"Çeviri yönü" listesinden ikiliden ondalığa mı, ondalıktan ikiliye mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında dörtlü gruplara ayrılmış ikili yazım ile onaltılık ve sekizlik değerler yer alır.`,
    `"Sonucu kopyala" düğmesiyle satırları panoya alıp ödevinize, kodunuza ya da notlarınıza yapıştırın.`,
  ],
  sections: [
    { h: 'İkili sayı sistemi nedir?', p: [
      `Gündelik hayatta kullandığımız ondalık sistemde on farklı rakam vardır ve her basamak sağdan sola doğru 10'un kuvvetleriyle değer kazanır: birler, onlar, yüzler. İkili sistemde ise yalnızca iki rakam bulunur: 0 ve 1. Basamak değerleri bu kez 2'nin kuvvetleridir: 1, 2, 4, 8, 16, 32 ve böyle devam eder. İkili sistemdeki her basamağa <strong>bit</strong> denir; sekiz bitlik gruba ise <strong>bayt</strong> adı verilir.`,
      `Bilgisayarların ikili sistemi kullanmasının nedeni elektroniktir: bir devre elemanının akım iletip iletmediğini, yani açık mı kapalı mı olduğunu ayırt etmek, on ayrı gerilim düzeyini ayırt etmekten çok daha güvenilirdir. Ekrandaki bir harf, bir fotoğrafın pikseli ya da bir ses kaydı, belleğin içinde sonunda 0 ve 1 dizilerine dönüşür.`,
    ] },
    { h: 'İkiliden ondalığa çevirme', p: [
      `Her basamak, bulunduğu yerin 2'li kuvvetiyle çarpılır ve sonuçlar toplanır. En sağdaki basamağın değeri 2<sup>0</sup> = 1'dir; sola doğru her adımda değer ikiye katlanır. Pratikte yalnızca 1 yazan basamakların değerlerini toplamak yeterlidir.`,
      `<strong>Örnek:</strong> 1101 sayısını çevirelim. Basamak değerleri soldan sağa 8, 4, 2 ve 1'dir. Hesap 1 × 8 + 1 × 4 + 0 × 2 + 1 × 1 = 8 + 4 + 0 + 1 = <strong>13</strong> olur. Aynı yolla 1010 sayısı 8 + 2 = <strong>10</strong>, sekiz tane 1'den oluşan 11111111 ise 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = <strong>255</strong> eder.`,
    ] },
    { h: 'Ondalıktan ikiliye çevirme: sürekli ikiye bölme', p: [
      `Ondalık bir sayıyı ikiliye çevirmenin klasik yolu, sayıyı bölüm sıfır olana kadar art arda 2'ye bölmek ve her adımdaki kalanı not etmektir. Kalanlar <strong>sondan başa doğru</strong> okunduğunda ikili sayı ortaya çıkar.`,
      `<strong>Örnek:</strong> 156 sayısını çevirelim. 156 ÷ 2 = 78 kalan 0; 78 ÷ 2 = 39 kalan 0; 39 ÷ 2 = 19 kalan 1; 19 ÷ 2 = 9 kalan 1; 9 ÷ 2 = 4 kalan 1; 4 ÷ 2 = 2 kalan 0; 2 ÷ 2 = 1 kalan 0; 1 ÷ 2 = 0 kalan 1. Kalanları aşağıdan yukarıya okursak <strong>10011100</strong> elde ederiz. Sağlamasını yapalım: 128 + 16 + 8 + 4 = 156.`,
      `İkinci bir yöntem, sayıya sığan en büyük 2 kuvvetinden başlayıp çıkarma yapmaktır. 156'ya sığan en büyük kuvvet 128'dir; kalan 28'e 16, sonra 8, sonra 4 sığar. Kullanılan kuvvetlerin basamağına 1, kullanılmayanlara 0 yazılır ve aynı sonuca ulaşılır.`,
    ] },
    { h: '2\'nin kuvvetleri tablosu', ul: [
      `2<sup>0</sup> = 1, 2<sup>1</sup> = 2, 2<sup>2</sup> = 4, 2<sup>3</sup> = 8`,
      `2<sup>4</sup> = 16, 2<sup>5</sup> = 32, 2<sup>6</sup> = 64, 2<sup>7</sup> = 128`,
      `2<sup>8</sup> = 256, 2<sup>9</sup> = 512, 2<sup>10</sup> = 1.024`,
      `2<sup>16</sup> = 65.536 ve 2<sup>32</sup> = 4.294.967.296`,
      `n bit ile yazılabilen en büyük sayı 2<sup>n</sup> − 1'dir: 8 bitte 255, 16 bitte 65.535.`,
    ] },
    { h: 'Dörtlü gruplar, onaltılık ve sekizlik karşılıklar', p: [
      `Uzun ikili sayıları okumak zordur; bu yüzden bitler sağdan başlayarak dörderli gruplara ayrılır. Dört bit tam olarak bir onaltılık basamağa karşılık gelir: 1111 grubu F, 1010 grubu A'dır. Örneğin ondalık 1000 sayısının ikili yazımı 1111101000'dır; dörtlü gruplarla 0011 1110 1000 biçiminde yazılır ve gruplar sırasıyla 3, E ve 8 olduğundan onaltılık karşılığı 3E8'dir. Aynı mantıkla bitler üçerli gruplandığında sekizlik gösterim elde edilir.`,
      `Bu gösterimler ağ yapılandırmasında sık karşınıza çıkar. Bir IPv4 adresinin her bölümü 8 bitlik bir sayıdır ve bu yüzden 0 ile 255 arasında değer alır. Alt ağ maskesindeki 255, sekiz bitin hepsinin 1 olduğunu; 192 ise ilk iki bitin 1, kalanların 0 olduğunu (11000000) gösterir.`,
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      `Araç tam sayıları çevirir; virgüllü ondalık sayılar ve ikili kesirler desteklenmez. Ondalık yönde 60, ikili yönde 200 basamağa kadar sayı girebilirsiniz; hesap tam sayı aritmetiğiyle yapıldığından büyük sayılarda da yuvarlama olmaz. Başına eksi işareti koyduğunuz sayılar, işaret korunarak çevrilir; bilgisayarların negatif sayıları saklamak için kullandığı ikiye tümleyen gösterimi üretilmez.`,
      `Sık yapılan bir hata, ikili sayıyı ondalık yönü seçiliyken yazmaktır: 1010 ondalık olarak okunduğunda bin on anlamına gelir ve bambaşka bir sonuç çıkar. Çeviri yönünü kontrol etmeyi unutmayın.`,
    ] },
  ],
  faq: [
    ['1010 ikili sayısı ondalıkta kaçtır?', '10\'dur. Basamak değerleri 8, 4, 2 ve 1 olduğundan 1 × 8 + 0 × 4 + 1 × 2 + 0 × 1 = 10 bulunur.'],
    ['255 sayısının binary karşılığı nedir?', '11111111\'dir. Sekiz bitin tamamı 1 olduğunda ulaşılan en büyük değer 255\'tir; bu nedenle bir bayt 0 ile 255 arasında 256 farklı değer alabilir.'],
    ['Bit ve bayt arasındaki fark nedir?', 'Bit, 0 ya da 1 değerini alan tek bir ikili basamaktır. Bayt ise 8 bitten oluşan gruptur. Ondalık 156 sayısı ikili sistemde 10011100 olarak yazılır ve tam bir baytı doldurur.'],
    ['İkili sayılarda baştaki sıfırlar değeri değiştirir mi?', 'Hayır. 00001010 ile 1010 aynı sayıdır. Baştaki sıfırlar yalnızca sayıyı 8 ya da 16 bit gibi sabit bir uzunluğa tamamlamak için yazılır.'],
    ['Ondalıklı (virgüllü) sayıları çevirebilir miyim?', 'Bu araç yalnızca tam sayılarla çalışır. Virgüllü bir sayı yazdığınızda tam sayı girmeniz gerektiğini belirten bir uyarı görürsünüz.'],
    ['Çok büyük sayılar doğru çevriliyor mu?', 'Evet. Araç basamak sınırı olmayan tam sayı aritmetiği kullanır; 64 bitlik ve daha uzun değerler de son basamağına kadar doğru hesaplanır.'],
    ['Binary sayı nasıl okunur?', 'Rakamlar tek tek okunur: 101 "bir sıfır bir" diye söylenir, "yüz bir" denmez. Hangi tabanda olduğunu belirtmek için sayının sağ altına 2 yazılır ya da başına 0b ön eki konur; araç bu ön eki kabul eder.'],
    ['Yazdığım sayılar sunucuya gidiyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; girdiğiniz değerler hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['sayi-tabani-donustur', 'onaltilik-ondalik-cevir', 'sekizlik-ondalik-cevir', 'ikili-sayi-islem', 'onaltilik-hesap-makinesi'],
};
