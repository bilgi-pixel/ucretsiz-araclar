export default {
  slug: 'epoksi-recine-hesapla',
  title: 'Epoksi Reçine Miktarı Hesaplama',
  h1Tail: 'reçine ve sertleştirici',
  pageTitle: 'Epoksi Reçine Miktarı Hesaplama – Reçine ve Sertleştirici Oranı',
  description: 'Epoksi masa, tezgâh ya da kalıp dökümü için gereken toplam epoksi miktarını, reçine ve sertleştirici paylarını en, boy, kalınlık ve karışım oranına göre hesaplayın.',
  card: 'Yüzey ölçüsü ve döküm kalınlığına göre gereken epoksiyi, reçine ile sertleştirici payını litre ve gram olarak bulun.',
  category: 'gunluk',
  keywords: ['epoksi reçine hesaplama', 'epoksi masa kaç kg reçine', 'reçine sertleştirici oranı', 'epoksi miktarı hesaplama', 'epoksi döküm hesabı', 'epoksi kaç litre gerekir', '2:1 epoksi karışım'],
  lead: 'Dökeceğiniz alanın enini, boyunu ve kalınlığını yazın; araç gereken epoksi hacmini bulur, yoğunlukla kilograma çevirir ve ürününüzün karışım oranına göre <strong>reçine (A)</strong> ile <strong>sertleştirici (B)</strong> miktarını ayrı ayrı verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'En (cm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kalinlik', label: 'Döküm kalınlığı (mm)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'oranA', label: 'Karışım oranı – reçine (A) payı', type: 'number', value: '2' },
    { id: 'oranB', label: 'Karışım oranı – sertleştirici (B) payı', type: 'number', value: '1' },
    { id: 'tur', label: 'Oranın türü', type: 'select', options: [['agirlik', 'Ağırlıkça (teraziyle tartılır)'], ['hacim', 'Hacimce (ölçü kabıyla ölçülür)']] },
    { id: 'yogunluk', label: 'Karışım yoğunluğu (g/cm³)', type: 'number', value: '1,1', hint: 'Şeffaf döküm epoksileri çoğunlukla 1,05–1,15 arasındadır.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const kal = h.pos(v.kalinlik, 'Döküm kalınlığı');
    const a = h.pos(v.oranA, 'Reçine payı');
    const b = h.pos(v.oranB, 'Sertleştirici payı');
    const yog = h.pos(v.yogunluk, 'Karışım yoğunluğu');
    const fire = h.nonneg(h.opt(v.fire, 0, 'Fire payı'), 'Fire payı');
    if (yog < 0.8 || yog > 2.5) h.err('Karışım yoğunluğu 0,8 ile 2,5 g/cm³ arasında olmalı; bilmiyorsanız 1,1 yazın.');
    if (fire > 100) h.err('Fire payı %100\'den büyük olamaz.');
    const net = en * boy * (kal / 10); // cm³ = ml
    const ml = net * (1 + fire / 100);
    const g = ml * yog;
    const rows = [
      ['Gerekli toplam epoksi', `${h.fmt(g / 1000, 2)} kg (${h.fmt(ml / 1000, 2)} litre)`],
    ];
    if (v.tur === 'hacim') {
      rows.push(['Reçine (A)', h.fmt(ml * a / (a + b), 0) + ' ml']);
      rows.push(['Sertleştirici (B)', h.fmt(ml * b / (a + b), 0) + ' ml']);
    } else {
      rows.push(['Reçine (A)', h.fmt(g * a / (a + b), 0) + ' g']);
      rows.push(['Sertleştirici (B)', h.fmt(g * b / (a + b), 0) + ' g']);
    }
    rows.push(['Net hacim (firesiz)', h.fmt(net / 1000, 3) + ' litre']);
    rows.push(['Yüzey alanı', h.fmt(en * boy / 10000, 3) + ' m²']);
    rows.push(['Karışım oranı', `${h.fmt(a, 2)} : ${h.fmt(b, 2)} (${v.tur === 'hacim' ? 'hacimce' : 'ağırlıkça'})`]);
    return {
      rows,
      note: 'Karışım oranını ve oranın ağırlıkça mı hacimce mi olduğunu mutlaka ürününüzün etiketinden alın. Tek seferde dökülebilecek en fazla kalınlık ürüne göre değişir.',
    };
  },
  cases: [
    { in: { en: '50', boy: '100', kalinlik: '3', oranA: '2', oranB: '1', tur: 'agirlik', yogunluk: '1,1', fire: '10' }, out: { 'Gerekli toplam epoksi': '1,82 kg (1,65 litre)', 'Reçine (A)': '1.210 g', 'Sertleştirici (B)': '605 g', 'Net hacim (firesiz)': '1,5 litre' } },
    { in: { en: '50', boy: '100', kalinlik: '3', oranA: '2', oranB: '1', tur: 'hacim', yogunluk: '1,1', fire: '10' }, out: { 'Reçine (A)': '1.100 ml', 'Sertleştirici (B)': '550 ml', 'Yüzey alanı': '0,5 m²' } },
    { in: { en: '100', boy: '100', kalinlik: '1', oranA: '1', oranB: '1', tur: 'hacim', yogunluk: '1,1', fire: '0' }, out: { 'Gerekli toplam epoksi': '1,1 kg (1 litre)', 'Reçine (A)': '500 ml', 'Sertleştirici (B)': '500 ml' } },
    { in: { en: '20', boy: '200', kalinlik: '40', oranA: '100', oranB: '45', tur: 'agirlik', yogunluk: '1,1', fire: '0' }, out: { 'Gerekli toplam epoksi': '17,6 kg (16 litre)', 'Reçine (A)': '12.138 g', 'Sertleştirici (B)': '5.462 g' } },
    { in: { en: '10', boy: '10', kalinlik: '5', oranA: '3', oranB: '1', tur: 'agirlik', yogunluk: '1', fire: '0' }, out: { 'Gerekli toplam epoksi': '0,05 kg (0,05 litre)', 'Reçine (A)': '38 g', 'Sertleştirici (B)': '13 g' } },
    { in: { en: '80', boy: '160', kalinlik: '2', oranA: '2', oranB: '1', tur: 'agirlik', yogunluk: '1,1', fire: '15' }, out: { 'Net hacim (firesiz)': '2,56 litre', 'Gerekli toplam epoksi': '3,24 kg (2,94 litre)', 'Karışım oranı': '2 : 1 (ağırlıkça)' } },
    { in: { en: '50', boy: '100', kalinlik: '0', oranA: '2', oranB: '1' }, error: true },
    { in: { en: '50', boy: '100', kalinlik: '3', oranA: '2', oranB: '0' }, error: true },
    { in: { en: '50', boy: '100', kalinlik: '3', oranA: '2', oranB: '1', yogunluk: '11' }, error: true },
  ],
  howto: [
    'Dökülecek alanın enini ve boyunu santimetre olarak yazın. Nehir masada yalnızca epoksiyle dolacak boşluğun ortalama genişliğini ve uzunluğunu girin.',
    'Döküm kalınlığını milimetre olarak yazın: yüzey kaplaması için 1–3 mm, nehir dökümünde ahşabın kalınlığı.',
    'Ürün etiketindeki karışım oranını iki paya ayırarak girin (2:1 için 2 ve 1; 100:45 için 100 ve 45) ve oranın ağırlıkça mı hacimce mi olduğunu seçin.',
    'Yoğunluğu ve fire payını gerekiyorsa değiştirin, ardından "Hesapla" düğmesine basın.',
    'Çıkan reçine ve sertleştirici miktarlarını ayrı kaplarda ölçün, sonra birleştirip üreticinin önerdiği süre boyunca karıştırın.',
  ],
  sections: [
    { h: 'Formül', p: [
      'Epoksi ihtiyacı aslında basit bir hacim hesabıdır: <strong>hacim = en × boy × kalınlık</strong>. Ölçüler santimetreye çevrildiğinde sonuç santimetreküp çıkar ve 1 cm³ = 1 ml olduğundan doğrudan mililitre olarak okunur. Akılda tutması kolay kural şudur: <strong>1 m² alana 1 mm kalınlık = 1 litre</strong>.',
      'Hacim, fire payı kadar artırılır ve yoğunlukla çarpılarak ağırlığa çevrilir: <strong>ağırlık (g) = hacim (ml) × yoğunluk (g/cm³)</strong>. Epoksi sudan biraz ağırdır; şeffaf döküm ürünlerinde karışımın yoğunluğu çoğunlukla 1,1 g/cm³ dolayındadır, dolgulu ve pigmentli zemin epoksilerinde daha yüksektir. Son adımda toplam, karışım oranına göre bölüştürülür: A : B oranında reçinenin payı A ÷ (A + B), sertleştiricinin payı B ÷ (A + B) olur.',
    ] },
    { h: 'Çözümlü örnek: sehpa yüzeyi kaplama', p: [
      '50 × 100 cm\'lik bir sehpanın üzerine 3 mm kalınlığında şeffaf kat dökülecek olsun. Net hacim 50 × 100 × 0,3 = 1500 cm³, yani 1,5 litredir. Kenarlardan taşan ve karıştırma kabında kalan malzeme için %10 fire eklenince 1,65 litre eder. Yoğunluk 1,1 alındığında 1650 × 1,1 = 1815 gram, yuvarlak hesapla 1,82 kg epoksi gerekir.',
      'Ürün ağırlıkça 2:1 karışıyorsa reçine 1815 × 2 ÷ 3 = 1210 gram, sertleştirici 1815 × 1 ÷ 3 = 605 gramdır. Aynı ürün hacimce 2:1 olsaydı 1650 ml\'nin 1100 ml\'si reçine, 550 ml\'si sertleştirici olurdu.',
    ] },
    { h: 'Çözümlü örnek: nehir masa', p: [
      'İki kütük arasında ortalama 20 cm genişliğinde, 200 cm uzunluğunda ve 4 cm (40 mm) derinliğinde bir boşluk dolacak olsun. Hacim 20 × 200 × 4 = 16.000 cm³ = 16 litredir; 1,1 yoğunlukla 17,6 kg eder. Ağırlıkça 100:45 karışan bir derin döküm epoksisinde bu, 12.138 gram reçine ve 5.462 gram sertleştirici demektir.',
      'Nehir kenarları düz olmadığından ortalama genişliği bulmak için boşluğu birkaç yerinden ölçüp ortalamasını alın. Ahşabın gözenekleri, çatlakları ve kalıp köşeleri de reçine emer; bu tür işlerde fire payını %10–15 tutmak yerinde olur.',
    ] },
    { h: 'Ağırlıkça oran ile hacimce oran aynı şey değildir', p: [
      'Reçine ve sertleştiricinin yoğunlukları birbirinden farklıdır; sertleştirici çoğunlukla daha hafiftir. Bu yüzden ağırlıkça 2:1 olan bir ürün hacimce 2:1 değildir. Etikette "ağırlıkça" yazan oranı ölçü kabıyla, "hacimce" yazan oranı teraziyle uygulamak karışımı bozar: epoksi yapışkan kalır, tam sertleşmez ya da kırılgan olur. Üretici her iki oranı da veriyorsa terazi daha hassas olduğundan ağırlıkça çalışmak tercih edilir.',
      '"Biraz fazla sertleştirici koyarsam daha çabuk donar" düşüncesi de yanlıştır. Epoksi bir kimyasal tepkimeyle sertleşir ve iki bileşen birbirini belirli bir oranda tüketir; fazla gelen kısım tepkimeye giremeden malzemenin içinde kalır.',
    ] },
    { h: 'Uygulamada dikkat edilecekler', ul: [
      '<strong>Katman kalınlığı:</strong> Epoksi sertleşirken ısı üretir. Her ürünün tek seferde dökülebileceği en yüksek kalınlık bellidir; bunu aşan dökümlerde aşırı ısınma, sararma, çatlama görülebilir. Kalın işleri katman katman dökün.',
      '<strong>Çalışma süresi:</strong> Büyük miktarı tek kapta karıştırmak ısıyı hızla yükseltir ve kap ömrünü kısaltır. Toplam ihtiyacı birkaç partiye bölün.',
      '<strong>Karıştırma:</strong> Kabın dibini ve çeperini sıyırarak karıştırın; karışmamış reçine yüzeyde yapışkan lekeler bırakır.',
      '<strong>Ortam:</strong> Soğuk ortamda epoksi koyulaşır ve geç sertleşir, nemli ortamda yüzey matlaşabilir.',
      '<strong>Korunma:</strong> Eldiven ve gözlük kullanın, iyi havalanan yerde çalışın; epoksi ciltte hassasiyet yapabilir.',
    ] },
    { h: 'Sınırlar', p: [
      'Hesap düz ve eşit kalınlıkta bir dikdörtgen prizma varsayar. Yuvarlak kalıplar, eğimli yüzeyler ve düzensiz boşluklar için hacmi ayrıca bulup en-boy-kalınlık değerlerini buna uygun girmeniz gerekir. Yoğunluk ve karışım oranı üründen ürüne değişir; teknik bilgi föyündeki değerler esas alınmalıdır. Sonuç bilgilendirme amaçlı bir malzeme tahminidir; endüstriyel zemin kaplaması ve taşıyıcı uygulamalarda uzman görüşü alın.',
    ] },
  ],
  faq: [
    ['1 metrekare için ne kadar epoksi gerekir?', 'Kalınlığa bağlıdır: 1 m² alana 1 mm kalınlık 1 litre, yaklaşık 1,1 kg epoksi demektir. 2 mm için 2,2 kg, 3 mm için 3,3 kg gerekir. Buna fire payını eklemeyi unutmayın.'],
    ['Epoksi masa için kaç kilo reçine lazım?', 'Yalnızca epoksiyle dolacak boşluğun hacmini hesaplayın. 20 cm genişlik, 200 cm uzunluk ve 4 cm derinlikteki bir nehir 16 litre, yaklaşık 17,6 kg epoksi alır. Üst yüzeye ayrıca koruyucu kat dökülecekse onu ikinci bir hesapla ekleyin.'],
    ['2:1 oranı ne demek?', 'İki ölçü reçineye bir ölçü sertleştirici demektir. 900 gram karışım için 600 gram reçine ve 300 gram sertleştirici kullanılır. Ölçünün gram mı mililitre mi olduğu ürüne göre değişir; etikette "ağırlıkça" ya da "hacimce" ibaresine bakın.'],
    ['Yoğunluğu bilmiyorsam ne yazmalıyım?', 'Şeffaf döküm ve kaplama epoksileri için 1,1 g/cm³ makul bir varsayımdır. Ürününüzün teknik bilgi föyünde karışımın yoğunluğu yazıyorsa onu kullanın. Hacimce oranla çalışıyorsanız yoğunluk yalnızca toplam kilogramı etkiler, A ve B mililitreleri değişmez.'],
    ['Fire payı ne kadar olmalı?', 'Düz yüzey kaplamada %5–10, ahşaplı ve kalıplı dökümlerde %10–15 yaygın bir paydır. Kaplarda ve karıştırma çubuğunda kalan malzeme, kenarlardan akan kısım ve ahşabın emdiği miktar bu payla karşılanır.'],
    ['Fazla sertleştirici koyarsam daha hızlı sertleşir mi?', 'Hayır. Oran bozulduğunda bileşenlerden biri tepkimeye giremeden kalır ve epoksi yumuşak, yapışkan ya da kırılgan olur. Sertleşmeyi hızlandırmak için oranı değil, ortam sıcaklığını ya da ürün tipini değiştirmek gerekir.'],
    ['Yuvarlak bir tabla için nasıl hesaplarım?', 'Dairenin alanı yarıçapın karesi çarpı pi sayısıdır. 60 cm çaplı tabla yaklaşık 2827 cm² eder. Bu alanı veren herhangi bir en-boy ikilisini (ör. 28,27 cm × 100 cm) girerek aynı sonucu alırsınız.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; ölçüleriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['mum-yapimi-hesapla', 'fire-orani-hesapla', 'litre-metrekup-cevir', 'oran-sadelestir', 'harc-karisim-hesapla'],
};
