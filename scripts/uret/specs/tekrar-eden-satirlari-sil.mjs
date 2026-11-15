export default {
  slug: 'tekrar-eden-satirlari-sil',
  title: 'Tekrar Eden Satırları Silme',
  h1Tail: 'listeyi tekilleştirin',
  pageTitle: 'Tekrar Eden Satırları Silme – Listeyi Tekilleştirme Aracı',
  description: 'Listenizdeki tekrar eden satırları silin, her satırdan yalnızca bir tane bırakın. Sıra korunur; büyük-küçük harf, boşluk ve boş satır seçenekleri vardır.',
  card: 'Listedeki yinelenen satırları silip her kayıttan tek bir tane bırakın; satır sırası bozulmaz.',
  category: 'metin',
  keywords: ['tekrar eden satırları silme', 'yinelenen satırları kaldırma', 'listeyi tekilleştirme', 'mükerrer kayıt silme', 'aynı satırları silme', 'duplicate satır silme', 'benzersiz liste oluşturma', 'tekrarlananları kaldır'],
  lead: 'Alt alta yazılmış bir listeyi yapıştırın; aynı satırdan birden fazla varsa fazlalıkları silinsin ve her kayıttan <strong>yalnızca bir tane</strong> kalsın. Satırların sırası değişmez; kaç tekrarın silindiğini ve en çok hangi satırın yinelendiğini de görürsünüz.',
  button: 'Tekrarları Sil',
  inputs: [
    { id: 'metin', label: 'Liste (her satıra bir kayıt)', type: 'textarea', placeholder: 'elma\narmut\nelma\nkiraz', wide: true },
    { id: 'harf', label: 'Büyük-küçük harf', type: 'select', options: [['duyarli', 'Ayrı say (Ankara ≠ ankara)'], ['duyarsiz', 'Aynı say (Ankara = ankara)']] },
    { id: 'kenar', label: 'Baştaki ve sondaki boşluklar', type: 'select', options: [['kirp', 'Yok say ve temizle'], ['aynen', 'Olduğu gibi karşılaştır']] },
    { id: 'korunan', label: 'Hangi tekrar kalsın?', type: 'select', options: [['ilk', 'İlk geçen satır'], ['son', 'Son geçen satır']] },
    { id: 'bosSatir', label: 'Boş satırlar', type: 'select', options: [['sil', 'Sil'], ['koru', 'Koru']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Tekrarları silmek için "Liste" alanına her satıra bir kayıt gelecek biçimde metin yapıştırın.');
    let satirlar = s.split('\n');
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const girdi = satirlar.length;
    const kirp = v.kenar !== 'aynen', duyarsiz = v.harf === 'duyarsiz', son = v.korunan === 'son';
    const anahtar = (x) => { const k = kirp ? x.trim() : x; return duyarsiz ? k.toLocaleLowerCase('tr') : k; };
    // Sayım: en çok tekrar eden satırı bulmak için
    const adet = new Map(), ilkHal = new Map();
    for (const x of satirlar) {
      if (x.trim() === '') continue;
      const k = anahtar(x);
      adet.set(k, (adet.get(k) || 0) + 1);
      if (!ilkHal.has(k)) ilkHal.set(k, x.trim());
    }
    let enCok = null;
    for (const [k, n] of adet) if (n > 1 && (!enCok || n > enCok[1])) enCok = [k, n];
    if (son) satirlar = satirlar.slice().reverse();
    const gorulen = new Set(), cikti = [];
    let silinenTekrar = 0, silinenBos = 0, kalanDolu = 0;
    for (const x of satirlar) {
      if (x.trim() === '') {
        if (v.bosSatir === 'koru') cikti.push(kirp ? '' : x); else silinenBos++;
        continue;
      }
      const k = anahtar(x);
      if (gorulen.has(k)) { silinenTekrar++; continue; }
      gorulen.add(k);
      cikti.push(kirp ? x.trim() : x);
      kalanDolu++;
    }
    if (son) cikti.reverse();
    return {
      rows: [
        ['Silinen tekrar', h.fmt(silinenTekrar, 0) + ' satır'],
        ['Kalan benzersiz satır', h.fmt(kalanDolu, 0)],
        ['Girdideki satır', h.fmt(girdi, 0)],
        ['Silinen boş satır', h.fmt(silinenBos, 0)],
        ['En çok tekrar eden', enCok ? `"${ilkHal.get(enCok[0])}" (${enCok[1]} kez)` : 'Tekrar yok'],
      ],
      text: cikti.join('\n'),
      note: silinenTekrar ? 'Satır sırası korunmuştur; yalnızca fazlalık satırlar çıkarılmıştır.' : 'Listede tekrar eden satır bulunamadı.',
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\nelma\nkiraz\narmut' }, text: 'elma\narmut\nkiraz', out: { 'Silinen tekrar': '2 satır', 'Kalan benzersiz satır': '3', 'Girdideki satır': '5', 'En çok tekrar eden': '"elma" (2 kez)' } },
    { in: { metin: 'Ankara\nankara\nİzmir\nizmir\nIĞDIR\nığdır', harf: 'duyarsiz' }, text: 'Ankara\nİzmir\nIĞDIR', out: { 'Silinen tekrar': '3 satır', 'Kalan benzersiz satır': '3' } },
    { in: { metin: 'Ankara\nankara\nİzmir\nizmir', harf: 'duyarli' }, text: 'Ankara\nankara\nİzmir\nizmir', out: { 'Silinen tekrar': '0 satır', 'En çok tekrar eden': 'Tekrar yok' } },
    { in: { metin: 'a\nb\na\nc', korunan: 'son' }, text: 'b\na\nc', out: { 'Silinen tekrar': '1 satır' } },
    { in: { metin: 'a\n\na\n\nb', bosSatir: 'koru' }, text: 'a\n\n\nb', out: { 'Silinen tekrar': '1 satır', 'Silinen boş satır': '0', 'Kalan benzersiz satır': '2' } },
    { in: { metin: 'a\n\na\n\nb\n' }, text: 'a\nb', out: { 'Silinen tekrar': '1 satır', 'Silinen boş satır': '2', 'Girdideki satır': '5' } },
    { in: { metin: 'ali \nali\n  ali', kenar: 'kirp' }, text: 'ali', out: { 'Silinen tekrar': '2 satır', 'En çok tekrar eden': '"ali" (3 kez)' } },
    { in: { metin: 'ali \nali', kenar: 'aynen' }, text: 'ali \nali', out: { 'Silinen tekrar': '0 satır' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '  \n \n' }, error: true },
  ],
  howto: [
    'Tekilleştirmek istediğiniz listeyi, her satırda bir kayıt olacak biçimde "Liste" kutusuna yapıştırın.',
    '"Büyük-küçük harf" seçeneğiyle "Ankara" ve "ankara" yazımlarının aynı kayıt sayılıp sayılmayacağını belirleyin.',
    'Satır başlarında ya da sonlarında yanlışlıkla kalmış boşluklar olabilecekse "Baştaki ve sondaki boşluklar" seçeneğini "Yok say ve temizle" konumunda bırakın.',
    'Tekrarlardan ilkinin mi sonuncusunun mu kalacağını ve boş satırların silinip silinmeyeceğini seçin.',
    '"Tekrarları Sil" düğmesine basın; temizlenmiş liste sonuç kutusunda görünür. "Sonucu kopyala" ile panoya alıp tablonuza ya da dosyanıza yapıştırın.',
  ],
  sections: [
    { h: 'Araç nasıl çalışır?', p: [
      'Metin satırlara bölünür ve satırlar yukarıdan aşağıya tek tek gözden geçirilir. Her satır için bir karşılaştırma anahtarı üretilir: seçiminize göre satırın başındaki ve sonundaki boşluklar atılır, harfler küçültülür. Bu anahtar daha önce görülmediyse satır sonuca eklenir; görüldüyse satır tekrar kabul edilip atlanır. Böylece listenin özgün sırası bozulmaz; alfabetik sıralama yapılmaz, yalnızca fazlalıklar aradan çekilir.',
      'Bu yöntem, tablolama programlarındaki "yinelenenleri kaldır" komutunun düz metin karşılığıdır. Listeyi önce sıralamak gerekmez; tekrar eden satırlar birbirinden ne kadar uzakta olursa olsun yakalanır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Beş satırlık şu listeyi ele alalım: elma, armut, elma, kiraz, armut. Araç ilk satırdaki "elma"yı ve ikinci satırdaki "armut"u sonuca ekler. Üçüncü satırdaki "elma" daha önce görüldüğü için silinir. "kiraz" yenidir, eklenir. Beşinci satırdaki "armut" yine tekrardır ve silinir. Sonuç üç satırdır: elma, armut, kiraz. Özet satırlarında 5 girdi satırı, 2 silinen tekrar ve 3 benzersiz satır görünür.',
      '"Hangi tekrar kalsın?" seçeneğinin etkisini görmek için a, b, a, c listesini düşünün. "İlk geçen satır" seçiliyken sonuç a, b, c olur. "Son geçen satır" seçildiğinde ise baştaki a silinir, sondaki a yerinde kalır ve sonuç b, a, c olur. Kayıtların en güncel hâli listenin sonundaysa ikinci seçenek işe yarar.',
    ] },
    { h: 'Seçenekler ne anlama gelir?', ul: [
      '<strong>Büyük-küçük harf:</strong> "Aynı say" seçildiğinde karşılaştırma Türkçe kurallarına göre yapılır; "IĞDIR" ile "ığdır", "İZMİR" ile "izmir" eş kabul edilir. Sonuçta ilk karşılaşılan yazım korunur.',
      '<strong>Baştaki ve sondaki boşluklar:</strong> "Yok say ve temizle" seçiliyken "ali" ile sonunda boşluk bulunan "ali " aynı sayılır ve çıktıdaki satırların kenar boşlukları da temizlenir. Girintinin anlam taşıdığı metinlerde "Olduğu gibi karşılaştır" seçeneğini kullanın.',
      '<strong>Hangi tekrar kalsın:</strong> tekrarlanan satırlardan ilkinin ya da sonuncusunun konumunu korur. İçerik aynı olduğundan fark yalnızca sıradadır.',
      '<strong>Boş satırlar:</strong> "Sil" seçiliyken boş satırlar çıktıdan tümüyle çıkarılır. "Koru" seçildiğinde boş satırlara dokunulmaz; boş satırlar birbirinin tekrarı sayılmaz, böylece bölüm aralarındaki boşluklar yerinde kalır.',
    ] },
    { h: 'Kullanım alanları', ul: [
      'Birkaç kaynaktan birleştirilmiş e-posta ya da telefon listesinde mükerrer kayıtları ayıklamak',
      'Ürün kodu, stok numarası ya da barkod dökümünde aynı kodun iki kez girilip girilmediğini görmek',
      'Anahtar kelime listelerini reklam ya da içerik planlaması öncesinde tekilleştirmek',
      'Katılımcı, öğrenci ya da üye listelerinde çift kaydı temizlemek',
      'Günlük (log) dosyalarında sürekli yinelenen aynı uyarı satırlarını teke indirmek',
      'Bir sütundaki farklı değerlerin (şehir, kategori, marka) dökümünü çıkarmak',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En sık rastlanan sorun, gözle aynı görünen satırların aslında farklı olmasıdır. Tablolama programlarından kopyalanan hücrelerin sonunda boşluk kalabilir; bu yüzden boşluk seçeneğini temizleme konumunda tutmak çoğu zaman doğrudur. Bir diğer neden yazım farklarıdır: "Ahmet Yılmaz" ile "Ahmet  Yılmaz" (iki boşluklu) ya da "Yilmaz" yazımı araç için ayrı kayıtlardır. Satır içindeki fazla boşlukları önce fazla boşluk temizleme aracıyla düzeltmek sonucu iyileştirir.',
      'Araç satırın tamamını karşılaştırır; satırın yalnızca bir bölümüne, örneğin virgülle ayrılmış bir kaydın ilk sütununa göre tekilleştirme yapmaz. "ali@ornek.com;Ali" ve "ali@ornek.com;Ali Bey" satırları farklı kabul edilir. Böyle bir durumda önce ilgili sütunu ayrı bir liste hâline getirmeniz gerekir.',
    ] },
    { h: 'Sınırlar', p: [
      'İşlem tarayıcınızın belleğinde yapılır. On binlerce satırlık listeler sorunsuz işlenir; çok büyük dosyalarda hız cihazınıza bağlıdır. Çıktıda satır sonları tek tip (LF) olarak üretilir. Araç benzer ama aynı olmayan kayıtları (yazım yanlışı, kısaltma, farklı sıra) birleştirmez; yalnızca seçtiğiniz kurallara göre birebir eşleşen satırları tekrar sayar.',
    ] },
  ],
  faq: [
    ['Tekrar eden satırlar silinince sıra değişir mi?', 'Hayır. Liste sıralanmaz; kalan satırlar özgün sıralarını korur. Yalnızca "Son geçen satır" seçeneğinde, tekrarlanan kaydın korunacak konumu ilk yerine son geçtiği yer olur.'],
    ['Büyük ve küçük harfle yazılmış aynı kelimeler tekrar sayılır mı?', 'Varsayılan ayarda sayılmaz; "Ankara" ile "ankara" ayrı satırlardır. "Aynı say" seçeneğini işaretlerseniz harf farkı gözetilmez ve Türkçe I-ı, İ-i eşleşmeleri doğru yapılır.'],
    ['Satır sonundaki boşluklar eşleşmeyi bozar mı?', '"Yok say ve temizle" seçiliyken bozmaz; baştaki ve sondaki boşluklar karşılaştırmadan önce atılır. "Olduğu gibi karşılaştır" seçiliyse tek bir boşluk farkı bile satırları ayrı kılar.'],
    ['Tekrar eden satırların hiçbirini bırakmadan tümünü silebilir miyim?', 'Hayır. Bu araç her kayıttan bir tane bırakır. Yalnızca bir kez geçen satırları ya da iki liste arasındaki farkı bulmak için liste karşılaştırma araçlarını kullanabilirsiniz.'],
    ['Excel sütunundaki yinelenenleri bu araçla silebilir miyim?', 'Evet. Sütunu kopyalayıp listeye yapıştırın, tekrarları silin ve sonucu boş bir sütuna geri yapıştırın. Birden çok sütunlu satırlarda satırın tamamı aynıysa tekrar sayılır.'],
    ['"En çok tekrar eden" satırı neyi gösterir?', 'Listede birden fazla geçen kayıtlar arasında en çok yinelenenini ve kaç kez geçtiğini gösterir. Eşitlik varsa listede önce karşılaşılan kayıt yazılır; hiç tekrar yoksa "Tekrar yok" görünür.'],
    ['Boş satırları korursam onlar da teke iner mi?', 'Hayır. "Koru" seçildiğinde boş satırlar tekrar sayılmaz ve hepsi yerinde bırakılır. Art arda gelen boş satırları teke indirmek için boş satırları silme aracını kullanın.'],
    ['Listem sunucuya yükleniyor mu?', 'Hayır. Tekilleştirme tümüyle tarayıcınızda yapılır. E-posta adresi ya da telefon gibi kişisel veriler içeren listeler cihazınızdan çıkmaz ve saklanmaz.'],
  ],
  related: ['bos-satirlari-sil', 'alfabetik-sirala', 'satir-sayaci', 'liste-farki-bul', 'ortak-satirlari-bul', 'bosluk-temizle'],
};
