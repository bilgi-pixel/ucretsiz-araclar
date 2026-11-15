export default {
  slug: 'turkce-alfabe-sirasi',
  title: 'Kelimenin Alfabe Sıra Numaraları',
  h1Tail: 'harf → sayı',
  pageTitle: 'Kelimenin Alfabe Sıra Numaraları – Harfleri Sayıya Çevirme',
  description: 'Bir kelimenin harflerini alfabedeki sıra numaralarına çevirin. 29 harfli Türk alfabesi (A=1, Z=29) ya da 26 harfli İngiliz alfabesiyle harf dökümü ve toplamı görün.',
  card: 'Kelimenin harflerini alfabedeki sıra numarasına çevirin: Türk alfabesinde A=1, Z=29; toplamı ve harf dökümünü görün.',
  category: 'metin',
  keywords: ['alfabe sıra numarası', 'harflerin alfabedeki sırası', 'harfi sayıya çevirme', 'türk alfabesi kaçıncı harf', 'a1z26 şifresi', 'kelimenin sayısal değeri', 'alfabe numaraları'],
  lead: 'Bir kelimeyi yazın, her harfinin alfabede <strong>kaçıncı sırada</strong> olduğunu görün. Araç 29 harfli Türk alfabesinde Ç, Ğ, I, İ, Ö, Ş, Ü harflerini kendi sıralarıyla sayar; dilerseniz 26 harfli İngiliz alfabesine göre de hesaplar.',
  button: 'Sıra Numaralarını Bul',
  inputs: [
    { id: 'metin', label: 'Kelime ya da kısa metin', type: 'text', placeholder: 'Örn. Merhaba', wide: true },
    { id: 'alfabe', label: 'Alfabe', type: 'select', options: [['tr', 'Türk alfabesi (29 harf)'], ['en', 'İngiliz alfabesi (26 harf)']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').trim();
    if (s === '') h.err('Sıra numaralarını bulmak için bir kelime yazın.');
    const tr = v.alfabe !== 'en';
    const ALF = tr ? 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Büyük harfe çevir: Türkçede i → İ, ı → I; şapkalı harfler yalın karşılığıyla sayılır
    const buyut = (x) => {
      let t = x.replace(/[âÂ]/g, 'A').replace(/[ûÛ]/g, 'U');
      if (tr) t = t.replace(/[îÎ]/g, 'İ').replace(/i/g, 'İ').replace(/ı/g, 'I');
      else t = t.replace(/[îÎİı]/g, 'I');
      return t.toUpperCase();
    };
    const kelimeler = [];
    const dokum = [];
    const atlanan = new Set();
    let toplam = 0, adet = 0;
    for (const k of s.split(/\s+/)) {
      const sayilar = [];
      for (const c of Array.from(buyut(k))) {
        const i = ALF.indexOf(c);
        if (i < 0) { if (/\p{L}/u.test(c)) atlanan.add(c); continue; }
        sayilar.push(i + 1); dokum.push(`${c}=${i + 1}`); toplam += i + 1; adet++;
      }
      if (sayilar.length) kelimeler.push(sayilar);
    }
    if (adet === 0) h.err(tr ? 'Türk alfabesinde yer alan bir harf bulunamadı. Harflerden oluşan bir kelime yazın.' : 'İngiliz alfabesinde yer alan bir harf bulunamadı. A–Z harflerinden oluşan bir kelime yazın.');
    const rows = [
      ['Sıra numaraları', kelimeler.map((k) => k.join('-')).join(' / ')],
      ['Toplam', h.fmt(toplam, 0)],
      ['Harf sayısı', h.fmt(adet, 0)],
      ['Harf dökümü', dokum.join(', ')],
    ];
    if (kelimeler.length > 1) rows.push(['Kelime toplamları', kelimeler.map((k) => k.reduce((a, b) => a + b, 0)).join(' + ')]);
    let note = tr ? 'Türk alfabesi: A=1, B=2, C=3, Ç=4 … Y=28, Z=29.' : 'İngiliz alfabesi: A=1, B=2 … Z=26.';
    if (atlanan.size) note += ` Bu alfabede bulunmadığı için sayılmayan harfler: ${[...atlanan].join(', ')}.`;
    return { rows, note };
  },
  cases: [
    { in: { metin: 'Merhaba', alfabe: 'tr' }, out: { 'Sıra numaraları': '16-6-21-10-1-2-1', 'Toplam': '57', 'Harf sayısı': '7' } },
    { in: { metin: 'Hello', alfabe: 'en' }, out: { 'Sıra numaraları': '8-5-12-12-15', 'Toplam': '52', 'Harf dökümü': 'H=8, E=5, L=12, L=12, O=15' } },
    { in: { metin: 'Türkiye', alfabe: 'tr' }, out: { 'Sıra numaraları': '24-26-21-14-12-28-6', 'Toplam': '131' } },
    { in: { metin: 'ığdır', alfabe: 'tr' }, out: { 'Sıra numaraları': '11-9-5-11-21', 'Toplam': '57' } },
    { in: { metin: 'Ali Veli', alfabe: 'tr' }, out: { 'Sıra numaraları': '1-15-12 / 27-6-15-12', 'Toplam': '88', 'Kelime toplamları': '28 + 60' } },
    { in: { metin: 'Z', alfabe: 'tr' }, out: { 'Sıra numaraları': '29' } },
    { in: { metin: 'Z', alfabe: 'en' }, out: { 'Sıra numaraları': '26' } },
    { in: { metin: 'taxi', alfabe: 'tr' }, out: { 'Sıra numaraları': '24-1-12', 'Harf sayısı': '3' } },
    { in: { metin: '12345', alfabe: 'tr' }, error: true },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    'Sıra numaralarını öğrenmek istediğiniz kelimeyi, adı ya da kısa cümleyi yazın. Büyük ya da küçük harf kullanmanız sonucu değiştirmez.',
    'Kelime Türkçeyse "Türk alfabesi" seçili kalsın; İngilizce bir kelime ya da A1Z26 bulmacası için "İngiliz alfabesi" seçin.',
    '"Sıra Numaralarını Bul" düğmesine basın.',
    'Sonuçta harflerin sıra numaralarını tireyle ayrılmış olarak, toplamı ve hangi harfin hangi sayıya karşılık geldiğini görürsünüz. Birden çok kelime yazdıysanız kelimeler eğik çizgiyle ayrılır.',
  ],
  sections: [
    { h: 'Türk alfabesinde harflerin sırası', p: [
      'Türk alfabesi 29 harften oluşur: 8 ünlü ve 21 ünsüz. İngiliz alfabesindeki Q, W ve X harfleri Türk alfabesinde yoktur; buna karşılık Ç, Ğ, I, Ö, Ş ve Ü harfleri eklenmiştir. Araya giren bu harfler yüzünden iki alfabede sıra numaraları C harfinden sonra ayrışır. Türk alfabesindeki tam sıra şöyledir:',
    ], ul: [
      '<strong>1–10:</strong> A=1, B=2, C=3, Ç=4, D=5, E=6, F=7, G=8, Ğ=9, H=10',
      '<strong>11–20:</strong> I=11, İ=12, J=13, K=14, L=15, M=16, N=17, O=18, Ö=19, P=20',
      '<strong>21–29:</strong> R=21, S=22, Ş=23, T=24, U=25, Ü=26, V=27, Y=28, Z=29',
    ] },
    { h: 'Hesap nasıl yapılır? Çözümlü örnekler', p: [
      'Araç yazdığınız metni önce büyük harfe çevirir, ardından her harfin alfabe dizisindeki konumunu bulur. Konumlar 1\'den başlar. Harf olmayan karakterler (rakam, boşluk, noktalama) atlanır; boşluklar yalnızca kelimeleri birbirinden ayırmak için kullanılır.',
      'Örnek 1: <strong>MERHABA</strong>. M=16, E=6, R=21, H=10, A=1, B=2, A=1. Sıra numaraları <code>16-6-21-10-1-2-1</code>, toplam 16 + 6 + 21 + 10 + 1 + 2 + 1 = <strong>57</strong> eder.',
      'Örnek 2: <strong>TÜRKİYE</strong>. T=24, Ü=26, R=21, K=14, İ=12, Y=28, E=6. Sıra numaraları <code>24-26-21-14-12-28-6</code>, toplam <strong>131</strong> olur.',
      'Örnek 3: İki kelime, <strong>ALİ VELİ</strong>. İlk kelime 1-15-12 (toplam 28), ikinci kelime 27-6-15-12 (toplam 60). Genel toplam 88\'dir ve sonuçta kelime toplamları ayrıca gösterilir.',
      'Aynı kelime İngiliz alfabesiyle farklı sonuç verir. <strong>HELLO</strong> kelimesi 26 harfli alfabede 8-5-12-12-15, toplam 52\'dir. Türk alfabesinde ise H=10, E=6, L=15, L=15, O=18 olur ve toplam 64 çıkar.',
    ] },
    { h: 'I ve İ ayrı harflerdir', p: [
      'Türk alfabesinin en çok karıştırılan özelliği noktalı ve noktasız i harfleridir. Noktasız <strong>I (ı)</strong> 11. sırada, noktalı <strong>İ (i)</strong> 12. sıradadır. Küçük harfle yazdığınızda araç <code>i</code> harfini İ, <code>ı</code> harfini I olarak yorumlar. Bu yüzden <code>ığdır</code> kelimesi 11-9-5-11-21 verir; içinde hiç 12 yoktur.',
      'İngiliz alfabesi seçildiğinde tek bir I harfi vardır ve 9. sıradadır; noktalı ve noktasız iki biçim de bu harf sayılır. Ç, Ğ, Ö, Ş ve Ü harfleri ise İngiliz alfabesinde bulunmadığından sayılmaz ve sonuç notunda belirtilir. Tersine, Türk alfabesi seçiliyken Q, W ve X harfleri atlanır: <code>taxi</code> yazarsanız yalnızca T, A ve İ sayılır.',
      'Düzeltme işaretli (şapkalı) harfler ayrı bir alfabe harfi değildir; â harfi A, î harfi İ, û harfi U olarak sayılır.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      '<strong>Bulmaca ve şifreler:</strong> Her harfin yerine sıra numarasının yazıldığı basit yerine koyma şifresi, bulmaca kitaplarında, kaçış oyunlarında ve hazine avı etkinliklerinde sıkça kullanılır. İngilizce kaynaklarda A1Z26 adıyla geçer.',
      '<strong>Okul etkinlikleri:</strong> İlkokulda alfabe sırasını pekiştirmek için "adının harflerini topla" türü alıştırmalar yapılır. Öğretmenler cevap anahtarını bu araçla hızla hazırlayabilir.',
      '<strong>Sözlük ve sıralama çalışmaları:</strong> İki kelimeden hangisinin sözlükte önce geldiğini anlamak için harflerin sıra numaralarını karşılaştırmak yeterlidir.',
      '<strong>Programlama alıştırmaları:</strong> Harf–sayı dönüşümü, dizi ve döngü konularında klasik bir ödevdir. Kendi yazdığınız kodun çıktısını burada doğrulayabilirsiniz; özellikle Türkçe harflerde hata yapmak kolaydır.',
      '<strong>Kelime oyunları:</strong> Arkadaşlar arasında "adının toplamı kaç?" gibi eğlenceli karşılaştırmalar yapılabilir.',
    ] },
    { h: 'Bu hesap neyi göstermez?', p: [
      'Harflerin sıra numaralarının toplamı yalnızca aritmetik bir sonuçtur. Bir ismin toplamının kişilik, şans ya da gelecek hakkında bilgi verdiği yönündeki iddiaların bilimsel bir dayanağı yoktur; bu sayfa öyle bir yorum sunmaz.',
      'Bu hesap ebced hesabıyla da karıştırılmamalıdır. Ebcedde Arap harflerine sıra numarası değil, 1\'den 1000\'e uzanan özel değerler verilir. Ayrıca farklı kaynaklarda "harf değeri" adıyla dolaşan başka tablolar da vardır; sonuçları karşılaştırırken aynı alfabenin ve aynı numaralandırmanın kullanıldığından emin olun.',
      'Araç tek seferde bir kelime ya da kısa bir cümle için tasarlanmıştır. Uzun paragraflarda harf dökümü satırı çok uzar; böyle bir durumda metni parçalara bölerek hesaplamak daha okunaklı sonuç verir.',
    ] },
  ],
  faq: [
    ['Türk alfabesinde kaç harf vardır?', 'Türk alfabesinde 29 harf vardır: 8 ünlü (a, e, ı, i, o, ö, u, ü) ve 21 ünsüz. İlk harf A, son harf Z\'dir; Z\'nin sıra numarası 29\'dur.'],
    ['Ç, Ğ, Ş gibi harfler alfabede kaçıncı sırada?', 'Ç 4., Ğ 9., I 11., İ 12., Ö 19., Ş 23. ve Ü 26. sıradadır. Bu harfler, benzedikleri harfin hemen ardından gelir: C\'den sonra Ç, G\'den sonra Ğ, S\'den sonra Ş.'],
    ['Q, W ve X yazarsam ne olur?', 'Bu harfler Türk alfabesinde bulunmadığı için Türk alfabesi seçiliyken sayılmaz ve sonuç notunda atlandıkları belirtilir. Bu harfleri içeren kelimeler için İngiliz alfabesini seçin; orada Q=17, W=23, X=24\'tür.'],
    ['Küçük harfle yazmam sonucu değiştirir mi?', 'Hayır. Araç metni önce büyük harfe çevirir. Yalnız dikkat: Türk alfabesinde küçük i noktalı İ (12), küçük ı noktasız I (11) olarak sayılır; doğru harfi yazdığınızdan emin olun.'],
    ['Aynı kelime iki alfabede neden farklı toplam veriyor?', 'Türk alfabesinde C\'den sonra Ç, G\'den sonra Ğ gibi ek harfler araya girdiği için sonraki harflerin sıra numaraları kayar. Örneğin K harfi İngiliz alfabesinde 11., Türk alfabesinde 14. sıradadır.'],
    ['Sayılardan kelimeye geri dönebilir miyim?', 'Bu araç yalnızca harften sayıya çevirir. Geri dönüş için sayfadaki tabloya bakıp her sayının karşılığındaki harfi yazabilirsiniz; örneğin Türk alfabesinde 16-6-21-10-1-2-1 dizisi MERHABA kelimesidir.'],
    ['Bu hesap numeroloji ya da ebced ile aynı mı?', 'Hayır. Burada yalnızca harflerin alfabedeki sırası kullanılır. Ebced hesabı Arap harflerine özel değerler verir; numeroloji tabloları ise farklı ve bilimsel dayanağı olmayan eşleştirmeler kullanır.'],
    ['Yazdığım isim kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız kelime ya da isim sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['harf-frekansi', 'sesli-sessiz-harf-sayaci', 'ebced-hesapla', 'sezar-sifreleme', 'alfabetik-sirala'],
};
