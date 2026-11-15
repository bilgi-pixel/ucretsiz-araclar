export default {
  slug: 'kosu-hiz-bolgeleri-hesapla',
  title: 'Koşu Hız Bölgeleri Hesaplama',
  h1Tail: 'eşik temposuna göre 5 bölge',
  pageTitle: 'Koşu Hız Bölgeleri Hesaplama – Eşik Temposuna Göre Tempo Bölgeleri',
  description: 'Test koşunuzun mesafesini ve süresini girin; eşik temponuzu ve toparlanma, aerobik, tempo, eşik ve interval bölgelerinizi dakika/km ve km/sa olarak hesaplayın.',
  card: 'Test koşunuzdan eşik temponuzu bulun; beş antrenman bölgesinin tempo ve hız aralıklarını görün.',
  category: 'saglik',
  keywords: ['koşu hız bölgeleri', 'koşu tempo bölgeleri', 'eşik temposu hesaplama', 'koşu antrenman bölgeleri', 'pace bölgeleri', 'laktat eşiği temposu', 'kolay koşu temposu kaç olmalı'],
  lead: 'Her koşuyu aynı hızda yapmak gelişimi yavaşlatır. Zorlu bir test koşusunun mesafesini ve süresini yazın; araç <strong>eşik temponuzu</strong> bulup beş antrenman bölgesinin tempo (dk/km) ve hız (km/sa) aralıklarını çıkarsın.',
  button: 'Hesapla',
  inputs: [
    { id: 'mesafe', label: 'Test mesafesi (km)', type: 'number', placeholder: 'Örn. 6', hint: 'Yaklaşık 30 dakikalık tek başına maksimum koşuda katettiğiniz mesafe.' },
    { id: 'sure', label: 'Test süresi', type: 'text', placeholder: 'Örn. 30:00', hint: 'dakika:saniye ya da saat:dakika:saniye biçiminde; yalnızca dakika da yazabilirsiniz.' },
  ],
  compute(v, h) {
    const km = h.pos(v.mesafe, 'Test mesafesi');
    if (km > 100) h.err('Test mesafesi 100 km\'den büyük olamaz.');
    const t = String(v.sure ?? '').trim();
    if (t === '') h.err('"Test süresi" alanını doldurun (örn. 30:00).');
    let saniye;
    if (t.includes(':')) {
      const p = t.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+$/.test(x))) h.err('Test süresini dakika:saniye ya da saat:dakika:saniye biçiminde yazın (örn. 30:00 ya da 1:02:30).');
      const n = p.map(Number);
      if (n[n.length - 1] > 59 || (n.length === 3 && n[1] > 59)) h.err('Süredeki dakika ve saniye değerleri 59\'dan büyük olamaz.');
      saniye = n.length === 3 ? n[0] * 3600 + n[1] * 60 + n[2] : n[0] * 60 + n[1];
    } else {
      saniye = h.pos(t, 'Test süresi') * 60;
    }
    if (!(saniye > 0)) h.err('Test süresi sıfırdan büyük olmalı.');
    const esik = saniye / km;
    if (esik < 120 || esik > 900) h.err('Hesaplanan tempo kilometre başına 2:00 ile 15:00 arasında olmalı; mesafe ve süreyi kontrol edin.');
    const tempo = (s) => {
      const r = Math.round(s);
      return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
    };
    const hiz = (s) => h.fmt(3600 / s, 1);
    const aralik = (hizliKat, yavasKat) => `${tempo(esik * hizliKat)}–${tempo(esik * yavasKat)} /km (${hiz(esik * yavasKat)}–${hiz(esik * hizliKat)} km/sa)`;
    return {
      rows: [
        ['Eşik temposu', `${tempo(esik)} /km (${hiz(esik)} km/sa)`],
        ['Bölge 1 – Toparlanma', `${tempo(esik * 1.29)} /km ve daha yavaş (${hiz(esik * 1.29)} km/sa altı)`],
        ['Bölge 2 – Aerobik dayanıklılık', aralik(1.14, 1.29)],
        ['Bölge 3 – Tempo', aralik(1.06, 1.14)],
        ['Bölge 4 – Eşik', aralik(1.0, 1.06)],
        ['Bölge 5 – Interval', aralik(0.9, 1.0)],
      ],
      note: 'Bölgeler eşik temposunun yüzdesine göre belirlenir: %129 ve üzeri, %114–129, %106–114, %100–106, %90–100. Sınırlar kaynağa göre birkaç puan değişebilir; değerler düz zemin içindir.',
    };
  },
  cases: [
    { in: { mesafe: '6', sure: '30:00' }, out: { 'Eşik temposu': '5:00 /km (12 km/sa)', 'Bölge 1 – Toparlanma': '6:27 /km ve daha yavaş (9,3 km/sa altı)', 'Bölge 2 – Aerobik dayanıklılık': '5:42–6:27 /km (9,3–10,5 km/sa)', 'Bölge 3 – Tempo': '5:18–5:42 /km (10,5–11,3 km/sa)', 'Bölge 4 – Eşik': '5:00–5:18 /km (11,3–12 km/sa)', 'Bölge 5 – Interval': '4:30–5:00 /km (12–13,3 km/sa)' } },
    { in: { mesafe: '5', sure: '20:00' }, out: { 'Eşik temposu': '4:00 /km (15 km/sa)', 'Bölge 2 – Aerobik dayanıklılık': '4:34–5:10 /km (11,6–13,2 km/sa)', 'Bölge 4 – Eşik': '4:00–4:14 /km (14,2–15 km/sa)', 'Bölge 5 – Interval': '3:36–4:00 /km (15–16,7 km/sa)' } },
    { in: { mesafe: '8', sure: '48:00' }, out: { 'Eşik temposu': '6:00 /km (10 km/sa)', 'Bölge 1 – Toparlanma': '7:44 /km ve daha yavaş (7,8 km/sa altı)', 'Bölge 3 – Tempo': '6:22–6:50 /km (8,8–9,4 km/sa)', 'Bölge 5 – Interval': '5:24–6:00 /km (10–11,1 km/sa)' } },
    { in: { mesafe: '12', sure: '1:00:00' }, out: { 'Eşik temposu': '5:00 /km (12 km/sa)', 'Bölge 4 – Eşik': '5:00–5:18 /km (11,3–12 km/sa)' } },
    { in: { mesafe: '6', sure: '30' }, out: { 'Eşik temposu': '5:00 /km (12 km/sa)', 'Bölge 2 – Aerobik dayanıklılık': '5:42–6:27 /km (9,3–10,5 km/sa)' } },
    { in: { mesafe: '5', sure: '27:30' }, out: { 'Eşik temposu': '5:30 /km (10,9 km/sa)', 'Bölge 1 – Toparlanma': '7:06 /km ve daha yavaş (8,5 km/sa altı)', 'Bölge 5 – Interval': '4:57–5:30 /km (10,9–12,1 km/sa)' } },
    { in: { mesafe: '6', sure: 'otuz dakika' }, error: true },
    { in: { mesafe: '10', sure: '10:00' }, error: true },
    { in: { mesafe: '', sure: '30:00' }, error: true },
    { in: { mesafe: '6', sure: '30:75' }, error: true },
  ],
  howto: [
    'İyi dinlenmiş bir günde, düz bir parkurda ya da pistte ısındıktan sonra 30 dakika boyunca sürdürebileceğiniz en yüksek sabit tempoda tek başınıza koşun.',
    'Bu 30 dakikada katettiğiniz mesafeyi kilometre olarak "Test mesafesi" alanına yazın.',
    '"Test süresi" alanına süreyi dakika:saniye biçiminde girin (örn. 30:00). Bir saati aşan süreler için saat:dakika:saniye yazabilirsiniz.',
    '"Hesapla" düğmesine basın. İlk satırda eşik temponuz, altında beş bölgenin tempo ve hız aralıkları görünür.',
    'Bölgeleri saatinize ya da antrenman defterinize not edin; kondisyonunuz değiştikçe testi 6–8 haftada bir yineleyin.',
  ],
  sections: [
    { h: 'Eşik temposu nedir?', p: [
      'Eşik temposu, kabaca bir saat kadar sürdürebileceğiniz en yüksek koşu temposudur. Bu yoğunluğun üzerine çıkıldığında kaslarda laktat birikimi hızlanır ve yorgunluk çabuk gelir; altında ise tempo uzun süre korunabilir. Antrenman planlamasında bölgelerin çoğu bu "çapa" değere göre tanımlanır.',
      'Laboratuvar ölçümü olmadan eşiği tahmin etmenin pratik yolu saha testidir. Yaygın yöntem, tek başına yapılan 30 dakikalık maksimum sabit tempolu koşudur; bu koşunun ortalama temposu eşik temposu kabul edilir. Araç da <strong>eşik temposu = süre ÷ mesafe</strong> işlemini yapar ve bölgeleri bu değerden türetir.',
    ] },
    { h: 'Bölgeler nasıl hesaplanır?', p: [
      'Bölgeler, eşik temposunun (kilometre başına süre) yüzdesi olarak tanımlanır. Tempo süre cinsinden olduğu için yüzde büyüdükçe koşu yavaşlar. Araçta kullanılan beş bölgeli şema şöyledir:',
    ], ul: [
      '<strong>Bölge 1 – Toparlanma:</strong> eşik temposunun %129\'u ve daha yavaşı. Çok rahat, sohbet edilebilen koşu.',
      '<strong>Bölge 2 – Aerobik dayanıklılık:</strong> %114–129. Haftalık hacmin büyük bölümünün koşulduğu kolay ve uzun koşu temposu.',
      '<strong>Bölge 3 – Tempo:</strong> %106–114. "Rahat zor" his; uzun yarış temposuna yakın sürekli koşular.',
      '<strong>Bölge 4 – Eşik:</strong> %100–106. Eşik koşuları ve uzun tekrarlar; kısa cümlelerle konuşulabilir.',
      '<strong>Bölge 5 – Interval:</strong> %90–100. Eşikten hızlı, birkaç dakikalık tekrarlar; konuşmak zordur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '30 dakikalık testte 6 km koşan bir sporcunun eşik temposu 30 ÷ 6 = <strong>5:00 /km</strong>, yani saatte 12 km\'dir. Tempo saniyeye çevrilir (300 saniye) ve yüzdelerle çarpılır: 300 × 1,29 = 387 saniye = 6:27; 300 × 1,14 = 342 saniye = 5:42; 300 × 1,06 = 318 saniye = 5:18; 300 × 0,90 = 270 saniye = 4:30.',
      'Buna göre bölgeler şöyle çıkar: toparlanma koşuları 6:27 /km ve daha yavaş, aerobik koşular 5:42–6:27 /km, tempo koşuları 5:18–5:42 /km, eşik çalışmaları 5:00–5:18 /km, interval tekrarları 4:30–5:00 /km. Hız karşılıkları sırasıyla 9,3 km/sa altı, 9,3–10,5, 10,5–11,3, 11,3–12 ve 12–13,3 km/sa\'tir; koşu bandı kullananlar bu değerleri doğrudan ayarlayabilir.',
    ] },
    { h: 'Bölgeleri antrenmanda kullanmak', p: [
      'Dayanıklılık koşucularının yaygın hatası, kolay günleri fazla hızlı, zor günleri ise yeterince hızlı koşamamaktır. Bölgeler bu "gri alan" sorununu görünür kılar. Birçok antrenman yaklaşımı haftalık sürenin büyük bölümünü 1. ve 2. bölgede, daha küçük bir bölümünü 4. ve 5. bölgede geçirmeyi önerir; 3. bölge ise yarışa özgü hazırlık dönemlerinde ağırlık kazanır.',
      'Örnek bir hafta şöyle kurulabilir: iki ya da üç kolay koşu 2. bölgede, bir uzun koşu 2. bölgenin yavaş ucunda, bir eşik çalışması (örneğin 3 × 10 dakika 4. bölge) ve bir interval seansı (örneğin 5 × 3 dakika 5. bölge). Zor günlerin ertesi günü 1. bölgede kısa bir toparlanma koşusu ya da dinlenme uygundur.',
    ] },
    { h: 'Test ve bölgelerle ilgili dikkat edilecekler', ul: [
      'Test tek başına yapılmalıdır. Yarış ortamında insanlar daha hızlı koşar; 30 dakikanın altında biten bir yarışın temposu eşikten hızlıdır ve bölgeleri olduğundan hızlı gösterir.',
      'Yaklaşık bir saat süren bir yarışın ortalama temposu da eşik temposuna yakın bir tahmin verir; mesafe ve süreyi aynen yazabilirsiniz.',
      'Rüzgâr, sıcaklık, yokuş ve zemin tempoyu etkiler. Sıcak günde ya da engebeli parkurda aynı efor daha yavaş tempoya karşılık gelir; böyle günlerde hisse ve nefese güvenin.',
      'Bölge sınırları keskin çizgiler değildir. Farklı antrenman kaynakları birkaç yüzde puanı farklı sınırlar ve farklı bölge sayıları kullanır.',
      'Kondisyon geliştikçe eşik temposu hızlanır; eski bölgelerle antrenmana devam etmek gelişimi sınırlar.',
    ] },
    { h: 'Sağlık notu', p: [
      'Maksimum eforlu 30 dakikalık test vücudu ciddi biçimde zorlar. Koşuya yeni başladıysanız önce birkaç hafta düzenli kolay koşu yapın. Kalp-damar hastalığı, yüksek tansiyon ya da başka bir sağlık sorununuz varsa ya da uzun süredir hareketsizseniz yoğun teste girmeden önce hekime danışın. Bu sayfadaki değerler bilgilendirme amaçlıdır; kişisel antrenman reçetesi değildir.',
    ] },
  ],
  faq: [
    ['Koşu hız bölgeleri ne işe yarar?', 'Her antrenmanın amacına uygun yoğunlukta yapılmasını sağlar. Kolay koşuların gerçekten kolay, zor çalışmaların yeterince zor olması hem gelişimi hızlandırır hem de aşırı yüklenme riskini azaltır.'],
    ['Eşik tempomu nasıl öğrenirim?', 'En pratik yol, ısındıktan sonra tek başınıza 30 dakika sürdürebileceğiniz en yüksek sabit tempoda koşmaktır. Bu koşunun ortalama temposu eşik temposu kabul edilir. Mesafeyi ve süreyi araca yazmanız yeterlidir.'],
    ['5 km yarış derecemi kullanabilir miyim?', 'Kullanabilirsiniz, ancak 5 km yarışı çoğu koşucu için 30 dakikadan kısa sürer ve temposu eşikten hızlıdır; bölgeler biraz hızlı çıkar. 5 km dereceniz 30 dakika civarındaysa sonuç eşiğe yakındır; daha hızlıysanız 10 km ya da 30 dakikalık test daha uygun olur.'],
    ['Kolay koşu temposu kaç olmalı?', 'Kolay koşular 2. bölgede, yani eşik temposunun %114–129\'u aralığında yapılır. Eşik temposu 5:00 /km olan biri için bu 5:42–6:27 /km demektir. Koşarken rahatça konuşabiliyorsanız doğru bölgedesiniz.'],
    ['Nabız bölgeleri mi tempo bölgeleri mi daha iyi?', 'İkisi birbirini tamamlar. Tempo anında tepki verir ve düz zeminde nettir; nabız ise sıcak, yokuş ve yorgunluğun vücuttaki etkisini yansıtır. Düz parkurda tempo, engebeli arazide ve sıcakta nabız ya da his daha güvenilir rehberdir.'],
    ['Bölgelerimi ne sıklıkla güncellemeliyim?', 'Düzenli antrenman yapan koşucular için 6–8 haftada bir testi yinelemek yaygın bir uygulamadır. Yarış sonuçlarınız belirgin biçimde değiştiyse daha erken güncelleyebilirsiniz.'],
    ['Koşu bandında bu değerleri kullanabilir miyim?', 'Evet. Sonuçlardaki km/sa değerleri koşu bandı hız ayarıyla aynıdır. Bandın hız göstergesi cihazdan cihaza az da olsa sapabilir; hissettiğiniz eforu da dikkate alın.'],
    ['Girdiğim veriler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; mesafe ve süre bilgileriniz sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kosu-temposu-hesapla', 'maraton-sure-tahmini', 'nabiz-rezervi-hesapla', 'vo2-max-hesapla', 'kosu-kalori-hesapla'],
};
