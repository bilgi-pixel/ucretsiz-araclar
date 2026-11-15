export default {
  slug: 'noktalama-temizle',
  title: 'Noktalama İşaretlerini Temizleme',
  h1Tail: 'nokta, virgül ve tırnakları silin',
  pageTitle: 'Noktalama İşaretlerini Temizleme – Metinden Nokta Virgül Silme',
  description: 'Metindeki nokta, virgül, tırnak, parantez ve diğer noktalama işaretlerini tek tıkla silin. Kesme işaretini koruma, boşlukla değiştirme ve simge silme seçenekleri vardır.',
  card: 'Metindeki nokta, virgül, tırnak ve parantezleri silin; kesme işaretini koruyun, fazla boşlukları toplayın.',
  category: 'metin',
  keywords: ['noktalama işaretlerini silme', 'noktalama temizleme', 'metinden virgül silme', 'nokta virgül kaldırma', 'noktalama işaretlerini kaldır', 'özel karakter silme', 'metin temizleme'],
  lead: `Bir metindeki <strong>noktalama işaretlerini</strong> toplu olarak silin ya da boşlukla değiştirin. Nokta, virgül, soru ve ünlem işareti, tırnak, parantez, kısa ve uzun çizgi gibi işaretler kaldırılır; harfler, rakamlar ve satır düzeni korunur.`,
  button: 'Temizle',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Örn. Merhaba, dünya! Bugün hava "çok" güzel.', wide: true },
    { id: 'yerine', label: 'İşaretin yerine', type: 'select', options: [['sil', 'Hiçbir şey koyma (sil)'], ['bosluk', 'Boşluk koy']] },
    { id: 'kesme', label: 'Kelime içindeki kesme işareti', type: 'select', options: [['koru', 'Koru (Ankara\'nın)'], ['sil', 'Sil']] },
    { id: 'simge', label: 'Simgeler (+ = $ < > ^ | ~)', type: 'select', options: [['koru', 'Koru'], ['sil', 'Sil']] },
    { id: 'bosluk', label: 'Fazla boşluklar', type: 'select', options: [['birlestir', 'Teke indir ve satır uçlarını kırp'], ['dokunma', 'Dokunma']] },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (metin.trim() === '') h.err('Noktalama işaretleri temizlenecek metni yazın.');
    const desen = v.simge === 'sil' ? /[\p{P}\p{S}]/gu : /\p{P}/gu;
    const harfMi = (c) => c !== undefined && /[\p{L}\p{N}]/u.test(c);
    const yerine = v.yerine === 'bosluk' ? ' ' : '';
    let silinen = 0;
    let cikti = metin.replace(desen, (es, konum, tum) => {
      if (v.kesme !== 'sil' && (es === '\'' || es === '’') && harfMi(tum[konum - 1]) && harfMi(tum[konum + 1])) return es;
      silinen++;
      return yerine;
    });
    if (v.bosluk !== 'dokunma') cikti = cikti.split('\n').map((s) => s.replace(/[ \t ]+/g, ' ').trim()).join('\n');
    return {
      rows: [
        ['Silinen işaret', h.fmt(silinen, 0)],
        ['Kalan karakter', h.fmt(Array.from(cikti).length, 0)],
      ],
      text: cikti,
      note: silinen ? 'Harfler, rakamlar ve satır sonları korunur. Ondalık sayılardaki virgül ve nokta da noktalama sayılır.' : 'Metinde silinecek noktalama işareti bulunamadı.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba, dünya!' }, out: { 'Silinen işaret': '2', 'Kalan karakter': '13' }, text: 'Merhaba dünya' },
    { in: { metin: 'Ankara\'nın havası güzel.', kesme: 'koru' }, out: { 'Silinen işaret': '1' }, text: 'Ankara\'nın havası güzel' },
    { in: { metin: 'Ankara\'nın havası güzel.', kesme: 'sil' }, out: { 'Silinen işaret': '2' }, text: 'Ankaranın havası güzel' },
    { in: { metin: 'iyi-kötü', yerine: 'bosluk' }, text: 'iyi kötü' },
    { in: { metin: 'iyi-kötü', yerine: 'sil' }, text: 'iyikötü' },
    { in: { metin: '3 + 5 = 8 (doğru)', simge: 'koru' }, out: { 'Silinen işaret': '2' }, text: '3 + 5 = 8 doğru' },
    { in: { metin: '3 + 5 = 8 (doğru)', simge: 'sil' }, out: { 'Silinen işaret': '4' }, text: '3 5 8 doğru' },
    { in: { metin: '"Evet..." dedi; sonra sustu?' }, out: { 'Silinen işaret': '7' }, text: 'Evet dedi sonra sustu' },
    { in: { metin: 'a ,  b', bosluk: 'dokunma' }, text: 'a   b' },
    { in: { metin: 'bir\niki, üç' }, text: 'bir\niki üç' },
    { in: { metin: 'düz metin' }, out: { 'Silinen işaret': '0' }, text: 'düz metin' },
    { in: { metin: '' }, error: true },
    { in: { metin: '   \n ' }, error: true },
  ],
  howto: [
    `Temizlemek istediğiniz metni kutucuğa yazın ya da yapıştırın.`,
    `İşaretlerin tümüyle silinmesini mi, yoksa yerlerine boşluk konmasını mı istediğinizi seçin. Kelimeleri birbirine bağlayan çizgiler varsa boşluk seçeneği kelimelerin yapışmasını önler.`,
    `Özel adlara gelen eklerdeki kesme işaretinin korunup korunmayacağını belirleyin.`,
    `Artı, eşittir, para birimi gibi simgelerin de silinmesini istiyorsanız "Simgeler" ayarını "Sil" yapın.`,
    `"Temizle" düğmesine basın ve işaretlerden arınmış metni kopyalayın.`,
  ],
  sections: [
    { h: 'Hangi işaretler silinir?', p: [
      `Araç, Unicode standardında "noktalama" sınıfına giren bütün karakterleri hedef alır. Bu sınıf yalnızca Türkçe klavyedeki işaretlerle sınırlı değildir; başka dillerden ya da kelime işlemcilerden gelen kıvrık tırnakları, uzun çizgileri ve üç nokta karakterini de kapsar. Silinen başlıca işaretler şunlardır:`,
    ], ul: [
      `Cümle sonu ve duraklama işaretleri: nokta, virgül, noktalı virgül, iki nokta, soru işareti, ünlem işareti, üç nokta`,
      `Tırnaklar: düz ve kıvrık çift tırnak, tek tırnak, açılı tırnak`,
      `Ayraçlar: yay ayraç, köşeli ayraç, süslü ayraç`,
      `Çizgiler: kısa çizgi, uzun çizgi, alt çizgi, eğik çizgi ve ters eğik çizgi`,
      `Diğerleri: yıldız, kare (#), yüzde, ve işareti (&), kuyruklu a (@), madde imi noktası`,
    ] },
    { h: 'Noktalama ile simge arasındaki ayrım', p: [
      `Gündelik dilde hepsine "özel karakter" dense de Unicode bu karakterleri iki ayrı sınıfta tutar. Artı (+), eşittir (=), küçüktür ve büyüktür (< >), şapka (^), dikey çizgi (|), yaklaşık (~), ters tırnak (\`) ile para birimi işaretleri (₺, $, €) <strong>simge</strong> sayılır, noktalama değil. Varsayılan ayarda bunlar korunur; böylece "3 + 5 = 8" gibi bir ifade ya da fiyat içeren bir cümle anlamını yitirmez.`,
      `Metni yalnızca harf, rakam ve boşluktan oluşan sade bir biçime indirmek istiyorsanız "Simgeler" ayarını "Sil" yapın. Bu durumda emojiler de simge sınıfında olduğundan çoğu silinir. Yüzde işareti, yıldız ve @ gibi karakterlerin ise simge değil noktalama sınıfında yer aldığını ve her iki ayarda da silindiğini unutmayın.`,
    ] },
    { h: 'Kesme işareti neden ayrı tutulur?', p: [
      `Türkçede özel adlara getirilen ekler kesme işaretiyle ayrılır: "Ankara'nın", "Ayşe'ye", "2026'da". Bu işaret silindiğinde ad ile ek birleşir ve "Ankaranın" gibi yazım kurallarına aykırı bir biçim ortaya çıkar; ad tanıma ya da arama yapan yazılımlar da kelimeyi artık özel ad olarak göremeyebilir. Varsayılan ayar bu nedenle, <strong>iki yanında harf ya da rakam bulunan</strong> kesme işaretini korur.`,
      `Koruma yalnızca kelime içindeki işaret için geçerlidir. Bir sözü tırnak içine almak için kullanılan tek tırnaklar kelimenin başında ya da sonunda durduğundan yine silinir. Kesme işaretini de istemiyorsanız ayarı "Sil" yapın; kelime sayımı ya da harf frekansı gibi işlerde bu tercih edilebilir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> "Merhaba, dünya!" cümlesinde bir virgül ve bir ünlem işareti vardır. Temizlendiğinde sonuç <code>Merhaba dünya</code> olur; özet bölümünde silinen işaret 2, kalan karakter 13 olarak görünür (yedi harf, bir boşluk, beş harf).`,
      `<strong>Örnek 2:</strong> "Ankara'nın havası güzel." cümlesinde varsayılan ayarla yalnızca sondaki nokta silinir ve silinen işaret sayısı 1 olur. Kesme işareti ayarını "Sil" yaptığınızda sonuç "Ankaranın havası güzel" olur ve sayaç 2 gösterir.`,
      `<strong>Örnek 3:</strong> "iyi-kötü" ifadesinde çizgi silinirse iki kelime birleşip "iyikötü" olur. "Boşluk koy" seçeneğiyle sonuç "iyi kötü" biçiminde kalır. Kelime listesi çıkaracaksanız ikinci seçenek daha doğru sonuç verir.`,
      `<strong>Örnek 4:</strong> "3 + 5 = 8 (doğru)" girdisinde simgeler korunurken yalnızca iki ayraç silinir ve "3 + 5 = 8 doğru" elde edilir. Simgeler de silinirse artı ve eşittir işaretleri gider, boşluklar teke iner ve sonuç "3 5 8 doğru" olur.`,
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      `<strong>Metin analizi:</strong> Kelime sıklığı, kelime bulutu ya da harf sayımı öncesinde "ev," ile "ev" kelimelerinin ayrı sayılmasını önlemek.`,
      `<strong>Arama ve eşleştirme:</strong> İki listeyi karşılaştırmadan önce yazım farklarını (nokta, tırnak, çizgi) ortadan kaldırmak.`,
      `<strong>Dosya ve etiket adları:</strong> Başlıktan dosya adı, etiket ya da kısa kod üretirken sorun çıkarabilecek işaretleri atmak.`,
      `<strong>Dil çalışmaları:</strong> Öğrencilere noktalama işaretlerini kendilerinin yerleştireceği alıştırma metinleri hazırlamak.`,
      `<strong>Veri hazırlığı:</strong> Anket yanıtlarını, yorumları ya da ürün adlarını tabloya aktarmadan önce sadeleştirmek.`,
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      `Noktalama silmek geri döndürülemez bir sadeleştirmedir; cümle sınırları ve vurgu kaybolur. Özgün metnin bir kopyasını saklayın. Sayılar konusunda özellikle dikkatli olun: "3,5" içindeki virgül ve "1.250" içindeki nokta da noktalama işaretidir ve silindiğinde sayı "35" ve "1250" olur. Tarihlerdeki nokta ve eğik çizgi ("15.03.2026"), saatlerdeki iki nokta, e-posta adreslerindeki @ ve nokta, internet adreslerindeki eğik çizgiler de aynı şekilde kaldırılır. Bu tür veriler içeren metinlerde ya "Boşluk koy" seçeneğini kullanın ya da ilgili bölümleri işlem dışında tutun.`,
      `Fazla boşlukları toplama ayarı açıkken art arda gelen boşluk ve sekmeler teke indirilir, her satırın başındaki ve sonundaki boşluklar kırpılır. Satır sonlarına dokunulmaz; paragraf ve liste düzeniniz korunur. Girintili bir metinle (kod, şiir) çalışıyorsanız bu ayarı "Dokunma" yapın.`,
    ] },
  ],
  faq: [
    ['Türkçe karakterler silinir mi?', 'Hayır. ç, ğ, ı, İ, ö, ş, ü dahil bütün harfler ve rakamlar korunur. Yalnızca noktalama sınıfındaki karakterler, isterseniz simgeler de silinir.'],
    ['Kesme işareti neden silinmedi?', 'Varsayılan ayarda iki yanında harf ya da rakam bulunan kesme işareti korunur, çünkü Türkçede özel adlara gelen ekleri ayırır. Bunu da silmek için "Kelime içindeki kesme işareti" ayarını "Sil" yapın.'],
    ['Artı, eşittir ve para işaretleri neden yerinde kaldı?', 'Bu karakterler noktalama değil simge sınıfındadır ve varsayılan olarak korunur. "Simgeler" ayarını "Sil" yaparak bunları da kaldırabilirsiniz.'],
    ['Ondalıklı sayılarım bozulur mu?', 'Evet, bozulabilir. Virgül ve nokta noktalama işareti olduğundan "3,5" girdisi "35" olur. Sayı içeren metinlerde işlem öncesi sayıları ayırmanız ya da sonucu kontrol etmeniz gerekir.'],
    ['Kelimeler birbirine yapıştı, nasıl önlerim?', '"İşaretin yerine" ayarını "Boşluk koy" yapın. Böylece çizgi ya da eğik çizgiyle bağlanmış kelimeler ayrı kalır; fazla boşluklar da kendiliğinden teke indirilir.'],
    ['Satır sonları ve paragraflar korunuyor mu?', 'Evet. Satır sonu karakterlerine dokunulmaz. Boşluk toplama ayarı yalnızca satır içindeki boşlukları ve satır uçlarını etkiler.'],
    ['Emojiler siliniyor mu?', 'Varsayılan ayarda hayır. Emojilerin çoğu simge sınıfında olduğu için "Simgeler" ayarı "Sil" yapıldığında kaldırılır.'],
    ['Metnim sunucuya gönderiliyor mu?', 'Hayır. Temizleme tümüyle tarayıcınızda yapılır; metin hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['rakamlari-sil', 'bosluk-temizle', 'emoji-temizle', 'html-etiket-temizle', 'kelime-frekansi', 'turkce-karakter-donustur'],
};
