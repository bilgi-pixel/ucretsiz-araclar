export default {
  slug: 'isim-numerolojisi-hesapla',
  title: 'İsim Numerolojisi Hesaplama',
  h1Tail: 'ifade, ruh ve kişilik sayısı',
  pageTitle: "İsim Numerolojisi Hesaplama – Adınızın Sayı Değerini Bulun",
  description: "Adınızı yazın; Pisagor numerolojisine göre ifade (kader), ruh güdüsü ve kişilik sayınızı harf harf dökümüyle hesaplayın. Türkçe harfler desteklenir, eğlence amaçlıdır.",
  card: "Adınızı ve soyadınızı yazın; Pisagor yöntemiyle ifade, ruh güdüsü ve kişilik sayınızı harf dökümüyle görün.",
  category: 'gunluk',
  keywords: ['isim numerolojisi hesaplama', 'isim sayısı hesaplama', 'numeroloji isim analizi', 'kader sayısı hesaplama', 'ruh güdüsü sayısı', 'pisagor numerolojisi', 'ismin sayısal değeri'],
  lead: "Numerolojide her harfin 1 ile 9 arasında bir sayı değeri vardır ve bir ismin harfleri toplanarak tek bir sayıya indirgenir. Adınızı yazın; araç <strong>ifade (kader), ruh güdüsü ve kişilik sayılarını</strong> Pisagor yöntemiyle, harf harf dökümünü göstererek hesaplasın. Sonuçlar eğlence ve merak amaçlıdır.",
  button: 'Hesapla',
  inputs: [
    { id: 'isim', label: 'Ad ve soyad', type: 'text', placeholder: 'Örn. Zeynep Yılmaz', wide: true },
  ],
  compute(v, h) {
    const DEGER = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8 };
    const TR = { 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U', 'Â': 'A', 'Î': 'I', 'Û': 'U' };
    const UNLU = 'AEIOU';
    const ANLAM = {
      1: 'öncülük, bağımsızlık, girişkenlik', 2: 'uyum, iş birliği, duyarlılık', 3: 'yaratıcılık, ifade, neşe',
      4: 'düzen, emek, güvenilirlik', 5: 'özgürlük, değişim, merak', 6: 'sorumluluk, şefkat, aile',
      7: 'araştırma, iç gözlem, bilgelik', 8: 'güç, yönetim, maddi başarı', 9: 'yardımseverlik, idealizm, tamamlanma',
      11: 'sezgi, ilham (usta sayı)', 22: 'büyük hedefler, kuruculuk (usta sayı)', 33: 'öğreticilik, özveri (usta sayı)',
    };
    const indir = (n) => {
      while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = String(n).split('').reduce((a, c) => a + Number(c), 0);
      return n;
    };
    const ham = String(v.isim || '').trim();
    if (ham === '') h.err('Bir ad yazın (örn. Ayşe Demir).');
    if (ham.length > 100) h.err('Ad en fazla 100 karakter olabilir.');
    let top = 0, unlu = 0, unsuz = 0, adet = 0;
    const dokum = [];
    for (const ch of ham) {
      if (/[\s.\-']/.test(ch)) { if (/\s/.test(ch) && dokum.length && dokum[dokum.length - 1] !== '|') dokum.push('|'); continue; }
      let b = ch.toUpperCase();
      if (TR[b]) b = TR[b];
      const d = DEGER[b];
      if (!d) h.err('Ad yalnızca harflerden oluşmalı; "' + ch + '" karakteri hesaplanamaz.');
      top += d; adet++;
      if (UNLU.includes(b)) unlu += d; else unsuz += d;
      dokum.push(ch.toLocaleUpperCase('tr-TR') + '=' + d);
    }
    if (!adet) h.err('Ad en az bir harf içermeli.');
    const ifade = indir(top);
    const yaz = (ham2, son) => (ham2 === son ? String(son) : ham2 + ' → ' + son);
    return {
      rows: [
        ['İfade (kader) sayısı', String(ifade)],
        ['Ruh güdüsü sayısı (ünlüler)', yaz(unlu, indir(unlu))],
        ['Kişilik sayısı (ünsüzler)', yaz(unsuz, indir(unsuz))],
        ['Harf toplamı', String(top)],
        ['Harf sayısı', String(adet)],
        ['Anahtar kelimeler', ANLAM[ifade]],
      ],
      text: dokum.join(' ').replace(/ \| /g, '  |  ').replace(/ \|$/, ''),
      note: 'Pisagor (Batı) numerolojisi kullanılır; Ç, Ğ, İ, Ö, Ş, Ü harfleri C, G, I, O, S, U ile aynı değeri alır. 11, 22 ve 33 usta sayı sayılır ve indirgenmez. Eğlence amaçlıdır; bilimsel bir dayanağı yoktur.',
    };
  },
  cases: [
    { in: { isim: 'Ali' }, out: { 'İfade (kader) sayısı': '4', 'Ruh güdüsü sayısı (ünlüler)': '10 → 1', 'Kişilik sayısı (ünsüzler)': '3', 'Harf toplamı': '13', 'Harf sayısı': '3' }, text: 'A=1 L=3 İ=9' },
    { in: { isim: 'Zeynep Yılmaz' }, out: { 'İfade (kader) sayısı': '6', 'Ruh güdüsü sayısı (ünlüler)': '20 → 2', 'Kişilik sayısı (ünsüzler)': '49 → 4', 'Harf toplamı': '69', 'Harf sayısı': '12' } },
    { in: { isim: 'AYŞE' }, out: { 'İfade (kader) sayısı': '5', 'Ruh güdüsü sayısı (ünlüler)': '6', 'Kişilik sayısı (ünsüzler)': '8', 'Harf toplamı': '14' } },
    { in: { isim: 'mehmet' }, out: { 'İfade (kader) sayısı': '1', 'Ruh güdüsü sayısı (ünlüler)': '10 → 1', 'Kişilik sayısı (ünsüzler)': '18 → 9', 'Harf toplamı': '28' } },
    { in: { isim: 'Alp' }, out: { 'İfade (kader) sayısı': '11', 'Ruh güdüsü sayısı (ünlüler)': '1', 'Kişilik sayısı (ünsüzler)': '10 → 1', 'Anahtar kelimeler': 'sezgi, ilham (usta sayı)' } },
    { in: { isim: '' }, error: true },
    { in: { isim: 'Ali 123' }, error: true },
    { in: { isim: ' - ' }, error: true },
  ],
  howto: [
    'Kutunun içine hesaplamak istediğiniz adı yazın. Yalnızca adınızı ya da adınızla soyadınızı birlikte girebilirsiniz.',
    'Türkçe harfleri olduğu gibi yazın; büyük ya da küçük harf kullanmanız sonucu değiştirmez.',
    '"Hesapla" düğmesine basın. İlk satır ismin ifade (kader) sayısını verir.',
    'Sonuç kutusundaki harf dökümünden her harfin hangi sayıya karşılık geldiğini izleyin ve toplamı kendiniz de doğrulayın.',
    'Farklı yazımları (göbek adıyla, evlilik soyadıyla, kısaltılmış adla) ayrı ayrı deneyerek sayıların nasıl değiştiğini karşılaştırın.',
  ],
  sections: [
    { h: 'İsim numerolojisi nasıl hesaplanır?', p: [
      "En yaygın yöntem olan Pisagor (Batı) numerolojisinde alfabe 1'den 9'a kadar sırayla numaralanır ve dokuzuncu harften sonra yeniden 1'e dönülür. Böylece A, J ve S harfleri 1; B, K ve T harfleri 2; C, L ve U harfleri 3; D, M ve V harfleri 4; E, N ve W harfleri 5; F, O ve X harfleri 6; G, P ve Y harfleri 7; H, Q ve Z harfleri 8; I ve R harfleri 9 değerini alır.",
      "İsimdeki tüm harflerin değerleri toplanır ve çıkan sayı, rakamları toplanarak tek basamağa indirgenir. Örneğin 69, 6 + 9 = 15, ardından 1 + 5 = 6 olur. İndirgeme sırasında 11, 22 ya da 33 elde edilirse durulur; bu sayılar numerolojide <strong>usta sayılar</strong> olarak adlandırılır ve tek basamağa indirilmez.",
    ] },
    { h: 'Türkçe harfler nasıl değerlendirilir?', p: [
      "Pisagor tablosu 26 harfli Latin alfabesine göre düzenlenmiştir; Türkçeye özgü harfler tabloda yer almaz. Yaygın uygulama, bu harfleri noktasız ya da çengelsiz karşılıklarıyla eşlemektir. Araç da böyle çalışır: <strong>Ç → C (3), Ğ → G (7), İ → I (9), Ö → O (6), Ş → S (1), Ü → U (3)</strong>. Noktalı ve noktasız I aynı değeri, 9'u alır. Şapkalı harfler (â, î, û) şapkasız karşılıklarıyla hesaplanır.",
      "Bazı kaynaklar 29 harfli Türk alfabesini baştan sıralayarak farklı bir tablo kullanır; o yöntemle çıkan sayılar buradakilerle aynı olmayabilir. Hangi tablonun kullanıldığını bilmek, farklı yerlerde gördüğünüz sonuçları karşılaştırırken önemlidir.",
    ] },
    { h: 'Üç temel isim sayısı', ul: [
      "<strong>İfade (kader) sayısı:</strong> İsimdeki bütün harflerin toplamından elde edilir. Numerolojide kişinin yeteneklerini ve hayattaki genel yönelimini simgelediği söylenir.",
      "<strong>Ruh güdüsü sayısı:</strong> Yalnızca ünlü harflerin (A, E, I, İ, O, Ö, U, Ü) toplamıdır. İç dünyadaki istekleri ve motivasyonu temsil ettiğine inanılır.",
      "<strong>Kişilik sayısı:</strong> Yalnızca ünsüz harflerin toplamıdır. Kişinin dışarıdan nasıl göründüğünü, ilk izlenimi anlattığı kabul edilir. Araç Y harfini her zaman ünsüz sayar.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "'Zeynep Yılmaz' adını ele alalım. Zeynep: Z=8, E=5, Y=7, N=5, E=5, P=7; toplam 37. Yılmaz: Y=7, I=9, L=3, M=4, A=1, Z=8; toplam 32. İki kelimenin toplamı 37 + 32 = 69'dur. İndirgeme: 6 + 9 = 15, 1 + 5 = <strong>6</strong>. İfade sayısı 6'dır.",
      "Ünlüler E, E, I ve A'dır: 5 + 5 + 9 + 1 = 20, indirgenince 2. Bu, ruh güdüsü sayısıdır. Ünsüzlerin toplamı 69 − 20 = 49'dur; 4 + 9 = 13, 1 + 3 = 4. Kişilik sayısı 4 çıkar. Aracın sonucunda bu değerleri '20 → 2' ve '49 → 4' biçiminde, ham toplamla birlikte görürsünüz.",
      "Usta sayıya örnek olarak 'Alp' adı verilebilir: A=1, L=3, P=7; toplam 11. Bu sayı indirgenmeden 11 olarak bırakılır.",
    ] },
    { h: 'Sayıların geleneksel anlamları', ul: [
      '<strong>1:</strong> öncülük, bağımsızlık, girişkenlik',
      '<strong>2:</strong> uyum, iş birliği, duyarlılık',
      '<strong>3:</strong> yaratıcılık, ifade, neşe',
      '<strong>4:</strong> düzen, emek, güvenilirlik',
      '<strong>5:</strong> özgürlük, değişim, merak',
      '<strong>6:</strong> sorumluluk, şefkat, aile',
      '<strong>7:</strong> araştırma, iç gözlem, bilgelik',
      '<strong>8:</strong> güç, yönetim, maddi başarı',
      '<strong>9:</strong> yardımseverlik, idealizm, tamamlanma',
      '<strong>11, 22, 33:</strong> usta sayılar; sırasıyla sezgi, kuruculuk ve öğreticilik temalarıyla anılır',
    ] },
    { h: 'Hangi isim yazılmalı?', p: [
      "Numeroloji geleneğinde ifade sayısı için çoğunlukla nüfus kaydındaki tam ad (bütün adlar ve soyad) kullanılır. Günlük hayatta kullanılan kısa ad, takma ad ya da evlilikle değişen soyad için ayrı hesap yapılabilir; bunlar çoğu zaman farklı sayılar verir. Araç yazdığınız metni olduğu gibi hesaplar; boşluk, tire, nokta ve kesme işareti yok sayılır, rakam ya da başka simgeler ise hata verir.",
      "Toplama yöntemi de sonucu etkileyebilir: araç tüm harfleri bir arada toplayıp sonra indirger. Her kelimeyi ayrı indirgeyip sonra toplayan yöntem çoğu isimde aynı tek basamaklı sonucu verir, ancak usta sayıların ortaya çıkıp çıkmaması yönteme göre değişebilir.",
    ] },
    { h: 'Önemli not: eğlence amaçlıdır', p: [
      "Numeroloji bir inanç ve eğlence geleneğidir; harflerin sayı değerleri ile kişilik ya da gelecek arasında bilimsel olarak gösterilmiş bir bağ yoktur. Bu araç yalnızca aritmetik işlemi doğru ve şeffaf biçimde yapar. Çocuğa isim koyma, iş kurma, ilişki ya da sağlık gibi kararları bu sayılara dayandırmayın; sonuçları keyifli bir sohbet konusu olarak değerlendirin.",
    ] },
  ],
  faq: [
    ['İsim numerolojisi nedir?', 'Bir ismin harflerine sayı değerleri verip bu değerleri toplayarak tek bir sayıya ulaşma yöntemidir. Elde edilen sayının kişinin özelliklerini simgelediğine inanılır; bilimsel bir dayanağı yoktur, eğlence amaçlı kullanılır.'],
    ['Ş, Ç, Ğ, Ö, Ü harfleri hangi sayıya denk gelir?', 'Araç bu harfleri Latin karşılıklarıyla eşler: Ş 1 (S gibi), Ç 3 (C gibi), Ğ 7 (G gibi), Ö 6 (O gibi), Ü 3 (U gibi). I ve İ harflerinin ikisi de 9 değerini alır.'],
    ['Usta sayı ne demek?', 'Toplam 11, 22 ya da 33 çıktığında bu sayılar tek basamağa indirgenmez ve usta sayı olarak adlandırılır. Numeroloji geleneğinde bunlara özel bir anlam yüklenir.'],
    ['Sadece adımı mı, soyadımla birlikte mi yazmalıyım?', 'Geleneksel yöntem doğumda verilen tam adı kullanır. Ancak yalnızca adınızı ya da günlük kullandığınız adı da hesaplayabilirsiniz; araç yazdığınız her şeyi hesaba katar.'],
    ['Büyük ya da küçük harf sonucu değiştirir mi?', 'Hayır. Tüm harfler hesaplamadan önce büyük harfe çevrilir; "ali", "Ali" ve "ALİ" aynı sonucu verir.'],
    ['İfade sayısı ile yaşam yolu sayısı aynı şey mi?', 'Hayır. İfade sayısı isimden, yaşam yolu sayısı doğum tarihinden hesaplanır. Yaşam yolu sayısı için doğum tarihiyle çalışan ayrı aracı kullanabilirsiniz.'],
    ['Başka bir sitede farklı sayı çıktı, neden?', 'Büyük olasılıkla farklı bir harf tablosu (örneğin 29 harfli Türk alfabesine göre sıralama ya da Keldani yöntemi) veya farklı bir indirgeme kuralı kullanılmıştır. Bu sayfadaki harf dökümünden hesabı adım adım denetleyebilirsiniz.'],
    ['Yazdığım isim kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdığınız ad sunucuya gönderilmez ve hiçbir yerde saklanmaz.'],
  ],
  related: ['yasam-yolu-sayisi-hesapla', 'dogum-tasi-bul', 'iki-zar-olasilik-hesapla', 'satranc-elo-hesapla'],
};
