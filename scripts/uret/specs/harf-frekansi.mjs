export default {
  slug: 'harf-frekansi',
  title: 'Harf Frekansı Analizi',
  h1Tail: 'hangi harf kaç kez geçiyor?',
  pageTitle: 'Harf Frekansı Analizi – Metinde Hangi Harf Kaç Kez Geçiyor?',
  description: 'Metninizdeki her harfin kaç kez geçtiğini ve yüzde oranını bulun. Türkçe I-ı, İ-i ayrımına uygun sayım; sıklığa ya da alfabe sırasına göre kopyalanabilir tablo.',
  card: 'Metindeki her harfin kaç kez geçtiğini ve yüzdesini bulun; Türkçe ı-i ayrımına uygun, sıklık ya da alfabe sırasıyla.',
  category: 'metin',
  keywords: ['harf frekansı', 'harf sıklığı analizi', 'harf sayma', 'hangi harf kaç tane', 'en çok kullanılan harf', 'harf dağılımı', 'frekans analizi', 'türkçe harf sıklığı'],
  lead: 'Bir metinde <strong>hangi harfin kaç kez geçtiğini</strong> sayın ve her harfin toplam içindeki payını yüzde olarak görün. Sayım Türkçe alfabeye uygundur: büyük I küçük ı ile, büyük İ küçük i ile birleştirilir; ç, ğ, ö, ş, ü ayrı harfler olarak ele alınır.',
  button: 'Analiz et',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Analiz edilecek metni yapıştırın', rows: 8 },
    { id: 'harf', label: 'Büyük-küçük harf', type: 'select', options: [['birlestir', 'Birleştir (A = a)'], ['ayir', 'Ayrı say']] },
    { id: 'kapsam', label: 'Sayılacak karakterler', type: 'select', options: [['harf', 'Yalnızca harfler'], ['rakam', 'Harfler ve rakamlar']] },
    { id: 'sira', label: 'Sıralama', type: 'select', options: [['siklik', 'En sık geçenden başla'], ['alfabe', 'Alfabe sırası']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Analiz edilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const rakamDahil = v.kapsam === 'rakam';
    const sayac = new Map();
    let toplam = 0;
    for (const c of metin.normalize('NFC')) {
      const harfMi = /\p{L}/u.test(c);
      if (!harfMi && !(rakamDahil && /\p{Nd}/u.test(c))) continue;
      let k = c;
      if (harfMi && v.harf !== 'ayir') k = c === 'I' ? 'ı' : c === 'İ' ? 'i' : c.toLowerCase();
      sayac.set(k, (sayac.get(k) || 0) + 1);
      toplam++;
    }
    if (!toplam) h.err(rakamDahil ? 'Metinde harf ya da rakam bulunamadı.' : 'Metinde harf bulunamadı; harf içeren bir metin yazın ya da rakamları da saymayı seçin.');
    const sikSirali = [...sayac.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'tr'));
    const liste = v.sira === 'alfabe' ? [...sayac.entries()].sort((a, b) => a[0].localeCompare(b[0], 'tr') || (a[0] < b[0] ? -1 : 1)) : sikSirali;
    const yuzde = (n) => '%' + h.fmt((n / toplam) * 100, 1);
    const enCok = sikSirali[0], enAz = sikSirali[sikSirali.length - 1];
    const rows = [
      [rakamDahil ? 'Toplam harf ve rakam' : 'Toplam harf', h.fmt(toplam, 0)],
      [rakamDahil ? 'Farklı karakter' : 'Farklı harf', h.fmt(sayac.size, 0)],
      ['En sık', `${enCok[0]} (${h.fmt(enCok[1], 0)} kez)`],
      ['En seyrek', `${enAz[0]} (${h.fmt(enAz[1], 0)} kez)`],
    ];
    liste.slice(0, 100).forEach(([k, n]) => rows.push([k, `${h.fmt(n, 0)} kez (${yuzde(n)})`]));
    return {
      rows,
      text: ['Harf\tAdet\tYüzde'].concat(liste.map(([k, n]) => `${k}\t${n}\t${yuzde(n)}`)).join('\n'),
      note: 'Boşluk ve noktalama işaretleri sayılmaz; yüzdeler sayılan karakterlerin toplamına göredir.',
    };
  },
  cases: [
    { in: { metin: 'Ankara' }, out: { 'Toplam harf': '6', 'Farklı harf': '4', 'En sık': 'a (3 kez)', 'a': '3 kez (%50)', 'k': '1 kez (%16,7)' } },
    { in: { metin: 'ISPARTA ısı' }, out: { 'Toplam harf': '10', 'Farklı harf': '6', 'En sık': 'ı (3 kez)', 'ı': '3 kez (%30)', 's': '2 kez (%20)', 'a': '2 kez (%20)' } },
    { in: { metin: 'Merhaba Dünya 2026', kapsam: 'harf' }, out: { 'Toplam harf': '12', 'a': '3 kez (%25)' } },
    { in: { metin: 'Merhaba Dünya 2026', kapsam: 'rakam' }, out: { 'Toplam harf ve rakam': '16', '2': '2 kez (%12,5)', 'a': '3 kez (%18,8)' } },
    { in: { metin: 'Aa', harf: 'ayir' }, out: { 'Farklı harf': '2', 'A': '1 kez (%50)', 'a': '1 kez (%50)' } },
    { in: { metin: 'İİ ii' }, out: { 'Farklı harf': '1', 'i': '4 kez (%100)' } },
    { in: { metin: 'çay cam', sira: 'alfabe' }, text: 'Harf\tAdet\tYüzde\na\t2\t%33,3\nc\t1\t%16,7\nç\t1\t%16,7\nm\t1\t%16,7\ny\t1\t%16,7' },
    { in: { metin: 'ılık ilik', sira: 'alfabe' }, textMatch: '^Harf\\tAdet\\tYüzde\\nı\\t2\\t%25\\ni\\t2\\t%25\\nk\\t2\\t%25\\nl\\t2\\t%25$' },
    { in: { metin: '' }, error: true },
    { in: { metin: '123 !!!', kapsam: 'harf' }, error: true },
  ],
  howto: [
    'İncelemek istediğiniz metni kutuya yazın ya da yapıştırın. Sonuçların anlamlı olması için metin ne kadar uzunsa o kadar iyidir.',
    'Büyük ve küçük harflerin birlikte mi ayrı mı sayılacağını seçin. Dil ve şifre analizi için "Birleştir" uygundur.',
    'Rakamların da sayıma katılmasını istiyorsanız "Harfler ve rakamlar" seçeneğini işaretleyin.',
    'Sonuçların en sık harften başlayarak mı yoksa alfabe sırasıyla mı listeleneceğini belirleyin ve "Analiz et" düğmesine basın.',
    'Tabloyu "Sonucu kopyala" ile panoya alıp hesap tablosunda grafiğe dönüştürebilirsiniz.',
  ],
  sections: [
    { h: 'Harf frekansı nedir?', p: [
      'Harf frekansı, bir harfin belirli bir metinde kaç kez geçtiğidir; çoğunlukla toplam harf sayısına oranı olarak yüzdeyle ifade edilir. Hesap basittir: <strong>yüzde = harfin adedi ÷ toplam harf × 100</strong>. Boşluklar, noktalama işaretleri ve varsayılan ayarda rakamlar bu toplamın dışında tutulur.',
      'Her dilin kendine özgü bir harf dağılımı vardır ve yeterince uzun metinlerde bu dağılım şaşırtıcı derecede kararlıdır. Türkçe metinlerde genellikle <em>a</em> ve <em>e</em> ilk sıraları alır, <em>i</em>, <em>n</em>, <em>r</em> ve <em>l</em> onları izler; <em>j</em> ise en seyrek rastlanan harflerdendir. İngilizcede en sık harf <em>e</em> olarak bilinir. Kesin oranlar metnin türüne, dönemine ve uzunluğuna göre değiştiği için kendi metninizin dağılımını ölçmek en doğru sonucu verir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> <code>Ankara</code> kelimesi altı harflidir. Büyük-küçük harf birleştirildiğinde baştaki A ile sonraki iki a aynı harf sayılır; a harfi 3 kez geçer ve payı 3 ÷ 6 × 100 = %50 olur. n, k ve r birer kez geçer, her birinin payı %16,7\'dir. Farklı harf sayısı 4\'tür.',
      '<strong>Örnek 2:</strong> <code>ISPARTA ısı</code> metninde 10 harf vardır. Türkçe kuralına göre büyük I harfi küçük ı\'nın büyüğüdür; bu yüzden "ISPARTA" kelimesinin ilk harfi ile "ısı" kelimesindeki iki ı birlikte sayılır ve ı harfi 3 kez (%30) ile en sık harf olur. s ve a ikişer kez (%20), p, r ve t birer kez geçer.',
      '<strong>Örnek 3:</strong> <code>Merhaba Dünya 2026</code> metninde yalnızca harfler sayılırsa toplam 12\'dir ve a harfi 3 kez (%25) geçer. Rakamlar da sayıma katılırsa toplam 16\'ya çıkar; a harfinin payı %18,8\'e düşer, 2 rakamı ise iki kez (%12,5) geçer.',
    ] },
    { h: 'Türkçede I, ı, İ ve i', p: [
      'Türk alfabesinde noktalı ve noktasız i iki ayrı harftir ve her birinin kendi büyük harfi vardır: <strong>ı → I</strong> ve <strong>i → İ</strong>. Uluslararası yazılımların çoğu ise İngilizce kuralını uygular ve büyük I harfini küçük i ile eşleştirir. Böyle bir araç Türkçe bir metinde "IŞIK" kelimesindeki harfleri i hanesine yazar ve hem ı hem i sayısını yanlış verir.',
      'Bu araç birleştirme yaparken Türkçe eşleştirmeyi kullanır. Metniniz İngilizce ise büyük I harflerinin ı hanesinde sayılacağını unutmayın; o durumda "Ayrı say" seçeneğiyle büyük ve küçük harfleri ayrı görmek daha doğru bir tablo verir. Şapkalı harfler (â, î, û) ve diğer dillerin aksanlı harfleri de kendi hanelerinde ayrı sayılır.',
    ] },
    { h: 'Harf frekansı nerelerde kullanılır?', ul: [
      '<strong>Şifre çözme:</strong> Sezar şifresi gibi her harfin yerine sabit bir başka harfin konduğu yöntemler, harflerin sıklığını değiştirmez. Şifreli metinde en sık geçen simgenin dildeki en sık harfe karşılık geldiği varsayılarak anahtar tahmin edilir. Bu yöntem frekans analizi olarak bilinir ve tarihi yüzyıllar öncesine uzanır.',
      '<strong>Dil tanıma:</strong> Bir metnin hangi dilde yazıldığı, harf dağılımına bakılarak yüksek doğrulukla kestirilebilir; ö, ü, ş, ğ ve ı harflerinin birlikte görülmesi Türkçeye güçlü bir işarettir.',
      '<strong>Klavye düzeni tasarımı:</strong> Sık kullanılan harflerin güçlü parmaklara ve temel sıraya yerleştirilmesi, harf sıklığı çalışmalarına dayanır. Türkçe F klavye bu anlayışla tasarlanmış düzenlerdendir.',
      '<strong>Kelime oyunları:</strong> Harf taşlı oyunlarda seyrek harflerin daha yüksek puan taşıması ve torbada daha az bulunması harf sıklığıyla ilgilidir. Adam asmaca oynarken sık geçen harflerden başlamak da aynı mantığa dayanır.',
      '<strong>Veri sıkıştırma:</strong> Sık geçen simgelere kısa, seyrek geçenlere uzun kod veren sıkıştırma yöntemleri simge frekanslarından yararlanır. Mors alfabesinde sık harflerin kısa işaretlerle gösterilmesi de benzer bir düşüncedir.',
      '<strong>Dil eğitimi ve yazı tasarımı:</strong> Okuma yazma öğretiminde harflerin sırası ve yazı tipi tasarımında hangi harf çiftlerine öncelik verileceği sıklık verilerinden etkilenir.',
    ] },
    { h: 'Sonuçları yorumlarken', p: [
      'Kısa metinlerde dağılım rastlantılara çok açıktır. Tek bir cümlede bir harfin hiç geçmemesi ya da beklenmedik biçimde öne çıkması olağandır; dilin genel eğilimini görmek için en az birkaç paragraf, tercihen birkaç sayfa metin gerekir. Metnin türü de sonucu etkiler: özel adlarla dolu bir liste, teknik terimler içeren bir kılavuz ya da yabancı kelimelerin çok geçtiği bir yazı gündelik dilden farklı bir tablo çizer.',
      'Bir metinde alfabenin bütün harflerinin geçip geçmediğini görmek için "Farklı harf" değerine bakabilirsiniz. Türk alfabesi 29 harflidir; büyük-küçük harf birleştirilmişken bu değer 29 ise ve metin yalnızca Türkçe harfler içeriyorsa metin bir pangramdır. "Pijamalı hasta yağız şoföre çabucak güvendi" tümcesi bunun bilinen örneğidir.',
    ] },
    { h: 'Sayım kuralları ve sınırlar', ul: [
      'Latin alfabesi dışındaki yazıların harfleri de (Kiril, Yunan, Arap vb.) harf olarak sayılır.',
      'Boşluk, satır sonu, noktalama işaretleri, semboller ve emojiler sayılmaz.',
      'Rakamlar yalnızca "Harfler ve rakamlar" seçildiğinde sayıma ve yüzde hesabına katılır.',
      'Alfabe sırası Türkçe harf sırasına göredir: c\'den sonra ç, g\'den sonra ğ, ı\'dan sonra i gelir.',
      'Ekranda en fazla 100 farklı karakter listelenir; kopyalanabilir tablo tamamını içerir. Metin uzunluğu 2.000.000 karakterle sınırlıdır.',
    ] },
  ],
  faq: [
    ['Türkçede en çok kullanılan harf hangisidir?', 'Türkçe metinlerde genellikle a harfi ilk sırada, e harfi ikinci sırada yer alır. Kesin oranlar incelenen metne göre değişir; kendi metninizi bu araçla ölçerek gerçek dağılımı görebilirsiniz.'],
    ['Büyük I harfi neden ı olarak sayılıyor?', 'Türk alfabesinde büyük I, noktasız küçük ı harfinin büyüğüdür; noktalı küçük i harfinin büyüğü ise İ\'dir. Araç birleştirmeyi bu kurala göre yapar. İngilizce metinlerde büyük ve küçük harfleri ayrı saymayı seçebilirsiniz.'],
    ['Boşluklar ve noktalama işaretleri sayılıyor mu?', 'Hayır. Yalnızca harfler, isterseniz rakamlar sayılır. Boşluk ve noktalama dahil toplam karakter sayısı için karakter sayacı aracını kullanabilirsiniz.'],
    ['Yüzdelerin toplamı neden tam 100 etmiyor?', 'Her yüzde bir ondalık basamağa yuvarlanarak gösterilir. Yuvarlama farkları birikince toplam 99,9 ya da 100,1 gibi görünebilir; sayımın kendisi tamdır.'],
    ['Frekans analiziyle şifre gerçekten çözülür mü?', 'Her harfin hep aynı harfle değiştirildiği basit yerine koyma şifrelerinde, yeterince uzun bir metin varsa evet. Günümüzde kullanılan modern şifreleme yöntemleri ise harf sıklığını gizleyecek biçimde tasarlanmıştır ve bu yolla çözülemez.'],
    ['Sesli ve sessiz harf sayısını da verir mi?', 'Bu araç her harfi ayrı ayrı sayar; sesli ve sessiz harf toplamlarını ayrıca göstermez. Bunun için sitedeki sesli ve sessiz harf sayacı aracını kullanabilirsiniz.'],
    ['Sonuçlardan grafik oluşturabilir miyim?', 'Evet. "Sonucu kopyala" düğmesi harf, adet ve yüzde sütunlarından oluşan sekmeyle ayrılmış tabloyu panoya alır. Bunu bir hesap tablosuna yapıştırıp sütun grafiği çizebilirsiniz.'],
    ['Metnim herhangi bir yere gönderiliyor mu?', 'Hayır. Sayım tarayıcınızın içinde yapılır; metniniz sunucuya iletilmez, kaydedilmez. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['kelime-frekansi', 'karakter-sayaci', 'sesli-sessiz-harf-sayaci', 'sezar-sifreleme', 'kelime-sayaci', 'grafik-olustur'],
};
