export default {
  slug: 'sekizlik-ondalik-cevir',
  title: 'Sekizlik (Oktal) Ondalık Çevirici',
  h1Tail: '8\'lik ↔ 10\'luk taban',
  pageTitle: 'Sekizlik (Oktal) Ondalık Çevirici – 8\'lik Tabandan 10\'luk Tabana',
  description: 'Sekizlik (oktal) sayıyı ondalığa, ondalık sayıyı sekizliğe çevirin. İkili ve onaltılık karşılığı ile üç haneli dosya izinlerinin rwx açılımı da gösterilir.',
  card: 'Oktal sayıyı ondalığa, ondalık sayıyı oktale çevirin; ikili karşılığını ve 755 gibi izin kodlarının açılımını görün.',
  category: 'matematik',
  keywords: ['oktal ondalık çevirme', 'sekizlik sayı çevirici', '8lik tabandan 10luk tabana', 'ondalık oktal çevirme', 'octal to decimal', 'sekizlik sayı sistemi', 'chmod 755 ne demek'],
  lead: `Sekizlik (oktal) bir sayıyı ondalık karşılığına ya da ondalık bir tam sayıyı sekizlik gösterime çevirin. Üç haneli bir oktal değer yazdığınızda araç bunun <strong>dosya izni</strong> olarak okunuşunu da (rwx biçiminde) gösterir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sayı', type: 'text', placeholder: 'Örn. 755 ya da 493', hint: 'Sekizlik sayılarda yalnızca 0–7 rakamları bulunur.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['oktal', 'Sekizlik → Ondalık'], ['ondalik', 'Ondalık → Sekizlik']] },
  ],
  compute(v, h) {
    let t = String(v.deger ?? '').trim().replace(/[\s_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanını doldurun.');
    let eksi = false;
    if (t[0] === '-') { eksi = true; t = t.slice(1); } else if (t[0] === '+') t = t.slice(1);
    let n, izin = null;
    if (v.yon === 'ondalik') {
      if (/^\d+[.,]\d+$/.test(t)) h.err('Bu araç yalnızca tam sayıları çevirir; ondalık kısmı olmayan bir sayı yazın.');
      if (!/^\d+$/.test(t)) h.err('Ondalık sayı yalnızca 0–9 rakamlarından oluşur; harf ve simgeleri silin.');
      if (t.length > 60) h.err('Sayı çok uzun; en fazla 60 basamak yazın.');
      n = BigInt(t);
    } else {
      t = t.replace(/^0o/i, '');
      if (/^\d+$/.test(t) && /[89]/.test(t)) h.err('Sekizlik sayıda 8 ve 9 rakamları bulunmaz. Ondalık bir sayı yazdıysanız çeviri yönünü "Ondalık → Sekizlik" yapın.');
      if (!/^[0-7]+$/.test(t)) h.err('Sekizlik sayı yalnızca 0–7 rakamlarından oluşur; diğer karakterleri silin.');
      if (t.length > 70) h.err('Sekizlik sayı çok uzun; en fazla 70 basamak yazın.');
      n = BigInt('0o' + t);
      if (t.length === 3 && !eksi) izin = [...t].map((c) => { const k = Number(c); return (k & 4 ? 'r' : '-') + (k & 2 ? 'w' : '-') + (k & 1 ? 'x' : '-'); }).join('');
    }
    if (n === 0n) eksi = false;
    const s = eksi ? '-' : '';
    const okSatir = ['Sekizlik', s + n.toString(8)], ondalikSatir = ['Ondalık', s + n.toString(10)];
    const rows = [
      ...(v.yon === 'ondalik' ? [okSatir, ondalikSatir] : [ondalikSatir, okSatir]),
      ['İkili', s + n.toString(2)],
      ['Onaltılık', s + n.toString(16).toUpperCase()],
    ];
    if (izin) rows.push(['Dosya izni olarak', izin]);
    return { rows, note: 'Basamak değerleri sağdan sola 1, 8, 64, 512, 4.096… biçiminde 8\'in kuvvetleridir.' };
  },
  cases: [
    { in: { deger: '17', yon: 'oktal' }, out: { 'Ondalık': '15', 'İkili': '1111', 'Onaltılık': 'F' } },
    { in: { deger: '64', yon: 'ondalik' }, out: { 'Sekizlik': '100', 'İkili': '1000000' } },
    { in: { deger: '755', yon: 'oktal' }, out: { 'Ondalık': '493', 'İkili': '111101101', 'Dosya izni olarak': 'rwxr-xr-x' } },
    { in: { deger: '644', yon: 'oktal' }, out: { 'Ondalık': '420', 'Dosya izni olarak': 'rw-r--r--' } },
    { in: { deger: '777', yon: 'oktal' }, out: { 'Ondalık': '511', 'Onaltılık': '1FF' } },
    { in: { deger: '8', yon: 'ondalik' }, out: { 'Sekizlik': '10' } },
    { in: { deger: '100', yon: 'ondalik' }, out: { 'Sekizlik': '144' } },
    { in: { deger: '493', yon: 'ondalik' }, out: { 'Sekizlik': '755' } },
    { in: { deger: '89', yon: 'oktal' }, error: true },
    { in: { deger: '7a', yon: 'oktal' }, error: true },
    { in: { deger: '', yon: 'ondalik' }, error: true },
  ],
  howto: [
    `Çevirmek istediğiniz sayıyı "Sayı" alanına yazın. Sekizlik sayıları başında <code>0o</code> ön ekiyle de girebilirsiniz.`,
    `"Çeviri yönü" listesinden sekizlikten ondalığa mı, ondalıktan sekizliğe mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında aynı sayının ikili ve onaltılık yazımı listelenir.`,
    `Üç haneli bir sekizlik değer yazdıysanız son satırda bu değerin okuma, yazma ve çalıştırma izinleri olarak açılımını görürsünüz.`,
  ],
  sections: [
    { h: 'Sekizlik sayı sistemi nedir?', p: [
      `Sekizlik sistem 8 tabanlıdır ve yalnızca 0'dan 7'ye kadar olan sekiz rakamı kullanır. 7'den sonra yeni bir rakam olmadığı için bir sonraki sayı 10 olarak yazılır; ancak bu "on" değil, sekiz demektir. Basamak değerleri sağdan sola doğru 8'in kuvvetleridir: 1, 8, 64, 512, 4.096. Ondalık sistemde 9'dan sonra basamak atlanması gibi, burada 7'den sonra basamak atlanır.`,
      `Sekizlik sistemin bilgisayar dünyasındaki yeri, ikili sistemle olan ilişkisinden gelir. Sekiz, ikinin üçüncü kuvveti olduğundan her sekizlik basamak tam olarak <strong>üç bite</strong> karşılık gelir: 0 = 000, 1 = 001, 2 = 010, 3 = 011, 4 = 100, 5 = 101, 6 = 110, 7 = 111. Böylece uzun bir ikili sayı, bitler üçerli gruplanarak çok daha kısa yazılabilir. Günümüzde bu görevi büyük oranda onaltılık sistem üstlenmiştir; yine de sekizlik gösterim dosya izinlerinde ve bazı programlama dillerinin sayı yazımında yaşamaya devam eder.`,
    ] },
    { h: 'Sekizlikten ondalığa çevirme', p: [
      `Her basamak, bulunduğu yerin 8'li kuvvetiyle çarpılır ve çarpımlar toplanır.`,
      `<strong>Örnek 1:</strong> 17 sayısı 1 × 8 + 7 × 1 = <strong>15</strong> eder.`,
      `<strong>Örnek 2:</strong> 755 sayısını çevirelim. Basamak değerleri 64, 8 ve 1'dir. Hesap 7 × 64 + 5 × 8 + 5 × 1 = 448 + 40 + 5 = <strong>493</strong> olur.`,
      `<strong>Örnek 3:</strong> 644 sayısı 6 × 64 + 4 × 8 + 4 = 384 + 32 + 4 = <strong>420</strong>, üç basamaklı en büyük sekizlik sayı olan 777 ise 448 + 56 + 7 = <strong>511</strong> eder.`,
    ] },
    { h: 'Ondalıktan sekizliğe çevirme', p: [
      `Ondalık sayı, bölüm sıfır olana kadar art arda 8'e bölünür ve her adımdaki kalan yazılır. Kalanlar sondan başa doğru okunduğunda sekizlik sayı elde edilir.`,
      `<strong>Örnek:</strong> 493 sayısını çevirelim. 493 ÷ 8 = 61 kalan 5; 61 ÷ 8 = 7 kalan 5; 7 ÷ 8 = 0 kalan 7. Kalanları aşağıdan yukarıya okuduğumuzda <strong>755</strong> bulunur. Aynı yöntemle 100 sayısı için 100 ÷ 8 = 12 kalan 4; 12 ÷ 8 = 1 kalan 4; 1 ÷ 8 = 0 kalan 1 adımları izlenir ve sonuç <strong>144</strong> çıkar. 64 sayısı 8'in karesi olduğundan sekizlik sistemde 100 olarak yazılır.`,
    ] },
    { h: 'Dosya izinlerinde sekizlik sayılar', p: [
      `Linux ve benzeri işletim sistemlerinde, ayrıca web sunucularındaki dosya yöneticilerinde izinler üç haneli sekizlik sayılarla ifade edilir. İlk hane dosya sahibinin, ikinci hane grubun, üçüncü hane diğer kullanıcıların izinlerini gösterir. Her hane üç iznin toplamıdır: <strong>okuma (r) = 4</strong>, <strong>yazma (w) = 2</strong>, <strong>çalıştırma (x) = 1</strong>.`,
      `Buna göre 7 = 4 + 2 + 1 tüm izinler, 6 = 4 + 2 okuma ve yazma, 5 = 4 + 1 okuma ve çalıştırma, 4 ise yalnızca okuma anlamına gelir. 755 değeri <code>rwxr-xr-x</code> olarak açılır: sahibi her şeyi yapabilir, diğerleri okuyup çalıştırabilir ama değiştiremez. 644 değeri <code>rw-r--r--</code> demektir: sahibi okuyup yazabilir, diğerleri yalnızca okur. Araç üç haneli sekizlik girdide bu açılımı son satırda verir.`,
      `777 herkese tam yetki verdiği için sunucularda güvenlik açığına yol açabilir. Bir sitenin dosya izinlerini değiştirmeden önce barındırma sağlayıcınızın ya da sistem yöneticinizin önerdiği değerleri kullanın; bu sayfa yalnızca sayının ne anlama geldiğini açıklar.`,
    ] },
    { h: 'Sekizlik, ikili ve onaltılık karşılıklar', ul: [
      `Sekizlik <strong>7</strong> = ikili 111 = ondalık 7`,
      `Sekizlik <strong>10</strong> = ikili 1000 = ondalık 8`,
      `Sekizlik <strong>20</strong> = ikili 10000 = ondalık 16 = onaltılık 10`,
      `Sekizlik <strong>100</strong> = ikili 1000000 = ondalık 64 = onaltılık 40`,
      `Sekizlik <strong>377</strong> = ikili 11111111 = ondalık 255 = onaltılık FF`,
      `Sekizlik <strong>1000</strong> = ondalık 512 = onaltılık 200`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `En yaygın hata, sekizlik bir sayının içinde 8 ya da 9 rakamı kullanmaktır; bu rakamlar sekizlik sistemde yoktur ve araç böyle bir girdide sizi uyarır. İkinci hata, sekizlik sayıyı ondalık gibi okumaktır: sekizlik 10 "on" değil sekizdir, sekizlik 100 ise altmış dörttür. Bazı programlama dillerinde başı sıfırla yazılan sayıların sekizlik kabul edilmesi de beklenmedik sonuçlara yol açabilir; örneğin 010 yazımı böyle bir dilde 8 olarak yorumlanır.`,
      `Araç tam sayıları çevirir; virgüllü sayılar ve sekizlik kesirler desteklenmez. Sekizlik yönde 70, ondalık yönde 60 basamağa kadar değer girilebilir ve sonuçlar yuvarlanmadan hesaplanır. Eksi işaretli sayılar işaret korunarak çevrilir.`,
    ] },
  ],
  faq: [
    ['Sekizlik 10 sayısı ondalıkta kaçtır?', '8\'dir. Sekizlik sistemde 7\'den sonra basamak atlanır; 1 × 8 + 0 × 1 = 8 eder.'],
    ['Sekizlik sayılarda neden 8 ve 9 yok?', 'Çünkü taban 8\'dir ve bir tabanda yalnızca tabandan küçük rakamlar kullanılır. Ondalık sistemde "10" diye tek bir rakam olmaması gibi, sekizlik sistemde de 8 ve 9 rakamları bulunmaz.'],
    ['755 izni ne anlama gelir?', 'Sahibi için okuma, yazma ve çalıştırma (7); grup ve diğer kullanıcılar için okuma ve çalıştırma (5) demektir. Harflerle rwxr-xr-x biçiminde gösterilir ve ondalık karşılığı 493\'tür.'],
    ['644 ile 755 arasındaki fark nedir?', '644\'te hiçbir kullanıcı için çalıştırma izni yoktur; sahibi okuyup yazabilir, diğerleri yalnızca okuyabilir. 755\'te ise herkes çalıştırabilir. Genellikle sıradan dosyalar için 644, klasörler ve çalıştırılabilir dosyalar için 755 görülür.'],
    ['Oktal sayıyı ikiliye nasıl hızlı çeviririm?', 'Her sekizlik basamağı üç bitlik karşılığıyla değiştirin. 755 için 7 = 111, 5 = 101, 5 = 101 olduğundan ikili yazım 111101101 olur.'],
    ['0o ön eki nedir?', 'Sayının sekizlik tabanda yazıldığını belirten bir işarettir; değeri değiştirmez. Araç bu ön eki kendisi ayıklar, yani 0o17 ile 17 aynı sonucu verir.'],
    ['Ondalıklı sayıları çevirebilir miyim?', 'Hayır, araç yalnızca tam sayılarla çalışır. Virgüllü bir değer yazarsanız tam sayı girmeniz gerektiğini belirten bir uyarı görürsünüz.'],
    ['Yazdığım sayılar bir yere gönderiliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['sayi-tabani-donustur', 'ikili-ondalik-cevir', 'onaltilik-ondalik-cevir', 'ikili-sayi-islem', 'onaltilik-hesap-makinesi'],
};
