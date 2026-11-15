export default {
  slug: 'csv-html-tablo',
  title: 'CSV\'den HTML Tablo Oluşturma',
  h1Tail: 'table kodu üret',
  pageTitle: 'CSV\'den HTML Tablo Oluşturma – CSV HTML Table Dönüştürücü',
  description: 'CSV ya da Excel\'den kopyalanan veriyi temiz HTML tablo koduna çevirin. thead, tbody ve th etiketleri doğru kurulur, özel karakterler kaçırılır; veri yüklenmez.',
  card: 'CSV verisini thead, tbody ve başlık hücreleri doğru kurulmuş temiz bir HTML tablo koduna dönüştürün.',
  category: 'gelistirici',
  keywords: ['csv html tablo', 'csv to html table', 'excel html tablo', 'html tablo kodu oluşturma', 'csv tabloya çevirme', 'html table oluşturucu', 'tablo kodu üretme'],
  lead: 'CSV metnini ya da hesap tablosundan kopyaladığınız hücreleri yapıştırın; araç bunları <code>thead</code>, <code>tbody</code> ve <code>th</code> etiketleriyle kurulmuş, erişilebilir ve temiz bir <strong>HTML tablo koduna</strong> çevirir.',
  button: 'Tablo kodu oluştur',
  inputs: [
    { id: 'csv', label: 'CSV verisi', type: 'textarea', rows: 8, placeholder: 'Ürün,Fiyat,Stok\nKalem,12,150\nDefter,40,80' },
    { id: 'ayrac', label: 'Ayraç', type: 'select', options: [['oto', 'Otomatik algıla'], ['virgul', 'Virgül (,)'], ['nv', 'Noktalı virgül (;)'], ['sekme', 'Sekme']] },
    { id: 'baslik', label: 'İlk satır', type: 'select', options: [['evet', 'Başlık satırı (th)'], ['hayir', 'Veri satırı (başlık yok)']] },
    { id: 'sinif', label: 'CSS sınıfı (isteğe bağlı)', type: 'text', placeholder: 'tablo' },
    { id: 'aciklama', label: 'Tablo başlığı – caption (isteğe bağlı)', type: 'text', placeholder: 'Ürün listesi' },
    { id: 'bicim', label: 'Kod biçimi', type: 'select', options: [['girintili', 'Girintili (okunaklı)'], ['tek', 'Tek satır (sıkışık)']] },
  ],
  compute(v, h) {
    const s = String(v.csv ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Tabloya çevrilecek CSV verisini "CSV verisi" alanına yapıştırın.');
    let d;
    if (v.ayrac === 'virgul') d = ',';
    else if (v.ayrac === 'nv') d = ';';
    else if (v.ayrac === 'sekme') d = '\t';
    else {
      const say = { ',': 0, ';': 0, '\t': 0 };
      let q = false;
      for (const c of s) {
        if (c === '"') q = !q;
        else if (!q && (c === '\n' || c === '\r')) break;
        else if (!q && c in say) say[c]++;
      }
      d = say[';'] > say[','] && say[';'] >= say['\t'] ? ';' : say['\t'] > say[','] ? '\t' : ',';
    }
    const satirlar = [];
    let satir = [], alan = '', q = false, tirnakli = false;
    const bitir = () => { satir.push(tirnakli ? alan : alan.trim()); alan = ''; tirnakli = false; };
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (q) {
        if (c === '"') { if (s[i + 1] === '"') { alan += '"'; i++; } else q = false; }
        else alan += c;
      } else if (c === '"' && alan.trim() === '') { q = true; tirnakli = true; alan = ''; }
      else if (c === d) bitir();
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && s[i + 1] === '\n') i++;
        bitir(); satirlar.push(satir); satir = [];
      } else alan += c;
    }
    if (q) h.err('CSV içinde açılıp kapatılmamış bir çift tırnak var. Tırnak içeren hücrelerde tırnağı iki kez ("") yazın.');
    if (alan !== '' || satir.length) { bitir(); satirlar.push(satir); }
    const dolu = satirlar.filter((r) => !(r.length === 1 && r[0] === ''));
    if (!dolu.length) h.err('CSV verisinde dolu satır bulunamadı.');

    const sinif = String(v.sinif ?? '').trim();
    if (sinif !== '' && !/^[A-Za-z_-][A-Za-z0-9_ -]*$/.test(sinif)) h.err('CSS sınıfı yalnızca harf, rakam, tire ve alt çizgi içerebilir; birden çok sınıfı boşlukla ayırın (örn. tablo tablo-cizgili).');
    const kac = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/\r\n|\r|\n/g, '<br>');
    const kolon = Math.max(...dolu.map((r) => r.length));
    const tamamla = (r) => r.concat(Array(kolon - r.length).fill(''));
    const baslikVar = v.baslik !== 'hayir';
    const bas = baslikVar ? tamamla(dolu[0]) : null;
    const veri = (baslikVar ? dolu.slice(1) : dolu).map(tamamla);
    const girintili = v.bicim !== 'tek';
    const L = [];
    const ekle = (d2, t) => L.push(girintili ? '  '.repeat(d2) + t : t);
    ekle(0, sinif ? `<table class="${sinif}">` : '<table>');
    const cap = String(v.aciklama ?? '').trim();
    if (cap) ekle(1, `<caption>${kac(cap)}</caption>`);
    if (bas) {
      ekle(1, '<thead>'); ekle(2, '<tr>');
      for (const b of bas) ekle(3, `<th scope="col">${kac(b)}</th>`);
      ekle(2, '</tr>'); ekle(1, '</thead>');
    }
    if (veri.length) {
      ekle(1, '<tbody>');
      for (const r of veri) {
        ekle(2, '<tr>');
        for (const c of r) ekle(3, `<td>${kac(c)}</td>`);
        ekle(2, '</tr>');
      }
      ekle(1, '</tbody>');
    }
    ekle(0, '</table>');
    const eksik = dolu.some((r) => r.length !== kolon);
    return {
      rows: [
        ['Veri satırı', h.fmt(veri.length, 0)],
        ['Sütun sayısı', h.fmt(kolon, 0)],
        ['Ayraç', d === ',' ? 'virgül' : d === ';' ? 'noktalı virgül' : 'sekme'],
      ],
      text: L.join(girintili ? '\n' : ''),
      note: eksik
        ? 'Bazı satırlarda hücre sayısı eksikti; tablo düzgün görünsün diye bu satırlar boş hücrelerle tamamlandı.'
        : 'Kod yalnızca yapıyı içerir; kenarlık, renk ve boşlukları kendi CSS dosyanızda tanımlayın.',
    };
  },
  cases: [
    { in: { csv: 'ad,yas\nAli,30' }, text: '<table>\n  <thead>\n    <tr>\n      <th scope="col">ad</th>\n      <th scope="col">yas</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Ali</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n</table>', out: { 'Veri satırı': '1', 'Sütun sayısı': '2', 'Ayraç': 'virgül' } },
    { in: { csv: '1;2\n3;4', baslik: 'hayir', sinif: 'tablo', bicim: 'tek' }, text: '<table class="tablo"><tbody><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></tbody></table>', out: { 'Veri satırı': '2', 'Ayraç': 'noktalı virgül' } },
    { in: { csv: 'ad,not\n"A & B","x < y"', bicim: 'tek' }, text: '<table><thead><tr><th scope="col">ad</th><th scope="col">not</th></tr></thead><tbody><tr><td>A &amp; B</td><td>x &lt; y</td></tr></tbody></table>' },
    { in: { csv: 'a,b,c\n1,2', bicim: 'tek', aciklama: 'Liste' }, text: '<table><caption>Liste</caption><thead><tr><th scope="col">a</th><th scope="col">b</th><th scope="col">c</th></tr></thead><tbody><tr><td>1</td><td>2</td><td></td></tr></tbody></table>', out: { 'Sütun sayısı': '3' } },
    { in: { csv: 'x\ty\n1\t2', ayrac: 'sekme', bicim: 'tek' }, text: '<table><thead><tr><th scope="col">x</th><th scope="col">y</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>', out: { 'Ayraç': 'sekme' } },
    { in: { csv: 'adres\n"Atatürk Cad.\nNo: 5"', bicim: 'tek' }, text: '<table><thead><tr><th scope="col">adres</th></tr></thead><tbody><tr><td>Atatürk Cad.<br>No: 5</td></tr></tbody></table>' },
    { in: { csv: 'ay,ciro\nOcak,100\n\nŞubat,120\nMart,90' }, out: { 'Veri satırı': '3', 'Sütun sayısı': '2' } },
    { in: { csv: '' }, error: true },
    { in: { csv: 'a,b\n"1,2' }, error: true },
    { in: { csv: 'a,b\n1,2', sinif: 'a"b' }, error: true },
  ],
  howto: [
    'Verinizi CSV olarak ya da doğrudan hesap tablosundan kopyalayıp "CSV verisi" alanına yapıştırın.',
    'Ayraç otomatik algılanır; sonuç beklediğiniz gibi değilse listeden virgül, noktalı virgül ya da sekmeyi elle seçin.',
    'İlk satırın başlık olup olmadığını belirtin. İsterseniz tabloya bir CSS sınıfı ve bir tablo başlığı (caption) ekleyin.',
    'Kod biçimini seçip "Tablo kodu oluştur" düğmesine basın.',
    'Üretilen kodu kopyalayıp sayfanızın HTML\'ine, blog yazınıza ya da e-posta şablonunuza yapıştırın.',
  ],
  sections: [
    { h: 'Elle tablo yazmak yerine neden dönüştürmeli?', p: [
      'Bir fiyat listesini, ders programını ya da karşılaştırma tablosunu web sayfasına koymak için her hücreyi tek tek etiketlemek gerekir. On satır ve beş sütunluk küçük bir tabloda bile elliden fazla hücre etiketi, on satır etiketi ve bunların kapanışları yazılır; bir tanesini unutmak tablonun kaymasına yol açar. Veri çoğunlukla zaten bir hesap tablosunda durur. Bu araç, hücreleri kopyalayıp yapıştırmanızla hatasız ve düzgün girintili tablo kodunu saniyeler içinde üretir.',
      'Çıktı herhangi bir çerçeveye ya da eklentiye bağlı değildir. İçerik yönetim sistemlerinin HTML düzenleme kipine, statik sayfalara, dokümantasyon dosyalarına ve bülten şablonlarına doğrudan yapıştırılabilir.',
    ] },
    { h: 'Üretilen kodun yapısı', p: [
      'Araç yalnızca satır ve hücre yığını üretmez, tablonun anlamsal iskeletini de kurar. İlk satır başlık olarak işaretlendiğinde bu satır <code>thead</code> bölümüne, geri kalan satırlar <code>tbody</code> bölümüne yerleşir. Başlık hücreleri <code>td</code> değil <code>th</code> olarak yazılır ve her birine <code>scope="col"</code> özniteliği eklenir.',
      'Bu ayrıntılar görünüşte küçük ama işlevseldir. Ekran okuyucular, bir veri hücresine gelindiğinde ait olduğu sütunun başlığını bu işaretler sayesinde seslendirir. Tarayıcılar uzun tabloları yazdırırken <code>thead</code> içeriğini her sayfanın başında yineleyebilir. CSS tarafında başlık satırına ayrı arka plan vermek ya da tablo gövdesine zebra deseni uygulamak da ek sınıf yazmadan mümkün olur.',
      'İsteğe bağlı <code>caption</code> alanı tabloya görünür bir başlık ekler; tablonun neyi gösterdiğini hem ziyaretçiye hem yardımcı teknolojilere anlatmanın doğru yolu budur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İki satırlık şu veriyi düşünün: ilk satır <code>ad,yas</code>, ikinci satır <code>Ali,30</code>. İlk satır başlık olarak seçiliyken araç bir <code>table</code> öğesi açar; içine <code>thead</code> ve tek bir satır koyar, bu satırda <code>ad</code> ve <code>yas</code> metinlerini taşıyan iki <code>th scope="col"</code> hücresi bulunur. Ardından <code>tbody</code> gelir ve içinde <code>Ali</code> ile <code>30</code> değerlerini taşıyan iki <code>td</code> hücreli tek satır yer alır. Girintili biçimde çıktı on dört satırdır. Sonuç kutusunun üstünde "Veri satırı: 1", "Sütun sayısı: 2" ve "Ayraç: virgül" bilgilerini görürsünüz.',
      'Aynı veriyi "Tek satır" biçiminde üretirseniz bütün etiketler arada boşluk olmadan art arda yazılır. Görünüm aynıdır; yalnızca kod daha az yer kaplar.',
    ] },
    { h: 'Özel karakterler ve hücre içeriği', p: [
      'Hücrelerdeki metin HTML olarak değil düz metin olarak ele alınır. <code>&</code>, <code><</code>, <code>></code> ve çift tırnak karakterleri karşılık gelen HTML varlıklarına çevrilir. Böylece "A & B" gibi bir firma adı ya da "x < y" gibi bir ifade sayfada aynen görünür ve tablonun yapısını bozmaz. Bu aynı zamanda bir güvenlik önlemidir: başkasından gelen bir CSV dosyasındaki etiketler sayfanızda çalışan koda dönüşmez.',
      'Çift tırnak içine alınmış bir hücrede satır sonu varsa (örneğin iki satırlı bir adres), bu satır sonu <code>br</code> etiketine çevrilir ve hücrede alt alta görünür. Hücre içinde kalın yazı ya da bağlantı gibi biçimlendirme istiyorsanız kodu ürettikten sonra ilgili hücreyi elle düzenleyebilirsiniz.',
    ] },
    { h: 'Ayraç ve satır kuralları', ul: [
      'Ayraç ilk satırdaki virgül, noktalı virgül ve sekme sayılarına göre tahmin edilir. Türkçe ayarlı hesap tablosu programlarının kaydettiği CSV dosyaları genellikle noktalı virgül kullanır; hücreleri doğrudan kopyaladığınızda ise ayraç sekmedir.',
      'İçinde ayraç geçen hücreler çift tırnak içine alınmalıdır: <code>"Kaya, Mehmet"</code>. Hücre içindeki çift tırnak iki kez yazılır.',
      'Tümüyle boş satırlar atlanır.',
      'Bir satırda diğerlerinden az hücre varsa satır boş hücrelerle tamamlanır ve sonucun altında bu durum not edilir. Sütun sayısı en uzun satıra göre belirlenir.',
      'Hücre başındaki ve sonundaki boşluklar silinir; tırnak içindeki hücreler olduğu gibi korunur.',
    ] },
    { h: 'Tabloyu biçimlendirme ve mobil görünüm', p: [
      'Üretilen kod bilerek stil içermez; kenarlık, dolgu ve renk gibi özellikler CSS\'in işidir. "CSS sınıfı" alanına bir sınıf adı yazarsanız tablo etiketine eklenir ve stil dosyanızdan bu sınıfla hedefleyebilirsiniz. Birden fazla sınıfı boşlukla ayırarak yazabilirsiniz. Hazır bir tema ya da arayüz kitaplığı kullanıyorsanız onun tablo sınıfını buraya girmeniz yeterlidir.',
      'Çok sütunlu tablolar dar ekranlarda sayfayı yana taşırabilir. En basit çözüm, tabloyu yatay kaydırma tanımlanmış bir kapsayıcı öğenin içine almaktır; böylece sayfa değil yalnızca tablo kayar. Sayısal sütunları sağa hizalamak da okunabilirliği artırır.',
      'E-posta şablonlarında tablo kullanırken posta istemcilerinin harici stil dosyalarını çoğunlukla yok saydığını unutmayın; orada biçimlendirmeyi satır içi stil olarak eklemeniz gerekir.',
    ] },
  ],
  faq: [
    ['Excel tablosunu HTML\'e nasıl çeviririm?', 'Hesap tablosunda ilgili hücreleri seçip kopyalayın ve bu sayfadaki CSV alanına yapıştırın. Kopyalanan hücreler sekmeyle ayrılır ve otomatik algılanır. "Tablo kodu oluştur" düğmesine bastığınızda HTML kodu hazırdır.'],
    ['thead ve tbody kullanmak zorunlu mu?', 'Zorunlu değildir, tarayıcı bunlar olmadan da tabloyu gösterir. Ancak başlık ile gövdeyi ayırmak ekran okuyucular, yazdırma ve CSS ile biçimlendirme açısından açık yarar sağlar; bu yüzden araç bu yapıyı kurar.'],
    ['scope="col" ne işe yarar?', 'Başlık hücresinin bulunduğu sütunun tamamına ait olduğunu bildirir. Yardımcı teknolojiler bu bilgiyle her veri hücresini doğru başlıkla ilişkilendirir. Görünümü değiştirmez.'],
    ['Tablom kenarlıksız görünüyor, neden?', 'HTML tabloları varsayılan olarak kenarlıksız çizilir. Kenarlık, hücre dolgusu ve renkler CSS ile verilir. Tabloya bir sınıf ekleyip stil dosyanızda bu sınıf için kenarlık tanımlayabilirsiniz.'],
    ['Hücrelerin içine HTML etiketi yazabilir miyim?', 'CSV içindeki etiketler güvenlik için düz metne çevrilir ve sayfada yazı olarak görünür. Biçimlendirme gerekiyorsa üretilen kodda ilgili hücreyi sonradan elle düzenleyin.'],
    ['İlk sütunu satır başlığı yapabilir miyim?', 'Araç yalnızca ilk satırı başlık olarak işaretler. İlk sütunun da başlık olmasını istiyorsanız üretilen kodda o hücrelerin etiketini th yapıp scope="row" özniteliği ekleyebilirsiniz.'],
    ['Hücre birleştirme (colspan, rowspan) destekleniyor mu?', 'Hayır. CSV biçiminde birleştirilmiş hücre kavramı bulunmadığından her hücre ayrı yazılır. Birleştirme gerekiyorsa kodu ürettikten sonra ilgili hücrelere bu öznitelikleri elle ekleyin.'],
    ['Yapıştırdığım veri bir yere gönderiliyor mu?', 'Hayır. Dönüştürme tamamen tarayıcınızda yapılır; tablonuzdaki bilgiler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['html-tablo-olustur', 'csv-markdown-tablo', 'csv-json-donustur', 'csv-sql-donustur', 'html-kodla-coz', 'csv-excel'],
};
