export default {
  slug: 'yuzyil-hesapla',
  title: 'Yıl Hangi Yüzyılda Hesaplama',
  h1Tail: 'yıl → yüzyıl ve binyıl',
  pageTitle: 'Yıl Hangi Yüzyılda Hesaplama – Yüzyıl ve Binyıl Bulma',
  description: 'Bir yılın hangi yüzyıla ve binyıla ait olduğunu bulun. Roma rakamıyla yazımı, yüzyılın kapsadığı yıllar, çeyreği ve milattan önceki yıllar desteklenir.',
  card: 'Bir yılın kaçıncı yüzyılda ve binyılda olduğunu, Roma rakamıyla yazımını ve yüzyılın yıl aralığını öğrenin.',
  category: 'zaman',
  keywords: ['hangi yüzyıl hesaplama', 'yüzyıl bulma', 'yıl kaçıncı yüzyıl', 'yüzyıl hesaplama', '1453 hangi yüzyıl', 'milattan önce yüzyıl hesaplama', 'yüzyıl çeyrek bulma', 'binyıl hesaplama'],
  lead: 'Bir yılı yazın, <strong>kaçıncı yüzyılda</strong> olduğunu, o yüzyılın hangi yılları kapsadığını, Roma rakamıyla nasıl yazıldığını ve hangi binyıla düştüğünü görün. Milattan önceki yıllar için de çalışır; tarih dersinde en çok karıştırılan yüzyıl, yarı ve çeyrek sorularını saniyeler içinde çözer.',
  button: 'Hesapla',
  inputs: [
    { id: 'yil', label: 'Yıl', type: 'number', placeholder: 'Örn. 1453', hint: 'Tam sayı yazın; 1 ile 9999 arasında.' },
    { id: 'cag', label: 'Dönem', type: 'select', options: [['ms', 'Milattan sonra (MS)'], ['mo', 'Milattan önce (MÖ)']] },
  ],
  compute(v, h) {
    const t = String(v.yil ?? '').trim();
    if (t !== '' && h.num(t, 'Yıl') === 0) h.err('Takvimde 0 yılı yoktur; MÖ 1\'den sonra MS 1 gelir. 1 ya da daha büyük bir yıl yazın.');
    const y = h.posint(v.yil, 'Yıl');
    if (y > 9999) h.err('"Yıl" en fazla 9999 olabilir.');
    const mo = v.cag === 'mo';
    const roma = (n) => {
      const tab = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
      let s = '';
      for (const [d, r] of tab) while (n >= d) { s += r; n -= d; }
      return s;
    };
    const c = Math.ceil(y / 100);
    const k = Math.ceil(y / 1000);
    const cBas = (c - 1) * 100 + 1, cSon = c * 100;
    const kBas = (k - 1) * 1000 + 1, kSon = k * 1000;
    const sira = mo ? cSon - y + 1 : y - cBas + 1;
    const kalan = mo ? y - cBas : cSon - y;
    const ceyrek = ['ilk çeyrek', 'ikinci çeyrek', 'üçüncü çeyrek', 'son çeyrek'][Math.ceil(sira / 25) - 1];
    const yari = sira <= 50 ? 'ilk yarı' : 'ikinci yarı';
    const on = mo ? '' : 'MS ';
    const rows = [
      ['Yüzyıl', `${mo ? 'MÖ ' : ''}${c}. yüzyıl`],
      ['Roma rakamıyla', `${mo ? 'MÖ ' : ''}${roma(c)}. yüzyıl`],
      ['Yüzyılın kapsadığı yıllar', mo ? `MÖ ${cSon} – MÖ ${cBas}` : `${cBas}–${cSon}`],
      ['Yüzyıl içindeki sırası', `${sira}. yıl (${yari}, ${ceyrek})`],
      ['Yüzyılın bitmesine kalan', `${kalan} yıl`],
      ['Binyıl', mo ? `MÖ ${k}. binyıl (MÖ ${kSon} – MÖ ${kBas})` : `${k}. binyıl (${kBas}–${kSon})`],
    ];
    if (!mo) rows.push(['Onyıl', `${Math.floor(y / 10) * 10}–${Math.floor(y / 10) * 10 + 9}`]);
    return {
      rows,
      note: `${on}${mo ? 'MÖ ' : ''}${y} yılı için hesaplandı. Yüzyıllar 1 ile biten yılda başlar, 00 ile biten yılda sona erer; 0 yılı yoktur.`,
    };
  },
  cases: [
    { in: { yil: '1453', cag: 'ms' }, out: { 'Yüzyıl': '15. yüzyıl', 'Roma rakamıyla': 'XV. yüzyıl', 'Yüzyılın kapsadığı yıllar': '1401–1500', 'Yüzyıl içindeki sırası': '53. yıl (ikinci yarı, üçüncü çeyrek)' } },
    { in: { yil: '2026', cag: 'ms' }, out: { 'Yüzyıl': '21. yüzyıl', 'Roma rakamıyla': 'XXI. yüzyıl', 'Yüzyılın kapsadığı yıllar': '2001–2100', 'Binyıl': '3. binyıl (2001–3000)', 'Yüzyılın bitmesine kalan': '74 yıl', 'Onyıl': '2020–2029' } },
    { in: { yil: '2000', cag: 'ms' }, out: { 'Yüzyıl': '20. yüzyıl', 'Yüzyılın kapsadığı yıllar': '1901–2000', 'Yüzyıl içindeki sırası': '100. yıl (ikinci yarı, son çeyrek)', 'Binyıl': '2. binyıl (1001–2000)' } },
    { in: { yil: '1923', cag: 'ms' }, out: { 'Yüzyıl': '20. yüzyıl', 'Roma rakamıyla': 'XX. yüzyıl', 'Yüzyıl içindeki sırası': '23. yıl (ilk yarı, ilk çeyrek)' } },
    { in: { yil: '1071', cag: 'ms' }, out: { 'Yüzyıl': '11. yüzyıl', 'Roma rakamıyla': 'XI. yüzyıl', 'Yüzyıl içindeki sırası': '71. yıl (ikinci yarı, üçüncü çeyrek)' } },
    { in: { yil: '44', cag: 'mo' }, out: { 'Yüzyıl': 'MÖ 1. yüzyıl', 'Yüzyılın kapsadığı yıllar': 'MÖ 100 – MÖ 1', 'Yüzyıl içindeki sırası': '57. yıl (ikinci yarı, üçüncü çeyrek)', 'Yüzyılın bitmesine kalan': '43 yıl' } },
    { in: { yil: '753', cag: 'mo' }, out: { 'Yüzyıl': 'MÖ 8. yüzyıl', 'Roma rakamıyla': 'MÖ VIII. yüzyıl', 'Yüzyılın kapsadığı yıllar': 'MÖ 800 – MÖ 701', 'Binyıl': 'MÖ 1. binyıl (MÖ 1000 – MÖ 1)' } },
    { in: { yil: '1', cag: 'ms' }, out: { 'Yüzyıl': '1. yüzyıl', 'Yüzyılın kapsadığı yıllar': '1–100' } },
    { in: { yil: '0', cag: 'ms' }, error: true },
    { in: { yil: '19,5', cag: 'ms' }, error: true },
    { in: { yil: '', cag: 'ms' }, error: true },
  ],
  howto: [
    '"Yıl" alanına yüzyılını öğrenmek istediğiniz yılı tam sayı olarak yazın.',
    'Yıl milattan önceyse "Dönem" listesinden "Milattan önce (MÖ)" seçeneğini işaretleyin; aksi hâlde varsayılan seçenek kalsın.',
    '"Hesapla" düğmesine basın. İlk satırda yüzyılı, altında Roma rakamıyla yazımını ve yüzyılın kapsadığı yıl aralığını görürsünüz.',
    '"Yüzyıl içindeki sırası" satırından yılın yüzyılın hangi yarısına ve çeyreğine düştüğünü okuyun.',
  ],
  sections: [
    { h: 'Yüzyıl nasıl bulunur?', p: [
      'Yüzyıl, yüz yıllık zaman dilimidir ve sayımı 1 yılından başlar. İlk yüzyıl 1 ile 100 yılları arasını, ikinci yüzyıl 101 ile 200 arasını kapsar. Bu yüzden bir yılın yüzyılı, yılın ilk iki basamağı değil, çoğu zaman bunun <strong>bir fazlasıdır</strong>.',
      'Pratik kural şudur: yılı 100\'e bölün ve sonucu yukarı yuvarlayın. Dört basamaklı yıllarda bunu akıldan şöyle yaparsınız: son iki basamak 00 değilse ilk iki basamağa 1 ekleyin; son iki basamak 00 ise ilk iki basamak yüzyılın kendisidir. Üç basamaklı yıllarda aynı kural ilk basamak için geçerlidir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'İstanbul\'un fethinin yılı olan <strong>1453</strong>: 1453 ÷ 100 = 14,53; yukarı yuvarlanınca 15. Yani 15. yüzyıl. Bu yüzyıl 1401\'de başlar, 1500\'de biter; 1453 yüzyılın 53. yılıdır ve ikinci yarısına, üçüncü çeyreğine düşer.',
      'Cumhuriyet\'in ilan edildiği <strong>1923</strong>: 1923 ÷ 100 = 19,23; yukarı yuvarlanınca 20. Yüzyılın 23. yılı olduğu için 20. yüzyılın ilk yarısında ve ilk çeyreğindedir. Malazgirt Savaşı\'nın yılı <strong>1071</strong> ise 11. yüzyılın 71. yılıdır; ikinci yarı ve üçüncü çeyrektir.',
      'Sonu 00 ile biten yıllar en çok yanılılan durumdur. <strong>2000</strong> ÷ 100 = 20 tam çıkar, yukarı yuvarlamaya gerek kalmaz; 2000 yılı 20. yüzyılın son yılıdır. 21. yüzyıl ve 3. binyıl 1 Ocak 2001\'de başlamıştır.',
    ] },
    { h: 'Yarı ve çeyrek nasıl belirlenir?', p: [
      'Tarih sorularında yüzyılın yanında çoğu zaman yarısı ve çeyreği de istenir. Bunun için yılın yüzyıl içindeki sırasına bakılır; milattan sonraki yıllarda bu, pratikte yılın son iki basamağıdır (00 ile biten yıllarda 100).',
    ], ul: [
      '<strong>1–25:</strong> ilk çeyrek, ilk yarı',
      '<strong>26–50:</strong> ikinci çeyrek, ilk yarı',
      '<strong>51–75:</strong> üçüncü çeyrek, ikinci yarı',
      '<strong>76–100:</strong> son (dördüncü) çeyrek, ikinci yarı',
    ] },
    { h: 'Milattan önceki yıllarda yüzyıl', p: [
      'Milattan önceki yıllar geriye doğru sayılır: sayı büyüdükçe daha eskiye gidilir. Yüzyıl numarası yine yılı 100\'e bölüp yukarı yuvarlayarak bulunur; MÖ 753, MÖ 8. yüzyıldadır. Ancak yüzyılın içindeki sıra tersine işler. MÖ 8. yüzyıl MÖ 800\'de başlar ve MÖ 701\'de biter; dolayısıyla büyük sayılı yıllar yüzyılın başında, küçük sayılı yıllar sonundadır.',
      'Örneğin <strong>MÖ 44</strong>, MÖ 1. yüzyıldadır. Bu yüzyıl MÖ 100\'den MÖ 1\'e doğru ilerler; MÖ 44 yüzyılın 57. yılıdır ve ikinci yarısına düşer. Milattan sonraki alışkanlıkla "44 küçük sayı, öyleyse ilk yarı" demek yanlış olur. Araç bu ters sayımı kendisi yapar.',
      'Takvimde 0 yılı bulunmaz; MÖ 1 yılını doğrudan MS 1 yılı izler. Bu nedenle araç 0 değerini kabul etmez.',
    ] },
    { h: 'Roma rakamıyla yüzyıl yazımı', p: [
      'Yüzyıllar tarih kitaplarında ve ansiklopedilerde sıklıkla Roma rakamıyla yazılır: XV. yüzyıl, XX. yüzyıl gibi. Temel simgeler I (1), V (5), X (10), L (50) ve C (100) harfleridir. Küçük simge büyüğün solundaysa çıkarılır, sağındaysa eklenir: IV 4, VI 6, IX 9, XI 11, XIX 19, XXI 21 demektir. Araç yüzyıl numarasını bu kurala göre çevirip ikinci satırda gösterir.',
    ] },
    { h: 'Sık başvurulan yüzyıllar', ul: [
      '<strong>622</strong> (Hicret): 7. yüzyıl',
      '<strong>1071</strong> (Malazgirt): 11. yüzyıl',
      '<strong>1299</strong>: 13. yüzyılın son çeyreği',
      '<strong>1453</strong> (İstanbul\'un fethi): 15. yüzyıl',
      '<strong>1789</strong> (Fransız İhtilali): 18. yüzyıl',
      '<strong>1923</strong> (Cumhuriyet\'in ilanı): 20. yüzyıl',
      '<strong>2026</strong>: 21. yüzyılın ikinci çeyreğinin ilk yılı',
    ] },
    { h: 'Onyıl ve binyıl hakkında not', p: [
      'Binyıl da yüzyılla aynı mantıkla sayılır: 1. binyıl 1–1000, 2. binyıl 1001–2000, 3. binyıl 2001–3000 yıllarını kapsar. Onyıllar ise gündelik dilde farklı adlandırılır: "doksanlar" denince 1990–1999 yılları anlaşılır. Araç onyıl satırında bu yaygın kullanımı, yani aynı onlar basamağını paylaşan on yılı gösterir. Bu yüzden 2000 yılı gündelik dilde iki binlerin ilk yılıyken, yüzyıl sayımında 20. yüzyılın son yılıdır; ikisi çelişmez, yalnızca farklı sayım gelenekleridir.',
    ] },
  ],
  faq: [
    ['Bir yılın hangi yüzyılda olduğunu nasıl bulurum?', 'Yılı 100\'e bölüp sonucu yukarı yuvarlayın. 1453 için 14,53 yukarı yuvarlanır ve 15. yüzyıl bulunur. Kısa yol: son iki basamak 00 değilse yılın yüzler kısmına 1 ekleyin.'],
    ['2000 yılı 20. yüzyılda mı, 21. yüzyılda mı?', '2000 yılı 20. yüzyılın son yılıdır. Yüzyıl sayımı 1 yılından başladığı için her yüzyıl 01 ile biten yılda başlar ve 00 ile biten yılda sona erer. 21. yüzyıl 2001\'de başlamıştır.'],
    ['Şu an hangi yüzyıldayız?', '2001 ile 2100 yılları arası 21. yüzyıldır. 2026 yılı bu yüzyılın 26. yılıdır; yani ilk yarının ikinci çeyreğindedir.'],
    ['Yüzyılın çeyreği nasıl hesaplanır?', 'Yılın yüzyıl içindeki sırasına bakılır: 1–25 ilk çeyrek, 26–50 ikinci çeyrek, 51–75 üçüncü çeyrek, 76–100 son çeyrektir. 1876 yılı 19. yüzyılın son çeyreğindedir.'],
    ['Milattan önceki yıllarda yarı ve çeyrek neden ters?', 'MÖ yıllar geriye doğru sayıldığından yüzyıl büyük sayılı yılla başlar. MÖ 5. yüzyıl MÖ 500\'de başlayıp MÖ 401\'de biter; MÖ 480 bu yüzyılın ilk çeyreğinde, MÖ 410 son çeyreğindedir.'],
    ['Neden 0 yılı yazamıyorum?', 'Yaygın tarih sayımında 0 yılı yoktur; MÖ 1\'den hemen sonra MS 1 gelir. Bu yüzden ilk yüzyıl 1 yılıyla başlar ve araç 0 değerini geçersiz sayar.'],
    ['Hicri ya da Rumi yıl girebilir miyim?', 'Araç Miladi yıllarla çalışır. Hicri ya da Rumi bir yılın yüzyılını Miladi karşılığıyla öğrenmek için önce yılı Miladi takvime çevirmeniz gerekir.'],
    ['Yazdığım yıl bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değer sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['artik-yil-kontrol', 'kusak-hesapla', 'rumi-takvim-cevir', 'hangi-gun-hesapla', 'ceyrek-donem-hesapla'],
};
