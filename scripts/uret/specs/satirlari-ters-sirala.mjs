export default {
  slug: 'satirlari-ters-sirala',
  title: 'Satır Sırasını Ters Çevirme',
  h1Tail: 'son satır başa, ilk satır sona',
  pageTitle: 'Satır Sırasını Ters Çevirme – Listeyi Sondan Başa Dizme',
  description: 'Alt alta yazılmış satırların sırasını tersine çevirin: son satır başa, ilk satır sona gelir. Satırların içeriği değişmez; boş satır ve numara seçenekleri vardır.',
  card: 'Listenin satır sırasını tersine çevirin; son satır başa gelsin, satırların içeriği aynı kalsın.',
  category: 'metin',
  keywords: ['satır sırasını ters çevirme', 'listeyi ters çevir', 'satırları tersten sırala', 'sondan başa sıralama', 'liste ters çevirme', 'reverse lines', 'kronolojik sırayı ters çevir'],
  lead: `Her satıra bir öğe gelecek biçimde yazdığınız metnin <strong>satır sırasını</strong> tersine çevirin. Son satır en üste, ilk satır en alta taşınır; satırların içindeki yazı olduğu gibi kalır.`,
  button: 'Ters çevir',
  inputs: [
    { id: 'metin', label: 'Satırlar', type: 'textarea', placeholder: 'Ocak\nŞubat\nMart', wide: true },
    { id: 'bos', label: 'Boş satırlar', type: 'select', options: [['tut', 'Koru'], ['at', 'Çıkar']] },
    { id: 'numara', label: 'Satır numarası', type: 'select', options: [['yok', 'Ekleme'], ['var', 'Özgün satır numarasını başa ekle']] },
  ],
  compute(v, h) {
    let satirlar = String(v.metin ?? '').replace(/\r\n?/g, '\n').split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    while (satirlar.length && satirlar[0].trim() === '') satirlar.shift();
    if (v.bos === 'at') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (!satirlar.length) h.err('Sırası ters çevrilecek satırları yazın.');
    if (satirlar.length > 500000) h.err('En fazla 500.000 satır işlenebilir; metni parçalara bölün.');
    const n = satirlar.length;
    const ters = [];
    for (let i = n - 1; i >= 0; i--) ters.push(v.numara === 'var' ? `${i + 1}. ${satirlar[i]}` : satirlar[i]);
    const kisalt = (s) => {
      if (s.trim() === '') return '(boş satır)';
      const d = Array.from(s);
      return d.length > 60 ? d.slice(0, 60).join('') + '…' : s;
    };
    return {
      rows: [
        ['Satır sayısı', h.fmt(n, 0)],
        ['Yeni ilk satır', kisalt(ters[0])],
        ['Yeni son satır', kisalt(ters[n - 1])],
      ],
      text: ters.join('\n'),
      note: 'Yalnızca satırların sırası değişir; satır içindeki harf ve kelime sırası aynı kalır. Metnin başındaki ve sonundaki boş satırlar atılır.',
    };
  },
  cases: [
    { in: { metin: '1\n2\n3' }, out: { 'Satır sayısı': '3', 'Yeni ilk satır': '3', 'Yeni son satır': '1' }, text: '3\n2\n1' },
    { in: { metin: 'Ocak\nŞubat\nMart\n\n\n' }, out: { 'Satır sayısı': '3', 'Yeni ilk satır': 'Mart' }, text: 'Mart\nŞubat\nOcak' },
    { in: { metin: 'a\n\nb\nc', bos: 'tut' }, out: { 'Satır sayısı': '4' }, text: 'c\nb\n\na' },
    { in: { metin: 'a\n\nb\nc', bos: 'at' }, out: { 'Satır sayısı': '3' }, text: 'c\nb\na' },
    { in: { metin: 'elma\narmut', numara: 'var' }, out: { 'Yeni ilk satır': '2. armut' }, text: '2. armut\n1. elma' },
    { in: { metin: 'x\r\ny' }, text: 'y\nx' },
    { in: { metin: 'tek satır' }, out: { 'Satır sayısı': '1' }, text: 'tek satır' },
    { in: { metin: '' }, error: true },
    { in: { metin: '\n  \n' }, error: true },
  ],
  howto: [
    `Sırasını değiştirmek istediğiniz listeyi ya da metni kutucuğa yapıştırın.`,
    `Aradaki boş satırların korunmasını ya da çıkarılmasını seçin. Paragraflar arasında boşluk bırakılmış metinlerde "Koru" düzeni bozmaz.`,
    `Her satırın özgün listede kaçıncı sırada olduğunu görmek istiyorsanız "Özgün satır numarasını başa ekle" seçeneğini açın.`,
    `"Ters çevir" düğmesine basın. Sonuç kutusunda son satır en üstte olacak biçimde yeni liste görünür.`,
    `Sonucu kopyalayın. Aynı çıktıyı yeniden ters çevirirseniz baştaki sıraya dönersiniz.`,
  ],
  sections: [
    { h: 'Satır sırasını ters çevirmek ne işe yarar?', p: [
      `Birçok liste zaman sırasıyla tutulur ve hangi ucun üstte olduğu kaynağa göre değişir. Banka hesap hareketleri, sipariş geçmişi, sohbet dökümü ya da sistem günlükleri kimi zaman en yeni kayıt üstte, kimi zaman en eski kayıt üstte olacak biçimde dışa aktarılır. Elinizdeki sıra ihtiyacınızın tersiyse listeyi elle yeniden dizmek yerine satır sırasını çevirmek birkaç saniyelik iştir.`,
      `Bu işlem bir sıralama değildir: araç satırların içeriğine bakmaz, alfabeye ya da tarihe göre karşılaştırma yapmaz. Yalnızca konumları aynalar; n satırlı bir listede birinci satır n'inci sıraya, ikinci satır n−1'inci sıraya gider. Bu yüzden karışık biçimli tarihler, başlık satırları ya da yorum satırları içeren listelerde bile sonuç öngörülebilirdir: neyi nereye yazdıysanız tam tersi konumda bulursunuz.`,
    ] },
    { h: 'Benzer işlemlerden farkı', p: [
      `"Ters çevirme" sözü üç farklı şey için kullanılır ve bunlar sık karıştırılır. <strong>Satır sırasını ters çevirme</strong> (bu araç) satırların dizilişini değiştirir, her satırın içi aynı kalır. <strong>Metni ters çevirme</strong> harfleri sondan başa yazar: "kalem" sözcüğü "melak" olur. <strong>Kelime sırasını ters çevirme</strong> ise bir cümledeki kelimelerin yerini değiştirir: "bugün hava güzel" ifadesi "güzel hava bugün" olur.`,
      `Örneğin "Ocak, Şubat, Mart" satırlarını bu araca verdiğinizde sonuç "Mart, Şubat, Ocak" olur; ay adlarının yazımı bozulmaz. Harflerin de ters dönmesini istiyorsanız ilgili diğer aracı kullanmalısınız.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Basit liste:</strong> Üç satıra 1, 2 ve 3 yazın. Düğmeye bastığınızda çıktı 3, 2, 1 olur. Özet bölümünde satır sayısı 3, yeni ilk satır "3", yeni son satır "1" olarak gösterilir.`,
      `<strong>Arada boş satır:</strong> Girdi "a", boş satır, "b", "c" olsun. "Koru" seçiliyken sonuç "c", "b", boş satır, "a" olur ve satır sayısı 4 çıkar; boş satır da kendi aynalanmış konumuna taşınır. "Çıkar" seçildiğinde boş satır atılır ve sonuç üç satırlık "c", "b", "a" olur.`,
      `<strong>Numaralı çıktı:</strong> "elma" ve "armut" satırlarını numara seçeneği açıkken çevirirseniz sonuç <code>2. armut</code> ve <code>1. elma</code> olur. Numara, satırın ters çevrilmeden önceki sırasını gösterir; böylece uzun bir listede bir kaydın özgün konumunu kaybetmezsiniz.`,
    ] },
    { h: 'Kullanım senaryoları', ul: [
      `<strong>Hesap ve sipariş dökümleri:</strong> En yeni kaydın üstte olduğu bir dökümü, eskiden yeniye okuyacak biçimde çevirmek.`,
      `<strong>Günlük (log) dosyaları:</strong> Hata ayıklarken en son olayları en üstte görmek.`,
      `<strong>Sıralama listeleri:</strong> Birinciden sonuncuya dizilmiş bir sıralamayı, ödül töreni ya da geri sayım sunumu için sondan başa çevirmek.`,
      `<strong>Yapılacaklar ve sürüm notları:</strong> Eskiden yeniye tutulan notları, en güncel madde üstte olacak biçimde yayımlamak.`,
      `<strong>Azalan sıralama:</strong> Küçükten büyüğe ya da a'dan z'ye sıralanmış bir listeyi, yeniden sıralamadan büyükten küçüğe ya da z'den a'ya çevirmek.`,
      `<strong>Kaynakça ve alıntılar:</strong> Yıla göre artan dizilmiş kaynakları yeniden eskiye doğru sunmak.`,
    ] },
    { h: 'Boş satırlar, başlıklar ve çok satırlı kayıtlar', p: [
      `Metnin en başındaki ve en sonundaki boş satırlar her zaman atılır; aksi halde sondaki görünmez boş satırlar çıktının başına taşınır ve liste boşlukla başlardı. Aradaki boş satırlar varsayılan olarak korunur.`,
      `Dikkat edilmesi gereken iki durum vardır. Birincisi <strong>başlık satırıdır</strong>: tablo biçimindeki bir listenin ilk satırı sütun adlarını içeriyorsa, çevirme sonunda bu satır en alta iner. Başlığı ayırıp yalnızca veri satırlarını çevirmek, ardından başlığı yeniden en üste eklemek gerekir. İkincisi <strong>birden fazla satıra yayılan kayıtlardır</strong>: adres blokları ya da üç satırlık kayıt grupları satır satır aynalandığında her kaydın kendi içindeki sıra da ters döner. Böyle verilerde önce her kaydı tek satıra indirmek, çevirdikten sonra yeniden bölmek en güvenli yoldur.`,
    ] },
    { h: 'Teknik notlar', p: [
      `Windows, macOS ve Linux'ta satır sonu karakterleri farklıdır; araç hepsini tanır ve çıktıda tek tip satır sonu kullanır. Satırların içindeki boşluklara, sekmelere ve Türkçe karakterlere dokunulmaz. İşlem kendisinin tersidir: aynı ayarlarla iki kez uygulandığında, boş satırları çıkarmadıysanız ve numara eklemediyseniz, başlangıçtaki metni geri verir. 500.000 satıra kadar olan listeler desteklenir; çok büyük dosyalarda tarayıcının yapıştırma işlemi çevirmenin kendisinden daha uzun sürebilir.`,
    ] },
  ],
  faq: [
    ['Bu araç harfleri de ters çeviriyor mu?', 'Hayır. Yalnızca satırların sırası değişir; her satırın içindeki harfler ve kelimeler aynı kalır. Harfleri sondan başa yazmak için metni ters çeviren ayrı araç kullanılmalıdır.'],
    ['Ters çevirme ile sıralama arasındaki fark nedir?', 'Sıralama satırları içeriğine göre (alfabetik, uzunluk vb.) yeniden dizer. Ters çevirme içeriğe bakmaz; mevcut sırayı aynalar. Zaten sıralı bir listeyi ters çevirmek, onu azalan sıraya geçirmenin en hızlı yoludur.'],
    ['Boş satırlara ne olur?', 'Aradaki boş satırlar varsayılan olarak korunur ve aynalanmış konumlarına taşınır. "Çıkar" seçeneğiyle bunları tümüyle atabilirsiniz. Metnin başındaki ve sonundaki boş satırlar her durumda silinir.'],
    ['Özgün satır numarası seçeneği ne yapar?', 'Her satırın başına, çevrilmeden önceki sıra numarasını ekler. Beş satırlık bir listede çıktı 5, 4, 3, 2, 1 numaralarıyla başlar; böylece kaydın eski konumunu görebilirsiniz.'],
    ['İşlemi geri alabilir miyim?', 'Evet. Çıktıyı yeniden kutucuğa yapıştırıp bir kez daha ters çevirmeniz yeterlidir. Boş satırları çıkarmadıysanız ve numara eklemediyseniz ilk metne dönersiniz.'],
    ['Tablo başlığım en alta gitti, ne yapmalıyım?', 'Araç bütün satırlara aynı işlemi uygular. Başlık satırını çevirmeden önce listeden çıkarın, veri satırlarını çevirin ve başlığı sonra yeniden en üste ekleyin.'],
    ['Kaç satıra kadar çalışır?', 'En fazla 500.000 satır işlenebilir. Daha büyük dosyaları parçalara ayırarak çevirebilir, parçaları ters sırada birleştirebilirsiniz.'],
    ['Metnim bir yere kaydediliyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; yapıştırdığınız satırlar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['metni-ters-cevir', 'kelimeleri-ters-cevir', 'satir-sirala-uzunluk', 'alfabetik-sirala', 'satirlari-karistir', 'satir-numarasi-ekle'],
};
