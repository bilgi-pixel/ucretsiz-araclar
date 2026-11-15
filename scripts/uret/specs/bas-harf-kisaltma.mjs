export default {
  slug: 'bas-harf-kisaltma',
  title: 'Baş Harflerden Kısaltma Oluşturma',
  h1Tail: 'kelimelerin ilk harfleriyle kısaltma',
  pageTitle: 'Baş Harflerden Kısaltma Oluşturma – Akronim Üretici (Türkçe Uyumlu)',
  description: 'Kurum, proje ya da ders adının kelimelerinin baş harflerinden kısaltma oluşturun. Türkçe İ/I harflerini doğru büyütür, bağlaçları atlar, noktalı yazım verir.',
  card: 'Bir adın kelimelerinin baş harflerinden kısaltma üretin; Türkçe büyük harf kuralı ve bağlaç atlama seçeneğiyle.',
  category: 'metin',
  keywords: ['baş harflerden kısaltma', 'kısaltma oluşturma', 'akronim oluşturucu', 'baş harf kısaltma', 'kısaltma üretici', 'ilk harfleri alma', 'kurum adı kısaltma', 'akronim nedir'],
  lead: 'Bir ya da birkaç ad yazın; araç her satırdaki kelimelerin <strong>ilk harflerini</strong> alıp kısaltma oluştursun. "Türkiye Büyük Millet Meclisi" satırı TBMM olur. Türkçeye özgü İ ve I harfleri doğru büyütülür, "ve", "ile" gibi bağlaçlar isteğe bağlı olarak atlanır.',
  button: 'Oluştur',
  inputs: [
    { id: 'metin', label: 'Ad ya da ifade (her satıra bir tane)', type: 'textarea', placeholder: 'Türkiye Büyük Millet Meclisi\nOrta Doğu Teknik Üniversitesi', wide: true },
    { id: 'baglac', label: 'Bağlaçlar (ve, ile, veya, için…)', type: 'select', options: [['atla', 'Atla'], ['dahil', 'Kısaltmaya dahil et']] },
    { id: 'bicim', label: 'Yazım', type: 'select', options: [['buyuk', 'Büyük harf (TBMM)'], ['noktali', 'Noktalı (T.B.M.M.)'], ['kucuk', 'Küçük harf (tbmm)'], ['asil', 'Harfleri olduğu gibi bırak']] },
    { id: 'cikti', label: 'Çıktı', type: 'select', options: [['kisa', 'Yalnızca kısaltma'], ['acilim', 'Kısaltma = Açılım']] },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.metin);
    if (!satirlar.length) h.err('Kısaltma oluşturmak için "Ad ya da ifade" alanına en az bir satır yazın.');
    const atlanacak = new Set(['ve', 'ile', 'veya', 'ya', 'da', 'de', 'için', 'ki', 'and', 'of', 'the', 'for', 'in', 'to']);
    const ilkHarf = (k) => { const m = /[\p{L}\p{N}]/u.exec(k); return m ? m[0] : ''; };
    let atlanan = 0;
    const sonuc = [];
    for (const satir of satirlar) {
      const kelimeler = satir.split(/[\s\-–—/]+/).filter((k) => ilkHarf(k) !== '');
      if (!kelimeler.length) continue;
      let secilen = kelimeler;
      if (v.baglac !== 'dahil') {
        const suz = kelimeler.filter((k) => !atlanacak.has(k.replace(/[^\p{L}\p{N}]/gu, '').toLocaleLowerCase('tr-TR')));
        if (suz.length) { atlanan += kelimeler.length - suz.length; secilen = suz; }
      }
      let harfler = secilen.map(ilkHarf);
      if (v.bicim === 'kucuk') harfler = harfler.map((x) => x.toLocaleLowerCase('tr-TR'));
      else if (v.bicim !== 'asil') harfler = harfler.map((x) => x.toLocaleUpperCase('tr-TR'));
      const kisa = v.bicim === 'noktali' ? harfler.map((x) => x + '.').join('') : harfler.join('');
      sonuc.push({ kisa, satir, adet: harfler.length });
    }
    if (!sonuc.length) h.err('Yazdığınız satırlarda harf ya da rakam bulunamadı. Kelimelerden oluşan bir ad yazın.');
    return {
      rows: [
        ['Kısaltma', sonuc[0].kisa],
        ['Harf sayısı', String(sonuc[0].adet)],
        ['İşlenen satır', String(sonuc.length)],
        ['Atlanan bağlaç', String(atlanan)],
      ],
      text: sonuc.map((s) => (v.cikti === 'acilim' ? `${s.kisa} = ${s.satir}` : s.kisa)).join('\n'),
      note: 'Araç baş harfleri mekanik olarak birleştirir; kurumların resmî kısaltmaları bundan farklı olabilir.',
    };
  },
  cases: [
    { in: { metin: 'Türkiye Büyük Millet Meclisi' }, out: { 'Kısaltma': 'TBMM', 'Harf sayısı': '4' }, text: 'TBMM' },
    { in: { metin: 'Orta Doğu Teknik Üniversitesi\nİstanbul Teknik Üniversitesi', cikti: 'acilim' }, out: { 'Kısaltma': 'ODTÜ', 'İşlenen satır': '2' }, text: 'ODTÜ = Orta Doğu Teknik Üniversitesi\nİTÜ = İstanbul Teknik Üniversitesi' },
    { in: { metin: 'istanbul teknik üniversitesi', bicim: 'noktali' }, out: { 'Kısaltma': 'İ.T.Ü.' } },
    { in: { metin: 'Araştırma ve Geliştirme', baglac: 'atla' }, out: { 'Kısaltma': 'AG', 'Atlanan bağlaç': '1' } },
    { in: { metin: 'Araştırma ve Geliştirme', baglac: 'dahil' }, out: { 'Kısaltma': 'AVG', 'Atlanan bağlaç': '0' } },
    { in: { metin: 'ısı işlem ırmağı' }, out: { 'Kısaltma': 'IİI' } },
    { in: { metin: 'Katma Değer Vergisi', bicim: 'kucuk' }, out: { 'Kısaltma': 'kdv' } },
    { in: { metin: 'Sağlık-Bakım "Hizmetleri" (Merkezi)', bicim: 'asil' }, out: { 'Kısaltma': 'SBHM' } },
    { in: { metin: 've ile' }, out: { 'Kısaltma': 'Vİ' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '--- !!!' }, error: true },
  ],
  howto: [
    'Kısaltmasını istediğiniz adı ya da ifadeyi kutuya yazın. Birden fazla ad için her birini ayrı satıra koyun.',
    '"Bağlaçlar" seçeneğiyle "ve", "ile", "veya", "için" gibi kelimelerin kısaltmaya girip girmeyeceğini belirleyin.',
    '"Yazım" listesinden büyük harfli, noktalı ya da küçük harfli biçimi seçin.',
    'Liste hazırlıyorsanız "Çıktı" alanından "Kısaltma = Açılım" seçeneğini işaretleyin; her satırda kısaltma ile açılımı yan yana gelir.',
    '"Oluştur" düğmesine basın ve sonucu kopyalayın.',
  ],
  sections: [
    { h: 'Baş harf kısaltması (akronim) nedir?', p: [
      'Birden çok kelimeden oluşan bir adın, her kelimesinin ilk harfi alınarak kısaltılmasına baş harf kısaltması denir. Kurum, kuruluş, sınav, vergi ve teknik terim adlarının çoğu bu yolla kısaltılır: Türkiye Büyük Millet Meclisi TBMM, Katma Değer Vergisi KDV, Sosyal Güvenlik Kurumu SGK olur. Kısaltma bir kelime gibi okunabiliyorsa buna akronim de denir; harf harf okunanlar ise bazı kaynaklarda ayrı bir tür olarak anılır. Gündelik kullanımda ikisi için de "kısaltma" demek yeterlidir.',
      'Bu araç, işin mekanik kısmını üstlenir: satırı kelimelere böler, her kelimenin ilk harfini ya da rakamını alır, seçtiğiniz yazıma göre büyütür ve birleştirir. Tırnak, parantez gibi işaretler atlanır; tireyle ya da eğik çizgiyle birleşmiş kelimeler ayrı kelime sayılır.',
    ] },
    { h: 'Türkçe büyük harf sorunu: İ ve I', p: [
      'Türkçede dört ayrı i harfi vardır: noktalı küçük <strong>i</strong> ve büyüğü <strong>İ</strong>, noktasız küçük <strong>ı</strong> ve büyüğü <strong>I</strong>. Türkçe için ayarlanmamış yazılımlar "istanbul" kelimesinin baş harfini I olarak büyütür ve "İTÜ" yerine "ITÜ" üretir. Bu araç büyütme ve küçültme işlemini Türkçe kurallarına göre yapar: "istanbul teknik üniversitesi" yazıldığında sonuç İTÜ, "ısı" kelimesinin baş harfi ise I olur.',
      'Ö, Ü, Ş, Ç ve Ğ harfleri de kısaltmada olduğu gibi korunur; "Orta Doğu Teknik Üniversitesi" satırı ODTÜ sonucunu verir. Alan adı, kullanıcı adı ya da dosya adı gibi Türkçe karakter kabul etmeyen bir yerde kullanacaksanız sonucu ayrıca dönüştürmeniz gerekir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> "Türkiye Büyük Millet Meclisi" dört kelimedir. Baş harfler T, B, M ve M\'dir; birleşince <strong>TBMM</strong> elde edilir. Noktalı yazım seçilirse sonuç T.B.M.M. olur.',
      '<strong>Örnek 2:</strong> "Araştırma ve Geliştirme" ifadesinde bağlaç atlanırsa geriye iki kelime kalır ve kısaltma AG olur; atlanan bağlaç sayısı 1 olarak gösterilir. Bağlaç dahil edilirse sonuç AVG\'dir. Bu ifadenin yerleşik kısaltması olan "Ar-Ge" ise baş harflerden değil hecelerden kurulmuştur; araç bu tür hece kısaltmalarını üretmez.',
      '<strong>Örnek 3:</strong> İki satır yazıp "Kısaltma = Açılım" çıktısını seçtiğinizde her satır için ayrı sonuç alırsınız: "ODTÜ = Orta Doğu Teknik Üniversitesi" ve "İTÜ = İstanbul Teknik Üniversitesi". Bu çıktı, rapor ve tezlerin başındaki kısaltmalar dizini için doğrudan kullanılabilir.',
    ] },
    { h: 'Kısaltmaların yazımıyla ilgili genel kurallar', ul: [
      'Kuruluş, ülke, kitap ve yön adlarının baş harf kısaltmaları büyük harfle ve harflerin arasına nokta konmadan yazılır: TBMM, KDV. Noktalı yazım eski metinlerde ve bazı kurum içi belgelerde görülür.',
      'Büyük harfli kısaltmalara getirilen ekler kesme işaretiyle ayrılır ve ek, kısaltmanın son harfinin okunuşuna uyar: TBMM\'ye, KDV\'nin, SGK\'dan.',
      'Kısaltma metinde ilk geçtiği yerde açık adıyla birlikte verilmelidir: "Katma Değer Vergisi (KDV)". Sonraki kullanımlarda yalnızca kısaltma yeterlidir.',
      'Yerleşik kısaltmaların bir bölümü kurala tam uymaz; bazı harfler atlanmış ya da kelimelerden birden fazla harf alınmış olabilir. Resmî bir belge hazırlarken kurumun kendi kullandığı kısaltmayı esas alın.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Yeni bir proje, dernek, kulüp ya da ürün için ad ararken farklı ad seçeneklerinin nasıl kısaldığını hızlıca görmek karar vermeyi kolaylaştırır; hoş okunmayan ya da istenmeyen bir kelimeye benzeyen kısaltmalar baştan elenir. Öğrenciler, ezberlenecek bir sıralamanın (örneğin bir sınıflandırmanın basamakları) baş harflerinden hatırlatıcı bir kodlama çıkarabilir. Tez, rapor ve şartname hazırlayanlar uzun terim listelerini satır satır yapıştırıp kısaltmalar dizinini tek seferde oluşturabilir. Yazılımcılar ise modül ve değişken adlarına önek ararken kullanabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca her kelimenin ilk karakterini alır; hece kısaltmaları (Ar-Ge gibi), bir kelimeden iki harf alan kısaltmalar ya da ölçü birimi kısaltmaları (cm, kg) üretmez. Atlanan bağlaç listesi sabittir: ve, ile, veya, ya, da, de, için, ki ile İngilizcedeki and, of, the, for, in, to. Bir satır yalnızca bu kelimelerden oluşuyorsa satır boş kalmasın diye hiçbiri atlanmaz. Rakamla başlayan kelimelerde ilk rakam alınır: "3 Boyutlu Yazıcı" satırı 3BY sonucunu verir.',
    ] },
  ],
  faq: [
    ['Akronim ile kısaltma arasında fark var mı?', 'Kısaltma genel addır. Akronim, baş harflerden oluşan ve çoğunlukla bir kelime gibi okunabilen kısaltmalar için kullanılır. Harf harf okunan TBMM gibi örnekler de gündelik dilde aynı başlık altında anılır.'],
    ['"ve" bağlacı kısaltmaya girer mi?', 'Yerleşik kısaltmaların çoğunda bağlaçlar alınmaz, bu yüzden araç varsayılan olarak atlar. Bağlacın harfini de istiyorsanız "Kısaltmaya dahil et" seçeneğini kullanın.'],
    ['Küçük harfle yazdığım ad doğru büyütülür mü?', 'Evet. Büyütme Türkçe kurallarına göre yapılır; küçük i harfi İ, küçük ı harfi I olur. "izmir" ile başlayan bir adın kısaltması İ ile, "ısparta" ile başlayanınki I ile başlar.'],
    ['Kısaltmalarda nokta kullanılır mı?', 'Büyük harfli kuruluş kısaltmalarında günümüzde nokta kullanılmaz. Noktalı biçime ihtiyaç duyduğunuz özel durumlar için "Noktalı" yazım seçeneği bulunur.'],
    ['Araç neden kurumun resmî kısaltmasından farklı sonuç verdi?', 'Bazı resmî kısaltmalar bir kelimeden iki harf alır, bazı kelimeleri atlar ya da hecelerden kurulur. Araç yalnızca ilk harfleri birleştirir; resmî yazışmalarda kurumun kendi kısaltmasını kullanın.'],
    ['Aynı anda kaç ad işleyebilirim?', 'Belirli bir sınır yoktur; her satır ayrı bir ad olarak işlenir ve sonuç kutusunda aynı sırayla listelenir. Üstteki "Kısaltma" satırı ilk adın sonucunu gösterir.'],
    ['Kısaltmaya ek getirirken nelere dikkat etmeliyim?', 'Ek kesme işaretiyle ayrılır ve kısaltmanın son harfinin okunuşuna göre seçilir: KDV "ka-de-ve" diye okunduğu için "KDV\'ye" yazılır. Kelime gibi okunan kısaltmalarda ek, okunuşa uyar.'],
    ['Yazdığım adlar saklanıyor mu?', 'Hayır. Kısaltma tarayıcınızda oluşturulur; yazdıklarınız sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['ilk-harf-buyut', 'camel-snake-donustur', 'turkce-karakter-donustur', 'cumle-duzeni', 'harf-sayisi-kelime'],
};
