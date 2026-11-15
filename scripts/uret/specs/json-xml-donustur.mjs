export default {
  slug: 'json-xml-donustur',
  title: 'JSON XML Dönüştürücü',
  h1Tail: 'JSON ↔ XML',
  pageTitle: 'JSON XML Dönüştürücü – JSON\'dan XML\'e, XML\'den JSON\'a Çevirme',
  description: 'JSON verisini XML\'e, XML belgesini JSON\'a tarayıcınızda dönüştürün. Öznitelikler, diziler ve özel karakterler doğru aktarılır; veri sunucuya gönderilmez.',
  card: 'JSON\'u XML\'e ya da XML\'i JSON\'a çevirin; öznitelikler @ ile, tekrarlayan öğeler dizi olarak aktarılır.',
  category: 'gelistirici',
  keywords: ['json xml dönüştürme', 'xml json çevirme', 'json to xml', 'xml to json', 'json xml çevirici', 'xml dönüştürücü', 'json dönüştürücü online'],
  lead: 'JSON metnini XML belgesine ya da XML belgesini JSON\'a çevirin. Araç öznitelikleri <code>@</code> ön ekiyle, tekrarlayan öğeleri dizi olarak eşler ve <code>&</code>, <code><</code>, <code>></code> gibi özel karakterleri kurala uygun biçimde kaçırır.',
  button: 'Dönüştür',
  inputs: [
    { id: 'girdi', label: 'JSON ya da XML', type: 'textarea', rows: 10, placeholder: '{"kisi": {"ad": "Ali", "yas": 30}}' },
    { id: 'yon', label: 'Dönüşüm yönü', type: 'select', options: [['jx', 'JSON → XML'], ['xj', 'XML → JSON']] },
    { id: 'kok', label: 'Kök öğe adı (JSON → XML)', type: 'text', value: 'kok', hint: 'XML tek bir kök öğe ister; JSON içeriği bu öğenin içine yazılır.' },
    { id: 'girinti', label: 'Girinti', type: 'select', options: [['2', '2 boşluk'], ['4', '4 boşluk'], ['0', 'Sıkışık (tek satır)']] },
  ],
  compute(v, h) {
    const s = String(v.girdi ?? '').replace(/^﻿/, '');
    if (s.trim() === '') h.err('Dönüştürülecek JSON ya da XML metnini yapıştırın.');
    const gir = v.girinti === '0' ? 0 : v.girinti === '4' ? 4 : 2;
    let sayac = 0;

    if (v.yon !== 'xj') {
      // ---------- JSON → XML ----------
      let veri;
      try { veri = JSON.parse(s); }
      catch { h.err('Girdi geçerli bir JSON değil. Anahtarların çift tırnak içinde olduğunu ve parantezlerin kapandığını denetleyin; XML yapıştırdıysanız yönü "XML → JSON" yapın.'); }
      const adGecerli = (t) => /^[\p{L}_][\p{L}\p{N}_.\-]*$/u.test(t);
      const kok = String(v.kok ?? '').trim() || 'kok';
      if (!adGecerli(kok)) h.err('Kök öğe adı harf ya da alt çizgiyle başlamalı; boşluk ve özel karakter içermemeli (örn. kok, liste, veri).');
      const ad = (t) => {
        let a = String(t).replace(/[^\p{L}\p{N}_.\-]/gu, '_');
        if (a === '' || !/^[\p{L}_]/u.test(a)) a = '_' + a;
        return a;
      };
      const kac = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const kacOz = (t) => kac(t).replace(/"/g, '&quot;');
      const satirlar = [];
      const yaz = (isim, deger, d) => {
        const pad = ' '.repeat(gir * d);
        if (Array.isArray(deger)) deger = { oge: deger };
        sayac++;
        if (deger === null || deger === undefined) { satirlar.push(`${pad}<${isim}/>`); return; }
        if (typeof deger !== 'object') { satirlar.push(`${pad}<${isim}>${kac(deger)}</${isim}>`); return; }
        let oz = '', metin = null;
        const cocuk = [];
        for (const [k, val] of Object.entries(deger)) {
          if (k === '#text') metin = val === null ? '' : String(val);
          else if (k[0] === '@' && k.length > 1 && (val === null || typeof val !== 'object')) oz += ` ${ad(k.slice(1))}="${kacOz(val === null ? '' : val)}"`;
          else cocuk.push([ad(k[0] === '@' ? k.slice(1) : k), val]);
        }
        if (!cocuk.length) {
          satirlar.push(metin === null || metin === '' ? `${pad}<${isim}${oz}/>` : `${pad}<${isim}${oz}>${kac(metin)}</${isim}>`);
          return;
        }
        satirlar.push(`${pad}<${isim}${oz}>`);
        if (metin !== null && metin !== '') satirlar.push(' '.repeat(gir * (d + 1)) + kac(metin));
        for (const [k, val] of cocuk) {
          if (Array.isArray(val)) for (const x of val) yaz(k, x, d + 1);
          else yaz(k, val, d + 1);
        }
        satirlar.push(`${pad}</${isim}>`);
      };
      yaz(kok, veri, 0);
      satirlar.unshift('<?xml version="1.0" encoding="UTF-8"?>');
      return {
        rows: [['Dönüşüm', 'JSON → XML'], ['Öğe sayısı', h.fmt(sayac, 0)], ['Kök öğe', kok]],
        text: satirlar.join(gir ? '\n' : ''),
        note: 'Diziler aynı adlı öğelerin tekrarı olarak, "@" ile başlayan anahtarlar öznitelik olarak, null değerler boş öğe olarak yazıldı.',
      };
    }

    // ---------- XML → JSON ----------
    let i = 0;
    const n = s.length;
    const yer = () => `${s.slice(0, i).split('\n').length}. satır`;
    const coz = (t) => t.replace(/&(#x[0-9a-fA-F]+|#\d+|lt|gt|amp|quot|apos);/g, (m, e) => {
      if (e === 'lt') return '<';
      if (e === 'gt') return '>';
      if (e === 'amp') return '&';
      if (e === 'quot') return '"';
      if (e === 'apos') return '\'';
      const kod = e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return kod > 0 && kod <= 0x10ffff ? String.fromCodePoint(kod) : m;
    });
    const atla = () => {
      for (;;) {
        while (i < n && /\s/.test(s[i])) i++;
        let son;
        if (s.startsWith('<?', i)) son = s.indexOf('?>', i), son = son < 0 ? -1 : son + 2;
        else if (s.startsWith('<!--', i)) son = s.indexOf('-->', i), son = son < 0 ? -1 : son + 3;
        else if (s.startsWith('<!DOCTYPE', i)) son = s.indexOf('>', i), son = son < 0 ? -1 : son + 1;
        else return;
        if (son < 0) h.err(`XML hatası (${yer()}): açılan bildirim ya da yorum kapatılmamış.`);
        i = son;
      }
    };
    const AD = /[^\s<>\/=!?"'&]+/y;
    const OZ = /\s+([^\s<>\/=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/y;
    const BIT = /\s*(\/?)>/y;
    const KAPA = /<\/([^\s<>]+)\s*>/y;
    const oge = () => {
      i++; // '<'
      AD.lastIndex = i;
      const m = AD.exec(s);
      if (!m) h.err(`XML hatası (${yer()}): "<" işaretinden sonra geçerli bir öğe adı yok. Metin içindeki "<" işaretini &lt; olarak yazın.`);
      const dugum = { ad: m[0], oz: [], cocuk: [], metin: '' };
      i = AD.lastIndex;
      sayac++;
      for (;;) {
        OZ.lastIndex = i;
        const a = OZ.exec(s);
        if (!a) break;
        dugum.oz.push([a[1], coz(a[2] ?? a[3])]);
        i = OZ.lastIndex;
      }
      BIT.lastIndex = i;
      const b = BIT.exec(s);
      if (!b) h.err(`XML hatası (${yer()}): <${dugum.ad}> etiketi düzgün kapatılmamış ya da özniteliği tırnak içinde değil.`);
      i = BIT.lastIndex;
      if (b[1] === '/') return dugum;
      for (;;) {
        if (i >= n) h.err(`XML hatası: <${dugum.ad}> öğesi kapatılmamış; </${dugum.ad}> bekleniyor.`);
        if (s.startsWith('</', i)) {
          KAPA.lastIndex = i;
          const k = KAPA.exec(s);
          if (!k || k[1] !== dugum.ad) h.err(`XML hatası (${yer()}): <${dugum.ad}> öğesi için </${dugum.ad}> bekleniyordu, başka bir kapanış etiketi geldi.`);
          i = KAPA.lastIndex;
          return dugum;
        }
        if (s.startsWith('<!--', i)) { const e = s.indexOf('-->', i); if (e < 0) h.err(`XML hatası (${yer()}): yorum kapatılmamış.`); i = e + 3; continue; }
        if (s.startsWith('<![CDATA[', i)) { const e = s.indexOf(']]>', i); if (e < 0) h.err(`XML hatası (${yer()}): CDATA bölümü kapatılmamış.`); dugum.metin += s.slice(i + 9, e); i = e + 3; continue; }
        if (s.startsWith('<?', i)) { const e = s.indexOf('?>', i); if (e < 0) h.err(`XML hatası (${yer()}): işlem yönergesi kapatılmamış.`); i = e + 2; continue; }
        if (s[i] === '<') { dugum.cocuk.push(oge()); continue; }
        let e = s.indexOf('<', i);
        if (e < 0) e = n;
        dugum.metin += coz(s.slice(i, e));
        i = e;
      }
    };
    atla();
    if (i >= n || s[i] !== '<') h.err('Girdi XML gibi görünmüyor; belge "<" ile başlayan bir kök öğe içermeli. JSON yapıştırdıysanız yönü "JSON → XML" yapın.');
    const kokDugum = oge();
    atla();
    if (i < n) h.err(`XML hatası (${yer()}): kök öğeden sonra fazladan içerik var. Bir XML belgesinde yalnızca bir kök öğe bulunur.`);
    const cevir = (d) => {
      const metin = d.metin.trim();
      if (!d.oz.length && !d.cocuk.length) return metin === '' ? null : metin;
      const o = {};
      for (const [k, val] of d.oz) o['@' + k] = val;
      for (const c of d.cocuk) {
        const val = cevir(c);
        if (Object.prototype.hasOwnProperty.call(o, c.ad)) {
          if (!Array.isArray(o[c.ad]) || !o[c.ad].__dizi) { const dz = [o[c.ad]]; Object.defineProperty(dz, '__dizi', { value: true }); o[c.ad] = dz; }
          o[c.ad].push(val);
        } else o[c.ad] = val;
      }
      if (metin !== '') o['#text'] = metin;
      return o;
    };
    const sonuc = { [kokDugum.ad]: cevir(kokDugum) };
    return {
      rows: [['Dönüşüm', 'XML → JSON'], ['Öğe sayısı', h.fmt(sayac, 0)], ['Kök öğe', kokDugum.ad]],
      text: JSON.stringify(sonuc, null, gir),
      note: 'XML\'de veri türü olmadığından bütün değerler dizgi olarak aktarıldı; öznitelikler "@", karışık içerikteki metin "#text" anahtarıyla yazıldı.',
    };
  },
  cases: [
    { in: { girdi: '{"kisi":{"ad":"Ali","yas":30}}', yon: 'jx' }, text: '<?xml version="1.0" encoding="UTF-8"?>\n<kok>\n  <kisi>\n    <ad>Ali</ad>\n    <yas>30</yas>\n  </kisi>\n</kok>', out: { 'Dönüşüm': 'JSON → XML', 'Öğe sayısı': '4' } },
    { in: { girdi: '<kisi><ad>Ali</ad><yas>30</yas></kisi>', yon: 'xj' }, text: '{\n  "kisi": {\n    "ad": "Ali",\n    "yas": "30"\n  }\n}', out: { 'Dönüşüm': 'XML → JSON', 'Öğe sayısı': '3', 'Kök öğe': 'kisi' } },
    { in: { girdi: '{"urun":[{"@id":"1","#text":"Kalem"},{"@id":"2","#text":"Defter"}]}', yon: 'jx', kok: 'liste' }, text: '<?xml version="1.0" encoding="UTF-8"?>\n<liste>\n  <urun id="1">Kalem</urun>\n  <urun id="2">Defter</urun>\n</liste>' },
    { in: { girdi: '<?xml version="1.0"?>\n<liste>\n  <urun id="1">Kalem</urun>\n  <urun id="2">Defter</urun>\n  <bos/>\n</liste>', yon: 'xj', girinti: '0' }, text: '{"liste":{"urun":[{"@id":"1","#text":"Kalem"},{"@id":"2","#text":"Defter"}],"bos":null}}' },
    { in: { girdi: '{"not":"a < b & c","bos":null}', yon: 'jx', girinti: '0' }, text: '<?xml version="1.0" encoding="UTF-8"?><kok><not>a &lt; b &amp; c</not><bos/></kok>' },
    { in: { girdi: '<a>x &amp; y<![CDATA[ <z> ]]><!-- yorum --></a>', yon: 'xj', girinti: '0' }, text: '{"a":"x & y <z>"}' },
    { in: { girdi: '[1,2]', yon: 'jx', girinti: '0' }, text: '<?xml version="1.0" encoding="UTF-8"?><kok><oge>1</oge><oge>2</oge></kok>' },
    { in: { girdi: '<a><b></a>', yon: 'xj' }, error: true },
    { in: { girdi: '{ad: 1}', yon: 'jx' }, error: true },
    { in: { girdi: '{"a":1}', yon: 'jx', kok: '1 kok' }, error: true },
    { in: { girdi: '', yon: 'jx' }, error: true },
  ],
  howto: [
    'Dönüştürmek istediğiniz JSON ya da XML metnini "JSON ya da XML" alanına yapıştırın.',
    '"Dönüşüm yönü" listesinden JSON\'dan XML\'e mi, XML\'den JSON\'a mı çevireceğinizi seçin.',
    'JSON\'dan XML\'e çeviriyorsanız kök öğe adını yazın (varsayılan <code>kok</code>). XML\'den JSON\'a çeviride bu alan kullanılmaz.',
    'Girinti biçimini seçip "Dönüştür" düğmesine basın. Sonuç kutusundaki metni kopyalayarak dosyanıza ya da isteğinize ekleyin.',
  ],
  sections: [
    { h: 'JSON ve XML neden birbirine çevrilir?', p: [
      'JSON ve XML aynı işi yapar: yapılandırılmış veriyi metin olarak taşır. Web uygulamaları ve mobil servisler bugün çoğunlukla JSON konuşur; buna karşılık kurumsal sistemlerde, SOAP servislerinde, e-fatura ve e-defter gibi resmî belge biçimlerinde, RSS beslemelerinde ve pek çok muhasebe ya da stok programının dışa aktarım dosyalarında XML kullanılır. İki dünyayı birbirine bağlayan her entegrasyonda bir noktada bu dönüşüme ihtiyaç duyulur.',
      'İki biçim birebir örtüşmez. XML\'de öznitelik, öğe sırası, karışık içerik ve ad alanı kavramları vardır; JSON\'da ise sayı, mantıksal değer, null ve dizi gibi veri türleri bulunur. Bu yüzden dönüşüm her zaman bir eşleme kuralına dayanır. Bu araç yaygın kabul görmüş sade bir kural kümesi kullanır ve aşağıda açıkça anlatır; böylece çıktının neden o biçimde olduğunu bilirsiniz.',
    ] },
    { h: 'JSON\'dan XML\'e eşleme kuralları', ul: [
      '<strong>Kök öğe:</strong> XML belgesinde tek bir kök bulunmak zorundadır. JSON içeriği, adını sizin verdiğiniz kök öğenin içine yazılır.',
      '<strong>Nesne anahtarı → öğe:</strong> <code>{"ad": "Ali"}</code> girdisi <code><ad>Ali</ad></code> olur.',
      '<strong>Dizi → tekrarlayan öğe:</strong> <code>{"urun": ["a", "b"]}</code> girdisi iki ayrı <code>urun</code> öğesi üretir. En dışta ya da başka bir dizinin içinde duran adsız diziler <code>oge</code> adlı öğelerle yazılır.',
      '<strong>@ ile başlayan anahtar → öznitelik:</strong> <code>{"@id": "1"}</code> anahtarı öğenin <code>id="1"</code> özniteliği olur.',
      '<strong>#text → öğe metni:</strong> hem özniteliği hem metni olan öğeler için kullanılır.',
      '<strong>null → boş öğe:</strong> <code>{"bos": null}</code> girdisi <code><bos/></code> olarak yazılır.',
      '<strong>Geçersiz adlar:</strong> boşluk içeren ya da rakamla başlayan anahtarlar XML adı olamaz; boşluk ve özel karakterler alt çizgiye çevrilir, rakamla başlayan adın başına alt çizgi eklenir.',
    ] },
    { h: 'XML\'den JSON\'a eşleme kuralları', ul: [
      'Kök öğenin adı, JSON nesnesinin tek anahtarı olur.',
      'Yalnızca metin içeren öğe dizgiye dönüşür: <code><yas>30</yas></code> çıktıda <code>"yas": "30"</code> olur.',
      'Aynı adlı kardeş öğeler tek bir dizide toplanır. Öğe yalnızca bir kez geçiyorsa dizi değil tek değer üretilir.',
      'Öznitelikler <code>@</code> ön ekiyle, öğenin kendi metni <code>#text</code> anahtarıyla yazılır.',
      'İçi boş öğeler <code>null</code> olur. Yorumlar, XML bildirimi ve işlem yönergeleri atlanır; CDATA bölümlerinin içeriği düz metin olarak alınır.',
      've işareti, küçüktür, büyüktür, çift tırnak ve kesme işareti için tanımlı beş standart XML varlığı ile sayısal karakter başvuruları çözülerek gerçek karakterlere çevrilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '<code>{"kisi":{"ad":"Ali","yas":30}}</code> girdisini "JSON → XML" yönünde, kök adı <code>kok</code> ve 2 boşluk girintiyle dönüştürdüğünüzde, XML bildiriminin ardından dört öğe yazılır: en dışta <code>kok</code>, onun içinde <code>kisi</code>, onun da içinde <code><ad>Ali</ad></code> ve <code><yas>30</yas></code>. Sonuç kutusunun üstündeki "Öğe sayısı" satırında 4 görürsünüz.',
      'Ters yönde <code><kisi><ad>Ali</ad><yas>30</yas></kisi></code> belgesini verdiğinizde üç öğe okunur ve <code>{"kisi": {"ad": "Ali", "yas": "30"}}</code> elde edilir. Dikkat edin: yaş değeri artık tırnak içindedir. XML metninde 30\'un sayı mı yoksa yazı mı olduğunu söyleyen bir bilgi yoktur; araç tahmin yürütmek yerine her değeri dizgi olarak bırakır. Posta kodu, telefon ya da vergi numarası gibi baştaki sıfırı önemli alanların bozulmaması için bu bilinçli bir tercihtir.',
    ] },
    { h: 'Gidiş dönüşte nelere dikkat etmeli?', p: [
      'Bir veriyi JSON\'dan XML\'e, sonra tekrar JSON\'a çevirdiğinizde her zaman başladığınız metni elde etmezsiniz. Üç tipik fark vardır. Birincisi, sayılar ve mantıksal değerler dönüşte dizgi olur. İkincisi, tek öğeli bir dizi XML\'de tek bir öğe olarak göründüğü için dönüşte dizi olmaktan çıkar; alıcı kodunuz dizi bekliyorsa bunu ayrıca ele almanız gerekir. Üçüncüsü, dönüşte en dışa kök öğenin adı eklenir.',
      'Ad alanı ön ekleri (<code>soap:Body</code> gibi) adın parçası olarak aynen korunur, ancak ad alanı çözümlemesi yapılmaz. Metin ile alt öğelerin iç içe geçtiği karışık içerikte metin parçaları birleştirilip tek bir <code>#text</code> değerine yazılır; parçaların öğeler arasındaki konumu korunmaz. Belge türü tanımı içeren (iç alt kümeli DOCTYPE) belgeler ve özel tanımlı varlıklar desteklenmez. Resmî bir şemaya uyması gereken belgelerde çıktıyı ilgili şema doğrulayıcısından geçirmeniz gerekir.',
    ] },
  ],
  faq: [
    ['JSON dizileri XML\'de nasıl gösterilir?', 'XML\'de dizi kavramı yoktur; bunun yerine aynı adlı öğe tekrarlanır. {"urun": ["Kalem", "Defter"]} girdisi iki ayrı urun öğesi üretir. Adı olmayan diziler için oge adlı öğeler kullanılır.'],
    ['XML özniteliklerini JSON\'da nasıl tutarım?', 'Öznitelikler anahtarın başına @ işareti konarak yazılır. id="1" özniteliği JSON\'da "@id": "1" olur. Aynı kural ters yönde de geçerlidir: @ ile başlayan anahtarlar XML\'e öznitelik olarak aktarılır.'],
    ['Sayılar XML\'den JSON\'a dönerken neden tırnak içinde?', 'XML\'de her içerik metindir; bir değerin sayı olup olmadığını belirten bilgi yalnızca ayrı bir şemada bulunur. Araç tahmin yürütmez ve baştaki sıfırların ya da uzun numaraların bozulmaması için tüm değerleri dizgi olarak aktarır.'],
    ['Kök öğe adı neden gerekli?', 'Geçerli bir XML belgesinde tam olarak bir kök öğe olmalıdır. JSON ise birden çok anahtarla ya da doğrudan bir diziyle başlayabilir. Bu yüzden içerik sizin belirlediğiniz bir kök öğenin içine alınır.'],
    ['Türkçe karakterli anahtarlar sorun çıkarır mı?', 'Hayır. XML adlarında Türkçe harfler kullanılabilir ve çıktı UTF-8 olarak bildirilir. Yalnızca boşluk ve noktalama gibi adlarda yasak olan karakterler alt çizgiye çevrilir.'],
    ['Metnin içindeki < ve & işaretleri ne olur?', 'JSON\'dan XML\'e çeviride bu işaretler kurala uygun kaçış dizilerine dönüştürülür, böylece belge bozulmaz. XML\'den JSON\'a çeviride ise kaçış dizileri çözülür ve gerçek karakterler yazılır.'],
    ['SOAP ya da e-fatura gibi ad alanlı XML dosyalarını çevirebilir miyim?', 'İçeriği JSON olarak incelemek için evet; ön ekli adlar aynen korunur. Ancak araç şema doğrulaması yapmaz ve ad alanlarını çözümlemez. Resmî belge üretmek için çıktıyı tek başına yeterli saymayın.'],
    ['Yapıştırdığım veri sunucuya gidiyor mu?', 'Hayır. Ayrıştırma ve dönüştürme tamamen tarayıcınızda çalışır; metniniz hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['xml-bicimlendir', 'json-bicimlendir', 'json-yaml-donustur', 'csv-json-donustur', 'json-kucult'],
};
