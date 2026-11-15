export default {
  slug: 'tansiyon-degerlendirme',
  title: 'Tansiyon Değeri Değerlendirme',
  h1Tail: 'büyük ve küçük tansiyon',
  pageTitle: 'Tansiyon Değeri Değerlendirme – Büyük Küçük Tansiyon Kaç Olmalı?',
  description: 'Büyük ve küçük tansiyon değerinizi yazın; ölçümün optimal, normal, yüksek normal ya da hipertansiyon evrelerinden hangisine girdiğini ve nabız basıncını görün.',
  card: 'Büyük ve küçük tansiyonunuzu girin; değerin hangi sınıfa düştüğünü, nabız basıncını ve ortalama arteriyel basıncı görün.',
  category: 'saglik',
  keywords: ['tansiyon değerlendirme', 'tansiyon kaç olmalı', 'büyük tansiyon küçük tansiyon', 'normal tansiyon değerleri', 'yüksek tansiyon evreleri', 'tansiyon tablosu', 'nabız basıncı hesaplama', '14 9 tansiyon'],
  lead: 'Tansiyon aletinizde okuduğunuz büyük (sistolik) ve küçük (diyastolik) değeri yazın. Araç ölçümü erişkinler için yaygın kullanılan sınıflamaya göre değerlendirir; ayrıca <strong>nabız basıncını</strong> ve <strong>ortalama arteriyel basıncı</strong> hesaplar.',
  button: 'Değerlendir',
  inputs: [
    { id: 'buyuk', label: 'Büyük tansiyon (sistolik)', type: 'number', placeholder: 'Örn. 120', hint: 'mmHg olarak yazın; 12 gibi halk arasındaki söylenişi de kabul eder.' },
    { id: 'kucuk', label: 'Küçük tansiyon (diyastolik)', type: 'number', placeholder: 'Örn. 80' },
  ],
  compute(v, h) {
    let s = h.pos(v.buyuk, 'Büyük tansiyon');
    let d = h.pos(v.kucuk, 'Küçük tansiyon');
    // "12'ye 8" gibi cmHg söylenişini mmHg'ye çevir
    if (s < 30 && d < 30) { s *= 10; d *= 10; }
    else if (s < 30 || d < 30) h.err('İki değeri de aynı biçimde yazın: ya 120 ve 80 (mmHg) ya da 12 ve 8.');
    s = Math.round(s * 1e6) / 1e6; d = Math.round(d * 1e6) / 1e6;
    if (s < 50 || s > 300) h.err('"Büyük tansiyon" 50 ile 300 mmHg arasında olmalı; ölçümü kontrol edin.');
    if (d < 30 || d > 200) h.err('"Küçük tansiyon" 30 ile 200 mmHg arasında olmalı; ölçümü kontrol edin.');
    if (d >= s) h.err('Küçük tansiyon büyük tansiyondan düşük olmalı; değerlerin yerini kontrol edin.');
    const adlar = ['Optimal', 'Normal', 'Yüksek normal', 'Evre 1 hipertansiyon', 'Evre 2 hipertansiyon', 'Evre 3 hipertansiyon'];
    const sinif = (x, esik) => { let k = 0; for (let i = 0; i < esik.length; i++) if (x >= esik[i]) k = i + 1; return k; };
    const ks = sinif(s, [120, 130, 140, 160, 180]);
    const kd = sinif(d, [80, 85, 90, 100, 110]);
    const k = Math.max(ks, kd);
    let sonuc;
    if (k >= 3 && d < 90) sonuc = `İzole sistolik hipertansiyon (${adlar[ks].replace(' hipertansiyon', '')} düzeyinde)`;
    else if (k >= 3) sonuc = adlar[k];
    else if (s < 90 || d < 60) sonuc = 'Düşük tansiyon (hipotansiyon)';
    else sonuc = adlar[k];
    const nb = s - d;
    const oab = d + nb / 3;
    return {
      rows: [
        ['Değerlendirme', sonuc],
        ['Ölçüm', `${h.fmt(s, 1)}/${h.fmt(d, 1)} mmHg`],
        ['Büyük tansiyonun sınıfı', s < 90 ? 'Düşük' : adlar[ks]],
        ['Küçük tansiyonun sınıfı', d < 60 ? 'Düşük' : adlar[kd]],
        ['Nabız basıncı', h.fmt(nb, 1) + ' mmHg'],
        ['Ortalama arteriyel basınç', h.fmt(oab, 1) + ' mmHg'],
      ],
      note: 'Sınıflama erişkinlerde sağlık kuruluşunda yapılan ölçümler içindir. Tek bir ölçüm tanı koydurmaz; bu sonuç bilgilendirme amaçlıdır ve hekim değerlendirmesinin yerini tutmaz.',
    };
  },
  cases: [
    { in: { buyuk: '120', kucuk: '80' }, out: { 'Değerlendirme': 'Normal', 'Ölçüm': '120/80 mmHg', 'Nabız basıncı': '40 mmHg', 'Ortalama arteriyel basınç': '93,3 mmHg' } },
    { in: { buyuk: '150', kucuk: '95' }, out: { 'Değerlendirme': 'Evre 1 hipertansiyon', 'Nabız basıncı': '55 mmHg', 'Ortalama arteriyel basınç': '113,3 mmHg' } },
    { in: { buyuk: '115', kucuk: '75' }, out: { 'Değerlendirme': 'Optimal', 'Ortalama arteriyel basınç': '88,3 mmHg' } },
    { in: { buyuk: '135', kucuk: '85' }, out: { 'Değerlendirme': 'Yüksek normal' } },
    { in: { buyuk: '165', kucuk: '85' }, out: { 'Değerlendirme': 'İzole sistolik hipertansiyon (Evre 2 düzeyinde)', 'Küçük tansiyonun sınıfı': 'Yüksek normal' } },
    { in: { buyuk: '130', kucuk: '100' }, out: { 'Değerlendirme': 'Evre 2 hipertansiyon', 'Büyük tansiyonun sınıfı': 'Yüksek normal', 'Küçük tansiyonun sınıfı': 'Evre 2 hipertansiyon' } },
    { in: { buyuk: '185', kucuk: '115' }, out: { 'Değerlendirme': 'Evre 3 hipertansiyon' } },
    { in: { buyuk: '85', kucuk: '55' }, out: { 'Değerlendirme': 'Düşük tansiyon (hipotansiyon)', 'Nabız basıncı': '30 mmHg' } },
    { in: { buyuk: '12', kucuk: '8' }, out: { 'Değerlendirme': 'Normal', 'Ölçüm': '120/80 mmHg' } },
    { in: { buyuk: '13,5', kucuk: '8,5' }, out: { 'Değerlendirme': 'Yüksek normal', 'Ölçüm': '135/85 mmHg' } },
    { in: { buyuk: '80', kucuk: '120' }, error: true },
    { in: { buyuk: '', kucuk: '80' }, error: true },
    { in: { buyuk: '120', kucuk: '8' }, error: true },
  ],
  howto: [
    'Ölçümden önce en az beş dakika sessizce oturun; ardından tansiyon aletinizde görünen büyük değeri "Büyük tansiyon" alanına yazın.',
    'Aynı ölçümün küçük değerini "Küçük tansiyon" alanına yazın. İki değeri de 120 ve 80 gibi mmHg olarak ya da 12 ve 8 gibi günlük söylenişle girebilirsiniz.',
    '"Değerlendir" düğmesine basın. Ölçümün sınıfı, büyük ve küçük tansiyonun ayrı ayrı hangi düzeyde olduğu, nabız basıncı ve ortalama arteriyel basınç görünür.',
    'Birkaç gün boyunca yaptığınız ölçümleri not alıp sonuçları hekiminizle paylaşın.',
  ],
  sections: [
    { h: 'Büyük ve küçük tansiyon ne anlama gelir?', p: [
      'Kan basıncı, kanın atardamar duvarına uyguladığı basınçtır ve milimetre cıva (mmHg) birimiyle ölçülür. Kalp kasıldığında damarlardaki basınç en yüksek düzeye çıkar; buna <strong>sistolik basınç</strong> ya da halk arasında büyük tansiyon denir. Kalp iki atım arasında gevşediğinde basınç en düşük düzeye iner; bu da <strong>diyastolik basınç</strong>, yani küçük tansiyondur.',
      'Türkiye\'de tansiyon gündelik dilde çoğunlukla santimetre cıva üzerinden söylenir: "12\'ye 8" ifadesi 120/80 mmHg demektir. Dijital aletler değeri mmHg olarak gösterir. Bu araç iki yazımı da kabul eder; 30\'un altındaki değerleri 10 ile çarparak mmHg\'ye çevirir.',
    ] },
    { h: 'Sınıflama tablosu', p: [
      'Araç, erişkinlerde sağlık kuruluşunda ölçülen değerler için Avrupa kaynaklı kılavuzlarda yer alan ve ülkemizde de yaygın kullanılan sınıflamayı uygular. Büyük ve küçük tansiyon farklı sınıflara düşüyorsa <strong>yüksek olan sınıf</strong> geçerli sayılır.',
    ], ul: [
      '<strong>Optimal:</strong> büyük 120\'nin altında ve küçük 80\'in altında',
      '<strong>Normal:</strong> büyük 120–129 ve/veya küçük 80–84',
      '<strong>Yüksek normal:</strong> büyük 130–139 ve/veya küçük 85–89',
      '<strong>Evre 1 hipertansiyon:</strong> büyük 140–159 ve/veya küçük 90–99',
      '<strong>Evre 2 hipertansiyon:</strong> büyük 160–179 ve/veya küçük 100–109',
      '<strong>Evre 3 hipertansiyon:</strong> büyük 180 ve üzeri ve/veya küçük 110 ve üzeri',
      '<strong>İzole sistolik hipertansiyon:</strong> büyük 140 ve üzeri, küçük 90\'ın altında',
      '<strong>Düşük tansiyon:</strong> büyük 90\'ın ya da küçük 60\'ın altında (genel kabul gören yaklaşık sınır)',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Ölçüm 150/95 mmHg olsun. Büyük tansiyon 140–159 aralığında, küçük tansiyon 90–99 aralığındadır; ikisi de Evre 1 düzeyine denk gelir ve sonuç <strong>Evre 1 hipertansiyon</strong> olur. Nabız basıncı 150 − 95 = 55 mmHg, ortalama arteriyel basınç 95 + 55 ÷ 3 ≈ 113,3 mmHg\'dir.',
      'Ölçüm 130/100 mmHg ise büyük tansiyon yüksek normal, küçük tansiyon ise Evre 2 aralığındadır. Yüksek olan sınıf esas alındığından değerlendirme <strong>Evre 2 hipertansiyon</strong> çıkar. 165/85 ölçümünde ise yalnızca büyük tansiyon yüksektir; küçük tansiyon 90\'ın altında kaldığı için sonuç izole sistolik hipertansiyon olarak adlandırılır. Bu tablo özellikle ileri yaşlarda sık görülür.',
    ] },
    { h: 'Nabız basıncı ve ortalama arteriyel basınç', p: [
      '<strong>Nabız basıncı</strong>, büyük tansiyonla küçük tansiyon arasındaki farktır. 120/80 ölçümünde 40 mmHg eder. Farkın belirgin biçimde açılması damar sertliğiyle ilişkili olabilir; çok daralması ise başka durumlara işaret edebilir. Yorumunu hekim yapar.',
      '<strong>Ortalama arteriyel basınç</strong>, bir kalp döngüsü boyunca damarlardaki ortalama basıncın yaklaşık değeridir. Kalp gevşeme evresinde kasılma evresinden daha uzun kaldığı için basit ortalama alınmaz; küçük tansiyona nabız basıncının üçte biri eklenir: <strong>OAB = küçük + (büyük − küçük) ÷ 3</strong>. 120/80 için bu değer 80 + 40 ÷ 3 ≈ 93,3 mmHg\'dir.',
    ] },
    { h: 'Doğru ölçüm için öneriler', ul: [
      'Ölçümden önceki yarım saat içinde çay, kahve ve sigara içmeyin, egzersiz yapmayın.',
      'Sırtınız destekli, ayaklarınız yere basar durumda, bacak bacak üstüne atmadan oturun.',
      'Manşonu çıplak kola, kalp hizasında ve kol çevrenize uygun boyda takın; dar manşon değeri olduğundan yüksek gösterir.',
      'Ölçüm sırasında konuşmayın. Bir iki dakika arayla iki ölçüm yapıp ortalamasını alın.',
      'Değerleri sabah ve akşam aynı saatlerde ölçüp tarihle birlikte not edin.',
    ] },
    { h: 'Ne zaman sağlık kuruluşuna başvurmalı?', p: [
      'Bu sayfa tanı koymaz. Hipertansiyon tanısı, farklı günlerde yinelenen ölçümlerle ve gerektiğinde ev ya da 24 saatlik izlem sonuçlarıyla hekim tarafından konur. Evde yapılan ölçümlerde kullanılan eşikler sağlık kuruluşundaki ölçümlerden bir miktar düşüktür; çocuklar ve gebeler için de ayrı ölçütler geçerlidir.',
      'Tansiyonunuz çok yüksek ölçülüyor ve buna göğüs ağrısı, nefes darlığı, şiddetli baş ağrısı, görme bozukluğu, konuşma güçlüğü ya da kol ve bacakta güçsüzlük eşlik ediyorsa beklemeden acil yardım isteyin. Hekiminize danışmadan tansiyon ilacına başlamayın, dozunu değiştirmeyin ya da ilacı bırakmayın.',
    ] },
  ],
  faq: [
    ['Normal tansiyon kaç olmalı?', 'Erişkinlerde 120/80 mmHg\'nin altı optimal, 120–129/80–84 normal kabul edilir. 130–139/85–89 aralığı yüksek normal olarak adlandırılır ve yaşam tarzı düzenlemeleri açısından dikkat gerektirir.'],
    ['14\'e 9 tansiyon yüksek midir?', '140/90 mmHg, sağlık kuruluşunda yapılan ölçümlerde Evre 1 hipertansiyonun alt sınırıdır. Tek ölçümle karar verilmez; farklı günlerde yinelenen ölçümlerde bu düzey sürüyorsa hekime başvurulmalıdır.'],
    ['Büyük tansiyon mu, küçük tansiyon mu daha önemli?', 'İkisi de önemlidir. Sınıflamada hangisi daha yüksek düzeydeyse o esas alınır. İleri yaşta büyük tansiyonun tek başına yükselmesi sık görülür ve izole sistolik hipertansiyon olarak adlandırılır.'],
    ['Düşük tansiyon kaç sayılır?', 'Genel olarak 90/60 mmHg\'nin altı düşük tansiyon kabul edilir. Yakınma yoksa çoğu kez sorun oluşturmaz; baş dönmesi, bayılma hissi ya da halsizlik varsa hekime danışılmalıdır.'],
    ['Evde ölçtüğüm değerle hastanede ölçülen neden farklı?', 'Sağlık kuruluşunda heyecan nedeniyle tansiyon daha yüksek çıkabilir; buna beyaz önlük etkisi denir. Bunun tersi de görülebilir. Bu nedenle hekimler ev ölçümlerinizi görmek ister.'],
    ['Nabız basıncı kaç olmalı?', 'Dinlenme hâlindeki sağlıklı erişkinlerde nabız basıncı çoğunlukla 40 mmHg dolayındadır. Tek başına bir tanı ölçütü değildir; diğer bulgularla birlikte hekim tarafından yorumlanır.'],
    ['Araç 12 ve 8 yazınca nasıl değerlendiriyor?', 'İki değer de 30\'un altındaysa araç bunları santimetre cıva olarak kabul edip 10 ile çarpar; yani 12 ve 8 girişi 120/80 mmHg olarak değerlendirilir.'],
    ['Tansiyon değerlerim kaydediliyor mu?', 'Hayır. Yazdığınız değerler yalnızca tarayıcınızda işlenir; sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['ortalama-arteriyel-basinc-hesapla', 'nabiz-hesapla', 'vki-hesapla', 'kolesterol-orani-hesapla', 'bel-kalca-orani-hesapla'],
};
