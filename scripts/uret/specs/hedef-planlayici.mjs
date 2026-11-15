export default {
  slug: 'hedef-planlayici',
  title: 'Hedef Planlayıcı Oluşturma',
  h1Tail: 'yazdırılabilir PDF',
  pageTitle: 'Hedef Planlayıcı Oluştur – Yazdırılabilir Hedef Planı PDF',
  description: 'Her hedef için ayrı sayfa: neden, başarı ölçütü, adım tablosu, engeller ve ilerleme şeridi. Yazdırılabilir hedef planlayıcıyı A4 ya da A5 PDF olarak oluşturun.',
  card: 'Her hedefe bir sayfa: ölçüt, adımlar, son tarihler, engeller ve ilerleme şeridi içeren hedef planlayıcıyı PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['hedef planlayıcı', 'hedef planı şablonu', 'hedef belirleme çizelgesi', 'yazdırılabilir hedef planlayıcı', 'hedef takip sayfası', 'hedef planlayıcı pdf', 'adım adım hedef planı'],
  lead: 'Aklınızdaki hedefi kâğıda döküp adımlara bölmenizi sağlayan bir <strong>hedef planlayıcı</strong> oluşturun. Her hedef kendi sayfasını alır; sayfada hedefin kendisi, nedeni, başarı ölçütü, tarihli adım tablosu, olası engeller ve onluk ilerleme şeridi bulunur.',
  button: 'Planlayıcıyı oluştur',
  inputs: [
    { id: 'adet', label: 'Hedef (sayfa) sayısı', type: 'number', value: '3', hint: '1 ile 12 arasında. Aşağıya hedef adı yazarsanız sayfa sayısı yazdığınız satır kadar olur.' },
    { id: 'adim', label: 'Adım satırı', type: 'select', options: [['8', '8 satır'], ['6', '6 satır (geniş)'], ['10', '10 satır'], ['12', '12 satır (sık)']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. 2027 Hedeflerim', hint: 'En fazla 40 karakter.' },
    { id: 'hedefler', label: 'Hedef adları (isteğe bağlı)', type: 'textarea', placeholder: 'Her satıra bir hedef\nÖrn. Haftada üç gün yürüyüş', hint: 'En fazla 12 satır, her biri en fazla 60 karakter. Boş bırakırsanız hedef alanı elle yazmak için boş basılır.', wide: true },
  ],
  compute(v, h) {
    const adlar = h.lines(v.hedefler);
    if (adlar.length > 12) h.err('En fazla 12 hedef yazabilirsiniz; fazlası için aracı ikinci kez çalıştırın.');
    for (const a of adlar) if (a.length > 60) h.err(`"${a.slice(0, 25)}…" hedefi 60 karakterden uzun; kısaltıp ayrıntıyı sayfadaki alanlara elle yazın.`);
    let n = adlar.length;
    if (!n) {
      n = h.posint(v.adet, 'Hedef sayısı');
      if (n > 12) h.err('Hedef sayısı en fazla 12 olabilir.');
    }
    const adim = ['6', '8', '10', '12'].includes(v.adim) ? Number(v.adim) : 8;
    const baslik = (v.baslik || '').trim() || 'Hedef Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    // Etiketli, içi yazı çizgili kutu
    const alan = (ops, x, y, w, hh, etiket, satir) => {
      ops.push(['kutu', x, y, w, hh, { cizgi: 0.55 }]);
      ops.push(['yazi', etiket, x + 2 * k, y + 5.2 * k, F(8.5), { kalin: true }]);
      const ara = (hh - 7 * k) / satir;
      for (let j = 1; j <= satir; j++) ops.push(['cizgi', x + 2 * k, y + 7 * k + j * ara - 1.2 * k, x + w - 2 * k, y + 7 * k + j * ara - 1.2 * k, { kalinlik: 0.2, ton: 0.75 }]);
    };
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(18), { kalin: true }]);
      ops.push(['yazi', `Hedef ${i + 1} / ${n}`, W - m, m + 7 * k, F(10), { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      let y = m + 14 * k;
      // Hedef
      if (adlar[i]) {
        ops.push(['kutu', m, y, iw, 20 * k, { cizgi: 0.55, dolgu: 0.95 }]);
        ops.push(['yazi', 'Hedefim', m + 2 * k, y + 5.2 * k, F(8.5), { kalin: true, ton: 0.3 }]);
        ops.push(['yazi', adlar[i], m + 2 * k, y + 14 * k, F(12), { kalin: true }]);
      } else alan(ops, m, y, iw, 20 * k, 'Hedefim', 2);
      y += 23 * k;
      alan(ops, m, y, iw, 18 * k, 'Bu hedef benim için neden önemli?', 2);
      y += 21 * k;
      // Tarihler ve ölçüt
      const tw = iw * 0.24, ow = iw - 2 * tw - 6 * k;
      alan(ops, m, y, tw, 14 * k, 'Başlangıç tarihi', 1);
      alan(ops, m + tw + 3 * k, y, tw, 14 * k, 'Hedef tarih', 1);
      alan(ops, m + 2 * tw + 6 * k, y, ow, 14 * k, 'Başardığımı nasıl anlayacağım?', 1);
      y += 17 * k;
      // Adım tablosu (esnek yükseklik)
      const altYuk = 65 * k, tabloH = H - m - altYuk - y, bh = 7 * k, rh = (tabloH - bh) / adim;
      const cNo = 8 * k, cTar = 26 * k, cOk = 16 * k, cAd = iw - cNo - cTar - cOk;
      ops.push(['kutu', m, y, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'No', m + cNo / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Atılacak adım', m + cNo + 2 * k, y + 4.9 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Son tarih', m + cNo + cAd + cTar / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Tamam', m + iw - cOk / 2, y + 4.9 * k, F(8), { kalin: true, hiza: 'orta' }]);
      ops.push(['kutu', m, y + bh, iw, tabloH - bh, { cizgi: 0.55 }]);
      for (const x of [m + cNo, m + cNo + cAd, m + cNo + cAd + cTar]) ops.push(['cizgi', x, y, x, y + tabloH, { kalinlik: 0.25, ton: 0.55 }]);
      for (let j = 0; j < adim; j++) {
        const ry = y + bh + j * rh;
        if (j) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(j + 1), m + cNo / 2, ry + rh / 2 + 1.2 * k, F(8), { hiza: 'orta', ton: 0.4 }]);
        const s = Math.min(4.2 * k, rh * 0.55);
        ops.push(['kutu', m + iw - cOk / 2 - s / 2, ry + rh / 2 - s / 2, s, s, { cizgi: 0.4 }]);
      }
      y += tabloH + 3 * k;
      // Engeller ve çözümler
      const yw = (iw - 3 * k) / 2;
      alan(ops, m, y, yw, 26 * k, 'Karşıma çıkabilecek engeller', 3);
      alan(ops, m + yw + 3 * k, y, yw, 26 * k, 'Engel çıkarsa ne yapacağım?', 3);
      y += 29 * k;
      // İlerleme şeridi
      const ew = 22 * k, kw = (iw - ew) / 10;
      ops.push(['yazi', 'İlerleme', m, y + 7.5 * k, F(8.5), { kalin: true }]);
      for (let j = 0; j < 10; j++) {
        ops.push(['kutu', m + ew + j * kw, y, kw, 12 * k, { cizgi: 0.5 }]);
        ops.push(['yazi', `%${(j + 1) * 10}`, m + ew + j * kw + kw / 2, y + 10.6 * k, F(6.5), { hiza: 'orta', ton: 0.5 }]);
      }
      y += 15 * k;
      alan(ops, m, y, iw, 18 * k, 'Sonunda ne öğrendim?', 2);
      sayfalar.push(ops);
    }
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['Hedef başına adım satırı', `${adim} satır`],
        ['Hedef adları', adlar.length ? 'Sayfalara yazıldı' : 'Elle doldurulacak'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'hedef-planlayici', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { adet: '3' }, out: { 'Sayfa sayısı': '3 sayfa', 'Hedef başına adım satırı': '8 satır', 'Hedef adları': 'Elle doldurulacak', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 3 },
    { in: { adet: '5', hedefler: 'Haftada üç gün yürüyüş\nAyda iki kitap bitirmek', boyut: 'a5' }, out: { 'Sayfa sayısı': '2 sayfa', 'Hedef adları': 'Sayfalara yazıldı', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 2 },
    { in: { adet: '12', adim: '12' }, out: { 'Sayfa sayısı': '12 sayfa', 'Hedef başına adım satırı': '12 satır' }, pdfSayfa: 12 },
    { in: { adet: '1', adim: '6', boyut: 'a5', baslik: '2027 Hedeflerim' }, out: { 'Sayfa sayısı': '1 sayfa', 'Hedef başına adım satırı': '6 satır' }, pdfSayfa: 1 },
    { in: { adet: '', hedefler: 'İngilizce B2 sınavını geçmek' , adim: '10' }, out: { 'Sayfa sayısı': '1 sayfa', 'Hedef başına adım satırı': '10 satır' }, pdfSayfa: 1 },
    { in: { adet: '13' }, error: true },
    { in: { adet: '0' }, error: true },
    { in: { adet: '2', hedefler: 'Bu hedef adı altmış karakter sınırını bilerek aşacak kadar uzun yazılmış bir cümledir' }, error: true },
    { in: { adet: '2', baslik: 'Bu başlık kırk karakterden çok daha uzun bir başlıktır' }, error: true },
  ],
  howto: [
    'Kaç hedef için sayfa istediğinizi "Hedef (sayfa) sayısı" alanına yazın. Hedeflerinizi şimdiden biliyorsanız alttaki kutuya her satıra bir hedef gelecek biçimde yazın; o zaman sayfa sayısı satır sayınıza eşitlenir ve hedef adı sayfanın başına basılır.',
    'Adım tablosunun kaç satır olacağını seçin. Elle rahat yazmak için 6 ya da 8, ayrıntılı bir iş listesi için 10 ya da 12 satır uygundur.',
    'Kâğıt boyutunu seçin ve isterseniz sayfaya "2027 Hedeflerim" gibi bir başlık verin.',
    '"Planlayıcıyı oluştur" düğmesine basın, önizlemeyi kontrol edin ve "PDF indir" ile dosyayı kaydedip dikey yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Bir hedef sayfasında neler var?', p: [
      'Sayfa yukarıdan aşağıya, bir hedefi düşünürken sorulan soruların sırasını izler. En üstte <strong>Hedefim</strong> kutusu vardır; hedef adını araca yazdıysanız burada koyu harflerle basılı gelir, yazmadıysanız iki satırlık boş alan olarak kalır. Hemen altında "Bu hedef benim için neden önemli?" sorusu durur. Bu alan süs değildir: işler zorlaştığında dönüp okuyacağınız cümle buraya yazılır.',
      'Üçüncü sırada yan yana üç küçük kutu bulunur: başlangıç tarihi, hedef tarih ve "Başardığımı nasıl anlayacağım?" sorusu. Sonuncusu hedefin ölçütüdür; "daha çok okumak" yerine "ayda iki kitap" yazmanızı ister. Sayfanın en geniş bölümü <strong>adım tablosudur</strong>: numara, atılacak adım, son tarih ve işaretlenecek bir "Tamam" kutusu. Tablonun satır yüksekliği seçtiğiniz satır sayısına göre kendiliğinden ayarlanır, sayfa her durumda dolu görünür.',
      'Alt kısımda engeller ile bunlara karşı planınız için iki kutu, onar puanlık on bölmeden oluşan ilerleme şeridi ve hedef tamamlandığında ya da bırakıldığında doldurulacak "Sonunda ne öğrendim?" alanı yer alır.',
    ] },
    { h: 'Hedefi adımlara bölmek', p: [
      'Hedeflerin çoğu büyük olduğu için değil, bir sonraki hareketin ne olduğu belli olmadığı için bekler. Adım tablosu bu belirsizliği gidermek içindir. İyi bir adım tek oturuşta yapılabilir ve bir fiille başlar: "Kurs araştırmak" yerine "Üç kursun ücretini ve saatini öğrenmek" gibi. Bir adımı yazarken "bunu yapmak için önce başka bir şey gerekiyor mu?" diye sorun; gerekiyorsa o iş ayrı bir satırı hak eder.',
      'Son tarih sütununu boş bırakmamaya çalışın. Tarihi olmayan adım, çoğu zaman bir dilek olarak kalır. Tarihleri hedef tarihten geriye doğru yerleştirmek işe yarar: bitiş günü belliyse son adımın ne zaman bitmesi gerektiği, ondan önceki adımın ne zaman bitmesi gerektiği sırayla ortaya çıkar. Tablodaki satırlar yetmiyorsa hedef büyük olasılıkla iki ayrı hedeftir; ikinci bir sayfa kullanın.',
    ] },
    { h: 'Çözümlü örnek: üç ayda 10 kilometre koşmak', p: [
      'Hedef adı kutusuna "Mart sonunda 10 km\'yi durmadan koşmak" yazdığınızı düşünelim. Neden alanına "merdivende nefes nefese kalmak istemiyorum" gibi size ait bir cümle gelir. Başlangıç tarihi 4 Ocak, hedef tarih 28 Mart; ölçüt ise "10 km\'yi yürümeden tamamlamak" olur.',
      'Adım tablosu şöyle dolabilir: koşu ayakkabısı almak (9 Ocak), haftada üç gün için takvimde saat ayırmak (10 Ocak), ilk hafta 2 km yürü-koş yapmak (17 Ocak), 5 km\'yi tamamlamak (14 Şubat), 8 km\'yi tamamlamak (14 Mart), 10 km denemesi (28 Mart). Engeller kutusuna "yağmurlu havalar" ve "mesaiye kalma", karşısına "kapalı pist ya da yürüme bandı" ve "sabah koşusuna geçmek" yazılır. Altı adımdan üçü bittiğinde ilerleme şeridinin ilk beş bölmesini boyarsınız; sayfaya bakan herkes yolun yarısında olduğunuzu görür.',
    ] },
    { h: 'İlerleme şeridi nasıl kullanılır?', p: [
      'Şerit %10\'dan %100\'e on eşit kutudan oluşur. En basit kullanım, tamamlanan adımların oranına göre kutuları boyamaktır: sekiz adımlık bir planda iki adım bittiyse %25 eder, ilk iki kutuyu boyar, üçüncüyü yarım bırakırsınız. Ölçülebilir hedeflerde şeridi doğrudan sayıya bağlayabilirsiniz; 50.000 liralık bir birikim hedefinde her kutu 5.000 lirayı gösterir.',
      'Şeridi her gün değil, haftada bir kez güncellemek yeterlidir. Amaç kendinizi denetlemek değil, emeğin biriktiğini görmektir.',
    ] },
    { h: 'Yazdırma ve saklama önerileri', ul: [
      '<strong>Ölçek:</strong> Yazdırma penceresinde "gerçek boyut" ya da %100 seçin; "sayfaya sığdır" seçeneği kutuları küçültür.',
      '<strong>A5 çıktı:</strong> A5, A4\'ün yarısıdır. Yazıcıda "sayfa başına 2 sayfa" seçip A4 kâğıdı ortadan keserek iki hedef sayfası elde edebilirsiniz.',
      '<strong>Görünür yer:</strong> Hedef sayfası dosyada durduğunda unutulur. Çalışma masasının üstüne, dolap kapağının içine ya da ajandanın ilk sayfasına yerleştirin.',
      '<strong>Tek taraflı baskı:</strong> Arka yüzü boş bırakırsanız ek notlar, kroki ya da hesaplar için yer kalır.',
      '<strong>Arşiv:</strong> Biten hedeflerin sayfasını atmayın; yıl sonunda bir araya getirildiğinde neyin işe yaradığını gösteren iyi bir kayıt olur.',
    ] },
    { h: 'Sınırlar', p: [
      'Bir dosyada en fazla 12 hedef sayfası üretilir. Hedef adı 60, sayfa başlığı 40 karakterle sınırlıdır; daha uzun açıklamaları sayfadaki alanlara elle yazabilirsiniz. Planlayıcı doldurulabilir bir PDF formu değildir; yazdırılıp kalemle doldurulmak üzere tasarlanmıştır. Sayfa bir yöntem dayatmaz ve hedefe ulaşmayı garanti etmez; yalnızca düşünceyi düzenli bir biçimde kâğıda dökmenize yardımcı olur.',
    ] },
  ],
  faq: [
    ['Hedef planlayıcı ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt istemez ve oluşturduğunuz PDF dosyasını dilediğiniz kadar yazdırabilirsiniz.'],
    ['Hedef adlarını yazmak zorunda mıyım?', 'Hayır. Kutuyu boş bırakırsanız "Hedefim" alanı iki satırlık boş yer olarak basılır ve hedefi elle yazarsınız. Ad yazarsanız her satır için bir sayfa üretilir ve ad sayfanın başında koyu harflerle görünür.'],
    ['Hedef adı yazdığımda sayfa sayısı alanı neden dikkate alınmıyor?', 'Her hedef kendi sayfasını aldığı için sayfa sayısı yazdığınız satır sayısına eşitlenir. Üç hedef yazdıysanız, sayı alanında beş yazsa bile üç sayfa oluşur. Boş sayfa da istiyorsanız aracı bir kez de hedef adı yazmadan çalıştırın.'],
    ['Kaç adım satırı seçmeliyim?', 'El yazınız büyükse ya da A5 kâğıt kullanacaksanız 6 ya da 8 satır rahattır. Çok aşamalı hedeflerde 10 ya da 12 satır seçebilirsiniz; satır sayısı arttıkça satır yüksekliği azalır.'],
    ['Bir hedef için birden fazla sayfa kullanabilir miyim?', 'Evet. Aynı hedef adını iki satıra yazarsanız iki sayfa üretilir; ikinci sayfayı adımların devamı için kullanabilirsiniz. Yine de adımlar bir sayfaya sığmıyorsa hedefi iki küçük hedefe bölmek çoğu zaman daha kullanışlıdır.'],
    ['İlerleme şeridini nasıl doldurmalıyım?', 'Tamamlanan adımların toplam adıma oranını ya da ölçülebilir hedeflerde ulaştığınız miktarı esas alın. Her kutu yüzde onu gösterir; kutuları kalemle tarayarak ya da boyayarak işaretlersiniz.'],
    ['Sayfayı bilgisayarda doldurabilir miyim?', 'Dosya form alanı içermeyen düz bir PDF\'tir ve yazdırılmak için tasarlanmıştır. Tablet kalemiyle not alma uygulamalarında üzerine yazabilirsiniz, ancak klavyeyle doldurulacak alanlar yoktur.'],
    ['Yazdığım hedefler bir yere kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; hedef adlarınız ve başlığınız sunucuya gönderilmez, saklanmaz. Sayfayı kapattığınızda girdiğiniz bilgiler silinir.'],
  ],
  related: ['otuz-gunluk-hedef-cizelgesi', 'aliskanlik-takip-cizelgesi', 'haftalik-planlayici', 'proje-planlayici', 'yapilacaklar-listesi-olustur'],
};
