export default {
  slug: 'palindrom-kontrol',
  title: 'Palindrom Kelime Kontrolü',
  h1Tail: 'tersten de aynı okunuyor mu?',
  pageTitle: 'Palindrom Kelime Kontrolü – Tersten Aynı Okunuyor mu?',
  description: 'Bir kelimenin, cümlenin ya da sayının palindrom olup olmadığını denetleyin. Boşluk ve noktalama yok sayılır, Türkçe harf kuralları uygulanır; tersten yazılışı gösterilir.',
  card: 'Kelime, cümle ya da sayı tersten de aynı mı okunuyor? Türkçe harf kurallarıyla palindrom denetimi ve tersten yazılışı.',
  category: 'metin',
  keywords: ['palindrom kontrol', 'palindrom kelime', 'tersten aynı okunan kelimeler', 'palindrom cümle', 'palindrom sayı', 'palindrom nedir', 'tersten okunuşu aynı olan'],
  lead: 'Yazdığınız kelime, cümle ya da sayının <strong>baştan ve sondan aynı okunup okunmadığını</strong> denetleyin. Araç, karşılaştırdığı harf dizisini ve tersten yazılışını gösterir; palindrom değilse simetrinin ilk bozulduğu yeri söyler. Her satıra bir ifade yazarak toplu denetim de yapabilirsiniz.',
  button: 'Kontrol et',
  inputs: [
    { id: 'metin', label: 'Kelime, cümle ya da sayı', type: 'textarea', placeholder: 'Örn. Ey Edip Adana\'da pide ye', rows: 3, hint: 'Birden fazla ifade için her birini ayrı satıra yazın' },
    { id: 'kip', label: 'Karşılaştırma', type: 'select', options: [['harf', 'Yalnızca harf ve rakamlar (boşluk, noktalama, büyük-küçük harf yok sayılır)'], ['birebir', 'Birebir (her karakter, büyük-küçük harf dahil)']] },
  ],
  compute(v, h) {
    const satirlar = String(v.metin ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (!satirlar.length) h.err('Denetlenecek kelimeyi, cümleyi ya da sayıyı yazın.');
    if (satirlar.length > 200) h.err('Tek seferde en fazla 200 satır denetlenebilir.');
    const birebir = v.kip === 'birebir';
    const hazirla = (s) => {
      const t = s.normalize('NFC');
      if (birebir) return Array.from(t);
      const kucuk = t.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
      return Array.from(kucuk).filter((c) => /[\p{L}\p{N}]/u.test(c));
    };
    const incele = (s) => {
      const d = hazirla(s);
      let fark = -1;
      for (let i = 0, j = d.length - 1; i < j; i++, j--) if (d[i] !== d[j]) { fark = i; break; }
      return { d, fark, pal: d.length > 0 && fark === -1 };
    };
    const sonuclar = satirlar.map(incele);
    if (sonuclar.every((r) => r.d.length === 0)) h.err('Karşılaştırılacak harf ya da rakam bulunamadı; yalnızca noktalama işareti yazmış olabilirsiniz.');
    if (satirlar.length === 1) {
      const r = sonuclar[0], n = r.d.length;
      const rows = [
        ['Sonuç', r.pal ? 'Palindrom' : 'Palindrom değil'],
        ['Karşılaştırılan dizi', r.d.join('')],
        ['Tersten yazılışı', r.d.slice().reverse().join('')],
        ['Uzunluk', h.fmt(n, 0) + ' karakter'],
      ];
      if (!r.pal) rows.push(['İlk uyuşmazlık', `baştan ${r.fark + 1}. karakter "${r.d[r.fark]}", sondan ${r.fark + 1}. karakter "${r.d[n - 1 - r.fark]}"`]);
      else rows.push(['Orta nokta', n % 2 === 1 ? `"${r.d[(n - 1) / 2]}" harfi (tek uzunluk)` : 'İki yarı arasında (çift uzunluk)']);
      return { rows, note: n === 1 ? 'Tek karakterlik ifadeler tanım gereği palindromdur.' : undefined };
    }
    const adet = sonuclar.filter((r) => r.pal).length;
    const rows = [['Palindrom sayısı', `${h.fmt(adet, 0)} / ${h.fmt(satirlar.length, 0)}`]];
    satirlar.forEach((s, i) => {
      const kisa = Array.from(s).length > 60 ? Array.from(s).slice(0, 60).join('') + '…' : s;
      rows.push([`${i + 1}. ${kisa}`, sonuclar[i].d.length === 0 ? 'Harf ya da rakam yok' : sonuclar[i].pal ? 'Palindrom' : 'Palindrom değil']);
    });
    return { rows };
  },
  cases: [
    { in: { metin: 'kayak' }, out: { 'Sonuç': 'Palindrom', 'Tersten yazılışı': 'kayak', 'Uzunluk': '5 karakter', 'Orta nokta': '"y" harfi (tek uzunluk)' } },
    { in: { metin: 'Ey Edip Adana\'da pide ye' }, out: { 'Sonuç': 'Palindrom', 'Karşılaştırılan dizi': 'eyedipadanadapideye', 'Uzunluk': '19 karakter' } },
    { in: { metin: 'kitap' }, out: { 'Sonuç': 'Palindrom değil', 'Tersten yazılışı': 'patik', 'İlk uyuşmazlık': 'baştan 1. karakter "k", sondan 1. karakter "p"' } },
    { in: { metin: 'Traş neden şart?' }, out: { 'Sonuç': 'Palindrom', 'Uzunluk': '13 karakter' } },
    { in: { metin: 'Para hazır ama Rıza harap' }, out: { 'Sonuç': 'Palindrom', 'Uzunluk': '21 karakter', 'Orta nokta': '"m" harfi (tek uzunluk)' } },
    { in: { metin: 'Anastas mum satsana' }, out: { 'Sonuç': 'Palindrom', 'Uzunluk': '17 karakter' } },
    { in: { metin: '12321' }, out: { 'Sonuç': 'Palindrom' } },
    { in: { metin: '02.02.2020' }, out: { 'Sonuç': 'Palindrom', 'Karşılaştırılan dizi': '02022020', 'Orta nokta': 'İki yarı arasında (çift uzunluk)' } },
    { in: { metin: 'Kayak', kip: 'birebir' }, out: { 'Sonuç': 'Palindrom değil' } },
    { in: { metin: 'kayak', kip: 'birebir' }, out: { 'Sonuç': 'Palindrom' } },
    { in: { metin: 'Işı' }, out: { 'Sonuç': 'Palindrom', 'Karşılaştırılan dizi': 'ışı' } },
    { in: { metin: 'kabare' }, out: { 'Sonuç': 'Palindrom değil', 'İlk uyuşmazlık': 'baştan 1. karakter "k", sondan 1. karakter "e"' } },
    { in: { metin: 'kayak\nkitap\nAt sahibi gibi hasta' }, out: { 'Palindrom sayısı': '2 / 3', '1. kayak': 'Palindrom', '2. kitap': 'Palindrom değil', '3. At sahibi gibi hasta': 'Palindrom' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '!!! ...' }, error: true },
  ],
  howto: [
    'Denetlemek istediğiniz kelimeyi, cümleyi ya da sayıyı kutuya yazın. Birkaç ifadeyi birden denetlemek için her birini ayrı satıra girin.',
    'Karşılaştırma biçimini seçin. Cümleler için "Yalnızca harf ve rakamlar" seçeneği uygundur; boşluklar, noktalama işaretleri ve büyük-küçük harf farkı dikkate alınmaz.',
    '"Kontrol et" düğmesine basın. İlk satırda ifadenin palindrom olup olmadığı yazar.',
    'Altındaki satırlardan karşılaştırılan harf dizisini, tersten yazılışını ve palindrom değilse ilk uyuşmayan harfleri inceleyin.',
  ],
  sections: [
    { h: 'Palindrom nedir?', p: [
      'Palindrom, baştan sona ve sondan başa okunduğunda aynı olan kelime, cümle ya da sayıdır. Terim, Yunancada "geri koşan" anlamına gelen bir sözcükten gelir. En yalın örnekler kısa kelimelerdir: <em>kayak</em>, <em>kabak</em>, <em>kazak</em>, <em>kütük</em>, <em>kepek</em>, <em>neden</em>, <em>yatay</em>, <em>küçük</em>, <em>ütü</em>, <em>iki</em>, <em>ama</em>, <em>mum</em>, <em>kek</em>, <em>sus</em>. Ece, Efe, Ada ve Anna gibi adlar da palindromdur.',
      'Cümle palindromlarında yerleşik kural, yalnızca harflerin dikkate alınmasıdır: boşluklar, noktalama işaretleri ve büyük-küçük harf farkı yok sayılır. Türkçenin bilinen palindrom cümleleri arasında şunlar vardır: <em>Ey Edip Adana\'da pide ye</em>, <em>At sahibi gibi hasta</em>, <em>Anastas mum satsana</em>, <em>Traş neden şart</em> ve <em>Para hazır ama Rıza harap</em>.',
    ] },
    { h: 'Denetim nasıl yapılır?', p: [
      'Araç önce metni karşılaştırmaya hazırlar. "Yalnızca harf ve rakamlar" kipinde bütün harfler küçültülür, harf ve rakam dışındaki her şey atılır ve geriye bitişik bir dizi kalır. Sonra bu dizinin ilk karakteri son karakterle, ikincisi sondan ikinciyle karşılaştırılır ve ortaya kadar böyle devam edilir. Bütün çiftler eşitse ifade palindromdur; ilk eşit olmayan çiftte denetim durur ve o konum bildirilir.',
      'Uzunluğu tek sayı olan palindromlarda tam ortada eşi olmayan bir harf bulunur ve simetri bu harfin çevresinde kurulur. Uzunluğu çift olanlarda ise iki yarı birbirinin ayna görüntüsüdür ve orta nokta iki harfin arasına düşer. Sonuçtaki "Orta nokta" satırı bunu gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> <code>Ey Edip Adana\'da pide ye</code> cümlesinde boşluklar ve kesme işareti atılıp harfler küçültüldüğünde <code>eyedipadanadapideye</code> dizisi elde edilir. Dizi 19 karakterdir ve tersten yazıldığında yine aynıdır; sonuç "Palindrom" çıkar. Tam ortadaki onuncu harf olan n, simetri eksenidir.',
      '<strong>Örnek 2:</strong> <code>kitap</code> kelimesinin tersten yazılışı <code>patik</code> olur. Daha ilk karşılaştırmada baştaki k ile sondaki p eşleşmediği için sonuç "Palindrom değil"dir. Burada güzel bir rastlantı var: kelime palindrom olmasa da tersten okunuşu anlamlı başka bir kelimedir.',
      '<strong>Örnek 3:</strong> <code>02.02.2020</code> tarihindeki noktalar atıldığında <code>02022020</code> kalır. Sekiz rakamlı bu dizi tersten de aynıdır; yani 2 Şubat 2020 gün-ay-yıl yazımıyla bir palindrom tarihtir.',
      '<strong>Örnek 4:</strong> <code>Kayak</code> kelimesi harf kipinde palindromdur. "Birebir" kipinde ise büyük K ile küçük k farklı karakter sayıldığı için sonuç "Palindrom değil" olur.',
    ] },
    { h: 'Türkçe harflerde dikkat edilecek nokta', p: [
      'Büyük-küçük harf farkını yok sayarken harflerin doğru eşleştirilmesi gerekir. Türkçede büyük I harfinin küçüğü noktasız ı, büyük İ harfinin küçüğü noktalı i\'dir. İngilizce kuralıyla çalışan bir denetleyici büyük I harfini i\'ye çevirir ve örneğin <code>Işı</code> yazımını "işı" olarak görüp palindrom saymaz. Bu araç Türkçe eşleştirmeyi kullanır; aynı girdi <code>ışı</code> olarak değerlendirilir ve palindrom bulunur.',
      'Aynı nedenle ı ile i, o ile ö, u ile ü, c ile ç, s ile ş ve g ile ğ birbirinin yerine geçmez; bunlar ayrı harflerdir. "Traş neden şart" cümlesinin palindrom olması, baştaki ve sondaki ş harflerinin birbirini karşılamasına bağlıdır. Şapkalı harfler de (â, î, û) şapkasız karşılıklarından ayrı tutulur.',
    ] },
    { h: 'Palindrom sayılar ve tarihler', p: [
      'Rakamları tersten de aynı okunan sayılara palindrom sayı denir: 11, 121, 1331, 12321 gibi. Tek basamaklı sayılar da tanım gereği palindromdur. Matematikte eğlenceli bir uğraş, bir sayıyı tersiyle toplayıp palindrom elde edilene kadar bunu yinelemektir: 57 + 75 = 132, 132 + 231 = 363 ve iki adımda bir palindroma ulaşılır.',
      'Tarihler de yazım biçimine bağlı olarak palindrom olabilir. Gün-ay-yıl düzeninde 22.02.2022 tarihi 22022022 olarak tersten de aynı okunur. Aynı tarih ay-gün-yıl ya da yıl-ay-gün düzeninde yazıldığında sonuç değişebilir; bu yüzden palindrom tarih listeleri ülkeden ülkeye farklılık gösterir. Araca tarihi hangi biçimde yazarsanız o biçim denetlenir.',
    ] },
    { h: 'Nerelerde karşımıza çıkar?', ul: [
      '<strong>Kelime oyunları ve bulmacalar:</strong> Palindrom bulmak ve yeni palindrom cümle kurmak sevilen bir dil oyunudur.',
      '<strong>Programlama eğitimi:</strong> Palindrom denetimi; dizgi işlemleri, döngüler ve iki işaretçi tekniğini öğretmek için kullanılan klasik bir alıştırmadır ve teknik mülakatlarda sıkça sorulur.',
      '<strong>Biyoloji:</strong> DNA dizilerinde de palindrom kavramı kullanılır; ancak oradaki tanım, bir zincirin karşı zincirin tersten okunuşuyla eşleşmesine dayanır ve bu araçtaki harf simetrisinden farklıdır.',
      '<strong>Edebiyat:</strong> Divan edebiyatında tersten de aynı okunan dize ve söz sanatları özel bir hüner sayılmıştır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç harf simetrisine bakar; ifadenin anlamlı olup olmadığını ya da sözlükte bulunup bulunmadığını denetlemez. "abba" gibi anlamsız bir dizi de palindrom olarak bildirilir. Hece ya da kelime düzeyinde simetri (kelimelerin sırası ters çevrildiğinde aynı kalan cümleler) ayrıca incelenmez. Çok satırlı girişte her satır kendi başına değerlendirilir ve tek seferde en fazla 200 satır denetlenir.',
    ] },
  ],
  faq: [
    ['Palindrom ne demek?', 'Palindrom, soldan sağa ve sağdan sola okunduğunda aynı olan kelime, cümle ya da sayıdır. "Kayak", "neden" ve 12321 birer palindromdur.'],
    ['Cümlelerde boşluklar ve noktalama sayılır mı?', 'Yerleşik kurala göre sayılmaz; yalnızca harfler karşılaştırılır. Araç varsayılan kipte boşlukları, noktalama işaretlerini ve büyük-küçük harf farkını yok sayar. Her karakterin birebir eşleşmesini isterseniz "Birebir" kipini seçebilirsiniz.'],
    ['En bilinen Türkçe palindrom cümleler hangileridir?', '"Ey Edip Adana\'da pide ye", "At sahibi gibi hasta", "Anastas mum satsana", "Traş neden şart" ve "Para hazır ama Rıza harap" en çok bilinen örneklerdir. Hepsini araca yazıp doğrulayabilirsiniz.'],
    ['Tek harfli bir kelime palindrom mudur?', 'Evet. Tek karakterlik bir dizi tersten de kendisine eşittir, bu yüzden tanım gereği palindrom sayılır. Aynı durum tek basamaklı sayılar için de geçerlidir.'],
    ['Sayıları ve tarihleri de denetleyebilir miyim?', 'Evet. Rakamlar harfler gibi karşılaştırılır; nokta, eğik çizgi ve boşluk gibi ayırıcılar yok sayılır. 1331 ya da 22.02.2022 yazarak deneyebilirsiniz. Tarihlerde sonuç, kullandığınız yazım düzenine bağlıdır.'],
    ['"Palindrom değil" çıktı ama bana palindrom gibi geliyor, neden?', '"İlk uyuşmazlık" satırına bakın; hangi iki harfin eşleşmediği orada yazar. Çoğunlukla neden ı ile i, s ile ş gibi benzer görünen ama ayrı olan harflerdir ya da cümlede fazladan bir harf vardır.'],
    ['Birden fazla kelimeyi aynı anda denetleyebilir miyim?', 'Evet. Her ifadeyi ayrı satıra yazın. Araç her satır için ayrı sonuç verir ve en üstte kaç satırın palindrom olduğunu özetler.'],
    ['Yazdıklarım bir sunucuya gönderiliyor mu?', 'Hayır. Denetim tarayıcınızda yapılır; yazdığınız metin hiçbir yere iletilmez ve saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['metni-ters-cevir', 'anagram-kontrol', 'kelime-bulucu', 'harf-frekansi', 'kelimeleri-ters-cevir'],
};
