export default {
  slug: 'pil-seri-paralel-hesapla',
  title: 'Pil Seri Paralel Bağlantı Hesaplama',
  h1Tail: 'gerilim, kapasite ve enerji',
  pageTitle: 'Pil Seri Paralel Bağlantı Hesaplama – Gerilim, mAh ve Wh',
  description: 'Seri ve paralel bağlanan pil hücrelerinin toplam gerilimini, kapasitesini (mAh), enerjisini (Wh) ve tahmini çalışma süresini hesaplayın; 3S2P gibi dizilimleri çözün.',
  card: 'Seri ve paralel bağlı pil paketinin toplam gerilimini, kapasitesini, enerjisini ve çalışma süresini bulun.',
  category: 'elektrik',
  keywords: ['pil seri paralel hesaplama', 'seri bağlı pil gerilimi', 'paralel bağlı pil kapasitesi', '3s2p ne demek', 'batarya paketi hesaplama', 'lityum pil paketi hesaplama', 'pil bağlantı hesabı'],
  lead: 'Tek hücrenin gerilimini ve kapasitesini, kaç hücrenin seri ve kaç kolun paralel bağlandığını yazın. Araç paketin <strong>toplam gerilimini, kapasitesini ve enerjisini</strong> hesaplar; yük akımını verirseniz tahmini çalışma süresini de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'gerilim', label: 'Hücre gerilimi (V)', type: 'number', placeholder: 'Örn. 3,7', value: '3,7' },
    { id: 'kapasite', label: 'Hücre kapasitesi (mAh)', type: 'number', placeholder: 'Örn. 2500' },
    { id: 'seri', label: 'Seri hücre sayısı (S)', type: 'number', placeholder: 'Örn. 3', value: '1' },
    { id: 'paralel', label: 'Paralel kol sayısı (P)', type: 'number', placeholder: 'Örn. 2', value: '1' },
    { id: 'akim', label: 'Yük akımı (A, isteğe bağlı)', type: 'number', placeholder: 'Örn. 2', hint: 'Yazarsanız kuramsal çalışma süresi hesaplanır.' },
  ],
  compute(v, h) {
    const vh = h.pos(v.gerilim, 'Hücre gerilimi');
    const mah = h.pos(v.kapasite, 'Hücre kapasitesi');
    const s = h.posint(v.seri, 'Seri hücre sayısı');
    const p = h.posint(v.paralel, 'Paralel kol sayısı');
    if (s > 1000 || p > 1000) h.err('Seri ve paralel sayıları en fazla 1000 olabilir.');
    const vt = vh * s;
    const mahT = mah * p;
    const wh = vt * mahT / 1000;
    const rows = [
      ['Toplam gerilim', h.fmt(vt, 3) + ' V'],
      ['Toplam kapasite', h.fmt(mahT, 2) + ' mAh'],
      ['Toplam kapasite (Ah)', h.fmt(mahT / 1000, 4) + ' Ah'],
      ['Toplam enerji', h.fmt(wh, 3) + ' Wh'],
      ['Dizilim', s + 'S' + p + 'P'],
      ['Toplam hücre sayısı', h.fmt(s * p, 0) + ' adet'],
    ];
    if (String(v.akim ?? '').trim() !== '') {
      const a = h.pos(v.akim, 'Yük akımı');
      const saat = mahT / 1000 / a;
      const dk = Math.round(saat * 60);
      rows.push(['Kuramsal çalışma süresi', h.fmt(saat, 2) + ' saat (' + Math.floor(dk / 60) + ' sa ' + (dk % 60) + ' dk)']);
      rows.push(['Hücre başına akım', h.fmt(a / p, 3) + ' A']);
      rows.push(['Yük gücü (anma geriliminde)', h.fmt(vt * a, 2) + ' W']);
    }
    return { rows, note: 'Gerilim anma (nominal) değeriyle hesaplanır. Gerçek süre; boşalma akımı, sıcaklık, pil yaşı ve koruma devresinin kesme gerilimi nedeniyle kuramsal değerin altında kalır.' };
  },
  cases: [
    { in: { gerilim: '3,7', kapasite: '2500', seri: '3', paralel: '2' }, out: { 'Toplam gerilim': '11,1 V', 'Toplam kapasite': '5.000 mAh', 'Toplam enerji': '55,5 Wh', 'Dizilim': '3S2P', 'Toplam hücre sayısı': '6 adet' } },
    { in: { gerilim: '1,5', kapasite: '2000', seri: '4', paralel: '1', akim: '0,5' }, out: { 'Toplam gerilim': '6 V', 'Toplam kapasite': '2.000 mAh', 'Toplam enerji': '12 Wh', 'Kuramsal çalışma süresi': '4 saat (4 sa 0 dk)', 'Yük gücü (anma geriliminde)': '3 W' } },
    { in: { gerilim: '3,2', kapasite: '100000', seri: '4', paralel: '1' }, out: { 'Toplam gerilim': '12,8 V', 'Toplam kapasite (Ah)': '100 Ah', 'Toplam enerji': '1.280 Wh' } },
    { in: { gerilim: '3,7', kapasite: '3000', seri: '1', paralel: '4', akim: '8' }, out: { 'Toplam gerilim': '3,7 V', 'Toplam kapasite': '12.000 mAh', 'Toplam enerji': '44,4 Wh', 'Kuramsal çalışma süresi': '1,5 saat (1 sa 30 dk)', 'Hücre başına akım': '2 A' } },
    { in: { gerilim: '1,2', kapasite: '2400', seri: '8', paralel: '1' }, out: { 'Toplam gerilim': '9,6 V', 'Toplam enerji': '23,04 Wh', 'Dizilim': '8S1P' } },
    { in: { gerilim: '3,6', kapasite: '3400', seri: '10', paralel: '4' }, out: { 'Toplam gerilim': '36 V', 'Toplam kapasite (Ah)': '13,6 Ah', 'Toplam enerji': '489,6 Wh', 'Toplam hücre sayısı': '40 adet' } },
    { in: { gerilim: '3,7', kapasite: '2500', seri: '2,5', paralel: '1' }, error: true },
    { in: { gerilim: '3,7', kapasite: '', seri: '3', paralel: '2' }, error: true },
  ],
  howto: [
    'Tek bir hücrenin anma gerilimini volt olarak yazın. Lityum iyon için genellikle 3,6 ya da 3,7 V, alkalin kalem pil için 1,5 V, şarjlı NiMH için 1,2 V kullanılır.',
    'Hücrenin kapasitesini miliamper saat (mAh) olarak girin. Etikette Ah yazıyorsa 1000 ile çarpın: 100 Ah = 100000 mAh.',
    'Uç uca (artıdan eksiye) bağlanan hücre sayısını "Seri", yan yana bağlanan kol sayısını "Paralel" alanına yazın. Yalnızca seri bağlantı için paraleli 1 bırakın.',
    'Çalışma süresini görmek istiyorsanız cihazın çektiği ortalama akımı amper olarak ekleyin.',
    '"Hesapla" düğmesine basın; toplam gerilim, kapasite, enerji ve dizilim adı sonuç kutusunda listelenir.',
  ],
  sections: [
    { h: 'Seri bağlantıda ne artar, paralelde ne artar?', p: [
      'Pilleri bağlamanın iki temel yolu vardır ve ikisi farklı büyüklüğü artırır. <strong>Seri bağlantıda</strong> bir pilin artı ucu sonrakinin eksi ucuna bağlanır; gerilimler toplanır, kapasite ise tek hücreninkiyle aynı kalır. <strong>Paralel bağlantıda</strong> artılar artılarla, eksiler eksilerle birleştirilir; gerilim değişmez, kapasiteler toplanır.',
      'Formüller yalındır: toplam gerilim = hücre gerilimi × S, toplam kapasite = hücre kapasitesi × P. Paketin depoladığı enerji ise ikisinin çarpımıdır: <strong>Wh = V × Ah</strong>. Dikkat çekici nokta şudur: aynı sayıda hücreyi nasıl bağlarsanız bağlayın toplam enerji değişmez. Dört hücreyi 4S1P ya da 2S2P kurmak yalnızca gerilim ile kapasite arasındaki dengeyi değiştirir.',
    ] },
    { h: 'Çözümlü örnek: 3S2P lityum paket', p: [
      'Elinizde 3,7 V ve 2500 mAh değerinde altı lityum iyon hücre olsun. Bunları ikişerli paralel gruplar hâlinde birleştirip üç grubu seri bağlarsanız 3S2P dizilimini elde edersiniz.',
    ], ol: [
      'Toplam gerilim: 3,7 V × 3 = 11,1 V',
      'Toplam kapasite: 2500 mAh × 2 = 5000 mAh, yani 5 Ah',
      'Toplam enerji: 11,1 V × 5 Ah = 55,5 Wh',
      'Toplam hücre: 3 × 2 = 6 adet',
    ] },
    { h: 'S ve P gösterimi nasıl okunur?', p: [
      'Batarya paketlerinin etiketlerinde "4S", "10S4P", "13S5P" gibi kısaltmalar görürsünüz. S harfinden önceki sayı seri bağlı grup sayısını, P harfinden önceki sayı her gruptaki paralel hücre sayısını verir. 10S4P bir paket 40 hücreden oluşur; 3,6 V ve 3400 mAh hücrelerle kurulduğunda 36 V, 13,6 Ah ve 489,6 Wh eder. Elektrikli bisiklet ve scooter bataryalarındaki "36 V" ya da "48 V" ifadeleri bu seri sayısından gelir.',
      'Model uçak ve dron bataryalarında yalnızca S değeri söylenir: 3S bir lityum polimer paket 11,1 V, 4S paket 14,8 V, 6S paket 22,2 V anma gerilimine sahiptir.',
    ] },
    { h: 'Çalışma süresi nasıl bulunur?', p: [
      'Kuramsal süre, toplam kapasitenin yük akımına bölünmesiyle bulunur: <strong>süre (saat) = Ah ÷ A</strong>. Dört paralel 3000 mAh hücre 12 Ah eder; 8 A çeken bir yük bu paketi kâğıt üzerinde 12 ÷ 8 = 1,5 saatte boşaltır. Paralel bağlantının bir yararı da akımın kollara bölünmesidir: bu örnekte her hücreden yalnızca 2 A çekilir.',
      'Gerçek hayatta süre bu değerin altında kalır. Yüksek akımda hücrenin kullanılabilir kapasitesi düşer, soğuk havada performans azalır, koruma devresi hücreleri tümüyle boşalmadan keser ve yaşlanan piller etiket kapasitesini veremez. Planlama yaparken kuramsal sürenin yüzde 70–85\'ini beklemek daha gerçekçidir.',
    ] },
    { h: 'Hızlı başvuru: yaygın hücre gerilimleri', ul: [
      '<strong>Alkalin (AA, AAA):</strong> 1,5 V anma',
      '<strong>NiMH şarjlı kalem pil:</strong> 1,2 V anma',
      '<strong>Lityum iyon (18650, 21700):</strong> 3,6–3,7 V anma, tam dolu 4,2 V',
      '<strong>Lityum demir fosfat (LiFePO4):</strong> 3,2 V anma',
      '<strong>Kurşun asit hücre:</strong> 2 V anma (6 hücre seri = 12 V akü)',
    ] },
    { h: 'Güvenlik ve sık yapılan hatalar', p: [
      'Seri ya da paralel bağlanacak hücreler aynı kimyada, aynı kapasitede, mümkünse aynı üretim partisinden ve aynı yaşta olmalıdır. Farklı kapasiteli hücreler seri bağlandığında zayıf olan önce boşalır ve ters kutuplanarak hasar görebilir. Paralel bağlamadan önce hücrelerin gerilimleri birbirine çok yakın olmalıdır; aradaki fark büyükse dolu hücreden boş hücreye denetimsiz, yüksek bir akım akar.',
      'Lityum tabanlı paketlerde aşırı şarj, aşırı deşarj ve kısa devreye karşı koruma sağlayan bir batarya yönetim devresi (BMS) ve seri gruplar arasında dengeleme zorunlu kabul edilmelidir. Şarj edilemeyen (birincil) pilleri paralel bağlamak ya da şarj etmeye çalışmak tehlikelidir.',
      'Bu araç yalnızca aritmetik hesap yapar ve bilgilendirme amaçlıdır. Yüksek enerjili batarya paketi tasarımı, punta kaynağı ve sigorta seçimi uzmanlık ister; yangın ve patlama riski nedeniyle emin olmadığınız işlerde yetkin bir teknisyene danışın.',
    ] },
  ],
  faq: [
    ['Pilleri seri bağlarsam kapasite artar mı?', 'Hayır. Seri bağlantıda yalnızca gerilim artar; mAh değeri tek hücreninkiyle aynı kalır. Ancak gerilim arttığı için paketin toplam enerjisi (Wh) artar.'],
    ['Paralel bağlantıda gerilim değişir mi?', 'Değişmez. İki adet 3,7 V hücreyi paralel bağlarsanız gerilim yine 3,7 V olur; kapasite iki katına çıkar ve her hücreden çekilen akım yarıya iner.'],
    ['3S2P ne demek?', 'Üç grup seri, her grupta iki hücre paralel demektir. Toplam altı hücre kullanılır; gerilim üç katına, kapasite iki katına çıkar.'],
    ['mAh mı Wh mı daha doğru bir karşılaştırma verir?', 'Farklı gerilimdeki paketleri karşılaştırırken Wh kullanın. 10000 mAh değerindeki 3,7 V bir paket 37 Wh, aynı mAh değerindeki 12 V bir paket 120 Wh enerji taşır.'],
    ['Farklı kapasitede pilleri birlikte kullanabilir miyim?', 'Önerilmez. Seri bağlantıda paketin kapasitesi en zayıf hücreyle sınırlanır ve o hücre zarar görebilir. Paralelde kapasiteler toplanır ama hücreler aynı kimya ve gerilimde olmalıdır.'],
    ['Tam dolu gerilim neden hesaplanandan yüksek?', 'Araç anma gerilimini kullanır. Lityum iyon bir hücre tam doluyken yaklaşık 4,2 V, boşalırken 3 V dolayındadır; 3S bir paket bu yüzden 12,6 V ile 9 V arasında değişir.'],
    ['Kapasiteyi Ah olarak nasıl girerim?', 'Ah değerini 1000 ile çarpıp mAh olarak yazın. 7 Ah bir akü için 7000, 100 Ah için 100000 girin; sonuçta Ah karşılığı ayrı satırda gösterilir.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır, değerleriniz sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['mah-wh-cevir', 'aku-kullanim-suresi-hesapla', 'sarj-suresi-hesapla', 'powerbank-sarj-sayisi-hesapla', 'ohm-kanunu-hesapla'],
};
