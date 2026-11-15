export default {
  slug: 'sesli-sessiz-harf-sayaci',
  title: 'Sesli ve Sessiz Harf Sayacı',
  h1Tail: 'ünlü ve ünsüz sayımı',
  pageTitle: 'Sesli ve Sessiz Harf Sayacı – Ünlü ve Ünsüz Harf Sayma',
  description: 'Metindeki sesli (ünlü) ve sessiz (ünsüz) harfleri sayın. Kalın-ince, düz-yuvarlak ünlü dağılımını, oranları ve her ünlünün kaç kez geçtiğini görün.',
  card: 'Metindeki ünlü ve ünsüz harfleri sayın; kalın, ince, düz ve yuvarlak ünlü dağılımını tek tıkla görün.',
  category: 'metin',
  keywords: ['sesli harf sayacı', 'sessiz harf sayma', 'ünlü harf sayısı', 'ünsüz harf sayısı', 'sesli harfler nelerdir', 'kalın ince ünlü', 'harf sayma aracı', 'ünlü ünsüz bulma'],
  lead: `Bir kelimeyi, cümleyi ya da uzun bir metni yapıştırın; araç içindeki <strong>sesli (ünlü)</strong> ve <strong>sessiz (ünsüz)</strong> harfleri Türk alfabesine göre saysın. Ünlülerin kalın-ince ve düz-yuvarlak dağılımı ile her ünlünün adedi de ayrıca listelenir.`,
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Sayılacak metni buraya yazın ya da yapıştırın' },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '');
    if (ham.trim() === '') h.err('"Metin" alanına sayılacak metni yazın.');
    const t = ham.normalize('NFC').toLocaleLowerCase('tr');
    const temel = { 'â': 'a', 'î': 'i', 'û': 'u' };
    const unluler = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'];
    const adet = Object.fromEntries(unluler.map((u) => [u, 0]));
    let unlu = 0, unsuz = 0, rakam = 0, bosluk = 0, diger = 0;
    for (const c0 of Array.from(t)) {
      const c = temel[c0] || c0;
      if (c in adet) { adet[c]++; unlu++; }
      else if (/\p{L}/u.test(c)) unsuz++;
      else if (/\p{Nd}/u.test(c)) rakam++;
      else if (/\s/.test(c)) bosluk++;
      else diger++;
    }
    const harf = unlu + unsuz;
    if (harf === 0) h.err('Metinde harf bulunamadı. Sayım için en az bir harf içeren metin yazın.');
    const kalin = adet.a + adet['ı'] + adet.o + adet.u;
    const ince = adet.e + adet.i + adet['ö'] + adet['ü'];
    const duz = adet.a + adet.e + adet['ı'] + adet.i;
    const yuvarlak = adet.o + adet['ö'] + adet.u + adet['ü'];
    return {
      rows: [
        ['Sesli harf (ünlü)', String(unlu)],
        ['Sessiz harf (ünsüz)', String(unsuz)],
        ['Toplam harf', String(harf)],
        ['Sesli harf oranı', '%' + h.fmt(unlu / harf * 100, 1)],
        ['Sessiz harf oranı', '%' + h.fmt(unsuz / harf * 100, 1)],
        ['Kalın ünlü (a, ı, o, u)', String(kalin)],
        ['İnce ünlü (e, i, ö, ü)', String(ince)],
        ['Düz ünlü (a, e, ı, i)', String(duz)],
        ['Yuvarlak ünlü (o, ö, u, ü)', String(yuvarlak)],
        ['Ünlülerin dağılımı', unluler.map((u) => `${u}: ${adet[u]}`).join(' · ')],
        ['Rakam', String(rakam)],
        ['Boşluk ve satır sonu', String(bosluk)],
        ['Noktalama ve diğer', String(diger)],
      ],
      note: 'Şapkalı â, î, û harfleri a, i, u ile birlikte sayılır. Türk alfabesinde bulunmayan q, w, x gibi harfler sessiz harf kabul edilir.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba Dünya' }, out: { 'Sesli harf (ünlü)': '5', 'Sessiz harf (ünsüz)': '7', 'Toplam harf': '12', 'Sesli harf oranı': '%41,7', 'Kalın ünlü (a, ı, o, u)': '3', 'İnce ünlü (e, i, ö, ü)': '2', 'Boşluk ve satır sonu': '1' } },
    { in: { metin: 'İstanbul' }, out: { 'Sesli harf (ünlü)': '3', 'Sessiz harf (ünsüz)': '5', 'Ünlülerin dağılımı': 'a: 1 · e: 0 · ı: 0 · i: 1 · o: 0 · ö: 0 · u: 1 · ü: 0' } },
    { in: { metin: 'IŞIK' }, out: { 'Sesli harf (ünlü)': '2', 'Sessiz harf (ünsüz)': '2', 'Kalın ünlü (a, ı, o, u)': '2', 'İnce ünlü (e, i, ö, ü)': '0', 'Sesli harf oranı': '%50' } },
    { in: { metin: 'öğretmen' }, out: { 'Sesli harf (ünlü)': '3', 'Sessiz harf (ünsüz)': '5', 'Yuvarlak ünlü (o, ö, u, ü)': '1', 'Düz ünlü (a, e, ı, i)': '2' } },
    { in: { metin: 'Kâğıt 2 TL!' }, out: { 'Sesli harf (ünlü)': '2', 'Sessiz harf (ünsüz)': '5', 'Rakam': '1', 'Noktalama ve diğer': '1', 'Boşluk ve satır sonu': '2' } },
    { in: { metin: 'aeıioöuü' }, out: { 'Sesli harf (ünlü)': '8', 'Sessiz harf (ünsüz)': '0', 'Sesli harf oranı': '%100', 'Kalın ünlü (a, ı, o, u)': '4', 'Yuvarlak ünlü (o, ö, u, ü)': '4' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '12345 !?' }, error: true },
  ],
  howto: [
    `Saymak istediğiniz kelimeyi, cümleyi ya da paragrafı "Metin" kutusuna yazın veya başka bir yerden kopyalayıp yapıştırın.`,
    `"Say" düğmesine basın. İlk üç satırda sesli harf, sessiz harf ve toplam harf sayısını görürsünüz.`,
    `Oran satırlarından metnin yüzde kaçının ünlü, yüzde kaçının ünsüz olduğunu okuyun.`,
    `Kalın-ince ve düz-yuvarlak satırlarıyla "Ünlülerin dağılımı" satırını dil bilgisi ödevlerinde ünlü uyumu incelemek için kullanın.`,
    `Sonuçları "Sonucu kopyala" düğmesiyle panoya alıp ödevinize ya da notlarınıza yapıştırabilirsiniz.`,
  ],
  sections: [
    { h: 'Türkçede sesli ve sessiz harfler', p: [
      `Türk alfabesinde 29 harf bulunur. Bunların sekizi sesli, yirmi biri sessiz harftir. Dil bilgisinde sesli harflere <strong>ünlü</strong>, sessiz harflere <strong>ünsüz</strong> denir. Ünlüler ağızdan çıkarken hiçbir engele takılmayan, tek başına hece kurabilen seslerdir. Ünsüzler ise dil, diş, dudak ya da damak gibi bir engelden geçerek çıkar ve ancak bir ünlünün yardımıyla söylenebilir.`,
    ], ul: [
      `<strong>Sesli harfler (8):</strong> a, e, ı, i, o, ö, u, ü`,
      `<strong>Sessiz harfler (21):</strong> b, c, ç, d, f, g, ğ, h, j, k, l, m, n, p, r, s, ş, t, v, y, z`,
    ] },
    { h: 'Ünlülerin sınıflandırılması', p: [
      `Okullarda ünlüler üç özelliğe göre gruplanır. Dilin durumuna göre <strong>kalın</strong> (a, ı, o, u) ve <strong>ince</strong> (e, i, ö, ü) ünlüler vardır. Dudakların durumuna göre <strong>düz</strong> (a, e, ı, i) ve <strong>yuvarlak</strong> (o, ö, u, ü) ünlüler ayrılır. Ağzın açıklığına göre de geniş (a, e, o, ö) ve dar (ı, i, u, ü) ünlülerden söz edilir.`,
      `Araç ilk iki sınıflandırmayı ayrı satırlarda verir, çünkü büyük ünlü uyumu kalınlık-incelik, küçük ünlü uyumu ise düzlük-yuvarlaklık üzerinden incelenir. Geniş ve dar ünlü sayısını da "Ünlülerin dağılımı" satırındaki adetleri toplayarak kolayca bulabilirsiniz.`,
    ] },
    { h: 'Çözümlü örnek: Merhaba Dünya', p: [
      `"Merhaba Dünya" ifadesini harf harf ayıralım. Merhaba kelimesinde m, e, r, h, a, b, a harfleri; Dünya kelimesinde d, ü, n, y, a harfleri bulunur. Ünlüler e, a, a, ü, a olmak üzere <strong>5</strong> tanedir. Ünsüzler m, r, h, b, d, n, y olmak üzere <strong>7</strong> tanedir. Toplam 12 harf vardır ve aradaki boşluk harf sayılmaz.`,
      `Sesli harf oranı 5 ÷ 12 = 0,4167, yani yaklaşık %41,7 çıkar. Ünlülerin üçü kalın (üç tane a), ikisi incedir (e ve ü). Bir kelimede hem kalın hem ince ünlü bulunması, o kelimenin büyük ünlü uyumuna uymadığını gösterir; merhaba bu yüzden uyuma aykırı bir kelimedir. Aracı tek kelimeyle çalıştırıp kalın ve ince ünlü satırlarına bakarak bu denetimi hızlıca yapabilirsiniz: satırlardan biri sıfırsa kelime büyük ünlü uyumuna uygundur.`,
    ] },
    { h: 'Büyük I ve İ nasıl sayılır?', p: [
      `Türkçede noktasız ı harfinin büyüğü I, noktalı i harfinin büyüğü İ biçiminde yazılır. Araç metni Türkçe kurallarla küçülttüğü için "IŞIK" kelimesindeki iki I harfi noktasız ı olarak, yani kalın ünlü olarak sayılır. "İstanbul" kelimesinin başındaki İ ise ince ünlü i olarak sayılır. Büyük harflerle yazılmış başlıklarda ve tabela metinlerinde sayımın doğru çıkması bu ayrıma bağlıdır.`,
      `Bunun bir yan etkisi vardır: tamamı büyük harfle yazılmış İngilizce bir metindeki I harfleri de ı sayılır. Toplam ünlü sayısı değişmez, yalnızca dağılım satırında i yerine ı artar. İngilizce metinleri küçük harfle yapıştırırsanız dağılım da doğru görünür.`,
    ] },
    { h: 'Şapkalı harfler, yabancı harfler ve y harfi', p: [
      `Düzeltme işaretli â, î ve û harfleri ayrı birer alfabe harfi değildir; a, i ve u ünlülerinin işaretli yazımıdır. Araç bunları ilgili ünlüyle birlikte sayar. "Kâğıt" kelimesinde bu yüzden iki ünlü (â ve ı) ile üç ünsüz (k, ğ, t) bulunur.`,
      `Türk alfabesinde yer almayan q, w ve x harfleri ünsüz kabul edilir. İngilizcede bazı kelimelerde ünlü gibi davranan y harfi Türkçede her zaman ünsüzdür ve araçta da öyle sayılır. Başka dillere ait é, ñ, ß gibi harfler de ünsüz sütununa yazılır; bu nedenle araç en doğru sonucu Türkçe metinlerde verir.`,
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      `İlkokul ve ortaokul Türkçe derslerinde ünlü-ünsüz sayma, ünlü uyumu ve hece çalışmaları`,
      `Kelime oyunları, bulmaca hazırlığı ve isim-şehir benzeri etkinlikler`,
      `Bebek ismi, marka adı ya da kullanıcı adı seçerken ünlü-ünsüz dengesine bakmak`,
      `Dil öğrenenler için Türkçe metinlerin ses yapısını incelemek`,
      `Şiir ve şarkı sözü yazarken ses tekrarlarını (asonans, aliterasyon) kabaca ölçmek`,
    ] },
    { h: 'Sayımın sınırları', p: [
      `Araç harfleri yazıldıkları gibi sayar; okunuşu dikkate almaz. Yumuşak g (ğ) söyleyişte çoğu zaman önceki ünlüyü uzatsa da yazıda bir ünsüzdür ve ünsüz olarak sayılır. Rakamlar, boşluklar ve noktalama işaretleri harf toplamına katılmaz, ayrı satırlarda gösterilir. Hece sayısı ayrıca verilmez; ancak Türkçe kelimelerde hece sayısı ünlü sayısına eşit olduğundan sesli harf satırı aynı zamanda yaklaşık hece sayısını verir.`,
    ] },
  ],
  faq: [
    [`Türkçede kaç sesli harf vardır?`, `Sekiz sesli harf vardır: a, e, ı, i, o, ö, u, ü. Geriye kalan yirmi bir harf sessizdir. Toplam 29 harf eder.`],
    [`Ünlü ve sesli harf aynı şey mi?`, `Evet. Dil bilgisi terimi olarak ünlü, gündelik dilde sesli harf denir. Aynı şekilde ünsüz ile sessiz harf de aynı anlama gelir.`],
    [`Ğ harfi sesli mi sessiz mi?`, `Yumuşak g bir sessiz (ünsüz) harftir. Kelime başında bulunmaz ve söyleyişte çoğunlukla önündeki ünlüyü uzatır, ama yazıda ünsüz olarak sayılır.`],
    [`Kalın ve ince ünlüler hangileridir?`, `Kalın ünlüler a, ı, o, u; ince ünlüler e, i, ö, ü harfleridir. Bir kelimenin bütün ünlüleri kalınsa ya da bütün ünlüleri inceyse o kelime büyük ünlü uyumuna uyar.`],
    [`Şapkalı harfler nasıl sayılıyor?`, `â harfi a ile, î harfi i ile, û harfi u ile birlikte sayılır. Dağılım satırında ayrı bir sütun açılmaz.`],
    [`Boşluklar ve noktalama işaretleri harf sayısına dahil mi?`, `Hayır. Yalnızca harfler ünlü ve ünsüz olarak sayılır. Rakamlar, boşluklar ve noktalama işaretleri sonuç kutusunun alt satırlarında ayrı ayrı gösterilir.`],
    [`Kelimenin hece sayısını buradan bulabilir miyim?`, `Türkçede her hecede bir ünlü bulunur, bu yüzden sesli harf sayısı hece sayısına eşittir. Tek kelime yazdığınızda "Sesli harf" satırı o kelimenin hece sayısını verir.`],
    [`Yapıştırdığım metin bir yere gönderiliyor mu?`, `Hayır. Sayım tarayıcınızda yapılır; metin sunucuya iletilmez, kaydedilmez. Sayfayı kapattığınızda yazdıklarınız silinir.`],
  ],
  related: ['harf-frekansi', 'karakter-sayaci', 'kelime-sayaci', 'turkce-alfabe-sirasi', 'palindrom-kontrol'],
};
