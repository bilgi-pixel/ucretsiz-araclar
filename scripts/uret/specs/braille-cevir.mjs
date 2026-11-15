export default {
  slug: 'braille-cevir',
  title: 'Braille Alfabesi Çevirici',
  h1Tail: 'metin ↔ kabartma yazı',
  pageTitle: 'Braille Alfabesi Çevirici – Metni Kabartma Yazıya Çevirme',
  description: 'Türkçe metni Braille (kabartma yazı) hücrelerine çevirin ya da Braille karakterlerini düz metne dönüştürün. Türkçe harfler, rakamlar ve noktalama desteklenir.',
  card: 'Türkçe metni Braille hücrelerine çevirin ya da Braille karakterlerini yeniden düz metne dönüştürün.',
  category: 'metin',
  keywords: ['braille çevirici', 'braille alfabesi', 'kabartma yazı', 'körler alfabesi', 'türkçe braille', 'metni braille çevirme', 'braille harfleri', 'altı nokta alfabesi'],
  lead: `Yazdığınız metni <strong>Braille alfabesinin</strong> altı noktalı hücrelerine çevirin ya da kopyaladığınız Braille karakterlerini düz yazıya dönüştürün. Araç Türkçe Braille düzenini kullanır: ç, ğ, ı, ö, ş ve ü harflerinin kendi hücreleri vardır, rakamlar sayı işaretiyle yazılır.`,
  button: 'Çevir',
  inputs: [
    { id: 'metin', label: 'Metin ya da Braille karakterleri', type: 'textarea', placeholder: 'Örn. merhaba dünya', wide: true },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kodla', 'Metin → Braille'], ['coz', 'Braille → Metin']] },
    { id: 'buyuk', label: 'Büyük harfler', type: 'select', options: [['yok', 'Büyük harf işareti koyma'], ['var', 'Büyük harf işareti (6. nokta) koy']], hint: 'Yalnızca metinden Braille\'e çeviride etkilidir' },
  ],
  compute(v, h) {
    const HARF = {
      a: '1', b: '12', c: '14', 'ç': '16', d: '145', e: '15', f: '124', g: '1245', 'ğ': '126', h: '125', 'ı': '35', i: '24',
      j: '245', k: '13', l: '123', m: '134', n: '1345', o: '135', 'ö': '246', p: '1234', q: '12345', r: '1235', s: '234',
      'ş': '146', t: '2345', u: '136', 'ü': '1256', v: '1236', w: '2456', x: '1346', y: '13456', z: '1356',
    };
    const NOKTA = { ',': '2', ';': '23', ':': '25', '.': '256', '?': '236', '!': '235', '-': '36', '\'': '3', '’': '3' };
    const hucre = (d) => { let k = 0; for (const c of d) k |= 1 << (Number(c) - 1); return String.fromCharCode(0x2800 + k); };
    const SAYI = hucre('3456'), BUYUK = hucre('6');
    const RAKAM = '1234567890', RAKAMHARF = 'abcdefghij';
    const kucult = (c) => (c === 'İ' ? 'i' : c === 'I' ? 'ı' : c.toLowerCase());
    const buyut = (c) => (c === 'i' ? 'İ' : c === 'ı' ? 'I' : c.toUpperCase());
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Çevrilecek metni ya da Braille karakterlerini yazın.');
    let cikti = '', hucreSayisi = 0, desteksiz = 0;
    if (v.yon === 'coz') {
      const TERS = {}, TERSN = {};
      for (const k of Object.keys(HARF)) TERS[hucre(HARF[k])] = k;
      for (const k of Object.keys(NOKTA)) if (k !== '’') TERSN[hucre(NOKTA[k])] = k;
      let sayi = false, buyukSonraki = false;
      for (const ch of ham) {
        const kod = ch.codePointAt(0);
        if (kod < 0x2800 || kod > 0x28FF) {
          sayi = false; buyukSonraki = false; cikti += ch;
          if (!/\s/.test(ch)) desteksiz++;
          continue;
        }
        hucreSayisi++;
        if (kod === 0x2800) { sayi = false; cikti += ' '; continue; }
        if (ch === SAYI) { sayi = true; continue; }
        if (ch === BUYUK) { buyukSonraki = true; continue; }
        const harf = TERS[ch];
        if (sayi && harf !== undefined && RAKAMHARF.includes(harf)) { cikti += RAKAM[RAKAMHARF.indexOf(harf)]; continue; }
        sayi = false;
        if (harf !== undefined) { cikti += buyukSonraki ? buyut(harf) : harf; buyukSonraki = false; continue; }
        buyukSonraki = false;
        if (TERSN[ch] !== undefined) { cikti += TERSN[ch]; continue; }
        cikti += ch; desteksiz++;
      }
      if (!hucreSayisi) h.err('Girdide Braille karakteri bulunamadı. Düz metni çevirmek için yönü "Metin → Braille" seçin.');
    } else {
      let sayi = false;
      for (const ch of ham) {
        if (RAKAM.includes(ch)) {
          if (!sayi) { cikti += SAYI; hucreSayisi++; sayi = true; }
          cikti += hucre(HARF[RAKAMHARF[RAKAM.indexOf(ch)]]); hucreSayisi++;
          continue;
        }
        sayi = false;
        const kucuk = kucult(ch);
        if (HARF[kucuk] !== undefined) {
          if (v.buyuk === 'var' && kucuk !== ch) { cikti += BUYUK; hucreSayisi++; }
          cikti += hucre(HARF[kucuk]); hucreSayisi++;
          continue;
        }
        if (NOKTA[ch] !== undefined) { cikti += hucre(NOKTA[ch]); hucreSayisi++; continue; }
        cikti += ch;
        if (!/\s/.test(ch)) desteksiz++;
      }
      if (!hucreSayisi) h.err('Metinde Braille karşılığı olan harf, rakam ya da işaret bulunamadı.');
    }
    return {
      rows: [
        ['Braille hücresi', h.fmt(hucreSayisi, 0)],
        ['Desteklenmeyen karakter', h.fmt(desteksiz, 0)],
      ],
      text: cikti,
      note: 'Kısaltmasız Türkçe Braille düzeni kullanılır. Desteklenmeyen karakterler olduğu gibi bırakılır; basılı kabartma belge hazırlamadan önce bir uzmana kontrol ettirin.',
    };
  },
  cases: [
    { in: { metin: 'ali', yon: 'kodla' }, out: { 'Braille hücresi': '3', 'Desteklenmeyen karakter': '0' }, text: '⠁⠇⠊' },
    { in: { metin: '⠍⠑⠗⠓⠁⠃⠁', yon: 'coz' }, out: { 'Braille hücresi': '7' }, text: 'merhaba' },
    { in: { metin: 'çağ 12', yon: 'kodla' }, out: { 'Braille hücresi': '6' }, text: '⠡⠁⠣ ⠼⠁⠃' },
    { in: { metin: 'Su', yon: 'kodla', buyuk: 'var' }, out: { 'Braille hücresi': '3' }, text: '⠠⠎⠥' },
    { in: { metin: 'şü, ö.', yon: 'kodla' }, out: { 'Braille hücresi': '5' }, text: '⠩⠳⠂ ⠪⠲' },
    { in: { metin: '⠼⠁⠚', yon: 'coz' }, text: '10' },
    { in: { metin: '⠠⠊⠎', yon: 'coz' }, text: 'İs' },
    { in: { metin: 'a@b', yon: 'kodla' }, out: { 'Braille hücresi': '2', 'Desteklenmeyen karakter': '1' } },
    { in: { metin: '', yon: 'kodla' }, error: true },
    { in: { metin: 'abc', yon: 'coz' }, error: true },
  ],
  howto: [
    `Kutucuğa çevirmek istediğiniz metni yazın ya da başka bir yerden kopyaladığınız Braille karakterlerini yapıştırın.`,
    `Çeviri yönünü seçin: düz yazıdan Braille'e ya da Braille'den düz yazıya.`,
    `Büyük harflerin ayrıca işaretlenmesini istiyorsanız "Büyük harf işareti koy" seçeneğini açın; açılmazsa bütün harfler küçük harf hücresiyle yazılır.`,
    `"Çevir" düğmesine basın. Sonuç kutusunda Braille hücreleri ya da çözülmüş metin görünür; altında kaç hücre üretildiği yazar.`,
    `Çıktıyı kopyalayıp belgenize, sunumunuza ya da tasarım dosyanıza yapıştırın.`,
  ],
  sections: [
    { h: 'Braille alfabesi nasıl çalışır?', p: [
      `Braille, parmak ucuyla okunmak üzere tasarlanmış bir kabartma yazı sistemidir. Adını, on dokuzuncu yüzyılda bu sistemi geliştiren ve kendisi de görme engelli olan Fransız eğitimci Louis Braille'den alır. Sistemin temel birimi <strong>hücredir</strong>: iki sütun ve üç satıra dizilmiş altı nokta konumu. Sol sütundaki noktalar yukarıdan aşağıya 1, 2, 3; sağ sütundakiler 4, 5, 6 diye numaralanır. Hangi noktaların kabartıldığına göre hücre bir harfi, bir rakamı ya da bir işareti gösterir.`,
      `Altı konumun her biri kabarık ya da düz olabildiğinden 2<sup>6</sup> = 64 farklı düzen elde edilir; bunlardan biri hiç nokta içermeyen boşluk hücresidir. Geriye kalan 63 düzen harflere ve işaretlere paylaştırılır. Alfabenin kuruluşunda bir düzen vardır: a'dan j'ye kadar olan ilk on harf yalnızca üstteki dört noktayı (1, 2, 4, 5) kullanır. Sonraki on harf (k–t) aynı şekillere 3. noktanın eklenmesiyle, u, v, x, y, z ise 3. ve 6. noktaların eklenmesiyle oluşur.`,
    ] },
    { h: 'Türkçe Braille harfleri', p: [
      `Türkçe Braille, temel Latin harflerinde uluslararası düzeni izler; Türkçeye özgü altı harf için ayrı hücreler ayrılmıştır. Araçta kullanılan nokta numaraları şöyledir:`,
    ], ul: [
      `<strong>ç</strong>: 1-6 · <strong>ğ</strong>: 1-2-6 · <strong>ı</strong>: 3-5 · <strong>ö</strong>: 2-4-6 · <strong>ş</strong>: 1-4-6 · <strong>ü</strong>: 1-2-5-6`,
      `<strong>a</strong>: 1 · <strong>b</strong>: 1-2 · <strong>c</strong>: 1-4 · <strong>d</strong>: 1-4-5 · <strong>e</strong>: 1-5 · <strong>f</strong>: 1-2-4 · <strong>g</strong>: 1-2-4-5 · <strong>h</strong>: 1-2-5 · <strong>i</strong>: 2-4 · <strong>j</strong>: 2-4-5`,
      `<strong>k</strong>: 1-3 · <strong>l</strong>: 1-2-3 · <strong>m</strong>: 1-3-4 · <strong>n</strong>: 1-3-4-5 · <strong>o</strong>: 1-3-5 · <strong>p</strong>: 1-2-3-4 · <strong>r</strong>: 1-2-3-5 · <strong>s</strong>: 2-3-4 · <strong>t</strong>: 2-3-4-5`,
      `<strong>u</strong>: 1-3-6 · <strong>v</strong>: 1-2-3-6 · <strong>y</strong>: 1-3-4-5-6 · <strong>z</strong>: 1-3-5-6`,
      `Türkçe alfabede bulunmayan <strong>q</strong> (1-2-3-4-5), <strong>w</strong> (2-4-5-6) ve <strong>x</strong> (1-3-4-6) yabancı sözcükler için desteklenir.`,
    ] },
    { h: 'Rakamlar, büyük harf ve noktalama', p: [
      `Braille'de rakamlar için ayrı şekiller yoktur. Bunun yerine <strong>sayı işareti</strong> (3-4-5-6 noktaları) konur ve ardından gelen a–j harfleri sırasıyla 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 olarak okunur. Yani "12" yazmak için sayı işareti, a ve b hücreleri art arda dizilir. Araç her rakam dizisinin başına bu işareti kendiliğinden ekler; ters çeviride de işaretten sonraki a–j hücrelerini rakama dönüştürür.`,
      `Büyük harf, harften önce konan tek noktalı bir hücreyle (6. nokta) belirtilir. Bu işaret isteğe bağlıdır: seçeneği kapalı bıraktığınızda "Su" ile "su" aynı iki hücreyle yazılır. Noktalama için araç şu işaretleri tanır: virgül (2), noktalı virgül (2-3), iki nokta (2-5), nokta (2-5-6), soru işareti (2-3-6), ünlem (2-3-5), kısa çizgi (3-6) ve kesme işareti (3). Bunların dışındaki simgeler çevrilmeden bırakılır ve "Desteklenmeyen karakter" satırında sayılır.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `"ali" sözcüğünü ele alalım. a harfi yalnızca 1. noktadan, l harfi 1-2-3 noktalarından, i harfi 2-4 noktalarından oluşur. Araç bu üç hücreyi yan yana yazar ve "Braille hücresi" satırında 3 gösterir. "çağ 12" girdisinde ise ç (1-6), a (1) ve ğ (1-2-6) hücrelerinden sonra boşluk gelir; ardından sayı işareti, a ve b hücreleri yazılır. Toplam altı hücre üretilir; boşluk hücre sayısına katılmaz.`,
      `Ters yönde, yedi hücrelik m-e-r-h-a-b-a dizisini yapıştırıp "Braille → Metin" seçtiğinizde çıktı "merhaba" olur. Sayı işaretinin ardından a ve j hücreleri geliyorsa sonuç "10" olarak okunur.`,
    ] },
    { h: 'Ekrandaki Braille ile kabartma baskı arasındaki fark', p: [
      `Bu aracın ürettiği karakterler, Unicode standardındaki Braille desenleri bloğundan gelir. Ekranda nokta deseni olarak görünürler, ancak düz bir kâğıda yazdırıldıklarında <strong>kabarık olmazlar</strong> ve parmakla okunamazlar. Gerçek kabartma için Braille yazıcısı, kabartma tableti ya da bu işi yapan bir basım birimi gerekir. Tabela, asansör düğmesi, ilaç kutusu gibi ürünlerde nokta çapı, noktalar arası mesafe ve hücre aralığı için uyulması gereken ölçüler vardır; yalnızca şekli doğru olan ama ölçüsü tutmayan bir kabartma okunamaz.`,
      `Dolayısıyla çıktıyı eğitim, tanıtım, görsel tasarım ve öğrenme amacıyla kullanabilirsiniz. Görme engelli bir okura ulaşacak kalıcı bir ürün hazırlıyorsanız metni mutlaka Braille bilen bir kişiye ya da ilgili bir kuruma kontrol ettirin.`,
    ] },
    { h: 'Sınırlar ve bilinmesi gerekenler', ul: [
      `Araç <strong>kısaltmasız</strong> (birinci derece) yazım üretir: her harf bir hücredir. Sık geçen sözcük ve heceleri tek hücreyle gösteren kısaltmalı yazım desteklenmez.`,
      `Bir rakamdan hemen sonra boşluk bırakılmadan a–j arası bir harf gelirse (örneğin "3a"), ters çeviride bu harf de rakam olarak okunur. Karışıklığı önlemek için araya boşluk koyun.`,
      `Şapkalı harfler (â, î, û), matematik simgeleri, parantez ve tırnak işaretleri çevrilmez; olduğu gibi bırakılır.`,
      `Sekiz noktalı bilgisayar Braille'i ve müzik ya da matematik notasyonu kapsam dışındadır.`,
      `Ters çeviride tanınmayan bir Braille hücresi olduğu gibi çıktıya aktarılır ve desteklenmeyen karakter olarak sayılır.`,
    ] },
  ],
  faq: [
    ['Braille bir dil midir?', 'Hayır. Braille bir dil değil, bir yazı sistemidir. Türkçe, İngilizce ya da Arapça gibi diller aynı altı noktalı hücreyle yazılır; ancak her dilin kendine özgü harfleri için hücre atamaları farklı olabilir. Bu araç Türkçe düzeni kullanır.'],
    ['Çıktıyı yazdırırsam görme engelli biri okuyabilir mi?', 'Hayır. Normal yazıcıdan çıkan noktalar kabarık olmadığı için dokunarak okunamaz. Kabartma baskı için Braille yazıcısı ya da kabartma yapan bir basım hizmeti gerekir.'],
    ['Rakamlar neden harflerle aynı şekilde görünüyor?', 'Braille\'de rakamlar a–j harfleriyle aynı hücreleri kullanır. Aradaki fark, rakam dizisinin başına konan sayı işaretidir. Araç bu işareti kendiliğinden ekler.'],
    ['Büyük harf işareti koymalı mıyım?', 'Öğrenme ve görsel kullanım için gerekmez. Özel adların ve cümle başlarının ayırt edilmesini istiyorsanız seçeneği açın; her büyük harften önce 6. noktadan oluşan bir hücre eklenir.'],
    ['Kısaltmalı Braille destekleniyor mu?', 'Hayır. Araç her harfi ayrı bir hücreyle yazar. Kısaltmalı yazım ayrı kurallar gerektirir ve bu aracın kapsamı dışındadır.'],
    ['Braille karakterlerini nereden kopyalayıp çözebilirim?', 'Ekranda Braille deseni olarak görünen Unicode karakterlerini kopyalayıp kutucuğa yapıştırmanız yeterlidir. Fotoğraftaki ya da kâğıttaki kabartmayı araç okuyamaz; hücreleri karakter olarak girmeniz gerekir.'],
    ['Bazı karakterler neden çevrilmeden kaldı?', 'Parantez, tırnak, @ gibi araçta karşılığı tanımlanmamış simgeler olduğu gibi bırakılır ve "Desteklenmeyen karakter" satırında sayılır. Bunları metinden çıkarabilir ya da sözcükle yazabilirsiniz.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; metin sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['nato-alfabesi-cevir', 'ikili-metin-cevir', 'unicode-kod-noktasi', 'turkce-karakter-donustur', 'hex-metin-cevir'],
};
