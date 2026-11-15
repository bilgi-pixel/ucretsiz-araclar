export default {
  slug: 'sekme-bosluk-donustur',
  title: 'Sekmeyi Boşluğa Çevirme',
  h1Tail: 'tab ↔ boşluk',
  pageTitle: 'Sekmeyi Boşluğa Çevirme – Tab Karakterini Boşluğa Dönüştürme',
  description: 'Metindeki ya da koddaki sekme (tab) karakterlerini 2, 4 ya da 8 boşluğa çevirin; isterseniz satır başındaki boşlukları yeniden sekmeye dönüştürün.',
  card: 'Sekme (tab) karakterlerini boşluğa, satır başı boşluklarını sekmeye çevirin; girinti genişliğini siz seçin.',
  category: 'metin',
  keywords: ['sekmeyi boşluğa çevirme', 'tab boşluk dönüştürme', 'tab to space', 'boşluğu sekmeye çevirme', 'girinti dönüştürme', 'kod girintisi düzeltme', 'tab karakteri silme'],
  lead: 'Kopyaladığınız kodda ya da metinde girintiler bir yerde sekme, bir yerde boşluksa hizalar bozulur. Bu araç <strong>sekme (tab) karakterlerini seçtiğiniz genişlikte boşluğa</strong> çevirir; ters yönde, satır başındaki boşlukları sekmeye dönüştürür.',
  button: 'Dönüştür',
  inputs: [
    { id: 'metin', label: 'Metin ya da kod', type: 'textarea', placeholder: 'Sekme içeren metni ya da kodu buraya yapıştırın', wide: true },
    { id: 'yon', label: 'Dönüşüm yönü', type: 'select', options: [['bosluk', 'Sekme → Boşluk'], ['sekme', 'Satır başı boşlukları → Sekme']] },
    { id: 'genislik', label: 'Sekme genişliği', type: 'select', options: [['4', '4 boşluk'], ['2', '2 boşluk'], ['3', '3 boşluk'], ['8', '8 boşluk']] },
    { id: 'kapsam', label: 'Kapsam (sekme → boşluk için)', type: 'select', options: [['hepsi', 'Tüm sekmeler (sütun hizası korunur)'], ['bas', 'Yalnızca satır başındaki girinti']], hint: 'Satır içindeki sekmeler, bir sonraki sekme durağına kadar gereken sayıda boşlukla doldurulur.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Dönüştürmek için "Metin ya da kod" alanına bir metin yapıştırın.');
    const n = Number(v.genislik);
    if (![2, 3, 4, 8].includes(n)) h.err('Sekme genişliği 2, 3, 4 ya da 8 olmalı.');
    const satirlar = s.split('\n');
    let sekmeSayisi = 0, degisen = 0;
    const cikti = satirlar.map((satir) => {
      const bas = /^[ \t]*/.exec(satir)[0];
      const govde = satir.slice(bas.length);
      let yeni;
      if (v.yon === 'sekme') {
        // Baştaki girintinin görsel genişliğini bul, sekme + artan boşluk olarak yeniden yaz
        let kol = 0;
        for (const c of bas) kol = c === '\t' ? kol + (n - (kol % n)) : kol + 1;
        const t = Math.floor(kol / n);
        const yeniBas = '\t'.repeat(t) + ' '.repeat(kol % n);
        if (yeniBas !== bas) sekmeSayisi += t;
        yeni = yeniBas + govde;
      } else {
        let kol = 0, o = '';
        const hedef = v.kapsam === 'bas' ? bas : satir;
        for (const c of Array.from(hedef)) {
          if (c === '\t') { const ek = n - (kol % n); o += ' '.repeat(ek); kol += ek; sekmeSayisi++; }
          else { o += c; kol++; }
        }
        yeni = v.kapsam === 'bas' ? o + govde : o;
      }
      if (yeni !== satir) degisen++;
      return yeni;
    });
    const rows = v.yon === 'sekme'
      ? [['Yazılan sekme', h.fmt(sekmeSayisi, 0)], ['Değişen satır', h.fmt(degisen, 0)], ['Toplam satır', h.fmt(satirlar.length, 0)]]
      : [['Çevrilen sekme', h.fmt(sekmeSayisi, 0)], ['Değişen satır', h.fmt(degisen, 0)], ['Toplam satır', h.fmt(satirlar.length, 0)]];
    let note;
    if (degisen === 0) note = v.yon === 'sekme' ? 'Satır başlarında sekmeye çevrilecek kadar boşluk bulunamadı; metin olduğu gibi bırakıldı.' : 'Metinde sekme karakteri bulunamadı; metin olduğu gibi bırakıldı.';
    else note = v.yon === 'sekme' ? `Satır başındaki her ${n} boşluk bir sekmeye çevrildi; artan boşluklar korundu. Satır içindeki boşluklara dokunulmadı.` : `Sekme durakları ${n} sütunda bir kabul edildi.`;
    return { rows, text: cikti.join('\n'), note };
  },
  cases: [
    { in: { metin: '\tfoo', yon: 'bosluk', genislik: '4' }, out: { 'Çevrilen sekme': '1', 'Değişen satır': '1' }, text: '    foo' },
    { in: { metin: 'ab\tc\td', yon: 'bosluk', genislik: '4', kapsam: 'hepsi' }, out: { 'Çevrilen sekme': '2' }, text: 'ab  c   d' },
    { in: { metin: 'if x:\n\t\treturn 1', yon: 'bosluk', genislik: '2' }, out: { 'Çevrilen sekme': '2', 'Toplam satır': '2' }, text: 'if x:\n    return 1' },
    { in: { metin: '\ta\tb', yon: 'bosluk', genislik: '4', kapsam: 'bas' }, out: { 'Çevrilen sekme': '1' }, text: '    a\tb' },
    { in: { metin: '        x', yon: 'sekme', genislik: '4' }, out: { 'Yazılan sekme': '2' }, text: '\t\tx' },
    { in: { metin: '      x = 1', yon: 'sekme', genislik: '4' }, out: { 'Yazılan sekme': '1' }, text: '\t  x = 1' },
    { in: { metin: 'a\tb', yon: 'bosluk', genislik: '8' }, text: 'a       b' },
    { in: { metin: 'sekme yok', yon: 'bosluk' }, out: { 'Çevrilen sekme': '0', 'Değişen satır': '0' }, text: 'sekme yok' },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    'Sekme içeren metni, kodu ya da tablo biçimindeki satırları "Metin ya da kod" kutusuna yapıştırın.',
    '"Dönüşüm yönü" listesinden sekmeleri boşluğa mı, yoksa satır başındaki boşlukları sekmeye mi çevireceğinizi seçin.',
    '"Sekme genişliği" ile bir sekmenin kaç boşluğa denk sayılacağını belirleyin; çoğu proje 4, bazı web projeleri 2 kullanır.',
    'Sekmeden boşluğa çevirirken satır içindeki sekmelere dokunulmasını istemiyorsanız kapsamı "Yalnızca satır başındaki girinti" yapın.',
    '"Dönüştür" düğmesine basın, sonuç kutusundaki metni kopyalayıp düzenleyicinize geri yapıştırın.',
  ],
  sections: [
    { h: 'Sekme karakteri nedir, boşluktan farkı ne?', p: [
      'Klavyedeki Tab tuşuna bastığınızda metne tek bir karakter eklenir: yatay sekme. Bu karakterin ekranda ne kadar yer kaplayacağı metnin kendisinde yazmaz; onu gösteren program karar verir. Bir düzenleyici sekmeyi 4 sütun, bir terminal 8 sütun, bir tarayıcı yine 8 sütun genişliğinde çizebilir. Boşluk ise her yerde tam bir karakter genişliğindedir. Bu yüzden sekmeyle girintilenmiş bir dosya sizin ekranınızda düzgün, iş arkadaşınızın ekranında dağınık görünebilir.',
      'Sorun en çok iki tür karıştığında ortaya çıkar. Bir satır dört boşlukla, altındaki satır bir sekmeyle girintilenmişse ikisi sizin ayarınızda aynı hizada durur; sekme genişliği farklı olan bir ortamda ise kayar. Girintinin anlam taşıdığı dillerde ve dosya biçimlerinde bu yalnızca görsel bir kusur değildir, doğrudan hataya yol açar.',
    ] },
    { h: 'Sekme durağı mantığı: araç boşluk sayısını nasıl buluyor?', p: [
      'Sekme "şu kadar boşluk ekle" demek değildir; "imleci bir sonraki sekme durağına götür" demektir. Duraklar, seçtiğiniz genişliğin katlarında bulunur: genişlik 4 ise 4., 8., 12. sütunlar birer duraktır. Araç her satırda sütun sayar ve bir sekmeyle karşılaştığında durağa ulaşmak için gereken kadar boşluk yazar. Formülü şudur: <strong>eklenecek boşluk = genişlik − (bulunulan sütun mod genişlik)</strong>.',
      'Çözümlü örnek: <code>ab</code>, sekme, <code>c</code>, sekme, <code>d</code> dizisini 4 genişlikle çevirelim. İlk sekme 2. sütunda gelir; 4 − 2 = 2 boşluk eklenir ve <code>c</code> 4. sütuna yazılır. İkinci sekme 5. sütundadır; 4 − (5 mod 4) = 3 boşluk eklenir. Sonuç <code>ab</code>, iki boşluk, <code>c</code>, üç boşluk, <code>d</code> olur. Her sekmeyi körü körüne dört boşlukla değiştiren basit bir "bul ve değiştir" işlemi burada sütunları kaydırırdı; durak hesabı sayesinde tablo gibi hizalanmış veriler bozulmaz.',
      'Satır başındaki sekmelerde bulunulan sütun zaten durağın üzerinde olduğundan her sekme tam genişlik kadar boşluğa dönüşür: iki sekme, genişlik 2 iken dört boşluk eder.',
    ] },
    { h: 'Boşlukları sekmeye çevirme nasıl çalışır?', p: [
      'Ters yönde araç yalnızca satırın başındaki girintiye bakar. Girintinin görsel genişliğini hesaplar, bunu seçtiğiniz genişliğe böler; bölüm kadar sekme, kalan kadar boşluk yazar. Sekiz boşlukla başlayan bir satır 4 genişlikte iki sekmeye dönüşür. Altı boşlukla başlayan satır ise bir sekme ve iki boşluk olur; çünkü altı, dördün tam katı değildir ve artan iki boşluk büyük olasılıkla bilinçli bir hizalamadır.',
      'Satırın ortasındaki boşluklara bu yönde hiç dokunulmaz. Dizgi içindeki, yorum satırındaki ya da iki kelime arasındaki ardışık boşlukları sekmeye çevirmek metnin anlamını değiştirebilir; bu nedenle güvenli olan yalnızca baştaki girintiyi dönüştürmektir.',
    ] },
    { h: 'Hangi durumda hangisi gerekir?', ul: [
      '<strong>Python:</strong> Aynı blokta sekme ve boşluğu karıştırmak yorumlayıcının girinti hatası vermesine yol açar. Dilin yaygın yazım kılavuzu dört boşluk önerir; sekmeli bir dosyayı boşluğa çevirmek en sık kullanım senaryosudur.',
      '<strong>YAML:</strong> Yapılandırma dosyalarında girinti için sekme kullanılamaz. Bir düzenleyiciden kopyalanan sekmeli satırlar dosyanın okunmasını engeller; boşluğa çevirmek sorunu giderir.',
      '<strong>Makefile:</strong> Burada durum terstir; komut satırlarının sekmeyle başlaması gerekir. Boşlukla yapıştırılmış bir tarifi sekmeye çevirmeniz gerekebilir.',
      '<strong>Tablo verisi:</strong> Hesap tablosundan kopyalanan hücreler aralarında sekmeyle gelir. Bunu düz metin bir e-postaya ya da foruma yapıştırmadan önce "Tüm sekmeler" seçeneğiyle boşluğa çevirirseniz sütunlar eş aralıklı yazı tipinde hizalı kalır.',
      '<strong>Ekip çalışması:</strong> Sürüm denetiminde yalnızca girinti türü değiştiği için yüzlerce satırın farklı görünmesi incelemeyi zorlaştırır. Projenin kuralı neyse dosyayı ona çevirmek fark çıktısını temiz tutar.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, dosyanın yazıldığı genişlikten farklı bir genişlik seçmektir. Kod 8 sütunluk sekmelerle hizalanmışsa ve siz 4 seçerseniz girinti düzeyleri doğru kalır ama satır içi hizalar değişir. Emin değilseniz önce küçük bir bölümü deneyip sonucu eş aralıklı bir yazı tipinde kontrol edin.',
      'Araç sütunları karakter sayarak hesaplar. Çince, Japonca gibi çift genişlikli karakterler ya da bazı emojiler ekranda iki sütun kaplasa da bir karakter sayılır; bu tür metinlerde satır içi hizalama birkaç sütun sapabilir. Türkçe harflerde böyle bir sorun yoktur.',
      'Dizgi sabitlerinin içinde bilerek yazılmış sekmeler de dönüştürülür. Kodunuzda sekme karakterini kaçış dizisi yerine doğrudan tırnak içine yazdıysanız, kapsamı "Yalnızca satır başındaki girinti" yaparak bunları koruyabilirsiniz.',
    ] },
  ],
  faq: [
    ['Bir sekme kaç boşluğa eşittir?', 'Sabit bir karşılığı yoktur; gösteren programın ayarına bağlıdır. Kod düzenleyicilerinde en yaygın değer 4, terminallerde ve tarayıcılarda 8, bazı web projelerinde 2\'dir. Bu araçta genişliği kendiniz seçersiniz.'],
    ['Sekme mi boşluk mu kullanmalıyım?', 'İkisinin de savunucusu vardır. Boşluk her ortamda aynı görünür; sekme ise dosyayı küçültür ve herkesin kendi girinti genişliğini seçmesine izin verir. Önemli olan bir projede tek türün tutarlı kullanılmasıdır; ekibinizin ya da dilin yazım kılavuzunun kuralını izleyin.'],
    ['Neden her sekme aynı sayıda boşluğa çevrilmedi?', 'Satır içindeki sekmeler bir sonraki sekme durağına kadar doldurulur. Sekmeden önce iki karakter varsa 4 genişlikte yalnızca iki boşluk gerekir. Bu davranış sütun hizasını korumak içindir ve düzenleyicilerin sekmeyi çizme biçimiyle aynıdır.'],
    ['Satır içindeki sekmeler kalsın, yalnızca girinti değişsin istiyorum. Olur mu?', 'Evet. Kapsam listesinden "Yalnızca satır başındaki girinti" seçeneğini işaretleyin. Bu durumda satırın ilk harfinden sonraki sekmelere dokunulmaz.'],
    ['Boşlukları sekmeye çevirirken neden bazı boşluklar kaldı?', 'Girinti genişliği seçtiğiniz değerin tam katı değilse artan boşluklar korunur. Örneğin 6 boşluk, 4 genişlikte bir sekme ve iki boşluk olur. Tam kat elde etmek için dosyanın gerçekte kullandığı genişliği seçin.'],
    ['Satır sonları ve boş satırlar değişir mi?', 'Satır sayısı ve sırası aynı kalır, boş satırlar korunur. Windows biçimindeki satır sonları tek tip satır sonuna çevrilir; metni düzenleyicinize yapıştırdığınızda düzenleyici kendi biçimini uygular.'],
    ['Çok büyük dosyaları dönüştürebilir miyim?', 'Binlerce satırlık kod dosyaları sorunsuz işlenir. Sınır tarayıcınızın belleğidir; onlarca megabaytlık metinlerde yapıştırma işleminin kendisi yavaşlayabilir.'],
    ['Yapıştırdığım kod bir sunucuya gönderiliyor mu?', 'Hayır. Dönüşüm tamamen tarayıcınızda yapılır; kodunuz ya da metniniz hiçbir yere iletilmez ve saklanmaz. Sayfa bir kez yüklendikten sonra çevrimdışı da çalışır.'],
  ],
  related: ['bosluk-temizle', 'bos-satirlari-sil', 'satir-numarasi-ekle', 'bul-ve-degistir', 'json-bicimlendir'],
};
