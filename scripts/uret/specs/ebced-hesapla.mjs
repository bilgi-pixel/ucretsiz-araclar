export default {
  slug: 'ebced-hesapla',
  title: 'Ebced Hesaplama',
  h1Tail: 'Arap harfli metnin ebced değeri',
  pageTitle: 'Ebced Hesaplama – Arap Harfli Kelimenin Ebced Değerini Bulma',
  description: 'Arap ya da Osmanlı harfleriyle yazılmış bir kelimenin ebced değerini hesaplayın. Harf harf döküm, kelime toplamları ve te merbuta ile hemze seçenekleri sunar.',
  card: 'Arap harfleriyle yazılmış kelime ya da cümlenin ebced değerini harf harf dökümüyle hesaplayın.',
  category: 'metin',
  keywords: ['ebced hesaplama', 'ebced değeri', 'ebced hesabı nasıl yapılır', 'ebced tablosu', 'tarih düşürme', 'cümel hesabı', 'arap harflerinin sayı değeri'],
  lead: 'Arap harfleriyle yazılmış bir kelimenin, ismin ya da mısranın <strong>ebced değerini</strong> hesaplayın. Araç her harfin sayı karşılığını ayrı ayrı gösterir, kelime toplamlarını verir; harekeleri yok sayar ve Osmanlı Türkçesindeki ek harfleri de tanır.',
  button: 'Ebced Değerini Hesapla',
  inputs: [
    { id: 'metin', label: 'Arap harfli metin', type: 'text', placeholder: 'Örn. محمد', wide: true, hint: 'Metni Arap ya da Osmanlı harfleriyle yazın ya da yapıştırın. Latin harfli yazımın ebced değeri hesaplanamaz.' },
    { id: 'teMerbuta', label: 'Yuvarlak te (ة)', type: 'select', options: [['5', '5 say (yazıldığı gibi, he)'], ['400', '400 say (okunduğu gibi, te)']] },
    { id: 'hemze', label: 'Tek başına hemze (ء)', type: 'select', options: [['1', '1 say (elif gibi)'], ['0', 'Sayma']] },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').trim();
    if (s === '') h.err('Ebced değerini hesaplamak için Arap harfleriyle bir kelime yazın.');
    const D = {
      'ا': 1, 'أ': 1, 'إ': 1, 'آ': 1, 'ٱ': 1,
      'ب': 2, 'پ': 2, 'ج': 3, 'چ': 3, 'د': 4,
      'ه': 5, 'ە': 5, 'ھ': 5, 'ہ': 5,
      'و': 6, 'ؤ': 6, 'ز': 7, 'ژ': 7, 'ح': 8, 'ط': 9,
      'ي': 10, 'ى': 10, 'ی': 10, 'ئ': 10,
      'ك': 20, 'ک': 20, 'گ': 20, 'ڭ': 20,
      'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
      'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000,
    };
    D['ة'] = v.teMerbuta === '400' ? 400 : 5;
    D['ء'] = v.hemze === '0' ? 0 : 1;
    // Harekeler, şedde, sükûn, üstün elif ve uzatma çizgisi sayılmaz
    const temiz = s.replace(/[ً-ٰٟـۖ-ۭ]/g, '');
    const kelimeToplam = [];
    const dokum = [];
    let toplam = 0, adet = 0;
    for (const k of temiz.split(/\s+/)) {
      let kt = 0, kn = 0;
      for (const c of Array.from(k)) {
        if (!(c in D)) continue;
        const d = D[c];
        if (c === 'ء' && d === 0) continue;
        kt += d; kn++; dokum.push(`${c}=${d}`);
      }
      if (kn) { kelimeToplam.push(kt); toplam += kt; adet += kn; }
    }
    if (adet === 0) h.err('Metinde Arap harfi bulunamadı. Ebced hesabı Arap ya da Osmanlı harfleriyle yazılmış metinler içindir; örneğin محمد yazın.');
    const rows = [
      ['Ebced değeri', h.fmt(toplam, 0)],
      ['Harf sayısı', h.fmt(adet, 0)],
      ['Harf dökümü', dokum.join(', ')],
    ];
    if (kelimeToplam.length > 1) rows.push(['Kelime değerleri', kelimeToplam.join(' + ')]);
    return {
      rows,
      note: 'Büyük ebced (cümel-i kebir) değerleri kullanıldı. Şeddeli harf bir kez sayıldı; harekeler hesaba katılmadı.',
    };
  },
  cases: [
    { in: { metin: 'محمد' }, out: { 'Ebced değeri': '92', 'Harf sayısı': '4', 'Harf dökümü': 'م=40, ح=8, م=40, د=4' } },
    { in: { metin: 'الله' }, out: { 'Ebced değeri': '66', 'Harf sayısı': '4' } },
    { in: { metin: 'بسم الله الرحمن الرحيم' }, out: { 'Ebced değeri': '786', 'Harf sayısı': '19', 'Kelime değerleri': '102 + 66 + 329 + 289' } },
    { in: { metin: 'علي' }, out: { 'Ebced değeri': '110' } },
    { in: { metin: 'أحمد' }, out: { 'Ebced değeri': '53' } },
    { in: { metin: 'مُحَمَّد' }, out: { 'Ebced değeri': '92', 'Harf sayısı': '4' } },
    { in: { metin: 'فاطمة', teMerbuta: '5' }, out: { 'Ebced değeri': '135' } },
    { in: { metin: 'فاطمة', teMerbuta: '400' }, out: { 'Ebced değeri': '530' } },
    { in: { metin: 'ماء', hemze: '0' }, out: { 'Ebced değeri': '41', 'Harf sayısı': '2' } },
    { in: { metin: 'غ' }, out: { 'Ebced değeri': '1.000' } },
    { in: { metin: 'merhaba' }, error: true },
    { in: { metin: '' }, error: true },
  ],
  howto: [
    'Değerini öğrenmek istediğiniz kelimeyi, ismi ya da mısrayı Arap harfleriyle yazın ya da bir kaynaktan kopyalayıp yapıştırın.',
    'Kelimede yuvarlak te (ة) varsa bunun 5 mi yoksa 400 mü sayılacağını seçin; yaygın uygulama yazılışa göre 5 saymaktır.',
    'Tek başına yazılan hemzenin sayılıp sayılmayacağını belirleyin.',
    '"Ebced Değerini Hesapla" düğmesine basın. Toplam değer, harf sayısı ve her harfin karşılığı listelenir; birden çok kelime varsa kelime toplamları ayrıca gösterilir.',
  ],
  sections: [
    { h: 'Ebced nedir?', p: [
      'Ebced, Arap alfabesindeki harflerin eski bir sıralamasına ve bu sıralamaya bağlı sayı değerlerine verilen addır. Adını dizilişin ilk dört harfinden (elif, be, cim, dal) alır. Harfler akılda kolay kalsın diye sekiz kelimelik bir kalıpla ezberlenir: <em>ebced, hevvez, huttî, kelemen, sa\'fes, karaşet, sehaz, dazığ</em>. Bu dizilişte ilk dokuz harf birleri, sonraki dokuz harf onları, sonraki dokuz harf yüzleri gösterir; son harf ise bin değerindedir.',
      'Rakamların yaygınlaşmadığı dönemlerde harflerle sayı yazmak pek çok kültürde bilinen bir yöntemdi. Ebced sistemi de İslam dünyasında astronomi cetvellerinde, matematik metinlerinde, kitapların ön söz sayfalarını numaralamada ve madde sıralamada kullanılmıştır. Edebiyatta ise en bilinen kullanımı tarih düşürmedir.',
    ] },
    { h: 'Ebced tablosu: harflerin sayı değerleri', ul: [
      '<strong>Birler:</strong> ا elif 1, ب be 2, ج cim 3, د dal 4, ه he 5, و vav 6, ز ze 7, ح ha 8, ط tı 9',
      '<strong>Onlar:</strong> ي ye 10, ك kef 20, ل lam 30, م mim 40, ن nun 50, س sin 60, ع ayın 70, ف fe 80, ص sad 90',
      '<strong>Yüzler:</strong> ق kaf 100, ر rı 200, ش şın 300, ت te 400, ث se 500, خ hı 600, ذ zel 700, ض dad 800, ظ zı 900',
      '<strong>Bin:</strong> غ gayın 1000',
      '<strong>Osmanlı Türkçesi ve Farsçadaki ek harfler:</strong> پ pe, be gibi 2; چ çim, cim gibi 3; ژ je, ze gibi 7; گ gef ve ڭ nef (sağır kef), kef gibi 20 sayılır.',
    ] },
    { h: 'Hesap nasıl yapılır? Çözümlü örnekler', p: [
      'Hesap, kelimedeki her harfin tablodaki değerini bulup toplamaktan ibarettir. Harfin kelimenin başında, ortasında ya da sonunda farklı biçimde yazılması değeri değiştirmez. Harekeler (üstün, esre, ötre), sükûn ve şedde işareti sayılmaz; yalnızca yazılan harfler hesaba girer.',
      'Örnek 1: <strong>محمد</strong>. Mim 40, ha 8, mim 40, dal 4. Toplam 40 + 8 + 40 + 4 = <strong>92</strong>. Kelime harekeli ve şeddeli yazılsa da sonuç değişmez; çünkü şeddeli mim yazıda tek harftir.',
      'Örnek 2: <strong>الله</strong>. Elif 1, lam 30, lam 30, he 5. Toplam <strong>66</strong>.',
      'Örnek 3: <strong>بسم الله الرحمن الرحيم</strong>. Kelime kelime gidersek ilk kelime 2 + 60 + 40 = 102; ikinci kelime 66; üçüncü kelime 1 + 30 + 200 + 8 + 40 + 50 = 329; dördüncü kelime 1 + 30 + 200 + 8 + 10 + 40 = 289 eder. Dört kelimenin toplamı 102 + 66 + 329 + 289 = <strong>786</strong> olur. On dokuz harften oluşan bu ibarenin değeri, ebced hesabının en bilinen örneklerindendir.',
    ] },
    { h: 'Tarih düşürme geleneği', p: [
      'Divan edebiyatında şairler önemli bir olayın yılını, harflerinin ebced toplamı o yılı veren bir mısra ya da ibareyle bildirirdi. Buna tarih düşürme denir. Doğum, ölüm, tahta çıkış, fetih, bir caminin ya da çeşmenin yapımı gibi olaylar için yazılan bu mısralar çoğu kez yapının kitabesinde ya da mezar taşında yer alır. Elde edilen sayı genellikle hicri yıldır.',
      'Tarih düşürmenin türleri vardır. Mısradaki bütün harfler sayılıyorsa <em>tam tarih</em>, yalnızca noktalı harfler sayılıyorsa <em>cevher (mücevher) tarih</em>, yalnızca noktasız harfler sayılıyorsa <em>mühmel tarih</em> adını alır. Toplamın birkaç eksik ya da fazla çıktığı ve farkın mısradaki bir ipucuyla tamamlandığı türe ise <em>tamiyeli tarih</em> denir. Bu araç tam tarih hesabını yapar; diğer türlerde harf dökümü satırından ilgili harfleri seçip toplayabilirsiniz.',
    ] },
    { h: 'Tartışmalı harfler ve aracın varsayımları', ul: [
      '<strong>Yuvarlak te (ة):</strong> Kelime sonunda he biçiminde yazılan bu harf, yazılışa göre 5, okunuşa göre 400 sayılabilir. Kaynaklarda ağırlıklı olarak yazılış esas alınır; araç varsayılan olarak 5 kullanır, isterseniz 400 seçebilirsiniz.',
      '<strong>Hemze (ء):</strong> Tek başına yazılan hemzeyi kimi hesaplar elif gibi 1 sayar, kimi hiç saymaz. Elif, vav ya da ye üzerinde yazılan hemzeler taşıyıcı harfin değerini alır (أ 1, ؤ 6, ئ 10).',
      '<strong>Medli elif (آ):</strong> Araç tek elif olarak 1 sayar. Bazı hesaplarda iki elif kabul edilip 2 sayıldığına rastlanır.',
      '<strong>Şeddeli harfler:</strong> Yazıda tek harf olduğu için bir kez sayılır. Bazı tarih mısralarında okunuşa göre iki kez sayıldığı da olur.',
      '<strong>Elif maksure (ى):</strong> Ye gibi 10 sayılır.',
    ], p: [
      'Bu farklılıklar yüzünden aynı ibare için değişik kaynaklarda birkaç birim oynayan sonuçlar görebilirsiniz. Bir kitabeyi ya da şiiri inceliyorsanız şairin hangi kabulü kullandığını beklenen tarihe bakarak sınamak gerekir.',
    ] },
    { h: 'Bu sonuç ne anlama gelir, ne anlama gelmez?', p: [
      'Ebced değeri bir harf–sayı eşleştirmesinin aritmetik toplamıdır. Edebiyat tarihi, kitabe okuma ve eski metin incelemeleri için değerli bir araçtır. Buna karşılık bir ismin ebced değerinden kişilik, kısmet ya da gelecek hakkında sonuç çıkarmanın bilimsel bir dayanağı yoktur; bu sayfa öyle bir yorum sunmaz ve sonuçlar bu amaçla kullanılmamalıdır.',
      'Latin harfleriyle yazılmış Türkçe bir ismin ebced değeri doğrudan hesaplanamaz; çünkü tablo Arap harfleri içindir ve bir ismin Arap harfli yazımı birden çok biçimde olabilir. İsmin eski yazıdaki doğru imlasını bir sözlükten ya da güvenilir bir kaynaktan bulup o yazımı girmeniz gerekir.',
    ] },
  ],
  faq: [
    ['Ebced hesabı nasıl yapılır?', 'Kelime Arap harfleriyle yazılır, her harfin ebced tablosundaki sayı değeri bulunur ve bu değerler toplanır. Örneğin محمد kelimesinde mim 40, ha 8, mim 40 ve dal 4 eder; toplam 92\'dir.'],
    ['Latin harfleriyle yazdığım ismin ebced değerini bulabilir miyim?', 'Doğrudan hayır. Ebced tablosu Arap harflerine göredir. İsmin Arap ya da Osmanlı harfleriyle doğru yazımını bulup o biçimde girmeniz gerekir; aynı ismin birden çok imlası olabileceğini unutmayın.'],
    ['Harekeler ve şedde sonucu etkiler mi?', 'Hayır. Üstün, esre, ötre, sükûn ve şedde gibi işaretler harf değildir ve sayılmaz. Araç bu işaretleri metinden ayıklar; harekeli ve harekesiz yazım aynı sonucu verir.'],
    ['Yuvarlak te 5 mi 400 mü sayılır?', 'İki uygulama da vardır. Yazılışı esas alanlar he gibi 5, okunuşu esas alanlar te gibi 400 sayar. Yaygın olan 5\'tir. Araçta ikisini de deneyip incelediğiniz kaynağın hangisini kullandığını görebilirsiniz.'],
    ['Tarih düşürme nedir?', 'Bir olayın yılını, harflerinin ebced toplamı o yıla eşit olan bir söz ya da mısra ile belirtme sanatıdır. Osmanlı döneminde cami, çeşme ve mezar taşı kitabelerinde sıkça görülür ve sonuç çoğunlukla hicri yılı verir.'],
    ['Büyük ebced ve küçük ebced ne demek?', 'Bu sayfada kullanılan ve harflere 1\'den 1000\'e kadar değer veren yaygın sistem büyük ebced (cümel-i kebir) olarak anılır. Kaynaklarda başka hesap yöntemleri de geçer; bunların tanımı kaynaktan kaynağa değiştiği için araç yalnızca standart tabloyu uygular.'],
    ['Pe, çim, je gibi harfler nasıl hesaplanıyor?', 'Arap alfabesinde bulunmayan bu harfler, yazıca benzedikleri harfin değerini alır: pe 2, çim 3, je 7, gef 20. Osmanlı tarih mısralarındaki yaygın uygulama budur.'],
    ['Yazdığım metin kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz kelime ya da isim sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['turkce-alfabe-sirasi', 'hicri-miladi', 'roma-rakami', 'harf-frekansi', 'sayi-yaziya-cevir'],
};
