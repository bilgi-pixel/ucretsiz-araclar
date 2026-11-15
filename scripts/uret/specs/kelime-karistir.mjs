export default {
  slug: 'kelime-karistir',
  title: 'Kelime Harflerini Karıştırma',
  h1Tail: 'harfleri rastgele dizin',
  pageTitle: 'Kelime Harflerini Karıştırma – Harf Karıştırıcı ve Bulmaca Aracı',
  description: 'Kelimelerin harflerini rastgele karıştırın. İlk ve son harfi sabit tutma seçeneği, noktalama koruması ve tekrarlanabilir karışım için tohum değeri sunar.',
  card: 'Kelimelerin harflerini rastgele dizin; ilk ve son harfi sabit tutun, kelime bulmacası ve etkinlik hazırlayın.',
  category: 'metin',
  keywords: ['kelime karıştırma', 'harf karıştırma', 'karışık harflerden kelime', 'kelime bulmaca hazırlama', 'harfleri karıştır', 'anagram oluşturma', 'karışık kelime etkinliği'],
  lead: `Yazdığınız her kelimenin harflerini <strong>rastgele sıraya</strong> dizin. Kelimelerin yeri, aralarındaki boşluklar ve noktalama işaretleri korunur; isterseniz ilk ve son harfi yerinde bırakıp yalnızca ortadaki harfleri karıştırabilirsiniz.`,
  button: 'Karıştır',
  inputs: [
    { id: 'metin', label: 'Kelime ya da metin', type: 'textarea', placeholder: 'Örn. kitap defter kalem', wide: true },
    { id: 'mod', label: 'Karıştırma biçimi', type: 'select', options: [['tam', 'Bütün harfleri karıştır'], ['orta', 'İlk ve son harfi sabit tut']] },
    { id: 'tohum', label: 'Tohum (isteğe bağlı)', type: 'text', placeholder: 'Örn. 5-A sınıfı', hint: 'Boş bırakılırsa her basışta farklı sonuç çıkar; aynı tohum aynı karışımı verir' },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Harfleri karıştırılacak kelimeyi ya da metni yazın.');
    if (metin.length > 200000) h.err('Metin çok uzun; en fazla 200.000 karakter işlenebilir.');
    const tohum = String(v.tohum ?? '').trim();
    let ham; // 32 bit rastgele tam sayı üretir
    if (tohum !== '') {
      let a = 2166136261;
      for (let i = 0; i < tohum.length; i++) { a ^= tohum.charCodeAt(i); a = Math.imul(a, 16777619); }
      a >>>= 0;
      ham = () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return (t ^ (t >>> 14)) >>> 0;
      };
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const kutu = new Uint32Array(1);
      ham = () => { crypto.getRandomValues(kutu); return kutu[0]; };
    } else {
      ham = () => Math.floor(Math.random() * 4294967296);
    }
    const rastgele = (n) => { const sinir = Math.floor(4294967296 / n) * n; let x; do { x = ham(); } while (x >= sinir); return x % n; };
    const karistir = (dizi) => {
      const d = dizi.slice();
      for (let i = d.length - 1; i > 0; i--) { const j = rastgele(i + 1); const g = d[i]; d[i] = d[j]; d[j] = g; }
      return d;
    };
    const orta = v.mod === 'orta';
    let toplam = 0, karisan = 0;
    const cikti = metin.replace(/\p{L}+/gu, (kelime) => {
      toplam++;
      const harfler = Array.from(kelime);
      const bas = orta ? 1 : 0, son = orta ? harfler.length - 1 : harfler.length;
      const parca = harfler.slice(bas, son);
      if (parca.length < 2 || new Set(parca).size < 2) return kelime;
      let yeni = parca;
      for (let deneme = 0; deneme < 50; deneme++) {
        yeni = karistir(parca);
        if (yeni.join('') !== parca.join('')) break;
      }
      const sonuc = harfler.slice(0, bas).concat(yeni, harfler.slice(son)).join('');
      if (sonuc !== kelime) karisan++;
      return sonuc;
    });
    if (!toplam) h.err('Metinde harf bulunamadı. En az bir kelime yazın.');
    return {
      rows: [
        ['Toplam kelime', h.fmt(toplam, 0)],
        ['Harfleri karışan kelime', h.fmt(karisan, 0)],
        ['Karıştırma biçimi', orta ? 'İlk ve son harf sabit' : 'Bütün harfler'],
      ],
      text: cikti,
      note: tohum !== '' ? 'Aynı metin, aynı biçim ve aynı tohumla her zaman bu sonuç elde edilir.' : 'Düğmeye her basışta yeni bir karışım üretilir. Çok kısa ya da tek tür harften oluşan kelimeler değişmez.',
    };
  },
  cases: [
    { in: { metin: 'kitap', mod: 'orta' }, out: { 'Toplam kelime': '1', 'Harfleri karışan kelime': '1', 'Karıştırma biçimi': 'İlk ve son harf sabit' }, textMatch: '^k(?!ita)[ita]{3}p$' },
    { in: { metin: 'ab', mod: 'tam' }, out: { 'Toplam kelime': '1', 'Harfleri karışan kelime': '1' }, text: 'ba' },
    { in: { metin: 'bu ev ne', mod: 'orta' }, out: { 'Toplam kelime': '3', 'Harfleri karışan kelime': '0' }, text: 'bu ev ne' },
    { in: { metin: 'aaa bbb', mod: 'tam' }, out: { 'Harfleri karışan kelime': '0' }, text: 'aaa bbb' },
    { in: { metin: 'Merhaba, dünya!', mod: 'tam', tohum: '42' }, out: { 'Toplam kelime': '2', 'Harfleri karışan kelime': '2' }, textMatch: '^[Merhab]{7}, [dünya]{5}!$' },
    { in: { metin: 'el, göz', mod: 'orta' }, text: 'el, göz' },
    { in: { metin: 'şeker 12', mod: 'orta', tohum: 'a' }, textMatch: '^ş[eke]{3}r 12$' },
    { in: { metin: '', mod: 'tam' }, error: true },
    { in: { metin: '123 456 !?', mod: 'tam' }, error: true },
  ],
  howto: [
    `Kutucuğa tek bir kelime, bir kelime listesi ya da bütün bir paragraf yazın.`,
    `"Karıştırma biçimi" listesinden bütün harflerin mi, yoksa yalnızca ilk ve son harf arasındakilerin mi karıştırılacağını seçin.`,
    `Aynı sonucu daha sonra yeniden üretmek istiyorsanız "Tohum" alanına aklınızda kalacak bir sözcük ya da sayı yazın; istemiyorsanız boş bırakın.`,
    `"Karıştır" düğmesine basın. Kelimeler aynı sırada, harfleri karışmış olarak sonuç kutusunda görünür.`,
    `Sonucu beğenmediyseniz düğmeye yeniden basın; tohum boşken her seferinde farklı bir dizilim çıkar.`,
  ],
  sections: [
    { h: 'Araç tam olarak ne yapar?', p: [
      `Metindeki her kelime ayrı ayrı ele alınır. Kelime, kesintisiz bir harf dizisi olarak tanımlanır; boşluk, rakam, nokta, virgül, tırnak gibi harf olmayan her şey kelime sınırıdır ve <strong>yerinden oynatılmaz</strong>. Böylece "Merhaba, dünya!" yazdığınızda virgül, boşluk ve ünlem işareti aynı konumda kalır; yalnızca "Merhaba" ve "dünya" kelimelerinin harfleri kendi içlerinde yer değiştirir. Kelimelerin sırası da bozulmaz. Kelimelerin sırasını değiştirmek istiyorsanız bunun için ayrı bir araç kullanmanız gerekir.`,
      `Karıştırma, her olası dizilime eşit şans veren Fisher-Yates yöntemiyle yapılır. Sondan başlanır, her adımda o konumdaki harf kendisinden önceki rastgele bir konumdaki harfle takas edilir. Rastgelelik için tarayıcının güvenli rastgele sayı üreteci kullanılır. Karışım tesadüfen özgün kelimeyle aynı çıkarsa araç yeniden dener; böylece mümkün olan her durumda farklı bir dizilim alırsınız.`,
    ] },
    { h: 'İki karıştırma biçimi', p: [
      `<strong>Bütün harfleri karıştır</strong> seçeneğinde kelimenin her harfi yer değiştirebilir. "kalem" kelimesi "lmake", "ekalm" ya da "malek" olabilir. Bu biçim, karışık harflerden kelime bulma etkinlikleri ve anagram bulmacaları için uygundur.`,
      `<strong>İlk ve son harfi sabit tut</strong> seçeneğinde yalnızca aradaki harfler karışır: "kitap" kelimesi "kiatp", "ktiap" ya da "katip" gibi biçimler alır, ama her zaman k ile başlar ve p ile biter. Bu biçimde üretilen metinlerin çoğu zaman şaşırtıcı ölçüde okunabilir kaldığı gözlenir; internette yıllardır dolaşan "harflerin sırası önemli değil" paragrafı da bu fikre dayanır. Gerçekte okunabilirlik kelimenin uzunluğuna, harflerin ne kadar uzağa taşındığına ve okurun kelimeye aşinalığına bağlıdır; uzun ve seyrek kullanılan kelimeler bu biçimde de zor çözülür.`,
    ] },
    { h: 'Hangi kelimeler değişmeden kalır?', ul: [
      `Tek harfli kelimeler ("o", "a") karıştırılacak bir şey olmadığından aynı kalır.`,
      `İlk-son sabit biçimde iki ve üç harfli kelimeler ("ev", "göz") değişmez, çünkü arada en fazla bir harf vardır. Dört harfli kelimelerde yalnızca ortadaki iki harf yer değiştirebilir.`,
      `Karışacak bölümü tek tür harften oluşan kelimeler ("aaa" ya da ilk-son sabitken "kaat" gibi) hangi sırayla dizilirse dizilsin aynı görünür.`,
      `Rakamlar ve simgeler kelime sayılmaz; "12", "%50" gibi parçalara dokunulmaz.`,
    ] },
    { h: 'Örnekler', p: [
      `"ab" kelimesini bütün harfler karışacak biçimde verdiğinizde tek olası farklı dizilim "ba" olduğundan sonuç her zaman <code>ba</code> çıkar; özet satırlarında toplam kelime 1, harfleri karışan kelime 1 görünür.`,
      `"bu ev ne" girdisini ilk ve son harf sabit biçimde karıştırırsanız üç kelimenin hiçbiri değişmez, çünkü hepsi iki harflidir. Çıktı yine <code>bu ev ne</code> olur ve "Harfleri karışan kelime" satırı 0 gösterir. Bu bir hata değil, biçimin doğal sonucudur.`,
      `"kitap" kelimesi ilk-son sabit biçimde verildiğinde ortadaki i, t, a harfleri yer değiştirir. Olası sonuçlar "kiatp", "ktiap", "ktaip", "katip" ve "kaitp" olur; "kitap" biçimi hiç çıkmaz, çünkü araç özgün dizilimi eler.`,
    ] },
    { h: 'Kullanım alanları', ul: [
      `<strong>Sınıf etkinlikleri:</strong> Türkçe ve yabancı dil derslerinde yeni öğrenilen kelimelerin harflerini karıştırıp öğrencilerden doğrusunu bulmalarını istemek.`,
      `<strong>Bulmaca ve yarışma:</strong> Dergi, bülten ya da sosyal medya paylaşımı için karışık harf sorusu hazırlamak.`,
      `<strong>Kelime oyunları:</strong> Arkadaş toplantılarında ya da aile oyunlarında süreli kelime bulma turları düzenlemek.`,
      `<strong>Okuma deneyleri:</strong> İlk ve son harfi sabit bırakılmış metinlerin ne kadar okunabildiğini kendi paragrafınızla sınamak.`,
      `<strong>Tasarım ve yazılım:</strong> Arayüz denemelerinde gerçek metne benzeyen ama anlamı okunmayan dolgu metni üretmek.`,
    ] },
    { h: 'Tohum değeri ne işe yarar?', p: [
      `Tohum, rastgele sayı üretecinin başlangıç noktasıdır. Alan boş bırakıldığında her basışta yeni bir karışım elde edersiniz. Bir tohum yazdığınızda ise aynı metin ve aynı biçim için sonuç hep aynıdır. Bu, bir çalışma kâğıdını haftalar sonra birebir aynı sorularla yeniden üretmek ya da bir meslektaşınızla aynı karışımı paylaşmak istediğinizde işe yarar: metni ve tohumu vermeniz yeterlidir.`,
      `Tohumlu karışım tekrarlanabilir olduğu için tahmin edilebilir kabul edilmelidir. Bu araç bir şifreleme yöntemi değildir; harfleri karıştırılmış bir metin, özellikle kısa kelimelerde, kolayca çözülür. Gizli kalması gereken bilgileri bu yolla saklamayın.`,
    ] },
    { h: 'Türkçe harfler ve büyük-küçük harf', p: [
      `ç, ğ, ı, İ, ö, ş, ü dahil bütün harfler tek bir harf olarak taşınır; bozulma ya da bölünme olmaz. Harflerin büyük-küçük durumu harfle birlikte yer değiştirir: "Ankara" kelimesi tam karıştırmada "nkAraa" gibi büyük harfi ortada kalan bir biçim alabilir. Bulmacada ipucu vermemek için bu genellikle istenen bir şeydir; büyük harfin başta kalmasını istiyorsanız ilk ve son harfi sabit tutan biçimi seçin ya da metni önce küçük harfe çevirin.`,
    ] },
  ],
  faq: [
    ['Kelimelerin sırası da değişiyor mu?', 'Hayır. Araç yalnızca her kelimenin kendi içindeki harfleri karıştırır; kelimelerin cümledeki yeri, boşluklar ve noktalama işaretleri aynı kalır.'],
    ['Bazı kelimeler neden hiç değişmedi?', 'Tek harfli kelimeler, ilk-son sabit biçimde üç harfe kadar olan kelimeler ve karışacak bölümü aynı harften oluşan kelimeler başka bir dizilime sahip olamaz. Özet bölümündeki "Harfleri karışan kelime" satırı kaç kelimenin gerçekten değiştiğini gösterir.'],
    ['Sonuç özgün kelimeyle aynı çıkabilir mi?', 'Farklı bir dizilim mümkün olduğu sürece hayır. Karışım tesadüfen özgün kelimeyi verirse araç yeniden karıştırır.'],
    ['Karışık harflerden anlamlı başka bir kelime çıkar mı?', 'Tesadüfen çıkabilir; örneğin "kitap" kelimesinin harfleri "katip" biçiminde dizilebilir. Araç anlam denetimi yapmaz, yalnızca harfleri rastgele sıralar.'],
    ['Aynı karışımı yeniden nasıl elde ederim?', '"Tohum" alanına bir değer yazın ve bunu not edin. Aynı metni, aynı biçimi ve aynı tohumu girdiğinizde sonuç her seferinde aynı olur.'],
    ['Bu araçla metin şifrelenebilir mi?', 'Hayır. Harf karıştırma bir şifreleme yöntemi değildir ve kolayca çözülebilir. Araç eğlence, eğitim ve bulmaca hazırlama amacıyla tasarlanmıştır.'],
    ['Rakam ve noktalama işaretleri karışıyor mu?', 'Hayır. Yalnızca harfler yer değiştirir. Rakamlar, boşluklar, satır sonları ve noktalama işaretleri bulundukları konumda kalır.'],
    ['Yazdığım metin bir yere gönderiliyor mu?', 'Hayır. Karıştırma işlemi tarayıcınızda yapılır; metin sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['satirlari-karistir', 'anagram-kontrol', 'metni-ters-cevir', 'kelimeleri-ters-cevir', 'harf-frekansi'],
};
